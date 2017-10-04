var Feed = {
    longView: {
        PERCENT: .5,
        DURATION_MS: 1e3,
        headerHeight: null,
        tracking: [],
        viewed: {},
        registerElement: function(e) {
            var t = feed.longView;
            return e ? e.longViewTracking ? !0 : e.longViewRegistered ? !1 : (e.longViewRegistered = !0, e.longViewTracking = t.isAutoplayAd(e), e.longViewTracking ? (t.tracking.push(e), !0) : !1) : !1
        },
        process: function(e, t) {
            var o = feed.longView,
                s = o.tracking;
            if (0 === s.length) return [];
            var r = o.PERCENT,
                i = o.DURATION_MS,
                n = o.isElemViewable,
                a = o.viewed,
                d = [];
            return each(s, function(o, s) {
                var c = domFC(s),
                    l = c.id;
                if (c && l) {
                    var u = domData(c, "ad-block-uid"),
                        f = "" + l;
                    if (u && (f += "_" + u), !a[f] && document.body.contains(s))
                        if (n(s, r, e, t)) {
                            var p = Date.now();
                            s.longViewStartedAt ? p - s.longViewStartedAt >= i && (a[f] = !0, d.push(feed.postsGetRaws(s))) : s.longViewStartedAt = Date.now()
                        } else s.longViewStartedAt = null
                }
            }), d
        },
        isAutoplayAd: function(e) {
            var t = e && domFC(e);
            return t && t.hasAttribute("data-ad-video-autoplay")
        },
        isElemViewable: function(e, t, o, s) {
            var r = feed.longView.getHeaderHeight(),
                i = o + r,
                n = o + s,
                a = e.offsetHeight,
                d = e.offsetTop + r,
                c = d + a,
                l = c > i && n > d ? (Math.min(n, c) - Math.max(i, d)) / a : 0;
            return l >= t
        },
        getHeaderHeight: function() {
            return feed.longView.headerHeight || (feed.longView.headerHeight = ge("page_header").offsetHeight)
        }
    },
    blockHideReason: function e(t, o) {
        if (e.progress) return !1;
        e.progress = !0;
        var s = "block_" + t,
            r = ge(s);
        delete cur.feedEntriesHTML[s], ajax.post("al_feed.php", {
            act: "a_block_hide_reason",
            block_id: t,
            reason: 0 | o,
            hash: attr(r, "data-hash"),
            ref: feed.getModuleRef(),
            pos: attr(r, "data-pos")
        }, {
            onDone: function(t) {
                e.progress = !1, t ? val(r, t) : hide(r)
            },
            hideProgress: function() {
                e.progress = !1
            }
        })
    },
    blockRestore: function(e) {
        var t = "block_" + e,
            o = ge(t);
        cur.feedEntriesHTML[t] && val(t, cur.feedEntriesHTML[t]), ajax.post("al_feed.php", {
            act: "a_block_restore",
            block_id: e,
            hash: attr(o, "data-hash"),
            ref: feed.getModuleRef(),
            pos: attr(o, "data-pos")
        })
    },
    blockHide: function(e, t) {
        if (!actionsMenuItemLocked(t)) {
            lockActionsMenuItem(t);
            var o = "block_" + e,
                s = ge(o),
                r = geByClass1("ui_actions_menu_wrap", s);
            ajax.post("al_feed.php", {
                act: "a_block_hide",
                block_id: e,
                hash: attr(s, "data-hash"),
                ref: feed.getModuleRef(),
                pos: attr(s, "data-pos")
            }, {
                onDone: function(e) {
                    uiActionsMenu.toggle(r, !1), cur.feedEntriesHTML[o] = val(s), val(s, e)
                },
                hideProgress: unlockActionsMenuItem.pbind(t)
            })
        }
    },
    videoRecomsBlockHideCancel: function() {
        ajax.post("/al_feed.php", {
            act: "a_video_recom_hide_cancel"
        }), feed.restorePost("video_recoms")
    },
    videoRecomsBlockHideReason: function(e, t) {
        re(geByClass1("feed_rb_video_reason_wrap")), show(geByClass1("feed_rb_video_reason_thankyou")), ajax.post("/al_feed.php", {
            act: "a_video_recom_hide_reason",
            reason: t,
            reason_hash: e
        })
    },
    expandVideosPost: function(e, t) {
        var o = geByClass1("page_post_sized_thumbs", domPN(t)),
            s = 0;
        each(o.children, function() {
            return !isVisible(this) && (show(this), s++, s > 5) ? !1 : void 0
        }), toggle(t, !isVisible(o.children[o.children.length - 1]))
    },
    closeVideoBlock: function(e) {
        ajax.post("al_feed.php", {
            act: "a_close_video_block",
            hash: e
        });
        var t = ge("feed_recommends");
        setStyle(t, {
            height: getSize(t)[1],
            opacity: 1
        }), setTimeout(function() {
            addClass(t, "recoms_hidden")
        })
    },
    update: function(e) {
        if (!cur.feedUpdateLoading && !(cur.add_queue && window.Notifier && Notifier.addKey(cur.add_queue, feed.updated) && "news" != cur.section || "feed" !== cur.module || "top" == cur.subsection || inArray(cur.section, ["search", "photos_search", "mentions", "articles", "articles_search", "likes", "recommended", "live"]))) {
            var t = Math.random();
            "news" != cur.section && "comments" != cur.section && t > .3 || "news" == cur.section && (e || t > .05) || (cur.feedUpdateLoading = !0, ajax.post("al_feed.php?au_" + cur.section, extend(feed.getSectionParams(cur.section), {
                timestamp: cur.timestamp,
                posted: e ? 1 : "",
                queue: cur.add_queue ? 1 : 0
            }), {
                onDone: function(t, o, s) {
                    if (cur.feedUpdateLoading = !1, 1 == e && (!o || -1 == o.indexOf(vk.id + ""))) return void setTimeout(feed.update.pbind(2), 2e3);
                    if (!("feed" !== cur.module || t.section != cur.section || t.timestamp < cur.timestamp || s < cur.timestamp)) {
                        t.count += cur.count;
                        var r, i, n, a, d = cur.rowsCont,
                            c = ce("div"),
                            l = 0;
                        if ("news" == cur.section) {
                            if (a = scrollGetY(), o) {
                                for (c.innerHTML = o; c.lastChild;) r = c.lastChild, d.insertBefore(r, d.firstChild), Wall.onPostLoaded(r, !0);
                                each(geByClass("ts" + s, d), function() {
                                    var e = this;
                                    l += this.offsetHeight, nodeUpdated(e), cur.feedUnreadCount++
                                })
                            }
                            l && a > 100 && scrollToY(a + l, 0, !1, !0)
                        } else if (o)
                            for (c.innerHTML = o; r = c.lastChild;)
                                if ("DIV" == r.tagName)
                                    if (n = r.firstChild.id.substr(4), n && cur.wallLayer == n) c.removeChild(r);
                                    else if (i = ge("post" + n)) {
                            if (!hasClass(i.parentNode, "feed_row")) return;
                            var u = ge("replies" + n),
                                f = u.nextSibling,
                                p = 0;
                            if (each([].slice.call(geByClass("reply", r, "div")), function() {
                                    ge(this.id) || (addClass(this, "new_reply"), u.appendChild(this), p++)
                                }), p) {
                                var _ = i.parentNode.offsetHeight,
                                    h = geByClass("new_reply", u, "div").length;
                                f && "replies_open" == f.className || (f = ce("div", {
                                    className: "replies_open",
                                    onclick: wall.openNewComments.pbind(n)
                                }), u.parentNode.insertBefore(f, u.nextSibling)), f.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, h)), f.newCnt = h;
                                var g = scrollGetY(),
                                    w = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                                    m = getXY(f)[1],
                                    v = i.parentNode.offsetHeight;
                                _ = v - _, inArray(n, cur.feedUnread) || cur.feedUnread.unshift(n), !cur.idleManager.isIdle && m > g + 100 && g + w + 100 > m ? (d.insertBefore(ge("post_ph" + n) || ce("div", {
                                    id: "post_ph" + n
                                }), d.firstChild), inArray(n, cur.feedToSort) || cur.feedToSort.push(n)) : (re(i.parentNode), d.insertBefore(i.parentNode, d.firstChild), m > g + w + 100 && (_ = v), _ && scrollToY(scrollGetY() + _, 0, !1, !0)), cur.feedUnreadCount += p
                            }
                            c.removeChild(r)
                        } else a = scrollGetY(), d.insertBefore(r, d.firstChild), Wall.onPostLoaded(r, !0), nodeUpdated(r), l = r.offsetHeight, a > 100 && scrollToY(a + l, 0, !1, !0);
                        else c.removeChild(r);
                        feed.applyOptions(t), feed.updateTitle()
                    }
                },
                onFail: function() {
                    return cur.feedUpdateLoading = !1, !1
                },
                showProgress: function() {
                    cur.feedUpdateLoading = !0
                },
                hideProgress: function() {
                    cur.feedUpdateLoading = !1
                }
            }))
        }
    },
    getNewQKey: function(e) {
        function t(t, s) {
            if (cur.section == r) {
                if (t) cur.add_queue = t, setTimeout(feed.update.pbind(0), 0);
                else if (!o.only_update) {
                    var i = s;
                    return void(cur.timestamp = (i || vkNow() / 1e3) - e)
                }
                isArray(s) && (cur.ignore_owners = s)
            }
        }
        var o = {
                act: "a_get_key",
                only_update: cur.add_queue ? 1 : 0,
                need_ignore: isArray(cur.ignore_owners) ? 0 : 1
            },
            s = {
                onDone: t,
                local: 1
            },
            r = cur.section;
        ajax.post("al_feed.php?queue", extend(feed.getSectionParams(cur.section), o), s)
    },
    updated: function(e, t) {
        if (("search" == cur.section || "news" == cur.section || !cur.section) && cur.add_queue && cur.add_queue.key == e) {
            if (t.failed) {
                cur.add_queue = !1;
                var o = curNotifier.error_timeout || 1;
                return clearTimeout(cur.lp_error_to), void(cur.lp_error_to = setTimeout(feed.getNewQKey.bind(feed).pbind(o), 1e3 * o))
            }
            if (isArray(t.events) && t.events.length) {
                cur.add_queue.ts = t.ts, t.key && (cur.add_queue.key = t.key);
                var s = scrollGetY(),
                    r = 0;
                each(t.events, function() {
                    r += feed.pushEvent(this.split("<!>"), s + getSize("page_header_cont")[1])
                });
                var i = scrollGetY();
                r && Math.abs(s - i) < 100 && (cur.leftMenuDelta = r, scrollToY(i + r, 0, !1, !0)), feed.updateTitle(), cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
            }
        }
    },
    needScrollPost: function(e, t) {
        return e + 80 > getXY(t)[1] || window.wkcur && wkcur.shown && "story" != wkcur.type || window.mvcur && mvcur.mvShown || window.pvcur && cur.pvShown
    },
    pushEvent: function(e, t) {
        var o = e[0],
            s = e[1],
            r = e[2],
            i = ge("post" + r),
            n = cur.section,
            a = "search" != n ? intval(e.pop()) : 0,
            d = 0,
            c = function(e) {
                return intval(getStyle(domByClass(e, "page_block"), "marginTop")) || intval(getStyle(domByClass(domNS(e), "page_block"), "marginTop")) || 15
            };
        if (!cur.options || o != cur.options.qversion) return 0;
        switch (s) {
            case "new_post":
                if (i) break;
                var l = 0;
                if (intval(e[11]) && intval(e[11]) != vk.id) return ajax.post("al_feed.php", {
                    act: "a_need_own_reply",
                    oid: intval(e[11])
                }, {
                    onDone: function(o) {
                        o && (e[11] = 0, feed.pushEvent(e, t))
                    }
                }), 0;
                if ("search" != n) {
                    var u = r.split("_")[0];
                    e[8] = intval(e[8]) > 0 && 4 == (4 & a) ? 1 : 0, 0 > u && (l = 8 & a ? 2 : 2 & a ? 1 : 0)
                }
                "search" == n && statlogsValueEvent("feed_switch", 0, "search_update", cur.options.q && "#" == cur.options.q.charAt(0) ? "hashtag" : "");
                var f, p, _, h, g, w, m = cur.rowsCont,
                    v = m.childNodes,
                    b = wall.getNewPostHTML(e, l, feed.feedPostRepl),
                    y = e[12],
                    C = "search" != n && (window._wf <= 0 || hasClass(cur.feedEls.wrap, "feed_has_new")),
                    k = layers && layers.visible && window.wkcur && "story" == wkcur.type;
                k && (C = !0);
                var P = !1,
                    x = b;
                if (C && (b = wall.updatePostImages(b)), y) {
                    if (cur.ignore_owners.length && inArray(intval(y), cur.ignore_owners)) break;
                    if (p = geByClass1("feed_reposts_wrap" + y, m, "div")) _ = geByClass1("feed_reposts_first", p, "div").firstChild, h = geByClass1("feed_reposts_group", p, "div"), g = geByClass1("feed_reposts_more_link", p, "a"), feed.needScrollPost(t, _) && (d -= _.offsetHeight + c(_)), _.parentNode.replaceChild(f = se(x), _), h.insertBefore(_, h.firstChild), isVisible(h) || val(g, getLang("news_show_X_reposts", h.childNodes.length)), p = p.parentNode, m.firstChild != p && m.insertBefore(p, m.firstChild), feed.needScrollPost(t, p) && (d += p.offsetHeight + c(p)), p.bits = 0;
                    else if ((w = geByClass("feed_repost" + y, m, "div")) && w.length) {
                        b = rs(cur.wallTpl.grouped_posts, {
                            place: y,
                            random: irand(1e8, 2e8),
                            first: b,
                            other: "",
                            label: getLang("news_show_X_reposts", w.length)
                        });
                        var S = se('<div class="feed_row' + (C ? "_unshown" : "") + '">' + b + "</div>"),
                            T = domFC(T);
                        m.insertBefore(S, m.firstChild), !C && feed.needScrollPost(t, S) && (d += S.offsetHeight + c(S)), P = !0, p = S.firstChild, f = geByClass1("feed_reposts_first", p, "div"), h = geByClass1("feed_reposts_group", p, "div"), each(clone(w), function() {
                            feed.needScrollPost(t, this) && (d -= this.offsetHeight + c(this)), re(this.parentNode), h.appendChild(this.firstChild)
                        })
                    } else f = se('<div class="feed_row' + (C ? "_unshown" : "") + '"><div class="feed_repost' + y + '">' + b + "</div></div>"), m.insertBefore(f, m.firstChild), P = !0, !C && feed.needScrollPost(t, f) && (d += f.offsetHeight + c(f))
                } else f = se('<div class="feed_row' + (C ? "_unshown" : "") + '">' + b + "</div>"), m.insertBefore(f, m.firstChild), P = !0, !C && feed.needScrollPost(t, f) && (d += f.offsetHeight + c(f));
                C && P && (cur.newPostsCount = cur.newPostsCount ? cur.newPostsCount + 1 : 1, cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount), addClass(cur.feedEls.wrap, "feed_has_new"), 1 == cur.newPostsCount && feed.needScrollPost(t, cur.feedEls.newPosts) && !k && (d += getSize(cur.feedEls.newPosts)[1])), AudioUtils.updateQueueReceivedPost(f), ge("post_poll_id" + r) && wall.updatePoll(r), cur.feedUnreadCount++, "search" != n && nodeUpdated(f), v.length > 300 ? m.removeChild(v[300]) : v.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty"), Wall.updateMentionsIndex();
                break;
            case "new_post_reply":
                if (i) break;
                var m = cur.rowsCont,
                    v = m.childNodes,
                    b = wall.getNewPostHTML(e, !1, feed.feedPostRepl),
                    f = se('<div class="feed_row">' + b + "</div>");
                m.insertBefore(f, m.firstChild), feed.needScrollPost(t, f) && (d += f.offsetHeight + c(f)), cur.feedUnreadCount++, v.length > 300 ? m.removeChild(v[300]) : v.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty");
                break;
            case "edit_post":
                var B, E = ge("wpt" + r);
                if (!isVisible(i) || !E) break;
                var L = geByClass1("wall_post_more", E);
                L && (L = isVisible(domNS(L))), (B = feed.needScrollPost(t, E)) && (d -= E.offsetHeight);
                var M = psr(rs(e[3], {
                        poll_hash: cur.wallTpl.poll_hash
                    })),
                    m = ge("post" + r);
                m && !isVisible(m.parentNode) && (M = wall.updatePostImages(M)), val(E, M), L && (L = geByClass1("wall_post_more", E), L && L.onclick()), ge("post_poll_id" + r) && wall.updatePoll(r), B && (d += E.offsetHeight), nodeUpdated(E);
                break;
            case "edit_reply":
                var N = e[3],
                    E = ge("wpt" + N);
                if (!isVisible("post" + N) || !E) break;
                var L = geByClass1("wall_reply_more", E);
                L && (L = isVisible(domNS(L))), updH = -E.offsetHeight, updY = getXY(E)[1], val(E, psr(e[4])), L && (L = geByClass1("wall_reply_more", E), L && L.onclick()), updH += E.offsetHeight, nodeUpdated(E);
                break;
            case "post_parsed_link":
                if (!i) break;
                var H = geByClass1("wall_postlink_preview_btn_disabled", i);
                if (!H) break;
                intval(e[3]) ? removeClass(H, "wall_postlink_preview_btn_disabled") : re(H);
                break;
            case "del_post":
                if (i) {
                    var R = domClosest("feed_row", i) || domClosest("feed_row_unshown", i) || i;
                    cur.wallMyDeleted[r] || (feed.needScrollPost(t, i) && (d -= i.offsetHeight + c(i)), revertLastInlineVideo(i), re(R)), cur.options.offset--, hasClass(cur.feedEls.wrap, "feed_has_new") && !isVisible(R) && (cur.newPostsCount--, cur.newPostsCount ? cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount) : removeClass(cur.feedEls.wrap, "feed_has_new"))
                }
                break;
            case "res_post":
                i && cur.options.offset++;
                break;
            case "new_reply":
                if (!i || cur.wallMyReplied[r] || ge("post" + e[3])) break;
                var j = ge("replies" + r),
                    A = ge("replies_wrap" + r),
                    D = i.offsetHeight,
                    u = r.split("_")[0],
                    l = 0 > u ? 8 & a ? 2 : 2 & a ? 1 : 0 : 0,
                    F = wall.getNewReplyHTML(e, l),
                    f = !1,
                    V = !1;
                if (isVisible(j) && isVisible(A) && !isVisible("reply_link" + r)) {
                    var q = j.nextSibling,
                        I = geByClass("new_reply", j, "div").length + 1;
                    if (cur.wallMyOpened[r]) {
                        q && "replies_open" == q.className && re(q), V = !0;
                        var U = geByClass1("wr_header", j, "a"),
                            O = geByClass("reply", j, "div").length + 1,
                            Y = O;
                        U && (Y = intval(U.getAttribute("offs").split("/")[1]) + 1), (Y > 5 || Y > O) && (U || j.insertBefore(U = ce("a", {
                            className: "wr_header"
                        }), j.firstChild), wall.updateRepliesHeader(r, U, O, Y))
                    } else F = wall.updatePostImages(F), f = se(F), addClass(f, "new_reply"), q && "replies_open" == q.className || (q = ce("div", {
                        className: "replies_open",
                        onclick: wall.openNewComments.pbind(r)
                    }), j.parentNode.insertBefore(q, j.nextSibling)), q.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, I)), q.newCnt = I
                } else re("reply_link" + r), show(A, j), V = !0;
                r.split("_")[0] == vk.id && cur.feedUnreadCount++, f || (f = se(F)), j.appendChild(f), feed.needScrollPost(t, V ? f : q) && (d += i.offsetHeight - D), V && nodeUpdated(f), Wall.repliesSideSetup(r), Wall.updateMentionsIndex();
                break;
            case "del_reply":
                if (!cur.wallMyDeleted[r] && i) {
                    feed.needScrollPost(t, i) && (d -= i.offsetHeight);
                    var W = i.parentNode.id.match(/replies(-?\d+_\d+)/);
                    revertLastInlineVideo(i), re(i), W && Wall.repliesSideSetup(W[1])
                }
                break;
            case "view_post":
                Wall.likeUpdate(!1, r, 0, Wall.formatCount(intval(e[3])), void 0, void 0, 1);
                break;
            case "like_post":
            case "like_reply":
                if (!i) break;
                var z = "like_reply" == s ? r.replace("_", "_wall_reply") : r,
                    G = i && domByClass(i, "_like_wrap"),
                    X = i && domByClass(i, "_share_wrap");
                wall.likeFullUpdate(G, z, {
                    like_my: G && hasClass(G, "my_like"),
                    like_num: e[3],
                    like_title: !1,
                    share_my: X && hasClass(X, "my_share"),
                    share_num: e[4],
                    share_title: !1
                });
                break;
            case "vote_poll":
                if (!ge("post_poll" + r)) break;
                wall.updatePollResults(r, e[3]);
                break;
            case "new_photos_private":
            case "new_photos":
            case "new_tagged":
        }
        return d
    },
    feedPostRepl: function(e, t) {
        e.replies = cur.wallTpl.post_replies;
        var o = {
            full_id: t[2],
            item_id: "wall_" + t[2],
            sec_name: stripHTML(t[3]),
            date: wall.getNowRelTime(),
            del: cur.wallTpl.spam
        };
        if ("search" == cur.section && cur.q) {
            var s = e.text || "",
                r = cur.q,
                i = r.toLowerCase().split(/[\s.,:;!?()]/),
                n = [];
            s = s.replace(/<(.|\n)+?>/g, function(e) {
                return n.push(e), ""
            });
            var a, d, c, l = s.toLowerCase();
            for (a = i.length - 1; a >= 0; a--)
                if (c = i[a], trim(c))
                    for (d = 0; - 1 != (d = l.indexOf(c, d));) s.charAt(d - 1) != String.fromCharCode(2) ? (s = s.substr(0, d) + "" + a + "" + s.substr(d + c.length), l = l.substr(0, d) + "" + a + "" + l.substr(d + c.length)) : d += 2;
            s = s.replace(/\x02(\d+)\x02/g, function(e, t) {
                return '<span class="highlight">' + i[t] + "</span>"
            }), s = s.replace(/\x01/g, function() {
                return n.shift() || ""
            }), o.text = s, "new_post_reply" == t[1] && (o.date_postfix = t[7])
        }
        return o
    },
    reSortItems: function() {
        cur.feedToSort && cur.feedToSort.length && (each(cur.feedToSort, function(e, t) {
            var o = ge("post_ph" + t),
                s = ge("post" + t).parentNode;
            o && s && (o.parentNode.insertBefore(s, o), re(o))
        }), cur.feedToSort = [], scrollToY(0, 0))
    },
    showNewPosts: function() {
        var e = cur.feedEls.newPosts;
        intval(getStyle(e, "marginTop"));
        removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0;
        var t = ge("feed_rows");
        Wall.loadPostImages(t), each(geByClass("feed_row_unshown", t, "div"), function() {
            replaceClass(this, "feed_row_unshown", "feed_row")
        })
    },
    updateTitle: function() {
        cur.idleManager && (cur.idleManager.isIdle || (cur.feedUnreadCount = 0), document.title = (cur.feedUnreadCount ? "(" + cur.feedUnreadCount + ") " : "") + cur.feedInitialTitle)
    },
    toggleTabsMenuTab: function(e, t) {
        var o = geByClass1("feed_section_" + e, cur.feedEls.rmenu);
        o && toggleClass(o, "ui_rmenu_item_hidden", !t)
    },
    toggleTabsMenu: function(e, t) {
        var o = ge("feed_add_list_icon");
        return void 0 === t && (t = !hasClass(o, "shown")), browser.mozilla && setStyle("page_body", {
            overflow: t ? "visible" : ""
        }), uiActionsMenu.toggle(o, t), t && addEvent(document, "mousedown", function(e) {
            feed.toggleTabsMenu(!1, 0), removeEvent(document, "mousedown", arguments.callee)
        }), e && cancelEvent(e)
    },
    checkTabsFilter: function(e, t) {
        switch (t) {
            case "news":
                return !1;
            case "newlist":
                return feed.addList();
            default:
                if (r = t.match(/list(\d+)/)) return feed.editList(r[1])
        }
        var o, s, r, i = (ge("tabs_type_filter"), t == cur.section),
            n = cur.my_feed_types.tabs;
        cur.feed_types.tabs;
        o = -1 != (s = indexOf(n, t)), toggleClass(e, "checked", !o), o ? (n.splice(s, 1), i && (cur.onSaveTabs = function(e, t) {
            feed.toggleTabsMenu(null, !1), feed.switchSection("news")
        }.pbind(t, o))) : n.push(t), cur.my_feed_types.tabs = n, feed.toggleTabsMenuTab(t, !o || i), uiRightMenu.fixScroller(ge("ui_rmenu_" + cur.section + (cur.list || ""))), clearTimeout(cur.saveTabsTO), cur.saveTabsTO = setTimeout(feed.saveTabs, 500)
    },
    hasSearchParams: function(e) {
        var t = !1;
        return each(e, function(e, o) {
            return (!e.indexOf("c[") && "c[section]" !== e || "q" == e) && o ? (t = !0, !1) : void 0
        }), t
    },
    getSectionParams: function(e) {
        var t = {
            section: e
        };
        switch (e) {
            case "news":
            case "recommended":
                void 0 === (t.subsection = cur.subsections[e]) && delete t.subsection;
                break;
            case "owner":
                (t.owner = cur.owner) || delete t.section;
                break;
            case "source":
                (t.source = cur.source) || delete t.source;
                break;
            case "list":
                (t.list = cur.list) || delete t.list;
                break;
            case "notifications":
                (t.source = cur.source) || delete t.source;
                break;
            case "articles":
                void 0 === (t.subsection = cur.subsections[e]) && delete t.subsection;
                break;
            case "search":
                var o = ge("search_filters_form");
                if (o) {
                    var s = serializeForm(o) || {};
                    for (var r in s) s[r] && "0" != s[r] || delete s[r];
                    extend(t, s)
                }
                t["c[q]"] = trim(val(cur.feedEls.search));
                break;
            case "photos_search":
                (t.q = trim(val(cur.feedEls.search))) || delete t.section, (t.sort = intval(cur.search_sort_value)) || delete t.sort;
                break;
            case "articles_search":
                (t.q = trim(val(cur.feedEls.search))) || (t.section = "articles");
                break;
            case "comments":
                cur.reposts && (t.reposts = cur.reposts);
                break;
            case "mentions":
                cur.mentionObj && cur.mentionObj != vk.id && (t.obj = cur.mentionObj)
        }
        return t
    },
    switchNotifyList: function(e, t) {
        uiRightMenu.go(geByClass1("feed_section_" + e), !1, !1), feed.go(t)
    },
    switchSubSection: function(e, t) {
        if (t && checkEvent(t)) return !0;
        cur.subsection = cur.subsections[cur.section] = e;
        var o = feed.getSectionParams(cur.section);
        delete cur.feedUpdateLoading, delete cur.isFeedLoading, nav.go(extend(o || {}, {
            0: "feed"
        })), uiRightMenu.showProgress(cur.feedEls.rmenu)
    },
    switchSection: function(e, t, o) {
        if (t && checkEvent(t)) return !0;
        if (cur.feedDestroy) {
            for (var s in cur.feedDestroy) try {
                cur.feedDestroy[s](cur)
            } catch (t) {
                try {
                    console.log(t.stack)
                } catch (r) {}
            }
            cur.feedDestroy = []
        }
        if (removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0, "photos_search" == e && !trim(val(cur.feedEls.search))) {
            if ("photos_search" != cur.section) return !1;
            e = "photos"
        }
        "comments" == e && (cur.reposts = cur.options.reposts = ""), statlogsValueEvent("feed_switch", 0, e), feed.setSection(e, 1);
        var i = feed.getSectionParams(e || "news");
        delete cur.feedUpdateLoading, delete cur.isFeedLoading;
        var n = o ? !1 : extend(i || {}, {
            0: "feed"
        });
        return uiRightMenu.go(geByClass1("feed_section_" + e), !1, n), !1
    },
    setSection: function(e, t) {
        if (t = t || 0, cur.prevSection = cur.section, !(e == cur.section && 2 > t) && e) {
            if (uiRightMenu.hideProgress(cur.feedEls.rmenu), cur.feedEls.search && uiSearch.hideProgress(cur.feedEls.search), t > 1) {
                toggleClass(cur.feedEls.wrap, "feed_submit_shown", inArray(e, cur.options.feed_types.tabs.concat(["list"])));
                var o = inArray(e, ["articles_search", "articles", "search", "photos_search", "photos"]);
                toggleClass(cur.feedEls.wrap, "feed_search_shown", o), o && elfocus(cur.feedEls.search), cur.section && val(cur.feedEls.search, "")
            }
            if (2 == t && window.Stories && Stories.updateFeedStories(e), cur.my_feed_types && (~indexOf(cur.my_feed_types.optional_tabs, cur.section) && !~indexOf(cur.my_feed_types.tabs, cur.section) && feed.toggleTabsMenuTab(cur.section, !1), ~indexOf(cur.my_feed_types.optional_tabs, e) && !~indexOf(cur.my_feed_types.tabs, e) && feed.toggleTabsMenuTab(e, !0)), cur.section = e, 4 == t) return void feed.searchUpdate();
            cur.editingHide = "notifications" == e || "replies" == e ? feed.notifyCheckHideReply : !1, cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
    },
    applyOptions: function(options, from) {
        if (from = from || 0, options.owner && (cur.owner = options.owner), cur.subsection = options.subsection || "", feed.setSection(options.section, from), cur.options || (cur.options = {
                reply_names: {}
            }), extend(cur.options.reply_names, options.reply_names), delete options.reply_names, extend(cur, options), cur.subsections[cur.section] = cur.subsection, options.loc && 2 == from && nav.setLoc(options.loc), options.section && "news" == options.section && options.subsection && "top" == options.subsection && statlogsValueEvent("feed_switch", 0, "top_news", from), void 0 !== options.filters) {
            var minEl = ge("search_filters_minimized"),
                filtersExpanded = minEl && hasClass(minEl, "ui_rmenu_item_expanded"),
                needExpand = !!minEl;
            val("feed_filters", options.filters), window.searcher && needExpand && searcher.toggleMinimizedFilters(ge("search_filters_minimized"), filtersExpanded, !0)
        }
        if (options.script && eval(options.script), options.htitle && (cur.feedInitialTitle = document.title = replaceEntities(stripHTML(options.htitle))), void 0 !== options.add_queue && null !== options.add_queue ? (options.add_queue === !0 && (cur.add_queue = options.add_queue = !1), feed.getNewQKey(0), options.add_queue !== !0 && (cur.add_queue = options.add_queue) && setTimeout(feed.update.pbind(0), 0)) : from && "search" != cur.section && "news" != cur.section && cur.section && (cur.add_queue = !1), options.q) {
            val(cur.feedEls.search, replaceEntities(options.q));
            var query = options.q;
            query.length > 30 && (query = trim(query.substr(0, 30)) + "...")
        }
        options.last_view && (cur.options.last_view = options.last_view), feed.searchUpdate(), "comments" != cur.section || cur.reposts || toggle("comments_filters", !cur.reposts), isString(cur.all_shown_text) && val("all_shown", cur.all_shown_text), isString(cur.show_more_text) && val("show_more_link", cur.show_more_text), cur.empty_text && val("feed_empty", cur.empty_text), cur.count >= 0 && re("feed_error_wrap");
        var hasNews = geByClass1("feed_row", cur.rowsCont, "div") || !1,
            isEmpty = !hasNews,
            nextRows = ge("feed_rows_next");
        if (isEmpty ? (toggleClass(cur.feedEls.wrap, "feed_is_empty", !isVisible("feed_error_wrap")), hide("all_shown"), toggle("show_more_link", cur.count > 0 && !cur.all_shown)) : !cur.all_shown || nextRows && nextRows.firstChild ? (hide("all_shown"), show("show_more_link"), removeClass(cur.feedEls.wrap, "feed_is_empty")) : (hide("show_more_link"), show("all_shown"), removeClass(cur.feedEls.wrap, "feed_is_empty"), re(nextRows)), options.playlistsData && (options.playlistsData = JSON.parse(options.playlistsData), cur.pageVideosList = extend(cur.pageVideosList || {}, options.playlistsData)), ("notifications" == cur.section || "replies" == cur.section) && cur.notify) {
            var el = ge("feedback_row" + cur.notify);
            el && el.onclick && (setTimeout(function() {
                el.onclick(), scrollToY(getXY(el)[1], 0)
            }, browser.msie ? 100 : 0), delete cur.notify)
        }
        cur.feedSection && cur.feedSection(options.section, options.subsection)
    },
    showMore: function() {
        if (!cur.isFeedLoading) {
            cur.disableAutoMore = !1;
            var e, t = ge("feed_rows_next");
            if (t) {
                if (t.firstChild)
                    for (; t.firstChild;) e = t.firstChild, cur.rowsCont.insertBefore(e, t), Wall.onPostLoaded(e, !0);
                re(t)
            }
            "live" == cur.section && (cur.all_shown = !0);
            var o = ge("show_more_link");
            if (cur.all_shown && (hide(o), show("all_shown")), "live" != cur.section) {
                var s = !1,
                    r = function(e) {
                        e.keyCode == KEY.ESC && (s = !0)
                    };
                addEvent(document, "keyup", r);
                var i = feed.getSectionParams(cur.section || "news");
                extend(i, {
                    offset: cur.offset,
                    from: cur.from,
                    part: 1,
                    more: 1,
                    last_view: ge("feedback_unread_bar") ? 1 : cur.options.last_view
                });
                var n = cur.section;
                ajax.post("al_feed.php?sm_" + cur.section, i, {
                    onDone: function(e, t) {
                        if (removeEvent(document, "keyup", r), n == cur.section) {
                            if (s) return void(cur.disableAutoMore = !0);
                            if (t) {
                                var o, i = ce("div");
                                for (i.innerHTML = t; o = i.firstChild;) o.firstChild && o.firstChild.id && !ge(o.firstChild.id) || "feedback_unread_bar" == o.id || "feed_row_fb_hidden" == o.className ? (cur.rowsCont.appendChild(o), Wall.onPostLoaded(o, !0)) : i.removeChild(o)
                            }
                            shortCurrency(), feed.applyOptions(e), setTimeout(feed.scrollCheck, 200)
                        }
                    },
                    showProgress: function() {
                        lockButton(o), cur.isFeedLoading = !0
                    },
                    hideProgress: function() {
                        unlockButton(o), cur.isFeedLoading = !1
                    },
                    cache: 1
                })
            }
        }
    },
    showMoreFriends: function(e, t) {
        checkEvent(t) || (lockButton(e), cur._back.show.push(function() {
            unlockButton(e)
        }), nav.go("/friends?act=find"))
    },
    showMorePublics: function(e, t) {
        checkEvent(t) || (lockButton(e), cur._back.show.push(function() {
            unlockButton(e)
        }), nav.go("/groups?act=catalog&c%5Bcategory%5D=0 "))
    },
    getTypesSection: function() {
        switch (cur.section) {
            case "owner":
                return cur.owner > 0 ? "person" : "group";
            default:
                return cur.section
        }
    },
    checkFilter: function(e, t) {
        var o, s, r = feed.getTypesSection(),
            i = (ge(r + "_type_filter"), cur.my_feed_types[r]),
            n = cur.feed_types[r];
        return "notifications" == r ? void feed.setNotifyFilter(e, t) : (i === !0 && (i = clone(n)), o = -1 != (s = indexOf(i, t)), o ? i.splice(s, 1) : (i.push(t), i.length == n.length && (i = !0)), checkbox(e), cur.my_feed_types[r] = i, feed.updateTypesCookie(), Feed.setFiltersUpdatePage(), void(cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu)))
    },
    setFilter: function(e, t) {
        var o = feed.getTypesSection(),
            s = ge(o + "_type_filter"),
            r = (cur.my_feed_types[o], cur.feed_types[o], !0);
        "notifications" != o && (each(geByClass("_feed_filter_row", s, "div"), function() {
            return isChecked(this) && this != e ? r = !1 : void 0
        }), r ? (cur.my_feed_types[o] = !0, each(geByClass("_feed_filter_row", s, "div"), function() {
            checkbox(this, !0)
        })) : (each(geByClass("_feed_filter_row", s, "div"), function() {
            checkbox(this, !1)
        }), cur.my_feed_types[o] = [t], checkbox(e, !0)), feed.updateTypesCookie(), Feed.setFiltersUpdatePage({
            force_expand_filters: 1
        }), cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu))
    },
    setFiltersUpdatePage: function(e) {
        e = e || {};
        var t = nav.strLoc;
        if ("updates" === cur.section) {
            t.match(/\&filters\_expanded\=1/) || ge("updates_show_all_filters") && !e.force_expand_filters || (t += "&filters_expanded=1"), t = t.replace(/\&filters\_shown\=([a-z\,]+)/, "");
            for (var o = geByClass("_feed_filter_row", "feed_filters"), s = [], r = 0; r < o.length; r++) hasClass(o[r], "hide") || s.push(o[r].id.replace("filter_updates", ""));
            t += "&filters_shown=" + s.join(",")
        }
        nav.go(t)
    },
    setNotifyFilter: function(e, t) {
        checkbox(e), cur.notifyPrefs || (cur.notifyPrefs = {}), cur.notifyPrefs[t] = isChecked(e), clearTimeout(cur.saveNotifyPrefsTO), cur.saveNotifyPrefsTO = setTimeout(function() {
            var e = [];
            each(cur.notifyPrefs, function(t, o) {
                e.push((o ? "" : "-") + t)
            }), e = e.join(","), ajax.post("/al_feed.php", {
                act: "a_set_notify_prefs",
                prefs: e,
                feed: 1,
                hash: cur.topNotifyHash
            }, {
                onDone: function(e) {
                    addTemplates({
                        top_notify_prefs: e
                    }), toggleClass("top_notify_pref_" + t, "checked", cur.notifyPrefs[t]), cur.notifyPrefs = {}, window.TopNotifier && TopNotifier.invalidate(), nav.go(nav.strLoc), cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu)
                }
            })
        }, 500)
    },
    updateTypesCookie: function() {
        var e = [];
        each(cur.my_feed_types, function(t, o) {
            "tabs" != t && e.push(o === !0 ? "*" : o.join(","))
        }), setCookie("remixfeed", e.join("."), 365)
    },
    toggleFeedTop: function(e, t) {
        var o = geByClass1("_ui_toggler", e),
            s = "top";
        switch (toggleClass(o, "on"), cur.section) {
            case "news":
            case "recommended":
                s = hasClass(o, "on") ? "top" : "recent";
                break;
            case "articles":
                s = hasClass(o, "on") ? "suggested" : "top"
        }
        feed.switchSubSection(s, t)
    },
    switchList: function(e) {
        cur.prevList = cur.list, cur.list = e, feed.setSection("list", 1), uiRightMenu.go(geByClass1("feed_section_list" + e), !1, !1), feed.go(feed.getSectionParams(cur.section))
    },
    setSearchSort: function(e) {
        cur.search_sort_value = e, Feed.submitSearch()
    },
    _activateReplyBox: function(e, t, o) {
        (t || {}).cancelBubble = !0;
        var s = ge("reply_box" + e);
        if (cur.editing && cur.editing != e && cur.notifyReplyData && cur.notifyReplyData[cur.editing].disabled && feed.notifyCheckHideReply(cur.editing, (window.event || {}).target), s && isVisible(s)) return void feed.notifyCheckHideReply(e, !1);
        if (void 0 === cur.notifyReplyData && (cur.notifyReplyData = {}), cur.notifyReplyData[e] = o, o.disabled) return s ? show(s) : itemEl.appendChild(se(rs(cur.options.feedback_dis, {
            item: e,
            text: o.disabled
        }))), void setTimeout(function() {
            cur.editing = e
        }, 0);
        show(s), Wall.showEditReply(e, t);
        var r = ge("reply_field" + e);
        r.setAttribute("placeholder", o.ph), window.Emoji && Emoji.val(r, o.greet.replace(/ $/, "&nbsp;")), data(r, "send", feed.notifySendReply), removeClass("reply_box" + e, "clear_fix")
    },
    notifyClick: function(e, t, o) {
        var s = ge("feedback_row" + e);
        Wall.checkPostClick(s, t) && Feed._activateReplyBox(e, t, o)
    },
    blindNotifyReply: function(e, t, o) {
        Feed._activateReplyBox(e, t, o)
    },
    notifySendReply: function(e, t, o) {
        var s = cur.notifyReplyData[e];
        if (s && !s.sending) {
            var r, i = ge("reply_field" + e),
                n = ge("reply_button" + e),
                a = ge("feedback_row" + e),
                d = i && data(i, "composer");
            if (o.stickerId) var c = {
                message: "",
                attach1_type: "sticker",
                attach1: o.stickerId
            };
            else {
                var c = d ? Composer.getSendParams(d, feed.notifySendReply.pbind(e)) : {
                    message: trim(Emoji.editableVal(i))
                };
                if (c.delayed) return;
                if (!c.attach1_type && (!c.message || s.greet && !s.greet.indexOf(c.message))) return void Emoji.editableFocus(i, !1, !0)
            }
            extend(c, {
                act: "post",
                from: "feedback",
                item: e
            }, s.params || {});
            var l = ge("reply_as_group" + e);
            l && isVisible(domPN(l)) && (c.from_oid = domData(domClosest("_submit_post_box", l), "from-oid")), s.sending = 1, ajax.post("al_wall.php", Wall.fixPostParams(c), {
                onDone: function(t, o) {
                    if (delete s.sending, d ? r = Composer.reset(d) : window.Emoji && Emoji.val(i, ""), i.autosize && i.autosize.update(), feed.notifyHideReply(e), o) {
                        var n = geByClass1("_answer_wrap", a);
                        val(n, o), show(n)
                    } else t && showDoneBox(t)
                },
                onFail: function() {
                    delete s.sending
                },
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n)
            })
        }
    },
    notifyCheckHideReply: function(e, t) {
        var o = cur.notifyReplyData[e];
        if (o && !o.sending && isVisible("reply_box" + e)) {
            if (cur.editing = !1, !o.disabled) {
                var s = ge("reply_field" + e),
                    r = trim(window.Emoji ? Emoji.editableVal(s) : ""),
                    i = Wall.hasComposerMedia(s);
                if (!s || i || r && !o.greet || o.greet.indexOf(r)) return
            }
            feed.notifyHideReply(e)
        }
    },
    notifyHideReply: function(e) {
        cur.editing == e && (cur.editing = !1);
        var t = ge("feedback_row" + e);
        removeClass(t, "reply_box_open"), hide("reply_box" + e);
        var o = cur.replySubmitSettings;
        o && o.tt && o.tt.el && o.tt.destroy()
    },
    ungroup: function(e, t) {
        var o = ge("feedback_row" + e);
        if (t = t || window.event, o && !checkEvent(t) && Wall.checkPostClick(o, t, !0)) {
            var s = domNS(domPN(o)),
                r = geByClass1("_header", o),
                i = val(r),
                n = ge("fbgr_" + e + "_that");
            toggle(s), toggleClass(o, "feedback_row_expanded", isVisible(s)), val(r, val(n)), val(n, i)
        }
    },
    notifyPostTooltip: function(e, t, o, s) {
        var r = (o || {}).reply,
            i = "al_wall.php";
        t.indexOf("topic_comment") ? t = t.replace("wall_reply", "").replace("wall", "") : (i = "al_board.php", t = t.replace("topic_comment", "")), s = s || {}, showTooltip(e, extend({
            url: i,
            params: extend({
                act: "post_tt",
                post: t,
                self: 1,
                from: "feedback"
            }, o || {}),
            slide: 15,
            shift: [!r || r % 2 ? 27 : 329, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 800,
            dir: "auto",
            className: "rich wall_tt wall_module _feed_notification",
            appendParentCls: "scroll_fix_wrap"
        }, s))
    },
    notifyDelete: function(e, t, o, s, r, i) {
        r.tt && r.tt.el && r.tt.hide();
        var n = ge("feedback_row" + e),
            a = geByClass1("post_actions", n);
        ajax.post("al_feed.php", {
            act: "a_feedback_delete",
            item: t,
            hash: s,
            types: o,
            candel: i
        }, {
            onDone: function(t) {
                feed.notifyHideReply(e);
                var o = geByClass1("_post_content", n),
                    s = geByClass1("_feedback_deleted", n);
                s ? (s.innerHTML = '<span class="dld_inner">' + t + "</span>", show(s)) : n.appendChild(ce("div", {
                    className: "feedback_row dld _feedback_deleted",
                    innerHTML: '<span class="dld_inner">' + t + "</span>"
                })), hide(o, geByClass1("_answer_wrap", n)), hasClass(n, "feedback_row_clickable") && addClass(n, "feedback_row_touched")
            },
            showProgress: addClass.pbind(a, "post_actions_progress"),
            hideProgress: removeClass.pbind(a, "post_actions_progress")
        })
    },
    notifyUndelete: function(e, t, o, s) {
        var r = ce("span", {
            className: "progress_inline"
        });
        ajax.post("al_feed.php", {
            act: "a_feedback_undelete",
            item: e,
            hash: o,
            types: t
        }, {
            onDone: function(e) {
                var t = gpeByClass("_feedback_deleted", s);
                if (t) {
                    var o = gpeByClass("_post_wrap", t),
                        r = geByClass1("_post_content", o);
                    show(r, geByClass1("_answer_wrap", o)), hide(t), removeClass(o, "feedback_row_touched")
                }
            },
            showProgress: function() {
                s && "button" === s.tagName.toLowerCase() ? lockButton(s) : s.parentNode.replaceChild(r, s)
            },
            hideProgress: function() {
                s && "button" === s.tagName.toLowerCase() ? unlockButton(s) : r.parentNode.replaceChild(s, r)
            }
        })
    },
    notifyMarkSpam: function(e, t, o) {
        ajax.post("al_feed.php", {
            act: "a_feedback_mark_spam",
            item: e,
            hash: o,
            types: t
        }, {
            onDone: function(t) {
                ge("notify_mark_spam_" + e).innerHTML = t
            }
        })
    },
    notifyDeleteAll: function(e, t, o, s) {
        if (cur.notifyDeletingAll || (cur.notifyDeletingAll = {}), !cur.notifyDeletingAll[e]) {
            cur.notifyDeletingAll[e] = 1;
            var r = ce("span", {
                className: "progress_inline"
            });
            ajax.post("al_feed.php", {
                act: "a_feedback_delete_all",
                uid: e,
                item: o,
                hash: t
            }, {
                onDone: function(t, o) {
                    var r = gpeByClass("_feedback_deleted", s);
                    if (1 == o) return void re(gpeByClass("_feed_row", r));
                    var i, n, a = !1;
                    if (hasClass(r, "_top_feedback_deleted") ? (a = !0, i = ge("top_notify_cont")) : i = cur.rowsCont, i && (n = i.firstChild)) {
                        var d, c, l = !1,
                            u = scrollGetY();
                        do n.className && hasClass(n, "_feed_row") && n.firstChild && e == n.firstChild.getAttribute("author") && (d = n.offsetHeight, c = n.offsetTop, l === !1 && (l = getXY(n.offsetParent)[1]), hide(n), u > c + l && (u -= d, scrollToY(u, 0))); while (n = n.nextSibling);
                        (0 === cur.wasScroll || cur.wasScroll > 0) && (cur.wasScroll = u), feed.scrollCheck()
                    }
                    r.innerHTML = '<span class="dld_inner">' + t + "</span>", a && TopNotifier && TopNotifier.refresh()
                },
                showProgress: function() {
                    s && "button" === s.tagName.toLowerCase() ? lockButton(s) : s.parentNode.replaceChild(r, s)
                },
                hideProgress: function() {
                    s && "button" === s.tagName.toLowerCase() ? unlockButton(s) : r.parentNode.replaceChild(s, r)
                }
            })
        }
    },
    getModuleRef: function() {
        var e = cur.module || "feed_other";
        return "feed" == cur.module && (e = "news" == cur.section ? cur.subsection ? "feed_news_" + cur.subsection : "feed_news" : cur.section ? e + "_" + cur.section : "feed_other"), e
    },
    ignoreItem: function(post_raw, feed_raw, hash) {
        var postEl = ge("post" + post_raw),
            adData = postEl.getAttribute("data-ad"),
            actMenu = geByClass1("ui_actions_menu_wrap", postEl),
            from = feed.getModuleRef();
        actMenu && uiActionsMenu.toggle(actMenu, !1), revertLastInlineVideo(postEl), cur.feedEntriesHTML[post_raw] = val(postEl), ajax.post("/al_feed.php?misc", {
            act: "a_ignore_item",
            post_raw: post_raw,
            feed_raw: feed_raw,
            hash: hash,
            ad_data: adData,
            ref: from
        }, {
            onDone: function(html, js) {
                val(postEl, html), eval(js)
            },
            stat: ["privacy.js", "privacy.css"]
        })
    },
    unignoreItem: function(e, t, o, s) {
        var r = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_item",
            post_raw: e,
            feed_raw: t,
            hash: o,
            ref: r
        }, {
            onDone: function() {
                feed.restorePost(e)
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    reportIgnoredItem: function(e, t) {
        ajax.post("al_wall.php", {
            act: "spam",
            post: e,
            hash: t
        }, {
            onDone: function(t) {
                var o = ge("post" + e),
                    s = o && geByClass1("feed_post_report", o, "div");
                val(s, t)
            }
        })
    },
    ignoreOwner: function(e, t, o, s) {
        e && (cur.feedEntriesHTML[e + "_ignored"] = val("post" + e));
        var r = "list" == cur.section && cur.list || 0,
            i = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_ignore_owner",
            post_raw: e,
            owner_id: t,
            hash: o,
            list: r,
            ref: i
        }, {
            onDone: function(o) {
                val("post" + e, o), each(geByClass("post", cur.rowsCont), function(o, s) {
                    var r = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    r && r[1] != e && (!r[4] && r[2] == t || r[4] && r[3] == t) && (revertLastInlineVideo(this), hide(this.parentNode))
                })
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    unignoreOwner: function(e, t, o, s) {
        var r = "list" == cur.section && cur.list || 0,
            i = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_owner",
            post_raw: e || "",
            owner_id: t,
            hash: o,
            list: r,
            ref: i
        }, {
            onDone: function(o) {
                e ? val("post" + e, cur.feedEntriesHTML[e + "_ignored"]) : val("ignore_row" + t, o), each(geByClass("post", cur.rowsCont), function(e, o) {
                    var s = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    s && (!s[4] && s[2] == t || s[4] && s[3] == t) && show(this.parentNode)
                })
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    ignoreLiveOwner: function(e, t, o, s) {
        var r = ge("post" + e),
            i = geByClass1("ui_actions_menu_wrap", r);
        i && uiActionsMenu.toggle(i, !1), revertLastInlineVideo(r), cur.feedEntriesHTML[e + "_ignored"] = val("post" + e), ajax.post("al_feed.php?act=a_ignore_live_owner", {
            post_raw: e,
            owner_id: t,
            hash: o
        }, {
            onDone: function(t) {
                val("post" + e, t)
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    unignoreLiveOwner: function(e, t, o, s) {
        ajax.post("al_feed.php?act=a_unignore_live_owner", {
            post_raw: e,
            owner_id: t,
            hash: o
        }, {
            onDone: function(t) {
                val("post" + e, cur.feedEntriesHTML[e + "_ignored"])
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    unsubscribe: function(e, t, o) {
        triggerEvent(ge("post_delete" + e), "mouseout"), cur.feedEntriesHTML[e] = ge("post" + e).innerHTML;
        var s = e.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        s && ajax.post("al_feed.php", {
            act: "unsubscribe",
            type: {
                "": 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[s[2]],
            owner_id: s[1],
            place_id: s[3],
            hash: t,
            feed: 1
        }, {
            onDone: function(t) {
                ge("post" + e).innerHTML = t.replace("%post_raw%", e)
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    subscribe: function(e, t, o) {
        var s = e.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        s && ajax.post("al_feed.php", {
            act: "subscribe",
            type: {
                "": 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[s[2]],
            owner_id: s[1],
            place_id: s[3],
            hash: t,
            feed: 1
        }, {
            onDone: feed.restorePost.pbind(e),
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    restorePost: function(e) {
        ge("post" + e).innerHTML = cur.feedEntriesHTML[e];
        var t = geByClass1("input_back", ge("post" + e), "div"),
            o = geByTag1("textarea", ge("post" + e));
        o && (o.placeholder = t.innerHTML, t.parentNode.removeChild(t), placeholderSetup(o))
    },
    toggleReposts: function(e, t, o, s) {
        if (checkEvent(s)) return !0;
        var r = ge("feed_reposts_more" + t + "_" + o),
            i = ge("feed_reposts" + t + "_" + o),
            n = 0,
            a = scrollGetY(),
            d = isVisible(i);
        return i ? (d ? n -= i.offsetHeight + intval(getStyle(e, "marginTop")) : (domPN(domPN(i)) || {}).bits = 0, toggle(i, !d), val(r, d ? getLang("news_show_X_reposts", i.childNodes.length) : getLang("news_hide_reposts")), n && scrollToY(a + n + getSize("page_header")[1], 0), !1) : void(r && re(r.parentNode.parentNode))
    },
    editHidden: function() {
        return showTabbedBox("al_settings.php", {
            act: "a_edit_owners_list",
            list: "feed",
            height: lastWindowHeight
        }, {
            stat: ["ui_controls.js", "ui_controls.css", "indexer.js"]
        }), cur.onOListSave = feed.onHiddenSave, !1
    },
    onHiddenSave: function(e, t, o, s) {
        var r = curBox(),
            i = {
                act: "a_ignore_olist",
                no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0,
                hash: s.hash
            };
        return e.length < t.length ? i.White = e.join(",") : i.Black = t.join(","), ajax.post("al_feed.php", i, {
            onDone: function(e, t) {
                r.hide(), feed.switchSection("photos" == cur.section ? "photos" : "news")
            },
            showProgress: lockButton.pbind(r.btns.ok[0]),
            hideProgress: unlockButton.pbind(r.btns.ok[0])
        }), !1
    },
    addList: function() {
        return feed.editList(-1)
    },
    editList: function(e) {
        return feed.toggleTabsMenu(!1, 0), showTabbedBox("al_settings.php", {
            act: "a_edit_owners_list",
            list: "feed",
            list_id: e,
            height: lastWindowHeight
        }, {
            stat: ["ui_controls.js", "ui_controls.css", "indexer.js"],
            onFail: function(e) {
                return setTimeout(showFastBox({
                    title: getLang("global_error"),
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, e, getLang("global_close")).hide, 4500), !0
            }
        }), cur.onOListSave = feed.onListSave.pbind(e), !1
    },
    onListSave: function(e, t, o, s, r) {
        var i = val("feed_list_name");
        if (!trim(i)) return notaBene("feed_list_name"), !1;
        if (!t.length) return !1;
        var n = curBox();
        return ajax.post("al_feed.php", {
            act: "a_save_list",
            hash: cur.tabs_hash,
            White: t.join(","),
            title: i,
            list_id: e,
            no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0
        }, {
            onDone: function(t) {
                var o = geByClass1("feed_section_list" + e, cur.feedEls.rmenu),
                    s = geByClass1("feed_filter_list" + e, cur.feedEls.rmenu);
                val(o, clean(i)), val(geByClass1("ui_actions_menu_item_label", s), clean(i)), n.hide(), e > 0 ? feed.switchList(e) : nav.go({
                    0: "feed",
                    section: "list",
                    list: t
                }, null, {
                    nocur: !0
                })
            },
            onFail: function(e) {
                return val("feed_list_error", e), show("feed_list_error_wrap"), !0
            },
            showProgress: lockButton.pbind(n.btns.ok[0]),
            hideProgress: unlockButton.pbind(n.btns.ok[0])
        }), !1
    },
    deleteList: function(e, t, o, s) {
        if (s && cancelEvent(s), 0 >= e) return !1;
        if (o) {
            var r = curBox();
            ajax.post("al_feed.php", extend({
                act: "a_delete_list",
                list_id: e,
                hash: cur.tabs_hash
            }), {
                onDone: function() {
                    re(geByClass1("feed_section_list" + e, cur.feedEls.rmenu)), re(geByClass1("feed_filter_list" + e, cur.feedEls.rmenu)), boxQueue.hideAll(), "list" == cur.section && cur.list == e && feed.switchSection("news")
                },
                showProgress: lockButton.pbind(r.btns.ok[0]),
                hideProgress: unlockButton.pbind(r.btns.ok[0])
            })
        } else {
            feed.toggleTabsMenu(!1, 0);
            var r = showFastBox({
                title: getLang("news_delete_list_sure_title"),
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("news_delete_list_sure").replace("{list}", t), getLang("global_delete"), function() {
                feed.deleteList(e, t, !0)
            }, getLang("global_cancel"), function() {
                r.hide()
            })
        }
    },
    saveTabs: function() {
        ajax.post("al_feed.php", {
            act: "a_save_tabs",
            hash: cur.tabs_hash,
            tabs: cur.my_feed_types.tabs.join(",")
        }, {
            hideProgress: function() {
                isFunction(cur.onSaveTabs) && cur.onSaveTabs(), cur.onSaveTabs = null
            }
        })
    },
    statsShow: function(e, t) {
        return showWiki({
            w: "stats" + (cur.source || "")
        }, !1, e)
    },
    scrollCheck: function(e) {
        if (e = e || {}, "scroll" == e.type || cur.idleManager && !cur.idleManager.isIdle) {
            var t, o, s, r, i = feed.longView,
                n = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                a = scrollGetY(),
                d = 0,
                c = [];
            cur.isFeedLoading || cur.disableAutoMore || (o = ge("show_more_link"), isVisible(o) && a + n + 1e3 > o.offsetTop && feed.showMore()), (domPN(cur.topRow) != cur.rowsCont || "feed_rows_next" == (cur.topRow || {}).id) && (cur.topRow = domFC(cur.rowsCont));
            var l = {
                news: !0,
                recommended: !0,
                search: !0,
                friends: !0,
                groups: !0,
                list: !0,
                1917: !0,
                cc2017: !0
            };
            if (vk.id && cur.topRow && "feed_rows_next" != cur.topRow.id && l[cur.section] && (!((window.curNotifier || {}).idle_manager || {}).is_idle || "init" == e.type)) {
                for (postsUnseen = [], o = domPS(cur.topRow); o; o = domPS(o)) cur.topRow.offsetTop > a && (cur.topRow = o), o.unseen || (o.unseen = !0, postsUnseen.push(Feed.postsGetRaws(o)));
                for (Page.postsUnseen(postsUnseen), o = cur.topRow; o && (t = d ? d : o.offsetTop, !(t >= a + n)); o = s) s = domNS(o), "feed_rows_next" == (s || {}).id && (s = null), d = s ? s.offsetTop : t + o.offsetHeight, a > d && s && (cur.topRow = s), LongView && LongView.register(o, "feed"), i.registerElement(o) || (r = o.bits || 0, r >= 3 || (r |= (t >= a && a + n > t ? 1 : 0) | (d >= a && a + n > d ? 2 : 0), r && (o.bits = r, 3 == r && c.push(feed.postsGetRaws(o)))));
                c = c.concat(i.process(a, n)), LongView && LongView.onScroll(a, n), Page.postsSeen(c)
            }
        }
    },
    postsGetRaws: function(e) {
        var t, o, s, r = indexOf(domPN(e).children, e),
            i = domFC(e),
            n = /^post(-?\d+_\d+)$/,
            a = {};
        if (!i) return a;
        if ("ads_feed_placeholder" === i.id) return a;
        a.module = cur.module, a.index = r, "feed" == cur.module && ("search" == cur.section ? (a.module = "feed_search", a.q = cur.q) : "news" == cur.section ? a.module = cur.subsection ? "feed_news_" + cur.subsection : "feed_news" : "recommended" == cur.section ? a.module = cur.subsection ? "feed_recommended_" + cur.subsection : "feed_recommended" : a.module = "feed_other");
        var d = i.getAttribute("data-ad-view");
        d && (a["ad_" + d] = 1);
        var c = i.getAttribute("post_view_hash");
        if (c && (a.hash = c), "block_" === i.id.substr(0, 6)) {
            a[i.id] = 1, a.block = i.id.substr(6);
            var l = attr(i, "data-contain");
            l && (l = l.split(","), l.forEach(function(e) {
                e = e.split(":"), a[e[0]] = intval(e[1]) || 1
            }))
        } else if (o = i.id.match(n)) a[o[1]] = 1;
        else if (t = i.className, o = t.match(/feed_reposts_wrap(-?\d+_\d+)/)) {
            if (s = domFC(i), hasClass(domFC(s), "post_copy") && (a[o[1]] = -1), (o = domFC(s).id.match(n)) && (a[o[1]] = 1), isVisible(s = domNS(s)))
                for (s = domFC(s); s; s = domNS(s))(o = s.id.match(n)) && (a[o[1]] = 1)
        } else if (o = t.match(/feed_repost(-?\d+_\d+)/)) s = domFC(i), hasClass(s, "post_copy") && (a[o[1]] = -1), (o = s.id.match(n)) && (a[o[1]] = 1);
        else {
            var u = i.id;
            hasClass(i, "post_photos") && (s = geByClass1("post_image", i, "a"), s && (s = domFC(s), s && (o = s.getAttribute("data-post-id").match(/^(-?\d+_p?\d+)$/)) && (u = o[1]))), a[u] = 1
        }
        return a
    },
    searchUpdate: function() {
        if (cur.feedEls.search && getLang("news_search")) {
            var e;
            e = cur.section.indexOf("photos") ? cur.section.indexOf("articles") ? getLang("news_search") : getLang("news_articles_search") : getLang("news_photo_search"), cur.feedEls.search.setAttribute("placeholder", clean(unclean(e))), placeholderInit(cur.feedEls.search, {
                reload: !0
            })
        }
    },
    go: function(params, onBeforeReplace, noscroll) {
        function setPostParam(e, t) {
            e && !params[t] && (params[t] = e)
        }
        if (params = params || {}, cur._back_local) {
            var hist = cur._back_local;
            hist.back ? showBackLink(hist.back[0], hist.back[1], hist.back[2]) : showBackLink(!1), cur._back_local = !1
        }
        if (cur.feedReq) try {
            cur.feedReq.abort()
        } catch (e) {
            debugLog(e)
        }
        cur.feedReqObj = null;
        var frame = 1,
            hideProgress = function() {
                cur.isFeedLoading = !1
            };
        (browser.msie || noscroll) && (frame = !1, hideProgress = cur.onFrameBlocksDone), cur.wasScroll = noscroll ? scrollGetY() : !1;
        var eventTarget = window.event && window.event.target;
        if (eventTarget && "search" === params.section && !params._post) {
            var postParams = nav.getPostParams(eventTarget);
            postParams.post_id && postParams.post_click_type && (setPostParam(postParams.post_id, "_post"), setPostParam(postParams.post_click_type, "_post_click_type"), setPostParam(postParams.ad_data, "_post_ad_data"), setPostParam(postParams.ad_block_unique_id, "_post_ad_block_unique_id"))
        }
        var feedReqObj = cur.feedReqObj = {},
            loadedPostsCheckerElements = {},
            loadedPostsCheckerInterval = 100,
            loadedPostsCheckerIterationsCnt = 0,
            loadedPostsCheckerIterationsMax = 500,
            loadedPostsChecker = function() {
                if (cur.feedReqObj && cur.feedReqObj === feedReqObj && !(++loadedPostsCheckerIterationsCnt > loadedPostsCheckerIterationsMax)) {
                    var e = !0,
                        t = {};
                    each(loadedPostsCheckerElements, function(o) {
                        var s = ge(o);
                        if (s && hasClass(s, "feed_row")) return s.firstChild ? void Wall.onPostLoaded(s, !0) : (t[o] = !0, void(e = !1))
                    }), e || (loadedPostsCheckerElements = t, setTimeout(loadedPostsChecker, loadedPostsCheckerInterval))
                }
            };
        cur.feedReq = ajax.post("al_feed.php", extend(params, {
            part: 1
        }), {
            onDone: function(options, rows, js, app_widget_html) {
                if (revertLastInlineVideo(), removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0, window.tooltips && tooltips.destroyAll(ge("feed_rows")), boxQueue.hideAll(), layers.fullhide && layers.fullhide(!0), frame && ajax._framenext(), window.wall && wall.cancelEdit(), boxQueue.hideAll(), onBeforeReplace ? onBeforeReplace(rows || "") : val(cur.rowsCont, rows || ""), feed.applyOptions(options, 2), !params.norecom) {
                    val("feed_recommends", options.recommends || ""), toggle("feed_recommends", !!options.recommends);
                    var str = "/al_feed.php#" + ajx2q({
                        act: "recom"
                    });
                    ajaxCache[str] && delete ajaxCache[str], cur.recomPreload = !1, toggleClass(cur.feedEls.wrap, "feed_asc_shown", geByClass1("feed_asc_block", "feed_recommends"))
                }
                if (js && eval(js), checkPageBlocks(), scrollToTop(0), shortCurrency(), cur.feedEls.wall) {
                    var wallClass = "clear_fix";
                    switch (cur.section) {
                        case "updates":
                            wallClass += " page_block feed_updates";
                            break;
                        case "photos_search":
                            wallClass += " page_block feed_found_photos";
                            break;
                        case "notifications":
                            wallClass += " page_block feed_notifications"
                    }
                }
                ge("feed_wall").className = wallClass, toggle("feed_recommends", inArray(cur.section, ["news", "recommended", "videos"])), val("feed_app_widget", app_widget_html || ""), toggle("feed_app_widget", app_widget_html), cur.rowsCont && cur.rowsCont.children && (each(cur.rowsCont.children, function() {
                    var e = this;
                    if (hasClass(e, "feed_row")) return e.id && !e.firstChild ? void(loadedPostsCheckerElements[e.id] = !0) : void Wall.onPostLoaded(e, !0)
                }), isEmpty(loadedPostsCheckerElements) || setTimeout(loadedPostsChecker, 10)), setTimeout(feed.scrollCheck, 200)
            },
            onFail: function() {
                return !1
            },
            showProgress: function() {
                cur.isFeedLoading = !0
            },
            frame: frame,
            ads: 1,
            hideProgress: hideProgress
        })
    },
    onFeedSearch: function(e, t, o, s) {
        var r, i, n = s || cur.section;
        if (n.indexOf("photos") ? n.indexOf("articles") ? (r = "search", i = "news") : (r = "articles_search", i = "articles") : (r = "photos_search", i = "photos"), "search" == r || feed.hasSearchParams(feed.getSectionParams(r))) {
            r != cur.section && feed.setSection(r, 1);
            var a = feed.getSectionParams(r);
            cur.disableSort && (a.disable_sort = 1), feed.go(a), window.searcher && searcher.highlightHotHashtag(t || val(e))
        } else feed.go(feed.getSectionParams(i));
        uiSearch.onChanged(e), uiSearch.showProgress(e)
    },
    onSearchChange: function() {
        return setTimeout(feed.onFeedSearch.pbind(cur.feedEls.search), 0), !1
    },
    init: function(e) {
        setTimeout(function() {
            each(geByTag("textarea", cur.rowsCont), function() {
                placeholderSetup(this)
            })
        }, 200), extend(cur, {
            oid: e.user_id,
            postTo: e.user_id,
            phCache: {},
            phShown: {},
            subsections: {},
            feed_session_id: e.feed_session_id || "na",
            module: "feed",
            isFeedLoading: !1,
            customSearchChange: feed.onSearchChange,
            wallPostCb: function() {
                "news" == cur.section ? setTimeout(feed.update.pbind(1), 1e3) : setTimeout(feed.switchSection.pbind("news"), 1e3)
            },
            idleManager: function() {
                var e, t, o, s = {
                    isIdle: !1,
                    onIdle: null,
                    onUnIdle: null,
                    stop: function() {
                        removeEvent(document, "mousemove keydown", e), removeEvent(window, "focus blur", o)
                    },
                    start: function() {
                        browser.mobile || (e = function() {
                            cur.idleManager && s.isIdle && (s.isIdle = !1, s.onUnIdle && s.onUnIdle())
                        }, t = function() {
                            cur.idleManager && (s.isIdle = !0, s.onIdle && s.onIdle())
                        }, o = function(o) {
                            "focus" == o.type ? e() : t()
                        }, addEvent(window, "focus blur", o))
                    }
                };
                return s
            }(),
            currentModule: function() {
                return "videos" == cur.section ? "feed_videos" : cur.module
            },
            onFrameBlocksDone: function() {
                cur.isFeedLoading = !1, (0 === cur.wasScroll || cur.wasScroll > 0 || cur.wasScroll === !1 && "search" == cur.section && cur.q && "#" == cur.q.substr(0, 1)) && (cur.wasScroll = !1)
            },
            feedEntriesHTML: {},
            feedUnreadCount: 0,
            feedInitialTitle: "",
            feedUnread: [],
            feedToSort: [],
            feedEls: {
                wrap: ge("main_feed"),
                wall: ge("feed_wall"),
                search: ge("search_query"),
                rmenu: ge("feed_rmenu"),
                newPosts: ge("feed_new_posts")
            }
        }), cur.nav.push(function(e, t, o, s) {
            if (void 0 === e[0]) {
                var r = clone(o);
                if (delete r[0], void 0 === e.section || inArray(cur.section, ["notifications", "replies"]) == inArray(e.section, ["notifications", "replies"])) {
                    if ("notifications" == cur.section) return feed.switchNotifyList(o.list || "all", extend(r, s.params || {})), !1;
                    if (e.list) return feed.switchList(e.list), !1;
                    if (void 0 !== e.section && feed.switchSection(e.section || "news", !1, !0), e.notify) return !1;
                    if (e.q) return val(cur.feedEls.search, e.q), feed.onFeedSearch(cur.feedEls.search), !1;
                    if (delete e.subsection, isEmpty(e)) {
                        var i = geByClass1("feed_section_" + (t.section || "news") + (t.list || ""));
                        i && uiRightMenu.go(i, !1, !1)
                    }
                    return feed.go(extend(r, s.params || {})), !1
                }
            }
        }), cur.idleManager.onUnIdle = feed.updateTitle, cur.idleManager.onIdle = feed.reSortItems, cur.options = cur.options || {}, extend(cur.options, e), feed.applyOptions(e, 3), cur.rowsCont = e.wallCont = ge("feed_rows"), wall.init(e), cur.rowsCont && cur.rowsCont.children && each(cur.rowsCont.children, function() {
            var e = this;
            hasClass(e, "feed_row") && e.firstChild && Wall.onPostLoaded(e, !0)
        }), cur._back = {
            text: getLang("news_return_to_news"),
            show: [feed.startEvents],
            hide: [function() {
                clearInterval(cur.updateInt), removeEvent(window, "scroll", feed.scrollCheck), removeEvent(window, "resize", feed.scrollCheck), cur.idleManager.stop(), clearTimeout(cur.lp_error_to)
            }],
            loc: !1
        }, feed.startEvents(), setTimeout(function() {
            feed.scrollCheck({
                type: "init"
            })
        }, 200)
    },
    startEvents: function() {
        cur.idleManager.start(), cur.updateInt = setInterval(function() {
            feed.update(0)
        }, 2e4), addEvent(window, "scroll", feed.scrollCheck), addEvent(window, "resize", feed.scrollCheck)
    },
    mentionClick: function(e, t) {
        var o = e,
            s = ((e.getAttribute("mention") || "").match(/^bp(-?\d+_\d+)$/) || {})[1];
        if (!s) return nav.go(e, t);
        for (s = s.split("_"); e; e = e.parentNode) {
            var r = (e.id || "").match(/^replies(-?\d+_topic\d+)$/);
            if (r) {
                var i = r[1].split("_");
                if (i[0] == s[0]) return wall.showReply(o, r[1], s[0] + "topic_" + s[1], t);
                break
            }
        }
        return nav.go(e, t)
    },
    toggleCustomFeedTab: function(e, t) {
        return hasClass(e, "feed_tab_link_hidden") ? (removeClass(e, "feed_tab_link_hidden"), setCookie("remixcustom_feed_added", t)) : lockButton(e), feed.checkTabsFilter(geByClass1("_feed_custom_" + t), t)
    },
    recomPreload: function() {
        cur.recomPreload || (cur.recomPreload = !0, ajax.post("/al_feed.php", {
            act: "recom",
            section: cur.section
        }, {
            cache: 1
        }))
    },
    recomMore: function(e) {
        if (checkEvent(e) === !1) {
            var t = ge("feed_recom_rows"),
                o = ge("feed_recom_more");
            if (t.childNodes.length > 2) {
                for (getSize(t)[1]; t.childNodes.length > 2;) t.removeChild(t.lastChild);
                return scrollToY(0, 0), hide(o.firstChild.nextSibling), show(o.firstChild), cancelEvent(e)
            }
            return ajax.post("/al_feed.php", {
                act: "recom",
                section: cur.section
            }, {
                cache: 1,
                onDone: function(e) {
                    hide(o.firstChild), show(o.firstChild.nextSibling);
                    for (var t, s = ce("div", {
                            innerHTML: e
                        }), r = ge("feed_recom_rows"); t = s.firstChild;) ge(t.id) ? re(t) : r.appendChild(t);
                    r.childNodes.length % 2 && re(r.lastChild)
                },
                showProgress: function() {
                    hide(o.firstChild), show(o.lastChild)
                },
                hideProgress: function() {
                    show(o.firstChild), hide(o.lastChild)
                }
            }), cancelEvent(e)
        }
    },
    recomSubscribe: function(e, t, o) {
        var s, r, i = o ? t : domPS(t),
            n = o ? domNS(t) : t;
        o ? (s = "/al_feed.php", r = {
            act: "subscr",
            oid: e,
            from: nav.objLoc.section,
            hash: val("feed_recom_hash")
        }) : (s = "/al_fans.php", r = {
            act: "unsub",
            oid: e,
            hash: val("feed_recom_hash"),
            no_response: 1
        }), ajax.post(s, r, {
            onDone: function() {
                toggle(i, !o), toggle(n, !!o), "recommended" != nav.objLoc.section && nav.go(nav.objLoc, !1, {
                    params: {
                        norecom: 1
                    }
                })
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    infoTopFeedNotification: function(e) {
        Feed.hideTopFeedNotification(e, !1), setTimeout(function() {
            hide("top_feed_notification")
        }, 2500), nav.go("/feed?w=smartfeed")
    },
    hideTopFeedNotification: function(e, t) {
        ajax.post("al_feed.php", {
            act: "hide_top_feed_notification",
            hash: e,
            hide: t ? 1 : 0
        }), t && hide("top_feed_notification")
    },
    hide10YearsBlock: function(e) {
        re("feed_vk10_years"), ajax.post("al_feed.php", {
            act: "hide_vk10_years",
            hash: e
        })
    },
    hideBlogReminder: function(e, t, o) {
        o && cancelEvent(o), re("feed_blog_reminder"), ajax.post("blog.php", {
            act: "hide_reminder",
            hash: e,
            nid: t
        }, {
            onDone: function() {}
        })
    },
    preloadVideos: function(e) {
        function t(e) {
            var t = new XMLHttpRequest;
            t.open("GET", e), t.send()
        }
        e && cur.videoAutoplayScrollHandler && (cur.videoAutoplayPreloaded = cur.videoAutoplayPreloaded || {}, each(e, function(e, o) {
            t(o.index_url), t(o.index_url.replace(/index-(.+).m3u8/, "seg-1-$1.ts")), cur.videoAutoplayPreloaded[o.video] = o.quality
        }))
    },
    expandJoinedGroups: function(e, t) {
        cancelEvent(t), show(geByClass1("feed_groups_hidden_list", e.parentNode)), re(e)
    },
    showAllFilters: function(e) {
        re(e);
        for (var t = geByClass("hide", e.parentNode), o = 0; o < t.length; o++) removeClass(t[o], "hide")
    }
};
window.feed = Feed;
try {
    stManager.done("feed.js")
} catch (e) {}