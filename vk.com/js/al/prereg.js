function initReg(prefix, opts) {

extend(cur, {
  regOnlyNums: function(pass) {
    return (pass.search(/[^0-9]/) == -1);
  },
  regChange: function(pref, cur, next, e) {
    e = e || window.event;
    if (e && e.keyCode == 13) elfocus(pref + next);
    hide(pref + cur + '_details');
  },
  regValidate: function(pref, ignoreBadPwd) {
    var fname = trim(ge(pref + 'fn').value), badfn = false;
    if (fname.length < 2) {
      cur.regShowError(pref, 'fn_details', opts.reg_error_fname);
      badfn = true;
    }
    var lname = trim(ge(pref + 'ln').value), badln = false;
    if (lname.length < 2) {
      cur.regShowError(pref, 'ln_details', opts.reg_error_lname);
      badln = true;
    }

    var email = ge(pref + 'email').value, badem = false;
    var mailDot = email.lastIndexOf('.'), mailAt = email.indexOf('@');
    if (email.length < 8) {
      cur.regShowError(pref, 'email_details', opts.reg_error_email);
      badem = true;
    } else if (mailDot < 0 || mailAt <= 0 || mailDot <= mailAt + 1) {
      cur.regShowError(pref, 'email_details', opts.reg_error_bad_email);
      badem = true;
    }

    var pass = ge(pref + 'pass').value, badpw = false;
    if (pass.length < 6) {
      cur.regShowError(pref, 'pass_details', opts.reg_error_pass);
      badpw = true;
    }

    var sex = intval(ge(pref + 'sex').value), badsx = false;
    if (!sex) {
      cur.regShowError(pref, 'sex_details', opts.reg_error_sex);
      badsx = true;
    } else {
      hide(pref + 'sex_details');
    }

    if (badfn) {
      elfocus(pref + 'fn');
    } else if (badln) {
      elfocus(pref + 'ln');
    } else if (badem) {
      elfocus(pref + 'email');
    } else if (badpw) {
      elfocus(pref + 'pass');
    } else if (!badsx) {
      if (ignoreBadPwd || !cur.regOnlyNums(pass)) {
        return true;
      }
      hide(pref + 'pass_details');
      if (!badfn && !badln && !badem) {
        cur.regErrorBox(pref, opts.reg_error_passonlydigits, pref + 'pass', opts.reg_error_changepass, true);
      }
    }
    return false;
  },
  regErrorBox: function(pref, body, forFocus, closeCaption, regButton) {
    closeCaption = closeCaption || opts.reg_error_close;
    var box = showFastBox({title: opts.reg_error_incorrectinfo}, body, closeCaption, function() {
        box.hide();
        if (ge(forFocus)) elfocus(forFocus);
      }, regButton ? opts.reg_error_continuereg : false, regButton ? function() {
        box.hide();
        cur.register(pref, true);
      } : false);
    return true;
  },
  regShowError: function(pref, container, text) {
    var cont = ge(pref + container), was = isVisible(cont) && trim(cont.innerHTML);
    cont.innerHTML = '<span>' + text + '</span>';
    cont.style.position = 'relative';
    if (cont.offsetHeight > 20) {
      cont.style.top = '0px';
    } else {
      cont.style.top = '5px';
    }
    if (was) {
      cont.style.color = '#777777';
      animate(cont, {color: '#880000'}, 200, function() {
        setTimeout(animate.pbind(cont, {color: '#777777'}, 200, function() {
          cont.style.color = '';
        }), 500);
      });
    } else {
      show(cont);
    }
  },
  register: function(pref, ignoreBadPwd) {
    if (isVisible(cur[pref + 'reg_progress'])) return false;
    if (!cur.regValidate(pref, ignoreBadPwd)) return false;

    var email = ge(pref + 'email').value, pass = ge(pref + 'pass').value;
    var timezoneOffset = new Date().getTimezoneOffset();
    var params = {
      act: 'register',
      first_name: ge(pref + 'fn').value,
      last_name: ge(pref + 'ln').value,
      regemail: email,
      regpass: pass,
      sex: intval(ge(pref + 'sex').value),
      timezone: -(Math.abs(timezoneOffset) > 20 ? timezoneOffset : Math.round(timezoneOffset / 60))
    }
    var options = {onDone: function(res, remail, rpass) {
      res = intval(res);
      if (res) {
        cur.regBadEM = true;
        cur.regShowError(pref, 'email_details', opts.reg_login_is_taken);
        elfocus(pref + 'email');
      } else {
        submitQuickLoginForm(remail || email, rpass || pass);
      }
    }, onFail: function(t) {
      if (t) return cur.regErrorBox(pref);
    }, progress: cur[pref + 'reg_progress']};
    ajax.post('register.php', params, options);
  }
});
if (!cur[prefix + 'sexdd']) {
  cur[prefix + 'sexdd'] = new Dropdown(ge(prefix + 'sex'), opts.sexes, {
    width: opts.dd_width || 200,
    onChange: function(value) {
      if (intval(value)) hide(prefix + 'sex_details');
    }
  });
  cur[prefix + 'reg_progress'] = opts.progress;
  cur[prefix + 'reg_destroy'] = function(c) {
    cur[prefix + 'sexdd'].destroy();
    delete cur[prefix + 'sexdd'];
  }
}

}
try{stManager.done('prereg.js');}catch(e){}
