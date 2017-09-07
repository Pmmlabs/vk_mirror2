var FullWall = {
    failed: function(e) {
        return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0) : void 0
    },
    go: function(e, o) {
        return nav.go(e, o, {
            onFail: FullWall.failed
        })
    },
    scrollCheck: function(e, o) {
        var a, t, l, n, r = lastWindowHeight,
            i = 0,
            s = [];
        if (domPN(cur.topRow) != cur.pgCont && (cur.topRow = domFC(cur.pgCont)), vk.id && cur.topRow && !((window.curNotifier || {}).idle_manager || {}).is_idle) {
            for (postsUnseen = [], t = domPS(cur.topRow); t; t = domPS(t)) cur.topRow.offsetTop > o && (cur.topRow = t), t.unseen || (t.unseen = !0, postsUnseen.push(FullWall.postsGetRaws(t)));
            for (Page.postsUnseen(postsUnseen), t = cur.topRow; t && (a = i ? i : t.offsetTop, !(a >= o + r)); t = l) l = domNS(t), i = l ? l.offsetTop : a + t.offsetHeight, o > i && l && (cur.topRow = l), LongView && LongView.register(t, "FullWall"), n = t.bits || 0, n >= 3 || (n |= (a >= o && o + r > a ? 1 : 0) | (i >= o && o + r > i ? 2 : 0)) && (t.bits = n, 3 == n && s.push(FullWall.postsGetRaws(t)));
            LongView && LongView.onScroll(o, r), Page.postsSeen(s)
        }
    },
    postsGetRaws: function(e) {
        var o, a = indexOf(domPN(e).children, e),
            t = {};
        if ("block_" === e.id.substr(0, 6)) {
            t[e.id] = 1;
            var l = attr(e, "data-contain");
            l && (l = l.split(","), l.forEach(function(e) {
                e = e.split(":"), t[e[0]] = intval(e[1]) || 1
            }))
        } else(o = e.id.match(new RegExp("^post(" + cur.oid + "_\\d+)$", ""))) && (t[o[1]] = 1, (o = (e.getAttribute("data-copy") || "").match(/^(-?\d+_\d+)$/)) && (t[o[1]] = -1));
        return t.index = a, t.module = cur.module, t
    },
    init: function(e, o) {
        extend(cur, {
            options: e,
            module: "wall",
            pgStart: e.start,
            pgOffset: e.offset,
            pgCount: e.count,
            pgPerPage: e.per_page,
            pgCont: ge("page_wall_posts"),
            pgMore: ge("fw_load_more"),
            pgPages: ge("fw_pages"),
            pgMorePrg: ge("fw_more_progress"),
            pgPreload: o,
            pgUrl: e.url,
            pgOnScroll: FullWall.scrollCheck,
            pgParams: e.params,
            pgHref: e.href,
            pgPostProcess: FullWall.loadedPosts,
            pgNoArrowNav: FullWall.noArrowNav,
            pgNoNavScroll: !0,
            oid: e.owner_id,
            postTo: e.owner_id
        }), wall.init(e), (!e.wall_type || "cards" != e.wall_type && "supp" != e.wall_type && "restore" != e.wall_type && "phone_info" != e.wall_type && !nav.objLoc.postponed) && Pagination.init(), cur.destroy.push(Pagination.deinit), e.with_id || (wall.initUpdates(e.add_queue_key), (!e.wall_type || "cards" != e.wall_type && "supp" != e.wall_type && "restore" != e.wall_type && "phone_info" != e.wall_type) && cur.nav.push(function(e, o, a) {
            var t = e.own;
            return delete e.own, delete e.offset, isEmpty(e) && void 0 !== t ? (ajax.post("al_wall.php", {
                act: "s",
                owner_id: cur.oid,
                own: a.own || void 0,
                q: a.q || void 0,
                lnav: 1,
                offset: a.offset || void 0
            }, {
                onDone: function(e, o, t, l, n, r, i, s, c, d) {
                    ge("fw_summary_wrap").innerHTML = e, Pagination.deinit(), extend(cur, {
                        pgStart: n,
                        pgOffset: r,
                        pgCount: s,
                        pgParams: a.own ? {
                            own: 1
                        } : !1,
                        pgHref: l,
                        pgPages: ge("fw_pages"),
                        pgPreload: c
                    }), toggle(cur.pgMore, s > r + cur.pgPerPage), wall.cancelEdit();
                    var p = ge("page_wall_posts");
                    p.innerHTML = o, each(geByTag("textarea", p), function() {
                        placeholderSetup(this, {
                            fast: 1
                        })
                    }), Pagination.init(), wall.initUpdates(d);
                    for (var u in t) cur.options.reply_names[u] = t[u];
                    cur.wallType = "full_" + (a.own ? "own" : "all"), nav.setLoc(a), scrollToTop()
                },
                showProgress: function() {
                    hide("fw_search_toggler")
                },
                hideProgress: function() {
                    show("fw_search_toggler"), window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge("narrow_column")))
                },
                onFail: FullWall.failed
            }), !1) : void 0
        }))
    },
    loadedPosts: function(e, o, a, t, l, n, r) {
        if (n) each(geByTag("textarea", cur.pgCont), function() {
            placeholderSetup(this, {
                fast: 1
            })
        }), wall.cancelEdit();
        else {
            for (var i = (cur.pgCont.childNodes.length, 0), s = cur.pgCont.lastChild; s && ++i <= cur.pgPerPage; s = s.previousSibling) placeholderSetup(geByTag1("textarea", s), {
                fast: 1
            });
            r = t
        }
        for (var c in r) cur.options.reply_names[c] = r[c];
        FullWall.updateSummary(e)
    },
    updateSummary: function(e) {
        ge("fw_summary").innerHTML = e ? langNumeric(e, "%s", !0) : ""
    },
    noArrowNav: function() {
        return cur.__focused || (ge("own_reply_field") || {}).focused || cur.editingPost
    },
    initOnePost: function(e, o) {
        var a = e.post_raw;
        Page.postsSeen(e.seen), extend(cur, {
            onepost: !0,
            options: e,
            module: "wall",
            docked: !1,
            pgStart: e.start,
            pgOffset: e.offset,
            pgCount: e.count,
            pgPerPage: e.per_page,
            pgCont: ge("replies" + a),
            pgMore: ge("fw_load_more"),
            pgPages: ge("fw_pages"),
            pgPreload: o,
            pgUrl: e.url,
            pgParams: e.params,
            pgHref: e.href,
            pgPostProcess: FullWall.loadedReplies,
            pgOnScroll: FullWall.onePostOnScroll,
            pgNoArrowNav: FullWall.noArrowNav,
            pgNoNavScroll: !0,
            oid: e.owner_id,
            pid: e.post_id,
            nid: e.note_id,
            named: {
                replies: ge("fw_one_replies_wrap")
            },
            wallUploadOpts: e.upload
        }), wall.init(e), Pagination.init(e.scroll), FullWall.onePostOnScroll(), cur.destroy.push(Pagination.deinit), wall.initUpdates(e.add_queue_key)
    },
    scrollToEnd: function() {
        var e = cur.addBlockTop + cur.addBlockHeight + 20 - lastWindowHeight;
        scrollGetY() < e && Pagination.setScroll(e)
    },
    onePostOnScroll: function(e, o) {
        var a = cur.options.post_raw || "",
            t = ge("reply_box_wrap" + a),
            l = t && domFC(t);
        if (l) {
            (o === !1 || void 0 === o) && (o = scrollGetY()), cur.addBlockTop = getXY(t)[1], cur.addBlockHeight = getSize(l)[1];
            var n = o + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight,
                r = n ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null,
                i = Math.min(0, o + lastWindowHeight - getXY("fw_replies_header")[1] - cur.addBlockHeight);
            setStyle(l, {
                marginLeft: r,
                bottom: i
            }), n ? (e && cur.docked || setStyle(t, "height", cur.addBlockHeight), cur.docked || (setStyle(l, "width", getSize(t)[0]), addClass(l, "fixed"), cur.docked = !0)) : cur.docked && (setStyle(l, {
                width: null,
                marginLeft: null
            }), setStyle(t, "height", ""), removeClass(l, "fixed"), cur.docked = !1)
        }
    },
    onReplySent: function(e, o, a, t, l, n, r) {
        cur.wallMyReplied[cur.oid + "_" + cur.pid] = 0, Pagination.loaded.apply(window, arguments), setTimeout(FullWall.scrollToEnd, 0), l && t && nav.setLoc(extend(nav.objLoc, {
            offset: t
        }))
    },
    loadedReplies: function(e, o, a, t, l, n, r) {
        n || (r = t);
        for (var i in r) cur.options.reply_names[i] = r[i];
        FullWall.onePostOnScroll(), FullWall.repliesSummary(e)
    },
    repliesSummary: function(e) {
        var o = ge("fw_summary");
        o && (o.innerHTML = e ? getLang("wall_n_replies", e) : getLang("wall_no_replies"), show(o.parentNode))
    },
    addTetaTet: function(e, o) {
        var a = {
            own_reply_link: "",
            tet_a_tet: ""
        };
        return o[9] && o[9] != o[2].split("_")[0] && cur.wallTpl.tet_a_tet ? a.tet_a_tet = cur.wallTpl.tet_a_tet.replace("%from_uid%", o[9]) : a.own_reply_link = cur.wallTpl.own_reply_link.replace("%post_id%", o[2]), a
    },
    notePart: function(e, o) {
        hide(e), show(o)
    },
    subscribe: function(e, o, a, t) {
        if (!actionsMenuItemLocked(e)) {
            var l = intval(e.getAttribute("data-value")) ? 1 : 0,
                n = {
                    showProgress: lockActionsMenuItem.pbind(e),
                    hideProgress: unlockActionsMenuItem.pbind(e),
                    onFail: function(e) {
                        setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3)
                    }
                };
            if (o > 0) ajax.post("al_friends.php", {
                act: l ? "remove" : "add",
                mid: o,
                hash: a,
                from: "wall_one"
            }, extend(n, {
                onDone: function(o) {
                    val(e, o), e.setAttribute("data-value", 1 - l)
                }
            }));
            else {
                var r = function(t) {
                    ajax.post("al_groups.php", {
                        act: l ? "list_leave" : "list_enter",
                        gid: -o,
                        hash: a,
                        confirm: t
                    }, extend(n, {
                        onDone: function(o, a, t) {
                            if (a) {
                                var n = showFastBox(getLang("global_warning"), a, getLang("group_leave_group"), function() {
                                    n.hide(), r(1)
                                }, getLang("global_cancel"));
                                return !0
                            }
                            val(e, o), e.setAttribute("data-value", 1 - l), t && (re(domNS(e)), re(e))
                        }
                    }))
                };
                r()
            }
        }
    },
    doSearch: function(e, o) {
        uiSearch.showProgress(e), nav.objLoc[0].split("/").length > 1 ? nav.change({
            0: "wall" + cur.oid,
            q: o || !1,
            search: !o && 1,
            offset: !1
        }) : nav.change({
            q: o || !1,
            search: !o && 1,
            offset: !1,
            own: !1
        })
    },
    calendar: function() {
        stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
            cur.wallDP || (cur.wallSD = val("wall_datesearch"), cur.wallDP = new Datepicker(ge("wall_datesearch"), {
                width: 140,
                resfmt: "plain",
                addRows: nav.objLoc.day ? '<tr><td class="wall_cal_clear" colspan="7"><a onclick="uiSearch.showProgress(\'wall_search\'); nav.change({day: false, offset: false, search: nav.objLoc.q ? false : 1})" id="wall_cal_clear_lnk">' + getLang("wall_clear_date_filter") + "</a></td></tr>" : "",
                onUpdate: function() {
                    if (cur.wallSD != val("wall_datesearch")) {
                        var e = val("wall_datesearch").split(".");
                        uiSearch.showProgress("wall_search"), nav.change({
                            day: (e[0] < 10 ? "0" : "") + e[0] + (e[1] < 10 ? "0" : "") + e[1] + e[2],
                            search: !1,
                            offset: !1
                        })
                    }
                }
            })), triggerEvent(geByClass1("datepicker_control", ge("wall_datesearch_cont")), "mousedown", !1, !0)
        })
    }
};
try {
    stManager.done("wall.js")
} catch (e) {}