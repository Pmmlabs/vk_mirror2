var WkPoll = {
    init: function(l, o, e, r, a) {
        extend(cur, {
            wkPollOpts: o,
            wkPollParams: e,
            wkPollOpt: 0,
            wkPollInd: 0,
            wkPollGraph: !1,
            wkPollCriteria: {},
            wkPollCache: {},
            wkPollQuery: {},
            wkPollTabsWrap: ge("wk_poll_tabs_wrap"),
            wkPollTabs: ge("wk_poll_tabs"),
            wkPollStatsWrap: ge("wk_poll_stats_wrap"),
            wkPollDmgr: ge("wk_poll_dmgr"),
            wkPollFilters: a
        }), r && (cur.wkPollCache[r[0]] = [
            [r[1], r[2]],
            [r[3], r[4]]
        ], cur.wkPollQuery[r[0]] = extend({
            act: "poll_voters",
            post_raw: cur.wkPollParams.post_raw,
            opt_id: r[0]
        }, cur.wkPollCriteria), WkPoll.tab(r[0])), WkPoll.initEvents(l)
    },
    initEvents: function(l) {
        window.uiScrollBox && uiScrollBox.init(l, {
            onShow: function() {
                addEvent(boxLayerWrap, "scroll", WkPoll.scroll), setTimeout(WkPoll.scroll, 0)
            },
            onHide: function() {
                removeEvent(boxLayerWrap, "scroll", WkPoll.scroll)
            }
        }), WkPoll.initFilters(), addEvent(boxLayerWrap, "scroll", WkPoll.scroll), onBodyResize(), WkPoll.scroll()
    },
    initFilters: function() {
        var l = geByClass("_wk_poll_filter_dd", cur.wkPollDmgr);
        each(l, function() {
            var l = this.getAttribute("data-type"),
                o = l && cur.wkPollFilters[l];
            if (o) {
                var e = "city" == l ? o.types[cur.wkPollFilters.country.selected] : o.types;
                cur["wkPoll" + l + "DD"] = new InlineDropdown(this, {
                    items: e,
                    selected: o.selected,
                    withArrow: !0,
                    autoHide: 300,
                    onSelect: function(o) {
                        checkbox("wk_poll_extra_" + l, 1), WkPoll.updatedDemography(l)
                    }
                })
            }
        })
    },
    tab: function(l, o) {
        if (isVisible(cur.wkPollTabsWrap) && (!o || l)) {
            var e = geByClass1("summary_tab_sel", ge("wk_poll_tabs")),
                r = domPN(ge("wk_poll_opt" + l));
            r != e && (removeClass(e, "summary_tab_sel"), addClass(e, "summary_tab"), removeClass(r, "summary_tab"), addClass(r, "summary_tab_sel"));
            for (var a in cur.wkPollCache) "show" == cur.wkPollCache[a] && (cur.wkPollCache[a] = "load");
            if (l) {
                if (cur.wkPollCache[l] || (cur.wkPollCache[l] = []), cur.wkPollCache[l][0]) {
                    if ("load" != cur.wkPollCache[l][0]) return WkPoll.tabShow(l);
                    cur.wkPollCache[l][0] = "show"
                }
                cur.wkPollCache[l] = ["show"], cur.wkPollQuery[l] = extend({
                    act: "poll_voters",
                    post_raw: cur.wkPollParams.post_raw,
                    opt_id: l
                }, cur.wkPollCriteria), each(["country", "city", "age", "gender"], function(o, e) {
                    isChecked("wk_poll_extra_" + e) && (cur.wkPollQuery[l][e] = cur["wkPoll" + e + "DD"].val())
                }), ajax.post("al_wall.php", cur.wkPollQuery[l], {
                    showProgress: curBox().showCloseProgress,
                    hideProgress: curBox().hideCloseProgress,
                    onDone: function(o, e, r, a) {
                        var t = cur.wkPollCache[l][0];
                        t && (cur.wkPollCache[l] = [
                            [o, e],
                            [r, a]
                        ], "show" == t && WkPoll.tabShow(l))
                    },
                    onFail: function() {
                        return cur.wkPollCache[l] = cur.wkPollQuery[l] = !1, WkPoll.tab(0), !0
                    }
                })
            } else show("wk_poll_stats", "wk_poll_stats_total", "wk_poll_dmgr"), hide("wk_poll_people"), cur.wkPollOpt = 0, WkPoll.update()
        }
    },
    tabLoaded: function() {
        var l = cur.wkPollOpt,
            o = cur.wkPollInd;
        if (!cur.wkPollCache[l][o + 1]) {
            if (cur.wkPollQuery[l].offset = cur.wkPollCache[l][o][1], !cur.wkPollQuery[l].offset) return hide("ui_voters_load_more");
            cur.wkPollCache[l][o + 1] = "load", ajax.post("al_wall.php", cur.wkPollQuery[l], {
                onDone: function(l, o) {
                    var e = cur.wkPollOpt,
                        r = cur.wkPollInd,
                        a = cur.wkPollCache[e][r + 1];
                    cur.wkPollCache[e] && cur.wkPollCache[e][r] && cur.wkPollCache[e][r][1] && (cur.wkPollCache[e][r + 1] = [l, o], "show" == a && WkPoll.more())
                }
            })
        }
    },
    tabShow: function(l) {
        cur.wkPollOpt = l, cur.wkPollInd = 0, hide("wk_poll_stats", "wk_poll_stats_total", "wk_poll_dmgr"), show("wk_poll_people"), val("wk_poll_people", cur.wkPollCache[l][0][0]), WkPoll.update(), cur.wkPollQuery[l].offset = cur.wkPollCache[l][0][1], WkPoll.tabLoaded()
    },
    update: function() {
        if (isVisible(cur.wkPollTabsWrap) && isVisible(cur.wkPollTabs)) {
            var l = getXY(cur.wkPollTabsWrap, !0)[1];
            0 > l && (boxLayerWrap.scrollTop += l + 1)
        }
        WkPoll.scroll()
    },
    graph: function() {
        cur.wkPollGraph || (addClass(cur.wkPollTabs, "wk_poll_graph_tabs"), WkPoll.updateTabsSize(), WkPoll.update(), cur.wkPollGraph = !0, WkPoll.updateDemography(function() {
            hide("wk_poll_show_graph", "wk_poll_stats"), show("wk_poll_hide_graph", "wk_poll_graph")
        }))
    },
    graphUpdate: function(criteria, callback) {
        var cont = ge("wk_poll_graph");
        ajax.post("wkview.php", extend({
            act: "voting_common_graph"
        }, cur.wkPollOpts, criteria || {}), {
            onDone: function(html, js, options) {
                var size = getSize(cont);
                size[1] -= intval(getStyle(cont, "paddingTop")) + intval(getStyle(cont, "paddingBottom")), size[1] > 200 && setStyle(cont, {
                    height: size[1]
                }), cont.innerHTML = html, eval(js), callback && callback(options)
            },
            showProgress: curBox().showCloseProgress,
            hideProgress: curBox().hideCloseProgress
        })
    },
    graphFilter: function(l, o, e) {
        var r = geByClass1("summary_tab_sel", ge("wk_poll_graph_tabs")),
            a = domPN(l);
        a != r && (removeClass(r, "summary_tab_sel"), addClass(r, "summary_tab"), removeClass(a, "summary_tab"), addClass(a, "summary_tab_sel")), cur.wkPollCriteria.percent = o, cur.wkPollCriteria.amount = e, WkPoll.updateDemography()
    },
    graphHide: function() {
        show("wk_poll_show_graph", "wk_poll_stats"), hide("wk_poll_hide_graph", "wk_poll_graph"), removeClass(cur.wkPollTabs, "wk_poll_graph_tabs"), WkPoll.updateTabsSize(), cur.wkPollGraph = !1
    },
    updatedDemography: function(l) {
        if (cur.wkPollCache = {}, clearTimeout(cur.wkPollUpdateTO), cur.wkPollUpdateTO = setTimeout(WkPoll.updateDemography, 500), "country" == l) {
            var o = !1,
                e = !1,
                r = 0;
            if (isChecked("wk_poll_extra_country")) {
                var a = cur.wkPollcountryDD.val(),
                    t = cur.wkPollFilters.city.types[a];
                t && each(t, function() {
                    r++, o || e || (o = this[0], e = this[1])
                }), r >= 1 && (cur.wkPollcityDD.setItems(t), cur.wkPollcityDD.val(o)), 1 == r && val("wk_poll_filter_city_name", e), toggleClass("wk_poll_filter_city_wrap", "wk_poll_filter_name", 1 >= r)
            }
            toggle("wk_poll_extra_city", r), checkbox("wk_poll_extra_city", 0)
        }
    },
    getDdLabel: function(l, o) {
        var e = "";
        return each(l, function() {
            return this[0] == o ? (e = this[1], !1) : void 0
        }), e
    },
    updateDemography: function(l) {
        var o = clone(cur.wkPollCriteria);
        each(["country", "city", "age", "gender"], function(l, e) {
            isChecked("wk_poll_extra_" + e) && (o[e] = cur["wkPoll" + e + "DD"].val())
        });
        var e = function(e) {
            var r = e.total;
            if (each(e.options, function(l, o) {
                    var e = ge("wk_poll_row" + l);
                    setStyle(geByClass1("page_poll_percent", e), {
                        width: o.width + "%"
                    }), val(geByClass1("page_poll_row_percent", e), o.percent + "%"), val(geByClass1("page_poll_row_count", e), o.count), ge("wk_poll_usrs" + l) && val("wk_poll_usrs" + l, o.people)
                }), r) {
                var a = cur.wkPollParams.lang.wall_X_people_voted_X,
                    t = langNumeric(r, a, !0),
                    c = "";
                if (o.country) {
                    var s = o.city ? cur.wkPollFilters.city.types[o.country] : cur.wkPollFilters.country.types,
                        i = o.city || o.country,
                        w = WkPoll.getDdLabel(s, i);
                    c += cur.wkPollParams.lang.wall_X_people_voted_from.replace("%s", w)
                }
                if (o.age) {
                    var u = WkPoll.getDdLabel(cur.wkPollFilters.age.types, o.age);
                    u && (c += cur.wkPollParams.lang.wall_X_people_voted_by_age.replace("%s", u))
                }
                o.gender && (c += " " + cur.wkPollParams.lang["wall_voted_gender_" + intval(o.gender)]), t = t.replace(/%s|{criteria}/, c)
            } else var t = cur.wkPollParams.lang.wall_X_people_voted_empty;
            ge("wk_poll_total").innerHTML != t && animate(ge("wk_poll_total"), {
                opacity: 0
            }, 100, function() {
                ge("wk_poll_total").innerHTML = t, animate(ge("wk_poll_total"), {
                    opacity: 1
                }, 100)
            }), l && l()
        };
        cur.wkPollGraph ? WkPoll.graphUpdate(o, e) : ajax.post("wkview.php", extend({
            act: "voting_common_demography"
        }, cur.wkPollOpts, o), {
            onDone: e
        })
    },
    more: function() {
        var l = cur.wkPollOpt,
            o = cur.wkPollInd,
            e = cur.wkPollCache[l][o + 1];
        if (lockButton("ui_voters_load_more"), !e) return WkPoll.tabLoaded();
        if ("load" == e || "show" == e) return void(cur.wkPollCache[l][o + 1] = "show");
        for (var r = ce("div", {
                innerHTML: e[0]
            }), a = ge("wk_poll_people_rows"); domFC(r);) a.appendChild(domFC(r));
        ++cur.wkPollInd, unlockButton("ui_voters_load_more"), e[1] ? WkPoll.tabLoaded() : hide("ui_voters_load_more")
    },
    updateTabsSize: function() {
        setStyle(cur.wkPollTabsWrap, "height", cur.wkPollTabs.offsetHeight), setStyle(cur.wkPollTabs, "width", intval(getStyle(cur.wkPollTabs, "width")))
    },
    scroll: function() {
        cur.wkPollOpt && isVisible("ui_voters_load_more") && getXY("ui_voters_load_more", !0)[1] < lastWindowHeight && WkPoll.more(), isVisible(cur.wkPollTabs) && (getXY(cur.wkPollTabsWrap, !0)[1] < 0 ? cur.wkPollFixed || (WkPoll.updateTabsSize(), addClass(cur.wkPollTabs, "wk_poll_fixed"), cur.wkPollFixed = !0) : cur.wkPollFixed && (removeClass(cur.wkPollTabs, "wk_poll_fixed"), cur.wkPollFixed = !1))
    },
    vote: function(l, o) {
        addClass(l, "on");
        var e = curBox(),
            r = e && e.wkRaw,
            a = geByClass1("progress", l);
        ajax.post("widget_poll.php", extend({
            act: "a_vote",
            no_widget: 1,
            wkpoll: 1
        }, o), {
            onDone: function(l) {
                e.hide(), showWiki({
                    w: r
                }, !1, null)
            },
            showProgress: addClass.pbind(a, "progress_inline"),
            hideProgress: removeClass.pbind(a, "progress_inline")
        })
    },
    exportBox: function() {
        showBox("al_voting.php", extend({
            act: "export_box"
        }, cur.wkPollOpts)), boxLayerWrap.scrollTop = 0
    },
    backToBox: function() {
        if (cur.pollBack && window.WkView) {
            var l = WkView.initWkBox("", "", {
                wkRaw: cur.pollBack.wkRaw
            });
            domPN(l.bodyNode).replaceChild(cur.pollBack.body, l.bodyNode), l.bodyNode = cur.pollBack.body, l.setOptions(cur.pollBack.options), boxLayerWrap.scrollTop = cur.pollBack.scroll, onBodyResize(), delete cur.pollBack
        }
    },
    beforePhotoShow: function() {
        var l = curBox();
        extend(cur, {
            pollBack: {
                body: l.bodyNode,
                wkRaw: l.wkRaw,
                options: l.getOptions(),
                scroll: boxLayerWrap.scrollTop
            }
        })
    }
};
try {
    stManager.done("wkpoll.js")
} catch (e) {}