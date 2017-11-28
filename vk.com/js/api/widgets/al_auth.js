var WAuth = {

    init: function(options) {
        cur.options = options;

        this.override('lite.js');
        stManager.emitter.addListener('update', this.override.bind(this));

        cur.RpcMethods = {
            onInit: function() {
                var resizeWidget = this.resizeWidget.bind(this);
                setTimeout(resizeWidget, 0);
                setTimeout(resizeWidget, 500);
            }.bind(this),
        };

        try {
            cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                safe: true
            });
            cur.resizeInt = setInterval(this.resizeWidget.bind(this), 1000);
        } catch (e) {
            debugLog(e);
        }
    },

    resizeWidget: function self() {
        var heightEl = geByClass1('_wauth_page');
        if (!heightEl || !cur.Rpc) return;
        var size = getSize(heightEl)[1];
        if (browser.msie && !browser.msie8 || browser.opera) size += 15;
        window.onBodyResize && onBodyResize();
        cur.Rpc.callMethod('resize', size);
    },

    auth: function(btn) {
        lockButton(btn);
        Widgets.oauth({
            onClose: window.gotSession
        }, {
            client_id: cur.options.appId,
            response_type: 'token',
            display: 'popup'
        });
    },

    logout: function() {
        addClass(geByClass1('_wauth_content'), 'wauth_content_loading');
        var iframeEl = ce('iframe');
        iframeEl.onload = function() {
            location.reload();
        };
        iframeEl.src = cur.options.logoutUrl;
        geByClass1('_wauth_utils').appendChild(iframeEl);
        setTimeout(location.reload, 10000);
    },

    toggleFriends: function() {
        toggle(geByClass1('_wauth_friends_list'));
        this.resizeWidget();
    },

    override: function(file) {
        if (!StaticFiles[file] || file !== 'lite.js') return;

        extend(window, {

            showBox: Widgets.showBox(),

            showCaptchaBox: Widgets.showCaptchaBox,

            showReCaptchaBox: Widgets.showReCaptchaBox,

            gotSession: function(data) {
                if (data == -1) {
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                    location.href = location.href + '&1';
                }
                ajax.post('/widget_auth.php', {
                    act: 'a_auth_user',
                    app: cur.options.appId,
                    hash: cur.options.authHash,
                    url: cur.options.authUrl
                }, {
                    onDone: function(result, html) {
                        if (result) {
                            if (result.error) {
                                var errorEl = geByClass1('_wauth_error');
                                val(errorEl, result.error);
                                show(errorEl);
                                hide(geByClass1('_wauth_friends_list'));
                                hide(geByClass1('_wauth_user_block'));
                            } else {
                                if (html) {
                                    val('page_wrap', html);
                                    this.resizeWidget();
                                }
                                cur.Rpc.callMethod('makeAuth', {
                                    uid: result[0],
                                    first_name: result[1],
                                    last_name: result[2],
                                    photo: result[3],
                                    photo_rec: result[4],
                                    session: result[5], // obsolete
                                    hash: result[6] // obsolete
                                });
                            }
                        }
                    }.bind(this),
                    showProgress: lockButton.pbind(geByClass1('_wauth_auth')),
                    hideProgress: unlockButton.pbind(geByClass1('_wauth_auth'))
                });
            }.bind(this)

        });
    }

};

try {
    stManager.done('api/widgets/al_auth.js');
} catch (e) {}