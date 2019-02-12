var AdsPayments = {};

AdsPayments.openChangeBudgetBox = function(unionId, moneyType) {
    var ajaxParams = {};
    ajaxParams.union_id = unionId;
    if (moneyType) {
        ajaxParams[moneyType] = 1;
    }

    var showOptions = {
        params: {}
    };
    showOptions.onFail = Ads.onBoxFail;
    showOptions.params.width = 400;
    showOptions.params.bodyStyle = 'line-height: 160%;';

    cur.unionChangeBudgetBox = showBox('/ads?act=a_union_change_budget_box', ajaxParams, showOptions);
}

AdsPayments.checkBudgetSumInc = function(isRequest) {
    var budgetError = ge('budget_error');
    var budgetErrorBox = ge('budget_error_box');
    var budgetNoticeBox = ge('budget_notice_box');

    var strBudgetInc;
    if (window.curLegal) {
        strBudgetInc = ge('union_invoice_sum').value;
    } else {
        strBudgetInc = ge('union_budget_sum').value;
    }

    strBudgetInc = strBudgetInc.replace(',', '.');

    strBudgetInc = strBudgetInc.replace(/^0+/g, '');
    strBudgetInc = strBudgetInc.replace(/(\.\d*?)0+$/g, '$1');
    if (strBudgetInc[0] === '.') {
        strBudgetInc = '0' + strBudgetInc;
    }
    if (strBudgetInc !== '' && strBudgetInc.substr(-1) === '.') {
        strBudgetInc = strBudgetInc.substr(0, strBudgetInc.length - 1);
    }
    if (strBudgetInc === '') {
        strBudgetInc = '0';
    }

    if (strBudgetInc === '0') {
        if (isRequest) {
            budgetError.innerHTML = window.enterMoneyAmount;
            hide(budgetNoticeBox);
            show(budgetErrorBox);
            return false;
        } else {
            hide(budgetErrorBox);
            show(budgetNoticeBox);
            return false;
        }
    }

    var isNormalCheck = true; // False if user want pay all his money.

    if (window.curIsMoney &&
        (window.curOfficeLegal || window.userMoney > cur.paymentsMinMoneyAmount) &&
        !window.curLegal &&
        window.userMoneyStr &&
        strBudgetInc === window.userMoneyStr
    ) {
        isNormalCheck = false;
    }

    if (!strBudgetInc.match(cur.unionsLimits.budget_pattern_all)) {
        budgetError.innerHTML = window.incorrectMoneyFormat;
        hide(budgetNoticeBox);
        show(budgetErrorBox);
        return false;
    }

    if (isNormalCheck && strBudgetInc.indexOf('.') != -1) {
        if (window.curIsMoney &&
            !window.curLegal &&
            (window.curOfficeLegal || window.userMoney > cur.paymentsMinMoneyAmount)
        ) {
            budgetError.innerHTML = window.enterIntegerOrEqualMoney;
        } else {
            budgetError.innerHTML = window.enterIntegerMoney;
        }
        hide(budgetNoticeBox);
        show(budgetErrorBox);
        return false;
    }

    var floatBudgetInc = parseFloat(strBudgetInc);

    if (isNormalCheck && !strBudgetInc.match(cur.unionsLimits.budget_pattern)) {
        budgetError.innerHTML = window.incorrectMoneyFormat;
        hide(budgetNoticeBox);
        show(budgetErrorBox);
        return false;
    }

    if (!window.curLegal) {
        if (floatBudgetInc > window.userMoney) {
            budgetError.innerHTML = (window.curOfficeLegal ? window.lowMoneyOnAccountSimple : window.lowMoneyOnAccount);
            hide(budgetNoticeBox);
            show(budgetErrorBox);
            return false;
        }
    }

    if (window.curIsMoney) {
        if (window.curLegal) {
            if (floatBudgetInc < cur.paymentsMinMoneyAmount) {
                var moneyMin = getLang(window.langMoneyAmount, cur.paymentsMinMoneyAmount);
                budgetError.innerHTML = window.lowMoneyPaymentLegal.replace('{money}', moneyMin);
                hide(budgetNoticeBox);
                show(budgetErrorBox);
                return false;
            }
        } else {
            if (isNormalCheck && floatBudgetInc < cur.paymentsMinMoneyAmount) {
                budgetError.innerHTML = window.lowMoneyPayment;
                hide(budgetNoticeBox);
                show(budgetErrorBox);
                return false;
            }
        }
    } else {
        if (floatBudgetInc < cur.paymentsMinMoneyAmount) {
            budgetError.innerHTML = window.lowMoneyPayment;
            hide(budgetNoticeBox);
            show(budgetErrorBox);
            return false;
        }
    }

    hide(budgetErrorBox);
    show(budgetNoticeBox);

    return strBudgetInc;
}

