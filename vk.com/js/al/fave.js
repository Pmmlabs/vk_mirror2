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
            n = curBox();
        return r ? (cur.lnkSent = r, void ajax.post("al_fave.php", {
            act: "get_link_info",
            lnk: r,
            hash: cur.fave_hash
        }, {
            onDone: function(n, a, o, s) {
                return r != cur.lnkSent ? !1 : (Fave.hideMessage(), 0 > n ? (Fave.showMessage(a, !0), elfocus(e)) : (cur.lnk = a, ge("fave_al_link_info").innerHTML = o, placeholderInit("fave_al_position"), elfocus("fave_al_position"), void 0))
            },
            progress: n.progress
        })) : elfocus(e)
    },
    showMessage: function(e, r) {
        var n = curBox() ? ge("fave_edit_box_msg") : ge("fave_edit_msg"),
            a = domFC(n);
        a && (a.innerHTML = e, n.className = r ? "info" == r ? "msg info_msg" : "msg error" : "msg ok_msg", show(n))
    },
    hideMessage: function() {
        var e = curBox() ? ge("fave_edit_box_msg") : ge("fave_edit_msg");
        hide(e)
    },
    doAddLink: function(e) {
        var r = curBox(),
            n = ge("fave_al_position");
        if (e || !isVisible(r.progress)) {
            var a = val(n);
            ajax.post("al_fave.php", {
                act: "add_link",
                link: cur.lnk,
                desc: a,
                hash: cur.fave_hash
            }, {
                onDone: function(e, n) {
                    if (e) {
                        var a, o;
                        ge("empty_links") ? (o = ge("empty_links"), a = o.parentNode) : ge("links") && (o = ge("links"), a = o.parentNode), a.removeChild(o), a.innerHTML += n, r.hide()
                    } else Fave.showMessage(n, !0)
                },
                onFail: function() {},
                progress: r.progress
            })
        }
    },
    deleteLink: function(e, r) {
        window.tooltips && tooltips.hideAll();
        var n = e.id.substr(6),
            a = n.split("_");
        ajax.post("al_fave.php", {
            act: "unfave_link",
            type: a[0],
            owner_id: a[1],
            item_id: a[2],
            hash: r
        }, {
            onDone: function(e, r) {
                e && (ge("link" + n).innerHTML = r)
            },
            onFail: function() {},
            showProgress: function() {
                hide("unfave" + n), show("unfave_progress" + n)
            },
            hideProgress: function() {
                hide("unfave_progress" + n), show("unfave" + n)
            }
        })
    },
    showMore: function(e, r) {
        cur.disableAutoMore = !1, r = r || !1;
        var n = ge("fave_rows_next_" + e);
        if (faveRows = domPN(n), !r && n)
            for (; n.firstChild;) faveRows.insertBefore(n.firstChild, n), r = !0;
        if (!cur.isListLoading) {
            var a = ge("show_more_" + e),
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
                            v = r ? n : faveRows;
                        for (l.innerHTML = i, r || v.removeChild(n); u = l.firstChild;) v.appendChild(u);
                        r || v.appendChild(n)
                    }
                    t ? hide(a) : show("show_more_" + e), cur.faveData[e + "Offset"] = c
                },
                showProgress: function() {
                    cur.isListLoading = !0, lockButton(a)
                },
                hideProgress: function() {
                    cur.isListLoading = !1, unlockButton(a)
                },
                cache: 1
            })
        }
    },
    scrollCheck: function() {
        if (!(browser.mobile || cur.isListLoading || cur.disableAutoMore || (cur.section || "").indexOf("likes_") && "articles" !== cur.section)) {
            var e = ge("show_more_" + cur.section);
            if (isVisible(e)) {
                var r = document.documentElement,
                    n = window.innerHeight || r.clientHeight || bodyNode.clientHeight,
                    a = scrollGetY();
                a + n + 200 > e.offsetTop && Fave.showMore(cur.section)
            }
        }
    },
    searchSummary: function(e) {
        var r = e.length;
        val("users" == cur.section ? "fave_users_count" : "fave_users_online_count", r);
        var n = ge("fave_list_empty_" + cur.section);
        if (0 == r) {
            var a = cur.lang.fave_search_query_not_found,
                o = ge("fave_search").value.replace(/([<>&#]*)/g, "");
            n.innerHTML = a.replace("{search}", "<b>" + o + "</b>"), show(n)
        } else hide(n)
    },
    drawUsers: function(e, r) {
        if (e) {
            this.searchSummary(e);
            var n = ge("users" == cur.section ? "users_content" : "users_online_content");
            n.innerHTML = "";
            for (var a = 0; a < e.length; a++) {
                var o = e[a];
                if (n.innerHTML += cur.faveData.userRows[o.id], a > 28) {
                    setTimeout(function() {
                        for (var r = "", o = a + 1; o < e.length; o++) {
                            var s = e[o];
                            r += cur.faveData.userRows[s.id]
                        }
                        n.innerHTML += r
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
                for (var a in s) {
                    var i = geByClass1("mem_link", s[a]);
                    i && (i.innerHTML = i.innerHTML.replace(cur.selection.re, cur.selection.val))
                }
            }
        }
    },
    updateList: function() {
        var e = val("fave_search").toLowerCase();
        if (e = trim(e), 0 == e.length) return cur.prevQuery && cur.prevQuery.length > 0 && (Fave.drawUsers(cur.faveData.faveUsers), show(ge("users_online"))), void(cur.prevQuery = e);
        cur.prevQuery = e;
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
        ("users" == cur.section || "users_online" == cur.section) && elfocus(e), setTimeout(Fave.scrollCheck, 0)
    },
    removeTip: function(e) {
        showTooltip(e, {
            text: getLang("fave_delete"),
            shift: [8, 5, 5],
            black: 1
        })
    },
    remove: function(e, r, n, a, o) {
        return e.tt && e.tt.destroy && e.tt.destroy(), showFastBox({
            title: getLang("global_warning"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("fave_sure_delete").replace("{user}", n), getLang("global_delete"), function() {
            isVisible(curBox().progress) || ajax.post("al_fave.php", {
                act: "unfave_user",
                uid: r,
                hash: a
            }, {
                onDone: function() {
                    val("fave_search", ""), cur.prevQuery = "";
                    for (var n = 0, a = cur.faveData.faveUsers.length; a > n; ++n)
                        if (cur.faveData.faveUsers[n].id == r) {
                            cur.faveData.faveUsers.splice(n, 1);
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
    removeArticle: function(e, r, n) {
        addClass(e, "removed"), ajax.post("al_fave.php", {
            act: "defave_article",
            link: r,
            hash: n
        }, {
            onFail: removeClass.pbind(e, "removed")
        })
    },
    restoreArticle: function(e, r, n) {
        removeClass(e, "removed"), ajax.post("al_fave.php", {
            act: "enfave_article",
            link: r,
            hash: n
        }, {
            onFail: addClass.pbind(e, "removed")
        })
    }
};
try {
    stManager.done("fave.js")
} catch (e) {}