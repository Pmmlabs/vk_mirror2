var Offers = {

init: function() {
  cur.statusesDD = [];
},

edit: function(offerId) {
  showBox('offers.php', {act: 'edit', offer_id: offerId});
  return false;
},

preview: function(offerId) {
  showBox('offers.php', {act: 'show', preview: 1, offer_id: offerId || 0});
},

getSecret: function() {
  ajax.post('offers.php', {act: 'show_secret', offer_id: cur.offerId}, {
    onDone: function(title, html, js) {
      var box = showFastBox(title, html);
      eval(js);
    }
  });
  //showBox('offers.php', {act: 'show_secret', offer_id: cur.offerId});
},

switchTab: function(tab, obj, ev) {
  if (ev && (ev.button == 2 || ev.ctrlKey)) {
    return false;
  }
  var el = ge('tab_' + tab);
  if (el) {
    var tabs = geByClass('active_link', ge('offers_tabs'));
    for (var i in tabs) {
      removeClass(tabs[i], 'active_link');
    }
    addClass(el, 'active_link');
  }
  show('pages_progress');
  hide('pages_right_link');
  return nav.go(obj, ev);
},

gotoTable: function(t, ev) {
  var objLoc = nav.fromStr(nav.strLoc);
  delete(objLoc['f']);
  objLoc['f'] = t;
  nav.go(nav.toStr(objLoc), ev);
  return false;
},

save: function() {
  var params = {
    act: 'do_edit',
    offer_id: cur.offerId,
    title: val('offer_title'),
    short_desc: val('offer_short_desc'),
    desc: val('offer_desc'),
    man: val('offer_man'),
    link: val('offer_link'),
    link_type: cur.uiLinkType.val(),
    link_id: val('offer_link_id'),
    complete_on_join: cur.uiJoinComplete.checked() ? 1 : 0,
    tag: val('offer_tag'),
    need_validation: cur.uiValidation.val(),
    country: cur.uiCountry.val(),
    city: cur.uiCity.val(),
    sex: cur.uiSex.val(),
    age_from: cur.uiAgeFrom.val(),
    age_to: cur.uiAgeTo.val(),
    browser: cur.uiBrowser.val(),
    operator: cur.uiOperator.val(),
    status: cur.uiStatus.val(),
    percent: val('offer_percent')
  };
  if (ge('offer_limit')) {
    params.limit = val('offer_limit');
  }
  if (ge('offer_day_limit')) {
    params.day_limit = val('offer_day_limit');
  }
  if (ge('offer_spent')) {
    params.spent = val('offer_spent');
  }
  if (ge('offer_cost_field')) {
    params.cost = val('offer_cost_field');
  }
  lockButton(ge('offers_save'))
  ajax.post('offers.php', params, {
    onDone: function(text, secret, offerId, deleteHash) {
      debugLog(arguments);
      unlockButton(ge('offers_save'));
      var msg = ge('offers_msg');
      removeClass(msg, 'offers_error');
      msg.innerHTML = text;
      show(msg);
      setStyle(msg, {backgroundColor: '#F4EBBD'});
      animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
      scrollToTop(200);

      if (secret) {
        show('secret_field');
        show('tab_test');
        ge('offers_edit_hidden_secret').innerHTML = secret;
      }

      if (offerId) {
        cur.offerId = offerId;
        cur.deleteHash = deleteHash;
        nav.setLoc('offersdesk?act=edit&offer_id='+offerId);
        var links = geByTag('a', ge('offers_tabs'));
        each(links, function() {
          this.href = (this.href || '').replace(/offer_id=([0-9]+)/, 'offer_id='+offerId);
        });
      }
    },
    onFail: function(text) {
      if (text.substr(0, 6) == 'offer_') {
        notaBene(text);
      } else {
        var msg = ge('offers_msg');
        addClass(msg, 'offers_error');
        msg.innerHTML = text;
        show(msg);
        setStyle(msg, {backgroundColor: '#FCEC42'});
        animate(msg, {backgroundColor: '#FFEFE8'}, 2000);
        scrollToTop();
      }
      unlockButton(ge('offers_save'));
      return true;
    }
  });
},

remove: function() {
  var fbox = showFastBox(cur.lang['offers_remove'], cur.lang['offers_remove_sure'], getLang('box_yes'), function() {
    fbox.showProgress();
    ajax.post('offers.php', {
      act: 'do_delete',
      hash: cur.deleteHash,
      offer_id: cur.offerId
    }, {
      onDone: function() {
        fbox.showProgress();
        nav.go('offersdesk');
      }
    });
  }, getLang('box_no'));
},

ddStatus: function(obj, offer_id, type) {
  var key = offer_id + '_' + type;
  var dd = cur.statusesDD[key], options, title, label;
  if (!dd) {
    if (type == 3) {
      title = '<span class="offers_dd_title offers_dd_on_h"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_on']+'</span>';
      label = '<span class="offers_dd_title offers_dd_off"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_off']+'</span>';
      options = [{i: 2, l: label}];
    } else if (type == 2) {
      title = '<span class="offers_dd_title offers_dd_off_h"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_off']+'</span>';
      label = '<span class="offers_dd_title offers_dd_on"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_on']+'</span>';
      options = [{i: 3, l: label}];
    } else if (type == 1) {
      title = '<span class="offers_dd_title offers_dd_wait_h"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_moderate']+'</span>';
      label = '<span class="offers_dd_title offers_dd_off"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_off']+'</span>';
      options = [{i: 0, l: label}];
    } else if (type == 0) {
      title = '<span class="offers_dd_title offers_dd_off_h"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_off']+'</span>';
      label = '<span class="offers_dd_title offers_dd_wait"></span><span class="offers_dd_text">'+cur.lang['offers_statuses_moderate_send']+'</span>';
      options = [{i: 1, l: label}];
    }
    debugLog('create');
    dd = new DropdownMenu(options, {
      target: obj,
      title: title,
      showHover: false,
      offsetLeft: -1,
      offsetTop: 0,
      containerClass: 'dd_menu_posts',
      onSelect: function(val) {
        dd.destroy();
        delete cur.statusesDD[key];
        Offers.changeStatus(offer_id, dd.val());
      }
    });
    cur.statusesDD[key] = dd;
  }
  //dd.onInputClick();
  debugLog(dd);
  cur.dd = dd;
  dd.show();
  addClass(dd.header, 'dd_wide');
  addClass(dd.body, 'dd_wide');
},

