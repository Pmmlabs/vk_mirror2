! function(t) {
    function e(e) {
        for (var i, n, s = e[0], c = e[1], l = e[2], p = 0, h = []; p < s.length; p++) n = s[p], a[n] && h.push(a[n][0]), a[n] = 0;
        for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (t[i] = c[i]);
        for (d && d(e); h.length;) h.shift()();
        return o.push.apply(o, l || []), r()
    }

    function r() {
        for (var t, e = 0; e < o.length; e++) {
            for (var r = o[e], i = !0, s = 1; s < r.length; s++) {
                var c = r[s];
                0 !== a[c] && (i = !1)
            }
            i && (o.splice(e--, 1), t = n(n.s = r[0]))
        }
        return t
    }
    var i = {},
        a = {
            "web/article": 0
        },
        o = [];

    function n(e) {
        if (i[e]) return i[e].exports;
        var r = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = i, n.d = function(t, e, r) {
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
            for (var i in t) n.d(r, i, function(e) {
                return t[e]
            }.bind(null, i));
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
    var s = window.webpackJsonp = window.webpackJsonp || [],
        c = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var l = 0; l < s.length; l++) e(s[l]);
    var d = c;
    o.push([59, "common", "6deb4edfcbfb465064078145a4a266bf"]), r()
}({
    59: function(t, e, r) {
        t.exports = r("f68Q")
    },
    f68Q: function(t, e, r) {
        "use strict";
        r.r(e);
        var i = r("u2Gu"),
            a = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var o = window.domReplaceEl,
            n = window.browser && (browser.mozilla || browser.safari),
            s = void 0,
            c = function() {
                function t(e, r, i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._mediaId = e, this._editor = r, this._highlighted = !1, this._isCaptioned = !!i, s = this.getEditor().getOptions().multiMediasSeparator
                }
                return t.prototype.isCaptioned = function() {
                    return this._isCaptioned
                }, t.prototype.getEditor = function() {
                    return this._editor
                }, t.prototype.getMediaIdsCount = function() {
                    return this._mediaId.split(s).length
                }, t.prototype.getMediaId = function(t) {
                    return void 0 !== t ? this._mediaId.split(s)[t] : this._mediaId
                }, t.prototype.setMediaId = function(t) {
                    this._mediaId = t
                }, t.prototype.highlight = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (t != this._highlighted) {
                        this._highlighted = t;
                        var r = this.el();
                        if (t) {
                            var a = getSize(r),
                                o = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>');
                            setStyle(o, {
                                width: a[0] + 0,
                                height: a[1] + 0
                            }), addClass(r, "article_ed__object_highlighted")
                        } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted");
                        if (this._isCaptioned)
                            if (t) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), e || Object(i.o)(this._getCaptionEl(), !0);
                            else {
                                var n = this.isEmptyCaption();
                                this._toggleCaptionPlaceholder(n), this._toggleCaption(!n)
                            }
                    }
                }, t.prototype.render = function() {}, t.prototype.appendObjectInnerEl = function() {
                    var t = this.render();
                    addClass(t, "article_object_el"), t.setAttribute("contenteditable", "false");
                    var e = geByClass1("article_object_el", this._objectEl);
                    if (e) o(e, t);
                    else {
                        var r = geByClass1("article_ed__img_inner", this._objectEl);
                        r.insertBefore(t, r.firstChild)
                    }
                }, t.prototype.el = function() {
                    var t = this;
                    if (!this._objectEl) {
                        var e = this.render();
                        addClass(e, "article_object_el"), e.setAttribute("contenteditable", "false");
                        var r = this.getEditor().isLocked() ? "false" : "true",
                            a = browser.mozilla ? 'contenteditable="' + r + '"' : 'contenteditable="false"';
                        this._objectEl = se("<figure " + a + "></figure>");
                        var o = this.renderExtraControlsEl();
                        if (o) {
                            var s = se('<div class="article_ed__img_wrapper"></div>'),
                                c = se('<div class="article_ed__img_inner"></div>');
                            o.setAttribute("contenteditable", "false"), addClass(o, "article_ed__extra_controls"), c.appendChild(o), s.appendChild(c), this._objectEl.appendChild(s), this.appendObjectInnerEl()
                        } else this._objectEl.appendChild(e);
                        this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="' + r + '"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), n && e.addEventListener("click", function() {
                            t.highlight(!0), Object(i.o)(e)
                        })
                    }
                    return this._setLoadingEl(), this._objectEl
                }, t.prototype.renderExtraControlsEl = function() {
                    return !1
                }, t.prototype.setLoadingState = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    !!this._isLoading != t && (this._isLoading = t, this._setLoadingEl(e), toggleClass(this._objectEl, "article_ed__object_loading", t), t || this.getEditor().onObjectStateLoaded(this))
                }, t.prototype.isLoading = function() {
                    return !!this._isLoading
                }, t.prototype._setLoadingEl = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this._objectEl) {
                        if (re(geByClass1("article_ed___object_loading_placeholder", this._objectEl)), this._isLoading) {
                            var e = se('<div class="article_ed___object_loading_placeholder"></div>');
                            toggleClass(e, "article_ed__object_loading_white", t), domInsertBefore(e, this._objectEl.firstChild)
                        }
                        toggleClass(this._objectEl, "article_ed___object_loading", !!this._isLoading)
                    }
                }, t.prototype.getCaptionEl = function() {
                    return !!this._isCaptioned && this._getCaptionEl()
                }, t.prototype.isCaptionFocused = function() {
                    return !!this._isCaptioned && this._isFocusInCaption()
                }, t.prototype.setCaptionElHtml = function(t) {
                    if (this._isCaptioned) {
                        t = t.trim();
                        var e = this._getCaptionEl();
                        e.innerHTML != t && (e.innerHTML = t), this._toggleCaptionPlaceholder(!t), this._toggleCaption(!!t)
                    }
                }, t.prototype.isEmptyCaption = function() {
                    return !this._getCaptionEl().textContent.trim()
                }, t.prototype._getCaptionEl = function() {
                    return geByClass1("article_ed__figcaption_edit", this._captionEl)
                }, t.prototype._toggleCaption = function(t) {
                    toggleClass(this._captionEl, "article_ed__figcaption_visible", t)
                }, t.prototype._toggleCaptionPlaceholder = function(t) {
                    void 0 !== this._captionPlaceholderShown && this._captionPlaceholderShown === t || (this._captionPlaceholderShown = toggle(geByClass1("article_ed__caption_placeholder", this._captionEl), t))
                }, t.prototype._isFocusInCaption = function() {
                    var t = this,
                        e = Object(i.u)(),
                        r = a(e, 2),
                        o = r[0],
                        n = function(e) {
                            var r = t._captionEl;
                            return !!traverseParent(e, function(t) {
                                return t == r
                            }, 10)
                        };
                    if (r[1]) return n(o.startContainer);
                    var s = n(o.startContainer),
                        c = n(o.endContainer);
                    return s && c
                }, t
            }();
        var l = {};

        function d(t) {
            return (t = t.split("_"))[0] + "_" + t[1]
        }
        var p = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return t.add = function(t, e, r) {
                    l[t] = l[t] || {}, l[t][d(e)] = r
                }, t.get = function(t, e, r) {
                    return void 0 !== r && (e = (e = e.split(","))[r]), l[t] = l[t] || {}, l[t][d(e)]
                }, t
            }(),
            h = r("sWID"),
            _ = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var u = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this;
                    this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                    var e = p.get(h.b.ObjectAudioPlaylist, this.getMediaId());
                    if (e.snippet) this._el.innerHTML = e.snippet;
                    else {
                        var r = this.getMediaId().split("_"),
                            i = _(r, 2),
                            a = i[0],
                            o = i[1];
                        this.setLoadingState(!0), ajax.post("al_articles.php", {
                            act: "get_audioplaylist_snippet",
                            pl_owner_id: a,
                            pl_id: o,
                            pl_access_hash: e.accessHash
                        }, {
                            onDone: function(e) {
                                t.setLoadingState(!1), t._el.appendChild(se(e))
                            }
                        })
                    }
                    return this._el.appendChild(se('<div class="article_ed__audioplaylist_play_note" contenteditable="false">' + getLang("pages_articles_editor_audio_play_note") + "</div>")), this._el
                }, e
            }(c),
            f = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function g(t, e) {
            return t ? '<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="' + e + '">\n      <div class="article_ed__caredit_photo" style="background-image: url(' + t + ')"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>' : '<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">' + getLang("pages_article_ed_carousel_add") + "</div>\n    </button>"
        }
        var v = function() {
                function t(e, r, i, a) {
                    var o = this;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                    n += '\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ' + getLang("pages_article_ed_carousel_title") + '\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">' + getLang("global_save") + '</button>\n            <button class="flat_button article_ed__caredit_cancel">' + getLang("global_cancel") + "</button>\n          </div>\n         </div>\n      </div>\n    ", n += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', r.getMediaId().split(",").forEach(function(t) {
                        var e = p.get(h.b.ObjectPhoto, t),
                            r = Object(h.d)(e.sizes, 251),
                            i = f(r, 1)[0];
                        n += g(i, t)
                    }), n += g(), n += "  </div>", n += "</div>", n += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(n), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", function() {
                        showBox("al_photos.php", {
                            to_id: r.getEditor().getArticleOwnerId(),
                            act: "choose_photo",
                            max_files: o._limit - o._medias.length,
                            article: 1
                        }, {
                            cache: 1,
                            stat: ["photos.js", "photos.css", "upload.js"]
                        });
                        cur.chooseMedia = o.onPhotoAdd.bind(o), cur.showMediaProgress = function() {
                            show(o._els.loading), r.getEditor().setMediaUploadMode(!0)
                        }, cur.choosePhotoUploadedAll = function() {
                            hide(o._els.loading), r.getEditor().setMediaUploadMode(!1)
                        }
                    }), this._els.saveButton.addEventListener("click", function() {
                        re(o._els.editor), i(o._medias.join(","))
                    }), this._onSave = i, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", function(t) {
                        if (hasClass(t.target, "article_ed__caredit_remove")) {
                            var e = gpeByClass("article_ed__caredit_item", t.target);
                            re(e), o._collectMediaIds(), o._initSorter(), o._toggleAddButton(), o._updateCounter()
                        }
                    }), e.appendChild(this._els.editor), setStyle(this._els.itemsWrap, {
                        height: getSize(this._els.itemsWrap)[1]
                    }), this._initSorter(), this._scroll = new uiScroll(this._els.itemsWrap, {
                        global: !0,
                        stopScrollPropagation: !0,
                        stopScrollPropagationAlways: !0,
                        theme: "dark"
                    }), this._limit = a, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
                }
                return t.prototype.cancel = function() {
                    re(this._els.editor), this._onSave(this._originalMedias.join(","))
                }, t.prototype._updateCounter = function() {
                    this._els.counter.innerHTML = langNumeric(this._medias.length, cur.lang.pages_aricle_ed_carousel_counter)
                }, t.prototype._toggleAddButton = function() {
                    toggle(this._els.addButton, this._medias.length < this._limit), this._scroll.update()
                }, t.prototype._collectMediaIds = function() {
                    var t = this;
                    return this._medias = [], each(this._els.items.children, function(e, r) {
                        var i = domData(r, "media-id");
                        i && t._medias.push(i)
                    }), this._medias = this._medias.slice(0, this._limit), this._medias
                }, t.prototype.onPhotoAdd = function(t, e, r, a) {
                    if (!inArray(e, this._medias) && this._medias.length < this._limit) {
                        p.add(h.b.ObjectPhoto, e, {
                            size: Object(i.t)(r.editable.sizes),
                            sizes: r.editable.sizes
                        });
                        var o = Object(h.d)(r.editable.sizes, 251),
                            n = f(o, 1)[0];
                        domInsertBefore(se(g(n, e)), this._els.addButton)
                    }
                    return void 0 === a && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
                }, t.prototype._initSorter = function() {
                    var t = this;
                    this._sorter ? this._sorter.update() : stManager.add(["grid_sorter.js"], function() {
                        t._sorter = new GridSorter(t._els.items, "", {
                            onReorder: function() {
                                t._collectMediaIds()
                            }
                        })
                    })
                }, t
            }(),
            b = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var y = void 0,
            m = function(t) {
                function e(r, i, a) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var o = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, i, !0));
                    return o._currentImageIndex = 0, o.paragraph = a, o
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
                }(e, t), e.prototype.cancelCarouselEditor = function() {
                    this._carouselEditor && this._carouselEditor.cancel()
                }, e.prototype.renderExtraControlsEl = function() {
                    var t = this,
                        e = se('\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">' + getLang("pages_article_ed_create_carousel") + '</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    ');
                    this._carouselControlsEl = e;
                    var r = geByClass1("article_ed__carousel_btn_edit", e),
                        i = geByClass1("article_ed__carousel_nav_btn_left", e),
                        a = geByClass1("article_ed__carousel_nav_btn_right", e),
                        o = function() {
                            var e = t.getMediaIdsCount() > 1;
                            r.innerHTML = e ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                        };
                    return o(), r.addEventListener("click", function(r) {
                        var i = t.getEditor();
                        return i.closeAllCarouselEditors(), i._resizeTooltip && i._resizeTooltip.hide(), addClass(t._objectEl, "article_ed__carousel_edit_open"), t._carouselEditor = new v(e, t, function(r) {
                            r ? (delete t._fixedImageSize, t.setMediaId(r), t.appendObjectInnerEl(), t.getEditor().saveUndoStateAndDraft(), o(), t._setImageIndex(0, e), removeClass(t._objectEl, "article_ed__carousel_edit_open"), delete t._carouselEditor) : t.getEditor().removeObject(t)
                        }, t.getEditor().getLimits().maxCarouselItems), cancelEvent(r)
                    }), i.addEventListener("click", function() {
                        t._onCarouselNavBtnClicked(!0)
                    }), a.addEventListener("click", function() {
                        t._onCarouselNavBtnClicked(!1)
                    }), this._setImageIndex(0), e
                }, e.prototype._onCarouselNavBtnClicked = function(t) {
                    var e = this.getEditor();
                    this._setImageIndex(this.getImageIndex() + (t ? -1 : 1));
                    var r = e.getObjectParagraphIndex(this.paragraph);
                    r >= 0 ? (e.setParagraphDirty(r), e.redraw(!1)) : e.redraw(!0), this.isCaptionFocused() && Object(i.o)(this.getCaptionEl(), !0)
                }, e.prototype.getImageIndex = function() {
                    return Math.min(this.getMediaIdsCount() - 1, this._currentImageIndex)
                }, e.prototype._setImageIndex = function(t) {
                    this._currentImageIndex = Math.min(Math.max(0, t), this.getMediaIdsCount());
                    var e = geByClass1("article_ed__carousel_nav_btn", this._carouselControlsEl);
                    toggleClass(e, "no_left", 0 == this._currentImageIndex), toggleClass(e, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._objectEl, "article__carousel", this._isCarousel());
                    var r = geByClass1("article_ed__carousel_counter", this._carouselControlsEl);
                    this._isCarousel() ? (setStyle(r, "display", "inline-block"), r.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(r), this._drawImage(), this.highlight()
                }, e.prototype.render = function() {
                    this._el = se('\n      <div class="article_ed__img_content">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                    var t = p.get(h.b.ObjectPhoto, this.getMediaId(), 0);
                    return t && t.sizes ? (this.setLoadingState(!1), this._drawImage()) : this.setLoadingState(!0), this._el
                }, e.prototype._initUpload = function() {
                    var t = this;
                    if (void 0 === this._upload) {
                        var e = this.getEditor().getPhotoUploadOptions();
                        this._upload = Upload.init(this.getEditor().getPhotoUploadEl(), e.url, e.params, {
                            file_name: "photo",
                            file_size_limit: 15728640,
                            file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                            file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF",
                            file_input: null,
                            accept: "image/jpeg,image/png,image/gif",
                            wiki_editor: 0,
                            noCheck: !0,
                            customShowProgress: function() {},
                            onUploadStart: function(t, e) {},
                            onUploadComplete: function(e, r) {
                                r = JSON.parse(r), isEmpty(r) ? t._onUploadCallback && t._onUploadCallback() : ajax.post("al_photos.php", extend({
                                    act: "choose_uploaded"
                                }, r), {
                                    onDone: function(e, r) {
                                        t._mediaId = e, p.add(h.b.ObjectPhoto, e, {
                                            size: Object(i.t)(r.editable.sizes),
                                            sizes: r.editable.sizes
                                        }), t._drawImage(), t._onUploadCallback && t._onUploadCallback(), t.getEditor().saveUndoStateAndDraft()
                                    }
                                })
                            },
                            onUploadProgress: function() {},
                            onCheckServerFailed: function() {},
                            onUploadCompleteAll: function() {},
                            noFlash: 1,
                            max_files: 20,
                            chooseBox: 1,
                            clear: 1,
                            type: "photo",
                            max_attempts: 3,
                            server: e.opts.server,
                            error: e.opts.default_error,
                            error_hash: e.opts.error_hash
                        })
                    }
                }, e.prototype._getImageEl = function() {
                    return geByTag1("img", this._el)
                }, e.prototype.setBLOB = function(t, e) {
                    var r = this;
                    this._onUploadCallback = e;
                    var i = new FileReader;
                    i.onload = function() {
                        r._initUpload(), Upload.onFileApiSend(r._upload, [t])
                    }, i.readAsDataURL(t)
                }, e.prototype._updateSize = function() {}, e.prototype._drawImage = function() {
                    var t = this,
                        e = p.get(h.b.ObjectPhoto, this.getMediaId(), this.getImageIndex()),
                        r = 720;
                    switch (parseInt(this.paragraph.mode)) {
                        case 1:
                            r = 350;
                            break;
                        case 2:
                            r = 920;
                            break;
                        case 3:
                            r = window.innerWidth
                    }
                    if (e) {
                        var i = Object(h.d)(e.sizes, r),
                            a = b(i, 1)[0],
                            o = this._getImageEl(),
                            n = !1;
                        o.onload = function() {
                            clearTimeout(y), n = !0, setStyle(o, "visibility", "visible"), show(o), t.setLoadingState(!1), t._isCarousel() && t._fixSize()
                        }, o.src = a, clearTimeout(y), n || (y = setTimeout(function() {
                            n || (setStyle(o, "visibility", "hidden"), t.setLoadingState(!0, t._isCarousel()))
                        }, 10)), this._updateSize()
                    }
                }, e.prototype._isCarousel = function() {
                    return this.getMediaIdsCount() > 1
                }, e.prototype._fixSize = function() {
                    this._fixedImageSize = getSize(this._el), this._fixedImageSize[0] = Math.ceil(this._fixedImageSize[0]), this._fixedImageSize[1] = Math.ceil(this._fixedImageSize[1]), setStyle(this._el, {
                        height: this._fixedImageSize[1] + "px"
                    }), setStyle(this._getImageEl(), {
                        "max-width": this._fixedImageSize[0],
                        "max-height": this._fixedImageSize[1]
                    })
                }, e.prototype._isSmallPhotoSize = function() {
                    var t = p.get(h.b.ObjectPhoto, this.getMediaId(), 0);
                    return !(!t && !t.size) && t.size[0] >= 720
                }, e
            }(c);
        var O = function(t) {
            function e(r, i) {
                return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, i, !0))
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
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var t = p.get(h.b.ObjectVideo, this.getMediaId());
                if (t && (t.editable || t.thumb)) {
                    var e = void 0;
                    if (t.thumb) e = t.thumb;
                    else e = Object(h.d)(t.editable.sizes, this.getEditor().getWidth(!0))[0];
                    this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: t.duration || 0,
                        platform: t.platform || ""
                    }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>")), this._el.appendChild(se('<img class="article_ed__video_img" src=' + e + ' contenteditable="false" />'))
                }
                return this._el
            }, e.prototype.onViewport = function(t) {}, e.prototype.onRender = function() {}, e
        }(c);
        var j = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this;
                    this._el = se('\n      <div class="article_ed__gif_content"></div>\n    ');
                    var e = p.get(h.b.ObjectGIF, this.getMediaId());
                    if (e)
                        if (e.video) {
                            if (this._videoEl = ce("video", {
                                    autoplay: !0,
                                    loop: "loop",
                                    muted: !0,
                                    src: e.video + "&mp4=1"
                                }), e.size) {
                                var r = e.size[0] < e.size[1],
                                    i = !this._isSmallGifSize();
                                (r || i) && setStyle(this._videoEl, {
                                    width: e.size[0]
                                })
                            }
                            this._el.appendChild(this._videoEl), this._el.appendChild(se('<span class="article_ed__select_dummy">&nbsp;</span>'))
                        } else if (e.href) {
                        var a = e.href + "&wnd=1&module=" + cur.module;
                        this._imgEl = ce("img"), this._imgEl.addEventListener("error", function() {
                            showFastBox(getLang("pages_article_error_box_title"), getLang("pages_article_error_box_text")), t._editor.removeObject(t)
                        }), this._imgEl.src = a, this._el.appendChild(this._imgEl)
                    }
                    return this._el
                }, e.prototype.onViewport = function(t) {
                    if (this._imgEl) setStyle(this._imgEl, "visibility", t ? "visible" : "hidden");
                    else if (t) {
                        var e = this._videoEl.play();
                        e && e.catch(function() {})
                    } else this._videoEl.pause()
                }, e.prototype.onRender = function() {
                    var t = this;
                    setTimeout(function() {
                        var e = t._videoEl && t._videoEl.play();
                        if (e && e.catch(function() {}), browser.msie && t._videoEl) {
                            var r = t._videoEl.src;
                            t._videoEl.src = "", t._videoEl.src = r
                        }
                    })
                }, e.prototype._isSmallGifSize = function() {
                    var t = p.get(h.b.ObjectGIF, this.getMediaId());
                    return !(!t || !t.size) && t.size[0] > this.getEditor().getOptions().minGifWidthExpand
                }, e
            }(c),
            E = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var C = function(t) {
            function e(r, i) {
                return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, i, !0))
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
                var t = this;
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = p.get(h.b.ObjectPodcast, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var r = this.getMediaId().split("_"),
                        i = E(r, 2),
                        a = i[0],
                        o = i[1];
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_podcast_snippet",
                        owner_id: a,
                        podcast_id: o
                    }, {
                        onDone: function(e) {
                            t.setLoadingState(!1), t._el.appendChild(se(e))
                        }
                    })
                }
                return this._el.appendChild(se('<div class="article_ed__audioplaylist_play_note" contenteditable="false">' + getLang("pages_articles_editor_audio_play_note") + "</div>")), this._el
            }, e
        }(c);
        var w = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = p.get(h.b.ObjectAudio, this.getMediaId()).audio,
                        e = AudioUtils.drawAudio(t);
                    return this._el = se('\n      <div class="article_object_audio">' + e + "</div>\n    "), this._el
                }, e
            }(c),
            P = [{
                pattern: /\s-\s$/,
                substitution: " — "
            }, {
                pattern: /^-\s$/,
                substitution: "— "
            }, {
                pattern: /--\s$/,
                substitution: "— "
            }, {
                pattern: /\s"$/,
                substitution: " “",
                noUndo: !0,
                cyrillic: !1
            }, {
                pattern: /(\S)"$/,
                substitution: "$1”",
                noUndo: !0,
                cyrillic: !1
            }, {
                pattern: /^"$/,
                substitution: "“",
                noUndo: !0,
                cyrillic: !1
            }, {
                pattern: /\s"$/,
                substitution: " «",
                noUndo: !0,
                cyrillic: !0
            }, {
                pattern: /(\S)"$/,
                substitution: "$1»",
                noUndo: !0,
                cyrillic: !0
            }, {
                pattern: /^"$/,
                substitution: "«",
                noUndo: !0,
                cyrillic: !0
            }, {
                pattern: "+/-",
                substitution: "±"
            }, {
                pattern: "+-",
                substitution: "±"
            }, {
                pattern: "^2",
                substitution: "²"
            }, {
                pattern: "^3",
                substitution: "³"
            }, {
                pattern: "<<",
                substitution: "«"
            }, {
                pattern: ">>",
                substitution: "»"
            }, {
                pattern: "(c)",
                substitution: "©"
            }, {
                pattern: "(C)",
                substitution: "©"
            }, {
                pattern: "(r)",
                substitution: "®"
            }, {
                pattern: "(R)",
                substitution: "®"
            }, {
                pattern: "1/2",
                substitution: "½"
            }, {
                pattern: "1/4",
                substitution: "¼"
            }, {
                pattern: "3/4",
                substitution: "¾"
            }, {
                pattern: "...",
                substitution: "…"
            }, {
                pattern: "->",
                substitution: "→"
            }, {
                pattern: "<-",
                substitution: "←"
            }, {
                pattern: "!=",
                substitution: "≠"
            }, {
                pattern: "<=",
                substitution: "≤"
            }, {
                pattern: ">=",
                substitution: "≥"
            }];

        function x(t) {
            return JSON.parse(JSON.stringify(t))
        }

        function T(t, e, r) {
            var a = [];
            return t.forEach(function(t, o) {
                r && !Object(i.D)(t) && Object(i.H)(t) && 0 != o && t.type != h.b.Code || a.push(function(t, e) {
                    var r = {};
                    for (var a in t) {
                        if (!t.hasOwnProperty(a)) return;
                        if (!a.startsWith("_") || "_uuid" === a && e) {
                            var o = t[a];
                            r[a] = isObject(o) || isArray(o) ? x(o) : o
                        }
                    }
                    return Object(i.D)(t) && t._object && (r.mediaId = t._object.getMediaId()), t.sep && (r.sep = 1), r.type == h.b.Text && delete r.type, r.lines.forEach(function(t) {
                        if (t) {
                            if (void 0 !== t.decorations) {
                                var e = !0;
                                each(t.decorations, function(r, i) {
                                    0 == i.length ? delete t.decorations[r] : e = !1
                                }), e && delete t.decorations
                            }
                            t.brs && 0 == t.brs.length && delete t.brs
                        }
                    }), r
                }(t, e))
            }), x(a)
        }

        function I(t) {
            return t.forEach(function(t) {
                t.type = t.type || h.b.Text, t.lines.forEach(function(t) {
                    t.brs = t.brs || [], t.decorations = t.decorations || {}
                })
            }), t
        }
        var S = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this;
                    return this._el = se('<div class="article_object_embed"></div>'), this.setLoadingState(!0), loadScript("https://platform.twitter.com/widgets.js", {
                        onLoad: function() {
                            t.setLoadingState(!1), twttr.widgets.createTweet(t.getMediaId(), t._el, {
                                align: "center",
                                lang: window.vk && 0 == window.vk.lang ? "ru" : "en",
                                dnt: !0
                            }).then(function() {})
                        }
                    }), this._el
                }, e
            }(c),
            k = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var L = function(t) {
            function e(r, i) {
                return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, i, !0))
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
                var t = this,
                    e = this.getMediaId().split("_"),
                    r = k(e, 2),
                    i = r[0],
                    a = r[1];
                this._el = se('<div class="article_object_embed fb-post" data-href="https://www.facebook.com/' + i + "/posts/" + a + '/" data-width="auto"></div>'), this.setLoadingState(!0);
                var o = window.vk && 0 == window.vk.lang ? "ru_RU" : "en_US";
                return loadScript("https://connect.facebook.net/" + o + "/all.js#xfbml=1&amp;version=v2.8", {
                    onLoad: function() {
                        setTimeout(function() {
                            FB.XFBML.parse(window.bodyNode, function() {
                                t.setLoadingState(!1)
                            })
                        }, 0)
                    }
                }), this._el
            }, e
        }(c);
        var M = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this;
                    return this._el = se('\n      <blockquote class="article_object_embed article_embed_spacer instagram-media" data-instgrm-version="7">\n        <a href="https://instagram.com/p/' + this.getMediaId() + '/embed"></a>\n      </blockquote>\n    '), this.setLoadingState(!0), loadScript("https://www.instagram.com/embed.js", {
                        onLoad: function() {
                            setTimeout(function() {
                                window.instgrm.Embeds.process(), t.setLoadingState(!1)
                            }, 0)
                        }
                    }), this._el
                }, e
            }(c),
            A = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var D = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this;
                    return this._el = se('<div class="article_object_embed"></div>'), setTimeout(function() {
                        var e = t.getMediaId().split("_"),
                            r = A(e, 2),
                            i = r[0],
                            a = r[1],
                            o = domData(t._objectEl, "uuid"),
                            n = "vk_post_" + t.getMediaId() + "_" + o;
                        t._el.setAttribute("id", n), t.setLoadingState(!0), loadScript("https://vk.com/js/api/openapi.js", {
                            onLoad: function() {
                                ajax.post("dev.php", {
                                    act: "a_get_post_hash",
                                    post: t.getMediaId()
                                }, {
                                    onDone: function(e) {
                                        e && (t.setLoadingState(!1), window.VK && window.VK.Widgets && window.VK.Widgets.Post("" + n, i, a, e, {
                                            base_domain: location.origin
                                        }))
                                    }
                                })
                            }
                        })
                    }, 0), this._el
                }, e
            }(c),
            N = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var B = function(t) {
                function e(r, i) {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i, !0))
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
                    var t = this,
                        e = this.getMediaId().split("_"),
                        r = N(e, 2),
                        i = r[0],
                        a = r[1];
                    return this._el = se('<div class="article_object_embed"><blockquote class="telegram-post" data-telegram-post="' + i + "/" + a + '" data-width="100%" data-userpic="true"></div>'), this.setLoadingState(!0), loadScript("https://telegram.org/js/telegram-widget.js?5", {
                        onLoad: function() {
                            t.setLoadingState(!1)
                        }
                    }), this._el
                }, e
            }(c),
            H = void 0;

        function U(t) {
            var e = [];
            t.length > H.maxParagraphs && e.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", t.length).replace("{limit}", H.maxParagraphs));
            var r = 0,
                a = 0;
            return t.forEach(function(t) {
                var o = 0;
                t.lines.forEach(function(t) {
                    t && (r += t.text.length, o += t.text.length)
                }), Object(i.D)(t) && a++, o > H.maxSymbolsPerParagraph && e.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", o).replace("{limit}", H.maxSymbolsPerParagraph))
            }), r > H.maxSymbols && e.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", H.maxSymbols)), a > H.maxObjects && e.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", H.maxObjects)), e.length && e.push(getLang("pages_article_ed_limit")), e.join("<br>")
        }
        var z = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return t._saveChunk = function(t, e, r, i, a) {
                    ajax.post("al_articles.php", {
                        act: "save_text_chunk",
                        article_owner_id: t,
                        hash: i,
                        chunk_index: r,
                        Article_text: JSON.stringify(e)
                    }, {
                        onDone: function(t) {
                            a(t)
                        },
                        onError: function() {
                            a(!0)
                        }
                    })
                }, t._saveFinally = function(t, e, r, i, a, o, n, s, c, l) {
                    c = c ? JSON.stringify(c) : "", ajax.post("al_articles.php", extend({
                        act: "save",
                        article_owner_id: t,
                        article_id: e,
                        cover_photo_id: a,
                        name: i,
                        is_published: intval(r),
                        chunks_count: s,
                        Article_text: c,
                        hash: n
                    }, o || {}), {
                        onDone: l,
                        onFail: function(t) {
                            return t.startsWith("locked ") ? (l(t), !0) : t ? (showFastBox(getLang("global_error"), t), l(!0), !0) : void 0
                        }
                    })
                }, t.save = function(e, r, i, a, o, n, s, c, l, d) {
                    var p = [],
                        h = [],
                        _ = 0;
                    if (i.forEach(function(t) {
                            var e = 0;
                            t.lines.forEach(function(t) {
                                e += t.text.length, t.decorations && t.decorations.link && t.decorations.link.forEach(function(t) {
                                    e += (t[2] || "").length
                                })
                            }), (_ += e) >= c && (p.push(h), _ = e, h = []), h.push(t)
                        }), h.length && p.push(h), p.length > 1) {
                        var u = new CallHub(function() {
                            t._saveFinally(e, r, a, o, n, l, s, p.length, !1, d)
                        }, p.length);
                        p.forEach(function(r, i) {
                            t._saveChunk(e, r, i, s, function(t) {
                                t ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : u.done()
                            })
                        })
                    } else t._saveFinally(e, r, a, o, n, l, s, 0, i, d)
                }, t
            }(),
            F = r("zxIV"),
            R = r("8+we"),
            W = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var n, s = t[Symbol.iterator](); !(i = (n = s.next()).done) && (r.push(n.value), !e || r.length !== e); i = !0);
                        } catch (t) {
                            a = !0, o = t
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var G = window,
            Q = G.cur,
            V = G.browser,
            J = G.each,
            Y = G.addClass,
            K = G.geByTag1,
            $ = G.geByClass1,
            X = G.extractUrls,
            q = G.removeClass,
            Z = G.domClosestByTag,
            tt = G.hasClass,
            et = G.domData,
            rt = G.getSize,
            it = G.getXY,
            at = G.re,
            ot = G.se,
            nt = G.domInsertBefore,
            st = G.traverseParent,
            ct = G.extend,
            lt = G.toggleClass,
            dt = G.trim,
            pt = G.domInsertAfter,
            ht = G.gpeByClass,
            _t = G.clean,
            ut = G.domReplaceEl,
            ft = G.isObject,
            gt = G.ge,
            vt = G.domChildIndex,
            bt = G.domNS,
            yt = (G.lineHtml, 65),
            mt = 66,
            Ot = 67,
            jt = 73,
            Et = 83,
            Ct = 89,
            wt = 90,
            Pt = 8,
            xt = 13,
            Tt = 38,
            It = 40,
            St = 46,
            kt = 9,
            Lt = [{
                type: "strong",
                tag: "strong"
            }, {
                type: "em",
                tag: "em"
            }, {
                type: "strike",
                tag: "strike"
            }, {
                type: "link",
                tag: "a"
            }, {
                type: "code",
                tag: "code"
            }],
            Mt = Lt.slice().reverse(),
            At = {};
        J(Lt, function(t, e) {
            At[e.tag] = e
        });
        var Dt = {};
        J(Lt, function(t, e) {
            Dt[e.type] = e
        });
        var Nt = 1;

        function Bt() {
            return Nt++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        var Ht = function() {
            function t(e, r, a) {
                var o, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._id = Bt(), Q.lang = Q.lang || {}, ct(Q.lang, n.lang), this._options = n, this._els = {
                    editor: gt(e),
                    canvas: ot('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = ot('<div class="article_photo_upload"></div>')), Y(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [], o = n.limits, H = o;
                var s = a || [];
                if (n.postData) {
                    var c = n.postData.text || "";
                    c = (c = c.replace(/❤/g, "❤️")).split("\n");
                    var l = [];
                    l.push(Object(i.e)({
                        type: h.b.Header1,
                        lines: [{
                            text: ""
                        }]
                    })), c.forEach(function(t) {
                        dt(t) && l.push(Object(i.e)({
                            lines: [{
                                text: _t(t)
                            }]
                        }))
                    }), s = l.concat(s)
                }
                s && 0 != s.length || (s = [Object(i.e)({
                    type: this._options.noTitle ? h.b.Text : h.b.Header1
                })]), (s = s.filter(function(t) {
                    return !1 !== t
                })).forEach(function(t) {
                    t.lines.forEach(function(t) {
                        t.text = Object(i.R)(t.text), t.brs && ft(t.brs) && (t.brs = Object(i.j)(t.brs))
                    })
                }), n.needIndexCorrection && Object(i.k)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(), this._initObjectDrag(), n.postData ? Object(i.o)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), n.coverPhoto && this.setCoverPhoto(n.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this.updateWarnInfos(), this._publishNameCandidate = n.name || this._getName(), this._saveUndoState(), stManager.add("audio.js")
            }
            return t.prototype.updateWarnInfos = function() {
                this.showWarningInfo(), this.showEditLockInfo(), this.showRevEditInfo()
            }, t.prototype._setEventListener = function(t, e, r) {
                this._events = this._events || [], this._events.push({
                    el: t,
                    event: e,
                    handler: r
                }), t.addEventListener(e, r)
            }, t.prototype.setCoverPhoto = function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                this._coverPhoto = t, this._options.isPublished || this.saveDraft(e)
            }, t.prototype.getCoverPhoto = function() {
                return !1 !== this._coverPhoto && (this._coverPhoto ? this._coverPhoto : void 0)
            }, t.prototype.getFirstCoverPhotoFromParagraphs = function() {
                var t = !1;
                return this._ps.forEach(function(e) {
                    if (!t && e.type == h.b.ObjectPhoto) {
                        var r = e._object.getMediaId(0);
                        t = {
                            id: r,
                            data: p.get(h.b.ObjectPhoto, r)
                        }
                    }
                }), t
            }, t.prototype.getPublishName = function() {
                return this._publishName || this._publishNameCandidate || this._getName()
            }, t.prototype.setPublishName = function(t) {
                this._publishName = t, this._options.isPublished || this.saveDraft(!0)
            }, t.prototype._updateTextPlaceholders = function() {
                if (!this._options.noTitle) {
                    this._els.placeholders || (this._els.placeholders = ot('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = ot("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = ot("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(i.H)(this._ps[0]) ? q(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : Y(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var t = this._ps[1],
                        e = !!t && t.sep,
                        r = this._getCurrentParagraphIndex(),
                        a = W(r, 1)[0];
                    Object(i.H)(t) && (!t || t.type != h.b.Code) && a < 2 && this._ps.length <= 2 && !e ? q(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : Y(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }, t.prototype.destroy = function() {
                this._els.editor.innerHTML = "", q(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(function(t) {
                    t.el.removeEventListener(t.event, t.handler)
                }), delete Q.docsCurFilter
            }, t.prototype.getLimits = function() {
                return this._options.limits
            }, t.prototype.getOptions = function() {
                return this._options
            }, t.prototype.getWidth = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return rt(this._els.canvas)[0] + (t ? 2 * this._options.figureSideMargin : 0)
            }, t.prototype.getPhotoUploadOptions = function() {
                return this._options.photoUploadOptions
            }, t.prototype.getPhotoUploadEl = function() {
                return this._photoUploadEl
            }, t.prototype.removeObject = function(t) {
                var e = this;
                J(this._ps, function(r, a) {
                    if (a._object == t) {
                        var o = e._getParagraphElByIndex(r + 1);
                        return Object(i.o)(o), at(e._getParagraphElByIndex(r)), e._setAllParagraphsDirty(), e._triggerInputEvent(), !1
                    }
                })
            }, t.prototype._processPastedUrl = function(t, e) {
                var r = this,
                    a = this._getParagraph(t);
                a && a.type == h.b.Text && setTimeout(function() {
                    r._processMatchingEmbeds(t, e) || (at(r._els.shareParseForm), at(r._els.shareIFrame), r._els.shareIFrame = r._els.editor.appendChild(ot('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), r._els.shareParseForm = r._els.editor.appendChild(ce("form", {
                        action: "share.php?act=url_attachment",
                        method: "post",
                        target: "editor__share_parse_iframe"
                    })), r._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "hash",
                        value: r._options.shareHash
                    })), r._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "url",
                        value: e
                    })), r._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "index",
                        value: 1
                    })), r._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "force_media",
                        value: 1
                    })), window.onUploadFail = function() {}, window.onUploadDone = function(e) {
                        if (e) {
                            var a = e[2];
                            if (a) {
                                var o, n = void 0,
                                    s = {};
                                switch (e[0]) {
                                    case "audio_playlist":
                                        n = h.b.ObjectAudioPlaylist, s = {
                                            accessHash: a.accessHash
                                        }, e[1] = a.ownerId + "_" + a.id + (a.accessHash ? "_" + a.accessHash : "");
                                        break;
                                    case "podcast":
                                        Object(R.a)("article_podcasts") && (n = h.b.ObjectPodcast, s = {});
                                        break;
                                    case "doc":
                                        "gif" == a.ext && (n = h.b.ObjectGIF, s = {
                                            size: a.video_preview_size,
                                            video: a.video_preview,
                                            href: a.href
                                        });
                                        break;
                                    case "photo":
                                        n = h.b.ObjectPhoto, s = {
                                            size: Object(i.t)(a.editable.sizes),
                                            sizes: a.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        n = h.b.ObjectVideo, s = {
                                            editable: a.editable,
                                            duration: a.editable.duration,
                                            platform: a.editable.platform
                                        }
                                }
                                if (n) {
                                    var c = Object(i.w)(r._ps[t]),
                                        l = {
                                            mediaId: e[1],
                                            type: n,
                                            sep: c,
                                            fromExtPage: intval(a.from_ext_page)
                                        };
                                    p.add(n, l.mediaId, s), r._linkTooltip && r._linkTooltip.hide(), l = Object(i.e)(l), (o = r._getParagraph(t + 1)) && o._object && o._object._mediaId === l.mediaId || (r._getOrCreateParagraphObject(l), r._insertParagraphAt(t + 1, l), r._els.canvas.normalize(), r._redraw(!0, !0), r._saveUndoState(), setTimeout(function() {
                                        r.onObjectStateLoaded()
                                    }, 10))
                                }
                            }
                        }
                    }, r._els.shareParseForm.submit())
                }, 0)
            }, t.prototype._processMatchingEmbeds = function(t, e) {
                var r = void 0,
                    a = void 0,
                    o = void 0;
                if (!Object(R.a)("article_embeds")) return !1;
                if (r = e.match(/^https?:\/\/(?:www.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)$/)) a = h.b.ObjectTwitter, o = r[1];
                else if (r = e.match(/^https?:\/\/(?:www.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)(?:\/embed)?(?:\/)?/)) a = h.b.ObjectInstagram, o = r[1];
                else if (r = e.match(/^https?:\/\/(?:www.)?facebook\.com\/(\w.+)\/posts\/(\d+)\/?$/)) a = h.b.ObjectFacebook, o = r[1] + "_" + r[2];
                else if (r = e.match(/^https?:\/\/(?:www.)?vk\.com\/wall(-?\d+)_(\d+)/) || e.match(/\?w=wall(-?\d+)_(\d+)$/)) a = h.b.ObjectVK, o = r[1] + "_" + r[2];
                else if (r = e.match(/^https?:\/\/(?:www.)?t\.me\/(\w.+)\/(\d+)/)) {
                    if (gt("telegram-post-" + r[1] + "-" + r[2])) return !1;
                    a = h.b.ObjectTelegram, o = r[1] + "_" + r[2]
                }
                if (!a || !o) return !1;
                var n = Object(i.e)({
                        _uuid: Bt(),
                        type: a,
                        mediaId: o
                    }),
                    s = this._getParagraph(t + 1);
                return s && s._object && s._object._mediaId === n.mediaId ? void 0 : (this._getOrCreateParagraphObject(n), this._insertParagraphAt(t + 1, n), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), !0)
            }, t.prototype._handleObjectPaste = function(t) {
                var e = (t.clipboardData || t.originalEvent.clipboardData).getData("text/plain");
                if (e) {
                    var r = e.split(":"),
                        i = W(r, 2),
                        a = i[0],
                        o = i[1];
                    if ("uuid" == a && o) {
                        var n = domQuery1('[data-uuid="' + o + '"]');
                        if (n) {
                            var s = n.cloneNode(!0);
                            s.setAttribute("data-force-update", "1");
                            var c = this._getCurrentParagraphIndex(),
                                l = W(c, 1)[0];
                            pt(s, this._getParagraphElByIndex(l)), t.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                        }
                    }
                }
            }, t.prototype._handleLinkPaste = function(t) {
                var e = this,
                    r = (t.clipboardData || t.originalEvent.clipboardData).items;
                for (var a in r)
                    if (r.hasOwnProperty(a)) {
                        var o = r[a];
                        "string" === o.kind && function() {
                            var t = e._getCurrentParagraphIndex(),
                                r = W(t, 1)[0];
                            o.getAsString(function(t) {
                                var a = X(t, !0);
                                if (1 === a.length) {
                                    var o = a[0].url,
                                        n = e._getParagraphElByIndex(r);
                                    e._processPastedUrl(r, o), Object(i.T)(n, function(t) {
                                        if (t.nodeType == Node.TEXT_NODE && t.textContent.indexOf(o) >= 0 && !st(t, function(t) {
                                                return t.tagName && "a" == t.tagName.toLowerCase()
                                            }, 3)) {
                                            e._saveCursorMarker();
                                            var i = document.createRange();
                                            i.setStart(t, t.textContent.indexOf(o)), i.setEnd(t, t.textContent.indexOf(o) + o.length);
                                            var a = window.getSelection();
                                            a.removeAllRanges(), a.addRange(i), e._setParagraphDirty(r), document.execCommand("createLink", !1, o), e._restoreCursorFromMarker()
                                        }
                                    }, !1)
                                }
                            })
                        }()
                    }
            }, t.prototype._handlePhotoPaste = function(t) {
                var e = this;
                this._photoPasteUploadingProcess = !1;
                var r = (t.clipboardData || t.originalEvent.clipboardData).items;
                for (var a in r)
                    if (r.hasOwnProperty(a)) {
                        var o = r[a];
                        "file" === o.kind && function() {
                            e._photoPasteUploadingProcess = !0;
                            var t = o.getAsFile(),
                                r = new FileReader;
                            r.onload = function() {
                                e._photoPasteUploadingProcess = !1;
                                var a = e._getCurrentParagraphIndex(),
                                    o = W(a, 1)[0];
                                o = o || 0;
                                var n = Object(i.e)({
                                    type: h.b.ObjectPhoto
                                });
                                e._getOrCreateParagraphObject(n).setBLOB(t);
                                var s = void 0;
                                Object(i.H)(e._ps[o]) ? (s = o, Object(i.w)(e._ps[s]) && (n.sep = 1), e._ps[s] = n) : (s = o + 1, e._insertParagraphAt(s, n)), e._redraw(!0, !0);
                                var c = new Image;
                                c.onload = function() {
                                    e._focusParagraph(s + 1), e._showObjectPicker()
                                }, c.src = r.result
                            }, r.readAsDataURL(t)
                        }()
                    }
            }, t.prototype._getCurrentSelectionState = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 2),
                    r = e[0],
                    a = e[1];
                if (!1 === r || !1 === a) return !1;
                for (var o = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        list: !1,
                        justHeaders: !0
                    }, n = {}, s = 0, c = void 0, l = void 0, d = r; d <= a && d < this._ps.length; d++) {
                    var p = Object(i.D)(this._ps[d]) ? this._ps[d]._object.getCaptionEl() : this._getParagraphElByIndex(d);
                    if (void 0 === c) {
                        var _ = getCaretCharacterOffsetWithin(p),
                            u = W(_, 2);
                        c = u[0], l = u[1]
                    }
                    this._ps[d].lines.forEach(function(t) {
                        var e = t.decorations;
                        Lt.forEach(function(r) {
                            var i = e[r.type];
                            i && !isEmpty(i) && i.forEach(function(e) {
                                var i = [e[0] + s, e[1] + s];
                                if ("link" == r.type) c < i[1] && l > i[0] && (n[r.type] = 1, o.decorations[r.type] = !0);
                                else if (1 == n[r.type]) {
                                    l > i[1] || (l >= i[0] && l <= i[1] ? e[0] > 0 ? n[r.type] = -1 : (n[r.type] = 2, o.decorations[r.type] = !0) : n[r.type] = -1)
                                } else if (!n[r.type]) {
                                    var a = c >= i[0] && c <= i[1];
                                    a && (l >= i[0] && l <= i[1]) ? (n[r.type] = 2, o.decorations[r.type] = !0) : a && (t.text.length > i[1] ? n[r.type] = -1 : n[r.type] = 1)
                                }
                            })
                        }), s += t.text.length
                    })
                }
                for (var f = r; f <= a && f < this._ps.length; f++) Object(i.D)(this._ps[f]) && (o.captionFocused = o.captionFocused || this._ps[f]._object.isCaptionFocused(), o.object = !0), this._ps[f].type == h.b.Header1 && (o.header1 = !0), this._ps[f].type != h.b.Header2 && (o.header2 = !1), this._ps[f].type != h.b.Header3 && (o.header3 = !1), inArray(this._ps[f].type, [h.b.Header1, h.b.Header2, h.b.Header3]) ? o.header = !0 : o.justHeaders = !1, inArray(this._ps[f].type, [h.b.Quote, h.b.Quote2]) || (o.quote = !1), inArray(this._ps[f].type, [h.b.BulletList, h.b.NumericList]) && (o.list = !0);
                var g = Object(i.u)(),
                    v = W(g, 1)[0];
                return !(v && v.startContainer && tt(v.startContainer, "article_ed__noconteditable")) && (o.multiline = r != a, o)
            }, t.prototype._hideFormatTooltip = function() {
                this._formatTooltip && this._formatTooltip.isShown() && this._formatTooltip.hide()
            }, t.prototype._showFormatTooltip = function() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var t = window.getSelection();
                        if (t.focusNode && (tt(t.focusNode, "article_set_link") || "input" == t.focusNode.nodeName.toLowerCase())) return;
                        var e = !t.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, e), 1)
                    } catch (t) {}
                }
            }, t.prototype._doShowFormatTooltip = function(t) {
                var e = this;
                if (!this._formatTooltip) {
                    var r = ot('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                        a = void 0;
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: r,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: function() {
                            var t = e._getCurrentSelectionState(),
                                i = [];
                            if (!t || t.header1 || t.object && !t.captionFocused || (t.justHeaders || i.push(["strong", "cur.articleEditor.setStrong()", !!t.decorations.strong]), t.quote || t.justHeaders || i.push(["em", "cur.articleEditor.setEm()", !!t.decorations.em]), i.push(["strike", "cur.articleEditor.setStrike()", !!t.decorations.strike]), t.decorations.link ? i.push(["link", "cur.articleEditor.clearLink()", t.decorations.link]) : i.push(["link", "cur.articleEditor.setLinkMode(true)", t.decorations.link]), t.object || t.header1 || t.list || (i.push(["header1", "cur.articleEditor.setHeader1(" + intval(t.header2) + ")", t.header2]), i.push(["header2", "cur.articleEditor.setHeader2(" + intval(t.header3) + ")", t.header3]), i.push(["quote", "cur.articleEditor.setQuote()", t.quote]))), 0 != i.length) {
                                var a = $("article_format_btns", r);
                                a.innerHTML = "", i.forEach(function(t, e) {
                                    e > 0 && inArray(t[0], ["header1"]) && a.appendChild(ot('<div class="article_format_divider"></div>'));
                                    var r = t[2] ? "article_format_btn_active" : "";
                                    a.appendChild(ot('<button class="article_format_btn ' + r + '" id="article_format_btn_' + t[0] + '" onclick="' + t[1] + '"></button>'))
                                }), e.setLinkMode(!1)
                            } else e._formatTooltip.hide()
                        },
                        getTargetBoundingBox: function() {
                            if (e._formatTooltip.linkMode) return a;
                            var t = Object(i.u)(),
                                r = W(t, 3),
                                o = r[0],
                                n = r[2];
                            if (!n || !n.rangeCount) return a;
                            var s = o.getBoundingClientRect();
                            if (!s.left) {
                                var c = o.startContainer.nodeType == Node.ELEMENT_NODE ? o.startContainer : domPN(o.startContainer),
                                    l = it(c),
                                    d = rt(c);
                                return a = {
                                    top: l[1] + scrollGetY(),
                                    left: l[0] + d[0] / 2,
                                    width: s.width,
                                    height: s.height
                                }
                            }
                            return a = {
                                top: s.top + scrollGetY(),
                                left: s.left,
                                width: s.width,
                                height: s.height
                            }
                        }
                    }), this._formatTooltip.linkMode = !1;
                    var o = K("input", r);
                    o.addEventListener("keypress", function(t) {
                        if (t.keyCode == xt) return e._setLinkToSelectedText(o.value.trim()), e._formatTooltip.hide(), cancelEvent(t)
                    }), $("article_set_link_delete", r).addEventListener("click", function(t) {
                        return e._setLinkToSelectedText(), cancelEvent(t)
                    })
                }
                t ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }, t.prototype._setLinkToSelectedText = function(t) {
                if (t) {
                    if (!(t = (t = t.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://")) t = (Object(i.K)(t) ? "https" : "http") + "://" + t;
                    t = encodeURIComponent(t)
                }
                this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), t && document.execCommand("createLink", !1, t), !V.msie && t || this._triggerInputEvent(), t ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor)
            }, t.prototype.clearLink = function() {
                this.setLinkMode(!1);
                var t = Object(i.u)(),
                    e = W(t, 3),
                    r = e[0],
                    a = e[2],
                    o = Z("a", r.startContainer),
                    n = Z("a", r.endContainer) || o;
                o && (this._saveCursorMarker(), a.setBaseAndExtent(o, 0, n, Math.max(1, n.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }, t.prototype.setLinkMode = function(t, e) {
                var r = void 0;
                t && (r = this._getCursor(), V.msie || document.execCommand("superscript", !1, !0));
                var i = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!t)
                    if (t) {
                        var a = K("input", i);
                        a.value = "", Y(i, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), a.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(i, {
                        width: null
                    }), q(i, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, e && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }, t.prototype.setHeader1 = function(t) {
                this._setHeader(h.b.Header2, !t)
            }, t.prototype.setHeader2 = function(t) {
                this._setHeader(h.b.Header3, !t)
            }, t.prototype.setQuote = function() {
                var t = this._getCursor(),
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 2),
                    a = r[0],
                    o = r[1];
                if (!1 !== a) {
                    o || (o = a);
                    for (var n = h.b.Text, s = a; s <= o; s++)
                        if (d(this._ps[s])) {
                            n = this._ps[s].type == h.b.Quote ? h.b.Quote2 : this._ps[s].type == h.b.Quote2 ? h.b.Text : h.b.Quote;
                            break
                        }
                    for (var c = a; c <= o; c++) {
                        var l = this._ps[c];
                        d(l) && (this._ps[c] = Object(i.e)({
                            type: n,
                            lines: [l.lines[0]],
                            sep: Object(i.w)(this._ps[c])
                        }), this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                }

                function d(t) {
                    return !Object(i.D)(t) && !Object(i.C)(t)
                }
            }, t.prototype._setHeader = function(t, e) {
                var r = this._getCursor(),
                    a = this._getCurrentParagraphIndex(),
                    o = W(a, 2),
                    n = o[0],
                    s = o[1];
                if (!1 !== n) {
                    s || (s = n);
                    for (var c = n; c <= s; c++) {
                        l(this._ps[c]) && (this._ps[c].type = e ? t : h.b.Text, this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(r), this._saveUndoState(), this.saveDraft()
                }

                function l(t) {
                    return !Object(i.D)(t) && !Object(i.C)(t)
                }
            }, t.prototype.setStrong = function() {
                this._setAllParagraphsDirty(), document.execCommand("bold"), V.msie && this._triggerInputEvent()
            }, t.prototype.setEm = function() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), V.msie && this._triggerInputEvent()
            }, t.prototype.setStrike = function() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), V.msie && this._triggerInputEvent()
            }, t.prototype.saveUndoStateAndDraft = function() {
                this._saveUndoState(), this.saveDraft()
            }, t.prototype._saveUndoStateDelayed = function() {
                var t = this;
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = setTimeout(function() {
                    t._saveUndoState()
                }, 1e3)
            }, t.prototype._saveUndoState = function() {
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = !1;
                var t = T(this._ps, !0);
                if (this._undoCurrentState) {
                    if (JSON.stringify(t) == JSON.stringify(this._undoCurrentState)) return;
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    }), this._undos.length > 100 && this._undos.shift()
                }
                this._undoCurrentState = t, this._undoCurrentStateCursor = this._getCursor(), this._redos = [], this._options.onUndoRedo && this._options.onUndoRedo()
            }, t.prototype.undo = function() {
                if (this._saveUndoDelayedTO && this._saveUndoState(), this._undos.length) {
                    this._redos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    });
                    var t = this._undos.pop();
                    this._ps = I(t.ps), this._undoCurrentState = T(this._ps), this._undoCurrentStateCursor = t.cursor, this._redraw(!0), t.cursor && this._restoreCursor(t.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
                }
                this._options.onUndoRedo && this._options.onUndoRedo()
            }, t.prototype.redo = function() {
                if (0 != this._redos.length) {
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    });
                    var t = this._redos.pop();
                    this._ps = I(t.ps), this._undoCurrentState = T(this._ps), this._undoCurrentStateCursor = t.cursor, this._redraw(!0), t.cursor && this._restoreCursor(t.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
                }
            }, t.prototype.canUndo = function() {
                return this._undoable || this._undos.length > 0
            }, t.prototype.canRedo = function() {
                return this._redos.length > 0
            }, t.prototype.initParagraphs = function(t) {
                t.forEach(function(t) {
                    t._preparedData && (t.mediaId.split(",").forEach(function(e, r) {
                        p.add(t.type, e, t._preparedData[r])
                    }), delete t._preparedData)
                }), this._ps = I(t), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }, t.prototype._getParagraphFromHTML = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

                function a(e, r) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var o = e.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        r.text += "pre" == t ? o : Object(i.i)(o)
                    } else Object(i.y)(e) && r.text.length > 0 && r.brs.push(r.text.length);
                    J(e.childNodes, function(t, e) {
                        var o = [r.text.length];
                        a(e, r), o.push(r.text.length);
                        var n = (e.tagName || "").toLowerCase();
                        e.style && ("bold" == e.style.fontWeight || parseInt(e.style.fontWeight) > 400) && (n = "strong");
                        var s = void 0;
                        switch (n) {
                            case "b":
                            case "strong":
                                s = Dt.strong;
                                break;
                            case "em":
                            case "i":
                                s = Dt.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                s = Dt.strike;
                                break;
                            case "a":
                                s = Dt.link;
                                var c = e.getAttribute("href") || "",
                                    l = Object(i.m)(c);
                                Object(i.K)(c) && (l = c.match(/app-?\d+_-?\d+/) ? l.replace("%23", "#") : l.replace("#", "%23")), o.push(l);
                                break;
                            case "code":
                                s = Dt.code;
                                break;
                            case "font":
                                var d = e.getAttribute("face");
                                "monospace" === d ? s = Dt.code : "times" === d && (s = Dt.code)
                        }
                        s && (r.decorations[s.type] = r.decorations[s.type] || [], o[0] < o[1] && r.decorations[s.type].push(o), r.decorations[s.type] = Object(i.N)(r.decorations[s.type]))
                    })
                }
                var o = document.createElement("div");
                o.innerHTML = e;
                var n = [],
                    s = void 0,
                    c = {};
                if ("ol" == t || "ul" == t) {
                    switch (t) {
                        case "ol":
                            s = h.b.NumericList;
                            break;
                        case "ul":
                            s = h.b.BulletList
                    }
                    for (var l = 0, d = o.children.length; l < d; l++) {
                        var p = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        a(o.children[l], p), p.brs = Object(i.g)(p.brs), n.push(p)
                    }
                } else {
                    switch (t) {
                        case "h1":
                            s = h.b.Header1;
                            break;
                        case "h2":
                        case "header":
                            s = h.b.Header2;
                            break;
                        case "h3":
                        case "h4":
                            s = h.b.Header3;
                            break;
                        case "blockquote":
                            s = h.b.Quote;
                            break;
                        case "cite":
                            s = h.b.Quote2;
                            break;
                        case "pre":
                            s = h.b.Code;
                            break;
                        default:
                            s = h.b.Text
                    }
                    var _ = o.firstElementChild;
                    if (Object(i.E)(_)) {
                        var u = et(_, "type"),
                            f = et(_, "media-id");
                        u && f && (o = K("figure", _), s = u, c.mediaId = f)
                    }
                    var g = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    a(o, g), g.brs = Object(i.g)(g.brs, g.text.length), n.push(g), s == h.b.Code && delete g.decorations.code, r || s != h.b.Text || "```" != g.text || 0 != g.brs.length || (g.text = "", s = h.b.Code), Object(i.A)(s) || (0 == g.text.indexOf("1. ") ? (s = h.b.NumericList, this._removeParagraphLineTextPart(g, 0, "1. ".length)) : 0 == g.text.indexOf("* ") && (s = h.b.BulletList, this._removeParagraphLineTextPart(g, 0, "* ".length))), g.brs = g.brs.filter(function(t) {
                        return t > 0
                    })
                }
                return c.lines = n, c.type = s, Object(i.e)(c)
            }, t.prototype._removeParagraphLineTextPart = function(t, e, r) {
                t.text = t.text.substring(0, e) + t.text.substring(r);
                for (var i = r - e, a = 0, o = t.brs.length; a < o; a++) {
                    var n = t.brs[a];
                    n > e && n < r ? t.brs[a] = void 0 : t.brs[a] > e && t.brs[a] >= r && (t.brs[a] -= i)
                }
                t.brs = t.brs.filter(function(t) {
                    return void 0 !== t
                }), J(t.decorations, function(a, o) {
                    o.forEach(function(t) {
                        t[0] <= e && t[1] <= e || (t[0] <= e && t[1] <= r ? t[1] = e : t[0] >= e && t[1] <= r ? t[0] = t[1] = void 0 : t[0] >= e && t[1] > r ? (t[0] = e, t[1] -= i) : (t[0] -= i, t[1] -= i))
                    }), t.decorations[a] = t.decorations[a].filter(function(t) {
                        return void 0 !== t[0]
                    })
                })
            }, t.prototype._renderObjectParagraph = function(t, e) {
                var r = this._getOrCreateParagraphObject(t),
                    a = r.el();
                r.onRender && r.onRender();
                var o = 0;
                return isString(e) && (e = [e]), t.type == h.b.ObjectPhoto ? (o = r.getImageIndex(), r.setCaptionElHtml(e[o] || "")) : r.setCaptionElHtml(e[0] || ""), et(a, "paragraph-lines", JSON.stringify(t.lines)), et(a, "uuid", t._uuid), et(a, "type", t.type), et(a, "media-id", t._object.getMediaId()), et(a, "mode", parseInt(t.mode) || 0), Y(a, i.a), a
            }, t.prototype._renderParagraphLines = function(t, e) {
                if (!t.lines) return ["", ""];
                var r = "",
                    a = "",
                    o = "",
                    n = parseInt(t.type);
                switch (n) {
                    case h.b.NumericList:
                        r = "ol", a = "li";
                        break;
                    case h.b.BulletList:
                        r = "ul", a = "li";
                        break;
                    case h.b.Header1:
                        a = "h1";
                        break;
                    case h.b.Header2:
                        a = "h2";
                        break;
                    case h.b.Header3:
                        a = "h3";
                        break;
                    case h.b.Quote:
                        a = "blockquote";
                        break;
                    case h.b.Quote2:
                        a = "cite";
                        break;
                    case h.b.Code:
                        a = "pre";
                        break;
                    default:
                        r = "p"
                }
                var s = [];
                return t.lines.forEach(function(r) {
                    if (r) {
                        var c = r.text,
                            l = r.decorations,
                            d = [];
                        J(Lt, function(t, e) {
                            if (!Object(i.A)(n) && n != h.b.Code || "code" != e.type) {
                                var r = l[e.type];
                                if (r)
                                    for (var a = function(t, i) {
                                            var a = r[i];
                                            (d[a[0]] = d[a[0]] || {
                                                open: {},
                                                close: {}
                                            }).open[e.type] = f(a);
                                            var o = d[a[1]] = d[a[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                n = function(t, e) {
                                                    for (var r = []; t > 0;) {
                                                        var i = d[--t];
                                                        if (i)
                                                            for (var a in i.open)
                                                                if (i.open.hasOwnProperty(a)) {
                                                                    if (a == e) return [];
                                                                    r.push(a)
                                                                }
                                                    }
                                                    return r
                                                }(a[1], e.type);
                                            n.forEach(function(t) {
                                                o.close[t.type] = !0
                                            }), o.close[e.type] = !0, n.forEach(function(t) {
                                                o.open[t.type] = f(a)
                                            })
                                        }, o = 0, s = r.length; o < s; o++) a(0, o)
                            }
                        });
                        var p = 0,
                            _ = [];
                        d.forEach(function(e, a) {
                            if (e) {
                                var o = !1,
                                    n = e.close.link && 1 == Object.keys(e.close).length;
                                a > 0 && (o = Object(i.P)(c, p, a, r.brs, t.type == h.b.Code), n || _.push(o));
                                var s = 0;
                                n && (o && o.endsWith("<br/>") && (s++, o = o.replace(/<br\/>$/, "")), o && o.endsWith("<br/>") && (s++, o = o.replace(/<br\/>$/, "")), !1 !== o && _.push(o)), J(Mt, function(t, r) {
                                    void 0 !== e.close[r.type] && _.push("</" + r.tag + ">")
                                }), _.push("<br/>".repeat(s)), J(Lt, function(t, r) {
                                    var i = e.open[r.type];
                                    void 0 !== e.open[r.type] && (!0 === i ? _.push("<" + r.tag + ">") : _.push("<" + r.tag + ' href="' + _t(i) + '">'))
                                }), p = a
                            }
                        }), _.push(Object(i.P)(c, p, void 0, r.brs, t.type == h.b.Code));
                        var u = "";
                        a && (u += "<" + a + (o = o ? " " + o : "") + ">"), inArray(n, [h.b.Quote, h.b.Quote2]) && (u += "<p>"), u += _.join("") || (e ? "" : "<br/>"), inArray(n, [h.b.Quote, h.b.Quote2]) && (u += "</p>"), a && (u += "</" + a + ">"), s.push(u)
                    }

                    function f(t) {
                        return t[2] || !0
                    }
                }), [r, s]
            }, t.prototype._renderParagraph = function(t) {
                var e = Object(i.D)(t),
                    r = this._renderParagraphLines(t, e),
                    a = W(r, 2),
                    o = a[0],
                    n = a[1],
                    s = void 0;
                if (e) s = this._renderObjectParagraph(t, n);
                else {
                    var c = n.join("");
                    s = ot(o ? "<" + o + ">" + c + "</" + o + ">" : c)
                }
                return Object(i.w)(t) ? et(s, "sep", Object(i.p)()) : et(s, "sep", null), Y(s, i.a), Y(s, "article_paragraph"), s
            }, t.prototype._getParagraphElByIndex = function(t) {
                return !1 === t ? null : this._els.canvas.childNodes[t] || null
            }, t.prototype.getObjectParagraphIndex = function(t) {
                for (var e = 0; e < this._ps.length; e++)
                    if (this._ps[e]._uuid === t._uuid) return e;
                return -1
            }, t.prototype._getParagraph = function(t) {
                return t < this._ps.length ? this._ps[t] : null
            }, t.prototype._decorateParagraphEls = function() {
                for (var t = 0, e = this._ps.length; t < e; t++) {
                    var r = t > 0 && this._ps[t - 1],
                        i = this._ps[t],
                        a = t + 1 < e && this._ps[t + 1],
                        o = !1,
                        n = !1,
                        s = !1;
                    r && i.type == r.type || (o = !0), a && i.type == a.type || (n = !0), (h.c.includes(+a.type) || a.sep) && (s = !0);
                    var c = this._getParagraphElByIndex(t);
                    lt(c, "article_decoration_first", o), lt(c, "article_decoration_last", n), lt(c, "article_decoration_before", s)
                }
            }, t.prototype.redraw = function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._redraw(t, !0)
            }, t.prototype._redraw = function(t, e) {
                var r = this,
                    i = this._getCursor();
                t ? (this._els.canvas.innerHTML = "", this._ps.forEach(function(t) {
                    r._els.canvas.appendChild(r._renderParagraph(t))
                })) : this._dirty.forEach(function(t) {
                    if (!(t >= r._ps.length)) {
                        var e = r._getParagraphElByIndex(t),
                            i = r._renderParagraph(r._ps[t]);
                        e ? i.outerHTML != e.outerHTML && ut(e, i) : r._els.canvas.appendChild(i)
                    }
                }), e && this._restoreCursor(i), this._decorateParagraphEls(), this._dirty = []
            }, t.prototype._getContainingParagraphEl = function(t) {
                for (; t && t.parentNode != this._els.canvas;) t = t.parentNode;
                var e = Object(i.r)(t);
                return [t, e, this._getParagraph(e)]
            }, t.prototype._getCurrentParagraphIndex = function() {
                var t = window.getSelection();
                if (t.rangeCount) {
                    var e = t.getRangeAt(0);
                    if (e.startContainer == this._els.canvas) return [e.startOffset, e.endOffset];
                    var r = this._getContainingParagraphEl(e.startContainer),
                        a = W(r, 2)[1],
                        o = e.endContainer;
                    if (0 === e.endOffset && (this._isParagraphEl(o) || this._isParagraphEl(domPN(o)) && 0 == Object(i.f)(o))) {
                        var n = this._getContainingParagraphEl(o),
                            s = W(n, 1)[0];
                        o = Object(F.A)(s) || s
                    }
                    var c = this._getContainingParagraphEl(o),
                        l = W(c, 2)[1];
                    return [a, Math.max(a, l)]
                }
                return [0, !1]
            }, t.prototype._saveCursorMarker = function() {
                if (!this._markerCursorSet) {
                    var t = Object(i.u)(),
                        e = W(t, 2),
                        r = e[0],
                        a = e[1];
                    if (!r) return [0, 0];
                    var o = r.startContainer,
                        n = r.startOffset,
                        s = r.endContainer,
                        c = r.endOffset;
                    if (o != this._els.canvas) {
                        var l = this._getContainingParagraphEl(o)[1];
                        d(o, n, i.c), a || (this._getContainingParagraphEl(s)[1] == l && s.textContent.includes(i.c) && (c += 1), d(s, c, i.b)), this._markerCursorSet = !0
                    }
                }

                function d(t, e, r) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var i = t.textContent;
                        t.textContent = i.substring(0, e) + r + i.substring(e)
                    } else {
                        var a = document.createTextNode(r);
                        t.insertBefore(a, t.childNodes[e])
                    }
                }
            }, t.prototype._restoreCursorFromMarker = function() {
                var t = this;
                if (this._markerCursorSet) {
                    var e = function(t, e, r) {
                            return function e(a) {
                                if (a.nodeType == Node.TEXT_NODE) {
                                    var o = a.textContent.indexOf(t);
                                    if (o >= 0) {
                                        a.textContent = a.textContent.split(t).join("");
                                        var n = a.parentElement;
                                        return -1 != n.innerHTML.search(/\s$/) && (n.innerHTML = n.innerHTML.trimRight() + i.d, r && r[0] == a && (r[0] = n.lastChild), a = n.lastChild), n.innerHTML || ((a = n).innerHTML = "<br/>", o = 0), [a, o]
                                    }
                                } else
                                    for (var s = 0, c = a.childNodes.length; s < c; s++) {
                                        var l;
                                        if (l = e(a.childNodes[s])) return l
                                    }
                            }(e)
                        },
                        r = void 0,
                        a = void 0,
                        o = void 0;
                    for (o = 0; o < this._els.canvas.children.length && !(r = e(i.c, this._els.canvas.children[o])); o++);
                    for (; o < this._els.canvas.children.length && !(a = e(i.b, this._els.canvas.children[o], r)); o++);
                    if (r) {
                        var n = document.createRange();
                        r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), n.setStart(r[0], r[1]), a && (a[0].nodeType == Node.TEXT_NODE && (a[1] = Math.min(a[1], a[0].textContent.length)), n.setEnd(a[0], a[1])), window.getSelection().setBaseAndExtent(n.startContainer, n.startOffset, n.endContainer, n.endOffset)
                    }
                    var s = function(e) {
                        t._ps.forEach(function(t) {
                            t.lines.forEach(function(t) {
                                var r = t.text.indexOf(e);
                                if (r >= 0) {
                                    t.text = t.text.replace(e, "");
                                    for (var i = 0, a = 0; a < t.brs.length; a++) t.brs[a] > r && (i = 1), t.brs[a] -= i;
                                    J(Lt, function(e, i) {
                                        var a = t.decorations[i.type];
                                        if (a)
                                            for (var o = 0, n = a.length; o < n; o++) {
                                                var s = a[o];
                                                s[0] > r && (s[0] -= 1), s[1] > r && (s[1] -= 1)
                                            }
                                    })
                                }
                            })
                        })
                    };
                    s(i.c), s(i.b), this._markerCursorSet = !1
                }
            }, t.prototype._setAllParagraphsDirty = function() {
                this._dirty = [];
                for (var t = this._els.canvas.children.length, e = 0; e < t; e++) this._dirty.push(e);
                this._ps = []
            }, t.prototype._setCurrentParagraphDirty = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 2),
                    r = e[0],
                    i = e[1];
                this._setParagraphDirty(r, i)
            }, t.prototype.setParagraphDirty = function(t, e) {
                this._setParagraphDirty(t, e)
            }, t.prototype._setParagraphDirty = function(t, e) {
                if (void 0 === t || t < 0) throw new Error("Invalid paragraph index");
                e = e || t;
                for (var r = t; r <= e; r++) inArray(r, this._dirty) || this._dirty.push(r)
            }, t.prototype._expandDoubleBRs = function() {
                function t(t, e, r) {
                    var a = t.lines[0];
                    void 0 === r && (r = a.text.length);
                    var o = [];
                    return a.brs.forEach(function(t) {
                        t < r && t > e && o.push(t - e)
                    }), Object(i.e)({
                        type: t.type,
                        lines: [{
                            text: a.text.substr(e, r - e),
                            decorations: Object(i.n)(a.decorations, e, r),
                            brs: o
                        }]
                    })
                }
                for (var e = !1, r = 0, a = this._ps.length; r < a; r++) {
                    var o = this._ps[r];
                    if (o.lines.length > 1) o.lines.forEach(i.h);
                    else {
                        var n = o.lines[0];
                        if (!n || !n.brs.length) continue;
                        for (var s = n.brs, c = [], l = 0, d = 0, p = s.length; d < p; d++)
                            if (l != s[d] && d > 0 && s[d - 1] == s[d]) {
                                var h = t(o, l, s[d]);
                                Object(i.H)(h) || c.push(h), l = s[d]
                            }
                        c.push(t(o, l)), c.length > 1 && (Array.prototype.splice.apply(this._ps, [r, 1].concat(c)), r = r + c.length - 1, e = !0)
                    }
                }
                return e
            }, t.prototype._processAlienPhotos = function() {
                var t = this;
                if (!this._photoPasteUploadingProcess)
                    for (var e = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = e.shift();)
                        if (!Object(i.E)(r) || !this._isTrackedObjectEl(r))
                            for (var a = Array.prototype.slice.call(geByTag("img", r)), o = void 0, n = function() {
                                    if (!o.src || !domPN(r) || !isVisible(o)) return "continue";
                                    var e = st(o, function(e) {
                                            return e == t._els.canvas || "FIGURE" == e.tagName
                                        }, 10),
                                        a = !(!e || e == t._els.canvas) && K("figcaption", e),
                                        n = Object(i.e)({
                                            type: h.b.ObjectPhoto
                                        }),
                                        s = t._renderObjectParagraph(n, a ? a.innerHTML : "");
                                    Object(i.M)(r.textContent) ? (ut(r, s), at(o), pt(ot("<p>" + i.c + "</p>"), s)) : (pt(s, domPN(o)), at(a), at(o)), st(s, function(e) {
                                        if (e == t._els.canvas) return !0;
                                        q(e, i.a)
                                    }), Object(i.Q)(o.src, function(e, r, i) {
                                        e ? (at(s), t._forgetObject(n._uuid), t._setAllParagraphsDirty(), t._triggerInputEvent(), i()) : t._getOrCreateParagraphObject(n).setBLOB(r, i)
                                    })
                                }; o = a.shift();) n()
            }, t.prototype._flattenAlienParagraphs = function() {
                var t = this;
                if (this._fromPasteEvent) {
                    for (var e = Array.prototype.slice.call(this._els.canvas.children), r = void 0, a = this._fromPasteEvent, o = this._pasteCurrentIndex, n = this._getCurrentParagraphIndex(), s = W(n, 1)[0], c = -1, l = function() {
                            if (c++, a && !dt(r.textContent) && c > o && c <= s) return at(r), "continue";
                            var e = r;
                            Object(i.J)(r) && !Object(i.x)(r) && (e = r.firstChild);
                            var n = !1;
                            (function t(a) {
                                if (a && a.nodeType != Node.TEXT_NODE && !Object(i.y)(a))
                                    if (Object(i.v)(a))
                                        if (this._isTrackedObjectEl(a)) a != e && (nt(a, r), n = !0);
                                        else
                                            for (var o = Array.prototype.slice.call(a.childNodes), s = void 0; s = o.shift();) t.call(this, s);
                                else a != e && (dt(a.innerHTML) && nt(a, r), n = !0)
                            }).call(t, e, !0), n && at(r)
                        }; r = e.shift();) l();
                    this._setAllParagraphsDirty()
                }
            }, t.prototype._correctCaptionSelection = function() {
                var t = Object(i.u)(),
                    e = W(t, 3),
                    r = e[0],
                    a = e[1],
                    o = e[2];
                if (r && !a) {
                    var n = st(r.startContainer, function(t) {
                        return "FIGCAPTION" == t.tagName
                    }, 5);
                    if (n && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && Object(i.G)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                        var s = $("article_ed__figcaption_edit", n),
                            c = r.cloneRange();
                        c.selectNodeContents(s), o.removeAllRanges(), o.addRange(c)
                    }
                }
            }, t.prototype.cancelSaveDraft = function() {
                clearTimeout(this._draftSaveTO)
            }, t.prototype.saveDraft = function(t, e, r) {
                var i = this;
                if (!this.isLocked()) {
                    clearTimeout(this._draftSaveTO);
                    var a = JSON.stringify({
                        paragraphs: T(this._ps)
                    });
                    e ? this._lastSavedDraft = a : this._lastSavedDraft != a || t ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(function() {
                        if (i._lastSavedDraft = a, 0 != i._ps.length) {
                            var t = U(i._ps);
                            t ? i._options.onDraftNotSaved && i._options.onDraftNotSaved(t) : i.save(!1, function(t, e, r) {
                                i._initDraftSave = !0, i._options.onDraftSaved && i._options.onDraftSaved(t, e, r)
                            })
                        }
                    }, r ? 0 : 1e3 * this._options.draftSaveDelay)) : !e && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
                }
            }, t.prototype._getName = function() {
                if (this._publishName) return this._publishName;
                var t = T(this._ps),
                    e = t.length ? t[0].lines[0].text : "";
                return Object(i.q)(e, this._options.maxNameLength)
            }, t.prototype.getTitle = function() {
                var t = this._ps[0];
                return t ? t.lines[0].text : ""
            }, t.prototype.isLimitsExceeded = function() {
                return !!U(this._ps)
            }, t.prototype.save = function(t, e, r) {
                var a = this,
                    o = T(this._ps, !1, !0);
                t && Object(i.k)(o, -1);
                var n = this._getName(),
                    s = this.getCoverPhoto();
                void 0 === s && t && (s = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && ((r = r || {}).from_post_convert = 1), z.save(this.getArticleOwnerId(), this.getArticleId(), o, t, n, s ? s.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s, c, l) {
                    if (isString(r) && r.startsWith("locked ")) return a.getOptions().editLockMessage = r.slice("locked ".length), a.showEditLockInfo(), void(e && e(!0));
                    r || (i && (a._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(ct({}, nav.objLoc, {
                        article_id: a.getArticleOwnerId() + "_" + a.getArticleId()
                    })), a._publishNameCandidate = n, t && (a._options.isPublished = !0), a._options.monetizationAllowed = l, a._replaceVideos(c)), e && e(r, i, o, s)
                })
            }, t.prototype._replaceVideos = function() {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    r = !1;
                try {
                    e.forEach(function(e) {
                        var i = W(e, 4),
                            a = i[0],
                            o = i[1],
                            n = i[2],
                            s = i[3];
                        t._ps.forEach(function(e, i) {
                            if (e.type == h.b.ObjectVideo) {
                                var c = e.mediaId.split("_"),
                                    l = W(c, 3),
                                    d = l[0],
                                    p = l[1];
                                l[2] || d != a || p != o || (e.mediaId = n + "_" + s, t._setParagraphDirty(i), r = !0)
                            }
                        })
                    })
                } catch (t) {}
                r && this._redrawModel()
            }, t.prototype.focus = function() {
                this._restoreLastCursor()
            }, t.prototype.focusLastParagraph = function() {
                Object(i.o)(this._getParagraphElByIndex(this._ps.length - 1))
            }, t.prototype.getArticleId = function() {
                return this._options.articleId
            }, t.prototype.getArticleOwnerId = function() {
                return this._options.articleOwnerId
            }, t.prototype._getSaveDraftHash = function() {
                return this._options.saveDraftHash
            }, t.prototype._expandBlockquoteParagraphs = function(t) {
                for (var e = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = e.shift();)
                    if (Object(i.J)(r)) {
                        var a = r.tagName,
                            o = Array.prototype.slice.call(r.children),
                            n = o[0];
                        if (1 == o.length && n && n.tagName && inArray(n.tagName, ["H1", "H2", "H3"])) {
                            ut(r, n);
                            continue
                        }
                        if (o.shift(), o.length)
                            for (var s = void 0; s = o.shift();) {
                                if (this._saveCursorMarker(), t) pt(s, r);
                                else {
                                    var c = ot("<" + a + "></" + a + ">");
                                    c.appendChild(s), pt(c, r)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }, t.prototype._ensureDummyParagraphs = function() {
                if (this._els.canvas) {
                    var t = this._els.canvas.lastChild;
                    if (t)
                        if (dt(t.innerHTML) && "<br>" != t.innerHTML && "&nbsp;" != t.innerHTML || "H1" == t.tagName) {
                            var e = Object(i.e)({});
                            this._els.canvas.appendChild(this._renderParagraph(e)), this._ps.push(e), this._updateTextPlaceholders()
                        }
                }
            }, t.prototype._ensureAtLeastOneParagraph = function() {
                0 == this._ps.length && (this._ps = [Object(i.e)({
                    type: h.b.Text
                })])
            }, t.prototype._ensureTitleParagraph = function() {
                var t = this;
                if (!this._options.noTitle) {
                    var e = this._ps[0];
                    Object(i.D)(e) && (this._ps[0] = Object(i.e)({
                        type: h.b.Header1
                    })), e.type = h.b.Header1, e.lines[0].decorations = {}, e.lines[0].brs = [], delete e.sep
                }
                this._ps.forEach(function(e, r) {
                    (t._options.noTitle || 0 != r) && (1 == r && e.type == h.b.Header1 && (e.type = h.b.Text), e.type == h.b.Header1 && (e.type = h.b.Header2))
                })
            }, t.prototype._insertParagraphAt = function(t, e) {
                this._ps.splice(t, 0, e)
            }, t.prototype._deleteParagraphFrom = function(t) {
                this._ps.splice(t, 1)
            }, t.prototype._focusParagraph = function(t, e) {
                Object(i.o)(this._getParagraphElByIndex(t), e)
            }, t.prototype._init = function() {
                this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._initResizeTooltip()
            }, t.prototype._redrawModel = function() {
                this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
            }, t.prototype.addObjectAudio = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 1)[0];
                this.getArticleOwnerId() < 0 && (Q.audioAttachOriginalOwnerId = this.getArticleOwnerId(), Q.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: function(e, a, o, n) {
                        Object(i.H)(t._ps[r]) || t._insertParagraphAt(r, Object(i.e)());
                        var s = Object(i.e)({
                            type: h.b.ObjectAudio,
                            mediaId: o.fullId
                        });
                        p.add(h.b.ObjectAudio, o.fullId, {
                            audio: n
                        }), t._getOrCreateParagraphObject(s), t._ps[r] = s, e.shiftKey || curBox().hide(), t._redrawModel();
                        var c = t._getParagraphElByIndex(r);
                        Object(i.o)(c), t.saveUndoStateAndDraft(), r++
                    },
                    onPlaylistChoose: function(e, a) {
                        var o = a.getOwnerId() + "_" + a.getPlaylistId() + (a.getAccessHash() ? "_" + a.getAccessHash() : ""),
                            n = Object(i.e)({
                                type: h.b.ObjectAudioPlaylist,
                                mediaId: o
                            });
                        p.add(h.b.ObjectAudioPlaylist, o, {
                            accessHash: a.getAccessHash()
                        }), t._getOrCreateParagraphObject(n), t._ps[r] = n, curBox().hide(), t._redrawModel();
                        var s = t._getParagraphElByIndex(r);
                        Object(i.o)(s), t.saveUndoStateAndDraft()
                    }
                })
            }, t.prototype.closeAllCarouselEditors = function() {
                this._ps.forEach(function(t) {
                    t.type == h.b.ObjectPhoto && t._object.cancelCarouselEditor && t._object.cancelCarouselEditor()
                })
            }, t.prototype.setMediaUploadMode = function(t) {
                this._isUploading = !!t, lt(this._els.editor, "article_ed__uploading", this._isUploading)
            }, t.prototype.isMediaUploadMode = function() {
                return this._isUploading
            }, t.prototype.addObjectVideo = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 1)[0],
                    a = this._getParagraph(r),
                    o = Object(i.w)(a);
                delete a.sep;
                showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId()
                });
                Q.chooseMedia = function(e, a, n, s, c) {
                    var l = Object(h.d)(n.editable.sizes, t.getWidth()),
                        d = W(l, 1)[0],
                        _ = Object(i.e)({
                            type: h.b.ObjectVideo,
                            mediaId: a,
                            sep: o
                        });
                    o = !1, p.add(h.b.ObjectVideo, a, {
                        editable: n.editable,
                        thumb: d,
                        duration: n.editable.duration,
                        platform: n.editable.platform
                    }), t._getOrCreateParagraphObject(_), 0 == s ? t._ps[r] = _ : t._ps.splice(r + s, 0, _), t._redrawModel(), t._saveUndoState();
                    var u = t._getParagraphElByIndex(r);
                    Object(i.o)(u), !c && curBox() && curBox().hide(), t.saveDraft()
                }
            }, t.prototype.addObjectDoc = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 1)[0],
                    a = this._getParagraph(r),
                    o = Object(i.w)(a);
                delete a.sep, Q.docsCurFilter = "gif";
                var n = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                Q.chooseMedia = function(e, a, s) {
                    n.hide();
                    var c = Object(i.e)({
                        type: h.b.ObjectGIF,
                        mediaId: a,
                        sep: o
                    });
                    o = !1, p.add(h.b.ObjectGIF, a, {
                        video: s.video_preview,
                        size: s.video_preview_size,
                        href: s.href
                    }), t._getOrCreateParagraphObject(c), t._insertParagraphAt(r, c), t._redrawModel(), t._saveUndoState(), t.saveDraft(), t._updateTextPlaceholders()
                }, Q.showMediaProgress = function() {}
            }, t.prototype.addObjectPhoto = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 1)[0],
                    a = this._getParagraph(r) || Object(i.e)(),
                    o = showBox("al_photos.php", {
                        to_id: this.getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: 200,
                        article: 1
                    }, {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    }),
                    n = void 0;
                Q.onMediaUploadStarted = function() {
                    var e = Object(i.e)({
                            type: h.b.ObjectPhoto
                        }),
                        a = t._renderObjectParagraph(e, ""),
                        o = t._getParagraphElByIndex(r);
                    nt(a, o), Object(i.o)(o), n = a, t.setMediaUploadMode(!0)
                }, Q.onMediaUploadFail = function() {
                    delete Q.onMediaUploadStarted, n && at(n), t.setMediaUploadMode(!1)
                };
                var s = void 0,
                    c = -1;
                Q.chooseMedia = function(e, l, d, _) {
                    void 0 === _ ? c++ : c = intval(_), delete Q.onMediaUploadStarted, t.setMediaUploadMode(!1), n && at(n);
                    var u = Object(i.e)({
                        type: h.b.ObjectPhoto,
                        mediaId: l,
                        sep: a.sep
                    });
                    return p.add(h.b.ObjectPhoto, l, {
                        size: Object(i.t)(d.editable.sizes),
                        sizes: d.editable.sizes
                    }), t._getOrCreateParagraphObject(u), c ? t._ps.splice(r + c, 0, u) : t._ps[r] = u, void 0 === _ && o.hide(), clearTimeout(s), s = setTimeout(function() {
                        t._redrawModel(), t._focusParagraph(r + c), t._updateTextPlaceholders(), t.saveUndoStateAndDraft()
                    }, 10), !1
                }, Q.showMediaProgress = function() {}
            }, t.prototype.addSeparator = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 1)[0],
                    r = Object(i.w)(this._getParagraph(e)),
                    a = Object(i.w)(this._getParagraph(e + 1));
                !r && !a && e < this._ps.length - 1 && this._ps.splice(e, 1), this._getParagraph(e).sep = 1;
                var o = this._getCursor();
                this._redraw(!0), this._restoreCursor(o), this._updateTextPlaceholders()
            }, t.prototype.onObjectStateLoaded = function() {
                this.saveDraft(), this._showObjectPicker()
            }, t.prototype._hideObjectPicker = function() {
                this._objectPickerTooltip && this._objectPickerTooltip.hide()
            }, t.prototype._showObjectPicker = function() {
                if (!this.isLocked()) {
                    if (!this._objectPickerEl) {
                        this._objectPickerEl = ot('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var t = ot('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>');
                        this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                            content: t,
                            forceSide: "right",
                            cls: "article_editor_object_picker_tt",
                            autoShow: !1,
                            elClassWhenShown: "article_editor_object_picker_tt_shown",
                            offset: [2, 0]
                        }), this._objectPickerEl.addEventListener("mousedown", function(t) {
                            return cancelEvent(t)
                        })
                    }
                    var e = this._getCurrentParagraphIndex(),
                        r = W(e, 2),
                        a = r[0],
                        o = r[1];
                    if (!this.isMediaUploadMode() && !1 !== a && a == o && Object(i.H)(this._ps[a], !0) && this._ps[a] && inArray(this._ps[a].type, [h.b.Text, h.b.Header2, h.b.Header3])) {
                        show(this._objectPickerEl);
                        var n = this._getParagraphElByIndex(a),
                            s = it(this._els.editor),
                            c = it(n)[1] - s[1],
                            l = !1;
                        this._uploadFloatList(), this._floatedObjects.forEach(function(t) {
                            t.startY <= c + 15 && t.endY + 30 >= c && (l = !0)
                        }), setStyle(this._objectPickerEl, {
                            left: l ? 355 : -40,
                            top: c
                        })
                    } else hide(this._objectPickerEl)
                }
            }, t.prototype._initLinksHrefTooltip = function() {
                var t = this;
                this._els.canvas.addEventListener("mouseover", function(e) {
                    if ("a" == e.target.tagName.toLowerCase()) {
                        if (t._linkTooltip && t._linkTooltip.destroy(), t._formatTooltip && t._formatTooltip.isShown()) return;
                        var r = e.target,
                            a = r.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                            o = Object(i.m)(a);
                        Object(i.K)(a) || (a = "/away.php?to=" + encodeURIComponent(a) + "&utf=1"), t._linkTooltip = new ElementTooltip(r, {
                            cls: "article_editor_link_show_tt",
                            appendTo: t._els.editor,
                            content: ot('<a target="_blank" rel="noopener" href="' + a + '" class="article_editor_link">' + o + "</a>")
                        })
                    }
                })
            }, t.prototype._isTrackedObjectEl = function(t) {
                var e = et(t, "uuid");
                return !!e && !!this._getObject(e)
            }, t.prototype._cloneObjectParagraphs = function() {
                for (var t = Array.prototype.slice.call(this._els.canvas.children), e = void 0, r = {}; e = t.shift();)
                    if (Object(i.E)(e)) {
                        var a = e.getAttribute("data-uuid"),
                            o = parseInt(e.getAttribute("data-type"));
                        if (r[a]) {
                            var n = this._getObject(a);
                            a = Bt(), this._getOrCreateParagraphObject({
                                type: o,
                                _uuid: a,
                                mediaId: n.getMediaId()
                            }), et(e, "uuid", a)
                        }
                        r[a] = !0
                    }
            }, t.prototype._correctCursorToBeWithinCanvas = function() {
                var t = Object(i.u)(),
                    e = W(t, 2),
                    r = e[0];
                e[1] && r.startContainer == this._els.canvas && this._focusParagraph(0)
            }, t.prototype._triggerInputEvent = function() {
                this._els.canvas.dispatchEvent(new Event("input"))
            }, t.prototype.getCursor = function() {
                return this._getCursor()
            }, t.prototype._getCursor = function() {
                var t = this._els.canvas,
                    e = Object(i.u)(),
                    r = W(e, 2),
                    a = r[0],
                    o = r[1];
                if (!a) return !1;
                var n = {
                    start: {
                        path: [],
                        textOffset: void 0,
                        nodeOffset: void 0
                    },
                    end: {
                        path: [],
                        textOffset: void 0,
                        nodeOffset: void 0
                    }
                };

                function s(e, r, a) {
                    r.nodeType == Node.TEXT_NODE ? e.textOffset = a : e.nodeOffset = a, st(r, function(r) {
                        if (r == t) return !0;
                        Object(i.J)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), e.path.push(Object(i.f)(r))
                    }, 10), e.path = e.path.slice().reverse()
                }
                return s(n.start, a.startContainer, a.startOffset), o ? delete n.end : s(n.end, a.endContainer, a.endOffset), n.isEmpty = function() {
                    return !n.end && 0 == n.start.nodeOffset && 0 == n.start.path.length && 0 == n.start.path[0]
                }, n
            }, t.prototype.restoreCursor = function(t) {
                this._restoreCursor(t)
            }, t.prototype._restoreCursor = function(t) {
                if (!t) return this._restoreCursorFromMarker();
                var e = this._els.canvas;

                function r(t) {
                    var r = e;
                    t.path.forEach(function(e, o) {
                        if (Object(i.J)(r)) {
                            var n = r.firstChild;
                            n && 1 == o && n.nodeType == Node.ELEMENT_NODE && "p" == n.tagName.toLowerCase() && (r = n)
                        }
                        e = Math.min(r.childNodes.length - 1, e);
                        var s = r.childNodes[e];
                        if (!s) return t.nodeOffset = a = 0, !1;
                        r = s
                    });
                    var a = void 0;
                    return a = r.nodeType == Node.TEXT_NODE && void 0 !== t.textOffset ? Math.min(r.textContent.length, t.textOffset) : 0, void 0 !== t.nodeOffset && r && r.children && (a = Math.min(t.nodeOffset, r.childNodes.length)), [r, a]
                }
                var a = document.createRange();
                try {
                    var o = r(t.start),
                        n = W(o, 2),
                        s = n[0],
                        c = n[1];
                    if (Object(i.y)(s) && 0 == c) {
                        var l = domPN(s);
                        Object(i.G)(l) && 1 == l.childNodes.length && (s = l)
                    }
                    if (a.setStart(s, c), t.end) {
                        var d = r(t.end),
                            p = W(d, 2),
                            h = p[0],
                            _ = p[1];
                        a.setEnd(h, _)
                    }
                    window.getSelection().setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset)
                } catch (t) {
                    debugLog(t)
                }
            }, t.prototype._saveLastCursor = function() {
                var t = this._getCursor(),
                    e = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                t && !t.isEmpty() ? ls.set(e, JSON.stringify(t)) : ls.remove(e)
            }, t.prototype._restoreLastCursor = function() {
                var t = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                t ? (t = JSON.parse(t), this._restoreCursor(t)) : Object(i.o)(this._els.canvas.firstChild)
            }, t.prototype._toggleCodeBlocks = function() {
                for (var t = void 0, e = this._getCurrentParagraphIndex(), r = W(e, 2), i = r[0], a = r[1], o = i; o <= a; o++) void 0 === t && (t = this._ps[o].type != h.b.Code), this._ps[o].type = t ? h.b.Code : h.b.Text;
                var n = this._getCursor();
                this._redraw(!0), this._restoreCursor(n), this._updateTextPlaceholders()
            }, t.prototype._removeExtraSeparators = function() {
                for (var t = this._els.canvas.children, e = void 0, r = 0; r < t.length; r++) {
                    var i = t[r],
                        a = et(i, "sep");
                    a && (void 0 !== e && a == e && et(i, "sep", null), e = a)
                }
            }, t.prototype._replaceAlienInlineTags = function() {
                var t = !1,
                    e = {
                        b: "strong",
                        i: "em"
                    };
                return function r(i) {
                    var a = i.tagName.toLowerCase();
                    if (e[a]) {
                        t || (this._saveCursorMarker(), t = !0);
                        var o = ce(e[a], {
                            innerHTML: i.innerHTML
                        });
                        ut(i, o)
                    } else
                        for (var n = Array.prototype.slice.call(i.childNodes), s = void 0; s = n.shift();) s.nodeType == Node.ELEMENT_NODE && r.call(this, s)
                }.call(this, this._els.canvas), t && this._restoreCursorFromMarker(), t
            }, t.prototype._cleanParagraphsBRs = function() {
                this._ps.forEach(function(t) {
                    t.lines.forEach(i.h)
                })
            }, t.prototype._initEvents = function() {
                var t = this;
                if (!this.isLocked()) {
                    this._setEventListener(window, "scroll", function() {
                        var e = scrollGetY(),
                            r = window.innerHeight;
                        t._ps.forEach(function(a, o) {
                            if (Object(i.D)(a)) {
                                var n = t._getParagraphElByIndex(o),
                                    s = rt(n),
                                    c = it(n),
                                    l = c[1] < e + r && c[1] + s[1] > e;
                                a._object.onViewport && a._object.onViewport(l)
                            }
                        })
                    });
                    var e = 0;
                    this._setEventListener(document, "selectionchange", function() {
                        var r = Object(i.u)(),
                            a = W(r, 2),
                            n = a[0],
                            s = a[1];
                        if (n && !st(n.commonAncestorContainer, function(e) {
                                return e == t._els.canvas
                            })) return;
                        var c = t._getCurrentParagraphIndex(),
                            l = W(c, 1)[0];
                        if (!1 !== l) {
                            if (!s && tt(n.startContainer, "article")) {
                                var d = t._ps[e];
                                if (Object(i.D)(d)) return void Object(i.o)(d._object.getCaptionEl())
                            }
                            var p = n.startContainer;
                            if (V.msie && s && ht("article_ed__extra_controls", p) && "BUTTON" != p.tagName) {
                                var _ = t._ps[l];
                                if (Object(i.D)(_)) return void _._object.getCaptionEl().focus()
                            }
                            e = l, t._highlightObjectsInCurrentSelection(), t._showObjectPicker(), t._correctCaptionSelection(), t._ensureDummyParagraphs(), 0 == o && t._showFormatTooltip(), t._saveLastCursor();
                            var u = t._getParagraph(l);
                            if (Object(i.D)(u) && h.c.includes(parseInt(u.type))) {
                                if (t._resizeTooltip) {
                                    clearTimeout(f);
                                    var f = setTimeout(function() {
                                        t._showResizeTooltip()
                                    }, 100)
                                }
                            } else t._resizeTooltip && t._resizeTooltip.isShown() && t._resizeTooltip.hide()
                        } else t._showObjectPicker()
                    });
                    var r = !1,
                        a = !1,
                        o = !1;
                    this._els.canvas.addEventListener("mousedown", function() {
                        o = !0;
                        var e = void 0;
                        t._setEventListener(window, "mouseup", e = function(r) {
                            o = !1, "article_format_btn_link" == r.target.id || (t._showFormatTooltip(), e && window.removeEventListener("mouseup", e))
                        })
                    }), this._els.canvas.addEventListener("selectstart", function() {
                        t._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", function(e) {
                        var r = Object(i.u)(),
                            a = W(r, 2),
                            o = a[0];
                        if (a[1]) {
                            var n = t._getContainingParagraphEl(o.commonAncestorContainer),
                                s = W(n, 1)[0];
                            Object(i.E)(s) && (e.clipboardData.setData("text/plain", "uuid:" + s.getAttribute("data-uuid")), e.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", function(e) {
                        var r = t._getCurrentParagraphIndex(),
                            i = W(r, 1)[0];
                        i && (t._handleObjectPaste(e), t._handleLinkPaste(e), t._handlePhotoPaste(e), t._fromPasteEvent = !0, t._pasteCurrentIndex = i)
                    }), this._els.canvas.addEventListener("click", function(t) {
                        if (t.target.nodeType == Node.ELEMENT_NODE && "A" == t.target.tagName) return cancelEvent(t)
                    });
                    var n = !1;
                    this._els.canvas.addEventListener("input", function() {
                        t._hideObjectPicker(), t._expandBlockquoteParagraphs(c), t._removeExtraSeparators();
                        var e = t._replaceAlienInlineTags();
                        V.safari || t._els.canvas.normalize();
                        var i = void 0;
                        t._fromPasteEvent || e || t._markerCursorSet ? t._saveCursorMarker() : i = t._getCursor(), t._processAlienPhotos(), t._flattenAlienParagraphs(), t._cloneObjectParagraphs(), t._ps.length > 0 && t._els.canvas.children.length !== t._ps.length && t._setAllParagraphsDirty(), t._dirty.forEach(t._updateLineData.bind(t)), n && (t._cleanParagraphsBRs(), n = !1), t._ensureAtLeastOneParagraph(), t._ensureTitleParagraph();
                        var o = !1;
                        if (t._fromPasteEvent) try {
                            o = t._expandDoubleBRs()
                        } catch (t) {
                            console.error(t)
                        }
                        t._redraw(o), t._restoreCursor(i), t._correctCursorToBeWithinCanvas(), t._dirty = [], a ? t._saveUndoStateDelayed() : t._saveUndoState(), r = a = !1, t._fromPasteEvent = !1, t._updateTextPlaceholders(), t.saveDraft(), t._undoable = !0, t._options.onUndoRedo && t._options.onUndoRedo()
                    });
                    var s = !1,
                        c = !1,
                        l = 1,
                        d = void 0;
                    this._els.canvas.addEventListener("keydown", function(e) {
                        var o = e.keyCode,
                            p = e.metaKey || e.ctrlKey,
                            _ = e.shiftKey,
                            u = Object(i.u)(),
                            f = W(u, 2),
                            g = f[0],
                            v = f[1];
                        if (g) {
                            var b = t._getCurrentParagraphIndex(),
                                y = W(b, 2),
                                m = y[0],
                                O = y[1],
                                j = t._getParagraph(m),
                                E = !1;
                            if (Object(i.D)(j))
                                if (j._object.isCaptionFocused()) E = 0 == g.startOffset && v;
                                else {
                                    var C = t._getContainingParagraphEl(g.startContainer);
                                    E = W(C, 1)[0] == j._object.el()
                                }
                            if (E && v && V.mozilla) {
                                if (o == Tt) return t._focusParagraph(m - 1, !0), cancelEvent(e);
                                if (o == It) return t._focusParagraph(m + 1, !0), cancelEvent(e)
                            }
                            if ((o == St || o == Pt) && t._resizeTooltip && t._resizeTooltip.isShown() && t._resizeTooltip.hide(), o == kt && v && 0 == m) return Object(i.o)(t._getParagraphElByIndex(1)), cancelEvent(e);
                            if (p && o == yt && Object(i.D)(j) && j._object.isCaptionFocused()) {
                                var w = j._object.getCaptionEl();
                                return Object(i.S)(w), cancelEvent(e)
                            }
                            if (p) switch (o) {
                                case mt:
                                    return t._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(e);
                                case jt:
                                    return t._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(e);
                                case Et:
                                    return t.saveDraft(!1, !1, !0), cancelEvent(e);
                                case wt:
                                    return _ ? t.redo() : t.undo(), cancelEvent(e);
                                case Ct:
                                    return t.redo(), cancelEvent(e)
                            }
                            var x = o == Ot && e.altKey,
                                T = j ? j.type : h.b.Text,
                                I = Object(F.U)("pre", g.startContainer),
                                S = !!(I || Object(F.U)("pre", g.endContainer) || g.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == g.startContainer.tagName);
                            if (x) {
                                if (T === h.b.Header1) return cancelEvent(e);
                                if (v) return t._toggleCodeBlocks(), cancelEvent(e);
                                if (!S && inArray(T, [h.b.Text, h.b.NumericList, h.b.BulletList])) {
                                    t._setCurrentParagraphDirty();
                                    var k = Object(F.U)("code", g.startContainer) || Object(F.U)("code", g.endContainer);
                                    if (k) {
                                        t._saveCursorMarker();
                                        var L = ot("<span></span>");
                                        L.innerHTML = k.innerHTML, ut(k, L), t._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), V.msie && t._triggerInputEvent();
                                    return cancelEvent(e)
                                }
                            }
                            if (o == kt && S && T == h.b.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(e);
                            var M = !1;
                            if (o == Pt) {
                                if (s) return s[0].textContent = s[1], t._restoreCursor(s[2]), s = !1, cancelEvent(e);
                                if (E) {
                                    var A = t._getParagraphElByIndex(m),
                                        D = Object(i.l)("", Object(i.w)(j));
                                    return t._correctEmptyParagraphAfterFloatObjects(), ut(A, D), Object(i.o)(D), t._setAllParagraphsDirty(), t._triggerInputEvent(), cancelEvent(e)
                                }
                                if (g && 0 == g.startOffset && g.collapsed) {
                                    var N = Object(F.U)("li", g.startContainer),
                                        B = Object(i.r)(N);
                                    if (N) {
                                        var H = t._ps[m],
                                            U = clone(H),
                                            z = clone(H);
                                        U.lines = U.lines.slice(0, B);
                                        var R = Object(i.e)({
                                            lines: [clone(H.lines[B])]
                                        });
                                        z.lines = z.lines.slice(B + 1), t._ps.splice(m, 1, U, R, z), t._redraw(!0);
                                        var G = t._getParagraphElByIndex(m + 1);
                                        return Object(i.o)(G), t._saveUndoState(), cancelEvent(e)
                                    }
                                }
                                if (g && v && 0 == g.startOffset && "LI" !== g.startContainer.nodeName) {
                                    var Q = t._getCurrentParagraphIndex(),
                                        Y = W(Q, 1)[0],
                                        K = Y > 0 && t._ps[Y - 1];
                                    if (Object(i.D)(K)) {
                                        Object(i.H)(t._ps[Y]) && (t._ps.splice(Y, 1), t._redraw(!0));
                                        var $ = t._getParagraphElByIndex(Y - 1);
                                        return Object(i.o)($), cancelEvent(e)
                                    }
                                }
                                t._setAllParagraphsDirty(), V.msie && setTimeout(function() {
                                    t._triggerInputEvent()
                                })
                            }
                            if (o == St) {
                                var X = t._ps[m],
                                    q = t._ps[m + 1],
                                    tt = getCaretCharacterOffsetWithin(g.startContainer),
                                    et = W(tt, 1)[0],
                                    rt = g.startContainer.textContent.length == et;
                                if (E)
                                    if (!(X._object.isCaptionFocused() && !!X.lines[0].text)) {
                                        var it = t._getParagraphElByIndex(m),
                                            at = Object(i.l)();
                                        return ut(it, at), Object(i.o)(at), t._setAllParagraphsDirty(), t._triggerInputEvent(), cancelEvent(e)
                                    }
                                if (v && Object(i.w)(q) && rt) return t._setParagraphDirty(m + 1), delete q.sep, t._redraw(!1, !0), cancelEvent(e);
                                if (v && rt && Object(i.D)(q)) return Object(i.H)(X) && X.type != h.b.Header1 && (t._ps.splice(m, 1), t._redraw(!0, !0)), Object(i.o)(q._object.getCaptionEl()), cancelEvent(e);
                                q && Object(i.H)(X) && inArray(q.type, [h.b.Header2, h.b.Header3]) && (X.type = q.type, t._setParagraphDirty(m), t._redraw()), t._setAllParagraphsDirty(), (V.msie && 0 == g.startOffset && 0 == m || _) && setTimeout(function() {
                                    t._setCurrentParagraphDirty(), t._triggerInputEvent()
                                })
                            } else if (o == xt) {
                                if (S && I && T == h.b.Code && v) {
                                    var st = I.textContent.search(/[^\s]/);
                                    return -1 == st && (st = I.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(st)), cancelEvent(e)
                                }
                                if (t._isWithinObjectParagraphEl(Object(i.s)())) {
                                    var ct = t._getContainingParagraphEl(Object(i.s)()),
                                        lt = W(ct, 2),
                                        dt = lt[0],
                                        ht = lt[1],
                                        _t = Object(i.l)(),
                                        ft = t._ps[ht]._object;
                                    return !ft.isCaptioned() || ft.isCaptionFocused() ? pt(_t, dt) : nt(_t, dt), t._setAllParagraphsDirty(), Object(i.o)(_t), t._triggerInputEvent(), cancelEvent(e)
                                }
                                var gt = t._getContainingParagraphEl(Object(i.s)()),
                                    Lt = W(gt, 3),
                                    Mt = Lt[0],
                                    At = (Lt[1], Lt[2]),
                                    Dt = getCaretCharacterOffsetWithin(Mt),
                                    Nt = W(Dt, 2)[1];
                                if (e.shiftKey || e.ctrlKey && V.safari) {
                                    var Bt = getCaretCharacterOffsetWithin(Mt),
                                        Ht = W(Bt, 2)[1],
                                        Ut = Z("li", g.startContainer),
                                        zt = 0;
                                    Ut && (zt = vt(Ut));
                                    var Ft = !1;
                                    if (J(At.lines, function(t, e) {
                                            var r = e.brs,
                                                i = e.text.length;
                                            return 0 == Ht || Ht <= i && inArray(Ht, r) ? (Ft = !0, !1) : !((Ht -= i) <= 0 && t == zt) && void 0
                                        }), Ft) {
                                        n = !0, t._setParagraphDirty(m, O), document.execCommand("insertParagraph");
                                        var Rt = bt(Mt);
                                        return Rt && (Object(i.o)(Rt), Rt.focus()), t._triggerInputEvent(), cancelEvent(e)
                                    }
                                    V.msie && 0 == Ht && g.insertNode(ot("<br>"))
                                }
                                var Wt = v && g.startContainer.nodeType == Node.TEXT_NODE && !g.startContainer.nextSibling && Nt == Mt.textContent.length;
                                c = Wt && !Object(i.C)(t._ps[m]) && !e.shiftKey && inArray(At.type, [h.b.Quote, h.b.Quote2]), window.browser && window.browser.msie && setTimeout(t._triggerInputEvent.bind(t)), t._setParagraphDirty(m, O)
                            } else e.key && 1 == e.key.length ? (t._setParagraphDirty(m), t._setParagraphDirty(O), e.metaKey || (M = !0, e.key && (Object(i.z)(e.key) ? l += 1 : Object(i.B)(e.key) && (l -= 1), l = Math.min(Math.max(l, -5), 5))), r = Object(i.L)(e.key), M && !r && (a = !0), setTimeout(function() {
                                var e = Object(i.u)(),
                                    r = W(e, 2),
                                    a = r[0],
                                    o = r[1],
                                    n = t._getParagraph(m);
                                if (n && (n.type != h.b.Code && !!!(Object(F.U)("code", a.startContainer) || a.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == a.startContainer.tagName) && (d = d || l > 0, o && a))) {
                                    var c = a.startContainer;
                                    if (c.nodeType == Node.TEXT_NODE && a.startOffset > 0)
                                        for (var p = c.textContent.substring(a.startOffset - 5, a.startOffset), _ = 0, u = P.length; _ < u; _++) {
                                            var f = P[_];
                                            if (void 0 === f.cyrillic || f.cyrillic === d)
                                                if (f.pattern instanceof RegExp) {
                                                    var g = p.match(f.pattern);
                                                    if (g) {
                                                        var v = f.substitution;
                                                        g.length > 1 && (v = v.replace("$1", g[1])), b.call(t, a.startOffset, c, g[0], v, f.noUndo);
                                                        break
                                                    }
                                                } else if (p.endsWith(f.pattern)) {
                                                b.call(t, a.startOffset, c, f.pattern, f.substitution, f.noUndo);
                                                break
                                            }
                                        }
                                }

                                function b(t, e, r, i, a) {
                                    var o = this._getCursor(),
                                        n = e.textContent.substring(0, t - r.length),
                                        c = e.textContent.substring(t);
                                    a || (s = [e, n + r + c, o]), e.textContent = n + i + c, this._restoreCursor(o), this._setParagraphDirty(m), this._triggerInputEvent()
                                }
                            }, 0)) : !1;
                            s = !1
                        }
                    }), this._setEventListener(window, "resize", function() {
                        t._resizeTooltip && t._resizeTooltip.isShown() && t._updatePositionResizeTooltip()
                    })
                }
            }, t.prototype._isParagraphEl = function(t) {
                return t && tt(t, i.a)
            }, t.prototype._isWithinObjectParagraphEl = function(t) {
                var e = this._getContainingParagraphEl(t),
                    r = W(e, 1)[0];
                return r && Object(i.E)(r)
            }, t.prototype._highlightObjectsInCurrentSelection = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 2),
                    r = e[0],
                    i = e[1];
                !1 !== r && !1 !== i && this._ps.forEach(function(t, e) {
                    if (t._object) {
                        var a = r != i;
                        t._object.highlight(e >= r && e <= i, a)
                    }
                })
            }, t.prototype._getOrCreateParagraphObject = function(t) {
                t._uuid || (t._uuid = Bt());
                var e = this._getObject(t._uuid);
                if (!e) {
                    var r = t.mediaId || "";
                    switch (parseInt(t.type)) {
                        case h.b.ObjectPhoto:
                            e = new m(r, this, t);
                            break;
                        case h.b.ObjectVideo:
                            e = new O(r, this);
                            break;
                        case h.b.ObjectGIF:
                            e = new j(r, this);
                            break;
                        case h.b.ObjectAudio:
                            e = new w(r, this);
                            break;
                        case h.b.ObjectAudioPlaylist:
                            e = new u(r, this);
                            break;
                        case h.b.ObjectPodcast:
                            e = new C(r, this);
                            break;
                        case h.b.ObjectTwitter:
                            e = new S(r, this);
                            break;
                        case h.b.ObjectInstagram:
                            e = new M(r, this);
                            break;
                        case h.b.ObjectFacebook:
                            e = new L(r, this);
                            break;
                        case h.b.ObjectVK:
                            e = new D(r, this);
                            break;
                        case h.b.ObjectTelegram:
                            e = new B(r, this)
                    }
                    this._setObject(t._uuid, e)
                }
                return t._object = e, e
            }, t.prototype._forgetObject = function(t) {
                delete this._objects[t]
            }, t.prototype._getObject = function(t) {
                return this._objects[t] || null
            }, t.prototype._setObject = function(t, e) {
                return this._objects[t] = e
            }, t.prototype._updateLineData = function(t) {
                var e = this._getParagraphElByIndex(t);
                if (e) {
                    if (this._isWithinObjectParagraphEl(e)) {
                        var r = Object(i.O)(e),
                            a = W(r, 3),
                            o = a[0],
                            n = a[1],
                            s = a[2],
                            c = this._getObject(n);
                        if (!c) return;
                        var l = Object(i.e)();
                        if (c.getCaptionEl()) {
                            var d = this._getParagraphFromHTML("", c.getCaptionEl().innerHTML, !0);
                            if (o == h.b.ObjectPhoto) {
                                var p = et(c.el(), "paragraph-lines");
                                p && (l.lines = JSON.parse(p));
                                var _ = c.getImageIndex();
                                l.lines[_] = d.lines[0];
                                for (var u = 0; u < l.lines.length; u++) l.lines[u] = l.lines[u] || {
                                    text: "",
                                    decorations: {}
                                }
                            } else l.lines[0] = d.lines[0]
                        }
                        l.type = o, l.mode = s, l._uuid = n, l._object = c, this._ps[t] = l
                    } else if (e.nodeType == Node.ELEMENT_NODE) {
                        var f = e.tagName.toLowerCase();
                        this._ps[t] = this._getParagraphFromHTML(f, e.innerHTML)
                    } else this._ps[t] = this._getParagraphFromHTML("p", e.textContent);
                    e.nodeType == Node.ELEMENT_NODE && et(e, "sep") && (this._ps[t].sep = !0)
                }
            }, t.prototype.onDragEnd = function() {
                this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
            }, t.prototype.getCurrentParagraphs = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 2),
                    r = e[0],
                    i = e[1];
                return [this._getParagraphElByIndex(r), this._getParagraphElByIndex(i)]
            }, t.prototype._initObjectDrag = function() {
                var t = this,
                    e = void 0,
                    r = void 0,
                    a = void 0,
                    o = void 0,
                    n = !1,
                    s = this._els,
                    c = void 0;

                function l(t) {
                    c != t && (J(geByClass("article_ed__drag_hovered"), function(t, e) {
                        q(e, "article_ed__drag_hovered")
                    }), t && Y(t, "article_ed__drag_hovered"), c = t)
                }

                function d() {
                    window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", r), n = !1, q(s.canvas, "no_select"), clearInterval(o), l(!1), at(a), a = !1
                }
                this._els.canvas.addEventListener("mousedown", function(s) {
                    if (a && at(a), 2 == s.button) return d(), cancelEvent(s);
                    var c = rt(t._els.canvas)[1];
                    q(t._els.canvas, "no_select"), l(!1);
                    var p = t._getContainingParagraphEl(s.target),
                        h = W(p, 3),
                        _ = h[0],
                        u = h[1],
                        f = h[2];
                    if (Object(i.D)(f)) {
                        var g = s.pageY,
                            v = void 0,
                            b = void 0,
                            y = void 0,
                            m = void 0,
                            O = void 0;
                        window.addEventListener("mousemove", e = function(e) {
                            if (a || !(Math.abs(g - e.pageY) < 10)) {
                                a || (a = ot('<div class="article_ed__drag_shadow"></div>'), t._els.editor.appendChild(a), (v = it(t._els.canvas))[1] -= scrollGetY(), b = rt(_), y = it(_), m = e.pageX - y[0], O = e.pageY - y[1] + t._options.layer.scrollTop, setStyle(a, {
                                    width: b[0],
                                    height: b[1]
                                }), t._focusParagraph(u)), Y(t._els.canvas, "no_select"), v || d(), setStyle(a, {
                                    left: e.pageX - v[0] - m,
                                    top: e.pageY - scrollGetY() - O - v[1] + t._options.layer.scrollTop
                                }), clearInterval(o), e.pageY - scrollGetY() < 200 ? o = setInterval(function() {
                                    t._options.layer.scrollTop -= 10
                                }, 10) : e.pageY - scrollGetY() > window.innerHeight - 200 && (o = setInterval(function() {
                                    t._options.layer.scrollTop + window.innerHeight > c + 300 ? clearInterval(o) : t._options.layer.scrollTop += 10
                                }, 10));
                                var r = t._getContainingParagraphEl(e.target),
                                    i = W(r, 2),
                                    s = i[0],
                                    p = i[1];
                                s && s != _ && s != Object(F.A)(_) ? (l(s), n = p) : (l(!1), n = !1)
                            }
                        }), window.addEventListener("mouseup", r = function() {
                            !1 !== n && u && (t._ps.splice(u, 1), Object(i.w)(f) && (t._ps[u].sep = 1, delete f.sep), t._ps.splice(n + 1, 0, f), t._redraw(!0, !0), t.saveUndoStateAndDraft(), t._resizeTooltip && t._resizeTooltip.isShown() && t._resizeTooltip.hide()), d()
                        })
                    }
                })
            }, t.prototype.isLocked = function() {
                return !!this.getOptions().editLockMessage
            }, t.prototype.showEditLockInfo = function() {
                this.isLocked() ? (this.showWarningInfo(this.getOptions().editLockMessage), this._els.canvas.removeAttribute("contenteditable"), hide(this._objectPickerEl), this._hideObjectPicker(), this._hideFormatTooltip()) : this.showWarningInfo(!1)
            }, t.prototype.showRevEditInfo = function() {
                nav.objLoc.from_rev && this.showWarningInfo(getLang("pages_article_rev_edit"))
            }, t.prototype.showWarningInfo = function(t) {
                var e = $("article_ed__warn_info", this._els.editor);
                e && !t && (q(this._els.editor, "article_ed__warn_shown"), at(e)), e || t && (e = ot('<div class="article_ed__warn_info">' + t + "</div>"), this._els.editor.appendChild(e), Y(this._els.editor, "article_ed__warn_shown"))
            }, t.prototype._initResizeTooltip = function() {
                var t = this,
                    e = ot('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
                this._resizeTooltip = new ElementTooltip(this._els.editor.parentNode, {
                    content: e,
                    autoShow: !1,
                    customShow: !0,
                    forceSide: "top",
                    cls: "resize-tooltip article_format_tt"
                }), e.addEventListener("click", function(e) {
                    if (e.target.classList.contains("article_format_btn")) {
                        var r = parseInt(e.target.dataset.mode);
                        t.setModeCurrentObject(r)
                    }
                })
            }, t.prototype._showResizeTooltip = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = W(t, 1)[0],
                    r = this._getParagraphElByIndex(e),
                    i = this._getParagraph(e),
                    a = intval(i.type);
                if (h.c.includes(a))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), tt(r, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else if (i._object.isLoading()) this._resizeTooltip.hide();
                else {
                    var o = [{
                            id: h.a.Float,
                            type: "inline"
                        }, {
                            id: h.a.Normal,
                            type: "text"
                        }, {
                            id: h.a.Medium,
                            type: "bigger"
                        }, {
                            id: h.a.Large,
                            type: "cover"
                        }],
                        n = $("resize-tooltip__btns"),
                        s = [1, 1, 1, 1];
                    switch (a) {
                        case h.b.ObjectPhoto:
                            i._object._isCarousel() ? s = [0, 1, 1, 0] : i._object._isSmallPhotoSize() || (s = [1, 1, 0, 0]);
                            break;
                        case h.b.ObjectGIF:
                            i._object._isSmallGifSize() || (s = [1, 1, 0, 0]);
                            break;
                        case h.b.ObjectTwitter:
                        case h.b.ObjectFacebook:
                        case h.b.ObjectInstagram:
                        case h.b.ObjectVK:
                        case h.b.ObjectTelegram:
                            s = [1, 1, 0, 0]
                    }
                    n.innerHTML = "", o.forEach(function(t, e) {
                        s[e] && n.appendChild(ot('\n          <button class="article_format_btn' + (i.mode == t.id || !i.mode && !t.id ? " article_format_btn_active" : "") + '" id="article_format_btn_' + t.type + '"  data-mode=' + t.id + " ></button>\n        "))
                    }), this._updatePositionResizeTooltip()
                }
            }, t.prototype._updatePositionResizeTooltip = function() {
                var t = this._resizeTooltip,
                    e = it(this._els.editor),
                    r = W(e, 2)[1],
                    i = this._getCurrentParagraphIndex(),
                    a = W(i, 1)[0],
                    o = this._getParagraphElByIndex(a).getBoundingClientRect(),
                    n = o.top,
                    s = o.left,
                    c = o.width,
                    l = rt(t._ttel)[0] / 2;
                setStyle(t._ttel, {
                    top: n - r - 60 + window.scrollY + 140,
                    left: s + c / 2 - l
                })
            }, t.prototype.setModeObject = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : h.a.Normal,
                    r = this._getParagraph(t);
                Object(i.D)(r) && (r.mode = e, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
            }, t.prototype.setModeCurrentObject = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h.a.Normal,
                    e = this._getCurrentParagraphIndex(),
                    r = W(e, 1)[0];
                this.setModeObject(r, t)
            }, t.prototype._uploadFloatList = function() {
                var t = this,
                    e = it(this._els.editor);
                this._floatedObjects = [], this._ps.forEach(function(r, i) {
                    if (r.mode && parseInt(r.mode) === h.a.Float) {
                        var a = t._getParagraphElByIndex(i),
                            o = a.getBoundingClientRect().height,
                            n = it(a);
                        t._floatedObjects.push({
                            startY: n[1] - e[1],
                            endY: n[1] - e[1] + o
                        })
                    }
                })
            }, t.prototype._correctEmptyParagraphAfterFloatObjects = function() {
                for (var t = 0; t < this._ps.length; t++) {
                    var e = this._ps[t],
                        r = this._ps[t + 1];
                    if (Object(i.F)(e) >= 0)
                        if (1 === parseInt(e.mode) && Object(i.D)(r)) {
                            var a = Object(i.e)();
                            a._autoInsert = !0, this._insertParagraphAt(t + 1, a)
                        } else 1 !== parseInt(e.mode) && r && r._autoInsert && this._deleteParagraphFrom(t + 1)
                }
            }, t
        }();
        window.ArticleEditor = Ht, stManager.done(jsc("web/article.js"))
    }
});