var Feed = {
    longView: {
        PERCENT: 0.5,
        DURATION_MS: 1000,
        headerHeight: null,
        tracking: [],
        viewed: {}, // [id] => true

        registerElement: function(elem) {
            var longView = feed.longView;

            if (!elem) {
                return false;
            } else if (elem.longViewTracking) {
                return true;
            } else if (elem.longViewRegistered) {
                return false;
            }

            elem.longViewRegistered = true;
            elem.longViewTracking = longView.isAutoplayAd(elem);

            if (elem.longViewTracking) {
                longView.tracking.push(elem);
                return true;
            }

            return false;
        },

        process: function(scrollY, windowHeight) {
            var longView = feed.longView;
            var tracking = longView.tracking;

            if (tracking.length === 0) {
                return [];
            }

            var PERCENT = longView.PERCENT;
            var DURATION_MS = longView.DURATION_MS;
            var isElemViewable = longView.isElemViewable;
            var viewed = longView.viewed;
            var posts = [];

            each(tracking, function(i, elem) {
                var postEl = domFC(elem);
                var postId = postEl.id;
                if (!postEl || !postId) {
                    return;
                }

                var adBlockUID = domData(postEl, 'ad-block-uid');
                var viewedKey = '' + postId;
                if (adBlockUID) {
                    viewedKey += '_' + adBlockUID;
                }

                if (viewed[viewedKey] || !document.body.contains(elem)) {
                    return;
                }

                if (isElemViewable(elem, PERCENT, scrollY, windowHeight)) {
                    var now = Date.now();

                    if (!elem.longViewStartedAt) {
                        elem.longViewStartedAt = Date.now();
                    } else if (now - elem.longViewStartedAt >= DURATION_MS) {
                        viewed[viewedKey] = true;
                        posts.push(feed.postsGetRaws(elem));
                    }
                } else {
                    elem.longViewStartedAt = null;
                }
            });

            return posts;
        },

        isAutoplayAd: function(elem) {
            var firstChild = elem && domFC(elem);
            return firstChild && firstChild.hasAttribute('data-ad-video-autoplay');
        },

        isElemViewable: function(elem, percent, scrollY, windowHeight) {
            var headerHeight = feed.longView.getHeaderHeight();
            var viewTop = scrollY + headerHeight;
            var viewBottom = scrollY + windowHeight;
            var elemHeight = elem.offsetHeight;
            var elemTop = elem.offsetTop + headerHeight;
            var elemBottom = elemTop + elemHeight;
            var viewPercent = elemBottom > viewTop && elemTop < viewBottom ?
                (Math.min(viewBottom, elemBottom) - Math.max(viewTop, elemTop)) / elemHeight :
                0;

            return viewPercent >= percent;
        },

        getHeaderHeight: function() {
            return feed.longView.headerHeight || (
                feed.longView.headerHeight = ge('page_header').offsetHeight
            );
        }
    },

    blockHideReason: function self(block_id, reason) {
        if (self.progress) return false;
        self.progress = true;

        var block_raw = 'block_' + block_id,
            blockEl = ge(block_raw);
        delete cur.feedEntriesHTML[block_raw];

        ajax.post('al_feed.php', {
            act: 'a_block_hide_reason',
            block_id: block_id,
            reason: reason | 0,
            hash: attr(blockEl, 'data-hash'),
            ref: feed.getModuleRef(),
            pos: attr(blockEl, 'data-pos')
        }, {
            onDone: function(html) {
                self.progress = false;
                html ? val(blockEl, html) : hide(blockEl);
            },
            hideProgress: function() {
                self.progress = false;
            }
        });
    },
    blockRestore: function(block_id) {
        var block_raw = 'block_' + block_id,
            blockEl = ge(block_raw)
        if (cur.feedEntriesHTML[block_raw]) val(block_raw, cur.feedEntriesHTML[block_raw]);
        ajax.post('al_feed.php', {
            act: 'a_block_restore',
            block_id: block_id,
            hash: attr(blockEl, 'data-hash'),
            ref: feed.getModuleRef(),
            pos: attr(blockEl, 'data-pos')
        });
    },
    blockHide: function(block_id, menuItemEl) {
        if (actionsMenuItemLocked(menuItemEl)) return;
        lockActionsMenuItem(menuItemEl);

        var block_raw = 'block_' + block_id,
            blockEl = ge(block_raw),
            actMenu = geByClass1('ui_actions_menu_wrap', blockEl);

        ajax.post('al_feed.php', {
            act: 'a_block_hide',
            block_id: block_id,
            hash: attr(blockEl, 'data-hash'),
            ref: feed.getModuleRef(),
            pos: attr(blockEl, 'data-pos')
        }, {
            onDone: function(html) {
                uiActionsMenu.toggle(actMenu, false);
                cur.feedEntriesHTML[block_raw] = val(blockEl);
                val(blockEl, html);
            },
            hideProgress: unlockActionsMenuItem.pbind(menuItemEl)
        });
    },

    videoRecomsBlockHideCancel: function() {
        ajax.post('/al_feed.php', {
            act: 'a_video_recom_hide_cancel'
        });
        feed.restorePost('video_recoms');
    },
    videoRecomsBlockHideReason: function(reasonHash, reason) {
        re(geByClass1('feed_rb_video_reason_wrap'));
        show(geByClass1('feed_rb_video_reason_thankyou'));
        ajax.post('/al_feed.php', {
            act: 'a_video_recom_hide_reason',
            reason: reason,
            reason_hash: reasonHash
        });
    },
    expandVideosPost: function(event, btn) {
        var wrapEl = geByClass1('page_post_sized_thumbs', domPN(btn));
        var shownCount = 0;
        each(wrapEl.children, function() {
            if (!isVisible(this)) {
                show(this);
                shownCount++;

                if (shownCount > 5) return false;
            }
        });

        toggle(btn, !isVisible(wrapEl.children[wrapEl.children.length - 1]));
    },
    closeVideoBlock: function(hash) {
        ajax.post('al_feed.php', {
            act: 'a_close_video_block',
            hash: hash
        });
        var recomsEl = ge('feed_recommends');
        setStyle(recomsEl, {
            height: getSize(recomsEl)[1],
            opacity: 1
        });
        setTimeout(function() {
            addClass(recomsEl, 'recoms_hidden');
        });
    },
    update: function(afterPost) {
        if (cur.feedUpdateLoading) return;
        if (cur.add_queue && window.Notifier &&
            Notifier.addKey(cur.add_queue, feed.updated) &&
            cur.section != 'news') {
            return;
        }
        if (cur.module !== 'feed' || cur.subsection == 'top' || inArray(cur.section, ['search', 'notifications', 'photos_search', 'mentions', 'articles', 'articles_search', 'likes', 'recommended', 'live'])) {
            return;
        }
        var rnd = Math.random();
        if (cur.section != 'news' && cur.section != 'comments' && rnd > 0.3 ||
            cur.section == 'news' && (afterPost || rnd > 0.05)) {
            return;
        }
        cur.feedUpdateLoading = true;
        ajax.post('al_feed.php?au_' + cur.section, extend(feed.getSectionParams(cur.section), {
            timestamp: cur.timestamp,
            posted: afterPost ? 1 : '',
            queue: cur.add_queue ? 1 : 0
        }), {
            onDone: function(options, rows, updates_timestamp) {
                cur.feedUpdateLoading = false;
                if (afterPost == 1 &&
                    (!rows || rows.indexOf(vk.id + '') == -1)) {
                    setTimeout(feed.update.pbind(2), 2000);
                    return;
                }
                if (cur.module !== 'feed' ||
                    options.section != cur.section ||
                    options.timestamp < cur.timestamp ||
                    updates_timestamp < cur.timestamp) {
                    return;
                }

                statlogsValueEvent('feed_check_update', !!rows);

                options.count += cur.count;
                var feed_rows = cur.rowsCont,
                    au = ce('div'),
                    el, postEl, post_raw, startST, updH = 0;
                if (cur.section == 'news') {
                    startST = scrollGetY()
                    if (rows) {
                        au.innerHTML = rows;
                        while (au.lastChild) {
                            el = au.lastChild;
                            feed_rows.insertBefore(el, feed_rows.firstChild);
                            Feed.onPostLoaded(el, true);
                        }
                        each(geByClass('ts' + updates_timestamp, feed_rows), function() {
                            var self = this;
                            updH += this.offsetHeight;
                            nodeUpdated(self);
                            cur.feedUnreadCount++;
                        });
                    }
                    if (updH && startST > 100) {
                        scrollToY(startST + updH, 0, false, true);
                    }
                } else {
                    if (rows) {
                        au.innerHTML = rows;
                        while (el = au.lastChild) {
                            if (el.tagName != 'DIV') {
                                au.removeChild(el);
                                continue;
                            }
                            if (el.id === 'podcasts_recommended_block') {
                                au.removeChild(el);
                                continue;
                            }
                            post_raw = el.firstChild.id.substr(4);
                            if (post_raw && cur.wallLayer == post_raw) {
                                au.removeChild(el);
                                continue;
                            }
                            if (!(postEl = ge('post' + post_raw))) {
                                startST = scrollGetY();
                                feed_rows.insertBefore(el, feed_rows.firstChild);
                                Feed.onPostLoaded(el, true);
                                nodeUpdated(el);
                                updH = el.offsetHeight;
                                if (startST > 100) {
                                    scrollToY(startST + updH, 0, false, true);
                                }
                            } else {
                                if (!hasClass(postEl.parentNode, 'feed_row')) {
                                    return;
                                }
                                var repliesCont = ge('replies' + post_raw),
                                    openEl = repliesCont.nextSibling,
                                    cnt = 0;
                                each([].slice.call(geByClass('reply', el, 'div')), function() {
                                    if (ge(this.id)) return;
                                    addClass(this, 'new_reply');
                                    repliesCont.appendChild(this);
                                    cnt++;
                                });
                                if (cnt) {
                                    var stDelta = postEl.parentNode.offsetHeight,
                                        newCnt = geByClass('new_reply', repliesCont, 'div').length;
                                    if (!openEl || openEl.className != 'replies_open') {
                                        openEl = ce('div', {
                                            className: 'replies_open',
                                            onclick: wall.openNewComments.pbind(post_raw),
                                            role: 'button',
                                            tabIndex: 0
                                        });
                                        repliesCont.parentNode.insertBefore(openEl, repliesCont.nextSibling);
                                    }
                                    openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
                                    openEl.newCnt = newCnt;

                                    var st = scrollGetY(),
                                        ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                                        btnY = getXY(openEl)[1],
                                        h = postEl.parentNode.offsetHeight;

                                    stDelta = h - stDelta;

                                    if (!inArray(post_raw, cur.feedUnread)) {
                                        cur.feedUnread.unshift(post_raw);
                                    }
                                    if (!cur.idleManager.isIdle && btnY > st + 100 && btnY < st + ch + 100) {
                                        feed_rows.insertBefore(ge('post_ph' + post_raw) || ce('div', {
                                            id: 'post_ph' + post_raw
                                        }), feed_rows.firstChild);
                                        if (!inArray(post_raw, cur.feedToSort)) {
                                            cur.feedToSort.push(post_raw);
                                        }
                                    } else {
                                        re(postEl.parentNode);
                                        feed_rows.insertBefore(postEl.parentNode, feed_rows.firstChild);
                                        if (btnY > st + ch + 100) {
                                            stDelta = h;
                                        }
                                        if (stDelta) {
                                            scrollToY(scrollGetY() + stDelta, 0, false, true);
                                        }
                                    }
                                    cur.feedUnreadCount += cnt;
                                }
                                au.removeChild(el);
                            }
                        }
                    }
                }
                feed.applyOptions(options);
                feed.updateTitle();
            },
            onFail: function() {
                cur.feedUpdateLoading = false;
                return false;
            },
            showProgress: function() {
                cur.feedUpdateLoading = true;
            },
            hideProgress: function() {
                cur.feedUpdateLoading = false;
            }
        });
    },
    getNewQKey: function(to) {
        var params = {
            act: 'a_get_key',
            only_update: cur.add_queue ? 1 : 0,
            need_ignore: !isArray(cur.ignore_owners) ? 1 : 0
        };
        var options = {
            onDone: onDone,
            local: 1
        };
        var section = cur.section;
        ajax.post('al_feed.php?queue', extend(feed.getSectionParams(cur.section), params), options);

        function onDone(key, ignore_owners) {
            if (cur.section != section) return;
            if (key) {
                cur.add_queue = key;
                setTimeout(feed.update.pbind(0), 0);
            } else if (!params.only_update) {
                var ts = ignore_owners;
                cur.timestamp = (ts || (vkNow() / 1000)) - to;
                return;
            }
            if (isArray(ignore_owners)) {
                cur.ignore_owners = ignore_owners;
            }
        }
    },
    updated: function(key, data) {
        cur.queueTO = cur.queueTO || irand(0, 5000);
        setTimeout(feed.handleQueueEvent.pbind(key, data), cur.queueTO);
    },
    handleQueueEvent: function(key, data) {
        if ((cur.section != 'search' && cur.section != 'news' && cur.section) || !cur.add_queue || cur.add_queue.key != key) {
            return;
        }
        if (data.failed) {
            cur.add_queue = false;
            var timeout = curNotifier.error_timeout || 1;
            clearTimeout(cur.lp_error_to);
            cur.lp_error_to = setTimeout(feed.getNewQKey.bind(feed).pbind(timeout), timeout * 1000);
            return;
        }
        if (!isArray(data.events) || !data.events.length) {
            return;
        }
        cur.add_queue.ts = data.ts;
        if (data.key) {
            cur.add_queue.key = data.key;
        }
        var startST = scrollGetY(),
            updH = 0;

        each(data.events, function() {
            updH += feed.pushEvent(this.split('<!>'), startST + getSize('page_header_cont')[1]);
        });
        var endST = scrollGetY();
        if (updH && /*startST > 100 && */ Math.abs(startST - endST) < 100) {
            cur.leftMenuDelta = updH;
            scrollToY(endST + updH, 0, false, true);
        }
        feed.updateTitle();
        if (cur.gifAutoplayScrollHandler) {
            cur.gifAutoplayScrollHandler();
        }
        if (cur.videoAutoplayScrollHandler) {
            cur.videoAutoplayScrollHandler();
        }
    },
    needScrollPost: function(st, newEl) {
        return st + 80 > getXY(newEl)[1] || cur.storyLayer || window.mvcur && mvcur.mvShown || window.pvcur && cur.pvShown;
    },
    pushEvent: function(ev, st) {
        var ev_ver = ev[0],
            ev_type = ev[1],
            post_id = ev[2],
            el = ge('post' + post_id),
            s = cur.section,
            flags = s != 'search' ? intval(ev.pop()) : 0,
            deltaH = 0;
        var _mt = function(el) {
            return intval(getStyle(domByClass(el, 'page_block'), 'marginTop')) || intval(getStyle(domByClass(domNS(el), 'page_block'), 'marginTop')) || 15;
        }

        if (!cur.options || ev_ver != cur.options.qversion) {
            return 0;
        }

        if (Wall.isArchiveWall() ? ev_type === 'archive_post' : ev_type === 'reveal_post') {
            ev_type = 'res_post';
        }
        if (Wall.isArchiveWall() ? ev_type === 'reveal_post' : ev_type === 'archive_post') {
            ev_type = 'del_post';
        }

        switch (ev_type) {
            case 'new_post':
                {
                    if (el) break;
                    var adminLevel = constants.Groups.GROUPS_ADMIN_LEVEL_USER;
                    if (intval(ev[11]) && intval(ev[11]) != vk.id) { // own reply owner
                        ajax.post('al_feed.php', {
                            act: 'a_need_own_reply',
                            oid: intval(ev[11])
                        }, {
                            onDone: function(need) {
                                if (need) {
                                    ev[11] = 0;
                                    feed.pushEvent(ev, st);
                                }
                            }
                        });
                        return 0;
                    }
                    if (s != 'search') {
                        var oid = post_id.split('_')[0];
                        ev[8] = (intval(ev[8]) > 0 && (flags & 4) == 4) ? 1 : 0;
                        if (oid < 0) {
                            adminLevel = (flags & 8) ? constants.Groups.GROUPS_ADMIN_LEVEL_EDITOR : ((flags & 2) ? constants.Groups.GROUPS_ADMIN_LEVEL_MODERATOR : constants.Groups.GROUPS_ADMIN_LEVEL_USER);
                        }
                    }
                    if (s == 'search') {
                        statlogsValueEvent('feed_switch', 0, 'search_update', (cur.options.q && cur.options.q.charAt(0) == '#') ? 'hashtag' : '');
                    }
                    var cont = cur.rowsCont,
                        cnodes = cont.childNodes,
                        postHTML = wall.getNewPostHTML(ev, adminLevel, feed.feedPostRepl),
                        place = ev[12],
                        newEl, grouped, first, others, moreLink, singleOthers;

                    var showCollapsed = s != 'search' && (window._wf <= 0 || hasClass(cur.feedEls.wrap, 'feed_has_new') || feed.needScrollPost(st, cont));
                    var storiesLayerShown = cur.storyLayer;
                    if (storiesLayerShown) {
                        showCollapsed = true;
                    }

                    var addedToStart = false;
                    var _postHTML = postHTML;
                    if (showCollapsed) {
                        postHTML = wall.updatePostImages(postHTML);
                    }

                    if (place) { // Client-side grouping posts
                        if (cur.ignore_owners.length && inArray(intval(place), cur.ignore_owners)) {
                            break;
                        }
                        if (grouped = geByClass1('feed_reposts_wrap' + place, cont, 'div')) {
                            first = geByClass1('feed_reposts_first', grouped, 'div').firstChild;
                            others = geByClass1('feed_reposts_group', grouped, 'div');
                            moreLink = geByClass1('feed_reposts_more_link', grouped, 'a');
                            if (feed.needScrollPost(st, first)) {
                                deltaH -= first.offsetHeight + _mt(first);
                            }
                            first.parentNode.replaceChild(newEl = se(_postHTML), first);
                            others.insertBefore(first, others.firstChild);
                            if (!isVisible(others)) {
                                val(moreLink, getLang('news_show_X_reposts', others.childNodes.length));
                            }
                            grouped = grouped.parentNode;
                            if (cont.firstChild != grouped) {
                                cont.insertBefore(grouped, cont.firstChild);
                            }
                            if (feed.needScrollPost(st, grouped)) {
                                deltaH += grouped.offsetHeight + _mt(grouped);
                            }
                            grouped.bits = 0;
                        } else if ((singleOthers = geByClass('feed_repost' + place, cont, 'div')) && singleOthers.length) {
                            postHTML = rs(cur.wallTpl.grouped_posts, {
                                place: place,
                                random: irand(100000000, 200000000),
                                first: postHTML,
                                other: '',
                                label: getLang('news_show_X_reposts', singleOthers.length)
                            });
                            var frow = se('<div class="feed_row' + (showCollapsed ? '_unshown' : '') + '">' + postHTML + '</div>'),
                                postEl = domFC(postEl);
                            Wall.updateAnonNewPost(ev, frow);
                            cont.insertBefore(frow, cont.firstChild);
                            if (!showCollapsed && feed.needScrollPost(st, frow)) {
                                deltaH += frow.offsetHeight + _mt(frow);
                            }
                            addedToStart = true;
                            grouped = frow.firstChild;
                            newEl = geByClass1('feed_reposts_first', grouped, 'div');
                            others = geByClass1('feed_reposts_group', grouped, 'div');
                            each(clone(singleOthers), function() {
                                if (feed.needScrollPost(st, this)) {
                                    deltaH -= this.offsetHeight + _mt(this);
                                }
                                re(this.parentNode);
                                others.appendChild(this.firstChild);
                            });
                        } else {
                            newEl = se('<div class="feed_row' + (showCollapsed ? '_unshown' : '') + '"><div class="feed_repost' + place + '">' + postHTML + '</div></div>');
                            Wall.updateAnonNewPost(ev, newEl);
                            cont.insertBefore(newEl, cont.firstChild);
                            addedToStart = true;
                            if (!showCollapsed && feed.needScrollPost(st, newEl)) {
                                deltaH += newEl.offsetHeight + _mt(newEl);
                            }
                        }
                    } else {
                        newEl = se('<div class="feed_row' + (showCollapsed ? '_unshown' : '') + '">' + postHTML + '</div>');
                        Wall.updateAnonNewPost(ev, newEl);
                        cont.insertBefore(newEl, cont.firstChild);
                        addedToStart = true;
                        if (!showCollapsed && feed.needScrollPost(st, newEl)) {
                            deltaH += newEl.offsetHeight + _mt(newEl);
                        }
                    }

                    // can reply
                    if (ev[8] == 0) {
                        var post = geByClass1('post', newEl);
                        addClass(post, 'closed_comments');
                    }

                    if (cur.deepRepliesActive) {
                        var post = geByClass1('post', newEl);
                        addClass(post, 'deep_active');
                    }

                    if (showCollapsed && addedToStart) {
                        cur.newPostsCount = cur.newPostsCount ? cur.newPostsCount + 1 : 1;
                        cur.feedEls.newPosts.innerHTML = getLang('news_new_posts', cur.newPostsCount);
                        addClass(cur.feedEls.wrap, 'feed_has_new');
                        if (cur.newPostsCount == 1 && feed.needScrollPost(st, cur.feedEls.newPosts) && !storiesLayerShown) {
                            deltaH += getSize(cur.feedEls.newPosts)[1];
                        }
                    }

                    AudioUtils.updateQueueReceivedPost(newEl);

                    wall.votingUpdateByPostRaw(post_id);
                    cur.feedUnreadCount++;
                    if (s != 'search') {
                        nodeUpdated(newEl);
                    }
                    if (cnodes.length > 300) {
                        cont.removeChild(cnodes[300]);
                    } else if (cnodes.length <= 1) {
                        removeClass(cur.feedEls.wrap, 'feed_is_empty');
                    }
                    Wall.updateMentionsIndex();
                    break;
                }
            case 'new_post_reply':
                {
                    if (el) break;
                    var cont = cur.rowsCont,
                        cnodes = cont.childNodes,
                        postHTML = wall.getNewPostHTML(ev, false, feed.feedPostRepl),
                        newEl = se('<div class="feed_row">' + postHTML + '</div>');

                    cont.insertBefore(newEl, cont.firstChild);
                    if (feed.needScrollPost(st, newEl)) {
                        deltaH += newEl.offsetHeight + _mt(newEl);
                    }
                    cur.feedUnreadCount++;
                    if (cnodes.length > 300) {
                        cont.removeChild(cnodes[300]);
                    } else if (cnodes.length <= 1) {
                        removeClass(cur.feedEls.wrap, 'feed_is_empty');
                    }
                    break;
                }
            case 'edit_post':
                {
                    var editEl = ge('wpt' + post_id),
                        stUnder;
                    if (!isVisible(el) || !editEl) break;

                    var wasExpanded = geByClass1('wall_post_more', editEl);
                    if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

                    if (stUnder = feed.needScrollPost(st, editEl)) {
                        deltaH -= editEl.offsetHeight;
                    }
                    var text = psr(rs(ev[3], {
                        poll_hash: cur.wallTpl.poll_hash
                    }));

                    var cont = ge('post' + post_id);
                    if (cont && !isVisible(cont.parentNode)) {
                        text = wall.updatePostImages(text);
                    }
                    if (window.fifaReplaceText) {
                        text = fifaReplaceText(text);
                    }
                    val(editEl, text);
                    if (wasExpanded) {
                        wasExpanded = geByClass1('wall_post_more', editEl);
                        if (wasExpanded) wasExpanded.onclick();
                    }
                    wall.votingUpdateByPostRaw(post_id);
                    if (stUnder) {
                        deltaH += editEl.offsetHeight;
                    }

                    nodeUpdated(editEl);
                    window.Wall && Wall.updatePostAuthorData(post_id);
                    break;
                }
            case 'edit_reply':
                {
                    var reply_id = ev[3],
                        editEl = ge('wpt' + reply_id);
                    if (!isVisible('post' + reply_id) || !editEl) break;

                    var wasExpanded = geByClass1('wall_reply_more', editEl);
                    if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

                    var text = psr(ev[4]);

                    if (window.fifaReplaceText) {
                        text = fifaReplaceText(text);
                    }

                    val(editEl, text);

                    updH = -editEl.offsetHeight;
                    updY = getXY(editEl)[1];
                    if (wasExpanded) {
                        wasExpanded = geByClass1('wall_reply_more', editEl);
                        if (wasExpanded) wasExpanded.onclick();
                    }
                    updH += editEl.offsetHeight;
                    nodeUpdated(editEl);
                    break;
                }
            case 'post_parsed_link':
                {
                    if (!el) break;
                    var btnWrap = geByClass1('wall_postlink_preview_btn_disabled', el);
                    if (!btnWrap) break;

                    var articleUrl = ev[3];

                    if (articleUrl === '1') {
                        // Old wiki page
                        removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');
                    } else if (articleUrl === '0') {
                        re(btnWrap);
                    } else if (articleUrl) {
                        removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');

                        var btnHref = geByClass1('flat_button', btnWrap);
                        if (btnHref) {
                            btnHref.setAttribute('href', ev[3]);
                            btnHref.removeAttribute('onclick');
                        }
                    }
                    break;
                }
            case 'del_post':
                {
                    if (el) {
                        var row = domClosest('feed_row', el) || domClosest('feed_row_unshown', el) || el;
                        if (!cur.wallMyDeleted[post_id]) {
                            if (feed.needScrollPost(st, el)) {
                                deltaH -= el.offsetHeight + _mt(el);
                            }
                            revertLastInlineVideo(el);
                            re(row);
                        }
                        cur.options.offset--;
                        if (hasClass(cur.feedEls.wrap, 'feed_has_new') && !isVisible(row)) {
                            cur.newPostsCount--;
                            if (!cur.newPostsCount) {
                                removeClass(cur.feedEls.wrap, 'feed_has_new');
                            } else {
                                cur.feedEls.newPosts.innerHTML = getLang('news_new_posts', cur.newPostsCount);
                            }
                        }
                    }
                    break;
                }
            case 'res_post':
                {
                    el && cur.options.offset++;
                    break;
                }
            case 'new_reply':
                {
                    if (!el || cur.wallMyReplied[post_id] || ge('post' + ev[3])) break;

                    if (hasClass(ge('post' + post_id), 'deep_active')) {
                        var res = wall.addNewReply(ev);
                        deltaH += res[0];
                        break;
                    }

                    var repliesEl = ge('replies' + post_id),
                        repliesWrap = ge('replies_wrap' + post_id),
                        startH = el.offsetHeight,
                        oid = post_id.split('_')[0],
                        adminLevel = (oid < 0) ? ((flags & 8) ? constants.Groups.GROUPS_ADMIN_LEVEL_EDITOR : ((flags & 2) ? constants.Groups.GROUPS_ADMIN_LEVEL_MODERATOR : constants.Groups.GROUPS_ADMIN_LEVEL_USER)) : constants.Groups.GROUPS_ADMIN_LEVEL_USER,
                        replyHTML = wall.getNewReplyHTML(ev, adminLevel),
                        newEl = false,
                        highlight = false;

                    if (!isVisible(repliesEl) || !isVisible(repliesWrap) || isVisible('reply_link' + post_id)) {
                        re('reply_link' + post_id);
                        show(repliesWrap, repliesEl);
                        highlight = true;
                    } else {
                        var openEl = repliesEl.nextSibling,
                            newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;

                        if (!cur.wallMyOpened[post_id]) {
                            replyHTML = wall.updatePostImages(replyHTML);
                            newEl = se(replyHTML);
                            addClass(newEl, 'new_reply');
                            if (!openEl || openEl.className != 'replies_open') {
                                openEl = ce('div', {
                                    className: 'replies_open',
                                    onclick: wall.openNewComments.pbind(post_id),
                                    role: 'button',
                                    tabIndex: 0
                                });
                                repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
                            }
                            openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
                            openEl.newCnt = newCnt;
                        } else {
                            if (openEl && openEl.className == 'replies_open') re(openEl);
                            highlight = true;
                            var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                                shown = geByClass('reply', repliesEl, 'div').length + 1,
                                total = shown;
                            if (headerEl) {
                                total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
                            }
                            if (total > 5 || shown < total) {
                                if (!headerEl) {
                                    repliesEl.insertBefore(headerEl = ce('a', {
                                        className: 'wr_header'
                                    }), repliesEl.firstChild);
                                }
                                wall.updateRepliesHeader(post_id, headerEl, shown, total);
                            }
                        }
                    }
                    if (post_id.split('_')[0] == vk.id) {
                        cur.feedUnreadCount++;
                    }
                    if (!newEl) {
                        newEl = se(replyHTML);
                    }
                    repliesEl.appendChild(newEl);
                    if (feed.needScrollPost(st, highlight ? newEl : openEl)) {
                        deltaH += el.offsetHeight - startH;
                    }
                    if (highlight) {
                        nodeUpdated(newEl);
                    }
                    Wall.repliesSideSetup(post_id);
                    Wall.updateMentionsIndex();

                    Likes.update('wall' + post_id, {
                        comment_num: ev[13]
                    });
                    break;
                }
            case 'del_reply':
                {
                    if (!cur.wallMyDeleted[post_id] && el) {

                        if (hasClass(gpeByClass('post', el), 'deep_active')) {
                            var res = wall.removeDeepReply(ev);
                            deltaH += res[0];
                            break;
                        }

                        if (feed.needScrollPost(st, el)) {
                            deltaH -= el.offsetHeight;
                        }

                        var post = el.parentNode.id.match(/replies(-?\d+_\d+)/);
                        revertLastInlineVideo(el);
                        re(el);
                        if (post) {
                            Wall.repliesSideSetup(post[1]);
                        }
                    }
                    break;
                }
            case 'view_post':
                {
                    Likes.update('wall' + post_id, {
                        views_num: Wall.formatCount(intval(ev[3]))
                    });
                    break;
                }
            case 'like_post':
            case 'like_reply':
                {
                    if (!el) break;
                    var likePost = (ev_type == 'like_reply' ? 'wall_reply' + post_id : post_id),
                        likeWrap = el && domByClass(el, '_like_wrap'),
                        shareWrap = el && domByClass(el, '_share_wrap');

                    wall.likeFullUpdate(likeWrap, likePost, {
                        like_my: likeWrap && hasClass(likeWrap, 'my_like'),
                        like_num: ev[3],
                        like_title: false,
                        share_my: shareWrap && hasClass(shareWrap, 'my_share'),
                        share_num: ev[4],
                        share_title: false
                    });
                    break;
                }
            case 'new_photos_private':
            case 'new_photos':
            case 'new_tagged':
                {
                    break;
                }
        }
        return deltaH;
    },
    feedPostRepl: function(repl, ev) {
        repl.replies = cur.wallTpl.post_replies;
        var ext = {
            full_id: ev[2],
            item_id: 'wall_' + ev[2],
            sec_name: stripHTML(ev[3]),
            date: wall.getNowRelTime(),
            del: cur.wallTpl.spam // always hiding from feed
        };
        if (cur.section == 'search' && cur.q) {
            var text = repl.text || '',
                q = cur.q,
                q_words = q.toLowerCase().split(/[\s.,:;!?()]/),
                links = [];
            text = text.replace(/<(.|\n)+?>/g, function(tag) {
                links.push(tag);
                return "\x01";
            });
            var text_l = text.toLowerCase(),
                i, pos, word;
            for (i = q_words.length - 1; i >= 0; i--) {
                word = q_words[i];
                if (!trim(word)) continue;
                pos = 0;
                while ((pos = text_l.indexOf(word, pos)) != -1) {
                    if (text.charAt(pos - 1) == String.fromCharCode(2)) {
                        pos += 2;
                        continue;
                    }
                    text = text.substr(0, pos) + "\x02" + i + "\x02" + text.substr(pos + word.length);
                    text_l = text_l.substr(0, pos) + "\x02" + i + "\x02" + text_l.substr(pos + word.length);
                }
            }
            text = text.replace(/\x02(\d+)\x02/g, function(a, i) {
                return '<span class="highlight">' + q_words[i] + '</span>';
            });
            text = text.replace(/\x01/g, function() {
                return links.shift() || '';
            });
            ext.text = text;
            if (ev[1] == 'new_post_reply') {
                ext.date_postfix = ev[7];
            }
        }
        return ext;
    },
    reSortItems: function() {
        if (!cur.feedToSort || !cur.feedToSort.length) return;
        each(cur.feedToSort, function(k, v) {
            var ph = ge('post_ph' + v),
                el = ge('post' + v).parentNode;
            if (ph && el) {
                ph.parentNode.insertBefore(el, ph);
                re(ph);
            }
        });
        cur.feedToSort = [];
        scrollToY(0, 0);
    },
    showNewPosts: function() {
        var newPostsButton = cur.feedEls.newPosts,
            mt = intval(getStyle(newPostsButton, 'marginTop'));
        removeClass(cur.feedEls.wrap, 'feed_has_new');
        cur.newPostsCount = 0;

        var container = ge('feed_rows');
        Wall.loadPostImages(container);
        each(geByClass('feed_row_unshown', container, 'div'), function() {
            replaceClass(this, 'feed_row_unshown', 'feed_row');
            // nodeUpdated(geByClass1('page_block', this));
        });
    },
    updateTitle: function() {
        if (!cur.idleManager) return;
        if (!cur.idleManager.isIdle) {
            cur.feedUnreadCount = 0;
        }
        setDocumentTitle((cur.feedUnreadCount ? '(' + cur.feedUnreadCount + ') ' : '') + cur.feedInitialTitle);
    },
    toggleTabsMenuTab: function(section, on) {
        var tabEl = geByClass1('feed_section_' + section, cur.feedEls.rmenu);
        tabEl && toggleClass(tabEl, 'ui_rmenu_item_hidden', !on);
    },
    toggleTabsMenu: function(ev, on) {
        var feedMenu = ge('feed_add_list_icon');
        if (on === undefined) {
            on = !hasClass(feedMenu, 'shown');
        }
        if (browser.mozilla) {
            setStyle('page_body', {
                overflow: on ? 'visible' : ''
            });
        }
        uiActionsMenu.toggle(feedMenu, on);
        if (on) {
            addEvent(document, 'mousedown', function(e) {
                feed.toggleTabsMenu(false, 0);
                removeEvent(document, 'mousedown', arguments.callee);
            });
        }

        return ev && cancelEvent(ev);
    },
    checkTabsFilter: function(filter_row, option) {
        switch (option) {
            case 'news':
                return false;
            case 'newlist':
                return feed.addList();
            default:
                if (listMatches = option.match(/list(\d+)/)) {
                    return feed.editList(listMatches[1]);
                }
        }

        var cont = ge('tabs_type_filter'),
            selected = option == cur.section,
            my_types = cur.my_feed_types.tabs,
            types = cur.feed_types.tabs,
            found, pos, listMatches;

        found = (pos = indexOf(my_types, option)) != -1;

        toggleClass(filter_row, 'checked', !found);
        if (found) {
            my_types.splice(pos, 1);
            if (selected) {
                cur.onSaveTabs = function(option, found) {
                    feed.toggleTabsMenu(null, false);
                    feed.switchSection('news');
                }.pbind(option, found);
            }
        } else {
            my_types.push(option);
        }

        cur.my_feed_types.tabs = my_types;
        feed.toggleTabsMenuTab(option, !found || selected);

        // fix slider position on tab list editing
        uiRightMenu.fixScroller(ge('ui_rmenu_' + cur.section + (cur.list || '')));

        clearTimeout(cur.saveTabsTO);
        cur.saveTabsTO = setTimeout(feed.saveTabs, 500);
    },
    hasSearchParams: function(params) {
        var hasParams = false;
        each(params, function(k, v) {
            if ((!k.indexOf('c[') && k !== 'c[section]' || k == 'q') && v) {
                hasParams = true;
                return false;
            }
        });

        return hasParams;
    },
    getSectionParams: function(section) {
        var params = {
            section: section
        };
        switch (section) {
            case 'news':
            case 'recommended':
            case 'groups':
            case 'friends':
            case 'videos':
            case 'photos':
            case 'podcasts':
                if ((params.subsection = cur.subsections[section]) === undefined) {
                    delete params.subsection;
                }
                break;

            case 'owner':
                if (!(params.owner = cur.owner)) {
                    delete params.section;
                }
                break;

            case 'source':
                if (!(params.source = cur.source)) {
                    delete params.source;
                }
                break;

            case 'list':
                if ((params.subsection = cur.subsections['list' + cur.list]) === undefined) {
                    delete params.subsection;
                }
                if (!(params.list = cur.list)) {
                    delete params.list;
                }
                break;

            case 'notifications':
                if (!(params.source = cur.source)) {
                    delete params.source;
                }
                break;

            case 'articles':
                if ((params.subsection = cur.subsections[section]) === undefined) {
                    delete params.subsection;
                }
                break;

            case 'search':
                var form = ge('search_filters_form');
                if (form) {
                    var extra = serializeForm(form) || {};
                    for (var i in extra) {
                        if (!extra[i] || extra[i] == '0') delete extra[i];
                    }
                    extend(params, extra);
                }
                params['c[q]'] = trim(val(cur.feedEls.search));
                break;

            case 'photos_search':
                if (!(params.q = trim(val(cur.feedEls.search)))) {
                    delete params.section;
                }
                // if (!(params.sort = intval(cur.searchSortMenu && cur.searchSortMenu.val()))) {
                if (!(params.sort = intval(cur.search_sort_value))) {
                    delete params.sort;
                }
                break;

            case 'articles_search':
                if (!(params.q = trim(val(cur.feedEls.search)))) {
                    params.section = 'articles';
                }
                break;

            case 'comments':
                if (cur.reposts) {
                    params.reposts = cur.reposts;
                }
                break;

            case 'mentions':
                if (cur.mentionObj && cur.mentionObj != vk.id) {
                    params.obj = cur.mentionObj;
                }
                break;
        }
        return params;
    },
    switchNotifyList: function(list_id, params) {
        uiRightMenu.go(geByClass1('feed_section_' + list_id), false, false);
        feed.go(params);
    },
    switchSubSection: function(subSection, e, hash) {
        if (e && checkEvent(e)) {
            return true;
        }

        sectionKey = cur.section;
        if (cur.section === 'list') {
            sectionKey = 'list' + cur.list;
        }

        cur.subsection = cur.subsections[sectionKey] = subSection;
        var params = feed.getSectionParams(cur.section);
        params.hash = hash;
        delete cur.feedUpdateLoading;
        delete cur.isFeedLoading;
        nav.go(extend(params || {}, {
            '0': 'feed'
        }));
        uiRightMenu.showProgress(cur.feedEls.rmenu);
    },
    switchSection: function(newSection, e, noLink) {
        if (e && checkEvent(e)) {
            return true;
        }
        if (cur.feedDestroy) {
            for (var i in cur.feedDestroy) {
                try {
                    cur.feedDestroy[i](cur);
                } catch (e) {
                    try {
                        console.log(e.stack);
                    } catch (e2) {}
                }
            }
            cur.feedDestroy = [];
        }

        removeClass(cur.feedEls.wrap, 'feed_has_new');

        cur.newPostsCount = 0;
        if (newSection == 'photos_search' && !trim(val(cur.feedEls.search))) {
            if (cur.section != 'photos_search') return false;
            newSection = 'photos';
        }
        if (newSection == 'comments') {
            cur.reposts = cur.options.reposts = '';
        }
        statlogsValueEvent('feed_switch', 0, newSection);
        feed.setSection(newSection, 1);
        var params = feed.getSectionParams(newSection || 'news');
        delete cur.feedUpdateLoading;
        delete cur.isFeedLoading;
        var link = noLink ? false : extend(params || {}, {
            '0': 'feed'
        });

        uiRightMenu.go(geByClass1('feed_section_' + newSection), false, link);
        return false;
    },
    setSection: function(newSection, from, options) {
        from = from || 0;
        cur.prevSection = cur.section;
        if (newSection == cur.section && from < 2 || !newSection) return;

        uiRightMenu.hideProgress(cur.feedEls.rmenu);
        if (cur.feedEls.search) {
            uiSearch.hideProgress(cur.feedEls.search);
        }

        if (from > 1) {
            toggleClass(cur.feedEls.wrap, 'feed_submit_shown', inArray(newSection, cur.options.feed_types.tabs.concat(['list', 'likes'])));
            toggleClass(cur.feedEls.wrap, 'feed_submit_only_shown', ~['recommended', 'search', 'updates', 'comments'].indexOf(newSection));

            var showSearch = inArray(newSection, ['articles_search', 'articles', 'search', 'photos_search', 'photos']);
            toggleClass(cur.feedEls.wrap, 'feed_search_shown', showSearch);
            if (showSearch) {
                elfocus(cur.feedEls.search);
            }
            if (cur.section) {
                val(cur.feedEls.search, '');
            }
        }

        if (from == 2) {
            window.Stories && Stories.updateFeedStories(newSection, options);
        }

        // show tab if disabled section is selected, hide if not selected
        if (cur.my_feed_types) {
            if (~indexOf(cur.my_feed_types.optional_tabs, cur.section) &&
                !~indexOf(cur.my_feed_types.tabs, cur.section)
            ) {
                feed.toggleTabsMenuTab(cur.section, false);
            }
            if (~indexOf(cur.my_feed_types.optional_tabs, newSection) &&
                !~indexOf(cur.my_feed_types.tabs, newSection)
            ) {
                feed.toggleTabsMenuTab(newSection, true);
            }
        }

        cur.section = newSection;
        if (from == 4) {
            feed.searchUpdate();
            return;
        }

        cur.editingHide = (newSection == 'notifications' || newSection == 'replies') ? feed.notifyCheckHideReply : false;

        if (cur.gifAutoplayScrollHandler) {
            cur.gifAutoplayScrollHandler();
        }
        if (cur.videoAutoplayScrollHandler) {
            cur.videoAutoplayScrollHandler();
        }
    },
    // from: 3 - init, 2 - navigation, undefined - other
    applyOptions: function(options, from) {
        from = from || 0;
        if (options.no_left_ads) {
            cur.no_left_ads = true;
        }
        if (options.owner) {
            cur.owner = options.owner;
        }
        cur.subsection = options.subsection || '';
        feed.setSection(options.section, from, options);
        if (!cur.options) cur.options = {
            reply_names: {}
        };
        extend(cur.options.reply_names, options.reply_names);
        delete options.reply_names;
        extend(cur, options);

        sectionKey = cur.section;
        if (cur.section === 'list') {
            sectionKey = 'list' + options.list;
        }
        cur.subsections[sectionKey] = cur.subsection;

        if (options.loc && from == 2) {
            nav.setLoc(options.loc);
        }

        if (options.section && options.section == 'news' && options.subsection && options.subsection == 'top') {
            statlogsValueEvent('feed_switch', 0, 'top_news', from);
        }

        if (options.filters !== undefined) {
            var minEl = ge('search_filters_minimized'),
                filtersExpanded = minEl && hasClass(minEl, 'ui_rmenu_item_expanded'),
                needExpand = !!minEl;
            val('feed_filters', options.filters);
            if (window.searcher && needExpand) {
                searcher.toggleMinimizedFilters(ge('search_filters_minimized'), filtersExpanded, true);
            }
        }

        if (options.script) {
            eval(options.script);
        }
        if (options.htitle) {
            cur.feedInitialTitle = document.title = replaceEntities(stripHTML(options.htitle));
        }
        if (options.add_queue !== undefined && options.add_queue !== null) {
            if (options.add_queue === true) {
                cur.add_queue = options.add_queue = false;
            }
            feed.getNewQKey(0);
            if (options.add_queue !== true && (cur.add_queue = options.add_queue)) {
                setTimeout(feed.update.pbind(0), 0);
            }
        } else if (from && cur.section != 'search' && cur.section != 'news' && cur.section) {
            cur.add_queue = false;
        }
        if (options.q) {
            val(cur.feedEls.search, replaceEntities(options.q));
            var query = options.q;
            if (query.length > 30) {
                query = trim(query.substr(0, 30)) + '...';
            }
        }
        if (options.last_view) cur.options.last_view = options.last_view;
        if (options.feedback_list !== undefined) cur.options.feedback_list = options.feedback_list;
        feed.searchUpdate();
        if (cur.section == 'comments' && !cur.reposts) {
            toggle('comments_filters', !cur.reposts);
        }
        if (isString(cur.all_shown_text)) {
            val('all_shown', cur.all_shown_text);
        }
        if (isString(cur.show_more_text)) {
            val('show_more_link', cur.show_more_text);
        }
        if (cur.empty_text) {
            val('feed_empty', cur.empty_text);
        }
        if (cur.count >= 0) {
            re('feed_error_wrap');
        }
        var hasNews = geByClass1('feed_row', cur.rowsCont, 'div') || false,
            isEmpty = !hasNews,
            nextRows = ge('feed_rows_next');

        if (isEmpty) {
            toggleClass(cur.feedEls.wrap, 'feed_is_empty', !isVisible('feed_error_wrap'));
            hide('all_shown');
            toggle('show_more_link', cur.count > 0 && !cur.all_shown);
        } else if (cur.all_shown && (!nextRows || !nextRows.firstChild)) {
            hide('show_more_link');
            show('all_shown');
            removeClass(cur.feedEls.wrap, 'feed_is_empty');
            re(nextRows);
        } else {
            hide('all_shown');
            show('show_more_link');
            removeClass(cur.feedEls.wrap, 'feed_is_empty');
        }

        if (options.playlistsData) {
            options.playlistsData = JSON.parse(options.playlistsData);
            cur.pageVideosList = extend(cur.pageVideosList || {}, options.playlistsData);
        }

        if ((cur.section == 'notifications' || cur.section == 'replies') && cur.notify) {
            var el = ge('feedback_row' + cur.notify);
            if (el && el.onclick) {
                setTimeout(function() {
                    el.onclick();
                    scrollToY(getXY(el)[1], 0);
                }, browser.msie ? 100 : 0);
                delete cur.notify;
            }
        }

        cur.feedSection && cur.feedSection(options.section, options.subsection);
        // feed.applyUi();

        if (options.hot_feature_tooltip) {
            setTimeout(function() {
                Feed.showHotTooltip(options.hot_feature_tooltip_hash);
            }, 800);
        }

        feed.updateTimer();
    },
    showMore: function() {
        if (cur.isFeedLoading) return;
        cur.disableAutoMore = false;
        var nextRows = ge('feed_rows_next');
        var el;
        if (nextRows) {
            if (nextRows.firstChild) {
                while (nextRows.firstChild) {
                    el = nextRows.firstChild;
                    cur.rowsCont.insertBefore(el, nextRows);
                    Feed.onPostLoaded(el, true);
                }
            }
            re(nextRows);
        }
        if (cur.section == 'live') {
            cur.all_shown = true;
        }
        var moreBtn = ge('show_more_link');
        if (cur.all_shown) {
            hide(moreBtn);
            show('all_shown');
        }
        if (cur.section == 'live') return;
        var escPressed = false;
        var tmp = function(e) {
            if (e.keyCode == KEY.ESC) {
                escPressed = true;
            }
        };
        addEvent(document, 'keyup', tmp);
        var params = feed.getSectionParams(cur.section || 'news');
        extend(params, {
            offset: cur.offset,
            from: cur.from,
            part: 1,
            more: 1,
            last_view: cur.options.last_view
        });
        if (cur.options.feedback_list) {
            params.list = cur.options.feedback_list;
        }
        if (nav.objLoc.situational_suggest_id) {
            params.situational_suggest_id = nav.objLoc.situational_suggest_id
        }
        var section = cur.section;
        ajax.post('al_feed.php?sm_' + cur.section, params, {
            onDone: function(options, rows) {
                removeEvent(document, 'keyup', tmp);
                if (section != cur.section) return;
                if (escPressed) {
                    cur.disableAutoMore = true;
                    return;
                }
                if (rows) {
                    var au = ce('div'),
                        row;
                    au.innerHTML = rows;
                    while (row = au.firstChild) {
                        if (!row.firstChild || !row.firstChild.id || ge(row.firstChild.id)) {
                            if (row.id != 'feedback_unread_bar' && !hasClass(row, 'feed_row_fb_hidden') && !hasClass(row, 'feed_to_recomm')) {
                                au.removeChild(row);
                                continue;
                            }
                        }
                        cur.rowsCont.appendChild(row);
                        Feed.onPostLoaded(row, true);
                    }
                }
                shortCurrency();
                feed.applyOptions(options);
                setTimeout(feed.scrollCheck, 200);
            },
            showProgress: function() {
                lockButton(moreBtn);
                cur.isFeedLoading = true;
            },
            hideProgress: function() {
                unlockButton(moreBtn);
                cur.isFeedLoading = false;

                // Check how long user wait for a new content after he saw the loading button
                if (moreBtn.seen) {
                    var timeAfterSeen = Math.ceil((Date.now() - moreBtn.seen) / 1000);
                    var ref = cur.section + (cur.subsection ? '_' + cur.subsection : '');

                    statlogsValueEvent('feed_load_more_seen_time', timeAfterSeen, ref);
                    moreBtn.seen = false;
                }
            },
            cache: 1
        });
    },
    showMoreFriends: function(load_more_btn, e) {
        if (checkEvent(e)) return;
        lockButton(load_more_btn);
        cur._back.show.push(function() {
            unlockButton(load_more_btn);
        });
        nav.go('/friends?act=find');
    },
    showMorePublics: function(load_more_btn, e) {
        if (checkEvent(e)) return;
        lockButton(load_more_btn);
        cur._back.show.push(function() {
            unlockButton(load_more_btn);
        });
        nav.go('/groups?act=catalog&c%5Bcategory%5D=0 ');
    },
    getTypesSection: function() {
        switch (cur.section) {
            case 'owner':
                return (cur.owner > 0 ? 'person' : 'group');

            default:
                return cur.section;
        }
    },
    checkFilter: function(filter_row, option) {
        var typesSection = feed.getTypesSection(),
            cont = ge(typesSection + '_type_filter'),
            my_types = cur.my_feed_types[typesSection],
            types = cur.feed_types[typesSection],
            found, pos;

        if (typesSection == 'notifications') {
            feed.setNotifyFilter(filter_row, option);
            return;
        }

        if (my_types === true) {
            my_types = clone(types);
        }
        found = (pos = indexOf(my_types, option)) != -1;
        if (found) {
            my_types.splice(pos, 1);
        } else {
            my_types.push(option);
            if (my_types.length == types.length) {
                my_types = true;
            }
        }
        checkbox(filter_row);

        cur.my_feed_types[typesSection] = my_types;
        feed.updateTypesCookie();
        Feed.setFiltersUpdatePage();
        cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu);
    },
    setFilter: function(filter_row, option) {
        var typesSection = feed.getTypesSection(),
            cont = ge(typesSection + '_type_filter'),
            my_types = cur.my_feed_types[typesSection],
            types = cur.feed_types[typesSection],
            all_unchecked = true,
            pos;

        if (typesSection == 'notifications') {
            return;
        }

        each(geByClass('_feed_filter_row', cont, 'div'), function() {
            if (isChecked(this) && this != filter_row) return (all_unchecked = false);
        });
        if (all_unchecked) {
            cur.my_feed_types[typesSection] = true;
            each(geByClass('_feed_filter_row', cont, 'div'), function() {
                checkbox(this, true);
            });
        } else {
            each(geByClass('_feed_filter_row', cont, 'div'), function() {
                checkbox(this, false);
            });
            cur.my_feed_types[typesSection] = [option];
            checkbox(filter_row, true);
        }

        feed.updateTypesCookie();
        Feed.setFiltersUpdatePage({
            force_expand_filters: 1
        });
        cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu);
    },
    setFiltersUpdatePage: function(opts) {
        opts = opts || {};

        var url = nav.strLoc;
        if (cur.section === 'updates') {
            if (!url.match(/\&filters\_expanded\=1/) && (!ge('updates_show_all_filters') || opts.force_expand_filters)) {
                url += '&filters_expanded=1';
            }

            url = url.replace(/\&filters\_shown\=([a-z\,]+)/, '');
            var filters_els = geByClass('_feed_filter_row', 'feed_filters'),
                filters = [];
            for (var i = 0; i < filters_els.length; i++) {
                if (!hasClass(filters_els[i], 'hide')) {
                    filters.push(filters_els[i].id.replace('filter_updates', ''));
                }
            }
            url += '&filters_shown=' + filters.join(',');
        }
        nav.go(url);
    },
    setNotifyFilter: function(filter_row, option) {
        checkbox(filter_row);
        if (!cur.notifyPrefs) cur.notifyPrefs = {};
        cur.notifyPrefs[option] = isChecked(filter_row);

        clearTimeout(cur.saveNotifyPrefsTO);
        cur.saveNotifyPrefsTO = setTimeout(function() {
            var prefs = [];
            each(cur.notifyPrefs, function(i, v) {
                prefs.push((!v ? '-' : '') + i);
            });
            prefs = prefs.join(',');
            ajax.post('/al_feed.php', {
                act: 'a_set_notify_prefs',
                prefs: prefs,
                feed: 1,
                hash: cur.topNotifyHash
            }, {
                onDone: function(tmpl) {
                    addTemplates({
                        top_notify_prefs: tmpl
                    });
                    toggleClass('top_notify_pref_' + option, 'checked', cur.notifyPrefs[option]);
                    cur.notifyPrefs = {};
                    if (window.TopNotifier) {
                        TopNotifier.invalidate();
                    }
                    nav.go(nav.strLoc);
                    cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu);
                }
            });
        }, 500);
    },
    updateTypesCookie: function() {
        var new_cookie = [];
        each(cur.my_feed_types, function(section, types) {
            if (section == 'tabs') return;
            new_cookie.push(
                types === true ? '*' : types.join(',')
            );
        });
        setCookie('remixfeed', new_cookie.join('.'), 365);
    },
    toggleFeedTop: function(el, e, hash) {
        var toggler = geByClass1('_ui_toggler', el),
            subSection = 'top';
        toggleClass(toggler, 'on');
        switch (cur.section) {
            case 'news':
            case 'recommended':
            case 'groups':
            case 'friends':
            case 'videos':
            case 'photos':
            case 'list':
                subSection = hasClass(toggler, 'on') ? 'top' : 'recent';
                break;
            case 'articles':
                subSection = hasClass(toggler, 'on') ? 'suggested' : 'top';
                break;
            case 'podcasts':
                subSection = hasClass(toggler, 'on') ? 'recent' : 'top';
                break;
        }
        feed.switchSubSection(subSection, e, hash);
    },
    switchList: function(list_id) {
        cur.prevList = cur.list;
        cur.list = list_id;
        feed.setSection('list', 1);
        uiRightMenu.go(geByClass1('feed_section_list' + list_id), false, false);
        feed.go(feed.getSectionParams(cur.section));
    },
    setSearchSort: function(value) {
        cur.search_sort_value = value;
        Feed.submitSearch();
    },
    _activateReplyBox: function(item, event, opts) {
        (event || {}).cancelBubble = true;

        var replyBox = ge('reply_box' + item);
        if (cur.editing && cur.editing != item && cur.notifyReplyData && cur.notifyReplyData[cur.editing].disabled) {
            feed.notifyCheckHideReply(cur.editing, (window.event || {}).target);
        }
        if (replyBox && isVisible(replyBox)) {
            feed.notifyCheckHideReply(item, false);
            return;
        }

        if (cur.notifyReplyData === undefined) {
            cur.notifyReplyData = {};
        }
        cur.notifyReplyData[item] = opts;

        if (opts.disabled) {
            if (replyBox) {
                show(replyBox);
            } else {
                itemEl.appendChild(se(rs(cur.options.feedback_dis, {
                    item: item,
                    text: opts.disabled
                })));
            }
            setTimeout(function() {
                cur.editing = item;
            }, 0);
            return;
        }

        show(replyBox);
        Wall.showEditReply(item, event);

        var rf = ge('reply_field' + item);
        rf.setAttribute('placeholder', opts.ph);
        if (window.Emoji) {
            Emoji.val(rf, opts.greet.replace(/ $/, '&nbsp;'));
        }
        data(rf, 'send', feed.notifySendReply);
        removeClass('reply_box' + item, 'clear_fix'); // corner fix
    },
    notifyClick: function(item, event, opts) {
        var itemEl = ge('feedback_row' + item);
        if (!Wall.checkPostClick(itemEl, event)) return;

        Feed._activateReplyBox(item, event, opts);
    },
    blindNotifyReply: function(item, event, opts) {
        Feed._activateReplyBox(item, event, opts);
    },
    notifySendReply: function(item, ev, options) {
        var opts = cur.notifyReplyData[item];
        if (!opts || opts.sending) return;

        var rf = ge('reply_field' + item),
            btn = ge('reply_button' + item),
            row = ge('feedback_row' + item),
            composer = rf && data(rf, 'composer'),
            state;

        if (options.stickerId) {
            var params = {
                message: '',
                attach1_type: "sticker",
                attach1: options.stickerId
            };
        } else {
            var params = composer ? Composer.getSendParams(composer, feed.notifySendReply.pbind(item)) : {
                message: trim(Emoji.editableVal(rf))
            };
            if (params.delayed) {
                return;
            }

            if (!params.attach1_type) {
                if (!params.message || opts.greet && !opts.greet.indexOf(params.message)) {
                    Emoji.editableFocus(rf, false, true);
                    return;
                }
            }
        }

        extend(params, {
            act: 'post',
            from: 'feedback',
            item: item
        }, opts.params || {});
        var fromGroupEl = ge('reply_as_group' + item);
        if (fromGroupEl && isVisible(domPN(fromGroupEl))) {
            params.from_oid = domData(domClosest('_submit_post_box', fromGroupEl), 'from-oid');
        }
        opts.sending = 1;
        ajax.post('al_wall.php', Wall.fixPostParams(params), {
            onDone: function(text, answer) {
                delete opts.sending;
                if (composer) {
                    state = Composer.reset(composer);
                } else if (window.Emoji) {
                    Emoji.val(rf, '');
                }
                if (rf.autosize) {
                    rf.autosize.update();
                }
                feed.notifyHideReply(item);

                if (answer) {
                    var answerWrap = geByClass1('_answer_wrap', row);
                    val(answerWrap, answer);
                    show(answerWrap);
                } else if (text) {
                    showDoneBox(text);
                }
            },
            onFail: function() {
                delete opts.sending;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    notifyCheckHideReply: function(item, target) {
        var opts = cur.notifyReplyData && cur.notifyReplyData[item];
        if (!opts || opts.sending || !isVisible('reply_box' + item)) return;

        cur.editing = false;
        if (!opts.disabled) {
            var rf = ge('reply_field' + item),
                v = trim(window.Emoji ? Emoji.editableVal(rf) : ''),
                hasMedia = Wall.hasComposerMedia(rf);
            if (!rf || hasMedia || v && !opts.greet || opts.greet.indexOf(v)) {
                return;
            }
        }
        feed.notifyHideReply(item);
    },
    notifyHideReply: function(item) {
        if (cur.editing == item) {
            cur.editing = false;
        }

        var postEl = ge('feedback_row' + item);
        removeClass(postEl, 'reply_box_open');
        hide('reply_box' + item);

        var point = cur.replySubmitSettings;
        point && point.tt && point.tt.el && point.tt.destroy();
    },
    ungroup: function(item, ev) {
        var el = ge('feedback_row' + item);
        ev = ev || window.event;
        if (!el || checkEvent(ev) || !Wall.checkPostClick(el, ev, true)) return;

        var hid = domNS(domPN(el)),
            names = geByClass1('_header', el),
            tmp = val(names),
            name = ge('fbgr_' + item + '_that');
        toggle(hid);
        toggleClass(el, 'feedback_row_expanded', isVisible(hid));
        val(names, val(name));
        val(name, tmp);
    },
    ungroupUnified: function(item, ev) {
        var el = ge('feedback_row' + item);
        ev = ev || window.event;
        if (!el || checkEvent(ev) || !Wall.checkPostClick(el, ev, true)) return;

        var hid = domNS(domPN(el));
        show(hid);
        re(domPN(el));
    },

    notifyPostTooltip: function(el, post, opts, tt_opts) {
        var reply = (opts || {}).reply,
            url = 'al_wall.php';

        if (!post.indexOf('topic_comment')) {
            url = 'al_board.php';
            post = post.replace('topic_comment', '');
        } else {
            post = post.replace('wall_reply', '').replace('wall', '');
        }

        tt_opts = tt_opts || {};

        showTooltip(el, extend({
            url: url,
            params: extend({
                act: 'post_tt',
                post: post,
                self: 1,
                from: 'feedback'
            }, opts || {}),
            slide: 15,
            shift: [(reply && !(reply % 2)) ? 329 : 27, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 800,
            dir: 'auto',
            className: 'rich wall_tt wall_module _feed_notification feed_notification', // _feed_notification ������������ ���������, �������� docs.js, ����� ������ �����, ��� ��������� ������
            appendParentCls: 'scroll_fix_wrap'
        }, tt_opts));
    },
    unifiedRestoreRow: function(query, hash, btn) {
        var progress = ce('span', {
            className: 'progress_inline'
        });
        ajax.post('al_feed.php', {
            act: 'a_feedback_unified_restore',
            query: query,
            hash: hash,
            from: 'top_notifier'
        }, {
            onDone: function(text) {
                var fd = gpeByClass('_feedback_deleted', btn);
                if (!fd) return;
                var r = gpeByClass('_feed_row', fd),
                    t = geByClass1('_post_wrap', r);
                c = geByClass1('_post_content', t),

                    show(c, geByClass1('_answer_wrap', r));
                hide(fd);
                removeClass(r, 'feedback_row_touched');
            },
            showProgress: function() {
                if (btn && btn.tagName.toLowerCase() === 'button') {
                    lockButton(btn);
                } else {
                    btn.parentNode.replaceChild(progress, btn);
                }
            },
            hideProgress: function() {
                if (btn && btn.tagName.toLowerCase() === 'button') {
                    unlockButton(btn);
                } else {
                    progress.parentNode.replaceChild(btn, progress);
                }
            }
        })
    },
    notifyMarkSpam: function(item, types, hash) {
        ajax.post('al_feed.php', {
            act: 'a_feedback_mark_spam',
            item: item,
            hash: hash,
            types: types
        }, {
            onDone: function(html) {
                ge('notify_mark_spam_' + item).innerHTML = html;
            }
        })
    },
    notifyDeleteAll: function(uid, hash, item, btn) {
        if (!cur.notifyDeletingAll) cur.notifyDeletingAll = {};
        if (cur.notifyDeletingAll[uid]) {
            return;
        }
        cur.notifyDeletingAll[uid] = 1;
        var progress = ce('span', {
            className: 'progress_inline'
        });

        ajax.post('al_feed.php', {
            act: 'a_feedback_delete_all',
            uid: uid,
            item: item,
            hash: hash
        }, {
            onDone: function(text, act) {
                // showDoneBox(text);
                var fd = gpeByClass('_feedback_deleted', btn);
                if (act == 1) {
                    re(gpeByClass('_feed_row', fd));
                    return;
                }
                var rows, row, isTop = false;
                if (hasClass(fd, '_top_feedback_deleted')) {
                    isTop = true;
                    rows = ge('top_notify_cont');
                } else {
                    rows = cur.rowsCont;
                }
                if (rows && (row = rows.firstChild)) {
                    var startY = false,
                        st = scrollGetY(),
                        h, y;
                    do {
                        if (row.className &&
                            hasClass(row, '_feed_row') &&
                            row.firstChild &&
                            uid == row.firstChild.getAttribute('author')) {
                            h = row.offsetHeight;
                            y = row.offsetTop;
                            if (startY === false) {
                                startY = getXY(row.offsetParent)[1]
                            }
                            hide(row);
                            if (y + startY < st) {
                                st -= h;
                                scrollToY(st, 0);
                            }
                        }
                    } while (row = row.nextSibling);

                    if (cur.wasScroll === 0 || cur.wasScroll > 0) {
                        cur.wasScroll = st;
                    }
                    feed.scrollCheck();
                }
                fd.innerHTML = '<span class="dld_inner">' + text + '</span>';
            },
            showProgress: function() {
                if (btn && btn.tagName.toLowerCase() === 'button') {
                    lockButton(btn);
                } else {
                    btn.parentNode.replaceChild(progress, btn);
                }
            },
            hideProgress: function() {
                if (btn && btn.tagName.toLowerCase() === 'button') {
                    unlockButton(btn);
                } else {
                    progress.parentNode.replaceChild(btn, progress);
                }
            }
        })
    },

    getModuleRef: function() {
        var module = cur.module || 'feed_other';
        if (cur.module == 'feed') {
            if (cur.section == 'news') {
                module = cur.subsection ? 'feed_news_' + cur.subsection : 'feed_news';
            } else if (cur.section === 'podcasts') {
                module = module + '_' + cur.section + (cur.subsection === 'recent' ? '_my' : '');
            } else if (cur.section) {
                module = module + '_' + cur.section;
            } else {
                module = 'feed_other';
            }
        }
        return module;
    },
    ignoreItem: function(post_raw, feed_raw, hash, caption_type, uids) {
        var postEl = ge('post' + post_raw),
            adData = postEl.getAttribute('data-ad'),
            actMenu = geByClass1('ui_actions_menu_wrap', postEl),
            from = feed.getModuleRef();
        actMenu && uiActionsMenu.toggle(actMenu, false);
        revertLastInlineVideo(postEl);
        cur.feedEntriesHTML[post_raw] = val(postEl);
        ajax.post('/al_feed.php?misc', {
            act: 'a_ignore_item',
            post_raw: post_raw,
            feed_raw: feed_raw,
            caption_type: caption_type,
            uids: uids,
            hash: hash,
            ad_data: adData,
            ref: from
        }, {
            onDone: function(html, js) {
                val(postEl, html);
                eval(js);
            },
            stat: ['privacy.js', 'privacy.css']
        });
    },
    unignoreItem: function(post_raw, feed_raw, hash, btn) {
        var from = feed.getModuleRef();
        ajax.post('/al_feed.php?misc', {
            act: 'a_unignore_item',
            post_raw: post_raw,
            feed_raw: feed_raw,
            hash: hash,
            ref: from
        }, {
            onDone: function() {
                feed.restorePost(post_raw);
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    reportIgnoredItem: function(post, hash) {
        ajax.post('al_wall.php', {
            act: 'spam',
            post: post,
            hash: hash
        }, {
            onDone: function(msg) {
                var r = ge('post' + post),
                    label = r && geByClass1('feed_post_report', r, 'div');
                val(label, msg);
            }
        });
    },
    ignoreOwner: function(post_raw, owner_id, type, hash, btn) {
        if (post_raw) {
            cur.feedEntriesHTML[post_raw + '_ignored'] = val('post' + post_raw);
        }
        var list = (cur.section == 'list' && cur.list || 0),
            from = feed.getModuleRef();
        ajax.post('/al_feed.php?misc', {
            act: 'a_ignore_owner',
            post_raw: post_raw,
            owner_id: owner_id,
            type: type,
            hash: hash,
            list: list,
            ref: from
        }, {
            onDone: function(html) {
                val('post' + post_raw, html);
                each(geByClass('post', cur.rowsCont), function(i, v) {
                    var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    if (ids && ids[1] != post_raw && (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id)) {
                        revertLastInlineVideo(this);
                        hide(this.parentNode);
                    }
                });
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    unignoreOwner: function(post_raw, owner_id, hash, btn) {
        var list = (cur.section == 'list' && cur.list || 0),
            from = feed.getModuleRef();
        ajax.post('/al_feed.php?misc', {
            act: 'a_unignore_owner',
            post_raw: post_raw || '',
            owner_id: owner_id,
            hash: hash,
            list: list,
            ref: from
        }, {
            onDone: function(html) {
                if (post_raw) {
                    val('post' + post_raw, cur.feedEntriesHTML[post_raw + '_ignored']);
                } else {
                    val('ignore_row' + owner_id, html);
                }
                each(geByClass('post', cur.rowsCont), function(i, v) {
                    var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    if (ids && (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id)) {
                        show(this.parentNode);
                    }
                });
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    ignoreLiveOwner: function(post_raw, owner_id, hash, btn) {
        var postEl = ge('post' + post_raw),
            actMenu = geByClass1('ui_actions_menu_wrap', postEl);
        actMenu && uiActionsMenu.toggle(actMenu, false);
        revertLastInlineVideo(postEl);
        cur.feedEntriesHTML[post_raw + '_ignored'] = val('post' + post_raw);
        ajax.post('al_feed.php?act=a_ignore_live_owner', {
            post_raw: post_raw,
            owner_id: owner_id,
            hash: hash
        }, {
            onDone: function(html) {
                val('post' + post_raw, html);
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    unignoreLiveOwner: function(post_raw, owner_id, hash, btn) {
        ajax.post('al_feed.php?act=a_unignore_live_owner', {
            post_raw: post_raw,
            owner_id: owner_id,
            hash: hash
        }, {
            onDone: function(html) {
                val('post' + post_raw, cur.feedEntriesHTML[post_raw + '_ignored']);
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    unsubscribe: function(post_raw, hash, btn) {
        triggerEvent(ge('post_delete' + post_raw), 'mouseout');
        cur.feedEntriesHTML[post_raw] = ge('post' + post_raw).innerHTML;
        var matches = post_raw.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        if (!matches) return;
        ajax.post('al_feed.php', {
            act: 'unsubscribe',
            type: {
                '': 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[matches[2]],
            owner_id: matches[1],
            place_id: matches[3],
            hash: hash,
            feed: 1
        }, {
            onDone: function(html) {
                ge('post' + post_raw).innerHTML = html.replace('%post_raw%', post_raw);
            },
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    subscribe: function(post_raw, hash, btn) {
        var matches = post_raw.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        if (!matches) return;
        ajax.post('al_feed.php', {
            act: 'subscribe',
            type: {
                '': 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[matches[2]],
            owner_id: matches[1],
            place_id: matches[3],
            hash: hash,
            feed: 1
        }, {
            onDone: feed.restorePost.pbind(post_raw),
            showProgress: btn && lockButton.pbind(btn),
            hideProgress: btn && unlockButton.pbind(btn)
        });
    },
    restorePost: function(post_raw) {
        ge('post' + post_raw).innerHTML = cur.feedEntriesHTML[post_raw];
        var ph_back = geByClass1('input_back', ge('post' + post_raw), 'div');
        var ta = geByTag1('textarea', ge('post' + post_raw));
        if (!ta) return;
        ta.placeholder = ph_back.innerHTML;
        ph_back.parentNode.removeChild(ph_back);
        placeholderSetup(ta);
    },
    toggleReposts: function(btn, place, rand, e) {
        if (checkEvent(e)) return true;

        var lnk = ge('feed_reposts_more' + place + '_' + rand),
            cont = ge('feed_reposts' + place + '_' + rand),
            h = 0,
            st = scrollGetY(),
            vis = isVisible(cont);
        if (!cont) {
            lnk && re(lnk.parentNode.parentNode);
            return;
        }

        if (vis) {
            h -= cont.offsetHeight + intval(getStyle(btn, 'marginTop'));
        } else {
            (domPN(domPN(cont)) || {}).bits = 0;
        }
        toggle(cont, !vis);
        val(lnk, !vis ? getLang('news_hide_reposts') : getLang('news_show_X_reposts', cont.childNodes.length));
        if (h) {
            scrollToY(st + h + getSize('page_header')[1], 0);
        }
        return false;
    },

    editHidden: function() {
        showTabbedBox('al_settings.php', {
            act: 'a_edit_owners_list',
            list: 'feed',
            height: lastWindowHeight
        }, {
            stat: ['ui_controls.js', 'ui_controls.css', 'indexer.js']
        });
        cur.onOListSave = feed.onHiddenSave;
        return false;
    },
    onHiddenSave: function(white, black, list, options) {
        var box = curBox(),
            params = {
                act: 'a_ignore_olist',
                no_reposts: ge('feed_list_reposts') && !isChecked('feed_list_reposts') ? 1 : 0,
                hash: options.hash
            };
        if (white.length < black.length) {
            params.White = white.join(',');
        } else {
            params.Black = black.join(',');
        }
        ajax.post('al_feed.php', params, {
            onDone: function(control, rules) {
                box.hide();
                feed.switchSection(cur.section == 'photos' ? 'photos' : 'news');
            },
            showProgress: lockButton.pbind(box.btns.ok[0]),
            hideProgress: unlockButton.pbind(box.btns.ok[0])
        });
        return false;
    },

    addList: function() {
        return feed.editList(-1);
    },
    editList: function(list_id) {
        feed.toggleTabsMenu(false, 0);
        showTabbedBox('al_settings.php', {
            act: 'a_edit_owners_list',
            list: 'feed',
            list_id: list_id,
            height: lastWindowHeight
        }, {
            stat: ['ui_controls.js', 'ui_controls.css', 'indexer.js'],
            onFail: function(text) {
                setTimeout(showFastBox({
                    title: getLang('global_error'),
                    bodyStyle: 'padding: 20px; line-height: 160%;'
                }, text, getLang('global_close')).hide, 4500);
                return true;
            }
        });
        cur.onOListSave = feed.onListSave.pbind(list_id);
        return false;
    },
    onListSave: function(list_id, white, black, list, options) {
        var listName = val('feed_list_name');
        if (!trim(listName)) {
            notaBene('feed_list_name');
            return false;
        }
        if (!white.length) {
            return false;
        }
        var box = curBox();
        ajax.post('al_feed.php', {
            act: 'a_save_list',
            hash: cur.tabs_hash,
            White: white.join(','),
            title: listName,
            list_id: list_id,
            no_reposts: ge('feed_list_reposts') && !isChecked('feed_list_reposts') ? 1 : 0
        }, {
            onDone: function(new_list_id) {
                var listTab = geByClass1('feed_section_list' + list_id, cur.feedEls.rmenu),
                    filterTab = geByClass1('feed_filter_list' + list_id, cur.feedEls.rmenu);
                val(listTab, clean(listName));
                val(geByClass1('ui_actions_menu_item_label', filterTab), clean(listName));
                box.hide();
                if (list_id > 0) {
                    feed.switchList(list_id);
                } else {
                    nav.go({
                        '0': 'feed',
                        section: 'list',
                        list: new_list_id
                    }, null, {
                        nocur: true
                    });
                }
            },
            onFail: function(msg) {
                val('feed_list_error', msg);
                show('feed_list_error_wrap');
                return true;
            },
            showProgress: lockButton.pbind(box.btns.ok[0]),
            hideProgress: unlockButton.pbind(box.btns.ok[0])
        });
        return false;
    },
    deleteList: function(list_id, list_name, force, ev) {
        ev && cancelEvent(ev);
        if (list_id <= 0) {
            return false;
        }

        if (!force) {
            feed.toggleTabsMenu(false, 0);
            var box = showFastBox({
                title: getLang('news_delete_list_sure_title'),
                bodyStyle: 'padding: 20px; line-height: 160%;'
            }, getLang('news_delete_list_sure').replace('{list}', list_name), getLang('global_delete'), function() {
                feed.deleteList(list_id, list_name, true);
            }, getLang('global_cancel'), function() {
                box.hide();
            });
            return;
        }
        var box = curBox();
        ajax.post('al_feed.php', extend({
            act: 'a_delete_list',
            list_id: list_id,
            hash: cur.tabs_hash
        }), {
            onDone: function() {
                re(geByClass1('feed_section_list' + list_id, cur.feedEls.rmenu));
                re(geByClass1('feed_filter_list' + list_id, cur.feedEls.rmenu));
                boxQueue.hideAll();
                if (cur.section == 'list' && cur.list == list_id) {
                    feed.switchSection('news');
                }
            },
            showProgress: lockButton.pbind(box.btns.ok[0]),
            hideProgress: unlockButton.pbind(box.btns.ok[0])
        });
    },

    saveTabs: function() {
        ajax.post('al_feed.php', {
            act: 'a_save_tabs',
            hash: cur.tabs_hash,
            tabs: cur.my_feed_types.tabs.join(',')
        }, {
            hideProgress: function() {
                isFunction(cur.onSaveTabs) && cur.onSaveTabs();
                cur.onSaveTabs = null;
            }
        });
    },

    statsShow: function(e, opts) {
        return showWiki({
            w: 'stats' + (cur.source || '')
        }, false, e);
    },

    editLiveBlacklist: function(event) {
        cancelEvent(event);

        showBox('al_video.php?act=live_blacklist_box', {}, {
            onDone: function(box, data) {
                VideoLiveBlacklistBox.init(box, data);
            },
            stat: ['videoview.js', 'videoview.css', 'indexer.js']
        });
    },

    // scrollTop check
    scrollCheck: debounce(function(params) {
        params = params || {};

        if (params.type != 'scroll' && (!cur.idleManager || cur.idleManager.isIdle)) return;

        var longView = feed.longView;
        var ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
            st = scrollGetY(),
            top, ntop = 0,
            bTop, seenLine, el, nel, bits, posts = [];

        if (!cur.isFeedLoading && !cur.disableAutoMore) {
            el = ge('show_more_link');

            if (isVisible(el) && st + ch + 1000 > el.offsetTop) {
                feed.showMore();
            }
        }

        if (
            domPN(cur.topRow) != cur.rowsCont ||
            (cur.topRow || {}).id == 'feed_rows_next'
        ) {
            cur.topRow = domFC(cur.rowsCont);
        }

        if (!vk.id ||
            !cur.topRow ||
            cur.topRow.id == 'feed_rows_next' ||
            (((window.curNotifier || {}).idle_manager || {}).is_idle && params.type != 'init')
        ) {
            return;
        }
        var postsUnseen = [];
        for (el = domPS(cur.topRow); el; el = domPS(el)) {
            if (cur.topRow.offsetTop > st) cur.topRow = el;
            if (!el.unseen) {
                el.unseen = true;
                postsUnseen.push(Feed.postsGetRaws(el));
            }
        }
        Page.postsUnseen(postsUnseen);
        for (el = cur.topRow; el; el = nel) {
            top = ntop ? ntop : el.offsetTop;
            if (top >= st + ch) break;

            nel = domNS(el);
            if ((nel || {}).id == 'feed_rows_next') nel = null;

            ntop = nel ? nel.offsetTop : top + el.offsetHeight;
            if (ntop < st && nel) cur.topRow = nel;
            LongView && LongView.register(el, 'feed');
            if (longView.registerElement(el)) continue;

            bits = el.bits || 0;
            if (bits >= 3) continue;

            // Seen if user saw more than X of content
            if (cur.feedSeenPostHeight > 0) {
                cur.feedPostHeaderHeight = cur.feedPostHeaderHeight || getH(geByClass1('post_header', el));
                bTop = top + cur.feedPostHeaderHeight;
                seenLine = bTop + cur.feedSeenPostHeight;

                if (!el.postBottom) {
                    el.postBottom = bTop + getH(geByClass1('wall_text', el));
                }

                seenLine = Math.min(seenLine, el.postBottom);

                bits |= ((bTop >= st && bTop < st + ch) ? 1 : 0) | ((seenLine >= st && seenLine < st + ch) ? 2 : 0);

                // Seen if user saw full post block
            } else {
                bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0);
            }

            if (bits) {
                el.bits = bits;
                if (bits == 3) {
                    var postRaws = feed.postsGetRaws(el);

                    posts.push(postRaws);

                    if (hasClass(el, 'feed_to_recomm')) {
                        statlogsValueEvent('promo_button_view_blocks', postRaws.index, postRaws.module);
                    } else if (geByClass1('feed_friends_recomm', el)) {
                        var gallery = geByClass1('ui_gallery', el);
                        var blockType = domData(gallery, 'from');

                        Wall.friendsRecommLogSave(['view_block', blockType, postRaws.index, vkNow(), postRaws.module], true);

                        uiGetGallery(gallery).getVisibleItems().forEach(function(item) {
                            Feed.onViewFriendRecomm(item[0], item[1], blockType);
                        });

                        gallery.visible = true;
                    }
                }
            }
        }
        posts = posts.concat(longView.process(st, ch));
        LongView && LongView.onScroll(st, ch);
        Page.postsSeen(posts);

        // Check how many times user see load button
        var moreBtn = ge('show_more_link');
        var moreTop = moreBtn.offsetTop;

        if (!moreBtn.seen && moreTop >= st && moreTop < st + ch) {
            moreBtn.seen = Date.now();
            var ref = cur.section + (cur.subsection ? '_' + cur.subsection : '');
            statlogsValueEvent('feed_load_more_seen', isButtonLocked(moreBtn), ref);
        }
    }, 20),

    postsGetRaws: function(el) {
        var index = indexOf(domPN(el).children, el);
        var f = domFC(el);
        var r = /^post(-?\d+_\d+)$/;
        var res = {};
        var c, m, p;
        if (!f) return res;

        if (f.id === 'ads_feed_placeholder') {
            return res;
        }

        res.module = cur.module;
        res.index = index;
        if (cur.module == 'feed') {
            if (cur.section == 'search') {
                res.module = 'feed_search';
                res.q = cur.q;
            } else if (cur.section == 'news') {
                res.module = cur.subsection ? 'feed_news_' + cur.subsection : 'feed_news';
            } else if (cur.section == 'recommended') {
                res.module = cur.subsection ? 'feed_recommended_' + cur.subsection : 'feed_recommended';
            } else if (cur.section == 'friends') {
                res.module = cur.subsection ? 'feed_friends_' + cur.subsection : 'feed_friends';
            } else if (cur.section == 'groups') {
                res.module = cur.subsection ? 'feed_groups_' + cur.subsection : 'feed_groups';
            } else if (cur.section == 'videos') {
                res.module = cur.subsection ? 'feed_videos_' + cur.subsection : 'feed_videos';
            } else if (cur.section == 'photos') {
                res.module = cur.subsection ? 'feed_photos_' + cur.subsection : 'feed_photos';
            } else if (cur.section == 'podcasts') {
                res.module = cur.subsection ? 'feed_podcasts_' + cur.subsection : 'feed_podcasts';
            } else if (cur.section == 'list') {
                res.module = cur.subsection ? 'feed_list_' + cur.subsection : 'feed_list';
            } else {
                res.module = 'feed_other';
            }
        }

        var dataAdView = f.getAttribute('data-ad-view');
        if (dataAdView) {
            res['ad_' + dataAdView] = 1;
        }

        var postViewHash = f.getAttribute('post_view_hash');
        if (postViewHash) {
            res['hash'] = postViewHash;
        }

        if (f.id.substr(0, 6) === 'block_') {
            res[f.id] = 1;
            res['block'] = f.id.substr(6);
            var contain = attr(f, 'data-contain');
            if (contain) {
                contain = contain.split(',');
                contain.forEach(function(v) {
                    v = v.split(':');
                    res[v[0]] = intval(v[1]) || 1;
                });
            }
        } else if (m = f.id.match(r)) {
            res[m[1]] = 1;
        } else if (m = f.id.match(/^post(adsite.*)$/)) {
            res[m[1]] = 1;
        } else {
            c = f.className;
            if (m = c.match(/feed_reposts_wrap(-?\d+_\d+)/)) {
                p = domFC(f);
                if (hasClass(domFC(p), 'post_copy')) {
                    res[m[1]] = -1;
                }
                if (m = domFC(p).id.match(r)) {
                    res[m[1]] = 1;
                }
                if (isVisible(p = domNS(p))) {
                    for (p = domFC(p); p; p = domNS(p)) {
                        if (m = p.id.match(r)) {
                            res[m[1]] = 1;
                        }
                    }
                }
            } else if (m = c.match(/feed_repost(-?\d+_\d+)/)) {
                p = domFC(f);
                if (hasClass(p, 'post_copy')) {
                    res[m[1]] = -1;
                }
                if (m = p.id.match(r)) {
                    res[m[1]] = 1;
                }
            } else {
                var post_id = f.id;
                if (hasClass(f, 'post_photos')) {
                    p = geByClass1('post_image', f, 'a');
                    if (p) {
                        p = domFC(p);
                        if (p && (m = p.getAttribute('data-post-id').match(/^(-?\d+_p?\d+)$/))) {
                            post_id = m[1];
                        }
                    }
                }
                res[post_id] = 1;
            }
        }
        return res;
    },

    searchUpdate: function() {
        if (cur.feedEls.search && getLang('news_search')) {
            var ph;
            if (!cur.section.indexOf('photos')) {
                ph = getLang('news_photo_search')
            } else if (!cur.section.indexOf('articles')) {
                ph = getLang('news_articles_search');
            } else {
                ph = getLang('news_search');
            }
            cur.feedEls.search.setAttribute('placeholder', clean(unclean(ph)));
            placeholderInit(cur.feedEls.search, {
                reload: true
            });
        }
    },

    go: function(params, onBeforeReplace, noscroll) {
        params = params || {};
        if (cur._back_local) {
            var hist = cur._back_local;
            if (hist.back) {
                showBackLink(hist.back[0], hist.back[1], hist.back[2]);
            } else {
                showBackLink(false);
            }
            cur._back_local = false;
        }
        if (cur.feedReq) {
            try {
                cur.feedReq.abort();
            } catch (e) {
                debugLog(e);
            }
        }
        cur.feedReqObj = null;
        var frame = 1,
            hideProgress = function() {
                cur.isFeedLoading = false;
            };
        if (browser.msie || noscroll) {
            frame = false;
            hideProgress = cur.onFrameBlocksDone;
        }
        cur.wasScroll = noscroll ? scrollGetY() : false;

        // track post clicks on hashtag links
        var eventTarget = window.event && window.event.target;
        if (eventTarget && params.section === 'search' && !params._post) {
            var postParams = nav.getPostParams(eventTarget);
            if (postParams.post_id && postParams.post_click_type) {
                function setPostParam(val, name) {
                    if (!val || params[name]) {
                        return;
                    }
                    params[name] = val;
                }
                setPostParam(postParams.post_id, '_post');
                setPostParam(postParams.post_click_type, '_post_click_type');
                setPostParam(postParams.post_click_url, '_post_click_url');
                setPostParam(postParams.post_click_mention_id, '_post_click_mention_id');
                setPostParam(postParams.post_click_cc_key, '_post_click_cc_key');
                setPostParam(postParams.ad_data, '_post_ad_data');
                setPostParam(postParams.ad_block_unique_id, '_post_ad_block_unique_id');
            }
        }

        var feedReqObj = cur.feedReqObj = {}; // identification object for current request

        var loadedPostsCheckerElements = {};
        var loadedPostsCheckerInterval = 100;
        var loadedPostsCheckerIterationsCnt = 0;
        var loadedPostsCheckerIterationsMax = 500;

        var loadedPostsChecker = function() {
            if (!cur.feedReqObj || cur.feedReqObj !== feedReqObj) {
                // new or aborted request
                return;
            }
            if (++loadedPostsCheckerIterationsCnt > loadedPostsCheckerIterationsMax) {
                return;
            }

            var isDone = true;
            var leftElements = {};
            each(loadedPostsCheckerElements, function(elId) {
                var el = ge(elId);
                if (!el || !hasClass(el, 'feed_row')) {
                    return;
                }
                if (!el.firstChild) {
                    // still not loaded frame
                    leftElements[elId] = true;
                    isDone = false;
                    return;
                }
                Feed.onPostLoaded(el, true);
            });

            if (isDone) {
                return;
            }

            loadedPostsCheckerElements = leftElements;
            setTimeout(loadedPostsChecker, loadedPostsCheckerInterval);
        };

        var ts = +new Date();
        cur.feedReq = ajax.post('al_feed.php', extend(params, {
            part: 1
        }), {
            onDone: function(options, rows, js, app_widget_html, app_widget_js) {
                revertLastInlineVideo();
                removeClass(cur.feedEls.wrap, 'feed_has_new');
                cur.newPostsCount = 0;
                if (window.tooltips) tooltips.destroyAll(ge('feed_rows'));
                boxQueue.hideAll();
                if (layers.fullhide && !cur.storyLayer) layers.fullhide(true);

                if (frame) {
                    ajax._framenext();
                }
                if (window.wall) wall.cancelEdit();
                boxQueue.hideAll();
                if (onBeforeReplace) {
                    onBeforeReplace(rows || '');
                } else {
                    val(cur.rowsCont, rows || '');
                }
                feed.applyOptions(options, 2);

                if (!params.norecom && params.section !== 'notifications') {
                    val('feed_recommends', options.recommends || '');
                    toggle('feed_recommends', !!options.recommends);

                    var str = '/al_feed.php#' + ajx2q({
                        act: 'recom'
                    });
                    if (ajaxCache[str]) delete(ajaxCache[str]);
                    cur.recomPreload = false;
                    toggleClass(cur.feedEls.wrap, 'feed_asc_shown', geByClass1('feed_asc_block', 'feed_recommends'));
                }
                js && eval(js);
                checkPageBlocks();
                scrollToTop(0);

                shortCurrency();
                if (cur.feedEls.wall) {
                    var wallClass = 'clear_fix';
                    switch (cur.section) {
                        case 'updates':
                            wallClass += ' page_block feed_updates';
                            break;
                        case 'photos_search':
                            wallClass += ' page_block feed_found_photos';
                            break;
                        case 'notifications':
                            wallClass += ' page_block feed_notifications';
                            break;
                    }
                }
                ge('feed_wall').className = wallClass;
                toggle('feed_recommends', inArray(cur.section, ['news', 'recommended', 'videos']));

                val('feed_app_widget', app_widget_html || '');
                toggle('feed_app_widget', app_widget_html);
                app_widget_html && app_widget_js && eval(app_widget_js);

                if (cur.rowsCont && cur.rowsCont.children) {
                    each(cur.rowsCont.children, function() {
                        var el = this;
                        if (!hasClass(el, 'feed_row')) {
                            return;
                        }
                        if (el.id && !el.firstChild) {
                            // not loaded frame yet
                            loadedPostsCheckerElements[el.id] = true;
                            return;
                        }
                        Feed.onPostLoaded(el, true);
                    });
                    if (!isEmpty(loadedPostsCheckerElements)) {
                        setTimeout(loadedPostsChecker, 10);
                    }
                }

                if (params['c[q]']) {
                    saveSearchAttemptStats(cur.section === 'photos_search' ? 'photos' : 'news', ts, cur.count);
                }
                setTimeout(feed.scrollCheck, 200);
            },
            onFail: function() {
                return false;
            },
            showProgress: function() {
                cur.isFeedLoading = true;
            },
            frame: frame,
            ads: 1,
            hideProgress: hideProgress
        });
    },

    onFeedSearch: function(searchEl, q, ev, section) {
        var curSection = section || cur.section,
            newSection, baseSection;
        if (!curSection.indexOf('photos')) {
            newSection = 'photos_search';
            baseSection = 'photos';
        } else if (!curSection.indexOf('articles')) {
            newSection = 'articles_search';
            baseSection = 'articles';
        } else {
            newSection = 'search';
            baseSection = 'news';
        }
        if (newSection == 'search' || feed.hasSearchParams(feed.getSectionParams(newSection))) {
            if (newSection != cur.section) {
                feed.setSection(newSection, 1);
            }
            var feedGoParams = feed.getSectionParams(newSection);
            if (cur.disableSort) {
                feedGoParams['disable_sort'] = 1;
            }
            feed.go(feedGoParams);
            if (window.searcher) {
                searcher.highlightHotHashtag(q || val(searchEl));
            }
        } else {
            feed.go(feed.getSectionParams(baseSection));
        }
        uiSearch.onChanged(searchEl);
        uiSearch.showProgress(searchEl);
    },

    onSearchChange: function() {
        setTimeout(feed.onFeedSearch.pbind(cur.feedEls.search), 0);
        return false;
    },

    init: function(options) {
        setTimeout(function() {
            each(geByTag('textarea', cur.rowsCont), function() {
                placeholderSetup(this);
            });
            if (cur.q) {
                saveSearchAttemptStats(cur.section === 'photos_search' ? 'photos' : 'news', 0, cur.count);
            }
        }, 200);

        extend(cur, {
            oid: options.user_id,
            postTo: options.user_id,
            phCache: {},
            phShown: {},
            subsections: {},
            feed_session_id: options.feed_session_id || 'na',
            module: 'feed',
            isFeedLoading: false,
            customSearchChange: feed.onSearchChange,
            wallPostCb: function() {
                if (cur.section == 'news') {
                    setTimeout(feed.update.pbind(1), 1000);
                } else {
                    setTimeout(feed.switchSection.pbind('news'), 1000);
                }
            },
            // Decomment
            // disableAutoMore: true,

            idleManager: (function() {
                var setIdleTo, checkIdleCb, checkIdleCbTo, onActive, onInActive, onFocusBlur, params = {
                    isIdle: false,
                    onIdle: null,
                    onUnIdle: null,
                    stop: function() {
                        removeEvent(document, 'mousemove keydown', onActive);
                        removeEvent(window, 'focus blur', onFocusBlur);
                    },
                    start: function() {
                        if (browser.mobile) return;
                        onActive = function() {
                            if (!cur.idleManager) return;
                            if (params.isIdle) {
                                params.isIdle = false;
                                if (params.onUnIdle) params.onUnIdle();
                            }
                        };
                        onInActive = function() {
                            if (!cur.idleManager) return;
                            params.isIdle = true;
                            if (params.onIdle) params.onIdle();
                        };
                        onFocusBlur = function(e) {
                            if (e.type == 'focus') {
                                onActive();
                            } else {
                                onInActive();
                            }
                        };
                        addEvent(window, 'focus blur', onFocusBlur);
                    }
                };
                return params;
            }()),

            currentModule: function() {
                if (cur.section == 'videos') {
                    return 'feed_videos';
                }
                return cur.module;
            },

            onFrameBlocksDone: function() {
                // uiRightMenu.hideProgress(cur.feedEls.rmenu);
                cur.isFeedLoading = false;
                if (cur.wasScroll === 0 || cur.wasScroll > 0 || (cur.wasScroll === false && cur.section == 'search' && cur.q && cur.q.substr(0, 1) == '#')) {
                    // scrollToY(st, 0);
                    cur.wasScroll = false;
                }
            },

            // Cached entries' HTML
            feedEntriesHTML: {},
            feedUnreadCount: 0,
            feedInitialTitle: '',
            feedUnread: [],
            feedToSort: [],
            feedEls: {
                wrap: ge('main_feed'),
                wall: ge('feed_wall'),
                search: ge('search_query'),
                rmenu: ge('feed_rmenu'),
                newPosts: ge('feed_new_posts')
            }
        });

        cur.nav.push(function(changed, old, n, opts) {
            if (changed[0] !== undefined) return;
            var params = clone(n);
            delete(params[0]);
            if (changed.section !== undefined) {
                if (inArray(cur.section, ['notifications', 'replies']) != inArray(changed.section, ['notifications', 'replies'])) {
                    return;
                }
            }
            if (cur.section == 'notifications') {
                feed.switchNotifyList(n.list || 'all', extend(params, opts.params || {}));
                return false;
            }
            if (changed.list) {
                feed.switchList(changed.list);
                return false;
            }
            if (changed.section !== undefined) {
                feed.switchSection(changed.section || 'news', false, true);
            }
            if (changed.notify) {
                return false;
            }
            if (changed.q) {
                val(cur.feedEls.search, changed.q);
                feed.onFeedSearch(cur.feedEls.search);
                return false;
            }
            delete changed.subsection;
            if (isEmpty(changed)) {
                var menuEl = geByClass1('feed_section_' + (old.section || 'news') + (old.list || ''));
                menuEl && uiRightMenu.go(menuEl, false, false);
            }

            if (cur.likesTabTT) {
                cur.likesTabTT.destroy()
            }

            feed.go(extend(params, opts.params || {}));
            return false;
        });
        cur.idleManager.onUnIdle = feed.updateTitle;
        cur.idleManager.onIdle = feed.reSortItems;

        cur.options = cur.options || {};
        extend(cur.options, options);
        feed.applyOptions(options, 3);

        // Extrnal static requred
        // page.js
        cur.rowsCont = options.wallCont = ge('feed_rows');
        wall.init(options);

        if (cur.rowsCont && cur.rowsCont.children) {
            each(cur.rowsCont.children, function() {
                var el = this;
                if (!hasClass(el, 'feed_row') || !el.firstChild) {
                    return;
                }
                Feed.onPostLoaded(el, true);
            });
        }

        cur._back = {
            text: getLang('news_return_to_news'),
            show: [feed.startEvents],
            hide: [function() {
                clearInterval(cur.updateInt);
                removeEvent(window, 'scroll', feed.scrollCheck);
                removeEvent(window, 'resize', feed.scrollCheck);
                cur.idleManager.stop();
                clearTimeout(cur.lp_error_to);
            }],
            loc: false
        };
        feed.startEvents();

        if (options.article_feature_tooltip) {
            setTimeout(function() {
                Feed.initArticleFeatureTooltip(options.article_feature_tooltip_hash)
            }, 800)
        }

        Wall.friendsRecommLogSend(true);

        setTimeout(function() {
            feed.scrollCheck({
                type: 'init'
            });
        }, 200);
    },
    startEvents: function() {
        // IDLE manager
        cur.idleManager.start();

        // Feed update interval
        cur.updateInt = setInterval(function() {
            feed.update(0);
        }, 20000);

        // Scroll check routine for auto preload next news
        addEvent(window, 'scroll', feed.scrollCheck);
        addEvent(window, 'resize', feed.scrollCheck);
    },
    mentionClick: function(el, ev) {
        var origEl = el,
            post = ((el.getAttribute('mention') || '').match(/^bp(-?\d+_\d+)$/) || {})[1];
        if (!post) return nav.go(el, ev);

        post = post.split('_');
        for (; el; el = el.parentNode) {
            var m = (el.id || '').match(/^replies(-?\d+_topic\d+)$/);
            if (m) {
                var topic = m[1].split('_');
                if (topic[0] == post[0]) {
                    return wall.showReply(origEl, m[1], post[0] + 'topic_' + post[1], ev);
                } else {
                    break;
                }
            }
        }
        return nav.go(el, ev);
    },

    toggleCustomFeedTab: function(el, section) {
        if (hasClass(el, 'feed_tab_link_hidden')) {
            removeClass(el, 'feed_tab_link_hidden');
            setCookie('remixcustom_feed_added', section);
        } else {
            lockButton(el);
        }

        return feed.checkTabsFilter(geByClass1('_feed_custom_' + section), section);
    },
    recomPreload: function() {
        if (cur.recomPreload) return;
        cur.recomPreload = true;
        ajax.post('/al_feed.php', {
            act: 'recom',
            section: cur.section
        }, {
            cache: 1
        });
    },
    recomMore: function(ev) {
        if (checkEvent(ev) !== false) return;
        var cont = ge('feed_recom_rows'),
            lnk = ge('feed_recom_more');
        if (cont.childNodes.length > 2) {
            var old = getSize(cont)[1];
            while (cont.childNodes.length > 2) {
                cont.removeChild(cont.lastChild);
            }
            scrollToY(0, 0);
            hide(lnk.firstChild.nextSibling);
            show(lnk.firstChild);
            return cancelEvent(ev);
        }

        ajax.post('/al_feed.php', {
            act: 'recom',
            section: cur.section
        }, {
            cache: 1,
            onDone: function(rows) {
                hide(lnk.firstChild);
                show(lnk.firstChild.nextSibling);
                var e = ce('div', {
                        innerHTML: rows
                    }),
                    c = ge('feed_recom_rows'),
                    el;
                while (el = e.firstChild) {
                    if (ge(el.id)) {
                        re(el);
                    } else {
                        c.appendChild(el);
                    }
                }
                if (c.childNodes.length % 2) re(c.lastChild);
            },
            showProgress: function() {
                hide(lnk.firstChild);
                show(lnk.lastChild);
            },
            hideProgress: function() {
                show(lnk.firstChild);
                hide(lnk.lastChild);
            }
        });
        return cancelEvent(ev);
    },
    recomSubscribe: function(oid, btn, sub) {
        var address, params,
            subBtn = sub ? btn : domPS(btn),
            unsubBtn = sub ? domNS(btn) : btn;
        if (sub) {
            address = '/al_feed.php';
            params = {
                act: 'subscr',
                oid: oid,
                from: nav.objLoc.section,
                hash: val('feed_recom_hash')
            };
        } else {
            address = '/al_fans.php';
            params = {
                act: 'unsub',
                oid: oid,
                hash: val('feed_recom_hash'),
                no_response: 1
            };
        }
        ajax.post(address, params, {
            onDone: function() {
                toggle(subBtn, !sub);
                toggle(unsubBtn, !!sub);
                if (nav.objLoc.section != 'recommended') {
                    nav.go(nav.objLoc, false, {
                        params: {
                            norecom: 1
                        }
                    });
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    infoTopFeedNotification: function(hash) {
        Feed.hideTopFeedNotification(hash, false);
        setTimeout(function() {
            hide('top_feed_notification');
        }, 2500);
        nav.go('/feed?w=smartfeed');
    },
    hideTopFeedNotification: function(hash, now) {
        ajax.post('al_feed.php', {
            act: 'hide_top_feed_notification',
            hash: hash,
            hide: (now ? 1 : 0)
        });
        if (now) {
            hide('top_feed_notification');
        }
    },
    hide10YearsBlock: function(hash) {
        re('feed_vk10_years');
        ajax.post('al_feed.php', {
            act: 'hide_vk10_years',
            hash: hash,
        });
    },
    clickBlog: function(el, nid, url, hash) {
        ajax.post('blog.php', {
            act: 'hide_reminder',
            hash: hash,
            nid: nid,
            accept: 1
        }, {
            onDone: function() {}
        });
        if (!attr(el, 'target') === '_blank') {
            cancelEvent(e);
            return nav.go(url);
        }
    },
    hideBlogReminder: function(hash, nid, e) {
        if (e) {
            cancelEvent(e);
        }
        re('feed_blog_reminder');

        ajax.post('blog.php', {
            act: 'hide_reminder',
            hash: hash,
            nid: nid,
            accept: 0
        }, {
            onDone: function() {}
        });
    },
    preloadVideos: function(videos) {
        if (!videos || !cur.videoAutoplayScrollHandler) return;

        cur.videoAutoplayPreloaded = cur.videoAutoplayPreloaded || {};

        each(videos, function(i, data) {
            req(data.index_url);
            req(data.index_url.replace(/index-(.+).m3u8/, 'seg-1-$1.ts'));
            cur.videoAutoplayPreloaded[data.video] = data.quality;
        });

        function req(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
        }
    },
    expandJoinedGroups: function(el, e) {
        cancelEvent(e);

        show(geByClass1('feed_groups_hidden_list', el.parentNode));
        re(el);
        return false;
    },
    showAllFilters: function(el) {
        re(el);
        var els = geByClass('hide', el.parentNode);
        for (var i = 0; i < els.length; i++) {
            removeClass(els[i], 'hide');
        }
    },
    toggleSubscription: function(el, hash, ev, oid, source) {
        var wrap = domClosest('_ui_menu_wrap', el);

        wrap && uiActionsMenu.toggle(wrap, !hasClass(wrap, 'shown'));

        Page.toggleSubscription(el, hash, ev, oid, source, function(text, act) {
            geByClass('post', cur.rowsCont).forEach(function(post) {
                var idParts = post.id.split('_');
                var postOid = +idParts[idParts.length - 2].replace('post', '');

                if (oid !== postOid) {
                    return;
                }

                var btn = geByClass1('page_action_subscribe', post);

                val(btn, text);
                domData(btn, 'act', act);
            });
        });
    },
    logBlockInteraction: function(el, name, action) {
        var index = indexOf(domPN(el).children, el);
        statlogsValueEvent('block_interaction', index, name, action);
    },

    initArticleFeatureTooltip: function(hash) {
        var submitPostboxEl = geByClass1('_submit_post_box')
        var articleButtonEl = geByClass1('ms_item_article')

        if (!articleButtonEl || !isVisible(articleButtonEl) || hasClass(submitPostboxEl, 'shown')) {
            return
        }

        var closeSent = false

        function sendCloseEvent() {
            if (closeSent) {
                return
            }

            closeSent = true

            ajax.post('al_index.php', {
                act: 'hide_feature_tt',
                hash: hash,
                type: 'articles_web',
            })
        }

        var contentEl = '<div class="article_feat_tt">'
        contentEl += '<div class="feature_tooltip__close"></div>'
        contentEl += '<div class="article_feat_tt__text">' + getLang('wall_article_feature_text') + '</div>'
        contentEl += '</div>'

        contentEl = se(contentEl)

        cur.articleFeatureTT = new ElementTooltip(articleButtonEl, {
            content: contentEl,
            forceSide: 'bottom',
            customShow: true,
            cls: 'feature_intro_tt feature_info_tooltip articles_feature_tooltip',
            autoShow: false,
            noHideOnClick: true,
            noAutoHideOnWindowClick: true,
            appendTo: submitPostboxEl,
            centerShift: -120,
            offset: [6, -3],
            onShow: function() {
                addClass(articleButtonEl, 'ms_item_article_highlight')
            },
            onHide: function() {
                removeClass(articleButtonEl, 'ms_item_article_highlight')
            },
        })

        cur.articleFeatureTT.show()

        addEvent(geByClass1('feature_tooltip__close', contentEl), 'click', function(event) {
            cur.articleFeatureTT.hide()
            sendCloseEvent()
            return cancelEvent(event)
        })

        var autoCloseTO = setTimeout(function() {
            sendCloseEvent()
        }, 3000)

        cur.destroy.push(function() {
            clearTimeout(autoCloseTO)
        })

        cur.onShowEditPost = function() {
            cur.articleFeatureTT.hide()
            sendCloseEvent()
        }
    },

    showHotTooltip: function(hash) {
        var hot = geByClass1('hot');

        if (hot) {
            cur.hotFeatureTT = new ElementTooltip(hot, {
                content: '<div class="feature_tooltip__close" onclick="cur.hotFeatureTT.hide();"></div>' + getLang('wall_hot_feature_text'),
                forceSide: 'left',
                cls: 'feature_intro_tt feature_info_tooltip hot_feature_tooltip',
                autoShow: false,
                noHideOnClick: true,
                noAutoHideOnWindowClick: true,
                appendToParent: true,
                offset: [15, 0],
                onHide: function() {
                    ajax.post('al_index.php', {
                        act: 'hide_feature_tt',
                        hash: hash,
                        type: 'hot_web',
                    });
                },
            });

            cur.hotFeatureTT.show();
        }
    },

    updateTimer: function() {
        if (!TimeSpent) {
            return;
        }

        var option = [cur.section, cur.subsection].filter(Boolean).join('_');
        TimeSpent.update(option);
    },

    onPostLoaded: function(post, maybeWrappedElement) {
        var gallery = geByClass1('ui_gallery', post);

        if (gallery) {
            var blockType = domData(gallery, 'from') || 'user_rec';

            var opts = {
                scrollY: false,
                onViewItem: function(item, index) {
                    if (gallery.visible) {
                        Feed.onViewFriendRecomm(item, index, blockType);
                    }
                },
                onDestroy: function() {
                    re(post);
                }
            };

            if (cur.friends_recomm_from) {
                opts.onLoadMore = function() {
                    ajax.post('al_feed.php', {
                        act: 'a_recomm_friends_gallery',
                        from: cur.friends_recomm_from
                    }, {
                        onDone: function(html, newFrom) {
                            var items = [];

                            if (html) {
                                items = domChildren(ce('div', {
                                    innerHTML: html
                                }));
                            }

                            uiGetGallery(gallery).addMore(items, !newFrom);

                            cur.friends_recomm_from = newFrom;
                        }
                    });
                };
            }

            new UIGallery(gallery, opts);
        }

        Wall.onPostLoaded(post, maybeWrappedElement);
    },

    onViewFriendRecomm: function(item, index, blockType) {
        if (!item.viewed) {
            var mid = +domData(item, 'uid');

            Wall.friendsRecommLogSave(['show_user_rec', mid, vkNow(), index, blockType]);

            item.viewed = true;
        }
    },

    openPostSuggest: function(suggestId, postData, event) {
        function setSuggestedText() {
            if (cur.wallAddMedia) {
                cur.wallAddMedia.unchooseMedia()
            }

            postData[0] = postData[0].replace(/<br>/g, '\n')

            var prevEditing = cur.editing
            delete cur.editing

            Wall.setDraft(postData)
            Feed.closePostSuggest(suggestId, 'open', event)

            cur.editing = prevEditing
        }

        var field = ge('post_field')
        var fieldText = field ? trim(field.innerHTML).replace('<br>', '') : ''
        if (fieldText || cur.wallAddMedia && cur.wallAddMedia.attachCount()) {
            showFastBox({
                    title: getLang('news_suggest_alert_title'),
                    dark: 1
                },
                getLang('news_suggest_alert_text'),
                getLang('global_yes'),
                function() {
                    curBox().hide()
                    setSuggestedText()
                },
                getLang('global_cancel')
            )
        } else {
            setSuggestedText()
        }
    },

    closePostSuggest: function(suggestId, closeType, event) {
        ajax.post('al_feed.php', {
            act: 'close_suggestion',
            suggest_id: suggestId,
            close_type: closeType,
        });

        re(geByClass1('_post_suggest'));

        return cancelEvent(event);
    },

    hideRightBlock: function(el, blockType, hash) {
        var block = domCA(el, '.page_block');
        re(block);

        ajax.post('al_feed.php', {
            act: 'a_hide_right_block',
            block_type: blockType,
            hash: hash
        });
        return false;
    }
};
window.feed = Feed;

try {
    stManager.done('feed.js');
} catch (e) {}