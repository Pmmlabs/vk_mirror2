! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(46)
}, function(e, t, n) {
    var r = n(42)("wks"),
        o = n(20),
        a = n(2).Symbol,
        i = "function" == typeof a;
    e.exports = function(e) {
        return r[e] || (r[e] = i && a[e] || (i ? a : o)("Symbol." + e))
    }
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t, n) {
    e.exports = !n(18)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    var r = n(9),
        o = n(23);
    e.exports = n(3) ? function(e, t, n) {
        return r.f(e, t, o(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        window.radioBtns[e] = {
            val: n,
            els: Array.prototype.slice.apply(geByClass("radiobtn", geByClass1(t)))
        }
    }

    function r(e) {
        var t = {
            0: nav.objLoc[0],
            act: nav.objLoc.act
        };
        nav.setLoc(extend(t, e))
    }

    function o(e) {
        return nav.objLoc[e]
    }

    function a() {
        var e = new MessageBox;
        e.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), hide(boxLayerBG), hide(e.bodyNode), show(boxLoader), boxRefreshCoords(boxLoader)
    }

    function i() {
        curBox && curBox() && curBox().hide()
    }

    function s(e) {
        return e.ctrlKey || e.metaKey && browser.mac
    }

    function c(e) {
        var t = window.open(e, "_blank");
        t.focus()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initRadioButtons = n, t.updateUrl = r, t.getUrlParam = o, t.showLoading = a, t.hideLoading = i, t.isSpecialKeyPressed = s, t.openInNewTab = c
}, function(e, t, n) {
    var r = n(6);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    var r = n(8),
        o = n(37),
        a = n(44),
        i = Object.defineProperty;
    t.f = n(3) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = a(t, !0), r(n), o) try {
            return i(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t, n) {
    var r = n(2),
        o = n(5),
        a = n(4),
        i = n(20)("src"),
        s = "toString",
        c = Function[s],
        l = ("" + c).split(s);
    n(15).inspectSource = function(e) {
        return c.call(e)
    }, (e.exports = function(e, t, n, s) {
        var c = "function" == typeof n;
        c && (a(n, "name") || o(n, "name", t)), e[t] !== n && (c && (a(n, i) || o(n, i, e[t] ? "" + e[t] : l.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[i] || c.call(this)
    })
}, function(e, t) {
    e.exports = {}
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.conditions;
        t && (ls.set(j(""), t), addClass(geByClass("conditions_clear_button")[0], ie));
        var n = e.conditions2;
        n && (ls.set(j("2"), n), addClass(geByClass("conditions_clear_button")[1], ie))
    }

    function o() {
        return hasClass(U.consoleWrap, G)
    }

    function a() {
        o() || addClass(U.consoleWrap, G), removeClass(U.consoleWrap, X)
    }

    function i() {
        var e = geByClass1(Y, U.patternWrap),
            t = geByClass1(q, U.patternWrap);
        o() && removeClass(U.consoleWrap, G), unlockButton(e), unlockButton(t)
    }

    function s(e) {
        i(), geByClass1(J, U.consoleWrap).innerHTML = e;
        var t = geByClass1("_console_numfield_ip1024", U.consoleWrap),
            n = [
                [256, "/24 - 256"],
                [1024, "/22 - 1024"],
                [4096, "/20 - 4096"],
                [16384, "/18 - 16k"],
                [65536, "/16 - 65k"],
                [262144, "/14 - 262k"],
                [1048576, "/12 - 1kk"]
            ];
        t && new InlineDropdown(t, {
            items: n,
            selected: 256,
            withArrow: !0,
            keepTitle: !0,
            autoShow: !0,
            autoHide: 300,
            onSelect: function(e) {
                return T("ip" + e)
            }
        })
    }

    function c(e, t) {
        var n = geByClass1("_console_error", U.consoleWrap),
            r = geByClass("console_item");
        n.innerHTML = "", e || (e = "");
        var o = ce("div");
        e && (o.innerHTML = e), t ? o.className = "error" : o.className = "info_msg";
        var a = e.match(/\/pattern[0-9]+/);
        a && r && r.forEach(function(e) {
            e.className = "console_item red_item"
        }), addClass(U.consoleWrap, X), n.appendChild(o), i()
    }

    function l(e) {
        R && clearTimeout(R), R = setTimeout(function() {
            domData(U.consoleWrap, "failed", 0)
        }, 3e3), domData(U.consoleWrap, "failed", 1), console.error(e), c(e, !0)
    }

    function p() {
        var e = ge("queries", U.consoleWrap),
            t = geByClass1($, U.consoleWrap);
        return t.innerHTML = isVisible(e) ? "Показать запросы" : "Скрыть запросы", toggle(e)
    }

    function u() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = [],
            n = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    n = {},
                    r = function(e) {
                        var t = "conditions_input" === e.id ? domPS(e) : domNS(e);
                        return hasClass(t, "option_cleared")
                    },
                    o = function(t) {
                        return e && r(t)
                    };
                n["type" + t] = cur["uiSpamtype" + t].val();
                var a = ge("pattern_input" + t);
                n["pattern" + t] = o(a) ? d(a) : a.value, n["threshold" + t] = ge("threshold_input" + t).value;
                var i = ge("uid_input" + t);
                n["uid" + t] = o(i) ? d(i) : i.value;
                var s = ge("ip_input" + t);
                n["ip" + t] = o(s) ? d(s) : s.value;
                var c = ge("uahash_input" + t);
                n["uahash" + t] = o(c) ? d(c) : c.value;
                var l = ge("time_start_input" + t);
                n["time_start" + t] = o(l) ? d(l) : l.value;
                var p = ge("time_finish_input" + t);
                n["time_finish" + t] = o(p) ? d(p) : p.value;
                var u = ge("conditions_input" + t);
                return n["conditions" + t] = o(u) ? ls.get(j(t)) : u.value, n
            },
            r = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    n = [];
                Array.from(geByClass("option_cleared", e)).forEach(function(e) {
                    var t = geByTag1("input", domPN(e)) || geByTag1("textarea", domPN(e));
                    n.push(t.id)
                });
                var r = [];
                return n.forEach(function(e) {
                    switch (e) {
                        case "pattern_input" + t:
                            r |= cur.hideFieldsBitMasks.substring;
                            break;
                        case "ip_input" + t:
                            r |= cur.hideFieldsBitMasks.ip;
                            break;
                        case "uahash_input" + t:
                            r |= cur.hideFieldsBitMasks.uaHash;
                            break;
                        case "uid_input" + t:
                            r |= cur.hideFieldsBitMasks.uid;
                            break;
                        case "time_finish_input" + t:
                            r |= cur.hideFieldsBitMasks.timeFinish;
                            break;
                        case "time_start_input" + t:
                            r |= cur.hideFieldsBitMasks.timeStart;
                            break;
                        case "conditions_input" + t:
                            r |= cur.hideFieldsBitMasks.conditions
                    }
                }), r
            };
        t.simplify = cur.uiSimplify.val(), t.duration = cur.uiDuration.val(), t.bantype = cur.uiBan.val(), t.search_period = cur.uiSearchPeriod.val();
        var o = cur.uiSearchPeriod.selectedItems();
        return o && o.length > 0 && (t.period_in_seconds = 3 === o[0].length && 1 === o[0][2] ? 1 : 0), t.comment = ge("comment_input").value, t.notbannedonly = isChecked("not_banned_only") || !1, t.linksonly = isChecked("links_only") || !1, t.wrap_actions = null === ge("wrap_actions") ? 1 : isChecked("wrap_actions"), t.encode_entities = null === ge("encode_entities") ? 1 : isChecked("encode_entities"), t.hidden_fields = r(geByClass1("pattern_part_root")), extend(t, n(e, "")), O() && (t.hidden_fields2 = r(geByClass1("pattern_part_child"), "2"), extend(t, n(e, "2"))), t
    }

    function d(e) {
        return domData(e, "restore")
    }

    function _(e, t) {
        return domData(e, "restore", t)
    }

    function m() {
        var e = ge("pattern_input"),
            t = geByClass1(q, U.patternWrap),
            n = u();
        return e.value ? void(isButtonLocked(t) || (a(), lockButton(t), n.act = "show_pattern", ajax.post("noSpam.php", n, {
            onDone: function(e) {
                return s(e)
            },
            onFail: function(e) {
                return l(e)
            }
        }))) : (scrollToTop(0), void notaBene(e))
    }

    function f(e, t) {
        "string" == typeof t && (t = clean(t)), val(e, t), E(!1, ge(e), "reset")
    }

    function h(e) {
        f("uid_input", e)
    }

    function v(e) {
        f("ip_input", e)
    }

    function g(e) {
        f("uahash_input", e)
    }

    function b(e) {
        cur.uiSpamtype.selectItem(e)
    }

    function y(e, t) {
        0 !== e.length && (ge("conditions_input").value += ge("conditions_input").value ? " " + (t ? "||" : "&&") + " " + e : e), L("reset")
    }

    function w(e) {
        f("time_start_input", e)
    }

    function k(e) {
        f("time_finish_input", e)
    }

    function S(e) {
        f("threshold_input", e)
    }

    function x() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
        e || (e = u(!0));
        var t = Object.keys(e);
        t.sort();
        for (var n = [], r = 0; r < t.length; r++) {
            var o = t[r],
                a = e[o];
            n.push(encodeURIComponent(o) + "=" + encodeURIComponent(a))
        }
        return "/noSpam?" + n.join("&")
    }

    function C() {
        var e = x(),
            t = function(e) {
                removeClass(r, "progress"), showTooltip(r, {
                    text: e,
                    slide: 15,
                    center: 1,
                    black: 1,
                    nohide: 1,
                    hidedt: 400,
                    shift: [0, 2, 0],
                    onShowEnd: function() {
                        var e = window,
                            t = e.selectText;
                        t("shorten_link"), setTimeout(r.tthide, 3e3)
                    }
                })
            },
            n = function(e) {
                removeClass(r, "progress"), topError(e, {
                    dt: 5
                })
            },
            r = geByClass1("_get_pattern_link");
        r && r.tt && r.tt.destroy(), addClass(r, "progress"), ajax.post("noSpam.php", {
            act: "get_search_link",
            link: e
        }, {
            onDone: t,
            onFail: n
        })
    }

    function T(e) {
        var t = isChecked("values_hist"),
            n = u(),
            r = function(n, r) {
                var o = showFastBox({
                    width: t ? 330 : 710,
                    title: e,
                    dark: 1,
                    containerClass: "nospam_hist_wrap",
                    hideButtons: t
                }, n);
                o.evalBox(r)
            };
        n.need_hist = t, n.act = "numeric_field", n.field = e, cur.numFieldSel = e, ajax.post("noSpam.php", n, {
            onDone: r,
            progress: "console_query_fields_progress"
        })
    }

    function D(e) {
        var t = domData(e.target, "field"),
            n = showFastBox.pbind({
                width: 710,
                title: t,
                dark: 1
            }),
            r = u();
        r.act = "link_field", r.field = t, ajax.post("noSpam.php", r, {
            onDone: n,
            progress: "console_query_fields_progress"
        })
    }

    function M(e) {
        var t = 2 === e ? cur.uiSpamtype2.val() : cur.uiSpamtype.val();
        return showBox("noSpam.php", {
            act: "conditions_hint",
            spamtype: t
        }, {
            dark: 1,
            containerClass: "nospam_hint_wrap"
        })
    }

    function P() {
        var e = u(),
            t = geByClass1(Y, U.patternWrap);
        e.act = "apply_pattern", isButtonLocked(t) || 1 !== domData(U.consoleWrap, "failed") && (a(), lockButton(t), ajax.post("noSpam.php", e, {
            onDone: function(e) {
                return c(e)
            },
            onFail: function(e) {
                return l(e)
            }
        }))
    }

    function B(e) {
        var t = ["pattern_input", "threshold_input", "ip_input", "uahash_input", "time_finish_input", "time_start_input", "conditions_input"];
        t.forEach(function(e) {
            var t = ge(e).value;
            ge(e).value = ge(e + "2").value, ge(e + "2").value = t
        });
        var n = cur.uiSpamtype.val();
        cur.uiSpamtype.selectItem(cur.uiSpamtype2.val()), cur.uiSpamtype2.selectItem(n), toggleClass(e, "switched")
    }

    function j() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return "nospam_conditions" + e + "_" + vk.id
    }

    function L(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = ge("conditions_input" + t),
            r = "option_cleared",
            o = domPS(n),
            a = function() {
                var e = n.value;
                ls.set(j(t), e), n.value = "", e && addClass(o, r)
            },
            i = function() {
                var e = ls.get(j(t));
                removeClass(o, r), removeClass(o, ie), e && (ls.remove(j(t)), n.value = e)
            },
            s = function() {
                removeClass(o, r), removeClass(o, ie), ls.remove(j(t))
            };
        switch (e) {
            case "clear":
                hasClass(o, r) ? i() : a();
                break;
            case "reset":
                s()
        }
    }

    function E(e, t, n) {
        function r(n) {
            var r = val(n);
            switch (_(n, r), t) {
                case "pattern_input":
                case "pattern_input2":
                    val(n, "/"), cur.uiSimplify.selectItem(32);
                    break;
                case "threshold_input":
                case "threshold_input2":
                    val(n, n.value && "2" === n.value ? "1" : "2");
                    break;
                default:
                    val(n, "")
            }
            r && addClass(e, "option_cleared")
        }

        function o() {
            switch (t) {
                case "threshold_input":
                case "threshold_input2":
                    r(s);
                    break;
                default:
                    c && (s.value = d(s))
            }
            removeClass(e, "option_cleared"), removeClass(e, ie)
        }

        function a() {
            var e = geByClass1("option_clear", s.parentNode);
            _(s, ""), removeClass(e, "option_cleared"), removeClass(e, ie)
        }

        function i() {
            var e = geByClass("option_clear");
            e.forEach(function(e) {
                var t = ge(e.getAttribute("data-option"));
                _(t, ""), removeClass(e, "option_cleared"), removeClass(e, ie)
            })
        }
        var s = ge(t),
            c = hasClass(e, "option_cleared");
        switch (n) {
            case "clear":
                c ? o(s) : r(s);
                break;
            case "reset":
                a(s);
                break;
            case "reset_all":
                i(s)
        }
    }

    function O() {
        var e = geByClass1(Z);
        if (!isVisible(e)) return !1;
        for (var t = geByClass("cloneable_input", e), n = 0; n < t.length; n++)
            if (val(t[n])) return !0;
        return !1
    }

    function H() {
        var e = geByClass1("pattern_wrap"),
            t = "pattern_composite";
        return hasClass(e, t) ? void removeClass(e, t) : void addClass(e, t)
    }

    function F() {}

    function I(e) {
        var t = ge(document.activeElement);
        if (e.altKey) switch (-1 !== [49, 50, 51, 52, 53, 67, 70, 83].indexOf(e.keyCode) && t ? t.blur() : "", e.keyCode) {
            case 83:
                (0, U.activeTab)() === U.tabPattern ? m() : (0, U.activeTab)() === U.tabReports && (0, A.prepareReport)((0, A.activeReportsType)(), (0, A.activeSubReportsType)());
                break;
            case 70:
                if (-1 !== [V, z, K].indexOf(vk.id)) return P();
                break;
            case 67:
                L("clear"), cur.conditions.deselectTemplate();
                break;
            case 49:
                cur.uiSearchPeriod.selectItem(1);
                break;
            case 50:
                cur.uiSearchPeriod.selectItem(24);
                break;
            case 51:
                cur.uiSearchPeriod.selectItem(72);
                break;
            case 52:
                cur.uiSearchPeriod.selectItem(240);
                break;
            case 53:
                cur.uiSearchPeriod.selectItem(2160)
        }
    }

    function N() {
        var e = window,
            t = e.pageNode,
            n = window,
            r = n.browser,
            o = r.msie6 ? t : window,
            a = geByClass1("_pattern_buttons", U.patternWrap),
            i = (0, W.createModule)({
                handlers: function(e, t) {
                    t(a, "click", q, m), t(a, "click", Y, P), t(a, "click", Q, C), t(U.consoleWrap, "click", $, p), t(U.consoleWrap, "click", te, function(e) {
                        return D(e)
                    }), t(U.consoleWrap, "click", ee, function(e) {
                        return T(domData(e.target, "field"))
                    }), t(U.consoleWrap, "click", ne, function(e) {
                        var t = e.target,
                            n = domData(t, "time");
                        0 > n ? k(-n) : n > 0 && w(n)
                    }), t(U.consoleWrap, "click", re, function(e) {
                        if (e && e.altKey) {
                            var t = clean(e.target.dataset.uid || "");
                            e.ctrlKey ? (removeClass(e.target, "console_intem_excluded"), h(t)) : (addClass(e.target, "console_intem_excluded"), h(""), y("uid != " + t)), cancelEvent(e)
                        }
                    }), e(o, "scroll", F), e(document, "keydown", I), t(U.patternWrap, "click", oe, function(e) {
                        var t = e.target;
                        E(t, domData(t, "option"), "clear")
                    }), t(U.patternWrap, "click", ae, function(e) {
                        var t = domNS(e.target).id.replace("conditions_input", "");
                        L("clear", t)
                    }), t(document, "click", se, function(e) {
                        var t = e.target,
                            n = domData(t, "conditions");
                        y(n)
                    })
                }
            });
        cur.destroy.push(function() {
            (0, W.destroyModule)(i)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ID_PKALAYDIN = t.ID_NSHKARUBA = t.ID_ASHVETS = void 0, t.init = r, t.getParams = u, t.setOption = f, t.setUid = h, t.setIp = v, t.setUaHash = g, t.setSpamtype = b, t.setConditions = y, t.setThreshold = S, t.composeSearchLinkFromParams = x, t.getNumericField = T, t.getConditionsHint = M, t.switchParams = B, t.conditionsClear = L, t.optionClear = E, t.addPatternPart = H, t.mount = N;
    var R, W = n(21),
        A = n(13),
        U = n(14),
        V = t.ID_ASHVETS = 1576215,
        z = t.ID_NSHKARUBA = 138305184,
        K = 163176673,
        J = (t.ID_PKALAYDIN = 143978, "_console"),
        G = "console_locked",
        Y = "_apply_pattern",
        q = "_search_reports",
        Q = "_get_pattern_link",
        Z = "_pattern_part_child",
        $ = "_queries_toggle",
        X = "console_show_message",
        ee = "_console_numfield_action",
        te = "_console_linkfield_action",
        ne = "console_set_range",
        re = "console_uid",
        oe = "_option_clear",
        ae = "_conditions_clear",
        ie = "highlighted",
        se = "_console_conditions"
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = geByClass1(E, D.reportTabs);
        return domData(e, "type")
    }

    function o() {
        var e = geByClass1("_reports_subtabs", D.reportTabs),
            t = geByClass1(E, e);
        return domData(t, "subtype")
    }

    function a(e, t) {
        function n() {
            if ("mail" !== e && "mail_group" !== t) return void console.log("Unsupported filters used");
            var n = geByClass1("filters");
            return {
                hide_groups_with_disabled_messages: isChecked(geByClass1("hide_groups_with_disabled_messages_filter", n)),
                shift: isObject(cur.hoursShiftSlider) ? 23 * cur.hoursShiftSlider._currValue : 0,
                min_reporters_amount: val(geByClass1("min_reports_amount_filter", n)),
                sorting: radioval("group_messages_reports_sorting")
            }
        }

        function r(t) {
            if ((0, M.debugLogTimer)("actions fetch"), H = {}, 0 === t.length) return void(i.innerHTML = getTemplate("nospam_reports_type_search_empty"));
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.ui_type = e;
                var o = s(r.ui_type, n);
                b(r.ua_hash, r.agent_name), delete r.agent_name, delete r.remix_seed, r.index = n, H[o] = r
            }
            i.innerHTML = "", c(e, 0), t = ""
        }

        function o(e) {
            (0, M.debugLogTimer)("actions fetched fail"), topError(e), i.innerHTML = getTemplate("nospam_reports_type_search_error")
        }(0, M.startDebugTimer)();
        var a = geByClass1("_report_btn_update", D.reportList);
        if (!isButtonLocked(a)) {
            var i = geByClass1("_reports_" + e + "_wrap", D.reportList);
            if (!i) return void topError("Can't find wrap for type: " + e);
            var l = {
                act: "a_get_reports",
                encode_entities: 1,
                type: e,
                sub_type: t,
                shift: cur.options.shift
            };
            "mail" === e && "mail_group" === t && (l = extend(l, n())), ajax.post("noSpam.php", l, {
                onDone: r,
                onFail: o,
                showProgress: lockButton.pbind(a),
                hideProgress: unlockButton.pbind(a)
            })
        }
    }

    function i(e) {
        var t = e.target,
            n = domData(t, "type"),
            r = domData(t, "subtype"),
            o = geByClass("report_filter", D.reportTabs),
            i = geByClass("report_subfilter", D.reportTabs),
            s = geByClass1(O, D.reportList);
        if (!n) return !1;
        o.forEach(function(e) {
            hasClass(e, E) && removeClass(e, E), domData(e, "type") !== n || domData(e, "subtype") || addClass(e, E)
        });
        var c = !1,
            l = !1;
        i.forEach(function(e) {
            removeClass(e, L), removeClass(e, E), domData(e, "type") === n && (addClass(e, L), c = !0), domData(e, "subtype") === r && (addClass(e, E), l = !0)
        });
        var p = geByClass1("hr", D.reportTabs);
        if (c ? show(p) : hide(p), c && !l) {
            var u = geByClass1(L, D.reportTabs);
            addClass(u, E)
        }
        var d = domData(s, "type");
        d !== n && (removeClass(s, O), addClass(ge("reports_" + n), O)), a(n, r)
    }

    function s(e, t) {
        return "report_" + e + "_" + t
    }

    function c(e, t, n) {
        (0, M.startDebugTimer)(), n || (n = j);
        for (var r = geByClass1("_reports_" + e + "_wrap", D.reportList), o = domPN(r), a = geByClass1("_reports_type_show_more", o), i = 0, c = 0, l = 0; n > i;) {
            c = l, l++;
            var _ = s(e, c),
                m = H[_];
            if (!(t > c)) {
                if ("object" !== ("undefined" == typeof m ? "undefined" : C(m))) {
                    debugLog("empty reports after " + c, "need to shift " + t);
                    break
                }
                if (m.uid && m.showed !== !0) {
                    var f = ce("div", {
                        id: "report_" + e + "_" + c
                    });
                    if (addClass(f, "clear_fix"), addClass(f, "report"), m.mem_banned || m.uid_base_info) {
                        if ((0, D.getCustomOption)("hide_banned")) continue;
                        addClass(f, "banned")
                    }
                    m.ui_type = e;
                    var h = u(m),
                        v = void 0,
                        g = p(m),
                        b = x(g, 1);
                    v = b[0];
                    var y = d(m, c);
                    [h, v, y].forEach(function(e) {
                        f.appendChild(e)
                    }), r.appendChild(f), i++
                }
            }
        }
        if (0 === i) return void hide(a);
        a ? isVisible(a) || show(a) : (a = ce("div", {
            className: "reports_type_show_more _reports_type_show_more"
        }), o.appendChild(a));
        var w = parseInt(t) + j;
        a.innerHTML = getTemplate("nospam_reports_show_more", {
            need_shift: w
        }), (0, M.debugLogTimer)("actions to html")
    }

    function l() {
        var e = getSelectionText();
        e ? cur.uiSimplify.selectItem("0") : (e = "/", cur.uiSimplify.selectItem("32")), val("pattern_input", e)
    }

    function p(e) {
        var t, n = "",
            r = e.type_name,
            o = parseInt(e.type),
            a = ce("div");
        switch (addClass(a, "report_body"), e.api_id > 0 && (setStyle(a, "color", "#bbbbbb"), n += e.api_id > 0 ? '<div class="report_api">Приложение (' + e.api_id + "):</div>" : ""), e.message && (n += getTemplate("nospam_reports_field", {
            "class": "report_message",
            value: e.message
        })), e.kludges && (n += getTemplate("nospam_reports_field", {
            "class": "reports_kludges",
            value: e.kludges
        })), e.attaches && (n += getTemplate("nospam_reports_attaches", {
            attaches: e.attaches
        })), o) {
            case 500:
            case 510:
            case 545:
                t = "<a href='/wall" + e.owner_id + "_" + e.msg_id + "' target='_blank'> " + r + "</a>";
                break;
            case 501:
            case 550:
                t = "<a href='/wall" + e.owner_id + "_" + e.parent_id + "?reply=" + e.msg_id + "' target='_blank'> " + r + "</a>";
                break;
            case 100:
                n += e.score ? "<b>phone_cheat:</b> " + e.score : "";
                break;
            case 160:
                n += e.title;
                break;
            case 161:
                n += e.new_title;
                break;
            case 2602:
            case 2647:
                t = "<a href='/video" + e.owner_id + "_" + e.video_id + "' target='_blank'> " + r + "</a>";
                break;
            case 2600:
            case 2610:
            case 2611:
            case 2645:
            case 2650:
                t = "<a href='/video" + e.owner_id + "_" + e.video_id + "' target='_blank'> " + r + "</a>", n += '<table class="report_video"><tr>', n += '<td style="width: 130px;"><a class="report_video_thumb" href="' + e.video.href + '" onclick="' + e.video.onclick + '" style="background-image: url(\'' + e.video.thumb + '\')"><div class="report_video_duration"><span class="report_video_icon"></span><span class="report_video_duration_text">' + e.video.duration_text + "</span></div></a></td>", n += "<td>", n += e.video.DELETED ? "Видеозапись удалена" : '<div class="report_video_title"><a href="' + e.video.href + '" onclick="' + e.video.onclick + '">' + e.video.title_short + "</a></div>", n += !e.video.DELETED && e.description ? '<div class="report_video_description">' + e.video.description_short + "</div>" : "", n += "</td>", n += "</tr></table>", n += '<div class="report_video_duration_second"><b>Duration:</b> <a class="_console_conditions" data-conditions="duration = ' + e.duration + '">' + e.duration + "</a></div>", e.external && (n += '<div class="report_video_external"><b>External:</b> ' + e.external + "</div>");
                break;
            case 3504:
            case 3545:
                t = "<a href='/photo" + e.owner_id + "_" + e.photo_id + "' target='_blank'> " + r + "</a>";
                break;
            case 13120:
            case 13121:
                t = "<a href='/market" + e.owner_id + "?w=product" + e.owner_id + "_" + e.item_id + "' target='_blank'> " + r + "</a>";
                break;
            case 3500:
            case 3547:
                t = "<a href='/photo" + e.owner_id + "_" + e.photo_id + "' target='_blank'> " + r + "</a>", n += '<table class="report_photo"><tr>', n += '<td><div class="report_photo_thumb">' + e.photo + "</div></td>", n += e.description ? '<td><div class="report_photo_description">' + e.description + "</div></td>" : "", n += "</tr></table>";
                break;
            case 3550:
                t = "<a href='/photo" + e.owner_id + "_" + e.photo_id + "' target='_blank'> " + r + "</a>", n += e.photo;
                break;
            case 9258:
                n += e.about;
                break;
            case 1800:
                n += e.status;
                break;
            case 1531:
            case 1530:
            case 1534:
                n += e.text;
                break;
            case 5e3:
                t = "<a href='/topic-" + e.group_id + "_" + e.topic_id + "' target='_blank'> " + r + "</a>", n += e.title;
                break;
            case 5001:
            case 5046:
                t = "<a href='/topic-" + e.group_id + "_" + e.topic_id + "?post=" + Math.abs(e.comment_id) + "' target='_blank'> " + r + "</a>";
                break;
            case 2131:
                var i = e.group_id;
                t = "Группа: " + getTemplate("nospam_reports_id_link", {
                    type: "club",
                    id: i,
                    label: i,
                    color: "black"
                }), n += "<b>Название:</b>" + e.group_name + "<br>", n += "<b>Описание:</b>" + e.group_description + "<br>";
                break;
            case 7530:
                t = "<a href='/app" + e.app_id + "' target='_blank'> " + r + "</a>", n += e.app_name + "<br>";
                break;
            case 3670:
                var s = e.like_ref,
                    c = e.like_type,
                    l = e.owner_id + "_" + e.item_id,
                    p = "";
                switch (Number(c)) {
                    case 11:
                        t = "<a href='wall<a href='wall" + l + "' target='_blank'> " + r + "</a>", p += "(запись на стене), <a href='wall" + l + "' target='_blank'>vk.com/wall" + l + "</a>";
                        break;
                    case 12:
                        t = "<a href='wall" + l + "' target='_blank'> " + r + "</a>", p += "(комментарий на стене), <a href='wall" + l + "' target='_blank'>vk.com/wall" + l + "</a>";
                        break;
                    case 10:
                        t = "<a href='photo" + l + "' target='_blank'> " + r + "</a>", p += "(фотография), <a href='photo" + l + "' target='_blank'>vk.com/photo" + l + "</a>";
                        break;
                    case 24:
                    case 8:
                        t = "<a href='photo" + l + "' target='_blank'> " + r + "</a>", p += "(видеозапись), <a href='video" + l + "' target='_blank'>vk.com/video" + l + "</a>";
                        break;
                    case 6:
                        t = "<a href='audio.php?id=" + e.owner_id + "&audio_id=" + e.item_id + "' target='_blank'> " + r + "</a>", p += "(аудиозапись), <a href='audio.php?id=" + e.owner_id + "&audio_id=" + e.item_id + "' target='_blank'>vk.com/audio.php?id=" + e.owner_id + "&audio_id=" + e.item_id + "</a>";
                        break;
                    case 22:
                        t = r, p += "(комментарий к видео)";
                        break;
                    case 21:
                        t = r, p += "(комментарий к фотографии)";
                        break;
                    case 20:
                        t = r, p += "(комментарий на стене)";
                        break;
                    default:
                        t = r, p += " (незвестный тип) " + l
                }
                n += getTemplate("nospam_reports_report_like", {
                    like_ref: s,
                    like_ref_id: e.ref,
                    like_type: p,
                    like_type_id: c
                })
        }
        if (e.post_tags) {
            var u = e.post_tags;
            Object.keys(u).forEach(function(e) {
                u[e] && (n = getTemplate("nospam_reports_wall_tag", {
                    tag_label: u[e]
                }) + n)
            })
        }
        return a.innerHTML = n, [a, t]
    }

    function u(e) {
        var t = e.mem_banned,
            n = isObject(t),
            r = n ? "Недавняя блокировка:<br>" + t.comment + "<br>" + m(new Date(1e3 * t.time)) : "",
            o = "",
            a = s(e.ui_type, e.index),
            i = e.uid_base_info,
            c = void 0,
            l = void 0;
        "" == r && i && (c = i[0].pattern_id, l = i[0].state, n = !0, r = 0 == Number(l) ? "Ожидает обработки noSpam " : "Обработан noSpam ", r = r + "(шаблон номер <a href='/pattern" + Number(c) + "' target='_blank'>" + Number(c) + "</a>)");
        var u = ce("div");
        addClass(u, "report_info"), n && addClass(u, "report_banned"), r && (o = getTemplate("nospam_reports_report_ban_tooltip", {
            action_index: a
        }), H[a].ban_tt = r);
        var d = void 0,
            _ = e.uid,
            f = n ? "red" : "blue";
        d = _ > 0 ? getTemplate("nospam_reports_id_link", {
            type: "id",
            id: _,
            label: _,
            color: f
        }) : getTemplate("nospam_reports_id_link", {
            type: "club",
            id: -_,
            label: _,
            color: f
        });
        var h = void 0,
            v = p(e),
            g = x(v, 2);
        return h = g[1], u.innerHTML = getTemplate("nospam_reports_report_info", {
            action_mention_link: d,
            action_tt: o,
            type: e.type,
            index: e.index,
            ip: e.ip,
            report_time: m(new Date(1e3 * e.report_time)),
            action_time: m(new Date(1e3 * e.time)),
            ua_hash: e.ua_hash,
            from_uid: e.from_uid,
            report_count: e.report_count > 1 ? langNumeric(e.report_count, ["", "%s жалоба", "%s жалобы", "%s жалоб"]) : "",
            report_type_link: h
        }), u
    }

    function d(e, t) {
        var n = "",
            r = "report_" + e.ui_type + "_" + e.index,
            o = ce("div");
        if (addClass(o, "report_steps"), "photo" == e.ui_type || "video" == e.ui_type) {
            var a = "dealSingleSpamer('" + e.ui_type + "', " + e.uid + ", " + e.index + ")";
            n += "<span id = 'spamer_by_" + r + "'> <a onclick = \"" + a + '"> Забанить и откатить </a> </span>'
        }
        return n += getTemplate("nospam_reports_compose_button", {
            type: e.ui_type,
            ip: e.ip,
            ua_hash: e.ua_hash
        }), n += "<span id='selected_text_span" + t + "' style='display:none;'></span>", o.innerHTML = n, o
    }

    function _(e, t, n) {
        var r = "report_" + e + "_" + n,
            o = function() {
                ge("spamer_by_" + r).innerHTML = "<span style = 'color: green'> Добавлен </span>"
            },
            a = function() {
                ge("spamer_by_" + r).innerHTML = "<span style = 'color: red'> Неудача </span>"
            };
        ajax.post("noSpam.php", {
            act: "a_single_spamer",
            uid: t,
            type: e,
            action: JSON.stringify(H[ge(r)])
        }, {
            onDone: o,
            onFail: a
        })
    }

    function m(e) {
        var t = e.getDate(),
            n = e.getMonth() + 1;
        return (10 > t ? "0" : "") + t + "." + (10 > n ? "0" : "") + n + " в " + e.toLocaleTimeString()
    }

    function f(e) {
        (0, P.isSpecialKeyPressed)(e) ? v(e.target): h(e.target)
    }

    function h(e) {
        var t = domData(e, "type"),
            n = domData(e, "ip"),
            r = domData(e, "ua-hash");
        null !== t && (("post" == t || "comment" == t) && (t = "wall"), (0, T.setIp)(n), (0, T.setUaHash)(r), (0, T.setThreshold)(1), cur.uiSpamtype.selectItem(t), (0, D.switchTab)(D.tabPattern), (0, T.optionClear)(!1, "reset_all"))
    }

    function v(e) {
        var t = (0, T.getParams)();
        if (t.type = domData(e, "type"), null === t.type) return !1;
        ("post" === t.type || "comment" === t.type) && (t.type = "wall"), t.ip = domData(e, "ip"), t.uahash = domData(e, "ua-hash"), t.pattern = t.pattern || getSelectionText(), t.threshold = 1;
        var n = (0, T.composeSearchLinkFromParams)(t);
        return (0, P.openInNewTab)(n)
    }

    function g(e) {
        var t = e.target,
            n = domData(t, "action-index"),
            r = H[n].ban_tt;
        r && showTooltip(t, {
            text: r,
            dir: "down",
            hasover: 1,
            shift: [22, 5, 0]
        })
    }

    function b(e, t) {
        var n = F[e];
        F[e] ? n && n !== t && debugLog("collision for " + e, t, n) : F[e] = t
    }

    function y(e) {
        var t = e.target,
            n = domData(t, "ua-hash"),
            r = F[n];
        showTooltip(t, {
            text: r ? r : "[NULL]",
            dir: "down",
            hasover: 1,
            shift: [22, 5, 0]
        })
    }

    function w() {
        if ((0, D.getCurrentTab)() === D.tabReports) {
            var e = r(),
                t = geByClass1("_reports_" + e + "_wrap", D.reportList),
                n = geByClass1("_report_show_more", domPN(t)),
                o = domPN(n),
                a = window.innerHeight || document.documentElement || bodyNode.clientHeight;
            R = scrollGetY(), isVisible(o) && (0, D.activeTab)() === D.tabReports && a + R > n.offsetTop && n.click()
        }
    }

    function k() {
        clearTimeout(N), N = setTimeout(a.pbind(r(), o()), 1e3)
    }

    function S() {
        var e = (0, B.createModule)({
            handlers: function(e, t) {
                t(D.reportList, "mouseover", "report_steps", l), t(D.reportList, "click", "report_steps", function(e) {
                    return f(e)
                }), t(D.reportList, "mouseover", "report_info_ban_tooltip", function(e) {
                    return g(e)
                }), t(D.reportList, "mouseover", "report_info_ua_hash", function(e) {
                    return y(e)
                }), e(document, "scroll", w), t(D.reportList, "click", "_report_show_more", function(e) {
                    var t = domData(e.target, "need-shift"),
                        n = r();
                    c(n, t)
                }), t(D.reportTabs, "click", "report_filter", function(e) {
                    return i(e)
                }), t(D.reportList, "click", "_report_btn_update", function(e) {
                    a(r(), o())
                }), t(D.reportTabs, "mouseover", "settings_dots_wrap", function(e) {
                    function t() {
                        var e = ge("search_shift_filter");
                        cur.hoursShiftSlider = new Slider(e, {
                            width: 200,
                            height: 100,
                            debounce: 10,
                            size: 2,
                            value: parseFloat(nav.objLoc.shift / 23) || 0,
                            onChange: function(e) {
                                (0, P.updateUrl)({
                                    shift: parseInt(23 * e)
                                }), k()
                            },
                            formatHint: function(e) {
                                return langNumeric(parseInt(23 * e), ["", "%s час назад", "%s часа назад", "%s часов назад"])
                            }
                        })
                    }
                    var n = geByClass1("settings_dots_wrap");
                    showTooltip(n, {
                        black: !0,
                        text: getTemplate("reports_group_message_tab_tooltip"),
                        className: "group_messages_settings_tt",
                        slideY: 15,
                        shift: [98, 100, 20],
                        dir: "top",
                        showdt: 300,
                        hidedt: 100,
                        hasover: !0,
                        onCreate: function() {
                            t(), (0, P.initRadioButtons)("group_messages_reports_sorting", "sorting_radio_filter_wrap", 1)
                        }
                    })
                })
            }
        });
        cur.destroy.push(function() {
            (0, B.destroyModule)(e)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.noSpamReports = t.reportsTime = void 0;
    var x = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    o = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    t.activeReportsType = r, t.activeSubReportsType = o, t.prepareReport = a, t.switchReports = i, t.dealSingleSpamer = _, t.onFiltersChange = k, t.mount = S;
    var T = n(12),
        D = n(14),
        M = n(49),
        P = n(7),
        B = n(21),
        j = 20,
        L = "report_subfilter_active",
        E = "active_filter",
        O = "active_type",
        H = {},
        F = {},
        I = new Date,
        N = setTimeout(null),
        R = 0,
        W = t.reportsTime = {
            _sel: [],
            day: I.getDate(),
            month: I.getMonth(),
            months: [
                [0, "Января"],
                [1, "Февраля"],
                [2, "Марта"],
                [3, "Апреля"],
                [4, "Мая"],
                [5, "Июня"],
                [6, "Июля"],
                [7, "Августа"],
                [8, "Сентября"],
                [9, "Октября"],
                [10, "Ноября"],
                [11, "Декабря"]
            ],
            year: I.getFullYear(),
            generateHMS: function(e) {
                var t, n = [];
                switch (e) {
                    case "hour":
                        t = 23;
                        break;
                    case "minute":
                        t = 59;
                        break;
                    case "second":
                        t = 59
                }
                for (var r = 0; t >= r; ++r) n.push([r, 10 > r ? "0" + r : r + ""]);
                return n
            },
            generateDays: function(e, t) {
                for (var n = [], r = this.getLastDay(e, t), o = 1; r >= o; ++o) n.push([o, o + ""]);
                return n
            },
            isLeapYear: function(e) {
                return e = parseInt(e), e % 4 == 0 && e % 100 != 0 || e % 400 == 0
            },
            getLastDay: function(e, t) {
                return t = parseInt(t) + 1, 2 == t ? this.isLeapYear(e) ? 29 : 28 : t > 0 && (8 > t && t % 2 == 0 || t > 7 && t % 2 == 1) ? 30 : 31
            },
            updateDays: function() {
                var e = this._sel[0],
                    t = this._sel[1].val(),
                    n = this._sel[2].val();
                e.val() > this.getLastDay(n, t) && e.clear(), e.setData(this.generateDays(n, t))
            },
            setControls: function() {
                var e = W,
                    t = [
                        ["reports_day", 55],
                        ["reports_month", 95],
                        ["reports_year", 60],
                        ["reports_hour", 50],
                        ["reports_minute", 50],
                        ["reports_second", 50]
                    ],
                    n = ce("div", {
                        id: "reports_time_wrap",
                        className: "reports_time_wrap"
                    }),
                    r = geByClass1("box_body");
                e.clear(), r.appendChild(n), t.forEach(function(n, o) {
                    var a = [],
                        i = [],
                        s = ce("div", {
                            className: n[0] + " fl_l"
                        }),
                        c = ce("input", {
                            type: "hidden",
                            name: n[0],
                            id: n[0]
                        }),
                        l = n[0].split("_")[1];
                    switch (domLC(r).appendChild(s), s.appendChild(c), l) {
                        case "year":
                            a = [
                                [e.year, e.year + ""]
                            ], i = a[0];
                            break;
                        case "month":
                            a = e.months, i = e.month;
                            break;
                        case "day":
                            a = e.generateDays(e.year, e.month), i = a[e.day - 1];
                            break;
                        case "hour":
                            a = e.generateHMS(l), i = I.getHours();
                            break;
                        case "minute":
                            a = e.generateHMS(l), i = I.getMinutes();
                            break;
                        case "second":
                            a = e.generateHMS(l), i = I.getSeconds();
                            break;
                        default:
                            a = e[l], i = a
                    }
                    var p = {
                        width: t[o][1],
                        multiselect: !1,
                        autocomplete: !1,
                        selectedItems: i
                    };
                    ("month" === l || "year" === l) && extend(p, {
                        onChange: function(e) {
                            W.updateDays()
                        }
                    }), W._sel.push(new Dropdown(c, a, p))
                })
            },
            setTime: function() {
                boxQueue.hideLast();
                var e = W,
                    t = e._sel,
                    n = {
                        day: t[0].val(),
                        month: t[1].val(),
                        year: t[2].val(),
                        hour: t[3].val(),
                        minute: t[4].val(),
                        second: t[5].val()
                    },
                    r = new Date(n.year, n.month, n.day, n.hour, n.minute, n.second),
                    o = e.tt;
                val(o, r.getTime() / 1e3)
            },
            set: function(e, t) {
                var n = this.setControls,
                    r = this.setTime,
                    o = domData(t, "part");
                I = new Date;
                var a = o ? "_time_" + e + "_input2" : "_time_" + e + "_input";
                this.tt = geByClass1(a, D.patternWrap), showFastBox({
                    width: 435,
                    title: "Время действия (" + ("start" == e ? "позже" : "раньше") + ", чем)",
                    dark: 1,
                    containerClass: "nospam_report_time_box",
                    onShow: n
                }, '<div class="reports_time_label">Укажите дату:</div>', "Применить", r)
            },
            clear: function() {
                return this._sel = []
            }
        },
        A = {
            initUpdate: function() {
                scrollToY(R)
            }
        };
    t.noSpamReports = A
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = geByClass1("_nospam_tab_switch_" + e);
        uiTabs.switchTab(domFC(n)), t && (n = domChildren(n));
        var r = geByClass("nospam_tab"),
            o = domData(n, "tab-id");
        return r.forEach(function(e) {
            return domData(e, "id") == o ? void show(e) : void hide(e)
        }), (0, m.updateUrl)({
            tab: e
        }), e === k ? _.noSpamPatterns.initUpdate() : e === w && d.noSpamReports.initUpdate(), !1
    }

    function o() {
        return (0, m.getUrlParam)("tab")
    }

    function a() {
        var e = domPN(geByClass1("ui_tab_sel"));
        return domData(e, "tab-id")
    }

    function i(e) {
        var t = domData(e, "option"),
            n = domData(e, "option-state"),
            r = 1 ^ n,
            o = {
                act: "a_set_custom_option",
                name: t,
                state: r
            };
        ajax.post("noSpam.php", o, {
            onDone: s,
            showProgress: lockActionsMenuItem.pbind(e),
            hideProgress: unlockActionsMenuItem.pbind(e)
        })
    }

    function s(e) {
        var t = geByClass(S, y);
        t.forEach(function(t) {
            var n = domData(t, "option"),
                r = +e[n],
                o = window.cur.lang["nospam_options_" + n];
            o && (t.innerHTML = o[r]), domData(t, "option-state", r)
        }), cur.options.custom_options = e
    }

    function c(e) {
        var t = window,
            n = t.cur;
        return n.options.custom_options ? n.options.custom_options[e] : !1
    }

    function l(e) {
        var n = 30;
        extend(cur, {
            uiSpamtype: new Dropdown(ge("spamtype"), e.spamtypes, extend(x, {
                selectedItems: cur.options.spamtype
            })),
            uiSpamtype2: new Dropdown(ge("spamtype2"), e.spamtypes, extend(x, {
                selectedItems: cur.options.spamtype2
            })),
            uiSimplify: new Dropdown(ge("simplify_select"), e.simplifies, extend(x, {
                selectedItems: cur.options.simplify
            })),
            uiBan: new Dropdown(ge("ban_select"), e.bans, extend(x, {
                selectedItems: cur.options.ban
            })),
            uiDuration: new Dropdown(ge("duration_select"), e.durations, extend(x, {
                selectedItems: cur.options.duration
            })),
            uiSearchPeriod: new Dropdown(ge("search_period_select"), e.searchperiods, extend(x, {
                selectedItems: cur.options.searchperiod
            }))
        }), placeholderSetup("comment_input"), val("comment_input") && autosizeSetup("comment_input", {
            minHeight: n
        }), geByClass("conditions_input").forEach(function(e) {
            placeholderSetup("comment_input"),
                val(e) && autosizeSetup("comment_input", {
                    minHeight: n
                })
        });
        var r = ge("page_body");
        t.patternWrap = v = geByClass1("pattern_wrap", r), t.consoleWrap = h = geByClass1("console_wrap", r), t.reportTabs = b = geByClass1("reports_tabs", r), t.reportList = g = geByClass1("_reports_list", r), y = geByClass1("_nospam_options", r);
        var o = geByClass1("nospam_patterns_wrap", r),
            a = (0, f.createModule)({
                handlers: function(e, t) {
                    t(o, "click", "_abort_pattern_mild", function(e) {
                        return (0, _.abortPatternMild)(domData(e.target, "id"))
                    }), t(y, "click", S, function(e) {
                        return i(e.target)
                    })
                }
            });
        cur.destroy.push(function() {
            (0, f.destroyModule)(a)
        }), (0, u.mount)(), (0, d.mount)()
    }

    function p(e) {
        var t = (0, f.createMutations)(l),
            n = (t.callMutations, t.bindMutations);
        n(e)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.tabPatterns = t.tabPattern = t.tabReports = t.reportTabs = t.reportList = t.patternWrap = t.consoleWrap = void 0, t.switchTab = r, t.getCurrentTab = o, t.activeTab = a, t.getCustomOption = c, t.init = p;
    var u = n(12),
        d = n(13),
        _ = n(27),
        m = n(7),
        f = n(21),
        h = t.consoleWrap = void 0,
        v = t.patternWrap = void 0,
        g = t.reportList = void 0,
        b = t.reportTabs = void 0,
        y = void 0,
        w = t.tabReports = "reports",
        k = (t.tabPattern = "pattern", t.tabPatterns = "patterns"),
        S = "_nospam_option_action",
        x = {
            width: 185,
            height: 500,
            multiselect: !1
        }
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    var r = n(60);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, o) {
                    return e.call(t, n, r, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, n) {
    var r = n(67),
        o = n(17);
    e.exports = function(e) {
        return r(o(e))
    }
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            callMutations: function() {
                if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                return e
            },
            bindMutations: function() {
                return e = e.apply(void 0, arguments)
            }
        }
    }

    function o(e, t, n, r) {
        addEvent(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function a(e, t, n, r, o) {
        (0, c.addDelegateEvent)(t, n, r, o), e._registeredHandlers.push(["delegate", t, n, r, o])
    }

    function i(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(o.bind(null, t), a.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? c.removeDelegateEvent.apply(void 0, t) : removeEvent.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = i, t.destroyModule = s;
    var c = n(45)
}, function(e, t, n) {
    "use strict";
    var r = n(72),
        o = n(35),
        a = n(10),
        i = n(5),
        s = n(4),
        c = n(11),
        l = n(70),
        p = n(24),
        u = n(75),
        d = n(1)("iterator"),
        _ = !([].keys && "next" in [].keys()),
        m = "@@iterator",
        f = "keys",
        h = "values",
        v = function() {
            return this
        };
    e.exports = function(e, t, n, g, b, y, w) {
        l(n, t, g);
        var k, S, x, C = function(e) {
                if (!_ && e in P) return P[e];
                switch (e) {
                    case f:
                        return function() {
                            return new n(this, e)
                        };
                    case h:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            T = t + " Iterator",
            D = b == h,
            M = !1,
            P = e.prototype,
            B = P[d] || P[m] || b && P[b],
            j = B || C(b),
            L = b ? D ? C("entries") : j : void 0,
            E = "Array" == t ? P.entries || B : B;
        if (E && (x = u(E.call(new e)), x !== Object.prototype && (p(x, T, !0), r || s(x, d) || i(x, d, v))), D && B && B.name !== h && (M = !0, j = function() {
                return B.call(this)
            }), r && !w || !_ && !M && P[d] || i(P, d, j), c[t] = j, c[T] = v, b)
            if (k = {
                    values: D ? j : C(h),
                    keys: y ? j : C(f),
                    entries: L
                }, w)
                for (S in k) S in P || a(P, S, k[S]);
            else o(o.P + o.F * (_ || M), t, k);
        return k
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, n) {
    var r = n(9).f,
        o = n(4),
        a = n(1)("toStringTag");
    e.exports = function(e, t, n) {
        e && !o(e = n ? e : e.prototype, a) && r(e, a, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    var r = n(42)("keys"),
        o = n(20);
    e.exports = function(e) {
        return r[e] || (r[e] = o(e))
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = function(e) {
                var t = ge("in_process");
                return t ? e > 0 ? animateCount(t, e) : t.innerHTML = e : void 0
            },
            t = function(e) {
                ge("in_process").innerHTML = e || "Неизвестная ошибка (banProcess)"
            };
        ajax.post("noSpam.php", {
            act: "a_in_process"
        }, {
            onDone: e,
            onFail: t
        })
    }

    function o() {
        var e = function(e) {
                var t = geByClass1("in_process_wrap");
                if (t) {
                    show(t);
                    var n = e.table;
                    delete e.table, l = e, ge("patterns").innerHTML = n
                }
            },
            t = function(e) {
                var t = geByClass1("in_process_wrap");
                return t ? t.innerHTML = e || "Неизвестная ошибка (pProcess)" : void 0
            };
        ajax.post("noSpam.php", {
            act: "a_last_patterns"
        }, {
            onDone: e,
            onFail: t
        })
    }

    function a(e) {
        var t = function() {
                ge("abort_pattern_mild" + e).innerHTML = "<span style = 'color: green'>остановлен</span>"
            },
            n = function() {
                ge("abort_pattern_mild" + e).innerHTML = "<span style = 'color: red'>ошибка</span>"
            };
        ajax.post("noSpam.php", {
            act: "a_abort_pattern_mild",
            pid: e
        }, {
            onDone: t,
            onFail: n
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.noSpamPatterns = void 0, t.abortPatternMild = a;
    var i = n(14),
        s = 5e3,
        c = 1e4,
        l = {},
        p = void 0,
        u = void 0,
        d = void 0,
        _ = {
            patternTooltip: function(e, t) {
                var n = {
                    content: l[t] ? l[t].tooltip : "",
                    className: "pattern_tt_wrap",
                    nohideover: 0,
                    showsp: 150,
                    slide: 15,
                    hasover: 0,
                    shift: [5, 0, 0]
                };
                return showTooltip(e, n)
            },
            updateProcess: function(e) {
                var t = vkNow();
                "patterns" === (0, i.activeTab)() && -1 != window._wf && ((t - u > s || e) && (r(), u = t), (t - p > c || e) && (o(), p = t))
            },
            clearTimer: function() {
                clearInterval(d)
            },
            initUpdate: function() {
                this.updateProcess(!0), d || (d = setInterval(this.updateProcess, 1e3), cur.destroy.push(this.clearTimer))
            }
        };
    t.noSpamPatterns = _
}, , , function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t, n) {
    var r = n(32),
        o = n(1)("toStringTag"),
        a = "Arguments" == r(function() {
            return arguments
        }()),
        i = function(e, t) {
            try {
                return e[t]
            } catch (n) {}
        };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = i(t = Object(e), o)) ? n : a ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(2).document,
        a = r(o) && r(o.createElement);
    e.exports = function(e) {
        return a ? o.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    var r = n(2),
        o = n(15),
        a = n(5),
        i = n(10),
        s = n(16),
        c = "prototype",
        l = function(e, t, n) {
            var p, u, d, _, m = e & l.F,
                f = e & l.G,
                h = e & l.S,
                v = e & l.P,
                g = e & l.B,
                b = f ? r : h ? r[t] || (r[t] = {}) : (r[t] || {})[c],
                y = f ? o : o[t] || (o[t] = {}),
                w = y[c] || (y[c] = {});
            f && (n = t);
            for (p in n) u = !m && b && void 0 !== b[p], d = (u ? b : n)[p], _ = g && u ? s(d, r) : v && "function" == typeof d ? s(Function.call, d) : d, b && i(b, p, d, e & l.U), y[p] != d && a(y, p, _), v && w[p] != d && (w[p] = d)
        };
    r.core = o, l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
}, function(e, t, n) {
    var r = n(16),
        o = n(69),
        a = n(68),
        i = n(8),
        s = n(43),
        c = n(84);
    e.exports = function(e, t, n, l, p) {
        var u, d, _, m = p ? function() {
                return e
            } : c(e),
            f = r(n, l, t ? 2 : 1),
            h = 0;
        if ("function" != typeof m) throw TypeError(e + " is not iterable!");
        if (a(m))
            for (u = s(e.length); u > h; h++) t ? f(i(d = e[h])[0], d[1]) : f(e[h]);
        else
            for (_ = m.call(e); !(d = _.next()).done;) o(_, f, d.value, t)
    }
}, function(e, t, n) {
    e.exports = !n(3) && !n(18)(function() {
        return 7 != Object.defineProperty(n(33)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    var r = n(20)("meta"),
        o = n(6),
        a = n(4),
        i = n(9).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        l = !n(18)(function() {
            return c(Object.preventExtensions({}))
        }),
        p = function(e) {
            i(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        u = function(e, t) {
            if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, r)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                p(e)
            }
            return e[r].i
        },
        d = function(e, t) {
            if (!a(e, r)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                p(e)
            }
            return e[r].w
        },
        _ = function(e) {
            return l && m.NEED && c(e) && !a(e, r) && p(e), e
        },
        m = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: u,
            getWeak: d,
            onFreeze: _
        }
}, function(e, t, n) {
    var r = n(8),
        o = n(73),
        a = n(34),
        i = n(25)("IE_PROTO"),
        s = function() {},
        c = "prototype",
        l = function() {
            var e, t = n(33)("iframe"),
                r = a.length,
                o = ">";
            for (t.style.display = "none", n(65).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + o), e.close(), l = e.F; r--;) delete l[c][a[r]];
            return l()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[c] = r(e), n = new s, s[c] = null, n[i] = e) : n = l(), void 0 === t ? n : o(n, t)
    }
}, function(e, t, n) {
    var r = n(10);
    e.exports = function(e, t, n) {
        for (var o in t) r(e, o, t[o], n);
        return e
    }
}, function(e, t, n) {
    var r = n(2),
        o = "__core-js_shared__",
        a = r[o] || (r[o] = {});
    e.exports = function(e) {
        return a[e] || (a[e] = {})
    }
}, function(e, t, n) {
    var r = n(26),
        o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    var r = n(6);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
        if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e) {
        var t = p.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r, o = 0; o < n.length; o++) {
                    var a, i = s(n[o], 2),
                        c = i[0],
                        l = i[1];
                    if (hasClass(e.target, c) ? a = l(e, e.target) : (r = gpeByClass(c, e.target, e.currentTarget)) && (a = l(e, r)), a === !1) break
                }
        }
    }

    function a(e, t, n, r) {
        var a = p.get(e);
        a || (p.set(e, {}), a = p.get(e));
        for (var i = t.split(" "), s = 0; s < i.length; s++) {
            var c = i[s];
            a[c] || (a[c] = [], addEvent(e, c, o)), a[c].push([n, r])
        }
    }

    function i(e, t, n, r) {
        var a = p.get(e);
        if (a) {
            var i = (t.split(" ").forEach(function(t) {
                a[t] && (a[t] = a[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === a[t].length && removeEvent(e, t, o))
            }), Object.keys(a).map(function(e) {
                return a[e].length
            }).reduce(function(e, t) {
                return e + t
            }));
            0 === i && p["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                o = !1,
                a = void 0;
            try {
                for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
            } catch (c) {
                o = !0, a = c
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (o) throw a
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.addDelegateEvent = a, t.removeDelegateEvent = i;
    var c = n(59),
        l = r(c),
        p = new l["default"]
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }
    var o = (n(13), n(48)),
        a = r(o),
        i = n(14),
        s = n(12),
        c = n(50);
    window.noSpamConsole = {
        setIp: s.setIp,
        setUaHash: s.setUaHash,
        switchParams: s.switchParams,
        addPatternPart: s.addPatternPart,
        optionClear: s.optionClear,
        getConditionsHint: s.getConditionsHint,
        conditionsClear: s.conditionsClear
    }, window.noSpamUI = {
        switchTab: i.switchTab
    }, extend(window, a), window.noSpam = {
        init: function(e) {
            cur.options = extend(cur.options || {}, e.pattern), extend(cur, {
                mousedown: 0,
                module: "noSpam",
                selectedTab: "pattern",
                conditions: new noSpamTemplates({
                    input: ge("conditions_input"),
                    wrap: ge("templates_wrap"),
                    label: geByClass1("templates_label", "templates_wrap"),
                    label_html: "Шаблоны:",
                    links: "template_links",
                    hash: e.template_hash,
                    templates: e.templates_json,
                    acts: {
                        add: "add_template",
                        save: "save_template",
                        edit: "edit_template",
                        remove: "delete_template",
                        sort: "sort_template"
                    }
                }),
                comment: new noSpamTemplates({
                    input: ge("comment_input"),
                    wrap: ge("comment_templates_wrap"),
                    label: geByClass1("templates_label", "comment_templates_wrap"),
                    label_html: '<span class="template_sort" onclick="return cur.comment.editSort();">Шаблоны</span>:',
                    links: ge("comment_template_links"),
                    hash: e.comment_hash,
                    templates: e.comment_templates_json,
                    acts: {
                        add: "add_comment_template",
                        save: "save_comment_template",
                        edit: "edit_comment_template",
                        remove: "delete_comment_template",
                        sort: "sort_comment_templates",
                        sort_save: "save_comment_sort"
                    }
                }),
                getIpWithBits: function(e) {
                    return (0, s.getNumericField)("ip" + e)
                },
                numFieldCheck: function(e, t) {
                    toggleClass(e, "on", t);
                    var n = cur.numFieldGetChecked();
                    ge("numeric_field_checked").innerHTML = n.length || 0, cur.numFieldPattern()
                },
                numFieldCheckAll: function(e) {
                    var t = hasClass(e, "toggled"),
                        n = curBox(),
                        r = geByClass("checkbox", n.bodyNode);
                    each(r, function(e, n) {
                        cur.numFieldCheck(n, t ? 0 : 1)
                    }), t ? removeClass(e, "toggled") : addClass(e, "toggled"), e.innerHTML = t ? getLang("nospam_numfield_select_all") : getLang("nospam_numfield_deselect_all")
                },
                numFieldCheckbox: function(e) {
                    var t = geByClass1("numeric_field_checkbox", e.parentNode);
                    return t ? t.parentNode : !1
                },
                numFieldGetChecked: function() {
                    var e = curBox().bodyNode,
                        t = geByClass("on", e),
                        n = [];
                    return each(t, function(e, t) {
                        e = trim(t.dataset.value), e && n.push(e)
                    }), n || []
                },
                numFieldCondition: function(e) {
                    var t = cur.numFieldSel,
                        n = t.match(/^ip([0-9]+)$/i);
                    n && intval(n[1]) && (t = "(ip & -" + n[1] + ")");
                    var r = cur.numFieldGetChecked();
                    if (0 !== r.length) {
                        var o = r ? 1 === r.length ? t + " = " + r : t + " IN (" + r.join(", ") + ")" : "";
                        return e ? o : void(r && ((0, s.setConditions)(o), curBox().hide()))
                    }
                },
                numFieldOver: function(e) {
                    removeSelectedText();
                    var t = cur.numFieldCheckbox(e.target);
                    1 === cur.mousedown && t && cur.numFieldCheck(t)
                },
                numFieldClick: function(e) {
                    var t = e.target,
                        n = cur.numFieldCheckbox(t);
                    hasClass(t, "ui_table_cell") && n && cur.numFieldCheck(n)
                },
                numFieldPattern: function() {
                    var e = cur.numFieldCondition(1) || "",
                        t = "/noSpam?bantype=1&comment=&duration=1&pattern=%2F&search_period=24&simplify=32&type=" + cur.uiSpamtype.val() + "&conditions=" + encodeURIComponent(e),
                        n = ge("numeric_field_pattern");
                    n.href = t
                },
                showFullValue: function(e) {
                    return hasClass(e, "full_value") ? removeClass(e, "full_value") : addClass(e, "full_value")
                },
                showMoreOptions: function(e) {
                    var t = geByClass("checkbox", ge("search_options"));
                    t.forEach(function(e, t) {
                        hasClass(e, "secondary") && (e.style.display = isVisible(e) ? "none" : "inline-block")
                    })
                },
                getGraphsBox: function(e) {
                    return cur.graphs = showTabbedBox("noSpam.php", {
                        act: "a_get_moders_stats"
                    }, {
                        dark: 1
                    })
                },
                toggleHistogram: function(e) {
                    e.innerHTML = isChecked(e) ? "без гистограммы" : "гистограммой", checkbox(e)
                },
                toggleIp: function(e) {
                    var t = clean(e.dataset.ipLong || "");
                    return (0, s.setIp)(t)
                },
                toggleUa: function(e) {
                    var t = clean(e.dataset.uaHash || "");
                    return (0, s.setUaHash)(t)
                },
                sharePatternLink: function(e) {
                    var t = setTimeout.pbind(function() {
                        var e = ge("shorten_link").innerText;
                        ge("mail_box_editable").innerHTML = e
                    }, 5);
                    showBox("al_im.php", {
                        act: "a_write_box"
                    }, {
                        stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", "emoji.js", "notifier.css"],
                        onDone: t
                    }, e)
                }
            }), cur.onmousedown = function(e) {
                cur.mousedown = e
            }, addEvent(document, "mousedown", cur.onmousedown.pbind(1)), addEvent(document, "mouseup", cur.onmousedown.pbind(0)), cur.options.shift = e.shift, cur.destroy = [removeEvent.pbind(document, "mouseup"), removeEvent.pbind(document, "mousedown"), removeEvent.pbind(document, "keydown"), removeEvent.pbind(document, "click")], (0, s.init)(e.localstorage_restore_conditions), (0, i.init)(e.pattern), e.tab && (0, i.switchTab)(e.tab)
        },
        initFastPatterns: c.init.pbind()
    };
    try {
        stManager.done(jsc("internal/nospam.js"))
    } catch (l) {
        console.log(l.message)
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return se("<textarea>" + e + "</textarea>").value
    }

    function o(e) {
        var t = document,
            n = t.getElementById(e);
        if (t.body.createTextRange) {
            var r = t.body.createTextRange();
            r.moveToElementText(n), r.select()
        } else if (window.getSelection) {
            var o = window.getSelection(),
                r = t.createRange();
            r.selectNodeContents(n), o.removeAllRanges(), o.addRange(r)
        }
    }

    function a() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function i() {
        var e = "";
        return window.getSelection ? e = window.getSelection() : document.getSelection ? e = document.getSelection() : document.selection && (e = document.selection.createRange().text), e
    }

    function s(e) {
        var t = ge(e);
        return t.options[t.selectedIndex].value
    }

    function c(e, t, n, r) {
        ajax.post("noSpam.php", {
            act: "a_block_domain",
            domain: e,
            type: t,
            hash: n,
            warn_users: isChecked("warn_users") || 0,
            comment: ge("linksban_comment").value,
            link_ex: r
        }, {
            onDone: function(n) {
                ge("block_domain_1_" + e).innerHTML = "", ge("block_domain_2_" + e).innerHTML = "", ge("block_domain_3_" + e).innerHTML = "", ge("block_domain_" + t + "_" + e).innerHTML = n
            }
        })
    }

    function l(e, t) {
        ajax.post("noSpam.php", {
            act: "a_remove_fid_search",
            fid: e,
            hash: t
        }, {
            onDone: function(t) {
                ge("remove_fid_search_" + e).innerHTML = t
            }
        })
    }

    function p(e, t) {
        ajax.post("noSpam.php", {
            act: "a_ban_fid_zero",
            fid: e,
            hash: t
        }, {
            onDone: function(t) {
                ge("ban_fid_zero_" + e).innerHTML = t
            }
        })
    }

    function u(e, t) {
        ajax.post("noSpam.php", {
            act: "a_ban_fid_forever",
            fid: e,
            hash: t
        }, {
            onDone: function(t) {
                ge("ban_fid_forever_" + e).innerHTML = t
            }
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var d = n(27);
    Object.defineProperty(t, "noSpamPatterns", {
        enumerable: !0,
        get: function() {
            return d.noSpamPatterns
        }
    }), Object.defineProperty(t, "abortPatternMild", {
        enumerable: !0,
        get: function() {
            return d.abortPatternMild
        }
    });
    var _ = n(52);
    Object.defineProperty(t, "noSpamSuspicious", {
        enumerable: !0,
        get: function() {
            return _.noSpamSuspicious
        }
    });
    var m = n(53);
    Object.defineProperty(t, "noSpamTemplates", {
        enumerable: !0,
        get: function() {
            return m.noSpamTemplates
        }
    });
    var f = n(13);
    Object.defineProperty(t, "dealSingleSpamer", {
        enumerable: !0,
        get: function() {
            return f.dealSingleSpamer
        }
    }), Object.defineProperty(t, "reportsTime", {
        enumerable: !0,
        get: function() {
            return f.reportsTime
        }
    }), Object.defineProperty(t, "onFiltersChange", {
        enumerable: !0,
        get: function() {
            return f.onFiltersChange
        }
    });
    var h = n(51);
    Object.defineProperty(t, "rollbackDocMailSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackDocMailSpamer
        }
    }), Object.defineProperty(t, "rollbackDocWallSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackDocWallSpamer
        }
    }), Object.defineProperty(t, "rollbackJpgMailSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackJpgMailSpamer
        }
    }), Object.defineProperty(t, "rollbackJpgWallSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackJpgWallSpamer
        }
    }), Object.defineProperty(t, "rollbackPngMailSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackPngMailSpamer
        }
    }), Object.defineProperty(t, "rollbackPngWallSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackPngWallSpamer
        }
    }), Object.defineProperty(t, "rollbackDocSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackDocSpamer
        }
    }), Object.defineProperty(t, "rollbackPhotoSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackPhotoSpamer
        }
    }), Object.defineProperty(t, "rollbackPhotoSpamerFromWall", {
        enumerable: !0,
        get: function() {
            return h.rollbackPhotoSpamerFromWall
        }
    }), Object.defineProperty(t, "rollbackPhotoSpamerFromMail", {
        enumerable: !0,
        get: function() {
            return h.rollbackPhotoSpamerFromMail
        }
    }), Object.defineProperty(t, "rollbackVideoSpamer", {
        enumerable: !0,
        get: function() {
            return h.rollbackVideoSpamer
        }
    }), Object.defineProperty(t, "rollbackVideoSpamerFromWall", {
        enumerable: !0,
        get: function() {
            return h.rollbackVideoSpamerFromWall
        }
    }), Object.defineProperty(t, "rollbackVideoSpamerFromMail", {
        enumerable: !0,
        get: function() {
            return h.rollbackVideoSpamerFromMail
        }
    }), t.entityDecode = r, t.selectText = o, t.removeSelectedText = a, t.getSelectedText = i, t.selectValue = s, t.blockDomain = c, t.removeFidSearch = l, t.banFidZero = p, t.banFidForever = u
}, function(e, t) {
    "use strict";

    function n() {
        o = (new Date).getTime()
    }

    function r() {
        var e = (new Date).getTime(),
            t = (e - o) / 1e3,
            n = Array.prototype.slice.call(arguments);
        n.push(t), debugLog.apply(null, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.startDebugTimer = n, t.debugLogTimer = r;
    var o = void 0
}, function(e, t) {
    "use strict";

    function n() {
        addEvent(document, "mousedown", r)
    }

    function r(e) {
        if (e.altKey) {
            var t = null;
            if ("a" === e.target.tagName.toLowerCase() && e.target.href) t = decodeURIComponent(e.target.href);
            else {
                if ("a" !== domPN(e.target).tagName.toLowerCase() || !domPN(e.target).href) return;
                t = decodeURIComponent(domPN(e.target).href)
            }
            var n = o(t);
            n && (cancelEvent(e), window.open(n, "_blank"))
        }
    }

    function o(e) {
        var t = {
                text: v,
                duration: g,
                searchPeriod: h,
                ban: f,
                simplify: m
            },
            n = a(e);
        if (!n) return !1;
        var r = extend(t, n);
        return "https://vk.com/noSpam?text=" + r.text + "&type=" + r.spamType + "&simplify=" + r.simplify + "&duration=" + r.duration + "&search_period=" + r.searchPeriod + "&ban=" + r.ban + "&conditions=" + r.conditions
    }

    function a(e) {
        var t = i(e);
        return t ? (t.conditions = encodeURIComponent(t.conditions), t) : !1
    }

    function i(e) {
        var t = e.match(new RegExp("(-?\\d+)_(\\d+)"));
        if (!t) return !1;
        var n = parseInt(t[1]),
            r = parseInt(t[2]),
            o = e.match(new RegExp("wall-?\\d+_\\d+\\?z=photo(-?\\d+)_(\\d+).*"));
        if (o) {
            var a = o[1],
                i = o[2];
            return {
                spamType: c,
                conditions: "owner_id = " + a + " && photo_id = " + i
            }
        }
        var m = e.match(new RegExp("photo"));
        if (m) return {
            spamType: c,
            conditions: "owner_id = " + n + " && photo_id = " + r
        };
        var f = e.match(new RegExp("wall-?\\d+_\\d+\\?z=video(-?\\d+)_(\\d+).*"));
        if (f) {
            var h = f[1],
                v = f[2];
            return {
                spamType: l,
                conditions: "owner_id = " + h + " && video_id = " + v
            }
        }
        var g = e.match(new RegExp("youtube.*v=([^&]+)"));
        if (g) return {
            spamType: l,
            conditions: g[1] + "'<<external"
        };
        var b = e.match(new RegExp("video"));
        if (b) return {
            spamType: l,
            conditions: "owner_id = " + n + " && video_id = " + r
        };
        var y = e.match(new RegExp("wall-?\\d+_\\d+\\?z=doc(-?\\d+)_(\\d+).*"));
        if (y) return {
            spamType: p,
            conditions: "owner_id = " + n + " && doc_id = " + r
        };
        var w = e.match(new RegExp("doc"));
        if (w) return {
            spamType: p,
            conditions: "owner_id = " + n + " && doc_id = " + r
        };
        var k = e.match(new RegExp("note"));
        if (k) return {
            spamType: u,
            conditions: "owner_id = " + n + " && note_id = " + r
        };
        var S = -n,
            x = e.match(new RegExp("topic.*post=(\\d+)"));
        if (x) {
            var C = "-" + x[1];
            return {
                spamType: _,
                conditions: "group_id = " + S + " && topic_id = " + r + " && comment_id = " + C
            }
        }
        var T = e.match(new RegExp("topic"));
        if (T) return {
            spamType: _,
            conditions: "group_id = " + S + " && topic_id = " + r
        };
        var D = e.match(new RegExp("page"));
        if (D) return n = -parseInt(n), {
            spamType: d,
            conditions: "group_id = " + n + " && page_id = " + r
        };
        var M = e.match(new RegExp("wall-?\\d+_\\d+\\?reply=\\d+&w=wall.*"));
        if (M) return {
            spamType: s,
            conditions: "owner_id = " + n + " && msg_id = " + r
        };
        var P = e.match(new RegExp("wall-?\\d+_\\d+\\?w=wall-\\d+_\\d+_r(\\d+)|wall-?\\d+_\\d+\\?reply=(\\d+)"));
        if (P) {
            var B = P[1] || P[2];
            return {
                spamType: s,
                conditions: "owner_id = " + n + " && msg_id = " + B
            }
        }
        var j = e.match(new RegExp("wall"));
        return j ? {
            spamType: s,
            conditions: "owner_id = " + n + " && msg_id = " + r
        } : (topError("Undefined spam type"), !1)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.init = n;
    var s = "wall",
        c = "photo",
        l = "video",
        p = "docs",
        u = "note",
        d = "wiki",
        _ = "topic_comment",
        m = 32,
        f = 1,
        h = 24,
        v = "%2F",
        g = 4
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = ge("console_item_" + e);
        hasClass(t, h) && removeClass(t, h), addClass(t, v)
    }

    function r(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_docmail_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_docmail_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            to_id: a,
            to_msg_id: i
        }, {
            onDone: s
        })
    }

    function o(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_docwall_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_docwall_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            msg_id: i
        }, {
            onDone: s
        })
    }

    function a(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_jpgmail_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_jpgmail_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            to_id: a,
            to_msg_id_id: i
        }, {
            onDone: s
        })
    }

    function i(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_jpgwall_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_jpgwall_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            msg_id: i
        }, {
            onDone: s
        })
    }

    function s(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_pngmail_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_pngmail_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            to_id: a,
            to_msg_id: i
        }, {
            onDone: s
        })
    }

    function c(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_pngwall_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_pngwall_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            msg_id: i
        }, {
            onDone: s
        })
    }

    function l(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_doc_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_doc_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            doc_id: i
        }, {
            onDone: s
        })
    }

    function p(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_photo_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_photo_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            photo_id: i
        }, {
            onDone: s
        })
    }

    function u(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_photo_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_photo_spamer_from_wall",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            msg_id: i
        }, {
            onDone: s
        })
    }

    function d(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_photo_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_photo_spamer_from_mail",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            to_id: a,
            to_msg_id: i
        }, {
            onDone: s
        })
    }

    function _(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_video_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_video_spamer",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            video_id: i
        }, {
            onDone: s
        })
    }

    function m(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_video_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_video_spamer_from_wall",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            owner_id: a,
            msg_id: i
        }, {
            onDone: s
        })
    }

    function f(e, t, r, o, a, i) {
        var s = function(t) {
            ge("rollback_video_spamer" + e).innerHTML = t, n(e)
        };
        ajax.post("noSpam.php", {
            act: "rollback_video_spamer_from_mail",
            uid: e,
            hash: t,
            act_type: r,
            spam_date: o,
            to_id: a,
            to_msg_id: i
        }, {
            onDone: s
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.rollbackDocMailSpamer = r, t.rollbackDocWallSpamer = o, t.rollbackJpgMailSpamer = a, t.rollbackJpgWallSpamer = i, t.rollbackPngMailSpamer = s, t.rollbackPngWallSpamer = c, t.rollbackDocSpamer = l, t.rollbackPhotoSpamer = p, t.rollbackPhotoSpamerFromWall = u, t.rollbackPhotoSpamerFromMail = d, t.rollbackVideoSpamer = _, t.rollbackVideoSpamerFromWall = m, t.rollbackVideoSpamerFromMail = f;
    var h = "green_item",
        v = "red_item"
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        selected: "ua_hash",
        updateOnSelect: function() {
            return n.getByType(n.selected)
        },
        getSpamType: function() {
            return isObject(this.spamtype) ? this.spamtype._selected[0] : "wall"
        },
        getPeriod: function() {
            return isObject(this.period) ? this.period._selected[0] : 1
        },
        getByType: function(e) {
            var t = ge("suspicious_table"),
                n = geByClass1("summary_tab_sel", "suspicious_tabs"),
                r = isVisible("suspicious_tabs") ? 0 : 1,
                o = this;
            this.selected = e;
            var a = ge("suspicious_spamtype"),
                i = ge("suspicious_period"),
                s = geByClass("_suspicious_msg"),
                c = geByClass1("_suspicious_" + e + "_msg");
            each(s, function(e, t) {
                hide(t)
            }), show(c), "hashtags" == e ? hide(a) : show(a), "users" == e && hide(a, i), r && (t = ge("suspicious")), removeClass(n, "summary_tab_sel");
            var l = function(e) {
                    return e ? (t.innerHTML = e, void o.initInlineDropdown()) : topError(getLang("nospam_suspicious_data_error"))
                },
                p = {
                    act: "a_get_suspicious",
                    type: e,
                    spamtype: this.getSpamType(),
                    period: this.getPeriod(),
                    need_tabs: r
                };
            addClass("suspicious_" + e, "summary_tab_sel"), ajax.post("noSpam.php", p, {
                onDone: l,
                progress: "suspicious_progress"
            })
        },
        initInlineDropdown: function() {
            var e = {
                    withArrow: !0,
                    keepTitle: !0,
                    autoShow: !0,
                    autoHide: 300,
                    onSelect: n.updateOnSelect
                },
                t = extend({
                    items: cur.options.spamtypes,
                    selected: "wall"
                }, e),
                r = extend({
                    items: [
                        [1, "Один час"],
                        [2, "Два часа"],
                        [5, "5 часов"],
                        [10, "10 часов"],
                        [24, "Сутки"]
                    ],
                    selected: 1
                }, e);
            this.spamtype || (this.spamtype = new InlineDropdown("suspicious_spamtype", t)), this.spamtype._els.valueEl.innerHTML = this.spamtype._selected[1], this.period || (this.period = new InlineDropdown("suspicious_period", r)), this.period._els.valueEl.innerHTML = this.period._selected[1]
        }
    };
    t.noSpamSuspicious = n
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.noSpamTemplates = void 0;
    var r = n(12),
        o = function(e) {
            this.selected = 0, extend(this, e), this.templates = JSON.parse(e.templates)
        };
    o.prototype = {
        addTemplate: function() {
            showBox("noSpam.php", {
                act: this.acts.add
            }, {
                params: {
                    width: 430,
                    dark: 1,
                    progress: "add_template"
                }
            })
        },
        saveTemplate: function(e) {
            var t = cur[e],
                n = t.selected || 0;
            if (ge("add_template_title") && ge("add_template_text")) {
                var r = trim(ge("add_template_title").value),
                    o = trim(ge("add_template_text").value);
                if (!r) return notaBene("add_template_title");
                if (!o) return notaBene("add_template_text");
                var a = function(e, n) {
                        var r = ge(t.links);
                        r.innerHTML = e, hasClass(r, "template_links") || addClass(r, "template_links"), t.templates = JSON.parse(n), curBox().hide()
                    },
                    i = {
                        act: t.acts.save,
                        title: r,
                        text: o,
                        hash: t.hash,
                        template_id: n
                    };
                ajax.post("noSpam.php", i, {
                    onDone: a,
                    progress: n ? "edit_template" : "add_template"
                })
            }
        },
        editTemplate: function() {
            var e = {
                act: this.acts.edit,
                template_id: this.selected,
                hash: this.hash
            };
            showBox("noSpam.php", e, {
                params: {
                    width: 430,
                    dark: 1,
                    progress: "edit_template"
                }
            })
        },
        deleteTemplate: function() {
            var e = this;
            if (!this.selected) return !1;
            var t = function() {
                    var t = e.selected,
                        n = {
                            act: e.acts.remove,
                            template_id: t,
                            hash: e.hash
                        },
                        r = function(t, n) {
                            var r = ge(e.links);
                            r.innerHTML = t, e.deselectTemplate(), e.templates = JSON.parse(n), isObject(e.templates) || removeClass(r, "template_links"), curBox().hide()
                        };
                    ajax.post("noSpam.php", n, {
                        onDone: r,
                        progress: "delete_condition"
                    })
                },
                n = {
                    title: "Удаление шаблона",
                    width: 430,
                    dark: 1,
                    progress: "delete_condition"
                };
            showFastBox(n, getLang("nospam_delete_template"), getLang("global_delete"), t, getLang("global_cancel"))
        },
        selectTemplate: function(e) {
            if (e) {
                var t = this.templates[e];
                this.selected = e;
                var n = entityDecode(t.text);
                (0, r.setConditions)(n), this.label.innerHTML = t.title + ": ", addClass(this.wrap, "template_selected")
            }
        },
        selectCommentTemplate: function(e) {
            if (e) {
                var t = this.templates[e];
                this.selected = e;
                var n = entityDecode(t.text);
                this.editComment(n), this.label.innerHTML = t.answer_name + ": ", addClass(this.wrap, "template_selected")
            }
        },
        editComment: function(e) {
            return val(this.input, e), this.input.autosize ? this.input.autosize.update() : void autosizeSetup("comment_input", {
                minHeight: 32
            })
        },
        getFromLocal: function(e) {
            var t = localStorage.comments_templates_storage;
            ge("get_local_comments");
            try {
                t = JSON.parse(t)
            } catch (n) {}
            return t ? t && e ? (each(t, function(e, t) {
                var n = function(e, t) {
                    var n = ge("comment_template_links");
                    hasClass(n, "template_links") || addClass(n, "template_links"), cur.comment.links.innerHTML = e, cur.comment.templates = JSON.parse(t)
                };
                setTimeout(function() {
                    var e = t[1];
                    ajax.post("noSpam.php", {
                        act: "save_comment_template",
                        title: e.name,
                        text: e.comment,
                        hash: opts.comment_hash,
                        template_id: 0
                    }, {
                        onDone: n
                    })
                }, 1e3 * e)
            }), curBox().hide()) : void showBox("noSpam.php", {
                act: "apply_comments_export"
            }, {
                params: {
                    width: 430,
                    dark: 1,
                    progress: "export_progress"
                }
            }) : showFastBox({
                title: "Перенос шаблонов",
                dark: 1
            }, "К сожалению, не удалось найти ни одного комментария.")
        },
        deselectTemplate: function() {
            var e = this.selected,
                t = this.templates[e];
            if (t) {
                var n = entityDecode(this.templates[e].text);
                t && this.input.value == n && val(this.input, ""), this.label.innerHTML = this.label_html, removeClass(this.wrap, "template_selected"), delete this.selected
            }
        },
        editSort: function() {
            var e = {
                act: this.acts.sort,
                hash: this.hash
            };
            showBox("noSpam.php", e, {
                params: {
                    width: 430,
                    dark: 1,
                    progress: "sort_template"
                }
            })
        },
        saveSort: function(e, t, n, r, o) {
            var a = cur[e],
                i = {
                    hash: t,
                    act: a.acts.sort_save,
                    tid: n.id.replace("template", ""),
                    tpos: n.dataset.pos,
                    after_id: r && r.dataset ? r.dataset.pos : "",
                    before_id: o && o.dataset ? o.dataset.pos : ""
                },
                s = function(e, t) {
                    box = curBox(), box.content(e[2]), box.evalBox(t), box.setOptions({
                        onHide: function() {
                            debugLog(e), a.links.innerHTML = e[0], a.templates = JSON.parse(e[1])
                        }
                    })
                };
            ajax.post("noSpam.php", i, {
                onDone: s,
                progress: "sort_template"
            })
        }
    }, t.noSpamTemplates = o
}, , , , , , function(e, t, n) {
    n(87), n(88), n(89), n(86), e.exports = n(15).Map
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(1)("unscopables"),
        o = Array.prototype;
    void 0 == o[r] && n(5)(o, r, {}), e.exports = function(e) {
        o[r][e] = !0
    }
}, function(e, t, n) {
    var r = n(19),
        o = n(43),
        a = n(82);
    e.exports = function(e) {
        return function(t, n, i) {
            var s, c = r(t),
                l = o(c.length),
                p = a(i, l);
            if (e && n != n) {
                for (; l > p;)
                    if (s = c[p++], s != s) return !0
            } else
                for (; l > p; p++)
                    if ((e || p in c) && c[p] === n) return e || p;
            return !e && -1
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(9).f,
        o = n(40),
        a = (n(5), n(41)),
        i = n(16),
        s = n(30),
        c = n(17),
        l = n(36),
        p = n(22),
        u = n(38),
        d = n(80),
        _ = n(3),
        m = n(39).fastKey,
        f = _ ? "_s" : "size",
        h = function(e, t) {
            var n, r = m(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, p) {
            var u = e(function(e, r) {
                s(e, u, t, "_i"), e._i = o(null),
                    e._f = void 0, e._l = void 0, e[f] = 0, void 0 != r && l(r, n, e[p], e)
            });
            return a(u.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[f] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = h(t, e);
                    if (n) {
                        var r = n.n,
                            o = n.p;
                        delete t._i[n.i], n.r = !0, o && (o.n = r), r && (r.p = o), t._f == n && (t._f = r), t._l == n && (t._l = o), t[f]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    s(this, u, "forEach");
                    for (var t, n = i(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!h(this, e)
                }
            }), _ && r(u.prototype, "size", {
                get: function() {
                    return c(this[f])
                }
            }), u
        },
        def: function(e, t, n) {
            var r, o, a = h(e, t);
            return a ? a.v = n : (e._l = a = {
                i: o = m(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = a), r && (r.n = a), e[f]++, "F" !== o && (e._i[o] = a)), e
        },
        getEntry: h,
        setStrong: function(e, t, n) {
            p(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? u(0, n.k) : "values" == t ? u(0, n.v) : u(0, [n.k, n.v]) : (e._t = void 0, u(1))
            }, n ? "entries" : "values", !n, !0), d(t)
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(2),
        o = n(35),
        a = n(10),
        i = n(41),
        s = n(39),
        c = n(36),
        l = n(30),
        p = n(6),
        u = n(18),
        d = n(71),
        _ = n(24),
        m = n(66);
    e.exports = function(e, t, n, f, h, v) {
        var g = r[e],
            b = g,
            y = h ? "set" : "add",
            w = b && b.prototype,
            k = {},
            S = function(e) {
                var t = w[e];
                a(w, e, "delete" == e ? function(e) {
                    return v && !p(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return v && !p(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return v && !p(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (v || w.forEach && !u(function() {
                (new b).entries().next()
            }))) {
            var x = new b,
                C = x[y](v ? {} : -0, 1) != x,
                T = u(function() {
                    x.has(1)
                }),
                D = d(function(e) {
                    new b(e)
                }),
                M = !v && u(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            D || (b = t(function(t, n) {
                l(t, b, e);
                var r = m(new g, t, b);
                return void 0 != n && c(n, h, r[y], r), r
            }), b.prototype = w, w.constructor = b), (T || M) && (S("delete"), S("has"), h && S("get")), (M || C) && S(y), v && w.clear && delete w.clear
        } else b = f.getConstructor(t, e, h, y), i(b.prototype, n), s.NEED = !0;
        return _(b, e), k[e] = b, o(o.G + o.W + o.F * (b != g), k), v || f.setStrong(b, e, h), b
    }
}, function(e, t, n) {
    e.exports = n(2).document && document.documentElement
}, function(e, t, n) {
    var r = n(6),
        o = n(79).set;
    e.exports = function(e, t, n) {
        var a, i = t.constructor;
        return i !== n && "function" == typeof i && (a = i.prototype) !== n.prototype && r(a) && o && o(e, a), e
    }
}, function(e, t, n) {
    var r = n(32);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t, n) {
    var r = n(11),
        o = n(1)("iterator"),
        a = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || a[o] === e)
    }
}, function(e, t, n) {
    var r = n(8);
    e.exports = function(e, t, n, o) {
        try {
            return o ? t(r(n)[0], n[1]) : t(n)
        } catch (a) {
            var i = e["return"];
            throw void 0 !== i && r(i.call(e)), a
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(40),
        o = n(23),
        a = n(24),
        i = {};
    n(5)(i, n(1)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(i, {
            next: o(1, n)
        }), a(e, t + " Iterator")
    }
}, function(e, t, n) {
    var r = n(1)("iterator"),
        o = !1;
    try {
        var a = [7][r]();
        a["return"] = function() {
            o = !0
        }, Array.from(a, function() {
            throw 2
        })
    } catch (i) {}
    e.exports = function(e, t) {
        if (!t && !o) return !1;
        var n = !1;
        try {
            var a = [7],
                i = a[r]();
            i.next = function() {
                n = !0
            }, a[r] = function() {
                return i
            }, e(a)
        } catch (s) {}
        return n
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    var r = n(9),
        o = n(8),
        a = n(77);
    e.exports = n(3) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var n, i = a(t), s = i.length, c = 0; s > c;) r.f(e, n = i[c++], t[n]);
        return e
    }
}, function(e, t, n) {
    var r = n(78),
        o = n(23),
        a = n(19),
        i = n(44),
        s = n(4),
        c = n(37),
        l = Object.getOwnPropertyDescriptor;
    t.f = n(3) ? l : function(e, t) {
        if (e = a(e), t = i(t, !0), c) try {
            return l(e, t)
        } catch (n) {}
        return s(e, t) ? o(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    var r = n(4),
        o = n(83),
        a = n(25)("IE_PROTO"),
        i = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = o(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? i : null
    }
}, function(e, t, n) {
    var r = n(4),
        o = n(19),
        a = n(62)(!1),
        i = n(25)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = o(e),
            c = 0,
            l = [];
        for (n in s) n != i && r(s, n) && l.push(n);
        for (; t.length > c;) r(s, n = t[c++]) && (~a(l, n) || l.push(n));
        return l
    }
}, function(e, t, n) {
    var r = n(76),
        o = n(34);
    e.exports = Object.keys || function(e) {
        return r(e, o)
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    var r = n(6),
        o = n(8),
        a = function(e, t) {
            if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(16)(Function.call, n(74).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (o) {
                t = !0
            }
            return function(e, n) {
                return a(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: a
    }
}, function(e, t, n) {
    "use strict";
    var r = n(2),
        o = n(9),
        a = n(3),
        i = n(1)("species");
    e.exports = function(e) {
        var t = r[e];
        a && t && !t[i] && o.f(t, i, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, n) {
    var r = n(26),
        o = n(17);
    e.exports = function(e) {
        return function(t, n) {
            var a, i, s = String(o(t)),
                c = r(n),
                l = s.length;
            return 0 > c || c >= l ? e ? "" : void 0 : (a = s.charCodeAt(c), 55296 > a || a > 56319 || c + 1 === l || (i = s.charCodeAt(c + 1)) < 56320 || i > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) : (a - 55296 << 10) + (i - 56320) + 65536)
        }
    }
}, function(e, t, n) {
    var r = n(26),
        o = Math.max,
        a = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? o(e + t, 0) : a(e, t)
    }
}, function(e, t, n) {
    var r = n(17);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(31),
        o = n(1)("iterator"),
        a = n(11);
    e.exports = n(15).getIteratorMethod = function(e) {
        return void 0 != e ? e[o] || e["@@iterator"] || a[r(e)] : void 0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(61),
        o = n(38),
        a = n(11),
        i = n(19);
    e.exports = n(22)(Array, "Array", function(e, t) {
        this._t = i(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [n, e[n]])
    }, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    "use strict";
    var r = n(63);
    e.exports = n(64)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = r.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return r.def(this, 0 === e ? 0 : e, t)
        }
    }, r, !0)
}, function(e, t, n) {
    "use strict";
    var r = n(31),
        o = {};
    o[n(1)("toStringTag")] = "z", o + "" != "[object z]" && n(10)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, function(e, t, n) {
    "use strict";
    var r = n(81)(!0);
    n(22)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    for (var r = n(85), o = n(10), a = n(2), i = n(5), s = n(11), c = n(1), l = c("iterator"), p = c("toStringTag"), u = s.Array, d = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], _ = 0; 5 > _; _++) {
        var m, f = d[_],
            h = a[f],
            v = h && h.prototype;
        if (v) {
            v[l] || i(v, l, u), v[p] || i(v, p, f), s[f] = u;
            for (m in r) v[m] || o(v, m, r[m], !0)
        }
    }
}]);