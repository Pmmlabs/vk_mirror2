! function(e) {
    function t(i) {
        if (o[i]) return o[i].exports;
        var r = o[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var o = {};
    return t.m = e, t.c = o, t.p = "", t(0)
}([function(e, t, o) {
    e.exports = o(4)
}, , , , function(e, t) {
    "use strict";
    window.WApp = {
        init: function(e) {
            e = e || {}, cur.options = e, extend(cur, {
                noAwayCheck: !0,
                height_el: ge("page_wrap")
            }), this.override("lite.js"), stManager.emitter.addListener("update", this.override.bind(this)), cur.RpcMethods = {
                onInit: function() {
                    addEvent(window, "resize", onBodyResize), uiScroll.addResizeSensor(cur.height_el, WApp.onresize)[1]()
                }
            };
            try {
                cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                    safe: !0
                })
            } catch (t) {
                debugLog(t)
            }
        },
        onresize: function() {
            if (cur.height_el) {
                var e = getSize(cur.height_el);
                cur.Rpc && cur.Rpc.callMethod("resize", e[1])
            }
        },
        override: function(e, t) {
            !StaticFiles[e] && t !== !0 || "lite.js" !== e || extend(window, {
                showTooltip: Widgets.showTooltip,
                showCaptchaBox: Widgets.showCaptchaBox,
                showReCaptchaBox: Widgets.showReCaptchaBox,
                gotSession: function(e) {
                    location.reload()
                }
            })
        }
    };
    try {
        stManager.done(jsc("api/widgets/app.js"))
    } catch (o) {}
}]);