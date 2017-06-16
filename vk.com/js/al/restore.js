var Restore = {
    maxPhotosWithType: 1,
    maxPhotos: 2,
    requestTypeFull: 0,
    requestTypeSimple: 4,
    showMsgBox: function(e, o, t) {
        setTimeout(showFastBox({
            title: o,
            width: 440,
            onHide: function() {
                t && ge(t).focus()
            }
        }, e).hide, 8e3)
    },
    closeRequest: function(e) {
        lockButton(e);
        var o = {
            act: "a_cancel_request_by_author",
            hash: cur.options.cancel_hash,
            rhash: cur.options.hash,
            rid: cur.options.request_id
        };
        ajax.post("al_restore.php", o, {
            onDone: function(o) {
                unlockButton(e), curBox().hide()
            }
        })
    },
    closeRequestBox: function() {
        showFastBox(getLang("global_box_confirm_title"), getLang("restore_you_sure_want_cancel_request"), getLang("box_no"), !1, getLang("box_yes"), Restore.closeRequest)
    },
    showResult: function(e, o, t, r) {
        cur.wasShown && cur.wasShown != e && hide(cur.wasShown), ajax.post("al_index.php", {
            act: "restore_log",
            id: e,
            text: o,
            value: t ? t.value : "none"
        }), cur.wasShown = e;
        var n = ge(e);
        return val(n, o), isVisible(n) || show(n), setTimeout(function() {
            r ? scrollToY(getXY(t)[1] - 100, 200) : scrollToY(getXY(n)[1] - 20, 200), setTimeout(elfocus.pbind(t), 201)
        }, 1), !1
    },
    checkPhoneOnBlur: function(e) {
        var o = e;
        if (phone = ge(o).value.replace(/[^0-9]/g, ""), !isVisible(o) || /^[1-9][0-9]{6,14}$/.test(phone)) {
            var t = function(e, o) {
                var t = "request_phone_check_res";
                2 === e ? (cur.wasShown && cur.wasShown != t && hide(cur.wasShown), cur.wasShown = t, val(t, o), cur.checkedPhones[phone] = [e, o], isVisible(t) || setTimeout(function() {
                    slideDown(t, 150)
                }, 50), cur.checkedPhones[phone] = [e, o]) : isVisible(t) && slideUp(t, 200)
            };
            cur.checkedPhones = cur.checkedPhones || {}, phone in cur.checkedPhones ? t(cur.checkedPhones[phone][0], cur.checkedPhones[phone][1]) : ajax.post("al_restore.php", {
                act: "a_check_phone",
                hash: cur.options.fhash,
                phone: phone
            }, {
                onDone: t
            })
        }
    },
    getUploadedPhotosIds: function(e) {
        var o = [];
        return each(cur.images, function(t, r) {
            (e || !r.deleted) && o.push(r.id)
        }), o
    },
    submitDocPhoto: function() {
        return Restore.screenshootCheck(0)
    },
    submitPersonalPhoto: function() {
        return Restore.screenshootCheck(1)
    },
    screenshootCheck: function(e, o) {
        if (!o) {
            if (1 == e) var t = val("photo_input");
            else var t = val("doc_input");
            try {
                var r = new RegExp(cur.screenshot_regex, "gi");
                if (r.test(t)) {
                    var n = new MessageBox({
                        title: getLang("global_action_confirmation")
                    }).addButton(getLang("restore_no_other_photo"));
                    return void n.addButton(getLang("box_yes"), function() {
                        Restore.screenshootCheck(e, !0), n.hide()
                    }, "gray").content(getLang("restore_screenshoot_confirm_box_text")).show()
                }
            } catch (s) {}
        }
        if (1 == e) var i = ge("photo_file_button");
        else var i = ge("doc_file_button");
        lockButton(i), setTimeout(function() {
            i.innerHTML = i.innerHTML
        }, 0);
        var a = 1 == e ? "photo_upload_ids" : "doc_upload_ids";
        val(a, Restore.getUploadedPhotosIds(!0).join(",")), 1 == e ? document.photo_upload.submit() : document.doc_upload.submit()
    },
    uploadError: function(e, o) {
        var t = "",
            r = 4e3;
        e ? 1 == e || 4 == e ? t = getLang("restore_not_uploaded") : 2 == e ? t = getLang("restore_bad_format") : 5 == e ? t = getLang("restore_bad_size") : 7 == e ? (t = getLang("restore_too_small_image"), r = 8e3) : 8 == e ? (t = getLang("restore_photo_already_attached"), r = 8e3) : 9 == e && (t = getLang("restore_photo_incorrect"), r = 8e3) : t = getLang("global_unknown_error"), setTimeout(showFastBox({
            title: getLang("global_error"),
            width: 470
        }, t).hide, r);
        var n = o ? "photo_" : "doc_",
            s = ge(n + "file_button");
        unlockButton(s)
    },
    uploadComplete: function(e, o, t, r, n, s) {
        var i = r ? "photo" : "doc",
            a = i + "_",
            _ = ge(a + "file_button");
        unlockButton(_);
        var l = cur.images.length,
            u = !0;
        each(cur.images, function(e, o) {
            return o.type == r && o.deleted ? (l = e, u = !1, !1) : void 0
        }), cur.images[l] = {
            id: o,
            hash: t,
            type: r
        }, ++cur.images_count[r];
        var c = 2 == s ? Restore.maxPhotosWithType : Restore.maxPhotos;
        ge(a + "input").disabled = cur.images_count[r] >= c, ge(a + "input").disabled && hide(a + "upload"), show(a + "photos"), n = n.split("%index%").join(l).split("%type%").join(r);
        var h = se(n);
        u ? ge(a + "photos").appendChild(h) : domReplaceEl(ge("photo" + l), h), show("restore_roll_button_" + i)
    },
    deleteImage: function(e, o, t) {
        var r = e ? "photo" : "doc",
            n = r + "_";
        if (cur.images[o].deleted) {
            if (cur.images_count[e] >= 2) return;
            cur.images[o].deleted = !1, removeClass("photo_img" + o, "restore_uploaded_image__img_removed");
            var s = 2 == t ? Restore.maxPhotosWithType : Restore.maxPhotos;
            ++cur.images_count[e] >= s && (ge(n + "input").disabled = !0, hide(n + "upload")), ge("del_link" + o).innerHTML = getLang("global_delete"), show("restore_roll_button_" + r)
        } else cur.images[o].deleted = !0, addClass("photo_img" + o, "restore_uploaded_image__img_removed"), --cur.images_count[e], ge(n + "input").disabled = !1, show(n + "upload"), ge("del_link" + o).innerHTML = getLang("global_dont_delete"), cur.images_count[e] || hide("restore_roll_button_" + r)
    },
    submitPageLink: function() {
        var e = ge("submitBtn"),
            o = val("link");
        return o ? (hide("error"), void ajax.post("al_restore.php", {
            act: "a_profile_link",
            link: o
        }, {
            onDone: function(e) {
                val("error", e), show("error")
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })) : void elfocus("link")
    },
    usePhoneAsLogin: function() {
        var e = ge("usePhoneBtn");
        lockButton(e);
        var o = {
            act: "a_new_email",
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: -1
        };
        ajax.post("al_restore.php", o, {
            onDone: function(o) {
                o ? (unlockButton(e), Restore.showMsgBox(o, getLang("global_error"))) : nav.reload()
            },
            onFail: function() {
                unlockButton(e)
            }
        })
    },
    useAnotherEmail: function() {
        var e = ge("anotherEmailBtn"),
            o = ge("login").value;
        if (!/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(o)) return void Restore.showMsgBox(getLang("restore_error_email"), getLang("global_error"), "login");
        lockButton(e);
        var t = {
            act: "a_new_email",
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: o
        };
        ajax.post("al_restore.php", t, {
            onDone: function(o) {
                unlockButton(e), Restore.showMsgBox(o, getLang("global_error"))
            },
            onFail: function() {
                unlockButton(e)
            }
        })
    },
    extendRequest: function(e, o) {
        var t = {
            act: "a_extend",
            rid: cur.options.request_id,
            hash: cur.options.phash,
            comment: val("comment"),
            images: []
        };
        o === !0 && (t.force = 1);
        for (var r = 0; r < cur.images.length; ++r) cur.images[r].deleted || t.images.push(cur.images[r].hash);
        if (!trim(t.comment).length && !t.images.length) return void elfocus("comment");
        if (!t.images.length && cur.restorePhotosRequested && !o) {
            var n = {
                title: getLang("global_warning"),
                width: 620
            };
            return void(cur.restoreConfirmNoPhotos = showFastBox(n, getLang("restore_extend_no_photos_are_you_sure"), getLang("restore_extend"), null, getLang("restore_dont_extend_with_photos"), function() {
                cur.restoreConfirmNoPhotos.hide(), Restore.extendRequest(e, !0)
            }))
        }
        ajax.post("al_restore.php", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, o) {
                e ? (val("request_result_msg", o), hide("request_result_wrap"), show("request_result_msg")) : Restore.showMsgBox(o, getLang("global_error"))
            }
        })
    },
    tryToSubmitRequest: function() {
        Restore.independency_checked && Restore.submitRequest(), cur.options && cur.options.can_restore_independently || Restore.submitRequest(), Restore.independency_checked = !0;
        var e = val("login"),
            o = ge("tryToSubmitBtn");
        lockButton(o), ajax.post("/restore", {
            act: "check_independent_restore_allowed",
            login: e,
            hash: cur.options.fhash
        }, {
            onDone: function(e, t) {
                if (e) show("restore_roll_back_link"), hide("try_to_submit_wrapper");
                else {
                    if (t) return unlockButton(o), Restore.showResult("request_phone_res", t, "login");
                    Restore.fixClassicSubmitForm()
                }
            },
            onFail: function() {
                Restore.fixClassicSubmitForm()
            }
        })
    },
    fixClassicSubmitForm: function() {
        hide("try_to_submit_wrapper"), hide("restore_roll_back_link"), show("about_old_password_wrapper"), show("submit_wrapper")
    },
    submitRequest: function() {
        var e, o, t, r, n, s = ge("submitBtn"),
            i = cur.options.request_type;
        if (i == Restore.requestTypeSimple) {
            if (e = val("login"), isVisible("email_wrap") && !/^\s*$/.test(e) && !/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(e) && !/^\s*[a-zA-Z0-9_]{6,32}\s*$/.test(e)) return Restore.showResult("request_email_res", getLang("restore_login_error"), "login");
            if (o = val("email"), t = val("old_phone").replace(/[^0-9]/g, ""), !/^\s*$/.test(t) && !/^[1-9][0-9]{6,14}$/.test(t)) return Restore.showResult("request_phone_res", getLang("restore_old_phone_error"), "old_phone")
        }
        var a = isVisible("new_phone_wrap") ? "new_phone" : "phone";
        if (r = ge(a).value.replace(/[^0-9]/g, ""), isVisible(a) && !/^[1-9][0-9]{6,14}$/.test(r)) return Restore.showResult("request_phone_res", getLang("restore_phone_error"), a);
        if (cur.checkedPhones && cur.checkedPhones[r] && 2 == cur.checkedPhones[r][0]) return Restore.showResult("request_email_res", cur.checkedPhones[r][1], a, !0);
        if (i == Restore.requestTypeSimple) {
            if (!isVisible("new_phone_wrap") && !e && !t) {
                var _ = getLang("restore_need_email_or_phone");
                return _ += "<br>" + val("request_email_or_phone_need"), Restore.showResult("request_phone_res", _, "old_phone")
            }
            if (n = val("old_password"), !n) return Restore.showResult("request_old_password_res", getLang("restore_need_old_password") + "<br>" + val("request_old_password_need"), "old_password")
        } else {
            if (cur.images_count[0] < 1) return Restore.showResult("request_doc_res", getLang("restore_doc_error") + "<br>" + getLang("restore_attention"));
            if (cur.images_count[1] < 1) return Restore.showResult("request_photo_res", getLang("restore_photo_error") + "<br>" + getLang("restore_attention"))
        }
        var l = {
            act: "a_request",
            bad_phone: cur.wrongPhone ? 1 : 0
        };
        i == Restore.requestTypeSimple ? extend(l, {
            hash: cur.options.fhash,
            login: e,
            email: o,
            phone: r,
            old_phone: t,
            password: n
        }) : (extend(l, {
            comment: val("comment"),
            images: [],
            hash: cur.options.fhash,
            login: e,
            email: o,
            phone: r,
            old_phone: r
        }), each(cur.images, function(e, o) {
            o.deleted || l.images.push(o.hash)
        })), cur.validationLastCallback = function(e) {
            hide("request_phone_res"), e ? Restore.submitRequest() : elfocus("phone")
        }, ajax.post("/al_restore.php", l, {
            onDone: function(e, o, t, r, n) {
                var i = intval(e);
                if (i > 0) cur.request_id = i, cur.request_hash = o, Restore.phone_confirm_box = showFastBox(getLang("restore_confirmation"), '<div id="phone_confirm_box">' + ge("phone_confirm").innerHTML + "</div>", getLang("box_send"), function() {
                    Restore.confirmPhoneSend()
                }, getLang("global_cancel")), elfocus("phone_confirm_code");
                else {
                    if (-2 == i) return lockButton(s), setTimeout(Restore.submitRequest, 1e3); - 3 == i ? ("login" == n ? o += "<br>" + val("request_email_or_phone_need") : "phonenum" == n && (cur.wrongPhone = !0), Restore.showResult(t, o, r)) : Restore.showResult("request_phone_res", o, r)
                }
            },
            showProgress: lockButton.pbind(s),
            hideProgress: unlockButton.pbind(s)
        })
    },
    confirmCodeResend: function() {
        return hide("phone_confirm_error"), ajax.post("/al_restore.php", {
            act: "a_confirm",
            request_id: cur.request_id,
            resend: 1,
            hash: cur.request_hash
        }, {
            onDone: function(e, o) {
                Restore.confirmPhoneError(o)
            }
        }), !1
    },
    confirmPhoneSend: function() {
        var e = trim(val("phone_confirm_code"));
        return /^[0-9a-zA-Z]{6}$/i.test(e) ? void ajax.post("/al_restore.php", {
            act: "a_confirm",
            request_id: cur.request_id,
            code: e,
            hash: cur.request_hash
        }, {
            onDone: function(e, o) {
                e ? (val("request_result", o), show("request_result"), hide("request_form"), scrollToTop(), Restore.phone_confirm_box.hide()) : Restore.confirmPhoneError(o)
            }
        }) : void Restore.confirmPhoneError(getLang("restore_code_error_6chars"))
    },
    confirmPhoneError: function(e) {
        var o = ge("phone_confirm_error");
        val(o, e), show(o), elfocus("phone_confirm_code")
    },
    toFullRequest: function(e) {
        if (isVisible("new_phone_wrap")) var o = val("new_phone").replace(/[^0-9]/g, "");
        else var o = val("phone").replace(/[^0-9]/g, "");
        nav.go("/restore?act=return_page&full=1&mid=" + e + (o ? "&phone=" + o : ""))
    },
    infoCheckSubmit: function(e) {
        var o = trim(val("page_link")),
            t = val("phone").replace(/[^0-9]/g, ""),
            r = ge("restore_info_error");
        return o.length ? t.length ? (hide(r), removeClass(r, "restore_info_error_big_text"), void ajax.post("/restore", {
            act: "a_check_info",
            link: o,
            phone: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, o, t) {
                1 != e && (val(r, o), -1 == e && addClass(r, "restore_info_error_big_text"), show(r), t && notaBene(t))
            }
        })) : notaBene("phone") : notaBene("page_link")
    },
    initCheckInfo: function() {
        Restore.initFormTT(ge("page_link"), "restore_info_page_link_tooltip")
    },
    initResendCounter: function(e) {
        var o = ge("resend_sms_button");
        if (e > 0) {
            addClass(o, "button_disabled"), o.time = e;
            var t = function() {
                if (o.time <= 1) return removeClass(o, "button_disabled"), val(o, getLang("restore_resend_sms_data")), void clearInterval(o.timeInterval);
                o.time -= 1;
                var e = formatTime(o.time);
                val(o, getLang("restore_can_resend_sms_after").replace("{time}", e))
            };
            t(), o.timeInterval = setInterval(t, 1e3)
        }
    },
    resendSMS: function(e) {
        hasClass(e, "button_disabled") || (lockButton(e), ajax.post("al_restore.php", {
            act: "a_resend_sms",
            hash: cur.resend_hash,
            id: cur.rid
        }, {
            onDone: function(o, t, r, n) {
                unlockButton(e), 1 == o ? (r && Restore.initResendCounter(r), 0 == t && hide(e), n && (addClass("resend_success", "active"), setTimeout(removeClass.pbind("resend_success", "active"), 1e4))) : hide(e)
            }
        }))
    },
    initTimeButton: function() {
        cur.resend_counter > 0 && Restore.initResendCounter(cur.resend_counter)
    },
    initRequest: function() {
        extend(cur, {
            images: [],
            images_count: [0, 0],
            request_id: !1,
            request_hash: !1,
            wrongPhone: !1
        });
        var e = cur.options.request_type,
            o = e == Restore.requestTypeFull ? "new_phone" : "phone",
            t = ge("comment"),
            r = ge(o),
            n = ge("old_phone"),
            s = ge("login"),
            i = ge("old_password");
        placeholderSetup(t, {
            back: !0
        }), Restore.initFormTT(t, "restore_lost_phone_your_comment_short"), isVisible(r) && Restore.initFormTT(r, "restore_form_available_phone_tooltip"), isVisible(n) && Restore.initFormTT(n, "restore_form_old_phone_tooltip"), isVisible(s) && Restore.initFormTT(s, "restore_form_old_email_tooltip"), isVisible(i) && Restore.initFormTT(i, "restore_about_old_password")
    },
    initFormTT: function(e, o) {
        addEvent(e, "focus", showTooltip.pbind(e, {
            dir: "right",
            text: getLang(o),
            shift: function() {
                var o = Math.round((getSize(e.tt.container)[1] + getSize(e)[1]) / 2);
                return [225, -o, 0]
            },
            width: 215,
            slideX: -15,
            hasover: 1,
            forcetoup: !0,
            nohide: !0
        })), addEvent(e, "blur", function() {
            e.tthide && e.tthide()
        })
    },
    returnToFormStep: function(e) {
        var o = geByClass1("_restore_roll_active", "restore");
        removeClass(o, "_restore_roll_active"), Restore.fillRollShort(o.id.replace("restore_roll_", ""));
        var t = ge("restore_roll_" + e);
        removeClass(t, "restore_roll_hidden"), addClass(t, "_restore_roll_active")
    },
    checkIndependentRestore: function(e, o) {
        var t, r = geByClass1("flat_button", ge("restore_roll_button_phones"));
        return t = cur.options.request_type ? val("phone").replace(/[^0-9]/g, "") : val("new_phone").replace(/[^0-9]/g, ""), cur.options && cur.options.can_restore_independently ? (cur.options.request_type && (t || Restore.changeFormStep("phones", "photo")), lockButton(r), void ajax.post("restore", {
            act: "check_independent_restore_allowed",
            phone: t,
            hash: cur.options.fhash
        }, {
            onDone: function(t, n) {
                if (t) e();
                else {
                    if (n) return unlockButton(r), Restore.showResult("request_phone_res", n, cur.options.request_type ? "phone" : "new_phone");
                    o()
                }
            },
            onFail: function() {
                o()
            }
        })) : cur.options.need_check ? (lockButton(r), void ajax.post("al_restore.php", {
            act: "a_check_phone",
            hash: cur.options.fhash,
            phone: t,
            from_independent: 1
        }, {
            onDone: function(e, t) {
                var n = "request_phone_check_res";
                unlockButton(r), 2 == e ? (val(n, t), isVisible(n) || slideDown(n, 200)) : (slideUp(n), o())
            }
        })) : void o()
    },
    _phoneIndependentRestoreSuccess: function() {
        Restore.changeFormStep("phones", "back_link")
    },
    _phoneIndependentRestoreFail: function() {
        Restore.changeFormStep("phones", "photo")
    },
    changeFormStep: function(e, o) {
        if (Restore.checkRoll(e)) {
            if (Restore.fillRollShort(e), "phones" == e && "independency_check" == o) return Restore.checkIndependentRestore(Restore._phoneIndependentRestoreSuccess, Restore._phoneIndependentRestoreFail), !1;
            var t = ge("restore_roll_" + e);
            removeClass(t, "_restore_roll_active"), re("restore_roll_button_" + e);
            var r = ge("restore_roll_" + o);
            if (show(r), removeClass(r, "restore_roll_colored"), scrollToY(getXY(r)[1], 400), removeClass("restore_roll_" + o, "restore_roll_hidden"), addClass(r, "_restore_roll_active"), "comment" == o) {
                var n = ge("comment");
                autosizeSetup(n, {
                    minHeight: 55,
                    maxHeight: 300
                }), addEvent(n, "focus keyup", function(e) {
                    n.timeout && clearTimeout(n.timeout), n.timeout = setTimeout(function() {
                        try {
                            var e = val(n),
                                o = new RegExp(cur.delete_regex, "gi");
                            if (o.test(e)) var t = cur.goto_support;
                            else var t = getLang("restore_lost_phone_your_comment_short");
                            val(n.tt.container, '<div class="wrapped"><div class="tt_text">' + t + "</div></div>")
                        } catch (r) {}
                    }, 300)
                })
            }
        }
    },
    checkRoll: function(e) {
        if ("phones" == e) {
            var o = (val("old_phone"), val("phone"), cur.options.request_type);
            if (o == Restore.requestTypeSimple) {
                var t = ge("old_phone").value.replace(/[^0-9]/g, "");
                if (!/^\s*$/.test(t) && !/^[1-9][0-9]{6,14}$/.test(t)) return Restore.showResult("request_phone_res", getLang("restore_old_phone_error"), "old_phone")
            }
            var r = isVisible("new_phone_wrap") ? "new_phone" : "phone",
                n = ge(r).value.replace(/[^0-9]/g, "");
            if (isVisible(r) && !n) return notaBene(r), !1;
            if (isVisible(r) && !/^[1-9][0-9]{6,14}$/.test(n)) return Restore.showResult("request_phone_res", getLang("restore_phone_error"), r);
            if (cur.checkedPhones && cur.checkedPhones[n] && 2 == cur.checkedPhones[n][0]) return Restore.showResult("request_email_res", cur.checkedPhones[n][1], r, !0)
        } else if ("doc" == e) {
            if (cur.images_count[0] < 1) return Restore.showResult("request_doc_res", getLang("restore_doc_error") + "<br>" + getLang("restore_attention"))
        } else if ("photo" == e && cur.images_count[1] < 1) return Restore.showResult("request_photo_res", getLang("restore_photo_error") + "<br>" + getLang("restore_attention"));
        return !0
    },
    fillRollShort: function(e) {
        var o = ge("restore_roll_" + e),
            t = geByClass1("_restore_roll_short", o);
        if ("phones" == e) {
            var r = val("old_phone"),
                n = val("phone"),
                s = geByClass1("_restore_roll_short_old_phone", t),
                i = geByClass1("_restore_roll_short_new_phone", t);
            s.innerHTML = r ? r : getLang("restore_phone_not_set"), i.innerHTML = n ? n : getLang("restore_phone_not_set")
        } else if ("doc" == e || "photo" == e) {
            var a = geByClass1("_restore_roll_short_images", t),
                _ = geByClass1("_restore_roll_short_message", t);
            a.innerHTML = "", hide(_), each(geByClass("restore_uploaded_image__img", e + "_photos"), function(e, o) {
                if (!hasClass(o, "restore_uploaded_image__img_removed")) {
                    var t = o.cloneNode(!0);
                    t.id = "", a.appendChild(t)
                }
            }), a.innerHTML || show(_)
        } else "back_link" == e && hide("restore_roll_back_link");
        return !0
    },
    activate: function(e, o, t) {
        isButtonLocked(e) || ajax.post("restore", {
            act: "a_activate",
            id: o,
            hash: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    }
};
try {
    stManager.done("restore.js")
} catch (e) {}