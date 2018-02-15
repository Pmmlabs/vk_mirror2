! function(e) {
    function t(o) {
        if (r[o]) return r[o].exports;
        var a = r[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
}({
    0: function(e, t, r) {
        e.exports = r(68)
    },
    68: function(e, t, r) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = function() {
                function e(e, t) {
                    var r = [],
                        o = !0,
                        a = !1,
                        n = void 0;
                    try {
                        for (var s, i = e[Symbol.iterator](); !(o = (s = i.next()).done) && (r.push(s.value), !t || r.length !== t); o = !0);
                    } catch (l) {
                        a = !0, n = l
                    } finally {
                        try {
                            !o && i["return"] && i["return"]()
                        } finally {
                            if (a) throw n
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            n = r(134),
            s = o(n);
        window.LeadFormsApp = {
            showGeneratorBox: function(e) {
                showBox("lead_forms_app.php", {
                    act: "generate_form_box",
                    group_id: cur.leadFormGroupId,
                    form_id: e
                }, {
                    onDone: function() {
                        cur.initialFormConf = LeadFormsApp.getDomData(), cur.leadFormName = trim(val("lead_form_header_name"))
                    },
                    params: {
                        onHideAttempt: function(e) {
                            return e || JSON.stringify(LeadFormsApp.getDomData()) === JSON.stringify(cur.initialFormConf) && cur.leadFormName === trim(val("lead_form_header_name")) ? !0 : (showFastBox(getLang("global_warning"), getLang("communityApps_lead_forms_hide_generator_warning"), getLang("global_continue"), LeadFormsApp.doHideGenerator, getLang("global_cancel")), !1)
                        }
                    }
                })
            },
            doHideGenerator: function() {
                curBox().hide(), curBox().hide(!0)
            },
            initGenerator: function(e) {
                curBox().setOptions({
                    grey: !0,
                    hideButtons: !0,
                    width: 1e3
                }), cur.leadFormsData = e, cur.leadFormsTpls = e.tpl;
                var t = geByClass1("lead_forms_app_generator_sections");
                cur.leadFromGenerator = (0, s["default"])(t), cur.leadFromGenerator.renderConfData(), this.initUpload(e.upload_info), cur.leadFormsStep = cur.leadFormConf.step1.on ? 1 : 2, this.updatePreview()
            },
            welcomeScreenToggle: function(e, t) {
                cancelEvent(t), toggleClass(geByClass1("_ui_toggler", e), "on"), this.step1Changed(), removeClass("lead_forms_step_section_1", "section_error"), removeClass("lead_forms_generator_input_title", "input_error"), removeClass("lead_forms_generator_input_description", "input_error"), removeClass("lead_forms_generator_input_button", "input_error"), removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error")
            },
            checkSectionErrors: function(e) {
                var t = ge("lead_forms_step_section_" + e);
                geByClass1("input_error", t) || geByClass1("button_error", t) || removeClass(t, "section_error")
            },
            sectionHeaderClick: function(e) {
                var t = e.parentNode,
                    r = geByClass1("lead_forms_app_section_content", t);
                slideToggle(r, 200), toggleClass(t, "expanded")
            },
            inputOnKeyUp: function(e) {
                var t = e.id.replace("lead_forms_generator_input_", ""),
                    r = parseInt(attr(e, "maxlength"));
                if (cur.leadFormsStep = parseInt(attr(domCA(e, ".lead_forms_app_generator_section"), "data-step")), removeClass(e, "input_error"), this.checkSectionErrors(cur.leadFormsStep), 5 !== cur.leadFormsStep && this.updatePreview(), !isNaN(r)) {
                    var o = Math.max(0, r - val(e).length);
                    val("lead_forms_generator_input_limit_info_" + t, o)
                }
            },
            initUpload: function(e) {
                var t = this,
                    r = {
                        file_name: "photo",
                        file_size_limit: 26214400,
                        file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                        file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                        accept: "image/*",
                        lang: e.lang,
                        clear: 1,
                        noFlash: 1,
                        signed: 1,
                        type: "photo",
                        buttonClass: "secondary small",
                        max_attempts: 3,
                        server: e.server,
                        base_url: e.server_base_url,
                        static_url: e.server_static_url,
                        check_url: e.check_url
                    },
                    o = ge("lead_form_upload_wrap");
                Upload.init(o, e.upload_url, {}, extend(r, {
                    onUploadStart: function() {
                        removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"), t.checkSectionErrors(1), lockButton(geByClass1("flat_button", o))
                    },
                    onUploadComplete: function(e, r) {
                        var a = parseJSON(r) || {
                            error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                        };
                        if (a.error || !a.photos) {
                            var n = void 0;
                            return n = "ERR_UPLOAD_BAD_IMAGE_SIZE" === a.error || a.error.indexOf('result "1"') > -1 ? getLang("communityApps_lead_forms_upload_error") : a.error, showFastBox(getLang("global_error"), n), void unlockButton(geByClass1("flat_button", o))
                        }
                        t.saveUploadedCover(a, geByClass1("flat_button", o))
                    },
                    onUploadError: function() {
                        unlockButton(geByClass1("flat_button", o))
                    }
                }))
            },
            saveUploadedCover: function(e, t) {
                var r = this;
                e.photos = JSON.stringify(e.photos), ajax.post("al_photos.php", extend({
                    act: "choose_uploaded"
                }, e), {
                    onDone: function(e, t) {
                        var o = ge("lead_form_upload_wrap");
                        attr(o, "data-media", e), r.step1Changed()
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            },
            getDomData: function() {
                for (var e = ge("lead_form_upload_wrap"), t = {
                        title: trim(val("lead_forms_generator_input_title")),
                        cover: attr(e, "data-media"),
                        description: trim(val("lead_forms_generator_input_description")),
                        button: val("lead_forms_generator_input_button"),
                        on: hasClass(geByClass1("_lead_forms_welcome_screen_toggler"), "on")
                    }, r = {
                        questions: [],
                        custom_questions: cur.leadFromGenerator.getCustomQuestionsData()
                    }, o = geByClass("lead_forms_app_questions_checkboxes"), a = 0; a < o.length; a++) {
                    var n = o[a];
                    hasClass(n, "on") && r.questions.push(attr(n, "data-name"))
                }
                var s = {
                        link: trim(val("lead_forms_generator_input_policy_url"))
                    },
                    i = {
                        description: trim(val("lead_forms_generator_input_confirm_description")),
                        link: trim(val("lead_forms_generator_input_confirm_url"))
                    },
                    l = {
                        pixel: trim(val("lead_forms_generator_input_pixel_vk")),
                        no_repeat: hasClass(geByClass1("_lead_forms_checkbox_settings_no_repeat"), "on"),
                        notification: hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on"),
                        im_notify: hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                        admins: cur.leadFromGenerator.getAdmins(),
                        emails: cur.leadFromGenerator.getEmails()
                    };
                return {
                    step1: t,
                    step2: r,
                    step3: s,
                    step4: i,
                    step5: l
                }
            },
            saveForm: function(e) {
                var t = this.getDomData(),
                    r = t.step1,
                    o = t.step2,
                    a = t.step3,
                    n = t.step5,
                    s = !1;
                !r.on || r.title && r.description && r.button && r.cover ? removeClass("lead_forms_step_section_1", "section_error") : (s = !0, addClass("lead_forms_step_section_1", "section_error"), r.title || addClass("lead_forms_generator_input_title", "input_error"), r.description || addClass("lead_forms_generator_input_description", "input_error"), r.button || addClass("lead_forms_generator_input_button", "input_error"), r.cover || addClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"));
                var i = !0;
                for (var l in o.custom_questions)
                    if (o.custom_questions.label) {
                        i = !1;
                        break
                    }
                return !o.questions.length && i ? void topError(getLang("communityApps_lead_forms_no_questions_error"), {
                    dt: 3
                }) : (a.link || (s = !0, addClass("lead_forms_step_section_3", "section_error"), addClass("lead_forms_generator_input_policy_url", "input_error")), !n.notification || n.admins || n.emails || (s = !0, addClass("lead_forms_step_section_5", "section_error"), addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), addClass(cur.leadFromGenerator.getEmailsElem(), "input_error")), n.im_notify && !n.admins && (s = !0, addClass("lead_forms_step_section_5", "section_error"), addClass(cur.leadFromGenerator.getAdminsElem(), "input_error")), n.pixel && !n.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/) && (s = !0, addClass("lead_forms_step_section_5", "section_error"), addClass("lead_forms_generator_input_pixel", "input_error"), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_pixel_error"))), void(s || ajax.post("lead_forms_app.php", {
                    act: "save_form",
                    name: val("lead_form_header_name"),
                    group_id: cur.leadFormGroupId,
                    data: JSON.stringify(t),
                    hash: cur.leadFormsAppSaveHash,
                    form_id: cur.leadFormId
                }, {
                    onDone: function() {
                        curBox().hide(!0), nav.reload()
                    },
                    onFail: function(e) {
                        return "bad_policy_link" === e ? (addClass("lead_forms_step_section_3", "section_error"), addClass("lead_forms_generator_input_policy_url", "input_error"), !0) : "bad_site_link" === e ? (addClass("lead_forms_step_section_4", "section_error"), addClass("lead_forms_generator_input_confirm_url", "input_error"), !0) : void 0
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })))
            },
            updatePreview: function() {
                var e = this;
                clearTimeout(cur.leadFormsUpdatePreviewTimer), cur.leadFormsUpdatePreviewTimer = setTimeout(function() {
                    ajax.post("lead_forms_app.php", {
                        act: "save_preview",
                        group_id: cur.leadFormGroupId,
                        preview_id: cur.leadFormsPreviewId,
                        hash: cur.leadFormsPreviewHash,
                        data: JSON.stringify(e.getDomData())
                    }, {
                        onDone: function() {
                            var e = ce("iframe", {
                                    frameBorder: 0,
                                    className: "lead_forms_preview_frame",
                                    src: vk.loginscheme + "://" + vk.host + "/lead_forms_app.php?act=view_form&group_id=" + cur.leadFormGroupId + "&step=" + cur.leadFormsStep + "&preview=" + cur.leadFormsPreviewId
                                }),
                                t = ge("lead_forms_preview_wrap");
                            val(t, ""), ge(t).appendChild(e)
                        }
                    })
                }, 400)
            },
            initForm: function() {
                if (cur.leadFormsPixel) {
                    var e = vkImage();
                    e.src = "https://vk.com/rtrg?p=" + cur.leadFormsPixel, utilsNode.appendChild(e)
                }
                this.initSensitiveInputs()
            },
            initSensitiveInputs: function() {
                for (var e = geByClass("lead_form_view_sensitive_input_wrapper"), t = function(t) {
                        for (var r = e[t], o = domQuery1('.lead_form_view_sensitive_input[data-id="read"]', r), a = domQuery1('.lead_form_view_sensitive_input[data-id="edit"]', r), n = domQuery(".lead_form_view_sensitive_input_action", r), s = 0; s < n.length; s++) {
                            var i = domData(n[s], "action");
                            if ("edit" === i) addEvent(n[s], "click", function(e) {
                                e.preventDefault(), domData(r, "state", "edit"), addClass(o, "hidden"), removeClass(a, "hidden")
                            });
                            else {
                                if ("cancel" !== i) throw new Error("Unknown action " + i);
                                addEvent(n[s], "click", function(e) {
                                    e.preventDefault(), domData(r, "state", "read"), addClass(a, "hidden"), removeClass(o, "hidden"), val(geByTag1("input", a), "")
                                })
                            }
                        }
                    }, r = 0; r < e.length; r++) t(r)
            },
            step1Changed: function() {
                cur.leadFormsStep = 1, this.updatePreview()
            },
            step2Changed: function() {
                cur.leadFormsStep = 2, this.updatePreview()
            },
            switchStep: function(e) {
                var t = ge("lead_forms_view_wrap");
                removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), addClass("step" + e, "lead_forms_step_active"), addClass("step" + e + "_buttons", "lead_forms_step_active");
                var r = e;
                2 == cur.leadFormSteps && r--, val("lead_forms_step_info", cur.lang.communityApps_lead_forms_step_info.replace("{step}", r).replace("{total_steps}", cur.leadFormSteps))
            },
            sendForm: function(e) {
                for (var t = cur.leadFormConfig, r = [], o = !1, a = 0; a < t.step2.questions.length; a++) {
                    var n = t.step2.questions[a],
                        s = "lead_forms_view_input_" + n,
                        i = "lead_form_view_sensitive_input_wrapper_" + n,
                        l = trim(val(s)),
                        _ = "edit",
                        d = ge(i);
                    d && (_ = domData(d, "state")), (l || "edit" !== _) && ("email" !== n || "edit" !== _ || this.validateEmail(l)) && ("phone_number" !== n || "edit" !== _ || this.validatePhone(l)) && ("birthday" !== n || this.validateBirthday(l)) ? r.push({
                        question: n,
                        value: l
                    }) : (notaBene(s, !1, o), o = !0)
                }
                for (var u = 0; u < t.step2.custom_questions.length; u++) {
                    var p = t.step2.custom_questions[u],
                        c = void 0,
                        m = void 0,
                        f = geByClass1("_custom_question_" + u);
                    switch (p.type) {
                        case "input":
                        case "textarea":
                            m = ge("lead_forms_view_input_custom_question_" + u), c = trim(val(m));
                            break;
                        case "radio":
                            c = window.radioBtns["custom_question_" + u].val, c > 0 && (c = p.options[c - 1]);
                            break;
                        case "checkbox":
                            c = [];
                            for (var g = geByClass("checkbox", f), v = 0; v < g.length; v++) hasClass(g[v], "on") && c.push(p.options[v]);
                            break;
                        case "select":
                            c = p.options[parseInt(ge("lead_forms_custom_question_select_" + u).value)]
                    }
                    c.length ? r.push({
                        question: "custom_" + u,
                        value: c
                    }) : (inArray(p.type, ["input", "textarea"]) ? (notaBene(m, !1, o), o || LeadFormsApp.scrollToEl(m)) : LeadFormsApp.titleError(geByClass1("lead_form_view_labeled_row_label", f), o), o = !0)
                }
                var h = geByClass1("lead_form_view_policy");
                return hasClass(h, "on") ? void(o || ajax.post("lead_forms_app.php", {
                    act: "send_form",
                    hash: cur.leadFormSendHash,
                    questions: JSON.stringify(r),
                    group_id: cur.leadFormGroupId,
                    form_id: cur.leadFormId,
                    access_token: cur.leadFormsAccessToken
                }, {
                    onDone: function() {
                        LeadFormsApp.switchStep(3), cur.leadFormSiteLink || hide(geByClass1("lead_forms_buttons_wrap"))
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })) : LeadFormsApp.titleError(h, o)
            },
            titleError: function(e, t) {
                addClass(e, "mark_as_error"), setTimeout(function() {
                    removeClass(e, "mark_as_error")
                }, 800), t || LeadFormsApp.scrollToEl(e)
            },
            scrollToEl: function(e) {
                var t = geByClass1("lead_forms_view_cont_wrap"),
                    r = t.scrollTop,
                    o = getXY(e)[1] - (window.innerHeight - 180);
                t.scrollTop = r + o
            },
            formNameDown: function(e) {
                if (!geByTag1("input", e)) {
                    var t = e.offsetWidth - 30,
                        r = clean(val(e));
                    val(e, '<input type="text" class="dark" value="' + r + '" id="lead_form_name" style="width: ' + t + 'px;" onblur="LeadFormsApp.fromNameBlur(this, event)" onkeypress="if (event.keyCode == KEY.ENTER) this.blur()" />'), setStyle(e, "margin-left", "-6px"), setTimeout(function() {
                        setStyle("lead_form_name", "width", 270);
                        var e = geByTag1("input", "lead_form_header_name");
                        document.activeElement !== e && (e.focus(), e.selectionStart = String(val(e)).length)
                    })
                }
            },
            fromNameBlur: function(e, t) {
                cancelEvent(t);
                var r = clean(val(e)),
                    o = ge("lead_form_header_name");
                setStyle(o, "margin-left", 0), val(o, trim(r) || cur.leadFormDefName)
            },
            setFormStatus: function(e, t, r) {
                var o = 1;
                hasClass(e, "lead_forms_app_form_active") && (o = 0), toggleClass(e, "lead_forms_app_form_active"), val(e, o ? cur.lang.communityApps_lead_form_status_on : cur.lang.communityApps_lead_form_status_off), ajax.post("lead_forms_app.php", {
                    act: "set_form_status",
                    status: o,
                    group_id: cur.leadFormGroupId,
                    form_id: t,
                    hash: r
                }, {
                    showProgress: lockLink.pbind(e),
                    hideProgress: unlockLink.pbind(e)
                })
            },
            deleteForm: function(e, t, r) {
                addClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted");
                var o = ge("lead_form_actions" + t),
                    a = o.offsetWidth - 20;
                addClass(o, "lead_forms_app_no_display");
                var n = ge("lead_form_restore" + t);
                removeClass(n, "lead_forms_app_no_display"), setStyle(n, "width", a + "px"), this.deleteFormSend(r, t)
            },
            restoreForm: function(e, t, r) {
                removeClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted"), removeClass("lead_form_actions" + t, "lead_forms_app_no_display"), addClass("lead_form_restore" + t, "lead_forms_app_no_display"), this.deleteFormSend(r, t, !0)
            },
            deleteFormSend: function(e, t, r) {
                ajax.post("lead_forms_app.php", {
                    act: "form_delete",
                    hash: e,
                    form_id: t,
                    group_id: cur.leadFormGroupId,
                    restore: r ? 1 : 0
                })
            },
            validateEmail: function(e) {
                var t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            },
            validatePhone: function(e) {
                var t = String(e).replace(/[^0-9]/g, "").length;
                return t >= 10 && 12 >= t
            },
            validateBirthday: function(e) {
                var t = String(e).match(/^\d{1,2}([./-])\d{1,2}\1\d{4}$/);
                if (!t) return !1;
                var r = t[0].split(t[1]),
                    o = a(r, 3),
                    n = o[0],
                    s = o[1],
                    i = o[2];
                return n = parseInt(trim(n)), n > 31 || 1 > n ? !1 : (s = parseInt(trim(s)), s > 12 || 1 > s ? !1 : (i = parseInt(trim(i)), i > 1927))
            },
            policyCheckBoxClick: function(e, t) {
                e && "A" === e.target.tagName || checkbox(t)
            },
            formLinkClick: function(e, t) {
                cancelEvent(t);
                var r = document.createRange();
                r.selectNodeContents(e);
                var o = getSelection();
                o.removeAllRanges(), o.addRange(r), document.execCommand("copy")
            },
            checkboxNotificationsChanged: function() {
                removeClass("lead_forms_step_section_5", "section_error"), removeClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), removeClass(cur.leadFromGenerator.getEmailsElem(), "input_error")
            },
            copyLink: function(e, t) {
                cancelEvent(t);
                var r = bodyNode.appendChild(ce("input", {
                    value: e
                }, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    opacity: 0
                }));
                r.select(), document.execCommand("copy"), re(r), showDoneBox(getLang("communityApps_lead_forms_link_copied"))
            }
        };
        try {
            stManager.done("lead_forms_app.js")
        } catch (i) {}
    },
    121: function(e, t, r) {
        "use strict";

        function o(e) {
            return {
                callMutations: function() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations: function() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e.apply(void 0, arguments)
                }
            }
        }

        function a(e, t, r, o) {
            d(t, r, o), e._registeredHandlers.push(["bind", t, r, o])
        }

        function n(e, t, r, o, a) {
            (0, l.addDelegateEvent)(t, r, o, a), e._registeredHandlers.push(["delegate", t, r, o, a])
        }

        function s(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(a.bind(null, t), n.bind(null, t)), t
        }

        function i(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? l.removeDelegateEvent.apply(void 0, t) : u.apply(void 0, t)
            }), e._registeredHandlers = []
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createMutations = o, t.createModule = s, t.destroyModule = i;
        var l = r(234),
            _ = window,
            d = _.addEvent,
            u = _.removeEvent
    },
    134: function(e, t, r) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t, r, o) {
            return {
                addCustomQuestion: function(e) {
                    r.length < _ && (r.push((0, l["default"])(r.length + 1, e, {
                        onRemove: function(e) {
                            r.splice(e - 1, 1);
                            for (var o = 0; o < r.length; o++) r[o].setNum(o + 1);
                            t().updateCustomQuestionsButton(), LeadFormsApp.updatePreview()
                        }
                    })), t().updateCustomQuestionsButton(), LeadFormsApp.step2Changed())
                },
                updateCustomQuestionsButton: function() {
                    var e = r.length,
                        t = ge("lead_forms_app_add_question_button"),
                        o = geByTag1("span", t);
                    toggle(t, _ > e), e > 0 ? val(o, " (" + cur.lang.communityApps_lead_forms_custom_questions_limit_pref.replace("%s", _ - e) + ")") : val(o, "")
                },
                getCustomQuestionsData: function() {
                    for (var e = [], t = 0; t < r.length; t++) e.push(r[t].getData());
                    return e
                },
                getAdmins: function() {
                    return o.adminsDD.val()
                },
                getAdminsElem: function() {
                    return o.adminsDD.container
                },
                getEmails: function() {
                    return o.adminsEmailsDD.selectedItems().map(function(e) {
                        return e[1]
                    }).join(",")
                },
                getEmailsElem: function() {
                    return o.adminsEmailsDD.container
                },
                renderConfData: function() {
                    for (var e = cur.leadFormConf, r = e.step2.custom_questions, o = 0; o < r.length; o++) t().addCustomQuestion(r[o])
                },
                unmount: function() {
                    (0, s.destroyModule)(e)
                }
            }
        }

        function n(e) {
            var t = [],
                r = {},
                o = cur.leadFormConf,
                n = (0, s.createMutations)(a),
                i = n.callMutations,
                l = n.bindMutations;
            r.adminsDD = new Dropdown(ge("lead_forms_generator_dd_settings_admins"), cur.leadFormsAdmins, {
                width: 300,
                big: 1,
                selectedItem: o.step5 ? o.step5.admins : void 0,
                multiselect: !0,
                autocomplete: !0,
                placeholder: getLang("communityApps_lead_form_settings_admins_placeholder"),
                onChange: LeadFormsApp.checkboxNotificationsChanged
            }), r.adminsEmailsDD = new Selector(ge("lead_forms_generator_dd_settings_admins_emails"), [], {
                width: 300,
                big: 1,
                dropdown: !1,
                enableCustom: !0,
                multiCustom: 1,
                noResult: "",
                maxItems: 10,
                placeholder: getLang("communityApps_lead_form_settings_admins_emails_placeholder"),
                onChange: LeadFormsApp.checkboxNotificationsChanged,
                customSearch: LeadFormsApp.checkboxNotificationsChanged
            }), r.scroll = new uiScroll(e);
            var _ = (0, s.createModule)({
                handlers: function(e, t) {}
            });
            return l(_, i, t, r)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = n;
        var s = r(121),
            i = r(190),
            l = o(i),
            _ = 5
    },
    190: function(e, t, r) {
        "use strict";

        function o(e, t, r) {
            var o = vkNow(),
                s = n(o, a(e), "", t.label ? t.label : "", d),
                i = cur.leadFormsTpls.dropDown.replace("{input_id}", o).replace("{label}", getLang("communityApps_lead_forms_custom_question_answer_type")),
                l = se(cur.leadFormsTpls.customQuestionWrap.replace("{question}", s).replace("{answer_type}", i)),
                _ = geByClass1("lead_forms_app_labeled_row_cont", l).appendChild(ce("div", {
                    className: "lead_forms_app_custom_question_row_remove"
                }));
            return addEvent(_, "click", function() {
                re(domClosest("lead_forms_app_custom_question_row", _)), r()
            }), ge("lead_forms_app_custom_questions").appendChild(l), ge("lead_forms_generator_input_" + o).focus(), [l, o]
        }

        function a(e) {
            return getLang("communityApps_lead_forms_custom_question_label").replace("%s", e)
        }

        function n(e, t, r, o, a) {
            return cur.leadFormsTpls.inputRow.replace(/\{input\_id\}/g, e).replace("{label}", t).replace("{placeholder}", r).replace("{value}", o).replace(/\{max\_length\}/g, a)
        }

        function s(e, t, r) {
            return {
                setText: function(e) {},
                onTypeChanged: function(e, o) {
                    var a = geByClass1("_lead_forms_app_custom_question_row_extra", r.questionEl);
                    if (removeEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", a), "click"), val(a, ""), !inArray(e, ["input", "textarea"])) {
                        var n = o.options ? o.options.length : 2;
                        "select" !== e || o.options || (n = 1), val(a, cur.leadFormsTpls.customQuestionExtra.replace("{inputs}", ""));
                        for (var s = 0; n > s; s++) {
                            var i = o.options ? o.options[s] : "";
                            t().addInput(i)
                        }
                    }
                    addEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", a), "click", function(e) {
                        cancelEvent(e), t().addInput()
                    }), LeadFormsApp.step2Changed()
                },
                addInput: function(e) {
                    var o = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl),
                        a = getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", o.children.length + 1),
                        s = o.appendChild(se(n(vkNow(), "", a, e || "", u))),
                        i = geByClass1("lead_forms_app_labeled_row_cont", s).appendChild(ce("div", {
                            className: "lead_forms_app_custom_question_row_remove"
                        }));
                    addEvent(i, "click", function() {
                        t().removeInput(i)
                    });
                    var l = domCA(geByClass1("lead_forms_app_custom_question_row_extra_add_input", r.questionEl), ".lead_forms_app_labeled_row");
                    o.children.length >= p ? hide(l) : show(l), LeadFormsApp.step2Changed()
                },
                removeInput: function(e) {
                    re(domClosest("lead_forms_app_labeled_row", e));
                    for (var t = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), o = 0; o < t.length; o++) attr(t[o], "placeholder", getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", o + 1))
                },
                getData: function() {
                    for (var e = {
                            label: trim(val("lead_forms_generator_input_" + r.ident)),
                            type: r.answerTypeDD.val(),
                            options: []
                        }, t = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), o = 0; o < t.length; o++) {
                        var a = trim(val(t[o]));
                        a && e.options.push(trim(val(t[o])))
                    }
                    return e
                },
                getNum: function() {
                    return r.questionNum
                },
                setNum: function(e) {
                    r.questionNum = e, val(geByClass1("lead_forms_app_labeled_row_label", r.questionEl), a(e))
                },
                unmount: function() {
                    (0, _.destroyModule)(e)
                }
            }
        }

        function i(e, t, r) {
            t = t || {};
            var a = o(e, t, function() {
                    r.onRemove(c().getNum())
                }),
                n = l(a, 2),
                i = n[0],
                d = n[1],
                u = {
                    questionNum: e,
                    ident: d,
                    questionEl: i,
                    callbacks: r
                },
                p = (0, _.createMutations)(s),
                c = p.callMutations,
                m = p.bindMutations;
            u.answerTypeDD = new Dropdown(ge("lead_forms_generator_dd_" + d), cur.leadFormsData.customQuestionAnswerTypes, {
                width: 300,
                big: 1,
                onChange: function(e) {
                    c().onTypeChanged(e, {})
                },
                selectedItem: t.type ? t.type : void 0
            }), t.type && setTimeout(function() {
                c().onTypeChanged(t.type, t)
            });
            var f = (0, _.createModule)({
                handlers: function(e, t) {}
            });
            return m(f, c, u)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = function() {
            function e(e, t) {
                var r = [],
                    o = !0,
                    a = !1,
                    n = void 0;
                try {
                    for (var s, i = e[Symbol.iterator](); !(o = (s = i.next()).done) && (r.push(s.value), !t || r.length !== t); o = !0);
                } catch (l) {
                    a = !0, n = l
                } finally {
                    try {
                        !o && i["return"] && i["return"]()
                    } finally {
                        if (a) throw n
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t["default"] = i;
        var _ = r(121),
            d = 200,
            u = 60,
            p = 15
    },
    234: function(e, t) {
        "use strict";

        function r(e) {
            var t = s.get(e.currentTarget);
            if (t) {
                var r = t[e.type];
                if (r)
                    for (var o = void 0, a = 0; a < r.length; a++) {
                        var i = n(r[a], 2),
                            l = i[0],
                            _ = i[1],
                            d = void 0;
                        if (hasClass(e.target, l) ? d = _(e, e.target) : (o = gpeByClass(l, e.target, e.currentTarget)) && (d = _(e, o)), d === !1) break
                    }
            }
        }

        function o(e, t, o, a) {
            var n = s.get(e);
            n || (s.set(e, {}), n = s.get(e));
            for (var i = t.split(" "), l = 0; l < i.length; l++) {
                var _ = i[l];
                n[_] || (n[_] = [], addEvent(e, _, r)), n[_].push([o, a])
            }
        }

        function a(e, t, o, a) {
            var n = s.get(e);
            if (n) {
                t.split(" ").forEach(function(t) {
                    n[t] && (n[t] = n[t].filter(function(e) {
                        return e[0] !== o || e[1] !== a
                    }), 0 === n[t].length && removeEvent(e, t, r))
                });
                var i = Object.keys(n).map(function(e) {
                    return n[e].length
                }).reduce(function(e, t) {
                    return e + t
                });
                0 === i && s["delete"](e)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e, t) {
                var r = [],
                    o = !0,
                    a = !1,
                    n = void 0;
                try {
                    for (var s, i = e[Symbol.iterator](); !(o = (s = i.next()).done) && (r.push(s.value), !t || r.length !== t); o = !0);
                } catch (l) {
                    a = !0, n = l
                } finally {
                    try {
                        !o && i["return"] && i["return"]()
                    } finally {
                        if (a) throw n
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.addDelegateEvent = o, t.removeDelegateEvent = a;
        var s = new window.Map
    }
});