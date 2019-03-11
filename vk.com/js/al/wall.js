var FullWall = {
    failed: function(e) {
        if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
    },
    go: function(e, o) {
        return nav.go(e, o, {
            onFail: FullWall.failed
        })
    },
    scrollCheck: function(e, o) {
        var l, t, a, r, n = lastWindowHeight,
            i = 0,
            s = [];
        if (domPN(cur.topRow) != cur.pgCont && (cur.topRow = domFC(cur.pgCont)), vk.id && cur.topRow && !((window.curNotifier || {}).idle_manager || {}).is_idle) {
            var c = [];
            for (t = domPS(cur.topRow); t; t = domPS(t)) cur.topRow.offsetTop > o && (cur.topRow = t), t.unseen || (t.unseen = !0, c.push(FullWall.postsGetRaws(t)));
            for (Page.postsUnseen(c), t = cur.topRow; t && !(o + n <= (l = i || t.offsetTop)); t = a)(i = (a = domNS(t)) ? a.offsetTop : l + t.offsetHeight) < o && a && (cur.topRow = a), LongView && LongView.register(t, "FullWall"), 3 <= (r = t.bits || 0) || (r |= (o <= l && l < o + n ? 1 : 0) | (o <= i && i < o + n ? 2 : 0)) && 3 == (t.bits = r) && s.push(FullWall.postsGetRaws(t));
            LongView && LongView.onScroll(o, n), Page.postsSeen(s)
        }
    },
    postsGetRaws: function(e) {
        var o, l = indexOf(domPN(e).children, e),
            t = {};
        if ("block_" === e.id.substr(0, 6)) {
            t[e.id] = 1, t.block = e.id.substr(6);
            var a = attr(e, "data-contain");
            a && (a = a.split(",")).forEach(function(e) {
                e = e.split(":"), t[e[0]] = intval(e[1]) || 1
            })
        } else(o = e.id.match(new RegExp("^post(" + cur.oid + "_\\d+)$", ""))) && (t[o[1]] = 1, (o = (e.getAttribute("data-copy") || "").match(/^(-?\d+_\d+)$/)) && (t[o[1]] = -1));
        t.index = l, t.module = cur.module;
        var r = e.getAttribute("post_view_hash");
        return r && (t.hash = r), t
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
        }), wall.init(e), e.wall_type && ("cards" == e.wall_type || "supp" == e.wall_type || "restore" == e.wall_type || "phone_info" == e.wall_type || nav.objLoc.postponed) || Pagination.init(), cur.destroy.push(Pagination.deinit), e.with_id || (wall.initUpdates(e.add_queue_key), (!e.wall_type || "cards" != e.wall_type && "supp" != e.wall_type && "restore" != e.wall_type && "phone_info" != e.wall_type) && (cur.nav.push(function(e, o, u) {
            var l = e.own;
            if (delete e.own, delete e.offset, isEmpty(e) && void 0 !== l) return ajax.post("al_wall.php", {
                act: "s",
                owner_id: cur.oid,
                own: u.own || void 0,
                q: u.q || void 0,
                lnav: 1,
                offset: u.offset || void 0
            }, {
                onDone: function(e, o, l, t, a, r, n, i, s, c) {
                    ge("fw_summary_wrap").innerHTML = e, Pagination.deinit(), extend(cur, {
                        pgStart: a,
                        pgOffset: r,
                        pgCount: i,
                        pgParams: !!u.own && {
                            own: 1
                        },
                        pgHref: t,
                        pgPages: ge("fw_pages"),
                        pgPreload: s
                    }), toggle(cur.pgMore, i > r + cur.pgPerPage), wall.cancelEdit();
                    var d = ge("page_wall_posts");
                    for (var p in d.innerHTML = o, each(geByTag("textarea", d), function() {
                            placeholderSetup(this, {
                                fast: 1
                            })
                        }), Pagination.init(), wall.initUpdates(c), cur.options.reply_names = extend({}, cur.options.reply_names), l) cur.options.reply_names[p] = l[p];
                    cur.wallType = "full_" + (u.own ? "own" : "all"), nav.setLoc(u), scrollToTop()
                },
                showProgress: function() {
                    hide("fw_search_toggler")
                },
                hideProgress: function() {
                    show("fw_search_toggler"), window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge("narrow_column")))
                },
                onFail: FullWall.failed
            }), !1
        }), ge("wall_search") && nav.objLoc.q && saveSearchAttemptStats("wall", 0, cur.options && cur.options.count)))
    },
    loadedPosts: function(e, o, l, t, a, r, n) {
        if (r) each(geByTag("textarea", cur.pgCont), function() {
            placeholderSetup(this, {
                fast: 1
            })
        }), wall.cancelEdit();
        else {
            cur.pgCont.childNodes.length;
            for (var i = 0, s = cur.pgCont.lastChild; s && ++i <= cur.pgPerPage; s = s.previousSibling) placeholderSetup(geByTag1("textarea", s), {
                fast: 1
            });
            n = t
        }
        for (var c in cur.options.reply_names = extend({}, cur.options.reply_names), n) cur.options.reply_names[c] = n[c];
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
            wallUploadOpts: e.upload,
            deepActive: hasClass(ge("post" + l), "deep_active") && !e.note_id
        }), wall.init(e), cur.deepActive ? (e.scroll && setTimeout(function() {
            scrollToY(e.scroll)
        }, 0), addEvent(window, "scroll", FullWall.onePostOnScroll), addEvent(window, "resize", FullWall.onePostOnScroll), cur.destroy.push(function() {
            removeEvent(window, "scroll", FullWall.onePostOnScroll), removeEvent(window, "resize", FullWall.onePostOnScroll)
        })) : (Pagination.init(e.scroll), cur.destroy.push(Pagination.deinit)), FullWall.onePostOnScroll(), wall.initUpdates(e.add_queue_key)
    },
    scrollToEnd: function() {
        var e = cur.addBlockTop + cur.addBlockHeight + 20 - lastWindowHeight;
        scrollGetY() < e && (cur.deepActive ? scrollToY(e, 0) : Pagination.setScroll(e))
    },
    onePostOnScroll: function(e, o) {
        var l = cur.options.post_raw || "",
            t = ge("reply_box_wrap" + l),
            a = t && domFC(t);
        if (a) {
            if (!1 !== o && void 0 !== o || (o = scrollGetY()), cur.addBlockTop = getXY(t)[1], cur.deepActive) {
                var r = ge("reply_fakebox" + l);
                if (r) {
                    cur.addBlockHeight = getSize(r)[1];
                    var n = getStyle(r, ["marginTop", "marginBottom"]);
                    cur.addBlockHeight += intval(n.marginTop) + intval(n.marginBottom)
                } else cur.addBlockHeight = getSize(a)[1]
            } else cur.addBlockHeight = getSize(a)[1];
            var i = o + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight,
                s = i ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null,
                c = Math.min(0, o + lastWindowHeight - getXY("fw_replies_header")[1] - cur.addBlockHeight);
            if (setStyle(a, {
                    marginLeft: s,
                    bottom: c
                }), i ? (e && cur.docked || setStyle(t, "height", cur.addBlockHeight), cur.docked || (setStyle(a, "width", getSize(t)[0]), addClass(a, "fixed"), cur.docked = !0)) : cur.docked && (setStyle(a, {
                    width: null,
                    marginLeft: null
                }), setStyle(t, "height", ""), removeClass(a, "fixed"), cur.docked = !1), cur.deepActive) {
                var d = ge("replies" + l),
                    p = domLC(d);
                if (p && hasClass(p, "replies_next") && isVisible(p)) getXY(p, !0)[1] < o + 500 && p.onclick()
            }
        }
    },
    onNewReplySent: function(e, o, l, t) {
        var a = cur.oid + "_" + cur.pid;
        cur.wallMyReplied[a] = 0;
        var r = ge("replies" + a);
        val(r, o);
        var n = ge("post" + a);
        wall.incReplyCounter(n, 1, e), wall.isDescRepliesOrder(a) ? scrollToY(getXY(r)[1] - 30) : setTimeout(FullWall.scrollToEnd, 0), extend(cur.options.reply_names, t), nav.setLoc(extend(nav.objLoc, {
            offset: l || null
        }))
    },
    onReplySent: function(e, o, l, t, a, r, n) {
        cur.wallMyReplied[cur.oid + "_" + cur.pid] = 0, Pagination.loaded.apply(window, arguments), setTimeout(FullWall.scrollToEnd, 0), a && t && nav.setLoc(extend(nav.objLoc, {
            offset: t
        }))
    },
    loadedReplies: function(e, o, l, t, a, r, n) {
        for (var i in r || (n = t), cur.options.reply_names = extend({}, cur.options.reply_names), n) cur.options.reply_names[i] = n[i];
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
        uiSearch.showProgress(e), 1 < nav.objLoc[0].split("/").length ? nav.change({
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
                addRows: nav.objLoc.day ? '<tr><td class="cal_clear" colspan="7"><a onclick="uiSearch.showProgress(\'wall_search\'); nav.change({day: false, offset: false, search: nav.objLoc.q ? false : 1})" id="wall_cal_clear_lnk">' + getLang("wall_clear_date_filter") + "</a></td></tr>" : "",
                onUpdate: function() {
                    if (cur.wallSD != val("wall_datesearch")) {
                        var e = val("wall_datesearch").split(".");
                        uiSearch.showProgress("wall_search"), nav.change({
                            day: (e[0] < 10 ? "0" : "") + e[0] + (e[1] < 10 ? "0" : "") + e[1] + e[2],
                            search: !1,
                            offset: !1
                        })
                    }
                },
                pastActive: !0,
                noFuture: !0
            })), triggerEvent(geByClass1("datepicker_control", ge("wall_datesearch_cont")), "mousedown", !1, !0)
        })
    }
};
try {
    stManager.done("wall.js")
} catch (e) {}