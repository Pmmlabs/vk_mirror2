// common.js compatible


var privacyBox = {
    langs: {},
    pref: "",
    onChanged: null,
    box: null,

    init: function(lang, pref, func) {
        if (pref) {
            this.pref = pref + "_";
            this.langs[pref] = lang;
        } else {
            this.langs['all'] = lang;
        }
        this.onChanged = func;
    },

    getLang: function(pref) {
        if (pref) return this.langs[pref];
        else return this.langs['all'];
    },

    toggle: function(pref) {
        if (pref) this.pref = pref + "_";
        if (ge(this.pref + 'cat').value > 0) {
            show(this.pref + 'fgContainer');
            if (ge(this.pref + 'fgContainerEx')) ge(this.pref + 'fgContainerEx').style.display = "";
            ge(this.pref + 'fgContainer').innerHTML = this.getCats(ge(this.pref + 'cat').value);
            ge(this.pref + 'cat').checked = 'checked';
        } else {
            ge(this.pref + 'cat').value = 510;
            this.change(pref);
        }
    },

    change: function(pref) {
        var lang = this.getLang(pref);
        if (pref) this.pref = pref + "_";

        var cat = ge(this.pref + 'cat').value;

        var vlist = "<div style='margin:16px 0px 0px 8px;width:240px'>";
        vlist += "<table id='gTable' cellspacing=3 cellpadding=3 border=0>";
        var len = Math.min(9, catNames.length);

        for (var i = 1; i < len; i++) {
            var non = (cat >> i) & 1 ? 'v' : 'non';
            var on = (cat >> i) & 1 ? 'On' : '';
            var de = (cat >> i) & 1 ? 'de' : '';
            vlist += "<tr><td id='" + i + "vcheck' style='width:13px' width='13' class='" + non + "check'></td>";
            vlist += "<td style='width:200px'>";
            vlist += "<div class='FV" + this.numToColor(i) + on + "' id='" + i + "VOption'><a id='" + i + "vtxt' href='javascript:privacyBox." + de + "vColor(" + i + ")'>" + catNames[i] + "</a></div>";
            vlist += "</td></tr>";
        }

        vlist += "</table></div>";

        if (!this.box) {
            this.box = new MessageBox({
                width: "290px",
                title: lang.whosees
            });

            var box = this.box;

            box.addButton({
                label: lang.cancel,
                style: 'button_no',
                onClick: function() {
                    box.hide();
                }
            }).addButton({
                label: lang.save,
                onClick: function() {
                    var p = privacyBox.pref;
                    if (ge(p + 'cat').value > 0) {
                        show(p + 'fgContainer');
                        if (ge(p + 'fgContainerEx')) ge(p + 'fgContainerEx').style.display = "";
                        ge(p + 'fgContainer').innerHTML = privacyBox.getCats(ge(p + 'cat').value);
                        ge(p + 'cat').checked = 'checked';
                    } else {
                        if (ge(p + 'fgContainerEx')) ge(p + 'fgContainerEx').style.display = "none";
                        hide(p + 'fgContainer');
                        if (ge(p + 'visibleAll') && ge(p + 'cat').checked) {
                            ge(p + 'visibleAll').checked = 'checked';
                        }
                    }
                    if (privacyBox.onChanged) privacyBox.onChanged(p);

                    box.hide();
                }
            }).content("<div>" + lang.canseealbum + vlist + "</div>");
        }
        this.box.show();

    },

    getCats: function(cat) {
        var cats = "";
        if (cat > 1) {
            var len = Math.min(9, catNames.length);
            for (var ci = 1; ci < len; ci++) {
                if ((cat >> ci) & 1) {
                    if (cats) {
                        cats += " ";
                    }
                    cats += "<span class='Group" + ci + "'>" + catNames[ci] + "</span>";
                }
            }
        }
        return cats;
    },

    numToColor: function(num) {
        var colors = new Array("White", "Red", "Orange", "Yellow",
            "Green", "Teal", "Blue", "Marine", "Purple");
        return colors[num];
    },

    vColor: function(num) {

        var color = this.numToColor(num);

        ge(num + 'VOption').className = "FV" + color + "On";
        ge(num + 'vcheck').className = "vcheck";
        var word = ge(num + 'vtxt').innerHTML;
        ge(num + 'VOption').innerHTML = "<a id='" + num + "vtxt' href='javascript:privacyBox.devColor(" + num + ")'>" + word + "</a>";
        ge(this.pref + 'cat').value |= (1 << num);

    },

    devColor: function(num) {

        var color = this.numToColor(num);

        ge(num + 'VOption').className = "FV" + color;
        ge(num + 'vcheck').className = "noncheck";
        var word = ge(num + 'vtxt').innerHTML;
        ge(num + 'VOption').innerHTML = "<a id='" + num + "vtxt' href='javascript:privacyBox.vColor(" + num + ")'>" + word + "</a>";
        ge(this.pref + 'cat').value &= ~(1 << num);

    },

    submit: function(btn, form, prefs) {
        btn.disabled = true;
        if (!prefs) prefs = [this.pref];
        for (var i in prefs) {
            var pref = prefs[i];
            if (ge(pref + 'cat') != null && ge(pref + 'cat').checked) {
                ge(pref + 'cat').value = -ge(pref + 'cat').value;
            }
        }
        form.submit();
    }
};