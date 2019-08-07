! function(e) {
    function r(r) {
        for (var t, n, i = r[0], l = r[1], _ = r[2], p = 0, u = []; p < i.length; p++) n = i[p], o[n] && u.push(o[n][0]), o[n] = 0;
        for (t in l) Object.prototype.hasOwnProperty.call(l, t) && (e[t] = l[t]);
        for (d && d(r); u.length;) u.shift()();
        return s.push.apply(s, _ || []), a()
    }

    function a() {
        for (var e, r = 0; r < s.length; r++) {
            for (var a = s[r], t = !0, i = 1; i < a.length; i++) {
                var l = a[i];
                0 !== o[l] && (t = !1)
            }
            t && (s.splice(r--, 1), e = n(n.s = a[0]))
        }
        return e
    }
    var t = {},
        o = {
            "web/lead_forms_app": 0
        },
        s = [];

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function(e, r, a) {
        n.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: a
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var t in e) n.d(a, t, function(r) {
                return e[r]
            }.bind(null, t));
        return a
    }, n.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(r, "a", r), r
    }, n.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, n.p = "";
    var i = window.webpackJsonp = window.webpackJsonp || [],
        l = i.push.bind(i);
    i.push = r, i = i.slice();
    for (var _ = 0; _ < i.length; _++) r(i[_]);
    var d = l;
    s.push([109, "bundles/common", "bundles/87dee40db44948958b697bcffe916fde"]), a()
}({
    "0cYn": function(e, r, a) {
        "use strict";
        a.r(r);
        a("rE2o"), a("ioFf"), a("KKXr"), a("rGqo"), a("Btvt"), a("SRfc"), a("tUrg"), a("pIFo");
        var t = a("N1NS"),
            o = a("59zB");
        a("hhXQ");

        function s(e, r) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, r) {
                var a = [],
                    t = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var n, i = e[Symbol.iterator](); !(t = (n = i.next()).done) && (a.push(n.value), !r || a.length !== r); t = !0);
                } catch (e) {
                    o = !0, s = e
                } finally {
                    try {
                        t || null == i.return || i.return()
                    } finally {
                        if (o) throw s
                    }
                }
                return a
            }(e, r) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var n = 200,
            i = 60,
            l = 15;

        function _(e) {
            return getLang("communityApps_lead_forms_custom_question_label").replace("%s", e)
        }

        function d(e, r, a, t, o) {
            return cur.leadFormsTpls.inputRow.replace(/\{input\_id\}/g, e).replace("{label}", r).replace("{placeholder}", a).replace("{value}", t).replace(/\{max\_length\}/g, o)
        }

        function p(e, r, a) {
            return {
                setText(e) {},
                onTypeChanged(e, t) {
                    var o = geByClass1("_lead_forms_app_custom_question_row_extra", a.questionEl);
                    if (removeEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click"), val(o, ""), !inArray(e, ["input", "textarea"])) {
                        var s = 2,
                            n = [],
                            i = null;
                        t.options && ("object" == typeof t.options ? (i = Object.keys(t.options), n = Object.values(t.options), s = i.length) : (s = t.options.length, n = t.options)), "select" !== e || t.options || (s = 1), val(o, cur.leadFormsTpls.customQuestionExtra.replace("{inputs}", ""));
                        for (var l = 0; l < s; l++) {
                            var _ = t.options ? n[l] : "",
                                d = i ? i[l] : l;
                            r().addInput(_, d)
                        }
                    }
                    addEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click", e => {
                        cancelEvent(e), r().addInput()
                    }), window.LeadFormsApp.step2Changed()
                },
                addInput(e, t) {
                    var o = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", a.questionEl),
                        s = getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", o.children.length + 1),
                        n = o.appendChild(se(d(vkNow(), "", s, e || "", i))),
                        _ = geByClass1("lead_forms_app_labeled_row_cont", n),
                        p = domClosest("lead_forms_app_labeled_row", _);
                    if (!hasClass(p, "lead_forms_app_labeled_row_disabled")) {
                        var u = ce("div", {
                            className: "lead_forms_app_custom_question_row_remove"
                        });
                        _.appendChild(u), addEvent(u, "click", () => {
                            r().removeInput(_)
                        })
                    }
                    void 0 === t && (t = +new Date);
                    var m = geByClass1("lead_forms_app_generator_input", n);
                    data(m, "lead-forms-key", t);
                    var c = domCA(geByClass1("lead_forms_app_custom_question_row_extra_add_input", a.questionEl), ".lead_forms_app_labeled_row");
                    o.children.length >= l ? hide(c) : show(c), window.LeadFormsApp.step2Changed()
                },
                removeInput(e) {
                    re(domClosest("lead_forms_app_labeled_row", e));
                    for (var r = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", a.questionEl)), t = 0; t < r.length; t++) attr(r[t], "placeholder", getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", t + 1))
                },
                getData() {
                    var e = {
                        label: trim(val("lead_forms_generator_input_" + a.ident)),
                        type: a.answerTypeDD.val(),
                        options: {}
                    };
                    data(a.questionEl, "lead-forms-key") && (e.key = data(a.questionEl, "lead-forms-key"));
                    var r = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", a.questionEl);
                    if (r)
                        for (var t = geByClass("lead_forms_app_generator_input", r), o = 0; o < t.length; o++) {
                            if (trim(val(t[o]))) {
                                var s = data(t[o], "lead-forms-key");
                                e.options[s] = trim(val(t[o]))
                            }
                        }
                    return e
                },
                getNum: () => a.questionNum,
                setNum(e) {
                    a.questionNum = e, val(geByClass1("lead_forms_app_labeled_row_label", a.questionEl), _(e))
                },
                unmount() {
                    Object(t.c)(e)
                }
            }
        }

        function u(e, r, a) {
            var o = s(function(e, r, a) {
                    var t = vkNow(),
                        o = d(t, _(e), "", r.label ? r.label : "", n),
                        s = cur.leadFormsTpls.dropDown.replace("{input_id}", t).replace("{label}", getLang("communityApps_lead_forms_custom_question_answer_type")),
                        i = se(cur.leadFormsTpls.customQuestionWrap.replace("{question}", o).replace("{answer_type}", s)),
                        l = geByClass1("lead_forms_app_labeled_row_cont", i),
                        p = domClosest("lead_forms_app_labeled_row", l);
                    if (!hasClass(p, "lead_forms_app_labeled_row_disabled")) {
                        var u = ce("div", {
                            className: "lead_forms_app_custom_question_row_remove"
                        });
                        l.appendChild(u), addEvent(u, "click", () => {
                            re(domClosest("lead_forms_app_custom_question_row", l)), a()
                        })
                    }
                    return ge("lead_forms_app_custom_questions").appendChild(i), ge("lead_forms_generator_input_" + t).focus(), r.key && window.data(i, "lead-forms-key", r.key), [i, t]
                }(e, r = r || {}, () => {
                    a.onRemove(c().getNum())
                }), 2),
                i = o[0],
                l = o[1],
                u = {
                    questionNum: e,
                    ident: l,
                    questionEl: i,
                    callbacks: a
                },
                m = Object(t.b)(p),
                c = m.callMutations,
                f = m.bindMutations,
                g = ge("lead_forms_generator_dd_" + l),
                h = hasClass(g, "lead_forms_generator_dd_disabled");
            return u.answerTypeDD = new Dropdown(g, cur.leadFormsData.customQuestionAnswerTypes, {
                width: 300,
                big: 1,
                onChange: e => {
                    c().onTypeChanged(e, {})
                },
                selectedItem: r.type ? r.type : void 0
            }), h && u.answerTypeDD.disable(!0), r.type && setTimeout(() => {
                c().onTypeChanged(r.type, r)
            }), f(Object(t.a)({
                handlers: (e, r) => {}
            }), c, u)
        }
        var m = 5;

        function c(e, r, a, o) {
            return {
                addCustomQuestion(e) {
                    a.length < m && (a.push(u(a.length + 1, e, {
                        onRemove: e => {
                            a.splice(e - 1, 1);
                            for (var t = 0; t < a.length; t++) a[t].setNum(t + 1);
                            r().updateCustomQuestionsButton(), window.LeadFormsApp.updatePreview()
                        }
                    })), r().updateCustomQuestionsButton(), window.LeadFormsApp.step2Changed())
                },
                updateCustomQuestionsButton() {
                    var e = a.length,
                        r = ge("lead_forms_app_add_question_button"),
                        t = geByTag1("span", r);
                    toggle(r, e < m), e > 0 ? val(t, " (" + cur.lang.communityApps_lead_forms_custom_questions_limit_pref.replace("%s", m - e) + ")") : val(t, "")
                },
                getCustomQuestionsData() {
                    for (var e = [], r = 0; r < a.length; r++) e.push(a[r].getData());
                    return e
                },
                getAdmins: () => o.adminsDD.val(),
                getAdminsElem: () => o.adminsDD.container,
                getEmails: () => o.adminsEmailsDD.selectedItems().map(e => e[1]).join(","),
                getEmailsElem: () => o.adminsEmailsDD.container,
                renderConfData() {
                    for (var e = cur.leadFormConf.step2.custom_questions, a = 0; a < e.length; a++) r().addCustomQuestion(e[a])
                },
                unmount() {
                    Object(t.c)(e)
                }
            }
        }
        var f = a("7jxN"),
            g = a("v+DW");

        function h(e, r) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, r) {
                var a = [],
                    t = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var n, i = e[Symbol.iterator](); !(t = (n = i.next()).done) && (a.push(n.value), !r || a.length !== r); t = !0);
                } catch (e) {
                    o = !0, s = e
                } finally {
                    try {
                        t || null == i.return || i.return()
                    } finally {
                        if (o) throw s
                    }
                }
                return a
            }(e, r) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        window.LeadFormsApp = {
            showGeneratorBox(e, r, a) {
                r = r ? 1 : 0, a = a || !1, !cur.leadFormGroupId && a && (cur.leadFormGroupId = a), showBox("lead_forms_app.php", {
                    act: "generate_form_box",
                    group_id: cur.leadFormGroupId,
                    form_id: e,
                    is_ads: r
                }, {
                    onDone: () => {
                        cur.initialFormConf = this.getDomData(), cur.leadFormName = trim(val("lead_form_header_name")), this.checkSectionFill(e)
                    },
                    params: {
                        onHideAttempt: e => !!(e || JSON.stringify(this.getDomData()) === JSON.stringify(cur.initialFormConf) && cur.leadFormName === trim(val("lead_form_header_name"))) || (showFastBox(getLang("global_warning"), getLang("communityApps_lead_forms_hide_generator_warning"), getLang("communityApps_lead_forms_hide_close"), this.doHideGenerator, getLang("communityApps_lead_forms_hide_edit")), !1)
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
                var r = ge("lead_forms_app_generator_sections");
                cur.leadFromGenerator = function(e) {
                    var r = {},
                        a = cur.leadFormConf,
                        s = Object(t.b)(c),
                        n = s.callMutations,
                        i = s.bindMutations,
                        l = ge("lead_forms_generator_dd_settings_admins"),
                        _ = !1;
                    hasClass(l, "lead_forms_generator_dd_disabled") && (_ = !0);
                    var d = {
                        width: 300,
                        big: 1,
                        selectedItem: a.step5 ? a.step5.admins : void 0,
                        multiselect: !0,
                        autocomplete: !0,
                        placeholder: getLang("communityApps_lead_form_settings_admins_placeholder"),
                        onChange: window.LeadFormsApp.checkboxNotificationsChanged
                    };
                    r.adminsDD = new Dropdown(l, cur.leadFormsAdmins, d), _ && r.adminsDD.disable(!0);
                    var p = ge("lead_forms_generator_dd_settings_admins_emails"),
                        u = !1;
                    hasClass(p, "lead_forms_generator_dd_disabled") && (u = !0);
                    var m = {
                        width: 300,
                        big: 1,
                        dropdown: !1,
                        enableCustom: !0,
                        multiCustom: 1,
                        noResult: "",
                        maxItems: 10,
                        placeholder: getLang("communityApps_lead_form_settings_admins_emails_placeholder"),
                        onChange: window.LeadFormsApp.checkboxNotificationsChanged,
                        customSearch: window.LeadFormsApp.checkboxNotificationsChanged
                    };
                    return r.adminsEmailsDD = new window.Selector(p, [], m), u && r.adminsEmailsDD.disable(!0), r.scroll = new o.a(e), i(Object(t.a)({
                        handlers: (e, r) => {}
                    }), n, [], r)
                }(r), cur.leadFromGenerator.renderConfData(), this.initUpload(e.upload_info), cur.leadFormsStep = cur.leadFormConf.step1.on ? 1 : 2, this.updatePreview(), this.updateHiddenInputs()
            },
            checkSectionErrors(e) {
                var r = ge("lead_forms_step_section_" + e);
                geByClass1("input_error", r) || geByClass1("button_error", r) || removeClass(r, "section_error")
            },
            sectionHeaderClick(e) {
                var r = e.parentNode,
                    a = geByClass1("lead_forms_app_section_content", r);
                Object(f.m)(a, 200), toggleClass(r, "expanded")
            },
            inputOnKeyUp(e) {
                var r = e.id.replace("lead_forms_generator_input_", ""),
                    a = parseInt(attr(e, "maxlength"));
                if (cur.leadFormsStep = parseInt(attr(domCA(e, ".lead_forms_app_generator_section"), "data-step")), removeClass(e, "input_error"), this.checkSectionErrors(cur.leadFormsStep), 5 !== cur.leadFormsStep && (this.updatePreview(), this.updateNavigation(this.convertFromStepsToScreens(cur.leadFormsStep))), !isNaN(a)) {
                    var t = Math.max(0, a - val(e).length);
                    val("lead_forms_generator_input_limit_info_" + r, t)
                }
            },
            initUpload(e) {
                var r = ge("lead_form_upload_wrap");
                hasClass(r, "lead_form_upload_wrap_disabled") && (e.upload_options.buttonClass += " flat_btn_lock button_disabled"), window.UploadPhotoTransform.init(r, e.upload_url, e.upload_vars, e.upload_options, {
                    onUploadStart: () => {
                        removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"), this.checkSectionErrors(1), lockButton(geByClass1("flat_button", r))
                    },
                    onUploadComplete: (e, a) => {
                        var t = parseJSON(a) || {
                            error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                        };
                        if (t.error || t.error_code || !t.photo) return showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_upload_error")), void unlockButton(geByClass1("flat_button", r));
                        var o = ge("lead_form_upload_wrap");
                        attr(o, "data-media", t.photo), this.step1Changed()
                    },
                    onUploadError: () => {
                        unlockButton(geByClass1("flat_button", r)), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_upload_error"))
                    }
                })
            },
            getDomData() {
                for (var e = ge("lead_form_upload_wrap"), r = {
                        title: trim(val("lead_forms_generator_input_title")),
                        cover: attr(e, "data-media"),
                        description: trim(val("lead_forms_generator_input_description")),
                        button: val("lead_forms_generator_input_button"),
                        on: hasClass(geByClass1("_lead_forms_welcome_screen_toggler"), "on")
                    }, a = {
                        questions: [],
                        custom_questions: cur.leadFromGenerator.getCustomQuestionsData()
                    }, t = geByClass("lead_forms_app_questions_checkboxes"), o = 0; o < t.length; o++) {
                    var s = t[o];
                    hasClass(s, "on") && a.questions.push(attr(s, "data-name"))
                }
                return {
                    step1: r,
                    step2: a,
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
                var r = ge("lead_forms_step_section_" + e);
                removeClass(r, "section_error"), addClass(r, "section_success")
            },
            showStepError(e) {
                var r = ge("lead_forms_step_section_" + e);
                removeClass(r, "section_success"), addClass(r, "section_error")
            },
            checkStepErrors(e, r) {
                switch (r) {
                    case 1:
                        return !!e.title;
                    case 2:
                        for (var a = !0, t = 0; t < e.custom_questions.length; t++)
                            if (e.custom_questions[t].label) {
                                a = !1;
                                break
                            }
                        return !(!e.questions.length && a);
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
            chooseStepStatus(e, r) {
                e ? this.showStepSuccess(r) : this.showStepError(r)
            },
            checkSectionFill(e) {
                if (!e) return !1;
                var r = this.getDomData(),
                    a = r.step1,
                    t = r.step2,
                    o = r.step3,
                    s = r.step4,
                    n = r.step5,
                    i = this.checkStepErrors(a, 1),
                    l = this.checkStepErrors(t, 2),
                    _ = this.checkStepErrors(o, 3),
                    d = this.checkStepErrors(s, 4),
                    p = this.checkStepErrors(n, 5);
                (!d || (s.description || s.link) && d) && this.chooseStepStatus(d, 4), (!d || d && (n.pixel || n.no_repeat || n.notification || n.im_notify || n.admins || n.emails)) && this.chooseStepStatus(p, 5), this.chooseStepStatus(i, 1), this.chooseStepStatus(l, 2), this.chooseStepStatus(_, 3)
            },
            saveForm(e, r, a) {
                if (isButtonLocked(e)) return !1;
                a = a ? 1 : 0;
                var t = this.getDomData(),
                    o = t.step1,
                    s = t.step2,
                    n = t.step3,
                    i = t.step4,
                    l = t.step5,
                    _ = !1;
                this.checkStepErrors(o, 1) ? this.showStepSuccess(1) : (_ = !0, this.showStepError(1), o.title || addClass("lead_forms_generator_input_title", "input_error")), this.checkStepErrors(s, 2) ? (this.showStepSuccess(2), hide(geByClass1("lead_form_app_questions_error"))) : (_ = !0, this.showStepError(2), show(geByClass1("lead_form_app_questions_error"))), this.checkStepErrors(n, 3) ? this.showStepSuccess(3) : (_ = !0, this.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error")), this.checkStepErrors(i, 4) ? this.showStepSuccess(4) : this.showStepError(4), this.checkStepErrors(l, 5) ? this.showStepSuccess(5) : (_ = !0, this.showStepError(5)), !l.notification || l.admins || l.emails || (addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), addClass(cur.leadFromGenerator.getEmailsElem(), "input_error")), l.im_notify && !l.admins && addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), l.pixel && !l.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/) && (addClass("lead_forms_generator_input_pixel", "input_error"), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_pixel_error")));
                var d = ge("lead_form_header_error_required"),
                    p = ge("lead_form_header_error_save");
                if (_) return show(d), void hide(p);
                hide(d), hide(p), ajax.post("/lead_forms_app.php", {
                    act: "save_form",
                    name: val("lead_form_header_name"),
                    group_id: cur.leadFormGroupId,
                    data: JSON.stringify(t),
                    hash: cur.leadFormsAppSaveHash,
                    form_id: r,
                    is_ads: a
                }, {
                    onDone(e) {
                        if (curBox().hide(!0), !e.forms_html) return !1;
                        var r = ge("lead_form_apps_forms_table");
                        r && (r.innerHTML = e.forms_html)
                    },
                    onFail: e => ("save_error" === e ? show(p) : show(d), "bad_policy_link" === e ? (this.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error"), !0) : "bad_site_link" === e ? (this.showStepError(4), addClass("lead_forms_generator_input_confirm_url", "input_error"), !0) : void 0),
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            },
            blockNavigation() {
                each(geByClass("lead_forms_generator_navigator_link"), function(e, r) {
                    addClass(r, "lead_forms_generator_navigator_link_disabled")
                })
            },
            enableNavigation() {
                each(geByClass("lead_forms_generator_navigator_link"), function(e, r) {
                    removeClass(r, "lead_forms_generator_navigator_link_disabled")
                });
                var e = ge("lead_forms_generator_navigator_link_prev");
                parseInt(e.getAttribute("data-screen"), 10) || addClass(e, "lead_forms_generator_navigator_link_disabled");
                var r = ge("lead_forms_generator_navigator_link_next"),
                    a = parseInt(r.getAttribute("data-screen"), 10);
                (!a || a > 2) && addClass(r, "lead_forms_generator_navigator_link_disabled")
            },
            updateNavigation(e) {
                e = parseInt(e, 10), ge("lead_forms_generator_navigator_link_prev").setAttribute("data-screen", e - 1), ge("lead_forms_generator_navigator_link_next").setAttribute("data-screen", e + 1), ge("lead_forms_generator_navigator_step").innerHTML = e, ge("lead_forms_generator_navigator_title").innerHTML = 1 === e ? getLang("communityApps_lead_navigator_title_questions") : getLang("communityApps_lead_navigator_title_success")
            },
            switchScreen(e) {
                if (!e) return !1;
                if (hasClass(e, "lead_forms_generator_navigator_link_disabled")) return !1;
                var r = e.getAttribute("data-screen");
                if (!r) return !1;
                this.blockNavigation(), this.updateNavigation(r);
                var a = this.convertFromScreensToSteps(r);
                cur.leadFormsStep = a, this.updatePreview()
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
                                r = ge("lead_forms_preview_wrap");
                            val(r, ""), ge(r).appendChild(e), this.enableNavigation()
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
                for (var e = geByClass("lead_form_view_sensitive_input_wrapper"), r = function(r) {
                        for (var a = e[r], t = domQuery1('.lead_form_view_sensitive_input[data-id="read"]', a), o = domQuery1('.lead_form_view_sensitive_input[data-id="edit"]', a), s = domQuery(".lead_form_view_sensitive_input_action", a), n = 0; n < s.length; n++) {
                            var i = domData(s[n], "action");
                            if ("edit" === i) addEvent(s[n], "click", function(e) {
                                domData(a, "state", "edit"), addClass(t, "hidden"), removeClass(o, "hidden")
                            });
                            else {
                                if ("cancel" !== i) throw new Error("Unknown action " + i);
                                addEvent(s[n], "click", function(e) {
                                    domData(a, "state", "read"), addClass(o, "hidden"), removeClass(t, "hidden"), val(geByTag1("input", o), "")
                                })
                            }
                        }
                    }, a = 0; a < e.length; a++) r(a)
            },
            step1Changed() {
                cur.leadFormsStep = 1, this.updatePreview(), this.updateNavigation(1)
            },
            step2Changed() {
                cur.leadFormsStep = 2, this.updatePreview(), this.updateNavigation(1)
            },
            switchStep(e) {
                var r = ge("lead_forms_view_wrap");
                removeClass(geByClass1("lead_forms_step_active", r), "lead_forms_step_active"), removeClass(geByClass1("lead_forms_step_active", r), "lead_forms_step_active"), addClass("step" + e, "lead_forms_step_active"), addClass("step" + e + "_buttons", "lead_forms_step_active");
                var a = langStr(cur.lang.communityApps_lead_forms_step_info, "step", e, "total_steps", cur.leadFormSteps);
                val("lead_forms_step_info", a)
            },
            sendForm(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                r = r || !1;
                for (var t = cur.leadFormConfig, o = [], s = !1, n = 0; n < t.step2.questions.length; n++) {
                    var i = t.step2.questions[n],
                        l = "lead_forms_view_input_" + i,
                        _ = "lead_form_view_sensitive_input_wrapper_" + i,
                        d = trim(val(l)),
                        p = "edit",
                        u = ge(_);
                    u && (p = domData(u, "state")), d || "edit" !== p ? ("email" !== i || "edit" !== p || this.validateEmail(d)) && ("phone_number" !== i || "edit" !== p || this.validatePhone(d)) && ("birthday" !== i || this.validateBirthday(d)) ? o.push({
                        question: i,
                        value: d
                    }) : (s = !0, Object(g.q)(l, !1, s)) : (s = !0, Object(g.q)(l, !1, s))
                }
                for (var m = 0; m < t.step2.custom_questions.length; m++) {
                    var c = t.step2.custom_questions[m],
                        f = void 0,
                        h = void 0,
                        v = geByClass1("_custom_question_" + m),
                        w = void 0;
                    switch (c.type) {
                        case "input":
                        case "textarea":
                            h = ge("lead_forms_view_input_custom_question_" + m), f = trim(val(h));
                            break;
                        case "radio":
                            f = {}, 0 !== (w = window.radioBtns["custom_question_" + m].val) && (f[w] = replaceEntities(c.options[w]));
                            break;
                        case "checkbox":
                            f = {};
                            for (var y = geByClass("checkbox", v), C = 0; C < y.length; C++)
                                if (hasClass(y[C], "on")) {
                                    var b = attr(y[C], "data-key");
                                    b in c.options && (f[b] = replaceEntities(c.options[b]))
                                }
                            break;
                        case "select":
                            f = {}, (w = ge("lead_forms_custom_question_select_" + m).value) in c.options && (f[w] = replaceEntities(c.options[w]))
                    }
                    "" !== f && Object.keys(f).length ? o.push({
                        question: "custom_" + m,
                        value: f
                    }) : (inArray(c.type, ["input", "textarea"]) ? (Object(g.q)(h, !1, s), s || this.scrollToEl(h)) : this.titleError(geByClass1("lead_form_view_labeled_row_label", v), s), s = !0)
                }
                var k = geByClass1("lead_form_view_policy");
                if (!hasClass(k, "on") && !a) return this.titleError(k, s);
                if (!s) {
                    (() => {
                        if (r) return function() {
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
                            onDone: () => {
                                this.switchStep(2), cur.leadFormSiteLink || hide(geByClass1("lead_forms_buttons_wrap"))
                            },
                            showProgress: lockButton.pbind(e),
                            hideProgress: unlockButton.pbind(e)
                        })
                    })()
                }
            },
            titleError(e, r) {
                addClass(e, "mark_as_error"), setTimeout(() => {
                    removeClass(e, "mark_as_error")
                }, 800), r || this.scrollToEl(e)
            },
            scrollToEl(e) {
                var r = geByClass1("lead_forms_view_cont_wrap"),
                    a = r.scrollTop,
                    t = getXY(e)[1] - (window.innerHeight - 180);
                r.scrollTop = a + t
            },
            formNameDown(e) {
                if (hasClass(e, "lead_form_header_name_disabled")) return !1;
                if (!geByTag1("input", e)) {
                    var r = clean(val(e));
                    addClass(e, "lead_form_header_name_edited"), val(e, `<input type="text" value="${r}" id="lead_form_name" class="lead_form_name_input" onblur="LeadFormsApp.fromNameBlur(this, event)" onkeypress="if (event.keyCode == KEY.ENTER) this.blur()" />`), setTimeout(() => {
                        var e = geByTag1("input", "lead_form_header_name");
                        document.activeElement !== e && (e.focus(), e.selectionStart = String(val(e)).length)
                    })
                }
            },
            fromNameBlur(e, r) {
                cancelEvent(r);
                var a = clean(val(e)),
                    t = ge("lead_form_header_name");
                removeClass(t, "lead_form_header_name_edited"), val(t, trim(a) || cur.leadFormDefName)
            },
            setFormStatus(e, r, a) {
                var t = 1;
                hasClass(e, "lead_forms_app_form_active") && (t = 0), toggleClass(e, "lead_forms_app_form_active"), val(e, t ? cur.lang.communityApps_lead_form_status_on : cur.lang.communityApps_lead_form_status_off), ajax.post("/lead_forms_app.php", {
                    act: "set_form_status",
                    status: t,
                    group_id: cur.leadFormGroupId,
                    form_id: r,
                    hash: a
                }, {
                    showProgress: lockLink.pbind(e),
                    hideProgress: unlockLink.pbind(e)
                })
            },
            deleteForm(e, r, a) {
                if (linkLocked(e)) return !1;
                addClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted");
                var t = ge("lead_form_actions" + r);
                addClass(t, "lead_forms_app_no_display");
                var o = ge("lead_form_restore" + r);
                removeClass(o, "lead_forms_app_no_display"), this.deleteFormSend(a, r)
            },
            restoreForm(e, r, a) {
                removeClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted"), removeClass("lead_form_actions" + r, "lead_forms_app_no_display"), addClass("lead_form_restore" + r, "lead_forms_app_no_display"), this.deleteFormSend(a, r, !0)
            },
            deleteFormSend(e, r, a) {
                ajax.post("/lead_forms_app.php", {
                    act: "form_delete",
                    hash: e,
                    form_id: r,
                    group_id: cur.leadFormGroupId,
                    restore: a ? 1 : 0
                })
            },
            copyForm(e, r, a, t, o) {
                if (cancelEvent(o), linkLocked(e)) return !1;
                this.copyFormSend(a, r, t, e)
            },
            copyFormSend(e, r, a, t) {
                a = a ? 1 : 0, ajax.post("/lead_forms_app.php", {
                    act: "form_copy",
                    hash: e,
                    form_id: r,
                    group_id: cur.leadFormGroupId,
                    is_ads: a
                }, {
                    onDone(e) {
                        if (!e.ok || !e.forms_html) return !1;
                        var r = ge("lead_form_apps_forms_table");
                        r && (r.innerHTML = e.forms_html)
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
                var r = String(e).replace(/[^0-9]/g, "").length;
                return r >= 10 && r <= 12
            },
            validateBirthday(e) {
                var r = String(e).match(/^\d{1,2}([./-])\d{1,2}\1\d{4}$/);
                if (!r) return !1;
                var a = h(r[0].split(r[1]), 3),
                    t = a[0],
                    o = a[1],
                    s = a[2];
                return !((t = parseInt(trim(t), 10)) > 31 || t < 1) && (!((o = parseInt(trim(o), 10)) > 12 || o < 1) && (s = parseInt(trim(s), 10)) > 1927)
            },
            policyCheckBoxClick(e, r) {
                e && "A" === e.target.tagName || checkbox(r)
            },
            checkboxNotificationsChanged() {
                removeClass("lead_forms_step_section_5", "section_error"), removeClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), removeClass(cur.leadFromGenerator.getEmailsElem(), "input_error")
            },
            copyLink(e, r) {
                cancelEvent(r);
                var a = bodyNode.appendChild(ce("input", {
                    value: e
                }, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    opacity: 0
                }));
                a.select(), document.execCommand("copy"), re(a), showDoneBox(getLang("communityApps_lead_forms_link_copied"))
            },
            toggleNotifyCheckbox(e, r) {
                if (!e) return !1;
                "true" === e.getAttribute("aria-checked") ? this.toggleInput(r, !0) : this.toggleInput(r, !1)
            },
            updateHiddenInputs() {
                var e = hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                    r = hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on");
                e && this.toggleInput("lead_forms_app_labeled_row_im", !0), r && this.toggleInput("lead_forms_app_labeled_row_email", !0)
            },
            toggleInput(e, r) {
                r ? removeClass(geByClass1(e), "lead_forms_app_labeled_row_hidden") : addClass(geByClass1(e), "lead_forms_app_labeled_row_hidden")
            },
            createAd(e, r, a, t, o) {
                if (cancelEvent(e), !t) return !1;
                ajax.post("/lead_forms_app.php", {
                    act: "set_form_status",
                    status: 1,
                    group_id: r,
                    form_id: a,
                    hash: o
                }, {
                    onDone: () => {
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
                if (void 0 === window.Ads || !window.Ads) return !1;
                var e = geByClass1("lead_forms_app_form_action_create_ad");
                if (!e) return !1;
                window.Ads.showNewFeatureTooltip("leadFormsCreateAd", e, {
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
    109: function(e, r, a) {
        e.exports = a("0cYn")
    },
    N1NS: function(e, r, a) {
        "use strict";
        a("rE2o"), a("ioFf"), a("rGqo"), a("Btvt"), a("KKXr");

        function t(e, r) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, r) {
                var a = [],
                    t = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var n, i = e[Symbol.iterator](); !(t = (n = i.next()).done) && (a.push(n.value), !r || a.length !== r); t = !0);
                } catch (e) {
                    o = !0, s = e
                } finally {
                    try {
                        t || null == i.return || i.return()
                    } finally {
                        if (o) throw s
                    }
                }
                return a
            }(e, r) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var o = new window.Map;

        function s(e) {
            var r = o.get(e.currentTarget);
            if (r) {
                var a = r[e.type];
                if (a)
                    for (var s, n = 0; n < a.length; n++) {
                        var i = t(a[n], 2),
                            l = i[0],
                            _ = i[1],
                            d = void 0;
                        if (hasClass(e.target, l) ? d = _(e, e.target) : (s = gpeByClass(l, e.target, e.currentTarget)) && (d = _(e, s)), !1 === d) break
                    }
            }
        }
        a.d(r, "b", function() {
            return _
        }), a.d(r, "a", function() {
            return p
        }), a.d(r, "c", function() {
            return u
        });
        var n = window,
            i = n.addEvent,
            l = n.removeEvent;

        function _(e) {
            return {
                callMutations() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e(...arguments)
                }
            }
        }

        function d(e, r, a, t, n) {
            ! function(e, r, a, t) {
                var n = o.get(e);
                n || (o.set(e, {}), n = o.get(e));
                for (var i = r.split(" "), l = 0; l < i.length; l++) {
                    var _ = i[l];
                    n[_] || (n[_] = [], addEvent(e, _, s)), n[_].push([a, t])
                }
            }(r, a, t, n), e._registeredHandlers.push(["delegate", r, a, t, n])
        }

        function p(e) {
            var r = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, r, a, t) {
                i(r, a, t), e._registeredHandlers.push(["bind", r, a, t])
            }.bind(null, r), d.bind(null, r)), r
        }

        function u(e) {
            e._registeredHandlers.forEach(e => {
                var r = e.slice(1);
                "delegate" === e[0] ? function(e, r, a, t) {
                    var n = o.get(e);
                    n && (r.split(" ").forEach(r => {
                        n[r] && (n[r] = n[r].filter(e => e[0] !== a || e[1] !== t), 0 === n[r].length && removeEvent(e, r, s))
                    }), 0 === Object.keys(n).map(e => n[e].length).reduce((e, r) => e + r) && o.delete(e))
                }(...r) : l(...r)
            }), e._registeredHandlers = []
        }
    },
    hhXQ: function(e, r, a) {
        var t = a("XKFU"),
            o = a("UExd")(!1);
        t(t.S, "Object", {
            values: function(e) {
                return o(e)
            }
        })
    }
});