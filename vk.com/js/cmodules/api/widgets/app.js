! function(e) {
    function t(o) {
        if (i[o]) return i[o].exports;
        var r = i[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}({
    0: function(e, t, i) {
        e.exports = i(31)
    },
    31: function(e, t) {
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
                    showReCaptchaBox: Widgets.showReCaptchaBox,
                    gotSession: function(e) {
                        location.reload()
                    }
                })
            }
        };
        try {
            stManager.done(jsc("api/widgets/app.js"))
        } catch (i) {}
    }
});