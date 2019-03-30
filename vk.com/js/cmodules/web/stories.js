! function(t) {
    function e(e) {
        for (var o, n, a = e[0], c = e[1], l = e[2], h = 0, p = []; h < a.length; h++) n = a[h], i[n] && p.push(i[n][0]), i[n] = 0;
        for (o in c) Object.prototype.hasOwnProperty.call(c, o) && (t[o] = c[o]);
        for (d && d(e); p.length;) p.shift()();
        return s.push.apply(s, l || []), r()
    }

    function r() {
        for (var t, e = 0; e < s.length; e++) {
            for (var r = s[e], o = !0, a = 1; a < r.length; a++) {
                var c = r[a];
                0 !== i[c] && (o = !1)
            }
            o && (s.splice(e--, 1), t = n(n.s = r[0]))
        }
        return t
    }
    var o = {},
        i = {
            "web/stories": 0
        },
        s = [];

    function n(e) {
        if (o[e]) return o[e].exports;
        var r = o[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = o, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(r, o, function(e) {
                return t[e]
            }.bind(null, o));
        return r
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "";
    var a = window.webpackJsonp = window.webpackJsonp || [],
        c = a.push.bind(a);
    a.push = e, a = a.slice();
    for (var l = 0; l < a.length; l++) e(a[l]);
    var d = c;
    s.push([127, "common", "bundles/vendors"]), r()
}({
    127: function(t, e, r) {
        t.exports = r("EJ7F")
    },
    "16Al": function(t, e, r) {
        "use strict";
        var o = r("ohE5"),
            i = r("2NuI"),
            s = r("WbBG");
        t.exports = function() {
            function t(t, e, r, o, n, a) {
                a !== s && i(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
            }

            function e() {
                return t
            }
            t.isRequired = t;
            var r = {
                array: t,
                bool: t,
                func: t,
                number: t,
                object: t,
                string: t,
                symbol: t,
                any: t,
                arrayOf: e,
                element: t,
                instanceOf: e,
                node: t,
                objectOf: e,
                oneOf: e,
                oneOfType: e,
                shape: e,
                exact: e
            };
            return r.checkPropTypes = o, r.PropTypes = r, r
        }
    },
    "17x9": function(t, e, r) {
        t.exports = r("16Al")()
    },
    EJ7F: function(t, e, r) {
        "use strict";
        r.r(e);
        var o = r("q1tI"),
            i = r("i8i4"),
            s = r("E2g8"),
            n = s.Promise,
            a = {},
            c = {},
            l = [],
            d = !1,
            h = !1;

        function p(t, e, r) {
            var o = c[t];
            if (o)
                for (var i = 0; i < o.length; i++) {
                    var s = o[i];
                    e ? s.resolve(r) : s.reject(), o.splice(i, 1), i--
                }
        }

        function u(t, e) {
            d.postMessage({
                cmd: "load",
                url: t
            })
        }

        function _(t) {
            return d || ((d = new Worker("/js/al/stories_loader_worker.js")).onmessage = function(t) {
                var e = t.data;
                switch (e.type) {
                    case "loaded":
                        a[e.url] = e.data, p(e.url, !0, e.data);
                        break;
                    case "error":
                        p(e.url, !1);
                        break;
                    case "inited":
                        h = !0;
                        for (var r = 0; r < l.length; r++) u(l[r])
                }
            }), new n(function(e, r) {
                if (t || e(""), a[t]) return e(a[t]);
                switch (function(t) {
                    return t.match(/\.mp4/) ? "video" : t.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
                }(t)) {
                    case "video":
                    case "image":
                        c[t] || (c[t] = []);
                        var o = 0 === c[t].length;
                        if (c[t].push({
                                resolve: e,
                                reject: r
                            }), !o) return;
                        h ? u(t) : l.push(t);
                        break;
                    default:
                        vk.dev && console.error("wrong media url")
                }
            })
        }
        var y = !1;

        function v(t) {
            var e;
            return y || (e = function(t) {
                try {
                    return t.contentDocument ? t.contentDocument : t.contentWindow && t.contentWindow.document ? t.contentWindow.document : t.document
                } catch (t) {}
                return !1
            }(utilsNode.appendChild(ce("iframe"))), y = e && e.body ? e.body : utilsNode.appendChild(ce("div", {}, {
                display: "none"
            }))), t.match(/\.mp4/) ? function(t) {
                return new n(function(e, r) {
                    var o = ce("video");
                    o.oncanplay = function() {
                        e(), re(o)
                    }, o.onerror = function() {
                        r(), re(o)
                    }, y.appendChild(o), o.src = t
                })
            }(t) : function(t) {
                return new n(function(e, r) {
                    var o = vkImage();
                    o.onload = function() {
                        e(), re(o)
                    }, o.onerror = function() {
                        r(), re(o)
                    }, y.appendChild(o), o.src = t
                })
            }(t)
        }
        var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };

        function m() {
            var t = ls.get("video_volume");
            return "number" == typeof t ? Math.min(1, Math.max(0, t)) : 1
        }

        function g(t) {
            ls.set("video_volume", t)
        }

        function w() {
            var t = [];
            return [].concat(Array.prototype.slice.call(arguments)).forEach(function(e) {
                if (e) switch (void 0 === e ? "undefined" : f(e)) {
                    case "string":
                        t.push(e);
                        break;
                    case "object":
                        Object.keys(e).forEach(function(r) {
                            e[r] && t.push(r)
                        });
                        break;
                    default:
                        t.push("" + e)
                }
            }), t.join(" ")
        }
        var b = [];

        function S(t, e) {
            var r = arguments;
            cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = t, ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
                id: "stories_layers_background",
                className: "stories_layers_background"
            })), layerQueue.hide(), layerQueue.push(), layers.fullhide = E, addEvent(window, "visibilitychange", T.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", T.resize), addEvent(document, "keydown", T.keydown), addEvent(document, "keyup", T.keyup)), t.animateStory("expand", e.fromEl), b.push(t), t.length > 1 && addClass(t.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + b.length, function(e) {
                var o = r[0] && r[0].isCloseBtnClick;
                b.length > 1 && !o ? t.back(!0) : (t.hideAllLayers = o, t.hide(!1, !0))
            })
        }

        function k() {
            b.length > 1 ? b[b.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function E(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = 0; r < b.length; r++) b[r].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", T.visibilitychange), removeEvent(window, "resize", T.resize), removeEvent(document, "keydown", T.keydown), removeEvent(document, "keyup", T.keyup), e) {
                var o = nav.objLoc;
                delete o.w, nav.setLoc(o)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), b = []
        }

        function L() {
            return b[b.length - 2]
        }

        function C(t) {
            for (var e = 0; e < b.length; e++) b[e].onReplyDeleted(t)
        }
        var T = {
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
            },
            x = (r("17x9"), r("T/g7")),
            B = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function P(t) {
            var e = t.story,
                r = e.getCurStoryData().hide_settings,
                i = window.uiActionsMenu;
            if (r) return null;
            var s = function(t) {
                var e = [],
                    r = t.getCurStoryData(),
                    o = r.raw_id,
                    i = r.can_hide_reply,
                    s = r.report_hash,
                    n = r.can_remove,
                    a = r.can_share,
                    c = r.narrative,
                    l = r.is_ads,
                    d = t.data.can_blacklist,
                    h = o.split("_").map(function(t) {
                        return intval(t)
                    }),
                    p = B(h, 1)[0],
                    u = c && !c.is_cover;
                !d || u || l || e.push({
                    label: Object(x.b)("stories_add_blacklist_button"),
                    onClick: function() {
                        return t._addToBlacklist()
                    }
                });
                i && e.push({
                    label: Object(x.b)("stories_hide_reply_button"),
                    onClick: function() {
                        return t._hideReply()
                    }
                });
                c && e.push({
                    label: c.is_bookmarked ? Object(x.b)("stories_narrative_remove_bookmark_button") : Object(x.b)("stories_narrative_add_bookmark_button"),
                    onClick: function() {
                        return t._sendNarrativeBookmarkButtonDidPress()
                    }
                });
                a && e.push({
                    label: Object(x.b)("stories_share"),
                    onClick: function() {
                        return t.shareBox()
                    }
                });
                c && c.can_edit && e.push({
                    label: Object(x.b)("stories_narrative_edit_button"),
                    onClick: function() {
                        return t._sendNarrativeEditButtonDidPress()
                    }
                });
                n && t.getOwnerId() < 0 && e.push({
                    label: c ? Object(x.b)("global_narrative_delete") : Object(x.b)("global_delete"),
                    onClick: function() {
                        return c ? t.removeNarrativeBox() : t.removeStoryBox()
                    }
                });
                s && e.push({
                    label: Object(x.b)("stories_report"),
                    onClick: function() {
                        return t.report()
                    }
                });
                p === vk.id || u || e.push({
                    label: Object(x.b)("stories_settings"),
                    onClick: function() {
                        return window.Stories.showBlackList()
                    }
                });
                return e
            }(e);
            if (0 === s.length) return null;
            var n = void 0,
                a = void 0;
            return o.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: function(t) {
                    clearTimeout(n), e.pauseStory(), i.show(a, t)
                },
                onMouseLeave: function() {
                    i.hide(a), clearTimeout(n), n = setTimeout(function() {
                        return e.autoResumeStory()
                    }, 300)
                },
                ref: function(t) {
                    a = t
                }
            }, o.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, s.map(function(t) {
                var e = t.label,
                    r = (t.className, t.onClick);
                return o.createElement("div", {
                    key: e,
                    className: "ui_actions_menu_item",
                    onClick: r
                }, e)
            })))
        }

        function j(t) {
            var e = t.story,
                r = e.getReplies(),
                i = e.getViews() || "",
                s = e.getCurStoryData(),
                n = s.can_manage,
                a = s.narrative,
                c = r.count || "",
                l = a && !a.is_cover,
                d = !(!n || !i),
                h = e.isActiveLive();
            if (l || h || !i && !c) return null;
            return o.createElement("div", {
                className: "stories_button views _views_button",
                onClick: function(t) {
                    e._hideTooltip(), e.showFeedbackTooltip(), t.stopPropagation()
                }
            }, d && o.createElement("div", {
                className: "stories_button_views"
            }, i), c && o.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(c, "%s", !0)
                }
            }))
        }
        var N = window,
            F = N.getLang,
            O = N.showTooltip,
            I = N.trim,
            D = N.addEvent,
            A = N.removeEvent,
            R = N.cancelEvent,
            M = N.isObject,
            H = N.showNarrative,
            W = function(t) {
                function e(r) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var o = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r));
                    return o.emojiId = !1, o.state = {
                        story: r.story,
                        sendFormHasText: !1,
                        sendFormFocused: !1,
                        linkObjectAudioPlaying: !1
                    }, o
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.componentDidMount = function() {
                    this.emojiInit()
                }, e.prototype.componentWillUnmount = function() {
                    this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId)
                }, e.prototype.componentDidUpdate = function() {
                    this.emojiInit()
                }, e.prototype.render = function() {
                    var t = this.props.story;
                    if (!t.story || !this.props.story.getCurStoryData()) return "";
                    var e = {
                        left_side_empty: this._leftSideIsEmpty()
                    };
                    return o.createElement("div", {
                        className: w("stories_story_bottom", e)
                    }, o.createElement("div", {
                        className: "stories_story_bottom_controls",
                        ref: "controls"
                    }, o.createElement(j, {
                        story: t
                    }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), o.createElement(P, {
                        story: t
                    })))
                }, e.prototype._renderLink = function() {
                    var t = this,
                        e = this.props.story.getCurStoryData().link;
                    if (!(M(e) && e.key && e.text)) return "";
                    var r = "stories_link";
                    return e.object_type && (r += " story_link_object_" + e.object_type), this.state.linkObjectAudioPlaying && (r += " story_link_object_audio_playing"), o.createElement("div", {
                        className: "stories_link_wrap"
                    }, o.createElement("a", {
                        target: "_blank",
                        rel: "noopener",
                        className: r,
                        href: e.url,
                        title: e.text,
                        onClick: function(r) {
                            t._linkDidPress(r, e)
                        }
                    }, o.createElement("span", {
                        className: "stories_link__inner",
                        dangerouslySetInnerHTML: {
                            __html: e.text
                        }
                    })))
                }, e.prototype._renderMask = function() {
                    return this.props.story.getCurStoryData().mask_id ? o.createElement("div", {
                        className: "stories_button mask _mask_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: F("stories_mask_tooltip")
                            })
                        },
                        onClick: this._maskButtonDidPress.bind(this)
                    }) : ""
                }, e.prototype._renderShare = function() {
                    return !0 !== this.props.story.getCurStoryData().can_share ? "" : o.createElement("div", {
                        className: "stories_button share _share_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: F("stories_share")
                            })
                        },
                        onClick: this._shareButtonDidPress.bind(this)
                    })
                }, e.prototype._renderRemove = function() {
                    var t = this.props.story;
                    return !t.getCurStoryData().can_remove || t.getOwnerId() < 0 ? "" : o.createElement("div", {
                        className: "stories_button remove _remove_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: F("global_delete")
                            })
                        },
                        onClick: this._removeButtonDidPress.bind(this)
                    })
                }, e.prototype._canMessage = function() {
                    var t = this.props.story.getCurStoryData(),
                        e = t.link,
                        r = t.can_comment;
                    return !(M(e) || !r || this.props.story.isLiveEnded())
                }, e.prototype._renderMessageForm = function() {
                    var t = this,
                        e = this.props.story;
                    if (this._canMessage()) return o.createElement("div", {
                        ref: "sendForm",
                        className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                    }, o.createElement("div", {
                        className: "stories_send_form_text_wrap"
                    }, o.createElement("div", {
                        contentEditable: !0,
                        ref: "messageInput",
                        className: "stories_send_form_text",
                        placeholder: F("stories_answer_placeholder"),
                        onFocus: this._sendFormDidFocus.bind(this),
                        onBlur: this._sendFormDidBlur.bind(this),
                        onKeyUp: function() {
                            return e._onSendFormKeyUp()
                        }
                    })), o.createElement("div", {
                        className: "stories_send_form_helper"
                    }, o.createElement("div", {
                        className: w("stories_send_form_buttons _emoji_wrap", {
                            shown: this.state.sendFormFocused || this.state.sendFormHasText
                        })
                    }, o.createElement("div", {
                        ref: "smileButton",
                        className: "stories_send_form_button smile _emoji_btn emoji_smile",
                        onMouseEnter: function(e) {
                            Emoji.clearSizeCached(t.refs.smileButton), Emoji.show(t.refs.smileButton, e.nativeEvent)
                        },
                        onMouseLeave: function(e) {
                            return Emoji.hide(t.refs.smileButton, e.nativeEvent)
                        },
                        onMouseDown: function(t) {
                            return R(t.nativeEvent)
                        }
                    }), o.createElement("div", {
                        className: w("stories_send_form_button send", {
                            active: this.state.sendFormHasText
                        }),
                        onClick: this._sendMessageButtonDidPress.bind(this)
                    }))))
                }, e.prototype.emojiInit = function() {
                    var t = this;
                    !this.emojiId && this.refs.messageInput ? (this.emojiId = Emoji.init(this.refs.messageInput, {
                        ttDiff: 29,
                        noStickers: !0,
                        noStickersStore: !0,
                        ref: "stories",
                        ttWrap: this.refs.controls,
                        checkEditable: function() {
                            t.props.story.isActiveLive() && VideoChat.checkTextLen(t.refs.messageInput)
                        },
                        onSend: function() {
                            return t.props.story._onAnswerSend(void 0, function() {
                                return t._emojiDidKeyAction()
                            })
                        },
                        forceUp: !0,
                        controlsCont: this.refs.sendForm,
                        onKeyAction: function() {
                            return t._emojiDidKeyAction()
                        },
                        onEmojiAdded: function() {
                            return t._emojiDidKeyAction()
                        }
                    }), D(this.refs.smileButton, "click", R), placeholderInit(this.refs.messageInput, {
                        editable: !0
                    })) : this.emojiId && !this.refs.messageInput && (A(this.refs.smileButton, "click", R), Emoji.destroy(this.emojiId), delete this.emojiId)
                }, e.prototype._leftSideIsEmpty = function() {
                    var t = this.props.story,
                        e = this.props.story.getCurStoryData(),
                        r = e.can_manage,
                        o = e.link,
                        i = e.can_comment,
                        s = e.narrative,
                        n = t.getReplies(),
                        a = t.getViews();
                    return !(a && 0 !== parseInt(a) && !s) && (!n.count || !r) && !M(o) && !i || t.isLiveEnded()
                }, e.prototype._sendFormDidFocus = function() {
                    var t = this.props.story;
                    this.setState({
                        sendFormFocused: !0
                    }), t._onSendFormFocus(), t.layer._sendNavigationStatEvents("comment_tap")
                }, e.prototype._sendFormDidBlur = function() {
                    this.props.story._onSendFormBlur(), this.setState({
                        sendFormFocused: !1
                    }), this._emojiDidKeyAction()
                }, e.prototype._emojiDidKeyAction = function() {
                    var t = I(Emoji.editableVal(this.refs.messageInput));
                    this.setState({
                        sendFormHasText: t.length > 0
                    }), this.refs.messageInput.check()
                }, e.prototype._viewsButtonDidPress = function(t) {
                    this.props.story.showFeedbackTooltip(), t.stopPropagation()
                }, e.prototype._shareButtonDidPress = function() {
                    this.props.story.shareBox()
                }, e.prototype._removeButtonDidPress = function() {
                    this.props.story.removeStoryBox()
                }, e.prototype._maskButtonDidPress = function() {
                    this.props.story.sendMask()
                }, e.prototype._linkDidPress = function(t, e) {
                    if (e) {
                        var r = e.object_type,
                            o = e.object,
                            i = e.url.match(/\/narrative(-?\d+_\d+)/);
                        if (i) {
                            t.preventDefault();
                            var s = i[1];
                            s && (this.props.story.pauseStory(), H(s, {
                                fromEl: this.props.story.wrapEl,
                                isOpenNarrativeFromFeed: !0,
                                source: "narrative_story"
                            }))
                        } else this.props.story._sendStatEvent("url_view");
                        switch (r) {
                            case "audio":
                                this.state.linkObjectAudioPlaying ? (getAudioPlayer().pause(), this.state.story.audioPlaying = !1, cur.storyLayer.resumeLayer()) : (getAudioPlayer().playAudio(o), this.state.story.audioPlaying = !0, cur.storyLayer.pauseLayer()), this.setState({
                                    linkObjectAudioPlaying: !this.state.linkObjectAudioPlaying
                                }), t.preventDefault()
                        }
                    }
                }, e.prototype._sendMessageButtonDidPress = function() {
                    var t = this;
                    this.props.story._onAnswerSend(void 0, function() {
                        return t._emojiDidKeyAction()
                    })
                }, e
            }(o.Component);
        var K = function() {
            function t(e, r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.data = e, this.opts = r, this.paused = !0, this.loaded = !1, this.elems = {};
                var o = e.is_expired,
                    i = e.is_deleted,
                    s = e.can_view_deleted,
                    n = e.is_private,
                    a = e.narrative;
                s || (o ? this._error("expired") : i ? a ? this._error("deleted-narrative") : this._error("deleted") : n && (a ? this._error("private-narrative") : this._error("private")), (o || i || n) && (this.failed = !0))
            }
            return t.prototype.render = function() {
                var t = this;
                this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(function() {
                    t.isLoaded() || t.opts.onLongLoading()
                }, 1e3), this.opts.onLoadingStart())
            }, t.prototype.renderNarrativeCover = function() {
                var t = this.data,
                    e = t.narrative,
                    r = t.photo_url,
                    o = e && e.views ? winToUtf(" · " + e.views) : "";
                return this.NarrativeCover = se('\n      <div class="stories_narrative_cover">\n        <div class="stories_narrative_cover_photo" id="stories_narrative_cover_photo" style="background-image: url(' + data + ')"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">' + getLang("global_type_narrative") + '</span>\n          <span class="stories_narrative_cover__views">' + o + '</span>\n        </div>\n        <div class="stories_narrative_cover__title">' + e.title + '</div>\n        <div class="stories_narrative_cover__author">' + e.owner_name + "</div>\n      </div>\n    "), _(r).then(function(t) {
                    var e = geByClass1("stories_narrative_cover_photo");
                    e && setStyle(e, "backgroundImage", "url(" + t + ")")
                }), this.NarrativeCover
            }, t.prototype.renderNarrativeMetaStory = function() {
                var t = this,
                    e = !(!cur.storyLayer || !cur.storyLayer.isOpenNarrativeFromFeed),
                    r = cur.storyLayer.list,
                    o = r + "_recommendations",
                    i = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    s = ce("div", {
                        className: "narrative-meta-story"
                    }),
                    n = ce("div", {
                        className: "narrative-meta-story__buttons"
                    });
                n.appendChild(this.renderNarrativeButton("replay", function() {
                    cur.storyLayer._sendNavigationStatEvents("narrative_replay"), cur.storyLayer.changeStory(0)
                })), e && n.appendChild(this.renderNarrativeButton("go_to_stories", function() {
                    cur.storyLayer._sendNavigationStatEvents("narrative_go_to_stories"), cur.storyLayer.nextStory()
                })), s.appendChild(n);
                var a = Stories._getList(o);
                return r.match(/narrative-?\d+_\d+$/) && a && (this.coverItems = a.map(function(t) {
                    return t.narrative_cover
                }), this.coverCount = this.coverItems ? this.coverItems.length : 0, this.coverRowsCount = Math.ceil(this.coverCount / 3), this.elems.recBlock = ce("div", {
                    className: "narrative-meta-story__rec"
                }), this.elems.recInner = ce("div", {
                    className: "narrative-meta-story__rec-inner"
                }), this.elems.recItems = ce("div", {
                    className: "narrative-meta-story__rec-items"
                }), this.elems.recTitle = ce("div", {
                    className: "narrative-meta-story__rec-title",
                    innerHTML: getLang("stories_narrative_more")
                }), this.elemOffset = 0, 1 === this.coverRowsCount ? this.elemOffset = 26.4 : this.coverRowsCount > 1 && (this.elemOffset = 26.4 * 1.5), this.scrollOffset = i / 100 * this.elemOffset + 53, setStyle(n, {
                    paddingBottom: this.elemOffset + "vh"
                }), setStyle(this.elems.recTitle, {
                    marginTop: "calc(100vh - " + this.elemOffset + "vh - 53px - 70px)"
                }), this.coverItems.forEach(function(e) {
                    var r = ce("span", {
                            className: "narrative-preview",
                            onclick: function(t) {
                                var r = t.target;
                                Stories.show(cur.storyLayer.getBlockKey(e) + "/" + o, {
                                    fromEl: r,
                                    narrativeId: e.narrative.id,
                                    source: "narrative_recommendations"
                                })
                            }
                        }, {
                            backgroundImage: "url('" + e.preview_url + "')"
                        }),
                        i = ce("div", {
                            className: "narrative-preview__inner",
                            innerHTML: '\n            <a href="' + a[0].author.href + '" class="narrative-preview__author" style="background-image: url(\'' + a[0].author.photo + '\')"></a>\n            <span class="narrative-preview__title">' + e.narrative.title + "</span>\n          "
                        }, {
                            backgroundImage: "url('" + e.small_preview + "')"
                        });
                    r.appendChild(i), t.elems.recItems.appendChild(r)
                }), addEvent(this.elems.recBlock, "scroll wheel touchmove", this.handleRecommendationsScroll.bind(this)), this.elems.recInner.appendChild(this.elems.recTitle), this.elems.recInner.appendChild(this.elems.recItems), this.elems.recBlock.appendChild(this.elems.recInner), s.appendChild(this.elems.recBlock)), s
            }, t.prototype.renderNarrativeButton = function(t, e) {
                if (!t) return "";
                var r = "",
                    o = "";
                switch (e = isFunction(e) ? e : function() {}, t) {
                    case "replay":
                        r = "replay", o = getLang("stories_narrative_repeat_bottom");
                        break;
                    case "go_to_stories":
                        r = "back", o = getLang("stories_narrative_back_bottom")
                }
                var i = ce("div", {
                        className: "narrative-meta-button__circle narrative-meta-button__circle_" + r,
                        onclick: e
                    }),
                    s = ce("div", {
                        className: "narrative-meta-button__text",
                        innerHTML: o
                    }),
                    n = ce("div", {
                        className: "narrative-meta-button"
                    });
                return n.appendChild(i), n.appendChild(s), n
            }, t.prototype.handleRecommendationsScroll = function() {
                var t = Math.min(this.elems.recInner.scrollTop / (this.scrollOffset / 100), 70) / 100;
                setStyle(this.elems.recBlock, {
                    backgroundColor: "rgba(0, 0, 0, " + t + ")"
                }), this.elems.recInner.scrollTop ? (addClass(this.elems.recBlock, "scroll"), this.pause()) : (this.play(), removeClass(this.elems.recBlock, "scroll"))
            }, t.prototype.getContainer = function() {}, t.prototype.play = function() {
                this.paused = !1, this.isLoaded() && this.opts.onPlay()
            }, t.prototype.pause = function() {
                this.paused = !0, this.opts.onPause()
            }, t.prototype.setCurrentTime = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
            }, t.prototype.destroy = function() {
                removeEvent(this.elems.recBlock), clearTimeout(this.longLoadingTimer)
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
            }, t.prototype.getTrackCode = function() {
                return this.data.track_code
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
        var V = function(t) {
            function e(r, o, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var s = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, r, o, i));
                return s.wrapEl = i, s.videoRaw = s.data.video.owner_id + "_" + s.data.video.video_id, s
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.render = function() {
                var e = this;
                t.prototype.render.call(this), this.el = ce("div", {
                    className: "stories_live"
                });
                var r = ce("div", {
                    className: "stories_live_player"
                }, {
                    height: "100%",
                    width: "100%"
                });
                return this.el.appendChild(r), this.chatEl = se('\n      <div class="stories_live_chat">\n        <div class="mv_chat_messages_wrap">\n          <div class="mv_chat_messages"></div>\n        </div>\n        <div class="mv_chat_stickers_wrap"></div>\n      </div>\n    '), this.el.appendChild(this.chatEl), window.mvcur && window.mvcur.player && Videoview.hide(!1, !0), setTimeout(function() {
                    showInlineVideo(e.videoRaw, "", {
                        autoplay: 1,
                        module: "story",
                        onLoaded: function() {
                            e._onPlayerInited()
                        }
                    }, !1, r)
                }), this.el
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this._resetTimer(), window.mvcur = {}, this.player && (this.player.destroy(), VideoChat.destroy()), cur.storyLayer._sendNavigationStatEvents("live_player_close"), delete this.el
            }, e.prototype.getContainer = function() {
                return this.el || this.render()
            }, e.prototype.onLiveEnded = function() {
                var t = this;
                this.liveEnded = !0, hide(geByClass1("_error_msg", geByClass1("videoplayer_error")));
                var e = this.mvData.oid < 0 ? getLang("stories_live_ended_desc_club") : langSex(this.mvData.author_sex, getLang("stories_live_ended_desc_user", "raw"));
                e = e.replace("{name}", this.mvData.md_author);
                var r = this.mvData.oid < 0 ? getLang("stories_live_ended_open_club") : getLang("stories_live_ended_open_user");
                hide(this.chatEl), hide(domByClass(this.player.ui.thumb, "videoplayer_big_play_btn"));
                var o = cur.storyLayer.storiesBlocks.length > 1;
                this.el.appendChild(se('\n    <div class="stories_live_end">\n      <div class="stories_live_end_author_photo" style="background-image: url(' + this.mvData.author_photo + ')"></div>\n      <div class="stories_live_end_title">' + getLang("stories_live_ended_title") + '</div>\n      <div class="stories_live_end_desc">' + e + '</div>\n      <a href="' + this.mvData.author_href + '" class="stories_live_end_open_owner">' + r + '</a>\n      <div class="stories_live_end_timer" onclick="cur.storyLayer.nextStory()" style="' + (o ? "" : "display: none;") + '">\n        <canvas class="_timer_canvas" width="100" height="100"></canvas>\n        <div class="stories_live_end_timer_text">' + getLang("stories_live_ended_watch_next") + "</div>\n      </div>\n    </div>\n    ")), o && setTimeout(function() {
                    t._startTimer()
                })
            }, e.prototype.pause = function() {}, e.prototype.play = function() {
                this.player && !this.liveEnded && (t.prototype.play.call(this), this.player && this.player.play())
            }, e.prototype.sendMessage = function(t, e) {
                t.length > mvcur.maxChatReplyLength || (ajax.post("al_video.php?act=post_comment", {
                    comment: t,
                    video: this.videoRaw,
                    hash: this.mvData.hash,
                    videoviewer_chat: 1
                }), cur.storyLayer.activeStory._onAnswerSended(e))
            }, e.prototype.volumeUpdate = function() {
                this.player.setVolume(m())
            }, e.prototype._onCanPlay = function() {
                t.prototype._onCanPlay.call(this), setStyle(this.el, "opacity", 1)
            }, e.prototype._onPlayerInited = function() {
                this._onCanPlay(), this.player = window.cur.videoInlinePlayer, this.play(), cur.storyLayer._sendNavigationStatEvents("live_player_show"), browser.safari && this.player.toggleMute(!0, !1), this.mvData = Videoview.getMvData(), window.mvcur = {
                    chatMode: !0,
                    maxChatReplyLength: this.mvData.maxChatReplyLength,
                    mvData: this.mvData,
                    mvShown: !0,
                    queueKey: this.mvData.queue_params.key,
                    qversion: this.mvData.qversion
                }, VideoChat.init(this.chatEl, {
                    scrollHidden: !0
                }), Videoview.queueCheckUpdates(this.mvData.queue_params)
            }, e.prototype._startTimer = function() {
                var t = this;
                if (window.CanvasRenderingContext2D) {
                    var e = domByClass(this.el, "_timer_canvas"),
                        r = e.getContext("2d");
                    r.lineWidth = 6, r.lineCap = "round", r.strokeStyle = "#fff";
                    var o = Date.now();
                    show(e), this.timerInProgress = !0,
                        function e() {
                            var i = (Date.now() - o) / 5e3;
                            i < 1 ? (r.clearRect(0, 0, 100, 100), r.beginPath(), r.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * i), r.stroke(), t._nextTO = setTimeout(e, 16)) : cur.storyLayer.nextStory()
                        }()
                }
            }, e.prototype._resetTimer = function() {
                window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this.el, "_timer_canvas")))
            }, e
        }(K);
        var U = function(t) {
            function e() {
                return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.apply(this, arguments))
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.render = function() {
                var e = this;
                if (t.prototype.render.call(this), this.video) return this.video;
                var r = this.data.video_url;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", function() {
                    e._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = r, this.volumeUpdate(), this.video)
            }, e.prototype.getContainer = function() {
                return this.video || this.render()
            }, e.prototype.getImage = function() {
                var t = getSize(this.video),
                    e = ce("canvas", {
                        width: t[0],
                        height: t[1]
                    });
                return e.getContext("2d").drawImage(this.video, 0, 0, t[0], t[1]), e.toDataURL()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), removeEvent(this.video), delete this.video
            }, e.prototype.play = function() {
                var e = this;
                if (t.prototype.play.call(this), this.loaded && this.video) {
                    var r = this.video.play();
                    void 0 !== r && r.catch(function(t) {
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
                this.video.volume = m()
            }, e
        }(K);
        var z = function(t) {
                function e(r, o) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var i = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, o));
                    return i.startTs = 0, i.pauseTime = 0, i
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.render = function() {
                    var e = this;
                    if (t.prototype.render.call(this), this.photo) return this.photo;
                    var r = this.data,
                        o = r.photo_url,
                        i = r.narrative;
                    return this.photo = ce("div", {
                        className: "stories_photo"
                    }), this._isFailed() ? this.photo : (_(o).then(function(t) {
                        e.photo && (i && i.is_cover ? addClass(e.photo, "stories_narrative_cover_blur") : setStyle(e.photo, "backgroundImage", "url(" + t + ")"), e._onCanPlay())
                    }).catch(function() {
                        e._loadingError()
                    }), this.photo)
                }, e.prototype.getContainer = function() {
                    return this.isNarrativeMetaStory || this.photo || this.render()
                }, e.prototype.destroy = function() {
                    t.prototype.destroy.call(this), delete this.photo
                }, e.prototype.play = function() {
                    (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), t.prototype.play.call(this)
                }, e.prototype.pause = function() {
                    this.isPaused() || (t.prototype.pause.call(this), this.pauseTime = this.getCurrentTime())
                }, e.prototype.setCurrentTime = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    this.startTs = Date.now() + t, this.isPaused() && (this.pauseTime = t)
                }, e.prototype.getCurrentTime = function() {
                    return Date.now() - this.startTs || 0
                }, e.prototype.getDuration = function() {
                    return 5e3
                }, e.prototype._onCanPlay = function() {
                    this.startTs = Date.now(), t.prototype._onCanPlay.call(this), setStyle(this.photo, "opacity", 1)
                }, e
            }(K),
            q = "stories_manage",
            Y = 1,
            X = 2,
            G = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var Q = window,
            J = Q.radioBtns,
            $ = Q.getLang,
            Z = Q.lockButton,
            tt = Q.unlockButton,
            et = Q.removeEvent,
            rt = Q.addEvent,
            ot = Q.addClass,
            it = Q.removeClass,
            st = Q.toggleClass,
            nt = Q.geByClass1,
            at = Q.geByClass,
            ct = Q.ge,
            lt = Q.se,
            dt = Q.domQuery,
            ht = Q.curBox,
            pt = Q.showBox,
            ut = Q.extend,
            _t = Q.setStyle,
            yt = function() {
                function t(e, r) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.data = e, this.opts = r, this.id = r.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = r.layer
                }
                return t.prototype.destroy = function() {
                    this._destroyStory(), et(window, "resize", this._onResizeHandle.bind(this)), et(this.contWrap, "click", this._onClickHandle.bind(this)), et(nt("stories_item_cont", this.contWrap)), et(nt("stories_reply_to", this.replyToWrap)), et(this.shareButton), delete this.shareButton, et(this.followBtn), delete this.followBtn, et(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                    for (var t = at("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) et(t[e]);
                    et(this.viewsButton), et(nt("stories_feedback_close", this.wrapEl)), et(nt("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.descEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                    for (var r = !1, o = 0; o < this.data.items.length; o++)
                        if (this.data.items[o].unread) {
                            r = !0;
                            break
                        }
                    var i = L();
                    if (!r && i && i.activeStory) {
                        var s = dt("#feed_story_" + this.layer.getBlockKey(this.data), i.activeStory.wrapEl)[0];
                        it(s, "story_feed_new_item"), it(s, "story_feed_new_item_promo")
                    }
                }, t.prototype._destroyTimeLine = function() {
                    for (var t = at("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) et(t[e])
                }, t.prototype.getOwnerId = function() {
                    return this.data.author.id
                }, t.prototype.getIndex = function() {
                    return this.index
                }, t.prototype.isLastStory = function() {
                    return this.index >= this.data.items.length - 1
                }, t.prototype.getRawId = function() {
                    return !!this.story && this.story.getId()
                }, t.prototype.getTrackCode = function() {
                    return !!this.story && this.story.getTrackCode()
                }, t.prototype.getReadHash = function() {
                    return this.data.read_hash
                }, t.prototype.getType = function() {
                    return this.data.type
                }, t.prototype.render = function() {
                    this.wrapEl = ce("div", {
                        className: "stories_item"
                    }), this.contWrap = ce("div", {
                        className: "stories_item_cont_wrap"
                    }), this.contStickers = ce("div", {
                        className: "stories_item_cont_sticker"
                    }), this.contWrap.appendChild(this.contStickers), this.wrapEl.appendChild(this.contWrap), rt(window, "resize", this._onResizeHandle.bind(this)), rt(this.contWrap, "click", this._onClickHandle.bind(this));
                    var t = ce("div", {
                        className: "stories_item_cont"
                    });
                    return rt(t, "mousedown", this._onMouseDownHandle.bind(this)), rt(t, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(t), t.appendChild(this._renderAuthor()), this.contWrap.appendChild(ce("div", {
                        className: "stories_bottom_wrap"
                    })), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                        className: "stories_item_back"
                    }), t.appendChild(this.backButton)), this.replyToWrap = t.appendChild(ce("div", {
                        className: "stories_reply_to_wrap"
                    })), this.inlineLoader = t.appendChild(ce("div", {
                        className: "stories_inline_loader",
                        innerHTML: getProgressHtml()
                    })), t.appendChild(ce("div", {
                        className: "stories_play_button video_thumb_play"
                    })), this.isActiveLive() ? ot(this.wrapEl, "live") : this._initTimeLine(), st(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
                }, t.prototype.updateBottom = function(t) {
                    var e = nt("stories_bottom_wrap", this.wrapEl);
                    !this.isActive || t || this.story.isNarrativeMetaStory ? (i.unmountComponentAtNode(e), val(e, "")) : i.render(o.createElement(W, {
                        story: this
                    }), e)
                }, t.prototype._canForceDeleteStories = function() {
                    return this.data.moder_remove_hash && !this.data.items[0].is_deleted
                }, t.prototype._initTimeLine = function() {
                    this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), nt("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
                }, t.prototype._isActionsShown = function() {
                    var t = domClosest("_ui_menu_wrap", this.wrapEl);
                    return hasClass(t, "shown")
                }, t.prototype._renderPreview = function() {
                    return lt('<div class="stories_preview"></div>')
                }, t.prototype._renderMessage = function(t) {
                    return lt('<div class="stories_message">\n  <div class="stories_message_text">' + t + "</div>\n</div>")
                }, t.prototype._showMessage = function(t) {
                    var e = this;
                    re(nt("stories_message", this.contWrap));
                    var r = this._renderMessage(t);
                    return this.contWrap.appendChild(r), clearTimeout(this.showMessageTimer), new Promise(function(t) {
                        e.showMessageTimer = setTimeout(function() {
                            e.contWrap.removeChild(r), t()
                        }, 3e3)
                    })
                }, t.prototype._setPreview = function(t, e) {
                    var r = this,
                        o = this.index,
                        i = this.data.items[o].preview_url;
                    i !== this.curPreviewUrl && i && (e = e || function() {}, t = t || nt("stories_preview", this.contWrap), _(i).then(function(s) {
                        o === r.index && i !== r.curPreviewUrl && (r.curPreviewUrl = i, _t(t, "backgroundImage", "url(" + s + ")")), _t(t, "opacity", 1), setTimeout(e, 0)
                    }))
                }, t.prototype.getPreview = function() {
                    return this.data.items[this.index].preview_url
                }, t.prototype._renderAuthor = function() {
                    var t = this.data.author,
                        e = t.photo,
                        r = t.href,
                        o = t.name,
                        i = t.verify,
                        s = this.data && this.data.items[0] && this.data.items[0].narrative,
                        n = void 0;
                    this.data.is_narrative && s && !s.is_cover ? n = '\n      <div>\n          <div class="stories_narrative_title">' + s.title + '</div>\n          <span class="stories_narrative_author"><a href="' + r + '" class="stories_narrative_author_link">' + o + "</a> · " + $("global_type_narrative") + "</span>\n      </div>" : n = '\n      <div class="stories_author_cont">\n        ' + ('<a href="' + r + '" class="stories_author_photo_wrap"><img src="' + e + '" class="stories_author_photo" /></a>') + '\n        <a href="' + r + '" class="stories_author_name"><span>' + o + "</span></a>\n        " + (i || "") + '\n        <div class="stories_desc"></div>\n      </div>';
                    var a = lt('\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">' + n + '</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    ');
                    return !0 === this.data.hide_owner && val(nt("stories_author_cont", a), ""), st(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.descEl = nt("stories_desc", a), this.authorButtons = nt("stories_author_buttons", a), a
                }, t.prototype._renderFollowButton = function() {
                    var t = this;
                    return this.followBtn = ce("div", {
                        className: "stories_author_button stories_follow"
                    }), rt(this.followBtn, "click", this._onFollowBtnClick.bind(this)), rt(this.followBtn, "mouseover", function() {
                        var e = hasClass(t.followBtn, "followed") ? $("stories_unfollow") : $("stories_follow");
                        showTooltip(t.followBtn, {
                            black: 1,
                            center: 1,
                            shift: [0, 5, 0],
                            text: e,
                            appendEl: t.contWrap
                        })
                    }), this.followBtn
                }, t.prototype._renderTimeLine = function() {
                    var t = this;
                    return this.timeLineEl = ce("div", {
                        className: "stories_time_line"
                    }), this.data.items.map(function(e, r) {
                        var o = ce("div", {
                            className: "stories_time_line_item"
                        });
                        rt(o, "click", function() {
                            t.layer._sendNavigationStatEvents("go_to_story_click"), t.changeStory(r)
                        });
                        var i = ce("div", {
                            className: "stories_time_line_item_cont"
                        });
                        i.appendChild(ce("div", {
                            className: "stories_time_line_item_cont_active"
                        })), o.appendChild(i), t.timeLineEl.appendChild(o)
                    }), this.timeLineEl
                }, t.prototype.isPaused = function() {
                    return !this.story || this.story.isPaused()
                }, t.prototype.isLoaded = function() {
                    return !this.story || this.story.isLoaded()
                }, t.prototype._onMouseDownHandle = function(t) {
                    this.isActive && (this.isLocked() || !hasClass(t.target, "stories_item_cont") && !hasClass(t.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.story && this.story.pause(), ot(this.wrapEl, "paused")))
                }, t.prototype._onMouseUpHandle = function(t) {
                    var e = this.downTs;
                    delete this.downTs;
                    var r = !(vkNow() - e < 200 && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                    if (this.isActive && hasClass(t.target, "stories_item_back") && !r && !this.tooltip) return this.layer._sendNavigationStatEvents("go_to_previous_story"), this.prevStory();
                    if (hasClass(t.target, "stories_item_cont") || hasClass(t.target, "stories_item_back"))
                        if (this._feedbackTTShown && this.hideFeedbackTooltip(), it(this.wrapEl, "paused"), this.tooltip) this._hideTooltip();
                        else {
                            if (!this.isActive) return this.id >= this.layer.activeStory.id ? (this.layer._markStoryAsSkipped(), this.layer._sendNavigationStatEvents("go_to_next_author")) : this.layer._sendNavigationStatEvents("go_to_previous_author"), void this.opts.onSelect(this);
                            if (!r) return this.layer._sendNavigationStatEvents("go_to_next_story_tap"), void this._onPlayEnd();
                            e && this.layer._sendNavigationStatEvents("pause_long_tap"), this.isPaused() && this.playStory()
                        }
                }, t.prototype.isLocked = function() {
                    return !!(ht() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply"))
                }, t.prototype.autoResumeStory = function() {
                    this.audioPlaying || this.story.isNarrativeMetaStory || this.tooltip || this.playStory()
                }, t.prototype.playStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.isLocked() || (it(this.wrapEl, "paused"), this.story && !t || this._initStory(), this.story.play(), delete this.downTs)
                }, t.prototype.pauseStory = function(t) {
                    this.story && (this.isPaused() || (t && ot(this.wrapEl, "paused"), this.story.pause()))
                }, t.prototype.changeStory = function(t) {
                    if (this.index !== t && !this.formLocked) {
                        this._destroyStory(), this.index = t, this._hideTooltip();
                        var e = this.getCurStoryData();
                        e.narrative && e.narrative.is_cover ? this._setPreview(!1, this.playStory.bind(this)) : (this._setPreview(), this.playStory())
                    }
                }, t.prototype.getWrap = function() {
                    return this.wrapEl
                }, t.prototype.stop = function() {
                    this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(nt("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), it(this.wrapEl, "autoplay_failed")
                }, t.prototype.getCurStoryData = function() {
                    var t = this.data.items[this.index];
                    return t || {}
                }, t.prototype.isActiveLive = function() {
                    return "live" === this.getCurStoryData().type
                }, t.prototype.isLiveEnded = function() {
                    return this.isActiveLive() && this.story.liveEnded
                }, t.prototype._initStory = function() {
                    var t = this,
                        e = this.getCurStoryData(),
                        r = e.type;
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
                    ("live" === r ? this.story = new V(e, o, this.wrapEl) : ("video" === r ? (this.story = new U(e, o), ot(this.wrapEl, "video")) : (this.story = new z(e, o), this.opts.onVideoEnd(), it(this.wrapEl, "video")), val(this.descEl, e.is_ads ? $("stories_is_ad") : this.story.getDate()), this.fillTimeLine()), "live" === r || "video" === r) && (m() > 0 && this.opts.onVideoPlay());
                    this.opts.onStartStory(), st(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), !this.data.author.can_follow || this.data.is_promo || this.isActiveLive() || this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = e.isNarrativeMetaStory, this._destroyFeedBackTT(), this.story.isNarrativeMetaStory || (this.updateBottom(), this.contWrap.appendChild(this.story.render())), e.clickable_stickers && this.renderStickersLayer(), this.story.data && this.story.data.narrative && this.story.data.narrative.is_cover && (this.contWrap.appendChild(this.story.renderNarrativeCover()), rt(nt("stories_narrative_cover", this.contWrap), "click", function(e) {
                        t._showTooltip(e, t._createNarrativeTooltipLink())
                    })), this.story.isNarrativeMetaStory && !this.story.failed && (re(nt("stories_photo", this.contWrap)), re(nt("stories_video", this.contWrap)), ot(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()), this.story._onCanPlay())
                }, t.prototype._getStickerStyle = function(t, e) {
                    var r = this.getCurStoryData().clickable_stickers,
                        o = r.original_width,
                        i = r.original_height,
                        s = t.top,
                        n = t.left,
                        a = t.width,
                        c = t.height,
                        l = t.rotate,
                        d = getSize(e),
                        h = G(d, 2),
                        p = h[0],
                        u = h[1],
                        _ = p,
                        y = u;
                    return u / p > 1.77 ? _ = o * u / i : y = i * p / o, {
                        top: s * y - (y - u) / 2 + "px",
                        left: n * _ - (_ - p) / 2 + "px",
                        width: a * _ + "px",
                        height: c * y + "px",
                        transform: "rotate(" + l + "deg)"
                    }
                }, t.prototype.renderStickersLayer = function() {
                    var t = this,
                        e = this.getCurStoryData().clickable_stickers,
                        r = (isObject(e) ? e : {}).stickers;
                    this.stickers = [], isArray(r) && r.forEach(function(e) {
                        var r = e.type,
                            o = e.hashtag,
                            i = e.mention,
                            s = e.style;
                        if (inArray(r, [Y, X])) {
                            var n = ce("div", {
                                className: "stories_sticker"
                            }, t._getStickerStyle(e, t.contWrap));
                            switch (domData(n, "type", r), domData(n, "style", s), r) {
                                case Y:
                                    domData(n, "hashtag", o);
                                    break;
                                case X:
                                    domData(n, "mention", i)
                            }
                            t.contStickers.appendChild(n), t.stickers.push(n)
                        }
                    })
                }, t.prototype._onResizeHandle = function() {
                    var t = this,
                        e = this.getCurStoryData().clickable_stickers,
                        r = (isObject(e) ? e : {}).stickers;
                    isArray(r) && r.forEach(function(e, r) {
                        inArray(e.type, [Y, X]) && t.stickers[r] && _t(t.stickers[r], t._getStickerStyle(e, t.contWrap))
                    }), this._hideTooltip()
                }, t.prototype._onClickHandle = function(t) {
                    hasClass(t.target, "stories_sticker") && (this.hideFeedbackTooltip(), this.tooltip ? this._hideTooltip() : this._showTooltip(t, this._createStickerLink(t.target)))
                }, t.prototype._createStickerLink = function(t) {
                    var e = this,
                        r = intval(domData(t, "type"));
                    if (r) {
                        var o = void 0,
                            i = void 0,
                            s = void 0,
                            n = {
                                type: r,
                                style: domData(t, "style")
                            };
                        switch (r) {
                            case Y:
                                var a = domData(t, "hashtag") || "";
                                o = "/feed?q=" + a.replace("#", "%23") + "&section=search", i = $("stories_show_hashtag_link"), s = "search", n.text = a;
                                break;
                            case X:
                                var c = (domData(t, "mention") || "").slice(1, -1).split("|");
                                o = "/" + c[0], i = c[0].startsWith("id") ? $("stories_go_to_profile") : $("stories_go_to_group"), s = "profile"
                        }
                        return this._sendStatStickerEvent("click", n), ce("a", {
                            href: o,
                            innerHTML: i,
                            className: "stories_tooltip_link",
                            target: "_blank",
                            onclick: function() {
                                e._sendStatStickerEvent(s, n)
                            }
                        })
                    }
                }, t.prototype._createNarrativeTooltipLink = function() {
                    var t = this;
                    return ce("div", {
                        className: "stories_tooltip_link",
                        innerHTML: $("stories_narrative_show"),
                        onclick: function() {
                            t._hideTooltip(!0), showNarrative(t.story.data.narrative.owner_id + "_" + t.story.data.narrative.id, {
                                isOpenNarrativeFromFeed: !0,
                                source: "narrative_story"
                            })
                        }
                    })
                }, t.prototype._showTooltip = function(t, e) {
                    if (this.tooltip) this._hideTooltip();
                    else {
                        this.tooltip = ce("div", {
                            className: "stories_tooltip"
                        }, {
                            top: 0,
                            left: 0
                        }), this.tooltip.appendChild(e), this.layer.layerEl.appendChild(this.tooltip);
                        var r = getSize(this.tooltip),
                            o = G(r, 2),
                            i = o[0],
                            s = o[1],
                            n = t.clientX,
                            a = void 0 === n ? 0 : n,
                            c = t.clientY,
                            l = void 0 === c ? 0 : c;
                        _t(this.tooltip, {
                            top: l - s - 10,
                            left: a - i / 2
                        }), this.pauseStory()
                    }
                }, t.prototype._hideTooltip = function(t) {
                    this.tooltip && (t || this.playStory(), this.layer.layerEl.removeChild(this.tooltip), delete this.tooltip)
                }, t.prototype.getReplies = function() {
                    return this.story.getReplies()
                }, t.prototype.getViews = function() {
                    return this.story.getViews()
                }, t.prototype.indexToUnread = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = this.data.items,
                        r = 0;
                    for (var o in e)
                        if (e[o].unread) {
                            r = intval(o);
                            break
                        }
                    if (t) return r;
                    this.index = r, this._setPreview()
                }, t.prototype.indexToStoryById = function(t) {
                    var e = this.data.items,
                        r = -1;
                    for (var o in e)
                        if (e[o].raw_id === t) {
                            r = intval(o);
                            break
                        }
                    r > -1 ? (this.index = r, this._setPreview()) : this.indexToUnread()
                }, t.prototype.fillTimeLine = function() {
                    for (var t = this.timeLineEl, e = 0; e < t.children.length; e++) {
                        var r = nt("stories_time_line_item_cont_active", t.children[e]);
                        e === this.index && (this.currentTimeLineEl = r);
                        var o = e < this.index ? 100 : 0;
                        _t(r, "transform", "translateX(" + o + "%)")
                    }
                }, t.prototype._destroyStory = function() {
                    if (this.story) {
                        this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._hideTooltip(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), it(this.contWrap, "stories_item_cont_wrap_meta_story"), re(nt("narrative-meta-story", this.contWrap)), it(this.contWrap, "stories_narrative_cover_blur"), re(nt("stories_narrative_cover", this.contWrap)), et(nt("stories_narrative_cover", this.contWrap)), this.contStickers.innerHTML = "", cancelAnimationFrame(this.timeLineAnim);
                        try {
                            this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                        } catch (t) {}
                        this._replyHideEnd(), et(this.followBtn), val(this.authorButtons, ""), et(this.answersEl), et(nt("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                    }
                }, t.prototype._timeLineUpdate = function() {
                    var t = this.story;
                    if (t && !t.isPaused() && !this.isActiveLive()) {
                        var e = t.getCurrentTime(),
                            r = t.getDuration(),
                            o = Math.max(0, Math.min(100, e / r * 100));
                        _t(this.currentTimeLineEl, "transform", "translateX(" + o + "%) translateZ(0)"), o < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                    }
                }, t.prototype._onLoadingStart = function() {
                    this._loadingStartTime = new Date
                }, t.prototype._onLoadingEnd = function() {
                    if (statlogsValueEvent("story_views_tmp_stat", this.getCurStoryData().unread ? 0 : 1), this._loadingStartTime) {
                        var t = new Date - this._loadingStartTime;
                        this.layer._sendViewerStartTime(this.getRawId(), t), this._loadingStartTime = 0
                    }
                }, t.prototype._onPlay = function() {
                    this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), it(this.wrapEl, "animate_story"), it(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
                }, t.prototype._onPause = function() {
                    cancelAnimationFrame(this.timeLineAnim)
                }, t.prototype._onPlayEnd = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.nextStory(t)
                }, t.prototype.nextStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (!this.isLocked()) {
                        var e = this.data.items,
                            r = this.index + 1;
                        r < e.length ? (t && this.layer._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this.changeStory(r)) : (this._destroyStory(), this.opts.onStoriesEnd(t))
                    }
                }, t.prototype.prevStory = function() {
                    if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                        var t = this.index - 1;
                        t >= 0 ? this.changeStory(t) : (this._destroyStory(), this.opts.playPrevOwner())
                    }
                }, t.prototype.getOffsetLeft = function() {
                    return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
                }, t.prototype.getWidth = function() {
                    return this.wrapEl.offsetWidth
                }, t.prototype.removeStoryBox = function() {
                    var t = this;
                    this.pauseStory(), showFastBox({
                        title: $("global_warning"),
                        onHide: function() {
                            t.playStory()
                        }
                    }, $("stories_remove_warning"), $("stories_remove_confirm"), this.removeStory.bind(this), $("global_cancel"))
                }, t.prototype.removeStory = function(t) {
                    var e = this;
                    this.pauseStory();
                    var r = this.getIndex(),
                        o = this.getRawId();
                    ajax.post("al_stories.php", {
                        act: "remove_story",
                        story_raw: o,
                        hash: this.data.remove_hash,
                        moder_remove_hash: this.data.moder_remove_hash
                    }, {
                        onDone: function(t) {
                            window.cur.module === q && window.GeStories.storyDidRemove(o, t), ht().hide(), e._popStoryAndClearList(r)
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype.removeNarrativeBox = function() {
                    var t = this;
                    this.pauseStory(), showFastBox({
                        title: $("global_warning"),
                        onHide: function() {
                            t.playStory()
                        }
                    }, $("stories_narrative_remove_warning"), $("stories_remove_confirm"), this.removeNarrative.bind(this), $("global_cancel"))
                }, t.prototype.removeNarrative = function(t) {
                    var e = this;
                    this.pauseStory();
                    var r = this.getCurStoryData().narrative,
                        o = r.raw_id;
                    ajax.post("al_stories.php", {
                        act: "remove_narrative",
                        narrative_raw: o,
                        hash: this.data.remove_hash,
                        moder_remove_hash: this.data.moder_remove_hash
                    }, {
                        onDone: function() {
                            ht().hide(), e._popCoverAndCleanNarrativeList(r)
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype._popCoverAndCleanNarrativeList = function(t) {
                    if (t.is_cover) this._popStoryAndClearList(this.getIndex());
                    else {
                        this.opts.removeList(), this._remove(!1, function() {
                            cur.storyLayer.activeStory._popStoryAndClearList(cur.storyLayer.activeStory.getIndex())
                        }.bind(this))
                    }
                }, t.prototype._sendNarrativeBookmarkButtonDidPress = function() {
                    var t = this,
                        e = this.getCurStoryData().narrative;
                    this.updateBottom = this.updateBottom.bind(this), ajax.post("al_bookmarks.php", {
                        act: "bookmark",
                        owner_id: e.owner_id,
                        object_id: e.id,
                        type: "narrative",
                        state: e.is_bookmarked ? 1 : 0,
                        hash: e.bookmark_hash
                    }, {
                        onDone: function(r) {
                            showDoneBox(r || $("stories_narrative_bookmark_deleted"), {
                                className: "stories_done_msg"
                            }), e.is_bookmarked = !e.is_bookmarked, t.updateBottom()
                        }
                    })
                }, t.prototype._sendNarrativeEditButtonDidPress = function() {
                    var t = this.getCurStoryData().narrative;
                    window.open("https://" + location.hostname + this.data.author.href + "?act=narrative_edit&nid=" + t.id)
                }, t.prototype._popStoryAndClearList = function(t) {
                    this._removeStoryFromMemoryByIndex(t), 0 === this.data.items.length && C(this.getOwnerId())
                }, t.prototype._removeStoryFromMemoryByIndex = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.data.items.splice(t, 1), this.opts.removeList();
                    var r = this.data.items.length;
                    r ? (this._initTimeLine(), r > t ? this.isActive && this.playStory(!0) : this.isActive && this.nextStory()) : this._remove(e)
                }, t.prototype._remove = function(t, e) {
                    this.opts.onStoryRemoved(t, e)
                }, t.prototype.shareBox = function() {
                    var t = this,
                        e = this.getCurStoryData().narrative,
                        r = void 0;
                    r = e ? "narrative" + e.raw_id : "story" + this.story.getId(), this.pauseStory(), pt("like.php", {
                        act: "publish_box",
                        object: r,
                        from: "wkview"
                    }, {
                        onDone: function() {
                            t.autoResumeStory()
                        },
                        params: {
                            onHide: function() {
                                t.autoResumeStory()
                            }
                        }
                    })
                }, t.prototype._onAnswerSend = function(t, e) {
                    var r = this,
                        o = this._getSendText();
                    if (!o || !this.story) return cancelEvent(t);
                    if (this.isActiveLive()) this.story.sendMessage(o, e);
                    else {
                        var i = this.story.data.narrative,
                            s = void 0;
                        s = i ? "narrative:" + i.raw_id : "story:" + this.story.getId(), this.layer._sendNavigationStatEvents("comment_send"), ajax.post("al_im.php", {
                            act: "a_send",
                            msg: o,
                            hash: this.data.send_hash,
                            media: s,
                            entrypoint: "stories_comment",
                            to: this.getOwnerId()
                        }, {
                            onDone: function() {
                                r._onAnswerSended(e)
                            },
                            showProgress: function() {
                                val(r.sendFormButton, r._getLoaderHtml()), ot(r.sendFormButton, "sending")
                            },
                            hideProgress: function() {
                                val(r.sendFormButton, ""), it(r.sendFormButton, "sending")
                            }
                        })
                    }
                }, t.prototype._onAnswerSended = function(t) {
                    var e = this;
                    this.isActiveLive() || this._showMessage($("stories_answer_sent")).then(function() {
                        e._unlockSendForm(), e.playStory()
                    }), val(nt("stories_send_form_text", this.wrapEl), ""), this._blurSendForm(), this.updateFeedbackTTPos(), this.pauseStory(), t && t()
                }, t.prototype._onSendFormFocus = function() {
                    var t = this;
                    this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", function() {
                        Emoji.shown || (t._resetFendForm(), t._blurSendForm()), t.updateFeedbackTTPos()
                    })
                }, t.prototype._blurSendForm = function() {
                    var t = nt("stories_send_form_text", this.wrapEl);
                    t && t.blur()
                }, t.prototype._getSendText = function() {
                    var t = Emoji.editableVal(nt("stories_send_form_text", this.wrapEl));
                    return trim(t)
                }, t.prototype._onSendFormBlur = function() {
                    this._getSendText() || this._resetFendForm()
                }, t.prototype._onSendFormKeyUp = function() {
                    this.updateFeedbackTTPos()
                }, t.prototype._unlockSendForm = function() {
                    this.formLocked && (this.formLocked = !1)
                }, t.prototype._resetFendForm = function() {
                    this._unlockSendForm(), this.playStory(), val(nt("stories_send_form_text", this.wrapEl), "")
                }, t.prototype._emojiOnKeyAction = function() {
                    this._getSendText() ? ot(this.sendFormButton, "active") : it(this.sendFormButton, "active")
                }, t.prototype._getLoaderHtml = function() {
                    return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
                }, t.prototype.preloadNextStory = function(t) {
                    if (t = isUndefined(t) ? this.index + 1 : t, !this.preloadedStories[t]) {
                        var e = this.data.items[t];
                        if (e) {
                            this.preloadedStories[t] = !0;
                            var r = e[e.type + "_url"];
                            r && ("video" === e.type ? v(r) : _(r))
                        }
                    }
                }, t.prototype._addToBlacklist = function() {
                    cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                        title: $("stories_add_blacklist_title"),
                        onHide: function() {
                            cur.storyLayer && cur.storyLayer.playStory()
                        }
                    }, this.getOwnerId() < 0 ? $("stories_add_blacklist_message_group") : $("stories_add_blacklist_message"), $("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), $("global_cancel"))
                }, t.prototype._doAddToBlacklist = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "blacklist_add",
                        owner_id: this.getOwnerId(),
                        hash: this.data.blacklist_hash,
                        source_story: this.getRawId()
                    }, {
                        onDone: function() {
                            e.data.can_blacklist = !1, ht().hide(), e.opts.removeList(), e._remove()
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype._resetErrors = function() {
                    var t = nt("stories_error_wrap", this.contWrap);
                    t && (et(nt("stories_error_button", t)), re(t)), it(this.wrapEl, "failed"), it(this.wrapEl, "fatal_error")
                }, t.prototype._showError = function(t) {
                    var e = this;
                    if (this.contWrap) {
                        var r = t,
                            o = void 0,
                            i = void 0;
                        switch (t) {
                            case "load":
                                o = $("stories_error_cant_load"), i = ce("div", {
                                    className: "stories_error_button",
                                    innerHTML: $("stories_try_again")
                                }), rt(i, "click", function() {
                                    e._destroyStory(), e.playStory()
                                });
                                break;
                            case "expired":
                                o = $("stories_error_expired");
                                break;
                            case "deleted":
                                o = $("stories_error_deleted");
                                break;
                            case "private":
                                o = $("stories_error_private");
                                break;
                            case "deleted-narrative":
                                o = $("stories_error_deleted_narrative");
                                break;
                            case "private-narrative":
                                o = $("stories_error_private_narrative");
                                break;
                            default:
                                o = $("global_unknown_error")
                        }
                        this._resetErrors(), this._stopLoader();
                        var s = ce("div", {
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
                        })), i && a.appendChild(i), s.appendChild(n), this.contWrap.appendChild(s), ot(this.wrapEl, "failed"), inArray(t, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && ot(this.wrapEl, "fatal_error")
                    }
                }, t.prototype._stopLoader = function() {
                    var t = this;
                    setTimeout(function() {
                        re(nt("stories_loader", t.contWrap))
                    }, 0)
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
                            r = void 0;
                        this.data.author.id > 0 ? (r = "al_friends", e = this.data.author.can_follow ? "add" : "remove") : (r = "al_groups", e = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(r + ".php", {
                            act: e,
                            mid: this.getOwnerId(),
                            gid: -this.getOwnerId(),
                            hash: this.data.author.hash,
                            from: "stories"
                        }, {
                            onDone: function() {
                                t.data.author.can_follow && t._sendStatEvent("follow"), t.data.author.can_follow = !t.data.author.can_follow, st(t.followBtn, "followed", !t.data.author.can_follow), t._showMessage($(t.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
                                    return t.playStory()
                                }), window.tooltips && tooltips.destroy(t.followBtn), triggerEvent(t.followBtn, "mouseover")
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
                        e = G(t, 2),
                        r = e[0],
                        o = e[1],
                        i = getXY(this.wrapEl),
                        s = G(i, 2),
                        n = s[0];
                    return {
                        width: r,
                        height: o,
                        top: s[1] - scrollGetY(),
                        left: n - scrollGetX()
                    }
                }, t.prototype.markAsActive = function() {
                    this.isActive = !0, ot(this.wrapEl, "animate_story")
                }, t.prototype._renderReplyTo = function() {
                    var t = this,
                        e = this.getCurStoryData().reply_to,
                        r = e.list,
                        o = e.photo_url,
                        i = e.name,
                        s = e.can_view_deleted,
                        n = e.is_deleted,
                        a = e.is_private,
                        c = e.raw_id,
                        l = lt('<div class="stories_reply_to" style="background-image: url(' + o + ')">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">' + i + "</div>\n  </div>\n</div>");
                    if (rt(l, "click", function() {
                            t.layer._sendNavigationStatEvents("open_parent_story");
                            var e = L();
                            b.length > 1 && e.getStoryRaw() === c ? cancelStackPop() : showStory(r, {
                                fromEl: l,
                                source: "reply_story"
                            })
                        }), s) return l;
                    var d = !1;
                    return n ? (ot(l, "deleted"), d = $("stories_deleted_story")) : a && (ot(l, "private"), d = $("stories_private_story")), d && (val(nt("stories_reply_to_error_msg", l), d), re(nt("stories_reply_to_owner_name_wrap", l))), l
                }, t.prototype.sendMask = function() {
                    var t = this;
                    if (!this._maskSending) {
                        this._maskSending = !0, this.pauseStory();
                        var e = this.getCurStoryData();
                        ajax.post("al_stories.php", {
                            act: "send_mask",
                            mask_id: e.mask_id,
                            hash: this.data.send_mask_hash
                        }, {
                            onDone: function(e, r, o, i) {
                                "cant_send" === e ? showFastBox({
                                    title: r,
                                    width: 460,
                                    onHide: function() {
                                        t.playStory()
                                    }
                                }, o, i) : t._showMessage($("stories_mask_sent")).then(function() {
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
                }, t.prototype._getFeedbackTTElem = function() {
                    return nt("stories_answers_tt_arrow", this.wrapEl) || nt("_views_button", this.wrapEl)
                }, t.prototype._destroyFeedBackTT = function() {
                    var t = this._getFeedbackTTElem();
                    t && t.tt && t.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
                }, t.prototype.hideFeedbackTooltip = function() {
                    if (this._feedbackTTShown) {
                        var t = this._getFeedbackTTElem();
                        t && t.tt && (t.tt.hide(), this._feedbackTTShown = !1, this.autoResumeStory())
                    }
                }, t.prototype.updateFeedbackTTArrow = function() {
                    var t = this._getFeedbackTTElem();
                    if (hasClass(t, "stories_answers_tt_arrow")) {
                        var e = nt("stories_feedback_tt_arrow", this.wrapEl),
                            r = t.offsetLeft + getSize(t)[0] / 2 - getSize(e)[0] / 2 - 1;
                        _t(e, "left", r + "px")
                    }
                }, t.prototype.showFeedbackTooltip = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this._hideTooltip();
                    var r = this._getFeedbackTTElem();
                    if (r)
                        if (this._feedbackTTShown && !0 !== e) cancelStackPop();
                        else {
                            this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", function() {
                                t.hideFeedbackTooltip(!1, !0)
                            }), this._feedbackTTLoaded && (this._feedbackTTShown = !0), this.layer._sendNavigationStatEvents("open_replies_list");
                            var o = 8;
                            if (hasClass(r, "stories_answers_tt_arrow")) {
                                o = getSize(domPN(r))[0] - 39
                            }
                            showTooltip(r, {
                                className: "stories_feedback_tt",
                                forcetoup: !0,
                                nohide: !0,
                                forceNoHide: !0,
                                nohideover: !0,
                                content: '<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">' + this._getLoaderHtml() + '</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>',
                                slide: 15,
                                zIndex: 100,
                                shift: [o, 19, 0],
                                appendEl: nt("stories_bottom_wrap", this.wrapEl),
                                onHide: function() {
                                    t._feedbackTTShown = !1
                                },
                                onShowStart: function() {
                                    t.isActive && (t._feedbackTTShown = !0, t._feedbackTTLoaded ? t._feedbackRequestEnd && (t.feedbackScroll.update(), t._feedbackTooltipInitHeaders(), tooltips.rePositionTT(r.tt), t._onFeedbackScroll(), setTimeout(function() {
                                        return tooltips.rePositionTT(r.tt)
                                    }, 200)) : (nt("stories_feedback_tt", t.wrapEl).appendChild(lt('<div class="stories_feedback_tt_arrow"></div>')), t._feedbackTTLoaded = !0, t._feedbackRequestEnd = !1, t._feedbackTooltipHeadersInited = !1, rt(nt("stories_feedback_close", t.wrapEl), "click", function() {
                                        return t.showFeedbackTooltip()
                                    }), setTimeout(function() {
                                        ajax.post("al_stories.php", {
                                            act: "feedback",
                                            story_raw: t.getRawId()
                                        }, {
                                            onDone: function(e, o, i, s, n) {
                                                if (t.isActive) {
                                                    t.story.setViews(s), t.story.setReplies(n), t._feedbackRequestEnd = !0;
                                                    var a = nt("stories_feedback_content", t.wrapEl);
                                                    val(a, e), t.feedbackScroll = new uiScroll(nt("stories_feedback_content", t.wrapEl), {
                                                        theme: "default emoji no_transition",
                                                        onmore: function() {
                                                            return t._onMoreFeedBack()
                                                        },
                                                        onscroll: function() {
                                                            return t._onFeedbackScroll()
                                                        }
                                                    }), t.feedbackScroll.scrollTop(0), ot(t.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), nt("ui_scroll_overflow", t.feedbackScroll.container).appendChild(ce("div", {
                                                        className: "ui_scroll_shadow_bottom"
                                                    })), t.feedbackNextFrom = o, r.tt.shown && t._feedbackTooltipInitHeaders(), t.updateBottom(), t.updateFeedbackTTPos(), cur = ut(cur, i), t.updateFeedbackTTArrow()
                                                }
                                            }
                                        })
                                    }, 200)), t.updateFeedbackTTArrow())
                                }
                            })
                        }
                }, t.prototype.updateFeedbackTTPos = function() {
                    var t = this._getFeedbackTTElem();
                    this._feedbackTTShown && t && t.tt && tooltips.rePositionTT(t.tt)
                }, t.prototype._feedbackTooltipInitHeaders = function() {
                    if (!this._feedbackTooltipHeadersInited) {
                        this._feedbackTooltipHeadersInited = !0;
                        var t = nt("stories_feedback_content", this.wrapEl),
                            e = nt("stories_feedback_headers", this.wrapEl),
                            r = at("stories_feedback_title", t);
                        show(r[0]), this.feedbackHeaders = [];
                        for (var o = r.length + 1, i = 0; i < r.length; i++) {
                            var s = r[i],
                                n = e.appendChild(ce("div", {
                                    className: "stories_feedback_title",
                                    innerHTML: val(s)
                                }, {
                                    top: s.offsetTop,
                                    zIndex: o - i
                                }));
                            this.feedbackHeaders.push({
                                top: s.offsetTop,
                                height: s.offsetHeight,
                                el: n
                            })
                        }
                        _t(t, "margin-top", r[0].offsetHeight), hide(r[0])
                    }
                }, t.prototype.feedbackTooltipReInitHeaders = function() {
                    this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(nt("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
                }, t.prototype._onFeedbackScroll = function() {
                    if (this._feedbackTooltipHeadersInited)
                        for (var t = this.feedbackScroll.data.scrollTop, e = !1, r = 0, o = this.feedbackHeaders.length - 1; o >= 0; o--) {
                            var i = this.feedbackHeaders[o],
                                s = i.top,
                                n = i.height,
                                a = i.el,
                                c = s,
                                l = t;
                            e && (l -= r - (c += n));
                            var d = l >= s - n;
                            a.classList.toggle("active", !e && d && l > 0), d && (e = !0), r = s;
                            var h = -Math.min(l, c);
                            a.style.transform = "translateY(" + h + "px)"
                        }
                }, t.prototype._onMoreFeedBack = function() {
                    var t = this;
                    !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                        act: "feedback",
                        story_raw: this.getRawId(),
                        offset: this.feedbackNextFrom
                    }, {
                        onDone: function(e, r) {
                            t.feedbackNextFrom = r, r && (t.feedbackLoadingMore = !1);
                            for (var o = nt("stories_feedback_views", t.wrapEl), i = ce("div", {
                                    innerHTML: e
                                }), s = void 0; s = i.firstChild;) o.appendChild(s)
                        }
                    }))
                }, t.prototype.showInlineLoader = function() {
                    show(this.inlineLoader)
                }, t.prototype.hideInlineLoader = function() {
                    hide(this.inlineLoader)
                }, t.prototype.volumeUpdate = function() {
                    this.story && this.story.volumeUpdate && this.story.volumeUpdate()
                }, t.prototype._onAutoPlayFail = function() {
                    ot(this.wrapEl, "autoplay_failed")
                }, t.prototype._hideReply = function() {
                    var t = this;
                    showFastBox({
                        title: $("global_warning"),
                        onHide: function() {
                            t.autoResumeStory()
                        }
                    }, $("stories_hide_reply_warning"), $("global_continue"), this._doHideReply.bind(this), $("global_cancel"))
                }, t.prototype._doHideReply = function() {
                    var t = this;
                    this.pauseStory(), ot(this.wrapEl, "hiding_reply"), ht().hide();
                    var e = this.getIndex(),
                        r = this.data.author.gender,
                        o = lt('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + $("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + $("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(r, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + $("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
                    rt(nt("_stories_reply_restore", o), "click", this._restoreReply.bind(this)), rt(nt("_stories_reply_continue", o), "click", function() {
                        return t._replyHideEnd(e)
                    }), rt(nt("_stories_hide_replies", o), "click", this._hideAllReplies.bind(this)), rt(nt("_stories_reply_ban", o), "click", this._ban.bind(this)), this.contWrap.appendChild(o), ajax.post("al_stories.php", {
                        act: "hide_reply",
                        raw_id: this.getRawId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            t.opts.removeList(), cur.needUpdateFeedStories = !0, it(o, "loading")
                        },
                        onFail: function() {
                            t._resetReplyHide(), t.playStory()
                        }
                    })
                }, t.prototype._restoreReply = function(t) {
                    var e = this;
                    cancelEvent(t);
                    var r = nt("stories_hide_reply_wrap", this.contWrap);
                    ajax.post("al_stories.php", {
                        act: "restore_reply",
                        raw_id: this.getRawId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            e._resetReplyHide(), e.playStory()
                        },
                        showProgress: function() {
                            return ot(r, "loading")
                        },
                        hideProgress: function() {
                            return it(r, "loading")
                        }
                    })
                }, t.prototype._resetReplyHide = function() {
                    re(nt("stories_hide_reply_wrap", this.contWrap)), it(this.wrapEl, "hiding_reply")
                }, t.prototype._hideAllReplies = function() {
                    var t = this.data.author.first_name_gen;
                    showFastBox({
                        title: $("global_warning")
                    }, $("stories_delete_all_replies_confirm").replace("{name}", t), $("global_continue"), this._doHideAllReplies.bind(this), $("global_cancel"))
                }, t.prototype._doHideAllReplies = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "hide_all_replies",
                        owner_id: this.getOwnerId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            ht().hide(), e.opts.removeList(), e.data.items = [];
                            var t = nt("_stories_hide_replies", e.contWrap);
                            val(t, $("stories_all_replies_hidden")), ot(t, "disabled")
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype._ban = function() {
                    var t = this.data.author.first_name_gen;
                    showFastBox({
                        title: $("global_warning")
                    }, $("stories_ban_confirm").replace("{name}", t), $("global_continue"), this._doBan.bind(this), $("global_cancel"))
                }, t.prototype._doBan = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "ban",
                        owner_id: this.getOwnerId(),
                        hash: this.data.stories_ban_hash
                    }, {
                        onDone: function() {
                            ht().hide(), e.opts.removeList(), e.data.items = [];
                            var t = nt("_stories_reply_ban", e.contWrap);
                            val(t, $("stories_banned")), ot(t, "disabled")
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype._replyHideEnd = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                    nt("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && C(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(t || this.getIndex(), !isNumeric(t)))
                }, t.prototype._feedbackRemoveReplyFromDom = function(t) {
                    var e = nt("stories_feedback_content", this.wrapEl);
                    if (e) {
                        var r = e.querySelector("#feed_story_" + t);
                        r && ot(r, "removed")
                    }
                }, t.prototype.onReplyDeleted = function(t) {
                    this._feedbackRemoveReplyFromDom(t)
                }, t.prototype._updateFeedStoryPreview = function() {
                    var t = ct("feed_story_" + this.layer.getBlockKey(this.data));
                    if (t && !hasClass(t, "stories_feed_reply_item")) {
                        var e = this.indexToUnread(!0),
                            r = this.data.items[e];
                        r && r.small_preview && _t(t, "background-image", "url(" + r.small_preview + ")")
                    }
                }, t.prototype._sendStatEvent = function(t) {
                    var e = this.getCurStoryData();
                    ajax.post("al_stories.php", ut({
                        act: "stat",
                        source_story: this.getRawId()
                    }, e.stats[t]))
                }, t.prototype._sendStatStickerEvent = function(t, e) {
                    var r = this.getCurStoryData().clickable_stickers;
                    ajax.post("al_stories.php", ut({
                        act: "stickers_stat",
                        story_raw_id: this.getRawId(),
                        action: t,
                        hash: r.hash
                    }, e))
                }, t.prototype.report = function() {
                    var t = this,
                        e = this.getCurStoryData(),
                        r = "story";
                    this.isActiveLive() ? r = "live" : e.narrative && (r = "narrative");
                    var o = pt("al_stories.php", {
                        act: "report_box",
                        type: r
                    }, {
                        onDone: function() {
                            var t = at("radiobtn", "stories_report");
                            J.stories_report = {
                                val: 0,
                                els: t
                            }
                        },
                        params: {
                            onClean: function() {
                                delete J.stories_report, t.playStory()
                            }
                        }
                    });
                    o.removeButtons(), o.addButton($("box_send"), this._sendReportButtonDidPress.bind(this)), o.addButton($("global_cancel"), !1, "no")
                }, t.prototype._sendReportButtonDidPress = function(t) {
                    var e = this,
                        r = this.index,
                        o = this.getCurStoryData(),
                        i = o.narrative,
                        s = o.report_hash,
                        n = !!i,
                        a = void 0,
                        c = void 0;
                    n ? (a = i.raw_id, c = i.report_hash) : (a = this.getRawId(), c = s), ajax.post("al_stories.php", {
                        act: "report",
                        type: n ? "narrative" : "story",
                        item_raw: a,
                        reason: J.stories_report.val,
                        hash: c
                    }, {
                        onDone: function() {
                            ht().hide(), n ? e._popCoverAndCleanNarrativeList(i) : e._popStoryAndClearList(r), showDoneBox($("stories_report_sent"), {
                                className: "stories_done_msg"
                            })
                        },
                        showProgress: Z.pbind(t),
                        hideProgress: tt.pbind(t)
                    })
                }, t.prototype.onLiveEnded = function(t) {
                    this.isActiveLive() && (this.data.items[this.index].can_share = !t, this.story.onLiveEnded(), this.updateBottom())
                }, t.prototype.updateLiveViewersCount = function(t) {
                    val(this.descEl, t)
                }, t
            }(),
            vt = "user_personal_card",
            ft = "group_personal_card",
            mt = r("Tn+0"),
            gt = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var wt = [];
        var bt = [];
        var St = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var r = [],
                        o = !0,
                        i = !1,
                        s = void 0;
                    try {
                        for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                    } catch (t) {
                        i = !0, s = t
                    } finally {
                        try {
                            !o && a.return && a.return()
                        } finally {
                            if (i) throw s
                        }
                    }
                    return r
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        var kt = function() {
                function t(e, r, o, i, s) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.queue = [], this.storiesToRead = [], this.storiesSkip = [];
                    try {
                        window.Videoview && Videoview.togglePlay(!1)
                    } catch (t) {}
                    this.initDOM(), this.show(), e = this.getBlockKey(e, o), this._init(e, r, o, i), addClass(this.layerEl, "shown"), this._source = s.source, this._initViewerSource(), this._sendOpeningEvents(), s.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = s.isOpenNarrativeFromFeed)
                }
                return t.prototype._sendOpeningEvents = function() {
                    if (this._source) {
                        var t = void 0;
                        switch (this._source) {
                            case "narrative_story":
                                t = "narrative_open_stories";
                                break;
                            case "narrative_snippet":
                            case "narrative_link":
                                t = "narrative_open";
                                break;
                            case "narrative_recommendations":
                                t = "narrative_other"
                        }
                        t && this._sendNavigationStatEvents(t)
                    }
                }, t.prototype._init = function(t, e, r, o) {
                    return this.blockKey = t, this.storyRaw = parseInt(t), this.parseExtra(o), this.list = e, this.storiesList = r, this.initStories()
                }, t.prototype._destroyStories = function() {
                    for (var t in this.renderedStories) {
                        if (this.renderedStories.hasOwnProperty(t)) this.renderedStories[t].story.destroy()
                    }
                }, t.prototype.destroy = function() {
                    delete this.activeStory, clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), removeEvent(this.volumeControl), delete this.volumeControl, delete this.renderedStories, removeEvent(this.layerEl), this._onVideoEnd();
                    try {
                        this.layerEl && bodyNode.removeChild(this.layerEl)
                    } catch (t) {}
                    delete cur.storyLayer
                }, t.prototype.getList = function() {
                    return "story" + this.activeStory.getRawId() + "/" + this.list
                }, t.prototype.getStoryRaw = function() {
                    return !!this.activeStory && this.activeStory.getRawId()
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
                    addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && k(), this._source && this._source.indexOf("narrative") > -1 && this._sendNavigationStatEvents("narrative_close"), !0 !== t && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(t), removeClass(this.layerEl, "shown"), this.activeStory && (this.activeStory.pauseStory(), this.activeStory._hideTooltip(), this.activeStory.isActiveLive() && this._sendNavigationStatEvents("live_player_close"))
                }, t.prototype.doHide = function(t) {
                    this._readStories(), this.destroy(), !t && (b.pop(), cur.storyLayer = b[b.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())), window.wkcur && window.wkcur.shown && WkView.restoreLayer({}), "group_stories" === this.list && Stories.groupStoriesBlockUpdate()
                }, t.prototype.back = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.hideAllLayers = !1;
                    var e = cancelStack[cancelStack.length - 1];
                    e && "stories_form_focus" === e.name && cancelStackPop(), this.hide(!1, t)
                }, t.prototype._renderStories = function() {
                    for (var t = this, e = [], r = 0; r < this.storiesList.length; r++) this.storiesList[r] && e.push(this.storiesList[r]);
                    var o = this._getScreenStoriesCount(),
                        i = this._getCurStoryPos(e.map(function(e) {
                            return t.getBlockKey(e)
                        })),
                        s = Math.floor(o / 2),
                        n = e.slice(Math.max(0, i - s)).slice(0, o),
                        a = n.map(function(e) {
                            return t.getBlockKey(e)
                        });
                    for (var c in this.renderedStories)
                        if (this.renderedStories.hasOwnProperty(c)) {
                            var l = this.renderedStories[c]; - 1 === a.indexOf(c) && (l.story.destroy(), delete this.renderedStories[c])
                        }
                    var d = void 0;
                    if (n.map(function(e, r) {
                            var o = t.getBlockKey(e);
                            if (!t.renderedStories[o]) {
                                var i = t.storiesBlocks.indexOf(o),
                                    n = e.author.id,
                                    a = new yt(e, {
                                        id: r,
                                        layer: t,
                                        onSelect: t._onSelectStory.bind(t),
                                        onStoriesEnd: t._onStoriesEnd.bind(t, i),
                                        onStoryRemoved: function(e, r) {
                                            return t._onStoryRemoved(n, i, e, r)
                                        },
                                        playPrevOwner: t._playPrevOwner.bind(t, i),
                                        onPlayStory: t._onPlayStory.bind(t, i),
                                        onVideoPlay: t._onVideoPlay.bind(t),
                                        onVideoEnd: t._onVideoEnd.bind(t),
                                        onStartStory: t._onStartStory.bind(t),
                                        removeList: function() {
                                            return Stories.removeList(t.list)
                                        }
                                    });
                                r <= s && t.stories.children[r] ? t.stories.insertBefore(a.render(), t.stories.children[r]) : t.stories.appendChild(a.render()), t.renderedStories[o] = {
                                    story: a,
                                    index: i
                                }, o === t.blockKey && (d = a)
                            }
                        }), !d) {
                        var h = n[0],
                            p = this.getBlockKey(h);
                        d = this.renderedStories[p].story
                    }
                    return {
                        activeStory: d
                    }
                }, t.prototype._getScreenStoriesCount = function() {
                    return 2 * Math.floor(window.innerWidth / (.563 * window.innerHeight)) + 1
                }, t.prototype._getCurStoryPos = function(t) {
                    return (t || this.storiesBlocks).indexOf(this.blockKey)
                }, t.prototype.getBlockKey = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    if (e.length) {
                        for (var r = 0; r < e.length; r++)
                            if (e[r].author.id === +t) return this.getBlockKey(e[r]);
                        return t
                    }
                    return t.hasOwnProperty("data") && (t = t.data), t.items && t.items.length && "live" === t.items[0].type ? t.author.id + "live" : t.narrative || t.is_narrative ? (t.author ? t.author.id : t.narrative.owner_id) + "narrative" + (t.items ? t.items[0].narrative.id : t.narrative.id) : "" + t.author.id
                }, t.prototype.initStories = function() {
                    var t = this;
                    return new Promise(function(e) {
                        t.storiesBlocks = t.storiesList.map(function(e) {
                            return t.getBlockKey(e)
                        });
                        var r = !1,
                            o = t.storiesBlocks.indexOf(t.blockKey);
                        if (o > -1) {
                            var i = t.storiesList[o];
                            t.getBlockKey(i) === t.blockKey && (r = i.items[i.items.length - 1].unread)
                        }
                        if (r && "replies" === t.list.substr(0, 7) && (r = !1), r) {
                            for (var s = [], n = 0; n < t.storiesList.length; n++) {
                                var a = t.storiesList[n],
                                    c = a.items[a.items.length - 1];
                                a.is_narrative && !c.isNarrativeMetaStory && a.items.push({
                                    type: "photo",
                                    raw_id: c.raw_id,
                                    narrative: c.narrative,
                                    isNarrativeMetaStory: !0
                                }), a.items[a.items.length - 1].unread && s.push(a)
                            }
                            s.length && (t.storiesList = s, t.storiesBlocks = t.storiesList.map(function(e) {
                                return t.getBlockKey(e)
                            }))
                        }
                        t.renderedStories = {};
                        var l = t._renderStories().activeStory;
                        t.scrollToStory(l, !0), 1 === t.storiesList.length && addClass(t.stories, "one_story"), t._startFirstStory(l, t.extra.story_id), addClass(t.stories, "inited"), e()
                    })
                }, t.prototype._startFirstStory = function(t, e) {
                    var r = this;
                    this.activeStory = t, this.blockKey = this.getBlockKey(t), addClass(t.getWrap(), "active"), this.scrollToStory(), t.indexToStoryById(e || this.storyRaw), this._startActiveStory(), setTimeout(function() {
                        addClass(r.stories, "animated"), r.inited = !0, "open" === r.extra.replies && r.activeStory.showFeedbackTooltip()
                    })
                }, t.prototype._markReadRestStories = function(t) {
                    this._markReadStoriesInRange(t, t.index, t.data.items.length), this._updateBadge(t)
                }, t.prototype._onSelectStory = function(t) {
                    var e = this,
                        r = void 0;
                    this.activeStory && (r = this.activeStory.getWrap(), this.activeStory.stop()), t.id - this.activeStory.id > 0 && this._markReadRestStories(this.activeStory), this.activeStory = t, t.indexToUnread(), t.isActiveLive() || t.fillTimeLine(), this.blockKey = this.getBlockKey(t), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(function() {
                        removeClass(r, "active"), addClass(t.getWrap(), "active"), e.scrollToStory(), e.timer = setTimeout(function() {
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
                        var r = nav.objLoc;
                        r.w = "story" + t.getRawId(), e.match(/^-?(\d+)_(\d+)$/) || (r.w += "/" + e), e.match(/^narrative-?\d+_\d+/) && (r.w = "narrative" + this.activeStory.getCurStoryData().narrative.raw_id), nav.setLoc(nav.toStr(r))
                    }
                }, t.prototype.scrollToStory = function(t, e) {
                    var r = this,
                        o = this._getScrollLeft(t);
                    e ? (removeClass(this.stories, "animated"), this._setScrollLeft(o)) : this.inited && addClass(this.stories, "animated"), setTimeout(function() {
                        r._setScrollLeft(o)
                    })
                }, t.prototype._setScrollLeft = function(t) {
                    setStyle(this.stories, "transform", "translateX(" + t + "px) translateZ(0)")
                }, t.prototype._getScrollLeft = function(t) {
                    return t = t || this.activeStory, window.innerWidth / 2 - t.getOffsetLeft()
                }, t.prototype._onStoriesEnd = function(t, e) {
                    for (var r = -1, o = t + 1; o < this.storiesList.length; o++) {
                        if (this.storiesList[o]) {
                            r = o;
                            break
                        }
                    }
                    r > -1 ? (e && this._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this._onSelectStory(this._getStoryInstanceByIndex(r))) : (e && this._sendNavigationStatEvents("close_auto_by_time"), cancelStackPop())
                }, t.prototype._playPrevOwner = function(t) {
                    for (var e = -1, r = t - 1; r >= 0; r--) {
                        if (this.storiesList[r]) {
                            e = r;
                            break
                        }
                    }
                    e > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(e)) : cancelStackPop()
                }, t.prototype._markReadStoriesInRange = function(t, e, r) {
                    for (var o = t.data.items, i = e; i < r; i++) {
                        var s = o[i];
                        s.unread && (s.unread = !1)
                    }
                }, t.prototype._markReadPrevStories = function(t) {
                    this._markReadStoriesInRange(t, 0, t.index)
                }, t.prototype._updateBadge = function(t) {
                    var e = ge("feed_story_" + this.getBlockKey(t)),
                        r = geByClass1("_stories_feed_item_replies", e);
                    if (hasClass(e, "story_feed_new_item") || "" !== val(r)) {
                        var o = t.data.items || [],
                            i = o[t.index] || {};
                        (i.answers || {}).new_count = 0, i.unread = !1;
                        var s = !0,
                            n = 0;
                        o.forEach(function(t) {
                            var e = t.answers || {};
                            n += e.new_count || 0, t.unread && (s = !1)
                        }), n > 0 ? val(r, n) : (val(r, ""), s && (removeClass(e, "story_feed_new_item"), removeClass(e, "story_feed_new_item_promo")))
                    }
                }, t.prototype._onPlayStory = function(t) {
                    var e = this._getStoryInstanceByIndex(t);
                    if (e) {
                        this.storiesReadHash = e.getReadHash();
                        var r = e.getRawId(),
                            o = e.getTrackCode();
                        o && (r += "_" + o), this.storiesToRead.push(r), this._markReadPrevStories(e), this.storiesToRead > 10 && this._readStories(), this._updateBadge(e)
                    }
                    var i = this._getStoryInstanceByIndex(t + 1);
                    i && i.preloadNextStory(i.getIndex())
                }, t.prototype._getStoryInstanceByIndex = function(t) {
                    var e = this.storiesList[t];
                    if (!e) return !1;
                    var r = this.getBlockKey(e);
                    return this.renderedStories[r].story
                }, t.prototype._onStoryRemoved = function(t, e, r, o) {
                    for (var i = 0; i < this.storiesList.length; i++) this.storiesList[i] && this.storiesList[i].author.id === t && (this.storiesList[i] = !1);
                    !r && this._onStoriesEnd(e), Stories.updateFeedStories(null, {
                        cb: o
                    })
                }, t.prototype.onVisibilityChange = function() {
                    "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
                }, t.prototype.onResize = function() {
                    var t = cur.storyLayer.activeStory;
                    t && cur.storyLayer.scrollToStory(t, !0)
                }, t.prototype.pauseStory = function(t) {
                    this.activeStory && this.activeStory.pauseStory(t)
                }, t.prototype.playStory = function() {
                    this.activeStory && this.activeStory.autoResumeStory()
                }, t.prototype._onLayerClick = function(t) {
                    var e = hasClass(t.target, "stories_layer_close");
                    (hasClass(t.target, "stories_layer_cont") || e) && (e ? this.isCloseBtnClick = !0 : this.storiesBlocks.length - 1 === this._getCurStoryPos() && (this._markReadRestStories(this.activeStory), this._markStoryAsSkipped()), cancelStackPop())
                }, t.prototype._checkKeyEvents = function(t) {
                    return !(attr(t.target, "contenteditable") || inArray(t.target.tagName, ["INPUT", "TEXTAREA"]) || curBox())
                }, t.prototype.onKeyDown = function(t) {
                    if (cur.storiesKeyDown) cur.storyLayer && cur.storyLayer._checkKeyEvents(t) && cancelEvent(t);
                    else {
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
                    }
                }, t.prototype.onKeyUp = function(t) {
                    cur.storiesKeyDown = !1, cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(t) && t.keyCode === KEY.SPACE && (cancelEvent(t), vkNow() - cur.storiesKeyDownTs > 200 ? cur.storyLayer.playStory() : cur.storyLayer.nextStory())
                }, t.prototype.nextStory = function() {
                    this.activeStory && this.activeStory.nextStory()
                }, t.prototype.prevStory = function() {
                    this.activeStory && this.activeStory.prevStory()
                }, t.prototype.changeStory = function(t) {
                    this.activeStory && this.activeStory.changeStory(t)
                }, t.prototype._readStories = function() {
                    if (this.storiesToRead.length || bt.length || wt.length) {
                        var t, e, r = this._getSource(),
                            o = this.storiesToRead.join(","),
                            i = this.storiesSkip.join(",");
                        this.storiesToRead = [], ajax.post("al_stories.php", {
                            act: "read_stories",
                            stories: o,
                            source: r,
                            stories_skip: i,
                            navigation_stats: (e = wt.map(function(t) {
                                return [t.ownerId, t.storyId, t.source, t.action].join(",")
                            }).join(";"), wt = [], e),
                            loading_stats: (t = bt.map(function(t) {
                                return [t.ownerId, t.storyId, t.source, t.time].join(",")
                            }).join(";"), bt = [], t),
                            connection_type: function() {
                                var t = navigator.connection;
                                if (!t) return "";
                                var e = t.effectiveType,
                                    r = t.downlink;
                                switch (e) {
                                    case "slow-2g":
                                        return "GPRS";
                                    case "2g":
                                        return "EDGE";
                                    case "3g":
                                        return "3G";
                                    case "4g":
                                        return r > 8 ? "wi-fi" : "LTE"
                                }
                                return ""
                            }(),
                            hash: this.storiesReadHash
                        })
                    }
                }, t.prototype._getSource = function() {
                    if (this._source) return this._source;
                    var t = this.list;
                    return -1 !== [vt, ft, q, mt.b].indexOf(cur.module) && (t = cur.module), 0 === t.indexOf("replies") && (t = "reply"), t
                }, t.prototype._sendNavigationStatEvents = function(t) {
                    var e = this.getStoryRaw() || this.activeStory.getCurStoryData().raw_id;
                    e && (this._updateLastStoryOpenAction(t), function(t) {
                        var e = t.storyRawId,
                            r = t.source,
                            o = t.action,
                            i = e.split("_"),
                            s = gt(i, 2),
                            n = s[0],
                            a = s[1];
                        "reply" === r && (r = "replies_list");
                        var c = {
                            ownerId: n,
                            storyId: a,
                            source: r,
                            action: o
                        };
                        wt.push(c)
                    }({
                        storyRawId: e,
                        source: this._getSource(),
                        action: t
                    }))
                }, t.prototype._updateLastStoryOpenAction = function(t) {
                    switch (t) {
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
                }, t.prototype._initViewerSource = function() {
                    var t = this._getSource();
                    switch (t) {
                        case "reply":
                            this.viewerSource = "replies_list";
                            break;
                        case "feed":
                            this.viewerSource = cur.section;
                            break;
                        default:
                            this.viewerSource = t
                    }
                }, t.prototype._sendViewerStartTime = function(t, e) {
                    ! function(t) {
                        var e = t.storyRawId,
                            r = t.source,
                            o = t.time,
                            i = e.split("_"),
                            s = gt(i, 2),
                            n = {
                                ownerId: s[0],
                                storyId: s[1],
                                source: r,
                                time: o
                            };
                        bt.push(n)
                    }({
                        storyRawId: t,
                        source: this.viewerSource,
                        time: e
                    })
                }, t.prototype._onVideoPlay = function() {
                    getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
                }, t.prototype._onVideoEnd = function() {
                    this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
                }, t.prototype._renderBackButton = function() {
                    return this.backButton = se('<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">' + getLang("global_back") + "</div>\n  </div>\n</div>"), addEvent(this.backButton, "click", function() {
                        cancelStackPop()
                    }), this.backButton
                }, t.prototype.showBackButton = function() {
                    show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
                }, t.prototype.parseExtra = function(t) {
                    var e = {},
                        r = String(t).split(";");
                    for (var o in r)
                        if (r.hasOwnProperty(o)) {
                            var i = r[o].split("="),
                                s = St(i, 2),
                                n = s[0],
                                a = s[1];
                            e[n] = a
                        }
                    this.extra = e
                }, t.prototype.getAnimateFromElem = function() {
                    if (!this.hideAllLayers) {
                        var t = this.getBlockKey(this.activeStory);
                        if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                            var e = domQuery("#feed_story_" + t, domPN(this.animateFromEl))[0];
                            if (e) return e
                        } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                            var r = ge("feed_story_" + t);
                            if (r) return Stories.feedScrollToOwner(t), r
                        }
                    }
                    return this.animateFromEl
                }, t.prototype.animateStory = function(t, e) {
                    var r = this;
                    return new Promise(function(o) {
                        if ("expand" === t && !e || "minimize" === t && !r.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), o();
                        r.pauseStory(), addClass(r.layerEl, "animation"), removeClass(r.stories, "animated");
                        var i = "expand" === t ? e : r.getAnimateFromElem();
                        if (r.hideAllLayers && "minimize" === t) {
                            var s = b[0];
                            i = s.getAnimateFromElem(),
                                function() {
                                    for (var t = b.length - 2; t >= 0; t--) b[t].doHide(!0);
                                    b.splice(0, b.length - 1)
                                }(), k()
                        }
                        removeClass(i, "stories_feed_item_ava_animate");
                        var n = getXY(i),
                            a = St(n, 2),
                            c = a[0],
                            l = a[1],
                            d = getSize(i),
                            h = window.innerHeight,
                            p = Math.min(540, Math.max(320, .563 * h)),
                            u = 1.78 * p,
                            _ = Math.max(0, (h - u) / 2),
                            y = Math.max(0, (window.innerWidth - p) / 2);
                        c = y - c + p / 2 - d[0] / 2 + scrollGetX(), l = _ - l + u / 2 - d[1] / 2 + scrollGetY(), c = -c, l = -l;
                        var v = {};
                        "expand" === t && (v.transform = "translate(" + c + "px, " + l + "px) scale(0)", r.animateFromEl = e), setStyle(r.activeStory.wrapEl, v), "minimize" === t && setStyle(i, "transform", "scale(0)"), r.animationTimer = setTimeout(function() {
                            addClass(r.stories, "animated"), addClass(i, "stories_feed_item_ava_animate"), r.animationTimer = setTimeout(function() {
                                "expand" === t ? (setStyle("stories_layers_background", "opacity", 1), setStyle(r.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(r.activeStory.wrapEl, "transform", "translate(" + c + "px, " + l + "px) scale(0.01)"), setStyle(i, "transform", "scale(1)")), r.animationTimer = setTimeout(function() {
                                    o(), "expand" === t ? (setStyle(r.activeStory.wrapEl, "transform", ""), removeClass(r.layerEl, "animation"), removeClass(r.stories, "animated"), r.playStory(), b.length > 1 && (b[b.length - 2].setLayerVisibility(!1), b[b.length - 1].showBackButton())) : (removeClass(i, "stories_feed_item_ava_animate"), setStyle(i, "transform", ""))
                                }, 330)
                            }, 30)
                        }, 30)
                    })
                }, t.prototype.pauseLayer = function() {
                    this.pauseStory(), addClass(this.layerEl, "paused")
                }, t.prototype.resumeLayer = function() {
                    this._updateVolumeButton(), this.activeStory.volumeUpdate(), this.activeStory && !this.activeStory.story.isNarrativeMetaStory && (this.playStory(), removeClass(this.layerEl, "paused"), this.activeStory.feedbackScroll && this.activeStory.feedbackScroll.update())
                }, t.prototype.setLayerVisibility = function(t) {
                    toggle(this.layerEl, t)
                }, t.prototype._renderVolumeControl = function() {
                    return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControlContainer = ce("div", {
                        className: "stories_volume_control_container"
                    }), this.volumeControlContainer.appendChild(this.volumeControl), this.volumeControlContainer
                }, t.prototype._volumeControlOnMouseDown = function(t) {
                    var e = this;
                    addClass(this.volumeControlContainer, "changing");
                    var r = geByClass1("stories_volume_control_slide", this.volumeControl),
                        o = geByClass1("stories_volume_control_slide_indicator", r),
                        i = getXY(r),
                        s = St(i, 1)[0],
                        n = getSize(r),
                        a = St(n, 1)[0],
                        c = function(t) {
                            var r = Math.max(0, Math.min(t.pageX - s, a)) / a * 100;
                            setStyle(o, "width", r + "%"), g(r / 100), e.activeStory.volumeUpdate()
                        };
                    addEvent(window, "mousemove", c), addEvent(window, "mouseup", function t() {
                        removeEvent(window, "mousemove", c), removeEvent(window, "mouseup", t), e._updateVolumeButton(), removeClass(e.volumeControlContainer, "changing")
                    }), c(t)
                }, t.prototype._updateVolumeButton = function() {
                    var t = 100 * m();
                    toggleClass(this.volumeControl, "low", t > 0 && t < 50), toggleClass(this.volumeControl, "high", t >= 50);
                    var e = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                    setStyle(e, "width", t + "%")
                }, t.prototype._volumeControlOnClick = function(t) {
                    if (!hasClass(t.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                        var e = m();
                        g(e = e ? 0 : 1), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                    }
                }, t.prototype.onReplyDeleted = function(t) {
                    this.activeStory && this.activeStory.onReplyDeleted(t)
                }, t.prototype._markStoryAsSkipped = function() {
                    this.storiesSkip.push(this.getStoryRaw())
                }, t
            }(),
            Et = r("zxIV"),
            Lt = r("4+be"),
            Ct = r("t7n3"),
            Tt = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            xt = s.Promise,
            Bt = {
                show: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (t.match(/story/) && (t = this._parseList(t)), cur.storyLayer && cur.storyLayer.list === t.split("/")[1]) return !1;
                    this.getList(t).then(function(t) {
                        var r = t.blockKey,
                            o = t.list,
                            i = t.items,
                            s = t.extra;
                        S(new kt(r, o, i, s, e), e)
                    }).catch(function(t) {
                        vk.dev && debugLog(t), showFastBox(Object(Lt.d)("global_error"), Object(Lt.d)("global_unknown_error"))
                    })
                },
                _getUnreadStory: function(t, e) {
                    t = intval(t);
                    for (var r = !1, o = 0; o < e.length; o++)
                        if (e[o].author.id === t) {
                            for (var i = e[o].items, s = 0; s < i.length; s++)
                                if (i[s].unread) {
                                    r = i[s];
                                    break
                                }
                            r || (r = i[0]);
                            break
                        }
                    return r
                },
                getList: function(t, e) {
                    return new xt(function(r, o) {
                        var i = t.split("/"),
                            s = Tt(i, 3),
                            n = s[0],
                            a = s[1],
                            c = s[2],
                            l = {
                                blockKey: n,
                                list: a,
                                extra: c
                            },
                            d = Bt._getList(a);
                        isArray(d) ? (l.items = d, r(l)) : ajax.post("al_stories.php", {
                            act: "get_list",
                            list: a,
                            story_raw: n,
                            extra: c,
                            from_manage: window.cur.module === q ? 1 : 0
                        }, {
                            loader: !e,
                            onDone: function(t) {
                                cur["stories_list_" + a] = t.list, l.items = t.list, t.recommendations && (cur["stories_list_" + a + "_recommendations"] = t.recommendations), r(l)
                            },
                            onFail: function() {
                                return o(), !0
                            }
                        })
                    })
                },
                _getList: function(t) {
                    return cur["stories_list_" + t]
                },
                _setList: function(t, e) {
                    cur["stories_list_" + t] = e
                },
                removeList: function(t) {
                    delete cur["stories_list_" + t]
                },
                _parseList: function(t) {
                    var e = (t = decodeURIComponent(t)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\=\;\-]+))?$/i),
                        r = Tt(e, 7),
                        o = r[1],
                        i = r[2],
                        s = r[4],
                        n = r[6],
                        a = o + "_" + i;
                    return t.match(/from_feed\=1/) ? s = "feed" : t.match(/profile\=1/) ? s = "profile" : s || (s = a), a + "/" + s + "/" + n
                },
                initFeed: function() {
                    var t = Object(Et.F)("stories_feed_items_container");

                    function e() {
                        addEvent(t, browserFeatures.wheelEvent, Bt.feedMouseWheel)
                    }

                    function r() {
                        removeEvent(t, browserFeatures.wheelEvent, Bt.feedMouseWheel)
                    }
                    Bt.updateFeedArrows(), addEvent(t, "mouseenter", e), addEvent(t, "mouseleave", r), cur.destroy.push(function() {
                        removeEvent(t, browserFeatures.wheelEvent, Bt.feedMouseWheel), removeEvent(t, "mouseenter", e), removeEvent(t, "mouseleave", r)
                    })
                },
                feedNext: function() {
                    return this.feedPaging("next")
                },
                feedPrev: function() {
                    return this.feedPaging("prev")
                },
                feedPaging: function(t, e) {
                    var r = Object(Et.H)("stories_feed_wrap"),
                        o = Object(Et.F)("stories_feed_items"),
                        i = getSize(r)[0],
                        s = cur.storiesPos || 0;
                    if (isNumeric(t)) s += t;
                    else {
                        var n = i - 100;
                        "next" === t ? s += n : s -= n
                    }
                    cur.storiesPos = Math.max(0, Math.min(s, o.scrollWidth - i)), e ? Object(Et.hb)(o, "animated") : Object(Et.a)(o, "animated"), setStyle(o, "transform", "translateX(-" + cur.storiesPos + "px)"), Bt.updateFeedArrows()
                },
                feedScrollToOwner: function(t) {
                    var e = Object(Et.F)("stories_feed_items").offsetWidth,
                        r = Object(Et.F)("feed_story_" + t);
                    if (r) {
                        var o = r.offsetWidth,
                            i = r.offsetLeft;
                        cur.storiesPos = i - e + e / 2 + o / 2, Bt.feedPaging(0, !0)
                    }
                },
                updateFeedStories: function(t, e) {
                    var r = this;
                    if (t = t || "news", Object(Et.F)("stories_feed_items"))
                        if (inArray(t, ["news", "search"])) {
                            var o = function(t, o) {
                                e && e.cb && e.cb(), r._setList("feed", o);
                                var i = Object(Et.F)("stories_feed_items");
                                i && (t && (setStyle(i, "transform", "translateX(0px)"), Object(Et.yb)(i, t), i.children.length < 6 ? Object(Et.a)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(Et.hb)("stories_feed_wrap", "stories_feed_not_nav_buttons")), cur.storiesPos = 0, Bt.updateFeedArrows(), show("stories_feed_wrap"))
                            };
                            if (e && e.stories) {
                                var i = e.section,
                                    s = e.q,
                                    n = e.stories,
                                    a = n.html,
                                    c = n.js;
                                return "search" !== i || s && c.length ? void o(a, c) : void hide("stories_feed_wrap")
                            }
                            ajax.post("al_stories.php", {
                                act: "feed_stories"
                            }, {
                                onDone: o
                            })
                        } else hide("stories_feed_wrap")
                },
                feedMouseWheel: function(t) {
                    if (!hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) {
                        cancelEvent(t);
                        var e = Math.abs(t.deltaY) > Math.abs(t.deltaX) ? t.deltaY : t.deltaX;
                        Bt.feedPaging(e, 1)
                    }
                },
                updateFeedArrows: function() {
                    var t = Object(Et.F)("stories_feed_items");
                    if (t) {
                        cur.storiesPos || (cur.storiesPos = 0);
                        var e = Object(Et.H)("stories_feed_wrap").offsetWidth,
                            r = t.scrollWidth - e;
                        0 === cur.storiesPos ? Object(Et.a)("stories_feed_arrow_left", "disabled") : Object(Et.hb)("stories_feed_arrow_left", "disabled"), cur.storiesPos === r || r <= 0 ? Object(Et.a)("stories_feed_arrow_right", "disabled") : Object(Et.hb)("stories_feed_arrow_right", "disabled")
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
                    var r = intval(attr(t, "data-id"));
                    cur.storiesBlackListShown[r] ? (delete cur.storiesBlackListShown[r], Object(Et.hb)(t, "olist_item_wrap_on")) : (cur.storiesBlackListShown[r] = 1, Object(Et.a)(t, "olist_item_wrap_on"))
                },
                saveBlackList: function(t) {
                    var e = Object.keys(cur.storiesBlackListShown);
                    0 !== e.length ? ajax.post("al_stories.php", {
                        act: "save_blacklist",
                        hash: cur.storiesBlackList.hash,
                        list: e.join(",")
                    }, {
                        onDone: function() {
                            curBox().hide(), Bt.updateFeedStories()
                        },
                        showProgress: lockButton.pbind(t),
                        hideProgress: unlockButton.pbind(t)
                    }) : curBox().hide()
                },
                blacklistUpdateUsers: function(t) {
                    var e = t;
                    if (t = trim(t).toLowerCase(), cur.storiesBlacklistLastQ !== t) {
                        cur.storiesBlacklistLastQ = t;
                        var r = t ? cur.storiesIndexer.search(t) : cur.storiesBlackList.users,
                            o = [];
                        if (t)
                            for (var i = 0; i < t.length; i++) o.push(t.substr(i, 1));
                        for (var s = new RegExp(o.join(".*?"), "i"), n = "", a = 0; a < r.length; a++) {
                            var c = r[a],
                                l = t ? c.name.replace(s, function(t) {
                                    return "<em>" + t + "</em>"
                                }) : c.name;
                            n += cur.storiesBlackList.tpl.replace(/\{id\}/g, c.id).replace("{photo}", c.photo).replace("{name}", l).replace("{href}", c.href).replace("{class_name}", cur.storiesBlackListShown[c.id] ? " olist_item_wrap_on" : "")
                        }
                        n || (n = '<div class="no_rows">' + Object(Lt.d)("global_search_not_found").replace("{search}", clean(e)) + "</div>"), Object(Et.yb)(Object(Et.H)("olist", "stories_black_list_result"), n)
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
                        Bt.blacklistUpdateUsers("")
                    }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(Object(Lt.d)("global_save"), Bt.saveBlackList).addButton(Object(Lt.d)("global_cancel"), void 0, "no")) : curBox().addButton(Object(Lt.d)("global_close"))
                },
                preloadUrl: function(t) {
                    _(t)
                },
                showNextRepliesChunk: function(t) {
                    var e = gpeByClass("stories_feedback_replies_items", t);
                    Object(Et.hb)(Object(Et.H)("stories_replies_chunk_hidden", e), "stories_replies_chunk_hidden");
                    var r = Object(Et.H)("stories_replies_chunk_hidden", e);
                    r ? Object(Et.yb)(t, langNumeric(Object(Lt.d)("stories_replies_more_button", intval(attr(r, "data-size"))))) : re(t), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
                },
                groupStoriesBlockUpdate: function() {
                    var t = Bt._getList("group_stories"),
                        e = t && t[0] && t[0].items;
                    if (e) {
                        for (var r = 0, o = 0; o < e.length; o++) {
                            e[o].unread && r++
                        }
                        var i = Object(Et.H)("stories_groups_block_stories_wrap"),
                            s = Object(Et.H)("stories_groups_block_stories_button", i);
                        Object(Et.vb)(i, "has_unread", r > 0), Object(Et.vb)(i, "has_stories", e.length > 0), Object(Et.vb)(s, "has_stories", e.length > 0);
                        var n = Object(Ct.d)(cur.storiesPreviews),
                            a = n.splice(n.length - r, 3);
                        a.length < 3 && (a = a.concat(n.slice(0, 3 - a.length))), a.reverse();
                        for (var c = "", l = a.length - 1; l >= 0; l--) c += cur.storiesPreviewsRowHtml.replace("{url}", a[l]);
                        Object(Et.yb)(Object(Et.H)("stories_groups_block_stories_rows", i), c)
                    }
                },
                isLiveShown: function(t) {
                    return !!(cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.isActiveLive()) && cur.storyLayer.activeStory.story.videoRaw === t
                },
                activeLiveEnded: function(t) {
                    cur.storyLayer.activeStory.onLiveEnded(t)
                },
                updateLiveViewersCount: function(t) {
                    var e = t ? Object(Lt.d)("stories_live_N_watching", t, !0) : "";
                    cur.storyLayer.activeStory.updateLiveViewersCount(e)
                }
            };
        window.Stories = Bt;
        try {
            stManager.done("stories.js")
        } catch (t) {}
    },
    "T/g7": function(t, e, r) {
        "use strict";
        r.d(e, "b", function() {
            return a
        });
        var o = r("nAFc"),
            i = {},
            s = window.getLang,
            n = window.langNumeric;

        function a(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                r = arguments[2],
                a = "number" == typeof e,
                c = t + (e || a ? ".raw" : "");
            if (void 0 === i[c]) {
                var l = e || a ? s(t, "raw") : s(t);
                "string" == typeof l ? i[c] = Object(o.a)(l) : Array.isArray(l) && (i[c] = l.map(o.a))
            }
            return a ? n(e, i[c], r) : i[c] || ""
        }
        e.a = {
            getLang: a
        }
    },
    "Tn+0": function(t, e, r) {
        "use strict";
        r.d(e, "b", function() {
            return o
        }), r.d(e, "c", function() {
            return i
        }), r.d(e, "a", function() {
            return s
        }), r.d(e, "e", function() {
            return n
        }), r.d(e, "d", function() {
            return a
        });
        var o = "sf",
            i = "sf_report",
            s = 1e3;

        function n(t) {
            return gpeByClass(i, t).id.replace("report", "")
        }

        function a(t) {
            var e = gpeByClass(i, t),
                r = geByClass1("decision_result", e);
            return domData(r, "decision_raw_id")
        }
    },
    WbBG: function(t, e, r) {
        "use strict";
        t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    nAFc: function(t, e, r) {
        "use strict";
        r.d(e, "c", function() {
            return n
        }), r.d(e, "a", function() {
            return a
        }), r.d(e, "b", function() {
            return c
        }), r.d(e, "d", function() {
            return l
        });
        var o = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = window.Emoji,
            s = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function n(t) {
            return s.reduce(function(t, e) {
                var r = o(e, 2),
                    i = r[0],
                    s = r[1];
                return t.replace(new RegExp(s, "ig"), i)
            }, t)
        }

        function a(t) {
            return s.reduce(function(t, e) {
                var r = o(e, 2),
                    i = r[0],
                    s = r[1];
                return t.replace(new RegExp(i, "ig"), s)
            }, t).replace(/&#(\d+);/g, function(t, e) {
                return String.fromCodePoint(e)
            })
        }

        function c(t) {
            return n(t).replace(/[\u00A0-\u9999<>\&]/gim, function(t) {
                return "&#" + t.charCodeAt(0) + ";"
            })
        }

        function l(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = e.lineBreak,
                o = void 0 !== r && r,
                s = e.convertEmoji,
                c = void 0 === s || s,
                l = a(t);
            return l = l.replace(/\n\r/gi, "\n"), "oneline" === o ? l = l.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === o && (l = l.replace(/\n/gi, "<br>")), l = n(l), c && (l = i.emojiToHTML(l, !0)), l
        }
    }
});