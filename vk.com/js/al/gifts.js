var Gifts = {
  initGifts: function(opts, preload) {
    extend(cur, {
      pgStart: opts.start,
      pgOffset: opts.offset,
      pgCount: opts.count,
      pgPerPage: opts.perpage,
      pgCont: ge('gifts_rows'),
      pgMore: ge('gifts_load_more'),
      pgPages: ge('gifts_pages'),
      pgMorePrg: ge('gifts_more_progress'),
      pgPreload: preload,
      pgHref: '/gifts' + opts.mid + '?' + (opts.sent ? 'act=sent&' : '') + 'offset=',
      pgParams: opts.sent ? {act: 'sent'} : {},
      pgUrl: '/gifts' + opts.mid,

      mid: opts.mid,
      hash: opts.hash
    });
    Pagination.init();
    cur.destroy.push(Pagination.deinit);
  },
  deleteGift: function(el, gift, giftData, opts) {
    opts = opts || {};
    ajax.post('al_gifts.php', {act: 'delete', mid: opts.mid, gift: giftData, hash: opts.hash}, {onDone: function(text) {
      var p = ge('gift' + gift);
      if (!p) return;
      if (p.firstChild.nextSibling) {
        p.firstChild.nextSibling.innerHTML = text;
      } else {
        p.appendChild(ce('div', {className: 'gift_deleted', innerHTML: text}));
        hide(p.firstChild);
        if (window.Pagination && !curBox()) Pagination.recache(-1);
      }
    }, showProgress: function() {
      hide(el);
      show(el.parentNode.nextSibling);
    }, hideProgress: function() {
      hide(el.parentNode.nextSibling);
      show(el);
    }});
  },
  restoreGift: function(el, gift, giftData, opts) {
    opts = opts || {};
    ajax.post('al_gifts.php', {act: 'restore', mid: opts.mid, gift: giftData, hash: opts.hash}, {onDone: function() {
      var p = ge('gift' + gift);
      if (!p || !p.firstChild.nextSibling) return;
      re(p.firstChild.nextSibling);
      show(p.firstChild);
    }});
  },
  markSpamGift: function(el, gift, giftData, opts) {
    opts = opts || {};
    ajax.post('al_gifts.php', {act: 'mark_spam', mid: opts.mid, gift: giftData, hash: opts.hash}, {onDone: function(text) {
      ge('gift_mark_spam'+gift).innerHTML = text;
    }});
  },
  onReceiverChange: function() {
    var dd = cur.wdd && cur.wdd['gft_box_dd'];
    if (cur.giftsLeft) {
      var selected = 0, all = dd.selected;
      for (var i in all) {
        var d = (all[i][0] > 0) ? 1 : all[i][6];
        if (selected + d > cur.giftsLeft) {
          setTimeout(WideDropdown.deselect.pbind('gft_box_dd', all[i][0], false), 0);
          return false;
        } else {
          selected += d;
        }
      }
    }

    cur.sel = [];
    for (var i in dd.selected) {
      cur.sel.push(dd.selected[i]);
    }
    if (!cur.sel.length) {
      delete(cur.sel);
    }
    val('gft_box_to', getLang((cur.sel && cur.sel.length > 1) ? 'gifts_receivers' : 'gifts_receiver').replace(':', ''));
  },
  selectGift: function(num, votes, bonus, tip, left) {
    cur.gift = num;
    cur.giftsLeft = left;
    cur.giftsSendConfirmed = 0;
    var box = showFastBox({
      title: false,
      width: 444,
      bodyStyle: 'border: 0px; padding: 0px;',
      onShow: function() {
        addClass(boxLayerBG, 'bg_dark');
        cur._noEscHide = true;
      },
      onClean: function() {
        if (window.WideDropdown) WideDropdown.deinit('gft_box_dd');
        cur._noEscHide = false;
      }
    }, '\
<a class="fl_r tb_close" onclick="curBox().hide()">' + getLang('global_close') + '</a>\
<div class="tb_title">' + getLang('gifts_send_gift') + '</div>\
<div id="gifts_do_send_wrap">\
' + (left > 0 ? '<div class="info_msg" style="margin-bottom: 10px;">' + getLang('gifts_free_send_left', left) + '</div>' : '') + '\
<div class="gs_box_wrap">\
  <img class="gs_box_img" src="images/gift/' + num + '/256.jpg" />\
</div>\
<div class="gft_send">\
  <div class="gft_box_label" id="gft_box_to">' + getLang('gifts_receiver').replace(':', '') + '</div>\
  <div class="wdd clear_fix" id="gft_box_dd">\
    <div class="fl_r wdd_arr"></div>\
    <input type="text" class="wdd_text fl_l" placeholder="' + clean(getLang('gifts_choose_recipients')) + '" id="gft_box_inp" onfocus="this.focused=1" onblur="this.focused=\'\'" />\
    <br class="clear" />\
  </div>\
  <div class="fl_r" id="gs_warn"></div>\
  <div class="gft_box_label">' + getLang('gifts_your_message').replace(':', '') + '</div>\
  <div class="gft_box_text_wrap">\
    <textarea id="gs_msg" onchange="cur.giftCurrentMessage = this.value;" onkeydown="onCtrlEnter(event, Gifts.sendGift)" onkeyup="checkTextLength(cur.maxLen, this, \'gs_warn\', false, true)"></textarea>\
  </div>\
  <div class="gs_privacy">\
    <div class="checkbox' + (cur.giftCurrentPrivacy ? ' on' : '') + '" id="gift_receiver_only" onclick="checkbox(this); cur.giftCurrentPrivacy = isChecked(this);">\
      <div></div>' + getLang('gifts_receiver_only') + '\
    </div>\
  </div>\
</div>\
' + (bonus > 0 ? '<div class="gs_bonus">' + getLang('gifts_rate_increase').replace('{gifts_count}', getLang(bonus, 'gifts_X_votes')) + '</div>' : '') + '\
' + (tip ? '<div class="gs_tip">' + tip + '</div>' : '') + '\
</div>\
    ', getLang('box_send'), Gifts.sendGift, getLang('global_cancel'));
    setStyle(domNS(box.bodyNode), {border: '0px'});

    if (WideDropdown.init('gft_box_dd', {
      defaultItems: cur.users,
      items: cur.users,
      noResult: getLang('gifts_nobody_found'),
      introText: getLang('gifts_start_typing_recipient'),
      maxItems: cur.giftsLimit ? cur.giftsLimit : 100,
      onChange: function(act) {
        if (act == 1 && !inArray(cur.section, ['valentines', 'love', 'friends', 'birthday'])) { // added
          setTimeout(WideDropdown.focus.pbind('gft_box_dd'), 0);
        }
        setTimeout(Gifts.onReceiverChange, 0);
      },
      itemMark: function(item) {
        return intval(item[5]) ? 1 : 0;
      }
    })) {
      if (cur.sel) {
        for (var i in cur.sel) {
          WideDropdown.select('gft_box_dd', false, cur.sel[i]);
        }
      }
    }

    box.setControlsText('&nbsp;');
    Gifts.onReceiverChange();
    box.changed = true;
    autosizeSetup('gs_msg', {minHeight: 50, maxHeight: 150});
    if (!cur.sel || isArray(cur.sel) && !cur.sel.length) {
      WideDropdown.focus('gft_box_dd');
    } else {
      elfocus('gs_msg');
    }
  },
  sendGift: function() {
    if (cur.giftsSendConfirmed) {
      var query = cur.giftsSendConfirmedQuery;
      cur.giftsSendConfirmed = false;

      var sendBtn = geByClass1('button_blue', cur.confirmBox.bodyNode.nextSibling).firstChild;
    } else {
      var mids = [], dd = cur.wdd && cur.wdd['gft_box_dd'], sel = dd.selected;
      for (var i in sel) {
        if (typeof(sel[i][4]) == 'string' && sel[i][4] != '' && sel[i][4] != 'none') {
          mids.push(sel[i][4]);
        } else {
          mids.push(sel[i][0]);
        }
      }
      mids = mids.join(',');
      if (!mids) {
        return WideDropdown.focus('gft_box_dd');
      }
      var query = {
        act: 'do_send',
        text: ge('gs_msg').value,//(isVisible('gs_msg_wrap') ? ge('gs_msg').value : ''),
        mids: mids,
        number: cur.gift,
        type: isChecked('gift_receiver_only') ? 1 : 0,
        hash: cur.hash,
        from: cur.giftSendFrom || '',
      };
      var sendBtn = geByClass1('button_blue', curBox().bodyNode.nextSibling).firstChild;
    }
    ajax.post('al_gifts.php', query, {
      onDone: function(data, text) {
        if (data === 'confirm') {
          while (boxQueue.count()) boxQueue.hideLast(false, window.event);
          cur.giftsSendConfirmed = 1;
          query.confirm = 1;
          cur.giftsSendConfirmedQuery = query;
          cur.confirmBox = showFastBox({title: cur.giftsTitle, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text, getLang('box_send'), cur.sendBoxGift, getLang('global_cancel'));
          return;
        }
        cur.giftCurrentMessage = '';
        updateMoney(data);
        curBox().hide();
        showDoneBox(text, {out: 1500})
        if (cur.giftsLeft) nav.reload();
      },
      showProgress: lockButton.pbind(sendBtn),
      hideProgress: unlockButton.pbind(sendBtn)
    });
  },
  initGiftsBox: function(box, opts) {
    box.setOptions({width: 620, bodyStyle: 'margin-top: 50px; padding: 0px', onShow: function() {
      if (cur.gftbxWasScroll) {
        boxLayerWrap.scrollTop = cur.gftbxWasScroll;
        cur.gftbxWasScroll = false;
      }
      addClass(boxLayerBG, 'bg_dark');
    }});
    if (opts.lang) {
      cur.lang = extend(cur.lang || {}, opts.lang);
    }

    if (cur.lSTL) re(cur.lSTL);
    if (cur.gftbxAddLnk) re(cur.gftbxAddLnk);
    extend(cur, {
      gftbxOffsets: cur.gftbxOffsets || {},
      gftbxPhCache: cur.gftbxPhCache || {},
      gftbxPhShown: cur.gftbxPhShown || {},

      gftbxAutoload: true,
      gftbxWasScroll: false,
      // gftbxHash: opts.hash,
      gftbxMid: opts.mid,
      gftbxId: box.tbId,
      gftbxAddLnk: ge('tb_'+box.tbId+'_prg').parentNode.insertBefore(se('<div class="gifts_add_lnk fl_r"><a href="/gifts?act=send" onclick="return Gifts.showGiftBox(cur.oid, event);">' + getLang('gifts_send_gift') + '</a></div>'), ge('tb_'+box.tbId+'_prg')),

      lSTL: boxLayerWrap.appendChild(ce('div', {id: 'layer_stl', innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>', el: box.bodyNode, onclick: cancelEvent, onmousedown: Gifts.lSTLDown, sc: Gifts.onGiftsScroll})),
      lSTLShown: 0,
      lSTLWas: 0,
      lSTLWasSet: 0
    });
    cur.gftbxOffsets[opts.tab] = opts.offset;

    ajax.preload('al_gifts.php', {
      act: 'box',
      tab: opts.tab,
      mid: opts.mid,
      offset: opts.offset
    }, opts.preload);

    if (!box.tbDeinit) {
      box.tbDeinit = function() {
        cur.gftbxMid = cur.gftbxOffsets = cur.gftbxPhShown = false;
        re(cur.lSTL);
        removeEvent(boxLayerWrap, 'scroll', Gifts.onGiftsScroll);
      }
      addEvent(boxLayerWrap, 'scroll', Gifts.onGiftsScroll);
    }

    if (cur.gftbxLoaded) cur.gftbxLoaded();
    onBodyResize();
    Gifts.onGiftsScroll();
  },
  moreGifts: function() {
    var t = curBox().tbCur;
    if (isVisible('gifts_more_prg' + t)) return;
    ajax.post('al_gifts.php', {act: 'box', tab: t, mid: cur.gftbxMid, offset: cur.gftbxOffsets[t]}, {
      onDone: function(rows, newOffset, needMore) {
        var el = ce('div', {innerHTML: rows}), cnt = ge('gifts_rows' + t);
        if (!cnt) return;

        for (var e = domFC(el); e; e = domFC(el)) {
          cnt.appendChild(e);
        }
        cur.gftbxOffsets[t] = newOffset;
        if (needMore) {
          Gifts.preloadGifts();
        } else {
          hide('gifts_more_link' + t);
        }
      }, showProgress: function() {
        hide('gifts_more_link' + t);
        show('gifts_more_prg' + t);
      }, hideProgress: function() {
        show('gifts_more_link' + t);
        hide('gifts_more_prg' + t);
      }, cache: 1
    });
    cur.gftbxAutoload = true;
  },
  preloadGifts: function() {
    var t = curBox().tbCur;
    ajax.post('al_gifts.php', {act: 'box', tab: t, mid: cur.gftbxMid, offset: cur.gftbxOffsets[t]}, {
      cache: 1
    });
  },
  lSTLDown: function(e) {
    e = e || window.event;
    if (checkEvent(e)) return;

    if (!__afterFocus) {
      var to = 0, st = boxLayerWrap.scrollTop;
      if (cur.lSTLWasSet && cur.lSTLWas) {
        to = cur.lSTLWas;
        cur.lSTLWas = 0;
      } else {
        cur.lSTLWas = st;
      }
      boxLayerWrap.scrollTop = to;
    }
    return cancelEvent(e);
  },
  onGiftsScroll: function() {
    var st = boxLayerWrap.scrollTop, mx = 200, vis = cur.lSTLWas || (st > mx), o = 0;
    cur.lSTL.style.marginTop = st + 'px';
    if (!vis) {
      if (cur.lSTLShown !== 0) {
        hide(cur.lSTL);
        cur.lSTLShown = 0;
      }
    } else {
      if (cur.lSTLShown !== 1) {
        show(cur.lSTL);
        cur.lSTLShown = 1;
      }
      if (cur.lSTLWas && st > 500) {
        cur.lSTLWas = 0;
      }
      if (st > mx) {
        o = (st - mx) / mx;
        if (cur.lSTLWasSet) {
          cur.lSTLWasSet = 0;
          val(domLC(cur.lSTL), getLang('global_to_top'));
          removeClass(domLC(cur.lSTL), 'down');
        }
      } else {
        o = (mx - st) / mx;
        if (cur.lSTLWas) {
          if (!cur.lSTLWasSet) {
            cur.lSTLWasSet = 1;
            val(domLC(cur.lSTL), '');
            addClass(domLC(cur.lSTL), 'down');
          }
        }
      }
    }
    setStyle(cur.lSTL, {opacity: Math.min(Math.max(o, 0), 1)});
    if (!cur.gftbxAutoload) return;
    var bt = lastWindowHeight, objMore = ge('gifts_more_link' + curBox().tbCur);
    if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
      objMore.click();
    }
  },
  showGiftBox: function(mid, ev) {
    if (window.Profile) {
      return Profile.showGiftBox(mid, ev);
    }
    cur.gftbxWasScroll = boxLayerWrap.scrollTop;
    boxLayerWrap.scrollTop = 0;
    if (cur.viewAsBox) return cur.viewAsBox();

    return !showBox('al_gifts.php', {act: 'get_gift_box', mid: mid, fr: (mid == vk.id ? 1 : 0)}, {stat: ['gifts.css', 'wide_dd.js', 'wide_dd.css'], cache: 1, dark: 1}, ev);
  }
}

try{stManager.done('gifts.js');}catch(e){}
