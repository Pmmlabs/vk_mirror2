! function(o) {
    function e(n) {
        if (t[n]) return t[n].exports;
        var s = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return o[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports
    }
    var t = {};
    return e.m = o, e.c = t, e.d = function(o, t, n) {
        e.o(o, t) || Object.defineProperty(o, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, e.r = function(o) {
        Object.defineProperty(o, "__esModule", {
            value: !0
        })
    }, e.n = function(o) {
        var t = o && o.__esModule ? function() {
            return o["default"]
        } : function() {
            return o
        };
        return e.d(t, "a", t), t
    }, e.o = function(o, e) {
        return Object.prototype.hasOwnProperty.call(o, e)
    }, e.p = "", e(e.s = 559)
}({
    103: function(o, e, t) {
        "use strict";
        t.r(e), window.WAllowMessagesFromCommunity = {
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
        } catch (n) {}
    },
    559: function(o, e, t) {
        o.exports = t(103)
    }
});