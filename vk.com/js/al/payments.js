var Payments = {
    startFormMeasure: function() {
        cur.formMeasureTime = Date.now();
        if (vk.dev) {
            debugLog(cur.formMeasureTime);
        }
    },
    finishFormMeasure: function(ps_name) {
        if (cur.formMeasureTime) {
            var measured = Date.now() - cur.formMeasureTime;
            if (vk.dev) {
                debugLog(measured);
            }
            delete cur.formMeasureTime;
            statlogsValueEvent('payments_frame_load_time', measured, ps_name);
        }
    }
};

Payments.init = function() {}

Payments.cardsVerifySumHowTo = function() {
    showFastBox(getLang('payments_verify_sum_howto_header'), getLang('payments_verify_sum_howto_dialog'));
    return false;
}

Payments.masterbankVerifySumDialog = function() {
    cur.mb_verify_sum_dialog = showFastBox(getLnag('payments_verify_sum_header'), mb_verify_sum_dialog_content, getLang('box_send'), Payments.masterbankSubmitVerifySum, getLang('box_cancel'));
    setTimeout(function() {
        ge('verify_sum_input').focus()
    }, 50);
    return false;
}

Payments.masterbankSubmitVerifySum = function() {
    var verify_sum_input = ge('verify_sum_input');
    var sum;
    if (verify_sum_input) {
        sum = parseFloat(verify_sum_input.value.replace(",", "."));
    } else {
        sum = cur.cards_submitted_sum;
    }
    if (!sum || sum <= 0) {
        verify_sum_input.focus();
        return;
    }

    hide('card_verification_content');
    show('card_verification_please_wait');
    if (cur.mb_verify_sum_dialog) {
        cur.mb_verify_sum_dialog.removeButtons();
    }
    cur.cards_submitted_sum = sum;
    var ajaxParams = {
        sum: sum,
        currency: cur.ui_verify_sum_currency.val()
    };
    if (cur.isAdsPayment) {
        ajaxParams.payment_account_id = cur.paymentAccountId;
        ajaxParams.account_hash = cur.masterbankAccountHash;
    }
    ajax.plainpost('/payments.php?act=masterbank_verify_sum', ajaxParams, function(data) {
        Payments.masterbankVerifyCheck(data);
    });
}

Payments.masterbankVerifyCheck = function(data, from_recheck) {
    data = data.split(",");
    var tries = parseInt(data[0]);
    if (tries == -2) {
        if (!from_recheck) {
            fadeIn(ge('verify_please_wait'), 300);
            if (!ge('verify_please_wait')) {
                return;
            }
            cur.mb_verify_sum_dialog.addButton(getLang('box_cancel'), function() {
                clearTimeout(cur.cards_recheck_timeout);
                cur.mb_verify_sum_dialog.hide();
            }, 'no');
        }
        cur.cards_recheck_timeout = setTimeout(Payments.masterbankVerifyRecheck, 25000);
    } else if (tries == -1) {
        Payments.masterbankSumVerified(data);
    } else if (tries > 0) {
        if (tries < 4) {
            var word = langNumeric(tries, payments_N_tries_left_msg);
        }
        cur.mb_verify_sum_dialog.addButton(getLang('box_cancel'), false, 'no');
        cur.mb_verify_sum_dialog.addButton(getLang('box_send'), Payments.masterbankSubmitVerifySum);

        show('card_verification_bad_sum');
        show('card_verification_content');
        hide('card_verification_please_wait');
    } else {
        cur.mb_verify_sum_dialog.addButton(getLang('box_close'), function() {
            Payments.masterbankDoVerifyStartOver();
            cur.mb_verify_sum_dialog.hide();
        });
        cur.mb_verify_sum_dialog.content(payment_no_more_tries_msg);
    }
}

Payments.masterbankVerifyRecheck = function() {
    if (!ge('verify_please_wait')) {
        return;
    }
    var ajaxParams = {
        sum: cur.cards_submitted_sum
    };
    if (cur.isAdsPayment) {
        ajaxParams.payment_account_id = cur.paymentAccountId;
        ajaxParams.account_hash = cur.masterbankAccountHash;
    }
    ajax.plainpost('/payments.php?act=masterbank_verify_sum', ajaxParams, function(data) {
        Payments.masterbankVerifyCheck(data, true);
    });
}

Payments.masterbankSumVerified = function(data) {
    //  ge('card_number').innerHTML = data[1];
    var close_func = function() {
        cur.mb_verify_sum_dialog.hide();
        if (cur.isAdsPayment) {
            nav.go('/ads?act=payments&union_id=' + cur.paymentAccountId + '&expand_type=card&result=success&card_activated=1');
        } else {
            window.location = '/payments.php?act=landing&type=card&result=success&activated=1';
        }
    }
    cur.mb_verify_sum_dialog.content(getLang('payments_card_verified_msg'));
    cur.mb_verify_sum_dialog.addButton(getLang('box_close'), close_func);
    setTimeout(close_func, 5000);
}

Payments.masterbankVerifyStartOver = function(is_verified) {
    var warning = getLang('payments_really_start_over_msg');
    if (is_verified) {
        warning = getLang('payments_really_use_other_msg');
    }
    showFastBox(getLang('payments_verify_start_over_header'), warning, getLang('box_yes'), Payments.masterbankDoVerifyStartOver, getLang('box_no'));
    return false;
}

