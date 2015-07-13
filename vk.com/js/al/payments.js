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

try{stManager.done('payments.js');}catch(e){}
