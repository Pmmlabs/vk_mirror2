! function(e) {
    function t(t) {
        for (var n, o, r = t[0], c = t[1], d = t[2], m = 0, p = []; m < r.length; m++) o = r[m], i[o] && p.push(i[o][0]), i[o] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
        for (l && l(t); p.length;) p.shift()();
        return a.push.apply(a, d || []), s()
    }

    function s() {
        for (var e, t = 0; t < a.length; t++) {
            for (var s = a[t], n = !0, r = 1; r < s.length; r++) {
                var c = s[r];
                0 !== i[c] && (n = !1)
            }
            n && (a.splice(t--, 1), e = o(o.s = s[0]))
        }
        return e
    }
    var n = {},
        i = {
            "web/ads_edit_easy": 0
        },
        a = [];

    function o(t) {
        if (n[t]) return n[t].exports;
        var s = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(s.exports, s, s.exports, o), s.l = !0, s.exports
    }
    o.m = e, o.c = n, o.d = function(e, t, s) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (o.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) o.d(s, n, function(t) {
                return e[t]
            }.bind(null, n));
        return s
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "";
    var r = window.webpackJsonp = window.webpackJsonp || [],
        c = r.push.bind(r);
    r.push = t, r = r.slice();
    for (var d = 0; d < r.length; d++) t(r[d]);
    var l = c;
    a.push([56, "common"]), s()
}({
    56: function(e, t, s) {
        e.exports = s("x625")
    },
    x625: function(e, t, s) {
        "use strict";
        s.r(t);
        var n = s("aong"),
            i = s("XzvV"),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var s = [],
                            n = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, r = e[Symbol.iterator](); !(n = (o = r.next()).done) && (s.push(o.value), !t || s.length !== t); n = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !n && r.return && r.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return s
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        window.AdsEditEasyPromote = function() {
            function e(t, s) {
                var n = this;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.onGeoEditorLoaded = function() {
                        var e = this.getCriteriaPreset(this.audienceDropdown.val())[0];
                        e.geo_near && this.geoEditor.setPointsFromString(e.geo_near), this.geoEditor.updateMap()
                    }, t && s) {
                    this.box = t, this.boxBodyNode = t.bodyNode, this.boxControlsTextNode = t.controlsTextNode, this.imageElement = geByClass1(this.classname("image"), this.boxBodyNode), this.screensContainerElement = geByClass1(this.classname("screens-container"), this.boxBodyNode), this.headerElement = geByClass1(this.classname("header"), this.boxBodyNode), this.acceptTermsCheckboxInput = geByClass1(this.classname("accept-terms"), this.boxControlsTextNode), this.imageLayer1Element = geByClass1(this.classname("image-layer_1"), this.imageElement), this.imageLayer2Element = geByClass1(this.classname("image-layer_2"), this.imageElement), this.screensWrapperElement = geByClass1(this.classname("screens-wrapper"), this.screensContainerElement), this.introScreenElement = geByClass1(this.classname("screen_intro"), this.screensWrapperElement), this.settingsScreenElement = geByClass1(this.classname("screen_settings"), this.screensWrapperElement), this.paymentScreenElement = geByClass1(this.classname("screen_payment"), this.screensWrapperElement), this.cardPaymentScreenElement = geByClass1(this.classname("screen_card-payment"), this.screensWrapperElement), this.paymentResultScreenElement = geByClass1(this.classname("screen_payment-result"), this.screensWrapperElement), this.moreSettingsScreenElement = geByClass1(this.classname("screen_more-settings"), this.screensWrapperElement), this.settingsScreenElement && (this.totalBudgetElement = geByClass1(this.classname("row-content_total-budget"), this.settingsScreenElement), this.expectedReachValueElement = geByClass1(this.classname("expected-reach-value"), this.settingsScreenElement), this.expectedReachLimitElement = geByClass1(this.classname("expected-reach-limit"), this.settingsScreenElement), this.expectedReachBarValueElement = geByClass1(this.classname("expected-reach-bar-value"), this.settingsScreenElement), this.expectedReachHintElement = geByClass1(this.classname("expected-reach-hint"), this.settingsScreenElement), this.audienceSettingsElement = geByClass1(this.classname("audience-settings"), this.settingsScreenElement), this.editAudienceLinkWrapperElement = geByClass1(this.classname("edit-audience-link"), this.settingsScreenElement), this.editAudienceNameLinksWrapperElement = geByClass1(this.classname("edit-audience-name-links"), this.settingsScreenElement), this.budgetTitleRowElement = geByClass1(this.classname("row_budget-title"), this.settingsScreenElement), this.geoContainerPointsElement = geByClass1(this.classname("geo-container_points"), this.settingsScreenElement), this.geoContainerRegionsElement = geByClass1(this.classname("geo-container_regions"), this.settingsScreenElement), this.expectedReachRowElement = geByClass1(this.classname("row_expected-reach"), this.settingsScreenElement), this.updateTargetParamsProgressElement = geByClass1(this.classname("update-progress"), this.settingsScreenElement), this.audienceMenuDotsElement = geByClass1(this.classname("audience-menu-dots"), this.settingsScreenElement), this.audienceMenuSaveElement = geByClass1(this.classname("audience-menu-item_save"), this.audienceMenuDotsElement), this.audienceMenuSaveNewElement = geByClass1(this.classname("audience-menu-item_save_new"), this.audienceMenuDotsElement), this.audienceMenuDeleteElement = geByClass1(this.classname("audience-menu-item_delete"), this.audienceMenuDotsElement), this.audienceProgressElement = geByClass1(this.classname("audience-menu-progress"), this.settingsScreenElement), this.audienceNameInput = geByClass1(this.classname("audience-name-input"), this.settingsScreenElement), this.settingsErrorElement = geByClass1(this.classname("settings-error"), this.settingsScreenElement)), this.paymentScreenElement && (this.paymentTotalBudgetElement = geByClass1(this.classname("payments-total-budget"), this.paymentScreenElement), this.paymentUnionBudgetElement = geByClass1(this.classname("payments-union-budget"), this.paymentScreenElement), this.paymentTotalBudgetInput = geByClass1(this.classname("payments-input-amount"), this.paymentScreenElement), this.paymentAmountCurrencyElement = geByClass1(this.classname("payments-amount-currency"), this.paymentScreenElement), this.paymentSystemsElement = geByClass1(this.classname("payments-systems"), this.paymentScreenElement), this.paymentContinueElement = geByClass1(this.classname("payments-continue"), this.paymentScreenElement), this.paymentErrorElement = geByClass1(this.classname("payments-error"), this.paymentScreenElement), this.paymentIntroElement = geByClass1(this.classname("payments-intro"), this.paymentScreenElement)), this.cardPaymentScreenElement && (this.cardPaymentIframeContainerElement = geByClass1(this.classname("card-payment-iframe-container"), this.cardPaymentScreenElement), this.paymentSystemsFormElement = geByClass1(this.classname("card-payment-form"), this.cardPaymentScreenElement)), this.paymentResultScreenElement && (this.paymentResultElement = geByClass1(this.classname("payment-result"), this.paymentResultScreenElement), this.paymentResultTitleElement = geByClass1(this.classname("payment-result-title"), this.paymentResultScreenElement), this.paymentResultSubtitleElement = geByClass1(this.classname("payment-result-subtitle"), this.paymentResultScreenElement), this.paymentResultIconContainerElement = geByClass1(this.classname("payment-result-icon-container"), this.paymentResultScreenElement), this.paymentResultButtonContainerElement = geByClass1(this.classname("payment-result-button-container"), this.paymentResultScreenElement), this.paymentResultButtonElement = geByClass1(this.classname("payment-result-button"), this.paymentResultScreenElement)), this.moreSettingsScreenElement && (this.moreSettingsOfficeSwitcherRowElement = geByClass1(this.classname("row_office-switcher"), this.moreSettingsScreenElement), this.moreSettingsCategoryIdRowElement = geByClass1(this.classname("row_category-id"), this.moreSettingsScreenElement), this.moreSettingsSubtitleElement = geByClass1(this.classname("more-settings-subtitle"), this.moreSettingsScreenElement), this.moreSettingsOfficeLabelElement = geByClass1(this.classname("more-settings-office-label"), this.moreSettingsScreenElement), this.moreSettingsCategoryLabelElement = geByClass1(this.classname("more-settings-category-label"), this.moreSettingsScreenElement));
                    var i = this.box.getOptions();
                    i && i.lang && (cur.lang = extend(cur.lang || {}, i.lang)), t.setOptions({
                        onDestroy: function() {
                            Radiobutton.destroy("ads_targeting_criterion_geo_type"), Radiobutton.destroy("ads_targeting_criterion_sex"), cur.isPaymentProcess = !1
                        }
                    }), this.options = s, this.currentScreen = this.introScreenElement, this.options.already_promoted_ad_id ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_already_promoted_title"), getLang("ads_edit_easy_promote_already_promoted_description"), "success"), this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "https://vk.com/ads?act=office&union_id=" + this.options.already_promoted_ad_id), this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    }), this.currentScreen = this.paymentResultScreenElement) : this.options.union_payment ? (this.currentScreen = this.paymentScreenElement, this.box.changed = !0, this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    })) : this.options.no_intro_screen && (this.currentScreen = this.settingsScreenElement, this.box.changed = !0), removeClass(this.currentScreen, "unshown"), removeClass(this.currentScreen, this.classname("screen_hidden")), this.mouseInitialY = !1, this.lastMouseMoveEvent = +new Date, this.editingAudience = !1, this.updateTargetLastRequestID = 0, this.updateTargetCounter = 0, this.box.removeButtons(), this.continueButton = this.box.addButton(getLang("global_continue"), this.onContinueButtonClicked.bind(this), void 0, !0), setTimeout(removeClass.pbind(this.imageElement, this.classname("image_animated")), 200), setTimeout(removeClass.pbind(this.headerElement, this.classname("header_animated")), 3e3);
                    for (var a = 1; a <= 3; ++a) setTimeout(removeClass.pbind(geByClass1(this.classname("intro-block_" + a), this.boxBodyNode), this.classname("intro-block_animated")), 3e3 + 600 * a);
                    if (addEvent(this.paymentTotalBudgetInput, "blur change", this.updatePaymentAmount.bind(this)), addEvent(this.paymentScreenElement, "click", this.onPaymentScreenClicked.bind(this)), addEvent(this.paymentContinueElement, "click", this.onPaymentCompleted.bind(this)), this.paymentCardsTurnedOver = !1, !this.options.union_payment) {
                        this.settingsScreenInitialized = !1, this.initSettingsScreen(), this.initMoreSettingsScreen();
                        var o = langStr(getLang("ads_edit_easy_promote_accept_terms"), "link", '<a href="https://vk.com/ads?act=office_help&terms=1" target="_blank" onclick="event && event.stopPropagation()">', "/link", "</a>");
                        this.acceptTermsCheckbox = new Checkbox(this.acceptTermsCheckboxInput, {
                            checked: !0,
                            inline: !0,
                            width: "auto",
                            containerClass: this.classname("accept-terms-checkbox"),
                            label: o,
                            onChange: function() {
                                n.updateContinueButton()
                            }
                        })
                    }
                    cur.paymentComplete || (cur.paymentComplete = function(e, t) {
                        cur.paymentCompleteParams = t, cur.isPaymentComplete = !0
                    }), cur.paymentCanceled || (cur.paymentCanceled = function(e) {
                        e ? cur.isPaymentFailed = !0 : cur.isPaymentCanceled = !0
                    }), window.aep = this
                }
            }
            return e.prototype.classname = function(e) {
                return "ads_edit_easy_promote_box__" + e
            }, e.prototype.onContinueButtonClicked = function(e) {
                var t = this.currentScreen == this.settingsScreenElement,
                    s = this.currentScreen == this.moreSettingsScreenElement;
                t ? this.moreSettingsRequired(t) ? (this.updateMoreSettingsScreen(t), this.goToScreen(this.moreSettingsScreenElement, !1, {
                    showBackButton: !0
                })) : this.createAd(e) : s ? this.moreSettingsRequired(t) || this.createAd(e) : this.nextScreen()
            }, e.prototype.onBoxBodyMouseMoved = function(e) {
                if (!(+new Date - this.lastMouseMoveEvent < 70)) {
                    this.lastMouseMoveEvent = +new Date, !1 === this.mouseInitialY && (this.mouseInitialY = e.screenY);
                    var t = -(this.mouseInitialY - e.screenY) / 600 * 10;
                    setStyle(this.imageLayer1Element, {
                        transform: "translateY(" + Math.round(t / 2) + "px)"
                    }), setStyle(this.imageLayer2Element, {
                        transform: "translateY(" + Math.round(t / 1) + "px)"
                    })
                }
            }, e.prototype.onGeoInputPointAdded = function(e, t) {
                var s = e[0].split(","),
                    n = this.geoEditor.addPoint(s[0], s[1], s[2], s[3], e[1]);
                this.geoEditor.updateMap(n)
            }, e.prototype.onGeoEditorPointAdded = function(e) {
                this.geoPlacesList.addTagData([e.id, e.caption, "", 1, "", this.options.geo.radius_selector]), this.geoPlacesList.updateInput();
                var t = this.geoPlacesList.getTokenById(e.id);
                this.updateDropdownTokenRadiusText(t, e.radius), this.updateTargetParams()
            }, e.prototype.onGeoInputPointRemoved = function(e, t) {
                this.geoEditor.removePoint(e[0]), this.geoEditor.updateMap()
            }, e.prototype.onGeoEditorPointRemoved = function(e) {
                this.geoPlacesList.removeTagData(e), this.updateTargetParams()
            }, e.prototype.onGeoEditorPointUpdated = function(e, t, s) {
                var n = this.geoPlacesList.replaceTagID(e, t.id);
                s.caption && this.geoPlacesList.replaceTagText(t.id, t.caption), s.radius && this.updateDropdownTokenRadiusText(n, t.radius), (s.coords || s.radius || s.mask) && this.updateTargetParams()
            }, e.prototype.onUpdateTargetParamsDone = function(e) {
                if (!this.updateTargetLastRequestID || !e.request_id || e.request_id == this.updateTargetLastRequestID) {
                    if (this.haveTargetingParamsResponse = !0, "planner_reach" in e && "total_reach" in e && (this.options.expected_reach.value = e.planner_reach, this.options.expected_reach.limit = e.total_reach, this.updateExpectedReach()), "planner_price" in e) {
                        var t = e.planner_price / 1e3;
                        t = Math.max(this.options.cost_per_click_min, t), t = Math.min(this.options.cost_per_click_max, t), this.options.save_params.cost_per_click = t.toFixed(2)
                    }
                    if ("suggested_criteria_data" in e && (this.setCriteriaData(e.suggested_criteria_data), this.options.suggested_criteria_data = e.suggested_criteria_data), "suggested_criteria" in e && e.suggested_criteria && (this.options.suggested_criteria = e.suggested_criteria, this.editingAudience || 0 != this.audienceDropdown.val() || this.setTargetingParams(e.suggested_criteria)), "category_suggestions" in e) {
                        this.options.category_suggestions = e.category_suggestions;
                        var s = this.options.category_suggestions[0];
                        if (s) {
                            var n = s[1] ? s[1] : s[0];
                            this.moreSettingsCategoryDropdown.selectItem(n)
                        }
                    }
                    "cities_data" in e && (this.options.big_cities[e.cities_data_country] = e.cities_data, this.updateGeoRegionDropdown())
                }
            }, e.prototype.onUpdateTargetParamsFailed = function(e) {
                return debugLog("Get target params failed: ", e), this.options.expected_reach.value = 0, this.options.expected_reach.limit = 0, this.updateExpectedReach(), !0
            }, e.prototype.onPaymentScreenClicked = function(e) {
                if (hasClass(e.target, this.classname("payments-systems-item")) && hasClass(e.target, this.classname("payments-systems-item_clickable")))
                    if (intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, "")) < intval(this.options.payment_min_amount)) notaBene(this.paymentTotalBudgetInput, null, !0);
                    else if (hide(this.paymentErrorElement), window.tooltips && tooltips.destroy(this.paymentTotalBudgetInput), hasClass(e.target, this.classname("payments-systems-item_inverse"))) {
                    e.target.getAttribute("data-inverse-type");
                    var t = e.target.getAttribute("data-inverse-link");
                    t && window.open(t, "_blank")
                } else {
                    var s = e.target.getAttribute("data-type");
                    switch (cur.isPaymentProcess = !0, s) {
                        case "webmoney":
                        case "kiwipurse":
                            this.doNontransactionalPayment(s, cur.ps_list[s]);
                            break;
                        case "paypal_ipn":
                        case "mailmoney_vkpay":
                        case "card":
                            this.doTransactionalPayment(s, cur.ps_list[s]);
                            break;
                        case "yandexmoney":
                            1 === cur.ps_list[s].new_api ? this.doTransactionalPayment(s, cur.ps_list[s]) : this.doNontransactionalPayment(s, cur.ps_list[s]);
                            break;
                        case "terminals":
                            this.paymentCardsTurnOver()
                    }
                }
            }, e.prototype.onPaymentCompleted = function() {
                this.options.union_payment ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_payments_success_subtitle"), "success"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })) : this.enableAd()
            }, e.prototype.onPaymentFailed = function(e, t) {
                this.setPaymentResultScreen(t || getLang("ads_edit_easy_promote_payment_failed"), e || getLang("ads_edit_easy_promote_payment_failed_description"), "error"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })
            }, e.prototype.onPaymentWaiting = function() {
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_payment"), "wait")
            }, e.prototype.onPaymentCheckDone = function(e, t, s, n, i) {
                if (e) switch (intval(s)) {
                    case 0:
                        setTimeout(this.waitForPaymentResult.bind(this, t), 1e3);
                        break;
                    case 1:
                        this.onPaymentCompleted();
                        break;
                    case 8:
                        var a = void 0;
                        if (!t.redirectDone) {
                            this.paymentSystemsFormElement.innerHTML = "", this.paymentSystemsFormElement.action = n.action, this.paymentSystemsFormElement.method = "get", this.paymentSystemsFormElement.innerHTML = Object.keys(n.params).reduce(function(e, t) {
                                return e + '<input type="hidden" autocomplete="off" name="' + t + '" value="' + n.params[t] + '"/>'
                            }, "");
                            var o = '<form action="' + this.paymentSystemsFormElement.action + '" method="' + this.paymentSystemsFormElement.method + '" id="popup_payment_form" accept-charset="UTF-8">' + this.paymentSystemsFormElement.innerHTML + "</form>",
                                r = getLang("payment_redirect").replace("%s", t.paymentSystemData.title);
                            if (cur._popup_text = cur.paymentsPopupHtml(r, o, "document.getElementById('popup_payment_form').submit()"), t.paymentPopup) a = t.paymentPopup;
                            else {
                                a = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1")
                            }
                            cur.paymentsPopupWrite(a)
                        }
                        setTimeout(this.waitForPaymentResult.bind(this, extend(t, {
                            paymentPopup: t.paymentPopup || a,
                            redirectDone: !0
                        })), 1e3);
                        break;
                    case 10:
                        n = getLang("payments_ads_fraud_control_msg"), i = getLang("payments_ads_fraud_control_title");
                    case 2:
                    default:
                        this.onPaymentFailed(n, i)
                } else this.onPaymentFailed(s, i);
                return !0
            }, e.prototype.updateAudienceActions = function() {
                var e = this.audienceDropdown.val();
                toggleClass(this.audienceMenuDeleteElement, "ui_actions_menu_item_disabled", 0 == e), toggleClass(this.audienceMenuSaveElement, "ui_actions_menu_item_disabled", 0 == e)
            }, e.prototype.getCriteriaPreset = function(e) {
                var t = !1,
                    s = !1;
                return 0 == e && this.options.suggested_criteria ? (t = this.options.suggested_criteria, this.options.suggested_criteria_data && (s = this.options.suggested_criteria_data)) : this.options.criteria_presets[e] && (t = this.options.criteria_presets[e].criteria_raw, this.options.criteria_presets_data[e] && (s = this.options.criteria_presets_data[e])), [t, s]
            }, e.prototype.onCriteriaPresetChanged = function(e) {
                if ("" !== e) {
                    var t = this.getCriteriaPreset(e),
                        s = a(t, 2),
                        n = s[0],
                        i = s[1];
                    this.updateAudienceActions(), n && (i && this.setCriteriaData(i), this.setTargetingParams(n), this.lastCriteriaPresetID = e)
                } else this.audienceDropdown.selectItem(this.lastCriteriaPresetID || 0)
            }, e.prototype.onCreateAdFailed = function(e) {
                domFC(this.settingsErrorElement).innerHTML = e.error_msg || e.error_msg_eng || getLang("global_unknown_error"), show(this.settingsErrorElement), this.goToScreen(this.settingsScreenElement, !0)
            }, e.prototype.onCreateAdDone = function(e, t) {
                if (!e || t.error_msg || t.error_msg_eng) this.onCreateAdFailed(t);
                else if (t.ad_id && (this.options.created_ad_id = t.ad_id), t.update_options && (this.options = extend(this.options, t.update_options)), this.options.payment_available && this.options.selected_union_id == this.options.payment_union_id) {
                    this.paymentIntroElement.innerHTML = langStr(getLang("ads_edit_easy_promote_payments_intro"), "link", '<a href="/ads?act=office&union_id=' + this.options.created_ad_id + '">', "/link", "</a>");
                    var s = this.options.user_offices[this.options.payment_union_id];
                    s && "budget_result" in s && (this.paymentUnionBudgetElement.innerHTML = langNumeric(s.budget_result, getLang("global_money_amount_rub", "raw"), !0)), this.goToScreen(this.paymentScreenElement)
                } else this.onPaymentCompleted();
                return !0
            }, e.prototype.onEnableAdDone = function(e, t) {
                return t.info && "ok" === t.info ? this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_edit_easy_promote_payment_done_subtitle"), "success") : this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_failed"), getLang("ads_edit_easy_promote_enable_failed") + (t.error ? " " + t.error : ""), "error"), this.options.created_ad_id && this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "/ads?act=office&union_id=" + this.options.created_ad_id), this.goToScreen(this.paymentResultScreenElement), !0
            }, e.prototype.onAudienceMenuItemClicked = function(e) {
                var t = e.target;
                if (!hasClass(t, this.classname("audience-menu-item"))) return !1;
                var s = this.audienceDropdown.val(),
                    n = s.split("_"),
                    i = a(n, 2),
                    o = i[0],
                    r = i[1];
                r = intval(r);
                var c = t.getAttribute("data-action");
                if (hasClass(t, "ui_actions_menu_item_disabled")) return !1;
                switch (c) {
                    case "save-to-current":
                        if (0 == s) return !1;
                        if (r <= 0) return !1;
                        this.editCriteriaPreset(o, r, "", 0);
                        break;
                    case "save-to-new":
                        this.isEditingAudienceName = !0, hide(this.audienceDropdown.container), show(this.audienceNameInput), show(this.editAudienceNameLinksWrapperElement), this.editingAudience || hide(this.editAudienceLinkWrapperElement), hide(this.audienceMenuDotsElement), val(this.audienceNameInput, ""), elfocus(this.audienceNameInput);
                        break;
                    case "delete-current":
                        if (r <= 0) return !1;
                        this.editCriteriaPreset(o, r, "", 1)
                }
                return !1
            }, e.prototype.goToScreen = function(t, s, n) {
                if (!t) return !1;
                if (n = extend({}, {
                        noBottomControls: t === this.cardPaymentScreenElement || t === this.paymentScreenElement || t === this.paymentResultScreenElement
                    }, n || {}), t == this.currentScreen) return this.setBoxOptions(n), !1;
                t === this.settingsScreenElement && (this.box.changed = !0), window.removeEventListener("message", e.frameMessage, !1), addClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden"), setStyle(this.screensContainerElement, {
                    height: this.screensContainerElement.clientHeight
                }), s && (addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, cur.isPaymentProcess = !1), removeClass(t, "unshown"), removeClass(t, this.classname("screen_hidden")), t.scrollTop = 0;
                var i = s ? t.offsetTop + t.clientHeight : this.currentScreen.offsetTop + this.currentScreen.clientHeight;
                return setStyle(this.screensWrapperElement, {
                    transform: "translateY(-" + i + "px)"
                }), addClass(this.currentScreen, this.classname("screen_hidden")), s && (this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                    transform: "translateY(0)"
                })), this.screensContainerElement.clientHeight, setStyle(this.screensContainerElement, {
                    height: t.clientHeight
                }), this.setBoxOptions(n), setTimeout(function(e) {
                    addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                        transform: "translateY(0)"
                    }), addClass(e, "unshown"), setStyle(this.screensContainerElement, {
                        height: "auto"
                    }), this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), removeClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden")
                }.bind(this, this.currentScreen), 600), this.currentScreen = t, this.currentScreen === this.settingsScreenElement && this.updateExpectedReach(), !1
            }, e.prototype.nextScreen = function(e) {
                var t = (e ? domPS : domNS)(this.currentScreen),
                    s = {};
                return t == this.cardPaymentScreenElement && (e && (t = domPS(t)), s.showBackButton = !0), this.goToScreen(t, e, s)
            }, e.prototype.paymentCardsTurnOver = function(e) {
                var t = this,
                    s = 0;
                geByClass(this.classname("payments-systems-item"), this.paymentScreenElement).map(function(n) {
                    var i = n.getAttribute("data-type"),
                        a = n.getAttribute("data-inverse-type");
                    setTimeout(function() {
                        addClass(n, t.classname("payments-systems-item_rotated")), setTimeout(function() {
                            addClass(n, t.classname("payments-systems-item_no-transition")), n.clientHeight, (e ? removeClass : addClass)(n, t.classname("payments-systems-item_inverse")), addClass(n, t.classname("payments-systems-item_rotated-inv")), removeClass(n, t.classname("payments-systems-item_rotated")), toggleClass(n, t.classname("payments-systems-item_") + i, e), toggleClass(n, t.classname("payments-systems-item_") + a, !e), toggleClass(n, t.classname("payments-systems-item_clickable"), e ? !!i : !!a), n.clientHeight, removeClass(n, t.classname("payments-systems-item_no-transition")), n.clientHeight, removeClass(n, t.classname("payments-systems-item_rotated-inv"))
                        }, 200)
                    }, 50 * s), s++
                }), this.paymentCardsTurnedOver = !e, this.setBoxOptions({
                    showBackButton: this.paymentCardsTurnedOver,
                    noBottomControls: !0
                })
            }, e.prototype.goBack = function() {
                return this.paymentCardsTurnedOver ? this.paymentCardsTurnOver(!0) : this.nextScreen(!0), !1
            }, e.prototype.setBoxOptions = function(e) {
                if (e) {
                    this.box.setOptions({
                        title: e.showBackButton ? '<a class="back ads_edit_easy_promote_box__back">' + getLang("global_box_title_back") + "</a>" : this.options.box_title,
                        hideButtons: !!e.noBottomControls,
                        noRefreshCoords: !("noRefreshCoords" in e) || e.noRefreshCoords
                    });
                    var t = geByClass1(this.classname("back"), this.box.titleWrap);
                    t && (removeEvent(t, "click", this.goBack.bind(this)), addEvent(t, "click", this.goBack.bind(this)))
                }
            }, e.prototype.updateDropdownTokenRadiusText = function(e, t) {
                geByClass1("ads_edit_geo_place_radius_selector_text", e).innerHTML = langNumeric(t, "%s", !0) + " " + getLang("ads_edit_ad_geo_radius_unit_meters")
            }, e.prototype.getTextWidth = function(e) {
                var t = ce("span", {
                    innerHTML: e
                });
                document.body.appendChild(t);
                var s = getSize(t);
                return re(t), s[0]
            }, e.prototype.getAgeSelectorData = function(e, t, s) {
                for (var n = [
                        [0, getLang("ads_age_any")]
                    ], i = e; i <= t; ++i) n.push([i, langNumeric(i, s)]);
                return n
            }, e.prototype.getGeoRegionURL = function() {
                return "/select.php?act=acity&autocomplete=1&show_regions=1&country=" + this.geoCountryDropdown.val()
            }, e.prototype.updateGeoRegionDropdown = function() {
                this.geoRegionDropdown.setURL(this.getGeoRegionURL()), this.geoRegionDropdown.disable(0 == this.geoCountryDropdown.val() && !this.geoRegionDropdown.val());
                var e = this.options.big_cities[this.geoCountryDropdown.val()];
                this.geoRegionDropdown.setOptions({
                    defaultItems: e || []
                }), e || this.updateTargetParams(!1, {
                    need_cities_data: !0
                })
            }, e.prototype.updateGeoPlacesList = function() {
                var e = !1,
                    t = "";
                this.geoEditor.inited && (e = this.geoEditor.map.getCenter(), t += "&radius=" + this.geoEditor.options.defaultRadius), e && (t += "&lat=" + e.lat + "&lon=" + e.lon);
                var s = "/adsedit?act=search_geo" + t;
                this.geoPlacesList.setURL(s)
            }, e.prototype.updateSettingsScreenFixedRow = function() {
                var e = this.settingsScreenElement.scrollHeight - this.settingsScreenElement.scrollTop - this.settingsScreenElement.clientHeight,
                    t = e > 0,
                    s = domPN(this.durationDropdown.container).offsetTop + this.durationDropdown.container.clientHeight,
                    n = domPN(this.dailyLimitDropdown.container).offsetTop + this.dailyLimitDropdown.container.clientHeight;
                this.durationDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - s - this.expectedReachRowElement.clientHeight && this.durationDropdown.select.hide(), this.dailyLimitDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - n - this.expectedReachRowElement.clientHeight && this.dailyLimitDropdown.select.hide(), this.expectedReachRowElement.fixed !== t && (t && !this.expectedReachRowDummyElement && (this.expectedReachRowDummyElement = ce("div", {
                    className: this.classname("row ads_edit_easy_promote_box__row_expected-reach")
                }, {
                    height: this.expectedReachRowElement.clientHeight - 20
                }), this.settingsScreenElement.appendChild(this.expectedReachRowDummyElement)), t || (re(this.expectedReachRowDummyElement), delete this.expectedReachRowDummyElement), toggleClass(this.expectedReachRowElement, this.classname("row_fixed"), t), this.expectedReachRowElement.fixed = t)
            }, e.prototype.updatePaymentAmount = function() {
                var e = intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, ""));
                e < intval(this.options.payment_min_amount) ? (showTooltip(this.paymentTotalBudgetInput, {
                    text: langNumeric(this.options.payment_min_amount, getLang("ads_minimum_payment", "raw"), !0),
                    dir: "auto",
                    shift: [0, 6, 0]
                }), addClass(this.paymentSystemsElement, this.classname("payments-systems_disabled"))) : removeClass(this.paymentSystemsElement, this.classname("payments-systems_disabled")), val(this.paymentTotalBudgetInput, stripHTML(langNumeric(e, "%s", !0))), this.paymentAmountCurrencyElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub_text", "raw"), !0)
            }, e.prototype.updateTotalBudget = function() {
                var e = this.durationDropdown.val() * this.dailyLimitDropdown.val();
                this.options.totalBudget = e, this.totalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), this.paymentTotalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), val(this.paymentTotalBudgetInput, e), this.updatePaymentAmount()
            }, e.prototype.updateExpectedReach = function() {
                var e = 0;
                if (this.options.expected_reach.limit ? (e = Math.min(100, Math.round(this.options.expected_reach.value / this.options.expected_reach.limit * 100)), this.expectedReachValueElement.innerHTML = langNumeric(this.options.expected_reach.value, getLang("global_X_people", "raw"), !0), this.expectedReachLimitElement.innerHTML = langNumeric(this.options.expected_reach.limit, getLang("ads_edit_easy_promote_expected_reach_possible", "raw"), !0)) : (this.expectedReachValueElement.innerHTML = "&mdash;", this.expectedReachLimitElement.innerHTML = ""), setStyle(this.expectedReachBarValueElement, {
                        width: e + "%"
                    }), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_red"), e < 20), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_green"), e > 80), this.haveTargetingParamsResponse) {
                    var t = this.options.expected_reach.limit <= this.options.audience_limit_min,
                        s = this.options.expected_reach.limit >= this.options.audience_limit_max;
                    this.expectedReachHintElement.innerHTML = s ? getLang("ads_edit_easy_promote_audience_too_large") : t ? getLang("ads_edit_easy_promote_audience_too_small") : getLang("ads_edit_easy_promote_expected_reach_hint"), toggleClass(this.expectedReachHintElement, this.classname("expected-reach-hint_warning"), s || t), this.updateContinueButton()
                }
            }, e.prototype.updateContinueButton = function() {
                var e = this.options.expected_reach.limit <= this.options.audience_limit_min,
                    t = this.options.expected_reach.limit >= this.options.audience_limit_max,
                    s = this.acceptTermsCheckbox.val();
                disableButton(this.continueButton, (t || e) && this.currentScreen === this.settingsScreenElement || !s)
            }, e.prototype.updateAgeSelectors = function() {
                var e = intval(this.ageFromDropdown.val()),
                    t = intval(this.ageToDropdown.val());
                this.ageFromDropdown.setData(this.getAgeSelectorData(this.options.ages.min, t || this.options.ages.max, getLang("ads_age_from"))), this.ageToDropdown.setData(this.getAgeSelectorData(e || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")))
            }, e.prototype.updateTargetParams = function(e, t) {
                var s = this;
                if (this.updateTargetParamsOptions = this.updateTargetParamsOptions || {}, t && (this.updateTargetParamsOptions = extend({}, this.updateTargetParamsOptions, t)), this.settingsScreenInitialized) {
                    if (!e) {
                        return this.updateTargetParamsTimer && clearTimeout(this.updateTargetParamsTimer), void(this.updateTargetParamsTimer = setTimeout(this.updateTargetParams.bind(this, !0, this.updateTargetParamsOptions), 500))
                    }
                    var n = this.getUpdateTargetParams(this.updateTargetParamsOptions);
                    this.updateTargetParamsOptions = {}, this.updateTargetLastRequestID = n.request_id, ajax.post("/adsedit?act=get_target_params", n, {
                        onDone: this.onUpdateTargetParamsDone.bind(this),
                        onFail: this.onUpdateTargetParamsFailed.bind(this),
                        showProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(function() {
                            s.updateTargetCounter || (showProgress(s.updateTargetParamsProgressElement), lockButton(s.continueButton)), s.updateTargetCounter++
                        }),
                        hideProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(function() {
                            s.updateTargetCounter--, s.updateTargetCounter || (hideProgress(s.updateTargetParamsProgressElement), unlockButton(s.continueButton))
                        })
                    })
                }
            }, e.prototype.getUpdateTargetParams = function(e) {
                e = e || {};
                var t = "",
                    s = this.getCriteriaPreset(this.audienceDropdown.val()),
                    n = a(s, 1)[0];
                this.geoEditor.inited ? t = this.geoEditor.savePointsToString() : n && (t = n.geo_near);
                var i = {
                    geo_type: Radiobutton.val("ads_targeting_criterion_geo_type"),
                    geo_mask: this.options.geo.mask,
                    country: this.geoCountryDropdown.val(),
                    cities: this.geoRegionDropdown.val(),
                    sex: Radiobutton.val("ads_targeting_criterion_sex"),
                    age_from: this.ageFromDropdown.val(),
                    age_to: this.ageToDropdown.val(),
                    interest_categories: this.interestsDropdown.val(),
                    groups: this.groupsDropdown.val(),
                    geo_near: t,
                    planner_duration: this.durationDropdown.val(),
                    planner_daily_budget: this.dailyLimitDropdown.val()
                };
                if (1 == i.geo_type ? (i.country = "", i.cities = "") : 0 == i.geo_type && (i.geo_near = "", i.geo_mask = ""), 0 == i.retargeting_groups && (i.retargeting_groups = ""), i.country && e.need_cities_data && (i.need_cities_data = 1), this.options.suggested_criteria || (i.need_suggested_criteria = 1), this.options.category_selected) i.category1_id = this.options.category_selected;
                else if (this.options.category_suggestions) {
                    var o = this.options.category_suggestions[0];
                    o && (i.category1_id = o[1] ? o[1] : o[0])
                } else i.need_link_post = 1;
                return i.request_id = +new Date, extend({}, this.options.target_params, i)
            }, e.prototype.setCriteriaData = function(e) {
                "groups" in e && e.groups && this.groupsDropdown.setOptions({
                    defaultItems: e.groups
                }), "cities" in e && e.cities && this.geoRegionDropdown.setOptions({
                    defaultItems: e.cities
                })
            }, e.prototype.setTargetingParams = function(e) {
                var t = this;
                this.ageFromDropdown.selectItem(0), this.ageToDropdown.selectItem(0), e.age_from && this.ageFromDropdown.selectItem(e.age_from), e.age_to && this.ageToDropdown.selectItem(e.age_to), Radiobutton.select("ads_targeting_criterion_sex", e.sex ? e.sex : 0), this.groupsDropdown.clear(), e.groups && (e.groups.split(",").map(function(e) {
                    e && t.groupsDropdown.selectItem(e)
                }), this.showGroupsDropdown()), this.geoRegionDropdown.clear(), e.cities && (e.cities.split(",").map(function(e) {
                    e && t.geoRegionDropdown.selectItem(e)
                }), this.updateGeoRegionDropdown()), this.geoCountryDropdown.selectItem(e.country ? e.country : 0), this.interestsDropdown.clear(), e.interest_categories && (e.interest_categories.split(",").map(function(e) {
                    e && t.interestsDropdown.selectItem(e)
                }), this.showInterestsDropdown()), e.geo_near ? (this.geoEditor && this.geoEditor.inited && this.geoEditor.setPointsFromString(e.geo_near), Radiobutton.select("ads_targeting_criterion_geo_type", 1)) : Radiobutton.select("ads_targeting_criterion_geo_type", 0), this.updateTargetParams()
            }, e.prototype.showGroupsDropdown = function() {
                return hide(this.groupShowerLink), show(this.groupsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupsDropdown.updateInput(), !1
            }, e.prototype.showInterestsDropdown = function() {
                return hide(this.interestsShowerLink), show(this.interestsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsDropdown.updateInput(), !1
            }, e.prototype.editCriteriaPreset = function(e, t, s, n) {
                var i = this;
                if (!(e = intval(e) || this.options.selected_union_id)) return !1;
                var a = this.getUpdateTargetParams();
                if (!t && !n) {
                    var o = e + "_" + -a.request_id;
                    this.options.audiences[o] = [o, clean(s), getLang("ads_edit_easy_promote_audience_saving")], this.audienceDropdown.setOptions({
                        defaultItems: Object.values(this.options.audiences)
                    }), this.audienceDropdown.selectItem(o)
                }
                ajax.post("/adsedit?act=a_edit_criteria_preset", extend({}, a, {
                    client_id: e,
                    criteria_preset_id: t,
                    criteria_preset_title: s,
                    hash: this.options.save_audience_hash,
                    do_delete: intval(n),
                    source: "easy_promote"
                }), {
                    onDone: function(s) {
                        if ("criteria_preset_id" in s)
                            if (t || n) {
                                if (t && !n) {
                                    var o = e + "_" + t;
                                    "description" in s && (i.options.audiences[o][2] = s.description), i.audienceDropdown.setOptions({
                                        defaultItems: Object.values(i.options.audiences)
                                    })
                                }
                            } else {
                                var r = e + "_" + -a.request_id,
                                    c = e + "_" + s.criteria_preset_id;
                                i.options.audiences[c] = i.options.audiences[r], i.options.audiences[c][0] = c, "description" in s && (i.options.audiences[c][2] = s.description), delete i.options.audiences[r], i.audienceDropdown.setOptions({
                                    defaultItems: Object.values(i.options.audiences)
                                }), i.audienceDropdown.selectItem(c)
                            }
                        if (n) {
                            var d = e + "_" + t;
                            delete i.options.audiences[d], i.audienceDropdown.setOptions({
                                defaultItems: Object.values(i.options.audiences)
                            }), i.audienceDropdown.selectItem(0)
                        }
                    },
                    onFail: function() {},
                    showProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        hide(i.audienceMenuDotsElement), show(i.audienceProgressElement), showProgress(i.audienceProgressElement)
                    }),
                    hideProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        show(i.audienceMenuDotsElement), hideProgress(i.audienceProgressElement), hide(show(i.audienceProgressElement))
                    })
                })
            }, e.prototype.createAd = function(e) {
                var t = this.getUpdateTargetParams(),
                    s = extend({}, t, this.options.save_params, {
                        client_id: this.options.selected_union_id,
                        day_limit: this.dailyLimitDropdown.val(),
                        duration: this.durationDropdown.val(),
                        all_limit: this.options.totalBudget,
                        criteria_preset_id: this.audienceDropdown.val(),
                        planner_reach: this.options.expected_reach.value,
                        total_reach: this.options.expected_reach.limit,
                        suggested_criteria: this.isSuggestedCriteria(t) ? 1 : 0
                    });
                ajax.post("/adsedit?act=save_ad", s, {
                    onDone: this.onCreateAdDone.bind(this, !0),
                    onFail: this.onCreateAdDone.bind(this, !1),
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            }, e.prototype.enableAd = function() {
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_enabling_ad"), "", "wait"), this.hidePaymentResultScreenButton(), this.goToScreen(this.paymentResultScreenElement);
                var e = {
                    enable: 1,
                    hash: this.options.enable_ad_hash,
                    union_id: this.options.created_ad_id
                };
                ajax.post("/ads?act=a_union_change_status", e, {
                    onDone: this.onEnableAdDone.bind(this, !0),
                    onFail: this.onEnableAdDone.bind(this, !1)
                })
            }, e.prototype.waitForPaymentResult = function(e) {
                var t = e.paymentPopup,
                    s = e.ajaxParams,
                    n = !1,
                    i = !1;
                t && t.closed && (n = !0, e.paymentPopupClosedTime || (e.paymentPopupClosedTime = +new Date), i = +new Date - e.paymentPopupClosedTime > 1e4);
                if (!n || i || e.paymentWaiting || (this.onPaymentWaiting(), e.paymentWaiting = !0), cur.isPaymentComplete) return this.onPaymentCheckDone(!0, e, cur.paymentCompleteParams), void delete cur.isPaymentComplete;
                if (cur.isPaymentCanceled || i) return this.onPaymentCheckDone(!1, e, void 0, void 0, getLang("ads_edit_easy_promote_payment_cancelled")), void delete cur.isPaymentCanceled;
                if (cur.isPaymentFailed) return this.onPaymentCheckDone(!1, e), void delete cur.isPaymentFailed;
                if (cur.isPaymentProcess) {
                    var a = extend({}, s, {
                        act: "a_getvotes_check"
                    });
                    ajax.post("al_payments.php", a, {
                        onDone: this.onPaymentCheckDone.bind(this, !0, e),
                        onFail: this.onPaymentCheckDone.bind(this, !1, e)
                    })
                }
            }, e.prototype.doTransactionalPayment = function(t, s) {
                var n = this,
                    i = void 0;
                if (s && s.provider) {
                    i = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1");
                    var a = getLang("payment_redirect").replace("%s", cur.ps_list[t].title);
                    cur._popup_text = cur.paymentsPopupHtml(a, "", ""), cur.paymentsPopupWrite(i)
                }
                var o = {
                    act: "a_getvotes_charge",
                    type: t,
                    payment_account_id: this.options.payment_union_id,
                    hash: this.options.payment_hash,
                    account_hash: this.options.payment_ads_hash,
                    amount: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                    source: "ads_easy_promote"
                };
                ajax.post("al_payments.php", o, {
                    onDone: function(a, o) {
                        if ("mailmoney_vkpay" == t) return n.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), n.goToScreen(n.paymentResultScreenElement), n.box._hide(!1, !0), showWiki({
                            w: a
                        }, !1, !1, {
                            noLocChange: 1,
                            skipBoxesHide: 1,
                            noClickHide: 1
                        }), cur.promoteBox = n.box, cur.onExternalAppDone = function(e) {
                            e.status || (cur.isPaymentCanceled = !0), cur.promoteBox._show(), cur.promoteBox = null, cur.onExternalAppDone = null, window.WkView && WkView.hide(!1, !0)
                        }, void n.waitForPaymentResult({
                            ajaxParams: {
                                source: "ads",
                                ads_union_id: n.options.payment_union_id,
                                type: t,
                                hash: s.check_hash
                            },
                            paymentSystemData: s
                        });
                        o ? (n.setPaymentIFrameHtml(o), n.nextScreen(), window.addEventListener("message", e.frameMessage, !1)) : (n.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), n.goToScreen(n.paymentResultScreenElement));
                        var r = {
                            ajaxParams: extend({}, a, {
                                type: t
                            }),
                            paymentSystemData: s
                        };
                        i && (r.paymentPopup = i), n.waitForPaymentResult(r)
                    },
                    onFail: function(e) {
                        return domFC(n.paymentErrorElement).innerHTML = e, show(n.paymentErrorElement), !0
                    },
                    showProgress: addClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled")),
                    hideProgress: removeClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled"))
                })
            }, e.prototype.doNontransactionalPayment = function(e, t) {
                if (window.cur && cur.ps_list && cur.ps_list[e] && cur.submitPaymentSystemsForm) {
                    var s = ce("input", {
                            value: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                            id: "amount_" + e,
                            type: "hidden"
                        }),
                        n = ce("div", {
                            className: "_ps_wrap"
                        }, {
                            display: "none"
                        });
                    n.appendChild(s), this.boxBodyNode.appendChild(n), this.paymentSystemsFormElement.innerHTML = "", cur.isAdsPayment = !0, cur.paymentAccountId = this.options.payment_union_id;
                    var a = cur.submitPaymentSystemsForm(e, t.request_without_fee ? 0 : t.fee, !0);
                    Object(i.d)("payments", "", "ads", e, "start"), this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.waitForPaymentResult({
                        ajaxParams: {
                            source: "ads",
                            ads_union_id: this.options.payment_union_id,
                            type: e,
                            hash: t.check_hash
                        },
                        paymentPopup: a
                    }), re(s), re(n)
                }
            }, e.prototype.setPaymentResultScreen = function(e, t, s) {
                var n = this;
                this.paymentResultTitleElement.innerHTML = e, this.paymentResultSubtitleElement.innerHTML = t;
                var i = geByClass1(this.classname("payment-result-icon_visible"), this.paymentResultElement),
                    a = geByClass1(this.classname("payment-result-icon_hidden"), this.paymentResultElement);
                if (!hasClass(i, this.classname("payment-result-icon_") + s)) {
                    ["success", "error", "wait"].map(function(e) {
                        removeClass(a, n.classname("payment-result-icon_") + e)
                    }), addClass(a, this.classname("payment-result-icon_") + s), removeClass(a, this.classname("payment-result-icon_hidden")), addClass(a, this.classname("payment-result-icon_visible")), addClass(i, this.classname("payment-result-icon_hidden")), removeClass(i, this.classname("payment-result-icon_visible")), toggleClass(this.paymentResultIconContainerElement, this.classname("payment-result-icon-container_animated"), "wait" === s)
                }
                this.hidePaymentResultScreenButton()
            }, e.prototype.setPaymentResultScreenButton = function(e, t) {
                e || t ? (this.paymentResultButtonElement.innerHTML = e, this.paymentResultButtonElement.href = t, show(this.paymentResultButtonContainerElement)) : hide(this.paymentResultButtonContainerElement)
            }, e.prototype.hidePaymentResultScreenButton = function() {
                this.setPaymentResultScreenButton()
            }, e.frameMessage = function(t) {
                if (!t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?paymentgate\.ru$/) && !t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) return !1;
                var s = {};
                t.data && "{" === t.data.substr(0, 1) && "billing" !== (s = Object(n.l)(t.data)).type || ("submit" === t.data || "3dsPage" === s.action ? setTimeout(e.setCardFrameHeight.pbind(600), 200) : "3dsFinish" === s.action ? e.setCardFrameHeight() : "resizeFrame" === s.action && setTimeout(e.setCardFrameHeight.pbind(s.action_params.height), 200))
            }, e.prototype.setPaymentIFrameHtml = function(e) {
                var t = ce("iframe", {
                    id: "card_iframe",
                    name: "card_iframe"
                }, {
                    border: 0,
                    width: "100%",
                    height: "404px",
                    overflowX: "hidden",
                    overflowY: "hidden"
                });
                t.frameBorder = 0, this.cardPaymentIframeContainerElement.innerHTML = "", this.cardPaymentIframeContainerElement.appendChild(t), t.contentWindow.document.open("text/html", "replace"), t.contentWindow.document.write(e), t.contentWindow.document.close()
            }, e.setCardFrameHeight = function(e) {
                var t = ge("card_iframe");
                e ? (e = Math.max(e, 250) + 15, cur.prevFrameHeight = t.style.height, t.style.height = e + "px") : t.style.height = cur.prevFrameHeight
            }, e.prototype.initSettingsScreen = function() {
                var e = this,
                    t = void 0,
                    s = void 0;
                t = geByClass1(this.classname("input-duration"), this.settingsScreenElement), s = [], this.options.days.map(function(e) {
                    return s.push([e, langNumeric(e, getLang("ads_edit_easy_promote_settings_duration", "raw"), !0)])
                }), this.durationDropdown = new Dropdown(t, s, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.duration_selected,
                    big: !0,
                    onChange: function() {
                        e.updateTotalBudget(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-daily-limit"), this.settingsScreenElement), s = [], this.options.daily_limits.map(function(e) {
                    return s.push([e, langNumeric(e, getLang("global_money_amount_rub", "raw"), !0)])
                }), this.dailyLimitDropdown = new Dropdown(t, s, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.daily_limit_selected,
                    big: !0,
                    onChange: function() {
                        e.updateTotalBudget(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-audience"), this.settingsScreenElement), this.audienceDropdown = new Dropdown(t, Object.values(this.options.audiences), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    introText: getLang("ads_edit_easy_promote_select_audience"),
                    placeholder: getLang("ads_edit_easy_promote_select_audience"),
                    selectedItem: this.options.audience_selected,
                    onChange: this.onCriteriaPresetChanged.bind(this)
                }), t = geByClass1(this.classname("link-edit-audience"), this.settingsScreenElement), addEvent(t, "click", this.editAudience.bind(this)), t = geByClass1(this.classname("link-edit-audience-save"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !0)), t = geByClass1(this.classname("link-edit-audience-cancel"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !1));
                var n = {
                    0: getLang("ads_geo_type_regions"),
                    1: getLang("ads_geo_type_points")
                };
                geByClass(this.classname("geo-type-checkbox"), this.settingsScreenElement).map(function(t) {
                    var s = t.getAttribute("value"),
                        i = n[s];
                    new Radiobutton(t, {
                        width: e.getTextWidth(i) + 25,
                        label: i,
                        onSelect: function(t) {
                            toggle(e.geoContainerRegionsElement, 0 == t), toggle(e.geoContainerPointsElement, 1 == t), e.geoEditor && !e.geoEditor.inited && 1 == t && e.geoEditorInitBound(), e.updateTargetParams()
                        }
                    })
                }), Radiobutton.select("ads_targeting_criterion_geo_type", this.options.geo_type_selected), t = geByClass1(this.classname("input-geo-country"), this.settingsScreenElement), this.geoCountryDropdown = new Dropdown(t, this.options.countries, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    selectedItem: this.options.country_selected,
                    onChange: function(t) {
                        e.updateGeoRegionDropdown(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-geo-region"), this.settingsScreenElement), this.geoRegionDropdown = new Autocomplete(t, this.getGeoRegionURL(), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_starttypingname_city_region"),
                    placeholder: getLang("ads_starttypingname_city_region"),
                    disabledText: getLang("ads_first_select_country"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: function() {
                        e.updateGeoRegionDropdown(), e.updateTargetParams()
                    }
                }), this.updateGeoRegionDropdown();
                var i = {
                    0: getLang("search_adv_any_sex"),
                    1: getLang("Sex_fm"),
                    2: getLang("Sex_m")
                };
                geByClass(this.classname("sex-checkbox"), this.settingsScreenElement).map(function(t) {
                    var s = i[t.getAttribute("value")];
                    new Radiobutton(t, {
                        width: e.getTextWidth(s) + 25,
                        label: s,
                        onSelect: e.updateTargetParams.bind(e, !1)
                    })
                }), Radiobutton.select("ads_targeting_criterion_sex", this.options.sex_selected), t = geByClass1(this.classname("input-age-from"), this.settingsScreenElement), this.ageFromDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.min, this.options.ages.to_selected || this.options.ages.max, getLang("ads_age_from")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.from_selected,
                    onChange: function() {
                        e.updateAgeSelectors(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-age-to"), this.settingsScreenElement), this.ageToDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.from_selected || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.to_selected,
                    onChange: function() {
                        e.updateAgeSelectors(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-interests"), this.settingsScreenElement), this.interestsDropdown = new Autocomplete(t, this.options.interests, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_select_interest_category"),
                    placeholder: getLang("ads_select_interest_category"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: this.updateTargetParams.bind(this, !1)
                }), hide(this.interestsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsShowerLink = geByClass1(this.classname("input-interests-show"), this.settingsScreenElement), show(this.interestsShowerLink), addEvent(this.interestsShowerLink, "click", this.showInterestsDropdown.bind(this)), t = geByClass1(this.classname("input-groups"), this.settingsScreenElement), this.groupsDropdown = new Autocomplete(t, "/adsedit?act=search_user_objects&section=groups&group_purpose=criteria", {
                    width: 320,
                    big: !0,
                    withIcons: !0,
                    introText: getLang("ads_type_community"),
                    placeholder: getLang("ads_type_community"),
                    autocomplete: !0,
                    maxItems: 100,
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: this.updateTargetParams.bind(this, !1)
                }), this.groupsDropdown.setOptions({
                    defaultItems: this.options.groups_default
                }), hide(this.groupsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupShowerLink = geByClass1(this.classname("input-groups-show"), this.settingsScreenElement), show(this.groupShowerLink), addEvent(this.groupShowerLink, "click", this.showGroupsDropdown.bind(this)), this.geoEditor = new AdsGeoEditor;
                var a = {
                        defaultRadius: this.options.geo.default_radius,
                        expandMapButton: !1,
                        allowedRadiuses: this.options.geo.allowed_radiuses,
                        locale: this.options.geo.locale,
                        defaultMask: this.options.geo.mask,
                        defaultMapCenter: {
                            lat: this.options.geo.default_center[0],
                            lon: this.options.geo.default_center[1]
                        }
                    },
                    o = {
                        onPointAdded: this.onGeoEditorPointAdded.bind(this),
                        onPointRemoved: this.onGeoEditorPointRemoved.bind(this),
                        onPointUpdated: this.onGeoEditorPointUpdated.bind(this),
                        onLoaded: this.onGeoEditorLoaded.bind(this)
                    },
                    r = geByClass1(this.classname("geo-map"), this.settingsScreenElement);
                this.geoEditorInitBound = this.geoEditor.init.bind(this.geoEditor, r, a, o), t = geByClass1(this.classname("input-geo-places"), this.settingsScreenElement), this.geoPlacesList = new Autocomplete(t, "", {
                    width: 320,
                    big: !0,
                    withIcons: !1,
                    introText: getLang("ads_edit_ad_geo_map_address_placeholder"),
                    placeholder: getLang("ads_edit_ad_geo_map_address_placeholder"),
                    nativePlaceholder: !0,
                    hidePlaceholderOnSelected: !1,
                    dropdown: !1,
                    listStyle: !0,
                    limitedListHeight: !0,
                    selectable: !1,
                    autocomplete: !0,
                    maxItems: 100,
                    selectedItemsDelimiter: ";",
                    onTagAdd: this.onGeoInputPointAdded.bind(this),
                    onTagRemove: this.onGeoInputPointRemoved.bind(this)
                }), this.updateGeoPlacesList(), this.geoPlacesList.updateInput(), addEvent(this.audienceSettingsElement, "click", function(t) {
                    if (hasClass(t.target, "ui_actions_menu_item")) {
                        var s = t.target.getAttribute("data-radius"),
                            n = gpeByClass("token", data(gpeByClass("ui_actions_menu_dummy_wrap", t.target), "origMenu"));
                        e.geoEditor.setPointRadius(n.getAttribute("data-id"), s), e.geoEditor.updateMap(n.getAttribute("data-id"))
                    }
                }), this.updateTotalBudget(), this.updateExpectedReach(), addEvent(this.settingsScreenElement, "scroll", requestAnimationFrame.pbind(this.updateSettingsScreenFixedRow.bind(this))), this.updateSettingsScreenFixedRow(), Object.keys(this.options.user_offices).length > 0 ? (addEvent(this.audienceMenuDotsElement, "click", this.onAudienceMenuItemClicked.bind(this)), addEvent(this.audienceNameInput, "keydown", function(t) {
                    if (t.which == KEY.ENTER) return e.editAudienceName(!0), !1
                })) : hide(this.audienceMenuDotsElement), this.settingsScreenInitialized = !0, this.onCriteriaPresetChanged(this.audienceDropdown.val()), this.updateTargetParams()
            }, e.prototype.initMoreSettingsScreen = function() {
                var e = this,
                    t = void 0;
                if (Object.keys(this.options.user_offices).length > 1) {
                    t = geByClass1(this.classname("input-union-id"), this.moreSettingsScreenElement);
                    var s = [];
                    Object.keys(this.options.user_offices).map(function(t) {
                        var n = e.options.user_offices[t],
                            i = [t, stripHTML(n.name), 0, 0];
                        "budget_result" in n && (i[2] = langNumeric(intval(n.budget_result), getLang("global_money_amount_rub", "raw"), !0)), n.child_offices ? (i[3] = "label", i[5] = "1", s.push(i), n.child_offices.map(function(e) {
                            s.push([e.union_id, stripHTML(e.name)])
                        })) : s.push(i)
                    }), this.moreSettingsOfficeDropdown = new Dropdown(t, s, {
                        width: 320,
                        big: !0,
                        autocomplete: !0,
                        introText: getLang("ads_select_office"),
                        placeholder: getLang("ads_select_office"),
                        includeLabelsOnMatch: !0,
                        preventDuplicates: !0,
                        selectedItem: this.options.selected_union_id,
                        onChange: function(t) {
                            "" !== t ? e.options.selected_union_id = t : e.moreSettingsOfficeDropdown.selectItem(e.options.selected_union_id || e.options.selected_union_id)
                        }
                    })
                }
                t = geByClass1(this.classname("input-category-id"), this.moreSettingsScreenElement), this.moreSettingsCategoryDropdown = new Dropdown(t, this.options.categories, {
                    introText: getLang("ads_select_category"),
                    placeholder: getLang("ads_select_category"),
                    big: !0,
                    autocomplete: !0,
                    indexkeys: [1, 4],
                    includeLabelsOnMatch: !0,
                    preventDuplicates: !0,
                    width: 320,
                    onChange: function(t) {
                        e.options.category_selected = t
                    }
                })
            }, e.prototype.updateMoreSettingsScreen = function(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    s = t.categoryRequired,
                    n = t.officeRequired;
                toggle(this.moreSettingsCategoryIdRowElement, s), toggle(this.moreSettingsOfficeSwitcherRowElement, n), this.moreSettingsSubtitleElement.innerHTML = "", this.moreSettingsOfficeLabelElement.innerHTML = "", this.moreSettingsCategoryLabelElement.innerHTML = "", s && n ? (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_more_settings_subtitle"), this.moreSettingsOfficeLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_office_short"), this.moreSettingsCategoryLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_category_short")) : s ? this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_category") : n && (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_office"))
            }, e.prototype.moreSettingsRequiredComponents = function(e) {
                var t = this.getUpdateTargetParams();
                return {
                    categoryRequired: !t.category1_id && !t.category2_id,
                    officeRequired: Object.keys(this.options.user_offices).length > 1 && e
                }
            }, e.prototype.moreSettingsRequired = function(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    s = t.categoryRequired;
                return t.officeRequired || s
            }, e.prototype.editAudience = function() {
                return addClass(this.imageElement, this.classname("image_animated")), setTimeout(addClass.pbind(this.imageElement, this.classname("image_hidden")), 700), setTimeout(addClass.pbind(this.settingsScreenElement, this.classname("screen_settings-tall")), 700), hide(this.editAudienceLinkWrapperElement), show(this.audienceSettingsElement), show(this.budgetTitleRowElement), this.updateSettingsScreenFixedRow(), this.geoEditor.inited || 1 != Radiobutton.val("ads_targeting_criterion_geo_type") || this.geoEditorInitBound(), this.editingAudience = !0, !1
            }, e.prototype.editAudienceName = function(e) {
                var t = val(this.audienceNameInput).trim();
                if (e && !t) return notaBene(this.audienceNameInput), elfocus(this.audienceNameInput), !1;
                if (hide(this.audienceNameInput), show(this.audienceDropdown.container), show(this.audienceMenuDotsElement), hide(this.editAudienceNameLinksWrapperElement), this.editingAudience || show(this.editAudienceLinkWrapperElement), e) {
                    var s = this.audienceDropdown.val().split("_"),
                        n = a(s, 2),
                        i = n[0];
                    n[1];
                    this.editCriteriaPreset(i, 0, t, 0)
                }
                return this.isEditingAudienceName = !1, !1
            }, e.prototype.isSuggestedCriteria = function(e) {
                if (!this.options.suggested_criteria) return !1;
                for (var t = ["sex", "age_from", "age_to", "cities", "country", "interest_categories", "geo_near", "groups"], s = 0; s < t.length; s++) {
                    var n = t[s],
                        i = this.options.suggested_criteria[n];
                    if (i || (i = !1), i != e[n]) return !1
                }
                return !0
            }, e
        }();
        try {
            stManager.done(jsc("web/ads_edit_easy.js"))
        } catch (e) {}
    }
});