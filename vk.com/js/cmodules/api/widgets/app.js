! function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 23)
}({
    18: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = function() {
            function e(e, t) {
                var r = [],
                    n = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var c, u = e[Symbol.iterator](); !(n = (c = u.next()).done) && (r.push(c.value), !t || r.length !== t); n = !0);
                } catch (a) {
                    o = !0, i = a
                } finally {
                    try {
                        !n && u["return"] && u["return"]()
                    } finally {
                        if (o) throw i
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
                        t = n(e, 2),
                        r = t[1];
                    cur.Rpc.callMethod("resize", r)
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
        } catch (o) {}
    },
    23: function(e, t, r) {
        e.exports = r(18)
    }
});