var Login = {
    init: function() {
        each(geByClass("big_text", "login_form_wrap"), function(e, o) {
            placeholderInit(o)
        }), setTimeout(elfocus.pbind(val("email") ? "pass" : "email"), 0);
        var e = ge("login_form"),
            o = ge("email"),
            r = ge("pass");
        return e.onsubmit = function() {
            return window.submitQuickLoginForm ? trim(o.value) ? trim(r.value) ? (submitQuickLoginForm(o.value, r.value, {
                prg: "login_button",
                params: {
                    expire_input: val("expire_input")
                }
            }), !1) : (notaBene(r), !1) : (notaBene(o), !1) : !0
        }, window.loginByCredential && (o.onclick = loginByCredential, r.onclick = loginByCredential), !0
    },
    showFastRestore: function(e) {
        var o = gpeByClass("_retore_wrap", e);
        return each(geByClass("big_text", o), function(e, o) {
            placeholderInit(o)
        }), addClass(o, "shown"), elfocus("fast_restore_phone"), !1
    },
    showInputTooltip: function(e, o) {
        var r = getSize(e);
        showTooltip(e, {
            text: o,
            dir: "left",
            slideX: 15,
            className: "login_tt",
            shift: [-r[0] - 10, -r[1] / 2],
            onCreate: function() {
                removeEvent(e, "mouseout"), e.onblur = function() {
                    e.tt.hide()
                }
            }
        })
    },
    fastRestoreCheck: function() {
        cur.frPhone && (val("fast_restore_phone") == cur.frSentPhone ? show("login_fast_restore_code_row", "login_fast_restore_resend") : (hide("login_fast_restore_name_row", "login_fast_restore_code_row", "login_fast_restore_resend"), cur.frResendInt && (clearInterval(cur.frResendInt), cur.frResendInt = !1)))
    },
    fastRestoreResendUpdate: function(e) {
        cur.frResendDelay > 0 ? (ge("login_fast_restore_resend").innerHTML = getLang(e ? "join_send_code_via_sms_time" : "join_resend_code_time").replace("%s", Math.floor(cur.frResendDelay / 60) + ":" + (cur.frResendDelay % 60 < 10 ? "0" : "") + cur.frResendDelay % 60), cur.frResendDelay--) : (ge("login_fast_restore_resend").innerHTML = '<a onclick="return Login.fastRestoreResend(this);">' + getLang(e ? "join_send_code_via_sms" : "join_resend_code") + "</a>", clearInterval(cur.frResendInt), cur.frResendInt = !1)
    },
    fastRestoreResend: function(e) {
        var o = val("fast_restore_phone"),
            r = ce("span", {
                className: "progress_inline"
            }),
            n = domPN(e);
        return geByClass1("error", "login_fast_restore_error") || val("login_fast_restore_error", ""), ajax.post("/al_login.php?act=a_fast_restore_resend", {
            phone: o,
            restore: cur.frCode
        }, {
            onDone: function(e) {
                n.innerHTML = e, setTimeout(elfocus("fast_restore_code"), 0)
            },
            onFail: function(e) {
                return Login.showFastRestoreError(e, "fast_restore_code"), !0
            },
            showProgress: function() {
                e.parentNode == n && n.replaceChild(r, e)
            },
            hideProgress: function() {
                r.parentNode == n && n.replaceChild(e, r)
            }
        }), !1
    },
    fastRestore: function(e, o) {
        if (e = e || window.event, e && void 0 !== e.keyCode && "click" != e.type) {
            if (e.keyCode !== KEY.ENTER) return;
            if (e.target == ge("fast_restore_phone") && isVisible("login_fast_restore_code_row")) return elfocus("fast_restore_code"), cancelEvent(e)
        }
        var r, n = ge("login_fast_restore_btn"),
            t = val("fast_restore_phone");
        if (t.replace(/[^0-9]/g, "").length < 8) return notaBene("fast_restore_phone"), cancelEvent(e);
        if (val("login_fast_restore_error", ""), isVisible("login_fast_restore_code_row")) {
            if (r = val("fast_restore_code"), r.replace(/[^0-9a-z]/g, "").length < 5) return notaBene("fast_restore_code"), cancelEvent(e);
            ajax.post("/al_login.php?act=a_fast_restore_code", {
                phone: t,
                code: r,
                restore: cur.frCode
            }, {
                onFail: function(e) {
                    return Login.showFastRestoreError(e, "fast_restore_code"), !0
                },
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n)
            })
        } else {
            var s = isVisible("login_fast_restore_name_row") ? val("fast_restore_name") : "";
            if (!s && isVisible("login_fast_restore_name_row")) return void notaBene("fast_restore_name");
            ajax.post("/al_login.php?act=a_fast_restore", {
                phone: t,
                hash: o,
                name: s
            }, {
                onDone: function(e, o, r, n) {
                    return e ? 1 == e ? (show("login_fast_restore_name_row"), void setTimeout(elfocus("fast_restore_name"), 0)) : 2 == e ? void Login.showFastRestoreError(n, !1, "error") : (val("login_fast_restore_btn", getLang("login_fast_restore_access")), cur.frCode = o, cur.frSentPhone = t, show("login_fast_restore_code_row", "login_fast_restore_resend"), setTimeout(elfocus("fast_restore_code"), 0), cur.frResendDelay = r, cur.frResendInt = setInterval(Login.fastRestoreResendUpdate.pbind(4 == e), 1e3), 4 == e && Login.fastRestoreResendUpdate(!0), void(n && Login.showFastRestoreError(n, !1, "info_msg"))) : void setTimeout(Login.fastRestore.pbind(!1), 1e3)
                },
                onFail: function(e) {
                    return Login.showFastRestoreError(e, "fast_restore_phone"), !0
                },
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n)
            })
        }
        return cancelEvent(e)
    },
    showFastRestoreError: function(e, o, r) {
        showMsg("login_fast_restore_error", e, r ? r : "error", !0), o = ge(o), o && (notaBene(o), o.tt && o.tt.hide && o.tt.hide())
    },
    changeMail: function(e, o, r) {
        var n = trim(val("login_new_mail")),
            t = 1;
        return n ? (e && (r = cur.changeMailHash), /^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(n) ? (e && (t = 0), void ajax.post("/login?act=a_change_mail", {
            newmail: n,
            hash: r,
            from_page: t
        }, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: function(o) {
                var r = "login_change_mail_form";
                e && (r = "login_change_mail_box", curBox().removeButtons(), curBox().addButton(getLang("global_cancel"), null, "no")), val(r, o)
            },
            onFail: function(e) {
                return showMsg("login_change_mail_error", e, "error"), !0
            }
        })) : showMsg("login_change_mail_error", getLang("reg0_error_bad_email"), "error")) : notaBene("login_new_mail")
    },
    initChangeMailBox: function() {
        curBox().removeButtons(), curBox().addButton(getLang("global_cancel"), null, "no"), curBox().addButton(getLang("reg0_change_mail"), Login.changeMail.pbind(1)), elfocus("change_mail_new")
    }
};
try {
    stManager.done("login.js")
} catch (e) {}