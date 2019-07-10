! function(e) {
    function a(a) {
        for (var t, n, i = a[0], l = a[1], _ = a[2], p = 0, m = []; p < i.length; p++) n = i[p], o[n] && m.push(o[n][0]), o[n] = 0;
        for (t in l) Object.prototype.hasOwnProperty.call(l, t) && (e[t] = l[t]);
        for (d && d(a); m.length;) m.shift()();
        return s.push.apply(s, _ || []), r()
    }

    function r() {
        for (var e, a = 0; a < s.length; a++) {
            for (var r = s[a], t = !0, i = 1; i < r.length; i++) {
                var l = r[i];
                0 !== o[l] && (t = !1)
            }
            t && (s.splice(a--, 1), e = n(n.s = r[0]))
        }
        return e
    }
    var t = {},
        o = {
            "web/lead_forms_app": 0
        },
        s = [];

    function n(a) {
        if (t[a]) return t[a].exports;
        var r = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, a, r) {
        n.o(e, a) || Object.defineProperty(e, a, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, a) {
        if (1 & a && (e = n(e)), 8 & a) return e;
        if (4 & a && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & a && "string" != typeof e)
            for (var t in e) n.d(r, t, function(a) {
                return e[a]
            }.bind(null, t));
        return r
    }, n.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(a, "a", a), a
    }, n.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, n.p = "";
    var i = window.webpackJsonp = window.webpackJsonp || [],
        l = i.push.bind(i);
    i.push = a, i = i.slice();
    for (var _ = 0; _ < i.length; _++) a(i[_]);
    var d = l;
    s.push([107, "bundles/common"]), r()
}({
    "0cYn": function(e, a, r) {
        "use strict";
        r.r(a);
        r("KKXr"), r("rGqo"), r("Btvt"), r("SRfc"), r("tUrg"), r("pIFo");
        var t = r("N1NS"),
            o = 200,
            s = 60,
            n = 15;

        function i(e) {
            return getLang("communityApps_lead_forms_custom_question_label").replace("%s", e)
        }

        function l(e, a, r, t, o) {
            return cur.leadFormsTpls.inputRow.replace(/\{input\_id\}/g, e).replace("{label}", a).replace("{placeholder}", r).replace("{value}", t).replace(/\{max\_length\}/g, o)
        }

        function _(e, a, r) {
            return {
                setText(e) {},
                onTypeChanged(e, t) {
                    var o = geByClass1("_lead_forms_app_custom_question_row_extra", r.questionEl);
                    if (removeEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click"), val(o, ""), !inArray(e, ["input", "textarea"])) {
                        var s = 2,
                            n = [],
                            i = null;
                        t.options && ("object" == typeof t.options ? (i = Object.keys(t.options), n = Object.values(t.options), s = i.length) : (s = t.options.length, n = t.options)), "select" !== e || t.options || (s = 1), val(o, cur.leadFormsTpls.customQuestionExtra.replace("{inputs}", ""));
                        for (var l = 0; l < s; l++) {
                            var _ = t.options ? n[l] : "",
                                d = i ? i[l] : l;
                            a().addInput(_, d)
                        }
                    }
                    addEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click", e => {
                        cancelEvent(e), a().addInput()
                    }), LeadFormsApp.step2Changed()
                },
                addInput(e, t) {
                    var o = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl),
                        i = getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", o.children.length + 1),
                        _ = o.appendChild(se(l(vkNow(), "", i, e || "", s))),
                        d = geByClass1("lead_forms_app_labeled_row_cont", _),
                        p = domClosest("lead_forms_app_labeled_row", d);
                    if (!hasClass(p, "lead_forms_app_labeled_row_disabled")) {
                        var m = ce("div", {
                            className: "lead_forms_app_custom_question_row_remove"
                        });
                        d.appendChild(m), addEvent(m, "click", () => {
                            a().removeInput(d)
                        })
                    }
                    void 0 === t && (t = +new Date);
                    var u = geByClass1("lead_forms_app_generator_input", _);
                    data(u, "lead-forms-key", t);
                    var c = domCA(geByClass1("lead_forms_app_custom_question_row_extra_add_input", r.questionEl), ".lead_forms_app_labeled_row");
                    o.children.length >= n ? hide(c) : show(c), LeadFormsApp.step2Changed()
                },
                removeInput(e) {
                    re(domClosest("lead_forms_app_labeled_row", e));
                    for (var a = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), t = 0; t < a.length; t++) attr(a[t], "placeholder", getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", t + 1))
                },
                getData() {
                    var e = {
                        label: trim(val("lead_forms_generator_input_" + r.ident)),
                        type: r.answerTypeDD.val(),
                        options: {}
                    };
                    data(r.questionEl, "lead-forms-key") && (e.key = data(r.questionEl, "lead-forms-key"));
                    var a = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl);
                    if (a)
                        for (var t = geByClass("lead_forms_app_generator_input", a), o = 0; o < t.length; o++) {
                            if (trim(val(t[o]))) {
                                var s = data(t[o], "lead-forms-key");
                                e.options[s] = trim(val(t[o]))
                            }
                        }
                    return e
                },
                getNum: () => r.questionNum,
                setNum(e) {
                    r.questionNum = e, val(geByClass1("lead_forms_app_labeled_row_label", r.questionEl), i(e))
                },
                unmount() {
                    Object(t.c)(e)
                }
            }
        }

        function d(e, a, r) {
            a = a || {};
            var [s, n] = function(e, a, r) {
                var t = vkNow(),
                    s = l(t, i(e), "", a.label ? a.label : "", o),
                    n = cur.leadFormsTpls.dropDown.replace("{input_id}", t).replace("{label}", getLang("communityApps_lead_forms_custom_question_answer_type")),
                    _ = se(cur.leadFormsTpls.customQuestionWrap.replace("{question}", s).replace("{answer_type}", n)),
                    d = geByClass1("lead_forms_app_labeled_row_cont", _),
                    p = domClosest("lead_forms_app_labeled_row", d);
                if (!hasClass(p, "lead_forms_app_labeled_row_disabled")) {
                    var m = ce("div", {
                        className: "lead_forms_app_custom_question_row_remove"
                    });
                    d.appendChild(m), addEvent(m, "click", () => {
                        re(domClosest("lead_forms_app_custom_question_row", d)), r()
                    })
                }
                return ge("lead_forms_app_custom_questions").appendChild(_), ge("lead_forms_generator_input_" + t).focus(), a.key && window.data(_, "lead-forms-key", a.key), [_, t]
            }(e, a, () => {
                r.onRemove(p().getNum())
            }), d = {
                questionNum: e,
                ident: n,
                questionEl: s,
                callbacks: r
            }, {
                callMutations: p,
                bindMutations: m
            } = Object(t.b)(_), u = ge("lead_forms_generator_dd_" + n), c = hasClass(u, "lead_forms_generator_dd_disabled");
            return d.answerTypeDD = new Dropdown(u, cur.leadFormsData.customQuestionAnswerTypes, {
                width: 300,
                big: 1,
                onChange: e => {
                    p().onTypeChanged(e, {})
                },
                selectedItem: a.type ? a.type : void 0
            }), c && d.answerTypeDD.disable(!0), a.type && setTimeout(() => {
                p().onTypeChanged(a.type, a)
            }), m(Object(t.a)({
                handlers: (e, a) => {}
            }), p, d)
        }
        var p = 5;

        function m(e, a, r, o) {
            return {
                addCustomQuestion(e) {
                    r.length < p && (r.push(d(r.length + 1, e, {
                        onRemove: e => {
                            r.splice(e - 1, 1);
                            for (var t = 0; t < r.length; t++) r[t].setNum(t + 1);
                            a().updateCustomQuestionsButton(), LeadFormsApp.updatePreview()
                        }
                    })), a().updateCustomQuestionsButton(), LeadFormsApp.step2Changed())
                },
                updateCustomQuestionsButton() {
                    var e = r.length,
                        a = ge("lead_forms_app_add_question_button"),
                        t = geByTag1("span", a);
                    toggle(a, e < p), e > 0 ? val(t, " (" + cur.lang.communityApps_lead_forms_custom_questions_limit_pref.replace("%s", p - e) + ")") : val(t, "")
                },
                getCustomQuestionsData() {
                    for (var e = [], a = 0; a < r.length; a++) e.push(r[a].getData());
                    return e
                },
                getAdmins: () => o.adminsDD.val(),
                getAdminsElem: () => o.adminsDD.container,
                getEmails: () => o.adminsEmailsDD.selectedItems().map(e => e[1]).join(","),
                getEmailsElem: () => o.adminsEmailsDD.container,
                renderConfData() {
                    for (var e = cur.leadFormConf.step2.custom_questions, r = 0; r < e.length; r++) a().addCustomQuestion(e[r])
                },
                unmount() {
                    Object(t.c)(e)
                }
            }
        }
        window.LeadFormsApp = {
            showGeneratorBox(e, a, r) {
                a = a ? 1 : 0, r = r || !1, !cur.leadFormGroupId && r && (cur.leadFormGroupId = r), showBox("lead_forms_app.php", {
                    act: "generate_form_box",
                    group_id: cur.leadFormGroupId,
                    form_id: e,
                    is_ads: a
                }, {
                    onDone: () => {
                        cur.initialFormConf = LeadFormsApp.getDomData(), cur.leadFormName = trim(val("lead_form_header_name")), this.checkSectionFill()
                    },
                    params: {
                        onHideAttempt: e => !!(e || JSON.stringify(LeadFormsApp.getDomData()) === JSON.stringify(cur.initialFormConf) && cur.leadFormName === trim(val("lead_form_header_name"))) || (showFastBox(getLang("global_warning"), getLang("communityApps_lead_forms_hide_generator_warning"), getLang("communityApps_lead_forms_hide_close"), LeadFormsApp.doHideGenerator, getLang("communityApps_lead_forms_hide_edit")), !1)
                    }
                })
            },
            doHideGenerator() {
                curBox().hide(), curBox().hide(!0)
            },
            initGenerator(e) {
                curBox().setOptions({
                    grey: !0,
                    hideButtons: !0,
                    width: 1e3
                }), cur.leadFormsData = e, cur.leadFormsTpls = e.tpl;
                var a = ge("lead_forms_app_generator_sections");
                cur.leadFromGenerator = function(e) {
                    var a = {},
                        r = cur.leadFormConf,
                        {
                            callMutations: o,
                            bindMutations: s
                        } = Object(t.b)(m),
                        n = ge("lead_forms_generator_dd_settings_admins"),
                        i = !1;
                    hasClass(n, "lead_forms_generator_dd_disabled") && (i = !0);
                    var l = {
                        width: 300,
                        big: 1,
                        selectedItem: r.step5 ? r.step5.admins : void 0,
                        multiselect: !0,
                        autocomplete: !0,
                        placeholder: getLang("communityApps_lead_form_settings_admins_placeholder"),
                        onChange: LeadFormsApp.checkboxNotificationsChanged
                    };
                    a.adminsDD = new Dropdown(n, cur.leadFormsAdmins, l), i && a.adminsDD.disable(!0);
                    var _ = ge("lead_forms_generator_dd_settings_admins_emails"),
                        d = !1;
                    hasClass(_, "lead_forms_generator_dd_disabled") && (d = !0);
                    var p = {
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
                    };
                    return a.adminsEmailsDD = new Selector(_, [], p), d && a.adminsEmailsDD.disable(!0), a.scroll = new uiScroll(e), s(Object(t.a)({
                        handlers: (e, a) => {}
                    }), o, [], a)
                }(a), cur.leadFromGenerator.renderConfData(), this.initUpload(e.upload_info), cur.leadFormsStep = cur.leadFormConf.step1.on ? 1 : 2, this.updatePreview(), this.updateHiddenInputs()
            },
            checkSectionErrors(e) {
                var a = ge("lead_forms_step_section_" + e);
                geByClass1("input_error", a) || geByClass1("button_error", a) || removeClass(a, "section_error")
            },
            sectionHeaderClick(e) {
                var a = e.parentNode,
                    r = geByClass1("lead_forms_app_section_content", a);
                slideToggle(r, 200), toggleClass(a, "expanded")
            },
            inputOnKeyUp(e) {
                var a = e.id.replace("lead_forms_generator_input_", ""),
                    r = parseInt(attr(e, "maxlength"));
                if (cur.leadFormsStep = parseInt(attr(domCA(e, ".lead_forms_app_generator_section"), "data-step")), removeClass(e, "input_error"), this.checkSectionErrors(cur.leadFormsStep), 5 !== cur.leadFormsStep && (this.updatePreview(), this.updateNavigation(this.convertFromStepsToScreens(cur.leadFormsStep))), !isNaN(r)) {
                    var t = Math.max(0, r - val(e).length);
                    val("lead_forms_generator_input_limit_info_" + a, t)
                }
            },
            initUpload(e) {
                var a = ge("lead_form_upload_wrap");
                hasClass(a, "lead_form_upload_wrap_disabled") && (e.upload_options.buttonClass += " flat_btn_lock button_disabled"), UploadPhotoTransform.init(a, e.upload_url, e.upload_vars, e.upload_options, {
                    onUploadStart: () => {
                        removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"), this.checkSectionErrors(1), lockButton(geByClass1("flat_button", a))
                    },
                    onUploadComplete: (e, r) => {
                        var t = parseJSON(r) || {
                            error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                        };
                        if (t.error || t.error_code || !t.photo) return showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_upload_error")), void unlockButton(geByClass1("flat_button", a));
                        var o = ge("lead_form_upload_wrap");
                        attr(o, "data-media", t.photo), this.step1Changed()
                    },
                    onUploadError: () => {
                        unlockButton(geByClass1("flat_button", a)), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_upload_error"))
                    }
                })
            },
            getDomData() {
                for (var e = ge("lead_form_upload_wrap"), a = {
                        title: trim(val("lead_forms_generator_input_title")),
                        cover: attr(e, "data-media"),
                        description: trim(val("lead_forms_generator_input_description")),
                        button: val("lead_forms_generator_input_button"),
                        on: hasClass(geByClass1("_lead_forms_welcome_screen_toggler"), "on")
                    }, r = {
                        questions: [],
                        custom_questions: cur.leadFromGenerator.getCustomQuestionsData()
                    }, t = geByClass("lead_forms_app_questions_checkboxes"), o = 0; o < t.length; o++) {
                    var s = t[o];
                    hasClass(s, "on") && r.questions.push(attr(s, "data-name"))
                }
                return {
                    step1: a,
                    step2: r,
                    step3: {
                        link: trim(val("lead_forms_generator_input_policy_url"))
                    },
                    step4: {
                        description: trim(val("lead_forms_generator_input_confirm_description")),
                        link: trim(val("lead_forms_generator_input_confirm_url"))
                    },
                    step5: {
                        pixel: trim(val("lead_forms_generator_input_pixel_vk")),
                        no_repeat: hasClass(geByClass1("_lead_forms_checkbox_settings_no_repeat"), "on"),
                        notification: hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on"),
                        im_notify: hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                        admins: cur.leadFromGenerator.getAdmins(),
                        emails: cur.leadFromGenerator.getEmails()
                    }
                }
            },
            showStepSuccess(e) {
                var a = ge("lead_forms_step_section_" + e);
                removeClass(a, "section_error"), addClass(a, "section_success")
            },
            showStepError(e) {
                var a = ge("lead_forms_step_section_" + e);
                removeClass(a, "section_success"), addClass(a, "section_error")
            },
            checkStepErrors(e, a) {
                switch (a) {
                    case 1:
                        return !!e.title;
                    case 2:
                        var r = !0;
                        for (var t in e.custom_questions)
                            if (e.custom_questions.label) {
                                r = !1;
                                break
                            }
                        return !(!e.questions.length && r);
                    case 3:
                        return !!e.link;
                    case 4:
                        return !0;
                    case 5:
                        return !(e.notification && !e.admins && !e.emails) && (!(e.im_notify && !e.admins) && !(e.pixel && !e.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/)));
                    default:
                        return !0
                }
            },
            chooseStepStatus(e, a) {
                e ? this.showStepSuccess(a) : this.showStepError(a)
            },
            checkSectionFill() {
                if (!cur.leadFormId) return !1;
                var e = this.getDomData(),
                    {
                        step1: a,
                        step2: r,
                        step3: t,
                        step4: o,
                        step5: s
                    } = e,
                    n = this.checkStepErrors(a, 1),
                    i = this.checkStepErrors(r, 2),
                    l = this.checkStepErrors(t, 3),
                    _ = this.checkStepErrors(o, 4),
                    d = this.checkStepErrors(s, 5);
                (!_ || (o.description || o.link) && _) && this.chooseStepStatus(_, 4), (!_ || _ && (s.pixel || s.no_repeat || s.notification || s.im_notify || s.admins || s.emails)) && this.chooseStepStatus(d, 5), this.chooseStepStatus(n, 1), this.chooseStepStatus(i, 2), this.chooseStepStatus(l, 3)
            },
            saveForm(e, a) {
                if (isButtonLocked(e)) return !1;
                a = a ? 1 : 0;
                var r = this.getDomData(),
                    {
                        step1: t,
                        step2: o,
                        step3: s,
                        step4: n,
                        step5: i
                    } = r,
                    l = !1;
                this.checkStepErrors(t, 1) ? this.showStepSuccess(1) : (l = !0, this.showStepError(1), t.title || addClass("lead_forms_generator_input_title", "input_error")), this.checkStepErrors(o, 2) ? (this.showStepSuccess(2), hide(geByClass1("lead_form_app_questions_error"))) : (l = !0, this.showStepError(2), show(geByClass1("lead_form_app_questions_error"))), this.checkStepErrors(s, 3) ? this.showStepSuccess(3) : (l = !0, this.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error")), this.checkStepErrors(n, 4) ? this.showStepSuccess(4) : this.showStepError(4), this.checkStepErrors(i, 5) ? this.showStepSuccess(5) : (l = !0, this.showStepError(5)), !i.notification || i.admins || i.emails || (addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), addClass(cur.leadFromGenerator.getEmailsElem(), "input_error")), i.im_notify && !i.admins && addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), i.pixel && !i.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/) && (addClass("lead_forms_generator_input_pixel", "input_error"), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_pixel_error")));
                var _ = ge("lead_form_header_error_required"),
                    d = ge("lead_form_header_error_save");
                if (l) return show(_), void hide(d);
                hide(_), hide(d), ajax.post("/lead_forms_app.php", {
                    act: "save_form",
                    name: val("lead_form_header_name"),
                    group_id: cur.leadFormGroupId,
                    data: JSON.stringify(r),
                    hash: cur.leadFormsAppSaveHash,
                    form_id: cur.leadFormId,
                    is_ads: a
                }, {
                    onDone(e) {
                        if (curBox().hide(!0), !e.forms_html) return !1;
                        var a = ge("lead_form_apps_forms_table");
                        a && (a.innerHTML = e.forms_html)
                    },
                    onFail: e => ("save_error" === e ? show(d) : show(_), "bad_policy_link" === e ? (this.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error"), !0) : "bad_site_link" === e ? (this.showStepError(4), addClass("lead_forms_generator_input_confirm_url", "input_error"), !0) : void 0),
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            },
            blockNavigation() {
                each(geByClass("lead_forms_generator_navigator_link"), function(e, a) {
                    addClass(a, "lead_forms_generator_navigator_link_disabled")
                })
            },
            enableNavigation() {
                each(geByClass("lead_forms_generator_navigator_link"), function(e, a) {
                    removeClass(a, "lead_forms_generator_navigator_link_disabled")
                });
                var e = ge("lead_forms_generator_navigator_link_prev");
                parseInt(e.getAttribute("data-screen"), 10) || addClass(e, "lead_forms_generator_navigator_link_disabled");
                var a = ge("lead_forms_generator_navigator_link_next"),
                    r = parseInt(a.getAttribute("data-screen"), 10);
                (!r || r > 2) && addClass(a, "lead_forms_generator_navigator_link_disabled")
            },
            updateNavigation(e) {
                e = parseInt(e, 10), ge("lead_forms_generator_navigator_link_prev").setAttribute("data-screen", e - 1), ge("lead_forms_generator_navigator_link_next").setAttribute("data-screen", e + 1), ge("lead_forms_generator_navigator_step").innerHTML = e, ge("lead_forms_generator_navigator_title").innerHTML = 1 === e ? getLang("communityApps_lead_navigator_title_questions") : getLang("communityApps_lead_navigator_title_success")
            },
            switchScreen(e) {
                if (!e) return !1;
                if (hasClass(e, "lead_forms_generator_navigator_link_disabled")) return !1;
                var a = e.getAttribute("data-screen");
                if (!a) return !1;
                this.blockNavigation(), this.updateNavigation(a);
                var r = this.convertFromScreensToSteps(a);
                cur.leadFormsStep = r, this.updatePreview()
            },
            convertFromScreensToSteps: e => 1 === (e = parseInt(e, 10)) ? 2 : 4,
            convertFromStepsToScreens: e => (e = parseInt(e, 10)) < 4 ? 1 : 2,
            updatePreview() {
                clearTimeout(cur.leadFormsUpdatePreviewTimer), cur.leadFormsUpdatePreviewTimer = setTimeout(() => {
                    this.showPreviewSpinner(), ajax.post("/lead_forms_app.php", {
                        act: "save_preview",
                        group_id: cur.leadFormGroupId,
                        preview_id: cur.leadFormsPreviewId,
                        hash: cur.leadFormsPreviewHash,
                        data: JSON.stringify(this.getDomData())
                    }, {
                        onDone: () => {
                            var e = ce("iframe", {
                                    frameBorder: 0,
                                    className: "lead_forms_preview_frame",
                                    onload: () => {
                                        this.hidePreviewSpinner()
                                    },
                                    src: vk.loginscheme + "://" + vk.host + "/lead_forms_app.php?act=view_form&group_id=" + cur.leadFormGroupId + "&step=" + cur.leadFormsStep + "&preview=" + cur.leadFormsPreviewId
                                }),
                                a = ge("lead_forms_preview_wrap");
                            val(a, ""), ge(a).appendChild(e), this.enableNavigation()
                        }
                    })
                }, 400)
            },
            hidePreviewSpinner() {
                removeClass("lead_forms_app_generator_sections", "lead_forms_app_generator_sections_loading")
            },
            showPreviewSpinner() {
                addClass("lead_forms_app_generator_sections", "lead_forms_app_generator_sections_loading")
            },
            initForm() {
                if (cur.leadFormsPixel) {
                    var e = vkImage();
                    e.src = "https://vk.com/rtrg?p=" + cur.leadFormsPixel, utilsNode.appendChild(e)
                }
                this.initSensitiveInputs()
            },
            initSensitiveInputs() {
                for (var e = geByClass("lead_form_view_sensitive_input_wrapper"), a = function(a) {
                        for (var r = e[a], t = domQuery1('.lead_form_view_sensitive_input[data-id="read"]', r), o = domQuery1('.lead_form_view_sensitive_input[data-id="edit"]', r), s = domQuery(".lead_form_view_sensitive_input_action", r), n = 0; n < s.length; n++) {
                            var i = domData(s[n], "action");
                            if ("edit" === i) addEvent(s[n], "click", function(e) {
                                domData(r, "state", "edit"), addClass(t, "hidden"), removeClass(o, "hidden")
                            });
                            else {
                                if ("cancel" !== i) throw new Error("Unknown action " + i);
                                addEvent(s[n], "click", function(e) {
                                    domData(r, "state", "read"), addClass(o, "hidden"), removeClass(t, "hidden"), val(geByTag1("input", o), "")
                                })
                            }
                        }
                    }, r = 0; r < e.length; r++) a(r)
            },
            step1Changed() {
                cur.leadFormsStep = 1, this.updatePreview(), this.updateNavigation(1)
            },
            step2Changed() {
                cur.leadFormsStep = 2, this.updatePreview(), this.updateNavigation(1)
            },
            switchStep(e) {
                var a = ge("lead_forms_view_wrap");
                removeClass(geByClass1("lead_forms_step_active", a), "lead_forms_step_active"), removeClass(geByClass1("lead_forms_step_active", a), "lead_forms_step_active"), addClass("step" + e, "lead_forms_step_active"), addClass("step" + e + "_buttons", "lead_forms_step_active");
                var r = langStr(cur.lang.communityApps_lead_forms_step_info, "step", e, "total_steps", cur.leadFormSteps);
                val("lead_forms_step_info", r)
            },
            sendForm(e, a, r = !1) {
                a = a || !1;
                for (var t = cur.leadFormConfig, o = [], s = !1, n = 0; n < t.step2.questions.length; n++) {
                    var i = t.step2.questions[n],
                        l = "lead_forms_view_input_" + i,
                        _ = "lead_form_view_sensitive_input_wrapper_" + i,
                        d = trim(val(l)),
                        p = "edit",
                        m = ge(_);
                    m && (p = domData(m, "state")), d || "edit" !== p ? ("email" !== i || "edit" !== p || this.validateEmail(d)) && ("phone_number" !== i || "edit" !== p || this.validatePhone(d)) && ("birthday" !== i || this.validateBirthday(d)) ? o.push({
                        question: i,
                        value: d
                    }) : (notaBene(l, !1, s), s = !0) : (notaBene(l, !1, s), s = !0)
                }
                for (var u = 0; u < t.step2.custom_questions.length; u++) {
                    var c = t.step2.custom_questions[u],
                        f = void 0,
                        g = void 0,
                        h = geByClass1("_custom_question_" + u),
                        v = void 0;
                    switch (c.type) {
                        case "input":
                        case "textarea":
                            g = ge("lead_forms_view_input_custom_question_" + u), f = trim(val(g));
                            break;
                        case "radio":
                            f = {}, 0 !== (v = window.radioBtns["custom_question_" + u].val) && (f[v] = replaceEntities(c.options[v]));
                            break;
                        case "checkbox":
                            f = {};
                            for (var C = geByClass("checkbox", h), w = 0; w < C.length; w++)
                                if (hasClass(C[w], "on")) {
                                    var y = attr(C[w], "data-key");
                                    y in c.options && (f[y] = replaceEntities(c.options[y]))
                                }
                            break;
                        case "select":
                            f = {}, (v = ge("lead_forms_custom_question_select_" + u).value) in c.options && (f[v] = replaceEntities(c.options[v]))
                    }
                    "" !== f && Object.keys(f).length ? o.push({
                        question: "custom_" + u,
                        value: f
                    }) : (inArray(c.type, ["input", "textarea"]) ? (notaBene(g, !1, s), s || LeadFormsApp.scrollToEl(g)) : LeadFormsApp.titleError(geByClass1("lead_form_view_labeled_row_label", h), s), s = !0)
                }
                var b = geByClass1("lead_form_view_policy");
                if (!hasClass(b, "on") && !r) return LeadFormsApp.titleError(b, s);

                function k(e) {
                    for (var a = 0, r = 0; r < e.length; r++) {
                        var t = parseInt(e.substr(r, 1));
                        r % 2 == 0 && (t *= 2) > 9 && (t = 1 + t % 10), a += t
                    }
                    return a % 10 == 0
                }
                var S = !1;
                for (var F of o) {
                    if (F.question === "custom_" + t.step2.validate_passport && !F.value.match(/^\d{10}$/)) {
                        s = !0;
                        var E = ge("lead_forms_view_input_custom_question_" + t.step2.validate_passport);
                        notaBene(E), LeadFormsApp.scrollToEl(E);
                        break
                    }
                    if (F.question === "custom_" + t.step2.validate_passport_issue_date && !this.validateBirthday(F.value)) {
                        s = !0;
                        var B = ge("lead_forms_view_input_custom_question_" + t.step2.validate_passport_issue_date);
                        notaBene(B), LeadFormsApp.scrollToEl(B);
                        break
                    }
                    if (F.question === "custom_" + t.step2.validate_card) {
                        var A = ge("lead_forms_view_input_custom_question_" + t.step2.validate_card);
                        if (!F.value.match(/^\d{16,18}$/)) {
                            s = !0, notaBene(A), LeadFormsApp.scrollToEl(A);
                            break
                        }
                        if (!k(F.value)) {
                            s = !0, notaBene(A), LeadFormsApp.scrollToEl(A);
                            break
                        }
                        S = F.value
                    }
                }

                function x() {
                    if (a) return function() {
                        var e = ge("lead_forms_view_form_preview_error");
                        show(e), setTimeout(() => {
                            hide(e)
                        }, 5e3)
                    }(), !1;
                    ajax.post("/lead_forms_app.php", {
                        act: "send_form",
                        hash: cur.leadFormSendHash,
                        questions: JSON.stringify(o),
                        group_id: cur.leadFormGroupId,
                        form_id: cur.leadFormId,
                        ad_id: cur.leadFormAdId,
                        ad_data: cur.leadFormAdData,
                        access_token: cur.leadFormsAccessToken
                    }, {
                        onDone() {
                            LeadFormsApp.switchStep(2), cur.leadFormSiteLink || hide(geByClass1("lead_forms_buttons_wrap"))
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    })
                }
                s || (t.step2.validate_card && S ? ajax.plainpost("https://paymentcard.yamoney.ru/gates/card/storeCard", {
                    skr_destinationCardNumber: S,
                    skr_responseFormat: "json"
                }, e => {
                    var a = JSON.parse(e);
                    if (a && "success" === a.storeCard.reason && a.storeCard.skr_destinationCardSynonim) {
                        for (var r = 0; r < o.length; ++r) o[r].question === "custom_" + t.step2.validate_card && (o[r].value = a.storeCard.skr_destinationCardSynonim);
                        x()
                    } else {
                        debugLog("Error storing card", e);
                        var s = ge("lead_forms_view_input_custom_question_" + t.step2.validate_card);
                        notaBene(s), LeadFormsApp.scrollToEl(s)
                    }
                }, void 0, !1, void 0, void 0, !0) : x())
            },
            titleError(e, a) {
                addClass(e, "mark_as_error"), setTimeout(() => {
                    removeClass(e, "mark_as_error")
                }, 800), a || LeadFormsApp.scrollToEl(e)
            },
            scrollToEl(e) {
                var a = geByClass1("lead_forms_view_cont_wrap"),
                    r = a.scrollTop,
                    t = getXY(e)[1] - (window.innerHeight - 180);
                a.scrollTop = r + t
            },
            formNameDown(e) {
                if (hasClass(e, "lead_form_header_name_disabled")) return !1;
                if (!geByTag1("input", e)) {
                    var a = clean(val(e));
                    addClass(e, "lead_form_header_name_edited"), val(e, `<input type="text" value="${a}" id="lead_form_name" class="lead_form_name_input" onblur="LeadFormsApp.fromNameBlur(this, event)" onkeypress="if (event.keyCode == KEY.ENTER) this.blur()" />`), setTimeout(() => {
                        var e = geByTag1("input", "lead_form_header_name");
                        document.activeElement !== e && (e.focus(), e.selectionStart = String(val(e)).length)
                    })
                }
            },
            fromNameBlur(e, a) {
                cancelEvent(a);
                var r = clean(val(e)),
                    t = ge("lead_form_header_name");
                removeClass(t, "lead_form_header_name_edited"), val(t, trim(r) || cur.leadFormDefName)
            },
            setFormStatus(e, a, r) {
                var t = 1;
                hasClass(e, "lead_forms_app_form_active") && (t = 0), toggleClass(e, "lead_forms_app_form_active"), val(e, t ? cur.lang.communityApps_lead_form_status_on : cur.lang.communityApps_lead_form_status_off), ajax.post("/lead_forms_app.php", {
                    act: "set_form_status",
                    status: t,
                    group_id: cur.leadFormGroupId,
                    form_id: a,
                    hash: r
                }, {
                    showProgress: lockLink.pbind(e),
                    hideProgress: unlockLink.pbind(e)
                })
            },
            deleteForm(e, a, r) {
                if (linkLocked(e)) return !1;
                addClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted");
                var t = ge("lead_form_actions" + a);
                addClass(t, "lead_forms_app_no_display");
                var o = ge("lead_form_restore" + a);
                removeClass(o, "lead_forms_app_no_display"), this.deleteFormSend(r, a)
            },
            restoreForm(e, a, r) {
                removeClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted"), removeClass("lead_form_actions" + a, "lead_forms_app_no_display"), addClass("lead_form_restore" + a, "lead_forms_app_no_display"), this.deleteFormSend(r, a, !0)
            },
            deleteFormSend(e, a, r) {
                ajax.post("/lead_forms_app.php", {
                    act: "form_delete",
                    hash: e,
                    form_id: a,
                    group_id: cur.leadFormGroupId,
                    restore: r ? 1 : 0
                })
            },
            copyForm(e, a, r, t, o) {
                if (cancelEvent(o), linkLocked(e)) return !1;
                this.copyFormSend(r, a, t, e)
            },
            copyFormSend(e, a, r, t) {
                r = r ? 1 : 0, ajax.post("/lead_forms_app.php", {
                    act: "form_copy",
                    hash: e,
                    form_id: a,
                    group_id: cur.leadFormGroupId,
                    is_ads: r
                }, {
                    onDone(e) {
                        if (!e.ok || !e.forms_html) return !1;
                        var a = ge("lead_form_apps_forms_table");
                        a && (a.innerHTML = e.forms_html)
                    },
                    showProgress: () => {
                        lockLink(t), addClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                    },
                    hideProgress: () => {
                        unlockLink(t), removeClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                    }
                })
            },
            validateEmail: e => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),
            validatePhone(e) {
                var a = String(e).replace(/[^0-9]/g, "").length;
                return a >= 10 && a <= 12
            },
            validateBirthday(e) {
                var a = String(e).match(/^\d{1,2}([./-])\d{1,2}\1\d{4}$/);
                if (!a) return !1;
                var [r, t, o] = a[0].split(a[1]);
                return !((r = parseInt(trim(r))) > 31 || r < 1) && (!((t = parseInt(trim(t))) > 12 || t < 1) && (o = parseInt(trim(o))) > 1927)
            },
            policyCheckBoxClick(e, a) {
                e && "A" === e.target.tagName || checkbox(a)
            },
            checkboxNotificationsChanged() {
                removeClass("lead_forms_step_section_5", "section_error"), removeClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), removeClass(cur.leadFromGenerator.getEmailsElem(), "input_error")
            },
            copyLink(e, a) {
                cancelEvent(a);
                var r = bodyNode.appendChild(ce("input", {
                    value: e
                }, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    opacity: 0
                }));
                r.select(), document.execCommand("copy"), re(r), showDoneBox(getLang("communityApps_lead_forms_link_copied"))
            },
            toggleNotifyCheckbox(e, a) {
                if (!e) return !1;
                "true" === e.getAttribute("aria-checked") ? this.toggleInput(a, !0) : this.toggleInput(a, !1)
            },
            updateHiddenInputs() {
                var e = hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                    a = hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on");
                e && this.toggleInput("lead_forms_app_labeled_row_im", !0), a && this.toggleInput("lead_forms_app_labeled_row_email", !0)
            },
            toggleInput(e, a) {
                a ? removeClass(geByClass1(e), "lead_forms_app_labeled_row_hidden") : addClass(geByClass1(e), "lead_forms_app_labeled_row_hidden")
            },
            createAd(e, a, r, t, o) {
                if (cancelEvent(e), !t) return !1;
                ajax.post("/lead_forms_app.php", {
                    act: "set_form_status",
                    status: 1,
                    group_id: a,
                    form_id: r,
                    hash: o
                }, {
                    onDone: e => {
                        cur.addMedia[cur.wallAddMedia.lnkId].checkURL(t), curBox().hide()
                    },
                    showProgress: () => {
                        addClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                    },
                    hideProgress: () => {
                        removeClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                    }
                })
            },
            showCreateAdTooltip() {
                if ("undefined" == typeof Ads || !Ads) return !1;
                var e = geByClass1("lead_forms_app_form_action_create_ad");
                if (!e) return !1;
                Ads.showNewFeatureTooltip("leadFormsCreateAd", e, {
                    displayCounter: 5,
                    width: 235,
                    offset: [-5, 0],
                    content: getLang("communityApps_lead_forms_tooltip")
                })
            }
        };
        try {
            stManager.done("lead_forms_app.js")
        } catch (e) {}
    },
    107: function(e, a, r) {
        e.exports = r("0cYn")
    },
    N1NS: function(e, a, r) {
        "use strict";
        r("rGqo"), r("Btvt"), r("KKXr");
        var t = new window.Map;

        function o(e) {
            var a = t.get(e.currentTarget);
            if (a) {
                var r = a[e.type];
                if (r)
                    for (var o, s = 0; s < r.length; s++) {
                        var [n, i] = r[s], l = void 0;
                        if (hasClass(e.target, n) ? l = i(e, e.target) : (o = gpeByClass(n, e.target, e.currentTarget)) && (l = i(e, o)), !1 === l) break
                    }
            }
        }
        r.d(a, "b", function() {
            return i
        }), r.d(a, "a", function() {
            return _
        }), r.d(a, "c", function() {
            return d
        });
        var {
            addEvent: s,
            removeEvent: n
        } = window;

        function i(e) {
            return {
                callMutations() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations(...a) {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e(...a)
                }
            }
        }

        function l(e, a, r, s, n) {
            ! function(e, a, r, s) {
                var n = t.get(e);
                n || (t.set(e, {}), n = t.get(e));
                for (var i = a.split(" "), l = 0; l < i.length; l++) {
                    var _ = i[l];
                    n[_] || (n[_] = [], addEvent(e, _, o)), n[_].push([r, s])
                }
            }(a, r, s, n), e._registeredHandlers.push(["delegate", a, r, s, n])
        }

        function _(e) {
            var a = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, a, r, t) {
                s(a, r, t), e._registeredHandlers.push(["bind", a, r, t])
            }.bind(null, a), l.bind(null, a)), a
        }

        function d(e) {
            e._registeredHandlers.forEach(e => {
                var a = e.slice(1);
                "delegate" === e[0] ? function(e, a, r, s) {
                    var n = t.get(e);
                    n && (a.split(" ").forEach(a => {
                        n[a] && (n[a] = n[a].filter(e => e[0] !== r || e[1] !== s), 0 === n[a].length && removeEvent(e, a, o))
                    }), 0 === Object.keys(n).map(e => n[e].length).reduce((e, a) => e + a) && t.delete(e))
                }(...a) : n(...a)
            }), e._registeredHandlers = []
        }
    }
});