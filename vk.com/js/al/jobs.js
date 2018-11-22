var Jobs = {
    view: function(o, e) {
        return showWiki({
            w: "job" + o
        }, !1, e)
    },
    addVacancyBox: function() {
        return !showBox("al_jobs.php", {
            act: "add_box"
        }, {
            params: {
                dark: 1,
                width: 550
            }
        })
    },
    addVacancy: function(o) {
        var e = se(o),
            n = ge("jobs_vacancies_list");
        n.appendChild(e)
    },
    deleteVacancyBox: function(o, e) {
        return showFastBox({
            title: getLang("jobs_delete_vacancy"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("jobs_delete_vacancy_confirmation"), getLang("global_delete"), function(n) {
            ajax.post("al_jobs.php", {
                act: "delete",
                id: o,
                hash: e
            }, {
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n),
                onDone: function(e) {
                    e.error ? topError(e.error) : Jobs.deleteVacancy(o), curBox().hide()
                }
            })
        }, getLang("global_cancel")), !1
    },
    deleteVacancy: function(o) {
        re("jobs_job" + o)
    },
    editVacancyBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "edit_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 550
            }
        })
    },
    editVacancy: function(o, e, n, t) {
        var a = ge("jobs_job" + o + "_name"),
            i = ge("jobs_job" + o + "_text"),
            s = ge("jobs_job" + o + "_ordering");
        a.innerHTML = e, i.innerHTML = n, s.innerHTML = t
    },
    toggleVacancy: function(o, e) {
        var n = ge("jobs_job" + o + "_toggle_link"),
            t = ge("jobs_job" + o + "_upload"),
            a = intval(n.getAttribute("data-disabled"));
        return t.olddisplay = "inline-block", ajax.post("al_jobs.php", {
            act: "toggle",
            id: o,
            hash: e,
            disable: a ? 0 : 1
        }, {
            showProgress: function() {
                show(t)
            },
            hideProgress: function() {
                hide(t)
            },
            onDone: function(o) {
                n.setAttribute("data-disabled", a ? 0 : 1), n.innerHTML = getLang("jobs_" + (a ? "hide" : "show"))
            }
        }), !1
    },
    showInlineProgress: function() {
        show("jobs_progress_inline")
    },
    goToPage: function(o, e) {
        return this.showInlineProgress(), nav.go(o, e)
    },
    declineApplicationBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "decline_application_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 550,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    acceptApplicationBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "accept_application_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    editCommentBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "edit_comment_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    deleteApplicationBox: function(o, e) {
        return showFastBox({
            title: getLang("jobs_delete_application"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("jobs_delete_application_confirmation"), getLang("global_delete"), function(n) {
            ajax.post("al_jobs.php", {
                act: "delete_application",
                id: o,
                hash: e
            }, {
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n),
                onDone: function(e) {
                    re("jobs_application" + o), curBox().hide()
                }
            })
        }, getLang("global_cancel")), !1
    },
    toggleSubscribe: function(o, e, n) {
        var t = domData(o, "subscribed");
        ajax.post("jobs?act=a_toggle_subscribe", {
            job_id: e,
            hash: n,
            subscribed: t
        }, {
            onDone: function(e) {
                var n = e ? getLang("jobs_unsubscribe") : getLang("jobs_subscribe");
                domData(o, "subscribed", e), val(o, n)
            }
        })
    }
};
try {
    stManager.done("jobs.js")
} catch (e) {}