AdsPayments.onBudgetRublesChanged = function(delayed) {
    if (!window.curPaymentPage) {
        if (delayed) {
            window.changeBudgetDelayedCounter--;
            if (window.changeBudgetDelayedCounter == 0) {
                AdsPayments.checkBudgetSumInc();
            }
            return;
        }
        window.changeBudgetDelayedCounter++;
        setTimeout(function() {
            AdsPayments.onBudgetRublesChanged(true);
        }, 300);
    }

    if (!window.curLegal) {
        if (window.curIsMoney) {
            ge('union_budget_sum_currency').innerHTML = getLang('global_money_amount_rub_text', ge('union_budget_sum').value)
        } else {
            ge('union_budget_sum_currency').innerHTML = getLang('global_money_amount_votes_text', ge('union_budget_sum').value)
        }
    } else {
        ge('union_invoice_sum_currency').innerHTML = getLang(window.langMoneyAmountText, ge('union_invoice_sum').value)
        if (window.curInvoiceFeeFract) {
            var budgetSum = parseFloat(ge('union_invoice_sum').value);
            var feeSum = (isNaN(budgetSum) ? 0 : (budgetSum / (1 - window.curInvoiceFeeFract))).toFixed(2);
            ge('fee_money_sum_full').innerHTML = getLang('ads_payments_legal_sum_with_fee', feeSum);;
        }
    }
}

AdsPayments.changeBudget = function() {
    if (window.budgetRequestInProgress) {
        return;
    }

    var budgetError = ge('budget_error');
    var budgetErrorBox = ge('budget_error_box');
    var budgetNoticeBox = ge('budget_notice_box');

    var ajaxParams = {};
    ajaxParams.union_id = window.curUnionId;
    ajaxParams.hash = window.curChangeBudgetHash;
    if (!window.curIsMoney) {
        ajaxParams.votes = 1;
    }
    ajaxParams.legal = window.curLegal;

    ajaxParams.money = AdsPayments.checkBudgetSumInc(true);
    if (ajaxParams.money == false) {
        return;
    }

    window.budgetRequestInProgress = true;

    ajax.post('/ads?act=a_union_change_budget', ajaxParams, {
        onDone: onAjaxSuccess,
        onFail: onAjaxFail
    });

    function onAjaxSuccess(response) {
        if (isObject(response)) {
            if (response.error) {
                budgetError.innerHTML = response.error;
                hide(budgetNoticeBox);
                show(budgetErrorBox);
                window.budgetRequestInProgress = false;
            } else {
                var elem = ge('general_info_budget');
                if (elem) {
                    elem.innerHTML = response.budget;
                }
                if (cur.unionChangeBudgetBox) {
                    cur.unionChangeBudgetBox.hide(200);
                }
                if (window.curLegal || window.curPaymentPage) {
                    if (window.location.toString().indexOf('budget') != -1 && !window.curPaymentPage) {
                        nav.reload();
                    } else {
                        nav.go('/ads?act=budget&union_id=' + window.curUnionId);
                    }
                }
            }
        }
    }

    function onAjaxFail(response) {
        budgetError.innerHTML = getLang('ads_error_unexpected_error_try_later');
        hide(budgetNoticeBox);
        show(budgetErrorBox);
        window.budgetRequestInProgress = false;
        return true;
    }
}

