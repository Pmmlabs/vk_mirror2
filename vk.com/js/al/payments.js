var Payments = {};

Payments.init = function() {
}

Payments.cardsVerifySumHowTo = function() {
  showFastBox(getLang('payments_verify_sum_howto_header'), getLang('payments_verify_sum_howto_dialog'));
  return false;
}

Payments.masterbankVerifySumDialog = function() {
  cur.mb_verify_sum_dialog = showFastBox(getLnag('payments_verify_sum_header'), mb_verify_sum_dialog_content, getLang('box_send'), Payments.masterbankSubmitVerifySum, getLang('box_cancel'));
  setTimeout(function() { ge('verify_sum_input').focus() }, 50);
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
  var ajaxParams = {sum: sum, currency: cur.ui_verify_sum_currency.val()};
  if (cur.isAdsPayment) {
    ajaxParams.payment_account_id = cur.paymentAccountId;
    ajaxParams.account_hash = cur.masterbankAccountHash;
  }
  ajax.plainpost('/payments.php?act=masterbank_verify_sum', ajaxParams, function(data) { Payments.masterbankVerifyCheck(data); });
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
      cur.mb_verify_sum_dialog.addButton(getLang('box_cancel'), function() { clearTimeout(cur.cards_recheck_timeout); cur.mb_verify_sum_dialog.hide(); }, 'no');
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
    cur.mb_verify_sum_dialog.addButton(getLang('box_close'), function() { Payments.masterbankDoVerifyStartOver(); cur.mb_verify_sum_dialog.hide();});
    cur.mb_verify_sum_dialog.content(payment_no_more_tries_msg);
  }
}

Payments.masterbankVerifyRecheck = function() {
  if (!ge('verify_please_wait')) {
    return;
  }
  var ajaxParams = {sum: cur.cards_submitted_sum};
  if (cur.isAdsPayment) {
    ajaxParams.payment_account_id = cur.paymentAccountId;
    ajaxParams.account_hash = cur.masterbankAccountHash;
  }
  ajax.plainpost('/payments.php?act=masterbank_verify_sum', ajaxParams, function(data) { Payments.masterbankVerifyCheck(data, true); });
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
      setTimeout(function() { window.location.reload(); }, 2000);
    }
  }
}

Payments.masterbankSubmitPaymentForm = function(random_auth, min_amount) {
  if (!cur.mobile_activated) {
    var onDoneActivate = function() {
      cur.mobile_activated = true;
      Payments.masterbankSubmitPaymentForm(random_auth, min_amount);
    }
    activateMobileBox({onDone: onDoneActivate});
    return false;
  }
  random_auth = intval(random_auth);
  if (!random_auth)  {
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
  var ajaxParams = {hash: cur.masterbankHash, amount: sum, random_auth: random_auth};
  if (cur.isAdsPayment) {
    ajaxParams.payment_account_id = cur.paymentAccountId;
    ajaxParams.account_hash = cur.masterbankAccountHash;
  }
  ajax.post("/payments.php?act=a_masterbank_order", ajaxParams, {onDone: onOrderCreated, onFail: onOrderCreated});
  return false;
}

Payments.scrollTo = function(el) {
  offset = Payments.getOffset(ge(el)).top;
  animate(document.getElementsByTagName('html')[0], {scrollTop: offset});
  animate(document.getElementsByTagName('body')[0], {scrollTop: offset});
}

Payments.getOffset = function(elem) {
  if (elem.getBoundingClientRect) {
    return Payments.getOffsetRect(elem)
  } else {
    return Payments.getOffsetSum(elem)
  }
}

Payments.getOffsetSum = function(elem) {
  var top=0, left=0
  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent
  }
  return {top: top, left: left}
}

Payments.getOffsetRect = function(elem) {
  var box = elem.getBoundingClientRect()
  var body = document.body
  var docElem = document.documentElement
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
  var clientTop = docElem.clientTop || body.clientTop || 0
  var clientLeft = docElem.clientLeft || body.clientLeft || 0
  var top  = box.top +  scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft
  return { top: Math.round(top), left: Math.round(left) }
}

// Popup functions

Payments.submitPopupForm = function(ps_name, amount_votes, amount_rub, amount_usd) {
  var form = document.getElementById('popup_payment_form');
  if (typeof Payments['process_'+ps_name] == 'function') {
    Payments['process_'+ps_name](form, amount_votes, amount_rub, amount_usd);
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
  ajax.plainpost("/payments.php?act=a_checkout_cart", {votes: amount_votes}, onDone);
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
        ge('amount_'+ps_name).focus();
      } catch(e) {}
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
  var el = ge('ps_select_'+type);
  if (!el) {
    return;
  }

  var expandSpeed = 300;

  if (!cur.expand_status) {
    cur.expand_status = {};
  }

  if (cur.expand_status[type] === undefined || cur.expand_status[type] === false || cur.expand_status[type] === '') {
    cur.expand_status[type] = true;
    addClass(ge('ps_expand_link_'+type), 'hidden')

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
      removeClass(ge('ps_expand_link_'+type), 'hidden');
    });
  }
}

