﻿! function(e) {
    var t = {};

    function r(a) {
        if (t[a]) return t[a].exports;
        var o = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(a, o, function(t) {
                return e[t]
            }.bind(null, o));
        return a
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 4)
}([function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "default", function() {
        return u
    });
    var a = r(3),
        o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        a = !0,
                        o = !1,
                        s = void 0;
                    try {
                        for (var n, i = e[Symbol.iterator](); !(a = (n = i.next()).done) && (r.push(n.value), !t || r.length !== t); a = !0);
                    } catch (e) {
                        o = !0, s = e
                    } finally {
                        try {
                            !a && i.return && i.return()
                        } finally {
                            if (o) throw s
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        s = 200,
        n = 60,
        i = 15;

    function l(e) {
        return getLang("communityApps_lead_forms_custom_question_label").replace("%s", e)
    }

    function _(e, t, r, a, o) {
        return cur.leadFormsTpls.inputRow.replace(/\{input\_id\}/g, e).replace("{label}", t).replace("{placeholder}", r).replace("{value}", a).replace(/\{max\_length\}/g, o)
    }

    function d(e, t, r) {
        return {
            setText: function(e) {},
            onTypeChanged: function(e, a) {
                var o = geByClass1("_lead_forms_app_custom_question_row_extra", r.questionEl);
                if (removeEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click"), val(o, ""), !inArray(e, ["input", "textarea"])) {
                    var s = a.options ? a.options.length : 2;
                    "select" !== e || a.options || (s = 1), val(o, cur.leadFormsTpls.customQuestionExtra.replace("{inputs}", ""));
                    for (var n = 0; n < s; n++) {
                        var i = a.options ? a.options[n] : "";
                        t().addInput(i)
                    }
                }
                addEvent(geByClass1("lead_forms_app_custom_question_row_extra_add_input", o), "click", function(e) {
                    cancelEvent(e), t().addInput()
                }), LeadFormsApp.step2Changed()
            },
            addInput: function(e) {
                var a = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl),
                    o = getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", a.children.length + 1),
                    s = a.appendChild(se(_(vkNow(), "", o, e || "", n))),
                    l = geByClass1("lead_forms_app_labeled_row_cont", s),
                    d = domClosest("lead_forms_app_labeled_row", l);
                if (!hasClass(d, "lead_forms_app_labeled_row_disabled")) {
                    var u = ce("div", {
                        className: "lead_forms_app_custom_question_row_remove"
                    });
                    l.appendChild(u), addEvent(u, "click", function() {
                        t().removeInput(l)
                    })
                }
                var p = domCA(geByClass1("lead_forms_app_custom_question_row_extra_add_input", r.questionEl), ".lead_forms_app_labeled_row");
                a.children.length >= i ? hide(p) : show(p), LeadFormsApp.step2Changed()
            },
            removeInput: function(e) {
                re(domClosest("lead_forms_app_labeled_row", e));
                for (var t = geByClass("lead_forms_app_generator_input", geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl)), a = 0; a < t.length; a++) attr(t[a], "placeholder", getLang("communityApps_lead_forms_custom_question_answer_placeholder").replace("%s", a + 1))
            },
            getData: function() {
                var e = {
                        label: trim(val("lead_forms_generator_input_" + r.ident)),
                        type: r.answerTypeDD.val(),
                        options: []
                    },
                    t = geByClass1("_lead_forms_app_custom_question_row_extra_inputs", r.questionEl);
                if (t)
                    for (var a = geByClass("lead_forms_app_generator_input", t), o = 0; o < a.length; o++) {
                        trim(val(a[o])) && e.options.push(trim(val(a[o])))
                    }
                return e
            },
            getNum: function() {
                return r.questionNum
            },
            setNum: function(e) {
                r.questionNum = e, val(geByClass1("lead_forms_app_labeled_row_label", r.questionEl), l(e))
            },
            unmount: function() {
                Object(a.destroyModule)(e)
            }
        }
    }

    function u(e, t, r) {
        var n = function(e, t, r) {
                var a = vkNow(),
                    o = _(a, l(e), "", t.label ? t.label : "", s),
                    n = cur.leadFormsTpls.dropDown.replace("{input_id}", a).replace("{label}", getLang("communityApps_lead_forms_custom_question_answer_type")),
                    i = se(cur.leadFormsTpls.customQuestionWrap.replace("{question}", o).replace("{answer_type}", n)),
                    d = geByClass1("lead_forms_app_labeled_row_cont", i),
                    u = domClosest("lead_forms_app_labeled_row", d);
                if (!hasClass(u, "lead_forms_app_labeled_row_disabled")) {
                    var p = ce("div", {
                        className: "lead_forms_app_custom_question_row_remove"
                    });
                    d.appendChild(p), addEvent(p, "click", function() {
                        re(domClosest("lead_forms_app_custom_question_row", d)), r()
                    })
                }
                return ge("lead_forms_app_custom_questions").appendChild(i), ge("lead_forms_generator_input_" + a).focus(), [i, a]
            }(e, t = t || {}, function() {
                r.onRemove(f().getNum())
            }),
            i = o(n, 2),
            u = i[0],
            p = i[1],
            c = {
                questionNum: e,
                ident: p,
                questionEl: u,
                callbacks: r
            },
            m = Object(a.createMutations)(d),
            f = m.callMutations,
            g = m.bindMutations,
            h = ge("lead_forms_generator_dd_" + p),
            v = hasClass(h, "lead_forms_generator_dd_disabled");
        return c.answerTypeDD = new Dropdown(h, cur.leadFormsData.customQuestionAnswerTypes, {
            width: 300,
            big: 1,
            onChange: function(e) {
                f().onTypeChanged(e, {})
            },
            selectedItem: t.type ? t.type : void 0
        }), v && c.answerTypeDD.disable(!0), t.type && setTimeout(function() {
            f().onTypeChanged(t.type, t)
        }), g(Object(a.createModule)({
            handlers: function(e, t) {}
        }), f, c)
    }
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "addDelegateEvent", function() {
        return n
    }), r.d(t, "removeDelegateEvent", function() {
        return i
    });
    var a = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        a = !0,
                        o = !1,
                        s = void 0;
                    try {
                        for (var n, i = e[Symbol.iterator](); !(a = (n = i.next()).done) && (r.push(n.value), !t || r.length !== t); a = !0);
                    } catch (e) {
                        o = !0, s = e
                    } finally {
                        try {
                            !a && i.return && i.return()
                        } finally {
                            if (o) throw s
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = new window.Map;

    function s(e) {
        var t = o.get(e.currentTarget);
        if (t) {
            var r = t[e.type];
            if (r)
                for (var s = void 0, n = 0; n < r.length; n++) {
                    var i = a(r[n], 2),
                        l = i[0],
                        _ = i[1],
                        d = void 0;
                    if (hasClass(e.target, l) ? d = _(e, e.target) : (s = gpeByClass(l, e.target, e.currentTarget)) && (d = _(e, s)), !1 === d) break
                }
        }
    }

    function n(e, t, r, a) {
        var n = o.get(e);
        n || (o.set(e, {}), n = o.get(e));
        for (var i = t.split(" "), l = 0; l < i.length; l++) {
            var _ = i[l];
            n[_] || (n[_] = [], addEvent(e, _, s)), n[_].push([r, a])
        }
    }

    function i(e, t, r, a) {
        var n = o.get(e);
        n && (t.split(" ").forEach(function(t) {
            n[t] && (n[t] = n[t].filter(function(e) {
                return e[0] !== r || e[1] !== a
            }), 0 === n[t].length && removeEvent(e, t, s))
        }), 0 === Object.keys(n).map(function(e) {
            return n[e].length
        }).reduce(function(e, t) {
            return e + t
        }) && o.delete(e))
    }
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var a = r(5),
        o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        a = !0,
                        o = !1,
                        s = void 0;
                    try {
                        for (var n, i = e[Symbol.iterator](); !(a = (n = i.next()).done) && (r.push(n.value), !t || r.length !== t); a = !0);
                    } catch (e) {
                        o = !0, s = e
                    } finally {
                        try {
                            !a && i.return && i.return()
                        } finally {
                            if (o) throw s
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    window.LeadFormsApp = {
        showGeneratorBox: function(e, t) {
            var r = this;
            t = t ? 1 : 0, showBox("lead_forms_app.php", {
                act: "generate_form_box",
                group_id: cur.leadFormGroupId,
                form_id: e,
                is_ads: t
            }, {
                onDone: function() {
                    cur.initialFormConf = LeadFormsApp.getDomData(), cur.leadFormName = trim(val("lead_form_header_name")), r.checkSectionFill()
                },
                params: {
                    onHideAttempt: function(e) {
                        return !!(e || JSON.stringify(LeadFormsApp.getDomData()) === JSON.stringify(cur.initialFormConf) && cur.leadFormName === trim(val("lead_form_header_name"))) || (showFastBox(getLang("global_warning"), getLang("communityApps_lead_forms_hide_generator_warning"), getLang("communityApps_lead_forms_hide_close"), LeadFormsApp.doHideGenerator, getLang("communityApps_lead_forms_hide_edit")), !1)
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
            var t = ge("lead_forms_app_generator_sections");
            cur.leadFromGenerator = Object(a.default)(t), cur.leadFromGenerator.renderConfData(), this.initUpload(e.upload_info), cur.leadFormsStep = cur.leadFormConf.step1.on ? 1 : 2, this.updatePreview(), this.updateHiddenInputs()
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
            if (cur.leadFormsStep = parseInt(attr(domCA(e, ".lead_forms_app_generator_section"), "data-step")), removeClass(e, "input_error"), this.checkSectionErrors(cur.leadFormsStep), 5 !== cur.leadFormsStep && (this.updatePreview(), this.updateNavigation(this.convertFromStepsToScreens(cur.leadFormsStep))), !isNaN(r)) {
                var a = Math.max(0, r - val(e).length);
                val("lead_forms_generator_input_limit_info_" + t, a)
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
                a = ge("lead_form_upload_wrap");
            hasClass(a, "lead_form_upload_wrap_disabled") && (r.buttonClass += " flat_btn_lock button_disabled"), Upload.init(a, e.upload_url, {}, extend(r, {
                onUploadStart: function() {
                    removeClass(geByClass1("upload_btn", "lead_form_upload_wrap"), "button_error"), t.checkSectionErrors(1), lockButton(geByClass1("flat_button", a))
                },
                onUploadComplete: function(e, r) {
                    var o = parseJSON(r) || {
                        error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                    };
                    if (o.error || !o.photos) {
                        var s = void 0;
                        return s = "ERR_UPLOAD_BAD_IMAGE_SIZE" === o.error || o.error.indexOf('result "1"') > -1 ? getLang("communityApps_lead_forms_upload_error") : o.error, showFastBox(getLang("global_error"), s), void unlockButton(geByClass1("flat_button", a))
                    }
                    t.saveUploadedCover(o, geByClass1("flat_button", a))
                },
                onUploadError: function() {
                    unlockButton(geByClass1("flat_button", a))
                }
            }))
        },
        saveUploadedCover: function(e, t) {
            var r = this;
            e.photos = JSON.stringify(e.photos), ajax.post("/al_photos.php", extend({
                act: "choose_uploaded"
            }, e), {
                onDone: function(e, t) {
                    var a = ge("lead_form_upload_wrap");
                    attr(a, "data-media", e), r.step1Changed()
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
                }, a = geByClass("lead_forms_app_questions_checkboxes"), o = 0; o < a.length; o++) {
                var s = a[o];
                hasClass(s, "on") && r.questions.push(attr(s, "data-name"))
            }
            return {
                step1: t,
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
        showStepSuccess: function(e) {
            var t = ge("lead_forms_step_section_" + e);
            removeClass(t, "section_error"), addClass(t, "section_success")
        },
        showStepError: function(e) {
            var t = ge("lead_forms_step_section_" + e);
            removeClass(t, "section_success"), addClass(t, "section_error")
        },
        checkStepErrors: function(e, t) {
            switch (t) {
                case 1:
                    return !!e.title;
                case 2:
                    var r = !0;
                    for (var a in e.custom_questions)
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
        chooseStepStatus: function(e, t) {
            e ? this.showStepSuccess(t) : this.showStepError(t)
        },
        checkSectionFill: function() {
            if (!cur.leadFormId) return !1;
            var e = this.getDomData(),
                t = e.step1,
                r = e.step2,
                a = e.step3,
                o = e.step4,
                s = e.step5,
                n = this.checkStepErrors(t, 1),
                i = this.checkStepErrors(r, 2),
                l = this.checkStepErrors(a, 3),
                _ = this.checkStepErrors(o, 4),
                d = this.checkStepErrors(s, 5);
            (!_ || (o.description || o.link) && _) && this.chooseStepStatus(_, 4), (!_ || _ && (s.pixel || s.no_repeat || s.notification || s.im_notify || s.admins || s.emails)) && this.chooseStepStatus(d, 5), this.chooseStepStatus(n, 1), this.chooseStepStatus(i, 2), this.chooseStepStatus(l, 3)
        },
        saveForm: function(e, t) {
            var r = this;
            if (isButtonLocked(e)) return !1;
            t = t ? 1 : 0;
            var a = this.getDomData(),
                o = a.step1,
                s = a.step2,
                n = a.step3,
                i = a.step4,
                l = a.step5,
                _ = !1;
            this.checkStepErrors(o, 1) ? this.showStepSuccess(1) : (_ = !0, this.showStepError(1), o.title || addClass("lead_forms_generator_input_title", "input_error")), this.checkStepErrors(s, 2) ? (this.showStepSuccess(2), hide(geByClass1("lead_form_app_questions_error"))) : (_ = !0, this.showStepError(2), show(geByClass1("lead_form_app_questions_error"))), this.checkStepErrors(n, 3) ? this.showStepSuccess(3) : (_ = !0, this.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error")), this.checkStepErrors(i, 4) ? this.showStepSuccess(4) : this.showStepError(4), this.checkStepErrors(l, 5) ? this.showStepSuccess(5) : (_ = !0, this.showStepError(5)), !l.notification || l.admins || l.emails || (addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), addClass(cur.leadFromGenerator.getEmailsElem(), "input_error")), l.im_notify && !l.admins && addClass(cur.leadFromGenerator.getAdminsElem(), "input_error"), l.pixel && !l.pixel.match(/^VK\-RTRG\-([a-zA-Z0-9\-]+)$/) && (addClass("lead_forms_generator_input_pixel", "input_error"), showFastBox(getLang("global_error"), getLang("communityApps_lead_forms_pixel_error")));
            var d = geByClass1("lead_form_header_error");
            _ ? show(d) : (hide(d), ajax.post("/lead_forms_app.php", {
                act: "save_form",
                name: val("lead_form_header_name"),
                group_id: cur.leadFormGroupId,
                data: JSON.stringify(a),
                hash: cur.leadFormsAppSaveHash,
                form_id: cur.leadFormId,
                is_ads: t
            }, {
                onDone: function(e) {
                    if (curBox().hide(!0), !e.forms_html) return !1;
                    var t = ge("lead_form_apps_forms_table");
                    t && (t.innerHTML = e.forms_html)
                },
                onFail: function(e) {
                    return show(d), "bad_policy_link" === e ? (r.showStepError(3), addClass("lead_forms_generator_input_policy_url", "input_error"), !0) : "bad_site_link" === e ? (r.showStepError(4), addClass("lead_forms_generator_input_confirm_url", "input_error"), !0) : void 0
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            }))
        },
        blockNavigation: function() {
            each(geByClass("lead_forms_generator_navigator_link"), function(e, t) {
                addClass(t, "lead_forms_generator_navigator_link_disabled")
            })
        },
        enableNavigation: function() {
            each(geByClass("lead_forms_generator_navigator_link"), function(e, t) {
                removeClass(t, "lead_forms_generator_navigator_link_disabled")
            });
            var e = ge("lead_forms_generator_navigator_link_prev");
            parseInt(e.getAttribute("data-screen"), 10) || addClass(e, "lead_forms_generator_navigator_link_disabled");
            var t = ge("lead_forms_generator_navigator_link_next"),
                r = parseInt(t.getAttribute("data-screen"), 10);
            (!r || r > 2) && addClass(t, "lead_forms_generator_navigator_link_disabled")
        },
        updateNavigation: function(e) {
            e = parseInt(e, 10), ge("lead_forms_generator_navigator_link_prev").setAttribute("data-screen", e - 1), ge("lead_forms_generator_navigator_link_next").setAttribute("data-screen", e + 1), ge("lead_forms_generator_navigator_step").innerHTML = e, ge("lead_forms_generator_navigator_title").innerHTML = 1 === e ? getLang("communityApps_lead_navigator_title_questions") : getLang("communityApps_lead_navigator_title_success")
        },
        switchScreen: function(e) {
            if (!e) return !1;
            if (hasClass(e, "lead_forms_generator_navigator_link_disabled")) return !1;
            var t = e.getAttribute("data-screen");
            if (!t) return !1;
            this.blockNavigation(), this.updateNavigation(t);
            var r = this.convertFromScreensToSteps(t);
            cur.leadFormsStep = r, this.updatePreview()
        },
        convertFromScreensToSteps: function(e) {
            return 1 === (e = parseInt(e, 10)) ? 2 : 4
        },
        convertFromStepsToScreens: function(e) {
            return (e = parseInt(e, 10)) < 4 ? 1 : 2
        },
        updatePreview: function() {
            var e = this;
            clearTimeout(cur.leadFormsUpdatePreviewTimer), cur.leadFormsUpdatePreviewTimer = setTimeout(function() {
                e.showPreviewSpinner(), ajax.post("/lead_forms_app.php", {
                    act: "save_preview",
                    group_id: cur.leadFormGroupId,
                    preview_id: cur.leadFormsPreviewId,
                    hash: cur.leadFormsPreviewHash,
                    data: JSON.stringify(e.getDomData())
                }, {
                    onDone: function() {
                        var t = ce("iframe", {
                                frameBorder: 0,
                                className: "lead_forms_preview_frame",
                                onload: function() {
                                    e.hidePreviewSpinner()
                                },
                                src: vk.loginscheme + "://" + vk.host + "/lead_forms_app.php?act=view_form&group_id=" + cur.leadFormGroupId + "&step=" + cur.leadFormsStep + "&preview=" + cur.leadFormsPreviewId
                            }),
                            r = ge("lead_forms_preview_wrap");
                        val(r, ""), ge(r).appendChild(t), e.enableNavigation()
                    }
                })
            }, 400)
        },
        hidePreviewSpinner: function() {
            removeClass("lead_forms_app_generator_sections", "lead_forms_app_generator_sections_loading")
        },
        showPreviewSpinner: function() {
            addClass("lead_forms_app_generator_sections", "lead_forms_app_generator_sections_loading")
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
                    for (var r = e[t], a = domQuery1('.lead_form_view_sensitive_input[data-id="read"]', r), o = domQuery1('.lead_form_view_sensitive_input[data-id="edit"]', r), s = domQuery(".lead_form_view_sensitive_input_action", r), n = 0; n < s.length; n++) {
                        var i = domData(s[n], "action");
                        if ("edit" === i) addEvent(s[n], "click", function(e) {
                            domData(r, "state", "edit"), addClass(a, "hidden"), removeClass(o, "hidden")
                        });
                        else {
                            if ("cancel" !== i) throw new Error("Unknown action " + i);
                            addEvent(s[n], "click", function(e) {
                                domData(r, "state", "read"), addClass(o, "hidden"), removeClass(a, "hidden"), val(geByTag1("input", o), "")
                            })
                        }
                    }
                }, r = 0; r < e.length; r++) t(r)
        },
        step1Changed: function() {
            cur.leadFormsStep = 1, this.updatePreview(), this.updateNavigation(1)
        },
        step2Changed: function() {
            cur.leadFormsStep = 2, this.updatePreview(), this.updateNavigation(1)
        },
        switchStep: function(e) {
            var t = ge("lead_forms_view_wrap");
            removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), removeClass(geByClass1("lead_forms_step_active", t), "lead_forms_step_active"), addClass("step" + e, "lead_forms_step_active"), addClass("step" + e + "_buttons", "lead_forms_step_active");
            var r = langStr(cur.lang.communityApps_lead_forms_step_info, "step", e, "total_steps", cur.leadFormSteps);
            val("lead_forms_step_info", r)
        },
        sendForm: function(e, t) {
            t = t || !1;
            for (var r = cur.leadFormConfig, a = [], o = !1, s = 0; s < r.step2.questions.length; s++) {
                var n = r.step2.questions[s],
                    i = "lead_forms_view_input_" + n,
                    l = "lead_form_view_sensitive_input_wrapper_" + n,
                    _ = trim(val(i)),
                    d = "edit",
                    u = ge(l);
                u && (d = domData(u, "state")), _ || "edit" !== d ? ("email" !== n || "edit" !== d || this.validateEmail(_)) && ("phone_number" !== n || "edit" !== d || this.validatePhone(_)) && ("birthday" !== n || this.validateBirthday(_)) ? a.push({
                    question: n,
                    value: _
                }) : (notaBene(i, !1, o), o = !0) : (notaBene(i, !1, o), o = !0)
            }
            for (var p = 0; p < r.step2.custom_questions.length; p++) {
                var c = r.step2.custom_questions[p],
                    m = void 0,
                    f = void 0,
                    g = geByClass1("_custom_question_" + p);
                switch (c.type) {
                    case "input":
                    case "textarea":
                        f = ge("lead_forms_view_input_custom_question_" + p), m = trim(val(f));
                        break;
                    case "radio":
                        (m = window.radioBtns["custom_question_" + p].val) > 0 && (m = c.options[m - 1]);
                        break;
                    case "checkbox":
                        m = [];
                        for (var h = geByClass("checkbox", g), v = 0; v < h.length; v++) hasClass(h[v], "on") && m.push(c.options[v]);
                        break;
                    case "select":
                        m = c.options[parseInt(ge("lead_forms_custom_question_select_" + p).value)]
                }
                m.length ? a.push({
                    question: "custom_" + p,
                    value: m
                }) : (inArray(c.type, ["input", "textarea"]) ? (notaBene(f, !1, o), o || LeadFormsApp.scrollToEl(f)) : LeadFormsApp.titleError(geByClass1("lead_form_view_labeled_row_label", g), o), o = !0)
            }
            var y = geByClass1("lead_form_view_policy");
            if (!hasClass(y, "on")) return LeadFormsApp.titleError(y, o);

            function C(e) {
                for (var t = 0, r = 0; r < e.length; r++) {
                    var a = parseInt(e.substr(r, 1));
                    r % 2 == 0 && (a *= 2) > 9 && (a = 1 + a % 10), t += a
                }
                return t % 10 == 0
            }
            var w = !1,
                b = !0,
                S = !1,
                k = void 0;
            try {
                for (var F, E = a[Symbol.iterator](); !(b = (F = E.next()).done); b = !0) {
                    var B = F.value;
                    if (B.question === "custom_" + r.step2.validate_passport && !B.value.match(/^\d{10}$/)) {
                        o = !0;
                        var A = ge("lead_forms_view_input_custom_question_" + r.step2.validate_passport);
                        notaBene(A), LeadFormsApp.scrollToEl(A);
                        break
                    }
                    if (B.question === "custom_" + r.step2.validate_passport_issue_date && !this.validateBirthday(B.value)) {
                        o = !0;
                        var x = ge("lead_forms_view_input_custom_question_" + r.step2.validate_passport_issue_date);
                        notaBene(x), LeadFormsApp.scrollToEl(x);
                        break
                    }
                    if (B.question === "custom_" + r.step2.validate_card) {
                        var D = ge("lead_forms_view_input_custom_question_" + r.step2.validate_card);
                        if (!B.value.match(/^\d{16,18}$/)) {
                            o = !0, notaBene(D), LeadFormsApp.scrollToEl(D);
                            break
                        }
                        if (!C(B.value)) {
                            o = !0, notaBene(D), LeadFormsApp.scrollToEl(D);
                            break
                        }
                        w = B.value
                    }
                }
            } catch (o) {
                S = !0, k = o
            } finally {
                try {
                    !b && E.return && E.return()
                } finally {
                    if (S) throw k
                }
            }

            function q() {
                if (t) return r = ge("lead_forms_view_form_preview_error"), show(r), setTimeout(function() {
                    hide(r)
                }, 5e3), !1;
                var r;
                ajax.post("/lead_forms_app.php", {
                    act: "send_form",
                    hash: cur.leadFormSendHash,
                    questions: JSON.stringify(a),
                    group_id: cur.leadFormGroupId,
                    form_id: cur.leadFormId,
                    ad_id: cur.leadFormAdId,
                    access_token: cur.leadFormsAccessToken
                }, {
                    onDone: function() {
                        LeadFormsApp.switchStep(2), cur.leadFormSiteLink || hide(geByClass1("lead_forms_buttons_wrap"))
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            }
            o || (r.step2.validate_card && w ? ajax.plainpost("https://paymentcard.yamoney.ru/gates/card/storeCard", {
                skr_destinationCardNumber: w,
                skr_responseFormat: "json"
            }, function(e) {
                var t = JSON.parse(e);
                if (t && "success" === t.storeCard.reason && t.storeCard.skr_destinationCardSynonim) {
                    for (var o = 0; o < a.length; ++o) a[o].question === "custom_" + r.step2.validate_card && (a[o].value = t.storeCard.skr_destinationCardSynonim);
                    q()
                } else {
                    debugLog("Error storing card", e);
                    var s = ge("lead_forms_view_input_custom_question_" + r.step2.validate_card);
                    notaBene(s), LeadFormsApp.scrollToEl(s)
                }
            }, void 0, !1, void 0, void 0, !0) : q())
        },
        titleError: function(e, t) {
            addClass(e, "mark_as_error"), setTimeout(function() {
                removeClass(e, "mark_as_error")
            }, 800), t || LeadFormsApp.scrollToEl(e)
        },
        scrollToEl: function(e) {
            var t = geByClass1("lead_forms_view_cont_wrap"),
                r = t.scrollTop,
                a = getXY(e)[1] - (window.innerHeight - 180);
            t.scrollTop = r + a
        },
        formNameDown: function(e) {
            if (hasClass(e, "lead_form_header_name_disabled")) return !1;
            if (!geByTag1("input", e)) {
                var t = clean(val(e));
                addClass(e, "lead_form_header_name_edited"), val(e, '<input type="text" value="' + t + '" id="lead_form_name" class="lead_form_name_input" onblur="LeadFormsApp.fromNameBlur(this, event)" onkeypress="if (event.keyCode == KEY.ENTER) this.blur()" />'), setTimeout(function() {
                    var e = geByTag1("input", "lead_form_header_name");
                    document.activeElement !== e && (e.focus(), e.selectionStart = String(val(e)).length)
                })
            }
        },
        fromNameBlur: function(e, t) {
            cancelEvent(t);
            var r = clean(val(e)),
                a = ge("lead_form_header_name");
            removeClass(a, "lead_form_header_name_edited"), val(a, trim(r) || cur.leadFormDefName)
        },
        setFormStatus: function(e, t, r) {
            var a = 1;
            hasClass(e, "lead_forms_app_form_active") && (a = 0), toggleClass(e, "lead_forms_app_form_active"), val(e, a ? cur.lang.communityApps_lead_form_status_on : cur.lang.communityApps_lead_form_status_off), ajax.post("/lead_forms_app.php", {
                act: "set_form_status",
                status: a,
                group_id: cur.leadFormGroupId,
                form_id: t,
                hash: r
            }, {
                showProgress: lockLink.pbind(e),
                hideProgress: unlockLink.pbind(e)
            })
        },
        deleteForm: function(e, t, r) {
            if (linkLocked(e)) return !1;
            addClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted");
            var a = ge("lead_form_actions" + t);
            addClass(a, "lead_forms_app_no_display");
            var o = ge("lead_form_restore" + t);
            removeClass(o, "lead_forms_app_no_display"), this.deleteFormSend(r, t)
        },
        restoreForm: function(e, t, r) {
            removeClass(domCA(e, ".ui_table_row"), "lead_forms_app_form_deleted"), removeClass("lead_form_actions" + t, "lead_forms_app_no_display"), addClass("lead_form_restore" + t, "lead_forms_app_no_display"), this.deleteFormSend(r, t, !0)
        },
        deleteFormSend: function(e, t, r) {
            ajax.post("/lead_forms_app.php", {
                act: "form_delete",
                hash: e,
                form_id: t,
                group_id: cur.leadFormGroupId,
                restore: r ? 1 : 0
            })
        },
        copyForm: function(e, t, r, a, o) {
            if (cancelEvent(o), linkLocked(e)) return !1;
            this.copyFormSend(r, t, a, e)
        },
        copyFormSend: function(e, t, r, a) {
            r = r ? 1 : 0, ajax.post("/lead_forms_app.php", {
                act: "form_copy",
                hash: e,
                form_id: t,
                group_id: cur.leadFormGroupId,
                is_ads: r
            }, {
                onDone: function(e) {
                    if (!e.ok || !e.forms_html) return !1;
                    var t = ge("lead_form_apps_forms_table");
                    t && (t.innerHTML = e.forms_html)
                },
                showProgress: function() {
                    lockLink(a), addClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                },
                hideProgress: function() {
                    unlockLink(a), removeClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                }
            })
        },
        validateEmail: function(e) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
        },
        validatePhone: function(e) {
            var t = String(e).replace(/[^0-9]/g, "").length;
            return t >= 10 && t <= 12
        },
        validateBirthday: function(e) {
            var t = String(e).match(/^\d{1,2}([./-])\d{1,2}\1\d{4}$/);
            if (!t) return !1;
            var r = t[0].split(t[1]),
                a = o(r, 3),
                s = a[0],
                n = a[1],
                i = a[2];
            return !((s = parseInt(trim(s))) > 31 || s < 1) && (!((n = parseInt(trim(n))) > 12 || n < 1) && (i = parseInt(trim(i))) > 1927)
        },
        policyCheckBoxClick: function(e, t) {
            e && "A" === e.target.tagName || checkbox(t)
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
        },
        toggleNotifyCheckbox: function(e, t) {
            if (!e) return !1;
            "true" === e.getAttribute("aria-checked") ? this.toggleInput(t, !0) : this.toggleInput(t, !1)
        },
        updateHiddenInputs: function() {
            var e = hasClass(geByClass1("_lead_forms_checkbox_settings_im_notify"), "on"),
                t = hasClass(geByClass1("_lead_forms_checkbox_settings_notifications"), "on");
            e && this.toggleInput("lead_forms_app_labeled_row_im", !0), t && this.toggleInput("lead_forms_app_labeled_row_email", !0)
        },
        toggleInput: function(e, t) {
            t ? removeClass(geByClass1(e), "lead_forms_app_labeled_row_hidden") : addClass(geByClass1(e), "lead_forms_app_labeled_row_hidden")
        },
        createAd: function(e, t, r, a, o) {
            if (cancelEvent(e), !a) return !1;
            ajax.post("/lead_forms_app.php", {
                act: "set_form_status",
                status: 1,
                group_id: t,
                form_id: r,
                hash: o
            }, {
                onDone: function(e) {
                    cur.addMedia[cur.wallAddMedia.lnkId].checkURL(a), curBox().hide()
                },
                showProgress: function() {
                    addClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                },
                hideProgress: function() {
                    removeClass(ge("lead_form_apps_forms_table"), "lead_form_apps_forms_table_loading")
                }
            })
        },
        showCreateAdTooltip: function() {
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
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "createMutations", function() {
        return l
    }), r.d(t, "createModule", function() {
        return _
    }), r.d(t, "destroyModule", function() {
        return d
    });
    var a = r(1);

    function o(e) {
        if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r
        }
        return Array.from(e)
    }
    var s = window,
        n = s.addEvent,
        i = s.removeEvent;

    function l(e) {
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

    function _(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(function(e, t, r, a) {
            n(t, r, a), e._registeredHandlers.push(["bind", t, r, a])
        }.bind(null, t), function(e, t, r, o, s) {
            Object(a.addDelegateEvent)(t, r, o, s), e._registeredHandlers.push(["delegate", t, r, o, s])
        }.bind(null, t)), t
    }

    function d(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? a.removeDelegateEvent.apply(void 0, o(t)) : i.apply(void 0, o(t))
        }), e._registeredHandlers = []
    }
}, function(e, t, r) {
    e.exports = r(2)
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "default", function() {
        return i
    });
    var a = r(3),
        o = r(0),
        s = 5;

    function n(e, t, r, n) {
        return {
            addCustomQuestion: function(e) {
                r.length < s && (r.push(Object(o.default)(r.length + 1, e, {
                    onRemove: function(e) {
                        r.splice(e - 1, 1);
                        for (var a = 0; a < r.length; a++) r[a].setNum(a + 1);
                        t().updateCustomQuestionsButton(), LeadFormsApp.updatePreview()
                    }
                })), t().updateCustomQuestionsButton(), LeadFormsApp.step2Changed())
            },
            updateCustomQuestionsButton: function() {
                var e = r.length,
                    t = ge("lead_forms_app_add_question_button"),
                    a = geByTag1("span", t);
                toggle(t, e < s), e > 0 ? val(a, " (" + cur.lang.communityApps_lead_forms_custom_questions_limit_pref.replace("%s", s - e) + ")") : val(a, "")
            },
            getCustomQuestionsData: function() {
                for (var e = [], t = 0; t < r.length; t++) e.push(r[t].getData());
                return e
            },
            getAdmins: function() {
                return n.adminsDD.val()
            },
            getAdminsElem: function() {
                return n.adminsDD.container
            },
            getEmails: function() {
                return n.adminsEmailsDD.selectedItems().map(function(e) {
                    return e[1]
                }).join(",")
            },
            getEmailsElem: function() {
                return n.adminsEmailsDD.container
            },
            renderConfData: function() {
                for (var e = cur.leadFormConf.step2.custom_questions, r = 0; r < e.length; r++) t().addCustomQuestion(e[r])
            },
            unmount: function() {
                Object(a.destroyModule)(e)
            }
        }
    }

    function i(e) {
        var t = {},
            r = cur.leadFormConf,
            o = Object(a.createMutations)(n),
            s = o.callMutations,
            i = o.bindMutations,
            l = ge("lead_forms_generator_dd_settings_admins"),
            _ = !1;
        hasClass(l, "lead_forms_generator_dd_disabled") && (_ = !0);
        var d = {
            width: 300,
            big: 1,
            selectedItem: r.step5 ? r.step5.admins : void 0,
            multiselect: !0,
            autocomplete: !0,
            placeholder: getLang("communityApps_lead_form_settings_admins_placeholder"),
            onChange: LeadFormsApp.checkboxNotificationsChanged
        };
        t.adminsDD = new Dropdown(l, cur.leadFormsAdmins, d), _ && t.adminsDD.disable(!0);
        var u = ge("lead_forms_generator_dd_settings_admins_emails"),
            p = !1;
        hasClass(u, "lead_forms_generator_dd_disabled") && (p = !0);
        var c = {
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
        return t.adminsEmailsDD = new Selector(u, [], c), p && t.adminsEmailsDD.disable(!0), t.scroll = new uiScroll(e), i(Object(a.createModule)({
            handlers: function(e, t) {}
        }), s, [], t)
    }
}]);