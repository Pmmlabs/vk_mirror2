function resizeWidget() {
  if (!window.mainDiv || !window.Rpc) return;
  var size = getSize(window.mainDiv)[1];
  if (window.mentions_mod && size < 150 && window.mention) { // fix for mentions list
    if (mention.select.isVisible()) {
      size += Math.max(getSize(mention.select.list)[1] - 35, 0);
    }
  }
  window.Rpc.callMethod('resize', size);
}

function sendChangeState(state, gid) {
  if (state) {
    window.Rpc.callMethod('publish', 'widgets.groups.joined');
  } else {
    window.Rpc.callMethod('publish', 'widgets.groups.leaved');
  }
  var hiddenDomain = ge('hiddenDomain');
  if (hiddenDomain) {
    domain = hiddenDomain.value;
  } else {
    domain = '';
  }
  Ajax.Send('/widget_groups.php', {act: 'a_change_state', state: state, gid: gid, hash: window.hash, domain: domain},
    function (o, t) {
      var result = eval('('+t+')');
      /*
      if (result.data) {
        //ge('members_count').innerHTML = result.data;
      }
      */
    }
  );
}

function changeGroupState(state, gid) {
  if (window.isAdmin) {
    if (!confirm(window.isAdminLang)) { return false; }
  }
  if (window.noAuth) {
    widgetAuth();
    window.gotSession = function(autorzied) {
      if (autorzied == -1) {
        setTimeout(function () {
          location.reload();
        }, 1000);
        location.href = location.href + '&1';
      }
      if (autorzied) {
        addClass(window.join_group, 'checked');
        //window.join_checkbox.setState(1, false, true);
        window.noAuth = false;
        window.justAuth = true;
        Ajax.Send('/widget_groups.php', {act: 'a_get_info', gid: gid},
          function (o, t) {
            var result = eval('('+t+')');
            if (result.hash) {
              window.hash = result.hash;
              window.can_subscribe = result.can_subscribe;
              if (window.can_subscribe) {
                show('subscr_group');
                if (result.subscribed) {
                  addClass(window.subscr_group, 'checked-light');
                } else {
                  removeClass(window.subscr_group, 'checked-light');
                }
                setTimeout(resizeWidget, 0);
              }
              sendChangeState(state, gid);
            }
          }
        );
      } else {
      }
    }
    return false;
  } else {
    if (!window.justAuth && ge('anim_row')) {
      if (state) {
        animate(ge('anim_row'), {marginLeft: 0}, 200);
        ge('members_count').innerHTML = window.count_in;
      } else {
        animate(ge('anim_row'), {marginLeft: -window.mWidth}, 200);
        ge('members_count').innerHTML = window.count_out;
      }
    }
    sendChangeState(state, gid);
    return true;
  }
}

function widgetAuth() {
  var
    screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
    outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
    features = 'width=554,height=207,left=' + parseInt(screenX + ((outerWidth - 554) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 207) / 2.5), 10);
    window.activePopup = window.open('/login.php?app=-1&layout=widgets', 'vk_openapi', features);
}

insideVK = location.href.indexOf('&inside_vk=1') != -1;
moderMode = false;

onDomReady(function() {
  window.mainDiv = ge('main');
  resizeWidget();
});

setTimeout(function () {
  resizeWidget();
}, 0);

window.Rpc = new fastXDM.Client({
    onInit: function() {
      setTimeout(function () {
        resizeWidget();
      }, 500);
    },
    authorised: function (args) {
      var href = location.href;
      if (href.indexOf('fieldText=') != -1) href = href.replace(/fieldText=.+?(&|$)/, 'fieldText=' + winToUtf(ge('commentFiled').getValue()) + '\1');
      else href = href + '&fieldText=' + winToUtf(ge('commentFiled').getValue());

      if (href.indexOf('autoLogin=1') != -1) href = href.replace('autoLogin=1', 'autoLogin=0');
      location.href = href;
      return;

      /*
      if (window.authorised) return;
      //debugLog('authorised');
      window.authorised = true;
      ge('hiddenComment').value = winToUtf(ge('commentFiled').getValue());
      ge('hiddenForm').submit();
      */
    },
    unauthorised: function (args) {
      var href = location.href;
      if (href.indexOf('autoLogin=0') != -1) href = href.replace('autoLogin=0', 'autoLogin=1');
      else href = href + '&autoLogin=1';

      window.Rpc.callMethod('auth');
      location.href = href;
      return;
      /*
      location.href = location.href.replace()

      ge('hiddenComment').value = winToUtf(ge('commentFiled').getValue());
      ge('autoLogin').value = 1;
      ge('hiddenForm').submit();
      */
    }
  }, {safe: true});


window.gotSession = function() {
  //window.activePopup.close();
}

function toggleStat(gid, width) {
  if (window.statShown) {
    ge('groupsMain').style.height = window.oldHeight;
    hide('hide_stat');
    show('show_stat');
    show('user_list');
    hide('stat_info');
    setTimeout(resizeWidget, 0);
  } else {
    window.oldHeight = ge('groupsMain').style.height;
    ge('groupsMain').style.height = '340px';
    show('hide_stat');
    hide('show_stat');
    hide('user_list');
    show('stat_info');
    setTimeout(resizeWidget, 0);
    if (!window.statLoaded) {
      Ajax.Send('/widget_groups.php', {act: 'a_get_stat', width: width, gid: gid},
        function (o, t) {
          //
          window.statLoaded = true;
          ge('stat_info').innerHTML = t;
          setTimeout(resizeWidget, 0);
          setTimeout(resizeWidget, 500);
        }
      );
    }
  }
  window.statShown = !window.statShown;
}


function subscribeGroupState(state, gid) {
  Ajax.Send('/widget_groups.php', {act: 'a_subscribe', state: state, gid: gid, hash: window.hash},
    function (o, t) {
      //var result = eval('('+t+')');
    }
  );
  return true;
}

function hideStat(gid, width) {
  hide('hide_stat');
  show('show_stat');
  show('user_list');
  hide('stat_info');
  setTimeout(resizeWidget, 0);
}
