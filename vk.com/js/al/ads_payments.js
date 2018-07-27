var AdsPayments = {};
AdsPayments.openChangeBudgetBox = function(e, n) {
    var r = {};
    r.union_id = e, n && (r[n] = 1);
    var a = {
        params: {}
    };
    a.onFail = Ads.onBoxFail, a.params.width = 400, a.params.bodyStyle = "line-height: 160%;", cur.unionChangeBudgetBox = showBox("/ads?act=a_union_change_budget_box", r, a)
}, AdsPayments.checkBudgetSumInc = function(e) {
    var n, r = ge("budget_error"),
        a = ge("budget_error_box"),
        o = ge("budget_notice_box");
    if (n = window.curLegal ? ge("union_invoice_sum").value : ge("union_budget_sum").value, n = n.replace(",", "."), n = n.replace(/^0+/g, ""), n = n.replace(/(\.\d*?)0+$/g, "$1"), "." === n[0] && (n = "0" + n), "" !== n && "." === n.substr(-1) && (n = n.substr(0, n.length - 1)), "" === n && (n = "0"), "0" === n) return e ? (r.innerHTML = window.enterMoneyAmount, hide(o), show(a), !1) : (hide(a), show(o), !1);
    var t = !0;
    if (window.curIsMoney && (window.curOfficeLegal || window.userMoney > cur.paymentsMinMoneyAmount) && !window.curLegal && window.userMoneyStr && n === window.userMoneyStr && (t = !1), !n.match(cur.unionsLimits.budget_pattern_all)) return r.innerHTML = window.incorrectMoneyFormat, hide(o), show(a), !1;
    if (t && -1 != n.indexOf(".")) return window.curIsMoney && !window.curLegal && (window.curOfficeLegal || window.userMoney > cur.paymentsMinMoneyAmount) ? r.innerHTML = window.enterIntegerOrEqualMoney : r.innerHTML = window.enterIntegerMoney, hide(o), show(a), !1;
    var i = parseFloat(n);
    if (t && !n.match(cur.unionsLimits.budget_pattern)) return r.innerHTML = window.incorrectMoneyFormat, hide(o), show(a), !1;
    if (!window.curLegal && i > window.userMoney) return r.innerHTML = window.curOfficeLegal ? window.lowMoneyOnAccountSimple : window.lowMoneyOnAccount, hide(o), show(a), !1;
    if (window.curIsMoney) {
        if (window.curLegal) {
            if (i < cur.paymentsMinMoneyAmount) {
                var u = getLang(window.langMoneyAmount, cur.paymentsMinMoneyAmount);
                return r.innerHTML = window.lowMoneyPaymentLegal.replace("{money}", u), hide(o), show(a), !1
            }
        } else if (t && i < cur.paymentsMinMoneyAmount) return r.innerHTML = window.lowMoneyPayment, hide(o), show(a), !1
    } else if (i < cur.paymentsMinMoneyAmount) return r.innerHTML = window.lowMoneyPayment, hide(o), show(a), !1;
    return hide(a), show(o), n
}, AdsPayments.onBudgetRublesChanged = function(e) {
    if (!window.curPaymentPage) {
        if (e) return window.changeBudgetDelayedCounter--, void(0 == window.changeBudgetDelayedCounter && AdsPayments.checkBudgetSumInc());
        window.changeBudgetDelayedCounter++, setTimeout(function() {
            AdsPayments.onBudgetRublesChanged(!0)
        }, 300)
    }
    if (window.curLegal) {
        if (ge("union_invoice_sum_currency").innerHTML = getLang(window.langMoneyAmountText, ge("union_invoice_sum").value), window.curInvoiceFeeFract) {
            var n = parseFloat(ge("union_invoice_sum").value),
                r = (isNaN(n) ? 0 : n / (1 - window.curInvoiceFeeFract)).toFixed(2);
            ge("fee_money_sum_full").innerHTML = getLang("ads_payments_legal_sum_with_fee", r)
        }
    } else window.curIsMoney ? ge("union_budget_sum_currency").innerHTML = getLang("global_money_amount_rub_text", ge("union_budget_sum").value) : ge("union_budget_sum_currency").innerHTML = getLang("global_money_amount_votes_text", ge("union_budget_sum").value)
}, AdsPayments.changeBudget = function() {
    function e(e) {
        if (isObject(e))
            if (e.error) r.innerHTML = e.error, hide(o), show(a), window.budgetRequestInProgress = !1;
            else {
                var n = ge("general_info_budget");
                n && (n.innerHTML = e.budget), cur.unionChangeBudgetBox && cur.unionChangeBudgetBox.hide(200), (window.curLegal || window.curPaymentPage) && (-1 == window.location.toString().indexOf("budget") || window.curPaymentPage ? nav.go("/ads?act=budget&union_id=" + window.curUnionId) : nav.reload())
            }
    }

    function n(e) {
        return r.innerHTML = getLang("ads_error_unexpected_error_try_later"), hide(o), show(a), window.budgetRequestInProgress = !1, !0
    }
    if (!window.budgetRequestInProgress) {
        var r = ge("budget_error"),
            a = ge("budget_error_box"),
            o = ge("budget_notice_box"),
            t = {};
        t.union_id = window.curUnionId, t.hash = window.curChangeBudgetHash, window.curIsMoney || (t.votes = 1), t.legal = window.curLegal, t.money = AdsPayments.checkBudgetSumInc(!0), 0 != t.money && (window.budgetRequestInProgress = !0, ajax.post("/ads?act=a_union_change_budget", t, {
            onDone: e,
            onFail: n
        }))
    }
}, AdsPayments.reqsInit = function(e) {
    if (cur.params = e, cur.isReqNonResidentWithInnChanged = !1, cur.isReqInnChanged = !1, cur.initialReqInn = e.req_inn, cur.lastReqInn = cur.initialReqInn, cur.isReqsFilled = "" != cur.initialReqInn, cur.contractDate = {
            y: e.contract_day_year,
            m: e.contract_day_month,
            d: e.contract_day_day
        }, cur.contractDayEnabled = e.contract_day_enabled, cur.uiContractDate = !1, cur.uiModerId = !1, cur.uiSegmentId = !1, cur.freeCompany = cur.params.free_company, cur.checkReqInnDelayed = 0, isVisible("row_req_non_resident") && isVisible("row_req_resident_edit") && (cur.uiNonResident0 = new Radiobutton(ge("req_non_resident0"), {
            width: 250,
            label: getLang("ads_reqs_box_resident"),
            onSelect: function(e) {
                AdsPayments.reqsOnChangeNonResident(e)
            }
        }), cur.uiNonResident1 = new Radiobutton(ge("req_non_resident1"), {
            width: 250,
            label: getLang("ads_reqs_box_non_resident"),
            onSelect: function(e) {
                AdsPayments.reqsOnChangeNonResident(e)
            }
        }), Radiobutton.select("req_non_resident", ge("req_non_resident").value)), isVisible("row_currency_num") && (ge("currency_num").removeAttribute("autocomplete"), cur.uiCurrencyNum = new Dropdown(ge("currency_num"), e.currency_data, {
            width: 262,
            selectedItem: e.currency_num
        }), cur.destroy.push(cur.uiCurrencyNum.destroy.bind(cur.uiCurrencyNum)), e.currency_num_disabled && cur.uiCurrencyNum.disable(!0)), isVisible("row_contract_day") && isVisible("row_contract_day_edit") && AdsPayments.reqsReinitContractDay(e.contract_day_year, e.contract_day_month, e.contract_day_day), isVisible("row_segment_id") && isVisible("row_segment_id_edit") && (ge("segment_id").removeAttribute("autocomplete"), cur.uiSegmentId = new Dropdown(ge("segment_id"), e.segments_data, {
            width: 262,
            selectedItem: e.segment_id
        }), cur.destroy.push(cur.uiSegmentId.destroy.bind(cur.uiSegmentId))), isVisible("row_moder_id") && isVisible("row_moder_id_edit") && (ge("moder_id").removeAttribute("autocomplete"), cur.uiModerId = new Dropdown(ge("moder_id"), e.moders_data, {
            width: 262,
            selectedItem: e.moder_id
        }), cur.destroy.push(cur.uiModerId.destroy.bind(cur.uiModerId))), isVisible("row_rules")) {
        var n = new Checkbox(ge("payments_rules"), {
            label: ge("payments_rules_label").innerHTML,
            checked: 0,
            width: 400
        });
        cur.destroy.push(n.destroy.bind(n))
    }
    ge("req_inn").readOnly || elfocus("req_inn")
}, AdsPayments.reqsReinitContractDay = function(e, n, r) {
    if (cur.uiContractDate) cur.uiContractDate.setDate(e, n, r);
    else {
        var a = {
            onUpdate: function(e, n) {
                cur.contractDate = e
            },
            width: 262,
            pastActive: !0,
            year: e,
            month: n,
            day: r
        };
        cur.uiContractDate = new Datepicker(ge("contract_day"), a)
    }
    cur.contractDayEnabled ? cur.uiContractDate.setMode() : cur.uiContractDate.setMode("h")
}, AdsPayments.reqsOnKeyDown = function(e) {
    return e.keyCode == KEY.RETURN && e.ctrlKey ? (AdsPayments.reqsSave(), !1) : !0
}, AdsPayments.reqsOnChangeInn = function(e) {
    var n = e.value;
    n != cur.initialReqInn && n != cur.lastReqInn && (cur.isReqNonResidentWithInnChanged = !1, cur.isReqInnChanged = !0, cur.lastReqInn = n)
}, AdsPayments.reqsCheckInn = function(e) {
    if (e) {
        if (cur.checkReqInnDelayed--, cur.checkReqInnDelayed > 0) return !1;
        var n = ge("company_id").value;
        if (!cur.isReqsFilled && !n && cur.isReqInnChanged) return cur.isReqInnChanged = !1, AdsPayments.reqsSave(!0), !0
    } else cur.checkReqInnDelayed++, setTimeout(function() {
        AdsPayments.reqsCheckInn(!0)
    }, 300);
    return !1
}, AdsPayments.reqsOnChangeNonResident = function(e) {
    "1" == e ? (hide("row_req_okpo"), hide("row_req_bik"), hide("row_req_bank_account"), show("row_req_swift"), show("row_req_iban")) : (show("row_req_okpo"), show("row_req_bik"), show("row_req_bank_account"), hide("row_req_swift"), hide("row_req_iban")), ge("req_inn").value.length && (cur.isReqInnChanged = !0, cur.isReqNonResidentWithInnChanged || (cur.isReqNonResidentWithInnChanged = !0, AdsPayments.reqsCheckInn()))
}, AdsPayments.reqsOnChangeContractNumber = function(e) {
    var n = (("" != e.value) + cur.contractDayEnabled) % 2;
    n && (cur.contractDayEnabled = "" != e.value, cur.contractDayEnabled ? cur.uiContractDate.setMode() : cur.uiContractDate.setMode("h"))
}, AdsPayments.reqsShowWarning = function(e, n) {
    ge("reqs_error").innerHTML = e, show("reqs_error_box"), show("reqs_boxes_padding"), n || Ads.scrollToError("reqs_error_box")
}, AdsPayments.reqsSave = function(e) {
    function n(e) {
        return Ads.unlock("reqsSave"), r(e), !0
    }

    function r(n) {
        var r = isObject(n);
        if (r && n) {
            if (n.company) {
                cur.freeCompany = n.company;
                var a = getLang("ads_error_reqs_inn_found");
                return a = a.replace("{company_name}", cur.freeCompany.req_name), a = a.replace("{link}", '<a href="#" onclick="AdsPayments.reqsApplyFreeCompany(); return false;">').replace("{/link}", "</a>"), void AdsPayments.reqsShowWarning(a)
            }
            if (n.no_inn_company) return void AdsPayments.reqsShowWarning(getLang("ads_error_reqs_inn_free"));
            if (n.ok) return void AdsPayments.reqsGoBack();
            if (n.error) {
                if (AdsPayments.reqsShowWarning(n.error, !!n.elems), n.elems && !e) {
                    var o = n.elems.split(",");
                    for (var t in o) {
                        var i = ge(o[t]);
                        i && notaBene(i)
                    }
                }
                return
            }
            if (n.too_frequently) return
        }
        r || AdsPayments.reqsShowWarning(getLang("ads_error_unexpected_error_try_later"))
    }

    function a(e) {
        show("reqs_progress"), e && show("reqs_inn_progress"), lockButton("reqs_blue_button")
    }

    function o() {
        hide("reqs_progress"), hide("reqs_inn_progress"), unlockButton("reqs_blue_button")
    }
    if (Ads.lock("reqsSave", a.pbind(e), o)) {
        cur.isReqInnChanged = !1;
        var t = extend({}, cur.params.ajax_params),
            i = serializeForm(ge("ads_reqs_edit_form")),
            u = 1e4 * cur.contractDate.y + 100 * cur.contractDate.m + cur.contractDate.d;
        i.contract_day = u, e ? (t.check_inn = 1, t.req_inn = i.req_inn, t.req_non_resident = i.req_non_resident) : extend(t, i), ajax.post("/ads?act=a_save_reqs", t, {
            onDone: n,
            onFail: n
        })
    }
}, AdsPayments.reqsGoBack = function() {
    nav.go(cur.params.back_link)
}, AdsPayments.reqsApplyFreeCompany = function() {
    function e(e) {
        return n.innerHTML = e, n.innerHTML
    }
    if (cur.freeCompany) {
        var n = ce("div"),
            r = {};
        if (r.id = ge("company_id"), r.req_resident_view = ge("req_resident_view"), r.req_name = ge("req_name"), r.req_inn = ge("req_inn"), r.req_kpp = ge("req_kpp"), r.req_okpo = ge("req_okpo"), r.req_bik = ge("req_bik"), r.req_bank_name = ge("req_bank_name"), r.req_bank_city = ge("req_bank_city"), r.req_bank_account = ge("req_bank_account"), r.req_personal_account = ge("req_personal_account"), r.req_address_legal = ge("req_address_legal"), r.req_address_real = ge("req_address_real"), r.req_swift = ge("req_swift"), r.req_iban = ge("req_iban"), r.req_phone = ge("req_phone"), r.req_email = ge("req_email"), r.contract_number = ge("contract_number"), r.contract_day_view = ge("contract_day_view"), r.segment_id_view = ge("segment_id_view"), r.moder_id_view = ge("moder_id_view"), r.id.value = cur.freeCompany.id, r.req_resident_view.value = e(cur.freeCompany.req_resident_view), r.req_name.value = e(cur.freeCompany.req_name), r.req_inn.value = e(cur.freeCompany.req_inn), r.req_kpp.value = e(cur.freeCompany.req_kpp), r.req_okpo.value = e(cur.freeCompany.req_okpo), r.req_bik.value = e(cur.freeCompany.req_bik), r.req_bank_name.value = e(cur.freeCompany.req_bank_name), r.req_bank_city.value = e(cur.freeCompany.req_bank_city), r.req_bank_account.value = e(cur.freeCompany.req_bank_account), r.req_personal_account.value = e(cur.freeCompany.req_personal_account), r.req_address_legal.value = e(cur.freeCompany.req_address_legal), r.req_address_real.value = e(cur.freeCompany.req_address_real), r.req_swift.value = e(cur.freeCompany.req_swift), r.req_iban.value = e(cur.freeCompany.req_iban), r.req_phone.value = e(cur.freeCompany.req_phone), r.req_email.value = e(cur.freeCompany.req_email), r.contract_number.value = e(cur.freeCompany.contract_number), r.contract_day_view.value = e(cur.freeCompany.contract_day_view), r.segment_id_view.value = e(cur.freeCompany.segment_id_view), r.moder_id_view.value = e(cur.freeCompany.moder_id_view), cur.uiNonResident0 && (Radiobutton.select("req_non_resident", cur.freeCompany.req_non_resident), cur.uiNonResident0.disable(!0), cur.uiNonResident1.disable(!0)), cur.uiCurrencyNum && (cur.uiCurrencyNum.selectItem(cur.freeCompany.currency_num), cur.uiCurrencyNum.disable(!0)), "" != cur.freeCompany.contract_number && (show("row_contract_number"), show("row_contract_day")), "" != cur.freeCompany.segment_id_view && show("row_segment_id"), "" != cur.freeCompany.moder_id_view && show("row_moder_id"), "contract_day" in cur.freeCompany)
            if (cur.contractDayEnabled = "" != r.contract_number.value, cur.freeCompany.contract_day) AdsPayments.reqsReinitContractDay(Math.round(cur.freeCompany.contract_day / 1e4), Math.round(cur.freeCompany.contract_day / 100) % 100, Math.round(cur.freeCompany.contract_day) % 100);
            else {
                var a = new Date;
                AdsPayments.reqsReinitContractDay(a.getFullYear(), a.getMonth() + 1, a.getDate())
            }
        "segment_id" in cur.freeCompany && cur.uiSegmentId.selectItem(cur.freeCompany.segment_id), "moder_id" in cur.freeCompany && cur.uiModerId.selectItem(cur.freeCompany.moder_id);
        var o = document.activeElement;
        o && o.blur();
        for (var t in cur.freeCompany.disable) r[t] && (r[t].readOnly = !0, addClass(r[t], "disabled"));
        var i = cur.params.is_ads_posts ? "ads_error_reqs_inn_will_fix_posts" : cur.params.is_ads_offers ? "ads_error_reqs_inn_will_fix_offers" : "ads_error_reqs_inn_will_fix";
        AdsPayments.reqsShowWarning(getLang(i))
    }
};
try {
    stManager.done("ads_payments.js")
} catch (e) {}