var Fave = {
    addLinkBox: function() {
        return showBox("/al_fave.php", {
            act: "add_link_box"
        })
    },
    checkLink: function(e) {
        clearTimeout(cur.checkLinkTO), cur.checkLinkTO = setTimeout(this.getLinkInfo.pbind(e), 500)
    },
    getLinkInfo: function(e) {
        var r = trim(e.value).replace(/\s/g, "+"),
            a = curBox();
        return r ? (cur.lnkSent = r, void ajax.post("al_fave.php", {
            act: "get_link_info",
            lnk: r,
            hash: cur.fave_hash
        }, {
            onDone: function(a, n, o, s) {
                return r != cur.lnkSent ? !1 : (Fave.hideMessage(), 0 > a ? (Fave.showMessage(n, !0), elfocus(e)) : (cur.lnk = n, ge("fave_al_link_info").innerHTML = o, placeholderInit("fave_al_position"), elfocus("fave_al_position"), void 0))
            },
            progress: a.progress
        })) : elfocus(e)
    },
    showMessage: function(e, r) {
        var a = curBox() ? ge("fave_edit_box_msg") : ge("fave_edit_msg"),
            n = domFC(a);
        n && (n.innerHTML = e, a.className = r ? "info" == r ? "msg info_msg" : "msg error" : "msg ok_msg", show(a))
    },
    hideMessage: function() {
        var e = curBox() ? ge("fave_edit_box_msg") : ge("fave_edit_msg");
        hide(e)
    },
    doAddLink: function(e) {
        var r = curBox(),
            a = ge("fave_al_position");
        if (e || !isVisible(r.progress)) {
            var n = val(a);
            ajax.post("al_fave.php", {
                act: "add_link",
                link: cur.lnk,
                desc: n,
                hash: cur.fave_hash
            }, {
                onDone: function(e, a) {
                    if (e) {
                        var n, o;
                        ge("empty_links") ? (o = ge("empty_links"), n = o.parentNode) : ge("links") && (o = ge("links"), n = o.parentNode), n.removeChild(o), n.innerHTML += a, r.hide()
                    } else Fave.showMessage(a, !0)
                },
                onFail: function() {},
                progress: r.progress
            })
        }
    },
    deleteLink: function(e, r) {
        window.tooltips && tooltips.hideAll();
        var a = e.id.substr(6),
            n = a.split("_");
        ajax.post("al_fave.php", {
            act: "unfave_link",
            type: n[0],
            owner_id: n[1],
            item_id: n[2],
            hash: r
        }, {
            onDone: function(e, r) {
                e && (ge("link" + a).innerHTML = r)
            },
            onFail: function() {},
            showProgress: function() {
                hide("unfave" + a), show("unfave_progress" + a)
            },
            hideProgress: function() {
                hide("unfave_progress" + a), show("unfave" + a)
            }
        })
    },
    showMore: function(e, r) {
        cur.disableAutoMore = !1, r = r || !1;
        var a = ge("fave_rows_next_" + e);
        if (faveRows = domPN(a), !r && a)
            for (; a.firstChild;) faveRows.insertBefore(a.firstChild, a), r = !0;
        if (!cur.isListLoading) {
            var n = ge("show_more_" + e),
                o = !1,
                s = function(e) {
                    e.keyCode == KEY.ESC && (o = !0)
                };
            addEvent(document, "keyup", s), ajax.post("al_fave.php", {
                act: "load",
                section: cur.section,
                offset: intval(cur.faveData[e + "Offset"]),
                part: 1
            }, {
                onDone: function(i, t, c) {
                    if (removeEvent(document, "keyup", s), o) return void(cur.disableAutoMore = !0);
                    if (i) {
                        var u, l = ce("div"),
                            v = r ? a : faveRows;
                        for (l.innerHTML = i, r || v.removeChild(a); u = l.firstChild;) v.appendChild(u);
                        r || v.appendChild(a)
                    }
                    t ? hide(n) : show("show_more_" + e), cur.faveData[e + "Offset"] = c
                },
                showProgress: function() {
                    cur.isListLoading = !0, lockButton(n)
                },
                hideProgress: function() {
                    cur.isListLoading = !1, unlockButton(n)
                },
                cache: 1
            })
        }
    },
    scrollCheck: function() {
        if (!(browser.mobile || cur.isListLoading || cur.disableAutoMore || (cur.section || "").indexOf("likes_"))) {
            var e = ge("show_more_" + cur.section);
            if (isVisible(e)) {
                var r = document.documentElement,
                    a = window.innerHeight || r.clientHeight || bodyNode.clientHeight,
                    n = scrollGetY();
                n + a + 200 > e.offsetTop && Fave.showMore(cur.section)
            }
        }
    },
    searchSummary: function(e) {
        var r = e.length;
        val("users" == cur.section ? "fave_users_count" : "fave_users_online_count", r);
        var a = ge("fave_list_empty_" + cur.section);
        if (0 == r) {
            var n = cur.lang.fave_search_query_not_found,
                o = ge("fave_search").value.replace(/([<>&#]*)/g, "");
            a.innerHTML = n.replace("{search}", "<b>" + o + "</b>"), show(a)
        } else hide(a)
    },
    drawUsers: function(e, r) {
        if (e) {
            this.searchSummary(e);
            var a = ge("users" == cur.section ? "users_content" : "users_online_content");
            a.innerHTML = "";
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                if (a.innerHTML += cur.faveData.userRows[o.id], n > 28) {
                    setTimeout(function() {
                        for (var r = "", o = n + 1; o < e.length; o++) {
                            var s = e[o];
                            r += cur.faveData.userRows[s.id]
                        }
                        a.innerHTML += r
                    }, 0);
                    break
                }
            }
            if (r && r.length > 0) {
                cur.selection = {
                    re: new RegExp("(" + r.replace(cur.vIndex.delimiter, "|") + ")", "gi"),
                    val: "<em>$1</em>"
                };
                var s = geByClass("fans_fan_name", "users" == cur.section ? "users_content" : "users_online_content");
                for (var n in s) {
                    var i = geByClass1("mem_link", s[n]);
                    i && (i.innerHTML = i.innerHTML.replace(cur.selection.re, cur.selection.val))
                }
            }
        }
    },
    updateList: function() {
        var e = val("fave_search").toLowerCase();
        if (e = trim(e), 0 == e.length) return cur.prevQuery && cur.prevQuery.length > 0 && (Fave.drawUsers(cur.faveData.faveUsers), show(ge("users_online"))), cur.prevQuery = e, void("users" == cur.section && cur.faveSorter && cur.faveSorter.disable());
        cur.prevQuery = e, cur.faveSorter && cur.faveSorter.enable();
        var r = cur.vIndex.search(e);
        Fave.drawUsers(r, e)
    },
    indexAll: function(e) {
        var r = cur.faveData.faveUsers;
        cur.vIndex = new vkIndexer(r, function(e) {
            return e.name
        }.bind(this), function() {
            e && e()
        })
    },
    reorderFave: function(e, r, a) {
        var n = e.getAttribute("data-id"),
            o = r ? r.getAttribute("data-id") : null,
            s = a ? a.getAttribute("data-id") : null;
        ajax.post("al_fave.php", {
            act: "reorder_users",
            uid: n,
            before: o,
            after: s
        })
    },
    init: function() {
        extend(cur, {
            module: "fave",
            bigphCache: {},
            bigphShown: {},
            _back: {
                text: getLang("fave_return_to_fave"),
                show: [],
                hide: [function() {
                    for (var e in cur.bigphShown) animate(cur.bigphShown[e], {
                        marginTop: 100
                    }, 0);
                    cur.bigphShown = {}
                }],
                loc: !1
            }
        }), Fave.scrollNode = browser.msie6 ? pageNode : window, addEvent(Fave.scrollNode, "scroll", Fave.scrollCheck), addEvent(window, "resize", Fave.scrollCheck), cur.destroy.push(function() {
            removeEvent(Fave.scrollNode, "scroll", Fave.scrollCheck), removeEvent(window, "resize", Fave.scrollCheck)
        }), "users" != cur.section && "users_online" != cur.section || ge("empty_users") || this.indexAll();
        var e = ge("fave_search");
        ("users" == cur.section || "users_online" == cur.section) && elfocus(e), cur.faveData.faveUsers && cur.faveData.faveUsers.length > 0 && "users" == cur.section && Fave.initSorter(), setTimeout(Fave.scrollCheck, 0)
    },
    removeTip: function(e) {
        showTooltip(e, {
            text: getLang("fave_delete"),
            shift: [8, 5, 5],
            black: 1
        })
    },
    initSorter: function() {
        cur.faveSorter = new GridSorter("users_content", "fans_fan_img", {
            onReorder: Fave.reorderFave
        })
    },
    remove: function(e, r, a, n, o) {
        return e.tt && e.tt.destroy && e.tt.destroy(), showFastBox({
            title: getLang("global_warning"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("fave_sure_delete").replace("{user}", a), getLang("global_delete"), function() {
            isVisible(curBox().progress) || ajax.post("al_fave.php", {
                act: "unfave_user",
                uid: r,
                hash: n
            }, {
                onDone: function() {
                    val("fave_search", ""), cur.prevQuery = "";
                    for (var a = 0, n = cur.faveData.faveUsers.length; n > a; ++a)
                        if (cur.faveData.faveUsers[a].id == r) {
                            cur.faveData.faveUsers.splice(a, 1);
                            break
                        }
                    if (!cur.faveData.faveUsers.length) return nav.reload();
                    Fave.indexAll(), Fave.searchSummary(cur.faveData.faveUsers);
                    var o = gpeByClass("fans_fan_row", e);
                    re(o), curBox().hide()
                },
                progress: curBox().progress
            })
        }, getLang("global_cancel")), cancelEvent(o)
    },
    removeArticle: function(e, r, a) {
        addClass(e, "removed"), ajax.post("al_fave.php", {
            act: "defave_article",
            link: r,
            hash: a
        }, {
            onFail: removeClass.pbind(e, "removed")
        })
    },
    restoreArticle: function(e, r, a) {
        removeClass(e, "removed"), ajax.post("al_fave.php", {
            act: "enfave_article",
            link: r,
            hash: a
        }, {
            onFail: addClass.pbind(e, "removed")
        })
    }
};
try {
    stManager.done("fave.js")
} catch (e) {}