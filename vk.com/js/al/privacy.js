var Privacy = {
    flistBox: function(box, friendsData, selectedFriends, rowTemplate, saveLang, hash) {
        cur.flistTpl = rowTemplate;
        if (selectedFriends.length === 0) selectedFriends = {};

        cur.flistList = cur.flistFriends = friendsData;
        cur.flistSearchList = [];
        cur.flistSearchTotal = -1;
        cur.flistSearchLoadStr = '';
        cur.flistSelectedList = selectedFriends && selectedFriends[0] ? selectedFriends : [];
        cur.flistSelected = {};
        each(selectedFriends, function() {
            cur.flistSelected[this[0]] = 1;
        });
        cur.flistSelectedShowed = 0;

        cur.flistIndex = new vkIndexer(friendsData, function(obj) {
            return obj[1] + ' ' + obj[4];
        });

        box.removeButtons();
        box.addButton(saveLang || getLang('global_save'), function() {
            var listName = ge('flist_list_name');
            var listStr = false;
            if (isVisible(listName)) {
                listStr = listName.value;
                if (!listStr) {
                    return notaBene(listName);
                }
                placeholderSetup(listName, {
                    back: true
                });
                elfocus(listName, 0, listName.value.length);
            }
            var list = {},
                ids = [];
            each(cur.flistSelectedList, function() {
                list[this[0]] = this;
                ids.push(this[0]);
            });
            if (cur.flistFriendsPrivacy) {
                ajax.post('al_settings.php', {
                    act: 'hide_friends',
                    hash: hash,
                    ids: ids.join(',')
                }, {
                    onDone: function(control, rules) {
                        showDoneBox(cur.flistFriendsPrivacyText);
                        box.hide();
                    },
                    showProgress: box.showProgress,
                    hiderogress: box.hideProgress
                });
                showDoneBox(cur.flistFriendsPrivacyText, {
                    out: 4000
                });
                if (cur.flistNavReload) setTimeout(function() {
                    nav.reload();
                }, 2000);
                return;
            }

            if (cur.onFlistSave) {
                cur.onFlistSave(ids, list, hash, listStr);
            }

            if (!box.leaveOnSave) {
                box.hide();
            }
        });

        if (cur.flistTooltip) {
            var targetEl = ge('flist_sel');
            var ttOpts = {
                className: 'flist_info_tt',
                text: cur.flistTooltip,
                width: 250,
                nohide: 1,
                nohideover: 1
            };
            if (cur.flistTooltipRight) {
                ttOpts = extend(ttOpts, {
                    dir: 'left',
                    slideX: -15,
                    shift: [-getSize(targetEl)[0] - 15, -28],
                });
            } else {
                ttOpts = extend(ttOpts, {
                    dir: 'right',
                    slideX: 15,
                    shift: [265, -28],
                });
            }
            showTooltip(targetEl, ttOpts);
            stManager.add(['tooltips.js'], function() {
                box.setOptions({
                    onHide: tooltips.hide.pbind(targetEl)
                });
            });
        } else {
            box.addButton(getLang('global_cancel'), function() {
                box.hide();
            }, 'no');
        }

        var rCol = ge('flist_all_list');
        var rColHeight = getSize(rCol)[1];
        cur.flistScrollbar = new Scrollbar('flist_scroll_wrap', {
            nomargin: true,
            right: vk.rtl ? 'auto' : 0,
            left: !vk.rtl ? 'auto' : 0,
            more: Privacy.flistMore,
            onScroll: function(delta) {
                if (ge('flist_scroll_wrap').scrollTop > 0) {
                    addClass('flist_cont', 'flist_scrolled');
                } else {
                    removeClass('flist_cont', 'flist_scrolled');
                }
            }
        });

        cur.flistAllCont = ge('flist_all_list');
        cur.flistSelCont = ge('flist_sel_list');
        cur.flistSearchEl = ge('flist_search');
        cur.flistSearchContEl = geByClass1('flist_search_cont', 'flist_cont');

        if (cur.flistLimit && cur.flistSelectedCnt >= (cur.flistLimit - 1)) {
            Privacy.flistFull();
        }

        if (cur.flistCountStr && cur.flistSelectedCnt > 0) {
            ge('flist_sel_summary').innerHTML = langNumeric(cur.flistSelectedCnt, cur.flistCountStr);
        }

        toggleClass('flist_cont', 'flist_select_items', cur.flistSelectedCnt > 0);

        return false;
    },
    flistMore: function() {
        if (cur.privacy && cur.privacy.pagination && !cur.flistSelectedShowed && cur.flistList.length - cur.flistShown < 10 && cur.flistList.length < cur.flistTotalCount) {
            if (cur.flistSearchStr) {
                Privacy.flistSearchPagination();

            } else if (!cur.flistMoreLoading) {
                cur.flistMoreLoading = true;

                ajax.post('al_friends.php', extend({}, cur.privacy.chooseBoxOpts || {}, {
                    act: 'select_friends_box',
                    Checked: Object.keys(cur.flistSelected).join(','),
                    pagination: 1,
                    offset: cur.flistList.length
                }), {
                    onDone: function(usersData) {
                        cur.flistMoreLoading = false;

                        if (isArray(usersData)) {
                            usersData.forEach(function(user) {
                                cur.flistFriends.push(user);
                                cur.flistIndex.add(user);
                            });

                            Privacy.flistMore();
                        }
                    },
                    onFail: function() {
                        cur.flistMoreLoading = false;
                    }
                })
            }

            return;
        }

        Privacy.flistDrawItems();
    },
    flistDrawItems: function() {
        var lim = cur.flistShown + 60;
        while (cur.flistShown < lim && Privacy.flistShowOne(cur.flistList[cur.flistShown + 1])) {
            ++cur.flistShown;
        }
        setTimeout(function() {
            cur.flistScrollbar && cur.flistScrollbar.update();
        }, 10);
    },
    flistShowOne: function(u, ins) {
        if (!u) return false;
        if (ge('flist_item_wrap' + u[0])) {
            show(ge('flist_item_wrap' + u[0]));
            return true;
        }
        var uname = u[1];
        if (cur.flistSelection) {
            uname = uname.replace(cur.flistSelection.re, cur.flistSelection.val);
        }
        var row = ce('div', {
            id: 'flist_item_wrap' + u[0],
            className: 'flist_item_wrap' + (cur.flistSelected[u[0]] ? ' flist_item_checked' : ''),
            innerHTML: rs(cur.flistTpl, {
                id: u[0],
                name: uname,
                photo: u[2],
                alt: clean(uname)
            })
        });
        if (ins) {
            cur.flistAllCont.insertBefore(row, cur.flistAllCont.firstChild);
        } else {
            cur.flistAllCont.appendChild(row);
        }
        return true;
    },
    flistSelect: function(id, obj, event) {
        var el = ge('flist_item_wrap' + id);
        var cont = obj.parentNode;
        if (cont.id.slice(0, 14) == 'flist_item_sel' || hasClass(el, 'flist_item_checked')) {
            delete cur.flistSelected[id];
            for (var i = 0; i < cur.flistSelectedList.length; i++) {
                if (cur.flistSelectedList[i][0] == id) {
                    cur.flistSelectedList.splice(i, 1);
                    break;
                }
            }
            if (el) {
                removeClass(el, 'flist_item_checked');
            }

            var sel = ge('flist_item_sel' + id);
            if (sel) {
                re(sel);
                if (cur.flistSelectedCnt > cur.flistSelInRow && cur.flistSelectedList[cur.flistSelInRow - 1]) {
                    var u = cur.flistSelectedList[cur.flistSelInRow - 1];
                    if (!ge('flist_item_sel' + u[0])) {
                        cur.flistSelCont.insertBefore(ce('div', {
                            id: 'flist_item_sel' + u[0],
                            className: 'flist_item_wrap',
                            innerHTML: rs(cur.flistTpl, {
                                id: u[0],
                                name: u[1],
                                photo: u[2],
                                alt: clean(u[1])
                            })
                        }), ge('flist_sel_show_all'));
                    }
                }
            }

            cur.flistSelectedCnt--;
            if (cur.flistSelectedCnt == 0) {
                show('flist_info');
                cur.flistSelectedShowed || hide('flist_search_toggler_wrap');
            } else if (cur.flistSelectedCnt > cur.flistSelInRow) {
                val('flist_sel_show_all', '+' + (cur.flistSelectedCnt - cur.flistSelInRow));
                removeClass('flist_sel_show_all', 'unshown');
            } else if (cur.flistSelectedCnt == cur.flistSelInRow) {
                addClass('flist_sel_show_all', 'unshown');
            }
            if (cur.flistLimit && cur.flistSelectedCnt == (cur.flistLimit - 1)) {
                removeClass(cur.flistAllCont, 'flist_full');
            }
            curBox().changed = true;
        } else if (!hasClass(el, 'flist_item_checked')) {
            if (cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit) {
                Privacy.flistFull(event || window.event);
                return false;
            }
            var html = val(el);
            addClass(el, 'flist_item_checked');
            if (cur.flistSelectedCnt == 0) {
                hide('flist_info');
                show('flist_search_toggler_wrap');
            }
            cur.flistSelectedCnt++;
            cur.flistSelCont.insertBefore(ce('div', {
                id: 'flist_item_sel' + id,
                className: 'flist_item_wrap',
                innerHTML: html
            }), cur.flistSelCont.firstChild);
            if (cur.flistSelectedCnt > cur.flistSelInRow) {
                var items = geByClass('flist_item_wrap', cur.flistSelCont);
                re(items[items.length - 1]);
                val('flist_sel_show_all', '+' + (cur.flistSelectedCnt - cur.flistSelInRow));
                removeClass('flist_sel_show_all', 'unshown');
            }
            if (cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit) {
                Privacy.flistFull(event || window.event);
            }
            for (var i = 0; i < cur.flistList.length; i++) {
                if (cur.flistList[i] && cur.flistList[i][0] == id) {
                    cur.flistSelectedList.unshift(cur.flistList[i]);
                    break;
                }
            }
            cur.flistSelected[id] = 1;
            if (cur.flistSearchStr) {
                Privacy.flistSearch(false);
            }
        }
        toggleClass('flist_cont', 'flist_select_items', cur.flistSelectedCnt > 0);
        if (cur.flistCountStr) {
            val('flist_sel_summary', cur.flistSelectedCnt > 0 ? langNumeric(cur.flistSelectedCnt, cur.flistCountStr) : cur.flistNoSelStr);
        }
        cur.flistScrollbar.update();
        return false;
    },
    flistFull: function(tooltipEvent) {
        if (tooltipEvent) {
            var el;
            if (hasClass(tooltipEvent.target, 'flist_item_thumb')) {
                el = tooltipEvent.target;
            } else if (hasClass(tooltipEvent.target, 'flist_item') && (el = tooltipEvent.target) || (el = gpeByClass('flist_item', tooltipEvent.target))) {
                el = geByClass1('flist_item_thumb', el);
            }
            if (el) {
                if (window.tooltips) {
                    window.tooltips.hideAll();
                }
                var tt = showTooltip(el, {
                    text: cur.limitTooltip,
                    className: 'flist_max_size_tt',
                    dir: 'auto',
                    slide: -15,
                    shift: [15, 10],
                    nohide: 1,
                    nohideover: 1,
                    hasover: 1
                });
                setTimeout(function() {
                    tooltips.hide(el);
                }, 2000);
            }
        }
        addClass(cur.flistAllCont, 'flist_full');
    },
    flistSearch: function(str) {
        str = trim(str);

        cur.flistSearchStr = str;

        if (cur.privacy && cur.privacy.pagination && !cur.flistSelectedShowed && cur.flistIndex.list.length < cur.flistTotalCount && str) {
            Privacy.flistSearchPagination();
            return;
        }

        cur.flistSearchList = [];
        cur.flistSearchTotal = -1;
        cur.flistSearchLoadStr = '';
        clearTimeout(cur.flistSearchLoadMore);

        if (str) {
            cur.flistList = (cur.flistSelectedShowed ? cur.flistSelectedIndex : cur.flistIndex).search(str);
            cur.flistSelection = {
                re: new RegExp('(' + str.replace(cur.flistIndex.delimiter, '|').replace(/[\/\\\(\)\[\]\{\}\*,]/g, '').replace(/^\||\|$/g, '') + ')', 'gi'),
                val: '<em class="highlight">$1</em>'
            };
            cur.flistScrollbar.scrollTop(0);
        } else {
            cur.flistList = cur.flistSelectedShowed ? cur.flistSelectedList : cur.flistFriends;
            cur.flistSelection = false;
            val(cur.flistSearchEl, '');
            addClass('ui_search_field_empty', cur.flistSearchContEl);
        }

        if (cur.flistList.length) {
            cur.flistAllCont.innerHTML = '';
            cur.flistShown = -1;
            Privacy.flistMore();
        }
    },

    flistSearchPagination: function() {
        if (cur.flistSearchLoading || (cur.flistSearchLoadStr === cur.flistSearchStr && cur.flistSearchList.length >= cur.flistSearchTotal) || !cur.privacy) {
            return;
        }

        var str = cur.flistSearchStr;

        if (cur.flistSearchLoadMore) {
            clearTimeout(cur.flistSearchLoadMore);
        }

        function searchLoadMore() {
            cur.flistSearchLoading = true;

            ajax.post('al_friends.php', extend({}, cur.privacy.chooseBoxOpts || {}, {
                act: 'select_friends_search',
                q: str,
                offset: cur.flistSearchLoadStr === str ? cur.flistSearchList.length : 0,
            }), {
                onDone: function(usersData, total) {
                    if (cur.flistSearchLoadStr !== str) {
                        cur.flistSearchLoadStr = str;
                        cur.flistShown = -1;
                        cur.flistSearchList = [];
                        cur.flistAllCont.innerHTML = '';
                    }

                    cur.flistSearchTotal = +total;

                    usersData.forEach(function(user) {
                        cur.flistSearchList.push(user);
                    });

                    cur.flistList = cur.flistSearchList;

                    Privacy.flistDrawItems();

                    cur.flistSearchLoading = false;
                },
                onFail: function() {
                    cur.flistSearchLoading = false;
                }
            });
        }

        if (cur.flistSearchLoadStr === str) {
            searchLoadMore();
        } else {
            cur.flistSearchLoadMore = setTimeout(searchLoadMore, 500);
        }
    },

    flistToggleAllSelected: function() {
        if (!cur.flistSelectedShowed) {
            cur.flistSelectedShowed = 1;
            addClass('flist_sel_show_all', 'flist_sel_showed_all');
            addClass('flist_search_toggler', 'on');
            cur.flistList = cur.flistSelectedList;
            cur.flistAllCont.innerHTML = '';
            cur.flistShown = -1;
            Privacy.flistMore();

            cur.flistSelectedIndex = new vkIndexer(cur.flistSelectedList, function(obj) {
                return obj[1] + ' ' + obj[4];
            });
        } else {
            cur.flistSelectedShowed = 0;
            removeClass('flist_sel_show_all', 'flist_sel_showed_all');
            removeClass('flist_search_toggler', 'on');

            if (cur.flistSelectedCnt === 0) {
                hide('flist_search_toggler_wrap');
                removeClass('flist_cont', 'flist_select_items');
            }

            Privacy.flistSearch(false);
        }
        cur.flistSelection = false;
        val(cur.flistSearchEl, '');
    },
    hideFriends: function(key, obj) {
        var checked = cur.privacy[key][2];
        showBox('al_friends.php', {
            act: 'select_friends_box',
            from: 'friends_privacy',
            Checked: checked.join(',')
        }, {
            stat: ['privacy.js', 'privacy.css', 'indexer.js'],
            params: {
                dark: 1
            }
        });
        cur.onFlistSave = function(ids, list, hash) {
            ajax.post('al_settings.php', {
                act: 'hide_friends',
                hash: hash,
                ids: ids.join(',')
            }, {
                onDone: function(control, rules) {
                    ge('privacy_' + key + '_hide').innerHTML = control;
                    cur.privacy[key] = rules;
                    if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
                }
            });
        }
        return false;
    },

    customType: 4, // ���, �����
    someType: 5, // ��������� ������
    listsType: 6, // ��������� ������ ������
    update: function(key) {
        var el = ge('privacy_edit_' + key),
            p = cur.privacy[key],
            v = p[0];
        var types = cur.privacy[key + '_types'] || cur.privacy._types;
        var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};
        var _lists = {};
        for (var i in lists) {
            var _i = parseInt(i);
            _lists[_i] = lists[i];
        }

        if (el) {
            el.innerHTML = types[v];
            var privacyHeader = ge('privacy_header');
            if (privacyHeader) {
                privacyHeader.innerHTML = types[v];
            }
            var elWrap = gpeByClass('privacy_edit_wrap', el);
            if (elWrap && elWrap.nextSibling) {
                if (v == Privacy.listsType) {
                    var str = [];
                    for (var i in p[2]) {
                        var cat_id = -p[2][i],
                            color = (cat_id - 1) % 8 + 1;
                        if (_lists[cat_id]) str.push(cat_id < 100 ? '<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + _lists[cat_id] + '</a>' : '<span class="group' + color + '">' + _lists[cat_id] + '</span>');
                    }
                    elWrap.nextSibling.innerHTML = (str.length ? ': ' : '') + str.join(', ');
                } else {
                    elWrap.nextSibling.innerHTML = '';
                }
            }
            if (elWrap && hasClass(elWrap, 'privacy_graphic')) {
                var unlock = v == 0 && key !== 'hidden_friends' ||
                    v == Privacy.customType && p[1] && p[2] && p[2][0] == '0' ||
                    v == 1 && key === 'appscall';
                (unlock ? removeClass : addClass)(elWrap, 'privacy_locked');
            }
        }

        if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
    },
    someSaved: function(key, ids, list, plain) {
        cur.privacy[key] = [Privacy.someType, 0, ids, []];

        var lang = cur.privacy.lang || {};

        var count = ids.length,
            str = [];
        for (var i = 0; i < count && i < 5; ++i) {
            var id = ids[i],
                mem = plain ? list[i] : list[id],
                shortname = mem[4].replace(/'/g, '');
            str.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + (mem[5] || mem[1]) + '</a>');
        }
        str = str.join(', ');
        if (count > 5) {
            str += ' ' + (lang.some ? getLang(lang.some, count - 5) : getLang('privacy_N_friends_some', count - 5));
        }

        var el = ge('privacy_edit_' + key);
        var elWrap = gpeByClass('privacy_edit_wrap', el);
        var types = cur.privacy[key + '_types'] || cur.privacy._types;
        el.innerHTML = types[Privacy.someType];
        elWrap.nextSibling.innerHTML = ': ' + str;

        if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
    },
    customSaved: function(key, np, plus, minus) {
        cur.privacy[key] = np;
        var lang = cur.privacy.lang || {};

        if (np[1] == 1 && !np[3].length || np[0] == Privacy.listsType) {
            Privacy.update(key);
        } else if (np[0] == Privacy.someType) {
            Privacy.someSaved(key, np[2], plus, true);
        } else { // save here
            var el = ge('privacy_edit_' + key);
            var elWrap = gpeByClass('privacy_edit_wrap', el);
            var types = cur.privacy[key + '_types'] || cur.privacy._types;
            var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};

            var label = types[Privacy.listsType],
                str = '';
            if (np[1] == 1) {
                label = types[np[2][0]];
            } else {
                str = [];
                var count = plus.length,
                    hasUser = false;
                for (var i = 0; i < count && i < 5; ++i) {
                    var mem = plus[i],
                        id = mem[0];
                    if (id > 0) {
                        var shortname = mem[4].replace(/'/g, '');
                        hasUser = true;
                        str.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + mem[6] + '</a>');
                    } else {
                        var cat_id = -id,
                            color = (cat_id - 1) % 8 + 1;
                        str.push('<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + lists[cat_id] + '</a>');
                    }
                }
                if (hasUser) {
                    label = types[Privacy.someType];
                }
                str = ': ' + str.join(', ');
                if (count > 5) {
                    str += ' ' + getLang(lang.some || 'privacy_N_friends_some', count - 5);
                }
            }
            if (minus.length) {
                var count = minus.length,
                    mstr = [];
                for (var i = 0; i < count && i < 5; ++i) {
                    var mem = minus[i],
                        id = mem[0];
                    if (id > 0) {
                        var shortname = mem[4].replace(/'/g, '');
                        mstr.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + mem[6] + '</a>');
                    } else {
                        var cat_id = -id,
                            color = (cat_id - 1) % 8 + 1;
                        mstr.push('<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + lists[cat_id] + '</a>');
                    }
                }
                str += ', ' + getLang('global_privacy_except') + ' ' + mstr.join(', ');
                if (count > 5) {
                    str += ' ' + getLang('privacy_N_friends_more', count - 5);
                }
            }
            el.innerHTML = label;
            elWrap.nextSibling.innerHTML = str;
            if (hasClass(elWrap, 'privacy_graphic')) {
                (np[1] && np[2] && np[2][0] == '0' ? removeClass : addClass)(elWrap, 'privacy_locked');
            }

            if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
        }
    },
    choose: function(ev, val, list, confirmed) {
        var key = cur.privSel,
            p = cur.privacy[key],
            noselect = (cur.privacy._noselect || key == 'chat_actions');
        if (cur.privacyNeedConfirm && !confirmed) {
            cur.privacyNeedConfirm(key, val, function() {
                Privacy.show(ge('privacy_edit_' + key), ev, key);
                Privacy.choose(ev, val, list, true);
            });
            return;
        }
        if (noselect) {
            if (cur.onPrivacyChanged) cur.onPrivacyChanged(key, val, list);
            Privacy.qhide();
            return cancelEvent(ev);
        }
        if (val == Privacy.customType) {
            var type, plus, minus = [],
                opt = '';
            if (p[0] == Privacy.customType) {
                type = p[1];
                plus = p[2];
                minus = p[3];
            } else if (p[0] == Privacy.someType || p[0] == Privacy.listsType) {
                type = 0;
                plus = p[2];
            } else {
                type = 1;
                plus = p[2];
            }
            cur.onCprivSave = Privacy.customSaved.pbind(key);
            if (cur.privacy.custom_box_type) {
                opt = cur.privacy.custom_box_type;
            }
            return showBox('al_friends.php', extend(cur.privacy.chooseBoxOpts || {}, {
                act: 'custom_privacy_box',
                type: type,
                plus: plus.join(','),
                minus: minus.join(','),
                opt: opt,
                key: key,
            }), {
                stat: ['ui_controls.js', 'ui_controls.css']
            });
        } else if (val == Privacy.someType) {
            var checked = (p[0] == Privacy.someType || p[0] == Privacy.complexType && p[1] == 0) ? p[2].join(',') : '';
            cur.onFlistSave = function(ids, list) {
                Privacy.someSaved(key, ids, list);
            };
            return showTabbedBox('al_friends.php', extend({}, cur.privacy.chooseBoxOpts || {}, {
                act: 'select_friends_box',
                Checked: checked,
                pagination: cur.privacy.pagination ? 1 : ''
            }), {
                stat: ['ui_controls.js']
            });
        } else if (val == Privacy.listsType) {
            var el = ge('privacy_l_item' + list);
            if (el.className == 'l_item_sel') {
                el.className = 'l_item';
                var ind = indexOf(p[2], -list);
                if (ind != -1) {
                    p[2].splice(ind, 1);
                }
                if (!p[2].length && key != 'updates') { // sorry, dirty hack
                    var types = cur.privacy[key + '_types'] || cur.privacy._types;
                    var typeIds = Object.keys(types);
                    cur.privacy[key] = [intval(typeIds[0]), 1, [0],
                        []
                    ];
                }
            } else {
                el.className = 'l_item_sel';
                if (p[0] != val) {
                    p = cur.privacy[key] = [val, 0, [],
                        []
                    ];
                }
                p[2].push(-list);
            }
            Privacy.update(key);
            return cancelEvent(ev);
        }
        cur.privacy[key] = [val, 1, [val],
            []
        ];
        Privacy.update(key);
        Privacy.qhide();
    },
    select: function(val, force) {
        if (!force && val === cur.privSelIndex) return;
        if (cur.privSelIndex !== false) {
            var el = ge('privacy_item' + cur.privSelIndex);
            if (el) el.className = 'item';
            if (cur.privSelIndex == Privacy.listsType && cur.privacy[cur.privSel][0] != Privacy.listsType) {
                if (Privacy.toup) {
                    hide(el.previousSibling);
                } else {
                    hide(el.nextSibling);
                }
            }
        }
        cur.privSelIndex = val;
        var el = ge('privacy_item' + cur.privSelIndex),
            add = (cur.privSelIndex == Privacy.someType) ? '_plus' : '';
        if (el.nextSibling && el.nextSibling.id == 'privacy_item' + Privacy.listsType && isVisible(el.nextSibling.nextSibling)) {
            el.className = 'last item_sel' + add;
        } else {
            if (val == Privacy.listsType) {
                if (Privacy.toup) {
                    show(el.previousSibling);
                } else {
                    show(el.nextSibling);
                }
            } else {
                el.className = 'item_sel' + add;
            }
        }
    },
    unselect: function(val) {
        if (val != cur.privSelIndex) return;
        ge('privacy_item' + val).className = 'item';
        cur.privSelIndex = false;
    },
    hide: function(timeout) {
        if (timeout > 0) {
            cur.hidePrivacyTimer = setTimeout(Privacy.hide.pbind(0), timeout);
            return;
        }
        clearTimeout(cur.hidePrivacyTimer);
        var privacyHeader = ge('privacy_header');

        if (!privacyHeader) return;

        if (timeout == -1) {
            hide(cur.privEl);
            if (privacyHeader && privacyHeader.tt && isFunction(privacyHeader.tt.hide)) {
                privacyHeader.tt.hide();
            }
        } else if (isVisible) {
            fadeOut(cur.privEl, 200);
            if (privacyHeader && privacyHeader.tt && isFunction(privacyHeader.tt.hide)) {
                privacyHeader.tt.hide();
            }
        }
        cur.privSel = cur.privSelIndex = false;
        removeEvent(document, 'click', Privacy.qhide);
    },
    show: function(el, ev, key, delta) {
        var p = cur.privacy[key],
            noselect = (key.indexOf('actions') != -1),
            elWrap = gpeByClass('privacy_edit_wrap', el);
        if (!p || !elWrap) return;

        if (cur.onPrivacyShow) cur.onPrivacyShow(key);

        if (!cur.privEl) {
            if (cur.privEl = ge('privacy_dropdown')) {
                cur.privRows = cur.privEl.firstChild;
            }
        }
        if (!cur.privEl) {
            cur.privEl = elWrap.appendChild(ce('div', {
                id: 'privacy_dropdown',
                innerHTML: '<div class="rows"></div>'
            }));
            cur.privRows = cur.privEl.firstChild;
            addEvent(cur.privEl, 'mouseout', Privacy.hide.pbind(500));
            addEvent(cur.privEl, 'mouseover', function() {
                clearTimeout(cur.hidePrivacyTimer);
            });
        } else if (cur.privEl.parentNode != elWrap) {
            re(cur.privEl);
            cur.privEl = elWrap.appendChild(cur.privEl);
            var privacyHeader = ge('privacy_header');
            if (privacyHeader && privacyHeader.tt && isFunction(privacyHeader.tt.hide)) {
                privacyHeader.tt.hide();
            }
        }
        cur.privEl.className = 'privacy_dropdown privacy_dropdown_' + key;
        setTimeout(addEvent.pbind(document, 'click', Privacy.qhide), 1);

        var types = cur.privacy[key + '_types'] || cur.privacy._types;
        var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};
        var hidden = cur.privacy[key + '_hidden'] || cur.privacy._hidden || {};
        var fontSize = getStyle(el, 'fontSize') || vk.fs;
        setStyle(cur.privRows, {
            fontSize: fontSize
        });

        cur.privSelIndex = p[0];
        if (hidden[cur.privSelIndex]) {
            cur.privSelIndex = 0;
        }

        var html = [],
            sel, handlers, hasLists = false;
        for (var i in lists) {
            hasLists = true;
            break;
        }
        html.push('<div class="header" onclick="Privacy.hide(-1)"><div id="privacy_header" class="header_label">' + el.innerHTML + '</div></div>');
        html.push('<div class="body">');
        for (var i in types) {
            if (hidden[i]) {
                continue;
            }
            sel = (i == cur.privSelIndex && i != Privacy.listsType) ? '_sel' : '';
            handlers = 'onmouseover="Privacy.select(\'' + i + '\')" onclick="Privacy.choose(event, \'' + i + '\')"';
            if (i == Privacy.listsType) {
                if (!hasLists) {
                    continue;
                }
            } else {
                handlers += ' onmouseout="Privacy.unselect(\'' + i + '\')"';
            }
            if (sel && i == Privacy.someType) {
                sel += '_plus';
            }
            html.push('<div class="item' + sel + '" id="privacy_item' + i + '" ' + handlers + '>' + types[i] + '</div>');
        }
        if (types[Privacy.listsType] && hasLists) {
            var hideLists = (cur.privSelIndex != Privacy.listsType);
            html.push('<div id="privacy_lists" class="privacy_lists">');
            html.push('<div class="l_header" onclick="return cancelEvent(event)"><div class="l_header_label">' + types[Privacy.listsType] + '</div></div>');
            for (var i in lists) {
                var _i = parseInt(i);
                var sel = hideLists ? '' : (inArray(-_i, p[2]) ? '_sel' : '');
                html.push('<div class="l_item' + sel + '" id="privacy_l_item' + _i + '" onclick="Privacy.choose(event, ' + Privacy.listsType + ', ' + _i + ')"><div class="privacy_item_icon"></div>' + lists[i] + '</div>');
            }
            html.push('</div>');
        }
        html.push('</div>');
        cur.privRows.innerHTML = html.join('');
        cur.privSel = key;

        var tw = data(cur.privEl, 'tween');
        if (tw) tw.stop(true);
        show(cur.privEl);
        if (types[Privacy.listsType] && hideLists) {
            hide('privacy_lists');
        }

        Privacy.toup = false;
        if (getClientRectOffsetY(cur.privEl) > 0 && getClientRectOffsetY(cur.privEl, false, getSize(cur.privEl)[1]) > 0) {
            Privacy.toup = true;

            var r = cur.privRows;
            r.appendChild(r.firstChild);

            var b = r.firstChild;
            for (var e = b.firstChild, t = false; e.nextSibling && e.nextSibling != t; e = b.firstChild) {
                if (t) {
                    t = b.insertBefore(e, t);
                } else {
                    t = b.appendChild(e);
                }
            }

            var l = b.firstChild;
            if (l.id == 'privacy_lists') {
                for (var e = l.firstChild, t = false; e.nextSibling && e.nextSibling != t; e = l.firstChild) {
                    if (t) {
                        t = l.insertBefore(e, t);
                    } else {
                        t = l.appendChild(e);
                    }
                }
            }
        }
        if (Privacy.toup) {
            addClass(cur.privEl, 'pdd_to_up');
        } else {
            removeClass(cur.privEl, 'pdd_to_up');
        }
        if (cur.privacy[key + '_ralign']) {
            addClass(cur.privEl, 'pdd_ralign');
        } else {
            removeClass(cur.privEl, 'pdd_ralign');
        }

        var helpText = cur.privacy[key + '_help'],
            hw = cur.privacy[key + '_help_w'];
        if (helpText) {
            var privacyHeader = ge('privacy_header'),
                pSz = getSize(privacyHeader);
            showTooltip(privacyHeader, {
                text: helpText,
                width: hw ? hw : 300,
                dir: 'left',
                slideX: 15,
                shift: [-(pSz[0] + 10), -pSz[1] / 2, 0],
                nohide: true
            });
        }
        return cancelEvent(ev);
    },
    getValue: function(key) {
        if (!cur.privacy || !cur.privacy[key]) {
            return '';
        }

        var p = cur.privacy[key],
            res = [];
        if (p[0] < Privacy.customType) {
            res = [p[0]];
        } else if (p[0] == Privacy.someType) {
            res = [4, p[2].join(',')];
        } else if (p[0] == Privacy.listsType) {
            var l = [];
            for (var i in p[2]) {
                l.push(-p[2][i]);
            }
            res = [5, l.join(',')];
        } else {
            res = [-1, p[1], p[2].join(','), p[3].join(',')];
        }
        return res.join('_');
    }
}

Privacy.qhide = Privacy.hide.pbind(-1);

try {
    jsDispatcher.triggerOnload('privacy.js');
} catch (e) {}
try {
    stManager.done('privacy.js');
} catch (e) {}