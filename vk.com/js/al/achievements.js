var Achievements = {
    updateSearch: function(e) {
        clearTimeout(cur.achievementsSearchTimeout), cur.achievementsSearchTimeout = setTimeout(Achievements.doUpdateSearch.pbind(e), 300)
    },
    doUpdateSearch: function(e) {
        var o = ge("ach_list");
        if (o) {
            e = e.toLowerCase();
            var a = domChildren(o),
                t = null;
            each(a, function(o, a) {
                if (removeClass(a, "ach_list_row_last_visible"), e) {
                    var s = val(geByClass1("_title", a)),
                        c = -1 != s.toLowerCase().indexOf(e);
                    toggle(a, c), c && (t = a)
                } else show(a)
            }), t && addClass(t, "ach_list_row_last_visible"), e ? nav.objLoc.q = e : delete nav.objLoc.q, nav.setLoc(nav.objLoc)
        }
    },
    save: function(e, o, a, t) {
        var s = {
            act: "save",
            id: o,
            hash: a,
            title: trim(val("ach_title")),
            descr: trim(val("ach_descr")),
            lore: trim(val("ach_lore")),
            photo_id: trim(val("ach_photo_id")),
            parent_id: cur.achParentDD.val(),
            weight: val("ach_weight"),
            hidden: cur.achHiddenDD ? cur.achHiddenDD.val() : 0,
            challenged: isChecked("ach_challenged") ? 1 : 0,
            grant_type: cur.achGrantTypeDD ? cur.achGrantTypeDD.val() : 0,
            unlocked: isChecked("ach_unlocked") ? 1 : 0
        };
        return t && (s["return"] = 1), s.title ? void ajax.post("achievements.php", s, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }) : notaBene("ach_title")
    },
    addLink: function(e, o, a) {
        var t = {
            act: "add_link",
            uid: cur.addAchLinkUserDD.val(),
            public_note: trim(val("ach_link_public_note")),
            ts_expire: trim(val("ach_link_ts_expire")),
            aid: o,
            hash: a
        };
        t.uid && ajax.post("achievements.php", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                if (e) {
                    var o = ge("ach_links_list");
                    o.insertBefore(se(e), o.firstChild), cur.addAchLinkUserDD.val(""), val("ach_link_public_note", ""), val("ach_link_ts_expire", 0)
                } else notaBene()
            }
        })
    },
    removeLink: function(e, o, a, t) {
        var s = gpeByClass("ach_links_list_row", e);
        ajax.post("achievements.php", {
            act: "remove_link",
            uid: o,
            aid: a,
            hash: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                slideUp(s, 300, function() {
                    re(s)
                })
            }
        })
    },
    openEditLinkBox: function(e, o) {
        cur.editLinkBox = showBox("/ach", {
            act: "edit_link_box",
            uid: e,
            aid: o
        }, {
            params: {
                width: 500
            }
        })
    },
    saveLink: function(e, o, a, t) {
        ajax.post("/ach", {
            act: "save_link",
            uid: e,
            aid: o,
            hash: a,
            note: val("ach_edit_link_note")
        }, {
            showProgress: cur.editLinkBox.showProgress,
            hideProgress: cur.editLinkBox.hideProgress,
            onDone: t
        })
    },
    updateLinkNote: function(e, o, a) {
        var t = geByClass1("_note", "ach_links_list_row" + e + "_" + o);
        val(t, a), cur.editLinkBox.hide()
    },
    showTooltip: function(e, o, a) {
        (!hasClass(e, "agent_ach_blur") || hasClass(e, "agent_ach_blur_ignore")) && showTooltip(e, {
            dir: "top",
            url: "ach",
            params: {
                act: "tt",
                id: o,
                mid: a
            },
            center: !0,
            className: "ach_tt",
            shift: [0, -5, 0],
            onHide: function() {
                removeClass("achievements", "achievements_opacity"), removeClass(e, "agent_ach_marked")
            }
        })
    },
    loadMoreHistory: function(e) {
        var o = ge("ach_history_rows"),
            a = {
                act: "history",
                load: 1,
                last_id: attr(domLC(o), "log-id")
            };
        each(["type", "aid", "uid", "who_uid"], function(e, o) {
            nav.objLoc[o] && (a[o] = nav.objLoc[o])
        }), ajax.post("/ach", a, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(a, t) {
                each(sech(a), function(e, a) {
                    o.appendChild(a)
                }), toggle(e, t)
            }
        })
    },
    showProgressTT: function(e, o) {
        showTooltip(e, {
            center: 1,
            dir: "bottom",
            text: o,
            typeClass: "tt_black"
        })
    },
    openRequestBox: function(e, o, a) {
        cur.achRequestBox = showBox("ach", {
            act: "request_box",
            aid: a,
            uid: o
        }, {
            params: {
                width: 620
            }
        })
    },
    sendRequest: function(e, o) {
        ajax.post("/ach", {
            act: "send_request",
            uid: e,
            aid: o,
            note: val("ach_request_note")
        }, {
            showProgress: cur.achRequestBox.showProgress,
            hideProgress: cur.achRequestBox.hideProgress,
            onDone: function(e) {
                val("ach_block_request", e), cur.achRequestBox.hide()
            }
        })
    },
    cancelRequest: function(e, o, a) {
        ajax.post("/ach", {
            act: "cancel_request",
            uid: e,
            aid: o,
            hash: a
        }, {
            onDone: function(e) {
                val("ach_block_request", e), cur.achRequestBox.hide()
            }
        })
    },
    processRequest: function(e, o, a, t, s) {
        ajax.post("/ach", {
            act: "process_request",
            uid: o,
            aid: a,
            hash: t,
            result: s
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                var t = ge("ach_request_row" + o + "_" + a),
                    s = t.parentNode;
                hasClass(t, "ach_request_row_closed") ? s.replaceChild(se(e), t) : (s = ge("ach_request_closed_rows"), re(t), s.insertBefore(se(e), s.firstChild), geByClass1("ach_request_row", "ach_request_new_rows") || show("ach_request_rows_empty"))
            }
        })
    },
    openChoosePhotoBox: function() {
        cur.achChoosePhotoBox = showBox("/ach", {
            act: "choose_photo_box",
            current: val("ach_photo_id")
        }, {
            params: {
                width: 800
            }
        })
    },
    choosePhoto: function(e, o) {
        val("ach_photo_id", e), show("ach_form_image"), ge("ach_form_image__img").src = o, cur.achChoosePhotoBox.hide()
    },
    applyHistoryFilters: function() {
        var e = {
            0: nav.objLoc[0],
            act: nav.objLoc.act
        };
        cur.achievementsAchDD.val() && (e.aid = cur.achievementsAchDD.val()), nav.go(e)
    },
    hideUnlocked: function(e) {
        slideUp("agent_unlocked_achievements", 500, function() {
            re("agent_unlocked_achievements");
            var e = ge("achievements_top_notify");
            val(e) || re(e)
        }), ajax.post("ach", {
            act: "hide_unlocked",
            mid: e
        })
    },
    _eof: 1
};
try {
    stManager.done("achievements.js")
} catch (e) {}