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
        var l, a, t, r, n = lastWindowHeight,
            i = 0,
            s = [];
        if (domPN(cur.topRow) != cur.pgCont && (cur.topRow = domFC(cur.pgCont)), vk.id && cur.topRow && !((window.curNotifier || {}).idle_manager || {}).is_idle) {
            var c = [];
            for (a = domPS(cur.topRow); a; a = domPS(a)) cur.topRow.offsetTop > o && (cur.topRow = a), a.unseen || (a.unseen = !0, c.push(FullWall.postsGetRaws(a)));
            for (Page.postsUnseen(c), a = cur.topRow; a && (l = i ? i : a.offsetTop, !(l >= o + n)); a = t) t = domNS(a), i = t ? t.offsetTop : l + a.offsetHeight, o > i && t && (cur.topRow = t), LongView && LongView.register(a, "FullWall"), r = a.bits || 0, r >= 3 || (r |= (l >= o && o + n > l ? 1 : 0) | (i >= o && o + n > i ? 2 : 0)) && (a.bits = r, 3 == r && s.push(FullWall.postsGetRaws(a)));
            LongView && LongView.onScroll(o, n), Page.postsSeen(s)
        }
    },
    postsGetRaws: function(e) {
        var o, l = indexOf(domPN(e).children, e),
            a = {};
        if ("block_" === e.id.substr(0, 6)) {
            a[e.id] = 1, a.block = e.id.substr(6);
            var t = attr(e, "data-contain");
            t && (t = t.split(","), t.forEach(function(e) {
                e = e.split(":"), a[e[0]] = intval(e[1]) || 1
            }))
        } else(o = e.id.match(new RegExp("^post(" + cur.oid + "_\\d+)$", ""))) && (a[o[1]] = 1, (o = (e.getAttribute("data-copy") || "").match(/^(-?\d+_\d+)$/)) && (a[o[1]] = -1));
        a.index = l, a.module = cur.module;
        var r = e.getAttribute("post_view_hash");
        return r && (a.hash = r), a
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
            articleConvert: e.article_convert_suggest,
            articleConvertThreshold: e.article_convert_threshold,
            oid: e.owner_id,
            postTo: e.owner_id
        }), wall.init(e), (!e.wall_type || "cards" != e.wall_type && "supp" != e.wall_type && "restore" != e.wall_type && "phone_info" != e.wall_type && !nav.objLoc.postponed) && Pagination.init(), cur.destroy.push(Pagination.deinit), e.with_id || (wall.initUpdates(e.add_queue_key), (!e.wall_type || "cards" != e.wall_type && "supp" != e.wall_type && "restore" != e.wall_type && "phone_info" != e.wall_type) && cur.nav.push(function(e, o, l) {
            var a = e.own;
            return delete e.own, delete e.offset, isEmpty(e) && void 0 !== a ? (ajax.post("al_wall.php", {
                act: "s",
                owner_id: cur.oid,
                own: l.own || void 0,
                q: l.q || void 0,
                lnav: 1,
                offset: l.offset || void 0
            }, {
                onDone: function(e, o, a, t, r, n, i, s, c, d) {
                    ge("fw_summary_wrap").innerHTML = e, Pagination.deinit(), extend(cur, {
                        pgStart: r,
                        pgOffset: n,
                        pgCount: s,
                        pgParams: l.own ? {
                            own: 1
                        } : !1,
                        pgHref: t,
                        pgPages: ge("fw_pages"),
                        pgPreload: c
                    }), toggle(cur.pgMore, s > n + cur.pgPerPage), wall.cancelEdit();
                    var p = ge("page_wall_posts");
                    p.innerHTML = o, each(geByTag("textarea", p), function() {
                        placeholderSetup(this, {
                            fast: 1
                        })
                    }), Pagination.init(), wall.initUpdates(d);
                    for (var u in a) cur.options.reply_names[u] = a[u];
                    cur.wallType = "full_" + (l.own ? "own" : "all"), nav.setLoc(l), scrollToTop()
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
    loadedPosts: function(e, o, l, a, t, r, n) {
        if (r) each(geByTag("textarea", cur.pgCont), function() {
            placeholderSetup(this, {
                fast: 1
            })
        }), wall.cancelEdit();
        else {
            for (var i = (cur.pgCont.childNodes.length, 0), s = cur.pgCont.lastChild; s && ++i <= cur.pgPerPage; s = s.previousSibling) placeholderSetup(geByTag1("textarea", s), {
                fast: 1
            });
            n = a
        }
        for (var c in n) cur.options.reply_names[c] = n[c];
        FullWall.updateSummary(e)
    },
    updateSummary: function(e) {
        ge("fw_summary").innerHTML = e ? langNumeric(e, "%s", !0) : ""
    },
    noArrowNav: function() {
        return cur.__focused || (ge("own_reply_field") || {}).focused || cur.editingPost
    },
    initOnePost: function(e, o) {
        var l = e.post_raw;
        e.view_hash && !window._postsViewHash && (window._postsViewHash = e.view_hash), Page.postsSeen(e.seen), extend(cur, {
            onepost: !0,
            options: e,
            module: "wall",
            docked: !1,
            pgStart: e.start,
            pgOffset: e.offset,
            pgCount: e.count,
            pgPerPage: e.per_page,
            pgCont: ge("replies" + l),
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
        var l = cur.options.post_raw || "",
            a = ge("reply_box_wrap" + l),
            t = a && domFC(a);
        if (t) {
            (o === !1 || void 0 === o) && (o = scrollGetY()), cur.addBlockTop = getXY(a)[1], cur.addBlockHeight = getSize(t)[1];
            var r = o + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight,
                n = r ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null,
                i = Math.min(0, o + lastWindowHeight - getXY("fw_replies_header")[1] - cur.addBlockHeight);
            setStyle(t, {
                marginLeft: n,
                bottom: i
            }), r ? (e && cur.docked || setStyle(a, "height", cur.addBlockHeight), cur.docked || (setStyle(t, "width", getSize(a)[0]), addClass(t, "fixed"), cur.docked = !0)) : cur.docked && (setStyle(t, {
                width: null,
                marginLeft: null
            }), setStyle(a, "height", ""), removeClass(t, "fixed"), cur.docked = !1)
        }
    },
    onReplySent: function(e, o, l, a, t, r, n) {
        cur.wallMyReplied[cur.oid + "_" + cur.pid] = 0, Pagination.loaded.apply(window, arguments), setTimeout(FullWall.scrollToEnd, 0), t && a && nav.setLoc(extend(nav.objLoc, {
            offset: a
        }))
    },
    loadedReplies: function(e, o, l, a, t, r, n) {
        r || (n = a);
        for (var i in n) cur.options.reply_names[i] = n[i];
        FullWall.onePostOnScroll(), FullWall.repliesSummary(e)
    },
    repliesSummary: function(e) {
        var o = ge("fw_summary");
        o && (o.innerHTML = e ? getLang("wall_n_replies", e) : getLang("wall_no_replies"), show(o.parentNode), Likes.update("wall" + cur.oid + "_" + cur.pid, {
            comment_num: e
        }))
    },
    addTetaTet: function(e, o) {
        var l = {
            own_reply_link: "",
            tet_a_tet: ""
        };
        return o[9] && o[9] != o[2].split("_")[0] && cur.wallTpl.tet_a_tet ? l.tet_a_tet = cur.wallTpl.tet_a_tet.replace("%from_uid%", o[9]) : l.own_reply_link = cur.wallTpl.own_reply_link.replace("%post_id%", o[2]), l
    },
    notePart: function(e, o) {
        hide(e), show(o)
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