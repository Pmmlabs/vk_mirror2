function doChangeMail(opts) {
  var params = {
    act: 'do_change_mail',
    hash: cur.changeMailHash
  };

  params.newmail = ge(opts.input).value;
  if (!params.newmail) {
    elfocus(opts.input);
    return;
  }
  if (!/[a-z0-9\.\-_]+@[a-z0-9\.\-_]+/i.test(params.newmail)) {
    ge(opts.error).innerHTML = cur.changeMailError;
    show(opts.error);
    elfocus(opts.input);
    return;
  }
  hide(opts.error);
  ajax.post('al_register.php', params, {onDone: function(res, t) {
    if (!res) {
      if (opts.handler) opts.handler(t);
      return;
    }
    ge(opts.error).innerHTML = res;
    show(opts.error);
    elfocus(opts.input);
  }, progress: opts.progress});
}

function showLeftOther() {
  var el = ge('left_other_rows');
  if (!el.onmouseover) {
    el.onmouseover = showLeftOther;
    el.onmouseout = hideLeftOther;
  }
  clearTimeout(window._hideLeftOtherTO);
  if (!isVisible(el)) {
    show(el);
    setStyle(el, {opacity: 0, height: 21});
  }
  animate(el, {opacity: 1, height: el.scrollHeight}, 150);
}

function hideLeftOther() {
  clearTimeout(window._hideLeftOtherTO);
  window._hideLeftOtherTO = setTimeout(function() {
    animate(ge('left_other_rows'), {opacity: 0, height: 21}, 150, hide.pbind('left_other_rows'));
  }, 200);
}

try{stManager.done('uncommon.js');}catch(e){}
