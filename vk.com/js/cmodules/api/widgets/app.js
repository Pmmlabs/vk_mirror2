! function(e) {
    function t(i) {
        if (r[i]) return r[i].exports;
        var n = r[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
}({
    0: function(e, t, r) {
        e.exports = r(82)
    },
    82: function(e, t) {
        "use strict";
        var r = function() {
            function e(e, t) {
                var r = [],
                    i = !0,
                    n = !1,
                    o = void 0;
                try {
                    for (var a, c = e[Symbol.iterator](); !(i = (a = c.next()).done) && (r.push(a.value), !t || r.length !== t); i = !0);
                } catch (s) {
                    n = !0, o = s
                } finally {
                    try {
                        !i && c["return"] && c["return"]()
                    } finally {
                        if (n) throw o
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        window.WApp = {
            init: function(e) {
                var t = this;
                e = e || {}, cur.options = e, extend(cur, {
                    noAwayCheck: !0,
                    height_el: ge("page_wrap")
                }), this.override("lite.js"), stManager.emitter.addListener("update", this.override.bind(this)), cur.RpcMethods = {
                    onInit: function() {
                        addEvent(window, "resize", onBodyResize), uiScroll.addResizeSensor(cur.height_el, t.onresize)[1]()
                    }
                };
                try {
                    cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                        safe: !0
                    })
                } catch (r) {
                    debugLog(r)
                }
            },
            onresize: function() {
                if (cur.height_el && cur.Rpc) {
                    var e = getSize(cur.height_el),
                        t = r(e, 2),
                        i = t[1];
                    cur.Rpc.callMethod("resize", i)
                }
            },
            override: function(e, t) {
                !StaticFiles[e] && t !== !0 || "lite.js" !== e || extend(window, {
                    showTooltip: Widgets.showTooltip,
                    showReCaptchaBox: Widgets.showReCaptchaBox,
                    gotSession: function() {
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