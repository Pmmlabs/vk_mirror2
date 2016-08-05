var FriendsSearch = {

submit: function() {
  var email = ge('fsearch_email').value;
  var pass = ge('fsearch_pass').value;
  if (!/^.{1,40}@.{1,40}\..{1,4}$/.test(email)) {
    return notaBene('fsearch_email');
  }
  if (!pass) {
    return notaBene('fsearch_pass');
  }
  cur.inviteBox.showProgress();
  ge('fsearch_inviter_form').submit();
  hide('fsearch_error');
},

checkResult: function(server, mid, vk) {
  if (!cur.inviteBox) {
    return;
  }
  cur.inviteBox.hideProgress();
  try {
    var loc = ge('fsearch_inviter').contentWindow.location;
    var h = loc.href;
    var skey = loc.hash.replace('#', '');
  } catch(e) {
    debugLog(e.message);
  }

  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = 'http://'+server+'.vk.com/inviter.php?act=get_friends_list&hash='+hash+'&skey='+key+'&mid='+mid+'&vk='+vk+'&back=FriendsSearch.getEmailResult&v='+Math.floor(Math.random()*10000);
  headNode.appendChild(elem);
},

getEmailResult: function(data) {
  if (!data || data.error) {
    FriendsSearch.showError(data.error);
    return false;
  }
  var list = [];
  for (var i in data.list) {
    list.push(i);
  }
  FriendsSearch.getList(1, list, {hash: data.hash})
},

getList: function(service, list, data) {
  list = list.join('|');
  var params = extend({act: 'save_friends', service: service, Ids: list}, data);

  ajax.post('al_friends.php', params, {
    onDone: function(text, res) {
      if (res == 1) {
        curBox().hide();
        Friends.section('suggestions', function() {
          Friends.changeSummary();
          nav.setLoc(extend(nav.objLoc, {section: 'suggestions'}));
        }, {m: 1});
        return true;
      }
      var cont = ge('fsearch_results');
      cont.innerHTML = text;
      show(cont);
      curBox().hideProgress();
    }
  });
},

checkTwitter: function() {
  showBox('al_profileEdit.php', {act: 'twitter_settings_box', import_friends: 1}, {dark: 1});
},

checkOAuth: function(googleLang, state, type) {
  var redirectUri = 'https://'+location.host+'/friends?act=import_contacts&type='+type;

  if (type == 1) {
    var oauthUrl = 'https://accounts.google.com/o/oauth2/auth?scope=https://www.google.com/m8/feeds/&response_type=code&redirect_uri='+encodeURIComponent(redirectUri)+'&approval_prompt=force&state='+state+'&client_id=190525020719-3g15ppddiep5mnjbt0g8vi1kh6v160an.apps.googleusercontent.com&hl='+googleLang;
  } else if (type == 3) {
    var oauthUrl = 'https://graph.facebook.com/oauth/authorize?client_id=128749580520227&redirect_uri='+encodeURIComponent(redirectUri)+'&display=popup&state='+state;
  } else if (type == 4) {
    var oauthUrl = 'http://www.odnoklassniki.ru/oauth/authorize?client_id=168388096&scope=VALUABLE+ACCESS&response_type=code&redirect_uri='+encodeURIComponent(redirectUri+'&state='+state);
  }
  var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
      width = 640,
      height = 340,
      left = parseInt(screenX + ((outerWidth - width) / 2), 10),
      top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
  var features = 'width='+width+',height='+height+',left='+left+',top='+top;
  var wnd = window.open(oauthUrl, 'google_auth', features);
  var timer = setInterval(function() {
    if(wnd.closed) {
      clearInterval(timer);
      FriendsSearch.checkImportResult();
    }
  }, 500);
},

checkImportResult: function() {
  showBox('al_friends.php', {act: 'check_contacts_import', box: 1}, {
    dark: 1,
    showProgress: function() {},
    onFail: function() {
      return true;
    },
    onDone: function(newBox) {
      newBox.show();
    }
  });
},

checkImportingLoop: function() {
  var box = curBox();
  cur.importingInt = setInterval(function() {
    showBox('al_friends.php', {act: 'check_contacts_import', provider: 'twitter', box: 1}, {
      dark: 1,
      showProgress: function() {},
      onFail: function() {
        return true;
      },
      onDone: function(newBox) {
        box.hide();
        clearInterval(cur.importingInt);
        newBox.show();
      }
    });
  }, 500);
},

onImportResult: function(data, lng, importedBox) {
  if (importedBox) {
    stManager.add(['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js', 'boxes.css', 'box.js'], function() {
      var box = showFastBox(importedBox[0], importedBox[1]);
      eval('(function (arg1, arg2) {' + importedBox[2] + '})("al_friends.php", {act: "a_edit_owners_list", list: "import"});');
    });
    return false;
  } else {
    var msg = ge('friends_import_msg');
    msg.className = 'friends_import_success';
    msg.innerHTML = lng['friends_import_noone'];
    setStyle(msg, {backgroundColor: '#F4EBBD'});
    animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
    return false;
  }
  /*var box = curBox();
  if (data && !data.count && false) {
    var err = ge('friends_no_contacts_found');
    setStyle(err, {backgroundColor: '#FFE4DA'});
    slideDown(err, 150, function() {
      animate(err, {backgroundColor: '#FFEFE8'}, 2000)
      setTimeout(function() {
        slideUp(err, 200)
      }, 8000)
    });
    return false;
  }
  if (data) {
    if (box) {
      box.hide();
    }
    Friends.section('suggestions', function() {
      Friends.changeSummary();
      nav.setLoc(extend(nav.objLoc, {section: 'suggestions'}));
      if (cur.importCount) {
        FriendsSearch.showImportTT(lng);
      }
    }, {m: 1});
  }*/
},

showImportTT: function(lng) {
  stManager.add(['intro.css'], function() {
    var cont = ge('friends_summary');
    showTooltip(cont, {
      content: '\
    <div id="intr_tt_pointer_left"></div>\
    <div id="intr_tt" style="width: 192px">\
      <div id="intr_hide" class="fl_r" onclick="ge(\'friends_summary\').tt.hide();" onmouseover="showTooltip(this, {text: \''+lng.hide+'\', black: 1, shift: [14, 4, 0]})"></div>\
      <div id="intr_header">'+lng.header+'</div>\
      <div id="intr_text">'+lng.text+'</div>\
    </div>',
      slideX: 15,
      className: 'profile_intro_side_tt',
      shift: [-454, 0, 0],
      forcetodown: true,
      nohide: true,
      nohideover: true
    });
  });
},

showError: function(error) {
  var cont = ge('fsearch_error');
  cont.innerHTML = error;
  show(cont);
  curBox().hideProgress();
},

addImported: function(ids, inv, list, opts) {
  debugLog('onimport', arguments);
  var box = curBox();
  if (!box) {
    return;
  }
  ajax.post('al_friends.php', {act: 'add_imported', hash: opts.hash, uids: ids.join(',')}, {
    onDone: function(text) {
      box.hide();
      var msg = ge('friends_import_msg');
      msg.className = 'friends_import_success';
      msg.innerHTML = text;
      setStyle(msg, {backgroundColor: '#F4EBBD'});
      animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
    },
    onFail: function() {
      box.hide();
      var msg = ge('friends_import_msg');
      msg.className = 'friends_import_fail';
      msg.innerHTML = text;
      setStyle(msg, {backgroundColor: '#FACEBB'});
      animate(msg, {backgroundColor: '#FFEFE8'}, 2000);
    },
    showProgress: box.showProgress,
    hideProgress: box.hideProgress
  });
  return false;
},

addCancelled: function(opts) {
  debugLog('why', arguments);
  ajax.post('al_friends.php', {act: 'cancel_imported', hash: opts.hash}, {
    onDone: function() {
    }
  });
  return true;
},

inviteBox: function() {
  showBox('invite.php', {act: 'invite_box'}, {stat: ['ui_controls.js', 'selects.js', 'ui_controls.css', 'invite.js', 'invite.css'], params: {bodyStyle: 'padding: 0px;', dark: 1}});
  return false;
},

__eof:1};try{stManager.done('friends_search.js');}catch(e){}
