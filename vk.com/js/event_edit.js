var ebrowse_mn = [];

for (var i = 1; i < 13; i++) {
    ebrowse_mn.push(window['Month_' + i] || window['Month' + i]);
}

datePicker = {
    calendarDiv: null,
    calendarBox: null,
    calendarFrame: null,
    shown: false,
    mode: "d",
    dates: {},
    lockHide: false,
    formId: "editInfo",
    onUpdate: function(pref, date, mode) {},
    months: [month1_of, month2_of, month3_of, month4_of, month5_of, month6_of, month7_of, month8_of, month9_of, month10_of, month11_of, month12_of],
    init: function(el, pref, formId, w, mode) {
        //if(core.isIE)return;
        calendar.showNextMonth = false;
        if (!this.calendarDiv) {
            if (formId) this.formId = formId;
            this.calendarBox = document.createElement("div");
            ge(this.formId).appendChild(this.calendarBox);
            this.calendarBox.style.display = "none";
            this.calendarBox.style.position = "absolute";
            this.calendarBox.innerHTML = "<iframe id='calendarFrame' style='border:0;position:absolute;z-index:100'></iframe><div id='calendarDiv' style='position:absolute;z-index:200'></div>";
            this.calendarDiv = ge('calendarDiv');
            this.calendarFrame = ge('calendarFrame');
        }
        var html = [];
        var types = {
            "d": "day",
            "m": "month",
            "y": "year"
        };
        if (mode) this.mode = mode;
        if (mode == "m") types = {
            "m": "month",
            "y": "year"
        };
        var date = {};
        for (var i in types) {
            var id = pref + "_time_" + types[i];
            date[i] = parseInt(ge(id).value, 10);
            html.push("<input type='hidden' name='" + id + "' id='" + id + "'/>");
        }
        this.dates[pref] = date;
        var id = pref + "_date_input";
        var imgId = pref + "_date_img";
        if (!w) w = 145;
        html.push("<input readonly style='width:" + w + "px;padding-left:6px;cursor:pointer;' class='inputText' onclick='datePicker.click(\"" + pref + "\")' onblur='datePicker.blur()' type='text' name='" + id + "' id='" + id + "'/>");
        html.push("<span style='height:20px;margin-right:-7px'><img src='/images/calendar.gif' style='margin:3px 6px -" + ((core.isIE) ? "1" : "3") + "px -18px;cursor:pointer;' onclick='datePicker.click(\"" + pref + "\")' id='" + imgId + "'/></span>");
        el.innerHTML = html.join("");
        this.update(pref, date, mode);
    },
    click: function(pref) {
        if (this.shown == pref) {
            this.hide();
        } else {
            this.hide();
            this.show(pref);
        }
    },
    blur: function() {
        return;
        /*
		var _t = this;
		setTimeout(function(){
			if(_t.lockHide){
				_t.lockHide = false;
				if(_t.shown)ge(_t.shown+"_date_input").focus();
				return;
			}
			_t.hide();
		}, 150);
    */
    },
    show: function(pref) {
        this.calendarBox.style.display = "";
        calendar.init(this.calendarDiv, this.dates[pref], this.mode);
        this.calendarFrame.style.width = this.calendarDiv.offsetWidth + "px";
        this.calendarFrame.style.height = this.calendarDiv.offsetHeight + "px";
        this.shown = pref;
        input = ge(pref + "_date_input");
        this.calendarBox.style.top = (core.getY(input) + input.offsetHeight + 2) + "px";
        this.calendarBox.style.left = core.getX(input) + "px";
        input.focus();
        calendar.getDay = function(d, m, y, mode) {
            datePicker.update(pref, {
                "d": d,
                "m": m,
                "y": y
            }, mode);
        }
    },
    update: function(pref, date, mode) {
        if (mode != "m") {
            ge(pref + "_time_day").value = date["d"];
        }
        ge(pref + "_time_month").value = date["m"];
        ge(pref + "_time_year").value = date["y"];
        this.dates[pref] = date;
        if (mode == "m") {
            ge(pref + "_date_input").value = ebrowse_mn[date["m"] - 1] || "";
        } else {
            ge(pref + "_date_input").value = date["d"] + " " + this.months[date["m"] - 1] + " " + date["y"];
        }
        datePicker.hide();
        this.onUpdate(pref, date, mode);
    },
    hide: function() {
        pref = this.show;
        this.calendarBox.style.display = "none";
        this.shown = false;
    }

}