! function(e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var s = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(s.exports, s, s.exports, t), s.l = !0, s.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 164)
}({
    164: function(e, t, n) {
        e.exports = n(95)
    },
    95: function(e, t, n) {
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
                var s = gpeByClass("ads_case_block_tabs", e),
                    r = geByClass1("ads_case_tab_content--" + t, s),
                    o = geByClass("ads_case_tab_content", s);
                hasClass(s, "no-animation") && removeClass(s, "no-animation");
                for (var c = 0; c < o.length; c++) toggleClass(o[c], "active", o[c] === r);
                return cancelEvent(n)
            }
        };
        window.LandingAdsCase = window.LandingAdsCase || a;
        try {
            stManager.done(jsc("web/landing_ads_case.js"))
        } catch (s) {}
    }
});