Payments.paymentCheckAmount = function(o) {
  var v = o.value.replace(/[^0-9бю.,]/g, "");
  v = v.replace(/[,бю]/,".");
  var i = parseInt(v);
  if (i >= 100000) v = parseInt(i.toString().substr(0, 5)) + Math.floor((v - i)*100)/100;
  if(o.value != v)
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
  var confirmBox = showFastBox('Внимание', confirmMessage, getLang('payments_payment_system_submit'), function() { func(); confirmBox.hide(); }, getLang('box_close'));
}

var MoneyTransfer = {
  init: function() {
    placeholderInit('transfer_amount');
    placeholderInit('transfer_comment');
    setTimeout(elfocus.pbind('transfer_amount'), 100);
    shortCurrency();
    MoneyTransfer.autosizeAmount();
    /*if (cur.paymentsOptions.repeatId) {
      MoneyTransfer.send();
    }*/
  },
  send: function() {
    var box = curBox();
        btn = ge('payments_money_transfer_send');
    if (isButtonLocked(btn)) return;

    var amount = val('transfer_amount');
    if (!amount || amount <= 0) {
      addClass('payments_money_transfer_amount_wrap', 'money_error');
      setTimeout(removeClass.pbind('payments_money_transfer_amount_wrap', 'money_error'), 500);
      elfocus('transfer_amount');
      return;
    } else if (!MoneyTransfer.checkAmount(amount, true)) {
      return;
    }

    var frc = ge('payments_iframe_container');
    var iframe = ce('iframe', {id: 'transfer_iframe', name: 'transfer_iframe'}, {
      border: 0,
      height: '445px',
      width: (560 - sbWidth()) + 'px',
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
      var form = ce('form', {target: 'transfer_iframe', method: 'POST', action: popupUrl});
      frc.appendChild(form);
      form.submit();
    }

    var params = {
      to_id: cur.paymentsOptions.toId,
      amount: amount,
      comment: val('transfer_comment'),
      hash: cur.paymentsOptions.hash
    };
    val('payments_box_error', '');
    ajax.post('al_payments.php?act=a_init_money_transfer', params, {
      onDone: function(data, html) {
        cur._popup_text = html;
        cur._popup_callback = function() {
          hide('payments_money_transfer_wrap', 'payments_money_transfer_buttons', 'payments_box_error');
          show('payments_money_transfer_iframe');
          ge('payments_iframe_container').scrollTop = 0;
          window.addEventListener('message', MoneyTransfer.frameMessage, false);

          box.changed = true;
          box.setOptions({width: 560});
          box.setBackTitle(MoneyTransfer.resetSendBox);
          setStyle(iframe, {width: (frc.parentNode.offsetWidth - sbWidth()) + 'px'});
        }
        if (!popupUrl) {
          var iframe = ge('transfer_iframe');
          iframe.contentWindow.document.open('text/html', 'replace');
          iframe.contentWindow.document.write(html);
          iframe.contentWindow.document.close();
          cur._popup_callback();
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
    show('payments_money_transfer_wrap', 'payments_money_transfer_buttons');
    box.changed = false;
    box.setOptions({width: 480});
    box.setBackTitle(false);
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
            showDoneBox(text, {out: 6000});
          }

          if (result == 3) {
            if (options && options.title) {
              showFastBox({title: options.title}, text, getLang('payments_remember_card_btn'), MoneyTransfer.rememberAcceptCard.pbind(options), getLang('payments_dont_remember_card_btn'));
            }

            TopNotifier.invalidate();
            if (cur.acceptMoneyBtn && hasClass(domPN(cur.acceptMoneyBtn), 'feedback_buttons')) {
              re(domPN(cur.acceptMoneyBtn));
              cur.acceptMoneyBtn = false;
            } else if (cur.acceptMoneyBtn) {
              // IM.updateHistory(MoneyTransfer.updateImHistory, chkData.qid, html);
              re(geByClass1('_decline_btn', domPN(cur.acceptMoneyBtn)));
              domReplaceEl(cur.acceptMoneyBtn, html);
              cur.acceptMoneyBtn = false;
            }
          }
        } else if (result == 2) { // failed
          MoneyTransfer.showError(text);
          window.removeEventListener('message', MoneyTransfer.frameMessage, false);
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
  frameHeight: function(height) {
    var fr = ge('transfer_iframe');
    if (height) {
      cur.prevFrameHeight = fr.style.height;
      fr.style.height = height + 'px';
    } else {
      fr.style.height = cur.prevFrameHeight;
      removeClass('payments_iframe_container', 'payments_threeds_frame');
    }
    ge('payments_iframe_container').scrollTop = 0;
  },
  frameMessage: function(e) { debugLog(e);
    if (!e.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) {
      return false;
    }
    var message = {};
    if (e.data && e.data.substr(0, 1) == '{') {
      message = parseJSON(e.data);
      if (message.type != 'billing') return;
    }
    if (message.action == '3dsPage') {
      setTimeout(MoneyTransfer.frameHeight.pbind(600), 1000);
      addClass('payments_iframe_container', 'payments_threeds_frame');
    } else if (message.action == '3dsFinish') {
      MoneyTransfer.frameHeight();
    }
  },
  initAccept: function(data, html) {
    var frc = ge('payments_iframe_container');
    var iframe = ce('iframe', {id: 'transfer_iframe', name: 'transfer_iframe'}, {
      border: 0,
      height: '445px',
      width: (560 - sbWidth()) + 'px',
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

      var form = ce('form', {target: 'transfer_iframe', method: 'POST', action: popupUrl});
      frc.appendChild(form);
      form.submit();
    } else {
      iframe.contentWindow.document.open('text/html', 'replace');
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    }

    MoneyTransfer.startCheckStatus(data);
  },
  rememberAcceptCard: function(options) {
    var box = curBox() || {},
        btn = box.btns['ok'][0];
    ajax.post('al_payments.php?act=a_remember_money_transfer_accept_card', {card_id: options.card_id, hash: options.hash}, {
      onDone: box.hide,
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  cleanAmount: function(o, event) {
    if (event.keyCode == 13) {
      return;
    }
    var v = o.value.replace(/[^0-9]/g, "");
    if (o.value != v) o.value = v;
    MoneyTransfer.checkAmount(v);
    MoneyTransfer.autosizeAmount();
  },
  checkAmount: function(amount, submit) {
    var error = false,
        errorShown = hasClass('payments_money_transfer_amount_wrap', 'money_error');
    if (submit && errorShown) {
      return false;
    }
    if (submit && cur.paymentsOptions.minAmount && amount < cur.paymentsOptions.minAmount) {
      error = getLang('payments_money_transfer_error_min_amount', cur.paymentsOptions.minAmount);
    } else if (cur.paymentsOptions.maxAmount && amount > cur.paymentsOptions.maxAmount) {
      error = getLang('payments_money_transfer_error_max_amount', cur.paymentsOptions.maxAmount);
    }
    if (error != false) {
      val('payments_money_transfer_notice', error);
      addClass('payments_money_transfer_amount_wrap', 'money_error');
      return false;
    } else if (errorShown) {
      val('payments_money_transfer_notice', getLang('payments_money_transfer_amount_limits'));
      removeClass('payments_money_transfer_amount_wrap', 'money_error');
    }
    return true;
  },
  autosizeAmount: function() {
    var el = ge('transfer_amount'),
        div = ce('span', {innerHTML: el.value || '0'}, {fontFamily: getStyle(el, 'fontFamily'), fontSize: getStyle(el, 'fontSize'), fontWeight: getStyle(el, 'fontWeight')});
    ge('utils').appendChild(div);
    var w = Math.floor(getSize(div)[0]) + 50;
    re(div);

    if (!cur.amountMinSize) {
      cur.amountMinSize = 80;
    }
    if (w < cur.amountMinSize) {
      w = cur.amountMinSize;
    }
    setStyle(el, {width: w});
  },
  checkUserMessage: function() {
    checkTextLength(cur.paymentsOptions.maxTextLength, ge('transfer_comment'),  ge('transfer_comment_limit_message'), false, true);
    (val('transfer_comment_limit_message') && isVisible('transfer_comment_limit_message') ? hide : show)('payments_money_transfer_fee_link');
  },
  aboutBox: function() {
    return !showFastBox({title: getLang('payments_money_transfer_about_title'), width: 560}, getLang('payments_money_transfer_about_text'));
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
  updateImHistory: function(html, txId, newBtn) {
    var snippet = geByClass1('_money_transfer' + txId, html);
    if (!snippet) return;
    var btn = geByClass1('_accept_btn', snippet);
    if (!btn) return;

    re(geByClass1('_decline_btn', domPN(btn)));
    domReplaceEl(btn, newBtn);
  },

  initHistoryBox: function() {
    var btn = ge('ui_money_transfer_load_more');
    if (btn) {
      var tbl = ge('settings_transfer_history').tBodies[0];
      cur.userAutoScroll = new AutoList(tbl, {
        scrollNode: 'payments_money_transfer_history_box',
        contentNode: 'settings_transfer_history',
        onNoMore: re.pbind(btn),
        onNeedRows: function(cb, offset) {
          ajax.post('al_payments.php', { act: 'money_transfer_history_box', offset: offset }, {
            onDone: cb
          });
        },
        drawRows: function(containerEl, rows) {
          if (!browser.msie) {
            containerEl.insertAdjacentHTML('beforeEnd', rows);
          } else {
            var t = se('<table>'+rows+'</table>');
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

try{stManager.done('payments.js');}catch(e){}
