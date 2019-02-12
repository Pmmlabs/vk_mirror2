var Agents = {
    numberKeyDown: function(e) {
        if (e.keyCode == KEY.ENTER || e.keyCode == KEY.RETURN) {
            Agents.saveAgentNumbers(cur.userId, cur.hash);
        }
    },
    cleanAgentNumber: function(el, ev, userId, section, number, hash) {
        if (el.loading) {
            return;
        }
        var loaderEl = ge('agents_clean_number_loader_' + userId);
        ajax.post('agents.php?act=a_clean_agent_number', {
            section: section,
            number: number,
            hash: hash
        }, {
            showProgress: function() {
                el.loading = true;
                showProgress(loaderEl);
            },
            hideProgress: function() {
                el.loading = false;
                hideProgress(loaderEl);
            },
            onDone: function() {
                hide('agents_number_box_error_' + userId);
            }
        });
    },
    showNumberBox: function(el, userId, hash) {
        showBox('agents.php', {
            act: 'number_box',
            user_id: userId,
            hash: hash
        }, {
            onShow: function() {
                addEvent(document, 'keydown', Agents.numberKeyDown);
            },
            onHide: function() {
                removeEvent(document, 'keydown', Agents.numberKeyDown);
                delete cur.setNumberLoading;
            }
        });
    },
    saveAgentNumbers: function(userId, hash) {
        if (cur.setNumberLoading) {
            return;
        }
        var boxEl = ge('agents_number_box_' + userId),
            errorEl = ge('agents_number_box_error_' + userId),
            numbersEls = geByClass('_agents_section_number', boxEl),
            numbers = {},
            errorInputEl = false;
        each(numbersEls, function(k, el) {
            var section = domData(el, 'section'),
                numbers_list = trim(val(el)).replace(/[^0-9,]/g, '');
            if (!numbers_list) {
                errorInputEl = el;
                return false;
            }
            numbers[section] = numbers_list;
        });
        if (errorInputEl) {
            return notaBene(errorInputEl);
        }
        hide(errorEl);
        if (boxEl) {
            ajax.post('agents.php?act=a_save_agent_numbers', {
                user_id: userId,
                hash: hash,
                numbers: JSON.stringify(numbers)
            }, {
                showProgress: function() {
                    cur.setNumberLoading = true;
                    show(curBox().progress);
                },
                hideProgress: function() {
                    cur.setNumberLoading = false;
                    hide(curBox().progress);
                },
                onDone: function(agentNumbers) {
                    curBox().hide();
                    val('agent_num', agentNumbers);
                },
                onFail: function(res) {
                    val(errorEl, res);
                    show(errorEl);
                    delete cur.setNumberLoading;
                    return true;
                }
            });
        }
    },
    initJoinDateCalendar: function(day, month, year) {
        cur.agentJoinDate = day + '.' + month + '.' + year;
        cur.joinDateCalendar = new DateCalendar({
            hideNextMonth: true,
            container: ge('join_date_calendar'),
            day: {
                d: parseInt(day),
                m: parseInt(month),
                y: parseInt(year)
            },
            mode: 'd',
            getDay: function(d, m, y) {
                cur.joinDateCalendar.setDay(d, m, y);
                cur.agentJoinDate = d + '.' + m + '.' + y;
            }
        });
    },
    saveJoinDate: function(uid, hash, clear) {
        if (cur.saveJoinDateLoader) {
            return;
        }
        var query = {
            act: 'a_join_date_set',
            date: cur.agentJoinDate,
            uid: uid,
            hash: hash,
            clear: clear || 0
        };
        cur.saveJoinDateLoader = true;
        showProgress('join_date_progress');
        ajax.post('/agents.php', query, {
            onDone: function(date) {
                if (date) {
                    val('agent_join_date', date);
                    hideProgress('join_date_progress');
                    delete cur.saveJoinDateLoader;
                    curBox().hide();
                }
            }
        });
    },
    openJoinDateBox: function(uid) {
        showBox('/agents.php', {
            act: 'join_date_box',
            uid: uid
        }, {
            containerClass: 'agents_join_date_box'
        });
    },
    setReplyPhoto: function(el, uid, hash, photo) {
        var photos_list = geByClass('agent_reply_photo_box_row', 'reply_photos_list');
        each(photos_list, function(k, v) {
            removeClass(v, 'active');
        });
        addClass(el, 'active');
        var query = {
            act: 'a_reply_photo_set',
            uid: uid,
            hash: hash,
            photo: photo
        };
        ajax.post('/agents.php', query, {
            onDone: function(result_photo) {
                var photo = ge('agent_reply_photo');
                if (photo && result_photo) {
                    attr(photo, 'src', result_photo);
                }
            }
        });
    },
    openReplyPhotosBox: function(uid) {
        showBox('/agents.php', {
            act: 'reply_photos_box',
            uid: uid
        });
    },
    openCardsBox: function(e, uid, dept, type) {
        if (!checkEvent(e)) {
            cancelEvent(e);
            cur.agentsCardsBox = showBox('/agents.php', {
                act: 'modify_cards_box',
                uid: uid,
                type: type,
                dept: dept
            }, {});
        }
    },
    changeCards: function(uid, hash) {
        var delta = parseInt(val('agents_cards_form_delta'));
        if (isNaN(delta) || !delta) {
            return notaBene('agents_cards_form_delta');
        }
        ajax.post('/agents.php', {
            act: 'modify_cards',
            uid: uid,
            hash: hash,
            delta: delta,
            note: val('agents_cards_form_note'),
            type: cur.agentsCardTypeDD.val(),
            dept_id: cur.agentsCardDeptDD.val()
        }, {
            showProgress: cur.agentsCardsBox.showProgress,
            hideProgress: cur.agentsCardsBox.hideProgress
        });
    },
    loadCardsHistory: function(btn) {
        var params = {
            act: 'cards',
            max_id: cur.agentsCardsMaxId,
            load: 1
        };
        each(['uid', 'who_uid', 'type'], function(i, k) {
            if (nav.objLoc[k]) {
                params[k] = nav.objLoc[k];
            }
        });
        ajax.post('/agents.php', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html, maxId) {
                if (!maxId) {
                    hide(btn);
                } else {
                    cur.agentsCardsMaxId = maxId;
                }
                var c = ge('agents_cards_history_rows');
                each(sech(html), function(i, el) {
                    c.appendChild(el);
                });
            }
        });
    },
    applyCardsHistoryFilters: function() {
        var loc = {
            0: nav.objLoc[0],
            act: 'cards'
        };
        if (cur.agentsCardsUidDD.val() != 0) {
            loc['uid'] = cur.agentsCardsUidDD.val();
        }
        if (cur.agentsCardsWhoUidDD.val() != -1) {
            loc['who_uid'] = cur.agentsCardsWhoUidDD.val();
        }
        if (cur.agentsCardsTypeDD.val() != -1) {
            loc['type'] = cur.agentsCardsTypeDD.val();
        }
        if (cur.agentsCardsDeptDD.val() != 0) {
            loc['dept'] = cur.agentsCardsDeptDD.val();
        }
        uiTabs.showProgress(ge('ach_tabs'));
        nav.go(loc);
    }
};
try {
    stManager.done('agents.js');
} catch (e) {}