! function(a) {
    function s(e) {
        if (t[e]) return t[e].exports;
        var n = t[e] = {
            exports: {},
            id: e,
            loaded: !1
        };
        return a[e].call(n.exports, n, n.exports, s), n.loaded = !0, n.exports
    }
    var t = {};
    return s.m = a, s.c = t, s.p = "", s(0)
}({
    0: function(a, s, t) {
        a.exports = t(84)
    },
    84: function(a, s) {
        "use strict";
        var t = {
            setTabContentHeight: function() {
                var a = geByClass("ads_case_block_tabs");
                a.forEach(function(a) {
                    var s = geByClass("ads_case_tab_content", a),
                        t = [];
                    s.forEach(function(a) {
                        t.push(parseInt(getStyle(a, "height")))
                    });
                    var e = Math.max.apply(null, t);
                    e > 0 && s.forEach(function(a) {
                        setStyle(a, "height", e)
                    })
                })
            },
            switchTab: function(a, s, t) {
                if (checkEvent(t)) return !0;
                var e = gpeByClass("ui_tabs", a);
                if (geByClass1("ui_tab_sel", e) === a) return !1;
                uiTabs.switchTab(a), uiTabs.showProgress(e);
                var n = gpeByClass("ads_case_block_tabs", a),
                    o = geByClass1("ads_case_tab_content--" + s, n),
                    r = geByClass("ads_case_tab_content", n);
                hasClass(n, "no-animation") && removeClass(n, "no-animation");
                for (var c = 0; c < r.length; c++) toggleClass(r[c], "active", r[c] === o);
                return cancelEvent(t)
            }
        };
        window.LandingAdsCase = window.LandingAdsCase || t;
        try {
            stManager.done(jsc("web/landing_ads_case.js"))
        } catch (e) {}
    }
});