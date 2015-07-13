var Pay = {
  navTo: function(params, onDone, onFail, wait, ignore) {
    if (!ignore && isVisible(cur.payBox.progress)) return;

    extend(params, {
      merchant_id: cur.payMerchantId,
      order_hash: cur.payOrderHash,
      order_id: cur.payOrderId,
      layout: cur.payLayout
    });

    hide('pay_error');
    if (!wait) {
      wait = 1;
      if (cur.payNavTimer) {
        clearTimeout(cur.payNavTimer);
      }
    }

    show(cur.payBox.progress);
    hide('pay_back_link');

    ajax.post(cur.payUrl, params, {onDone: function(html, script) {
      if (onDone) onDone();
      if (html == 'not_ready') {
        show(cur.payBox.progress);
        clearTimeout(cur.payNavTimer);
        cur.payNavTimer = setTimeout(function() {
          Pay.navTo(params, onDone, onFail, wait + 1, true);
        }, wait * 1000);
      } else {
        hide(cur.payBox.progress);
        clearTimeout(cur.payNavTimer);
        cur.payNavTimer = 0;
        Pay.received(html, script);
      }
    }, onFail: function(text) {
      if (onFail) onFail();
      if (text) {
        Pay.showError(text);
      } else {
        show(cur.payBox.progress);
        clearTimeout(cur.payNavTimer);
        cur.payNavTimer = setTimeout(function() {
          Pay.navTo(params, onDone, onFail, wait + 1, true);
        }, wait * 1000);
      }
      return true;
    }});
  },

  showError: function(error) {
    if (ge('pay_box_error')) {
      ge('pay_box_error').innerHTML = error;
      show('pay_box_error');
    } else if (ge('pay_error')) {
      ge('pay_error').innerHTML = error;
      show('pay_error');
    } else if (ge('pay_merchant_error')) {
      ge('pay_merchant_error').innerHTML = error;
      show('pay_merchant_error');
      Pay.payDoResize();
    }
    hide(cur.payBox.progress);
    if (cur.payConfirmBox && cur.payConfirmBox.isVisible()) {
      hide('pay_retry_msg');
      if (ge('pay_confirm_phone')) {
        elfocus('pay_confirm_phone');
      } else if (ge('pay_confirm_code')) {
        elfocus('pay_confirm_code');
      }
    }
  },

  received: function(html, script) {
    if (cur.payNotEnoughTimer) {
      clearTimeout(cur.payNotEnoughTimer);
      cur.payNotEnoughTimer = 0;
    }
    if (trim(html).length) {
      ge('pay_container').innerHTML = html;
    }
    if (trim(script).length) {
      var box = cur.payBox;
      eval(script);
    }
  },

  agreementChanged: function(el) {
    if (isChecked(el)) {
      Pay.initPaymentButtons();
    } else {
      cur.payBox.removeButtons().addButton(getLang('global_close'), Pay.cancel);
    }
  },

  showAgreement: function(ev) {
    var windowHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
    return !showBox('merchants.php', {act: 'agreement', id: cur.payMerchantId}, {
      stat: ['wk.css', 'wk.js'],
      params: {
        bodyStyle: 'overflow: auto; padding: 0px; height: ' + (windowHeight - 270) + 'px',
        width: 643,
        height: (windowHeight - 200)
      }
    }, ev);
    var cb = ge('pay_agreement_check');
    checkbox(cb);
  },

  makePayment: function(otherPhone, retryPhone) {
    var statusExport = isChecked('status_export') ? 0 : 1;

    var progress = (cur.payConfirmBox && cur.payConfirmBox.isVisible()) ? cur.payConfirmBox.progress : cur.payBox.progress;
    if (isVisible(progress)) return;

    hide('pay_error', 'pay_box_error');
    var params = {
      act: 'lock',
      hash: cur.payConfirmHash,
      merchant_id: cur.payMerchantId,
      order_id: cur.payOrderId,
      order_hash: cur.payOrderHash,
      show_in_box: true,
      layout: cur.payLayout,
      donation: cur.payDonation
    };
    if (otherPhone) {
      params.other_phone = 1;
    } else if (retryPhone) {
      params.retry_phone = 1;
      if (cur.payConfirmPhone) {
        params.confirm_phone = cur.payConfirmPhone;
      }
    } else if (ge('pay_confirm_code') && ge('pay_confirm_code').value) {
      params.confirm_code = ge('pay_confirm_code').value;
    } else if (ge('pay_confirm_phone')) {
      cur.payConfirmPhone = params.confirm_phone = ge('pay_confirm_phone').value;
    }

    ajax.post(cur.payUrl, params, {onDone: function(result, html, script) {
      switch (result) {
        case -1:
          show(progress);
          setTimeout(function() {
            hide(progress);
            Pay.makePayment(otherPhone, retryPhone);
          }, 1000);
        break;

        case 0:
          Pay.received(html, script);
        break;

        case 1:
          if (cur.payConfirmBox) cur.payConfirmBox.hide();

          cur.payConfirmHtml = html;
          cur.payConfirmScript = script;
          html = '';
        case 2:
          if (!cur.payConfirmBox || !cur.payConfirmBox.isVisible()) {
            cur.payConfirmBox = showFastBox(cur.payConfirmTitle, cur.payConfirmHtml, getLang('box_send'), Pay.makePayment.pbind(false, false), getLang('global_cancel'));
            cur.payConfirmBox.evalBox(cur.payConfirmScript);
          }
          if (html) {
            Pay.showError(html);
          }
        break;

        case 3:
          cur.payConfirmCallbackId = intval(html);
          if (cur.payConfirmBox) {
            cur.payConfirmBox.hide();
          }

          cur.payBox.removeButtons().addButton(getLang('global_cancel'), Pay.cancel);
          cur.payBox.setControlsText('');

          var html = '<div id="pay_process_info"><div class="pay_process_please">' + cur.payPleaseWait + '<br><br><img src="images/progress7.gif" /><br><br>' + cur.payInProgress + '</div><br><br>' + cur.payHistory + '</div>';
          var script = '';
          Pay.received(html, script);

          Pay.navTo({
            act: 'pay',
            order_id: cur.payOrderId,
            callback_id: cur.payConfirmCallbackId,
            show_in_box: true,
            donation: cur.payDonation,
            url: cur.paySiteUrl,
            doexport: statusExport
          });

        break;
      }
    }, onFail: function(text) {
      if (text) {
        Pay.showError(text);
        return true;
      }
    }});
  },

  initPaymentButtons: function() {
    cur.payBox.removeButtons().addButton(getLang('global_cancel'), Pay.cancel, 'no');
    cur.payBox.addButton(cur.payBtnLabel, Pay.makePayment);
  },

  checkMoney: function() {
    ajax.post(cur.payUrl, {
      act: 'money',
      money: cur.payMoney,
      merchant_id: cur.payMerchantId,
      order_id: cur.payOrderId,
      order_hash: cur.payOrderHash,
      show_in_box: true,
      layout: cur.payLayout
    }, {onDone: function(money, youWill, willBeLeft, notEnough) {
      cur.payMoney = money;
      if (youWill) {
        ge('pay_you_will_msg').innerHTML = youWill;
        ge('pay_will_be_left').innerHTML = willBeLeft;
        if (!notEnough) {
          hide('pay_error', 'pay_box_error');
          return;
        }
      }
      cur.payWaitFor = 5000;
      cur.payNotEnoughTimer = setTimeout(Pay.checkMoney, cur.payWaitFor);
    }, onFail: function(text) {
      if (text) {
        Pay.showError(text);
      } else {
        cur.payWaitFor *= 2;
        cur.payNotEnoughTimer = setTimeout(Pay.checkMoney, cur.payWaitFor);
      }
      return true;
    }});
  },

  successFinish: function() {
    clearTimeout(cur.paySuccessTimer);
    cur.payBox.setOptions({onHide: function() {
      if (cur.onMerchantPaymentSuccess) {
        cur.onMerchantPaymentSuccess(cur.payMerchantOrderId);
      } else {
        debugLog('no cur.onMerchantPaymentSuccess handler')
      }
    }})
    cur.payBox.hide();
  },

  showCongrats: function(text) {
    hide('pay_text_logged');
    show('pay_text_success');
    hide('pay_text_logged', 'pay_text_success_publish');
    cur.paySuccessTimer = setTimeout(Pay.successFinish, 4000);
    cur.destroy.push(function() {
      clearTimeout(cur.paySuccessTimer);
    });

    ge('pay_process_info').innerHTML = '<div class="pay_process_please">' + text + '</div>';
    cur.payBox.removeButtons().addButton(getLang('global_close'), Pay.successFinish);
  },

  payResizeShow: function(el) {
    if (cur.payShowInBox) {
      return;
    }
    // show resize for popup here
  },

  payResizeHide: function(el) {
    if (cur.payShowInBox) {
      return;
    }
    // hide resize for popup here
  },

  payDoResize: function(el) {
    if (cur.payShowInBox) {
      return;
    }
    // hide resize for popup here
  },

  cancel: function() {
    if (cur.onMerchantPaymentCancel) {
      cur.onMerchantPaymentCancel();
    }
    cur.payBox.hide();
  }


}

try{stManager.done('pay.js');}catch(e){}
