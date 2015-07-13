if (!window._iconAdd) window._iconAdd = (window.devicePixelRatio >= 2 ? '_2x' : '');
(function(w) {
if (w.fastXDM) return;

var handlers = {};
var onEnvLoad = [];
var env = {};

// Key generation
function genKey() {
  var key = '';
  for (i=0;i<5;i++) key += Math.ceil(Math.random()*15).toString(16);
  return key;
}

function waitFor(obj, prop, func, self,  count) {
  if (obj[prop]) {
     func.apply(self);
  } else {
    count = count || 0;
    if (count < 1000) setTimeout(function() {
      waitFor(obj, prop, func, self, count + 1)
    }, 0);
  }
}

function attachScript(url) {
  setTimeout(function() {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url || w.fastXDM.helperUrl;
    waitFor(document, 'body', function() {
      document.getElementsByTagName('HEAD')[0].appendChild(newScript);
    });
  }, 0);
}

// Env functions
function getEnv(callback, self) {
  if (env.loaded) {
    callback.apply(self, [env]);
  } else {
    onEnvLoad.push([self, callback]);
  }
}

function envLoaded() {
  env.loaded = true;
  if (onEnvLoad.length > 0) {
    for (callback in onEnvLoad) onEnvLoad[callback][1].apply(onEnvLoad[callback][0], [env]);
  }
}

function applyMethod(strData, self) {
  getEnv(function(env) {
    var data = env.json.parse(strData);
    if (data[0]) {
      if (!data[1]) data[1] = [];
      for (i in data[1]) {
        if (data[1][i] && data[1][i]._func) {
          var funcNum = data[1][i]._func;
          data[1][i] = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('_func'+funcNum);
            self.callMethod.apply(self, args);
          }
        }
      }
      setTimeout(function() {
        if (!self.methods[data[0]]) {
          throw Error('fastXDM: Method ' + data[0] + ' is undefined');
        }
        self.methods[data[0]].apply(self, data[1]);
      }, 0);
    }
  });
}

// XDM object
w.fastXDM = {
  _id: 0,
  helperUrl: 'http://userapi.com/js/api/xdmHelper.js',

  Server: function(methods) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    this.key = genKey();

    this.methods['%init%'] = this.methods['__fxdm_i'] = function() {
      w.fastXDM.run(this.id);
      if (this.methods['onInit']) this.methods['onInit']();
    };
    this.frameName = 'fXD'+this.key;
    this.server = true;
    handlers[this.key] = [applyMethod, this];
  },

  Client: function(methods) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    w.fastXDM.run(this.id);
    if (window.name.indexOf('fXD') == 0) {
      this.key = window.name.substr(3);
    } else {
      throw Error('Wrong window.name property.');
    }
    this.caller = window.parent;
    handlers[this.key] = [applyMethod, this];
    this.client = true;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onClientStart(this);
    }, this);

    getEnv(function(env) {
      env.send(this, env.json.stringify(['%init%']));

      var methods = this.methods;
      setTimeout(function() {
        if (methods['onInit']) methods['onInit']();
      }, 0);
    }, this);
  },

  onMessage: function(e) {
    if (!e.data) return false;
    var key = e.data.substr(0, 5);
    // s(JSON.stringify(handlers));
    if (handlers[key]) handlers[key][0](e.data.substr(6), handlers[key][1]);
  },

  setJSON: function(json) {
    env.json = json;
  },

  getJSON: function(callback) {
    if (!callback) return env.json;
    getEnv(function(env) {
      callback(env.json);
    });
  },

  setEnv: function(exEnv) {
    for (i in exEnv) {
      env[i] = exEnv[i];
    }
    envLoaded();
  },

  _q: {},

  on: function(key, act, self) {
    if (!this._q[key]) this._q[key] = [];
    if (this._q[key] == -1) {
      act.apply(self);
    } else {
      this._q[key].push([act, self]);
    }
  },

  run: function(key) {
    if (this._q[key] && this._q[key].length > 0) {
      for (i in this._q[key]) this._q[key][i][0].apply(this._q[key][i][1]);
    }
    this._q[key] = -1;
  },

  waitFor: waitFor
}


w.fastXDM.Server.prototype.start = function(obj, count) {
  if (obj.contentWindow) {
    this.caller = obj.contentWindow;
    this.frame = obj;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onServerStart(this);
    }, this);

  } else { // Opera old versions
    var self = this;
    count = count || 0;
    if (count < 50) setTimeout(function() {
      self.start.apply(self, [obj, count+1]);
    }, 100);
  }
}

w.fastXDM.Server.prototype.destroy = function() {
  if (handlers && handlers.indexOf) {
    handlers.splice(handlers.indexOf(this.key), 1);
  }
}

function extend(obj1, obj2){
  for (var i in obj2) {
    if (obj1[i] && typeof(obj1[i]) == 'object') {
      extend(obj1[i], obj2[i])
    } else {
      obj1[i] = obj2[i];
    }
  }
}

w.fastXDM.Server.prototype.append = function(obj, options, attrs) {
  var div = document.createElement('DIV');
  div.innerHTML = '<iframe name="'+this.frameName+'" '+(attrs || '')+' />';
  var frame = div.firstChild;
  var self = this;
  setTimeout(function() {
    frame.frameBorder = '0';
    if (options) extend(frame, options);
    obj.insertBefore(frame, obj.firstChild);
    self.start(frame);
  }, 0);
  return frame;
}

w.fastXDM.Client.prototype.callMethod = w.fastXDM.Server.prototype.callMethod = function() {
  var args = Array.prototype.slice.call(arguments);
  var method = args.shift();
  for (i in args) {
    if (typeof(args[i]) == 'function') {
      this.funcsCount = (this.funcsCount || 0) + 1;
      var func = args[i];
      var funcName = '_func' + this.funcsCount;
      this.methods[funcName] = function() {
        func.apply(this, arguments);
        delete this.methods[funcName];
      }
      args[i] = {_func: this.funcsCount};
    }
  }
  waitFor(this, 'caller', function() {
    w.fastXDM.on(this.id, function() {
      getEnv(function(env) {
        env.send(this, env.json.stringify([method, args]));
      }, this);
    }, this);
  }, this);
}

if (w.JSON && typeof(w.JSON) == 'object' && w.JSON.parse && w.JSON.stringify && w.JSON.stringify({a:[1,2,3]}).replace(/ /g, '') == '{"a":[1,2,3]}') {
  env.json = {parse: w.JSON.parse, stringify: w.JSON.stringify};
} else {
  w.fastXDM._needJSON = true;
}

// PostMessage cover
if (w.postMessage) {
  env.protocol = 'p';
  env.send = function(xdm, strData) {
    xdm.caller.postMessage(xdm.key+':'+strData, "*");
  }
  if (w.addEventListener) {
    w.addEventListener("message", w.fastXDM.onMessage, false);
  } else {
    w.attachEvent("onmessage", w.fastXDM.onMessage);
  }

  if (w.fastXDM._needJSON) {
    w.fastXDM._onlyJSON = true;
    attachScript();
  } else {
    envLoaded();
  }
} else {
  attachScript();
}

})(window);


function appCallback(args) {
  var method = args.shift();
  if (cur.app && cur.app.funcs) {
    if (!cur.app.funcs[method]) {
      setTimeout(function() {
        throw new Error('unsupported app method: ' + method);
      }, 0);
    }
    setTimeout(function() {
      return cur.app.funcs[method].apply(cur.app, args);
    }, 0);
    return true;
  }
  return true;
}

var vkApp = function(cont, options, params, onInit) {
  params = params || {};
  options = options || {};
  if (window.parent && window.parent != window && !options.checking) {
    return false;
  }
  var self = this;
  this.cont = ge(cont);
  if (!this.cont) {
    return;
  }

  params.hash = (params.hash || '');
  if (params.hash.indexOf('#') != -1) {
    var cut = params.hash.split('#').pop();
    if ((cut || '').substr(0, 1) == vk.navPrefix) {
      params.hash = '';
    } else {
      params.hash = cut;
    }
  }

  this.params = params;

  this.onReady = new Array();

  if (options.type == 1) { // IFrame
    var url = options.src;
    var urlParams = [];
    for (var i in params) {
      if (i == 'hash') {
        urlParams.push(i+'='+encodeURIComponent(params[i]));
      } else {
        urlParams.push(i+'='+params[i]);
      }
    }
    url += ((url.indexOf('?') == -1) ? '?' : '&') + urlParams.join('&');
  }
  if (options.inlineApp) {
    self.inlineApp = true;
  }
  self.options = extend({
    heightMax:  4500
  }, options);

  this.funcs = {
    onInit: function() {
      if (options.heightSync) {
        self.RPC.callMethod('getHeight', function(height) {
          self.setHeight(height)
        })
      }
      if (!self.inited) {
        self.inited = true;
        if (onInit) onInit();
        if (!self.inlineApp) {
          self.onAppReady();
        }
      }
      return true;
    },
    ApiCall: function(args, callback) {
      var method = args.shift();
      self.api(method, args[0], callback)
    },
    _getAppInfo: function(callback) {
      callback([self.params.api_id, window.location.hash]);
    },
    api: function(callId, method, args) { // flash callbacks
      self.api(method, args, function(data) {
        self.apiCallback(callId, data);
      });
    },
    setHeight: function(height) {
      self.setHeight(height);
    },
    scrollWindow: function(y, speed) {
      if (self.inlineApp) return;
      var scrollTop = Math.max(y, 0);
      speed = intval(speed);
      if (speed && speed > 0) {
        animate(htmlNode, {scrollTop: scrollTop}, speed);
        animate(bodyNode, {scrollTop: scrollTop}, speed);
      } else {
        window.scroll(0, scrollTop);
      }
    },
    scrollTop: function(subscribe) {
      var ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
      if (!cur.appTopOffset) {
        cur.appTopOffset = getXY(cur.app.cont)[1];
      }
      var idle = 0;
      if (curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle) {
        idle = 1;
      }
      cur.app.runCallback('onScrollTop', parseInt(scrollGetY()), parseInt(ch), parseInt(cur.appTopOffset), idle);
    },
    scrollSubscribe: function(fireEvent) {
      var onScr = function() {
        var ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
        self.runCallback('onScroll', parseInt(scrollGetY()), parseInt(ch));
      }
      var subscribe = function() {
        addEvent(browser.msie6 ? pageNode : window, 'scroll', onScr);
      }
      subscribe();
      if (fireEvent) {
        onScr();
      }
      if (cur._back) {
        cur._back.show.push(subscribe);
        cur._back.hide.push(function() {
          removeEvent(browser.msie6 ? pageNode : window, 'scroll', onScr);
        })
      } else {
        cur.destroy.push(function() {
          removeEvent(browser.msie6 ? pageNode : window, 'scroll', onScr);
        });
      }
    },
    saveWallPost: function(hash) {
      showBox('al_apps.php', {act: 'save_wall_post_box', hash: hash, aid: cur.aid}, {params: {dark: 1}});
    },
    showRequestBox: function(uid, message, requestKey) {
      showBox('al_apps.php', {act: 'show_request_box', aid: cur.aid, message: message, uid: uid, request_key: requestKey}, {params:{width: 430, dark: 1}, onFail: function(text) {
        cur.app.runCallback('onRequestFail', text);
        return true;
      }});
    },
    showInstallPushBox: function() {
      showBox('al_apps.php', {act: 'show_install_push_box', aid: cur.aid}, {params:{width: 430, dark: 1}, onFail: function(text) {
        cur.app.runCallback('onInstallPushFail', text);
        return true;
      }});
    },
    showProfilePhotoBox: function(hash) {
      showBox('al_apps.php', {act: 'show_profile_photo_box', hash: hash, aid: cur.aid}, {params: {dark: 1}});
    },
    setTitle: function(title) {
      if (self.inlineApp) return;
      title = title.replace(/[<>]+/gi, '');
      var prefix = cur.backLang;
      prefix = !prefix ? getLang('global_vkontakte') : prefix;
      document.title = prefix  + (title ? (' | ' + title) : '');
    },
    resizeWindow: function(width, height) {
      self.setWidth(width);
      self.setHeight(height);
    },
    getLocationProtocol: function(callback) {
      callback(location.protocol);
    },
    setLocation: function(loc, fireEvent) {
      loc = loc.toString();
      cur.appLoc = loc;
      if (fireEvent) {
        cur.app.runCallback('onLocationChanged', loc);
      }
      nav.setLoc(extend(nav.objLoc, {'#': loc}));
      //nav.change({'#': loc});
    },
    setNavigation: function() {
      return;
    },
    showInstallBox: function() {
      if (cur.appUser) {
        Apps.onAppAdded();
      } else {
        if (cur.installBoxShown) {
          return;
        }
        cur.installBoxShown = true;
        var box = showBox('apps', {act: 'install_box', aid: options.aid}, {params: {dark: 1}});
        box.setOptions({onHide: function() {
          setTimeout(function() {
            cur.installBoxShown = false;
          }, 3000);
        }});
      }
    },
    showSettingsBox: function(mask) {
      if (cur.settingsBoxShown) {
        return;
      }
      cur.settingsBoxShown = true;
      var box = showBox('apps', {act: 'settings_box', aid: options.aid, mask: mask}, {params: {dark: 1, width: 430}});
      box.setOptions({onHide: function() {
        setTimeout(function() {
          cur.settingsBoxShown = false;
        }, 3000);
      }});
    },
    showInviteBox: function()  {
      Apps.showInviteBox(options.aid, options.hash);
    },
    showPaymentBox: function(votes) {
      showBox('al_apps.php', {act: 'show_payment_box',  votes: votes, aid: options.aid}, {params: {dark: 1}});
    },
    showLeadsPaymentBox: function(lead_id) {
      showBox('al_apps.php', {act: 'show_payment_box', aid: options.aid, offers: isArray(lead_id) ? lead_id.join(",") : (intval(lead_id) || 1)}, {params: {dark: 1}});
    },
    showOrderBox: function(paramsUnchecked) {
      if (typeof paramsUnchecked != 'object') {
        var args = Array.prototype.slice.call(arguments);
        paramsUnchecked = {};
        each(args, function(){
          var kv = this.split('=');
          if (kv.length == 2) paramsUnchecked[kv[0]] = kv[1];
        });
      }
      var params = {};
      for (var i in paramsUnchecked) {
        if (inArray(i, ['type', 'votes', 'offer_id', 'item', 'currency'])) {
          params[i] = paramsUnchecked[i]+'';
        }
      }
      if (params.type == 'offers' && isArray(params.offer_id)) {
        params.offer_id = params.offer_id.join(',');
      }
      params.act = 'show_order_box';
      params.aid = options.aid;
      params.hash = options.hash;
      showBox('al_apps.php', params, {
        params: {dark: 1},
        onFail: function(error) {
          showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, error);
          return true;
        }
      });

      cur.onAppOrderCancel = function() {
        cur.app.runCallback('onOrderCancel');
      }
      cur.onAppOrderSuccess = function(appOrderId) {
        cur.app.runCallback('onOrderSuccess', appOrderId);
      }
      cur.onAppOrderFail = function(errorCode) {
        cur.app.runCallback('onOrderFail', errorCode);
      }
    },
    showMerchantPaymentBox: function(paramsUnchecked) {
      if (self.inlineApp) return;
      if (typeof paramsUnchecked != 'object') {
        var args = Array.prototype.slice.call(arguments);
        paramsUnchecked = {};
        each(args, function(){
          var kv = this.split('=');
          if (kv.length == 2) paramsUnchecked[kv[0]] = kv[1];
        });
      }
      // Clear parameters
      var params = {};
      for (var i in paramsUnchecked) {
        if ((i == 'merchant_id') || (i == 'required_fields')) {
          params[i] = paramsUnchecked[i];
          continue;
        }
        if (i.indexOf('custom_') == 0) {
          params[i] = paramsUnchecked[i];
          continue;
        }
        if (i.indexOf('item_') == 0) {
          var part = i.substr(5);
          var allowed = ['id_', 'name_', 'description_', 'price_', 'currency_', 'quantity_', 'photo_url_', 'digital_'];
          var found = false;
          for (var j in allowed) {
            if (part.indexOf(allowed[j]) == 0) {
              found = true;
              break;
            }
          }
          if (found) {
            params[i] = paramsUnchecked[i];
            continue;
          }
        }
      }

      // Test mode
      var testMode = 1;
      if ('test_mode' in paramsUnchecked) {
        testMode = ((paramsUnchecked.test_mode.toString() == '0') ? 0 : 1);
      }


      params.show_in_box = 1;

      var url = testMode ? 'al_paytest.php' : 'al_pay.php';

      //stManager.add(['selects.js']);
      cur.payMerchantBox = showBox(url, params, {
        params: {
          bodyStyle: 'padding: 0;',
          width: 534,
          dark: 1
        },
        stat: ['selects.js', 'pay.css', 'ui_controls.js', 'ui_controls.css'],
        onFail: function(error) {
          showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, error);
          return true;
        }
      });

      cur.onMerchantPaymentCancel = function() {
        cur.app.runCallback('onMerchantPaymentCancel');
      }

      cur.onMerchantPaymentSuccess = function(merchant_order_id) {
        cur.app.runCallback('onMerchantPaymentSuccess', merchant_order_id);
      }

      cur.onMerchantPaymentFail = function(errorCode) {
        cur.app.runCallback('onMerchantPaymentFail', errorCode);
      }
    },
    showPortlet: function(options) {
      return false;
    },
    addToMenu: function() {
      ajax.post('al_apps.php', {act: 'add_left_menu', aid: cur.aid, hash: cur.app.options.hash}, {
        onDone: function (html) {
          geByTag1('ol', ge('side_bar')).innerHTML = html;
        }
      });
    },
    adsPublish: function() {
      AdsLight.handleEvent.apply(AdsLight, arguments);
    },
    callUser: function(uid, key, msg) {
      showBox('al_apps.php', {act: 'call_user', uid: uid, key: key, aid: cur.aid, msg: msg}, {dark: 1, onFail: function(text) {
        cur.app.runCallback('onCallFail', text);
        return true;
      }});
    },
    debug: function() {
      debugLog((arguments.length == 1) ? arguments[0] : arguments);
    }
  };

  if (params.widget) {
    self.options.type = 1;
    self.options.widget = true;
  } else {
  //} else if (self.options.type != 2) {
    renderFlash(ge('flash_api_external_cont'), {
      url: '/swf/api_external.swf',
      id: 'flash_api_external',
      width: 1,
      height: 1,
      preventhide: 1,
      version: 9
    }, {
      allowFullScreen: true,
      allowscriptaccess: 'always',
      allownetworking: 'all',
      wmode: 'opaque'
    }, {
      debug: (params.debug ? 1 : 0),
      lc_name: params.lc_name
    });


    self.externalFrame = ge('flash_api_external');
  }

  var wmode = self.options.wmode || 'opaque';

  if (self.options.no_init) {
    return false;
  }

  var res = 1;
  switch (self.options.type) {
    case 1: // Iframe App
      this.RPC = new fastXDM.Server(this.funcs);
      var frameParams = {
        src: url,
        width: '100%',
        overflow: 'hidden',
        scrolling: 'no'
      };
      if (!self.options.widget) {
        frameParams.height = self.options.height+'px';
      }
      this.frame = this.RPC.append(self.cont, frameParams, 'webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"');
      break;
    case 2: // Flash Wrapper App
      debugLog('is wrapper');
      var opts = {
        url: options.src,
        id: 'flash_app',
        width: self.options.width,
        height: self.options.height,
        version: 10
      }
      if (wmode == 'opaque') {
        opts.preventhide = 1;
      }
      res = renderFlash(self.cont, opts, {allowFullScreen: true, allowscriptaccess: 'never', allowFullScreenInteractive: 'true', allownetworking: 'all', bgcolor: '#F7F7F7', wmode: wmode}, params);
      self.frame = ge('flash_app');
      break;
    case 3: // flash app
      var opts = {
        url: options.src,
        id: 'flash_app',
        width: self.options.width,
        height: self.options.height,
        version: 9
      }
      if (wmode == 'opaque') {
        opts.preventhide = 1;
      }
      res = renderFlash(self.cont, opts, {allowFullScreen: true, allownetworking: 'all', allowscriptaccess: 'never', allowFullScreenInteractive: 'true', wmode: wmode}, params);
      self.frame = ge('flash_app');
      break;
  }

  if (!res) {
    self.cont.innerHTML = '<div class="apps_no_flash_msg"><img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/></div>';
    ajax.post('al_apps.php', {act: 'no_flash', total: (browser.iphone || browser.ipad) ? 1 : 0}, {
      onDone: function(info) {
        self.cont.innerHTML = info;
      }
    })
  }

  if (params.widget) {
    setTimeout(function() {
      if (!self.inited) {
        show('app_connect_error');
      }
    }, 8000);
  }

  cur.destroy.push((function() {
    if (this.RPC) {
      this.RPC.destroy();
    }
  }).bind(this));

}

