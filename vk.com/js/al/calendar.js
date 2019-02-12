var Calendar = {
    calGetCurEvents: function(day) {
        if (!cur.calEvents[cur.calMon]) return [];
        var events = cur.calEvents[cur.calMon][day],
            curEvents = [];
        var now = new Date(),
            nowYear = now.getFullYear();
        for (var i in events) {
            var year = (new Date(events[i][3] * 1000)).getFullYear();
            if ((events[i][0] > 0 && (cur.calYear > year || year == nowYear)) || (events[i][0] < 0 && cur.calYear == year)) {
                curEvents.push(events[i]);
            }
        }
        return curEvents;
    },
    calShowMore: function(day) {
        var calEvents = Calendar.calGetCurEvents(day);
        if (calEvents[0]) {
            var content = '<div class="bd_day_box">';
            for (var i in calEvents) {
                var photo = calEvents[i][4],
                    href = calEvents[i][2],
                    name = calEvents[i][1],
                    fid = calEvents[i][0],
                    bDay = new Date(calEvents[i][3] * 1000),
                    curDay = new Date(cur.calYear, cur.calMon - 1, day),
                    nowDay = new Date();
                nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());
                if (fid < 0) {
                    var className = 'bd_event_row',
                        text;
                    var hours = bDay.getHours();
                    var minutes = bDay.getMinutes();
                    if (minutes < 10) minutes = '0' + minutes;
                    var time = hours + ':' + minutes;
                    if (+bDay > +(new Date())) {
                        text = getLang('events_calendar_future_event').replace('{time}', time);
                    } else {
                        text = getLang('events_calendar_past_event').replace('{time}', time);
                    }
                } else {
                    var className = '',
                        text;
                    if (bDay.getFullYear() != nowDay.getFullYear()) {
                        var years = curDay.getFullYear() - bDay.getFullYear();
                        text = getLang((nowDay > curDay) ? 'events_calendar_past_birthday' : ((nowDay.toString() == curDay.toString()) ? 'events_calendar_recent_birthday' : 'events_calendar_future_birthday'), years);
                    } else {
                        text = getLang('events_celebrates_birthday');
                    }
                }
                content += cur.boxRowTmpl.replace('{fid}', fid).replace('{class}', className).replace('{name}', name).replace(/{href}/g, href).replace('{photo}', photo).replace('{label}', text.toLowerCase()).replace('{actions}', '');
            }
            content += '</div>';

            var title = getLang('events_calendar_day_box_title').replace('{day}', curDay.getDate() + ' ' + getLang('month' + (curDay.getMonth() + 1) + '_of') + ' ' + curDay.getFullYear());
            showFastBox({
                title: title,
                width: 400,
                bodyStyle: 'padding: 5px 25px'
            }, content);
        }
        return false;
    },
    calGetEventsHTML: function(day, offset) {
        var calEvents = Calendar.calGetCurEvents(day);
        if (offset) {
            calEvents = calEvents.slice(offset);
        }
        var dayEvents = '';
        if (calEvents[0]) {
            var showMore = false,
                curDay = new Date(cur.calYear, cur.calMon - 1, day),
                nowDay = new Date();
            nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());

            var calLayout = 'bd_user_cells_' + calEvents.length;
            if (calEvents.length > 4) {
                showMore = calEvents.length - 3;
                calEvents = calEvents.slice(0, 3);
                calLayout = 'bd_user_cells_4';
            }
            if (nowDay > curDay) {
                calLayout += ' db_user_old';
            }

            for (var i in calEvents) {
                var photo = calEvents[i][4];
                var href = calEvents[i][2];
                var fid = calEvents[i][0];
                dayEvents += '<a class="' + calLayout + ' bd_user_cell_' + i + '" href="' + href + '" onclick="return nav.go(this, event);"><img class="bd_cell_img" src="' + photo + '" onmouseover="Calendar.calTrailOn(this, ' + fid + ', ' + day + ');\" onmouseout="Calendar.calTrailOff(this, ' + fid + ');"/></a>';
                if (i == 1) {
                    dayEvents += '<br/>';
                }
            }
            if (showMore) {
                dayEvents += '<a class="bd_day_more" href="" onclick="Calendar.calShowMore(' + day + '); return cancelEvent(event);"><span class="bd_day_more_num">+' + showMore + '</span></a>';
            }
        }
        return dayEvents;
    },
    calTrailOn: function(el, fid, day) {
        var item = cur.calEventsById[fid];
        var bDay = new Date(item[3] * 1000);
        var curDay = new Date(cur.calYear, cur.calMon - 1, day);
        var nowDay = new Date();
        nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());
        var text = '';
        if (fid < 0) {
            var hours = bDay.getHours();
            var minutes = bDay.getMinutes();
            if (minutes < 10) minutes = '0' + minutes;
            var time = hours + ':' + minutes;
            if (+bDay > +(new Date())) {
                text = getLang('events_calendar_future_event').replace('{time}', time);
            } else {
                text = getLang('events_calendar_past_event').replace('{time}', time);
            }
        } else {
            if (bDay.getFullYear() != nowDay.getFullYear()) {
                var years = curDay.getFullYear() - bDay.getFullYear();
                text = getLang((nowDay > curDay) ? 'events_calendar_past_birthday' : ((nowDay.toString() == curDay.toString()) ? 'events_calendar_recent_birthday' : 'events_calendar_future_birthday'), years);
            }
        }
        if (text) text = '<div class="text">' + text + '</div>';
        var name = '<a href="' + item[2] + '" onclick="return nav.go(this, event);">' + item[1] + '</a>';
        var im = vkImage();
        var showTT = function() {
            if (window.tooltips) tooltips.hideAll();
            var w = getSize(el.parentNode)[0],
                cls = !text ? ' onerow' : '';
            showTooltip(el.parentNode, {
                text: '<a href="' + item[2] + '" onclick="return nav.go(this, event);"><img class="photo" src="' + item[5] + '"/></a><div class="info"><div class="info_inner"><div class="name' + cls + '">' + name + '</div>' + text + '</div></div>',
                dir: 'auto',
                className: 'cal_tt',
                slide: 15,
                hasover: 1,
                appendParentCls: 'box_layout',
                shift: [100 - w / 2, 10]
            });
        };
        im.src = item[5];
        im.onload = function() {
            im.loaded = true;
        }
        clearTimeout(cur.calTO);
        var to = function() {
            if (im.loaded) {
                showTT();
                clearTimeout(cur.calTO);
                return;
            }
            cur.calTO = setTimeout(to, 50);
        };
        cur.calTO = setTimeout(to, 200);
        return false;
    },
    calTrailOff: function(fid) {
        clearTimeout(cur.calTO);
        return false;
    },
    calGetMonth: function(shift) {
        if (window.tooltips) tooltips.hideAll();
        cur.calMon += shift;
        if (cur.calMon > 12) {
            cur.calMon = 1;
            cur.calYear++;
        } else if (cur.calMon < 1) {
            cur.calMon = 12;
            cur.calYear--;
        }
        ge('bd_calendar_header').innerHTML = getLang('Month' + cur.calMon) + ' ' + cur.calYear;

        var days = (new Date(cur.calYear, cur.calMon, 0)).getDate();
        var date = new Date(cur.calYear, cur.calMon - 1, 1);

        var start = (date.getDay() + 6) % 7;
        var offset = days + start;
        var weeksCount = Math.ceil(offset / 7);
        var rows = '';
        var nowDay = new Date();
        nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());

        for (var week = 0; week < weeksCount; week++) {
            var rowHTML = '';
            for (var weekDay = 0; weekDay < 7; weekDay++) {
                var day = week * 7 + weekDay - start + 1;
                var dayClass = (weekDay == 0) ? 'left ' : '';
                if (day > 0 && day <= days) {
                    var holidays = cur.calHolidays[cur.calMon];
                    var curDay = new Date(cur.calYear, cur.calMon - 1, day);

                    if (holidays && holidays[day] || weekDay > 4) {
                        dayClass += 'holiday ';
                    }

                    if (nowDay.toString() == curDay.toString()) {
                        dayClass += 'today ';
                    }

                    var dayEvents = Calendar.calGetEventsHTML(day, 0);

                    rowHTML += '<td class="bd_day_cell day' + (weekDay + 1) + ' ' + dayClass + '">\
            <div class="bd_day_num">' + day + '</div>\
            <div class="bd_day_events">' + dayEvents + '</div>\
          </td>';

                } else {
                    rowHTML += '<td class="bd_day_cell day' + (weekDay + 1) + ' ' + dayClass + '"></td>';
                }
            }

            rows += '<tr class="bd_day_row">' + rowHTML + '</tr>';
        }

        ge('bd_calendar_table_wrap').innerHTML = '<table class="bd_day_table" cellpadding="0" cellspacing="0" align="center">\
      <tr>\
       <td class="bd_day_head day1">' + getLang('events_mon') + '</td>\
       <td class="bd_day_head day2">' + getLang('events_tue') + '</td>\
       <td class="bd_day_head day3">' + getLang('events_wed') + '</td>\
       <td class="bd_day_head day4">' + getLang('events_thu') + '</td>\
       <td class="bd_day_head day5">' + getLang('events_fri') + '</td>\
       <td class="bd_day_head day6">' + getLang('events_sat') + '</td>\
       <td class="bd_day_head day7">' + getLang('events_sun') + '</td>\
      </tr>' + rows + '</table>';

        return false;
    },

    init: function(month, year, events, holidays) {
        extend(cur, {
            calEvents: events,
            calHolidays: holidays,
            calMon: month,
            calYear: year,
            calEventsById: {},
            sendGift: function(ev, mid, ref) {
                return !showBox('al_gifts.php', {
                    act: 'get_gift_box',
                    mid: mid,
                    fr: (mid == vk.id ? 1 : 0),
                    ref: ref
                }, {
                    stat: ['gifts.css', 'ui_controls.js', 'ui_controls.css'],
                    cache: 1,
                    dark: 1
                }, ev);
            }
        });

        each(cur.calEvents, function(i, m) {
            each(m, function(j, d) {
                each(d, function(k, item) {
                    cur.calEventsById[item[0]] = item;
                });
            });
        });
    }
}

try {
    stManager.done('calendar.js');
} catch (e) {}