changeStatus: function(offer_id, val) {
  var cont = ge('offers_row_'+offer_id);
  cont.innerHTML = '<img class="offers_center_upl" src="/images/upload.gif" />';
  ajax.post('offers.php', {act: 'do_change_status', offer_id: offer_id, hash: cur.hash, status: val}, {
    onDone: function(text) {
      cont.innerHTML = text;
    }
  });
},

changeLimit: function(obj, offer_id, per_day) {
  var pos = getXY(obj);
  var box = ge('offers_limit_box');

  cur.limitOfferId = offer_id;
  cur.limitObj = obj;
  cur.limitDay = per_day;

  if (!cur.startLimitBoxPos) {
    show(box);
    cur.startLimitBoxPos = getXY(box);
  }
  pos[0] -= cur.startLimitBoxPos[0] + 18;
  pos[1] -= cur.startLimitBoxPos[1] + 17;

  setStyle(box, {marginLeft: pos[0], marginTop: pos[1]});
  show(box);

  var input = ge('offers_limit_input');
  val(input, parseInt(obj.innerHTML.replace(/<.*>/g, '')) || 0);
  input.focus();

  setTimeout(function() {
    cur.onMouseClick = function(e) {
      var p = e.target;
      while(p = p.parentNode) {
        if (p == box) {
          return false;
        }
      }
      Offers.hideFocusBox();
    }
  }, 0);
},

hideFocusBox: function() {
  hide('offers_limit_box');
  cur.onMouseClick = false;
},

