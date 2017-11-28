var WAllowMessagesFromCommunity = {

    init: function(opts) {
        extend(cur, {
            height: opts.height,
            groupId: opts.groupId,
            key: opts.key,
            hash: opts.hash,
            allowEl: geByClass1('wallow_messages_from_community_allow'),
            denyEl: geByClass1('wallow_messages_from_community_deny')
        });

        cur.RpcMethods = {
            onInit: function() {}
        };

        try {
            cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                safe: true
            });
        } catch (e) {
            debugLog(e);
        }

        this.override('lite.js');
        stManager.emitter.addListener('update', this.override.bind(this));
    },

    allow: function() {
        if (cur.progress) return false;

        if (!cur.hash) {
            Widgets.oauth({
                onClose: window.gotSession.pbind(true, this.allow.bind(this))
            });
            return false;
        }

        this.allowBox(function(response) {
            hide(cur.allowEl);
            show(cur.denyEl);
            cur.Rpc.callMethod('publish', 'widgets.allowMessagesFromCommunity.allowed', response.user_id);
        });
    },

    allowBox: function(callback) {
        window.allowCallback = isFunction(callback) ? callback : function() {};
        Widgets.popupBoxOpen('widget_allow_messages_from_community.php', {
            act: 'allow_box',
            group_id: cur.groupId,
            hash: cur.hash,
            key: cur.key
        }, 'vk_allow_messages_from_community', {
            height: 329
        });
    },

    deny: function() {
        if (cur.progress) return false;

        if (!cur.hash) {
            Widgets.oauth({
                onClose: window.gotSession.pbind(true, this.allow.bind(this))
            });
            return false;
        }

        ajax.post('widget_allow_messages_from_community.php', {
            act: 'deny',
            group_id: cur.groupId,
            hash: cur.hash
        }, {
            onDone: function(response) {
                hide(cur.denyEl);
                show(cur.allowEl);
                cur.Rpc.callMethod('publish', 'widgets.allowMessagesFromCommunity.denied', response.user_id);
            },

            onFail: function() {
                cur.Rpc.callMethod('publish', 'widgets.error');
            },

            showProgress: lockButton.pbind(cur.denyEl),
            hideProgress: unlockButton.pbind(cur.denyEl)
        });
    },

    override: function(file, force) {
        if (!StaticFiles[file] && force !== true) return;
        switch (file) {
            case 'lite.js':
                extend(window, {
                    gotSession: function(autorzied, callback) {
                        if (autorzied == -1) {
                            location.reload();
                        } else if (autorzied) {
                            ajax.post('widget_allow_messages_from_community.php', {
                                act: 'get_hash',
                                group_id: cur.groupId
                            }, {
                                onDone: function(hash) {
                                    if (hash) {
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
};

try {
    stManager.done('api/widgets/al_allow_messages_from_community.js');
} catch (e) {}