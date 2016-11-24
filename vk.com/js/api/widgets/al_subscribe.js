var Subscribe = {

  init: function(opts) {
    extend(cur, opts, {
      mainDiv: geByClass1('_wsubscribe_content'),
      doEl: geByClass1('_wsubscribe_do'),
      doneEl: geByClass1('_wsubscribe_done'),
      Rpc: new fastXDM.Client(cur.RpcMethods = {

        onInit: function() {},

        authorised: function (args) {
          var text = winToUtf(ge('commentFiled').getValue()),
            href = location.href;
          href = href.indexOf('fieldText=') != -1 ? href.replace(/fieldText=.+?(&|$)/, 'fieldText=' + text + '\1') : href + '&fieldText=' + text;
          if (href.indexOf('autoLogin=1') != -1) {
            href = href.replace('autoLogin=1', 'autoLogin=0');
          }
          location.href = href;
          return;
        },

        unauthorised: function (args) {
          var href = location.href;
          href = href.indexOf('autoLogin=0') != -1 ? href.replace('autoLogin=0', 'autoLogin=1') : href + '&autoLogin=1';
          cur.Rpc.callMethod('auth');
          location.href = href;
          return;
        }

      }, {safe: true})
    });

    this.override('lite.js');
    stManager.emitter.addListener('update', this.override.bind(this));
  },

  doElProgress: function(param) {
    cur.progress = param;
    toggleClass(cur.doEl, 'wsubscribe_progress', param);
    param ? showProgress(cur.doEl, 'btn_lock') : hideProgress(cur.doEl, 'btn_lock');
  },

  subscribe: function(oid) {
    if (cur.progress) return false;
    if (!cur.hash) {
      Widgets.oauth({
        onClose: window.gotSession.pbind(true, this.subscribe.bind(this, oid))
      });
      return false;
    }
    if (cur.justAuthed) {
      ajax.post('widget_subscribe.php', {
        act: 'subscribe',
        oid: oid,
        hash: cur.hash
      }, {
        onDone: function(text) {
          hide(cur.doEl);
          show(cur.doneEl);
          cur.justAuthed = false;
          cur.Rpc.callMethod('publish', 'widgets.subscribed');
        },
        onFail: function(text) {
          hide(cur.doEl);
          show(cur.doneEl);
          val(cur.doneEl, text);
          cur.justAuthed = false;
          cur.Rpc.callMethod('publish', 'widgets.error');
        },
        showProgress: this.doElProgress.bind(this, 1),
        hideProgress: this.doElProgress.bind(this)
      });
    } else {
      Widgets.showSubscribeBox(cur.oid, function() {
        hide(cur.doEl);
        show(cur.doneEl);
        cur.Rpc.callMethod('publish', 'widgets.subscribed');
      });
    }
  },

  unsubscribe: function(oid) {
    var doUnsubscribe = function() {
      if (cur.progress) return false;
      ajax.post('widget_subscribe.php', {
        act: 'unsubscribe',
        oid: oid,
        hash: cur.hash
      }, {
        onDone: function(text) {
          show(cur.doEl);
          hide(cur.doneEl);
          cur.Rpc.callMethod('publish', 'widgets.unsubscribed');
        },
        onFail: function(text) {
          val(cur.doneEl, text);
          cur.Rpc.callMethod('publish', 'widgets.error');
        },
        showProgress: this.doElProgress.bind(this, 1),
        hideProgress: this.doElProgress.bind(this)
      });
    }.bind(this);

    cur.confirmUnsubscribe ? Widgets.showUnsubscribeBox(cur.oid, doUnsubscribe) : doUnsubscribe();
  },

  override: function(file, force) {
    if (!StaticFiles[file] && force !== true) return;
    switch (file) {
      case 'lite.js':
        extend(window, {

          showTooltip: Widgets.showTooltip,

          showBox: Widgets.showBox(),

          showCaptchaBox: Widgets.showCaptchaBox,

          showReCaptchaBox: Widgets.showReCaptchaBox,

          gotSession: function(autorzied, callback) {
            if (autorzied == -1) {
              location.reload();
            } else if (autorzied) {
              ajax.post('widget_subscribe.php', {
                act: 'get_hash',
                oid: cur.oid
              }, {
                onDone: function(hash) {
                  if (hash) {
                    cur.justAuthed = true;
                    cur.hash = hash;
                    isFunction(callback) && callback();
                  }
                }
              });
            }
          }

        });
      break;
    }
  }

}
