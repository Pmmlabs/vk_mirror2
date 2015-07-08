var StickersOffice = {
  switchTab: function(el, event) {
    var tabs = geByClass('active_link', ge('stickers_office_tabs'));
    for (var i in tabs) {
      removeClass(tabs[i], 'active_link');
    }
    addClass(el, 'active_link');
    show('stickers_office_progress');
    return nav.go(el, event);
  },

  toggleRequest: function(id, e) {
    if (checkEvent(e)) {
      return;
    }

    var d = ge('sticker_hidden_info'+id);
    if (isVisible(d)) {
      hide(d);
    } else {
      show(d);
      ajax.post('stickers_office.php', {act: 'set_viewed', id: id, hash: cur.stickers_hash});
    }
  },
  updateStatus: function(id, status, confirm) {
    var params = {
      act: 'update_status', id: id, status: status, hash: cur.stickers_hash, confirm: confirm
    }
    var box = curBox();
    if (box && isVisible('sticker_update_comment')) {
      params.comment = val('sticker_update_comment');
    }
    if (box) {
      box.hide();
    }
    ajax.post('stickers_office.php', params, {
      onDone: function(result, msg, html) {
        if (!result) {
          showFastBox(msg, html, getLang('box_yes'), StickersOffice.updateStatus.pbind(id, status, cur.stickers_hash, 1), getLang('box_no'));
        } else {
          showDoneBox(msg);
          hide('sticker'+id);
        }
      },
      showProgress: show.pbind('stickers_office_progress'),
      hideProgress: hide.pbind('stickers_office_progress'),
    });
  }
};

try{stManager.done('stickers_office.js');}catch(e){}
