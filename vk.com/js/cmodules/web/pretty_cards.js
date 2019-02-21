! function(t) {
    var e = {};

    function r(o) {
        if (e[o]) return e[o].exports;
        var s = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(s.exports, s, s.exports, r), s.l = !0, s.exports
    }
    r.m = t, r.c = e, r.d = function(t, e, o) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (r.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var s in t) r.d(o, s, function(e) {
                return t[e]
            }.bind(null, s));
        return o
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 112)
}({
    112: function(t, e, r) {
        t.exports = r("qf0/")
    },
    "qf0/": function(t, e, r) {
        "use strict";
        r.r(e), window.PrettyCardGallery = function() {
            function t(e, r, o) {
                if (function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), !e.prettyCardsInitialized) {
                    if (e.prettyCardsInitialized = !0, e.removeAttribute("onmouseenter"), this.VIEWPORT_CARDS = 2, this.CARD_WIDTH = 200, this.CARDS_MARGIN = 12, this.CONTENT_PADDING = 13, this.POST_PADDING = 20, this.POST_PADDING_TOP = 15, this.TRANSFORM_ANIMATION_DURATION = 300, this.TRANSFORM_ANIMATION_DURATION_LONG = 600, this.TRANSFORM_ANIMATION_DELAY = 100, this.el = e, this.scrollerLeft = geByClass1("pretty-cards__scroller_position_left", e), this.scrollerRight = geByClass1("pretty-cards__scroller_position_right", e), this.scrollerProtector = geByClass1("pretty-cards__scroller_type_protector", e), this.wrapper = geByClass1("pretty-cards__wrapper", e), this.wrapperOuter = geByClass1("pretty-cards__wrapper-outer", e), this.scrollPosition = 0, this.cardsElements = geByClass("pretty-card", e), this.buttonEditorDropdown = geByClass1("pretty-card__button-dropdown", e), this.container = geByClass1("pretty-cards__container", e), this.newCardsId = -1, this.lastChosenUrl = "", this.options = extend({}, r || {}), this.options.editing && this.addPlaceholder(), o) {
                        var s = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var n, d = Object.keys(o)[Symbol.iterator](); !(s = (n = d.next()).done); s = !0) {
                                var l = n.value;
                                this.addCard(o[l]), o[l].link && (this.lastChosenUrl = o[l].link)
                            }
                        } catch (t) {
                            i = !0, a = t
                        } finally {
                            try {
                                !s && d.return && d.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                    }
                    this.initEvents(), this.scroll(0, !1), this.options.editing && this.updateSendDataHash()
                }
            }
            return t.prototype.initEvents = function() {
                this.scrollerLeft && (addEvent(this.scrollerLeft, "click", this.scroll.bind(this, -1, !1)), addEvent(this.scrollerLeft, "mouseenter", this.onScrollerMouseEnter.bind(this, -1)), addEvent(this.scrollerLeft, "mouseleave", this.onScrollerMouseLeave.bind(this, -1))), this.scrollerRight && (addEvent(this.scrollerRight, "click", this.scroll.bind(this, 1, !1)), addEvent(this.scrollerRight, "mouseenter", this.onScrollerMouseEnter.bind(this, 1)), addEvent(this.scrollerRight, "mouseleave", this.onScrollerMouseLeave.bind(this, 1))), addEvent(this.scrollerProtector, "mouseout", hide.pbind(this.scrollerProtector)), addEvent(this.container, "mousemove", this.onDraggingMouseMove.bind(this)), addEvent(this.buttonEditorDropdown, "mouseover", Page.actionsDropdownUnhide), addEvent(this.buttonEditorDropdown, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown))
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
                            o = (this.cardsElements.length, this.CARD_WIDTH, this.cardsElements.length, this.CARDS_MARGIN, (r - this.CARD_WIDTH / 2) / (this.CARD_WIDTH + this.CARDS_MARGIN)),
                            s = this.lastDestinationCardIndex;
                        if (o < s - 1) s -= 1;
                        else if (o > s + 1) {
                            this.placeholderElement && s + 1 === this.cardsElements.length - 1 || (s += 1)
                        }
                        if (s !== this.lastDestinationCardIndex) {
                            var i = this.cardsElements.indexOf(this.draggingCard);
                            s > this.lastDestinationCardIndex ? s > i ? (this.wrapperTransitions(!0, this.cardsElements[s]), addClass(this.cardsElements[s], "pretty-card_dragging_left")) : s <= i && removeClass(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_right") : s < this.lastDestinationCardIndex && (s >= i ? removeClass(this.cardsElements[this.lastDestinationCardIndex], "pretty-card_dragging_left") : s < i && (this.wrapperTransitions(!0, this.cardsElements[s]), addClass(this.cardsElements[s], "pretty-card_dragging_right"))), this.lastDestinationCardIndex = s
                        }
                    }
                }
            }, t.prototype.addPlaceholder = function() {
                if (this.options.placeholder_html) {
                    var t = se(this.options.placeholder_html);
                    this.wrapper.appendChild(t), this.cardsElements.push(t), this.placeholderElement = t, addEvent(t, "click", this.onPlaceholderClicked.bind(this))
                }
            }, t.prototype.onUrlChosen = function(t, e, r) {
                var o = this,
                    s = t.btns.ok[0],
                    i = geByClass1("share_url_input", t.bodyNode),
                    a = val(i);
                lockButton(s), disable(i, !0), hide("share_url_error"), ajax.post("al_wall.php", {
                    act: "a_pretty_cards_check_url",
                    url: a,
                    owner_id: e
                }, {
                    onDone: function(e, s, i) {
                        o.lastChosenUrl = s, t.hide(), r(s, e, i)
                    },
                    onFail: function(t) {
                        var e = "";
                        return t && t !== getLang("global_unknown_error") && (e = t + " "), ge("share_url_error").innerHTML = e + getLang("global_share_link_failed"), disable(i, !1), unlockButton(s), show("share_url_error"), elfocus(i), !0
                    }
                })
            }, t.prototype.chooseUrl = function(t, e, r) {
                var o = this;
                window.onShareChooseUrlBoxInit = function() {
                    var e = curBox(),
                        s = geByClass1("share_url_input", e.bodyNode);
                    addEvent(s, "keydown", function(s) {
                        if (s.which === KEY.ENTER) return o.onUrlChosen(e, r, t), !1
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
                e && (t ? addClass(e, !0 === r ? "pretty-card_transitions_long" : "pretty-card_transitions_on") : (removeClass(e, "pretty-card_transitions_long"), removeClass(e, "pretty-card_transitions_on")))
            }, t.prototype.addCard = function(t) {
                var e = this;
                if (this.options.card_template_html && (!(this.cardsElements.length >= intval(this.options.cards_max)) || this.placeholderElement)) {
                    var r = this.cardsElements.length === intval(this.options.cards_max),
                        o = se(this.options.card_template_html);
                    if (t) {
                        if (t.id && t.owner_id ? o.prettyCardId = t.owner_id + "_" + t.id : o.prettyCardId = this.newCardsId--, t.link && this.setLink(o, t.link, t.link_decoded), t.title && val(geByClass1("pretty-card__title", o), t.title), void 0 !== t.price && t.price != this.options.price_unshown) {
                            var s = geByClass1("pretty-card__price_actual", o),
                                i = domPS(domPN(s));
                            val(s, t.price), this.priceInputChanged(s), this.togglePrice(i, !0)
                        }
                        if (void 0 !== t.price_old && t.price_old != this.options.price_unshown) {
                            var a = geByClass1("pretty-card__price_old", o),
                                n = domPS(domPN(a));
                            val(a, t.price_old), this.priceInputChanged(a), this.togglePrice(n, !0)
                        }
                        t.photo_url && this.setPhoto(o, t.photo_url), t.photo && (o.prettyCardPhoto = t.photo), t.allowed_buttons && (o.prettyCardAllowedButtons = t.allowed_buttons, t.button_key ? this.setButton(geByClass1("pretty-card__button", o), t.button_key, o.prettyCardAllowedButtons) : t.button_action && this.setButtonRaw(geByClass1("pretty-card__button", o), t.button_action, t.button_text))
                    }
                    this.wrapperTransitions(!1, o), addClass(o, "pretty-card_removing_yes"), this.cardsElements.splice(this.cardsElements.length - 1, 0, o), this.placeholderElement && (this.wrapperTransitions(!1, this.placeholderElement), this.wrapper.insertBefore(o, this.placeholderElement), addClass(this.placeholderElement, "pretty-card_adding_yes"), this.placeholderElement.offsetHeight), o.offsetHeight, this.wrapperTransitions(!0, this.placeholderElement), this.wrapperTransitions(!0, o), removeClass(o, "pretty-card_removing_yes"), this.placeholderElement && removeClass(this.placeholderElement, "pretty-card_adding_yes"), r ? setTimeout(function() {
                        e.placeholderElement && (re(e.placeholderElement), delete e.placeholderElement), e.cardsElements.splice(e.cardsElements.length - 1, 1), e.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DELAY) : setTimeout(this.scroll.bind(this, 0, !1), this.TRANSFORM_ANIMATION_DELAY), geByClass("pretty-card__price-adder", o).map(function(t) {
                        addEvent(t, "click", e.priceAdderClicked.bind(e, t)), addEvent(geByClass1("pretty-card__editor-button_type_remove", domNS(t)), "click", e.priceRemoverClicked.bind(e, t))
                    }), geByClass("pretty-card__price", o).map(function(t) {
                        return addEvent(t, "change blur", e.priceInputChanged.bind(e, t))
                    }), geByClass("pretty-card__price", o).map(function(t) {
                        return addEvent(t, "focus", e.priceInputFocused.bind(e, t))
                    });
                    var d = geByClass1("pretty-card__edit-button_action_remove", o);
                    addEvent(d, "click", function() {
                        window.tooltips && tooltips.destroyAll(e.el), e.placeholderElement || e.addPlaceholder();
                        var t = e.cardsElements.length,
                            r = e.cardsElements.indexOf(o);
                        e.wrapperTransitions(!0, o), addClass(o, "pretty-card_removing_yes");
                        for (var s = r + 1; s < t; ++s) {
                            var i = e.cardsElements[s];
                            e.wrapperTransitions(!0, i), setTimeout(addClass.pbind(i, "pretty-card_adding_yes"), (s - r - 1) * e.TRANSFORM_ANIMATION_DELAY)
                        }
                        o.offsetHeight;
                        for (var a = r + 1; a < t; ++a) {
                            e.cardsElements[a].offsetHeight
                        }
                        var n = (t - r - 2) * e.TRANSFORM_ANIMATION_DELAY + e.TRANSFORM_ANIMATION_DURATION;
                        e.cardsElements.splice(r, 1), e.scroll(0, !1), setTimeout(function() {
                            re(o);
                            for (var t = r; t < e.cardsElements.length; ++t) {
                                var s = e.cardsElements[t];
                                e.wrapperTransitions(!1, s), removeClass(s, "pretty-card_adding_yes")
                            }
                        }, n)
                    }), addEvent(d, "mouseover", function() {
                        showTooltip(d, {
                            text: getLang("wall_pretty_cards_remove_tt"),
                            black: 1,
                            appendParentCls: "pretty-cards",
                            shift: [7, 10]
                        })
                    }), addEvent(geByClass1("pretty-card__link-editor", o), "click", function() {
                        e.chooseUrl(function(t, r, s) {
                            o.prettyCardAllowedButtons = r, e.setLink(o, t, s)
                        }, o.prettyCardLink, e.options.owner_id)
                    });
                    var l = geByClass1("pretty-card__button", o);
                    addEvent(l, "click", this.buttonEditorClicked.bind(this, l, o)), addEvent(l, "mouseover", Page.actionsDropdownUnhide), addEvent(l, "mouseout", Page.actionsDropdownHide.bind(this, this.buttonEditorDropdown)), addEvent(geByClass1("pretty-card__button-remove", l), "click", this.buttonRemoveClicked.bind(this, l)), this.initPhotoUploader(o), addEvent(o, "mousedown", this.onCardMouseDown.bind(this, o)), addEvent(geByTag1("body"), "mouseup", this.onCardMouseUp.bind(this, o))
                }
            }, t.prototype.setLink = function(t, e, r) {
                var o = geByClass1("pretty-card__link-editor", t);
                o.innerHTML = r, t.prettyCardLink = e;
                var s = "tel:" === e.substr(0, 4);
                toggleClass(o, "pretty-card__link-editor_phone_yes", s)
            }, t.prototype.initPhotoUploader = function(t) {
                var e = geByClass1("pretty-card__upload-photo-button", t),
                    r = geByClass1("pretty-card__edit-button_action_photo", t),
                    o = geByClass1("pretty-card__upload-progress", t),
                    s = extend({}, this.options.upload_options_changed, {
                        clear: !0,
                        onUploadStart: this.onPhotoUploadStart.bind(this, o),
                        onUploadError: this.onPhotoUploadError.bind(this, o),
                        onUploadComplete: this.onPhotoUploadComplete.bind(this, o, t),
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
                debugLog("Upload started"), addClass(t, "pretty-card__upload-progress_shown_yes"), showProgress(t, "", "inv")
            }, t.prototype.onPhotoUploadError = function(t, e, r) {
                debugLog("Upload error, msg:", r), r = "При загрузке произошла ошибка, проверьте, что размер изображения не менее 400х400 пикселей и удовлетворяет требованиям.", showFastBox({
                    title: getLang("global_error")
                }, r), hideProgress(t), removeClass(t, "pretty-card__upload-progress_shown_yes"), Upload.embed(e)
            }, t.prototype.onPhotoUploadComplete = function(t, e, r, o) {
                var s;
                debugLog("Upload complete", e, r, o);
                try {
                    s = parseJSON(o)
                } catch (t) {}
                s && s.photo ? UploadPhotoTransform.getPhotoUrl(s, this.options.stored_photo_size_list, function(r) {
                    debugLog("Success uploading photo"), this.setPhoto(e, r), e.prettyCardPhoto = s.photo, hideProgress(t), removeClass(t, "pretty-card__upload-progress_shown_yes")
                }.bind(this), function() {
                    debugLog("Error uploading photo"), hideProgress(t), hide(t)
                }.bind(this)) : Upload.onUploadError(r)
            }, t.prototype.onPhotoUploadProgress = function(t, e, r) {
                debugLog("Upload progress")
            }, t.prototype.onPhotoUploadCheckComplete = function(t, e) {
                t.renewComplete ? Upload.embed(e) : (t.renewComplete = !0, setTimeout(UploadPhotoTransform.reinit.pbind(e), 1))
            }, t.prototype.setPhoto = function(t, e) {
                var r = geByClass1("pretty-card__photo", t),
                    o = geByClass1("pretty-card__photo-fader", t);
                setStyle(o, {
                    backgroundImage: "url(" + e + ")"
                }), hide(geByClass1("pretty-card__upload-photo-button", r)), addClass(o, "pretty-card__photo-fader_top_yes"), setTimeout(function() {
                    setStyle(r, {
                        backgroundImage: "url(" + e + ")"
                    }), removeClass(o, "pretty-card__photo-fader_top_yes"), removeClass(r, "pretty-card__photo_upload_yes")
                }, 200)
            }, t.prototype.onCardMouseDown = function(t, e) {
                if (!this.draggingCard && hasClass(e.target, "pretty-card__draghandle")) return this.draggingCard = t, this.draggingStartingX = e.clientX, this.draggingStartingTranslateX = this.translateX, this.draggingContainerX = this.wrapperOuter.getBoundingClientRect().left, this.cardDraggingPointX = e.clientX - t.getBoundingClientRect().left, this.lastDestinationCardIndex = this.cardsElements.indexOf(t), this.wrapperTransitions(!0, t), addClass(t, "pretty-card_dragging_yes"), addClass(t, "pretty-card_ontop_yes"), removeClass(t, "pretty-card_faded_yes"), setTimeout(this.wrapperTransitions.pbind(!1, t), this.TRANSFORM_ANIMATION_DURATION), e.cancelBubble = !0, e.returnValue = !1, !1
            }, t.prototype.onCardMouseUp = function(t) {
                var e = this;
                if (t === this.draggingCard) {
                    this.draggingCard && delete this.draggingCard;
                    var r = this.cardsElements.indexOf(t),
                        o = this.lastDestinationCardIndex;
                    this.cardsElements[o];
                    this.wrapperTransitions(!0, t), setStyle(t, {
                        transform: "translateX(" + (o - r) * (this.CARD_WIDTH + this.CARDS_MARGIN) + "px)"
                    }), removeClass(t, "pretty-card_dragging_yes"), setTimeout(function() {
                        removeClass(t, "pretty-card_ontop_yes");
                        var s = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var n, d = e.cardsElements[Symbol.iterator](); !(s = (n = d.next()).done); s = !0) {
                                var l = n.value;
                                e.wrapperTransitions(!1, l), removeClass(l, "pretty-card_dragging_right"), removeClass(l, "pretty-card_dragging_left"), setStyle(l, {
                                    transform: ""
                                })
                            }
                        } catch (t) {
                            i = !0, a = t
                        } finally {
                            try {
                                !s && d.return && d.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        if (r < o) {
                            for (var p = r + 1; p <= o; ++p) e.wrapper.insertBefore(e.cardsElements[p], e.cardsElements[r]);
                            e.cardsElements.splice(o + 1, 0, t), e.cardsElements.splice(r, 1)
                        } else if (r > o) {
                            for (var c = r - 1; c >= o; --c) e.wrapper.insertBefore(e.cardsElements[c], domNS(e.cardsElements[r]));
                            e.cardsElements.splice(r, 1), e.cardsElements.splice(o, 0, t)
                        }
                        e.scroll(0, !1)
                    }, this.TRANSFORM_ANIMATION_DURATION)
                }
            }, t.prototype.buttonEditorClicked = function(t, e, r) {
                var o = this,
                    s = e.prettyCardAllowedButtons,
                    i = domFC(this.buttonEditorDropdown);
                i.innerHTML = "", Object.keys(s).map(function(e) {
                    var r = se(o.options.button_action_template_html),
                        a = s[e];
                    r.innerHTML = a[1], addEvent(i.appendChild(r), "click", o.buttonActionClicked.bind(o, t, e, s))
                }), setStyle(this.buttonEditorDropdown, {
                    right: this.el.clientWidth - (e.offsetLeft + this.CARD_WIDTH) + this.CONTENT_PADDING + this.translateX,
                    top: e.clientHeight + this.POST_PADDING_TOP + t.offsetTop + t.clientHeight
                }), Page.actionsDropdown(this.buttonEditorDropdown)
            }, t.prototype.setButtonRaw = function(t, e, r) {
                removeClass(t, "button_contour"), addClass(t, "button_bright_blue"), geByClass1("pretty-card__button-editor-label", t).innerHTML = r
            }, t.prototype.setButton = function(t, e, r) {
                var o = r[e],
                    s = o[0],
                    i = o[1];
                this.setButtonRaw(t, s, i), t.prettyCardButtonKey = e
            }, t.prototype.buttonActionClicked = function(t, e, r) {
                this.setButton(t, e, r), Page.actionsDropdownHide(this.buttonEditorDropdown, 1)
            }, t.prototype.buttonRemoveClicked = function(t) {
                return addClass(t, "button_contour"), removeClass(t, "button_bright_blue"), geByClass1("pretty-card__button-editor-label", t).innerHTML = getLang("global_wall_pretty_cards_add_button"), Page.actionsDropdownHide(this.buttonEditorDropdown, 1), t.prettyCardButtonKey = "", !1
            }, t.prototype.togglePrice = function(t, e) {
                toggleClass(t, "pretty-card__price_hidden_yes", !!e), toggleClass(domNS(t), "pretty-card__price-wrapper_hidden_yes", !e)
            }, t.prototype.priceAdderClicked = function(t) {
                this.togglePrice(t, !0), elfocus(geByClass1("pretty-card__editor", domNS(t)))
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
                    var o = void 0;
                    o = 0 === (r = Math.max(r, intval(this.options.price_min))) ? getLang("wall_pretty_cards_price_free_val") : stripHTML(langNumeric(r, getLang("global_money_amount_rub_short", "raw"), !0)), val(t, o)
                } else {
                    var s = geByClass1("pretty-card__price-adder", gpeByClass("pretty-card__price-container", t));
                    this.togglePrice(s, !1)
                }
            }, t.prototype.scroll = function(t, e) {
                var r = this,
                    o = (this.container.clientWidth - 2 * this.POST_PADDING - this.VIEWPORT_CARDS * this.CARD_WIDTH - (this.VIEWPORT_CARDS - 1) * this.CARDS_MARGIN) / 2,
                    s = this.cardsElements.length;
                this.scrollPosition += t, this.scrollPosition = Math.max(0, this.scrollPosition), this.scrollPosition = Math.max(0, Math.min(this.cardsElements.length - this.VIEWPORT_CARDS, this.scrollPosition));
                var i = Math.max(0, s - this.scrollPosition - this.VIEWPORT_CARDS),
                    a = this.scrollPosition,
                    n = this.scrollPosition * (this.CARD_WIDTH + this.CARDS_MARGIN);
                !i && s > this.VIEWPORT_CARDS ? n -= 2 * o : a && (n -= o), this.translateX = n, e && (addClass(this.wrapper, "pretty-cards__wrapper_transition_long"), setTimeout(function() {
                    removeClass(r.wrapper, "pretty-cards__wrapper_transition_long")
                }, this.TRANSFORM_ANIMATION_DURATION_LONG)), setStyle(this.wrapper, "transform", "translateX(" + -n + "px)"), toggleClass(this.scrollerRight, "pretty-cards__scroller_hidden_right", !i), toggleClass(this.scrollerLeft, "pretty-cards__scroller_hidden_left", !a), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_left", t < 0), toggleClass(this.scrollerProtector, "pretty-cards__scroller_position_right", t >= 0), show(this.scrollerProtector);
                var d = null;
                return this.draggingCard && (d = this.cardsElements.indexOf(this.draggingCard)), this.cardsElements.map(function(t, e) {
                    return toggleClass(t, "pretty-card_faded_yes", d !== e && (e < r.scrollPosition || e >= r.scrollPosition + r.VIEWPORT_CARDS))
                }), !1
            }, t.prototype.updateCardsIds = function(t) {
                var e = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, i = this.cardsElements[Symbol.iterator](); !(e = (s = i.next()).done); e = !0) {
                        var a = s.value;
                        a.prettyCardId in t && (a.prettyCardId = t[a.prettyCardId])
                    }
                } catch (t) {
                    r = !0, o = t
                } finally {
                    try {
                        !e && i.return && i.return()
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
                    o = this.getSendData(),
                    s = o.attachVal,
                    i = o.prettyCardsData,
                    a = function(o, s, i) {
                        if ("ok" === o) r.updateCardsIds(s), r.updateSendDataHash(), t && t();
                        else if (e) {
                            if (e(s), i) {
                                var a = r.cardsElements.find(function(t) {
                                    return t.prettyCardId == i
                                });
                                if (a) {
                                    var n = r.cardsElements.indexOf(a) - r.scrollPosition,
                                        d = !1;
                                    n > r.VIEWPORT_CARDS - 1 ? (r.scroll(n - (r.VIEWPORT_CARDS - 1)), d = !0) : n < 0 && (r.scroll(n), d = !0);
                                    setTimeout(function() {
                                        addClass(a, "pretty-card_error_yes"), setTimeout(removeClass.pbind(a, "pretty-card_error_yes"), 1e3)
                                    }, d ? r.TRANSFORM_ANIMATION_DURATION + 300 : 300)
                                }
                            }
                            return !0
                        }
                    };
                ajax.post("al_wall.php", {
                    act: "a_pretty_cards_save",
                    pretty_cards_data: i,
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
                    o = !1,
                    s = void 0;
                try {
                    for (var i, a = this.cardsElements[Symbol.iterator](); !(r = (i = a.next()).done); r = !0) {
                        var n = i.value;
                        if (n !== this.placeholderElement) {
                            var d = geByClass1("pretty-card__price_actual", n),
                                l = val(d),
                                p = void 0;
                            hasClass(domPN(d), "pretty-card__price-wrapper_hidden_yes") ? p = this.options.price_unshown : "" === (p = l.replace(/\D+/g, "")) && l && (p = "0");
                            var c = geByClass1("pretty-card__price_old", n),
                                h = val(c),
                                _ = void 0;
                            hasClass(domPN(c), "pretty-card__price-wrapper_hidden_yes") ? _ = this.options.price_unshown : "" === (_ = h.replace(/\D+/g, "")) && h && (_ = "0");
                            var u = geByClass1("pretty-card__button", n),
                                g = n.prettyCardId,
                                y = {
                                    id: g,
                                    title: val(geByClass1("pretty-card__title", n)),
                                    price: p,
                                    price_old: _,
                                    button: u.prettyCardButtonKey ? u.prettyCardButtonKey : "",
                                    link: n.prettyCardLink,
                                    photo: n.prettyCardPhoto
                                };
                            e.push(g), t.push(y)
                        }
                    }
                } catch (t) {
                    o = !0, s = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (o) throw s
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