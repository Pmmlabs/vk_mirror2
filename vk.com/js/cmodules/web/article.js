! function(t) {
    function e(e) {
        for (var i, n, s = e[0], c = e[1], l = e[2], h = 0, _ = []; h < s.length; h++) n = s[h], a[n] && _.push(a[n][0]), a[n] = 0;
        for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (t[i] = c[i]);
        for (d && d(e); _.length;) _.shift()();
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
    o.push([51, "7f81047508570d6456c7d33e2e3c0bc3", "26c7804abc36bc7348ed5a4dec71c384"]), r()
}({
    51: function(t, e, r) {
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
            }(),
            l = r("sWID");
        var d = {};

        function h(t) {
            return (t = t.split("_"))[0] + "_" + t[1]
        }
        var _ = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return t.add = function(t, e, r) {
                    d[t] = d[t] || {}, d[t][h(e)] = r
                }, t.get = function(t, e, r) {
                    return void 0 !== r && (e = (e = e.split(","))[r]), d[t] = d[t] || {}, d[t][h(e)]
                }, t
            }(),
            p = function() {
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

        function u(t, e) {
            return t ? '<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="' + e + '">\n      <div class="article_ed__caredit_photo" style="background-image: url(' + t + ')"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>' : '<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">' + getLang("pages_article_ed_carousel_add") + "</div>\n    </button>"
        }
        var f = function() {
                function t(e, r, i, a) {
                    var o = this;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                    n += '\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ' + getLang("pages_article_ed_carousel_title") + '\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">' + getLang("global_save") + '</button>\n            <button class="flat_button article_ed__caredit_cancel">' + getLang("global_cancel") + "</button>\n          </div>\n         </div>\n      </div>\n    ", n += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', r.getMediaId().split(",").forEach(function(t) {
                        var e = _.get(l.b.ObjectPhoto, t),
                            r = Object(l.d)(e.sizes, 251),
                            i = p(r, 1)[0];
                        n += u(i, t)
                    }), n += u(), n += "  </div>", n += "</div>", n += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(n), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", function() {
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
                        _.add(l.b.ObjectPhoto, e, {
                            size: Object(i.t)(r.editable.sizes),
                            sizes: r.editable.sizes
                        });
                        var o = Object(l.d)(r.editable.sizes, 251),
                            n = p(o, 1)[0];
                        domInsertBefore(se(u(n, e)), this._els.addButton)
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
            g = function() {
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
        var v = void 0,
            b = function(t) {
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
                        return i.closeAllCarouselEditors(), i._resizeTooltip && i._resizeTooltip.hide(), addClass(t._objectEl, "article_ed__carousel_edit_open"), t._carouselEditor = new f(e, t, function(r) {
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
                    var t = _.get(l.b.ObjectPhoto, this.getMediaId(), 0);
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
                                        t._mediaId = e, _.add(l.b.ObjectPhoto, e, {
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
                        e = _.get(l.b.ObjectPhoto, this.getMediaId(), this.getImageIndex()),
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
                        var i = Object(l.d)(e.sizes, r),
                            a = g(i, 1)[0],
                            o = this._getImageEl(),
                            n = !1;
                        o.onload = function() {
                            clearTimeout(v), n = !0, setStyle(o, "visibility", "visible"), show(o), t.setLoadingState(!1), t._isCarousel() && t._fixSize()
                        }, o.src = a, clearTimeout(v), n || (v = setTimeout(function() {
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
                    var t = _.get(l.b.ObjectPhoto, this.getMediaId(), 0);
                    return !(!t && !t.size) && t.size[0] >= 720
                }, e
            }(c);
        var y = function(t) {
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
                var t = _.get(l.b.ObjectVideo, this.getMediaId());
                if (t && (t.editable || t.thumb)) {
                    var e = void 0;
                    if (t.thumb) e = t.thumb;
                    else e = Object(l.d)(t.editable.sizes, this.getEditor().getWidth(!0))[0];
                    this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: t.duration || 0,
                        platform: t.platform || ""
                    }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>")), this._el.appendChild(se('<img class="article_ed__video_img" src=' + e + ' contenteditable="false" />'))
                }
                return this._el
            }, e.prototype.onViewport = function(t) {}, e.prototype.onRender = function() {}, e
        }(c);
        var m = function(t) {
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
                var e = _.get(l.b.ObjectGIF, this.getMediaId());
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
                var t = _.get(l.b.ObjectGIF, this.getMediaId());
                return !(!t && !t.size) && t.size[0] > this.getEditor().getOptions().minGifWidthExpand
            }, e
        }(c);
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
                    var t = _.get(l.b.ObjectAudio, this.getMediaId()).audio,
                        e = AudioUtils.drawAudio(t);
                    return this._el = se('\n      <div class="article_object_audio">' + e + "</div>\n    "), this._el
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
                    var t = this;
                    this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                    var e = _.get(l.b.ObjectAudioPlaylist, this.getMediaId());
                    if (e.snippet) this._el.innerHTML = e.snippet;
                    else {
                        var r = this.getMediaId().split("_"),
                            i = E(r, 2),
                            a = i[0],
                            o = i[1];
                        this.setLoadingState(!0), ajax.post("al_articles.php", {
                            act: "get_audioplaylist_snippet",
                            pl_owner_id: a,
                            pl_id: o,
                            pl_access_hash: e.accessHash
                        }, {
                            onDone: function(e) {
                                t.setLoadingState(!1), t._el.innerHTML = e
                            }
                        })
                    }
                    return this._el.appendChild(se('<div class="article_ed__audioplaylist_play_note" contenteditable="false">' + getLang("pages_articles_editor_audio_play_note") + "</div>")), this._el
                }, e
            }(c),
            j = [{
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

        function P(t) {
            return JSON.parse(JSON.stringify(t))
        }

        function w(t, e, r) {
            var a = [];
            return t.forEach(function(t, o) {
                r && !Object(i.D)(t) && Object(i.H)(t) && 0 != o && t.type != l.b.Code || a.push(function(t, e) {
                    var r = {};
                    for (var a in t) {
                        if (!t.hasOwnProperty(a)) return;
                        if (!a.startsWith("_") || "_uuid" === a && e) {
                            var o = t[a];
                            r[a] = isObject(o) || isArray(o) ? P(o) : o
                        }
                    }
                    return Object(i.D)(t) && t._object && (r.mediaId = t._object.getMediaId()), t.sep && (r.sep = 1), r.type == l.b.Text && delete r.type, r.lines.forEach(function(t) {
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
            }), P(a)
        }

        function x(t) {
            return t.forEach(function(t) {
                t.type = t.type || l.b.Text, t.lines.forEach(function(t) {
                    t.brs = t.brs || [], t.decorations = t.decorations || {}
                })
            }), t
        }
        var T = void 0;

        function I(t) {
            var e = [];
            t.length > T.maxParagraphs && e.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", t.length).replace("{limit}", T.maxParagraphs));
            var r = 0,
                a = 0;
            return t.forEach(function(t) {
                var o = 0;
                t.lines.forEach(function(t) {
                    t && (r += t.text.length, o += t.text.length)
                }), Object(i.D)(t) && a++, o > T.maxSymbolsPerParagraph && e.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", o).replace("{limit}", T.maxSymbolsPerParagraph))
            }), r > T.maxSymbols && e.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", T.maxSymbols)), a > T.maxObjects && e.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", T.maxObjects)), e.length && e.push(getLang("pages_article_ed_limit")), e.join("<br>")
        }
        var k = function() {
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
                    var h = [],
                        _ = [],
                        p = 0;
                    if (i.forEach(function(t) {
                            var e = 0;
                            t.lines.forEach(function(t) {
                                e += t.text.length, t.decorations && t.decorations.link && t.decorations.link.forEach(function(t) {
                                    e += (t[2] || "").length
                                })
                            }), (p += e) >= c && (h.push(_), p = e, _ = []), _.push(t)
                        }), _.length && h.push(_), h.length > 1) {
                        var u = new CallHub(function() {
                            t._saveFinally(e, r, a, o, n, l, s, h.length, !1, d)
                        }, h.length);
                        h.forEach(function(r, i) {
                            t._saveChunk(e, r, i, s, function(t) {
                                t ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : u.done()
                            })
                        })
                    } else t._saveFinally(e, r, a, o, n, l, s, 0, i, d)
                }, t
            }(),
            S = r("zxIV"),
            L = function() {
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
        var D = window,
            M = D.cur,
            A = D.browser,
            N = D.each,
            B = D.addClass,
            H = D.geByTag1,
            U = D.geByClass1,
            z = D.extractUrls,
            F = D.removeClass,
            R = D.domClosestByTag,
            W = D.hasClass,
            G = D.domData,
            Q = D.getSize,
            J = D.getXY,
            Y = D.re,
            V = D.se,
            $ = D.domInsertBefore,
            X = D.traverseParent,
            q = D.extend,
            K = D.toggleClass,
            Z = D.trim,
            tt = D.domInsertAfter,
            et = D.gpeByClass,
            rt = D.clean,
            it = D.domReplaceEl,
            at = D.isObject,
            ot = D.ge,
            nt = D.domChildIndex,
            st = D.domNS,
            ct = (D.lineHtml, 65),
            lt = 66,
            dt = 67,
            ht = 73,
            _t = 83,
            pt = 89,
            ut = 90,
            ft = 8,
            gt = 13,
            vt = 38,
            bt = 40,
            yt = 46,
            mt = 9,
            Ct = [{
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
            Et = Ct.slice().reverse(),
            Ot = {};
        N(Ct, function(t, e) {
            Ot[e.tag] = e
        });
        var jt = {};
        N(Ct, function(t, e) {
            jt[e.type] = e
        });
        var Pt = 1;

        function wt() {
            return Pt++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        var xt = function() {
            function t(e, r, a) {
                var o, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._id = wt(), M.lang = M.lang || {}, q(M.lang, n.lang), this._options = n, this._els = {
                    editor: ot(e),
                    canvas: V('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = V('<div class="article_photo_upload"></div>')), B(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [], o = n.limits, T = o;
                var s = a || [];
                if (n.postData) {
                    var c = n.postData.text || "";
                    c = (c = c.replace(/❤/g, "❤️")).split("\n");
                    var d = [];
                    d.push(Object(i.e)({
                        type: l.b.Header1,
                        lines: [{
                            text: ""
                        }]
                    })), c.forEach(function(t) {
                        Z(t) && d.push(Object(i.e)({
                            lines: [{
                                text: rt(t)
                            }]
                        }))
                    }), s = d.concat(s)
                }
                s && 0 != s.length || (s = [Object(i.e)({
                    type: this._options.noTitle ? l.b.Text : l.b.Header1
                })]), (s = s.filter(function(t) {
                    return !1 !== t
                })).forEach(function(t) {
                    t.lines.forEach(function(t) {
                        t.text = Object(i.R)(t.text), t.brs && at(t.brs) && (t.brs = Object(i.j)(t.brs))
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
                    if (!t && e.type == l.b.ObjectPhoto) {
                        var r = e._object.getMediaId(0);
                        t = {
                            id: r,
                            data: _.get(l.b.ObjectPhoto, r)
                        }
                    }
                }), t
            }, t.prototype.getPublishName = function() {
                return this._publishName || this._publishNameCandidate || this._getName()
            }, t.prototype.setPublishName = function(t) {
                this._publishName = t, this._options.isPublished || this.saveDraft(!0)
            }, t.prototype._updateTextPlaceholders = function() {
                if (!this._options.noTitle) {
                    this._els.placeholders || (this._els.placeholders = V('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = V("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = V("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(i.H)(this._ps[0]) ? F(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : B(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var t = this._ps[1],
                        e = !!t && t.sep,
                        r = this._getCurrentParagraphIndex(),
                        a = L(r, 1)[0];
                    Object(i.H)(t) && (!t || t.type != l.b.Code) && a < 2 && this._ps.length <= 2 && !e ? F(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : B(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }, t.prototype.destroy = function() {
                this._els.editor.innerHTML = "", F(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(function(t) {
                    t.el.removeEventListener(t.event, t.handler)
                }), delete M.docsCurFilter
            }, t.prototype.getLimits = function() {
                return this._options.limits
            }, t.prototype.getOptions = function() {
                return this._options
            }, t.prototype.getWidth = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return Q(this._els.canvas)[0] + (t ? 2 * this._options.figureSideMargin : 0)
            }, t.prototype.getPhotoUploadOptions = function() {
                return this._options.photoUploadOptions
            }, t.prototype.getPhotoUploadEl = function() {
                return this._photoUploadEl
            }, t.prototype.removeObject = function(t) {
                var e = this;
                N(this._ps, function(r, a) {
                    if (a._object == t) {
                        var o = e._getParagraphElByIndex(r + 1);
                        return Object(i.o)(o), Y(e._getParagraphElByIndex(r)), e._setAllParagraphsDirty(), e._triggerInputEvent(), !1
                    }
                })
            }, t.prototype._processPastedUrl = function(t, e) {
                var r = this,
                    a = this._getParagraph(t);
                a && a.type == l.b.Text && (Y(this._els.shareParseForm), Y(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(V('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
                    action: "share.php?act=url_attachment",
                    method: "post",
                    target: "editor__share_parse_iframe"
                })), this._els.shareParseForm.appendChild(ce("input", {
                    type: "hidden",
                    name: "hash",
                    value: this._options.shareHash
                })), this._els.shareParseForm.appendChild(ce("input", {
                    type: "hidden",
                    name: "url",
                    value: e
                })), this._els.shareParseForm.appendChild(ce("input", {
                    type: "hidden",
                    name: "index",
                    value: 1
                })), this._els.shareParseForm.appendChild(ce("input", {
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
                                    n = l.b.ObjectAudioPlaylist, s = {
                                        accessHash: a.accessHash
                                    }, e[1] = a.ownerId + "_" + a.id + (a.accessHash ? "_" + a.accessHash : "");
                                    break;
                                case "doc":
                                    "gif" == a.ext && (n = l.b.ObjectGIF, s = {
                                        size: a.video_preview_size,
                                        video: a.video_preview,
                                        href: a.href
                                    });
                                    break;
                                case "photo":
                                    n = l.b.ObjectPhoto, s = {
                                        size: Object(i.t)(a.editable.sizes),
                                        sizes: a.editable.sizes
                                    };
                                    break;
                                case "video":
                                    n = l.b.ObjectVideo, s = {
                                        editable: a.editable,
                                        duration: a.editable.duration,
                                        platform: a.editable.platform
                                    }
                            }
                            if (n) {
                                var c = Object(i.w)(r._ps[t]),
                                    d = {
                                        mediaId: e[1],
                                        type: n,
                                        sep: c,
                                        fromExtPage: intval(a.from_ext_page)
                                    };
                                _.add(n, d.mediaId, s), r._linkTooltip && r._linkTooltip.hide(), d = Object(i.e)(d), (o = r._getParagraph(t + 1)) && o._object && o._object._mediaId === d.mediaId || (r._getOrCreateParagraphObject(d), r._insertParagraphAt(t + 1, d), r._els.canvas.normalize(), r._redraw(!0, !0), r._saveUndoState(), setTimeout(function() {
                                    r.onObjectStateLoaded()
                                }, 10))
                            }
                        }
                    }
                }, this._els.shareParseForm.submit())
            }, t.prototype._handleObjectPaste = function(t) {
                var e = (t.clipboardData || t.originalEvent.clipboardData).getData("text/plain");
                if (e) {
                    var r = e.split(":"),
                        i = L(r, 2),
                        a = i[0],
                        o = i[1];
                    if ("uuid" == a && o) {
                        var n = domQuery1('[data-uuid="' + o + '"]');
                        if (n) {
                            var s = n.cloneNode(!0);
                            s.setAttribute("data-force-update", "1");
                            var c = this._getCurrentParagraphIndex(),
                                l = L(c, 1)[0];
                            tt(s, this._getParagraphElByIndex(l)), t.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
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
                                r = L(t, 1)[0];
                            o.getAsString(function(t) {
                                var a = z(t, !0);
                                if (1 === a.length) {
                                    var o = a[0].url,
                                        n = e._getParagraphElByIndex(r);
                                    e._processPastedUrl(r, o), Object(i.T)(n, function(t) {
                                        if (t.nodeType == Node.TEXT_NODE && t.textContent.indexOf(o) >= 0 && !X(t, function(t) {
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
                                    o = L(a, 1)[0];
                                o = o || 0;
                                var n = Object(i.e)({
                                    type: l.b.ObjectPhoto
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
                    e = L(t, 2),
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
                    }, n = {}, s = 0, c = void 0, d = void 0, h = r; h <= a && h < this._ps.length; h++) {
                    var _ = Object(i.D)(this._ps[h]) ? this._ps[h]._object.getCaptionEl() : this._getParagraphElByIndex(h);
                    if (void 0 === c) {
                        var p = getCaretCharacterOffsetWithin(_),
                            u = L(p, 2);
                        c = u[0], d = u[1]
                    }
                    this._ps[h].lines.forEach(function(t) {
                        var e = t.decorations;
                        Ct.forEach(function(r) {
                            var i = e[r.type];
                            i && !isEmpty(i) && i.forEach(function(e) {
                                var i = [e[0] + s, e[1] + s];
                                if ("link" == r.type) c < i[1] && d > i[0] && (n[r.type] = 1, o.decorations[r.type] = !0);
                                else if (1 == n[r.type]) {
                                    d > i[1] || (d >= i[0] && d <= i[1] ? e[0] > 0 ? n[r.type] = -1 : (n[r.type] = 2, o.decorations[r.type] = !0) : n[r.type] = -1)
                                } else if (!n[r.type]) {
                                    var a = c >= i[0] && c <= i[1];
                                    a && (d >= i[0] && d <= i[1]) ? (n[r.type] = 2, o.decorations[r.type] = !0) : a && (t.text.length > i[1] ? n[r.type] = -1 : n[r.type] = 1)
                                }
                            })
                        }), s += t.text.length
                    })
                }
                for (var f = r; f <= a && f < this._ps.length; f++) Object(i.D)(this._ps[f]) && (o.captionFocused = o.captionFocused || this._ps[f]._object.isCaptionFocused(), o.object = !0), this._ps[f].type == l.b.Header1 && (o.header1 = !0), this._ps[f].type != l.b.Header2 && (o.header2 = !1), this._ps[f].type != l.b.Header3 && (o.header3 = !1), inArray(this._ps[f].type, [l.b.Header1, l.b.Header2, l.b.Header3]) ? o.header = !0 : o.justHeaders = !1, inArray(this._ps[f].type, [l.b.Quote, l.b.Quote2]) || (o.quote = !1), inArray(this._ps[f].type, [l.b.BulletList, l.b.NumericList]) && (o.list = !0);
                var g = Object(i.u)(),
                    v = L(g, 1)[0];
                return !(v && v.startContainer && W(v.startContainer, "article_ed__noconteditable")) && (o.multiline = r != a, o)
            }, t.prototype._hideFormatTooltip = function() {
                this._formatTooltip && this._formatTooltip.isShown() && this._formatTooltip.hide()
            }, t.prototype._showFormatTooltip = function() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var t = window.getSelection();
                        if (t.focusNode && (W(t.focusNode, "article_set_link") || "input" == t.focusNode.nodeName.toLowerCase())) return;
                        var e = !t.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, e), 1)
                    } catch (t) {}
                }
            }, t.prototype._doShowFormatTooltip = function(t) {
                var e = this;
                if (!this._formatTooltip) {
                    var r = V('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
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
                                var a = U("article_format_btns", r);
                                a.innerHTML = "", i.forEach(function(t, e) {
                                    e > 0 && inArray(t[0], ["header1"]) && a.appendChild(V('<div class="article_format_divider"></div>'));
                                    var r = t[2] ? "article_format_btn_active" : "";
                                    a.appendChild(V('<button class="article_format_btn ' + r + '" id="article_format_btn_' + t[0] + '" onclick="' + t[1] + '"></button>'))
                                }), e.setLinkMode(!1)
                            } else e._formatTooltip.hide()
                        },
                        getTargetBoundingBox: function() {
                            if (e._formatTooltip.linkMode) return a;
                            var t = Object(i.u)(),
                                r = L(t, 3),
                                o = r[0],
                                n = r[2];
                            if (!n || !n.rangeCount) return a;
                            var s = o.getBoundingClientRect();
                            if (!s.left) {
                                var c = o.startContainer.nodeType == Node.ELEMENT_NODE ? o.startContainer : domPN(o.startContainer),
                                    l = J(c),
                                    d = Q(c);
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
                    var o = H("input", r);
                    o.addEventListener("keypress", function(t) {
                        if (t.keyCode == gt) return e._setLinkToSelectedText(o.value.trim()), e._formatTooltip.hide(), cancelEvent(t)
                    }), U("article_set_link_delete", r).addEventListener("click", function(t) {
                        return e._setLinkToSelectedText(), cancelEvent(t)
                    })
                }
                t ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }, t.prototype._setLinkToSelectedText = function(t) {
                if (t) {
                    if (!(t = (t = t.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://")) t = (Object(i.K)(t) ? "https" : "http") + "://" + t;
                    t = encodeURIComponent(t)
                }
                this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), t && document.execCommand("createLink", !1, t), !A.msie && t || this._triggerInputEvent(), t ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor)
            }, t.prototype.clearLink = function() {
                this.setLinkMode(!1);
                var t = Object(i.u)(),
                    e = L(t, 3),
                    r = e[0],
                    a = e[2],
                    o = R("a", r.startContainer),
                    n = R("a", r.endContainer) || o;
                o && (this._saveCursorMarker(), a.setBaseAndExtent(o, 0, n, Math.max(1, n.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }, t.prototype.setLinkMode = function(t, e) {
                var r = void 0;
                t && (r = this._getCursor(), A.msie || document.execCommand("superscript", !1, !0));
                var i = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!t)
                    if (t) {
                        var a = H("input", i);
                        a.value = "", B(i, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), a.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(i, {
                        width: null
                    }), F(i, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, e && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }, t.prototype.setHeader1 = function(t) {
                this._setHeader(l.b.Header2, !t)
            }, t.prototype.setHeader2 = function(t) {
                this._setHeader(l.b.Header3, !t)
            }, t.prototype.setQuote = function() {
                var t = this._getCursor(),
                    e = this._getCurrentParagraphIndex(),
                    r = L(e, 2),
                    a = r[0],
                    o = r[1];
                if (!1 !== a) {
                    o || (o = a);
                    for (var n = l.b.Text, s = a; s <= o; s++)
                        if (h(this._ps[s])) {
                            n = this._ps[s].type == l.b.Quote ? l.b.Quote2 : this._ps[s].type == l.b.Quote2 ? l.b.Text : l.b.Quote;
                            break
                        }
                    for (var c = a; c <= o; c++) {
                        var d = this._ps[c];
                        h(d) && (this._ps[c] = Object(i.e)({
                            type: n,
                            lines: [d.lines[0]],
                            sep: Object(i.w)(this._ps[c])
                        }), this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                }

                function h(t) {
                    return !Object(i.D)(t) && !Object(i.C)(t)
                }
            }, t.prototype._setHeader = function(t, e) {
                var r = this._getCursor(),
                    a = this._getCurrentParagraphIndex(),
                    o = L(a, 2),
                    n = o[0],
                    s = o[1];
                if (!1 !== n) {
                    s || (s = n);
                    for (var c = n; c <= s; c++) {
                        d(this._ps[c]) && (this._ps[c].type = e ? t : l.b.Text, this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(r), this._saveUndoState(), this.saveDraft()
                }

                function d(t) {
                    return !Object(i.D)(t) && !Object(i.C)(t)
                }
            }, t.prototype.setStrong = function() {
                this._setAllParagraphsDirty(), document.execCommand("bold"), A.msie && this._triggerInputEvent()
            }, t.prototype.setEm = function() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), A.msie && this._triggerInputEvent()
            }, t.prototype.setStrike = function() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), A.msie && this._triggerInputEvent()
            }, t.prototype.saveUndoStateAndDraft = function() {
                this._saveUndoState(), this.saveDraft()
            }, t.prototype._saveUndoStateDelayed = function() {
                var t = this;
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = setTimeout(function() {
                    t._saveUndoState()
                }, 1e3)
            }, t.prototype._saveUndoState = function() {
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = !1;
                var t = w(this._ps, !0);
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
                    this._ps = x(t.ps), this._undoCurrentState = w(this._ps), this._undoCurrentStateCursor = t.cursor, this._redraw(!0), t.cursor && this._restoreCursor(t.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
                }
                this._options.onUndoRedo && this._options.onUndoRedo()
            }, t.prototype.redo = function() {
                if (0 != this._redos.length) {
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    });
                    var t = this._redos.pop();
                    this._ps = x(t.ps), this._undoCurrentState = w(this._ps), this._undoCurrentStateCursor = t.cursor, this._redraw(!0), t.cursor && this._restoreCursor(t.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
                }
            }, t.prototype.canUndo = function() {
                return this._undoable || this._undos.length > 0
            }, t.prototype.canRedo = function() {
                return this._redos.length > 0
            }, t.prototype.initParagraphs = function(t) {
                t.forEach(function(t) {
                    t._preparedData && (t.mediaId.split(",").forEach(function(e, r) {
                        _.add(t.type, e, t._preparedData[r])
                    }), delete t._preparedData)
                }), this._ps = x(t), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }, t.prototype._getParagraphFromHTML = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

                function a(e, r) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var o = e.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        r.text += "pre" == t ? o : Object(i.i)(o)
                    } else Object(i.y)(e) && r.text.length > 0 && r.brs.push(r.text.length);
                    N(e.childNodes, function(t, e) {
                        var o = [r.text.length];
                        a(e, r), o.push(r.text.length);
                        var n = (e.tagName || "").toLowerCase();
                        e.style && ("bold" == e.style.fontWeight || parseInt(e.style.fontWeight) > 400) && (n = "strong");
                        var s = void 0;
                        switch (n) {
                            case "b":
                            case "strong":
                                s = jt.strong;
                                break;
                            case "em":
                            case "i":
                                s = jt.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                s = jt.strike;
                                break;
                            case "a":
                                s = jt.link;
                                var c = e.getAttribute("href") || "",
                                    l = "";
                                l = c.match(/app-?\d+_-?\d+/) ? Object(i.m)(c).replace("%23", "#") : Object(i.m)(c).replace("#", "%23"), o.push(l);
                                break;
                            case "code":
                                s = jt.code;
                                break;
                            case "font":
                                var d = e.getAttribute("face");
                                "monospace" === d ? s = jt.code : "times" === d && (s = jt.code)
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
                            s = l.b.NumericList;
                            break;
                        case "ul":
                            s = l.b.BulletList
                    }
                    for (var d = 0, h = o.children.length; d < h; d++) {
                        var _ = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        a(o.children[d], _), _.brs = Object(i.g)(_.brs), n.push(_)
                    }
                } else {
                    switch (t) {
                        case "h1":
                            s = l.b.Header1;
                            break;
                        case "h2":
                        case "header":
                            s = l.b.Header2;
                            break;
                        case "h3":
                        case "h4":
                            s = l.b.Header3;
                            break;
                        case "blockquote":
                            s = l.b.Quote;
                            break;
                        case "cite":
                            s = l.b.Quote2;
                            break;
                        case "pre":
                            s = l.b.Code;
                            break;
                        default:
                            s = l.b.Text
                    }
                    var p = o.firstElementChild;
                    if (Object(i.E)(p)) {
                        var u = G(p, "type"),
                            f = G(p, "media-id");
                        u && f && (o = H("figure", p), s = u, c.mediaId = f)
                    }
                    var g = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    a(o, g), g.brs = Object(i.g)(g.brs, g.text.length), n.push(g), s == l.b.Code && delete g.decorations.code, r || s != l.b.Text || "```" != g.text || 0 != g.brs.length || (g.text = "", s = l.b.Code), Object(i.A)(s) || (0 == g.text.indexOf("1. ") ? (s = l.b.NumericList, this._removeParagraphLineTextPart(g, 0, "1. ".length)) : 0 == g.text.indexOf("* ") && (s = l.b.BulletList, this._removeParagraphLineTextPart(g, 0, "* ".length))), g.brs = g.brs.filter(function(t) {
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
                }), N(t.decorations, function(a, o) {
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
                return isString(e) && (e = [e]), t.type == l.b.ObjectPhoto ? (o = r.getImageIndex(), r.setCaptionElHtml(e[o] || "")) : r.setCaptionElHtml(e[0] || ""), G(a, "paragraph-lines", JSON.stringify(t.lines)), G(a, "uuid", t._uuid), G(a, "type", t.type), G(a, "media-id", t._object.getMediaId()), G(a, "mode", parseInt(t.mode) || 0), B(a, i.a), a
            }, t.prototype._renderParagraphLines = function(t, e) {
                if (!t.lines) return ["", ""];
                var r = "",
                    a = "",
                    o = "",
                    n = parseInt(t.type);
                switch (n) {
                    case l.b.NumericList:
                        r = "ol", a = "li";
                        break;
                    case l.b.BulletList:
                        r = "ul", a = "li";
                        break;
                    case l.b.Header1:
                        a = "h1";
                        break;
                    case l.b.Header2:
                        a = "h2";
                        break;
                    case l.b.Header3:
                        a = "h3";
                        break;
                    case l.b.Quote:
                        a = "blockquote";
                        break;
                    case l.b.Quote2:
                        a = "cite";
                        break;
                    case l.b.Code:
                        a = "pre";
                        break;
                    default:
                        r = "p"
                }
                var s = [];
                return t.lines.forEach(function(r) {
                    if (r) {
                        var c = r.text,
                            d = r.decorations,
                            h = [];
                        N(Ct, function(t, e) {
                            if (!Object(i.A)(n) && n != l.b.Code || "code" != e.type) {
                                var r = d[e.type];
                                if (r)
                                    for (var a = function(t, i) {
                                            var a = r[i];
                                            (h[a[0]] = h[a[0]] || {
                                                open: {},
                                                close: {}
                                            }).open[e.type] = f(a);
                                            var o = h[a[1]] = h[a[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                n = function(t, e) {
                                                    for (var r = []; t > 0;) {
                                                        var i = h[--t];
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
                        var _ = 0,
                            p = [];
                        h.forEach(function(e, a) {
                            if (e) {
                                var o = !1,
                                    n = e.close.link && 1 == Object.keys(e.close).length;
                                a > 0 && (o = Object(i.P)(c, _, a, r.brs, t.type == l.b.Code), n || p.push(o));
                                var s = 0;
                                n && (o && o.endsWith("<br/>") && (s++, o = o.replace(/<br\/>$/, "")), o && o.endsWith("<br/>") && (s++, o = o.replace(/<br\/>$/, "")), !1 !== o && p.push(o)), N(Et, function(t, r) {
                                    void 0 !== e.close[r.type] && p.push("</" + r.tag + ">")
                                }), p.push("<br/>".repeat(s)), N(Ct, function(t, r) {
                                    var i = e.open[r.type];
                                    void 0 !== e.open[r.type] && (!0 === i ? p.push("<" + r.tag + ">") : p.push("<" + r.tag + ' href="' + rt(i) + '">'))
                                }), _ = a
                            }
                        }), p.push(Object(i.P)(c, _, void 0, r.brs, t.type == l.b.Code));
                        var u = "";
                        a && (u += "<" + a + (o = o ? " " + o : "") + ">"), inArray(n, [l.b.Quote, l.b.Quote2]) && (u += "<p>"), u += p.join("") || (e ? "" : "<br/>"), inArray(n, [l.b.Quote, l.b.Quote2]) && (u += "</p>"), a && (u += "</" + a + ">"), s.push(u)
                    }

                    function f(t) {
                        return t[2] || !0
                    }
                }), [r, s]
            }, t.prototype._renderParagraph = function(t) {
                var e = Object(i.D)(t),
                    r = this._renderParagraphLines(t, e),
                    a = L(r, 2),
                    o = a[0],
                    n = a[1],
                    s = void 0;
                if (e) s = this._renderObjectParagraph(t, n);
                else {
                    var c = n.join("");
                    s = V(o ? "<" + o + ">" + c + "</" + o + ">" : c)
                }
                return Object(i.w)(t) ? G(s, "sep", Object(i.p)()) : G(s, "sep", null), B(s, i.a), B(s, "article_paragraph"), s
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
                    r && i.type == r.type || (o = !0), a && i.type == a.type || (n = !0), (l.c.includes(+a.type) || a.sep) && (s = !0);
                    var c = this._getParagraphElByIndex(t);
                    K(c, "article_decoration_first", o), K(c, "article_decoration_last", n), K(c, "article_decoration_before", s)
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
                        e ? i.outerHTML != e.outerHTML && it(e, i) : r._els.canvas.appendChild(i)
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
                        a = L(r, 2)[1],
                        o = e.endContainer;
                    if (0 === e.endOffset && (this._isParagraphEl(o) || this._isParagraphEl(domPN(o)) && 0 == Object(i.f)(o))) {
                        var n = this._getContainingParagraphEl(o),
                            s = L(n, 1)[0];
                        o = Object(S.A)(s) || s
                    }
                    var c = this._getContainingParagraphEl(o),
                        l = L(c, 2)[1];
                    return [a, Math.max(a, l)]
                }
                return [0, !1]
            }, t.prototype._saveCursorMarker = function() {
                if (!this._markerCursorSet) {
                    var t = Object(i.u)(),
                        e = L(t, 2),
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
                                    N(Ct, function(e, i) {
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
                    e = L(t, 2),
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
                        for (var s = n.brs, c = [], l = 0, d = 0, h = s.length; d < h; d++)
                            if (l != s[d] && d > 0 && s[d - 1] == s[d]) {
                                var _ = t(o, l, s[d]);
                                Object(i.H)(_) || c.push(_), l = s[d]
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
                                    var e = X(o, function(e) {
                                            return e == t._els.canvas || "FIGURE" == e.tagName
                                        }, 10),
                                        a = !(!e || e == t._els.canvas) && H("figcaption", e),
                                        n = Object(i.e)({
                                            type: l.b.ObjectPhoto
                                        }),
                                        s = t._renderObjectParagraph(n, a ? a.innerHTML : "");
                                    Object(i.M)(r.textContent) ? (it(r, s), Y(o), tt(V("<p>" + i.c + "</p>"), s)) : (tt(s, domPN(o)), Y(a), Y(o)), X(s, function(e) {
                                        if (e == t._els.canvas) return !0;
                                        F(e, i.a)
                                    }), Object(i.Q)(o.src, function(e, r, i) {
                                        e ? (Y(s), t._forgetObject(n._uuid), t._setAllParagraphsDirty(), t._triggerInputEvent(), i()) : t._getOrCreateParagraphObject(n).setBLOB(r, i)
                                    })
                                }; o = a.shift();) n()
            }, t.prototype._flattenAlienParagraphs = function() {
                var t = this;
                if (this._fromPasteEvent) {
                    for (var e = Array.prototype.slice.call(this._els.canvas.children), r = void 0, a = this._fromPasteEvent, o = this._pasteCurrentIndex, n = this._getCurrentParagraphIndex(), s = L(n, 1)[0], c = -1, l = function() {
                            if (c++, a && !Z(r.textContent) && c > o && c <= s) return Y(r), "continue";
                            var e = r;
                            Object(i.J)(r) && !Object(i.x)(r) && (e = r.firstChild);
                            var n = !1;
                            (function t(a) {
                                if (a && a.nodeType != Node.TEXT_NODE && !Object(i.y)(a))
                                    if (Object(i.v)(a))
                                        if (this._isTrackedObjectEl(a)) a != e && ($(a, r), n = !0);
                                        else
                                            for (var o = Array.prototype.slice.call(a.childNodes), s = void 0; s = o.shift();) t.call(this, s);
                                else a != e && (Z(a.innerHTML) && $(a, r), n = !0)
                            }).call(t, e, !0), n && Y(r)
                        }; r = e.shift();) l();
                    this._setAllParagraphsDirty()
                }
            }, t.prototype._correctCaptionSelection = function() {
                var t = Object(i.u)(),
                    e = L(t, 3),
                    r = e[0],
                    a = e[1],
                    o = e[2];
                if (r && !a) {
                    var n = X(r.startContainer, function(t) {
                        return "FIGCAPTION" == t.tagName
                    }, 5);
                    if (n && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && Object(i.G)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                        var s = U("article_ed__figcaption_edit", n),
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
                        paragraphs: w(this._ps)
                    });
                    e ? this._lastSavedDraft = a : this._lastSavedDraft != a || t ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(function() {
                        if (i._lastSavedDraft = a, 0 != i._ps.length) {
                            var t = I(i._ps);
                            t ? i._options.onDraftNotSaved && i._options.onDraftNotSaved(t) : i.save(!1, function(t, e, r) {
                                i._initDraftSave = !0, i._options.onDraftSaved && i._options.onDraftSaved(t, e, r)
                            })
                        }
                    }, r ? 0 : 1e3 * this._options.draftSaveDelay)) : !e && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
                }
            }, t.prototype._getName = function() {
                if (this._publishName) return this._publishName;
                var t = w(this._ps),
                    e = t.length ? t[0].lines[0].text : "";
                return Object(i.q)(e, this._options.maxNameLength)
            }, t.prototype.getTitle = function() {
                var t = this._ps[0];
                return t ? t.lines[0].text : ""
            }, t.prototype.isLimitsExceeded = function() {
                return !!I(this._ps)
            }, t.prototype.save = function(t, e, r) {
                var a = this,
                    o = w(this._ps, !1, !0);
                t && Object(i.k)(o, -1);
                var n = this._getName(),
                    s = this.getCoverPhoto();
                void 0 === s && t && (s = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && ((r = r || {}).from_post_convert = 1), k.save(this.getArticleOwnerId(), this.getArticleId(), o, t, n, s ? s.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s, c, l) {
                    if (isString(r) && r.startsWith("locked ")) return a.getOptions().editLockMessage = r.slice("locked ".length), a.showEditLockInfo(), void(e && e(!0));
                    r || (i && (a._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(q({}, nav.objLoc, {
                        article_id: a.getArticleOwnerId() + "_" + a.getArticleId()
                    })), a._publishNameCandidate = n, t && (a._options.isPublished = !0), a._options.monetizationAllowed = l, a._replaceVideos(c)), e && e(r, i, o, s)
                })
            }, t.prototype._replaceVideos = function() {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    r = !1;
                try {
                    e.forEach(function(e) {
                        var i = L(e, 4),
                            a = i[0],
                            o = i[1],
                            n = i[2],
                            s = i[3];
                        t._ps.forEach(function(e, i) {
                            if (e.type == l.b.ObjectVideo) {
                                var c = e.mediaId.split("_"),
                                    d = L(c, 3),
                                    h = d[0],
                                    _ = d[1];
                                d[2] || h != a || _ != o || (e.mediaId = n + "_" + s, t._setParagraphDirty(i), r = !0)
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
                            it(r, n);
                            continue
                        }
                        if (o.shift(), o.length)
                            for (var s = void 0; s = o.shift();) {
                                if (this._saveCursorMarker(), t) tt(s, r);
                                else {
                                    var c = V("<" + a + "></" + a + ">");
                                    c.appendChild(s), tt(c, r)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }, t.prototype._ensureDummyParagraphs = function() {
                if (this._els.canvas) {
                    var t = this._els.canvas.lastChild;
                    if (t)
                        if (Z(t.innerHTML) && "<br>" != t.innerHTML && "&nbsp;" != t.innerHTML || "H1" == t.tagName) {
                            var e = Object(i.e)({});
                            this._els.canvas.appendChild(this._renderParagraph(e)), this._ps.push(e), this._updateTextPlaceholders()
                        }
                }
            }, t.prototype._ensureAtLeastOneParagraph = function() {
                0 == this._ps.length && (this._ps = [Object(i.e)({
                    type: l.b.Text
                })])
            }, t.prototype._ensureTitleParagraph = function() {
                var t = this;
                if (!this._options.noTitle) {
                    var e = this._ps[0];
                    Object(i.D)(e) && (this._ps[0] = Object(i.e)({
                        type: l.b.Header1
                    })), e.type = l.b.Header1, e.lines[0].decorations = {}, e.lines[0].brs = [], delete e.sep
                }
                this._ps.forEach(function(e, r) {
                    (t._options.noTitle || 0 != r) && (1 == r && e.type == l.b.Header1 && (e.type = l.b.Text), e.type == l.b.Header1 && (e.type = l.b.Header2))
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
                    r = L(e, 1)[0];
                this.getArticleOwnerId() < 0 && (M.audioAttachOriginalOwnerId = this.getArticleOwnerId(), M.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: function(e, a, o, n) {
                        Object(i.H)(t._ps[r]) || t._insertParagraphAt(r, Object(i.e)());
                        var s = Object(i.e)({
                            type: l.b.ObjectAudio,
                            mediaId: o.fullId
                        });
                        _.add(l.b.ObjectAudio, o.fullId, {
                            audio: n
                        }), t._getOrCreateParagraphObject(s), t._ps[r] = s, e.shiftKey || curBox().hide(), t._redrawModel();
                        var c = t._getParagraphElByIndex(r);
                        Object(i.o)(c), t.saveUndoStateAndDraft(), r++
                    },
                    onPlaylistChoose: function(e, a) {
                        var o = a.getOwnerId() + "_" + a.getPlaylistId() + (a.getAccessHash() ? "_" + a.getAccessHash() : ""),
                            n = Object(i.e)({
                                type: l.b.ObjectAudioPlaylist,
                                mediaId: o
                            });
                        _.add(l.b.ObjectAudioPlaylist, o, {
                            accessHash: a.getAccessHash()
                        }), t._getOrCreateParagraphObject(n), t._ps[r] = n, curBox().hide(), t._redrawModel();
                        var s = t._getParagraphElByIndex(r);
                        Object(i.o)(s), t.saveUndoStateAndDraft()
                    }
                })
            }, t.prototype.closeAllCarouselEditors = function() {
                this._ps.forEach(function(t) {
                    t.type == l.b.ObjectPhoto && t._object.cancelCarouselEditor && t._object.cancelCarouselEditor()
                })
            }, t.prototype.setMediaUploadMode = function(t) {
                this._isUploading = !!t, K(this._els.editor, "article_ed__uploading", this._isUploading)
            }, t.prototype.isMediaUploadMode = function() {
                return this._isUploading
            }, t.prototype.addObjectVideo = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = L(e, 1)[0],
                    a = this._getParagraph(r),
                    o = Object(i.w)(a);
                delete a.sep;
                showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId()
                });
                M.chooseMedia = function(e, a, n, s, c) {
                    var d = Object(l.d)(n.editable.sizes, t.getWidth()),
                        h = L(d, 1)[0],
                        p = Object(i.e)({
                            type: l.b.ObjectVideo,
                            mediaId: a,
                            sep: o
                        });
                    o = !1, _.add(l.b.ObjectVideo, a, {
                        editable: n.editable,
                        thumb: h,
                        duration: n.editable.duration,
                        platform: n.editable.platform
                    }), t._getOrCreateParagraphObject(p), 0 == s ? t._ps[r] = p : t._ps.splice(r + s, 0, p), t._redrawModel(), t._saveUndoState();
                    var u = t._getParagraphElByIndex(r);
                    Object(i.o)(u), !c && curBox() && curBox().hide(), t.saveDraft()
                }
            }, t.prototype.addObjectDoc = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = L(e, 1)[0],
                    a = this._getParagraph(r),
                    o = Object(i.w)(a);
                delete a.sep, M.docsCurFilter = "gif";
                var n = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                M.chooseMedia = function(e, a, s) {
                    n.hide();
                    var c = Object(i.e)({
                        type: l.b.ObjectGIF,
                        mediaId: a,
                        sep: o
                    });
                    o = !1, _.add(l.b.ObjectGIF, a, {
                        video: s.video_preview,
                        size: s.video_preview_size,
                        href: s.href
                    }), t._getOrCreateParagraphObject(c), t._insertParagraphAt(r, c), t._redrawModel(), t._saveUndoState(), t.saveDraft(), t._updateTextPlaceholders()
                }, M.showMediaProgress = function() {}
            }, t.prototype.addObjectPhoto = function() {
                var t = this,
                    e = this._getCurrentParagraphIndex(),
                    r = L(e, 1)[0],
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
                M.onMediaUploadStarted = function() {
                    var e = Object(i.e)({
                            type: l.b.ObjectPhoto
                        }),
                        a = t._renderObjectParagraph(e, ""),
                        o = t._getParagraphElByIndex(r);
                    $(a, o), Object(i.o)(o), n = a, t.setMediaUploadMode(!0)
                }, M.onMediaUploadFail = function() {
                    delete M.onMediaUploadStarted, n && Y(n), t.setMediaUploadMode(!1)
                };
                var s = void 0,
                    c = -1;
                M.chooseMedia = function(e, d, h, p) {
                    void 0 === p ? c++ : c = intval(p), delete M.onMediaUploadStarted, t.setMediaUploadMode(!1), n && Y(n);
                    var u = Object(i.e)({
                        type: l.b.ObjectPhoto,
                        mediaId: d,
                        sep: a.sep
                    });
                    return _.add(l.b.ObjectPhoto, d, {
                        size: Object(i.t)(h.editable.sizes),
                        sizes: h.editable.sizes
                    }), t._getOrCreateParagraphObject(u), c ? t._ps.splice(r + c, 0, u) : t._ps[r] = u, void 0 === p && o.hide(), clearTimeout(s), s = setTimeout(function() {
                        t._redrawModel(), t._focusParagraph(r + c), t._updateTextPlaceholders(), t.saveUndoStateAndDraft()
                    }, 10), !1
                }, M.showMediaProgress = function() {}
            }, t.prototype.addSeparator = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = L(t, 1)[0],
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
                        this._objectPickerEl = V('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var t = V('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>');
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
                        r = L(e, 2),
                        a = r[0],
                        o = r[1];
                    if (!this.isMediaUploadMode() && !1 !== a && a == o && Object(i.H)(this._ps[a], !0) && this._ps[a] && inArray(this._ps[a].type, [l.b.Text, l.b.Header2, l.b.Header3])) {
                        show(this._objectPickerEl);
                        var n = this._getParagraphElByIndex(a),
                            s = J(this._els.editor),
                            c = J(n)[1] - s[1],
                            d = !1;
                        this._uploadFloatList(), this._floatedObjects.forEach(function(t) {
                            t.startY <= c + 15 && t.endY + 30 >= c && (d = !0)
                        }), setStyle(this._objectPickerEl, {
                            left: d ? 355 : -40,
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
                            content: V('<a target="_blank" href="' + a + '" class="article_editor_link">' + o + "</a>")
                        })
                    }
                })
            }, t.prototype._isTrackedObjectEl = function(t) {
                var e = G(t, "uuid");
                return !!e && !!this._getObject(e)
            }, t.prototype._cloneObjectParagraphs = function() {
                for (var t = Array.prototype.slice.call(this._els.canvas.children), e = void 0, r = {}; e = t.shift();)
                    if (Object(i.E)(e)) {
                        var a = e.getAttribute("data-uuid"),
                            o = parseInt(e.getAttribute("data-type"));
                        if (r[a]) {
                            var n = this._getObject(a);
                            a = wt(), this._getOrCreateParagraphObject({
                                type: o,
                                _uuid: a,
                                mediaId: n.getMediaId()
                            }), G(e, "uuid", a)
                        }
                        r[a] = !0
                    }
            }, t.prototype._correctCursorToBeWithinCanvas = function() {
                var t = Object(i.u)(),
                    e = L(t, 2),
                    r = e[0];
                e[1] && r.startContainer == this._els.canvas && this._focusParagraph(0)
            }, t.prototype._triggerInputEvent = function() {
                this._els.canvas.dispatchEvent(new Event("input"))
            }, t.prototype.getCursor = function() {
                return this._getCursor()
            }, t.prototype._getCursor = function() {
                var t = this._els.canvas,
                    e = Object(i.u)(),
                    r = L(e, 2),
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
                    r.nodeType == Node.TEXT_NODE ? e.textOffset = a : e.nodeOffset = a, X(r, function(r) {
                        if (r == t) return !0;
                        Object(i.J)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), e.path.push(Object(i.f)(r))
                    }, 10), e.path = e.path.slice().reverse()
                }
                return s(n.start, a.startContainer, a.startOffset), o ? delete n.end : s(n.end, a.endContainer, a.endOffset), n
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
                        n = L(o, 2),
                        s = n[0],
                        c = n[1];
                    if (Object(i.y)(s) && 0 == c) {
                        var l = domPN(s);
                        Object(i.G)(l) && 1 == l.childNodes.length && (s = l)
                    }
                    if (a.setStart(s, c), t.end) {
                        var d = r(t.end),
                            h = L(d, 2),
                            _ = h[0],
                            p = h[1];
                        a.setEnd(_, p)
                    }
                    window.getSelection().setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset)
                } catch (t) {
                    debugLog(t)
                }
            }, t.prototype._saveLastCursor = function() {
                var t = this._getCursor(),
                    e = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                t ? ls.set(e, JSON.stringify(t)) : ls.remove(e)
            }, t.prototype._restoreLastCursor = function() {
                var t = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                t ? (t = JSON.parse(t), this._restoreCursor(t)) : Object(i.o)(this._els.canvas.firstChild)
            }, t.prototype._toggleCodeBlocks = function() {
                for (var t = void 0, e = this._getCurrentParagraphIndex(), r = L(e, 2), i = r[0], a = r[1], o = i; o <= a; o++) void 0 === t && (t = this._ps[o].type != l.b.Code), this._ps[o].type = t ? l.b.Code : l.b.Text;
                var n = this._getCursor();
                this._redraw(!0), this._restoreCursor(n), this._updateTextPlaceholders()
            }, t.prototype._removeExtraSeparators = function() {
                for (var t = this._els.canvas.children, e = void 0, r = 0; r < t.length; r++) {
                    var i = t[r],
                        a = G(i, "sep");
                    a && (void 0 !== e && a == e && G(i, "sep", null), e = a)
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
                        it(i, o)
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
                                    s = Q(n),
                                    c = J(n),
                                    l = c[1] < e + r && c[1] + s[1] > e;
                                a._object.onViewport && a._object.onViewport(l)
                            }
                        })
                    });
                    var e = 0;
                    this._setEventListener(document, "selectionchange", function() {
                        var r = Object(i.u)(),
                            a = L(r, 2),
                            n = a[0],
                            s = a[1];
                        if (n && !X(n.commonAncestorContainer, function(e) {
                                return e == t._els.canvas
                            })) return;
                        var c = t._getCurrentParagraphIndex(),
                            d = L(c, 1)[0];
                        if (!1 !== d) {
                            if (!s && W(n.startContainer, "article")) {
                                var h = t._ps[e];
                                if (Object(i.D)(h)) return void Object(i.o)(h._object.getCaptionEl())
                            }
                            var _ = n.startContainer;
                            if (A.msie && s && et("article_ed__extra_controls", _) && "BUTTON" != _.tagName) {
                                var p = t._ps[d];
                                if (Object(i.D)(p)) return void p._object.getCaptionEl().focus()
                            }
                            e = d, t._highlightObjectsInCurrentSelection(), t._showObjectPicker(), t._correctCaptionSelection(), t._ensureDummyParagraphs(), 0 == o && t._showFormatTooltip(), t._saveLastCursor();
                            var u = t._getParagraph(d);
                            if (Object(i.D)(u) && l.c.includes(parseInt(u.type))) {
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
                            a = L(r, 2),
                            o = a[0];
                        if (a[1]) {
                            var n = t._getContainingParagraphEl(o.commonAncestorContainer),
                                s = L(n, 1)[0];
                            Object(i.E)(s) && (e.clipboardData.setData("text/plain", "uuid:" + s.getAttribute("data-uuid")), e.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", function(e) {
                        var r = t._getCurrentParagraphIndex(),
                            i = L(r, 1)[0];
                        i && (t._handleObjectPaste(e), t._handleLinkPaste(e), t._handlePhotoPaste(e), t._fromPasteEvent = !0, t._pasteCurrentIndex = i)
                    }), this._els.canvas.addEventListener("click", function(t) {
                        if (t.target.nodeType == Node.ELEMENT_NODE && "A" == t.target.tagName) return cancelEvent(t)
                    });
                    var n = !1;
                    this._els.canvas.addEventListener("input", function() {
                        t._hideObjectPicker(), t._expandBlockquoteParagraphs(c), t._removeExtraSeparators();
                        var e = t._replaceAlienInlineTags();
                        A.safari || t._els.canvas.normalize();
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
                        d = 1,
                        h = void 0;
                    this._els.canvas.addEventListener("keydown", function(e) {
                        var o = e.keyCode,
                            _ = e.metaKey || e.ctrlKey,
                            p = e.shiftKey,
                            u = Object(i.u)(),
                            f = L(u, 2),
                            g = f[0],
                            v = f[1];
                        if (g) {
                            var b = t._getCurrentParagraphIndex(),
                                y = L(b, 2),
                                m = y[0],
                                C = y[1],
                                E = t._getParagraph(m),
                                O = !1;
                            if (Object(i.D)(E))
                                if (E._object.isCaptionFocused()) O = 0 == g.startOffset && v;
                                else {
                                    var P = t._getContainingParagraphEl(g.startContainer);
                                    O = L(P, 1)[0] == E._object.el()
                                }
                            if (O && v && A.mozilla) {
                                if (o == vt) return t._focusParagraph(m - 1, !0), cancelEvent(e);
                                if (o == bt) return t._focusParagraph(m + 1, !0), cancelEvent(e)
                            }
                            if ((o == yt || o == ft) && t._resizeTooltip && t._resizeTooltip.isShown() && t._resizeTooltip.hide(), o == mt && v && 0 == m) return Object(i.o)(t._getParagraphElByIndex(1)), cancelEvent(e);
                            if (_ && o == ct && Object(i.D)(E) && E._object.isCaptionFocused()) {
                                var w = E._object.getCaptionEl();
                                return Object(i.S)(w), cancelEvent(e)
                            }
                            if (_) switch (o) {
                                case lt:
                                    return t._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(e);
                                case ht:
                                    return t._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(e);
                                case _t:
                                    return t.saveDraft(!1, !1, !0), cancelEvent(e);
                                case ut:
                                    return p ? t.redo() : t.undo(), cancelEvent(e);
                                case pt:
                                    return t.redo(), cancelEvent(e)
                            }
                            var x = o == dt && e.altKey,
                                T = E ? E.type : l.b.Text,
                                I = Object(S.U)("pre", g.startContainer),
                                k = !!(I || Object(S.U)("pre", g.endContainer) || g.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == g.startContainer.tagName);
                            if (x) {
                                if (T === l.b.Header1) return cancelEvent(e);
                                if (v) return t._toggleCodeBlocks(), cancelEvent(e);
                                if (!k && inArray(T, [l.b.Text, l.b.NumericList, l.b.BulletList])) {
                                    t._setCurrentParagraphDirty();
                                    var D = Object(S.U)("code", g.startContainer) || Object(S.U)("code", g.endContainer);
                                    if (D) {
                                        t._saveCursorMarker();
                                        var M = V("<span></span>");
                                        M.innerHTML = D.innerHTML, it(D, M), t._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), A.msie && t._triggerInputEvent();
                                    return cancelEvent(e)
                                }
                            }
                            if (o == mt && k && T == l.b.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(e);
                            var B = !1;
                            if (o == ft) {
                                if (s) return s[0].textContent = s[1], t._restoreCursor(s[2]), s = !1, cancelEvent(e);
                                if (O) {
                                    var H = t._getParagraphElByIndex(m),
                                        U = Object(i.l)("", Object(i.w)(E));
                                    return t._correctEmptyParagraphAfterFloatObjects(), it(H, U), Object(i.o)(U), t._setAllParagraphsDirty(), t._triggerInputEvent(), cancelEvent(e)
                                }
                                if (g && 0 == g.startOffset && g.collapsed) {
                                    var z = Object(S.U)("li", g.startContainer),
                                        F = Object(i.r)(z);
                                    if (z) {
                                        var W = t._ps[m],
                                            G = clone(W),
                                            Q = clone(W);
                                        G.lines = G.lines.slice(0, F);
                                        var J = Object(i.e)({
                                            lines: [clone(W.lines[F])]
                                        });
                                        Q.lines = Q.lines.slice(F + 1), t._ps.splice(m, 1, G, J, Q), t._redraw(!0);
                                        var Y = t._getParagraphElByIndex(m + 1);
                                        return Object(i.o)(Y), t._saveUndoState(), cancelEvent(e)
                                    }
                                }
                                if (g && v && 0 == g.startOffset && "LI" !== g.startContainer.nodeName) {
                                    var X = t._getCurrentParagraphIndex(),
                                        q = L(X, 1)[0],
                                        K = q > 0 && t._ps[q - 1];
                                    if (Object(i.D)(K)) {
                                        Object(i.H)(t._ps[q]) && (t._ps.splice(q, 1), t._redraw(!0));
                                        var Z = t._getParagraphElByIndex(q - 1);
                                        return Object(i.o)(Z), cancelEvent(e)
                                    }
                                }
                                t._setAllParagraphsDirty(), A.msie && setTimeout(function() {
                                    t._triggerInputEvent()
                                })
                            }
                            if (o == yt) {
                                var et = t._ps[m],
                                    rt = t._ps[m + 1],
                                    at = getCaretCharacterOffsetWithin(g.startContainer),
                                    ot = L(at, 1)[0],
                                    Ct = g.startContainer.textContent.length == ot;
                                if (O)
                                    if (!(et._object.isCaptionFocused() && !!et.lines[0].text)) {
                                        var Et = t._getParagraphElByIndex(m),
                                            Ot = Object(i.l)();
                                        return it(Et, Ot), Object(i.o)(Ot), t._setAllParagraphsDirty(), t._triggerInputEvent(), cancelEvent(e)
                                    }
                                if (v && Object(i.w)(rt) && Ct) return t._setParagraphDirty(m + 1), delete rt.sep, t._redraw(!1, !0), cancelEvent(e);
                                if (v && Ct && Object(i.D)(rt)) return Object(i.H)(et) && et.type != l.b.Header1 && (t._ps.splice(m, 1), t._redraw(!0, !0)), Object(i.o)(rt._object.getCaptionEl()), cancelEvent(e);
                                rt && Object(i.H)(et) && inArray(rt.type, [l.b.Header2, l.b.Header3]) && (et.type = rt.type, t._setParagraphDirty(m), t._redraw()), t._setAllParagraphsDirty(), (A.msie && 0 == g.startOffset && 0 == m || p) && setTimeout(function() {
                                    t._setCurrentParagraphDirty(), t._triggerInputEvent()
                                })
                            } else if (o == gt) {
                                if (k && I && T == l.b.Code && v) {
                                    var jt = I.textContent.search(/[^\s]/);
                                    return -1 == jt && (jt = I.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(jt)), cancelEvent(e)
                                }
                                if (t._isWithinObjectParagraphEl(Object(i.s)())) {
                                    var Pt = t._getContainingParagraphEl(Object(i.s)()),
                                        wt = L(Pt, 2),
                                        xt = wt[0],
                                        Tt = wt[1],
                                        It = Object(i.l)(),
                                        kt = t._ps[Tt]._object;
                                    return !kt.isCaptioned() || kt.isCaptionFocused() ? tt(It, xt) : $(It, xt), t._setAllParagraphsDirty(), Object(i.o)(It), t._triggerInputEvent(), cancelEvent(e)
                                }
                                var St = t._getContainingParagraphEl(Object(i.s)()),
                                    Lt = L(St, 3),
                                    Dt = Lt[0],
                                    Mt = (Lt[1], Lt[2]),
                                    At = getCaretCharacterOffsetWithin(Dt),
                                    Nt = L(At, 2)[1];
                                if (e.shiftKey || e.ctrlKey && A.safari) {
                                    var Bt = getCaretCharacterOffsetWithin(Dt),
                                        Ht = L(Bt, 2)[1],
                                        Ut = R("li", g.startContainer),
                                        zt = 0;
                                    Ut && (zt = nt(Ut));
                                    var Ft = !1;
                                    if (N(Mt.lines, function(t, e) {
                                            var r = e.brs,
                                                i = e.text.length;
                                            return 0 == Ht || Ht <= i && inArray(Ht, r) ? (Ft = !0, !1) : !((Ht -= i) <= 0 && t == zt) && void 0
                                        }), Ft) {
                                        n = !0, t._setParagraphDirty(m, C), document.execCommand("insertParagraph");
                                        var Rt = st(Dt);
                                        return Rt && (Object(i.o)(Rt), Rt.focus()), t._triggerInputEvent(), cancelEvent(e)
                                    }
                                    A.msie && 0 == Ht && g.insertNode(V("<br>"))
                                }
                                var Wt = v && g.startContainer.nodeType == Node.TEXT_NODE && !g.startContainer.nextSibling && Nt == Dt.textContent.length;
                                c = Wt && !Object(i.C)(t._ps[m]) && !e.shiftKey && inArray(Mt.type, [l.b.Quote, l.b.Quote2]), window.browser && window.browser.msie && setTimeout(t._triggerInputEvent.bind(t)), t._setParagraphDirty(m, C)
                            } else e.key && 1 == e.key.length ? (t._setParagraphDirty(m), t._setParagraphDirty(C), e.metaKey || (B = !0, e.key && (Object(i.z)(e.key) ? d += 1 : Object(i.B)(e.key) && (d -= 1), d = Math.min(Math.max(d, -5), 5))), r = Object(i.L)(e.key), B && !r && (a = !0), setTimeout(function() {
                                var e = Object(i.u)(),
                                    r = L(e, 2),
                                    a = r[0],
                                    o = r[1],
                                    n = t._getParagraph(m);
                                if (n && (n.type != l.b.Code && !!!(Object(S.U)("code", a.startContainer) || a.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == a.startContainer.tagName) && (h = h || d > 0, o && a))) {
                                    var c = a.startContainer;
                                    if (c.nodeType == Node.TEXT_NODE && a.startOffset > 0)
                                        for (var _ = c.textContent.substring(a.startOffset - 5, a.startOffset), p = 0, u = j.length; p < u; p++) {
                                            var f = j[p];
                                            if (void 0 === f.cyrillic || f.cyrillic === h)
                                                if (f.pattern instanceof RegExp) {
                                                    var g = _.match(f.pattern);
                                                    if (g) {
                                                        var v = f.substitution;
                                                        g.length > 1 && (v = v.replace("$1", g[1])), b.call(t, a.startOffset, c, g[0], v, f.noUndo);
                                                        break
                                                    }
                                                } else if (_.endsWith(f.pattern)) {
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
                return t && W(t, i.a)
            }, t.prototype._isWithinObjectParagraphEl = function(t) {
                var e = this._getContainingParagraphEl(t),
                    r = L(e, 1)[0];
                return r && Object(i.E)(r)
            }, t.prototype._highlightObjectsInCurrentSelection = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = L(t, 2),
                    r = e[0],
                    i = e[1];
                !1 !== r && !1 !== i && this._ps.forEach(function(t, e) {
                    if (t._object) {
                        var a = r != i;
                        t._object.highlight(e >= r && e <= i, a)
                    }
                })
            }, t.prototype._getOrCreateParagraphObject = function(t) {
                t._uuid || (t._uuid = wt());
                var e = this._getObject(t._uuid);
                if (!e) {
                    var r = t.mediaId || "";
                    switch (parseInt(t.type)) {
                        case l.b.ObjectPhoto:
                            e = new b(r, this, t);
                            break;
                        case l.b.ObjectVideo:
                            e = new y(r, this);
                            break;
                        case l.b.ObjectGIF:
                            e = new m(r, this);
                            break;
                        case l.b.ObjectAudio:
                            e = new C(r, this);
                            break;
                        case l.b.ObjectAudioPlaylist:
                            e = new O(r, this)
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
                            a = L(r, 3),
                            o = a[0],
                            n = a[1],
                            s = a[2],
                            c = this._getObject(n);
                        if (!c) return;
                        var d = Object(i.e)();
                        if (c.getCaptionEl()) {
                            var h = this._getParagraphFromHTML("", c.getCaptionEl().innerHTML, !0);
                            if (o == l.b.ObjectPhoto) {
                                var _ = G(c.el(), "paragraph-lines");
                                _ && (d.lines = JSON.parse(_));
                                var p = c.getImageIndex();
                                d.lines[p] = h.lines[0];
                                for (var u = 0; u < d.lines.length; u++) d.lines[u] = d.lines[u] || {
                                    text: "",
                                    decorations: {}
                                }
                            } else d.lines[0] = h.lines[0]
                        }
                        d.type = o, d.mode = s, d._uuid = n, d._object = c, this._ps[t] = d
                    } else if (e.nodeType == Node.ELEMENT_NODE) {
                        var f = e.tagName.toLowerCase();
                        this._ps[t] = this._getParagraphFromHTML(f, e.innerHTML)
                    } else this._ps[t] = this._getParagraphFromHTML("p", e.textContent);
                    e.nodeType == Node.ELEMENT_NODE && G(e, "sep") && (this._ps[t].sep = !0)
                }
            }, t.prototype.onDragEnd = function() {
                this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
            }, t.prototype.getCurrentParagraphs = function() {
                var t = this._getCurrentParagraphIndex(),
                    e = L(t, 2),
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
                    c != t && (N(geByClass("article_ed__drag_hovered"), function(t, e) {
                        F(e, "article_ed__drag_hovered")
                    }), t && B(t, "article_ed__drag_hovered"), c = t)
                }

                function d() {
                    window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", r), n = !1, F(s.canvas, "no_select"), clearInterval(o), l(!1), Y(a), a = !1
                }
                this._els.canvas.addEventListener("mousedown", function(s) {
                    if (a && Y(a), 2 == s.button) return d(), cancelEvent(s);
                    var c = Q(t._els.canvas)[1];
                    F(t._els.canvas, "no_select"), l(!1);
                    var h = t._getContainingParagraphEl(s.target),
                        _ = L(h, 3),
                        p = _[0],
                        u = _[1],
                        f = _[2];
                    if (Object(i.D)(f)) {
                        var g = s.pageY,
                            v = void 0,
                            b = void 0,
                            y = void 0,
                            m = void 0,
                            C = void 0;
                        window.addEventListener("mousemove", e = function(e) {
                            if (a || !(Math.abs(g - e.pageY) < 10)) {
                                a || (a = V('<div class="article_ed__drag_shadow"></div>'), t._els.editor.appendChild(a), (v = J(t._els.canvas))[1] -= scrollGetY(), b = Q(p), y = J(p), m = e.pageX - y[0], C = e.pageY - y[1] + t._options.layer.scrollTop, setStyle(a, {
                                    width: b[0],
                                    height: b[1]
                                }), t._focusParagraph(u)), B(t._els.canvas, "no_select"), v || d(), setStyle(a, {
                                    left: e.pageX - v[0] - m,
                                    top: e.pageY - scrollGetY() - C - v[1] + t._options.layer.scrollTop
                                }), clearInterval(o), e.pageY - scrollGetY() < 200 ? o = setInterval(function() {
                                    t._options.layer.scrollTop -= 10
                                }, 10) : e.pageY - scrollGetY() > window.innerHeight - 200 && (o = setInterval(function() {
                                    t._options.layer.scrollTop + window.innerHeight > c + 300 ? clearInterval(o) : t._options.layer.scrollTop += 10
                                }, 10));
                                var r = t._getContainingParagraphEl(e.target),
                                    i = L(r, 2),
                                    s = i[0],
                                    h = i[1];
                                s && s != p && s != Object(S.A)(p) ? (l(s), n = h) : (l(!1), n = !1)
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
                var e = U("article_ed__warn_info", this._els.editor);
                e && !t && (F(this._els.editor, "article_ed__warn_shown"), Y(e)), e || t && (e = V('<div class="article_ed__warn_info">' + t + "</div>"), this._els.editor.appendChild(e), B(this._els.editor, "article_ed__warn_shown"))
            }, t.prototype._initResizeTooltip = function() {
                var t = this,
                    e = V('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
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
                    e = L(t, 1)[0],
                    r = this._getParagraphElByIndex(e),
                    i = this._getParagraph(e),
                    a = intval(i.type);
                if (l.c.includes(a))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), W(r, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else if (i._object.isLoading()) this._resizeTooltip.hide();
                else {
                    var o = [{
                            id: l.a.Float,
                            type: "inline"
                        }, {
                            id: l.a.Normal,
                            type: "text"
                        }, {
                            id: l.a.Medium,
                            type: "bigger"
                        }, {
                            id: l.a.Large,
                            type: "cover"
                        }],
                        n = U("resize-tooltip__btns"),
                        s = [1, 1, 1, 1];
                    switch (a) {
                        case l.b.ObjectPhoto:
                            i._object._isCarousel() ? s = [0, 1, 1, 0] : i._object._isSmallPhotoSize() || (s = [1, 1, 0, 0]);
                            break;
                        case l.b.ObjectGIF:
                            i._object._isSmallGifSize() || (s = [1, 1, 0, 0])
                    }
                    n.innerHTML = "", o.forEach(function(t, e) {
                        s[e] && n.appendChild(V('\n          <button class="article_format_btn' + (i.mode == t.id || !i.mode && !t.id ? " article_format_btn_active" : "") + '" id="article_format_btn_' + t.type + '"  data-mode=' + t.id + " ></button>\n        "))
                    }), this._updatePositionResizeTooltip()
                }
            }, t.prototype._updatePositionResizeTooltip = function() {
                var t = this._resizeTooltip,
                    e = J(this._els.editor),
                    r = L(e, 2)[1],
                    i = this._getCurrentParagraphIndex(),
                    a = L(i, 1)[0],
                    o = this._getParagraphElByIndex(a).getBoundingClientRect(),
                    n = o.top,
                    s = o.left,
                    c = o.width,
                    l = Q(t._ttel)[0] / 2;
                setStyle(t._ttel, {
                    top: n - r - 60 + window.scrollY + 140,
                    left: s + c / 2 - l
                })
            }, t.prototype.setModeObject = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.a.Normal,
                    r = this._getParagraph(t);
                Object(i.D)(r) && (r.mode = e, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
            }, t.prototype.setModeCurrentObject = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l.a.Normal,
                    e = this._getCurrentParagraphIndex(),
                    r = L(e, 1)[0];
                this.setModeObject(r, t)
            }, t.prototype._uploadFloatList = function() {
                var t = this,
                    e = J(this._els.editor);
                this._floatedObjects = [], this._ps.forEach(function(r, i) {
                    if (r.mode && parseInt(r.mode) === l.a.Float) {
                        var a = t._getParagraphElByIndex(i),
                            o = a.getBoundingClientRect().height,
                            n = J(a);
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
        window.ArticleEditor = xt, stManager.done(jsc("web/article.js"))
    }
});