vkApp.prototype.boxApp = function(options) {
  //var boxApp = new vkApp();
}

vkApp.prototype.onAppReady = function() {
  for (var i in this.onReady) {
    this.onReady[i]();
  }
  /*setTimeout(function() {
  cur.app.runCallback('onStageResize', 627, 230);
  }, 3000);*/
}

vkApp.prototype.runCallback = function() {
  var args = Array.prototype.slice.call(arguments);
  var method = args[0];
  var eventName = 'customEvent';
  if ('onLocationChanged,onMerchantPaymentSuccess,onBalanceChanged,onWindowResized,onSettingsChanged'.indexOf(method)!= -1) {
    eventName = method;
    var fArgs = args.slice(1);
  } else {
    var fArgs = args.slice();
  }
  switch(this.options.type) {
    case 1:
      this.RPC.callMethod('runCallback', args);
      if (!this.options.widget && !browser.iphone && !browser.ipad) {
        try {
          this.externalFrame[eventName](fArgs);
        } catch(e) {}
      }
      break;
    case 2:
      //this.frame[eventName](fArgs);
      try {
        this.externalFrame[eventName](fArgs);
      } catch(e) {}
      break;
    case 3:
      try {
        this.externalFrame[eventName](fArgs);
      } catch(e) {}
      break;
  }
}

vkApp.prototype.apiCallback = function(callId, data) {
  var args = Array.prototype.slice.call(arguments);
  try {
    //if (this.options.type == 2) {
    //  this.frame.apiCallback(callId, data);
    //} else {
    this.externalFrame.apiCallback(callId, data);
    //}
  } catch(e) {
    // pass
  }
}

vkApp.prototype.setHeight = function(height) {
  if (!height) return;
  if (this.inlineApp && height > this.options.heightMax) {
    height = this.options.heightMax;
  }
  var h = height + 'px';
  this.frame.style.height = h;
  if (!this.options.boxed) {
    this.cont.style.height = h;
  }
  if (this.options.onResize) {
    this.options.onResize();
  }
}

vkApp.prototype.setWidth = function(width) {
  if (!width || this.inlineApp) return;
  if (!cur.app) return;
  var size = getSize(cur.app.cont);
  width = Math.min(Math.max(width, 100), 1000);
  handlePageView({
    width: Math.max(width, 625)+166
  });
  this.frame.style.width = this.cont.style.width = width + 'px';
}

vkApp.prototype.balanceUpdated = function(money) {
  this.runCallback('onBalanceChanged', money);
}

vkApp.prototype.checkMethod = function(method, params, callback) {
  var m = method.toLowerCase();
  if (m == 'wall.post' || m == 'activity.set') {
    var text = params[m == 'wall.post' ? 'message' : 'text'];
    if (!text) {
      text = '';
    }
    showBox('apps', {
      act: 'wall_post_box',
      aid: this.options.aid,
      owner_id: params['owner_id'],
      attachments: params['attachments'] || params['attachment'],
      text: text,
      method: m
    }, {params: {width: '430px', dark: 1}});

    var self = this;
    cur.apiWallPost = function(hash, error) {
      if (error) {
        if (callback) {
          callback({error: error});
        }
      } else {
        self.api(method, extend(params, {method_access: hash}), callback);
      }
    };
    return false;
  }
  return true;
}

vkApp.prototype.checkMethodResult = function(method, params, data, callback) {
  switch(method) {
    case 'photos.saveProfilePhoto':
      if (!data.error) {
        cur.profilePhotoBoxCallback = function(success) {
          if (success) {
            callback({response: {'photo_src': data.response['photo_src']}});
          } else {
            callback({error: {error_code: 10007, error_msg: "Operation denied by user"}});
          }
          window.profilePhotoBoxCallback = false;
        }
        cur.app.funcs.showProfilePhotoBox(data.response['photo_hash']);
        return false;
      }
      break;
  }
  return true;
}

vkApp.prototype.onLocChanged = function(strLoc) {
  //if (cur.appLoc == strLoc) return;
  if (!strLoc) {
    strLoc = '';
  }
  if (cur.appLoc == strLoc) return;
  cur.appLoc = strLoc;
  this.runCallback('onLocationChanged', strLoc);
}

vkApp.prototype.api = function(method, inputParams, callback, captcha) {
  var self = this;
  if (arguments.length == 2) {
    callback=params;
    inputParams={};
  }

  if (!inputParams) {
    inputParams = {};
  }

  if (!captcha && !inputParams.method_access && !inputParams.method_force && !this.checkMethod(method, inputParams, callback)) {
    return;
  }

  delete inputParams['callback'];
  delete inputParams['access_token'];

  var params = {
    v: '3.0',
    api_id: this.params.api_id,
    method: method,
    format: 'json',
    rnd: parseInt(Math.random()*10000)
  }

  if (inputParams) {
    for (var i in inputParams) {
      if (i != 'rnd' && i != 'format' && i != 'api_id' && i != 'method' && i != 'callback' && i != 'access_token') {
        params[i] = inputParams[i];
      }
    }
  }

  var lParams=[];
  for (i in params) {
    lParams.push([i,params[i]]);
  }

  function sName(i, ii) {
    if (i[0] > ii[0])
    return 1;
    else if (i[0] < ii[0])
    return -1;
    else
    return 0;
  }

  lParams.sort(sName);
  var sig = this.params.viewer_id;
  for (i in lParams) {
    sig += lParams[i][0] + '=' + lParams[i][1];
  }
  sig += this.params.secret;
  params.sid = this.params.sid;

  stManager.add('md5.js', function() {
    params.sig = MD5(sig);
    var done = function(text) {
      var response = eval('('+text+')');
      if (response.error && response.error.error_code == 14) { // Captcha needed
        cur.appCaptcha = showCaptchaBox(response.error.captcha_sid, 0, false, {
          onSubmit: function(sid, value) {
            inputParams['captcha_sid'] = sid;
            inputParams['captcha_key'] = value;
            self.api(method, inputParams, callback, true);
            cur.appCaptcha.setOptions({onHide: function(){}}).hide();
          },
          onHide: function() {
            callback(response);
          },
          imgSrc: response.error.captcha_img
        });
      } else {
        if (captcha) {
          cur.appCaptcha.setOptions({onHide: function(){}}).hide();
        }
        if (!self.checkMethodResult(method, inputParams, response, callback)) {
          return;
        } else if (callback) {
          callback(response);
        }
      }
    }
    var fail = function() {
      debugLog('Ajax fail');
    }

    ajax.plainpost(self.params['api_script'] || '/api.php', params, done, fail);
  });
}


