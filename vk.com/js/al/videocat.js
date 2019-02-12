var Videocat = window.Videocat || {

    VIDEO_MODULE: 'videocat',

    subscribeToChannel: function(btn, channelId, hash) {
        if (buttonLocked(btn)) return;

        var subscribed = hasClass(btn, 'secondary'),
            reqOptions = {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function() {
                    toggleClass(btn, 'secondary');
                }
            };

        ajax.post('al_groups.php', {
            act: (subscribed ? 'a_leave' : 'a_enter'),
            gid: channelId,
            hash: hash,
            from: 'videocat'
        }, reqOptions);
    },

    moreUGC: function(btn, type) {
        var gridWrap = domByClass('videocat_page_block_' + type, 'videocat_items_block');
        var videos = geByClass('video_item', gridWrap);

        if (cur.moreVideosInfo[type]) {
            ajax.post('al_video.php?act=a_more_videos', {
                type: type,
                videos: cur.moreVideosInfo[type].join(','),
                layout: 'grid'
            }, {
                onDone: function(html, list) {
                    gridWrap.insertAdjacentHTML('beforeend', html);
                    each(list, function(key, item) {
                        cur.catVideosList[key].list = cur.catVideosList[key].list.concat(item.list);
                    });
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
            delete cur.moreVideosInfo[type];
        } else {
            var shown = 0,
                index = 0;
            each(videos, function() {
                if (hasClass(this, 'video_skip_thumb_load')) {
                    removeClass(this, 'video_skip_thumb_load');
                    shown++;
                }
                index++;
                if (shown == 9) return false;
            });

            if (index >= videos.length) {
                re(btn);
            }

            if (type == 'ugc_popular') {
                Videocat.sendPopularShownStats(true);
            }
        }
    },

    moreSeries: function(btn) {
        var playlists = geByClass('videocat_featured_playlist', gpeByClass('video_block_layout', btn));
        var shown = 0,
            index = 0;
        each(playlists, function() {
            if (!isVisible(this)) {
                removeClass(this, 'videocat_featured_playlist_hidden');
                shown++;
            }

            index++;

            if (shown == 16) return false;
        });

        if (index >= playlists.length) {
            re(btn);
        }
    },

    moreChannels: function(btn, catId) {
        var moreInfo = false;
        each(cur.moreChannelsInfo, function(i, info) {
            if (info.cat_id == catId) {
                moreInfo = info;
                return false;
            }
        });

        cur.moreChannelsOffsets = cur.moreChannelsOffsets || {};

        if (moreInfo) {
            var offset = 0,
                parentEl = gpeByClass('video_block_layout', btn);

            if (!cur.moreChannelsOffsets[catId]) {
                offset = geByClass('videocat_row', parentEl).length;
            } else {
                offset = cur.moreChannelsOffsets[catId];
            }

            ajax.post('al_video.php', {
                act: 'a_more_channels',
                cat_id: catId,
                offset: offset,
                channels: moreInfo.channels.join(',')
            }, {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function(sliders, newOffset) {
                    cur.moreChannelsOffsets[catId] = newOffset;
                    each(sliders, function(i, html) {
                        parentEl.insertBefore(se(trim(html)), domPN(btn));
                    });

                    if (newOffset >= moreInfo.channels.length - 1 /*hash*/ ) {
                        re(domPN(btn));
                    }

                    Video._updateThumbsInView();
                }
            });

        } else {
            re(domPN(btn));
        }
    },

    updateTitle: function(el) {
        if (el.getAttribute('title') && el.scrollWidth <= el.clientWidth) {
            el.removeAttribute('title');
        }
    },

    _onScroll: function() {
        if (!Video.isInCatalog()) return;

        var pageCatBlocksEls = [];
        each(geByClass('videocat_page_block'), function() {
            if (this.getAttribute('data-type').indexOf('cat_') === 0) {
                pageCatBlocksEls.push(this);
            }
        });
        var lastBlockPos = getXY(pageCatBlocksEls[pageCatBlocksEls.length - 1]);

        if (!cur.videocatLoadingMoreCats && (clientHeight() + scrollGetY()) > lastBlockPos[1]) {
            var offset = cur.moreCatsOffsets = cur.moreCatsOffsets || pageCatBlocksEls.length;
            if (offset >= cur.moreChannelsInfo.length) return;

            cur.videocatLoadingMoreCats = true;

            var cats = [];
            each(cur.moreChannelsInfo, function(i, info) {
                cats.push(info.cat_id + ':' + info.channels.join(','));
            });

            ajax.post('al_video.php?act=a_more_cats', {
                offset: offset,
                cats: cats.join('/')
            }, {
                onDone: function(blocksHtmls, blocksList) {
                    var otherBlocksEl = ge('videocat_other_blocks');
                    otherBlocksEl.insertAdjacentHTML(blocksHtmls.join());

                    cur.catVideosList = extend(cur.catVideosList, blocksList);
                }
            });
        }
    },

    init: function(moreBlocks, feedData, preloadLists, lists, top3playlists, moreChannelsInfo) {
        if (cur._videocatInited) return;
        cur._videocatInited = true;

        Videocat.lists = extend(Videocat.lists || {}, lists);
        Videocat.moreBlocks = moreBlocks;
        Videocat.feedData = feedData;
        Videocat.preloadLists = preloadLists;
        Videocat.top3playlists = top3playlists;
        Videocat.moreChannelsInfo = moreChannelsInfo;

        cur.videoCatRecomsLoaded = false;
        cur._sessionChannelsSubscriptions = [];

        cur._videocat_onScroll && removeEvent(window, 'scroll', cur._videocat_onScroll);
        addEvent(window, 'scroll', cur._videocat_onScroll = Videocat._onScroll);

        function deinitEvents() {
            removeEvent(window, 'scroll', cur._videocat_onScroll);
        }

        cur.destroy.push(deinitEvents);
        cur._back.hide.push(deinitEvents);

        if (ge('videocat_page_block_ugc_popular')) {
            Videocat.sendPopularShownStats();
        }

        Video._updateThumbsInView();
    },

    sendPopularShownStats: function(more) {
        statlogsValueEvent('videocat_popular', '', more ? 'more' : 'show');
        if (cur.popularQid) {
            var vids = '';
            each(Videocat.getPopularShownVids(), function(i, vid) {
                vids += '&vid=' + vid;
            });
            vkImage().src = '//go.imgsmail.ru/vk?pxn=vs&qid=' + cur.popularQid + vids;
        }
    },

    getPopularShownVids: function() {
        cur.popularShown = cur.popularShown || [];

        var from = cur.popularShown.length;
        var blockPopular = ge('videocat_page_block_ugc_popular');
        var items = geByClass('video_item', blockPopular);
        var vids = [];

        for (var i = from;; ++i) {
            var item = items[i];
            if (!item || hasClass(item, 'video_skip_thumb_load')) break;
            vids.push(domData(item, 'id'));
        }

        cur.popularShown = cur.popularShown.concat(vids);
        return vids;
    },

    show: function(ref, event, videoId, videoHash, playlistId, loadPlaylistOnShow) {
        if (checkEvent(event)) return true;

        showVideo(videoId, videoHash, {
            playlistId: playlistId,
            autoplay: 1,
            module: ['feed_block', 'feed_recoms_block'].indexOf(playlistId) >= 0 ? playlistId : Videoview.getVideoModule(videoId),
            addParams: {
                force_no_repeat: 1,
                show_next: playlistId ? 1 : 0,
                playlist_id: playlistId
            }
        });

        return false;
    },

    extendSlider: function(rowEl, html) {
        if (!rowEl) return;

        html = trim(html);
        if (!html) return;

        html = se(html);
        if (!html) return;

        Videocat._sliderExtends = Videocat._sliderExtends || [];
        Videocat._sliderExtends.push(function() {
            var sliderCont = geByClass1('videocat_row_slider_items_cont', rowEl);

            each(geByClass('video_item', html), function(i, item) {
                sliderCont.appendChild(item);
            });

            var btn = geByClass1('videocat_row_slider_btn_right', rowEl);

            Videocat.slideRow(btn, -3, true);
            Videocat.slideRow(btn, 3, true);
        });
    },

    sliderSubscribeTo: function(btn, gid, hash, unsubscribe) {
        var row = gpeByClass('videocat_row', btn);
        var subscrButton = geByClass1('videocat_block_subscribe', row);
        var unsubscrButton = geByClass1('videocat_block_unsubscribe', row);

        //notice: similar ajax-request in subscribeTo
        ajax.post('/al_video.php', {
            act: 'a_subscribe',
            hash: hash,
            gid: gid,
            unsubscribe: +(unsubscribe || 0),
            from: 'recomm_page'
        }, {
            showProgress: function() {
                lockButton(btn)
            },
            hideProgress: function() {
                unlockButton(btn)
            },
            onDone: function() {
                if (unsubscribe) {
                    hide(unsubscrButton);
                    show(subscrButton);
                    cur._sessionChannelsSubscriptions[-gid] = false; // hack: see gotoChannel comment.
                } else {
                    hide(subscrButton);
                    show(unsubscrButton);
                    cur._sessionChannelsSubscriptions[-gid] = true;
                }
            },
            onError: unlockButton(btn)
        });
    },

    subscribeTo: function(btn, gid, hash, unsubscribe) {
        function onHideProgress() {
            if (unsubscribe) {
                hide('video_channel_subs_progress');
            } else {
                unlockButton(btn)
            }
        }

        //notice: similar ajax-request in sliderSubscribeTo
        ajax.post('/al_video.php', {
            act: 'a_subscribe',
            hash: hash,
            gid: gid,
            unsubscribe: +(unsubscribe || 0)
        }, {
            showProgress: function() {
                if (unsubscribe) {
                    hide('video_channel_subscribe_msg');
                    show('video_channel_subs_progress');
                } else {
                    lockButton(btn)
                }
            },
            hideProgress: onHideProgress,
            onDone: function() {
                Videocat.onChannelSubscribed(gid, hash, unsubscribe);
            },
            onError: onHideProgress
        })
    },

    onChannelSubscribed: function(channelId, subsHash, wasUnsubscribed) {
        var msgEl = ge('video_channel_subscribe_msg');
        var btnEl = ge('video_channel_subscribe');

        if (wasUnsubscribed) {
            show(btnEl);
            hide(msgEl);
            cur._sessionChannelsSubscriptions[-channelId] = false; // hack: see gotoChannel comment.
        } else {
            cur._sessionChannelsSubscriptions[-channelId] = true;
            var subscribedMsg = getLang('video_you_are_subscribed');
            subscribedMsg = rs(subscribedMsg, {
                channelId: channelId,
                subsHash: subsHash
            });

            hide(btnEl);
            show(msgEl);
            msgEl.innerHTML = subscribedMsg;
        }
    },

    gotoChannel: function(event, oid, shortTitle, channelThumb, channelHref, isSubscribed, subsHash) {
        if (event && checkEvent(event)) return true;

        var section = 'channel' + oid;

        cur._channels = cur._channels || {};

        //temp hack (while isSubscribed param is in inline 'onclick')
        if (typeof cur._sessionChannelsSubscriptions[-oid] !== 'undefined') {
            isSubscribed = cur._sessionChannelsSubscriptions[-oid];
        }

        cur._channels[oid] = {
            oid: oid,
            shortTitle: shortTitle,
            thumb: channelThumb,
            href: channelHref,
            isSubscribed: isSubscribed,
            subsHash: subsHash
        };

        cur.videoList[section] = {
            needPreload: true
        };

        nav.change({
            section: section
        });

        return false;
    },

    gotoCategory: function(event, catId, title) {
        if (event && checkEvent(event)) return true;

        cur.categoryTitle = title;
        nav.change({
            section: 'cat_' + catId
        });

        return false;
    },

    collapseUGCPopular: function() {
        var ugcPopular = gpeByClass('videocat_row', ge('videocat_header_ugc_popular'));
        each(geByClass('videocat_row_item', ugcPopular), function(i) {
            toggle(this, i < 12);
        });
    },

    showMore: function(btn, countToShow, type) {
        var prev = btn.previousElementSibling;
        var done = false,
            remain = false;
        each(prev.children, function(i, c) {
            if (!isVisible(c)) {
                if (done) {
                    remain = true;
                    return false;
                }
                show(c);
                countToShow--;
                if (!countToShow) {
                    done = true;
                }
            }
        });

        if (type == 'recom') {
            toggle(btn, Videocat.currRecomParams.more);
        } else {
            toggle(btn, remain);
        }

        if (type == 'recom') {
            ajax.post('/al_video.php', {
                act: 'a_fetch_next_recoms',
                from: Videocat.currRecomParams.from,
                offset: +Videocat.currRecomParams.offset,
                more: +Videocat.currRecomParams.more,
                params_sig: Videocat.currRecomParams.params_sig
            }, {
                onDone: function(html, params, list) {
                    Videocat.currRecomParams = params;

                    var wrapEl = geByClass1('videocat_grid_wrap', domPN(btn));
                    var els = se(trim(html)).children;
                    while (els.length) {
                        wrapEl.appendChild(els[0]);
                        hide(els[0]);
                    }

                    if (!params || !params.more) {
                        re(btn);
                    }

                    if (list && list.recom && list.recom.list.length && Videocat.lists.recoms) {
                        Videocat.lists.recoms.list = Videocat.lists.recoms.list.concat(list.recom.list);
                    }
                }
            });
        }
    },

    showMoreBlocks: function(btn) {
        var nextBlocks = Videocat.moreBlocks[0];
        Videocat.moreBlocks = Videocat.moreBlocks.slice(1);

        var hasMore = Videocat.moreBlocks.length > 0;

        var textEl = geByClass1('videocat_more_toggle_text', btn);
        var progressEl = geByClass1('videocat_more_toggle_progress', btn);

        ajax.post('/al_video.php', {
            act: 'a_fetch_next_blocks',
            list: nextBlocks
        }, {
            showProgress: function() {
                hide(textEl);
                show(progressEl);
            },
            hideProgress: function() {
                show(textEl);
                hide(progressEl);
                toggle(btn, hasMore);
            },
            onDone: function(html, list) {
                if (list && !isEmpty(list)) {
                    Videocat.lists = extend(Videocat.lists, list);
                }

                var wrapEl = ge('videocat_page');
                var els = se(trim(html)).children;
                while (els.length) {
                    wrapEl.insertBefore(els[0], btn);
                }
            }
        });
    },

    slideRow: function(btn, offset, noFetch) {
        var parent = domPN(btn);
        var slider = geByClass1('videocat_row_slider_items_cont', parent);
        var sliderWrap = gpeByClass('videocat_row_slider', btn);
        var itemWidth = getSize(slider.children[0])[0];

        var ITEMS_IN_ROW = 3;
        var offsetCount = ITEMS_IN_ROW * (offset > 0 ? 1 : -1);

        var curOffset = offsetCount + (data(slider, 'items_offset') || 0);

        curOffset = Math.min(curOffset, 0);
        curOffset = Math.max(curOffset, -slider.children.length + ITEMS_IN_ROW);

        data(slider, 'items_offset', curOffset);

        var addOffset;
        // some magic numbers for offset at start / middle / end positions
        if (curOffset == 0) {
            addOffset = 15;
        } else if (-curOffset == slider.children.length - ITEMS_IN_ROW) {
            addOffset = 56;
        } else {
            addOffset = 37;
        }

        setStyle(slider, {
            left: itemWidth * curOffset + addOffset
        });

        { // hide or show slider buttons
            var btnLeft = geByClass1('videocat_row_slider_btn_left', parent);
            var btnRight = geByClass1('videocat_row_slider_btn_right', parent);

            var btnLeftHide = curOffset == 0;
            var btnRightHide = -(curOffset - ITEMS_IN_ROW) >= slider.children.length;

            toggleClass(btnLeft, 'videocat_row_slider_hidden', btnLeftHide);
            toggleClass(btnRight, 'videocat_row_slider_hidden', btnRightHide);

            function initBtnHide(isHide, btn) {
                if (isHide) {
                    addEvent(btn, 'mouseleave', function() {
                        setStyle(btn, 'pointer-events', 'none');
                        removeEvent(btn, 'mouseleave');
                    });
                } else {
                    setStyle(btn, 'pointer-events', 'all');
                }
            }

            initBtnHide(btnLeftHide, btnLeft);
            initBtnHide(btnRightHide, btnRight);

            // reset shift
            btnLeftHide && Videocat.slideMouseLeave(btnLeft, 'right');
            btnRightHide && Videocat.slideMouseLeave(btnRight, 'left');

            toggleClass(sliderWrap, 'videocat_slider_offseted', !btnLeftHide && !btnRightHide);
        }

        { // dynamic image load and transparency of edge items
            cur._slideTimeouts = cur._slideTimeouts || [];
            each(cur._slideTimeouts, function(i, timer) {
                clearTimeout(timer);
            });

            each(geByClass('video_item', parent), function(i) {
                if ((i >= -curOffset + ITEMS_IN_ROW) && (i < -curOffset + 2 * ITEMS_IN_ROW)) {
                    removeClass(this, 'video_skip_thumb_load');
                }

                if (i == -curOffset - 1 || i == -curOffset + ITEMS_IN_ROW) {
                    (function(item) {
                        cur._slideTimeouts.push(setTimeout(function() {
                            addClass(item, 'videocat_item_transparent');
                        }, 270));
                    })(this);
                } else {
                    removeClass(this, 'videocat_item_transparent');
                }
            });
        }

        if (!noFetch && Videocat._sliderExtends) {
            each(Videocat._sliderExtends, function(i, f) {
                f();
            });
            Videocat._sliderExtends = [];
        }

        if (!noFetch && offset < 0) {
            var rowEl = gpeByClass('videocat_row', btn);
            var rowType = rowEl ? rowEl.getAttribute('data-type') : '';

            { // dynamic loading
                if (rowType) {
                    rowType = intval(rowType);

                    Videocat.slideLoadMore(rowEl, rowType);

                    if (false && Videocat.preloadLists && Videocat.preloadLists[blockId]) {
                        var preloadList = Videocat.preloadLists[blockId];
                        Videocat.preloadLists[blockId] = false;
                        var hash = preloadList[0];
                        preloadList = preloadList.slice(1);

                        ajax.post('al_video.php', {
                            act: 'a_fetch_row_items',
                            list: preloadList.join(','),
                            hash: hash,
                            block_id: blockId
                        }, {
                            onDone: function(html, list) {
                                if (list) {
                                    each(list, function(blockId, info) {
                                        var extendList = info.list;
                                        if (extendList && extendList.length && Videocat.lists[blockId]) {
                                            Videocat.lists[blockId].list = Videocat.lists[blockId].list.concat(extendList);
                                        }
                                    });
                                }
                                Videocat.extendSlider(rowEl, html);
                            }
                        });
                    }
                }
            }

            if (!Videocat.feedDataLoading && rowEl && rowEl.getAttribute('data-block-id') == 'feed' && Videocat.feedData && !isEmpty(Videocat.feedData)) {
                Videocat.feedDataLoading = true;

                var q = Videocat.feedData;
                q.act = 'a_fetch_next_feed';
                q.module = cur.module;
                ajax.post('al_video.php', q, {
                    onDone: function(html, list, feedFrom, feedOffset, hash) {
                        Videocat.feedData = extend(Videocat.feedData, {
                            video_feed_from: feedFrom,
                            video_feed_offset: feedOffset,
                            hash: hash
                        });

                        if (!feedFrom) {
                            Videocat.feedData = false;
                        }

                        if (list && list.feed) {
                            Videocat.lists.feed = Videocat.lists.feed || {};
                            Videocat.lists.feed.list = Videocat.lists.feed.list.concat(list.feed.list);
                        }

                        Videocat.extendSlider(rowEl, html);

                        Videocat.feedDataLoading = false;
                    }
                })
            }
        }
    },

    slideLoadMore: function(rowEl, rowType, callback) {
        var videos = cur.moreVideosInfo[rowType];
        if (!videos) return;
        cur.moreVideosInfo[rowType] = false;

        ajax.post('al_video.php', {
            act: 'a_more_videos',
            type: rowType,
            videos: videos.join(',')
        }, {
            onDone: function(html, list) {
                Videocat.extendSlider(rowEl, html);

                each(list, function(key, item) {
                    cur.catVideosList[key].list = cur.catVideosList[key].list.concat(item.list);
                });

                if (isFunction(callback)) callback();
            }
        });
    },

    slideMouseEnter: function(btn, side) {
        var parent = domPN(btn);
        var slider = geByClass1('videocat_row_slider_items_cont', parent);
        if (!hasClass(btn, 'videocat_row_slider_hidden')) {
            addClass(slider, 'videocat_row_slider_shift_' + side);
        }
    },

    slideMouseLeave: function(btn, side) {
        var parent = domPN(btn);
        var slider = geByClass1('videocat_row_slider_items_cont', parent);
        removeClass(slider, 'videocat_row_slider_shift_' + side);
    },

    toggleRepeat: function(event, btn) {
        var propName = 'playlistAutoplay';
        var curValue = ls.get(propName);

        ls.set(propName, !curValue);

        toggleClass(btn, 'video_header_btn_active', curValue);
    },

    isAutoplayEnabled: function() {
        return false;
    },

    closeBlock: function(ref, blockId, hash, parent_div, delete_dom) {
        if (!parent_div) {
            parent_div = 'videocat_row'
        }
        var blockEl = gpeByClass(parent_div, ref);

        if (!delete_dom) {
            setStyle(blockEl, {
                'max-height': getSize(blockEl)[1]
            });
            setTimeout(function() {
                addClass(blockEl, 'videocat_row_closed');
            });
        } else {
            blockEl.parentElement.removeChild(blockEl);
        }

        ajax.post('al_video.php', {
            act: 'a_videocat_closeblock',
            block_id: blockId,
            hash: hash
        });

        window.tooltips && tooltips.hideAll();

        if (domPN(blockEl).children.length == 1) {
            setTimeout(function() {
                re(gpeByClass('videocat_page_block', blockEl));
            }, 500);
        }
    },

    isTop3Playlist: function(plId) {
        var found = false;
        each(Videocat.top3playlists || [], function(i, top3plId) {
            if (top3plId == plId) {
                found = true;
                return false;
            }
        });
        return found;
    },

    logPlaylistEnter: function(channel_id, hash) {
        ajax.post('al_video.php', {
            act: 'a_videocat_logListEnter',
            channel_id: channel_id,
            hash: hash
        })
    }
};

try {
    stManager.done('videocat.js');
} catch (e) {}