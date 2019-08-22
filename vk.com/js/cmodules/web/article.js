! function(e) {
    function t(t) {
        for (var r, o, n = t[0], h = t[1], l = t[2], c = 0, _ = []; c < n.length; c++) o = n[c], i[o] && _.push(i[o][0]), i[o] = 0;
        for (r in h) Object.prototype.hasOwnProperty.call(h, r) && (e[r] = h[r]);
        for (d && d(t); _.length;) _.shift()();
        return s.push.apply(s, l || []), a()
    }

    function a() {
        for (var e, t = 0; t < s.length; t++) {
            for (var a = s[t], r = !0, n = 1; n < a.length; n++) {
                var h = a[n];
                0 !== i[h] && (r = !1)
            }
            r && (s.splice(t--, 1), e = o(o.s = a[0]))
        }
        return e
    }
    var r = {},
        i = {
            "web/article": 0
        },
        s = [];

    function o(t) {
        if (r[t]) return r[t].exports;
        var a = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, o), a.l = !0, a.exports
    }
    o.m = e, o.c = r, o.d = function(e, t, a) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (o.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) o.d(a, r, function(t) {
                return e[t]
            }.bind(null, r));
        return a
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        h = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var l = 0; l < n.length; l++) t(n[l]);
    var d = h;
    s.push([68, "bundles/common", "bundles/6deb4edfcbfb465064078145a4a266bf"]), a()
}({
    68: function(e, t, a) {
        e.exports = a("f68Q")
    },
    FEjr: function(e, t, a) {
        "use strict";
        a("OGtf")("strike", function(e) {
            return function() {
                return e(this, "strike", "", "")
            }
        })
    },
    f68Q: function(e, t, a) {
        "use strict";
        a.r(t);
        a("rE2o"), a("ioFf"), a("Oyvg"), a("fA63"), a("OG14"), a("rGqo"), a("Btvt"), a("tUrg"), a("FEjr"), a("SRfc"), a("KKXr"), a("pIFo");
        var r = a("u2Gu");

        function i(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var s, o = window.domReplaceEl,
            n = window.browser && (browser.mozilla || browser.safari);
        class h {
            constructor(e, t, a) {
                this._mediaId = e, this._editor = t, this._highlighted = !1, this._isCaptioned = !!a, s = this.getEditor().getOptions().multiMediasSeparator
            }
            isCaptioned() {
                return this._isCaptioned
            }
            getEditor() {
                return this._editor
            }
            getMediaIdsCount() {
                return this._mediaId.split(s).length
            }
            getMediaId(e) {
                return void 0 !== e ? this._mediaId.split(s)[e] : this._mediaId
            }
            setMediaId(e) {
                this._mediaId = e
            }
            highlight() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (e != this._highlighted) {
                    this._highlighted = e;
                    var a = this.el();
                    if (e) {
                        var i = getSize(a),
                            s = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>');
                        setStyle(s, {
                            width: i[0] + 0,
                            height: i[1] + 0
                        }), addClass(a, "article_ed__object_highlighted")
                    } else re(geByClass1("_article_ed__object_highlight", a)), removeClass(a, "article_ed__object_highlighted");
                    if (this._isCaptioned)
                        if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || Object(r.focusEl)(this._getCaptionEl(), !0);
                        else {
                            var o = this.isEmptyCaption();
                            this._toggleCaptionPlaceholder(o), this._toggleCaption(!o)
                        }
                }
            }
            render() {}
            appendObjectInnerEl() {
                var e = this.render();
                addClass(e, "article_object_el"), e.setAttribute("contenteditable", "false");
                var t = geByClass1("article_object_el", this._objectEl);
                if (t) o(t, e);
                else {
                    var a = geByClass1("article_ed__img_inner", this._objectEl);
                    a.insertBefore(e, a.firstChild)
                }
            }
            el() {
                if (!this._objectEl) {
                    var e = this.render();
                    addClass(e, "article_object_el"), e.setAttribute("contenteditable", "false");
                    var t = this.getEditor().isLocked() ? "false" : "true",
                        a = browser.mozilla ? `contenteditable="${t}"` : 'contenteditable="false"';
                    this._objectEl = se(`<figure ${a}></figure>`);
                    var i = this.renderExtraControlsEl(),
                        s = this.renderEditControlEl();
                    if (i) {
                        var o = se('<div class="article_ed__img_wrapper"></div>'),
                            h = se('<div class="article_ed__img_inner"></div>');
                        i.setAttribute("contenteditable", "false"), addClass(i, "article_ed__extra_controls"), h.appendChild(i), o.appendChild(h), this._objectEl.appendChild(o), this.appendObjectInnerEl()
                    } else this._objectEl.appendChild(e);
                    s && this._objectEl.appendChild(s), this._isCaptioned && (this._captionEl = se(`<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="${t}"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">${getLang("pages_article_figure_placeholder")}</div>\n        </figcaption>`), this._objectEl.appendChild(this._captionEl)), n && e.addEventListener("click", () => {
                        this.highlight(!0), Object(r.focusEl)(e)
                    })
                }
                return this._setLoadingEl(), this._objectEl
            }
            renderExtraControlsEl() {
                return !1
            }
            renderEditControlEl() {
                return !1
            }
            renderLoadErr() {
                return se(`\n      <div class="article_editor_embed_error">\n        <p class="article_editor_embed_error_text">${getLang("pages_article_load_error_msg")}</p>\n      </div>\n    `)
            }
            setLoadingState() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                !!this._isLoading != e && (this._isLoading = e, this._setLoadingEl(t), toggleClass(this._objectEl, "article_ed__object_loading", e), e || this.getEditor().onObjectStateLoaded(this))
            }
            isLoading() {
                return !!this._isLoading
            }
            _setLoadingEl() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (this._objectEl) {
                    if (re(geByClass1("article_ed___object_loading_placeholder", this._objectEl)), this._isLoading) {
                        var t = se('<div class="article_ed___object_loading_placeholder"></div>');
                        toggleClass(t, "article_ed__object_loading_white", e), domInsertBefore(t, this._objectEl.firstChild)
                    }
                    toggleClass(this._objectEl, "article_ed___object_loading", !!this._isLoading)
                }
            }
            getCaptionEl() {
                return !!this._isCaptioned && this._getCaptionEl()
            }
            isCaptionFocused() {
                return !!this._isCaptioned && this._isFocusInCaption()
            }
            setCaptionElHtml(e) {
                if (this._isCaptioned) {
                    e = e.trim();
                    var t = this._getCaptionEl();
                    t.innerHTML != e && (t.innerHTML = e), this._toggleCaptionPlaceholder(!e), this._toggleCaption(!!e)
                }
            }
            isEmptyCaption() {
                return !this._getCaptionEl().textContent.trim()
            }
            _getCaptionEl() {
                return geByClass1("article_ed__figcaption_edit", this._captionEl)
            }
            _toggleCaption(e) {
                toggleClass(this._captionEl, "article_ed__figcaption_visible", e)
            }
            _toggleCaptionPlaceholder(e) {
                void 0 !== this._captionPlaceholderShown && this._captionPlaceholderShown === e || (this._captionPlaceholderShown = toggle(geByClass1("article_ed__caption_placeholder", this._captionEl), e))
            }
            _isFocusInCaption() {
                var e = i(Object(r.getRange)(), 2),
                    t = e[0],
                    a = e => {
                        var t = this._captionEl;
                        return !!traverseParent(e, e => e == t, 10)
                    };
                if (e[1]) return a(t.startContainer);
                var s = a(t.startContainer),
                    o = a(t.endContainer);
                return s && o
            }
            loadErrorHandler(e) {
                this.setLoadingState(!1), addClass(this._objectEl, "article_paragraph_err"), e.appendChild(this.renderLoadErr())
            }
        }
        var l = {};

        function d(e) {
            return `${(e=e.split("_"))[0]}_${e[1]}`
        }
        class c {
            static add(e, t, a) {
                l[e] = l[e] || {}, l[e][d(t)] = a
            }
            static get(e, t, a) {
                return void 0 !== a && (t = (t = t.split(","))[a]), l[e] = l[e] || {}, l[e][d(t)]
            }
        }
        var _, p = a("sWID");

        function g(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class u extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = c.get(p.ParagraphType.ObjectAudioPlaylist, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var t = g(this.getMediaId().split("_"), 2),
                        a = t[0],
                        r = t[1];
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_audioplaylist_snippet",
                        pl_owner_id: a,
                        pl_id: r,
                        pl_access_hash: e.accessHash
                    }, {
                        onDone: e => {
                            this.setLoadingState(!1), this._el.appendChild(se(e))
                        }
                    })
                }
                return this._el.appendChild(se(`<div class="article_ed__audioplaylist_play_note" contenteditable="false">${getLang("pages_articles_editor_audio_play_note")}</div>`)), this._el
            }
        }

        function v(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function b(e, t) {
            return e ? `<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="${t}">\n      <div class="article_ed__caredit_photo" style="background-image: url(${e})"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>` : `<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">${getLang("pages_article_ed_carousel_add")}</div>\n    </button>`
        }
        class f {
            constructor(e, t, a, r) {
                var i = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                i += `\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ${getLang("pages_article_ed_carousel_title")}\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">${getLang("global_save")}</button>\n            <button class="flat_button article_ed__caredit_cancel">${getLang("global_cancel")}</button>\n          </div>\n         </div>\n      </div>\n    `, i += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', t.getMediaId().split(",").forEach(e => {
                    var t = c.get(p.ParagraphType.ObjectPhoto, e),
                        a = v(Object(p.getAppropriateImage)(t.sizes, 251), 1)[0];
                    i += b(a, e)
                }), i += b(), i += "  </div>", i += "</div>", i += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(i), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", () => {
                    showBox("al_photos.php", {
                        to_id: t.getEditor().getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: this._limit - this._medias.length,
                        article: 1
                    }, {
                        cache: 1,
                        stat: [jsc("web/photos.js"), "photos.css", "upload.js"]
                    });
                    cur.chooseMedia = this.onPhotoAdd.bind(this), cur.showMediaProgress = () => {
                        show(this._els.loading), t.getEditor().setMediaUploadMode(!0)
                    }, cur.choosePhotoUploadedAll = () => {
                        hide(this._els.loading), t.getEditor().setMediaUploadMode(!1)
                    }
                }), this._els.saveButton.addEventListener("click", () => {
                    re(this._els.editor), a(this._medias.join(","))
                }), this._onSave = a, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", e => {
                    if (hasClass(e.target, "article_ed__caredit_remove")) {
                        var t = gpeByClass("article_ed__caredit_item", e.target);
                        re(t), this._collectMediaIds(), this._initSorter(), this._toggleAddButton(), this._updateCounter()
                    }
                }), e.appendChild(this._els.editor), setStyle(this._els.itemsWrap, {
                    height: getSize(this._els.itemsWrap)[1]
                }), this._initSorter(), this._scroll = new uiScroll(this._els.itemsWrap, {
                    global: !0,
                    stopScrollPropagation: !0,
                    stopScrollPropagationAlways: !0,
                    theme: "dark"
                }), this._limit = r, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
            }
            cancel() {
                re(this._els.editor), this._onSave(this._originalMedias.join(","))
            }
            _updateCounter() {
                this._els.counter.innerHTML = langNumeric(this._medias.length, cur.lang.pages_aricle_ed_carousel_counter)
            }
            _toggleAddButton() {
                toggle(this._els.addButton, this._medias.length < this._limit), this._scroll.update()
            }
            _collectMediaIds() {
                return this._medias = [], each(this._els.items.children, (e, t) => {
                    var a = domData(t, "media-id");
                    a && this._medias.push(a)
                }), this._medias = this._medias.slice(0, this._limit), this._medias
            }
            onPhotoAdd(e, t, a, i) {
                if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                    c.add(p.ParagraphType.ObjectPhoto, t, {
                        size: Object(r.getPhotoSize)(a.editable.sizes),
                        sizes: a.editable.sizes
                    });
                    var s = v(Object(p.getAppropriateImage)(a.editable.sizes, 251), 1)[0];
                    domInsertBefore(se(b(s, t)), this._els.addButton)
                }
                return void 0 === i && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
            }
            _initSorter() {
                this._sorter ? this._sorter.update() : stManager.add(["grid_sorter.js"], () => {
                    this._sorter = new GridSorter(this._els.items, "", {
                        onReorder: () => {
                            this._collectMediaIds()
                        }
                    })
                })
            }
        }

        function y(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class m extends h {
            constructor(e, t, a) {
                super(e, t, !0), this._currentImageIndex = 0, this.paragraph = a
            }
            cancelCarouselEditor() {
                this._carouselEditor && this._carouselEditor.cancel()
            }
            renderExtraControlsEl() {
                var e = se(`\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">${getLang("pages_article_ed_create_carousel")}</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    `);
                this._carouselControlsEl = e;
                var t = geByClass1("article_ed__carousel_btn_edit", e),
                    a = geByClass1("article_ed__carousel_nav_btn_left", e),
                    r = geByClass1("article_ed__carousel_nav_btn_right", e),
                    i = () => {
                        var e = this.getMediaIdsCount() > 1;
                        t.innerHTML = e ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                    };
                return i(), t.addEventListener("click", t => {
                    var a = this.getEditor();
                    return a.closeAllCarouselEditors(), a._resizeTooltip && a._resizeTooltip.hide(), addClass(this._objectEl, "article_ed__carousel_edit_open"), this._carouselEditor = new f(e, this, t => {
                        t ? (delete this._fixedImageSize, this.setMediaId(t), this.appendObjectInnerEl(), this.getEditor().saveUndoStateAndDraft(), i(), this._setImageIndex(0, e), removeClass(this._objectEl, "article_ed__carousel_edit_open"), delete this._carouselEditor) : this.getEditor().removeObject(this)
                    }, this.getEditor().getLimits().maxCarouselItems), cancelEvent(t)
                }), a.addEventListener("click", () => {
                    this._onCarouselNavBtnClicked(!0)
                }), r.addEventListener("click", () => {
                    this._onCarouselNavBtnClicked(!1)
                }), this._setImageIndex(0), e
            }
            _onCarouselNavBtnClicked(e) {
                var t = this.getEditor();
                this._setImageIndex(this.getImageIndex() + (e ? -1 : 1));
                var a = t.getObjectParagraphIndex(this.paragraph);
                a >= 0 ? (t.setParagraphDirty(a), t.redraw(!1)) : t.redraw(!0), this.isCaptionFocused() && Object(r.focusEl)(this.getCaptionEl(), !0)
            }
            getImageIndex() {
                return Math.min(this.getMediaIdsCount() - 1, this._currentImageIndex)
            }
            _setImageIndex(e) {
                this._currentImageIndex = Math.min(Math.max(0, e), this.getMediaIdsCount());
                var t = geByClass1("article_ed__carousel_nav_btn", this._carouselControlsEl);
                toggleClass(t, "no_left", 0 == this._currentImageIndex), toggleClass(t, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._objectEl, "article__carousel", this._isCarousel());
                var a = geByClass1("article_ed__carousel_counter", this._carouselControlsEl);
                this._isCarousel() ? (setStyle(a, "display", "inline-block"), a.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(a), this._drawImage(), this.highlight()
            }
            render() {
                this._el = se('\n      <div class="article_ed__img_content">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                var e = c.get(p.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
                return e && e.sizes ? (this.setLoadingState(!1), this._drawImage()) : this.setLoadingState(!0), this._el
            }
            _initUpload() {
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
                        customShowProgress: () => {},
                        onUploadStart: function(e, t) {},
                        onUploadComplete: (e, t) => {
                            t = JSON.parse(t), isEmpty(t) ? this._onUploadCallback && this._onUploadCallback() : ajax.post("al_photos.php", extend({
                                act: "choose_uploaded"
                            }, t), {
                                onDone: (e, t) => {
                                    this._mediaId = e, c.add(p.ParagraphType.ObjectPhoto, e, {
                                        size: Object(r.getPhotoSize)(t.editable.sizes),
                                        sizes: t.editable.sizes
                                    }), this._drawImage(), this._onUploadCallback && this._onUploadCallback(), this.getEditor().saveUndoStateAndDraft()
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
            }
            _getImageEl() {
                return geByTag1("img", this._el)
            }
            setBLOB(e, t) {
                this._onUploadCallback = t;
                var a = new FileReader;
                a.onload = () => {
                    this._initUpload(), Upload.onFileApiSend(this._upload, [e])
                }, a.readAsDataURL(e)
            }
            _updateSize() {}
            _drawImage() {
                var e = c.get(p.ParagraphType.ObjectPhoto, this.getMediaId(), this.getImageIndex()),
                    t = 720;
                switch (parseInt(this.paragraph.mode)) {
                    case 1:
                        t = 350;
                        break;
                    case 2:
                        t = 920;
                        break;
                    case 3:
                        t = window.innerWidth
                }
                if (e) {
                    var a = y(Object(p.getAppropriateImage)(e.sizes, t), 1)[0],
                        r = this._getImageEl(),
                        i = !1;
                    r.onload = () => {
                        clearTimeout(_), i = !0, setStyle(r, "visibility", "visible"), show(r), this.setLoadingState(!1), this._isCarousel() && this._fixSize()
                    }, r.src = a, clearTimeout(_), i || (_ = setTimeout(() => {
                        i || (setStyle(r, "visibility", "hidden"), this.setLoadingState(!0, this._isCarousel()))
                    }, 10)), this._updateSize()
                }
            }
            _isCarousel() {
                return this.getMediaIdsCount() > 1
            }
            _fixSize() {
                this._fixedImageSize = getSize(this._el), this._fixedImageSize[0] = Math.ceil(this._fixedImageSize[0]), this._fixedImageSize[1] = Math.ceil(this._fixedImageSize[1]), setStyle(this._el, {
                    height: this._fixedImageSize[1] + "px"
                }), setStyle(this._getImageEl(), {
                    "max-width": this._fixedImageSize[0],
                    "max-height": this._fixedImageSize[1]
                })
            }
            _isSmallPhotoSize() {
                var e = c.get(p.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
                return !(!e && !e.size) && e.size[0] >= 720
            }
        }
        class P extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var e = c.get(p.ParagraphType.ObjectVideo, this.getMediaId());
                if (e && (e.editable || e.thumb)) {
                    var t;
                    if (e.thumb) t = e.thumb;
                    else t = Object(p.getAppropriateImage)(e.editable.sizes, this.getEditor().getWidth(!0))[0];
                    this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: e.duration || 0,
                        platform: e.platform || ""
                    }))), this._el.appendChild(se(`<div class="article_ed__video_play_note" contenteditable="false">${getLang("pages_articles_editor_video_play_note")}</div>`)), this._el.appendChild(se(`<img class="article_ed__video_img" src=${t} contenteditable="false" />`))
                }
                return this._el
            }
            onViewport(e) {}
            onRender() {}
        }
        class E extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_ed__gif_content"></div>\n    ');
                var e = c.get(p.ParagraphType.ObjectGIF, this.getMediaId());
                if (e)
                    if (e.video) {
                        if (this._videoEl = ce("video", {
                                autoplay: !0,
                                loop: "loop",
                                muted: !0,
                                src: e.video + "&mp4=1"
                            }), e.size) {
                            var t = e.size[0] < e.size[1],
                                a = !this._isSmallGifSize();
                            (t || a) && setStyle(this._videoEl, {
                                width: e.size[0]
                            })
                        }
                        this._el.appendChild(this._videoEl), this._el.appendChild(se('<span class="article_ed__select_dummy">&nbsp;</span>'))
                    } else if (e.href) {
                    var r = e.href + "&wnd=1&module=" + cur.module;
                    this._imgEl = ce("img"), this._imgEl.addEventListener("error", () => {
                        showFastBox(getLang("pages_article_error_box_title"), getLang("pages_article_error_box_text")), this._editor.removeObject(this)
                    }), this._imgEl.src = r, this._el.appendChild(this._imgEl)
                }
                return this._el
            }
            onViewport(e) {
                if (this._imgEl) setStyle(this._imgEl, "visibility", e ? "visible" : "hidden");
                else if (e) {
                    var t = this._videoEl.play();
                    t && t.catch(() => {})
                } else this._videoEl.pause()
            }
            onRender() {
                setTimeout(() => {
                    var e = this._videoEl && this._videoEl.play();
                    if (e && e.catch(() => {}), browser.msie && this._videoEl) {
                        var t = this._videoEl.src;
                        this._videoEl.src = "", this._videoEl.src = t
                    }
                })
            }
            _isSmallGifSize() {
                var e = c.get(p.ParagraphType.ObjectGIF, this.getMediaId());
                return !(!e || !e.size) && e.size[0] > this.getEditor().getOptions().minGifWidthExpand
            }
        }

        function j(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class O extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = c.get(p.ParagraphType.ObjectPodcast, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var t = j(this.getMediaId().split("_"), 2),
                        a = t[0],
                        r = t[1];
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_podcast_snippet",
                        owner_id: a,
                        podcast_id: r
                    }, {
                        onDone: e => {
                            this.setLoadingState(!1), this._el.appendChild(se(e))
                        }
                    })
                }
                return this._el.appendChild(se(`<div class="article_ed__audioplaylist_play_note" contenteditable="false">${getLang("pages_articles_editor_audio_play_note")}</div>`)), this._el
            }
        }
        class C extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = c.get(p.ParagraphType.ObjectAudio, this.getMediaId()).audio,
                    t = AudioUtils.drawAudio(e);
                return this._el = se(`\n      <div class="article_object_audio">${t}</div>\n    `), this._el
            }
        }
        var T, w = [{
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

        function x(e) {
            return JSON.parse(JSON.stringify(e))
        }

        function I(e, t, a) {
            var i = [];
            return e.forEach((e, s) => {
                a && !Object(r.isObjectParagraph)(e) && Object(r.isParagraphEmpty)(e) && 0 != s && e.type != p.ParagraphType.Code || i.push(function(e, t) {
                    var a = {};
                    for (var i in e) {
                        if (!e.hasOwnProperty(i)) return;
                        if (!i.startsWith("_") || "_uuid" === i && t) {
                            var s = e[i];
                            a[i] = isObject(s) || isArray(s) ? x(s) : s
                        }
                    }
                    return Object(r.isObjectParagraph)(e) && e._object && (a.mediaId = e._object.getMediaId()), e.sep && (a.sep = 1), a.type == p.ParagraphType.Text && delete a.type, a.lines.forEach(e => {
                        if (e) {
                            if (void 0 !== e.decorations) {
                                var t = !0;
                                each(e.decorations, (a, r) => {
                                    0 == r.length ? delete e.decorations[a] : t = !1
                                }), t && delete e.decorations
                            }
                            e.brs && 0 == e.brs.length && delete e.brs
                        }
                    }), a
                }(e, t))
            }), x(i)
        }

        function S(e) {
            return e.forEach(e => {
                e.type = e.type || p.ParagraphType.Text, e.lines.forEach(e => {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
        class k extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se('<div class="article_object_embed"></div>'), this.setLoadingState(!0), loadScript("https://platform.twitter.com/widgets.js", {
                    onLoad: () => {
                        this.setLoadingState(!1), twttr.widgets.createTweet(this.getMediaId(), this._el, {
                            align: "center",
                            lang: window.vk && 0 == window.vk.lang ? "ru" : "en",
                            dnt: !0
                        }).then(() => {})
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }

        function L(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class A extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = L(this.getMediaId().split(";"), 2),
                    t = e[0],
                    a = e[1];
                this._el = se(`<div class="article_object_embed fb-post" data-href="https://www.facebook.com/${t}/posts/${a}/" data-width="552px"></div>`), this.setLoadingState(!0);
                var r = window.vk && 0 == window.vk.lang ? "ru_RU" : "en_US";
                return loadScript(`https://connect.facebook.net/${r}/all.js#xfbml=1&amp;version=v2.8`, {
                    onLoad: () => {
                        setTimeout((() => {
                            FB.XFBML.parse(this._objectEl, this.setLoadingState(!1))
                        }).bind(this))
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }
        class M extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se(`\n      <div class="article_object_embed article_object_embed_instagram">\n        <blockquote\n            class="article_embed_spacer instagram-media"\n            data-instgrm-permalink="https://instagram.com/p/${this.getMediaId()}"\n            data-instgrm-version="12"\n        ></blockquote>\n      <div>\n    `), this.setLoadingState(!0), loadScript("https://www.instagram.com/embed.js", {
                    onLoad: () => {
                        setTimeout(() => {
                            window.instgrm.Embeds.process(), addEvent(window, "message", p.changeHeightInstagramEmbed), this.setLoadingState(!1)
                        }, 0)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }

        function D(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class N extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se('<div class="article_object_embed"></div>'), setTimeout(() => {
                    var e = D(this.getMediaId().split(";"), 2),
                        t = e[0],
                        a = e[1],
                        r = domData(this._objectEl, "uuid"),
                        i = `vk_post_${this.getMediaId()}_${r}`;
                    this._el.setAttribute("id", i), this.setLoadingState(!0), loadScript("/js/api/openapi.js", {
                        onLoad: () => {
                            ajax.post("dev.php", {
                                act: "a_get_post_hash",
                                post: `${t}_${a}`
                            }, {
                                onDone: e => {
                                    e && (this.setLoadingState(!1), window.VK && window.VK.Widgets && window.VK.Widgets.Post(`${i}`, t, a, e))
                                },
                                onError: () => {
                                    this.loadErrorHandler(this._el)
                                }
                            })
                        }
                    })
                }, 0), this._el
            }
        }

        function B(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class R extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = B(this.getMediaId().split(";"), 2),
                    t = e[0],
                    a = e[1];
                return this._el = se(`<div class="article_object_embed"><blockquote class="telegram-post" data-telegram-post="${t}/${a}" data-width="100%" data-userpic="true"></div>`), this.setLoadingState(!0), loadScript("https://telegram.org/js/telegram-widget.js?5", {
                    onLoad: () => {
                        this.setLoadingState(!1)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }

        function H(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class z extends h {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_poll"></div>\n    ');
                var e = c.get(p.ParagraphType.ObjectPoll, this.getMediaId());
                if (e && e.snippet) return this._el.appendChild(se(e.snippet)), this._el;
                var t = H(this.getMediaId().split("_"), 2)[1];
                return this.setLoadingState(!0), ajax.post("al_articles.php", {
                    act: "get_poll_snippet",
                    voting_id: t
                }, {
                    onDone: e => {
                        this.setLoadingState(!1), this._el.appendChild(se(e))
                    }
                }), this._el
            }
            renderEditControlEl() {
                var e = c.get(p.ParagraphType.ObjectPoll, this.getMediaId());
                if (!e || !e.editable) return null;
                var t = se(`\n      <div class="article_ed__obj_edit_control">\n        <div class="article_ed__poll_object_btn">\n          <button class="article_ed__poll_object_edit">${getLang("global_edit")}</button>\n        </div>\n      </div>\n    `);
                return geByClass1("article_ed__poll_object_edit", t).addEventListener("click", this._editor.editObjectPoll.bind(this._editor, this)), t
            }
        }

        function U(e) {
            var t = [];
            e.length > T.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", T.maxParagraphs));
            var a = 0,
                i = 0;
            return e.forEach(e => {
                var s = 0;
                e.lines.forEach(e => {
                    e && (a += e.text.length, s += e.text.length)
                }), Object(r.isObjectParagraph)(e) && i++, s > T.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", s).replace("{limit}", T.maxSymbolsPerParagraph))
            }), a > T.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", a).replace("{limit}", T.maxSymbols)), i > T.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", i).replace("{limit}", T.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
        class F {
            static _saveChunk(e, t, a, r, i) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: r,
                    chunk_index: a,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: e => {
                        i(e)
                    },
                    onError: () => {
                        i(!0)
                    }
                })
            }
            static _saveFinally(e, t, a, r, i, s, o, n, h, l) {
                h = h ? JSON.stringify(h) : "", ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: i,
                    name: r,
                    is_published: intval(a),
                    chunks_count: n,
                    Article_text: h,
                    hash: o
                }, s || {}), {
                    onDone: l,
                    onFail: e => e.startsWith("locked ") ? (l(e), !0) : e ? (showFastBox(getLang("global_error"), e), l(!0), !0) : void 0
                })
            }
            static save(e, t, a, r, i, s, o, n, h, l) {
                var d = [],
                    c = [],
                    _ = 0;
                if (a.forEach(e => {
                        var t = 0;
                        e.lines.forEach(e => {
                            t += e.text.length, e.decorations && e.decorations.link && e.decorations.link.forEach(e => {
                                t += (e[2] || "").length
                            })
                        }), (_ += t) >= n && (d.push(c), _ = t, c = []), c.push(e)
                    }), c.length && d.push(c), d.length > 1) {
                    var p = new CallHub(() => {
                        F._saveFinally(e, t, r, i, s, h, o, d.length, !1, l)
                    }, d.length);
                    d.forEach((t, a) => {
                        F._saveChunk(e, t, a, o, e => {
                            e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : p.done()
                        })
                    })
                } else F._saveFinally(e, t, r, i, s, h, o, 0, a, l)
            }
        }
        var $ = a("zxIV"),
            K = a("W9Tc");

        function W(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var a = [],
                    r = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                } catch (e) {
                    i = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var G = window,
            Q = G.cur,
            V = G.browser,
            Y = G.each,
            J = G.addClass,
            X = G.geByTag1,
            q = G.geByClass1,
            Z = G.extractUrls,
            ee = G.removeClass,
            te = G.domClosestByTag,
            ae = G.hasClass,
            ie = G.domData,
            oe = G.getSize,
            ne = G.getXY,
            he = G.re,
            le = G.se,
            de = G.domInsertBefore,
            _e = G.traverseParent,
            pe = G.extend,
            ge = G.toggleClass,
            ue = G.trim,
            ve = G.domInsertAfter,
            be = G.gpeByClass,
            fe = G.clean,
            ye = G.domReplaceEl,
            me = G.isObject,
            Pe = G.ge,
            Ee = G.domChildIndex,
            je = G.domNS,
            Oe = (G.lineHtml, {
                KeyA: 65,
                KeyB: 66,
                KeyC: 67,
                KeyI: 73,
                KeyS: 83,
                KeyY: 89,
                KeyZ: 90,
                Apostrophe: 192,
                Backspace: 8,
                Enter: 13,
                Space: 32,
                Up: 38,
                Down: 40,
                Delete: 46,
                Tab: 9
            }),
            Ce = [{
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
            Te = Ce.slice().reverse(),
            we = {};
        Y(Ce, (e, t) => {
            we[t.tag] = t
        });
        var xe = {};
        Y(Ce, (e, t) => {
            xe[t.type] = t
        });
        var Ie = 100,
            Se = 1;

        function ke() {
            return Se++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        window.ArticleEditor = class {
            constructor(e, t, a) {
                var i, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                this._id = ke(), Q.lang = Q.lang || {}, pe(Q.lang, s.lang), this._options = s, this._els = {
                    editor: Pe(e),
                    canvas: le('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = le('<div class="article_photo_upload"></div>')), J(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [], i = s.limits, T = i;
                var o = a || [];
                if (s.postData) {
                    var n = s.postData.text || "";
                    n = (n = n.replace(/❤/g, "❤️")).split("\n");
                    var h = [];
                    h.push(Object(r.buildParagraph)({
                        type: p.ParagraphType.Header1,
                        lines: [{
                            text: ""
                        }]
                    })), n.forEach(e => {
                        ue(e) && h.push(Object(r.buildParagraph)({
                            lines: [{
                                text: fe(e)
                            }]
                        }))
                    }), o = h.concat(o)
                }
                o && 0 != o.length || (o = [Object(r.buildParagraph)({
                    type: this._options.noTitle ? p.ParagraphType.Text : p.ParagraphType.Header1
                })]), (o = o.filter(e => !1 !== e)).forEach(e => {
                    e.lines.forEach(e => {
                        e.text = Object(r.replaceParagraphEntities)(e.text), e.brs && me(e.brs) && (e.brs = Object(r.convertBRsToArray)(e.brs))
                    })
                }), s.needIndexCorrection && Object(r.correctRealIndexes)(o, 1), this.initParagraphs(o), this._updateTextPlaceholders(), this._initObjectDrag(), s.postData ? Object(r.focusEl)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), s.coverPhoto && this.setCoverPhoto(s.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(t.name), this.updateWarnInfos(), this._publishNameCandidate = s.name || this._getName(), this._saveUndoState(), this.wasPublishedInCurrentSession = !1, this._openTime = Date.now(), stManager.add("audio.js")
            }
            updateWarnInfos() {
                this.showWarningInfo(), this.showEditLockInfo(), this.showRevEditInfo()
            }
            _setEventListener(e, t, a) {
                this._events = this._events || [], this._events.push({
                    el: e,
                    event: t,
                    handler: a
                }), e.addEventListener(t, a)
            }
            setCoverPhoto(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                this._coverPhoto = e, this._options.isPublished || this.saveDraft(t)
            }
            getCoverPhoto() {
                return !1 !== this._coverPhoto && (this._coverPhoto ? this._coverPhoto : void 0)
            }
            getFirstCoverPhotoFromParagraphs() {
                var e = !1;
                return this._ps.forEach(t => {
                    if (!e && t.type == p.ParagraphType.ObjectPhoto) {
                        var a = t._object.getMediaId(0);
                        e = {
                            id: a,
                            data: c.get(p.ParagraphType.ObjectPhoto, a)
                        }
                    }
                }), e
            }
            getPublishName() {
                return this._publishName || this._publishNameCandidate || this._getName()
            }
            getTimeSpent() {
                return Math.round((Date.now() - this._openTime) / 1e3)
            }
            setPublishName(e) {
                this._publishName = e, this._options.isPublished || this.saveDraft(!0)
            }
            _updateTextPlaceholders() {
                if (!this._options.noTitle) {
                    this._els.placeholders || (this._els.placeholders = le('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = le(`<h1>${this.getOptions().placeholderTitle}</h1>`), this._els.placeholderFirstParagraph = le(`<p>${this.getOptions().placeholderParagraph}</p>`), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(r.isParagraphEmpty)(this._ps[0]) ? ee(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : J(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var e = this._ps[1],
                        t = !!e && e.sep,
                        a = W(this._getCurrentParagraphIndex(), 1)[0];
                    Object(r.isParagraphEmpty)(e) && (!e || e.type != p.ParagraphType.Code) && a < 2 && this._ps.length <= 2 && !t ? ee(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : J(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }
            destroy() {
                this._els.editor.innerHTML = "", ee(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(e => {
                    e.el.removeEventListener(e.event, e.handler)
                }), delete Q.docsCurFilter
            }
            getLimits() {
                return this._options.limits
            }
            getOptions() {
                return this._options
            }
            getWidth() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return oe(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
            }
            getPhotoUploadOptions() {
                return this._options.photoUploadOptions
            }
            getPhotoUploadEl() {
                return this._photoUploadEl
            }
            removeObject(e) {
                Y(this._ps, (t, a) => {
                    if (a._object == e) {
                        var i = this._getParagraphElByIndex(t + 1);
                        return Object(r.focusEl)(i), he(this._getParagraphElByIndex(t)), this._setAllParagraphsDirty(), this._triggerInputEvent(), !1
                    }
                })
            }
            _processPastedUrl(e, t) {
                var a = this._getParagraph(e);
                a && a.type == p.ParagraphType.Text && setTimeout(() => {
                    this._processMatchingEmbeds(e, t) || (he(this._els.shareParseForm), he(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(le('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                        value: t
                    })), this._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "index",
                        value: 1
                    })), this._els.shareParseForm.appendChild(ce("input", {
                        type: "hidden",
                        name: "force_media",
                        value: 1
                    })), window.onUploadFail = () => {}, window.onUploadDone = t => {
                        if (t) {
                            var a = t[2];
                            if (a) {
                                var i, s, o = {};
                                switch (t[0]) {
                                    case "audio_playlist":
                                        i = p.ParagraphType.ObjectAudioPlaylist, o = {
                                            accessHash: a.accessHash
                                        }, t[1] = a.ownerId + "_" + a.id + (a.accessHash ? "_" + a.accessHash : "");
                                        break;
                                    case "podcast":
                                        Object(K.partConfigEnabled)("article_podcasts") && (i = p.ParagraphType.ObjectPodcast, o = {});
                                        break;
                                    case "poll":
                                        Object(K.partConfigEnabled)("article_poll") && (i = p.ParagraphType.ObjectPoll, o = {
                                            editable: !1,
                                            snippet: a.snippet
                                        });
                                        break;
                                    case "doc":
                                        "gif" != a.ext && 3 != a.type || (i = p.ParagraphType.ObjectGIF, (o = {
                                            size: a.video_preview_size,
                                            video: a.video_preview,
                                            href: a.href || a.editable.href
                                        }).video || o.href || (i = !1));
                                        break;
                                    case "photo":
                                        i = p.ParagraphType.ObjectPhoto, o = {
                                            size: Object(r.getPhotoSize)(a.editable.sizes),
                                            sizes: a.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        i = p.ParagraphType.ObjectVideo, o = {
                                            editable: a.editable,
                                            duration: a.editable.duration,
                                            platform: a.editable.platform
                                        }
                                }
                                if (i) {
                                    var n = Object(r.hasSeparator)(this._ps[e]),
                                        h = {
                                            mediaId: t[1],
                                            type: i,
                                            sep: n,
                                            fromExtPage: intval(a.from_ext_page)
                                        };
                                    c.add(i, h.mediaId, o), this._linkTooltip && this._linkTooltip.hide(), h = Object(r.buildParagraph)(h), (s = this._getParagraph(e + 1)) && s._object && s._object._mediaId === h.mediaId || (this._getOrCreateParagraphObject(h), this._insertParagraphAt(e + 1, h), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), setTimeout(() => {
                                        this.onObjectStateLoaded()
                                    }, 10))
                                }
                            }
                        }
                    }, this._els.shareParseForm.submit())
                }, 0)
            }
            _processMatchingEmbeds(e, t) {
                var a, i, s;
                if (!Object(K.partConfigEnabled)("article_embeds")) return !1;
                if (a = t.match(/^https?:\/\/(?:www.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)$/)) i = p.ParagraphType.ObjectTwitter, s = a[1];
                else if (a = t.match(/^https?:\/\/(?:www.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)(?:\/embed)?(?:\/)?/)) i = p.ParagraphType.ObjectInstagram, s = a[1];
                else if (a = t.match(/^https?:\/\/(?:www.)?facebook\.com\/(\w.+)\/posts\/(\d+)\/?$/)) i = p.ParagraphType.ObjectFacebook, s = `${a[1]};${a[2]}`;
                else if (a = t.match(/^(?:https?:\/\/)?(?:[a-z0-9\_\.-]*\.)?(?:www.)?vk\.com\/(?:[a-z0-9\_\.-?]*w=)?wall(-?\d+)_(\d+)/)) i = p.ParagraphType.ObjectVK, s = `${a[1]};${a[2]}`;
                else if (a = t.match(/^https?:\/\/(?:www.)?t\.me\/(\w.+)\/(\d+)/)) {
                    if (Pe(`telegram-post-${a[1]}-${a[2]}`)) return !1;
                    i = p.ParagraphType.ObjectTelegram, s = `${a[1]};${a[2]}`
                }
                if (!i || !s) return !1;
                var o = Object(r.buildParagraph)({
                        _uuid: ke(),
                        type: i,
                        mediaId: s
                    }),
                    n = this._getParagraph(e + 1);
                return !(!n || !n._object || n._object._mediaId !== o.mediaId) || (this._getOrCreateParagraphObject(o), this._insertParagraphAt(e + 1, o), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), !0)
            }
            _handleObjectPaste(e) {
                var t = (e.clipboardData || e.originalEvent.clipboardData).getData("text/plain");
                if (t) {
                    var a = W(t.split(":"), 2),
                        r = a[0],
                        i = a[1];
                    if ("uuid" == r && i) {
                        var s = domQuery1(`[data-uuid="${i}"]`);
                        if (s) {
                            var o = s.cloneNode(!0);
                            o.setAttribute("data-force-update", "1");
                            var n = W(this._getCurrentParagraphIndex(), 1)[0];
                            ve(o, this._getParagraphElByIndex(n)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                        }
                    }
                }
            }
            _handleLinkPaste(e) {
                var t = this,
                    a = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (var i in a)
                    if (a.hasOwnProperty(i)) {
                        var s = a[i];
                        "string" === s.kind && function() {
                            var e = W(t._getCurrentParagraphIndex(), 1)[0];
                            s.getAsString(a => {
                                var i = a.replace(/(<([^>]+)>)/gi, ""),
                                    s = Z(i, !0);
                                if (1 === s.length) {
                                    var o = s[0].url,
                                        n = t._getParagraphElByIndex(e);
                                    t._processPastedUrl(e, o), Object(r.traverseTree)(n, a => {
                                        if (a.nodeType == Node.TEXT_NODE && a.textContent.indexOf(o) >= 0 && !_e(a, e => e.tagName && "a" == e.tagName.toLowerCase(), 3)) {
                                            t._saveCursorMarker();
                                            var r = document.createRange();
                                            r.setStart(a, a.textContent.indexOf(o)), r.setEnd(a, a.textContent.indexOf(o) + o.length);
                                            var i = window.getSelection();
                                            i.removeAllRanges(), i.addRange(r), t._setParagraphDirty(e), document.execCommand("createLink", !1, o), t._restoreCursorFromMarker()
                                        }
                                    }, !1)
                                }
                            })
                        }()
                    }
            }
            _handlePhotoPaste(e) {
                var t = this;
                this._photoPasteUploadingProcess = !1;
                var a = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (var i in a)
                    if (a.hasOwnProperty(i)) {
                        var s = a[i];
                        "file" === s.kind && function() {
                            t._photoPasteUploadingProcess = !0;
                            var e = s.getAsFile(),
                                a = new FileReader;
                            a.onload = () => {
                                t._photoPasteUploadingProcess = !1;
                                var i = W(t._getCurrentParagraphIndex(), 1)[0];
                                i = i || 0;
                                var s, o = Object(r.buildParagraph)({
                                    type: p.ParagraphType.ObjectPhoto
                                });
                                t._getOrCreateParagraphObject(o).setBLOB(e), Object(r.isParagraphEmpty)(t._ps[i]) ? (s = i, Object(r.hasSeparator)(t._ps[s]) && (o.sep = 1), t._ps[s] = o) : (s = i + 1, t._insertParagraphAt(s, o)), t._redraw(!0, !0);
                                var n = new Image;
                                n.onload = () => {
                                    t._focusParagraph(s + 1), t._showObjectPicker()
                                }, n.src = a.result
                            }, a.readAsDataURL(e)
                        }()
                    }
            }
            _getCurrentSelectionState() {
                var e = W(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    a = e[1];
                if (!1 === t || !1 === a) return !1;
                for (var i, s, o = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        list: !1,
                        justHeaders: !0
                    }, n = {}, h = 0, l = t; l <= a && l < this._ps.length; l++) {
                    var d = Object(r.isObjectParagraph)(this._ps[l]) ? this._ps[l]._object.getCaptionEl() : this._getParagraphElByIndex(l);
                    if (void 0 === i) {
                        var c = W(getCaretCharacterOffsetWithin(d), 2);
                        i = c[0], s = c[1]
                    }
                    this._ps[l].lines.forEach(e => {
                        var t = e.decorations;
                        Ce.forEach(a => {
                            var r = t[a.type];
                            r && !isEmpty(r) && r.forEach(t => {
                                var r = [t[0] + h, t[1] + h];
                                if ("link" == a.type) i < r[1] && s > r[0] && (n[a.type] = 1, o.decorations[a.type] = !0);
                                else if (1 == n[a.type]) {
                                    s > r[1] || (s >= r[0] && s <= r[1] ? t[0] > 0 ? n[a.type] = -1 : (n[a.type] = 2, o.decorations[a.type] = !0) : n[a.type] = -1)
                                } else if (!n[a.type]) {
                                    var l = i >= r[0] && i <= r[1];
                                    l && (s >= r[0] && s <= r[1]) ? (n[a.type] = 2, o.decorations[a.type] = !0) : l && (e.text.length > r[1] ? n[a.type] = -1 : n[a.type] = 1)
                                }
                            })
                        }), h += e.text.length
                    })
                }
                for (var _ = t; _ <= a && _ < this._ps.length; _++) Object(r.isObjectParagraph)(this._ps[_]) && (o.captionFocused = o.captionFocused || this._ps[_]._object.isCaptionFocused(), o.object = !0), this._ps[_].type == p.ParagraphType.Header1 && (o.header1 = !0), this._ps[_].type != p.ParagraphType.Header2 && (o.header2 = !1), this._ps[_].type != p.ParagraphType.Header3 && (o.header3 = !1), inArray(this._ps[_].type, [p.ParagraphType.Header1, p.ParagraphType.Header2, p.ParagraphType.Header3]) ? o.header = !0 : o.justHeaders = !1, inArray(this._ps[_].type, [p.ParagraphType.Quote, p.ParagraphType.Quote2]) || (o.quote = !1), inArray(this._ps[_].type, [p.ParagraphType.BulletList, p.ParagraphType.NumericList]) && (o.list = !0);
                var g = W(Object(r.getRange)(), 1)[0];
                return !(g && g.startContainer && ae(g.startContainer, "article_ed__noconteditable")) && (o.multiline = t != a, o)
            }
            _hideFormatTooltip() {
                this._formatTooltip && this._formatTooltip.isShown() && this._formatTooltip.hide()
            }
            _showFormatTooltip() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var e = window.getSelection();
                        if (e.focusNode && (ae(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase())) return;
                        var t = !e.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, t), 1)
                    } catch (e) {}
                }
            }
            _doShowFormatTooltip(e) {
                if (!this._formatTooltip) {
                    var t, a = le(`\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="${getLang("pages_articles_enter_link")}"/><div class="article_set_link_delete"></div></div>\n        </div>`);
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: a,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: () => {
                            var e = this._getCurrentSelectionState(),
                                t = [];
                            if (!e || e.header1 || e.object && !e.captionFocused || (e.justHeaders || t.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || t.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), t.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? t.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : t.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (t.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), t.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), t.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 != t.length) {
                                var r = q("article_format_btns", a);
                                r.innerHTML = "", t.forEach((e, t) => {
                                    t > 0 && inArray(e[0], ["header1"]) && r.appendChild(le('<div class="article_format_divider"></div>'));
                                    var a = e[2] ? "article_format_btn_active" : "";
                                    r.appendChild(le(`<button class="article_format_btn ${a}" id="article_format_btn_${e[0]}" onclick="${e[1]}"></button>`))
                                }), this.setLinkMode(!1)
                            } else this._formatTooltip.hide()
                        },
                        getTargetBoundingBox: () => {
                            if (this._formatTooltip.linkMode) return t;
                            var e = W(Object(r.getRange)(), 3),
                                a = e[0],
                                i = e[2];
                            if (!i || !i.rangeCount) return t;
                            var s = a.getBoundingClientRect();
                            if (!s.left) {
                                var o = a.startContainer.nodeType == Node.ELEMENT_NODE ? a.startContainer : domPN(a.startContainer),
                                    n = ne(o),
                                    h = oe(o);
                                return t = {
                                    top: n[1] + scrollGetY(),
                                    left: n[0] + h[0] / 2,
                                    width: s.width,
                                    height: s.height
                                }
                            }
                            return t = {
                                top: s.top + scrollGetY(),
                                left: s.left,
                                width: s.width,
                                height: s.height
                            }
                        }
                    }), this._formatTooltip.linkMode = !1;
                    var i = X("input", a);
                    i.addEventListener("keypress", e => {
                        if (e.keyCode == Oe.Enter) return this._setLinkToSelectedText(i.value.trim()), this._formatTooltip.hide(), cancelEvent(e)
                    }), q("article_set_link_delete", a).addEventListener("click", e => (this._setLinkToSelectedText(), cancelEvent(e)))
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }
            _setLinkToSelectedText(e) {
                if (e) {
                    if (!(e = (e = e.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://")) e = (Object(r.isVKUrl)(e) ? "https" : "http") + "://" + e;
                    e = encodeURIComponent(e)
                }
                this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), !V.msie && e || this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor)
            }
            clearLink() {
                this.setLinkMode(!1);
                var e = W(Object(r.getRange)(), 3),
                    t = e[0],
                    a = e[2],
                    i = te("a", t.startContainer),
                    s = te("a", t.endContainer) || i;
                i && (this._saveCursorMarker(), a.setBaseAndExtent(i, 0, s, Math.max(1, s.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }
            setLinkMode(e, t) {
                var a;
                e && (a = this._getCursor(), V.msie || document.execCommand("superscript", !1, !0));
                var r = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var i = X("input", r);
                        i.value = "", J(r, "article_editor_format_tt_set_link"), this._linkCursor = a, this._linkSelectedCursor = this._getCursor(), i.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(r, {
                        width: null
                    }), ee(r, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }
            setHeader1(e) {
                this._setHeader(p.ParagraphType.Header2, !e)
            }
            setHeader2(e) {
                this._setHeader(p.ParagraphType.Header3, !e)
            }
            setQuote() {
                var e = this._getCursor(),
                    t = W(this._getCurrentParagraphIndex(), 2),
                    a = t[0],
                    i = t[1];
                if (!1 !== a) {
                    i || (i = a);
                    for (var s = p.ParagraphType.Text, o = a; o <= i; o++)
                        if (l(this._ps[o])) {
                            s = this._ps[o].type == p.ParagraphType.Quote ? p.ParagraphType.Quote2 : this._ps[o].type == p.ParagraphType.Quote2 ? p.ParagraphType.Text : p.ParagraphType.Quote;
                            break
                        }
                    for (var n = a; n <= i; n++) {
                        var h = this._ps[n];
                        l(h) && (this._ps[n] = Object(r.buildParagraph)({
                            type: s,
                            lines: [h.lines[0]],
                            sep: Object(r.hasSeparator)(this._ps[n])
                        }), this._setParagraphDirty(n))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(e), this._saveUndoState(), this.saveDraft()
                }

                function l(e) {
                    return !Object(r.isObjectParagraph)(e) && !Object(r.isListParagraph)(e)
                }
            }
            _setHeader(e, t) {
                var a = this._getCursor(),
                    i = W(this._getCurrentParagraphIndex(), 2),
                    s = i[0],
                    o = i[1];
                if (!1 !== s) {
                    o || (o = s);
                    for (var n = s; n <= o; n++) {
                        h(this._ps[n]) && (this._ps[n].type = t ? e : p.ParagraphType.Text, this._setParagraphDirty(n))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(a), this._saveUndoState(), this.saveDraft()
                }

                function h(e) {
                    return !Object(r.isObjectParagraph)(e) && !Object(r.isListParagraph)(e)
                }
            }
            setStrong() {
                this._setAllParagraphsDirty(), document.execCommand("bold"), V.msie && this._triggerInputEvent()
            }
            setEm() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), V.msie && this._triggerInputEvent()
            }
            setStrike() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), V.msie && this._triggerInputEvent()
            }
            saveUndoStateAndDraft() {
                this._saveUndoState(), this.saveDraft()
            }
            _saveUndoStateDelayed() {
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = setTimeout(() => {
                    this._saveUndoState()
                }, 1e3)
            }
            _saveUndoState() {
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = !1;
                var e = I(this._ps, !0);
                if (this._undoCurrentState) {
                    if (JSON.stringify(e) == JSON.stringify(this._undoCurrentState)) return;
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._lastCursor
                    }), this._undos.length > Ie && this._undos.shift()
                }
                this._undoCurrentState = e, this._undoCurrentStateCursor = this._getCursor(), this._redos = [], this._options.onUndoRedo && this._options.onUndoRedo()
            }
            undo() {
                if (this._saveUndoDelayedTO && this._saveUndoState(), this._undos.length) {
                    this._redos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    });
                    var e = this._undos.pop();
                    this._ps = S(e.ps), this._undoCurrentState = I(this._ps, !0), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
                }
                this._options.onUndoRedo && this._options.onUndoRedo()
            }
            redo() {
                if (0 != this._redos.length) {
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    });
                    var e = this._redos.pop();
                    this._ps = S(e.ps), this._undoCurrentState = I(this._ps, !0), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
                }
            }
            canUndo() {
                return this._undoable || this._undos.length > 0
            }
            canRedo() {
                return this._redos.length > 0
            }
            initParagraphs(e) {
                e.forEach(e => {
                    e._preparedData && (e.mediaId.split(",").forEach((t, a) => {
                        c.add(e.type, t, e._preparedData[a])
                    }), delete e._preparedData)
                }), this._ps = S(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }
            _getParagraphFromHTML(e, t) {
                var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

                function i(t, a) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var s = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        a.text += "pre" == e ? s : Object(r.cleanTextSpaces)(s)
                    } else Object(r.isBR)(t) && a.text.length > 0 && a.brs.push(a.text.length);
                    Y(t.childNodes, (e, t) => {
                        var s = [a.text.length];
                        i(t, a), s.push(a.text.length);
                        var o, n = (t.tagName || "").toLowerCase();
                        switch (t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (n = "strong"), n) {
                            case "b":
                            case "strong":
                                o = xe.strong;
                                break;
                            case "em":
                            case "i":
                                o = xe.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                o = xe.strike;
                                break;
                            case "a":
                                o = xe.link;
                                var h = t.getAttribute("href") || "",
                                    l = Object(r.decodeURL)(h);
                                Object(r.isVKUrl)(h) && (l = h.match(/app-?\d+_-?\d+/) ? l.replace("%23", "#") : l.replace("#", "%23")), s.push(l);
                                break;
                            case "code":
                                o = xe.code;
                                break;
                            case "font":
                                var d = t.getAttribute("face");
                                "monospace" === d ? o = xe.code : "times" === d && (o = xe.code)
                        }
                        o && (a.decorations[o.type] = a.decorations[o.type] || [], s[0] < s[1] && a.decorations[o.type].push(s), a.decorations[o.type] = Object(r.mergeRanges)(a.decorations[o.type]))
                    })
                }
                var s = document.createElement("div");
                s.innerHTML = t;
                var o, n = [],
                    h = {};
                if ("ol" == e || "ul" == e) {
                    switch (e) {
                        case "ol":
                            o = p.ParagraphType.NumericList;
                            break;
                        case "ul":
                            o = p.ParagraphType.BulletList
                    }
                    for (var l = 0, d = s.children.length; l < d; l++) {
                        var c = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        i(s.children[l], c), c.brs = Object(r.cleanBRs)(c.brs), n.push(c)
                    }
                } else {
                    switch (e) {
                        case "h1":
                            o = p.ParagraphType.Header1;
                            break;
                        case "h2":
                        case "header":
                            o = p.ParagraphType.Header2;
                            break;
                        case "h3":
                        case "h4":
                            o = p.ParagraphType.Header3;
                            break;
                        case "blockquote":
                            o = p.ParagraphType.Quote;
                            break;
                        case "cite":
                            o = p.ParagraphType.Quote2;
                            break;
                        case "pre":
                            o = p.ParagraphType.Code;
                            break;
                        default:
                            o = p.ParagraphType.Text
                    }
                    var _ = s.firstElementChild;
                    if (Object(r.isObjectParagraphEl)(_)) {
                        var g = ie(_, "type"),
                            u = ie(_, "media-id");
                        g && u && (s = X("figure", _), o = g, h.mediaId = u)
                    }
                    var v = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    i(s, v), v.brs = Object(r.cleanBRs)(v.brs, v.text.length), n.push(v), o == p.ParagraphType.Code && delete v.decorations.code, a || o != p.ParagraphType.Text || "```" != v.text || 0 != v.brs.length || (v.text = "", o = p.ParagraphType.Code), Object(r.isHeaderParagraph)(o) || (0 == v.text.indexOf("1. ") ? (o = p.ParagraphType.NumericList, this._removeParagraphLineTextPart(v, 0, "1. ".length)) : 0 == v.text.indexOf("* ") && (o = p.ParagraphType.BulletList, this._removeParagraphLineTextPart(v, 0, "* ".length))), v.brs = v.brs.filter(e => e > 0)
                }
                return h.lines = n, h.type = o, Object(r.buildParagraph)(h)
            }
            _removeParagraphLineTextPart(e, t, a) {
                e.text = e.text.substring(0, t) + e.text.substring(a);
                for (var r = a - t, i = 0, s = e.brs.length; i < s; i++) {
                    var o = e.brs[i];
                    o > t && o < a ? e.brs[i] = void 0 : e.brs[i] > t && e.brs[i] >= a && (e.brs[i] -= r)
                }
                e.brs = e.brs.filter(e => void 0 !== e), Y(e.decorations, (i, s) => {
                    s.forEach(e => {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= a ? e[1] = t : e[0] >= t && e[1] <= a ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > a ? (e[0] = t, e[1] -= r) : (e[0] -= r, e[1] -= r))
                    }), e.decorations[i] = e.decorations[i].filter(e => void 0 !== e[0])
                })
            }
            _renderObjectParagraph(e, t) {
                var a = this._getOrCreateParagraphObject(e),
                    i = a.el();
                a.onRender && a.onRender();
                var s = 0;
                return isString(t) && (t = [t]), e.type == p.ParagraphType.ObjectPhoto ? (s = a.getImageIndex(), a.setCaptionElHtml(t[s] || "")) : a.setCaptionElHtml(t[0] || ""), ie(i, "paragraph-lines", JSON.stringify(e.lines)), ie(i, "uuid", e._uuid), ie(i, "type", e.type), ie(i, "media-id", e._object.getMediaId()), ie(i, "mode", parseInt(e.mode) || 0), J(i, r.ArticleEditorParagraphClass), i
            }
            _renderParagraphLines(e, t) {
                if (!e.lines) return ["", ""];
                var a = "",
                    i = "",
                    s = "",
                    o = parseInt(e.type);
                switch (o) {
                    case p.ParagraphType.NumericList:
                        a = "ol", i = "li";
                        break;
                    case p.ParagraphType.BulletList:
                        a = "ul", i = "li";
                        break;
                    case p.ParagraphType.Header1:
                        i = "h1";
                        break;
                    case p.ParagraphType.Header2:
                        i = "h2";
                        break;
                    case p.ParagraphType.Header3:
                        i = "h3";
                        break;
                    case p.ParagraphType.Quote:
                        i = "blockquote";
                        break;
                    case p.ParagraphType.Quote2:
                        i = "cite";
                        break;
                    case p.ParagraphType.Code:
                        i = "pre";
                        break;
                    default:
                        a = "p"
                }
                var n = [];
                return e.lines.forEach(a => {
                    if (a) {
                        var h = a.text,
                            l = a.decorations,
                            d = [];
                        Y(Ce, (e, t) => {
                            if (!Object(r.isHeaderParagraph)(o) && o != p.ParagraphType.Code || "code" != t.type) {
                                var a = l[t.type];
                                if (a)
                                    for (var i = function(e, r) {
                                            var i = a[r];
                                            (d[i[0]] = d[i[0]] || {
                                                open: {},
                                                close: {}
                                            }).open[t.type] = u(i);
                                            var s = d[i[1]] = d[i[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                o = function(e, t) {
                                                    for (var a = []; e > 0;) {
                                                        var r = d[--e];
                                                        if (r)
                                                            for (var i in r.open)
                                                                if (r.open.hasOwnProperty(i)) {
                                                                    if (i == t) return [];
                                                                    a.push(i)
                                                                }
                                                    }
                                                    return a
                                                }(i[1], t.type);
                                            o.forEach(e => {
                                                s.close[e.type] = !0
                                            }), s.close[t.type] = !0, o.forEach(e => {
                                                s.open[e.type] = u(i)
                                            })
                                        }, s = 0, n = a.length; s < n; s++) i(0, s)
                            }
                        });
                        var c = 0,
                            _ = [];
                        d.forEach((t, i) => {
                            if (t) {
                                var s = !1,
                                    o = t.close.link && 1 == Object.keys(t.close).length;
                                i > 0 && (s = Object(r.prepareLineText)(h, c, i, a.brs, e.type == p.ParagraphType.Code), o || _.push(s));
                                var n = 0;
                                o && (s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), !1 !== s && _.push(s)), Y(Te, (e, a) => {
                                    void 0 !== t.close[a.type] && _.push(`</${a.tag}>`)
                                }), _.push("<br/>".repeat(n)), Y(Ce, (e, a) => {
                                    var r = t.open[a.type];
                                    void 0 !== t.open[a.type] && (!0 === r ? _.push(`<${a.tag}>`) : _.push(`<${a.tag} href="${fe(r)}">`))
                                }), c = i
                            }
                        }), _.push(Object(r.prepareLineText)(h, c, void 0, a.brs, e.type == p.ParagraphType.Code));
                        var g = "";
                        i && (g += `<${i}${s=s?` ${s}`:""}>`), inArray(o, [p.ParagraphType.Quote, p.ParagraphType.Quote2]) && (g += "<p>"), g += _.join("") || (t ? "" : "<br/>"), inArray(o, [p.ParagraphType.Quote, p.ParagraphType.Quote2]) && (g += "</p>"), i && (g += `</${i}>`), n.push(g)
                    }

                    function u(e) {
                        return e[2] || !0
                    }
                }), [a, n]
            }
            _renderParagraph(e) {
                var t, a = Object(r.isObjectParagraph)(e),
                    i = W(this._renderParagraphLines(e, a), 2),
                    s = i[0],
                    o = i[1];
                if (a) t = this._renderObjectParagraph(e, o);
                else {
                    var n = o.join("");
                    t = le(s ? `<${s}>${n}</${s}>` : n)
                }
                return Object(r.hasSeparator)(e) ? ie(t, "sep", Object(r.genSepatorId)()) : ie(t, "sep", null), J(t, r.ArticleEditorParagraphClass), J(t, "article_paragraph"), t
            }
            _getParagraphElByIndex(e) {
                return !1 === e ? null : this._els.canvas.childNodes[e] || null
            }
            getObjectParagraphIndex(e) {
                for (var t = 0; t < this._ps.length; t++)
                    if (this._ps[t]._uuid === e._uuid) return t;
                return -1
            }
            _getParagraph(e) {
                return e < this._ps.length ? this._ps[e] : null
            }
            _decorateParagraphEls() {
                for (var e = 0, t = this._ps.length; e < t; e++) {
                    var a = e > 0 && this._ps[e - 1],
                        r = this._ps[e],
                        i = e + 1 < t && this._ps[e + 1],
                        s = !1,
                        o = !1,
                        n = !1;
                    a && r.type == a.type || (s = !0), i && r.type == i.type || (o = !0), (p.ResizableObjectTypes.includes(+i.type) || i.sep) && (n = !0);
                    var h = this._getParagraphElByIndex(e);
                    ge(h, "article_decoration_first", s), ge(h, "article_decoration_last", o), ge(h, "article_decoration_before", n)
                }
            }
            redraw() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._redraw(e, !0)
            }
            _redraw(e, t) {
                var a = this._getCursor();
                e ? (this._els.canvas.innerHTML = "", this._ps.forEach(e => {
                    this._els.canvas.appendChild(this._renderParagraph(e))
                })) : this._dirty.forEach(e => {
                    if (!(e >= this._ps.length)) {
                        var t = this._getParagraphElByIndex(e);
                        if (t) {
                            var a = this._renderParagraph(this._ps[e]);
                            t ? a.outerHTML != t.outerHTML && ye(t, a) : this._els.canvas.appendChild(a)
                        }
                    }
                }), t && this._restoreCursor(a), this._decorateParagraphEls(), this._dirty = []
            }
            _getContainingParagraphEl(e) {
                for (; e && e.parentNode != this._els.canvas;) e = e.parentNode;
                var t = Object(r.getElementIndex)(e);
                return [e, t, this._getParagraph(t)]
            }
            _getCurrentParagraphIndex() {
                var e = window.getSelection();
                if (e.rangeCount) {
                    var t = e.getRangeAt(0);
                    if (t.startContainer == this._els.canvas) return [t.startOffset, t.endOffset];
                    var a = W(this._getContainingParagraphEl(t.startContainer), 2)[1],
                        i = t.endContainer;
                    if (0 === t.endOffset && (this._isParagraphEl(i) || this._isParagraphEl(domPN(i)) && 0 == Object(r.childNodeIndex)(i))) {
                        var s = W(this._getContainingParagraphEl(i), 1)[0];
                        i = Object($.domPS)(s) || s
                    }
                    var o = W(this._getContainingParagraphEl(i), 2)[1];
                    return [a, Math.max(a, o)]
                }
                return [0, !1]
            }
            _saveCursorMarker() {
                if (!this._markerCursorSet) {
                    var e = W(Object(r.getRange)(), 2),
                        t = e[0],
                        a = e[1];
                    if (!t) return [0, 0];
                    var i = t.startContainer,
                        s = t.startOffset,
                        o = t.endContainer,
                        n = t.endOffset;
                    if (i != this._els.canvas) {
                        var h = this._getContainingParagraphEl(i)[1];
                        l(i, s, r.CURSOR_MARKER_START), a || (this._getContainingParagraphEl(o)[1] == h && o.textContent.includes(r.CURSOR_MARKER_START) && (n += 1), l(o, n, r.CURSOR_MARKER_END)), this._markerCursorSet = !0
                    }
                }

                function l(e, t, a) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var r = e.textContent;
                        e.textContent = r.substring(0, t) + a + r.substring(t)
                    } else {
                        var i = document.createTextNode(a);
                        e.insertBefore(i, e.childNodes[t])
                    }
                }
            }
            _restoreCursorFromMarker() {
                if (this._markerCursorSet) {
                    var e, t, a, i = (e, t, a) => {
                        return function t(i) {
                            if (i.nodeType == Node.TEXT_NODE) {
                                var s = i.textContent.indexOf(e);
                                if (s >= 0) {
                                    i.textContent = i.textContent.split(e).join("");
                                    var o = i.parentElement;
                                    return -1 != o.innerHTML.search(/\s$/) && (o.innerHTML = o.innerHTML.trimRight() + r.NBSP, a && a[0] == i && (a[0] = o.lastChild), i = o.lastChild), o.innerHTML || ((i = o).innerHTML = "<br/>", s = 0), [i, s]
                                }
                            } else
                                for (var n = 0, h = i.childNodes.length; n < h; n++) {
                                    var l;
                                    if (l = t(i.childNodes[n])) return l
                                }
                        }(t)
                    };
                    for (a = 0; a < this._els.canvas.children.length && !(e = i(r.CURSOR_MARKER_START, this._els.canvas.children[a])); a++);
                    for (; a < this._els.canvas.children.length && !(t = i(r.CURSOR_MARKER_END, this._els.canvas.children[a], e)); a++);
                    if (e) {
                        var s = document.createRange();
                        e[0].nodeType == Node.TEXT_NODE && (e[1] = Math.min(e[1], e[0].textContent.length)), s.setStart(e[0], e[1]), t && (t[0].nodeType == Node.TEXT_NODE && (t[1] = Math.min(t[1], t[0].textContent.length)), s.setEnd(t[0], t[1])), window.getSelection().setBaseAndExtent(s.startContainer, s.startOffset, s.endContainer, s.endOffset)
                    }
                    var o = e => {
                        this._ps.forEach(t => {
                            t.lines.forEach(t => {
                                var a = t.text.indexOf(e);
                                if (a >= 0) {
                                    t.text = t.text.replace(e, "");
                                    for (var r = 0, i = 0; i < t.brs.length; i++) t.brs[i] > a && (r = 1), t.brs[i] -= r;
                                    Y(Ce, (e, r) => {
                                        var i = t.decorations[r.type];
                                        if (i)
                                            for (var s = 0, o = i.length; s < o; s++) {
                                                var n = i[s];
                                                n[0] > a && (n[0] -= 1), n[1] > a && (n[1] -= 1)
                                            }
                                    })
                                }
                            })
                        })
                    };
                    o(r.CURSOR_MARKER_START), o(r.CURSOR_MARKER_END), this._markerCursorSet = !1
                }
            }
            _setAllParagraphsDirty() {
                this._dirty = [];
                for (var e = this._els.canvas.children.length, t = 0; t < e; t++) this._dirty.push(t);
                this._ps = []
            }
            _setCurrentParagraphDirty() {
                var e = W(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    a = e[1];
                this._setParagraphDirty(t, a)
            }
            setParagraphDirty(e, t) {
                this._setParagraphDirty(e, t)
            }
            _setParagraphDirty(e, t) {
                if (void 0 === e || e < 0) throw new Error("Invalid paragraph index");
                t = t || e;
                for (var a = e; a <= t; a++) inArray(a, this._dirty) || this._dirty.push(a)
            }
            _expandDoubleBRs() {
                function e(e, t, a) {
                    var i = e.lines[0];
                    void 0 === a && (a = i.text.length);
                    var s = [];
                    return i.brs.forEach(e => {
                        e < a && e > t && s.push(e - t)
                    }), Object(r.buildParagraph)({
                        type: e.type,
                        lines: [{
                            text: i.text.substr(t, a - t),
                            decorations: Object(r.decorationsSlice)(i.decorations, t, a),
                            brs: s
                        }]
                    })
                }
                for (var t = !1, a = 0, i = this._ps.length; a < i; a++) {
                    var s = this._ps[a];
                    if (s.lines.length > 1) s.lines.forEach(r.cleanLineBRs);
                    else {
                        var o = s.lines[0];
                        if (!o || !o.brs.length) continue;
                        for (var n = o.brs, h = [], l = 0, d = 0, c = n.length; d < c; d++)
                            if (l != n[d] && d > 0 && n[d - 1] == n[d]) {
                                var _ = e(s, l, n[d]);
                                Object(r.isParagraphEmpty)(_) || h.push(_), l = n[d]
                            }
                        h.push(e(s, l)), h.length > 1 && (Array.prototype.splice.apply(this._ps, [a, 1].concat(h)), a = a + h.length - 1, t = !0)
                    }
                }
                return t
            }
            _processAlienPhotos() {
                var e = this;
                if (!this._photoPasteUploadingProcess)
                    for (var t, a = Array.prototype.slice.call(this._els.canvas.children); t = a.shift();)
                        if (!Object(r.isObjectParagraphEl)(t) || !this._isTrackedObjectEl(t))
                            for (var i = Array.prototype.slice.call(geByTag("img", t)), s = void 0, o = function() {
                                    if (!s.src || !domPN(t) || !isVisible(s)) return "continue";
                                    var a = _e(s, t => t == e._els.canvas || "FIGURE" == t.tagName, 10),
                                        i = !(!a || a == e._els.canvas) && X("figcaption", a),
                                        o = Object(r.buildParagraph)({
                                            type: p.ParagraphType.ObjectPhoto
                                        }),
                                        n = e._renderObjectParagraph(o, i ? i.innerHTML : "");
                                    Object(r.justCursorInString)(t.textContent) ? (ye(t, n), he(s), ve(le(`<p>${r.CURSOR_MARKER_START}</p>`), n)) : (ve(n, domPN(s)), he(i), he(s)), _e(n, t => {
                                        if (t == e._els.canvas) return !0;
                                        ee(t, r.ArticleEditorParagraphClass)
                                    }), Object(r.queuePhotoProcess)(s.src, (t, a, r) => {
                                        t ? (he(n), e._forgetObject(o._uuid), e._setAllParagraphsDirty(), e._triggerInputEvent(), r()) : e._getOrCreateParagraphObject(o).setBLOB(a, r)
                                    })
                                }; s = i.shift();) o()
            }
            _flattenAlienParagraphs() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t, a = Array.prototype.slice.call(this._els.canvas.children), i = this._fromPasteEvent, s = this._pasteCurrentIndex, o = W(this._getCurrentParagraphIndex(), 1)[0], n = -1, h = function() {
                            if (n++, i && !ue(t.textContent) && n > s && n <= o) return he(t), "continue";
                            var a = t;
                            Object(r.isQuoteEl)(t) && !Object(r.isAlienParagraphEl)(t) && (a = t.firstChild);
                            var h = !1;
                            (function e(i) {
                                if (i && i.nodeType != Node.TEXT_NODE && !Object(r.isBR)(i))
                                    if (Object(r.hasBlockElements)(i))
                                        if (this._isTrackedObjectEl(i)) i != a && (de(i, t), h = !0);
                                        else
                                            for (var s, o = Array.prototype.slice.call(i.childNodes); s = o.shift();) e.call(this, s);
                                else i != a && (ue(i.innerHTML) && de(i, t), h = !0)
                            }).call(e, a, !0), h && he(t)
                        }; t = a.shift();) h();
                    this._setAllParagraphsDirty()
                }
            }
            _correctCaptionSelection() {
                var e = W(Object(r.getRange)(), 3),
                    t = e[0],
                    a = e[1],
                    i = e[2];
                if (t && !a) {
                    var s = _e(t.startContainer, e => "FIGCAPTION" == e.tagName, 5);
                    if (s && t.endContainer != t.startContainer && t.endContainer.nodeType == Node.ELEMENT_NODE && Object(r.isParagraphEl)(t.endContainer) && 0 == t.endOffset && 0 == t.startOffset) {
                        var o = q("article_ed__figcaption_edit", s),
                            n = t.cloneRange();
                        n.selectNodeContents(o), i.removeAllRanges(), i.addRange(n)
                    }
                }
            }
            cancelSaveDraft() {
                clearTimeout(this._draftSaveTO)
            }
            saveDraft(e, t, a) {
                if (!this.isLocked()) {
                    clearTimeout(this._draftSaveTO);
                    var r = JSON.stringify({
                        paragraphs: I(this._ps)
                    });
                    t ? this._lastSavedDraft = r : this._lastSavedDraft != r || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(() => {
                        if (this._lastSavedDraft = r, 0 != this._ps.length) {
                            var e = U(this._ps);
                            e ? this._options.onDraftNotSaved && this._options.onDraftNotSaved(e) : this.save(!1, (e, t, a) => {
                                this._initDraftSave = !0, this._options.onDraftSaved && this._options.onDraftSaved(e, t, a)
                            })
                        }
                    }, a ? 0 : 1e3 * this._options.draftSaveDelay)) : !t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
                }
            }
            _getName() {
                if (this._publishName) return this._publishName;
                var e = I(this._ps),
                    t = e.length ? e[0].lines[0].text : "";
                return Object(r.generateLatinizedName)(t, this._options.maxNameLength)
            }
            getTitle() {
                var e = this._ps[0];
                return e ? e.lines[0].text : ""
            }
            isLimitsExceeded() {
                return !!U(this._ps)
            }
            save(e, t) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    i = I(this._ps, !1, !0);
                e && Object(r.correctRealIndexes)(i, -1);
                var s = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && (a.from_post_convert = 1), a.session_duration = this.getTimeSpent(), F.save(this.getArticleOwnerId(), this.getArticleId(), i, e, s, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, a, (a, r, i, o, n, h) => {
                    if (isString(a) && a.startsWith("locked ")) return this.getOptions().editLockMessage = a.slice("locked ".length), this.showEditLockInfo(), void(t && t(!0));
                    a || (r && (this._options.articleId = r), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(pe({}, nav.objLoc, {
                        article_id: this.getArticleOwnerId() + "_" + this.getArticleId()
                    })), this._publishNameCandidate = s, e && (this._options.isPublished = !0, this.wasPublishedInCurrentSession = !0), this._options.monetizationAllowed = h, this._replaceVideos(n)), t && t(a, r, i, o)
                })
            }
            _replaceVideos() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    t = !1;
                try {
                    e.forEach(e => {
                        var a = W(e, 4),
                            r = a[0],
                            i = a[1],
                            s = a[2],
                            o = a[3];
                        this._ps.forEach((e, a) => {
                            if (e.type == p.ParagraphType.ObjectVideo) {
                                var n = W(e.mediaId.split("_"), 3),
                                    h = n[0],
                                    l = n[1];
                                n[2] || h != r || l != i || (e.mediaId = `${s}_${o}`, this._setParagraphDirty(a), t = !0)
                            }
                        })
                    })
                } catch (e) {}
                t && this._redrawModel()
            }
            focus() {
                this._restoreLastCursor()
            }
            focusLastParagraph() {
                Object(r.focusEl)(this._getParagraphElByIndex(this._ps.length - 1))
            }
            getArticleId() {
                return this._options.articleId
            }
            getArticleOwnerId() {
                return this._options.articleOwnerId
            }
            _getSaveDraftHash() {
                return this._options.saveDraftHash
            }
            _expandBlockquoteParagraphs(e) {
                for (var t, a = Array.prototype.slice.call(this._els.canvas.children); t = a.shift();)
                    if (Object(r.isQuoteEl)(t)) {
                        var i = t.tagName,
                            s = Array.prototype.slice.call(t.children),
                            o = s[0];
                        if (1 == s.length && o && o.tagName && inArray(o.tagName, ["H1", "H2", "H3"])) {
                            ye(t, o);
                            continue
                        }
                        if (s.shift(), s.length)
                            for (var n = void 0; n = s.shift();) {
                                if (this._saveCursorMarker(), e) ve(n, t);
                                else {
                                    var h = le(`<${i}></${i}>`);
                                    h.appendChild(n), ve(h, t)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }
            _ensureDummyParagraphs() {
                if (this._els.canvas) {
                    var e = this._els.canvas.lastChild;
                    if (e)
                        if (ue(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML || "H1" == e.tagName) {
                            var t = Object(r.buildParagraph)({});
                            this._els.canvas.appendChild(this._renderParagraph(t)), this._ps.push(t), this._updateTextPlaceholders()
                        }
                }
            }
            _ensureAtLeastOneParagraph() {
                0 == this._ps.length && (this._ps = [Object(r.buildParagraph)({
                    type: p.ParagraphType.Text
                })])
            }
            _ensureTitleParagraph() {
                if (!this._options.noTitle) {
                    var e = this._ps[0];
                    Object(r.isObjectParagraph)(e) && (this._ps[0] = Object(r.buildParagraph)({
                        type: p.ParagraphType.Header1
                    })), e.type = p.ParagraphType.Header1, e.lines[0].decorations = {}, e.lines[0].brs = [], delete e.sep
                }
                this._ps.forEach((e, t) => {
                    (this._options.noTitle || 0 != t) && (1 == t && e.type == p.ParagraphType.Header1 && (e.type = p.ParagraphType.Text), e.type == p.ParagraphType.Header1 && (e.type = p.ParagraphType.Header2))
                })
            }
            _insertParagraphAt(e, t) {
                this._ps.splice(e, 0, t)
            }
            _deleteParagraphFrom(e) {
                this._ps.splice(e, 1)
            }
            _focusParagraph(e, t) {
                Object(r.focusEl)(this._getParagraphElByIndex(e), t)
            }
            _init() {
                this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._initResizeTooltip()
            }
            _redrawModel() {
                this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
            }
            addObjectAudio() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0];
                this.getArticleOwnerId() < 0 && (Q.audioAttachOriginalOwnerId = this.getArticleOwnerId(), Q.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: (t, a, i, s) => {
                        Object(r.isParagraphEmpty)(this._ps[e]) || this._insertParagraphAt(e, Object(r.buildParagraph)());
                        var o = Object(r.buildParagraph)({
                            type: p.ParagraphType.ObjectAudio,
                            mediaId: i.fullId
                        });
                        c.add(p.ParagraphType.ObjectAudio, i.fullId, {
                            audio: s
                        }), this._getOrCreateParagraphObject(o), this._ps[e] = o, t.shiftKey || curBox().hide(), this._redrawModel();
                        var n = this._getParagraphElByIndex(e);
                        Object(r.focusEl)(n), this.saveUndoStateAndDraft(), e++
                    },
                    onPlaylistChoose: (t, a) => {
                        var i = a.getOwnerId() + "_" + a.getPlaylistId() + (a.getAccessHash() ? "_" + a.getAccessHash() : ""),
                            s = Object(r.buildParagraph)({
                                type: p.ParagraphType.ObjectAudioPlaylist,
                                mediaId: i
                            });
                        c.add(p.ParagraphType.ObjectAudioPlaylist, i, {
                            accessHash: a.getAccessHash()
                        }), this._getOrCreateParagraphObject(s), this._ps[e] = s, curBox().hide(), this._redrawModel();
                        var o = this._getParagraphElByIndex(e);
                        Object(r.focusEl)(o), this.saveUndoStateAndDraft()
                    }
                })
            }
            closeAllCarouselEditors() {
                this._ps.forEach(e => {
                    e.type == p.ParagraphType.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
                })
            }
            setMediaUploadMode(e) {
                this._isUploading = !!e, ge(this._els.editor, "article_ed__uploading", this._isUploading)
            }
            isMediaUploadMode() {
                return this._isUploading
            }
            addObjectVideo() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    a = Object(r.hasSeparator)(t);
                delete t.sep;
                showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId(),
                    blockPersonal: 1
                });
                Q.chooseMedia = (t, i, s, o, n) => {
                    var h = W(Object(p.getAppropriateImage)(s.editable.sizes, this.getWidth()), 1)[0],
                        l = Object(r.buildParagraph)({
                            type: p.ParagraphType.ObjectVideo,
                            mediaId: i,
                            sep: a
                        });
                    a = !1, c.add(p.ParagraphType.ObjectVideo, i, {
                        editable: s.editable,
                        thumb: h,
                        duration: s.editable.duration,
                        platform: s.editable.platform
                    }), this._getOrCreateParagraphObject(l), 0 == o ? this._ps[e] = l : this._ps.splice(e + o, 0, l), this._redrawModel(), this._saveUndoState();
                    var d = this._getParagraphElByIndex(e);
                    Object(r.focusEl)(d), !n && curBox() && curBox().hide(), this.saveDraft()
                }
            }
            addObjectDoc() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    a = Object(r.hasSeparator)(t);
                delete t.sep, Q.docsCurFilter = "gif";
                var i = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                Q.chooseMedia = (t, s, o) => {
                    i.hide();
                    var n = Object(r.buildParagraph)({
                        type: p.ParagraphType.ObjectGIF,
                        mediaId: s,
                        sep: a
                    });
                    a = !1, c.add(p.ParagraphType.ObjectGIF, s, {
                        video: o.video_preview,
                        size: o.video_preview_size,
                        href: o.href
                    }), this._getOrCreateParagraphObject(n), this._insertParagraphAt(e, n), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                }, Q.showMediaProgress = () => {}
            }
            addObjectPhoto() {
                var e, t, a = W(this._getCurrentParagraphIndex(), 1)[0],
                    i = this._getParagraph(a) || Object(r.buildParagraph)(),
                    s = showBox("al_photos.php", {
                        to_id: this.getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: 200,
                        article: 1
                    }, {
                        cache: 1,
                        stat: [jsc("web/photos.js"), "photos.css", "upload.js"],
                        dark: 1
                    });
                Q.onMediaUploadStarted = () => {
                    var t = Object(r.buildParagraph)({
                            type: p.ParagraphType.ObjectPhoto
                        }),
                        i = this._renderObjectParagraph(t, ""),
                        s = this._getParagraphElByIndex(a);
                    de(i, s), Object(r.focusEl)(s), e = i, this.setMediaUploadMode(!0)
                }, Q.onMediaUploadFail = () => {
                    delete Q.onMediaUploadStarted, e && he(e), this.setMediaUploadMode(!1)
                };
                var o = -1;
                Q.chooseMedia = (n, h, l, d) => {
                    void 0 === d ? o++ : o = intval(d), delete Q.onMediaUploadStarted, this.setMediaUploadMode(!1), e && he(e);
                    var _ = Object(r.buildParagraph)({
                        type: p.ParagraphType.ObjectPhoto,
                        mediaId: h,
                        sep: i.sep
                    });
                    return c.add(p.ParagraphType.ObjectPhoto, h, {
                        size: Object(r.getPhotoSize)(l.editable.sizes),
                        sizes: l.editable.sizes
                    }), this._getOrCreateParagraphObject(_), o ? this._ps.splice(a + o, 0, _) : this._ps[a] = _, void 0 === d && s.hide(), clearTimeout(t), t = setTimeout(() => {
                        this._redrawModel(), this._focusParagraph(a + o), this._updateTextPlaceholders(), this.saveUndoStateAndDraft()
                    }, 10), !1
                }, Q.showMediaProgress = () => {}
            }
            addSeparator() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0],
                    t = Object(r.hasSeparator)(this._getParagraph(e)),
                    a = Object(r.hasSeparator)(this._getParagraph(e + 1));
                !t && !a && e < this._ps.length - 1 && this._ps.splice(e, 1), this._getParagraph(e).sep = 1;
                var i = this._getCursor();
                this._redraw(!0), this._restoreCursor(i), this._updateTextPlaceholders()
            }
            addObjectPoll() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    a = Object(r.hasSeparator)(t);
                showBox("al_voting.php", {
                    act: "box",
                    owner_id: this.getArticleOwnerId(),
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                });
                Q.chooseMedia = (t, i) => {
                    if (t && i) {
                        var s = Object(r.buildParagraph)({
                            type: p.ParagraphType.ObjectPoll,
                            mediaId: t,
                            sep: a
                        });
                        c.add(p.ParagraphType.ObjectPoll, t, {
                            editable: !0,
                            snippet: i
                        }), a = !1, this._getOrCreateParagraphObject(s), this._insertParagraphAt(e, s), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                    }
                }
            }
            editObjectPoll(e) {
                var t = W(e.getMediaId().split("_"), 2),
                    a = t[0],
                    i = t[1],
                    s = W(this._getContainingParagraphEl(e.el()), 3),
                    o = s[1],
                    n = s[2],
                    h = Object(r.hasSeparator)(n);
                showBox("al_voting.php", {
                    act: "box",
                    voting_id: i,
                    owner_id: a,
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                });
                Q.chooseMedia = (t, a) => {
                    var i = e.getCaptionEl().innerHTML;
                    this._deleteParagraphFrom(o), this._forgetObject(n._uuid);
                    var s = Object(r.buildParagraph)({
                        type: p.ParagraphType.ObjectPoll,
                        mediaId: t,
                        sep: h
                    });
                    c.add(p.ParagraphType.ObjectPoll, t, {
                        editable: !0,
                        snippet: a
                    }), h = !1;
                    var l = this._getOrCreateParagraphObject(s);
                    this._insertParagraphAt(o, s), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders(), l.setCaptionElHtml(i)
                }
            }
            onObjectStateLoaded() {
                this.saveDraft(), this._showObjectPicker()
            }
            _hideObjectPicker() {
                this._objectPickerTooltip && this._objectPickerTooltip.hide()
            }
            _showObjectPicker() {
                if (!this.isLocked()) {
                    if (!this._objectPickerEl) {
                        this._objectPickerEl = le('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var e = "";
                        Object(K.partConfigEnabled)("article_poll") && (e = '<button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_poll" onclick="cur.articleEditor.addObjectPoll()"></button>');
                        var t = le(`<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()"></button>\n        ${e}\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>`);
                        this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                            content: t,
                            forceSide: "right",
                            cls: "article_editor_object_picker_tt",
                            autoShow: !1,
                            elClassWhenShown: "article_editor_object_picker_tt_shown",
                            offset: [2, 0]
                        }), this._objectPickerEl.addEventListener("mousedown", e => cancelEvent(e))
                    }
                    var a = W(this._getCurrentParagraphIndex(), 2),
                        i = a[0],
                        s = a[1];
                    if (!this.isMediaUploadMode() && !1 !== i && i == s && Object(r.isParagraphEmpty)(this._ps[i], !0) && this._ps[i] && inArray(this._ps[i].type, [p.ParagraphType.Text, p.ParagraphType.Header2, p.ParagraphType.Header3])) {
                        show(this._objectPickerEl);
                        var o = this._getParagraphElByIndex(i),
                            n = ne(this._els.editor),
                            h = ne(o)[1] - n[1],
                            l = !1;
                        this._uploadFloatList(), this._floatedObjects.forEach(e => {
                            e.startY <= h + 15 && e.endY + 30 >= h && (l = !0)
                        }), setStyle(this._objectPickerEl, {
                            left: l ? 355 : -40,
                            top: h
                        })
                    } else hide(this._objectPickerEl)
                }
            }
            _initLinksHrefTooltip() {
                this._els.canvas.addEventListener("mouseover", e => {
                    if ("a" == e.target.tagName.toLowerCase()) {
                        if (this._linkTooltip && this._linkTooltip.destroy(), this._formatTooltip && this._formatTooltip.isShown()) return;
                        var t = e.target,
                            a = t.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                            i = Object(r.decodeURL)(a);
                        Object(r.isVKUrl)(a) || (a = "/away.php?to=" + encodeURIComponent(a) + "&utf=1"), this._linkTooltip = new ElementTooltip(t, {
                            cls: "article_editor_link_show_tt",
                            appendTo: this._els.editor,
                            content: le(`<a target="_blank" rel="noopener" href="${a}" class="article_editor_link">${i}</a>`)
                        })
                    }
                })
            }
            _isTrackedObjectEl(e) {
                var t = ie(e, "uuid");
                return !!t && !!this._getObject(t)
            }
            _cloneObjectParagraphs() {
                for (var e, t = Array.prototype.slice.call(this._els.canvas.children), a = {}; e = t.shift();)
                    if (Object(r.isObjectParagraphEl)(e)) {
                        var i = e.getAttribute("data-uuid"),
                            s = parseInt(e.getAttribute("data-type"));
                        if (a[i]) {
                            var o = this._getObject(i);
                            i = ke(), this._getOrCreateParagraphObject({
                                type: s,
                                _uuid: i,
                                mediaId: o.getMediaId()
                            }), ie(e, "uuid", i)
                        }
                        a[i] = !0
                    }
            }
            _correctCursorToBeWithinCanvas() {
                var e = W(Object(r.getRange)(), 2),
                    t = e[0];
                e[1] && t.startContainer == this._els.canvas && this._focusParagraph(0)
            }
            _triggerInputEvent() {
                this._els.canvas.dispatchEvent(new Event("input"))
            }
            getCursor() {
                return this._getCursor()
            }
            _getCursor() {
                var e = this._els.canvas,
                    t = W(Object(r.getRange)(), 2),
                    a = t[0],
                    i = t[1];
                if (!a) return !1;
                var s = {
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

                function o(t, a, i) {
                    a.nodeType == Node.TEXT_NODE ? t.textOffset = i : t.nodeOffset = i, _e(a, a => {
                        if (a == e) return !0;
                        Object(r.isQuoteEl)(a) && a.firstChild && a.firstChild.nodeType == Node.ELEMENT_NODE && "p" == a.firstChild.tagName.toLowerCase() && t.path.pop(), t.path.push(Object(r.childNodeIndex)(a))
                    }, 10), t.path = t.path.slice().reverse()
                }
                return o(s.start, a.startContainer, a.startOffset), i ? delete s.end : o(s.end, a.endContainer, a.endOffset), s.isEmpty = () => !s.end && 0 == s.start.nodeOffset && 0 == s.start.path.length && 0 == s.start.path[0], s
            }
            restoreCursor(e) {
                this._restoreCursor(e)
            }
            _restoreCursor(e) {
                if (!e) return this._restoreCursorFromMarker();
                var t = this._els.canvas;

                function a(e) {
                    var a = t,
                        i = 0;
                    return e.path.forEach((t, i) => {
                        if (Object(r.isQuoteEl)(a)) {
                            var s = a.firstChild;
                            s && 1 == i && s.nodeType == Node.ELEMENT_NODE && "p" == s.tagName.toLowerCase() && (a = s)
                        }
                        t = Math.min(a.childNodes.length - 1, t);
                        var o = a.childNodes[t];
                        if (!o) return e.nodeOffset = 0, !1;
                        a = o
                    }), i = a.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(a.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && a && a.children && (i = Math.min(e.nodeOffset, a.childNodes.length)), [a, i]
                }
                var i = document.createRange();
                try {
                    var s = W(a(e.start), 2),
                        o = s[0],
                        n = s[1];
                    if (Object(r.isBR)(o) && 0 == n) {
                        var h = domPN(o);
                        Object(r.isParagraphEl)(h) && 1 == h.childNodes.length && (o = h)
                    }
                    if (i.setStart(o, n), e.end) {
                        var l = W(a(e.end), 2),
                            d = l[0],
                            c = l[1];
                        i.setEnd(d, c)
                    }
                    window.getSelection().setBaseAndExtent(i.startContainer, i.startOffset, i.endContainer, i.endOffset)
                } catch (e) {
                    debugLog(e)
                }
            }
            _saveLastCursor() {
                var e = this._getCursor(),
                    t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                e && !e.isEmpty() ? ls.set(t, JSON.stringify(e)) : ls.remove(t), this._lastCursor = e
            }
            _restoreLastCursor() {
                var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                e ? (e = JSON.parse(e), this._restoreCursor(e)) : Object(r.focusEl)(this._els.canvas.firstChild)
            }
            _toggleCodeBlocks() {
                for (var e, t = W(this._getCurrentParagraphIndex(), 2), a = t[0], r = t[1], i = a; i <= r; i++) void 0 === e && (e = this._ps[i].type != p.ParagraphType.Code), this._ps[i].type = e ? p.ParagraphType.Code : p.ParagraphType.Text;
                var s = this._getCursor();
                this._redraw(!0), this._restoreCursor(s), this._updateTextPlaceholders()
            }
            _removeExtraSeparators() {
                for (var e, t = this._els.canvas.children, a = 0; a < t.length; a++) {
                    var r = t[a],
                        i = ie(r, "sep");
                    i && (void 0 !== e && i == e && ie(r, "sep", null), e = i)
                }
            }
            _replaceAlienInlineTags() {
                var e = !1,
                    t = {
                        b: "strong",
                        i: "em"
                    };
                return function a(r) {
                    var i = r.tagName.toLowerCase();
                    if (t[i]) {
                        e || (this._saveCursorMarker(), e = !0);
                        var s = ce(t[i], {
                            innerHTML: r.innerHTML
                        });
                        ye(r, s)
                    } else
                        for (var o, n = Array.prototype.slice.call(r.childNodes); o = n.shift();) o.nodeType == Node.ELEMENT_NODE && a.call(this, o)
                }.call(this, this._els.canvas), e && this._restoreCursorFromMarker(), e
            }
            _cleanParagraphsBRs() {
                this._ps.forEach(e => {
                    e.lines.forEach(r.cleanLineBRs)
                })
            }
            _initEvents() {
                if (!this.isLocked()) {
                    this._setEventListener(window, "scroll", () => {
                        var e = scrollGetY(),
                            t = window.innerHeight;
                        this._ps.forEach((a, i) => {
                            if (Object(r.isObjectParagraph)(a)) {
                                var s = this._getParagraphElByIndex(i),
                                    o = oe(s),
                                    n = ne(s),
                                    h = n[1] < e + t && n[1] + o[1] > e;
                                a._object.onViewport && a._object.onViewport(h)
                            }
                        })
                    });
                    var e, t = 0;
                    this._setEventListener(document, "selectionchange", () => {
                        var a = W(Object(r.getRange)(), 2),
                            i = a[0],
                            o = a[1];
                        if (i && !_e(i.commonAncestorContainer, e => e == this._els.canvas)) return void this._showObjectPicker();
                        var n = W(this._getCurrentParagraphIndex(), 1)[0];
                        if (!1 !== n) {
                            if (!o && ae(i.startContainer, "article")) {
                                var h = this._ps[t];
                                if (Object(r.isObjectParagraph)(h)) return void Object(r.focusEl)(h._object.getCaptionEl())
                            }
                            var l = i.startContainer;
                            if (V.msie && o && be("article_ed__extra_controls", l) && "BUTTON" != l.tagName) {
                                var d = this._ps[n];
                                if (Object(r.isObjectParagraph)(d)) return void d._object.getCaptionEl().focus()
                            }
                            t = n, this._highlightObjectsInCurrentSelection(), this._showObjectPicker(), this._correctCaptionSelection(), this._ensureDummyParagraphs(), 0 == s && this._showFormatTooltip(), this._saveLastCursor();
                            var c = this._getParagraph(n);
                            Object(r.isObjectParagraph)(c) && p.ResizableObjectTypes.includes(parseInt(c.type)) ? this._resizeTooltip && (clearTimeout(e), e = setTimeout(() => {
                                this._showResizeTooltip()
                            }, 100)) : this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()
                        } else this._showObjectPicker()
                    });
                    var a = !1,
                        i = !1,
                        s = !1;
                    this._els.canvas.addEventListener("mousedown", () => {
                        var e;
                        s = !0, this._setEventListener(window, "mouseup", e = t => {
                            s = !1, "article_format_btn_link" == t.target.id || (this._showFormatTooltip(), e && window.removeEventListener("mouseup", e))
                        })
                    }), this._els.canvas.addEventListener("selectstart", () => {
                        this._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", e => {
                        var t = W(Object(r.getRange)(), 2),
                            a = t[0];
                        if (t[1]) {
                            var i = W(this._getContainingParagraphEl(a.commonAncestorContainer), 1)[0];
                            Object(r.isObjectParagraphEl)(i) && (e.clipboardData.setData("text/plain", "uuid:" + i.getAttribute("data-uuid")), e.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", e => {
                        var t = W(this._getCurrentParagraphIndex(), 1)[0];
                        t && (this._handleObjectPaste(e), this._handleLinkPaste(e), this._handlePhotoPaste(e), this._fromPasteEvent = !0, this._pasteCurrentIndex = t)
                    }), this._els.canvas.addEventListener("click", e => {
                        if (e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName) return cancelEvent(e)
                    });
                    var o = !1;
                    this._els.canvas.addEventListener("input", () => {
                        this._hideObjectPicker(), this._expandBlockquoteParagraphs(l), this._removeExtraSeparators();
                        var e, t = this._replaceAlienInlineTags();
                        V.safari || this._els.canvas.normalize(), this._fromPasteEvent || t || this._markerCursorSet ? this._saveCursorMarker() : e = this._getCursor(), this._processAlienPhotos(), this._flattenAlienParagraphs(), this._cloneObjectParagraphs(), this._ps.length > 0 && this._els.canvas.children.length !== this._ps.length && this._setAllParagraphsDirty(), this._dirty.forEach(this._updateLineData.bind(this)), o && (this._cleanParagraphsBRs(), o = !1), this._ensureAtLeastOneParagraph(), this._ensureTitleParagraph();
                        var r = !1;
                        if (this._fromPasteEvent) try {
                            r = this._expandDoubleBRs()
                        } catch (e) {
                            console.error(e)
                        }
                        this._redraw(r), this._restoreCursor(e), this._correctCursorToBeWithinCanvas(), this._dirty = [], i ? this._saveUndoStateDelayed() : this._saveUndoState(), a = i = !1, this._fromPasteEvent = !1, this._updateTextPlaceholders(), this.saveDraft(), this._undoable = !0, this._options.onUndoRedo && this._options.onUndoRedo()
                    });
                    var n, h = !1,
                        l = !1,
                        d = 1;
                    this._els.canvas.addEventListener("keydown", e => {
                        var t = e.keyCode,
                            s = e.metaKey || e.ctrlKey,
                            c = e.shiftKey,
                            _ = W(Object(r.getRange)(), 2),
                            g = _[0],
                            u = _[1];
                        if (g) {
                            var v = W(this._getCurrentParagraphIndex(), 2),
                                b = v[0],
                                f = v[1],
                                y = this._getParagraph(b),
                                m = !1;
                            if (Object(r.isObjectParagraph)(y))
                                if (y._object.isCaptionFocused()) m = 0 == g.startOffset && u;
                                else m = W(this._getContainingParagraphEl(g.startContainer), 1)[0] == y._object.el();
                            if (m && u && V.mozilla) {
                                if (t == Oe.Up) return this._focusParagraph(b - 1, !0), cancelEvent(e);
                                if (t == Oe.Down) return this._focusParagraph(b + 1, !0), cancelEvent(e)
                            }
                            if ((t == Oe.Delete || t == Oe.Backspace) && this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide(), t == Oe.Tab && u && 0 == b) return Object(r.focusEl)(this._getParagraphElByIndex(1)), cancelEvent(e);
                            if (s && t == Oe.KeyA && Object(r.isObjectParagraph)(y) && y._object.isCaptionFocused()) {
                                var P = y._object.getCaptionEl();
                                return Object(r.selectEl)(P), cancelEvent(e)
                            }
                            if (s) switch (t) {
                                case Oe.KeyB:
                                    return this._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(e);
                                case Oe.KeyI:
                                    return this._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(e);
                                case Oe.KeyS:
                                    return this.saveDraft(!1, !1, !0), cancelEvent(e);
                                case Oe.KeyZ:
                                    return c ? this.redo() : this.undo(), cancelEvent(e);
                                case Oe.KeyY:
                                    return this.redo(), cancelEvent(e)
                            }
                            var E = t == Oe.KeyC && e.altKey,
                                j = y ? y.type : p.ParagraphType.Text,
                                O = Object($.gpeByTag)("pre", g.startContainer),
                                C = !!(O || Object($.gpeByTag)("pre", g.endContainer) || g.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == g.startContainer.tagName);
                            if (E) {
                                if (j === p.ParagraphType.Header1) return cancelEvent(e);
                                if (u) return this._toggleCodeBlocks(), cancelEvent(e);
                                if (!C && inArray(j, [p.ParagraphType.Text, p.ParagraphType.NumericList, p.ParagraphType.BulletList])) {
                                    this._setCurrentParagraphDirty();
                                    var T = Object($.gpeByTag)("code", g.startContainer) || Object($.gpeByTag)("code", g.endContainer);
                                    if (T) {
                                        this._saveCursorMarker();
                                        var x = le("<span></span>");
                                        x.innerHTML = T.innerHTML, ye(T, x), this._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), V.msie && this._triggerInputEvent();
                                    return cancelEvent(e)
                                }
                            }
                            if (t == Oe.Tab && C && j == p.ParagraphType.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(e);
                            var I = !1;
                            if (t == Oe.Backspace) {
                                if (h) return h[0].textContent = h[1], this._restoreCursor(h[2]), h = !1, cancelEvent(e);
                                if (m) {
                                    var S = this._getParagraphElByIndex(b),
                                        k = Object(r.createParagraphEl)("", Object(r.hasSeparator)(y));
                                    return this._correctEmptyParagraphAfterFloatObjects(), ye(S, k), Object(r.focusEl)(k), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                }
                                if (g && 0 == g.startOffset && g.collapsed) {
                                    var L = Object($.gpeByTag)("li", g.startContainer),
                                        A = Object(r.getElementIndex)(L);
                                    if (L) {
                                        var M = this._ps[b],
                                            D = clone(M),
                                            N = clone(M);
                                        D.lines = D.lines.slice(0, A);
                                        var B = Object(r.buildParagraph)({
                                            lines: [clone(M.lines[A])]
                                        });
                                        N.lines = N.lines.slice(A + 1), this._ps.splice(b, 1, D, B, N), this._redraw(!0);
                                        var R = this._getParagraphElByIndex(b + 1);
                                        return Object(r.focusEl)(R), this._saveUndoState(), cancelEvent(e)
                                    }
                                }
                                if (g && u && 0 == g.startOffset && "LI" !== g.startContainer.nodeName) {
                                    var H = W(this._getCurrentParagraphIndex(), 1)[0],
                                        z = H > 0 && this._ps[H - 1];
                                    if (Object(r.isObjectParagraph)(z)) {
                                        Object(r.isParagraphEmpty)(this._ps[H]) && (this._ps.splice(H, 1), this._redraw(!0));
                                        var U = this._getParagraphElByIndex(H - 1);
                                        return Object(r.focusEl)(U), cancelEvent(e)
                                    }
                                }
                                this._setAllParagraphsDirty(), V.msie && setTimeout(() => {
                                    this._triggerInputEvent()
                                })
                            }
                            if (t == Oe.Delete) {
                                var F = this._ps[b],
                                    K = this._ps[b + 1],
                                    G = W(getCaretCharacterOffsetWithin(g.startContainer), 1)[0],
                                    Q = g.startContainer.textContent.length == G;
                                if (m)
                                    if (!(F._object.isCaptionFocused() && !!F.lines[0].text)) {
                                        var J = this._getParagraphElByIndex(b),
                                            X = Object(r.createParagraphEl)();
                                        return ye(J, X), Object(r.focusEl)(X), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                    }
                                if (u && Object(r.hasSeparator)(K) && Q) return this._setParagraphDirty(b + 1), delete K.sep, this._redraw(!1, !0), cancelEvent(e);
                                if (u && Q && Object(r.isObjectParagraph)(K)) return Object(r.isParagraphEmpty)(F) && F.type != p.ParagraphType.Header1 && (this._ps.splice(b, 1), this._redraw(!0, !0)), Object(r.focusEl)(K._object.getCaptionEl()), cancelEvent(e);
                                K && Object(r.isParagraphEmpty)(F) && inArray(K.type, [p.ParagraphType.Header2, p.ParagraphType.Header3]) && (F.type = K.type, this._setParagraphDirty(b), this._redraw()), this._setAllParagraphsDirty(), (V.msie && 0 == g.startOffset && 0 == b || c) && setTimeout(() => {
                                    this._setCurrentParagraphDirty(), this._triggerInputEvent()
                                })
                            } else if (t == Oe.Enter) {
                                if (C && O && j == p.ParagraphType.Code && u) {
                                    var q = O.textContent.search(/[^\s]/);
                                    return -1 == q && (q = O.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(q)), cancelEvent(e)
                                }
                                if (this._isWithinObjectParagraphEl(Object(r.getFocusedElement)())) {
                                    var Z = W(this._getContainingParagraphEl(Object(r.getFocusedElement)()), 2),
                                        ee = Z[0],
                                        ae = Z[1],
                                        re = Object(r.createParagraphEl)(),
                                        ie = this._ps[ae]._object;
                                    return !ie.isCaptioned() || ie.isCaptionFocused() ? ve(re, ee) : de(re, ee), this._setAllParagraphsDirty(), Object(r.focusEl)(re), this._triggerInputEvent(), cancelEvent(e)
                                }
                                var se = W(this._getContainingParagraphEl(Object(r.getFocusedElement)()), 3),
                                    oe = se[0],
                                    ne = (se[1], se[2]),
                                    he = W(getCaretCharacterOffsetWithin(oe), 2)[1];
                                if (e.shiftKey || e.ctrlKey && V.safari) {
                                    var ce = W(getCaretCharacterOffsetWithin(oe), 2)[1],
                                        _e = te("li", g.startContainer),
                                        pe = 0;
                                    _e && (pe = Ee(_e));
                                    var ge = !1;
                                    if (Y(ne.lines, (e, t) => {
                                            var a = t.brs,
                                                r = t.text.length;
                                            return 0 == ce || ce <= r && inArray(ce, a) ? (ge = !0, !1) : !((ce -= r) <= 0 && e == pe) && void 0
                                        }), ge) {
                                        o = !0, this._setParagraphDirty(b, f), document.execCommand("insertParagraph");
                                        var ue = je(oe);
                                        return ue && (Object(r.focusEl)(ue), ue.focus()), this._triggerInputEvent(), cancelEvent(e)
                                    }
                                    V.msie && 0 == ce && g.insertNode(le("<br>"))
                                }
                                var be = u && g.startContainer.nodeType == Node.TEXT_NODE && !g.startContainer.nextSibling && he == oe.textContent.length;
                                l = be && !Object(r.isListParagraph)(this._ps[b]) && !e.shiftKey && inArray(ne.type, [p.ParagraphType.Quote, p.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(this._triggerInputEvent.bind(this)), this._setParagraphDirty(b, f)
                            } else e.key && 1 == e.key.length ? (this._setParagraphDirty(b), this._setParagraphDirty(f), e.metaKey || (I = !0, e.key && (Object(r.isCyrillicChar)(e.key) ? d += 1 : Object(r.isLatinChar)(e.key) && (d -= 1), d = Math.min(Math.max(d, -5), 5))), a = Object(r.isWhiteSpaceChar)(e.key), I && !a && (i = !0), setTimeout(() => {
                                var e = W(Object(r.getRange)(), 2),
                                    t = e[0],
                                    a = e[1],
                                    i = this._getParagraph(b);
                                if (i && (i.type != p.ParagraphType.Code && !!!(Object($.gpeByTag)("code", t.startContainer) || t.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == t.startContainer.tagName) && (n = n || d > 0, a && t))) {
                                    var s = t.startContainer;
                                    if (s.nodeType == Node.TEXT_NODE && t.startOffset > 0)
                                        for (var o = s.textContent.substring(t.startOffset - 5, t.startOffset), l = 0, c = w.length; l < c; l++) {
                                            var _ = w[l];
                                            if (void 0 === _.cyrillic || _.cyrillic === n)
                                                if (_.pattern instanceof RegExp) {
                                                    var g = o.match(_.pattern);
                                                    if (g) {
                                                        var u = _.substitution;
                                                        g.length > 1 && (u = u.replace("$1", g[1])), v.call(this, t.startOffset, s, g[0], u, _.noUndo);
                                                        break
                                                    }
                                                } else if (o.endsWith(_.pattern)) {
                                                v.call(this, t.startOffset, s, _.pattern, _.substitution, _.noUndo);
                                                break
                                            }
                                        }
                                }

                                function v(e, t, a, r, i) {
                                    var s = this._getCursor(),
                                        o = t.textContent.substring(0, e - a.length),
                                        n = t.textContent.substring(e);
                                    i || (h = [t, o + a + n, s]), t.textContent = o + r + n, this._restoreCursor(s), this._setParagraphDirty(b), this._triggerInputEvent()
                                }
                            }, 0)) : !1;
                            h = !1
                        }
                    }), this._setEventListener(window, "resize", () => {
                        this._resizeTooltip && this._resizeTooltip.isShown() && this._updatePositionResizeTooltip()
                    })
                }
            }
            _isParagraphEl(e) {
                return e && ae(e, r.ArticleEditorParagraphClass)
            }
            _isWithinObjectParagraphEl(e) {
                var t = W(this._getContainingParagraphEl(e), 1)[0];
                return t && Object(r.isObjectParagraphEl)(t)
            }
            _highlightObjectsInCurrentSelection() {
                var e = W(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    a = e[1];
                !1 !== t && !1 !== a && this._ps.forEach((e, r) => {
                    if (e._object) {
                        var i = t != a;
                        e._object.highlight(r >= t && r <= a, i)
                    }
                })
            }
            _getOrCreateParagraphObject(e) {
                e._uuid || (e._uuid = ke());
                var t = this._getObject(e._uuid);
                if (!t) {
                    var a = e.mediaId || "";
                    switch (parseInt(e.type)) {
                        case p.ParagraphType.ObjectPhoto:
                            t = new m(a, this, e);
                            break;
                        case p.ParagraphType.ObjectVideo:
                            t = new P(a, this);
                            break;
                        case p.ParagraphType.ObjectGIF:
                            t = new E(a, this);
                            break;
                        case p.ParagraphType.ObjectAudio:
                            t = new C(a, this);
                            break;
                        case p.ParagraphType.ObjectAudioPlaylist:
                            t = new u(a, this);
                            break;
                        case p.ParagraphType.ObjectPodcast:
                            t = new O(a, this);
                            break;
                        case p.ParagraphType.ObjectTwitter:
                            t = new k(a, this);
                            break;
                        case p.ParagraphType.ObjectInstagram:
                            t = new M(a, this);
                            break;
                        case p.ParagraphType.ObjectFacebook:
                            t = new A(a, this);
                            break;
                        case p.ParagraphType.ObjectVK:
                            t = new N(a, this);
                            break;
                        case p.ParagraphType.ObjectTelegram:
                            t = new R(a, this);
                            break;
                        case p.ParagraphType.ObjectPoll:
                            t = new z(a, this)
                    }
                    this._setObject(e._uuid, t)
                }
                return e._object = t, t
            }
            _forgetObject(e) {
                delete this._objects[e]
            }
            _getObject(e) {
                return this._objects[e] || null
            }
            _setObject(e, t) {
                return this._objects[e] = t
            }
            _updateLineData(e) {
                var t = this._getParagraphElByIndex(e);
                if (t) {
                    if (this._isWithinObjectParagraphEl(t)) {
                        var a = W(Object(r.paragraphElProperties)(t), 3),
                            i = a[0],
                            s = a[1],
                            o = a[2],
                            n = this._getObject(s);
                        if (!n) return;
                        var h = Object(r.buildParagraph)();
                        if (n.getCaptionEl()) {
                            var l = this._getParagraphFromHTML("", n.getCaptionEl().innerHTML, !0);
                            if (i == p.ParagraphType.ObjectPhoto) {
                                var d = ie(n.el(), "paragraph-lines");
                                d && (h.lines = JSON.parse(d));
                                var c = n.getImageIndex();
                                h.lines[c] = l.lines[0];
                                for (var _ = 0; _ < h.lines.length; _++) h.lines[_] = h.lines[_] || {
                                    text: "",
                                    decorations: {}
                                }
                            } else h.lines[0] = l.lines[0]
                        }
                        h.type = i, h.mode = o, h._uuid = s, h._object = n, this._ps[e] = h
                    } else if (t.nodeType == Node.ELEMENT_NODE) {
                        var g = t.tagName.toLowerCase();
                        this._ps[e] = this._getParagraphFromHTML(g, t.innerHTML)
                    } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent);
                    t.nodeType == Node.ELEMENT_NODE && ie(t, "sep") && (this._ps[e].sep = !0)
                }
            }
            onDragEnd() {
                this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
            }
            getCurrentParagraphs() {
                var e = W(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    a = e[1];
                return [this._getParagraphElByIndex(t), this._getParagraphElByIndex(a)]
            }
            _initObjectDrag() {
                var e, t, a, i, s, o = !1,
                    n = this._els;

                function h(e) {
                    s != e && (Y(geByClass("article_ed__drag_hovered"), (e, t) => {
                        ee(t, "article_ed__drag_hovered")
                    }), e && J(e, "article_ed__drag_hovered"), s = e)
                }

                function l() {
                    window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t), o = !1, ee(n.canvas, "no_select"), clearInterval(i), h(!1), he(a), a = !1
                }
                this._els.canvas.addEventListener("mousedown", s => {
                    if (a && he(a), 2 == s.button) return l(), cancelEvent(s);
                    var n = oe(this._els.canvas)[1];
                    ee(this._els.canvas, "no_select"), h(!1);
                    var d = W(this._getContainingParagraphEl(s.target), 3),
                        c = d[0],
                        _ = d[1],
                        p = d[2];
                    if (Object(r.isObjectParagraph)(p)) {
                        var g, u, v, b, f, y = s.pageY;
                        window.addEventListener("mousemove", e = e => {
                            if (a || !(Math.abs(y - e.pageY) < 10)) {
                                a || (a = le('<div class="article_ed__drag_shadow"></div>'), this._els.editor.appendChild(a), (g = ne(this._els.canvas))[1] -= scrollGetY(), u = oe(c), v = ne(c), b = e.pageX - v[0], f = e.pageY - v[1] + this._options.layer.scrollTop, setStyle(a, {
                                    width: u[0],
                                    height: u[1]
                                }), this._focusParagraph(_)), J(this._els.canvas, "no_select"), g || l(), setStyle(a, {
                                    left: e.pageX - g[0] - b,
                                    top: e.pageY - scrollGetY() - f - g[1] + this._options.layer.scrollTop
                                }), clearInterval(i), e.pageY - scrollGetY() < 200 ? i = setInterval(() => {
                                    this._options.layer.scrollTop -= 10
                                }, 10) : e.pageY - scrollGetY() > window.innerHeight - 200 && (i = setInterval(() => {
                                    this._options.layer.scrollTop + window.innerHeight > n + 300 ? clearInterval(i) : this._options.layer.scrollTop += 10
                                }, 10));
                                var t = W(this._getContainingParagraphEl(e.target), 2),
                                    r = t[0],
                                    s = t[1];
                                r && r != c && r != Object($.domPS)(c) ? (h(r), o = s) : (h(!1), o = !1)
                            }
                        }), window.addEventListener("mouseup", t = () => {
                            !1 !== o && _ && (this._ps.splice(_, 1), Object(r.hasSeparator)(p) && (this._ps[_].sep = 1, delete p.sep), this._ps.splice(o + 1, 0, p), this._redraw(!0, !0), this.saveUndoStateAndDraft(), this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()), l()
                        })
                    }
                })
            }
            isLocked() {
                return !!this.getOptions().editLockMessage
            }
            showEditLockInfo() {
                this.isLocked() ? (this.showWarningInfo(this.getOptions().editLockMessage), this._els.canvas.removeAttribute("contenteditable"), hide(this._objectPickerEl), this._hideObjectPicker(), this._hideFormatTooltip()) : this.showWarningInfo(!1)
            }
            showRevEditInfo() {
                nav.objLoc.from_rev && this.showWarningInfo(getLang("pages_article_rev_edit"))
            }
            showWarningInfo(e) {
                var t = q("article_ed__warn_info", this._els.editor);
                t && !e && (ee(this._els.editor, "article_ed__warn_shown"), he(t)), t || e && (t = le(`<div class="article_ed__warn_info">${e}</div>`), this._els.editor.appendChild(t), J(this._els.editor, "article_ed__warn_shown"))
            }
            _initResizeTooltip() {
                var e = le('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
                this._resizeTooltip = new ElementTooltip(this._els.editor.parentNode, {
                    content: e,
                    autoShow: !1,
                    customShow: !0,
                    forceSide: "top",
                    cls: "resize-tooltip article_format_tt"
                }), e.addEventListener("click", e => {
                    if (e.target.classList.contains("article_format_btn")) {
                        var t = parseInt(e.target.dataset.mode);
                        this.setModeCurrentObject(t)
                    }
                })
            }
            _showResizeTooltip() {
                var e = W(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraphElByIndex(e),
                    a = this._getParagraph(e),
                    r = intval(a.type);
                if (p.ResizableObjectTypes.includes(r))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), ae(t, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else if (a._object.isLoading()) this._resizeTooltip.hide();
                else {
                    var i = [{
                            id: p.ObjectResizeType.Float,
                            type: "inline"
                        }, {
                            id: p.ObjectResizeType.Normal,
                            type: "text"
                        }, {
                            id: p.ObjectResizeType.Medium,
                            type: "bigger"
                        }, {
                            id: p.ObjectResizeType.Large,
                            type: "cover"
                        }],
                        s = q("resize-tooltip__btns"),
                        o = [1, 1, 1, 1];
                    switch (r) {
                        case p.ParagraphType.ObjectPhoto:
                            a._object._isCarousel() ? o = [0, 1, 1, 0] : a._object._isSmallPhotoSize() || (o = [1, 1, 0, 0]);
                            break;
                        case p.ParagraphType.ObjectGIF:
                            a._object._isSmallGifSize() || (o = [1, 1, 0, 0]);
                            break;
                        case p.ParagraphType.ObjectTwitter:
                        case p.ParagraphType.ObjectFacebook:
                        case p.ParagraphType.ObjectInstagram:
                        case p.ParagraphType.ObjectVK:
                        case p.ParagraphType.ObjectTelegram:
                            o = [1, 1, 0, 0]
                    }
                    s.innerHTML = "", i.forEach((e, t) => {
                        o[t] && s.appendChild(le(`\n          <button class="article_format_btn${a.mode==e.id||!a.mode&&!e.id?" article_format_btn_active":""}" id="article_format_btn_${e.type}"  data-mode=${e.id} ></button>\n        `))
                    }), this._updatePositionResizeTooltip()
                }
            }
            _updatePositionResizeTooltip() {
                var e = this._resizeTooltip,
                    t = W(ne(this._els.editor), 2)[1],
                    a = W(this._getCurrentParagraphIndex(), 1)[0],
                    r = this._getParagraphElByIndex(a).getBoundingClientRect(),
                    i = r.top,
                    s = r.left,
                    o = r.width,
                    n = oe(e._ttel)[0] / 2;
                setStyle(e._ttel, {
                    top: i - t - 60 + window.scrollY + 140,
                    left: s + o / 2 - n
                })
            }
            setModeObject(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p.ObjectResizeType.Normal,
                    a = this._getParagraph(e);
                Object(r.isObjectParagraph)(a) && (a.mode = t, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
            }
            setModeCurrentObject() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p.ObjectResizeType.Normal,
                    t = W(this._getCurrentParagraphIndex(), 1)[0];
                this.setModeObject(t, e)
            }
            _uploadFloatList() {
                var e = ne(this._els.editor);
                this._floatedObjects = [], this._ps.forEach((t, a) => {
                    if (t.mode && parseInt(t.mode) === p.ObjectResizeType.Float) {
                        var r = this._getParagraphElByIndex(a),
                            i = r.getBoundingClientRect().height,
                            s = ne(r);
                        this._floatedObjects.push({
                            startY: s[1] - e[1],
                            endY: s[1] - e[1] + i
                        })
                    }
                })
            }
            _correctEmptyParagraphAfterFloatObjects() {
                for (var e = 0; e < this._ps.length; e++) {
                    var t = this._ps[e],
                        a = this._ps[e + 1];
                    if (Object(r.isObjectResize)(t) >= 0)
                        if (1 === parseInt(t.mode) && Object(r.isObjectParagraph)(a)) {
                            var i = Object(r.buildParagraph)();
                            i._autoInsert = !0, this._insertParagraphAt(e + 1, i)
                        } else 1 !== parseInt(t.mode) && a && a._autoInsert && this._deleteParagraphFrom(e + 1)
                }
            }
        }, stManager.done(jsc("web/article.js"))
    }
});