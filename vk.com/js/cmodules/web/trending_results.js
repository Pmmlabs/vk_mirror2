! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var s = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    t.exports = n(1)
}, function(t, e) {
    "use strict";
    var n = {
        initEmbedPost: function(t, e, n) {
            var r = ge("trending_results_embed");
            r && t && e && n && VK && VK.Widgets && VK.Widgets.Post && VK.Widgets.Post("trending_results_embed", t, e, n)
        }
    };
    window.LandingTrendingStats = window.LandingTrendingStats || n;
    try {
        stManager.done(jsc("web/trending_results.js"))
    } catch (r) {}
}]);