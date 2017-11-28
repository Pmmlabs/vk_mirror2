var DTT = {
    showDoneBox: function(t) {
        if (!t) return void DTT.hideDoneBox();
        var e = ge("dtt_done_box"),
            o = ge("dtt_done_box_replacer");
        val(geByClass1("_content", e), t), show(e);
        var a = getSize(e)[1];
        o.style.height = a + "px", show(o)
    },
    hideDoneBox: function() {
        hide("dtt_done_box"), hide("dtt_done_box_replacer")
    },
    initMonthly: function() {},
    initDaily: function(t) {
        var e = ge("dtt_day_u");
        e && (cur.shiftEditorUser = new Dropdown(e, cur.users, {
            width: 180,
            autocomplete: !0,
            multiple: !1,
            placeholder: getLang("timetable_user_placeholder"),
            selectedItems: cur.users[0][0]
        }), t && cur.shiftEditorUser.val(t))
    },
    showShiftEditor: function(t, e) {
        if (!hasClass(e, "_editing")) {
            addClass(e, "_editing"), addClass(e, "dtt_day_h_editing");
            var o = val(e);
            data(e, "old_val", o), val(e, cur.shiftEditor.split("%id%").join(t));
            var a = ge("dtt_editor_" + t);
            val(a, o), elfocus(a)
        }
    },
    shiftEditorCheckKey: function(t, e, o, a) {
        if (o.keyCode == KEY.ENTER) DTT.saveShiftEditor(t, e, a);
        else if (o.keyCode == KEY.ESC) try {
            DTT.cancelShiftEdit(domPN(a))
        } catch (o) {}
    },
    shiftEditorBlur: function(t, e, o) {
        var a = domPN(o),
            n = data(a, "old_val");
        hasClass(a, "_saving") || n != val(o) || DTT.cancelShiftEdit(a)
    },
    cancelShiftEdit: function(t) {
        return hasClass(t, "_saving") ? !1 : (val(t, data(t, "old_val")), removeClass(t, "_editing"), removeClass(t, "dtt_day_h_editing"), !0)
    },
    saveShiftEditor: function(t, e, o) {
        var a = domPN(o),
            n = cur.shiftEditorUser.val();
        return e || n ? void ajax.post("duty_timetable.php", {
            act: "a_edit",
            id: e,
            dept: t,
            val: val(o),
            ts: nav.objLoc.ts,
            uid: n
        }, {
            showProgress: function() {
                attr(o, "readonly", "readonly"), addClass(a, "_saving")
            },
            hideProgress: function() {
                o.removeAttribute("readonly"), removeClass(a, "_saving")
            },
            onDone: function(t, e, o, s) {
                DTT.showDoneBox(s);
                var d = [],
                    l = n;
                removeClass(a, "_editing"), removeClass(a, "dtt_day_h_editing"), each(geByClass("_editing", "dtt_day"), function(t, e) {
                    d.push([e.id, val(e), val(domFC(e)), data(e, "old_val")])
                }), domReplaceEl(ge("dtt_day_filling"), se(e)), domReplaceEl(ge("dtt_day"), se(o)), each(d, function(t, e) {
                    var o = ge(e[0]);
                    if (o) {
                        addClass(o, "_editing"), addClass(o, "dtt_day_h_editing"), val(o, e[1]);
                        var a = domFC(o);
                        val(a, e[2]), data(o, "old_val", e[3]), 0 == t && elfocus(a)
                    }
                }), DTT.initDaily(l)
            },
            onFail: function() {
                notaBene(o)
            }
        }) : void notaBene(cur.shiftEditorUser.container)
    },
    removeShift: function(t, e, o) {
        var a = ge("dtt_editor_" + e);
        a && DTT.cancelShiftEdit(domPN(a)), ajax.post("duty_timetable.php", {
            act: "a_remove",
            dept: t,
            id: e,
            ts: nav.objLoc.ts
        }, {
            onDone: function(t, e) {
                var a = gpeByClass("_a", o);
                data(a, "content", val(a)), val(a, t), domReplaceEl(ge("dtt_day_filling"), se(e))
            }
        })
    },
    restoreShift: function(t, e, o) {
        var a = ge("dtt_editor_" + e);
        a && DTT.cancelShiftEdit(domPN(a)), ajax.post("duty_timetable.php", {
            act: "a_restore",
            dept: t,
            id: e,
            ts: nav.objLoc.ts
        }, {
            onDone: function(t) {
                var e = gpeByClass("_a", o);
                val(e, data(e, "content")), domReplaceEl(ge("dtt_day_filling"), se(t))
            }
        })
    },
    dayKeyDownHandler: function(t) {
        if (t.ctrlKey || t.metaKey && browser.mac) {
            var e = null;
            t.keyCode == KEY.LEFT ? (e = extend({}, nav.objLoc), e.ts = cur.prevDayTs) : t.keyCode == KEY.RIGHT && (e = extend({}, nav.objLoc), e.ts = cur.nextDayTs), e && (nav.go(e), cancelEvent(t))
        }
    },
    monthKeyDownHandler: function(t) {
        (t.ctrlKey || t.metaKey && browser.mac) && (67 == t.keyCode ? DTT.openCopyBox(null, cur.dept) : 88 == t.keyCode && DTT.openCopyBox(null, cur.dept, 1))
    },
    openCopyBox: function(t, e, o) {
        var a = {
            act: "copy_box",
            cells: DTT.getDayPairs(),
            dept: e,
            move: o ? 1 : 0
        };
        a.cells.length && (cur.copyBox = showBox("duty_timetable.php", a))
    },
    copy: function() {
        var t = ge("dtt_copy_box_btn");
        ajax.post("duty_timetable.php", {
            act: cur.move ? "a_move" : "a_copy",
            dept: cur.dept,
            cells: cur.cells,
            ts_to: val("dtt_copy_box_to"),
            uid_to: cur.users.length ? cur.copyBoxUserDD.val() : 0,
            ts: nav.objLoc.ts
        }, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t),
            onDone: function(t, e, o) {
                domReplaceEl(ge("dtt_month"), se(e)), DTT.updatePanel(!0), cur.copyBox.hide(), DTT.showDoneBox(o)
            }
        })
    },
    getDayPairs: function() {
        var t = geByClass("_sel", "dtt_month"),
            e = [];
        return t.length ? (each(t, function(t, o) {
            e.push(attr(o, "uid") + "_" + attr(o, "ts"))
        }), e) : e
    },
    clearDaySel: function() {
        var t = geByClass("_sel", "dtt_month");
        return each(t, function(t, e) {
            removeClass(e, "_sel"), removeClass(e, "dtt_month_d_sel")
        }), DTT.updatePanel(!0), t.length
    },
    dayOver: function(t, e) {
        var o;
        cur.mousePressed && (t.shiftKey ? (o = domPN(e), toggleClass(o, "dtt_month_d_sel", cur.mouseBrushSel), toggleClass(o, "_sel", cur.mouseBrushSel), DTT.updatePanel(), cancelEvent(t)) : t.altKey && (o = domPN(e), hasClass(o, "_sel") && (removeClass(o, "dtt_month_d_sel"), removeClass(o, "_sel"), DTT.updatePanel()), cancelEvent(t)))
    },
    dayOut: function(t, e) {
        domPN(e)
    },
    dayDown: function(t, e) {
        if (t.shiftKey) {
            cur.mousePressed = !0;
            var o = domPN(e);
            cur.mouseBrushSel = !hasClass(o, "_sel"), toggleClass(o, "dtt_month_d_sel", cur.mouseBrushSel), toggleClass(o, "_sel", cur.mouseBrushSel), DTT.updatePanel(), cancelEvent(t), cur.overEl = o
        } else t.altKey && (cur.mousePressed = !0, o = domPN(e), hasClass(o, "_sel") && (removeClass(o, "dtt_month_d_sel"), removeClass(o, "_sel"), DTT.updatePanel()), cur.overEl = o, cancelEvent(t))
    },
    dayUp: function(t, e) {
        cur.mousePressed = !1;
        domPN(e)
    },
    dayClick: function(t, e) {
        if (o = domPN(e), t.ctrlKey || t.metaKey && browser.mac) DTT.openDayBox(o), cancelEvent(t);
        else if (t.shiftKey || t.altKey) {
            var o = domPN(e);
            o == cur.overEl && cancelEvent(t)
        } else DTT.clearDaySel() && cancelEvent(t)
    },
    updatePanel: function(t) {
        var e = [];
        if (t || (e = geByClass("_sel", "dtt_month")), toggle("dtt_month_actions", e.length), e.length) {
            var o = {
                    uhours: [getLang("timetable_u_hours"), 0],
                    nhours: [getLang("timetable_n_hours"), 0],
                    hhours: [getLang("timetable_h_hours"), 0],
                    nhhours: [getLang("timetable_nh_hours"), 0]
                },
                a = 0;
            each(e, function(t, e) {
                each(o, function(t, n) {
                    var s = parseInt(attr(e, t));
                    o[t][1] += s, a += s
                })
            });
            var n = [];
            each(o, function(t, e) {
                e[1] > 0 && n.push(e[0].replace("%s", e[1]))
            }), val("dtt_month_actions_hours_details", n.join("<br>")), val("dtt_month_actions_hours_total", getLang("timetable_total_hours").replace("%s", a))
        }
    },
    openDayBox: function(t) {
        cur.dttDayBox = showBox("duty_timetable.php", {
            act: "day_box",
            dept: cur.dept,
            uid: attr(t, "uid"),
            ts: attr(t, "ts")
        }, {
            params: {
                hideButtons: !0,
                width: 300,
                onHide: removeEvent.pbind(document, "keydown", DTT.dayBoxKeyHandler)
            }
        }, {
            type: "custom"
        })
    },
    dayBoxInputKeyHandler: function(t) {
        13 == t.keyCode && DTT.saveDayBox(t.target), t.keyCode != KEY.ESC && 84 != t.keyCode && t.stopPropagation(), 84 == t.keyCode && t.preventDefault()
    },
    dayBoxKeyHandler: function(t) {
        if (t.keyCode >= 49 && t.keyCode <= 57) {
            var e = ge("btt_day_box_btn" + (t.keyCode - 48));
            e && DTT.saveDayBox(e)
        } else if (84 == t.keyCode) {
            var e = ge("dtt_day_box_use_template");
            e && DTT.saveDayBoxTemplates(e)
        }
    },
    saveDayBox: function(t) {
        ajax.post("duty_timetable.php", {
            act: "a_save_day",
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            val: val(t),
            ts: nav.objLoc.ts
        }, {
            showProgress: addClass.pbind(t, "dtt_day_box_btn_locked"),
            hideProgress: removeClass.pbind(t, "dtt_day_box_btn_locked"),
            onDone: function(t, e, o) {
                domReplaceEl(ge("dtt_month"), se(e)), DTT.updatePanel(!0), cur.dttDayBox.hide(), DTT.showDoneBox(o)
            }
        })
    },
    saveDayBoxTemplates: function(t) {
        ajax.post("duty_timetable.php", {
            act: "a_save_day_templates",
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            ts: nav.objLoc.ts
        }, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t),
            onDone: function(t, e, o) {
                domReplaceEl(ge("dtt_month"), se(e)), DTT.updatePanel(!0), cur.dttDayBox.hide(), DTT.showDoneBox(o)
            }
        })
    },
    dayTT: function(t, e, o) {
        var a = {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt"
        };
        hasClass(domPN(e), "_no_hours") ? a.text = getLang("timetable_no_entries") : a.text = o, showTooltip(e, a), cancelEvent(t)
    },
    openTemplatesEditor: function(t) {
        cur.dttTemplatesBox = showBox("duty_timetable.php", {
            act: "templates_box",
            id: t,
            dept: cur.dept
        }, {
            params: {
                width: 400
            }
        })
    },
    templateRemoveRow: function(t) {
        var e = geByClass("_row", "dtt_templates_box_list"),
            o = gpeByClass("_row", t);
        1 == e.length ? val(geByClass1("_input", o), "") : re(o)
    },
    templateKeyDown: function(t, e) {
        if (t.keyCode == KEY.ENTER) {
            var o = gpeByClass("_row", e),
                a = domNS(o);
            a || (a = se(cur.dttTemplateBoxRowTemplate), ge("dtt_templates_box_list").appendChild(a)), elfocus(geByClass1("_input", a)), cancelEvent(t)
        }
    },
    saveTemplates: function() {
        var t = [];
        each(geByClass("_input", "dtt_templates_box_list"), function(e, o) {
            t.push(val(o))
        }), ajax.post("duty_timetable.php", {
            act: "a_save_templates",
            id: cur.dttTemplateBoxUid,
            dept: cur.dept,
            hours: t
        }, {
            onDone: function(t) {
                cur.dttTemplatesBox.hide(), showDoneBox(t)
            }
        })
    },
    monthHeadTT: function(t, e) {
        showTooltip(t, {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt",
            text: e
        })
    },
    dayFillingTT: function(t, e) {
        showTooltip(t, {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt",
            text: e
        })
    },
    weeklyLoadMore: function(t) {
        var e = extend({}, nav.objLoc);
        e.ts = cur.dttWeeklyTsTo, e.load = 1, ajax.post("duty_timetable.php", e, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t),
            onDone: function(t, e) {
                cur.dttWeeklyTsTo = e;
                var o = sech(t),
                    a = ge("dtt_weekly_rows");
                each(o, function(t, e) {
                    a.appendChild(e)
                })
            }
        })
    },
    showSettingsTooltip: function() {
        var t = geByClass1("settings_icon");
        showTooltip(t, {
            content: getTemplate("duty_timetable_settings_tt"),
            className: "settings_tt",
            dir: "up",
            showdt: 300,
            hidedt: 100,
            hasover: !0,
            shift: function() {
                var t = geByClass1("settings_fields");
                show(t);
                var e = t.clientHeight;
                return [170, -25 - e]
            }
        })
    },
    toggleWeeklyShifts: function() {
        ajax.post("duty_timetable.php", {
            act: "a_toggle_weekly_shifts_landing"
        })
    }
};
try {
    stManager.done("duty_timetable.js")
} catch (e) {}