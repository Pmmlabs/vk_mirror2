var Calendar = {
    calGetCurEvents: function(e) {
        if (!cur.calEvents[cur.calMon]) return [];
        var a = cur.calEvents[cur.calMon][e],
            t = [],
            r = new Date,
            n = r.getFullYear();
        for (var l in a) {
            var c = new Date(1e3 * a[l][3]).getFullYear();
            (a[l][0] > 0 && (cur.calYear > c || c == n) || a[l][0] < 0 && cur.calYear == c) && t.push(a[l])
        }
        return t
    },
    calShowMore: function(e) {
        var a = Calendar.calGetCurEvents(e);
        if (a[0]) {
            var t = '<div class="bd_day_box">';
            for (var r in a) {
                var n = a[r][4],
                    l = a[r][2],
                    c = a[r][1],
                    d = a[r][0],
                    s = new Date(1e3 * a[r][3]),
                    o = new Date(cur.calYear, cur.calMon - 1, e),
                    i = new Date;
                if (i = new Date(i.getFullYear(), i.getMonth(), i.getDate()), 0 > d) {
                    var u, _ = "bd_event_row",
                        v = s.getHours(),
                        g = s.getMinutes();
                    10 > g && (g = "0" + g);
                    var h = v + ":" + g;
                    u = +s > +new Date ? getLang("events_calendar_future_event").replace("{time}", h) : getLang("events_calendar_past_event").replace("{time}", h)
                } else {
                    var u, _ = "";
                    if (s.getFullYear() != i.getFullYear()) {
                        var f = o.getFullYear() - s.getFullYear();
                        u = getLang(i > o ? "events_calendar_past_birthday" : i.toString() == o.toString() ? "events_calendar_recent_birthday" : "events_calendar_future_birthday", f)
                    } else u = getLang("events_celebrates_birthday")
                }
                t += cur.boxRowTmpl.replace("{fid}", d).replace("{class}", _).replace("{name}", c).replace(/{href}/g, l).replace("{photo}", n).replace("{label}", u.toLowerCase()).replace("{actions}", "")
            }
            t += "</div>";
            var y = getLang("events_calendar_day_box_title").replace("{day}", o.getDate() + " " + getLang("month" + (o.getMonth() + 1) + "_of") + " " + o.getFullYear());
            showFastBox({
                title: y,
                width: 400,
                bodyStyle: "padding: 5px 25px"
            }, t)
        }
        return !1
    },
    calGetEventsHTML: function(e, a) {
        var t = Calendar.calGetCurEvents(e);
        a && (t = t.slice(a));
        var r = "";
        if (t[0]) {
            var n = !1,
                l = new Date(cur.calYear, cur.calMon - 1, e),
                c = new Date;
            c = new Date(c.getFullYear(), c.getMonth(), c.getDate());
            var d = "bd_user_cells_" + t.length;
            t.length > 4 && (n = t.length - 3, t = t.slice(0, 3), d = "bd_user_cells_4"), c > l && (d += " db_user_old");
            for (var s in t) {
                var o = t[s][4],
                    i = t[s][2],
                    u = t[s][0];
                r += '<a class="' + d + " bd_user_cell_" + s + '" href="' + i + '" onclick="return nav.go(this, event);"><img class="bd_cell_img" src="' + o + '" onmouseover="Calendar.calTrailOn(this, ' + u + ", " + e + ');" onmouseout="Calendar.calTrailOff(this, ' + u + ');"/></a>', 1 == s && (r += "<br/>")
            }
            n && (r += '<a class="bd_day_more" href="" onclick="Calendar.calShowMore(' + e + '); return cancelEvent(event);"><span class="bd_day_more_num">+' + n + "</span></a>")
        }
        return r
    },
    calTrailOn: function(e, a, t) {
        var r = cur.calEventsById[a],
            n = new Date(1e3 * r[3]),
            l = new Date(cur.calYear, cur.calMon - 1, t),
            c = new Date;
        c = new Date(c.getFullYear(), c.getMonth(), c.getDate());
        var d = "";
        if (0 > a) {
            var s = n.getHours(),
                o = n.getMinutes();
            10 > o && (o = "0" + o);
            var i = s + ":" + o;
            d = +n > +new Date ? getLang("events_calendar_future_event").replace("{time}", i) : getLang("events_calendar_past_event").replace("{time}", i)
        } else if (n.getFullYear() != c.getFullYear()) {
            var u = l.getFullYear() - n.getFullYear();
            d = getLang(c > l ? "events_calendar_past_birthday" : c.toString() == l.toString() ? "events_calendar_recent_birthday" : "events_calendar_future_birthday", u)
        }
        d && (d = '<div class="text">' + d + "</div>");
        var _ = '<a href="' + r[2] + '" onclick="return nav.go(this, event);">' + r[1] + "</a>",
            v = vkImage(),
            g = function() {
                window.tooltips && tooltips.hideAll();
                var a = getSize(e.parentNode)[0],
                    t = d ? "" : " onerow";
                showTooltip(e.parentNode, {
                    text: '<a href="' + r[2] + '" onclick="return nav.go(this, event);"><img class="photo" src="' + r[5] + '"/></a><div class="info"><div class="info_inner"><div class="name' + t + '">' + _ + "</div>" + d + "</div></div>",
                    dir: "auto",
                    className: "cal_tt",
                    slide: 15,
                    hasover: 1,
                    appendParentCls: "box_layout",
                    shift: [100 - a / 2, 10]
                })
            };
        v.src = r[5], v.onload = function() {
            v.loaded = !0
        }, clearTimeout(cur.calTO);
        var h = function() {
            return v.loaded ? (g(), void clearTimeout(cur.calTO)) : void(cur.calTO = setTimeout(h, 50))
        };
        return cur.calTO = setTimeout(h, 200), !1
    },
    calTrailOff: function(e) {
        return clearTimeout(cur.calTO), !1
    },
    calGetMonth: function(e) {
        window.tooltips && tooltips.hideAll(), cur.calMon += e, cur.calMon > 12 ? (cur.calMon = 1, cur.calYear++) : cur.calMon < 1 && (cur.calMon = 12, cur.calYear--), ge("bd_calendar_header").innerHTML = getLang("Month" + cur.calMon) + " " + cur.calYear;
        var a = new Date(cur.calYear, cur.calMon, 0).getDate(),
            t = new Date(cur.calYear, cur.calMon - 1, 1),
            r = (t.getDay() + 6) % 7,
            n = a + r,
            l = Math.ceil(n / 7),
            c = "",
            d = new Date;
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        for (var s = 0; l > s; s++) {
            for (var o = "", i = 0; 7 > i; i++) {
                var u = 7 * s + i - r + 1,
                    _ = 0 == i ? "left " : "";
                if (u > 0 && a >= u) {
                    var v = cur.calHolidays[cur.calMon],
                        g = new Date(cur.calYear, cur.calMon - 1, u);
                    (v && v[u] || i > 4) && (_ += "holiday "), d.toString() == g.toString() && (_ += "today ");
                    var h = Calendar.calGetEventsHTML(u, 0);
                    o += '<td class="bd_day_cell day' + (i + 1) + " " + _ + '">            <div class="bd_day_num">' + u + '</div>            <div class="bd_day_events">' + h + "</div>          </td>"
                } else o += '<td class="bd_day_cell day' + (i + 1) + " " + _ + '"></td>'
            }
            c += '<tr class="bd_day_row">' + o + "</tr>"
        }
        return ge("bd_calendar_table_wrap").innerHTML = '<table class="bd_day_table" cellpadding="0" cellspacing="0" align="center">      <tr>       <td class="bd_day_head day1">' + getLang("events_mon") + '</td>       <td class="bd_day_head day2">' + getLang("events_tue") + '</td>       <td class="bd_day_head day3">' + getLang("events_wed") + '</td>       <td class="bd_day_head day4">' + getLang("events_thu") + '</td>       <td class="bd_day_head day5">' + getLang("events_fri") + '</td>       <td class="bd_day_head day6">' + getLang("events_sat") + '</td>       <td class="bd_day_head day7">' + getLang("events_sun") + "</td>      </tr>" + c + "</table>", !1
    },
    init: function(e, a, t, r) {
        extend(cur, {
            calEvents: t,
            calHolidays: r,
            calMon: e,
            calYear: a,
            calEventsById: {},
            sendGift: function(e, a, t) {
                return !showBox("al_gifts.php", {
                    act: "get_gift_box",
                    mid: a,
                    fr: a == vk.id ? 1 : 0,
                    ref: t
                }, {
                    stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                    cache: 1,
                    dark: 1
                }, e)
            }
        }), each(cur.calEvents, function(e, a) {
            each(a, function(e, a) {
                each(a, function(e, a) {
                    cur.calEventsById[a[0]] = a
                })
            })
        })
    }
};
try {
    stManager.done("calendar.js")
} catch (e) {}