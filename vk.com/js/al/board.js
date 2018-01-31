var Board = {
    createTopic: function(e, o) {
        for (var t = trim(val("bnt_title")), r = trim(val("bnt_text")), d = {}, i = cur.boardNewMedia.getMedias() || {}, a = [], s = [], n = !1, c = 0, l = i.length; l > c; ++c) {
            var u = i[c];
            if (u) {
                if ("poll" == u[0]) {
                    n = !0;
                    continue
                }
                s.push(u[0]), a.push(u[1])
            }
        }
        if (!t) return notaBene("bnt_title"), elfocus("bnt_title");
        if (!r && !a.length) return notaBene("bnt_text"), elfocus("bnt_text");
        if (n) {
            if (d = cur.boardNewMedia.pollData(), !d) return !1;
            d.question = d.media, delete d.media, delete d.anonymous
        }
        globalHistoryDestroy("board" + -e), _tbLink && _tbLink.loc && (cur.__phinputs = cur.__phinputs || [], globalHistoryDestroy(_tbLink.loc)), ajax.post("/al_board.php", extend({
            act: "do_create",
            oid: e,
            hash: o,
            title: t,
            post: r,
            media_types: s,
            media: a,
            from_group: isChecked("bnt_from_group"),
            survey: isChecked("bnt_survey")
        }, d), {
            showProgress: lockButton.pbind(ge("bnt_subm")),
            hideProgress: unlockButton.pbind(ge("bnt_subm"))
        })
    },
    scrollResize: function() {
        if (!browser.mobile && !cur.pvShown) {
            var e = document.documentElement,
                o = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                t = scrollGetY(),
                r = ge("blst_load_more");
            isVisible(r) && t + o > r.offsetTop && Board.load()
        }
    },
    initScroll: function() {
        extend(cur, {
            module: "board",
            searchField: ge("board_q")
        }), cur.searchField && elfocus(cur.searchField), addEvent(window, "scroll", Board.scrollResize), addEvent(window, "resize", Board.scrollResize), removeEvent(window, "load", Board.initScroll), cur.destroy.push(Board.deinitScroll)
    },
    deinitScroll: function() {
        removeEvent(window, "scroll", Board.scrollResize), removeEvent(window, "resize", Board.scrollResize)
    },
    loaded: function(e, o) {
        cur.offset = e;
        for (var t = ge("blst_cont"), r = ce("div", {
                innerHTML: o
            }); r.firstChild;) t.appendChild(r.firstChild);
        if (e >= cur.count || !o) return void hide("blst_load_more");
        cur.loading = 1;
        var d = cur.query ? {
            act: "search",
            q: cur.query
        } : {
            order: cur.order
        };
        ajax.post("/board" + cur.gid, extend(d, {
            offset: cur.offset,
            part: 1
        }), {
            cache: 1,
            onDone: function() {
                2 == cur.loading ? Board.loaded.apply(window, arguments) : cur.loading = !1
            },
            onFail: function() {
                return cur.loading = 0, !0
            }
        })
    },
    load: function() {
        if (isVisible("blst_load_more") && !isVisible("blst_more_progress")) {
            if (cur.loading) return void(cur.loading = 2);
            var e = cur.query ? {
                act: "search",
                q: cur.query
            } : {
                order: cur.order
            };
            ajax.post("/board" + cur.gid, extend(e, {
                offset: cur.offset,
                part: 1
            }), {
                onDone: Board.loaded,
                onFail: function() {
                    return cur.loading = 0, !0
                },
                showProgress: function() {
                    show("blst_more_progress"), hide(ge("blst_load_more").firstChild)
                },
                hideProgress: function() {
                    show(ge("blst_load_more").firstChild), hide("blst_more_progress")
                },
                cache: 1
            })
        }
    },
    topicFieldUpdated: function() {
        var e = window.Emoji ? Emoji.editableVal(cur.addField) : "",
            o = getSize(cur.addBlock)[1],
            t = cur.addBlockHeight != o,
            r = cur.addText != e;
        t && (cur.addBlockHeight = o, cur.addBlockWrap.style.height = o + "px"), r && (cur.addText = e), (t || r) && Board.topicOnScroll(!1, !1, !0)
    },
    topicAttachWillAdd: function() {
        setTimeout(Board.topicFieldUpdated, 10), setTimeout(Board.topicFieldUpdated, 100), setTimeout(Board.topicFieldUpdated, 1e3)
    },
    repliesCount: function() {
        var e = cur.addText.match(/\[post\d+\|[^\]]+\]/g),
            o = 0;
        for (var t in e || {}) ++o;
        return o
    },
    replyPost: function(e, o) {
        if (browser.mobile && window.Emoji) return Emoji.focus(cur.addField);
        Board.topicOnScroll(!1, !1, !0);
        var t = Board.repliesCount();
        if (t >= 10 && window.Emoji) return setTimeout(Emoji.focus.pbind(cur.addField), 0);
        var r = cur.names[o].replace("{post_id}", "post" + e);
        return r = r.replace(/ $/, "&nbsp;"), window.Emoji ? (elfocus(cur.addField), Emoji.insertHTML(r), cur.addText = Emoji.editableVal(cur.addField), !1) : !1
    },
    saveTopic: function(e) {
        var o = curBox(),
            t = geByClass1("_bet_title", o.bodyNode),
            r = geByClass1("_bet_closed", o.bodyNode),
            d = geByClass1("_bet_fixed", o.bodyNode),
            i = geByClass1("_bet_poll_closed", o.bodyNode),
            a = geByClass1("_bet_poll_fixed", o.bodyNode),
            s = trim(val(t));
        return s ? (e || (e = geByClass("flat_button", domNS(curBox().bodyNode))[1]), poll = cur.boardEditMedia.pollData(), poll && (poll.question = poll.media, delete poll.media, delete poll.anonymous), void ajax.post("/al_board.php", extend({
            act: "save_topic_info",
            topic: cur.topic,
            hash: cur.hash,
            offset: nav.objLoc.offset,
            title: s,
            closed: isChecked(r) ? 1 : 0,
            fixed: isChecked(d) ? 1 : 0,
            poll_closed: isChecked(i) ? 1 : 0,
            poll_fixed: isChecked(a) ? 1 : 0
        }, poll || {}), {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })) : (notaBene(t), elfocus(t))
    },
    checkDeleteTopic: function() {
        return showFastBox(getLang("board_edit_topic"), getLang("board_sure_delete_topic"), getLang("global_delete"), Board.deleteTopic, getLang("global_cancel"))
    },
    deleteTopic: function(e) {
        ajax.post("/al_board.php", {
            act: "delete_topic",
            topic: cur.topic,
            hash: cur.hash
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    emojiShowTT: function(e, o) {
        return void 0 === cur.baEmoji ? !1 : Emoji.ttShow(cur.baEmoji, e, o)
    },
    emojiHideTT: function(e, o) {
        return void 0 === cur.baEmoji ? !1 : Emoji.ttHide(cur.baEmoji, e, o)
    },
    initTopic: function(e, o) {
        var t = e.owner + "_topic" + e.topicId;
        extend(cur, {
            module: "board",
            docked: !1,
            topic: e.topic,
            owner: e.owner,
            hash: e.hash,
            postLimit: e.limit,
            postTo: "board" + -e.owner,
            options: {
                rmedia_types: e.media,
                max_post_len: e.max_post_len,
                share: {}
            },
            wallTpl: e.wallTpl,
            names: e.names,
            addField: ge("reply_field" + t),
            addBlock: ge("bt_reply_form"),
            addBlockWrap: ge("bt_reply_form_wrap"),
            pgStart: e.start,
            pgOffset: e.offset,
            pgCount: e.count,
            pgPerPage: e.perpage,
            pgCont: ge("bt_rows"),
            pgMore: ge("bt_load_more"),
            pgPages: ge("bt_pages"),
            pgPreload: o,
            pgUrl: e.url,
            pgHref: e.url + "?offset=",
            pgPostProcess: Board.loadedPosts,
            pgOnScroll: Board.topicOnScroll,
            pgNoArrowNav: Board.noArrowNav,
            updates: e.updates,
            topicMyReplied: !1,
            topicMyDeleted: {},
            hasGroupAudioAccess: e.hasGroupAudioAccess
        }), Board.initUpdates(), cur.addField && (data(cur.addField, "send", Board.sendPost), placeholderInit(cur.addField, {
            editable: 1
        }), Board.topicFieldUpdated(), cur.onReplyFormSizeUpdate = Board.topicFieldUpdated, cur.onMediaChanged = Board.topicAttachWillAdd), Board.topicOnScroll(!1, !1, !0), Pagination.init(e.bottom), cur.destroy.push(Pagination.deinit), cur.destroy.push(removeEvent.pbind(window, "keydown", Board.handleEditEsc))
    },
    initUpdates: function() {
        cur.updates && window.Notifier && (Board.checkUpdates(), cur.updates.unread = 0, cur.updates.interval = setInterval(Board.checkUpdates, 2e4), cur.destroy.push(function() {
            clearInterval(cur.updates.interval)
        }), isArray(cur.onUnidle) || (cur.onUnidle = []), cur.onUnidle.push(function() {
            Board.updateTitle(!0)
        }))
    },
    checkUpdates: function() {
        cur.updates && cur.updates.queue && Notifier.addKey(cur.updates.queue, Board.checkedUpdates)
    },
    getAbsDate: function(e) {
        var o, t = new Date(e || vkNow()),
            r = t.getHours(),
            d = t.getMinutes(),
            i = "";
        return cur.updates.time_system && (i = cur.updates.time_system[r > 11 ? 1 : 0], r = r % 12 || 12), o = r > 9 ? r : "0" + r, d = d > 9 ? d : "0" + d, cur.updates.date_format.replace("{am_pm}", i).replace("{hour}", r).replace("{num_hour}", o).replace("{minute}", d)
    },
    checkedUpdates: function(e, o) {
        if (cur.updates && cur.updates.queue && cur.updates.queue.key == e) {
            if (o.failed) return void(cur.updates.queue = !1);
            if (cur.updates.queue.ts = o.ts, isArray(o.events) && o.events.length) {
                var t = !1;
                each(o.events, function() {
                    var e = this.split("<!>"),
                        o = e[0],
                        r = e[1],
                        d = (e[2], e[4]),
                        i = ge("post" + d);
                    if (o != cur.updates.qversion) return location.reload(), !1;
                    switch (e[3] > -1 && (t = e[3]), r) {
                        case "new_post":
                            if (cur.topicMyReplied || i || cur.pgOffset < cur.pgCount) break;
                            var a = {
                                    actions: "",
                                    owner_id: cur.owner,
                                    topic_raw: cur.topic,
                                    post_raw: d,
                                    post_id: e[5],
                                    post_uid: e[6],
                                    name: e[7],
                                    photo: psr(e[8]),
                                    link: e[9],
                                    text: e[10],
                                    media: psr(e[11]),
                                    date: Board.getAbsDate(),
                                    reply_link: "",
                                    online: ""
                                },
                                s = cur.updates.skin,
                                n = "";
                            vk.id && (vk.id == a.post_uid || cur.updates.admin_level > 0 ? (n += rs(s.postAction, {
                                post_raw: a.post_raw,
                                onclick: "return Board.deletePost(this, " + a.post_id + ")",
                                tt: getLang("global_delete"),
                                action: "bp_delete"
                            }), (vk.id == a.post_uid || cur.updates.admin_level > 1) && (n += rs(s.postAction, {
                                post_raw: a.post_raw,
                                onclick: "return Board.editPost(this, " + a.post_id + ")",
                                tt: getLang("Edit"),
                                action: "bp_edit"
                            }))) : vk.id != a.post_uid && (n += rs(s.postAction, {
                                post_raw: a.post_raw,
                                onclick: "return Board.reportPost(this, " + a.post_id + ")",
                                tt: getLang("its_spam"),
                                action: "bp_delete"
                            })), (vk.id != a.post_uid || cur.updates.admin_level > 1) && (a.reply_link = rs(s.reply_link, {
                                post_id: a.post_id,
                                post_uid: a.post_uid
                            }))), a.actions = n, cur.names[a.post_uid] = e[12];
                            var c = se(rs(s.post, a));
                            ge("bt_rows").appendChild(c), setTimeout(addClass.pbind(c, "bp_animated"), 0), setTimeout(removeClass.pbind(c, "bp_selected"), 5e3), cur.pgOffset++, cur.pgCount++, window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle && cur.updates.unread++;
                            break;
                        case "del_post":
                            if (cur.topicMyDeleted[d] || !i) break;
                            hide(i), cur.pgOffset--, cur.pgCount--;
                            break;
                        case "res_post":
                            if (isVisible(i)) break;
                            show(i), cur.pgOffset++, cur.pgCount++
                    }
                }), t !== !1 && (val("bt_summary", t || ""), Pagination.pageReady(!1), Board.topicOnScroll(!1, !1, !0), Board.updateTitle())
            }
        }
    },
    updateTitle: function(e) {
        cur.updates && (e && (cur.updates.unread = 0), setDocumentTitle(replaceEntities((cur.updates.unread ? "(" + cur.updates.unread + ") " : "") + cur.updates.skin.title)))
    },
    cancelAddPost: function(e) {
        if (e === !0) {
            var o = cur.addField && data(cur.addField, "composer");
            o ? Composer.reset(o) : Emoji.val(cur.addField, ""), hide(geByClass1("reply_warn", cur.addBlock)), Board.topicFieldUpdated()
        } else cur.docked = !1, setStyle(cur.addBlock, {
            width: null,
            marginLeft: null
        }), removeClass(cur.addBlock, "fixed")
    },
    topicResetStyle: function() {
        cur.addBlock.style.left = ""
    },
    topicOnScroll: function(e, o, t) {
        if ((o === !1 || void 0 === o) && (o = scrollGetY()), cur.addField) {
            (t === !0 || cur.bEditingPost) && (cur.addBlockTop = getXY(cur.addBlockWrap)[1]);
            var r = o + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight,
                d = r ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null;
            setStyle(cur.addBlock, {
                marginLeft: d
            }), r && !cur.docked ? (setStyle(cur.addBlock, "width", getSize(cur.addBlockWrap)[0]), addClass(cur.addBlock, "fixed"), cur.docked = !0) : !r && cur.docked && Board.cancelAddPost(), cur.docked && e && "resize" == e.type && (cur.addBlock.style.left = ge("page_layout").offsetLeft + ge("content").offsetLeft + "px", setTimeout(Board.topicResetStyle, 0))
        }
    },
    loadedPosts: function(e, o, t, r, d, i, a) {
        Board.topicOnScroll(!1, !1, !0), val("bt_summary", e || ""), i ? Board.cancelEditPost() : a = r, extend(cur.names, a)
    },
    noArrowNav: function() {
        return cur.__focused || cur.bEditingPost
    },
    scrollToEnd: function() {
        scrollToY(cur.addBlockTop + cur.addBlockHeight - lastWindowHeight, 0, void 0, !0)
    },
    sendPost: function(e, o, t) {
        var r = ge("reply_button" + e);
        if (!buttonLocked(r)) {
            var d = ge("reply_field" + e),
                i = d && data(d, "composer"),
                r = ge("reply_button" + e),
                a = ge("bt_reply_as_group"),
                s = {},
                n = t.stickerId;
            if (n) s = {
                message: "",
                attach1_type: "sticker",
                attach1: n,
                sticker_referrer: t.sticker_referrer
            };
            else if (s = i ? Composer.getSendParams(i, Board.sendPost.pbind(e)) : {
                    message: trim(Emoji.editableVal(d))
                }, !s.attach1_type && !s.message) return void Emoji.editableFocus(d, !1, !0);
            var c = ((cur.pgCont.childNodes[cur.pgNodesCount - 1].id || "").match(/\d+$/) || [0])[0];
            s = Wall.fixPostParams(extend(s, {
                act: "post_comment",
                topic: cur.topic,
                hash: cur.hash,
                last: c,
                from_group: a && domData(domClosest("_submit_post_box", ge(a)), "from-oid") < 0 ? 1 : ""
            })), cur.topicMyReplied = !0, ajax.post("/al_board.php", s, {
                onDone: function(e, o, t, r, d, i) {
                    cur.topicMyReplied = !1, re("b_no_content"), Pagination.loaded.apply(window, arguments), Board.cancelAddPost(!n), window.Emoji && Emoji.focus(cur.addField), setTimeout(Board.scrollToEnd, 0), d && r && nav.setLoc(extend(nav.objLoc, {
                        offset: r
                    }))
                },
                showProgress: lockButton.pbind(r),
                hideProgress: unlockButton.pbind(r)
            })
        }
    },
    deleteReportPost: function(e, o, t) {
        o = cur.owner + "_" + o, hasClass(e, "bp_loading") || (cur.topicMyDeleted[o] = 1, ajax.post("/al_board.php", {
            act: t,
            post: o,
            hash: cur.hash
        }, {
            onDone: function(e, t) {
                var r = ge("post" + o),
                    d = r && geByClass1("bp_deleted_text", r);
                r && (d.innerHTML = e, addClass(r, "bp_deleted")), t && (Pagination.recache(-1), Board.loadedPosts(cur.pgCount))
            },
            showProgress: addClass.pbind(e, "bp_loading"),
            hideProgress: removeClass.pbind(e, "bp_loading")
        }))
    },
    deletePost: function(e, o) {
        return Board.deleteReportPost(e, o, "delete_comment"), !1
    },
    reportPost: function(e, o) {
        return Board.deleteReportPost(e, o, "spam_comment"), !1
    },
    restorePost: function(e) {
        return e = cur.owner + "_" + e, cur.topicMyDeleted[e] = 0, ajax.post("/al_board.php", {
            act: "restore_comment",
            post: e,
            hash: cur.hash
        }, {
            onDone: function() {
                var o = ge("post" + e);
                o && (removeClass(o, "bp_deleted"), Pagination.recache(1), Board.loadedPosts(cur.pgCount))
            }
        }), !1
    },
    editPost: function(e, o) {
        if (cur.bEditingPost) return ge("bpe_text") ? notaBene("bpe_text") : !1;
        o = cur.owner + "_" + o, cur.bEditingPost = o;
        var t = ge("post" + o),
            r = ge("bp_data" + o),
            d = geByClass1("bp_bottom", t);
        return ajax.post("/al_board.php", {
            act: "edit_comment",
            post: o
        }, {
            onDone: function(e, o, i) {
                addEvent(window, "keydown", Board.handleEditEsc);
                var a = domFC(domPN(r).insertBefore(se(rs(cur.updates.skin.editPost, {
                    text: e,
                    add: i ? '<div class="bpe_auth">' + i + "</div>" : ""
                })), r));
                addClass(t, "bp_editing"), setTimeout(function() {
                    if (show(a.parentNode), elfocus(a), hide(r, d), cur.boardEditMedia = new MediaSelector(ge("bpe_add_media"), "bpe_media_preview", cur.options.rmedia_types, {
                            limit: 10,
                            hideAfterCount: 5,
                            editable: 1,
                            sortable: 1,
                            teWidth: 420,
                            teHeight: 300
                        }), o && o.length)
                        for (var e = 0, t = (o || []).length; t > e; ++e) cur.boardEditMedia.chooseMedia.apply(window, o[e]);
                    Wall.initComposer(a, {
                        lang: {
                            introText: getLang("profile_mention_start_typing"),
                            noResult: getLang("profile_mention_not_found")
                        }
                    }), autosizeSetup(a, {
                        minHeight: 30
                    })
                }, 0)
            },
            onFail: function() {
                cur.bEditingPost = !1
            },
            showProgress: addClass.pbind(e, "bp_loading"),
            hideProgress: removeClass.pbind(e, "bp_loading")
        }), !1
    },
    cancelEditPost: function(e, o, t) {
        var r = cur.bEditingPost,
            d = ge("bpe_save");
        if (!(!r || d && buttonLocked(d)) && (cur.bEditingPost = !1, d)) {
            removeEvent(window, "keydown", Board.handleEditEsc), cleanElems(ge("bpe_add_media"));
            var i = ge("post" + r),
                a = ge("bp_data" + r),
                s = a.firstChild,
                n = s.nextSibling,
                c = geByClass1("bp_bottom", i);
            if (void 0 !== e && (val(s, e), (e ? show : hide)(s)), void 0 !== o && (n && !o ? re(n) : o && (n || (n = a.appendChild(ce("div"))), a.replaceChild(ce("div", {
                    innerHTML: o
                }).firstChild, n))), void 0 !== t) {
                var l = geByClass1("bp_edited_by", i);
                val(l, t), (t ? show : hide)(l)
            }
            return show(c, a), removeClass(i, "bp_editing"), Wall.deinitComposer(ge("bpe_text")), re(ge("bpe_text").parentNode), Board.topicOnScroll(!1, !1, !0), !1
        }
    },
    handleEditEsc: function(e) {
        e.keyCode == KEY.ESC && Board.cancelEditPost()
    },
    savePost: function() {
        var e = cur.bEditingPost,
            o = ge("bpe_save");
        if (e && o && !buttonLocked(o)) {
            var t = trim(val("bpe_text")),
                r = cur.boardEditMedia || {},
                d = r.chosenMedia || {},
                i = cur.boardEditMedia ? r.getMedias() : [],
                a = {
                    act: "save_comment",
                    post: e,
                    hash: cur.hash,
                    comment: t
                },
                s = 0;
            return isArray(d) && d.length && i.push(clone(d)), i.length && each(i, function(e, o) {
                o && (++s, a["attach" + s + "_type"] = this[0], a["attach" + s] = this[1])
            }), s || t ? void ajax.post("/al_board.php", a, {
                onDone: Board.cancelEditPost,
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o)
            }) : elfocus("bpe_text")
        }
    },
    votingUpdate: function(html, js) {
        curBox() && curBox().hide();
        var wrap = ge("bv_voting");
        wrap.innerHTML = html, js && eval(js), /^board\d+([\?#]|$)/.test(_tbLink.loc || "") || globalHistoryDestroy(_tbLink.loc)
    },
    vote: function(e, o, t, r) {
        var d = hasClass(e.firstChild, "progress") ? e.firstChild : e.insertBefore(ce("span", {
            className: "fl_r progress"
        }), e.firstChild);
        ajax.post("al_voting.php", {
            act: "vote",
            option_id: r,
            owner_id: o,
            voting_id: t,
            context: "topic",
            hash: cur.polls[t].hash
        }, {
            onDone: Board.votingUpdate,
            progress: d
        })
    },
    mentionOver: function(e) {
        var o = ((e.getAttribute("mention") || "").match(/^bp(-?\d+_\d+)$/) || {})[1];
        return o ? void showTooltip(e, {
            url: "/al_board.php",
            params: {
                act: "post_tt",
                post: o
            },
            slide: 15,
            shift: [78, 3, 5],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: "auto",
            className: "rich board_tt wall_module"
        }) : void mentionOver(e)
    },
    editTopic: function(e, o) {
        return showBox("/al_board.php", {
            act: "edit_topic_box",
            topic: cur.topic
        })
    },
    goCreate: function(e, o) {
        return nav.go({
            0: "board" + cur.gid,
            act: "create"
        }, o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    resetSearch: function(e, o) {
        return nav.go({
            0: "board" + cur.gid
        }, o, {
            back: !0
        })
    },
    doSearch: function(e, o, t) {
        return o ? nav.go({
            0: "board" + cur.gid,
            act: "search",
            q: o
        }, t, {
            showProgress: uiSearch.showProgress.pbind(e),
            hideProgress: function() {
                e.setValue(""), uiSearch.onChanged(e), uiSearch.hideProgress(e)
            }
        }) : cur.query && nav.objLoc.q ? nav.go({
            0: "board" + cur.gid
        }, t, {
            back: !0
        }) : !1
    },
    searchGo: function(e, o) {
        return nav.go(e, o, {
            params: {
                q: nav.objLoc.q
            }
        })
    }
};
try {
    stManager.done("board.js")
} catch (e) {}