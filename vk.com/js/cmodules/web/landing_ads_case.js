! function(e) {
    var t = {};

    function n(a) {
        if (t[a]) return t[a].exports;
        var r = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, a) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(a, r, function(t) {
                return e[t]
            }.bind(null, r));
        return a
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 97)
}({
    97: function(e, t, n) {
        e.exports = n("u+vw")
    },
    "u+vw": function(e, t, n) {
        "use strict";
        n.r(t);
        var a = {
            setTabContentHeight() {
                geByClass("ads_case_block_tabs").forEach(e => {
                    var t = geByClass("ads_case_tab_content", e),
                        n = [];
                    t.forEach(e => {
                        n.push(parseInt(getStyle(e, "height")))
                    });
                    var a = Math.max.apply(null, n);
                    a > 0 && t.forEach(e => {
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
                    s = geByClass1(`ads_case_tab_content--${t}`, r),
                    o = geByClass("ads_case_tab_content", r);
                hasClass(r, "no-animation") && removeClass(r, "no-animation");
                for (var i = 0; i < o.length; i++) toggleClass(o[i], "active", o[i] === s);
                return cancelEvent(n)
            }
        };
        window.LandingAdsCase = window.LandingAdsCase || a;
        try {
            stManager.done(jsc("web/landing_ads_case.js"))
        } catch (e) {}
    }
});