AdsPayments.reqsInit = function(params) {
    cur.params = params;
    cur.isReqNonResidentWithInnChanged = false;
    cur.isReqInnChanged = false;
    cur.initialReqInn = params.req_inn;
    cur.lastReqInn = cur.initialReqInn;
    cur.isReqsFilled = (cur.initialReqInn != '');
    cur.contractDate = {
        y: params.contract_day_year,
        m: params.contract_day_month,
        d: params.contract_day_day
    };
    cur.contractDayEnabled = params.contract_day_enabled;
    cur.uiContractDate = false;
    cur.uiModerId = false;
    cur.uiSegmentId = false;
    cur.freeCompany = cur.params.free_company;
    cur.checkReqInnDelayed = 0;

    if (isVisible('row_req_non_resident') && isVisible('row_req_resident_edit')) {
        cur.uiNonResident0 = new Radiobutton(ge('req_non_resident0'), {
            width: 250,
            label: getLang('ads_reqs_box_resident'),
            onSelect: function(value) {
                AdsPayments.reqsOnChangeNonResident(value);
            }
        });
        cur.uiNonResident1 = new Radiobutton(ge('req_non_resident1'), {
            width: 250,
            label: getLang('ads_reqs_box_non_resident'),
            onSelect: function(value) {
                AdsPayments.reqsOnChangeNonResident(value);
            }
        });
        Radiobutton.select('req_non_resident', ge('req_non_resident').value);
    }

    if (isVisible('row_currency_num')) {
        ge('currency_num').removeAttribute('autocomplete');
        cur.uiCurrencyNum = new Dropdown(ge('currency_num'), params.currency_data, {
            width: 250 + 12, // 12 - input padding and border
            selectedItem: params.currency_num
        });
        cur.destroy.push(cur.uiCurrencyNum.destroy.bind(cur.uiCurrencyNum));
        if (params.currency_num_disabled) {
            cur.uiCurrencyNum.disable(true);
        }
    }

    if (isVisible('row_contract_day') && isVisible('row_contract_day_edit')) {
        AdsPayments.reqsReinitContractDay(params.contract_day_year, params.contract_day_month, params.contract_day_day);
    }

    if (isVisible('row_segment_id') && isVisible('row_segment_id_edit')) {
        ge('segment_id').removeAttribute('autocomplete');
        cur.uiSegmentId = new Dropdown(ge('segment_id'), params.segments_data, {
            width: 250 + 12, // 12 - input padding and border
            selectedItem: params.segment_id
        });
        cur.destroy.push(cur.uiSegmentId.destroy.bind(cur.uiSegmentId));
    }

    if (isVisible('row_moder_id') && isVisible('row_moder_id_edit')) {
        ge('moder_id').removeAttribute('autocomplete');
        cur.uiModerId = new Dropdown(ge('moder_id'), params.moders_data, {
            width: 250 + 12, // 12 - input padding and border
            selectedItem: params.moder_id
        });
        cur.destroy.push(cur.uiModerId.destroy.bind(cur.uiModerId));
    }

    if (isVisible('row_rules')) {
        var uiRules = new Checkbox(ge('payments_rules'), {
            label: ge('payments_rules_label').innerHTML,
            checked: 0,
            width: 400
        });
        cur.destroy.push(uiRules.destroy.bind(uiRules));
    }

    if (!ge('req_inn').readOnly) {
        elfocus('req_inn');
    }
}

AdsPayments.reqsReinitContractDay = function(year, month, day) {
    if (cur.uiContractDate) {
        cur.uiContractDate.setDate(year, month, day);
    } else {
        var datePickerOptions = {
            onUpdate: function(date, mode) {
                cur.contractDate = date;
            },
            //mode: 'h',
            width: 250 + 12, // 12 - input padding and border
            pastActive: true,
            year: year,
            month: month,
            day: day
        };
        cur.uiContractDate = new Datepicker(ge('contract_day'), datePickerOptions);
    }
    if (cur.contractDayEnabled) {
        cur.uiContractDate.setMode();
    } else {
        cur.uiContractDate.setMode('h');
    }
}

AdsPayments.reqsOnKeyDown = function(event) {
    if (event.keyCode == KEY.RETURN && event.ctrlKey) {
        AdsPayments.reqsSave();
        return false;
    }
    return true;
}

AdsPayments.reqsOnChangeInn = function(elem) {
    var newValue = elem.value;
    if (newValue != cur.initialReqInn && newValue != cur.lastReqInn) {
        cur.isReqNonResidentWithInnChanged = false;
        cur.isReqInnChanged = true;
        cur.lastReqInn = newValue;
    }
}

AdsPayments.reqsCheckInn = function(delayed) {
    if (delayed) {
        cur.checkReqInnDelayed--;
        if (cur.checkReqInnDelayed > 0) {
            return false;
        }
        var companyId = ge('company_id').value;
        if (!cur.isReqsFilled && !companyId && cur.isReqInnChanged) {
            cur.isReqInnChanged = false;
            AdsPayments.reqsSave(true);
            return true;
        }
    } else {
        cur.checkReqInnDelayed++;
        setTimeout(function() {
            AdsPayments.reqsCheckInn(true);
        }, 300);
    }
    return false;
}

AdsPayments.reqsOnChangeNonResident = function(value) {
    if (value == '1') {
        hide('row_req_okpo');
        hide('row_req_bik');
        hide('row_req_bank_account');
        show('row_req_swift');
        show('row_req_iban');
    } else {
        show('row_req_okpo');
        show('row_req_bik');
        show('row_req_bank_account');
        hide('row_req_swift');
        hide('row_req_iban');
    }
    if (ge('req_inn').value.length) {
        cur.isReqInnChanged = true;
        if (!cur.isReqNonResidentWithInnChanged) {
            cur.isReqNonResidentWithInnChanged = true;
            AdsPayments.reqsCheckInn();
        }
    }
}