var Apps = { // can be removed soon
  address: 'apps',

  init: function(obj, appTpl) {
    extend(cur, {
      searchCont: ge('apps_search') || ge('apps_search_wrap'),
      module: 'apps',
      aSearch: ge('s_search'),
      clearSearch: ge('apps_query_reset'),
      aContent: ge('app_rows'),
      sHeader: ge('apps_popular_header'),
      sContent: ge('app_search_list'),
      sPreload: ge('app_search_preload'),
      sWrap: ge('app_search_wrap'),
      summary: ge('apps_summary'),
      sSummary: ge('app_search_summary'),
      progress: ge('apps_summary_progress'),
      showMore: ge('more_link'),
      sShowMore: ge('s_more_link'),
      showRecMore: ge('rec_more_link'),
      recommendations: ge('app_recommend'),
      sContentWrap: ge('apps_search_cat_wrap'),
      appTpl: appTpl || function() {
        return '';
      }
    });

    cur.onSilentLoad = [];

    extend(cur, obj);
    extend(cur, {
      defaultCount: cur.shownApps,
      appsPerPage: 20,
      recsPerPage: 15,
      settingsPerPage: 40,
      recsInitCount: 20,
      deletedCount: 0
    });
    if (cur.recJSON) {
      cur.recCount = cur.recJSON.length;
    }

    var phOpts = {back: true};
    if (cur.section == 'manage') {
      var prop = [], dirs = ['Top', 'Bottom', 'Left', 'Right'];
      for (var i = 0; i < 4; ++i) {
        prop.push('padding' + dirs[i]);
      }
      phOpts.pad = extend({
        margin: 0
      }, getStyle(cur.aSearch, prop));
      phOpts.phColor = '#929eb0';
    }
    placeholderSetup(cur.aSearch, phOpts);

    Apps.scrollnode = browser.msie6 ? pageNode : window;
    if (cur.noScrollTop) {
      delete cur.noScrollTop;
    } else {
      window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    }

    var sect = cur.section;
    if (sect != 'manage') {
      cur._back = {
        show: [
          Apps.startEvents.pbind(cur),
          Apps.backToCatalog,
          Apps.selectTab.pbind(sect),
          function() {
            Apps.updateCatalogBlocks(cur.searchType, cur.searchStr);
          },
          hide.pbind(cur.progress)
        ],
        hide: [
          Apps.stopEvents.pbind(cur)
        ],
        text: cur.backLang
      };
    }
    Apps.startEvents(cur);
    cur.destroy.push(function() {
      Apps.stopEvents(cur);
    });

    Apps.updateSearchInputWidth();
    Apps.toggleRecentAndFeatured(cur.searchType == 0);

    setTimeout(function() {
      var cl = nav.curLoc ? nav.fromStr(nav.curLoc) : nav.objLoc;
      cur.searchStr = cl.q || '';
      if (cur.add) {
        //ge('s_gr_search').focus();
      } else if (cur.section !== 'catalog') {
        //cur.aSearch.focus();
      }
    }, 0);

    cur.apps = {};
    cur.feedHideEls = [];

    var ddAppsGenres = ge('apps_type_genres');
    if (ddAppsGenres) {
      var types = [], customMenuOpts = {
        menuNodeClass: 'apps_genres',
        leftOffset: 23,
        topOffset: -3,
        reverseMargin: 38,
        hideItem: -1,
        hideLabel: ''
      };
      cur.appsGenresData = {};
      for (var i in cur.appsGenres) {
        types.push([cur.appsGenres[i][0], cur.appsGenres[i][1], '0px', Apps.switchType.pbind(cur.appsGenres[i][0]), '', '', 'display: block;']);
         cur.appsGenresData[cur.appsGenres[i][0]] = cur.appsGenres[i][1];
      }

      cur.genrestt = new ElementTooltip(gpeByClass('apps_type_link_wrap', ddAppsGenres), {
        onFirstTimeShow: function(content) {
          content.innerHTML = cur.genresHtml;
        },
        onShow: function(content) {
          var SELECTED_CLS = 'apps_genres_tt_item_selected';
          each(geByClass(SELECTED_CLS), function() { removeClass(this, SELECTED_CLS) });
          addClass('apps_genres_tt_' + cur.searchType, SELECTED_CLS);
        },
        offset: [-4, 0],
        elClassWhenTooltip: 'apps_tt_hover',
        delay: 0
      });

      //cur.genresMenu = initCustomMedia(ddAppsGenres, types, customMenuOpts);
    }

    if (!cur.silent_mode) return;
    cur.silent = true;
    var query = {act: 'load_apps_silent', gid: cur.gid, section: cur.section, preload: 1};
    if (cur.searchType != undefined) {
      query.type = cur.searchType;
    }
    var preloadKeys = [];
    for (var i in (cur.preload || {})) {
      preloadKeys.push(i);
    }
    query.preloaded = preloadKeys;
    ajax.post(Apps.address, query, {cache: 1, onDone: (function(data, opts, preload) {
      if (opts) {
        opts = eval('('+opts+')');
        extend(opts.lang, (cur.lang || {}));
        extend(cur, opts);
      }
      if (query.preload) {
        cur.preload = extend(cur.preload || {}, preload);
      }
      var obj = eval('('+data+')');
      if (!obj) {
        cur.silent = false;
        return;
      }
      cur.searchOffset = cur.searchOffset || 0;
      cur.curList = 'all';
      cur.appsList = obj[cur.curList] ? obj : {all:[]};
      if ((cur.section == 'catalog' || cur.section == 'list') && !cur.searchStr) {
        cur.sectionCount = 0;
      } else {
        cur.sectionCount = (cur.appsList[cur.curList] || []).length;
      }
      this.indexAll(function() {
        cur.silent = false;
        if (cur.onSilentLoad) {
          for (var i in cur.onSilentLoad) {
            cur.onSilentLoad[i]();
          }
        }
      });
    }).bind(this), local: 1});
  },

  initUpdates: function(opts) {
    cur.updatesKey = opts.key;
    var checkCb = function() {
      if (window.Notifier && cur.updatesKey) {
        var res = Notifier.addKey(cur.updatesKey, function(key, data) {
          if (!cur.updatesKey) {
            return;
          }
          if (data.events) {
            for (var i in data.events) {
              Apps.parseEvent(data.events[i]);
            }
          }
          if (data.ts) {
            cur.updatesKey.ts = data.ts;
          }
        });
      }
    };
    checkCb();
    checkInt = setInterval(checkCb, 10000);
    cur.destroy.push(function () {
      clearInterval(checkInt);
    });
  },

  parseEvent: function(ev) {
    var ev = ev.split('<!>');
    var html = ev[3];
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (h < 10) {
      h = '0'+h;
    }
    if (m < 10) {
      m = '0'+m;
    }
    html = html.replace('{date}', h+':'+m);
    var el = se(html);
    var cont = ge('apps_feed_list');
    var appsEls = geByClass('apps_recent_row', ge('apps_recent_list'));
    var appsCount = appsEls.length;
    var feedEls = geByClass('apps_feed_row', cont);
    var feedCount = feedEls.length;
    var time = 300;
    if (!cont) {
      return false;
    }

    if (feedCount && feedCount >= 3) {
      var last = feedEls.pop();
      if (cont && last) {
        cont.removeChild(last);
      }
      cur.feedHideEls.push(last);
    }

    var c = ce('div', {className: 'apps_feed_animate_cont'});
    c.appendChild(el);
    addClass(el, 'apps_feed_animate_el');
    cont.insertBefore(c, cont.firstChild);

    animate(c, {height: 51}, {duration: time, transition: Fx.Transitions.easeOutCubic, onComplete: function() {
      removeClass(el, 'apps_feed_animate_el');
      cont.insertBefore(el, c);
      re(c);
    }});
    if (window.tooltips) {
      tooltips.hideAll();
    }
    cur.el = el;
    cur.c = c;
    cur.cont = cont;
  },

  backToCatalog: function() {
    if (window.appsListChanged) {
      var list = ge('apps_recent_list');
      if (list) {
        ajax.post('al_apps.php', {act: 'update_recent'}, {
          onDone: function(html, recent) {
            list.innerHTML = html;
            delete window.appsListChanged;
            if (recent) {
              recent = eval('('+recent+')');
              for (var i in recent) {
                var a = recent[i];
                cur.apps[a[0]] = a;
              }
            }
          },
          showProgress: show.pbind('apps_recent_progress'),
          hideProgress: hide.pbind('apps_recent_progress')
        });
      }
    }
  },

  startEvents: function(cur) {
    addEvent(Apps.scrollnode, 'scroll', Apps.scrollCheck);
    addEvent(window, 'resize', Apps.scrollCheck);
    addEvent(cur.aSearch, 'blur', Apps.searchBlur);
    addEvent(cur.aSearch, 'focus', Apps.searchFocus);

    Apps.initFeaturedAutoScroll();
  },

  stopEvents: function(cur) {
    removeEvent(Apps.scrollnode, 'scroll', Apps.scrollCheck);
    removeEvent(window, 'resize', Apps.scrollCheck);
    removeEvent(cur.aSearch, 'blur', Apps.searchBlur);
    removeEvent(cur.aSearch, 'focus', Apps.searchFocus);

    clearInterval(cur.featuredAutoScrollTimer);
  },

  initAppView: function(params, options) {
    cur.nav.push(function(changed, old, n, opt) {
      if (changed['0'] === undefined && !changed['join'] && !opt.pass) {
        if (changed['#']) {
          cur.app.onLocChanged(changed['#']);
          if (opt.back) {
            if (vk.al != 3) {
              nav.setLoc(n);
            }
          } else {
            nav.setLoc(n);
          }
          return false;
        } else {
          nav.setLoc(n);
          return false;
        }
      }
    });

    var stateCallback = function(e) {
      if (e.type == 'block') {
        cur.app.runCallback('onWindowBlur');
      } else {
        cur.app.runCallback('onWindowFocus');
      }
    };

    cur.app.onReady.push(function() {
      //alert('inited');
      cur.app.onLocChanged(params.hash);
      addEvent(document, 'block unblock', stateCallback, true);
      cur.destroy.push(function() {
        removeEvent(document, 'block unblock', stateCallback);
      });
    });

    if (options.icon) {
      setFavIcon(options.icon);
      cur.destroy.push(function() {
        setFavIcon('/images/favicon' + (vk.intnat ? '_vk' : 'new') + _iconAdd + '.ico');
      });
    }
  },

  setFooter: function() {
    if (!cur.footer) {
      return;
    }
    setTimeout(function() {
      var pageFooter = ge('footer_wrap');
      cur.footerBackup = pageFooter.innerHTML;
      pageFooter.innerHTML = cur.footer;
      cur.destroy.push(function() {
        pageFooter.innerHTML = cur.footerBackup;
      });

      if (cur.appMenuItems) {
        cur.adminMenu = Apps.setFooterDD(ge('apps_admin_menu'), cur.appMenuItems);
      }
      if (cur.appMenuTypeItems) {
        cur.adminTypeMenu = Apps.setFooterDD(ge('apps_check_change_type'), cur.appMenuTypeItems);
      }
    }, 0);
  },

  setFooterDD: function(target, items) {
    var p_options = [];
    for (var i in items) {
      var item = items[i];
      p_options.push({i:i, l:item[0], onClick: (function(item) {
        eval(item[1]);
        cur.adminMenu.hide();
        return false;
      }).pbind(item)})
    }
    return new DropdownMenu(p_options, {
      target: target,
      containerClass: 'dd_menu_posts'
    });
  },

  installApp: function(aid, hash, callback) {
    ajax.post(Apps.address, {act: 'do_install', aid: aid, hash: hash}, {onDone: function() {
      Apps.onAppAdded();
      if (callback) {
        callback();
      }
    }});
  },

  onAppAdded: function() {
    if (cur.app) {
      cur.app.runCallback('onApplicationAdded');
      cur.appUser = true;
      hide('apps_install_btn');
      show('apps_show_settings');
    }
  },

  saveSettings: function(aid, hash, onlyCheckboxes, extOpts) {
    if (!onlyCheckboxes) {
      if (extOpts && extOpts.btn) {
        lockButton(extOpts.btn);
      }
      show('apps_settings_progress');
    }

    var payAdd = ge('app_pay_add');
    var payWidthdraw = ge('app_pay_withdraw');
    var params = {
      act: 'save_settings',
      aid: aid,
      hash: hash,
      from: 'appview',
      app_settings_1: isChecked(ge('app_settings_1')),
      app_settings_256: isChecked(ge('app_settings_256')),
      add: (payAdd ? payAdd.value : 0),
      withdraw: (payWidthdraw ? payWidthdraw.value : 0),
      only_checkboxes: (onlyCheckboxes ? 1 : 0),
      cur_aid: cur.aid
    };
    if (isVisible('app_settings_2097152')) {
      params.app_settings_2097152 = isChecked(ge('app_settings_2097152'));
    }

    ajax.post('apps', params, extend({
      onDone: function(result) {
        if (extOpts && extOpts.btn) {
          unlockButton(extOpts.btn);
        }
        if (result['left_nav']) {
          val(geByTag1('ol', ge('side_bar')), result['left_nav']);
        }
        if (!onlyCheckboxes) {
          if (cur.app) {
            cur.app.runCallback('onSettingsChanged', result.settings);
          }
        }
        cur.settingsOnLoad = false;
        if (result.coins !== undefined) {
          if (cur.app) {
            cur.app.balanceUpdated(result.coins);
          }
        }
        if (result.balance !== undefined) {
          updateMoney(result.balance);
        }
        var box = curBox();
        if (box && !onlyCheckboxes) {
          box.hide();
        }
      },
      onFail: function(text) {
        ge('apps_settings_error').innerHTML = text;
        show('apps_settings_error');
        hide('apps_settings_progress');
        scrollToTop(200);
      }
    }, extOpts || {}));
  },

  searchFocus: function() {
    var alist = ge('apps_results');
    if (!hasClass(alist, 'light')) addClass(alist, 'light');
  },

  searchBlur: function() {
    var alist = ge('apps_results');
    if (hasClass(alist, 'light')) removeClass(alist, 'light');
  },

  scrollCheck: function () {
    var searchBar = ge('apps_search_wrap'), searchWrap = ge('apps_search_rel');
    if (searchBar && searchWrap) {
      var pos = getXY(searchWrap)[1], h = getSize(searchBar)[1],
          fixed = pos < scrollGetY() && window.lastWindowHeight > 120,
          ddFixed = cur.genresMenu && cur.genresMenu.fixed;
      toggleClass(searchBar, 'fixed', fixed);
      setStyle(searchWrap, {paddingTop: (fixed ? h : 0)});
      if (cur.genresMenu && ddFixed != fixed) {
        cur.genresMenu.updateFixed(fixed);
      }
    }
    if (browser.mobile || cur.isAppsLoading  || cur.disableAutoMore) return;
    if (!isVisible(cur.showMore) && !isVisible(cur.sShowMore) && !isVisible(cur.showRecMore)) return;
    if (!cur.curList) {
      setTimeout(Apps.scrollCheck, 50);
      return;
    }

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (isVisible(cur.showMore) && cur.section != 'settings' && cur.section != 'manage' && st + ch + 400 > cur.showMore.offsetTop) {
      Apps.showRows(true);
    }

    if (isVisible(cur.showMore) && (cur.section == 'settings' || cur.section == 'manage') && st + ch + 400 > cur.showMore.offsetTop) {
      Apps.showSettingsRows(0);
    }

    if (isVisible(cur.sShowMore) && st + ch + 400 > cur.sShowMore.offsetTop) {
      Apps.loadRows();
    }
  },

  indexAll: function(callback) {
    var all = cur.appsList['all'];
    cur.appsIndex = new vkIndexer(all, function(obj) {
      try {
        cur.apps[parseInt(obj[0])] = obj;
        return obj[3];
      } catch(e) { return '';}
    }, function() {
        if (callback) {
          callback();
        }
    });
  },

  drawApp: function(app, last, edit) {
    return cur.appTpl(app, last, edit);
  },

  updateList: function(e, obj) {
    if (window.tooltips) {
      tooltips.hideAll()
    }
    if (e && e.keyCode == KEY.ESC) {
      return Apps.clearSearch(ge('apps_query_reset'), e);
    }
    if (!cur.section) {
      return Apps.switchTab('apps', false, true);
    }
    if (cur.silent) {
      addClass(cur.searchCont, 'loading');
      cur.onSilentLoad.push(function() {
        removeClass(cur.searchCont, 'loading');
        Apps.updateList(e, obj);
      });
      return;
    }
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout((function() {
      var str = trim(obj.value);
      if (str == cur.searchStr && !cur.justAdded && !cur.ignoreEqual) {
        return;
      }
      if (cur.ignoreEqual) {
        delete cur.ignoreEqual;
      }
      if (str) {
        addClass(cur.clearSearch, 'shown');
      } else {
        removeClass(cur.clearSearch, 'shown');
      }
      if (cur.section == 'apps' && str.length < 2) {
        Apps.hideSearchResults();
      }
      cur.searchStr = str;
      cur.loadMore = 1;
      this.searchApps(str, (cur.section == 'catalog' || cur.section == 'list') ? 'search' : 'all');
      if (cur.section != 'catalog') {
        scrollToTop();
      }
    }).bind(this), 10);
  },

  searchApps: function(str, type) {
    cur.shownApps = 0;
    cur.curSection = type;
    if (str && type == 'all') {
      var htmlentities = function(s){
        var el = document.createElement('div');
        el.innerText = el.textContent = s;
        s = el.innerHTML;
        delete el;
        return s.split('"').join('&quot;');
      }
      var htmlencode = function(str){
        var aStr = str.split(''), i = aStr.length, aRet = [];
        while (i--) {
          var iC = aStr[i].charCodeAt();
          if (iC == 39 || (iC > 127 && iC < 1040) || iC > 1103) {
            aRet.push('&#'+iC+';');
          } else if (iC == 36) {
            aRet.push('&#0'+iC+';');
          } else {
            aRet.push(htmlentities(aStr[i]));
          }
        }
        return aRet.reverse().join('');
      }
      var res = cur.appsIndex.search(htmlencode(str));
      var newList = cur.curSection;
      newList += '_search_'+str;
      cur.curList = newList;
      cur.appsList[cur.curList] = res;

      str += ' '+(parseLatin(str) || '');
      str = trim(escapeRE(str).split('&').join('&amp;'));
      cur.selection = {
        re: new RegExp('('+str.replace(cur.appsIndex.delimiter, '|')+')', 'gi'),
        val: '<span>$1</span>'
      };
    } else {
      cur.curList = cur.curSection;
      cur.selection = false;
    }

    cur.sectionCount = (cur.appsList && cur.appsList[cur.curList]) ? Apps.filter(cur.appsList[cur.curList]).length : 0;
    this.filterTimeout = setTimeout((function() {
      hide(cur.sShowMore);
      cur.searchOffset = 0;
      if (!this.showRows(false)) {
        if ((cur.section == 'apps' || cur.section == 'catalog') && cur.sectionCount) {
          this.changeSummary();
        }
      }
    }).bind(this), 10);
  },

  showSearchCleared: function() {
    removeClass(cur.clearSearch, 'over');
    cur.aSearch.setValue('');
    //cur.aSearch.focus();
    removeClass(cur.clearSearch, 'shown');
    cur.searchStr = '';
  },

  clearSearch: function(el, event) {
    this.showSearchCleared();
    if (cur.section == 'catalog' || cur.section == 'list') {
      if (cur.searchSort) {
        cur.searchOffset = 0;
        cur.sectionCount = 0;
        addClass(cur.searchCont, 'loading');
        this.catalogSearch(cur.searchStr, cur.searchOffset);
      } else {
        cur.ignoreEqual = true;
        this.updateList(null, cur.aSearch);
      }
      return;
    }
    this.hideSearchResults();
    this.searchApps('', 'all');
    scrollToTop();
  },

  showRows: function(force) {
    if (cur.silent) {
      cur.onSilentLoad.push(function() {
        Apps.showRows(force);
      });
      return;
    }
    if (cur.section == 'settings' || cur.section == 'manage') {
      this.showSettingsRows();
      return;
    }
    if (!cur.justAdded){
      if (ge('apps_message')) hide('apps_message');
    } else {
      show('apps_message');
      delete cur.justAdded;
    }

    if ((cur.section == 'catalog' || cur.section == 'list') && !cur.searchStr) {
      cur.searchOffset = 0;
      addClass(cur.searchCont, 'loading');
      cur.sectionCount = 0;
      this.catalogSearch(cur.searchStr, cur.searchOffset);
      return true;
    }

    var list = cur.appsList && cur.appsList[cur.curList] || [];
    list = Apps.filter(list).sort(function(a,b) {return a._order - b._order});

    cur.sectionCount = list.length;
    var start = cur.shownApps;
    var count = (cur.searchStr || force) ? cur.appsPerPage : cur.defaultCount;
    var end = start + count;

    var cont = cur.aContent;
    toggle(ge('app_actions'), !cur.searchStr);

    if (!list || !list.length) {
      var msg;
      var defaultList = 'all';
      if (!cur.searchStr && cur.appsList[defaultList].length <= cur.deletedCount) {
        if (cur.id == vk.id) {
          msg = getLang('apps_youhavenoapps')+"<br /><a onclick=\"Apps.showSummaryProgress(); return nav.go(this, event);\" href=\"apps?act=catalog\">"+getLang('apps_viewallapps')+" &raquo;</a>";
        } else if (cur.gid){
          msg = getLang('apps_noappsingroup2');
          if (cur.isGroupAdmin) msg += "<br /><a onclick=\"Apps.showSummaryProgress() return nav.go(this, event);\" href=\"apps?act=catalog&gid="+cur.gid+"\">"+getLang('apps_viewallapps')+" &raquo;</a>";
        } else {
          msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
        }
        cont.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
      } else {
        if (cur.searchStr.length < 2) {
          if (cur.section == 'catalog' || cur.section == 'list') {
            this.loadRows();
          } else {
            msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
            cont.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
          }
        }
      }
      hide(cur.showMore);
    } else {
      if (!cur.shownApps) cont.innerHTML = '';
      var apps = list.slice(start, end);
      if (!apps.length) {
        if (cur.shownApps >= cur.sectionCount) {
          hide(cur.showMore);
          if (cur.searchStr && cur.searchStr.length >= 2) {
            this.loadRows();
          }
        }
        return;
      }

      Apps.drawRows(apps, cont);
    }
    if (cur.shownApps >= cur.sectionCount) {
      hide(cur.showMore);
      if (cur.searchStr && cur.searchStr.length >= 2) {
        this.loadRows();
      }
    } else {
      show(cur.showMore);
    }
  },

  drawRows: function(apps, cont) {
    var html = [];
    for (i in apps) {
      var app = apps[i].slice();
      var last = (cur.shownApps == cur.sectionCount - 1);
      if (cur.selection) {
        app[3] = app[3].replace(cur.selection.re, cur.selection.val);
      }
      html.push(Apps.drawApp(app, last));
      cur.shownApps += 1;
    }
    var au = ce('div', {innerHTML: html.join('')});
    while (au.firstChild) {
      cont.appendChild(au.firstChild);
    }
    if (cur.shownApps) {
      if (!cur.searchStr || cur.searchStr.length < 2) {
        hide(cur.sContent);
      }
    }
    if (cur.section == 'catalog' || cur.section == 'list') {
      if (cur.searchStr) {
        hide('apps_cat');
        show('apps_subsummary');
      } else {
        show('apps_cat');
        hide('apps_subsummary');
      }
    }
  },

  loadRows: function() {
    if (cur.section == 'settings' || cur.section == 'manage') {
      if (!cur.sectionCount) {
        Apps.changeSummary();
        msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
        cur.aContent.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
      }
      return;
    }
    if (cur.sPreload.innerHTML) {
      while (cur.sPreload.firstChild) {
        cur.sContent.appendChild(cur.sPreload.firstChild);
      }
    }
    if (!cur.loadMore) {
      cur.loadMore = 1;
      hide(cur.sShowMore);
      return;
    }
    if (cur.section == 'catalog' || cur.section == 'list') {
      if (!cur.searchStr) {
        show('apps_cat');
        hide('apps_subsummary');
      }

      if (!cur.searchStr) cur.searchStr = '';
      Apps.catalogSearch(cur.searchStr, cur.searchOffset);
      return;
    }
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout((function() {
      Apps.searchRequest(cur.searchStr, cur.searchOffset);
    }).bind(this), 300);
  },

  updateSearchInputWidth: function() {
    var searchInputEl = geByTag1('input', ge('apps_search_wrap'));
    var itemsWrap = geByClass1('apps_search_items_wrap');
    var searchBar = geByClass1('apps_search_wrap_cont');

    setStyle(searchInputEl, {
      width: getSize(searchBar)[0] - getSize(itemsWrap)[0] - 100
    });
    show(geByClass1('apps_search_input_wrap'));
  },

  toggleRecentAndFeatured: function(toShow) {
    var func = toShow ? show : hide;

    var showMoreToggle = geByClass1('apps_block_more');
    if (cur.initiallyMoreToggleVisible === undefined) {
      cur.initiallyMoreToggleVisible =  isVisible(showMoreToggle);
    }

    if (cur.initiallyMoreToggleVisible) {
      func(showMoreToggle);
    }

    each('apps_cat_layout apps_featured_wrap apps_request_list requests_summary'.split(' '), function(i, cl) {
      func(geByClass1(cl));
    })

    toggleClass('apps_cat_summary', 'apps_cat_header_hide', !toShow);
  },

  catalogSearch: function(val, offset, opts) {
    if (val[val.length - 1] == ' ') {
      val[val.length - 1] = '_';
    }
    var opts = opts || {};
    removeClass(cur.clearSearch, 'over');
    var exclude = [];
    if (val) {
      if (cur.appsList) {
        var lst = cur.appsList[cur.curList];
        if (lst) {
          for (var i in lst) {
            exclude.push(lst[i][0]);
          }
        }
      }
    }

    if (Apps._prevType === undefined) {
      Apps._prevType = -1;
    }

    if (val) {
      if (Apps._prevType == -1) {
        Apps._prevType = cur.searchType;
      }
      cur.searchType = 0;
      Apps.showTypeSwitched(-1);
    } else if (cur.searchType == 0) {
      cur.searchType = Apps._prevType == -1 ? 0 : Apps._prevType;
      Apps.showTypeSwitched(cur.searchType);
      Apps._prevType = -1;
    }

    Apps.updateSearchInputWidth();

    var query = {
      act: (cur.section == 'list' && !val && cur.list || 'search'),
      q: val,
      offset: offset,
      oid: cur.oid,
      from: cur.section,
      sort: cur.searchSort,
      type: cur.searchType,
      catalog_search: 1,
      exclude: exclude.join(',')
    };
    if (cur.collectionId) {
      query.id = cur.collectionId;
    }
    if (!val) {
      query.type = cur.searchType;
    }
    ajax.post(Apps.address, query, {
      onDone: function(res, preload, options) {
        Apps.toggleRecentAndFeatured(!(val || cur.searchType != 0));

        if (cur.module != 'apps') return;
        if (opts.callback) {
          opts.callback();
        }
        Apps.hideSummaryProgress();
        var newVal = cur.searchStr;
        if (newVal[newVal.length - 1] == ' ') {
          newVal[newVal.length - 1] = '_';
        }
        if (val != newVal) {
          return;
        }
        if (res) {
          Apps.updateCatalogBlocks(query.type, val);
          cur.sContent.innerHTML = res;
          if (!query.offset) {
            Apps.updateScrollPos();
          }
        }
        if (preload) {
          cur.sPreload.innerHTML = preload;
          cur.hasMore = true;
        } else {
          cur.hasMore = false;
        }
        Apps.applyOptions(options);

        if (!cur.sectionCount) {
          hide(cur.sWrap);
          Apps.changeSummary(true);
          cur.aContent.innerHTML = '';
          if (!cur.searchCount && !res && !preload) {
            msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
            cur.aContent.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
            hide(cur.showMore);
            hide(cur.sContent);
          } else {
            show(cur.sContent);
          }
        } else {
          if (cur.searchCount) {
            if (cur.sSummary) {
              cur.sSummary.innerHTML = getLang('apps_global_search_found', cur.searchCount, true);
              show(cur.sWrap);
            }
            show(cur.sContent);
          } else {
            Apps.hideSearchResults();
            hide(cur.sWrap);
          }
        }
        Apps.updateCatalogBlocks(cur.searchType, cur.searchStr);
        if (!query.offset) {
          Apps.updateScrollPos();
        }
        Apps.scrollCheck();
        delete nav.objLoc.section;

        if (cur.section == 'catalog' && (cur.searchSort || nav.objLoc.sort || cur.searchType || nav.objLoc.type || val || nav.objLoc.q)) {
          nav.setLoc(extend(nav.objLoc, {sort: cur.searchSort == 0 ? null : cur.searchSort, type: cur.searchType == 0 ? null : cur.searchType, q: val ? val : null}));
        }
      },
      onFail: function() {
        Apps.hideSummaryProgress();
      },
      showProgress: opts.showProgress || function () {
        cur.isAppsLoading = true;
        addClass(cur.searchCont, 'loading');
      },
      hideProgress: opts.hideProgress || function () {
        cur.isAppsLoading = false;
        removeClass(cur.searchCont, 'loading');
      },
      cache: val ? 0 : 1
    });
  },

  searchRequest: function(val, offset) {
    if (!val) return;
    if (val[val.length - 1] == ' ') {
      val[val.length - 1] = '_';
    }
    addClass(cur.searchCont, 'loading');
    removeClass(cur.clearSearch, 'over');
    var query = {act: 'search', q: val, offset: offset, oid: cur.oid, from: cur.section};
    if (cur.newLook) {
      query.type = cur.searchType;
    }
    var cont = cur.aContent;
    var otherCont = cur.sContent;
    ajax.post(Apps.address, query, {onDone: function(res, preload, options) {
        removeClass(cur.searchCont, 'loading');
        var newVal = cur.searchStr;
        if (newVal[newVal.length - 1] == ' ') {
          newVal[newVal.length - 1] = '_';
        }
        if (val != newVal) {
          return;
        }
        if (res) {
          cur.sContent.innerHTML = res;
          Apps.updateCatalogBlocks(query.type, val);
          if (!query.offset) {
            Apps.updateScrollPos();
          }
        }
        if (preload) {
          cur.sPreload.innerHTML = preload;
          cur.hasMore = true;
        } else {
          cur.hasMore = false;
        }
        Apps.applyOptions(options);
        show(cur.sContent);
        if (!cur.sectionCount) {
          hide(cur.sWrap);
          Apps.changeSummary(true);
          cont.innerHTML = '';
          if (!cur.searchCount && !res && !preload) {
            msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
            cont.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
            hide(cur.showMore);
            hide(otherCont);
          }
        } else {
          if (cur.searchCount) {
            if (cur.sSummary) {
              cur.sSummary.innerHTML = getLang('apps_global_search_found', cur.searchCount, true);
              show(cur.sWrap);
            }
          } else {
            Apps.hideSearchResults();
            hide(cur.sWrap);
          }
        }
        Apps.scrollCheck();
      },
      onFail: function() {
        removeClass(cur.searchCont, 'loading');
      },
      showProgress: function () {
        cur.isAppsLoading = true;
      },
      hideProgress: function () {
        cur.isAppsLoading = false;
      }
    });
  },

  applyOptions: function(options) {
    extend(cur, options);
    if (!cur.hasMore || cur.sContentWrap && hasClass(cur.sContentWrap, 'apps_scroll_wrap')) {
      hide(cur.sShowMore);
    } else {
      show(cur.sShowMore);
    }
    if (cur.sContentWrap) {
      data(cur.sContent, 'loaded', cur.hasMore ? '' : 1);
    }
  },

  hideSearchResults: function() {
    if (!cur.sContent) return;
    setTimeout(function(){
      cur.sContent.innerHTML = '';
      if (cur.sHeader) {
        cur.sHeader.innerHTML = getLang('apps_popular_summary');
      }
      Apps.updateCatalogBlocks(cur.searchType, cur.searchStr);
      cur.sPreload.innerHTML = '';
      hide(cur.sContent);
      hide(cur.sWrap);
    }, 0);
  },

  filter: function(arr) {
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (cur.apps && cur.apps[t[0]] && !cur.apps[t[0]].deleted) {
        res.push(t);
      }
    }
    return res;
  },

  showAppSettings: function(aid, info) {
    if (info) {
      showBox(Apps.address, {act: 'settings_box_info', aid: aid}, {params: {dark: 1}});
    } else {
      showBox(Apps.address, {act: 'settings_box', aid: aid, mask: 0, main: 1}, {params: {dark: 1}});
    }
  },

  showInviteBox: function(aid, hash) {
    if (!aid) {
      aid = cur.app.options.aid;
      hash = cur.app.options.hash;
    }
    showTabbedBox('al_friends.php', {act: 'select_friends_box', Checked: '', invite: 1, aid: aid, from: 'apps'}, {stat: ['privacy.js', 'ui_controls.js', 'ui_controls.css'], cache: 1, params: {dark: 1}});
    cur.onFlistSave = function (ids, list) {
      ajax.post('apps', {act: 'invite_friends', aid: aid, friends: ids.join(','), hash: hash}, {
        onDone: function(title, text) {
          setTimeout(showFastBox({title: title, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text, getLang('global_close')).hide, 2000);
        },
        onFail: function(text) {
          setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text, getLang('global_close')).hide, 2000);
          return true;
        }
      })
    }
  },

  addApp: function(aid, hash) {
    if (cur.adding) return false;
    cur.adding = true;
    ajax.post(Apps.address, {act: 'join', gid: cur.gid, id: aid, hash: hash, from: 'al_apps', section: cur.section}, {
      onDone: function(msg, res) {
        delete cur.adding;
        ge('app_add'+aid).innerHTML = msg;
        if (cur.section == 'apps') {
          var obj = eval('('+res+')');
          var all_list = cur.appsList['all'];
          if (all_list && all_list.length) {
            obj._order = all_list[0]._order - 1;
            cur.appsList['all'].splice(0,0,obj);
          } else {
            obj._order = 0;
            cur.appsList['all'] = [obj];
          }
          cur.apps[obj[0]] = obj;
          cur.appsIndex.add(obj);
          cur.defaultCount++;
        }
      },
      onFail: function() {
        delete cur.adding;
      }
    });
    return false;
  },

  removeApp: function(aid, hash, force) {
    if (cur.silent) {
      cur.onSilentLoad.push(function() {
        Apps.removeApp(aid, hash, force);
      });
      return;
    }
    if (cur.deleting) {
      return false;
    }
    var doRemoveApp = function(aid, hash, force) {
      var el = ge('app' + aid);
      if (window.tooltips && ge('delete_row' + aid)) {
        tooltips.hide(ge('delete_row' + aid))
      }
      if (window.tooltips && el && el.tt) {
        tooltips.hide(el);
      }
      if (ge('apps_message')) hide('apps_mesasge');
      var del = ge('delete_row' + aid);
      var params = {act: 'quit', gid: cur.gid, id: aid, hash: hash, from: 'al_apps'};
      if (cur.section == 'catalog' && force == 2) {
        params.from = 'recent';
        params.offset = cur.recentOffset;
      }
      ajax.post(Apps.address, params, {
        onDone: function(text, data) {
          delete cur.preload;
          cur.appsIndex.remove(cur.apps[aid]);
          cur.deletedCount++;
          cur.apps[aid].deleted = true;
          if (cur.section == 'catalog' && force == 2) {
            var row = ge('delete_row' + aid);
            var newRow = geByClass1('apps_recent_row_hidden', ge('apps_recent_list'));
            if (row) {
              row = row.parentNode;
              removeClass(newRow, 'apps_recent_row_hidden')
              hide(row);
            }
            if (text) {
              ge('apps_recent_list').appendChild(se(text));
            }
            if (data) {
              cur.recentOffset += data;
            }
            return;
          } else if (force) {
            cur.aSearch.value = '';
            // delete cur.apps[aid];
            cur.ignoreEqual = true;
            Apps.updateList(null, cur.aSearch);
            return;
          } else {
            if (geByClass1('app_deleted_layer', el)) {
              addClass(el, 'deleted')
              var delEl = geByClass1('app_deleted_layer', el);
              delEl.innerHTML = text;
              var textEl = domFC(delEl);
              setStyle(textEl, {marginTop: 64 - getSize(textEl)[1] / 2})
            } else {
              if (!cur.deletedApps) cur.deletedApps = [];
              cur.deletedApps[aid] = el.innerHTML;
              var isLast = hasClass(el.firstChild, 'last');
              el.innerHTML = text;
              if (isLast) {
                var dld = geByClass1('dld', el);
                if (dld) addClass(dld, 'last');
              }
            }
          }
          if (cur.section == 'apps' || cur.section == 'catalog') {
            cur.shownApps--;
            cur.sectionCount--;
            Apps.changeSummary();
          } else {
            var i = parseInt(cur.apps[aid][7]);
            cur.totalCounters[i]--;
            cur.shownCounters[i]--;
            var summaries = [ge('apps_summary'), ge('app_site_summary'), ge('app_desktop_summary')];
            if (summaries[i]) {
              switch (i) {
                case 1:
                  summaries[i].innerHTML = getLang('apps_X_sites', cur.totalCounters[i], true);
                  break;
                case 2:
                  summaries[i].innerHTML = getLang('apps_X_desktop_apps', cur.totalCounters[i], true);
                  break;
                case 0:
                default:
                  summaries[i].innerHTML = getLang((cur.searchStr ? 'apps_X_apps_found' : 'apps_X_apps'), cur.totalCounters[i], true);
                  break;
              }
            }
          }
        },
        showProgress: function() {
          cur.deleting = true;
          Apps.showSummaryProgress();
        },
        hideProgress: function() {
          delete cur.deleting;
          Apps.hideSummaryProgress();
        }
      });
    }
    if (cur.section == 'catalog' && force == 2) {
      var box = showFastBox({title: getLang('apps_quit_app_box_title'), width: 430, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('apps_quit_confirm'), getLang('apps_remove'), function() {
        doRemoveApp(aid, hash, force);
        box.hide();
      }, getLang('global_cancel'));
    } else if (cur.adminApps && cur.adminApps[aid]) {
      var box = showFastBox({title: getLang('apps_deletingapp'), width: 430, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('apps_admin_quit'), getLang('global_delete'), function() {
        doRemoveApp(aid, hash, force);
        box.hide();
      }, getLang('global_cancel'));
    } else {
      doRemoveApp(aid, hash, force);
    }
    return false;
  },

  restoreApp: function(aid, hash) {
    if (cur.restoring) {
      return false;
    }
    cur.restoring = true;
    Apps.showSummaryProgress();
    var el = ge('app' + aid);
    ajax.post(Apps.address, {act: 'join', gid: cur.gid, id: aid, hash: hash, from: 'al_apps', section: cur.section}, {
      onDone: function(result) {
        cur.deletedCount--;
        if (hasClass(el, 'deleted')) {
          removeClass(el, 'deleted');
        } else {
          el.innerHTML = cur.deletedApps[aid];
          delete cur.deletedApps[aid];
        }
        delete cur.apps[aid].deleted;
        cur.appsIndex.add(cur.apps[aid]);
        if (cur.section == 'apps') {
          cur.shownApps++;
          cur.sectionCount++;
          Apps.changeSummary();
        } else {
          var i = parseInt(cur.apps[aid][7]);
          cur.totalCounters[i]++;
          cur.shownCounters[i]++;
          var summaries = [ge('apps_summary'), ge('app_site_summary'), ge('app_desktop_summary')];
          if (summaries[i]) {
            switch (i) {
              case 1:
                summaries[i].innerHTML = getLang('apps_X_sites', cur.totalCounters[i], true);
                break;
              case 2:
                summaries[i].innerHTML = getLang('apps_X_desktop_apps', cur.totalCounters[i], true);
                break;
              case 0:
              default:
                summaries[i].innerHTML = getLang((cur.searchStr ? 'apps_X_apps_found' : 'apps_X_apps'), cur.totalCounters[i], true);
                break;
            }
          }
        }
      },
      showProgress: function() {
        Apps.showSummaryProgress();
      },
      hideProgress: function() {
        Apps.hideSummaryProgress();
        delete cur.restoring;
      }
    });
    return false;
  },

  changeSummary: function(from_search) {
    var sum = ge('apps_summary');
    if (!sum) return;
    var html = '', count = (from_search) ? cur.searchCount : cur.sectionCount;

    if ((cur.section == 'catalog' || cur.section == 'list') && !cur.searchStr) {
      html = getLang('apps_popular_summary');
    } else {
      if (cur.searchStr) {
        if (count) {
          html = from_search ? getLang('apps_global_search_found', count, true) : getLang('apps_X_apps_found', count, true);
        } else {
          html = getLang('apps_no_flash_apps');
        }
      } else {
        if (count) {
          html = getLang('apps_x_apps_default', count, true);
        } else {
          html = getLang('apps_no_apps_default');
        }
      }
    }
    toggleClass(sum.parentNode, 'no_results', !count);
    sum.innerHTML = html;
  },

  showAppFriends: function(aid, ev) {
    return !showBox(Apps.address, {act: 'show_app_friends_box', aid: aid}, {cache: 1, params:{width: '400px', bodyStyle: 'padding: 0px'}, stat: ['boxes.css'], dark: 1}, ev);
  },

  selectTab: function(tab, label) {
    if (tab == 'settings') {
      tab = 'apps';
    }
    var el = ge('tab_' + tab);
    if (!el && label) {
      ge('apps_tabs').appendChild(se('<li id="tab_' + tab + '" class="active_link"><a class="apps_inactive_tab"><b class="tl1"><b></b></b><b class="tl2"></b><b class="tab_word">' + label + '</b></a></li>'));
      el = ge('tab_' + tab);
    }
    if (el) {
      each(geByTag('li', ge('apps_tabs')), function(i, e) {
        removeClass(e, 'active_link');
        if (e.id != 'tab_' + tab && hasClass(domFC(e), 'apps_inactive_tab')) {
          hide(e);
        }
      });
      addClass(el, 'active_link');
      show(el)
    }
  },

  switchTab: function(tab, event, search) {
    if (event && checkEvent(event)) return true;
    if (window.tooltips) {
      tooltips.hideAll();
    }
    if (cur.section == tab) {
      return false;
    }
    var label = cur.tabLabels && cur.tabLabels[tab] || '';
    if (cur.preload && cur.preload[tab]) {
      var title = cur.preload[tab].title, html = cur.preload[tab].html, js = cur.preload[tab].js,
          _back = cur._back, wNode = ge('wrap3'), tNode = ge('title');
      if (_back) {
        revertLastInlineVideo();
        hist = {
          loc: _back.loc || nav.strLoc,
          cur: cur,
          radioBtns: radioBtns,
          ajaxCache: ajaxCache,
          pid: PageID,
          scrollTop: scrollGetY(),
          htitle: document.title.toString(),
          width: vk.width,
          width_dec: vk.width_dec,
          width_dec_footer: vk.width_dec_footer,
          noleftmenu: vk.noleftmenu,
          notopmenu: vk.notopmenu,
          nobottommenu: vk.nobottommenu,
          back: _tbLink.loc ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : false
        };
        if (tNode && tNode.parentNode && !isVisible(tNode.parentNode)) {
          hist.hideHeader = true;
        }
        globalHistoryDestroy(hist.loc);
        if (globalHistory.length > 2) {
          var h = globalHistory.shift();
          processDestroy(h.cur);
          h.content.innerHTML = '';
        }
        for (var i = 0, l = cur._back.hide.length; i < l; ++i) cur._back.hide[i]();
        showBackLink(hist.loc, _back.text, 1);
      } else {
        _tbLink.fast = 0;
        processDestroy(cur);
      }
      PageID = NextPageID;
      radioBtns = {};
      ajaxCache = {};
      boxQueue.hideAll();
      layerQueue.clear();
      if (layers.fullhide) layers.fullhide(true);

      var oldPreload = cur.preload || {};
      cur = {destroy: [], nav: [], preload: oldPreload};
      _stlWas = 0;
      if (_back) {
        var newW = ce('div', {id: 'wrap3', innerHTML: wNode.innerHTML});
        extend(hist, {
          content: wNode.parentNode.replaceChild(newW, wNode),
          title: tNode.innerHTML
        });
        globalHistory.push(hist);
        wNode = newW;
      }
      ge('apps').innerHTML = html;
      tNode.innerHTML = title;
      Apps.selectTab(tab, label);
      cur.recentOffset = 0;

      if (js) {
        cur.noScrollTop = true;
        eval('(function(){' + js + ';})()');
      }
      if (!search) {
        val(cur.aSearch, '');
      }
      __adsUpdate('force');
      nav.objLoc = {0: Apps.address, act: tab, mid: nav.objLoc.mid, gid: nav.objLoc.gid, add: nav.objLoc.add};
      nav.setLoc(nav.objLoc);
    } else {
      cur.recentOffset = 0;
      Apps.selectTab(tab, label);
      Apps.showSummaryProgress();
      nav.go({0: Apps.address, act: tab, mid: nav.objLoc.mid, gid: nav.objLoc.gid, add: nav.objLoc.add}, false);
    }
    return false;
  },

  switchSort: function(sort) {
    cur.searchSort = sort;
    cur.searchOffset = 0;
    removeClass(geByClass1('apps_section_act', ge('apps_submenu_sort')), 'apps_section_act');

    show('submenu_sort');

    if (sort == 2) {
      addClass(ge('submenu_recommend'), 'apps_section_act');
    } else if (sort) {
      addClass(ge('submenu_popular_week'), 'apps_section_act');
    } else {
      addClass(ge('submenu_popular'), 'apps_section_act');
    }

    this.catalogSearch(cur.searchStr, cur.searchOffset, {callback: function() {
      hide('submenu_sort');
    }});
  },

  updateCatalogBlocks: function(type, str) {
    if (cur.section !== 'catalog') return false;

    toggleClass(cur.sContentWrap, 'apps_scroll_wrap', !type && !str);
    each(['apps_cat_top_rows', 'apps_cat_bottom_rows', 'apps_cat_popular_actions'], function(i, id) {
      toggle(ge(id), !type && !str);
    });
    if (!type && !str) {
      var rowsWrap = geByClass1('apps_cat_rows_wrap', cur.sContentWrap);
      show(geByClass1('apps_scroll_left_wrap', cur.sContentWrap));
      show(geByClass1('apps_scroll_right_wrap', cur.sContentWrap));
      Apps.updateScrollWrapWidth(rowsWrap);
      each(geByClass('apps_cat_rows_wrap', 'apps_wrap'), function(i, v) {
        var _rowsScroll = v.parentNode.parentNode;
        Apps.fadeInApps(v);
        Apps.fadeOutApps(v, 1);
        removeClass(_rowsScroll, 'apps_cat_slided');
        Apps.hideSlider(geByClass1('apps_scroll_left_wrap', _rowsScroll));
        v.parentNode.scrollLeft = 0;
        data(v, 'sleft', 0);
      });
    } else {
      setStyle(cur.sContent, {width: 'auto'});
      hide(geByClass1('apps_scroll_left_wrap', cur.sContentWrap));
      hide(geByClass1('apps_scroll_right_wrap', cur.sContentWrap));
    }
    if (cur.sHeader) {
      cur.sHeader.innerHTML = str ? getLang('apps_search_results') : ((type == 2 || !type) ? getLang('apps_popular_summary') : getLang('apps_popular_games'));
    }
  },

  updateScrollPos: function() {
    if (cur.section !== 'catalog') return false;

    var searchBar = ge('apps_search_wrap'), searchWrap = ge('apps_search_rel');
    if (searchBar && searchWrap && hasClass(searchBar, 'fixed')) {
      scrollToY(getXY(searchWrap)[1] + 1, 0);
    }
  },

  showTypeSwitched: function(type) {
    if (cur.section !== 'catalog') return false;

    var isGenresActive = true;
    each(geByClass('apps_type_link', ge('apps_search_wrap')), function() {
      removeClass(this, 'active');
      if (this.getAttribute('id') == 'apps_type_link' + type) {
        isGenresActive = false;
      }
    });

    if (type < 0) {
      return;
    }

    addClass(isGenresActive ? ge('apps_type_genres') : ge('apps_type_link' + type), 'active');
    if (!type && !cur.searchStr) {
      hide(cur.sShowMore);
    }
    var label = (type < 2 ? getLang('apps_cat_other') : cur.appsGenresData[type] || getLang('apps_cat_other')).replace(/\s+/g, '&nbsp;') + '<span class="apps_genre_arrow"></span>';
    ge('apps_type_genres').innerHTML = label;
    //geByClass1('add_media_head', cur.genresMenu.menuNode).innerHTML = '<nobr>' + label + '</nobr>';

    if (type == 0) {
      Apps.toggleRecentAndFeatured(true);
    }
  },

  switchType: function(type, obj) {
    cur.genrestt.hide();

    cur.searchType = type;
    cur.searchOffset = 0;
    Apps.showTypeSwitched(type);
    if (cur.section == 'catalog') {
      Apps.showSearchCleared();
    }

    Apps.updateSearchInputWidth();

    Apps.catalogSearch(cur.searchStr, cur.searchOffset);
  },

  listOut: function(obj) {
    if (!hasClass(obj, 'app_filter_selected')) {
      obj.className = 'app_filter';
    }
  },

  listOver: function(obj) {
    if (!hasClass(obj, 'app_filter_selected')) {
      obj.className = 'app_filter_over';
    }
  },

  filterByAppType: function(arr, type) {
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (type == t[7]) {
        res.push(t);
      }
    }
    return res;
  },

  filterByAppAdmin: function(arr) {
    if (cur.section == 'manage') {
      return [];
    }
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (parseInt(t[8]) || (cur.adminApps && cur.adminApps[parseInt(t[0])])) {
        res.push(t);
      }
    }
    return res;
  },

  updateFilter: function(type, sort) {
    cur.catalogSection = 'all';
    if (sort !== undefined) {
      var el = ge('app_filter_' + sort);
      if (el) {
        each(geByTag('div', ge('apps_filters')), function(i, e) {
          if (!hasClass(e, 'app_filter_sep')) e.className = 'app_filter';
        });
        el.className = 'app_filter_selected';
      }
      if (cur.searchSort == sort) return;
      cur.searchSort = sort;
    }
    if (type) {
      if (cur.searchType == type) return;
      cur.searchType = type;
    }
    show(ge('apps_search_filter'));
    hide(cur.showRecMore);
    this.searchTimeout = setTimeout((function() {
      cur.searchStr = trim(cur.aSearch.value);
      cur.searchOffset = 0;
      Apps.showSummaryProgress();
      Apps.catalogSearch(cur.searchStr, cur.searchOffset);
    }).bind(this), 10);
  },

  showSettingsRows: function(type) {
    if (cur.silent && !cur.showSettDelayed) {
      cur.showSettDelayed = true;
      cur.onSilentLoad.push(function() {
        Apps.showSettingsRows(type);
      });
      return;
    }
    var list = cur.appsList[cur.curList] || [];
    var summaries = [ge('apps_summary'), ge('app_site_summary'), ge('app_desktop_summary'), ge('app_edit_summary')];
    var contents = [ge('app_rows'), ge('app_site_list'), ge('app_desktop_list'), ge('app_edit_list')];
    var more_buttons = [ge('more_link'), ge('site_more_link'), ge('desktop_more_link'), ge('edit_more_link')];
    var results = [ge('app_rows'), ge('app_site_results'), ge('app_desktop_results'), ge('app_edit_results')];
    var wraps = [null, ge('app_site_wrap'), ge('app_desktop_wrap'), ge('app_edit_wrap')];
    if (type === undefined) {
      cur.shownCounters = [0, 0, 0, 0];
      for (var i in contents) {
        if (contents[i]) contents[i].innerHTML = '';
      }
    }
    toggle(ge('app_actions'), !cur.searchStr);
    toggleClass(ge('apps_summary').parentNode, 'no_results', !list || !list.length);
    if (cur.section == 'manage') {
      toggle(summaries[0], list && list.length);
    }
    if (!list || !list.length) {
      summaries[0].innerHTML = getLang('apps_no_flash_apps');
      var msg;
      if (!cur.appsList['all'] || cur.appsList['all'].length <= cur.deletedCount) {
        msg = getLang('apps_no_apps_default');
      } else {
        msg = getLang('apps_no_apps_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
      }
      show(results[0]);
      cur.aContent.innerHTML = '<div id="no_apps" class="app_msg">'+msg+'</div>';
      hide(cur.showMore);
      for (var i = 1; i <=3; i++) {
        hide(results[i]);
        hide(more_buttons[i]);
      }
    } else {
      var type_from = (type !== undefined) ? type : 0;
      var type_to = (type !== undefined) ? type : 3;
      for (var i = type_to; i >= type_from; i--) {
        var start = cur.shownCounters[i];
        var end = start + cur.settingsPerPage;
        var apps = (i < 3) ? this.filterByAppType(list, i) : this.filterByAppAdmin(list);
        cur.totalCounters[i] = apps.length;
        apps = apps.slice(start, end);
        show(wraps[i]);
        if (!apps.length && (cur.shownCounters[i] < cur.totalCounters[i] || !cur.totalCounters[i])) {
          if (contents[i]) contents[i].innerHTML = '';
          hide(results[i]);
          hide(more_buttons[i]);
          if (!i) {
            for (var j = 1; j <= 2; j++) {
              if (isVisible(results[j])) {
                summaries[0].innerHTML = summaries[j].innerHTML;
                hide(wraps[j]);
                break;
              }
            }
          }
        } else {
          show(results[i]);
          var html = [];
          for (k in apps) {
            var last = (parseInt(k) + start == cur.totalCounters[i] - 1);
            var app = apps[k].slice();
            if (cur.selection) {
              app[3] = app[3].replace(cur.selection.re, cur.selection.val);
            }
            var edit = (i == 3 || cur.section == 'manage');
            html.push(Apps.drawApp(app, last, edit));
            cur.shownCounters[i] += 1;
          }
          var au = ce('div', {innerHTML: html.join('')});
          while (au.firstChild) {
            contents[i].appendChild(au.firstChild);
          }
          if (cur.shownCounters[i] >= cur.totalCounters[i]) {
            hide(more_buttons[i]);
          } else {
            show(more_buttons[i]);
          }
          if (i == 3) continue;
          // update summary of block
          if (summaries[i]) {
            switch (i) {
              case 1:
                summaries[i].innerHTML = getLang('apps_X_sites', cur.totalCounters[i], true);
                break;
              case 2:
                summaries[i].innerHTML = getLang('apps_X_desktop_apps', cur.totalCounters[i], true);
                break;
              case 0:
              default:
                summaries[i].innerHTML = (cur.section == 'manage') ? cur.totalCounters[i] : getLang((cur.searchStr ? 'apps_X_apps_found' : 'apps_X_apps'), cur.totalCounters[i], true);
                break;
            }
          }
        }
      }
    }
  },

  _animDelX: function(aid, opacity, set_active) {
    var el = ge('delete_row' + aid);
    if (!el) return;
    if (set_active !== undefined) {
      el.active = set_active;
    } else if (el.active) {
      return;
    }
    animate(el, {opacity: opacity}, 200);
  },

  rowActive: function(aid, tt) {
    Apps._animDelX(aid, 1, 1);
    if (tt) {
      showTooltip(ge('delete_row' + aid), {text: tt, showdt: 500, black: 1, shift: [13, 4, 8]});
    }
  },
  rowInactive: function(aid) {
    Apps._animDelX(aid, 0.5, 0);
  },
  rowOver: function(aid) {
    Apps._animDelX(aid, 0.5);
  },
  rowOut: function(aid) {
    Apps._animDelX(aid, 0);
  },
  myAppOver: function(aid, el, noSize) {
    if (hasClass(el, 'deleted') || hasClass(el, 'apps_cat_cont_fadded') || !vk.id) {
      return false;
    }
    showTooltip(el, {
      url: '/al_apps.php',
      params: {act: 'show_app_friends_tt', aid: aid, no_size: noSize ? 1 : 0},
      className: 'like_tt apps_tt',
      slide: 15,
      shift: [10, 7, 135 - getSize(el)[1]],
      ajaxdt: 200,
      showdt: 300,
      hidedt: 200
    });
  },
  deleteNot: function(nid, hash, nids) {
    if (cur.deletingNot) return;
    var prefix = (nid[0] == 'i') ? 'invite' : 'notify';
    if (window.tooltips && ge('delete_row' + nid)) {
      tooltips.hide(ge('delete_row' + nid))
    }
    cur.deletingNot = true;
    var params = {act: 'delete_notif', nid: nid, hash: hash};
    if (nids) {
      params['nids'] = nids;
    }
    ajax.post(Apps.address, params, {
      onDone: function(response) {
        if (prefix == 'invite') {
          ge('app_buttons_'+nid).innerHTML = response;
        } else if (prefix == 'notify') {
          var cont = ge('notify_info'+nid);
          hide('notify_hide'+nid);
          cont.innerHTML = response;
        }
        delete cur.deletingNot;
      },
      onFail: function(response) {
        delete cur.deletingNot;
      }
    });
  },

  rejectRequest: function(lnk, rid, hash) {
    var block = ge("apps_request_row_"+rid), y = getSize(geByClass1('apps_request_info_wrap', block))[1];
    cur['req_'+rid+'_back'] = block.innerHTML;
    ajax.post('al_apps.php', {act: 'a_reject_request', rid: rid, hash: hash}, {
      onDone: function(text) {
        block.innerHTML = trim(text);
        var msgBlock = geByClass1('apps_request_removed', block), newY = getSize(msgBlock)[1];
        setStyle(msgBlock, 'padding', Math.max(0, (y - newY) / 2));
      },
      showProgress: function() {
        if (!cur.reqLnkBack) {
          cur.reqLnkBack = lnk.innerHTML;
        }
        lnk.innerHTML = '';
        addClass(lnk, 'loading');
      },
      hideProgress: function() {
        if (cur.reqLnkBack) {
          lnk.innerHTML = cur.reqLnkBack;
        }
        removeClass(lnk, 'loading');
      }
    })
  },

  requestsRestore: function(obj, rid, hash) {
    var b = obj.innerHTML;
    var block = ge("apps_request_row_"+rid);
    ajax.post('al_apps.php', {act: 'a_request_restore', req_id: rid, hash: hash}, {
      onDone: function() {
        if (cur['req_'+rid+'_back']) {
          block.innerHTML = cur['req_'+rid+'_back'];
        }
      },
      showProgress: function() {
        obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
      },
      hideProgress: function() {
        obj.innerHTML = b;
      }
    })
  },

  requestsBanUser: function(obj, mid, hash) {
    var msgBlock = obj.parentNode.parentNode, y = getSize(msgBlock)[1];
    ajax.post('al_apps.php', {act: 'a_request_ban_user', mid: mid, hash: hash}, {
      onDone: function(text) {
        msgBlock.innerHTML = text;
        setStyle(msgBlock, 'padding', 0);
        var newY = getSize(msgBlock)[1];
        setStyle(msgBlock, 'padding', Math.max(0, (y - newY) / 2));
      },
      showProgress: function() {
        lockButton(obj);
      },
      hideProgress: function() {
        unlockButton(obj);
      }
    })
  },
  denyNotifications: function(nid, aid, hash) {
    if (cur.denyingNot) return;
    cur.denyingNot = true;
    ajax.post(Apps.address, {act: 'deny_notifications', aid: aid, hash: hash}, {
      onDone: function(response) {
        ge('notify_info'+nid).innerHTML = response;
        delete cur.denyingNot;
      },
      onFail: function() {
        delete cur.denyingNot;
      }
    });
  },
  recountAddVotes: function(obj) {
    var add_val = obj.value.replace(/[^0-9]/g, '');
    ge('add_votes').innerHTML = langNumeric(add_val, votes_flex);
    if (add_val > 0 && ge('app_pay_withdraw')) {
      ge('app_pay_withdraw').value = 0;
      this.recountWithdrawVotes(ge('app_pay_withdraw'));
    }
  },
  recountWithdrawVotes: function(obj) {
    var withdraw_val = obj.value.replace(/[^0-9]/g, '');
    ge('withdraw_votes').innerHTML = langNumeric(withdraw_val, votes_flex);
    if (withdraw_val > 0) {
      ge('app_pay_add').value = 0;
      this.recountAddVotes(ge('app_pay_add'));
    }
  },
  cancelInstall: function() {
    nav.go('/apps', false);
  },
  hideSMSPhoneChooser: function() {
    tooltips.destroyAll();
  },
  sendInstallRequest: function(runButton, isPush, aid, ref, cid, hash) {
    if (hasClass(runButton, 'button_disabled')) {
      return;
    }

    var buttonSize = getSize(runButton);
    if (isPush) {
      removeClass(runButton, 'apps_btn_with_arrow');
      ajax.post('/al_apps.php', { act: 'send_install_request', aid: aid, ref: ref, cid: cid, hash: hash}, {
        showProgress: lockButton.pbind(runButton),
        hideProgress: function() {
          unlockButton(runButton);
          addClass(runButton, 'button_disabled');
          var sentMessage = getLang('apps_install_push_sent_msg');
          geByClass1('apps_i_btn_bg', runButton).innerHTML = sentMessage;
          setStyle(runButton, 'width', buttonSize[0]);

          var runButtonBox = ge('apps_i_run_box');
          addClass(runButtonBox, 'sent');
          runButtonBox.innerHTML = sentMessage;
          var size = getSize(runButtonBox);
          setStyle(runButtonBox, 'margin-left', -size[0] / 2);
        }
      });
    } else {
      lockButton(runButton);
      removeClass(runButton, 'apps_btn_with_arrow');
      stManager.add(['tooltips.js', 'tooltips.css'], function() {
        runButton.tthide = function() {};

        cur.ref = ref;
        ajax.post('/al_apps.php', {act: 'send_install_request_box', aid: aid}, {
          onDone: function(title, html, js) {
            unlockButton(runButton);
            showTooltip(runButton, {
              content: '<div class="app_sms_tt">' + html + '</div>',
              slide: 15,
              shift: [0, 0, -4],
              className: 'apps_sms_tt',
              hasover: 1,
              nohide: 1,
              center: 1,
              noload: true,
              onShowStart: function() {
                eval('(function() {' + js + '})()');
              }
            });
          }
        });
      });
    }
  },
  showWinInstructions: function(event, downloadLink, helpLink) {
    setTimeout(function() {
      var html = rs(trim(cur.winInstrTpl), {download_link: downloadLink, help_link: helpLink});
      var b = new MessageBox({dark: true, hideButtons: true}).content(html).setOptions({width: 858}).show();
    }, 500);
  },
  runApp: function(obj, domain, hash, sett, ref, mid) {
    if (!vk.id) {
      showDoneBox(cur.pleaseSignInLang);
      return false;
    }
    lockButton(obj);
    var l = clone(nav.objLoc);
    delete l.w;
    nav.setLoc(l);
    window.appsListChanged = 1;
    var url = '/'+domain+'?join=1&hash='+hash+'&sett='+sett;
    if (cur.fromInstallBox) {
      url += '&from_install=' + (cur.fromInstallBox == 1 ? 1 : 2);
    }
    if (ref) {
      if (isObject(ref)) {
        for (var i in ref) {
          if (i != 'w') {
            url += '&' + i + '=' + ref[i];
          }
        }
      } else if (ref != '') {
        url += '&ref='+ref;
      }
    }
    if (mid) {
      url += '&mid='+mid;
    }
    if (nav.objLoc['#']) {
      url += '#'+nav.objLoc['#'];
    }
    nav.go(url);
  },
  approveInstall: function(hash, sett, obj, btn) {
    var loc = extend(nav.objLoc, {
      'join': 1,
      'hash': hash,
      'sett': sett
    });
    if (isChecked('apps_notifications_checkbox') && isVisible('apps_notifications_checkbox')) {
      loc['notify'] = 1;
    }
    if (obj) {
      obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
    }
    if (btn) {
      lockButton(btn);
    }
    window.appsListChanged = 1;
    nav.go(loc, false, {pass: true});
  },
  deleteApp: function(aid, hash, obj) {
    if (cur.appDeleteBtn) return;
    obj.style.cursor = 'default';
    cur.appDeleteBtn = obj.innerHTML;
    obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
    ajax.post('/apps', {act: 'quit', id: aid, hash: (hash || cur.app.options.hash), from: 'app'}, {
      onDone: function(text) {
        cur._back = false;
        nav.go('/apps', false);
      },
      onFail: function(text) {
        obj.innerHTML = cur.appDeleteBtn;
        obj.style.cursor = 'pointer';
        cur.appDeleteBtn = false;
        var errCont = ge('apps_settings_error');
        errCont.innerHTML = text;
        show(errCont);
        scrollToTop(200);
        return true;
      }
    });
  },

  reportApp: function(aid, place_id) {
    showBox('al_reports.php', {act:'report_app_box', app_id: aid, place_id: place_id}, {
      params: {dark: 1},
      stat:['ui_controls.js', 'ui_controls.css']
    });
  },

  loadSettings: function(data) {
    ajax.post('apps', {act: 'show_settings', aid: cur.aid}, extend({cache: 1}, data));
  },

  showSettings: function(obj) {
    if (!cur.settBtnText) {
      cur.settBtnText = obj.innerHTML;
    }
    if (cur.settShown) {
      scrollToTop(200);
      cur.settShown = false;
      delete ajaxCache['/apps#act=show_settings&aid='+cur.aid];
    } else {
      showBox('apps', {act: 'show_settings', aid: cur.aid}, {params: {dark: 1, width: 430}});
    }
  },

  onBigThumbOver: function(isOver) {
    Apps._mouseOnFeatured = isOver;
  },

  onFeaturedClick: function(rowEl) {
    var aid = rowEl.getAttribute('data-aid');

    var selectedRowClass = 'apps_featured_row_selected';
    var selectedThumbClass = 'apps_featured_thumb_selected';

    var currBigRowEl = geByClass1(selectedRowClass);
    removeClass(currBigRowEl, selectedRowClass);
    var nextBigRowEl = ge('featured_app_small_' + aid);
    addClass(nextBigRowEl, selectedRowClass);

    var currBigThumbEl = geByClass1(selectedThumbClass);
    removeClass(currBigThumbEl, selectedThumbClass);
    var nextBigThumbEl = ge('featured_app_' + aid);
    addClass(nextBigThumbEl, selectedThumbClass);

    // scroll
    if (geByClass('apps_featured_row').length > 5) {
      var blockHeight = getSize(geByClass1('apps_featured_small_thumbs_wrap'))[1];
      var featuredRows = geByClass1('apps_featured_small_thumbs_inner');
      var parentTop = getXY(domPN(nextBigRowEl))[1];
      var rowTop = getXY(nextBigRowEl)[1] - parentTop + parseInt(featuredRows.style.top || 0);

      var floor = -(getSize(featuredRows)[1] - blockHeight);

      var newTop = parseInt(featuredRows.style.top || 0) - rowTop + blockHeight / 2 - 20;
      newTop = Math.min(0, newTop);
      newTop = Math.max(newTop, floor);

      setStyle(featuredRows, {
        top: newTop + 'px'
      });

      setStyle(geByClass1('apps_featured_shadow_top'), { opacity: newTop == 0 ? 0 : 1 });
      setStyle(geByClass1('apps_featured_shadow_bottom'), { opacity: newTop == floor ? 0 : 1 });
    }

    Apps.initFeaturedAutoScroll();
  },

  initFeaturedAutoScroll: function() {
    clearInterval(cur.featuredAutoScrollTimer);
    cur.featuredAutoScrollTimer = setInterval(function() {
      if (Apps._mouseOnFeatured) return;

      var currEl = geByClass1('apps_featured_row_selected');
      if (currEl) {
        currEl = currEl.nextSibling;
        currEl = currEl.nodeType == Node.ELEMENT_NODE ? currEl : geByClass1('apps_featured_row');

        Apps.onFeaturedClick(currEl);
      }
    }, 6000);
  },

  hideOldNotify: function(obj) {
    if (cur.oldNotif && cur.oldNotif != obj) {
      if (!cur.oldNotif.tthide && cur.oldNotif.temphide) {
        cur.oldNotif.temphide();
      }
    }
    if (window.tooltips && cur.oldNotif != obj) {
      tooltips.hideAll()
    }
  },

  showNotify: function(obj, aid, text, shift) {
    if (cur.silent) {
      return cur.onSilentLoad.push(Apps.showNotify.pbind(obj, aid, text));
    }
    //if (!cur.notify) return;
    var n = (aid && cur.notify) ? cur.notify[aid] : false;
    if (!n) {
      var app = aid ? cur.apps[aid] : '';
      if (app || text) {
        Apps.hideOldNotify(obj);
        showTooltip(obj, {
          text: text || app[3],
          slide: cur.oldNotif ? 0 : 15,
          shift: [0, shift || -2, shift || 0, 0],
          className: 'apps_name_tt',
          center: true,
          hidedt: 400,
          hasover: false,
          noload: true,
          black: 1
        });
        cur.oldNotif = obj;
      }
      return;
    }
    if (n[4]) {
      var more = '<a class="apps_notify_more" onclick="Apps.switchTab(\'notifications\', event);">'+n[4]+'</a>';
    } else {
      var more = '';
    }
    var text = '<div class="apps_notify_text">'+n[1]+'</div>';
    Apps.hideOldNotify(obj);
    showTooltip(obj, {
      text: '<div class="apps_notify_tt">'+
            '<div class="apps_notify_date fl_r">'+n[3]+'</div>'+
            '<div class="apps_notify_tt_title">'+n[2]+'</div>'+
            text+more+'</div>',
      slide: 15,
      shift: [-7, 2, 0, 24],
      className: 'rich wall_tt',
      hidedt: 400,
      hasover: true,
      noload: true,
      black: 1
    });
    cur.oldNotif = obj;
  },

  showSummaryProgress: function() {
    show(cur.progress);
  },

  hideSummaryProgress: function() {
    hide(cur.progress);
  },

  removeAllNotifies: function(obj, hash) {
    var back = obj.innerHTML;
    obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
    ajax.post('apps', {act: 'a_remove_all_notifies', hash: hash}, {
      onDone: function() {
        nav.reload();
      },
      onFail: function() {
        obj.innerHTML = back;
      }
    });
  },

  getCurrentSlide: function() {
    return geByClass1('apps_i_th_act', ge('apps_i_th_contr'));
  },

  slideLeft: function() {
    var prev = Apps.getCurrentSlide().previousSibling;
    if (prev) {
      Apps.ssChange(prev);
    }
  },

  slideRight: function() {
    var next = Apps.getCurrentSlide().nextSibling;
    if (next) {
      Apps.ssChange(next);
    }
  },

  getScreenshotLayer: function() {
    return geByClass1('apps_i_screenshots');
  },

  getScreenshotControls: function() {
    return geByClass1('apps_slide_controls', Apps.getScreenshotLayer());
  },

  canSlideLeft: function() {
    var c = Apps.getCurrentSlide();
    return c ? !!c.previousSibling : false;
  },
  canSlideRight: function() {
    var c = Apps.getCurrentSlide();
    return c ? !!c.nextSibling : false;
  },

  updateTriggers: function() {
    var left = ge('left', Apps.getScreenshotControls());
    var right = ge('right', Apps.getScreenshotControls());
    Apps.showTrigger(left);
    Apps.showTrigger(right);

    var runButtonEl = ge('apps_i_run_box', Apps.getScreenshotLayer());

    var size = getSize(runButtonEl);
    setStyle(runButtonEl, 'margin-left', -size[0] / 2);

    if (!Apps.canSlideRight()) {
      show(runButtonEl);
    } else {
      hide(runButtonEl);
    }

    var isCurrentPromoVideo = !Apps.canSlideLeft() && cur.promoVideo;
    toggleClass(geByClass1('apps_i_screenshots'), 'apps_current_promo_video', isCurrentPromoVideo);

    if (Apps.canSlideLeft() && cur.promoVideo) {
      //revertLastInlineVideo();
    }
  },

  showTrigger: function(triggerEl, opacity) {
    opacity = opacity || 0.4;
    if((triggerEl.id == 'left' && Apps.canSlideLeft()) ||
      (triggerEl.id == 'right' && Apps.canSlideRight())) {
        if(opacity > triggerEl.style.opacity) {
          animate(triggerEl, {opacity: opacity}, 200);
        }
    } else {
      animate(triggerEl, {opacity: 0.0}, 200);
    }
  },


  initDescription: function(description) {
    var el = geByClass1('app_layer_description');
    el.innerHTML = description;

    var lh = parseInt(getStyle(el, 'line-height'));
    var linesCount = Math.ceil(getSize(el)[1] / lh);

    if (linesCount > 7) {
      setStyle(el, 'height', lh * 5);
      el.innerHTML = description;
      show(geByClass1('app_description_show_more'));
    }
  },

  showFullDescription: function() {
    hide(geByClass1('app_description_show_more'));
    setStyle(geByClass1('app_layer_description'), 'height', '');
  },

  initEvenHandlers: function() {
    if (!Apps.getScreenshotLayer()) {
      return;
    }

    function ensureImagesAreLoaded() {
      var imgs = geByClass('apps_i_th_cont');
      var loaded = 0;
      for(var i = 0; i < imgs.length; i++) {
        var img = new Image();

        img.onload = function () {
          loaded++;
          if(loaded >= imgs.length) {
            cur.appSsScrollbar = new Scrollbar('apps_i_th_contr', {prefix: 'app_', horizontal: true});
          }
        };
        img.src = imgs[i].childNodes[0].src;
      }
    }

    ensureImagesAreLoaded();

    cur.installPage = true;

    var controlsEl = Apps.getScreenshotControls();
    var onTrigger = false, onArea = false, onArrow = false;

    function showControls() {
      animate(controlsEl, {opacity: 1.0}, 200);
    }

    function hideControls() {
      animate(controlsEl, {opacity: 0.0}, 200);
    }

    function onTriggerOut(triggerEl) {
      if((triggerEl.id == 'left' && Apps.canSlideLeft()) ||
        (triggerEl.id == 'right' && Apps.canSlideRight())) {
          animate(triggerEl, {opacity: 0.4}, 200);
      }
    }

    var matches = function(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    addEvent(controlsEl, 'click', function(event) {
      if (event.target == controlsEl && onArea) {
        Apps.slideRight();
      }
      Apps.updateTriggers();
    });
    addEvent(controlsEl, 'mouseover', function(event) {
      if (event.target == controlsEl) {
        showControls();
        onArea = true;
      } else if( matches(event.target, '.apps_slide_trigger') ) {
        onTrigger = true;
        showControls();
        Apps.showTrigger(event.target, 1.0);
      } else if( matches(event.target, '.apps_slide_trigger_arrow') ) {
        onArrow = true;
      }
    });
    addEvent(controlsEl, 'mouseout', function(event) {
      if(event.target == controlsEl) {
        setTimeout(function() {
          if(!onTrigger) {
            hideControls();
          }
        });

        onArea = false;
      } else if( matches(event.target, '.apps_slide_trigger') ) {
        setTimeout(function() {
          if(onArrow) return;

          onTrigger = false;
          onTriggerOut(event.target);

          setTimeout(function() {
            if(!onArea) {
              hideControls();
            }
          });

        });
      }else if( matches(event.target, '.apps_slide_trigger_arrow') ) {
        onArrow = false;
      }

    });

    Apps.updateTriggers();
  },

  ssChange: function(obj) {
    var old = Apps.getCurrentSlide();
    if (!obj) {
      obj = old.nextSibling;
      if (!obj) {
        obj = ge('apps_i_th_contr').firstChild;
      }
    }
    if (old) {
      removeClass(old, 'apps_i_th_act');
    }
    var num = intval(obj.getAttribute('rel'));
    addClass(obj, 'apps_i_th_act');
    animate(ge('apps_i_slider'), {
      scrollLeft: num * 607
    }, 300);

    Apps.updateTriggers();
  },

  showAllNotifies: function(obj) {
    hide(obj);
    show(obj.nextSibling);
    return false;
  },

  ttScore: function(obj, name, info) {
    var showsp = 200;
    if (cur.ttScoreShown && window.tooltips) {
      tooltips.hideAll();
      showsp = 0;
    }
    return showTooltip(obj, {
      center: 1,
      black: 1,
      showsp: showsp,
      shift: [0, 2, 10],
      text: '<div class="apps_score_tt_cont"><b>'+name+'</b>'+(info ? '<div class="apps_score_tt">'+info+'</div>' : '')+'</div>'
    });
  },

  showMoreRecent: function(obj) {
    if (!cur.recentBack) {
      cur.recentBack = obj.innerHTML;
    }
    var feedLen = cur.feedHideEls.length;
    each(geByClass('apps_recent_row_hidden', ge('apps_recent_list')), function(i, el) { re(el); });

    ajax.post('al_apps.php', {act: 'more_recent', offset: cur.recentOffset, 'feed_offset': cur.feedOffset, 'feed_hidden': feedLen}, {
      onDone: function(recent, feed, newOffset, feedOffset, showMore) {
        cur.recentOffset = newOffset;
        cur.feedOffset = feedOffset;
        var feedCont = ge('apps_feed_list');
        ge('apps_recent_list').appendChild(cf(recent));
        var nextEl;
        while (nextEl = cur.feedHideEls.pop()) {
          feedCont.appendChild(nextEl);
        }
        feedCont.appendChild(cf(feed));
        if (!showMore) {
          hide('app_recent_more');
        }
      },
      showProgress: function() {
        obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
      },
      hideProgress: function() {
        obj.innerHTML = cur.recentBack;
      }
    });
  },

  catalogCellW: 140,
  catalogFirstOffset: 9,
  initCat: function() {
    each(geByClass('apps_cat_rows_wrap', 'apps_wrap'), function(i, v) {
      if (!hasClass(v.parentNode.parentNode, 'apps_scroll_wrap')) return;

      Apps.updateScrollWrapWidth(v);
      setTimeout(function() {
        Apps.fadeOutApps(v, 1);
      }, 0);
      v.parentNode.scrollLeft = 0;
    });

    if (cur.appsImagesLoader) {
      cur.appsImagesLoader.destroy();
    }
    cur.appsImagesLoader = imagesLoader(ge('apps_wrap'), {skip_process_load: true, use_iframe: true});
    cur.destroy.push(cur.appsImagesLoader.destroy);
  },
  hideSlider: function(el) {
    if (el && getStyle(el, 'opacity') == '1') {
      animate(el, {opacity: 0}, 150);
    }
  },
  showSlider: function(el) {
    if (el && getStyle(el, 'opacity') == '0') {
      animate(el, {opacity: 1}, 150);
    }
  },
  updateScrollWrapWidth: function(rowsWrap) {
    var cCount = geByClass('apps_cat_row', rowsWrap).length;
    if (rowsWrap.id == 'apps_new_rows_wrap' && ge('apps_new_hidden')) {
      cCount -= geByClass('apps_cat_row', 'apps_new_hidden').length;
    }
    setStyle(rowsWrap, 'width', cCount * Apps.catalogCellW + 40);
    if (cCount <= 4) {
      Apps.hideSlider(geByClass1('apps_scroll_right_wrap', rowsWrap.parentNode.parentNode));
    }
  },
  fadeOutApps: function(rowsWrap, direction) {
    var rowsScroll = rowsWrap.parentNode,
        rowsL = rowsScroll.scrollLeft,
        apps = geByClass('apps_cat_row', rowsScroll);
    for (num in apps) {
      var offsetL = apps[num].offsetLeft - rowsWrap.offsetLeft;
      if (direction >= 0 && offsetL > rowsL + Apps.catalogCellW * 4 - 50 && offsetL < rowsL + Apps.catalogCellW * 5 - 50 ||
          direction <= 0 && rowsL > 60 && offsetL > rowsL - Apps.catalogCellW - 50 && offsetL < rowsL - 50) {
        addClass(apps[num], 'apps_cat_cont_fadded');
      }
    }
  },
  fadeInApps: function(rowsWrap) {
    var rowsScroll = rowsWrap.parentNode;
    each(geByClass('apps_cat_cont_fadded', rowsScroll), function(i, el) {
      removeClass(el, 'apps_cat_cont_fadded');
    });
  },
  getCatalogWraps: function(type, extra) {
    var rowsWrap, rowsScroll;
    switch (type) {
      case 'new':
        rowsWrap = ge('apps_new_rows_wrap');
        rowsScroll = ge('apps_new_rows_scroll');
        break;
      case 'popular':
        rowsWrap = ge('app_search_list');
        rowsScroll = ge('app_search_scroll');
        break;
      case 'ads':
        rowsWrap = ge('apps_ads_rows_wrap');
        rowsScroll = ge('apps_ads_rows_scroll');
        break;
      case 'friends':
        rowsWrap = ge('apps_friends_rows_wrap');
        rowsScroll = ge('apps_friends_rows_scroll');
        break;
      case 'genre':
        rowsWrap = ge('apps_genre' + extra + '_rows_wrap');
        rowsScroll = ge('apps_genre' + extra + '_rows_scroll');
        break;
      case 'collection':
        rowsWrap = ge('apps_collection' + extra + '_rows_wrap');
        rowsScroll = ge('apps_collection' + extra + '_rows_scroll');
        break;
      case 'grossing':
        rowsWrap = ge('apps_grossing_rows_wrap');
        rowsScroll = ge('apps_grossing_rows_scroll');
        break;
    }
    return [rowsWrap, rowsScroll];
  },
  slideAppsCatalog: function(type, direction, extra) {
    if (cur.sliding) {
      return false;
    }
    cur.sliding = true;
    var wraps = Apps.getCatalogWraps(type, extra),
        rowsWrap = wraps[0], rowsScroll = wraps[1], callback;
    switch (type) {
      case 'new':
        callback = Apps.showMoreNew;
        break;
      case 'popular':
        callback = Apps.loadRows;
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
      case 'ads':
        callback = function() {
          data(rowsWrap, 'loaded', 1);
        };
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
      case 'friends':
        callback = function() {
          data(rowsWrap, 'loaded', 1);
        };
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
      case 'genre':
        callback = function() {
            data(rowsWrap, 'loaded', 1);
        };
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
      case 'collection':
        callback = function() {
          data(rowsWrap, 'loaded', 1);
        };
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
      case 'grossing':
        callback = Apps.showMoreGrossing;
        Apps.updateScrollWrapWidth(rowsWrap);
        break;
    }
    if (!rowsWrap) {
      return false;
    }

    var rowsW = getSize(rowsWrap)[0],
        rowsL = rowsScroll.scrollLeft,
        rowsLO = data(rowsWrap, 'sleft')
        firstSlide = false;
    direction = (direction > 0) ? 1 : -1;
    if (rowsLO === undefined) rowsLO = rowsL;

    if (direction > 0 && rowsL >= rowsW - Apps.catalogCellW * 9 && !data(rowsWrap, 'loaded')) {
      callback();
      rowsW = getSize(rowsWrap)[0];
    }

    var rowsWO = rowsW - rowsW % Apps.catalogCellW - Apps.catalogFirstOffset;
    var newLeft = Math.min(rowsL + direction * Apps.catalogCellW * 4, rowsWO - Apps.catalogCellW * 4);
    if (rowsLO == 0 && direction < 0 || rowsLO + Apps.catalogCellW * 4 >= rowsWO && direction > 0) {
      return false;
    }
    if (rowsLO == 0) {
      if (geByClass('apps_cat_row', rowsScroll).length > 5) {
        rowsLO -= Apps.catalogFirstOffset;
      }
      addClass(rowsScroll.parentNode, 'apps_cat_slided');
      firstSlide = true;
    }
    rowsLO = Math.max(0, newLeft + (rowsLO - rowsL));
    newLeft = Math.max(0, newLeft);
    if (newLeft > 0) {
      Apps.showSlider(geByClass1('apps_scroll_left_wrap', rowsScroll.parentNode));
    } else {
      Apps.hideSlider(geByClass1('apps_scroll_left_wrap', rowsScroll.parentNode));
      removeClass(rowsScroll.parentNode, 'apps_cat_slided');
      removeClass(rowsScroll.parentNode, 'apps_cat_shifted_left');
      removeClass(rowsScroll.parentNode, 'apps_cat_shifted_right');
    }
    if (data(rowsWrap, 'loaded')) {
      if (newLeft + Apps.catalogCellW * 4 >= rowsWO) {
        Apps.hideSlider(geByClass1('apps_scroll_right_wrap', rowsScroll.parentNode));
        removeClass(rowsScroll.parentNode, 'apps_cat_shifted_left');
        removeClass(rowsScroll.parentNode, 'apps_cat_shifted_right');
        rowsLO = newLeft;
      } else {
        Apps.showSlider(geByClass1('apps_scroll_right_wrap', rowsScroll.parentNode));
      }
    }
    data(rowsWrap, 'sleft', rowsLO);
    Apps.fadeInApps(rowsWrap);

    animate(rowsScroll, {scrollLeft: newLeft}, {duration: 500, transition: Fx.Transitions.swiftOut, onComplete: function() {
      delete cur.sliding;
    }});
    setTimeout(function() {
      Apps.fadeOutApps(rowsWrap, 0);
    }, 400);

    if (!firstSlide || !cur.appsImagesLoader) return;
    each(geByClass('__need_lazy_load', rowsWrap), function(i, v) {
      removeClass(v, '__need_lazy_load');
      addClass(v, '__need_load');
    });
    cur.appsImagesLoader.processLoad();
  },
  shiftAppsCatalog: function(type, direction, extra) {
    if (!cur.shiftTO) cur.shiftTO = {};
    if (cur.shiftTO[type]) {
      clearTimeout(cur.shiftTO[type]);
      cur.shiftTO[type] = false;
    }
    cur.shiftTO[type] = setTimeout(function() {
      cur.shiftTO[type] = false;

      var wraps = Apps.getCatalogWraps(type, extra),
          rowsWrap = wraps[0],
          rowsScroll = wraps[1],
          rowsW = getSize(rowsWrap)[0],
          rowsL = rowsScroll.scrollLeft,
          rowsLO = data(rowsWrap, 'sleft'),
          rowsAnim = data(rowsWrap, 'anim');

      if (!direction) {
        if (rowsLO === undefined || rowsLO == rowsL) {
          if (rowsAnim) {
            rowsAnim.stop();
            data(rowsWrap, 'anim', false);
            removeClass(rowsScroll.parentNode, 'apps_cat_shifted_left');
            removeClass(rowsScroll.parentNode, 'apps_cat_shifted_right');
          }
          return false;
        }
        var newLeft = rowsLO;
      } else {
        if (rowsLO === undefined) {
          data(rowsWrap, 'sleft', rowsL);
          rowsLO = rowsL;
        }
        var newLeft = rowsLO + direction * (29 - (rowsLO == 0 ? Apps.catalogFirstOffset : 0));
        if (newLeft < 0 || direction > 0 && newLeft + Apps.catalogCellW * 4 >= rowsW - rowsW % Apps.catalogCellW) {
          return false;
        }
      }

      if (rowsAnim) {
        rowsAnim.stop();
      }
      var anim = animate(rowsScroll, {scrollLeft: newLeft}, {duration: 250, onComplete: function() {
        data(rowsWrap, 'anim', false);
        delete cur.sliding;
      }});
      data(rowsWrap, 'anim', anim);
      if (direction) {
        if (direction > 0) {
          addClass(rowsScroll.parentNode, 'apps_cat_shifted_right');
        } else {
          addClass(rowsScroll.parentNode, 'apps_cat_shifted_left');
        }
      } else {
        removeClass(rowsScroll.parentNode, 'apps_cat_shifted_left');
        removeClass(rowsScroll.parentNode, 'apps_cat_shifted_right');
      }
    }, 10);
  },

  showMoreNew: function(obj) {
    if (obj && !cur.blockBack) {
      cur.blockBack = obj.innerHTML;
    }
    if (cur.loadingNew) {
      return false;
    }
    var rowsWrap = ge('apps_new_rows_wrap');
    if (!cur.shownNew) {
      cur.shownNew = 1;
      if (ge('apps_new_hidden')) {
        rowsWrap.appendChild(cf(ge('apps_new_hidden').innerHTML));
        var loaded = data(ge('apps_new_hidden'), 'loaded');
        re('apps_new_hidden');
        Apps.updateScrollWrapWidth(rowsWrap);
        if (loaded) {
          data(rowsWrap, 'loaded', 1);
          return;
        }
      }
    }
    cur.loadingNew = 1;
    var onMoreLoaded = function(rows, newOffset, newCount) {
      rowsWrap.appendChild(cf(rows));
      Apps.updateScrollWrapWidth(rowsWrap);
      if (newOffset == cur.newOffset) {
        return false;
      }
      cur.newOffset = newOffset;
      cur.loadingNew = 0;
      if (newOffset >= newCount) {
        if (obj) {
          hide(obj);
        }
        data(rowsWrap, 'loaded', 1);
      }
      cur.morePreloaded = -1;
      ajax.post('al_apps.php', {act: 'more_new', offset: cur.newOffset}, {
        onDone: function(rows, newOffset, newCount) {
          if (cur.morePreloaded == -2) {
            onMoreLoaded(rows, newOffset, newCount);
          } else {
            cur.morePreloaded = [rows, newOffset, newCount];
          }
        },
        onFail: function() {
          cur.morePreloaded = false;
          return true;
        }
      });
    };

    if (cur.morePreloaded) {
      if (cur.morePreloaded == -1 || cur.morePreloaded == -2) {
        cur.morePreloaded = -2;
      } else {
        onMoreLoaded.apply(onMoreLoaded, cur.morePreloaded);
      }
      return;
    }

    ajax.post('al_apps.php', {act: 'more_new', offset: cur.newOffset}, {
      onDone: onMoreLoaded,
      showProgress: function() {
        if (obj) {
          obj.innerHTML = '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>';
        }
      },
      hideProgress: function() {
        if (obj) {
          obj.innerHTML = cur.blockBack;
        }
      },
      onFail: function() {
        cur.loadingNew = 0;
      }
    });
  },

  showMoreGrossing: function() {
    if (cur.loadingGrossing) {
      return false;
    }
    var rowsWrap = ge('apps_grossing_rows_wrap'),
        rowsPreload = ge('apps_grossing_preload');

    if (rowsWrap && data(rowsWrap, 'loaded')) {
      return false;
    }

    if (rowsPreload) {
      rowsWrap.appendChild(cf(rowsPreload.innerHTML));
      Apps.updateScrollWrapWidth(rowsWrap);
    }
    cur.loadingGrossing = 1;
    ajax.post('al_apps.php', {act: 'grossing', offset: cur.grossOffset, catalog_search: 1}, {
      onDone: function(rows, preload, opts) {
        if (rows) {
          rowsWrap.innerHTML = rows;
        }
        if (preload) {
          rowsPreload.innerHTML = preload;
        }
        if (opts.searchOffset == cur.grossOffset) {
          return false;
        }
        cur.grossOffset = opts.searchOffset;
        if (opts.searchOffset >= opts.searchCount) {
          data(rowsWrap, 'loaded', 1);
          rowsWrap.appendChild(cf(rowsPreload.innerHTML));
          Apps.updateScrollWrapWidth(rowsWrap);
        }
      },
      hideProgress: function() {
        cur.loadingGrossing = 0;
      }
    });
  },

  showMoreRequests: function(el) {
    var more = ge('apps_requests_more');
    while (more && more.firstChild) {
      more.parentNode.insertBefore(more.firstChild, more);
    }
    re(more);
    hide(el);
    return false;
  },

  updateOnline: function() {
    ajax.post('al_apps.php', {act: 'update_online', aid: cur.aid, hash: cur.app.options.hash}, {ads: 1});
  },

  updateOffline: function(c) {
    ajax.post('al_apps.php', {act: 'update_offline', aid: (c || cur).aid, hash: (c || cur).app.options.hash});
  },

  editBlacklist: function () {
    showBox('al_apps.php', {act: 'blacklist_box', height: lastWindowHeight}, {stat: ['privacy.css', 'indexer.js'], params: {dark: 1}});
    return false;
  },

  blacklistInit: function(box, owners, options) {
    options = options || {};

    var scrollNode = geByClass1('apps_blacklist_wrap', box.bodyNode);
    var contNode = geByClass1('apps_blacklist', box.bodyNode);
    var moreEl = geByClass1('olist_more', box.bodyNode, 'a');
    var unbanned = {};
    var indexer = new vkIndexer(owners, function(owner) {
      return owner[1];
    });

    box.setOptions({width: '407px', bodyStyle: 'padding: 0px'});
    box.removeButtons();
    box.addButton(getLang('global_close'), function () {
      box.hide(200);
    }, 'yes');
    contNode.parentNode.style.height = options.boxHeight+'px';

    var filter = geByClass1('olist_filter', box.bodyNode);
    placeholderSetup(filter, {back: 1});
    if (!options.nofocus) {
      setTimeout(elfocus.pbind(filter), 100);
    }

    if (moreEl) {
      if (!isVisible(moreEl)) {
        re(moreEl);
        show(moreEl);
      } else {
        moreEl.onclick = function (event) {
          renderList('', 60);
          return cancelEvent(event);
        }
      }
    }

    addEvent(filter, 'keyup', function (e) {
      renderList(clean(val(this)));
    });
    addEvent(contNode, 'click mouseover mouseout', onMouseEvent);
    addEvent(scrollNode, 'scroll', onScroll);

    function onScroll() {
      if (!moreEl || !moreEl.offsetTop || !moreEl.onclick) {
        return;
      }
      var y = moreEl.offsetTop,
          sh = contNode.scrollHeight,
          st = contNode.scrollTop,
          h = contNode.offsetHeight || contNode.clientHeight;

      if (st + h + 100 >= y) {
        moreEl.onclick();
      }
    }
    function onMouseEvent(event) {
      var target = event.originalTarget || event.target;
      while (target && target != bodyNode && (!target.className || target.className.indexOf('olist_item_wrap') == -1)) {
        target = target.parentNode;
      }
      if (!target || target == bodyNode) return;
      if (hasClass(target, 'olist_item_loading')) {
        return cancelEvent(event);
      }
      if (event.type == 'mouseover' || event.type == 'mouseout') {
        if (!hasClass(target, 'olist_item_wrap_on'))
          target.className = 'olist_item_wrap' + (event.type == 'mouseover' ? '_over' : '');
      } else {
        if (checkEvent(event)) return true;
        box.changed = true;
        var id = target.id.match(/-?\d+/)[0];
        var checked = unbanned[id];
        var hash = false;
        each (owners, function () {
          if (this[0] == id) {
            hash = this[4];
            return false;
          }
        });
        ajax.post('/al_apps.php', {act: 'a_blacklist_delete', cancel: checked, owner_id: id, hash: hash}, {
          onDone: function () {
            target.className = !checked ? 'olist_item_wrap_on' : 'olist_item_wrap_over';
            unbanned[id] = !checked;
          },
          showProgress: function () {
            addClass(target, 'olist_item_loading');
          },
          hideProgress: function () {
            removeClass(target, 'olist_item_loading');
          }
        });

        if (contNode.scrollTop < 50) {
          setTimeout(function () {
            elfocus(filter);
            if (val(filter).length) {
              filter.select();
            }
          }, 100);
        }

        return cancelEvent(event);
      }
    }
    function renderList(pattern, offset) {
      offset = offset || 0;
      var slice, tpl,
          limit = offset ? 60 : 120

      if (pattern) {
        pattern = pattern.replace(/\u2013|\u2014/g, '-');
      }
      slice = pattern ? indexer.search(pattern) : owners;
      tpl = options.tpl;

      var total = slice.length;
      slice = slice.slice(offset, offset + limit);
      var html = [];
      if (pattern) {
        var term = escapeRE(pattern), termRus = parseLatin(pattern);
        if (termRus != null) {
          term = term + '|' + escapeRE(termRus);
        }
        var regexp = new RegExp('(?![^&;]+;)(?!<[^<>]*)((\\(*)(' + term + '))(?![^<>]*>)(?![^&;]+;)', 'gi');
      }
      var rsTpl = function(obj, pattern, unbanned, regexp) {
        var checked = unbanned[obj[0]];
        var label = obj[1];
        if (pattern) {
          label = pattern.indexOf(' ') == -1 ? label.split(' ') : [label];
          var tmp = '';
          for (var i in label) {
            tmp += (i > 0 ? ' ' : '') + label[i].replace(regexp, '$2<em>$3</em>');
          }
          label = tmp;
        }
        return {
          id: obj[0],
          name: label,
          photo: obj[2],
          link: obj[3] || (obj[0] > 0 ? ('id' + obj[0]) : ('app' + (-obj[0] + 1000000000)))
        };
      }
      each (slice, function () {
        html.push(rs(tpl, rsTpl(this, pattern, unbanned, regexp)));
      });
      if (!offset && !html.length) {
        html.push('<div class="olist_empty">' + (pattern ? getLang('global_search_not_found').replace('{search}', clean(pattern)) : options.lang['apps_blacklist_empty']) + '</div>');
      }
      re(moreEl);
      html = html.join(' ');

      if (!offset) {
        val(contNode, html);
      } else {
        contNode.appendChild(cf(html));
      }
      if (total > offset + limit) {
        contNode.appendChild(moreEl);
        moreEl.onclick = function (event) {
          renderList(pattern, offset + limit);
          return cancelEvent(event);
        }
      }
      if (box && box.scroll) {
        box.scroll.update(false, true);
      }
    }
  },
  rateOver: function(el) {
    if (!cur.rated && !hasClass(el, 'not_installed')) {
      addClass(el, 'over');
    }
    var stars = '', lines = [], cnt = 0,
        text = cur.appUser ? (cur.userRate ? getLang('apps_you_voted') : getLang('apps_you_not_voted')) : getLang('apps_rating_title'),
        label = rs(cur.rateStatsLabelTpl, {label: text});
    for (var i in (cur.rateStats || {})) {
      cnt += intval(cur.rateStats[i]);
    }
    if (ge('app_rate_label')) {
      ge('app_rate_label').innerHTML = text;
    }
    for (var k = 1; k <= 5; k++) {
      stars += '<span class="app_rate stats fl_r"></span>';
      var rateCnt = intval(cur.rateStats[k]),
          percent = (cnt ? intval(100 * rateCnt / cnt) : 0),
          rateCntText = langNumeric(rateCnt, '%s', true),
          classname = (cur.userRate == 10 * k || !cur.userRate) ? 'my' : '';
      lines.push(rs(cur.rateStatsRowTpl, {
        id: 'apps_rate_row' + k,
        stars: stars,
        count: rateCntText,
        percent: percent,
        classname: classname
      }));
      var row = ge('apps_rate_row' + k);
      if (row) {
        setStyle(geByClass1('app_rate_bg', row), {width: percent + '%'});
        geByClass1('app_rate_percent', row).innerHTML = percent + '%';
        geByClass1('app_rate_cnt', row).innerHTML = rateCntText;
        geByClass1('app_rate_stars', row).className = 'app_rate_stars fl_l ' + classname;
      }
    }
    label += lines.reverse().join('');

    showTooltip(el, {
      text: '<div class="tail_wrap"><div class="tail"></div></div><div class="hint_wrap">' + label + '</div>',
      slideX: (vk.rtl ? -15 : 15),
      className: 'app_rate_tt',
      shift: [(cur.installPage ? -70 : -61), 0, -36],
      forcetodown: true,
      hasover: 1
    });
  },
  rateOut: function(el) {
    Apps.showRate();
    removeClass(el, 'over');
  },
  rateApp: function(rate) {
    if (cur.rated) return false;
    var el = ge('apps_ratings');
    cur.appRate = cur.userRate = rate;
    Apps.rateOut(el);
    cur.rated = true;
    ajax.post('/al_apps.php', {act: 'rate_app', aid: cur.aid, rate: rate, hash: cur.rate_hash}, {
      onDone: function(rateStats) {
        cur.rateStats = rateStats;
        Apps.rateOver(el);
      }
    });
  },
  showRate: function(over) {
    if (cur.rated) return false;
    var val = intval(cur.appRate || 0),
        stars = geByClass('app_rate', ge('apps_ratings')),
        floor_rate = Math.floor((val + 2) / 10),
        ceil_rate = Math.floor((val + 2) / 5) - floor_rate;
    for (var i in stars) {
      var cl = 'app_rate fl_l ' + (i < floor_rate ? 'full' : (i < ceil_rate ? 'half' : 'empty'));
      stars[i].className = cl;
    }
    if (over) {
      var over_cnt = Math.floor(over / 10);
      for (var i in stars) {
        if (i >= over_cnt) break;
        stars[i].className += ' over';
      }
    }
  },
  incomingCall: function(html) {
    stManager.add(['notifier.js', 'notifier.css', 'apps.css', 'call.css'], function() {
      var wrap = se('<div><div class="call_apps_wrap clear_fix">'+html+'</div></div>');
      var cont = geByClass1('call_invitation_wrap', wrap, 'div');
      var opts = {
        movable: cont,
        startLeft: parseInt((window.innerWidth - 224) / 2) + 'px',
        startTop: parseInt((window.innerHeight - 404) / 2) + 'px',
        startWidth: 224,
        startHeight: 404,
        resize: false,
        onBeforeHide: function() {
        },
        onDragEnd: function (y, x) {},
        onResize: function (h, w) {}
      }
      if (Apps.appCall) {
        Apps.appCall.close();
      }
      Apps.appCall = new RBox(wrap, opts);
    });

    Notifier.setRecvClbk('apps_call_hide', function() {
      if (Apps.appCall) {
        Apps.appCall.close();
        Apps.appCall = false;
      }
    });
  },
  callApprove: function(loc) {
    Notifier.lcSend('apps_call_hide', new Date().getTime())
    if (Apps.appCall) {
      Apps.appCall.close();
      Apps.appCall = false;
    }
    nav.go(loc)
  },
  callReject: function() {
    Notifier.lcSend('apps_call_hide', new Date().getTime())
    Apps.callOnReject();
  },
  callOnReject: function() {
    if (Apps.appCall) {
      Apps.appCall.close();
      Apps.appCall = false;
    }
    ajax.post('/al_apps.php', {act: 'do_call_reject'}, {
      onDone: function() {}
    });
  }
};

try{stManager.done('apps.js');}catch(e){}
