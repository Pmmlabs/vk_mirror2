! function(t) {
    function e(e) {
        for (var o, n, a = e[0], d = e[1], l = e[2], h = 0, p = []; h < a.length; h++) n = a[h], i[n] && p.push(i[n][0]), i[n] = 0;
        for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (t[o] = d[o]);
        for (c && c(e); p.length;) p.shift()();
        return s.push.apply(s, l || []), r()
    }

    function r() {
        for (var t, e = 0; e < s.length; e++) {
            for (var r = s[e], o = !0, a = 1; a < r.length; a++) {
                var d = r[a];
                0 !== i[d] && (o = !1)
            }
            o && (s.splice(e--, 1), t = n(n.s = r[0]))
        }
        return t
    }
    var o = {},
        i = {
            "web/pretty_cards": 0
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
        d = a.push.bind(a);
    a.push = e, a = a.slice();
    for (var l = 0; l < a.length; l++) e(a[l]);
    var c = d;
    s.push([123, "common"]), r()
}({
    123: function(t, e, r) {
        t.exports = r("qf0/")
    },
    "qf0/": function(t, e, r) {
        "use strict";
        r.r(e);
        var o = r("zxIV");
        window.PrettyCardGallery = function() {
            function t(e, r, i) {
                if (function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), !e.prettyCardsInitialized) {
                    if (e.prettyCardsInitialized = !0, e.removeAttribute("onmouseenter"), this.VIEWPORT_CARDS = 2, this.CARD_WIDTH = 200, this.CARDS_MARGIN = 12, this.CONTENT_PADDING = 13, this.POST_PADDING = 20, this.POST_PADDING_TOP = 15, this.TRANSFORM_ANIMATION_DURATION = 300, this.TRANSFORM_ANIMATION_DURATION_LONG = 600, this.TRANSFORM_ANIMATION_DELAY = 100, this.el = e, this.scrollerLeft = Object(o.H)("pretty-cards__scroller_position_left", e), this.scrollerRight = Object(o.H)("pretty-cards__scroller_position_right", e), this.scrollerProtector = Object(o.H)("pretty-cards__scroller_type_protector", e), this.wrapper = Object(o.H)("pretty-cards__wrapper", e), this.wrapperOuter = Object(o.H)("pretty-cards__wrapper-outer", e), this.scrollPosition = 0, this.cardsElements = geByClass("pretty-card", e), this.buttonEditorDropdown = Object(o.H)("pretty-card__button-dropdown", e), this.container = Object(o.H)("pretty-cards__container", e), this.newCardsId = -1, this.lastChosenUrl = "", this.options = extend({}, r || {}), this.options.editing && this.addPlaceholder(), i) {
                        var s = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var d, l = Object.keys(i)[Symbol.iterator](); !(s = (d = l.next()).done); s = !0) {
                                var c = d.value;
                                this.addCard(i[c]), i[c].link && (this.lastChosenUrl = i[c].link)
                            }
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                    }
                    this.initEvents(), this.scroll(0, !1), this.options.editing && this.updateSendDataHash()
                }
            }
            return t.prototype.initEvents = function() {
                if (this.scrollerLeft && (addEvent(this.scrollerLeft, "click", this.scroll.bind(this, -1, !1)), addEvent(this.scrollerLeft, "mouseenter", this.onScrollerMouseEnter.bind(this, -1)), addEvent(this.scrollerLeft, "mouseleave", this.onScrollerMouseLeave.bind(this, -1))), this.scrollerRight && (addEvent(this.scrollerRight, "click", this.scroll.bind(this, 1, !1)), addEvent(this.scrollerRight, "mouseenter", this.onScrollerMouseEnter.bind(this, 1)), addEvent(this.scrollerRight, "mouseleave", this.onScrollerMouseLeave.bind(this, 1))), addEvent(this.scrollerProtector, "mouseout", hide.pbind(this.scrollerProtector)), addEvent(this.container, "mousemove", this.onDraggingMouseMove.bind(this)), addEvent(this.buttonEditorDropdown, "mouseover", Page.actionsDropdownUnhide), addEvent(this.buttonEditorDropdown, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown)), this.scrollerLeft && this.scrollerRight) {
                    var t = function() {
                        this.lastWinOnScroll = vkNow()
                    }.bind(this);
                    addEvent(window, "scroll", t), addEvent(this.container, browserFeatures.wheelEvent, this.onContainerWheel.bind(this)), cur.destroy.push(function() {
                        removeEvent(window, "scroll", t)
                    })
                }
            }, t.prototype.onContainerWheel = function(t) {
                if (!(vkNow() - this.lastWinOnScroll < 300)) {
                    cancelEvent(t);
                    var e = this.cardsElements.length * this.CARD_WIDTH + Math.max(0, this.cardsElements.length - 1) * this.CARDS_MARGIN,
                        r = Math.abs(t.deltaY) > Math.abs(t.deltaX) ? t.deltaY : t.deltaX,
                        i = this.cardsPos || 0;
                    isNumeric(r) && (i += r), this.cardsPos = Math.max(0, Math.min(i, e - this.wrapper.clientWidth)), Object(o.a)(this.wrapper, "pretty-cards__wrapper_transition_off"), setStyle(this.wrapper, "transform", "translateX(-" + this.cardsPos + "px)"), this.scrollPosition += Math.round(this.cardsPos / (this.CARD_WIDTH - this.CARDS_MARGIN)) - this.scrollPosition, this.scrollPosition = Math.max(0, this.scrollPosition), this.scrollPosition = Math.max(0, Math.min(this.cardsElements.length - this.VIEWPORT_CARDS, this.scrollPosition));
                    var s = e - this.wrapper.clientWidth - this.cardsPos - this.POST_PADDING,
                        n = this.cardsPos - this.POST_PADDING;
                    toggleClass(this.scrollerRight, "pretty-cards__scroller_hidden_right", s < 0), toggleClass(this.scrollerLeft, "pretty-cards__scroller_hidden_left", n < 0), Object(o.a)(this.scrollerProtector, "pretty-cards__scroller_position_right", 0), show(this.scrollerProtector)
                }
            }, t.prototype.onScrollerMouseEnter = function(t) {
                this.draggingCard && (this.blockDraggingSwitch = !0, this.wrapperTransitions(!0, this.draggingCard), this.scroll(t, !0), setTimeout(this.wrapperTransitions.bind(this, !1, this.draggingCard), this.TRANSFORM_ANIMATION_DURATION_LONG))
            }, t.prototype.onScrollerMouseLeave = function(t) {
                this.draggingCard && (this.blockDraggingSwitch = !1)
            }, t.prototype.onDraggingMouseMove = function(t) {
                if (this.draggingCard && !this.blockDragging) {
                    var e = t.clientX - this.draggingStartingX + (this.translateX - this.draggingStartingTranslateX);
                    if (setStyle(this.draggingCard, {
                            transform: "translateY(10px) scale(1.05) translateX(" + e + "px)"
                        }), !this.blockDraggingSwitch) {
                        var r = t.clientX - this.draggingContainerX + this.translateX + (this.CARD_WIDTH / 2 - this.cardDraggingPointX),
                            i = (this.cardsElements.length, this.CARD_WIDTH, this.cardsElements.length, this.CARDS_MARGIN, (r - this.CARD_WIDTH / 2) / (this.CARD_WIDTH + this.CARDS_MARGIN)),
                            s = this.lastDestinationCardIndex;
                        if (i < s - 1) s -= 1;
                        else if (i > s + 1) {
                            this.placeholderElement && s + 1 === this.cardsElements.length - 1 || (s += 1)
                        }
                        if (s !== this.lastDestinationCardIndex) {
                            var n = this.cardsElements.indexOf(this.draggingCard);
                            s > this.lastDestinationCardIndex ? s > n ? (this.wrapperTransitions(!0, this.cardsElements[s]), Object(o.a)(this.cardsElements[s], "pretty-card_dragging_left")) : s <= n && Object(o.hb)(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_right") : s < this.lastDestinationCardIndex && (s >= n ? Object(o.hb)(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_left") : s < n && (this.wrapperTransitions(!0, this.cardsElements[s]), Object(o.a)(this.cardsElements[s], "pretty-card_dragging_right"))), this.lastDestinationCardIndex = s
                        }
                    }
                }
            }, t.prototype.addPlaceholder = function() {
                if (this.options.placeholder_html) {
                    var t = se(this.options.placeholder_html);
                    this.wrapper.appendChild(t), this.cardsElements.push(t), this.placeholderElement = t, addEvent(t, "click", this.onPlaceholderClicked.bind(this))
                }
            }, t.prototype.onUrlChosen = function(t, e, r) {
                var i = this,
                    s = t.btns.ok[0],
                    n = Object(o.H)("share_url_input", t.bodyNode),
                    a = val(n);
                lockButton(s), disable(n, !0), hide("share_url_error"), ajax.post("al_wall.php", {
                    act: "a_pretty_cards_check_url",
                    url: a,
                    owner_id: e
                }, {
                    onDone: function(e, o, s) {
                        i.lastChosenUrl = o, t.hide(), r(o, e, s)
                    },
                    onFail: function(t) {
                        var e = "";
                        return t && t !== getLang("global_unknown_error") && (e = t + " "), Object(o.F)("share_url_error").innerHTML = e + getLang("global_share_link_failed"), disable(n, !1), unlockButton(s), show("share_url_error"), elfocus(n), !0
                    }
                })
            }, t.prototype.chooseUrl = function(t, e, r) {
                var i = this;
                window.onShareChooseUrlBoxInit = function() {
                    var e = curBox(),
                        s = Object(o.H)("share_url_input", e.bodyNode);
                    addEvent(s, "keydown", function(o) {
                        if (o.which === KEY.ENTER) return i.onUrlChosen(e, r, t), !1
                    })
                };
                var s = showBox("share.php", {
                    act: "choose_url_box",
                    default_url: e
                }, {
                    dark: 1
                });
                s.removeButtons(), s.addButton(getLang("global_continue"), this.onUrlChosen.bind(this, s, r, t))
            }, t.prototype.onPlaceholderClicked = function() {
                var t = this;
                this.chooseUrl(function(e, r, o) {
                    t.addCard({
                        link: e,
                        link_decoded: o,
                        allowed_buttons: r
                    })
                }, this.lastChosenUrl, this.options.owner_id)
            }, t.prototype.wrapperTransitions = function(t, e, r) {
                e && (t ? Object(o.a)(e, !0 === r ? "pretty-card_transitions_long" : "pretty-card_transitions_on") : (Object(o.hb)(e, "pretty-card_transitions_long"), Object(o.hb)(e, "pretty-card_transitions_on")))
            }, t.prototype.addCard = function(t) {
                var e = this;
                if (this.options.card_template_html && (!(this.cardsElements.length >= intval(this.options.cards_max)) || this.placeholderElement)) {
                    var r = this.cardsElements.length === intval(this.options.cards_max),
                        i = se(this.options.card_template_html);
                    if (t) {
                        if (t.id && t.owner_id ? i.prettyCardId = t.owner_id + "_" + t.id : i.prettyCardId = this.newCardsId--, t.link && this.setLink(i, t.link, t.link_decoded), t.title && val(Object(o.H)("pretty-card__title", i), t.title), void 0 !== t.price && t.price != this.options.price_unshown) {
                            var s = Object(o.H)("pretty-card__price_actual", i),
                                n = domPS(domPN(s));
                            val(s, t.price), this.priceInputChanged(s), this.togglePrice(n, !0)
                        }
                        if (void 0 !== t.price_old && t.price_old != this.options.price_unshown) {
                            var a = Object(o.H)("pretty-card__price_old", i),
                                d = domPS(domPN(a));
                            val(a, t.price_old), this.priceInputChanged(a), this.togglePrice(d, !0)
                        }
                        t.photo_url && this.setPhoto(i, t.photo_url), t.photo && (i.prettyCardPhoto = t.photo), t.allowed_buttons && (i.prettyCardAllowedButtons = t.allowed_buttons, t.button_key ? this.setButton(Object(o.H)("pretty-card__button", i), t.button_key, i.prettyCardAllowedButtons) : t.button_action && this.setButtonRaw(Object(o.H)("pretty-card__button", i), t.button_action, t.button_text))
                    }
                    this.wrapperTransitions(!1, i), Object(o.a)(i, "pretty-card_removing_yes"), this.cardsElements.splice(this.cardsElements.length - 1, 0, i), this.placeholderElement && (this.wrapperTransitions(!1, this.placeholderElement), this.wrapper.insertBefore(i, this.placeholderElement), Object(o.a)(this.placeholderElement, "pretty-card_adding_yes"), this.placeholderElement.offsetHeight), i.offsetHeight, this.wrapperTransitions(!0, this.placeholderElement), this.wrapperTransitions(!0, i), Object(o.hb)(i, "pretty-card_removing_yes"), this.placeholderElement && Object(o.hb)(this.placeholderElement, "pretty-card_adding_yes"), r ? setTimeout(function() {
                        e.placeholderElement && (re(e.placeholderElement), delete e.placeholderElement), e.cardsElements.splice(e.cardsElements.length - 1, 1), e.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DELAY) : setTimeout(this.scroll.bind(this, 0, !1), this.TRANSFORM_ANIMATION_DELAY), geByClass("pretty-card__price-adder", i).map(function(t) {
                        addEvent(t, "click", e.priceAdderClicked.bind(e, t)), addEvent(Object(o.H)("pretty-card__editor-button_type_remove", domNS(t)), "click", e.priceRemoverClicked.bind(e, t))
                    }), geByClass("pretty-card__price", i).map(function(t) {
                        return addEvent(t, "change blur", e.priceInputChanged.bind(e, t))
                    }), geByClass("pretty-card__price", i).map(function(t) {
                        return addEvent(t, "focus", e.priceInputFocused.bind(e, t))
                    });
                    var l = Object(o.H)("pretty-card__edit-button_action_remove", i);
                    addEvent(l, "click", function() {
                        window.tooltips && tooltips.destroyAll(e.el), e.placeholderElement || e.addPlaceholder();
                        var t = e.cardsElements.length,
                            r = e.cardsElements.indexOf(i);
                        e.wrapperTransitions(!0, i), Object(o.a)(i, "pretty-card_removing_yes");
                        for (var s = r + 1; s < t; ++s) {
                            var n = e.cardsElements[s];
                            e.wrapperTransitions(!0, n), setTimeout(o.a.pbind(n, "pretty-card_adding_yes"), (s - r - 1) * e.TRANSFORM_ANIMATION_DELAY)
                        }
                        i.offsetHeight;
                        for (var a = r + 1; a < t; ++a) {
                            e.cardsElements[a].offsetHeight
                        }
                        var d = (t - r - 2) * e.TRANSFORM_ANIMATION_DELAY + e.TRANSFORM_ANIMATION_DURATION;
                        e.cardsElements.splice(r, 1), e.scroll(0, !1), setTimeout(function() {
                            re(i);
                            for (var t = r; t < e.cardsElements.length; ++t) {
                                var s = e.cardsElements[t];
                                e.wrapperTransitions(!1, s), Object(o.hb)(s, "pretty-card_adding_yes")
                            }
                        }, d)
                    }), addEvent(l, "mouseover", function() {
                        showTooltip(l, {
                            text: getLang("wall_pretty_cards_remove_tt"),
                            black: 1,
                            appendParentCls: "pretty-cards",
                            shift: [7, 10]
                        })
                    }), addEvent(Object(o.H)("pretty-card__link-editor", i), "click", function() {
                        e.chooseUrl(function(t, r, o) {
                            i.prettyCardAllowedButtons = r, e.setLink(i, t, o)
                        }, i.prettyCardLink, e.options.owner_id)
                    });
                    var c = Object(o.H)("pretty-card__button", i);
                    addEvent(c, "click", this.buttonEditorClicked.bind(this, c, i)), addEvent(c, "mouseover", Page.actionsDropdownUnhide), addEvent(c, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown)), addEvent(Object(o.H)("pretty-card__button-remove", c), "click", this.buttonRemoveClicked.bind(this, c)), this.initPhotoUploader(i), addEvent(i, "mousedown", this.onCardMouseDown.bind(this, i)), addEvent(geByTag1("body"), "mouseup", this.onCardMouseUp.bind(this, i))
                }
            }, t.prototype.setLink = function(t, e, r) {
                var i = Object(o.H)("pretty-card__link-editor", t);
                i.innerHTML = r, t.prettyCardLink = e;
                var s = "tel:" === e.substr(0, 4);
                toggleClass(i, "pretty-card__link-editor_phone_yes", s)
            }, t.prototype.initPhotoUploader = function(t) {
                var e = Object(o.H)("pretty-card__upload-photo-button", t),
                    r = Object(o.H)("pretty-card__edit-button_action_photo", t),
                    i = Object(o.H)("pretty-card__upload-progress", t),
                    s = extend({}, this.options.upload_options_changed, {
                        clear: !0,
                        onUploadStart: this.onPhotoUploadStart.bind(this, i),
                        onUploadError: this.onPhotoUploadError.bind(this, i),
                        onUploadComplete: this.onPhotoUploadComplete.bind(this, i, t),
                        onUploadProgress: this.onPhotoUploadProgress.bind(this),
                        onCheckComplete: this.onPhotoUploadCheckComplete.bind(this, {})
                    });
                UploadPhotoTransform.init(e, this.options.upload_url, this.options.upload_vars, this.options.upload_options, s), addEvent(r, "click", function() {
                    domFC(e).click()
                }), addEvent(r, "mouseover", function() {
                    showTooltip(r, {
                        text: getLang("wall_pretty_cards_upload_photo_tt"),
                        black: 1,
                        appendParentCls: "pretty-cards",
                        shift: [7, 10]
                    })
                })
            }, t.prototype.onPhotoUploadStart = function(t, e, r) {
                debugLog("Upload started"), Object(o.a)(t, "pretty-card__upload-progress_shown_yes"), showProgress(t, "", "inv")
            }, t.prototype.onPhotoUploadError = function(t, e, r) {
                debugLog("Upload error, msg:", r), r = "При загрузке произошла ошибка, проверьте, что размер изображения не менее 400х400 пикселей и удовлетворяет требованиям.", showFastBox({
                    title: getLang("global_error")
                }, r), hideProgress(t), Object(o.hb)(t, "pretty-card__upload-progress_shown_yes"), Upload.embed(e)
            }, t.prototype.onPhotoUploadComplete = function(t, e, r, i) {
                var s;
                debugLog("Upload complete", e, r, i);
                try {
                    s = parseJSON(i)
                } catch (t) {}
                s && s.photo ? UploadPhotoTransform.getPhotoUrl(s, this.options.stored_photo_size_list, function(r) {
                    debugLog("Success uploading photo"), this.setPhoto(e, r), e.prettyCardPhoto = s.photo, hideProgress(t), Object(o.hb)(t, "pretty-card__upload-progress_shown_yes")
                }.bind(this), function() {
                    debugLog("Error uploading photo"), hideProgress(t), hide(t)
                }.bind(this)) : Upload.onUploadError(r)
            }, t.prototype.onPhotoUploadProgress = function(t, e, r) {
                debugLog("Upload progress")
            }, t.prototype.onPhotoUploadCheckComplete = function(t, e) {
                t.renewComplete ? Upload.embed(e) : (t.renewComplete = !0, setTimeout(UploadPhotoTransform.reinit.pbind(e), 1))
            }, t.prototype.setPhoto = function(t, e) {
                var r = Object(o.H)("pretty-card__photo", t),
                    i = Object(o.H)("pretty-card__photo-fader", t);
                setStyle(i, {
                    backgroundImage: "url(" + e + ")"
                }), hide(Object(o.H)("pretty-card__upload-photo-button", r)), Object(o.a)(i, "pretty-card__photo-fader_top_yes"), setTimeout(function() {
                    setStyle(r, {
                        backgroundImage: "url(" + e + ")"
                    }), Object(o.hb)(i, "pretty-card__photo-fader_top_yes"), Object(o.hb)(r, "pretty-card__photo_upload_yes")
                }, 200)
            }, t.prototype.onCardMouseDown = function(t, e) {
                if (!this.draggingCard && hasClass(e.target, "pretty-card__draghandle")) return this.draggingCard = t, this.draggingStartingX = e.clientX, this.draggingStartingTranslateX = this.translateX, this.draggingContainerX = this.wrapperOuter.getBoundingClientRect().left, this.cardDraggingPointX = e.clientX - t.getBoundingClientRect().left, this.lastDestinationCardIndex = this.cardsElements.indexOf(t), this.wrapperTransitions(!0, t), Object(o.a)(t, "pretty-card_dragging_yes"), Object(o.a)(t, "pretty-card_ontop_yes"), setTimeout(this.wrapperTransitions.pbind(!1, t), this.TRANSFORM_ANIMATION_DURATION), e.cancelBubble = !0, e.returnValue = !1, !1
            }, t.prototype.onCardMouseUp = function(t) {
                var e = this;
                if (t === this.draggingCard) {
                    this.draggingCard && delete this.draggingCard;
                    var r = this.cardsElements.indexOf(t),
                        i = this.lastDestinationCardIndex;
                    this.cardsElements[i];
                    this.wrapperTransitions(!0, t), setStyle(t, {
                        transform: "translateX(" + (i - r) * (this.CARD_WIDTH + this.CARDS_MARGIN) + "px)"
                    }), Object(o.hb)(t, "pretty-card_dragging_yes"), setTimeout(function() {
                        Object(o.hb)(t, "pretty-card_ontop_yes");
                        var s = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var d, l = e.cardsElements[Symbol.iterator](); !(s = (d = l.next()).done); s = !0) {
                                var c = d.value;
                                e.wrapperTransitions(!1, c), Object(o.hb)(c, "pretty-card_dragging_right"), Object(o.hb)(c, "pretty-card_dragging_left"), setStyle(c, {
                                    transform: ""
                                })
                            }
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        if (r < i) {
                            for (var h = r + 1; h <= i; ++h) e.wrapper.insertBefore(e.cardsElements[h], e.cardsElements[r]);
                            e.cardsElements.splice(i + 1, 0, t), e.cardsElements.splice(r, 1)
                        } else if (r > i) {
                            for (var p = r - 1; p >= i; --p) e.wrapper.insertBefore(e.cardsElements[p], domNS(e.cardsElements[r]));
                            e.cardsElements.splice(r, 1), e.cardsElements.splice(i, 0, t)
                        }
                        e.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DURATION)
                }
            }, t.prototype.buttonEditorClicked = function(t, e, r) {
                var o = this,
                    i = e.prettyCardAllowedButtons,
                    s = domFC(this.buttonEditorDropdown);
                s.innerHTML = "", Object.keys(i).map(function(e) {
                    var r = se(o.options.button_action_template_html),
                        n = i[e];
                    r.innerHTML = n[1], addEvent(s.appendChild(r), "click", o.buttonActionClicked.bind(o, t, e, i))
                }), setStyle(this.buttonEditorDropdown, {
                    right: this.el.clientWidth - (e.offsetLeft + this.CARD_WIDTH) + this.CONTENT_PADDING + this.translateX,
                    top: e.clientHeight + this.POST_PADDING_TOP + t.offsetTop + t.clientHeight
                }), Page.actionsDropdown(this.buttonEditorDropdown)
            }, t.prototype.setButtonRaw = function(t, e, r) {
                Object(o.hb)(t, "button_contour"), Object(o.a)(t, "button_bright_blue"), Object(o.H)("pretty-card__button-editor-label", t).innerHTML = r
            }, t.prototype.setButton = function(t, e, r) {
                var o = r[e],
                    i = o[0],
                    s = o[1];
                this.setButtonRaw(t, i, s), t.prettyCardButtonKey = e
            }, t.prototype.buttonActionClicked = function(t, e, r) {
                this.setButton(t, e, r), Page.actionsDropdownHide(this.buttonEditorDropdown, 1)
            }, t.prototype.buttonRemoveClicked = function(t) {
                return Object(o.a)(t, "button_contour"), Object(o.hb)(t, "button_bright_blue"), Object(o.H)("pretty-card__button-editor-label", t).innerHTML = getLang("global_wall_pretty_cards_add_button"), Page.actionsDropdownHide(this.buttonEditorDropdown, 1), t.prettyCardButtonKey = "", !1
            }, t.prototype.togglePrice = function(t, e) {
                toggleClass(t, "pretty-card__price_hidden_yes", !!e), toggleClass(domNS(t), "pretty-card__price-wrapper_hidden_yes", !e)
            }, t.prototype.priceAdderClicked = function(t) {
                this.togglePrice(t, !0), elfocus(Object(o.H)("pretty-card__editor", domNS(t)))
            }, t.prototype.priceRemoverClicked = function(t) {
                this.togglePrice(t, !1)
            }, t.prototype.priceInputFocused = function(t) {
                var e = val(t).replace(/\D+/g, "");
                !e && val(t) && (e = 0), val(t, e), t.setSelectionRange(0, 100)
            }, t.prototype.priceInputChanged = function(t) {
                var e = val(t).trim();
                if ("" !== e) {
                    var r = intval(e.replace(/\D+/g, ""));
                    r = Math.min(r, intval(this.options.price_max));
                    var i = void 0;
                    i = 0 === (r = Math.max(r, intval(this.options.price_min))) ? getLang("wall_pretty_cards_price_free_val") : stripHTML(langNumeric(r, getLang("global_money_amount_rub_short", "raw"), !0)), val(t, i)
                } else {
                    var s = Object(o.H)("pretty-card__price-adder", gpeByClass("pretty-card__price-container", t));
                    this.togglePrice(s, !1)
                }
            }, t.prototype.scroll = function(t, e) {
                var r = this,
                    i = (this.container.clientWidth - 2 * this.POST_PADDING - this.VIEWPORT_CARDS * this.CARD_WIDTH - (this.VIEWPORT_CARDS - 1) * this.CARDS_MARGIN) / 2,
                    s = this.cardsElements.length;
                this.scrollPosition += t, this.scrollPosition = Math.max(0, this.scrollPosition), this.scrollPosition = Math.max(0, Math.min(this.cardsElements.length - this.VIEWPORT_CARDS, this.scrollPosition));
                var n = Math.max(0, s - this.scrollPosition - this.VIEWPORT_CARDS),
                    a = this.scrollPosition,
                    d = this.scrollPosition * (this.CARD_WIDTH + this.CARDS_MARGIN);
                !n && s > this.VIEWPORT_CARDS ? d -= 2 * i : a && (d -= i), this.translateX = d, e && (Object(o.a)(this.wrapper, "pretty-cards__wrapper_transition_long"), setTimeout(function() {
                    Object(o.hb)(r.wrapper, "pretty-cards__wrapper_transition_long")
                }, this.TRANSFORM_ANIMATION_DURATION_LONG)), Object(o.hb)(this.wrapper, "pretty-cards__wrapper_transition_off"), setStyle(this.wrapper, "transform", "translateX(" + -d + "px)"), toggleClass(this.scrollerRight, "pretty-cards__scroller_hidden_right", !n), toggleClass(this.scrollerLeft, "pretty-cards__scroller_hidden_left", !a), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_left", t < 0), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_right", t >= 0), show(this.scrollerProtector);
                return this.draggingCard && this.cardsElements.indexOf(this.draggingCard), this.cardsPos = d, !1
            }, t.prototype.updateCardsIds = function(t) {
                var e = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var i, s = this.cardsElements[Symbol.iterator](); !(e = (i = s.next()).done); e = !0) {
                        var n = i.value;
                        n.prettyCardId in t && (n.prettyCardId = t[n.prettyCardId])
                    }
                } catch (t) {
                    r = !0, o = t
                } finally {
                    try {
                        !e && s.return && s.return()
                    } finally {
                        if (r) throw o
                    }
                }
            }, t.prototype.needSendData = function() {
                var t = this.getSendData().prettyCardsData;
                return MD5(t) !== this.sendDataHash
            }, t.prototype.updateSendDataHash = function() {
                var t = this.getSendData().prettyCardsData;
                this.sendDataHash = MD5(t)
            }, t.prototype.saveCards = function(t, e) {
                var r = this,
                    i = this.getSendData(),
                    s = i.attachVal,
                    n = i.prettyCardsData,
                    a = function(i, s, n) {
                        if ("ok" === i) r.updateCardsIds(s), r.updateSendDataHash(), t && t();
                        else if (e) {
                            if (e(s), n) {
                                var a = r.cardsElements.find(function(t) {
                                    return t.prettyCardId == n
                                });
                                if (a) {
                                    var d = r.cardsElements.indexOf(a) - r.scrollPosition,
                                        l = !1;
                                    d > r.VIEWPORT_CARDS - 1 ? (r.scroll(d - (r.VIEWPORT_CARDS - 1)), l = !0) : d < 0 && (r.scroll(d), l = !0);
                                    setTimeout(function() {
                                        Object(o.a)(a, "pretty-card_error_yes"), setTimeout(o.hb.pbind(a, "pretty-card_error_yes"), 1e3)
                                    }, l ? r.TRANSFORM_ANIMATION_DURATION + 300 : 300)
                                }
                            }
                            return !0
                        }
                    };
                ajax.post("al_wall.php", {
                    act: "a_pretty_cards_save",
                    pretty_cards_data: n,
                    attach: s,
                    owner_id: this.options.owner_id,
                    hash: this.options.save_hash
                }, {
                    onDone: a,
                    onFail: a.bind(this, "error")
                })
            }, t.prototype.getSendData = function() {
                var t = [],
                    e = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var n, a = this.cardsElements[Symbol.iterator](); !(r = (n = a.next()).done); r = !0) {
                        var d = n.value;
                        if (d !== this.placeholderElement) {
                            var l = Object(o.H)("pretty-card__price_actual", d),
                                c = val(l),
                                h = void 0;
                            hasClass(domPN(l), "pretty-card__price-wrapper_hidden_yes") ? h = this.options.price_unshown : "" === (h = c.replace(/\D+/g, "")) && c && (h = "0");
                            var p = Object(o.H)("pretty-card__price_old", d),
                                _ = val(p),
                                u = void 0;
                            hasClass(domPN(p), "pretty-card__price-wrapper_hidden_yes") ? u = this.options.price_unshown : "" === (u = _.replace(/\D+/g, "")) && _ && (u = "0");
                            var g = Object(o.H)("pretty-card__button", d),
                                y = d.prettyCardId,
                                b = {
                                    id: y,
                                    title: val(Object(o.H)("pretty-card__title", d)),
                                    price: h,
                                    price_old: u,
                                    button: g.prettyCardButtonKey ? g.prettyCardButtonKey : "",
                                    link: d.prettyCardLink,
                                    photo: d.prettyCardPhoto
                                };
                            e.push(y), t.push(b)
                        }
                    }
                } catch (t) {
                    i = !0, s = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return {
                    prettyCardsData: JSON.stringify(t),
                    attachVal: e.join(",")
                }
            }, t
        }();
        try {
            stManager.done(jsc("web/pretty_cards.js"))
        } catch (t) {}
    }
});