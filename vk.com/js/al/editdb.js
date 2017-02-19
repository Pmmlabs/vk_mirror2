var EditDB = {
    getHighlight: function(e, i) {
        var t = e.delimiter,
            c = e.trimmer;
        return i += " " + (parseLatin(i) || ""), i = escapeRE(i).replace(/&/g, "&amp;"), i = i.replace(c, "").replace(t, "|"), {
            re: new RegExp("(" + i + ")", "gi"),
            val: '<span class="edb_hl">$1</span>'
        }
    },
    hlReg: function(e, i) {
        e = domPN(e), e.href = e.href.replace(i ? "cities" : "regions", i ? "regions" : "cities")
    },
    initCountries: function(e) {
        placeholderSetup("edb_filter", {
            back: !0
        }), elfocus("edb_filter"), extend(cur, {
            lang: extend(cur.lang || {}, e),
            all: [],
            names: {},
            hidden: {}
        }), each(ge("edb_countries").childNodes, function() {
            cur.all.push(this.id), cur.names[this.id] = this.firstChild.nodeValue
        }), cur.index = new vkIndexer(cur.all, function(e) {
            return trim(cur.names[e])
        })
    },
    filterCountries: function(e) {
        e = trim(val("edb_filter", e ? trim(e) : e)), toggle("edb_filter_reset", !!e);
        var i = ge("edb_countries").childNodes,
            t = e ? EditDB.getHighlight(cur.index, e) : !1;
        if (e) {
            var c = cur.index.search(e),
                n = {};
            if (c.length) {
                for (var s in c) n[c[s]] = 1;
                each(i, function() {
                    toggle(this, !!n[this.id]), this.replaceChild(ce("span", {
                        innerHTML: cur.names[this.id].replace(t.re, t.val)
                    }), this.firstChild)
                }), show("edb_countries"), hide("edb_no_countries")
            } else hide("edb_countries"), show("edb_no_countries")
        } else elfocus("edb_filter"), show("edb_countries"), hide("edb_no_countries"), each(i, function() {
            show(this), this.replaceChild(ce("span", {
                innerHTML: cur.names[this.id]
            }), this.firstChild)
        })
    },
    check: function(e) {
        hasClass(e, "edb_disabled") || toggleClass(e, "edb_checked")
    },
    checkCheck: function(e, i) {
        hasClass(e, "edb_disabled") || (i.ctrlKey ? addClass(e, "edb_checked") : i.shiftKey && removeClass(e, "edb_checked"))
    },
    initCities: function(e) {
        cur.lang = extend(cur.lang || {}, e), each(geByClass("edb_children"), function() {
            this.title = winToUtf(getLang("edit_child_tooltip"))
        }), each(geByClass("edb_checkable"), function() {
            this.onclick = EditDB.check.pbind(this), this.onmouseover = EditDB.checkCheck.pbind(this)
        }), each(["edb_city_by_name", "edb_city_by_uni", "edb_city_by_school"], function(e, i) {
            val(i) && elfocus(i)
        })
    }
};
try {
    stManager.done("editdb.js")
} catch (e) {}