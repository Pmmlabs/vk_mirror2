(function(w) {
    if (w.fastXDM) return;

    var handlers = {};
    var onEnvLoad = [];
    var env = {};

    // Always redirect `/vkpay` to full version.
    // Client-side redirect, because we want to keep url's #hash.
    // @see https://youtrack.mvk.com/issue/MVK-757
    if (location.pathname === '/vkpay' || location.pathname === '/app6217559') {
        location.href = location.href.replace('m.', '');
        return;
    }

    // Key generation
    function genKey() {
        var key = '';
        for (var i = 0; i < 5; i++) {
            key += Math.ceil(Math.random() * 15).toString(16);
        }
        return key;
    }

    function waitFor(obj, prop, func, self, count) {
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
            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.src = url || w.fastXDM.helperUrl;
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
            this.methods = methods || {};
            this.filter = filter;
            this.options = options || {};
            this.id = w.fastXDM._id++;
            this.key = genKey();
            this.frameName = 'fXD' + this.key;
            this.server = true;

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
            this.id = w.fastXDM._id++;
            this.client = true;

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
            this.frame = obj;

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
        var div = document.createElement('DIV');
        div.innerHTML = '<iframe name="' + this.frameName + '" ' + (attrs || '') + '></iframe>';
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

        for (var i = 0, len = args.length; i < len; i++) {
            if (typeof(args[i]) === 'function') {
                this.funcsCount = (this.funcsCount || 0) + 1;
                var func = args[i];
                var funcName = '_func' + this.funcsCount;

                this.methods[funcName] = function() {
                    func.apply(this, arguments);
                    delete this.methods[funcName];
                }

                args[i] = {
                    _func: this.funcsCount
                };
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

    if (w.JSON && typeof(w.JSON) === 'object' && w.JSON.parse && w.JSON.stringify && w.JSON.stringify({
            a: [1, 2, 3]
        }).replace(/ /g, '') === '{"a":[1,2,3]}') {
        env.json = {
            parse: w.JSON.parse,
            stringify: w.JSON.stringify
        };
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
                } catch (e) {
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

if (!window._iconAdd) window._iconAdd = (window.devicePixelRatio >= 2 ? '_2x' : '');

function appCallback(args) {
    var method = args.shift();
    if (cur.app && cur.app.funcs) {
        if (!cur.app.funcs[method]) {
            setTimeout(function() {
                throw new Error('unsupported app method: ' + method);
            }, 0);
        }
        setTimeout(function(cur) {
            return cur.app.funcs[method].apply(cur.app, args);
        }.pbind(cur), 0);
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
                urlParams.push(i + '=' + encodeURIComponent(params[i]));
            } else {
                urlParams.push(i + '=' + params[i]);
            }
        }
        url += ((url.indexOf('?') == -1) ? '?' : '&') + urlParams.join('&');
    }
    self.options = extend({
        heightMax: 4500
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
        getLocationProtocol: function(callback) {
            callback(location.protocol);
        },
        setLocation: function(loc, fireEvent) {
            loc = loc.toString();
            cur.appLoc = loc;
            if (fireEvent) {
                cur.app.runCallback('onLocationChanged', loc);
            }
            nav.setLoc(extend(nav.objLoc, {
                '#': loc
            }));
            //nav.change({'#': loc});
        },
        showSettingsBox: function(mask) {
            if (cur.settingsBoxShown) {
                return;
            }
            cur.onSettingsEventSended = false;
            cur.canSendOnSettingsEventFromHide = true;
            cur.onSettingsChange = function(status, settings) {
                if (cur.onSettingsEventSended) {
                    return;
                }
                cur.onSettingsEventSended = true;
                if (status === 'ok') {
                    cur.app.runCallback('onSettingsChanged', settings);
                } else {
                    cur.app.runCallback('onSettingsCancel');
                }
            };
            cur.settingsBoxShown = true;
            var param = {
                act: 'show_settings',
                api_hash: cur.api_hash,
                aid: options.aid,
                mask: mask
            };
            if (cur.lang_id) {
                param.lang = cur.lang_id;
            }
            if (options.gid) {
                param.gid = options.gid;
            }
            ajax.post('/apps.php', param, {
                onDone: function(html, js) {
                    showAppsBox(html, js);
                }
            });
        },
        showAllowMessagesFromCommunityBox: function() {
            if (cur.allowMessagesFromCommunityBox) {
                return;
            }
            cur.allowMessagesFromCommunityBox = true;
            cur.onAllowMessagesFromCommunity = function(status) {
                if (status === 'ok') {
                    cur.app.runCallback('onAllowMessagesFromCommunity');
                } else {
                    cur.app.runCallback('onAllowMessagesFromCommunityCancel');
                }
            };
            var params = {
                act: 'allow_messages_from_community_box',
                aid: options.aid,
                api_hash: cur.api_hash
            };
            if (options.gid) {
                params.gid = options.gid;
            }
            ajax.post('/apps.php', params, {
                onDone: function(html, js) {
                    showAppsBox(html, js);
                }
            });
        },
        shareBox: function(url, image_url, title, description) {
            /*if (cur.showShareBox) {
             return;
             }*/
            //cur.showShareBox = true;
            if (!url) {
                return false;
            }
            var params = {
                act: 'share_box',
                aid: options.aid,
                api_hash: cur.api_hash
            };
            if (url) {
                params.url = url
            }
            if (image_url) {
                params.image = image_url;
            }
            if (title) {
                params.title = title;
            }
            if (description) {
                params.description = description;
            }
            /*if (noparse) {
             params.noparse = noparse;
             }
             if (no_vk_links) {
             params.no_vk_links = no_vk_links;
             }*/
            if (options.gid) {
                params.gid = options.gid;
            }
            ajax.post('/apps.php', params, {
                onDone: function(html, js) {
                    showAppsBox(html, js);
                }
            });
        },
        debug: function() {
            debugLog((arguments.length == 1) ? arguments[0] : arguments);
        },

        openExternalApp: function(url, params) {
            if (!url) {
                return;
            }

            var isNativeClient = self.isNativeClientWebView(),
                payToUserAction = 'pay-to-user',
                payToServiceAction = 'pay-to-service',
                payToGroupAction = 'pay-to-group',
                transferToUserAction = 'transfer-to-user',
                transferToGroupAction = 'transfer-to-group',
                validActions = [
                    payToUserAction,
                    payToServiceAction,
                    payToGroupAction,
                    transferToUserAction,
                    transferToGroupAction
                ],
                needUserIdActions = [
                    payToUserAction,
                    transferToUserAction
                ],
                needGroupIdActions = [
                    payToGroupAction,
                    transferToUserAction
                ],
                query = '',
                req = [];

            if (!params || !(~validActions.indexOf(params.action))) {
                self.runCallback('onExternalAppFail', {
                    error_msg: 'Invalid action',
                    error_code: 100
                });
                return;
            }

            if (~needUserIdActions.indexOf(params.action) && !params.user_id) {
                self.runCallback('onExternalAppFail', {
                    error_msg: 'Missing required param user_id',
                    error_code: 100
                });
                return;
            }

            if (~needGroupIdActions.indexOf(params.action) && !params.group_id) {
                self.runCallback('onExternalAppFail', {
                    error_msg: 'Missing required param group_id',
                    error_code: 100
                });
                return;
            }

            params.aid = options.aid;

            for (var arg in params) {
                if (params.hasOwnProperty(arg) && !(isNativeClient && arg === 'action')) {
                    var val = '';
                    if (params[arg] !== undefined) {
                        val = encodeURIComponent(params[arg]);
                    }
                    req.push(encodeURIComponent(arg) + '=' + val);
                }
            }

            if (isNativeClient) {
                url += '/' + params.action;
                if (self.isNativeIosWebView() && !/^https?:\/\//.test(query)) {
                    url = 'https://' + url;
                }
            }

            query = url + '?' + req.join('&');

            if (isNativeClient) { // IOS and Android
                self.callNativeClientMethod('openExternalUrl', query);
                return;
            }

            var queryParams = {
                act: 'open_external_app',
                url: url,
                query: req.join('&'),
                aid: options.aid
            };
            var externalAppWin = window.open('', '_blank');

            ajax.post('/apps.php', queryParams, {
                onDone: function(response) {
                    try {
                        response = parseJSON(response);
                    } catch (e) {
                        response = {
                            error: {
                                error_code: 1,
                                error_msg: 'Unknown error'
                            }
                        };
                    }
                    if (response.error || !response.url) {
                        self.runCallback('onExternalAppFail', response.error);
                        externalAppWin.close();
                        return;
                    }
                    cur.onExternalAppDone = function(params) {
                        this.runCallback('onExternalAppDone', params);
                    }.bind(self);

                    cur.onExternalAppListener = function(event) {
                        var validOrigin = /https:\/\/(m|0)\.vk\.com/;
                        if (validOrigin.test(event.origin) && event.isTrusted && cur.onExternalAppDone) {
                            if (event.data.method === 'externalAppDone' || event.data.method === 'externalAppFail') {
                                window.focus();

                                if (event.data.method === 'externalAppDone') {
                                    cur.onExternalAppDone(event.data.params);
                                } else {
                                    self.runCallback('onExternalAppFail', event.data.error);
                                }

                                cur.onExternalAppDone = null;
                                window.removeEventListener('message', cur.onExternalAppListener);
                                cur.onExternalAppListener = null;
                            }
                        }
                    };

                    window.addEventListener('message', cur.onExternalAppListener);
                    externalAppWin.location.href = response.url;
                }
            });
        },

        externalAppDone: function(params) {
            if (window.opener) {
                var data = {
                    method: 'externalAppDone',
                    params: params
                };
                window.opener.postMessage(data, location.origin);
                window.close();
            }
        },

        externalAppFail: function(rejection) {
            if (!isObject(rejection)) {
                try {
                    rejection = parseJSON(rejection);
                } catch (e) {
                    rejection = {
                        error_msg: 'Unknown error',
                        error_code: 1
                    };
                }
            }
            if (self.isNativeAndroidWebView()) {
                self.callNativeClientMethod('externalAppFail', rejection);
                return;
            }
            if (window.opener) {
                var data = {
                    method: 'externalAppFail',
                    error: rejection
                };
                window.opener.postMessage(data, location.origin);
                window.close();
            }
        },

        closeApp: function() {
            cur.app.callNativeClientMethod('close');
        },

        openQRReader: function() {
            if (cur.app.isNativeClientWebView()) {
                cur.app.callNativeClientMethod('VKWebAppOpenQR');
            }
        },

        sendStats: function(stats) {
            if (isObject(stats) || isArray(stats)) {
                stats = JSON.stringify(stats);
            }

            ajax.post('/apps.php', {
                act: 'save_stats',
                data: stats,
                hash: cur.app.params.stats_hash,
                app_id: cur.aid
            }, {
                onDone: function() {
                    cur.app.runCallback('onSendStatsDone');
                },
                onFail: function() {
                    cur.app.runCallback('onSendStatsFail');
                    return true;
                }
            });
        },

        /**
         * Show box with post preview.
         *
         * @param params see wall.post params
         */
        showWallPostBox: function(params) {
            if (cur.wallPostBoxSubmit) { // preview called box is active
                return;
            }

            var sber9thMayAppId = 6463155,
                noCallNative = !!cur.app.isNativeIosWebView() && cur.aid === sber9thMayAppId;

            params = params || {};
            params.attachments = cur.app.getValidPostAttachments(params.attachments || params.attachment);

            if (!params.message && (!params.attachments || !isArray(params.attachments) || !params.attachments.length)) {
                var error = {
                    error_code: 100,
                    error_msg: 'One of the parameters specified was missing or invalid'
                };
                cur.app.runCallback('onShowWallPostBoxCancel', error);
                cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                    error: error
                });
                return;
            }

            if (cur.app.isNativeClientWebView() && cur.app.nativeClientHasMethod('showWallPostBox') && !noCallNative) {
                params = cur.app.isNativeAndroidWebView() ? obj2qs(params) : params;
                cur.app.callNativeClientMethod('showWallPostBox', params);
                return;
            }

            params.app_id = cur.aid;
            params.act = 'show_wall_post_box';
            params.api_hash = cur.api_hash;

            cur.showWallPostBoxErrorHandler = function(error) { // Called when server return error.
                cur.app.runCallback('onShowWallPostBoxCancel', error);
                cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                    error: error
                });
                hideAppsBox();
            };

            ajax.post('/apps.php', params, {
                onDone: function(html, js) {
                    showAppsBox(html, js);
                },
                onFail: function() {
                    cur.showWallPostBoxErrorHandler({
                        error_code: 1,
                        error_message: 'Unknown network error occurred'
                    });
                }
            });
        },
    };

    if (self.options.no_init) {
        return false;
    }
    if (self.options.rotate_handler) {
        initOrientationHandler();
    }
    switch (self.options.type) {
        case 1: // Iframe App
            this.RPC = new fastXDM.Server(this.funcs);
            var frameHeight = document.body.scrollHeight;
            if (cur.with_header) {
                frameHeight -= 44;
            }
            var frameParams = {
                src: url,
                width: '100%',
                height: frameHeight + 'px',
                overflow: 'hidden'
            };
            if (self.options.height) {
                frameParams.height = '100%';
            }
            this.frame = this.RPC.append(self.cont, frameParams, 'webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" allow="geolocation; microphone; camera"');
            this.frame.style.display = 'block';
            break;
    }
    cur.destroy.push((function() {
        if (this.RPC) {
            this.RPC.destroy();
        }

        if (this._nativeClientCallbackListener) {
            removeEvent(window, 'VKWebAppEvent', this._nativeClientCallbackListener);
        }
    }).bind(this));

    if (this.isNativeClientWebView()) {
        this.initNativeClientCallbackListener();
    }
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

vkApp.prototype.initWallPostBox = function(params) {
    var backBtn = geByClass1('appHeader__back'),
        onBackBtnClick,
        originalBackOnclick,
        hideBox,
        hideBoxOnPopState;

    params = params || {};

    hideBox = function(needRunCallback) {
        hideAppsBox();
        needRunCallback && this.runCallback('onShowWallPostBoxCancel');
        cur.wallPostBoxSubmit = null;
        hideBoxOnPopState && removeEvent(window, 'popstate', hideBoxOnPopState);
        if (backBtn && onBackBtnClick && originalBackOnclick) {
            backBtn.onclick = originalBackOnclick;
        }
    }.bind(this);

    if (window.history) {
        window.history.pushState({}, '', '');
        hideBoxOnPopState = hideBox.bind(this, true);
        addEvent(window, 'popstate', hideBoxOnPopState);
    }

    if (backBtn) {
        onBackBtnClick = function(event) {
            cancelEvent(event);
            hideBox(true);
            return false;
        }.bind(this);

        originalBackOnclick = backBtn.onclick;
        backBtn.onclick = onBackBtnClick;
    }

    cur.wallPostBoxSubmit = function(hash, btnOptions) {
        var method = 'wall.post';
        delete params.act;

        Btn.setLoading(btnOptions.$btn, true);

        this.api(method, extend(params, {
            method_access: hash
        }), function(response) {
            cur.wallPostBoxCallback && cur.wallPostBoxCallback(response);
            if (response.error) {
                this.runCallback('onShowWallPostBoxCancel', response.error);
            } else {
                this.runCallback('onShowWallPostBoxDone', response.response.post_id);
            }
            hideBox();
        }.bind(this));

    }.bind(this);
};

vkApp.prototype.submitWallPostBox = function(hash, btnOptions) {
    cur.wallPostBoxSubmit && cur.wallPostBoxSubmit(hash, btnOptions);
};

vkApp.prototype.getValidPostAttachments = function(attachments) {
    var validAttacheRegexp = /(^https?:\/\/)|(^(poll|album|photo|video|doc|audio|page|note)-?\d+_-?\d+)$/,
        validAttachments = [];

    attachments = attachments || [];

    if (isString(attachments)) {
        attachments = attachments.split(',');
    }

    each(attachments, function() {
        var attach = this.trim();
        if (validAttacheRegexp.test(attach)) {
            validAttachments.push(attach);
        }
    });
    return validAttachments.length ? validAttachments : '';
};

/**
 * Run client app callback.
 * Client apps use "addCallback" method for subscribe to callbackEvent.
 *
 * arg1: callback event name,
 * args: callback args
 */
vkApp.prototype.runCallback = function() {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];
    var eventName = 'customEvent';
    if ('onLocationChanged,onMerchantPaymentSuccess,onBalanceChanged,onWindowResized,onSettingsChanged'.indexOf(method) != -1) {
        eventName = method;
        var fArgs = args.slice(1);
    } else {
        var fArgs = args.slice();
    }
    switch (this.options.type) {
        case 1:
            this.RPC.callMethod('runCallback', args);
            if (!this.options.widget && !browser.iphone && !browser.ipad) {
                try {
                    this.externalFrame[eventName](fArgs);
                } catch (e) {}
            }
            break;
        case 2:
            //this.frame[eventName](fArgs);
            try {
                this.externalFrame[eventName](fArgs);
            } catch (e) {}
            break;
        case 3:
            try {
                this.externalFrame[eventName](fArgs);
            } catch (e) {}
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
    } catch (e) {
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
    width = 400;
    if (!width || this.inlineApp) return;
    if (!cur.app) return;
    var size = getSize(cur.app.cont);
    width = Math.min(Math.max(width, 100), 1000);
    handlePageView({
        width: Math.max(width, 625) + 166
    });
    this.frame.style.width = this.cont.style.width = width + 'px';
}

vkApp.prototype.balanceUpdated = function(money) {
    this.runCallback('onBalanceChanged', money);
}

vkApp.prototype.checkMethod = function(method, params, callback) {

    var m = method.toLowerCase();

    if (m === 'wall.post') {
        cur.wallPostBoxCallback = callback;
        this.funcs.showWallPostBox(params);
        return false;
    }

    return true;
}

vkApp.prototype.checkMethodResult = function(method, params, data, callback) {
    switch (method) {
        case 'photos.saveProfilePhoto':
            if (!data.error) {
                cur.profilePhotoBoxCallback = function(success) {
                    if (success) {
                        callback({
                            response: {
                                'photo_src': data.response['photo_src']
                            }
                        });
                    } else {
                        callback({
                            error: {
                                error_code: 10007,
                                error_msg: "Operation denied by user"
                            }
                        });
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
        callback = params;
        inputParams = {};
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
        rnd: parseInt(Math.random() * 10000)
    }

    if (inputParams) {
        for (var i in inputParams) {
            i = trim(i);
            if (!/^(rnd|format|api[\s.\[_]id|method|callback|access[\s.\[_]token)(\s*\[|$)/.test(i)) {
                params[i] = inputParams[i];
            }
        }
    }

    var lParams = [];
    for (i in params) {
        lParams.push([i, params[i]]);
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
    params.sig = MD5(sig);
    var done = function(text) {
        var response = eval('(' + text + ')');
        if (response.error && response.error.error_code == 14) { // Captcha needed
            throw Error('You call api often. You can try call from server');
            /*cur.appCaptcha = showCaptchaBox(response.error.captcha_sid, 0, false, {
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
            });*/
        } else {
            /*if (captcha) {
              cur.appCaptcha.setOptions({onHide: function(){}}).hide();
            }*/
            if (!self.checkMethodResult(method, inputParams, response, callback)) {
                return;
            } else if (callback) {
                callback(response);
            }
        }
    };
    var fail = function() {
        if (callback) {

            callback({
                error: {
                    error_code: 1,
                    error_message: 'Unknown network error occurred'
                }
            });
        }
    };
    ajax.plainpost(self.params['api_script'], params, done, fail);
}

vkApp.prototype.callNativeClientMethod = function(method, params) {
    if (window.AndroidBridge) {
        window.AndroidBridge.callMethod(method, params);
        return;
    }

    var iosBridge = window.webkit && window.webkit.messageHandlers;
    if (iosBridge) {
        iosBridge[method].postMessage(params);
    }
};

// --------------------------------
// Native clients web view methods
// --------------------------------

vkApp.prototype.isNativeClientWebView = function() {
    return this.isNativeIosWebView() || this.isNativeAndroidWebView();
};

vkApp.prototype.nativeClientHasMethod = function(methodName) {
    // Can check method only for ios.
    if (this.isNativeIosWebView()) {
        return !!window.webkit.messageHandlers[methodName];
    }

    return true;
};

vkApp.prototype.isNativeIosWebView = function() {
    return window.webkit && window.webkit.messageHandlers;
};

vkApp.prototype.isNativeAndroidWebView = function() {
    return window.AndroidBridge;
};

/**
 * Listener for getting callbacks from native client webview.
 */
vkApp.prototype.initNativeClientCallbackListener = function() {
    this._nativeClientCallbackListener = function(vkEvent) {
        var eventData = vkEvent.detail || {};
        if (this[eventData.type]) {
            this[eventData.type].call(this, eventData);
        }

    }.bind(this);

    addEvent(window, 'VKWebAppEvent', this._nativeClientCallbackListener);
};

//---------------------------------
// Native clients callback methods
//---------------------------------

vkApp.prototype.appRunCallback = function(eventData) {
    this.runCallback(eventData.event, eventData.params);
};

/**
 * Called when the reading of qr is was successfully completed
 */
vkApp.prototype.VKWebAppQRDone = function(eventData) {
    this.runCallback('onQRReaderDone', eventData.data);
};

/**
 * Called when the reading of qr was completed with an error or canceled
 */
vkApp.prototype.VKWebAppQRClosed = function(eventData) {
    this.runCallback('onQRReadeClosed', eventData.data);
};

vkApp.prototype.VKWebAppShowWallPostBoxDone = function(eventData) {
    this.runCallback('onShowWallPostBoxDone', eventData.data);
    if (cur.wallPostBoxCallback) {
        cur.wallPostBoxCallback({
            response: {
                post_id: eventData.data
            }
        });
    }
};

vkApp.prototype.VKWebAppShowWallPostBoxCancel = function(eventData) {
    this.runCallback('onShowWallPostBoxCancel', eventData.data);
    if (cur.wallPostBoxCallback) {
        cur.wallPostBoxCallback({
            error: eventData.data
        });
    }
};


if (!window.Apps) window.Apps = {
    optionHiddenClass: 'apps_hidden',
    optionLoadingClass: 'loading',
    address: 'apps',

    init: function(obj, appTpl) {
        // extend page params
        extend(cur, {
            module: 'apps',
            preventFastBack: false,
            // global els
            aTabs: ge('apps_top_tabs'),
            aSearch: ge('s_search'),
            aSearchWrap: ge('apps_search'),
            aWrap: ge('apps_wrap'),
            aSummary: ge('apps_summary'),
            aSummaryCounter: ge('apps_summary_counter'),
            // list els
            lShowMoreButton: ge('apps_list_show_more'),
            lPreload: ge('apps_list_preload'),
            lContent: ge('apps_list_content'),
            // feed els
            fWrap: ge('apps_feed'),
            fShowMoreButton: ge('apps_feed_show_more'),
            // recent notifications els
            rNotCounter: ge('apps_recent_notifications_counter'),
            rNotWrap: ge('apps_recent_notifications_wrap'),
            rNotNoContent: ge('apps_recent_notifications_no_content'),
            rNotBlackList: ge('apps_recent_notifications_black_list'),
            rNotShowMoreButton: ge('apps_recent_notifications_show_more'),
            // recent apps els
            rAppsWrap: ge('apps_recent_apps_wrap'),
            rAppsShowMoreButton: ge('apps_recent_more'),
            rAppsNoContent: ge('apps_recent_apps_no_content'),

            onSilentLoad: {},
            apps: {}, // indexed apps
            deletedApps: {},
            appTpl: appTpl || function() {
                return ''
            },
        });
        extend(cur, obj);
        cur.defaultCount = cur.shownApps;

        // fix act=notifications
        if (nav.objLoc.act === 'notifications') {
            delete nav.objLoc.act;
            nav.objLoc.tab = 'notifications';
            nav.setLoc(nav.objLoc);
        }

        // add rules for history back
        this.setHistoryBackRules();

        // sync search val with address bar
        this.searchLoadFromAddressBar();

        cur.aSearch && uiSearch.startEvents(cur.aSearch);

        // init after switch layout in switchTab
        setTimeout(function() {
            this.scrollCheckBinded = this.scrollCheck.bind(this);
            this.sliderInit();
            this.feedInit();
            this.notificationsInit();
            if (cur.scrollToHeader) {
                setTimeout(this.scrollToHeader.bind(this), 100);
                delete cur.scrollToHeader;
            }
            if (cur.scrollToTop) {
                scrollToTop();
                delete cur.scrollToTop;
            }
            this.startEvents();
            cur.destroy.push(function(oldCur) {
                setTimeout(function() {
                    var leave;
                    // destroy scrollbars if they are not used on current page or in history
                    if (oldCur.fScrollbar && cur.fScrollbar != oldCur.fScrollbar) {
                        leave = false;
                        globalHistory.forEach(function(h) {
                            if (h.cur != oldCur && h.cur.fScrollbar == oldCur.fScrollbar) leave = true;
                        });
                        leave || oldCur.fScrollbar.destroy();
                    }
                    if (oldCur.rNotScrollbar && cur.rNotScrollbar != oldCur.rNotScrollbar) {
                        leave = false;
                        globalHistory.forEach(function(h) {
                            if (h.cur != oldCur && h.cur.rNotScrollbar == oldCur.rNotScrollbar) leave = true;
                        });
                        leave || oldCur.rNotScrollbar.destroy();
                    }
                }, 0);
            }.pbind(cur));
            cur.destroy.push(this.stopEvents.bind(this));
            cur.aSearch && uiSearch.scrollResize(cur.aSearch);
        }.bind(this), 0);

        // perform silent preload
        if (!cur.silent_mode) return;

        cur.silent = true;
        if (cur.preload) {
            if (!cur.leavePreloadedHeader) delete cur.preload.header;
            if (!cur.leavePreloadedBefore) delete cur.preload.before;
        }

        var query = {
                act: 'load_apps_silent',
                gid: cur.gid,
                oid: cur.oid,
                header: cur.leavePreloadedHeader ? 0 : 1,
                before: cur.leavePreloadedBefore ? 0 : 1,
                section: cur.section,
                preload: 1,
                preloaded: []
            },
            prop = null;
        for (prop in (cur.preload || {})) query.preloaded.push(prop);
        ajax.post(this.address, query, {
            cache: 1,
            local: 1,
            onDone: this.withFastBackCheck(function(json, preload, preload_before, preload_header) {
                cur.preload = extend(cur.preload || {}, preload);
                cur.preload.before = preload_before;
                cur.preload.header = preload_header;

                json = eval('(' + json + ')');
                cur.curList = 'all';
                cur.appsList = json && json[cur.curList] ? json : {
                    all: []
                };
                cur.sectionCount = cur.appsList[cur.curList].length;
                if (cur.searchOffset === void(0)) {
                    cur.searchOffset = 0;
                }

                json && this.indexAll(function() {
                    cur.silent = false;
                    if (cur.onSilentLoad) {
                        for (var i in cur.onSilentLoad) {
                            isFunction(cur.onSilentLoad[i]) && cur.onSilentLoad[i]();
                        }
                    }
                });
            }.bind(this))
        });
    },

    /* Misc */

    withFastBackCheck: function(handler) {
        cur.preventFastBack = true;
        var _cur = cur;
        return function() {
            if (cur === _cur) {
                cur.preventFastBack = false;
                handler.apply(this, Array.prototype.slice.call(arguments));
            }
        };
    },

    startEvents: function() {
        addEvent(window, 'scroll', this.scrollCheckBinded);
        addEvent(window, 'resize', this.scrollCheckBinded);
        this.initUpdates();
        this.scrollCheck();
        this.sliderStart();
    },

    stopEvents: function() {
        removeEvent(window, 'scroll', this.scrollCheckBinded);
        removeEvent(window, 'resize', this.scrollCheckBinded);
        this.stopUpdates();
        this.sliderStop();
    },

    isSection: function() {
        var i = arguments.length;
        while (i--)
            if (arguments[i] === cur.section) return true;
        return false;
    },

    isDelayedOnSilentLoad: function mem(key, handler) {
        if (!cur.silent) return;
        mem.count = mem.count || 0;
        mem.count++;
        cur.onSilentLoad[key || 'key_' + mem.count] = handler;
        return true;
    },

    handlePageCount: function(num) {
        return handlePageCount('ap', num);
    },

    /* App calls */

    incomingCall: function(html) {
        stManager.add(['notifier.js', 'notifier.css', 'apps.css', 'call.css'], function() {
            var wrap = se('<div><div class="call_apps_wrap clear_fix">' + html + '</div></div>');
            var cont = geByClass1('call_invitation_wrap', wrap, 'div');
            var opts = {
                movable: cont,
                startLeft: parseInt((window.innerWidth - 224) / 2) + 'px',
                startTop: parseInt((window.innerHeight - 404) / 2) + 'px',
                startWidth: 224,
                startHeight: 404,
                resize: false,
                onBeforeHide: function() {},
                onDragEnd: function(y, x) {},
                onResize: function(h, w) {}
            }
            if (Apps.appCall) {
                Apps.appCall.close();
            }
            Apps.appCall = new RBox(wrap, opts);
        });

        window.Notifier && Notifier.setRecvClbk('apps_call_hide', function() {
            if (Apps.appCall) {
                Apps.appCall.close();
                Apps.appCall = false;
            }
        });
    },

    callApprove: function(loc) {
        window.Notifier && Notifier.lcSend('apps_call_hide', new Date().getTime())
        if (Apps.appCall) {
            Apps.appCall.close();
            Apps.appCall = false;
        }
        nav.go(loc)
    },

    callReject: function() {
        window.Notifier && Notifier.lcSend('apps_call_hide', new Date().getTime())
        Apps.callOnReject();
    },

    callOnReject: function() {
        if (Apps.appCall) {
            Apps.appCall.close();
            Apps.appCall = false;
        }
        ajax.post('/al_apps.php', {
            act: 'do_call_reject'
        }, {
            onDone: function() {}
        });
    },

    /* Blacklist */

    editBlacklist: function() {
        showBox(this.address, {
            act: 'blacklist_box',
            height: lastWindowHeight
        }, {
            stat: ['privacy.css', 'indexer.js']
        });
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

        box.setOptions({
            width: 560,
            bodyStyle: 'padding: 0px'
        });
        box.removeButtons().addButton(getLang('global_close'), function() {
            box.hide(200);
        }, 'yes');
        contNode.parentNode.style.height = options.boxHeight + 'px';

        var filter = ge('apps_blacklist_filter');
        if (!options.nofocus) {
            setTimeout(elfocus.pbind(filter), 100);
        }
        var filterOpts = data(filter, 'opts');
        data(filter, 'opts', extend(filterOpts, {
            onChange: renderList
        }));

        if (moreEl) {
            if (!isVisible(moreEl)) {
                re(moreEl);
                show(moreEl);
            } else {
                moreEl.onclick = function(event) {
                    renderList('', 60);
                    return cancelEvent(event);
                }
            }
        }

        addEvent(contNode, 'click', onMouseEvent);
        addEvent(scrollNode, 'scroll', onScroll);
        setTimeout(onScroll, 10);

        function onScroll() {
            if (scrollNode.scrollTop > 0) {
                addClass(box.bodyNode.parentNode, 'olist_topsh');
            } else {
                removeClass(box.bodyNode.parentNode, 'olist_topsh');
            }
            if (scrollNode.scrollTop + (scrollNode.offsetHeight || scrollNode.clientHeight) < contNode.scrollHeight) {
                addClass(box.bodyNode.parentNode, 'olist_botsh');
            } else {
                removeClass(box.bodyNode.parentNode, 'olist_botsh');
            }

            if (!moreEl || !moreEl.offsetTop || !moreEl.onclick) {
                return;
            }
            var y = moreEl.offsetTop,
                st = contNode.scrollTop,
                h = contNode.offsetHeight || contNode.clientHeight;
            if (st + h + 100 >= y) {
                moreEl.onclick();
            }
        }

        function onMouseEvent(event) {
            var target = event.originalTarget || event.target;
            if (!hasClass(target, 'olist_item_wrap')) {
                target = gpeByClass('olist_item_wrap', target);
            }
            if (!target || target == bodyNode) return;
            if (hasClass(target, 'olist_item_loading')) {
                return cancelEvent(event);
            }

            if (checkEvent(event)) return true;
            box.changed = true;
            var id = target.id.match(/-?\d+/)[0];
            var checked = unbanned[id];
            var hash = false;
            each(owners, function() {
                if (this[0] == id) {
                    hash = this[4];
                    return false;
                }
            });
            ajax.post('/al_apps.php', {
                act: 'a_blacklist_delete',
                cancel: checked ? 1 : 0,
                owner_id: id,
                hash: hash
            }, {
                onDone: function() {
                    toggleClass(target, 'olist_item_wrap_on', !checked);
                    unbanned[id] = !checked;
                },
                showProgress: function() {
                    addClass(target, 'olist_item_loading');
                },
                hideProgress: function() {
                    removeClass(target, 'olist_item_loading');
                }
            });

            if (contNode.scrollTop < 50) {
                setTimeout(function() {
                    elfocus(filter);
                    if (val(filter).length) {
                        filter.select();
                    }
                }, 100);
            }

            return cancelEvent(event);
        }

        function renderList(pattern, offset) {
            offset = offset || 0;
            var slice, tpl,
                limit = offset ? 60 : 120

            if (pattern) {
                pattern = clean(pattern).replace(/\u2013|\u2014/g, '-');
            }
            slice = pattern ? indexer.search(pattern) : owners;
            tpl = options.tpl;

            var total = slice.length;
            slice = slice.slice(offset, offset + limit);
            var html = [];
            if (pattern) {
                var term = escapeRE(pattern),
                    termRus = parseLatin(pattern);
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
            each(slice, function() {
                html.push(rs(tpl, rsTpl(this, pattern, unbanned, regexp)));
            });
            if (!offset && !html.length) {
                html.push('<div class="no_rows">' + (pattern ? getLang('global_search_not_found').replace('{search}', clean(pattern)) : options.lang['apps_blacklist_empty']) + '</div>');
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
                moreEl.onclick = function(event) {
                    renderList(pattern, offset + limit);
                    return cancelEvent(event);
                }
            }
            if (box && box.scroll) {
                box.scroll.update(false, true);
            }
        }
    },

    /* Install page / layer */

    initDescription: function(description) {
        var el = geByClass1('apps_i_description_content');
        val(el, description);
        var lh = parseInt(getStyle(el, 'line-height')),
            linesCount = Math.ceil(getSize(el)[1] / lh);

        if (linesCount > 7) {
            setStyle(el, 'height', lh * 5);
            val(el, description);
            removeClass(geByClass1('apps_i_description_show_more'), this.optionHiddenClass);
        }
    },

    showFullDescription: function() {
        addClass(geByClass1('apps_i_description_show_more'), this.optionHiddenClass);
        setStyle(geByClass1('apps_i_description_content'), 'height', '');
    },

    appSsSliderNext: function() {
        cur.appSsSlider && cur.appSsSlider.next();
    },

    adjustRunBoxSize: function(run_box) {
        if (run_box) {
            var run_box_size = getSize(run_box),
                params = {
                    marginTop: -run_box_size[1] / 2
                };
            params[vk.rtl ? 'marginRight' : 'marginLeft'] = -run_box_size[0] / 2;
            setStyle(run_box, params);
        }
    },

    initAppSsSlider: function() {
        var next = ge('apps_i_slider_next'),
            prev = ge('apps_i_slider_prev'),
            outer = ge('apps_i_slider_outer'),
            thumbsInner = ge('apps_i_slider_thumbs'),
            thumbsOuter = thumbsInner ? domPN(thumbsInner) : null,
            thumbs = thumbsInner ? thumbsInner.children : [],
            index = null,
            animation = null,
            centerThumb = function() {
                if (thumbsInner) {
                    var outerWidth = thumbsOuter.offsetWidth,
                        innerWidth = thumbsInner.scrollWidth;
                    if (innerWidth <= outerWidth || !innerWidth || !outerWidth) return;
                    var thumb = thumbs[index],
                        innerLeft = thumbsInner.offsetLeft,
                        thumbLeft = thumb.offsetLeft,
                        thumbWidth = thumb.offsetWidth,
                        left = -thumbLeft + (outerWidth - thumbWidth) / 2;
                    left = Math.max(-innerWidth + outerWidth, Math.min(0, left));
                    animation && animation.stop();
                    animation = animate(thumbsInner, {
                        left: left
                    }, {
                        duration: cur.appSsSlider.options.animationDuration,
                        transition: Fx.Transitions.easeOutCubic
                    });
                }
            },
            selectThumb = function(i) {
                if (thumbsInner && i !== index) {
                    index !== null && removeClass(thumbs[index], 'selected');
                    index = i;
                    addClass(thumbs[index], 'selected');
                    centerThumb();
                }
            }
        onRequired = function() {
                selectThumb(cur.appSsSlider.required !== null ? cur.appSsSlider.required : cur.appSsSlider.current);
            },
            onChange = function() {
                cur.appSsSlider.slideNext ? addClass(next, 'apps_i_slider_available') : removeClass(next, 'apps_i_slider_available');
                cur.appSsSlider.slidePrev ? addClass(prev, 'apps_i_slider_available') : removeClass(prev, 'apps_i_slider_available');
                hasClass(cur.appSsSlider.slideCurrent, 'apps_promo_video_slide') ? addClass(outer, 'apps_i_slider_video') : removeClass(outer, 'apps_i_slider_video');
                cur.appSsSlider.slideNext ? removeClass(outer, 'apps_i_slider_run') : addClass(outer, 'apps_i_slider_run');
            };

        cur.appSsSlider = new AppsSlider({
            inner: ge('apps_i_slider_inner'),
            outer: outer,
            next: next,
            prev: prev,
            onChange: onChange,
            onRequired: onRequired,
            infinite: false
        });
        onChange();
        onRequired();

        this.adjustRunBoxSize(ge('apps_i_run_box'));

        each(thumbs, function(i, thumb) {
            var img = new Image();
            img.onload = centerThumb;
            img.src = geByTag1('img', thumb).src;

            addEvent(thumb, 'click', function() {
                cur.appSsSlider && cur.appSsSlider.requireIndex(i);
            });
        });

        if (cur.promoVideo) {
            var container = ge('apps_promo_video_thumb');
            container && showInlineVideo(
                cur.promoVideo,
                '', {
                    autoplay: 1,
                    module: 'app_promo',
                    addParams: {
                        from_autoplay: 1
                    }
                },
                null,
                container
            );
        }
    },

    showWinInstructions: function(event, downloadLink, helpLink) {
        setTimeout(function() {
            new MessageBox({
                width: 800,
                title: cur.winInstrTitle,
                hideButtons: true,
                containerClass: 'apps_win_instr_wrap'
            }).content(rs(trim(cur.winInstrTpl), {
                download_link: downloadLink,
                help_link: helpLink
            })).show();
        }.bind(this), 500);
    },

    sendInstallRequest: function(runButton, isPush, aid, ref, cid, hash) {
        if (!runButton ||
            isButtonLocked(runButton) ||
            hasClass(runButton, 'button_disabled')
        ) return;

        lockButton(runButton);
        var buttonSize = getSize(runButton);
        if (isPush) {
            ajax.post(this.address, {
                act: 'send_install_request',
                aid: aid,
                ref: ref,
                cid: cid,
                hash: hash
            }, {
                hideProgress: function() {
                    var msg = getLang('apps_install_push_sent_msg');

                    unlockButton(runButton);
                    addClass(runButton, 'button_disabled');
                    setStyle(runButton, 'width', buttonSize[0]);
                    val(runButton, msg);

                    var runButtonBox = ge('apps_i_run_box');
                    addClass(runButtonBox, 'sent');
                    val(runButtonBox, msg);
                    this.adjustRunBoxSize(runButtonBox);
                }.bind(this)
            });
        } else {
            cur.ref = ref;
            ajax.post(this.address, {
                act: 'send_install_request_box',
                aid: aid
            }, {
                onDone: function(lang, html, hash) {
                    unlockButton(runButton);
                    if (!html) {
                        showBox('activation.php', {
                            act: 'change_phone_box',
                            hash: hash
                        });
                    } else {
                        if (!cur.lang) cur.lang = {};
                        extend(cur.lang, lang);

                        var box = new MessageBox({
                            title: getLang('apps_get_push_w_install_link'),
                        });
                        box.removeButtons();
                        box.content(html);
                        box.addButton(getLang('apps_install_sms_send'), function(sendButton) {
                            var runButton = ge('apps_i_request_btn');
                            if (!sendButton ||
                                !runButton ||
                                isButtonLocked(sendButton)
                            ) return;

                            var buttonSize = getSize(runButton);
                            lockButton(sendButton);
                            ajax.post(this.address, {
                                act: 'send_install_request',
                                ref: ref,
                                aid: aid,
                                cid: -3,
                                hash: hash
                            }, {
                                onFail: function(text) {
                                    if (!text) return;
                                    var msgBox = ge("app_sms_tt_error");
                                    val(msgBox, text);
                                    show(msgBox);
                                    unlockButton(sendButton);
                                },
                                onDone: function() {
                                    this.ttDestroyAll();
                                    box.hide();
                                    var msg = getLang('apps_install_push_sent_msg');

                                    unlockButton(sendButton);
                                    addClass(runButton, 'button_disabled');
                                    setStyle(runButton, 'width', buttonSize[0]);
                                    val(runButton, msg);

                                    var runButtonBox = ge('apps_i_run_box');
                                    addClass(runButtonBox, 'sent');
                                    val(runButtonBox, msg);
                                    this.adjustRunBoxSize(runButtonBox);
                                }.bind(this)
                            });
                        }.bind(this), 'yes');
                        box.addButton(getLang('global_cancel'), box.hide, 'no');
                        box.show();
                    }
                }.bind(this)
            });
        }
    },

    /* App */

    deletingApp: false,

    showInviteBox: function(aid, hash) {
        if (!aid) {
            aid = cur.app.options.aid;
            hash = cur.app.options.hash;
        }
        showTabbedBox('al_friends.php', {
            act: 'select_friends_box',
            Checked: '',
            invite: 1,
            aid: aid,
            from: 'apps'
        }, {
            stat: ['privacy.js', 'ui_controls.js', 'ui_controls.css'],
            cache: 1,
            params: {
                dark: 1
            }
        });
        cur.onFlistSave = function(ids, list) {
            ajax.post('apps', {
                act: 'invite_friends',
                aid: aid,
                friends: ids.join(','),
                hash: hash
            }, {
                onDone: function(title, text) {
                    setTimeout(showFastBox({
                        title: title
                    }, text).hide, 2000);
                },
                onFail: function(text) {
                    setTimeout(showFastBox({
                        title: getLang('global_error')
                    }, text).hide, 2000);
                    return true;
                }
            })
        }
    },

    showAppFriends: function(aid, ev) {
        return !showBox(Apps.address, {
            act: 'show_app_friends_box',
            aid: aid
        }, {
            cache: 1,
            params: {
                width: '400px',
                bodyStyle: 'padding: 0px'
            },
            stat: ['boxes.css'],
            dark: 1
        }, ev);
    },

    recountAddVotes: function(obj) {
        var add_val = obj.value.replace(/[^0-9]/g, '');
        val('add_votes', langNumeric(add_val, votes_flex))
        if (add_val > 0 && ge('app_pay_withdraw')) {
            ge('app_pay_withdraw').value = 0;
            this.recountWithdrawVotes(ge('app_pay_withdraw'));
        }
    },

    recountWithdrawVotes: function(obj) {
        var withdraw_val = obj.value.replace(/[^0-9]/g, '');
        val('withdraw_votes', langNumeric(withdraw_val, votes_flex));
        if (withdraw_val > 0) {
            ge('app_pay_add').value = 0;
            this.recountAddVotes(ge('app_pay_add'));
        }
    },

    initAppView: function(params, options) {
        var stateCallback = function(e) {
            if (e.type == 'block') {
                cur.app.runCallback('onWindowBlur');
            } else {
                cur.app.runCallback('onWindowFocus');
            }
        };

        cur.app.onReady.push(function() {
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

    loadSettings: function(data) {
        ajax.post(
            this.address, {
                act: 'show_settings',
                aid: cur.aid
            },
            extend({
                cache: 1
            }, data)
        );
    },

    showSettings: function() {
        this.ttHideAll();
        if (cur.settShown) {
            scrollToTop(200);
            cur.settShown = false;
            delete ajaxCache['/apps#act=show_settings&aid=' + cur.aid];
        } else {
            showBox(this.address, {
                act: 'show_settings',
                aid: cur.aid
            }, {
                params: {
                    dark: 1
                }
            });
        }
    },

    saveSettings: function(aid, hash, onlyCheckboxes, extOpts) {
        if (cur.savingSettings) return;
        if (!onlyCheckboxes) {
            if (extOpts && extOpts.btn) {
                lockButton(extOpts.btn);
            }
            show('apps_settings_progress');
        }

        var box = curBox(),
            payAdd = ge('app_pay_add'),
            payWidthdraw = ge('app_pay_withdraw'),
            params = {
                act: 'save_settings',
                aid: aid,
                hash: hash,
                from: 'appview',
                app_settings_1: isChecked('app_settings_1'),
                app_settings_256: isChecked('app_settings_256'),
                add: (payAdd ? payAdd.value : 0),
                withdraw: (payWidthdraw ? payWidthdraw.value : 0),
                only_checkboxes: (onlyCheckboxes ? 1 : 0),
                cur_aid: cur.aid
            };
        if (isVisible('app_settings_2097152')) {
            params.app_settings_2097152 = isChecked('app_settings_2097152');
        }
        ajax.post('apps', params, extend({
            onDone: function(result) {
                extOpts && extOpts.btn && unlockButton(extOpts.btn);
                result.left_nav && this.updateLeftNav(result.left_nav);

                !onlyCheckboxes && cur.app && cur.app.runCallback('onSettingsChanged', result.settings);
                cur.settingsOnLoad = false;
                result.coins !== undefined && cur.app && cur.app.balanceUpdated(result.coins);
                result.balance !== undefined && updateMoney(result.balance);

                box && !onlyCheckboxes && box.hide();

                if (result.left_nav_error) {
                    onlyCheckboxes && checkbox('app_settings_256', result.settings & 256);
                    var errorBox = new MessageBox({
                        title: getLang('global_error')
                    });
                    errorBox.content(result.left_nav_error).addButton(getLang('global_close'), errorBox.hide, 'yes').show();
                }

                this.updateAddToMenuAction();
            }.bind(this),
            onFail: function(text) {
                text && val('apps_settings_error', text);
                show('apps_settings_error');
                hide('apps_settings_progress');
                scrollToTop(200);
            },
            showProgress: function() {
                cur.savingSettings = true;
                box && onlyCheckboxes && box.showProgress();
            },
            hideProgress: function() {
                cur.savingSettings = false;
                box && onlyCheckboxes && box.hideProgress();
            }
        }, extOpts || {}));
    },

    updateAddToMenuAction: function() {
        var obj = ge('app_add_to_menu_action');
        if (obj && cur.aid && cur.app && cur.app.options) {
            var show = ge('l_app' + cur.aid);
            actionsMenuItemLocked(obj) && unlockActionsMenuItem(obj);
            obj.setAttribute('onclick', "return Apps.addToMenu(" + cur.aid + ", '" + cur.app.options.hash + "', " + intval(!show) + ", this);");
            val(obj, show ? getLang('apps_remove_from_left_menu') : getLang('apps_add_to_left_menu'));
        }
    },

    addToMenu: function(aid, hash, show, obj) {
        if (actionsMenuItemLocked(obj)) return;

        ajax.post('al_apps.php', {
            act: 'a_left_menu',
            aid: aid,
            hash: hash,
            show: show
        }, {
            onDone: function(result) {
                this.updateLeftNav(result.left_nav);
                result.left_nav_error && showFastBox({
                    title: getLang('global_error')
                }, result.left_nav_error);
                this.updateAddToMenuAction();
            }.bind(this),
            showProgress: lockActionsMenuItem.pbind(obj),
            hideProgress: unlockActionsMenuItem.pbind(obj)
        });
    },

    showAppSettings: function(aid, info) {
        this.ttHideAll();
        if (info) {
            showBox(this.address, {
                act: 'settings_box_info',
                aid: aid
            }, {
                params: {
                    dark: 1
                }
            });
        } else {
            showBox(this.address, {
                act: 'settings_box',
                aid: aid,
                mask: 0,
                main: 1
            }, {
                params: {
                    dark: 1
                }
            });
        }
    },

    updateOnline: function() {
        ajax.post(Apps.address, {
            act: 'update_online',
            aid: cur.aid,
            hash: cur.app.options.hash
        }, {
            ads: 1
        });
    },

    updateOffline: function(c) {
        ajax.post(Apps.address, {
            act: 'update_offline',
            aid: (c || cur).aid,
            hash: (c || cur).app.options.hash
        });
    },

    deleteApp: function(aid, hash, obj, type) {
        if (this.deletingApp) return;
        this.deletingApp = true;

        var doDeleteApp = function(onDone, onFail, showProgress, hideProgress) {
            ajax.post(this.address, {
                act: 'quit',
                id: aid,
                hash: (hash || cur.app.options.hash),
                from: 'app'
            }, {
                onDone: this.withFastBackCheck(function(data) {
                    this.deletingApp = false;
                    window.appsListChanged = true;
                    this.notificationsSetCounters(data.count_all);
                    data.left_nav && this.updateLeftNav(data.left_nav);
                    cur._back = false;
                    onDone.apply(null, [].slice.call(arguments));
                }.bind(this)),
                onFail: this.withFastBackCheck(function() {
                    this.deletingApp = false;
                    onFail.apply(null, [].slice.call(arguments));
                }.bind(this)),
                showProgress: showProgress,
                hideProgress: hideProgress
            });
        }.bind(this);

        switch (type) {
            case 'appactions':
                doDeleteApp(
                    function() {
                        //nav.go('/apps', false);
                    },
                    function(error) {
                        if (error) {
                            showFastBox({
                                title: getLang('global_error')
                            }, error);
                        }
                        unlockActionsMenuItem(obj);
                    },
                    lockActionsMenuItem.pbind(obj)
                );
                break;

            default:
                var box = curBox();
                doDeleteApp(
                    function() {
                        //nav.go('/apps', false);
                    },
                    function(error) {
                        if (error) {
                            var boxError = ge('apps_settings_error');
                            val(boxError, error);
                            show(boxError);
                            scrollToTop();
                        }
                        box && box.hideProgress()
                    },
                    function() {
                        box && box.showProgress();
                    }
                );
                break;
        }
    },

    reportApp: function(aid, place_id) {
        showBox('al_reports.php', {
            act: 'report_app_box',
            app_id: aid,
            place_id: place_id
        }, {
            params: {
                dark: 1
            },
            stat: ['ui_controls.js', 'ui_controls.css']
        });
    },

    cancelInstall: function() {
        //nav.go('/apps', false);
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
            val(obj, '<img src="/images/upload' + (hasClass(bodyNode, 'is_2x') ? '_2x' : '') + '.gif" width="32" height="8"/>');
        }
        if (btn) {
            lockButton(btn);
        }
        window.appsListChanged = 1;
        nav.go(loc, false, {
            pass: true
        });
    },

    installApp: function(aid, hash, callback) {
        ajax.post(
            Apps.address, {
                act: 'do_install',
                aid: aid,
                hash: hash
            }, {
                onDone: function(oldCur) {
                    if (oldCur != cur) return;
                    Apps.onAppAdded();
                    callback && callback();
                }.pbind(cur)
            }
        );
    },

    onAppAdded: function() {
        window.appsListChanged = true;
        if (cur.preload) delete cur.preload.before;
        if (cur.app) {
            cur.app.runCallback('onApplicationAdded');
            cur.appUser = true;
            hide('apps_install_btn');
            show('apps_show_settings');
        }
    },

    /* App rate */

    rateOver: function(el) {
        if (!cur.rated && !hasClass(el, 'not_installed')) addClass(el, 'over');
        var stars = '',
            lines = [],
            cnt = 0,
            text = cur.appUser ? (cur.userRate ? getLang('apps_you_voted') : getLang('apps_you_not_voted')) : getLang('apps_rating_title'),
            label = rs(cur.rateStatsLabelTpl, {
                label: text
            });
        for (var i in (cur.rateStats || {})) {
            cnt += intval(cur.rateStats[i]);
        }
        val('app_rate_label', text);
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
                setStyle(geByClass1('app_rate_bg', row), {
                    width: percent + '%'
                });
                val(geByClass1('app_rate_percent', row), percent + '%');
                val(geByClass1('app_rate_cnt', row), rateCntText);
                geByClass1('app_rate_stars', row).className = 'app_rate_stars fl_l ' + classname;
            }
        }
        label += lines.reverse().join('');

        showTooltip(el, {
            text: label,
            slideX: 15,
            className: 'app_rate_tt',
            shift: [(cur.installPage ? -70 : -66), 0, -36],
            forcetodown: true,
            dir: 'left',
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
        ajax.post('/al_apps.php', {
            act: 'rate_app',
            aid: cur.aid,
            rate: rate,
            hash: cur.rate_hash
        }, {
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

    /* Recent tabs */

    recentTabsUpdate: function(needApps, needNotifications) {
        if (cur.rAppsWrap && cur.rNotWrap) {
            needApps = window.appsListChanged || needApps,
                needNotifications = window.notificationsListChanged || needNotifications;
            delete window.appsListChanged;
            delete window.notificationsListChanged;
            if (!needApps && !needNotifications) return;
            ajax.post(this.address, {
                act: 'update_recent',
                notifications: needNotifications,
                apps: needApps,
                hash: cur.recentUpdateHash
            }, {
                onDone: this.withFastBackCheck(function(apps, notifications) {
                    if (apps) {
                        each(geByClass('apps_recent_row', cur.rAppsWrap), function(i, el) {
                            re(el);
                        });
                        if (apps[0]) {
                            show(cur.rAppsShowMoreButton);
                            hide(cur.rAppsNoContent);
                            domInsertBefore(cf(apps[0]), cur.rAppsShowMoreButton);
                        } else {
                            hide(cur.rAppsShowMoreButton);
                            show(cur.rAppsNoContent);
                        }
                        cur.recentOffset = apps[1];
                        if (apps[2]) {
                            apps[2] = eval('(' + apps[2] + ')');
                            for (var i in apps[2]) cur.apps[apps[2][i][0]] = apps[2][i];
                        }
                    }
                    if (notifications) {
                        each(geByClass('apps_notification_row', cur.rNotWrap), function(i, el) {
                            re(el);
                        });
                        var tab = ge('apps-recent-notifications-tab');
                        if (notifications[0]) {
                            (notifications[2] ? hide : show)(cur.rNotShowMoreButton);
                            show(tab);
                            hide(cur.rNotNoContent);
                            domInsertBefore(cf(notifications[0]), cur.rNotShowMoreButton);
                        } else {
                            hide(cur.rNotShowMoreButton);
                            show(cur.rNotNoContent);
                            nav.objLoc.tab != 'notifications' && hide(tab);
                        }
                        cur.notificationsOffset = notifications[1];
                        this.notificationsSetCounters(notifications[3]);
                        this.notificationsInit(); // in case notifications were empty before
                    }
                }.bind(this)),
                showProgress: function() {
                    needApps && addClass(cur.rAppsWrap, this.optionLoadingClass);
                    needNotifications && addClass(domPN(cur.rNotWrap), this.optionLoadingClass);
                },
                hideProgress: this.withFastBackCheck(function() {
                    needApps && removeClass(cur.rAppsWrap, this.optionLoadingClass);
                    needNotifications && removeClass(domPN(cur.rNotWrap), this.optionLoadingClass);
                }.bind(this))
            });
        }
    },

    /* Recent notifications */

    optionNotificationsReadTimeout: 1000,
    notificationsReadTimeout: null,
    notificationsRemovedCount: 0,

    notificationTabSelect: function() {
        nav.objLoc.tab = 'notifications';
        nav.setLoc(nav.objLoc);
        removeClass(cur.rNotBlackList, this.optionHiddenClass);
        cur.rNotScrollbar && cur.rNotScrollbar.update(false, true);
        this.notificationsReadContent(cur.rNotWrap.scrollTop || 0);
    },

    notificationsInit: function() {
        if (cur.rNotWrap && cur.notificationsOffset && !cur.rNotScrollbar) {
            this.notificationsRemovedCount = 0;
            cur.rNotScrollbar = new Scrollbar(cur.rNotWrap, {
                global: true,
                prefix: 'light_',
                nomargin: true,
                nokeys: true,
                top: 15,
                bottom: 15,
                padding: 0,
                right: vk.rtl ? 'auto' : 13,
                left: !vk.rtl ? 'auto' : 13,
                more: this.notificationsLoadContent.bind(this),
                scrollChange: this.notificationsReadContent.bind(this)
            });
            this.notificationsReadContent(0);
        } else if (cur.rNotWrap && cur.rNotScrollbar) {
            cur.rNotScrollbar.update(false, true);
            this.notificationsReadContent(0);
        }
    },

    notificationsMarkReaded: function(el) {
        el.removeAttribute('data-read');
        removeClass(el, 'apps_notification_row_new');
    },

    notificationsReadContent: function(top) {
        if (nav.objLoc.tab !== 'notifications') return;
        this.notificationsReadTimeout && clearTimeout(this.notificationsReadTimeout);
        this.notificationsReadTimeout = setTimeout(function() {
            var offset = cur.rNotWrap.offsetTop,
                ids = [],
                els = [];
            each(cur.rNotWrap.querySelectorAll('div[data-read="1"]'), function(i, el) {
                if (el.offsetTop - offset + el.offsetHeight / 2 <= top + cur.rNotWrap.offsetHeight) {
                    ids.push(el.getAttribute('data-id'));
                    els.push(el);
                }
            });
            if (ids.length) {
                ajax.post(this.address, {
                    act: 'a_mark',
                    notif_ids: ids.join(','),
                    hash: cur.notificationsHash
                }, {
                    onDone: this.withFastBackCheck(function(count_all) {
                        this.notificationsSetCounters(count_all);
                        each(els, function(i, el) {
                            this.notificationsMarkReaded(el);
                        }.bind(this));
                    }.bind(this))
                });
            }
        }.bind(this), this.optionNotificationsReadTimeout);
    },

    notificationsLoadContent: function() {
        if (!isVisible(cur.rNotShowMoreButton) || isButtonLocked(cur.rNotShowMoreButton)) return;
        lockButton(cur.rNotShowMoreButton);
        ajax.post(this.address, {
            act: 'more_notifications',
            offset: cur.notificationsOffset,
            hash: cur.notificationsHash
        }, {
            onDone: this.withFastBackCheck(function(content, offset, done) {
                unlockButton(cur.rNotShowMoreButton);
                cur.notificationsOffset = offset;
                content && cur.rNotWrap && cur.rNotWrap.insertBefore(cf(content), cur.rNotShowMoreButton);
                done && hide(cur.rNotShowMoreButton);
                cur.rNotScrollbar.update(false, true);
            }),
            onFail: this.withFastBackCheck(function() {
                hide(cur.rNotShowMoreButton);
            })
        });
    },

    notificationsRemoveAll: function(lnk, title, text, hash, event) {
        if (linkLocked(lnk) || checkEvent(event)) return;
        var box = showFastBox({
            title: title
        }, text, getLang('global_delete'), function(btn) {
            ajax.post(this.address, {
                act: 'remove_all_notifications_and_requests',
                hash: hash
            }, {
                onDone: this.withFastBackCheck(function(count_all) {
                    each(geByClass('apps_notification_row', cur.rNotWrap), function(i, el) {
                        re(el);
                    });
                    if (cur.rNotScrollbar) {
                        cur.rNotScrollbar.destroy();
                        cur.rNotScrollbar.hide();
                        delete cur.rNotScrollbar;
                    }
                    hide(cur.rNotShowMoreButton);
                    show(cur.rNotNoContent);
                    this.handlePageCount(count_all);
                }.bind(this)),
                showProgress: function() {
                    lockButton(btn);
                    lockLink(lnk);
                },
                hideProgress: this.withFastBackCheck(function() {
                    unlockButton(btn);
                    unlockLink(lnk);
                    box.hide();
                })
            });
        }.bind(this), getLang('global_cancel'));
        return false;
    },

    notificationsSetCounters: function(val) {
        if (val === void(0)) return;
        // left menu apps counter
        this.handlePageCount(val);
        // tab counter
        if (cur.rNotCounter) {
            var str = val < 1000 ? val + '' : '..' + (val + '').substr(-3);
            val && removeClass(cur.rNotCounter, this.optionHiddenClass);
            val ? removeClass(cur.rNotCounter, 'ui_tab_count_hidden') : addClass(cur.rNotCounter, 'ui_tab_count_hidden');
            animateCount(cur.rNotCounter, str, {
                str: str,
                onDone: val ? void(0) : addClass.pbind(cur.rNotCounter, this.optionHiddenClass)
            });
        }
    },

    rejectRequest: function(button, rid, hash, type) {
        if (buttonLocked(button)) return;
        var block = ge('apps_notification_' + rid);
        this.notificationsMarkReaded(block);
        data(block, 'html', block.innerHTML);
        setStyle(block, {
            minHeight: getSize(block)[1]
        });
        ajax.post(this.address, {
            act: 'reject_' + type,
            rid: rid,
            hash: hash
        }, {
            onDone: this.withFastBackCheck(function(block, html, count_all) {
                html = cf(trim(html));
                this.notificationsRemovedCount++ > 1 && domFC(html).appendChild(cf(cur.notificationsRemoveAllTpl || ''));
                val(block, '');
                block.appendChild(html);
                addClass(block, 'apps_notification_service');
                this.notificationsSetCounters(count_all);
                cur.rNotScrollbar.update(false, true);
            }.bind(this, block)),
            showProgress: lockButton.pbind(button),
            hideProgress: this.withFastBackCheck(unlockButton.pbind(button))
        });
        cur.rNotScrollbar.update(false, true);
        if (cur.preload) delete cur.preload.before;
    },

    requestsRestore: function(lnk, rid, hash) {
        if (linkLocked(lnk)) return;
        var block = ge('apps_notification_' + rid);
        ajax.post(this.address, {
            act: 'request_restore',
            rid: rid,
            hash: hash
        }, {
            onDone: this.withFastBackCheck(function(block, count_all) {
                this.notificationsRemovedCount--;
                val(block, data(block, 'html'));
                removeClass(block, 'apps_notification_service');
                setStyle(block, {
                    minHeight: ''
                });
                this.notificationsSetCounters(count_all);
                cur.rNotScrollbar.update(false, true);
            }.bind(this, block)),
            showProgress: lockLink.pbind(lnk),
            hideProgress: this.withFastBackCheck(unlockLink.pbind(lnk))
        });
        cur.rNotScrollbar.update(false, true);
        if (cur.preload) delete cur.preload.before;
    },

    deleteNotification: function(button, nid, aid, hash) {
        if (buttonLocked(button)) return;
        var block = ge('apps_notification_' + nid);
        setStyle(block, {
            minHeight: getSize(block)[1]
        });
        ajax.post(this.address, {
            act: 'delete_notification',
            nid: nid,
            aid: aid,
            hash: hash
        }, {
            onDone: this.withFastBackCheck(function(block, html, count_all) {
                html = cf(trim(html));
                this.notificationsRemovedCount++ > 1 && domFC(html).appendChild(cf(cur.notificationsRemoveAllTpl || ''));
                val(block, '');
                block.appendChild(html);
                addClass(block, 'apps_notification_service');
                this.notificationsSetCounters(count_all);
            }.bind(this, block)),
            showProgress: lockButton.pbind(button),
            hideProgress: this.withFastBackCheck(unlockButton.pbind(button))
        });
    },

    denyNotifications: function(lnk, nid, aid, hash) {
        if (linkLocked(lnk)) return;
        var block = ge('apps_notification_' + nid);
        setStyle(block, {
            minHeight: getSize(block)[1]
        });
        ajax.post(this.address, {
            act: 'deny_notifications',
            aid: aid,
            hash: hash
        }, {
            onDone: this.withFastBackCheck(function(block, html) {
                addClass(block, 'apps_notification_service');
                html && val(block, html);
            }.pbind(block)),
            showProgress: lockLink.pbind(lnk),
            hideProgress: this.withFastBackCheck(unlockLink.pbind(lnk))
        });
    },

    requestsBanUser: function(lnk, rid, mid, hash) {
        if (linkLocked(lnk)) return;
        var block = ge('apps_notification_' + rid);
        setStyle(block, {
            minHeight: getSize(block)[1]
        });
        ajax.post(this.address, {
            act: 'request_ban_user',
            mid: mid,
            hash: hash
        }, {
            onDone: this.withFastBackCheck(function(block, html) {
                addClass(block, 'apps_notification_service');
                html && val(block, html);
            }.pbind(block)),
            showProgress: lockLink.pbind(lnk),
            hideProgress: this.withFastBackCheck(unlockLink.pbind(lnk))
        });
    },

    /* Recent apps, settings */

    removingApp: false,
    restoringApp: false,

    appsTabSelect: function(needUpdateContent) {
        delete nav.objLoc.tab;
        nav.setLoc(nav.objLoc);
        addClass(cur.rNotBlackList, this.optionHiddenClass);
    },

    updateLeftNav: function(html) {
        html && val(geByTag1('ol', ge('side_bar')), html);
    },

    restoreApp: function(aid, hash, gidhash) {
        if (this.restoringApp) return false;
        var wrap = ge('app' + aid);
        cur.deletedApps[aid] && cur.deletedApps[aid].from == 'al_apps' && val(geByClass1('app_deleted_layer', wrap, 'div'), cur.progressTpl);
        ajax.post(this.address, {
            act: 'join',
            gid: cur.gid,
            gidhash: gidhash,
            id: aid,
            hash: hash,
            restore: 1,
            from: 'al_apps',
            section: cur.section
        }, {
            onDone: this.withFastBackCheck(function(result) {
                if (cur.deletedApps[aid]) {
                    val(wrap, cur.deletedApps[aid].html);
                    result.left_nav && this.updateLeftNav(result.left_nav);
                    delete cur.deletedApps[aid];
                }
                if (cur.apps[aid]) {
                    delete cur.apps[aid].deleted;
                    cur.appsIndex.add(cur.apps[aid]);
                }
                removeClass(wrap, 'deleted');
            }.bind(this)),
            showProgress: function() {
                this.restoringApp = true;
                addClass(wrap, this.optionLoadingClass);
            }.bind(this),
            hideProgress: this.withFastBackCheck(function() {
                this.restoringApp = false;
                removeClass(wrap, this.optionLoadingClass);
            }.bind(this))
        });
        return false;
    },

    removeApp: function(aid, hash, recent, event, isGame) {
        event && cancelEvent(event);
        if (this.removingApp) return false;
        if (this.isDelayedOnSilentLoad('removeApp' + aid, this.removeApp.bind(this, aid, hash, recent))) return false;
        this.ttHideAll();
        var wrap = recent ? ge('recent' + aid) : ge('app' + aid),
            from = wrap && cur.lContent && cur.lContent.contains(wrap) && this.isSection('settings') ? 'settings' : (recent ? 'recent' : 'al_apps'),
            doRemoveApp = function() {
                if (from == 'al_apps') {
                    var deletedLayer = wrap && geByClass1('app_deleted_layer', wrap, 'div');
                    val(deletedLayer, cur.progressTpl);
                } else if (from == 'recent') {
                    var newRow = cur.rAppsWrap && geByClass1('apps_recent_row_hidden', cur.rAppsWrap);
                }
                ajax.post(
                    this.address, {
                        act: 'quit',
                        gid: cur.gid,
                        id: aid,
                        hash: hash,
                        offset: cur.recentOffset,
                        from: from
                    }, {
                        onDone: this.withFastBackCheck(function(result) {
                            if (cur.module != 'apps') return;

                            delete cur.preload;
                            if (nav.objLoc.tab != 'notifications' && cur.rNotWrap && this.isSection('catalog', 'list')) {
                                this.recentTabsUpdate(false, true);
                            } else {
                                window.notificationsListChanged = true;
                                result.count_all && this.notificationsSetCounters(result.count_all);
                            }
                            window.appsListChanged = true;

                            if (cur.apps[aid]) {
                                cur.appsIndex.remove(cur.apps[aid]);
                                cur.apps[aid].deleted = true;
                            }

                            result.left_nav && this.updateLeftNav(result.left_nav);

                            if (from == 'settings') {
                                cur.deletedApps[aid] = {
                                    from: from,
                                    html: wrap.innerHTML
                                };
                                wrap && wrap.appendChild(cf(result.html));
                            } else if (from == 'recent') {
                                newRow && removeClass(newRow, 'apps_recent_row_hidden');
                                hide(wrap);
                                result.html && domInsertBefore(cf(result.html), cur.rAppsShowMoreButton);
                                if (!geByClass1('apps_recent_row', cur.rAppsWrap)) { // no more recent apps
                                    hide(cur.rAppsShowMoreButton);
                                    show(cur.rAppsNoContent);
                                    cur.recentOffset = 0;
                                } else {
                                    cur.recentOffset += result.offset;
                                }
                            } else {
                                cur.deletedApps[aid] = {
                                    from: from,
                                    html: wrap.innerHTML
                                };
                                result.html && val(deletedLayer, result.html);
                            }
                            addClass(wrap, 'deleted');
                        }.bind(this)),
                        showProgress: function() {
                            addClass(wrap, this.optionLoadingClass);
                            this.removingApp = true;
                        }.bind(this),
                        hideProgress: this.withFastBackCheck(function() {
                            removeClass(wrap, this.optionLoadingClass);
                            this.removingApp = false;
                        }.bind(this))
                    });
            }.bind(this);

        if (from == 'recent') {
            var box = showFastBox({
                    title: getLang('apps_quit_app_box_title')
                },
                getLang(isGame ? 'apps_game_quit_confirm' : 'apps_quit_confirm'),
                getLang('apps_remove'),
                function() {
                    doRemoveApp();
                    box.hide();
                },
                getLang('global_cancel')
            );
        } else if (cur.adminApps && cur.adminApps[aid]) {
            var box = showFastBox({
                    title: getLang('apps_deletingapp')
                },
                getLang('apps_admin_quit'),
                getLang('global_delete'),
                function() {
                    doRemoveApp();
                    box.hide();
                },
                getLang('global_cancel')
            );
        } else {
            doRemoveApp();
        }
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
        var url = '/' + domain + '?join=1&hash=' + hash + '&sett=' + sett;
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
                url += '&ref=' + ref;
            }
        }
        if (mid) {
            url += '&mid=' + mid;
        }
        if (nav.objLoc['#']) {
            url += '#' + nav.objLoc['#'];
        }
        nav.go(url);
    },

    /* Feed */

    updatesInterval: null,

    stopUpdates: function() {
        this.updatesInterval && clearInterval(this.updatesInterval);
    },

    initUpdates: function(opts) {
        if (opts && opts.key) cur.updatesKey = opts.key;
        var checkCb = function() {
            if (window.Notifier && cur.updatesKey) {
                var res = Notifier.addKey(cur.updatesKey, function(key, data) {
                    if (!cur.updatesKey) return;
                    if (data.events) {
                        for (var i in data.events) {
                            this.parseEvent(data.events[i]);
                        }
                    }
                    if (data.ts) {
                        cur.updatesKey.ts = data.ts;
                    }
                }.bind(this));
            }
        }.bind(this);
        checkCb();
        this.updatesInterval = setInterval(checkCb, 10000);
        cur.destroy.push(this.stopUpdates.bind(this));
    },

    parseEvent: function(ev) {
        var ev = ev.split('<!>'),
            evVer = ev[0];
        if (!cur.updatesVersion || evVer != cur.updatesVersion) return;

        var needOperaFix = browser.opera && intval(browser.version) <= 12,
            html = ev[3],
            d = new Date(),
            h = d.getHours(),
            m = d.getMinutes();
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        html = html.replace('{date}', h + ':' + m);
        var el = cf(html);

        if (cur.fWrap) {
            addClass(el, 'apps_feed_row_just_added');
            cur.fWrap.insertBefore(el, domFC(cur.fWrap));

            function handler() {
                cur.fScrollbar && cur.fScrollbar.update(false, true);
                if (needOperaFix) {
                    el.removeEventListener('oTransitionEnd', handler);
                } else {
                    removeEvent(el, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', handler);
                }
            }
            if (needOperaFix) {
                el.addEventListener('oTransitionEnd', handler);
            } else {
                addEvent(el, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', handler);
            }
            setTimeout(removeClass.pbind(el, 'apps_feed_row_just_added'), 10);
            window.tooltips && tooltips.hideAll();
        }
    },

    feedInit: function() {
        if (cur.fWrap && cur.feedOffset && !cur.fScrollbar) {
            cur.fScrollbar = new Scrollbar(cur.fWrap, {
                global: true,
                prefix: 'light_',
                nomargin: true,
                nokeys: true,
                bottom: 15,
                padding: 0,
                right: vk.rtl ? 'auto' : 13,
                left: !vk.rtl ? 'auto' : 13,
                more: this.feedLoadContent.bind(this)
            });
        }
    },

    feedLoadContent: function() {
        if (!isVisible(cur.fShowMoreButton) || isButtonLocked(cur.fShowMoreButton)) return;
        ajax.post(this.address, {
            act: 'more_feed',
            offset: cur.feedOffset,
            hash: cur.feedHash
        }, {
            onDone: this.withFastBackCheck(function(content, offset, done) {
                cur.feedOffset = offset;
                content && cur.fWrap && cur.fWrap.insertBefore(cf(content), cur.fShowMoreButton);
                done && hide(cur.fShowMoreButton);
                cur.fScrollbar.update(false, true);
            }),
            showProgress: lockButton.pbind(cur.fShowMoreButton),
            hideProgress: this.withFastBackCheck(unlockButton.pbind(cur.fShowMoreButton))
        });
    },

    /* Tooltips */

    myAppOver: function(aid, el, noSize) {
        if (hasClass(el, 'deleted') || !vk.id) return false;
        showTooltip(el, {
            url: this.address,
            params: {
                act: 'show_app_friends_tt',
                aid: aid,
                no_size: noSize ? 1 : 0
            },
            typeClass: 'tt_black',
            slide: 15,
            center: 1,
            shift: [0, 8, 8],
            ajaxdt: 200,
            showdt: 300,
            hidedt: 200,
            dir: 'auto',
        });
    },

    ttScore: function(obj, name, info) {
        var showsp = void(0);
        if (cur.ttScoreShown && window.tooltips) {
            tooltips.hideAll();
            showsp = 0;
        }
        return showTooltip(obj, {
            center: 1,
            black: 1,
            shift: [0, 8, 8],
            showsp: showsp,
            text: '<div class="apps_score_tt_cont"><b>'.concat(name, '</b>', (info ? '<div class="apps_score_tt">' + info + '</div>' : ''), '</div>')
        });
    },

    ttCommon: function(obj, text, opts) {
        opts = extend({
            parent: void 0,
            center: void 0,
            event: 0,
            appendEl: void 0,
            shift: void 0
        }, opts);
        if (opts.event === 0) opts.event = window.event;
        opts.event && cancelEvent(opts.event);
        if (opts.appendEl) opts.appendEl = ge(opts.appendEl);
        if (opts.center) {
            return showTooltip(obj, {
                center: opts.center,
                shift: opts.shift || [0, 8, 8],
                black: 1,
                appendEl: opts.appendEl,
                text: text
            });
        } else {
            return showTitle(obj, text, opts.shift, opts);
        }
    },

    ttHideAll: function() {
        window.tooltips && tooltips.hideAll();
    },

    ttDestroyAll: function() {
        window.tooltips && tooltips.destroyAll();
    },

    /* Scroll */

    scrollToHeader: function() {
        var aHeader = ge('apps_header_block'),
            pHeader = ge('page_header_cont');
        if (aHeader && pHeader) {
            var top = Math.max(0, getXY(aHeader)[1] - parseInt(getStyle(aHeader, 'marginTop'), 10));
            scrollNode.scrollTop + getSize(pHeader)[1] > top && scrollToY(top, 200);
        }
    },

    scrollToSearch: function() {
        var pHeader = ge('page_header_cont');
        if (cur.aSearchWrap && pHeader) {
            var top = getXY(domPN(cur.aSearchWrap))[1] - getSize(pHeader)[1];
            scrollNode.scrollTop > top && scrollToY(top, 200);
        }
    },

    scrollCheck: function() {
        if (this.isDelayedOnSilentLoad('scrollCheck', this.scrollCheck.bind(this))) return;
        if (!browser.mobile &&
            !cur.isAppsLoading &&
            !cur.disableAutoMore &&
            isVisible(cur.lShowMoreButton) &&
            (window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight) + scrollGetY() + 400 >= cur.lShowMoreButton.offsetTop
        ) this.searchLoadContent();
    },

    /* Search */

    searchFocusedClass: 'apps_search_focused',

    backupListContent: function(copyContent) {
        if (!cur.backupList && !copyContent) {
            cur.backupList = {
                cur: {
                    loadMore: cur.loadMore,
                    shownApps: cur.shownApps,
                    sectionCount: cur.sectionCount,
                    searchOffset: cur.searchOffset
                },
                content: null,
                preload: null,
                contentCopied: false
            };
        } else if (cur.backupList && !cur.backupList.contentCopied && copyContent) {
            cur.backupList.content = document.createDocumentFragment();
            while (cur.lContent.firstChild) cur.backupList.content.appendChild(cur.lContent.firstChild);
            cur.backupList.preload = document.createDocumentFragment();
            while (cur.lPreload.firstChild) cur.backupList.content.appendChild(cur.lPreload.firstChild);
            cur.backupList.contentCopied = true;
        }
    },

    restoreListContent: function() {
        if (cur.backupList) {
            this.searchProgress(false);
            val(cur.lContent, '');
            val(cur.lPreload, '');
            extend(cur, cur.backupList.cur);
            cur.lContent.appendChild(cur.backupList.content);
            cur.lPreload.appendChild(cur.backupList.preload);
            delete cur.backupList;
            return true;
        }
        delete cur.backupList;
        return false;
    },

    indexAll: function(callback) {
        cur.appsIndex = new vkIndexer(cur.appsList['all'], function(obj) {
            try {
                cur.apps[parseInt(obj[0])] = obj;
                return obj[3];
            } catch (e) {
                return '';
            }
        }, callback);
    },

    searchUpdate: function(query) {
        if (this.isDelayedOnSilentLoad('searchUpdate', this.searchUpdate.bind(this, query))) return;

        query = query || '';

        // add query minimum size
        if (query.length < 2) query = '';

        if (cur.ignoreEqual || cur.searchStr !== query) {
            this.isSection('list') && query && this.backupListContent();
            cur.searchStr = query || '';

            // update selection for search query highlighting in generated rows
            var listPrefix = this.isSection('apps', 'settings', 'manage', 'reports', 'ads') ? 'all' : 'search';
            if (query && this.isSection('apps', 'settings', 'manage', 'reports', 'ads')) {
                var res = cur.appsIndex.search(clean(query));
                cur.curList = listPrefix + '_search_' + query;
                cur.appsList[cur.curList] = res;
                query += ' ' + (parseLatin(query) || '');
                query = trim(escapeRE(query).split('&').join('&amp;'));
                cur.selection = {
                    re: new RegExp('(' + query.replace(cur.appsIndex.delimiter, '|') + ')', 'gi'),
                    val: '<span>$1</span>'
                };
            } else {
                cur.curList = listPrefix;
                cur.selection = false;
            }

            // start preparing new content
            this.ttHideAll();
            this.searchProgress(true);
            this.scrollToSearch();
            hide(cur.lShowMoreButton);
            this.isSection('catalog', 'list') && this.searchWriteToAddressBar(); // exclude section that can't filter rows server-side
            cur.loadMore = 1;
            cur.shownApps = cur.searchOffset = 0;
            this.showRows();
        }
        delete cur.ignoreEqual;
    },

    showRows: function() {
        if (this.isDelayedOnSilentLoad('showRows', this.showRows.bind(this))) return;

        if (cur.searchStr) {

            // load list or catalog search content
            // content will be reloaded
            if (this.isSection('list', 'catalog')) {
                this.searchLoadContent();
            }
        } else {

            // restore list content
            // content is cached or will be reloaded
            if (this.isSection('list')) {
                if (!this.restoreListContent()) {
                    extend(cur, {
                        searchOffset: 0,
                        sectionCount: 0,
                        shownApps: 0,
                        loadMore: 0
                    });
                    this.searchCatalog(cur.searchStr, cur.searchOffset);
                }
                window[cur.loadMore ? 'show' : 'hide'](cur.lShowMoreButton);
                return false;
            }

            // restore catalog content
            // content will be reloaded
            if (this.isSection('catalog')) {
                extend(cur, {
                    searchOffset: 0,
                    sectionCount: 0,
                    shownApps: 0,
                    loadMore: 0
                });
                val(cur.lContent, '');
                val(cur.lPreload, '');
                this.switchLayout('catalog');
                this.searchProgress(false);
                this.sliderStart();
                window[cur.loadMore ? 'show' : 'hide'](cur.lShowMoreButton);
                return false;
            }
        }

        // show apps (reports), settings and manage content
        // content is client-side generated
        if (this.isSection('settings', 'manage', 'apps', 'reports', 'ads')) {
            // apps types: 0 all, 1 site, 1 desktop, 3 edit
            if (cur.defaultCount && cur.shownApps < cur.sectionCount) {
                var query = clean(cur.searchStr),
                    allowEditApps = this.isSection('manage'),
                    html = '',
                    list = cur.appsList[cur.curList] || [];
                var total = list.length;
                list = this.filter(list.slice(cur.shownApps)).slice(0, cur.defaultCount);
                if (list.length && cur.appTpl) {
                    var apps = [];
                    each(list, function(i, app) {
                        app = clone(app);

                        // highlight search query in app name
                        if (cur.selection) app[3] = app[3].replace(cur.selection.re, cur.selection.val);
                        apps.push(cur.appTpl(app, i == list.length - 1, allowEditApps));
                    }.bind(this));
                    html = apps.join('');
                }
                if (!cur.shownApps) { // first request
                    if (html) { // normal result
                        val(cur.lContent, html);
                        val(cur.aSummaryCounter, total);
                    } else { // empty result
                        val(cur.lContent, cur.aSummary.innerHTML.replace('{query}', '<b>' + query + '</b>'));
                        val(cur.aSummaryCounter, '');
                    }
                } else if (html) { // futrher requests
                    cur.lContent.appendChild(cf(html));
                }
                cur.shownApps += cur.defaultCount;
                if (cur.shownApps >= cur.sectionCount) { // done
                    hide(cur.lShowMoreButton);
                } else {
                    show(cur.lShowMoreButton);
                    this.scrollCheck()
                }
                this.searchProgress(false);
            }
            return false;
        }

        return true;
    },

    searchLoadContent: function() {
        if (this.isSection('catalog', 'list')) {
            if (!cur.searchStr) cur.searchStr = '';
            if (cur.lPreload.innerHTML) {
                var frag = document.createDocumentFragment();
                while (cur.lPreload.firstChild) frag.appendChild(cur.lPreload.firstChild);
                cur.lContent.appendChild(frag);
            }
            if (!cur.loadMore) {
                cur.loadMore = true;
                hide(cur.lShowMoreButton);
            } else {
                this.searchCatalog(cur.searchStr, cur.searchOffset);
            }
            return false;
        } else if (this.isSection('apps', 'manage', 'settings', 'reports', 'ads')) {
            return this.showRows();
        }
        return true;
    },

    searchCatalog: function(query, offset) {
        query = query || '';
        ajax.post(this.address, {
            act: !query && this.isSection('list') ? cur.list : 'search',
            q: query,
            offset: offset,
            oid: cur.oid,
            from: cur.section,
            catalog_search: 1,
            id: cur.listId || void(0)
        }, {
            cache: query ? 0 : 1,

            onDone: this.withFastBackCheck(function(html, preload, options) {
                if (query != cur.searchStr) return;

                if (this.isSection('catalog', 'list')) {
                    cur.searchStr && this.sliderStop();
                    this.switchLayout(cur.searchStr ? 'list' : cur.section);
                    this.searchWriteToAddressBar();
                }

                this.backupListContent(true);
                html && val(cur.lContent, html);
                val(cur.lPreload, preload || '');
                cur.loadMore = !!preload;
                extend(cur, options);
                cur.loadMore && show(cur.lShowMoreButton);
                this.scrollCheck();
            }.bind(this)),

            showProgress: function() {
                cur.isAppsLoading = true;
                lockButton(cur.lShowMoreButton);
            }.bind(this),

            hideProgress: this.withFastBackCheck(function() {
                cur.isAppsLoading = false;
                this.searchProgress(false);
                unlockButton(cur.lShowMoreButton);
            }.bind(this))
        });
    },

    filter: function(arr) {
        var len = arr.length,
            res = [];
        for (var i = 0; i < len; i++) {
            var t = arr[i];
            if (cur.apps && cur.apps[t[0]] && !cur.apps[t[0]].deleted) {
                res.push(t);
            }
        }
        return res;
    },

    searchLoadFromAddressBar: function() {
        setTimeout(function() {
            cur.searchStr = nav.objLoc.q || '';
        }.bind(this), 0);
    },

    searchWriteToAddressBar: function(query) {
        nav.setLoc(extend(nav.objLoc, {
            q: cur.searchStr ? cur.searchStr : null
        }));
    },

    searchProgress: function(param) {
        cur.aSearch && uiSearch[param ? 'showProgress' : 'hideProgress'](cur.aSearch);
    },

    searchFocused: function() {
        cur.aWrap && addClass(cur.aWrap, Apps.searchFocusedClass);
    },

    searchBlured: function() {
        cur.aWrap && removeClass(cur.aWrap, Apps.searchFocusedClass);
    },

    searchReset: function() {
        cur.aSearch && uiSearch.reset(cur.aSearch);
        cur.searchStr = '';
    },

    /* History and navigation */

    switchLayout: function(type) {
        if (cur.aWrap) {
            removeClass(cur.aWrap, 'apps_catalog_layout');
            removeClass(cur.aWrap, 'apps_list_layout');
            removeClass(cur.aWrap, 'apps_manage_layout');
            removeClass(cur.aWrap, 'apps_settings_layout');
            removeClass(cur.aWrap, 'apps_apps_layout');
            removeClass(cur.aWrap, 'apps_page_layout');
            addClass(cur.aWrap, 'apps_' + type + '_layout');
        }
    },

    geTabBySection: function(section) {
        var el = ge('apps_tab_' + section);
        if (el) {
            el = geByTag1('a', el);
            if (el) return el;
        }
        return false;
    },

    setHistoryBackRules: function() {
        cur._back = {
            show: [
                function() {
                    // move before and header back to current page
                    if (cur._back.swap) each(cur._back.swap, function(i, swap) {
                        swap.dummy.parentNode.replaceChild(swap.content, swap.dummy);
                    });
                    cur.fScrollbar && cur.fScrollbar.restore();
                    cur.rNotScrollbar && cur.rNotScrollbar.restore();
                    delete cur._back.swap;

                    // select needed recent tab
                    setTimeout(function() {
                        var tab = nav.objLoc && (ge(nav.objLoc.tab == 'notifications' ? 'apps-recent-notifications-tab' : 'apps-recent-apps-tab'));
                        tab && this.switchTabPrepared(tab.getElementsByTagName('a')[0]);

                        // update searchStr according to saved value
                        if (cur.aSearch) {
                            uiSearch.startEvents(cur.aSearch);
                            cur.aSearch.value = cur.searchStr || '';
                            uiSearch.scrollResize(cur.aSearch);
                        }
                        this.searchWriteToAddressBar(cur.searchStr);
                    }.bind(this), 0);

                    this.ttHideAll();
                    this.recentTabsUpdate();
                    this.startEvents();

                    // sync tabs
                    if (cur.aTabs) {
                        var tab = this.geTabBySection(this.isSection('list') ? (cur.list + (cur.listId || '')) : cur.section);
                        tab && uiTabs.switchTab(tab);
                        uiTabs.hideProgress(cur.aTabs);
                    }
                }.bind(this)
            ],
            hide: [
                this.stopEvents.bind(this),
                this.ttHideAll.bind(this)
            ],
            text: cur.backLang
        };
    },

    switchTabPrepared: function(tabAnchor) {
        var tabWrap = document.querySelectorAll('div[data-tab="' + domPN(tabAnchor).id + '"]')[0];
        if (!tabWrap) return true;
        var tabGroup = tabWrap.getAttribute('data-tab-group'),
            tabLoc = tabAnchor.getAttribute('href'),
            tabCallback = tabWrap.getAttribute('data-tab-callback'),
            tabWraps = document.querySelectorAll('div[data-tab-group="' + tabGroup + '"]');
        each(tabWraps, function(i, el) {
            if (el !== tabWrap) addClass(el, this.optionHiddenClass);
        }.bind(this));
        uiTabs.switchTab(tabAnchor);
        removeClass(tabWrap, this.optionHiddenClass);
        tabCallback && eval('(function(){' + tabCallback + ';})()');
        return false;
    },

    switchTab: function(section, event, noSearchReset, target) {
        if (event && checkEvent(event)) return true;

        // check if we already in needed section
        if ((this.isSection('list') ? cur.list + cur.listId : section) == cur.section) {
            cur.searchStr && this.searchReset();
            return false;
        }

        // set scroll
        var noscroll = false,
            scrollToHeader = false,
            scrollToTop = false,
            newSection = ~'/apps/catalog/settings/reports/manage/'.indexOf(section) ? section : 'list',
            newLayout = newSection == 'reports' ? 'apps' : newSection;

        if (
            cur.section == 'catalog' && newSection == 'list' ||
            cur.section == 'list' && newSection == 'catalog' ||
            cur.section == 'list' && newSection == 'list'
        ) {
            scrollToHeader = noscroll = true;
        } else if (cur.section !== newSection) {
            scrollToTop = noscroll = true;
        }

        var preload = cur.preload && cur.preload[section];
        if (!cur.preventFastBack &&
            preload &&
            (preload.header !== null || (cur.leavePreloadedHeader || cur.preload.header)) &&
            (preload.before !== null || (cur.leavePreloadedBefore || cur.preload.before))
        ) {
            this.ttDestroyAll();

            var oldWrapper = ge('wrap3'),
                title = ge('title');

            if (cur._back) {
                window.revertLastInlineVideo && revertLastInlineVideo();

                each(cur._back.hide, function(i, func) {
                    func && func();
                });
                globalHistoryDestroy(cur._back.loc || nav.strLoc);
                globalHistory.length > 2 && globalHistoryDestroy(globalHistory[0].loc);

                // swap current content, create restore copy for history
                var oldBefore = ge('apps_before'),
                    oldHeader = ge('apps_header');
                oldWrapper.parentNode.replaceChild(oldWrapper.cloneNode(true), oldWrapper);
                cur.fScrollbar && cur.fScrollbar.restore();
                cur.rNotScrollbar && cur.rNotScrollbar.restore();

                // create custom history object
                var hist = {
                    content: oldWrapper,
                    title: title.innerHTML,
                    loc: cur._back.loc || nav.strLoc,
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
                    hideHeader: title.parentNode && !isVisible(title.parentNode) ? true : void(0)
                };

                // manage backlinks
                hist.back = _tbLink && _tbLink.loc ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : false; // top link
                showBackLink(hist.loc, cur._back.text, 1); // left link

                globalHistory.push(hist);
            } else {
                if (_tbLink) _tbLink.fast = 0;
                processDestroy(cur);
            }

            // create new page vars
            PageID = NextPageID;
            radioBtns = {};
            ajaxCache = {};
            boxQueue.hideAll();
            layerQueue.clear();
            layers.fullhide && layers.fullhide(true);

            // craete new cur
            var oldCur = cur;
            cur = {
                aWrap: ge('apps_wrap'),
                scrollToHeader: scrollToHeader,
                scrollToTop: scrollToTop,
                destroy: [],
                nav: [],
                preload: oldCur.preload,
                _back: oldCur._back
            };

            // update content
            var newJs = [],
                tmp = null;
            // before content
            if (preload.before !== null) {
                // new page has its own before html
                val('apps_before', preload.before);
            } else if (!oldCur.leavePreloadedBefore) {
                // new page hasn't own before and current page hasn't global before, so take preloaded global before
                val('apps_before', oldCur.preload.before[0]);
                newJs.push(oldCur.preload.before[1]);
            } else {
                // new page hasn't own before, current and new pages uses global before
                // replace before from newWrapper with before from oldWrapper if history object was created
                if (oldCur._back) {
                    tmp = {
                        dummy: ce('div'),
                        content: oldBefore
                    };
                    if (!oldCur._back.swap) oldCur._back.swap = [];
                    oldCur._back.swap.push(tmp);
                    oldBefore.parentNode.replaceChild(tmp.dummy, oldBefore);
                    tmp = ge('apps_before');
                    tmp.parentNode.replaceChild(oldBefore, tmp);
                    oldCur.fScrollbar && oldCur.fScrollbar.restore();
                    oldCur.rNotScrollbar && oldCur.rNotScrollbar.restore();
                }
                // extend new cur with vars from old before
                extend(cur, {
                    updatesKey: oldCur.updatesKey,
                    updatesVersion: oldCur.updatesVersion,
                    fScrollbar: oldCur.fScrollbar,
                    feedOffset: oldCur.feedOffset,
                    feedHash: oldCur.feedHash,
                    rNotScrollbar: oldCur.rNotScrollbar,
                    notificationsOffset: oldCur.notificationsOffset,
                    notificationsHash: oldCur.notificationsHash,
                    recentOffset: oldCur.recentOffset,
                    recentUpdateHash: oldCur.recentUpdateHash
                });
            }

            // header content
            if (preload.header !== null) {
                // new page has its own header html
                val('apps_header', preload.header);
            } else if (!oldCur.leavePreloadedHeader) {
                // new page hasn't own header and current page hasn't global header, so take preloaded global header
                val('apps_header', oldCur.preload.header[0]);
                newJs.push(oldCur.preload.header[1]);
            } else {
                // new page hasn't own header, current and new pages uses global header
                // replace header from newWrapper with header from oldWrapper if history object was created
                if (oldCur._back) {
                    tmp = {
                        dummy: ce('div'),
                        content: oldHeader
                    };
                    if (!oldCur._back.swap) oldCur._back.swap = [];
                    oldCur._back.swap.push(tmp);
                    oldHeader.parentNode.replaceChild(tmp.dummy, oldHeader);
                    tmp = ge('apps_header');
                    tmp.parentNode.replaceChild(oldHeader, tmp);
                }
            }

            // other content
            val('apps_after', preload.after || '');
            val('apps_content', preload.content || '');
            val('apps_list_content', preload.list_content || '');
            val('apps_list_preload', preload.list_preload || '');
            this.switchLayout(newLayout);

            // eval new page js
            each(newJs, function(i, js) {
                js && eval('(function(){' + js + ';})()');
            });
            preload.js && eval('(function(){' + preload.js + ';})()');

            __adsUpdate('force');
            nav.objLoc = {
                0: this.address,
                act: section === 'catalog' ? void(0) : section,
                tab: newSection === 'catalog' || newSection === 'list' ? nav.objLoc.tab : void(0),
                mid: nav.objLoc.mid,
                gid: nav.objLoc.gid,
                add: nav.objLoc.add
            };
            nav.setLoc(nav.objLoc);

            this.searchReset();
            var tab = this.geTabBySection(section);
            tab && setTimeout(uiTabs.switchTab.pbind(tab), 0);
            window[cur.loadMore ? 'show' : 'hide'](cur.lShowMoreButton);
            return false;
        } else {
            target && addClass(target, 'apps_header_progress');
            var tab = this.geTabBySection(section);
            if (tab) {
                uiTabs.switchTab(tab);
                uiTabs.showProgress(tab);
            }
            return nav.go({
                0: this.address,
                act: section === 'catalog' ? void(0) : section,
                tab: newSection === 'catalog' || newSection === 'list' ? nav.objLoc.tab : void(0),
                mid: nav.objLoc.mid,
                gid: nav.objLoc.gid,
                add: nav.objLoc.add
            }, false, {
                onDone: function(oldCur) {
                    removeClass(target, 'apps_header_progress');
                    extend(cur, {
                        scrollToHeader: scrollToHeader,
                        scrollToTop: scrollToTop
                    });
                }.pbind(cur),
                noscroll: noscroll
            });
        }
        return true;
    },

    /* Featured slider */

    sliderInit: function() {
        if (cur.section == 'catalog' && !cur.featuredSlider) {
            cur.featuredSlider = new AppsSlider({
                inner: 'apps_featured_slides',
                outer: 'apps_featured_slider',
                next: 'apps_featured_next',
                prev: 'apps_featured_prev',
                onSlide: function(slideId) {
                    window.AdsLight && AdsLight.applyAds();
                }
            });
        }
    },

    sliderStart: function() {
        if (cur.featuredSlider) {
            cur.featuredSlider.slideshowStart();
            cur.featuredSlider.addHandler();
        }
    },

    sliderStop: function() {
        if (cur.featuredSlider) {
            cur.featuredSlider.removeHandler();
            cur.featuredSlider.slideshowStop();
        }
    },

    runUnverified: function(btn, url) {
        Btn.setLoading(btn, true);
        if (nav.hash) {
            url += '#' + nav.hash;
        }
        nav.go(url);
    },

    showUnverifiedBackBtn: function() {
        var btnCls = 'apps_unverifiedAppWarning__btn_back',
            activeCls = 'apps_unverifiedAppWarning__btn_active',
            btn;

        if (window.history && window.history.length > 2) {
            btn = geByClass1(btnCls);
            if (btn) {
                addClass(btn, activeCls);
            }
        }
    },

    unverifiedGoBack: function() {
        window.history.back();
        return false;
    },

};

function trim(text) {
    return (text || '').replace(/^\s+|\s+$/g, '');
}

function rand(mi, ma) {
    return Math.random() * (ma - mi + 1) + mi;
}

function irand(mi, ma) {
    return Math.floor(rand(mi, ma));
}

function getXYRect(obj, notBounding) {
    var rect;
    if (notBounding && getStyle(obj, 'display') == 'inline') {
        var rects = obj.getClientRects();
        rect = rects && rects[0] || obj.getBoundingClientRect();
    } else {
        rect = obj.getBoundingClientRect();
    }

    return rect;
}

function handlePageView(params) {
    var footer = ge('footer_wrap');

    var width = (params.width === undefined) ? vk.width : params.width;
    var widthDec = (params.width_dec === undefined) ? vk.width_dec : params.width_dec;
    var widthDecFooter = (params.width_dec_footer === undefined) ? vk.width_dec_footer : params.width_dec_footer;

    if (vk.noleftmenu != params.noleftmenu || vk.nobottommenu != params.nobottommenu || vk.width != params.width || vk.width_dec_footer != params.width_dec_footer) {
        if (vk.noleftmenu != params.noleftmenu && params.noleftmenu) {
            hide('side_bar');
        }
        if (vk.nobottommenu != params.nobottommenu) {
            if (params.nobottommenu) {
                hide('bottom_nav');
            } else {
                show('bottom_nav');
            }
        }
        if (params.noleftmenu && params.nobottommenu) {
            if (footer) {
                addClass(footer, 'simple');
                footer.style.width = 'auto';
            }
        } else {
            if (footer) {
                removeClass(footer, 'simple');
                footer.style.width = (width - widthDecFooter) + 'px';
            }
        }
    }

    if (vk.notopmenu != params.notopmenu) {
        if (params.notopmenu) {
            hide('quick_search', 'qsearch_border', 'top_search', 'top_invite_link', 'top_menu_wrap');
        } else {
            show('quick_search', 'qsearch_border', 'top_search', 'top_invite_link', 'top_menu_wrap');
        }
    }

    if (width != vk.width || widthDec != vk.width_dec) {
        ge('page_layout').style.width = width + 'px';
        ge('page_header').style.width = width + 'px';
        ge('page_body').style.width = (width - widthDec) + 'px';
        if (ge('ts_wrap') && hasClass(ge('ts_wrap'), 'vk')) ge('ts_wrap').style.width = (width - 191) + 'px';
        setTimeout(updSideTopLink.pbind(true), 0);
        setTimeout(updateSTL, 0);

        try {
            _tbLink.style.maxWidth = (_tbLink.parentNode.offsetWidth - 35) + 'px';
        } catch (e) {}
    }

    if (vk.noleftmenu != params.noleftmenu && !params.noleftmenu) {
        show('side_bar');
    }

    vk.noleftmenu = params.noleftmenu;
    vk.nobottommenu = params.nobottommenu;
    vk.notopmenu = params.notopmenu;
    vk.width = width;
    vk.width_dec = widthDec;
    vk.width_dec_footer = widthDecFooter;
    vk.body_class = params.body_class;

    vk.no_ads = params.no_ads;
    vk.ad_preview = params.ad_preview;
}

function getSize(elem, withoutBounds, notBounding) {
    elem = ge(elem);
    var s = [0, 0],
        de = document.documentElement,
        rect;
    if (withoutBounds && getStyle(elem, 'boxSizing') === 'border-box') {
        withoutBounds = false;
    }
    if (elem == document) {
        s = [Math.max(
            de.clientWidth,
            bodyNode.scrollWidth, de.scrollWidth,
            bodyNode.offsetWidth, de.offsetWidth
        ), Math.max(
            de.clientHeight,
            bodyNode.scrollHeight, de.scrollHeight,
            bodyNode.offsetHeight, de.offsetHeight
        )];
    } else if (elem) {
        function getWH() {
            if ((rect = getXYRect(elem, notBounding)) && rect.width !== undefined) {
                s = [rect.width, rect.height];
            } else {
                s = [elem.offsetWidth, elem.offsetHeight];
            }
            if (!withoutBounds) return;
            var padding = 0,
                border = 0;
            each(s, function(i, v) {
                var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
                each(which, function() {
                    s[i] -= parseFloat(getStyle(elem, 'padding' + this)) || 0;
                    s[i] -= parseFloat(getStyle(elem, 'border' + this + 'Width')) || 0;
                });
            });
        }
        if (!isVisible(elem)) {
            var props = {
                position: 'absolute',
                visibility: 'hidden',
                display: 'block'
            };
            var old = {},
                old_cssText = false;
            if (elem.style.cssText.indexOf('!important') > -1) {
                old_cssText = elem.style.cssText;
            }
            each(props, function(i, v) {
                old[i] = elem.style[i];
                elem.style[i] = v;
            });
            getWH();
            each(props, function(i, v) {
                elem.style[i] = old[i];
            });
            if (old_cssText) {
                elem.style.cssText = old_cssText;
            }
        } else getWH();

    }
    return s;
}

function MD5(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}

function showCaptchaBox(sid, dif, box, o) {
    var done = function(e) {
        if (e && e.keyCode !== undefined && e.keyCode != 10 && e.keyCode != 13) return;
        var key = geByTag1('input', box.bodyNode);
        if (!trim(key.value) && e !== true) {
            elfocus(key);
            return;
        }
        var imgs = geByTag1('img', box.bodyNode);
        var captcha = imgs[0],
            loader = imgs[1];
        removeEvent(key);
        removeEvent(captcha);
        show(geByClass1('progress', box.bodyNode));
        hide(key);
        o.onSubmit(sid, key.value);
    };
    var was_box = box ? true : false;
    var difficulty = intval(dif) ? '' : '&s=1';
    var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
    if (!was_box) {
        var content = '\
<div class="captcha">\
  <div><img src="' + imgSrc + '"/></div>\
  <div><input type="text" class="big_text" maxlength="7" placeholder="' + getLang('global_captcha_input_here') + '" /><div class="progress" /></div></div>\
</div>' + (o.addText || '');
        var js = '';
        box = showFastBox(content);
        /*
         , function() {
         box.submit();
         }, getLang('captcha_cancel'), function() {
         var key = geByTag1('input', box.bodyNode);
         var captcha = geByTag1('img', box.bodyNode);
         removeEvent(key);
         removeEvent(captcha);
         box.hide();
         })
         */
    }
    box.submit = done.pbind(true);
    box.changed = true;
    var key = geByTag1('input', box.bodyNode);
    var captcha = geByTag1('img', box.bodyNode);
    if (was_box) {
        key.value = '';
        captcha.src = '/captcha.php?sid=' + sid + difficulty;
        hide(geByClass1('progress', box.bodyNode));
    }
    show(key);
    addEvent(key, 'keypress', done);
    addEvent(captcha, 'click', function() {
        this.src = '/captcha.php?sid=' + sid + difficulty + '&v=' + irand(1000000, 2000000);
    });
    elfocus(key);
    return box;
}

function showAppsBox(html, js) {
    var box = ge('apps_box');
    hide(ge('apps_test_id'));
    box.innerHTML = html;
    show(box);
    if (js) {
        evalJs(js);
    }
    return box;
}

function hideAppsBox(html) {
    var box = ge('apps_box');
    hide(box);
    box.innerHTML = '';
    show(ge('apps_test_id'));
}

function initOrientationHandler() {
    onBodyResize(function() {
        var frameHeight = window.innerHeight;
        if (cur.with_header) {
            frameHeight -= 44;
        }
        frameHeight = frameHeight + 'px';
        var iframe = geByTag1('iframe');
        if (iframe) {
            iframe.height = frameHeight;
        }
    });
}