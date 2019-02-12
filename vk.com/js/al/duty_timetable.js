var DTT = {
    showDoneBox: function(msg) {
        if (!msg) {
            DTT.hideDoneBox();
            return;
        }
        var b = ge('dtt_done_box'),
            r = ge('dtt_done_box_replacer');
        val(geByClass1('_content', b), msg);
        show(b);
        var h = getSize(b)[1];
        r.style.height = h + 'px';
        show(r);
    },
    hideDoneBox: function() {
        hide('dtt_done_box');
        hide('dtt_done_box_replacer');
    },

    initMonthly: function() {
        //cur.cellsSelected = 0;
    },
    initDaily: function(prevUid) {
        var el = ge('dtt_day_u');
        if (el) {
            cur.shiftEditorUser = new Dropdown(el, cur.users, {
                width: 180,
                autocomplete: true,
                multiple: false,
                placeholder: getLang('timetable_user_placeholder'),
                selectedItems: cur.users[0][0]
            });
            if (prevUid) {
                cur.shiftEditorUser.val(prevUid);
            }
        }
    },
    showShiftEditor: function(tt_id, cell) {
        if (hasClass(cell, '_editing')) {
            return;
        }

        addClass(cell, '_editing');
        addClass(cell, 'dtt_day_h_editing');
        var v = val(cell);
        data(cell, 'old_val', v);
        val(cell, cur.shiftEditor.split('%id%').join(tt_id));
        var inp = ge('dtt_editor_' + tt_id);
        val(inp, v);
        elfocus(inp);
    },
    shiftEditorCheckKey: function(dept, tt_id, e, input) {
        if (e.keyCode == KEY.ENTER) {
            DTT.saveShiftEditor(dept, tt_id, input);
        } else if (e.keyCode == KEY.ESC) {
            try {
                DTT.cancelShiftEdit(domPN(input));
            } catch (e) {

            }
        }
    },
    shiftEditorBlur: function(tt_id, e, inp) {
        var cell = domPN(inp),
            v = data(cell, 'old_val');
        if (!hasClass(cell, '_saving') && v == val(inp)) {
            DTT.cancelShiftEdit(cell);
        }
    },
    cancelShiftEdit: function(cell) {
        if (!hasClass(cell, '_saving')) {
            val(cell, data(cell, 'old_val'));
            removeClass(cell, '_editing');
            removeClass(cell, 'dtt_day_h_editing');
            return true;
        }
        return false;
    },
    saveShiftEditor: function(dept, tt_id, input) {
        var cell = domPN(input),
            uid = cur.shiftEditorUser ? cur.shiftEditorUser.val() : cur.shiftUser;
        if (!tt_id && !uid) {
            if (cur.shiftEditorUser) {
                notaBene(cur.shiftEditorUser.container);
            }
            return;
        }
        ajax.post('duty_timetable.php?act=a_edit', {
            id: tt_id,
            dept: dept,
            val: val(input),
            ts: nav.objLoc['ts'],
            uid: uid
        }, {
            showProgress: function() {
                attr(input, 'readonly', 'readonly');
                addClass(cell, '_saving');
            },
            hideProgress: function() {
                input.removeAttribute('readonly');
                removeClass(cell, '_saving');
            },
            onDone: function(msg, fillingInfo, table, detailed) {
                DTT.showDoneBox(detailed);
                var editing = [];
                var prevUserId = uid;
                removeClass(cell, '_editing');
                removeClass(cell, 'dtt_day_h_editing');
                each(geByClass('_editing', 'dtt_day'), function(i, c) {
                    editing.push([c.id, val(c), val(domFC(c)), data(c, 'old_val')]);
                });
                domReplaceEl(ge('dtt_day_filling'), se(fillingInfo));
                domReplaceEl(ge('dtt_day'), se(table));
                each(editing, function(i, p) {
                    var cell = ge(p[0]);
                    if (!cell) {
                        return;
                    }
                    addClass(cell, '_editing');
                    addClass(cell, 'dtt_day_h_editing');
                    val(cell, p[1]);
                    var inp = domFC(cell);
                    val(inp, p[2]);
                    data(cell, 'old_val', p[3]);
                    if (i == 0) {
                        elfocus(inp);
                    }
                });
                DTT.initDaily(prevUserId);
            },
            onFail: function() {
                notaBene(input);
            }
        });
    },

    removeShift: function(dept, id, button) {
        var input = ge('dtt_editor_' + id);
        if (input) {
            DTT.cancelShiftEdit(domPN(input));
        }
        ajax.post('duty_timetable.php', {
            act: 'a_remove',
            dept: dept,
            id: id,
            ts: nav.objLoc['ts']
        }, {
            onDone: function(html, fillingInfo) {
                var c = gpeByClass('_a', button);
                data(c, 'content', val(c));
                val(c, html);
                domReplaceEl(ge('dtt_day_filling'), se(fillingInfo));
            }
        });
    },
    restoreShift: function(dept, id, button) {
        var inp = ge('dtt_editor_' + id);
        if (inp) {
            DTT.cancelShiftEdit(domPN(inp));
        }
        ajax.post('duty_timetable.php', {
            act: 'a_restore',
            dept: dept,
            id: id,
            ts: nav.objLoc['ts']
        }, {
            onDone: function(fillingInfo) {
                var c = gpeByClass('_a', button);
                val(c, data(c, 'content'));
                domReplaceEl(ge('dtt_day_filling'), se(fillingInfo));
            }
        });
    },

    dayKeyDownHandler: function(e) {
        if (e.ctrlKey || (e.metaKey && browser.mac)) {
            var n = null;
            if (e.keyCode == KEY.LEFT) {
                n = extend({}, nav.objLoc);
                n['ts'] = cur.prevDayTs;
            } else if (e.keyCode == KEY.RIGHT) {
                n = extend({}, nav.objLoc);
                n['ts'] = cur.nextDayTs;
            }
            if (n) {
                nav.go(n);
                cancelEvent(e);
            }
        }
    },
    monthKeyDownHandler: function(e) {
        if (e.ctrlKey || (e.metaKey && browser.mac)) {
            if (e.keyCode == 67) {
                DTT.openCopyBox(null, cur.dept);
            } else if (e.keyCode == 88) {
                DTT.openCopyBox(null, cur.dept, 1);
            }
        }
    },
    openCopyBox: function(btn, dept, move) {
        var p = {
            act: 'copy_box',
            cells: DTT.getDayPairs(),
            dept: dept,
            move: move ? 1 : 0
        };
        if (!p.cells.length) {
            return;
        }
        cur.copyBox = showBox('duty_timetable.php', p);
    },
    copy: function() {
        var btn = ge('dtt_copy_box_btn');
        ajax.post('duty_timetable.php', {
            act: cur.move ? 'a_move' : 'a_copy',
            dept: cur.dept,
            cells: cur.cells,
            ts_to: val('dtt_copy_box_to'),
            uid_to: cur.users.length ? cur.copyBoxUserDD.val() : 0,
            ts: nav.objLoc['ts']
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(msg, html, detailed) {
                domReplaceEl(ge('dtt_month'), se(html));
                DTT.updatePanel(true);
                cur.copyBox.hide();
                DTT.showDoneBox(detailed);
            }
        });
    },
    getDayPairs: function() {
        var cells = geByClass('_sel', 'dtt_month'),
            r = [];
        if (!cells.length) {
            return r;
        }
        each(cells, function(i, c) {
            r.push(attr(c, 'uid') + '_' + attr(c, 'ts'));
        });
        return r;
    },
    clearDaySel: function() {
        var cells = geByClass('_sel', 'dtt_month');
        each(cells, function(i, c) {
            removeClass(c, '_sel');
            removeClass(c, 'dtt_month_d_sel');
        });
        DTT.updatePanel(true);
        return cells.length;
    },
    dayOver: function(e, el) {
        var c;
        if (!cur.mousePressed) {
            return;
        }
        if (e.shiftKey) {
            c = domPN(el);
            toggleClass(c, 'dtt_month_d_sel', cur.mouseBrushSel);
            toggleClass(c, '_sel', cur.mouseBrushSel);
            DTT.updatePanel();
            cancelEvent(e);
        } else if (e.altKey) {
            c = domPN(el);
            if (hasClass(c, '_sel')) {
                removeClass(c, 'dtt_month_d_sel');
                removeClass(c, '_sel');
                DTT.updatePanel();
            }
            cancelEvent(e);
        }
    },
    dayOut: function(e, el) {
        var c = domPN(el);
    },
    dayDown: function(e, el) {
        if (e.shiftKey) {
            cur.mousePressed = true;
            var c = domPN(el);
            cur.mouseBrushSel = !hasClass(c, '_sel');
            toggleClass(c, 'dtt_month_d_sel', cur.mouseBrushSel);
            toggleClass(c, '_sel', cur.mouseBrushSel);
            DTT.updatePanel();
            cancelEvent(e);
            cur.overEl = c;
        } else if (e.altKey) {
            cur.mousePressed = true;
            c = domPN(el);
            if (hasClass(c, '_sel')) {
                removeClass(c, 'dtt_month_d_sel');
                removeClass(c, '_sel');
                DTT.updatePanel();
            }
            cur.overEl = c;
            cancelEvent(e);
        }
    },
    dayUp: function(e, el) {
        cur.mousePressed = false;
        var c = domPN(el);
    },
    dayClick: function(e, el) {
        c = domPN(el);
        if (e.ctrlKey || (e.metaKey && browser.mac)) {
            DTT.openDayBox(c);
            cancelEvent(e);
        } else if (e.shiftKey || e.altKey) {
            var c = domPN(el);
            if (c == cur.overEl) {
                cancelEvent(e);
            }
        } else if (DTT.clearDaySel()) {
            cancelEvent(e);
        }
    },
    updatePanel: function(forceHide) {
        var selected = [];
        if (!forceHide) {
            selected = geByClass('_sel', 'dtt_month');
        }
        toggle('dtt_month_actions', selected.length);
        if (selected.length) {
            var m = {
                    uhours: [getLang('timetable_u_hours'), 0],
                    nhours: [getLang('timetable_n_hours'), 0],
                    hhours: [getLang('timetable_h_hours'), 0],
                    nhhours: [getLang('timetable_nh_hours'), 0]
                },
                total = 0;
            each(selected, function(i, cell) {
                each(m, function(aName, e) {
                    var h = parseInt(attr(cell, aName));
                    m[aName][1] += h;
                    total += h;
                });
            });
            var details = [];
            each(m, function(aName, d) {
                if (d[1] > 0) {
                    details.push(d[0].replace('%s', d[1]));
                }
            });
            val('dtt_month_actions_hours_details', details.join('<br>'));
            val('dtt_month_actions_hours_total', getLang('timetable_total_hours').replace('%s', total));
        }
    },
    openDayBox: function(cell) {
        cur.dttDayBox = showBox('duty_timetable.php', {
            act: 'day_box',
            dept: cur.dept,
            uid: attr(cell, 'uid'),
            ts: attr(cell, 'ts')
        }, {
            params: {
                hideButtons: true,
                width: 300,
                onHide: removeEvent.pbind(document, 'keydown', DTT.dayBoxKeyHandler)
            }
        }, {
            type: 'custom'
        });
    },
    dayBoxInputKeyHandler: function(e) {
        if (e.keyCode == 13) {
            DTT.saveDayBox(e.target);
        }
        if (e.keyCode != KEY.ESC && e.keyCode != 84) {
            e.stopPropagation();
        }
        if (e.keyCode == 84) {
            e.preventDefault();
        }
    },
    dayBoxKeyHandler: function(e) {
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            var btn = ge('btt_day_box_btn' + (e.keyCode - 48));
            if (btn) {
                DTT.saveDayBox(btn);
            }
        } else if (e.keyCode == 84) {
            var btn = ge('dtt_day_box_use_template');
            if (btn) {
                DTT.saveDayBoxTemplates(btn);
            }
        }
    },
    saveDayBox: function(button) {
        ajax.post('duty_timetable.php', {
            act: 'a_save_day',
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            val: val(button),
            ts: nav.objLoc['ts']
        }, {
            showProgress: addClass.pbind(button, 'dtt_day_box_btn_locked'),
            hideProgress: removeClass.pbind(button, 'dtt_day_box_btn_locked'),
            onDone: function(msg, html, detailed) {
                domReplaceEl(ge('dtt_month'), se(html));
                DTT.updatePanel(true);
                cur.dttDayBox.hide();
                DTT.showDoneBox(detailed);
            }
        });
    },
    saveDayBoxTemplates: function(button) {
        ajax.post('duty_timetable.php', {
            act: 'a_save_day_templates',
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            ts: nav.objLoc['ts']
        }, {
            showProgress: lockButton.pbind(button),
            hideProgress: unlockButton.pbind(button),
            onDone: function(msg, html, detailed) {
                domReplaceEl(ge('dtt_month'), se(html));
                DTT.updatePanel(true);
                cur.dttDayBox.hide();
                DTT.showDoneBox(detailed);
            }
        });
    },
    dayTT: function(e, el, text) {
        var p = {
            center: 1,
            dir: 'top',
            className: 'dtt_month_day_tt'
        };
        if (!hasClass(domPN(el), '_no_hours')) {
            p.text = text;
        } else {
            p.text = getLang('timetable_no_entries');
        }
        showTooltip(el, p);
        cancelEvent(e);
    },
    openTemplatesEditor: function(uid) {
        cur.dttTemplatesBox = showBox('duty_timetable.php', {
            act: 'templates_box',
            id: uid,
            dept: cur.dept
        }, {
            params: {
                width: 400
            }
        });
    },
    templateRemoveRow: function(button) {
        var rows = geByClass('_row', 'dtt_templates_box_list'),
            row = gpeByClass('_row', button);
        if (rows.length == 1) {
            val(geByClass1('_input', row), '');
        } else {
            re(row);
        }
    },
    templateKeyDown: function(e, el) {
        if (e.keyCode == KEY.ENTER) {
            var row = gpeByClass('_row', el),
                nextRow = domNS(row);
            if (!nextRow) {
                nextRow = se(cur.dttTemplateBoxRowTemplate);
                ge('dtt_templates_box_list').appendChild(nextRow);
            }
            elfocus(geByClass1('_input', nextRow));
            cancelEvent(e);
        }
    },
    saveTemplates: function() {
        var hours = [];
        each(geByClass('_input', 'dtt_templates_box_list'), function(i, el) {
            hours.push(val(el));
        });
        ajax.post('duty_timetable.php?act=a_save_templates', {
            id: cur.dttTemplateBoxUid,
            dept: cur.dept,
            hours: hours
        }, {
            onDone: function(msg) {
                cur.dttTemplatesBox.hide();
                showDoneBox(msg);
            }
        });
    },
    monthHeadTT: function(el, text) {
        showTooltip(el, {
            center: 1,
            dir: 'top',
            className: 'dtt_month_day_tt',
            text: text
        });
    },
    dayFillingTT: function(el, text) {
        showTooltip(el, {
            center: 1,
            dir: 'top',
            className: 'dtt_month_day_tt',
            text: text
        });
    },
    weeklyLoadMore: function(button) {
        var n = extend({}, nav.objLoc);
        n['ts'] = cur.dttWeeklyTsTo;
        n['load'] = 1;
        ajax.post('duty_timetable.php', n, {
            showProgress: lockButton.pbind(button),
            hideProgress: unlockButton.pbind(button),
            onDone: function(html, newTs) {
                cur.dttWeeklyTsTo = newTs;
                var rows = sech(html),
                    c = ge('dtt_weekly_rows');
                each(rows, function(i, el) {
                    c.appendChild(el);
                });
            }
        });
    },

    showSettingsTooltip: function() {
        var icon = geByClass1('settings_icon');
        showTooltip(icon, {
            content: getTemplate('duty_timetable_settings_tt'),
            className: 'settings_tt',
            dir: 'up',
            showdt: 300,
            hidedt: 100,
            hasover: true,
            shift: function() {
                var settingsMenu = geByClass1('settings_fields');
                show(settingsMenu);
                var height = settingsMenu.clientHeight;
                return [170, -25 - height];
            }
        });
    },
    toggleWeeklyShifts: function() {
        ajax.post('duty_timetable.php', {
            act: 'a_toggle_weekly_shifts_landing'
        });
    }
};

try {
    stManager.done('duty_timetable.js');
} catch (e) {}