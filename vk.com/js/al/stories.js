window.Stories = {
    init: function(data) {
        checkMp4(function(canPlay) {
            wkcur.videoCanPlay = canPlay;
            Stories.initLayer(data);
        });
    },
    initLayer: function(data) {
        var self = this;

        setStyle('wk_layer_wrap', 'overflow', 'hidden');
        setStyle(wkcur.wkCont, 'position', 'static');
        hide(wkcur.wkRight);
        hide(wkcur.wkRightNav);

        wkcur.hidden = 0;

        wkcur.readStories = [];
        wkcur.readStoriesHash = data.read_hash;
        wkcur.globalStories = data.stories_data;
        wkcur.storiesList = data.stories_list;
        wkcur.answerFormTpl = data.answer_form_tpl;
        wkcur.removeStoryHash = data.remove_hash;
        wkcur.target = data.target;
        wkcur.blacklistAddHash = data.blacklist_add_hash;

        cur.ctrl_submit = data.ctrl_submit;

        Stories.scrollToStory(data.play_story);

        setTimeout(function() {
            self.startStory(data.play_story);
        }, 500);

        addEvent(document, 'keydown', this.onWinKeyDown);
        addEvent(document, 'keyup', this.onWinKeyUp);
        wkcur._hide.push(Stories.onDestroy.bind(this));
    },
    onResize: function() {
        if (!wkcur.storyOwner) {
            return;
        }
        removeClass('stories_view_cont', 'inited');
        Stories.scrollToStory(wkcur.storyOwner);
    },
    onWinKeyDown: function(e) {

        if ([KEY.PAGEDOWN, KEY.PAGEUP].indexOf(e.keyCode) > -1) {
            return cancelEvent(e);
        }

        if (wkcur.storyDown) {
            return;
        }
        if (attr(e.target, 'contenteditable') || inArray(e.target.tagName, ['INPUT', 'TEXTAREA']) || curBox()) {
            return;
        }
        if (wkcur.storyDown) {
            return;
        }
        switch (e.keyCode) {
            case KEY.RIGHT:
                Stories.nextStory();
                break;
            case KEY.LEFT:
                Stories.prevStory();
                break;
            case KEY.SPACE:
                cancelEvent(e);
                Stories.onMouseDown();
                break;
        }
    },
    onWinKeyUp: function(e) {
        if (e.keyCode == KEY.SPACE && wkcur.storyDown) {
            Stories.onMouseUp(false, e);
        }
    },
    onDestroy: function() {
        if (!wkcur.storyOwner) {
            return;
        }
        removeEvent(document, 'keydown', this.onWinKeyDown);
        removeEvent(document, 'keyup', this.onWinKeyUp);
        setStyle('wk_layer_wrap', 'overflow', 'auto');

        this.timersStop();
        this.resetPrevStory();
        this.destroyStory();
        if (wkcur.needRefreshFeedStories) {
            this.updateFeedStories();
        }
        this.readStories();
        this.destroyPreload();
        this.restoreAudioPlayer();

        delete wkcur.storyOwner;
        delete wkcur.storyIndex;
        delete wkcur.answerFormShown;
        delete wkcur.needRefreshFeedStories;
    },
    startStory: function(owner_id, check_after_new) {
        clearTimeout(wkcur.startStoryTimer);

        if (wkcur.hidden) {
            return;
        }

        if (owner_id == wkcur.storyOwner) {
            return this.nextStory();
        }

        this.resetPrevStory();

        var firstStory = !wkcur.storyOwner;
        var curOwner = wkcur.storyOwner;
        wkcur.storyOwner = intval(owner_id);
        wkcur.storyIndex = 0;

        this.positionToNewStory();
        this.resetTimeLine();

        if (check_after_new || firstStory) {
            var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
            if (wkcur.closeAfterNewStories && !story.unread) {
                wkcur.storyOwner = curOwner;
                return this.hideLayer();
            } else if (story.unread) {
                wkcur.closeAfterNewStories = 1;
            }
        } else {
            wkcur.closeAfterNewStories = 0;
        }

        addClass('stories_view_cont', 'inited');
        setTimeout(function() {
            Stories.scrollToStory(owner_id);

            wkcur.startStoryTimer = setTimeout(function() {
                Stories.playStory(0, 1);
            }, 260);
        });
        removeClass('feed_story_' + owner_id, 'story_feed_new_item');
    },
    positionToNewStory: function() {
        var stories = wkcur.globalStories[wkcur.storyOwner];
        for (var i = 0; i < stories.length; i++) {
            if (stories[i].unread) {
                wkcur.storyIndex = i;
                break;
            }
        }
    },
    fillPrevProgress: function() {
        if (wkcur.storyIndex > 0) {
            var storyEl = ge('story_view_' + wkcur.storyOwner);
            for (var j = 0; j < wkcur.storyIndex; j++) {
                setStyle(geByClass1('_story_view_timeline_progress' + j, storyEl), 'transform', 'translateX(100%)');
            }
        }
    },
    scrollToStory: function(owner_id) {
        var storyEl = ge('story_view_' + owner_id),
            contEl = ge('stories_view_cont'),
            width = storyEl.offsetWidth,
            x = -storyEl.offsetLeft + window.innerWidth / 2 - width / 2;

        removeClass(geByClass1('story_view_row_active', contEl), 'story_view_row_active');
        setStyle(contEl, {
            transform: 'translateX(' + x + 'px)'
        });
        addClass(storyEl, 'story_view_row_active');

        var story = wkcur.globalStories[owner_id][0];
        setStyle(geByClass1('_preview', storyEl), 'background-image', 'url(' + story.preview + ')');

        Stories.updateStoryInfo(storyEl, story);
    },
    playStory: function(trying, new_owner) {
        if (wkcur.hidden) {
            return;
        }

        var owner_id = wkcur.storyOwner,
            stories = wkcur.globalStories[owner_id],
            story = stories[wkcur.storyIndex];

        var storyRaw = owner_id + '_' + wkcur.storyIndex;
        wkcur.curStory = storyRaw;

        this.destroyStory();

        var storyEl = ge('story_view_' + wkcur.storyOwner),
            previewEl = geByClass1('_preview', storyEl),
            resEl = geByClass1('story_view_result', storyEl);

        removeClass(storyEl, 'loaded');
        addClass(geByClass1('story_view_back', storyEl), 'can_back');
        setStyle(previewEl, 'background-image', 'url(' + story.preview + ')');
        this.timersStop();

        if (story.can_view && story.type == 'video' && !wkcur.videoCanPlay) {
            story.can_view = 0;
        }

        if (story.can_view) {
            wkcur.showLoaderTimer = setTimeout(this.showLoader, 200);
            if (!trying) {
                removeClass(storyEl, 'story_view_cant_play');
            }
        } else {
            addClass(storyEl, 'story_view_cant_play');
        }

        function onLoaded() {
            removeClass(storyEl, 'story_view_cant_play');
            if (storyRaw == wkcur.curStory) {
                clearTimeout(wkcur.showLoaderTimer);
                Stories.hideLoader();

                if (story.type == 'photo') {
                    clearTimeout(wkcur.photoTimer);
                    wkcur.duration = 3250;
                    if (!wkcur.storyDown) {
                        wkcur.photoTimer = setTimeout(Stories.nextStory, wkcur.duration);
                    }
                    addClass(wkcur.photo, 'started');
                    Stories.restoreAudioPlayer();
                    if (new_owner) {
                        addClass(wkcur.photo, 'animate_story');
                    }
                } else {
                    wkcur.duration = wkcur.video.duration;
                    addClass(wkcur.video, 'started');
                    if (wkcur.storyDown) {
                        wkcur.video.pause();
                    }
                    if (getAudioPlayer().isPlaying()) {
                        wkcur.needPlayAudio = true;
                        getAudioPlayer().pause();
                    }
                    if (new_owner) {
                        addClass(wkcur.video, 'animate_story');
                    }
                    wkcur.removeVideoPhotohelper = setTimeout(function() {
                        re(wkcur.photo);
                        wkcur.photo = false;
                    }, 100);
                }
                wkcur.currentTime = 0;
                wkcur.startTs = vkNow();
                Stories.timeLineUpdateStop();
                Stories.timeLineUpdateStart();
                Stories.preloadNext();

                wkcur.loadedTimer = setTimeout(function() {
                    addClass(storyEl, 'loaded');
                }, 150);
            }
        }

        function onError() {
            addClass(storyEl, 'story_view_cant_play');
            Stories.timersStop();
            Stories.showError('cant_load');
            Stories.hideLoader();
        }

        if (story.deleted) {
            this.showError('deleted');
        } else if (story.private) {
            this.showError('private');
        } else if (story.expired) {
            this.showError('expired');
        } else if (story.type == 'video' && !wkcur.videoCanPlay) {
            this.showError('cant_play');
        } else if (story.type == 'video') {
            wkcur.photo = ce('img', {
                className: 'story_view_photo started',
                src: story.video_first_frame
            });
            resEl.appendChild(wkcur.photo);
            wkcur.video = ce('video', {
                autoplay: 1,
                className: 'story_view_video',
            });
            addEvent(wkcur.video, 'canplay', onLoaded);
            addEvent(wkcur.video, 'ended', this.nextStory);
            addEvent(wkcur.video, 'error', onError);
            wkcur.video.src = story.src;
            resEl.appendChild(wkcur.video);
        } else {
            wkcur.photo = ce('img', {
                className: 'story_view_photo'
            });
            wkcur.photo.onload = onLoaded;
            addEvent(wkcur.photo, 'error', onError);
            wkcur.photo.src = story.src;
            resEl.appendChild(wkcur.photo);
        }

        if (story.unread) {
            wkcur.readStories.push(story.id);
            wkcur.globalStories[owner_id][wkcur.storyIndex].seen = 1;
            if (wkcur.readStories.length > 20) {
                this.readStories();
            }
            story.unread = 0;
        }
        this.setLoc(story);
        this.fillPrevProgress();
        this.hideAnswerForm();

        this.updateStoryInfo(storyEl, story);

        if (story.type == 'video') {
            addClass(storyEl, 'story_view_row_video');
        } else {
            removeClass(storyEl, 'story_view_row_video');
        }

        this.volumeButtonUpdate(geByClass1('story_view_volume_button', storyEl));
    },
    updateStoryInfo: function(storyEl, story) {
        val(geByClass1('story_view_date', storyEl), story.date || '');
        val(geByClass1('_story_views_button', storyEl), story.views || '');
    },
    restoreAudioPlayer: function() {
        if (wkcur.needPlayAudio) {
            wkcur.needPlayAudio = false;
            getAudioPlayer().play();
        }
    },
    setLoc: function(story) {
        var url = location.pathname + '?w=story' + story.id;

        if (inArray(wkcur.target, ['feed', 'profile'])) {
            url += '/query';
        }

        if (wkcur.target == 'feed') {
            url += '&from_feed=1';
        } else if (wkcur.target == 'profile') {
            url += '&profile=1';
        }
        nav.strLoc = url;
        nav.objLoc = nav.fromStr(url);
        history.pushState({}, '', url);
    },
    showError: function(type) {
        var storyEl = ge('story_view_' + wkcur.storyOwner),
            resEl = geByClass1('story_view_result', storyEl);

        var text = '';
        switch (type) {
            case 'private':
                text = cur.lang.stories_error_private;
                break;
            case 'expired':
                text = cur.lang.stories_error_expired;
                break;
            case 'cant_play':
                text = cur.lang.story_error_cant_play;
                break;
            case 'cant_load':
                text = '<div>' + cur.lang.stories_error_cant_load + '</div><div class="story_view_try_load_btn" onmousedown="Stories.tryLoadAgain(event);">' + cur.lang.stories_try_again + '</div>';
                break;
            default:
                text = cur.lang.stories_error_deleted;
                break;
        }

        wkcur.error = ce('div', {
            className: 'story_view_error_wrap',
            innerHTML: '<div class="story_view_error_cont"><div class="story_view_error_icon ' + type + '"></div><div class="story_view_error_text">' + text + '</div></div>'
        });
        resEl.appendChild(wkcur.error);
    },
    destroyStory: function() {
        if (wkcur.video) {
            removeEvent(wkcur.video);
            wkcur.video.pause();
            wkcur.video.src = '';
            var video = wkcur.video;
            removeClass(video, 'started');
            Stories.removeElem(video);
            wkcur.video = false;
        }
        if (wkcur.photo) {
            removeEvent(wkcur.photo);
            wkcur.photo.src = '';
            var photo = wkcur.photo;
            removeClass(photo, 'started');
            Stories.removeElem(photo);
            wkcur.photo = false;
        }
        if (wkcur.error) {
            re(wkcur.error);
            wkcur.error = false;
        }
        this.hideLoader();
    },
    removeElem: function(el) {
        setTimeout(function() {
            re(el);
        }, 200);
    },
    showLoader: function() {
        wkcur.loader = ce('div', {
            className: 'story_view_loader',
            innerHTML: '<svg class="story_view_loader_circular" viewBox="25 25 50 50"><circle class="story_view_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" /></svg>',
        });
        addClass('story_view_' + wkcur.storyOwner, 'story_view_loading');
        geByClass1('story_view_result', 'story_view_' + wkcur.storyOwner).appendChild(wkcur.loader);
    },
    hideLoader: function() {
        if (wkcur.loader) {
            wkcur.loader.parentNode.removeChild(wkcur.loader);
            wkcur.loader = false;
            removeClass('story_view_' + wkcur.storyOwner, 'story_view_loading');
        }
    },
    resetPrevStory: function() {
        var owner_id = wkcur.storyOwner;
        if (!owner_id) {
            return;
        }

        var storyEl = ge('story_view_' + wkcur.storyOwner),
            previewEl = geByClass1('story_view_row_cont_preview', storyEl);

        if (!storyEl) {
            return;
        }

        removeClass(storyEl, 'story_view_row_active');
        removeClass(storyEl, 'loaded');

        setStyle(previewEl, 'background-image', 'url(' + attr(previewEl, 'data-preview') + ')');
        removeClass(geByClass1('story_view_back', storyEl), 'can_back');
        Stories.hideAnswerForm();
        val(geByClass1('story_view_date', storyEl), '');

        this.timersStop();
        this.destroyStory();

        wkcur.formAnimTimer = 0;
        wkcur.answerFormShown = 0;
    },
    nextStory: function() {
        var stories = wkcur.globalStories[wkcur.storyOwner],
            storyEl = ge('story_view_' + wkcur.storyOwner);

        if (!stories) {
            return;
        }

        Stories.timeLineUpdateStop();
        setStyle(geByClass1('_story_view_timeline_progress' + wkcur.storyIndex, storyEl), 'transform', 'translateX(100%)');

        wkcur.storyIndex++;
        if (wkcur.storyIndex >= stories.length) {
            return Stories.nextOwner();
        }

        Stories.playStory();
    },
    prevStory: function() {
        var storyEl = ge('story_view_' + wkcur.storyOwner);

        Stories.timeLineUpdateStop();
        setStyle(geByClass1('_story_view_timeline_progress' + wkcur.storyIndex, storyEl), 'transform', 'translateX(0px)');

        wkcur.storyIndex--;
        if (wkcur.storyIndex < 0) {
            return Stories.prevOwner();
        }

        Stories.playStory();
    },
    nextOwner: function() {
        var list = wkcur.storiesList,
            curPos = list.indexOf(wkcur.storyOwner);

        var newOwner;
        if (curPos == -1 || curPos >= list.length - 1) {
            return Stories.hideLayer();
        } else {
            newOwner = list[curPos + 1];
        }

        this.startStory(newOwner, 1);
    },
    prevOwner: function() {
        var list = wkcur.storiesList,
            curPos = list.indexOf(wkcur.storyOwner);

        var newOwner;
        if (curPos == -1 || curPos <= 0) {
            return Stories.hideLayer();
        } else {
            newOwner = list[curPos - 1];
        }
        wkcur.closeAfterNewStories = 0;
        this.startStory(newOwner);
    },
    timeLineUpdateStop: function() {
        var fn = window.requestAnimationFrame ? window.cancelAnimationFrame : window.clearTimeout;
        fn(wkcur.timelineAnim);
    },
    timeLineUpdateStart: function() {
        var fn = window.requestAnimationFrame || function(callback) {
            return setTimeout(callback, 50)
        };
        var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];

        var curTime;
        if (story.type == 'video' && wkcur.video) {
            curTime = wkcur.video.currentTime;
        } else {
            curTime = vkNow() - wkcur.startTs;
        }

        var progress = Math.min(100, curTime / wkcur.duration * 100),
            storyEl = ge('story_view_' + wkcur.storyOwner);

        setStyle(geByClass1('_story_view_timeline_progress' + wkcur.storyIndex, storyEl), 'transform', 'translateX(' + progress + '%)');

        if (progress < 100 && !wkcur.storyDown) {
            wkcur.timelineAnim = fn(Stories.timeLineUpdateStart);
        }
    },
    resetTimeLine: function() {
        var storyEl = ge('story_view_' + wkcur.storyOwner),
            els = geByClass('story_view_timeline_progress', storyEl);

        for (var i in els) {
            setStyle(els[i], 'transform', 'translateX(0px)');
        }
    },
    checkEvent: function(e, owner_id) {
        var storyEl = ge('story_view_' + wkcur.storyOwner);

        if (e) {
            if (e && (e.button == 2 || e.target.tagName == 'A')) {
                return false;
            }

            var el = e.target;
            while (el) {
                if (hasClass(el, 'story_view_row')) {
                    break;
                } else if (hasClass(el, 'story_view_answer_form') || hasClass(el, 'story_view_head') || hasClass(el, 'story_view_feedback_buttons') || hasClass(el, 'story_view_timeline_wrap')) {
                    return -1;
                }
                el = el.parentNode;
            }
        }

        if (wkcur.answerFormShown && (!owner_id || owner_id == wkcur.storyOwner)) {
            return false;
        }

        return true;
    },
    onMouseDown: function(e, force) {

        if (!window.wkcur || !wkcur.globalStories) {
            return;
        }

        if (e && hasClass(e.target, 'story_view_row') && !hasClass(e.target, 'story_view_row_active')) {
            return Stories.hideLayer();
        }

        var check_ev = this.checkEvent(e);
        if (check_ev != true) {
            if (wkcur.answerFormShown && !wkcur.answerSending && (check_ev != -1 || e && hasClass(e.target, 'story_view_answer_form_bg'))) {
                var textEl = geByClass1('story_view_answer_form_text', 'story_view_' + wkcur.storyOwner);
                if (!trim(Emoji.editableVal(textEl))) {
                    Stories.hideAnswerForm(force);
                }
            }
            return;
        }

        if (wkcur.storyDown) {
            return;
        }

        var stories = wkcur.globalStories[wkcur.storyOwner],
            story = stories ? stories[wkcur.storyIndex] : false;

        wkcur.storyDown = 1;
        this.timersStop();
        this.downTs = vkNow();

        if (story && story.type == 'video') {
            wkcur.video && wkcur.video.pause();
        }
    },
    onMouseUp: function(owner_id, e) {
        owner_id = owner_id || wkcur.storyOwner;
        if (!wkcur.storyDown || curBox() || this.checkEvent(e, owner_id) != true) {
            return;
        }
        wkcur.storyDown = 0;
        if (vkNow() - this.downTs > 300 && wkcur.storyOwner == owner_id || !e) {
            this.restoreTimers();
        } else {
            if (hasClass(e.target, 'story_view_back')) {
                this.prevStory();
            } else {
                this.startStory(owner_id);
            }
        }
    },
    timersStop: function() {
        this.timeLineUpdateStop();
        clearTimeout(wkcur.photoTimer);
        clearTimeout(wkcur.showLoaderTimer);
        clearTimeout(wkcur.startStoryTimer);
        clearTimeout(wkcur.loadedTimer);
        clearTimeout(wkcur.removeVideoPhotohelper);
        clearTimeout(wkcur.formAnimTimer);
    },
    restoreTimers: function() {
        var stories = wkcur.globalStories[wkcur.storyOwner],
            story = stories ? stories[wkcur.storyIndex] : false;

        if (!story || !story.can_view) {
            return;
        }
        this.hideAnswerForm();

        wkcur.startTs += vkNow() - this.downTs;
        this.timeLineUpdateStart();

        if (story.type == 'photo') {
            wkcur.photoTimer = setTimeout(Stories.nextStory, wkcur.duration - (vkNow() - wkcur.startTs));
        } else {
            wkcur.video && wkcur.video.play();
        }
    },

    // feed
    initFeed: function() {
        var feedItems = ge('stories_feed_items_container');
        Stories.updateFeedArrows();

        // Handle wheel events only when pointer is inside scroller
        // to improve overall scroll performance. See VKRED-6658 for details
        function handleMouseEnter() {
            addEvent(feedItems, browserFeatures.wheelEvent, Stories.feedMouseWheel);
        }

        function handleMouseLeave() {
            removeEvent(feedItems, browserFeatures.wheelEvent, Stories.feedMouseWheel);
        }
        addEvent(feedItems, 'mouseenter', handleMouseEnter);
        addEvent(feedItems, 'mouseleave', handleMouseLeave);
        addEvent(window, 'scroll', Stories.onWinScroll);

        cur.destroy.push(function() {
            removeEvent(window, 'scroll', Stories.onWinScroll);
            removeEvent(feedItems, browserFeatures.wheelEvent, Stories.feedMouseWheel);
            removeEvent(feedItems, 'mouseenter', handleMouseEnter);
            removeEvent(feedItems, 'mouseleave', handleMouseLeave);
        });
    },
    onWinScroll: function(e) {
        var st = window.scrollGetY();
        if (st > 400) {
            return;
        }
        if (st != cur.lastWinScroll) {
            cur.lastWinOnScroll = vkNow();
            cur.lastWinScroll = st;
        }
    },
    showFeedStory: function(story_raw, e) {
        if (e.metaKey || e.ctrlKey) {
            return;
        }
        var params = {
            w: 'story' + story_raw,
            query: JSON.stringify({
                from_feed: 1
            })
        };
        storiesUserId = nav.fromStr(nav.strLoc)['stories_user_id'];
        if (storiesUserId) {
            params['stories_user_id'] = storiesUserId;
        }
        showWiki(params);
        return cancelEvent(e);
    },
    feedNext: function() {
        return this.feedPaging('next');
    },
    feedPrev: function() {
        return this.feedPaging('prev');
    },
    feedPaging: function(nav, fast) {
        var pos = cur.storiesPos || 0,
            wrap = geByClass1('stories_feed_wrap'),
            itemsWrap = ge('stories_feed_items'),
            width = getSize(wrap)[0];

        if (isNumeric(nav)) {
            pos += nav;
        } else {
            var slideWidth = width - 80;
            if (nav == 'next') {
                pos += slideWidth;
            } else {
                pos -= slideWidth;
            }
        }

        cur.storiesPos = Math.max(0, Math.min(pos, itemsWrap.scrollWidth - width));
        if (fast) {
            removeClass(itemsWrap, 'animated');
        } else {
            addClass(itemsWrap, 'animated');
        }
        setStyle(itemsWrap, 'transform', 'translateX(-' + cur.storiesPos + 'px)');

        Stories.updateFeedArrows();
    },
    updateFeedStories: function(newSection) {
        var newSection = newSection || 'news';
        if (!ge('stories_feed_items')) {
            return;
        }
        if (newSection != 'news') {
            hide('stories_feed_wrap');
        } else {
            show('stories_feed_wrap');
        }

        ajax.post('al_stories.php', {
            act: 'feed_stories'
        }, {
            onDone: function(stories) {
                var wrap = ge('stories_feed_items');
                if (wrap) {
                    if (stories) {
                        setStyle(wrap, 'transform', 'translateX(0px)');
                        val(wrap, stories);
                        if (wrap.children.length < 8) {
                            addClass('stories_feed_wrap', 'stories_feed_not_nav_buttons');
                        } else {
                            removeClass('stories_feed_wrap', 'stories_feed_not_nav_buttons');
                        }
                    } else {
                        re('stories_feed_wrap');
                    }
                    cur.storiesPos = 0;
                    Stories.updateFeedArrows();
                }
            }
        });
    },
    feedMouseWheel: function(e) {
        if (hasClass('stories_feed_wrap', 'stories_feed_not_nav_buttons')) {
            return;
        }
        if (vkNow() - cur.lastWinOnScroll < 300) {
            return;
        }
        cancelEvent(e);
        var delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        Stories.feedPaging(delta, 1);
    }, // feed end

    updateFeedArrows: function() {
        var itemsWrap = ge('stories_feed_items');
        if (!itemsWrap) {
            return;
        }

        if (!cur.storiesPos) {
            cur.storiesPos = 0;
        }

        var width = geByClass1('stories_feed_wrap').offsetWidth,
            max = itemsWrap.scrollWidth - width;

        if (cur.storiesPos == 0) {
            addClass('stories_feed_arrow_left', 'disabled');
        } else {
            removeClass('stories_feed_arrow_left', 'disabled');
        }

        if (cur.storiesPos == max || max <= 0) {
            addClass('stories_feed_arrow_right', 'disabled');
        } else {
            removeClass('stories_feed_arrow_right', 'disabled');
        }
    },
    readStories: function() {
        if (!wkcur.readStories.length) {
            return;
        }

        var stories = clone(wkcur.readStories);
        wkcur.readStories = [];

        ajax.post('al_stories.php', {
            act: 'read_stories',
            hash: wkcur.readStoriesHash,
            stories: stories.join(',')
        }, {
            onDone: function() {
                var owners = {};
                for (var i = 0; i < stories.length; i++) {
                    var exp = stories[i].split('_');
                    owners[intval(exp[0])] = 1;
                }

                for (var owner_id in owners) {
                    /*var seen = 1;
                    for(var j = 0; j < wkcur.globalStories[owner_id].length; j++) {
                      if (!wkcur.globalStories[owner_id][j].seen) {
                        seen = 0;
                        break;
                      }
                    }
                    if (seen) {*/
                    removeClass('feed_story_' + owner_id, 'story_feed_new_item');
                    //}
                }
            }
        });
    },
    showAnswerForm: function() {
        var storyEl = ge('story_view_' + wkcur.storyOwner),
            resEl = geByClass1('story_view_result', storyEl);

        if (wkcur.formAnimTimer || geByClass1('story_view_answer_form', resEl)) {
            return;
        }

        this.onMouseDown();

        var form = se(wkcur.answerFormTpl);
        resEl.appendChild(form);

        var answerButton = geByClass1('_answer_button', storyEl),
            cancelButton = geByClass1('_cancel_answer_button', storyEl);

        setStyle(cancelButton, 'width', getSize(answerButton)[0] + 'px');
        addClass(answerButton, 'hide');
        removeClass(cancelButton, 'hide');

        addClass(storyEl, 'story_view_row_form_anim');
        addClass(storyEl, 'story_view_row_form_shown');
        addClass(form, 'story_view_answer_form_shown');

        var textEl = geByClass1('story_view_answer_form_text', resEl);
        wkcur.emojiLastId = Emoji.init(textEl, {
            ttDiff: 93,
            noStickers: true,
            noStickersStore: true,
            rPointer: true,
            onSend: Stories.onAnswerSend,
            forceUp: true,
            ref: 'stories',
            controlsCont: storyEl
        });
        wkcur.formAnimTimer = setTimeout(function() {
            wkcur.formAnimTimer = 0;
            removeClass(storyEl, 'story_view_row_form_anim');

            Emoji.editableFocus(textEl, false, 1);
        }, 200);

        wkcur.answerFormShown = 1;
    },
    hideAnswerForm: function(pause) {
        var storyEl = ge('story_view_' + wkcur.storyOwner),
            form = geByClass1('story_view_answer_form', storyEl);

        if (!form || wkcur.formAnimTimer) {
            return;
        }
        wkcur.answerFormShown = 0;

        addClass(geByClass1('_cancel_answer_button', storyEl), 'hide');
        removeClass(geByClass1('_answer_button', storyEl), 'hide');

        addClass(storyEl, 'story_view_row_form_anim');
        removeClass(storyEl, 'story_view_row_form_shown');
        removeClass(form, 'story_view_answer_form_shown');

        wkcur.answerSending = 0;

        if (Emoji.opts[wkcur.emojiLastId]) {
            Emoji.ttHide(wkcur.emojiLastId, false, false, true);
            Emoji.destroy(wkcur.emojiLastId);
        }

        wkcur.formAnimTimer = setTimeout(function() {
            wkcur.formAnimTimer = 0;
            re(form);
            re(geByClass1('story_view_sent_answer_msg', storyEl));
            removeClass(storyEl, 'story_view_row_form_anim');
            if (pause) {
                Stories.onMouseDown();
            } else {
                wkcur.storyDown = 0;
                Stories.restoreTimers();
            }
        }, 200);
    },
    onAnswerSend: function() {
        if (wkcur.answerSending) {
            return;
        }

        var storyEl = ge('story_view_' + wkcur.storyOwner),
            resEl = geByClass1('story_view_result', storyEl),
            textEl = geByClass1('story_view_answer_form_text', resEl),
            sendBtn = geByClass1('story_view_answer_form_send_btn', resEl);

        var text = trim(Emoji.editableVal(textEl));
        if (!text) {
            return textEl.focus();
        }
        text = text.substr(0, 1000);

        var loaderHtml = '<div class="story_view_loader_send_answer"><svg class="story_view_loader_circular" viewBox="25 25 50 50"><circle class="story_view_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" /></svg></div>';
        addClass(sendBtn, 'sending');
        val(sendBtn, loaderHtml);

        wkcur.answerSending = 1;
        var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        var media_suffix = '';
        if (story.pm_hash) {
            media_suffix = '_pm_hash' + story.pm_hash
        }
        ajax.post('al_im.php', {
            act: 'a_send',
            msg: text,
            hash: val(geByClass1('_answer_hash', storyEl)),
            media: 'story:' + story.id + media_suffix,
            to: wkcur.storyOwner
        }, {
            onDone: function() {
                resEl.appendChild(ce('div', {
                    innerHTML: '<span>' + cur.lang.stories_answer_sent + '</span>',
                    className: 'story_view_sent_answer_msg',
                }));
                fadeIn(geByClass1('story_view_sent_answer_msg', resEl), 200);

                var form = geByClass1('story_view_answer_form', storyEl);
                hide(form);

                addClass(geByClass1('_cancel_answer_button', storyEl), 'hide');
                removeClass(geByClass1('_answer_button', storyEl), 'hide');

                setTimeout(Stories.hideAnswerForm, 2000);
            },
            onFail: function() {
                removeClass(sendBtn, 'sending');
                val(sendBtn, '');
                wkcur.answerSending = 0;
            }
        });
    },
    shareBox: function() {
        Stories.onMouseDown(false, true);
        var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        showBox('like.php', {
            act: 'publish_box',
            object: 'story' + story.id,
            from: 'wkview',
            pm_hash: story.pm_hash
        }, {
            onDone: function() {
                Stories.onMouseDown();
            },
            params: {
                onHide: function() {
                    Stories.onMouseUp();
                }
            }
        });
    },
    removeBox: function() {
        Stories.onMouseDown();
        showFastBox({
            title: getLang('global_warning'),
            onHide: function() {
                Stories.onMouseUp();
            },
        }, cur.lang.stories_remove_warning, cur.lang.stories_remove_confirm, Stories.remove, getLang('global_cancel'));
    },
    remove: function(btn) {
        var storyEl = ge('story_view_' + wkcur.storyOwner);

        curBox().showProgress();
        curBox().showCloseProgress();

        var btns = curBox().btns;
        hide(btns.ok[0], btns.cancel[0]);

        var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        ajax.post('al_stories.php', {
            act: 'remove_story',
            story_raw: story.id,
            hash: wkcur.removeStoryHash
        }, {
            onDone: function() {
                curBox().hide();

                wkcur.globalStories[wkcur.storyOwner].splice(wkcur.storyIndex, 1);

                if (wkcur.globalStories[wkcur.storyOwner].length == 0) {
                    Stories.removeOwner()
                } else {
                    re(geByClass1('story_view_timeline_wrap', storyEl).lastChild);
                    Stories.playStory();
                }
            },
            onFail: function() {
                show(btns.ok[0], btns.cancel[0]);
                curBox().hideProgress();
                curBox().hideCloseProgress();
            }
        });
    },
    removeOwner: function() {
        re('story_view_' + wkcur.storyOwner);

        var ownerPos = wkcur.storiesList.indexOf(wkcur.storyOwner);
        wkcur.storiesList.splice(ownerPos, 1);

        delete wkcur.globalStories[wkcur.storyOwner];
        if (wkcur.storiesList.length - 1 >= ownerPos) {
            Stories.startStory(wkcur.storiesList[ownerPos]);
        } else {
            Stories.hideLayer();
        }
    },
    viewsBox: function() {
        this.onMouseDown();
        var story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];

        function onBoxScroll() {
            var moreLink = ge('story_views_more_link');
            var moreLinkTrigger = ge('story_views_more_link_trigger');
            if (isVisible(moreLinkTrigger) && boxLayerWrap.scrollHeight - 500 < (boxLayerWrap.scrollTop + boxLayerWrap.offsetHeight)) {
                hide(moreLinkTrigger);
                moreLink.click();
            }
        }

        showBox('al_stories.php', {
            act: 'views_box',
            story_raw: story.id
        }, {
            params: {
                onHide: function() {
                    removeEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
                    Stories.onMouseUp();
                }
            },
            onDone: function(box, needMore) {
                wkcur.viewsNextFrom = 0;
                if (!needMore) {
                    re('story_views_more_link');
                    re('story_views_more_link_trigger');
                } else {
                    addEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
                }
            }
        });
    },
    viewsMore: function() {
        var content = ge('story_views_wrap'),
            moreBtn = ge('story_views_more_link'),
            story = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];

        wkcur.viewsNextFrom += 40;
        ajax.post('al_stories.php', {
            act: 'views_box',
            story_raw: story.id,
            offset: wkcur.viewsNextFrom
        }, {
            onDone: function(rows, needMore) {
                var newRows = ce('div', {
                    innerHTML: rows
                });
                for (var e = domFC(newRows); e; e = domFC(newRows)) {
                    content.appendChild(e);
                }

                if (!needMore) {
                    re(moreBtn);
                    re('story_views_more_link_trigger');
                } else {
                    show('story_views_more_link_trigger');
                }
            },
            showProgress: lockButton.pbind(moreBtn),
            hideProgress: unlockButton.pbind(moreBtn)
        });
    },
    checkClose: function(e) {
        var el = e.target;
        while (el) {
            if (hasClass(el, 'story_view_row')) {
                return;
            } else if (hasClass(el, 'stories_view_cont')) {
                break;
            }
            el = el.parentNode;
        }

        Stories.hideLayer();
    },
    formInputKeyDown: function(e) {
        if (e.keyCode == KEY.ESC) {
            if (window.Emoji && Emoji.shown) {
                return;
            }
            Stories.hideAnswerForm();
            cancelEvent(e);
        }
    },
    destroyPreload: function() {
        if (wkcur.preloadEl) {
            for (var i = 0; i < wkcur.preloadEl.length; i++) {
                wkcur.preloadEl[i].src = '';
                re(wkcur.preloadEl[i]);
            }
        }
        wkcur.preloadEl = [];
    },
    preloadNext: function() {
        var story = false;

        Stories.destroyPreload();

        var stories = wkcur.globalStories[wkcur.storyOwner];
        if (stories.length - 1 > wkcur.storyIndex) {
            story = stories[wkcur.storyIndex + 1];
        } else {
            var nextOwner = wkcur.storiesList[wkcur.storiesList.indexOf(wkcur.storyOwner) + 1];
            if (nextOwner) {
                story = wkcur.globalStories[nextOwner][0];
            }
        }

        if (!story) {
            return;
        }

        var el = false;
        if (story.type == 'video') {
            el = ce('video', {
                src: story.src,
                preload: 'auto'
            });
            el.load();

            wkcur.preloadEl.push(ce('img', {
                src: story.video_first_frame
            }));
        } else {
            el = vkImage();
            el.src = story.src;
        }

        wkcur.preloadEl.push(el);
    },
    tryLoadAgain: function(e) {
        cancelEvent(e);
        Stories.playStory(1);
    },
    volumeButtonUpdate: function(btn) {
        var muted = ls.get('stories_video_muted') || 0;

        if (muted) {
            addClass(btn, 'muted');
        } else {
            removeClass(btn, 'muted');
        }

        if (wkcur.video) {
            if (muted) {
                wkcur.video.volume = 0;
            } else {
                wkcur.video.volume = 1;
            }
        }
    },
    muteButtonPress: function(e, btn) {
        cancelEvent(e);
        var muted = ls.get('stories_video_muted') || 0;
        ls.set('stories_video_muted', !muted);
        this.volumeButtonUpdate(btn);
    },
    hideLayer: function() {
        if (wkcur.hidden) {
            return;
        }

        Stories.onMouseDown();
        wkcur.hidden = 1;

        var feedStoryEl = ge('feed_story_' + wkcur.storyOwner);
        if (!feedStoryEl || scrollGetY() > 500) {
            return WkView.hide(false, true);
        }

        var feedStoryAva = geByClass1('stories_feed_item_ava_img', feedStoryEl),
            feedStoryAvaSize = getSize(feedStoryAva),
            storyEl = geByClass1('story_view_row_active', 'stories_view_cont'),
            storyCont = geByClass1('story_view_row_cont_wrap', storyEl);

        var rightLimit = cur.storiesPos + getSize('stories_feed_items')[0] - 30,
            feedRowWidth = getSize(feedStoryAva)[0];
        if (feedStoryEl.offsetLeft < cur.storiesPos) {
            Stories.feedPaging(feedStoryEl.offsetLeft - cur.storiesPos, 1);
        } else if (rightLimit < feedStoryEl.offsetLeft + feedRowWidth) {
            Stories.feedPaging(feedStoryEl.offsetLeft + feedRowWidth - rightLimit, 1);
        }

        var storyViewSize = getSize(storyEl),
            storyPos = getXY(feedStoryEl),
            storyViewPos = getXY(storyEl);

        removeClass(feedStoryAva, 'stories_feed_item_ava_animate');
        setStyle(feedStoryAva, {
            transform: 'scale(0.03)'
        });

        layers.hide();
        addClass(wkcur.wkBox, 'story_view_hiding');

        var scale = 0.01;
        var y = (storyPos[1] - storyViewPos[1]) - storyViewSize[1] / 2 + feedStoryAvaSize[1] / 2;
        var x = (storyPos[0] - storyViewPos[0]) - storyViewSize[0] / 2 + feedStoryAvaSize[0] / 2 + 10;

        setStyle(storyCont, {
            transform: 'scale(' + scale + ')'
        });
        setStyle(storyEl, {
            transform: 'translate(' + x + 'px, ' + y + 'px)',
            opacity: 0.3
        });

        addClass(feedStoryAva, 'stories_feed_item_ava_animate');
        setStyle(feedStoryAva, {
            transform: 'scale(1)'
        });

        setTimeout(function() {
            WkView.hide(false, true);
        }, 270);
    },

    showActions: function(el, e) {
        if (hasClass(el, 'shown')) {
            Stories.onMouseUp();
            uiActionsMenu.hide(el)
        } else {
            Stories.onMouseDown(false, true);
            var menuEl = geByClass1('_ui_menu', el)
            setStyle(menuEl, 'margin-right', -(getSize(menuEl)[0] / 2) + 'px');

            uiActionsMenu.show(el, e);
        }
    },
    showBlackList: function() {
        if (window.wkcur) {
            Stories.onMouseDown(false, true);
        }
        showBox('al_stories.php', {
            act: 'black_list'
        }, {
            onDone: function() {
                cur.storiesBlackListScroll = new uiScroll('stories_black_list_result')
            }
        })
    },
    blackListItemClick: function(el, e) {
        cancelEvent(e)

        var owner_id = intval(attr(el, 'data-id'));
        if (cur.storiesBlackListShown[owner_id]) {
            delete cur.storiesBlackListShown[owner_id];
            removeClass(el, 'olist_item_wrap_on');
        } else {
            cur.storiesBlackListShown[owner_id] = 1;
            addClass(el, 'olist_item_wrap_on');
        }
    },
    saveBlackList: function(btn) {
        var list = Object.keys(cur.storiesBlackListShown);
        if (list.length == 0) {
            curBox().hide();
            return;
        }

        lockButton(btn)
        ajax.post('al_stories.php', {
            act: 'save_blacklist',
            hash: cur.storiesBlackList.hash,
            list: list.join(',')
        }, {
            onDone: function() {
                curBox().hide();
                Stories.updateFeedStories()
            },
            onFail: function() {
                unlockButton(btn);
            }
        })
    },
    addToBlacklist: function() {
        Stories.onMouseDown(false, true)
        showFastBox({
            title: cur.lang.stories_add_blacklist_title,
            onHide: function() {
                Stories.onMouseUp()
            }
        }, wkcur.storyOwner < 0 ? cur.lang.stories_add_blacklist_message_group : cur.lang.stories_add_blacklist_message, cur.lang.stories_add_blacklist_button, Stories.doAddToBlacklist, getLang('global_cancel'))
    },
    doAddToBlacklist: function(btn) {
        lockButton(btn)

        ajax.post('al_stories.php', {
            act: 'blacklist_add',
            owner_id: wkcur.storyOwner,
            hash: wkcur.blacklistAddHash
        }, {
            onDone: function() {
                curBox().hide();
                Stories.removeOwner();
                wkcur.needRefreshFeedStories = true;
            },
            onFail: function() {
                unlockButton(btn);
            }
        })
    },
    blacklistUpdateUsers: function(query) {
        var raw_query = query;
        query = trim(query).toLowerCase();

        if (cur.storiesBlacklistLastQ === query) {
            return;
        }
        cur.storiesBlacklistLastQ = query;

        var list = query ? cur.storiesIndexer.search(query) : cur.storiesBlackList.users;

        if (query) {
            var reStr = [];
            for (var i = 0; i < query.length; i++) {
                reStr.push(query.substr(i, 1));
            }
            var reg = new RegExp(reStr.join('.*?'), 'i');
        }

        var res = '';
        for (var i = 0; i < list.length; i++) {
            var user = list[i]

            var name = query ? user.name.replace(reg, function(found) {
                return '<em>' + found + '</em>';
            }) : user.name;

            res += cur.storiesBlackList.tpl
                .replace(/\{id\}/g, user.id)
                .replace('{photo}', user.photo)
                .replace('{name}', name)
                .replace('{href}', user.href)
                .replace('{class_name}', cur.storiesBlackListShown[user.id] ? ' olist_item_wrap_on' : '');
        }

        if (!res) {
            res = '<div class="no_rows">' + getLang('global_search_not_found').replace('{search}', clean(raw_query)) + '</div>';
        }

        val(geByClass1('olist', 'stories_black_list_result'), res);
    },
    blackListInit: function(data) {
        cur.storiesBlackListShown = {}
        cur.storiesBlackList = data;

        curBox().setOptions({
            width: 450,
            bodyStyle: 'padding: 0px',
            onClean: function() {
                if (window.wkcur) {
                    Stories.onMouseUp();
                }
                cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
            }
        }).removeButtons();

        if (cur.storiesBlackList.users.length) {
            cur.storiesBlacklistLastQ = false;
            cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, function(user) {
                return user.name;
            }, function() {
                Stories.blacklistUpdateUsers('');
            });

            uiSearch.init('stories_blacklist');
            uiSearch.focus('stories_blacklist');

            curBox().addButton(getLang('global_save'), Stories.saveBlackList).addButton(getLang('global_cancel'), void(0), 'no');
        } else {
            curBox().addButton(getLang('global_close'));
        }
    },

    logPromoConversion: function(owner_id) {
        ajax.post('al_index.php', {
            act: 'story_promo_log',
            owner_id: owner_id
        })
    }
};

try {
    stManager.done('stories.js');
} catch (e) {}