! function(t) {
    function e(e) {
        for (var s, a, n = e[0], d = e[1], l = e[2], c = 0, p = []; c < n.length; c++) a = n[c], i[a] && p.push(i[a][0]), i[a] = 0;
        for (s in d) Object.prototype.hasOwnProperty.call(d, s) && (t[s] = d[s]);
        for (h && h(e); p.length;) p.shift()();
        return o.push.apply(o, l || []), r()
    }

    function r() {
        for (var t, e = 0; e < o.length; e++) {
            for (var r = o[e], s = !0, n = 1; n < r.length; n++) {
                var d = r[n];
                0 !== i[d] && (s = !1)
            }
            s && (o.splice(e--, 1), t = a(a.s = r[0]))
        }
        return t
    }
    var s = {},
        i = {
            "web/pretty_cards": 0
        },
        o = [];

    function a(e) {
        if (s[e]) return s[e].exports;
        var r = s[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, a), r.l = !0, r.exports
    }
    a.m = t, a.c = s, a.d = function(t, e, r) {
        a.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, a.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, a.t = function(t, e) {
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (a.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var s in t) a.d(r, s, function(e) {
                return t[e]
            }.bind(null, s));
        return r
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return a.d(e, "a", e), e
    }, a.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, a.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        d = n.push.bind(n);
    n.push = e, n = n.slice();
    for (var l = 0; l < n.length; l++) e(n[l]);
    var h = d;
    o.push([132, "bundles/common"]), r()
}({
    132: function(t, e, r) {
        t.exports = r("qf0/")
    },
    "qf0/": function(t, e, r) {
        "use strict";
        r.r(e);
        r("pIFo"), r("rE2o"), r("ioFf"), r("tUrg"), r("rGqo"), r("Btvt");
        var s = r("zxIV");
        window.PrettyCardGallery = class {
            constructor(t, e, r) {
                if (!t.prettyCardsInitialized) {
                    if (t.prettyCardsInitialized = !0, t.removeAttribute("onmouseenter"), this.VIEWPORT_CARDS = 2, this.CARD_WIDTH = 200, this.CARDS_MARGIN = 12, this.CONTENT_PADDING = 13, this.POST_PADDING = 20, this.POST_PADDING_TOP = 15, this.TRANSFORM_ANIMATION_DURATION = 300, this.TRANSFORM_ANIMATION_DURATION_LONG = 600, this.TRANSFORM_ANIMATION_DELAY = 100, this.el = t, this.scrollerLeft = Object(s.H)("pretty-cards__scroller_position_left", t), this.scrollerRight = Object(s.H)("pretty-cards__scroller_position_right", t), this.scrollerProtector = Object(s.H)("pretty-cards__scroller_type_protector", t), this.wrapper = Object(s.H)("pretty-cards__wrapper", t), this.wrapperOuter = Object(s.H)("pretty-cards__wrapper-outer", t), this.scrollPosition = 0, this.cardsElements = geByClass("pretty-card", t), this.buttonEditorDropdown = Object(s.H)("pretty-card__button-dropdown", t), this.container = Object(s.H)("pretty-cards__container", t), this.newCardsId = -1, this.lastChosenUrl = "", this.options = extend({}, e || {}), this.options.editing && this.addPlaceholder(), r)
                        for (var i = 0, o = Object.keys(r); i < o.length; i++) {
                            var a = o[i];
                            this.addCard(r[a]), r[a].link && (this.lastChosenUrl = r[a].link)
                        }
                    this.initEvents(), this.scroll(0, !1), this.options.editing && this.updateSendDataHash()
                }
            }
            initEvents() {
                if (this.scrollerLeft && (addEvent(this.scrollerLeft, "click", this.scroll.bind(this, -1, !1)), addEvent(this.scrollerLeft, "mouseenter", this.onScrollerMouseEnter.bind(this, -1)), addEvent(this.scrollerLeft, "mouseleave", this.onScrollerMouseLeave.bind(this, -1))), this.scrollerRight && (addEvent(this.scrollerRight, "click", this.scroll.bind(this, 1, !1)), addEvent(this.scrollerRight, "mouseenter", this.onScrollerMouseEnter.bind(this, 1)), addEvent(this.scrollerRight, "mouseleave", this.onScrollerMouseLeave.bind(this, 1))), addEvent(this.scrollerProtector, "mouseout", hide.pbind(this.scrollerProtector)), addEvent(this.container, "mousemove", this.onDraggingMouseMove.bind(this)), addEvent(this.buttonEditorDropdown, "mouseover", Page.actionsDropdownUnhide), addEvent(this.buttonEditorDropdown, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown)), this.scrollerLeft && this.scrollerRight) {
                    var t = function() {
                        this.lastWinOnScroll = vkNow()
                    }.bind(this);
                    addEvent(window, "scroll", t), addEvent(this.container, browserFeatures.wheelEvent, this.onContainerWheel.bind(this)), cur.destroy.push(function() {
                        removeEvent(window, "scroll", t)
                    })
                }
            }
            onContainerWheel(t) {
                if (!(vkNow() - this.lastWinOnScroll < 300)) {
                    cancelEvent(t);
                    var e = this.cardsElements.length * this.CARD_WIDTH + Math.max(0, this.cardsElements.length - 1) * this.CARDS_MARGIN,
                        r = Math.abs(t.deltaY) > Math.abs(t.deltaX) ? t.deltaY : t.deltaX,
                        i = this.cardsPos || 0;
                    isNumeric(r) && (i += r), this.cardsPos = Math.max(0, Math.min(i, e - this.wrapper.clientWidth)), Object(s.a)(this.wrapper, "pretty-cards__wrapper_transition_off"), setStyle(this.wrapper, "transform", "translateX(-" + this.cardsPos + "px)"), this.scrollPosition += Math.round(this.cardsPos / (this.CARD_WIDTH - this.CARDS_MARGIN)) - this.scrollPosition, this.scrollPosition = Math.max(0, this.scrollPosition), this.scrollPosition = Math.max(0, Math.min(this.cardsElements.length - this.VIEWPORT_CARDS, this.scrollPosition));
                    var o = e - this.wrapper.clientWidth - this.cardsPos - this.POST_PADDING,
                        a = this.cardsPos - this.POST_PADDING;
                    toggleClass(this.scrollerRight, "pretty-cards__scroller_hidden_right", o < 0), toggleClass(this.scrollerLeft, "pretty-cards__scroller_hidden_left", a < 0), Object(s.a)(this.scrollerProtector, "pretty-cards__scroller_position_right", 0), show(this.scrollerProtector)
                }
            }
            onScrollerMouseEnter(t) {
                this.draggingCard && (this.blockDraggingSwitch = !0, this.wrapperTransitions(!0, this.draggingCard), this.scroll(t, !0), setTimeout(this.wrapperTransitions.bind(this, !1, this.draggingCard), this.TRANSFORM_ANIMATION_DURATION_LONG))
            }
            onScrollerMouseLeave(t) {
                this.draggingCard && (this.blockDraggingSwitch = !1)
            }
            onDraggingMouseMove(t) {
                if (this.draggingCard && !this.blockDragging) {
                    var e = t.clientX - this.draggingStartingX + (this.translateX - this.draggingStartingTranslateX);
                    if (setStyle(this.draggingCard, {
                            transform: "translateY(10px) scale(1.05) translateX(" + e + "px)"
                        }), !this.blockDraggingSwitch) {
                        var r = t.clientX - this.draggingContainerX + this.translateX + (this.CARD_WIDTH / 2 - this.cardDraggingPointX),
                            i = (this.cardsElements.length, this.CARD_WIDTH, this.cardsElements.length, this.CARDS_MARGIN, (r - this.CARD_WIDTH / 2) / (this.CARD_WIDTH + this.CARDS_MARGIN)),
                            o = this.lastDestinationCardIndex;
                        if (i < o - 1) o -= 1;
                        else if (i > o + 1) {
                            this.placeholderElement && o + 1 === this.cardsElements.length - 1 || (o += 1)
                        }
                        if (o !== this.lastDestinationCardIndex) {
                            var a = this.cardsElements.indexOf(this.draggingCard);
                            o > this.lastDestinationCardIndex ? o > a ? (this.wrapperTransitions(!0, this.cardsElements[o]), Object(s.a)(this.cardsElements[o], "pretty-card_dragging_left")) : o <= a && Object(s.hb)(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_right") : o < this.lastDestinationCardIndex && (o >= a ? Object(s.hb)(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_left") : o < a && (this.wrapperTransitions(!0, this.cardsElements[o]), Object(s.a)(this.cardsElements[o], "pretty-card_dragging_right"))), this.lastDestinationCardIndex = o
                        }
                    }
                }
            }
            addPlaceholder() {
                if (this.options.placeholder_html) {
                    var t = se(this.options.placeholder_html);
                    this.wrapper.appendChild(t), this.cardsElements.push(t), this.placeholderElement = t, addEvent(t, "click", this.onPlaceholderClicked.bind(this))
                }
            }
            onUrlChosen(t, e, r) {
                var i = t.btns.ok[0],
                    o = Object(s.H)("share_url_input", t.bodyNode),
                    a = val(o);
                lockButton(i), disable(o, !0), hide("share_url_error"), ajax.post("al_wall.php", {
                    act: "a_pretty_cards_check_url",
                    url: a,
                    owner_id: e
                }, {
                    onDone: (e, s, i) => {
                        this.lastChosenUrl = s, t.hide(), r(s, e, i)
                    },
                    onFail: t => {
                        var e = "";
                        return t && t !== getLang("global_unknown_error") && (e = t + " "), Object(s.F)("share_url_error").innerHTML = e + getLang("global_share_link_failed"), disable(o, !1), unlockButton(i), show("share_url_error"), elfocus(o), !0
                    }
                })
            }
            chooseUrl(t, e, r) {
                window.onShareChooseUrlBoxInit = (() => {
                    var e = curBox(),
                        i = Object(s.H)("share_url_input", e.bodyNode);
                    addEvent(i, "keydown", s => {
                        if (s.which === KEY.ENTER) return this.onUrlChosen(e, r, t), !1
                    })
                });
                var i = showBox("share.php", {
                    act: "choose_url_box",
                    default_url: e
                }, {
                    dark: 1
                });
                i.removeButtons(), i.addButton(getLang("global_continue"), this.onUrlChosen.bind(this, i, r, t))
            }
            onPlaceholderClicked() {
                this.chooseUrl((t, e, r) => {
                    this.addCard({
                        link: t,
                        link_decoded: r,
                        allowed_buttons: e
                    })
                }, this.lastChosenUrl, this.options.owner_id)
            }
            wrapperTransitions(t, e, r) {
                e && (t ? Object(s.a)(e, !0 === r ? "pretty-card_transitions_long" : "pretty-card_transitions_on") : (Object(s.hb)(e, "pretty-card_transitions_long"), Object(s.hb)(e, "pretty-card_transitions_on")))
            }
            addCard(t) {
                if (this.options.card_template_html && (!(this.cardsElements.length >= intval(this.options.cards_max)) || this.placeholderElement)) {
                    var e = this.cardsElements.length === intval(this.options.cards_max),
                        r = se(this.options.card_template_html);
                    if (t) {
                        if (t.id && t.owner_id ? r.prettyCardId = t.owner_id + "_" + t.id : r.prettyCardId = this.newCardsId--, t.link && this.setLink(r, t.link, t.link_decoded), t.title && val(Object(s.H)("pretty-card__title", r), t.title), void 0 !== t.price && t.price != this.options.price_unshown) {
                            var i = Object(s.H)("pretty-card__price_actual", r),
                                o = domPS(domPN(i));
                            val(i, t.price), this.priceInputChanged(i), this.togglePrice(o, !0)
                        }
                        if (void 0 !== t.price_old && t.price_old != this.options.price_unshown) {
                            var a = Object(s.H)("pretty-card__price_old", r),
                                n = domPS(domPN(a));
                            val(a, t.price_old), this.priceInputChanged(a), this.togglePrice(n, !0)
                        }
                        t.photo_url && this.setPhoto(r, t.photo_url), t.photo && (r.prettyCardPhoto = t.photo), t.allowed_buttons && (r.prettyCardAllowedButtons = t.allowed_buttons, t.button_key ? this.setButton(Object(s.H)("pretty-card__button", r), t.button_key, r.prettyCardAllowedButtons) : t.button_action && this.setButtonRaw(Object(s.H)("pretty-card__button", r), t.button_action, t.button_text))
                    }
                    this.wrapperTransitions(!1, r), Object(s.a)(r, "pretty-card_removing_yes"), this.cardsElements.splice(this.cardsElements.length - 1, 0, r), this.placeholderElement && (this.wrapperTransitions(!1, this.placeholderElement), this.wrapper.insertBefore(r, this.placeholderElement), Object(s.a)(this.placeholderElement, "pretty-card_adding_yes"), this.placeholderElement.offsetHeight), r.offsetHeight, this.wrapperTransitions(!0, this.placeholderElement), this.wrapperTransitions(!0, r), Object(s.hb)(r, "pretty-card_removing_yes"), this.placeholderElement && Object(s.hb)(this.placeholderElement, "pretty-card_adding_yes"), e ? setTimeout(() => {
                        this.placeholderElement && (re(this.placeholderElement), delete this.placeholderElement), this.cardsElements.splice(this.cardsElements.length - 1, 1), this.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DELAY) : setTimeout(this.scroll.bind(this, 0, !1), this.TRANSFORM_ANIMATION_DELAY), geByClass("pretty-card__price-adder", r).map(t => {
                        addEvent(t, "click", this.priceAdderClicked.bind(this, t)), addEvent(Object(s.H)("pretty-card__editor-button_type_remove", domNS(t)), "click", this.priceRemoverClicked.bind(this, t))
                    }), geByClass("pretty-card__price", r).map(t => addEvent(t, "change blur", this.priceInputChanged.bind(this, t))), geByClass("pretty-card__price", r).map(t => addEvent(t, "focus", this.priceInputFocused.bind(this, t)));
                    var d = Object(s.H)("pretty-card__edit-button_action_remove", r);
                    addEvent(d, "click", () => {
                        window.tooltips && tooltips.destroyAll(this.el), this.placeholderElement || this.addPlaceholder();
                        var t = this.cardsElements.length,
                            e = this.cardsElements.indexOf(r);
                        this.wrapperTransitions(!0, r), Object(s.a)(r, "pretty-card_removing_yes");
                        for (var i = e + 1; i < t; ++i) {
                            var o = this.cardsElements[i];
                            this.wrapperTransitions(!0, o), setTimeout(s.a.pbind(o, "pretty-card_adding_yes"), (i - e - 1) * this.TRANSFORM_ANIMATION_DELAY)
                        }
                        r.offsetHeight;
                        for (var a = e + 1; a < t; ++a) {
                            this.cardsElements[a].offsetHeight
                        }
                        var n = (t - e - 2) * this.TRANSFORM_ANIMATION_DELAY + this.TRANSFORM_ANIMATION_DURATION;
                        this.cardsElements.splice(e, 1), this.scroll(0, !1), setTimeout(() => {
                            re(r);
                            for (var t = e; t < this.cardsElements.length; ++t) {
                                var i = this.cardsElements[t];
                                this.wrapperTransitions(!1, i), Object(s.hb)(i, "pretty-card_adding_yes")
                            }
                        }, n)
                    }), addEvent(d, "mouseover", () => {
                        showTooltip(d, {
                            text: getLang("wall_pretty_cards_remove_tt"),
                            black: 1,
                            appendParentCls: "pretty-cards",
                            shift: [7, 10]
                        })
                    }), addEvent(Object(s.H)("pretty-card__link-editor", r), "click", () => {
                        this.chooseUrl((t, e, s) => {
                            r.prettyCardAllowedButtons = e, this.setLink(r, t, s)
                        }, r.prettyCardLink, this.options.owner_id)
                    });
                    var l = Object(s.H)("pretty-card__button", r);
                    addEvent(l, "click", this.buttonEditorClicked.bind(this, l, r)), addEvent(l, "mouseover", Page.actionsDropdownUnhide), addEvent(l, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown)), addEvent(Object(s.H)("pretty-card__button-remove", l), "click", this.buttonRemoveClicked.bind(this, l)), this.initPhotoUploader(r), addEvent(r, "mousedown", this.onCardMouseDown.bind(this, r)), addEvent(geByTag1("body"), "mouseup", this.onCardMouseUp.bind(this, r))
                }
            }
            setLink(t, e, r) {
                var i = Object(s.H)("pretty-card__link-editor", t);
                i.innerHTML = r, t.prettyCardLink = e;
                var o = "tel:" === e.substr(0, 4);
                toggleClass(i, "pretty-card__link-editor_phone_yes", o)
            }
            initPhotoUploader(t) {
                var e = Object(s.H)("pretty-card__upload-photo-button", t),
                    r = Object(s.H)("pretty-card__edit-button_action_photo", t),
                    i = Object(s.H)("pretty-card__upload-progress", t),
                    o = extend({}, this.options.upload_options_changed, {
                        clear: !0,
                        onUploadStart: this.onPhotoUploadStart.bind(this, i),
                        onUploadError: this.onPhotoUploadError.bind(this, i),
                        onUploadComplete: this.onPhotoUploadComplete.bind(this, i, t),
                        onUploadProgress: this.onPhotoUploadProgress.bind(this),
                        onCheckComplete: this.onPhotoUploadCheckComplete.bind(this, {})
                    });
                UploadPhotoTransform.init(e, this.options.upload_url, this.options.upload_vars, this.options.upload_options, o), addEvent(r, "click", () => {
                    domFC(e).click()
                }), addEvent(r, "mouseover", () => {
                    showTooltip(r, {
                        text: getLang("wall_pretty_cards_upload_photo_tt"),
                        black: 1,
                        appendParentCls: "pretty-cards",
                        shift: [7, 10]
                    })
                })
            }
            onPhotoUploadStart(t, e, r) {
                debugLog("Upload started"), Object(s.a)(t, "pretty-card__upload-progress_shown_yes"), showProgress(t, "", "inv")
            }
            onPhotoUploadError(t, e, r) {
                debugLog("Upload error, msg:", r), r = "При загрузке произошла ошибка, проверьте, что размер изображения не менее 400х400 пикселей и удовлетворяет требованиям.", showFastBox({
                    title: getLang("global_error")
                }, r), hideProgress(t), Object(s.hb)(t, "pretty-card__upload-progress_shown_yes"), Upload.embed(e)
            }
            onPhotoUploadComplete(t, e, r, i) {
                var o;
                debugLog("Upload complete", e, r, i);
                try {
                    o = parseJSON(i)
                } catch (t) {}
                o && o.photo ? UploadPhotoTransform.getPhotoUrl(o, this.options.stored_photo_size_list, function(r) {
                    debugLog("Success uploading photo"), this.setPhoto(e, r), e.prettyCardPhoto = o.photo, hideProgress(t), Object(s.hb)(t, "pretty-card__upload-progress_shown_yes")
                }.bind(this), function() {
                    debugLog("Error uploading photo"), hideProgress(t), hide(t)
                }.bind(this)) : Upload.onUploadError(r)
            }
            onPhotoUploadProgress(t, e, r) {
                debugLog("Upload progress")
            }
            onPhotoUploadCheckComplete(t, e) {
                t.renewComplete ? Upload.embed(e) : (t.renewComplete = !0, setTimeout(UploadPhotoTransform.reinit.pbind(e), 1))
            }
            setPhoto(t, e) {
                var r = Object(s.H)("pretty-card__photo", t),
                    i = Object(s.H)("pretty-card__photo-fader", t);
                setStyle(i, {
                    backgroundImage: "url(" + e + ")"
                }), hide(Object(s.H)("pretty-card__upload-photo-button", r)), Object(s.a)(i, "pretty-card__photo-fader_top_yes"), setTimeout(() => {
                    setStyle(r, {
                        backgroundImage: "url(" + e + ")"
                    }), Object(s.hb)(i, "pretty-card__photo-fader_top_yes"), Object(s.hb)(r, "pretty-card__photo_upload_yes")
                }, 200)
            }
            onCardMouseDown(t, e) {
                if (!this.draggingCard && hasClass(e.target, "pretty-card__draghandle")) return this.draggingCard = t, this.draggingStartingX = e.clientX, this.draggingStartingTranslateX = this.translateX, this.draggingContainerX = this.wrapperOuter.getBoundingClientRect().left, this.cardDraggingPointX = e.clientX - t.getBoundingClientRect().left, this.lastDestinationCardIndex = this.cardsElements.indexOf(t), this.wrapperTransitions(!0, t), Object(s.a)(t, "pretty-card_dragging_yes"), Object(s.a)(t, "pretty-card_ontop_yes"), setTimeout(this.wrapperTransitions.pbind(!1, t), this.TRANSFORM_ANIMATION_DURATION), e.cancelBubble = !0, e.returnValue = !1, !1
            }
            onCardMouseUp(t) {
                if (t === this.draggingCard) {
                    this.draggingCard && delete this.draggingCard;
                    var e = this.cardsElements.indexOf(t),
                        r = this.lastDestinationCardIndex;
                    this.cardsElements[r];
                    this.wrapperTransitions(!0, t), setStyle(t, {
                        transform: "translateX(" + (r - e) * (this.CARD_WIDTH + this.CARDS_MARGIN) + "px)"
                    }), Object(s.hb)(t, "pretty-card_dragging_yes"), setTimeout(() => {
                        Object(s.hb)(t, "pretty-card_ontop_yes");
                        var i = !0,
                            o = !1,
                            a = void 0;
                        try {
                            for (var n, d = this.cardsElements[Symbol.iterator](); !(i = (n = d.next()).done); i = !0) {
                                var l = n.value;
                                this.wrapperTransitions(!1, l), Object(s.hb)(l, "pretty-card_dragging_right"), Object(s.hb)(l, "pretty-card_dragging_left"), setStyle(l, {
                                    transform: ""
                                })
                            }
                        } catch (t) {
                            o = !0, a = t
                        } finally {
                            try {
                                i || null == d.return || d.return()
                            } finally {
                                if (o) throw a
                            }
                        }
                        if (e < r) {
                            for (var h = e + 1; h <= r; ++h) this.wrapper.insertBefore(this.cardsElements[h], this.cardsElements[e]);
                            this.cardsElements.splice(r + 1, 0, t), this.cardsElements.splice(e, 1)
                        } else if (e > r) {
                            for (var c = e - 1; c >= r; --c) this.wrapper.insertBefore(this.cardsElements[c], domNS(this.cardsElements[e]));
                            this.cardsElements.splice(e, 1), this.cardsElements.splice(r, 0, t)
                        }
                        this.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DURATION)
                }
            }
            buttonEditorClicked(t, e, r) {
                var s = e.prettyCardAllowedButtons,
                    i = domFC(this.buttonEditorDropdown);
                i.innerHTML = "", Object.keys(s).map(e => {
                    var r = se(this.options.button_action_template_html),
                        o = s[e];
                    r.innerHTML = o[1], addEvent(i.appendChild(r), "click", this.buttonActionClicked.bind(this, t, e, s))
                }), setStyle(this.buttonEditorDropdown, {
                    right: this.el.clientWidth - (e.offsetLeft + this.CARD_WIDTH) + this.CONTENT_PADDING + this.translateX,
                    top: e.clientHeight + this.POST_PADDING_TOP + t.offsetTop + t.clientHeight
                }), Page.actionsDropdown(this.buttonEditorDropdown)
            }
            setButtonRaw(t, e, r) {
                Object(s.hb)(t, "button_contour"), Object(s.a)(t, "button_bright_blue"), Object(s.H)("pretty-card__button-editor-label", t).innerHTML = r
            }
            setButton(t, e, r) {
                var s = r[e],
                    i = s[0],
                    o = s[1];
                this.setButtonRaw(t, i, o), t.prettyCardButtonKey = e
            }
            buttonActionClicked(t, e, r) {
                this.setButton(t, e, r), Page.actionsDropdownHide(this.buttonEditorDropdown, 1)
            }
            buttonRemoveClicked(t) {
                return Object(s.a)(t, "button_contour"), Object(s.hb)(t, "button_bright_blue"), Object(s.H)("pretty-card__button-editor-label", t).innerHTML = getLang("global_wall_pretty_cards_add_button"), Page.actionsDropdownHide(this.buttonEditorDropdown, 1), t.prettyCardButtonKey = "", !1
            }
            togglePrice(t, e) {
                toggleClass(t, "pretty-card__price_hidden_yes", !!e), toggleClass(domNS(t), "pretty-card__price-wrapper_hidden_yes", !e)
            }
            priceAdderClicked(t) {
                this.togglePrice(t, !0), elfocus(Object(s.H)("pretty-card__editor", domNS(t)))
            }
            priceRemoverClicked(t) {
                this.togglePrice(t, !1)
            }
            priceInputFocused(t) {
                var e = val(t).replace(/\D+/g, "");
                !e && val(t) && (e = 0), val(t, e), t.setSelectionRange(0, 100)
            }
            priceInputChanged(t) {
                var e = val(t).trim();
                if ("" !== e) {
                    var r, i = intval(e.replace(/\D+/g, ""));
                    i = Math.min(i, intval(this.options.price_max)), r = 0 === (i = Math.max(i, intval(this.options.price_min))) ? getLang("wall_pretty_cards_price_free_val") : stripHTML(langNumeric(i, getLang("global_money_amount_rub_short", "raw"), !0)), val(t, r)
                } else {
                    var o = Object(s.H)("pretty-card__price-adder", gpeByClass("pretty-card__price-container", t));
                    this.togglePrice(o, !1)
                }
            }
            scroll(t, e) {
                var r = (this.container.clientWidth - 2 * this.POST_PADDING - this.VIEWPORT_CARDS * this.CARD_WIDTH - (this.VIEWPORT_CARDS - 1) * this.CARDS_MARGIN) / 2,
                    i = this.cardsElements.length;
                this.scrollPosition += t, this.scrollPosition = Math.max(0, this.scrollPosition), this.scrollPosition = Math.max(0, Math.min(this.cardsElements.length - this.VIEWPORT_CARDS, this.scrollPosition));
                var o = Math.max(0, i - this.scrollPosition - this.VIEWPORT_CARDS),
                    a = this.scrollPosition,
                    n = this.scrollPosition * (this.CARD_WIDTH + this.CARDS_MARGIN);
                !o && i > this.VIEWPORT_CARDS ? n -= 2 * r : a && (n -= r), this.translateX = n, e && (Object(s.a)(this.wrapper, "pretty-cards__wrapper_transition_long"), setTimeout(() => {
                    Object(s.hb)(this.wrapper, "pretty-cards__wrapper_transition_long")
                }, this.TRANSFORM_ANIMATION_DURATION_LONG)), Object(s.hb)(this.wrapper, "pretty-cards__wrapper_transition_off"), setStyle(this.wrapper, "transform", "translateX(" + -n + "px)"), toggleClass(this.scrollerRight, "pretty-cards__scroller_hidden_right", !o), toggleClass(this.scrollerLeft, "pretty-cards__scroller_hidden_left", !a), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_left", t < 0), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_right", t >= 0), show(this.scrollerProtector);
                return this.draggingCard && this.cardsElements.indexOf(this.draggingCard), this.cardsPos = n, !1
            }
            updateCardsIds(t) {
                var e = !0,
                    r = !1,
                    s = void 0;
                try {
                    for (var i, o = this.cardsElements[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                        var a = i.value;
                        a.prettyCardId in t && (a.prettyCardId = t[a.prettyCardId])
                    }
                } catch (t) {
                    r = !0, s = t
                } finally {
                    try {
                        e || null == o.return || o.return()
                    } finally {
                        if (r) throw s
                    }
                }
            }
            needSendData() {
                var t = this.getSendData().prettyCardsData;
                return MD5(t) !== this.sendDataHash
            }
            updateSendDataHash() {
                var t = this.getSendData().prettyCardsData;
                this.sendDataHash = MD5(t)
            }
            saveCards(t, e) {
                var r = this.getSendData(),
                    i = r.attachVal,
                    o = r.prettyCardsData,
                    a = (r, i, o) => {
                        if ("ok" === r) this.updateCardsIds(i), this.updateSendDataHash(), t && t();
                        else if (e) {
                            if (e(i), o) {
                                var a = this.cardsElements.find(t => t.prettyCardId == o);
                                if (a) {
                                    var n = this.cardsElements.indexOf(a) - this.scrollPosition,
                                        d = !1;
                                    n > this.VIEWPORT_CARDS - 1 ? (this.scroll(n - (this.VIEWPORT_CARDS - 1)), d = !0) : n < 0 && (this.scroll(n), d = !0);
                                    setTimeout(() => {
                                        Object(s.a)(a, "pretty-card_error_yes"), setTimeout(s.hb.pbind(a, "pretty-card_error_yes"), 1e3)
                                    }, d ? this.TRANSFORM_ANIMATION_DURATION + 300 : 300)
                                }
                            }
                            return !0
                        }
                    };
                ajax.post("al_wall.php", {
                    act: "a_pretty_cards_save",
                    pretty_cards_data: o,
                    attach: i,
                    owner_id: this.options.owner_id,
                    hash: this.options.save_hash
                }, {
                    onDone: a,
                    onFail: a.bind(this, "error")
                })
            }
            getSendData() {
                var t = [],
                    e = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var a, n = this.cardsElements[Symbol.iterator](); !(r = (a = n.next()).done); r = !0) {
                        var d = a.value;
                        if (d !== this.placeholderElement) {
                            var l = Object(s.H)("pretty-card__price_actual", d),
                                h = val(l),
                                c = void 0;
                            hasClass(domPN(l), "pretty-card__price-wrapper_hidden_yes") ? c = this.options.price_unshown : "" === (c = h.replace(/\D+/g, "")) && h && (c = "0");
                            var p = Object(s.H)("pretty-card__price_old", d),
                                _ = val(p),
                                g = void 0;
                            hasClass(domPN(p), "pretty-card__price-wrapper_hidden_yes") ? g = this.options.price_unshown : "" === (g = _.replace(/\D+/g, "")) && _ && (g = "0");
                            var u = Object(s.H)("pretty-card__button", d),
                                b = d.prettyCardId,
                                y = {
                                    id: b,
                                    title: val(Object(s.H)("pretty-card__title", d)),
                                    price: c,
                                    price_old: g,
                                    button: u.prettyCardButtonKey ? u.prettyCardButtonKey : "",
                                    link: d.prettyCardLink,
                                    photo: d.prettyCardPhoto
                                };
                            e.push(b), t.push(y)
                        }
                    }
                } catch (t) {
                    i = !0, o = t
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return {
                    prettyCardsData: JSON.stringify(t),
                    attachVal: e.join(",")
                }
            }
        };
        try {
            stManager.done(jsc("web/pretty_cards.js"))
        } catch (t) {}
    }
});