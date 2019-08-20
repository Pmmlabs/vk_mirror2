! function(e) {
    function t(t) {
        for (var r, o, n = t[0], l = t[1], d = t[2], c = 0, _ = []; c < n.length; c++) o = n[c], a[o] && _.push(a[o][0]), a[o] = 0;
        for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (e[r] = l[r]);
        for (h && h(t); _.length;) _.shift()();
        return s.push.apply(s, d || []), i()
    }

    function i() {
        for (var e, t = 0; t < s.length; t++) {
            for (var i = s[t], r = !0, n = 1; n < i.length; n++) {
                var l = i[n];
                0 !== a[l] && (r = !1)
            }
            r && (s.splice(t--, 1), e = o(o.s = i[0]))
        }
        return e
    }
    var r = {},
        a = {
            "web/article": 0
        },
        s = [];

    function o(t) {
        if (r[t]) return r[t].exports;
        var i = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = r, o.d = function(e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
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
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) o.d(i, r, function(t) {
                return e[t]
            }.bind(null, r));
        return i
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
        l = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var d = 0; d < n.length; d++) t(n[d]);
    var h = l;
    s.push([67, "bundles/common", "bundles/6deb4edfcbfb465064078145a4a266bf"]), i()
}({
    67: function(e, t, i) {
        e.exports = i("f68Q")
    },
    FEjr: function(e, t, i) {
        "use strict";
        i("OGtf")("strike", function(e) {
            return function() {
                return e(this, "strike", "", "")
            }
        })
    },
    f68Q: function(e, t, i) {
        "use strict";
        i.r(t);
        i("rE2o"), i("ioFf"), i("Oyvg"), i("fA63"), i("OG14"), i("rGqo"), i("Btvt"), i("tUrg"), i("FEjr"), i("SRfc"), i("KKXr"), i("pIFo");
        var r = i("u2Gu");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var s, o = window.domReplaceEl,
            n = window.browser && (browser.mozilla || browser.safari);
        class l {
            constructor(e, t, i) {
                this._mediaId = e, this._editor = t, this._highlighted = !1, this._isCaptioned = !!i, s = this.getEditor().getOptions().multiMediasSeparator
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
                    var i = this.el();
                    if (e) {
                        var a = getSize(i),
                            s = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>');
                        setStyle(s, {
                            width: a[0] + 0,
                            height: a[1] + 0
                        }), addClass(i, "article_ed__object_highlighted")
                    } else re(geByClass1("_article_ed__object_highlight", i)), removeClass(i, "article_ed__object_highlighted");
                    if (this._isCaptioned)
                        if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || Object(r.o)(this._getCaptionEl(), !0);
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
                    var i = geByClass1("article_ed__img_inner", this._objectEl);
                    i.insertBefore(e, i.firstChild)
                }
            }
            el() {
                if (!this._objectEl) {
                    var e = this.render();
                    addClass(e, "article_object_el"), e.setAttribute("contenteditable", "false");
                    var t = this.getEditor().isLocked() ? "false" : "true",
                        i = browser.mozilla ? `contenteditable="${t}"` : 'contenteditable="false"';
                    this._objectEl = se(`<figure ${i}></figure>`);
                    var a = this.renderExtraControlsEl(),
                        s = this.renderEditControlEl();
                    if (a) {
                        var o = se('<div class="article_ed__img_wrapper"></div>'),
                            l = se('<div class="article_ed__img_inner"></div>');
                        a.setAttribute("contenteditable", "false"), addClass(a, "article_ed__extra_controls"), l.appendChild(a), o.appendChild(l), this._objectEl.appendChild(o), this.appendObjectInnerEl()
                    } else this._objectEl.appendChild(e);
                    s && this._objectEl.appendChild(s), this._isCaptioned && (this._captionEl = se(`<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="${t}"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">${getLang("pages_article_figure_placeholder")}</div>\n        </figcaption>`), this._objectEl.appendChild(this._captionEl)), n && e.addEventListener("click", () => {
                        this.highlight(!0), Object(r.o)(e)
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
                var e = a(Object(r.u)(), 2),
                    t = e[0],
                    i = e => {
                        var t = this._captionEl;
                        return !!traverseParent(e, e => e == t, 10)
                    };
                if (e[1]) return i(t.startContainer);
                var s = i(t.startContainer),
                    o = i(t.endContainer);
                return s && o
            }
            loadErrorHandler(e) {
                this.setLoadingState(!1), addClass(this._objectEl, "article_paragraph_err"), e.appendChild(this.renderLoadErr())
            }
        }
        var d = {};

        function h(e) {
            return `${(e=e.split("_"))[0]}_${e[1]}`
        }
        class c {
            static add(e, t, i) {
                d[e] = d[e] || {}, d[e][h(t)] = i
            }
            static get(e, t, i) {
                return void 0 !== i && (t = (t = t.split(","))[i]), d[e] = d[e] || {}, d[e][h(t)]
            }
        }
        var _, p = i("sWID");

        function u(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class g extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = c.get(p.c.ObjectAudioPlaylist, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var t = u(this.getMediaId().split("_"), 2),
                        i = t[0],
                        r = t[1];
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_audioplaylist_snippet",
                        pl_owner_id: i,
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
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function b(e, t) {
            return e ? `<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="${t}">\n      <div class="article_ed__caredit_photo" style="background-image: url(${e})"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>` : `<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">${getLang("pages_article_ed_carousel_add")}</div>\n    </button>`
        }
        class f {
            constructor(e, t, i, r) {
                var a = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                a += `\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ${getLang("pages_article_ed_carousel_title")}\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">${getLang("global_save")}</button>\n            <button class="flat_button article_ed__caredit_cancel">${getLang("global_cancel")}</button>\n          </div>\n         </div>\n      </div>\n    `, a += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', t.getMediaId().split(",").forEach(e => {
                    var t = c.get(p.c.ObjectPhoto, e),
                        i = v(Object(p.f)(t.sizes, 251), 1)[0];
                    a += b(i, e)
                }), a += b(), a += "  </div>", a += "</div>", a += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(a), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", () => {
                    showBox("al_photos.php", {
                        to_id: t.getEditor().getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: this._limit - this._medias.length,
                        article: 1
                    }, {
                        cache: 1,
                        stat: [jsc("web/photos.js"), "photos.css", "upload.js"]
                    });
                    cur.chooseMedia = this.onPhotoAdd.bind(this), cur.showMediaProgress = (() => {
                        show(this._els.loading), t.getEditor().setMediaUploadMode(!0)
                    }), cur.choosePhotoUploadedAll = (() => {
                        hide(this._els.loading), t.getEditor().setMediaUploadMode(!1)
                    })
                }), this._els.saveButton.addEventListener("click", () => {
                    re(this._els.editor), i(this._medias.join(","))
                }), this._onSave = i, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", e => {
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
                    var i = domData(t, "media-id");
                    i && this._medias.push(i)
                }), this._medias = this._medias.slice(0, this._limit), this._medias
            }
            onPhotoAdd(e, t, i, a) {
                if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                    c.add(p.c.ObjectPhoto, t, {
                        size: Object(r.t)(i.editable.sizes),
                        sizes: i.editable.sizes
                    });
                    var s = v(Object(p.f)(i.editable.sizes, 251), 1)[0];
                    domInsertBefore(se(b(s, t)), this._els.addButton)
                }
                return void 0 === a && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
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

        function m(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class y extends l {
            constructor(e, t, i) {
                super(e, t, !0), this._currentImageIndex = 0, this.paragraph = i
            }
            cancelCarouselEditor() {
                this._carouselEditor && this._carouselEditor.cancel()
            }
            renderExtraControlsEl() {
                var e = se(`\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">${getLang("pages_article_ed_create_carousel")}</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    `);
                this._carouselControlsEl = e;
                var t = geByClass1("article_ed__carousel_btn_edit", e),
                    i = geByClass1("article_ed__carousel_nav_btn_left", e),
                    r = geByClass1("article_ed__carousel_nav_btn_right", e),
                    a = () => {
                        var e = this.getMediaIdsCount() > 1;
                        t.innerHTML = e ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                    };
                return a(), t.addEventListener("click", t => {
                    var i = this.getEditor();
                    return i.closeAllCarouselEditors(), i._resizeTooltip && i._resizeTooltip.hide(), addClass(this._objectEl, "article_ed__carousel_edit_open"), this._carouselEditor = new f(e, this, t => {
                        t ? (delete this._fixedImageSize, this.setMediaId(t), this.appendObjectInnerEl(), this.getEditor().saveUndoStateAndDraft(), a(), this._setImageIndex(0, e), removeClass(this._objectEl, "article_ed__carousel_edit_open"), delete this._carouselEditor) : this.getEditor().removeObject(this)
                    }, this.getEditor().getLimits().maxCarouselItems), cancelEvent(t)
                }), i.addEventListener("click", () => {
                    this._onCarouselNavBtnClicked(!0)
                }), r.addEventListener("click", () => {
                    this._onCarouselNavBtnClicked(!1)
                }), this._setImageIndex(0), e
            }
            _onCarouselNavBtnClicked(e) {
                var t = this.getEditor();
                this._setImageIndex(this.getImageIndex() + (e ? -1 : 1));
                var i = t.getObjectParagraphIndex(this.paragraph);
                i >= 0 ? (t.setParagraphDirty(i), t.redraw(!1)) : t.redraw(!0), this.isCaptionFocused() && Object(r.o)(this.getCaptionEl(), !0)
            }
            getImageIndex() {
                return Math.min(this.getMediaIdsCount() - 1, this._currentImageIndex)
            }
            _setImageIndex(e) {
                this._currentImageIndex = Math.min(Math.max(0, e), this.getMediaIdsCount());
                var t = geByClass1("article_ed__carousel_nav_btn", this._carouselControlsEl);
                toggleClass(t, "no_left", 0 == this._currentImageIndex), toggleClass(t, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._objectEl, "article__carousel", this._isCarousel());
                var i = geByClass1("article_ed__carousel_counter", this._carouselControlsEl);
                this._isCarousel() ? (setStyle(i, "display", "inline-block"), i.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(i), this._drawImage(), this.highlight()
            }
            render() {
                this._el = se('\n      <div class="article_ed__img_content">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                var e = c.get(p.c.ObjectPhoto, this.getMediaId(), 0);
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
                                    this._mediaId = e, c.add(p.c.ObjectPhoto, e, {
                                        size: Object(r.t)(t.editable.sizes),
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
                var i = new FileReader;
                i.onload = (() => {
                    this._initUpload(), Upload.onFileApiSend(this._upload, [e])
                }), i.readAsDataURL(e)
            }
            _updateSize() {}
            _drawImage() {
                var e = c.get(p.c.ObjectPhoto, this.getMediaId(), this.getImageIndex()),
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
                    var i = m(Object(p.f)(e.sizes, t), 1)[0],
                        r = this._getImageEl(),
                        a = !1;
                    r.onload = (() => {
                        clearTimeout(_), a = !0, setStyle(r, "visibility", "visible"), show(r), this.setLoadingState(!1), this._isCarousel() && this._fixSize()
                    }), r.src = i, clearTimeout(_), a || (_ = setTimeout(() => {
                        a || (setStyle(r, "visibility", "hidden"), this.setLoadingState(!0, this._isCarousel()))
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
                var e = c.get(p.c.ObjectPhoto, this.getMediaId(), 0);
                return !(!e && !e.size) && e.size[0] >= 720
            }
        }
        class j extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var e = c.get(p.c.ObjectVideo, this.getMediaId());
                if (e && (e.editable || e.thumb)) {
                    var t;
                    if (e.thumb) t = e.thumb;
                    else t = Object(p.f)(e.editable.sizes, this.getEditor().getWidth(!0))[0];
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
        class C extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_ed__gif_content"></div>\n    ');
                var e = c.get(p.c.ObjectGIF, this.getMediaId());
                if (e)
                    if (e.video) {
                        if (this._videoEl = ce("video", {
                                autoplay: !0,
                                loop: "loop",
                                muted: !0,
                                src: e.video + "&mp4=1"
                            }), e.size) {
                            var t = e.size[0] < e.size[1],
                                i = !this._isSmallGifSize();
                            (t || i) && setStyle(this._videoEl, {
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
                var e = c.get(p.c.ObjectGIF, this.getMediaId());
                return !(!e || !e.size) && e.size[0] > this.getEditor().getOptions().minGifWidthExpand
            }
        }

        function E(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class O extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = c.get(p.c.ObjectPodcast, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var t = E(this.getMediaId().split("_"), 2),
                        i = t[0],
                        r = t[1];
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_podcast_snippet",
                        owner_id: i,
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
        class P extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = c.get(p.c.ObjectAudio, this.getMediaId()).audio,
                    t = AudioUtils.drawAudio(e);
                return this._el = se(`\n      <div class="article_object_audio">${t}</div>\n    `), this._el
            }
        }
        var w, x = [{
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

        function T(e) {
            return JSON.parse(JSON.stringify(e))
        }

        function I(e, t, i) {
            var a = [];
            return e.forEach((e, s) => {
                i && !Object(r.D)(e) && Object(r.H)(e) && 0 != s && e.type != p.c.Code || a.push(function(e, t) {
                    var i = {};
                    for (var a in e) {
                        if (!e.hasOwnProperty(a)) return;
                        if (!a.startsWith("_") || "_uuid" === a && t) {
                            var s = e[a];
                            i[a] = isObject(s) || isArray(s) ? T(s) : s
                        }
                    }
                    return Object(r.D)(e) && e._object && (i.mediaId = e._object.getMediaId()), e.sep && (i.sep = 1), i.type == p.c.Text && delete i.type, i.lines.forEach(e => {
                        if (e) {
                            if (void 0 !== e.decorations) {
                                var t = !0;
                                each(e.decorations, (i, r) => {
                                    0 == r.length ? delete e.decorations[i] : t = !1
                                }), t && delete e.decorations
                            }
                            e.brs && 0 == e.brs.length && delete e.brs
                        }
                    }), i
                }(e, t))
            }), T(a)
        }

        function k(e) {
            return e.forEach(e => {
                e.type = e.type || p.c.Text, e.lines.forEach(e => {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
        class S extends l {
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
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class M extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = L(this.getMediaId().split(";"), 2),
                    t = e[0],
                    i = e[1];
                this._el = se(`<div class="article_object_embed fb-post" data-href="https://www.facebook.com/${t}/posts/${i}/" data-width="552px"></div>`), this.setLoadingState(!0);
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
        class D extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se(`\n      <div class="article_object_embed article_object_embed_instagram">\n        <blockquote\n            class="article_embed_spacer instagram-media"\n            data-instgrm-permalink="https://instagram.com/p/${this.getMediaId()}"\n            data-instgrm-version="12"\n        ></blockquote>\n      <div>\n    `), this.setLoadingState(!0), loadScript("https://www.instagram.com/embed.js", {
                    onLoad: () => {
                        setTimeout(() => {
                            window.instgrm.Embeds.process(), addEvent(window, "message", p.e), this.setLoadingState(!1)
                        }, 0)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }

        function A(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class N extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se('<div class="article_object_embed"></div>'), setTimeout(() => {
                    var e = A(this.getMediaId().split(";"), 2),
                        t = e[0],
                        i = e[1],
                        r = domData(this._objectEl, "uuid"),
                        a = `vk_post_${this.getMediaId()}_${r}`;
                    this._el.setAttribute("id", a), this.setLoadingState(!0), loadScript("/js/api/openapi.js", {
                        onLoad: () => {
                            ajax.post("dev.php", {
                                act: "a_get_post_hash",
                                post: `${t}_${i}`
                            }, {
                                onDone: e => {
                                    e && (this.setLoadingState(!1), window.VK && window.VK.Widgets && window.VK.Widgets.Post(`${a}`, t, i, e))
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
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class H extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = B(this.getMediaId().split(";"), 2),
                    t = e[0],
                    i = e[1];
                return this._el = se(`<div class="article_object_embed"><blockquote class="telegram-post" data-telegram-post="${t}/${i}" data-width="100%" data-userpic="true"></div>`), this.setLoadingState(!0), loadScript("https://telegram.org/js/telegram-widget.js?5", {
                    onLoad: () => {
                        this.setLoadingState(!1)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }

        function U(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class z extends l {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_poll"></div>\n    ');
                var e = c.get(p.c.ObjectPoll, this.getMediaId());
                if (e && e.snippet) return this._el.appendChild(se(e.snippet)), this._el;
                var t = U(this.getMediaId().split("_"), 2)[1];
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
                var e = c.get(p.c.ObjectPoll, this.getMediaId());
                if (!e || !e.editable) return null;
                var t = se(`\n      <div class="article_ed__obj_edit_control">\n        <div class="article_ed__poll_object_btn">\n          <button class="article_ed__poll_object_edit">${getLang("global_edit")}</button>\n        </div>\n      </div>\n    `);
                return geByClass1("article_ed__poll_object_edit", t).addEventListener("click", this._editor.editObjectPoll.bind(this._editor, this)), t
            }
        }

        function F(e) {
            var t = [];
            e.length > w.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", w.maxParagraphs));
            var i = 0,
                a = 0;
            return e.forEach(e => {
                var s = 0;
                e.lines.forEach(e => {
                    e && (i += e.text.length, s += e.text.length)
                }), Object(r.D)(e) && a++, s > w.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", s).replace("{limit}", w.maxSymbolsPerParagraph))
            }), i > w.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", i).replace("{limit}", w.maxSymbols)), a > w.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", w.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
        class $ {
            static _saveChunk(e, t, i, r, a) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: r,
                    chunk_index: i,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: e => {
                        a(e)
                    },
                    onError: () => {
                        a(!0)
                    }
                })
            }
            static _saveFinally(e, t, i, r, a, s, o, n, l, d) {
                l = l ? JSON.stringify(l) : "", ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: a,
                    name: r,
                    is_published: intval(i),
                    chunks_count: n,
                    Article_text: l,
                    hash: o
                }, s || {}), {
                    onDone: d,
                    onFail: e => e.startsWith("locked ") ? (d(e), !0) : e ? (showFastBox(getLang("global_error"), e), d(!0), !0) : void 0
                })
            }
            static save(e, t, i, r, a, s, o, n, l, d) {
                var h = [],
                    c = [],
                    _ = 0;
                if (i.forEach(e => {
                        var t = 0;
                        e.lines.forEach(e => {
                            t += e.text.length, e.decorations && e.decorations.link && e.decorations.link.forEach(e => {
                                t += (e[2] || "").length
                            })
                        }), (_ += t) >= n && (h.push(c), _ = t, c = []), c.push(e)
                    }), c.length && h.push(c), h.length > 1) {
                    var p = new CallHub(() => {
                        $._saveFinally(e, t, r, a, s, l, o, h.length, !1, d)
                    }, h.length);
                    h.forEach((t, i) => {
                        $._saveChunk(e, t, i, o, e => {
                            e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : p.done()
                        })
                    })
                } else $._saveFinally(e, t, r, a, s, l, o, 0, i, d)
            }
        }
        var R = i("zxIV"),
            W = i("W9Tc");

        function K(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    r = !0,
                    a = !1,
                    s = void 0;
                try {
                    for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done) && (i.push(o.value), !t || i.length !== t); r = !0);
                } catch (e) {
                    a = !0, s = e
                } finally {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (a) throw s
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var G = window,
            V = G.cur,
            Q = G.browser,
            Y = G.each,
            J = G.addClass,
            X = G.geByTag1,
            q = G.geByClass1,
            Z = G.extractUrls,
            ee = G.removeClass,
            te = G.domClosestByTag,
            ie = G.hasClass,
            ae = G.domData,
            oe = G.getSize,
            ne = G.getXY,
            le = G.re,
            de = G.se,
            he = G.domInsertBefore,
            _e = G.traverseParent,
            pe = G.extend,
            ue = G.toggleClass,
            ge = G.trim,
            ve = G.domInsertAfter,
            be = G.gpeByClass,
            fe = G.clean,
            me = G.domReplaceEl,
            ye = G.isObject,
            je = G.ge,
            Ce = G.domChildIndex,
            Ee = G.domNS,
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
            Pe = [{
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
            we = Pe.slice().reverse(),
            xe = {};
        Y(Pe, (e, t) => {
            xe[t.tag] = t
        });
        var Te = {};
        Y(Pe, (e, t) => {
            Te[t.type] = t
        });
        var Ie = 100,
            ke = 1;

        function Se() {
            return ke++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        window.ArticleEditor = class {
            constructor(e, t, i) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                this._id = Se(), V.lang = V.lang || {}, pe(V.lang, a.lang), this._options = a, this._els = {
                        editor: je(e),
                        canvas: de('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                    }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = de('<div class="article_photo_upload"></div>')), J(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [],
                    function(e) {
                        w = e
                    }(a.limits);
                var s = i || [];
                if (a.postData) {
                    var o = a.postData.text || "";
                    o = (o = o.replace(/❤/g, "❤️")).split("\n");
                    var n = [];
                    n.push(Object(r.e)({
                        type: p.c.Header1,
                        lines: [{
                            text: ""
                        }]
                    })), o.forEach(e => {
                        ge(e) && n.push(Object(r.e)({
                            lines: [{
                                text: fe(e)
                            }]
                        }))
                    }), s = n.concat(s)
                }
                s && 0 != s.length || (s = [Object(r.e)({
                    type: this._options.noTitle ? p.c.Text : p.c.Header1
                })]), (s = s.filter(e => !1 !== e)).forEach(e => {
                    e.lines.forEach(e => {
                        e.text = Object(r.R)(e.text), e.brs && ye(e.brs) && (e.brs = Object(r.j)(e.brs))
                    })
                }), a.needIndexCorrection && Object(r.k)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(), this._initObjectDrag(), a.postData ? Object(r.o)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), a.coverPhoto && this.setCoverPhoto(a.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(t.name), this.updateWarnInfos(), this._publishNameCandidate = a.name || this._getName(), this._saveUndoState(), this.wasPublishedInCurrentSession = !1, this._openTime = Date.now(), stManager.add("audio.js")
            }
            updateWarnInfos() {
                this.showWarningInfo(), this.showEditLockInfo(), this.showRevEditInfo()
            }
            _setEventListener(e, t, i) {
                this._events = this._events || [], this._events.push({
                    el: e,
                    event: t,
                    handler: i
                }), e.addEventListener(t, i)
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
                    if (!e && t.type == p.c.ObjectPhoto) {
                        var i = t._object.getMediaId(0);
                        e = {
                            id: i,
                            data: c.get(p.c.ObjectPhoto, i)
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
                    this._els.placeholders || (this._els.placeholders = de('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = de(`<h1>${this.getOptions().placeholderTitle}</h1>`), this._els.placeholderFirstParagraph = de(`<p>${this.getOptions().placeholderParagraph}</p>`), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(r.H)(this._ps[0]) ? ee(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : J(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var e = this._ps[1],
                        t = !!e && e.sep,
                        i = K(this._getCurrentParagraphIndex(), 1)[0];
                    Object(r.H)(e) && (!e || e.type != p.c.Code) && i < 2 && this._ps.length <= 2 && !t ? ee(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : J(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }
            destroy() {
                this._els.editor.innerHTML = "", ee(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(e => {
                    e.el.removeEventListener(e.event, e.handler)
                }), delete V.docsCurFilter
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
                Y(this._ps, (t, i) => {
                    if (i._object == e) {
                        var a = this._getParagraphElByIndex(t + 1);
                        return Object(r.o)(a), le(this._getParagraphElByIndex(t)), this._setAllParagraphsDirty(), this._triggerInputEvent(), !1
                    }
                })
            }
            _processPastedUrl(e, t) {
                var i = this._getParagraph(e);
                i && i.type == p.c.Text && setTimeout(() => {
                    this._processMatchingEmbeds(e, t) || (le(this._els.shareParseForm), le(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(de('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                    })), window.onUploadFail = (() => {}), window.onUploadDone = (t => {
                        if (t) {
                            var i = t[2];
                            if (i) {
                                var a, s, o = {};
                                switch (t[0]) {
                                    case "audio_playlist":
                                        a = p.c.ObjectAudioPlaylist, o = {
                                            accessHash: i.accessHash
                                        }, t[1] = i.ownerId + "_" + i.id + (i.accessHash ? "_" + i.accessHash : "");
                                        break;
                                    case "podcast":
                                        Object(W.b)("article_podcasts") && (a = p.c.ObjectPodcast, o = {});
                                        break;
                                    case "poll":
                                        Object(W.b)("article_poll") && (a = p.c.ObjectPoll, o = {
                                            editable: !1,
                                            snippet: i.snippet
                                        });
                                        break;
                                    case "doc":
                                        "gif" != i.ext && 3 != i.type || (a = p.c.ObjectGIF, (o = {
                                            size: i.video_preview_size,
                                            video: i.video_preview,
                                            href: i.href || i.editable.href
                                        }).video || o.href || (a = !1));
                                        break;
                                    case "photo":
                                        a = p.c.ObjectPhoto, o = {
                                            size: Object(r.t)(i.editable.sizes),
                                            sizes: i.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        a = p.c.ObjectVideo, o = {
                                            editable: i.editable,
                                            duration: i.editable.duration,
                                            platform: i.editable.platform
                                        }
                                }
                                if (a) {
                                    var n = Object(r.w)(this._ps[e]),
                                        l = {
                                            mediaId: t[1],
                                            type: a,
                                            sep: n,
                                            fromExtPage: intval(i.from_ext_page)
                                        };
                                    c.add(a, l.mediaId, o), this._linkTooltip && this._linkTooltip.hide(), l = Object(r.e)(l), (s = this._getParagraph(e + 1)) && s._object && s._object._mediaId === l.mediaId || (this._getOrCreateParagraphObject(l), this._insertParagraphAt(e + 1, l), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), setTimeout(() => {
                                        this.onObjectStateLoaded()
                                    }, 10))
                                }
                            }
                        }
                    }), this._els.shareParseForm.submit())
                }, 0)
            }
            _processMatchingEmbeds(e, t) {
                var i, a, s;
                if (!Object(W.b)("article_embeds")) return !1;
                if (i = t.match(/^https?:\/\/(?:www.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)$/)) a = p.c.ObjectTwitter, s = i[1];
                else if (i = t.match(/^https?:\/\/(?:www.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)(?:\/embed)?(?:\/)?/)) a = p.c.ObjectInstagram, s = i[1];
                else if (i = t.match(/^https?:\/\/(?:www.)?facebook\.com\/(\w.+)\/posts\/(\d+)\/?$/)) a = p.c.ObjectFacebook, s = `${i[1]};${i[2]}`;
                else if (i = t.match(/^(?:https?:\/\/)?(?:[a-z0-9\_\.-]*\.)?(?:www.)?vk\.com\/(?:[a-z0-9\_\.-?]*w=)?wall(-?\d+)_(\d+)/)) a = p.c.ObjectVK, s = `${i[1]};${i[2]}`;
                else if (i = t.match(/^https?:\/\/(?:www.)?t\.me\/(\w.+)\/(\d+)/)) {
                    if (je(`telegram-post-${i[1]}-${i[2]}`)) return !1;
                    a = p.c.ObjectTelegram, s = `${i[1]};${i[2]}`
                }
                if (!a || !s) return !1;
                var o = Object(r.e)({
                        _uuid: Se(),
                        type: a,
                        mediaId: s
                    }),
                    n = this._getParagraph(e + 1);
                return !(!n || !n._object || n._object._mediaId !== o.mediaId) || (this._getOrCreateParagraphObject(o), this._insertParagraphAt(e + 1, o), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), !0)
            }
            _handleObjectPaste(e) {
                var t = (e.clipboardData || e.originalEvent.clipboardData).getData("text/plain");
                if (t) {
                    var i = K(t.split(":"), 2),
                        r = i[0],
                        a = i[1];
                    if ("uuid" == r && a) {
                        var s = domQuery1(`[data-uuid="${a}"]`);
                        if (s) {
                            var o = s.cloneNode(!0);
                            o.setAttribute("data-force-update", "1");
                            var n = K(this._getCurrentParagraphIndex(), 1)[0];
                            ve(o, this._getParagraphElByIndex(n)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                        }
                    }
                }
            }
            _handleLinkPaste(e) {
                var t = this,
                    i = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (var a in i)
                    if (i.hasOwnProperty(a)) {
                        var s = i[a];
                        "string" === s.kind && function() {
                            var e = K(t._getCurrentParagraphIndex(), 1)[0];
                            s.getAsString(i => {
                                var a = i.replace(/(<([^>]+)>)/gi, ""),
                                    s = Z(a, !0);
                                if (1 === s.length) {
                                    var o = s[0].url,
                                        n = t._getParagraphElByIndex(e);
                                    t._processPastedUrl(e, o), Object(r.T)(n, i => {
                                        if (i.nodeType == Node.TEXT_NODE && i.textContent.indexOf(o) >= 0 && !_e(i, e => e.tagName && "a" == e.tagName.toLowerCase(), 3)) {
                                            t._saveCursorMarker();
                                            var r = document.createRange();
                                            r.setStart(i, i.textContent.indexOf(o)), r.setEnd(i, i.textContent.indexOf(o) + o.length);
                                            var a = window.getSelection();
                                            a.removeAllRanges(), a.addRange(r), t._setParagraphDirty(e), document.execCommand("createLink", !1, o), t._restoreCursorFromMarker()
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
                var i = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (var a in i)
                    if (i.hasOwnProperty(a)) {
                        var s = i[a];
                        "file" === s.kind && function() {
                            t._photoPasteUploadingProcess = !0;
                            var e = s.getAsFile(),
                                i = new FileReader;
                            i.onload = (() => {
                                t._photoPasteUploadingProcess = !1;
                                var a = K(t._getCurrentParagraphIndex(), 1)[0];
                                a = a || 0;
                                var s, o = Object(r.e)({
                                    type: p.c.ObjectPhoto
                                });
                                t._getOrCreateParagraphObject(o).setBLOB(e), Object(r.H)(t._ps[a]) ? (s = a, Object(r.w)(t._ps[s]) && (o.sep = 1), t._ps[s] = o) : (s = a + 1, t._insertParagraphAt(s, o)), t._redraw(!0, !0);
                                var n = new Image;
                                n.onload = (() => {
                                    t._focusParagraph(s + 1), t._showObjectPicker()
                                }), n.src = i.result
                            }), i.readAsDataURL(e)
                        }()
                    }
            }
            _getCurrentSelectionState() {
                var e = K(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    i = e[1];
                if (!1 === t || !1 === i) return !1;
                for (var a, s, o = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        list: !1,
                        justHeaders: !0
                    }, n = {}, l = 0, d = t; d <= i && d < this._ps.length; d++) {
                    var h = Object(r.D)(this._ps[d]) ? this._ps[d]._object.getCaptionEl() : this._getParagraphElByIndex(d);
                    if (void 0 === a) {
                        var c = K(getCaretCharacterOffsetWithin(h), 2);
                        a = c[0], s = c[1]
                    }
                    this._ps[d].lines.forEach(e => {
                        var t = e.decorations;
                        Pe.forEach(i => {
                            var r = t[i.type];
                            r && !isEmpty(r) && r.forEach(t => {
                                var r = [t[0] + l, t[1] + l];
                                if ("link" == i.type) a < r[1] && s > r[0] && (n[i.type] = 1, o.decorations[i.type] = !0);
                                else if (1 == n[i.type]) s > r[1] || (s >= r[0] && s <= r[1] ? t[0] > 0 ? n[i.type] = -1 : (n[i.type] = 2, o.decorations[i.type] = !0) : n[i.type] = -1);
                                else if (!n[i.type]) {
                                    var d = a >= r[0] && a <= r[1];
                                    d && s >= r[0] && s <= r[1] ? (n[i.type] = 2, o.decorations[i.type] = !0) : d && (e.text.length > r[1] ? n[i.type] = -1 : n[i.type] = 1)
                                }
                            })
                        }), l += e.text.length
                    })
                }
                for (var _ = t; _ <= i && _ < this._ps.length; _++) Object(r.D)(this._ps[_]) && (o.captionFocused = o.captionFocused || this._ps[_]._object.isCaptionFocused(), o.object = !0), this._ps[_].type == p.c.Header1 && (o.header1 = !0), this._ps[_].type != p.c.Header2 && (o.header2 = !1), this._ps[_].type != p.c.Header3 && (o.header3 = !1), inArray(this._ps[_].type, [p.c.Header1, p.c.Header2, p.c.Header3]) ? o.header = !0 : o.justHeaders = !1, inArray(this._ps[_].type, [p.c.Quote, p.c.Quote2]) || (o.quote = !1), inArray(this._ps[_].type, [p.c.BulletList, p.c.NumericList]) && (o.list = !0);
                var u = K(Object(r.u)(), 1)[0];
                return !(u && u.startContainer && ie(u.startContainer, "article_ed__noconteditable")) && (o.multiline = t != i, o)
            }
            _hideFormatTooltip() {
                this._formatTooltip && this._formatTooltip.isShown() && this._formatTooltip.hide()
            }
            _showFormatTooltip() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var e = window.getSelection();
                        if (e.focusNode && (ie(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase())) return;
                        var t = !e.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, t), 1)
                    } catch (e) {}
                }
            }
            _doShowFormatTooltip(e) {
                if (!this._formatTooltip) {
                    var t, i = de(`\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="${getLang("pages_articles_enter_link")}"/><div class="article_set_link_delete"></div></div>\n        </div>`);
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: i,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: () => {
                            var e = this._getCurrentSelectionState(),
                                t = [];
                            if (!e || e.header1 || e.object && !e.captionFocused || (e.justHeaders || t.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || t.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), t.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? t.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : t.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (t.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), t.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), t.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 != t.length) {
                                var r = q("article_format_btns", i);
                                r.innerHTML = "", t.forEach((e, t) => {
                                    t > 0 && inArray(e[0], ["header1"]) && r.appendChild(de('<div class="article_format_divider"></div>'));
                                    var i = e[2] ? "article_format_btn_active" : "";
                                    r.appendChild(de(`<button class="article_format_btn ${i}" id="article_format_btn_${e[0]}" onclick="${e[1]}"></button>`))
                                }), this.setLinkMode(!1)
                            } else this._formatTooltip.hide()
                        },
                        getTargetBoundingBox: () => {
                            if (this._formatTooltip.linkMode) return t;
                            var e = K(Object(r.u)(), 3),
                                i = e[0],
                                a = e[2];
                            if (!a || !a.rangeCount) return t;
                            var s = i.getBoundingClientRect();
                            if (!s.left) {
                                var o = i.startContainer.nodeType == Node.ELEMENT_NODE ? i.startContainer : domPN(i.startContainer),
                                    n = ne(o),
                                    l = oe(o);
                                return t = {
                                    top: n[1] + scrollGetY(),
                                    left: n[0] + l[0] / 2,
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
                    var a = X("input", i);
                    a.addEventListener("keypress", e => {
                        if (e.keyCode == Oe.Enter) return this._setLinkToSelectedText(a.value.trim()), this._formatTooltip.hide(), cancelEvent(e)
                    }), q("article_set_link_delete", i).addEventListener("click", e => (this._setLinkToSelectedText(), cancelEvent(e)))
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }
            _setLinkToSelectedText(e) {
                e && ((e = (e = e.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://") || (e = (Object(r.K)(e) ? "https" : "http") + "://" + e), e = encodeURIComponent(e)), this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), !Q.msie && e || this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor)
            }
            clearLink() {
                this.setLinkMode(!1);
                var e = K(Object(r.u)(), 3),
                    t = e[0],
                    i = e[2],
                    a = te("a", t.startContainer),
                    s = te("a", t.endContainer) || a;
                a && (this._saveCursorMarker(), i.setBaseAndExtent(a, 0, s, Math.max(1, s.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }
            setLinkMode(e, t) {
                var i;
                e && (i = this._getCursor(), Q.msie || document.execCommand("superscript", !1, !0));
                var r = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var a = X("input", r);
                        a.value = "", J(r, "article_editor_format_tt_set_link"), this._linkCursor = i, this._linkSelectedCursor = this._getCursor(), a.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(r, {
                        width: null
                    }), ee(r, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }
            setHeader1(e) {
                this._setHeader(p.c.Header2, !e)
            }
            setHeader2(e) {
                this._setHeader(p.c.Header3, !e)
            }
            setQuote() {
                var e = this._getCursor(),
                    t = K(this._getCurrentParagraphIndex(), 2),
                    i = t[0],
                    a = t[1];
                if (!1 !== i) {
                    a || (a = i);
                    for (var s = p.c.Text, o = i; o <= a; o++)
                        if (d(this._ps[o])) {
                            s = this._ps[o].type == p.c.Quote ? p.c.Quote2 : this._ps[o].type == p.c.Quote2 ? p.c.Text : p.c.Quote;
                            break
                        }
                    for (var n = i; n <= a; n++) {
                        var l = this._ps[n];
                        d(l) && (this._ps[n] = Object(r.e)({
                            type: s,
                            lines: [l.lines[0]],
                            sep: Object(r.w)(this._ps[n])
                        }), this._setParagraphDirty(n))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(e), this._saveUndoState(), this.saveDraft()
                }

                function d(e) {
                    return !Object(r.D)(e) && !Object(r.C)(e)
                }
            }
            _setHeader(e, t) {
                var i = this._getCursor(),
                    a = K(this._getCurrentParagraphIndex(), 2),
                    s = a[0],
                    o = a[1];
                if (!1 !== s) {
                    o || (o = s);
                    for (var n = s; n <= o; n++) l(this._ps[n]) && (this._ps[n].type = t ? e : p.c.Text, this._setParagraphDirty(n));
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(i), this._saveUndoState(), this.saveDraft()
                }

                function l(e) {
                    return !Object(r.D)(e) && !Object(r.C)(e)
                }
            }
            setStrong() {
                this._setAllParagraphsDirty(), document.execCommand("bold"), Q.msie && this._triggerInputEvent()
            }
            setEm() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), Q.msie && this._triggerInputEvent()
            }
            setStrike() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), Q.msie && this._triggerInputEvent()
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
                    this._ps = k(e.ps), this._undoCurrentState = I(this._ps, !0), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
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
                    this._ps = k(e.ps), this._undoCurrentState = I(this._ps, !0), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
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
                    e._preparedData && (e.mediaId.split(",").forEach((t, i) => {
                        c.add(e.type, t, e._preparedData[i])
                    }), delete e._preparedData)
                }), this._ps = k(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }
            _getParagraphFromHTML(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

                function a(t, i) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var s = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        i.text += "pre" == e ? s : Object(r.i)(s)
                    } else Object(r.y)(t) && i.text.length > 0 && i.brs.push(i.text.length);
                    Y(t.childNodes, (e, t) => {
                        var s = [i.text.length];
                        a(t, i), s.push(i.text.length);
                        var o, n = (t.tagName || "").toLowerCase();
                        switch (t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (n = "strong"), n) {
                            case "b":
                            case "strong":
                                o = Te.strong;
                                break;
                            case "em":
                            case "i":
                                o = Te.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                o = Te.strike;
                                break;
                            case "a":
                                o = Te.link;
                                var l = t.getAttribute("href") || "",
                                    d = Object(r.m)(l);
                                Object(r.K)(l) && (d = l.match(/app-?\d+_-?\d+/) ? d.replace("%23", "#") : d.replace("#", "%23")), s.push(d);
                                break;
                            case "code":
                                o = Te.code;
                                break;
                            case "font":
                                var h = t.getAttribute("face");
                                "monospace" === h ? o = Te.code : "times" === h && (o = Te.code)
                        }
                        o && (i.decorations[o.type] = i.decorations[o.type] || [], s[0] < s[1] && i.decorations[o.type].push(s), i.decorations[o.type] = Object(r.N)(i.decorations[o.type]))
                    })
                }
                var s = document.createElement("div");
                s.innerHTML = t;
                var o, n = [],
                    l = {};
                if ("ol" == e || "ul" == e) {
                    switch (e) {
                        case "ol":
                            o = p.c.NumericList;
                            break;
                        case "ul":
                            o = p.c.BulletList
                    }
                    for (var d = 0, h = s.children.length; d < h; d++) {
                        var c = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        a(s.children[d], c), c.brs = Object(r.g)(c.brs), n.push(c)
                    }
                } else {
                    switch (e) {
                        case "h1":
                            o = p.c.Header1;
                            break;
                        case "h2":
                        case "header":
                            o = p.c.Header2;
                            break;
                        case "h3":
                        case "h4":
                            o = p.c.Header3;
                            break;
                        case "blockquote":
                            o = p.c.Quote;
                            break;
                        case "cite":
                            o = p.c.Quote2;
                            break;
                        case "pre":
                            o = p.c.Code;
                            break;
                        default:
                            o = p.c.Text
                    }
                    var _ = s.firstElementChild;
                    if (Object(r.E)(_)) {
                        var u = ae(_, "type"),
                            g = ae(_, "media-id");
                        u && g && (s = X("figure", _), o = u, l.mediaId = g)
                    }
                    var v = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    a(s, v), v.brs = Object(r.g)(v.brs, v.text.length), n.push(v), o == p.c.Code && delete v.decorations.code, i || o != p.c.Text || "```" != v.text || 0 != v.brs.length || (v.text = "", o = p.c.Code), Object(r.A)(o) || (0 == v.text.indexOf("1. ") ? (o = p.c.NumericList, this._removeParagraphLineTextPart(v, 0, "1. ".length)) : 0 == v.text.indexOf("* ") && (o = p.c.BulletList, this._removeParagraphLineTextPart(v, 0, "* ".length))), v.brs = v.brs.filter(e => e > 0)
                }
                return l.lines = n, l.type = o, Object(r.e)(l)
            }
            _removeParagraphLineTextPart(e, t, i) {
                e.text = e.text.substring(0, t) + e.text.substring(i);
                for (var r = i - t, a = 0, s = e.brs.length; a < s; a++) {
                    var o = e.brs[a];
                    o > t && o < i ? e.brs[a] = void 0 : e.brs[a] > t && e.brs[a] >= i && (e.brs[a] -= r)
                }
                e.brs = e.brs.filter(e => void 0 !== e), Y(e.decorations, (a, s) => {
                    s.forEach(e => {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= i ? e[1] = t : e[0] >= t && e[1] <= i ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > i ? (e[0] = t, e[1] -= r) : (e[0] -= r, e[1] -= r))
                    }), e.decorations[a] = e.decorations[a].filter(e => void 0 !== e[0])
                })
            }
            _renderObjectParagraph(e, t) {
                var i = this._getOrCreateParagraphObject(e),
                    a = i.el();
                i.onRender && i.onRender();
                var s = 0;
                return isString(t) && (t = [t]), e.type == p.c.ObjectPhoto ? (s = i.getImageIndex(), i.setCaptionElHtml(t[s] || "")) : i.setCaptionElHtml(t[0] || ""), ae(a, "paragraph-lines", JSON.stringify(e.lines)), ae(a, "uuid", e._uuid), ae(a, "type", e.type), ae(a, "media-id", e._object.getMediaId()), ae(a, "mode", parseInt(e.mode) || 0), J(a, r.a), a
            }
            _renderParagraphLines(e, t) {
                if (!e.lines) return ["", ""];
                var i = "",
                    a = "",
                    s = "",
                    o = parseInt(e.type);
                switch (o) {
                    case p.c.NumericList:
                        i = "ol", a = "li";
                        break;
                    case p.c.BulletList:
                        i = "ul", a = "li";
                        break;
                    case p.c.Header1:
                        a = "h1";
                        break;
                    case p.c.Header2:
                        a = "h2";
                        break;
                    case p.c.Header3:
                        a = "h3";
                        break;
                    case p.c.Quote:
                        a = "blockquote";
                        break;
                    case p.c.Quote2:
                        a = "cite";
                        break;
                    case p.c.Code:
                        a = "pre";
                        break;
                    default:
                        i = "p"
                }
                var n = [];
                return e.lines.forEach(i => {
                    if (i) {
                        var l = i.text,
                            d = i.decorations,
                            h = [];
                        Y(Pe, (e, t) => {
                            if (!Object(r.A)(o) && o != p.c.Code || "code" != t.type) {
                                var i = d[t.type];
                                if (i)
                                    for (var a = function(e, r) {
                                            var a = i[r];
                                            (h[a[0]] = h[a[0]] || {
                                                open: {},
                                                close: {}
                                            }).open[t.type] = g(a);
                                            var s = h[a[1]] = h[a[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                o = function(e, t) {
                                                    for (var i = []; e > 0;) {
                                                        var r = h[--e];
                                                        if (r)
                                                            for (var a in r.open)
                                                                if (r.open.hasOwnProperty(a)) {
                                                                    if (a == t) return [];
                                                                    i.push(a)
                                                                }
                                                    }
                                                    return i
                                                }(a[1], t.type);
                                            o.forEach(e => {
                                                s.close[e.type] = !0
                                            }), s.close[t.type] = !0, o.forEach(e => {
                                                s.open[e.type] = g(a)
                                            })
                                        }, s = 0, n = i.length; s < n; s++) a(0, s)
                            }
                        });
                        var c = 0,
                            _ = [];
                        h.forEach((t, a) => {
                            if (t) {
                                var s = !1,
                                    o = t.close.link && 1 == Object.keys(t.close).length;
                                a > 0 && (s = Object(r.P)(l, c, a, i.brs, e.type == p.c.Code), o || _.push(s));
                                var n = 0;
                                o && (s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), !1 !== s && _.push(s)), Y(we, (e, i) => {
                                    void 0 !== t.close[i.type] && _.push(`</${i.tag}>`)
                                }), _.push("<br/>".repeat(n)), Y(Pe, (e, i) => {
                                    var r = t.open[i.type];
                                    void 0 !== t.open[i.type] && (!0 === r ? _.push(`<${i.tag}>`) : _.push(`<${i.tag} href="${fe(r)}">`))
                                }), c = a
                            }
                        }), _.push(Object(r.P)(l, c, void 0, i.brs, e.type == p.c.Code));
                        var u = "";
                        a && (u += `<${a}${s=s?` ${s}`:""}>`), inArray(o, [p.c.Quote, p.c.Quote2]) && (u += "<p>"), u += _.join("") || (t ? "" : "<br/>"), inArray(o, [p.c.Quote, p.c.Quote2]) && (u += "</p>"), a && (u += `</${a}>`), n.push(u)
                    }

                    function g(e) {
                        return e[2] || !0
                    }
                }), [i, n]
            }
            _renderParagraph(e) {
                var t, i = Object(r.D)(e),
                    a = K(this._renderParagraphLines(e, i), 2),
                    s = a[0],
                    o = a[1];
                if (i) t = this._renderObjectParagraph(e, o);
                else {
                    var n = o.join("");
                    t = de(s ? `<${s}>${n}</${s}>` : n)
                }
                return Object(r.w)(e) ? ae(t, "sep", Object(r.p)()) : ae(t, "sep", null), J(t, r.a), J(t, "article_paragraph"), t
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
                    var i = e > 0 && this._ps[e - 1],
                        r = this._ps[e],
                        a = e + 1 < t && this._ps[e + 1],
                        s = !1,
                        o = !1,
                        n = !1;
                    i && r.type == i.type || (s = !0), a && r.type == a.type || (o = !0), (p.d.includes(+a.type) || a.sep) && (n = !0);
                    var l = this._getParagraphElByIndex(e);
                    ue(l, "article_decoration_first", s), ue(l, "article_decoration_last", o), ue(l, "article_decoration_before", n)
                }
            }
            redraw() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._redraw(e, !0)
            }
            _redraw(e, t) {
                var i = this._getCursor();
                e ? (this._els.canvas.innerHTML = "", this._ps.forEach(e => {
                    this._els.canvas.appendChild(this._renderParagraph(e))
                })) : this._dirty.forEach(e => {
                    if (!(e >= this._ps.length)) {
                        var t = this._getParagraphElByIndex(e);
                        if (t) {
                            var i = this._renderParagraph(this._ps[e]);
                            t ? i.outerHTML != t.outerHTML && me(t, i) : this._els.canvas.appendChild(i)
                        }
                    }
                }), t && this._restoreCursor(i), this._decorateParagraphEls(), this._dirty = []
            }
            _getContainingParagraphEl(e) {
                for (; e && e.parentNode != this._els.canvas;) e = e.parentNode;
                var t = Object(r.r)(e);
                return [e, t, this._getParagraph(t)]
            }
            _getCurrentParagraphIndex() {
                var e = window.getSelection();
                if (e.rangeCount) {
                    var t = e.getRangeAt(0);
                    if (t.startContainer == this._els.canvas) return [t.startOffset, t.endOffset];
                    var i = K(this._getContainingParagraphEl(t.startContainer), 2)[1],
                        a = t.endContainer;
                    if (0 === t.endOffset && (this._isParagraphEl(a) || this._isParagraphEl(domPN(a)) && 0 == Object(r.f)(a))) {
                        var s = K(this._getContainingParagraphEl(a), 1)[0];
                        a = Object(R.B)(s) || s
                    }
                    var o = K(this._getContainingParagraphEl(a), 2)[1];
                    return [i, Math.max(i, o)]
                }
                return [0, !1]
            }
            _saveCursorMarker() {
                if (!this._markerCursorSet) {
                    var e = K(Object(r.u)(), 2),
                        t = e[0],
                        i = e[1];
                    if (!t) return [0, 0];
                    var a = t.startContainer,
                        s = t.startOffset,
                        o = t.endContainer,
                        n = t.endOffset;
                    if (a != this._els.canvas) {
                        var l = this._getContainingParagraphEl(a)[1];
                        d(a, s, r.c), i || (this._getContainingParagraphEl(o)[1] == l && o.textContent.includes(r.c) && (n += 1), d(o, n, r.b)), this._markerCursorSet = !0
                    }
                }

                function d(e, t, i) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var r = e.textContent;
                        e.textContent = r.substring(0, t) + i + r.substring(t)
                    } else {
                        var a = document.createTextNode(i);
                        e.insertBefore(a, e.childNodes[t])
                    }
                }
            }
            _restoreCursorFromMarker() {
                if (this._markerCursorSet) {
                    var e, t, i, a = (e, t, i) => (function t(a) {
                        if (a.nodeType == Node.TEXT_NODE) {
                            var s = a.textContent.indexOf(e);
                            if (s >= 0) {
                                a.textContent = a.textContent.split(e).join("");
                                var o = a.parentElement;
                                return -1 != o.innerHTML.search(/\s$/) && (o.innerHTML = o.innerHTML.trimRight() + r.d, i && i[0] == a && (i[0] = o.lastChild), a = o.lastChild), o.innerHTML || ((a = o).innerHTML = "<br/>", s = 0), [a, s]
                            }
                        } else
                            for (var n = 0, l = a.childNodes.length; n < l; n++) {
                                var d;
                                if (d = t(a.childNodes[n])) return d
                            }
                    })(t);
                    for (i = 0; i < this._els.canvas.children.length && !(e = a(r.c, this._els.canvas.children[i])); i++);
                    for (; i < this._els.canvas.children.length && !(t = a(r.b, this._els.canvas.children[i], e)); i++);
                    if (e) {
                        var s = document.createRange();
                        e[0].nodeType == Node.TEXT_NODE && (e[1] = Math.min(e[1], e[0].textContent.length)), s.setStart(e[0], e[1]), t && (t[0].nodeType == Node.TEXT_NODE && (t[1] = Math.min(t[1], t[0].textContent.length)), s.setEnd(t[0], t[1])), window.getSelection().setBaseAndExtent(s.startContainer, s.startOffset, s.endContainer, s.endOffset)
                    }
                    var o = e => {
                        this._ps.forEach(t => {
                            t.lines.forEach(t => {
                                var i = t.text.indexOf(e);
                                if (i >= 0) {
                                    t.text = t.text.replace(e, "");
                                    for (var r = 0, a = 0; a < t.brs.length; a++) t.brs[a] > i && (r = 1), t.brs[a] -= r;
                                    Y(Pe, (e, r) => {
                                        var a = t.decorations[r.type];
                                        if (a)
                                            for (var s = 0, o = a.length; s < o; s++) {
                                                var n = a[s];
                                                n[0] > i && (n[0] -= 1), n[1] > i && (n[1] -= 1)
                                            }
                                    })
                                }
                            })
                        })
                    };
                    o(r.c), o(r.b), this._markerCursorSet = !1
                }
            }
            _setAllParagraphsDirty() {
                this._dirty = [];
                for (var e = this._els.canvas.children.length, t = 0; t < e; t++) this._dirty.push(t);
                this._ps = []
            }
            _setCurrentParagraphDirty() {
                var e = K(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    i = e[1];
                this._setParagraphDirty(t, i)
            }
            setParagraphDirty(e, t) {
                this._setParagraphDirty(e, t)
            }
            _setParagraphDirty(e, t) {
                if (void 0 === e || e < 0) throw new Error("Invalid paragraph index");
                t = t || e;
                for (var i = e; i <= t; i++) inArray(i, this._dirty) || this._dirty.push(i)
            }
            _expandDoubleBRs() {
                function e(e, t, i) {
                    var a = e.lines[0];
                    void 0 === i && (i = a.text.length);
                    var s = [];
                    return a.brs.forEach(e => {
                        e < i && e > t && s.push(e - t)
                    }), Object(r.e)({
                        type: e.type,
                        lines: [{
                            text: a.text.substr(t, i - t),
                            decorations: Object(r.n)(a.decorations, t, i),
                            brs: s
                        }]
                    })
                }
                for (var t = !1, i = 0, a = this._ps.length; i < a; i++) {
                    var s = this._ps[i];
                    if (s.lines.length > 1) s.lines.forEach(r.h);
                    else {
                        var o = s.lines[0];
                        if (!o || !o.brs.length) continue;
                        for (var n = o.brs, l = [], d = 0, h = 0, c = n.length; h < c; h++)
                            if (d != n[h] && h > 0 && n[h - 1] == n[h]) {
                                var _ = e(s, d, n[h]);
                                Object(r.H)(_) || l.push(_), d = n[h]
                            }
                        l.push(e(s, d)), l.length > 1 && (Array.prototype.splice.apply(this._ps, [i, 1].concat(l)), i = i + l.length - 1, t = !0)
                    }
                }
                return t
            }
            _processAlienPhotos() {
                var e = this;
                if (!this._photoPasteUploadingProcess)
                    for (var t, i = Array.prototype.slice.call(this._els.canvas.children); t = i.shift();)
                        if (!Object(r.E)(t) || !this._isTrackedObjectEl(t))
                            for (var a = Array.prototype.slice.call(geByTag("img", t)), s = void 0, o = function() {
                                    if (!s.src || !domPN(t) || !isVisible(s)) return "continue";
                                    var i = _e(s, t => t == e._els.canvas || "FIGURE" == t.tagName, 10),
                                        a = !(!i || i == e._els.canvas) && X("figcaption", i),
                                        o = Object(r.e)({
                                            type: p.c.ObjectPhoto
                                        }),
                                        n = e._renderObjectParagraph(o, a ? a.innerHTML : "");
                                    Object(r.M)(t.textContent) ? (me(t, n), le(s), ve(de(`<p>${r.c}</p>`), n)) : (ve(n, domPN(s)), le(a), le(s)), _e(n, t => {
                                        if (t == e._els.canvas) return !0;
                                        ee(t, r.a)
                                    }), Object(r.Q)(s.src, (t, i, r) => {
                                        t ? (le(n), e._forgetObject(o._uuid), e._setAllParagraphsDirty(), e._triggerInputEvent(), r()) : e._getOrCreateParagraphObject(o).setBLOB(i, r)
                                    })
                                }; s = a.shift();) o()
            }
            _flattenAlienParagraphs() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t, i = Array.prototype.slice.call(this._els.canvas.children), a = this._fromPasteEvent, s = this._pasteCurrentIndex, o = K(this._getCurrentParagraphIndex(), 1)[0], n = -1, l = function() {
                            if (n++, a && !ge(t.textContent) && n > s && n <= o) return le(t), "continue";
                            var i = t;
                            Object(r.J)(t) && !Object(r.x)(t) && (i = t.firstChild);
                            var l = !1;
                            (function e(a) {
                                if (a && a.nodeType != Node.TEXT_NODE && !Object(r.y)(a))
                                    if (Object(r.v)(a))
                                        if (this._isTrackedObjectEl(a)) a != i && (he(a, t), l = !0);
                                        else
                                            for (var s, o = Array.prototype.slice.call(a.childNodes); s = o.shift();) e.call(this, s);
                                else a != i && (ge(a.innerHTML) && he(a, t), l = !0)
                            }).call(e, i, !0), l && le(t)
                        }; t = i.shift();) l();
                    this._setAllParagraphsDirty()
                }
            }
            _correctCaptionSelection() {
                var e = K(Object(r.u)(), 3),
                    t = e[0],
                    i = e[1],
                    a = e[2];
                if (t && !i) {
                    var s = _e(t.startContainer, e => "FIGCAPTION" == e.tagName, 5);
                    if (s && t.endContainer != t.startContainer && t.endContainer.nodeType == Node.ELEMENT_NODE && Object(r.G)(t.endContainer) && 0 == t.endOffset && 0 == t.startOffset) {
                        var o = q("article_ed__figcaption_edit", s),
                            n = t.cloneRange();
                        n.selectNodeContents(o), a.removeAllRanges(), a.addRange(n)
                    }
                }
            }
            cancelSaveDraft() {
                clearTimeout(this._draftSaveTO)
            }
            saveDraft(e, t, i) {
                if (!this.isLocked()) {
                    clearTimeout(this._draftSaveTO);
                    var r = JSON.stringify({
                        paragraphs: I(this._ps)
                    });
                    t ? this._lastSavedDraft = r : this._lastSavedDraft != r || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(() => {
                        if (this._lastSavedDraft = r, 0 != this._ps.length) {
                            var e = F(this._ps);
                            e ? this._options.onDraftNotSaved && this._options.onDraftNotSaved(e) : this.save(!1, (e, t, i) => {
                                this._initDraftSave = !0, this._options.onDraftSaved && this._options.onDraftSaved(e, t, i)
                            })
                        }
                    }, i ? 0 : 1e3 * this._options.draftSaveDelay)) : !t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
                }
            }
            _getName() {
                if (this._publishName) return this._publishName;
                var e = I(this._ps),
                    t = e.length ? e[0].lines[0].text : "";
                return Object(r.q)(t, this._options.maxNameLength)
            }
            getTitle() {
                var e = this._ps[0];
                return e ? e.lines[0].text : ""
            }
            isLimitsExceeded() {
                return !!F(this._ps)
            }
            save(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    a = I(this._ps, !1, !0);
                e && Object(r.k)(a, -1);
                var s = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && (i.from_post_convert = 1), i.session_duration = this.getTimeSpent(), $.save(this.getArticleOwnerId(), this.getArticleId(), a, e, s, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, i, (i, r, a, o, n, l) => {
                    if (isString(i) && i.startsWith("locked ")) return this.getOptions().editLockMessage = i.slice("locked ".length), this.showEditLockInfo(), void(t && t(!0));
                    i || (r && (this._options.articleId = r), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(pe({}, nav.objLoc, {
                        article_id: this.getArticleOwnerId() + "_" + this.getArticleId()
                    })), this._publishNameCandidate = s, e && (this._options.isPublished = !0, this.wasPublishedInCurrentSession = !0), this._options.monetizationAllowed = l, this._replaceVideos(n)), t && t(i, r, a, o)
                })
            }
            _replaceVideos() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    t = !1;
                try {
                    e.forEach(e => {
                        var i = K(e, 4),
                            r = i[0],
                            a = i[1],
                            s = i[2],
                            o = i[3];
                        this._ps.forEach((e, i) => {
                            if (e.type == p.c.ObjectVideo) {
                                var n = K(e.mediaId.split("_"), 3),
                                    l = n[0],
                                    d = n[1];
                                n[2] || l != r || d != a || (e.mediaId = `${s}_${o}`, this._setParagraphDirty(i), t = !0)
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
                Object(r.o)(this._getParagraphElByIndex(this._ps.length - 1))
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
                for (var t, i = Array.prototype.slice.call(this._els.canvas.children); t = i.shift();)
                    if (Object(r.J)(t)) {
                        var a = t.tagName,
                            s = Array.prototype.slice.call(t.children),
                            o = s[0];
                        if (1 == s.length && o && o.tagName && inArray(o.tagName, ["H1", "H2", "H3"])) {
                            me(t, o);
                            continue
                        }
                        if (s.shift(), s.length)
                            for (var n = void 0; n = s.shift();) {
                                if (this._saveCursorMarker(), e) ve(n, t);
                                else {
                                    var l = de(`<${a}></${a}>`);
                                    l.appendChild(n), ve(l, t)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }
            _ensureDummyParagraphs() {
                if (this._els.canvas) {
                    var e = this._els.canvas.lastChild;
                    if (e && (ge(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML || "H1" == e.tagName)) {
                        var t = Object(r.e)({});
                        this._els.canvas.appendChild(this._renderParagraph(t)), this._ps.push(t), this._updateTextPlaceholders()
                    }
                }
            }
            _ensureAtLeastOneParagraph() {
                0 == this._ps.length && (this._ps = [Object(r.e)({
                    type: p.c.Text
                })])
            }
            _ensureTitleParagraph() {
                if (!this._options.noTitle) {
                    var e = this._ps[0];
                    Object(r.D)(e) && (this._ps[0] = Object(r.e)({
                        type: p.c.Header1
                    })), e.type = p.c.Header1, e.lines[0].decorations = {}, e.lines[0].brs = [], delete e.sep
                }
                this._ps.forEach((e, t) => {
                    (this._options.noTitle || 0 != t) && (1 == t && e.type == p.c.Header1 && (e.type = p.c.Text), e.type == p.c.Header1 && (e.type = p.c.Header2))
                })
            }
            _insertParagraphAt(e, t) {
                this._ps.splice(e, 0, t)
            }
            _deleteParagraphFrom(e) {
                this._ps.splice(e, 1)
            }
            _focusParagraph(e, t) {
                Object(r.o)(this._getParagraphElByIndex(e), t)
            }
            _init() {
                this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._initResizeTooltip()
            }
            _redrawModel() {
                this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
            }
            addObjectAudio() {
                var e = K(this._getCurrentParagraphIndex(), 1)[0];
                this.getArticleOwnerId() < 0 && (V.audioAttachOriginalOwnerId = this.getArticleOwnerId(), V.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: (t, i, a, s) => {
                        Object(r.H)(this._ps[e]) || this._insertParagraphAt(e, Object(r.e)());
                        var o = Object(r.e)({
                            type: p.c.ObjectAudio,
                            mediaId: a.fullId
                        });
                        c.add(p.c.ObjectAudio, a.fullId, {
                            audio: s
                        }), this._getOrCreateParagraphObject(o), this._ps[e] = o, t.shiftKey || curBox().hide(), this._redrawModel();
                        var n = this._getParagraphElByIndex(e);
                        Object(r.o)(n), this.saveUndoStateAndDraft(), e++
                    },
                    onPlaylistChoose: (t, i) => {
                        var a = i.getOwnerId() + "_" + i.getPlaylistId() + (i.getAccessHash() ? "_" + i.getAccessHash() : ""),
                            s = Object(r.e)({
                                type: p.c.ObjectAudioPlaylist,
                                mediaId: a
                            });
                        c.add(p.c.ObjectAudioPlaylist, a, {
                            accessHash: i.getAccessHash()
                        }), this._getOrCreateParagraphObject(s), this._ps[e] = s, curBox().hide(), this._redrawModel();
                        var o = this._getParagraphElByIndex(e);
                        Object(r.o)(o), this.saveUndoStateAndDraft()
                    }
                })
            }
            closeAllCarouselEditors() {
                this._ps.forEach(e => {
                    e.type == p.c.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
                })
            }
            setMediaUploadMode(e) {
                this._isUploading = !!e, ue(this._els.editor, "article_ed__uploading", this._isUploading)
            }
            isMediaUploadMode() {
                return this._isUploading
            }
            addObjectVideo() {
                var e = K(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    i = Object(r.w)(t);
                delete t.sep, showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId(),
                    blockPersonal: 1
                }), V.chooseMedia = ((t, a, s, o, n) => {
                    var l = K(Object(p.f)(s.editable.sizes, this.getWidth()), 1)[0],
                        d = Object(r.e)({
                            type: p.c.ObjectVideo,
                            mediaId: a,
                            sep: i
                        });
                    i = !1, c.add(p.c.ObjectVideo, a, {
                        editable: s.editable,
                        thumb: l,
                        duration: s.editable.duration,
                        platform: s.editable.platform
                    }), this._getOrCreateParagraphObject(d), 0 == o ? this._ps[e] = d : this._ps.splice(e + o, 0, d), this._redrawModel(), this._saveUndoState();
                    var h = this._getParagraphElByIndex(e);
                    Object(r.o)(h), !n && curBox() && curBox().hide(), this.saveDraft()
                })
            }
            addObjectDoc() {
                var e = K(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    i = Object(r.w)(t);
                delete t.sep, V.docsCurFilter = "gif";
                var a = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                V.chooseMedia = ((t, s, o) => {
                    a.hide();
                    var n = Object(r.e)({
                        type: p.c.ObjectGIF,
                        mediaId: s,
                        sep: i
                    });
                    i = !1, c.add(p.c.ObjectGIF, s, {
                        video: o.video_preview,
                        size: o.video_preview_size,
                        href: o.href
                    }), this._getOrCreateParagraphObject(n), this._insertParagraphAt(e, n), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                }), V.showMediaProgress = (() => {})
            }
            addObjectPhoto() {
                var e, t, i = K(this._getCurrentParagraphIndex(), 1)[0],
                    a = this._getParagraph(i) || Object(r.e)(),
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
                V.onMediaUploadStarted = (() => {
                    var t = Object(r.e)({
                            type: p.c.ObjectPhoto
                        }),
                        a = this._renderObjectParagraph(t, ""),
                        s = this._getParagraphElByIndex(i);
                    he(a, s), Object(r.o)(s), e = a, this.setMediaUploadMode(!0)
                }), V.onMediaUploadFail = (() => {
                    delete V.onMediaUploadStarted, e && le(e), this.setMediaUploadMode(!1)
                });
                var o = -1;
                V.chooseMedia = ((n, l, d, h) => {
                    void 0 === h ? o++ : o = intval(h), delete V.onMediaUploadStarted, this.setMediaUploadMode(!1), e && le(e);
                    var _ = Object(r.e)({
                        type: p.c.ObjectPhoto,
                        mediaId: l,
                        sep: a.sep
                    });
                    return c.add(p.c.ObjectPhoto, l, {
                        size: Object(r.t)(d.editable.sizes),
                        sizes: d.editable.sizes
                    }), this._getOrCreateParagraphObject(_), o ? this._ps.splice(i + o, 0, _) : this._ps[i] = _, void 0 === h && s.hide(), clearTimeout(t), t = setTimeout(() => {
                        this._redrawModel(), this._focusParagraph(i + o), this._updateTextPlaceholders(), this.saveUndoStateAndDraft()
                    }, 10), !1
                }), V.showMediaProgress = (() => {})
            }
            addSeparator() {
                var e = K(this._getCurrentParagraphIndex(), 1)[0],
                    t = Object(r.w)(this._getParagraph(e)),
                    i = Object(r.w)(this._getParagraph(e + 1));
                !t && !i && e < this._ps.length - 1 && this._ps.splice(e, 1), this._getParagraph(e).sep = 1;
                var a = this._getCursor();
                this._redraw(!0), this._restoreCursor(a), this._updateTextPlaceholders()
            }
            addObjectPoll() {
                var e = K(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraph(e),
                    i = Object(r.w)(t);
                showBox("al_voting.php", {
                    act: "box",
                    owner_id: this.getArticleOwnerId(),
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                }), V.chooseMedia = ((t, a) => {
                    if (t && a) {
                        var s = Object(r.e)({
                            type: p.c.ObjectPoll,
                            mediaId: t,
                            sep: i
                        });
                        c.add(p.c.ObjectPoll, t, {
                            editable: !0,
                            snippet: a
                        }), i = !1, this._getOrCreateParagraphObject(s), this._insertParagraphAt(e, s), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                    }
                })
            }
            editObjectPoll(e) {
                var t = K(e.getMediaId().split("_"), 2),
                    i = t[0],
                    a = t[1],
                    s = K(this._getContainingParagraphEl(e.el()), 3),
                    o = s[1],
                    n = s[2],
                    l = Object(r.w)(n);
                showBox("al_voting.php", {
                    act: "box",
                    voting_id: a,
                    owner_id: i,
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                }), V.chooseMedia = ((t, i) => {
                    var a = e.getCaptionEl().innerHTML;
                    this._deleteParagraphFrom(o), this._forgetObject(n._uuid);
                    var s = Object(r.e)({
                        type: p.c.ObjectPoll,
                        mediaId: t,
                        sep: l
                    });
                    c.add(p.c.ObjectPoll, t, {
                        editable: !0,
                        snippet: i
                    }), l = !1;
                    var d = this._getOrCreateParagraphObject(s);
                    this._insertParagraphAt(o, s), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders(), d.setCaptionElHtml(a)
                })
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
                        this._objectPickerEl = de('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var e = "";
                        Object(W.b)("article_poll") && (e = '<button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_poll" onclick="cur.articleEditor.addObjectPoll()"></button>');
                        var t = de(`<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()"></button>\n        ${e}\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>`);
                        this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                            content: t,
                            forceSide: "right",
                            cls: "article_editor_object_picker_tt",
                            autoShow: !1,
                            elClassWhenShown: "article_editor_object_picker_tt_shown",
                            offset: [2, 0]
                        }), this._objectPickerEl.addEventListener("mousedown", e => cancelEvent(e))
                    }
                    var i = K(this._getCurrentParagraphIndex(), 2),
                        a = i[0],
                        s = i[1];
                    if (!this.isMediaUploadMode() && !1 !== a && a == s && Object(r.H)(this._ps[a], !0) && this._ps[a] && inArray(this._ps[a].type, [p.c.Text, p.c.Header2, p.c.Header3])) {
                        show(this._objectPickerEl);
                        var o = this._getParagraphElByIndex(a),
                            n = ne(this._els.editor),
                            l = ne(o)[1] - n[1],
                            d = !1;
                        this._uploadFloatList(), this._floatedObjects.forEach(e => {
                            e.startY <= l + 15 && e.endY + 30 >= l && (d = !0)
                        }), setStyle(this._objectPickerEl, {
                            left: d ? 355 : -40,
                            top: l
                        })
                    } else hide(this._objectPickerEl)
                }
            }
            _initLinksHrefTooltip() {
                this._els.canvas.addEventListener("mouseover", e => {
                    if ("a" == e.target.tagName.toLowerCase()) {
                        if (this._linkTooltip && this._linkTooltip.destroy(), this._formatTooltip && this._formatTooltip.isShown()) return;
                        var t = e.target,
                            i = t.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                            a = Object(r.m)(i);
                        Object(r.K)(i) || (i = "/away.php?to=" + encodeURIComponent(i) + "&utf=1"), this._linkTooltip = new ElementTooltip(t, {
                            cls: "article_editor_link_show_tt",
                            appendTo: this._els.editor,
                            content: de(`<a target="_blank" rel="noopener" href="${i}" class="article_editor_link">${a}</a>`)
                        })
                    }
                })
            }
            _isTrackedObjectEl(e) {
                var t = ae(e, "uuid");
                return !!t && !!this._getObject(t)
            }
            _cloneObjectParagraphs() {
                for (var e, t = Array.prototype.slice.call(this._els.canvas.children), i = {}; e = t.shift();)
                    if (Object(r.E)(e)) {
                        var a = e.getAttribute("data-uuid"),
                            s = parseInt(e.getAttribute("data-type"));
                        if (i[a]) {
                            var o = this._getObject(a);
                            a = Se(), this._getOrCreateParagraphObject({
                                type: s,
                                _uuid: a,
                                mediaId: o.getMediaId()
                            }), ae(e, "uuid", a)
                        }
                        i[a] = !0
                    }
            }
            _correctCursorToBeWithinCanvas() {
                var e = K(Object(r.u)(), 2),
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
                    t = K(Object(r.u)(), 2),
                    i = t[0],
                    a = t[1];
                if (!i) return !1;
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

                function o(t, i, a) {
                    i.nodeType == Node.TEXT_NODE ? t.textOffset = a : t.nodeOffset = a, _e(i, i => {
                        if (i == e) return !0;
                        Object(r.J)(i) && i.firstChild && i.firstChild.nodeType == Node.ELEMENT_NODE && "p" == i.firstChild.tagName.toLowerCase() && t.path.pop(), t.path.push(Object(r.f)(i))
                    }, 10), t.path = t.path.slice().reverse()
                }
                return o(s.start, i.startContainer, i.startOffset), a ? delete s.end : o(s.end, i.endContainer, i.endOffset), s.isEmpty = (() => !s.end && 0 == s.start.nodeOffset && 0 == s.start.path.length && 0 == s.start.path[0]), s
            }
            restoreCursor(e) {
                this._restoreCursor(e)
            }
            _restoreCursor(e) {
                if (!e) return this._restoreCursorFromMarker();
                var t = this._els.canvas;

                function i(e) {
                    var i = t,
                        a = 0;
                    return e.path.forEach((t, a) => {
                        if (Object(r.J)(i)) {
                            var s = i.firstChild;
                            s && 1 == a && s.nodeType == Node.ELEMENT_NODE && "p" == s.tagName.toLowerCase() && (i = s)
                        }
                        t = Math.min(i.childNodes.length - 1, t);
                        var o = i.childNodes[t];
                        if (!o) return e.nodeOffset = 0, !1;
                        i = o
                    }), a = i.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(i.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && i && i.children && (a = Math.min(e.nodeOffset, i.childNodes.length)), [i, a]
                }
                var a = document.createRange();
                try {
                    var s = K(i(e.start), 2),
                        o = s[0],
                        n = s[1];
                    if (Object(r.y)(o) && 0 == n) {
                        var l = domPN(o);
                        Object(r.G)(l) && 1 == l.childNodes.length && (o = l)
                    }
                    if (a.setStart(o, n), e.end) {
                        var d = K(i(e.end), 2),
                            h = d[0],
                            c = d[1];
                        a.setEnd(h, c)
                    }
                    window.getSelection().setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset)
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
                e ? (e = JSON.parse(e), this._restoreCursor(e)) : Object(r.o)(this._els.canvas.firstChild)
            }
            _toggleCodeBlocks() {
                for (var e, t = K(this._getCurrentParagraphIndex(), 2), i = t[0], r = t[1], a = i; a <= r; a++) void 0 === e && (e = this._ps[a].type != p.c.Code), this._ps[a].type = e ? p.c.Code : p.c.Text;
                var s = this._getCursor();
                this._redraw(!0), this._restoreCursor(s), this._updateTextPlaceholders()
            }
            _removeExtraSeparators() {
                for (var e, t = this._els.canvas.children, i = 0; i < t.length; i++) {
                    var r = t[i],
                        a = ae(r, "sep");
                    a && (void 0 !== e && a == e && ae(r, "sep", null), e = a)
                }
            }
            _replaceAlienInlineTags() {
                var e = !1,
                    t = {
                        b: "strong",
                        i: "em"
                    };
                return function i(r) {
                    var a = r.tagName.toLowerCase();
                    if (t[a]) {
                        e || (this._saveCursorMarker(), e = !0);
                        var s = ce(t[a], {
                            innerHTML: r.innerHTML
                        });
                        me(r, s)
                    } else
                        for (var o, n = Array.prototype.slice.call(r.childNodes); o = n.shift();) o.nodeType == Node.ELEMENT_NODE && i.call(this, o)
                }.call(this, this._els.canvas), e && this._restoreCursorFromMarker(), e
            }
            _cleanParagraphsBRs() {
                this._ps.forEach(e => {
                    e.lines.forEach(r.h)
                })
            }
            _initEvents() {
                if (!this.isLocked()) {
                    this._setEventListener(window, "scroll", () => {
                        var e = scrollGetY(),
                            t = window.innerHeight;
                        this._ps.forEach((i, a) => {
                            if (Object(r.D)(i)) {
                                var s = this._getParagraphElByIndex(a),
                                    o = oe(s),
                                    n = ne(s),
                                    l = n[1] < e + t && n[1] + o[1] > e;
                                i._object.onViewport && i._object.onViewport(l)
                            }
                        })
                    });
                    var e, t = 0;
                    this._setEventListener(document, "selectionchange", () => {
                        var i = K(Object(r.u)(), 2),
                            a = i[0],
                            o = i[1];
                        if (!a || _e(a.commonAncestorContainer, e => e == this._els.canvas)) {
                            var n = K(this._getCurrentParagraphIndex(), 1)[0];
                            if (!1 !== n) {
                                if (!o && ie(a.startContainer, "article")) {
                                    var l = this._ps[t];
                                    if (Object(r.D)(l)) return void Object(r.o)(l._object.getCaptionEl())
                                }
                                var d = a.startContainer;
                                if (Q.msie && o && be("article_ed__extra_controls", d) && "BUTTON" != d.tagName) {
                                    var h = this._ps[n];
                                    if (Object(r.D)(h)) return void h._object.getCaptionEl().focus()
                                }
                                t = n, this._highlightObjectsInCurrentSelection(), this._showObjectPicker(), this._correctCaptionSelection(), this._ensureDummyParagraphs(), 0 == s && this._showFormatTooltip(), this._saveLastCursor();
                                var c = this._getParagraph(n);
                                Object(r.D)(c) && p.d.includes(parseInt(c.type)) ? this._resizeTooltip && (clearTimeout(e), e = setTimeout(() => {
                                    this._showResizeTooltip()
                                }, 100)) : this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()
                            } else this._showObjectPicker()
                        } else this._showObjectPicker()
                    });
                    var i = !1,
                        a = !1,
                        s = !1;
                    this._els.canvas.addEventListener("mousedown", () => {
                        var e;
                        s = !0, this._setEventListener(window, "mouseup", e = (t => {
                            s = !1, "article_format_btn_link" == t.target.id || (this._showFormatTooltip(), e && window.removeEventListener("mouseup", e))
                        }))
                    }), this._els.canvas.addEventListener("selectstart", () => {
                        this._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", e => {
                        var t = K(Object(r.u)(), 2),
                            i = t[0];
                        if (t[1]) {
                            var a = K(this._getContainingParagraphEl(i.commonAncestorContainer), 1)[0];
                            Object(r.E)(a) && (e.clipboardData.setData("text/plain", "uuid:" + a.getAttribute("data-uuid")), e.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", e => {
                        var t = K(this._getCurrentParagraphIndex(), 1)[0];
                        t && (this._handleObjectPaste(e), this._handleLinkPaste(e), this._handlePhotoPaste(e), this._fromPasteEvent = !0, this._pasteCurrentIndex = t)
                    }), this._els.canvas.addEventListener("click", e => {
                        if (e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName) return cancelEvent(e)
                    });
                    var o = !1;
                    this._els.canvas.addEventListener("input", () => {
                        this._hideObjectPicker(), this._expandBlockquoteParagraphs(d), this._removeExtraSeparators();
                        var e, t = this._replaceAlienInlineTags();
                        Q.safari || this._els.canvas.normalize(), this._fromPasteEvent || t || this._markerCursorSet ? this._saveCursorMarker() : e = this._getCursor(), this._processAlienPhotos(), this._flattenAlienParagraphs(), this._cloneObjectParagraphs(), this._ps.length > 0 && this._els.canvas.children.length !== this._ps.length && this._setAllParagraphsDirty(), this._dirty.forEach(this._updateLineData.bind(this)), o && (this._cleanParagraphsBRs(), o = !1), this._ensureAtLeastOneParagraph(), this._ensureTitleParagraph();
                        var r = !1;
                        if (this._fromPasteEvent) try {
                            r = this._expandDoubleBRs()
                        } catch (e) {
                            console.error(e)
                        }
                        this._redraw(r), this._restoreCursor(e), this._correctCursorToBeWithinCanvas(), this._dirty = [], a ? this._saveUndoStateDelayed() : this._saveUndoState(), i = a = !1, this._fromPasteEvent = !1, this._updateTextPlaceholders(), this.saveDraft(), this._undoable = !0, this._options.onUndoRedo && this._options.onUndoRedo()
                    });
                    var n, l = !1,
                        d = !1,
                        h = 1;
                    this._els.canvas.addEventListener("keydown", e => {
                        var t = e.keyCode,
                            s = e.metaKey || e.ctrlKey,
                            c = e.shiftKey,
                            _ = K(Object(r.u)(), 2),
                            u = _[0],
                            g = _[1];
                        if (u) {
                            var v = K(this._getCurrentParagraphIndex(), 2),
                                b = v[0],
                                f = v[1],
                                m = this._getParagraph(b),
                                y = !1;
                            if (Object(r.D)(m) && (y = m._object.isCaptionFocused() ? 0 == u.startOffset && g : K(this._getContainingParagraphEl(u.startContainer), 1)[0] == m._object.el()), y && g && Q.mozilla) {
                                if (t == Oe.Up) return this._focusParagraph(b - 1, !0), cancelEvent(e);
                                if (t == Oe.Down) return this._focusParagraph(b + 1, !0), cancelEvent(e)
                            }
                            if ((t == Oe.Delete || t == Oe.Backspace) && this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide(), t == Oe.Tab && g && 0 == b) return Object(r.o)(this._getParagraphElByIndex(1)), cancelEvent(e);
                            if (s && t == Oe.KeyA && Object(r.D)(m) && m._object.isCaptionFocused()) {
                                var j = m._object.getCaptionEl();
                                return Object(r.S)(j), cancelEvent(e)
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
                            var C = t == Oe.KeyC && e.altKey,
                                E = m ? m.type : p.c.Text,
                                O = Object(R.V)("pre", u.startContainer),
                                P = !!(O || Object(R.V)("pre", u.endContainer) || u.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == u.startContainer.tagName);
                            if (C) {
                                if (E === p.c.Header1) return cancelEvent(e);
                                if (g) return this._toggleCodeBlocks(), cancelEvent(e);
                                if (!P && inArray(E, [p.c.Text, p.c.NumericList, p.c.BulletList])) {
                                    this._setCurrentParagraphDirty();
                                    var w = Object(R.V)("code", u.startContainer) || Object(R.V)("code", u.endContainer);
                                    if (w) {
                                        this._saveCursorMarker();
                                        var T = de("<span></span>");
                                        T.innerHTML = w.innerHTML, me(w, T), this._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), Q.msie && this._triggerInputEvent();
                                    return cancelEvent(e)
                                }
                            }
                            if (t == Oe.Tab && P && E == p.c.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(e);
                            var I = !1;
                            if (t == Oe.Backspace) {
                                if (l) return l[0].textContent = l[1], this._restoreCursor(l[2]), l = !1, cancelEvent(e);
                                if (y) {
                                    var k = this._getParagraphElByIndex(b),
                                        S = Object(r.l)("", Object(r.w)(m));
                                    return this._correctEmptyParagraphAfterFloatObjects(), me(k, S), Object(r.o)(S), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                }
                                if (u && 0 == u.startOffset && u.collapsed) {
                                    var L = Object(R.V)("li", u.startContainer),
                                        M = Object(r.r)(L);
                                    if (L) {
                                        var D = this._ps[b],
                                            A = clone(D),
                                            N = clone(D);
                                        A.lines = A.lines.slice(0, M);
                                        var B = Object(r.e)({
                                            lines: [clone(D.lines[M])]
                                        });
                                        N.lines = N.lines.slice(M + 1), this._ps.splice(b, 1, A, B, N), this._redraw(!0);
                                        var H = this._getParagraphElByIndex(b + 1);
                                        return Object(r.o)(H), this._saveUndoState(), cancelEvent(e)
                                    }
                                }
                                if (u && g && 0 == u.startOffset && "LI" !== u.startContainer.nodeName) {
                                    var U = K(this._getCurrentParagraphIndex(), 1)[0],
                                        z = U > 0 && this._ps[U - 1];
                                    if (Object(r.D)(z)) {
                                        Object(r.H)(this._ps[U]) && (this._ps.splice(U, 1), this._redraw(!0));
                                        var F = this._getParagraphElByIndex(U - 1);
                                        return Object(r.o)(F), cancelEvent(e)
                                    }
                                }
                                this._setAllParagraphsDirty(), Q.msie && setTimeout(() => {
                                    this._triggerInputEvent()
                                })
                            }
                            if (t == Oe.Delete) {
                                var $ = this._ps[b],
                                    W = this._ps[b + 1],
                                    G = K(getCaretCharacterOffsetWithin(u.startContainer), 1)[0],
                                    V = u.startContainer.textContent.length == G;
                                if (y && (!$._object.isCaptionFocused() || !$.lines[0].text)) {
                                    var J = this._getParagraphElByIndex(b),
                                        X = Object(r.l)();
                                    return me(J, X), Object(r.o)(X), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                }
                                if (g && Object(r.w)(W) && V) return this._setParagraphDirty(b + 1), delete W.sep, this._redraw(!1, !0), cancelEvent(e);
                                if (g && V && Object(r.D)(W)) return Object(r.H)($) && $.type != p.c.Header1 && (this._ps.splice(b, 1), this._redraw(!0, !0)), Object(r.o)(W._object.getCaptionEl()), cancelEvent(e);
                                W && Object(r.H)($) && inArray(W.type, [p.c.Header2, p.c.Header3]) && ($.type = W.type, this._setParagraphDirty(b), this._redraw()), this._setAllParagraphsDirty(), (Q.msie && 0 == u.startOffset && 0 == b || c) && setTimeout(() => {
                                    this._setCurrentParagraphDirty(), this._triggerInputEvent()
                                })
                            } else if (t == Oe.Enter) {
                                if (P && O && E == p.c.Code && g) {
                                    var q = O.textContent.search(/[^\s]/);
                                    return -1 == q && (q = O.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(q)), cancelEvent(e)
                                }
                                if (this._isWithinObjectParagraphEl(Object(r.s)())) {
                                    var Z = K(this._getContainingParagraphEl(Object(r.s)()), 2),
                                        ee = Z[0],
                                        ie = Z[1],
                                        re = Object(r.l)(),
                                        ae = this._ps[ie]._object;
                                    return !ae.isCaptioned() || ae.isCaptionFocused() ? ve(re, ee) : he(re, ee), this._setAllParagraphsDirty(), Object(r.o)(re), this._triggerInputEvent(), cancelEvent(e)
                                }
                                var se = K(this._getContainingParagraphEl(Object(r.s)()), 3),
                                    oe = se[0],
                                    ne = (se[1], se[2]),
                                    le = K(getCaretCharacterOffsetWithin(oe), 2)[1];
                                if (e.shiftKey || e.ctrlKey && Q.safari) {
                                    var ce = K(getCaretCharacterOffsetWithin(oe), 2)[1],
                                        _e = te("li", u.startContainer),
                                        pe = 0;
                                    _e && (pe = Ce(_e));
                                    var ue = !1;
                                    if (Y(ne.lines, (e, t) => {
                                            var i = t.brs,
                                                r = t.text.length;
                                            return 0 == ce || ce <= r && inArray(ce, i) ? (ue = !0, !1) : !((ce -= r) <= 0 && e == pe) && void 0
                                        }), ue) {
                                        o = !0, this._setParagraphDirty(b, f), document.execCommand("insertParagraph");
                                        var ge = Ee(oe);
                                        return ge && (Object(r.o)(ge), ge.focus()), this._triggerInputEvent(), cancelEvent(e)
                                    }
                                    Q.msie && 0 == ce && u.insertNode(de("<br>"))
                                }
                                var be = g && u.startContainer.nodeType == Node.TEXT_NODE && !u.startContainer.nextSibling && le == oe.textContent.length;
                                d = be && !Object(r.C)(this._ps[b]) && !e.shiftKey && inArray(ne.type, [p.c.Quote, p.c.Quote2]), window.browser && window.browser.msie && setTimeout(this._triggerInputEvent.bind(this)), this._setParagraphDirty(b, f)
                            } else e.key && 1 == e.key.length && (this._setParagraphDirty(b), this._setParagraphDirty(f), e.metaKey || (I = !0, e.key && (Object(r.z)(e.key) ? h += 1 : Object(r.B)(e.key) && (h -= 1), h = Math.min(Math.max(h, -5), 5))), i = Object(r.L)(e.key), I && !i && (a = !0), setTimeout(() => {
                                var e = K(Object(r.u)(), 2),
                                    t = e[0],
                                    i = e[1],
                                    a = this._getParagraph(b);
                                if (a && a.type != p.c.Code && !(Object(R.V)("code", t.startContainer) || t.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == t.startContainer.tagName) && (n = n || h > 0, i && t)) {
                                    var s = t.startContainer;
                                    if (s.nodeType == Node.TEXT_NODE && t.startOffset > 0)
                                        for (var o = s.textContent.substring(t.startOffset - 5, t.startOffset), d = 0, c = x.length; d < c; d++) {
                                            var _ = x[d];
                                            if (void 0 === _.cyrillic || _.cyrillic === n)
                                                if (_.pattern instanceof RegExp) {
                                                    var u = o.match(_.pattern);
                                                    if (u) {
                                                        var g = _.substitution;
                                                        u.length > 1 && (g = g.replace("$1", u[1])), v.call(this, t.startOffset, s, u[0], g, _.noUndo);
                                                        break
                                                    }
                                                } else if (o.endsWith(_.pattern)) {
                                                v.call(this, t.startOffset, s, _.pattern, _.substitution, _.noUndo);
                                                break
                                            }
                                        }
                                }

                                function v(e, t, i, r, a) {
                                    var s = this._getCursor(),
                                        o = t.textContent.substring(0, e - i.length),
                                        n = t.textContent.substring(e);
                                    a || (l = [t, o + i + n, s]), t.textContent = o + r + n, this._restoreCursor(s), this._setParagraphDirty(b), this._triggerInputEvent()
                                }
                            }, 0));
                            l = !1
                        }
                    }), this._setEventListener(window, "resize", () => {
                        this._resizeTooltip && this._resizeTooltip.isShown() && this._updatePositionResizeTooltip()
                    })
                }
            }
            _isParagraphEl(e) {
                return e && ie(e, r.a)
            }
            _isWithinObjectParagraphEl(e) {
                var t = K(this._getContainingParagraphEl(e), 1)[0];
                return t && Object(r.E)(t)
            }
            _highlightObjectsInCurrentSelection() {
                var e = K(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    i = e[1];
                !1 !== t && !1 !== i && this._ps.forEach((e, r) => {
                    if (e._object) {
                        var a = t != i;
                        e._object.highlight(r >= t && r <= i, a)
                    }
                })
            }
            _getOrCreateParagraphObject(e) {
                e._uuid || (e._uuid = Se());
                var t = this._getObject(e._uuid);
                if (!t) {
                    var i = e.mediaId || "";
                    switch (parseInt(e.type)) {
                        case p.c.ObjectPhoto:
                            t = new y(i, this, e);
                            break;
                        case p.c.ObjectVideo:
                            t = new j(i, this);
                            break;
                        case p.c.ObjectGIF:
                            t = new C(i, this);
                            break;
                        case p.c.ObjectAudio:
                            t = new P(i, this);
                            break;
                        case p.c.ObjectAudioPlaylist:
                            t = new g(i, this);
                            break;
                        case p.c.ObjectPodcast:
                            t = new O(i, this);
                            break;
                        case p.c.ObjectTwitter:
                            t = new S(i, this);
                            break;
                        case p.c.ObjectInstagram:
                            t = new D(i, this);
                            break;
                        case p.c.ObjectFacebook:
                            t = new M(i, this);
                            break;
                        case p.c.ObjectVK:
                            t = new N(i, this);
                            break;
                        case p.c.ObjectTelegram:
                            t = new H(i, this);
                            break;
                        case p.c.ObjectPoll:
                            t = new z(i, this)
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
                        var i = K(Object(r.O)(t), 3),
                            a = i[0],
                            s = i[1],
                            o = i[2],
                            n = this._getObject(s);
                        if (!n) return;
                        var l = Object(r.e)();
                        if (n.getCaptionEl()) {
                            var d = this._getParagraphFromHTML("", n.getCaptionEl().innerHTML, !0);
                            if (a == p.c.ObjectPhoto) {
                                var h = ae(n.el(), "paragraph-lines");
                                h && (l.lines = JSON.parse(h));
                                var c = n.getImageIndex();
                                l.lines[c] = d.lines[0];
                                for (var _ = 0; _ < l.lines.length; _++) l.lines[_] = l.lines[_] || {
                                    text: "",
                                    decorations: {}
                                }
                            } else l.lines[0] = d.lines[0]
                        }
                        l.type = a, l.mode = o, l._uuid = s, l._object = n, this._ps[e] = l
                    } else if (t.nodeType == Node.ELEMENT_NODE) {
                        var u = t.tagName.toLowerCase();
                        this._ps[e] = this._getParagraphFromHTML(u, t.innerHTML)
                    } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent);
                    t.nodeType == Node.ELEMENT_NODE && ae(t, "sep") && (this._ps[e].sep = !0)
                }
            }
            onDragEnd() {
                this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
            }
            getCurrentParagraphs() {
                var e = K(this._getCurrentParagraphIndex(), 2),
                    t = e[0],
                    i = e[1];
                return [this._getParagraphElByIndex(t), this._getParagraphElByIndex(i)]
            }
            _initObjectDrag() {
                var e, t, i, a, s, o = !1,
                    n = this._els;

                function l(e) {
                    s != e && (Y(geByClass("article_ed__drag_hovered"), (e, t) => {
                        ee(t, "article_ed__drag_hovered")
                    }), e && J(e, "article_ed__drag_hovered"), s = e)
                }

                function d() {
                    window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t), o = !1, ee(n.canvas, "no_select"), clearInterval(a), l(!1), le(i), i = !1
                }
                this._els.canvas.addEventListener("mousedown", s => {
                    if (i && le(i), 2 == s.button) return d(), cancelEvent(s);
                    var n = oe(this._els.canvas)[1];
                    ee(this._els.canvas, "no_select"), l(!1);
                    var h = K(this._getContainingParagraphEl(s.target), 3),
                        c = h[0],
                        _ = h[1],
                        p = h[2];
                    if (Object(r.D)(p)) {
                        var u, g, v, b, f, m = s.pageY;
                        window.addEventListener("mousemove", e = (e => {
                            if (i || !(Math.abs(m - e.pageY) < 10)) {
                                i || (i = de('<div class="article_ed__drag_shadow"></div>'), this._els.editor.appendChild(i), (u = ne(this._els.canvas))[1] -= scrollGetY(), g = oe(c), v = ne(c), b = e.pageX - v[0], f = e.pageY - v[1] + this._options.layer.scrollTop, setStyle(i, {
                                    width: g[0],
                                    height: g[1]
                                }), this._focusParagraph(_)), J(this._els.canvas, "no_select"), u || d(), setStyle(i, {
                                    left: e.pageX - u[0] - b,
                                    top: e.pageY - scrollGetY() - f - u[1] + this._options.layer.scrollTop
                                }), clearInterval(a), e.pageY - scrollGetY() < 200 ? a = setInterval(() => {
                                    this._options.layer.scrollTop -= 10
                                }, 10) : e.pageY - scrollGetY() > window.innerHeight - 200 && (a = setInterval(() => {
                                    this._options.layer.scrollTop + window.innerHeight > n + 300 ? clearInterval(a) : this._options.layer.scrollTop += 10
                                }, 10));
                                var t = K(this._getContainingParagraphEl(e.target), 2),
                                    r = t[0],
                                    s = t[1];
                                r && r != c && r != Object(R.B)(c) ? (l(r), o = s) : (l(!1), o = !1)
                            }
                        })), window.addEventListener("mouseup", t = (() => {
                            !1 !== o && _ && (this._ps.splice(_, 1), Object(r.w)(p) && (this._ps[_].sep = 1, delete p.sep), this._ps.splice(o + 1, 0, p), this._redraw(!0, !0), this.saveUndoStateAndDraft(), this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()), d()
                        }))
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
                t && !e && (ee(this._els.editor, "article_ed__warn_shown"), le(t)), t || e && (t = de(`<div class="article_ed__warn_info">${e}</div>`), this._els.editor.appendChild(t), J(this._els.editor, "article_ed__warn_shown"))
            }
            _initResizeTooltip() {
                var e = de('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
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
                var e = K(this._getCurrentParagraphIndex(), 1)[0],
                    t = this._getParagraphElByIndex(e),
                    i = this._getParagraph(e),
                    r = intval(i.type);
                if (p.d.includes(r))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), ie(t, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else if (i._object.isLoading()) this._resizeTooltip.hide();
                else {
                    var a = [{
                            id: p.b.Float,
                            type: "inline"
                        }, {
                            id: p.b.Normal,
                            type: "text"
                        }, {
                            id: p.b.Medium,
                            type: "bigger"
                        }, {
                            id: p.b.Large,
                            type: "cover"
                        }],
                        s = q("resize-tooltip__btns"),
                        o = [1, 1, 1, 1];
                    switch (r) {
                        case p.c.ObjectPhoto:
                            i._object._isCarousel() ? o = [0, 1, 1, 0] : i._object._isSmallPhotoSize() || (o = [1, 1, 0, 0]);
                            break;
                        case p.c.ObjectGIF:
                            i._object._isSmallGifSize() || (o = [1, 1, 0, 0]);
                            break;
                        case p.c.ObjectTwitter:
                        case p.c.ObjectFacebook:
                        case p.c.ObjectInstagram:
                        case p.c.ObjectVK:
                        case p.c.ObjectTelegram:
                            o = [1, 1, 0, 0]
                    }
                    s.innerHTML = "", a.forEach((e, t) => {
                        o[t] && s.appendChild(de(`\n          <button class="article_format_btn${i.mode==e.id||!i.mode&&!e.id?" article_format_btn_active":""}" id="article_format_btn_${e.type}"  data-mode=${e.id} ></button>\n        `))
                    }), this._updatePositionResizeTooltip()
                }
            }
            _updatePositionResizeTooltip() {
                var e = this._resizeTooltip,
                    t = K(ne(this._els.editor), 2)[1],
                    i = K(this._getCurrentParagraphIndex(), 1)[0],
                    r = this._getParagraphElByIndex(i).getBoundingClientRect(),
                    a = r.top,
                    s = r.left,
                    o = r.width,
                    n = oe(e._ttel)[0] / 2;
                setStyle(e._ttel, {
                    top: a - t - 60 + window.scrollY + 140,
                    left: s + o / 2 - n
                })
            }
            setModeObject(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p.b.Normal,
                    i = this._getParagraph(e);
                Object(r.D)(i) && (i.mode = t, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
            }
            setModeCurrentObject() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p.b.Normal,
                    t = K(this._getCurrentParagraphIndex(), 1)[0];
                this.setModeObject(t, e)
            }
            _uploadFloatList() {
                var e = ne(this._els.editor);
                this._floatedObjects = [], this._ps.forEach((t, i) => {
                    if (t.mode && parseInt(t.mode) === p.b.Float) {
                        var r = this._getParagraphElByIndex(i),
                            a = r.getBoundingClientRect().height,
                            s = ne(r);
                        this._floatedObjects.push({
                            startY: s[1] - e[1],
                            endY: s[1] - e[1] + a
                        })
                    }
                })
            }
            _correctEmptyParagraphAfterFloatObjects() {
                for (var e = 0; e < this._ps.length; e++) {
                    var t = this._ps[e],
                        i = this._ps[e + 1];
                    if (Object(r.F)(t) >= 0)
                        if (1 === parseInt(t.mode) && Object(r.D)(i)) {
                            var a = Object(r.e)();
                            a._autoInsert = !0, this._insertParagraphAt(e + 1, a)
                        } else 1 !== parseInt(t.mode) && i && i._autoInsert && this._deleteParagraphFrom(e + 1)
                }
            }
        }, stManager.done(jsc("web/article.js"))
    }
});