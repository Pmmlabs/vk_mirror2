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

  auth: function(callback) {
    openWidgetsPopupBox(location.protocol + '//oauth.vk.com/authorize', {
      client_id: -1,
      redirect_uri: 'close.html',
      display: 'widget'
    }, 'vk_openapi', {
      width: 655,
      height: 479,
      onClose: window.gotSession.pbind(true, callback)
    });
  },

  subscribeBox: function(callback) {
    window.subscribedCallback = isFunction(callback) ? callback : function() {};
    openWidgetsPopupBox('widget_community.php', {
      act: 'a_subscribe_box',
      oid: cur.oid,
      state: 1
    }, 'vk_subscribe', {
      height: 291
    });
  },

  unsubscribeBox: function(callback) {
    window.unsubscribedCallback = isFunction(callback) ? callback : function() {};
    openWidgetsPopupBox('widget_community.php', {
      act: 'a_unsubscribe_box',
      oid: cur.oid
    }, 'vk_unsubscribe', {
      height: 291
    });
  },

  subscribe: function(oid) {
    if (cur.progress) return false;
    if (!cur.hash) {
      this.auth(this.subscribe.bind(this, oid));
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
      this.subscribeBox(function() {
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

    cur.confirmUnsubscribe ? Subscribe.unsubscribeBox(doUnsubscribe) : doUnsubscribe();
  },

  override: function(file, force) {
    if (!StaticFiles[file] && force !== true) return;
    switch (file) {
      case 'lite.js':
        extend(window, {

          showBox: (function(showBox) {
            return function(url, params, options, e) {
              var allowed = {
                'blank.php': true,
                'al_apps.php': {'show_captcha_box': {}}
              };

              if (allowed[url] && (!isObject(allowed[url]) || allowed[url][params.act])) {
                var stat = params.act && isObject(allowed[url]) && allowed[url][params.act].stat;
                stat && cur.Rpc.callMethod('showLoader', true);
                stManager.add(stat || [], function() {
                  params.widget_hash = cur.widgetHash;
                  params = extend({
                    widget_hash: cur.widgetHash,
                    widget: 2,
                    scrollbar_width: window.sbWidth(),
                    widget_width: options && options.params && intval(options.params.width) || void(0)
                  }, params);
                  cur.Rpc.callMethod('showBox', url+'?' + ajx2q(params), {
                    height: window.outerHeight || screen.availHeight || 768,
                    width: window.outerWidth || screen.availWidth || 1028,
                    base_domain: '//' + location.hostname + '/'
                  });
                });
              } else {
                debugLog('Forbidden request: '+params.act+' in '+url);
                return showBox.apply(null, [].slice.call(arguments));
              }
            }
          })(window.showBox),

          showCaptchaBox: function(sid, dif, box, o) {
            var difficulty = intval(dif) ? '' : '&s=1';
            var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
            showBox('al_apps.php', {
              act: 'show_captcha_box',
              sid: sid,
              src: imgSrc,
              need_mobile: intval(window.need_mobile_act == 1),
              widget_width: 322
            });
            cur.RpcMethods.captcha = o.onSubmit;
            cur.RpcMethods.captchaHide = o.onHide;
          },

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
