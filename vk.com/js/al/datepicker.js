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
    for (var s = ["d", "w", "m"], i = 1; 13 > i; i++) e.mn.push(getLang("Month" + i)), e.mnOf.push(getLang("Month" + i + "_of")), e.mnOfSm.push(getLang("month" + i + "_of"));
    for (var i = 0; 7 > i; i++) {
        var d = getLang("events_" + e.days[i]);
        "events" != d.substr(0, 6) && (e.days[i] = d)
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
            var i = _ui.reg(this);
            cals.list[i] = this, n.innerHTML = "<div></div>", n = n.firstChild;
            var d = (s[t.mode] || t.mode || "d").toString().replace(/(this|next|prev)/, ""),
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
                u = t.addRows || "",
                m = t.addRowsM || u;
            this.setDay = function(e, t, a) {
                h = t ? {
                    d: e,
                    m: t,
                    y: a
                } : c(e), p.getMonth(h.m, h.y)
            }, this.setMode = function(e) {
                d = (s[e] || e || "d").replace(/(this|next|prev)/, ""), p.getMonth(h.m, h.y, !0)
            };
            this.getDay = t.getDay || function(e, t, a) {}, this.getMonth = function(s, c, p, v) {
                var g = e.mn,
                    y = new Date(c, s - 1, 1);
                y.od = y.getDay(), 0 == y.od && (y.od = 7);
                var f = "-1" == d,
                    _ = !1,
                    w = "",
                    D = f ? new Date(3e3, 1, 1) : new Date;
                D = new Date(D.getFullYear(), D.getMonth(), "m" === d ? 1 : D.getDate());
                var M = y.getFullYear();
                o[1] = M % 100 != 0 && M % 4 == 0 || M % 400 == 0 ? 29 : 28;
                var k, b, x = [],
                    S = [],
                    C = '<table class="%cls%" cols="%cols%" cellpadding="0" border="0" cellspacing="0"><tbody>%rows%</tbody></table>';
                switch (d) {
                    case "m":
                        var T = c == h.y ? h.m : 0;
                        nextYear = c + 1, lastYear = c - 1, k = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + i + ",1," + lastYear + ');"></a></td><td align="center" class="month">' + c + '</td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + i + ",1," + nextYear + ');"></a></td></tr>', x.push('<tr><td colspan="2">'), x.push(rs(C, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: k
                        })), x.push("</td></tr><tr>");
                        for (var Y = 1; 12 >= Y; Y++) w = "", Y % 2 == 1 && (Y > 1 && x.push("</tr><tr>"), w = " day_left"), clDay = Y == T ? "day sel" : "day", P = new Date(c, Y - 1, 1), (!t.pastActive && D > P || t.pastActive && P > D) && (clDay += " past_day"), P.getTime() == D.getTime() && (clDay += " today"), x.push('<td class="' + clDay + w + '" style="width:50%" id="day' + Y + "_" + r + '" onclick="return cals.getDay(' + i + ", 1, " + Y + ", " + c + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + g[Y - 1] + "</td>");
                        x.push("</tr>"), S.push(rs(C, {
                            cls: "cal_table",
                            cols: "2",
                            rows: x.join("")
                        })), p || (n.style.height = n.offsetHeight + "px"), val(n, S.join(""));
                        break;
                    default:
                        var T = c == h.y && s == h.m ? h.d : 0;
                        12 == s ? (nextMonth = 1, nextYear = c + 1) : (nextMonth = s + 1, nextYear = c), 1 == s ? (lastMonth = 12, lastYear = c - 1) : (lastMonth = s - 1, lastYear = c);
                        var z = a.replace("{month}", g[s - 1]).replace("{year}", c),
                            L = "cal_table" + (f ? " disabled" : "") + (v ? " unshown" : ""),
                            F = "w" === d ? "this.parentNode" : "this",
                            k = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + i + "," + lastMonth + "," + lastYear + ');"></a></td><td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + i + "," + s + "," + c + ',1);">' + z + '</a></td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + i + "," + nextMonth + "," + nextYear + ');"></a></td></tr>',
                            b = '<tr><td class="month_arr"><span class="arr left"></span></td><td align="center" class="month">' + z + '</td><td class="month_arr"><span class="arr right"></span></td></tr>';
                        x.push('<tr><td colspan="7">'), x.push(rs(C, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: f ? b : k
                        })), x.push("</td></tr><tr>");
                        for (var N = 0; 7 > N; N++) x.push('<td class="daysofweek">' + e.days[N] + "</td>");
                        x.push("</tr><tr>");
                        for (var A = [], Y = 1; 42 >= Y; Y++) {
                            var w = Y % 7 == 1 ? " day_left" : "",
                                I = Y - y.od >= 0 && Y - y.od < o[s - 1] ? Y - y.od + 1 : 0,
                                P = new Date(c, s - 1, Y - y.od + 1),
                                U = I,
                                H = 1;
                            if ("w" === d) {
                                var U = Y - y.od - Y % 7 + 2;
                                if (Y % 7 == 0 && (U -= 7), T) {
                                    var H = 8 - (T + y.od - 1) % 7;
                                    8 == H && (H = 1)
                                }
                            }
                            clDay = w, I >= T && T + H > I ? clDay += " day sel" : clDay += " day", (!t.pastActive && D > P || t.pastActive && P > D) && (clDay += " past_day"), P.getTime() == D.getTime() && (clDay += " today"), I > 0 ? (A[Y] = U, x.push('<td id="day' + I + "_" + r + '" class="' + clDay + '" onclick="return cals.getDay(' + i + ", " + U + ", " + s + ", " + c + ');" onmouseover="addClass(' + F + ", 'hover')\"  onmouseout=\"removeClass(" + F + ", 'hover')\">" + I + "</td>")) : 36 != Y ? _ || ("w" === d && (A[Y] = U), date = Y > 7 && !l ? P.getDate() : "&nbsp", x.push('<td class="day no_month_day' + w + '">' + date + "</td>")) : _ = !0, Y % 7 == 0 && 36 > Y && x.push("</tr><tr>")
                        }
                        x.push("</tr>" + u), S.push(rs(C, {
                            cls: L,
                            cols: "7",
                            rows: x.join("")
                        })), x = [], D = new Date(D.getFullYear(), D.getMonth(), 1);
                        var T = c == h.y ? h.m : 0,
                            L = "cal_table" + (f ? " disabled" : "") + (v ? "" : " unshown");
                        k = '<tr><td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + i + "," + s + "," + (c - 1) + ',1);"></a></td><td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + i + "," + s + "," + c + ');">' + c + '</a></td><td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + i + "," + s + "," + (c + 1) + ',1);"></a></td></tr>', b = '<tr><td class="month_arr"><span class="arr left"></span></td><td align="center" class="month">' + c + '</td><td class="month_arr"><span class="arr right"></span></td></tr>', x.push('<tr><td colspan="2">'), x.push(rs(C, {
                            cls: "cal_table_head",
                            cols: "3",
                            rows: f ? b : k
                        })), x.push("</td></tr><tr>");
                        for (var Y = 1; 12 >= Y; Y++) w = "", Y % 2 == 1 && (Y > 1 && x.push("</tr><tr>"), w = " day_left"), clDay = Y == T ? "day sel" : "day", P = new Date(c, Y - 1, 1), (!t.pastActive && D > P || t.pastActive && P > D) && (clDay += " past_day"), P.getTime() == D.getTime() && (clDay += " today"), x.push('<td class="' + clDay + w + '" style="width:50%" id="day' + Y + "_" + r + '" onclick="return cals.getMonth(' + i + ", " + Y + ", " + c + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + g[Y - 1] + "</td>");
                        x.push("</tr>" + m), S.push(rs(C, {
                            cls: L,
                            cols: "2",
                            rows: x.join("")
                        })), val(n, S.join("")), browser.opera && !browser.mobile && animate(n, {
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
            var s, i = {},
                d = this,
                o = !1,
                l = 0,
                c = 0,
                h = n.id,
                p = h + "_date_input",
                u = n.name || h,
                m = n.parentNode,
                v = h + "_cal_box",
                g = h + "_cal_div",
                y = h + "_cal_frame",
                f = {
                    mode: "d",
                    resfmt: "ts",
                    width: 145,
                    addRows: "",
                    noPast: !1,
                    pastActive: !1,
                    onUpdate: function(e, t) {},
                    onMonthSelect: function() {}
                };
            r = extend({}, f, r);
            var _ = r.mode,
                w = r.onUpdate,
                s = r.width,
                D = r.resfmt,
                M = r.addRows,
                k = r.addRowsM || M,
                b = function(e) {
                    return "h" === _ ? !1 : (o ? d.hide() : S(), ge(p).blur(), !1)
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
                        var s = getXY(e)[1] + n[1] > scrollGetY() + window.lastWindowHeight,
                            i = s ? -n[1] - 30 - 2 * intval(getStyle(t, "paddingTop")) : 0;
                        setStyle(t, {
                            marginTop: i
                        }), r.onMonthSelect()
                    }
                },
                S = function() {
                    if (!o) {
                        o = !0, _ui.sel(d.guid), show(v), new DateCalendar({
                            container: ge(g),
                            day: i,
                            mode: _,
                            addRows: M,
                            addRowsM: k,
                            hideNextMonth: !0,
                            pastActive: r.pastActive,
                            onMonthSelect: x,
                            getDay: function(e, t, a) {
                                C({
                                    d: e,
                                    m: t,
                                    y: a
                                }, _)
                            }
                        });
                        var e = getSize(ge(g));
                        setStyle(ge(y), {
                            width: e[0],
                            height: e[1]
                        }), x(), ge(p).focus()
                    }
                },
                C = function(n, s, o) {
                    if (!(!o && r.noPast && new Date(n.y, n.m - 1, n.d, 23, 59) < new Date)) {
                        i = n;
                        var u = geByClass1("datepicker_control", F);
                        "h" === s ? addClass(u, "disabled") : (removeClass(u, "disabled"), "m" === s ? ge(p).value = a.replace("{month}", winToUtf(e.mn[n.m - 1])).replace("{year}", n.y) : ge(p).value = t.replace("{day}", n.d).replace("{month}", winToUtf(e.mnOf[n.m - 1])).replace("{year}", n.y)), d.hide(), "plain" === D ? ge(h).value = n.d + "." + n.m + "." + n.y + (r.time ? " " + l + ":" + c : "") : "ts" === D && (ge(h).value = Math.floor(new Date(n.y, n.m - 1, n.d, l, c).getTime() / 1e3) - (60 * (new Date).getTimezoneOffset() + intval(vk.tz)) - intval(vk.dt)), o || w(n, s)
                    }
                };
            this.hide = function() {
                o && (o = !1, _ui.sel(!1), hide(v))
            }, this.setMode = function(e) {
                _ = e, C(i, _)
            }, this.destroy = function() {
                _ui._uids[d.guid] = {}, removeEvent(geByClass1("datepicker_control", F), "mousedown", b)
            }, this.setDate = function(e, t, a, n) {
                if (e || t || a) "m" != _ && (i.d = a), i.m = t, i.y = e;
                else {
                    var r = new Date;
                    "m" != _ && (i.d = r.getDate()), i.m = r.getMonth() + 1, i.y = r.getFullYear()
                }
                C(i, _, n)
            };
            var T, Y = 0;
            if (r.day || r.month || r.year) "m" != _ && (i.d = r.day), i.m = r.month, i.y = r.year, r.time && (l = r.hour || 0, c = r.min || 0);
            else if (T = (n.value || "").match(/(\d+)\.(\d+)(?:\.(\d+))?(?:\s+(\d+)\:(\d+))?/)) "m" != _ && (i.d = intval(T[3].length ? T[1] : 0)), i.m = intval(T[3].length ? T[2] : T[1]), i.y = intval(T[3].length ? T[3] : T[2]), r.time && (l = T[4] || 0, c = T[5] || 0);
            else if (parseInt(n.value)) {
                var z = parseInt(n.value) + (60 * (new Date).getTimezoneOffset() + intval(vk.tz)) + intval(vk.dt);
                Y = new Date(1e3 * z)
            } else Y = new Date;
            Y && (i.d = Y.getDate(), i.m = Y.getMonth() + 1, i.y = Y.getFullYear(), l = Y.getHours(), c = Y.getMinutes());
            var L = '<input type="hidden" name="' + u + '" id="' + h + '"/><div class="datepicker_control"><input readonly="1" type="text" class="datepicker_text" id="' + p + '"/></div><div id="' + v + '" class="cal_box"><iframe id="' + y + '" class="cal_frame"></iframe><div id="' + g + '" class="cal_div"></div></div>',
                F = ce("div", {
                    id: h + "_datepicker_container",
                    className: "datepicker_container",
                    innerHTML: L
                }, {
                    width: s
                });
            if (m.replaceChild(F, n), addEvent(geByClass1("datepicker_control", F), "mousedown", b), C(i, _, !0), d.guid = _ui.reg({
                    container: F,
                    onEvent: function(e) {
                        if ("mousedown" === e.type) {
                            for (var t = !0, a = e.target; a && a != a.parentNode;) {
                                if (a == F) {
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
                var N = ge(r.time);
                this.timePicker = new Timepicker(N, {
                    onUpdate: function(e, t) {
                        l = e, c = t, C(i, _)
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
                s = {
                    onUpdate: function(e, t) {},
                    time: 0,
                    hour: 0,
                    min: 0,
                    minStep: 5,
                    resfmt: "ts",
                    format: '{hour}<div class="fl_l" style="padding: 7px 4px 8px;"> : </div>{min}'
                },
                i = extend({}, s, t),
                d = e.parentNode;
            r && (i.time = r), i.time && (i.hour = Math.floor(i.time / 3600), i.min = Math.floor((i.time - 3600 * i.hour) / 60));
            var o = i.hour || 0,
                l = i.min || 0,
                c = i.resfmt;
            l -= l % i.minStep;
            var h = '<input type="hidden" name="' + n + '" id="' + a + '" value="' + r + '"/>' + i.format.replace("{hour}", '<div class="fl_l"><input type="hidden" id="' + a + '_hour_input" value="' + o + '"/></div>').replace("{min}", '<div class="fl_l"><input type="hidden" id="' + a + '_min_input" value="' + l + '"/></div>') + '<div class="results_container"><div class="result_list" style="display:none;"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div></div>',
                p = ce("div", {
                    id: a + "_timepicker_container",
                    className: "timepicker_container",
                    innerHTML: h
                });
            d.replaceChild(p, e);
            for (var u = function() {
                    var e = this.hourDD.val(),
                        t = this.minDD.val();
                    "plain" === c ? ge(a).value = e + ":" + t : "ts" === c && (ge(a).value = 3600 * e + 60 * t), i.onUpdate(e, t)
                }, m = [], v = [], g = 0; 24 > g; g++) m.push([g, g]);
            for (var g = 0; 60 > g; g += i.minStep) v.push([g, 10 > g ? "0" + g.toString() : g]);
            this.hourDD = new Dropdown(ge(a + "_hour_input"), m, {
                width: 60,
                dark: 1,
                multiselect: !1,
                onChange: u.bind(this)
            }), this.minDD = new Dropdown(ge(a + "_min_input"), v, {
                width: 60,
                dark: 1,
                multiselect: !1,
                onChange: u.bind(this)
            })
        }
    }, window.Daypicker = function(t, a) {
        if (t = ge(t)) {
            var n = t.id,
                r = t.name || "",
                s = t.value || "",
                i = {
                    onUpdate: function(e, t, a) {},
                    date: 0,
                    year: 0,
                    month: 0,
                    day: 0,
                    format: '{day}<div class="fl_l" style="padding:0 3px;width:4px;">&nbsp;</div>{month}<div class="fl_l" style="padding:0 3px;width:4px;">&nbsp;</div>{year}',
                    width: 0
                },
                d = extend({}, i, a),
                o = t.parentNode;
            if (s && (d.date = s), d.date)
                if (d.date < 3e7) d.year = Math.floor(d.date / 1e4), d.month = Math.floor((d.date - 1e4 * d.year) / 100), d.day = d.date - 1e4 * d.year - 100 * d.month;
                else {
                    var l = new Date(1e3 * d.date);
                    d.year = l.getFullYear(), d.month = l.getMonth(), d.day = l.getDate()
                }
            var c = '<div class="fl_l"><input type="hidden" name="' + r + '" id="' + n + '" value="' + s + '"/>' + d.format.replace("{year}", '<div class="fl_l"><input type="hidden" id="' + n + '_year_input" value="' + d.year + '"/></div>').replace("{month}", '<div class="fl_l"><input type="hidden" id="' + n + '_month_input" value="' + d.month + '"/></div>').replace("{day}", '<div class="fl_l"><input type="hidden" id="' + n + '_day_input" value="' + d.day + '"/></div>') + "</div>",
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
                }, u = function() {
                    var e = parseInt(_.val()),
                        t = parseInt(f.val()),
                        a = parseInt(y.val());
                    ge(n).value = 1e4 * e + 100 * t + a, y.setData(p(t, e)), d.onUpdate(e, t, a)
                }, l = new Date, m = [
                    [0, getLang("global_year_label")]
                ], v = [
                    [0, getLang("global_month_label")]
                ], g = l.getFullYear(); g >= (d.startYear || 1800); g--) m.push([g, g]);
            for (var g = 0; 12 > g; g++) v.push([g + 1, e.mnOf[g]]);
            var y = new Dropdown(ge(n + "_day_input"), p(d.month, d.year), {
                    width: 80,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: u
                }),
                f = new Dropdown(ge(n + "_month_input"), v, {
                    width: 120,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: u
                }),
                _ = new Dropdown(ge(n + "_year_input"), m, {
                    width: 75,
                    dark: 1,
                    zeroPlaceholder: d.zeroPlaceholder,
                    onChange: u
                });
            if (d.width) {
                var w = getSize(h.firstChild)[0],
                    l = d.width - w,
                    D = getSize(f.container)[0];
                each([f.container, f.resultList], function() {
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