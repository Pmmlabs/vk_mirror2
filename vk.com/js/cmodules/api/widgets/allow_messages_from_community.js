! function(e) {
    function o(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }
    var t = {};
    return o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) o.d(n, r, function(o) {
                return e[o]
            }.bind(null, r));
        return n
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, o.p = "", o(o.s = 373)
}({
    373: function(e, o, t) {
        e.exports = t(77)
    },
    77: function(e, o, t) {
        "use strict";
        t.r(o), window.WAllowMessagesFromCommunity = {
            init: function(e) {
                extend(cur, {
                    height: e.height,
                    groupId: e.groupId,
                    key: e.key,
                    hash: e.hash,
                    allowEl: geByClass1("wallow_messages_from_community_allow"),
                    denyEl: geByClass1("wallow_messages_from_community_deny")
                }), cur.RpcMethods = {
                    onInit: function() {}
                };
                try {
                    cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                        safe: !0
                    })
                } catch (o) {
                    debugLog(o)
                }
                this.override("lite.js"), stManager.emitter.addListener("update", this.override.bind(this))
            },
            allow: function() {
                return cur.progress ? !1 : cur.hash ? void this.allowBox(function(e) {
                    hide(cur.allowEl), show(cur.denyEl), cur.Rpc.callMethod("publish", "widgets.allowMessagesFromCommunity.allowed", e.user_id)
                }) : (Widgets.oauth({
                    onClose: window.gotSession.pbind(!0, this.allow.bind(this))
                }), !1)
            },
            allowBox: function(e) {
                window.allowCallback = isFunction(e) ? e : function() {}, Widgets.popupBoxOpen("widget_allow_messages_from_community.php", {
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
                    onDone: function(e) {
                        hide(cur.denyEl), show(cur.allowEl), cur.Rpc.callMethod("publish", "widgets.allowMessagesFromCommunity.denied", e.user_id)
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
            override: function(e, o) {
                if (StaticFiles[e] || o === !0) switch (e) {
                    case "lite.js":
                        extend(window, {
                            gotSession: function(e, o) {
                                -1 == e ? location.reload() : e && ajax.post("widget_allow_messages_from_community.php", {
                                    act: "get_hash",
                                    group_id: cur.groupId
                                }, {
                                    onDone: function(e) {
                                        e && (cur.hash = e, isFunction(o) && o())
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
    }
});