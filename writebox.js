var WriteBox = {
  mrg: function(v) {
    return vk.rtl ? {marginRight: v} : {marginLeft: v};
  },
  show: function(box, opts) {
    addClass(boxLayerBG, 'bg_dark');
    box.setOptions({hideButtons: true, width: 502, bodyStyle: 'padding: 0px; border: 0px;'});
    box.removeButtons();

    cur.lang = extend(cur.lang || {}, opts.lang);
    extend(cur, {
      mbTxtInp: {},
      mbEditable: opts.editable,
      mbSmile: ge('mbe_smile'),
      mbEmoji: opts.emoji,
      mbMedia: null,
      mbField: ge(opts.editable ? 'mail_box_editable' : 'mail_box_text'),
      mbAva: ge('mail_box_ava'),
      mbMediaTypes: opts.mediaTypes,
      mbTo: opts.toData,
      mbHash: opts.hash,
      mbBannedHim: opts.bannedhim
    });

    if (opts.emojiRcnt && !cur.mbRcntEmoji) {
      var html = [];
      for (var a = opts.emojiRcnt, i = 0, l = a.length; i < l; ++i) {
        var code = a[i];
        if (!code) continue;
        html.push('<a id="mbe_rc_em_' + code + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + code + '\', this); return cancelEvent(event);">' + Emoji.getEmojiHTML(code, false, true) + '</a>');
      }
      cur.mbRcntEmoji = html.join('');
    }
    val('mbe_rcemoji', cur.mbRcntEmoji || '');


    cur.sharedImWrite = {};
    cur.emojiWId = Emoji.init(cur.mbField, {
      ttDiff: -47,
      controlsCont: ge('mbe_emoji_wrap'),
      shouldFocus: true,
      onSend: WriteBox.send,
      rPointer: true,
      noEnterSend: 1,
      forceTxt: !opts.editable,
      sharedTT: cur.sharedImWrite,
      txt: ge('mail_box_editable'),
      checkEditable: WriteBox.checkEditable,
      saveDraft: WriteBox.saveDraft,
      rceCont: ge('mbe_rcemoji_cont'),
      addMediaBtn: ge('mail_box_add_row'),
      sendWrap: ge('mail_box_controls'),
      onKeyAction: function(e) {
        clearTimeout(cur.saveWriteBoxDraft);
        cur.saveWriteBoxDraft = setTimeout(WriteBox.saveDraft, e.type == 'paste' ? 0 : 300);
      },
      onStickerSend: function(stNum) {
        var text = trim(Emoji.editableVal(cur.mbField)), media = cur.mbMedia.getMedias();
        var dd = cur.wdd && cur.wdd['mail_box_dd'];

        if (!dd || !dd.selCount) {
          return elfocus('mail_box_inp');
        }
        var to_ids = [];
        for (var i in dd.selected) {
          to_ids.push(i.replace(/_$/, ''));
        }
        to_ids = to_ids.join(',');

        ajax.post('/al_mail.php', {act: 'a_send', to_ids: to_ids, chas: cur.mbHash, msg: '', ts: cur.ts, media: 'sticker:'+stNum, send_sticker: 1, from: 'box'}, {
          onDone: function(doneText, peer) {
            if (text || media.length) {
              WriteBox.send(false);
            } else {
              if (peer) {
                ls.set('im_draft' + vk.id + '_' + peer, false);
              }
              curBox().hide();
              showDoneBox(doneText);
            }
          },
          showProgress: lockButton.pbind('mail_box_send'),
          hideProgress: unlockButton.pbind('mail_box_send'),
          onFail: function(failText) {
            setTimeout(showFastBox(getLang('global_error'), failText).hide, 3000);
            return true;
          }
        });
      }
    });

    if (!cur.mbTo[0]) {
      setStyle(ge('mail_box_topic'), WriteBox.mrg(0));
      cur.mbHidden = true;
    } else {
      cur.mbHidden = false;
    }

    /*if (!cur.mbEditable) {
      autosizeSetup(cur.mbField, {minHeight: 120})
      setTimeout(elfocus.pbind(cur.mbField), 0);
    }*/

    cur.imwEmoji = -1;

    var tmp = cur.postTo;
    cur.postTo = false;
    box.setOptions({onHide: function() {
      removeClass(boxLayerBG, 'bg_dark');
      removeEvent(document, 'keydown', WriteBox.onKey);
      if (cur.mbEmojiShown) Emoji.ttClick(cur.emojiWId, cur.mbSmile, true);
      if (cur.mbOnMouseClick) {
        cur.onMouseClick = cur.mbOnMouseClick;
        cur.mbOnMouseClick = false;
      }
      if (browser.mozilla) {
//        document.execCommand("enableObjectResizing", false, true);
      }
    }, onShow: function() {
      addClass(boxLayerBG, 'bg_dark');
      addEvent(document, 'keydown', WriteBox.onKey);
      if (!cur.mbOnMouseClick) {
        cur.mbOnMouseClick = cur.onMouseClick;
      }
      if (browser.mozilla) {
//        document.execCommand("enableObjectResizing", false, false);
      }
      if (cur.sorterClbk) {
        cur.sorterClbk();
        delete cur.sorterClbk;
      }
    }, onClean: function() {
      clearTimeout(cur.mbSaveDraftTO);
      delete cur.mbSaveDraftTO;
      delete cur.mbField;
      cur.postTo = tmp;
      cur.mbEmojiScroll = cur.mbEmojiExpanded = false;
      if (window.WideDropdown) WideDropdown.deinit('mail_box_dd');
    }});
    addEvent(document, 'keydown', WriteBox.onKey);
    if (!cur.mbOnMouseClick) {
      cur.mbOnMouseClick = cur.onMouseClick;
    }
    if (browser.mozilla) {
//      document.execCommand("enableObjectResizing", false, false);
    }

    if (!window._mbFriends) { // is used in sharebox.js too!
      ajax.post('hints.php', {act: 'a_json_friends', from: 'imwrite', str: '', need_stickers: 1}, {onDone: function(arr, stickersList) {
        window._mbFriends = arr;
        var dd = (cur.wdd && cur.wdd['mail_box_dd']);
        if (dd) {
          WideDropdown.items('mail_box_dd', arr);
        }
        if (stickersList) {
          window.emojiStickers = stickersList;
        }
      }});
    }
    stManager.add(['wide_dd.js', 'wide_dd.css'], function() {
      if (WideDropdown.init('mail_box_dd', {
        defaultItems: window._mbFriends,
        url: 'hints.php',
        params: {act: 'a_json_friends', from: 'imwrite'},
        noResult: getLang('mail_not_found'),
        img: cur.mbAva,
        introText: getLang('mail_choose_recipient'),
        custom: function(q) {
          return (q.indexOf('@') != -1) ? [[clean(q), clean(q), getLang('mail_enter_email_address'), '/images/pics/contact50.gif', 0, '']] : false;
        },
        chooseOnBlur: function(id) {
          id = trim(id + '');
          return id.length < 64 && id.match(/^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]{2,6}$/i);
        },
        onChange: function(act) {
          var dd = cur.wdd['mail_box_dd'], sel = dd.selCount, peer = false, draft, ret = true;
          if (sel == 1 && !WriteBox.editableHasVal(cur.mbField)) {
            for (peer in dd.selected) break;
            WriteBox.restoreDraft(peer);
          }
          if (act == 1) { // added
            setTimeout(cur.mbEditable ? Emoji.editableFocus.pbind(cur.mbField, domLC(cur.mbField)) : elfocus.pbind(cur.mbField), 0);
          }
          var t = Fx.Transitions.easeOutCubic, d = 150, f = 'ease-out';
          if (sel < 1 && !cur.mbHidden) {
            cssAnim(cur.mbAva, extend({opacity: 0}, WriteBox.mrg(-26)), {duration: d, transition: t, func: f}, hide.pbind(cur.mbAva));
            cssAnim(ge('mail_box_topic'), WriteBox.mrg(0), {duration: d, transition: t, func: f});
            cur.mbHidden = true;
            ret = 0;
          } else if (sel > 0 && cur.mbHidden) {
            show(cur.mbAva);
            cssAnim(cur.mbAva, extend({opacity: 1}, WriteBox.mrg(0)), {duration: d, transition: t, func: f});
            cssAnim(ge('mail_box_topic'), WriteBox.mrg(26), {duration: d, transition: t, func: f});
            cur.mbHidden = false;
            ret = 1;
          }
          WriteBox.checkLen(cur.mbField);
          WriteBox.showToFull();
          val('mail_box_to_header', getLang((sel > 1) ? 'mail_rcpnts' : 'mail_rcpnt'));
          return ret;
        },
        itemMark: function(item) {
          return intval(item[5]) ? 1 : 0;
        }
      })) {
        WideDropdown.select('mail_box_dd', false, cur.mbTo);
      }
    });
    stManager.add(['page.js', 'page.css'], function() {
      cur.mbMedia = initAddMedia('mail_box_add_link', 'mail_box_added_row', cur.mbMediaTypes, {mail: 1, nocl: 1, editable: 1, sortable: 1, teWidth: 350, teHeight: 300, toggleLnk: true});
      cur.mbMedia.onChange = function() {
        box.changed = true;
      }
      if (ls.checkVersion() && cur.mbTo[0]) {
        WriteBox.restoreDraft(cur.mbTo[0]);
      }
    });
  },
  getPeer: function () {
    var dd = cur.wdd['mail_box_dd'],
        sel = (dd) ? dd.selCount : false,
        peer = false;
    if (sel != 1) {
      return false;
    }
    for (peer in dd.selected)
      break;
    return intval(peer);
  },
  restoreDraft: function(needPeer) {
    var peer = WriteBox.getPeer();
    if (!peer || needPeer && peer != intval(needPeer) || browser.mobile || !cur.mbMedia) return;

    var draft = ls.get('im_draft' + vk.id + '_' + peer);
    if (draft) {
      if (!WriteBox.editableHasVal(cur.mbField)) {
        if (cur.mbEditable) {
          val(cur.mbField, clean(draft.txt || '').replace(/\n/g, '<br/>'));
          if (window.Emoji) {
            Emoji.editableFocus(cur.mbField, false, true);
          }
        } else {
          val(cur.mbField, draft.txt || '');
        }
      }
      if ((draft.medias || []).length && !(cur.mbMedia.chosenMedias || []).length) {
        var m = [];
        for (var i in draft.medias) {
          if (!draft.medias[i]) continue;
          m.push(draft.medias[i].slice(0, 2).join(','));
        }
        ajax.post('al_im.php', {act: 'draft_medias', media: m.join('*')}, {onDone: function(resp) {
          if (!cur.mbField || WriteBox.getPeer() != peer || !(resp || []).length) return;
          each(resp, function() {
            var args = [this[0], this[1], this[2], this[3], true];
            cur.mbMedia.chooseMedia.apply(cur.mbMedia, args);
          });
        }});
      }
    }
    WriteBox.checkEditable(cur.emojiWId, cur.mbField);
    WriteBox.checkLen(cur.mbField);
  },
  saveDraft: function() {
    var peer = WriteBox.getPeer();
    if (!peer) return;

    var data = {
      txt: trim(Emoji.editableVal(cur.mbField)),
      medias: []
    }, m = cur.mbMedia.getMedias();
    for (var i = 0, l = m.length; i < l; ++i) {
      if (m[i]) data.medias.push([m[i][0], m[i][1]]);
    }
    if (!data.medias.length && !data.txt.length) {
      data = false;
    };
    ls.set('im_draft' + vk.id + '_' + intval(peer), data);
  },
  toFull: function(ev, peer) {
    if (checkEvent(ev)) return;

    val('mail_box_to_full', '<div class="progress" style="display: block"></div>');
    var query = {'0': 'im', sel: peer};
    var msg = trim(Emoji.editableVal(cur.mbField));
    if (msg) {
      query.message = msg;
    }
    if (cur.mbMedia.chosenMedias) {
      var meds = cur.mbMedia.getMedias(), media = [];
      for (var i = 0, l = meds.length; i < l; ++i) {
        var el = meds[i], row = [];
        for (var k in el) {
          if (typeof(el[k]) != 'object') {
            row.push(el[k]);
          }
        }
        media.push(row.join(','))
      }
      query.media = media.join('*');
    }
    nav.go(query, null, {noframe: 1});
    return false;
  },

  showToFull: function() {
    hide('mail_box_to_full');
    var mid = false, dd = cur.wdd && cur.wdd['mail_box_dd'], sex = 0, text = '', sel;
    for (var i in dd.selected) {
      sel = dd.selected[i];
      if (mid) return;
      mid = sel[0];
      if (mid != intval(mid)) return;
      sex = sel[6];
      text = sel[7];
    }
    if (mid > 2e9) {
      val('mail_box_to_full', '<a href="/im?sel=c' + (mid - 2e9) + '" onclick="return WriteBox.toFull(event, ' + mid + ')">' + getLang('mail_im_to_multidialog') + '</a>');
      show('mail_box_to_full');
    } else {
      if (!mid || !sex || !text) return;
      val('mail_box_to_full', ('<a href="/im?sel=' + mid + '" onclick="return WriteBox.toFull(event, ' + mid + ')">' + getLang('mail_go_to_dialog') + '</a>').replace('%s', text));
      show('mail_box_to_full');
    }
  },
  send: function(sure) {
    if (buttonLocked('mail_box_send')) return;

    var text = trim(Emoji.editableVal(cur.mbField)), media = cur.mbMedia.getMedias(), dd = cur.wdd && cur.wdd['mail_box_dd'];
    if (!dd || !dd.selCount) return elfocus('mail_box_inp');

    if (cur.mbEditable) {
      WriteBox.extractEmoji();
    }

    var params = {
      act: 'a_send',
      chas: cur.mbHash,
      message: text,
      title: (isVisible('mail_box_title_wrap') && val('mail_box_title') || ''),
      from: 'box',
      media: [],
      to_ids: []
    };
    for (var i = 0, l = media.length, v; i < l; ++i) {
      if (v = media[i]) {
        params.media.push(v[0] + ':' + v[1]);
      }
    }
    params.media = params.media.join(',');

    if (!text && !params.media) {
      return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
    }

    for (var i in dd.selected) {
      params.to_ids.push(i.replace(/_$/, ''));
    }
    params.to_ids = params.to_ids.join(',');

    if (cur.mbBannedHim == params.to_ids && sure !== true) {
      showBox('al_profile.php', {act: 'banned_him', action: 'mail', mid: cur.mbBannedHim}).onContinue = WriteBox.send.pbind(true);
      return;
    }

    ajax.post('al_mail.php', params, {onDone: function(text, peer) {
      if (peer) {
        ls.set('im_draft' + vk.id + '_' + peer, false);
      }
      curBox().hide();
      showDoneBox(text);
    }, showProgress: lockButton.pbind('mail_box_send'), hideProgress: unlockButton.pbind('mail_box_send')});
  },
  checkLen: function(inp) {
    cur.mbTxtInp.value = Emoji.editableVal(inp);
    checkTextLength(4096, cur.mbTxtInp, 'mail_box_warn');
    var dd = cur.wdd && cur.wdd['mail_box_dd'], mchat = dd.full && (dd.selCount == 1);
    if (!dd) return;
    if (mchat) {
      for (var i in dd.selected) {
        mchat = intval(i) > 2e9;
      }
    }
    toggle('mail_box_title_wrap', (cur.mbTxtInp.lastLen > 200 && !mchat || dd.selCount > 1 || val('mail_box_title')));
  },

  codeToChr: function(code) {
    var len = code.length / 4;
    var chr = '';
    var i = 0;
    while(len--) {
      chr += String.fromCharCode(parseInt(code.substr(i, 4), 16))
      i += 4;
    }
    return chr;
  },
  editableHasVal: function(cont) {
    if (!cont) return false;
    if (cont.tagName == 'TEXTAREA') return !!val(cont);
    return !!(geByTag1('IMG', cont) || stripHTML(val(cont)).replace(/[\s\xa0]/g, '').length);
  },

  checkEditable: function(optId, obj) {
    if (!cur.mbEditable) return;

    /*var diff = (cur.mbField.scrollHeight > cur.mbField.offsetHeight) ? sbWidth() : 0;
    var bl = ge('mbe_emoji_block');
    setStyle(ge('mbe_smile'), vk.rtl ? {marginRight: 425 - diff} : {marginLeft: 425 - diff});
    if (bl) setStyle(bl, vk.rtl ? {marginRight: 335 - diff} : {marginLeft: 335 - diff});*/

    Emoji.checkEditable(optId, obj, {height: 180});
  },

  cssAnimation: function() {
    var v = intval(browser.version);
    if ((browser.chrome && v > 14) || (browser.mozilla && v > 13) || (browser.opera && v > 2)) {
      return true;
    }
    return false;
  },


  onKey: function (e) {
    var inputActive = (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || e.target.id == 'mail_box_editable');

    if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !inputActive) {
      if (cur.mbEditable) {
        Emoji.editableFocus(cur.mbField, false, true);
      } else {
        var el = cur.mbField;
        !el.active && elfocus(el);
      }
    }
    return true;
  },

  extractEmoji: function() {
    var emjs = geByClass('emoji', cur.mbField);
    var newRc = {};
    for(var i in emjs) {
      newRc[Emoji.getCode(emjs[i])] = 1;
    }
    var rcCont = ge('mbe_rcemoji');
    var rchtml = '';
    var ml = 0;
    for (var code in newRc) {
      if (ge('mbe_rc_em_'+code)) continue;
      rchtml += '<a id="mbe_rc_em_'+code+'" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \''+code+'\', this); return cancelEvent(event);">'+Emoji.getEmojiHTML(code, false, true)+'</a>';
      ml -= 22;
    }
    cur.mbRcntEmoji = (rchtml + val(rcCont)).split('a><a').slice(0, 7).join('a><a');
    if (cur.mbRcntEmoji.match(/<\/$/)) cur.mbRcntEmoji += 'a>';
    rcCont.insertBefore(cf(rchtml), rcCont.firstChild);
    setStyle(rcCont, {marginLeft: ml});
    animate(rcCont, {marginLeft: 0}, {duration: 150, transition: Fx.Transitions.easeOutCubic, onComplete: function() {
      var emjs = geByClass('mbe_rc_emojibtn', rcCont).slice(7);
      for(var i in emjs) {
        re(emjs[i]);
      }
    }});
  }

}

try{stManager.done('writebox.js');}catch(e){}
