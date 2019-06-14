! function(e) {
    function t(t) {
        for (var i, a, n = t[0], d = t[1], l = t[2], c = 0, _ = []; c < n.length; c++) a = n[c], r[a] && _.push(r[a][0]), r[a] = 0;
        for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (e[i] = d[i]);
        for (h && h(t); _.length;) _.shift()();
        return o.push.apply(o, l || []), s()
    }

    function s() {
        for (var e, t = 0; t < o.length; t++) {
            for (var s = o[t], i = !0, n = 1; n < s.length; n++) {
                var d = s[n];
                0 !== r[d] && (i = !1)
            }
            i && (o.splice(t--, 1), e = a(a.s = s[0]))
        }
        return e
    }
    var i = {},
        r = {
            "web/stories": 0
        },
        o = [];

    function a(t) {
        if (i[t]) return i[t].exports;
        var s = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(s.exports, s, s.exports, a), s.l = !0, s.exports
    }
    a.m = e, a.c = i, a.d = function(e, t, s) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (a.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) a.d(s, i, function(t) {
                return e[t]
            }.bind(null, i));
        return s
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        d = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var l = 0; l < n.length; l++) t(n[l]);
    var h = d;
    o.push([140, "bundles/common", "bundles/vendors"]), s()
}({
    140: function(e, t, s) {
        e.exports = s("EJ7F")
    },
    "16Al": function(e, t, s) {
        "use strict";
        var i = s("WbBG");

        function r() {}

        function o() {}
        o.resetWarningCache = r, e.exports = function() {
            function e(e, t, s, r, o, a) {
                if (a !== i) {
                    var n = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                    throw n.name = "Invariant Violation", n
                }
            }

            function t() {
                return e
            }
            e.isRequired = e;
            var s = {
                array: e,
                bool: e,
                func: e,
                number: e,
                object: e,
                string: e,
                symbol: e,
                any: e,
                arrayOf: t,
                element: e,
                elementType: e,
                instanceOf: t,
                node: e,
                objectOf: t,
                oneOf: t,
                oneOfType: t,
                shape: t,
                exact: t,
                checkPropTypes: o,
                resetWarningCache: r
            };
            return s.PropTypes = s, s
        }
    },
    "17x9": function(e, t, s) {
        e.exports = s("16Al")()
    },
    EJ7F: function(e, t, s) {
        "use strict";
        s.r(t);
        s("pIFo"), s("Oyvg"), s("OG14"), s("rGqo"), s("Btvt"), s("KKXr"), s("SRfc");
        var i = s("q1tI"),
            r = s("i8i4"),
            o = s("E2g8"),
            a = o.Promise,
            n = {},
            d = {},
            l = [],
            h = !1,
            c = !1;

        function _(e, t, s) {
            var i = d[e];
            if (i)
                for (var r = 0; r < i.length; r++) {
                    var o = i[r];
                    t ? o.resolve(s) : o.reject(), i.splice(r, 1), r--
                }
        }

        function v(e, t) {
            h.postMessage({
                cmd: "load",
                url: e
            })
        }

        function p(e) {
            return h || ((h = new Worker("/js/al/stories_loader_worker.js")).onmessage = (e => {
                var t = e.data;
                switch (t.type) {
                    case "loaded":
                        n[t.url] = t.data, _(t.url, !0, t.data);
                        break;
                    case "error":
                        _(t.url, !1);
                        break;
                    case "inited":
                        c = !0;
                        for (var s = 0; s < l.length; s++) v(l[s])
                }
            })), new a((t, s) => {
                if (e || t(""), n[e]) return t(n[e]);
                switch (function(e) {
                    return e.match(/\.mp4/) ? "video" : e.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
                }(e)) {
                    case "video":
                    case "image":
                        d[e] || (d[e] = []);
                        var i = 0 === d[e].length;
                        if (d[e].push({
                                resolve: t,
                                reject: s
                            }), !i) return;
                        c ? v(e) : l.push(e);
                        break;
                    default:
                        vk.dev && console.error("wrong media url")
                }
            })
        }
        var u = !1;

        function y(e) {
            return u || function() {
                var e = function(e) {
                    try {
                        return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                    } catch (e) {}
                    return !1
                }(utilsNode.appendChild(ce("iframe")));
                u = e && e.body ? e.body : utilsNode.appendChild(ce("div", {}, {
                    display: "none"
                }))
            }(), e.match(/\.mp4/) ? function(e) {
                return new a((t, s) => {
                    var i = ce("video");
                    i.oncanplay = (() => {
                        t(), re(i)
                    }), i.onerror = (() => {
                        s(), re(i)
                    }), u.appendChild(i), i.src = e
                })
            }(e) : function(e) {
                return new a((t, s) => {
                    var i = vkImage();
                    i.onload = (() => {
                        t(), re(i)
                    }), i.onerror = (() => {
                        s(), re(i)
                    }), u.appendChild(i), i.src = e
                })
            }(e)
        }

        function m() {
            var e = ls.get("video_volume");
            return "number" == typeof e ? Math.min(1, Math.max(0, e)) : 1
        }

        function g(e) {
            ls.set("video_volume", e)
        }

        function w() {
            var e = [];
            return [...arguments].forEach(t => {
                if (t) switch (typeof t) {
                    case "string":
                        e.push(t);
                        break;
                    case "object":
                        Object.keys(t).forEach(s => {
                            t[s] && e.push(s)
                        });
                        break;
                    default:
                        e.push("" + t)
                }
            }), e.join(" ")
        }
        var f = [];

        function b(e, t) {
            cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = e, ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
                id: "stories_layers_background",
                className: "stories_layers_background"
            })), layerQueue.hide(), layerQueue.push(), layers.fullhide = k, addEvent(window, "visibilitychange", C.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", C.resize), addEvent(document, "keydown", C.keydown), addEvent(document, "keyup", C.keyup)), e.animateStory("expand", t.fromEl), f.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + f.length, ([t] = []) => {
                var s = arguments[0] && arguments[0].isCloseBtnClick;
                t ? e._sendNavigationStatEvents("close_auto_by_time") : e._sendNavigationStatEvents("close_tap"), f.length > 1 && !s ? e.back(!0) : (e.hideAllLayers = s, e.hide(!1, !0))
            })
        }

        function S() {
            f.length > 1 ? f[f.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function k(e, t = !1) {
            for (var s = 0; s < f.length; s++) f[s].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", C.visibilitychange), removeEvent(window, "resize", C.resize), removeEvent(document, "keydown", C.keydown), removeEvent(document, "keyup", C.keyup), t) {
                var i = nav.objLoc;
                delete i.w, nav.setLoc(i)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), f = []
        }

        function L() {
            return f[f.length - 2]
        }

        function E(e) {
            for (var t = 0; t < f.length; t++) f[t].onReplyDeleted(e)
        }
        var C = {
                visibilitychange: e => {
                    cur.storyLayer && cur.storyLayer.onVisibilityChange(e)
                },
                resize: e => {
                    cur.storyLayer && cur.storyLayer.onResize(e)
                },
                keydown: e => {
                    cur.storyLayer && cur.storyLayer.onKeyDown(e)
                },
                keyup: e => {
                    cur.storyLayer && cur.storyLayer.onKeyUp(e)
                }
            },
            T = (s("tUrg"), s("17x9"), s("T/g7"));

        function x({
            story: e
        }) {
            var {
                hide_settings: t
            } = e.getCurStoryData(), {
                uiActionsMenu: s
            } = window;
            if (t) return null;
            var r, o, a = function(e) {
                var t = [],
                    {
                        raw_id: s,
                        can_hide_reply: i,
                        report_hash: r,
                        can_remove: o,
                        can_share: a,
                        narrative: n,
                        is_ads: d
                    } = e.getCurStoryData(),
                    {
                        can_blacklist: l
                    } = e.data,
                    [h] = s.split("_").map(e => intval(e)),
                    c = n && !n.is_cover;
                !l || c || d || t.push({
                    label: Object(T.b)("stories_add_blacklist_button"),
                    onClick: () => e._addToBlacklist()
                });
                i && t.push({
                    label: Object(T.b)("stories_hide_reply_button"),
                    onClick: () => e._hideReply()
                });
                n && t.push({
                    label: n.is_bookmarked ? Object(T.b)("stories_narrative_remove_bookmark_button") : Object(T.b)("stories_narrative_add_bookmark_button"),
                    onClick: () => e._sendNarrativeBookmarkButtonDidPress()
                });
                a && t.push({
                    label: Object(T.b)("stories_share"),
                    onClick: () => e.shareBox()
                });
                n && n.can_edit && t.push({
                    label: Object(T.b)("stories_narrative_edit_button"),
                    onClick: () => e._sendNarrativeEditButtonDidPress()
                });
                o && e.getOwnerId() < 0 && t.push({
                    label: n ? Object(T.b)("global_narrative_delete") : Object(T.b)("global_delete"),
                    onClick: () => n ? e.removeNarrativeBox() : e.removeStoryBox()
                });
                r && t.push({
                    label: Object(T.b)("stories_report"),
                    onClick: () => e.report()
                });
                h === vk.id || c || t.push({
                    label: Object(T.b)("stories_settings"),
                    onClick: () => window.Stories.showBlackList()
                });
                return t
            }(e);
            if (0 === a.length) return null;
            return i.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: t => {
                    clearTimeout(r), e.pauseStory(), s.show(o, t)
                },
                onMouseLeave: () => {
                    s.hide(o), clearTimeout(r), r = setTimeout(() => e.autoResumeStory(), 300)
                },
                ref: e => {
                    o = e
                }
            }, i.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, a.map(({
                label: e,
                className: t,
                onClick: s
            }) => i.createElement("div", {
                key: e,
                className: "ui_actions_menu_item",
                onClick: s
            }, e))))
        }

        function B({
            story: e
        }) {
            var t = e.getReplies(),
                s = e.getViews() || "",
                {
                    can_manage: r,
                    narrative: o
                } = e.getCurStoryData(),
                a = t.count || "",
                n = o && !o.is_cover,
                d = !(!r || !s),
                l = e.isActiveLive();
            if (n || l || !s && !a) return null;
            return i.createElement("div", {
                className: "stories_button views _views_button",
                onClick: t => {
                    e._hideTooltip(), e.showFeedbackTooltip(), t.stopPropagation()
                }
            }, d && i.createElement("div", {
                className: "stories_button_views"
            }, s), a && i.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(a, "%s", !0)
                }
            }))
        }
        var {
            getLang: P,
            showTooltip: N,
            trim: F,
            addEvent: I,
            removeEvent: j,
            cancelEvent: D,
            isObject: O,
            showNarrative: A
        } = window;
        class R extends i.Component {
            constructor(e) {
                super(e), this.emojiId = !1, this.state = {
                    story: e.story,
                    sendFormHasText: !1,
                    sendFormFocused: !1,
                    linkObjectAudioPlaying: !1
                }
            }
            componentDidMount() {
                this.emojiInit()
            }
            componentWillUnmount() {
                this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId)
            }
            componentDidUpdate() {
                this.emojiInit()
            }
            render() {
                var e = this.props.story;
                if (!e.story || !this.props.story.getCurStoryData()) return "";
                var t = {
                    left_side_empty: this._leftSideIsEmpty()
                };
                return i.createElement("div", {
                    className: w("stories_story_bottom", t)
                }, i.createElement("div", {
                    className: "stories_story_bottom_controls",
                    ref: "controls"
                }, i.createElement(B, {
                    story: e
                }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), i.createElement(x, {
                    story: e
                })))
            }
            _renderLink() {
                var {
                    link: e
                } = this.props.story.getCurStoryData();
                if (!O(e)) return "";
                var t = "stories_link";
                return e.object_type && (t += ` story_link_object_${e.object_type}`), this.state.linkObjectAudioPlaying && (t += " story_link_object_audio_playing"), i.createElement("div", {
                    className: "stories_link_wrap"
                }, i.createElement("a", {
                    target: "_blank",
                    rel: "noopener",
                    className: t,
                    href: e.url,
                    title: e.text,
                    onClick: t => {
                        this._linkDidPress(t, e)
                    }
                }, i.createElement("span", {
                    className: "stories_link__inner",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                })))
            }
            _renderMask() {
                var {
                    mask_id: e
                } = this.props.story.getCurStoryData();
                return e ? i.createElement("div", {
                    className: "stories_button mask _mask_button",
                    onMouseOver: e => N(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: P("stories_mask_tooltip")
                    }),
                    onClick: this._maskButtonDidPress.bind(this)
                }) : ""
            }
            _renderShare() {
                var {
                    can_share: e
                } = this.props.story.getCurStoryData();
                return !0 !== e ? "" : i.createElement("div", {
                    className: "stories_button share _share_button",
                    onMouseOver: e => N(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: P("stories_share")
                    }),
                    onClick: this._shareButtonDidPress.bind(this)
                })
            }
            _renderRemove() {
                var e = this.props.story,
                    {
                        can_remove: t
                    } = e.getCurStoryData();
                return !t || e.getOwnerId() < 0 ? "" : i.createElement("div", {
                    className: "stories_button remove _remove_button",
                    onMouseOver: e => N(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: P("global_delete")
                    }),
                    onClick: this._removeButtonDidPress.bind(this)
                })
            }
            _canMessage() {
                var {
                    link: e,
                    can_comment: t
                } = this.props.story.getCurStoryData();
                return !(O(e) || !t || this.props.story.isLiveEnded())
            }
            _renderMessageForm() {
                var {
                    story: e
                } = this.props;
                if (this._canMessage()) return i.createElement("div", {
                    ref: "sendForm",
                    className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                }, i.createElement("div", {
                    className: "stories_send_form_text_wrap"
                }, i.createElement("div", {
                    contentEditable: !0,
                    ref: "messageInput",
                    className: "stories_send_form_text",
                    placeholder: P("stories_answer_placeholder"),
                    onFocus: this._sendFormDidFocus.bind(this),
                    onBlur: this._sendFormDidBlur.bind(this),
                    onKeyUp: () => e._onSendFormKeyUp()
                })), i.createElement("div", {
                    className: "stories_send_form_helper"
                }, i.createElement("div", {
                    className: w("stories_send_form_buttons _emoji_wrap", {
                        shown: this.state.sendFormFocused || this.state.sendFormHasText
                    })
                }, i.createElement("div", {
                    ref: "smileButton",
                    className: "stories_send_form_button smile _emoji_btn emoji_smile",
                    onMouseEnter: e => {
                        Emoji.clearSizeCached(this.refs.smileButton), Emoji.show(this.refs.smileButton, e.nativeEvent)
                    },
                    onMouseLeave: e => Emoji.hide(this.refs.smileButton, e.nativeEvent),
                    onMouseDown: e => D(e.nativeEvent)
                }), i.createElement("div", {
                    className: w("stories_send_form_button send", {
                        active: this.state.sendFormHasText
                    }),
                    onClick: this._sendMessageButtonDidPress.bind(this)
                }))))
            }
            emojiInit() {
                !this.emojiId && this.refs.messageInput ? (this.emojiId = Emoji.init(this.refs.messageInput, {
                    ttDiff: 29,
                    noStickers: !0,
                    noStickersStore: !0,
                    ref: "stories",
                    ttWrap: this.refs.controls,
                    checkEditable: () => {
                        this.props.story.isActiveLive() && VideoChat.checkTextLen(this.refs.messageInput)
                    },
                    onSend: () => this.props.story._onAnswerSend(void 0, () => this._emojiDidKeyAction()),
                    forceUp: !0,
                    controlsCont: this.refs.sendForm,
                    onKeyAction: () => this._emojiDidKeyAction(),
                    onEmojiAdded: () => this._emojiDidKeyAction()
                }), I(this.refs.smileButton, "click", D), placeholderInit(this.refs.messageInput, {
                    editable: !0
                })) : this.emojiId && !this.refs.messageInput && (j(this.refs.smileButton, "click", D), Emoji.destroy(this.emojiId), delete this.emojiId)
            }
            _leftSideIsEmpty() {
                var e = this.props.story,
                    {
                        can_manage: t,
                        link: s,
                        can_comment: i,
                        narrative: r
                    } = this.props.story.getCurStoryData(),
                    o = e.getReplies(),
                    a = e.getViews();
                return !(a && 0 !== parseInt(a) && !r) && (!o.count || !t) && !O(s) && !i || e.isLiveEnded()
            }
            _sendFormDidFocus() {
                var {
                    story: e
                } = this.props;
                this.setState({
                    sendFormFocused: !0
                }), e._onSendFormFocus(), e.layer._sendNavigationStatEvents("comment_tap")
            }
            _sendFormDidBlur() {
                this.props.story._onSendFormBlur(), this.setState({
                    sendFormFocused: !1
                }), this._emojiDidKeyAction()
            }
            _emojiDidKeyAction() {
                var e = F(Emoji.editableVal(this.refs.messageInput));
                this.setState({
                    sendFormHasText: e.length > 0
                }), this.refs.messageInput.check()
            }
            _viewsButtonDidPress(e) {
                this.props.story.showFeedbackTooltip(), e.stopPropagation()
            }
            _shareButtonDidPress() {
                this.props.story.shareBox()
            }
            _removeButtonDidPress() {
                this.props.story.removeStoryBox()
            }
            _maskButtonDidPress() {
                this.props.story.sendMask()
            }
            _linkDidPress(e, t) {
                if (t) {
                    var s = t.object_type,
                        i = t.object,
                        r = t.url.match(/\/narrative(-?\d+_\d+)/);
                    if (r) {
                        e.preventDefault();
                        var o = r[1];
                        o && (this.props.story.pauseStory(), A(o, {
                            fromEl: this.props.story.wrapEl,
                            isOpenNarrativeFromFeed: !0,
                            source: "narrative_story"
                        }))
                    } else this.props.story._sendStatEvent("url_view");
                    switch (s) {
                        case "audio":
                            this.state.linkObjectAudioPlaying ? (getAudioPlayer().pause(), this.state.story.audioPlaying = !1, cur.storyLayer.resumeLayer()) : (getAudioPlayer().playAudio(i), this.state.story.audioPlaying = !0, cur.storyLayer.pauseLayer()), this.setState({
                                linkObjectAudioPlaying: !this.state.linkObjectAudioPlaying
                            }), e.preventDefault()
                    }
                }
            }
            _sendMessageButtonDidPress() {
                this.props.story._onAnswerSend(void 0, () => this._emojiDidKeyAction())
            }
        }
        class M {
            constructor(e, t) {
                this.data = e, this.opts = t, this.paused = !0, this.loaded = !1, this.elems = {}, this.startTs = 0;
                var {
                    is_expired: s,
                    is_deleted: i,
                    can_view_deleted: r,
                    is_private: o,
                    narrative: a
                } = e;
                r || (s ? this._error("expired") : i ? a ? this._error("deleted-narrative") : this._error("deleted") : o && (a ? this._error("private-narrative") : this._error("private")), (s || i || o) && (this.failed = !0))
            }
            render() {
                this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(() => {
                    this.isLoaded() || this.opts.onLongLoading()
                }, 1e3), this.opts.onLoadingStart())
            }
            renderNarrativeCover() {
                var {
                    narrative: e,
                    photo_url: t
                } = this.data, s = e && e.views ? winToUtf(` · ${e.views}`) : "";
                return this.NarrativeCover = se(`\n      <div class="stories_narrative_cover">\n        <div class="stories_narrative_cover_photo" id="stories_narrative_cover_photo" style="background-image: url(${data})"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">${getLang("global_type_narrative")}</span>\n          <span class="stories_narrative_cover__views">${s}</span>\n        </div>\n        <div class="stories_narrative_cover__title">${e.title}</div>\n        <div class="stories_narrative_cover__author">${e.owner_name}</div>\n      </div>\n    `), p(t).then(e => {
                    var t = geByClass1("stories_narrative_cover_photo");
                    t && setStyle(t, "backgroundImage", "url(" + e + ")")
                }), this.NarrativeCover
            }
            renderNarrativeMetaStory() {
                var e = !(!cur.storyLayer || !cur.storyLayer.isOpenNarrativeFromFeed),
                    t = cur.storyLayer.list,
                    s = `${t}_recommendations`,
                    i = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    r = ce("div", {
                        className: "narrative-meta-story"
                    }),
                    o = ce("div", {
                        className: "narrative-meta-story__buttons"
                    });
                o.appendChild(this.renderNarrativeButton("replay", () => {
                    cur.storyLayer._sendNavigationStatEvents("narrative_replay", !1), cur.storyLayer.changeStory(0)
                })), e && o.appendChild(this.renderNarrativeButton("go_to_stories", () => {
                    cur.storyLayer._sendNavigationStatEvents("narrative_go_to_stories", !1), cur.storyLayer.nextStory()
                })), r.appendChild(o);
                var a = Stories._getList(s);
                return t.match(/narrative-?\d+_\d+$/) && a && (this.coverItems = a.map(e => e.narrative_cover), this.coverCount = this.coverItems ? this.coverItems.length : 0, this.coverRowsCount = Math.ceil(this.coverCount / 3), this.elems.recBlock = ce("div", {
                    className: "narrative-meta-story__rec"
                }), this.elems.recInner = ce("div", {
                    className: "narrative-meta-story__rec-inner"
                }), this.elems.recItems = ce("div", {
                    className: "narrative-meta-story__rec-items"
                }), this.elems.recTitle = ce("div", {
                    className: "narrative-meta-story__rec-title",
                    innerHTML: getLang("stories_narrative_more")
                }), this.elemOffset = 0, 1 === this.coverRowsCount ? this.elemOffset = 26.4 : this.coverRowsCount > 1 && (this.elemOffset = 26.4 * 1.5), this.scrollOffset = i / 100 * this.elemOffset + 53, setStyle(o, {
                    paddingBottom: `${this.elemOffset}vh`
                }), setStyle(this.elems.recTitle, {
                    marginTop: `calc(100vh - ${this.elemOffset}vh - 53px - 70px)`
                }), this.coverItems.forEach(e => {
                    var t = ce("span", {
                            className: "narrative-preview",
                            onclick: t => {
                                var {
                                    target: i
                                } = t;
                                Stories.show(`${cur.storyLayer.getBlockKey(e)}/${s}`, {
                                    fromEl: i,
                                    narrativeId: e.narrative.id,
                                    source: "narrative_recommendations"
                                })
                            }
                        }, {
                            backgroundImage: `url('${e.preview_url}')`
                        }),
                        i = ce("div", {
                            className: "narrative-preview__inner",
                            innerHTML: `\n            <a href="${a[0].author.href}" class="narrative-preview__author" style="background-image: url('${a[0].author.photo}')"></a>\n            <span class="narrative-preview__title">${e.narrative.title}</span>\n          `
                        }, {
                            backgroundImage: `url('${e.small_preview}')`
                        });
                    t.appendChild(i), this.elems.recItems.appendChild(t)
                }), addEvent(this.elems.recBlock, "scroll wheel touchmove", this.handleRecommendationsScroll.bind(this)), this.elems.recInner.appendChild(this.elems.recTitle), this.elems.recInner.appendChild(this.elems.recItems), this.elems.recBlock.appendChild(this.elems.recInner), r.appendChild(this.elems.recBlock)), r
            }
            renderNarrativeButton(e, t) {
                if (!e) return "";
                var s = "",
                    i = "";
                switch (t = isFunction(t) ? t : () => {}, e) {
                    case "replay":
                        s = "replay", i = getLang("stories_narrative_repeat_bottom");
                        break;
                    case "go_to_stories":
                        s = "back", i = getLang("stories_narrative_back_bottom")
                }
                var r = ce("div", {
                        className: `narrative-meta-button__circle narrative-meta-button__circle_${s}`,
                        onclick: t
                    }),
                    o = ce("div", {
                        className: "narrative-meta-button__text",
                        innerHTML: i
                    }),
                    a = ce("div", {
                        className: "narrative-meta-button"
                    });
                return a.appendChild(r), a.appendChild(o), a
            }
            handleRecommendationsScroll() {
                var e = Math.min(this.elems.recInner.scrollTop / (this.scrollOffset / 100), 70) / 100;
                setStyle(this.elems.recBlock, {
                    backgroundColor: `rgba(0, 0, 0, ${e})`
                }), this.elems.recInner.scrollTop ? (addClass(this.elems.recBlock, "scroll"), this.pause()) : (this.play(), removeClass(this.elems.recBlock, "scroll"))
            }
            getContainer() {}
            play() {
                this.paused = !1, this.isLoaded() && this.opts.onPlay()
            }
            pause() {
                this.paused = !0, this.opts.onPause()
            }
            setCurrentTime(e = 0) {}
            destroy() {
                removeEvent(this.elems.recBlock), clearTimeout(this.longLoadingTimer)
            }
            isPaused() {
                return this.paused
            }
            isLoaded() {
                return this.loaded
            }
            getCurrentTime() {
                return 0
            }
            getDuration() {
                return 0
            }
            getId() {
                return this.data.raw_id
            }
            getTrackCode() {
                return this.data.track_code
            }
            getDate() {
                return this.data.date
            }
            getViews() {
                return this.data.views
            }
            getReplies() {
                return this.data.answers ? this.data.answers : {
                    count: "",
                    count_str: "",
                    users: []
                }
            }
            setViews(e) {
                this.data.views = e
            }
            setReplies(e) {
                this.data.answers = e
            }
            _onCanPlay() {
                if (clearTimeout(this.longLoadingTimer), this.loaded = !0, this.opts.onLoadingEnd(), this.startTs = Date.now(), !this.isPaused()) {
                    var e = document.visibilityState;
                    if (e && "visible" !== e) return;
                    this.play()
                }
            }
            _loadingError() {
                this._error("load")
            }
            _error(e) {
                clearTimeout(this.longLoadingTimer), this.opts.onError(e)
            }
            _isFailed() {
                return this.failed
            }
        }
        var H = 5e3;
        class W extends M {
            constructor(e, t, s) {
                super(e, t, s), this.wrapEl = s, this.videoRaw = `${this.data.video.owner_id}_${this.data.video.video_id}`
            }
            render() {
                super.render(), this.el = ce("div", {
                    className: "stories_live"
                });
                var e = ce("div", {
                    className: "stories_live_player"
                }, {
                    height: "100%",
                    width: "100%"
                });
                return this.el.appendChild(e), this.chatEl = se('\n      <div class="stories_live_chat">\n        <div class="mv_chat_messages_wrap">\n          <div class="mv_chat_messages"></div>\n        </div>\n        <div class="mv_chat_stickers_wrap"></div>\n      </div>\n    '), this.el.appendChild(this.chatEl), window.mvcur && window.mvcur.player && Videoview.hide(!1, !0), setTimeout(() => {
                    showInlineVideo(this.videoRaw, "", {
                        autoplay: 1,
                        module: "story",
                        onLoaded: () => {
                            this._onPlayerInited()
                        }
                    }, !1, e)
                }), this.el
            }
            destroy() {
                super.destroy(), this._resetTimer(), window.mvcur = {}, this.player && (this.player.destroy(), VideoChat.destroy()), cur.storyLayer._sendNavigationStatEvents("live_player_close", !1), delete this.el
            }
            getContainer() {
                return this.el || this.render()
            }
            onLiveEnded() {
                this.liveEnded = !0, hide(geByClass1("_error_msg", geByClass1("videoplayer_error")));
                var e = this.mvData.oid < 0 ? getLang("stories_live_ended_desc_club") : langSex(this.mvData.author_sex, getLang("stories_live_ended_desc_user", "raw"));
                e = e.replace("{name}", this.mvData.md_author);
                var t = this.mvData.oid < 0 ? getLang("stories_live_ended_open_club") : getLang("stories_live_ended_open_user");
                hide(this.chatEl), hide(domByClass(this.player.ui.thumb, "videoplayer_big_play_btn"));
                var s = cur.storyLayer.storiesBlocks.length > 1;
                this.el.appendChild(se(`\n    <div class="stories_live_end">\n      <div class="stories_live_end_author_photo" style="background-image: url(${this.mvData.author_photo})"></div>\n      <div class="stories_live_end_title">${getLang("stories_live_ended_title")}</div>\n      <div class="stories_live_end_desc">${e}</div>\n      <a href="${this.mvData.author_href}" class="stories_live_end_open_owner">${t}</a>\n      <div class="stories_live_end_timer" onclick="cur.storyLayer.nextStory()" style="${s?"":"display: none;"}">\n        <canvas class="_timer_canvas" width="100" height="100"></canvas>\n        <div class="stories_live_end_timer_text">${getLang("stories_live_ended_watch_next")}</div>\n      </div>\n    </div>\n    `)), s && setTimeout(() => {
                    this._startTimer()
                })
            }
            pause() {}
            play() {
                this.player && !this.liveEnded && (super.play(), this.player && this.player.play())
            }
            sendMessage(e, t) {
                e.length > mvcur.maxChatReplyLength || (ajax.post("al_video.php?act=post_comment", {
                    comment: e,
                    video: this.videoRaw,
                    hash: this.mvData.hash,
                    videoviewer_chat: 1
                }), cur.storyLayer.activeStory._onAnswerSended(t))
            }
            volumeUpdate() {
                this.player.setVolume(m())
            }
            _onCanPlay() {
                super._onCanPlay(), setStyle(this.el, "opacity", 1)
            }
            _onPlayerInited() {
                this._onCanPlay(), this.player = window.cur.videoInlinePlayer, this.play(), cur.storyLayer._sendNavigationStatEvents("live_player_show", !1), browser.safari && this.player.toggleMute(!0, !1), this.mvData = Videoview.getMvData(), window.mvcur = {
                    chatMode: !0,
                    maxChatReplyLength: this.mvData.maxChatReplyLength,
                    mvData: this.mvData,
                    mvShown: !0,
                    queueKey: this.mvData.queue_params.key,
                    qversion: this.mvData.qversion
                }, VideoChat.init(this.chatEl, {
                    scrollHidden: !0
                }), Videoview.queueCheckUpdates(this.mvData.queue_params)
            }
            _startTimer() {
                if (window.CanvasRenderingContext2D) {
                    var e = domByClass(this.el, "_timer_canvas"),
                        t = e.getContext("2d");
                    t.lineWidth = 6, t.lineCap = "round", t.strokeStyle = "#fff";
                    var s = Date.now(),
                        i = () => {
                            var e = (Date.now() - s) / H;
                            e < 1 ? (t.clearRect(0, 0, 100, 100), t.beginPath(), t.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), t.stroke(), this._nextTO = setTimeout(i, 16)) : cur.storyLayer.nextStory()
                        };
                    show(e), this.timerInProgress = !0, i()
                }
            }
            _resetTimer() {
                window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this.el, "_timer_canvas")))
            }
        }
        class $ extends M {
            constructor(e, t) {
                super(e, t), this.isFirstChunkLoaded = !1
            }
            render() {
                if (super.render(), this.video) return this.video;
                var {
                    video_url: e
                } = this.data;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", () => {
                    this._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = e, this.volumeUpdate(), this.video)
            }
            getContainer() {
                return this.video || this.render()
            }
            getImage() {
                var e = getSize(this.video),
                    t = ce("canvas", {
                        width: e[0],
                        height: e[1]
                    });
                return t.getContext("2d").drawImage(this.video, 0, 0, e[0], e[1]), t.toDataURL()
            }
            destroy() {
                super.destroy(), removeEvent(this.video), delete this.video
            }
            play() {
                if (super.play(), this.loaded && this.video) {
                    var e = this.video.play();
                    void 0 !== e && e.catch(e => {
                        this.opts.onAutoPlayFail()
                    })
                }
            }
            pause() {
                super.pause(), this.video && this.video.pause()
            }
            setCurrentTime(e = 0) {
                this.loaded && (this.video.currentTime = e)
            }
            getCurrentTime() {
                return 1e3 * this.video.currentTime
            }
            getDuration() {
                return 1e3 * this.video.duration
            }
            _onCanPlay(e) {
                super._onCanPlay(e), this.isFirstChunkLoaded || (this.isFirstChunkLoaded = !0, cur.storyLayer._sendNavigationStatEvents("view_story")), setStyle(this.video, "opacity", 1)
            }
            volumeUpdate() {
                this.video.volume = m()
            }
        }
        var K = 5e3;
        class U extends M {
            constructor(e, t) {
                super(e, t), this.pauseTime = 0
            }
            render() {
                if (super.render(), this.photo) return this.photo;
                var {
                    photo_url: e,
                    narrative: t
                } = this.data;
                return this.photo = ce("div", {
                    className: "stories_photo"
                }), this._isFailed() ? this.photo : (p(e).then(e => {
                    this.photo && (t && t.is_cover ? addClass(this.photo, "stories_narrative_cover_blur") : setStyle(this.photo, "backgroundImage", "url(" + e + ")"), this._onCanPlay())
                }).catch(() => {
                    this._loadingError()
                }), this.photo)
            }
            getContainer() {
                return this.isNarrativeMetaStory || this.photo || this.render()
            }
            destroy() {
                super.destroy(), delete this.photo
            }
            play() {
                (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), super.play()
            }
            pause() {
                this.isPaused() || (super.pause(), this.pauseTime = this.getCurrentTime())
            }
            setCurrentTime(e = 0) {
                this.startTs = Date.now() + e, this.isPaused() && (this.pauseTime = e)
            }
            getCurrentTime() {
                return Date.now() - this.startTs || 0
            }
            getDuration() {
                return K
            }
            _onCanPlay() {
                super._onCanPlay(), cur.storyLayer._sendNavigationStatEvents("view_story"), setStyle(this.photo, "opacity", 1)
            }
        }
        var V = "stories_manage",
            z = 200,
            G = {
                hashtag: 1,
                mention: 2
            },
            q = s("zxIV"),
            {
                radioBtns: Y,
                getLang: X,
                lockButton: Q,
                unlockButton: J,
                removeEvent: Z,
                addEvent: ee,
                addClass: te,
                removeClass: ie,
                toggleClass: oe,
                geByClass1: ae,
                geByClass: ne,
                ge: de,
                se: le,
                domQuery: he,
                curBox: _e,
                showBox: ve,
                extend: pe,
                setStyle: ue
            } = window;
        class ye {
            constructor(e, t) {
                this.data = e, this.opts = t, this.id = t.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = t.layer, this._onResizeHandle = this._onResizeHandle.bind(this), this.longTapTimer
            }
            destroy() {
                this._destroyStory(), Z(this.contWrap, "click", this._onClickHandle.bind(this)), Z(ae("stories_item_cont", this.contWrap)), Z(ae("stories_reply_to", this.replyToWrap)), Z(this.shareButton), delete this.shareButton, Z(this.followBtn), delete this.followBtn, Z(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                for (var e = ne("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Z(e[t]);
                Z(this.viewsButton), Z(ae("stories_feedback_close", this.wrapEl)), Z(ae("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.descEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var s = !1, i = 0; i < this.data.items.length; i++)
                    if (this.data.items[i].unread) {
                        s = !0;
                        break
                    }
                var r = L();
                if (!s && r && r.activeStory) {
                    var o = he("#feed_story_" + this.layer.getBlockKey(this.data), r.activeStory.wrapEl)[0];
                    ie(o, "story_feed_new_item"), ie(o, "story_feed_new_item_promo")
                }
            }
            _destroyTimeLine() {
                for (var e = ne("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Z(e[t])
            }
            getOwnerId() {
                return this.data.author.id
            }
            getIndex() {
                return this.index
            }
            isLastStory() {
                return this.index >= this.data.items.length - 1
            }
            getRawId() {
                return !!this.story && this.story.getId()
            }
            getTrackCode() {
                return !!this.story && this.story.getTrackCode()
            }
            getReadHash() {
                return this.data.read_hash
            }
            getType() {
                return this.data.type
            }
            getItems() {
                return this.data.items
            }
            getItemsLength() {
                return this.getItems().length
            }
            render() {
                this.wrapEl = ce("div", {
                    className: "stories_item"
                }), this.contWrap = ce("div", {
                    className: "stories_item_cont_wrap"
                }), this.contStickers = ce("div", {
                    className: "stories_item_cont_sticker"
                }), this.contWrap.appendChild(this.contStickers), this.wrapEl.appendChild(this.contWrap), ee(this.contWrap, "click", this._onClickHandle.bind(this));
                var e = ce("div", {
                    className: "stories_item_cont"
                });
                return ee(e, "mousedown", this._onMouseDownHandle.bind(this)), ee(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor()), this.contWrap.appendChild(ce("div", {
                    className: "stories_bottom_wrap"
                })), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                    className: "stories_item_back"
                }), e.appendChild(this.backButton)), this.replyToWrap = e.appendChild(ce("div", {
                    className: "stories_reply_to_wrap"
                })), this.inlineLoader = e.appendChild(ce("div", {
                    className: "stories_inline_loader",
                    innerHTML: getProgressHtml()
                })), e.appendChild(ce("div", {
                    className: "stories_play_button video_thumb_play"
                })), this.isActiveLive() ? te(this.wrapEl, "live") : this._initTimeLine(), oe(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }
            updateBottom(e) {
                var t = ae("stories_bottom_wrap", this.wrapEl);
                !this.isActive || e || this.story.isNarrativeMetaStory ? (r.unmountComponentAtNode(t), val(t, "")) : r.render(i.createElement(R, {
                    story: this
                }), t)
            }
            _canForceDeleteStories() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }
            _initTimeLine() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), ae("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
            }
            _isActionsShown() {
                var e = domClosest("_ui_menu_wrap", this.wrapEl);
                return hasClass(e, "shown")
            }
            _renderPreview() {
                return le('<div class="stories_preview"></div>')
            }
            _renderMessage(e) {
                return le(`<div class="stories_message">\n  <div class="stories_message_text">${e}</div>\n</div>`)
            }
            _showMessage(e) {
                re(ae("stories_message", this.contWrap));
                var t = this._renderMessage(e);
                return this.contWrap.appendChild(t), clearTimeout(this.showMessageTimer), new Promise(e => {
                    this.showMessageTimer = setTimeout(() => {
                        this.contWrap.removeChild(t), e()
                    }, 3e3)
                })
            }
            _setPreview(e, t) {
                var {
                    index: s
                } = this, {
                    preview_url: i
                } = this.data.items[s], r = i;
                r !== this.curPreviewUrl && r && (t = t || (() => {}), e = e || ae("stories_preview", this.contWrap), p(r).then(i => {
                    s === this.index && r !== this.curPreviewUrl && (this.curPreviewUrl = r, ue(e, "backgroundImage", "url(" + i + ")")), ue(e, "opacity", 1), setTimeout(t, 0)
                }))
            }
            getPreview() {
                return this.data.items[this.index].preview_url
            }
            _renderAuthor() {
                var e, {
                        photo: t,
                        href: s,
                        name: i,
                        verify: r
                    } = this.data.author,
                    o = this.data && this.data.items[0] && this.data.items[0].narrative;
                this.data.is_narrative && o && !o.is_cover ? e = `\n      <div>\n          <div class="stories_narrative_title">${o.title}</div>\n          <span class="stories_narrative_author"><a href="${s}" class="stories_narrative_author_link">${i}</a> · ${X("global_type_narrative")}</span>\n      </div>` : e = `\n      <div class="stories_author_cont">\n        ${`<a href="${s}" class="stories_author_photo_wrap"><img src="${t}" class="stories_author_photo" /></a>`}\n        <a href="${s}" class="stories_author_name"><span>${i}</span></a>\n        ${r||""}\n        <div class="stories_desc"></div>\n      </div>`;
                var a = le(`\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">${e}</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    `);
                return ee(a, "click", e => {
                    Object(q.o)("a", e.target) && this.layer._sendNavigationStatEvents("go_to_author")
                }), !0 === this.data.hide_owner && val(ae("stories_author_cont", a), ""), oe(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.descEl = ae("stories_desc", a), this.authorButtons = ae("stories_author_buttons", a), a
            }
            _renderFollowButton() {
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), ee(this.followBtn, "click", this._onFollowBtnClick.bind(this)), ee(this.followBtn, "mouseover", () => {
                    var e = hasClass(this.followBtn, "followed") ? X("stories_unfollow") : X("stories_follow");
                    showTooltip(this.followBtn, {
                        black: 1,
                        center: 1,
                        shift: [0, 5, 0],
                        text: e,
                        appendEl: this.contWrap
                    })
                }), this.followBtn
            }
            _renderTimeLine() {
                return this.timeLineEl = ce("div", {
                    className: "stories_time_line"
                }), this.data.items.map((e, t) => {
                    var s = ce("div", {
                        className: "stories_time_line_item"
                    });
                    ee(s, "click", () => {
                        this.layer._sendNavigationStatEvents("go_to_story_click"), this.changeStory(t)
                    });
                    var i = ce("div", {
                        className: "stories_time_line_item_cont"
                    });
                    i.appendChild(ce("div", {
                        className: "stories_time_line_item_cont_active"
                    })), s.appendChild(i), this.timeLineEl.appendChild(s)
                }), this.timeLineEl
            }
            isPaused() {
                return !this.story || this.story.isPaused()
            }
            isLoaded() {
                return !this.story || this.story.isLoaded()
            }
            _onMouseDownHandle(e) {
                this.isActive && (this.isLocked() || !hasClass(e.target, "stories_item_cont") && !hasClass(e.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.longTapTimer = setTimeout(this._longTapHandle.bind(this), z)))
            }
            _onMouseUpHandle(e) {
                clearTimeout(this.longTapTimer);
                var {
                    downTs: t
                } = this;
                delete this.downTs;
                var s = !(vkNow() - t < z && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                if (this.isActive && hasClass(e.target, "stories_item_back") && !s && !this.tooltip) return this.prevStory();
                if (hasClass(e.target, "stories_item_cont") || hasClass(e.target, "stories_item_back"))
                    if (this._feedbackTTShown && this.hideFeedbackTooltip(), ie(this.wrapEl, "paused"), this.tooltip) this._hideTooltip();
                    else {
                        if (!this.isActive) {
                            this.id >= this.layer.activeStory.id && this.layer._markStoryAsSkipped();
                            var i = this.layer.storiesBlocks;
                            return i.indexOf(this.layer.getBlockKey(this)) > i.indexOf(this.layer.blockKey) ? this.layer._sendNavigationStatEvents("go_to_next_author") : this.layer._sendNavigationStatEvents("go_to_previous_author"), void this.opts.onSelect(this)
                        }
                        s ? this.isPaused() && this.playStory(!1, !!t) : this._onPlayEnd()
                    }
            }
            _longTapHandle() {
                this.story && this.story.pause(), te(this.wrapEl, "paused"), this.tooltip || this.layer._sendNavigationStatEvents("pause_long_tap")
            }
            isLocked() {
                return !!(this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") || _e() && "stories" !== _e().wkRaw)
            }
            autoResumeStory(e = !1) {
                this.audioPlaying || this.story && this.story.isNarrativeMetaStory || this.tooltip || this.playStory(!1, e)
            }
            playStory(e = !1, t) {
                this.isLocked() || (ie(this.wrapEl, "paused"), hide(boxLayerBG), hide(boxLayerWrap), this.story && !e || this._initStory(), this.story.play(), t && this.layer._sendNavigationStatEvents("resume_release"), delete this.downTs)
            }
            pauseStory(e) {
                this.story && (this.isPaused() || (e && te(this.wrapEl, "paused"), this.story.pause()))
            }
            changeStory(e) {
                if (this.index !== e && !this.formLocked) {
                    this._destroyStory(), this.index = e, this._hideTooltip();
                    var t = this.getCurStoryData();
                    t.narrative && t.narrative.is_cover ? this._setPreview(!1, this.playStory.bind(this)) : (this._setPreview(), this.playStory())
                }
            }
            getWrap() {
                return this.wrapEl
            }
            stop() {
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(ae("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), ie(this.wrapEl, "autoplay_failed")
            }
            getCurStoryData() {
                var e = this.data.items[this.index];
                return e || {}
            }
            isActiveLive() {
                return "live" === this.getCurStoryData().type
            }
            isLiveEnded() {
                return this.isActiveLive() && this.story.liveEnded
            }
            _initStory() {
                var e = this.getCurStoryData(),
                    {
                        type: t
                    } = e;
                this.story && this._destroyStory();
                var s = {
                    onLoadingStart: this._onLoadingStart.bind(this),
                    onLoadingEnd: this._onLoadingEnd.bind(this),
                    onPlay: this._onPlay.bind(this),
                    onPause: this._onPause.bind(this),
                    onError: this._showError.bind(this),
                    onLongLoading: this._showLoader.bind(this),
                    onAutoPlayFail: this._onAutoPlayFail.bind(this)
                };
                ("live" === t ? this.story = new W(e, s, this.wrapEl) : ("video" === t ? (this.story = new $(e, s), te(this.wrapEl, "video")) : (this.story = new U(e, s), this.opts.onVideoEnd(), ie(this.wrapEl, "video")), val(this.descEl, e.is_ads ? X("stories_is_ad") : this.story.getDate()), this.fillTimeLine()), "live" === t || "video" === t) && (m() > 0 && this.opts.onVideoPlay());
                this.opts.onStartStory(), oe(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), !this.data.author.can_follow || this.data.is_promo || this.isActiveLive() || this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = e.isNarrativeMetaStory, this._destroyFeedBackTT(), this.story.isNarrativeMetaStory || (this.updateBottom(), this.contWrap.appendChild(this.story.render())), e.clickable_stickers && this.renderStickersLayer(), this.story.data && this.story.data.narrative && this.story.data.narrative.is_cover && (this.contWrap.appendChild(this.story.renderNarrativeCover()), ee(ae("stories_narrative_cover", this.contWrap), "click", e => {
                    this._showTooltip(e, this._createNarrativeTooltipLink())
                })), this.story.isNarrativeMetaStory && !this.story.failed && (re(ae("stories_photo", this.contWrap)), re(ae("stories_video", this.contWrap)), te(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()), this.story._onCanPlay())
            }
            _getStickerStyle(e, t) {
                var {
                    clickable_stickers: s
                } = this.getCurStoryData(), {
                    original_width: i,
                    original_height: r
                } = s, {
                    top: o,
                    left: a,
                    width: n,
                    height: d,
                    rotate: l
                } = e, [h, c] = getSize(t), _ = h, v = c;
                return c / h > 1.77 ? _ = i * c / r : v = r * h / i, {
                    top: `${o*v-(v-c)/2}px`,
                    left: `${a*_-(_-h)/2}px`,
                    width: `${n*_}px`,
                    height: `${d*v}px`,
                    transform: `rotate(${l}deg)`
                }
            }
            renderStickersLayer() {
                var {
                    clickable_stickers: e
                } = this.getCurStoryData(), {
                    stickers: t
                } = isObject(e) ? e : {};
                this.stickers = [], isArray(t) && t.forEach(e => {
                    var {
                        type: t,
                        hashtag: s,
                        mention: i,
                        style: r
                    } = e;
                    if (inArray(t, [G.hashtag, G.mention])) {
                        var o = ce("div", {
                            className: "stories_sticker"
                        }, this._getStickerStyle(e, this.contWrap));
                        switch (domData(o, "type", t), domData(o, "style", r), t) {
                            case G.hashtag:
                                domData(o, "hashtag", s);
                                break;
                            case G.mention:
                                domData(o, "mention", i)
                        }
                        this.contStickers.appendChild(o), this.stickers.push(o)
                    }
                }), ee(window, "resize", this._onResizeHandle)
            }
            _onResizeHandle() {
                var {
                    clickable_stickers: e
                } = this.getCurStoryData(), {
                    stickers: t
                } = isObject(e) ? e : {};
                isArray(t) && t.forEach((e, t) => {
                    inArray(e.type, [G.hashtag, G.mention]) && this.stickers && this.stickers[t] && ue(this.stickers[t], this._getStickerStyle(e, this.contWrap))
                }), this._hideTooltip()
            }
            _onClickHandle(e) {
                hasClass(e.target, "stories_sticker") && (this.hideFeedbackTooltip(), this.tooltip ? this._hideTooltip() : (this.layer._sendNavigationStatEvents("click_on_clickable_sticker"), this._showTooltip(e, this._createStickerLink(e.target))))
            }
            _createStickerLink(e) {
                var t = intval(domData(e, "type"));
                if (t) {
                    var s, i, r, o = {
                        type: t,
                        style: domData(e, "style")
                    };
                    switch (t) {
                        case G.hashtag:
                            var a = domData(e, "hashtag") || "";
                            s = `/feed?q=${a.replace("#","%23")}&section=search`, i = X("stories_show_hashtag_link"), r = "search", o.text = a;
                            break;
                        case G.mention:
                            var n = (domData(e, "mention") || "").slice(1, -1).split("|");
                            s = `/${n[0]}`, i = n[0].startsWith("id") ? X("stories_go_to_profile") : X("stories_go_to_group"), r = "profile"
                    }
                    return this._sendStatStickerEvent("click", o), ce("a", {
                        href: s,
                        innerHTML: i,
                        className: "stories_tooltip_link",
                        target: "_blank",
                        onclick: () => {
                            this._sendStatStickerEvent(r, o)
                        }
                    })
                }
            }
            _createNarrativeTooltipLink() {
                return ce("div", {
                    className: "stories_tooltip_link",
                    innerHTML: X("stories_narrative_show"),
                    onclick: () => {
                        this._hideTooltip(!0), showNarrative(`${this.story.data.narrative.owner_id}_${this.story.data.narrative.id}`, {
                            isOpenNarrativeFromFeed: !0,
                            source: "narrative_story"
                        })
                    }
                })
            }
            _showTooltip(e, t) {
                if (this.tooltip) this._hideTooltip();
                else {
                    this.tooltip = ce("div", {
                        className: "stories_tooltip"
                    }, {
                        top: 0,
                        left: 0
                    }), this.tooltip.appendChild(t), this.layer.layerEl.appendChild(this.tooltip);
                    var [s, i] = getSize(this.tooltip), {
                        clientX: r = 0,
                        clientY: o = 0
                    } = e;
                    ue(this.tooltip, {
                        top: o - i - 10,
                        left: r - s / 2
                    }), this.pauseStory()
                }
            }
            _hideTooltip(e) {
                this.tooltip && (e || this.playStory(), this.layer.layerEl.removeChild(this.tooltip), delete this.tooltip)
            }
            getReplies() {
                return this.story.getReplies()
            }
            getViews() {
                return this.story.getViews()
            }
            indexToUnread(e = !1) {
                var {
                    items: t
                } = this.data, s = 0;
                for (var i in t)
                    if (t[i].unread && !this.layer._hasContext("all")) {
                        s = intval(i);
                        break
                    }
                if (e) return s;
                this.index = s, this._setPreview()
            }
            indexToStoryById(e) {
                var {
                    items: t
                } = this.data, s = -1;
                for (var i in t)
                    if (t[i].raw_id === e) {
                        s = intval(i);
                        break
                    }
                this.layer._hasContext("all") && (s = 0), s > -1 ? (this.index = s, this._setPreview()) : this.indexToUnread()
            }
            fillTimeLine() {
                var {
                    timeLineEl: e
                } = this;
                if (e)
                    for (var t = 0; t < e.children.length; t++) {
                        var s = ae("stories_time_line_item_cont_active", e.children[t]);
                        t === this.index && (this.currentTimeLineEl = s);
                        var i = t < this.index ? 100 : 0;
                        ue(s, "transform", "translateX(" + i + "%)")
                    }
            }
            _destroyStory() {
                if (this.story) {
                    this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._hideTooltip(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), ie(this.contWrap, "stories_item_cont_wrap_meta_story"), re(ae("narrative-meta-story", this.contWrap)), ie(this.contWrap, "stories_narrative_cover_blur"), re(ae("stories_narrative_cover", this.contWrap)), Z(ae("stories_narrative_cover", this.contWrap)), Z(window, "resize", this._onResizeHandle), this.contStickers.innerHTML = "", cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                    } catch (e) {}
                    this._replyHideEnd(), Z(this.followBtn), val(this.authorButtons, ""), Z(this.answersEl), Z(ae("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                }
            }
            _timeLineUpdate() {
                var {
                    story: e
                } = this;
                if (e && !e.isPaused() && !this.isActiveLive()) {
                    var t = e.getCurrentTime(),
                        s = e.getDuration(),
                        i = Math.max(0, Math.min(100, t / s * 100));
                    ue(this.currentTimeLineEl, "transform", "translateX(" + i + "%) translateZ(0)"), i < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                }
            }
            _onLoadingStart() {
                this._loadingStartTime = new Date
            }
            _onLoadingEnd() {
                this._loadingStartTime && (this.loadingTime = Date.now() - this._loadingStartTime, this.layer._sendViewerStartTime(this.getRawId(), this.loadingTime), this._loadingStartTime = 0)
            }
            _onPlay() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), ie(this.wrapEl, "animate_story"), ie(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }
            _onPause() {
                cancelAnimationFrame(this.timeLineAnim)
            }
            _onPlayEnd(e = !1) {
                this.nextStory(e)
            }
            nextStory(e = !1) {
                if (!this.isLocked()) {
                    var {
                        items: t
                    } = this.data;
                    e || this.layer._sendNavigationStatEvents("go_to_next_story_tap");
                    var s = this.index + 1;
                    s < t.length ? (e && this.layer._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this.changeStory(s)) : (this.opts.onStoriesEnd(e), this._destroyStory())
                }
            }
            prevStory() {
                if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                    this.layer._sendNavigationStatEvents("go_to_previous_story");
                    var e = this.index - 1;
                    e >= 0 ? this.changeStory(e) : (this._destroyStory(), this.opts.playPrevOwner())
                }
            }
            getOffsetLeft() {
                return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
            }
            getWidth() {
                return this.wrapEl.offsetWidth
            }
            removeStoryBox() {
                this.pauseStory(), showFastBox({
                    title: X("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, X("stories_remove_warning"), X("stories_remove_confirm"), this.removeStory.bind(this), X("global_cancel"))
            }
            removeStory(e) {
                this.pauseStory();
                var t = this.getIndex(),
                    s = this.getRawId();
                ajax.post("al_stories.php", {
                    act: "remove_story",
                    story_raw: s,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: e => {
                        window.cur.module === V && window.GeStories.storyDidRemove(s, e), _e().hide(), this._popStoryAndClearList(t)
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            removeNarrativeBox() {
                this.pauseStory(), showFastBox({
                    title: X("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, X("stories_narrative_remove_warning"), X("stories_remove_confirm"), this.removeNarrative.bind(this), X("global_cancel"))
            }
            removeNarrative(e) {
                this.pauseStory();
                var {
                    narrative: t
                } = this.getCurStoryData(), {
                    raw_id: s
                } = t;
                ajax.post("al_stories.php", {
                    act: "remove_narrative",
                    narrative_raw: s,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: () => {
                        _e().hide(), this._popCoverAndCleanNarrativeList(t)
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            _popCoverAndCleanNarrativeList(e) {
                if (e.is_cover) this._popStoryAndClearList(this.getIndex());
                else {
                    this.opts.removeList(), this._remove(!1, (() => {
                        cur.storyLayer.activeStory._popStoryAndClearList(cur.storyLayer.activeStory.getIndex())
                    }).bind(this))
                }
            }
            _sendNarrativeBookmarkButtonDidPress() {
                var {
                    narrative: e
                } = this.getCurStoryData();
                this.updateBottom = this.updateBottom.bind(this), ajax.post("al_bookmarks.php", {
                    act: "bookmark",
                    owner_id: e.owner_id,
                    object_id: e.id,
                    type: "narrative",
                    state: e.is_bookmarked ? 1 : 0,
                    hash: e.bookmark_hash,
                    ref: cur.module
                }, {
                    onDone: t => {
                        showDoneBox(t || X("stories_narrative_bookmark_deleted"), {
                            className: "stories_done_msg"
                        }), e.is_bookmarked = !e.is_bookmarked, this.updateBottom()
                    }
                })
            }
            _sendNarrativeEditButtonDidPress() {
                var {
                    narrative: e
                } = this.getCurStoryData();
                window.open(`https://${location.hostname}${this.data.author.href}?act=narrative_edit&nid=${e.id}`)
            }
            _popStoryAndClearList(e) {
                this._removeStoryFromMemoryByIndex(e), 0 === this.data.items.length && E(this.getOwnerId())
            }
            _removeStoryFromMemoryByIndex(e, t = !1) {
                this.data.items.splice(e, 1), this.opts.removeList();
                var s = this.data.items.length;
                s ? (this._initTimeLine(), s > e ? this.isActive && this.playStory(!0) : this.isActive && this.nextStory()) : this._remove(t)
            }
            _remove(e, t) {
                this.opts.onStoryRemoved(e, t)
            }
            shareBox() {
                var e, {
                    narrative: t
                } = this.getCurStoryData();
                e = t ? `narrative${t.raw_id}` : `story${this.story.getId()}`, this.pauseStory(), ve("like.php", {
                    act: "publish_box",
                    object: e,
                    from: "wkview"
                }, {
                    onDone: () => {
                        this.autoResumeStory()
                    },
                    params: {
                        onHide: () => {
                            this.autoResumeStory()
                        }
                    }
                })
            }
            _onAnswerSend(e, t) {
                var s = this._getSendText();
                if (!s || !this.story) return cancelEvent(e);
                if (this.isActiveLive()) this.story.sendMessage(s, t);
                else {
                    var i, {
                        narrative: r
                    } = this.story.data;
                    i = r ? `narrative:${r.raw_id}` : `story:${this.story.getId()}`, ajax.post("al_im.php", {
                        act: "a_send",
                        msg: s,
                        hash: this.data.send_hash,
                        media: i,
                        entrypoint: "stories_comment",
                        to: this.getOwnerId()
                    }, {
                        onDone: () => {
                            this._onAnswerSended(t)
                        },
                        showProgress: () => {
                            val(this.sendFormButton, this._getLoaderHtml()), te(this.sendFormButton, "sending")
                        },
                        hideProgress: () => {
                            val(this.sendFormButton, ""), ie(this.sendFormButton, "sending")
                        }
                    })
                }
            }
            _onAnswerSended(e) {
                this.isActiveLive() || (this.layer._sendNavigationStatEvents("comment_send"), this._showMessage(X("stories_answer_sent")).then(() => {
                    this._unlockSendForm(), this.playStory()
                })), val(ae("stories_send_form_text", this.wrapEl), ""), this._blurSendForm(), this.updateFeedbackTTPos(), this.pauseStory(), e && e()
            }
            _onSendFormFocus() {
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", () => {
                    Emoji.shown || (this._resetFendForm(), this._blurSendForm()), this.updateFeedbackTTPos()
                })
            }
            _blurSendForm() {
                var e = ae("stories_send_form_text", this.wrapEl);
                e && e.blur()
            }
            _getSendText() {
                var e = Emoji.editableVal(ae("stories_send_form_text", this.wrapEl));
                return trim(e)
            }
            _onSendFormBlur() {
                this._getSendText() || this._resetFendForm()
            }
            _onSendFormKeyUp() {
                this.updateFeedbackTTPos()
            }
            _unlockSendForm() {
                this.formLocked && (this.formLocked = !1)
            }
            _resetFendForm() {
                this._unlockSendForm(), this.playStory(), val(ae("stories_send_form_text", this.wrapEl), "")
            }
            _emojiOnKeyAction() {
                this._getSendText() ? te(this.sendFormButton, "active") : ie(this.sendFormButton, "active")
            }
            _getLoaderHtml() {
                return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
            }
            preloadNextStory(e) {
                if (e = isUndefined(e) ? this.index + 1 : e, !this.preloadedStories[e]) {
                    var t = this.data.items[e];
                    if (t) {
                        this.preloadedStories[e] = !0;
                        var s = t[t.type + "_url"];
                        s && ("video" === t.type ? y(s) : p(s))
                    }
                }
            }
            _addToBlacklist() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: X("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, this.getOwnerId() < 0 ? X("stories_add_blacklist_message_group") : X("stories_add_blacklist_message"), X("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), X("global_cancel"))
            }
            _doAddToBlacklist(e) {
                ajax.post("al_stories.php", {
                    act: "blacklist_add",
                    owner_id: this.getOwnerId(),
                    hash: this.data.blacklist_hash,
                    source_story: this.getRawId()
                }, {
                    onDone: () => {
                        this.data.can_blacklist = !1, this.layer._sendNavigationStatEvents("hide_from_stories"), _e().hide(), this.opts.removeList(), this._remove()
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            _resetErrors() {
                var e = ae("stories_error_wrap", this.contWrap);
                e && (Z(ae("stories_error_button", e)), re(e)), ie(this.wrapEl, "failed"), ie(this.wrapEl, "fatal_error")
            }
            _showError(e) {
                if (this.contWrap) {
                    var t, s, i = e;
                    switch (e) {
                        case "load":
                            t = X("stories_error_cant_load"), s = ce("div", {
                                className: "stories_error_button",
                                innerHTML: X("stories_try_again")
                            }), ee(s, "click", () => {
                                this._destroyStory(), this.playStory()
                            });
                            break;
                        case "expired":
                            t = X("stories_error_expired");
                            break;
                        case "deleted":
                            t = X("stories_error_deleted");
                            break;
                        case "private":
                            t = X("stories_error_private");
                            break;
                        case "deleted-narrative":
                            t = X("stories_error_deleted_narrative");
                            break;
                        case "private-narrative":
                            t = X("stories_error_private_narrative");
                            break;
                        default:
                            t = X("global_unknown_error")
                    }
                    this._resetErrors(), this._stopLoader();
                    var r = ce("div", {
                            className: "stories_error_wrap"
                        }),
                        o = ce("div", {
                            className: "stories_error"
                        }),
                        a = ce("div", {
                            className: "stories_error_cont"
                        });
                    o.appendChild(a), a.appendChild(ce("div", {
                        className: "stories_error_icon " + i
                    })), a.appendChild(ce("div", {
                        className: "stories_error_caption",
                        innerHTML: t
                    })), s && a.appendChild(s), r.appendChild(o), this.contWrap.appendChild(r), te(this.wrapEl, "failed"), inArray(e, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && te(this.wrapEl, "fatal_error")
                }
            }
            _stopLoader() {
                setTimeout(() => {
                    re(ae("stories_loader", this.contWrap))
                }, 0)
            }
            _showLoader() {
                if (this._stopLoader(), this.isActive && (!this.isLoaded() || this.isPaused()) && this.contWrap) {
                    var e = ce("div", {
                        className: "stories_loader",
                        innerHTML: this._getLoaderHtml()
                    });
                    this.contWrap.appendChild(e)
                }
            }
            _onFollowBtnClick() {
                var e, t;
                (this.pauseStory(), this.followBtnLock) || (this.followBtnLock = !0, this.data.author.id > 0 ? (t = "al_friends", e = this.data.author.can_follow ? "add" : "remove") : (t = "al_groups", e = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(`${t}.php`, {
                    act: e,
                    mid: this.getOwnerId(),
                    gid: -this.getOwnerId(),
                    hash: this.data.author.hash,
                    from: "stories"
                }, {
                    onDone: () => {
                        this.data.author.can_follow && this._sendStatEvent("follow"), this.data.author.can_follow = !this.data.author.can_follow, oe(this.followBtn, "followed", !this.data.author.can_follow), this._showMessage(X(this.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(() => this.playStory()), window.tooltips && tooltips.destroy(this.followBtn), triggerEvent(this.followBtn, "mouseover")
                    },
                    showProgress: () => this.showInlineLoader(),
                    hideProgress: () => {
                        this.hideInlineLoader(), this.followBtnLock = !1
                    }
                }))
            }
            _getDimensions() {
                var [e, t] = getSize(this.wrapEl), [s, i] = getXY(this.wrapEl);
                return {
                    width: e,
                    height: t,
                    top: i - scrollGetY(),
                    left: s - scrollGetX()
                }
            }
            markAsActive() {
                this.isActive = !0, te(this.wrapEl, "animate_story")
            }
            _renderReplyTo() {
                var {
                    list: e,
                    photo_url: t,
                    name: s,
                    can_view_deleted: i,
                    is_deleted: r,
                    is_private: o,
                    raw_id: a
                } = this.getCurStoryData().reply_to, n = le(`<div class="stories_reply_to" style="background-image: url(${t})">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">${s}</div>\n  </div>\n</div>`);
                if (ee(n, "click", () => {
                        this.layer._sendNavigationStatEvents("open_parent_story");
                        var t = L();
                        f.length > 1 && t.getStoryRaw() === a ? cancelStackPop() : showStory(e, {
                            fromEl: n,
                            source: "reply_story"
                        })
                    }), i) return n;
                var d = !1;
                return r ? (te(n, "deleted"), d = X("stories_deleted_story")) : o && (te(n, "private"), d = X("stories_private_story")), d && (val(ae("stories_reply_to_error_msg", n), d), re(ae("stories_reply_to_owner_name_wrap", n))), n
            }
            sendMask() {
                if (!this._maskSending) {
                    this._maskSending = !0, this.pauseStory();
                    var e = this.getCurStoryData();
                    ajax.post("al_stories.php", {
                        act: "send_mask",
                        mask_id: e.mask_id,
                        hash: this.data.send_mask_hash
                    }, {
                        onDone: (e, t, s, i) => {
                            "cant_send" === e ? showFastBox({
                                title: t,
                                width: 460,
                                onHide: () => {
                                    this.playStory()
                                }
                            }, s, i) : this._showMessage(X("stories_mask_sent")).then(() => this.playStory())
                        },
                        showProgress: () => this.showInlineLoader(),
                        hideProgress: () => {
                            this._maskSending = !1, this.hideInlineLoader()
                        }
                    })
                }
            }
            _getFeedbackTTElem() {
                return ae("stories_answers_tt_arrow", this.wrapEl) || ae("_views_button", this.wrapEl)
            }
            _destroyFeedBackTT() {
                var e = this._getFeedbackTTElem();
                e && e.tt && e.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
            }
            hideFeedbackTooltip() {
                if (this._feedbackTTShown) {
                    var e = this._getFeedbackTTElem();
                    e && e.tt && (e.tt.hide(), this._feedbackTTShown = !1, this.autoResumeStory(), cancelStackPop())
                }
            }
            updateFeedbackTTArrow() {
                var e = this._getFeedbackTTElem();
                if (hasClass(e, "stories_answers_tt_arrow")) {
                    var t = ae("stories_feedback_tt_arrow", this.wrapEl),
                        s = e.offsetLeft + getSize(e)[0] / 2 - getSize(t)[0] / 2 - 1;
                    ue(t, "left", `${s}px`)
                }
            }
            showFeedbackTooltip(e = !1) {
                this._hideTooltip();
                var t = this._getFeedbackTTElem();
                if (t)
                    if (this._feedbackTTShown && !0 !== e) cancelStackPop();
                    else {
                        this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", () => {
                            this.hideFeedbackTooltip(!1, !0)
                        }), this._feedbackTTLoaded && (this._feedbackTTShown = !0), this.layer._sendNavigationStatEvents("open_replies_list");
                        var s = 8;
                        if (hasClass(t, "stories_answers_tt_arrow")) {
                            s = getSize(domPN(t))[0] - 39
                        }
                        showTooltip(t, {
                            className: "stories_feedback_tt",
                            forcetoup: !0,
                            nohide: !0,
                            forceNoHide: !0,
                            nohideover: !0,
                            content: `<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">${this._getLoaderHtml()}</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>`,
                            slide: 15,
                            zIndex: 100,
                            shift: [s, 19, 0],
                            appendEl: ae("stories_bottom_wrap", this.wrapEl),
                            onHide: () => {
                                this._feedbackTTShown = !1
                            },
                            onShowStart: () => {
                                this.isActive && (this._feedbackTTShown = !0, this._feedbackTTLoaded ? this._feedbackRequestEnd && (this.feedbackScroll.update(), this._feedbackTooltipInitHeaders(), tooltips.rePositionTT(t.tt), this._onFeedbackScroll(), setTimeout(() => tooltips.rePositionTT(t.tt), 200)) : (ae("stories_feedback_tt", this.wrapEl).appendChild(le('<div class="stories_feedback_tt_arrow"></div>')), this._feedbackTTLoaded = !0, this._feedbackRequestEnd = !1, this._feedbackTooltipHeadersInited = !1, ee(ae("stories_feedback_close", this.wrapEl), "click", () => this.hideFeedbackTooltip()), setTimeout(() => {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: this.getRawId()
                                    }, {
                                        onDone: (e, s, i, r, o) => {
                                            if (this.isActive) {
                                                this.story.setViews(r), this.story.setReplies(o), this._feedbackRequestEnd = !0;
                                                var a = ae("stories_feedback_content", this.wrapEl);
                                                val(a, e), this.feedbackScroll = new uiScroll(ae("stories_feedback_content", this.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: () => this._onMoreFeedBack(),
                                                    onscroll: () => this._onFeedbackScroll()
                                                }), this.feedbackScroll.scrollTop(0), te(this.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), ae("ui_scroll_overflow", this.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), this.feedbackNextFrom = s, t.tt.shown && this._feedbackTooltipInitHeaders(), this.updateBottom(), this.updateFeedbackTTPos(), cur = pe(cur, i), this.updateFeedbackTTArrow()
                                            }
                                        }
                                    })
                                }, 200)), this.updateFeedbackTTArrow())
                            }
                        })
                    }
            }
            updateFeedbackTTPos() {
                var e = this._getFeedbackTTElem();
                this._feedbackTTShown && e && e.tt && tooltips.rePositionTT(e.tt)
            }
            _feedbackTooltipInitHeaders() {
                if (!this._feedbackTooltipHeadersInited) {
                    this._feedbackTooltipHeadersInited = !0;
                    var e = ae("stories_feedback_content", this.wrapEl),
                        t = ae("stories_feedback_headers", this.wrapEl),
                        s = ne("stories_feedback_title", e);
                    show(s[0]), this.feedbackHeaders = [];
                    for (var i = s.length + 1, r = 0; r < s.length; r++) {
                        var o = s[r],
                            a = t.appendChild(ce("div", {
                                className: "stories_feedback_title",
                                innerHTML: val(o)
                            }, {
                                top: o.offsetTop,
                                zIndex: i - r
                            }));
                        this.feedbackHeaders.push({
                            top: o.offsetTop,
                            height: o.offsetHeight,
                            el: a
                        })
                    }
                    ue(e, "margin-top", s[0].offsetHeight), hide(s[0])
                }
            }
            feedbackTooltipReInitHeaders() {
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(ae("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }
            _onFeedbackScroll() {
                if (this._feedbackTooltipHeadersInited)
                    for (var e = this.feedbackScroll.data.scrollTop, t = !1, s = 0, i = this.feedbackHeaders.length - 1; i >= 0; i--) {
                        var {
                            top: r,
                            height: o,
                            el: a
                        } = this.feedbackHeaders[i], n = r, d = e;
                        t && (d -= s - (n += o));
                        var l = d >= r - o;
                        a.classList.toggle("active", !t && l && d > 0), l && (t = !0), s = r;
                        var h = -Math.min(d, n);
                        a.style.transform = `translateY(${h}px)`
                    }
            }
            _onMoreFeedBack() {
                !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                    act: "feedback",
                    story_raw: this.getRawId(),
                    offset: this.feedbackNextFrom
                }, {
                    onDone: (e, t) => {
                        this.feedbackNextFrom = t, t && (this.feedbackLoadingMore = !1);
                        for (var s, i = ae("stories_feedback_views", this.wrapEl), r = ce("div", {
                                innerHTML: e
                            }); s = r.firstChild;) i.appendChild(s)
                    }
                }))
            }
            showInlineLoader() {
                show(this.inlineLoader)
            }
            hideInlineLoader() {
                hide(this.inlineLoader)
            }
            volumeUpdate() {
                this.story && this.story.volumeUpdate && this.story.volumeUpdate()
            }
            _onAutoPlayFail() {
                te(this.wrapEl, "autoplay_failed")
            }
            _hideReply() {
                showFastBox({
                    title: X("global_warning"),
                    onHide: () => {
                        this.autoResumeStory()
                    }
                }, X("stories_hide_reply_warning"), X("global_continue"), this._doHideReply.bind(this), X("global_cancel"))
            }
            _doHideReply() {
                this.pauseStory(), te(this.wrapEl, "hiding_reply"), _e().hide();
                var e = this.getIndex(),
                    t = this.data.author.gender,
                    s = le(`<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">${getProgressHtml()}</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">${X("stories_reply_hidden")}</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">${X("stories_hide_reply_continue")}</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">${langSex(t,window.lang.stories_hide_all_replies)}</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">${X("stories_reply_add_to_blacklist")}</div>\n  </div>\n</div>`);
                ee(ae("_stories_reply_restore", s), "click", this._restoreReply.bind(this)), ee(ae("_stories_reply_continue", s), "click", () => this._replyHideEnd(e)), ee(ae("_stories_hide_replies", s), "click", this._hideAllReplies.bind(this)), ee(ae("_stories_reply_ban", s), "click", this._ban.bind(this)), this.contWrap.appendChild(s), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this.opts.removeList(), cur.needUpdateFeedStories = !0, ie(s, "loading")
                    },
                    onFail: () => {
                        this._resetReplyHide(), this.playStory()
                    }
                })
            }
            _restoreReply(e) {
                cancelEvent(e);
                var t = ae("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this._resetReplyHide(), this.playStory()
                    },
                    showProgress: () => te(t, "loading"),
                    hideProgress: () => ie(t, "loading")
                })
            }
            _resetReplyHide() {
                re(ae("stories_hide_reply_wrap", this.contWrap)), ie(this.wrapEl, "hiding_reply")
            }
            _hideAllReplies() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: X("global_warning")
                }, X("stories_delete_all_replies_confirm").replace("{name}", e), X("global_continue"), this._doHideAllReplies.bind(this), X("global_cancel"))
            }
            _doHideAllReplies(e) {
                ajax.post("al_stories.php", {
                    act: "hide_all_replies",
                    owner_id: this.getOwnerId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        _e().hide(), this.opts.removeList(), this.data.items = [];
                        var e = ae("_stories_hide_replies", this.contWrap);
                        val(e, X("stories_all_replies_hidden")), te(e, "disabled")
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            _ban() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: X("global_warning")
                }, X("stories_ban_confirm").replace("{name}", e), X("global_continue"), this._doBan.bind(this), X("global_cancel"))
            }
            _doBan(e) {
                ajax.post("al_stories.php", {
                    act: "ban",
                    owner_id: this.getOwnerId(),
                    hash: this.data.stories_ban_hash
                }, {
                    onDone: () => {
                        _e().hide(), this.opts.removeList(), this.data.items = [];
                        var e = ae("_stories_reply_ban", this.contWrap);
                        val(e, X("stories_banned")), te(e, "disabled")
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            _replyHideEnd(e) {
                ae("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && E(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(e || this.getIndex(), !isNumeric(e)))
            }
            _feedbackRemoveReplyFromDom(e) {
                var t = ae("stories_feedback_content", this.wrapEl);
                if (t) {
                    var s = t.querySelector(`#feed_story_${e}`);
                    s && te(s, "removed")
                }
            }
            onReplyDeleted(e) {
                this._feedbackRemoveReplyFromDom(e)
            }
            _updateFeedStoryPreview() {
                var e = de("feed_story_" + this.layer.getBlockKey(this.data));
                if (e && !hasClass(e, "stories_feed_reply_item")) {
                    var t = this.indexToUnread(!0),
                        s = this.data.items[t];
                    s && s.small_preview && ue(e, "background-image", `url(${s.small_preview})`)
                }
            }
            _sendStatEvent(e) {
                var t = this.getCurStoryData();
                ajax.post("al_stories.php", pe({
                    act: "stat",
                    source_story: this.getRawId()
                }, t.stats[e]))
            }
            _sendStatStickerEvent(e, t) {
                var {
                    clickable_stickers: s
                } = this.getCurStoryData();
                ajax.post("al_stories.php", pe({
                    act: "stickers_stat",
                    story_raw_id: this.getRawId(),
                    action: e,
                    hash: s.hash
                }, t))
            }
            report() {
                var e = this.getCurStoryData(),
                    t = "story";
                this.isActiveLive() ? t = "live" : e.narrative && (t = "narrative");
                var s = ve("al_stories.php", {
                    act: "report_box",
                    type: t
                }, {
                    onDone: () => {
                        var e = ne("radiobtn", "stories_report");
                        Y.stories_report = {
                            val: 0,
                            els: e
                        }
                    },
                    params: {
                        onClean: () => {
                            delete Y.stories_report, this.playStory()
                        }
                    }
                });
                s.removeButtons(), s.addButton(X("box_send"), this._sendReportButtonDidPress.bind(this)), s.addButton(X("global_cancel"), !1, "no")
            }
            _sendReportButtonDidPress(e) {
                var t, s, i = this.index,
                    {
                        narrative: r,
                        report_hash: o
                    } = this.getCurStoryData(),
                    a = !!r;
                a ? (t = r.raw_id, s = r.report_hash) : (t = this.getRawId(), s = o), ajax.post("al_stories.php", {
                    act: "report",
                    type: a ? "narrative" : "story",
                    item_raw: t,
                    reason: Y.stories_report.val,
                    hash: s
                }, {
                    onDone: () => {
                        _e().hide(), this.layer._sendNavigationStatEvents("claim"), a ? this._popCoverAndCleanNarrativeList(r) : this._popStoryAndClearList(i), showDoneBox(X("stories_report_sent"), {
                            className: "stories_done_msg"
                        })
                    },
                    showProgress: Q.pbind(e),
                    hideProgress: J.pbind(e)
                })
            }
            onLiveEnded(e) {
                this.isActiveLive() && (this.data.items[this.index].can_share = !e, this.story.onLiveEnded(), this.updateBottom())
            }
            updateLiveViewersCount(e) {
                val(this.descEl, e)
            }
        }
        var me = .563,
            we = 1.78,
            fe = 540,
            be = 320,
            Se = "user_personal_card",
            ke = "group_personal_card",
            Le = s("Tn+0");
        var Ee = [];
        var Ce = [];
        var Te = () => Ce.length || Ee.length;
        var xe = s("4+be"),
            Be = s("t7n3"),
            Pe = s("kcIO"),
            Ne = o.Promise,
            Fe = {
                show(e, t = {}) {
                    if (e.match(/story/) && (e = this._parseList(e)), cur.storyLayer && cur.storyLayer.list === e.split("/")[1]) return !1;
                    this.getList(e).then(({
                        blockKey: e,
                        list: s,
                        items: i,
                        extra: r
                    }) => {
                        b(new class {
                            constructor(e, t, s, i, r) {
                                this.queue = [], this.storiesToRead = [], this.storiesSkip = [];
                                try {
                                    window.Videoview && Videoview.togglePlay(!1)
                                } catch (e) {}
                                this.initDOM(), this.show(), this._init(e, t, s, i), addClass(this.layerEl, "shown"), this._source = r.source, this._initViewerSource(), this._sendOpeningEvents(), r.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = r.isOpenNarrativeFromFeed)
                            }
                            _init(e, t, s, i) {
                                var [r, o = ""] = e.split("&"), [a, n] = r.split("_");
                                this.storyRaw = r, this.storyOwner = a, this.storyId = n, this.blockKey = `${a}${o}`, this.list = t, this.storiesList = s, this.extra = this.parseExtra(i), this.initStories()
                            }
                            initStories() {
                                return new Promise(e => {
                                    this.storiesBlocks = this.storiesList.map(e => this.getBlockKey(e));
                                    var t = !1,
                                        s = this.storiesBlocks.indexOf(this.blockKey);
                                    if (s > -1) {
                                        var i = this.storiesList[s];
                                        t = i.items[i.items.length - 1].unread
                                    }
                                    if (this.extra) switch (this.extra.context) {
                                        case "new":
                                            t = !0;
                                            break;
                                        case "all":
                                            t = !1
                                    }
                                    if (t && "replies" === this.list.substr(0, 7) && (t = !1), t) {
                                        for (var r = [], o = 0; o < this.storiesList.length; o++) {
                                            var a = this.storiesList[o],
                                                n = a.items[a.items.length - 1];
                                            a.is_narrative && !n.isNarrativeMetaStory && a.items.push({
                                                type: "photo",
                                                raw_id: n.raw_id,
                                                narrative: n.narrative,
                                                isNarrativeMetaStory: !0
                                            }), (a.items[a.items.length - 1].unread || 0 === o && this._hasContext("new")) && r.push(a)
                                        }
                                        r.length && (this.storiesList = r, this.storiesBlocks = this.storiesList.map(e => this.getBlockKey(e)))
                                    }
                                    this.renderedStories = {};
                                    var {
                                        activeStory: d
                                    } = this._renderStories();
                                    this.scrollToStory(d, !0), 1 === this.storiesList.length && addClass(this.stories, "one_story"), this._startFirstStory(d, this.extra.story_id), addClass(this.stories, "inited"), e()
                                })
                            }
                            getBlockKey(e) {
                                return e.hasOwnProperty("data") && (e = e.data), e.items && e.items.length && "live" === e.items[0].type ? `${e.author.id}live` : e.narrative || e.is_narrative ? `${e.author?e.author.id:e.narrative.owner_id}narrative${e.items?e.items[0].narrative.id:e.narrative.id}` : `${e.author.id}`
                            }
                            _renderStories() {
                                for (var e = [], t = 0; t < this.storiesList.length; t++) this.storiesList[t] && e.push(this.storiesList[t]);
                                var s, i = this._getScreenStoriesCount(),
                                    r = this._getCurStoryPos(e.map(e => this.getBlockKey(e))),
                                    o = Math.floor(i / 2),
                                    a = e.slice(Math.max(0, r - o)).slice(0, i),
                                    n = a.map(e => this.getBlockKey(e));
                                for (var d in this.renderedStories)
                                    if (this.renderedStories.hasOwnProperty(d)) {
                                        var l = this.renderedStories[d]; - 1 === n.indexOf(d) && (l.story.destroy(), delete this.renderedStories[d])
                                    }
                                if (a.map((e, t) => {
                                        var i = this.getBlockKey(e);
                                        if (!this.renderedStories[i]) {
                                            var r = this.storiesBlocks.indexOf(i),
                                                a = e.author.id,
                                                n = new ye(e, {
                                                    id: t,
                                                    layer: this,
                                                    onSelect: this._onSelectStory.bind(this),
                                                    onStoriesEnd: this._onStoriesEnd.bind(this, r),
                                                    onStoryRemoved: (e, t) => this._onStoryRemoved(a, r, e, t),
                                                    playPrevOwner: this._playPrevOwner.bind(this, r),
                                                    onPlayStory: this._onPlayStory.bind(this, r),
                                                    onVideoPlay: this._onVideoPlay.bind(this),
                                                    onVideoEnd: this._onVideoEnd.bind(this),
                                                    onStartStory: this._onStartStory.bind(this),
                                                    removeList: () => Stories.removeList(this.list)
                                                });
                                            t <= o && this.stories.children[t] ? this.stories.insertBefore(n.render(), this.stories.children[t]) : this.stories.appendChild(n.render()), this.renderedStories[i] = {
                                                story: n,
                                                index: r
                                            }, i === this.blockKey && (s = n)
                                        }
                                    }), !s) {
                                    var h = n[0];
                                    s = this.renderedStories[h].story
                                }
                                return {
                                    activeStory: s
                                }
                            }
                            _sendOpeningEvents() {
                                if (this._source) {
                                    var e;
                                    switch (this._source) {
                                        case "narrative_story":
                                            e = "narrative_open_stories";
                                            break;
                                        case "narrative_snippet":
                                        case "narrative_link":
                                            e = "narrative_open";
                                            break;
                                        case "narrative_recommendations":
                                            e = "narrative_other"
                                    }
                                    if (e && this._sendNavigationStatEvents(e, !1), "narrative_fave" === this._source) {
                                        var t = this.activeStory.getCurStoryData();
                                        if (t && t.narrative) {
                                            var {
                                                owner_id: s,
                                                id: i
                                            } = t.narrative;
                                            statlogsValueEvent("bookmarks_product_analytics", {
                                                item_type: "narrative",
                                                item_owner_id: s,
                                                item_id: i,
                                                time: window.getServerTime()
                                            })
                                        }
                                    }
                                }
                            }
                            _destroyStories() {
                                for (var e in this.renderedStories) this.renderedStories.hasOwnProperty(e) && this.renderedStories[e].story.destroy()
                            }
                            destroy() {
                                clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), this._onVideoEnd(), removeEvent(this.volumeControl), removeEvent(this.layerEl), delete this.activeStory, delete this.volumeControl, delete this.renderedStories;
                                try {
                                    this.layerEl && bodyNode.removeChild(this.layerEl)
                                } catch (e) {}
                                delete cur.storyLayer
                            }
                            getList() {
                                return "story" + this.activeStory.getRawId() + "/" + this.list
                            }
                            getStoryRaw() {
                                return !!this.activeStory && this.activeStory.getRawId()
                            }
                            initDOM() {
                                this.layerEl = ce("div", {
                                    className: "stories_layer"
                                });
                                var e = ce("div", {
                                    className: "stories_layer_cont"
                                });
                                this.layerEl.appendChild(e), e.appendChild(this._renderBackButton()), e.appendChild(this._renderVolumeControl()), this._updateVolumeButton(), this.stories = ce("div", {
                                    id: "stories_list",
                                    className: "stories_list"
                                }), e.appendChild(this.stories), e.appendChild(ce("div", {
                                    className: "stories_layer_close"
                                })), addEvent(this.layerEl, "click", this._onLayerClick.bind(this)), bodyNode.appendChild(this.layerEl)
                            }
                            show() {
                                onBodyResize()
                            }
                            hide(e) {
                                addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && S(), this._source && this._source.indexOf("narrative") > -1 && this._sendNavigationStatEvents("narrative_close", !1), !0 !== e && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(e), removeClass(this.layerEl, "shown"), this.activeStory && (this.activeStory.pauseStory(), this.activeStory._hideTooltip(), this.activeStory.isActiveLive() && this._sendNavigationStatEvents("live_player_close", !1))
                            }
                            doHide(e) {
                                if (this._readStories(), this.destroy(), !e && (f.pop(), cur.storyLayer = f[f.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())), window.wkcur && window.wkcur.shown && WkView.restoreLayer({}), "group_stories" === this.list && Stories.groupStoriesBlockUpdate(), this.list.startsWith("archive") && !1 !== this.hideAllLayers && !e) {
                                    if (!_message_boxes[cur.storiesArchiveBoxGUID]) return;
                                    _message_boxes[cur.storiesArchiveBoxGUID].forceHide = !1, _message_boxes[cur.storiesArchiveBoxGUID]._show(!0, !1, !0), window.updateStoriesArchiveBoxPosition && window.updateStoriesArchiveBoxPosition()
                                }
                            }
                            back(e = !1) {
                                this.hideAllLayers = !1;
                                var t = cancelStack[cancelStack.length - 1];
                                t && "stories_form_focus" === t.name && cancelStackPop(), this.hide(!1, e)
                            }
                            _getScreenStoriesCount() {
                                return 2 * Math.floor(window.innerWidth / (window.innerHeight * me)) + 1
                            }
                            _getCurStoryPos(e) {
                                return (e || this.storiesBlocks).indexOf(this.blockKey)
                            }
                            _startFirstStory(e, t) {
                                this.activeStory = e, addClass(e.getWrap(), "active"), this.scrollToStory(), t || (t = this._hasContext("new") ? t : this.storyRaw), e.indexToStoryById(t), this._startActiveStory(), setTimeout(() => {
                                    addClass(this.stories, "animated"), this.inited = !0, "open" === this.extra.replies && this.activeStory.showFeedbackTooltip()
                                })
                            }
                            _markReadRestStories(e) {
                                this._markReadStoriesInRange(e, e.index, e.data.items.length), this._updateBadge(e)
                            }
                            _onSelectStory(e) {
                                var t;
                                this.activeStory && (t = this.activeStory.getWrap(), this.activeStory.stop()), e.id - this.activeStory.id > 0 && this._markReadRestStories(this.activeStory), this.activeStory = e, e.indexToUnread(), e.isActiveLive() || e.fillTimeLine(), this.blockKey = this.getBlockKey(e), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(() => {
                                    removeClass(t, "active"), addClass(e.getWrap(), "active"), this.scrollToStory(), this.timer = setTimeout(() => {
                                        this.activeStory && e.id !== this.activeStory.id || !this.activeStory || (e.indexToUnread(), this._startActiveStory(), this._renderStories(), this.scrollToStory(e, !0))
                                    }, 200)
                                })
                            }
                            _startActiveStory() {
                                var {
                                    activeStory: e
                                } = this;
                                e.markAsActive(), e.playStory(!0)
                            }
                            _onStartStory() {
                                var {
                                    activeStory: e,
                                    list: t
                                } = this;
                                if (e) {
                                    var s = nav.objLoc;
                                    s.w = "story" + e.getRawId(), t.match(/^-?(\d+)_(\d+)$/) || (s.w += "/" + t), t.match(/^narrative-?\d+_\d+/) && (s.w = `narrative${this.activeStory.getCurStoryData().narrative.raw_id}`), nav.setLoc(nav.toStr(s))
                                }
                            }
                            scrollToStory(e, t) {
                                var s = this._getScrollLeft(e);
                                t ? (removeClass(this.stories, "animated"), this._setScrollLeft(s)) : this.inited && addClass(this.stories, "animated"), setTimeout(() => {
                                    this._setScrollLeft(s)
                                })
                            }
                            _setScrollLeft(e) {
                                setStyle(this.stories, "transform", "translateX(" + e + "px) translateZ(0)")
                            }
                            _getScrollLeft(e) {
                                return e = e || this.activeStory, window.innerWidth / 2 - e.getOffsetLeft()
                            }
                            _onStoriesEnd(e, t) {
                                for (var s = -1, i = e + 1; i < this.storiesList.length; i++)
                                    if (this.storiesList[i]) {
                                        s = i;
                                        break
                                    }
                                s > -1 ? (t && this._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this._onSelectStory(this._getStoryInstanceByIndex(s))) : cancelStackPop(t)
                            }
                            _playPrevOwner(e) {
                                for (var t = -1, s = e - 1; s >= 0; s--)
                                    if (this.storiesList[s]) {
                                        t = s;
                                        break
                                    }
                                t > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(t)) : cancelStackPop()
                            }
                            _markReadStoriesInRange(e, t, s) {
                                for (var i = e.data.items, r = t; r < s; r++) {
                                    var o = i[r];
                                    o.unread && (o.unread = !1)
                                }
                            }
                            _markReadPrevStories(e) {
                                this._markReadStoriesInRange(e, 0, e.index)
                            }
                            _updateBadge(e) {
                                var t = ge("feed_story_" + this.getBlockKey(e)),
                                    s = geByClass1("_stories_feed_item_replies", t);
                                if (hasClass(t, "story_feed_new_item") || "" !== val(s)) {
                                    var i = e.data.items || [],
                                        r = i[e.index] || {};
                                    (r.answers || {}).new_count = 0, r.unread = !1;
                                    var o = !0,
                                        a = 0;
                                    i.forEach(e => {
                                        var t = e.answers || {};
                                        a += t.new_count || 0, e.unread && (o = !1)
                                    }), a > 0 ? val(s, a) : (val(s, ""), o && (removeClass(t, "story_feed_new_item"), removeClass(t, "story_feed_new_item_promo")))
                                }
                            }
                            _onPlayStory(e) {
                                var t = this._getStoryInstanceByIndex(e);
                                if (t) {
                                    this.storiesReadHash = t.getReadHash();
                                    var s = t.getRawId(),
                                        i = t.getTrackCode();
                                    i && (s += "_" + i), this.storiesToRead.push(s), this._markReadPrevStories(t), this.storiesToRead > 10 && this._readStories(), this._updateBadge(t)
                                }
                                var r = this._getStoryInstanceByIndex(e + 1);
                                r && r.preloadNextStory(r.getIndex())
                            }
                            _getStoryInstanceByIndex(e) {
                                var t = this.storiesList[e];
                                if (!t) return !1;
                                var s = this.getBlockKey(t);
                                return this.renderedStories[s].story
                            }
                            _onStoryRemoved(e, t, s, i) {
                                for (var r = 0; r < this.storiesList.length; r++) this.storiesList[r] && this.storiesList[r].author.id === e && (this.storiesList[r] = !1);
                                !s && this._onStoriesEnd(t), Stories.updateFeedStories(null, {
                                    cb: i
                                })
                            }
                            onVisibilityChange() {
                                "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
                            }
                            onResize() {
                                var {
                                    activeStory: e
                                } = cur.storyLayer;
                                e && cur.storyLayer.scrollToStory(e, !0)
                            }
                            pauseStory(e) {
                                this.activeStory && this.activeStory.pauseStory(e)
                            }
                            playStory(e = !1) {
                                this.activeStory && this.activeStory.autoResumeStory(e)
                            }
                            _onLayerClick(e) {
                                var t = hasClass(e.target, "stories_layer_close");
                                (hasClass(e.target, "stories_layer_cont") || t) && (t ? this.isCloseBtnClick = !0 : this.storiesBlocks.length - 1 === this._getCurStoryPos() && (this._markReadRestStories(this.activeStory), this._markStoryAsSkipped()), cancelStackPop())
                            }
                            _checkKeyEvents(e) {
                                return !(attr(e.target, "contenteditable") || inArray(e.target.tagName, ["INPUT", "TEXTAREA"]) || curBox())
                            }
                            onKeyDown(e) {
                                if (cur.storiesKeyDown) cur.storyLayer && cur.storyLayer._checkKeyEvents(e) && cancelEvent(e);
                                else {
                                    if (cur.storiesKeyDown = e.keyCode !== KEY.ESC, [KEY.PAGEDOWN, KEY.PAGEUP].indexOf(e.keyCode) > -1) return cancelEvent(e);
                                    if (cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e)) {
                                        switch (e.keyCode) {
                                            case KEY.LEFT:
                                                cur.storyLayer.prevStory();
                                                break;
                                            case KEY.RIGHT:
                                                cur.storyLayer.nextStory();
                                                break;
                                            case KEY.SPACE:
                                                cancelEvent(e);
                                                var t = cur.storyLayer.activeStory;
                                                cur.storiesKeyDownLong = setTimeout(t._longTapHandle.bind(t), z)
                                        }
                                        cur.storiesKeyDownTs = vkNow()
                                    }
                                }
                            }
                            onKeyUp(e) {
                                cur.storiesKeyDown = !1, clearTimeout(cur.storiesKeyDownLong), cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e) && e.keyCode === KEY.SPACE && (cancelEvent(e), vkNow() - cur.storiesKeyDownTs > z ? cur.storyLayer.playStory(!0) : cur.storyLayer.nextStory())
                            }
                            nextStory() {
                                this.activeStory && this.activeStory.nextStory()
                            }
                            prevStory() {
                                this.activeStory && this.activeStory.prevStory()
                            }
                            changeStory(e) {
                                this.activeStory && this.activeStory.changeStory(e)
                            }
                            _readStories() {
                                if (this.storiesToRead.length && Te()) {
                                    var e = this._getSource(),
                                        t = this.storiesToRead.join(","),
                                        s = this.storiesSkip.join(",");
                                    this.storiesToRead = [], ajax.post("al_stories.php", {
                                        act: "read_stories",
                                        stories: t,
                                        source: e,
                                        stories_skip: s,
                                        navigation_stats: function() {
                                            var e = Ee.map(({
                                                ownerId: e,
                                                storyId: t,
                                                source: s,
                                                action: i
                                            }) => [e, t, s, i].join(",")).join(";");
                                            return Ee = [], e
                                        }(),
                                        loading_stats: function() {
                                            var e = Ce.map(({
                                                ownerId: e,
                                                storyId: t,
                                                source: s,
                                                time: i
                                            }) => [e, t, s, i].join(",")).join(";");
                                            return Ce = [], e
                                        }(),
                                        connection_type: function() {
                                            var {
                                                connection: e
                                            } = navigator;
                                            if (!e) return "";
                                            var {
                                                effectiveType: t,
                                                downlink: s
                                            } = e;
                                            switch (t) {
                                                case "slow-2g":
                                                    return "GPRS";
                                                case "2g":
                                                    return "EDGE";
                                                case "3g":
                                                    return "3G";
                                                case "4g":
                                                    return s > 8 ? "wi-fi" : "LTE"
                                            }
                                            return ""
                                        }(),
                                        hash: this.storiesReadHash
                                    })
                                }
                            }
                            _getSource() {
                                var e = "list";
                                return this._source ? this._source : (-1 !== [Se, ke, V, Le.b].indexOf(cur.module) && (e = cur.module), e)
                            }
                            _sendNavigationStatEvents(e, t = !0) {
                                var s = this.activeStory,
                                    i = this.getStoryRaw() || s.getCurStoryData().raw_id,
                                    r = this._getSource();
                                t && this._sendProductAnalyticEvents(e), this._updateLastStoryOpenAction(e),
                                    function({
                                        storyRawId: e,
                                        source: t,
                                        action: s
                                    }) {
                                        var [i, r] = e.split("_");
                                        "reply" === t && (t = "replies_list");
                                        var o = {
                                            ownerId: i,
                                            storyId: r,
                                            source: t,
                                            action: s
                                        };
                                        Ee.push(o)
                                    }({
                                        storyRawId: i,
                                        source: r,
                                        action: e
                                    })
                            }
                            _sendProductAnalyticEvents(e) {
                                var t = this.activeStory,
                                    s = this.getStoryRaw() || t.getCurStoryData().raw_id,
                                    [i, r] = s.split("_"),
                                    o = t.getIndex(),
                                    a = t.getItemsLength() - o,
                                    {
                                        story: n
                                    } = t,
                                    d = this._getSource();
                                if (e && t && n && i && r) {
                                    var l = {
                                        event_type: e,
                                        story_owner_id: i,
                                        story_id: r,
                                        time: vk.ts + Math.floor(((new Date).getTime() - vk.started) / 1e3),
                                        volume: 100 * m(),
                                        view_entry_point: d,
                                        stories_author_before: o,
                                        stories_author_after: a,
                                        nav_screen: cur.module,
                                        view_event_timeline_position: n.getCurrentTime()
                                    };
                                    "view_story" === e && (l.preloading_duration = t.loadingTime || 0), statlogsValueEvent("story_product_analytics", l)
                                }
                            }
                            _updateLastStoryOpenAction(e) {
                                switch (e) {
                                    case "go_to_next_story_tap":
                                    case "go_to_next_story_click":
                                    case "go_to_next_story_auto_by_time":
                                        this.viewerSource = "next_story";
                                        break;
                                    case "go_to_previous_story":
                                        this.viewerSource = "previous_story";
                                        break;
                                    case "go_to_next_author":
                                        this.viewerSource = "next_author";
                                        break;
                                    case "go_to_previous_author":
                                        this.viewerSource = "previous_author"
                                }
                            }
                            _initViewerSource() {
                                var e = this._getSource();
                                switch (e) {
                                    case "reply":
                                        this.viewerSource = "replies_list";
                                        break;
                                    case "feed":
                                        this.viewerSource = cur.section;
                                        break;
                                    default:
                                        this.viewerSource = e
                                }
                            }
                            _sendViewerStartTime(e, t) {
                                ! function({
                                    storyRawId: e,
                                    source: t,
                                    time: s
                                }) {
                                    var [i, r] = e.split("_"), o = {
                                        ownerId: i,
                                        storyId: r,
                                        source: t,
                                        time: s
                                    };
                                    Ce.push(o)
                                }({
                                    storyRawId: e,
                                    source: this.viewerSource,
                                    time: t
                                })
                            }
                            _onVideoPlay() {
                                getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
                            }
                            _onVideoEnd() {
                                this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
                            }
                            _renderBackButton() {
                                return this.backButton = se(`<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">${getLang("global_back")}</div>\n  </div>\n</div>`), addEvent(this.backButton, "click", () => {
                                    cancelStackPop()
                                }), this.backButton
                            }
                            showBackButton() {
                                show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
                            }
                            parseExtra(e) {
                                var t = {},
                                    s = String(e).split(";");
                                for (var i in s)
                                    if (s.hasOwnProperty(i)) {
                                        var [r, o] = s[i].split(":");
                                        t[r] = o
                                    }
                                return t
                            }
                            getAnimateFromElem() {
                                if (!this.hideAllLayers) {
                                    var e = this.getBlockKey(this.activeStory);
                                    if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                                        var t = domQuery("#feed_story_" + e, domPN(this.animateFromEl))[0];
                                        if (t) return t
                                    } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                                        var s = ge("feed_story_" + e);
                                        if (s) return Stories.feedScrollToOwner(e), s
                                    }
                                }
                                return this.animateFromEl
                            }
                            animateStory(e, t) {
                                return new Promise(s => {
                                    if ("expand" === e && !t || "minimize" === e && !this.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), s();
                                    this.pauseStory(), addClass(this.layerEl, "animation"), removeClass(this.stories, "animated");
                                    var i = "expand" === e ? t : this.getAnimateFromElem();
                                    if (this.hideAllLayers && "minimize" === e) {
                                        var r = f[0];
                                        i = r.getAnimateFromElem(),
                                            function() {
                                                for (var e = f.length - 2; e >= 0; e--) f[e].doHide(!0);
                                                f.splice(0, f.length - 1)
                                            }(), S()
                                    }
                                    removeClass(i, "stories_feed_item_ava_animate");
                                    var [o, a] = getXY(i), n = getSize(i), d = window.innerHeight, l = Math.min(fe, Math.max(be, d * me)), h = l * we, c = Math.max(0, (d - h) / 2), _ = Math.max(0, (window.innerWidth - l) / 2);
                                    o = _ - o + l / 2 - n[0] / 2 + scrollGetX(), a = c - a + h / 2 - n[1] / 2 + scrollGetY(), o = -o, a = -a;
                                    var v = {};
                                    "expand" === e && (v.transform = `translate(${o}px, ${a}px) scale(0)`, this.animateFromEl = t), setStyle(this.activeStory.wrapEl, v), "minimize" === e && setStyle(i, "transform", "scale(0)"), this.animationTimer = setTimeout(() => {
                                        addClass(this.stories, "animated"), addClass(i, "stories_feed_item_ava_animate"), this.animationTimer = setTimeout(() => {
                                            "expand" === e ? (setStyle("stories_layers_background", "opacity", 1), setStyle(this.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(this.activeStory.wrapEl, "transform", `translate(${o}px, ${a}px) scale(0.01)`), setStyle(i, "transform", "scale(1)")), this.animationTimer = setTimeout(() => {
                                                s(), "expand" === e ? (setStyle(this.activeStory.wrapEl, "transform", ""), removeClass(this.layerEl, "animation"), removeClass(this.stories, "animated"), this.playStory(), f.length > 1 && (f[f.length - 2].setLayerVisibility(!1), f[f.length - 1].showBackButton())) : (removeClass(i, "stories_feed_item_ava_animate"), setStyle(i, "transform", ""))
                                            }, 330)
                                        }, 30)
                                    }, 30)
                                })
                            }
                            pauseLayer() {
                                this.pauseStory(), addClass(this.layerEl, "paused")
                            }
                            resumeLayer() {
                                this._updateVolumeButton(), this.activeStory.volumeUpdate(), this.activeStory && !this.activeStory.story.isNarrativeMetaStory && (this.playStory(), removeClass(this.layerEl, "paused"), this.activeStory.feedbackScroll && this.activeStory.feedbackScroll.update())
                            }
                            setLayerVisibility(e) {
                                toggle(this.layerEl, e)
                            }
                            _renderVolumeControl() {
                                return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControlContainer = ce("div", {
                                    className: "stories_volume_control_container"
                                }), this.volumeControlContainer.appendChild(this.volumeControl), this.volumeControlContainer
                            }
                            _volumeControlOnMouseDown(e) {
                                addClass(this.volumeControlContainer, "changing");
                                var t = geByClass1("stories_volume_control_slide", this.volumeControl),
                                    s = geByClass1("stories_volume_control_slide_indicator", t),
                                    [i] = getXY(t),
                                    [r] = getSize(t),
                                    o = e => {
                                        var t = Math.max(0, Math.min(e.pageX - i, r)) / r * 100;
                                        setStyle(s, "width", t + "%"), g(t / 100), this.activeStory.volumeUpdate()
                                    },
                                    a = () => {
                                        removeEvent(window, "mousemove", o), removeEvent(window, "mouseup", a), this._updateVolumeButton(), removeClass(this.volumeControlContainer, "changing")
                                    };
                                addEvent(window, "mousemove", o), addEvent(window, "mouseup", a), o(e)
                            }
                            _updateVolumeButton() {
                                var e = 100 * m();
                                toggleClass(this.volumeControl, "low", e > 0 && e < 50), toggleClass(this.volumeControl, "high", e >= 50);
                                var t = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                                setStyle(t, "width", e + "%")
                            }
                            _volumeControlOnClick(e) {
                                if (!hasClass(e.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                                    var t = m();
                                    g(t = t ? 0 : 1), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                                }
                            }
                            onReplyDeleted(e) {
                                this.activeStory && this.activeStory.onReplyDeleted(e)
                            }
                            _markStoryAsSkipped() {
                                this.storiesSkip.push(this.getStoryRaw())
                            }
                            _hasContext(e) {
                                return !(!this.extra || !this.extra.context || this.extra.context !== e)
                            }
                        }(e, s, i, r, t), t);
                        var o = Object(Pe.b)();
                        o && (t.fromEl = null, "stories" === o.wkRaw ? (o._hide(!1, !0, !0), o.forceHide = !0, cur.storiesArchiveBoxGUID = o.guid) : o.hide())
                    }).catch(e => {
                        vk.dev && debugLog(e), showFastBox(Object(xe.d)("global_error"), Object(xe.d)("global_unknown_error"))
                    })
                },
                _getUnreadStory(e, t) {
                    e = intval(e);
                    for (var s = !1, i = 0; i < t.length; i++)
                        if (t[i].author.id === e) {
                            for (var r = t[i].items, o = 0; o < r.length; o++)
                                if (r[o].unread) {
                                    s = r[o];
                                    break
                                }
                            s || (s = r[0]);
                            break
                        }
                    return s
                },
                getList: e => new Ne((t, s) => {
                    var [i, r, o] = e.split("/"), a = {
                        blockKey: i,
                        list: r,
                        extra: o
                    }, n = Fe._getList(r);
                    isArray(n) ? (a.items = n, t(a)) : ajax.post("al_stories.php", {
                        act: "get_list",
                        list: r,
                        story_raw: i,
                        extra: o,
                        from_manage: window.cur.module === V ? 1 : 0
                    }, {
                        loader: !0,
                        onDone(e) {
                            cur["stories_list_" + r] = e.list, a.items = e.list, e.recommendations && (cur["stories_list_" + r + "_recommendations"] = e.recommendations), t(a)
                        },
                        onFail: () => (s(), !0)
                    })
                }),
                _getList: e => cur["stories_list_" + e],
                _setList(e, t) {
                    cur["stories_list_" + e] = t
                },
                removeList(e) {
                    delete cur["stories_list_" + e]
                },
                _parseList(e) {
                    var t = (e = decodeURIComponent(e)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\:\;\-]+))?$/i),
                        [, s, i, , r, , o] = t,
                        a = s + "_" + i;
                    return e.match(/from_feed\=1/) ? r = "feed" : e.match(/profile\=1/) ? r = "profile" : r || (r = a), a + "/" + r + "/" + o
                },
                initFeed() {
                    var e = Object(q.F)("stories_feed_items_container");

                    function t() {
                        addEvent(e, browserFeatures.wheelEvent, Fe.feedMouseWheel)
                    }

                    function s() {
                        removeEvent(e, browserFeatures.wheelEvent, Fe.feedMouseWheel)
                    }
                    Fe.updateFeedArrows(), addEvent(e, "mouseenter", t), addEvent(e, "mouseleave", s), cur.destroy.push(function() {
                        removeEvent(e, browserFeatures.wheelEvent, Fe.feedMouseWheel), removeEvent(e, "mouseenter", t), removeEvent(e, "mouseleave", s)
                    })
                },
                feedNext() {
                    return this.feedPaging("next")
                },
                feedPrev() {
                    return this.feedPaging("prev")
                },
                feedPaging(e, t) {
                    var s = Object(q.H)("stories_feed_wrap"),
                        i = Object(q.F)("stories_feed_items"),
                        r = getSize(s)[0],
                        o = cur.storiesPos || 0;
                    if (isNumeric(e)) o += e;
                    else {
                        var a = r - 100;
                        "next" === e ? o += a : o -= a
                    }
                    cur.storiesPos = Math.max(0, Math.min(o, i.scrollWidth - r)), t ? Object(q.hb)(i, "animated") : Object(q.a)(i, "animated"), setStyle(i, "transform", "translateX(-" + cur.storiesPos + "px)"), Fe.updateFeedArrows()
                },
                feedScrollToOwner(e) {
                    var t = Object(q.F)("stories_feed_items").offsetWidth,
                        s = Object(q.F)("feed_story_" + e);
                    if (s) {
                        var i = s.offsetWidth,
                            r = s.offsetLeft;
                        cur.storiesPos = r - t + t / 2 + i / 2, Fe.feedPaging(0, !0)
                    }
                },
                updateFeedStories(e, t) {
                    if (e = e || "news", Object(q.F)("stories_feed_items"))
                        if (inArray(e, ["news", "search"])) {
                            var s = (e, s) => {
                                t && t.cb && t.cb(), this._setList("feed", s);
                                var i = Object(q.F)("stories_feed_items");
                                i && (e ? (setStyle(i, "transform", "translateX(0px)"), Object(q.zb)(i, e), i.children.length < 6 ? Object(q.a)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(q.hb)("stories_feed_wrap", "stories_feed_not_nav_buttons"), cur.storiesPos = 0, Fe.updateFeedArrows(), show("stories_feed_wrap")) : hide("stories_feed_wrap"))
                            };
                            if (t && t.stories) {
                                var {
                                    section: i,
                                    q: r,
                                    stories: o
                                } = t, {
                                    html: a,
                                    js: n
                                } = o;
                                return "search" !== i || r && n.length ? void s(a, n) : void hide("stories_feed_wrap")
                            }
                            ajax.post("al_stories.php", {
                                act: "feed_stories"
                            }, {
                                onDone: s
                            })
                        } else hide("stories_feed_wrap")
                },
                feedMouseWheel(e) {
                    if (!hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) {
                        cancelEvent(e);
                        var t = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                        Fe.feedPaging(t, 1)
                    }
                },
                updateFeedArrows() {
                    var e = Object(q.F)("stories_feed_items");
                    if (e) {
                        cur.storiesPos || (cur.storiesPos = 0);
                        var t = Object(q.H)("stories_feed_wrap").offsetWidth,
                            s = e.scrollWidth - t;
                        0 === cur.storiesPos ? Object(q.a)("stories_feed_arrow_left", "disabled") : Object(q.hb)("stories_feed_arrow_left", "disabled"), cur.storiesPos === s || s <= 0 ? Object(q.a)("stories_feed_arrow_right", "disabled") : Object(q.hb)("stories_feed_arrow_right", "disabled")
                    }
                },
                showBlackList() {
                    cur.storyLayer && cur.storyLayer.pauseStory(), showBox("al_stories.php", {
                        act: "black_list"
                    }, {
                        onDone() {
                            cur.storiesBlackListScroll = new uiScroll("stories_black_list_result")
                        },
                        params: {
                            onHide: () => {
                                cur.storyLayer && cur.storyLayer.playStory()
                            }
                        }
                    })
                },
                blackListItemClick(e, t) {
                    cancelEvent(t);
                    var s = intval(attr(e, "data-id"));
                    cur.storiesBlackListShown[s] ? (delete cur.storiesBlackListShown[s], Object(q.hb)(e, "olist_item_wrap_on")) : (cur.storiesBlackListShown[s] = 1, Object(q.a)(e, "olist_item_wrap_on"))
                },
                saveBlackList(e) {
                    var t = Object.keys(cur.storiesBlackListShown);
                    0 !== t.length ? ajax.post("al_stories.php", {
                        act: "save_blacklist",
                        hash: cur.storiesBlackList.hash,
                        list: t.join(",")
                    }, {
                        onDone() {
                            Object(Pe.b)().hide(), Fe.updateFeedStories()
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    }) : Object(Pe.b)().hide()
                },
                blacklistUpdateUsers(e) {
                    var t = e;
                    if (e = trim(e).toLowerCase(), cur.storiesBlacklistLastQ !== e) {
                        cur.storiesBlacklistLastQ = e;
                        var s = e ? cur.storiesIndexer.search(e) : cur.storiesBlackList.users,
                            i = [];
                        if (e)
                            for (var r = 0; r < e.length; r++) i.push(e.substr(r, 1));
                        for (var o = new RegExp(i.join(".*?"), "i"), a = "", n = 0; n < s.length; n++) {
                            var d = s[n],
                                l = e ? d.name.replace(o, e => `<em>${e}</em>`) : d.name;
                            a += cur.storiesBlackList.tpl.replace(/\{id\}/g, d.id).replace("{photo}", d.photo).replace("{name}", l).replace("{href}", d.href).replace("{class_name}", cur.storiesBlackListShown[d.id] ? " olist_item_wrap_on" : "")
                        }
                        a || (a = '<div class="no_rows">' + Object(xe.d)("global_search_not_found").replace("{search}", clean(t)) + "</div>"), Object(q.zb)(Object(q.H)("olist", "stories_black_list_result"), a)
                    }
                },
                blackListInit(e) {
                    cur.storiesBlackListShown = {}, cur.storiesBlackList = e, Object(Pe.b)().setOptions({
                        width: 450,
                        bodyStyle: "padding: 0px",
                        onClean: function() {
                            this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                        }
                    }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, e => e.name, () => {
                        Fe.blacklistUpdateUsers("")
                    }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), Object(Pe.b)().addButton(Object(xe.d)("global_save"), Fe.saveBlackList).addButton(Object(xe.d)("global_cancel"), void 0, "no")) : Object(Pe.b)().addButton(Object(xe.d)("global_close"))
                },
                preloadUrl(e) {
                    p(e)
                },
                showNextRepliesChunk(e) {
                    var t = gpeByClass("stories_feedback_replies_items", e);
                    Object(q.hb)(Object(q.H)("stories_replies_chunk_hidden", t), "stories_replies_chunk_hidden");
                    var s = Object(q.H)("stories_replies_chunk_hidden", t);
                    s ? Object(q.zb)(e, langNumeric(Object(xe.d)("stories_replies_more_button", intval(attr(s, "data-size"))))) : re(e), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
                },
                groupStoriesBlockUpdate() {
                    var e = Fe._getList("group_stories"),
                        t = e && e[0] && e[0].items;
                    if (t) {
                        for (var s = 0, i = 0; i < t.length; i++) {
                            t[i].unread && s++
                        }
                        var r = Object(q.H)("stories_groups_block_stories_wrap"),
                            o = Object(q.H)("stories_groups_block_stories_button", r);
                        Object(q.wb)(r, "has_unread", s > 0), Object(q.wb)(r, "has_stories", t.length > 0), Object(q.wb)(o, "has_stories", t.length > 0);
                        var a = Object(Be.d)(cur.storiesPreviews),
                            n = a.splice(a.length - s, 3);
                        n.length < 3 && (n = n.concat(a.slice(0, 3 - n.length))), n.reverse();
                        for (var d = "", l = n.length - 1; l >= 0; l--) d += cur.storiesPreviewsRowHtml.replace("{url}", n[l]);
                        Object(q.zb)(Object(q.H)("stories_groups_block_stories_rows", r), d)
                    }
                },
                isLiveShown: e => !!(cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.isActiveLive()) && cur.storyLayer.activeStory.story.videoRaw === e,
                activeLiveEnded(e) {
                    cur.storyLayer.activeStory.onLiveEnded(e)
                },
                updateLiveViewersCount(e) {
                    var t = e ? Object(xe.d)("stories_live_N_watching", e, !0) : "";
                    cur.storyLayer.activeStory.updateLiveViewersCount(t)
                }
            };
        window.Stories = Fe;
        try {
            stManager.done("stories.js")
        } catch (e) {}
    },
    "T/g7": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return n
        });
        var i = s("nAFc"),
            r = {},
            o = window.getLang,
            a = window.langNumeric;

        function n(e, t = !1, s) {
            var n = "number" == typeof t,
                d = e + (t || n ? ".raw" : "");
            if (void 0 === r[d]) {
                var l = t || n ? o(e, "raw") : o(e);
                "string" == typeof l ? r[d] = Object(i.a)(l) : Array.isArray(l) && (r[d] = l.map(i.a))
            }
            return n ? a(t, r[d], s) : r[d] || ""
        }
        t.a = {
            getLang: n
        }
    },
    "Tn+0": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return i
        }), s.d(t, "c", function() {
            return r
        }), s.d(t, "a", function() {
            return o
        }), s.d(t, "e", function() {
            return a
        }), s.d(t, "d", function() {
            return n
        });
        s("pIFo");
        var i = "sf",
            r = "sf_report",
            o = 1e3;

        function a(e) {
            return gpeByClass(r, e).id.replace("report", "")
        }

        function n(e) {
            var t = gpeByClass(r, e),
                s = geByClass1("decision_result", t);
            return domData(s, "decision_raw_id")
        }
    },
    WbBG: function(e, t, s) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    nAFc: function(e, t, s) {
        "use strict";
        s.d(t, "c", function() {
            return o
        }), s.d(t, "a", function() {
            return a
        }), s.d(t, "b", function() {
            return n
        }), s.d(t, "d", function() {
            return d
        });
        var {
            Emoji: i
        } = window, r = (s("Oyvg"), s("pIFo"), [
            ["&amp;", "&"],
            ["&lt;", "<"],
            ["&gt;", ">"],
            ["&quot;", '"']
        ]);

        function o(e) {
            return r.reduce((e, [t, s]) => e.replace(new RegExp(s, "ig"), t), e)
        }

        function a(e) {
            return r.reduce((e, [t, s]) => e.replace(new RegExp(t, "ig"), s), e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function n(e) {
            return o(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function d(e, {
            lineBreak: t = !1,
            convertEmoji: s = !0
        } = {}) {
            var r = a(e);
            return r = r.replace(/\n\r/gi, "\n"), "oneline" === t ? r = r.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === t && (r = r.replace(/\n/gi, "<br>")), r = o(r), s && (r = i.emojiToHTML(r, !0)), r
        }
    }
});