window.Stories = {
    init: function(e) {
        checkMp4(function(r) {
            wkcur.videoCanPlay = r, Stories.initLayer(e)
        })
    },
    initLayer: function(e) {
        var r = this;
        setStyle("wk_layer_wrap", "overflow", "hidden"), setStyle(wkcur.wkCont, "position", "static"), hide(wkcur.wkRight), hide(wkcur.wkRightNav), wkcur.hidden = 0, wkcur.readStories = [], wkcur.readStoriesHash = e.read_hash, wkcur.globalStories = e.stories_data, wkcur.storiesList = e.stories_list, wkcur.answerFormTpl = e.answer_form_tpl, wkcur.removeStoryHash = e.remove_hash, wkcur.target = e.target, wkcur.blacklistAddHash = e.blacklist_add_hash, cur.ctrl_submit = e.ctrl_submit, Stories.scrollToStory(e.play_story), setTimeout(function() {
            r.startStory(e.play_story)
        }, 500), addEvent(document, "keydown", this.onWinKeyDown), addEvent(document, "keyup", this.onWinKeyUp), wkcur._hide.push(Stories.onDestroy.bind(this))
    },
    onResize: function() {
        wkcur.storyOwner && (removeClass("stories_view_cont", "inited"), Stories.scrollToStory(wkcur.storyOwner))
    },
    onWinKeyDown: function(e) {
        if ([KEY.PAGEDOWN, KEY.PAGEUP].indexOf(e.keyCode) > -1) return cancelEvent(e);
        if (!wkcur.storyDown && !(attr(e.target, "contenteditable") || inArray(e.target.tagName, ["INPUT", "TEXTAREA"]) || curBox() || wkcur.storyDown)) switch (e.keyCode) {
            case KEY.RIGHT:
                Stories.nextStory();
                break;
            case KEY.LEFT:
                Stories.prevStory();
                break;
            case KEY.SPACE:
                cancelEvent(e), Stories.onMouseDown()
        }
    },
    onWinKeyUp: function(e) {
        e.keyCode == KEY.SPACE && wkcur.storyDown && Stories.onMouseUp(!1, e)
    },
    onDestroy: function() {
        wkcur.storyOwner && (removeEvent(document, "keydown", this.onWinKeyDown), removeEvent(document, "keyup", this.onWinKeyUp), setStyle("wk_layer_wrap", "overflow", "auto"), this.timersStop(), this.resetPrevStory(), this.destroyStory(), wkcur.needRefreshFeedStories && this.updateFeedStories(), this.readStories(), this.destroyPreload(), this.restoreAudioPlayer(), delete wkcur.storyOwner, delete wkcur.storyIndex, delete wkcur.answerFormShown, delete wkcur.needRefreshFeedStories)
    },
    startStory: function(e, r) {
        if (clearTimeout(wkcur.startStoryTimer), !wkcur.hidden) {
            if (e == wkcur.storyOwner) return this.nextStory();
            this.resetPrevStory();
            var o = !wkcur.storyOwner,
                t = wkcur.storyOwner;
            if (wkcur.storyOwner = intval(e), wkcur.storyIndex = 0, this.positionToNewStory(), this.resetTimeLine(), r || o) {
                var s = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
                if (wkcur.closeAfterNewStories && !s.unread) return wkcur.storyOwner = t, this.hideLayer();
                s.unread && (wkcur.closeAfterNewStories = 1)
            } else wkcur.closeAfterNewStories = 0;
            addClass("stories_view_cont", "inited"), setTimeout(function() {
                Stories.scrollToStory(e), wkcur.startStoryTimer = setTimeout(function() {
                    Stories.playStory(0, 1)
                }, 260)
            }), removeClass("feed_story_" + e, "story_feed_new_item")
        }
    },
    positionToNewStory: function() {
        for (var e = wkcur.globalStories[wkcur.storyOwner], r = 0; r < e.length; r++)
            if (e[r].unread) {
                wkcur.storyIndex = r;
                break
            }
    },
    fillPrevProgress: function() {
        if (wkcur.storyIndex > 0)
            for (var e = ge("story_view_" + wkcur.storyOwner), r = 0; r < wkcur.storyIndex; r++) setStyle(geByClass1("_story_view_timeline_progress" + r, e), "transform", "translateX(100%)")
    },
    scrollToStory: function(e) {
        var r = ge("story_view_" + e),
            o = ge("stories_view_cont"),
            t = r.offsetWidth,
            s = -r.offsetLeft + window.innerWidth / 2 - t / 2;
        removeClass(geByClass1("story_view_row_active", o), "story_view_row_active"), setStyle(o, {
            transform: "translateX(" + s + "px)"
        }), addClass(r, "story_view_row_active");
        var i = wkcur.globalStories[e][0];
        setStyle(geByClass1("_preview", r), "background-image", "url(" + i.preview + ")"), Stories.updateStoryInfo(r, i)
    },
    playStory: function(e, r) {
        function o() {
            removeClass(c, "story_view_cant_play"), n == wkcur.curStory && (clearTimeout(wkcur.showLoaderTimer), Stories.hideLoader(), "photo" == a.type ? (clearTimeout(wkcur.photoTimer), wkcur.duration = 3250, wkcur.storyDown || (wkcur.photoTimer = setTimeout(Stories.nextStory, wkcur.duration)), addClass(wkcur.photo, "started"), Stories.restoreAudioPlayer(), r && addClass(wkcur.photo, "animate_story")) : (wkcur.duration = wkcur.video.duration, addClass(wkcur.video, "started"), wkcur.storyDown && wkcur.video.pause(), getAudioPlayer().isPlaying() && (wkcur.needPlayAudio = !0, getAudioPlayer().pause()), r && addClass(wkcur.video, "animate_story"), wkcur.removeVideoPhotohelper = setTimeout(function() {
                re(wkcur.photo), wkcur.photo = !1
            }, 100)), wkcur.currentTime = 0, wkcur.startTs = vkNow(), Stories.timeLineUpdateStop(), Stories.timeLineUpdateStart(), Stories.preloadNext(), wkcur.loadedTimer = setTimeout(function() {
                addClass(c, "loaded")
            }, 150))
        }

        function t() {
            addClass(c, "story_view_cant_play"), Stories.timersStop(), Stories.showError("cant_load"), Stories.hideLoader()
        }
        if (!wkcur.hidden) {
            var s = wkcur.storyOwner,
                i = wkcur.globalStories[s],
                a = i[wkcur.storyIndex],
                n = s + "_" + wkcur.storyIndex;
            wkcur.curStory = n, this.destroyStory();
            var c = ge("story_view_" + wkcur.storyOwner),
                w = geByClass1("_preview", c),
                u = geByClass1("story_view_result", c);
            removeClass(c, "loaded"), addClass(geByClass1("story_view_back", c), "can_back"), setStyle(w, "background-image", "url(" + a.preview + ")"), this.timersStop(), a.can_view && "video" == a.type && !wkcur.videoCanPlay && (a.can_view = 0), a.can_view ? (wkcur.showLoaderTimer = setTimeout(this.showLoader, 200), e || removeClass(c, "story_view_cant_play")) : addClass(c, "story_view_cant_play"), a.deleted ? this.showError("deleted") : a["private"] ? this.showError("private") : a.expired ? this.showError("expired") : "video" != a.type || wkcur.videoCanPlay ? "video" == a.type ? (wkcur.photo = ce("img", {
                className: "story_view_photo started",
                src: a.video_first_frame
            }), u.appendChild(wkcur.photo), wkcur.video = ce("video", {
                autoplay: 1,
                className: "story_view_video"
            }), addEvent(wkcur.video, "canplay", o), addEvent(wkcur.video, "ended", this.nextStory), addEvent(wkcur.video, "error", t), wkcur.video.src = a.src, u.appendChild(wkcur.video)) : (wkcur.photo = ce("img", {
                className: "story_view_photo"
            }), wkcur.photo.onload = o, addEvent(wkcur.photo, "error", t), wkcur.photo.src = a.src, u.appendChild(wkcur.photo)) : this.showError("cant_play"), a.unread && (wkcur.readStories.push(a.id), wkcur.globalStories[s][wkcur.storyIndex].seen = 1, wkcur.readStories.length > 20 && this.readStories(), a.unread = 0), this.setLoc(a), this.fillPrevProgress(), this.hideAnswerForm(), this.updateStoryInfo(c, a), "video" == a.type ? addClass(c, "story_view_row_video") : removeClass(c, "story_view_row_video"), this.volumeButtonUpdate(geByClass1("story_view_volume_button", c))
        }
    },
    updateStoryInfo: function(e, r) {
        val(geByClass1("story_view_date", e), r.date || ""), val(geByClass1("_story_views_button", e), r.views || "")
    },
    restoreAudioPlayer: function() {
        wkcur.needPlayAudio && (wkcur.needPlayAudio = !1, getAudioPlayer().play())
    },
    setLoc: function(e) {
        var r = location.pathname + "?w=story" + e.id;
        inArray(wkcur.target, ["feed", "profile"]) && (r += "/query"), "feed" == wkcur.target ? r += "&from_feed=1" : "profile" == wkcur.target && (r += "&profile=1"), nav.strLoc = r, nav.objLoc = nav.fromStr(r), history.pushState({}, "", r)
    },
    showError: function(e) {
        var r = ge("story_view_" + wkcur.storyOwner),
            o = geByClass1("story_view_result", r),
            t = "";
        switch (e) {
            case "private":
                t = cur.lang.stories_error_private;
                break;
            case "expired":
                t = cur.lang.stories_error_expired;
                break;
            case "cant_play":
                t = cur.lang.story_error_cant_play;
                break;
            case "cant_load":
                t = "<div>" + cur.lang.stories_error_cant_load + '</div><div class="story_view_try_load_btn" onmousedown="Stories.tryLoadAgain(event);">' + cur.lang.stories_try_again + "</div>";
                break;
            default:
                t = cur.lang.stories_error_deleted
        }
        wkcur.error = ce("div", {
            className: "story_view_error_wrap",
            innerHTML: '<div class="story_view_error_cont"><div class="story_view_error_icon ' + e + '"></div><div class="story_view_error_text">' + t + "</div></div>"
        }), o.appendChild(wkcur.error)
    },
    destroyStory: function() {
        if (wkcur.video) {
            removeEvent(wkcur.video), wkcur.video.pause(), wkcur.video.src = "";
            var e = wkcur.video;
            removeClass(e, "started"), Stories.removeElem(e), wkcur.video = !1
        }
        if (wkcur.photo) {
            removeEvent(wkcur.photo), wkcur.photo.src = "";
            var r = wkcur.photo;
            removeClass(r, "started"), Stories.removeElem(r), wkcur.photo = !1
        }
        wkcur.error && (re(wkcur.error), wkcur.error = !1), this.hideLoader()
    },
    removeElem: function(e) {
        setTimeout(function() {
            re(e)
        }, 200)
    },
    showLoader: function() {
        wkcur.loader = ce("div", {
            className: "story_view_loader",
            innerHTML: '<svg class="story_view_loader_circular" viewBox="25 25 50 50"><circle class="story_view_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" /></svg>'
        }), addClass("story_view_" + wkcur.storyOwner, "story_view_loading"), geByClass1("story_view_result", "story_view_" + wkcur.storyOwner).appendChild(wkcur.loader)
    },
    hideLoader: function() {
        wkcur.loader && (wkcur.loader.parentNode.removeChild(wkcur.loader), wkcur.loader = !1, removeClass("story_view_" + wkcur.storyOwner, "story_view_loading"))
    },
    resetPrevStory: function() {
        var e = wkcur.storyOwner;
        if (e) {
            var r = ge("story_view_" + wkcur.storyOwner),
                o = geByClass1("story_view_row_cont_preview", r);
            r && (removeClass(r, "story_view_row_active"), removeClass(r, "loaded"), setStyle(o, "background-image", "url(" + attr(o, "data-preview") + ")"), removeClass(geByClass1("story_view_back", r), "can_back"), Stories.hideAnswerForm(), val(geByClass1("story_view_date", r), ""), this.timersStop(), this.destroyStory(), wkcur.formAnimTimer = 0, wkcur.answerFormShown = 0)
        }
    },
    nextStory: function() {
        var e = wkcur.globalStories[wkcur.storyOwner],
            r = ge("story_view_" + wkcur.storyOwner);
        if (e) return Stories.timeLineUpdateStop(), setStyle(geByClass1("_story_view_timeline_progress" + wkcur.storyIndex, r), "transform", "translateX(100%)"), wkcur.storyIndex++, wkcur.storyIndex >= e.length ? Stories.nextOwner() : void Stories.playStory()
    },
    prevStory: function() {
        var e = ge("story_view_" + wkcur.storyOwner);
        return Stories.timeLineUpdateStop(), setStyle(geByClass1("_story_view_timeline_progress" + wkcur.storyIndex, e), "transform", "translateX(0px)"), wkcur.storyIndex--, wkcur.storyIndex < 0 ? Stories.prevOwner() : void Stories.playStory()
    },
    nextOwner: function() {
        var e, r = wkcur.storiesList,
            o = r.indexOf(wkcur.storyOwner);
        return -1 == o || o >= r.length - 1 ? Stories.hideLayer() : (e = r[o + 1], void this.startStory(e, 1))
    },
    prevOwner: function() {
        var e, r = wkcur.storiesList,
            o = r.indexOf(wkcur.storyOwner);
        return -1 == o || 0 >= o ? Stories.hideLayer() : (e = r[o - 1], wkcur.closeAfterNewStories = 0, void this.startStory(e))
    },
    timeLineUpdateStop: function() {
        var e = window.requestAnimationFrame ? window.cancelAnimationFrame : window.clearTimeout;
        e(wkcur.timelineAnim)
    },
    timeLineUpdateStart: function() {
        var e, r = window.requestAnimationFrame || function(e) {
                return setTimeout(e, 50)
            },
            o = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        e = "video" == o.type && wkcur.video ? wkcur.video.currentTime : vkNow() - wkcur.startTs;
        var t = Math.min(100, e / wkcur.duration * 100),
            s = ge("story_view_" + wkcur.storyOwner);
        setStyle(geByClass1("_story_view_timeline_progress" + wkcur.storyIndex, s), "transform", "translateX(" + t + "%)"), 100 > t && !wkcur.storyDown && (wkcur.timelineAnim = r(Stories.timeLineUpdateStart))
    },
    resetTimeLine: function() {
        var e = ge("story_view_" + wkcur.storyOwner),
            r = geByClass("story_view_timeline_progress", e);
        for (var o in r) setStyle(r[o], "transform", "translateX(0px)")
    },
    checkEvent: function(e, r) {
        ge("story_view_" + wkcur.storyOwner);
        if (e) {
            if (e && (2 == e.button || "A" == e.target.tagName)) return !1;
            for (var o = e.target; o && !hasClass(o, "story_view_row");) {
                if (hasClass(o, "story_view_answer_form") || hasClass(o, "story_view_head") || hasClass(o, "story_view_feedback_buttons") || hasClass(o, "story_view_timeline_wrap")) return -1;
                o = o.parentNode
            }
        }
        return !wkcur.answerFormShown || r && r != wkcur.storyOwner ? !0 : !1
    },
    onMouseDown: function(e, r) {
        if (window.wkcur && wkcur.globalStories) {
            if (e && hasClass(e.target, "story_view_row") && !hasClass(e.target, "story_view_row_active")) return Stories.hideLayer();
            var o = this.checkEvent(e);
            if (1 == o) {
                if (!wkcur.storyDown) {
                    var t = wkcur.globalStories[wkcur.storyOwner],
                        s = t ? t[wkcur.storyIndex] : !1;
                    wkcur.storyDown = 1, this.timersStop(), this.downTs = vkNow(), s && "video" == s.type && wkcur.video && wkcur.video.pause()
                }
            } else if (wkcur.answerFormShown && !wkcur.answerSending && (-1 != o || e && hasClass(e.target, "story_view_answer_form_bg"))) {
                var i = geByClass1("story_view_answer_form_text", "story_view_" + wkcur.storyOwner);
                trim(Emoji.editableVal(i)) || Stories.hideAnswerForm(r)
            }
        }
    },
    onMouseUp: function(e, r) {
        e = e || wkcur.storyOwner, wkcur.storyDown && !curBox() && 1 == this.checkEvent(r, e) && (wkcur.storyDown = 0, vkNow() - this.downTs > 300 && wkcur.storyOwner == e || !r ? this.restoreTimers() : hasClass(r.target, "story_view_back") ? this.prevStory() : this.startStory(e))
    },
    timersStop: function() {
        this.timeLineUpdateStop(), clearTimeout(wkcur.photoTimer), clearTimeout(wkcur.showLoaderTimer), clearTimeout(wkcur.startStoryTimer), clearTimeout(wkcur.loadedTimer), clearTimeout(wkcur.removeVideoPhotohelper), clearTimeout(wkcur.formAnimTimer)
    },
    restoreTimers: function() {
        var e = wkcur.globalStories[wkcur.storyOwner],
            r = e ? e[wkcur.storyIndex] : !1;
        r && r.can_view && (this.hideAnswerForm(), wkcur.startTs += vkNow() - this.downTs, this.timeLineUpdateStart(), "photo" == r.type ? wkcur.photoTimer = setTimeout(Stories.nextStory, wkcur.duration - (vkNow() - wkcur.startTs)) : wkcur.video && wkcur.video.play())
    },
    initFeed: function() {
        function e() {
            addEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel)
        }

        function r() {
            removeEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel)
        }
        var o = ge("stories_feed_items_container");
        Stories.updateFeedArrows(), addEvent(o, "mouseenter", e), addEvent(o, "mouseleave", r), addEvent(window, "scroll", Stories.onWinScroll), cur.destroy.push(function() {
            removeEvent(window, "scroll", Stories.onWinScroll), removeEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel), removeEvent(o, "mouseenter", e), removeEvent(o, "mouseleave", r)
        })
    },
    onWinScroll: function(e) {
        var r = window.scrollGetY();
        r > 400 || r != cur.lastWinScroll && (cur.lastWinOnScroll = vkNow(), cur.lastWinScroll = r)
    },
    showFeedStory: function(e, r) {
        if (!r.metaKey && !r.ctrlKey) {
            var o = {
                w: "story" + e,
                query: JSON.stringify({
                    from_feed: 1
                })
            };
            return storiesUserId = nav.fromStr(nav.strLoc).stories_user_id, storiesUserId && (o.stories_user_id = storiesUserId), showWiki(o), cancelEvent(r)
        }
    },
    feedNext: function() {
        return this.feedPaging("next")
    },
    feedPrev: function() {
        return this.feedPaging("prev")
    },
    feedPaging: function(e, r) {
        var o = cur.storiesPos || 0,
            t = geByClass1("stories_feed_wrap"),
            s = ge("stories_feed_items"),
            i = getSize(t)[0];
        if (isNumeric(e)) o += e;
        else {
            var a = i - 80;
            "next" == e ? o += a : o -= a
        }
        cur.storiesPos = Math.max(0, Math.min(o, s.scrollWidth - i)), r ? removeClass(s, "animated") : addClass(s, "animated"), setStyle(s, "transform", "translateX(-" + cur.storiesPos + "px)"), Stories.updateFeedArrows()
    },
    updateFeedStories: function(e) {
        var e = e || "news";
        ge("stories_feed_items") && ("news" != e ? hide("stories_feed_wrap") : show("stories_feed_wrap"), ajax.post("al_stories.php", {
            act: "feed_stories"
        }, {
            onDone: function(e) {
                var r = ge("stories_feed_items");
                r && (e ? (setStyle(r, "transform", "translateX(0px)"), val(r, e), r.children.length < 8 ? addClass("stories_feed_wrap", "stories_feed_not_nav_buttons") : removeClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) : re("stories_feed_wrap"), cur.storiesPos = 0, Stories.updateFeedArrows())
            }
        }))
    },
    feedMouseWheel: function(e) {
        if (!(hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons") || vkNow() - cur.lastWinOnScroll < 300)) {
            cancelEvent(e);
            var r = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            Stories.feedPaging(r, 1)
        }
    },
    updateFeedArrows: function() {
        var e = ge("stories_feed_items");
        if (e) {
            cur.storiesPos || (cur.storiesPos = 0);
            var r = geByClass1("stories_feed_wrap").offsetWidth,
                o = e.scrollWidth - r;
            0 == cur.storiesPos ? addClass("stories_feed_arrow_left", "disabled") : removeClass("stories_feed_arrow_left", "disabled"), cur.storiesPos == o || 0 >= o ? addClass("stories_feed_arrow_right", "disabled") : removeClass("stories_feed_arrow_right", "disabled")
        }
    },
    readStories: function() {
        if (wkcur.readStories.length) {
            var e = clone(wkcur.readStories);
            wkcur.readStories = [], ajax.post("al_stories.php", {
                act: "read_stories",
                hash: wkcur.readStoriesHash,
                stories: e.join(",")
            }, {
                onDone: function() {
                    for (var r = {}, o = 0; o < e.length; o++) {
                        var t = e[o].split("_");
                        r[intval(t[0])] = 1
                    }
                    for (var s in r) removeClass("feed_story_" + s, "story_feed_new_item")
                }
            })
        }
    },
    showAnswerForm: function() {
        var e = ge("story_view_" + wkcur.storyOwner),
            r = geByClass1("story_view_result", e);
        if (!wkcur.formAnimTimer && !geByClass1("story_view_answer_form", r)) {
            this.onMouseDown();
            var o = se(wkcur.answerFormTpl);
            r.appendChild(o);
            var t = geByClass1("_answer_button", e),
                s = geByClass1("_cancel_answer_button", e);
            setStyle(s, "width", getSize(t)[0] + "px"), addClass(t, "hide"), removeClass(s, "hide"), addClass(e, "story_view_row_form_anim"), addClass(e, "story_view_row_form_shown"), addClass(o, "story_view_answer_form_shown");
            var i = geByClass1("story_view_answer_form_text", r);
            wkcur.emojiLastId = Emoji.init(i, {
                ttDiff: 93,
                noStickers: !0,
                noStickersStore: !0,
                rPointer: !0,
                onSend: Stories.onAnswerSend,
                forceUp: !0,
                ref: "stories",
                controlsCont: e
            }), wkcur.formAnimTimer = setTimeout(function() {
                wkcur.formAnimTimer = 0, removeClass(e, "story_view_row_form_anim"), Emoji.editableFocus(i, !1, 1)
            }, 200), wkcur.answerFormShown = 1
        }
    },
    hideAnswerForm: function(e) {
        var r = ge("story_view_" + wkcur.storyOwner),
            o = geByClass1("story_view_answer_form", r);
        o && !wkcur.formAnimTimer && (wkcur.answerFormShown = 0, addClass(geByClass1("_cancel_answer_button", r), "hide"), removeClass(geByClass1("_answer_button", r), "hide"), addClass(r, "story_view_row_form_anim"), removeClass(r, "story_view_row_form_shown"), removeClass(o, "story_view_answer_form_shown"), wkcur.answerSending = 0, Emoji.opts[wkcur.emojiLastId] && (Emoji.ttHide(wkcur.emojiLastId, !1, !1, !0), Emoji.destroy(wkcur.emojiLastId)), wkcur.formAnimTimer = setTimeout(function() {
            wkcur.formAnimTimer = 0, re(o), re(geByClass1("story_view_sent_answer_msg", r)), removeClass(r, "story_view_row_form_anim"), e ? Stories.onMouseDown() : (wkcur.storyDown = 0, Stories.restoreTimers())
        }, 200))
    },
    onAnswerSend: function() {
        if (!wkcur.answerSending) {
            var e = ge("story_view_" + wkcur.storyOwner),
                r = geByClass1("story_view_result", e),
                o = geByClass1("story_view_answer_form_text", r),
                t = geByClass1("story_view_answer_form_send_btn", r),
                s = trim(Emoji.editableVal(o));
            if (!s) return o.focus();
            s = s.substr(0, 1e3);
            var i = '<div class="story_view_loader_send_answer"><svg class="story_view_loader_circular" viewBox="25 25 50 50"><circle class="story_view_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" /></svg></div>';
            addClass(t, "sending"), val(t, i), wkcur.answerSending = 1;
            var a = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex],
                n = "";
            a.pm_hash && (n = "_pm_hash" + a.pm_hash), ajax.post("al_im.php", {
                act: "a_send",
                msg: s,
                hash: val(geByClass1("_answer_hash", e)),
                media: "story:" + a.id + n,
                to: wkcur.storyOwner
            }, {
                onDone: function() {
                    r.appendChild(ce("div", {
                        innerHTML: "<span>" + cur.lang.stories_answer_sent + "</span>",
                        className: "story_view_sent_answer_msg"
                    })), fadeIn(geByClass1("story_view_sent_answer_msg", r), 200);
                    var o = geByClass1("story_view_answer_form", e);
                    hide(o), addClass(geByClass1("_cancel_answer_button", e), "hide"), removeClass(geByClass1("_answer_button", e), "hide"), setTimeout(Stories.hideAnswerForm, 2e3)
                },
                onFail: function() {
                    removeClass(t, "sending"), val(t, ""), wkcur.answerSending = 0
                }
            })
        }
    },
    shareBox: function() {
        Stories.onMouseDown(!1, !0);
        var e = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        showBox("like.php", {
            act: "publish_box",
            object: "story" + e.id,
            from: "wkview",
            pm_hash: e.pm_hash
        }, {
            onDone: function() {
                Stories.onMouseDown()
            },
            params: {
                onHide: function() {
                    Stories.onMouseUp()
                }
            }
        })
    },
    removeBox: function() {
        Stories.onMouseDown(), showFastBox({
            title: getLang("global_warning"),
            onHide: function() {
                Stories.onMouseUp()
            }
        }, cur.lang.stories_remove_warning, cur.lang.stories_remove_confirm, Stories.remove, getLang("global_cancel"))
    },
    remove: function(e) {
        var r = ge("story_view_" + wkcur.storyOwner);
        curBox().showProgress(), curBox().showCloseProgress();
        var o = curBox().btns;
        hide(o.ok[0], o.cancel[0]);
        var t = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        ajax.post("al_stories.php", {
            act: "remove_story",
            story_raw: t.id,
            hash: wkcur.removeStoryHash
        }, {
            onDone: function() {
                curBox().hide(), wkcur.globalStories[wkcur.storyOwner].splice(wkcur.storyIndex, 1), 0 == wkcur.globalStories[wkcur.storyOwner].length ? Stories.removeOwner() : (re(geByClass1("story_view_timeline_wrap", r).lastChild), Stories.playStory())
            },
            onFail: function() {
                show(o.ok[0], o.cancel[0]), curBox().hideProgress(), curBox().hideCloseProgress()
            }
        })
    },
    removeOwner: function() {
        re("story_view_" + wkcur.storyOwner);
        var e = wkcur.storiesList.indexOf(wkcur.storyOwner);
        wkcur.storiesList.splice(e, 1), delete wkcur.globalStories[wkcur.storyOwner], wkcur.storiesList.length - 1 >= e ? Stories.startStory(wkcur.storiesList[e]) : Stories.hideLayer()
    },
    viewsBox: function() {
        function e() {
            var e = ge("story_views_more_link"),
                r = ge("story_views_more_link_trigger");
            isVisible(r) && boxLayerWrap.scrollHeight - 500 < boxLayerWrap.scrollTop + boxLayerWrap.offsetHeight && (hide(r), e.click())
        }
        this.onMouseDown();
        var r = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        showBox("al_stories.php", {
            act: "views_box",
            story_raw: r.id
        }, {
            params: {
                onHide: function() {
                    removeEvent(window.boxLayerWrap, "scroll", e), Stories.onMouseUp()
                }
            },
            onDone: function(r, o) {
                wkcur.viewsNextFrom = 0, o ? addEvent(window.boxLayerWrap, "scroll", e) : (re("story_views_more_link"), re("story_views_more_link_trigger"))
            }
        })
    },
    viewsMore: function() {
        var e = ge("story_views_wrap"),
            r = ge("story_views_more_link"),
            o = wkcur.globalStories[wkcur.storyOwner][wkcur.storyIndex];
        wkcur.viewsNextFrom += 40, ajax.post("al_stories.php", {
            act: "views_box",
            story_raw: o.id,
            offset: wkcur.viewsNextFrom
        }, {
            onDone: function(o, t) {
                for (var s = ce("div", {
                        innerHTML: o
                    }), i = domFC(s); i; i = domFC(s)) e.appendChild(i);
                t ? show("story_views_more_link_trigger") : (re(r), re("story_views_more_link_trigger"))
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        })
    },
    checkClose: function(e) {
        for (var r = e.target; r;) {
            if (hasClass(r, "story_view_row")) return;
            if (hasClass(r, "stories_view_cont")) break;
            r = r.parentNode
        }
        Stories.hideLayer()
    },
    formInputKeyDown: function(e) {
        if (e.keyCode == KEY.ESC) {
            if (window.Emoji && Emoji.shown) return;
            Stories.hideAnswerForm(), cancelEvent(e)
        }
    },
    destroyPreload: function() {
        if (wkcur.preloadEl)
            for (var e = 0; e < wkcur.preloadEl.length; e++) wkcur.preloadEl[e].src = "", re(wkcur.preloadEl[e]);
        wkcur.preloadEl = []
    },
    preloadNext: function() {
        var e = !1;
        Stories.destroyPreload();
        var r = wkcur.globalStories[wkcur.storyOwner];
        if (r.length - 1 > wkcur.storyIndex) e = r[wkcur.storyIndex + 1];
        else {
            var o = wkcur.storiesList[wkcur.storiesList.indexOf(wkcur.storyOwner) + 1];
            o && (e = wkcur.globalStories[o][0])
        }
        if (e) {
            var t = !1;
            "video" == e.type ? (t = ce("video", {
                src: e.src,
                preload: "auto"
            }), t.load(), wkcur.preloadEl.push(ce("img", {
                src: e.video_first_frame
            }))) : (t = vkImage(), t.src = e.src), wkcur.preloadEl.push(t)
        }
    },
    tryLoadAgain: function(e) {
        cancelEvent(e), Stories.playStory(1)
    },
    volumeButtonUpdate: function(e) {
        var r = ls.get("stories_video_muted") || 0;
        r ? addClass(e, "muted") : removeClass(e, "muted"), wkcur.video && (r ? wkcur.video.volume = 0 : wkcur.video.volume = 1)
    },
    muteButtonPress: function(e, r) {
        cancelEvent(e);
        var o = ls.get("stories_video_muted") || 0;
        ls.set("stories_video_muted", !o), this.volumeButtonUpdate(r)
    },
    hideLayer: function() {
        if (!wkcur.hidden) {
            Stories.onMouseDown(), wkcur.hidden = 1;
            var e = ge("feed_story_" + wkcur.storyOwner);
            if (!e || scrollGetY() > 500) return WkView.hide(!1, !0);
            var r = geByClass1("stories_feed_item_ava_img", e),
                o = getSize(r),
                t = geByClass1("story_view_row_active", "stories_view_cont"),
                s = geByClass1("story_view_row_cont_wrap", t),
                i = cur.storiesPos + getSize("stories_feed_items")[0] - 30,
                a = getSize(r)[0];
            e.offsetLeft < cur.storiesPos ? Stories.feedPaging(e.offsetLeft - cur.storiesPos, 1) : i < e.offsetLeft + a && Stories.feedPaging(e.offsetLeft + a - i, 1);
            var n = getSize(t),
                c = getXY(e),
                w = getXY(t);
            removeClass(r, "stories_feed_item_ava_animate"), setStyle(r, {
                transform: "scale(0.03)"
            }), layers.hide(), addClass(wkcur.wkBox, "story_view_hiding");
            var u = .01,
                l = c[1] - w[1] - n[1] / 2 + o[1] / 2,
                d = c[0] - w[0] - n[0] / 2 + o[0] / 2 + 10;
            setStyle(s, {
                transform: "scale(" + u + ")"
            }), setStyle(t, {
                transform: "translate(" + d + "px, " + l + "px)",
                opacity: .3
            }), addClass(r, "stories_feed_item_ava_animate"), setStyle(r, {
                transform: "scale(1)"
            }), setTimeout(function() {
                WkView.hide(!1, !0)
            }, 270)
        }
    },
    showActions: function(e, r) {
        if (hasClass(e, "shown")) Stories.onMouseUp(), uiActionsMenu.hide(e);
        else {
            Stories.onMouseDown(!1, !0);
            var o = geByClass1("_ui_menu", e);
            setStyle(o, "margin-right", -(getSize(o)[0] / 2) + "px"), uiActionsMenu.show(e, r)
        }
    },
    showBlackList: function() {
        window.wkcur && Stories.onMouseDown(!1, !0), showBox("al_stories.php", {
            act: "black_list"
        }, {
            onDone: function() {
                cur.storiesBlackListScroll = new uiScroll("stories_black_list_result")
            }
        })
    },
    blackListItemClick: function(e, r) {
        cancelEvent(r);
        var o = intval(attr(e, "data-id"));
        cur.storiesBlackListShown[o] ? (delete cur.storiesBlackListShown[o], removeClass(e, "olist_item_wrap_on")) : (cur.storiesBlackListShown[o] = 1, addClass(e, "olist_item_wrap_on"))
    },
    saveBlackList: function(e) {
        var r = Object.keys(cur.storiesBlackListShown);
        return 0 == r.length ? void curBox().hide() : (lockButton(e), void ajax.post("al_stories.php", {
            act: "save_blacklist",
            hash: cur.storiesBlackList.hash,
            list: r.join(",")
        }, {
            onDone: function() {
                curBox().hide(), Stories.updateFeedStories()
            },
            onFail: function() {
                unlockButton(e)
            }
        }))
    },
    addToBlacklist: function() {
        Stories.onMouseDown(!1, !0), showFastBox({
            title: cur.lang.stories_add_blacklist_title,
            onHide: function() {
                Stories.onMouseUp()
            }
        }, wkcur.storyOwner < 0 ? cur.lang.stories_add_blacklist_message_group : cur.lang.stories_add_blacklist_message, cur.lang.stories_add_blacklist_button, Stories.doAddToBlacklist, getLang("global_cancel"))
    },
    doAddToBlacklist: function(e) {
        lockButton(e), ajax.post("al_stories.php", {
            act: "blacklist_add",
            owner_id: wkcur.storyOwner,
            hash: wkcur.blacklistAddHash
        }, {
            onDone: function() {
                curBox().hide(), Stories.removeOwner(), wkcur.needRefreshFeedStories = !0
            },
            onFail: function() {
                unlockButton(e)
            }
        })
    },
    blacklistUpdateUsers: function(e) {
        var r = e;
        if (e = trim(e).toLowerCase(), cur.storiesBlacklistLastQ !== e) {
            cur.storiesBlacklistLastQ = e;
            var o = e ? cur.storiesIndexer.search(e) : cur.storiesBlackList.users;
            if (e) {
                for (var t = [], s = 0; s < e.length; s++) t.push(e.substr(s, 1));
                var i = new RegExp(t.join(".*?"), "i")
            }
            for (var a = "", s = 0; s < o.length; s++) {
                var n = o[s],
                    c = e ? n.name.replace(i, function(e) {
                        return "<em>" + e + "</em>"
                    }) : n.name;
                a += cur.storiesBlackList.tpl.replace(/\{id\}/g, n.id).replace("{photo}", n.photo).replace("{name}", c).replace("{href}", n.href).replace("{class_name}", cur.storiesBlackListShown[n.id] ? " olist_item_wrap_on" : "")
            }
            a || (a = '<div class="no_rows">' + getLang("global_search_not_found").replace("{search}", clean(r)) + "</div>"), val(geByClass1("olist", "stories_black_list_result"), a)
        }
    },
    blackListInit: function(e) {
        cur.storiesBlackListShown = {}, cur.storiesBlackList = e, curBox().setOptions({
            width: 450,
            bodyStyle: "padding: 0px",
            onClean: function() {
                window.wkcur && Stories.onMouseUp(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
            }
        }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, function(e) {
            return e.name
        }, function() {
            Stories.blacklistUpdateUsers("")
        }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(getLang("global_save"), Stories.saveBlackList).addButton(getLang("global_cancel"), void 0, "no")) : curBox().addButton(getLang("global_close"))
    },
    logPromoConversion: function(e) {
        ajax.post("al_index.php", {
            act: "story_promo_log",
            owner_id: e
        })
    }
};
try {
    stManager.done("stories.js")
} catch (e) {}