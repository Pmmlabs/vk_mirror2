var Friends = {
    init: function(friendsTpl, commonTpl) {
        extend(cur, {
            fSearchWrap: geByClass1("friends_search_cont", "friends"),
            fSearch: ge("s_search"),
            fSearchFilterLnk: geByClass1("ui_search_fltr_control", "market_search_wrap"),
            fSearchExtSearchLink: geByClass1("ui_search_fltr_ext_link", "market_search_wrap"),
            module: "friends",
            fListEl: ge("friends_list"),
            showMore: ge("show_more"),
            pageEnd: ge("page_end"),
            fContent: ge("list_content"),
            fSearchContent: ge("friends_search_cont"),
            friendsTpl: friendsTpl,
            commonTpl: commonTpl,
            savedMasks: {},
            friends: {},
            timeouts: {}
        }), cur.secData || (cur.secData = {}), cur.curList = cur.section, placeholderInit(cur.fSearch), setTimeout(function() {
            isVisible("friends_search_input_wrap") && elfocus(cur.fSearch)
        }, 0), Friends.scrollNode = browser.msie6 ? pageNode : window, addEvent(Friends.scrollNode, "scroll", Friends.scrollResize), setTimeout(function() {
            cur.destroy.push(function() {
                clearTimeout(cur.resizeTimeout), removeEvent(Friends.scrollNode, "scroll", Friends.scrollResize)
            })
        }, 0), cur.silent || this.indexAll(function() {
            "list" == cur.section.substr(0, 4) && (cur.friendsList[cur.section] = Friends.filter(cur.friendsList.all, cur.section)), cur.friendsList[cur.section] && cur.friendsList[cur.section].length || show("friends_not_found")
        }), cur.nav.push(function(e, s, r) {
            if ("id" in e || "sort" in e || "act" in e || isEmpty(e)) return !0;
            if ("friends" == r[0] || "al_friends.php" == r[0] && e.section) {
                var n = e.section;
                return "requests" != n && "all_requests" != n && "out_requests" != n || cur.requestsCount || cur.suggCount || cur.allRequestsCount || cur.outRequestsCount ? "requests" != n || cur.requestsCount || cur.suggCount ? "all_requests" != n || cur.allRequestsCount ? ("out_requests" != n || cur.outRequestsCount) && ("subscribers" != n || cur.subscribersCount) ? ("all" != n && "online" != n && "requests" != n && "all_requests" != n && "out_requests" != n || __adsUpdate("force"), "all_requests" != n || "sort" in e || cur.sortByCommon || (delete r.sort, setTimeout(Friends.changeSummary, 0)), this.section(r.section, function() {
                    this.changeSummary(), nav.setLoc(r)
                }.bind(this)), !1) : nav.change({
                    section: "all"
                }) : nav.change({
                    section: cur.requestsCount || cur.suggCount ? "requests" : "out_requests"
                }) : nav.change({
                    section: cur.allRequestsCount ? "all_requests" : "out_requests"
                }) : nav.change({
                    section: "all"
                })
            }
            return "al_friends.php" != r[0] && "friends" != r[0] && void 0
        }.bind(this)), cur.silent && ajax.post("al_friends.php", {
            act: "load_friends_silent",
            id: cur.oid,
            gid: cur.gid,
            sort: nav.objLoc.sort
        }, {
            onDone: function(data, occupations, filters) {
                removeClass(cur.showMore, "load_more"), cur.silent = !1;
                var obj = eval("(" + data + ")");
                if (obj) {
                    for (var i in cur.occupations = extend(cur.occupations || {}, occupations), obj) cur.friendsList[i] = obj[i];
                    this.indexAll(function() {
                        "list" == cur.section.substr(0, 4) && (cur.friendsList[cur.section] = Friends.filter(cur.friendsList.all, cur.section)), (cur.onSilentLoad || Friends.showMore)()
                    }), filters.cities && stManager.add(["ui_controls.js", "ui_controls.css"], function() {
                        cur.cityFilter.setData(filters.cities), cur.cityFilterOpened && (hide("friends_fltr_progress"), cur.cityFilter.showDefaultList())
                    })
                }
            }.bind(this),
            local: 1
        })
    },
    indexAll: function(e) {
        var s = cur.friendsList.all;
        cur.friendsIndex = new vkIndexer(s, function(e) {
            var s = parseInt(e[0]);
            return cur.friends && s && (cur.friends[s] = e), e[5] || ""
        }, function() {
            cur.silent || (cur.friendsList.online = Friends.filter(s, "online"), "common" == cur.section && (cur.friendsList.common = Friends.filter(s, "common")), e && e()), Friends.initBackFunc()
        }), "phonebook" == cur.section && Friends.indexPhone()
    },
    indexPhone: function() {
        cur.phoneIndex = new vkIndexer(cur.friendsList.phonebook, function(e) {
            var s = e[11][0] || "",
                r = e[11][1] || "",
                n = e[11][2] || "";
            return [e[5], s, s.replace(/[^0-9\+]/g, ""), r, r.replace(/[^0-9\+]/g, ""), n].join(" ")
        })
    },
    initBackFunc: function() {
        cur._back = {
            text: cur.backLang,
            show: [function() {
                addEvent(Friends.scrollNode, "scroll", Friends.scrollResize)
            }],
            hide: [function() {
                if (Friends.searchTimout && clearTimeout(Friends.searchTimout), cur.timeouts)
                    for (var e in cur.timeouts) clearTimeout(cur.timeouts);
                removeEvent(Friends.scrollNode, "scroll", Friends.scrollResize)
            }]
        }
    },
    switchTab: function(e, s, r) {
        if (checkEvent(r)) return !0;
        uiTabs.switchTab(e);
        var n = {
            0: "friends",
            section: s
        };
        return checkEvent(r) || nav.change(n)
    },
    switchMenu: function(e, s, r) {
        if (void 0 !== e.href && checkEvent(r)) return !0;
        var n = gpeByClass("ui_rmenu", e);
        if (geByClass1("ui_rmenu_item_sel", n) == e) return !1;
        uiRightMenu.switchMenu(e);
        var i = {
            0: "friends",
            section: s
        };
        if (vk.id != cur.oid) i.id = cur.oid;
        else if (cur.gid) return nav.change({
            section: s
        }), !1;
        return "find" == nav.objLoc.act && uiRightMenu.showProgress(e), nav.go(i, r), scrollToTop(0), !1
    },
    filter: function(e, s) {
        var r = e ? e.length : 0,
            n = [];
        if ("list" == s.substr(0, 4)) {
            var i = parseInt(s.substr(4));
            s = "list"
        }
        for (var t = 0; t < r; t++) {
            var o = e[t];
            if (!cur.filterIds || cur.filterIds[parseInt(o[0])]) switch (s) {
                case "online":
                    intval(o[4]) && n.push(o);
                    break;
                case "common":
                    cur.commonCount && o[11] && n.push(o);
                    break;
                case "list":
                    parseInt(o[6]) & 1 << i && n.push(o);
                    break;
                default:
                    n.push(o)
            }
        }
        return n
    },
    loadMore: function(start, end, force_section) {
        var section = force_section || cur.section,
            list = cur.curList,
            curData = cur.secData[section],
            showMore = "sugg_requests" == force_section ? ge("friends_search_more") : cur.showMore;
        curData.loading || (curData.loading = !0, addClass(showMore, "load_more"), show(showMore), ajax.post("/friends", extend({
            act: "get_section_friends",
            section: section,
            offset: start,
            id: cur.oid,
            gid: cur.gid,
            sort: nav.objLoc.sort
        }, cur.filter), {
            onDone: function(data, preload) {
                removeClass(showMore, "load_more");
                var response = eval("(" + data + ")");
                cur.friendsList && (cur.friendsList[list] || (cur.friendsList[list] = []), "requests" == list && response.sugg_requests ? Array.prototype.push.apply(cur.friendsList.sugg_requests, response.sugg_requests) : Array.prototype.push.apply(cur.friendsList[list], response[section]), this.showMore(!1, start, end), curData.loading = !1, curData.preload = preload)
            }.bind(this)
        }))
    },
    showMore: function(e, s, r, n) {
        if (!cur.friendsList) return !1;
        var t = cur.curList,
            o = cur.friendsList[t],
            c = cur.friendsPerPage,
            u = "requests" == cur.section && !e && cur.suggCount && (!isVisible(cur.showMore) || hasClass(cur.showMore, "manual")),
            a = cur.showMore,
            d = cur.section,
            l = cur.sectionCount,
            f = cur.shownFriends;
        if (u || "requests" != cur.section || !cur.suggCount || cur.shownFriends || s || (c = 3, addClass(cur.showMore, "manual"), show(cur.showMore)), -1 === e && (hasClass(cur.showMore, "manual") && (removeClass(cur.showMore, "manual"), cur.pageEnd = ge("friends_search_wrap")), e = !1), !u) {
            if (!o || !o.length) {
                if (0 == cur.shownFriends && !cur.searchCount) {
                    if (cur.isLoading) return !1;
                    cur.searchStr ? (addClass("friends_not_found", "friends_search"), ge("search_ph").innerHTML = cur.searchStr.replace(/([<>&#]*)/g, "")) : removeClass("friends_not_found", "friends_search"), removeClass("friends_not_found", "friends_only_other");
                    var h = "";
                    h = "list" == cur.curList.substr(0, 4) ? cur.filterIds ? (h = cur.summaryLang.list_not_found_filter).replace("{link}", '<a onclick="Friends.clearFilter(true);">').replace("{/link}", "</a>") : (h = cur.summaryLang.list_not_found).replace("{link}", '<a onclick="Friends.editList(-1);">').replace("{/link}", "</a>") : "requests" == cur.section ? cur.summaryLang.friends_no_friend_requests : cur.filter ? (h = cur.summaryLang.not_found_filter).replace("{link}", '<a onclick="Friends.clearFilter(true);">').replace("{/link}", "</a>") : cur.summaryLang.not_found, ge("friends_not_found_text").innerHTML = h, show("friends_not_found")
                }
                return e && (cur.fContent.innerHTML = ""), cur.searchCount && Friends.serverSearchMore(), hide("show_more", "friends_search_more"), void("requests" == cur.section && e && cur.suggCount && (cur.fSearchContent.innerHTML = "", this.showMore(!1, s, r, n), show("friends_search_wrap")))
            }
            isVisible("friends_not_found") && (hide("friends_not_found"), removeClass("friends_not_found", "friends_only_other"))
        }
        u && (o = (cur.friendsList.sugg_requests || []).slice(), d = "sugg_requests", l = cur.suggCount, a = ge("friends_search_more"), f = cur.shownSugg), null == s && (s = f), null == r && (r = f + c);
        var _ = o.slice(s, r);
        if (!_.length) {
            var g = cur.secData[d];
            return g && g.preload && Friends.loadMore(s, r, d), cur.searchCount && Friends.serverSearchMore(), void(l <= f && hide(a))
        }
        var p = [];
        for (i in e && (cur.fContent.innerHTML = ""), _) {
            if (cur.selection)(m = _[i].slice())[5] = m[5].replace(cur.selection.re, cur.selection.val);
            else var m = _[i];
            if (++f, u ? ++cur.shownSugg : ++cur.shownFriends, m) {
                var v = "";
                u && (v = "sugg_requests"), Array.prototype.push.apply(p, Friends.drawFriend(m, v))
            }
        }
        if (n) return '<div class="friends_list_bl">' + p.join("") + "</div>";
        (u ? cur.fSearchContent : cur.fContent).appendChild(ce("div", {
            innerHTML: p.join(""),
            className: "friends_list_bl"
        })), l <= f ? (hide(a), cur.pageEnd = ge("page_end")) : show(a), !u && "requests" == cur.section && e && -1 !== e && cur.suggCount && (cur.fSearchContent.innerHTML = "", this.showMore(!1, s, r, n), show("friends_search_wrap"))
    },
    updateList: function(e, s) {
        if (cur.silent) return cur.onSilentLoad = function() {
            Friends.updateList(e, !0)
        }, void(trim(e) && (hide(cur.showMore), cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>'));
        clearTimeout(Friends.searchTimout), Friends.searchTimout = setTimeout(function() {
            cur.searchStr != e && ((cur.searchStr = e) ? ("all" != cur.section && "phonebook" != cur.section && (this.selectTab("all"), this.selectSection("all"), cur.curList = cur.section = "all", nav.setLoc(extend(nav.objLoc, {
                section: "all"
            }))), this.search(e, cur.section), this.changeSummary()) : (cur.section != cur.curList || s ? (this.showSection(), this.changeSummary()) : (this.hideLoading(), cur.searchCount = 0), this.showMore()), hasClass(cur.fSearchWrap, "ui_search_fixed") && scrollToY(ge("friends_search_input_wrap").offsetTop, 0))
        }.bind(Friends), 10)
    },
    showSection: function(e) {
        if (cur.shownFriends = cur.shownSugg = 0, cur.curList = cur.section = e || cur.section, vk.id == cur.oid) {
            var s = "requests" == cur.section || "all_requests" == cur.section || "out_requests" == cur.section;
            if (removeClass("friends", "friends_phonebook"), removeClass("friends", "friends_requests"), hide(cur.fSearchFilterLnk, "friends_sort_control", "friends_req_block", cur.fSearchExtSearchLink), s) {
                ("requests" == cur.section && 50 < cur.requestsCount || "all_requests" == cur.section && 10 < cur.allRequestsCount) && show("friends_sort_control"), hide("friends_search_input_wrap", "friends_search_header"), show("friends_sugg_header");
                var r = (cur.requestsCount || cur.suggCount ? 1 : 0) + (cur.allRequestsCount ? 1 : 0) + (cur.outRequestsCount ? 1 : 0);
                toggle(geByClass1("friends_section_requests", "narrow_column"), 1 <= r), toggle("friends_tab_requests", 0 < cur.requestsCount || 0 < cur.suggCount), toggle("friends_tab_all_requests", 0 < cur.allRequestsCount), toggle("friends_tab_out_requests", 0 < cur.outRequestsCount), addClass("friends", "friends_requests"), val(geByClass1("_friends_list", "friends_req_block"), "")
            } else if ("phonebook" == cur.section) show("friends_search_input_wrap", cur.fSearchFilterLnk), Friends.showListHeader(cur.summaryLang.friends_filter_phonebook), addClass("friends", "friends_phonebook");
            else if ("recent" == cur.section) show("friends_search_input_wrap", cur.fSearchFilterLnk), Friends.showListHeader(cur.summaryLang.friends_tab_recently_added);
            else if ("members" == cur.section) show("friends_search_input_wrap", cur.fSearchExtSearchLink);
            else if (hide("friends_sugg_header"), show("friends_search_input_wrap", "friends_search_header", cur.fSearchFilterLnk), cur.requestsCount && cur.friendsList.requests) {
                var n = ge("friends_req_block");
                geByClass1("_friends_list", n).innerHTML = cur.commonTpl(cur.friendsList.requests[0], "requests").join(""), show(n)
            }
            val(geByClass1("_label", cur.showMore), s ? cur.summaryLang.friends_show_more_requests : cur.summaryLang.friends_show_more_friends)
        } else cur.gid || ("subscribers" == cur.section ? (hide("friends_search_input_wrap"), Friends.showListHeader(cur.summaryLang.friends_tab_subscribers)) : show("friends_search_input_wrap"));
        isVisible("friends_search_input_wrap") && elfocus(cur.fSearch), cur.filterIds && (cur.curList += "_filter");
        var i = cur.friendsList[cur.curList];
        if (!i) {
            if ("recent" == e || "phonebook" == e || "requests" == e) var t = e;
            else t = "all";
            i = cur.friendsList[cur.curList] = this.filter(cur.friendsList[t], cur.section)
        }
        if (cur.sectionCount = i ? i.length : 0, cur.selection = !1, cur.filter && !cur.filterIds) return Friends.changeFilter(), cur.searchStr || this.clearServerSearch(), !1;
        this.showMore(!0)
    },
    updateView: function() {
        cur.fContent.innerHTML = this.showMore(!1, 0, cur.shownFriends, !0)
    },
    showLoading: function() {
        cur.isLoading = 1, uiSearch && uiSearch.showProgress("s_search")
    },
    hideLoading: function() {
        cur.isLoading = 0, uiSearch && uiSearch.hideProgress("s_search")
    },
    serverSearchMore: function() {
        "requests" != cur.section ? cur.serverLoadingMore || cur.searchFinished || (cur.serverLoadingMore = !0, ajax.post("friends", {
            act: "server_search",
            q: cur.searchStr,
            offset: cur.searchOffset
        }, {
            onDone: function(e, s, r) {
                cur.searchFinished = !s, cur.searchFinished && hide("friends_search_more"), cur.searchOffset = r, cur.serverLoadingMore = !1, e && ge("friends_search_cont").appendChild(ce("div", {
                    innerHTML: e,
                    className: "friends_list_bl"
                }))
            },
            showProgress: function() {
                addClass(ge("friends_search_more"), "load_more")
            },
            hideProgress: function() {
                removeClass(ge("friends_search_more"), "load_more")
            }
        })) : Friends.showMore()
    },
    serverSearch: function(n, i, e) {
        cur.searchCount = 0, Friends.showLoading(), cur.serverSearchStr = n, clearTimeout(cur.serverSearchTimeout);
        var s = [];
        for (var r in e) s.push(e[r][0]);
        var t = +new Date;
        cur.serverSearchTimeout = setTimeout(function() {
            ajax.post("friends", {
                act: "server_search",
                q: n,
                exclude: s.join(",")
            }, {
                onDone: function(e, s, r) {
                    i || saveSearchAttemptStats("friends", t, s), cur.searchOffset = r, cur.searchFinished = !s, Friends.hideLoading(), cur.searchStr == n && (cur.searchCount = s, 0 == cur.shownFriends && (hide("friends_search_wrap"), cur.fContent.innerHTML = "", Friends.showMore()), s ? (cur.searchFinished ? hide("friends_search_more") : show("friends_search_more"), ge("friends_search_cont").innerHTML = '<div class="friends_list_bl">' + e + "</div>", show("friends_search_wrap"), Friends.changeSummary(), i ? removeClass("friends_not_found", "friends_only_other") : (addClass("friends_not_found", "friends_only_other"), removeClass("friends_not_found", "friends_search"), show("friends_not_found"))) : Friends.changeSummary())
                },
                onFail: Friends.hideLoading
            })
        }.bind(this), 300)
    },
    clearServerSearch: function() {
        hide("friends_search_wrap"), hide("friends_search_more"), cur.searchCount = 0, cur.pageEnd = ge("page_end")
    },
    goToSearch: function(e) {
        nav.go("friends?act=find&c%5Bname%5D=1&c%5Bq%5D=" + encodeURIComponent(cur.searchStr) + "&c%5Bsection%5D=people")
    },
    search: function(e, s, r, n) {
        if (cur.shownFriends = 0, cur.section = s, e) {
            var i, t = "phonebook" == s ? cur.phoneIndex : cur.friendsIndex;
            if (-1 == e) {
                if ("phonebook" == s) var o = s;
                else o = "all";
                i = this.filter(cur.friendsList[o], s), (e = "") != cur.searchStr && this.clearServerSearch()
            } else {
                i = t.search(e), cur.filterIds && (i = this.filter(i, s));
                var c = i.length;
                c && (e == cur.serverSearchStr || cur.sectionCount || this.clearServerSearch()), c && saveSearchAttemptStats("friends", 0, c), c < 5 && cur.oid == vk.id && !cur.gid && "phonebook" != s && this.serverSearch(e, c, i)
            }
            var u = cur.section;
            if (cur.filterIds && (u += "_filter"), e && (u += "_search_" + e), cur.curList == u && !n) return;
            cur.curList = u, cur.friendsList[cur.curList] = i;
            var a = {
                all: 1,
                online: 1,
                common: 1
            };
            if ("" == e && cur.filterIds && a[s])
                for (var d in delete a[s], a) cur.friendsList[d] && (i = this.filter(cur.friendsList[o], d), cur.friendsList[d + "_filter"] = i);
            e && (e += " " + (parseLatin(e) || ""), e = trim(escapeRE(e.replace(/[,]/g, ""))), cur.selection = {
                re: new RegExp("(" + e.replace(t.delimiter, "|").replace(/(^\||\|$|\?)/g, "") + ")", "gi"),
                val: '<em class="highlight">$1</em>'
            })
        } else cur.curList = cur.section, cur.selection = !1, cur.searchStr && this.clearServerSearch();
        cur.sectionCount = cur.friendsList[cur.curList].length, this.searchTimout = setTimeout(function() {
            this.showMore(!0), r && (Friends.onSectionChange(), r())
        }.bind(this), 10)
    },
    changeSummary: function(e) {
        var s = {
            all: cur.allFriendsCount,
            common: cur.commonCount
        };
        if (cur.friendsList.online && (s.online = cur.friendsList.online.length), cur.gid || vk.id != cur.oid || (s = extend(s, {
                requests: cur.requestsCount ? cur.requestsCount : "",
                all_requests: cur.allRequestsCount,
                out_requests: cur.outRequestsCount
            })), "list" == cur.curList.slice(0, 4) || "phonebook" == cur.curList.slice(0, 9)) ge("friends_list_count").innerHTML = cur.sectionCount ? langNumeric(cur.sectionCount, "%s", !0) : "";
        else if ("subscribers" == cur.section) ge("friends_list_count").innerHTML = cur.subscribersCount ? langNumeric(cur.subscribersCount, "%s", !0) : "";
        else if ("requests" == cur.section && cur.suggCount) ge("friends_sugg_count").innerHTML = cur.suggCount ? langNumeric(cur.suggCount, "%s", !0) : "";
        else if (-1 != cur.curList.indexOf("_search_") || cur.filterIds) {
            if ("all" == cur.section) {
                if (!cur.sectionCount && !cur.searchCount && cur.isLoading) return;
                s.all = cur.sectionCount
            } else s.all = cur.friendsList.all_filter.length; - 1 == cur.curList.indexOf("_search_") ? (cur.friendsList.online_filter && (s.online = cur.friendsList.online_filter.length), cur.friendsList.common_filter && (s.common = cur.friendsList.common_filter.length)) : s.online = s.common = ""
        }
        if (each(s, function(e, s) {
                var r = ge("friends_tab_" + e);
                if (r) {
                    var n = geByClass1("ui_tab_count", r);
                    n && (n.innerHTML = s ? langNumeric(s, "%s", !0) : "")
                }
            }), !cur.gid && vk.id == cur.oid) {
            var r = intval(s.requests + cur.suggCount);
            r = r ? langNumeric(r, "%s", !0) : "", val(geByClass1("ui_rmenu_count", "ui_rmenu_requests"), r), val(geByClass1("page_block_header_count", "friends_req_block"), r), (1 < r ? show : hide)(domPN(ge("friends_request_load_more")))
        }
        document.title = replaceEntities(stripHTML(cur.htitles[cur.section] || cur.htitles.all))
    },
    showListHeader: function(e, s) {
        ge("friends_list_title").innerHTML = e, ge("friends_list_count").innerHTML = "", each(geByClass("_friends_header", ge("friends_tabs_wrap")), function() {
            "friends_tab_list" === this.id ? (removeClass(this, "unshown"), s ? vk.id == cur.oid && ((s < 25 ? show : hide)("friends_list_delete_btn"), show("friends_list_edit_btn")) : hide("friends_list_edit_btn", "friends_list_delete_btn")) : addClass(this, "unshown")
        })
    },
    selectTab: function(e) {
        e = geByClass1("ui_tab", "friends_tab_" + e);
        var s = gpeByClass("ui_tabs", e);
        each(geByClass("_friends_header", ge("friends_tabs_wrap")), function() {
            this == s ? removeClass(this, "unshown") : addClass(this, "unshown")
        }), uiTabs.switchTab(e)
    },
    selectSection: function(e) {
        var s = geByClass1("friends_section_" + e, "narrow_column");
        s && uiRightMenu.switchMenu(s)
    },
    selectTabAndSection: function(e) {
        if ("all" == e || "online" == e || "common" == e || "members" == e) this.selectTab(e), this.selectSection("all");
        else if ("all_requests" == e || "requests" == e || "out_requests" == e) this.selectTab(e), this.selectSection("requests");
        else if ("list" == e.substr(0, 4)) {
            var s = parseInt(e.substr(4)),
                r = "";
            r = 25 <= s && s <= 29 ? cur.publicLists[s] : cur.userLists[s], this.showListHeader(r, s), isVisible("ui_rmenu_lists_list") || uiRightMenu.toggleSubmenu("lists"), this.selectSection(e)
        } else this.selectTab("all"), this.selectSection(e)
    },
    onSectionChange: function() {
        window.tooltips && tooltips.hideAll()
    },
    section: function(type, callback, updateData) {
        if (Friends.clearServerSearch(), type || (type = "all"), updateData || ("online" != type || cur.oid == vk.id) && -1 == type.indexOf("requests") && "recent" != type && "members" != type || "list" == type.substr(0, 4) || (Friends.clearFilter(), Friends.updateCurFilters()), type || (type = cur.requestsCount && 0 < cur.requestsCount && cur.requestsCount < 100 || cur.suggCount ? "requests" : "all"), cur.requestsCount || cur.suggCount || cur.allRequestsCount || cur.outRequestsCount || hide(geByClass1("friends_section_requests", "narrow_column")), hide("friends_req_block"), type != cur.section && (cur.fSearch.setValue(""), cur.searchStr = ""), this.selectTabAndSection(type), cur.silent && "out_requests" != type) return cur.onSilentLoad = function() {
            Friends.section(type, callback)
        }, void(type != cur.section && (hide(cur.showMore), cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>'));
        if (cur.secData[type] || (cur.secData[type] = {}), !updateData && cur.friendsList[type] || "all" == type || "requests" == type && cur.friendsList.sugg_requests) return this.showSection(type), callback(), Friends.onSectionChange(), void(cur.filter && Friends.changeFilter());
        switch (type) {
            case "online":
            case "common":
                this.search(-1, type, callback);
                break;
            case "phonebook":
                var tab = geByClass1("friends_section_phonebook", "narrow_column");
                uiRightMenu.showProgress(tab), ajax.post("/al_friends.php", {
                    act: "phonebook",
                    id: nav.objLoc.id
                }, {
                    onDone: function(e) {
                        if (e) {
                            cur.shownFriends = 0, cur.curList = cur.section = type;
                            var s = cur.friendsList.all,
                                r = [];
                            if (s)
                                for (var n = 0, i = s.length; n < i; n++) {
                                    var t = s[n],
                                        o = e[t[0]];
                                    o && (t.push(o), r.push(t))
                                }
                            if (r.sort(function(e, s) {
                                    return e[5].localeCompare(s[5], {
                                        sensitivity: "base"
                                    })
                                }), cur.friendsList[cur.section] = r, cur.sectionCount = r.length, cur.fContent.innerHTML = "", uiRightMenu.hideProgress(tab), Friends.showSection(type), Friends.onSectionChange(), callback(), Friends.indexPhone(), cur.filterIds) return cur.curList += "_filter", Friends.search(cur.searchStr || -1, cur.section, !1, !0), void Friends.changeSummary();
                            this.showMore()
                        }
                    }.bind(this)
                });
                break;
            case "recent":
                var tab = geByClass1("friends_section_recent", "narrow_column");
                uiRightMenu.showProgress(tab), ajax.post("/al_friends.php", {
                    act: "recent"
                }, {
                    onDone: function(e) {
                        if (e) {
                            cur.shownFriends = 0, cur.curList = cur.section = type;
                            var s = [];
                            len = e.length;
                            for (var r = 0; r < len; r++) {
                                var n = cur.friends[e[r]];
                                n && s.push(n)
                            }
                            cur.friendsList[cur.section] = s, cur.sectionCount = s.length, cur.fContent.innerHTML = "", uiRightMenu.hideProgress(tab), Friends.showSection(type), Friends.onSectionChange(), callback(), this.showMore()
                        }
                    }.bind(this)
                });
                break;
            case "out_requests":
                cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>', ajax.post("/friends", {
                    act: "out_requests"
                }, {
                    onDone: function(data, occupations) {
                        var obj = eval("(" + data + ")");
                        obj && (extend(cur.occupations, occupations), extend(cur.friendsList, obj), this.indexAll(function() {
                            Friends.section(type, callback)
                        }))
                    }.bind(this)
                });
                break;
            default:
                "list" == type.substr(0, 4) && this.search(-1, type, callback)
        }
    },
    scrollResize: function() {
        if (!browser.mobile) {
            var e = document.documentElement,
                s = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                r = scrollGetY();
            cur.pageEnd && (r + 3 * s > cur.pageEnd.offsetTop && setTimeout(function() {
                Friends.showMore()
            }, 0), isVisible("friends_search_input_wrap"))
        }
    },
    drawFriend: function(e, s) {
        return "requests" == cur.section || "all_requests" == cur.section || "out_requests" == cur.section ? cur.commonTpl(e, s || cur.section) : cur.friendsTpl(e, cur.section)
    },
    inviteToGroup: function(n, i, t, e, s) {
        var r = function(e) {
            for (var s in cur.friendsList[cur.curList]) {
                var r = cur.friendsList[cur.curList][s];
                if (r[0] == t) {
                    r[11] = e, link = e ? '<button class="flat_button button_small button_wide secondary" onclick="return Friends.inviteToGroup(this, ' + i + ", " + t + ", 1, '" + r[12] + "')\">" + getLang("friends_cancel_invite") + "</button>" : '<button class="flat_button button_small button_wide" onclick="return Friends.inviteToGroup(this, ' + i + ", " + t + ", 0, '" + r[12] + "')\">" + getLang("friends_send_invite") + "</button>", n.parentNode.replaceChild(se(link), n);
                    break
                }
            }
        };
        return e ? ajax.post("/al_page.php", {
            act: "a_cancel_invite",
            mid: t,
            gid: i,
            hash: s
        }, {
            onDone: function(e) {
                r(0)
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        }) : ajax.post("/al_page.php", {
            act: "a_invite",
            mid: t,
            gid: i,
            hash: s
        }, {
            onDone: function(e, s) {
                e ? r(1) : (showMsg("res" + t, s, "msg"), hide(n))
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        }), !1
    },
    acceptRequest: function(s, e, r, n) {
        var i = ge("request_controls_" + s);
        i.parentNode;
        r || (i.innerHTML = '<div class="progress_inline"></div>'), ajax.post("al_friends.php", {
            act: "add",
            mid: s,
            hash: e,
            request: 1,
            select_list: 1
        }, {
            onDone: function(e) {
                i.innerHTML = e, Friends.processRequest(s, !0, n), TopNotifier && !TopNotifier.shown() && TopNotifier.invalidate()
            },
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        })
    },
    declineRequest: function(s, e, r) {
        var n = ge("request_controls_" + s);
        n.parentNode;
        r || (n.innerHTML = '<div class="progress_inline"></div>'), ajax.post("al_friends.php", {
            act: "remove",
            mid: s,
            hash: e,
            report_spam: 1,
            from_section: cur.section
        }, {
            onDone: function(e) {
                cur.declinedRequestsCnt = cur.declinedRequestsCnt + 1 || 1, hasClass(gpeByClass("friends_user_row", n), "friends_user_request") && 2 <= cur.declinedRequestsCnt && 1 < cur.requestsCount && (e += '<button class="friends_decline_all flat_button button_small secondary" onclick="Friends.subscribeAllRequests(this, \'' + cur.declineAllHash + "')\">" + cur.summaryLang.friends_hide_all_requests + "</button>"), n.innerHTML = e, Friends.processRequest(s, !1), TopNotifier && !TopNotifier.shown() && TopNotifier.invalidate()
            },
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        })
    },
    processRequest: function(e, s, r) {
        if (cur.friendsList) {
            for (var n = (o = cur.friendsList[r ? "sugg_requests" : "requests"] || []).length, i = !1; n--;)
                if (o[n][0] == e) {
                    var t = o.splice(n, 1)[0];
                    r ? --cur.suggCount : --cur.requestsCount, Friends.changeSummary(), s ? (i = !0, t.pop(), cur.friendsList.all ? cur.friendsList.all.push(t) : cur.friendsList.all = [t], cur.friends[t[0]] = t) : r ? (cur.shownSugg--, cur.suggCount--) : (cur.shownFriends--, cur.sectionCount--)
                }
            if (s) {
                for (n = (o = cur.friendsList.all_requests || []).length; n--;)
                    if (o[n][0] == e) {
                        t = o.splice(n, 1)[0];
                        --cur.allRequestsCount, i || (t.pop(), cur.friendsList.all ? cur.friendsList.all.push(t) : cur.friendsList.all = [t], cur.friends[t[0]] = t)
                    }
                delete cur.friendsList.recent, delete cur.friendsList.online, Friends.indexAll()
            } else {
                var o;
                for (n = (o = cur.friendsList.out_requests || []).length; n--;)
                    if (o[n][0] == e) {
                        t = o.splice(n, 1)[0];
                        --cur.outRequestsCount
                    }
            }
            if ("all" === cur.section && cur.friendsList.requests.length) {
                var c = geByClass1("_friends_list", "friends_req_block");
                if (c) {
                    var u = se(cur.commonTpl(cur.friendsList.requests[0], "requests").join(""));
                    c.appendChild(u)
                }
            }
        }
    },
    actionPossible: function(e, s, n, r, i) {
        if (window.tooltips && tooltips.hide(r), cur.possibleAdded || (cur.possibleAdded = {}), !cur.possibleAdded[e]) {
            cur.possibleAdded[e] = 1, i || (i = cur.module);
            var t = gpeByClass("right_list_row", r);
            if (n) var o = {
                act: "add",
                mid: e,
                hash: s,
                from: i,
                request: 1
            };
            else o = {
                act: "hide_possible",
                mid: e,
                hash: s,
                from: i
            };
            return ajax.post("al_friends.php", o, {
                onDone: function(e) {
                    n && showDoneBox(e);
                    var s = t.parentNode,
                        r = geByClass1("unshown", s);
                    r && domInsertBefore(r, t), fadeOut(t, 500, function() {
                        re(t), r || geByClass1("right_list_row", s) || slideUp("friends_possible_block", 100)
                    }), r && setTimeout(fadeIn.pbind(r, 200, removeClass.pbind(r, "unshown")), 500)
                },
                onFail: function(e) {
                    if (e) return showFastBox(getLang("global_error"), e), !0
                }
            }), n && cur.friendsList && (delete cur.friendsList.out_requests, cur.outRequestsCount++, this.changeSummary("out_requests"), "out_requests" == cur.section && nav.change({
                section: "out_requests"
            })), !1
        }
    },
    actionFindUser: function(e, s, r, n) {
        window.tooltips && tooltips.hide(n);
        var i = gpeByClass("friends_find_user", n),
            t = geByClass1("friends_find_user_result", i);
        if (t.innerHTML = '<div class="progress_inline"></div>', r) var o = {
            act: "add",
            mid: e,
            hash: s,
            from: "possible"
        };
        else o = {
            act: "hide_possible",
            mid: e,
            hash: s
        };
        return ajax.post("al_friends.php", o, {
            onDone: function(e) {
                addClass(i, "touched"), t.innerHTML = e
            },
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: addClass.pbind(i, "loading"),
            hideProgress: removeClass.pbind(i, "loading")
        }), !1
    },
    actionFindUserCancel: function(e, s, r, n) {
        var i = gpeByClass("friends_find_user", n);
        if (geByClass1("friends_find_user_result", i).innerHTML = '<div class="progress_inline"></div>', removeClass(i, "touched"), r) var t = {
            act: "remove",
            mid: e,
            hash: s
        };
        else t = {
            act: "cancel_hide_possible",
            mid: e,
            hash: s
        };
        return ajax.post("al_friends.php", t, {
            onDone: function(e) {},
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: addClass.pbind(i, "loading"),
            hideProgress: removeClass.pbind(i, "loading")
        }), !1
    },
    reportSpam: function(e, s, r) {
        var n = r ? domPN(r) : ge("request_controls_" + e);
        n || (n = ge("result_msg"), removeClass(n, "msg")), setTimeout(val.pbind(n, '<div class="progress_inline"></div>'), 0), ajax.post("al_friends.php", {
            act: "report_spam",
            mid: e,
            hash: s
        }, {
            onDone: function(e) {
                n.innerHTML = e
            }
        })
    },
    restoreFriend: function(e, s) {
        var r = gpeByClass("_actions_menu", e);
        ajax.post("al_friends.php", {
            act: "add",
            mid: s,
            hash: cur.userHash,
            cats: cur.savedMasks[s]
        }, {
            onDone: Friends.onRemoveFriend.pbind(s, !0),
            showProgress: addClass.pbind(r, "action_progress"),
            hideProgress: removeClass.pbind(r, "action_progress")
        })
    },
    deleteFriend: function(e, s, r) {
        var n = gpeByClass("_actions_menu", r);
        return ajax.post("al_friends.php", {
            act: "remove",
            mid: s,
            hash: cur.userHash
        }, {
            onDone: Friends.onRemoveFriend.pbind(s, !1),
            showProgress: function() {
                uiActionsMenu.hide(n), addClass(n, "action_progress")
            },
            hideProgress: function() {
                removeClass(n, "action_progress")
            }
        }), !1
    },
    onRemoveFriend: function(e, s) {
        (cur.friendsList[cur.curList] || []).length;
        for (var r in cur.friendsList) "all" != r && "requests" != r && "all_requests" != r && "out_requests" != r && delete cur.friendsList[r];
        cur.friendsList.all.length;
        e = positive(e);
        var n = ge("friends_user_row" + e),
            i = cur.friends[e];
        i && n ? (s ? (i[6] = cur.savedMasks[e], delete cur.savedMasks[e]) : (cur.savedMasks[e] = i[6], i[6] = 0), toggleClass(n, "deleted", !i[6])) : re(n), Friends.indexAll(function() {})
    },
    showCommonBox: function(e, s) {
        return showTabbedBox("al_page.php", {
            act: "box",
            oid: s,
            tab: "common"
        }, {
            cache: 1
        }, e), !1
    },
    toList: function(e) {
        var s = "list" + e;
        return nav.change({
            0: "al_friends.php",
            section: s
        }), scrollToTop(0), !1
    },
    searchFriendToggle: function(e, s, r) {
        var n = r ? ge("friends_subsc" + e) : ge("friends_unsubsc" + e),
            i = r ? ge("friends_unsubsc" + e) : ge("friends_subsc" + e);
        ajax.post("al_friends.php", {
            act: r ? "add" : "remove",
            mid: e,
            hash: s,
            from: "friends"
        }, {
            onDone: function(e) {
                hide(n), show(i)
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        })
    },
    checkCat: function(e, r, s, n) {
        if (1 == n) var i = isChecked(e);
        else {
            i = hasClass(e, "checked");
            var t = ge("lists" + r)
        }
        var o = cur.friends[r];
        if (!o) return !1;
        o[6] = parseInt(o[6]), i ? o[6] & 1 << s && (o[6] -= 1 << s) : o[6] & 1 << s || (o[6] += 1 << s), t && (t.innerHTML = Friends.getLists(o[6])), 1 == n ? checkbox(e) : (i ? removeClass : addClass)(e, "checked"), cur.timeouts["list" + r] && clearTimeout(cur.timeouts["list" + r]), delete cur.friendsList["list" + s], delete cur.friendsList["list" + o[6]], cur.timeouts["list" + r] = setTimeout(function() {
            ajax.post("al_friends.php", {
                act: "save_cats",
                uid: r,
                cats: o[6],
                hash: cur.userHash
            }, {
                onDone: function(e) {
                    if (n) {
                        var s = ge("friends_added_" + r);
                        !cur["fr_add_text_" + r] && s && (cur["fr_add_text_" + r] = s.innerHTML), fadeTo(s, 100, 0, function() {
                            s.innerHTML = e, fadeTo(s, 100, 1)
                        }), clearTimeout(cur["fr_add_timeout_" + r]), cur["fr_add_timeout_" + r] = setTimeout(function() {
                            fadeTo(s, 100, 0, function() {
                                s.innerHTML = cur["fr_add_text_" + r], fadeTo(s, 100, 1)
                            })
                        }, 2e3)
                    }
                }
            })
        })
    },
    getLists: function(e) {
        for (var s = [], r = 29; 25 <= r; r--) 1 << r & e && cur.publicLists[r] && s.push('<span class="friends_lists_group group', (r - 1) % 8 + 1, '" onmousedown="Friends.toList(', r, ');">', cur.publicLists[r], "</span>");
        if (vk.id == cur.oid)
            for (var r in cur.userLists) 1 << r & e && !cur.publicLists[r] && cur.userLists[r] && s.push('<span class="friends_lists_group group', (r - 1) % 8 + 1, '" onmousedown="Friends.toList(', r, ');">', cur.userLists[r], "</span>");
        return s.join("")
    },
    subscribeAllRequests: function(e, s) {
        showFastBox(cur.summaryLang.global_action_confirmation, cur.summaryLang.friends_confirm_subscribe_all_requests, getLang("box_yes"), function() {
            ajax.post("al_friends.php", {
                act: "subscribe_all_requests",
                hash: s,
                once: 1
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }, getLang("box_no"))
    },
    hideAllSuggs: function(e, s) {
        showFastBox(cur.summaryLang.global_action_confirmation, cur.summaryLang.friends_confirm_hide_all_suggs, getLang("box_yes"), function() {
            ajax.post("al_friends.php", {
                act: "hide_all_suggs",
                hash: s
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }, getLang("box_no"))
    },
    editList: function(o) {
        if (cur.silent) cur.onSilentLoad = function() {
            Friends.editList(o)
        };
        else {
            var e = [];
            if (-1 == o && (o = intval(cur.curList.substr(4))), o)
                for (var s = Friends.filter(cur.friendsList.all, cur.curList), r = s.length; r--;) e.push(s[r][0]);
            else o = 0;
            showTabbedBox("al_friends.php", {
                act: "select_friends_box",
                Checked: e.join(","),
                from: "list",
                list_name: o ? replaceEntities(stripHTML(cur.userLists[o])) : "",
                list_id: o
            }, {
                stat: ["privacy.js", "ui_controls.js", "ui_controls.css"],
                cache: 1,
                onFail: function(e) {
                    return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                }
            }), cur.onFlistSave = function(e, s, r, n) {
                var i = [];
                for (var t in s) i.push(parseInt(t));
                return ajax.post("al_friends.php", {
                    act: "save_list",
                    title: n,
                    cat_id: o,
                    Friends: i.join(","),
                    hash: r
                }, {
                    onDone: function(e, s) {
                        Friends.editListClient(o, e, s, i)
                    },
                    onFail: function(e) {
                        return setTimeout(showFastBox(getLang("global_error"), e, getLang("global_close")).hide, 4e3), !0
                    }
                }), Friends.clearFilter(), Friends.updateCurFilters(), !1
            }
        }
    },
    editListClient: function(e, s, r, n) {
        var i = "list" + s;
        if (0 == e) {
            var t = "<div onclick=\"return Friends.switchMenu(this, 'list" + s + '\', event);"  class="ui_rmenu_subitem ui_rmenu_item_sel friends_section_list' + s + '">' + r + "</div>";
            ge("ui_rmenu_lists_list").insertBefore(ce("div", {
                innerHTML: t
            }), geByClass1("friends_create_list", "narrow_column"));
            var o = n.length,
                c = 1 << parseInt(s);
            for (cur.friendsList[i] = []; o--;) {
                (a = cur.friends[n[o]])[6] = parseInt(a[6]), a[6] & c || (a[6] += c, cur.friendsList[i].push(a))
            }
            return cur.userLists[s] = r, Friends.indexAll(), removeClass(ge("main_class"), "no_lists"), nav.change({
                0: "friends",
                section: i
            })
        }
        s < 25 && (geByClass1("friends_section_list" + s, "narrow_column").innerHTML = r, cur.userLists[s] = r);
        c = 1 << s;
        for (var u in cur.friendsList[i] = [], cur.friends) {
            var a = cur.friends[u],
                d = -1 != n.indexOf(parseInt(a[0]));
            d && cur.friendsList[i].push(a), a[6] = parseInt(a[6]), a[6] & c ? d || (a[6] -= c) : d && (a[6] += c)
        }
        return Friends.indexAll(), Friends.section(i, function() {
            Friends.changeSummary(), nav.setLoc({
                0: "friends",
                section: i
            })
        })
    },
    createList: function(e) {
        return Friends.editList(0), cancelEvent(e)
    },
    deleteList: function(e) {
        -1 == e && (e = intval(cur.curList.substr(4))), showBox("al_friends.php", {
            act: "delete_list_box",
            list_id: e
        })
    },
    deleteListClient: function(e) {
        re(geByClass1("friends_section_list" + e, "narrow_column"));
        var s = 1 << e;
        for (var r in cur.friends) cur.friends[r][6] & s && (cur.friends[r][6] -= s);
        delete cur.userLists[e];
        var n = 0;
        for (var r in cur.userLists) n++;
        return n || addClass(ge("main_class"), "no_lists"), nav.change({
            0: "friends",
            section: "all"
        })
    },
    selectList: function(e, s, r) {
        Friends.ddShow(s, e, r)
    },
    showListsDD: function(e, s, r) {
        var n = gpeByClass("ui_actions_menu", s),
            i = geByClass1("ui_actions_menu_sublist", n);
        if (i) {
            var t = data(i, "hidetimer");
            return clearTimeout(t), void data(i, "hidetimer", 0)
        }
        var o = cur.friends[parseInt(e)];
        if (o) {
            for (var c = parseInt(o[6]), u = [], a = [28, 29, 27, 25, 26], d = 0; d < 5; ++d) l = a[d], cur.publicLists[l] && u.push('<a class="ui_actions_menu_item' + (c & 1 << parseInt(l) ? " checked" : "") + '" onclick="Friends.checkCat(this, ' + e + ", " + l + ');">' + cur.publicLists[l] + "</a>");
            for (var l in cur.userLists)
                if (l < 25) {
                    var f = cur.userLists[l];
                    20 < f.length && (f = trim(f.substr(0, 18)) + "..."), u.push('<a class="ui_actions_menu_item' + (c & 1 << parseInt(l) ? " checked" : "") + '" onclick="Friends.checkCat(this, ' + e + ", " + l + ');">' + f + "</a>")
                }
            u = se('<div class="ui_actions_menu_sublist shown" onmouseover="Friends.showListsDD(' + e + ', this, event);" onmouseout="Friends.hideListsDD(this);" onclick="Friends.showListsDD(' + e + ', this, event);">' + u.join("") + "</div>"), n.appendChild(u)
        }
    },
    hideListsDD: function(e) {
        var s = gpeByClass("ui_actions_menu", e),
            r = geByClass1("ui_actions_menu_sublist", s);
        r && (data(r, "hidetimer") || data(r, "hidetimer", setTimeout(function() {
            data(r, "hidetimer", 0), re(r)
        }, 150)))
    },
    hideSuggestion: function(s, e, r) {
        var n = ge("request_controls_" + s);
        ajax.post("al_friends.php", {
            act: "hide_suggestion",
            mid: s,
            hash: e,
            report_spam: 1
        }, {
            onDone: function(e) {
                cur.hiddenSuggestionsCnt = cur.hiddenSuggestionsCnt + 1 || 1, hasClass(gpeByClass("friends_user_row", n), "friends_user_request") && 2 <= cur.hiddenSuggestionsCnt && 1 < cur.suggCount && (e += '<button class="friends_decline_all flat_button button_small secondary" onclick="Friends.hideAllSuggs(this, \'' + cur.declineAllHash + "')\">" + cur.summaryLang.friends_hide_all_suggs + "</button>"), n.innerHTML = e, Friends.processRequest(s, !1, !0)
            },
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        })
    },
    addRecommend: function(e, s, r, n) {
        (n = n.parentNode).innerHTML = '<img src="/images/upload.gif" />', ajax.post("al_friends.php", {
            act: "a_suggest_friends",
            mid: e,
            uids: s,
            hash: r,
            from: "add"
        }, {
            onDone: function(e) {
                n.innerHTML = e
            },
            onFail: function(e) {
                n.innerHTML = e
            }
        })
    },
    suggestBox: function(n) {
        var i = showBox("al_friends.php", {
            act: "select_friends_box",
            from: "suggest_friends",
            friend_id: n
        }, {
            stat: ["privacy.js", "privacy.css", "indexer.js", "profile.css"],
            params: {
                dark: 1
            }
        });
        return i.leaveOnSave = !0, !(cur.onFlistSave = function(e, s, r) {
            ajax.post("al_friends.php", {
                act: "a_suggest_friends",
                mid: n,
                ids: e.join(","),
                hash: r
            }, {
                onDone: function(e) {
                    i.hide(), showDoneBox(e)
                },
                showProgress: i.showProgress,
                hideProgress: i.hideProgress
            })
        })
    },
    getAgeFromData: function(e, s) {
        return 0 < !(e = parseInt(e)) && (e = s.ageTo), Friends.getRangeData(s.ageFrom, e, 1, s.langAgeFrom + " ", s.langAgeFromEmpty)
    },
    getAgeToData: function(e, s) {
        return 0 < !(e = parseInt(e)) && (e = s.ageFrom), Friends.getRangeData(e, s.ageTo, 1, s.langAgeTo + " ", s.langAgeToEmpty)
    },
    getRangeData: function(e, s, r, n, i) {
        if (s < e) return !1;
        var t = [
            [0, i]
        ];
        if (r < 0)
            for (var o = s; e <= o; o += r) t.push([o, n + o]);
        else if (0 < r)
            for (o = e; o <= s; o += r) t.push([o, n + o]);
        return t
    },
    radioFilter: function(e, s, r) {
        radiobtn(e, s, "friends_radio_sex"), (r || null == r) && Friends.changeFilter()
    },
    initFilters: function(s) {
        stManager.add(["ui_controls.js", "ui_controls.css"], function() {
            cur.cityFilter = new Dropdown(ge("friends_fltr_city"), s.cities, {
                big: 1,
                zeroPlaceholder: !0,
                onChange: Friends.changeFilter,
                onShow: function() {
                    cur.silent && (cur.cityFilterOpened = !0, show("friends_fltr_progress"))
                }
            }), cur.ageFromFilter = new Dropdown(ge("friends_age_from"), Friends.getAgeFromData(s.ageTo, s), {
                zeroPlaceholder: !0,
                big: 1,
                onChange: function(e) {
                    cur.ageToFilter.setData(Friends.getAgeToData(e, s)), Friends.changeFilter()
                }
            }), cur.ageToFilter = new Dropdown(ge("friends_age_to"), Friends.getAgeToData(s.ageFrom, s), {
                zeroPlaceholder: !0,
                big: 1,
                onChange: function(e) {
                    cur.ageFromFilter.setData(Friends.getAgeFromData(e, s)), Friends.changeFilter()
                }
            }), window.radioBtns.friends_radio_sex = {
                els: Array.prototype.slice.apply(geByClass("radiobtn", ge("friends_radio_sex"))),
                val: 0
            }
        })
    },
    clearFilter: function(e, s) {
        cur.cityFilter && (s && "city" != s || cur.cityFilter.selectItem(0, !1), s && "age_from" != s || cur.ageFromFilter.selectItem(0, !1), s && "age_to" != s || cur.ageToFilter.selectItem(0, !1), s && "sex" != s || Friends.radioFilter(ge("friends_radio_any"), 0, !1), cur.filterIds = !1, cur.filter = !1, e && Friends.changeFilter())
    },
    filterParams: function() {
        var e = {
            city: parseInt(cur.cityFilter.val()),
            sex: parseInt(radioBtns.friends_radio_sex.val),
            age_from: parseInt(cur.ageFromFilter.val()),
            age_to: parseInt(cur.ageToFilter.val())
        };
        return !!(e.city || e.sex || e.age_from || e.age_to) && e
    },
    changeFilter: function() {
        if (cur.silent) return cur.onSilentLoad = function() {
            Friends.changeFilter()
        }, hide(cur.showMore), void(cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>');
        if (cur.filter = Friends.filterParams(), cur.filter) ajax.post("friends", extend({
            act: "filter_friends",
            uid: cur.oid
        }, cur.filter), {
            onDone: function(e) {
                for (var s in cur.filterIds = {}, e) cur.filterIds[e[s]] = 1;
                for (var s in cur.friendsList) "filter" == s.split("_").pop() && delete cur.friendsList[s];
                inArray(cur.section, ["all", "online", "phonebook"]) || (Friends.selectTab("all"), Friends.selectSection("all"), cur.curList = cur.section = "all", nav.setLoc(extend(nav.objLoc, {
                    section: "all"
                }))), Friends.search(cur.searchStr || -1, cur.section, !1, !0), Friends.changeSummary(), Friends.updateCurFilters()
            },
            progress: "friends_fltr_progress",
            cache: 1
        });
        else {
            cur.filterIds && (cur.filterIds = !1);
            var e = cur.searchStr || "";
            cur.searchStr = "", Friends.updateList(e), Friends.updateCurFilters()
        }
    },
    updateCurFilters: function() {
        var e = ge("friends_cur_filters");
        if (cur.filter) {
            for (var s in cur.filter) {
                var r = cur.filter[s],
                    n = "",
                    i = !1,
                    t = !1,
                    o = ge("friends_filters_token_" + s);
                if (r) {
                    switch (s) {
                        case "city":
                            n = cur.cityFilter.val_full()[1];
                            break;
                        case "age_from":
                            n = cur.ageFromFilter.val_full()[1], i = "age_to";
                            break;
                        case "age_to":
                            n = cur.ageToFilter.val_full()[1], t = "age_from";
                            break;
                        case "sex":
                            n = 2 == r ? getLang("sex_m") : getLang("sex_fm")
                    }
                    var c = '<span class="label">' + (n = stripHTML(n)) + '</span><span class="del_icon"></span>';
                    if (o) o.innerHTML = c;
                    else {
                        var u = ce("div", {
                            id: "friends_filters_token_" + s,
                            className: "token",
                            innerHTML: c,
                            onclick: Friends.clearFilter.pbind(!0, s)
                        });
                        i && ge("friends_filters_token_" + i) ? domInsertBefore(u, ge("friends_filters_token_" + i)) : t && ge("friends_filters_token_" + t) ? domInsertAfter(u, ge("friends_filters_token_" + t)) : e.appendChild(u)
                    }
                } else o && re(o)
            }
            show(e)
        } else hide(e), e.innerHTML = ""
    },
    changeFriendsOrder: function(e, s) {
        var r = domPN(e);
        "date" === s && "date" !== nav.objLoc.sort ? (nav.change({
            sort: !1
        }), addClass(r, "friends_sort_sel_date"), removeClass(r, "friends_sort_sel_common")) : "common" === s && "common" !== nav.objLoc.sort && (nav.change({
            sort: "common"
        }), addClass(r, "friends_sort_sel_common"), removeClass(r, "friends_sort_sel_date"))
    },
    findAdd: function(e, s, r) {
        ajax.post("al_friends.php", {
            act: "add",
            mid: e,
            hash: s,
            request: 1,
            short_resp: 1
        }, {
            onDone: function(e) {
                var s = r.parentNode;
                s.innerHTML = '<div class="friends_imp_status" style="display: none;">' + e + "</div>", fadeIn(s.firstChild, 200)
            },
            onFail: function(e) {
                if (e) return showFastBox(getLang("global_error"), e), !0
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        })
    },
    toggleFindFilters: function(e, s) {
        var r = s ? 0 : 200;
        e || (e = ge("search_filters_minimized"), s ? searcher.toggleMinimizedFilters(e, !0, s) : searcher.toggleMinimizedFilters(e)), hasClass(e, "ui_rmenu_item_expanded") ? (slideUp("friends_import_block", r, function() {
            show("friends_import_stub")
        }), cur.disableAutoMore = !1, geByClass1("search_row", "results") && searcher.updResults()) : (hide("friends_import_stub", "friends_filters_header", "results"), show("friends_import_header", "friends_list_wrap"), slideDown("friends_import_block", r), nav.setLoc("friends?act=find"), val("search_query", ""), cur.params && (cur.params["c[q]"] = ""), cur.disableAutoMore = !0, scrollToTop())
    },
    extendedSearchQuery: function() {
        hasClass("search_filters_minimized", "ui_rmenu_item_expanded") || Friends.toggleFindFilters(!1, !0), searcher.onEnter()
    },
    clearFindParams: function(e, s) {
        return hide("search_clear_params"), uiSearch.reset(e, !1, s)
    }
};
try {
    stManager.done("friends.js")
} catch (e) {}