var FullWall = {

    failed: function(text) {
        if (!text) return;
        setTimeout(showFastBox(getLang('global_error'), text).hide, 2000);
        return true;
    },
    go: function(el, ev) {
        return nav.go(el, ev, {
            onFail: FullWall.failed
        });
    },
    scrollCheck: function(e, st) {
        var ch = lastWindowHeight,
            top, ntop = 0,
            el, nel, bits, posts = [];
        if (domPN(cur.topRow) != cur.pgCont) {
            cur.topRow = domFC(cur.pgCont);
        }
        if (!vk.id ||
            !cur.topRow ||
            ((window.curNotifier || {}).idle_manager || {}).is_idle
        ) {
            return;
        }
        var postsUnseen = [];
        for (el = domPS(cur.topRow); el; el = domPS(el)) {
            if (cur.topRow.offsetTop > st) cur.topRow = el;
            if (!el.unseen) {
                el.unseen = true;
                postsUnseen.push(FullWall.postsGetRaws(el));
            }
        }
        Page.postsUnseen(postsUnseen);
        for (el = cur.topRow; el; el = nel) {
            top = ntop ? ntop : el.offsetTop;
            if (top >= st + ch) break;

            nel = domNS(el);

            ntop = nel ? nel.offsetTop : top + el.offsetHeight;
            if (ntop < st && nel) cur.topRow = nel;
            LongView && LongView.register(el, 'FullWall');

            bits = el.bits || 0;
            if (bits >= 3) continue;

            if (bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0)) {
                el.bits = bits;
                if (bits == 3) {
                    posts.push(FullWall.postsGetRaws(el));
                }
            }
        }
        LongView && LongView.onScroll(st, ch);
        Page.postsSeen(posts);
    },
    postsGetRaws: function(el) {
        var index = indexOf(domPN(el).children, el);
        var m, res = {};
        if (el.id.substr(0, 6) === 'block_') {
            res[el.id] = 1;
            res['block'] = el.id.substr(6);
            var contain = attr(el, 'data-contain');
            if (contain) {
                contain = contain.split(',');
                contain.forEach(function(v) {
                    v = v.split(':');
                    res[v[0]] = intval(v[1]) || 1;
                });
            }
        } else if (m = el.id.match(new RegExp('^post(' + cur.oid + '_\\d+)$', ''))) {
            res[m[1]] = 1;
            if (m = (el.getAttribute('data-copy') || '').match(/^(-?\d+_\d+)$/)) {
                res[m[1]] = -1;
            }
        }
        res.index = index;
        res.module = cur.module;

        var postViewHash = el.getAttribute('post_view_hash');
        if (postViewHash) {
            res['hash'] = postViewHash;
        }

        return res;
    },
    init: function(opts, preload) {
        extend(cur, {
            options: opts,
            module: 'wall',

            pgStart: opts.start,
            pgOffset: opts.offset,
            pgCount: opts.count,
            pgPerPage: opts.per_page,
            pgCont: ge('page_wall_posts'),
            pgMore: ge('fw_load_more'),
            pgPages: ge('fw_pages'),
            pgMorePrg: ge('fw_more_progress'),
            pgPreload: preload,
            pgUrl: opts.url,
            pgOnScroll: FullWall.scrollCheck,

            pgParams: opts.params,
            pgHref: opts.href,

            pgPostProcess: FullWall.loadedPosts,
            pgNoArrowNav: FullWall.noArrowNav,
            pgNoNavScroll: true,

            articleConvert: opts.article_convert_suggest,
            articleConvertThreshold: opts.article_convert_threshold,

            oid: opts.owner_id,
            postTo: opts.owner_id
        });
        wall.init(opts);
        if (!opts.wall_type || opts.wall_type != 'cards' && opts.wall_type != 'supp' && opts.wall_type != 'restore' && opts.wall_type != 'phone_info' && !nav.objLoc.postponed) {
            Pagination.init();
        }
        cur.destroy.push(Pagination.deinit);
        if (opts.with_id) return;

        wall.initUpdates(opts.add_queue_key);
        if (opts.wall_type && (opts.wall_type == 'cards' || opts.wall_type == 'supp' || opts.wall_type == 'restore' || opts.wall_type == 'phone_info')) return;
        cur.nav.push(function(changed, current, next) {
            var own = changed.own;
            delete(changed.own);
            delete(changed.offset);
            if (!isEmpty(changed) || own === undefined) return;
            ajax.post('al_wall.php', {
                act: 's',
                owner_id: cur.oid,
                own: next.own || undefined,
                q: next.q || undefined,
                lnav: 1,
                offset: next.offset || undefined
            }, {
                onDone: function(summary, rows, names, href, start, offset, perpage, count, preload, queue) {
                    ge('fw_summary_wrap').innerHTML = summary;
                    Pagination.deinit();
                    extend(cur, {
                        pgStart: start,
                        pgOffset: offset,
                        pgCount: count,
                        pgParams: next.own ? {
                            own: 1
                        } : false,
                        pgHref: href,
                        pgPages: ge('fw_pages'),
                        pgPreload: preload
                    });
                    toggle(cur.pgMore, (count > offset + cur.pgPerPage));
                    wall.cancelEdit();
                    var posts = ge('page_wall_posts');
                    posts.innerHTML = rows;
                    each(geByTag('textarea', posts), function() {
                        placeholderSetup(this, {
                            fast: 1
                        });
                    });
                    Pagination.init();
                    wall.initUpdates(queue);

                    cur.options.reply_names = extend({}, cur.options.reply_names);
                    for (var mid in names) {
                        cur.options.reply_names[mid] = names[mid];
                    }

                    cur.wallType = 'full_' + (next.own ? 'own' : 'all');
                    nav.setLoc(next);

                    scrollToTop();
                },
                showProgress: function() {
                    hide('fw_search_toggler');
                },
                hideProgress: function() {
                    show('fw_search_toggler');
                    window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge('narrow_column')));
                },
                onFail: FullWall.failed
            });
            return false;
        });

        if (ge('wall_search') && nav.objLoc.q) {
            saveSearchAttemptStats('wall', 0, cur.options && cur.options.count, nav.objLoc.q);
        }
    },
    loadedPosts: function(count, from, rows, offset, pages, preload, names) {
        if (preload) {
            each(geByTag('textarea', cur.pgCont), function() {
                placeholderSetup(this, {
                    fast: 1
                });
            });
            wall.cancelEdit();
        } else {
            var l = cur.pgCont.childNodes.length,
                i = 0;
            for (var el = cur.pgCont.lastChild; el && ++i <= cur.pgPerPage; el = el.previousSibling) {
                placeholderSetup(geByTag1('textarea', el), {
                    fast: 1
                });
            }
            names = offset;
        }
        cur.options.reply_names = extend({}, cur.options.reply_names);
        for (var mid in names) {
            cur.options.reply_names[mid] = names[mid];
        }
        FullWall.updateSummary(count);
    },
    updateSummary: function(count) {
        ge('fw_summary').innerHTML = count ? langNumeric(count, '%s', true) : '';
    },
    noArrowNav: function() {
        return cur.__focused || (ge('own_reply_field') || {}).focused || cur.editingPost;
    },

    initOnePost: function(opts, preload) {
        var post = opts.post_raw;
        if (opts.view_hash && !window._postsViewHash) {
            window._postsViewHash = opts.view_hash;
        }
        Page.postsSeen(opts.seen);
        extend(cur, {
            onepost: true,
            options: opts,
            module: 'wall',

            docked: false,

            pgStart: opts.start,
            pgOffset: opts.offset,
            pgCount: opts.count,
            pgPerPage: opts.per_page,
            pgCont: ge('replies' + post),
            pgMore: ge('fw_load_more'),
            pgPages: ge('fw_pages'),
            pgPreload: preload,
            pgUrl: opts.url,
            pgParams: opts.params,
            pgHref: opts.href,

            pgPostProcess: FullWall.loadedReplies,
            pgOnScroll: FullWall.onePostOnScroll,
            pgNoArrowNav: FullWall.noArrowNav,
            pgNoNavScroll: true,

            oid: opts.owner_id,
            pid: opts.post_id,
            nid: opts.note_id,
            named: {
                replies: ge('fw_one_replies_wrap')
            },

            wallUploadOpts: opts.upload,

            deepActive: hasClass(ge('post' + post), 'deep_active') && !opts.note_id,
        });
        wall.init(opts);

        if (cur.deepActive) {
            if (opts.scroll) {
                setTimeout(function() {
                    scrollToY(opts.scroll);
                }, 0);
            }

            addEvent(window, 'scroll', FullWall.onePostOnScroll);
            addEvent(window, 'resize', FullWall.onePostOnScroll);

            cur.destroy.push(function() {
                removeEvent(window, 'scroll', FullWall.onePostOnScroll);
                removeEvent(window, 'resize', FullWall.onePostOnScroll);
            });

        } else {
            Pagination.init(opts.scroll);
            cur.destroy.push(Pagination.deinit);
        }

        FullWall.onePostOnScroll();
        wall.initUpdates(opts.add_queue_key);
    },
    scrollToEnd: function() {
        var st = cur.addBlockTop + cur.addBlockHeight + 20 - lastWindowHeight;
        if (scrollGetY() < st) {
            if (cur.deepActive) {
                scrollToY(st, 0);
            } else {
                Pagination.setScroll(st);
            }
        }
    },
    onePostOnScroll: function(e, st) {
        var post = cur.options.post_raw || '',
            addBlockWrap = ge('reply_box_wrap' + post),
            addBlock = addBlockWrap && domFC(addBlockWrap);
        if (!addBlock) return;

        if (st === false || st === undefined) {
            st = scrollGetY();
        }
        cur.addBlockTop = getXY(addBlockWrap)[1];

        if (cur.deepActive) {
            var fakeField = ge('reply_fakebox' + post);

            if (fakeField) {
                cur.addBlockHeight = getSize(fakeField)[1];

                var fieldMargin = getStyle(fakeField, ['marginTop', 'marginBottom']);

                cur.addBlockHeight += intval(fieldMargin.marginTop) + intval(fieldMargin.marginBottom);

            } else {
                cur.addBlockHeight = getSize(addBlock)[1];
            }

        } else {
            cur.addBlockHeight = getSize(addBlock)[1];
        }

        var needDock = (st + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight),
            ml = needDock ? Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge('page_layout'))[0])) : null,
            bottom = Math.min(0, st + lastWindowHeight - getXY('fw_replies_header')[1] - cur.addBlockHeight);
        setStyle(addBlock, {
            marginLeft: ml,
            bottom: bottom
        });
        if (needDock) {
            if (!e || !cur.docked) {
                setStyle(addBlockWrap, 'height', cur.addBlockHeight);
            }
            if (!cur.docked) {
                setStyle(addBlock, 'width', getSize(addBlockWrap)[0]);
                addClass(addBlock, 'fixed');
                cur.docked = true;
            }
        } else if (cur.docked) {
            setStyle(addBlock, {
                width: null,
                marginLeft: null
            });
            setStyle(addBlockWrap, 'height', '');
            removeClass(addBlock, 'fixed');
            cur.docked = false;
        }

        if (cur.deepActive) {
            var replies = ge('replies' + post);
            var repliesLast = domLC(replies);
            if (repliesLast && hasClass(repliesLast, 'replies_next') && isVisible(repliesLast)) {
                var repliesNextY = getXY(repliesLast, true)[1];

                if (st + 500 > repliesNextY) {
                    repliesLast.onclick();
                }
            }
        }
    },
    onNewReplySent: function(count, rows, offset, names) {
        var postId = cur.oid + '_' + cur.pid;

        cur.wallMyReplied[postId] = 0;

        var repliesList = ge('replies' + postId);
        val(repliesList, rows);

        // update total counter
        var postEl = ge('post' + postId);

        wall.incReplyCounter(postEl, 1, count);

        if (wall.isDescRepliesOrder(postId)) {
            scrollToY(getXY(repliesList)[1] - 30);
        } else {
            setTimeout(FullWall.scrollToEnd, 0);
        }

        extend(cur.options.reply_names, names);

        nav.setLoc(extend(nav.objLoc, {
            offset: offset || null
        }));
    },
    onReplySent: function(count, from, rows, offset, pages, preload, names) {
        cur.wallMyReplied[cur.oid + '_' + cur.pid] = 0;
        Pagination.loaded.apply(window, arguments);
        setTimeout(FullWall.scrollToEnd, 0);
        if (pages && offset) {
            nav.setLoc(extend(nav.objLoc, {
                offset: offset
            }));
        }
    },
    loadedReplies: function(count, from, rows, offset, pages, preload, names) {
        if (!preload) {
            names = offset;
        }
        cur.options.reply_names = extend({}, cur.options.reply_names);
        for (var mid in names) {
            cur.options.reply_names[mid] = names[mid];
        }
        FullWall.onePostOnScroll();
        FullWall.repliesSummary(count);
    },
    repliesSummary: function(count) {
        var summary = ge('fw_summary');
        if (!summary) return;

        summary.innerHTML = count ? getLang('wall_n_replies', count) : getLang('wall_no_replies');
        show(summary.parentNode);

        Likes.update('wall' + cur.oid + '_' + cur.pid, {
            comment_num: count
        });
    },

    addTetaTet: function(repls, ev) {
        var upd = {
            own_reply_link: '',
            tet_a_tet: ''
        };
        if (ev[9] && ev[9] != ev[2].split('_')[0] && cur.wallTpl.tet_a_tet) {
            upd.tet_a_tet = cur.wallTpl.tet_a_tet.replace('%from_uid%', ev[9]);
        } else {
            upd.own_reply_link = cur.wallTpl.own_reply_link.replace('%post_id%', ev[2]);
        }
        return upd;
    },

    notePart: function(obj, obj_id) {
        hide(obj);
        show(obj_id);
    },

    doSearch: function(searchEl, q) {
        uiSearch.showProgress(searchEl);
        if (nav.objLoc[0].split('/').length > 1) {
            nav.change({
                0: 'wall' + cur.oid,
                q: q || false,
                search: !q && 1,
                offset: false
            });
        } else {
            nav.change({
                q: q || false,
                search: !q && 1,
                offset: false,
                own: false
            });
        }
    },
    calendar: function() {
        stManager.add(['ui_controls.js', 'datepicker.js', 'datepicker.css'], function() {
            if (!cur.wallDP) {
                cur.wallSD = val('wall_datesearch');
                cur.wallDP = new Datepicker(ge('wall_datesearch'), {
                    width: 140,
                    resfmt: 'plain',
                    addRows: nav.objLoc.day ? '<tr><td class="cal_clear" colspan="7"><a onclick="uiSearch.showProgress(\'wall_search\'); nav.change({day: false, offset: false, search: nav.objLoc.q ? false : 1})" id="wall_cal_clear_lnk">' + getLang('wall_clear_date_filter') + '</a></td></tr>' : '',
                    onUpdate: function() {
                        if (cur.wallSD != val('wall_datesearch')) {
                            var nd = val('wall_datesearch').split('.');
                            uiSearch.showProgress('wall_search');
                            nav.change({
                                'day': (nd[0] < 10 ? '0' : '') + nd[0] + (nd[1] < 10 ? '0' : '') + nd[1] + nd[2],
                                search: false,
                                offset: false
                            });
                        }
                    },
                    pastActive: true,
                    noFuture: true
                });
            }
            triggerEvent(geByClass1('datepicker_control', ge('wall_datesearch_cont')), 'mousedown', false, true);
        });
    }
}

try {
    stManager.done('wall.js');
} catch (e) {}