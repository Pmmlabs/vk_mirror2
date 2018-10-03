var Agents = {
    numberKeyDown: function(e) {
        (e.keyCode == KEY.ENTER || e.keyCode == KEY.RETURN) && Agents.saveAgentNumbers(cur.userId, cur.hash)
    },
    cleanAgentNumber: function(e, a, n, o, t, r) {
        if (!e.loading) {
            var s = ge("agents_clean_number_loader_" + n);
            ajax.post("agents.php?act=a_clean_agent_number", {
                section: o,
                number: t,
                hash: r
            }, {
                showProgress: function() {
                    e.loading = !0, showProgress(s)
                },
                hideProgress: function() {
                    e.loading = !1, hideProgress(s)
                },
                onDone: function() {
                    hide("agents_number_box_error_" + n)
                }
            })
        }
    },
    showNumberBox: function(e, a, n) {
        showBox("agents.php", {
            act: "number_box",
            user_id: a,
            hash: n
        }, {
            onShow: function() {
                addEvent(document, "keydown", Agents.numberKeyDown)
            },
            onHide: function() {
                removeEvent(document, "keydown", Agents.numberKeyDown), delete cur.setNumberLoading
            }
        })
    },
    saveAgentNumbers: function(e, a) {
        if (!cur.setNumberLoading) {
            var n = ge("agents_number_box_" + e),
                o = ge("agents_number_box_error_" + e),
                t = geByClass("_agents_section_number", n),
                r = {},
                s = !1;
            if (each(t, function(e, a) {
                    var n = domData(a, "section"),
                        o = trim(val(a)).replace(/[^0-9,]/g, "");
                    return o ? void(r[n] = o) : (s = a, !1)
                }), s) return notaBene(s);
            hide(o), n && ajax.post("agents.php?act=a_save_agent_numbers", {
                user_id: e,
                hash: a,
                numbers: JSON.stringify(r)
            }, {
                showProgress: function() {
                    cur.setNumberLoading = !0, show(curBox().progress)
                },
                hideProgress: function() {
                    cur.setNumberLoading = !1, hide(curBox().progress)
                },
                onDone: function(e) {
                    curBox().hide(), val("agent_num", e)
                },
                onFail: function(e) {
                    return val(o, e), show(o), delete cur.setNumberLoading, !0
                }
            })
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
    }
};
try {
    stManager.done("agents.js")
} catch (e) {}