var Talmud = {
    toggleAllRows: function(t) {
        cur.tlmdRowsOpened = !cur.tlmdRowsOpened, each(geByClass("talmud_row", "tlmd_found_list"), setTimeout.pbind(function(t, e) {
            Talmud.doToggleRow(geByClass1("talmud_inner_row", e), cur.tlmdRowsOpened)
        }, 0)), toggleClass(t, "shown")
    },
    toggleRow: function(t, e, o) {
        return o.target || (o.target = o.srcElement || document), "a" == o.target.tagName.toLowerCase() ? !0 : (Talmud.doToggleRow(e, !hasClass(e, "talmud_inner_row_hidden")), !1)
    },
    doToggleRow: function(t, e) {
        toggleClass(t, "talmud_inner_row_hidden", e)
    },
    toggleRowPrevent: function(t, e) {
        t.stopPropagation()
    },
    handleTagsPos: function() {
        if (!ge("tlmd_tags_td")) return !1;
        var t = scrollGetY(),
            e = window.lastWindowHeight || 0,
            o = 0,
            a = ge("tlmd_tags_td"),
            l = getXY(a)[1],
            r = getSize(a)[1],
            i = ge("tlmd_tags"),
            d = (getXY(i)[1], getSize(i)[1]),
            s = Math.max(0, t + e - r - l),
            n = 20 > r - d,
            c = cur.filterLastPos || 0,
            _ = cur.lastSt || 0,
            g = getSize("page_header_cont")[1];
        t > l && !n ? (addClass(i, "fixed"), o = e > d ? Math.min(g, e - d - s) : Math.max(Math.min(g, c + _ - t), e - d - s)) : (removeClass(i, "fixed"), o = 0), cur.filterLastPos = o, cur.lastSt = t, setStyle(i, {
            top: o + "px"
        })
    },
    setSearchString: function(t, e, o) {
        val(t, e), Talmud.updateSearchString(e, o, !0)
    },
    updateSearchString: function(t, e, o) {
        return cur.prevSearch = cur.prevSearch || "", cur.prevSearchStr = cur.prevSearchStr || "", !o && t ? void(cur.prevSearchStr = t) : (cur.prevSearchStr = t, void Talmud.updateSearch(t))
    },
    searchAll: function(t) {
        lockButton(t), Talmud.updateSearch(cur.prevSearch, 1)
    },
    updateSearch: function(t, e) {
        cur.prevSearch = t;
        var o = {
            load: 1
        };
        nav.objLoc.act && (o.act = nav.objLoc.act), t && (o.q = t), e && (o.show_all = 1), ajax.post(nav.objLoc[0], o, {
            showProgress: uiSearch.showProgress.pbind("tlmd_search__input"),
            hideProgress: uiSearch.hideProgress.pbind("tlmd_search__input"),
            onDone: function(t) {
                val("tlmd_found_list", t), cur.tlmdRowsOpened = !1, removeClass("tlmd_search_toggle_all", "shown")
            }
        }), delete o.load, delete o.show_all, o[0] = nav.objLoc[0], nav.setLoc(o)
    },
    selectTag: function(t) {
        var e = ge("tlmd_search__input"),
            o = val(e);
        console.log(o.match("/(^| )#" + t + "($| )/"));
        var a = new RegExp("(^| )#" + t + "($| )");
        o = o.match(a) ? o.replace(a, " ") : o + " #" + t, val(e, trim(o)), Talmud.updateSearchString(o, null, !0), scrollToTop()
    },
    slideToggle: function(t) {
        var e = gpeByClass("tlmd_slide", t),
            o = !hasClass(e, "tlmd_slide_opened"),
            a = geByClass1("tlmd_slide_brick", e);
        toggleClass(e, "tlmd_slide_opened"), o ? (hide(a), slideDown(geByClass1("tlmd_slide_content", e), 500)) : (slideUp(geByClass1("tlmd_slide_content", e), 300), setTimeout(show.pbind(a), 300))
    },
    toggleTagsBar: function(t) {
        setCookie("remixtlmd_tags_bar", t, 365, !1), toggle("tlmd_tags_td", t), toggle("tlmd_search_show_tags", !t), toggleClass("tlmd_found_list", "tlmd_found_list_wide", !t)
    },
    savePostText: function(t) {
        for (var e = t, o = "", a = {}; e;) a["text" + o] = e.substring(0, 4e3), e = e.substring(4e3), o = "" === o ? "1" : parseInt(o) + 1;
        return a
    },
    savePost: function(t, e, o, a) {
        var l = {
            act: "save",
            id: t,
            hash: e,
            title: trim(val("tlmd_editor__title")),
            text: val("tlmd_editor__text"),
            keywords: val("tlmd_editor__keywords"),
            description: val("tlmd_editor__description"),
            fixed: isChecked("tlmd_editor__fixed") ? 1 : 0,
            wiki: isChecked("tlmd_editor__wiki") ? 1 : 0,
            section: cur.section,
            save_exit: a ? 1 : 0
        };
        if ("" == l.title) return notaBene("tlmd_editor__title"), !1;
        var r = Talmud.savePostText(l.text);
        each(r, function(t, e) {
            l[t] = e
        }), nav.objLoc.q && (l.q = nav.objLoc.q), cur.tlmdIgnoreDiff = !0, ajax.post("tlmd", l, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onFail: function() {
                cur.tlmdIgnoreDiff = !1
            }
        })
    },
    deletePost: function(t, e, o) {
        var a = showFastBox({
            title: getLang("support_tlmd_delete_title"),
            width: 430
        }, getLang("support_tlmd_delete_confirm"), getLang("global_delete"), function() {
            !o && nav.objLoc.q && (o = nav.objLoc.q), cur.tlmdIgnoreDiff = !0, ajax.post("tlmd?act=a_delete", {
                id: t,
                hash: e,
                q: o
            }, {
                progress: a.progress,
                onFail: function(t) {
                    return cur.tlmdIgnoreDiff = !1, a.hide(), showFastBox(getLang("global_error"), t), !0
                }
            })
        }, getLang("global_cancel"));
        return !1
    },
    showHistory: function(t, e, o) {
        return !showBox("tlmd", {
            act: "show_history",
            id: t,
            tlmd_id: e,
            hash: o
        }, {
            params: {
                width: 650
            }
        })
    },
    goToTag: function(t, e) {
        var o = ge("tlmd_search__input");
        o && (scrollToTop(), Talmud.setSearchString(o, t, e), cancelEvent(e))
    },
    checkSearchChanged: function(t, e, o, a) {
        var l = ge("tlmd_search__input");
        return void 0 !== t.q && e[0] == o[0] && e.act === o.act && l && (scrollToTop(), Talmud.setSearchString(l, t.q, null)), !0
    },
    showPreview: function(t) {
        var e = {
                act: "preview",
                text: val("tlmd_editor__text"),
                wiki: isChecked("tlmd_editor__wiki") ? 1 : 0
            },
            o = Talmud.savePostText(e.text);
        each(o, function(t, o) {
            e[t] = o
        }), ajax.post("tlmd", e, {
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t),
            onDone: function(t) {
                var e = ge("tlmd_editor_preview");
                val(e, t), hide("tlmd_history"), isVisible(e) || slideDown(e), scrollToY(getXY(e)[1])
            }
        })
    },
    toggleHistory: function() {
        hide("tlmd_editor_preview");
        var t = ge("tlmd_history"),
            e = !isVisible(t);
        slideToggle(t, 200), e && scrollToY(getXY(t)[1])
    },
    getPostData: function() {
        return {
            title: trim(val("tlmd_editor__title")),
            text: trim(val("tlmd_editor__text")),
            keywords: trim(val("tlmd_editor__keywords")),
            description: trim(val("tlmd_editor__description")),
            fixed: isChecked("tlmd_editor__fixed") ? 1 : 0,
            wiki: isChecked("tlmd_editor__wiki") ? 1 : 0
        }
    },
    checkPostChanged: function(t, e, o, a) {
        var l = Talmud.getPostData(),
            r = !1;
        if (cur.tlmdPostData && !cur.tlmdIgnoreDiff && (each(l, function(t, e) {
                return cur.tlmdPostData[t] != e ? (r = !0, !1) : void 0
            }), r)) {
            showFastBox(getLang("support_tlmd_ed_leave_title"), getLang("support_tlmd_ed_leave_text"), getLang("global_continue"), function() {
                delete cur.tlmdPostData, nav.go(o)
            }, getLang("global_cancel"));
            return !1
        }
    }
};
try {
    stManager.done("talmud.js")
} catch (e) {}