var Login = {
    init: function() {
        each(geByClass("big_text", "login_form_wrap"), function(e, r) {
            placeholderInit(r)
        }), setTimeout(elfocus.pbind(val("email") ? "pass" : "email"), 0);
        var e = ge("login_form"),
            r = ge("email"),
            o = ge("pass");
        return e.onsubmit = function() {
            return window.submitQuickLoginForm ? trim(r.value) ? trim(o.value) ? (submitQuickLoginForm(r.value, o.value, {
                prg: "login_button",
                params: {
                    expire_input: val("expire_input")
                }
            }), !1) : (notaBene(o), !1) : (notaBene(r), !1) : !0
        }, window.loginByCredential && (r.onclick = loginByCredential, o.onclick = loginByCredential), !0
    },
    showFastRestore: function(e) {
        var r = gpeByClass("_retore_wrap", e);
        return each(geByClass("big_text", r), function(e, r) {
            placeholderInit(r)
        }), addClass(r, "shown"), elfocus("fast_restore_phone"), !1
    },
    showInputTooltip: function(e, r) {
        var o = getSize(e);
        showTooltip(e, {
            text: r,
            dir: "left",
            slideX: 15,
            className: "login_tt",
            shift: [-o[0] - 10, -o[1] / 2],
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
        var r = val("fast_restore_phone"),
            o = ce("span", {
                className: "progress_inline"
            }),
            t = domPN(e);
        return geByClass1("error", "login_fast_restore_error") || val("login_fast_restore_error", ""), ajax.post("/al_login.php?act=a_fast_restore_resend", {
            phone: r,
            restore: cur.frCode
        }, {
            onDone: function(e) {
                t.innerHTML = e, setTimeout(elfocus("fast_restore_code"), 0)
            },
            onFail: function(e) {
                return Login.showFastRestoreError(e, "fast_restore_code"), !0
            },
            showProgress: function() {
                e.parentNode == t && t.replaceChild(o, e)
            },
            hideProgress: function() {
                o.parentNode == t && t.replaceChild(e, o)
            }
        }), !1
    },
    fastRestore: function(e, r) {
        if (e = e || window.event, e && void 0 !== e.keyCode && "click" != e.type) {
            if (e.keyCode !== KEY.ENTER) return;
            if (e.target == ge("fast_restore_phone") && isVisible("login_fast_restore_code_row")) return elfocus("fast_restore_code"), cancelEvent(e)
        }
        var o, t = ge("login_fast_restore_btn"),
            n = val("fast_restore_phone");
        if (n.replace(/[^0-9]/g, "").length < 8) return notaBene("fast_restore_phone"), cancelEvent(e);
        if (val("login_fast_restore_error", ""), isVisible("login_fast_restore_code_row")) {
            if (o = val("fast_restore_code"), o.replace(/[^0-9a-z]/g, "").length < 5) return notaBene("fast_restore_code"), cancelEvent(e);
            ajax.post("/al_login.php?act=a_fast_restore_code", {
                phone: n,
                code: o,
                restore: cur.frCode
            }, {
                onFail: function(e) {
                    return Login.showFastRestoreError(e, "fast_restore_code"), !0
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        } else {
            var s = isVisible("login_fast_restore_name_row") ? val("fast_restore_name") : "";
            if (!s && isVisible("login_fast_restore_name_row")) return void notaBene("fast_restore_name");
            ajax.post("/al_login.php?act=a_fast_restore", {
                phone: n,
                hash: r,
                name: s
            }, {
                onDone: function(e, r, o, t) {
                    return e ? 1 == e ? (show("login_fast_restore_name_row"), void setTimeout(elfocus("fast_restore_name"), 0)) : 2 == e ? void Login.showFastRestoreError(t, !1, "error") : (val("login_fast_restore_btn", getLang("login_fast_restore_access")), cur.frCode = r, cur.frSentPhone = n, show("login_fast_restore_code_row", "login_fast_restore_resend"), setTimeout(elfocus("fast_restore_code"), 0), cur.frResendDelay = o, cur.frResendInt = setInterval(Login.fastRestoreResendUpdate.pbind(4 == e), 1e3), 4 == e && Login.fastRestoreResendUpdate(!0), void(t && Login.showFastRestoreError(t, !1, "info_msg"))) : void setTimeout(Login.fastRestore.pbind(!1), 1e3)
                },
                onFail: function(e) {
                    return Login.showFastRestoreError(e, "fast_restore_phone"), !0
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }
        return cancelEvent(e)
    },
    showFastRestoreError: function(e, r, o) {
        showMsg("login_fast_restore_error", e, o ? o : "error", !0), r = ge(r), r && (notaBene(r), r.tt && r.tt.hide && r.tt.hide())
    }
};
try {
    stManager.done("login.js")
} catch (e) {}