AdsPayments.reqsOnChangeContractNumber = function(elem) {
    var changed = ((elem.value != '') + cur.contractDayEnabled) % 2;
    if (!changed) {
        return;
    }
    cur.contractDayEnabled = (elem.value != '');
    if (cur.contractDayEnabled) {
        cur.uiContractDate.setMode();
    } else {
        cur.uiContractDate.setMode('h');
    }
}

AdsPayments.reqsShowWarning = function(message, noScroll) {
    ge('reqs_error').innerHTML = message;
    show('reqs_error_box');
    show('reqs_boxes_padding');
    if (!noScroll) {
        Ads.scrollToError('reqs_error_box');
    }
}

AdsPayments.reqsSave = function(checkInnOnly) {
    if (!Ads.lock('reqsSave', onLock.pbind(checkInnOnly), onUnlock)) {
        return;
    }

    cur.isReqInnChanged = false;

    var ajaxParams = extend({}, cur.params.ajax_params);
    var formData = serializeForm(ge('ads_reqs_edit_form'));
    var contractDay = cur.contractDate.y * 10000 + cur.contractDate.m * 100 + cur.contractDate.d;
    formData['contract_day'] = contractDay;
    if (checkInnOnly) {
        ajaxParams.check_inn = 1;
        ajaxParams.req_inn = formData.req_inn;
        ajaxParams.req_non_resident = formData.req_non_resident;
    } else {
        extend(ajaxParams, formData);
    }

    ajax.post('/ads?act=a_save_reqs', ajaxParams, {
        onDone: onCompleteWrap,
        onFail: onCompleteWrap
    });

    function onCompleteWrap(response) {
        Ads.unlock('reqsSave');
        onComplete(response);
        return true;
    }

    function onComplete(response) {
        var isOk = isObject(response);
        if (isOk && response) {
            if (response.company) {
                cur.freeCompany = response.company;
                var message = getLang('ads_error_reqs_inn_found');
                message = message.replace('{company_name}', cur.freeCompany.req_name);
                message = message.replace('{link}', '<a href="#" onclick="AdsPayments.reqsApplyFreeCompany(); return false;">').replace('{/link}', '</a>')
                AdsPayments.reqsShowWarning(message);
                return;
            }
            if (response.no_inn_company) {
                AdsPayments.reqsShowWarning(getLang('ads_error_reqs_inn_free'));
                return;
            }
            if (response.ok) {
                AdsPayments.reqsGoBack();
                return;
            }
            if (response.error) {
                AdsPayments.reqsShowWarning(response.error, !!response.elems);
                if (response.elems && !checkInnOnly) {
                    var elems = response.elems.split(',');
                    for (var i in elems) {
                        var highlightElem = ge(elems[i]);
                        if (highlightElem) {
                            notaBene(highlightElem);
                        }
                    }
                }
                return;
            }
            if (response.too_frequently) {
                return;
            }
        }
        if (!isOk) {
            AdsPayments.reqsShowWarning(getLang('ads_error_unexpected_error_try_later'))
        }
    }

    function onLock(checkInnOnly) {
        show('reqs_progress');
        if (checkInnOnly) {
            show('reqs_inn_progress');
        }
        lockButton('reqs_blue_button');
    }

    function onUnlock() {
        hide('reqs_progress');
        hide('reqs_inn_progress');
        unlockButton('reqs_blue_button');
    }
}

AdsPayments.reqsGoBack = function() {
    nav.go(cur.params.back_link);
}

