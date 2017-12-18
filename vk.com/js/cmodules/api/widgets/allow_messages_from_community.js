! function(o) {
    function e(t) {
        if (s[t]) return s[t].exports;
        var i = s[t] = {
            exports: {},
            id: t,
            loaded: !1
        };
        return o[t].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
    }
    var s = {};
    return e.m = o, e.c = s, e.p = "", e(0)
}([function(o, e, s) {
    o.exports = s(3)
}, , , function(o, e) {
    "use strict";
    window.WAllowMessagesFromCommunity = {
        init: function(o) {
            extend(cur, {
                height: o.height,
                groupId: o.groupId,
                key: o.key,
                hash: o.hash,
                allowEl: geByClass1("wallow_messages_from_community_allow"),
                denyEl: geByClass1("wallow_messages_from_community_deny")
            }), cur.RpcMethods = {
                onInit: function() {}
            };
            try {
                cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                    safe: !0
                })
            } catch (e) {
                debugLog(e)
            }
            this.override("lite.js"), stManager.emitter.addListener("update", this.override.bind(this))
        },
        allow: function() {
            return cur.progress ? !1 : cur.hash ? void this.allowBox(function(o) {
                hide(cur.allowEl), show(cur.denyEl), cur.Rpc.callMethod("publish", "widgets.allowMessagesFromCommunity.allowed", o.user_id)
            }) : (Widgets.oauth({
                onClose: window.gotSession.pbind(!0, this.allow.bind(this))
            }), !1)
        },
        allowBox: function(o) {
            window.allowCallback = isFunction(o) ? o : function() {}, Widgets.popupBoxOpen("widget_allow_messages_from_community.php", {
                act: "allow_box",
                group_id: cur.groupId,
                hash: cur.hash,
                key: cur.key
            }, "vk_allow_messages_from_community", {
                height: 329
            })
        },
        deny: function() {
            return cur.progress ? !1 : cur.hash ? void ajax.post("widget_allow_messages_from_community.php", {
                act: "deny",
                group_id: cur.groupId,
                hash: cur.hash
            }, {
                onDone: function(o) {
                    hide(cur.denyEl), show(cur.allowEl), cur.Rpc.callMethod("publish", "widgets.allowMessagesFromCommunity.denied", o.user_id)
                },
                onFail: function() {
                    cur.Rpc.callMethod("publish", "widgets.error")
                },
                showProgress: lockButton.pbind(cur.denyEl),
                hideProgress: unlockButton.pbind(cur.denyEl)
            }) : (Widgets.oauth({
                onClose: window.gotSession.pbind(!0, this.allow.bind(this))
            }), !1)
        },
        override: function(o, e) {
            if (StaticFiles[o] || e === !0) switch (o) {
                case "lite.js":
                    extend(window, {
                        gotSession: function(o, e) {
                            -1 == o ? location.reload() : o && ajax.post("widget_allow_messages_from_community.php", {
                                act: "get_hash",
                                group_id: cur.groupId
                            }, {
                                onDone: function(o) {
                                    o && (cur.hash = o, isFunction(e) && e())
                                }
                            })
                        }
                    })
            }
        }
    };
    try {
        stManager.done(jsc("api/widgets/allow_messages_from_community.js"))
    } catch (s) {}
}]);