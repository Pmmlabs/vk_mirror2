var Board = {
    initTopicEditBox: function(media_types, media_data, label) {
        var box = curBox();
        var boxBodyEl = box.bodyNode;
        var titleEl = geByClass1('_bet_title', boxBodyEl);
        var previewEl = geByClass1('_bet_media_preview', boxBodyEl);
        var attachEl = geByClass1('_bet_attach', boxBodyEl);

        elfocus(titleEl);

        cur.boardEditMedia = new MediaSelector(attachEl, previewEl, media_types, {
            editable: 1,
            sortable: 1,
            teWidth: 420,
            teHeight: 300,
        });

        if (media_data) {
            cur.boardEditMedia.chooseMedia('poll', '', media_data);
        }

        box.removeButtons();
        box.addButton(label, this.saveTopic.bind(this));
        box.addButton(getLang('global_cancel'), box.hide, 'no');
        box.setOptions({
            width: 450
        });
    },
    createTopic: function(oid, hash) {
        var title = trim(val('bnt_title')),
            post = trim(val('bnt_text')),
            question, poll = {};
        var chosen = cur.boardNewMedia.getMedias() || {},
            media = [],
            types = [],
            checkPoll = false;
        for (var i = 0, l = chosen.length; i < l; ++i) {
            var m = chosen[i];
            if (m) {
                if (m[0] == 'poll') {
                    checkPoll = true;
                    continue;
                }
                types.push(m[0]);
                media.push(m[1]);
            }
        }

        if (!title) {
            notaBene('bnt_title');
            return elfocus('bnt_title');
        }
        if (!post && !media.length) {
            notaBene('bnt_text');
            return elfocus('bnt_text');
        }
        if (checkPoll) {
            poll = cur.boardNewMedia.pollData();
            if (!poll) {
                return false;
            }
        }

        globalHistoryDestroy('board' + (-oid));
        if (_tbLink && _tbLink.loc) {
            cur.__phinputs = cur.__phinputs || [];
            globalHistoryDestroy(_tbLink.loc);
        }
        ajax.post('/al_board.php', extend({
            act: 'do_create',
            oid: oid,
            hash: hash,
            title: title,
            post: post,
            media_types: types,
            media: media,
            from_group: isChecked('bnt_from_group'),
            survey: isChecked('bnt_survey'),
        }, poll), {
            showProgress: lockButton.pbind(ge('bnt_subm')),
            hideProgress: unlockButton.pbind(ge('bnt_subm'))
        });
    },
    scrollResize: function() {
        if (browser.mobile || cur.pvShown) return;

        var docEl = document.documentElement;
        var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
        var st = scrollGetY();
        var lnk = ge('blst_load_more');

        if (!isVisible(lnk)) return;
        if (st + ch > lnk.offsetTop) {
            Board.load();
        }
    },
    initScroll: function() {
        extend(cur, {
            module: 'board',
            searchField: ge('board_q')
        });

        if (cur.searchField) {
            elfocus(cur.searchField);
        }

        addEvent(window, 'scroll', Board.scrollResize);
        addEvent(window, 'resize', Board.scrollResize);
        removeEvent(window, 'load', Board.initScroll);
        cur.destroy.push(Board.deinitScroll);
    },
    deinitScroll: function() {
        removeEvent(window, 'scroll', Board.scrollResize);
        removeEvent(window, 'resize', Board.scrollResize);
    },
    loaded: function(off, rows) {
        cur.offset = off;

        var cont = ge('blst_cont'),
            d = ce('div', {
                innerHTML: rows
            });
        while (d.firstChild) {
            cont.appendChild(d.firstChild);
        }

        if (off >= cur.count || !rows) {
            hide('blst_load_more');
            return;
        }
        cur.loading = 1;
        var params = cur.query ? {
            act: 'search',
            q: cur.query
        } : {
            order: cur.order
        };
        ajax.post('/board' + cur.gid, extend(params, {
            offset: cur.offset,
            part: 1
        }), {
            cache: 1,
            onDone: function() {
                if (cur.loading == 2) {
                    Board.loaded.apply(window, arguments);
                } else {
                    cur.loading = false;
                }
            },
            onFail: function() {
                cur.loading = 0;
                return true;
            }
        });
    },
    load: function() {
        if (!isVisible('blst_load_more') || isVisible('blst_more_progress')) return;
        if (cur.loading) {
            cur.loading = 2;
            return;
        }

        var params = cur.query ? {
            act: 'search',
            q: cur.query
        } : {
            order: cur.order
        };
        ajax.post('/board' + cur.gid, extend(params, {
            offset: cur.offset,
            part: 1
        }), {
            onDone: Board.loaded,
            onFail: function() {
                cur.loading = 0;
                return true;
            },
            showProgress: function() {
                show('blst_more_progress');
                hide(ge('blst_load_more').firstChild);
            },
            hideProgress: function() {
                show(ge('blst_load_more').firstChild);
                hide('blst_more_progress');
            },
            cache: 1
        });
    },

    topicFieldUpdated: function() {
        var newt = window.Emoji ? Emoji.editableVal(cur.addField) : '',
            newh = getSize(cur.addBlock)[1];
        var ch = (cur.addBlockHeight != newh),
            ct = (cur.addText != newt);
        if (ch) {
            cur.addBlockHeight = newh;
            cur.addBlockWrap.style.height = newh + 'px';
        }
        if (ct) {
            cur.addText = newt;
        }
        if (ch || ct) {
            Board.topicOnScroll(false, false, true);
        }
    },
    topicAttachWillAdd: function() {
        setTimeout(Board.topicFieldUpdated, 10);
        setTimeout(Board.topicFieldUpdated, 100);
        setTimeout(Board.topicFieldUpdated, 1000);
    },
    repliesCount: function() {
        var m = cur.addText.match(/\[post\d+\|[^\]]+\]/g),
            res = 0;
        for (var i in (m || {})) ++res;
        return res;
    },
    replyPost: function(post, mid) {
        if (browser.mobile && window.Emoji) {
            return Emoji.focus(cur.addField);
        }
        Board.topicOnScroll(false, false, true);
        var count = Board.repliesCount();
        if (count >= 10 && window.Emoji) {
            return setTimeout(Emoji.focus.pbind(cur.addField), 0);
        }
        var insert = cur.names[mid].replace('{post_id}', 'post' + post),
            pos;
        insert = insert.replace(/ $/, '&nbsp;');
        if (!window.Emoji) return false;
        elfocus(cur.addField);
        Emoji.insertHTML(insert);

        cur.addText = Emoji.editableVal(cur.addField);
        return false;
    },
    saveTopic: function(btn) {
        var box = curBox();
        var titleEl = geByClass1('_bet_title', box.bodyNode);
        var closedEl = geByClass1('_bet_closed', box.bodyNode);
        var fixedEl = geByClass1('_bet_fixed', box.bodyNode);
        var pollClosedEl = geByClass1('_bet_poll_closed', box.bodyNode);
        var pollFixedEl = geByClass1('_bet_poll_fixed', box.bodyNode);
        var checkPoll = false;
        var newtitle = trim(val(titleEl));
        var medias = cur.boardEditMedia.getMedias() || {};

        for (var prop in medias) {
            if (medias.hasOwnProperty(prop) && medias[prop][0] === 'poll') {
                checkPoll = true;
                break;
            }
        }

        if (!newtitle) {
            notaBene(titleEl);
            return elfocus(titleEl);
        }

        if (!btn) {
            btn = geByClass('flat_button', domNS(curBox().bodyNode))[1];
        }

        var poll = {};
        if (checkPoll) {
            poll = cur.boardEditMedia.pollData();

            if (!poll) {
                return false;
            }
        }

        ajax.post('/al_board.php', extend({
            act: 'save_topic_info',
            topic: cur.topic,
            hash: cur.hash,
            offset: nav.objLoc.offset,
            title: newtitle,
            closed: isChecked(closedEl) ? 1 : 0,
            fixed: isChecked(fixedEl) ? 1 : 0,
        }, poll || {}), {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    checkDeleteTopic: function() {
        return showFastBox(getLang('board_edit_topic'), getLang('board_sure_delete_topic'), getLang('global_delete'), Board.deleteTopic, getLang('global_cancel'));
    },
    deleteTopic: function(btn) {
        ajax.post('/al_board.php', {
            act: 'delete_topic',
            topic: cur.topic,
            hash: cur.hash
        }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    emojiShowTT: function(obj, ev) {
        if (cur.baEmoji === undefined) {
            return false;
        }
        return Emoji.ttShow(cur.baEmoji, obj, ev);
    },
    emojiHideTT: function(obj, ev) {
        if (cur.baEmoji === undefined) {
            return false;
        }
        return Emoji.ttHide(cur.baEmoji, obj, ev);
    },
    initTopic: function(opts, preload) {
        var topicRaw = opts.owner + '_topic' + opts.topicId;
        extend(cur, {
            module: 'board',

            docked: false,
            topic: opts.topic,
            owner: opts.owner,
            hash: opts.hash,
            postLimit: opts.limit,
            postTo: 'board' + (-opts.owner),

            options: {
                rmedia_types: opts.media,
                max_post_len: opts.max_post_len,
                share: {}
            },
            wallTpl: opts.wallTpl,
            names: opts.names,

            addField: ge('reply_field' + topicRaw),
            addBlock: ge('bt_reply_form'),
            addBlockWrap: ge('bt_reply_form_wrap'),

            pgStart: opts.start,
            pgOffset: opts.offset,
            pgCount: opts.count,
            pgPerPage: opts.perpage,
            pgCont: ge('bt_rows'),
            pgMore: ge('bt_load_more'),
            pgPages: ge('bt_pages'),
            pgPreload: preload,
            pgUrl: opts.url,
            pgHref: opts.url + '?offset=',

            pgPostProcess: Board.loadedPosts,
            pgOnScroll: Board.topicOnScroll,
            pgNoArrowNav: Board.noArrowNav,

            updates: opts.updates,
            topicMyReplied: false,
            topicMyDeleted: {},

            hasGroupAudioAccess: opts.hasGroupAudioAccess,
        });
        Board.initUpdates();

        if (cur.addField) {
            data(cur.addField, 'send', Board.sendPost);
            placeholderInit(cur.addField, {
                editable: 1
            });
            Board.topicFieldUpdated();
            cur.onReplyFormSizeUpdate = Board.topicFieldUpdated;
            cur.onMediaChanged = Board.topicAttachWillAdd;
        }

        Board.topicOnScroll(false, false, true);

        Pagination.init(opts.bottom);
        cur.destroy.push(Pagination.deinit);
        cur.destroy.push(removeEvent.pbind(window, 'keydown', Board.handleEditEsc));
    },
    initUpdates: function() {
        if (!cur.updates || !window.Notifier) {
            return
        }
        Board.checkUpdates();
        cur.updates.unread = 0;
        cur.updates.interval = setInterval(Board.checkUpdates, 20000);
        cur.destroy.push(function() {
            clearInterval(cur.updates.interval);
        });

        if (!isArray(cur.onUnidle)) {
            cur.onUnidle = [];
        }
        cur.onUnidle.push(function() {
            Board.updateTitle(true);
        });
    },
    checkUpdates: function() {
        if (!cur.updates || !cur.updates.queue) {
            return;
        }
        Notifier.addKey(cur.updates.queue, Board.checkedUpdates);
    },
    getAbsDate: function(ts) {
        var date = new Date(ts || vkNow()),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            ampm = '',
            numhours;
        if (cur.updates.time_system) {
            ampm = cur.updates.time_system[hours > 11 ? 1 : 0];
            hours = (hours % 12) || 12;
        }
        numhours = hours > 9 ? hours : ('0' + hours);
        minutes = minutes > 9 ? minutes : ('0' + minutes);
        return cur.updates.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
    },
    checkedUpdates: function(key, data) {
        if (!cur.updates || !cur.updates.queue || cur.updates.queue.key != key) {
            return;
        }
        if (data.failed) {
            cur.updates.queue = false;
            return;
        }
        cur.updates.queue.ts = data.ts;
        if (!isArray(data.events) || !data.events.length) {
            return;
        }
        var count = false;
        each(data.events, function() {
            var ev = this.split('<!>'),
                evVer = ev[0],
                evType = ev[1],
                topicId = ev[2],
                postId = ev[4],
                el = ge('post' + postId);

            if (evVer != cur.updates.qversion) {
                location.reload();
                return false;
            }
            if (ev[3] > -1) count = ev[3];
            switch (evType) {
                case 'new_post':
                    if (cur.topicMyReplied || el || cur.pgOffset < cur.pgCount) break;

                    var data = {
                            actions: '',
                            owner_id: cur.owner,
                            topic_raw: cur.topic,
                            post_raw: postId,
                            post_id: ev[5],
                            post_uid: ev[6],
                            name: ev[7],
                            photo: psr(ev[8]),
                            link: ev[9],
                            text: ev[10],
                            media: psr(ev[11]),
                            date: Board.getAbsDate(),
                            reply_link: '',
                            online: ''
                        },
                        skin = cur.updates.skin,
                        actions = '';
                    if (vk.id) {
                        if (vk.id == data.post_uid || cur.updates.admin_level > 0) {
                            actions += rs(skin.postAction, {
                                post_raw: data.post_raw,
                                onclick: 'return Board.deletePost(this, ' + data.post_id + ')',
                                tt: getLang('global_delete'),
                                action: 'bp_delete'
                            });
                            if (vk.id == data.post_uid || cur.updates.admin_level > 1) {
                                actions += rs(skin.postAction, {
                                    post_raw: data.post_raw,
                                    onclick: 'return Board.editPost(this, ' + data.post_id + ')',
                                    tt: getLang('Edit'),
                                    action: 'bp_edit'
                                });
                            }
                        } else if (vk.id != data.post_uid) {
                            actions += rs(skin.postAction, {
                                post_raw: data.post_raw,
                                onclick: 'return Board.reportPost(this, ' + data.post_id + ')',
                                tt: getLang('its_spam'),
                                action: 'bp_delete'
                            });
                        }
                        if (vk.id != data.post_uid || cur.updates.admin_level > 1) {
                            data.reply_link = rs(skin.reply_link, {
                                post_id: data.post_id,
                                post_uid: data.post_uid
                            });
                        }

                        data.likes = Likes.makeTemplate(skin.likes, {
                            object_raw: postId
                        })
                    }
                    data.actions = actions;
                    cur.names[data.post_uid] = ev[12];

                    var newEl = se(rs(skin.post, data));
                    ge('bt_rows').appendChild(newEl);
                    setTimeout(addClass.pbind(newEl, 'bp_animated'), 0);
                    setTimeout(removeClass.pbind(newEl, 'bp_selected'), 5000);

                    cur.pgOffset++;
                    cur.pgCount++;
                    if (window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle) {
                        cur.updates.unread++;
                    }
                    break;

                case 'del_post':
                    if (cur.topicMyDeleted[postId] || !el) break;
                    hide(el);
                    cur.pgOffset--;
                    cur.pgCount--;
                    break;

                case 'res_post':
                    if (isVisible(el)) break;
                    show(el);
                    cur.pgOffset++;
                    cur.pgCount++;
                    break;
            }
        });
        if (count !== false) {
            val('bt_summary', count || '');
            Pagination.pageReady(false);
            Board.topicOnScroll(false, false, true);
            Board.updateTitle();
        }
    },
    updateTitle: function(unidle) {
        if (!cur.updates) {
            return;
        }
        if (unidle) {
            cur.updates.unread = 0;
        }
        setDocumentTitle(replaceEntities((cur.updates.unread ? '(' + cur.updates.unread + ') ' : '') + cur.updates.skin.title));
    },
    cancelAddPost: function(clear) {
        if (clear === true) {
            var composer = cur.addField && data(cur.addField, 'composer');
            if (composer) {
                Composer.reset(composer);
            } else {
                Emoji.val(cur.addField, '');
            }
            hide(geByClass1('reply_warn', cur.addBlock));
            Board.topicFieldUpdated();
        } else {
            cur.docked = false;
            setStyle(cur.addBlock, {
                width: null,
                marginLeft: null
            });
            removeClass(cur.addBlock, 'fixed');
        }
    },
    topicResetStyle: function() {
        cur.addBlock.style.left = '';
    },
    topicOnScroll: function(e, st, pp) {
        if (st === false || st === undefined) {
            st = scrollGetY();
        }
        if (!cur.addField) return;
        if (pp === true || cur.bEditingPost) {
            cur.addBlockTop = getXY(cur.addBlockWrap)[1];
        }
        var needDock = (st + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight),
            ml = needDock ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge('page_layout'))[0])) : null;
        setStyle(cur.addBlock, {
            marginLeft: ml
        });
        if (needDock && !cur.docked) {
            setStyle(cur.addBlock, 'width', getSize(cur.addBlockWrap)[0]);
            addClass(cur.addBlock, 'fixed');
            cur.docked = true;
        } else if (!needDock && cur.docked) {
            Board.cancelAddPost();
        }
        if (cur.docked && e && e.type == 'resize') {
            cur.addBlock.style.left = (ge('page_layout').offsetLeft + ge('content').offsetLeft) + 'px';
            setTimeout(Board.topicResetStyle, 0);
        }
    },
    loadedPosts: function(count, from, rows, offset, pages, preload, names) {
        Board.topicOnScroll(false, false, true);
        val('bt_summary', count || '');
        if (preload) { // got new page
            Board.cancelEditPost();
        } else {
            names = offset;
        }
        extend(cur.names, names);
    },
    noArrowNav: function() {
        return cur.__focused || cur.bEditingPost;
    },
    scrollToEnd: function() {
        scrollToY(cur.addBlockTop + cur.addBlockHeight - lastWindowHeight, 0, undefined, true);
    },
    sendPost: function(post, ev, options) {
        var btn = ge('reply_button' + post);
        if (buttonLocked(btn)) return;

        var field = ge('reply_field' + post),
            composer = field && data(field, 'composer'),
            btn = ge('reply_button' + post),
            replyAsGroup = ge('bt_reply_as_group'),
            params = {};

        var stickerId = options.stickerId;
        if (stickerId) {
            params = {
                message: '',
                attach1_type: 'sticker',
                attach1: stickerId,
                sticker_referrer: options.sticker_referrer
            };
        } else {
            params = composer ? Composer.getSendParams(composer, Board.sendPost.pbind(post)) : {
                message: trim(Emoji.editableVal(field))
            };

            if (!params.attach1_type && !params.message) {
                Emoji.editableFocus(field, false, true);
                return;
            }
        }

        var last = ((cur.pgCont.childNodes[cur.pgNodesCount - 1].id || '').match(/\d+$/) || [0])[0];
        params = Wall.fixPostParams(extend(params, {
            act: 'post_comment',
            topic: cur.topic,
            hash: cur.hash,
            last: last,
            from_group: replyAsGroup && (domData(domClosest('_submit_post_box', ge(replyAsGroup)), 'from-oid')) < 0 ? 1 : ''
        }));

        cur.topicMyReplied = true;
        ajax.post('/al_board.php', params, {
            onDone: function(count, from, rows, offset, pages, preload) {
                cur.topicMyReplied = false;
                re('b_no_content');
                Pagination.loaded.apply(window, arguments);
                Board.cancelAddPost(!stickerId);
                if (window.Emoji) {
                    Emoji.focus(cur.addField);
                }
                setTimeout(Board.scrollToEnd, 0);
                if (pages && offset) {
                    nav.setLoc(extend(nav.objLoc, {
                        offset: offset
                    }));
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    deleteReportPost: function(el, post, act) {
        post = cur.owner + '_' + post;
        if (hasClass(el, 'bp_loading')) return;

        cur.topicMyDeleted[post] = 1;
        ajax.post('/al_board.php', {
            act: act,
            post: post,
            hash: cur.hash
        }, {
            onDone: function(text, deleted) {
                var row = ge('post' + post),
                    info = row && geByClass1('bp_deleted_text', row);
                if (row) {
                    info.innerHTML = text;
                    addClass(row, 'bp_deleted');
                }

                if (deleted) {
                    Pagination.recache(-1);
                    Board.loadedPosts(cur.pgCount);
                }
            },
            showProgress: addClass.pbind(el, 'bp_loading'),
            hideProgress: removeClass.pbind(el, 'bp_loading')
        });
    },
    deletePost: function(el, post) {
        Board.deleteReportPost(el, post, 'delete_comment');
        return false;
    },
    reportPost: function(el, post) {
        Board.deleteReportPost(el, post, 'spam_comment');
        return false;
    },
    restorePost: function(post) {
        post = cur.owner + '_' + post;
        cur.topicMyDeleted[post] = 0;
        ajax.post('/al_board.php', {
            act: 'restore_comment',
            post: post,
            hash: cur.hash
        }, {
            onDone: function() {
                var row = ge('post' + post);
                if (row) {
                    removeClass(row, 'bp_deleted');
                    Pagination.recache(1);
                    Board.loadedPosts(cur.pgCount);
                }
            }
        });
        return false;
    },
    editPost: function(el, post) {
        if (cur.bEditingPost) {
            return ge('bpe_text') ? notaBene('bpe_text') : false;
        }
        post = cur.owner + '_' + post;
        cur.bEditingPost = post;

        var postNode = ge('post' + post),
            dataNode = ge('bp_data' + post),
            bottom = geByClass1('bp_bottom', postNode);
        ajax.post('/al_board.php', {
            act: 'edit_comment',
            post: post
        }, {
            onDone: function(text, media, add) {
                addEvent(window, 'keydown', Board.handleEditEsc);
                var textField = domFC(domPN(dataNode).insertBefore(se(rs(cur.updates.skin.editPost, {
                    text: text,
                    add: (add ? '<div class="bpe_auth">' + add + '</div>' : '')
                })), dataNode));
                addClass(postNode, 'bp_editing');
                setTimeout(function() {
                    show(textField.parentNode);
                    elfocus(textField);
                    hide(dataNode, bottom);
                    cur.boardEditMedia = new MediaSelector(ge('bpe_add_media'), 'bpe_media_preview', cur.options.rmedia_types, {
                        limit: 10,
                        hideAfterCount: 5,
                        editable: 1,
                        sortable: 1,
                        teWidth: 420,
                        teHeight: 300
                    });
                    if (media && media.length) {
                        for (var i = 0, l = (media || []).length; i < l; ++i) {
                            cur.boardEditMedia.chooseMedia.apply(window, media[i]);
                        }
                    }

                    Wall.initComposer(textField, {
                        lang: {
                            introText: getLang('profile_mention_start_typing'),
                            noResult: getLang('profile_mention_not_found')
                        }
                    });
                    autosizeSetup(textField, {
                        minHeight: 30
                    });
                }, 0);
            },
            onFail: function() {
                cur.bEditingPost = false;
            },
            showProgress: addClass.pbind(el, 'bp_loading'),
            hideProgress: removeClass.pbind(el, 'bp_loading')
        });
        return false;
    },
    cancelEditPost: function(nt, nm, ne) {
        var post = cur.bEditingPost,
            btn = ge('bpe_save');
        if (!post || btn && buttonLocked(btn)) return;

        cur.bEditingPost = false;
        if (!btn) return;

        removeEvent(window, 'keydown', Board.handleEditEsc);
        cleanElems(ge('bpe_add_media'));

        var postNode = ge('post' + post),
            dataNode = ge('bp_data' + post);
        var textNode = dataNode.firstChild,
            mediaNode = textNode.nextSibling;
        var bottom = geByClass1('bp_bottom', postNode);

        if (nt !== undefined) {
            val(textNode, nt);
            (nt ? show : hide)(textNode);
        }
        if (nm !== undefined) {
            if (mediaNode && !nm) {
                re(mediaNode);
            } else if (nm) {
                if (!mediaNode) {
                    mediaNode = dataNode.appendChild(ce('div'));
                }
                dataNode.replaceChild(ce('div', {
                    innerHTML: nm
                }).firstChild, mediaNode);
            }
        }
        if (ne !== undefined) {
            var ed = geByClass1('bp_edited_by', postNode);
            val(ed, ne);
            (ne ? show : hide)(ed);
        }
        show(bottom, dataNode);
        removeClass(postNode, 'bp_editing');
        Wall.deinitComposer(ge('bpe_text'));
        re(ge('bpe_text').parentNode);
        Board.topicOnScroll(false, false, true);
        return false;
    },
    handleEditEsc: function(e) {
        if (e.keyCode == KEY.ESC) {
            Board.cancelEditPost();
        }
    },
    savePost: function() {
        var post = cur.bEditingPost,
            btn = ge('bpe_save');
        if (!post || !btn || buttonLocked(btn)) return;

        var newtext = trim(val('bpe_text')),
            addmedia = cur.boardEditMedia || {},
            media = addmedia.chosenMedia || {},
            medias = cur.boardEditMedia ? addmedia.getMedias() : [],
            params = {
                act: 'save_comment',
                post: post,
                hash: cur.hash,
                comment: newtext
            },
            attachI = 0;

        if (isArray(media) && media.length) {
            medias.push(clone(media));
        }

        if (medias.length) {
            each(medias, function(k, v) {
                if (!v) return;
                ++attachI;
                params['attach' + attachI + '_type'] = this[0];
                params['attach' + attachI] = this[1];
            });
        }
        if (!attachI && !newtext) {
            return elfocus('bpe_text');
        }

        ajax.post('/al_board.php', params, {
            onDone: Board.cancelEditPost,
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    mentionOver: function(el) {
        var post = ((el.getAttribute('mention') || '').match(/^bp(-?\d+_\d+)$/) || {})[1];
        if (!post) {
            mentionOver(el);
            return;
        }
        showTooltip(el, {
            url: '/al_board.php',
            params: {
                act: 'post_tt',
                post: post
            },
            slide: 15,
            shift: [78, 3, 5],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: 'auto',
            className: 'rich board_tt wall_module'
        });
    },

    editTopic: function(btn, event) {
        return showBox('/al_board.php', {
            act: 'edit_topic_box',
            topic: cur.topic
        });
    },

    goCreate: function(btn, ev) {
        return nav.go({
            0: 'board' + cur.gid,
            act: 'create'
        }, ev, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    resetSearch: function(el, ev) {
        return nav.go({
            0: 'board' + cur.gid
        }, ev, {
            back: true
        });
    },

    doSearch: function(el, str, ev) {
        if (!str) {
            if (cur.query && nav.objLoc.q) {
                return nav.go({
                    0: 'board' + cur.gid
                }, ev, {
                    back: true
                });
            }
            return false;
        }
        return nav.go({
            0: 'board' + cur.gid,
            act: 'search',
            q: str
        }, ev, {
            showProgress: uiSearch.showProgress.pbind(el),
            hideProgress: function() {
                el.setValue('');
                uiSearch.onChanged(el);
                uiSearch.hideProgress(el);
            }
        });
    },

    searchGo: function(el, ev) {
        return nav.go(el, ev, {
            params: {
                q: nav.objLoc.q
            }
        });
    }
}

try {
    stManager.done('board.js');
} catch (e) {}