var WPost = {

    init: function(options) {
        options = options || {};
        cur.options = options;
        extend(cur, {
            oid: options.owner_id,
            post_id: options.post_id,
            heightEl: ge('wpost_post'),
            postEl: ge('wpost_post_body'),
            noAwayCheck: true,
            subscribeBtn: geByClass1('_wpost_post_subscribe') || geByClass1('_wpost_post_subscribed'),
            headerActions: geByClass1('_wpost_head_actions')
        });
        cur.subscribeInHeader = cur.subscribeBtn && cur.subscribeBtn.parentNode == cur.headerActions;

        this.override('lite.js');
        this.override('page.js');
        stManager.emitter.addListener('update', this.override.bind(this));

        cur.RpcMethods = {
            onInit: function() {
                addEvent(window, 'resize', onBodyResize);
                uiScroll.addResizeSensor(cur.heightEl, WPost.onresize)[1]();
            }
        };
        try {
            cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                safe: true
            });
        } catch (e) {
            debugLog(e);
        }
    },

    showLikesBox: function(obj, params) {
        showBox('widget_like.php', extend({
            act: 'a_stats_box',
            obj: obj,
            from: 'wpost',
            check_hash: cur.likeCheckHash,
            widget_width: 638
        }, params || {}));
    },

    onresize: function() {
        if (cur.heightEl) {
            var size = getSize(cur.heightEl);
            WPost.setSubscribePosition(size[0]);
            WPost.setBodyClass(size[0]);
            if (cur.Rpc) cur.Rpc.callMethod('resize', size[1]);
        }
    },

    subscribe: function(el, oid, hash) {
        Widgets.showSubscribeBox(oid, function() {
            if (cur.options.templates) {
                removeClass(el, 'wpost_post_subscribe');
                addClass(el, 'wpost_post_subscribed');
                addClass(el, 'secondary');
                var newBtn = se(cur.options.templates.unsubscribe);
                el.innerHTML = newBtn.innerHTML;
                el.onclick = newBtn.onclick || '';
            }
        });
    },

    unsubscribe: function(el, oid, hash) {
        var doUnsubscribe = function() {
            var oldHTML = el.innerHTML,
                oldOnclick = el.onclick;
            if (cur.options.templates) {
                removeClass(el, 'wpost_post_subscribed');
                removeClass(el, 'secondary');
                addClass(el, 'wpost_post_subscribe');
                var newBtn = se(cur.options.templates.subscribe);
                el.innerHTML = newBtn.innerHTML;
                el.onclick = newBtn.onclick || '';
            }
            cur.RpcMethods.unsubscribeFailed = function() {
                removeClass(el, 'wpost_post_subscribe');
                addClass(el, 'wpost_post_subscribed');
                addClass(el, 'secondary');
                el.innerHTML = oldHTML;
                el.onclick = oldOnclick;
            };
            ajax.post('widget_post.php', {
                act: 'unsubscribe',
                oid: oid,
                hash: hash
            }, {
                onFail: function(msg) {
                    if (msg) cur.RpcMethods.unsubscribeFailed();
                }
            });
        }.bind(this);

        cur.confirmUnsubscribe ? Widgets.showUnsubscribeBox(oid, doUnsubscribe) : doUnsubscribe();
    },

    setSubscribePosition: function(width) {
        if (!cur.subscribeBtn || !cur.heightEl || !cur.headerActions) return;
        if (width < cur.options.subscribeMinHeadWidth && cur.subscribeInHeader) {
            cur.heightEl.appendChild(cur.subscribeBtn);
            cur.subscribeInHeader = false;
        } else if (width >= cur.options.subscribeMinHeadWidth && !cur.subscribeInHeader) {
            cur.headerActions.appendChild(cur.subscribeBtn);
            cur.subscribeInHeader = true;
        }
    },

    setBodyClass: function(width) {
        var isMini = width < 380,
            isNano = isMini && width < 325,
            isPico = isNano && width < 285;
        if (cur.lastSize != isMini + '' + isNano + '' + isPico) {
            cur.lastSize = isMini + '' + isNano + '' + isPico;
            replaceClass(bodyNode, 'wpost_mini wpost_nano wpost_pico', (isMini ? 'wpost_mini ' : '') + (isNano ? 'wpost_nano ' : '') + (isPico ? 'wpost_pico ' : ''));
        }
    },

    override: function(file, force) {
        if (!StaticFiles[file] && force !== true) return;
        switch (file) {
            case 'lite.js':
                extend(window, {

                    showTooltip: Widgets.showTooltip,

                    showBox: Widgets.showBox({
                        'al_photos.php': {
                            'photo_box': true
                        },
                        'al_video.php': {
                            'video_box': !vk.amp
                        },
                        'al_places.php': {
                            'show_photo_place': {
                                params: {
                                    'widget_width': 641,
                                    'widget_height': 635
                                }
                            }
                        },
                        'like.php': {
                            'publish_box': {
                                params: {
                                    'widget_width': 641
                                }
                            }
                        },
                        'widget_like.php': {
                            'a_stats_box': true
                        },
                    }),

                    showCaptchaBox: Widgets.showCaptchaBox,

                    showReCaptchaBox: Widgets.showReCaptchaBox,

                    gotSession: function(session_data) {
                        location.reload();
                    },

                    showPhoto: Widgets.showPhoto,

                    showVideo: Widgets.showVideo,

                    showWiki: function(likeInfo) {
                        likeInfo = (likeInfo && likeInfo['w'] || '').split('/');
                        if (likeInfo[0] == 'likes') {
                            WPost.showLikesBox(likeInfo[1]);
                        } else if (likeInfo[0] == 'shares') {
                            WPost.showLikesBox(likeInfo[1], {
                                tab: 'published'
                            });
                        } else {
                            return true;
                        }
                    },

                    shareAudioPlaylist: function(shareAudioPlaylist) {
                        !vk.id ? Widgets.oauth() : shareAudioPlaylist.apply(null, [].slice.call(arguments, 1));
                    }.bind(null, shareAudioPlaylist),

                    addAudio: function(addAudio) {
                        !vk.id ? Widgets.oauth() : addAudio.apply(null, [].slice.call(arguments, 1));
                    }.bind(null, AudioUtils.addAudio),

                    mentionOver: function(el, opts) {
                        showTooltip(el, {
                            url: 'al_wall.php',
                            params: {
                                act: 'mention_tt',
                                mention: el.getAttribute('mention_id'),
                                from: 'wpost'
                            },
                            shift: [12, 7, 7],
                            hidedt: 500,
                            showdt: 500,
                            slide: 15,
                            dir: 'auto',
                            appendParentCls: 'scroll_fix_wrap'
                        });
                    },

                    mentionClick: function() {
                        return true;
                    },

                    showInlineVideo: Widgets.showInlineVideo,

                    revertLastInlineVideo: Widgets.revertLastInlineVideo,

                    pauseLastInlineVideo: Widgets.pauseLastInlineVideo

                });
                break;

            case 'page.js':
                extend(Wall, {

                    likeOver: function() {},

                    likeOut: function() {},

                    getMatchesFromPostId: function(post_id) {
                        var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/);
                        matches = {
                            type: matches[3] || 'wall',
                            oid: matches[1],
                            pid: matches[4],
                            obj: (matches[3] || 'wall') + matches[1] + '_' + matches[4]
                        };
                        return matches;
                    },

                    postLikeOver: function(post_id) {
                        var icon = ge('like_icon' + post_id),
                            matches = Wall.getMatchesFromPostId(post_id);
                        if (!icon || cur.viewAsBox) return;
                        showTooltip(icon.parentNode, {
                            url: 'like.php',
                            params: {
                                act: 'a_get_stats',
                                'object': matches.obj,
                                has_share: 1,
                                from: 'wpost'
                            },
                            slide: 15,
                            shift: [6, 6, 6],
                            ajaxdt: 100,
                            showdt: 400,
                            hidedt: 200,
                            forcetoup: true,
                            dir: 'auto',
                            tip: {
                                over: Wall.postLikeOver.bind(Wall, post_id),
                                out: Wall.postLikeOut.bind(Wall, post_id)
                            },
                            typeClass: 'like_tt',
                            className: 'wpost_like_tt'
                        });
                    },

                    postLikeOut: function() {},

                    postShareOver: function(post_id) {
                        var icon = ge('share_icon' + post_id),
                            matches = Wall.getMatchesFromPostId(post_id);
                        if (!icon || cur.viewAsBox) return;

                        showTooltip(icon.parentNode, {
                            url: 'like.php',
                            params: {
                                act: 'a_get_stats',
                                'object': matches.obj,
                                published: 1,
                                from: 'wpost'
                            },
                            slide: 15,
                            shift: [27, 6, 27],
                            ajaxdt: 100,
                            showdt: 400,
                            hidedt: 200,
                            forcetoup: true,
                            dir: 'auto',
                            tip: {
                                over: Wall.postShareOver.bind(Wall, post_id),
                                out: Wall.postShareOut.bind(Wall, post_id)
                            },
                            typeClass: 'like_tt'
                        });
                    },

                    postShareOut: function(post_id, event) {},

                    likeFullUpdate: function(post_id, likeData) {
                        Wall.likeUpdate(post_id, likeData.like_my, likeData.like_num, likeData.like_title);
                        Wall.likeShareUpdate(post_id, likeData.share_my, likeData.share_num, likeData.share_title);
                    },

                    viewsUpdate: function(el, post_id) {
                        var matches = Wall.getMatchesFromPostId(post_id);
                        var params = {
                            act: 'a_get_stats',
                            'object': matches.obj,
                            views: 1
                        };
                        ajax.post('/like.php', params, {
                            cache: 1,
                            onDone: function(cnt, title) {
                                Wall.likeUpdate(post_id, false, cnt, undefined, undefined, 1);
                                var fakeEl = ce('div', {
                                    innerHTML: title
                                });
                                el.setAttribute('title', fakeEl.innerText || fakeEl.textContent);
                                setTimeout(ajax.invalidate.pbind('/like.php', params), 3000);
                            }
                        });
                    },

                    likeUpdate: function(post_id, my, count, title, share, views) {
                        if (!views) count = intval(count);

                        var post = ge('wpost_post'),
                            wrap = domByClass(post, views ? '_views_wrap' : (share ? '_share_wrap' : '_like_wrap')),
                            icon = domByClass(wrap, '_icon'),
                            countNode = domByClass(wrap, '_count'),
                            tt = wrap && wrap.tt || {},
                            opts = clone(tt.opts || {}),
                            countInput = domByClass(tt.container, '_value'),
                            content = domByClass(tt.container, '_content'),
                            titleNode = domByClass(tt.container, '_title');

                        if (!views && !share) {
                            var viewsWrap = domByClass(post, '_views_wrap'),
                                viewsCountNode = viewsWrap && domByClass(viewsWrap, '_count');
                            if (viewsCountNode && hasClass(viewsWrap, '_auto_update') && (!val(viewsCountNode) || val(viewsCountNode) == val(countNode))) {
                                wall.likeUpdate(post_id, 0, count, undefined, undefined, 1);
                            }
                        }

                        if (!countNode) return;
                        if (title && titleNode) val(titleNode, title);
                        if (tt) tt.likeInvalidated = true;
                        if (countInput) countInput.value = count;

                        if (!views) attr(countNode, 'data-count', count);
                        animateCount(countNode, views ? count : wall.formatCount(count), {
                            str: 'auto',
                            noWrapWidth: true
                        });
                        toggleClass(wrap, share ? 'my_share' : 'my_like', my);
                        toggleClass(wrap, views ? 'no_views' : (share ? 'no_shares' : 'no_likes'), !count);
                        toggleClass(content, 'me_hidden', !my);

                        if (count) {
                            if (tt.el && !isVisible(tt.container) && !title) {
                                tooltips.show(tt.el, extend(opts, {
                                    showdt: 0
                                }));
                            }
                        } else if (tt.el) {
                            tt.hide();
                        }
                    },

                    likeShareUpdate: function(post_id, my, count, title) {
                        return Wall.likeUpdate(post_id, my, count, title, true);
                    },

                    like: function(post_id, hash) {
                        if (!vk.id || cur.viewAsBox) return;

                        var post = ge('wpost_post'),
                            wrap = domByClass(post, '_like_wrap'),
                            icon = domByClass(wrap, '_icon'),
                            countNode = geByClass1('_count', wrap),
                            my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like'),
                            matches = Wall.getMatchesFromPostId(post_id);

                        ajax.post('like.php', {
                            act: 'a_do_' + (my ? 'un' : '') + 'like',
                            'object': matches.obj,
                            hash: hash,
                            wall: 2,
                            from: 'wpost'
                        }, {
                            onDone: Wall.likeFullUpdate.pbind(post_id)
                        });

                        var count = intval(attr(countNode, 'data-count'));
                        Wall.likeUpdate(post_id, !my, count + (my ? -1 : 1));
                    },

                    likeShare: function(post_id, hash) {
                        if (!vk.id || cur.viewAsBox) return;

                        var matches = Wall.getMatchesFromPostId(post_id),
                            el = ge('like_share_' + matches.obj),
                            was = isChecked(el);

                        checkbox(el);

                        ajax.post('like.php', {
                            act: 'a_do_' + (was ? 'un' : '') + 'publish',
                            object: matches.obj,
                            hash: hash,
                            wall: 2,
                            from: 'wpost'
                        }, {
                            onDone: Wall.likeFullUpdate.pbind(post_id)
                        });

                        var post = ge('wpost_post'),
                            wrap = domByClass(post, '_share_wrap'),
                            icon = domByClass(wrap, '_icon'),
                            countNode = geByClass1('_count', wrap),
                            my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like');

                        var count = intval(attr(countNode, 'data-count'));
                        Wall.likeShareUpdate(post_id, true, count + (my ? 0 : 1));
                    },

                    likeShareCustom: function(post_id, params) {
                        if (!vk.id || cur.viewAsBox) return;
                        var matches = Wall.getMatchesFromPostId(post_id);

                        showBox('like.php', extend({
                            act: 'publish_box',
                            object: matches.obj
                        }, params));

                        cur.RpcMethods.likeFullUpdate = function(post_id, likeData) {
                            return Wall.likeFullUpdate(post_id, cleanObj(likeData));
                        }.pbind(post_id);
                    }

                });
                window.wall = Wall;
                break;
        }
    }

};

try {
    stManager.done('api/widgets/al_post.js');
} catch (e) {}