AdsPayments.reqsApplyFreeCompany = function() {
    if (!cur.freeCompany) {
        return;
    }

    var converter = ce('div');

    function convertHtml(value) {
        converter.innerHTML = value;
        return converter.innerHTML;
    }

    var elems = {};
    elems['id'] = ge('company_id');
    elems['req_resident_view'] = ge('req_resident_view');
    elems['req_name'] = ge('req_name');
    elems['req_inn'] = ge('req_inn');
    elems['req_kpp'] = ge('req_kpp');
    elems['req_okpo'] = ge('req_okpo');
    elems['req_bik'] = ge('req_bik');
    elems['req_bank_name'] = ge('req_bank_name');
    elems['req_bank_city'] = ge('req_bank_city');
    elems['req_bank_account'] = ge('req_bank_account');
    elems['req_personal_account'] = ge('req_personal_account');
    elems['req_address_legal'] = ge('req_address_legal');
    elems['req_address_real'] = ge('req_address_real');
    elems['req_swift'] = ge('req_swift');
    elems['req_iban'] = ge('req_iban');
    elems['req_phone'] = ge('req_phone');
    elems['req_email'] = ge('req_email');
    elems['contract_number'] = ge('contract_number');
    elems['contract_day_view'] = ge('contract_day_view');
    elems['segment_id_view'] = ge('segment_id_view');
    elems['moder_id_view'] = ge('moder_id_view');

    elems['id'].value = cur.freeCompany.id;
    elems['req_resident_view'].value = convertHtml(cur.freeCompany.req_resident_view);
    elems['req_name'].value = convertHtml(cur.freeCompany.req_name);
    elems['req_inn'].value = convertHtml(cur.freeCompany.req_inn);
    elems['req_kpp'].value = convertHtml(cur.freeCompany.req_kpp);
    elems['req_okpo'].value = convertHtml(cur.freeCompany.req_okpo);
    elems['req_bik'].value = convertHtml(cur.freeCompany.req_bik);
    elems['req_bank_name'].value = convertHtml(cur.freeCompany.req_bank_name);
    elems['req_bank_city'].value = convertHtml(cur.freeCompany.req_bank_city);
    elems['req_bank_account'].value = convertHtml(cur.freeCompany.req_bank_account);
    elems['req_personal_account'].value = convertHtml(cur.freeCompany.req_personal_account);
    elems['req_address_legal'].value = convertHtml(cur.freeCompany.req_address_legal);
    elems['req_address_real'].value = convertHtml(cur.freeCompany.req_address_real);
    elems['req_swift'].value = convertHtml(cur.freeCompany.req_swift);
    elems['req_iban'].value = convertHtml(cur.freeCompany.req_iban);
    elems['req_phone'].value = convertHtml(cur.freeCompany.req_phone);
    elems['req_email'].value = convertHtml(cur.freeCompany.req_email);
    elems['contract_number'].value = convertHtml(cur.freeCompany.contract_number);
    elems['contract_day_view'].value = convertHtml(cur.freeCompany.contract_day_view);
    elems['segment_id_view'].value = convertHtml(cur.freeCompany.segment_id_view);
    elems['moder_id_view'].value = convertHtml(cur.freeCompany.moder_id_view);

    if (cur.uiNonResident0) {
        Radiobutton.select('req_non_resident', cur.freeCompany.req_non_resident);
        cur.uiNonResident0.disable(true);
        cur.uiNonResident1.disable(true);
    }

    if (cur.uiCurrencyNum) {
        cur.uiCurrencyNum.selectItem(cur.freeCompany.currency_num);
        cur.uiCurrencyNum.disable(true);
    }

    if (cur.freeCompany.contract_number != '') {
        show('row_contract_number');
        show('row_contract_day');
    }
    if (cur.freeCompany.segment_id_view != '') {
        show('row_segment_id');
    }
    if (cur.freeCompany.moder_id_view != '') {
        show('row_moder_id');
    }

    if ('contract_day' in cur.freeCompany) {
        cur.contractDayEnabled = (elems['contract_number'].value != '');
        if (cur.freeCompany.contract_day) {
            AdsPayments.reqsReinitContractDay(Math.round(cur.freeCompany.contract_day / 10000), Math.round(cur.freeCompany.contract_day / 100) % 100, Math.round(cur.freeCompany.contract_day) % 100);
        } else {
            var dateNow = new Date();
            AdsPayments.reqsReinitContractDay(dateNow.getFullYear(), dateNow.getMonth() + 1, dateNow.getDate());
        }
    }

    if ('segment_id' in cur.freeCompany) {
        cur.uiSegmentId.selectItem(cur.freeCompany.segment_id);
    }

    if ('moder_id' in cur.freeCompany) {
        cur.uiModerId.selectItem(cur.freeCompany.moder_id);
    }

    var activeElem = document.activeElement;
    if (activeElem) {
        activeElem.blur();
    }

    for (var i in cur.freeCompany.disable) {
        if (elems[i]) {
            elems[i].readOnly = true;
            addClass(elems[i], 'disabled');
        }
    }

    var langKey = (cur.params.is_ads_posts ? 'ads_error_reqs_inn_will_fix_posts' : (cur.params.is_ads_offers ? 'ads_error_reqs_inn_will_fix_offers' : 'ads_error_reqs_inn_will_fix'));
    AdsPayments.reqsShowWarning(getLang(langKey));
}

try {
    stManager.done('ads_payments.js');
} catch (e) {}