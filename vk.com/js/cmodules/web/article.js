! function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var i = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 215)
}({
    131: function(e, t, r) {
        "use strict";

        function n(e, t) {
            var r = domQuery1("[data-sizes]", e),
                n = JSON.parse(domData(r, "sizes")),
                o = (domData(r, "media-links") || "").split(",");
            if (!(n.length <= 1 || domData(e, "carousel-inited")))
                if (domData(e, "carousel-inited", 1), t.mobile) i(n, e);
                else {
                    var s = a(n, e, t, o);
                    data(e, "changePhotoFunction", s)
                }
        }

        function i(e, t) {
            var r = geByClass1("article_photo_carousel__controls", t),
                n = geByClass1("article_photo_carousel__counter", t),
                i = domData(n, "counter-lang") || getLang("global_article_carousel_counter"),
                a = getSize(geByClass1("article_figure_content", t)),
                c = domPN(geByTag1("img", t)),
                l = 0,
                d = void 0,
                u = 0,
                p = void 0,
                h = void 0,
                f = 0,
                _ = !1,
                g = !1,
                v = !1;
            r.addEventListener("touchstart", function(e) {
                h = e.touches[0].pageX, p = e.touches[0].pageY
            });
            var m = !1,
                y = void 0;
            r.addEventListener("touchmove", function(r) {
                if (!g && (Math.abs(r.touches[0].pageY - p) > 5 || _)) return void(_ = !0);
                if (!v && (u = r.touches[0].pageX - h, !(Math.abs(u) < 10) || m)) {
                    g || window.addEventListener("touchmove", y = function(e) {
                        return cancelEvent(e)
                    }, {
                        passive: !1
                    }), g = !0, m = !0;
                    var n = Math.min(e.length - 1, Math.max(0, l + (0 > u ? 1 : -1))),
                        i = 0 === n && 0 === l,
                        b = n === e.length - 1 && l === e.length - 1;
                    if (f !== n)
                        if (f = n, re(d), i || b) d = !1;
                        else {
                            var w = Object(o.getAppropriateImage)(e[n], a[0], !0),
                                E = s(w, 1),
                                C = E[0];
                            d = ce("div", {
                                innerHTML: '<img src="' + C + '">'
                            }), setStyle(domFC(d), {
                                "max-width": a[0],
                                "max-height": a[1],
                                width: "initial"
                            }), setStyle(d, {
                                transform: "scale(1.05)",
                                opacity: 0
                            }), domInsertBefore(d, domPN(geByTag1("img", t)))
                        }
                    var P = Math.abs(u),
                        O = 0;
                    O = i || b ? .2 * u : u, setStyle(c, {
                        transform: "translateX(" + O + "px)"
                    }), d && setStyle(d, {
                        transform: "scale(" + Math.max(1, 1.05 - 5e-4 * P) + ")",
                        opacity: Math.min(1, .01 * P)
                    })
                }
            }), r.addEventListener("touchend", function() {
                m = !1, _ = !1, v = !0, g = !1, y && window.removeEventListener("touchmove", y);
                var t = 0 > u,
                    r = Math.abs(u) < 50 || !d;
                if (!r) {
                    l = f;
                    for (var p = l; p < Math.min(l + 3, e.length); p++) {
                        var h = Object(o.getAppropriateImage)(e[p], a[0], !0),
                            b = s(h, 1),
                            w = b[0];
                        Object(o.preloadImage)(w)
                    }
                }
                n.innerHTML = i.replace("{counter}", l + 1).replace("{total}", e.length), addClass(c, "with_transition"), addClass(d, "with_transition"), setTimeout(function() {
                    r ? (setStyle(c, {
                        transform: "translateX(0px)",
                        opacity: 1
                    }), setStyle(d, {
                        transform: "scale(1.05)",
                        opacity: 0
                    })) : (setStyle(c, {
                        transform: "translateX(" + (t ? "-500px" : "500px") + ")"
                    }), setStyle(d, {
                        transform: "scale(1)",
                        opacity: 1
                    }))
                }), setTimeout(function() {
                    v = !1, f = !1, removeClass(c, "with_transition"), removeClass(d, "with_transition"), r ? re(d) : (re(c), c = d), d = !1
                }, 150)
            })
        }

        function a(e, t, r, n) {
            function i(i) {
                c += i, c = Math.min(e.length - 1, Math.max(0, c));
                var a = Object(o.getAppropriateImage)(e[c], p[0], !0),
                    l = s(a, 1),
                    g = l[0],
                    v = "";
                if (r.moderDeletePhoto) {
                    var m = n[c];
                    v = '<a href="' + m + '" target="_blank" class="flat_button article_photo_moder_open">Открыть</a>'
                }
                var y = 0 > i ? "fading_in_left" : "fading_in_right",
                    b = se('<div class="' + y + '"><img src="' + g + '">' + v + "</div>");
                setStyle(domFC(b), {
                    "max-width": p[0],
                    "max-height": Math.ceil(p[1]) + 1,
                    width: "initial"
                }), domInsertAfter(b, domPN(geByTag1("img", t)));
                var w = h;
                setTimeout(function() {
                    removeClass(b, "fading_in_left"), removeClass(b, "fading_in_right"), addClass(w, "fading_out")
                }), setTimeout(function() {
                    re(w)
                }, 150);
                for (var E = c; E < Math.min(c + 3, e.length); E++) {
                    var C = Object(o.getAppropriateImage)(e[E], p[0], !0),
                        P = s(C, 1),
                        O = P[0];
                    Object(o.preloadImage)(O)
                }
                h = b, d.innerHTML = u.replace("{counter}", c + 1).replace("{total}", e.length), toggle(f, c > 0), toggle(_, c < e.length - 1), domData(t, "photo-carousel-index", c)
            }

            function a(e) {
                clearTimeout(g), toggleClass(l, "article_photo_carousel__mouse_idle", e)
            }
            var c = 0,
                l = geByClass1("article_photo_carousel__controls", t),
                d = geByClass1("article_photo_carousel__counter", t),
                u = domData(d, "counter-lang") || getLang("global_article_carousel_counter"),
                p = getSize(geByClass1("article_figure_content", t)),
                h = domPN(geByTag1("img", t)),
                f = geByClass1("article_photo_carousel__left", t),
                _ = geByClass1("article_photo_carousel__right", t),
                g = void 0,
                v = browser.msie && intval(browser.version) <= 11;
            return _.addEventListener("click", function(e) {
                return i(1), v || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
            }), f.addEventListener("click", function(e) {
                return i(-1), v || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
            }), t.addEventListener("mousemove", function() {
                a(!1), addClass(l, "article_photo_carousel__mouse_over"), clearTimeout(g), g = setTimeout(function() {
                    a(!0)
                }, 1e3)
            }), t.addEventListener("mouseleave", function() {
                clearTimeout(g), removeClass(l, "article_photo_carousel__mouse_over"), removeClass(l, "article_photo_carousel__mouse_idle")
            }), i
        }
        r.r(t), r.d(t, "initPhotoCarousel", function() {
            return n
        });
        var o = r(31),
            s = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }()
    },
    136: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i() {
            return ne++ + "-" + Date.now() % 1e6 + "-" + q(0, 99999)
        }
        r.r(t);
        var a = r(246),
            o = r(232),
            s = r(6),
            c = r(191),
            l = r(44),
            d = r(31),
            u = r(140),
            p = r(57),
            h = r(152),
            f = r(55),
            _ = r(60),
            g = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            v = window,
            m = v.cur,
            y = v.browser,
            b = v.each,
            w = v.addClass,
            E = v.geByTag1,
            C = v.geByClass1,
            P = v.extractUrls,
            O = v.removeClass,
            T = v.domClosestByTag,
            j = v.hasClass,
            x = v.domData,
            S = v.intval,
            k = v.getSize,
            I = v.getXY,
            L = v.re,
            N = v.se,
            A = v.domInsertBefore,
            M = v.traverseParent,
            D = v.extend,
            B = v.toggleClass,
            R = v.trim,
            H = v.domInsertAfter,
            U = v.gpeByClass,
            F = v.clean,
            z = v.domReplaceEl,
            W = v.isObject,
            K = v.show,
            $ = v.hide,
            Y = v.setStyle,
            q = v.irand,
            Q = v.clone,
            V = v.inArray,
            X = v.isEmpty,
            G = {
                KeyA: 65,
                KeyB: 66,
                KeyC: 67,
                KeyI: 73,
                KeyS: 83,
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
            J = [{
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
            Z = J.slice().reverse(),
            ee = {};
        b(J, function(e, t) {
            ee[t.tag] = t
        });
        var te = {};
        b(J, function(e, t) {
            te[t.type] = t
        });
        var re = 50,
            ne = 1,
            ie = function() {
                function e(t, r, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    n(this, e), this._id = i(), m.lang = m.lang || {}, D(m.lang, o.lang), this._options = o, this._els = {
                        editor: ge(t),
                        canvas: N('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                    }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = N('<div class="article_photo_upload"></div>')), w(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._objects = {}, Object(p.initLimits)(o.limits);
                    var s = a || [];
                    if (o.postData) {
                        var c = o.postData.text || "";
                        c = c.replace(/❤/g, "❤️"), c = c.split("\n");
                        var u = [];
                        u.push(Object(l.buildParagraph)({
                            type: d.ParagraphType.Header1,
                            lines: [{
                                text: ""
                            }]
                        })), c.forEach(function(e) {
                            R(e) && u.push(Object(l.buildParagraph)({
                                lines: [{
                                    text: e
                                }]
                            }))
                        }), s = u.concat(s)
                    }
                    s && 0 != s.length || (s = [Object(l.buildParagraph)({
                        type: this._options.noTitle ? d.ParagraphType.Text : d.ParagraphType.Header1
                    })]), s = s.filter(function(e) {
                        return e !== !1
                    }), s.forEach(function(e) {
                        e.lines.forEach(function(e) {
                            e.text = Object(l.replaceParagraphEntities)(e.text), e.brs && W(e.brs) && (e.brs = Object(l.convertBRsToArray)(e.brs))
                        })
                    }), o.needIndexCorrection && Object(l.correctRealIndexes)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(), this._initObjectDrag(), o.postData ? Object(l.focusEl)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), o.coverPhoto && this.setCoverPhoto(o.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this.showEditLockInfo(), this.showRevEditInfo(), this._publishNameCandidate = o.name || this._getName()
                }
                return e.prototype._setEventListener = function(e, t, r) {
                    this._events = this._events || [], this._events.push({
                        el: e,
                        event: t,
                        handler: r
                    }), e.addEventListener(t, r)
                }, e.prototype.setCoverPhoto = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                    this._coverPhoto = e, this._options.isPublished || this.saveDraft(t)
                }, e.prototype.getCoverPhoto = function() {
                    return this._coverPhoto === !1 ? !1 : this._coverPhoto ? this._coverPhoto : void 0
                }, e.prototype.getFirstCoverPhotoFromParagraphs = function() {
                    var e = !1;
                    return this._ps.forEach(function(t) {
                        if (!e && t.type == d.ParagraphType.ObjectPhoto) {
                            var r = t._object.getMediaId(0);
                            e = {
                                id: r,
                                data: f["default"].get(r)
                            }
                        }
                    }), e
                }, e.prototype.getPublishName = function() {
                    return this._publishName || this._publishNameCandidate || this._getName()
                }, e.prototype.setPublishName = function(e) {
                    this._publishName = e, this._options.isPublished || this.saveDraft(!0)
                }, e.prototype._updateTextPlaceholders = function() {
                    if (!this._options.noTitle) {
                        this._els.placeholders || (this._els.placeholders = N('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = N("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = N("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders));
                        var e = Object(l.isParagraphEmpty)(this._ps[0]);
                        e ? O(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : w(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                        var t = this._ps[1],
                            r = t ? t.sep : !1,
                            n = this._getCurrentParagraphIndex(),
                            i = g(n, 1),
                            a = i[0],
                            o = Object(l.isParagraphEmpty)(t) && (t ? t.type != d.ParagraphType.Code : !0);
                        o && 2 > a && this._ps.length <= 2 && !r ? O(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : w(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                    }
                }, e.prototype.destroy = function() {
                    this._els.editor.innerHTML = "", O(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(function(e) {
                        e.el.removeEventListener(e.event, e.handler)
                    }), delete m.docsCurFilter
                }, e.prototype.getLimits = function() {
                    return this._options.limits
                }, e.prototype.getOptions = function() {
                    return this._options
                }, e.prototype.getWidth = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                    return k(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
                }, e.prototype.getPhotoUploadOptions = function() {
                    return this._options.photoUploadOptions
                }, e.prototype.getPhotoUploadEl = function() {
                    return this._photoUploadEl
                }, e.prototype.removeObject = function(e) {
                    var t = this;
                    b(this._ps, function(r, n) {
                        if (n._object == e) {
                            var i = t._getParagraphElByIndex(r + 1);
                            return Object(l.focusEl)(i), L(t._getParagraphElByIndex(r)), t._setAllParagraphsDirty(), t._triggerInputEvent(), !1
                        }
                    })
                }, e.prototype._parseUrlParagraph = function(e) {
                    var t = this,
                        r = this._getParagraph(e);
                    if (r && r.type == d.ParagraphType.Text && r.lines.length && r.lines[0].text) {
                        var n = P(r.lines[0].text, !0),
                            i = n && n.length ? n[0].url : "";
                        if (i && r.lines[0].text == i) {
                            var a = this._getCurrentParagraphIndex(),
                                o = g(a, 1),
                                s = o[0];
                            L(this._els.shareParseForm), L(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(N('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                                value: i
                            })), this._els.shareParseForm.appendChild(ce("input", {
                                type: "hidden",
                                name: "index",
                                value: 1
                            })), this.getOptions().useShareForceMedia && this._els.shareParseForm.appendChild(ce("input", {
                                type: "hidden",
                                name: "force_media",
                                value: 1
                            })), window.onUploadFail = function() {}, window.onUploadDone = function(e) {
                                if (e) {
                                    var r = void 0,
                                        n = {},
                                        i = e[2];
                                    switch (e[0]) {
                                        case "doc":
                                            "gif" == i.ext && (r = d.ParagraphType.ObjectGIF, n = {
                                                size: i.video_preview_size,
                                                video: i.video_preview,
                                                href: i.href
                                            });
                                            break;
                                        case "photo":
                                            r = d.ParagraphType.ObjectPhoto, n = {
                                                sizes: i.editable.sizes
                                            };
                                            break;
                                        case "video":
                                            r = d.ParagraphType.ObjectVideo, n = {
                                                fromExtPage: S(i.from_ext_page),
                                                editable: i.editable,
                                                duration: i.editable.duration,
                                                platform: i.editable.platform
                                            }
                                    }
                                    if (r) {
                                        var a = Object(l.hasSeparator)(t._ps[s]),
                                            o = {
                                                mediaId: e[1],
                                                type: r,
                                                sep: a
                                            };
                                        f["default"].add(o.mediaId, n), t._linkTooltip && t._linkTooltip.hide(), o = Object(l.buildParagraph)(o), t._getOrCreateParagraphObject(o), t._ps[s] = o;
                                        var c = t._getCursor();
                                        t._redrawModel(), t._restoreCursor(c), t._saveUndoState(c), setTimeout(function() {
                                            t.onObjectStateLoaded()
                                        }, 10)
                                    }
                                }
                            }, this._els.shareParseForm.submit()
                        }
                    }
                }, e.prototype._handleObjectPaste = function(e) {
                    var t = e.clipboardData || e.originalEvent.clipboardData,
                        r = t.getData("text/plain");
                    if (r) {
                        var n = r.split(":"),
                            i = g(n, 2),
                            a = i[0],
                            o = i[1];
                        if ("uuid" == a && o) {
                            var s = domQuery1('[data-uuid="' + o + '"]');
                            if (s) {
                                var c = s.cloneNode(!0);
                                c.setAttribute("data-force-update", "1");
                                var l = this._getCurrentParagraphIndex(),
                                    d = g(l, 1),
                                    u = d[0];
                                H(c, this._getParagraphElByIndex(u)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                            }
                        }
                    }
                }, e.prototype._handleLinkPaste = function(e) {
                    var t = this,
                        r = (e.clipboardData || e.originalEvent.clipboardData).items;
                    for (var n in r)
                        if (r.hasOwnProperty(n)) {
                            var i = r[n];
                            "string" === i.kind && ! function() {
                                var e = t._getCurrentParagraphIndex(),
                                    r = g(e, 1),
                                    n = r[0];
                                i.getAsString(function(e) {
                                    var r = P(e, !0);
                                    if (1 === r.length) {
                                        var i = r[0].url,
                                            a = t._getParagraphElByIndex(n);
                                        Object(l.traverseTree)(a, function(e) {
                                            if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(i) >= 0) {
                                                var r = M(e, function(e) {
                                                    return e.tagName && "a" == e.tagName.toLowerCase()
                                                }, 3);
                                                if (!r) {
                                                    t._saveCursorMarker();
                                                    var a = document.createRange();
                                                    a.setStart(e, e.textContent.indexOf(i)), a.setEnd(e, e.textContent.indexOf(i) + i.length);
                                                    var o = window.getSelection();
                                                    o.removeAllRanges(), o.addRange(a), t._setParagraphDirty(n), document.execCommand("createLink", !1, i), t._restoreCursorFromMarker()
                                                }
                                            }
                                        }, !1)
                                    }
                                })
                            }()
                        }
                }, e.prototype._handlePhotoPaste = function(e) {
                    var t = this;
                    this._photoPasteUploadingProcess = !1;
                    var r = (e.clipboardData || e.originalEvent.clipboardData).items;
                    for (var n in r)
                        if (r.hasOwnProperty(n)) {
                            var i = r[n];
                            "file" === i.kind && ! function() {
                                t._photoPasteUploadingProcess = !0;
                                var e = i.getAsFile(),
                                    r = new FileReader;
                                r.onload = function() {
                                    t._photoPasteUploadingProcess = !1;
                                    var n = t._getCurrentParagraphIndex(),
                                        i = g(n, 1),
                                        a = i[0];
                                    a = a || 0;
                                    var o = Object(l.buildParagraph)({
                                        type: d.ParagraphType.ObjectPhoto
                                    });
                                    t._getOrCreateParagraphObject(o).setBLOB(e);
                                    var s = void 0;
                                    Object(l.isParagraphEmpty)(t._ps[a]) ? (s = a, Object(l.hasSeparator)(t._ps[s]) && (o.sep = 1), t._ps[s] = o) : (s = a + 1, t._insertParagraphAt(s, o)), t._redraw(!0, !0);
                                    var c = new Image;
                                    c.onload = function() {
                                        t._focusParagraph(s + 1), t._showObjectPicker()
                                    }, c.src = r.result
                                }, r.readAsDataURL(e)
                            }()
                        }
                }, e.prototype._getCurrentSelectionState = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = g(e, 2),
                        r = t[0],
                        n = t[1];
                    if (r === !1 || n === !1) return !1;
                    for (var i = {
                            decorations: {},
                            header1: !1,
                            header2: !0,
                            header3: !0,
                            header: !1,
                            object: !1,
                            quote: !0,
                            list: !1,
                            justHeaders: !0
                        }, a = {}, o = 0, s = void 0, c = void 0, u = r; n >= u && u < this._ps.length; u++) {
                        var p = Object(l.isObjectParagraph)(this._ps[u]) ? this._ps[u]._object.getCaptionEl() : this._getParagraphElByIndex(u);
                        if (void 0 === s) {
                            var h = getCaretCharacterOffsetWithin(p),
                                f = g(h, 2);
                            s = f[0], c = f[1]
                        }
                        var _ = this._ps[u];
                        _.lines.forEach(function(e) {
                            var t = e.decorations;
                            J.forEach(function(r) {
                                var n = t[r.type];
                                n && !X(n) && n.forEach(function(t) {
                                    var n = [t[0] + o, t[1] + o];
                                    if ("link" == r.type) s < n[1] && c > n[0] && (a[r.type] = 1, i.decorations[r.type] = !0);
                                    else if (1 == a[r.type]) {
                                        var l = c >= n[0] && c <= n[1];
                                        c > n[1] || (l ? t[0] > 0 ? a[r.type] = -1 : (a[r.type] = 2, i.decorations[r.type] = !0) : a[r.type] = -1)
                                    } else if (!a[r.type]) {
                                        var d = s >= n[0] && s <= n[1],
                                            u = c >= n[0] && c <= n[1];
                                        d && u ? (a[r.type] = 2, i.decorations[r.type] = !0) : d && (e.text.length > n[1] ? a[r.type] = -1 : a[r.type] = 1)
                                    }
                                })
                            }), o += e.text.length
                        })
                    }
                    for (var v = r; n >= v && v < this._ps.length; v++) Object(l.isObjectParagraph)(this._ps[v]) && (i.captionFocused = i.captionFocused || this._ps[v]._object.isCaptionFocused(), i.object = !0), this._ps[v].type == d.ParagraphType.Header1 && (i.header1 = !0), this._ps[v].type != d.ParagraphType.Header2 && (i.header2 = !1), this._ps[v].type != d.ParagraphType.Header3 && (i.header3 = !1), V(this._ps[v].type, [d.ParagraphType.Header1, d.ParagraphType.Header2, d.ParagraphType.Header3]) ? i.header = !0 : i.justHeaders = !1, V(this._ps[v].type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) || (i.quote = !1), V(this._ps[v].type, [d.ParagraphType.BulletList, d.ParagraphType.NumericList]) && (i.list = !0);
                    var m = Object(l.getRange)(),
                        y = g(m, 1),
                        b = y[0];
                    return b && b.startContainer && j(b.startContainer, "article_ed__noconteditable") ? !1 : (i.multiline = r != n, i)
                }, e.prototype._hideFormatTooltip = function() {
                    this._formatTooltip && this._formatTooltip.hide()
                }, e.prototype._showFormatTooltip = function() {
                    if (!this.isLocked()) {
                        clearTimeout(this._doShowFormatTooltipTO);
                        try {
                            var e = window.getSelection(),
                                t = e.focusNode && (j(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase());
                            if (t) return;
                            var r = !e.isCollapsed;
                            this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, r), 1)
                        } catch (n) {}
                    }
                }, e.prototype._doShowFormatTooltip = function(e) {
                    var t = this;
                    if (!this._formatTooltip) {
                        var r = N('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                            n = void 0;
                        this._formatTooltip = new ElementTooltip(this._els.editor, {
                            cls: "article_format_tt",
                            content: r,
                            customShow: !0,
                            offset: [0, -3],
                            onShow: function() {
                                var e = t._getCurrentSelectionState(),
                                    n = [],
                                    i = !e || e.header1 || e.object && !e.captionFocused;
                                if (i || (e.justHeaders || n.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || n.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), n.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? n.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : n.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (n.push(["header1", "cur.articleEditor.setHeader1(" + S(e.header2) + ")", e.header2]), n.push(["header2", "cur.articleEditor.setHeader2(" + S(e.header3) + ")", e.header3]), n.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 == n.length) return void t._formatTooltip.hide();
                                var a = C("article_format_btns", r);
                                a.innerHTML = "", n.forEach(function(e, t) {
                                    t > 0 && V(e[0], ["header1"]) && a.appendChild(N('<div class="article_format_divider"></div>'));
                                    var r = e[2] ? "article_format_btn_active" : "";
                                    a.appendChild(N('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                                }), t.setLinkMode(!1)
                            },
                            getTargetBoundingBox: function() {
                                if (t._formatTooltip.linkMode) return n;
                                var e = Object(l.getRange)(),
                                    r = g(e, 3),
                                    i = r[0],
                                    a = r[2];
                                if (!a || !a.rangeCount) return n;
                                var o = i.getBoundingClientRect();
                                if (!o.left) {
                                    var s = i.startContainer.nodeType == Node.ELEMENT_NODE ? i.startContainer : domPN(i.startContainer),
                                        c = I(s),
                                        d = k(s);
                                    return n = {
                                        top: c[1] + scrollGetY(),
                                        left: c[0] + d[0] / 2,
                                        width: o.width,
                                        height: o.height
                                    }
                                }
                                return n = {
                                    top: o.top + scrollGetY(),
                                    left: o.left,
                                    width: o.width,
                                    height: o.height
                                }
                            }
                        }), this._formatTooltip.linkMode = !1;
                        var i = E("input", r);
                        i.addEventListener("keypress", function(e) {
                            return e.keyCode == G.Enter ? (t._setLinkToSelectedText(i.value.trim()), t._formatTooltip.hide(), cancelEvent(e)) : void 0
                        });
                        var a = C("article_set_link_delete", r);
                        a.addEventListener("click", function(e) {
                            return t._setLinkToSelectedText(), cancelEvent(e)
                        })
                    }
                    e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
                }, e.prototype._setLinkToSelectedText = function(e) {
                    if (e) {
                        if (e = e.substr(0, 1500), e = e.replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, ""), !e.match("^https?://")) {
                            var t = Object(l.isVKUrl)(e) ? "https" : "http";
                            e = t + "://" + e
                        }
                        e = encodeURIComponent(e)
                    }
                    this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), (y.msie || !e) && this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor), this._linkCursor
                }, e.prototype.clearLink = function() {
                    this.setLinkMode(!1);
                    var e = Object(l.getRange)(),
                        t = g(e, 3),
                        r = t[0],
                        n = t[2],
                        i = T("a", r.startContainer),
                        a = T("a", r.endContainer) || i;
                    i && (this._saveCursorMarker(), n.setBaseAndExtent(i, 0, a, Math.max(1, a.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
                }, e.prototype.setLinkMode = function(e, t) {
                    var r = void 0;
                    e && (r = this._getCursor(), y.msie || document.execCommand("superscript", !1, !0));
                    var n = this._formatTooltip.getContent();
                    if (this._formatTooltip.linkMode != !!e)
                        if (e) {
                            var i = E("input", n);
                            i.value = "", w(n, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), i.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                        } else Y(n, {
                            width: null
                        }), O(n, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
                }, e.prototype.setHeader1 = function(e) {
                    this._setHeader(d.ParagraphType.Header2, !e)
                }, e.prototype.setHeader2 = function(e) {
                    this._setHeader(d.ParagraphType.Header3, !e)
                }, e.prototype.setQuote = function() {
                    function e(e) {
                        return !Object(l.isObjectParagraph)(e) && !Object(l.isListParagraph)(e)
                    }
                    var t = this._getCursor(),
                        r = this._getCurrentParagraphIndex(),
                        n = g(r, 2),
                        i = n[0],
                        a = n[1];
                    if (i !== !1) {
                        a || (a = i);
                        for (var o = d.ParagraphType.Text, s = i; a >= s; s++)
                            if (e(this._ps[s])) {
                                o = this._ps[s].type == d.ParagraphType.Quote ? d.ParagraphType.Quote2 : this._ps[s].type == d.ParagraphType.Quote2 ? d.ParagraphType.Text : d.ParagraphType.Quote;
                                break
                            }
                        for (var c = i; a >= c; c++) {
                            var u = this._ps[c];
                            e(u) && (this._ps[c] = Object(l.buildParagraph)({
                                type: o,
                                lines: [u.lines[0]],
                                sep: Object(l.hasSeparator)(this._ps[c])
                            }), this._setParagraphDirty(c))
                        }
                        this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                    }
                }, e.prototype._setHeader = function(e, t) {
                    function r(e) {
                        return !Object(l.isObjectParagraph)(e) && !Object(l.isListParagraph)(e)
                    }
                    var n = this._getCursor(),
                        i = this._getCurrentParagraphIndex(),
                        a = g(i, 2),
                        o = a[0],
                        s = a[1];
                    if (o !== !1) {
                        s || (s = o);
                        for (var c = o; s >= c; c++) {
                            var u = this._ps[c];
                            r(u) && (this._ps[c].type = t ? e : d.ParagraphType.Text, this._setParagraphDirty(c))
                        }
                        this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(n), this._saveUndoState(), this.saveDraft()
                    }
                }, e.prototype.setStrong = function() {
                    this._setAllParagraphsDirty(), document.execCommand("bold"), y.msie && this._triggerInputEvent()
                }, e.prototype.setEm = function() {
                    this._setAllParagraphsDirty(), document.execCommand("italic"), y.msie && this._triggerInputEvent()
                }, e.prototype.setStrike = function() {
                    this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), y.msie && this._triggerInputEvent()
                }, e.prototype.saveUndoSateAndDraft = function() {
                    this._saveUndoState(), this.saveDraft()
                }, e.prototype._saveUndoStateDelayed = function(e) {
                    var t = this;
                    clearTimeout(this._saveUndoDelayed), this._saveUndoDelayed = setTimeout(function() {
                        t._saveUndoState(e)
                    }, 1e3)
                }, e.prototype._saveUndoState = function(e) {
                    if (clearTimeout(this._saveUndoDelayed), this._undoStateDelayed) {
                        if (this._undos.length) {
                            var t = this._undos[this._undos.length - 1];
                            if (JSON.stringify(t) == JSON.stringify(this._undoStateDelayed)) return void delete this._undoStateDelayed
                        }
                        this._undos.push({
                            ps: this._undoStateDelayed,
                            cursor: e
                        }), this._undos.length > re && this._undos.shift()
                    }
                    var r = !0;
                    this._undoStateDelayed = Object(u.getCleanedState)(this._ps, r)
                }, e.prototype._undo = function() {
                    if (this._undos.length) {
                        var e = this._undos.pop();
                        this._ps = Object(u.expandParagraphFields)(e.ps), this._redraw(!0), this._restoreCursor(e.cursor), this._updateTextPlaceholders(), delete this._undoStateDelayed, this._saveUndoState()
                    }
                }, e.prototype.initParagraphs = function(e) {
                    e.forEach(function(e) {
                        if (e._preparedData) {
                            var t = e.mediaId.split(",");
                            t.forEach(function(t, r) {
                                f["default"].add(t, e._preparedData[r])
                            }), delete e._preparedData
                        }
                    }), this._ps = Object(u.expandParagraphFields)(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
                }, e.prototype._getParagraphFromHTML = function(e, t) {
                    function r(t, n) {
                        if (t.nodeType == Node.TEXT_NODE) {
                            var i = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            n.text += "pre" == e ? i : Object(l.cleanTextSpaces)(i)
                        } else Object(l.isBR)(t) && n.text.length > 0 && n.brs.push(n.text.length);
                        b(t.childNodes, function(e, t) {
                            var i = [n.text.length];
                            r(t, n), i.push(n.text.length);
                            var a = (t.tagName || "").toLowerCase();
                            t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (a = "strong");
                            var o = void 0;
                            switch (a) {
                                case "b":
                                case "strong":
                                    o = te.strong;
                                    break;
                                case "em":
                                case "i":
                                    o = te.em;
                                    break;
                                case "s":
                                case "strike":
                                case "del":
                                    o = te.strike;
                                    break;
                                case "a":
                                    o = te.link, i.push(Object(l.decodeURL)(t.getAttribute("href") || ""));
                                    break;
                                case "code":
                                    o = te.code;
                                    break;
                                case "font":
                                    var s = t.getAttribute("face");
                                    "monospace" === s ? o = te.code : "times" === s && (o = te.code)
                            }
                            o && (n.decorations[o.type] = n.decorations[o.type] || [], i[0] < i[1] && n.decorations[o.type].push(i), n.decorations[o.type] = Object(l.mergeRanges)(n.decorations[o.type]))
                        })
                    }
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                        i = document.createElement("div");
                    i.innerHTML = t;
                    var a = "ol" == e || "ul" == e,
                        o = [],
                        s = void 0,
                        c = {};
                    if (a) {
                        switch (e) {
                            case "ol":
                                s = d.ParagraphType.NumericList;
                                break;
                            case "ul":
                                s = d.ParagraphType.BulletList
                        }
                        for (var u = 0, p = i.children.length; p > u; u++) {
                            var h = {
                                text: "",
                                decorations: {},
                                brs: []
                            };
                            r(i.children[u], h), h.brs = Object(l.cleanBRs)(h.brs), o.push(h)
                        }
                    } else {
                        switch (e) {
                            case "h1":
                                s = d.ParagraphType.Header1;
                                break;
                            case "h2":
                            case "header":
                                s = d.ParagraphType.Header2;
                                break;
                            case "h3":
                            case "h4":
                                s = d.ParagraphType.Header3;
                                break;
                            case "blockquote":
                                s = d.ParagraphType.Quote;
                                break;
                            case "cite":
                                s = d.ParagraphType.Quote2;
                                break;
                            case "pre":
                                s = d.ParagraphType.Code;
                                break;
                            default:
                                s = d.ParagraphType.Text
                        }
                        var f = i.firstElementChild;
                        if (Object(l.isObjectParagraphEl)(f)) {
                            var _ = x(f, "type"),
                                g = x(f, "media-id");
                            _ && g && (i = E("figure", f), s = _, c.mediaId = g)
                        }
                        var v = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        r(i, v), v.brs = Object(l.cleanBRs)(v.brs, v.text.length), o.push(v), s == d.ParagraphType.Code && delete v.decorations.code, !n && s == d.ParagraphType.Text && "```" == v.text && 0 == v.brs.length && this.getOptions().codeFormatEnabled && (v.text = "", s = d.ParagraphType.Code), Object(l.isHeaderParagraph)(s) || (0 == v.text.indexOf("1. ") ? (s = d.ParagraphType.NumericList, this._removeParagraphLineTextPart(v, 0, "1. ".length)) : 0 == v.text.indexOf("* ") && (s = d.ParagraphType.BulletList, this._removeParagraphLineTextPart(v, 0, "* ".length))), v.brs = v.brs.filter(function(e) {
                            return e > 0
                        })
                    }
                    return c.lines = o, c.type = s, Object(l.buildParagraph)(c)
                }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
                    e.text = e.text.substring(0, t) + e.text.substring(r);
                    for (var n = r - t, i = 0, a = e.brs.length; a > i; i++) {
                        var o = e.brs[i];
                        o > t && r > o ? e.brs[i] = void 0 : e.brs[i] > t && e.brs[i] >= r && (e.brs[i] -= n)
                    }
                    e.brs = e.brs.filter(function(e) {
                        return void 0 !== e
                    }), b(e.decorations, function(i, a) {
                        a.forEach(function(e) {
                            e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= n) : (e[0] -= n, e[1] -= n))
                        }), e.decorations[i] = e.decorations[i].filter(function(e) {
                            return void 0 !== e[0]
                        })
                    })
                }, e.prototype._renderObjectParagraph = function(e, t) {
                    var r = this._getOrCreateParagraphObject(e),
                        n = r.el();
                    return r.onRender && r.onRender(), r.setCaptionElHtml(t), x(n, "uuid", e._uuid), x(n, "type", e.type), x(n, "media-id", e._object.getMediaId()), w(n, "_article_p"), n
                }, e.prototype._renderParagraphLines = function(e, t) {
                    if (!e.lines) return ["", ""];
                    var r = "",
                        n = "",
                        i = "",
                        a = "",
                        o = parseInt(e.type);
                    switch (o) {
                        case d.ParagraphType.NumericList:
                            n = "ol", i = "li";
                            break;
                        case d.ParagraphType.BulletList:
                            n = "ul", i = "li";
                            break;
                        case d.ParagraphType.Header1:
                            i = "h1";
                            break;
                        case d.ParagraphType.Header2:
                            i = "h2";
                            break;
                        case d.ParagraphType.Header3:
                            i = "h3";
                            break;
                        case d.ParagraphType.Quote:
                            i = "blockquote";
                            break;
                        case d.ParagraphType.Quote2:
                            i = "cite";
                            break;
                        case d.ParagraphType.Code:
                            i = "pre";
                            break;
                        default:
                            n = "p"
                    }
                    return e.lines.forEach(function(n) {
                        function s(e, t) {
                            for (var r = []; e > 0;) {
                                var n = h[--e];
                                if (n)
                                    for (var i in n.open)
                                        if (n.open.hasOwnProperty(i)) {
                                            if (i == t) return [];
                                            r.push(i)
                                        }
                            }
                            return r
                        }

                        function c(e) {
                            return e[2] || !0
                        }
                        var u = n.text,
                            p = n.decorations,
                            h = [];
                        b(J, function(e, t) {
                            if (!Object(l.isHeaderParagraph)(o) && o != d.ParagraphType.Code || "code" != t.type) {
                                var r = p[t.type];
                                if (r)
                                    for (var n = function(e, n) {
                                            var i = r[n],
                                                a = h[i[0]] = h[i[0]] || {
                                                    open: {},
                                                    close: {}
                                                };
                                            a.open[t.type] = c(i);
                                            var o = h[i[1]] = h[i[1]] || {
                                                    open: {},
                                                    close: {}
                                                },
                                                l = s(i[1], t.type);
                                            l.forEach(function(e) {
                                                o.close[e.type] = !0
                                            }), o.close[t.type] = !0, l.forEach(function(e) {
                                                o.open[e.type] = c(i)
                                            })
                                        }, i = 0, a = r.length; a > i; i++) n(a, i)
                            }
                        });
                        var f = 0,
                            _ = [];
                        h.forEach(function(t, r) {
                            if (t) {
                                var i = !1,
                                    a = t.close.link && 1 == Object.keys(t.close).length;
                                r > 0 && (i = Object(l.prepareLineText)(u, f, r, n.brs, e.type == d.ParagraphType.Code), a || _.push(i));
                                var o = 0;
                                a && (i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), i !== !1 && _.push(i)), b(Z, function(e, r) {
                                    var n = t.close[r.type];
                                    void 0 !== n && _.push("</" + r.tag + ">")
                                }), _.push("<br/>".repeat(o)), b(J, function(e, r) {
                                    var n = t.open[r.type];
                                    void 0 !== t.open[r.type] && (n === !0 ? _.push("<" + r.tag + ">") : _.push("<" + r.tag + ' href="' + F(n) + '">'))
                                }), f = r
                            }
                        }), _.push(Object(l.prepareLineText)(u, f, void 0, n.brs, e.type == d.ParagraphType.Code)), i && (a = a ? " " + a : "", r += "<" + i + a + ">"), V(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "<p>"), r += _.join("") || (t ? "" : "<br/>"), V(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "</p>"), i && (r += "</" + i + ">")
                    }), [n, r]
                }, e.prototype._renderParagraph = function(e) {
                    var t = Object(l.isObjectParagraph)(e),
                        r = this._renderParagraphLines(e, t),
                        n = g(r, 2),
                        i = n[0],
                        a = n[1],
                        o = void 0;
                    return o = t ? this._renderObjectParagraph(e, a) : N(i ? "<" + i + ">" + a + "</" + i + ">" : a), Object(l.hasSeparator)(e) ? x(o, "sep", Object(l.genSepatorId)()) : x(o, "sep", null), w(o, "_article_paragraph"), w(o, "article_paragraph"), w(o, "_article_p"), o
                }, e.prototype._getParagraphElByIndex = function(e) {
                    return e === !1 ? null : this._els.canvas.childNodes[e] || null
                }, e.prototype._getParagraph = function(e) {
                    return e < this._ps.length ? this._ps[e] : null
                }, e.prototype._redraw = function(e, t) {
                    var r = this,
                        n = this._getCursor();
                    e ? (this._els.canvas.innerHTML = "", this._ps.forEach(function(e) {
                        r._els.canvas.appendChild(r._renderParagraph(e))
                    })) : this._dirty.forEach(function(e) {
                        if (!(e >= r._ps.length)) {
                            var t = r._getParagraphElByIndex(e),
                                n = r._renderParagraph(r._ps[e]);
                            t ? n.outerHTML != t.outerHTML && z(t, n) : r._els.canvas.appendChild(n)
                        }
                    }), t && this._restoreCursor(n), this._dirty = []
                }, e.prototype._getContainingParagraphEl = function(e) {
                    for (; e && e.parentNode != this._els.canvas;) e = e.parentNode;
                    var t = Object(l.getElementIndex)(e);
                    return [e, t, this._getParagraph(t)]
                }, e.prototype._getCurrentParagraphIndex = function() {
                    var e = window.getSelection();
                    if (e.rangeCount) {
                        var t = e.getRangeAt(0);
                        if (t.startContainer == this._els.canvas) return [t.startOffset, t.endOffset];
                        var r = this._getContainingParagraphEl(t.startContainer),
                            n = g(r, 2),
                            i = n[1],
                            a = t.endContainer;
                        if (0 === t.endOffset) {
                            var o = this._isParagraphEl(a) || this._isParagraphEl(domPN(a)) && 0 == Object(l.childNodeIndex)(a);
                            if (o) {
                                var s = this._getContainingParagraphEl(a),
                                    c = g(s, 1),
                                    d = c[0];
                                a = Object(_.domPS)(d) || d
                            }
                        }
                        var u = this._getContainingParagraphEl(a),
                            p = g(u, 2),
                            h = p[1];
                        return [i, Math.max(i, h)]
                    }
                    return [0, !1]
                }, e.prototype._saveCursorMarker = function() {
                    function e(e, t, r) {
                        if (e.nodeType == Node.TEXT_NODE) {
                            var n = e.textContent;
                            e.textContent = n.substring(0, t) + r + n.substring(t);
                        } else {
                            var i = document.createTextNode(r);
                            e.insertBefore(i, e.childNodes[t])
                        }
                    }
                    if (!this._markerCursorSet) {
                        var t = Object(l.getRange)(),
                            r = g(t, 2),
                            n = r[0],
                            i = r[1];
                        if (!n) return [0, 0];
                        var a = n.startContainer,
                            o = n.startOffset,
                            s = n.endContainer,
                            c = n.endOffset;
                        if (a != this._els.canvas) {
                            var d = this._getContainingParagraphEl(a)[1],
                                u = void 0;
                            e(a, o, l.CURSOR_MARKER_START), i || (u = this._getContainingParagraphEl(s)[1], u == d && s.textContent.includes(l.CURSOR_MARKER_START) && (c += 1), e(s, c, l.CURSOR_MARKER_END)), this._markerCursorSet = !0
                        }
                    }
                }, e.prototype._restoreCursorFromMarker = function() {
                    var e = this;
                    if (this._markerCursorSet) {
                        var t = function(e, t, r) {
                                function n(t) {
                                    if (t.nodeType == Node.TEXT_NODE) {
                                        var i = t.textContent.indexOf(e);
                                        if (i >= 0) {
                                            t.textContent = t.textContent.split(e).join("");
                                            var a = t.parentElement;
                                            return -1 != a.innerHTML.search(/\s$/) && (a.innerHTML = a.innerHTML.trimRight() + l.NBSP, r && r[0] == t && (r[0] = a.lastChild), t = a.lastChild), a.innerHTML || (t = a, t.innerHTML = "<br/>", i = 0), [t, i]
                                        }
                                    } else
                                        for (var o = 0, s = t.childNodes.length; s > o; o++) {
                                            var c = void 0;
                                            if (c = n(t.childNodes[o])) return c
                                        }
                                }
                                return n(t)
                            },
                            r = void 0,
                            n = void 0,
                            i = void 0;
                        for (i = 0; i < this._els.canvas.children.length && !(r = t(l.CURSOR_MARKER_START, this._els.canvas.children[i])); i++);
                        for (; i < this._els.canvas.children.length && !(n = t(l.CURSOR_MARKER_END, this._els.canvas.children[i], r)); i++);
                        if (r) {
                            var a = document.createRange();
                            r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), a.setStart(r[0], r[1]), n && (n[0].nodeType == Node.TEXT_NODE && (n[1] = Math.min(n[1], n[0].textContent.length)), a.setEnd(n[0], n[1]));
                            var o = window.getSelection();
                            o.removeAllRanges(), o.addRange(a)
                        }
                        var s = function(t) {
                            e._ps.forEach(function(e) {
                                e.lines.forEach(function(e) {
                                    var r = e.text.indexOf(t);
                                    if (r >= 0) {
                                        e.text = e.text.replace(t, "");
                                        for (var n = 0, i = 0; i < e.brs.length; i++) e.brs[i] > r && (n = 1), e.brs[i] -= n;
                                        b(J, function(t, n) {
                                            var i = e.decorations[n.type];
                                            if (i)
                                                for (var a = 0, o = i.length; o > a; a++) {
                                                    var s = i[a];
                                                    s[0] > r && (s[0] -= 1), s[1] > r && (s[1] -= 1)
                                                }
                                        })
                                    }
                                })
                            })
                        };
                        s(l.CURSOR_MARKER_START), s(l.CURSOR_MARKER_END), this._markerCursorSet = !1
                    }
                }, e.prototype._setAllParagraphsDirty = function() {
                    this._dirty = [];
                    for (var e = this._els.canvas.children.length, t = 0; e > t; t++) this._dirty.push(t);
                    this._ps = []
                }, e.prototype._setCurrentParagraphDirty = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = g(e, 2),
                        r = t[0],
                        n = t[1];
                    this._setParagraphDirty(r, n)
                }, e.prototype._setParagraphDirty = function(e, t) {
                    if (void 0 === e || 0 > e) throw new Error("Invalid paragraph index");
                    t = t || e;
                    for (var r = e; t >= r; r++) V(r, this._dirty) || this._dirty.push(r)
                }, e.prototype._expandDoubleBRs = function() {
                    function e(e, t, r) {
                        var n = e.lines[0];
                        void 0 === r && (r = n.text.length);
                        var i = [];
                        return n.brs.forEach(function(e) {
                            r > e && e > t && i.push(e - t)
                        }), Object(l.buildParagraph)({
                            type: e.type,
                            lines: [{
                                text: n.text.substr(t, r - t),
                                decorations: Object(l.decorationsSlice)(n.decorations, t, r),
                                brs: i
                            }]
                        })
                    }
                    for (var t = !1, r = 0, n = this._ps.length; n > r; r++) {
                        var i = this._ps[r];
                        if (i.lines.length > 1) i.lines.forEach(l.cleanLineBRs);
                        else {
                            var a = i.lines[0].brs;
                            if (0 == a.length) continue;
                            for (var o = [], s = 0, c = 0, d = a.length; d > c; c++)
                                if (s != a[c] && c > 0 && a[c - 1] == a[c]) {
                                    var u = e(i, s, a[c]);
                                    Object(l.isParagraphEmpty)(u) || o.push(u), s = a[c]
                                }
                            o.push(e(i, s)), o.length > 1 && (Array.prototype.splice.apply(this._ps, [r, 1].concat(o)), r = r + o.length - 1, t = !0)
                        }
                    }
                    return t
                }, e.prototype._processAlienPhotos = function() {
                    var e = this;
                    if (!this._photoPasteUploadingProcess)
                        for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                            if (!Object(l.isObjectParagraphEl)(r) || !this._isTrackedObjectEl(r))
                                for (var n = Array.prototype.slice.call(geByTag("img", r)), i = void 0, a = function() {
                                        if (!i.src || !domPN(r) || !isVisible(i)) return "continue";
                                        var t = M(i, function(t) {
                                                return t == e._els.canvas ? !0 : "FIGURE" == t.tagName
                                            }, 10),
                                            n = t && t != e._els.canvas ? E("figcaption", t) : !1,
                                            a = Object(l.buildParagraph)({
                                                type: d.ParagraphType.ObjectPhoto
                                            }),
                                            o = e._renderObjectParagraph(a, n ? n.innerHTML : "");
                                        Object(l.justCursorInString)(r.textContent) ? (z(r, o), L(i), H(N("<p>" + l.CURSOR_MARKER_START + "</p>"), o)) : (H(o, domPN(i)), L(n), L(i)), M(o, function(t) {
                                            return t == e._els.canvas ? !0 : void O(t, l.ArticleEditorParagraphClass)
                                        }), Object(l.queuePhotoProcess)(i.src, function(t, r, n) {
                                            if (t) L(o), e._forgetObject(a._uuid), n();
                                            else {
                                                var i = e._getOrCreateParagraphObject(a);
                                                i.setBLOB(r, n)
                                            }
                                        })
                                    }; i = n.shift();) a()
                }, e.prototype._flattenAlienParagraphs = function() {
                    var e = this;
                    if (this._fromPasteEvent) {
                        for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, n = this._fromPasteEvent, i = this._pasteCurrentIndex, a = this._getCurrentParagraphIndex(), o = g(a, 1), s = o[0], c = -1, d = function() {
                                function t(e) {
                                    if (e && e.nodeType != Node.TEXT_NODE && !Object(l.isBR)(e)) {
                                        if (!Object(l.hasBlockElements)(e)) return void(e != a && (R(e.innerHTML) && A(e, r), o = !0));
                                        if (this._isTrackedObjectEl(e)) return void(e != a && (A(e, r), o = !0));
                                        for (var n = Array.prototype.slice.call(e.childNodes), i = void 0; i = n.shift();) t.call(this, i)
                                    }
                                }
                                if (c++, n && !R(r.textContent) && c > i && s >= c) return L(r), "continue";
                                var a = r;
                                Object(l.isQuoteEl)(r) && !Object(l.isAlienParagraphEl)(r) && (a = r.firstChild);
                                var o = !1;
                                t.call(e, a, !0), o && L(r)
                            }; r = t.shift();) d();
                        this._setAllParagraphsDirty()
                    }
                }, e.prototype._correctCaptionSelection = function() {
                    var e = Object(l.getRange)(),
                        t = g(e, 3),
                        r = t[0],
                        n = t[1],
                        i = t[2];
                    if (r && !n) {
                        var a = M(r.startContainer, function(e) {
                            return "FIGCAPTION" == e.tagName
                        }, 5);
                        if (a && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && Object(l.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                            var o = C("article_ed__figcaption_edit", a),
                                s = r.cloneRange();
                            s.selectNodeContents(o), i.removeAllRanges(), i.addRange(s)
                        }
                    }
                }, e.prototype.cancelSaveDraft = function() {
                    clearTimeout(this._draftSaveTO)
                }, e.prototype.saveDraft = function(e, t, r) {
                    var n = this;
                    if (!this.isLocked()) {
                        clearTimeout(this._draftSaveTO);
                        var i = JSON.stringify({
                            paragraphs: Object(u.getCleanedState)(this._ps)
                        });
                        if (t) return void(this._lastSavedDraft = i);
                        if (this._lastSavedDraft == i && !e) return void(!t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId()));
                        this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(function() {
                            if (n._lastSavedDraft = i, 0 != n._ps.length) {
                                var e = Object(p.checkLimits)(n._ps);
                                return e ? void(n._options.onDraftNotSaved && n._options.onDraftNotSaved(e)) : void n.save(!1, function(e, t, r) {
                                    n._initDraftSave = !0, n._options.onDraftSaved && n._options.onDraftSaved(e, t, r)
                                })
                            }
                        }, r ? 0 : 1e3 * this._options.draftSaveDelay)
                    }
                }, e.prototype._getName = function() {
                    if (this._publishName) return this._publishName;
                    var e = Object(u.getCleanedState)(this._ps),
                        t = e.length ? e[0].lines[0].text : "";
                    return Object(l.generateLatinizedName)(t, this._options.maxNameLength)
                }, e.prototype.getTitle = function() {
                    var e = this._ps[0];
                    return e ? e.lines[0].text : ""
                }, e.prototype.isLimitsExceeded = function() {
                    return !!Object(p.checkLimits)(this._ps)
                }, e.prototype.save = function(e, t, r) {
                    var n = this,
                        i = Object(u.getCleanedState)(this._ps, !1, !0);
                    e && Object(l.correctRealIndexes)(i, -1);
                    var a = this._getName(),
                        o = this.getCoverPhoto();
                    void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && (r = r || {}, r.from_post_convert = 1), h["default"].save(this.getArticleOwnerId(), this.getArticleId(), i, e, a, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s, c) {
                        return isString(r) && r.startsWith("locked ") ? (n.getOptions().editLockMessage = r.slice("locked ".length), n.showEditLockInfo(), void(t && t(!0))) : (r || (i && (n._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(D({}, nav.objLoc, {
                            article_id: n.getArticleOwnerId() + "_" + n.getArticleId()
                        })), n._publishNameCandidate = a, e && (n._options.isPublished = !0), n._replaceVideos(c)), void(t && t(r, i, o, s)))
                    })
                }, e.prototype._replaceVideos = function(e) {
                    var t = this,
                        r = !1;
                    e.forEach(function(e) {
                        var n = g(e, 4),
                            i = n[0],
                            a = n[1],
                            o = n[2],
                            s = n[3];
                        t._ps.forEach(function(e, n) {
                            if (e.type == d.ParagraphType.ObjectVideo) {
                                var c = e.mediaId.split("_"),
                                    l = g(c, 3),
                                    u = l[0],
                                    p = l[1],
                                    h = l[2];
                                h || u != i || p != a || (e.mediaId = o + "_" + s, t._setParagraphDirty(n), r = !0)
                            }
                        })
                    }), r && this._redrawModel()
                }, e.prototype.focus = function() {
                    this._restoreLastCursor()
                }, e.prototype.focusLastParagraph = function() {
                    Object(l.focusEl)(this._getParagraphElByIndex(this._ps.length - 1))
                }, e.prototype.getArticleId = function() {
                    return this._options.articleId
                }, e.prototype.getArticleOwnerId = function() {
                    return this._options.articleOwnerId
                }, e.prototype._getSaveDraftHash = function() {
                    return this._options.saveDraftHash
                }, e.prototype._expandBlockquoteParagraphs = function(e) {
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                        if (Object(l.isQuoteEl)(r)) {
                            var n = r.tagName,
                                i = Array.prototype.slice.call(r.children),
                                a = i[0];
                            if (1 == i.length && a && a.tagName && V(a.tagName, ["H1", "H2", "H3"])) {
                                z(r, a);
                                continue
                            }
                            if (i.shift(), i.length)
                                for (var o = void 0; o = i.shift();) {
                                    if (this._saveCursorMarker(), e) H(o, r);
                                    else {
                                        var s = N("<" + n + "></" + n + ">");
                                        s.appendChild(o), H(s, r)
                                    }
                                    this._restoreCursorFromMarker()
                                }
                        }
                }, e.prototype._ensureDummyParagraphs = function() {
                    if (this._els.canvas) {
                        var e = this._els.canvas.lastChild;
                        if (e) {
                            var t = R(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML;
                            if (t || "H1" == e.tagName) {
                                var r = Object(l.buildParagraph)({});
                                this._els.canvas.appendChild(this._renderParagraph(r)), this._ps.push(r), this._updateTextPlaceholders()
                            }
                        }
                    }
                }, e.prototype._ensureAtLeastOneParagraph = function() {
                    0 == this._ps.length && (this._ps = [Object(l.buildParagraph)({
                        type: d.ParagraphType.Text
                    })])
                }, e.prototype._ensureTitleParagraph = function() {
                    var e = this;
                    this._options.noTitle || (Object(l.isObjectParagraph)(this._ps[0]) && (this._ps[0] = Object(l.buildParagraph)({
                        type: d.ParagraphType.Header1
                    })), this._ps[0].type != d.ParagraphType.Header1 && (this._ps[0].type = d.ParagraphType.Header1), delete this._ps[0].sep), this._ps.forEach(function(t, r) {
                        (e._options.noTitle || 0 != r) && (1 == r && t.type == d.ParagraphType.Header1 && (t.type = d.ParagraphType.Text), t.type == d.ParagraphType.Header1 && (t.type = d.ParagraphType.Header2))
                    })
                }, e.prototype._insertParagraphAt = function(e, t) {
                    this._ps.splice(e, 0, t)
                }, e.prototype._focusParagraph = function(e, t) {
                    Object(l.focusEl)(this._getParagraphElByIndex(e), t)
                }, e.prototype._init = function() {
                    this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._saveUndoState()
                }, e.prototype._redrawModel = function() {
                    this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
                }, e.prototype.closeAllCarouselEditors = function() {
                    this._ps.forEach(function(e) {
                        e.type == d.ParagraphType.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
                    })
                }, e.prototype.setMediaUploadMode = function(e) {
                    this._isUploading = !!e, B(this._els.editor, "article_ed__uploading", this._isUploading)
                }, e.prototype.isMediaUploadMode = function() {
                    return this._isUploading
                }, e.prototype.addObjectVideo = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = g(t, 1),
                        n = r[0],
                        i = this._getParagraph(n),
                        a = Object(l.hasSeparator)(i);
                    delete i.sep, showBox("al_video.php", {
                        act: "a_choose_video_box",
                        to_id: this.getArticleOwnerId()
                    }), m.chooseMedia = function(t, r, i, o, s) {
                        var c = Object(d.getAppropriateImage)(i.editable.sizes, e.getWidth()),
                            u = g(c, 1),
                            p = u[0],
                            h = Object(l.buildParagraph)({
                                type: d.ParagraphType.ObjectVideo,
                                mediaId: r,
                                sep: a
                            });
                        a = !1, f["default"].add(r, {
                            editable: i.editable,
                            thumb: p,
                            duration: i.editable.duration,
                            platform: i.editable.platform
                        }), e._getOrCreateParagraphObject(h), 0 == o ? e._ps[n] = h : e._ps.splice(n + o, 0, h), e._redrawModel(), e._saveUndoState();
                        var _ = e._getParagraphElByIndex(n);
                        Object(l.focusEl)(_), s || curBox().hide(), e.saveDraft()
                    }
                }, e.prototype.addObjectDoc = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = g(t, 1),
                        n = r[0],
                        i = this._getParagraph(n),
                        a = Object(l.hasSeparator)(i);
                    delete i.sep, m.docsCurFilter = "gif";
                    var o = showBox("docs.php", {
                        act: "a_choose_doc_box",
                        from: "article",
                        ext_filter: "gif",
                        to_id: this.getArticleOwnerId()
                    }, {
                        stat: ["docs.css"]
                    });
                    m.chooseMedia = function(t, r, i) {
                        o.hide();
                        var s = Object(l.buildParagraph)({
                            type: d.ParagraphType.ObjectGIF,
                            mediaId: r,
                            sep: a
                        });
                        a = !1, f["default"].add(r, {
                            video: i.video_preview,
                            size: i.video_preview_size,
                            href: i.href
                        }), e._getOrCreateParagraphObject(s), e._insertParagraphAt(n, s), e._redrawModel(), e._saveUndoState(), e.saveDraft(), e._updateTextPlaceholders()
                    }, m.showMediaProgress = function() {}
                }, e.prototype.addObjectPhoto = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = g(t, 1),
                        n = r[0],
                        i = this._getParagraph(n),
                        a = showBox("al_photos.php", {
                            to_id: this.getArticleOwnerId(),
                            act: "choose_photo",
                            max_files: 200,
                            article: 1
                        }, {
                            cache: 1,
                            stat: ["photos.js", "photos.css", "upload.js"],
                            dark: 1
                        }),
                        o = void 0;
                    m.onMediaUploadStarted = function() {
                        var t = Object(l.buildParagraph)({
                                type: d.ParagraphType.ObjectPhoto
                            }),
                            r = e._renderObjectParagraph(t, ""),
                            i = e._getParagraphElByIndex(n);
                        A(r, i), Object(l.focusEl)(i), o = r, e.setMediaUploadMode(!0)
                    }, m.onMediaUploadFail = function() {
                        delete m.onMediaUploadStarted, o && L(o), e.setMediaUploadMode(!1)
                    };
                    var s = void 0,
                        c = -1;
                    m.chooseMedia = function(t, r, u, p) {
                        void 0 === p ? c++ : c = S(p), delete m.onMediaUploadStarted, e.setMediaUploadMode(!1), o && L(o);
                        var h = Object(l.buildParagraph)({
                            type: d.ParagraphType.ObjectPhoto,
                            mediaId: r,
                            sep: i.sep
                        });
                        return f["default"].add(r, {
                            size: Object(l.getPhotoSize)(u.editable.sizes),
                            sizes: u.editable.sizes
                        }), e._getOrCreateParagraphObject(h), c ? e._ps.splice(n + c, 0, h) : e._ps[n] = h, void 0 === p && a.hide(), clearTimeout(s), s = setTimeout(function() {
                            e._redrawModel(), e._focusParagraph(n + c), e._updateTextPlaceholders(), e.saveUndoSateAndDraft()
                        }, 10), !1
                    }, m.showMediaProgress = function() {}
                }, e.prototype.addSeparator = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = g(e, 1),
                        r = t[0],
                        n = Object(l.hasSeparator)(this._getParagraph(r)),
                        i = Object(l.hasSeparator)(this._getParagraph(r + 1));
                    !n && !i && r < this._ps.length - 1 && this._ps.splice(r, 1);
                    var a = this._getParagraph(r);
                    a.sep = 1;
                    var o = this._getCursor();
                    this._redraw(!0), this._restoreCursor(o), this._updateTextPlaceholders()
                }, e.prototype.onObjectStateLoaded = function() {
                    this.saveDraft(), this._showObjectPicker()
                }, e.prototype._hideObjectPicker = function() {
                    this._objectPickerTooltip && this._objectPickerTooltip.hide()
                }, e.prototype._showObjectPicker = function() {
                    if (!this.isLocked()) {
                        if (!this._objectPickerEl) {
                            this._objectPickerEl = N('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                            var e = N('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>');
                            this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                                content: e,
                                forceSide: "right",
                                cls: "article_editor_object_picker_tt",
                                autoShow: !1,
                                elClassWhenShown: "article_editor_object_picker_tt_shown",
                                offset: [3, 0]
                            }), this._objectPickerEl.addEventListener("mousedown", function(e) {
                                return cancelEvent(e)
                            })
                        }
                        var t = this._getCurrentParagraphIndex(),
                            r = g(t, 2),
                            n = r[0],
                            i = r[1];
                        if (!this.isMediaUploadMode() && n !== !1 && n == i && Object(l.isParagraphEmpty)(this._ps[n], !0) && this._ps[n] && V(this._ps[n].type, [d.ParagraphType.Text, d.ParagraphType.Header2, d.ParagraphType.Header3])) {
                            K(this._objectPickerEl);
                            var a = this._getParagraphElByIndex(n),
                                o = I(this._els.editor),
                                s = I(a);
                            Y(this._objectPickerEl, {
                                left: -40,
                                top: s[1] - o[1]
                            })
                        } else $(this._objectPickerEl)
                    }
                }, e.prototype._initLinksHrefTooltip = function() {
                    var e = this;
                    this._els.canvas.addEventListener("mouseover", function(t) {
                        if ("a" == t.target.tagName.toLowerCase()) {
                            if (e._linkTooltip && e._linkTooltip.destroy(), e._formatTooltip && e._formatTooltip.isShown()) return;
                            var r = t.target,
                                n = Object(l.decodeURL)(r.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")),
                                i = n + "";
                            Object(l.isVKUrl)(i) || (i = "/away.php?to=" + encodeURIComponent(i) + "&utf=1"), e._linkTooltip = new ElementTooltip(r, {
                                cls: "article_editor_link_show_tt",
                                appendTo: e._els.editor,
                                content: N('<a target="_blank" href="' + i + '" class="article_editor_link">' + n + "</a>")
                            })
                        }
                    })
                }, e.prototype._isTrackedObjectEl = function(e) {
                    var t = x(e, "uuid");
                    return t ? !!this._getObject(t) : !1
                }, e.prototype._cloneObjectParagraphs = function() {
                    for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                        if (Object(l.isObjectParagraphEl)(t)) {
                            var n = t.getAttribute("data-uuid"),
                                a = parseInt(t.getAttribute("data-type"));
                            if (r[n]) {
                                var o = this._getObject(n);
                                n = i(), this._getOrCreateParagraphObject({
                                    type: a,
                                    _uuid: n,
                                    mediaId: o.getMediaId()
                                }), x(t, "uuid", n)
                            }
                            r[n] = !0
                        }
                }, e.prototype._correctCursorToBeWithinCanvas = function() {
                    var e = Object(l.getRange)(),
                        t = g(e, 2),
                        r = t[0],
                        n = t[1];
                    n && r.startContainer == this._els.canvas && this._focusParagraph(0)
                }, e.prototype._triggerInputEvent = function() {
                    this._els.canvas.dispatchEvent(new Event("input"))
                }, e.prototype._getCursor = function() {
                    function e(e, r, n) {
                        r.nodeType == Node.TEXT_NODE ? e.textOffset = n : e.nodeOffset = n, M(r, function(r) {
                            return r == t ? !0 : (Object(l.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), void e.path.push(Object(l.childNodeIndex)(r)))
                        }, 10), e.path = e.path.slice().reverse()
                    }
                    var t = this._els.canvas,
                        r = Object(l.getRange)(),
                        n = g(r, 2),
                        i = n[0],
                        a = n[1];
                    if (!i) return !1;
                    var o = {
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
                    return e(o.start, i.startContainer, i.startOffset), a ? delete o.end : e(o.end, i.endContainer, i.endOffset), o
                }, e.prototype._restoreCursor = function(e) {
                    function t(e) {
                        var t = r;
                        e.path.forEach(function(r, i) {
                            if (Object(l.isQuoteEl)(t)) {
                                var a = t.firstChild;
                                a && 1 == i && a.nodeType == Node.ELEMENT_NODE && "p" == a.tagName.toLowerCase() && (t = a)
                            }
                            r = Math.min(t.childNodes.length - 1, r);
                            var o = t.childNodes[r];
                            return o ? void(t = o) : (e.nodeOffset = n = 0, !1)
                        });
                        var n = void 0;
                        return n = t.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(t.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && t && t.children && (n = Math.min(e.nodeOffset, t.childNodes.length)), [t, n]
                    }
                    if (!e) return this._restoreCursorFromMarker();
                    var r = this._els.canvas,
                        n = document.createRange();
                    try {
                        var i = t(e.start),
                            a = g(i, 2),
                            o = a[0],
                            s = a[1];
                        if (Object(l.isBR)(o) && 0 == s) {
                            var c = domPN(o);
                            Object(l.isParagraphEl)(c) && 1 == c.childNodes.length && (o = c)
                        }
                        if (n.setStart(o, s), e.end) {
                            var d = t(e.end),
                                u = g(d, 2),
                                p = u[0],
                                h = u[1];
                            n.setEnd(p, h)
                        }
                        var f = window.getSelection();
                        f.removeAllRanges(), f.addRange(n)
                    } catch (_) {
                        debugLog(_)
                    }
                }, e.prototype._saveLastCursor = function() {
                    var e = this._getCursor(),
                        t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                    e ? ls.set(t, JSON.stringify(e)) : ls.remove(t)
                }, e.prototype._restoreLastCursor = function() {
                    var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                    e ? (e = JSON.parse(e), this._restoreCursor(e)) : Object(l.focusEl)(this._els.canvas.firstChild)
                }, e.prototype._toggleCodeBlocks = function() {
                    for (var e = void 0, t = this._getCurrentParagraphIndex(), r = g(t, 2), n = r[0], i = r[1], a = n; i >= a; a++) void 0 === e && (e = this._ps[a].type != d.ParagraphType.Code), this._ps[a].type = e ? d.ParagraphType.Code : d.ParagraphType.Text;
                    var o = this._getCursor();
                    this._redraw(!0), this._restoreCursor(o), this._updateTextPlaceholders()
                }, e.prototype._removeExtraSeparators = function() {
                    for (var e = this._els.canvas.children, t = void 0, r = 0; r < e.length; r++) {
                        var n = e[r],
                            i = x(n, "sep");
                        i && (void 0 !== t && i == t && x(n, "sep", null), t = i)
                    }
                }, e.prototype._replaceAlienInlineTags = function() {
                    function e(n) {
                        var i = n.tagName.toLowerCase();
                        if (r[i]) {
                            t || (this._saveCursorMarker(), t = !0);
                            var a = ce(r[i], {
                                innerHTML: n.innerHTML
                            });
                            z(n, a)
                        } else
                            for (var o = Array.prototype.slice.call(n.childNodes), s = void 0; s = o.shift();) s.nodeType == Node.ELEMENT_NODE && e.call(this, s)
                    }
                    var t = !1,
                        r = {
                            b: "strong",
                            i: "em"
                        };
                    return e.call(this, this._els.canvas), t && this._restoreCursorFromMarker(), t
                }, e.prototype._cleanParagraphsBRs = function() {
                    this._ps.forEach(function(e) {
                        e.lines.forEach(l.cleanLineBRs)
                    })
                }, e.prototype._initEvents = function() {
                    var e = this;
                    if (!this.isLocked()) {
                        this._setEventListener(window, "scroll", function() {
                            var t = scrollGetY(),
                                r = window.innerHeight;
                            e._ps.forEach(function(n, i) {
                                if (Object(l.isObjectParagraph)(n)) {
                                    var a = e._getParagraphElByIndex(i),
                                        o = k(a),
                                        s = I(a),
                                        c = s[1] < t + r && s[1] + o[1] > t;
                                    n._object.onViewport && n._object.onViewport(c)
                                }
                            })
                        });
                        var t = 0;
                        this._setEventListener(document, "selectionchange", function() {
                            var r = Object(l.getRange)(),
                                n = g(r, 2),
                                i = n[0],
                                o = n[1];
                            if (i) {
                                var s = M(i.commonAncestorContainer, function(t) {
                                    return t == e._els.canvas
                                });
                                if (!s) return
                            }
                            var c = e._getCurrentParagraphIndex(),
                                d = g(c, 1),
                                u = d[0];
                            if (u === !1) return void e._showObjectPicker();
                            if (!o && j(i.startContainer, "article")) {
                                var p = e._ps[t];
                                if (Object(l.isObjectParagraph)(p)) return void Object(l.focusEl)(p._object.getCaptionEl())
                            }
                            var h = i.startContainer;
                            if (y.msie && o && U("article_ed__extra_controls", h) && "BUTTON" != h.tagName) {
                                var f = e._ps[u];
                                if (Object(l.isObjectParagraph)(f)) return void f._object.getCaptionEl().focus()
                            }
                            t = u, e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), e._ensureDummyParagraphs(), 0 == a && e._showFormatTooltip(), e._lastCursor = e._getCursor(), e._saveLastCursor()
                        });
                        var r = !1,
                            n = !1,
                            i = !1,
                            a = !1;
                        this._els.canvas.addEventListener("mousedown", function() {
                            a = !0;
                            var t = void 0;
                            e._setEventListener(window, "mouseup", t = function(r) {
                                a = !1;
                                var n = "article_format_btn_link" == r.target.id;
                                n || (e._showFormatTooltip(), t && window.removeEventListener("mouseup", t))
                            })
                        }), this._els.canvas.addEventListener("selectstart", function() {
                            e._hideFormatTooltip()
                        }), this._els.canvas.addEventListener("copy", function(t) {
                            var r = Object(l.getRange)(),
                                n = g(r, 2),
                                i = n[0],
                                a = n[1];
                            if (a) {
                                var o = e._getContainingParagraphEl(i.commonAncestorContainer),
                                    s = g(o, 1),
                                    c = s[0];
                                Object(l.isObjectParagraphEl)(c) && (t.clipboardData.setData("text/plain", "uuid:" + c.getAttribute("data-uuid")), t.preventDefault())
                            }
                        }), this._els.canvas.addEventListener("paste", function(t) {
                            e._handleObjectPaste(t), e._handlePhotoPaste(t), e._handleLinkPaste(t);
                            var r = e._getCurrentParagraphIndex(),
                                n = g(r, 1),
                                i = n[0];
                            e._fromPasteEvent = !0, e._pasteCurrentIndex = i
                        }), this._els.canvas.addEventListener("click", function(e) {
                            return e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName ? cancelEvent(e) : void 0
                        });
                        var o = !1;
                        this._els.canvas.addEventListener("input", function() {
                            e._hideObjectPicker(), e._expandBlockquoteParagraphs(u), e._removeExtraSeparators();
                            var t = e._replaceAlienInlineTags();
                            y.safari || e._els.canvas.normalize();
                            var r = void 0;
                            e._fromPasteEvent || t || e._markerCursorSet ? e._saveCursorMarker() : r = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), o && (e._cleanParagraphsBRs(), o = !1), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph();
                            var a = e._fromPasteEvent && e._expandDoubleBRs();
                            e._redraw(a), e._restoreCursor(r), e._correctCursorToBeWithinCanvas(), e._dirty = [], i ? e._saveUndoStateDelayed(e._lastCursor) : e._saveUndoState(e._lastCursor), n = i = !1, e._fromPasteEvent = !1, y.mozilla && e._showFormatTooltip(), e._updateTextPlaceholders(), e.saveDraft()
                        });
                        var s = !1,
                            u = !1,
                            p = 1,
                            h = void 0;
                        this._els.canvas.addEventListener("keydown", function(t) {
                            var a = t.keyCode,
                                f = t.metaKey || t.ctrlKey,
                                v = Object(l.getRange)(),
                                m = g(v, 2),
                                w = m[0],
                                E = m[1];
                            if (w) {
                                var C = e._getCurrentParagraphIndex(),
                                    P = g(C, 2),
                                    O = P[0],
                                    j = P[1],
                                    x = e._getParagraph(O),
                                    S = !1;
                                if (Object(l.isObjectParagraph)(x))
                                    if (x._object.isCaptionFocused()) S = 0 == w.startOffset && E;
                                    else {
                                        var k = e._getContainingParagraphEl(w.startContainer),
                                            I = g(k, 1),
                                            L = I[0];
                                        S = L == x._object.el()
                                    }
                                if (S && E && y.mozilla) {
                                    if (a == G.Up) return e._focusParagraph(O - 1, !0), cancelEvent(t);
                                    if (a == G.Down) return e._focusParagraph(O + 1, !0), cancelEvent(t)
                                }
                                if (a == G.Tab && E && 0 == O) return Object(l.focusEl)(e._getParagraphElByIndex(1)), cancelEvent(t);
                                if (f && a == G.KeyA && Object(l.isObjectParagraph)(x) && x._object.isCaptionFocused()) {
                                    var M = x._object.getCaptionEl();
                                    return Object(l.selectEl)(M), cancelEvent(t)
                                }
                                if (f) switch (a) {
                                    case G.KeyB:
                                        return e._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(t);
                                    case G.KeyI:
                                        return e._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(t);
                                    case G.KeyS:
                                        return e.saveDraft(!1, !1, !0), cancelEvent(t);
                                    case G.KeyZ:
                                        return e._undo(), cancelEvent(t)
                                }
                                var D = a == G.KeyC && t.altKey,
                                    B = x ? x.type : d.ParagraphType.Text,
                                    R = Object(_.gpeByTag)("pre", w.startContainer),
                                    U = !!(R || Object(_.gpeByTag)("pre", w.endContainer) || w.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == w.startContainer.tagName);
                                if (D) {
                                    if (E) return e._toggleCodeBlocks(), cancelEvent(t);
                                    if (!U && e.getOptions().codeFormatEnabled && V(B, [d.ParagraphType.Text, d.ParagraphType.NumericList, d.ParagraphType.BulletList])) {
                                        e._setCurrentParagraphDirty();
                                        var F = Object(_.gpeByTag)("code", w.startContainer) || Object(_.gpeByTag)("code", w.endContainer);
                                        if (F) {
                                            e._saveCursorMarker();
                                            var W = N("<span></span>");
                                            W.innerHTML = F.innerHTML, z(F, W), e._triggerInputEvent()
                                        } else document.execCommand("fontName", !1, "monospace"), y.msie && e._triggerInputEvent();
                                        return cancelEvent(t)
                                    }
                                }
                                if (a == G.Tab && U && B == d.ParagraphType.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(t);
                                var K = !1;
                                if (a == G.Backspace) {
                                    if (s) return s[0].textContent = s[1], e._restoreCursor(s[2]), s = !1, cancelEvent(t);
                                    if (S) {
                                        var $ = e._getParagraphElByIndex(O),
                                            Y = Object(l.createParagraphEl)("", Object(l.hasSeparator)(x));
                                        return z($, Y), Object(l.focusEl)(Y), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                                    }
                                    if (w && 0 == w.startOffset && w.collapsed) {
                                        var q = Object(_.gpeByTag)("li", w.startContainer),
                                            X = Object(l.getElementIndex)(q);
                                        if (q) {
                                            var J = e._ps[O],
                                                Z = Q(J),
                                                ee = Q(J);
                                            Z.lines = Z.lines.slice(0, X);
                                            var te = Object(l.buildParagraph)({
                                                lines: [Q(J.lines[X])]
                                            });
                                            ee.lines = ee.lines.slice(X + 1), e._ps.splice(O, 1, Z, te, ee), e._redraw(!0);
                                            var re = e._getParagraphElByIndex(O + 1);
                                            return Object(l.focusEl)(re), e._saveUndoState(e._lastCursor), cancelEvent(t)
                                        }
                                    }
                                    if (w && E && 0 == w.startOffset) {
                                        var ne = e._getCurrentParagraphIndex(),
                                            ie = g(ne, 1),
                                            ae = ie[0],
                                            oe = ae > 0 ? e._ps[ae - 1] : !1;
                                        if (Object(l.isObjectParagraph)(oe)) {
                                            Object(l.isParagraphEmpty)(e._ps[ae]) && (e._ps.splice(ae, 1), e._redraw(!0));
                                            var se = e._getParagraphElByIndex(ae - 1);
                                            return Object(l.focusEl)(se), cancelEvent(t)
                                        }
                                    }
                                    e._setAllParagraphsDirty(), y.msie && setTimeout(function() {
                                        e._triggerInputEvent()
                                    })
                                }
                                if (a == G.Delete) {
                                    var ce = e._ps[O],
                                        le = e._ps[O + 1],
                                        de = getCaretCharacterOffsetWithin(w.startContainer),
                                        ue = g(de, 1),
                                        pe = ue[0],
                                        he = w.startContainer.textContent.length == pe;
                                    if (S) {
                                        var fe = ce._object.isCaptionFocused() && !!ce.lines[0].text;
                                        if (!fe) {
                                            var _e = e._getParagraphElByIndex(O),
                                                ge = Object(l.createParagraphEl)();
                                            return z(_e, ge), Object(l.focusEl)(ge), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                                        }
                                    }
                                    if (E && Object(l.hasSeparator)(le) && he) return e._setParagraphDirty(O + 1), delete le.sep, e._redraw(!1, !0), cancelEvent(t);
                                    if (E && he && Object(l.isObjectParagraph)(le)) return Object(l.isParagraphEmpty)(ce) && ce.type != d.ParagraphType.Header1 && (e._ps.splice(O, 1), e._redraw(!0, !0)), Object(l.focusEl)(le._object.getCaptionEl()), cancelEvent(t);
                                    le && Object(l.isParagraphEmpty)(ce) && V(le.type, [d.ParagraphType.Header2, d.ParagraphType.Header3]) && (ce.type = le.type, e._setParagraphDirty(O), e._redraw()), e._setAllParagraphsDirty(), y.msie && 0 == w.startOffset && 0 == O && setTimeout(function() {
                                        e._setCurrentParagraphDirty(), e._triggerInputEvent()
                                    })
                                } else if (a == G.Enter) {
                                    if (U && R && B == d.ParagraphType.Code && E) {
                                        var ve = R.textContent.search(/[^\s]/) || 0;
                                        return document.execCommand("insertText", !1, "\n" + " ".repeat(ve)), cancelEvent(t)
                                    }
                                    if (e._isWithinObjectParagraphEl(Object(l.getFocusedElement)())) {
                                        var me = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                            ye = g(me, 2),
                                            be = ye[0],
                                            we = ye[1],
                                            Ee = Object(l.createParagraphEl)();
                                        return e._ps[we]._object.isCaptionFocused() ? H(Ee, be) : A(Ee, be), e._setAllParagraphsDirty(), Object(l.focusEl)(Ee), e._triggerInputEvent(), cancelEvent(t)
                                    }
                                    var Ce = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                        Pe = g(Ce, 3),
                                        Oe = Pe[0],
                                        Te = Pe[1],
                                        je = Pe[2],
                                        xe = getCaretCharacterOffsetWithin(Oe),
                                        Se = g(xe, 2),
                                        ke = Se[1];
                                    if (t.shiftKey || t.ctrlKey && y.safari) {
                                        var Ie = getCaretCharacterOffsetWithin(Oe),
                                            Le = g(Ie, 2),
                                            Ne = Le[1],
                                            Ae = T("li", w.startContainer),
                                            Me = 0;
                                        Ae && (Me = domChildIndex(Ae));
                                        var De = !1;
                                        if (b(je.lines, function(e, t) {
                                                var r = t.brs,
                                                    n = t.text,
                                                    i = n.length;
                                                return 0 == Ne || i >= Ne && V(Ne, r) ? (De = !0, !1) : (Ne -= i, 0 >= Ne && e == Me ? !1 : void 0)
                                            }), De) {
                                            o = !0, e._setParagraphDirty(O, j), document.execCommand("insertParagraph");
                                            var Be = domNS(Oe);
                                            return Be && (Object(l.focusEl)(Be), Be.focus()), e._triggerInputEvent(), cancelEvent(t)
                                        }
                                        y.msie && 0 == Ne && w.insertNode(N("<br>"))
                                    }
                                    var Re = E && w.startContainer.nodeType == Node.TEXT_NODE && !w.startContainer.nextSibling && ke == Oe.textContent.length;
                                    u = Re && !Object(l.isListParagraph)(e._ps[O]) && !t.shiftKey && V(je.type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), u || t.shiftKey || e._parseUrlParagraph(Te), e._setParagraphDirty(O, j)
                                } else t.key && 1 == t.key.length ? (e._setParagraphDirty(O), e._setParagraphDirty(j), t.metaKey || (K = !0, t.key && (Object(l.isCyrillicChar)(t.key) ? p += 1 : Object(l.isLatinChar)(t.key) && (p -= 1), p = Math.min(Math.max(p, -5), 5))), n = Object(l.isWhiteSpaceChar)(t.key), r && !n && (i = !0), r = K, setTimeout(function() {
                                    function t(e, t, r, n, i) {
                                        var a = this._getCursor(),
                                            o = t.textContent.substring(0, e - r.length),
                                            c = t.textContent.substring(e);
                                        i || (s = [t, o + r + c, a]), t.textContent = o + n + c, this._restoreCursor(a), this._setParagraphDirty(O), this._triggerInputEvent()
                                    }
                                    var r = Object(l.getRange)(),
                                        n = g(r, 2),
                                        i = n[0],
                                        a = n[1],
                                        o = e._getParagraph(O);
                                    if (o) {
                                        var u = o.type;
                                        if (u != d.ParagraphType.Code) {
                                            var f = !!(Object(_.gpeByTag)("code", i.startContainer) || i.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == i.startContainer.tagName);
                                            if (!f && (h = h || p > 0, a && i)) {
                                                var v = i.startContainer;
                                                if (v.nodeType == Node.TEXT_NODE && i.startOffset > 0)
                                                    for (var m = v.textContent.substring(i.startOffset - 5, i.startOffset), y = 0, b = c.Sequences.length; b > y; y++) {
                                                        var w = c.Sequences[y];
                                                        if (void 0 === w.cyrillic || w.cyrillic === h)
                                                            if (w.pattern instanceof RegExp) {
                                                                var E = m.match(w.pattern);
                                                                if (E) {
                                                                    var C = w.substitution;
                                                                    E.length > 1 && (C = C.replace("$1", E[1])), t.call(e, i.startOffset, v, E[0], C, w.noUndo);
                                                                    break
                                                                }
                                                            } else if (m.endsWith(w.pattern)) {
                                                            t.call(e, i.startOffset, v, w.pattern, w.substitution, w.noUndo);
                                                            break
                                                        }
                                                    }
                                            }
                                        }
                                    }
                                }, 0)) : r = !1;
                                s = !1
                            }
                        })
                    }
                }, e.prototype._isParagraphEl = function(e) {
                    return e && j(e, "_article_paragraph")
                }, e.prototype._isWithinObjectParagraphEl = function(e) {
                    var t = this._getContainingParagraphEl(e),
                        r = g(t, 1),
                        n = r[0];
                    return n && Object(l.isObjectParagraphEl)(n)
                }, e.prototype._highlightObjectsInCurrentSelection = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = g(e, 2),
                        r = t[0],
                        n = t[1];
                    r !== !1 && n !== !1 && this._ps.forEach(function(e, t) {
                        if (e._object) {
                            var i = r != n;
                            e._object.highlight(t >= r && n >= t, i)
                        }
                    })
                }, e.prototype._getOrCreateParagraphObject = function(e) {
                    e._uuid || (e._uuid = i());
                    var t = this._getObject(e._uuid);
                    if (!t) {
                        var r = e.mediaId || "",
                            n = parseInt(e.type);
                        switch (n) {
                            case d.ParagraphType.ObjectPhoto:
                                t = new a["default"](r, this);
                                break;
                            case d.ParagraphType.ObjectVideo:
                                t = new o["default"](r, this);
                                break;
                            case d.ParagraphType.ObjectGIF:
                                t = new s["default"](r, this)
                        }
                        this._setObject(e._uuid, t)
                    }
                    return e.mediaId && t.setMediaId(e.mediaId), e._object = t, t
                }, e.prototype._forgetObject = function(e) {
                    delete this._objects[e]
                }, e.prototype._getObject = function(e) {
                    return this._objects[e] || null
                }, e.prototype._setObject = function(e, t) {
                    return this._objects[e] = t
                }, e.prototype._updateLineData = function(e) {
                    var t = this._getParagraphElByIndex(e);
                    if (t) {
                        if (this._isWithinObjectParagraphEl(t)) {
                            var r = Object(l.paragraphElProperties)(t),
                                n = g(r, 2),
                                i = n[0],
                                a = n[1],
                                o = this._getObject(a);
                            if (!o) return;
                            var s = void 0;
                            s = o.getCaptionEl() ? this._getParagraphFromHTML("", o.getCaptionEl().innerHTML, !0) : Object(l.buildParagraph)(), s._uuid = a, s.type = i, s._object = o, this._ps[e] = s
                        } else if (t.nodeType == Node.ELEMENT_NODE) {
                            var c = t.tagName.toLowerCase();
                            this._ps[e] = this._getParagraphFromHTML(c, t.innerHTML)
                        } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent);
                        x(t, "sep") && (this._ps[e].sep = !0)
                    }
                }, e.prototype.onDragEnd = function() {
                    this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler),
                        delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
                }, e.prototype.getCurrentParagraphs = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = g(e, 2),
                        r = t[0],
                        n = t[1];
                    return [this._getParagraphElByIndex(r), this._getParagraphElByIndex(n)]
                }, e.prototype._initObjectDrag = function() {
                    function e(e) {
                        c != e && (b(geByClass("article_ed__drag_hovered"), function(e, t) {
                            O(t, "article_ed__drag_hovered")
                        }), e && w(e, "article_ed__drag_hovered"), c = e)
                    }
                    var t = this,
                        r = void 0,
                        n = void 0,
                        i = void 0,
                        a = void 0,
                        o = !1,
                        s = (k(this._options.layer)[1], 200),
                        c = void 0;
                    this._els.canvas.addEventListener("mousedown", function(c) {
                        i && L(i);
                        var d = k(t._els.canvas)[1];
                        O(t._els.canvas, "no_select"), e(!1);
                        var u = t._getContainingParagraphEl(c.target),
                            p = g(u, 3),
                            h = p[0],
                            f = p[1],
                            v = p[2];
                        if (Object(l.isObjectParagraph)(v)) {
                            var m = c.pageY,
                                y = void 0,
                                b = void 0,
                                E = void 0,
                                C = void 0,
                                P = void 0;
                            window.addEventListener("mousemove", r = function(r) {
                                if (i || !(Math.abs(m - r.pageY) < 10)) {
                                    i || (i = N('<div class="article_ed__drag_shadow"></div>'), t._els.editor.appendChild(i), y = I(t._els.canvas), y[1] -= scrollGetY(), b = k(h), E = I(h), C = r.pageX - E[0], P = r.pageY - E[1] + t._options.layer.scrollTop, Y(i, {
                                        width: b[0],
                                        height: b[1]
                                    }), console.log(r.pageY, E[1], y[1], scrollGetY(), y[1] - scrollGetY(), P), t._focusParagraph(f)), w(t._els.canvas, "no_select"), Y(i, {
                                        left: r.pageX - y[0] - C,
                                        top: r.pageY - scrollGetY() - P - y[1] + t._options.layer.scrollTop
                                    }), clearInterval(a), r.pageY - scrollGetY() < s ? a = setInterval(function() {
                                        t._options.layer.scrollTop -= 10
                                    }, 10) : r.pageY - scrollGetY() > window.innerHeight - s && (a = setInterval(function() {
                                        return t._options.layer.scrollTop + window.innerHeight > d + 300 ? void clearInterval(a) : void(t._options.layer.scrollTop += 10)
                                    }, 10));
                                    var n = t._getContainingParagraphEl(r.target),
                                        c = g(n, 2),
                                        l = c[0],
                                        u = c[1];
                                    l && l != h && l != Object(_.domPS)(h) ? (e(l), o = u) : (e(!1), o = !1)
                                }
                            }), window.addEventListener("mouseup", n = function() {
                                o !== !1 && f && (t._ps.splice(f, 1), Object(l.hasSeparator)(v) && (t._ps[f].sep = 1, delete v.sep), t._ps.splice(o + 1, 0, v), t._redraw(!0, !0), t.saveUndoSateAndDraft()), window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", n), o = !1, O(t._els.canvas, "no_select"), clearInterval(a), e(!1), L(i), i = !1
                            })
                        }
                    })
                }, e.prototype.isLocked = function() {
                    return !!this.getOptions().editLockMessage
                }, e.prototype.showEditLockInfo = function() {
                    return this.isLocked() ? (this.showWarningInfo(this.getOptions().editLockMessage), this._els.canvas.removeAttribute("contenteditable"), $(this._objectPickerEl), this._hideObjectPicker(), void this._hideFormatTooltip()) : void this.showWarningInfo(!1)
                }, e.prototype.showRevEditInfo = function() {
                    nav.objLoc.from_rev && this.showWarningInfo(getLang("pages_article_rev_edit"))
                }, e.prototype.showWarningInfo = function(e) {
                    var t = C("article_ed__warn_info", this._els.editor);
                    t || (e ? (t = N('<div class="article_ed__warn_info">' + e + "</div>"), this._els.editor.appendChild(t), w(this._els.editor, "article_ed__warn_shown")) : (O(this._els.editor, "article_ed__warn_shown"), L(t)))
                }, e
            }();
        t["default"] = ie
    },
    140: function(e, t, r) {
        "use strict";

        function n(e, t, r) {
            var n = [];
            return e.forEach(function(e, i) {
                if (!r || Object(o.isObjectParagraph)(e) || !Object(o.isParagraphEmpty)(e) || 0 == i || e.type == a.ParagraphType.Code) {
                    var s = {};
                    for (var c in e) {
                        if (!e.hasOwnProperty(c)) return;
                        if (!c.startsWith("_") || "_uuid" === c && t) {
                            var l = e[c];
                            s[c] = isObject(l) || isArray(l) ? clone(l, !0) : l
                        }
                    }
                    Object(o.isObjectParagraph)(e) && e._object && (s.mediaId = e._object.getMediaId()), e.sep && (s.sep = 1), s.type == a.ParagraphType.Text && delete s.type, s.lines.forEach(function(e) {
                        if (void 0 !== e.decorations) {
                            var t = !0;
                            each(e.decorations, function(r, n) {
                                0 == n.length ? delete e.decorations[r] : t = !1
                            }), t && delete e.decorations
                        }
                        e.brs && 0 == e.brs.length && delete e.brs
                    }), n.push(s)
                }
            }), JSON.parse(JSON.stringify(n))
        }

        function i(e) {
            return e.forEach(function(e) {
                e.type = e.type || a.ParagraphType.Text, e.lines.forEach(function(e) {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
        r.r(t), r.d(t, "getCleanedState", function() {
            return n
        }), r.d(t, "expandParagraphFields", function() {
            return i
        });
        var a = r(31),
            o = r(44)
    },
    152: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(t);
        var i = function() {
            function e() {
                n(this, e)
            }
            return e._saveChunk = function(e, t, r, n, i) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: n,
                    chunk_index: r,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: function(e) {
                        i(e)
                    },
                    onError: function() {
                        i(!0)
                    }
                })
            }, e._saveFinally = function(e, t, r, n, i, a, o, s, c, l) {
                c = c ? JSON.stringify(c) : "", ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: i,
                    name: n,
                    is_published: intval(r),
                    chunks_count: s,
                    Article_text: c,
                    hash: o
                }, a || {}), {
                    onDone: l,
                    onFail: function(e) {
                        return e.startsWith("locked ") ? (l(e), !0) : e ? (showFastBox(getLang("global_error"), e), l(!0), !0) : void 0
                    }
                })
            }, e.save = function(t, r, n, i, a, o, s, c, l, d) {
                var u = [],
                    p = [],
                    h = 0;
                if (n.forEach(function(e) {
                        var t = 0;
                        e.lines.forEach(function(e) {
                            t += e.text.length, e.decorations && e.decorations.link && e.decorations.link.forEach(function(e) {
                                t += (e[2] || "").length
                            })
                        }), h += t, h >= c && (u.push(p), h = t, p = []), p.push(e)
                    }), p.length && u.push(p), u.length > 1) {
                    var f = new callHub(function() {
                        e._saveFinally(t, r, i, a, o, l, s, u.length, !1, d)
                    }, u.length);
                    u.forEach(function(r, n) {
                        e._saveChunk(t, r, n, s, function(e) {
                            e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : f.done()
                        })
                    })
                } else e._saveFinally(t, r, i, a, o, l, s, 0, n, d)
            }, e
        }();
        t["default"] = i
    },
    166: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(136),
            i = r(27);
        window.ArticleEditor = n["default"], window.ArticleView = {
            initArticle: i.initArticle
        }, stManager.done(jsc("web/article.js"))
    },
    169: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(t);
        var i = r(44),
            a = (r(31), function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }()),
            o = window.browser && (browser.mozilla || browser.safari),
            s = void 0,
            c = function() {
                function e(t, r, i) {
                    n(this, e), this._mediaId = t, this._editor = r, this._highlighted = !1, this._isCaptioned = !!i, s = this.getEditor().getOptions().multiMediasSeparator
                }
                return e.prototype.getEditor = function() {
                    return this._editor
                }, e.prototype.getMediaIdsCount = function() {
                    var e = this._mediaId.split(s);
                    return e.length
                }, e.prototype.getMediaId = function(e) {
                    if (void 0 !== e) {
                        var t = this._mediaId.split(s);
                        return t[e]
                    }
                    return this._mediaId
                }, e.prototype.setMediaId = function(e) {
                    this._mediaId = e
                }, e.prototype.highlight = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                    if (e != this._highlighted) {
                        this._highlighted = e;
                        var r = this.el();
                        if (e) {
                            var n = getSize(r),
                                a = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>'),
                                o = 0;
                            setStyle(a, {
                                width: n[0] + o,
                                height: n[1] + o
                            }), addClass(r, "article_ed__object_highlighted")
                        } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted");
                        if (this._isCaptioned)
                            if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || Object(i.focusEl)(this._getCaptionEl());
                            else {
                                var s = this.isEmptyCaption();
                                this._toggleCaptionPlaceholder(s), this._toggleCaption(!s)
                            }
                    }
                }, e.prototype.render = function() {}, e.prototype.el = function() {
                    var e = this;
                    if (!this._objectEl) {
                        var t = this.render();
                        addClass(t, "article_object_el"), t.setAttribute("contenteditable", "false");
                        var r = this.getEditor().isLocked() ? "false" : "true",
                            n = browser.mozilla ? 'contenteditable="' + r + '"' : 'contenteditable="false"';
                        this._objectEl = se("<figure " + n + "></figure>"), this._objectEl.appendChild(t);
                        var a = this.renderExtraControlsEl();
                        a && (a.setAttribute("contenteditable", "false"), addClass(a, "article_ed__extra_controls"), this._objectEl.appendChild(a)), this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="' + r + '"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), o && t.addEventListener("click", function() {
                            e.highlight(!0), Object(i.focusEl)(t)
                        })
                    }
                    return this._setLoadingEl(), this._objectEl
                }, e.prototype.renderExtraControlsEl = function() {
                    return !1
                }, e.prototype.setLoadingState = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                    !!this._isLoading != !!e && (this._isLoading = e, this._setLoadingEl(t), toggleClass(this._objectEl, "article_ed__object_loading", e), e || this.getEditor().onObjectStateLoaded(this))
                }, e.prototype._setLoadingEl = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                    if (this._objectEl) {
                        if (re(geByClass1("article_ed___object_loading_placeholder", this._objectEl)), this._isLoading) {
                            var t = se('<div class="article_ed___object_loading_placeholder"></div>');
                            toggleClass(t, "article_ed__object_loading_white", e), domInsertBefore(t, this._objectEl.firstChild)
                        }
                        toggleClass(this._objectEl, "article_ed___object_loading", !!this._isLoading)
                    }
                }, e.prototype.getCaptionEl = function() {
                    return this._isCaptioned ? this._getCaptionEl() : !1
                }, e.prototype.isCaptionFocused = function() {
                    return this._isCaptioned ? this._isFocusInCaption() : !1
                }, e.prototype.setCaptionElHtml = function(e) {
                    if (this._isCaptioned) {
                        e = e.trim();
                        var t = this._getCaptionEl();
                        t != e && (t.innerHTML = e), this._toggleCaptionPlaceholder(!e), this._toggleCaption(!!e)
                    }
                }, e.prototype.isEmptyCaption = function() {
                    return !this._getCaptionEl().textContent.trim()
                }, e.prototype._getCaptionEl = function() {
                    return geByClass1("article_ed__figcaption_edit", this._captionEl)
                }, e.prototype._toggleCaption = function(e) {
                    toggleClass(this._captionEl, "article_ed__figcaption_visible", e)
                }, e.prototype._toggleCaptionPlaceholder = function(e) {
                    (void 0 === this._captionPlaceholderShown || this._captionPlaceholderShown !== e) && (this._captionPlaceholderShown = toggle(geByClass1("article_ed__caption_placeholder", this._captionEl), e))
                }, e.prototype._isFocusInCaption = function() {
                    var e = this,
                        t = Object(i.getRange)(),
                        r = a(t, 2),
                        n = r[0],
                        o = r[1],
                        s = function(t) {
                            return !!traverseParent(t, function(t) {
                                return t == e._captionEl
                            }, 10)
                        };
                    if (o) return s(n.startContainer);
                    var c = s(n.startContainer),
                        l = s(n.endContainer);
                    return c && l
                }, e
            }();
        t["default"] = c
    },
    191: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Sequences", function() {
            return n
        });
        var n = [{
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
        }]
    },
    215: function(e, t, r) {
        e.exports = r(166)
    },
    232: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        r.r(t);
        var o = r(169),
            s = r(31),
            c = r(55),
            l = function(e) {
                function t(r, a) {
                    return n(this, t), i(this, e.call(this, r, a, !0))
                }
                return a(t, e), t.prototype.render = function() {
                    this._el = se('\n      <div class="article_object_video"></div>\n    ');
                    var e = c["default"].get(this.getMediaId());
                    if (e && (e.editable || e.thumb)) {
                        var t = this.getEditor().getWidth(!0),
                            r = Math.floor(t * (9 / 16)),
                            n = void 0;
                        if (e.thumb) n = e.thumb;
                        else {
                            var i = Object(s.getAppropriateImage)(e.editable.sizes, this.getEditor().getWidth(!0));
                            n = i[0]
                        }
                        setStyle(this._el, {
                            width: t,
                            height: r,
                            backgroundImage: "url(" + n + ")"
                        }), this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                            duration: e.duration || 0,
                            platform: e.platform || ""
                        }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>"))
                    }
                    return this._el
                }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
            }(o["default"]);
        t["default"] = l
    },
    246: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        r.r(t);
        var o = r(169),
            s = r(31),
            c = r(55),
            l = r(72),
            d = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = void 0,
            p = function(e) {
                function t(r, a) {
                    n(this, t);
                    var o = i(this, e.call(this, r, a, !0));
                    return o._currentImageIndex = 0, o
                }
                return a(t, e), t.prototype.cancelCarouselEditor = function() {
                    this._carouselEditor && this._carouselEditor.cancel()
                }, t.prototype.renderExtraControlsEl = function() {
                    var e = this;
                    if (!this.getEditor().getOptions().carouselEnabled) return !1;
                    var t = se('\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">' + getLang("pages_article_ed_create_carousel") + '</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    '),
                        r = geByClass1("article_ed__carousel_btn_edit", t),
                        n = geByClass1("article_ed__carousel_nav_btn_left", t),
                        i = geByClass1("article_ed__carousel_nav_btn_right", t),
                        a = function() {
                            var t = e.getMediaIdsCount() > 1;
                            r.innerHTML = t ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                        };
                    return a(), r.addEventListener("click", function(r) {
                        return e.getEditor().closeAllCarouselEditors(), addClass(e._el, "article_ed__carousel_edit_open"), e._carouselEditor = new l["default"](t, e, function(r) {
                            return r ? (delete e._fixedImageSize, e.setMediaId(r), e._rerender(), e.getEditor().saveUndoSateAndDraft(), a(), e._setImageIndex(0, t), removeClass(e._el, "article_ed__carousel_edit_open"), void delete e._carouselEditor) : void e.getEditor().removeObject(e)
                        }, e.getEditor().getLimits().maxCarouselItems), cancelEvent(r)
                    }), n.addEventListener("click", function() {
                        e._setImageIndex(e._getImageIndex() - 1, t)
                    }), i.addEventListener("click", function() {
                        e._setImageIndex(e._getImageIndex() + 1, t)
                    }), this._setImageIndex(0, t), t
                }, t.prototype._getImageIndex = function() {
                    return this._currentImageIndex
                }, t.prototype._setImageIndex = function(e, t) {
                    this._currentImageIndex = Math.min(Math.max(0, e), this.getMediaIdsCount());
                    var r = geByClass1("article_ed__carousel_nav_btn", t);
                    toggleClass(r, "no_left", 0 == this._currentImageIndex), toggleClass(r, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._el, "article_ed__carousel", this._isCarousel());
                    var n = geByClass1("article_ed__carousel_counter", t);
                    this._isCarousel() ? (setStyle(n, "display", "inline-block"), n.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(n), this._drawImage()
                }, t.prototype._rerender = function() {
                    var e = this._el,
                        t = this.render();
                    domReplaceEl(e, t)
                }, t.prototype.render = function() {
                    this._el = se('\n      <div class="article_ed__img_wrap">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                    var e = c["default"].get(this.getMediaId(), 0);
                    return e && e.sizes ? (this.setLoadingState(!1), this._drawImage()) : this.setLoadingState(!0), this._el
                }, t.prototype._initUpload = function() {
                    var e = this;
                    if (void 0 === this._upload) {
                        var t = this.getEditor().getPhotoUploadOptions();
                        this._upload = Upload.init(this.getEditor().getPhotoUploadEl(), t.url, t.params, {
                            file_name: "photo",
                            file_size_limit: 15728640,
                            file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                            file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF",
                            file_input: null,
                            accept: "image/jpeg,image/png,image/gif",
                            wiki_editor: 0,
                            noCheck: !0,
                            customShowProgress: function() {},
                            onUploadStart: function(e, t) {},
                            onUploadComplete: function(t, r) {
                                return r = JSON.parse(r), isEmpty(r) ? void(e._onUploadCallback && e._onUploadCallback()) : void ajax.post("al_photos.php", extend({
                                    act: "choose_uploaded"
                                }, r), {
                                    onDone: function(t, r) {
                                        e._mediaId = t, c["default"].add(t, r.editable), e._drawImage(), e._onUploadCallback && e._onUploadCallback()
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
                            server: t.opts.server,
                            error: t.opts.default_error,
                            error_hash: t.opts.error_hash
                        })
                    }
                }, t.prototype._getImageEl = function() {
                    return geByTag1("img", this._el)
                }, t.prototype.setBLOB = function(e, t) {
                    var r = this;
                    this._onUploadCallback = t;
                    var n = new FileReader;
                    n.onload = function() {
                        r._initUpload(), Upload.onFileApiSend(r._upload, [e])
                    }, n.readAsDataURL(e)
                }, t.prototype._updateSize = function() {}, t.prototype._drawImage = function() {
                    var e = this,
                        t = c["default"].get(this.getMediaId(), this._currentImageIndex);
                    if (t) {
                        var r = Object(s.getAppropriateImage)(t.sizes, this.getEditor().getWidth(!0)),
                            n = d(r, 1),
                            i = n[0],
                            a = this._getImageEl(),
                            o = !1;
                        a.onload = function() {
                            clearTimeout(u), o = !0, setStyle(a, "visibility", "visible"), show(a), e.setLoadingState(!1), e._fixSize()
                        }, a.src = i, clearTimeout(u), o || (u = setTimeout(function() {
                            o || (setStyle(a, "visibility", "hidden"), e.setLoadingState(!0, e._isCarousel()))
                        }, 10)), this._updateSize()
                    }
                }, t.prototype._isCarousel = function() {
                    return this.getMediaIdsCount() > 1
                }, t.prototype._fixSize = function() {
                    this._fixedImageSize = this._fixedImageSize || getSize(this._el), this._fixedImageSize[0] = Math.ceil(this._fixedImageSize[0]), this._fixedImageSize[1] = Math.ceil(this._fixedImageSize[1]), setStyle(this._el, {
                        height: this._fixedImageSize[1] + "px"
                    }), setStyle(this._getImageEl(), {
                        "max-width": this._fixedImageSize[0],
                        "max-height": this._fixedImageSize[1]
                    })
                }, t
            }(o["default"]);
        t["default"] = p
    },
    27: function(e, t, r) {
        "use strict";

        function n(e, t) {
            w = t || {}, P = e, w.moderDeletePhoto = P.moderDeletePhoto, y = ge("article_view_" + e.owner_id + "_" + e.id), b = w.scrollNode || window, E = w.getScrollTop || function() {
                var e = document.scrollingElement || window.scrollNode || document.body;
                return e.scrollTop
            }, m = gpeByClass("article_body", y) || gpeByClass("_article_layer", y), s(), o(), f(), setTimeout(function() {
                b.click && b.click(), b.focus()
            }, 10), window.onBodyResize = window.onBodyResize || function() {}, window.cur && cur.destroy.push(function() {
                a()
            })
        }

        function i() {
            w.notFull = !1, o(), f(), c()
        }

        function a() {
            O && (b.removeEventListener("scroll", O), O = !1), T && (b.removeEventListener("scroll", T), T = !1), clearTimeout(j)
        }

        function o() {
            each(geByClass("_article_unmute_button"), function(e, t) {
                t.addEventListener("click", function() {
                    var e = t.parentNode,
                        r = geByTag1("video", e);
                    r.muted = !r.muted, toggleClass(e, "article_object_unmuted", !r.muted)
                })
            }), each(geByTag("figure", y), function(e, t) {
                var r = parseInt(domData(t, "type"));
                r == _.ParagraphType.ObjectPhoto && Object(g.initPhotoCarousel)(t, w), w.isWebView || r != _.ParagraphType.ObjectPhoto || d(t)
            })
        }

        function s() {
            b.addEventListener("scroll", O = function() {
                c()
            }, {
                passive: !0
            }), c()
        }

        function c() {
            var e = {
                    101: -2e3
                },
                t = E(),
                r = window.innerHeight,
                n = getXY(y)[1];
            each(geByTag("figure", y), function(i, a) {
                var o = intval(domData(a, "done"));
                if (!o) {
                    var s = getH(a),
                        c = getXY(a)[1] - n,
                        d = intval(domData(a, "type")),
                        u = void 0 !== e[d] ? e[d] : 60,
                        p = t + r - u >= c && c + s - u >= t;
                    o = l(p, d, a), o && domData(a, "done", 1)
                }
            })
        }

        function l(e, t, r) {
            var n = !1;
            switch (t) {
                case _.ParagraphType.ObjectPhoto:
                    if (e) {
                        var i = geByTag1("img", r),
                            a = domQuery1("[data-sizes]", r),
                            o = JSON.parse(domData(a, "sizes"));
                        o.forEach(function(e, t) {
                            if (!(t > 3)) {
                                var r = Object(_.getAppropriateImage)(o[t], getW(i) || w.width, !0),
                                    n = v(r, 1),
                                    a = n[0];
                                Object(_.preloadImage)(a, function() {
                                    0 == t && (removeClass(i, "article_object_photo__image_blur"), i.src = a)
                                })
                            }
                        }), n = !0
                    }
                    break;
                case _.ParagraphType.ObjectGIF:
                    if (!w.mobile) {
                        var s = geByTag1("video", r);
                        s ? e ? s.hasAttribute("autoplay") && s.play() : s.pause() : n = !0
                    }
            }
            return n
        }

        function d(e) {
            if (!w.noImageOpen) {
                var t = geByTag1("img", e),
                    r = domQuery1("[data-sizes]", e),
                    n = JSON.parse(domData(r, "sizes")),
                    i = Object(_.getAppropriateImage)(n[0], window.innerWidth, !0),
                    a = v(i, 3),
                    o = a[0],
                    s = a[1],
                    c = a[2],
                    l = h({
                        width: s,
                        height: c
                    }, {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }),
                    d = getW(e) < l.width && getH(e) < l.height;
                if (o && d) {
                    var f = geByClass1("article_photo_carousel__controls", e) || t;
                    addClass(f, "article_image_full_viewable");
                    var g = data(e, "changePhotoFunction");
                    f.addEventListener("click", function() {
                        var t = intval(domData(e, "photo-carousel-index"));
                        addClass(m, "article_no_scroll");
                        var r = geByTag1("figcaption", e),
                            i = se('<div class="article_full_view"><img class="article_full_view__image"></div>');
                        r && r.innerHTML && i.appendChild(se('<div class="article_full_view__caption"><div class="article_full_view__caption_inner">' + r.innerHTML + "</div></div>")), n.length > 1 && (toggleClass(k, "article_full_view__carousel", n.length > 1), x = se('<div class="article_full_view__right"></div>'), i.appendChild(x), S = se('<div class="article_full_view__left"></div>'), i.appendChild(S), x.addEventListener("click", function(e) {
                            return t = Math.min(n.length - 1, Math.max(0, t + 1)), u(a, n, t), g && g(1), cancelEvent(e)
                        }), S.addEventListener("click", function(e) {
                            return t = Math.min(n.length - 1, Math.max(0, t - 1)), u(a, n, t), g && g(-1), cancelEvent(e)
                        })), k = se('<div class="article_full_view__counter"><div class="article_full_view__counter_text"></div><div class="article_full_view__close"></div></div>'), i.appendChild(k), n.length > 1 && toggleClass(k, "article_full_view__carousel", n.length > 1), y.appendChild(i), i.addEventListener("click", function(e) {
                            domClosest("article_full_view__caption_inner", e.target) || p()
                        }), i.addEventListener("mousewheel", p), C = i;
                        var a = geByTag1("img", i);
                        u(a, n, t)
                    })
                }
            }
        }

        function u(e, t, r) {
            if (toggleClass(S, "article_full_view__nav_hidden", 0 == r), toggleClass(x, "article_full_view__nav_hidden", r == t.length - 1), t.length > 1) {
                var n = geByClass1("article_full_view__counter_text", k);
                n.innerHTML = getLang("global_article_carousel_counter").replace("{counter}", r + 1).replace("{total}", t.length)
            }
            I = r;
            var i = Object(_.getAppropriateImage)(t[r], window.innerWidth, !0),
                a = v(i, 3),
                o = a[0],
                s = a[1],
                c = a[2],
                l = h({
                    width: s,
                    height: c
                }, {
                    width: window.innerWidth,
                    height: window.innerHeight
                }),
                d = !1,
                u = Object(_.preloadImage)(o, function() {
                    if (I === r) {
                        d = !0, l.width && isNumeric(l.width) ? setStyle(e, {
                            width: l.width,
                            height: l.height
                        }) : setStyle(e, {
                            width: null,
                            height: null
                        }), e.src = o, removeClass(e, "article_full_view__image_blurred");
                        for (var n = r; n < Math.min(r + 3, t.length); n++) {
                            var i = Object(_.getAppropriateImage)(t[n], window.innerWidth, !0),
                                a = v(i, 1),
                                s = a[0];
                            Object(_.preloadImage)(s)
                        }
                    }
                });
            if (u) removeClass(e, "article_full_view__image_blurred");
            else {
                var p = Object(_.getAppropriateImage)(t[r], 200, !0),
                    f = v(p, 1),
                    g = f[0];
                Object(_.preloadImage)(g, function() {
                    I === r && (d || (setStyle(e, {
                        width: l.width,
                        height: l.height
                    }), e.src = g))
                }), addClass(e, "article_full_view__image_blurred")
            }
        }

        function p() {
            return C ? (re(C), m && removeClass(m, "article_no_scroll"), C = !1, !0) : !1
        }

        function h(e, t) {
            var r = e.width / e.height,
                n = t.width / t.height,
                i = {};
            return r > n ? (i.width = Math.min(t.width, e.width), i.height = e.height * (i.width / e.width)) : (i.height = Math.min(t.height, e.height), i.width = i.height * r), i
        }

        function f() {
            function e() {
                return Math.round((Date.now() - o) / 1e3)
            }

            function t(t) {
                if (!(s >= t) && (s = t, l.push(t), clearTimeout(c), c = setTimeout(r, 100), 3 == t && P.ttr)) {
                    var n = P.ttr - e();
                    n > 0 && (j = setTimeout(function() {
                        document.hidden || (s = 4, l = [s], r())
                    }, 1e3 * n))
                }
            }

            function r() {
                l.length && (ajax.post(window.isMVK ? "article.php" : "al_articles.php", {
                    act: "stats",
                    scroll: l.join(","),
                    spent: e(),
                    hash: P.access_hash,
                    article_owner_id: P.owner_id,
                    article_id: P.id,
                    is_web_view: w.isWebView ? 1 : 0,
                    post_id: w.postId,
                    ref: window.cur ? window.cur.module : ""
                }), l.forEach(function(e) {
                    Object(_.mailruStatsPixel)("scroll_" + e, P.mailruStatsData)
                }), l = [])
            }
            if (!w.notFull) {
                var n = getH(y),
                    i = getXY(y)[1] - scrollGetY(),
                    a = window.innerHeight,
                    o = Date.now(),
                    s = -1,
                    c = void 0,
                    l = [];
                t(0), b.addEventListener("scroll", T = function() {
                    var e = E();
                    e > 0 && t(1);
                    for (var r = 1; 4 > r; r++) e + 3 * a / 4 > i + n * r / 3 && t(r + 1);
                    e + a > n - 20 && t(4)
                }, {
                    passive: !0
                })
            }
        }
        r.r(t), r.d(t, "initArticle", function() {
            return n
        }), r.d(t, "updateArticle", function() {
            return i
        }), r.d(t, "deinitArticle", function() {
            return a
        });
        var _ = r(31),
            g = r(131),
            v = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            m = void 0,
            y = void 0,
            b = void 0,
            w = void 0,
            E = void 0,
            C = void 0,
            P = void 0,
            O = void 0,
            T = void 0,
            j = void 0,
            x = void 0,
            S = void 0,
            k = void 0,
            I = void 0;
        ({
            php: new RegExp("\\b(array|as|break|case|class|const|continue|default|do|else|elseif|for|foreach|function|global|if|return|static|switch|while|try|catch|throw)\\b", "g"),
            js: new RegExp("\\b(break|case|class|const|continue|default|do|else|for|function|if|return|static|switch|while|try|catch|throw|let)\\b", "g")
        }), window.initArticle = n, window.deinitArticle = a, window.updateArticle = i, window.articleCloseImageFullSize = p
    },
    31: function(e, t, r) {
        "use strict";

        function n() {
            return window.devicePixelRatio >= 2
        }

        function i() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            for (var r in e)
                if (Object.prototype.hasOwnProperty.call(e, r) && t.call(e[r], r, e[r]) === !1) break;
            return e
        }

        function a(e, t, r) {
            var a = [];
            if (i(e, function(e, t) {
                    r && -1 == ["w", "z", "y", "x", "m", "s"].indexOf(e) || a.push(t)
                }), !a.length) return [!1];
            a.sort(function(e, t) {
                return e[1] - t[1]
            }), t *= n() ? 2 : 1;
            var o = a[a.length - 1];
            return i(a, function(e, r) {
                return r[1] >= t ? (o = r, !1) : void 0
            }), o
        }

        function o(e, t) {
            if (l[e] === !0) return t && t(), !0;
            if (isArray(l[e])) return l[e].push(t), !1;
            l[e] = [t];
            var r = new Image;
            return r.onload = function() {
                var t = l[e];
                l[e] = !0, i(t, function(e, t) {
                    t && t()
                })
            }, r.src = e, !1
        }

        function s(e, t) {
            if (isObject(t) && !isEmpty(t)) {
                var r = "https://vk-callback.go.mail.ru/longread_pxl?action=" + e;
                i(t, function(e, t) {
                    r += "&" + e + "=" + t
                });
                var n = new Image;
                n.src = r
            }
        }
        r.r(t), r.d(t, "ParagraphType", function() {
            return c
        }), r.d(t, "getAppropriateImage", function() {
            return a
        }), r.d(t, "preloadImage", function() {
            return o
        }), r.d(t, "mailruStatsPixel", function() {
            return s
        });
        var c = {
                Text: 1,
                Header1: 2,
                Header2: 3,
                Header3: 4,
                Code: 5,
                NumericList: 6,
                BulletList: 7,
                Quote: 8,
                Quote2: 9,
                ObjectAudioPlaylist: 100,
                ObjectPhoto: 101,
                ObjectVideo: 102,
                ObjectGIF: 103
            },
            l = {}
    },
    44: function(e, t, r) {
        "use strict";

        function n(e) {
            return se("<textarea>" + (e || "") + "</textarea>").value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function i(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && inArray(e.tagName.toLowerCase(), ["cite", "blockquote"])
        }

        function a(e) {
            var t = domData(e, "type"),
                r = domData(e, "uuid");
            return [t, r]
        }

        function o(e, t) {
            cur[e] = cur[e] || 0, void 0 === t ? console.log(e, cur[e]) : cur[e] >= t, cur[e]++
        }

        function s(e) {
            return e && hasClass(e, "_article_paragraph")
        }

        function c(e) {
            if (e) try {
                var t = document.createRange();
                t.selectNodeContents(e);
                var r = window.getSelection();
                r.removeAllRanges(), r.addRange(t)
            } catch (n) {}
        }

        function l(e, t) {
            if (e) try {
                var r = document.createRange();
                t ? (r.selectNodeContents(e), r.collapse(!1)) : (r.setStart(e, 0), r.setEnd(e, 0));
                var n = window.getSelection();
                n.removeAllRanges(), n.addRange(r)
            } catch (i) {}
        }

        function d(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && "BR" == e.tagName
        }

        function u(e, t, r, n) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
            if (e = e.substring(t, r), n && n.length) {
                var a = [],
                    o = 0;
                n.forEach(function(r) {
                    if (r -= t, !(0 >= r || r > e.length)) {
                        var n = e.substring(o, r) + "<br/>";
                        n = i ? n : E(n), a.push(n), o = r
                    }
                });
                var s = e.substring(o);
                return a.push(i ? s : E(s)), "" == a[a.length - 1], a.join("")
            }
            return i ? e : E(e)
        }

        function p(e) {
            if (!e) return !1;
            for (var t = 0; null != (e = e.previousSibling);) t++;
            return t
        }

        function h(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
        }

        function f(e) {
            return e && e.type && e.type >= 100
        }

        function _(e) {
            return e && e.sep
        }

        function g() {
            return ++oe
        }

        function v(e) {
            var t = void 0;
            return t = isObject(e) ? e.type : e, inArray(t, [ee.ParagraphType.Header1, ee.ParagraphType.Header2, ee.ParagraphType.Header3])
        }

        function m(e) {
            return e && (e.type == ee.ParagraphType.NumericList || e.type == ee.ParagraphType.BulletList)
        }

        function y(e) {
            e = e || {};
            var t = {};
            return f(e) && (t._uuid = e._uuid), t.lines = e.lines || [{
                text: "",
                decorations: {},
                brs: []
            }], t.type = e.type ? parseInt(e.type) : ee.ParagraphType.Text, e.mediaId && (t.mediaId = e.mediaId), e.sep && (t.sep = e.sep), e.fromExtPage && (t.fromExtPage = e.fromExtPage), t
        }

        function b(e) {
            if (isArray(e)) return e;
            var t = [];
            return each(e, function(e, r) {
                t.push(intval(r))
            }), t.sort(), t
        }

        function w() {
            var e = window.getSelection();
            return e.rangeCount ? [e.getRangeAt(0), e.isCollapsed, e] : [!1]
        }

        function E(e) {
            return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + re), e
        }

        function C(e) {
            return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
        }

        function P(e) {
            var t = e.slice();
            t.sort(function(e, t) {
                return e[0] - t[0]
            });
            for (var r = 0; r < t.length - 1;) {
                var n = t[r],
                    i = t[r + 1];
                n[1] >= i[0] ? (n[1] = Math.max(n[1], i[1]), t.splice(r + 1, 1)) : r++
            }
            return t
        }

        function O(e) {
            return /\s/.test(e)
        }

        function T(e) {
            return ce.test(e)
        }

        function j(e) {
            return /[a-zA-Z]/.test(e)
        }

        function x(e) {
            return !hasClass(e, ae)
        }

        function S() {
            var e = window.getSelection();
            return e.focusNode
        }

        function k(e) {
            var t = [];
            each(e, function(e, r) {
                t.push(r)
            });
            var r = t.sort(function(e, t) {
                return t[1] - e[1]
            })[0];
            return [r[1], r[2]]
        }

        function I(e) {
            for (var t = e.parentNode, r = 0; r < t.childNodes.length; r++)
                if (e == t.childNodes[r]) return r;
            return -1
        }

        function L(e, t) {
            e = e.toLowerCase();
            for (var r = "", n = !1, i = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), a = 0; a < e.length; a++)
                if (/\s/.test(e[a])) n || (r += "-", n = !0);
                else if (inArray(e[a], i)) r += e[a], n = !1;
            else {
                var o = le[e.charCodeAt(a)];
                o && (r += o, n = !1)
            }
            return r = r.substr(0, t), r = r.replace(/-*$/, "").replace(/^-*/, "").replace(/-+/g, "-")
        }

        function N(e) {
            var t = void 0,
                r = void 0,
                n = void 0;
            t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], n = new Uint8Array(t.length);
            for (var i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
            return new Blob([n], {
                type: r
            })
        }

        function A(e, t, r) {
            function n(e) {
                return e ? a[e.split("?").shift().split(".").pop()] : null
            }
            var i = void 0;
            if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
            if ("object" === ("undefined" == typeof e ? "undefined" : te(e)) && "img" === e.tagName.toLowerCase() && (i = e.src), "string" == typeof e && (i = e),
                /^data:/.test(i) && !t.convert) return void r(null, N(i));
            var a = {
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                svg: "image/svg+xml"
            };
            return t.type = a[t.type] || n(i), t.src = i, t.callback = r, t.name = i, t.type ? void D(i, M.bind(null, t)) : void r(new Error("Image type is not supported"))
        }

        function M(e, t, r) {
            if (t) return void e.callback(t);
            var n = N(r);
            n.name = n.filename = e.name, e.callback(null, n)
        }

        function D(e, t) {
            var r = document.createElement("canvas"),
                n = document.createElement("img");
            n.onload = function() {
                var e = r.getContext("2d");
                r.width = n.width, r.height = n.height, e.drawImage(n, 0, 0), t(null, r.toDataURL("image/png"))
            }, n.addEventListener("error", function() {
                t(new Error("FailedToLoadImage"))
            }), r.getContext ? (n.crossOrigin = "anonymous", n.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
        }

        function B() {
            if (0 != de.length && ue != pe) {
                ue++;
                var e = de.shift(),
                    t = new Image;
                t.addEventListener("load", function() {
                    A(t, {}, function(t, r) {
                        e.cb(t, r, function() {
                            ue--, B()
                        })
                    })
                }), t.src = e.src
            }
        }

        function R(e, t) {
            de.push({
                src: e,
                cb: t
            }), B()
        }

        function H(e) {
            return e = trim(e), 1 == e.length && e[0] == ne
        }

        function U(e, t) {
            if (!e) return !0;
            if (f(e)) return !1;
            var r = e.lines;
            if (0 == r.length) return !0;
            var n = t ? trim(r[0].text) : r[0].text;
            return !n
        }

        function F(e) {
            return e.filter(function(e, t, r) {
                return r.indexOf(e) === t
            })
        }

        function z(e, t, r) {
            var n = {};
            for (var i in e) e.hasOwnProperty(i) && ! function() {
                var a = [];
                e[i].forEach(function(e) {
                    t < e[1] && e[0] <= r && a.push([Math.max(e[0], t) - t, Math.min(r, e[1]) - t, e[2]])
                }), n[i] = a
            }();
            return n
        }

        function W(e) {
            e.brs = F(e.brs), e.brs[e.brs.length - 1] == e.text.length && e.brs.pop()
        }

        function K(e, t) {
            var r = e.length;
            return 1 == r && e[r - 1] == t ? e.pop() : r > 1 && e[r - 1] == t && e[r - 2] != t && e.pop(), e
        }

        function $() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments[1],
                r = t ? 'data-sep="' + g() + '"' : "";
            return se('<p class="' + ae + '" ' + r + ">" + e + "</p>")
        }

        function Y(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0,
                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                i = t(e, n);
            if (void 0 !== i) return i;
            for (var a = Array.prototype.slice.call(r ? e.children : e.childNodes), o = void 0; o = a.shift();) {
                var s = Y(o, t, r, !1);
                if (void 0 !== s) return s
            }
        }

        function q(e, t, r) {
            var n = void 0,
                i = void 0,
                a = void 0,
                o = null,
                s = 0;
            r || (r = {});
            var c = function() {
                s = r.leading === !1 ? 0 : Date.now(), o = null, a = e.apply(n, i), o || (n = i = null)
            };
            return function() {
                var l = Date.now();
                s || r.leading !== !1 || (s = l);
                var d = t - (l - s);
                return n = this, i = arguments, 0 >= d || d > t ? (o && (clearTimeout(o), o = null), s = l, a = e.apply(n, i), o || (n = i = null)) : o || r.trailing === !1 || (o = setTimeout(c, d)), a
            }
        }

        function Q(e) {
            return /^[a-z0-9\-]+$/.test(e) ? -1 != e.indexOf("--") ? !1 : "-" == e[0] || "-" == e[e.length - 1] ? !1 : e.length > 60 ? !1 : !0 : !1
        }

        function V(e, t, r) {
            e.decorations && each(e.decorations, function(e, n) {
                n.forEach(function(e) {
                    e[0] > t && (e[0] += r), e[1] > t && (e[1] += r)
                })
            }), e.brs && e.brs.forEach(function(r, n) {
                r > t && (e.brs[n] -= 1)
            })
        }

        function X(e, t) {
            e.forEach(function(e) {
                e.lines.forEach(function(e) {
                    for (var r = 0, n = e.text.length; n > r; r++) {
                        var i = e.text.charCodeAt(r);
                        i >= 55296 && 56319 >= i && (V(e, r, t), r += 1)
                    }
                })
            })
        }

        function G(e) {
            return /^(https?:\/\/)?([a-z0-9_\-.]+\.)?vk.com(\/.*)?/.test(e)
        }

        function J(e) {
            var t = e;
            try {
                t = decodeURIComponent(e)
            } catch (r) {
                t = e
            }
            return t
        }

        function Z(e) {
            for (var t = 0, r = e.children.length; r > t; t++)
                if (fe.indexOf(e.children[t].tagName) >= 0) return !0;
            return !1
        }
        r.r(t), r.d(t, "NBSP", function() {
            return re
        }), r.d(t, "CURSOR_MARKER_START", function() {
            return ne
        }), r.d(t, "CURSOR_MARKER_END", function() {
            return ie
        }), r.d(t, "ArticleEditorParagraphClass", function() {
            return ae
        }), r.d(t, "replaceParagraphEntities", function() {
            return n
        }), r.d(t, "isQuoteEl", function() {
            return i
        }), r.d(t, "paragraphElProperties", function() {
            return a
        }), r.d(t, "deb", function() {
            return o
        }), r.d(t, "isParagraphEl", function() {
            return s
        }), r.d(t, "selectEl", function() {
            return c
        }), r.d(t, "focusEl", function() {
            return l
        }), r.d(t, "isBR", function() {
            return d
        }), r.d(t, "prepareLineText", function() {
            return u
        }), r.d(t, "getElementIndex", function() {
            return p
        }), r.d(t, "isObjectParagraphEl", function() {
            return h
        }), r.d(t, "isObjectParagraph", function() {
            return f
        }), r.d(t, "hasSeparator", function() {
            return _
        }), r.d(t, "genSepatorId", function() {
            return g
        }), r.d(t, "isHeaderParagraph", function() {
            return v
        }), r.d(t, "isListParagraph", function() {
            return m
        }), r.d(t, "buildParagraph", function() {
            return y
        }), r.d(t, "convertBRsToArray", function() {
            return b
        }), r.d(t, "getRange", function() {
            return w
        }), r.d(t, "prepareSpacesWithSpaces", function() {
            return E
        }), r.d(t, "cleanTextSpaces", function() {
            return C
        }), r.d(t, "mergeRanges", function() {
            return P
        }), r.d(t, "isWhiteSpaceChar", function() {
            return O
        }), r.d(t, "isCyrillicChar", function() {
            return T
        }), r.d(t, "isLatinChar", function() {
            return j
        }), r.d(t, "isAlienParagraphEl", function() {
            return x
        }), r.d(t, "getFocusedElement", function() {
            return S
        }), r.d(t, "getPhotoSize", function() {
            return k
        }), r.d(t, "childNodeIndex", function() {
            return I
        }), r.d(t, "generateLatinizedName", function() {
            return L
        }), r.d(t, "dataURItoBlob", function() {
            return N
        }), r.d(t, "imageToBlob", function() {
            return A
        }), r.d(t, "queuePhotoProcess", function() {
            return R
        }), r.d(t, "justCursorInString", function() {
            return H
        }), r.d(t, "isParagraphEmpty", function() {
            return U
        }), r.d(t, "arrayUnique", function() {
            return F
        }), r.d(t, "decorationsSlice", function() {
            return z
        }), r.d(t, "cleanLineBRs", function() {
            return W
        }), r.d(t, "cleanBRs", function() {
            return K
        }), r.d(t, "createParagraphEl", function() {
            return $
        }), r.d(t, "traverseTree", function() {
            return Y
        }), r.d(t, "throttle", function() {
            return q
        }), r.d(t, "isPublishNameCorrect", function() {
            return Q
        }), r.d(t, "correctRealIndexes", function() {
            return X
        }), r.d(t, "isVKUrl", function() {
            return G
        }), r.d(t, "decodeURL", function() {
            return J
        }), r.d(t, "BlockElements", function() {
            return fe
        }), r.d(t, "hasBlockElements", function() {
            return Z
        });
        var ee = r(31),
            te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            re = "&nbsp;",
            ne = "​",
            ie = "‌",
            ae = "_article_p",
            oe = 0,
            ce = /[\u0400-\u04FF]/,
            le = {
                1072: "a",
                1073: "b",
                1074: "v",
                1075: "g",
                1076: "d",
                1077: "e",
                1105: "e",
                1078: "zh",
                1079: "z",
                1080: "i",
                1081: "i",
                1082: "k",
                1083: "l",
                1084: "m",
                1085: "n",
                1086: "o",
                1087: "p",
                1088: "r",
                1089: "s",
                1090: "t",
                1091: "u",
                1092: "f",
                1093: "h",
                1094: "c",
                1095: "ch",
                1096: "sh",
                1097: "sch",
                1099: "y",
                1101: "e",
                1102: "u",
                1103: "ya"
            },
            de = [],
            ue = 0,
            pe = 2,
            he = "div p footer form h1 h2 h3 h4 h5 h6 header hgroup hr main nav output pre section table tfoot address article aside blockquote canvas dd dl dt fieldset figcaption figure",
            fe = he.toUpperCase().split(" ")
    },
    55: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        r.r(t);
        var i = {},
            a = function() {
                function e() {
                    n(this, e)
                }
                return e.add = function(e, t) {
                    i[e] = t
                }, e.get = function(e, t) {
                    return void 0 !== t ? (e = e.split(","), i[e[t]]) : i[e]
                }, e
            }();
        t["default"] = a
    },
    57: function(e, t, r) {
        "use strict";

        function n(e) {
            o = e
        }

        function i(e) {
            var t = [];
            e.length > o.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", o.maxParagraphs));
            var r = 0,
                n = 0;
            return e.forEach(function(e) {
                var i = 0;
                e.lines.forEach(function(e) {
                    r += e.text.length, i += e.text.length
                }), Object(a.isObjectParagraph)(e) && n++, i > o.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", i).replace("{limit}", o.maxSymbolsPerParagraph))
            }), r > o.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", o.maxSymbols)), n > o.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", n).replace("{limit}", o.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
        r.r(t), r.d(t, "initLimits", function() {
            return n
        }), r.d(t, "checkLimits", function() {
            return i
        });
        var a = r(44),
            o = void 0
    },
    6: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        r.r(t);
        var o = r(169),
            s = r(55),
            c = function(e) {
                function t(r, a) {
                    return n(this, t), i(this, e.call(this, r, a, !0))
                }
                return a(t, e), t.prototype.render = function() {
                    var e = this;
                    this._el = se("\n      <div></div>\n    ");
                    var t = s["default"].get(this.getMediaId());
                    if (t)
                        if (t.video) {
                            if (this._videoEl = ce("video", {
                                    autoplay: !0,
                                    loop: "loop",
                                    muted: !0,
                                    src: t.video + "&mp4=1"
                                }), t.size) {
                                var r = t.size[0] < t.size[1],
                                    n = t.size[0] <= this.getEditor().getOptions().minGifWidthExpand;
                                (r || n) && setStyle(this._videoEl, {
                                    width: t.size[0]
                                })
                            }
                            this._el.appendChild(this._videoEl), this._el.appendChild(se('<span class="article_ed__select_dummy">&nbsp;</span>'))
                        } else if (t.href) {
                        var i = t.href + "&wnd=1&module=" + cur.module;
                        this._imgEl = ce("img"), this._imgEl.addEventListener("error", function() {
                            showFastBox(getLang("pages_article_error_box_title"), getLang("pages_article_error_box_text")), e._editor.removeObject(e)
                        }), this._imgEl.src = i, this._el.appendChild(this._imgEl)
                    }
                    return this._el
                }, t.prototype.onViewport = function(e) {
                    this._imgEl ? setStyle(this._imgEl, "visibility", e ? "visible" : "hidden") : e ? this._videoEl.play() : this._videoEl.pause()
                }, t.prototype.onRender = function() {
                    var e = this;
                    setTimeout(function() {
                        if (e._videoEl && e._videoEl.play(), browser.msie && e._videoEl) {
                            var t = e._videoEl.src;
                            e._videoEl.src = "", e._videoEl.src = t
                        }
                    })
                }, t
            }(o["default"]);
        t["default"] = c
    },
    60: function(e, t, r) {
        "use strict";

        function n(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        }

        function i(e, t) {
            return t = n(t) || document, t.getElementsByTagName(e)
        }

        function a(e, t) {
            return t = n(t) || document, t.querySelector && t.querySelector(e) || i(e, t)[0]
        }

        function o(e, t, r) {
            t = n(t) || document, r = r || "*";
            var a = [];
            if (t.querySelectorAll && "*" != r) return t.querySelectorAll(r + "." + e);
            if (t.getElementsByClassName) {
                var o = t.getElementsByClassName(e);
                if ("*" != r) {
                    r = r.toUpperCase();
                    for (var s = 0, c = o.length; c > s; ++s) o[s].tagName.toUpperCase() == r && a.push(o[s])
                } else a = Array.prototype.slice.call(o);
                return a
            }
            for (var l = i(r, t), d = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, c = l.length; c > s; ++s) d.test(l[s].className) && a.push(l[s]);
            return a
        }

        function s(e, t, r) {
            return t = n(t) || document, r = r || "*", t.querySelector && t.querySelector(r + "." + e) || o(e, t, r)[0]
        }

        function c(e, t, r) {
            if (t = n(t), !t) return null;
            for (; r !== t && (t = t.parentNode);)
                if (ee(t, e)) return t;
            return null
        }

        function l(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function d(e, t) {
            return (t || document).querySelector(e)
        }

        function u(e, t) {
            return ee(t, e) ? t : c(e, t)
        }

        function p(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : h(e, t)
        }

        function h(e, t) {
            if (t = n(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function f(e, t, r) {
            var n = document.createElement(e);
            return t && extend(n, t), r && le(n, r), n
        }

        function _(e) {
            return e = n(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function g(e) {
            return P(f("div", {
                innerHTML: e
            }))
        }

        function v(e) {
            return j(f("div", {
                innerHTML: e
            }))
        }

        function m(e, t) {
            return each(t, function(t, r) {
                e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof r ? "" : r).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function y(e) {
            return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
        }

        function b(e, t) {
            return isString(t) && (t = g(t)), T(e).replaceChild(t, e), t
        }

        function w(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }

        function E(e) {
            return w((e || {}).nextSibling)
        }

        function C(e) {
            return w((e || {}).previousSibling, 1)
        }

        function P(e) {
            return w((e || {}).firstChild)
        }

        function O(e) {
            return w((e || {}).lastChild, 1)
        }

        function T(e) {
            return (e || {}).parentNode
        }

        function j(e) {
            for (var t = [], r = e.childNodes, n = 0; n < r.length; n++) r[n].tagName && t.push(r[n]);
            return t
        }

        function x(e, t) {
            var r = T(t);
            return r && r.insertBefore(e, t)
        }

        function S(e, t) {
            var r = T(t);
            return r && r.insertBefore(e, E(t))
        }

        function k(e, t) {
            return e ? s(t, e) : e
        }

        function I(e, t, r) {
            return e ? "undefined" != typeof r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
        }

        function L(e) {
            for (var t = 0; null != (e = C(e));) t++;
            return t
        }

        function N(e, t) {
            do e = T(e); while (e && !M(e, t));
            return e
        }

        function A(e, t, r) {
            for (var n = null; null === n && e;) e = -1 === r ? C(e) : E(e), e && M(e, t) && (n = e);
            return n
        }

        function M(e, t) {
            if (e = n(e), !e || e == document) return !1;
            var r = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
                for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t[r] !== this;);
                return r > -1
            };
            return r.call(e, t)
        }

        function D(e) {
            return M(e, ":hover")
        }

        function B(e, t) {
            var r = n(e);
            if (t = n(t), !e || !t) return !1;
            for (; r = r.parentNode;)
                if (r == t) return !0;
            return !1
        }

        function R() {
            var e = browser.msie6 ? n("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function H(e, t) {
            t = t || {};
            for (var r = t.fromEl || T(e), n = t.positions || ["relative", "absolute", "fixed"]; r && r != bodyNode;) {
                var i = ce(r, "position");
                if (inArray(i, n) && (!t.noOverflow || "hidden" != ce(r, "overflow"))) break;
                r = T(r)
            }
            return r
        }

        function U(e, t) {
            e = n(e);
            for (var r, i, a, o, s = e; s && s.tagName && s !== bodyNode && (r = ce(s, "position"), i = ce(s, "overflow"), a = ce(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === i || ("static" === r ? o && "relative" !== o : "fixed" === o));) "none" !== a ? o = void 0 : "static" !== r && "fixed" !== o && (o = r), s = T(s);
            return s
        }

        function F(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; t > r; r++) F(arguments[r]);
            else if (e = n(e), e && e.style) {
                var i = e.olddisplay,
                    a = "block",
                    o = e.tagName.toLowerCase();
                e.style.display = i || "", "none" === ce(e, "display") && (a = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
            }
        }

        function z(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; t > r; r++) z(arguments[r]);
            else if (e = n(e), e && e.style) {
                var i = ce(e, "display");
                e.olddisplay = "none" != i ? i : "", e.style.display = "none"
            }
        }

        function W(e) {
            return e = n(e), e && e.style ? "none" != ce(e, "display") : !1
        }

        function K() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function $(e, t, r) {
            e = n(e), r = r || 0;
            var i = V(e)[1],
                a = G(e)[1],
                o = window,
                s = document.documentElement,
                c = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
                l = n("page_header_cont"),
                d = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                u = vk.staticheader ? Math.max(0, G(l)[1] - d) : G(l)[1];
            if (t) {
                if (d + u + r > i + a) return i + a - d - u - r;
                if (i > d + c - r) return i - d - c + r
            } else {
                if (d + u + r > i) return i - d - u - r;
                if (i + a > d + c - r) return i + a - d - c + r
            }
            return 0
        }

        function Y(e, t) {
            return void 0 === t && (t = !W(e)), t ? F(e) : z(e), t
        }

        function q(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function Q(e, t) {
            var r;
            if (t && "inline" == ce(e, "display")) {
                var n = e.getClientRects();
                r = n && n[0] || e.getBoundingClientRect()
            } else r = e.getBoundingClientRect();
            return r
        }

        function V(e, t) {
            if (e = n(e), !e) return [0, 0];
            var r, i, a = {
                    top: 0,
                    left: 0
                },
                o = e.ownerDocument;
            return o ? (r = o.documentElement, q(e) && (a = Q(e, !0)), i = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [a.left + (t ? 0 : i.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), a.top + (t ? 0 : i.pageYOffset || r.scrollTop) - (r.clientTop || 0)]) : [0, 0]
        }

        function X(e) {
            return null != e && e === e.window
        }

        function G(e, t, r) {
            e = n(e);
            var i, a = [0, 0],
                o = document.documentElement;
            if (t && "border-box" === ce(e, "boxSizing") && (t = !1), e == document) a = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var s = function() {
                    a = q(e) && (i = Q(e, r)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t && each(a, function(t, r) {
                        var n = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(n, function() {
                            a[t] -= parseFloat(ce(e, "padding" + this)) || 0, a[t] -= parseFloat(ce(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (W(e)) s();
                else {
                    var c = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        l = {},
                        d = !1;
                    e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), each(c, function(t, r) {
                        l[t] = e.style[t], e.style[t] = r
                    }), s(), each(c, function(t, r) {
                        e.style[t] = l[t]
                    }), d && (e.style.cssText = d)
                }
            }
            return a
        }

        function J(e) {
            return G(e)[0]
        }

        function Z(e) {
            return G(e)[1]
        }

        function ee(e, t) {
            return e = n(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
        }

        function te(e, t) {
            (e = n(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
        }

        function re(e, t) {
            return setTimeout(te.pbind(e, t), 0)
        }

        function ne(e, t) {
            (e = n(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }

        function ie(e, t) {
            return setTimeout(ne.pbind(e, t), 0)
        }

        function ae(e, t, r) {
            return void 0 === r && (r = !ee(e, t)), (r ? te : ne)(e, t), r
        }

        function oe(e, t, r) {
            return void 0 === r && (r = !ee(e, t)), (r ? re : ie)(e, t), r
        }

        function se(e, t, r) {
            ne(e, t), te(e, r)
        }

        function ce(e, t, r) {
            if (e = n(e), isArray(t)) {
                var i = {};
                return each(t, function(t, r) {
                    i[r] = ce(e, r)
                }), i
            }
            if (!e) return "";
            if (void 0 === r && (r = !0), !r && "opacity" == t && browser.msie) {
                var a = e.style.filter;
                return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!r && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var o, s = document.defaultView || window;
            if (s.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var c = s.getComputedStyle(e, null);
                c && (o = c.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" == t && browser.msie) {
                    var a = e.currentStyle.filter;
                    return a && a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var l = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                o = e.currentStyle[t] || e.currentStyle[l], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, r) {
                    if (!/^\d+(px)?$/i.test(r) && /^\d/.test(r)) {
                        var n = e.style,
                            i = n.left,
                            a = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, n.left = r || 0, o[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = a
                    }
                }), o = o.join(" ")
            }
            if (r && ("width" == t || "height" == t)) {
                var d = G(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                o = (intval(o) ? Math.max(floatval(o), d) : d) + "px"
            }
            return o
        }

        function le(e, t, r) {
            if (e = n(e)) {
                if ("object" == ("undefined" == typeof t ? "undefined" : Oe(t))) return each(t, function(t, r) {
                    le(e, t, r)
                });
                if ("opacity" == t) browser.msie && ((r + "").length ? 1 !== r ? e.style.filter = "alpha(opacity=" + 100 * r + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== r && (e.style.opacity = r);
                else try {
                    var i = "number" == typeof r;
                    i && /height|width/i.test(t) && (r = Math.abs(r)), r = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? r + "px" : r, e.style[t] !== r && (e.style[t] = r)
                } catch (a) {
                    debugLog("setStyle error: ", [t, r], a)
                }
            }
        }

        function de(e, t, r) {
            setTimeout(le.pbind(e, t, r), 0)
        }

        function ue(e, t, r) {
            var i = pe(e, "pseudo-id");
            i || (pe(e, "pseudo-id", i = irand(1e8, 999999999)), te(e, "_pseudo_" + i));
            var a = t + "-style-" + i,
                o = n(a),
                s = "._pseudo_" + i + ":" + t + "{";
            o || (o = headNode.appendChild(f("style", {
                id: a,
                type: "text/css"
            }))), each(r, function(e, t) {
                s += e + ": " + t + " !important;"
            }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
        }

        function pe(e, t, r) {
            if (!e) return !1;
            var n, i = e[vkExpand];
            return i || (i = e[vkExpand] = ++vkUUID), r !== n && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = r), t ? vkCache[i] && vkCache[i][t] : i
        }

        function he(e, t, r) {
            return e = n(e), "undefined" == typeof r ? e.getAttribute(t) : (e.setAttribute(t, r), r)
        }

        function fe(e) {
            for (var t = 0, r = arguments.length; r > t; ++t) {
                var n = arguments[t];
                if (void 0 !== e[n]) try {
                    delete e[n]
                } catch (i) {
                    try {
                        e.removeAttribute(n)
                    } catch (i) {}
                }
            }
        }

        function _e(e, t) {
            var r = e ? e[vkExpand] : !1;
            if (r)
                if (t) {
                    if (vkCache[r]) {
                        delete vkCache[r][t], t = "";
                        var n = 0;
                        for (t in vkCache[r])
                            if ("__elem" !== t) {
                                n++;
                                break
                            }
                        n || _e(e)
                    }
                } else removeEvent(e), fe(e, vkExpand), delete vkCache[r]
        }

        function ge() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var r = n(e[t]);
                r && (_e(r), fe(r, "btnevents"))
            }
        }

        function ve(e, t, r) {
            if (e = n(e), e && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", r || e.innerText || e.textContent);
                else {
                    var i = a("b", e);
                    i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", r || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function me() {
            var e = n("zoom_test_1") || document.body.appendChild(f("div", {
                    id: "zoom_test_1"
                }, {
                    left: "10%",
                    position: "absolute",
                    visibility: "hidden"
                })),
                t = n("zoom_test_2") || document.body.appendChild(f("div", {
                    id: "zoom_test_2"
                }, {
                    left: e.offsetLeft + "px",
                    position: "absolute",
                    visibility: "hidden"
                }));
            return t.offsetLeft / e.offsetLeft
        }

        function ye(e, t, r) {
            return (e = n(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !r && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !r && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
        }

        function be(e, t, r) {
            e = n(e);
            try {
                if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === r || r === !1) && (r = t), e.createTextRange) {
                    var i = e.createTextRange();
                    i.collapse(!0), i.moveEnd("character", r), i.moveStart("character", t), i.select()
                } else e.setSelectionRange && e.setSelectionRange(t, r)
            } catch (a) {}
        }

        function we(e, t, r) {
            for (e = n(e), r = r || 999; e && !t(e);) {
                if (r--, 0 == r) return !1;
                try {
                    if (e = T(e), e == document) break
                } catch (i) {
                    e = !1
                }
            }
            return e
        }

        function Ee(e) {
            return Te ? void 0 : window.document.title = replaceEntities(e)
        }

        function Ce(e) {
            Te = e, e && window.cur && window.cur.destroy.push(function() {
                Ce(!1)
            })
        }
        r.r(t), r.d(t, "ge", function() {
            return n
        }), r.d(t, "geByTag", function() {
            return i
        }), r.d(t, "geByTag1", function() {
            return a
        }), r.d(t, "geByClass", function() {
            return o
        }), r.d(t, "geByClass1", function() {
            return s
        }), r.d(t, "gpeByClass", function() {
            return c
        }), r.d(t, "domQuery", function() {
            return l
        }), r.d(t, "domQuery1", function() {
            return d
        }), r.d(t, "domClosest", function() {
            return u
        }), r.d(t, "domClosestByTag", function() {
            return p
        }), r.d(t, "gpeByTag", function() {
            return h
        }), r.d(t, "ce", function() {
            return f
        }), r.d(t, "re", function() {
            return _
        }), r.d(t, "se", function() {
            return g
        }), r.d(t, "sech", function() {
            return v
        }), r.d(t, "rs", function() {
            return m
        }), r.d(t, "psr", function() {
            return y
        }), r.d(t, "domReplaceEl", function() {
            return b
        }), r.d(t, "domEL", function() {
            return w
        }), r.d(t, "domNS", function() {
            return E
        }), r.d(t, "domPS", function() {
            return C
        }), r.d(t, "domFC", function() {
            return P
        }), r.d(t, "domLC", function() {
            return O
        }), r.d(t, "domPN", function() {
            return T
        }), r.d(t, "domChildren", function() {
            return j
        }), r.d(t, "domInsertBefore", function() {
            return x
        }), r.d(t, "domInsertAfter", function() {
            return S
        }), r.d(t, "domByClass", function() {
            return k
        }), r.d(t, "domData", function() {
            return I
        }), r.d(t, "domChildIndex", function() {
            return L
        }), r.d(t, "domCA", function() {
            return N
        }), r.d(t, "domClosestSibling", function() {
            return A
        }), r.d(t, "matchesSelector", function() {
            return M
        }), r.d(t, "isHover", function() {
            return D
        }), r.d(t, "isAncestor", function() {
            return B
        }), r.d(t, "getScroll", function() {
            return R
        }), r.d(t, "domClosestPositioned", function() {
            return H
        }), r.d(t, "domClosestOverflowHidden", function() {
            return U
        }), r.d(t, "show", function() {
            return F
        }), r.d(t, "hide", function() {
            return z
        }), r.d(t, "isVisible", function() {
            return W
        }), r.d(t, "clientHeight", function() {
            return K
        }), r.d(t, "getClientRectOffsetY", function() {
            return $
        }), r.d(t, "toggle", function() {
            return Y
        }), r.d(t, "boundingRectEnabled", function() {
            return q
        }), r.d(t, "getXYRect", function() {
            return Q
        }), r.d(t, "getXY", function() {
            return V
        }), r.d(t, "isWindow", function() {
            return X
        }), r.d(t, "getSize", function() {
            return G
        }), r.d(t, "getW", function() {
            return J
        }), r.d(t, "getH", function() {
            return Z
        }), r.d(t, "hasClass", function() {
            return ee
        }), r.d(t, "addClass", function() {
            return te
        }), r.d(t, "addClassDelayed", function() {
            return re
        }), r.d(t, "removeClass", function() {
            return ne
        }), r.d(t, "removeClassDelayed", function() {
            return ie
        }), r.d(t, "toggleClass", function() {
            return ae
        }), r.d(t, "toggleClassDelayed", function() {
            return oe
        }), r.d(t, "replaceClass", function() {
            return se
        }), r.d(t, "getStyle", function() {
            return ce
        }), r.d(t, "setStyle", function() {
            return le
        }), r.d(t, "setStyleDelayed", function() {
            return de
        }), r.d(t, "setPseudoStyle", function() {
            return ue
        }), r.d(t, "data", function() {
            return pe
        }), r.d(t, "attr", function() {
            return he
        }), r.d(t, "removeAttr", function() {
            return fe
        }), r.d(t, "removeData", function() {
            return _e
        }), r.d(t, "cleanElems", function() {
            return ge
        }), r.d(t, "setTitle", function() {
            return ve
        }), r.d(t, "getZoom", function() {
            return me
        }), r.d(t, "val", function() {
            return ye
        }), r.d(t, "elfocus", function() {
            return be
        }), r.d(t, "traverseParent", function() {
            return we
        }), r.d(t, "setDocumentTitle", function() {
            return Ee
        }), r.d(t, "lockDocumentTitle", function() {
            return Ce
        });
        var Pe = r(80),
            Oe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
        window.cf = function(e) {
            var t = e.createDocumentFragment(),
                r = e.createElement("div"),
                n = e.createRange && e.createRange();
            return t.appendChild(r), n && n.selectNodeContents(r), n && n.createContextualFragment ? function(t) {
                return t ? n.createContextualFragment(t) : e.createDocumentFragment()
            } : function(t) {
                if (!t) return e.createDocumentFragment();
                r.innerHTML = t;
                for (var n = e.createDocumentFragment(); r.firstChild;) n.appendChild(r.firstChild);
                return n
            }
        }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var r in t)
                    if (void 0 !== e.style[t[r] + "Transform"]) return t[r] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + Object(Pe.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Te = !1;
        window.ge = n, window.geByTag = i, window.geByTag1 = a, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = c, window.domQuery = l, window.domQuery1 = d, window.domClosest = u, window.ce = f, window.re = _, window.se = g, window.sech = v, window.rs = m, window.psr = y, window.domReplaceEl = b, window.domEL = w, window.domNS = E, window.domPS = C, window.domFC = P, window.domLC = O, window.domPN = T, window.domChildren = j, window.domInsertBefore = x, window.domInsertAfter = S, window.domByClass = k, window.domData = I, window.domChildIndex = L, window.domCA = N, window.domClosestSibling = A, window.matchesSelector = M, window.isHover = D, window.isAncestor = B, window.getScroll = R, window.domClosestPositioned = H, window.domClosestOverflowHidden = U, window.show = F, window.hide = z, window.isVisible = W, window.clientHeight = K, window.getClientRectOffsetY = $, window.toggle = Y, window.boundingRectEnabled = q, window.getXYRect = Q, window.getXY = V, window.isWindow = X, window.getSize = G, window.hasClass = ee, window.addClass = te, window.addClassDelayed = re, window.removeClass = ne, window.removeClassDelayed = ie, window.toggleClass = ae, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = ce, window.setStyle = le, window.setStyleDelayed = de, window.setPseudoStyle = ue, window.data = pe, window.attr = he, window.removeAttr = fe, window.removeData = _e, window.cleanElems = ge, window.setTitle = ve, window.getZoom = me, window.val = ye, window.elfocus = be, window.traverseParent = we, window.getH = Z, window.getW = J, window.domClosestByTag = p, window.setDocumentTitle = Ee, window.lockDocumentTitle = Ce
    },
    72: function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            return e ? '<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="' + t + '">\n      <div class="article_ed__caredit_photo" style="background-image: url(' + e + ')"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>' : '<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">' + getLang("pages_article_ed_carousel_add") + "</div>\n    </button>"
        }
        r.r(t);
        var a = r(55),
            o = r(31),
            s = r(44),
            c = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            l = function() {
                function e(t, r, s, l) {
                    var d = this;
                    n(this, e);
                    var u = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                    u += '\n      <div class="article_ed__caredit_header">\n        ' + getLang("pages_article_ed_carousel_title") + '\n        <div class="article_ed__caredit_header_controls">\n          <div class="article_ed__caredit_header_counter"></div>\n          <button class="flat_button article_ed__caredit_save">' + getLang("global_save") + '</button>\n          <button class="flat_button article_ed__caredit_cancel">' + getLang("global_cancel") + "</button>\n        </div>\n      </div>\n    ", u += '\n      <div class="article_ed__caredit_items_wrap">\n        <div class="article_ed__caredit_items">\n    ';
                    var p = r.getMediaId().split(",");
                    p.forEach(function(e) {
                        var t = a["default"].get(e),
                            r = Object(o.getAppropriateImage)(t.sizes, 251),
                            n = c(r, 1),
                            s = n[0];
                        u += i(s, e)
                    }), u += i(), u += "  </div>", u += "</div>", u += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(u), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", function() {
                        showBox("al_photos.php", {
                            to_id: r.getEditor().getArticleOwnerId(),
                            act: "choose_photo",
                            max_files: d._limit - d._medias.length,
                            article: 1
                        }, {
                            cache: 1,
                            stat: ["photos.js", "photos.css", "upload.js"]
                        }), cur.chooseMedia = d.onPhotoAdd.bind(d), cur.showMediaProgress = function() {
                            show(d._els.loading), r.getEditor().setMediaUploadMode(!0)
                        }, cur.choosePhotoUploadedAll = function() {
                            hide(d._els.loading), r.getEditor().setMediaUploadMode(!1)
                        }
                    }), this._els.saveButton.addEventListener("click", function() {
                        re(d._els.editor), s(d._medias.join(","))
                    }), this._onSave = s, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", function(e) {
                        if (hasClass(e.target, "article_ed__caredit_remove")) {
                            var t = gpeByClass("article_ed__caredit_item", e.target);
                            re(t), d._collectMediaIds(), d._initSorter(), d._toggleAddButton(), d._updateCounter()
                        }
                    }), t.appendChild(this._els.editor), setStyle(this._els.itemsWrap, {
                        height: getSize(this._els.itemsWrap)[1]
                    }), this._initSorter(), this._scroll = new uiScroll(this._els.itemsWrap, {
                        global: !0,
                        stopScrollPropagation: !0,
                        stopScrollPropagationAlways: !0,
                        theme: "dark"
                    }), this._limit = l, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
                }
                return e.prototype.cancel = function() {
                    re(this._els.editor), this._onSave(this._originalMedias.join(","))
                }, e.prototype._updateCounter = function() {
                    this._els.counter.innerHTML = langNumeric(this._medias.length, cur.lang.pages_aricle_ed_carousel_counter)
                }, e.prototype._toggleAddButton = function() {
                    toggle(this._els.addButton, this._medias.length < this._limit), this._scroll.update()
                }, e.prototype._collectMediaIds = function() {
                    var e = this;
                    return this._medias = [], each(this._els.items.children, function(t, r) {
                        var n = domData(r, "media-id");
                        n && e._medias.push(n);
                    }), this._medias = this._medias.slice(0, this._limit), this._medias
                }, e.prototype.onPhotoAdd = function(e, t, r, n) {
                    if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                        a["default"].add(t, {
                            size: Object(s.getPhotoSize)(r.editable.sizes),
                            sizes: r.editable.sizes
                        });
                        var l = Object(o.getAppropriateImage)(r.editable.sizes, 251),
                            d = c(l, 1),
                            u = d[0];
                        domInsertBefore(se(i(u, t)), this._els.addButton)
                    }
                    return void 0 === n && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
                }, e.prototype._initSorter = function() {
                    var e = this;
                    return this._sorter ? void this._sorter.update() : void stManager.add(["grid_sorter.js"], function() {
                        e._sorter = new GridSorter(e._els.items, "", {
                            onReorder: function() {
                                e._collectMediaIds()
                            }
                        })
                    })
                }, e
            }();
        t["default"] = l
    },
    80: function(e, t, r) {
        "use strict";

        function n(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function i(e, t) {
            return setTimeout(n(e), t)
        }

        function a(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function o(e, t) {
            return Math.floor(a(e, t))
        }

        function s(e) {
            return "undefined" == typeof e
        }

        function c(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function d(e) {
            return "string" == typeof e
        }

        function u(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function p(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function h() {
            return +new Date
        }

        function f() {
            return window.Image ? new Image : ce("img")
        }

        function _(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function g(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function v(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function m(e) {
            return e === !0 ? 1 : parseInt(e) || 0
        }

        function y(e) {
            return e === !0 ? 1 : parseFloat(e) || 0
        }

        function b(e) {
            return e = m(e), 0 > e ? 0 : e
        }

        function w(e) {
            return !isNaN(e)
        }

        function E(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return t = m(t), t >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function C(e) {
            return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function P(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function O(e) {
            return C(e.replace(/\t/g, "\n"))
        }

        function T(e, t) {
            if (u(e) || "undefined" == typeof e.length) {
                for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r) && t.call(e[r], r, e[r]) === !1) break
            } else
                for (var n = 0, i = e.length; i > n; n++) {
                    var a = e[n];
                    if (t.call(a, n, a) === !1) break
                }
            return e
        }

        function j(e, t, r) {
            for (var n = r || 0, i = (e || []).length; i > n; n++)
                if (e[n] == t) return n;
            return -1
        }

        function x(e, t) {
            return -1 != j(t, e)
        }

        function S(e, t) {
            var r = u(e) || "undefined" == typeof e.length ? {} : [];
            for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === H(e[n]) && "prototype" !== n && null !== e[n] ? r[n] = S(e[n]) : r[n] = e[n]);
            return r
        }

        function k(e) {
            var t, r, n = {},
                i = 1,
                a = arguments.length,
                o = arguments;
            for (t in e) {
                for (r = !1, i = 1; a > i; i++) o[i][t] && o[i][t] == e[t] && (r = !0);
                r || (n[t] = e[t])
            }
            return n
        }

        function I() {
            var e, t = arguments,
                r = t[0] || {},
                n = 1,
                i = t.length,
                a = !1;
            for ("boolean" == typeof r && (a = r, r = t[1] || {}, n = 2), "object" === ("undefined" == typeof r ? "undefined" : H(r)) || c(r) || (r = {}); i > n; ++n)
                if (null != (e = t[n]))
                    for (var o in e) {
                        var s = r[o],
                            l = e[o];
                        r !== l && (a && l && "object" === ("undefined" == typeof l ? "undefined" : H(l)) && !l.nodeType ? r[o] = I(a, s || (null != l.length ? [] : {}), l) : void 0 !== l && (r[o] = l))
                    }
            return r
        }

        function L(e) {
            window.templates = window.templates || {}, I(window.templates, e)
        }

        function N(e, t) {
            var r = window.templates = window.templates || {},
                n = r[e];
            return "function" == typeof n && (n = n()), n && t ? rs(n, t) : n || ""
        }

        function A(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : H(e))) return !1;
            var t = {},
                r = function(t) {
                    return geByTag(t, e)
                },
                n = function(r, n) {
                    if (n.name)
                        if ("text" != n.type && n.type)
                            if (n.getAttribute("bool")) {
                                var i = val(n);
                                if (!i || "0" === i) return;
                                t[n.name] = 1
                            } else t[n.name] = browser.msie && !n.value && e[n.name] ? e[n.name].value : n.value;
                    else t[n.name] = val(n)
                };
            return T(r("input"), function(e, t) {
                return "radio" != t.type && "checkbox" != t.type || t.checked ? n(e, t) : void 0
            }), T(r("select"), n), T(r("textarea"), n), t
        }

        function M(e, t) {
            for (var r, n = t ? F : U, i = []; e && (r = e.match(n));) {
                e = e.substr(r.index + r[0].length);
                var a = 0;
                r[4] || (a = 7), i.push({
                    url: r[2 + a],
                    query: r[5 + a] || "",
                    domain: r[4 + a]
                })
            }
            return i
        }

        function D() {
            return window.devicePixelRatio >= 2
        }

        function B(e) {
            var t = 0,
                r = 0,
                n = e.ownerDocument || e.document,
                i = n.defaultView || n.parentWindow,
                a = i.getSelection();
            if (a.rangeCount > 0) {
                var o = i.getSelection().getRangeAt(0),
                    s = o.cloneRange();
                s.selectNodeContents(e), s.setEnd(o.startContainer, o.startOffset), t = s.toString().length, s.setEnd(o.endContainer, o.endOffset), r = s.toString().length
            }
            return [t, r]
        }
        r.r(t), r.d(t, "vkLocal", function() {
            return n
        }), r.d(t, "lTimeout", function() {
            return i
        }), r.d(t, "rand", function() {
            return a
        }), r.d(t, "irand", function() {
            return o
        }), r.d(t, "isUndefined", function() {
            return s
        }), r.d(t, "isFunction", function() {
            return c
        }), r.d(t, "isArray", function() {
            return l
        }), r.d(t, "isString", function() {
            return d
        }), r.d(t, "isObject", function() {
            return u
        }), r.d(t, "isEmpty", function() {
            return p
        }), r.d(t, "vkNow", function() {
            return h
        }), r.d(t, "vkImage", function() {
            return f
        }), r.d(t, "trim", function() {
            return _
        }), r.d(t, "stripHTML", function() {
            return g
        }), r.d(t, "escapeRE", function() {
            return v
        }), r.d(t, "intval", function() {
            return m
        }), r.d(t, "floatval", function() {
            return y
        }), r.d(t, "positive", function() {
            return b
        }), r.d(t, "isNumeric", function() {
            return w
        }), r.d(t, "winToUtf", function() {
            return E
        }), r.d(t, "replaceEntities", function() {
            return C
        }), r.d(t, "clean", function() {
            return P
        }), r.d(t, "unclean", function() {
            return O
        }), r.d(t, "each", function() {
            return T
        }), r.d(t, "indexOf", function() {
            return j
        }), r.d(t, "inArray", function() {
            return x
        }), r.d(t, "clone", function() {
            return S
        }), r.d(t, "arrayKeyDiff", function() {
            return k
        }), r.d(t, "extend", function() {
            return I
        }), r.d(t, "addTemplates", function() {
            return L
        }), r.d(t, "getTemplate", function() {
            return N
        }), r.d(t, "serializeForm", function() {
            return A
        }), r.d(t, "extractUrls", function() {
            return M
        }), r.d(t, "isRetina", function() {
            return D
        }), r.d(t, "getCaretCharacterOffsetWithin", function() {
            return B
        }), r.d(t, "encodeHtml", function() {
            return K
        }), r.d(t, "decodeHtml", function() {
            return $
        });
        var R = function() {
                function e(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !n && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
        window.PageID = window.PageID || 1;
        var U = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            F = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i,
            z = function() {
                var e = null;
                return [function(t) {
                    return e || (e = se("<span> </span>")), e.innerText = t, e.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
                }, function(t) {
                    return e || (e = se("<span> </span>")), e.innerHTML = t, e.innerText
                }]
            }(),
            W = R(z, 2),
            K = W[0],
            $ = W[1];
        window.isRetina = D, window.extractUrls = M, window.serializeForm = A, window.addTemplates = L, window.getTemplate = N, window.rand = a, window.irand = o, window.isUndefined = s, window.isFunction = c, window.isArray = l, window.isString = d, window.isObject = u, window.isEmpty = p, window.vkNow = h, window.vkImage = f, window.trim = _, window.stripHTML = g, window.escapeRE = v, window.intval = m, window.floatval = y, window.positive = b, window.isNumeric = w, window.winToUtf = E, window.replaceEntities = C, window.clean = P, window.unclean = O, window.each = T, window.indexOf = j, window.inArray = x, window.clone = S, window.arrayKeyDiff = k, window.extend = I, window.vkLocal = n, window.lTimeout = i, window.getCaretCharacterOffsetWithin = B, window.encodeHtml = K, window.decodeHtml = $
    }
});