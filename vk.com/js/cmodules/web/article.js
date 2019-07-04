! function(e) {
    function t(t) {
        for (var a, o, n = t[0], l = t[1], d = t[2], c = 0, _ = []; c < n.length; c++) o = n[c], r[o] && _.push(r[o][0]), r[o] = 0;
        for (a in l) Object.prototype.hasOwnProperty.call(l, a) && (e[a] = l[a]);
        for (h && h(t); _.length;) _.shift()();
        return s.push.apply(s, d || []), i()
    }

    function i() {
        for (var e, t = 0; t < s.length; t++) {
            for (var i = s[t], a = !0, n = 1; n < i.length; n++) {
                var l = i[n];
                0 !== r[l] && (a = !1)
            }
            a && (s.splice(t--, 1), e = o(o.s = i[0]))
        }
        return e
    }
    var a = {},
        r = {
            "web/article": 0
        },
        s = [];

    function o(t) {
        if (a[t]) return a[t].exports;
        var i = a[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = a, o.d = function(e, t, i) {
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
            for (var a in e) o.d(i, a, function(t) {
                return e[t]
            }.bind(null, a));
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
    s.push([66, "bundles/common", "bundles/6deb4edfcbfb465064078145a4a266bf"]), i()
}({
    66: function(e, t, i) {
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
        i("Oyvg"), i("fA63"), i("OG14"), i("rGqo"), i("Btvt"), i("tUrg"), i("FEjr"), i("SRfc"), i("KKXr"), i("pIFo");
        var a, r = i("u2Gu"),
            {
                domReplaceEl: s
            } = window,
            o = window.browser && (browser.mozilla || browser.safari);
        class n {
            constructor(e, t, i) {
                this._mediaId = e, this._editor = t, this._highlighted = !1, this._isCaptioned = !!i, a = this.getEditor().getOptions().multiMediasSeparator
            }
            isCaptioned() {
                return this._isCaptioned
            }
            getEditor() {
                return this._editor
            }
            getMediaIdsCount() {
                return this._mediaId.split(a).length
            }
            getMediaId(e) {
                return void 0 !== e ? this._mediaId.split(a)[e] : this._mediaId
            }
            setMediaId(e) {
                this._mediaId = e
            }
            highlight(e = !1, t = !1) {
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
                if (t) s(t, e);
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
                        var n = se('<div class="article_ed__img_wrapper"></div>'),
                            l = se('<div class="article_ed__img_inner"></div>');
                        a.setAttribute("contenteditable", "false"), addClass(a, "article_ed__extra_controls"), l.appendChild(a), n.appendChild(l), this._objectEl.appendChild(n), this.appendObjectInnerEl()
                    } else this._objectEl.appendChild(e);
                    s && this._objectEl.appendChild(s), this._isCaptioned && (this._captionEl = se(`<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="${t}"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">${getLang("pages_article_figure_placeholder")}</div>\n        </figcaption>`), this._objectEl.appendChild(this._captionEl)), o && e.addEventListener("click", () => {
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
            setLoadingState(e = !1, t = !1) {
                !!this._isLoading != e && (this._isLoading = e, this._setLoadingEl(t), toggleClass(this._objectEl, "article_ed__object_loading", e), e || this.getEditor().onObjectStateLoaded(this))
            }
            isLoading() {
                return !!this._isLoading
            }
            _setLoadingEl(e = !1) {
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
                var [e, t] = Object(r.u)(), i = e => {
                    var t = this._captionEl;
                    return !!traverseParent(e, e => e == t, 10)
                };
                if (t) return i(e.startContainer);
                var a = i(e.startContainer),
                    s = i(e.endContainer);
                return a && s
            }
            loadErrorHandler(e) {
                this.setLoadingState(!1), addClass(this._objectEl, "article_paragraph_err"), e.appendChild(this.renderLoadErr())
            }
        }
        var l = {};

        function d(e) {
            return `${(e=e.split("_"))[0]}_${e[1]}`
        }
        class h {
            static add(e, t, i) {
                l[e] = l[e] || {}, l[e][d(t)] = i
            }
            static get(e, t, i) {
                return void 0 !== i && (t = (t = t.split(","))[i]), l[e] = l[e] || {}, l[e][d(t)]
            }
        }
        var c, _ = i("sWID");
        class p extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = h.get(_.b.ObjectAudioPlaylist, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var [t, i] = this.getMediaId().split("_");
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_audioplaylist_snippet",
                        pl_owner_id: t,
                        pl_id: i,
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

        function g(e, t) {
            return e ? `<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="${t}">\n      <div class="article_ed__caredit_photo" style="background-image: url(${e})"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>` : `<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">${getLang("pages_article_ed_carousel_add")}</div>\n    </button>`
        }
        class u {
            constructor(e, t, i, a) {
                var r = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                r += `\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ${getLang("pages_article_ed_carousel_title")}\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">${getLang("global_save")}</button>\n            <button class="flat_button article_ed__caredit_cancel">${getLang("global_cancel")}</button>\n          </div>\n         </div>\n      </div>\n    `, r += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', t.getMediaId().split(",").forEach(e => {
                    var t = h.get(_.b.ObjectPhoto, e),
                        [i] = Object(_.e)(t.sizes, 251);
                    r += g(i, e)
                }), r += g(), r += "  </div>", r += "</div>", r += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(r), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", () => {
                    showBox("al_photos.php", {
                        to_id: t.getEditor().getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: this._limit - this._medias.length,
                        article: 1
                    }, {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"]
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
                }), this._limit = a, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
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
                    h.add(_.b.ObjectPhoto, t, {
                        size: Object(r.t)(i.editable.sizes),
                        sizes: i.editable.sizes
                    });
                    var [s] = Object(_.e)(i.editable.sizes, 251);
                    domInsertBefore(se(g(s, t)), this._els.addButton)
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
        class b extends n {
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
                    a = geByClass1("article_ed__carousel_nav_btn_right", e),
                    r = () => {
                        var e = this.getMediaIdsCount() > 1;
                        t.innerHTML = e ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                    };
                return r(), t.addEventListener("click", t => {
                    var i = this.getEditor();
                    return i.closeAllCarouselEditors(), i._resizeTooltip && i._resizeTooltip.hide(), addClass(this._objectEl, "article_ed__carousel_edit_open"), this._carouselEditor = new u(e, this, t => {
                        t ? (delete this._fixedImageSize, this.setMediaId(t), this.appendObjectInnerEl(), this.getEditor().saveUndoStateAndDraft(), r(), this._setImageIndex(0, e), removeClass(this._objectEl, "article_ed__carousel_edit_open"), delete this._carouselEditor) : this.getEditor().removeObject(this)
                    }, this.getEditor().getLimits().maxCarouselItems), cancelEvent(t)
                }), i.addEventListener("click", () => {
                    this._onCarouselNavBtnClicked(!0)
                }), a.addEventListener("click", () => {
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
                var e = h.get(_.b.ObjectPhoto, this.getMediaId(), 0);
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
                                    this._mediaId = e, h.add(_.b.ObjectPhoto, e, {
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
                var e = h.get(_.b.ObjectPhoto, this.getMediaId(), this.getImageIndex()),
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
                    var [i] = Object(_.e)(e.sizes, t), a = this._getImageEl(), r = !1;
                    a.onload = (() => {
                        clearTimeout(c), r = !0, setStyle(a, "visibility", "visible"), show(a), this.setLoadingState(!1), this._isCarousel() && this._fixSize()
                    }), a.src = i, clearTimeout(c), r || (c = setTimeout(() => {
                        r || (setStyle(a, "visibility", "hidden"), this.setLoadingState(!0, this._isCarousel()))
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
                var e = h.get(_.b.ObjectPhoto, this.getMediaId(), 0);
                return !(!e && !e.size) && e.size[0] >= 720
            }
        }
        class v extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var e = h.get(_.b.ObjectVideo, this.getMediaId());
                if (e && (e.editable || e.thumb)) {
                    var t;
                    if (e.thumb) t = e.thumb;
                    else t = Object(_.e)(e.editable.sizes, this.getEditor().getWidth(!0))[0];
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
        class f extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_ed__gif_content"></div>\n    ');
                var e = h.get(_.b.ObjectGIF, this.getMediaId());
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
                    var a = e.href + "&wnd=1&module=" + cur.module;
                    this._imgEl = ce("img"), this._imgEl.addEventListener("error", () => {
                        showFastBox(getLang("pages_article_error_box_title"), getLang("pages_article_error_box_text")), this._editor.removeObject(this)
                    }), this._imgEl.src = a, this._el.appendChild(this._imgEl)
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
                var e = h.get(_.b.ObjectGIF, this.getMediaId());
                return !(!e || !e.size) && e.size[0] > this.getEditor().getOptions().minGifWidthExpand
            }
        }
        class m extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_audio"></div>\n    ');
                var e = h.get(_.b.ObjectPodcast, this.getMediaId());
                if (e.snippet) this._el.innerHTML = e.snippet;
                else {
                    var [t, i] = this.getMediaId().split("_");
                    this.setLoadingState(!0), ajax.post("al_articles.php", {
                        act: "get_podcast_snippet",
                        owner_id: t,
                        podcast_id: i
                    }, {
                        onDone: e => {
                            this.setLoadingState(!1), this._el.appendChild(se(e))
                        }
                    })
                }
                return this._el.appendChild(se(`<div class="article_ed__audioplaylist_play_note" contenteditable="false">${getLang("pages_articles_editor_audio_play_note")}</div>`)), this._el
            }
        }
        class j extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var e = h.get(_.b.ObjectAudio, this.getMediaId()).audio,
                    t = AudioUtils.drawAudio(e);
                return this._el = se(`\n      <div class="article_object_audio">${t}</div>\n    `), this._el
            }
        }
        var C, O = [{
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

        function E(e) {
            return JSON.parse(JSON.stringify(e))
        }

        function y(e, t, i) {
            var a = [];
            return e.forEach((e, s) => {
                i && !Object(r.D)(e) && Object(r.H)(e) && 0 != s && e.type != _.b.Code || a.push(function(e, t) {
                    var i = {};
                    for (var a in e) {
                        if (!e.hasOwnProperty(a)) return;
                        if (!a.startsWith("_") || "_uuid" === a && t) {
                            var s = e[a];
                            i[a] = isObject(s) || isArray(s) ? E(s) : s
                        }
                    }
                    return Object(r.D)(e) && e._object && (i.mediaId = e._object.getMediaId()), e.sep && (i.sep = 1), i.type == _.b.Text && delete i.type, i.lines.forEach(e => {
                        if (e) {
                            if (void 0 !== e.decorations) {
                                var t = !0;
                                each(e.decorations, (i, a) => {
                                    0 == a.length ? delete e.decorations[i] : t = !1
                                }), t && delete e.decorations
                            }
                            e.brs && 0 == e.brs.length && delete e.brs
                        }
                    }), i
                }(e, t))
            }), E(a)
        }

        function P(e) {
            return e.forEach(e => {
                e.type = e.type || _.b.Text, e.lines.forEach(e => {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
        class w extends n {
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
        class x extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var [e, t] = this.getMediaId().split(";");
                this._el = se(`<div class="article_object_embed fb-post" data-href="https://www.facebook.com/${e}/posts/${t}/" data-width="552px"></div>`), this.setLoadingState(!0);
                var i = window.vk && 0 == window.vk.lang ? "ru_RU" : "en_US";
                return loadScript(`https://connect.facebook.net/${i}/all.js#xfbml=1&amp;version=v2.8`, {
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
        class I extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se(`\n      <div class="article_object_embed article_object_embed_instagram">\n        <blockquote\n            class="article_embed_spacer instagram-media"\n            data-instgrm-permalink="https://instagram.com/p/${this.getMediaId()}"\n            data-instgrm-version="12"\n        ></blockquote>\n      <div>\n    `), this.setLoadingState(!0), loadScript("https://www.instagram.com/embed.js", {
                    onLoad: () => {
                        setTimeout(() => {
                            window.instgrm.Embeds.process(), addEvent(window, "message", _.d), this.setLoadingState(!1)
                        }, 0)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }
        class T extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                return this._el = se('<div class="article_object_embed"></div>'), setTimeout(() => {
                    var [e, t] = this.getMediaId().split(";"), i = domData(this._objectEl, "uuid"), a = `vk_post_${this.getMediaId()}_${i}`;
                    this._el.setAttribute("id", a), this.setLoadingState(!0), loadScript("/js/api/openapi.js", {
                        onLoad: () => {
                            ajax.post("dev.php", {
                                act: "a_get_post_hash",
                                post: `${e}_${t}`
                            }, {
                                onDone: i => {
                                    i && (this.setLoadingState(!1), window.VK && window.VK.Widgets && window.VK.Widgets.Post(`${a}`, e, t, i))
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
        class k extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                var [e, t] = this.getMediaId().split(";");
                return this._el = se(`<div class="article_object_embed"><blockquote class="telegram-post" data-telegram-post="${e}/${t}" data-width="100%" data-userpic="true"></div>`), this.setLoadingState(!0), loadScript("https://telegram.org/js/telegram-widget.js?5", {
                    onLoad: () => {
                        this.setLoadingState(!1)
                    },
                    onError: () => {
                        this.loadErrorHandler(this._el)
                    }
                }), this._el
            }
        }
        class S extends n {
            constructor(e, t) {
                super(e, t, !0)
            }
            render() {
                this._el = se('\n      <div class="article_object_poll"></div>\n    ');
                var e = h.get(_.b.ObjectPoll, this.getMediaId());
                if (e && e.snippet) return this._el.appendChild(se(e.snippet)), this._el;
                var [, t] = this.getMediaId().split("_");
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
                var e = h.get(_.b.ObjectPoll, this.getMediaId());
                if (!e || !e.editable) return null;
                var t = se(`\n      <div class="article_ed__obj_edit_control">\n        <div class="article_ed__poll_object_btn">\n          <button class="article_ed__poll_object_edit">${getLang("global_edit")}</button>\n        </div>\n      </div>\n    `);
                return geByClass1("article_ed__poll_object_edit", t).addEventListener("click", this._editor.editObjectPoll.bind(this._editor, this)), t
            }
        }

        function L(e) {
            var t = [];
            e.length > C.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", C.maxParagraphs));
            var i = 0,
                a = 0;
            return e.forEach(e => {
                var s = 0;
                e.lines.forEach(e => {
                    e && (i += e.text.length, s += e.text.length)
                }), Object(r.D)(e) && a++, s > C.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", s).replace("{limit}", C.maxSymbolsPerParagraph))
            }), i > C.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", i).replace("{limit}", C.maxSymbols)), a > C.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", C.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
        class M {
            static _saveChunk(e, t, i, a, r) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: a,
                    chunk_index: i,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: e => {
                        r(e)
                    },
                    onError: () => {
                        r(!0)
                    }
                })
            }
            static _saveFinally(e, t, i, a, r, s, o, n, l, d) {
                l = l ? JSON.stringify(l) : "", ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: r,
                    name: a,
                    is_published: intval(i),
                    chunks_count: n,
                    Article_text: l,
                    hash: o
                }, s || {}), {
                    onDone: d,
                    onFail: e => e.startsWith("locked ") ? (d(e), !0) : e ? (showFastBox(getLang("global_error"), e), d(!0), !0) : void 0
                })
            }
            static save(e, t, i, a, r, s, o, n, l, d) {
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
                        M._saveFinally(e, t, a, r, s, l, o, h.length, !1, d)
                    }, h.length);
                    h.forEach((t, i) => {
                        M._saveChunk(e, t, i, o, e => {
                            e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : p.done()
                        })
                    })
                } else M._saveFinally(e, t, a, r, s, l, o, 0, i, d)
            }
        }
        var D = i("zxIV"),
            A = i("W9Tc"),
            {
                cur: N,
                browser: B,
                each: H,
                addClass: U,
                geByTag1: z,
                geByClass1: F,
                extractUrls: $,
                removeClass: R,
                domClosestByTag: W,
                hasClass: K,
                domData: G,
                getSize: Q,
                getXY: V,
                re: Y,
                se: J,
                domInsertBefore: X,
                traverseParent: q,
                extend: Z,
                toggleClass: ee,
                trim: te,
                domInsertAfter: ie,
                gpeByClass: ae,
                clean: oe,
                domReplaceEl: ne,
                isObject: le,
                ge: de,
                domChildIndex: he,
                domNS: _e,
                lineHtml: pe
            } = window,
            ge = {
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
            },
            ue = [{
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
            be = ue.slice().reverse(),
            ve = {};
        H(ue, (e, t) => {
            ve[t.tag] = t
        });
        var fe = {};
        H(ue, (e, t) => {
            fe[t.type] = t
        });
        var me = 100,
            je = 1;

        function Ce() {
            return je++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        window.ArticleEditor = class {
            constructor(e, t, i, a = {}) {
                this._id = Ce(), N.lang = N.lang || {}, Z(N.lang, a.lang), this._options = a, this._els = {
                        editor: de(e),
                        canvas: J('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                    }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = J('<div class="article_photo_upload"></div>')), U(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [],
                    function(e) {
                        C = e
                    }(a.limits);
                var s = i || [];
                if (a.postData) {
                    var o = a.postData.text || "";
                    o = (o = o.replace(/❤/g, "❤️")).split("\n");
                    var n = [];
                    n.push(Object(r.e)({
                        type: _.b.Header1,
                        lines: [{
                            text: ""
                        }]
                    })), o.forEach(e => {
                        te(e) && n.push(Object(r.e)({
                            lines: [{
                                text: oe(e)
                            }]
                        }))
                    }), s = n.concat(s)
                }
                s && 0 != s.length || (s = [Object(r.e)({
                    type: this._options.noTitle ? _.b.Text : _.b.Header1
                })]), (s = s.filter(e => !1 !== e)).forEach(e => {
                    e.lines.forEach(e => {
                        e.text = Object(r.R)(e.text), e.brs && le(e.brs) && (e.brs = Object(r.j)(e.brs))
                    })
                }), a.needIndexCorrection && Object(r.k)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(), this._initObjectDrag(), a.postData ? Object(r.o)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), a.coverPhoto && this.setCoverPhoto(a.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(t.name), this.updateWarnInfos(), this._publishNameCandidate = a.name || this._getName(), this._saveUndoState(), stManager.add("audio.js")
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
            setCoverPhoto(e, t = !0) {
                this._coverPhoto = e, this._options.isPublished || this.saveDraft(t)
            }
            getCoverPhoto() {
                return !1 !== this._coverPhoto && (this._coverPhoto ? this._coverPhoto : void 0)
            }
            getFirstCoverPhotoFromParagraphs() {
                var e = !1;
                return this._ps.forEach(t => {
                    if (!e && t.type == _.b.ObjectPhoto) {
                        var i = t._object.getMediaId(0);
                        e = {
                            id: i,
                            data: h.get(_.b.ObjectPhoto, i)
                        }
                    }
                }), e
            }
            getPublishName() {
                return this._publishName || this._publishNameCandidate || this._getName()
            }
            setPublishName(e) {
                this._publishName = e, this._options.isPublished || this.saveDraft(!0)
            }
            _updateTextPlaceholders() {
                if (!this._options.noTitle) {
                    this._els.placeholders || (this._els.placeholders = J('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = J(`<h1>${this.getOptions().placeholderTitle}</h1>`), this._els.placeholderFirstParagraph = J(`<p>${this.getOptions().placeholderParagraph}</p>`), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(r.H)(this._ps[0]) ? R(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : U(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var e = this._ps[1],
                        t = !!e && e.sep,
                        [i] = this._getCurrentParagraphIndex();
                    Object(r.H)(e) && (!e || e.type != _.b.Code) && i < 2 && this._ps.length <= 2 && !t ? R(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : U(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }
            destroy() {
                this._els.editor.innerHTML = "", R(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(e => {
                    e.el.removeEventListener(e.event, e.handler)
                }), delete N.docsCurFilter
            }
            getLimits() {
                return this._options.limits
            }
            getOptions() {
                return this._options
            }
            getWidth(e = !1) {
                return Q(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
            }
            getPhotoUploadOptions() {
                return this._options.photoUploadOptions
            }
            getPhotoUploadEl() {
                return this._photoUploadEl
            }
            removeObject(e) {
                H(this._ps, (t, i) => {
                    if (i._object == e) {
                        var a = this._getParagraphElByIndex(t + 1);
                        return Object(r.o)(a), Y(this._getParagraphElByIndex(t)), this._setAllParagraphsDirty(), this._triggerInputEvent(), !1
                    }
                })
            }
            _processPastedUrl(e, t) {
                var i = this._getParagraph(e);
                i && i.type == _.b.Text && setTimeout(() => {
                    this._processMatchingEmbeds(e, t) || (Y(this._els.shareParseForm), Y(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(J('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                                        a = _.b.ObjectAudioPlaylist, o = {
                                            accessHash: i.accessHash
                                        }, t[1] = i.ownerId + "_" + i.id + (i.accessHash ? "_" + i.accessHash : "");
                                        break;
                                    case "podcast":
                                        Object(A.a)("article_podcasts") && (a = _.b.ObjectPodcast, o = {});
                                        break;
                                    case "poll":
                                        Object(A.a)("article_poll") && (a = _.b.ObjectPoll, o = {
                                            editable: !1,
                                            snippet: i.snippet
                                        });
                                        break;
                                    case "doc":
                                        "gif" == i.ext && (a = _.b.ObjectGIF, o = {
                                            size: i.video_preview_size,
                                            video: i.video_preview,
                                            href: i.href
                                        });
                                        break;
                                    case "photo":
                                        a = _.b.ObjectPhoto, o = {
                                            size: Object(r.t)(i.editable.sizes),
                                            sizes: i.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        a = _.b.ObjectVideo, o = {
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
                                    h.add(a, l.mediaId, o), this._linkTooltip && this._linkTooltip.hide(), l = Object(r.e)(l), (s = this._getParagraph(e + 1)) && s._object && s._object._mediaId === l.mediaId || (this._getOrCreateParagraphObject(l), this._insertParagraphAt(e + 1, l), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), setTimeout(() => {
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
                if (!Object(A.a)("article_embeds")) return !1;
                if (i = t.match(/^https?:\/\/(?:www.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)$/)) a = _.b.ObjectTwitter, s = i[1];
                else if (i = t.match(/^https?:\/\/(?:www.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)(?:\/embed)?(?:\/)?/)) a = _.b.ObjectInstagram, s = i[1];
                else if (i = t.match(/^https?:\/\/(?:www.)?facebook\.com\/(\w.+)\/posts\/(\d+)\/?$/)) a = _.b.ObjectFacebook, s = `${i[1]};${i[2]}`;
                else if (i = t.match(/^(?:https?:\/\/)?(?:[a-z0-9\_\.-]*\.)?(?:www.)?vk\.com\/(?:[a-z0-9\_\.-?]*w=)?wall(-?\d+)_(\d+)/)) a = _.b.ObjectVK, s = `${i[1]};${i[2]}`;
                else if (i = t.match(/^https?:\/\/(?:www.)?t\.me\/(\w.+)\/(\d+)/)) {
                    if (de(`telegram-post-${i[1]}-${i[2]}`)) return !1;
                    a = _.b.ObjectTelegram, s = `${i[1]};${i[2]}`
                }
                if (!a || !s) return !1;
                var o = Object(r.e)({
                        _uuid: Ce(),
                        type: a,
                        mediaId: s
                    }),
                    n = this._getParagraph(e + 1);
                return !(!n || !n._object || n._object._mediaId !== o.mediaId) || (this._getOrCreateParagraphObject(o), this._insertParagraphAt(e + 1, o), this._els.canvas.normalize(), this._redraw(!0, !0), this._saveUndoState(), !0)
            }
            _handleObjectPaste(e) {
                var t = (e.clipboardData || e.originalEvent.clipboardData).getData("text/plain");
                if (t) {
                    var [i, a] = t.split(":");
                    if ("uuid" == i && a) {
                        var r = domQuery1(`[data-uuid="${a}"]`);
                        if (r) {
                            var s = r.cloneNode(!0);
                            s.setAttribute("data-force-update", "1");
                            var [o] = this._getCurrentParagraphIndex();
                            ie(s, this._getParagraphElByIndex(o)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
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
                            var [e] = t._getCurrentParagraphIndex();
                            s.getAsString(i => {
                                var a = i.replace(/(<([^>]+)>)/gi, ""),
                                    s = $(a, !0);
                                if (1 === s.length) {
                                    var o = s[0].url,
                                        n = t._getParagraphElByIndex(e);
                                    t._processPastedUrl(e, o), Object(r.T)(n, i => {
                                        if (i.nodeType == Node.TEXT_NODE && i.textContent.indexOf(o) >= 0 && !q(i, e => e.tagName && "a" == e.tagName.toLowerCase(), 3)) {
                                            t._saveCursorMarker();
                                            var a = document.createRange();
                                            a.setStart(i, i.textContent.indexOf(o)), a.setEnd(i, i.textContent.indexOf(o) + o.length);
                                            var r = window.getSelection();
                                            r.removeAllRanges(), r.addRange(a), t._setParagraphDirty(e), document.execCommand("createLink", !1, o), t._restoreCursorFromMarker()
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
                                var [a] = t._getCurrentParagraphIndex();
                                a = a || 0;
                                var s, o = Object(r.e)({
                                    type: _.b.ObjectPhoto
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
                var [e, t] = this._getCurrentParagraphIndex();
                if (!1 === e || !1 === t) return !1;
                for (var i, a, s = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        list: !1,
                        justHeaders: !0
                    }, o = {}, n = 0, l = e; l <= t && l < this._ps.length; l++) {
                    var d = Object(r.D)(this._ps[l]) ? this._ps[l]._object.getCaptionEl() : this._getParagraphElByIndex(l);
                    void 0 === i && ([i, a] = getCaretCharacterOffsetWithin(d)), this._ps[l].lines.forEach(e => {
                        var t = e.decorations;
                        ue.forEach(r => {
                            var l = t[r.type];
                            l && !isEmpty(l) && l.forEach(t => {
                                var l = [t[0] + n, t[1] + n];
                                if ("link" == r.type) i < l[1] && a > l[0] && (o[r.type] = 1, s.decorations[r.type] = !0);
                                else if (1 == o[r.type]) a > l[1] || (a >= l[0] && a <= l[1] ? t[0] > 0 ? o[r.type] = -1 : (o[r.type] = 2, s.decorations[r.type] = !0) : o[r.type] = -1);
                                else if (!o[r.type]) {
                                    var d = i >= l[0] && i <= l[1];
                                    d && a >= l[0] && a <= l[1] ? (o[r.type] = 2, s.decorations[r.type] = !0) : d && (e.text.length > l[1] ? o[r.type] = -1 : o[r.type] = 1)
                                }
                            })
                        }), n += e.text.length
                    })
                }
                for (var h = e; h <= t && h < this._ps.length; h++) Object(r.D)(this._ps[h]) && (s.captionFocused = s.captionFocused || this._ps[h]._object.isCaptionFocused(), s.object = !0), this._ps[h].type == _.b.Header1 && (s.header1 = !0), this._ps[h].type != _.b.Header2 && (s.header2 = !1), this._ps[h].type != _.b.Header3 && (s.header3 = !1), inArray(this._ps[h].type, [_.b.Header1, _.b.Header2, _.b.Header3]) ? s.header = !0 : s.justHeaders = !1, inArray(this._ps[h].type, [_.b.Quote, _.b.Quote2]) || (s.quote = !1), inArray(this._ps[h].type, [_.b.BulletList, _.b.NumericList]) && (s.list = !0);
                var [c] = Object(r.u)();
                return !(c && c.startContainer && K(c.startContainer, "article_ed__noconteditable")) && (s.multiline = e != t, s)
            }
            _hideFormatTooltip() {
                this._formatTooltip && this._formatTooltip.isShown() && this._formatTooltip.hide()
            }
            _showFormatTooltip() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var e = window.getSelection();
                        if (e.focusNode && (K(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase())) return;
                        var t = !e.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, t), 1)
                    } catch (e) {}
                }
            }
            _doShowFormatTooltip(e) {
                if (!this._formatTooltip) {
                    var t, i = J(`\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="${getLang("pages_articles_enter_link")}"/><div class="article_set_link_delete"></div></div>\n        </div>`);
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: i,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: () => {
                            var e = this._getCurrentSelectionState(),
                                t = [];
                            if (!e || e.header1 || e.object && !e.captionFocused || (e.justHeaders || t.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || t.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), t.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? t.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : t.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (t.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), t.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), t.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 != t.length) {
                                var a = F("article_format_btns", i);
                                a.innerHTML = "", t.forEach((e, t) => {
                                    t > 0 && inArray(e[0], ["header1"]) && a.appendChild(J('<div class="article_format_divider"></div>'));
                                    var i = e[2] ? "article_format_btn_active" : "";
                                    a.appendChild(J(`<button class="article_format_btn ${i}" id="article_format_btn_${e[0]}" onclick="${e[1]}"></button>`))
                                }), this.setLinkMode(!1)
                            } else this._formatTooltip.hide()
                        },
                        getTargetBoundingBox: () => {
                            if (this._formatTooltip.linkMode) return t;
                            var [e, , i] = Object(r.u)();
                            if (!i || !i.rangeCount) return t;
                            var a = e.getBoundingClientRect();
                            if (!a.left) {
                                var s = e.startContainer.nodeType == Node.ELEMENT_NODE ? e.startContainer : domPN(e.startContainer),
                                    o = V(s),
                                    n = Q(s);
                                return t = {
                                    top: o[1] + scrollGetY(),
                                    left: o[0] + n[0] / 2,
                                    width: a.width,
                                    height: a.height
                                }
                            }
                            return t = {
                                top: a.top + scrollGetY(),
                                left: a.left,
                                width: a.width,
                                height: a.height
                            }
                        }
                    }), this._formatTooltip.linkMode = !1;
                    var a = z("input", i);
                    a.addEventListener("keypress", e => {
                        if (e.keyCode == ge.Enter) return this._setLinkToSelectedText(a.value.trim()), this._formatTooltip.hide(), cancelEvent(e)
                    }), F("article_set_link_delete", i).addEventListener("click", e => (this._setLinkToSelectedText(), cancelEvent(e)))
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }
            _setLinkToSelectedText(e) {
                e && ((e = (e = e.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://") || (e = (Object(r.K)(e) ? "https" : "http") + "://" + e), e = encodeURIComponent(e)), this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), !B.msie && e || this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor)
            }
            clearLink() {
                this.setLinkMode(!1);
                var [e, , t] = Object(r.u)(), i = W("a", e.startContainer), a = W("a", e.endContainer) || i;
                i && (this._saveCursorMarker(), t.setBaseAndExtent(i, 0, a, Math.max(1, a.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }
            setLinkMode(e, t) {
                var i;
                e && (i = this._getCursor(), B.msie || document.execCommand("superscript", !1, !0));
                var a = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var r = z("input", a);
                        r.value = "", U(a, "article_editor_format_tt_set_link"), this._linkCursor = i, this._linkSelectedCursor = this._getCursor(), r.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(a, {
                        width: null
                    }), R(a, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }
            setHeader1(e) {
                this._setHeader(_.b.Header2, !e)
            }
            setHeader2(e) {
                this._setHeader(_.b.Header3, !e)
            }
            setQuote() {
                var e = this._getCursor(),
                    [t, i] = this._getCurrentParagraphIndex();
                if (!1 !== t) {
                    i || (i = t);
                    for (var a = _.b.Text, s = t; s <= i; s++)
                        if (l(this._ps[s])) {
                            a = this._ps[s].type == _.b.Quote ? _.b.Quote2 : this._ps[s].type == _.b.Quote2 ? _.b.Text : _.b.Quote;
                            break
                        }
                    for (var o = t; o <= i; o++) {
                        var n = this._ps[o];
                        l(n) && (this._ps[o] = Object(r.e)({
                            type: a,
                            lines: [n.lines[0]],
                            sep: Object(r.w)(this._ps[o])
                        }), this._setParagraphDirty(o))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(e), this._saveUndoState(), this.saveDraft()
                }

                function l(e) {
                    return !Object(r.D)(e) && !Object(r.C)(e)
                }
            }
            _setHeader(e, t) {
                var i = this._getCursor(),
                    [a, s] = this._getCurrentParagraphIndex();
                if (!1 !== a) {
                    s || (s = a);
                    for (var o = a; o <= s; o++) n(this._ps[o]) && (this._ps[o].type = t ? e : _.b.Text, this._setParagraphDirty(o));
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(i), this._saveUndoState(), this.saveDraft()
                }

                function n(e) {
                    return !Object(r.D)(e) && !Object(r.C)(e)
                }
            }
            setStrong() {
                this._setAllParagraphsDirty(), document.execCommand("bold"), B.msie && this._triggerInputEvent()
            }
            setEm() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), B.msie && this._triggerInputEvent()
            }
            setStrike() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), B.msie && this._triggerInputEvent()
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
                var e = y(this._ps, !0);
                if (this._undoCurrentState) {
                    if (JSON.stringify(e) == JSON.stringify(this._undoCurrentState)) return;
                    this._undos.push({
                        ps: this._undoCurrentState,
                        cursor: this._undoCurrentStateCursor
                    }), this._undos.length > me && this._undos.shift()
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
                    this._ps = P(e.ps), this._undoCurrentState = y(this._ps), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
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
                    this._ps = P(e.ps), this._undoCurrentState = y(this._ps), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
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
                        h.add(e.type, t, e._preparedData[i])
                    }), delete e._preparedData)
                }), this._ps = P(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }
            _getParagraphFromHTML(e, t, i = !1) {
                function a(t, i) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var s = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        i.text += "pre" == e ? s : Object(r.i)(s)
                    } else Object(r.y)(t) && i.text.length > 0 && i.brs.push(i.text.length);
                    H(t.childNodes, (e, t) => {
                        var s = [i.text.length];
                        a(t, i), s.push(i.text.length);
                        var o, n = (t.tagName || "").toLowerCase();
                        switch (t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (n = "strong"), n) {
                            case "b":
                            case "strong":
                                o = fe.strong;
                                break;
                            case "em":
                            case "i":
                                o = fe.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                o = fe.strike;
                                break;
                            case "a":
                                o = fe.link;
                                var l = t.getAttribute("href") || "",
                                    d = Object(r.m)(l);
                                Object(r.K)(l) && (d = l.match(/app-?\d+_-?\d+/) ? d.replace("%23", "#") : d.replace("#", "%23")), s.push(d);
                                break;
                            case "code":
                                o = fe.code;
                                break;
                            case "font":
                                var h = t.getAttribute("face");
                                "monospace" === h ? o = fe.code : "times" === h && (o = fe.code)
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
                            o = _.b.NumericList;
                            break;
                        case "ul":
                            o = _.b.BulletList
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
                            o = _.b.Header1;
                            break;
                        case "h2":
                        case "header":
                            o = _.b.Header2;
                            break;
                        case "h3":
                        case "h4":
                            o = _.b.Header3;
                            break;
                        case "blockquote":
                            o = _.b.Quote;
                            break;
                        case "cite":
                            o = _.b.Quote2;
                            break;
                        case "pre":
                            o = _.b.Code;
                            break;
                        default:
                            o = _.b.Text
                    }
                    var p = s.firstElementChild;
                    if (Object(r.E)(p)) {
                        var g = G(p, "type"),
                            u = G(p, "media-id");
                        g && u && (s = z("figure", p), o = g, l.mediaId = u)
                    }
                    var b = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    a(s, b), b.brs = Object(r.g)(b.brs, b.text.length), n.push(b), o == _.b.Code && delete b.decorations.code, i || o != _.b.Text || "```" != b.text || 0 != b.brs.length || (b.text = "", o = _.b.Code), Object(r.A)(o) || (0 == b.text.indexOf("1. ") ? (o = _.b.NumericList, this._removeParagraphLineTextPart(b, 0, "1. ".length)) : 0 == b.text.indexOf("* ") && (o = _.b.BulletList, this._removeParagraphLineTextPart(b, 0, "* ".length))), b.brs = b.brs.filter(e => e > 0)
                }
                return l.lines = n, l.type = o, Object(r.e)(l)
            }
            _removeParagraphLineTextPart(e, t, i) {
                e.text = e.text.substring(0, t) + e.text.substring(i);
                for (var a = i - t, r = 0, s = e.brs.length; r < s; r++) {
                    var o = e.brs[r];
                    o > t && o < i ? e.brs[r] = void 0 : e.brs[r] > t && e.brs[r] >= i && (e.brs[r] -= a)
                }
                e.brs = e.brs.filter(e => void 0 !== e), H(e.decorations, (r, s) => {
                    s.forEach(e => {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= i ? e[1] = t : e[0] >= t && e[1] <= i ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > i ? (e[0] = t, e[1] -= a) : (e[0] -= a, e[1] -= a))
                    }), e.decorations[r] = e.decorations[r].filter(e => void 0 !== e[0])
                })
            }
            _renderObjectParagraph(e, t) {
                var i = this._getOrCreateParagraphObject(e),
                    a = i.el();
                i.onRender && i.onRender();
                var s = 0;
                return isString(t) && (t = [t]), e.type == _.b.ObjectPhoto ? (s = i.getImageIndex(), i.setCaptionElHtml(t[s] || "")) : i.setCaptionElHtml(t[0] || ""), G(a, "paragraph-lines", JSON.stringify(e.lines)), G(a, "uuid", e._uuid), G(a, "type", e.type), G(a, "media-id", e._object.getMediaId()), G(a, "mode", parseInt(e.mode) || 0), U(a, r.a), a
            }
            _renderParagraphLines(e, t) {
                if (!e.lines) return ["", ""];
                var i = "",
                    a = "",
                    s = "",
                    o = parseInt(e.type);
                switch (o) {
                    case _.b.NumericList:
                        i = "ol", a = "li";
                        break;
                    case _.b.BulletList:
                        i = "ul", a = "li";
                        break;
                    case _.b.Header1:
                        a = "h1";
                        break;
                    case _.b.Header2:
                        a = "h2";
                        break;
                    case _.b.Header3:
                        a = "h3";
                        break;
                    case _.b.Quote:
                        a = "blockquote";
                        break;
                    case _.b.Quote2:
                        a = "cite";
                        break;
                    case _.b.Code:
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
                        H(ue, (e, t) => {
                            if (!Object(r.A)(o) && o != _.b.Code || "code" != t.type) {
                                var i = d[t.type];
                                if (i)
                                    for (var a = function(e, a) {
                                            var r = i[a];
                                            (h[r[0]] = h[r[0]] || {
                                                open: {},
                                                close: {}
                                            }).open[t.type] = u(r);
                                            var s = h[r[1]] = h[r[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                o = function(e, t) {
                                                    for (var i = []; e > 0;) {
                                                        var a = h[--e];
                                                        if (a)
                                                            for (var r in a.open)
                                                                if (a.open.hasOwnProperty(r)) {
                                                                    if (r == t) return [];
                                                                    i.push(r)
                                                                }
                                                    }
                                                    return i
                                                }(r[1], t.type);
                                            o.forEach(e => {
                                                s.close[e.type] = !0
                                            }), s.close[t.type] = !0, o.forEach(e => {
                                                s.open[e.type] = u(r)
                                            })
                                        }, s = 0, n = i.length; s < n; s++) a(0, s)
                            }
                        });
                        var c = 0,
                            p = [];
                        h.forEach((t, a) => {
                            if (t) {
                                var s = !1,
                                    o = t.close.link && 1 == Object.keys(t.close).length;
                                a > 0 && (s = Object(r.P)(l, c, a, i.brs, e.type == _.b.Code), o || p.push(s));
                                var n = 0;
                                o && (s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), s && s.endsWith("<br/>") && (n++, s = s.replace(/<br\/>$/, "")), !1 !== s && p.push(s)), H(be, (e, i) => {
                                    void 0 !== t.close[i.type] && p.push(`</${i.tag}>`)
                                }), p.push("<br/>".repeat(n)), H(ue, (e, i) => {
                                    var a = t.open[i.type];
                                    void 0 !== t.open[i.type] && (!0 === a ? p.push(`<${i.tag}>`) : p.push(`<${i.tag} href="${oe(a)}">`))
                                }), c = a
                            }
                        }), p.push(Object(r.P)(l, c, void 0, i.brs, e.type == _.b.Code));
                        var g = "";
                        a && (g += `<${a}${s=s?` ${s}`:""}>`), inArray(o, [_.b.Quote, _.b.Quote2]) && (g += "<p>"), g += p.join("") || (t ? "" : "<br/>"), inArray(o, [_.b.Quote, _.b.Quote2]) && (g += "</p>"), a && (g += `</${a}>`), n.push(g)
                    }

                    function u(e) {
                        return e[2] || !0
                    }
                }), [i, n]
            }
            _renderParagraph(e) {
                var t, i = Object(r.D)(e),
                    [a, s] = this._renderParagraphLines(e, i);
                if (i) t = this._renderObjectParagraph(e, s);
                else {
                    var o = s.join("");
                    t = J(a ? `<${a}>${o}</${a}>` : o)
                }
                return Object(r.w)(e) ? G(t, "sep", Object(r.p)()) : G(t, "sep", null), U(t, r.a), U(t, "article_paragraph"), t
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
                        a = this._ps[e],
                        r = e + 1 < t && this._ps[e + 1],
                        s = !1,
                        o = !1,
                        n = !1;
                    i && a.type == i.type || (s = !0), r && a.type == r.type || (o = !0), (_.c.includes(+r.type) || r.sep) && (n = !0);
                    var l = this._getParagraphElByIndex(e);
                    ee(l, "article_decoration_first", s), ee(l, "article_decoration_last", o), ee(l, "article_decoration_before", n)
                }
            }
            redraw(e = !0) {
                this._redraw(e, !0)
            }
            _redraw(e, t) {
                var i = this._getCursor();
                e ? (this._els.canvas.innerHTML = "", this._ps.forEach(e => {
                    this._els.canvas.appendChild(this._renderParagraph(e))
                })) : this._dirty.forEach(e => {
                    if (!(e >= this._ps.length)) {
                        var t = this._getParagraphElByIndex(e),
                            i = this._renderParagraph(this._ps[e]);
                        t ? i.outerHTML != t.outerHTML && ne(t, i) : this._els.canvas.appendChild(i)
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
                    var [, i] = this._getContainingParagraphEl(t.startContainer), a = t.endContainer;
                    if (0 === t.endOffset && (this._isParagraphEl(a) || this._isParagraphEl(domPN(a)) && 0 == Object(r.f)(a))) {
                        var [s] = this._getContainingParagraphEl(a);
                        a = Object(D.A)(s) || s
                    }
                    var [, o] = this._getContainingParagraphEl(a);
                    return [i, Math.max(i, o)]
                }
                return [0, !1]
            }
            _saveCursorMarker() {
                if (!this._markerCursorSet) {
                    var [e, t] = Object(r.u)();
                    if (!e) return [0, 0];
                    var i = e.startContainer,
                        a = e.startOffset,
                        s = e.endContainer,
                        o = e.endOffset;
                    if (i != this._els.canvas) {
                        var n = this._getContainingParagraphEl(i)[1];
                        l(i, a, r.c), t || (this._getContainingParagraphEl(s)[1] == n && s.textContent.includes(r.c) && (o += 1), l(s, o, r.b)), this._markerCursorSet = !0
                    }
                }

                function l(e, t, i) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var a = e.textContent;
                        e.textContent = a.substring(0, t) + i + a.substring(t)
                    } else {
                        var r = document.createTextNode(i);
                        e.insertBefore(r, e.childNodes[t])
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
                                    for (var a = 0, r = 0; r < t.brs.length; r++) t.brs[r] > i && (a = 1), t.brs[r] -= a;
                                    H(ue, (e, a) => {
                                        var r = t.decorations[a.type];
                                        if (r)
                                            for (var s = 0, o = r.length; s < o; s++) {
                                                var n = r[s];
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
                var [e, t] = this._getCurrentParagraphIndex();
                this._setParagraphDirty(e, t)
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
                                    var i = q(s, t => t == e._els.canvas || "FIGURE" == t.tagName, 10),
                                        a = !(!i || i == e._els.canvas) && z("figcaption", i),
                                        o = Object(r.e)({
                                            type: _.b.ObjectPhoto
                                        }),
                                        n = e._renderObjectParagraph(o, a ? a.innerHTML : "");
                                    Object(r.M)(t.textContent) ? (ne(t, n), Y(s), ie(J(`<p>${r.c}</p>`), n)) : (ie(n, domPN(s)), Y(a), Y(s)), q(n, t => {
                                        if (t == e._els.canvas) return !0;
                                        R(t, r.a)
                                    }), Object(r.Q)(s.src, (t, i, a) => {
                                        t ? (Y(n), e._forgetObject(o._uuid), e._setAllParagraphsDirty(), e._triggerInputEvent(), a()) : e._getOrCreateParagraphObject(o).setBLOB(i, a)
                                    })
                                }; s = a.shift();) o()
            }
            _flattenAlienParagraphs() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t, i = Array.prototype.slice.call(this._els.canvas.children), a = this._fromPasteEvent, s = this._pasteCurrentIndex, [o] = this._getCurrentParagraphIndex(), n = -1, l = function() {
                            if (n++, a && !te(t.textContent) && n > s && n <= o) return Y(t), "continue";
                            var i = t;
                            Object(r.J)(t) && !Object(r.x)(t) && (i = t.firstChild);
                            var l = !1;
                            (function e(a) {
                                if (a && a.nodeType != Node.TEXT_NODE && !Object(r.y)(a))
                                    if (Object(r.v)(a))
                                        if (this._isTrackedObjectEl(a)) a != i && (X(a, t), l = !0);
                                        else
                                            for (var s, o = Array.prototype.slice.call(a.childNodes); s = o.shift();) e.call(this, s);
                                else a != i && (te(a.innerHTML) && X(a, t), l = !0)
                            }).call(e, i, !0), l && Y(t)
                        }; t = i.shift();) l();
                    this._setAllParagraphsDirty()
                }
            }
            _correctCaptionSelection() {
                var [e, t, i] = Object(r.u)();
                if (e && !t) {
                    var a = q(e.startContainer, e => "FIGCAPTION" == e.tagName, 5);
                    if (a && e.endContainer != e.startContainer && e.endContainer.nodeType == Node.ELEMENT_NODE && Object(r.G)(e.endContainer) && 0 == e.endOffset && 0 == e.startOffset) {
                        var s = F("article_ed__figcaption_edit", a),
                            o = e.cloneRange();
                        o.selectNodeContents(s), i.removeAllRanges(), i.addRange(o)
                    }
                }
            }
            cancelSaveDraft() {
                clearTimeout(this._draftSaveTO)
            }
            saveDraft(e, t, i) {
                if (!this.isLocked()) {
                    clearTimeout(this._draftSaveTO);
                    var a = JSON.stringify({
                        paragraphs: y(this._ps)
                    });
                    t ? this._lastSavedDraft = a : this._lastSavedDraft != a || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(() => {
                        if (this._lastSavedDraft = a, 0 != this._ps.length) {
                            var e = L(this._ps);
                            e ? this._options.onDraftNotSaved && this._options.onDraftNotSaved(e) : this.save(!1, (e, t, i) => {
                                this._initDraftSave = !0, this._options.onDraftSaved && this._options.onDraftSaved(e, t, i)
                            })
                        }
                    }, i ? 0 : 1e3 * this._options.draftSaveDelay)) : !t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
                }
            }
            _getName() {
                if (this._publishName) return this._publishName;
                var e = y(this._ps),
                    t = e.length ? e[0].lines[0].text : "";
                return Object(r.q)(t, this._options.maxNameLength)
            }
            getTitle() {
                var e = this._ps[0];
                return e ? e.lines[0].text : ""
            }
            isLimitsExceeded() {
                return !!L(this._ps)
            }
            save(e, t, i) {
                var a = y(this._ps, !1, !0);
                e && Object(r.k)(a, -1);
                var s = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && ((i = i || {}).from_post_convert = 1), M.save(this.getArticleOwnerId(), this.getArticleId(), a, e, s, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, i, (i, a, r, o, n, l) => {
                    if (isString(i) && i.startsWith("locked ")) return this.getOptions().editLockMessage = i.slice("locked ".length), this.showEditLockInfo(), void(t && t(!0));
                    i || (a && (this._options.articleId = a), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(Z({}, nav.objLoc, {
                        article_id: this.getArticleOwnerId() + "_" + this.getArticleId()
                    })), this._publishNameCandidate = s, e && (this._options.isPublished = !0), this._options.monetizationAllowed = l, this._replaceVideos(n)), t && t(i, a, r, o)
                })
            }
            _replaceVideos(e = []) {
                var t = !1;
                try {
                    e.forEach(e => {
                        var [i, a, r, s] = e;
                        this._ps.forEach((e, o) => {
                            if (e.type == _.b.ObjectVideo) {
                                var [n, l, d] = e.mediaId.split("_");
                                d || n != i || l != a || (e.mediaId = `${r}_${s}`, this._setParagraphDirty(o), t = !0)
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
                            ne(t, o);
                            continue
                        }
                        if (s.shift(), s.length)
                            for (var n = void 0; n = s.shift();) {
                                if (this._saveCursorMarker(), e) ie(n, t);
                                else {
                                    var l = J(`<${a}></${a}>`);
                                    l.appendChild(n), ie(l, t)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }
            _ensureDummyParagraphs() {
                if (this._els.canvas) {
                    var e = this._els.canvas.lastChild;
                    if (e && (te(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML || "H1" == e.tagName)) {
                        var t = Object(r.e)({});
                        this._els.canvas.appendChild(this._renderParagraph(t)), this._ps.push(t), this._updateTextPlaceholders()
                    }
                }
            }
            _ensureAtLeastOneParagraph() {
                0 == this._ps.length && (this._ps = [Object(r.e)({
                    type: _.b.Text
                })])
            }
            _ensureTitleParagraph() {
                if (!this._options.noTitle) {
                    var e = this._ps[0];
                    Object(r.D)(e) && (this._ps[0] = Object(r.e)({
                        type: _.b.Header1
                    })), e.type = _.b.Header1, e.lines[0].decorations = {}, e.lines[0].brs = [], delete e.sep
                }
                this._ps.forEach((e, t) => {
                    (this._options.noTitle || 0 != t) && (1 == t && e.type == _.b.Header1 && (e.type = _.b.Text), e.type == _.b.Header1 && (e.type = _.b.Header2))
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
                var [e] = this._getCurrentParagraphIndex();
                this.getArticleOwnerId() < 0 && (N.audioAttachOriginalOwnerId = this.getArticleOwnerId(), N.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: (t, i, a, s) => {
                        Object(r.H)(this._ps[e]) || this._insertParagraphAt(e, Object(r.e)());
                        var o = Object(r.e)({
                            type: _.b.ObjectAudio,
                            mediaId: a.fullId
                        });
                        h.add(_.b.ObjectAudio, a.fullId, {
                            audio: s
                        }), this._getOrCreateParagraphObject(o), this._ps[e] = o, t.shiftKey || curBox().hide(), this._redrawModel();
                        var n = this._getParagraphElByIndex(e);
                        Object(r.o)(n), this.saveUndoStateAndDraft(), e++
                    },
                    onPlaylistChoose: (t, i) => {
                        var a = i.getOwnerId() + "_" + i.getPlaylistId() + (i.getAccessHash() ? "_" + i.getAccessHash() : ""),
                            s = Object(r.e)({
                                type: _.b.ObjectAudioPlaylist,
                                mediaId: a
                            });
                        h.add(_.b.ObjectAudioPlaylist, a, {
                            accessHash: i.getAccessHash()
                        }), this._getOrCreateParagraphObject(s), this._ps[e] = s, curBox().hide(), this._redrawModel();
                        var o = this._getParagraphElByIndex(e);
                        Object(r.o)(o), this.saveUndoStateAndDraft()
                    }
                })
            }
            closeAllCarouselEditors() {
                this._ps.forEach(e => {
                    e.type == _.b.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
                })
            }
            setMediaUploadMode(e) {
                this._isUploading = !!e, ee(this._els.editor, "article_ed__uploading", this._isUploading)
            }
            isMediaUploadMode() {
                return this._isUploading
            }
            addObjectVideo() {
                var [e] = this._getCurrentParagraphIndex(), t = this._getParagraph(e), i = Object(r.w)(t);
                delete t.sep, showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId(),
                    blockPersonal: 1
                }), N.chooseMedia = ((t, a, s, o, n) => {
                    var [l] = Object(_.e)(s.editable.sizes, this.getWidth()), d = Object(r.e)({
                        type: _.b.ObjectVideo,
                        mediaId: a,
                        sep: i
                    });
                    i = !1, h.add(_.b.ObjectVideo, a, {
                        editable: s.editable,
                        thumb: l,
                        duration: s.editable.duration,
                        platform: s.editable.platform
                    }), this._getOrCreateParagraphObject(d), 0 == o ? this._ps[e] = d : this._ps.splice(e + o, 0, d), this._redrawModel(), this._saveUndoState();
                    var c = this._getParagraphElByIndex(e);
                    Object(r.o)(c), !n && curBox() && curBox().hide(), this.saveDraft()
                })
            }
            addObjectDoc() {
                var [e] = this._getCurrentParagraphIndex(), t = this._getParagraph(e), i = Object(r.w)(t);
                delete t.sep, N.docsCurFilter = "gif";
                var a = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                N.chooseMedia = ((t, s, o) => {
                    a.hide();
                    var n = Object(r.e)({
                        type: _.b.ObjectGIF,
                        mediaId: s,
                        sep: i
                    });
                    i = !1, h.add(_.b.ObjectGIF, s, {
                        video: o.video_preview,
                        size: o.video_preview_size,
                        href: o.href
                    }), this._getOrCreateParagraphObject(n), this._insertParagraphAt(e, n), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                }), N.showMediaProgress = (() => {})
            }
            addObjectPhoto() {
                var e, t, [i] = this._getCurrentParagraphIndex(),
                    a = this._getParagraph(i) || Object(r.e)(),
                    s = showBox("al_photos.php", {
                        to_id: this.getArticleOwnerId(),
                        act: "choose_photo",
                        max_files: 200,
                        article: 1
                    }, {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                N.onMediaUploadStarted = (() => {
                    var t = Object(r.e)({
                            type: _.b.ObjectPhoto
                        }),
                        a = this._renderObjectParagraph(t, ""),
                        s = this._getParagraphElByIndex(i);
                    X(a, s), Object(r.o)(s), e = a, this.setMediaUploadMode(!0)
                }), N.onMediaUploadFail = (() => {
                    delete N.onMediaUploadStarted, e && Y(e), this.setMediaUploadMode(!1)
                });
                var o = -1;
                N.chooseMedia = ((n, l, d, c) => {
                    void 0 === c ? o++ : o = intval(c), delete N.onMediaUploadStarted, this.setMediaUploadMode(!1), e && Y(e);
                    var p = Object(r.e)({
                        type: _.b.ObjectPhoto,
                        mediaId: l,
                        sep: a.sep
                    });
                    return h.add(_.b.ObjectPhoto, l, {
                        size: Object(r.t)(d.editable.sizes),
                        sizes: d.editable.sizes
                    }), this._getOrCreateParagraphObject(p), o ? this._ps.splice(i + o, 0, p) : this._ps[i] = p, void 0 === c && s.hide(), clearTimeout(t), t = setTimeout(() => {
                        this._redrawModel(), this._focusParagraph(i + o), this._updateTextPlaceholders(), this.saveUndoStateAndDraft()
                    }, 10), !1
                }), N.showMediaProgress = (() => {})
            }
            addSeparator() {
                var [e] = this._getCurrentParagraphIndex(), t = Object(r.w)(this._getParagraph(e)), i = Object(r.w)(this._getParagraph(e + 1));
                !t && !i && e < this._ps.length - 1 && this._ps.splice(e, 1), this._getParagraph(e).sep = 1;
                var a = this._getCursor();
                this._redraw(!0), this._restoreCursor(a), this._updateTextPlaceholders()
            }
            addObjectPoll() {
                var [e] = this._getCurrentParagraphIndex(), t = this._getParagraph(e), i = Object(r.w)(t);
                showBox("al_voting.php", {
                    act: "box",
                    owner_id: this.getArticleOwnerId(),
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                }), N.chooseMedia = ((t, a) => {
                    if (t && a) {
                        var s = Object(r.e)({
                            type: _.b.ObjectPoll,
                            mediaId: t,
                            sep: i
                        });
                        h.add(_.b.ObjectPoll, t, {
                            editable: !0,
                            snippet: a
                        }), i = !1, this._getOrCreateParagraphObject(s), this._insertParagraphAt(e, s), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders()
                    }
                })
            }
            editObjectPoll(e) {
                var [t, i] = e.getMediaId().split("_"), [, a, s] = this._getContainingParagraphEl(e.el()), o = Object(r.w)(s);
                showBox("al_voting.php", {
                    act: "box",
                    voting_id: i,
                    owner_id: t,
                    ref: "article"
                }, {
                    containerClass: "article_poll_creation"
                }), N.chooseMedia = ((t, i) => {
                    var n = e.getCaptionEl().innerHTML;
                    this._deleteParagraphFrom(a), this._forgetObject(s._uuid);
                    var l = Object(r.e)({
                        type: _.b.ObjectPoll,
                        mediaId: t,
                        sep: o
                    });
                    h.add(_.b.ObjectPoll, t, {
                        editable: !0,
                        snippet: i
                    }), o = !1;
                    var d = this._getOrCreateParagraphObject(l);
                    this._insertParagraphAt(a, l), this._redrawModel(), this._saveUndoState(), this.saveDraft(), this._updateTextPlaceholders(), d.setCaptionElHtml(n)
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
                        this._objectPickerEl = J('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var e = "";
                        Object(A.a)("article_poll") && (e = '<button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_poll" onclick="cur.articleEditor.addObjectPoll()"></button>');
                        var t = J(`<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()"></button>\n        ${e}\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>`);
                        this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                            content: t,
                            forceSide: "right",
                            cls: "article_editor_object_picker_tt",
                            autoShow: !1,
                            elClassWhenShown: "article_editor_object_picker_tt_shown",
                            offset: [2, 0]
                        }), this._objectPickerEl.addEventListener("mousedown", e => cancelEvent(e))
                    }
                    var [i, a] = this._getCurrentParagraphIndex();
                    if (!this.isMediaUploadMode() && !1 !== i && i == a && Object(r.H)(this._ps[i], !0) && this._ps[i] && inArray(this._ps[i].type, [_.b.Text, _.b.Header2, _.b.Header3])) {
                        show(this._objectPickerEl);
                        var s = this._getParagraphElByIndex(i),
                            o = V(this._els.editor),
                            n = V(s)[1] - o[1],
                            l = !1;
                        this._uploadFloatList(), this._floatedObjects.forEach(e => {
                            e.startY <= n + 15 && e.endY + 30 >= n && (l = !0)
                        }), setStyle(this._objectPickerEl, {
                            left: l ? 355 : -40,
                            top: n
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
                            content: J(`<a target="_blank" rel="noopener" href="${i}" class="article_editor_link">${a}</a>`)
                        })
                    }
                })
            }
            _isTrackedObjectEl(e) {
                var t = G(e, "uuid");
                return !!t && !!this._getObject(t)
            }
            _cloneObjectParagraphs() {
                for (var e, t = Array.prototype.slice.call(this._els.canvas.children), i = {}; e = t.shift();)
                    if (Object(r.E)(e)) {
                        var a = e.getAttribute("data-uuid"),
                            s = parseInt(e.getAttribute("data-type"));
                        if (i[a]) {
                            var o = this._getObject(a);
                            a = Ce(), this._getOrCreateParagraphObject({
                                type: s,
                                _uuid: a,
                                mediaId: o.getMediaId()
                            }), G(e, "uuid", a)
                        }
                        i[a] = !0
                    }
            }
            _correctCursorToBeWithinCanvas() {
                var [e, t] = Object(r.u)();
                t && e.startContainer == this._els.canvas && this._focusParagraph(0)
            }
            _triggerInputEvent() {
                this._els.canvas.dispatchEvent(new Event("input"))
            }
            getCursor() {
                return this._getCursor()
            }
            _getCursor() {
                var e = this._els.canvas,
                    [t, i] = Object(r.u)();
                if (!t) return !1;
                var a = {
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

                function s(t, i, a) {
                    i.nodeType == Node.TEXT_NODE ? t.textOffset = a : t.nodeOffset = a, q(i, i => {
                        if (i == e) return !0;
                        Object(r.J)(i) && i.firstChild && i.firstChild.nodeType == Node.ELEMENT_NODE && "p" == i.firstChild.tagName.toLowerCase() && t.path.pop(), t.path.push(Object(r.f)(i))
                    }, 10), t.path = t.path.slice().reverse()
                }
                return s(a.start, t.startContainer, t.startOffset), i ? delete a.end : s(a.end, t.endContainer, t.endOffset), a.isEmpty = (() => !a.end && 0 == a.start.nodeOffset && 0 == a.start.path.length && 0 == a.start.path[0]), a
            }
            restoreCursor(e) {
                this._restoreCursor(e)
            }
            _restoreCursor(e) {
                if (!e) return this._restoreCursorFromMarker();
                var t = this._els.canvas;

                function i(e) {
                    var i, a = t;
                    return e.path.forEach((t, s) => {
                        if (Object(r.J)(a)) {
                            var o = a.firstChild;
                            o && 1 == s && o.nodeType == Node.ELEMENT_NODE && "p" == o.tagName.toLowerCase() && (a = o)
                        }
                        t = Math.min(a.childNodes.length - 1, t);
                        var n = a.childNodes[t];
                        if (!n) return e.nodeOffset = i = 0, !1;
                        a = n
                    }), i = a.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(a.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && a && a.children && (i = Math.min(e.nodeOffset, a.childNodes.length)), [a, i]
                }
                var a = document.createRange();
                try {
                    var [s, o] = i(e.start);
                    if (Object(r.y)(s) && 0 == o) {
                        var n = domPN(s);
                        Object(r.G)(n) && 1 == n.childNodes.length && (s = n)
                    }
                    if (a.setStart(s, o), e.end) {
                        var [l, d] = i(e.end);
                        a.setEnd(l, d)
                    }
                    window.getSelection().setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset)
                } catch (e) {
                    debugLog(e)
                }
            }
            _saveLastCursor() {
                var e = this._getCursor(),
                    t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                e && !e.isEmpty() ? ls.set(t, JSON.stringify(e)) : ls.remove(t)
            }
            _restoreLastCursor() {
                var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                e ? (e = JSON.parse(e), this._restoreCursor(e)) : Object(r.o)(this._els.canvas.firstChild)
            }
            _toggleCodeBlocks() {
                for (var e, [t, i] = this._getCurrentParagraphIndex(), a = t; a <= i; a++) void 0 === e && (e = this._ps[a].type != _.b.Code), this._ps[a].type = e ? _.b.Code : _.b.Text;
                var r = this._getCursor();
                this._redraw(!0), this._restoreCursor(r), this._updateTextPlaceholders()
            }
            _removeExtraSeparators() {
                for (var e, t = this._els.canvas.children, i = 0; i < t.length; i++) {
                    var a = t[i],
                        r = G(a, "sep");
                    r && (void 0 !== e && r == e && G(a, "sep", null), e = r)
                }
            }
            _replaceAlienInlineTags() {
                var e = !1,
                    t = {
                        b: "strong",
                        i: "em"
                    };
                return function i(a) {
                    var r = a.tagName.toLowerCase();
                    if (t[r]) {
                        e || (this._saveCursorMarker(), e = !0);
                        var s = ce(t[r], {
                            innerHTML: a.innerHTML
                        });
                        ne(a, s)
                    } else
                        for (var o, n = Array.prototype.slice.call(a.childNodes); o = n.shift();) o.nodeType == Node.ELEMENT_NODE && i.call(this, o)
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
                                    o = Q(s),
                                    n = V(s),
                                    l = n[1] < e + t && n[1] + o[1] > e;
                                i._object.onViewport && i._object.onViewport(l)
                            }
                        })
                    });
                    var e = 0;
                    this._setEventListener(document, "selectionchange", () => {
                        var [t, i] = Object(r.u)();
                        if (!t || q(t.commonAncestorContainer, e => e == this._els.canvas)) {
                            var [s] = this._getCurrentParagraphIndex();
                            if (!1 !== s) {
                                if (!i && K(t.startContainer, "article")) {
                                    var o = this._ps[e];
                                    if (Object(r.D)(o)) return void Object(r.o)(o._object.getCaptionEl())
                                }
                                var n = t.startContainer;
                                if (B.msie && i && ae("article_ed__extra_controls", n) && "BUTTON" != n.tagName) {
                                    var l = this._ps[s];
                                    if (Object(r.D)(l)) return void l._object.getCaptionEl().focus()
                                }
                                e = s, this._highlightObjectsInCurrentSelection(), this._showObjectPicker(), this._correctCaptionSelection(), this._ensureDummyParagraphs(), 0 == a && this._showFormatTooltip(), this._saveLastCursor();
                                var d = this._getParagraph(s);
                                if (Object(r.D)(d) && _.c.includes(parseInt(d.type))) {
                                    if (this._resizeTooltip) {
                                        clearTimeout(h);
                                        var h = setTimeout(() => {
                                            this._showResizeTooltip()
                                        }, 100)
                                    }
                                } else this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()
                            } else this._showObjectPicker()
                        } else this._showObjectPicker()
                    });
                    var t = !1,
                        i = !1,
                        a = !1;
                    this._els.canvas.addEventListener("mousedown", () => {
                        var e;
                        a = !0, this._setEventListener(window, "mouseup", e = (t => {
                            a = !1, "article_format_btn_link" == t.target.id || (this._showFormatTooltip(), e && window.removeEventListener("mouseup", e))
                        }))
                    }), this._els.canvas.addEventListener("selectstart", () => {
                        this._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", e => {
                        var [t, i] = Object(r.u)();
                        if (i) {
                            var [a] = this._getContainingParagraphEl(t.commonAncestorContainer);
                            Object(r.E)(a) && (e.clipboardData.setData("text/plain", "uuid:" + a.getAttribute("data-uuid")), e.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", e => {
                        var [t] = this._getCurrentParagraphIndex();
                        t && (this._handleObjectPaste(e), this._handleLinkPaste(e), this._handlePhotoPaste(e), this._fromPasteEvent = !0, this._pasteCurrentIndex = t)
                    }), this._els.canvas.addEventListener("click", e => {
                        if (e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName) return cancelEvent(e)
                    });
                    var s = !1;
                    this._els.canvas.addEventListener("input", () => {
                        this._hideObjectPicker(), this._expandBlockquoteParagraphs(l), this._removeExtraSeparators();
                        var e, a = this._replaceAlienInlineTags();
                        B.safari || this._els.canvas.normalize(), this._fromPasteEvent || a || this._markerCursorSet ? this._saveCursorMarker() : e = this._getCursor(), this._processAlienPhotos(), this._flattenAlienParagraphs(), this._cloneObjectParagraphs(), this._ps.length > 0 && this._els.canvas.children.length !== this._ps.length && this._setAllParagraphsDirty(), this._dirty.forEach(this._updateLineData.bind(this)), s && (this._cleanParagraphsBRs(), s = !1), this._ensureAtLeastOneParagraph(), this._ensureTitleParagraph();
                        var r = !1;
                        if (this._fromPasteEvent) try {
                            r = this._expandDoubleBRs()
                        } catch (e) {
                            console.error(e)
                        }
                        this._redraw(r), this._restoreCursor(e), this._correctCursorToBeWithinCanvas(), this._dirty = [], i ? this._saveUndoStateDelayed() : this._saveUndoState(), t = i = !1, this._fromPasteEvent = !1, this._updateTextPlaceholders(), this.saveDraft(), this._undoable = !0, this._options.onUndoRedo && this._options.onUndoRedo()
                    });
                    var o, n = !1,
                        l = !1,
                        d = 1;
                    this._els.canvas.addEventListener("keydown", e => {
                        var a = e.keyCode,
                            h = e.metaKey || e.ctrlKey,
                            c = e.shiftKey,
                            [p, g] = Object(r.u)();
                        if (p) {
                            var [u, b] = this._getCurrentParagraphIndex(), v = this._getParagraph(u), f = !1;
                            if (Object(r.D)(v))
                                if (v._object.isCaptionFocused()) f = 0 == p.startOffset && g;
                                else {
                                    var [m] = this._getContainingParagraphEl(p.startContainer);
                                    f = m == v._object.el()
                                }
                            if (f && g && B.mozilla) {
                                if (a == ge.Up) return this._focusParagraph(u - 1, !0), cancelEvent(e);
                                if (a == ge.Down) return this._focusParagraph(u + 1, !0), cancelEvent(e)
                            }
                            if ((a == ge.Delete || a == ge.Backspace) && this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide(), a == ge.Tab && g && 0 == u) return Object(r.o)(this._getParagraphElByIndex(1)), cancelEvent(e);
                            if (h && a == ge.KeyA && Object(r.D)(v) && v._object.isCaptionFocused()) {
                                var j = v._object.getCaptionEl();
                                return Object(r.S)(j), cancelEvent(e)
                            }
                            if (h) switch (a) {
                                case ge.KeyB:
                                    return this._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(e);
                                case ge.KeyI:
                                    return this._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(e);
                                case ge.KeyS:
                                    return this.saveDraft(!1, !1, !0), cancelEvent(e);
                                case ge.KeyZ:
                                    return c ? this.redo() : this.undo(), cancelEvent(e);
                                case ge.KeyY:
                                    return this.redo(), cancelEvent(e)
                            }
                            var C = a == ge.KeyC && e.altKey,
                                E = v ? v.type : _.b.Text,
                                y = Object(D.U)("pre", p.startContainer),
                                P = !!(y || Object(D.U)("pre", p.endContainer) || p.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == p.startContainer.tagName);
                            if (C) {
                                if (E === _.b.Header1) return cancelEvent(e);
                                if (g) return this._toggleCodeBlocks(), cancelEvent(e);
                                if (!P && inArray(E, [_.b.Text, _.b.NumericList, _.b.BulletList])) {
                                    this._setCurrentParagraphDirty();
                                    var w = Object(D.U)("code", p.startContainer) || Object(D.U)("code", p.endContainer);
                                    if (w) {
                                        this._saveCursorMarker();
                                        var x = J("<span></span>");
                                        x.innerHTML = w.innerHTML, ne(w, x), this._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), B.msie && this._triggerInputEvent();
                                    return cancelEvent(e)
                                }
                            }
                            if (a == ge.Tab && P && E == _.b.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(e);
                            var I = !1;
                            if (a == ge.Backspace) {
                                if (n) return n[0].textContent = n[1], this._restoreCursor(n[2]), n = !1, cancelEvent(e);
                                if (f) {
                                    var T = this._getParagraphElByIndex(u),
                                        k = Object(r.l)("", Object(r.w)(v));
                                    return this._correctEmptyParagraphAfterFloatObjects(), ne(T, k), Object(r.o)(k), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                }
                                if (p && 0 == p.startOffset && p.collapsed) {
                                    var S = Object(D.U)("li", p.startContainer),
                                        L = Object(r.r)(S);
                                    if (S) {
                                        var M = this._ps[u],
                                            A = clone(M),
                                            N = clone(M);
                                        A.lines = A.lines.slice(0, L);
                                        var U = Object(r.e)({
                                            lines: [clone(M.lines[L])]
                                        });
                                        N.lines = N.lines.slice(L + 1), this._ps.splice(u, 1, A, U, N), this._redraw(!0);
                                        var z = this._getParagraphElByIndex(u + 1);
                                        return Object(r.o)(z), this._saveUndoState(), cancelEvent(e)
                                    }
                                }
                                if (p && g && 0 == p.startOffset && "LI" !== p.startContainer.nodeName) {
                                    var [F] = this._getCurrentParagraphIndex(), $ = F > 0 && this._ps[F - 1];
                                    if (Object(r.D)($)) {
                                        Object(r.H)(this._ps[F]) && (this._ps.splice(F, 1), this._redraw(!0));
                                        var R = this._getParagraphElByIndex(F - 1);
                                        return Object(r.o)(R), cancelEvent(e)
                                    }
                                }
                                this._setAllParagraphsDirty(), B.msie && setTimeout(() => {
                                    this._triggerInputEvent()
                                })
                            }
                            if (a == ge.Delete) {
                                var K = this._ps[u],
                                    G = this._ps[u + 1],
                                    [Q] = getCaretCharacterOffsetWithin(p.startContainer),
                                    V = p.startContainer.textContent.length == Q;
                                if (f && (!K._object.isCaptionFocused() || !K.lines[0].text)) {
                                    var Y = this._getParagraphElByIndex(u),
                                        q = Object(r.l)();
                                    return ne(Y, q), Object(r.o)(q), this._setAllParagraphsDirty(), this._triggerInputEvent(), cancelEvent(e)
                                }
                                if (g && Object(r.w)(G) && V) return this._setParagraphDirty(u + 1), delete G.sep, this._redraw(!1, !0), cancelEvent(e);
                                if (g && V && Object(r.D)(G)) return Object(r.H)(K) && K.type != _.b.Header1 && (this._ps.splice(u, 1), this._redraw(!0, !0)), Object(r.o)(G._object.getCaptionEl()), cancelEvent(e);
                                G && Object(r.H)(K) && inArray(G.type, [_.b.Header2, _.b.Header3]) && (K.type = G.type, this._setParagraphDirty(u), this._redraw()), this._setAllParagraphsDirty(), (B.msie && 0 == p.startOffset && 0 == u || c) && setTimeout(() => {
                                    this._setCurrentParagraphDirty(), this._triggerInputEvent()
                                })
                            } else if (a == ge.Enter) {
                                if (P && y && E == _.b.Code && g) {
                                    var Z = y.textContent.search(/[^\s]/);
                                    return -1 == Z && (Z = y.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(Z)), cancelEvent(e)
                                }
                                if (this._isWithinObjectParagraphEl(Object(r.s)())) {
                                    var [ee, te] = this._getContainingParagraphEl(Object(r.s)()), ae = Object(r.l)(), re = this._ps[te]._object;
                                    return !re.isCaptioned() || re.isCaptionFocused() ? ie(ae, ee) : X(ae, ee), this._setAllParagraphsDirty(), Object(r.o)(ae), this._triggerInputEvent(), cancelEvent(e)
                                }
                                var [se, oe, le] = this._getContainingParagraphEl(Object(r.s)()), [, de] = getCaretCharacterOffsetWithin(se);
                                if (e.shiftKey || e.ctrlKey && B.safari) {
                                    var [, ce] = getCaretCharacterOffsetWithin(se), pe = W("li", p.startContainer), ue = 0;
                                    pe && (ue = he(pe));
                                    var be = !1;
                                    if (H(le.lines, (e, t) => {
                                            var i = t.brs,
                                                a = t.text.length;
                                            return 0 == ce || ce <= a && inArray(ce, i) ? (be = !0, !1) : !((ce -= a) <= 0 && e == ue) && void 0
                                        }), be) {
                                        s = !0, this._setParagraphDirty(u, b), document.execCommand("insertParagraph");
                                        var ve = _e(se);
                                        return ve && (Object(r.o)(ve), ve.focus()), this._triggerInputEvent(), cancelEvent(e)
                                    }
                                    B.msie && 0 == ce && p.insertNode(J("<br>"))
                                }
                                var fe = g && p.startContainer.nodeType == Node.TEXT_NODE && !p.startContainer.nextSibling && de == se.textContent.length;
                                l = fe && !Object(r.C)(this._ps[u]) && !e.shiftKey && inArray(le.type, [_.b.Quote, _.b.Quote2]), window.browser && window.browser.msie && setTimeout(this._triggerInputEvent.bind(this)), this._setParagraphDirty(u, b)
                            } else e.key && 1 == e.key.length && (this._setParagraphDirty(u), this._setParagraphDirty(b), e.metaKey || (I = !0, e.key && (Object(r.z)(e.key) ? d += 1 : Object(r.B)(e.key) && (d -= 1), d = Math.min(Math.max(d, -5), 5))), t = Object(r.L)(e.key), I && !t && (i = !0), setTimeout(() => {
                                var [e, t] = Object(r.u)(), i = this._getParagraph(u);
                                if (i && i.type != _.b.Code && !(Object(D.U)("code", e.startContainer) || e.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == e.startContainer.tagName) && (o = o || d > 0, t && e)) {
                                    var a = e.startContainer;
                                    if (a.nodeType == Node.TEXT_NODE && e.startOffset > 0)
                                        for (var s = a.textContent.substring(e.startOffset - 5, e.startOffset), l = 0, h = O.length; l < h; l++) {
                                            var c = O[l];
                                            if (void 0 === c.cyrillic || c.cyrillic === o)
                                                if (c.pattern instanceof RegExp) {
                                                    var p = s.match(c.pattern);
                                                    if (p) {
                                                        var g = c.substitution;
                                                        p.length > 1 && (g = g.replace("$1", p[1])), b.call(this, e.startOffset, a, p[0], g, c.noUndo);
                                                        break
                                                    }
                                                } else if (s.endsWith(c.pattern)) {
                                                b.call(this, e.startOffset, a, c.pattern, c.substitution, c.noUndo);
                                                break
                                            }
                                        }
                                }

                                function b(e, t, i, a, r) {
                                    var s = this._getCursor(),
                                        o = t.textContent.substring(0, e - i.length),
                                        l = t.textContent.substring(e);
                                    r || (n = [t, o + i + l, s]), t.textContent = o + a + l, this._restoreCursor(s), this._setParagraphDirty(u), this._triggerInputEvent()
                                }
                            }, 0));
                            n = !1
                        }
                    }), this._setEventListener(window, "resize", () => {
                        this._resizeTooltip && this._resizeTooltip.isShown() && this._updatePositionResizeTooltip()
                    })
                }
            }
            _isParagraphEl(e) {
                return e && K(e, r.a)
            }
            _isWithinObjectParagraphEl(e) {
                var [t] = this._getContainingParagraphEl(e);
                return t && Object(r.E)(t)
            }
            _highlightObjectsInCurrentSelection() {
                var [e, t] = this._getCurrentParagraphIndex();
                !1 !== e && !1 !== t && this._ps.forEach((i, a) => {
                    if (i._object) {
                        var r = e != t;
                        i._object.highlight(a >= e && a <= t, r)
                    }
                })
            }
            _getOrCreateParagraphObject(e) {
                e._uuid || (e._uuid = Ce());
                var t = this._getObject(e._uuid);
                if (!t) {
                    var i = e.mediaId || "";
                    switch (parseInt(e.type)) {
                        case _.b.ObjectPhoto:
                            t = new b(i, this, e);
                            break;
                        case _.b.ObjectVideo:
                            t = new v(i, this);
                            break;
                        case _.b.ObjectGIF:
                            t = new f(i, this);
                            break;
                        case _.b.ObjectAudio:
                            t = new j(i, this);
                            break;
                        case _.b.ObjectAudioPlaylist:
                            t = new p(i, this);
                            break;
                        case _.b.ObjectPodcast:
                            t = new m(i, this);
                            break;
                        case _.b.ObjectTwitter:
                            t = new w(i, this);
                            break;
                        case _.b.ObjectInstagram:
                            t = new I(i, this);
                            break;
                        case _.b.ObjectFacebook:
                            t = new x(i, this);
                            break;
                        case _.b.ObjectVK:
                            t = new T(i, this);
                            break;
                        case _.b.ObjectTelegram:
                            t = new k(i, this);
                            break;
                        case _.b.ObjectPoll:
                            t = new S(i, this)
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
                        var [i, a, s] = Object(r.O)(t), o = this._getObject(a);
                        if (!o) return;
                        var n = Object(r.e)();
                        if (o.getCaptionEl()) {
                            var l = this._getParagraphFromHTML("", o.getCaptionEl().innerHTML, !0);
                            if (i == _.b.ObjectPhoto) {
                                var d = G(o.el(), "paragraph-lines");
                                d && (n.lines = JSON.parse(d));
                                var h = o.getImageIndex();
                                n.lines[h] = l.lines[0];
                                for (var c = 0; c < n.lines.length; c++) n.lines[c] = n.lines[c] || {
                                    text: "",
                                    decorations: {}
                                }
                            } else n.lines[0] = l.lines[0]
                        }
                        n.type = i, n.mode = s, n._uuid = a, n._object = o, this._ps[e] = n
                    } else if (t.nodeType == Node.ELEMENT_NODE) {
                        var p = t.tagName.toLowerCase();
                        this._ps[e] = this._getParagraphFromHTML(p, t.innerHTML)
                    } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent);
                    t.nodeType == Node.ELEMENT_NODE && G(t, "sep") && (this._ps[e].sep = !0)
                }
            }
            onDragEnd() {
                this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
            }
            getCurrentParagraphs() {
                var [e, t] = this._getCurrentParagraphIndex();
                return [this._getParagraphElByIndex(e), this._getParagraphElByIndex(t)]
            }
            _initObjectDrag() {
                var e, t, i, a, s, o = !1,
                    n = this._els;

                function l(e) {
                    s != e && (H(geByClass("article_ed__drag_hovered"), (e, t) => {
                        R(t, "article_ed__drag_hovered")
                    }), e && U(e, "article_ed__drag_hovered"), s = e)
                }

                function d() {
                    window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t), o = !1, R(n.canvas, "no_select"), clearInterval(a), l(!1), Y(i), i = !1
                }
                this._els.canvas.addEventListener("mousedown", s => {
                    if (i && Y(i), 2 == s.button) return d(), cancelEvent(s);
                    var n = Q(this._els.canvas)[1];
                    R(this._els.canvas, "no_select"), l(!1);
                    var [h, c, _] = this._getContainingParagraphEl(s.target);
                    if (Object(r.D)(_)) {
                        var p, g, u, b, v, f = s.pageY;
                        window.addEventListener("mousemove", e = (e => {
                            if (i || !(Math.abs(f - e.pageY) < 10)) {
                                i || (i = J('<div class="article_ed__drag_shadow"></div>'), this._els.editor.appendChild(i), (p = V(this._els.canvas))[1] -= scrollGetY(), g = Q(h), u = V(h), b = e.pageX - u[0], v = e.pageY - u[1] + this._options.layer.scrollTop, setStyle(i, {
                                    width: g[0],
                                    height: g[1]
                                }), this._focusParagraph(c)), U(this._els.canvas, "no_select"), p || d(), setStyle(i, {
                                    left: e.pageX - p[0] - b,
                                    top: e.pageY - scrollGetY() - v - p[1] + this._options.layer.scrollTop
                                }), clearInterval(a), e.pageY - scrollGetY() < 200 ? a = setInterval(() => {
                                    this._options.layer.scrollTop -= 10
                                }, 10) : e.pageY - scrollGetY() > window.innerHeight - 200 && (a = setInterval(() => {
                                    this._options.layer.scrollTop + window.innerHeight > n + 300 ? clearInterval(a) : this._options.layer.scrollTop += 10
                                }, 10));
                                var [t, r] = this._getContainingParagraphEl(e.target);
                                t && t != h && t != Object(D.A)(h) ? (l(t), o = r) : (l(!1), o = !1)
                            }
                        })), window.addEventListener("mouseup", t = (() => {
                            !1 !== o && c && (this._ps.splice(c, 1), Object(r.w)(_) && (this._ps[c].sep = 1, delete _.sep), this._ps.splice(o + 1, 0, _), this._redraw(!0, !0), this.saveUndoStateAndDraft(), this._resizeTooltip && this._resizeTooltip.isShown() && this._resizeTooltip.hide()), d()
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
                var t = F("article_ed__warn_info", this._els.editor);
                t && !e && (R(this._els.editor, "article_ed__warn_shown"), Y(t)), t || e && (t = J(`<div class="article_ed__warn_info">${e}</div>`), this._els.editor.appendChild(t), U(this._els.editor, "article_ed__warn_shown"))
            }
            _initResizeTooltip() {
                var e = J('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
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
                var [e] = this._getCurrentParagraphIndex(), t = this._getParagraphElByIndex(e), i = this._getParagraph(e), a = intval(i.type);
                if (_.c.includes(a))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), K(t, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else if (i._object.isLoading()) this._resizeTooltip.hide();
                else {
                    var r = [{
                            id: _.a.Float,
                            type: "inline"
                        }, {
                            id: _.a.Normal,
                            type: "text"
                        }, {
                            id: _.a.Medium,
                            type: "bigger"
                        }, {
                            id: _.a.Large,
                            type: "cover"
                        }],
                        s = F("resize-tooltip__btns"),
                        o = [1, 1, 1, 1];
                    switch (a) {
                        case _.b.ObjectPhoto:
                            i._object._isCarousel() ? o = [0, 1, 1, 0] : i._object._isSmallPhotoSize() || (o = [1, 1, 0, 0]);
                            break;
                        case _.b.ObjectGIF:
                            i._object._isSmallGifSize() || (o = [1, 1, 0, 0]);
                            break;
                        case _.b.ObjectTwitter:
                        case _.b.ObjectFacebook:
                        case _.b.ObjectInstagram:
                        case _.b.ObjectVK:
                        case _.b.ObjectTelegram:
                            o = [1, 1, 0, 0]
                    }
                    s.innerHTML = "", r.forEach((e, t) => {
                        o[t] && s.appendChild(J(`\n          <button class="article_format_btn${i.mode==e.id||!i.mode&&!e.id?" article_format_btn_active":""}" id="article_format_btn_${e.type}"  data-mode=${e.id} ></button>\n        `))
                    }), this._updatePositionResizeTooltip()
                }
            }
            _updatePositionResizeTooltip() {
                var e = this._resizeTooltip,
                    [, t] = V(this._els.editor),
                    [i] = this._getCurrentParagraphIndex(),
                    a = this._getParagraphElByIndex(i),
                    {
                        top: r,
                        left: s,
                        width: o
                    } = a.getBoundingClientRect(),
                    n = Q(e._ttel)[0] / 2;
                setStyle(e._ttel, {
                    top: r - t - 60 + window.scrollY + 140,
                    left: s + o / 2 - n
                })
            }
            setModeObject(e, t = _.a.Normal) {
                var i = this._getParagraph(e);
                Object(r.D)(i) && (i.mode = t, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
            }
            setModeCurrentObject(e = _.a.Normal) {
                var [t] = this._getCurrentParagraphIndex();
                this.setModeObject(t, e)
            }
            _uploadFloatList() {
                var e = V(this._els.editor);
                this._floatedObjects = [], this._ps.forEach((t, i) => {
                    if (t.mode && parseInt(t.mode) === _.a.Float) {
                        var a = this._getParagraphElByIndex(i),
                            {
                                height: r
                            } = a.getBoundingClientRect(),
                            s = V(a);
                        this._floatedObjects.push({
                            startY: s[1] - e[1],
                            endY: s[1] - e[1] + r
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