var Board = {
    initTopicEditBox: function(e, t, o) {
        var r = curBox(),
            d = r.bodyNode,
            a = geByClass1("_bet_title", d),
            i = geByClass1("_bet_media_preview", d),
            s = geByClass1("_bet_attach", d);
        elfocus(a), cur.boardEditMedia = new MediaSelector(s, i, e, {
            editable: 1,
            sortable: 1,
            teWidth: 420,
            teHeight: 300
        }), t && cur.boardEditMedia.chooseMedia("poll", "", t), r.removeButtons(), r.addButton(o, this.saveTopic.bind(this)), r.addButton(getLang("global_cancel"), r.hide, "no"), r.setOptions({
            width: 450
        })
    },
    createTopic: function(e, t) {
        for (var o = trim(val("bnt_title")), r = trim(val("bnt_text")), d = {}, a = cur.boardNewMedia.getMedias() || {}, i = [], s = [], n = !1, c = 0, l = a.length; l > c; ++c) {
            var u = a[c];
            if (u) {
                if ("poll" == u[0]) {
                    n = !0;
                    continue
                }
                s.push(u[0]), i.push(u[1])
            }
        }
        return o ? r || i.length ? n && (d = cur.boardNewMedia.pollData(), !d) ? !1 : (globalHistoryDestroy("board" + -e), _tbLink && _tbLink.loc && (cur.__phinputs = cur.__phinputs || [], globalHistoryDestroy(_tbLink.loc)), void ajax.post("/al_board.php", extend({
            act: "do_create",
            oid: e,
            hash: t,
            title: o,
            post: r,
            media_types: s,
            media: i,
            from_group: isChecked("bnt_from_group"),
            survey: isChecked("bnt_survey")
        }, d), {
            showProgress: lockButton.pbind(ge("bnt_subm")),
            hideProgress: unlockButton.pbind(ge("bnt_subm"))
        })) : (notaBene("bnt_text"), elfocus("bnt_text")) : (notaBene("bnt_title"), elfocus("bnt_title"))
    },
    scrollResize: function() {
        if (!browser.mobile && !cur.pvShown) {
            var e = document.documentElement,
                t = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                o = scrollGetY(),
                r = ge("blst_load_more");
            isVisible(r) && o + t > r.offsetTop && Board.load()
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
    loaded: function(e, t) {
        cur.offset = e;
        for (var o = ge("blst_cont"), r = ce("div", {
                innerHTML: t
            }); r.firstChild;) o.appendChild(r.firstChild);
        if (e >= cur.count || !t) return void hide("blst_load_more");
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
            t = getSize(cur.addBlock)[1],
            o = cur.addBlockHeight != t,
            r = cur.addText != e;
        o && (cur.addBlockHeight = t, cur.addBlockWrap.style.height = t + "px"), r && (cur.addText = e), (o || r) && Board.topicOnScroll(!1, !1, !0)
    },
    topicAttachWillAdd: function() {
        setTimeout(Board.topicFieldUpdated, 10), setTimeout(Board.topicFieldUpdated, 100), setTimeout(Board.topicFieldUpdated, 1e3)
    },
    repliesCount: function() {
        var e = cur.addText.match(/\[post\d+\|[^\]]+\]/g),
            t = 0;
        for (var o in e || {}) ++t;
        return t
    },
    replyPost: function(e, t) {
        if (browser.mobile && window.Emoji) return Emoji.focus(cur.addField);
        Board.topicOnScroll(!1, !1, !0);
        var o = Board.repliesCount();
        if (o >= 10 && window.Emoji) return setTimeout(Emoji.focus.pbind(cur.addField), 0);
        var r = cur.names[t].replace("{post_id}", "post" + e);
        return r = r.replace(/ $/, "&nbsp;"), window.Emoji ? (elfocus(cur.addField), Emoji.insertHTML(r), cur.addText = Emoji.editableVal(cur.addField), !1) : !1
    },
    saveTopic: function(e) {
        var t = curBox(),
            o = geByClass1("_bet_title", t.bodyNode),
            r = geByClass1("_bet_closed", t.bodyNode),
            d = geByClass1("_bet_fixed", t.bodyNode),
            a = (geByClass1("_bet_poll_closed", t.bodyNode), geByClass1("_bet_poll_fixed", t.bodyNode), !1),
            i = trim(val(o)),
            s = cur.boardEditMedia.getMedias() || {};
        for (var n in s)
            if (s.hasOwnProperty(n) && "poll" === s[n][0]) {
                a = !0;
                break
            }
        if (!i) return notaBene(o), elfocus(o);
        e || (e = geByClass("flat_button", domNS(curBox().bodyNode))[1]);
        var c = {};
        return a && (c = cur.boardEditMedia.pollData(), !c) ? !1 : void ajax.post("/al_board.php", extend({
            act: "save_topic_info",
            topic: cur.topic,
            hash: cur.hash,
            offset: nav.objLoc.offset,
            title: i,
            closed: isChecked(r) ? 1 : 0,
            fixed: isChecked(d) ? 1 : 0
        }, c || {}), {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
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
    emojiShowTT: function(e, t) {
        return void 0 === cur.baEmoji ? !1 : Emoji.ttShow(cur.baEmoji, e, t)
    },
    emojiHideTT: function(e, t) {
        return void 0 === cur.baEmoji ? !1 : Emoji.ttHide(cur.baEmoji, e, t)
    },
    initTopic: function(e, t) {
        var o = e.owner + "_topic" + e.topicId;
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
            addField: ge("reply_field" + o),
            addBlock: ge("bt_reply_form"),
            addBlockWrap: ge("bt_reply_form_wrap"),
            pgStart: e.start,
            pgOffset: e.offset,
            pgCount: e.count,
            pgPerPage: e.perpage,
            pgCont: ge("bt_rows"),
            pgMore: ge("bt_load_more"),
            pgPages: ge("bt_pages"),
            pgPreload: t,
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
        var t, o = new Date(e || vkNow()),
            r = o.getHours(),
            d = o.getMinutes(),
            a = "";
        return cur.updates.time_system && (a = cur.updates.time_system[r > 11 ? 1 : 0], r = r % 12 || 12), t = r > 9 ? r : "0" + r, d = d > 9 ? d : "0" + d, cur.updates.date_format.replace("{am_pm}", a).replace("{hour}", r).replace("{num_hour}", t).replace("{minute}", d)
    },
    checkedUpdates: function(e, t) {
        if (cur.updates && cur.updates.queue && cur.updates.queue.key == e) {
            if (t.failed) return void(cur.updates.queue = !1);
            if (cur.updates.queue.ts = t.ts, isArray(t.events) && t.events.length) {
                var o = !1;
                each(t.events, function() {
                    var e = this.split("<!>"),
                        t = e[0],
                        r = e[1],
                        d = (e[2], e[4]),
                        a = ge("post" + d);
                    if (t != cur.updates.qversion) return location.reload(), !1;
                    switch (e[3] > -1 && (o = e[3]), r) {
                        case "new_post":
                            if (cur.topicMyReplied || a || cur.pgOffset < cur.pgCount) break;
                            var i = {
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
                            vk.id && (vk.id == i.post_uid || cur.updates.admin_level > 0 ? (n += rs(s.postAction, {
                                post_raw: i.post_raw,
                                onclick: "return Board.deletePost(this, " + i.post_id + ")",
                                tt: getLang("global_delete"),
                                action: "bp_delete"
                            }), (vk.id == i.post_uid || cur.updates.admin_level > 1) && (n += rs(s.postAction, {
                                post_raw: i.post_raw,
                                onclick: "return Board.editPost(this, " + i.post_id + ")",
                                tt: getLang("Edit"),
                                action: "bp_edit"
                            }))) : vk.id != i.post_uid && (n += rs(s.postAction, {
                                post_raw: i.post_raw,
                                onclick: "return Board.reportPost(this, " + i.post_id + ")",
                                tt: getLang("its_spam"),
                                action: "bp_delete"
                            })), (vk.id != i.post_uid || cur.updates.admin_level > 1) && (i.reply_link = rs(s.reply_link, {
                                post_id: i.post_id,
                                post_uid: i.post_uid
                            })), i.likes = Likes.makeTemplate(s.likes, {
                                object_raw: d
                            })), i.actions = n, cur.names[i.post_uid] = e[12];
                            var c = se(rs(s.post, i));
                            ge("bt_rows").appendChild(c), setTimeout(addClass.pbind(c, "bp_animated"), 0), setTimeout(removeClass.pbind(c, "bp_selected"), 5e3), cur.pgOffset++, cur.pgCount++, window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle && cur.updates.unread++;
                            break;
                        case "del_post":
                            if (cur.topicMyDeleted[d] || !a) break;
                            hide(a), cur.pgOffset--, cur.pgCount--;
                            break;
                        case "res_post":
                            if (isVisible(a)) break;
                            show(a), cur.pgOffset++, cur.pgCount++
                    }
                }), o !== !1 && (val("bt_summary", o || ""), Pagination.pageReady(!1), Board.topicOnScroll(!1, !1, !0), Board.updateTitle())
            }
        }
    },
    updateTitle: function(e) {
        cur.updates && (e && (cur.updates.unread = 0), setDocumentTitle(replaceEntities((cur.updates.unread ? "(" + cur.updates.unread + ") " : "") + cur.updates.skin.title)))
    },
    cancelAddPost: function(e) {
        if (e === !0) {
            var t = cur.addField && data(cur.addField, "composer");
            t ? Composer.reset(t) : Emoji.val(cur.addField, ""), hide(geByClass1("reply_warn", cur.addBlock)), Board.topicFieldUpdated()
        } else cur.docked = !1, setStyle(cur.addBlock, {
            width: null,
            marginLeft: null
        }), removeClass(cur.addBlock, "fixed")
    },
    topicResetStyle: function() {
        cur.addBlock.style.left = ""
    },
    topicOnScroll: function(e, t, o) {
        if ((t === !1 || void 0 === t) && (t = scrollGetY()), cur.addField) {
            (o === !0 || cur.bEditingPost) && (cur.addBlockTop = getXY(cur.addBlockWrap)[1]);
            var r = t + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight,
                d = r ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null;
            setStyle(cur.addBlock, {
                marginLeft: d
            }), r && !cur.docked ? (setStyle(cur.addBlock, "width", getSize(cur.addBlockWrap)[0]), addClass(cur.addBlock, "fixed"), cur.docked = !0) : !r && cur.docked && Board.cancelAddPost(), cur.docked && e && "resize" == e.type && (cur.addBlock.style.left = ge("page_layout").offsetLeft + ge("content").offsetLeft + "px", setTimeout(Board.topicResetStyle, 0))
        }
    },
    loadedPosts: function(e, t, o, r, d, a, i) {
        Board.topicOnScroll(!1, !1, !0), val("bt_summary", e || ""), a ? Board.cancelEditPost() : i = r, extend(cur.names, i)
    },
    noArrowNav: function() {
        return cur.__focused || cur.bEditingPost
    },
    scrollToEnd: function() {
        scrollToY(cur.addBlockTop + cur.addBlockHeight - lastWindowHeight, 0, void 0, !0)
    },
    sendPost: function(e, t, o) {
        var r = ge("reply_button" + e);
        if (!buttonLocked(r)) {
            var d = ge("reply_field" + e),
                a = d && data(d, "composer"),
                r = ge("reply_button" + e),
                i = ge("bt_reply_as_group"),
                s = {},
                n = o.stickerId;
            if (n) s = {
                message: "",
                attach1_type: "sticker",
                attach1: n,
                sticker_referrer: o.sticker_referrer
            };
            else if (s = a ? Composer.getSendParams(a, Board.sendPost.pbind(e)) : {
                    message: trim(Emoji.editableVal(d))
                }, !s.attach1_type && !s.message) return void Emoji.editableFocus(d, !1, !0);
            var c = ((cur.pgCont.childNodes[cur.pgNodesCount - 1].id || "").match(/\d+$/) || [0])[0];
            s = Wall.fixPostParams(extend(s, {
                act: "post_comment",
                topic: cur.topic,
                hash: cur.hash,
                last: c,
                from_group: i && domData(domClosest("_submit_post_box", ge(i)), "from-oid") < 0 ? 1 : ""
            })), cur.topicMyReplied = !0, ajax.post("/al_board.php", s, {
                onDone: function(e, t, o, r, d, a) {
                    cur.topicMyReplied = !1, re("b_no_content"), Pagination.loaded.apply(window, arguments), Board.cancelAddPost(!n), window.Emoji && Emoji.focus(cur.addField), setTimeout(Board.scrollToEnd, 0), d && r && nav.setLoc(extend(nav.objLoc, {
                        offset: r
                    }))
                },
                showProgress: lockButton.pbind(r),
                hideProgress: unlockButton.pbind(r)
            })
        }
    },
    deleteReportPost: function(e, t, o) {
        t = cur.owner + "_" + t, hasClass(e, "bp_loading") || (cur.topicMyDeleted[t] = 1, ajax.post("/al_board.php", {
            act: o,
            post: t,
            hash: cur.hash
        }, {
            onDone: function(e, o) {
                var r = ge("post" + t),
                    d = r && geByClass1("bp_deleted_text", r);
                r && (d.innerHTML = e, addClass(r, "bp_deleted")), o && (Pagination.recache(-1), Board.loadedPosts(cur.pgCount))
            },
            showProgress: addClass.pbind(e, "bp_loading"),
            hideProgress: removeClass.pbind(e, "bp_loading")
        }))
    },
    deletePost: function(e, t) {
        return Board.deleteReportPost(e, t, "delete_comment"), !1
    },
    reportPost: function(e, t) {
        return Board.deleteReportPost(e, t, "spam_comment"), !1
    },
    restorePost: function(e) {
        return e = cur.owner + "_" + e, cur.topicMyDeleted[e] = 0, ajax.post("/al_board.php", {
            act: "restore_comment",
            post: e,
            hash: cur.hash
        }, {
            onDone: function() {
                var t = ge("post" + e);
                t && (removeClass(t, "bp_deleted"), Pagination.recache(1), Board.loadedPosts(cur.pgCount))
            }
        }), !1
    },
    editPost: function(e, t) {
        if (cur.bEditingPost) return ge("bpe_text") ? notaBene("bpe_text") : !1;
        t = cur.owner + "_" + t, cur.bEditingPost = t;
        var o = ge("post" + t),
            r = ge("bp_data" + t),
            d = geByClass1("bp_bottom", o);
        return ajax.post("/al_board.php", {
            act: "edit_comment",
            post: t
        }, {
            onDone: function(e, t, a) {
                addEvent(window, "keydown", Board.handleEditEsc);
                var i = domFC(domPN(r).insertBefore(se(rs(cur.updates.skin.editPost, {
                    text: e,
                    add: a ? '<div class="bpe_auth">' + a + "</div>" : ""
                })), r));
                addClass(o, "bp_editing"), setTimeout(function() {
                    if (show(i.parentNode), elfocus(i), hide(r, d), cur.boardEditMedia = new MediaSelector(ge("bpe_add_media"), "bpe_media_preview", cur.options.rmedia_types, {
                            limit: 10,
                            hideAfterCount: 5,
                            editable: 1,
                            sortable: 1,
                            teWidth: 420,
                            teHeight: 300
                        }), t && t.length)
                        for (var e = 0, o = (t || []).length; o > e; ++e) cur.boardEditMedia.chooseMedia.apply(window, t[e]);
                    Wall.initComposer(i, {
                        lang: {
                            introText: getLang("profile_mention_start_typing"),
                            noResult: getLang("profile_mention_not_found")
                        }
                    }), autosizeSetup(i, {
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
    cancelEditPost: function(e, t, o) {
        var r = cur.bEditingPost,
            d = ge("bpe_save");
        if (!(!r || d && buttonLocked(d)) && (cur.bEditingPost = !1, d)) {
            removeEvent(window, "keydown", Board.handleEditEsc), cleanElems(ge("bpe_add_media"));
            var a = ge("post" + r),
                i = ge("bp_data" + r),
                s = i.firstChild,
                n = s.nextSibling,
                c = geByClass1("bp_bottom", a);
            if (void 0 !== e && (val(s, e), (e ? show : hide)(s)), void 0 !== t && (n && !t ? re(n) : t && (n || (n = i.appendChild(ce("div"))), i.replaceChild(ce("div", {
                    innerHTML: t
                }).firstChild, n))), void 0 !== o) {
                var l = geByClass1("bp_edited_by", a);
                val(l, o), (o ? show : hide)(l)
            }
            return show(c, i), removeClass(a, "bp_editing"), Wall.deinitComposer(ge("bpe_text")), re(ge("bpe_text").parentNode), Board.topicOnScroll(!1, !1, !0), !1
        }
    },
    handleEditEsc: function(e) {
        e.keyCode == KEY.ESC && Board.cancelEditPost()
    },
    savePost: function() {
        var e = cur.bEditingPost,
            t = ge("bpe_save");
        if (e && t && !buttonLocked(t)) {
            var o = trim(val("bpe_text")),
                r = cur.boardEditMedia || {},
                d = r.chosenMedia || {},
                a = cur.boardEditMedia ? r.getMedias() : [],
                i = {
                    act: "save_comment",
                    post: e,
                    hash: cur.hash,
                    comment: o
                },
                s = 0;
            return isArray(d) && d.length && a.push(clone(d)), a.length && each(a, function(e, t) {
                t && (++s, i["attach" + s + "_type"] = this[0], i["attach" + s] = this[1])
            }), s || o ? void ajax.post("/al_board.php", i, {
                onDone: Board.cancelEditPost,
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            }) : elfocus("bpe_text")
        }
    },
    mentionOver: function(e) {
        var t = ((e.getAttribute("mention") || "").match(/^bp(-?\d+_\d+)$/) || {})[1];
        return t ? void showTooltip(e, {
            url: "/al_board.php",
            params: {
                act: "post_tt",
                post: t
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
    editTopic: function(e, t) {
        return showBox("/al_board.php", {
            act: "edit_topic_box",
            topic: cur.topic
        })
    },
    goCreate: function(e, t) {
        return nav.go({
            0: "board" + cur.gid,
            act: "create"
        }, t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    resetSearch: function(e, t) {
        return nav.go({
            0: "board" + cur.gid
        }, t, {
            back: !0
        })
    },
    doSearch: function(e, t, o) {
        return t ? nav.go({
            0: "board" + cur.gid,
            act: "search",
            q: t
        }, o, {
            showProgress: uiSearch.showProgress.pbind(e),
            hideProgress: function() {
                e.setValue(""), uiSearch.onChanged(e), uiSearch.hideProgress(e)
            }
        }) : cur.query && nav.objLoc.q ? nav.go({
            0: "board" + cur.gid
        }, o, {
            back: !0
        }) : !1
    },
    searchGo: function(e, t) {
        return nav.go(e, t, {
            params: {
                q: nav.objLoc.q
            }
        })
    }
};
try {
    stManager.done("board.js")
} catch (e) {}