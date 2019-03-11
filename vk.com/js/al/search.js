var slide_show = function(e) {
        isVisible(e) || slideDown(e, 150)
    },
    slide_hide = function(e) {
        isVisible(e) && slideUp(e, 150)
    },
    searcher = {
        getSectionParams: function(e) {
            var s = ge("filter_form"),
                t = {};
            for (var r in (t = !s || e && e != cur.section || "quick" == cur.section ? {
                    "c[section]": e || cur.section
                } : serializeForm(s) || {})["c[q]"] = val("search_query"), t) t[r] && "0" != t[r] || delete t[r], "-1" == t[r] && t[r + "_custom"] ? (t[r] = t[r + "_custom"], delete t[r + "_custom"]) : t[r + "_custom"] && delete t[r + "_custom"];
            return "video" != cur.section || t["c[sort]"] || (t["c[sort]"] = "0"), "people" == cur.section && ge("photo") && !t["c[photo]"] && (t["c[photo]"] = "0"), "people" == cur.section && t["c[invite]"] && delete t.from, "communities" != cur.section || !cur.filtersShown || t["c[q]"] || t["c[category]"] || (t["c[skip_catalog]"] = "1"), t
        },
        sameParams: function(e) {
            if (!cur.params) return !1;
            for (var s in e)
                if (e[s] != cur.params[s]) return !1;
            for (var s in cur.params)
                if (e[s] != cur.params[s]) return !1;
            return !0
        },
        switchSection: function(e, s, t) {
            if (t && checkEvent(t)) return !0;
            s = s || {}, "communities" == e && (val("c[category]", 0), cur.filtersShown = !1);
            var r = searcher.getSectionParams(e);
            if ("auto" != e && "quick" != e && s.updateStats && (r.swt = 1), s.tab && (r.tab = 1), ge("search_menu") && uiRightMenu) {
                var i = geByClass1("search_menu_" + e, "search_menu");
                i && uiRightMenu.switchMenu(i)
            }
            return searcher.setSection(e), searcher.sendSearchReq(r, !0), hasClass(gpeByClass("ui_search", "search_query"), "ui_search_fixed") && scrollToTop(), !1
        },
        switchAudioTop: function(e) {
            return cur.useRec = e, cur.audioTop = e, this.switchSection("audio")
        },
        showMedia: function(e, s, t) {
            return (!t || !checkEvent(t)) && (hide(geByClass1("label", s)), show(geByClass1("progress", s)), cur.loadingMedia = !0, searcher.switchSection(e, {
                updateStats: !0
            }, t))
        },
        updResults: function() {
            if (cur.customSearchChange) return cur.customSearchChange(), !1;
            var e = searcher.getSectionParams();
            if (searcher.sameParams(e) || "video" == e["c[section]"] && !e["c[q]"] && !nav.objLoc["c[q]"]) return !1;
            cur.onSearchChange && cur.onSearchChange(e), searcher.sendSearchReq(e, ("auto" == cur.section || "audio" == cur.section && e["c[q]"] && !ge("audio_lyrics_filter") || "audio" == cur.section && !e["c[q]"] && ge("audio_lyrics_filter")) && !e.offset), hasClass(gpeByClass("ui_search", "search_query"), "ui_search_fixed") && scrollToTop()
        },
        onInputChange: function(e) {
            clearTimeout(cur.requestTimeout), !e || "keydown" == e.type && 13 != e.keyCode ? cur.requestTimeout = setTimeout(function() {
                searcher.updResults()
            }, 1e3) : searcher.updResults()
        },
        onKey: function() {
            "quick" == cur.section && (clearTimeout(cur.requestTimeout), cur.requestTimeout = setTimeout(function() {
                searcher.updResults()
            }, 300))
        },
        onEnter: function(e, s) {
            window.iSearch && iSearch.select && iSearch.select.isVisible() && -1 < iSearch.select.active || (clearTimeout(cur.requestTimeout), searcher.updResults(), searcher.highlightHotHashtag(s))
        },
        checkbox: function(e, s, t, r) {
            checkbox(e);
            var i = isChecked(e) ? 1 : 0;
            t && (i = 1 - i), val(s, i), r || searcher.updResults()
        },
        sendSearchReq: function(n, u) {
            if (cur.searchReq) try {
                cur.searchReq.abort()
            } catch (e) {
                debugLog(e)
            }
            u && !n.offset && (vk.no_ads = inArray(n["c[section]"], ["audio"]), extend(n, {
                uf: 1
            })), void 0 !== cur.useRec && (n.rec = cur.useRec, delete cur.useRec), n.edit = nav.objLoc.edit, n.sign = nav.objLoc.sign, n.all = nav.objLoc.all, n.change = 1, cur.searchLoc && (n.search_loc = cur.searchLoc), void 0 !== cur.topType && (n.type = cur.topType, delete cur.topType), window.iSearch && iSearch.select && (iSearch.select.hide(), delete cur.setISearch), cur.loadingMedia || (uiSearch.showProgress("search_query"), ge("search_query").ignoreFixed = "statuses" == n["c[section]"]);
            var l = +new Date;
            cur.searchReq = ajax.post("al_search.php", n, {
                onDone: function(e, s, t) {
                    var r = n.uf && ge("results_wrap") ? ge("results_wrap") : ge("results"),
                        i = ge("friends_filters_block") ? ge("friends_filters_block") : ge("filter_form");
                    if (r.innerHTML = s || "", u && (i.innerHTML = t || "", elfocus("search_query"), e.loc)) {
                        var c = locProtocol + "//" + location.host + "/" + e.loc,
                            o = document.URL == c ? "" : document.URL;
                        setTimeout(updateOtherCounters.pbind(c, o), 10)
                    }
                    searcher.applyOptions(e, u), uiSearch.hideProgress("search_query"), show("search_clear_params");
                    var a = window.audioPlayer;
                    a && a.showCurrentTrack && a.showCurrentTrack(), cur.onSearchFinish && cur.onSearchFinish(), shortCurrency(), setTimeout(checkPageBlocks, 200), cur.onSearchDone && cur.onSearchDone(), saveSearchAttemptStats("friends" === cur.module ? "friends_find" : "search_" + cur.section, l, !isVisible(ge("no_results")))
                },
                onFail: function() {
                    return uiSearch.hideProgress("search_query"), !0
                },
                showProgress: function() {
                    addClass(ge("filter_" + cur.section), "loading"), cur.isSearchLoading = !0
                },
                hideProgress: function() {
                    removeClass(ge("filter_" + cur.section), "loading"), cur.isSearchLoading = !1, cur.loadingMedia = !1
                },
                ads: !(!u || n.offset)
            })
        },
        setSection: function(e) {
            e != cur.section && "auto" != e && e && (cur.section = e)
        },
        applyOptions: function(options, changeSection) {
            iSearch.initSelect(), searcher.setSection(options.section), options.reply_names && (extend(cur.options.reply_names, options.reply_names), delete options.reply_names), extend(cur, options), cur.params = searcher.getSectionParams();
            var header = ge("search_header");
            if (options.tabs) val("search_tabs_wrap", options.tabs), hide(header), show("search_tabs_wrap");
            else if (options.title) {
                var header_inner = geByClass1("_header_inner", header);
                val(header_inner, options.title), options.summary && header_inner.appendChild(ce("span", {
                    className: "page_block_header_count",
                    innerHTML: langNumeric(options.summary, "%s", !0)
                })), hide("search_tabs_wrap"), show(header)
            }
            if (null != options.controls && val(geByClass1("_header_extra", header), options.controls || ""), void 0 !== options.auto_rows && ge("search_auto_rows") && (ge("search_auto_rows").innerHTML = options.auto_rows || ""), clearTimeout(cur.setLocTO), options.loc)
                if (changeSection) try {
                    nav.setLoc(options.loc)
                } catch (e) {
                    debugLog(e)
                } else cur.setLocTO = setTimeout(function() {
                    if ("search" == nav.objLoc[0] || "communities" == nav.objLoc[0] || "brands" == nav.objLoc[0] || nav.objLoc[0].match(/^people($|\/)/) || cur.searchLoc) try {
                        nav.setLoc(options.loc)
                    } catch (e) {
                        debugLog(e)
                    }
                }, 100);
            if (options.htitle && setDocumentTitle(replaceEntities(stripHTML(options.htitle))), void 0 !== options.q) {
                val("search_query", replaceEntities(stripHTML(options.q)) || "");
                var reset_el = ge("search_clear_params");
                reset_el && show(reset_el)
            }
            cur.uiSort && void 0 !== options.sortHide && (options.sortHide && cur.uiSort.selectItem(0, !1), cur.uiSort.disable(options.sortHide)), "auto" == cur.section && show(geByClass1("search_menu_auto", "search_menu")), options.script && eval(options.script);
            var res = ge("results"),
                sc = ge("search_content"),
                lighted = hasClass(sc, "highlight");
            res.className = "search_results search_" + cur.section + "_results" + ("statuses" == cur.section || "auto" == cur.section ? " wall_module" : "") + ("statuses" == cur.section && "" !== options.summary || gpeByClass("page_block", res) ? "" : " page_block") + " mark_top_verified", "audio" === cur.section && (res.className += " audio_w_covers"), lighted && addClass(sc, "highlight");
            var more_results = ge("search_more_results");
            cur.has_more || more_results && more_results.firstChild ? (hide("seach_pages"), show("ui_search_load_more")) : hide("ui_search_load_more")
        },
        selectHotHashtag: function(e) {
            var s = val(e),
                t = ge("search_query"),
                r = (data(t, "opts") || {}).onEnter;
            return val(t, s), r && r(t, s), statlogsValueEvent("top_hashtag_search", 0, "click"), !1
        },
        highlightHotHashtag: function(t) {
            t = t ? t.toLowerCase() : "";
            var r = !1,
                e = geByClass("search_hot_hashtags_item", "search_hot_hashtags");
            return each(e, function(e, s) {
                val(s).toLowerCase() == t ? (r = !0, addClass(s, "search_hot_hashtags_item_active")) : removeClass(s, "search_hot_hashtags_item_active")
            }), r
        },
        toggleFilter: function(e, s, t) {
            hasClass(e, "search_filter_shut") || !isVisible(s) ? (addClass(e, "search_filter_open"), removeClass(e, "search_filter_shut"), slideDown(s, 200, function() {
                checkPageBlocks(), t && t()
            })) : slideUp(s, 200, function() {
                addClass(e, "search_filter_shut"), removeClass(e, "search_filter_open"), t && t()
            })
        },
        switchFilter: function(e, s, t) {
            if (checkEvent(t)) return !1;
            ge("c[" + e + "]") && (ge("c[" + e + "]").value = s), "video" == cur.section && "quality" == e && ge("c[hd]") && (ge("c[hd]").value = s < 0 ? 0 : 1), searcher.updResults()
        },
        appendElements: function(e) {
            if (e) {
                for (; e.firstChild;) e.parentNode.insertBefore(e.firstChild, e);
                re(e)
            }
        },
        showMore: function() {
            var t = ge("ui_search_load_more"),
                e = ge("search_more_results");
            if (t && isVisible(t) && !cur.isSearchLoading)
                if (e && searcher.appendElements(e), cur.has_more) {
                    cur.disableAutoMore = !1, cur.isSearchLoading = !0, lockButton(t);
                    var s = searcher.getSectionParams();
                    s.offset = cur.offset, s.qid = cur.qid, s.edit = nav.objLoc.edit, s.sign = nav.objLoc.sign, s.all = nav.objLoc.all, ajax.post("al_search.php", s, {
                        onDone: function(e, s) {
                            cur.isSearchLoading = !1, s && (ge("no_results") && re("no_results"), ge("results").insertBefore(ce("div", {
                                innerHTML: s,
                                id: "search_more_results"
                            }), t)), unlockButton(t), searcher.applyOptions(e), searcher.scrollCheck()
                        },
                        cache: "audio" != s["c[section]"] || s["c[q]"] ? 1 : 0
                    })
                } else hide(t);
            else e && searcher.appendElements(e)
        },
        close: function() {
            return nav.go(cur.search_return_to, {}, {
                back: !0
            })
        },
        toggleMinimizedFilters: function(e, s, t) {
            var r = e && domNS(e),
                i = t ? 0 : 200;
            return void 0 === s && (s = !isVisible(r)), !s && isVisible(r) ? (cur.filtersShown = !1, removeClass(e, "ui_rmenu_item_expanded"), slideUp(r, i)) : s && !isVisible(r) && (cur.filtersShown = !0, val("c[category]", 0), addClass(e, "ui_rmenu_item_expanded"), slideDown(r, i)), !1
        },
        onCommunitiesToggle: function() {
            "search" == cur.module && (uiRightMenu.switchMenu(geByClass1("search_menu_" + cur.section, "search_menu")), searcher.updResults())
        },
        subscribe: function(e, s, t, r, i, c, o) {
            var a, n, u = gpeByClass("search_row", e);
            if (cur.unsubscribed = cur.unsubscribed || {}, !r && c && !cur.unsubscribed[s]) {
                var l = showFastBox({
                    title: getLang("global_warning"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang(c), getLang("search_group_leave"), function() {
                    l.hide(), searcher.subscribe(e, s, t, r, i)
                }, getLang("global_cancel"));
                return !1
            }
            n = r ? (a = "al_feed.php", {
                act: "subscr",
                oid: s,
                hash: t,
                from: i || "search",
                ref: cur.module
            }) : (a = "al_fans.php", {
                act: "unsub",
                oid: s,
                hash: t,
                from: "search",
                ref: cur.module
            }), ajax.post(a, n, {
                onDone: function() {
                    o ? toggleClass(u, "touched", !!r) : (toggle("search_sub" + s, !r), toggle("search_unsub" + s, !!r)), r || (cur.unsubscribed[s] = 1)
                },
                onFail: function(e) {
                    if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                },
                showProgress: function() {
                    o ? (e.tt && e.tt.destroy(), addClass(u, "loading")) : lockButton(e)
                },
                hideProgress: function() {
                    o ? removeClass(u, "loading") : unlockButton(e)
                }
            })
        },
        onResize: function() {
            searcher.scrollCheck()
        },
        scrollCheck: function() {
            if (!(browser.mobile || cur.isSearchLoading || cur.disableAutoMore)) {
                var e = ge("ui_search_load_more");
                if (isVisible(e)) {
                    var s = document.documentElement,
                        t = window.innerHeight || s.clientHeight || bodyNode.clientHeight;
                    scrollGetY() + t + 200 > e.offsetTop && searcher.showMore()
                } else {
                    var r = ge("search_more_results");
                    r && searcher.appendElements(r)
                }
            }
        },
        init: function(e) {
            var s = globalHistory.length;
            s && globalHistory[s - 1] && globalHistory[s - 1].loc.indexOf("search") ? cur.search_return_to = globalHistory[s - 1].loc : cur.search_return_to = "/", hide("header");
            var t = ge("search_query");
            (t && data(t, "opts") || {}).isNew || (iSearch.destroy(), vk.id && iSearch.init(t)), elfocus(t), "search" == nav.objLoc[0] && (extend(cur, {
                oid: e.user_id,
                module: "search"
            }), cur.nav.push(function(e, s, t) {
                if (void 0 !== e[0] || cur.searchLoc && void 0 !== e.act) return clearTimeout(cur.setLocTO), void(nav.strLoc != cur.loc && cur.loc && hab.setLoc(cur.loc));
                if (cur.searchLoc) {
                    var r = !1;
                    for (var i in t)
                        if ("c[" == i.substr(0, 2)) {
                            r = !0;
                            break
                        }
                    if (cur.onLocationChange && cur.onLocationChange(r), !r) return !0
                }
                var c = clone(t);
                delete c[0];
                var o = c["c[section]"] || c.section || "quick";
                return ge("search_menu") && uiRightMenu && uiRightMenu.switchMenu(geByClass1("search_menu_" + o, "search_menu")), searcher.setSection(o), searcher.sendSearchReq(c, !0), !1
            })), cur.options || (cur.options = {
                reply_names: {}
            }), extend(cur.options, e), searcher.applyOptions(e), t.ignoreFixed = "statuses" == cur.section, window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0, addEvent(window, "scroll", searcher.scrollCheck), addEvent(window, "resize", searcher.onResize), setTimeout(searcher.scrollCheck, 50), setTimeout(checkPageBlocks, 200);
            var r = window.audioPlayer;
            r && r.showCurrentTrack && r.showCurrentTrack(), cur._back = {
                text: getLang("search_back_to"),
                show: [function() {
                    hide("header");
                    var e = globalHistory.length;
                    e && globalHistory[e - 1] && globalHistory[e - 1].loc.indexOf("search") && (cur.search_return_to = globalHistory[e - 1].loc), addEvent(window, "scroll", searcher.scrollCheck), addEvent(window, "resize", searcher.onResize), iSearch.destroy(), vk.id && iSearch.init(ge("search_query"))
                }],
                hide: [function() {
                    removeEvent(window, "scroll", searcher.scrollCheck), removeEvent(window, "resize", searcher.onResize), iSearch.destroy()
                }]
            }
        }
    },
    Searcher = searcher;
void 0 === window.iSearch && (iSearch = {
    init: function(e, s) {
        if (!this.inited) {
            this.inited = !0, this.input = e, this.cont = e.parentNode.parentNode;
            var t = ce("div", {
                className: "results_container",
                innerHTML: '<div class="result_list"></div>'
            });
            this.cont.appendChild(t), this.resultList = geByClass("result_list", t)[0], hide(this.resultList), browser.chrome && (this.resultList.style.opacity = 1), this.resultList.style.width = t.style.width = "552px", this.onShowCallback = !!s && s.onShow, this.initSelect(s), addEvent(e, "keyup click mouseup", this.inputUpHandler), addEvent(document, "click", this.documentClick), addEvent(e, "keypress keydown", this.inputDownHandler), setTimeout(function() {
                cur.params && cur.params["c[q]"] && saveSearchAttemptStats("friends" === cur.module ? "friends_find" : "search_" + cur.section, 0, !isVisible(ge("no_results")))
            }, 0), ge("top_search") && (ge("top_search").onclick = function(e) {
                return hab.getLoc().indexOf("search") ? nav.go("search", e, {
                    search: !0
                }) : (window.searcher && searcher.close(), !1)
            })
        }
    },
    inputUpHandler: function(e) {
        var s = iSearch;
        if (s.select) {
            if ((s.select.isVisible() && -1 < s.select.active || cur.preventISRequest) && (delete cur.preventISRequest, inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN]))) return cancelEvent(e);
            clearTimeout(cur.requestTimeout);
            var t = val(s.input);
            s.currentTerm = t;
            var r = cur.section;
            t ? cur.requestTimeout = setTimeout(function() {
                cur.setISearch = !0, ajax.post("/hints.php?act=a_gsearch_hints", {
                    q: t,
                    section: r
                }, {
                    onDone: function(e) {
                        s.currentTerm == t && cur.setISearch && s.showSelectList(t, e), delete cur.setISearch
                    },
                    cache: 1
                })
            }, 300) : s.select.hide()
        }
    },
    documentClick: function() {
        var e = iSearch;
        e.select && e.select.hide()
    },
    inputDownHandler: function(e) {
        var s = iSearch;
        if (s.select) {
            if (!s.select || s.select.active < 0) return e.keyCode == KEY.RETURN && s.select && (cur.preventISRequest = !0, s.select.hide()), !0;
            if (e.keyCode == KEY.SPACE || (e.keyCode == KEY.RETURN || 10 == e.keyCode) && s.select && s.select.isVisible()) {
                var t, r = s.select.list.childNodes[s.select.active],
                    i = r ? r.getAttribute("val") : "";
                if (each(s.lastItems, function() {
                        this[0] == i && (t = this)
                    }), !t) return;
                return val(s.input, t[3] + (e.keyCode == KEY.SPACE ? " " : "")), elfocus(s.input, s.input.length), e.keyCode != KEY.SPACE && (cur.preventISRequest = !0, s.select.hide(), searcher.updResults()), cancelEvent(e)
            }
            return e.keyCode != KEY.RETURN && 10 != e.keyCode || !s.select || !s.select.isVisible() || (triggerEvent(document, e.type, e), cancelEvent(e))
        }
    },
    initSelect: function(e) {
        if (!this.select && window.Select && window._ui && this.resultList) {
            this.guid = _ui.reg(this);
            var s = this;
            this.select = new Select(this.resultList, {
                selectFirst: !1,
                onItemSelect: this.onItemSelect.bind(this),
                onShow: function() {
                    return isFunction(s.onShowCallback) && s.onShowCallback(), _ui.sel(s.guid)
                },
                onHide: _ui.sel.pbind(!1),
                cycle: !0
            }), this.select.hide()
        }
    },
    showSelectList: function(e, s) {
        this.select && ((s = isArray(s) && s.length ? s : []).length ? (this.select.clear(), this.lastItems = s, this.select.content(s), this.select.show(), isFunction(this.onShowCallback) && this.onShowCallback()) : this.select.hide())
    },
    onItemSelect: function(e) {
        var s;
        if (this.select && (this.select.hide(), each(this.lastItems, function() {
                this[0] == e && (s = this)
            }), s)) {
            var t = ce("div", {
                innerHTML: s[3]
            });
            val(this.input, t.innerText || t.textContent), this.input.blur(), searcher.updResults()
        }
    },
    onEvent: function(e) {
        e.type == (browser.opera || browser.mozilla ? "keypress" : "keydown") && this.select.handleKeyEvent(e)
    },
    destroy: function(e) {
        cleanElems(this.resultList), clearTimeout(e ? e.requestTimeout : cur.requestTimeout), removeEvent(this.input, "keyup click mouseup", this.inputUpHandler), removeEvent(document, "click", this.documentClick), removeEvent(this.input, "keypress keydown", this.inputDownHandler), this.select && (this.select.destroy(), delete this.select), this.resultList && re(this.resultList.parentNode), delete this.lastItems, this.inited = !1
    },
    updateResultsList: function(e) {
        e ? e += "px" : e = hasClass(ge("search_query_wrap"), "wide") ? "512px" : "451px", this.resultList.style.width = e
    }
}), window.searchActions = {
    peopleMessage: function(e) {
        showWriteMessageBox(window.event || {}, e)
    },
    peopleAction: function(s, e, t) {
        ajax.post(e, t, {
            onDone: function(e) {
                s.parentNode.replaceChild(ce("span", {
                    innerHTML: e
                }).firstChild, s)
            }
        })
    },
    ownerAction: function(s, e, t) {
        ajax.post(e, t, {
            onDone: function(e) {
                s.parentNode.innerHTML = e
            }
        })
    },
    groupAction: function(t, e, s, r, i) {
        ajax.post("al_groups.php", {
            act: "member_action",
            action: e,
            gid: s,
            mid: r,
            hash: i,
            context: "search"
        }, {
            onDone: function(e) {
                t.parentNode.replaceChild(ce("span", {
                    innerHTML: e
                }).firstChild, t);
                var s = _tbLink.loc;
                s && globalHistoryDestroy(s)
            }
        })
    },
    inviteToGroup: function(t, s, r, i, e) {
        var c = function(e) {
            link = e ? '<button class="flat_button button_small button_wide search_btn_invite secondary" onclick="return searchActions.inviteToGroup(this, ' + s + ", " + r + ", '" + i + "', 1)\">" + getLang("search_cancel_invitation") + "</button>" : '<button class="flat_button button_small button_wide search_btn_invite" onclick="return searchActions.inviteToGroup(this, ' + s + ", " + r + ", '" + i + "', 0)\">" + getLang("search_send_invitation") + "</button>", t.parentNode.replaceChild(se(link), t)
        };
        return e ? ajax.post("/al_page.php", {
            act: "a_cancel_invite",
            mid: r,
            gid: s,
            hash: i
        }, {
            onDone: function(e) {
                c(0)
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        }) : ajax.post("/al_page.php", {
            act: "a_invite",
            mid: r,
            gid: s,
            hash: i
        }, {
            onDone: function(e, s) {
                e ? c(1) : (showMsg(gpeByClass("people_row", t), s, "msg"), hide(t))
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        }), !1
    },
    showLyrics: function(e, s, t) {
        var r = ge("lyrics" + e);
        r ? isVisible(r) ? hide(r) : show(r) : (r = ce("div", {
            id: "lyrics" + e,
            className: "audio_lyrics_wrap",
            innerHTML: '<div class="loading"></div>'
        }), ge("audio" + e).appendChild(r), ajax.post("/al_audio.php", {
            act: "get_lyrics",
            lid: s,
            aid: e,
            top: t
        }, {
            onDone: function(e) {
                r.innerHTML = '<div class="audio_lyrics ta_l">' + e + "</div>"
            }
        }))
    },
    toggleBanInGroup: function(e, s, t, r) {
        showBox("/groupsedit.php", {
            act: "bl_edit",
            name: "id" + s,
            gid: t
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    },
    addCommunity: function() {
        showBox("al_search.php", {
            act: "suggest_community"
        }, {
            params: {
                bodyStyle: "padding: 20px;",
                dark: 1
            },
            onFail: function(e) {
                return e && showDoneBox("<b>" + e + "</b>"), !0
            }
        })
    },
    selectCategory: function(e, s, t) {
        ge("c[category]").value = s, e && hasClass(e, "_ui_rmenu_subitem") && uiRightMenu.switchMenu(e);
        var r = ge("search_query");
        return val(r) && (val(r, ""), r.focus(), triggerEvent(r, "keyup")), searcher.toggleMinimizedFilters(ge("search_filters_minimized"), !1), searcher.updResults(), !1
    },
    searchUnchooseGeoPoint: function() {
        var e = ge("search_status_map"),
            s = ge("search_status_map_delete_wrap");
        removeClass(e, "search_status_map_selected"), setStyle(e, {
            backgroundImage: ""
        }), s && s.tt && s.tt.hide && s.tt.hide(), val("search_status_map_hidden", ""), searcher.updResults()
    },
    chooseGeoPoint: function(e, s, t, r) {
        var i = 0;
        each([8, 11, 14, 17, 20], function(e, s) {
            if (t <= s) return !1;
            i = e
        }), boxQueue.hideLast();
        new Array(i + 1).join("+");
        var c = Math.pow(10, 10),
            o = 200,
            a = 120;
        2 <= window.devicePixelRatio && (o *= 2, a *= 2), e = Math.round(e * c) / c, s = Math.round(s * c) / c;
        var n = ge("search_status_map");
        addClass(n, "search_status_map_selected"), setStyle(n, {
            backgroundImage: "url(/maps?lat=" + e + "&lng=" + s + "&z=" + t + "&w=" + o + "&h=" + a + ")"
        }), r || (val("search_status_map_hidden", e + "," + s + "," + t), searcher.updResults())
    },
    searchChooseGeoPoint: function() {
        var e = {
                act: "a_choose_place_box",
                search: 1
            },
            s = val("search_status_map_hidden").match(/(\-?\d{1,3}(?:\.\d+)?)\,(\-?\d{1,3}(?:\.\d+)?)(?:\,(\d+))?/);
        s && (e.lat = floatval(s[1]), e.lon = floatval(s[2]), e.zoom = s[3] || 8), showBox("/al_places.php", e), cur.chooseGeoPoint = searchActions.chooseGeoPoint
    },
    searchUrlOnChange: function(e, s, t) {
        var r = ge("search_status_url"),
            i = r.name,
            c = s ? "c[domain]" : "c[url]";
        return radiobtn(e, s, "search_status_hint_domain"), elfocus(r), val(r) && c != i && (r.name = c, searcher.updResults()), cancelEvent(t)
    },
    onChangeCommunityType: function(e) {
        e = positive(e), val(ge("c[type]"), e), slide_show("region_filters"), 3 === e ? (slide_show("events_filter"), val(ge("all_events"), isChecked("future") ? 0 : 1)) : (slide_hide("events_filter"), val(ge("all_events"), 0)), checkPageBlocks(), searchActions.updateCommunityThemes(e), searcher.updResults()
    },
    updateCommunityThemes: function(e, s) {
        e = positive(e);
        var t, r = positive(val(ge("not_safe_search"))),
            i = [];
        r ? i = cur.communityThemes[e] || [] : each(cur.communityThemes[e] || [], function() {
            this[5] || i.push(this)
        }), s ? (t = positive(cur.communityThemesDD.val()), !inArray(t, cur.notSafeThemesIds) && t || cur.communityThemesDD.clear()) : cur.communityThemesDD.clear(), cur.communityThemesDD.setOptions({
            autocomplete: !1
        }), cur.communityThemesDD.setData(i), cur.communityThemesDD.setOptions({
            autocomplete: !0
        }), e ? slide_show("cTheme") : slide_hide("cTheme")
    },
    onChangeCommunityTheme: function(e) {
        val(ge("c[theme]"), e), searcher.updResults()
    },
    onChangeNotSafe: function(e, s, t) {
        var r = val(ge("c[theme]"));
        inArray(r, cur.notSafeThemesIds) && val(ge("c[theme]"), ""), searcher.checkbox(e, s, t, !0), searchActions.updateCommunityThemes(val(ge("c[type]")), !0), searcher.updResults()
    }
};
try {
    stManager.done("search.js")
} catch (e) {}