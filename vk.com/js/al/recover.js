var Recover = {
  onEnter: function(el, ev, cb) {
    if (ev = ev || window.event) {
      if (ev.keyCode == 10 || ev.keyCode == 13) {
        el.blur();
        cb();
      }
    }
  },
  showMsg: function(text, handler) {
    var el = ge('recover_msg');
    el.innerHTML = text;
    if (isVisible(el)) {
      animate(el, {backgroundColor: '#F4EBBD'}, 100, animate.pbind('recover_msg', {backgroundColor: '#F9F6E7'}, 2000));
      handler();
    } else {
      slideDown(el, 100, handler);
    }
  },

  submitLogin: function() {
    if (buttonLocked('recover_submit_login')) return;

    var login = trim(val('recover_login'));
    if (!login) return notaBene('recover_login');
    ajax.post('recover.php', {act: 'login', login: login}, {
      onDone: function() {

      },
      onFail: function(text) {
        if (!text) return;

        Recover.showMsg(text);
        return true;
      },
      showProgress: lockButton.pbind('recover_submit_login'),
      hideProgress: unlockButton.pbind('recover_submit_login')
    });
  }
}

try{stManager.done('recover.js');}catch(e){}