! function(t) {
    function e(s) {
        if (o[s]) return o[s].exports;
        var r = o[s] = {
            exports: {},
            id: s,
            loaded: !1
        };
        return t[s].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }
    var o = {};
    return e.m = t, e.c = o, e.p = "", e(0)
}([function(t, e, o) {
    t.exports = o(14)
}, function(t, e, o) {
    "use strict";

    function s() {
        v || (v = new Worker("/js/al/stories_loader_worker.js"), v.onmessage = function(t) {
            var e = t.data;
            switch (e.type) {
                case "loaded":
                    _[e.url] = e.data, i(e.url, !0, e.data);
                    break;
                case "error":
                    i(e.url, !1);
                    break;
                case "inited":
                    m = !0;
                    for (var o = 0; o < f.length; o++) n(f[o])
            }
        })
    }

    function r(t) {
        return t.match(/\.mp4/) ? "video" : t.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
    }

    function i(t, e, o) {
        var s = y[t];
        if (s)
            for (var r = 0; r < s.length; r++) {
                var i = s[r];
                e ? i.resolve(o) : i.reject(), s.splice(r, 1), r--
            }
    }

    function n(t, e) {
        v.postMessage({
            cmd: "load",
            url: t
        })
    }

    function a(t) {
        return s(), new p.Promise(function(e, o) {
            if (t || e(""), _[t]) return e(_[t]);
            var s = r(t);
            switch (s) {
                case "video":
                case "image":
                    y[t] || (y[t] = []);
                    var i = 0 === y[t].length;
                    if (y[t].push({
                            resolve: e,
                            reject: o
                        }), !i) return;
                    m ? n(t) : f.push(t);
                    break;
                default:
                    vk.dev && console.error("wrong media url")
            }
        })
    }

    function l() {
        var t = utilsNode.appendChild(ce("iframe")),
            e = d(t);
        g = e && e.body ? e.body : utilsNode.appendChild(ce("div", {}, {
            display: "none"
        }))
    }

    function d(t) {
        try {
            return t.contentDocument ? t.contentDocument : t.contentWindow && t.contentWindow.document ? t.contentWindow.document : t.document
        } catch (e) {}
        return !1
    }

    function c(t) {
        return new p.Promise(function(e, o) {
            var s = ce("video");
            s.oncanplay = function() {
                e(), re(s)
            }, s.onerror = function() {
                o(), re(s)
            }, g.appendChild(s), s.src = t
        })
    }

    function h(t) {
        return new p.Promise(function(e, o) {
            var s = vkImage();
            s.onload = function() {
                e(), re(s)
            }, s.onerror = function() {
                o(), re(s)
            }, g.appendChild(s), s.src = t
        })
    }

    function u(t) {
        return g || l(), t.match(/\.mp4/) ? c(t) : h(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.loadMedia = a, e["default"] = u;
    var p = o(15),
        _ = {},
        y = {},
        f = [],
        v = !1,
        m = !1,
        g = !1
}, function(t, e) {
    "use strict";

    function o(t, e) {
        cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = t, ge("stories_layers_background") || d(), t.animateStory("expand", e.fromEl), y.push(t), t.length > 1 && addClass(t.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + y.length, function() {
            y.length > 1 ? t.back(!0) : t.hide(!1, !0)
        }), Stories.layerShowStatSend()
    }

    function s() {
        y.pop(), cur.storyLayer = y[y.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())
    }

    function r() {
        y.length > 1 && (y[y.length - 2].setLayerVisibility(!1), y[y.length - 1].showBackButton())
    }

    function i() {
        y.length > 1 ? y[y.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
    }

    function n(t) {
        for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1, o = 0; o < y.length; o++) y[o].hide(!0);
        if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), c(), e) {
            var s = nav.objLoc;
            delete s.w, nav.setLoc(s)
        }
        cur.needUpdateFeedStories && Stories.updateFeedStories(), y = []
    }

    function a() {
        return y.length
    }

    function l() {
        cur.storyLayer && cur.storyLayer.back()
    }

    function d() {
        bodyNode.appendChild(ce("div", {
            id: "stories_layers_background",
            className: "stories_layers_background"
        })), layerQueue.hide(), layerQueue.push(), layers.fullhide = n, addEvent(window, "visibilitychange", f.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", f.resize), addEvent(document, "keydown", f.keydown), addEvent(document, "keyup", f.keyup)
    }

    function c() {
        removeEvent(window, "visibilitychange", f.visibilitychange), removeEvent(window, "resize", f.resize), removeEvent(document, "keydown", f.keydown), removeEvent(document, "keyup", f.keyup)
    }

    function h() {
        return y[0]
    }

    function u() {
        return y[y.length - 2]
    }

    function p() {
        for (var t = y.length - 2; t >= 0; t--) y[t].doHide(!0);
        y.splice(0, y.length - 1)
    }

    function _(t) {
        for (var e = 0; e < y.length; e++) y[e].onReplyDeleted(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.addLayer = o, e.removeLayer = s, e.layerShown = r, e.layerHide = i, e.hideAllLayers = n, e.getCount = a, e.back = l, e.getFirstLayer = h, e.getPrevLayer = u, e.slicePrevLayers = p, e.onReplyDeleted = _;
    var y = [],
        f = {
            visibilitychange: function(t) {
                cur.storyLayer && cur.storyLayer.onVisibilityChange(t)
            },
            resize: function(t) {
                cur.storyLayer && cur.storyLayer.onResize(t)
            },
            keydown: function(t) {
                cur.storyLayer && cur.storyLayer.onKeyDown(t)
            },
            keyup: function(t) {
                cur.storyLayer && cur.storyLayer.onKeyUp(t)
            }
        }
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
}, function(t, e, o) {
    "use strict";

    function s(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
            function t(t, e) {
                var o = [],
                    s = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var n, a = t[Symbol.iterator](); !(s = (n = a.next()).done) && (o.push(n.value), !e || o.length !== e); s = !0);
                } catch (l) {
                    r = !0, i = l
                } finally {
                    try {
                        !s && a["return"] && a["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = o(1),
        l = r(a),
        d = o(12),
        c = s(d),
        h = o(2),
        u = s(h),
        p = o(8),
        _ = r(p),
        y = o(7),
        f = r(y),
        v = function() {
            function t(e, o) {
                i(this, t), this.data = e, this.opts = o, this.id = o.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = o.layer
            }
            return t.prototype.destroy = function() {
                this._destroyStory(), removeEvent(geByClass1("stories_item_cont", this.contWrap)), removeEvent(geByClass1("stories_reply_to", this.replyToWrap)), removeEvent(this.sendFormTextEl), delete this.sendFormTextEl, removeEvent(this.sendFormButton), delete this.sendFormButton, this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId), removeEvent(this.actionsEl), delete this.actionsEl, removeEvent(this.shareButton), delete this.shareButton, removeEvent(this.maskButton), delete this.maskButton, removeEvent(this.followBtn), delete this.followBtn, removeEvent(this.answersWrap), delete this.answersWrap, removeEvent(this.answersEl), delete this.answersEl, clearTimeout(this.actionsDDTimer), clearTimeout(this.showMessageTimer);
                for (var t = geByClass("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) removeEvent(t[e]);
                removeEvent(this.viewsButton), removeEvent(geByClass1("stories_feedback_close", this.wrapEl)), removeEvent(geByClass1("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.dateEl, delete this.replyToWrap, delete this.viewsButton, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var o = !1, s = 0; s < this.data.items.length; s++)
                    if (this.data.items[s].unread) {
                        o = !0;
                        break
                    }
                var r = u.getPrevLayer();
                !o && r && r.activeStory && removeClass(domQuery("#feed_story_" + this.getOwnerId(), r.activeStory.wrapEl)[0], "story_feed_new_item")
            }, t.prototype._destroyTimeLine = function() {
                for (var t = geByClass("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) removeEvent(t[e])
            }, t.prototype.getOwnerId = function() {
                return this.data.author.id
            }, t.prototype.getIndex = function() {
                return this.index
            }, t.prototype.isLastStory = function() {
                return this.index >= this.data.items.length - 1
            }, t.prototype.getRawId = function() {
                return this.story ? this.story.getId() : !1
            }, t.prototype.getReadHash = function() {
                return this.data.read_hash
            }, t.prototype.render = function() {
                var t = this.data.author.id === vk.id;
                this.wrapEl = ce("div", {
                    className: "stories_item"
                }), this.contWrap = ce("div", {
                    className: "stories_item_cont_wrap"
                }), this.wrapEl.appendChild(this.contWrap);
                var e = ce("div", {
                    className: "stories_item_cont"
                });
                addEvent(e, "mousedown", this._onMouseDownHandle.bind(this)), addEvent(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor());
                var o = ce("div", {
                        className: "stories_bottom_tools_wrap"
                    }),
                    s = void 0;
                return s = t ? o.appendChild(this._renderAuthorTools()) : o.appendChild(this._renderTools()), e.appendChild(o), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                    className: "stories_item_back"
                }), e.appendChild(this.backButton)), this.replyToWrap = e.appendChild(ce("div", {
                    className: "stories_reply_to_wrap"
                })), t || (this.answersWrap = s.appendChild(ce("div", {
                    className: "stories_answers_wrap"
                }))), this.inlineLoader = e.appendChild(ce("div", {
                    className: "stories_inline_loader",
                    innerHTML: getProgressHtml()
                })), e.appendChild(ce("div", {
                    className: "stories_play_button video_thumb_play"
                })), this._initTimeLine(), toggleClass(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }, t.prototype._canForceDeleteStories = function() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }, t.prototype._initTimeLine = function() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl));
                var t = geByClass1("stories_item_cont", this.contWrap);
                t.appendChild(this._renderTimeLine())
            }, t.prototype._renderAuthorTools = function() {
                var t = ce("div", {
                    className: "stories_bottom_tools stories_author_bottom_tools"
                });
                this.viewsButton = ce("div", {
                    className: "stories_button views",
                    innerHTML: '<span class="_stories_views"></span><div class="stories_button_replies_ic"></div><span class="_stories_replies"></span>'
                }), addEvent(this.viewsButton, "click", this.showFeedbackTooltip.bind(this)), t.appendChild(this.viewsButton);
                var e = t.appendChild(ce("div"));
                return e.appendChild(this._renderShareButton()), e.appendChild(this._renderDeleteButton()), t
            }, t.prototype._renderDeleteButton = function() {
                var t = ce("div", {
                    className: "stories_button remove"
                });
                return addEvent(t, "click", this.removeStoryBox.bind(this)), t
            }, t.prototype._renderTools = function() {
                var t = ce("div", {
                    className: "stories_bottom_tools _emoji_field_wrap"
                });
                this.linkEl = t.appendChild(this._renderLink()), t.appendChild(this._renderSendForm());
                var e = t.appendChild(ce("div", {
                    className: "stories_bottom_buttons"
                }));
                return e.appendChild(this._renderMaskButton()), e.appendChild(this._renderShareButton()), this._canForceDeleteStories() && e.appendChild(this._renderDeleteButton()), this.data.hide_settings || e.appendChild(this._renderActions()), this.sendFormTextEl && (this.emojiId = Emoji.init(this.sendFormTextEl, {
                    ttDiff: 93,
                    noStickers: !0,
                    noStickersStore: !0,
                    rPointer: !0,
                    onSend: this._onAnswerSend.bind(this),
                    forceUp: !0,
                    controlsCont: this.wrapEl,
                    onKeyAction: this._emojiOnKeyAction.bind(this),
                    onEmojiAdded: this._emojiOnKeyAction.bind(this)
                })), t
            }, t.prototype._renderActions = function() {
                this.actionsEl = ce("div", {
                    className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions"
                });
                var t = ce("div", {
                    className: "ui_actions_menu _ui_menu"
                });
                return this.data.can_blacklist && t.appendChild(this._renderActionsItem(getLang("stories_add_blacklist_button"), this._addToBlacklist.bind(this))), t.appendChild(this._renderActionsItem(getLang("stories_hide_reply_button"), this._hideReply.bind(this), "stories_can_hide_reply_action")), t.appendChild(this._renderActionsItem(getLang("stories_settings"), Stories.showBlackList)), this.actionsEl.appendChild(t), addEvent(this.actionsEl, "mouseover", this._showActions.bind(this)), addEvent(this.actionsEl, "mouseout", this._hideActions.bind(this)), this.actionsEl
            }, t.prototype._showActions = function(t) {
                clearTimeout(this.actionsDDTimer), this.pauseStory(), uiActionsMenu.show(this.actionsEl, t)
            }, t.prototype._hideActions = function() {
                var t = this;
                uiActionsMenu.hide(this.actionsEl), clearTimeout(this.actionsDDTimer), this.actionsDDTimer = setTimeout(function() {
                    t.playStory()
                }, 300)
            }, t.prototype._isActionsShown = function() {
                var t = domClosest("_ui_menu_wrap", this.actionsEl);
                return hasClass(t, "shown")
            }, t.prototype._renderActionsItem = function(t, e) {
                var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    s = ce("div", {
                        className: "ui_actions_menu_item " + o,
                        innerHTML: t
                    });
                return addEvent(s, "click", e), s
            }, t.prototype._renderShareButton = function() {
                return this.shareButton = ce("div", {
                    className: "stories_button share"
                }), addEvent(this.shareButton, "click", this.shareBox.bind(this)), this.shareButton
            }, t.prototype._renderMaskButton = function() {
                return this.maskButton = se('<div class="stories_button mask" onmouseover="showTooltip(this, {black: 1, center: 1, shift: [1,13,0], text: \'' + getLang("stories_mask_tooltip") + "'})\"></div>"), addEvent(this.maskButton, "click", this.sendMask.bind(this)), this.maskButton
            }, t.prototype._renderSendForm = function() {
                var t = ce("div", {
                    className: "stories_send_form"
                });
                this.sendFormTextEl = ce("div", {
                    className: "stories_send_form_text dark",
                    contentEditable: !0
                }), attr(this.sendFormTextEl, "placeholder", getLang("stories_answer_placeholder")), addEvent(this.sendFormTextEl, "focus", this._onSendFormFocus.bind(this)), addEvent(this.sendFormTextEl, "blur", this._onSendFormBlur.bind(this)), addEvent(this.sendFormTextEl, "keyup", this._onSendFormKeyUp.bind(this)), t.appendChild(this.sendFormTextEl);
                var e = ce("div", {
                    className: "stories_send_form_helper"
                });
                t.appendChild(e);
                var o = ce("div", {
                        className: "stories_send_form_buttons _emoji_wrap"
                    }),
                    s = ce("div", {
                        className: "stories_send_form_button smile _emoji_btn emoji_smile"
                    });
                return attr(s, "onmouseover", "return Emoji.show(this, event);"), attr(s, "onmouseout", "return Emoji.hide(this, event);"), attr(s, "onmousedown", "return cancelEvent(event);"), attr(s, "onmouseup", "return cancelEvent(event);"), attr(s, "onclick", "return cancelEvent(event);"), o.appendChild(s), this.sendFormButton = ce("div", {
                    className: "stories_send_form_button send"
                }), addEvent(this.sendFormButton, "click", this._onAnswerSend.bind(this)), o.appendChild(this.sendFormButton), e.appendChild(o), t
            }, t.prototype._renderLink = function() {
                return se('<a target="_blank" class="stories_link"></a>')
            }, t.prototype._renderPreview = function() {
                return se('<div class="stories_preview"></div>')
            }, t.prototype._renderMessage = function(t) {
                return se('<div class="stories_message">\n  <div class="stories_message_text">' + t + "</div>\n</div>")
            }, t.prototype._showMessage = function(t) {
                var e = this;
                re(geByClass1("stories_message", this.contWrap));
                var o = this._renderMessage(t);
                return this.contWrap.appendChild(o), clearTimeout(this.showMessageTimer), new Promise(function(t) {
                    e.showMessageTimer = setTimeout(function() {
                        e.contWrap.removeChild(o), t()
                    }, 3e3)
                })
            }, t.prototype._setPreview = function(t) {
                var e = this,
                    o = this.index,
                    s = this.data.items[o].preview_url,
                    r = s;
                r !== this.curPreviewUrl && r && (t = t || geByClass1("stories_preview", this.contWrap), (0, a.loadMedia)(r).then(function(s) {
                    o === e.index && r !== e.curPreviewUrl && (e.curPreviewUrl = r, setStyle(t, "backgroundImage", "url(" + s + ")")), setStyle(t, "opacity", 1)
                }))
            }, t.prototype.getPreview = function() {
                return this.data.items[this.index].preview_url
            }, t.prototype._renderAuthor = function() {
                var t = this.data.author,
                    e = t.photo,
                    o = t.href,
                    s = t.name,
                    r = t.verify,
                    i = se('<div class="stories_author">\n<div class="stories_author_cont_wrap">\n  <div class="stories_author_cont">\n    <a href="' + o + '" class="stories_author_photo_wrap">\n      <img src="' + e + '" class="stories_author_photo" />\n    </a>\n    <a href="' + o + '" class="stories_author_name"><span>' + s + "</span></a>\n    " + (r || "") + '\n    <div class="stories_date"></div>\n  </div>\n  <div class="stories_author_buttons"></div>\n</div></div>');
                return this.data.hide_owner === !0 && val(geByClass1("stories_author_cont", i), ""), toggleClass(this.wrapEl, "hide_owner", this.data.hide_owner === !0), this.dateEl = geByClass1("stories_date", i), this.authorButtons = geByClass1("stories_author_buttons", i), i
            }, t.prototype._renderFollowButton = function() {
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), addEvent(this.followBtn, "click", this._onFollowBtnClick.bind(this)), this.followBtn
            }, t.prototype._renderTimeLine = function() {
                var t = this;
                return this.timeLineEl = ce("div", {
                    className: "stories_time_line"
                }), this.data.items.map(function(e, o) {
                    var s = ce("div", {
                        className: "stories_time_line_item"
                    });
                    addEvent(s, "click", t.changeStory.bind(t, o));
                    var r = ce("div", {
                        className: "stories_time_line_item_cont"
                    });
                    r.appendChild(ce("div", {
                        className: "stories_time_line_item_cont_active"
                    })), s.appendChild(r), t.timeLineEl.appendChild(s)
                }), this.timeLineEl
            }, t.prototype.isPaused = function() {
                return !this.story || this.story.isPaused()
            }, t.prototype.isLoaded = function() {
                return !this.story || this.story.isLoaded()
            }, t.prototype._onMouseDownHandle = function(t) {
                this.isActive && (this.isLocked() || hasClass(t.target, "stories_item_cont") && !this.downTs && (this.downTs = vkNow(), this.story && this.story.pause(), addClass(this.wrapEl, "paused")))
            }, t.prototype._onMouseUpHandle = function(t) {
                var e = this.downTs;
                return delete this.downTs, this.isActive && hasClass(t.target, "stories_item_back") ? this.prevStory() : hasClass(t.target, "stories_item_cont") ? (this._feedbackTTShown && this.hideFeedbackTooltip(), removeClass(this.wrapEl, "paused"), this.isActive ? vkNow() - e < 200 && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed") ? void this._onPlayEnd() : void(this.isPaused() && this.playStory()) : void this.opts.onSelect(this)) : void 0
            }, t.prototype.isLocked = function() {
                return curBox() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") ? !0 : !1
            }, t.prototype.playStory = function() {
                this.isLocked() || (removeClass(this.wrapEl, "paused"), this.story || this._initStory(), this.story.play(), delete this.downTs)
            }, t.prototype.pauseStory = function(t) {
                this.story && (this.isPaused() || (t && addClass(this.wrapEl, "paused"), this.story.pause()))
            }, t.prototype.changeStory = function(t) {
                this.index === t || this.formLocked || (this._destroyStory(), this.index = t, this._setPreview(), this.playStory())
            }, t.prototype.getWrap = function() {
                return this.wrapEl
            }, t.prototype.stop = function() {
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(this.sendFormTextEl, ""), this.formLocked = !1, removeClass(this.wrapEl, "autoplay_failed")
            }, t.prototype._getCurStoryData = function() {
                return this.data.items[this.index]
            }, t.prototype._initStory = function() {
                var t = this._getCurStoryData(),
                    e = t.type;
                this.story && this._destroyStory();
                var o = {
                    onLoadingStart: this._onLoadingStart.bind(this),
                    onLoadingEnd: this._onLoadingEnd.bind(this),
                    onPlay: this._onPlay.bind(this),
                    onPause: this._onPause.bind(this),
                    onError: this._showError.bind(this),
                    onLongLoading: this._showLoader.bind(this),
                    onAutoPlayFail: this._onAutoPlayFail.bind(this)
                };
                if ("video" === e) {
                    this.story = new _["default"](t, o);
                    var s = c.getVolume();
                    s > 0 && this.opts.onVideoPlay(), addClass(this.wrapEl, "video")
                } else "photo" === e && (this.story = new f["default"](t, o), this.opts.onVideoEnd(), removeClass(this.wrapEl, "video"));
                this.fillTimeLine(), val(this.dateEl, t.is_ads ? getLang("stories_is_ad") : this.story.getDate()), this._updateViewsButton(), this.opts.onStartStory(), toggleClass(this.wrapEl, "stories_can_comment", t.can_comment === !0), t.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), t.answers && this.answersWrap && this.answersWrap.appendChild(this._renderAnswers()), this.data.author.can_follow && !this.data.is_promo && this.authorButtons.appendChild(this._renderFollowButton()), toggleClass(this.maskButton, "has_mask", this.hasMask()), toggleClass(this.wrapEl, "with_link", isObject(t.link)), toggleClass(this.actionsEl, "can_hide_reply", t.can_hide_reply === !0), toggleClass(this.wrapEl, "can_share", t.can_share === !0), isObject(t.link) && (attr(this.linkEl, "href", t.link.url), val(this.linkEl, t.link.text)), this._destroyFeedBackTT(), this._updateBottom(), this.contWrap.appendChild(this.story.render())
            }, t.prototype._updateViewsButton = function() {
                if (this.viewsButton) {
                    var t = this.story.getViews(),
                        e = this.story.getReplies();
                    toggleClass(this.viewsButton, "no_views", !t), toggleClass(this.viewsButton, "no_replies", !e.count), toggleClass(this.viewsButton, "empty", !t && !e.count), val(geByClass1("_stories_views", this.viewsButton), t), val(geByClass1("_stories_replies", this.viewsButton), e.count)
                }
            }, t.prototype.hasMask = function() {
                var t = this._getCurStoryData();
                return String(t.mask_id).match(/^(-?\d+)_(\d+)$/)
            }, t.prototype.indexToUnread = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    e = this.data.items,
                    o = 0;
                for (var s in e)
                    if (e[s].unread) {
                        o = intval(s);
                        break
                    }
                return t ? o : (this.index = o, void this._setPreview())
            }, t.prototype.indexToStoryById = function(t) {
                var e = this.data.items,
                    o = -1;
                for (var s in e)
                    if (e[s].raw_id === t) {
                        o = intval(s);
                        break
                    }
                o > -1 ? (this.index = o, this._setPreview()) : this.indexToUnread()
            }, t.prototype.fillTimeLine = function() {
                for (var t = this.timeLineEl, e = 0; e < t.children.length; e++) {
                    var o = geByClass1("stories_time_line_item_cont_active", t.children[e]);
                    e === this.index && (this.currentTimeLineEl = o);
                    var s = e < this.index ? 100 : 0;
                    setStyle(o, "transform", "translateX(" + s + "%)")
                }
            }, t.prototype._destroyStory = function() {
                if (this.story) {
                    this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.render()), this.story.destroy()
                    } catch (t) {}
                    this._replyHideEnd(), removeEvent(this.followBtn), val(this.authorButtons, ""), removeEvent(this.answersEl), removeEvent(geByClass1("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this._destroyRepliesEl(), this.hideInlineLoader(), delete this.story
                }
            }, t.prototype._timeLineUpdate = function() {
                var t = this.story;
                if (t && !t.isPaused()) {
                    var e = t.getCurrentTime(),
                        o = t.getDuration(),
                        s = Math.max(0, Math.min(100, e / o * 100));
                    setStyle(this.currentTimeLineEl, "transform", "translateX(" + s + "%) translateZ(0)"), 100 > s ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd()
                }
            }, t.prototype._destroyRepliesEl = function() {
                removeEvent(this.answersEl), val(this.answersWrap, "")
            }, t.prototype._onLoadingStart = function() {}, t.prototype._onLoadingEnd = function() {}, t.prototype._onPlay = function() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), removeClass(this.wrapEl, "animate_story"), removeClass(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }, t.prototype._onPause = function() {
                cancelAnimationFrame(this.timeLineAnim)
            }, t.prototype._onPlayEnd = function() {
                this.nextStory()
            }, t.prototype.nextStory = function() {
                if (!this.isLocked()) {
                    var t = this.data.items,
                        e = this.index + 1;
                    e < t.length ? this.changeStory(e) : (this._destroyStory(), this.opts.onStoriesEnd())
                }
            }, t.prototype.prevStory = function() {
                if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                    var t = (this.data.items, this.index - 1);
                    t >= 0 ? this.changeStory(t) : (this._destroyStory(), this.opts.playPrevOwner())
                }
            }, t.prototype.getOffsetLeft = function() {
                return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
            }, t.prototype.getWidth = function() {
                return this.wrapEl.offsetWidth
            }, t.prototype.removeStoryBox = function() {
                var t = this;
                this.pauseStory(), showFastBox({
                    title: getLang("global_warning"),
                    onHide: function() {
                        t.playStory()
                    }
                }, getLang("stories_remove_warning"), getLang("stories_remove_confirm"), this.removeStory.bind(this), getLang("global_cancel"))
            }, t.prototype.removeStory = function(t) {
                var e = this;
                this.pauseStory();
                var o = this.getIndex();
                ajax.post("al_stories.php", {
                    act: "remove_story",
                    story_raw: this.getRawId(),
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: function() {
                        curBox().hide(), e._removeStoryFromMemoryByIndex(o), 0 === e.data.items.length && u.onReplyDeleted(e.getOwnerId())
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            }, t.prototype._removeStoryFromMemoryByIndex = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                this.data.items.splice(t, 1), this.opts.removeList();
                var o = this.data.items.length;
                o ? (this._initTimeLine(), o > t ? this.isActive && (this._initStory(), this.playStory()) : this.isActive && this.nextStory()) : this._remove(e)
            }, t.prototype._remove = function(t) {
                this.opts.onStoryRemoved(t)
            }, t.prototype.shareBox = function() {
                var t = this;
                this.pauseStory(), showBox("like.php", {
                    act: "publish_box",
                    object: "story" + this.story.getId(),
                    from: "wkview"
                }, {
                    onDone: function() {
                        t.playStory()
                    },
                    params: {
                        onHide: function() {
                            t.playStory()
                        }
                    }
                })
            }, t.prototype._onAnswerSend = function(t) {
                var e = this,
                    o = this._getSendText();
                return o && this.story ? void ajax.post("al_im.php", {
                    act: "a_send",
                    msg: o,
                    hash: this.data.send_hash,
                    media: "story:" + this.story.getId(),
                    to: this.getOwnerId()
                }, {
                    onDone: function() {
                        e._showMessage(getLang("stories_answer_sent")).then(function() {
                            e.formLocked = !1, e.playStory()
                        }), val(e.sendFormTextEl, ""), e.sendFormTextEl.blur(), e.updateFeedbackTTPos(), e.pauseStory()
                    },
                    showProgress: function() {
                        val(e.sendFormButton, e._getLoaderHtml()), addClass(e.sendFormButton, "sending")
                    },
                    hideProgress: function() {
                        val(e.sendFormButton, ""), removeClass(e.sendFormButton, "sending")
                    }
                }) : cancelEvent(t)
            }, t.prototype._onSendFormFocus = function() {
                var t = this;
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", function() {
                    Emoji.shown || (t._resetFendForm(), t.sendFormTextEl.blur()), t.updateFeedbackTTPos()
                })
            }, t.prototype._getSendText = function() {
                var t = Emoji.editableVal(this.sendFormTextEl);
                return trim(t)
            }, t.prototype._onSendFormBlur = function() {
                var t = this._getSendText();
                t || (this.formLocked && cancelStackPop(), this._resetFendForm())
            }, t.prototype._onSendFormKeyUp = function() {
                this.updateFeedbackTTPos()
            }, t.prototype._resetFendForm = function() {
                this.formLocked = !1, this.playStory(), val(this.sendFormTextEl, "")
            }, t.prototype._emojiOnKeyAction = function() {
                this._getSendText() ? addClass(this.sendFormButton, "active") : removeClass(this.sendFormButton, "active")
            }, t.prototype._getLoaderHtml = function() {
                return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
            }, t.prototype.preloadNextStory = function(t) {
                if (t = isUndefined(t) ? this.index + 1 : t, !this.preloadedStories[t]) {
                    var e = this.data.items[t];
                    if (e) {
                        this.preloadedStories[t] = !0;
                        var o = e[e.type + "_url"];
                        o && ("video" === e.type ? (0, l["default"])(o) : (0, a.loadMedia)(o))
                    }
                }
            }, t.prototype._addToBlacklist = function() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: getLang("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, this.getOwnerId() < 0 ? getLang("stories_add_blacklist_message_group") : getLang("stories_add_blacklist_message"), getLang("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), getLang("global_cancel"))
            }, t.prototype._doAddToBlacklist = function(t) {
                var e = this;
                ajax.post("al_stories.php", {
                    act: "blacklist_add",
                    owner_id: this.getOwnerId(),
                    hash: this.data.blacklist_hash
                }, {
                    onDone: function() {
                        e.data.can_blacklist = !1, curBox().hide(), e.opts.removeList(), e._remove()
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            }, t.prototype._resetErrors = function() {
                var t = geByClass1("stories_error_wrap", this.contWrap);
                t && (removeEvent(geByClass1("stories_error_button", t)), re(t)), removeClass(this.wrapEl, "failed"), removeClass(this.wrapEl, "fatal_error")
            }, t.prototype._showError = function(t) {
                var e = this;
                if (this.contWrap) {
                    var o = void 0,
                        s = void 0,
                        r = t;
                    switch (t) {
                        case "load":
                            o = getLang("stories_error_cant_load"), s = ce("div", {
                                className: "stories_error_button",
                                innerHTML: getLang("stories_try_again")
                            }), addEvent(s, "click", function() {
                                e._destroyStory(), e.playStory()
                            });
                            break;
                        case "expired":
                            o = getLang("stories_error_expired");
                            break;
                        case "deleted":
                            o = getLang("stories_error_deleted");
                            break;
                        case "private":
                            o = getLang("stories_error_private");
                            break;
                        default:
                            o = getLang("global_unknown_error")
                    }
                    this._resetErrors(), this._stopLoader();
                    var i = ce("div", {
                            className: "stories_error_wrap"
                        }),
                        n = ce("div", {
                            className: "stories_error"
                        }),
                        a = ce("div", {
                            className: "stories_error_cont"
                        });
                    n.appendChild(a), a.appendChild(ce("div", {
                        className: "stories_error_icon " + r
                    })), a.appendChild(ce("div", {
                        className: "stories_error_caption",
                        innerHTML: o
                    })), s && a.appendChild(s), i.appendChild(n), this.contWrap.appendChild(i), addClass(this.wrapEl, "failed"), inArray(t, ["expired", "deleted", "private"]) && addClass(this.wrapEl, "fatal_error")
                }
            }, t.prototype._stopLoader = function() {
                re(geByClass1("stories_loader", this.contWrap))
            }, t.prototype._showLoader = function() {
                if (this._stopLoader(), this.isActive && (!this.isLoaded() || this.isPaused()) && this.contWrap) {
                    var t = ce("div", {
                        className: "stories_loader",
                        innerHTML: this._getLoaderHtml()
                    });
                    this.contWrap.appendChild(t)
                }
            }, t.prototype._onFollowBtnClick = function() {
                var t = this;
                if (this.pauseStory(), !this.followBtnLock) {
                    this.followBtnLock = !0;
                    var e = void 0,
                        o = void 0;
                    this.data.author.id > 0 ? (o = "al_friends", e = this.data.author.can_follow ? "add" : "remove") : (o = "al_groups", e = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(o + ".php", {
                        act: e,
                        mid: this.getOwnerId(),
                        gid: -this.getOwnerId(),
                        hash: this.data.author.hash,
                        from: "stories"
                    }, {
                        onDone: function() {
                            t.data.author.can_follow = !t.data.author.can_follow, toggleClass(t.followBtn, "followed", !t.data.author.can_follow), t._showMessage(getLang(t.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
                                return t.playStory()
                            })
                        },
                        showProgress: function() {
                            return t.showInlineLoader()
                        },
                        hideProgress: function() {
                            t.hideInlineLoader(), t.followBtnLock = !1
                        }
                    })
                }
            }, t.prototype._getDimensions = function() {
                var t = getSize(this.wrapEl),
                    e = n(t, 2),
                    o = e[0],
                    s = e[1],
                    r = getXY(this.wrapEl),
                    i = n(r, 2),
                    a = i[0],
                    l = i[1];
                return {
                    width: o,
                    height: s,
                    top: l - scrollGetY(),
                    left: a - scrollGetX()
                }
            }, t.prototype.markAsActive = function() {
                this.isActive = !0, addClass(this.wrapEl, "animate_story")
            }, t.prototype._renderReplyTo = function() {
                var t = this._getCurStoryData().reply_to,
                    e = t.list,
                    o = t.photo_url,
                    s = t.name,
                    r = t.can_view_deleted,
                    i = t.is_deleted,
                    n = t.is_private,
                    a = t.raw_id,
                    l = se('<div class="stories_reply_to" style="background-image: url(' + o + ')">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">' + s + "</div>\n  </div>\n</div>");
                if (addEvent(l, "click", function() {
                        var t = u.getPrevLayer();
                        u.getCount() > 1 && t.getStoryRaw() === a ? u.back() : showStory(e, {
                            fromEl: l
                        })
                    }), r) return l;
                var d = !1;
                return i ? (addClass(l, "deleted"), d = getLang("stories_deleted_story")) : n && (addClass(l, "private"), d = getLang("stories_private_story")), d && (val(geByClass1("stories_reply_to_error_msg", l), d), re(geByClass1("stories_reply_to_owner_name_wrap", l))), l
            }, t.prototype._renderAnswers = function() {
                var t = this.story.getReplies(),
                    e = t.count_str,
                    o = t.users,
                    s = ce("div", {
                        className: "stories_answers"
                    });
                this.answersEl = s, addEvent(s, "click", this.showFeedbackTooltip.bind(this));
                for (var r in o) {
                    var i = o[r];
                    s.appendChild(ce("div", {
                        className: "stories_answer_user",
                        title: i.name
                    }, {
                        backgroundImage: "url(" + i.photo + ")",
                        zIndex: o.length - r
                    }))
                }
                return s.appendChild(ce("div", {
                    className: "stories_answers_count",
                    innerHTML: e
                })), s
            }, t.prototype.sendMask = function() {
                var t = this;
                if (!this._maskSending) {
                    this._maskSending = !0, this.pauseStory();
                    var e = this._getCurStoryData();
                    ajax.post("al_stories.php", {
                        act: "send_mask",
                        mask_id: e.mask_id,
                        hash: this.data.send_mask_hash
                    }, {
                        onDone: function(e, o, s, r) {
                            "cant_send" === e ? showFastBox({
                                title: o,
                                width: 460,
                                onHide: function() {
                                    t.playStory()
                                }
                            }, s, r) : t._showMessage(getLang("stories_mask_sent")).then(function() {
                                return t.playStory()
                            })
                        },
                        showProgress: function() {
                            return t.showInlineLoader()
                        },
                        hideProgress: function() {
                            t._maskSending = !1, t.hideInlineLoader()
                        }
                    })
                }
            }, t.prototype.resetCurrentTime = function() {
                this.story && this.story.setCurrentTime()
            }, t.prototype._getFeedbackTTElem = function() {
                return this.answersWrap || this.viewsButton
            }, t.prototype._destroyFeedBackTT = function() {
                var t = this._getFeedbackTTElem();
                t && t.tt && (t.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1)
            }, t.prototype.hideFeedbackTooltip = function() {
                if (this._feedbackTTShown) {
                    var t = this._getFeedbackTTElem();
                    t && t.tt && (t.tt.hide(), this._feedbackTTShown = !1, this.playStory())
                }
            }, t.prototype.showFeedbackTooltip = function() {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    o = this._getFeedbackTTElem();
                if (o)
                    if (this._feedbackTTShown && e !== !0) cancelStackPop();
                    else {
                        this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", function() {
                            t.hideFeedbackTooltip(!1, !0)
                        });
                        var s = Math.max(0, 40 - getSize(o)[0] / 2);
                        showTooltip(o, {
                            className: "stories_feedback_tt",
                            forcetoup: !0,
                            nohide: !0,
                            forceNoHide: !0,
                            nohideover: !0,
                            content: '<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">' + this._getLoaderHtml() + '</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>',
                            slide: 15,
                            zIndex: 100,
                            shift: [s, 19, 0],
                            appendEl: geByClass1("stories_bottom_tools_wrap", this.wrapEl),
                            onShowStart: function() {
                                t.isActive && (t._feedbackTTShown = !0, t._feedbackTTLoaded ? t._feedbackRequestEnd && (t.feedbackScroll.update(), t._feedbackTooltipInitHeaders(), tooltips.rePositionTT(o.tt), t._onFeedbackScroll(), setTimeout(function() {
                                    return tooltips.rePositionTT(o.tt)
                                }, 200)) : (t._feedbackTTLoaded = !0, t._feedbackRequestEnd = !1, t._feedbackTooltipHeadersInited = !1, addEvent(geByClass1("stories_feedback_close", t.wrapEl), "click", function() {
                                    return t.showFeedbackTooltip()
                                }), setTimeout(function() {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: t.getRawId()
                                    }, {
                                        onDone: function(e, s, r, i, n) {
                                            if (t.isActive) {
                                                t.story.setViews(i), t.story.setReplies(n);
                                                var a = t.story.getReplies();
                                                val(geByClass1("_stories_replies", t.viewsButton), a.count), t._feedbackRequestEnd = !0;
                                                var l = geByClass1("stories_feedback_content", t.wrapEl);
                                                val(l, e), t.feedbackScroll = new uiScroll(geByClass1("stories_feedback_content", t.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: function() {
                                                        return t._onMoreFeedBack()
                                                    },
                                                    onscroll: function() {
                                                        return t._onFeedbackScroll()
                                                    }
                                                }), t.feedbackScroll.scrollTop(0), addClass(t.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), geByClass1("ui_scroll_overflow", t.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), t.feedbackNextFrom = s, o.tt.shown && t._feedbackTooltipInitHeaders(), t._updateViewsButton(), t._updateBottom(), t._destroyRepliesEl(), a.count > 0 && t.answersWrap && t.answersWrap.appendChild(t._renderAnswers()), t.updateFeedbackTTPos(), cur = extend(cur, r)
                                            }
                                        }
                                    })
                                }, 200)))
                            }
                        })
                    }
            }, t.prototype.updateFeedbackTTPos = function() {
                var t = this._getFeedbackTTElem();
                this._feedbackTTShown && t && t.tt && tooltips.rePositionTT(t.tt)
            }, t.prototype._feedbackTooltipInitHeaders = function() {
                if (!this._feedbackTooltipHeadersInited) {
                    this._feedbackTooltipHeadersInited = !0;
                    var t = geByClass1("stories_feedback_content", this.wrapEl),
                        e = geByClass1("stories_feedback_headers", this.wrapEl),
                        o = geByClass("stories_feedback_title", t);
                    show(o[0]), this.feedbackHeaders = [];
                    for (var s = o.length + 1, r = 0; r < o.length; r++) {
                        var i = o[r],
                            n = e.appendChild(ce("div", {
                                className: "stories_feedback_title",
                                innerHTML: val(i)
                            }, {
                                top: i.offsetTop,
                                zIndex: s - r
                            }));
                        this.feedbackHeaders.push({
                            top: i.offsetTop,
                            height: i.offsetHeight,
                            el: n
                        })
                    }
                    setStyle(t, "margin-top", o[0].offsetHeight), hide(o[0])
                }
            }, t.prototype.feedbackTooltipReInitHeaders = function() {
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(geByClass1("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }, t.prototype._onFeedbackScroll = function() {
                if (this._feedbackTooltipHeadersInited)
                    for (var t = this.feedbackScroll.data.scrollTop, e = !1, o = 0, s = this.feedbackHeaders.length - 1; s >= 0; s--) {
                        var r = this.feedbackHeaders[s],
                            i = r.top,
                            n = r.height,
                            a = r.el,
                            l = i,
                            d = t;
                        e && (l += n, d -= o - n);
                        var c = d >= i - n;
                        a.classList.toggle("active", !e && c && d > 0), c && (e = !0, o = i);
                        var h = -Math.min(d, l);
                        a.style.transform = "translateY(" + h + "px)"
                    }
            }, t.prototype._onMoreFeedBack = function() {
                var t = this;
                !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                    act: "feedback",
                    story_raw: this.getRawId(),
                    offset: this.feedbackNextFrom
                }, {
                    onDone: function(e, o) {
                        t.feedbackNextFrom = o, o && (t.feedbackLoadingMore = !1);
                        for (var s = geByClass1("stories_feedback_views", t.wrapEl), r = ce("div", {
                                innerHTML: e
                            }), i = void 0; i = r.firstChild;) s.appendChild(i)
                    }
                }))
            }, t.prototype.showInlineLoader = function() {
                show(this.inlineLoader)
            }, t.prototype.hideInlineLoader = function() {
                hide(this.inlineLoader)
            }, t.prototype.volumeUpdate = function() {
                this.story && this.story.volumeUpdate && this.story.volumeUpdate()
            }, t.prototype._updateBottom = function() {
                var t = this._getCurStoryData(),
                    e = this.story.getViews(),
                    o = this.story.getReplies(),
                    s = isObject(t.link),
                    r = e > 0 || o.count > 0,
                    i = (this.hasMask(), t.can_comment === !0),
                    n = geByClass1("stories_bottom_tools", this.wrapEl);
                toggleClass(n, "force_to_right", !r && !s && !i)
            }, t.prototype._onAutoPlayFail = function() {
                addClass(this.wrapEl, "autoplay_failed")
            }, t.prototype._hideReply = function() {
                var t = this;
                showFastBox({
                    title: getLang("global_warning"),
                    onHide: function() {
                        t.playStory()
                    }
                }, getLang("stories_hide_reply_warning"), getLang("global_continue"), this._doHideReply.bind(this), getLang("global_cancel"))
            }, t.prototype._doHideReply = function() {
                var t = this;
                this.pauseStory(), addClass(this.wrapEl, "hiding_reply"), curBox().hide();
                var e = this.getIndex(),
                    o = this.data.author.gender,
                    s = se('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + getLang("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + getLang("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(o, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + getLang("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
                addEvent(geByClass1("_stories_reply_restore", s), "click", this._restoreReply.bind(this)), addEvent(geByClass1("_stories_reply_continue", s), "click", function() {
                    return t._replyHideEnd(e)
                }), addEvent(geByClass1("_stories_hide_replies", s), "click", this._hideAllReplies.bind(this)), addEvent(geByClass1("_stories_reply_ban", s), "click", this._ban.bind(this)), this.contWrap.appendChild(s), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        t.opts.removeList(), cur.needUpdateFeedStories = !0, removeClass(s, "loading")
                    },
                    onFail: function() {
                        t._resetReplyHide(), t.playStory()
                    }
                })
            }, t.prototype._restoreReply = function(t) {
                var e = this;
                cancelEvent(t);
                var o = geByClass1("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        e._resetReplyHide(), e.playStory()
                    },
                    showProgress: function() {
                        return addClass(o, "loading")
                    },
                    hideProgress: function() {
                        return removeClass(o, "loading")
                    }
                })
            }, t.prototype._resetReplyHide = function() {
                re(geByClass1("stories_hide_reply_wrap", this.contWrap)), removeClass(this.wrapEl, "hiding_reply")
            }, t.prototype._hideAllReplies = function() {
                var t = this.data.author.first_name_gen;
                showFastBox({
                    title: getLang("global_warning")
                }, getLang("stories_delete_all_replies_confirm").replace("{name}", t), getLang("global_continue"), this._doHideAllReplies.bind(this), getLang("global_cancel"))
            }, t.prototype._doHideAllReplies = function(t) {
                var e = this;
                ajax.post("al_stories.php", {
                    act: "hide_all_replies",
                    owner_id: this.getOwnerId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        curBox().hide(), e.opts.removeList(), e.data.items = [];
                        var t = geByClass1("_stories_hide_replies", e.contWrap);
                        val(t, getLang("stories_all_replies_hidden")), addClass(t, "disabled")
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            }, t.prototype._ban = function() {
                var t = this.data.author.first_name_gen;
                showFastBox({
                    title: getLang("global_warning")
                }, getLang("stories_ban_confirm").replace("{name}", t), getLang("global_continue"), this._doBan.bind(this), getLang("global_cancel"))
            }, t.prototype._doBan = function(t) {
                var e = this;
                ajax.post("al_stories.php", {
                    act: "ban",
                    owner_id: this.getOwnerId(),
                    hash: this.data.stories_ban_hash
                }, {
                    onDone: function() {
                        curBox().hide(), e.opts.removeList(), e.data.items = [];
                        var t = geByClass1("_stories_reply_ban", e.contWrap);
                        val(t, getLang("stories_banned")), addClass(t, "disabled")
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            }, t.prototype._replyHideEnd = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                geByClass1("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && u.onReplyDeleted(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(t || this.getIndex(), !isNumeric(t)))
            }, t.prototype._feedbackRemoveReplyFromDom = function(t) {
                var e = geByClass1("stories_feedback_content", this.wrapEl);
                if (e) {
                    var o = e.querySelector("#feed_story_" + t);
                    o && addClass(o, "removed")
                }
            }, t.prototype.onReplyDeleted = function(t) {
                this._feedbackRemoveReplyFromDom(t)
            }, t.prototype._updateFeedStoryPreview = function() {
                if ("preview" === cur.storiesFeedTestGroup) {
                    var t = ge("feed_story_" + this.getOwnerId());
                    if (t && !hasClass(t, "stories_feed_reply_item")) {
                        var e = this.indexToUnread(!0),
                            o = this.data.items[e];
                        o && o.small_preview && setStyle(t, "background-image", "url(" + o.small_preview + ")")
                    }
                }
            }, t
        }();
    e["default"] = v
}, function(t, e, o) {
    "use strict";

    function s(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
            function t(t, e) {
                var o = [],
                    s = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var n, a = t[Symbol.iterator](); !(s = (n = a.next()).done) && (o.push(n.value), !e || o.length !== e); s = !0);
                } catch (l) {
                    r = !0, i = l
                } finally {
                    try {
                        !s && a["return"] && a["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = o(4),
        l = r(a),
        d = o(2),
        c = s(d),
        h = o(11),
        u = s(h),
        p = o(12),
        _ = s(p),
        y = function() {
            function t(e, o, s, r) {
                i(this, t), this.queue = [], this.storiesToRead = [];
                try {
                    window.Videoview && Videoview.togglePlay(!1)
                } catch (n) {}
                this.initDOM(), this.show(), this._init(e, o, s, r), addClass(this.layerEl, "shown")
            }
            return t.prototype._init = function(t, e, o, s) {
                var r = t.split("_"),
                    i = n(r, 1),
                    a = i[0];
                return this.storyOwner = intval(a), this.storyRaw = t, this.parseExtra(s), this.list = e, this.storiesList = o, this.initStories()
            }, t.prototype._destroyStories = function() {
                for (var t in this.renderedStories) {
                    var e = this.renderedStories[t];
                    e.story.destroy()
                }
            }, t.prototype.destroy = function() {
                delete this.activeStory, clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), removeEvent(this.volumeControl), delete this.volumeControl, delete this.renderedStories, removeEvent(this.layerEl), this._onVideoEnd();
                try {
                    this.layerEl && bodyNode.removeChild(this.layerEl)
                } catch (t) {}
                delete cur.storyLayer, delete this
            }, t.prototype.getList = function() {
                return "story" + this.activeStory.getRawId() + "/" + this.list
            }, t.prototype.getStoryRaw = function() {
                return this.activeStory ? this.activeStory.getRawId() : !1
            }, t.prototype.initDOM = function() {
                this.layerEl = ce("div", {
                    className: "stories_layer"
                });
                var t = ce("div", {
                    className: "stories_layer_cont"
                });
                this.layerEl.appendChild(t), t.appendChild(this._renderBackButton()), t.appendChild(this._renderVolumeControl()), this._updateVolumeButton(), this.stories = ce("div", {
                    id: "stories_list",
                    className: "stories_list"
                }), t.appendChild(this.stories), t.appendChild(ce("div", {
                    className: "stories_layer_close"
                })), addEvent(this.layerEl, "click", this._onLayerClick.bind(this)), bodyNode.appendChild(this.layerEl)
            }, t.prototype.show = function() {
                onBodyResize()
            }, t.prototype.hide = function(t) {
                var e = this,
                    o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && c.layerHide(), t !== !0 && this.activeStory ? this.animateStory("minimize").then(function() {
                    return e.doHide()
                }) : this.doHide(t), removeClass(this.layerEl, "shown"), o || cancelStackPop()
            }, t.prototype.doHide = function(t) {
                this._readStories(), this.destroy(), !t && c.removeLayer()
            }, t.prototype.back = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                this.hideAllLayers = !1, this.hide(!1, t)
            }, t.prototype._renderStories = function() {
                for (var t = this, e = [], o = 0; o < this.storiesList.length; o++) this.storiesList[o] && e.push(this.storiesList[o]);
                var s = this._getScreenStoriesCount(),
                    r = this._getCurStoryPos(e.map(function(t) {
                        return t.author.id
                    })),
                    i = Math.floor(s / 2),
                    n = e.slice(Math.max(0, r - i)).slice(0, s),
                    a = n.map(function(t) {
                        return t.author.id
                    });
                for (var d in this.renderedStories) {
                    var c = this.renderedStories[d]; - 1 === a.indexOf(parseInt(d)) && (c.story.destroy(), delete this.renderedStories[d])
                }
                var h = void 0;
                if (n.map(function(e, o) {
                        var s = e.author.id;
                        if (!t.renderedStories[s]) {
                            var r = t.storiesOwners.indexOf(s),
                                n = new l["default"](e, {
                                    id: o,
                                    layer: t,
                                    onSelect: t._onSelectStory.bind(t),
                                    onStoriesEnd: t._onStoriesEnd.bind(t, r),
                                    onStoryRemoved: function(e) {
                                        return t._onStoryRemoved(r, e)
                                    },
                                    playPrevOwner: t._playPrevOwner.bind(t, r),
                                    onPlayStory: t._onPlayStory.bind(t, r),
                                    onVideoPlay: t._onVideoPlay.bind(t),
                                    onVideoEnd: t._onVideoEnd.bind(t),
                                    onStartStory: t._onStartStory.bind(t),
                                    removeList: function() {
                                        return Stories.removeList(t.list)
                                    }
                                });
                            i >= o && t.stories.children[o] ? t.stories.insertBefore(n.render(), t.stories.children[o]) : t.stories.appendChild(n.render()), t.renderedStories[s] = {
                                story: n,
                                index: r
                            }, e.author.id === t.storyOwner && (h = n)
                        }
                    }), !h) {
                    var u = n[0];
                    h = this.renderedStories[u.author.id].story
                }
                return {
                    activeStory: h
                }
            }, t.prototype._getScreenStoriesCount = function() {
                return 2 * Math.floor(window.innerWidth / (window.innerHeight * u.STORY_HORIZONTAL_RATIO)) + 1
            }, t.prototype._getCurStoryPos = function(t) {
                return (t || this.storiesOwners).indexOf(this.storyOwner)
            }, t.prototype.initStories = function() {
                var t = this;
                return new Promise(function(e) {
                    t.storiesOwners = t.storiesList.map(function(t) {
                        return t.author.id
                    });
                    var o = !1,
                        s = t.storiesOwners.indexOf(t.storyOwner);
                    if (s > -1) {
                        var r = t.storiesList[s];
                        r.author.id === t.storyOwner && (o = r.items[r.items.length - 1].unread)
                    }
                    if (o) {
                        for (var i = [], n = 0; n < t.storiesList.length; n++) {
                            var a = t.storiesList[n];
                            a.items[a.items.length - 1].unread && i.push(a)
                        }
                        i.length && (t.storiesList = i, t.storiesOwners = t.storiesList.map(function(t) {
                            return t.author.id
                        }))
                    }
                    t.renderedStories = {};
                    var l = t._renderStories(),
                        d = l.activeStory;
                    t.scrollToStory(d, !0), 1 === t.storiesList.length && addClass(t.stories, "one_story"), t._startFirstStory(d, t.extra.story_id), addClass(t.stories, "inited"), e()
                })
            }, t.prototype._startFirstStory = function(t, e) {
                var o = this;
                this.activeStory = t, this.storyOwner = t.getOwnerId(), addClass(t.getWrap(), "active"), this.scrollToStory(), t.indexToStoryById(e || this.storyRaw), this._startActiveStory(), setTimeout(function() {
                    addClass(o.stories, "animated"), o.inited = !0, "open" === o.extra.replies && o.activeStory.showFeedbackTooltip()
                })
            }, t.prototype._onSelectStory = function(t) {
                var e = this,
                    o = void 0;
                this.activeStory && (o = this.activeStory.getWrap(), this.activeStory.stop()), this.activeStory = t, t.indexToUnread(), t.fillTimeLine(), this.storyOwner = t.getOwnerId(), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(function() {
                    removeClass(o, "active"), addClass(t.getWrap(), "active"), e.scrollToStory(), e.timer = setTimeout(function() {
                        e.activeStory && t.id !== e.activeStory.id || !e.activeStory || (t.indexToUnread(), e._startActiveStory(), e._renderStories(), e.scrollToStory(t, !0))
                    }, 200)
                })
            }, t.prototype._startActiveStory = function() {
                var t = this.activeStory;
                t.markAsActive(), t.playStory(!0)
            }, t.prototype._onStartStory = function() {
                var t = this.activeStory,
                    e = this.list;
                if (t) {
                    var o = nav.objLoc;
                    o.w = "story" + t.getRawId() + "/" + e, nav.setLoc(nav.toStr(o))
                }
            }, t.prototype.scrollToStory = function(t, e) {
                var o = this,
                    s = this._getScrollLeft(t);
                e ? (removeClass(this.stories, "animated"), this._setScrollLeft(s)) : this.inited && addClass(this.stories, "animated"), setTimeout(function() {
                    o._setScrollLeft(s)
                })
            }, t.prototype._setScrollLeft = function(t) {
                setStyle(this.stories, "transform", "translateX(" + t + "px) translateZ(0)")
            }, t.prototype._getScrollLeft = function(t) {
                return t = t || this.activeStory, window.innerWidth / 2 - t.getOffsetLeft()
            }, t.prototype._onStoriesEnd = function(t) {
                for (var e = -1, o = t + 1; o < this.storiesList.length; o++) {
                    var s = this.storiesList[o];
                    if (s) {
                        e = o;
                        break
                    }
                }
                e > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(e)) : this.back()
            }, t.prototype._playPrevOwner = function(t) {
                for (var e = -1, o = t - 1; o >= 0; o--) {
                    var s = this.storiesList[o];
                    if (s) {
                        e = o;
                        break
                    }
                }
                e > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(e)) : c.getCount() > 1 ? this.back() : this.hide()
            }, t.prototype._onPlayStory = function(t) {
                var e = this._getStoryInstanceByIndex(t);
                if (e && (this.storiesReadHash = e.getReadHash(), this.storiesToRead.push(e.getRawId()), this.storiesToRead > 10 && this._readStories(), e.isLastStory())) {
                    var o = ge("feed_story_" + e.getOwnerId());
                    removeClass(o, "story_feed_new_item"), val(geByClass1("stories_feed_item_replies", o), "")
                }
                var s = this._getStoryInstanceByIndex(t + 1);
                s && s.preloadNextStory(s.getIndex())
            }, t.prototype._getStoryInstanceByIndex = function(t) {
                var e = this.storiesList[t];
                return e ? this.renderedStories[e.author.id].story : !1
            }, t.prototype._onStoryRemoved = function(t, e) {
                this.storiesList[t] = !1, !e && this._onStoriesEnd(t), Stories.updateFeedStories()
            }, t.prototype.onVisibilityChange = function() {
                "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
            }, t.prototype.onResize = function() {
                var t = cur.storyLayer.activeStory;
                t && cur.storyLayer.scrollToStory(t, !0)
            }, t.prototype.pauseStory = function(t) {
                this.activeStory && this.activeStory.pauseStory(t)
            }, t.prototype.playStory = function() {
                this.activeStory && this.activeStory.playStory()
            }, t.prototype._onLayerClick = function(t) {
                (hasClass(t.target, "stories_layer_cont") || hasClass(t.target, "stories_layer_close")) && this.hide()
            }, t.prototype._checkKeyEvents = function(t) {
                return attr(t.target, "contenteditable") || inArray(t.target.tagName, ["INPUT", "TEXTAREA"]) || curBox() ? !1 : !0
            }, t.prototype.onKeyDown = function(t) {
                if (cur.storiesKeyDown) return void(cur.storyLayer && cur.storyLayer._checkKeyEvents(t) && cancelEvent(t));
                if (cur.storiesKeyDown = t.keyCode !== KEY.ESC, [KEY.PAGEDOWN, KEY.PAGEUP].indexOf(t.keyCode) > -1) return cancelEvent(t);
                if (cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(t)) {
                    switch (t.keyCode) {
                        case KEY.LEFT:
                            cur.storyLayer.prevStory();
                            break;
                        case KEY.RIGHT:
                            cur.storyLayer.nextStory();
                            break;
                        case KEY.SPACE:
                            cancelEvent(t), cur.storyLayer.pauseStory(!0)
                    }
                    cur.storiesKeyDownTs = vkNow()
                }
            }, t.prototype.onKeyUp = function(t) {
                cur.storiesKeyDown = !1, cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(t) && t.keyCode === KEY.SPACE && (cancelEvent(t), vkNow() - cur.storiesKeyDownTs > 200 ? cur.storyLayer.playStory() : cur.storyLayer.nextStory())
            }, t.prototype.nextStory = function() {
                this.activeStory && this.activeStory.nextStory()
            }, t.prototype.prevStory = function() {
                this.activeStory && this.activeStory.prevStory()
            }, t.prototype._readStories = function() {
                if (this.storiesToRead.length) {
                    var t = this.storiesToRead.join(",");
                    this.storiesToRead = [], ajax.post("al_stories.php", {
                        act: "read_stories",
                        stories: t,
                        hash: this.storiesReadHash
                    })
                }
            }, t.prototype._onVideoPlay = function() {
                getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
            }, t.prototype._onVideoEnd = function() {
                this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
            }, t.prototype._renderBackButton = function() {
                var t = this;
                return this.backButton = se('<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">' + getLang("global_back") + "</div>\n  </div>\n</div>"), addEvent(this.backButton, "click", function() {
                    t.back()
                }), this.backButton
            }, t.prototype.showBackButton = function() {
                show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
            }, t.prototype.parseExtra = function(t) {
                var e = {},
                    o = String(t).split(";");
                for (var s in o) {
                    var r = o[s].split("="),
                        i = n(r, 2),
                        a = i[0],
                        l = i[1];
                    e[a] = l
                }
                this.extra = e
            }, t.prototype.getAnimateFromElem = function() {
                if (!this.hideAllLayers) {
                    var t = this.activeStory.getOwnerId();
                    if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                        var e = domQuery("#feed_story_" + t, domPN(this.animateFromEl))[0];
                        if (e) return e
                    } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                        var o = ge("feed_story_" + t);
                        if (o) return Stories.feedScrollToOwner(t), o
                    }
                }
                return this.animateFromEl
            }, t.prototype.animateStory = function(t, e) {
                var o = this;
                return new Promise(function(s) {
                    if ("expand" === t && !e || "minimize" === t && !o.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), s();
                    o.pauseStory(), addClass(o.layerEl, "animation"), removeClass(o.stories, "animated");
                    var r = "expand" === t ? e : o.getAnimateFromElem();
                    if (o.hideAllLayers && "minimize" === t) {
                        var i = c.getFirstLayer();
                        r = i.getAnimateFromElem(), c.slicePrevLayers(), c.layerHide()
                    }
                    removeClass(r, "stories_feed_item_ava_animate");
                    var a = getXY(r),
                        l = n(a, 2),
                        d = l[0],
                        h = l[1],
                        p = getSize(r),
                        _ = window.innerHeight,
                        y = Math.min(u.STORY_MAX_WIDTH, Math.max(u.STORY_MAX_HEIGHT, _ * u.STORY_HORIZONTAL_RATIO)),
                        f = y * u.STORY_VERTICAL_RATIO,
                        v = Math.max(0, (_ - f) / 2),
                        m = Math.max(0, (window.innerWidth - y) / 2);
                    d = m - d + y / 2 - p[0] / 2 + scrollGetX(), h = v - h + f / 2 - p[1] / 2 + scrollGetY(), d = -d, h = -h;
                    var g = {};
                    "expand" === t && (g.transform = "translate(" + d + "px, " + h + "px) scale(0)", o.animateFromEl = e), setStyle(o.activeStory.wrapEl, g), "minimize" === t && setStyle(r, "transform", "scale(0)"), o.animationTimer = setTimeout(function() {
                        addClass(o.stories, "animated"), addClass(r, "stories_feed_item_ava_animate"), o.animationTimer = setTimeout(function() {
                            "expand" === t ? (setStyle("stories_layers_background", "opacity", 1), setStyle(o.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(o.activeStory.wrapEl, "transform", "translate(" + d + "px, " + h + "px) scale(0.01)"), setStyle(r, "transform", "scale(1)")), o.animationTimer = setTimeout(function() {
                                s(), "expand" === t ? (setStyle(o.activeStory.wrapEl, "transform", ""), removeClass(o.layerEl, "animation"), o.playStory(), c.layerShown()) : (removeClass(r, "stories_feed_item_ava_animate"), setStyle(r, "transform", ""))
                            }, 330)
                        }, 30)
                    }, 30)
                })
            }, t.prototype.pauseLayer = function() {
                this.pauseStory(), addClass(this.layerEl, "paused")
            }, t.prototype.resumeLayer = function() {
                this.activeStory && (this.playStory(), removeClass(this.layerEl, "paused"))
            }, t.prototype.setLayerVisibility = function(t) {
                toggle(this.layerEl, t)
            }, t.prototype._renderVolumeControl = function() {
                return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControl
            }, t.prototype._volumeControlOnMouseDown = function(t) {
                var e = this;
                addClass(this.volumeControl, "changing");
                var o = geByClass1("stories_volume_control_slide", this.volumeControl),
                    s = geByClass1("stories_volume_control_slide_indicator", o),
                    r = getXY(o),
                    i = n(r, 1),
                    a = i[0],
                    l = getSize(o),
                    d = n(l, 1),
                    c = d[0],
                    h = function(t) {
                        var o = Math.max(0, Math.min(t.pageX - a, c)),
                            r = o / c * 100;
                        setStyle(s, "width", r + "%"), _.setVolume(r / 100), e.activeStory.volumeUpdate()
                    },
                    u = function p() {
                        removeEvent(window, "mousemove", h), removeEvent(window, "mouseup", p), e._updateVolumeButton(), removeClass(e.volumeControl, "changing")
                    };
                addEvent(window, "mousemove", h), addEvent(window, "mouseup", u), h(t)
            }, t.prototype._updateVolumeButton = function() {
                var t = 100 * _.getVolume();
                toggleClass(this.volumeControl, "low", t > 0 && 50 > t), toggleClass(this.volumeControl, "high", t >= 50);
                var e = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                setStyle(e, "width", t + "%")
            }, t.prototype._volumeControlOnClick = function(t) {
                if (!hasClass(t.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControl, "changing")) {
                    var e = _.getVolume();
                    e = e ? 0 : 1, _.setVolume(e), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                }
            }, t.prototype.onReplyDeleted = function(t) {
                this.activeStory && this.activeStory.onReplyDeleted(t)
            }, t
        }();
    e["default"] = y
}, function(t, e) {
    function o() {
        d = !1, n.length ? l = n.concat(l) : c = -1, l.length && s()
    }

    function s() {
        if (!d) {
            var t = setTimeout(o);
            d = !0;
            for (var e = l.length; e;) {
                for (n = l, l = []; ++c < e;) n && n[c].run();
                c = -1, e = l.length
            }
            n = null, d = !1, clearTimeout(t)
        }
    }

    function r(t, e) {
        this.fun = t, this.array = e
    }

    function i() {}
    var n, a = t.exports = {},
        l = [],
        d = !1,
        c = -1;
    a.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
        l.push(new r(t, e)), 1 !== l.length || d || setTimeout(s, 0)
    }, r.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = i, a.addListener = i, a.once = i, a.off = i, a.removeListener = i, a.removeAllListeners = i, a.emit = i, a.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, a.cwd = function() {
        return "/"
    }, a.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, a.umask = function() {
        return 0
    }
}, function(t, e, o) {
    "use strict";

    function s(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function n(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = o(1),
        l = o(13),
        d = s(l),
        c = 4e3,
        h = function(t) {
            function e() {
                return r(this, e), i(this, t.apply(this, arguments))
            }
            return n(e, t), e.prototype.render = function() {
                var e = this;
                if (t.prototype.render.call(this), this.photo) return this.photo;
                var o = this.data.photo_url;
                return this.photo = ce("div", {
                    className: "stories_photo"
                }), this._isFailed() ? this.photo : ((0, a.loadMedia)(o).then(function(t) {
                    e.photo && (setStyle(e.photo, "backgroundImage", "url(" + t + ")"), e._onCanPlay())
                })["catch"](function() {
                    e._loadingError()
                }), this.photo)
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), delete this.photo
            }, e.prototype.play = function() {
                this.startTs = vkNow() - this.pauseTime, this.pauseTime = 0, t.prototype.play.call(this)
            }, e.prototype.pause = function() {
                this.isPaused() || (t.prototype.pause.call(this), this.pauseTime = this.getCurrentTime())
            }, e.prototype.setCurrentTime = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.startTs, this.startTs = vkNow() + t, this.isPaused() && (this.pauseTime = t)
            }, e.prototype.getCurrentTime = function() {
                return vkNow() - this.startTs || 0
            }, e.prototype.getDuration = function() {
                return c
            }, e.prototype._onCanPlay = function() {
                t.prototype._onCanPlay.call(this), setStyle(this.photo, "opacity", 1)
            }, e
        }(d["default"]);
    e["default"] = h
}, function(t, e, o) {
    "use strict";

    function s(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = o(13),
        d = r(l),
        c = o(12),
        h = s(c),
        u = function(t) {
            function e() {
                return i(this, e), n(this, t.apply(this, arguments))
            }
            return a(e, t), e.prototype.render = function() {
                var e = this;
                if (t.prototype.render.call(this), this.video) return this.video;
                var o = this.data.video_url;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", function() {
                    e._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = o, this.volumeUpdate(), this.video)
            }, e.prototype.getImage = function() {
                var t = getSize(this.video),
                    e = ce("canvas", {
                        width: t[0],
                        height: t[1]
                    }),
                    o = e.getContext("2d");
                return o.drawImage(this.video, 0, 0, t[0], t[1]), e.toDataURL()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), removeEvent(this.video), delete this.video
            }, e.prototype.play = function() {
                var e = this;
                if (t.prototype.play.call(this), this.loaded && this.video) {
                    var o = this.video.play();
                    void 0 !== o && o["catch"](function(t) {
                        e.opts.onAutoPlayFail()
                    })
                }
            }, e.prototype.pause = function() {
                t.prototype.pause.call(this), this.video && this.video.pause()
            }, e.prototype.setCurrentTime = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.loaded && (this.video.currentTime = t)
            }, e.prototype.getCurrentTime = function() {
                return this.video.currentTime
            }, e.prototype.getDuration = function() {
                return this.video.duration
            }, e.prototype._onCanPlay = function() {
                t.prototype._onCanPlay.call(this), setStyle(this.video, "opacity", 1)
            }, e.prototype.volumeUpdate = function() {
                this.video.volume = h.getVolume()
            }, e
        }(d["default"]);
    e["default"] = u
}, function(t, e) {
    t.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(t, e) {}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.STORY_HORIZONTAL_RATIO = .563, e.STORY_VERTICAL_RATIO = 1.78, e.STORY_MAX_WIDTH = 540, e.STORY_MAX_HEIGHT = 320
}, function(t, e) {
    "use strict";

    function o() {
        var t = ls.get("video_volume");
        return isNumeric(t) ? Math.min(1, Math.max(0, t)) : 1
    }

    function s(t) {
        ls.set("video_volume", t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getVolume = o, e.setVolume = s
}, function(t, e) {
    "use strict";

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = function() {
        function t(e, s) {
            o(this, t), this.data = e, this.opts = s, this.paused = !0, this.loaded = !1;
            var r = e.is_expired,
                i = e.is_deleted,
                n = e.can_view_deleted,
                a = e.is_private;
            n || (r ? this._error("expired") : i ? this._error("deleted") : a && this._error("private"), (r || i || a) && (this.failed = !0))
        }
        return t.prototype.render = function() {
            var t = this;
            this._isFailed() || (this.longLoadingTimer = setTimeout(function() {
                t.isLoaded() || t.opts.onLongLoading()
            }, 1e3))
        }, t.prototype.play = function() {
            this.paused = !1, this.isLoaded() && this.opts.onPlay()
        }, t.prototype.pause = function() {
            this.paused = !0, this.opts.onPause()
        }, t.prototype.setCurrentTime = function() {
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
        }, t.prototype.destroy = function() {
            clearTimeout(this.longLoadingTimer)
        }, t.prototype.isPaused = function() {
            return this.paused
        }, t.prototype.isLoaded = function() {
            return this.loaded
        }, t.prototype.getCurrentTime = function() {
            return 0
        }, t.prototype.getDuration = function() {
            return 0
        }, t.prototype.getId = function() {
            return this.data.raw_id
        }, t.prototype.getDate = function() {
            return this.data.date
        }, t.prototype.getViews = function() {
            return this.data.views
        }, t.prototype.getReplies = function() {
            return this.data.answers ? this.data.answers : {
                count: "",
                count_str: "",
                users: []
            }
        }, t.prototype.setViews = function(t) {
            this.data.views = t
        }, t.prototype.setReplies = function(t) {
            this.data.answers = t
        }, t.prototype._onCanPlay = function() {
            if (clearTimeout(this.longLoadingTimer), this.loaded = !0, this.opts.onLoadingEnd(), !this.isPaused()) {
                var t = document.visibilityState;
                if (t && "visible" !== t) return;
                this.play()
            }
        }, t.prototype._loadingError = function() {
            this._error("load")
        }, t.prototype._error = function(t) {
            clearTimeout(this.longLoadingTimer), this.opts.onError(t)
        }, t.prototype._isFailed = function() {
            return this.failed
        }, t
    }();
    e["default"] = s
}, function(t, e, o) {
    "use strict";

    function s(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var i = function() {
            function t(t, e) {
                var o = [],
                    s = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var n, a = t[Symbol.iterator](); !(s = (n = a.next()).done) && (o.push(n.value), !e || o.length !== e); s = !0);
                } catch (l) {
                    r = !0, i = l
                } finally {
                    try {
                        !s && a["return"] && a["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        n = o(5),
        a = r(n),
        l = o(15),
        d = o(1),
        c = o(2),
        h = s(c);
    window.Stories = {
        show: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            t.match(/story/) && (t = this._parseList(t)), this.getList(t).then(function(t) {
                var o = t.storyOwner,
                    s = t.list,
                    r = t.items,
                    i = t.extra;
                h.addLayer(new a["default"](o, s, r, i, e), e)
            })["catch"](function(t) {
                vk.dev && debugLog(t), showFastBox(getLang("global_error"), getLang("global_unknown_error"))
            })
        },
        _getUnreadStory: function(t, e) {
            t = intval(t);
            for (var o = !1, s = 0; s < e.length; s++)
                if (e[s].author.id === t) {
                    for (var r = e[s].items, i = 0; i < r.length; i++)
                        if (r[i].unread) {
                            o = r[i];
                            break
                        }
                    o || (o = r[0]);
                    break
                }
            return o
        },
        getList: function(t, e) {
            return new l.Promise(function(o, s) {
                var r = t.split("/"),
                    n = i(r, 3),
                    a = n[0],
                    l = n[1],
                    d = n[2],
                    c = {
                        storyOwner: a,
                        list: l,
                        extra: d
                    },
                    h = cur["stories_list_" + l];
                isArray(h) ? (c.items = h, o(c)) : ajax.post("al_stories.php", {
                    act: "get_list",
                    list: l,
                    story_raw: a,
                    extra: d
                }, {
                    loader: !e,
                    onDone: function(t) {
                        cur["stories_list_" + l] = t, c.items = t, o(c)
                    },
                    onFail: function() {
                        return s(), !0
                    }
                })
            })
        },
        _setList: function(t, e) {
            cur["stories_list_" + t] = e
        },
        removeList: function(t) {
            delete cur["stories_list_" + t]
        },
        _parseList: function(t) {
            t = decodeURIComponent(t);
            var e = t.match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\=\;\-]+))?$/i),
                o = i(e, 7),
                s = o[1],
                r = o[2],
                n = o[4],
                a = o[6],
                l = s + "_" + r;
            return t.match(/from_feed\=1/) ? n = "feed" : t.match(/profile\=1/) ? n = "profile" : n || (n = l), l + "/" + n + "/" + a
        },
        initFeed: function() {
            function t() {
                addEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel)
            }

            function e() {
                removeEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel)
            }
            var o = ge("stories_feed_items_container");
            Stories.updateFeedArrows(), addEvent(o, "mouseenter", t), addEvent(o, "mouseleave", e), addEvent(window, "scroll", Stories.onWinScroll), cur.destroy.push(function() {
                removeEvent(window, "scroll", Stories.onWinScroll), removeEvent(o, browserFeatures.wheelEvent, Stories.feedMouseWheel), removeEvent(o, "mouseenter", t), removeEvent(o, "mouseleave", e)
            })
        },
        onWinScroll: function(t) {
            var e = window.scrollGetY();
            e > 400 || e !== cur.lastWinScroll && (cur.lastWinOnScroll = vkNow(), cur.lastWinScroll = e)
        },
        feedNext: function() {
            return this.feedPaging("next")
        },
        feedPrev: function() {
            return this.feedPaging("prev")
        },
        feedPaging: function(t, e) {
            var o = geByClass1("stories_feed_wrap"),
                s = ge("stories_feed_items"),
                r = getSize(o)[0],
                i = cur.storiesPos || 0;
            if (isNumeric(t)) i += t;
            else {
                var n = r - 80;
                "next" === t ? i += n : i -= n
            }
            cur.storiesPos = Math.max(0, Math.min(i, s.scrollWidth - r)), e ? removeClass(s, "animated") : addClass(s, "animated"), setStyle(s, "transform", "translateX(-" + cur.storiesPos + "px)"), Stories.updateFeedArrows()
        },
        feedScrollToOwner: function(t) {
            var e = ge("stories_feed_items"),
                o = e.offsetWidth,
                s = ge("feed_story_" + t);
            if (s) {
                var r = s.offsetWidth,
                    i = s.offsetLeft;
                cur.storiesPos = i - o + o / 2 + r / 2, Stories.feedPaging(0, !0)
            }
        },
        updateFeedStories: function(t) {
            var e = this;
            t = t || "news", ge("stories_feed_items") && ("news" !== t ? hide("stories_feed_wrap") : show("stories_feed_wrap"), ajax.post("al_stories.php", {
                act: "feed_stories"
            }, {
                onDone: function(t, o) {
                    e._setList("feed", o);
                    var s = ge("stories_feed_items");
                    s && (t ? (setStyle(s, "transform", "translateX(0px)"), val(s, t), s.children.length < 8 ? addClass("stories_feed_wrap", "stories_feed_not_nav_buttons") : removeClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) : re("stories_feed_wrap"), cur.storiesPos = 0, Stories.updateFeedArrows())
                }
            }))
        },
        feedMouseWheel: function(t) {
            if (!(hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons") || vkNow() - cur.lastWinOnScroll < 300)) {
                cancelEvent(t);
                var e = Math.abs(t.deltaY) > Math.abs(t.deltaX) ? t.deltaY : t.deltaX;
                Stories.feedPaging(e, 1)
            }
        },
        updateFeedArrows: function() {
            var t = ge("stories_feed_items");
            if (t) {
                cur.storiesPos || (cur.storiesPos = 0);
                var e = geByClass1("stories_feed_wrap").offsetWidth,
                    o = t.scrollWidth - e;
                0 === cur.storiesPos ? addClass("stories_feed_arrow_left", "disabled") : removeClass("stories_feed_arrow_left", "disabled"), cur.storiesPos === o || 0 >= o ? addClass("stories_feed_arrow_right", "disabled") : removeClass("stories_feed_arrow_right", "disabled")
            }
        },
        showBlackList: function() {
            cur.storyLayer && cur.storyLayer.pauseStory(), showBox("al_stories.php", {
                act: "black_list"
            }, {
                onDone: function() {
                    cur.storiesBlackListScroll = new uiScroll("stories_black_list_result")
                },
                params: {
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }
            })
        },
        blackListItemClick: function(t, e) {
            cancelEvent(e);
            var o = intval(attr(t, "data-id"));
            cur.storiesBlackListShown[o] ? (delete cur.storiesBlackListShown[o], removeClass(t, "olist_item_wrap_on")) : (cur.storiesBlackListShown[o] = 1, addClass(t, "olist_item_wrap_on"))
        },
        saveBlackList: function(t) {
            var e = Object.keys(cur.storiesBlackListShown);
            return 0 === e.length ? void curBox().hide() : void ajax.post("al_stories.php", {
                act: "save_blacklist",
                hash: cur.storiesBlackList.hash,
                list: e.join(",")
            }, {
                onDone: function() {
                    curBox().hide(), Stories.updateFeedStories()
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        },
        blacklistUpdateUsers: function(t) {
            var e = t;
            if (t = trim(t).toLowerCase(), cur.storiesBlacklistLastQ !== t) {
                cur.storiesBlacklistLastQ = t;
                var o = t ? cur.storiesIndexer.search(t) : cur.storiesBlackList.users,
                    s = [];
                if (t)
                    for (var r = 0; r < t.length; r++) s.push(t.substr(r, 1));
                for (var i = new RegExp(s.join(".*?"), "i"), n = "", a = 0; a < o.length; a++) {
                    var l = o[a],
                        d = t ? l.name.replace(i, function(t) {
                            return "<em>" + t + "</em>"
                        }) : l.name;
                    n += cur.storiesBlackList.tpl.replace(/\{id\}/g, l.id).replace("{photo}", l.photo).replace("{name}", d).replace("{href}", l.href).replace("{class_name}", cur.storiesBlackListShown[l.id] ? " olist_item_wrap_on" : "")
                }
                n || (n = '<div class="no_rows">' + getLang("global_search_not_found").replace("{search}", clean(e)) + "</div>"), val(geByClass1("olist", "stories_black_list_result"), n)
            }
        },
        blackListInit: function(t) {
            cur.storiesBlackListShown = {}, cur.storiesBlackList = t, curBox().setOptions({
                width: 450,
                bodyStyle: "padding: 0px",
                onClean: function() {
                    this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                }
            }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, function(t) {
                return t.name
            }, function() {
                Stories.blacklistUpdateUsers("")
            }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(getLang("global_save"), Stories.saveBlackList).addButton(getLang("global_cancel"), void 0, "no")) : curBox().addButton(getLang("global_close"))
        },
        preloadUrl: function(t) {
            (0, d.loadMedia)(t)
        },
        layerShowStatSend: function() {
            cur.storiesShowLayerStatSent || (cur.storiesShowLayerStatSent = !0, ajax.post("al_stories.php", {
                act: "layer_shown_stat",
                hash: cur.storiesStatHash,
                has_new: geByClass1("story_feed_new_item", "stories_feed_items") ? 1 : 0
            }))
        },
        showNextRepliesChunk: function(t) {
            var e = gpeByClass("stories_feedback_replies_items", t);
            removeClass(geByClass1("stories_replies_chunk_hidden", e), "stories_replies_chunk_hidden");
            var o = geByClass1("stories_replies_chunk_hidden", e);
            o ? val(t, langNumeric(getLang("stories_replies_more_button", intval(attr(o, "data-size"))))) : re(t), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
        }
    };
    try {
        stManager.done("stories.js")
    } catch (u) {}
}, function(t, e, o) {
    var s;
    (function(t, r, i) {
        (function() {
            "use strict";

            function n(t) {
                return "function" == typeof t || "object" == typeof t && null !== t
            }

            function a(t) {
                return "function" == typeof t
            }

            function l(t) {
                X = t
            }

            function d(t) {
                Z = t
            }

            function c() {
                return function() {
                    t.nextTick(y)
                }
            }

            function h() {
                return function() {
                    z(y)
                }
            }

            function u() {
                var t = 0,
                    e = new tt(y),
                    o = document.createTextNode("");
                return e.observe(o, {
                        characterData: !0
                    }),
                    function() {
                        o.data = t = ++t % 2
                    }
            }

            function p() {
                var t = new MessageChannel;
                return t.port1.onmessage = y,
                    function() {
                        t.port2.postMessage(0)
                    }
            }

            function _() {
                return function() {
                    setTimeout(y, 1)
                }
            }

            function y() {
                for (var t = 0; q > t; t += 2) {
                    var e = st[t],
                        o = st[t + 1];
                    e(o), st[t] = void 0, st[t + 1] = void 0
                }
                q = 0
            }

            function f() {
                try {
                    var t = o(10);
                    return z = t.runOnLoop || t.runOnContext, h()
                } catch (e) {
                    return _()
                }
            }

            function v(t, e) {
                var o = this,
                    s = o._state;
                if (s === at && !t || s === lt && !e) return this;
                var r = new this.constructor(g),
                    i = o._result;
                if (s) {
                    var n = arguments[s - 1];
                    Z(function() {
                        R(s, r, n, i)
                    })
                } else F(o, r, t, e);
                return r
            }

            function m(t) {
                var e = this;
                if (t && "object" == typeof t && t.constructor === e) return t;
                var o = new e(g);
                return T(o, t), o
            }

            function g() {}

            function w() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function b() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function S(t) {
                try {
                    return t.then
                } catch (e) {
                    return dt.error = e, dt
                }
            }

            function k(t, e, o, s) {
                try {
                    t.call(e, o, s)
                } catch (r) {
                    return r
                }
            }

            function E(t, e, o) {
                Z(function(t) {
                    var s = !1,
                        r = k(o, e, function(o) {
                            s || (s = !0, e !== o ? T(t, o) : x(t, o))
                        }, function(e) {
                            s || (s = !0, P(t, e))
                        }, "Settle: " + (t._label || " unknown promise"));
                    !s && r && (s = !0, P(t, r))
                }, t)
            }

            function L(t, e) {
                e._state === at ? x(t, e._result) : e._state === lt ? P(t, e._result) : F(e, void 0, function(e) {
                    T(t, e)
                }, function(e) {
                    P(t, e)
                })
            }

            function C(t, e, o) {
                e.constructor === t.constructor && o === rt && constructor.resolve === it ? L(t, e) : o === dt ? P(t, dt.error) : void 0 === o ? x(t, e) : a(o) ? E(t, e, o) : x(t, e)
            }

            function T(t, e) {
                t === e ? P(t, w()) : n(e) ? C(t, e, S(e)) : x(t, e)
            }

            function B(t) {
                t._onerror && t._onerror(t._result), A(t)
            }

            function x(t, e) {
                t._state === nt && (t._result = e, t._state = at, 0 !== t._subscribers.length && Z(A, t))
            }

            function P(t, e) {
                t._state === nt && (t._state = lt, t._result = e, Z(B, t))
            }

            function F(t, e, o, s) {
                var r = t._subscribers,
                    i = r.length;
                t._onerror = null, r[i] = e, r[i + at] = o, r[i + lt] = s, 0 === i && t._state && Z(A, t)
            }

            function A(t) {
                var e = t._subscribers,
                    o = t._state;
                if (0 !== e.length) {
                    for (var s, r, i = t._result, n = 0; n < e.length; n += 3) s = e[n], r = e[n + o], s ? R(o, s, r, i) : r(i);
                    t._subscribers.length = 0
                }
            }

            function O() {
                this.error = null
            }

            function I(t, e) {
                try {
                    return t(e)
                } catch (o) {
                    return ct.error = o, ct
                }
            }

            function R(t, e, o, s) {
                var r, i, n, l, d = a(o);
                if (d) {
                    if (r = I(o, s), r === ct ? (l = !0, i = r.error, r = null) : n = !0, e === r) return void P(e, b())
                } else r = s, n = !0;
                e._state !== nt || (d && n ? T(e, r) : l ? P(e, i) : t === at ? x(e, r) : t === lt && P(e, r))
            }

            function M(t, e) {
                try {
                    e(function(e) {
                        T(t, e)
                    }, function(e) {
                        P(t, e)
                    })
                } catch (o) {
                    P(t, o)
                }
            }

            function N(t) {
                return new ft(this, t).promise
            }

            function j(t) {
                function e(t) {
                    T(r, t)
                }

                function o(t) {
                    P(r, t)
                }
                var s = this,
                    r = new s(g);
                if (!Q(t)) return P(r, new TypeError("You must pass an array to race.")), r;
                for (var i = t.length, n = 0; r._state === nt && i > n; n++) F(s.resolve(t[n]), void 0, e, o);
                return r
            }

            function H(t) {
                var e = this,
                    o = new e(g);
                return P(o, t), o
            }

            function W() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function D() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function V(t) {
                this._id = _t++, this._state = void 0, this._result = void 0, this._subscribers = [], g !== t && ("function" != typeof t && W(), this instanceof V ? M(this, t) : D())
            }

            function U(t, e) {
                this._instanceConstructor = t, this.promise = new t(g), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? x(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && x(this.promise, this._result))) : P(this.promise, this._validationError())
            }

            function Y() {
                var t;
                if ("undefined" != typeof r) t = r;
                else if ("undefined" != typeof self) t = self;
                else try {
                    t = Function("return this")()
                } catch (e) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var o = t.Promise;
                (!o || "[object Promise]" !== Object.prototype.toString.call(o.resolve()) || o.cast) && (t.Promise = yt)
            }
            var K;
            K = Array.isArray ? Array.isArray : function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            };
            var z, X, G, Q = K,
                q = 0,
                Z = function(t, e) {
                    st[q] = t, st[q + 1] = e, q += 2, 2 === q && (X ? X(y) : G())
                },
                $ = "undefined" != typeof window ? window : void 0,
                J = $ || {},
                tt = J.MutationObserver || J.WebKitMutationObserver,
                et = "undefined" != typeof t && "[object process]" === {}.toString.call(t),
                ot = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                st = new Array(1e3);
            G = et ? c() : tt ? u() : ot ? p() : void 0 === $ ? f() : _();
            var rt = v,
                it = m,
                nt = void 0,
                at = 1,
                lt = 2,
                dt = new O,
                ct = new O,
                ht = N,
                ut = j,
                pt = H,
                _t = 0,
                yt = V;
            V.all = ht, V.race = ut, V.resolve = it, V.reject = pt, V._setScheduler = l, V._setAsap = d, V._asap = Z, V.prototype = {
                constructor: V,
                then: rt,
                "catch": function(t) {
                    return this.then(null, t)
                }
            };
            var ft = U;
            U.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, U.prototype._enumerate = function() {
                for (var t = this.length, e = this._input, o = 0; this._state === nt && t > o; o++) this._eachEntry(e[o], o)
            }, U.prototype._eachEntry = function(t, e) {
                var o = this._instanceConstructor,
                    s = o.resolve;
                if (s === it) {
                    var r = S(t);
                    if (r === rt && t._state !== nt) this._settledAt(t._state, e, t._result);
                    else if ("function" != typeof r) this._remaining--, this._result[e] = t;
                    else if (o === yt) {
                        var i = new o(g);
                        C(i, t, r), this._willSettleAt(i, e)
                    } else this._willSettleAt(new o(function(e) {
                        e(t)
                    }), e)
                } else this._willSettleAt(s(t), e)
            }, U.prototype._settledAt = function(t, e, o) {
                var s = this.promise;
                s._state === nt && (this._remaining--, t === lt ? P(s, o) : this._result[e] = o), 0 === this._remaining && x(s, this._result)
            }, U.prototype._willSettleAt = function(t, e) {
                var o = this;
                F(t, void 0, function(t) {
                    o._settledAt(at, e, t)
                }, function(t) {
                    o._settledAt(lt, e, t)
                })
            };
            var vt = Y,
                mt = {
                    Promise: yt,
                    polyfill: vt
                };
            o(9).amd ? (s = function() {
                return mt
            }.call(e, o, e, i), !(void 0 !== s && (i.exports = s))) : "undefined" != typeof i && i.exports ? i.exports = mt : "undefined" != typeof this && (this.ES6Promise = mt), vt()
        }).call(this)
    }).call(e, o(6), function() {
        return this
    }(), o(3)(t))
}]);