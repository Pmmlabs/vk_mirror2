var Subscribe = {

init: function(opts) {
  extend(cur, opts);
  cur.Rpc = new fastXDM.Client({
    onInit: function() {
      setTimeout(function () {
        Subscribe.resizeWidget();
      }, 500);
    },
    authorised: function (args) {
      var href = location.href;
      if (href.indexOf('fieldText=') != -1) href = href.replace(/fieldText=.+?(&|$)/, 'fieldText=' + winToUtf(ge('commentFiled').getValue()) + '\1');
      else href = href + '&fieldText=' + winToUtf(ge('commentFiled').getValue());

      if (href.indexOf('autoLogin=1') != -1) href = href.replace('autoLogin=1', 'autoLogin=0');
      location.href = href;
      return;
    },
    unauthorised: function (args) {
      var href = location.href;
      if (href.indexOf('autoLogin=0') != -1) href = href.replace('autoLogin=0', 'autoLogin=1');
      else href = href + '&autoLogin=1';

      cur.Rpc.callMethod('auth');
      location.href = href;
      return;
    }
  }, {safe: true});

  cur.mainDiv = ge('w_subscr_cont');
  Subscribe.resizeWidget();

  setTimeout(function () {
    Subscribe.resizeWidget();
  }, 0);
},

auth: function(callback) {
  var
    screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
    outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
    features = 'width=655,height=479,left=' + parseInt(screenX + ((outerWidth - 655) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 479) / 2.5), 10);
  window.activePopup = window.open(location.protocol + '//oauth.vk.com/authorize?client_id=-1&redirect_uri=close.html&display=widget', 'vk_openapi', features);

  window.gotSession = function(autorzied) {
    if (autorzied == -1) {
      setTimeout(function () {
        location.reload();
      }, 1000);
      location.href = location.href + '&1';
    }
    if (autorzied) {
      ajax.post('/widget_subscribe.php', {act: 'get_hash', oid: cur.oid}, {
        onDone: function(hash) {
          cur.justAuthed = true;
          cur.hash = hash;
          callback();
        }
      });
    }
  }
},

subscribeBox: function(callback) {
  var
    screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
    outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
    features = 'width=655,height=479,left=' + parseInt(screenX + ((outerWidth - 655) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 479) / 2.5), 10);
    window.activePopup = window.open(location.protocol + '//'+location.host+'/widget_community.php?act=a_subscribe_box&oid='+cur.oid+'&state=1', 'vk_subscribe', features);
    window.subscribedCallback = function(resp) {
      callback(resp);
    }
},

subscribe: function(oid) {
  if (!cur.id) {
    Subscribe.auth(function() {
      Subscribe.subscribe(oid);
    });
    return false;
  }
  if (!cur.justAuthed) {
    Subscribe.subscribeBox(function() {
      hide('w_subscr_do');
      show('w_subscr_done');
      cur.Rpc.callMethod('publish', 'widgets.subscribed');
    });
    return false;
  }
  var obj = ge('w_subscr_text');
  setStyle(obj, {width: (getSize(obj)[0] - 16)+'px'});
  cur.back = obj.innerHTML;
  ajax.post('widget_subscribe.php', {act: 'subscribe', oid: oid, hash: cur.hash}, {
    onDone: function(text) {
      hide('w_subscr_do');
      show('w_subscr_done');
      cur.Rpc.callMethod('publish', 'widgets.subscribed');
    },
    onFail: function(text) {
      cur.Rpc.callMethod('publish', 'widgets.error');
      ge('w_subscr_do').innerHTML = text;
      return true;
    },
    showProgress: function() {
      obj.innerHTML = '<center><img src="/images/upload.gif"/></center>';
    },
    hideProgress: function() {
      obj.innerHTML = cur.back;
    }
  });
},

unsubscribe: function(obj, oid) {
  setStyle(obj, {width: (getSize(obj)[0] - 16)+'px'});
  cur.back = obj.innerHTML;
  ajax.post('widget_subscribe.php', {act: 'unsubscribe', oid: oid, hash: cur.hash}, {
    onDone: function(text) {
      show('w_subscr_do');
      hide('w_subscr_done');
      cur.Rpc.callMethod('publish', 'widgets.unsubscribed');
    },
    onFail: function(text) {
      cur.Rpc.callMethod('publish', 'widgets.error');
      ge('w_subscr_done').innerHTML = text;
      return true;
    },
    showProgress: function() {
      obj.innerHTML = '<img src="/images/upload.gif"/>';
    },
    hideProgress: function() {
      obj.innerHTML = cur.back;
    }
  });

},

resizeWidget: function() {
  return false;
  /*onBodyResize(true);
  if (!cur.mainDiv || !cur.Rpc) return;
  var size = getSize(cur.mainDiv)[1];
  cur.Rpc.callMethod('resize', size);*/
}

}
