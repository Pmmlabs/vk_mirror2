var Language = {
    init: function() {
        cur.languagesListSearch = new vkIndexer(cur.languagesList, function(a) {
            return replaceEntities(a.name) + " " + a.name_rus + " " + a.name_eng
        }), cur.destroy.push(function() {
            delete cur.languagesListSearch
        }), elfocus("language_search_form")
    },
    makeResults: function(a, e) {
        if (a.length) {
            var n = {},
                t = 0,
                l = "",
                g = !1,
                o = Math.ceil(a.length / cur.columnsNum);
            if (e) {
                e += " " + (parseLatin(e) || ""), e = trim(escapeRE(e.replace(/[,]/g, "")));
                var s = e.replace(cur.languagesListSearch.delimiter, "|").replace(/(^\||\|$|\?)/g, ""),
                    g = new RegExp("(" + s + ")", "gi")
            }
            return each(a, function(a, l) {
                var s = Math.floor(t / o);
                n["column_" + s] || (n["column_" + s] = "");
                var r = clone(l);
                e && (r.name = replaceEntities(r.name), r.name = r.name.replace(g, '<span class="language_name_hl">$1</span>')), n["column_" + s] += getTemplate("langRow", r), t++
            }), each(n, function(a, e) {
                l += getTemplate("langColumn", {
                    column: e
                })
            }), l
        }
        return ""
    },
    search: function(a) {
        var e = ge("all_languages_list");
        if (a = trim(a), a.length > 0) var n = cur.languagesListSearch.search(a);
        else var n = cur.languagesList;
        window.tooltips && tooltips.destroyAll();
        var t = Language.makeResults(n, a);
        toggle("languages_not_found", !t), toggle(e, t), val(e, t)
    },
    showEngName: function(a) {
        showTooltip(a, {
            text: attr(a, "data-eng-name"),
            black: 1,
            shift: [0, 0, -30]
        })
    },
    changeLang: function(a, e, n) {
        return hasClass(a, "language_selected") ? !1 : void ajax.post("al_index.php", {
            act: "change_lang",
            lang_id: e,
            hash: n
        }, {
            onDone: topMsg
        })
    },
    showBetaTooltip: function(a, e) {
        cancelEvent(e), showTooltip(a, {
            text: getLang("global_language_beta_version"),
            black: 1,
            shift: [16, 4, 0]
        })
    },
    showOtherLanguages: function() {
        curBox().hide(), showBox("lang.php", {
            act: "lang_dialog",
            all: 1
        }, {
            params: {
                dark: !0,
                bodyStyle: "padding: 0px"
            },
            noreload: !0
        })
    }
};
try {
    stManager.done("language.js")
} catch (e) {}