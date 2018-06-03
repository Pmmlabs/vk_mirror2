! function(e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: a
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (t.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) t.d(a, r, function(t) {
                return e[t]
            }.bind(null, r));
        return a
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 314)
}({
    154: function(e, t, n) {
        "use strict";
        n.r(t);
        var a = {
            setTabContentHeight: function() {
                var e = geByClass("ads_case_block_tabs");
                e.forEach(function(e) {
                    var t = geByClass("ads_case_tab_content", e),
                        n = [];
                    t.forEach(function(e) {
                        n.push(parseInt(getStyle(e, "height")))
                    });
                    var a = Math.max.apply(null, n);
                    a > 0 && t.forEach(function(e) {
                        setStyle(e, "height", a)
                    })
                })
            },
            switchTab: function(e, t, n) {
                if (checkEvent(n)) return !0;
                var a = gpeByClass("ui_tabs", e);
                if (geByClass1("ui_tab_sel", a) === e) return !1;
                uiTabs.switchTab(e), uiTabs.showProgress(a);
                var r = gpeByClass("ads_case_block_tabs", e),
                    s = geByClass1("ads_case_tab_content--" + t, r),
                    o = geByClass("ads_case_tab_content", r);
                hasClass(r, "no-animation") && removeClass(r, "no-animation");
                for (var i = 0; i < o.length; i++) toggleClass(o[i], "active", o[i] === s);
                return cancelEvent(n)
            }
        };
        window.LandingAdsCase = window.LandingAdsCase || a;
        try {
            stManager.done(jsc("web/landing_ads_case.js"))
        } catch (r) {}
    },
    314: function(e, t, n) {
        e.exports = n(154)
    }
});