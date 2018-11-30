! function() {
    var e = {
            mn: [],
            mnOf: [],
            mnOfSm: [],
            days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
        },
        t = getLang("datepicker_dateFormat");
    "dateFormat" === t && (t = "{day} {month} {year}");
    var a = getLang("datepicker_monthFormat");
    "monthFormat" === a && (a = "{month} {year}");
    var n = getLang("larr");
    "larr" === n && (n = "&larr;");
    var r = getLang("rarr");
    "rarr" === r && (r = "&rarr;");
    for (var i = ["d", "w", "m"], s = 1; 13 > s; s++) e.mn.push(getLang("Month" + s)), e.mnOf.push(getLang("Month" + s + "_of")), e.mnOfSm.push(getLang("month" + s + "_of"));
    for (var s = 0; 7 > s; s++) {
        var d = getLang("events_" + e.days[s]);
        "events" != d.substr(0, 6) && (e.days[s] = d)
    }
    var o = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    window.cals || (window.cals = {
        list: {},
        getMonth: function(e, t, a, n) {
            return cals.list[e] && cals.list[e].getMonth(t, a, !1, n), !1
        },
        getDay: function(e, t, a, n) {
            return cals.list[e] && cals.list[e].getDay(t, a, n), !1
        }
    }), window.DateCalendar = function(t) {
        var n = t.container,
            r = Math.round(1e6 * Math.random());
        if (n) {
            var s = _ui.reg(this);
            cals.list[s] = this, n.innerHTML = "<div></div>", n = n.firstChild;
            var d = (i[t.mode] || t.mode || "d").toString().replace(/(this|next|prev)/, ""),
                l = t.hideNextMonth && !0,
                c = this.parseDay = function(e) {
                    return e = e.toString(), {
                        y: parseInt(e.substr(0, 4), 10),
                        m: parseInt(e.substr(4, 2), 10),
                        d: parseInt(e.substr(6, 2), 10)
                    }
                },
                h = t.day || {
                    d: -1,
                    m: -1,
                    y: -1
                };
            h.m || (h = c(h));
            var p = this,
                m = t.addRows || "",
                u = t.addRowsM || m;
            this.setDay = function(e, t, a) {
                h = t ? {
                    d: e,
                    m: t,
                    y: a
                } : c(e), p.getMonth(h.m, h.y)
            }, this.setMode = function(e) {
                d = (i[e] || e || "d").replace(/(this|next|prev)/, ""), p.getMonth(h.m, h.y, !0)
            };
            this.getDay = t.getDay || function(e, t, a) {}, this.getMonth = function(i, c, p, v) {
                var g = e.mn,
                    y = new Date(c, i - 1, 1);
                y.od = y.getDay(), 0 == y.od && (y.od = 7);
                var _ = "-1" == d,
                    f = !1,
                    w = "",
                    D = _ ? new Date(3e3, 1, 1) : new Date;
                D = new Date(D.getFullYear(), D.getMonth(), "m" === d ? 1 : D.getDate());
                var M = 0;
                t.activePeriod && (M = new Date(Date.now() + t.activePeriod), M = new Date(M.getFullYear(), M.getMonth(), "m" === d ? 1 : M.getDate()));
                var k = y.getFullYear();
                o[1] = k % 100 != 0 && k % 4 == 0 || k % 400 == 0 ? 29 : 28;
                var b, x, S = [],
                    C = [],
                    T = '<table class="%cls%" cols="%cols%" cellpadding="0" border="0" cellspacing="0"><tbody>%rows%</tbody></table>';
                switch (d) {
                    case "m":
                        var Y = c == h.y ? h.m : 0;
                        nextYear = c + 1, lastYear = c - 1, b = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + s + ",1," + lastYear + ');"></a></td><td align="center" class="month">' + c + '</td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + s + ",1," + nextYear + ');"></a></td></tr>', S.push('<tr><td colspan="2">'), S.push(rs(T, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: b
                        })), S.push("</td></tr><tr>");
                        for (var P = 1; 12 >= P; P++) w = "", P % 2 == 1 && (P > 1 && S.push("</tr><tr>"), w = " day_left"), clDay = P == Y ? "day sel" : "day", O = new Date(c, P - 1, 1), (!t.pastActive && D > O || t.pastActive && O > D) && (clDay += " past_day"), t.activePeriod && O > M && (clDay += " past_day"), O.getTime() == D.getTime() && (clDay += " today"), S.push('<td class="' + clDay + w + '" style="width:50%" id="day' + P + "_" + r + '" onclick="return cals.getDay(' + s + ", 1, " + P + ", " + c + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + g[P - 1] + "</td>");
                        S.push("</tr>"), C.push(rs(T, {
                            cls: "cal_table",
                            cols: "2",
                            rows: S.join("")
                        })), p || (n.style.height = n.offsetHeight + "px"), val(n, C.join(""));
                        break;
                    default:
                        var Y = c == h.y && i == h.m ? h.d : 0;
                        12 == i ? (nextMonth = 1, nextYear = c + 1) : (nextMonth = i + 1, nextYear = c), 1 == i ? (lastMonth = 12, lastYear = c - 1) : (lastMonth = i - 1, lastYear = c);
                        var z = a.replace("{month}", g[i - 1]).replace("{year}", c),
                            L = "cal_table" + (_ ? " disabled" : "") + (v ? " unshown" : ""),
                            F = "w" === d ? "this.parentNode" : "this",
                            b = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + s + "," + lastMonth + "," + lastYear + ');"></a></td><td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + s + "," + i + "," + c + ',1);">' + z + '</a></td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + s + "," + nextMonth + "," + nextYear + ');"></a></td></tr>',
                            x = '<tr><td class="month_arr"><span class="arr left"></span></td><td align="center" class="month">' + z + '</td><td class="month_arr"><span class="arr right"></span></td></tr>';
                        S.push('<tr><td colspan="7">'), S.push(rs(T, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: _ ? x : b
                        })), S.push("</td></tr><tr>");
                        for (var N = 0; 7 > N; N++) S.push('<td class="daysofweek">' + e.days[N] + "</td>");
                        S.push("</tr><tr>");
                        for (var A = [], P = 1; 42 >= P; P++) {
                            var w = P % 7 == 1 ? " day_left" : "",
                                I = P - y.od >= 0 && P - y.od < o[i - 1] ? P - y.od + 1 : 0,
                                O = new Date(c, i - 1, P - y.od + 1),
                                U = I,
                                H = 1;
                            if ("w" === d) {
                                var U = P - y.od - P % 7 + 2;
                                if (P % 7 == 0 && (U -= 7), Y) {
                                    var H = 8 - (Y + y.od - 1) % 7;
                                    8 == H && (H = 1)
                                }
                            }
                            clDay = w, I >= Y && Y + H > I ? clDay += " day sel" : clDay += " day", (!t.pastActive && D > O || t.pastActive && O > D) && (clDay += " past_day"), t.activePeriod && O > M && (clDay += " past_day"), O.getTime() == D.getTime() && (clDay += " today"), I > 0 ? (A[P] = U, S.push('<td id="day' + I + "_" + r + '" class="' + clDay + '" onclick="return cals.getDay(' + s + ", " + U + ", " + i + ", " + c + ');" onmouseover="addClass(' + F + ", 'hover')\"  onmouseout=\"removeClass(" + F + ", 'hover')\">" + I + "</td>")) : 36 != P ? f || ("w" === d && (A[P] = U), date = P > 7 && !l ? O.getDate() : "&nbsp", S.push('<td class="day no_month_day' + w + '">' + date + "</td>")) : f = !0, P % 7 == 0 && 36 > P && S.push("</tr><tr>")
                        }
                        S.push("</tr>" + m), C.push(rs(T, {
                            cls: L,
                            cols: "7",
                            rows: S.join("")
                        })), S = [], D = new Date(D.getFullYear(), D.getMonth(), 1);
                        var Y = c == h.y ? h.m : 0,
                            L = "cal_table" + (_ ? " disabled" : "") + (v ? "" : " unshown");
                        b = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + s + "," + i + "," + (c - 1) + ',1);"></a></td><td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + s + "," + i + "," + c + ');">' + c + '</a></td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + s + "," + i + "," + (c + 1) + ',1);"></a></td></tr>', x = '<tr><td class="month_arr"><span class="arr left"></span></td><td align="center" class="month">' + c + '</td><td class="month_arr"><span class="arr right"></span></td></tr>', S.push('<tr><td colspan="2">'), S.push(rs(T, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: _ ? x : b
                        })), S.push("</td></tr><tr>");
                        for (var P = 1; 12 >= P; P++) w = "", P % 2 == 1 && (P > 1 && S.push("</tr><tr>"), w = " day_left"), clDay = P == Y ? "day sel" : "day", O = new Date(c, P - 1, 1), (!t.pastActive && D > O || t.pastActive && O > D) && (clDay += " past_day"), t.activePeriod && O > M && (clDay += " past_day"), O.getTime() == D.getTime() && (clDay += " today"), S.push('<td class="' + clDay + w + '" style="width:50%" id="day' + P + "_" + r + '" onclick="return cals.getMonth(' + s + ", " + P + ", " + c + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + g[P - 1] + "</td>");
                        S.push("</tr>" + u), C.push(rs(T, {
                            cls: L,
                            cols: "2",
                            rows: S.join("")
                        })), val(n, C.join("")), browser.opera && !browser.mobile && animate(n, {
                            opacity: .99
                        }, 20, animate.pbind(n, {
                            opacity: 1
                        }, 20))
                }
                t.onMonthSelect && t.onMonthSelect()
            }, this.getMonth(h.m, h.y)
        }
    }, window.Datepicker = function(n, r) {
        if (n = ge(n)) {
            var i, s = {},
                d = this,
                o = !1,
                l = 0,
                c = 0,
                h = n.id,
                p = h + "_date_input",
                m = n.name || h,
                u = n.parentNode,
                v = h + "_cal_box",
                g = h + "_cal_div",
                y = h + "_cal_frame",
                _ = {
                    mode: "d",
                    resfmt: "ts",
                    width: 145,
                    addRows: "",
                    noFuture: !1,
                    noPast: !1,
                    activePeriod: !1,
                    pastActive: !1,
                    onUpdate: function(e, t) {},
                    onMonthSelect: function() {}
                };
            r = extend({}, _, r);
            var f = r.mode,
                w = r.onUpdate,
                i = r.width,
                D = r.resfmt,
                M = r.addRows,
                k = r.addRowsM || M,
                b = function(e) {
                    return "h" === f ? !1 : (o ? d.hide() : S(), ge(p).blur(), !1)
                },
                x = function() {
                    var e = ge(g),
                        t = ge(v),
                        a = ge(p);
                    if (headH = getSize("page_header_cont")[1], e && t && a) {
                        var n = getSize(e);
                        setStyle(t, {
                            marginTop: 0
                        });
                        var i = getXY(e)[1] + n[1] > scrollGetY() + window.lastWindowHeight,
                            s = i ? -n[1] - 30 - 2 * intval(getStyle(t, "paddingTop")) : 0;
                        setStyle(t, {
                            marginTop: s
                        }), r.onMonthSelect()
                    }
                },
                S = function() {
                    if (!o) {
                        o = !0, _ui.sel(d.guid), show(v), new DateCalendar({
                            container: ge(g),
                            day: s,
                            mode: f,
                            addRows: M,
                            addRowsM: k,
                            hideNextMonth: !0,
                            pastActive: r.pastActive,
                            activePeriod: r.activePeriod,
                            onMonthSelect: x,
                            getDay: function(e, t, a) {
                                C({
                                    d: e,
                                    m: t,
                                    y: a
                                }, f)
                            }
                        });
                        var e = getSize(ge(g));
                        setStyle(ge(y), {
                            width: e[0],
                            height: e[1]
                        }), x(), ge(p).focus()
                    }
                },
                C = function(n, i, o) {
                    if (!(!o && r.noPast && new Date(n.y, n.m - 1, n.d, 23, 59) < new Date || !o && r.noFuture && new Date(n.y, n.m - 1, n.d, 0, 0) > new Date || !o && r.activePeriod && new Date(n.y, n.m - 1, n.d, 0, 0) > (new Date).getTime() + r.activePeriod)) {
                        s = n;
                        var m = geByClass1("datepicker_control", L);
                        "h" === i ? addClass(m, "disabled") : (removeClass(m, "disabled"), "m" === i ? ge(p).value = a.replace("{month}", winToUtf(e.mn[n.m - 1])).replace("{year}", n.y) : ge(p).value = t.replace("{day}", n.d).replace("{month}", winToUtf(e.mnOf[n.m - 1])).replace("{year}", n.y)), d.hide(), "plain" === D ? ge(h).value = n.d + "." + n.m + "." + n.y + (r.time ? " " + l + ":" + c : "") : "ts" === D && (ge(h).value = Math.floor(new Date(n.y, n.m - 1, n.d, l, c).getTime() / 1e3) - (60 * (new Date).getTimezoneOffset() + intval(vk.tz)) - intval(vk.dt)), o || w(n, i)
                    }
                };
            this.hide = function() {
                o && (o = !1, _ui.sel(!1), hide(v))
            }, this.setMode = function(e) {
                f = e, C(s, f)
            }, this.destroy = function() {
                _ui._uids[d.guid] = {}, removeEvent(geByClass1("datepicker_control", L), "mousedown", b)
            }, this.setDate = function(e, t, a, n, r, i) {
                if (e || t || a) "m" != f && (s.d = a), s.m = t, s.y = e;
                else {
                    var d = new Date;
                    "m" != f && (s.d = d.getDate()), s.m = d.getMonth() + 1, s.y = d.getFullYear()
                }
                void 0 !== r && void 0 !== i && (l = r, c = i), C(s, f, n)
            };
            var T, Y = 0;
            if (r.day || r.month || r.year) "m" != f && (s.d = r.day), s.m = r.month, s.y = r.year, r.time && (l = r.hour || 0, c = r.min || 0);
            else if (T = (n.value || "").match(/(\d+)\.(\d+)(?:\.(\d+))?(?:\s+(\d+)\:(\d+))?/)) "m" != f && (s.d = intval(T[3].length ? T[1] : 0)), s.m = intval(T[3].length ? T[2] : T[1]), s.y = intval(T[3].length ? T[3] : T[2]), r.time && (l = T[4] || 0, c = T[5] || 0);
            else if (parseInt(n.value)) {
                var P = parseInt(n.value) + (60 * (new Date).getTimezoneOffset() + intval(vk.tz)) + intval(vk.dt);
                Y = new Date(1e3 * P)
            } else if (r.date) {
                var P = intval(r.date) + (60 * (new Date).getTimezoneOffset() + intval(vk.tz)) + intval(vk.dt);
                Y = new Date(1e3 * P)
            } else Y = new Date;
            Y && (s.d = Y.getDate(), s.m = Y.getMonth() + 1, s.y = Y.getFullYear(), l = Y.getHours(), c = Y.getMinutes());
            var z = '<input type="hidden" name="' + m + '" id="' + h + '"/><div class="datepicker_control"><input readonly="1" type="text" class="datepicker_text" id="' + p + '"/></div><div id="' + v + '" class="cal_box"><iframe id="' + y + '" class="cal_frame"></iframe><div id="' + g + '" class="cal_div"></div></div>',
                L = ce("div", {
                    id: h + "_datepicker_container",
                    className: "datepicker_container",
                    innerHTML: z
                }, {
                    width: i
                });
            if (u.replaceChild(L, n), addEvent(geByClass1("datepicker_control", L), "mousedown", b), C(s, f, !0), d.guid = _ui.reg({
                    container: L,
                    onEvent: function(e) {
                        if ("mousedown" === e.type) {
                            for (var t = !0, a = e.target; a && a != a.parentNode;) {
                                if (a == L) {
                                    t = !1;
                                    break
                                }
                                a = a.parentNode
                            }
                            t && d.hide()
                        }
                    },
                    _blur: function() {
                        d.hide()
                    }
                }), r.time) {
                var F = ge(r.time);
                this.timePicker = new Timepicker(F, {
                    onUpdate: function(e, t) {
                        l = e, c = t, C(s, f)
                    },
                    resfmt: D,
                    hour: l,
                    min: c,
                    minStep: r.minStep || 5
                })
            }
            browser.mozilla && hide(y)
        }
    }, window.Timepicker = function(e, t) {
        if (e = ge(e)) {
            var a = e.id,
                n = e.name || "",
                r = e.value || "",
                i = {
                    onUpdate: function(e, t) {},
                    time: 0,
                    hour: 0,
                    min: 0,
                    minStep: 5,
                    resfmt: "ts",
                    format: '{hour}<div class="timepicker_dots"> : </div>{min}'
                },
                s = extend({}, i, t),
                d = e.parentNode;
            r && (s.time = r), s.time && (s.hour = Math.floor(s.time / 3600), s.min = Math.floor((s.time - 3600 * s.hour) / 60));
            var o = s.hour || 0,
                l = s.min || 0,
                c = s.resfmt;
            l -= l % s.minStep;
            var h = '<input type="hidden" name="' + n + '" id="' + a + '" value="' + r + '"/>' + s.format.replace("{hour}", '<div class="fl_l datepicker_item"><input type="hidden" id="' + a + '_hour_input" value="' + o + '"/></div>').replace("{min}", '<div class="fl_l datepicker_item"><input type="hidden" id="' + a + '_min_input" value="' + l + '"/></div>') + '<div class="results_container"><div class="result_list" style="display:none;"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div></div>',
                p = ce("div", {
                    id: a + "_timepicker_container",
                    className: "timepicker_container",
                    innerHTML: h
                });
            d.replaceChild(p, e);
            for (var m = function() {
                    var e = this.hourDD.val(),
                        t = this.minDD.val();
                    "plain" === c ? ge(a).value = e + ":" + t : "ts" === c && (ge(a).value = 3600 * e + 60 * t), s.onUpdate(e, t)
                }, u = [], v = [], g = 0; 24 > g; g++) u.push([g, g]);
            for (var g = 0; 60 > g; g += s.minStep) v.push([g, 10 > g ? "0" + g.toString() : g]);
            this.hourDD = new Dropdown(ge(a + "_hour_input"), u, {
                width: 60,
                dark: 1,
                multiselect: !1,
                onChange: m.bind(this)
            }), this.minDD = new Dropdown(ge(a + "_min_input"), v, {
                width: 60,
                dark: 1,
                multiselect: !1,
                onChange: m.bind(this)
            })
        }
    }, window.Daypicker = function(t, a) {
        if (t = ge(t)) {
            var n = t.id,
                r = t.name || "",
                i = t.value || "",
                s = {
                    onUpdate: function(e, t, a) {},
                    date: 0,
                    year: 0,
                    month: 0,
                    day: 0,
                    format: '{day}<div class="fl_l datepicker_item" style="padding:0 3px;width:4px;">&nbsp;</div>{month}<div class="fl_l datepicker_item" style="padding:0 3px;width:4px;">&nbsp;</div>{year}',
                    width: 0
                },
                d = extend({}, s, a),
                o = t.parentNode;
            if (i && (d.date = i), d.date)
                if (d.date < 3e7) d.year = Math.floor(d.date / 1e4), d.month = Math.floor((d.date - 1e4 * d.year) / 100), d.day = d.date - 1e4 * d.year - 100 * d.month;
                else {
                    var l = new Date(1e3 * d.date);
                    d.year = l.getFullYear(), d.month = l.getMonth(), d.day = l.getDate()
                }
            var c = '<div class="fl_l datepicker_item"><input type="hidden" name="' + r + '" id="' + n + '" value="' + i + '"/>' + d.format.replace("{year}", '<div class="fl_l datepicker_item"><input type="hidden" id="' + n + '_year_input" value="' + d.year + '"/></div>').replace("{month}", '<div class="fl_l datepicker_item"><input type="hidden" id="' + n + '_month_input" value="' + d.month + '"/></div>').replace("{day}", '<div class="fl_l datepicker_item"><input type="hidden" id="' + n + '_day_input" value="' + d.day + '"/></div>') + "</div>",
                h = ce("div", {
                    id: n + "_daypicker_container",
                    className: "daypicker_container clear_fix",
                    innerHTML: c
                });
            o.replaceChild(h, t);
            for (var p = function(e, t) {
                    for (var a = new Date(t ? t : 2004, e, 0).getDate(), n = [
                            [0, getLang("global_day_label")]
                        ], r = 1; a >= r; r++) n.push([r, r]);
                    return n
                }, m = function() {
                    var e = parseInt(f.val()),
                        t = parseInt(_.val()),
                        a = parseInt(y.val());
                    ge(n).value = 1e4 * e + 100 * t + a, y.setData(p(t, e)), d.onUpdate(e, t, a)
                }, l = new Date, u = [
                    [0, getLang("global_year_label")]
                ], v = [
                    [0, getLang("global_month_label")]
                ], g = l.getFullYear(); g >= (d.startYear || 1800); g--) u.push([g, g]);
            for (var g = 0; 12 > g; g++) v.push([g + 1, e.mnOf[g]]);
            var y = new Dropdown(ge(n + "_day_input"), p(d.month, d.year), {
                    width: 80,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: m
                }),
                _ = new Dropdown(ge(n + "_month_input"), v, {
                    width: 120,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: m
                }),
                f = new Dropdown(ge(n + "_year_input"), u, {
                    width: 75,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: m
                });
            if (d.width) {
                var w = getSize(h.firstChild)[0],
                    l = d.width - w,
                    D = getSize(_.container)[0];
                each([_.container, _.resultList], function() {
                    setStyle(this, {
                        width: parseInt(D + l)
                    })
                })
            }
        }
    }
}();
try {
    stManager.done("datepicker.js")
} catch (e) {}