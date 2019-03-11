var Feed = {
    longView: {
        PERCENT: .5,
        DURATION_MS: 1e3,
        headerHeight: null,
        tracking: [],
        viewed: {},
        registerElement: function(e) {
            var t = feed.longView;
            return !!e && (!!e.longViewTracking || !e.longViewRegistered && (e.longViewRegistered = !0, e.longViewTracking = t.isAutoplayAd(e), !!e.longViewTracking && (t.tracking.push(e), !0)))
        },
        process: function(a, c) {
            var e = feed.longView,
                t = e.tracking;
            if (0 === t.length) return [];
            var l = e.PERCENT,
                d = e.DURATION_MS,
                u = e.isElemViewable,
                f = e.viewed,
                p = [];
            return each(t, function(e, t) {
                var o = domFC(t),
                    s = o.id;
                if (o && s) {
                    var i = domData(o, "ad-block-uid"),
                        r = "" + s;
                    if (i && (r += "_" + i), !f[r] && document.body.contains(t))
                        if (u(t, l, a, c)) {
                            var n = Date.now();
                            t.longViewStartedAt ? n - t.longViewStartedAt >= d && (f[r] = !0, p.push(feed.postsGetRaws(t))) : t.longViewStartedAt = Date.now()
                        } else t.longViewStartedAt = null
                }
            }), p
        },
        isAutoplayAd: function(e) {
            var t = e && domFC(e);
            return t && t.hasAttribute("data-ad-video-autoplay")
        },
        isElemViewable: function(e, t, o, s) {
            var i = feed.longView.getHeaderHeight(),
                r = o + i,
                n = o + s,
                a = e.offsetHeight,
                c = e.offsetTop + i,
                l = c + a;
            return t <= (r < l && c < n ? (Math.min(n, l) - Math.max(r, c)) / a : 0)
        },
        getHeaderHeight: function() {
            return feed.longView.headerHeight || (feed.longView.headerHeight = ge("page_header").offsetHeight)
        }
    },
    blockHideReason: function t(e, o) {
        if (t.progress) return !1;
        t.progress = !0;
        var s = "block_" + e,
            i = ge(s);
        delete cur.feedEntriesHTML[s], ajax.post("al_feed.php", {
            act: "a_block_hide_reason",
            block_id: e,
            reason: 0 | o,
            hash: attr(i, "data-hash"),
            ref: feed.getModuleRef(),
            pos: attr(i, "data-pos")
        }, {
            onDone: function(e) {
                t.progress = !1, e ? val(i, e) : hide(i)
            },
            hideProgress: function() {
                t.progress = !1
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
                i = geByClass1("ui_actions_menu_wrap", s);
            ajax.post("al_feed.php", {
                act: "a_block_hide",
                block_id: e,
                hash: attr(s, "data-hash"),
                ref: feed.getModuleRef(),
                pos: attr(s, "data-pos")
            }, {
                onDone: function(e) {
                    uiActionsMenu.toggle(i, !1), cur.feedEntriesHTML[o] = val(s), val(s, e)
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
            if (!isVisible(this) && (show(this), 5 < ++s)) return !1
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
    update: function(v) {
        if (!cur.feedUpdateLoading && !(cur.add_queue && window.Notifier && Notifier.addKey(cur.add_queue, feed.updated) && "news" != cur.section || "feed" !== cur.module || "top" == cur.subsection || inArray(cur.section, ["search", "notifications", "photos_search", "mentions", "articles", "articles_search", "likes", "recommended", "live"]))) {
            var e = Math.random();
            "news" != cur.section && "comments" != cur.section && .3 < e || "news" == cur.section && (v || .05 < e) || (cur.feedUpdateLoading = !0, ajax.post("al_feed.php?au_" + cur.section, extend(feed.getSectionParams(cur.section), {
                timestamp: cur.timestamp,
                posted: v ? 1 : "",
                queue: cur.add_queue ? 1 : 0
            }), {
                onDone: function(e, t, o) {
                    if (cur.feedUpdateLoading = !1, 1 != v || t && -1 != t.indexOf(vk.id + "")) {
                        if (!("feed" !== cur.module || e.section != cur.section || e.timestamp < cur.timestamp || o < cur.timestamp)) {
                            statlogsValueEvent("feed_check_update", !!t), e.count += cur.count;
                            var s, i, r, n, a = cur.rowsCont,
                                c = ce("div"),
                                l = 0;
                            if ("news" == cur.section) {
                                if (n = scrollGetY(), t) {
                                    for (c.innerHTML = t; c.lastChild;) s = c.lastChild, a.insertBefore(s, a.firstChild), Feed.onPostLoaded(s, !0);
                                    each(geByClass("ts" + o, a), function() {
                                        l += this.offsetHeight, nodeUpdated(this), cur.feedUnreadCount++
                                    })
                                }
                                l && 100 < n && scrollToY(n + l, 0, !1, !0)
                            } else if (t)
                                for (c.innerHTML = t; s = c.lastChild;)
                                    if ("DIV" == s.tagName)
                                        if ("podcasts_recommended_block" !== s.id)
                                            if ((r = s.firstChild.id.substr(4)) && cur.wallLayer == r) c.removeChild(s);
                                            else if (i = ge("post" + r)) {
                                if (!hasClass(i.parentNode, "feed_row")) return;
                                var d = ge("replies" + r),
                                    u = d.nextSibling,
                                    f = 0;
                                if (each([].slice.call(geByClass("reply", s, "div")), function() {
                                        ge(this.id) || (addClass(this, "new_reply"), d.appendChild(this), f++)
                                    }), f) {
                                    var p = i.parentNode.offsetHeight,
                                        _ = geByClass("new_reply", d, "div").length;
                                    u && "replies_open" == u.className || (u = ce("div", {
                                        className: "replies_open",
                                        onclick: wall.openNewComments.pbind(r),
                                        role: "button",
                                        tabIndex: 0
                                    }), d.parentNode.insertBefore(u, d.nextSibling)), u.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, _)), u.newCnt = _;
                                    var h = scrollGetY(),
                                        g = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                                        m = getXY(u)[1],
                                        w = i.parentNode.offsetHeight;
                                    p = w - p, inArray(r, cur.feedUnread) || cur.feedUnread.unshift(r), !cur.idleManager.isIdle && h + 100 < m && m < h + g + 100 ? (a.insertBefore(ge("post_ph" + r) || ce("div", {
                                        id: "post_ph" + r
                                    }), a.firstChild), inArray(r, cur.feedToSort) || cur.feedToSort.push(r)) : (re(i.parentNode), a.insertBefore(i.parentNode, a.firstChild), h + g + 100 < m && (p = w), p && scrollToY(scrollGetY() + p, 0, !1, !0)), cur.feedUnreadCount += f
                                }
                                c.removeChild(s)
                            } else n = scrollGetY(), a.insertBefore(s, a.firstChild), Feed.onPostLoaded(s, !0), nodeUpdated(s), l = s.offsetHeight, 100 < n && scrollToY(n + l, 0, !1, !0);
                            else c.removeChild(s);
                            else c.removeChild(s);
                            feed.applyOptions(e), feed.updateTitle()
                        }
                    } else setTimeout(feed.update.pbind(2), 2e3)
                },
                onFail: function() {
                    return cur.feedUpdateLoading = !1
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
    getNewQKey: function(s) {
        var i = {
                act: "a_get_key",
                only_update: cur.add_queue ? 1 : 0,
                need_ignore: isArray(cur.ignore_owners) ? 0 : 1
            },
            e = {
                onDone: function(e, t) {
                    if (cur.section != r) return;
                    if (e) cur.add_queue = e, setTimeout(feed.update.pbind(0), 0);
                    else if (!i.only_update) {
                        var o = t;
                        return void(cur.timestamp = (o || vkNow() / 1e3) - s)
                    }
                    isArray(t) && (cur.ignore_owners = t)
                },
                local: 1
            },
            r = cur.section;
        ajax.post("al_feed.php?queue", extend(feed.getSectionParams(cur.section), i), e)
    },
    updated: function(e, t) {
        cur.queueTO = cur.queueTO || irand(0, 5e3), setTimeout(feed.handleQueueEvent.pbind(e, t), cur.queueTO)
    },
    handleQueueEvent: function(e, t) {
        if (("search" == cur.section || "news" == cur.section || !cur.section) && cur.add_queue && cur.add_queue.key == e) {
            if (t.failed) {
                cur.add_queue = !1;
                var o = curNotifier.error_timeout || 1;
                return clearTimeout(cur.lp_error_to), void(cur.lp_error_to = setTimeout(feed.getNewQKey.bind(feed).pbind(o), 1e3 * o))
            }
            if (isArray(t.events) && t.events.length) {
                cur.add_queue.ts = t.ts, t.key && (cur.add_queue.key = t.key);
                var s = scrollGetY(),
                    i = 0;
                each(t.events, function() {
                    i += feed.pushEvent(this.split("<!>"), s + getSize("page_header_cont")[1])
                });
                var r = scrollGetY();
                i && Math.abs(s - r) < 100 && (cur.leftMenuDelta = i, scrollToY(r + i, 0, !1, !0)), feed.updateTitle(), cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
            }
        }
    },
    needScrollPost: function(e, t) {
        return e + 80 > getXY(t)[1] || cur.storyLayer || window.mvcur && mvcur.mvShown || window.pvcur && cur.pvShown
    },
    pushEvent: function(t, o) {
        var e = t[0],
            s = t[1],
            i = t[2],
            r = ge("post" + i),
            n = cur.section,
            a = "search" != n ? intval(t.pop()) : 0,
            c = 0,
            l = function(e) {
                return intval(getStyle(domByClass(e, "page_block"), "marginTop")) || intval(getStyle(domByClass(domNS(e), "page_block"), "marginTop")) || 15
            };
        if (!cur.options || e != cur.options.qversion) return 0;
        switch ((Wall.isArchiveWall() ? "archive_post" === s : "reveal_post" === s) && (s = "res_post"), (Wall.isArchiveWall() ? "reveal_post" === s : "archive_post" === s) && (s = "del_post"), s) {
            case "new_post":
                if (r) break;
                var d = constants.Groups.GROUPS_ADMIN_LEVEL_USER;
                if (intval(t[11]) && intval(t[11]) != vk.id) return ajax.post("al_feed.php", {
                    act: "a_need_own_reply",
                    oid: intval(t[11])
                }, {
                    onDone: function(e) {
                        e && (t[11] = 0, feed.pushEvent(t, o))
                    }
                }), 0;
                if ("search" != n) {
                    var u = i.split("_")[0];
                    t[8] = 0 < intval(t[8]) && 4 == (4 & a) ? 1 : 0, u < 0 && (d = 8 & a ? constants.Groups.GROUPS_ADMIN_LEVEL_EDITOR : 2 & a ? constants.Groups.GROUPS_ADMIN_LEVEL_MODERATOR : constants.Groups.GROUPS_ADMIN_LEVEL_USER)
                }
                "search" == n && statlogsValueEvent("feed_switch", 0, "search_update", cur.options.q && "#" == cur.options.q.charAt(0) ? "hashtag" : "");
                var f, p, _, h, g, m = (L = cur.rowsCont).childNodes,
                    w = wall.getNewPostHTML(t, d, feed.feedPostRepl),
                    v = t[12],
                    b = "search" != n && (window._wf <= 0 || hasClass(cur.feedEls.wrap, "feed_has_new") || feed.needScrollPost(o, L)),
                    y = cur.storyLayer;
                y && (b = !0);
                var C = !1,
                    k = w;
                if (b && (w = wall.updatePostImages(w)), v) {
                    if (cur.ignore_owners.length && inArray(intval(v), cur.ignore_owners)) break;
                    if (f = geByClass1("feed_reposts_wrap" + v, L, "div")) p = geByClass1("feed_reposts_first", f, "div").firstChild, _ = geByClass1("feed_reposts_group", f, "div"), h = geByClass1("feed_reposts_more_link", f, "a"), feed.needScrollPost(o, p) && (c -= p.offsetHeight + l(p)), p.parentNode.replaceChild(x = se(k), p), _.insertBefore(p, _.firstChild), isVisible(_) || val(h, getLang("news_show_X_reposts", _.childNodes.length)), f = f.parentNode, L.firstChild != f && L.insertBefore(f, L.firstChild), feed.needScrollPost(o, f) && (c += f.offsetHeight + l(f)), f.bits = 0;
                    else if ((g = geByClass("feed_repost" + v, L, "div")) && g.length) {
                        w = rs(cur.wallTpl.grouped_posts, {
                            place: v,
                            random: irand(1e8, 2e8),
                            first: w,
                            other: "",
                            label: getLang("news_show_X_reposts", g.length)
                        });
                        var P = se('<div class="feed_row' + (b ? "_unshown" : "") + '">' + w + "</div>"),
                            T = domFC(T);
                        Wall.updateAnonNewPost(t, P), L.insertBefore(P, L.firstChild), !b && feed.needScrollPost(o, P) && (c += P.offsetHeight + l(P)), C = !0, f = P.firstChild, x = geByClass1("feed_reposts_first", f, "div"), _ = geByClass1("feed_reposts_group", f, "div"), each(clone(g), function() {
                            feed.needScrollPost(o, this) && (c -= this.offsetHeight + l(this)), re(this.parentNode), _.appendChild(this.firstChild)
                        })
                    } else x = se('<div class="feed_row' + (b ? "_unshown" : "") + '"><div class="feed_repost' + v + '">' + w + "</div></div>"), Wall.updateAnonNewPost(t, x), L.insertBefore(x, L.firstChild), C = !0, !b && feed.needScrollPost(o, x) && (c += x.offsetHeight + l(x))
                } else x = se('<div class="feed_row' + (b ? "_unshown" : "") + '">' + w + "</div>"), Wall.updateAnonNewPost(t, x), L.insertBefore(x, L.firstChild), C = !0, !b && feed.needScrollPost(o, x) && (c += x.offsetHeight + l(x));
                if (0 == t[8]) {
                    var S = geByClass1("post", x);
                    addClass(S, "closed_comments")
                }
                if (cur.deepRepliesActive) {
                    S = geByClass1("post", x);
                    addClass(S, "deep_active")
                }
                b && C && (cur.newPostsCount = cur.newPostsCount ? cur.newPostsCount + 1 : 1, cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount), addClass(cur.feedEls.wrap, "feed_has_new"), 1 == cur.newPostsCount && feed.needScrollPost(o, cur.feedEls.newPosts) && !y && (c += getSize(cur.feedEls.newPosts)[1])), AudioUtils.updateQueueReceivedPost(x), wall.votingUpdateByPostRaw(i), cur.feedUnreadCount++, "search" != n && nodeUpdated(x), 300 < m.length ? L.removeChild(m[300]) : m.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty"), Wall.updateMentionsIndex();
                break;
            case "new_post_reply":
                if (r) break;
                m = (L = cur.rowsCont).childNodes, w = wall.getNewPostHTML(t, !1, feed.feedPostRepl);
                var x = se('<div class="feed_row">' + w + "</div>");
                L.insertBefore(x, L.firstChild), feed.needScrollPost(o, x) && (c += x.offsetHeight + l(x)), cur.feedUnreadCount++, 300 < m.length ? L.removeChild(m[300]) : m.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty");
                break;
            case "edit_post":
                var E, B = ge("wpt" + i);
                if (!isVisible(r) || !B) break;
                (R = geByClass1("wall_post_more", B)) && (R = isVisible(domNS(R))), (E = feed.needScrollPost(o, B)) && (c -= B.offsetHeight);
                var L, M = psr(rs(t[3], {
                    poll_hash: cur.wallTpl.poll_hash
                }));
                (L = ge("post" + i)) && !isVisible(L.parentNode) && (M = wall.updatePostImages(M)), window.fifaReplaceText && (M = fifaReplaceText(M)), val(B, M), R && (R = geByClass1("wall_post_more", B)) && R.onclick(), wall.votingUpdateByPostRaw(i), E && (c += B.offsetHeight), nodeUpdated(B), window.Wall && Wall.updatePostAuthorData(i);
                break;
            case "edit_reply":
                var R, H = t[3];
                B = ge("wpt" + H);
                if (!isVisible("post" + H) || !B) break;
                (R = geByClass1("wall_reply_more", B)) && (R = isVisible(domNS(R)));
                M = psr(t[4]);
                window.fifaReplaceText && (M = fifaReplaceText(M)), val(B, M), updH = -B.offsetHeight, updY = getXY(B)[1], R && (R = geByClass1("wall_reply_more", B)) && R.onclick(), updH += B.offsetHeight, nodeUpdated(B);
                break;
            case "post_parsed_link":
                if (!r) break;
                var N = geByClass1("wall_postlink_preview_btn_disabled", r);
                if (!N) break;
                var A = t[3];
                if ("1" === A) removeClass(N, "wall_postlink_preview_btn_disabled");
                else if ("0" === A) re(N);
                else if (A) {
                    removeClass(N, "wall_postlink_preview_btn_disabled");
                    var j = geByClass1("flat_button", N);
                    j && (j.setAttribute("href", t[3]), j.removeAttribute("onclick"))
                }
                break;
            case "del_post":
                if (r) {
                    var D = domClosest("feed_row", r) || domClosest("feed_row_unshown", r) || r;
                    cur.wallMyDeleted[i] || (feed.needScrollPost(o, r) && (c -= r.offsetHeight + l(r)), revertLastInlineVideo(r), re(D)), cur.options.offset--, hasClass(cur.feedEls.wrap, "feed_has_new") && !isVisible(D) && (cur.newPostsCount--, cur.newPostsCount ? cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount) : removeClass(cur.feedEls.wrap, "feed_has_new"))
                }
                break;
            case "res_post":
                r && cur.options.offset++;
                break;
            case "new_reply":
                if (!r || cur.wallMyReplied[i] || ge("post" + t[3])) break;
                if (hasClass(ge("post" + i), "deep_active")) {
                    var F = wall.addNewReply(t);
                    c += F[0];
                    break
                }
                var V = ge("replies" + i),
                    I = ge("replies_wrap" + i),
                    O = r.offsetHeight,
                    q = (d = (u = i.split("_")[0]) < 0 ? 8 & a ? constants.Groups.GROUPS_ADMIN_LEVEL_EDITOR : 2 & a ? constants.Groups.GROUPS_ADMIN_LEVEL_MODERATOR : constants.Groups.GROUPS_ADMIN_LEVEL_USER : constants.Groups.GROUPS_ADMIN_LEVEL_USER, wall.getNewReplyHTML(t, d)),
                    U = (x = !1, !1);
                if (isVisible(V) && isVisible(I) && !isVisible("reply_link" + i)) {
                    var G = V.nextSibling,
                        W = geByClass("new_reply", V, "div").length + 1;
                    if (cur.wallMyOpened[i]) {
                        G && "replies_open" == G.className && re(G), U = !0;
                        var Y = geByClass1("wr_header", V, "a"),
                            z = geByClass("reply", V, "div").length + 1,
                            K = z;
                        Y && (K = intval(Y.getAttribute("offs").split("/")[1]) + 1), (5 < K || z < K) && (Y || V.insertBefore(Y = ce("a", {
                            className: "wr_header"
                        }), V.firstChild), wall.updateRepliesHeader(i, Y, z, K))
                    } else q = wall.updatePostImages(q), x = se(q), addClass(x, "new_reply"), G && "replies_open" == G.className || (G = ce("div", {
                        className: "replies_open",
                        onclick: wall.openNewComments.pbind(i),
                        role: "button",
                        tabIndex: 0
                    }), V.parentNode.insertBefore(G, V.nextSibling)), G.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, W)), G.newCnt = W
                } else re("reply_link" + i), show(I, V), U = !0;
                i.split("_")[0] == vk.id && cur.feedUnreadCount++, x || (x = se(q)), V.appendChild(x), feed.needScrollPost(o, U ? x : G) && (c += r.offsetHeight - O), U && nodeUpdated(x), Wall.repliesSideSetup(i), Wall.updateMentionsIndex(), Likes.update("wall" + i, {
                    comment_num: t[13]
                });
                break;
            case "del_reply":
                if (!cur.wallMyDeleted[i] && r) {
                    if (hasClass(gpeByClass("post", r), "deep_active")) {
                        F = wall.removeDeepReply(t);
                        c += F[0];
                        break
                    }
                    feed.needScrollPost(o, r) && (c -= r.offsetHeight);
                    S = r.parentNode.id.match(/replies(-?\d+_\d+)/);
                    revertLastInlineVideo(r), re(r), S && Wall.repliesSideSetup(S[1])
                }
                break;
            case "view_post":
                Likes.update("wall" + i, {
                    views_num: Wall.formatCount(intval(t[3]))
                });
                break;
            case "like_post":
            case "like_reply":
                if (!r) break;
                var Q = "like_reply" == s ? "wall_reply" + i : i,
                    X = r && domByClass(r, "_like_wrap"),
                    $ = r && domByClass(r, "_share_wrap");
                wall.likeFullUpdate(X, Q, {
                    like_my: X && hasClass(X, "my_like"),
                    like_num: t[3],
                    like_title: !1,
                    share_my: $ && hasClass($, "my_share"),
                    share_num: t[4],
                    share_title: !1
                })
        }
        return c
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
            var s, i, r, n = e.text || "",
                a = cur.q.toLowerCase().split(/[\s.,:;!?()]/),
                c = [],
                l = (n = n.replace(/<(.|\n)+?>/g, function(e) {
                    return c.push(e), ""
                })).toLowerCase();
            for (s = a.length - 1; 0 <= s; s--)
                if (r = a[s], trim(r))
                    for (i = 0; - 1 != (i = l.indexOf(r, i));) n.charAt(i - 1) != String.fromCharCode(2) ? (n = n.substr(0, i) + "" + s + "" + n.substr(i + r.length), l = l.substr(0, i) + "" + s + "" + l.substr(i + r.length)) : i += 2;
            n = (n = n.replace(/\x02(\d+)\x02/g, function(e, t) {
                return '<span class="highlight">' + a[t] + "</span>"
            })).replace(/\x01/g, function() {
                return c.shift() || ""
            }), o.text = n, "new_post_reply" == t[1] && (o.date_postfix = t[7])
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
        cur.idleManager && (cur.idleManager.isIdle || (cur.feedUnreadCount = 0), setDocumentTitle((cur.feedUnreadCount ? "(" + cur.feedUnreadCount + ") " : "") + cur.feedInitialTitle))
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
                if (i = t.match(/list(\d+)/)) return feed.editList(i[1])
        }
        ge("tabs_type_filter");
        var o, s, i, r = t == cur.section,
            n = cur.my_feed_types.tabs;
        cur.feed_types.tabs;
        o = -1 != (s = indexOf(n, t)), toggleClass(e, "checked", !o), o ? (n.splice(s, 1), r && (cur.onSaveTabs = function(e, t) {
            feed.toggleTabsMenu(null, !1), feed.switchSection("news")
        }.pbind(t, o))) : n.push(t), cur.my_feed_types.tabs = n, feed.toggleTabsMenuTab(t, !o || r), uiRightMenu.fixScroller(ge("ui_rmenu_" + cur.section + (cur.list || ""))), clearTimeout(cur.saveTabsTO), cur.saveTabsTO = setTimeout(feed.saveTabs, 500)
    },
    hasSearchParams: function(e) {
        var o = !1;
        return each(e, function(e, t) {
            if ((!e.indexOf("c[") && "c[section]" !== e || "q" == e) && t) return !(o = !0)
        }), o
    },
    getSectionParams: function(e) {
        var t = {
            section: e
        };
        switch (e) {
            case "news":
            case "recommended":
            case "groups":
            case "friends":
            case "videos":
            case "photos":
            case "podcasts":
                void 0 === (t.subsection = cur.subsections[e]) && delete t.subsection;
                break;
            case "owner":
                (t.owner = cur.owner) || delete t.section;
                break;
            case "source":
                (t.source = cur.source) || delete t.source;
                break;
            case "list":
                void 0 === (t.subsection = cur.subsections["list" + cur.list]) && delete t.subsection, (t.list = cur.list) || delete t.list;
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
                    for (var i in s) s[i] && "0" != s[i] || delete s[i];
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
    switchSubSection: function(e, t, o) {
        if (t && checkEvent(t)) return !0;
        sectionKey = cur.section, "list" === cur.section && (sectionKey = "list" + cur.list), cur.subsection = cur.subsections[sectionKey] = e;
        var s = feed.getSectionParams(cur.section);
        s.hash = o, delete cur.feedUpdateLoading, delete cur.isFeedLoading, nav.go(extend(s || {}, {
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
                } catch (e) {}
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
        var r = !o && extend(i || {}, {
            0: "feed"
        });
        return uiRightMenu.go(geByClass1("feed_section_" + e), !1, r), !1
    },
    setSection: function(e, t, o) {
        if (t = t || 0, cur.prevSection = cur.section, !(e == cur.section && t < 2) && e) {
            if (uiRightMenu.hideProgress(cur.feedEls.rmenu), cur.feedEls.search && uiSearch.hideProgress(cur.feedEls.search), 1 < t) {
                toggleClass(cur.feedEls.wrap, "feed_submit_shown", inArray(e, cur.options.feed_types.tabs.concat(["list", "likes"]))), toggleClass(cur.feedEls.wrap, "feed_submit_only_shown", ~["recommended", "search", "updates", "comments"].indexOf(e));
                var s = inArray(e, ["articles_search", "articles", "search", "photos_search", "photos"]);
                toggleClass(cur.feedEls.wrap, "feed_search_shown", s), s && elfocus(cur.feedEls.search), cur.section && val(cur.feedEls.search, "")
            }
            2 == t && window.Stories && Stories.updateFeedStories(e, o), cur.my_feed_types && (~indexOf(cur.my_feed_types.optional_tabs, cur.section) && !~indexOf(cur.my_feed_types.tabs, cur.section) && feed.toggleTabsMenuTab(cur.section, !1), ~indexOf(cur.my_feed_types.optional_tabs, e) && !~indexOf(cur.my_feed_types.tabs, e) && feed.toggleTabsMenuTab(e, !0)), cur.section = e, 4 != t ? (cur.editingHide = ("notifications" == e || "replies" == e) && feed.notifyCheckHideReply, cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()) : feed.searchUpdate()
        }
    },
    applyOptions: function(options, from) {
        if (from = from || 0, options.no_left_ads && (cur.no_left_ads = !0), options.owner && (cur.owner = options.owner), cur.subsection = options.subsection || "", feed.setSection(options.section, from, options), cur.options || (cur.options = {
                reply_names: {}
            }), extend(cur.options.reply_names, options.reply_names), delete options.reply_names, extend(cur, options), sectionKey = cur.section, "list" === cur.section && (sectionKey = "list" + options.list), cur.subsections[sectionKey] = cur.subsection, options.loc && 2 == from && nav.setLoc(options.loc), options.section && "news" == options.section && options.subsection && "top" == options.subsection && statlogsValueEvent("feed_switch", 0, "top_news", from), void 0 !== options.filters) {
            var minEl = ge("search_filters_minimized"),
                filtersExpanded = minEl && hasClass(minEl, "ui_rmenu_item_expanded"),
                needExpand = !!minEl;
            val("feed_filters", options.filters), window.searcher && needExpand && searcher.toggleMinimizedFilters(ge("search_filters_minimized"), filtersExpanded, !0)
        }
        if (options.script && eval(options.script), options.htitle && (cur.feedInitialTitle = document.title = replaceEntities(stripHTML(options.htitle))), void 0 !== options.add_queue && null !== options.add_queue ? (!0 === options.add_queue && (cur.add_queue = options.add_queue = !1), feed.getNewQKey(0), !0 !== options.add_queue && (cur.add_queue = options.add_queue) && setTimeout(feed.update.pbind(0), 0)) : from && "search" != cur.section && "news" != cur.section && cur.section && (cur.add_queue = !1), options.q) {
            val(cur.feedEls.search, replaceEntities(options.q));
            var query = options.q;
            30 < query.length && (query = trim(query.substr(0, 30)) + "...")
        }
        options.last_view && (cur.options.last_view = options.last_view), void 0 !== options.feedback_list && (cur.options.feedback_list = options.feedback_list), feed.searchUpdate(), "comments" != cur.section || cur.reposts || toggle("comments_filters", !cur.reposts), isString(cur.all_shown_text) && val("all_shown", cur.all_shown_text), isString(cur.show_more_text) && val("show_more_link", cur.show_more_text), cur.empty_text && val("feed_empty", cur.empty_text), 0 <= cur.count && re("feed_error_wrap");
        var hasNews = geByClass1("feed_row", cur.rowsCont, "div") || !1,
            isEmpty = !hasNews,
            nextRows = ge("feed_rows_next");
        if (isEmpty ? (toggleClass(cur.feedEls.wrap, "feed_is_empty", !isVisible("feed_error_wrap")), hide("all_shown"), toggle("show_more_link", 0 < cur.count && !cur.all_shown)) : !cur.all_shown || nextRows && nextRows.firstChild ? (hide("all_shown"), show("show_more_link"), removeClass(cur.feedEls.wrap, "feed_is_empty")) : (hide("show_more_link"), show("all_shown"), removeClass(cur.feedEls.wrap, "feed_is_empty"), re(nextRows)), options.playlistsData && (options.playlistsData = JSON.parse(options.playlistsData), cur.pageVideosList = extend(cur.pageVideosList || {}, options.playlistsData)), ("notifications" == cur.section || "replies" == cur.section) && cur.notify) {
            var el = ge("feedback_row" + cur.notify);
            el && el.onclick && (setTimeout(function() {
                el.onclick(), scrollToY(getXY(el)[1], 0)
            }, browser.msie ? 100 : 0), delete cur.notify)
        }
        cur.feedSection && cur.feedSection(options.section, options.subsection), options.hot_feature_tooltip && setTimeout(function() {
            Feed.showHotTooltip(options.hot_feature_tooltip_hash)
        }, 800), feed.updateTimer()
    },
    showMore: function() {
        if (!cur.isFeedLoading) {
            cur.disableAutoMore = !1;
            var e, t = ge("feed_rows_next");
            if (t) {
                if (t.firstChild)
                    for (; t.firstChild;) e = t.firstChild, cur.rowsCont.insertBefore(e, t), Feed.onPostLoaded(e, !0);
                re(t)
            }
            "live" == cur.section && (cur.all_shown = !0);
            var o = ge("show_more_link");
            if (cur.all_shown && (hide(o), show("all_shown")), "live" != cur.section) {
                var i = !1,
                    r = function(e) {
                        e.keyCode == KEY.ESC && (i = !0)
                    };
                addEvent(document, "keyup", r);
                var s = feed.getSectionParams(cur.section || "news");
                extend(s, {
                    offset: cur.offset,
                    from: cur.from,
                    part: 1,
                    more: 1,
                    last_view: cur.options.last_view
                }), cur.options.feedback_list && (s.list = cur.options.feedback_list), nav.objLoc.situational_suggest_id && (s.situational_suggest_id = nav.objLoc.situational_suggest_id);
                var n = cur.section;
                ajax.post("al_feed.php?sm_" + cur.section, s, {
                    onDone: function(e, t) {
                        if (removeEvent(document, "keyup", r), n == cur.section)
                            if (i) cur.disableAutoMore = !0;
                            else {
                                if (t) {
                                    var o, s = ce("div");
                                    for (s.innerHTML = t; o = s.firstChild;) o.firstChild && o.firstChild.id && !ge(o.firstChild.id) || "feedback_unread_bar" == o.id || hasClass(o, "feed_row_fb_hidden") || hasClass(o, "feed_to_recomm") ? (cur.rowsCont.appendChild(o), Feed.onPostLoaded(o, !0)) : s.removeChild(o)
                                }
                                shortCurrency(), feed.applyOptions(e), setTimeout(feed.scrollCheck, 200)
                            }
                    },
                    showProgress: function() {
                        lockButton(o), cur.isFeedLoading = !0
                    },
                    hideProgress: function() {
                        if (unlockButton(o), cur.isFeedLoading = !1, o.seen) {
                            var e = Math.ceil((Date.now() - o.seen) / 1e3),
                                t = cur.section + (cur.subsection ? "_" + cur.subsection : "");
                            statlogsValueEvent("feed_load_more_seen_time", e, t), o.seen = !1
                        }
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
                return 0 < cur.owner ? "person" : "group";
            default:
                return cur.section
        }
    },
    checkFilter: function(e, t) {
        var o, s = feed.getTypesSection(),
            i = (ge(s + "_type_filter"), cur.my_feed_types[s]),
            r = cur.feed_types[s];
        "notifications" != s ? (!0 === i && (i = clone(r)), -1 != (o = indexOf(i, t)) ? i.splice(o, 1) : (i.push(t), i.length == r.length && (i = !0)), checkbox(e), cur.my_feed_types[s] = i, feed.updateTypesCookie(), Feed.setFiltersUpdatePage(), cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu)) : feed.setNotifyFilter(e, t)
    },
    setFilter: function(e, t) {
        var o = feed.getTypesSection(),
            s = ge(o + "_type_filter"),
            i = (cur.my_feed_types[o], cur.feed_types[o], !0);
        "notifications" != o && (each(geByClass("_feed_filter_row", s, "div"), function() {
            if (isChecked(this) && this != e) return i = !1
        }), i ? (cur.my_feed_types[o] = !0, each(geByClass("_feed_filter_row", s, "div"), function() {
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
            for (var o = geByClass("_feed_filter_row", "feed_filters"), s = [], i = 0; i < o.length; i++) hasClass(o[i], "hide") || s.push(o[i].id.replace("filter_updates", ""));
            t += "&filters_shown=" + s.join(",")
        }
        nav.go(t)
    },
    setNotifyFilter: function(e, t) {
        checkbox(e), cur.notifyPrefs || (cur.notifyPrefs = {}), cur.notifyPrefs[t] = isChecked(e), clearTimeout(cur.saveNotifyPrefsTO), cur.saveNotifyPrefsTO = setTimeout(function() {
            var o = [];
            each(cur.notifyPrefs, function(e, t) {
                o.push((t ? "" : "-") + e)
            }), o = o.join(","), ajax.post("/al_feed.php", {
                act: "a_set_notify_prefs",
                prefs: o,
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
        var o = [];
        each(cur.my_feed_types, function(e, t) {
            "tabs" != e && o.push(!0 === t ? "*" : t.join(","))
        }), setCookie("remixfeed", o.join("."), 365)
    },
    toggleFeedTop: function(e, t, o) {
        var s = geByClass1("_ui_toggler", e),
            i = "top";
        switch (toggleClass(s, "on"), cur.section) {
            case "news":
            case "recommended":
            case "groups":
            case "friends":
            case "videos":
            case "photos":
            case "list":
                i = hasClass(s, "on") ? "top" : "recent";
                break;
            case "articles":
                i = hasClass(s, "on") ? "suggested" : "top";
                break;
            case "podcasts":
                i = hasClass(s, "on") ? "recent" : "top"
        }
        feed.switchSubSection(i, t, o)
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
        if (cur.editing && cur.editing != e && cur.notifyReplyData && cur.notifyReplyData[cur.editing].disabled && feed.notifyCheckHideReply(cur.editing, (window.event || {}).target), s && isVisible(s)) feed.notifyCheckHideReply(e, !1);
        else {
            if (void 0 === cur.notifyReplyData && (cur.notifyReplyData = {}), (cur.notifyReplyData[e] = o).disabled) return s ? show(s) : itemEl.appendChild(se(rs(cur.options.feedback_dis, {
                item: e,
                text: o.disabled
            }))), void setTimeout(function() {
                cur.editing = e
            }, 0);
            show(s), Wall.showEditReply(e, t);
            var i = ge("reply_field" + e);
            i.setAttribute("placeholder", o.ph), window.Emoji && Emoji.val(i, o.greet.replace(/ $/, "&nbsp;")), data(i, "send", feed.notifySendReply), removeClass("reply_box" + e, "clear_fix")
        }
    },
    notifyClick: function(e, t, o) {
        var s = ge("feedback_row" + e);
        Wall.checkPostClick(s, t) && Feed._activateReplyBox(e, t, o)
    },
    blindNotifyReply: function(e, t, o) {
        Feed._activateReplyBox(e, t, o)
    },
    notifySendReply: function(s, e, t) {
        var i = cur.notifyReplyData[s];
        if (i && !i.sending) {
            var r = ge("reply_field" + s),
                o = ge("reply_button" + s),
                n = ge("feedback_row" + s),
                a = r && data(r, "composer");
            if (t.stickerId) var c = {
                message: "",
                attach1_type: "sticker",
                attach1: t.stickerId
            };
            else {
                if ((c = a ? Composer.getSendParams(a, feed.notifySendReply.pbind(s)) : {
                        message: trim(Emoji.editableVal(r))
                    }).delayed) return;
                if (!c.attach1_type && (!c.message || i.greet && !i.greet.indexOf(c.message))) return void Emoji.editableFocus(r, !1, !0)
            }
            extend(c, {
                act: "post",
                from: "feedback",
                item: s
            }, i.params || {});
            var l = ge("reply_as_group" + s);
            l && isVisible(domPN(l)) && (c.from_oid = domData(domClosest("_submit_post_box", l), "from-oid")), i.sending = 1, ajax.post("al_wall.php", Wall.fixPostParams(c), {
                onDone: function(e, t) {
                    if (delete i.sending, a ? Composer.reset(a) : window.Emoji && Emoji.val(r, ""), r.autosize && r.autosize.update(), feed.notifyHideReply(s), t) {
                        var o = geByClass1("_answer_wrap", n);
                        val(o, t), show(o)
                    } else e && showDoneBox(e)
                },
                onFail: function() {
                    delete i.sending
                },
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o)
            })
        }
    },
    notifyCheckHideReply: function(e, t) {
        var o = cur.notifyReplyData && cur.notifyReplyData[e];
        if (o && !o.sending && isVisible("reply_box" + e)) {
            if (cur.editing = !1, !o.disabled) {
                var s = ge("reply_field" + e),
                    i = trim(window.Emoji ? Emoji.editableVal(s) : ""),
                    r = Wall.hasComposerMedia(s);
                if (!s || r || i && !o.greet || o.greet.indexOf(i)) return
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
                i = geByClass1("_header", o),
                r = val(i),
                n = ge("fbgr_" + e + "_that");
            toggle(s), toggleClass(o, "feedback_row_expanded", isVisible(s)), val(i, val(n)), val(n, r)
        }
    },
    ungroupUnified: function(e, t) {
        var o = ge("feedback_row" + e);
        if (t = t || window.event, o && !checkEvent(t) && Wall.checkPostClick(o, t, !0)) {
            var s = domNS(domPN(o));
            show(s), re(domPN(o))
        }
    },
    notifyPostTooltip: function(e, t, o, s) {
        var i = (o || {}).reply,
            r = "al_wall.php";
        t = t.indexOf("topic_comment") ? t.replace("wall_reply", "").replace("wall", "") : (r = "al_board.php", t.replace("topic_comment", "")), s = s || {}, showTooltip(e, extend({
            url: r,
            params: extend({
                act: "post_tt",
                post: t,
                self: 1,
                from: "feedback"
            }, o || {}),
            slide: 15,
            shift: [!i || i % 2 ? 27 : 329, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 800,
            dir: "auto",
            className: "rich wall_tt wall_module _feed_notification feed_notification",
            appendParentCls: "scroll_fix_wrap"
        }, s))
    },
    unifiedRestoreRow: function(e, t, i) {
        var o = ce("span", {
            className: "progress_inline"
        });
        ajax.post("al_feed.php", {
            act: "a_feedback_unified_restore",
            query: e,
            hash: t,
            from: "top_notifier"
        }, {
            onDone: function(e) {
                var t = gpeByClass("_feedback_deleted", i);
                if (t) {
                    var o = gpeByClass("_feed_row", t),
                        s = geByClass1("_post_wrap", o);
                    c = geByClass1("_post_content", s), show(c, geByClass1("_answer_wrap", o)), hide(t), removeClass(o, "feedback_row_touched")
                }
            },
            showProgress: function() {
                i && "button" === i.tagName.toLowerCase() ? lockButton(i) : i.parentNode.replaceChild(o, i)
            },
            hideProgress: function() {
                i && "button" === i.tagName.toLowerCase() ? unlockButton(i) : o.parentNode.replaceChild(i, o)
            }
        })
    },
    notifyMarkSpam: function(t, e, o) {
        ajax.post("al_feed.php", {
            act: "a_feedback_mark_spam",
            item: t,
            hash: o,
            types: e
        }, {
            onDone: function(e) {
                ge("notify_mark_spam_" + t).innerHTML = e
            }
        })
    },
    notifyDeleteAll: function(l, e, t, d) {
        if (cur.notifyDeletingAll || (cur.notifyDeletingAll = {}), !cur.notifyDeletingAll[l]) {
            cur.notifyDeletingAll[l] = 1;
            var o = ce("span", {
                className: "progress_inline"
            });
            ajax.post("al_feed.php", {
                act: "a_feedback_delete_all",
                uid: l,
                item: t,
                hash: e
            }, {
                onDone: function(e, t) {
                    var o = gpeByClass("_feedback_deleted", d);
                    if (1 != t) {
                        var s, i;
                        if ((s = hasClass(o, "_top_feedback_deleted") ? (!0, ge("top_notify_cont")) : cur.rowsCont) && (i = s.firstChild)) {
                            for (var r, n, a = !1, c = scrollGetY(); i.className && hasClass(i, "_feed_row") && i.firstChild && l == i.firstChild.getAttribute("author") && (r = i.offsetHeight, n = i.offsetTop, !1 === a && (a = getXY(i.offsetParent)[1]), hide(i), n + a < c && (c -= r, scrollToY(c, 0))), i = i.nextSibling;);
                            (0 === cur.wasScroll || 0 < cur.wasScroll) && (cur.wasScroll = c), feed.scrollCheck()
                        }
                        o.innerHTML = '<span class="dld_inner">' + e + "</span>"
                    } else re(gpeByClass("_feed_row", o))
                },
                showProgress: function() {
                    d && "button" === d.tagName.toLowerCase() ? lockButton(d) : d.parentNode.replaceChild(o, d)
                },
                hideProgress: function() {
                    d && "button" === d.tagName.toLowerCase() ? unlockButton(d) : o.parentNode.replaceChild(d, o)
                }
            })
        }
    },
    getModuleRef: function() {
        var e = cur.module || "feed_other";
        return "feed" == cur.module && (e = "news" == cur.section ? cur.subsection ? "feed_news_" + cur.subsection : "feed_news" : "podcasts" === cur.section ? e + "_" + cur.section + ("recent" === cur.subsection ? "_my" : "") : cur.section ? e + "_" + cur.section : "feed_other"), e
    },
    ignoreItem: function(post_raw, feed_raw, hash, caption_type, uids) {
        var postEl = ge("post" + post_raw),
            adData = postEl.getAttribute("data-ad"),
            actMenu = geByClass1("ui_actions_menu_wrap", postEl),
            from = feed.getModuleRef();
        actMenu && uiActionsMenu.toggle(actMenu, !1), revertLastInlineVideo(postEl), cur.feedEntriesHTML[post_raw] = val(postEl), ajax.post("/al_feed.php?misc", {
            act: "a_ignore_item",
            post_raw: post_raw,
            feed_raw: feed_raw,
            caption_type: caption_type,
            uids: uids,
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
        var i = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_item",
            post_raw: e,
            feed_raw: t,
            hash: o,
            ref: i
        }, {
            onDone: function() {
                feed.restorePost(e)
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    reportIgnoredItem: function(s, e) {
        ajax.post("al_wall.php", {
            act: "spam",
            post: s,
            hash: e
        }, {
            onDone: function(e) {
                var t = ge("post" + s),
                    o = t && geByClass1("feed_post_report", t, "div");
                val(o, e)
            }
        })
    },
    ignoreOwner: function(s, i, e, t, o) {
        s && (cur.feedEntriesHTML[s + "_ignored"] = val("post" + s));
        var r = "list" == cur.section && cur.list || 0,
            n = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_ignore_owner",
            post_raw: s,
            owner_id: i,
            type: e,
            hash: t,
            list: r,
            ref: n
        }, {
            onDone: function(e) {
                val("post" + s, e), each(geByClass("post", cur.rowsCont), function(e, t) {
                    var o = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    o && o[1] != s && (!o[4] && o[2] == i || o[4] && o[3] == i) && (revertLastInlineVideo(this), hide(this.parentNode))
                })
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    unignoreOwner: function(t, s, e, o) {
        var i = "list" == cur.section && cur.list || 0,
            r = feed.getModuleRef();
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_owner",
            post_raw: t || "",
            owner_id: s,
            hash: e,
            list: i,
            ref: r
        }, {
            onDone: function(e) {
                t ? val("post" + t, cur.feedEntriesHTML[t + "_ignored"]) : val("ignore_row" + s, e), each(geByClass("post", cur.rowsCont), function(e, t) {
                    var o = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    o && (!o[4] && o[2] == s || o[4] && o[3] == s) && show(this.parentNode)
                })
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    ignoreLiveOwner: function(t, e, o, s) {
        var i = ge("post" + t),
            r = geByClass1("ui_actions_menu_wrap", i);
        r && uiActionsMenu.toggle(r, !1), revertLastInlineVideo(i), cur.feedEntriesHTML[t + "_ignored"] = val("post" + t), ajax.post("al_feed.php?act=a_ignore_live_owner", {
            post_raw: t,
            owner_id: e,
            hash: o
        }, {
            onDone: function(e) {
                val("post" + t, e)
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    unignoreLiveOwner: function(t, e, o, s) {
        ajax.post("al_feed.php?act=a_unignore_live_owner", {
            post_raw: t,
            owner_id: e,
            hash: o
        }, {
            onDone: function(e) {
                val("post" + t, cur.feedEntriesHTML[t + "_ignored"])
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    unsubscribe: function(t, e, o) {
        triggerEvent(ge("post_delete" + t), "mouseout"), cur.feedEntriesHTML[t] = ge("post" + t).innerHTML;
        var s = t.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
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
            hash: e,
            feed: 1
        }, {
            onDone: function(e) {
                ge("post" + t).innerHTML = e.replace("%post_raw%", t)
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
        var i = ge("feed_reposts_more" + t + "_" + o),
            r = ge("feed_reposts" + t + "_" + o),
            n = 0,
            a = scrollGetY(),
            c = isVisible(r);
        if (r) return c ? n -= r.offsetHeight + intval(getStyle(e, "marginTop")) : (domPN(domPN(r)) || {}).bits = 0, toggle(r, !c), val(i, c ? getLang("news_show_X_reposts", r.childNodes.length) : getLang("news_hide_reposts")), n && scrollToY(a + n + getSize("page_header")[1], 0), !1;
        i && re(i.parentNode.parentNode)
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
        var i = curBox(),
            r = {
                act: "a_ignore_olist",
                no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0,
                hash: s.hash
            };
        return e.length < t.length ? r.White = e.join(",") : r.Black = t.join(","), ajax.post("al_feed.php", r, {
            onDone: function(e, t) {
                i.hide(), feed.switchSection("photos" == cur.section ? "photos" : "news")
            },
            showProgress: lockButton.pbind(i.btns.ok[0]),
            hideProgress: unlockButton.pbind(i.btns.ok[0])
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
    onListSave: function(s, e, t, o, i) {
        var r = val("feed_list_name");
        if (!trim(r)) return notaBene("feed_list_name"), !1;
        if (!e.length) return !1;
        var n = curBox();
        return ajax.post("al_feed.php", {
            act: "a_save_list",
            hash: cur.tabs_hash,
            White: e.join(","),
            title: r,
            list_id: s,
            no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0
        }, {
            onDone: function(e) {
                var t = geByClass1("feed_section_list" + s, cur.feedEls.rmenu),
                    o = geByClass1("feed_filter_list" + s, cur.feedEls.rmenu);
                val(t, clean(r)), val(geByClass1("ui_actions_menu_item_label", o), clean(r)), n.hide(), 0 < s ? feed.switchList(s) : nav.go({
                    0: "feed",
                    section: "list",
                    list: e
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
        if (s && cancelEvent(s), e <= 0) return !1;
        if (o) {
            i = curBox();
            ajax.post("al_feed.php", extend({
                act: "a_delete_list",
                list_id: e,
                hash: cur.tabs_hash
            }), {
                onDone: function() {
                    re(geByClass1("feed_section_list" + e, cur.feedEls.rmenu)), re(geByClass1("feed_filter_list" + e, cur.feedEls.rmenu)), boxQueue.hideAll(), "list" == cur.section && cur.list == e && feed.switchSection("news")
                },
                showProgress: lockButton.pbind(i.btns.ok[0]),
                hideProgress: unlockButton.pbind(i.btns.ok[0])
            })
        } else {
            feed.toggleTabsMenu(!1, 0);
            var i = showFastBox({
                title: getLang("news_delete_list_sure_title"),
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("news_delete_list_sure").replace("{list}", t), getLang("global_delete"), function() {
                feed.deleteList(e, t, !0)
            }, getLang("global_cancel"), function() {
                i.hide()
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
    editLiveBlacklist: function(e) {
        cancelEvent(e), showBox("al_video.php?act=live_blacklist_box", {}, {
            onDone: function(e, t) {
                VideoLiveBlacklistBox.init(e, t)
            },
            stat: ["videoview.js", "videoview.css", "indexer.js"]
        })
    },
    scrollCheck: debounce(function(e) {
        if ("scroll" == (e = e || {}).type || cur.idleManager && !cur.idleManager.isIdle) {
            var t, o, s, i, r, n, a = feed.longView,
                c = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                l = scrollGetY(),
                d = 0,
                u = [];
            if (cur.isFeedLoading || cur.disableAutoMore || (i = ge("show_more_link"), isVisible(i) && l + c + 1e3 > i.offsetTop && feed.showMore()), domPN(cur.topRow) == cur.rowsCont && "feed_rows_next" != (cur.topRow || {}).id || (cur.topRow = domFC(cur.rowsCont)), vk.id && cur.topRow && "feed_rows_next" != cur.topRow.id && (!((window.curNotifier || {}).idle_manager || {}).is_idle || "init" == e.type)) {
                var f = [];
                for (i = domPS(cur.topRow); i; i = domPS(i)) cur.topRow.offsetTop > l && (cur.topRow = i), i.unseen || (i.unseen = !0, f.push(Feed.postsGetRaws(i)));
                for (Page.postsUnseen(f), i = cur.topRow; i && !(l + c <= (t = d || i.offsetTop)); i = r)
                    if ("feed_rows_next" == ((r = domNS(i)) || {}).id && (r = null), (d = r ? r.offsetTop : t + i.offsetHeight) < l && r && (cur.topRow = r), LongView && LongView.register(i, "feed"), !a.registerElement(i) && !(3 <= (n = i.bits || 0)) && (0 < cur.feedSeenPostHeight ? (cur.feedPostHeaderHeight = cur.feedPostHeaderHeight || getH(geByClass1("post_header", i)), s = (o = t + cur.feedPostHeaderHeight) + cur.feedSeenPostHeight, i.postBottom || (i.postBottom = o + getH(geByClass1("wall_text", i))), n |= (l <= o && o < l + c ? 1 : 0) | (l <= (s = Math.min(s, i.postBottom)) && s < l + c ? 2 : 0)) : n |= (l <= t && t < l + c ? 1 : 0) | (l <= d && d < l + c ? 2 : 0), n && 3 == (i.bits = n))) {
                        var p = feed.postsGetRaws(i);
                        if (u.push(p), hasClass(i, "feed_to_recomm")) statlogsValueEvent("promo_button_view_blocks", p.index, p.module);
                        else if (geByClass1("feed_friends_recomm", i)) {
                            var _ = geByClass1("ui_gallery", i),
                                h = domData(_, "from");
                            Wall.friendsRecommLogSave(["view_block", h, p.index, vkNow(), p.module], !0), uiGetGallery(_).getVisibleItems().forEach(function(e) {
                                Feed.onViewFriendRecomm(e[0], e[1], h)
                            }), _.visible = !0
                        }
                    }
                u = u.concat(a.process(l, c)), LongView && LongView.onScroll(l, c), Page.postsSeen(u);
                var g = ge("show_more_link"),
                    m = g.offsetTop;
                if (!g.seen && l <= m && m < l + c) {
                    g.seen = Date.now();
                    var w = cur.section + (cur.subsection ? "_" + cur.subsection : "");
                    statlogsValueEvent("feed_load_more_seen", isButtonLocked(g), w)
                }
            }
        }
    }, 20),
    postsGetRaws: function(e) {
        var t, o, s, i = indexOf(domPN(e).children, e),
            r = domFC(e),
            n = /^post(-?\d+_\d+)$/,
            a = {};
        if (!r) return a;
        if ("ads_feed_placeholder" === r.id) return a;
        a.module = cur.module, a.index = i, "feed" == cur.module && ("search" == cur.section ? (a.module = "feed_search", a.q = cur.q) : "news" == cur.section ? a.module = cur.subsection ? "feed_news_" + cur.subsection : "feed_news" : "recommended" == cur.section ? a.module = cur.subsection ? "feed_recommended_" + cur.subsection : "feed_recommended" : "friends" == cur.section ? a.module = cur.subsection ? "feed_friends_" + cur.subsection : "feed_friends" : "groups" == cur.section ? a.module = cur.subsection ? "feed_groups_" + cur.subsection : "feed_groups" : "videos" == cur.section ? a.module = cur.subsection ? "feed_videos_" + cur.subsection : "feed_videos" : "photos" == cur.section ? a.module = cur.subsection ? "feed_photos_" + cur.subsection : "feed_photos" : "podcasts" == cur.section ? a.module = cur.subsection ? "feed_podcasts_" + cur.subsection : "feed_podcasts" : "list" == cur.section ? a.module = cur.subsection ? "feed_list_" + cur.subsection : "feed_list" : a.module = "feed_other");
        var c = r.getAttribute("data-ad-view");
        c && (a["ad_" + c] = 1);
        var l = r.getAttribute("post_view_hash");
        if (l && (a.hash = l), "block_" === r.id.substr(0, 6)) {
            a[r.id] = 1, a.block = r.id.substr(6);
            var d = attr(r, "data-contain");
            d && (d = d.split(",")).forEach(function(e) {
                e = e.split(":"), a[e[0]] = intval(e[1]) || 1
            })
        } else if (o = r.id.match(n)) a[o[1]] = 1;
        else if (o = r.id.match(/^post(adsite.*)$/)) a[o[1]] = 1;
        else if (o = (t = r.className).match(/feed_reposts_wrap(-?\d+_\d+)/)) {
            if (s = domFC(r), hasClass(domFC(s), "post_copy") && (a[o[1]] = -1), (o = domFC(s).id.match(n)) && (a[o[1]] = 1), isVisible(s = domNS(s)))
                for (s = domFC(s); s; s = domNS(s))(o = s.id.match(n)) && (a[o[1]] = 1)
        } else if (o = t.match(/feed_repost(-?\d+_\d+)/)) s = domFC(r), hasClass(s, "post_copy") && (a[o[1]] = -1), (o = s.id.match(n)) && (a[o[1]] = 1);
        else {
            var u = r.id;
            hasClass(r, "post_photos") && (s = geByClass1("post_image", r, "a")) && (s = domFC(s)) && (o = s.getAttribute("data-post-id").match(/^(-?\d+_p?\d+)$/)) && (u = o[1]), a[u] = 1
        }
        return a
    },
    searchUpdate: function() {
        var e;
        cur.feedEls.search && getLang("news_search") && (e = cur.section.indexOf("photos") ? cur.section.indexOf("articles") ? getLang("news_search") : getLang("news_articles_search") : getLang("news_photo_search"), cur.feedEls.search.setAttribute("placeholder", clean(unclean(e))), placeholderInit(cur.feedEls.search, {
            reload: !0
        }))
    },
    go: function(params, onBeforeReplace, noscroll) {
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
        (browser.msie || noscroll) && (frame = !1, hideProgress = cur.onFrameBlocksDone), cur.wasScroll = !!noscroll && scrollGetY();
        var eventTarget = window.event && window.event.target;
        if (eventTarget && "search" === params.section && !params._post) {
            var postParams = nav.getPostParams(eventTarget);
            if (postParams.post_id && postParams.post_click_type) {
                function setPostParam(e, t) {
                    e && !params[t] && (params[t] = e)
                }
                setPostParam(postParams.post_id, "_post"), setPostParam(postParams.post_click_type, "_post_click_type"), setPostParam(postParams.post_click_url, "_post_click_url"), setPostParam(postParams.post_click_mention_id, "_post_click_mention_id"), setPostParam(postParams.post_click_cc_key, "_post_click_cc_key"), setPostParam(postParams.ad_data, "_post_ad_data"), setPostParam(postParams.ad_block_unique_id, "_post_ad_block_unique_id")
            }
        }
        var feedReqObj = cur.feedReqObj = {},
            loadedPostsCheckerElements = {},
            loadedPostsCheckerInterval = 100,
            loadedPostsCheckerIterationsCnt = 0,
            loadedPostsCheckerIterationsMax = 500,
            loadedPostsChecker = function() {
                if (cur.feedReqObj && cur.feedReqObj === feedReqObj && !(++loadedPostsCheckerIterationsCnt > loadedPostsCheckerIterationsMax)) {
                    var o = !0,
                        s = {};
                    each(loadedPostsCheckerElements, function(e) {
                        var t = ge(e);
                        if (t && hasClass(t, "feed_row")) return t.firstChild ? void Feed.onPostLoaded(t, !0) : (s[e] = !0, void(o = !1))
                    }), o || (loadedPostsCheckerElements = s, setTimeout(loadedPostsChecker, loadedPostsCheckerInterval))
                }
            },
            ts = +new Date;
        cur.feedReq = ajax.post("al_feed.php", extend(params, {
            part: 1
        }), {
            onDone: function(options, rows, js, app_widget_html, app_widget_js) {
                if (revertLastInlineVideo(), removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0, window.tooltips && tooltips.destroyAll(ge("feed_rows")), boxQueue.hideAll(), layers.fullhide && !cur.storyLayer && layers.fullhide(!0), frame && ajax._framenext(), window.wall && wall.cancelEdit(), boxQueue.hideAll(), onBeforeReplace ? onBeforeReplace(rows || "") : val(cur.rowsCont, rows || ""), feed.applyOptions(options, 2), !params.norecom && "notifications" !== params.section) {
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
                ge("feed_wall").className = wallClass, toggle("feed_recommends", inArray(cur.section, ["news", "recommended", "videos"])), val("feed_app_widget", app_widget_html || ""), toggle("feed_app_widget", app_widget_html), app_widget_html && app_widget_js && eval(app_widget_js), cur.rowsCont && cur.rowsCont.children && (each(cur.rowsCont.children, function() {
                    var e = this;
                    hasClass(e, "feed_row") && (!e.id || e.firstChild ? Feed.onPostLoaded(e, !0) : loadedPostsCheckerElements[e.id] = !0)
                }), isEmpty(loadedPostsCheckerElements) || setTimeout(loadedPostsChecker, 10)), params["c[q]"] && saveSearchAttemptStats("photos_search" === cur.section ? "photos" : "news", ts, cur.count), setTimeout(feed.scrollCheck, 200)
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
        var i, r, n = s || cur.section;
        if (r = n.indexOf("photos") ? n.indexOf("articles") ? (i = "search", "news") : (i = "articles_search", "articles") : (i = "photos_search", "photos"), "search" == i || feed.hasSearchParams(feed.getSectionParams(i))) {
            i != cur.section && feed.setSection(i, 1);
            var a = feed.getSectionParams(i);
            cur.disableSort && (a.disable_sort = 1), feed.go(a), window.searcher && searcher.highlightHotHashtag(t || val(e))
        } else feed.go(feed.getSectionParams(r));
        uiSearch.onChanged(e), uiSearch.showProgress(e)
    },
    onSearchChange: function() {
        return setTimeout(feed.onFeedSearch.pbind(cur.feedEls.search), 0), !1
    },
    init: function(e) {
        var t, o, s, i;
        setTimeout(function() {
            each(geByTag("textarea", cur.rowsCont), function() {
                placeholderSetup(this)
            }), cur.q && saveSearchAttemptStats("photos_search" === cur.section ? "photos" : "news", 0, cur.count)
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
            idleManager: (i = {
                isIdle: !1,
                onIdle: null,
                onUnIdle: null,
                stop: function() {
                    removeEvent(document, "mousemove keydown", t), removeEvent(window, "focus blur", s)
                },
                start: function() {
                    browser.mobile || (t = function() {
                        cur.idleManager && i.isIdle && (i.isIdle = !1, i.onUnIdle && i.onUnIdle())
                    }, o = function() {
                        cur.idleManager && (i.isIdle = !0, i.onIdle && i.onIdle())
                    }, s = function(e) {
                        "focus" == e.type ? t() : o()
                    }, addEvent(window, "focus blur", s))
                }
            }, i),
            currentModule: function() {
                return "videos" == cur.section ? "feed_videos" : cur.module
            },
            onFrameBlocksDone: function() {
                cur.isFeedLoading = !1, (0 === cur.wasScroll || 0 < cur.wasScroll || !1 === cur.wasScroll && "search" == cur.section && cur.q && "#" == cur.q.substr(0, 1)) && (cur.wasScroll = !1)
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
                var i = clone(o);
                if (delete i[0], void 0 === e.section || inArray(cur.section, ["notifications", "replies"]) == inArray(e.section, ["notifications", "replies"])) {
                    if ("notifications" == cur.section) return feed.switchNotifyList(o.list || "all", extend(i, s.params || {})), !1;
                    if (e.list) return feed.switchList(e.list), !1;
                    if (void 0 !== e.section && feed.switchSection(e.section || "news", !1, !0), e.notify) return !1;
                    if (e.q) return val(cur.feedEls.search, e.q), feed.onFeedSearch(cur.feedEls.search), !1;
                    if (delete e.subsection, isEmpty(e)) {
                        var r = geByClass1("feed_section_" + (t.section || "news") + (t.list || ""));
                        r && uiRightMenu.go(r, !1, !1)
                    }
                    return cur.likesTabTT && cur.likesTabTT.destroy(), feed.go(extend(i, s.params || {})), !1
                }
            }
        }), cur.idleManager.onUnIdle = feed.updateTitle, cur.idleManager.onIdle = feed.reSortItems, cur.options = cur.options || {}, extend(cur.options, e), feed.applyOptions(e, 3), cur.rowsCont = e.wallCont = ge("feed_rows"), wall.init(e), cur.rowsCont && cur.rowsCont.children && each(cur.rowsCont.children, function() {
            hasClass(this, "feed_row") && this.firstChild && Feed.onPostLoaded(this, !0)
        }), cur._back = {
            text: getLang("news_return_to_news"),
            show: [feed.startEvents],
            hide: [function() {
                clearInterval(cur.updateInt), removeEvent(window, "scroll", feed.scrollCheck), removeEvent(window, "resize", feed.scrollCheck), cur.idleManager.stop(), clearTimeout(cur.lp_error_to)
            }],
            loc: !1
        }, feed.startEvents(), e.article_feature_tooltip && setTimeout(function() {
            Feed.initArticleFeatureTooltip(e.article_feature_tooltip_hash)
        }, 800), Wall.friendsRecommLogSend(!0), setTimeout(function() {
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
            var i = (e.id || "").match(/^replies(-?\d+_topic\d+)$/);
            if (i) {
                if (i[1].split("_")[0] == s[0]) return wall.showReply(o, i[1], s[0] + "topic_" + s[1], t);
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
        if (!1 === checkEvent(e)) {
            var t = ge("feed_recom_rows"),
                i = ge("feed_recom_more");
            if (2 < t.childNodes.length) {
                for (getSize(t)[1]; 2 < t.childNodes.length;) t.removeChild(t.lastChild);
                return scrollToY(0, 0), hide(i.firstChild.nextSibling), show(i.firstChild), cancelEvent(e)
            }
            return ajax.post("/al_feed.php", {
                act: "recom",
                section: cur.section
            }, {
                cache: 1,
                onDone: function(e) {
                    hide(i.firstChild), show(i.firstChild.nextSibling);
                    for (var t, o = ce("div", {
                            innerHTML: e
                        }), s = ge("feed_recom_rows"); t = o.firstChild;) ge(t.id) ? re(t) : s.appendChild(t);
                    s.childNodes.length % 2 && re(s.lastChild)
                },
                showProgress: function() {
                    hide(i.firstChild), show(i.lastChild)
                },
                hideProgress: function() {
                    show(i.firstChild), hide(i.lastChild)
                }
            }), cancelEvent(e)
        }
    },
    recomSubscribe: function(e, t, o) {
        var s, i, r = o ? t : domPS(t),
            n = o ? domNS(t) : t;
        i = o ? (s = "/al_feed.php", {
            act: "subscr",
            oid: e,
            from: nav.objLoc.section,
            hash: val("feed_recom_hash")
        }) : (s = "/al_fans.php", {
            act: "unsub",
            oid: e,
            hash: val("feed_recom_hash"),
            no_response: 1
        }), ajax.post(s, i, {
            onDone: function() {
                toggle(r, !o), toggle(n, !!o), "recommended" != nav.objLoc.section && nav.go(nav.objLoc, !1, {
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
    clickBlog: function(t, o, s, i) {
        if (ajax.post("blog.php", {
                act: "hide_reminder",
                hash: i,
                nid: o,
                accept: 1
            }, {
                onDone: function() {}
            }), "_blank" === !attr(t, "target")) return cancelEvent(e), nav.go(s)
    },
    hideBlogReminder: function(e, t, o) {
        o && cancelEvent(o), re("feed_blog_reminder"), ajax.post("blog.php", {
            act: "hide_reminder",
            hash: e,
            nid: t,
            accept: 0
        }, {
            onDone: function() {}
        })
    },
    preloadVideos: function(e) {
        function o(e) {
            var t = new XMLHttpRequest;
            t.open("GET", e), t.send()
        }
        e && cur.videoAutoplayScrollHandler && (cur.videoAutoplayPreloaded = cur.videoAutoplayPreloaded || {}, each(e, function(e, t) {
            o(t.index_url), o(t.index_url.replace(/index-(.+).m3u8/, "seg-1-$1.ts")), cur.videoAutoplayPreloaded[t.video] = t.quality
        }))
    },
    expandJoinedGroups: function(e, t) {
        return cancelEvent(t), show(geByClass1("feed_groups_hidden_list", e.parentNode)), re(e), !1
    },
    showAllFilters: function(e) {
        re(e);
        for (var t = geByClass("hide", e.parentNode), o = 0; o < t.length; o++) removeClass(t[o], "hide")
    },
    toggleSubscription: function(e, t, o, n, s) {
        var i = domClosest("_ui_menu_wrap", e);
        i && uiActionsMenu.toggle(i, !hasClass(i, "shown")), Page.toggleSubscription(e, t, o, n, s, function(i, r) {
            geByClass("post", cur.rowsCont).forEach(function(e) {
                var t = e.id.split("_"),
                    o = +t[t.length - 2].replace("post", "");
                if (n === o) {
                    var s = geByClass1("page_action_subscribe", e);
                    val(s, i), domData(s, "act", r)
                }
            })
        })
    },
    logBlockInteraction: function(e, t, o) {
        var s = indexOf(domPN(e).children, e);
        statlogsValueEvent("block_interaction", s, t, o)
    },
    initArticleFeatureTooltip: function(e) {
        var t = geByClass1("_submit_post_box"),
            o = geByClass1("ms_item_article");
        if (o && isVisible(o) && !hasClass(t, "shown")) {
            var s = !1,
                i = '<div class="article_feat_tt">';
            i += '<div class="feature_tooltip__close"></div>', i += '<div class="article_feat_tt__text">' + getLang("wall_article_feature_text") + "</div>", i += "</div>", i = se(i), cur.articleFeatureTT = new ElementTooltip(o, {
                content: i,
                forceSide: "bottom",
                customShow: !0,
                cls: "feature_intro_tt feature_info_tooltip articles_feature_tooltip",
                autoShow: !1,
                noHideOnClick: !0,
                noAutoHideOnWindowClick: !0,
                appendTo: t,
                centerShift: -120,
                offset: [6, -3],
                onShow: function() {
                    addClass(o, "ms_item_article_highlight")
                },
                onHide: function() {
                    removeClass(o, "ms_item_article_highlight")
                }
            }), cur.articleFeatureTT.show(), addEvent(geByClass1("feature_tooltip__close", i), "click", function(e) {
                return cur.articleFeatureTT.hide(), n(), cancelEvent(e)
            });
            var r = setTimeout(function() {
                n()
            }, 3e3);
            cur.destroy.push(function() {
                clearTimeout(r)
            }), cur.onShowEditPost = function() {
                cur.articleFeatureTT.hide(), n()
            }
        }

        function n() {
            s || (s = !0, ajax.post("al_index.php", {
                act: "hide_feature_tt",
                hash: e,
                type: "articles_web"
            }))
        }
    },
    showHotTooltip: function(e) {
        var t = geByClass1("hot");
        t && (cur.hotFeatureTT = new ElementTooltip(t, {
            content: '<div class="feature_tooltip__close" onclick="cur.hotFeatureTT.hide();"></div>' + getLang("wall_hot_feature_text"),
            forceSide: "left",
            cls: "feature_intro_tt feature_info_tooltip hot_feature_tooltip",
            autoShow: !1,
            noHideOnClick: !0,
            noAutoHideOnWindowClick: !0,
            appendToParent: !0,
            offset: [15, 0],
            onHide: function() {
                ajax.post("al_index.php", {
                    act: "hide_feature_tt",
                    hash: e,
                    type: "hot_web"
                })
            }
        }), cur.hotFeatureTT.show())
    },
    updateTimer: function() {
        if (TimeSpent) {
            var e = [cur.section, cur.subsection].filter(Boolean).join("_");
            TimeSpent.update(e)
        }
    },
    onPostLoaded: function(e, t) {
        var s = geByClass1("ui_gallery", e);
        if (s) {
            var o = domData(s, "from") || "user_rec",
                i = {
                    scrollY: !1,
                    onViewItem: function(e, t) {
                        s.visible && Feed.onViewFriendRecomm(e, t, o)
                    },
                    onDestroy: function() {
                        re(e)
                    }
                };
            cur.friends_recomm_from && (i.onLoadMore = function() {
                ajax.post("al_feed.php", {
                    act: "a_recomm_friends_gallery",
                    from: cur.friends_recomm_from
                }, {
                    onDone: function(e, t) {
                        var o = [];
                        e && (o = domChildren(ce("div", {
                            innerHTML: e
                        }))), uiGetGallery(s).addMore(o, !t), cur.friends_recomm_from = t
                    }
                })
            }), new UIGallery(s, i)
        }
        Wall.onPostLoaded(e, t)
    },
    onViewFriendRecomm: function(e, t, o) {
        if (!e.viewed) {
            var s = +domData(e, "uid");
            Wall.friendsRecommLogSave(["show_user_rec", s, vkNow(), t, o]), e.viewed = !0
        }
    },
    openPostSuggest: function(t, o, s) {
        function e() {
            cur.wallAddMedia && cur.wallAddMedia.unchooseMedia(), o[0] = o[0].replace(/<br>/g, "\n");
            var e = cur.editing;
            delete cur.editing, Wall.setDraft(o), Feed.closePostSuggest(t, "open", s), cur.editing = e
        }
        var i = ge("post_field");
        (i ? trim(i.innerHTML).replace("<br>", "") : "") || cur.wallAddMedia && cur.wallAddMedia.attachCount() ? showFastBox({
            title: getLang("news_suggest_alert_title"),
            dark: 1
        }, getLang("news_suggest_alert_text"), getLang("global_yes"), function() {
            curBox().hide(), e()
        }, getLang("global_cancel")) : e()
    },
    closePostSuggest: function(e, t, o) {
        return ajax.post("al_feed.php", {
            act: "close_suggestion",
            suggest_id: e,
            close_type: t
        }), re(geByClass1("_post_suggest")), cancelEvent(o)
    },
    hideRightBlock: function(e, t, o) {
        var s = domCA(e, ".page_block");
        return re(s), ajax.post("al_feed.php", {
            act: "a_hide_right_block",
            block_type: t,
            hash: o
        }), !1
    }
};
window.feed = Feed;
try {
    stManager.done("feed.js")
} catch (e) {}