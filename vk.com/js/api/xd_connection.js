(function(w) {
  if (w.fastXDM) return;

  var handlers  = {};
  var onEnvLoad = [];
  var env       = {};

  // Key generation
  function genKey() {
    var key = '';
    for (var i = 0; i < 5; i++) {
      key += Math.ceil(Math.random() * 15).toString(16);
    }
    return key;
  }

  function waitFor(obj, prop, func, self,  count) {
    if (obj[prop]) {
      func.apply(self);
    } else {
      count = count || 0;
      if (count < 1000) {
        setTimeout(function() {
          waitFor(obj, prop, func, self, count + 1);
        }, 0);
      }
    }
  }

  function attachScript(url) {
    setTimeout(function() {
      var newScript  = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.src  = url || w.fastXDM.helperUrl;
      waitFor(document, 'body', function() {
        document.getElementsByTagName('HEAD')[0].appendChild(newScript);
      });
    }, 0);
  }

  function walkVar(value, clean) {
    var newValue;

    switch (typeof value) {
      case 'string':
        if (clean) {
          newValue = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        } else {
          newValue = value.replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        }
        break;
      case 'object':
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          newValue = [];
          for (var i = 0, len = value.length; i < len; i++) {
            newValue[i] = walkVar(value[i], clean);
          }
        } else {
          newValue = {};
          for (var k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              newValue[k] = walkVar(value[k], clean);
            }
          }
        }
        break;
      default:
        newValue = value;
        break;
    }

    return newValue;
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

    for (var i = 0, len = onEnvLoad.length; i < len; i++) {
      onEnvLoad[i][1].apply(onEnvLoad[i][0], [env]);
    }
  }

  function applyMethod(strData, self) {
    getEnv(function(env) {
      var data = env.json.parse(strData);
      if (data[0]) {
        if (!data[1]) data[1] = [];

        for (var i = 0, len = data[1].length; i < len; i++) {
          if (data[1][i] && data[1][i]._func) {
            var funcNum = data[1][i]._func;
            data[1][i] = function() {
              var args = Array.prototype.slice.call(arguments);
              args.unshift('_func' + funcNum);
              self.callMethod.apply(self, args);
            }
          } else if (self.options.safe) {
            data[1][i] = walkVar(data[1][i], true);
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

  function extend(obj1, obj2) {
    for (var i in obj2) {
      if (obj1[i] && typeof(obj1[i]) === 'object') {
        extend(obj1[i], obj2[i])
      } else {
        obj1[i] = obj2[i];
      }
    }
  }

  // XDM object
  w.fastXDM = {
    _id: 0,
    helperUrl: 'https://vk.com/js/api/xdmHelper.js',

    Server: function(methods, filter, options) {
      this.methods   = methods || {};
      this.filter    = filter;
      this.options   = options || {};
      this.id        = w.fastXDM._id++;
      this.key       = genKey();
      this.frameName = 'fXD' + this.key;
      this.server    = true;

      this.methods['%init%'] = this.methods.__fxdm_i = function() {
        w.fastXDM.run(this.id);
        if (this.methods.onInit) {
          this.methods.onInit();
        }
      };

      handlers[this.key] = [applyMethod, this];
    },

    Client: function(methods, options) {
      this.methods = methods || {};
      this.options = options || {};
      this.id      = w.fastXDM._id++;
      this.client  = true;

      w.fastXDM.run(this.id);

      if (window.name.indexOf('fXD') === 0) {
        this.key = window.name.substr(3);
      } else {
        throw Error('Wrong window.name property.');
      }

      this.caller = window.parent;

      handlers[this.key] = [applyMethod, this];

      w.fastXDM.on('helper', function() {
        w.fastXDM.onClientStart(this);
      }, this);

      getEnv(function(env) {
        env.send(this, env.json.stringify(['%init%']));

        var methods = this.methods;
        setTimeout(function() {
          if (methods.onInit) {
            methods.onInit();
          }
        }, 0);
      }, this);
    },

    onMessage: function(e) {
      var data = e.data;
      if (!data) {
        return false;
      }
      if (typeof data !== 'string' && !(data instanceof String)) {
        return false;
      }

      var key = data.substr(0, 5);
      if (handlers[key]) {
        var self = handlers[key][1];
        if (self && (!self.filter || self.filter(e.origin))) {
          handlers[key][0](data.substr(6), self);
        }
      }
    },

    setJSON: function(json) {
      env.json = json;
    },

    getJSON: function(callback) {
      if (!callback) {
        return env.json;
      }

      getEnv(function(env) {
        callback(env.json);
      });
    },

    setEnv: function(exEnv) {
      for (var i in exEnv) {
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
      var len = (this._q[key] || []).length;
      for (var i = 0; i < len; i++) {
        this._q[key][i][0].apply(this._q[key][i][1]);
      }

      this._q[key] = -1;
    },

    waitFor: waitFor
  }

  w.fastXDM.Server.prototype.start = function(obj, count) {
    if (obj.contentWindow) {
      this.caller = obj.contentWindow;
      this.frame  = obj;

      w.fastXDM.on('helper', function() {
        w.fastXDM.onServerStart(this);
      }, this);
    } else { // Opera old versions
      var self = this;
      count = count || 0;
      if (count < 50) {
        setTimeout(function() {
          self.start.apply(self, [obj, count + 1]);
        }, 100);
      }
    }
  }

  w.fastXDM.Server.prototype.destroy = function() {
    delete handlers[this.key];
  }

  w.fastXDM.Server.prototype.append = function(obj, options, attrs) {
    var div       = document.createElement('DIV');
    div.innerHTML = '<iframe name="' + this.frameName + '" ' + (attrs || '') + '></iframe>';
    var frame     = div.firstChild;
    var self      = this;

    setTimeout(function() {
      frame.frameBorder = '0';
      if (options) extend(frame, options);
      obj.insertBefore(frame, obj.firstChild);
      self.start(frame);
    }, 0);

    return frame;
  }

  w.fastXDM.Client.prototype.callMethod = w.fastXDM.Server.prototype.callMethod = function() {
    var args   = Array.prototype.slice.call(arguments);
    var method = args.shift();

    for (var i = 0, len = args.length; i < len; i++) {
      if (typeof(args[i]) === 'function') {
        this.funcsCount = (this.funcsCount || 0) + 1;
        var func        = args[i];
        var funcName    = '_func' + this.funcsCount;

        this.methods[funcName] = function() {
          func.apply(this, arguments);
          delete this.methods[funcName];
        }

        args[i] = {_func: this.funcsCount};
      } else if (this.options.safe) {
        args[i] = walkVar(args[i], false);
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

  if (w.JSON && typeof(w.JSON) === 'object' && w.JSON.parse && w.JSON.stringify && w.JSON.stringify({a:[1,2,3]}).replace(/ /g, '') === '{"a":[1,2,3]}') {
    env.json = {parse: w.JSON.parse, stringify: w.JSON.stringify};
  } else {
    w.fastXDM._needJSON = true;
  }

  // PostMessage cover
  if (w.postMessage) {
    env.protocol = 'p';
    env.send = function(xdm, strData) {
      var win = (xdm.frame ? xdm.frame.contentWindow : xdm.caller);
      if (win) {
        try {
          win.postMessage(xdm.key + ':' + strData, "*");
        } catch(e) {
          window.postMessage.call(win, xdm.key + ':' + strData, "*");
        }
      }
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

if (!window.VK) window.VK = {};

VK._Rpc = null;
VK._v = false;
VK._callbacks = {};
VK._initQueue = [];
VK._inited = false;

VK.init = function(success, failure, ver) {
  if (ver) {
    VK._v = ver;
  }
  if (!VK._inited) {
  	VK._inited = true;
    if (!parent) failure();
    window.vk_onConnectionInit = function() {
      if (VK.isFunc(success)) success();
    };
    VK.initXDConn();
  } else {
    if (VK.isFunc(success)) success();
  }
};

VK.initXDConn = function() {
  VK.fxdm = true;

  VK._Rpc = new fastXDM.Client({
    onInit: function() {
        while (VK._initQueue.length > 0) {
          var func = VK._initQueue.pop();
          if (VK.isFunc(func)) func();
        }
      window.vk_onConnectionInit();
    },
    runCallback: function(args) {
      var eventName;
      eventName = args.shift();
      if (VK.isFunc(VK._callbacks[eventName])) VK._callbacks[eventName].apply(VK,args);
    },
    getHeight: function(callback) {
      var calcHeight = function() {
        var height = document.body.offsetHeight;
        if (height) {
          if (window.getComputedStyle !== undefined) {
            var st = window.getComputedStyle(document.body, null);
            height += parseInt(st.getPropertyValue('margin-top').replace('px', ''));
            height += parseInt(st.getPropertyValue('margin-bottom').replace('px', ''));
          } else {
            height += parseInt(document.body.currentStyle['marginTop'].replace('px', ''));
            height += parseInt(document.body.currentStyle['marginBottom'].replace('px', ''));
          }
          return height;
        } else {
          return document.body.scrollHeight;
        }
      }
      var resize = function() {
        VK._Rpc.callMethod('setHeight', calcHeight());
      }

      setInterval(resize, 1000);
      document.addEventListener("click", function() {
        setTimeout(resize, 0);
      }, false);
      document.addEventListener("DOMSubtreeModified", function() {
        setTimeout(resize, 0);
      });
      return callback(calcHeight());
    }
  });

  VK._Rpc.ApiCall = function(args, callback) {
    VK._Rpc.callMethod('ApiCall', args, callback);
  }
};

VK.callMethod = function() {
  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (VK._Rpc != null) {
    if (VK.fxdm) {
      VK._Rpc.callMethod.apply(VK._Rpc, args);
    } else {
      if (VK.isFunc(args[args.length-1])) callback = args.pop();
      VK._Rpc.callMethod(args,callback);
    }
  } else {
    VK._initQueue.push(function() {VK.callMethod.apply(VK, args);});
    VK.init();
  }
};

VK.addCallback = function(eventName, callback) {
  if (callback) VK._callbacks[eventName] = callback;
};

VK.removeCallback = function(eventName) {
  if (VK._callbacks[eventName]) delete VK._callbacks[eventName];
};

VK.isFunc = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
};

VK.params = {};

VK.loadParams = function(q) {
  if (typeof q == 'Object') VK.params = q;
  else {
    var tmp = q.substr(q.indexOf('?') + 1).split('&');
    var i = tmp.length;
    while (i--) {
      var v = tmp[i].split('=');
      VK.params[v[0]] = decodeURIComponent(v[1]);
    }
  }
};

VK.addScript = function(url) {
  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.src = url;
  document.getElementsByTagName('head')[0].appendChild(el);
};

VK.api = function() {
  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (VK._Rpc != null) {
    if (VK.isFunc(args[args.length-1])) {
      callback = args.pop();
    }
    if (!args[1]) {
      args[1] = {};
    }
    if (!args[1]['v'] && VK._v) {
      args[1]['v'] = VK._v;
    }
    VK._Rpc.ApiCall(args,callback);
  } else {
    VK._initQueue.push(function() {VK.api.apply(VK, args);});
    VK.init();
  }
};

VK.Modules = {
  callbacks: {},
  loaded: function(name) {
    if (this.callbacks[name]) {
      var i = this.callbacks[name].length;
      while (i--) {
        if (VK.isFunc(this.callbacks[name][i])) this.callbacks[name][i]();
      }
    }
  },
  load: function(name, callback, path) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = [callback];
      if (path == null) path = 'https://vk.com/js/api/modules/' + name + '.js';
      VK.addScript(path);
    } else {
      this.callbacks[name].push(callback);
    }
  }
};

VK.showPortlet = function(opts) {
  VK.callMethod('showPortlet', opts)
}

VK._protocol = 'https:';

(function(){
  try {
    var scripts = document.getElementsByTagName('script');
    var script = scripts[scripts.length - 1];
    VK._base_domain = script.src.match(/^https?:\/\/((?:\w+\.)*vk.com)/)[1];
  } catch (e) {}
})();

if (!VK.Widgets) {
  VK.Widgets = (function() {
    var obj = {};
    var widgetlist = ['Comments', 'CommentsBrowse', 'Recommended', 'Post', 'Like', 'Poll', 'Group', 'Auth', 'Subscribe', 'ContactUs', 'Ads', 'AllowMessagesFromCommunity', 'CommunityMessages'];
    VK.xdConnectionCallbacks = [];
    var i = widgetlist.length;
    while (i--) (function(f) {
      obj[f] = function() {
        var args = arguments;

        VK.xdConnectionCallbacks.push(function() {
          VK._iframeAppWidget = true;
          VK.Widgets[f].apply(VK, args);
        });

        if (!VK._openApiAttached) {
          VK.callMethod('_getAppInfo', function(data) {
            var baseDomain = ((VK._base_domain && VK._base_domain.match(/^(\w+\.)*vk.com$/)) ? VK._base_domain : 'vk.com');
            VK._apiId = data[0];
            VK._browserHash = data[1];
            VK.addScript(VK._protocol + '//' + baseDomain + '/js/api/openapi.js?136');
          });
          VK._openApiAttached = true;
        }

      }
    })(widgetlist[i]);
    return obj;
  })();
}

/* Obsolete methods */
VK.External = {
  showPaymentBox: function(a){VK.callMethod("showPaymentBox",a)},
  showSettingsBox: function(a){VK.callMethod("showSettingsBox",a)},
  showInstallBox: function(){VK.callMethod("showInstallBox")},
  showInviteBox: function(){VK.callMethod("showInviteBox")},
  resizeWindow: function(b,a){VK.callMethod("resizeWindow",b,a)},
  scrollWindow: function(b,a){VK.callMethod("scrollWindow",b,a)},
  setLocation: function(a,b){VK.callMethod("setLocation",a,b)},
  setTitle: function(a){VK.callMethod("setTitle",a)},
  saveWallPost: function(a){VK.callMethod("saveWallPost",a)},
  showProfilePhotoBox: function(a){VK.callMethod("showProfilePhotoBox",a)},
  showMerchantPaymentBox: function(a){VK.callMethod("showMerchantPaymentBox",a)}
};
