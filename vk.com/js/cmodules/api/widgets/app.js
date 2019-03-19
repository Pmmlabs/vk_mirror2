! function(e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 1)
}({
    1: function(e, t, r) {
        e.exports = r("6ldD")
    },
    "6ldD": function(e, t, r) {
        "use strict";
        r.r(t);
        var n = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var u, c = e[Symbol.iterator](); !(n = (u = c.next()).done) && (r.push(u.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !n && c.return && c.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return r
                }(e, t);
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
                } catch (e) {
                    debugLog(e)
                }
            },
            onresize: function() {
                if (cur.height_el && cur.Rpc) {
                    var e = getSize(cur.height_el),
                        t = n(e, 2)[1];
                    cur.Rpc.callMethod("resize", t)
                }
            },
            override: function(e, t) {
                !StaticFiles[e] && !0 !== t || "lite.js" !== e || extend(window, {
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
        } catch (e) {}
    }
});