Payments.masterbankDoVerifyStartOver = function() {
    cur.mb_verify_sum_dialog.removeButtons();
    cur.mb_verify_sum_dialog.content("<img style='margin: 3px auto 0 auto; display: block; width: 149px; height: 8px;' src='/images/progress7.gif'>");
    var ajaxParams = {};
    if (cur.isAdsPayment) {
        ajaxParams.payment_account_id = cur.paymentAccountId;
        ajaxParams.account_hash = cur.masterbankAccountHash;
    }
    ajax.plainpost("/payments.php?act=masterbank_verify_start_over", ajaxParams, onDone);

    function onDone() {
        if (cur.isAdsPayment) {
            window.location.href = '/ads?act=payments&union_id=' + cur.paymentAccountId + '&expand_type=card#type_card';
        } else {
            window.location.href = '/payments.php?act=addfunds&type=card#type_card';
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        }
    }
}

Payments.masterbankSubmitPaymentForm = function(random_auth, min_amount) {
    if (!cur.mobile_activated) {
        var onDoneActivate = function() {
            cur.mobile_activated = true;
            Payments.masterbankSubmitPaymentForm(random_auth, min_amount);
        }
        activateMobileBox({
            onDone: onDoneActivate
        });
        return false;
    }
    random_auth = intval(random_auth);
    if (!random_auth) {
        var sum = parseFloat(ge('input_sum').value.replace(/[^\d.,]/g, "")).toFixed(2);
        if (!sum || sum <= 0 || isNaN(sum)) {
            showFastBox(getLang('payments_error'), getLang('payments_please_enter_money'), getLang('box_cancel'));
            return false;
        }
        var originalSum = parseFloat(ge('input_money').value.replace(/[^\d.,]/g, "")).toFixed(2);
        if (cur.isAdsPayment && originalSum < min_amount) {
            var error = getLang('payments_min_amount_limit_rubles').replace('%s', min_amount);
            showFastBox(getLang('payments_error'), error, getLang('box_cancel'));
            return false;
        }
        ge('amount').value = sum;
    }

    if (cur.submitted) {
        return false;
    }
    cur.submitted = true;


    var cards_button = ge('submit_cards_button');
    lockButton(cards_button);

    onOrderCreated = function(result) {
        var order_id = result && intval(result['order_id']);
        if (order_id > 0) {
            ge('order').value = order_id;
            ge('merch_url').value += "&order_id=" + order_id;
            ge('timestamp').value = result.timestamp;
            ge('masterbank_form').submit();
        } else {
            if (result && result.error_title && result.error_text) {
                showFastBox(result.error_title, result.error_text, getLang('payments_close'));
            }
            unlockButton(cards_button);
            cur.submitted = false;
        }
        return true;
    }
    var ajaxParams = {
        hash: cur.masterbankHash,
        amount: sum,
        random_auth: random_auth
    };
    if (cur.isAdsPayment) {
        ajaxParams.payment_account_id = cur.paymentAccountId;
        ajaxParams.account_hash = cur.masterbankAccountHash;
    }
    ajax.post("/payments.php?act=a_masterbank_order", ajaxParams, {
        onDone: onOrderCreated,
        onFail: onOrderCreated
    });
    return false;
}

Payments.scrollTo = function(el) {
    offset = Payments.getOffset(ge(el)).top;
    animate(document.getElementsByTagName('html')[0], {
        scrollTop: offset
    });
    animate(document.getElementsByTagName('body')[0], {
        scrollTop: offset
    });
}

Payments.getOffset = function(elem) {
    if (elem.getBoundingClientRect) {
        return Payments.getOffsetRect(elem)
    } else {
        return Payments.getOffsetSum(elem)
    }
}

Payments.getOffsetSum = function(elem) {
    var top = 0,
        left = 0
    while (elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }
    return {
        top: top,
        left: left
    }
}

Payments.getOffsetRect = function(elem) {
    var box = elem.getBoundingClientRect()
    var body = document.body
    var docElem = document.documentElement
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    var top = box.top + scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    return {
        top: Math.round(top),
        left: Math.round(left)
    }
}

// Popup functions

Payments.submitPopupForm = function(ps_name, amount_votes, amount_rub, amount_usd) {
    var form = document.getElementById('popup_payment_form');
    if (typeof Payments['process_' + ps_name] == 'function') {
        Payments['process_' + ps_name](form, amount_votes, amount_rub, amount_usd);
    } else {
        form.submit();
    }
}

// Pre-submit functions for payment systems

// Used as 'Payments.process_'+something
Payments.process_checkout = function(form, amount_votes, amount_rub, amount_usd) {
    var onDone = function(result) {
        result = eval('(' + result + ')');
        html = '';
        html += '<input type="hidden" name="cart" value="' + result.cart + '"/>';
        html += '<input type="hidden" name="signature" value="' + result.signature + '"/>';
        form.innerHTML += html;
        form.submit();
    }
    ajax.plainpost("/payments.php?act=a_checkout_cart", {
        votes: amount_votes
    }, onDone);
}

Payments.expandTerminalRow = function(obj) {
    var div_descr = geByClass('term_description', obj)[0];
    if (div_descr.style.display != 'block') {
        addClass(obj, 'selected');
        slideDown(div_descr, 300, function() {
            addClass(obj, 'selected');
        });
    } else {
        removeClass(obj, 'selected');
        slideUp(div_descr, 300, function() {
            removeClass(obj, 'selected');
        });
    }
    return false;
}

Payments.expandPaymentSystemForm = function(obj) {
    var parent = obj.parentNode;
    var ps_name = parent.id.substring(15);

    var div_descr = geByClass('payment_system_description', parent)[0];
    var div_logo = geByClass('payment_system_logo', parent)[0];
    if (div_descr.style.display != 'block') {
        addClass(parent, 'selected');
        slideDown(div_descr, 300, function() {
            try {
                ge('amount_' + ps_name).focus();
            } catch (e) {}
            addClass(parent, 'selected');
        });
    } else {
        removeClass(parent, 'selected');
        slideUp(div_descr, 300, function() {
            removeClass(parent, 'selected');
        });
    }
    return false;
}

