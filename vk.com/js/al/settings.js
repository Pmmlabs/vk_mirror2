var Settings = {

  MAX_LEFT_GROUPS: 5,

  go: function(el, ev) {
    var current = Settings.getsect();
    var result = checkEvent(ev);
    if (result === false) {
      current.className = '';
      el.parentNode.className = 'active_link';
    }
    return nav.go(el, ev);
  },
  getsect: function() {
    var current = ge('settings_filters').firstChild
    for (; !hasClass(current, 'active_link');) {
      current = current.nextSibling;
    }
    return current;
  },
  showResultMsg: function(msg) {
    ge('settings_result').innerHTML = msg;
    show('settings_result');
    animate(ge('settings_save_msg'), {backgroundColor: '#F9F6E7'}, 2000);
  },

  savePrivacyDone: function(id) {
    var pe = ge(id), el = domPN(pe);
    if (!pe) return;

    for (; el && el.tagName != 'TR';) el = domPN(el);
    if (!el) return;

    for (; el && !hasClass(domFC(el), 'settings_privacy_h');) el = domPS(el);
    if (!el) return;

    el = geByClass1('settings_privacy_saved', el);
    if (!el) return;

    var y = getXY(el)[1], f = animate.pbind(el, {opacity: 1}, 200, animate.pbind(el, {opacity: 0}, 2000));
    if (scrollGetY() > y - 20) {
      scrollToY(y - 20, 200);
      setTimeout(f, 200);
    } else {
      f();
    }
  },
  savePrivacyKey: function(key) {
    if (key == 'friends') {
      Settings.savePrivacyDone('privacy_friends_hide');
      return;
    }
    var url, params = {key: key, val: Privacy.getValue(key), hash: cur.options.hash};
    if (key == 'search_access' || key == 'updates') {
      if (key == 'updates') {
        var val = Privacy.getValue(key);
        if (val.substr(0,1) != '0') {
          var items = val.substr(2);
          if (!items.length) {
            ge('privacy_header').innerHTML = ge('privacy_edit_updates').innerHTML = getLang('settings_updates_no_news');
          }
        }
      }
      url = 'al_settings.php';
      params.act = 'a_save_special';
    } else {
      url = 'al_friends.php';
      params.act = 'save_privacy';
    }

    clearTimeout(cur['privacy_timer_' + key]);
    cur['privacy_timer_' + key] = setTimeout(ajax.post.pbind(url, params, {
      onDone: Settings.savePrivacyDone.pbind('privacy_edit_' + key)
    }), 500);
  },
  savePrivacy: function() {
    var params = {act: 'a_save_privacy', hash: cur.options.privacy_hash};
    each (cur.options.privacy_keys, function (k, v) {
      params[(v == 'updates' || v == 'search_access' ? '' : 'privacy_') + v] = Privacy.getValue(v);
    });
    ajax.post('al_settings.php', params, {
      onDone: function (result) {
        ge('settings_privacy_result').innerHTML = result;
        show('settings_privacy_result');
        animate(ge('settings_save_msg'), {backgroundColor: '#F9F6E7'}, 2000);
        scrollToTop(200);
      }
    });
  },
  initPrivacy: function () {
    cur.onPrivacyChanged = Settings.savePrivacyKey;
  },

  initBlacklist: function () {
    var searchEl = ge('settings_bl_search')
    placeholderSetup(searchEl);
    addEvent(searchEl, 'keydown', function (e) {
      if (e.keyCode == 13) {
        Settings.doSearchBl();
      }
    });
    if (ge('settings_bl_msg')) {
      animate('settings_bl_msg', {backgroundColor: '#F9F6E7'}, 2000);
    }
  },
  doSearchBl: function () {
    var searchEl = ge('settings_bl_search'), query = trim(val(searchEl));
    if (!query) {
      searchEl.focus();
      return;
    }
    ajax.post('al_settings.php', {act: 'search_blacklist', query: query, hash: cur.options.blacklist_hash}, {
      onDone: function (summary, row, result) {
        val(searchEl, '');
        if (summary && summary != -1) {
          ge('settings_bl_summary').innerHTML = summary;
        }
        var rowEl = ce('div', {innerHTML: row}).firstChild, listEl = ge('settings_bl_list');
        re(rowEl.id);
        listEl.insertBefore(rowEl, listEl.firstChild);
        ge('settings_bl_result').innerHTML = result;
        show('settings_bl_noempty', 'settings_bl_result');
        hide('settings_bl_empty');
        animate('settings_bl_msg', {backgroundColor: '#F9F6E7'}, 2000);
        unlockButton(ge('search_bl_submit'));
      },
      showProgress: function () {
        lockButton(ge('search_bl_submit'));
      },
      hideProgress: function () {
      }
    });
  },
  addToBl: function (mid, hash, link) {
    ajax.post('al_settings.php', {act: 'a_add_to_bl', id: mid, hash: hash, from: 'settings'}, {
      onDone: function (summary) {
        if (summary) {
          ge('settings_bl_summary').innerHTML = summary;
        }
        hide('settings_bl_label' + mid);
        link.onclick = function () {
          Settings.delFromBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('settings_remove');
      },
      onFail: function (msg) {
        setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, msg).hide, 2000);
        return true;
      },
      showProgress: function () {
        hide(link);
        show('settings_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('settings_progress' + mid);
      }
    });
  },
  delFromBl: function (mid, hash, link) {
    ajax.post('al_settings.php', {act: 'a_del_from_bl', id: mid, hash: hash, from: 'settings'}, {
      onDone: function (summary) {
        if (summary) {
          ge('settings_bl_summary').innerHTML = summary;
        }
        setStyle('settings_bl_label' + mid, 'display', 'inline');
        link.onclick = function () {
          Settings.addToBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('settings_restore_blacklist');
      },
      onFail: function (msg) {
        setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, msg).hide, 2000);
        return true;
      },
      showProgress: function () {
        hide(link);
        show('settings_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('settings_progress' + mid);
      }
    });
  },
  delTopFromBl: function (mid, hash, link) {
    var progress = ce('img', {src: '/images/upload.gif'});
    ajax.post('al_settings.php', {act: 'a_del_from_bl', id: mid, hash: hash, from: 'settings'}, {
      onDone: function (summary) {
        if (summary) {
          ge('settings_bl_summary').innerHTML = summary;
        }
        setStyle('settings_bl_label' + mid, 'display', 'inline');
        var rightLnk = geByTag1('a', geByClass1('settings_bl_action', ge('settings_bl_row' + mid)));
        rightLnk.onclick = function () {
          Settings.addToBl(mid, hash, rightLnk);
          return false;
        };
        rightLnk.innerHTML = getLang('settings_restore_blacklist');
        hide('settings_bl_result');
      },
      showProgress: function () {
        link.parentNode.replaceChild(progress, link);
      },
      hideProgress: function () {
        progress.parentNode.replaceChild(link, progress);
      }
    });
  },

  saveSmsNotify: function(btn) {
    lockButton(btn);

    var params = {act: 'a_save_sms_notify', hash: cur.options.notify_hash};
    each (cur.options.notify_sms_keys, function (k, v) {
      params[v] = Privacy.getValue(v);
    });
    params.smsenabled = cur.smsenabled.checked() ? 1 : 0;
    if (cur.daytime.checked()) {
      params.daytime_from = ge("daytime_from").value;
      params.daytime_to = ge("daytime_to").value;
    } else {
      params.daytime_from = 0;
      params.daytime_to = 0;
    }
    ajax.post('al_settings.php', params, {
      onDone: function(result, html, href) {
        unlockButton(btn);
        if (html && href) {
          showFastBox({title: result, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, html, getLang('settings_subscribe_to_service_btn'), function() {
            window.open(href);
            curBox().hide();
          }, getLang('box_cancel'), function() {
            cur.smsenabled.setState(0);
            Settings.saveSmsNotify();
            curBox().hide();
          });
        } else {
          Settings.showResultMsg(result);
        }
      },
      onFail: function(msg) {
        unlockButton(btn);
        cur.smsenabled.setState(0);
        Settings.saveSmsNotify();
      }
    });
  },

  saveInstantNotify: function(btn) {
    lockButton(btn);

    var params = {act: 'a_save_instant_notify', hash: cur.options.notify_hash};
    each (cur.options.notify_instant_keys, function (k, v) {
      params[v] = Privacy.getValue(v);
    });
    params.itexts = isChecked('settings_itexts') ? 0 : 1;
    ajax.post('al_settings.php', params, {
      onDone: function (result) {
        unlockButton(btn);
        Settings.showResultMsg(result);
      }
    });
  },

  saveMailNotify: function(btn) {
    lockButton(btn);

    var params = {act: 'a_save_mail_notify', hash: cur.options.notify_hash};
    params.mail_period = Privacy.getValue('mail_period');
    each (cur.options.notify_mail_keys, function (k, v) {
      params[v] = isChecked(v) ? 1 : 0;
    });
    ajax.post('al_settings.php', params, {
      onDone: function (result) {
        unlockButton(btn);
        Settings.showResultMsg(result);
        scrollToTop();
      }
    });
  },

  initNotify: function() {
    if (ls.get('sound_notify_off')) {
      removeClass('settings_isounds', 'on');
    }
    cur.reloadOnMailBind = true;
    cur.smsenabled = new Checkbox(ge('smsenabled'), {
      width: 210,
      checked: cur.options.sms_notifications_enabled,
      label: getLang('settings_sms_enable_checkbox'),
      onChange: function(state) {
        if (state == 1) {
          slideDown(ge("sms_options"), 200);
          show('sms_options_msg');
        } else {
          if (isVisible('sms_options')) {
            hide('sms_options_msg');
            slideUp(ge("sms_options"), 200);
          }
        }
      }
    });
    cur.daytime = new Checkbox(ge("daytime"), {
      width: 210,
      checked: cur.options.time_checked,
      label: getLang('settings_sms_limit_daytime'),
      onChange: function(state) {
        if (state == 1) {
          slideDown(ge("daytime_from_to"), 200);
        } else {
          slideUp(ge("daytime_from_to"), 200);
        }
      }
    });
    var uiDaytimeFrom = new Dropdown(ge("daytime_from"), ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], {
      selectedItems: cur.options.time_from,
      width: 60
    });
    var uiDaytimeTo = new Dropdown(ge("daytime_to"), ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], {
      selectedItems: cur.options.time_to,
      width: 60
    });
  },
  updateInstantSounds: function (val) {
    ls.set('sound_notify_off', !val ? 1 : 0);
  },
  smsUnsubscribe: function(lnk, oid, hash, ev) {
    var name = '<a href="'+lnk.href+'">'+lnk.innerHTML+'</a>', row = 1;
    if (oid < 0) {
      row = ev ? 3 : 2;
      var msg = ev ? getLang('settings_confirm_unsubscribe_event_msg') : getLang('settings_confirm_unsubscribe_group_msg');
    } else {
      var msg = getLang('settings_confirm_unsubscribe_fan_msg');
    }
    msg = msg.replace('{name}', name);
    showFastBox({title: getLang('settings_confirm_unsubscribe_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, msg, getLang('box_yes'), function() {
      ajax.post('/settings', {act: 'a_sms_unsubscribe', hash: hash, oid: oid, row: row}, {onDone: function(t) {
        var el = ge('sms_subscribes_row' + row);
        if (t) {
          el.innerHTML = t;
        } else {
          hide(el.parentNode);
        }
        curBox().hide();
      }, progress: curBox().progress});
    }, getLang('box_no'));
    return false;
  },

  updatePIN: function(hash) {
    lockButton(ge('pin_btn'));
    var params = {act: 'a_change_pin', pin: ge('pin').value, hash: hash};
    ajax.post('al_settings.php', params, {
      onDone: function (result) {
        unlockButton(ge('pin_btn'));
        ge('settings_result').innerHTML = result;
        show('settings_result');
        animate(ge('settings_save_msg'), {backgroundColor: '#F9F6E7'}, 2000);
        scrollToTop();
      }
    });
  },
  twitterRequestNew: 1,
  openTwitterSettings: function() {
    if (!Settings.twitterMB) {
      var edit_content = '<div class="info_msg" style="margin:-5px 0px 14px 0px; _margin-top:0px; font-weight: normal; line-height: 150%"><img align="left" src="/images/twitter_sync.png" style="margin: 3px 9px 20px 0px;" /><b>Twitter</b><br />'+getLang('settings_twitter_desc')+'</div>';
      Settings.twitterMB = new MessageBox({title: getLang('settings_status_export'), progress: 'socialProgress', selfDestruct: false, onHide: function() { if (twitterRequst) clearInterval(twitterRequst); }});
      Settings.twitterMB.addButton(getLang('global_cancel'), Settings.twitterMB.hide, 'gray');
      Settings.twitterMB.content(edit_content + '<div align="center">'+getLang('settings_external_site_request')+'<div>').show();
      show('socialProgress');
      var twitterRequst = setInterval(function() {
        ajax.post('/al_settings.php', {act: 'a_get_twitter_login_url', 'new': Settings.twitterRequestNew}, {
          onDone: function(result) {
            if (result && result.data) {
              clearInterval(twitterRequst);
              hide('socialProgress');
              Settings.twitterMB.addButton(getLang('settings_auth_in_twitter'), function() { location.href = result.data; });
              Settings.twitterMB.content(edit_content + '<center>'+getLang('settings_authorize_please')+'</center>');
            }
          }
        });
        Settings.twitterRequestNew = 0;
      }, 1000);
    } else {
      Settings.twitterMB.show();
    }
  },
  openFacebookSettings: function(app_id, redir) {
    var url = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&redirect_uri=' + redir + '&scope=offline_access,publish_stream&display=popup';
    var params = 'scrollbars=0,resizable=1,menubar=0,location=0,width=600,height=400,toolbar=0,status=0';
    var win = window.open(url, 'fb', params);
    try {
      if (!browser.msie) {
        win.blur();
      }
      win.focus();
    } catch(e) {
    }
  },
  openLiveJournalSettings: function() {
    slideDown(ge('lj_data'), 200, function() { elfocus('lj_login'); });
    show('lj_btn', 'cancel_lj_data');
    hide('show_lj_data');
  },
  cancelLiveJournalSettings: function() {
    slideUp(ge('lj_data'), 200);
    show('show_lj_data');
    hide('lj_btn', 'cancel_lj_data');
    ajax.post('/settings', {act: 'a_clear_social_export', service: 2, hash: cur.options.social_hash});
    hide('lj_error');
  },
  submitLiveJournalSettings: function() {
    if (!trim(ge('lj_login').value)) {
      notaBene('lj_login');
      return;
    }
    if (!trim(ge('lj_password').value)) {
      notaBene('lj_password');
      return;
    }
    lockButton(ge('lj_btn'));
    hide('lj_error');

    var params = {act: 'a_lj_submit', login: ge('lj_login').value, password: ge('lj_password').value, hash: cur.options.social_hash};
    ajax.post('/al_settings.php', params, {
      onDone: function(result) {
        Settings.getLiveJournalName(1);
      }
    });
  },
  showExportResult: function(result) {
    if (!result || result.error == undefined) return;
    if (result.error != '') {
      Settings.showResultMsg(getLang('settings_status_export_failed'));
      scrollToTop();
      return;
    }
    ge('fb_export_data').innerHTML = result.html;
    Settings.getFacebookName();
  },
  getTwitterName: function() {
    var nameService1 = setInterval(function() {
      ajax.post('/al_settings.php', {act: 'a_get_twitter_name'}, {
        onDone: function(text) {
          if (text != '') {
            clearInterval(nameService1);
            var ns = ge('name_service1');
            ns.href = 'http://twitter.com/' + text;
            ns.innerHTML = text;
          }
        }
      });
    }, 1000);
  },
  getFacebookName: function() {
    var nameService3 = setInterval(function() {
      ajax.post('/al_settings.php', {act: 'a_get_facebook_name'}, {
        onDone: function(result) {
          if (result && result.login && result.name) {
            clearInterval(nameService3);
            var ns = ge('name_service3');
            ns.href = result.name[0] == '+' ? 'http://facebook.com/app_scoped_user_id/' + result.name.substring(1) : 'http://facebook.com/profile.php?id=' + result.name;
            ns.innerHTML = result.login;
          } else if (result && result.login == undefined) {
            clearInterval(nameService3);
            ge('name_service3').innerHTML = '<span style="color: #800">' + result + '</span>';
          }
        }
      });
    }, 1000);
  },
  getLiveJournalName: function(from) {
    var nameService2 = setInterval(function() {
      ajax.post('/al_settings.php', {act: 'a_get_livejournal_name', full: from ? 1 : 0}, {
        onDone: function(result) {
          if (!result || result.error == undefined) return;
          clearInterval(nameService2);
          if (from) {
            unlockButton(ge('lj_btn'));
            show('lj_error');
            var div = ge('lj_error');
          } else {
            var div = ge('name_service2');
          }
          if (result.error == 1) {
            div.innerHTML = 'Server error.';
          } else if (result.error == 2) {
            div.innerHTML = getLang('settings_lj_wrong_password');
          } else if (from) {
            ge('lj_export_data').innerHTML = result.data;
          } else {
            div.href = 'http://' + result.data + '.livejournal.com/';
            div.innerHTML =  result.data + '.livejournal.com';
          }
          if (!from && result.error) {
            div.innerHTML = '<span style="color: #800">'+div.innerHTML+'</div>';
          }
        }
      });
    }, 1000);
  },
  clearSocialExport: function(service) {
    var title, msg;
    switch (service) {
      case 1: title = 'settings_status_export'; msg = 'settings_status_confirm'; break;
      case 2: title = 'settings_notes_export'; msg = 'settings_livejournal_confirm'; break;
      case 3: title = 'settings_status_export'; msg = 'settings_facebook_confirm'; break;
    }
    var msg = '<center>'+getLang(msg)+'</center>';
    var clrBox = showFastBox({title: getLang(title), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, msg, getLang('global_continue'), function() {
      ajax.post('/settings', {act: 'a_clear_social_export', service: service, hash: cur.options.social_hash}, {onDone: function(result) {
        if (!result || !result.msg) return;
        clrBox.hide();
        ge('settings_result').innerHTML = result.msg;
        show('settings_result');
        animate(ge('settings_save_msg'), {backgroundColor: '#F9F6E7'}, 2000);
        ge('export_service'+service).innerHTML = result.data;
        setTimeout(scrollToTop, 300);
      }});
    }, getLang('global_cancel'));
  },


  showAllServices: function () {
    ajax.post('al_settings.php', {act: 'a_get_services'}, {
      onDone: function (html) {
        ge('settings_services').innerHTML = html;
      }
    });
  },

  getAdminSelectShowCt: function(data) {
    return Object.keys(data).filter(function(key) {
      return data[key];
    }).length;
  },

  showAdminedGroups: function() {
    showBox('al_settings.php', { act: 'a_get_admined_groups' }, {
      stat: ['privacy.css'],
      onDone: function(box, data) {
        if (data) {
          cur.admin_groups = data;
          var cntrl = geByClass1('box_controls', box.bodyNode.parentNode);
          var ct = ce('div', {
            className: "settings_adm_groups_counter _settings_adm_groups_counter"
          });
          cntrl.appendChild(ct);
          cur.adminCt = ct;
          ct.innerHTML = getLang('settings_admin_groups_left')
            .replace('{count}', Settings.getAdminSelectShowCt(data))
            .replace('{amt}', Settings.MAX_LEFT_GROUPS);
        }
      },
      params: {
        bodyStyle: 'padding: 0;',
        dark: 1,
        onHide: function() {
          if (cur.adminGroupsDirty) {
            if (window.Notifier) {
              Notifier.resetCommConnection();
            }
            ajax.post('al_settings.php', { act: 'a_get_left_menu' }, {
              onDone: function(lm) {
                geByTag1('ol', ge('side_bar')).innerHTML = lm;
              }
            });
          }
        }
      },
    });
  },

  serviceCheck: function (id, val) {
    clearTimeout(cur.leftNavUpdateTO);
    cur.leftNavUpdateTO = setTimeout(Settings.submitServices, 200);

    var labelEl = ge('settings_label_' + id);
    if (!labelEl) return;
    labelEl.innerHTML = getLang('settings_services_saved');
    setStyle(labelEl, 'opacity', 1);
    clearTimeout(cur.checkboxResultsTOs[id]);
    cur.checkboxResultsTOs[id] = setTimeout(function () {
      animate(labelEl, {opacity: 0}, 1000);
    }, 3000);
  },
  submitServices: function () {
    var params = {hash: cur.options.services_hash, act: 'a_change_services'}, apps_list = [], apps_on = [];
    each (geByClass('checkbox', ge('settings_services'), 'div'), function () {
      var name = this.getAttribute('name'), isOn = this.className.indexOf('on') != -1;
      if (name != 'apps' && !name.indexOf('app')) {
        var aid = intval(name.substr(3));
        if (aid <= 0) return;
        apps_list.push(aid);
        if (isOn) apps_on.push(aid);
      } else {
        params[name] = isOn ? 1 : 0;
      }
    });
    if (apps_list.length) {
      params.apps_list = apps_list.join(',');
      params.apps_on = apps_on.join(',');
    }
    ajax.post('al_settings.php', params, {
      onDone: function (html) {
        geByTag1('ol', ge('side_bar')).innerHTML = html;
      }
    });
  },

  giftsCheck: function () {
    clearTimeout(cur.giftsUpdateTO);
    cur.giftsUpdateTO = setTimeout(Settings.giftsSubmit, 200);

    var labelEl = ge('settings_label_hide_gifts');
    if (!labelEl) return;
    labelEl.innerHTML = getLang('settings_microblog_saved');
    setStyle(labelEl, 'opacity', 1);
    clearTimeout(cur.checkboxResultsTOs['hide_gifts']);
    cur.checkboxResultsTOs['hide_gifts'] = setTimeout(function () {
      animate(labelEl, {opacity: 0}, 1000);
    }, 3000);
  },
  giftsSubmit: function () {
    ajax.post('al_profile.php', {act: 'hide_gifts', hash: cur.options.hide_gifts_hash, 'shown': isChecked(ge('hide_gifts')) ? 0 : 1});
  },

  microblogCheck: function (id) {
    if (hasClass(ge('settings_' + id), 'disabled')) return;

    clearTimeout(cur.microblogUpdateTO);
    cur.microblogUpdateTO = setTimeout(Settings.microblogSubmit, 200);

    var labelEl = ge('settings_label_' + id);
    if (!labelEl) return;
    labelEl.innerHTML = getLang('settings_microblog_saved');
    setStyle(labelEl, 'opacity', 1);
    clearTimeout(cur.checkboxResultsTOs[id]);
    cur.checkboxResultsTOs[id] = setTimeout(function () {
      animate(labelEl, {opacity: 0}, 1000);
    }, 3000);
  },
  microblogSubmit: function () {
    var params = {act: 'a_change_microblog', hash: cur.options.microblog_hash};
    each(['status_default', 'no_wall_replies'], function (k, v) {
      params[v] = isChecked(ge('settings_' + v));
    });
    ajax.post('al_settings.php', params);
  },

  appearanceCheck: function (id, newVal) {
    clearTimeout(cur.appearanceUpdateTO);
    cur.appearanceUpdateTO = setTimeout(Settings.appearanceSubmit, 200);

    var labelEl = ge('settings_label_' + id);
    if (!labelEl) return;
    val(labelEl, getLang('settings_appearance_saved'));

    setStyle(labelEl, 'opacity', 1);
    clearTimeout(cur.checkboxResultsTOs[id]);

    if (id == 'font_size') {
      var wrap = ge('wrap2'),
          h = wrap.clientHeight,
          st = scrollGetY();
      if (newVal) {
        replaceClass(bodyNode, 'font_default', 'font_medium');
        vk.fs = 12;
      } else {
        replaceClass(bodyNode, 'font_medium', 'font_default');
        vk.fs = 11;
      }
      scrollToY(st + (wrap.clientHeight - h), 0);
    }

    cur.checkboxResultsTOs[id] = setTimeout(function () {
      animate(labelEl, {opacity: 0}, 1000);
    }, 3000);
  },
  appearanceSubmit: function () {
    var params = {
      act: 'a_change_appearance',
      hash: cur.options.appearance_hash,
      screenwidth: window.screen && screen.width,
      screenheight: window.screen && screen.height,
      width: lastWindowWidth,
      height: lastWindowHeight
    };
    each(['font_size'], function (k, v) {
      params[v] = isChecked(ge('settings_' + v));
    });
    ajax.post('al_settings.php', params);
  },

  OTPAuthEnable: function(confirm) {
    showBox('al_settings.php', {act: 'otp_auth_box', confirm: confirm, hash: cur.options.otp_hash}, {params: {dark: true}});
    return false;
  },
  OTPAuthAppSet: function(confirm) {
    showBox('al_settings.php', {act: 'otp_auth_app_box', hash: cur.options.otp_hash}, {params: {dark: true}});
    return false;
  },
  OTPAuthDisable: function(btn) {
    if (buttonLocked(btn)) {
      return false;
    }
    var params = {act: 'a_otp_auth_save', type: 'otp_auth', hash: cur.options.otp_hash};
    ajax.post('al_settings.php', params, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  OTPAuthAppDisable: function() {
    if (Settings.otpAuthAppDisabling) return false;
    Settings.otpAuthAppDisabling = true;

    curBox().showProgress();
    var params = {act: 'a_otp_auth_save', type: 'otp_auth_by_app', hash: cur.options.otp_hash};
    ajax.post('al_settings.php', params, {
      onDone: function() {
        Settings.otpAuthAppDisabling = false;
        addClass('settings_otp_auth_app_set', 'settings_otp_app_disabled');
        val('settings_otp_auth_app_set_link', '('+getLang('settings_otp_auth_by_app_enable_link')+')');
        curBox().hide();
      }
    });
  },
  OTPAuthShowReserveCodes: function(forceNew) {
    showBox('al_settings.php', {act: 'otp_auth_reserve_codes_box', force_new: forceNew ? 1 : 0}, {params: {dark: true}});
    return false;
  },
  OTPAuthGetTrusted: function(force) {
    var el = ge('settings_otp_auth_trusted');
    if (!el || !isVisible(el)) return;
    if (force || geByTag1('img', el)) {
      var _frm = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
      ajax.post(vk.loginscheme + '://' + vk.host + '/al_login.php', {act: 'is_trusted_browser', _http: _frm}, {
        frame: _frm,
        onDone: function(msg) {
          el.innerHTML = msg;
        }
      });
    }
  },
  OTPAuthClearTrusted: function(link, onlyCur, hash) {
    var box = false;
    var confirm = link.getAttribute('confirm');
    if (confirm) {
      confirm = confirm.split('<!!>');
      box = showFastBox({title: confirm[0], dark: 1, bodyStyle: 'padding: 20px;'}, confirm[1], (confirm.length > 2 ? confirm[2] : getLang('box_yes')), doClear);
    } else {
      doClear();
    }
    function doClear() {
      if (!onlyCur && cur.options.otp_reset_hash) {
        cur.onReLoginDoneCallback = function() {
          ge('settings_reset_sessions_link').parentNode.innerHTML = '<div class="settings_labeled_notice">' + getLang('setting_all_sessions_reset') + '</div>';
        }
        Settings.resetAllSessions(link, '<input name="otp_reset_hash" value="' + cur.options.otp_reset_hash + '" type="hidden" />', link.getAttribute('complete'));
        if (box) box.hide();
        return;
      }

      var progress = ce('img', {src: '/images/upload'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif'}, {width: 32});
      var _frm = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
      ajax.post(vk.loginscheme + '://' + vk.host + '/al_login.php', {act: 'clear_trusted_browsers', only_cur: onlyCur, hash: hash, _http: _frm}, {
        frame: _frm,
        onDone: function(msg) {
          if (box) box.hide();
          link.parentNode.innerHTML = '<div class="settings_labeled_notice">' + link.getAttribute('complete') + '</div>';
        },
        showProgress: function () {
          if (box) box.showProgress();
          else link.parentNode.replaceChild(progress, link);
        },
        hideProgress: function () {
          if (box) box.hideProgress();
          else progress.parentNode.replaceChild(link, progress);
        }
      });
    }
  },
  OTPAppPasswords: function() {
    showBox('al_settings.php', {act: 'otp_auth_app_passwords_box'}, {params: {dark: true}});
    return false;
  },
  OTPCreateAppPassword: function(btn, hash) {
    if (isButtonLocked(btn)) {
      return;
    }
    var name = val('settings_app_password_name');
    if (!name.length) {
      notaBene('settings_app_password_name');
      return;
    }
    hide('settings_app_passwords_error');
    ajax.post('al_settings.php', {act: 'a_otp_auth_create_app_password', name: name, hash: hash}, {
      onDone: function(title, html, table) {
        showFastBox({title: title, dark: 1, width: 440, bodyStyle: 'padding: 20px;'}, html);
        ge('settings_app_passwords_table_wrap').innerHTML = table;
        hide('settings_app_passwords_empty');
        val('settings_app_password_name', '');
      },
      onFail: function(msg) {
        if (msg) {
          ge('settings_app_passwords_error').innerHTML = msg;
          show('settings_app_passwords_error');
        }
        return true;
      },
      showProgress: lockFlatButton.pbind(btn),
      hideProgress: unlockFlatButton.pbind(btn)
    });
  },
  OTPRemoveAppPassword: function(link, id, hash) {
    var progress = ce('img', {src: '/images/upload'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif'}, {width: 32});
    ajax.post('al_settings.php', {act: 'a_otp_auth_remove_app_password', id: id, hash: hash}, {
      onDone: function() {
        re('settings_app_password' + id);
        if (geByTag('tr', 'settings_app_passwords_table_wrap').length <= 1) {
          ge('settings_app_passwords_table_wrap').innerHTML = '';
          show('settings_app_passwords_empty');
        }
      },
      showProgress: function() { link.parentNode.replaceChild(progress, link); },
      hideProgress: function() { progress.parentNode.replaceChild(link, progress); }
    });
    return false;
  },

  showMsg: function (msg) {
    ge('settings_result').innerHTML = '<div id="settings_save_msg" class="msg">' + msg + '</div>';
    if (!msg) {
      hide('settings_result');
    } else {
      show('settings_result');
      animate(ge('settings_save_msg'), {backgroundColor: '#F9F6E7'}, 2000);
    }
    scrollToTop(0);
  },
  showError: function(msg, section) {
    msg = msg || getLang('global_unknown_error');
    var el = section ? ge('settings_error_' + section) : ge('settings_result');
    el.innerHTML = '<div id="settings_save_error" class="error">' + msg + '</div>';
    show(el);
    // animate(ge('settings_save_error'), {backgroundColor: '#F9F6E7'}, 2000);
    if (!section) {
      scrollToTop(0);
    }
  },

  passwordDone: function(r, csid) {
    re(cur.pwchFrame);
    unlockButton(cur.pwchDestroy);
    cur.pwchFrame = false;
    var err, inp = 'settings_new_pwd';
    switch (r) {
      case 1:
        err = 'settings_cant_set_this_password';
      break;
      case -2:
        err = 'settings_oldpwd_notcorr';
        inp = 'settings_old_pwd';
      break;
      case 2:
        hide('settings_error_pwd');
        Settings.showMsg(getLang('settings_pass_success'));
        if (cur.pwchCaptchaBox) {
          cur.pwchCaptchaBox.hide();
          cur.pwchCaptchaBox = false;
        }
        return;
      break;
      case -1:
        cur.pwchCaptchaBox = showCaptchaBox(csid, 1, cur.pwchCaptchaBox, {
          onSubmit: Settings.passwordSubmit.pbind(cur.pwchDestroy),
          onDestroy: function() {}
        });
        return;
      break;
      default:
        err = 'settings_cant_change_password';
      break;
    }
    if (cur.pwchCaptchaBox) {
      cur.pwchCaptchaBox.hide();
      cur.pwchCaptchaBox = false;
    }
    Settings.showError(getLang(err), 'pwd');
    notaBene(inp);
  },
  passwordSubmit: function(btn, sid, key) {
    var oldPwd = val('settings_old_pwd'),
        newPwd = val('settings_new_pwd'),
        confPwd = val('settings_confirm_pwd'), tt = ge('settings_pwd_tt_place').tt;
    if (cur.pwchFrame) return;
    if (!oldPwd) {
      notaBene('settings_old_pwd');
      return;
    }
    if (!newPwd) {
      notaBene('settings_new_pwd');
      return;
    }
    if (!confPwd) {
      notaBene('settings_confirm_pwd');
      return;
    }
    if (tt) tt.hide({fasthide: true});
    if (newPwd.match(/\s/)) {
      Settings.showError(getLang('settings_pwd_bad'), 'pwd');
      notaBene('settings_new_pwd');
      if (tt) setTimeout(tt.show, 10);
      return;
    }
    if (newPwd.length < 6) {
      Settings.showError(getLang('settings_pwd_bad'), 'pwd');
      notaBene('settings_new_pwd');
      if (tt) setTimeout(tt.show, 10);
      return;
    }
    if (confPwd != newPwd) {
      Settings.showError(getLang('settings_newpwd_notcorr'), 'pwd');
      notaBene('settings_confirm_pwd');
      if (tt) setTimeout(tt.show, 10);
      return;
    }

    if (!cur.pwchDestroy) {
      cur.destroy.push(function(c) { re(c.pwchFrame); });
    }
    cur.pwchDestroy = btn;
    if (!curBox()) {
      lockButton(cur.pwchDestroy);
    }

    var params = {
      act: 'changepass',
      _origin: locProtocol + '//' + locHost,
      pass: oldPwd,
      new_pass: newPwd
    };
    if (sid && key) {
      params.captcha_sid = sid;
      params.captcha_key = key;
    }
    params.phash = cur.options.phash;
    cur.pwchDone = Settings.passwordDone;
    cur.pwchFrame = utilsNode.appendChild(ce('iframe', {src: vk.loginscheme + '://login.vk.com/?' + ajx2q(params)}));
  },

  nameMoved: function (btn) {
    ajax.post('al_settings.php', {act: 'a_hide_name_moved_hint'}, {
      onDone: function (msg) {
        animate('settings_name_moved_row', {height: 0}, 200, function () {
          re('settings_name_moved_row');
        });
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });

  },

  nameSubmit: function (btn) {
    var fName = trim(val('settings_first_name')),
        lName = trim(val('settings_last_name')),
        mName = trim(val('settings_maiden_name')),
        nName = trim(val('settings_middle_name')),
        flName, cleanFName, cleanLName;

    if (!fName) {
      notaBene('settings_first_name');
      return false;
    }
    if (!lName) {
      notaBene('settings_last_name');
      return false;
    }
    flName = cleanName(fName, lName);
    if (val('settings_first_name_old') == fName) {
      cleanFName = fName;
    } else {
      cleanFName = flName[0];
    }
    if (val('settings_last_name_old') == lName) {
      cleanLName = lName;
    } else {
      cleanLName = flName[1];
    }
    if (cleanFName != fName) {
      val('settings_first_name', cleanFName);
      notaBene('settings_first_name');
    }
    if (cleanLName != lName) {
      val('settings_last_name', cleanLName);
      notaBene('settings_last_name');
    }
    if (cleanFName != fName || cleanLName != lName) {
      return false;
    }
    var params = {
      act: 'a_change_name',
      hash: cur.options.name_hash,
      first_name: cleanFName,
      last_name: cleanLName,
      maiden_name: mName,
      nickname: nName
    };
    lockButton(btn);
    ajax.post('al_settings.php', params, {
      onDone: function (msg) {
        unlockButton(btn);
        Settings.showMsg(msg);
        ge('settings_name_request').style.display = 'none';
      },
      onFail: function (msg) {
        unlockButton(btn);
        Settings.showError(msg, 'name');
        ge('settings_name_request').style.display = 'none';
        return true;
      }
    });
  },
  nameRequestCancel: function (link, reqId, hash) {
    var progress = ce('div', {className: 'progress'}, {display: 'block'});
    ajax.post('al_settings.php', {act: 'a_cancel_name', request_id: reqId, hash: hash}, {
      onDone: function (msg) {
        Settings.showMsg(msg);
      },
      onFail: function (msg) {
        Settings.showError(msg, 'name');
      },
      showProgress: function () {
        link.parentNode.replaceChild(progress, link);
      },
      hideProgress: function () {
        progress.parentNode.replaceChild(link, progress);
      }
    });
  },
  nameChangeCancel: function(obj, hash) {
    if (cur.nameChangeCancelText) {
      return;
    }
    cur.nameChangeCancelText = obj.innerHTML;
    obj.innerHTML = '<div style="padding-top: 3px;"><img src="/images/upload.gif" /></div>';
    ajax.post('al_settings.php', {act: 'a_change_cancel', hash: hash}, {
      onDone: function() {
        obj.innerHTML = cur.nameChangeCancelText;
        cur.nameChangeCancelText = false;
      }
    });
  },

  mailSubmit: function(btn, resend) {
    if (!resend) {
      var newMail = trim(val('settings_new_mail'));
      if (!newMail) {
        notaBene('settings_new_mail');
        return;
      }
      lockButton(btn);
    } else {
      var newMail = '';
      re(btn);
    }
    var params = {
      act: 'a_bind_mail',
      email: newMail,
      is_new: 1,
      hash: cur.options.mail_hash
    };
    ge('settings_new_mail').blur();
    hide('settings_error_mail');
    ajax.post('al_settings.php', params, {
      onDone: function (msg, html) {
        unlockButton(btn);
        if (html) {
          var oldBl = ge('chgmail');
          oldBl.parentNode.replaceChild(se(html), oldBl);
        }
        ge('settings_new_mail').value = '';
        showDoneBox(msg, {out: 4000, w: 400});
      },
      onFail: function (msg) {
        unlockButton(btn);
        Settings.showError(msg, 'mail');
        return true;
      }
    });
    return false;
  },

  phoneSubmit: function () {
    var params = {
      act: 'change_phone_box',
      hash: cur.options.phone_hash
    };
    showBox('activation.php', params);
  },

  regionalSubmit: function(btn) {
    var tz = (ge('timezone') || {}).value;//cur.uiTZ.val();
    var params = {
      act: 'a_change_regional',
      language: cur.uiLang.val(),
      timeoffset: tz,
      hash: cur.options.regional_hash || cur.options.regional_hashes[tz]
    };
    lockButton(btn);
    ajax.post('al_settings.php', params, {
      onDone: function (msg) {
        unlockButton(btn);
        Settings.showMsg(msg);
      },
      onFail: function (msg) {
        unlockButton(btn);
        Settings.showError(msg);
        return true;
      }
    });
  },

  reset_sessions: false,
  resetAllSessions: function(not_history_box_lnk, addParams, doneMsg) {
    if (Settings.reset_sessions) return false;
    Settings.reset_sessions = true;

    var cont = bodyNode.appendChild(ce('div', {innerHTML: '\
<form action="' + vk.loginscheme + '://login.vk.com/" method="POST" target="reset_sessions_frame">\
  <input name="_origin" value="' + (locProtocol + '//' + locHost) + '" type="hidden" />\
  <input name="role" value="al_frame" type="hidden" />\
  <input name="ip_h" value="' + vk.ip_h + '" type="hidden" />\
  <input name="reset_hash" value="' + cur.options.reset_hash + '" type="hidden" />' + addParams + '\
</form><iframe class="upload_frame" name="reset_sessions_frame"></iframe>'}));
    var iform = cont.firstChild, iframe = iform.nextSibling, to = 0;
    var progress = ce('img', {src: '/images/upload'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif'}, {width: 32});
    window.onReLoginDone = function() {
      try {
        var href = iframe.contentWindow.location.href;
        if (href.match(/&hash=/)) {
          if (!href.match(/&hash=[a-z0-9]+/)) {
            location.href = base_domain + 'login.php?op=logout';
            return false;
          }
        }
        re(cont);
      } catch(e) {
        return;
      }
      if (!not_history_box_lnk) {
        box = curBox();
        if (box) {
          box.hideProgress();
          box.setControlsText(getLang('setting_all_sessions_reset'));
        }
        j = 0;
        each (ge('activityHistory').lastChild.childNodes, function(i, el) {
          if(el.nodeType == 1) {
            if (j > 1 && !hasClass(el, 'old_session')) {
              addClass(el, 'old_session');
              var span = geByClass('browser_info', el)[0];
              removeData(span, 'tooltip');
              removeData(span, 'inited');
            }
            j++;
          }
        });
      } else if (not_history_box_lnk !== true) {
        progress.parentNode.replaceChild(ce('div', {className: 'settings_labeled_notice', innerHTML: (doneMsg ? doneMsg : getLang('setting_all_sessions_reset'))}), progress);
      }
      if (isFunction(cur.onReLoginDoneCallback)) {
        cur.onReLoginDoneCallback();
      }
    }
    /*
    if (browser.msie) {
      to = setInterval(function(){
        if (iframe.firstChild.nextSibling.document.readyState == 'complete') {
          onload();
        }
      }, 200);
    } else {
      iframe.onload = onload;
    }
    */
    if (!not_history_box_lnk) {
      curBox().showProgress();
    } else if (not_history_box_lnk !== true) {
      not_history_box_lnk.parentNode.replaceChild(progress, not_history_box_lnk);
    }
    iform.submit();
    return false;
  },
  showUserClientTT: function(el, i) {
    var text = '';
    if (hasClass(el.parentNode.parentNode, 'old_session')) text = '<div style="font-weight:bold; margin-bottom:5px;">'+getLang('settings_session_terminated')+'</div>';
    if (cur.options.ua_tooltips[i]) { text += cur.options.ua_tooltips[i]; }
    if (!text) return;
    showTooltip(el, {
      text: text,
      slide: 15,
      className: 'settings_about_tt',
      hasover: 1
    });
  },
  disabledPrivacy: function() {
    var el = geByClass1('settings_privacy_add_replies_view', ge('content'));
    if (el) showTooltip(el, {
      black: true,
      hasover: 1,
      className: 'settings_comments_disabled_tt',
      shift: [160, 3, 3],
      text: getLang('settings_comments_disabled_tt').replace('{link}', '<a href="/settings?f=cposts" onclick="return nav.go(this, event, {nocur: true})">').replace('{/link}', '</a>')
    });
  },

  checkAddress: function (timeout) {
    cur.addrUnchecked = 0;
    clearTimeout(cur.addressCheckTO);
    if (cur.lastAddress == val('settings_addr')) return;
    cur.addressCheckTO = setTimeout(Settings.doCheckAddress, timeout || 0);
  },
  doCheckAddress: function () {
    var btnWEl = ge('settings_address_submit'),
        btnEl = btnWEl;

    cur.lastAddress = val('settings_addr');
    ajax.post('al_settings.php', {act: 'a_check_address', name: cur.lastAddress}, {
      onDone: function (msg) {
        cur.addrChecked = 1;
        hide('settings_addr_disabler');
        btnEl.innerHTML = msg;
      },
      onFail: function (msg) {
        cur.addrChecked = -1;
        btnEl.innerHTML = msg;
        setStyle('settings_addr_disabler', {width: btnWEl.offsetWidth, height: btnWEl.offsetHeight, display: 'block'});
        return true;
      },
      showProgress: function () {
        lockButton(btnEl);
      },
      hideProgress: function () {
        unlockButton(btnEl);
      }
    });
  },

  addressSubmit: function (btn) {
    if (cur.addrChecked != 1) {
      notaBene('settings_addr');
      return;
    }
    var params = {
      act: 'a_change_address',
      hash: cur.options.address_hash,
      name: val('settings_addr')
    };
    lockButton(btn);
    ajax.post('al_settings.php', params, {
      onDone: function (msg) {
        unlockButton(btn);
        Settings.showMsg(msg);
      },
      onFail: function (msg) {
        unlockButton(btn);
        Settings.showError(msg, 'addr');
        return true;
      }
    });
  },

  toggleEmail: function (obj, hash) {
    checkbox(obj);
    var checked = isChecked(obj);
    var val = (checked) ? 1 : 0;
    hide('settings_email_saved');
    clearTimeout(cur.settingsEmailSaveFade);
    ajax.post('al_settings.php', {act: 'a_toggle_email', hash: hash, val: val}, {
      onDone: function() {
        fadeIn(ge('settings_email_saved'), 200, function() {
          cur.settingsEmailSaveFade = setTimeout(function() {
            fadeOut(ge('settings_email_saved'), 500);
          }, 1000);
        });
      }
    });
    return true;
  },

  /* General options*/
  init: function () {
    cur.checkboxResultsTOs = {};
    cur.module = 'settings';
    if (cur.options.msg) {
      Settings.showMsg(cur.options.msg);
    }
    each ({
      'settings_status_def_wrap': getLang('settings_status_default_about'),
      'settings_no_replies_wrap': getLang('settings_no_wall_replies_about')
    }, function (el, text) {
      ge(el).onmouseover = function () {
        showTooltip(this, {
          shift: [-25, 3, 3],
          text: text,
          slide: 15,
          className: 'settings_about_tt',
          hasover: 1
        });
      };
    });

    var pwdTtEl = ge('settings_pwd_tt_place');
    each([ge('settings_new_pwd'), ge('settings_old_pwd'), ge('settings_confirm_pwd')], function () {
      if (!this) return;
      this.onfocus = function () {
        showTooltip(pwdTtEl, {
          text: '<div class="settings_side_tt_pointer settings_pwd_pointer"></div>' + getLang('settings_password_about'),
          slideX: 15,
          className: 'settings_side_tt settings_side_pwd_tt',
          shift: [-12, -50, 3],

          onCreate: function () {
            removeEvent(pwdTtEl, 'mouseout');
          }
        });
      };
      this.onblur = function () {
        if (!pwdTtEl.tt || !pwdTtEl.tt.hide) return;
        pwdTtEl.tt.hide();
      }
    });

    // Change name hint
    var ttEl = ge('settings_name_tt_place');
    each([ge('settings_first_name'), ge('settings_last_name')], function () {
      if (!this || this == window || this.setTimeout) return;
      this.onfocus = function () {
        showTooltip(ttEl, {
          text: '<div class="settings_side_tt_pointer settings_name_pointer"></div>' + getLang('settings_name_be_patient'),
          slideX: 15,
          className: 'settings_side_tt settings_side_name_tt',
          shift: [-12, -54, 3],
          onCreate: function () {
            removeEvent(ttEl, 'mouseout');
          }
        });
      };
      this.onblur = function () {
        if (!ttEl.tt) return;
        ttEl.tt.hide();
      }
    });

    /* Change address hint */
    var addrEl = ge('settings_addr'), addrTarget = ge('settings_addr_table');
    addrEl.onfocus = function () {
      showTooltip(addrTarget, {
        text: getLang('settings_addr_intro'),
        slide: 15,
        className: 'settings_about_tt',
        onCreate: function () {
          removeEvent(addrTarget, 'mouseout');
          addrEl.onblur = function () {
            addrTarget.tt.hide();
          }
        }
      });
    };

    /* Change email hint */
    var mailEl = ge('settings_new_mail'); //, installed = false;
    if (mailEl) mailEl.onfocus = function () {
      showTooltip(mailEl, {
        text: '<div class="settings_side_tt_pointer settings_email_pointer"></div>' + getLang('settings_email_about'),
        slideX: 15,
        forcetodown: true,
        className: 'settings_side_tt settings_side_email_tt',
        shift: [-160, -42, -50],
        onCreate: function () {
          removeEvent(mailEl, 'mouseout');
          mailEl.onblur = function () {
            mailEl.tt.hide();
          }
        }
      });
    };

    cur.uiLang = new Dropdown(ge('settings_lang'), cur.options.langs, {
      width: 250,
      height: Math.max(250, Math.min(window.innerHeight - 300, 450)),
      selectedItems: cur.options.lang,
      multiselect: false
    });

    extend(cur, {
      validationLastCallback: function(res) {
        if (curBox()) curBox().hide();
        if (res) {
          Settings.phoneSubmit();
        } else {
          elfocus('settings_new_phone');
        }
      }
    });

    cur.destroy.push(function () {
      window.onLogout = window.onLoginDone = nav.reload;
    });
  },

  emailPosts: function(hash, obj) {

    ajax.post('al_settings.php', {act: 'send_email_post', hash: hash}, {
      onDone: function(text, label) {
        ge('settings_email_post_msg').innerHTML = text;
        setStyle(ge('settings_email_post_msg'), {borderColor: '#D4BC4C', backgroundColor:'#F9F6E7'});
        animate(ge('settings_email_post_msg'), {borderColor: '#B9C4DA', backgroundColor:'#FFFFFF'}, 3000);
        obj.innerHTML = label;
      },
      showProgress: function() {
        lockButton(obj);
      },
      hideProgress: function() {
        unlockButton(obj);
      }
    });
  },

  showPaymentsMethods: function(lnk, hash) {
    ajax.post('al_settings.php', {act: 'a_payments_methods', hash: hash}, {
      onDone: function(html) {
        var el = ce('div', {innerHTML: html, className: 'unshown'});
        lnk.parentNode.replaceChild(el, lnk);
        slideDown(el, 100);
      }
    });
    return false;
  },
  deletePaymentMethod: function(lnk, type, hash, force) {
    if (!force) {
      cur.confirmBox = showFastBox({title: cur.lang['global_action_confirmation'], dark: 1, forceNoBtn: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, cur.lang['settings_delete_payment_method_confirm'], getLang('global_delete'), function() {
        Settings.deletePaymentMethod(lnk, type, hash, true);
      }, getLang('global_cancel'));
      return;
    }
    var row = lnk.parentNode;
    ajax.post('al_payments.php', {act: 'a_del_instant_method', type: type, hash: hash}, {
      onDone: function(msg) {
        row.innerHTML = msg;
      },
      onDone: function(msg) {
        row.innerHTML = msg;
        return true;
      },
      showProgress: function () {
        cur.confirmBox.showProgress();
      },
      hideProgress: function() {
        cur.confirmBox.hide();
      }
    });
    return false;
  },
  showNextVotesHistory: function(lnk) {
    hide(lnk);
    show('settings_votes_history_progress');
    ajax.post('al_settings.php', {act: 'a_votes_history', offset: cur.historyOffset}, {
      onDone: function(html, last) {
        hide('settings_votes_history_progress');
        var tbl = ge('settings_votes_history').tBodies[0];

        if (html) {
          show(lnk);
          cur.historyOffset += 100;
          if (!browser.msie) {
            tbl.insertAdjacentHTML('beforeEnd', html);
          } else {
            var t = se('<table>'+html+'</table>');
            var rows = geByTag('tr', t);
            for (i in rows) {
              if (rows[i].nodeType == 1) tbl.appendChild(rows[i]);
            }
          }
          //tbl.innerHTML += html;
        }
        if (!html || last) {
          addClass(tbl.lastChild, 'settings_votes_history_last');
          re(lnk.parentNode);
        }
      }
    });
    return false;
  },
  emojiStr: function(str) {
    var timeObj = ge('settings_emoji_time');
    if (!str) {
      return slideUp(timeObj);
    }
    if (isVisible(timeObj)) {
      animate(timeObj, {opacity: 0}, 200, function() {
        timeObj.innerHTML = str;
        animate(timeObj, {opacity: 1}, 200);
      });
    } else {
      timeObj.innerHTML = str;
      slideDown(timeObj, 200);
    }
    var box = curBox();
    if (box) {
      cur.emojiBought = true;
      box.hide();
    }
  },
  emojiCheck: function(obj, checked, enableHash, disableHash) {
    if (checked) {
      if (enableHash) {
        Settings.emojiBuy(enableHash);
      } else {
        showBox('settings', {act: 'enable_emoji_box'});
      }
    } else {
      ajax.post('settings', {act: 'disable_emoji', hash: disableHash}, {
        onDone: Settings.emojiStr
      });
    }
  },
  emojiBuy: function(hash, btn) {
    ajax.post('settings', {act: 'enable_emoji', hash: hash}, {
      onDone: Settings.emojiStr,
      showProgress: function() {
        if (btn) {
          lockButton(btn);
        }
      },
      hideProgress: function() {
        if (btn) {
          unlockButton(btn);
        }
      }
    })
  },

  httpsOnlySubmit: function(el) {
    ajax.post('al_settings.php', {
      act: 'save_https',
      hash: cur.options.https_hash,
      https: isChecked('settings_https_only')
    }, {
      showProgress: lockButton.pbind(el),
      hideProgress: unlockButton.pbind(el)
    });
  },
  showValidateDevices: function(lnk, hash) {
    ajax.post('al_settings.php', {act: 'a_validate_devices', hash: hash}, {
      onDone: function(html) {
        tooltips.hideAll();
        var el = ce('div', {innerHTML: html, className: 'unshown'});
        lnk.parentNode.replaceChild(el, lnk);
        slideDown(el, 100);
      }
    });
    return false;
  },
  deleteValidateDevice: function(lnk, index, hash, force) {
    if (!force) {
      cur.confirmBox = showFastBox({title: cur.lang['global_action_confirmation'], dark: 1, forceNoBtn: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, cur.lang['settings_delete_validate_device_confirm'], getLang('global_delete'), function() {
        Settings.deleteValidateDevice(lnk, index, hash, true);
      }, getLang('global_cancel'));
      return;
    }
    var row = lnk.parentNode;
    ajax.post('al_settings.php', {act: 'a_del_validate_device', i: index, hash: hash}, {
      onDone: function(msg) {
        row.innerHTML = msg;
      },
      onDone: function(msg) {
        row.innerHTML = msg;
        return true;
      },
      showProgress: function () {
        cur.confirmBox.showProgress();
      },
      hideProgress: function() {
        cur.confirmBox.hide();
      }
    });
    return false;
  },
  toggleAdminGroup: function(gid, el) {
    var ct = Settings.getAdminSelectShowCt(cur.admin_groups);
    cur.adminGroupsDirty = true;
    var value = cur.admin_groups[gid];

    if (!value && ct >= Settings.MAX_LEFT_GROUPS - 1) {
      addClass(el.parentNode, 'settings_group_rows_disabled');
    } else {
      removeClass(el.parentNode, 'settings_group_rows_disabled');
    }

    if (!value && ct >= Settings.MAX_LEFT_GROUPS) {
      return false;
    }
    var op = !value ? 1 : -1;
    toggleClass(el, 'olist_item_wrap_on', !value);
    cur.admin_groups[gid] = !value;
    ls.set('im_m_comms_key', false);

    ls.set('im_m_comms_key', false);

    ajax.post('al_settings.php', {
      act: 'a_toggle_admin_fast',
      gid: gid
    });

    cur.adminCt.innerHTML = getLang('settings_admin_groups_left')
      .replace('{count}', ct + op)
      .replace('{amt}', Settings.MAX_LEFT_GROUPS);
  }
};

try{stManager.done('settings.js');}catch(e){}
