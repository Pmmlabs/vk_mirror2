onDomReady(function(){
  try {
    pattern = /&activated=1/;
    if (pattern.test(location.href)) {
      hide('unfinished_payments');
    }
  } catch (e) {}
});

function onSendPostponedCode(hash, onOK) {
  var code = trim(ge('postponed_code').value);
  if (code.length != 6) {
    notaBene('postponed_code');
    show('postponed_tip');
    return false;
  }
  Ajax.Send('payments.php', {act:'a_sms_code', hash:hash, code:code}, {
    onSuccess:function(obj,text) {
      var res = eval('(' + text + ')');
      if (res.new_balance) {
        window.userBalance = res.new_balance;
        ge('left_money_box').innerHTML = res.new_balance_html;
        show('left_money_box');
      }
      if (res.postponed) {
        ge('postponed_error').innerHTML = res.html+'<br/><br/>'+res.postponed;
        ge('postponed_code').value = '';
        show('postponed_error');
      } else if (res.new_balance) {
        hide('postponed_error');
        if (isFunction(onOK)) {
          onOK(res);
        } else {
          var okMB = new AlertBox('Голоса зачислены', res.html);
          okMB.show();
          setTimeout(function(){okMB.hide(300)}, 3000);
        }
      }else {
        ge('postponed_error').innerHTML = res.html;
        show('postponed_error');
      }
    },
    onFail:function(res,text) {
      ge('postponed_error').innerHTML = text;
      show('postponed_error');
    }
  });
  return false;
}

var postponedMB;
function showPostponedBox(hash) {
  if (!postponedMB) {
    postponedMB = new AlertBox('Получение голосов', '', function(){return onSendPostponedCode(hash);}, {width:350, boxType:'CONFIRM', yes:getLang('captcha_send'), no:getLang('global_close')});
  }
  postponedMB.loadContent('payments.php', {act:'a_postponed_form'}, 1).show();
}

function postponedSendAgain(phid, hash) {
  Ajax.Send('payments.php', {act:'a_postponed_resend', hash:hash, phid:phid}, {
    onSuccess:function(obj,text) {
      var res = eval('(' + text + ')');
      ge('postponed_error').innerHTML = res.message;
      ge('postponed_resend').innerHTML = res.html;
      show('postponed_error');
    },
    onFail:function(res,text) {
      ge('postponed_error').innerHTML = text;
      show('postponed_error');
    }
  });
}