Payments.expandPaymentDescription = function(type) {
    var el = ge('ps_select_' + type);
    if (!el) {
        return;
    }

    var expandSpeed = 300;

    if (!cur.expand_status) {
        cur.expand_status = {};
    }

    if (cur.expand_status[type] === undefined || cur.expand_status[type] === false || cur.expand_status[type] === '') {
        cur.expand_status[type] = true;
        addClass(ge('ps_expand_link_' + type), 'hidden')

        slideDown(el, expandSpeed);

        if (type == 'sms') {
            window.feedback_service = 0;
        } else if (type == 'payment_system') {
            window.feedback_service = 1;
        } else if (type == 'terminal') {
            window.feedback_service = 0;
        } else if (type == 'wire') {
            window.feedback_service = 4;
        } else if (type == 'card') {
            window.feedback_service = 3;
        } else {
            window.feedback_service = 0;
        }
    } else {
        cur.expand_status[type] = false;

        slideUp(el, expandSpeed, function() {
            removeClass(ge('ps_expand_link_' + type), 'hidden');
        });
    }
}

Payments.paymentCheckAmount = function(o) {
    var v = o.value.replace(/[^0-9��.,]/g, "");
    v = v.replace(/[,��]/, ".");
    var i = parseInt(v);
    if (i >= 100000) v = parseInt(i.toString().substr(0, 5)) + Math.floor((v - i) * 100) / 100;
    if (o.value != v)
        o.value = v;
}

Payments.paymentComplete = function(new_url, params) {
    Payments.isPaymentComplete = true;
    if (cur.isAdsPayment) {
        new_url = new_url.replace(/payments\.php\?act=\w+/, 'ads?act=payments');
        if (new_url.indexOf('&union_id=') == -1) {
            new_url += "&union_id=" + cur.paymentAccountId;
        }
    }
    scrollToTop();
    if (cur.isAdsPayment) {
        nav.go(new_url);
    } else {
        window.location = new_url;
    }
    if (cur.mb_payment_in_process) {
        cur.mb_payment_in_process.hide();
    }
}

Payments.adsConfirmGoPaymentSystem = function(func) {
    var confirmMessage = getLang('ads_payments_confirm_go').replace('{office_id}', ge('payment_account_id_view').innerHTML);
    var confirmBox = showFastBox('��������', confirmMessage, getLang('payments_payment_system_submit'), function() {
        func();
        confirmBox.hide();
    }, getLang('box_close'));
}

Payments.adsToggleEmail = function(el) {
    var cont = gpeByClass('_ps_wrap', el);
    if (el.tagName === 'INPUT') {
        el = geByClass1('_checkbox', cont);
        if (isChecked(el)) return;
    }
    checkbox(el);
    if (isChecked(el)) {
        elfocus(geByClass1('_receipt_email', cont));
    }
}

Payments.validateEmail = function(email) {
    return email.length < 64 && email.match(/^.{1,40}@.{1,40}$/) && email.match(/^([a-z0-9_\-]{0,40}\.){0,10}[a-z0-9_\-*]{1,40}@(([a-z0-9][a-z0-9_\-]{0,40})?[a-z0-9]\.){1,6}[a-z]{2,7}$/i);
}

