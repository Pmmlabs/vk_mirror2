(function() {

    var l = {
        mn: [],
        mnOf: [],
        mnOfSm: [],
        days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    };

    var dateFormat = getLang('datepicker_dateFormat');
    if (dateFormat === 'dateFormat') dateFormat = '{day} {month} {year}';
    var monthFormat = getLang('datepicker_monthFormat');
    if (monthFormat === 'monthFormat') monthFormat = '{month} {year}';

    var larr = getLang('larr');
    if (larr === 'larr') larr = '&larr;';
    var rarr = getLang('rarr');
    if (rarr === 'rarr') rarr = '&rarr;';

    var modes = ['d', 'w', 'm'];

    for (var i = 1; i < 13; i++) {
        l.mn.push(getLang('Month' + i));
        l.mnOf.push(getLang('Month' + i + '_of'));
        l.mnOfSm.push(getLang('month' + i + '_of'));
    }
    for (var i = 0; i < 7; i++) {
        var wd = getLang('events_' + l.days[i]);
        if (wd.substr(0, 6) != 'events') l.days[i] = wd;
    }

    var dim = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (!window.cals) {
        window.cals = {
            list: {},
            getMonth: function(guid, m, y, monthsel) {
                if (cals.list[guid]) cals.list[guid].getMonth(m, y, false, monthsel);
                return false;
            },
            getDay: function(guid, d, m, y) {
                if (cals.list[guid]) cals.list[guid].getDay(d, m, y);
                return false;
            }
        };
    }

    window.DateCalendar = function(params) {
        var place = params.container;
        var rnd = Math.round(Math.random() * 1000000);
        if (!place) return;

        var guid = _ui.reg(this);
        cals.list[guid] = this;

        place.innerHTML = '<div></div>';
        place = place.firstChild;
        var mode = (modes[params.mode] || params.mode || 'd').toString().replace(/(this|next|prev)/, '');
        var hideNextMonth = params.hideNextMonth && true;

        var parseDay = this.parseDay = function(day) {
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
        if (!day.m) {
            day = parseDay(day);
        }

        var _t = this;
        var addRows = params.addRows || '';
        var addRowsM = params.addRowsM || addRows;

        this.setDay = function(d, m, y) {
            day = m ? {
                d: d,
                m: m,
                y: y
            } : parseDay(d);
            _t.getMonth(day.m, day.y);
        };

        this.setMode = function(m) {
            mode = (modes[m] || m || 'd').replace(/(this|next|prev)/, '');
            _t.getMonth(day.m, day.y, true);
        };

        var getChild = function(el, inds) {
            for (var i = 0; i < inds.length; i++) {
                var el = el.childNodes[inds[i]];
                if (!el) return null;
            }
            return el;
        };

        this.getDay = params.getDay || function(d, m, y) {};

        this.getMonth = function(m, y, noheight, monthsel) {
            var mn = l.mn;
            var oD = new Date(y, m - 1, 1);
            oD.od = oD.getDay();
            if (oD.od == 0) {
                oD.od = 7;
            }

            var disabled = (mode == '-1');

            var dontDoLine = false;
            var leftStyle = '';
            var todayDate = !disabled ? new Date() : new Date(3000, 1, 1);
            todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), (mode === 'm') ? 1 : todayDate.getDate());
            var futureDate = 0;
            if (params.activePeriod) {
                futureDate = new Date(Date.now() + params.activePeriod);
                futureDate = new Date(futureDate.getFullYear(), futureDate.getMonth(), (mode === 'm') ? 1 : futureDate.getDate());
            }

            var d_y = oD.getFullYear();
            dim[1] = (((d_y % 100 != 0) && (d_y % 4 == 0)) || (d_y % 400 == 0)) ? 29 : 28;
            var t = [];
            var t2 = [];

            var tbl = '<table class="%cls%" cols="%cols%" cellpadding="0" border="0" cellspacing="0"><tbody>%rows%</tbody></table>';
            var headerNormal;
            var headerDisabled;

            switch (mode) {
                case 'm':
                    var selDay = (y == day.y) ? day.m : 0;
                    nextYear = y + 1;
                    lastYear = y - 1;

                    headerNormal = '' +
                        '<tr>' +
                        '<td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + guid + ',1,' + lastYear + ');"></a></td>' +
                        '<td align="center" class="month">' + y + '</td>' +
                        '<td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + guid + ',1,' + nextYear + ');"></a></td>' +
                        '</tr>';

                    t.push('<tr><td colspan="2">');
                    t.push(rs(tbl, {
                        cls: 'cal_table_head',
                        cols: '3',
                        rows: headerNormal
                    }));
                    t.push('</td></tr><tr>');
                    for (var i = 1; i <= 12; i++) {
                        leftStyle = "";
                        if (i % 2 == 1) {
                            if (i > 1) t.push('</tr><tr>');
                            leftStyle = ' day_left';
                        }
                        clDay = (i == selDay) ? 'day sel' : 'day';
                        curDate = new Date(y, i - 1, 1);
                        if (!params.pastActive && curDate < todayDate || params.pastActive && curDate > todayDate) {
                            clDay += ' past_day';
                        }
                        if (params.activePeriod && curDate > futureDate) {
                            clDay += ' past_day';
                        }
                        if (curDate.getTime() == todayDate.getTime()) {
                            clDay += ' today';
                        }
                        t.push('<td class="' + clDay + leftStyle + '" style="width:50%" id="day' + i + '_' + rnd + '" onclick="return cals.getDay(' + guid + ', 1, ' + i + ', ' + y + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + mn[i - 1] + '</td>');
                    }
                    t.push('</tr>');

                    t2.push(rs(tbl, {
                        cls: 'cal_table',
                        cols: '2',
                        rows: t.join('')
                    }));

                    if (!noheight) place.style.height = place.offsetHeight + "px";

                    val(place, t2.join(''));

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

                    var monthYear = monthFormat.replace('{month}', mn[m - 1]).replace('{year}', y);
                    var calClass = 'cal_table' + (disabled ? ' disabled' : '') + (monthsel ? ' unshown' : '');
                    var hoverEl = (mode === 'w') ? 'this.parentNode' : 'this';

                    var headerNormal = '' +
                        '<tr>' +
                        '<td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + guid + ',' + lastMonth + ',' + lastYear + ');"></a></td>' +
                        '<td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + guid + ',' + m + ',' + y + ',1);">' + monthYear + '</a></td>' +
                        '<td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + guid + ',' + nextMonth + ',' + nextYear + ');"></a></td>' +
                        '</tr>';
                    var headerDisabled = '' +
                        '<tr>' +
                        '<td class="month_arr"><span class="arr left"></span></td>' +
                        '<td align="center" class="month">' + monthYear + '</td>' +
                        '<td class="month_arr"><span class="arr right"></span></td>' +
                        '</tr>';

                    t.push('<tr><td colspan="7">');
                    t.push(rs(tbl, {
                        cls: 'cal_table_head',
                        cols: '3',
                        rows: disabled ? headerDisabled : headerNormal
                    }));
                    t.push('</td></tr><tr>');

                    for (var s = 0; s < 7; s++) {
                        t.push('<td class="daysofweek">' + l.days[s] + '</td>');
                    }
                    t.push('</tr><tr>');

                    var dayPos = [];

                    for (var i = 1; i <= 42; i++) {
                        var leftStyle = (i % 7 == 1) ? ' day_left' : '';
                        var x = ((i - oD.od >= 0) && (i - oD.od < dim[m - 1])) ? i - oD.od + 1 : 0;
                        var curDate = new Date(y, m - 1, i - oD.od + 1);
                        var x1 = x;
                        var lim = 1;
                        if (mode === 'w') {
                            var x1 = i - oD.od - i % 7 + 2;
                            if (i % 7 == 0) x1 -= 7;
                            if (selDay) {
                                var lim = 8 - (selDay + oD.od - 1) % 7;
                                if (lim == 8) lim = 1;
                            }
                        }

                        clDay = leftStyle;
                        if (x >= selDay && x < selDay + lim) {
                            clDay += ' day sel';
                        } else {
                            clDay += ' day';
                        }
                        if (!params.pastActive && curDate < todayDate || params.pastActive && curDate > todayDate) {
                            clDay += ' past_day';
                        }
                        if (params.activePeriod && curDate > futureDate) {
                            clDay += ' past_day';
                        }
                        if (curDate.getTime() == todayDate.getTime()) {
                            clDay += ' today';
                        }

                        if (x > 0) {
                            dayPos[i] = x1;
                            t.push('<td id="day' + x + '_' + rnd + '" class="' + clDay + '" onclick="return cals.getDay(' + guid + ', ' + x1 + ', ' + m + ', ' + y + ');" onmouseover="addClass(' + hoverEl + ', \'hover\')"  onmouseout="removeClass(' + hoverEl + ', \'hover\')">' + x + '</td>');
                        } else {
                            if (i != 36) {
                                if (!dontDoLine) {
                                    if (mode === 'w') dayPos[i] = x1;
                                    date = (i > 7 && !hideNextMonth) ? curDate.getDate() : '&nbsp';
                                    t.push('<td class="day no_month_day' + leftStyle + '">' + date + '</td>');
                                }
                            } else {
                                dontDoLine = true;
                            }
                        }
                        if ((i % 7 == 0) && (i < 36)) {
                            t.push('</tr><tr>');
                        }
                    }
                    t.push('</tr>' + addRows);

                    t2.push(rs(tbl, {
                        cls: calClass,
                        cols: '7',
                        rows: t.join('')
                    }));

                    t = [];

                    todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);

                    var selDay = (y == day.y) ? day.m : 0;
                    var calClass = 'cal_table' + (disabled ? ' disabled' : '') + (monthsel ? '' : ' unshown');

                    headerNormal = '' +
                        '<tr>' +
                        '<td class="month_arr"><a class="arr left" onclick="return cals.getMonth(' + guid + ',' + m + ',' + (y - 1) + ',1);"></a></td>' +
                        '<td align="center" class="month"><a class="cal_month_sel" onclick="return cals.getMonth(' + guid + ',' + m + ',' + y + ');">' + y + '</a></td>' +
                        '<td class="month_arr"><a class="arr right" onclick="return cals.getMonth(' + guid + ',' + m + ',' + (y + 1) + ',1);"></a></td>' +
                        '</tr>';
                    headerDisabled = '' +
                        '<tr>' +
                        '<td class="month_arr"><span class="arr left"></span></td>' +
                        '<td align="center" class="month">' + y + '</td>' +
                        '<td class="month_arr"><span class="arr right"></span></td>' +
                        '</tr>';

                    t.push('<tr><td colspan="2">');
                    t.push(rs(tbl, {
                        cls: 'cal_table_head',
                        cols: '3',
                        rows: disabled ? headerDisabled : headerNormal
                    }));
                    t.push('</td></tr><tr>');
                    for (var i = 1; i <= 12; i++) {
                        leftStyle = '';
                        if (i % 2 == 1) {
                            if (i > 1) t.push('</tr><tr>');
                            leftStyle = ' day_left';
                        }
                        clDay = (i == selDay) ? 'day sel' : 'day';
                        curDate = new Date(y, i - 1, 1);
                        if (!params.pastActive && curDate < todayDate || params.pastActive && curDate > todayDate) {
                            clDay += ' past_day';
                        }
                        if (params.activePeriod && curDate > futureDate) {
                            clDay += ' past_day';
                        }
                        if (curDate.getTime() == todayDate.getTime()) {
                            clDay += ' today';
                        }
                        t.push('<td class="' + clDay + leftStyle + '" style="width:50%" id="day' + i + '_' + rnd + '" onclick="return cals.getMonth(' + guid + ', ' + i + ', ' + y + ');" onmouseover="addClass(this, \'hover\')"  onmouseout="removeClass(this, \'hover\')">' + mn[i - 1] + '</td>');
                    }
                    t.push('</tr>' + addRowsM);

                    t2.push(rs(tbl, {
                        cls: calClass,
                        cols: '2',
                        rows: t.join('')
                    }));

                    val(place, t2.join(''));

                    if (browser.opera && !browser.mobile) {
                        animate(place, {
                            opacity: 0.99
                        }, 20, animate.pbind(place, {
                            opacity: 1
                        }, 20)); // fuck opera!
                    }

                    break;
            }

            if (params.onMonthSelect) {
                params.onMonthSelect();
            }
        }

        this.getMonth(day.m, day.y);
    };

    window.Datepicker = function(el, options) {

        el = ge(el);
        if (!el) return;

        var dates = {};
        var lockHide = false;
        var _t = this;
        var w;
        var isShown = false;
        var hour = 0;
        var min = 0;
        var id = el.id;
        var inputId = id + "_date_input";
        var n = el.name || id;
        var p = el.parentNode;
        var calBox = id + '_cal_box';
        var calDiv = id + '_cal_div';
        var calFrame = id + '_cal_frame';
        var isEmpty = false;

        var defaults = {
            mode: 'd',
            resfmt: 'ts', // could be 'plain'
            width: 145,
            addRows: '',
            noFuture: false,
            noPast: false,
            activePeriod: false,
            pastActive: false,
            onUpdate: function(d, m) {},
            onMonthSelect: function() {}
        };

        options = extend({}, defaults, options);

        var mode = options.mode;
        var onUpdate = options.onUpdate;
        var w = options.width;
        var fmt = options.resfmt;
        var addRows = options.addRows;
        var addRowsM = options.addRowsM || addRows;

        var onClick = function(e) {
            if (mode === 'h') return false;
            if (isShown) {
                _t.hide();
            } else {
                showCalendar();
            }
            ge(inputId).blur();
            return false;
        };

        var checkCalendarTop = function() {
            var calDivEl = ge(calDiv),
                calBoxEl = ge(calBox),
                calInputEl = ge(inputId);
            headH = getSize('page_header_cont')[1];
            if (!calDivEl || !calBoxEl || !calInputEl) return;
            var s = getSize(calDivEl);

            setStyle(calBoxEl, {
                marginTop: 0
            });
            var top = getXY(calDivEl)[1] + s[1] > scrollGetY() + window.lastWindowHeight,
                mt = top ? -s[1] - 30 - 2 * intval(getStyle(calBoxEl, 'paddingTop')) : 0;
            setStyle(calBoxEl, {
                marginTop: mt
            });
            options.onMonthSelect();
        }

        var showCalendar = function() {
            if (isShown) return;
            isShown = true;

            _ui.sel(_t.guid);
            show(calBox);
            new DateCalendar({
                container: ge(calDiv),
                day: dates,
                mode: mode,
                addRows: addRows,
                addRowsM: addRowsM,
                hideNextMonth: true,
                pastActive: options.pastActive,
                activePeriod: options.activePeriod,
                onMonthSelect: checkCalendarTop,
                getDay: function(d, m, y) {
                    updateDate({
                        'd': d,
                        'm': m,
                        'y': y
                    }, mode);
                }
            });
            var s = getSize(ge(calDiv));
            setStyle(ge(calFrame), {
                width: s[0],
                height: s[1]
            });
            checkCalendarTop();
            ge(inputId).focus();
        };

        var updateDate = function(date, mode, init, empty) {
            if (!init && options.noPast) {
                if (new Date(date.y, date.m - 1, date.d, 23, 59) < new Date()) {
                    return;
                }
            }
            if (!init && options.noFuture) {
                if (new Date(date.y, date.m - 1, date.d, 0, 0) > new Date()) {
                    return;
                }
            }
            if (!init && options.activePeriod) {
                if (new Date(date.y, date.m - 1, date.d, 0, 0) > new Date().getTime() + options.activePeriod) {
                    return;
                }
            }
            dates = date;
            var controlElem = geByClass1('datepicker_control', wrap);
            if (mode === 'h') {
                addClass(controlElem, 'disabled');
            } else {
                removeClass(controlElem, 'disabled');
                if (!empty) {
                    if (mode === 'm') {
                        ge(inputId).value = monthFormat.replace('{month}', winToUtf(l.mn[date.m - 1])).replace('{year}', date.y);
                    } else {
                        ge(inputId).value = dateFormat.replace('{day}', date.d).replace('{month}', winToUtf(l.mnOf[date.m - 1])).replace('{year}', date.y);
                    }
                } else {
                    var inputEl = ge(inputId);
                    if (inputEl) {
                        inputEl.value = '';
                        if (options.placeholder) {
                            inputEl.placeholder = options.placeholder;
                        }
                    }
                }
            }
            _t.hide();
            if (!empty) {
                if (fmt === 'plain') {
                    ge(id).value = date.d + '.' + date.m + '.' + date.y + (options.time ? (' ' + hour + ':' + min) : '');
                } else if (fmt === 'ts') {
                    ge(id).value = Math.floor(new Date(date.y, date.m - 1, date.d, hour, min).getTime() / 1000) - ((new Date()).getTimezoneOffset() * 60 + intval(vk.tz)) - intval(vk.dt);
                }
            }

            if (!init) onUpdate(date, mode);
        };

        this.hide = function() {
            if (!isShown) return;
            isShown = false;

            _ui.sel(false);
            hide(calBox);
        };
        this.setMode = function(m) {
            mode = m;
            updateDate(dates, mode);
        };

        this.destroy = function() {
            _ui._uids[_t.guid] = {};
            removeEvent(geByClass1('datepicker_control', wrap), 'mousedown', onClick);
        };

        this.setDate = function(year, month, day, init, h, m) {
            var isEmpty = false;

            if (!year && !month && !day) {
                var d = new Date();
                if (mode != 'm') dates.d = d.getDate();
                dates.m = d.getMonth() + 1;
                dates.y = d.getFullYear();
                isEmpty = true;
            } else {
                if (mode != 'm') dates.d = day;
                dates.m = month;
                dates.y = year;
            }

            if (h !== undefined && m !== undefined) {
                hour = h;
                min = m;
            }

            updateDate(dates, mode, init, isEmpty && options.allowEmpty);
        }

        var d = 0,
            m;
        if (options.day || options.month || options.year) {
            if (mode != 'm') dates.d = options.day;
            dates.m = options.month;
            dates.y = options.year;
            if (options.time) {
                hour = options.hour || 0;
                min = options.min || 0;
            }
        } else if (m = (el.value || '').match(/(\d+)\.(\d+)(?:\.(\d+))?(?:\s+(\d+)\:(\d+))?/)) {
            if (mode != 'm') dates.d = intval(m[3].length ? m[1] : 0);
            dates.m = intval(m[3].length ? m[2] : m[1]);
            dates.y = intval(m[3].length ? m[3] : m[2]);
            if (options.time) {
                hour = m[4] || 0;
                min = m[5] || 0;
            }
        } else if (parseInt(el.value)) {
            var ts = parseInt(el.value) + ((new Date()).getTimezoneOffset() * 60 + intval(vk.tz)) + intval(vk.dt);
            d = new Date(ts * 1000);
        } else if (options.date) {
            var ts = intval(options.date) + ((new Date()).getTimezoneOffset() * 60 + intval(vk.tz)) + intval(vk.dt);
            d = new Date(ts * 1000);
        } else {
            d = new Date();
            isEmpty = true;
        }
        if (d) {
            dates.d = d.getDate();
            dates.m = d.getMonth() + 1;
            dates.y = d.getFullYear();
            hour = d.getHours();
            min = d.getMinutes();
        }

        var html = '<input type="hidden" name="' + n + '" id="' + id + '"/>' + '<div class="datepicker_control"><input readonly="1" type="text" class="datepicker_text" id="' + inputId + '"/></div>' + '<div id="' + calBox + '" class="cal_box"><iframe id="' + calFrame + '" class="cal_frame"></iframe><div id="' + calDiv + '" class="cal_div"></div></div>';
        var wrap = ce('div', {
            id: id + "_datepicker_container",
            className: "datepicker_container",
            innerHTML: html
        }, {
            width: w
        });
        p.replaceChild(wrap, el);
        addEvent(geByClass1('datepicker_control', wrap), 'mousedown', onClick);
        updateDate(dates, mode, true, isEmpty && options.allowEmpty);

        _t.guid = _ui.reg({
            container: wrap,
            onEvent: function(e) {
                if (e.type === 'mousedown') {
                    var outside = true,
                        t = e.target;
                    while (t && t != t.parentNode) {
                        if (t == wrap) {
                            outside = false;
                            break;
                        }
                        t = t.parentNode;
                    }
                    if (outside) {
                        _t.hide();
                    }
                }
            },
            _blur: function() {
                _t.hide();
            }
        });

        if (options.time) {
            var time = ge(options.time);
            this.timePicker = new Timepicker(time, {
                onUpdate: function(h, m) {
                    hour = h;
                    min = m;
                    updateDate(dates, mode);
                },
                resfmt: fmt,
                hour: hour,
                min: min,
                minStep: options.minStep || 5
            });
        }

        if (browser.mozilla) {
            hide(calFrame);
        }
    };

    window.Timepicker = function(el, options) {
        el = ge(el);
        if (!el) return;
        var id = el.id,
            n = el.name || '',
            v = el.value || '';

        var defaults = {
            onUpdate: function(h, m) {},
            time: 0,
            hour: 0,
            min: 0,
            minStep: 5,
            resfmt: 'ts', // could be 'plain'
            format: '{hour}<div class="timepicker_dots"> : </div>{min}' //TEMP
        };

        var o = extend({}, defaults, options);

        var p = el.parentNode;
        if (v) o.time = v;
        if (o.time) {
            o.hour = Math.floor(o.time / 3600);
            o.min = Math.floor((o.time - o.hour * 3600) / 60);
        }
        var h = o.hour || 0;
        var m = o.min || 0;
        var fmt = o.resfmt;
        m = m - m % o.minStep;

        var html = '<input type="hidden" name="' + n + '" id="' + id + '" value="' + v + '"/>' + o.format.replace('{hour}', '<div class="fl_l datepicker_item"><input type="hidden" id="' + id + '_hour_input" value="' + h + '"/></div>').replace('{min}', '<div class="fl_l datepicker_item"><input type="hidden" id="' + id + '_min_input" value="' + m + '"/></div>') + '<div class="results_container"><div class="result_list" style="display:none;"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div></div>';
        var wrap = ce('div', {
            id: id + "_timepicker_container",
            className: 'timepicker_container',
            innerHTML: html
        });
        p.replaceChild(wrap, el);

        var onChange = function() {
            var hour = this.hourDD.val(),
                min = this.minDD.val();
            if (fmt === 'plain') {
                ge(id).value = hour + ':' + min;
            } else if (fmt === 'ts') {
                ge(id).value = hour * 3600 + min * 60;
            }
            o.onUpdate(hour, min);
        }

        var hours = [],
            mins = [];
        for (var i = 0; i < 24; i++) {
            hours.push([i, i]);
        }
        for (var i = 0; i < 60; i += o.minStep) {
            mins.push([i, i < 10 ? '0' + i.toString() : i]);
        }

        this.hourDD = new Dropdown(ge(id + '_hour_input'), hours, {
            width: 60,
            dark: 1,
            multiselect: false,
            onChange: onChange.bind(this)
        });
        this.minDD = new Dropdown(ge(id + '_min_input'), mins, {
            width: 60,
            dark: 1,
            multiselect: false,
            onChange: onChange.bind(this)
        });
    };

    window.Daypicker = function(el, options) {
        el = ge(el);
        if (!el) return;
        var id = el.id,
            n = el.name || '',
            v = el.value || '';

        var defaults = {
            onUpdate: function(d, m, y) {},
            date: 0,
            year: 0,
            month: 0,
            day: 0,
            format: '{day}<div class="fl_l datepicker_item" style="padding:0 3px;width:4px;">&nbsp;</div>{month}<div class="fl_l datepicker_item" style="padding:0 3px;width:4px;">&nbsp;</div>{year}',
            width: 0
        };

        var o = extend({}, defaults, options);

        var p = el.parentNode;
        if (v) o.date = v;
        if (o.date) {
            if (o.date < 30000000) {
                o.year = Math.floor(o.date / 10000);
                o.month = Math.floor((o.date - o.year * 10000) / 100);
                o.day = o.date - o.year * 10000 - o.month * 100;
            } else {
                var d = new Date(o.date * 1000);
                o.year = d.getFullYear();
                o.month = d.getMonth();
                o.day = d.getDate();
            }
        }

        var html = '<div class="fl_l datepicker_item"><input type="hidden" name="' + n + '" id="' + id + '" value="' + v + '"/>' + o.format.replace('{year}', '<div class="fl_l datepicker_item"><input type="hidden" id="' + id + '_year_input" value="' + o.year + '"/></div>').replace('{month}', '<div class="fl_l datepicker_item"><input type="hidden" id="' + id + '_month_input" value="' + o.month + '"/></div>').replace('{day}', '<div class="fl_l datepicker_item"><input type="hidden" id="' + id + '_day_input" value="' + o.day + '"/></div>') + '</div>';
        var wrap = ce('div', {
            id: id + "_daypicker_container",
            className: 'daypicker_container clear_fix',
            innerHTML: html
        });
        p.replaceChild(wrap, el);

        var daysInMonth = function(month, year) {
            var days = (new Date(year ? year : 2004, month, 0)).getDate(),
                res = [
                    [0, getLang('global_day_label')]
                ];
            for (var i = 1; i <= days; i++) {
                res.push([i, i]);
            }
            return res;
        }

        var onChange = function() {
            var year = parseInt(yearDD.val()),
                month = parseInt(monthDD.val()),
                day = parseInt(dayDD.val());
            ge(id).value = year * 10000 + month * 100 + day;
            dayDD.setData(daysInMonth(month, year));
            o.onUpdate(year, month, day);
        }
        var d = new Date(),
            years = [
                [0, getLang('global_year_label')]
            ],
            months = [
                [0, getLang('global_month_label')]
            ];
        for (var i = d.getFullYear(); i >= (o.startYear || 1800); i--) {
            years.push([i, i]);
        }
        for (var i = 0; i < 12; i++) {
            months.push([i + 1, l.mnOf[i]]);
        }

        var dayDD = new Dropdown(ge(id + '_day_input'), daysInMonth(o.month, o.year), {
            width: 80,
            dark: 1,
            zeroPlaceholder: o.zeroPlaceholder,
            onChange: onChange
        });
        var monthDD = new Dropdown(ge(id + '_month_input'), months, {
            width: 120,
            dark: 1,
            zeroPlaceholder: o.zeroPlaceholder,
            onChange: onChange
        });
        var yearDD = new Dropdown(ge(id + '_year_input'), years, {
            width: 75,
            dark: 1,
            zeroPlaceholder: o.zeroPlaceholder,
            onChange: onChange
        });
        if (o.width) {
            var w = getSize(wrap.firstChild)[0],
                d = o.width - w,
                w1 = getSize(monthDD.container)[0];
            each([monthDD.container, monthDD.resultList], function() {
                setStyle(this, {
                    width: parseInt(w1 + d)
                });
            });
        }
    }

})();

try {
    stManager.done('datepicker.js');
} catch (e) {}