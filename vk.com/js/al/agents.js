var Agents = {
    numberKeyDown: function(e) {
        e.keyCode == KEY.ESC ? hide("edit_number_form") : (e.keyCode == KEY.ENTER || e.keyCode == KEY.RETURN) && (console.log("enter"), Agents.setNumber())
    },
    numberMouseDown: function(e) {
        for (var a = e.target; a.parentNode;) {
            if ("edit_number_form" == a.id) return;
            a = a.parentNode
        }
        hide("edit_number_form")
    },
    setNumberForm: function() {
        var e = ge("edit_number_form"),
            a = ge("edit_number_input"),
            n = val("agent_num").replace(/[^0-9]/g, ""),
            o = ge("edit_number_form_error");
        val(o, ""), hide(o), val(a, n), show(e), elfocus(a), addEvent(document, "keydown", Agents.numberKeyDown), addEvent(document, "mousedown", Agents.numberMouseDown)
    },
    setNumber: function(e) {
        if (!cur.setNumberLoading) {
            var a = intval(val("edit_number_input").replace(/[^0-9]/g, "")),
                n = ge("edit_number_form_error");
            return a ? void ajax.post("/agents.php", {
                act: "a_set_number",
                user_id: cur.userId,
                hash: cur.hash,
                num: a,
                force: e ? 1 : 0
            }, {
                onDone: function(e, o) {
                    1 == e ? (val("agent_num", "#" + a), hide("edit_number_form")) : (val(n, o), show(n))
                },
                showProgress: function() {
                    cur.setNumberLoading = !0, showProgress("agents_edit_number_form_progress")
                },
                hideProgress: function() {
                    cur.setNumberLoading = !1, hideProgress("agents_edit_number_form_progress")
                }
            }) : notaBene("edit_number_input")
        }
    },
    initJoinDateCalendar: function(e, a, n) {
        cur.agentJoinDate = e + "." + a + "." + n, cur.joinDateCalendar = new DateCalendar({
            hideNextMonth: !0,
            container: ge("join_date_calendar"),
            day: {
                d: parseInt(e),
                m: parseInt(a),
                y: parseInt(n)
            },
            mode: "d",
            getDay: function(e, a, n) {
                cur.joinDateCalendar.setDay(e, a, n), cur.agentJoinDate = e + "." + a + "." + n
            }
        })
    },
    saveJoinDate: function(e, a, n) {
        if (!cur.saveJoinDateLoader) {
            var o = {
                act: "a_join_date_set",
                date: cur.agentJoinDate,
                uid: e,
                hash: a,
                clear: n || 0
            };
            cur.saveJoinDateLoader = !0, showProgress("join_date_progress"), ajax.post("/agents.php", o, {
                onDone: function(e) {
                    e && (val("agent_join_date", e), hideProgress("join_date_progress"), delete cur.saveJoinDateLoader, curBox().hide())
                }
            })
        }
    },
    openJoinDateBox: function(e) {
        showBox("/agents.php", {
            act: "join_date_box",
            uid: e
        }, {
            containerClass: "agents_join_date_box"
        })
    },
    setReplyPhoto: function(e, a, n, o) {
        var t = geByClass("agent_reply_photo_box_row", "reply_photos_list");
        each(t, function(e, a) {
            removeClass(a, "active")
        }), addClass(e, "active");
        var r = {
            act: "a_reply_photo_set",
            uid: a,
            hash: n,
            photo: o
        };
        ajax.post("/agents.php", r, {
            onDone: function(e) {
                var a = ge("agent_reply_photo");
                a && e && attr(a, "src", e)
            }
        })
    },
    openReplyPhotosBox: function(e) {
        showBox("/agents.php", {
            act: "reply_photos_box",
            uid: e
        })
    },
    openCardsBox: function(e, a, n, o) {
        checkEvent(e) || (cancelEvent(e), cur.agentsCardsBox = showBox("/agents.php", {
            act: "modify_cards_box",
            uid: a,
            type: o,
            dept: n
        }, {}))
    },
    changeCards: function(e, a) {
        var n = parseInt(val("agents_cards_form_delta"));
        return isNaN(n) || !n ? notaBene("agents_cards_form_delta") : void ajax.post("/agents.php", {
            act: "modify_cards",
            uid: e,
            hash: a,
            delta: n,
            note: val("agents_cards_form_note"),
            type: cur.agentsCardTypeDD.val(),
            dept_id: cur.agentsCardDeptDD.val()
        }, {
            showProgress: cur.agentsCardsBox.showProgress,
            hideProgress: cur.agentsCardsBox.hideProgress
        })
    },
    loadCardsHistory: function(e) {
        var a = {
            act: "cards",
            max_id: cur.agentsCardsMaxId,
            load: 1
        };
        each(["uid", "who_uid", "type"], function(e, n) {
            nav.objLoc[n] && (a[n] = nav.objLoc[n])
        }), ajax.post("/agents.php", a, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(a, n) {
                n ? cur.agentsCardsMaxId = n : hide(e);
                var o = ge("agents_cards_history_rows");
                each(sech(a), function(e, a) {
                    o.appendChild(a)
                })
            }
        })
    },
    applyCardsHistoryFilters: function() {
        var e = {
            0: nav.objLoc[0],
            act: "cards"
        };
        0 != cur.agentsCardsUidDD.val() && (e.uid = cur.agentsCardsUidDD.val()), -1 != cur.agentsCardsWhoUidDD.val() && (e.who_uid = cur.agentsCardsWhoUidDD.val()), -1 != cur.agentsCardsTypeDD.val() && (e.type = cur.agentsCardsTypeDD.val()), 0 != cur.agentsCardsDeptDD.val() && (e.dept = cur.agentsCardsDeptDD.val()), uiTabs.showProgress(ge("ach_tabs")), nav.go(e)
    },
    _eof: 1
};
try {
    stManager.done("agents.js")
} catch (e) {}