var MoneyTransfer = {
    init: function() {
        var box = curBox();
        if (ge('payments_box') != geByClass1('payments_money_transfer_box', box.bodyNode) && _message_boxes.length > 1) {
            var fl = true;
            _message_boxes.forEach(function(b, k) {
                if (fl && ge('payments_box') == geByClass1('payments_money_transfer_box', b.bodyNode)) {
                    boxLayer.removeChild(gpeByClass('popup_box_container', b.bodyNode));
                    delete _message_boxes[k];
                    fl = false;
                }
            });
        }

        box.setOptions({
            grey: true
        });
        if (cur.paymentsOptions.requestId) {
            box.changed = true;
            box.setOptions({
                width: 510
            });
            MoneyTransfer.send();
        }
        placeholderInit('transfer_amount');
        placeholderInit('transfer_comment');
        if (cur.paymentsOptions.isChat) {
            placeholderInit('transfer_chunk_amount');
            cur.autoacceptCardDD = new InlineDropdown('transfer_autoaccept_card', {
                items: cur.paymentsOptions.cards,
                selected: cur.paymentsOptions.cardSeleceted,
                withArrow: true,
                onShow: MoneyTransfer.enableAutoaccept,
                onSelect: function(v) {
                    if (v == -1) {
                        MoneyTransfer.sendBind();
                    }
                }
            });
            cur.autoacceptCardEl = ge('transfer_autoaccept_card');
            toggleClass('transfer_autoaccept_card', 'disabled', !cur.paymentsOptions.autoAcceptEnabled);
            if (cur.paymentsOptions.autoAcceptEnabled) {
                checkbox('transfer_autoaccept', true);
            }
            if (cur.paymentsOptions.cards.length < 2) {
                var link = ce('a', {
                    id: 'payments_money_transfer_new_card_lnk',
                    innerHTML: getLang('payments_money_transfer_new_card')
                });
                addEvent(link, 'mousedown', MoneyTransfer.sendBind);
                hide(cur.autoacceptCardEl);
                cur.autoacceptCardEl.parentNode.appendChild(link);
            }
        } else if (ge('transfer_to')) {
            hide('payments_money_transfer_user');
            var is_transfer_tab = cur.paymentsOptions.boxTab === 'transfer';

            cur.uiTransferTo = Dropdown(
                ge('transfer_to'),
                cur.paymentsOptions.friends.filter(function(r) {
                    return is_transfer_tab || r[7] === true;
                }), {
                    big: true,
                    introText: getLang('votes_transfer_start_typing_recipient'),
                    noResult: '',
                    placeholder: getLang('votes_transfer_choose_recipients'),
                    placeholderColored: true,
                    multiselect: false,
                    enableCustom: true,
                    autocomplete: true,
                    imageId: 'transfer_to_photo',
                    indexkeys: [1, 4],
                    noImageSrc: '/images/blank.gif',
                    onChange: function(value) {
                        if (!value || value == -1) return;
                        var transfer_to = cur.uiTransferTo.val_full();
                        cur.paymentsOptions.toId = transfer_to[0];
                        cur.paymentsOptions.hash = transfer_to[5];
                        val('payments_money_transfer_summary', transfer_to[6]);
                        setTimeout(elfocus.pbind('transfer_amount'), 100);
                    }
                });

            cur.destroy.push(cur.uiTransferTo.destroy.bind(cur.uiTransferTo));
        }
        setTimeout(elfocus.pbind('transfer_amount'), 100);
        shortCurrency();
        if (browser.mozilla) {
            MoneyTransfer.checkTrackingProtection(true, true);
        }
        MoneyTransfer.autosizeAmount();
        MoneyTransfer.cookieTroubleCounter = 0;
    },
    send: function() {
        var box = curBox(),
            btn = ge('payments_money_transfer_send');
        if (isButtonLocked(btn)) return;

        if (!cur.paymentsOptions.toId && cur.uiTransferTo) {
            notaBene(cur.uiTransferTo.container);
            return;
        }
        if (!isChecked('transfer_no_amount')) {
            var amount = val('transfer_amount');
            if (!amount || amount <= 0) {
                addClass('payments_money_transfer_amount_wrap', 'money_error');
                setTimeout(removeClass.pbind('payments_money_transfer_amount_wrap', 'money_error'), 500);
                elfocus('transfer_amount');
                return;
            } else if (!MoneyTransfer.checkAmount(amount, true)) {
                return;
            }
        } else {
            var amount = 0;
        }

        if (cur.paymentsOptions.boxTab == 'request') {
            MoneyTransfer.sendReqest(amount);
            return;
        }

        var popupUrl = MoneyTransfer.createFrame();

        var params = {
            to_id: cur.paymentsOptions.toId,
            owner_id: cur.paymentsOptions.ownerId,
            amount: amount,
            currency: cur.paymentsOptions.currency,
            comment: val('transfer_comment'),
            from: cur.paymentsOptions.from,
            hash: cur.paymentsOptions.hash
        };
        if (cur.paymentsOptions.requestId) {
            params.request_id = cur.paymentsOptions.requestId;
        }
        val('payments_box_error', '');
        ajax.post('al_payments.php?act=a_init_money_transfer', params, {
            onDone: function(data, html) {
                cur._popup_text = html;
                cur._popup_callback = function() {
                    hide('payments_money_transfer_wrap', 'payments_money_transfer_buttons', 'payments_box_error', 'payments_money_transfer_prg', 'payments_iframe_cookie_trouble', 'payments_iframe_cookie_disabled_div');
                    show('payments_money_transfer_iframe', 'payments_iframe_container');
                    if (cur.uiTransferTo) {
                        hide('payments_money_transfer_user_select');
                        show('payments_money_transfer_user');
                    }
                    ge('payments_iframe_container').scrollTop = 0;
                    window.addEventListener('message', MoneyTransfer.frameMessage, false);

                    box.changed = true;
                    box.setOptions({
                        width: 510
                    });
                    if (!cur.paymentsOptions.requestId && isVisible(box.titleWrap)) {
                        box.setBackTitle(MoneyTransfer.resetSendBox);
                    }
                    setStyle(iframe, {
                        width: (ge('payments_iframe_container').parentNode.offsetWidth - sbWidth()) + 'px'
                    });
                }
                if (!popupUrl) {
                    var iframe = ge('transfer_iframe');
                    iframe.contentWindow.document.open('text/html', 'replace');
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.close();
                    cur._popup_callback();
                }
                if (browser.mozilla && !cur.trackingProtectionOff) {
                    MoneyTransfer.trackingProtectionDivVisibility(true);
                }
                MoneyTransfer.startCheckStatus(data);
            },
            onFail: function(msg) {
                MoneyTransfer.showError(msg);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    sendReqest: function(amount) {
        var btn = ge('payments_money_transfer_send');
        var params = {
            to_id: cur.paymentsOptions.toId,
            owner_id: cur.paymentsOptions.ownerId,
            amount: amount,
            currency: cur.paymentsOptions.currency,
            comment: val('transfer_comment'),
            from: cur.paymentsOptions.from,
            hash: cur.paymentsOptions.hash
        };
        if (cur.paymentsOptions.isChat) {
            params.total_amount = parseInt(amount);
            params.amount = parseInt(val('transfer_chunk_amount'));
            params.pin_message = isChecked('transfer_pin_message') ? 1 : 0;
            if (isChecked('transfer_autoaccept')) {
                if (cur.autoacceptCardDD) {
                    params.accept_card = cur.autoacceptCardDD.val();
                }
                if (!params.accept_card || params.accept_card == -1) {
                    MoneyTransfer.showError(getLang('payments_money_request_error_no_accept_card'));
                    return false;
                }
            }

            var error = false;
            if (cur.paymentsOptions.minAmount && params.amount < cur.paymentsOptions.minAmount) {
                error = getLang('payments_money_request_error_min_chunk_amount_currency')
            } else if (cur.paymentsOptions.maxAmount && params.amount > cur.paymentsOptions.maxAmount) {
                error = getLang('payments_money_request_error_max_chunk_amount_currency');
            } else if (params.total_amount && params.amount > params.total_amount) {
                error = getLang('payments_money_request_error_chunk_amount_too_big');
            }
            if (error) {
                MoneyTransfer.showError(error);
                notaBene('transfer_chunk_amount');
                return false;
            }
        }
        val('payments_box_error', '');
        ajax.post('al_payments.php?act=a_send_money_request', params, {
            onDone: function(text) {
                curBox().hide();
                showDoneBox(text, {
                    out: 6000
                });
            },
            onFail: function(msg) {
                MoneyTransfer.showError(msg);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    sendBind: function() {
        var box = curBox();
        var popupUrl = MoneyTransfer.createFrame();

        hide('payments_money_transfer_wrap', 'payments_money_transfer_buttons', 'payments_box_error', 'payments_money_transfer_summary_wrap', 'payments_iframe_container', geByClass1('msg', 'payments_money_transfer_iframe'));
        show('payments_money_transfer_iframe', 'payments_money_transfer_prg');
        box.setBackTitle(MoneyTransfer.resetSendBox);
        box.setOptions({
            width: 510
        });

        var params = {
            type: 'card',
            only_auth: 1,
            hash: cur.paymentsOptions.bindHash
        };
        val('payments_box_error', '');
        ajax.post('al_payments.php?act=a_getvotes_charge', params, {
            onDone: function(data, html) {
                cur._popup_text = html;
                cur._popup_callback = function() {
                    hide('payments_money_transfer_prg');
                    show('payments_iframe_container');
                    ge('payments_iframe_container').scrollTop = 0;
                    window.addEventListener('message', MoneyTransfer.frameMessage, false);

                    if (cur.autoacceptCardDD && isVisible(cur.autoacceptCardEl)) {
                        cur.autoacceptCardDD.select(cur.paymentsOptions.cards[0][0]);
                    }

                    box.changed = true;
                    setStyle(iframe, {
                        width: (ge('payments_iframe_container').parentNode.offsetWidth - sbWidth()) + 'px'
                    });
                }
                if (!popupUrl) {
                    var iframe = ge('transfer_iframe');
                    iframe.contentWindow.document.open('text/html', 'replace');
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.close();
                    cur._popup_callback();
                }

                cur.isPaymentCanceled = cur.isPaymentFailed = false;
                cur.moneyTranferCheckInt = setInterval(function() {
                    MoneyTransfer.checkBindStatus(data);
                    if (cur.isPaymentCanceled || cur.isPaymentFailed) {
                        clearInterval(cur.moneyTranferCheckInt);
                        if (cur.isPaymentFailed) {
                            MoneyTransfer.showError(getLang('payments_landing_cancelled'));
                        } else {
                            MoneyTransfer.showError(getLang('payments_payment_cancelled'), 'info_msg');
                        }
                    }
                }, 2000);
            },
            onFail: function(msg) {
                MoneyTransfer.showError(msg);
                return true;
            }
        });
    },
    createFrame: function() {
        var frc = ge('payments_iframe_container');
        var iframe = ce('iframe', {
            id: 'transfer_iframe',
            name: 'transfer_iframe'
        }, {
            border: 0,
            height: '445px',
            width: (510 - sbWidth()) + 'px',
            overflowX: 'hidden',
            overflowY: 'hidden'
        });
        iframe.frameBorder = 0;
        frc.innerHTML = '';
        frc.appendChild(iframe);

        var popupUrl = '';
        if (browser.msie && browser.version <= 10 || browser.opera) {
            popupUrl = '/payments?act=go_gate&type=p2p';
        }
        if (popupUrl) {
            var form = ce('form', {
                target: 'transfer_iframe',
                method: 'POST',
                action: popupUrl
            });
            frc.appendChild(form);
            form.submit();
        }
        return popupUrl;
    },
    popupWrite: function(popup) {
        if (popup.document.innerHTML == cur._popup_text) return;
        popup.document.write(cur._popup_text);
        popup.document.close();
        popup.document.charset = 'windows-1251';
        popup.blur();
        popup.focus();
        if (cur._popup_callback) {
            cur._popup_callback();
        }
    },
    resetSendBox: function() {
        var box = curBox();
        hide('payments_money_transfer_iframe');
        show('payments_money_transfer_wrap', 'payments_money_transfer_buttons', 'payments_money_transfer_summary_wrap');
        if (cur.uiTransferTo) {
            hide('payments_money_transfer_user');
            show('payments_money_transfer_user_select');
        }
        box.changed = false;
        box.setOptions({
            width: 510
        });
        if (isVisible(box.titleWrap)) {
            box.setBackTitle(false);
        }
    },
    startCheckStatus: function(data) {
        cur.isPaymentCanceled = cur.isPaymentFailed = false;
        if (cur.moneyTranferCheckInt) {
            clearInterval(cur.moneyTranferCheckInt);
        }
        cur.moneyTranferCheckInt = setInterval(function() {
            MoneyTransfer.checkStatus(data);
            if (cur.isPaymentCanceled || cur.isPaymentFailed) {
                clearInterval(cur.moneyTranferCheckInt);
                if (data.accept) {
                    curBox().hide();
                    return;
                }
                if (cur.isPaymentFailed) {
                    MoneyTransfer.showError(getLang('payments_landing_cancelled'));
                } else {
                    MoneyTransfer.showError(getLang('payments_payment_cancelled'), 'info_msg');
                }
            }
        }, 2000);
    },
    checkStatus: function(chkData) {
        var params = {
            act: 'a_check_money_transfer',
            qid: chkData.qid,
            hash: chkData.hash
        };
        if (chkData.accept) {
            params.accept = chkData.accept;
        }
        ajax.post('al_payments.php', params, {
            onDone: function(result, text, html, options) {
                if (!result) {
                    return;
                }
                if (result == 1 || result == 3) { // success
                    while (boxQueue.count()) {
                        boxQueue.hideLast(false);
                    }
                    if (!options) {
                        showDoneBox(text, {
                            out: 6000
                        });
                    }
                    var loc = nav.objLoc;
                    if (!chkData.accept && loc[0] === 'settings' && loc.act === 'payments' && loc.section === 'transfer') {
                        if (!cur.historyOffset) cur.historyOffset = {};
                        cur.historyOffset.transfer = 0;
                        Settings.showNextPaymentsHistory(false, loc.section);
                    }

                    if (result == 3) {
                        if (options && options.title) {
                            showFastBox({
                                title: options.title
                            }, text, getLang('payments_remember_card_btn'), MoneyTransfer.rememberAcceptCard.pbind(options), getLang('payments_dont_remember_card_btn'));
                        }

                        TopNotifier.invalidate();
                        if (cur.acceptMoneyBtn && hasClass(domPN(cur.acceptMoneyBtn), 'feedback_buttons')) {
                            re(domPN(cur.acceptMoneyBtn));
                            cur.acceptMoneyBtn = false;
                        } else if (cur.acceptMoneyBtn) {
                            // IMBRIDGE.updateHistory(MoneyTransfer.updateImHistory, chkData.qid, html);
                            re(geByClass1('_decline_btn', domPN(cur.acceptMoneyBtn)));
                            domReplaceEl(cur.acceptMoneyBtn, html);
                            cur.acceptMoneyBtn = false;
                        }
                    }
                } else if (result == 2) { // failed
                    MoneyTransfer.showError(text);
                    window.removeEventListener('message', MoneyTransfer.frameMessage, false);
                    cur.isPaymentFailed = cur.isPaymentCanceled = false;
                }
                clearInterval(cur.moneyTranferCheckInt);
            },
            onFail: function(msg) {
                clearInterval(cur.moneyTranferCheckInt);
                MoneyTransfer.showError(msg);
                return true;
            }
        });
    },
    checkBindStatus: function(chkData) {
        var params = {
            act: 'a_getvotes_check',
            type: 'card'
        };
        if (chkData && (chkData.oid || chkData.qid)) {
            params.oid = chkData.oid;
            params.qid = chkData.qid;
            params.hash = chkData.hash;
        }
        ajax.post('al_payments.php', params, {
            onDone: function(result, text, card) {
                if (!result) {
                    return;
                }
                if (result == 1) { //success
                    MoneyTransfer.resetSendBox();
                    MoneyTransfer.enableAutoaccept();
                    if (card && cur.autoacceptCardDD) {
                        if (!isVisible(cur.autoacceptCardEl)) {
                            hide(geByTag('A', cur.autoacceptCardEl.parentNode)[0]);
                            show(cur.autoacceptCardEl);
                        }
                        cur.paymentsOptions.cards.unshift([card.bindingId, card.bin]);
                        cur.autoacceptCardDD.setItems(cur.paymentsOptions.cards);
                        cur.autoacceptCardDD.select(card.bindingId);
                    }
                } else if (result == 2) { // failed
                    MoneyTransfer.showError(text);
                }
                clearInterval(cur.moneyTranferCheckInt);
            },
            onFail: function(msg) {
                clearInterval(cur.moneyTranferCheckInt);
                MoneyTransfer.showError(msg);
                return true;
            }
        });
    },
    paymentCanceled: function(error) {
        if (error) {
            cur.isPaymentFailed = true;
        } else {
            cur.isPaymentCanceled = true;
        }
        MoneyTransfer.frameHeight();
    },
    frameHeight: function(height, skipContHeight) {
        var fr = ge('transfer_iframe');
        if (height) {
            height = Math.max(height, 250);
            cur.prevFrameHeight = fr.style.height;
            fr.style.height = height + 'px';
        } else {
            fr.style.height = cur.prevFrameHeight;
            removeClass('payments_iframe_container', 'payments_threeds_frame');
        }
        if (!skipContHeight) {
            ge('payments_iframe_container').style.height = (height ? height : cur.prevFrameHeight) + 15 + 'px';
        }
        ge('payments_iframe_container').scrollTop = 0;
    },
    frameMessage: function(e) {
        if (!e.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) {
            return false;
        }
        var message = {};
        if (e.data && e.data.substr(0, 1) == '{') {
            message = parseJSON(e.data);
            if (message.type != 'billing') return;
        }
        if (vk.dev) {
            debugLog(message);
        }
        if (message.action === 'resizeFrame') {
            setTimeout(MoneyTransfer.frameHeight.pbind(message.action_params.height), 200);
        } else if (e.data == 'submit' || message.action == '3dsPage') {
            setTimeout(MoneyTransfer.frameHeight.pbind(600, true), 200);
            addClass('payments_iframe_container', 'payments_threeds_frame');
        } else if (message.action == '3dsFinish') {
            MoneyTransfer.frameHeight();
            removeClass('payments_iframe_container', 'payments_threeds_frame');
        } else if (message.action == 'session_fail') {
            hide('payments_iframe_container');
            if (MoneyTransfer.cookieTroubleCounter) {
                show('payments_iframe_cookie_disabled_div');
            } else {
                show('payments_iframe_cookie_trouble');
            }
            MoneyTransfer.cookieTroubleCounter++;
        } else if (message.action === 'putPixel' && message.action_params.alias === "page_load") {
            Payments.finishFormMeasure('dmr_transfer');
            statlogsValueEvent('money_transfers', 0, 'iframe_loaded');
        }
    },
    acceptCookieSafariSpike: function(isSend) {
        var cookieWindow = window.open('https://top-fwz1.mail.ru/counter2?id=1');
        var cookieBtn = ge('payments_iframe_cookie_trouble_btn');
        lockButton(cookieBtn);
        setTimeout(function() {
            cookieWindow.location = window.location;
            cookieWindow.close();
            hide('payments_iframe_cookie_trouble');
            if (isSend) {
                MoneyTransfer.send();
            } else {
                MoneyTransfer.initAccept(cur.paymentsOptions.chkData, cur.paymentsOptions.frame);
            }
        }, 1000);
    },
    trackingProtectionDivVisibility: function(value) {
        hide(value ? 'payments_iframe_container' : 'payments_iframe_tracking_protection_div');
        show(value ? 'payments_iframe_tracking_protection_div' : 'payments_iframe_container');
    },
    checkTrackingProtection: function(onlyFlag, isSend) {
        hide('payments_iframe_container');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://top-fwz1.mail.ru/counter2?id=1', true);
        xhr.onreadystatechange = function() {
            if (xhr.status !== 200) {
                cur.trackingProtectionOff = false;
                if (!onlyFlag) {
                    MoneyTransfer.trackingProtectionDivVisibility(true);
                }
            } else {
                cur.trackingProtectionOff = true;
                if (!onlyFlag) {
                    MoneyTransfer.trackingProtectionDivVisibility(false);
                    if (isSend) {
                        MoneyTransfer.send();
                    } else {
                        MoneyTransfer.initAccept(cur.paymentsOptions.chkData, cur.paymentsOptions.frame);
                    }
                }
            }
        };
        xhr.send();
    },
    initAccept: function(data, html) {
        var frc = ge('payments_iframe_container');
        show('payments_iframe_container');
        var iframe = ce('iframe', {
            id: 'transfer_iframe',
            name: 'transfer_iframe'
        }, {
            border: 0,
            height: '445px',
            width: '510px',
            overflowX: 'hidden',
            overflowY: 'hidden'
        });
        iframe.frameBorder = 0;
        frc.innerHTML = '';
        frc.appendChild(iframe);

        var popupUrl = '';
        if (browser.msie && browser.version <= 10 || browser.opera) {
            popupUrl = '/payments?act=go_gate&type=p2p';
            cur._popup_text = html;
            cur._popup_callback = false;

            var form = ce('form', {
                target: 'transfer_iframe',
                method: 'POST',
                action: popupUrl
            });
            frc.appendChild(form);
            form.submit();
        } else {
            iframe.contentWindow.document.open('text/html', 'replace');
            iframe.contentWindow.document.write(html);
            iframe.contentWindow.document.close();
        }
        window.addEventListener('message', MoneyTransfer.frameMessage, false);

        MoneyTransfer.startCheckStatus(data);
    },
    rememberAcceptCard: function(options) {
        var box = curBox() || {},
            btn = box.btns['ok'][0];
        ajax.post('al_payments.php?act=a_remember_money_transfer_accept_card', {
            card_id: options.card_id,
            hash: options.hash
        }, {
            onDone: box.hide,
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    cleanAmount: function(o, event, onlyClean) {
        if (event.keyCode == 13) {
            return;
        }
        var v = o.value.replace(/[^0-9]/g, '');
        v = v.replace(/^0+/, '');
        if (o.value != v) o.value = v;
        if (onlyClean) return;

        MoneyTransfer.checkAmount(v);
        MoneyTransfer.autosizeAmount();
    },
    checkAmount: function(amount, submit) {
        var error = false,
            errorShown = hasClass('payments_money_transfer_amount_wrap', 'money_error');
        if (submit && errorShown) {
            return false;
        }
        var isChatRequest = cur.paymentsOptions.isChat && cur.paymentsOptions.boxTab == 'request';
        if (submit && cur.paymentsOptions.minAmount && amount < cur.paymentsOptions.minAmount) {
            error = getLang('payments_money_transfer_error_min_amount_currency');
        } else if (cur.paymentsOptions.maxAmount && !isChatRequest && amount > cur.paymentsOptions.maxAmount) {
            error = getLang('payments_money_transfer_error_max_amount_currency');
        }
        if (error != false) {
            val('payments_money_transfer_notice', error);
            addClass('payments_money_transfer_amount_wrap', 'money_error');
            return false;
        } else if (errorShown) {
            val('payments_money_transfer_notice', getLang('payments_money_transfer_amount_limits'));
            removeClass('payments_money_transfer_amount_wrap', 'money_error');
        }
        if (!submit && isChatRequest) {
            var chunkAmount = Math.max(cur.paymentsOptions.minAmount || 100, Math.ceil(amount / (cur.paymentsOptions.chatCount - 1)));
            if (cur.paymentsOptions.maxAmount) {
                chunkAmount = Math.min(chunkAmount, cur.paymentsOptions.maxAmount);
            }
            val('transfer_chunk_amount', chunkAmount);
        }
        return true;
    },
    autosizeAmount: function() {
        var el = ge('transfer_amount'),
            div = ce('span', {
                innerHTML: el.value || '0'
            }, {
                fontFamily: getStyle(el, 'fontFamily'),
                fontSize: getStyle(el, 'fontSize'),
                fontWeight: getStyle(el, 'fontWeight')
            });
        ge('utils').appendChild(div);
        var w = Math.floor(getSize(div)[0]) + 50;
        re(div);

        if (!cur.amountMinSize) {
            cur.amountMinSize = 80;
        }
        if (w < cur.amountMinSize) {
            w = cur.amountMinSize;
        }
        setStyle(el, {
            width: w
        });
    },
    checkUserMessage: function() {
        checkTextLength(cur.paymentsOptions.maxTextLength, ge('transfer_comment'), ge('transfer_comment_limit_message'), false, true);
        (val('transfer_comment_limit_message') && isVisible('transfer_comment_limit_message') ? hide : show)('payments_money_transfer_fee_link');
    },
    checkRequestNoAmount: function() {
        if (isChecked('transfer_no_amount')) {
            hide('payments_money_transfer_amount_wrap');
            show('payments_money_transfer_no_amount_wrap');
        } else {
            hide('payments_money_transfer_no_amount_wrap');
            show('payments_money_transfer_amount_wrap');
            elfocus('transfer_amount');
        }
    },
    checkAutoAccept: function() {
        toggleClass('transfer_autoaccept_card', 'disabled', !isChecked('transfer_autoaccept'));
    },
    enableAutoaccept: function() {
        if (!isChecked('transfer_autoaccept')) {
            checkbox('transfer_autoaccept', true);
            removeClass('transfer_autoaccept_card', 'disabled');
        }
    },
    aboutBox: function(textKey) {
        return !showFastBox({
            title: getLang('payments_money_transfer_about_title'),
            width: 560
        }, getLang(textKey));
    },
    showError: function(msg, type) {
        if (msg) {
            ge('payments_box_error').innerHTML = '';
            showMsg('payments_box_error', msg, !type ? 'error' : type);
            show('payments_box_error');
        }
        if (ge('payments_money_transfer_wrap')) {
            MoneyTransfer.resetSendBox();
            if (cur.moneyTranferCheckInt) {
                clearInterval(cur.moneyTranferCheckInt);
                cur.moneyTranferCheckInt = false;
            }
        }
    },
    switchBoxSection: function(el, tab) {
        if (cur.paymentsOptions.boxTab === tab) return;
        el && uiTabs.switchTab(el);
        if (cur.paymentsOptions.boxTab === 'transfer' && isVisible('payments_money_transfer_iframe')) {
            MoneyTransfer.resetSendBox();
            if (cur.moneyTranferCheckInt) {
                clearInterval(cur.moneyTranferCheckInt);
                cur.moneyTranferCheckInt = false;
            }
        }
        if (cur.paymentsOptions.boxTab === 'transfer' && cur.paymentsMoneyBoxTTHide) {
            cur.paymentsMoneyBoxTTHide();
        }
        cur.paymentsOptions.boxTab = tab;
        val('payments_money_transfer_summary', cur.paymentsOptions.boxSections[tab].summary);
        val('payments_money_transfer_send', cur.paymentsOptions.boxSections[tab].btn);
        val('payments_money_transfer_user_select_label', cur.paymentsOptions.boxSections[tab].user_select_label);

        toggle('payments_money_transfer_nf_warning', tab == 'transfer');

        MoneyTransfer.renderSelectBox();

        setTimeout(elfocus.pbind('transfer_amount'), 100);
    },
    renderSelectBox: function() {
        if (!cur.uiTransferTo) {
            return;
        }

        var is_transfer_tab = cur.paymentsOptions.boxTab === 'transfer';

        cur.uiTransferTo.setData([]);
        cur.uiTransferTo.setOptions({
            autocomplete: false
        });
        cur.uiTransferTo.setData(cur.paymentsOptions.friends.filter(function(r) {
            return is_transfer_tab || r[7] === true;
        }));
        cur.uiTransferTo.setOptions({
            autocomplete: true
        });
        cur.paymentsOptions.toId = null;
        cur.paymentsOptions.hash = null;
        cur.uiTransferTo.clear();
        cur.uiTransferTo.deselectTokens();
    },
    updateImHistory: function(html, txId, newBtn) {
        var snippet = geByClass1('_money_transfer' + txId, html);
        if (!snippet) return;
        var btn = geByClass1('_accept_btn', snippet);
        if (!btn) return;

        re(geByClass1('_decline_btn', domPN(btn)));
        domReplaceEl(btn, newBtn);
    },

    initHistoryBox: function(oid, request_id, from_offset, hash) {
        var btn = ge('ui_money_transfer_load_more');
        if (btn) {
            var tbl = ge('settings_transfer_history').tBodies[0];
            cur.userAutoScroll = new AutoList(tbl, {
                offset: from_offset,
                onNoMore: re.pbind(btn),
                onNeedRows: function(cb, offset) {
                    var params = {
                        act: 'money_transfer_history_box',
                        offset: offset,
                        owner_id: oid
                    };
                    if (request_id) params.request_id = request_id;
                    if (hash) params.hash = hash;
                    ajax.post('al_payments.php', params, {
                        onDone: cb
                    });
                },
                drawRows: function(containerEl, rows) {
                    if (!browser.msie) {
                        containerEl.insertAdjacentHTML('beforeEnd', rows);
                    } else {
                        var t = se('<table>' + rows + '</table>');
                        var rows = geByTag('tr', t);
                        for (i in rows) {
                            if (rows[i].nodeType == 1) containerEl.appendChild(rows[i]);
                        }
                    }
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                rowClass: 'settings_history_row'
            });
        }
    }
};

try {
    stManager.done('payments.js');
} catch (e) {}