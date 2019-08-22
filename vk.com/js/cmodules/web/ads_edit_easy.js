! function(e) {
    function t(t) {
        for (var i, o, r = t[0], d = t[1], l = t[2], c = 0, m = []; c < r.length; c++) o = r[c], n[o] && m.push(n[o][0]), n[o] = 0;
        for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (e[i] = d[i]);
        for (h && h(t); m.length;) m.shift()();
        return a.push.apply(a, l || []), s()
    }

    function s() {
        for (var e, t = 0; t < a.length; t++) {
            for (var s = a[t], i = !0, r = 1; r < s.length; r++) {
                var d = s[r];
                0 !== n[d] && (i = !1)
            }
            i && (a.splice(t--, 1), e = o(o.s = s[0]))
        }
        return e
    }
    var i = {},
        n = {
            "web/ads_edit_easy": 0
        },
        a = [];

    function o(t) {
        if (i[t]) return i[t].exports;
        var s = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(s.exports, s, s.exports, o), s.l = !0, s.exports
    }
    o.m = e, o.c = i, o.d = function(e, t, s) {
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
            for (var i in e) o.d(s, i, function(t) {
                return e[t]
            }.bind(null, i));
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
        d = r.push.bind(r);
    r.push = t, r = r.slice();
    for (var l = 0; l < r.length; l++) t(r[l]);
    var h = d;
    a.push([60, "bundles/common"]), s()
}({
    60: function(e, t, s) {
        e.exports = s("x625")
    },
    hhXQ: function(e, t, s) {
        var i = s("XKFU"),
            n = s("UExd")(!1);
        i(i.S, "Object", {
            values: function(e) {
                return n(e)
            }
        })
    },
    x625: function(e, t, s) {
        "use strict";
        s.r(t);
        s("rE2o"), s("ioFf"), s("91GP"), s("SRfc"), s("hhXQ"), s("a1Th"), s("0mN4"), s("rGqo"), s("Btvt"), s("pIFo"), s("KKXr");
        var i = s("aong"),
            n = s("XzvV");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    n = !1,
                    a = void 0;
                try {
                    for (var o, r = e[Symbol.iterator](); !(i = (o = r.next()).done) && (s.push(o.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    n = !0, a = e
                } finally {
                    try {
                        i || null == r.return || r.return()
                    } finally {
                        if (n) throw a
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        window.AdsEditEasyPromote = class e {
            classname(e) {
                return "ads_edit_easy_promote_box__" + e
            }
            constructor(e, t) {
                if (this.onGeoEditorLoaded = function() {
                        var e = this.getCriteriaPreset(this.audienceDropdown.val())[0];
                        e.geo_near && this.geoEditor.setPointsFromString(e.geo_near), this.geoEditor.updateMap()
                    }, e && t) {
                    this.box = e, this.boxBodyNode = e.bodyNode, this.boxControlsTextNode = e.controlsTextNode, this.imageElement = geByClass1(this.classname("image"), this.boxBodyNode), this.screensContainerElement = geByClass1(this.classname("screens-container"), this.boxBodyNode), this.headerElement = geByClass1(this.classname("header"), this.boxBodyNode), this.acceptTermsCheckboxInput = geByClass1(this.classname("accept-terms"), this.boxControlsTextNode), this.imageLayer1Element = geByClass1(this.classname("image-layer_1"), this.imageElement), this.imageLayer2Element = geByClass1(this.classname("image-layer_2"), this.imageElement), this.screensWrapperElement = geByClass1(this.classname("screens-wrapper"), this.screensContainerElement), this.introScreenElement = geByClass1(this.classname("screen_intro"), this.screensWrapperElement), this.settingsScreenElement = geByClass1(this.classname("screen_settings"), this.screensWrapperElement), this.paymentScreenElement = geByClass1(this.classname("screen_payment"), this.screensWrapperElement), this.cardPaymentScreenElement = geByClass1(this.classname("screen_card-payment"), this.screensWrapperElement), this.paymentResultScreenElement = geByClass1(this.classname("screen_payment-result"), this.screensWrapperElement), this.moreSettingsScreenElement = geByClass1(this.classname("screen_more-settings"), this.screensWrapperElement), this.settingsScreenElement && (this.totalBudgetElement = geByClass1(this.classname("row-content_total-budget"), this.settingsScreenElement), this.expectedReachValueElement = geByClass1(this.classname("expected-reach-value"), this.settingsScreenElement), this.expectedReachLimitElement = geByClass1(this.classname("expected-reach-limit"), this.settingsScreenElement), this.expectedReachBarValueElement = geByClass1(this.classname("expected-reach-bar-value"), this.settingsScreenElement), this.expectedReachHintElement = geByClass1(this.classname("expected-reach-hint"), this.settingsScreenElement), this.audienceSettingsElement = geByClass1(this.classname("audience-settings"), this.settingsScreenElement), this.editAudienceLinkWrapperElement = geByClass1(this.classname("edit-audience-link"), this.settingsScreenElement), this.editAudienceNameLinksWrapperElement = geByClass1(this.classname("edit-audience-name-links"), this.settingsScreenElement), this.budgetTitleRowElement = geByClass1(this.classname("row_budget-title"), this.settingsScreenElement), this.geoContainerPointsElement = geByClass1(this.classname("geo-container_points"), this.settingsScreenElement), this.geoContainerRegionsElement = geByClass1(this.classname("geo-container_regions"), this.settingsScreenElement), this.expectedReachRowElement = geByClass1(this.classname("row_expected-reach"), this.settingsScreenElement), this.updateTargetParamsProgressElement = geByClass1(this.classname("update-progress"), this.settingsScreenElement), this.audienceMenuDotsElement = geByClass1(this.classname("audience-menu-dots"), this.settingsScreenElement), this.audienceMenuSaveElement = geByClass1(this.classname("audience-menu-item_save"), this.audienceMenuDotsElement), this.audienceMenuSaveNewElement = geByClass1(this.classname("audience-menu-item_save_new"), this.audienceMenuDotsElement), this.audienceMenuDeleteElement = geByClass1(this.classname("audience-menu-item_delete"), this.audienceMenuDotsElement), this.audienceProgressElement = geByClass1(this.classname("audience-menu-progress"), this.settingsScreenElement), this.audienceNameInput = geByClass1(this.classname("audience-name-input"), this.settingsScreenElement), this.settingsErrorElement = geByClass1(this.classname("settings-error"), this.settingsScreenElement)), this.paymentScreenElement && (this.paymentTotalBudgetElement = geByClass1(this.classname("payments-total-budget"), this.paymentScreenElement), this.paymentUnionBudgetElement = geByClass1(this.classname("payments-union-budget"), this.paymentScreenElement), this.paymentTotalBudgetInput = geByClass1(this.classname("payments-input-amount"), this.paymentScreenElement), this.paymentAmountCurrencyElement = geByClass1(this.classname("payments-amount-currency"), this.paymentScreenElement), this.paymentSystemsElement = geByClass1(this.classname("payments-systems"), this.paymentScreenElement), this.paymentContinueElement = geByClass1(this.classname("payments-continue"), this.paymentScreenElement), this.paymentErrorElement = geByClass1(this.classname("payments-error"), this.paymentScreenElement), this.paymentIntroElement = geByClass1(this.classname("payments-intro"), this.paymentScreenElement)), this.cardPaymentScreenElement && (this.cardPaymentIframeContainerElement = geByClass1(this.classname("card-payment-iframe-container"), this.cardPaymentScreenElement), this.paymentSystemsFormElement = geByClass1(this.classname("card-payment-form"), this.cardPaymentScreenElement)), this.paymentResultScreenElement && (this.paymentResultElement = geByClass1(this.classname("payment-result"), this.paymentResultScreenElement), this.paymentResultTitleElement = geByClass1(this.classname("payment-result-title"), this.paymentResultScreenElement), this.paymentResultSubtitleElement = geByClass1(this.classname("payment-result-subtitle"), this.paymentResultScreenElement), this.paymentResultIconContainerElement = geByClass1(this.classname("payment-result-icon-container"), this.paymentResultScreenElement), this.paymentResultButtonContainerElement = geByClass1(this.classname("payment-result-button-container"), this.paymentResultScreenElement), this.paymentResultButtonElement = geByClass1(this.classname("payment-result-button"), this.paymentResultScreenElement)), this.moreSettingsScreenElement && (this.moreSettingsOfficeSwitcherRowElement = geByClass1(this.classname("row_office-switcher"), this.moreSettingsScreenElement), this.moreSettingsCategoryIdRowElement = geByClass1(this.classname("row_category-id"), this.moreSettingsScreenElement), this.moreSettingsSubtitleElement = geByClass1(this.classname("more-settings-subtitle"), this.moreSettingsScreenElement), this.moreSettingsOfficeLabelElement = geByClass1(this.classname("more-settings-office-label"), this.moreSettingsScreenElement), this.moreSettingsCategoryLabelElement = geByClass1(this.classname("more-settings-category-label"), this.moreSettingsScreenElement));
                    var s = this.box.getOptions();
                    s && s.lang && (cur.lang = extend(cur.lang || {}, s.lang)), e.setOptions({
                        onDestroy: () => {
                            Radiobutton.destroy("ads_targeting_criterion_geo_type"), Radiobutton.destroy("ads_targeting_criterion_sex"), cur.isPaymentProcess = !1
                        }
                    }), this.options = t, this.currentScreen = this.introScreenElement, this.options.already_promoted_ad_id ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_already_promoted_title"), getLang("ads_edit_easy_promote_already_promoted_description"), "success"), this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "https://vk.com/ads?act=office&union_id=" + this.options.already_promoted_ad_id), this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    }), this.currentScreen = this.paymentResultScreenElement) : this.options.union_payment ? (this.currentScreen = this.paymentScreenElement, this.box.changed = !0, this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    })) : this.options.no_intro_screen && (this.currentScreen = this.settingsScreenElement, this.box.changed = !0), removeClass(this.currentScreen, "unshown"), removeClass(this.currentScreen, this.classname("screen_hidden")), this.mouseInitialY = !1, this.lastMouseMoveEvent = +new Date, this.editingAudience = !1, this.updateTargetLastRequestID = 0, this.updateTargetCounter = 0, this.box.removeButtons(), this.continueButton = this.box.addButton(getLang("global_continue"), this.onContinueButtonClicked.bind(this), void 0, !0), setTimeout(removeClass.pbind(this.imageElement, this.classname("image_animated")), 200), setTimeout(removeClass.pbind(this.headerElement, this.classname("header_animated")), 3e3);
                    for (var i = 1; i <= 3; ++i) setTimeout(removeClass.pbind(geByClass1(this.classname("intro-block_" + i), this.boxBodyNode), this.classname("intro-block_animated")), 3e3 + 600 * i);
                    if (addEvent(this.paymentTotalBudgetInput, "blur change", this.updatePaymentAmount.bind(this)), addEvent(this.paymentScreenElement, "click", this.onPaymentScreenClicked.bind(this)), addEvent(this.paymentContinueElement, "click", this.onPaymentCompleted.bind(this)), this.paymentCardsTurnedOver = !1, !this.options.union_payment) {
                        this.settingsScreenInitialized = !1, this.initSettingsScreen(), this.initMoreSettingsScreen();
                        var n = langStr(getLang("ads_edit_easy_promote_accept_terms"), "link", '<a href="https://vk.com/ads?act=office_help&terms=1" target="_blank" onclick="event && event.stopPropagation()">', "/link", "</a>");
                        this.acceptTermsCheckbox = new Checkbox(this.acceptTermsCheckboxInput, {
                            checked: !0,
                            inline: !0,
                            width: "auto",
                            containerClass: this.classname("accept-terms-checkbox"),
                            label: n,
                            onChange: () => {
                                this.updateContinueButton()
                            }
                        })
                    }
                    cur.paymentComplete || (cur.paymentComplete = (e, t) => {
                        cur.paymentCompleteParams = t, cur.isPaymentComplete = !0
                    }), cur.paymentCanceled || (cur.paymentCanceled = e => {
                        e ? cur.isPaymentFailed = !0 : cur.isPaymentCanceled = !0
                    }), window.aep = this
                }
            }
            onContinueButtonClicked(e) {
                var t = this.currentScreen == this.settingsScreenElement,
                    s = this.currentScreen == this.moreSettingsScreenElement;
                t ? this.moreSettingsRequired(t) ? (this.updateMoreSettingsScreen(t), this.goToScreen(this.moreSettingsScreenElement, !1, {
                    showBackButton: !0
                })) : this.createAd(e) : s ? this.moreSettingsRequired(t) || this.createAd(e) : this.nextScreen()
            }
            onBoxBodyMouseMoved(e) {
                if (!(+new Date - this.lastMouseMoveEvent < 70)) {
                    this.lastMouseMoveEvent = +new Date, !1 === this.mouseInitialY && (this.mouseInitialY = e.screenY);
                    var t = -(this.mouseInitialY - e.screenY) / 600 * 10;
                    setStyle(this.imageLayer1Element, {
                        transform: "translateY(" + Math.round(t / 2) + "px)"
                    }), setStyle(this.imageLayer2Element, {
                        transform: "translateY(" + Math.round(t / 1) + "px)"
                    })
                }
            }
            onGeoInputPointAdded(e, t) {
                var s = e[0].split(","),
                    i = this.geoEditor.addPoint(s[0], s[1], s[2], s[3], e[1]);
                this.geoEditor.updateMap(i)
            }
            onGeoEditorPointAdded(e) {
                this.geoPlacesList.addTagData([e.id, e.caption, "", 1, "", this.options.geo.radius_selector]), this.geoPlacesList.updateInput();
                var t = this.geoPlacesList.getTokenById(e.id);
                this.updateDropdownTokenRadiusText(t, e.radius), this.updateTargetParams()
            }
            onGeoInputPointRemoved(e, t) {
                this.geoEditor.removePoint(e[0]), this.geoEditor.updateMap()
            }
            onGeoEditorPointRemoved(e) {
                this.geoPlacesList.removeTagData(e), this.updateTargetParams()
            }
            onGeoEditorPointUpdated(e, t, s) {
                var i = this.geoPlacesList.replaceTagID(e, t.id);
                s.caption && this.geoPlacesList.replaceTagText(t.id, t.caption), s.radius && this.updateDropdownTokenRadiusText(i, t.radius), (s.coords || s.radius || s.mask) && this.updateTargetParams()
            }
            onUpdateTargetParamsDone(e) {
                if (!this.updateTargetLastRequestID || !e.request_id || e.request_id == this.updateTargetLastRequestID) {
                    if (this.haveTargetingParamsResponse = !0, "planner_reach" in e && "total_reach" in e && (this.options.expected_reach.value = e.planner_reach, this.options.expected_reach.limit = e.total_reach, this.updateExpectedReach()), "planner_price" in e) {
                        var t = e.planner_price / 1e3;
                        t = Math.max(this.options.cost_per_click_min, t), t = Math.min(this.options.cost_per_click_max, t), this.options.save_params.cost_per_click = t.toFixed(2)
                    }
                    if ("suggested_criteria_data" in e && (this.setCriteriaData(e.suggested_criteria_data), this.options.suggested_criteria_data = e.suggested_criteria_data), "suggested_criteria" in e && e.suggested_criteria && (this.options.suggested_criteria = e.suggested_criteria, this.editingAudience || 0 != this.audienceDropdown.val() || this.setTargetingParams(e.suggested_criteria)), "category_suggestions" in e) {
                        this.options.category_suggestions = e.category_suggestions;
                        var s = this.options.category_suggestions[0];
                        if (s) {
                            var i = s[1] ? s[1] : s[0];
                            this.moreSettingsCategoryDropdown.selectItem(i)
                        }
                    }
                    "cities_data" in e && (this.options.big_cities[e.cities_data_country] = e.cities_data, this.updateGeoRegionDropdown())
                }
            }
            onUpdateTargetParamsFailed(e) {
                return debugLog("Get target params failed: ", e), this.options.expected_reach.value = 0, this.options.expected_reach.limit = 0, this.updateExpectedReach(), !0
            }
            onPaymentScreenClicked(e) {
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
                        case "yandexmoney":
                        case "mailmoney_vkpay":
                        case "card":
                            this.doTransactionalPayment(s, cur.ps_list[s]);
                            break;
                        case "terminals":
                            this.paymentCardsTurnOver()
                    }
                }
            }
            onPaymentCompleted() {
                this.options.union_payment ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_payments_success_subtitle"), "success"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })) : this.enableAd()
            }
            onPaymentFailed(e, t) {
                this.setPaymentResultScreen(t || getLang("ads_edit_easy_promote_payment_failed"), e || getLang("ads_edit_easy_promote_payment_failed_description"), "error"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })
            }
            onPaymentWaiting() {
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_payment"), "wait")
            }
            onPaymentCheckDone(e, t, s, i, n) {
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
                            this.paymentSystemsFormElement.innerHTML = "", this.paymentSystemsFormElement.action = i.action, this.paymentSystemsFormElement.method = "get", this.paymentSystemsFormElement.innerHTML = Object.keys(i.params).reduce((e, t) => e + `<input type="hidden" autocomplete="off" name="${t}" value="${i.params[t]}"/>`, "");
                            var o = `<form action="${this.paymentSystemsFormElement.action}" method="${this.paymentSystemsFormElement.method}" id="popup_payment_form" accept-charset="UTF-8">${this.paymentSystemsFormElement.innerHTML}</form>`,
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
                        i = getLang("payments_ads_fraud_control_msg"), n = getLang("payments_ads_fraud_control_title");
                    case 2:
                    default:
                        this.onPaymentFailed(i, n)
                } else this.onPaymentFailed(s, n);
                return !0
            }
            updateAudienceActions() {
                var e = this.audienceDropdown.val();
                toggleClass(this.audienceMenuDeleteElement, "ui_actions_menu_item_disabled", 0 == e), toggleClass(this.audienceMenuSaveElement, "ui_actions_menu_item_disabled", 0 == e)
            }
            getCriteriaPreset(e) {
                var t = !1,
                    s = !1;
                return 0 == e && this.options.suggested_criteria ? (t = this.options.suggested_criteria, this.options.suggested_criteria_data && (s = this.options.suggested_criteria_data)) : this.options.criteria_presets[e] && (t = this.options.criteria_presets[e].criteria_raw, this.options.criteria_presets_data[e] && (s = this.options.criteria_presets_data[e])), [t, s]
            }
            onCriteriaPresetChanged(e) {
                if ("" !== e) {
                    var t = a(this.getCriteriaPreset(e), 2),
                        s = t[0],
                        i = t[1];
                    this.updateAudienceActions(), s && (i && this.setCriteriaData(i), this.setTargetingParams(s), this.lastCriteriaPresetID = e)
                } else this.audienceDropdown.selectItem(this.lastCriteriaPresetID || 0)
            }
            onCreateAdFailed(e) {
                domFC(this.settingsErrorElement).innerHTML = e.error_msg || e.error_msg_eng || getLang("global_unknown_error"), show(this.settingsErrorElement), this.goToScreen(this.settingsScreenElement, !0)
            }
            onCreateAdDone(e, t) {
                if (!e || t.error_msg || t.error_msg_eng) this.onCreateAdFailed(t);
                else if (t.ad_id && (this.options.created_ad_id = t.ad_id), t.update_options && (this.options = extend(this.options, t.update_options)), this.options.payment_available && this.options.selected_union_id == this.options.payment_union_id) {
                    this.paymentIntroElement.innerHTML = langStr(getLang("ads_edit_easy_promote_payments_intro"), "link", '<a href="/ads?act=office&union_id=' + this.options.created_ad_id + '">', "/link", "</a>");
                    var s = this.options.user_offices[this.options.payment_union_id];
                    s && "budget_result" in s && (this.paymentUnionBudgetElement.innerHTML = langNumeric(s.budget_result, getLang("global_money_amount_rub", "raw"), !0)), this.goToScreen(this.paymentScreenElement)
                } else this.onPaymentCompleted();
                return !0
            }
            onEnableAdDone(e, t) {
                return t.info && "ok" === t.info ? this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_edit_easy_promote_payment_done_subtitle"), "success") : this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_failed"), getLang("ads_edit_easy_promote_enable_failed") + (t.error ? " " + t.error : ""), "error"), this.options.created_ad_id && this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "/ads?act=office&union_id=" + this.options.created_ad_id), this.goToScreen(this.paymentResultScreenElement), !0
            }
            onAudienceMenuItemClicked(e) {
                var t = e.target;
                if (!hasClass(t, this.classname("audience-menu-item"))) return !1;
                var s = this.audienceDropdown.val(),
                    i = a(s.split("_"), 2),
                    n = i[0],
                    o = i[1];
                o = intval(o);
                var r = t.getAttribute("data-action");
                if (hasClass(t, "ui_actions_menu_item_disabled")) return !1;
                switch (r) {
                    case "save-to-current":
                        if (0 == s) return !1;
                        if (o <= 0) return !1;
                        this.editCriteriaPreset(n, o, "", 0);
                        break;
                    case "save-to-new":
                        this.isEditingAudienceName = !0, hide(this.audienceDropdown.container), show(this.audienceNameInput), show(this.editAudienceNameLinksWrapperElement), this.editingAudience || hide(this.editAudienceLinkWrapperElement), hide(this.audienceMenuDotsElement), val(this.audienceNameInput, ""), elfocus(this.audienceNameInput);
                        break;
                    case "delete-current":
                        if (o <= 0) return !1;
                        this.editCriteriaPreset(n, o, "", 1)
                }
                return !1
            }
            goToScreen(t, s, i) {
                if (!t) return !1;
                if (i = extend({}, {
                        noBottomControls: t === this.cardPaymentScreenElement || t === this.paymentScreenElement || t === this.paymentResultScreenElement
                    }, i || {}), t == this.currentScreen) return this.setBoxOptions(i), !1;
                t === this.settingsScreenElement && (this.box.changed = !0), window.removeEventListener("message", e.frameMessage, !1), addClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden"), setStyle(this.screensContainerElement, {
                    height: this.screensContainerElement.clientHeight
                }), s && (addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, cur.isPaymentProcess = !1), removeClass(t, "unshown"), removeClass(t, this.classname("screen_hidden")), t.scrollTop = 0;
                var n = s ? t.offsetTop + t.clientHeight : this.currentScreen.offsetTop + this.currentScreen.clientHeight;
                return setStyle(this.screensWrapperElement, {
                    transform: "translateY(-" + n + "px)"
                }), addClass(this.currentScreen, this.classname("screen_hidden")), s && (this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                    transform: "translateY(0)"
                })), this.screensContainerElement.clientHeight, setStyle(this.screensContainerElement, {
                    height: t.clientHeight
                }), this.setBoxOptions(i), setTimeout(function(e) {
                    addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                        transform: "translateY(0)"
                    }), addClass(e, "unshown"), setStyle(this.screensContainerElement, {
                        height: "auto"
                    }), this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), removeClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden")
                }.bind(this, this.currentScreen), 600), this.currentScreen = t, this.currentScreen === this.settingsScreenElement && this.updateExpectedReach(), !1
            }
            nextScreen(e) {
                var t = (e ? domPS : domNS)(this.currentScreen),
                    s = {};
                return t == this.cardPaymentScreenElement && (e && (t = domPS(t)), s.showBackButton = !0), this.goToScreen(t, e, s)
            }
            paymentCardsTurnOver(e) {
                var t = 0;
                geByClass(this.classname("payments-systems-item"), this.paymentScreenElement).map(s => {
                    var i = s.getAttribute("data-type"),
                        n = s.getAttribute("data-inverse-type");
                    setTimeout(() => {
                        addClass(s, this.classname("payments-systems-item_rotated")), setTimeout(() => {
                            addClass(s, this.classname("payments-systems-item_no-transition")), s.clientHeight, (e ? removeClass : addClass)(s, this.classname("payments-systems-item_inverse")), addClass(s, this.classname("payments-systems-item_rotated-inv")), removeClass(s, this.classname("payments-systems-item_rotated")), toggleClass(s, this.classname("payments-systems-item_") + i, e), toggleClass(s, this.classname("payments-systems-item_") + n, !e), toggleClass(s, this.classname("payments-systems-item_clickable"), e ? !!i : !!n), s.clientHeight, removeClass(s, this.classname("payments-systems-item_no-transition")), s.clientHeight, removeClass(s, this.classname("payments-systems-item_rotated-inv"))
                        }, 200)
                    }, 50 * t), t++
                }), this.paymentCardsTurnedOver = !e, this.setBoxOptions({
                    showBackButton: this.paymentCardsTurnedOver,
                    noBottomControls: !0
                })
            }
            goBack() {
                return this.paymentCardsTurnedOver ? this.paymentCardsTurnOver(!0) : this.nextScreen(!0), !1
            }
            setBoxOptions(e) {
                if (e) {
                    this.box.setOptions({
                        title: e.showBackButton ? '<a class="back ads_edit_easy_promote_box__back">' + getLang("global_box_title_back") + "</a>" : this.options.box_title,
                        hideButtons: !!e.noBottomControls,
                        noRefreshCoords: !("noRefreshCoords" in e) || e.noRefreshCoords
                    });
                    var t = geByClass1(this.classname("back"), this.box.titleWrap);
                    t && (removeEvent(t, "click", this.goBack.bind(this)), addEvent(t, "click", this.goBack.bind(this)))
                }
            }
            updateDropdownTokenRadiusText(e, t) {
                geByClass1("ads_edit_geo_place_radius_selector_text", e).innerHTML = langNumeric(t, "%s", !0) + " " + getLang("ads_edit_ad_geo_radius_unit_meters")
            }
            getTextWidth(e) {
                var t = ce("span", {
                    innerHTML: e
                });
                document.body.appendChild(t);
                var s = getSize(t);
                return re(t), s[0]
            }
            getAgeSelectorData(e, t, s) {
                for (var i = [
                        [0, getLang("ads_age_any")]
                    ], n = e; n <= t; ++n) i.push([n, langNumeric(n, s)]);
                return i
            }
            getGeoRegionURL() {
                return "/select.php?act=acity&autocomplete=1&show_regions=1&country=" + this.geoCountryDropdown.val()
            }
            updateGeoRegionDropdown() {
                this.geoRegionDropdown.setURL(this.getGeoRegionURL()), this.geoRegionDropdown.disable(0 == this.geoCountryDropdown.val() && !this.geoRegionDropdown.val());
                var e = this.options.big_cities[this.geoCountryDropdown.val()];
                this.geoRegionDropdown.setOptions({
                    defaultItems: e || []
                }), e || this.updateTargetParams(!1, {
                    need_cities_data: !0
                })
            }
            updateGeoPlacesList() {
                var e = !1,
                    t = "";
                this.geoEditor.inited && (e = this.geoEditor.map.getCenter(), t += "&radius=" + this.geoEditor.options.defaultRadius), e && (t += "&lat=" + e.lat + "&lon=" + e.lon);
                var s = "/adsedit?act=search_geo" + t;
                this.geoPlacesList.setURL(s)
            }
            updateSettingsScreenFixedRow() {
                var e = this.settingsScreenElement.scrollHeight - this.settingsScreenElement.scrollTop - this.settingsScreenElement.clientHeight,
                    t = e > 0,
                    s = domPN(this.durationDropdown.container).offsetTop + this.durationDropdown.container.clientHeight,
                    i = domPN(this.dailyLimitDropdown.container).offsetTop + this.dailyLimitDropdown.container.clientHeight;
                this.durationDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - s - this.expectedReachRowElement.clientHeight && this.durationDropdown.select.hide(), this.dailyLimitDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - i - this.expectedReachRowElement.clientHeight && this.dailyLimitDropdown.select.hide(), this.expectedReachRowElement.fixed !== t && (t && !this.expectedReachRowDummyElement && (this.expectedReachRowDummyElement = ce("div", {
                    className: this.classname("row ads_edit_easy_promote_box__row_expected-reach")
                }, {
                    height: this.expectedReachRowElement.clientHeight - 20
                }), this.settingsScreenElement.appendChild(this.expectedReachRowDummyElement)), t || (re(this.expectedReachRowDummyElement), delete this.expectedReachRowDummyElement), toggleClass(this.expectedReachRowElement, this.classname("row_fixed"), t), this.expectedReachRowElement.fixed = t)
            }
            updatePaymentAmount() {
                var e = intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, ""));
                e < intval(this.options.payment_min_amount) ? (showTooltip(this.paymentTotalBudgetInput, {
                    text: langNumeric(this.options.payment_min_amount, getLang("ads_minimum_payment", "raw"), !0),
                    dir: "auto",
                    shift: [0, 6, 0]
                }), addClass(this.paymentSystemsElement, this.classname("payments-systems_disabled"))) : removeClass(this.paymentSystemsElement, this.classname("payments-systems_disabled")), val(this.paymentTotalBudgetInput, stripHTML(langNumeric(e, "%s", !0))), this.paymentAmountCurrencyElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub_text", "raw"), !0)
            }
            updateTotalBudget() {
                var e = this.durationDropdown.val() * this.dailyLimitDropdown.val();
                this.options.totalBudget = e, this.totalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), this.paymentTotalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), val(this.paymentTotalBudgetInput, e), this.updatePaymentAmount()
            }
            updateExpectedReach() {
                var e = 0;
                if (this.options.expected_reach.limit ? (e = Math.min(100, Math.round(this.options.expected_reach.value / this.options.expected_reach.limit * 100)), this.expectedReachValueElement.innerHTML = langNumeric(this.options.expected_reach.value, getLang("global_X_people", "raw"), !0), this.expectedReachLimitElement.innerHTML = langNumeric(this.options.expected_reach.limit, getLang("ads_edit_easy_promote_expected_reach_possible", "raw"), !0)) : (this.expectedReachValueElement.innerHTML = "&mdash;", this.expectedReachLimitElement.innerHTML = ""), setStyle(this.expectedReachBarValueElement, {
                        width: e + "%"
                    }), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_red"), e < 20), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_green"), e > 80), this.haveTargetingParamsResponse) {
                    var t = this.options.expected_reach.limit <= this.options.audience_limit_min,
                        s = this.options.expected_reach.limit >= this.options.audience_limit_max;
                    this.expectedReachHintElement.innerHTML = s ? getLang("ads_edit_easy_promote_audience_too_large") : t ? getLang("ads_edit_easy_promote_audience_too_small") : getLang("ads_edit_easy_promote_expected_reach_hint"), toggleClass(this.expectedReachHintElement, this.classname("expected-reach-hint_warning"), s || t), this.updateContinueButton()
                }
            }
            updateContinueButton() {
                var e = this.options.expected_reach.limit <= this.options.audience_limit_min,
                    t = this.options.expected_reach.limit >= this.options.audience_limit_max,
                    s = this.acceptTermsCheckbox.val();
                disableButton(this.continueButton, (t || e) && this.currentScreen === this.settingsScreenElement || !s)
            }
            updateAgeSelectors() {
                var e = intval(this.ageFromDropdown.val()),
                    t = intval(this.ageToDropdown.val());
                this.ageFromDropdown.setData(this.getAgeSelectorData(this.options.ages.min, t || this.options.ages.max, getLang("ads_age_from"))), this.ageToDropdown.setData(this.getAgeSelectorData(e || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")))
            }
            updateTargetParams(e, t) {
                if (this.updateTargetParamsOptions = this.updateTargetParamsOptions || {}, t && (this.updateTargetParamsOptions = extend({}, this.updateTargetParamsOptions, t)), this.settingsScreenInitialized) {
                    if (!e) {
                        return this.updateTargetParamsTimer && clearTimeout(this.updateTargetParamsTimer), void(this.updateTargetParamsTimer = setTimeout(this.updateTargetParams.bind(this, !0, this.updateTargetParamsOptions), 500))
                    }
                    var s = this.getUpdateTargetParams(this.updateTargetParamsOptions);
                    this.updateTargetParamsOptions = {}, this.updateTargetLastRequestID = s.request_id, ajax.post("/adsedit?act=get_target_params", s, {
                        onDone: this.onUpdateTargetParamsDone.bind(this),
                        onFail: this.onUpdateTargetParamsFailed.bind(this),
                        showProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(() => {
                            this.updateTargetCounter || (showProgress(this.updateTargetParamsProgressElement), lockButton(this.continueButton)), this.updateTargetCounter++
                        }),
                        hideProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(() => {
                            this.updateTargetCounter--, this.updateTargetCounter || (hideProgress(this.updateTargetParamsProgressElement), unlockButton(this.continueButton))
                        })
                    })
                }
            }
            getUpdateTargetParams(e) {
                e = e || {};
                var t = "",
                    s = a(this.getCriteriaPreset(this.audienceDropdown.val()), 1)[0];
                this.geoEditor.inited ? t = this.geoEditor.savePointsToString() : s && (t = s.geo_near);
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
                    planner_daily_budget: this.dailyLimitDropdown.val(),
                    source: "easy_promote"
                };
                if (1 == i.geo_type ? (i.country = "", i.cities = "") : 0 == i.geo_type && (i.geo_near = "", i.geo_mask = ""), 0 == i.retargeting_groups && (i.retargeting_groups = ""), i.country && e.need_cities_data && (i.need_cities_data = 1), this.options.suggested_criteria || (i.need_suggested_criteria = 1), this.options.category_selected) i.category1_id = this.options.category_selected;
                else if (this.options.category_suggestions) {
                    var n = this.options.category_suggestions[0];
                    n && (i.category1_id = n[1] ? n[1] : n[0])
                } else i.need_link_post = 1;
                return i.request_id = +new Date, extend({}, this.options.target_params, i)
            }
            setCriteriaData(e) {
                "groups" in e && e.groups && this.groupsDropdown.setOptions({
                    defaultItems: e.groups
                }), "cities" in e && e.cities && this.geoRegionDropdown.setOptions({
                    defaultItems: e.cities
                })
            }
            setTargetingParams(e) {
                this.ageFromDropdown.selectItem(0), this.ageToDropdown.selectItem(0), e.age_from && this.ageFromDropdown.selectItem(e.age_from), e.age_to && this.ageToDropdown.selectItem(e.age_to), Radiobutton.select("ads_targeting_criterion_sex", e.sex ? e.sex : 0), this.groupsDropdown.clear(), e.groups && (e.groups.split(",").map(e => {
                    e && this.groupsDropdown.selectItem(e)
                }), this.showGroupsDropdown()), this.geoRegionDropdown.clear(), e.cities && (e.cities.split(",").map(e => {
                    e && this.geoRegionDropdown.selectItem(e)
                }), this.updateGeoRegionDropdown()), this.geoCountryDropdown.selectItem(e.country ? e.country : 0), this.interestsDropdown.clear(), e.interest_categories && (e.interest_categories.split(",").map(e => {
                    e && this.interestsDropdown.selectItem(e)
                }), this.showInterestsDropdown()), e.geo_near ? (this.geoEditor && this.geoEditor.inited && this.geoEditor.setPointsFromString(e.geo_near), Radiobutton.select("ads_targeting_criterion_geo_type", 1)) : Radiobutton.select("ads_targeting_criterion_geo_type", 0), this.updateTargetParams()
            }
            showGroupsDropdown() {
                return hide(this.groupShowerLink), show(this.groupsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupsDropdown.updateInput(), !1
            }
            showInterestsDropdown() {
                return hide(this.interestsShowerLink), show(this.interestsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsDropdown.updateInput(), !1
            }
            editCriteriaPreset(e, t, s, i) {
                if (!(e = intval(e) || this.options.selected_union_id)) return !1;
                var n = this.getUpdateTargetParams();
                if (!t && !i) {
                    var a = e + "_" + -n.request_id;
                    this.options.audiences[a] = [a, clean(s), getLang("ads_edit_easy_promote_audience_saving")], this.audienceDropdown.setOptions({
                        defaultItems: Object.values(this.options.audiences)
                    }), this.audienceDropdown.selectItem(a)
                }
                ajax.post("/adsedit?act=a_edit_criteria_preset", extend({}, n, {
                    client_id: e,
                    criteria_preset_id: t,
                    criteria_preset_title: s,
                    hash: this.options.save_audience_hash,
                    do_delete: intval(i),
                    source: "easy_promote"
                }), {
                    onDone: s => {
                        if ("criteria_preset_id" in s)
                            if (t || i) {
                                if (t && !i) {
                                    var a = e + "_" + t;
                                    "description" in s && (this.options.audiences[a][2] = s.description), this.audienceDropdown.setOptions({
                                        defaultItems: Object.values(this.options.audiences)
                                    })
                                }
                            } else {
                                var o = e + "_" + -n.request_id,
                                    r = e + "_" + s.criteria_preset_id;
                                this.options.audiences[r] = this.options.audiences[o], this.options.audiences[r][0] = r, "description" in s && (this.options.audiences[r][2] = s.description), delete this.options.audiences[o], this.audienceDropdown.setOptions({
                                    defaultItems: Object.values(this.options.audiences)
                                }), this.audienceDropdown.selectItem(r)
                            }
                        if (i) {
                            var d = e + "_" + t;
                            delete this.options.audiences[d], this.audienceDropdown.setOptions({
                                defaultItems: Object.values(this.options.audiences)
                            }), this.audienceDropdown.selectItem(0)
                        }
                    },
                    onFail: () => {},
                    showProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(() => {
                        hide(this.audienceMenuDotsElement), show(this.audienceProgressElement), showProgress(this.audienceProgressElement)
                    }),
                    hideProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(() => {
                        show(this.audienceMenuDotsElement), hideProgress(this.audienceProgressElement), hide(show(this.audienceProgressElement))
                    })
                })
            }
            createAd(e) {
                var t = this.getUpdateTargetParams(),
                    s = extend({}, t, this.options.save_params, {
                        client_id: this.options.selected_union_id,
                        day_limit: this.dailyLimitDropdown.val(),
                        duration: this.durationDropdown.val(),
                        all_limit: this.options.totalBudget,
                        criteria_preset_id: this.audienceDropdown.val(),
                        planner_reach: this.options.expected_reach.value,
                        total_reach: this.options.expected_reach.limit,
                        suggested_criteria: this.isSuggestedCriteria(t) ? 1 : 0,
                        suggested_criteria_data: JSON.stringify(this.getFullSuggestedCriteriaAndLimits())
                    });
                ajax.post("/adsedit?act=save_ad", s, {
                    onDone: this.onCreateAdDone.bind(this, !0),
                    onFail: this.onCreateAdDone.bind(this, !1),
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            }
            enableAd() {
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
            }
            waitForPaymentResult(e) {
                var t = e.paymentPopup,
                    s = e.ajaxParams,
                    i = !1,
                    n = !1;
                t && t.closed && (i = !0, e.paymentPopupClosedTime || (e.paymentPopupClosedTime = +new Date), n = +new Date - e.paymentPopupClosedTime > 1e4);
                if (!i || n || e.paymentWaiting || (this.onPaymentWaiting(), e.paymentWaiting = !0), cur.isPaymentComplete) return this.onPaymentCheckDone(!0, e, cur.paymentCompleteParams), void delete cur.isPaymentComplete;
                if (cur.isPaymentCanceled || n) return this.onPaymentCheckDone(!1, e, void 0, void 0, getLang("ads_edit_easy_promote_payment_cancelled")), void delete cur.isPaymentCanceled;
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
            }
            doTransactionalPayment(t, s) {
                var i = void 0;
                if (s && s.provider) {
                    i = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1");
                    var n = getLang("payment_redirect").replace("%s", cur.ps_list[t].title);
                    cur._popup_text = cur.paymentsPopupHtml(n, "", ""), cur.paymentsPopupWrite(i)
                }
                var a = {
                    act: "a_getvotes_charge",
                    type: t,
                    payment_account_id: this.options.payment_union_id,
                    hash: this.options.payment_hash,
                    account_hash: this.options.payment_ads_hash,
                    amount: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                    source: "ads_easy_promote"
                };
                ajax.post("al_payments.php", a, {
                    onDone: (n, a) => {
                        if ("mailmoney_vkpay" == t) return this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.box._hide(!1, !0), showWiki({
                            w: n
                        }, !1, !1, {
                            noLocChange: 1,
                            skipBoxesHide: 1,
                            noClickHide: 1
                        }), cur.promoteBox = this.box, cur.onExternalAppDone = e => {
                            e.status || (cur.isPaymentCanceled = !0), cur.promoteBox._show(), cur.promoteBox = null, cur.onExternalAppDone = null, window.WkView && WkView.hide(!1, !0)
                        }, void this.waitForPaymentResult({
                            ajaxParams: {
                                source: "ads",
                                ads_union_id: this.options.payment_union_id,
                                type: t,
                                hash: s.check_hash
                            },
                            paymentSystemData: s
                        });
                        a ? (this.setPaymentIFrameHtml(a), this.nextScreen(), window.addEventListener("message", e.frameMessage, !1)) : (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement));
                        var o = {
                            ajaxParams: extend({}, n, {
                                type: t
                            }),
                            paymentSystemData: s
                        };
                        i && (o.paymentPopup = i), this.waitForPaymentResult(o)
                    },
                    onFail: e => (domFC(this.paymentErrorElement).innerHTML = e, show(this.paymentErrorElement), !0),
                    showProgress: addClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled")),
                    hideProgress: removeClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled"))
                })
            }
            doNontransactionalPayment(e, t) {
                if (window.cur && cur.ps_list && cur.ps_list[e] && cur.submitPaymentSystemsForm) {
                    var s = ce("input", {
                            value: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                            id: "amount_" + e,
                            type: "hidden"
                        }),
                        i = ce("div", {
                            className: "_ps_wrap"
                        }, {
                            display: "none"
                        });
                    i.appendChild(s), this.boxBodyNode.appendChild(i), this.paymentSystemsFormElement.innerHTML = "", cur.isAdsPayment = !0, cur.paymentAccountId = this.options.payment_union_id;
                    var a = cur.submitPaymentSystemsForm(e, t.request_without_fee ? 0 : t.fee, !0);
                    Object(n.statlogsValueEvent)("payments", "", "ads", e, "start"), this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.waitForPaymentResult({
                        ajaxParams: {
                            source: "ads",
                            ads_union_id: this.options.payment_union_id,
                            type: e,
                            hash: t.check_hash
                        },
                        paymentPopup: a
                    }), re(s), re(i)
                }
            }
            setPaymentResultScreen(e, t, s) {
                this.paymentResultTitleElement.innerHTML = e, this.paymentResultSubtitleElement.innerHTML = t;
                var i = geByClass1(this.classname("payment-result-icon_visible"), this.paymentResultElement),
                    n = geByClass1(this.classname("payment-result-icon_hidden"), this.paymentResultElement);
                if (!hasClass(i, this.classname("payment-result-icon_") + s)) {
                    ["success", "error", "wait"].map(e => {
                        removeClass(n, this.classname("payment-result-icon_") + e)
                    }), addClass(n, this.classname("payment-result-icon_") + s), removeClass(n, this.classname("payment-result-icon_hidden")), addClass(n, this.classname("payment-result-icon_visible")), addClass(i, this.classname("payment-result-icon_hidden")), removeClass(i, this.classname("payment-result-icon_visible")), toggleClass(this.paymentResultIconContainerElement, this.classname("payment-result-icon-container_animated"), "wait" === s)
                }
                this.hidePaymentResultScreenButton()
            }
            setPaymentResultScreenButton(e, t) {
                e || t ? (this.paymentResultButtonElement.innerHTML = e, this.paymentResultButtonElement.href = t, show(this.paymentResultButtonContainerElement)) : hide(this.paymentResultButtonContainerElement)
            }
            hidePaymentResultScreenButton() {
                this.setPaymentResultScreenButton()
            }
            static frameMessage(t) {
                if (!t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?paymentgate\.ru$/) && !t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) return !1;
                var s = {};
                t.data && "{" === t.data.substr(0, 1) && "billing" !== (s = Object(i.parseJSON)(t.data)).type || ("submit" === t.data || "3dsPage" === s.action ? setTimeout(e.setCardFrameHeight.pbind(600), 200) : "3dsFinish" === s.action ? e.setCardFrameHeight() : "resizeFrame" === s.action && setTimeout(e.setCardFrameHeight.pbind(s.action_params.height), 200))
            }
            setPaymentIFrameHtml(e) {
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
            }
            static setCardFrameHeight(e) {
                var t = ge("card_iframe");
                e ? (e = Math.max(e, 250) + 15, cur.prevFrameHeight = t.style.height, t.style.height = e + "px") : t.style.height = cur.prevFrameHeight
            }
            initSettingsScreen() {
                var e, t;
                e = geByClass1(this.classname("input-duration"), this.settingsScreenElement), t = [], this.options.days.map(e => t.push([e, langNumeric(e, getLang("ads_edit_easy_promote_settings_duration", "raw"), !0)])), this.durationDropdown = new Dropdown(e, t, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.duration_selected,
                    big: !0,
                    onChange: () => {
                        this.updateTotalBudget(), this.updateTargetParams()
                    }
                }), e = geByClass1(this.classname("input-daily-limit"), this.settingsScreenElement), t = [], this.options.daily_limits.map(e => t.push([e, langNumeric(e, getLang("global_money_amount_rub", "raw"), !0)])), this.dailyLimitDropdown = new Dropdown(e, t, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.daily_limit_selected,
                    big: !0,
                    onChange: () => {
                        this.updateTotalBudget(), this.updateTargetParams()
                    }
                }), e = geByClass1(this.classname("input-audience"), this.settingsScreenElement), this.audienceDropdown = new Dropdown(e, Object.values(this.options.audiences), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    introText: getLang("ads_edit_easy_promote_select_audience"),
                    placeholder: getLang("ads_edit_easy_promote_select_audience"),
                    selectedItem: this.options.audience_selected,
                    onChange: this.onCriteriaPresetChanged.bind(this)
                }), e = geByClass1(this.classname("link-edit-audience"), this.settingsScreenElement), addEvent(e, "click", this.editAudience.bind(this)), e = geByClass1(this.classname("link-edit-audience-save"), this.settingsScreenElement), addEvent(e, "click", this.editAudienceName.bind(this, !0)), e = geByClass1(this.classname("link-edit-audience-cancel"), this.settingsScreenElement), addEvent(e, "click", this.editAudienceName.bind(this, !1));
                var s = {
                    0: getLang("ads_geo_type_regions"),
                    1: getLang("ads_geo_type_points")
                };
                geByClass(this.classname("geo-type-checkbox"), this.settingsScreenElement).map(e => {
                    var t = e.getAttribute("value"),
                        i = s[t];
                    new Radiobutton(e, {
                        width: this.getTextWidth(i) + 25,
                        label: i,
                        onSelect: e => {
                            toggle(this.geoContainerRegionsElement, 0 == e), toggle(this.geoContainerPointsElement, 1 == e), this.geoEditor && !this.geoEditor.inited && 1 == e && this.geoEditorInitBound(), this.updateTargetParams()
                        }
                    })
                }), Radiobutton.select("ads_targeting_criterion_geo_type", this.options.geo_type_selected), e = geByClass1(this.classname("input-geo-country"), this.settingsScreenElement), this.geoCountryDropdown = new Dropdown(e, this.options.countries, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    selectedItem: this.options.country_selected,
                    onChange: e => {
                        this.updateGeoRegionDropdown(), this.updateTargetParams()
                    }
                }), e = geByClass1(this.classname("input-geo-region"), this.settingsScreenElement), this.geoRegionDropdown = new Autocomplete(e, this.getGeoRegionURL(), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_starttypingname_city_region"),
                    placeholder: getLang("ads_starttypingname_city_region"),
                    disabledText: getLang("ads_first_select_country"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: () => {
                        this.updateGeoRegionDropdown(), this.updateTargetParams()
                    }
                }), this.updateGeoRegionDropdown();
                var i = {
                    0: getLang("search_adv_any_sex"),
                    1: getLang("Sex_fm"),
                    2: getLang("Sex_m")
                };
                geByClass(this.classname("sex-checkbox"), this.settingsScreenElement).map(e => {
                    var t = i[e.getAttribute("value")];
                    new Radiobutton(e, {
                        width: this.getTextWidth(t) + 25,
                        label: t,
                        onSelect: this.updateTargetParams.bind(this, !1)
                    })
                }), Radiobutton.select("ads_targeting_criterion_sex", this.options.sex_selected), e = geByClass1(this.classname("input-age-from"), this.settingsScreenElement), this.ageFromDropdown = new Dropdown(e, this.getAgeSelectorData(this.options.ages.min, this.options.ages.to_selected || this.options.ages.max, getLang("ads_age_from")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.from_selected,
                    onChange: () => {
                        this.updateAgeSelectors(), this.updateTargetParams()
                    }
                }), e = geByClass1(this.classname("input-age-to"), this.settingsScreenElement), this.ageToDropdown = new Dropdown(e, this.getAgeSelectorData(this.options.ages.from_selected || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.to_selected,
                    onChange: () => {
                        this.updateAgeSelectors(), this.updateTargetParams()
                    }
                }), e = geByClass1(this.classname("input-interests"), this.settingsScreenElement), this.interestsDropdown = new Autocomplete(e, this.options.interests, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_select_interest_category"),
                    placeholder: getLang("ads_select_interest_category"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: this.updateTargetParams.bind(this, !1)
                }), hide(this.interestsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsShowerLink = geByClass1(this.classname("input-interests-show"), this.settingsScreenElement), show(this.interestsShowerLink), addEvent(this.interestsShowerLink, "click", this.showInterestsDropdown.bind(this)), e = geByClass1(this.classname("input-groups"), this.settingsScreenElement), this.groupsDropdown = new Autocomplete(e, "/adsedit?act=search_user_objects&section=groups&group_purpose=criteria", {
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
                var n = {
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
                    a = {
                        onPointAdded: this.onGeoEditorPointAdded.bind(this),
                        onPointRemoved: this.onGeoEditorPointRemoved.bind(this),
                        onPointUpdated: this.onGeoEditorPointUpdated.bind(this),
                        onLoaded: this.onGeoEditorLoaded.bind(this)
                    },
                    o = geByClass1(this.classname("geo-map"), this.settingsScreenElement);
                this.geoEditorInitBound = this.geoEditor.init.bind(this.geoEditor, o, n, a), e = geByClass1(this.classname("input-geo-places"), this.settingsScreenElement), this.geoPlacesList = new Autocomplete(e, "", {
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
                }), this.updateGeoPlacesList(), this.geoPlacesList.updateInput(), addEvent(this.audienceSettingsElement, "click", e => {
                    if (hasClass(e.target, "ui_actions_menu_item")) {
                        var t = e.target.getAttribute("data-radius"),
                            s = gpeByClass("token", data(gpeByClass("ui_actions_menu_dummy_wrap", e.target), "origMenu"));
                        this.geoEditor.setPointRadius(s.getAttribute("data-id"), t), this.geoEditor.updateMap(s.getAttribute("data-id"))
                    }
                }), this.updateTotalBudget(), this.updateExpectedReach(), addEvent(this.settingsScreenElement, "scroll", requestAnimationFrame.pbind(this.updateSettingsScreenFixedRow.bind(this))), this.updateSettingsScreenFixedRow(), Object.keys(this.options.user_offices).length > 0 ? (addEvent(this.audienceMenuDotsElement, "click", this.onAudienceMenuItemClicked.bind(this)), addEvent(this.audienceNameInput, "keydown", e => {
                    if (e.which == KEY.ENTER) return this.editAudienceName(!0), !1
                })) : hide(this.audienceMenuDotsElement), this.settingsScreenInitialized = !0, this.onCriteriaPresetChanged(this.audienceDropdown.val()), this.updateTargetParams()
            }
            initMoreSettingsScreen() {
                var e;
                if (Object.keys(this.options.user_offices).length > 1) {
                    e = geByClass1(this.classname("input-union-id"), this.moreSettingsScreenElement);
                    var t = [];
                    Object.keys(this.options.user_offices).map(e => {
                        var s = this.options.user_offices[e],
                            i = [e, stripHTML(s.name), 0, 0];
                        "budget_result" in s && (i[2] = langNumeric(intval(s.budget_result), getLang("global_money_amount_rub", "raw"), !0)), s.child_offices ? (i[3] = "label", i[5] = "1", t.push(i), s.child_offices.map(e => {
                            t.push([e.union_id, stripHTML(e.name)])
                        })) : t.push(i)
                    }), this.moreSettingsOfficeDropdown = new Dropdown(e, t, {
                        width: 320,
                        big: !0,
                        autocomplete: !0,
                        introText: getLang("ads_select_office"),
                        placeholder: getLang("ads_select_office"),
                        includeLabelsOnMatch: !0,
                        preventDuplicates: !0,
                        selectedItem: this.options.selected_union_id,
                        onChange: e => {
                            "" !== e ? this.options.selected_union_id = e : this.moreSettingsOfficeDropdown.selectItem(this.options.selected_union_id || this.options.selected_union_id)
                        }
                    })
                }
                e = geByClass1(this.classname("input-category-id"), this.moreSettingsScreenElement), this.moreSettingsCategoryDropdown = new Dropdown(e, this.options.categories, {
                    introText: getLang("ads_select_category"),
                    placeholder: getLang("ads_select_category"),
                    big: !0,
                    autocomplete: !0,
                    indexkeys: [1, 4],
                    includeLabelsOnMatch: !0,
                    preventDuplicates: !0,
                    width: 320,
                    onChange: e => {
                        this.options.category_selected = e
                    }
                })
            }
            updateMoreSettingsScreen(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    s = t.categoryRequired,
                    i = t.officeRequired;
                toggle(this.moreSettingsCategoryIdRowElement, s), toggle(this.moreSettingsOfficeSwitcherRowElement, i), this.moreSettingsSubtitleElement.innerHTML = "", this.moreSettingsOfficeLabelElement.innerHTML = "", this.moreSettingsCategoryLabelElement.innerHTML = "", s && i ? (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_more_settings_subtitle"), this.moreSettingsOfficeLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_office_short"), this.moreSettingsCategoryLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_category_short")) : s ? this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_category") : i && (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_office"))
            }
            moreSettingsRequiredComponents(e) {
                var t = this.getUpdateTargetParams();
                return {
                    categoryRequired: !t.category1_id && !t.category2_id,
                    officeRequired: Object.keys(this.options.user_offices).length > 1 && e
                }
            }
            moreSettingsRequired(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    s = t.categoryRequired;
                return t.officeRequired || s
            }
            editAudience() {
                return addClass(this.imageElement, this.classname("image_animated")), setTimeout(addClass.pbind(this.imageElement, this.classname("image_hidden")), 700), setTimeout(addClass.pbind(this.settingsScreenElement, this.classname("screen_settings-tall")), 700), hide(this.editAudienceLinkWrapperElement), show(this.audienceSettingsElement), show(this.budgetTitleRowElement), this.updateSettingsScreenFixedRow(), this.geoEditor.inited || 1 != Radiobutton.val("ads_targeting_criterion_geo_type") || this.geoEditorInitBound(), this.editingAudience = !0, !1
            }
            editAudienceName(e) {
                var t = val(this.audienceNameInput).trim();
                if (e && !t) return notaBene(this.audienceNameInput), elfocus(this.audienceNameInput), !1;
                if (hide(this.audienceNameInput), show(this.audienceDropdown.container), show(this.audienceMenuDotsElement), hide(this.editAudienceNameLinksWrapperElement), this.editingAudience || show(this.editAudienceLinkWrapperElement), e) {
                    var s = a(this.audienceDropdown.val().split("_"), 2),
                        i = s[0];
                    s[1];
                    this.editCriteriaPreset(i, 0, t, 0)
                }
                return this.isEditingAudienceName = !1, !1
            }
            isSuggestedCriteria(e) {
                if (!this.options.suggested_criteria) return !1;
                for (var t = 0, s = ["sex", "age_from", "age_to", "cities", "country", "interest_categories", "geo_near", "groups"]; t < s.length; t++) {
                    var i = s[t],
                        n = this.options.suggested_criteria[i];
                    if (n || (n = !1), n != e[i]) return !1
                }
                return !0
            }
            getFullSuggestedCriteriaAndLimits() {
                var e = {
                    daily_limit_selected: this.options.daily_limit_selected,
                    duration_selected: this.options.duration_selected
                };
                return Object.assign({}, {
                    sex: !1,
                    age_from: !1,
                    age_to: !1,
                    cities: !1,
                    country: !1,
                    interest_categories: !1,
                    geo_near: !1,
                    groups: !1,
                    daily_limit_selected: !1,
                    duration_selected: !1
                }, this.options.suggested_criteria, e)
            }
        };
        try {
            stManager.done(jsc("web/ads_edit_easy.js"))
        } catch (e) {}
    }
});