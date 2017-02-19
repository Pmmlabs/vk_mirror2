(function() {

    var ebrowse_mn = [];
    var ebrowse_days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var ebrowse_dayname_length = getLang('events_mon').length;

    var date_format = getLang('datepicker_date_format');
    if (date_format == 'datepicker date format') date_format = '{day} {month} {year}';
    var month_format = getLang('datepicker_month_format');
    if (month_format == 'datepicker month format') month_format = '{month} {year}';

    var larr = getLang('larr');
    if (larr == 'larr') larr = '&larr;';
    var rarr = getLang('rarr');
    if (rarr == 'rarr') rarr = '&rarr;';


    for (var i = 1; i < 13; i++) {
        ebrowse_mn.push(getLang('Month' + i));
    }
    for (var i = 0; i < 7; i++) {
        var wd = getLang('events_' + ebrowse_days[i]);
        if (wd.substr(0, 6) != 'events') ebrowse_days[i] = wd;
    }

    window.Calendar = function(params) {
        var place = params.container;
        var rnd = Math.round(Math.random() * 1000000);
        if (!place) return;
        place.innerHTML = "<div></div>";
        place = place.firstChild;
        var modes = ['d', 'w', 'm'];
        var mode = (modes[params.mode] || params.mode || "d").toString().replace(/(this|next|prev)/, "");
        var colorTypes = {
            "hoverDay": "#EDF0F3",
            "deHoverDay": "#FFFFFF",
            "hoverToday": "#DFE6EB",
            "deHoverToday": "#DAE2E8"
        };
        var dayColors = [];
        var hideNextMonth = params.hideNextMonth && true;

        var parseDay = function(day) {
            day = day.toString();
            return {
                y: parseInt(day.substr(0, 4), 10),
                m: parseInt(day.substr(4, 2), 10),
                d: parseInt(day.substr(6, 2), 10)
            };
        }

        var day = params.day || {
            d: -1,
            m: -1,
            y: -1
        };
        if (!day.d) {
            day = parseDay(day);
        }
        var getDay = params.getDay || function(d, m, y) {};
        var _t = this;

        _t.setDay = function(d, m, y) {
            day = m ? {
                d: d,
                m: m,
                y: y
            } : parseDay(d);
            getMonth(day.m, day.y);
        };

        _t.setMode = function(m) {
            mode = (modes[m] || m || "d").replace(/(this|next|prev)/, "");
            getMonth(day.m, day.y, true);
        };

        var cleanDay = function() {
            getDay(-1, -1, -1);
        };

        var setDayColor = function(x, type) {
            var lim = (mode == "w") ? 7 : 1;
            for (var i = 0; i < lim; i++) {
                var xday = ge('day' + (x + i) + '_' + rnd);
                if (xday) xday.style.backgroundColor = colorTypes[dayColors[x + i][type]];
            }
        };

        var getChild = function(el, inds) {
            for (var i = 0; i < inds.length; i++) {
                var el = el.childNodes[inds[i]];
                if (!el) return null;
            }
            return el;
        };

        var getMonth = function(m, y, noheight) {
            var mn = ebrowse_mn;
            var dim = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var oD = new Date(y, m - 1, 1);
            oD.od = oD.getDay();
            if (oD.od == 0) {
                oD.od = 7;
            }

            var disabled = (mode == '-1');

            var dontDoLine = false;
            var leftStyle = '';
            var todayDate = !disabled ? new Date() : new Date(3000, 1, 1);

            var d_y = oD.getFullYear();
            dim[1] = (((d_y % 100 != 0) && (d_y % 4 == 0)) || (d_y % 400 == 0)) ? 29 : 28;

            var t = [];
            switch (mode) {
                case 'm':
                    var selDay = (y == day.y) ? day.m : 0;
                    nextYear = y + 1;
                    lastYear = y - 1;
                    t.push('<table class="calTable" cols="7" cellpadding="0" border="0" cellspacing="0"><tbody><tr>');
                    t.push('<td class="monthArr"><a class="monthArrow" href="">' + larr + '</a></td>');
                    t.push('<td colspan="5" align="center" class="month">' + y + '</td>');
                    t.push('<td class="monthArr"><a class="monthArrow" href="">' + rarr + '</a></td></tr><tr>');
                    t.push('</tr></tbody></table><table class="calTable" cols="2" cellpadding="0" border="0" cellspacing="0"><tbody><tr>');
                    for (var i = 1; i <= 12; i++) {
                        leftStyle = "";
                        if (i % 2 == 1) {
                            if (i > 1) t.push('</tr><tr>');
                            leftStyle = ' dayLeft';
                        }
                        dayColors[i] = (i == selDay) ? {
                            'over': 'hoverToday',
                            'out': 'deHoverToday'
                        } : {
                            'over': 'hoverDay',
                            'out': 'deHoverDay'
                        };
                        clDay = (i == selDay) ? 'today' : 'day';
                        curDate = new Date(y, i - 1, 1);
                        if (i != selDay && curDate < todayDate) clDay += " pastDay";
                        t.push('<td class="' + clDay + leftStyle + '" style="width:50%" id="day' + i + '_' + rnd + '">' + mn[i - 1] + '</td>');
                    }

                    t.push('</tr></tbody></table>');
                    if (!noheight) place.style.height = place.offsetHeight + "px";

                    place.innerHTML = t.join('');

                    lArrow = getChild(place, [0, 0, 0, 0]);
                    rArrow = getChild(place, [0, 0, 0, 2]);
                    addEvent(lArrow, 'click', function() {
                        getMonth(1, lastYear);
                        return false;
                    });
                    addEvent(rArrow, 'click', function() {
                        getMonth(1, nextYear);
                        return false;
                    });
                    for (var i = 1; i <= 12; i++) {
                        var td = getChild(place, [1, 0, Math.floor((i - 1) / 2), (i - 1) % 2]);
                        addEvent(td, 'click', (function(ii) {
                            return function() {
                                getDay(1, ii, y, 'm');
                            }
                        })(i));
                        addEvent(td, 'mouseover', (function(ii) {
                            return function() {
                                setDayColor(ii, 'over');
                            }
                        })(i));
                        addEvent(td, 'mouseout', (function(ii) {
                            return function() {
                                setDayColor(ii, 'out');
                            }
                        })(i));
                    }
                    break;

                default:
                    var selDay = (y == day.y && m == day.m) ? day.d : 0;
                    if (m == 12) {
                        nextMonth = 1;
                        nextYear = y + 1;
                    } else {
                        nextMonth = m + 1;
                        nextYear = y;
                    }

                    if (m == 1) {
                        lastMonth = 12;
                        lastYear = y - 1;
                    } else {
                        lastMonth = m - 1;
                        lastYear = y;
                    }
                    var month_year = month_format.replace('{month}', mn[m - 1]).replace('{year}', y);
                    var cal_class = (disabled) ? "calTable disabled" : "calTable";
                    t.push('<table class="' + cal_class + '" cols="7" cellpadding="0" border="0" cellspacing="0"><tbody><tr>');
                    t.push(disabled ? '<td class="monthArr"><span class="monthArrow">' + larr + '</span></td>' : '<td class="monthArr"><a class="monthArrow" href="">' + larr + '</a></td>');
                    t.push('<td colspan="5" align="center" class="month">' + month_year + '</td>');
                    t.push(disabled ? '<td class="monthArr"><span class="monthArrow">' + rarr + '</span></td></tr><tr>' : '<td class="monthArr"><a class="monthArrow" href="">' + rarr + '</a></td></tr><tr>');
                    for (var s = 0; s < 7; s++) {
                        t.push('<td class="daysofweek">' + ebrowse_days[s] + '</td>');
                    }
                    t.push('</tr><tr>');

                    var dayPos = [];

                    for (var i = 1; i <= 42; i++) {
                        var leftStyle = (i % 7 == 1) ? ' dayLeft' : '';
                        var x = ((i - oD.od >= 0) && (i - oD.od < dim[m - 1])) ? i - oD.od + 1 : 0;
                        var curDate = new Date(y, m - 1, i - oD.od + 1);
                        var x1 = x;
                        var lim = 1;
                        if (mode == "w") {
                            var x1 = i - oD.od - i % 7 + 2;
                            if (i % 7 == 0) x1 -= 7;
                            if (selDay) {
                                var lim = 8 - (selDay + oD.od - 1) % 7;
                                if (lim == 8) lim = 1;
                            }
                        }
                        dayColors[x] = (x >= selDay && x < selDay + lim) ? {
                            'over': 'hoverToday',
                            'out': 'deHoverToday'
                        } : {
                            'over': 'hoverDay',
                            'out': 'deHoverDay'
                        };
                        if (x >= selDay && x < selDay + lim) {
                            clDay = 'today' + leftStyle;
                        } else {
                            clDay = 'day' + leftStyle;
                            if (curDate - todayDate + 86400000 < 0) clDay += " pastDay";
                        }

                        if (x > 0) {
                            dayPos[i] = x1;
                            t.push('<td id="day' + x + '_' + rnd + '" class="' + clDay + '">' + x + '</td>');
                        } else {
                            if (i != 36) {
                                if (!dontDoLine) {
                                    if (mode == "w") dayPos[i] = x1;
                                    date = (i > 7 && !hideNextMonth) ? curDate.getDate() : "&nbsp";
                                    t.push('<td class="day noMonthDay' + leftStyle + '">' + date + '</td>');
                                }
                            } else {
                                dontDoLine = true;
                            }
                        }
                        if ((i % 7 == 0) && (i < 36)) {
                            t.push('</tr><tr>');
                        }
                    }
                    t.push('</tr></tbody></table>');

                    place.innerHTML = t.join('');
                    if (mode != '-1') {
                        var lArrow = getChild(place, [0, 0, 0, 0]);
                        var rArrow = getChild(place, [0, 0, 0, 2]);
                        addEvent(lArrow, 'click', function() {
                            getMonth(lastMonth, lastYear);
                            return false;
                        });
                        addEvent(rArrow, 'click', function() {
                            getMonth(nextMonth, nextYear);
                            return false;
                        });
                        for (var i in dayPos) {
                            var x1 = dayPos[i];
                            if (!parseInt(x1)) continue;
                            var td = getChild(place, [0, 0, Math.floor((i - 1) / 7) + 2, (i - 1) % 7]);
                            addEvent(td, 'click', (function(xx1) {
                                return function() {
                                    getDay(xx1, m, y, mode);
                                }
                            })(x1));
                            addEvent(td, 'mouseover', (function(xx1) {
                                return function() {
                                    setDayColor(xx1, 'over');
                                }
                            })(x1));
                            addEvent(td, 'mouseout', (function(xx1) {
                                return function() {
                                    setDayColor(xx1, 'out');
                                }
                            })(x1));
                        }
                    }
                    break;
            }
        }

        getMonth(day.m, day.y);
    };

    var pickerShown = null;

    //
    // 2010-10-20 changed by valich: added some functionality, now can change mode.
    //
    window.DatePicker = function(params) {
        if (!params) return;
        var calendarDiv, calendarBox, calendarFrame, dates = {},
            lockHide = false,
            dates = {};
        var months = [];
        for (var i = 1; i < 13; i++) {
            months.push(getLang('month' + i + '_of'));
        }

        var mode = params.mode || "d";
        var form = ge(params.formId) || ge("editInfo");
        var pref = params.pref ? params.pref + '_' : '';
        var onUpdate = params.onUpdate || (function(d, m) {});
        var w = params.width || 145;
        var useForm = form && true;
        var el = params.container;
        var dateInput, dateImg;
        var _t = this;

        var fixIE = function() {
            if (!browser.msie) return;
            calendarDiv = ge(calendarDiv.id);
            calendarBox = ge(calendarBox.id);
            calendarFrame = ge(calendarFrame.id);
            dateInput = ge(dateInput.id);
            dateImg = ge(dateImg.id);
        }

        var onClick = function(e) {
            if (mode == 'h') return;
            fixIE();
            if (pickerShown == _t) {
                _t.hide();
            } else {
                if (pickerShown) pickerShown.hide();
                show();
            }
            cancelEvent(e);
        };

        var onDocClick = function(e) {
            if (e.target.id == inputId || e.target.id == imgId) {
                onClick(e);
                return;
            }
            var p = e.target;
            while (p = p.parentNode) {
                if (p == calendarDiv) {
                    return;
                }
            }
            fixIE();
            _t.hide();
        };

        var show = function() {
            calendarBox.style.display = "";
            new Calendar({
                hideNextMonth: true,
                container: calendarDiv,
                day: dates,
                mode: mode,
                getDay: function(d, m, y, mode) {
                    update({
                        "d": d,
                        "m": m,
                        "y": y
                    }, mode);
                }
            });
            calendarFrame.style.width = calendarDiv.offsetWidth + "px";
            calendarFrame.style.height = calendarDiv.offsetHeight + "px";
            pickerShown = _t;
            var xy = getXY(dateInput);
            var p = dateInput;
            while (p = p.parentNode) {
                if (p.style && getStyle(p, 'position') == 'absolute') {
                    var xy1 = getXY(p);
                    xy[0] -= xy1[0];
                    xy[1] -= xy1[1];
                }
            }
            calendarBox.style.top = (xy[1] + dateInput.offsetHeight + 2) + "px";
            if (window.is_rtl) {
                calendarBox.style.left = xy[0] + getSize(dateInput)[0] + "px";
            } else {
                calendarBox.style.left = xy[0] + "px";
            }
            dateInput.focus();
        };

        var update = function(date, mode, init) {
            if (useForm) {
                if (mode != "m") {
                    ge(pref + "time_day").value = date.d;
                }
                ge(pref + "time_month").value = date.m;
                ge(pref + "time_year").value = date.y;
            }
            dates = date;
            if (mode == 'h') {
                addClass(el, 'datepickerDisabled');
            } else {
                removeClass(el, 'datepickerDisabled');
                if (mode == "m") {
                    //dateInput.value = (ebrowse_mn[date.m-1] || "");
                    dateInput.value = month_format.replace('{month}', ebrowse_mn[date.m - 1] || '').replace('{year}', date.y);
                } else {
                    //dateInput.value = date.d + ' ' + winToUtf(months[date.m - 1]) + ' ' + date.y;
                    dateInput.value = date_format.replace('{day}', date.d).replace('{month}', winToUtf(months[date.m - 1])).replace('{year}', date.y);
                }
            }
            _t.hide();
            if (!init) onUpdate(date, mode);
        };

        this.hide = function() {
            calendarBox.style.display = "none";
            pickerShown = false;
        };

        //init
        var rnd = Math.round(Math.random() * 1000000);
        calendarBox = document.createElement("div");
        calendarBox.style.display = "none";
        calendarBox.style.position = "absolute";
        calendarBox.id = "calendarBox" + rnd;
        calendarBox.innerHTML = "<iframe id='calendarFrame" + rnd + "' style='border:0;position:absolute;z-index:100;'></iframe><div id='calendarDiv" + rnd + "' style='position:absolute;z-index:200'></div>";

        var html = [];
        if (!useForm) {
            if (params.date) {
                var d = new Date(params.date * 1000);
                params.year = d.getFullYear();
                params.month = d.getMonth() + 1;
                params.day = d.getDate();
            }
            if (mode != "m") dates.d = params.day;
            dates.m = params.month;
            dates.y = params.year;
        } else {
            var types = {
                m: "month",
                y: "year"
            };
            if (mode != "m") types.d = "day";

            for (var i in types) {
                var id = pref + "time_" + types[i];
                dates[i] = parseInt(ge(id).value, 10);
                html.push("<input type='hidden' name='" + id + "' id='" + id + "'/>");
            }
        }

        this.changeMode = function(newMode) {
            mode = newMode;
            update(dates, mode, false);
        }

        var inputId = pref + "date_input";
        var imgId = pref + "date_img";
        html.push('<input readonly="1" class="calInput" style="width:' + w + 'px;" class="inputText" type="text" name="' + inputId + '" id="' + inputId + '"/>');
        html.push('<span class="calImg"><img src="/images/calendar.gif" style="margin-bottom:-' + ((browser.msie) ? '1' : '3') + 'px;" id="' + imgId + '"/></span>');
        el.innerHTML = html.join("");
        dateInput = ge(inputId);
        dateImg = ge(imgId);
        addEvent(dateInput, 'click', onClick);
        addEvent(dateImg, 'click', onClick);
        addEvent(document, 'click', onDocClick);
        update(dates, mode, true);

        if (!useForm) form = el;
        form.appendChild(calendarBox);
        calendarDiv = ge('calendarDiv' + rnd);
        calendarFrame = ge('calendarFrame' + rnd);
        if (browser.mozilla) {
            calendarFrame.style.display = 'none';
        }

    };

})();