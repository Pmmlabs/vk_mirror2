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
            t = !s || e && e != cur.section || "quick" == cur.section ? {
                "c[section]": e || cur.section
            } : serializeForm(s) || {}, t["c[q]"] = val("search_query");
            for (var r in t) t[r] && "0" != t[r] || delete t[r], "-1" == t[r] && t[r + "_custom"] ? (t[r] = t[r + "_custom"], delete t[r + "_custom"]) : t[r + "_custom"] && delete t[r + "_custom"];
            return "video" != cur.section || t["c[sort]"] || (t["c[sort]"] = "0"), "people" == cur.section && ge("c[photo]") && !t["c[photo]"] && (t["c[photo]"] = "0"), "people" == cur.section && t["c[invite]"] && delete t.from, "communities" != cur.section || !cur.filtersShown || t["c[q]"] || t["c[category]"] || (t["c[skip_catalog]"] = "1"), t
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
                var o = geByClass1("search_menu_" + e, "search_menu");
                o && uiRightMenu.switchMenu(o)
            }
            return searcher.setSection(e), searcher.sendSearchReq(r, !0), hasClass(gpeByClass("ui_search", "search_query"), "ui_search_fixed") && scrollToTop(), !1
        },
        switchAudioTop: function(e) {
            return cur.useRec = e, cur.audioTop = e, this.switchSection("audio")
        },
        showMedia: function(e, s, t) {
            return t && checkEvent(t) ? !1 : (hide(geByClass1("label", s)), show(geByClass1("progress", s)), cur.loadingMedia = !0, searcher.switchSection(e, {
                updateStats: !0
            }, t))
        },
        updResults: function() {
            if (cur.customSearchChange) return cur.customSearchChange(), !1;
            var e = searcher.getSectionParams();
            return searcher.sameParams(e) || "video" == e["c[section]"] && !e["c[q]"] && !nav.objLoc["c[q]"] ? !1 : (cur.onSearchChange && cur.onSearchChange(e), searcher.sendSearchReq(e, ("auto" == cur.section || "audio" == cur.section && e["c[q]"] && !ge("audio_lyrics_filter") || "audio" == cur.section && !e["c[q]"] && ge("audio_lyrics_filter")) && !e.offset), void(hasClass(gpeByClass("ui_search", "search_query"), "ui_search_fixed") && scrollToTop()))
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
            window.iSearch && iSearch.select && iSearch.select.isVisible() && iSearch.select.active > -1 || (clearTimeout(cur.requestTimeout), searcher.updResults(), searcher.highlightHotHashtag(s))
        },
        checkbox: function(e, s, t) {
            checkbox(e);
            var r = isChecked(e) ? 1 : 0;
            t && (r = 1 - r), val(s, r), searcher.updResults()
        },
        sendSearchReq: function(e, s) {
            if (cur.searchReq) try {
                cur.searchReq.abort()
            } catch (t) {
                debugLog(t)
            }
            s && !e.offset && (vk.no_ads = inArray(e["c[section]"], ["audio"]), extend(e, {
                uf: 1
            })), void 0 !== cur.useRec && (e.rec = cur.useRec, delete cur.useRec), e.edit = nav.objLoc.edit, e.sign = nav.objLoc.sign, e.all = nav.objLoc.all, e.change = 1, cur.searchLoc && (e.search_loc = cur.searchLoc), void 0 !== cur.topType && (e.type = cur.topType, delete cur.topType), window.iSearch && iSearch.select && (iSearch.select.hide(), delete cur.setISearch), cur.loadingMedia || (uiSearch.showProgress("search_query"), ge("search_query").ignoreFixed = "statuses" == e["c[section]"]), cur.searchReq = ajax.post("al_search.php", e, {
                onDone: function(t, r, o) {
                    var i = e.uf && ge("results_wrap") ? ge("results_wrap") : ge("results"),
                        c = ge("friends_filters_block") ? ge("friends_filters_block") : ge("filter_form");
                    if (i.innerHTML = r || "", s && (c.innerHTML = o || "", elfocus("search_query"), t.loc)) {
                        var a = locProtocol + "//" + location.host + "/" + t.loc,
                            n = document.URL == a ? "" : document.URL;
                        setTimeout(updateOtherCounters.pbind(a, n), 10)
                    }
                    searcher.applyOptions(t, s), uiSearch.hideProgress("search_query"), show("search_clear_params");
                    var u = window.audioPlayer;
                    u && u.showCurrentTrack && u.showCurrentTrack(), cur.onSearchFinish && cur.onSearchFinish(), shortCurrency(), setTimeout(checkPageBlocks, 200), cur.onSearchDone && cur.onSearchDone()
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
                ads: !(!s || e.offset)
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
            if (void 0 != options.controls && val(geByClass1("_header_extra", header), options.controls || ""), void 0 !== options.auto_rows && ge("search_auto_rows") && (ge("search_auto_rows").innerHTML = options.auto_rows || ""), clearTimeout(cur.setLocTO), options.loc)
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
            res.className = "search_results search_" + cur.section + "_results" + ("statuses" == cur.section || "auto" == cur.section ? " wall_module" : "") + ("statuses" == cur.section && "" !== options.summary || gpeByClass("page_block", res) ? "" : " page_block") + " mark_top_verified", lighted && addClass(sc, "highlight");
            var more_results = ge("search_more_results");
            cur.has_more || more_results && more_results.firstChild ? (hide("seach_pages"), show("ui_search_load_more")) : hide("ui_search_load_more")
        },
        selectHotHashtag: function(e) {
            var s = val(e),
                t = ge("search_query"),
                r = (data(t, "opts") || {}).onEnter;
            return val(t, s), r && r(t, s), statlogsValueEvent("top_hashtag_search", 0, "click"), !1
        },
        highlightHotHashtag: function(e) {
            e = e ? e.toLowerCase() : "";
            var s = !1,
                t = geByClass("search_hot_hashtags_item", "search_hot_hashtags");
            return each(t, function(t, r) {
                val(r).toLowerCase() == e ? (s = !0, addClass(r, "search_hot_hashtags_item_active")) : removeClass(r, "search_hot_hashtags_item_active")
            }), s
        },
        toggleFilter: function(e, s, t) {
            hasClass(e, "search_filter_shut") || !isVisible(s) ? (addClass(e, "search_filter_open"), removeClass(e, "search_filter_shut"), slideDown(s, 200, function() {
                checkPageBlocks(), t && t()
            })) : slideUp(s, 200, function() {
                addClass(e, "search_filter_shut"), removeClass(e, "search_filter_open"), t && t()
            })
        },
        switchFilter: function(e, s, t) {
            return checkEvent(t) ? !1 : (ge("c[" + e + "]") && (ge("c[" + e + "]").value = s), "video" == cur.section && "quality" == e && ge("c[hd]") && (ge("c[hd]").value = 0 > s ? 0 : 1), void searcher.updResults())
        },
        appendElements: function(e) {
            if (e) {
                for (; e.firstChild;) e.parentNode.insertBefore(e.firstChild, e);
                re(e)
            }
        },
        showMore: function() {
            var e = ge("ui_search_load_more"),
                s = ge("search_more_results");
            if (!e || !isVisible(e) || cur.isSearchLoading) return void(s && searcher.appendElements(s));
            if (s && searcher.appendElements(s), !cur.has_more) return void hide(e);
            cur.disableAutoMore = !1, cur.isSearchLoading = !0, lockButton(e);
            var t = searcher.getSectionParams();
            t.offset = cur.offset, t.qid = cur.qid, t.edit = nav.objLoc.edit, t.sign = nav.objLoc.sign, t.all = nav.objLoc.all, ajax.post("al_search.php", t, {
                onDone: function(s, t) {
                    cur.isSearchLoading = !1, t && (ge("no_results") && re("no_results"), ge("results").insertBefore(ce("div", {
                        innerHTML: t,
                        id: "search_more_results"
                    }), e)), unlockButton(e), searcher.applyOptions(s), searcher.scrollCheck()
                },
                cache: "audio" != t["c[section]"] || t["c[q]"] ? 1 : 0
            })
        },
        close: function() {
            return nav.go(cur.search_return_to, {}, {
                back: !0
            })
        },
        toggleMinimizedFilters: function(e, s, t) {
            var r = e && domNS(e),
                o = t ? 0 : 200;
            return void 0 === s && (s = !isVisible(r)), !s && isVisible(r) ? (cur.filtersShown = !1, removeClass(e, "ui_rmenu_item_expanded"), slideUp(r, o)) : s && !isVisible(r) && (cur.filtersShown = !0, val("c[category]", 0), addClass(e, "ui_rmenu_item_expanded"), slideDown(r, o)), !1
        },
        onCommunitiesToggle: function() {
            "search" == cur.module && (uiRightMenu.switchMenu(geByClass1("search_menu_" + cur.section, "search_menu")), searcher.updResults())
        },
        subscribe: function(e, s, t, r, o, i, c) {
            var a, n, u = gpeByClass("search_row", e);
            if (cur.unsubscribed = cur.unsubscribed || {}, !r && i && !cur.unsubscribed[s]) {
                var l = showFastBox({
                    title: getLang("global_warning"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang(i), getLang("search_group_leave"), function() {
                    l.hide(), searcher.subscribe(e, s, t, r, o)
                }, getLang("global_cancel"));
                return !1
            }
            r ? (a = "al_feed.php", n = {
                act: "subscr",
                oid: s,
                hash: t,
                from: o || "search",
                ref: cur.module
            }) : (a = "al_fans.php", n = {
                act: "unsub",
                oid: s,
                hash: t,
                from: "search",
                ref: cur.module
            }), ajax.post(a, n, {
                onDone: function() {
                    c ? toggleClass(u, "touched", !!r) : (toggle("search_sub" + s, !r), toggle("search_unsub" + s, !!r)), r || (cur.unsubscribed[s] = 1)
                },
                onFail: function(e) {
                    return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0) : void 0
                },
                showProgress: function() {
                    c ? (e.tt && e.tt.destroy(), addClass(u, "loading")) : lockButton(e)
                },
                hideProgress: function() {
                    c ? removeClass(u, "loading") : unlockButton(e)
                }
            })
        },
        onResize: function() {
            searcher.scrollCheck()
        },
        scrollCheck: function() {
            if (!(browser.mobile || cur.isSearchLoading || cur.disableAutoMore)) {
                var e = ge("ui_search_load_more");
                if (!isVisible(e)) {
                    var s = ge("search_more_results");
                    return void(s && searcher.appendElements(s))
                }
                var t = document.documentElement,
                    r = window.innerHeight || t.clientHeight || bodyNode.clientHeight,
                    o = scrollGetY();
                o + r + 200 > e.offsetTop && searcher.showMore()
            }
        },
        init: function(e) {
            var s = globalHistory.length;
            s && globalHistory[s - 1] && globalHistory[s - 1].loc.indexOf("search") ? cur.search_return_to = globalHistory[s - 1].loc : cur.search_return_to = "/", hide("header");
            var t = ge("search_query"),
                r = t && data(t, "opts") || {};
            r.isNew || (iSearch.destroy(), vk.id && iSearch.init(t)), elfocus(t), "search" == nav.objLoc[0] && (extend(cur, {
                oid: e.user_id,
                module: "search"
            }), cur.nav.push(function(e, s, t) {
                if (void 0 !== e[0] || cur.searchLoc && void 0 !== e.act) return clearTimeout(cur.setLocTO), void(nav.strLoc != cur.loc && cur.loc && hab.setLoc(cur.loc));
                if (cur.searchLoc) {
                    var r = !1;
                    for (var o in t)
                        if ("c[" == o.substr(0, 2)) {
                            r = !0;
                            break
                        }
                    if (cur.onLocationChange && cur.onLocationChange(r), !r) return !0
                }
                var i = clone(t);
                delete i[0];
                var c = i["c[section]"] || i.section || "quick";
                return ge("search_menu") && uiRightMenu && uiRightMenu.switchMenu(geByClass1("search_menu_" + c, "search_menu")), searcher.setSection(c), searcher.sendSearchReq(i, !0), !1
            })), cur.options || (cur.options = {
                reply_names: {}
            }), extend(cur.options, e), searcher.applyOptions(e), t.ignoreFixed = "statuses" == cur.section, window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0, addEvent(window, "scroll", searcher.scrollCheck), addEvent(window, "resize", searcher.onResize), setTimeout(searcher.scrollCheck, 50), setTimeout(checkPageBlocks, 200);
            var o = window.audioPlayer;
            o && o.showCurrentTrack && o.showCurrentTrack(), cur._back = {
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
            var t = this;
            this.inited = !0, this.input = e, this.cont = e.parentNode.parentNode;
            var r = ce("div", {
                className: "results_container",
                innerHTML: '<div class="result_list"></div>'
            });
            this.cont.appendChild(r), this.resultList = geByClass("result_list", r)[0], hide(this.resultList), browser.chrome && (this.resultList.style.opacity = 1), this.resultList.style.width = r.style.width = "552px", this.onShowCallback = s ? s.onShow : !1, this.initSelect(s), addEvent(e, "keyup click mouseup", t.inputUpHandler), addEvent(document, "click", t.documentClick), addEvent(e, "keypress keydown", t.inputDownHandler), ge("top_search") && (ge("top_search").onclick = function(e) {
                return hab.getLoc().indexOf("search") ? nav.go("search", e, {
                    search: !0
                }) : (window.searcher && searcher.close(), !1)
            })
        }
    },
    inputUpHandler: function(e) {
        var s = iSearch;
        if (s.select) {
            if ((s.select.isVisible() && s.select.active > -1 || cur.preventISRequest) && (delete cur.preventISRequest, inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN]))) return cancelEvent(e);
            clearTimeout(cur.requestTimeout);
            var t = val(s.input);
            s.currentTerm = t;
            var r = cur.section;
            return t ? void(cur.requestTimeout = setTimeout(function() {
                cur.setISearch = !0, ajax.post("/hints.php?act=a_gsearch_hints", {
                    q: t,
                    section: r
                }, {
                    onDone: function(e) {
                        s.currentTerm == t && cur.setISearch && s.showSelectList(t, e), delete cur.setISearch
                    },
                    cache: 1
                })
            }, 300)) : void s.select.hide()
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
                    o = r ? r.getAttribute("val") : "";
                if (each(s.lastItems, function() {
                        this[0] == o && (t = this)
                    }), !t) return;
                return val(s.input, t[3] + (e.keyCode == KEY.SPACE ? " " : "")), elfocus(s.input, s.input.length), e.keyCode != KEY.SPACE && (cur.preventISRequest = !0, s.select.hide(), searcher.updResults()), cancelEvent(e)
            }
            return (e.keyCode == KEY.RETURN || 10 == e.keyCode) && s.select && s.select.isVisible() ? (triggerEvent(document, e.type, e), cancelEvent(e)) : !0
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
        var t = this;
        if (this.select) {
            if (s = isArray(s) && s.length ? s : [], !s.length) return void t.select.hide();
            this.select.clear(), this.lastItems = s, this.select.content(s), this.select.show(), isFunction(this.onShowCallback) && this.onShowCallback()
        }
    },
    onItemSelect: function(e) {
        if (this.select) {
            this.select.hide();
            var s;
            if (each(this.lastItems, function() {
                    this[0] == e && (s = this)
                }), s) {
                var t = ce("div", {
                    innerHTML: s[3]
                });
                val(this.input, t.innerText || t.textContent), this.input.blur(), searcher.updResults()
            }
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
    peopleAction: function(e, s, t) {
        ajax.post(s, t, {
            onDone: function(s) {
                e.parentNode.replaceChild(ce("span", {
                    innerHTML: s
                }).firstChild, e)
            }
        })
    },
    ownerAction: function(e, s, t) {
        ajax.post(s, t, {
            onDone: function(s) {
                e.parentNode.innerHTML = s
            }
        })
    },
    groupAction: function(e, s, t, r, o) {
        ajax.post("al_groups.php", {
            act: "member_action",
            action: s,
            gid: t,
            mid: r,
            hash: o,
            context: "search"
        }, {
            onDone: function(s) {
                e.parentNode.replaceChild(ce("span", {
                    innerHTML: s
                }).firstChild, e);
                var t = _tbLink.loc;
                t && globalHistoryDestroy(t)
            }
        })
    },
    inviteToGroup: function(e, s, t, r, o) {
        var i = function(o) {
            o ? link = '<button class="flat_button button_small button_wide search_btn_invite secondary" onclick="return searchActions.inviteToGroup(this, ' + s + ", " + t + ", '" + r + "', 1)\">" + getLang("search_cancel_invitation") + "</button>" : link = '<button class="flat_button button_small button_wide search_btn_invite" onclick="return searchActions.inviteToGroup(this, ' + s + ", " + t + ", 0, '" + r + "')\">" + getLang("search_send_invitation") + "</button>", e.parentNode.replaceChild(se(link), e)
        };
        return o ? ajax.post("/al_page.php", {
            act: "a_cancel_invite",
            mid: t,
            gid: s,
            hash: r
        }, {
            onDone: function(e) {
                i(0)
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }) : ajax.post("/al_page.php", {
            act: "a_invite",
            mid: t,
            gid: s,
            hash: r
        }, {
            onDone: function(s, t) {
                s ? i(1) : (showMsg(gpeByClass("people_row", e), t, "msg"), hide(e))
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
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
        var o = 0;
        each([8, 11, 14, 17, 20], function(e, s) {
            return s >= t ? !1 : void(o = e)
        }), boxQueue.hideLast();
        var i = (new Array(o + 1).join("+"), Math.pow(10, 10)),
            c = 200,
            a = 120;
        window.devicePixelRatio >= 2 && (c *= 2, a *= 2), e = Math.round(e * i) / i, s = Math.round(s * i) / i;
        var n = ge("search_status_map");
        addClass(n, "search_status_map_selected"), setStyle(n, {
            backgroundImage: "url(/maps?lat=" + e + "&lng=" + s + "&z=" + t + "&w=" + c + "&h=" + a + ")"
        }), r || (val("search_status_map_hidden", e + "," + s + "," + t), searcher.updResults())
    },
    searchChooseGeoPoint: function() {
        var e = {
                act: "a_choose_place_box",
                search: 1
            },
            s = val("search_status_map_hidden"),
            t = s.match(/(\-?\d{1,3}(?:\.\d+)?)\,(\-?\d{1,3}(?:\.\d+)?)(?:\,(\d+))?/);
        t && (e.lat = floatval(t[1]), e.lon = floatval(t[2]), e.zoom = t[3] || 8), showBox("/al_places.php", e), cur.chooseGeoPoint = searchActions.chooseGeoPoint
    },
    searchUrlOnChange: function(e, s, t) {
        var r = ge("search_status_url"),
            o = r.name,
            i = s ? "c[domain]" : "c[url]";
        return radiobtn(e, s, "search_status_hint_domain"), elfocus(r), val(r) && i != o && (r.name = i, searcher.updResults()), cancelEvent(t)
    }
};
try {
    stManager.done("search.js")
} catch (e) {}