saveLimit: function() {
  var value = val('offers_limit_input');
  value = parseInt(value);
  lockButton(ge('offers_limit_save_btn'));
  ajax.post('offers.php', {act: 'do_change_limit', offer_id: cur.limitOfferId, hash: cur.hash, limit: value, per_day: cur.limitDay}, {
    onDone: function() {
      if (value) {
        value = value.toString();
        var c = [];
        for(var i = value.length - 3; i > -3; i -= 3) {
          c.unshift(value.slice(i > 0 ? i : 0, i + 3));
        }
        value = c.join('<span style="font-size:60%"> </span>');
        cur.limitObj.innerHTML = value;
      } else {
        cur.limitObj.innerHTML = cur.lang['offers_no_limit_set'];
      }
      unlockButton(ge('offers_limit_save_btn'));
      Offers.hideFocusBox();
    },
    onFail: function() {
      unlockButton(ge('offers_limit_save_btn'));
    }
  });
},

addToBanBox: function(type, offer_id) {
  var title = getLang('offers_'+type+'_box_title');
  ge('offers_ban_box_input').setAttribute('placeholder', getLang('offers_'+type+'_input'));
  cur.options.banType = type;
  cur.banBox = showFastBox(title, ge('offers_ban_box').innerHTML, getLang('global_add'), function() { Offers.searchToBan(offer_id); }, getLang('box_cancel'));
  return false;
},
searchToBan: function(offer_id) {
  var searchEl = ge('offers_ban_box_input'), query = trim(val(searchEl));
  var type = cur.options.banType;
  if (!query) {
    searchEl.focus();
    return;
  }
  hide('offers_ban_box_error');
  ajax.post('offers.php', {act: 'search_blacklist', type: type, query: query, offer_id: offer_id, hash: cur.options.hash}, {
    onDone: function (result, summary, row) {
      if (!result) {
        ge('offers_ban_box_error').innerHTML = summary;
        show('offers_ban_box_error');
        return;
      }

      val(searchEl, '');
      if (summary && summary != -1) {
        ge('offers_' + type + '_summary').innerHTML = summary;
      }
      if (row) {
        var rowEl = ce('div', {innerHTML: row}).firstChild, listEl = ge('offers_' + type);
        re(rowEl.id);
        listEl.insertBefore(rowEl, listEl.firstChild);
        hide('offers_' + type + '_empty');
      }
      cur.banBox.hide();
    },
    showProgress: function () {
      cur.banBox.showProgress();
    },
    hideProgress: function () {
      cur.banBox.hideProgress();
    }
  });
},
addToBan: function(type, oid, offer_id, link) {
  ajax.post('offers.php', {act: 'a_add_to_bl', type: type, oid: oid, offer_id: offer_id, hash: cur.options.hash}, {
    onDone: function (summary) {
      if (summary) {
        ge('offers_' + type + '_summary').innerHTML = summary;
      }
      link.onclick = function () {
        Offers.delFromBan(type, oid, offer_id, link);
        return false;
      };
      link.innerHTML = getLang('offers_unban');
    },
    onFail: function (msg) {
      setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
      return true;
    },
    showProgress: function () {
      hide(link);
      show('offers_progress_' + type + oid);
    },
    hideProgress: function () {
      show(link);
      hide('offers_progress_' + type + oid);
    }
  });
  return false;
},
delFromBan: function(type, oid, offer_id, link) {
  ajax.post('offers.php', {act: 'a_del_from_bl', type: type, oid: oid, offer_id: offer_id, hash: cur.options.hash}, {
    onDone: function (summary) {
      if (summary) {
        ge('offers_' + type + '_summary').innerHTML = summary;
      }
      link.onclick = function () {
        Offers.addToBan(type, oid, offer_id, link);
        return false;
      };
      link.innerHTML = getLang('offers_reban');
    },
    onFail: function (msg) {
      setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
      return true;
    },
    showProgress: function () {
      hide(link);
      show('offers_progress_' + type + oid);
    },
    hideProgress: function () {
      show(link);
      hide('offers_progress_' + type + oid);
    }
  });
  return false;
},

_eof: 1};try{stManager.done('offers.js');}catch(e){}
