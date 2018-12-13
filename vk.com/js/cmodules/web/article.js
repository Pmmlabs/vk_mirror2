! function(e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) r.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
        return n
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 28)
}([, , , function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(38),
        i = r(4),
        a = r(31),
        o = r(63),
        s = r(37),
        c = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var l = void 0,
        d = function(e) {
            function t(r, n, i) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var a = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n, !0));
                return a._currentImageIndex = 0, a.paragraph = i, a
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.cancelCarouselEditor = function() {
                this._carouselEditor && this._carouselEditor.cancel()
            }, t.prototype.renderExtraControlsEl = function() {
                var e = this,
                    t = se('\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">' + getLang("pages_article_ed_create_carousel") + '</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    '),
                    r = geByClass1("article_ed__carousel_btn_edit", t),
                    n = geByClass1("article_ed__carousel_nav_btn_left", t),
                    i = geByClass1("article_ed__carousel_nav_btn_right", t),
                    a = function() {
                        var t = e.getMediaIdsCount() > 1;
                        r.innerHTML = t ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                    };
                return a(), r.addEventListener("click", function(r) {
                    var n = e.getEditor();
                    return n.closeAllCarouselEditors(), n._resizeTooltip && n._resizeTooltip.hide(), addClass(e._objectEl, "article_ed__carousel_edit_open"), e._carouselEditor = new o.default(t, e, function(r) {
                        r ? (delete e._fixedImageSize, e.setMediaId(r), e._rerender(), e.getEditor().saveUndoStateAndDraft(), a(), e._setImageIndex(0, t), removeClass(e._objectEl, "article_ed__carousel_edit_open"), delete e._carouselEditor) : e.getEditor().removeObject(e)
                    }, e.getEditor().getLimits().maxCarouselItems), cancelEvent(r)
                }), n.addEventListener("click", function() {
                    e._setImageIndex(e._getImageIndex() - 1, t)
                }), i.addEventListener("click", function() {
                    e._setImageIndex(e._getImageIndex() + 1, t)
                }), this._setImageIndex(0, t), t
            }, t.prototype._getImageIndex = function() {
                return Math.min(this.getMediaIdsCount() - 1, this._currentImageIndex)
            }, t.prototype._setImageIndex = function(e, t) {
                this._currentImageIndex = Math.min(Math.max(0, e), this.getMediaIdsCount());
                var r = geByClass1("article_ed__carousel_nav_btn", t);
                toggleClass(r, "no_left", 0 == this._currentImageIndex), toggleClass(r, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._objectEl, "article__carousel", this._isCarousel());
                var n = geByClass1("article_ed__carousel_counter", t);
                this._isCarousel() ? (setStyle(n, "display", "inline-block"), n.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(n), this._drawImage()
            }, t.prototype._rerender = function() {
                var e = this._el,
                    t = this.render();
                domReplaceEl(e, t)
            }, t.prototype.render = function() {
                this._el = se('\n      <div class="article_ed__img_content">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                var e = a.default.get(i.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
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
                            r = JSON.parse(r), isEmpty(r) ? e._onUploadCallback && e._onUploadCallback() : ajax.post("al_photos.php", extend({
                                act: "choose_uploaded"
                            }, r), {
                                onDone: function(t, r) {
                                    e._mediaId = t, a.default.add(i.ParagraphType.ObjectPhoto, t, {
                                        size: Object(s.getPhotoSize)(r.editable.sizes),
                                        sizes: r.editable.sizes
                                    }), e._drawImage(), e._onUploadCallback && e._onUploadCallback(), e.getEditor().saveUndoStateAndDraft()
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
                    t = a.default.get(i.ParagraphType.ObjectPhoto, this.getMediaId(), this._getImageIndex()),
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
                if (t) {
                    var n = Object(i.getAppropriateImage)(t.sizes, r),
                        o = c(n, 1)[0],
                        s = this._getImageEl(),
                        d = !1;
                    s.onload = function() {
                        clearTimeout(l), d = !0, setStyle(s, "visibility", "visible"), show(s), e.setLoadingState(!1), e._isCarousel() && e._fixSize()
                    }, s.src = o, clearTimeout(l), d || (l = setTimeout(function() {
                        d || (setStyle(s, "visibility", "hidden"), e.setLoadingState(!0, e._isCarousel()))
                    }, 10)), this._updateSize()
                }
            }, t.prototype._isCarousel = function() {
                return this.getMediaIdsCount() > 1
            }, t.prototype._fixSize = function() {
                this._fixedImageSize = getSize(this._el), this._fixedImageSize[0] = Math.ceil(this._fixedImageSize[0]), this._fixedImageSize[1] = Math.ceil(this._fixedImageSize[1]), setStyle(this._el, {
                    height: this._fixedImageSize[1] + "px"
                }), setStyle(this._getImageEl(), {
                    "max-width": this._fixedImageSize[0],
                    "max-height": this._fixedImageSize[1]
                })
            }, t.prototype._isSmallPhotoSize = function() {
                var e = a.default.get(i.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
                return !(!e && !e.size) && e.size[0] >= 720
            }, t
        }(n.default);
    t.default = d
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "ParagraphType", function() {
        return n
    }), r.d(t, "ResizableObjectTypes", function() {
        return i
    }), r.d(t, "ObjectResizeType", function() {
        return a
    }), r.d(t, "getAppropriateImage", function() {
        return s
    }), r.d(t, "preloadImage", function() {
        return l
    }), r.d(t, "mailruStatsPixel", function() {
        return d
    }), r.d(t, "getUrlParam", function() {
        return u
    });
    var n = {
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
            ObjectGIF: 103,
            ObjectAudio: 105
        },
        i = [n.ObjectPhoto, n.ObjectGIF, n.ObjectVideo],
        a = {
            Normal: 0,
            Float: 1,
            Medium: 2,
            Large: 3
        };

    function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments[1];
        for (var r in e)
            if (Object.prototype.hasOwnProperty.call(e, r) && !1 === t.call(e[r], r, e[r])) break;
        return e
    }

    function s(e, t, r) {
        var n = [];
        if (o(e, function(e, t) {
                r && -1 == ["w", "z", "y", "x", "m", "s"].indexOf(e) || n.push(t)
            }), !n.length) return [!1];
        n.sort(function(e, t) {
            return e[1] - t[1]
        }), t *= window.devicePixelRatio >= 2 ? 2 : 1;
        var i = n[n.length - 1];
        return o(n, function(e, r) {
            if (r[1] >= t) return i = r, !1
        }), i
    }
    var c = {};

    function l(e, t) {
        if (!0 === c[e]) return t && t(), !0;
        if (isArray(c[e])) return c[e].push(t), !1;
        c[e] = [t];
        var r = new Image;
        return r.onload = function() {
            var t = c[e];
            c[e] = !0, o(t, function(e, t) {
                t && t()
            })
        }, r.src = e, !1
    }

    function d(e, t) {
        if (isObject(t) && !isEmpty(t)) {
            var r = "https://vk-callback.go.mail.ru/longread_pxl?action=" + e;
            o(t, function(e, t) {
                r += "&" + e + "=" + t
            }), (new Image).src = r
        }
    }

    function u(e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
        return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
    }
}, , , , , , , , , , , function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "KEY", function() {
        return a
    }), r.d(t, "addEvent", function() {
        return o
    }), r.d(t, "removeEvent", function() {
        return s
    }), r.d(t, "triggerEvent", function() {
        return c
    }), r.d(t, "cancelEvent", function() {
        return l
    }), r.d(t, "stopEvent", function() {
        return d
    }), r.d(t, "normEvent", function() {
        return u
    }), r.d(t, "checkEvent", function() {
        return p
    }), r.d(t, "checkKeyboardEvent", function() {
        return h
    }), r.d(t, "checkOver", function() {
        return f
    });
    var n = r(41),
        i = r(30),
        a = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DEL: 8,
            TAB: 9,
            RETURN: 13,
            ENTER: 13,
            ESC: 27,
            PAGEUP: 33,
            PAGEDOWN: 34,
            SPACE: 32,
            CTRL: 17,
            ALT: 18,
            SHIFT: 16
        };

    function o(e, t, r, a, o, s) {
        if ((e = Object(n.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var c, d = o ? ((c = function(e) {
                var t = e.data;
                e.data = o;
                var n = r.apply(this, [e]);
                return e.data = t, n
            }).handler = r, c) : r;
            e.setInterval && e !== window && (e = window);
            var p = Object(n.data)(e, "events") || Object(n.data)(e, "events", {}),
                h = Object(n.data)(e, "handle") || Object(n.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = u(e);
                            var t = Array.from(arguments);
                            t[0] = e;
                            var r = Object(n.data)(this, "events");
                            if (!r || "string" != typeof e.type || !r[e.type] || !r[e.type].length) return;
                            var i = (r[e.type] || []).slice();
                            for (var a in i)
                                if (i.hasOwnProperty(a)) {
                                    if ("mouseover" === e.type || "mouseout" === e.type) {
                                        for (var o = e.relatedElement; o && o !== this;) o = o.parentNode;
                                        if (o === this) continue
                                    }
                                    var s = i[a].apply(this, t);
                                    if (!1 !== s && -1 !== s || l(e), -1 === s) return !1
                                }
                        }).apply(e, arguments)
                    }
                }(e));
            Object(i.each)(t.split(/\s+/), function(t, r) {
                p[r] || (p[r] = [], !a && e.addEventListener ? e.addEventListener(r, h, s) : !a && e.attachEvent && e.attachEvent("on" + r, h)), p[r].push(d)
            })
        }
    }

    function s(e, t, r, a) {
        if (void 0 === a && (a = !1), e = Object(n.ge)(e)) {
            var o = Object(n.data)(e, "events");
            if (o)
                if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, s) {
                    if (Object(i.isArray)(o[s])) {
                        var c = o[s].length;
                        if (Object(i.isFunction)(r)) {
                            for (var l = c - 1; l >= 0; l--)
                                if (o[s][l] && (o[s][l] === r || o[s][l].handler === r)) {
                                    o[s].splice(l, 1), c--;
                                    break
                                }
                        } else {
                            for (var d = 0; d < c; d++) delete o[s][d];
                            c = 0
                        }
                        c || (e.removeEventListener ? e.removeEventListener(s, Object(n.data)(e, "handle"), a) : e.detachEvent && e.detachEvent("on" + s, Object(n.data)(e, "handle")), delete o[s])
                    }
                }), Object(i.isEmpty)(o) && (Object(n.removeData)(e, "events"), Object(n.removeData)(e, "handle"));
                else
                    for (var c in o) o.hasOwnProperty(c) && s(e, c)
        }
    }

    function c(e, t, r, a) {
        e = Object(n.ge)(e);
        var o = Object(n.data)(e, "handle");
        if (o) {
            var s = function() {
                return o.call(e, Object(i.extend)(r || {}, {
                    type: t,
                    target: e
                }))
            };
            a ? s() : setTimeout(s, 0)
        }
    }

    function l(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function d(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function u(e) {
        var t = e = e || window.event;
        if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var r = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r.clientLeft || 0), e.pageY = e.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function p(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
    }

    function h(e) {
        if (!(e = u(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(n.getSize)(e.target),
            r = Object(n.getXY)(e.target),
            i = e.pageX - r[0],
            a = e.pageY - r[1];
        return i < -1 || i > t[0] + 1 || a < -1 || a > t[1] + 1 || Math.abs(e.pageX - r[0] - t[0] / 2) < 1 && Math.abs(e.pageY - r[1] - t[1] / 2) < 1
    }

    function f(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var r = e.fromElement || e.relatedTarget;
        if (!r || r === t || r === t.parentNode) return !0;
        for (; r !== t && r.parentNode && r.parentNode !== bodyNode;) r = r.parentNode;
        return r !== t
    }
    window.KEY = a, window.addEvent = o, window.removeEvent = s, window.triggerEvent = c, window.cancelEvent = l, window.stopEvent = d, window.normEvent = u, window.checkEvent = p, window.checkKeyboardEvent = h, window.checkOver = f
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
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
                    }), (h += t) >= c && (u.push(p), h = t, p = []), p.push(e)
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
    t.default = n
}, , , , , , , , , , , function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "initLimits", function() {
        return a
    }), r.d(t, "checkLimits", function() {
        return o
    });
    var n = r(37),
        i = void 0;

    function a(e) {
        i = e
    }

    function o(e) {
        var t = [];
        e.length > i.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", i.maxParagraphs));
        var r = 0,
            a = 0;
        return e.forEach(function(e) {
            var o = 0;
            e.lines.forEach(function(e) {
                r += e.text.length, o += e.text.length
            }), Object(n.isObjectParagraph)(e) && a++, o > i.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", o).replace("{limit}", i.maxSymbolsPerParagraph))
        }), r > i.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", i.maxSymbols)), a > i.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", i.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
    }
}, function(e, t, r) {
    e.exports = r(54)
}, , function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "vkLocal", function() {
        return s
    }), r.d(t, "lTimeout", function() {
        return c
    }), r.d(t, "rand", function() {
        return l
    }), r.d(t, "irand", function() {
        return d
    }), r.d(t, "isUndefined", function() {
        return u
    }), r.d(t, "isFunction", function() {
        return p
    }), r.d(t, "isArray", function() {
        return h
    }), r.d(t, "isString", function() {
        return f
    }), r.d(t, "isObject", function() {
        return _
    }), r.d(t, "isEmpty", function() {
        return g
    }), r.d(t, "vkNow", function() {
        return v
    }), r.d(t, "vkImage", function() {
        return y
    }), r.d(t, "trim", function() {
        return b
    }), r.d(t, "stripHTML", function() {
        return m
    }), r.d(t, "escapeRE", function() {
        return w
    }), r.d(t, "intval", function() {
        return E
    }), r.d(t, "floatval", function() {
        return O
    }), r.d(t, "positive", function() {
        return P
    }), r.d(t, "isNumeric", function() {
        return C
    }), r.d(t, "winToUtf", function() {
        return j
    }), r.d(t, "replaceEntities", function() {
        return T
    }), r.d(t, "clean", function() {
        return x
    }), r.d(t, "unclean", function() {
        return S
    }), r.d(t, "each", function() {
        return k
    }), r.d(t, "indexOf", function() {
        return I
    }), r.d(t, "inArray", function() {
        return L
    }), r.d(t, "clone", function() {
        return A
    }), r.d(t, "arrayKeyDiff", function() {
        return N
    }), r.d(t, "extend", function() {
        return D
    }), r.d(t, "addTemplates", function() {
        return M
    }), r.d(t, "getTemplate", function() {
        return R
    }), r.d(t, "serializeForm", function() {
        return H
    }), r.d(t, "extractUrls", function() {
        return B
    }), r.d(t, "isRetina", function() {
        return z
    }), r.d(t, "getCaretCharacterOffsetWithin", function() {
        return U
    }), r.d(t, "formatCount", function() {
        return F
    }), r.d(t, "encodeHtml", function() {
        return K
    }), r.d(t, "decodeHtml", function() {
        return V
    });
    var n = r(41),
        i = r(44),
        a = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function s(e) {
        var t = PageID;
        return function() {
            t === PageID && e.apply(this, arguments)
        }
    }

    function c(e, t) {
        return setTimeout(s(e), t)
    }
    window.PageID = window.PageID || 1;
    var l = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        d = function(e, t) {
            return Math.floor(l(e, t))
        },
        u = function(e) {
            return void 0 === e
        },
        p = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        h = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        f = function(e) {
            return "string" == typeof e
        },
        _ = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function g(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var v = function() {
            return +new Date
        },
        y = function() {
            return window.Image ? new Image : ce("img")
        },
        b = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        m = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        w = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function E(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function O(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function P(e) {
        return (e = E(e)) < 0 ? 0 : e
    }

    function C(e) {
        return !isNaN(e)
    }

    function j(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = E(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function T() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(n.se)("<textarea>" + e + "</textarea>").value
    }

    function x(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function S(e) {
        return T(e.replace(/\t/g, "\n"))
    }

    function k(e, t) {
        if (_(e) || void 0 === e.length) {
            for (var r in e)
                if (Object.prototype.hasOwnProperty.call(e, r) && !1 === t.call(e[r], r, e[r])) break
        } else
            for (var n = 0, i = e.length; n < i; n++) {
                var a = e[n];
                if (!1 === t.call(a, n, a)) break
            }
        return e
    }

    function I(e, t, r) {
        for (var n = r || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function L(e, t) {
        return -1 !== I(t, e)
    }

    function A(e, t) {
        var r = _(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === o(e[n]) && "prototype" !== n && null !== e[n] ? r[n] = A(e[n]) : r[n] = e[n]);
        return r
    }

    function N(e) {
        var t = {},
            r = arguments.length,
            n = arguments;
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                for (var a = !1, o = 1; o < r; o++) n[o][i] && n[o][i] === e[i] && (a = !0);
                a || (t[i] = e[i])
            }
        return t
    }

    function D() {
        var e = arguments,
            t = e.length,
            r = e[0] || {},
            n = 1,
            i = !1;
        for ("boolean" == typeof r && (i = r, r = e[1] || {}, n = 2), "object" === (void 0 === r ? "undefined" : o(r)) || p(r) || (r = {}); n < t; n++) {
            var a = e[n];
            if (null != a)
                for (var s in a)
                    if (a.hasOwnProperty(s)) {
                        var c = r[s],
                            l = a[s];
                        r !== l && (i && l && "object" === (void 0 === l ? "undefined" : o(l)) && !l.nodeType ? r[s] = D(i, c || (null != l.length ? [] : {}), l) : void 0 !== l && (r[s] = l))
                    }
        }
        return r
    }

    function M(e) {
        window.templates = window.templates || {}, D(window.templates, e)
    }

    function R(e, t) {
        var r = (window.templates = window.templates || {})[e];
        return "function" == typeof r && (r = r()), r && t ? Object(n.rs)(r, t) : r || ""
    }

    function H(e) {
        if ("object" !== (void 0 === e ? "undefined" : o(e))) return !1;
        var t = {},
            r = function(t) {
                return Object(n.geByTag)(t, e)
            },
            i = function(r, i) {
                if (i.name)
                    if ("text" !== i.type && i.type)
                        if (i.getAttribute("bool")) {
                            var a = Object(n.val)(i);
                            if (!a || "0" === a) return;
                            t[i.name] = 1
                        } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                else t[i.name] = Object(n.val)(i)
            };
        return k(r("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
        }), k(r("select"), i), k(r("textarea"), i), t
    }

    function B(e, t) {
        for (var r = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, n = void 0, i = []; e && (n = e.match(r));) {
            e = e.substr(n.index + n[0].length);
            var a = 0;
            n[4] || (a = 7), i.push({
                url: n[2 + a],
                query: n[5 + a] || "",
                domain: n[4 + a]
            })
        }
        return i
    }
    var z = function() {
        return window.devicePixelRatio >= 2
    };

    function U(e) {
        var t = 0,
            r = 0,
            n = e.ownerDocument || e.document,
            i = n.defaultView || n.parentWindow;
        if (i.getSelection().rangeCount > 0) {
            var a = i.getSelection().getRangeAt(0),
                o = a.cloneRange();
            o.selectNodeContents(e), o.setEnd(a.startContainer, a.startOffset), t = o.toString().length, o.setEnd(a.endContainer, a.endOffset), r = o.toString().length
        }
        return [t, r]
    }

    function F(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? F(e = (e = E(e / 1e5)) > 1e3 ? E(e / 10) : e / 10, D(t, {
            noCheck: !0
        }), !0) + "M" : e >= r && !t.noCheck ? F(e = (e = E(e / 100)) > 100 ? E(e / 10) : e / 10, D(t, {
            noCheck: !0
        }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var W, Y = a((W = null, [function(e) {
            return W || (W = Object(n.se)("<span> </span>")), W.innerText = e, W.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return W || (W = Object(n.se)("<span> </span>")), W.innerHTML = e, W.innerText
        }]), 2),
        K = Y[0],
        V = Y[1];
    window.isRetina = z, window.extractUrls = B, window.serializeForm = H, window.addTemplates = M, window.getTemplate = R, window.rand = l, window.irand = d, window.isUndefined = u, window.isFunction = p, window.isArray = h, window.isString = f, window.isObject = _, window.isEmpty = g, window.vkNow = v, window.vkImage = y, window.trim = b, window.stripHTML = m, window.escapeRE = w, window.intval = E, window.floatval = O, window.positive = P, window.isNumeric = C, window.winToUtf = j, window.replaceEntities = T, window.clean = x, window.unclean = S, window.each = k, window.indexOf = I, window.inArray = L, window.clone = A, window.arrayKeyDiff = N, window.extend = D, window.vkLocal = s, window.lTimeout = c, window.getCaretCharacterOffsetWithin = U, window.formatCount = F, window.encodeHtml = K, window.decodeHtml = V
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = {};

    function i(e) {
        return (e = e.split("_"))[0] + "_" + e[1]
    }
    var a = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        return e.add = function(e, t, r) {
            n[e] = n[e] || {}, n[e][i(t)] = r
        }, e.get = function(e, t, r) {
            return void 0 !== r && (t = (t = t.split(","))[r]), n[e] = n[e] || {}, n[e][i(t)]
        }, e
    }();
    t.default = a
}, , , , , function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "getCleanedState", function() {
        return o
    }), r.d(t, "expandParagraphFields", function() {
        return s
    });
    var n = r(4),
        i = r(37);

    function a(e) {
        return JSON.parse(JSON.stringify(e))
    }

    function o(e, t, r) {
        var o = [];
        return e.forEach(function(e, s) {
            if (!r || Object(i.isObjectParagraph)(e) || !Object(i.isParagraphEmpty)(e) || 0 == s || e.type == n.ParagraphType.Code) {
                var c = {};
                for (var l in e) {
                    if (!e.hasOwnProperty(l)) return;
                    if (!l.startsWith("_") || "_uuid" === l && t) {
                        var d = e[l];
                        c[l] = isObject(d) || isArray(d) ? a(d) : d
                    }
                }
                Object(i.isObjectParagraph)(e) && e._object && (c.mediaId = e._object.getMediaId()), e.sep && (c.sep = 1), c.type == n.ParagraphType.Text && delete c.type, c.lines.forEach(function(e) {
                    if (void 0 !== e.decorations) {
                        var t = !0;
                        each(e.decorations, function(r, n) {
                            0 == n.length ? delete e.decorations[r] : t = !1
                        }), t && delete e.decorations
                    }
                    e.brs && 0 == e.brs.length && delete e.brs
                }), o.push(c)
            }
        }), a(o)
    }

    function s(e) {
        return e.forEach(function(e) {
            e.type = e.type || n.ParagraphType.Text, e.lines.forEach(function(e) {
                e.brs = e.brs || [], e.decorations = e.decorations || {}
            })
        }), e
    }
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "NBSP", function() {
        return a
    }), r.d(t, "CURSOR_MARKER_START", function() {
        return o
    }), r.d(t, "CURSOR_MARKER_END", function() {
        return s
    }), r.d(t, "ArticleEditorParagraphClass", function() {
        return c
    }), r.d(t, "replaceParagraphEntities", function() {
        return l
    }), r.d(t, "isQuoteEl", function() {
        return d
    }), r.d(t, "paragraphElProperties", function() {
        return u
    }), r.d(t, "deb", function() {
        return p
    }), r.d(t, "isParagraphEl", function() {
        return h
    }), r.d(t, "selectEl", function() {
        return f
    }), r.d(t, "focusEl", function() {
        return _
    }), r.d(t, "isBR", function() {
        return g
    }), r.d(t, "prepareLineText", function() {
        return v
    }), r.d(t, "getElementIndex", function() {
        return y
    }), r.d(t, "isObjectParagraphEl", function() {
        return b
    }), r.d(t, "isObjectParagraph", function() {
        return m
    }), r.d(t, "isObjectResize", function() {
        return w
    }), r.d(t, "hasSeparator", function() {
        return E
    }), r.d(t, "genSepatorId", function() {
        return P
    }), r.d(t, "isHeaderParagraph", function() {
        return C
    }), r.d(t, "isListParagraph", function() {
        return j
    }), r.d(t, "buildParagraph", function() {
        return T
    }), r.d(t, "convertBRsToArray", function() {
        return x
    }), r.d(t, "getRange", function() {
        return S
    }), r.d(t, "prepareSpacesWithSpaces", function() {
        return k
    }), r.d(t, "cleanTextSpaces", function() {
        return I
    }), r.d(t, "mergeRanges", function() {
        return L
    }), r.d(t, "isWhiteSpaceChar", function() {
        return A
    }), r.d(t, "isCyrillicChar", function() {
        return D
    }), r.d(t, "isLatinChar", function() {
        return M
    }), r.d(t, "isAlienParagraphEl", function() {
        return R
    }), r.d(t, "getFocusedElement", function() {
        return H
    }), r.d(t, "getPhotoSize", function() {
        return B
    }), r.d(t, "childNodeIndex", function() {
        return z
    }), r.d(t, "generateLatinizedName", function() {
        return F
    }), r.d(t, "dataURItoBlob", function() {
        return W
    }), r.d(t, "imageToBlob", function() {
        return Y
    }), r.d(t, "queuePhotoProcess", function() {
        return q
    }), r.d(t, "justCursorInString", function() {
        return G
    }), r.d(t, "isParagraphEmpty", function() {
        return X
    }), r.d(t, "arrayUnique", function() {
        return Q
    }), r.d(t, "decorationsSlice", function() {
        return J
    }), r.d(t, "cleanLineBRs", function() {
        return Z
    }), r.d(t, "cleanBRs", function() {
        return ee
    }), r.d(t, "createParagraphEl", function() {
        return te
    }), r.d(t, "traverseTree", function() {
        return re
    }), r.d(t, "throttle", function() {
        return ne
    }), r.d(t, "isPublishNameCorrect", function() {
        return ie
    }), r.d(t, "correctRealIndexes", function() {
        return oe
    }), r.d(t, "isVKUrl", function() {
        return ce
    }), r.d(t, "decodeURL", function() {
        return le
    }), r.d(t, "BlockElements", function() {
        return de
    }), r.d(t, "hasBlockElements", function() {
        return ue
    });
    var n = r(4),
        i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = "&nbsp;",
        o = "​",
        s = "‌",
        c = "_article_paragraph";

    function l(e) {
        return se("<textarea>" + (e || "") + "</textarea>").value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function d(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && inArray(e.tagName.toLowerCase(), ["cite", "blockquote"])
    }

    function u(e) {
        return [domData(e, "type"), domData(e, "uuid"), domData(e, "mode")]
    }

    function p(e, t) {
        cur[e] = cur[e] || 0, void 0 === t ? console.log(e, cur[e]) : cur[e], cur[e]++
    }

    function h(e) {
        return e && hasClass(e, "_article_paragraph")
    }

    function f(e) {
        if (e) try {
            var t = document.createRange();
            t.selectNodeContents(e);
            var r = window.getSelection();
            r.removeAllRanges(), r.addRange(t)
        } catch (e) {}
    }

    function _(e, t) {
        if (e) try {
            var r = document.createRange();
            t ? (r.selectNodeContents(e), r.collapse(!1)) : (r.setStart(e, 0), r.setEnd(e, 0));
            var n = window.getSelection();
            n.removeAllRanges(), n.addRange(r)
        } catch (e) {}
    }

    function g(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && "BR" == e.tagName
    }

    function v(e, t, r, n) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        if (e = e.substring(t, r), n && n.length) {
            var a = [],
                o = 0;
            n.forEach(function(r) {
                if (!((r -= t) <= 0 || r > e.length)) {
                    var n = e.substring(o, r) + "<br/>";
                    n = i ? n : k(n), a.push(n), o = r
                }
            });
            var s = e.substring(o);
            a.push(i ? s : k(s));
            a[a.length - 1];
            return a.join("")
        }
        return i ? e : k(e)
    }

    function y(e) {
        if (!e) return !1;
        for (var t = 0; null != (e = e.previousSibling);) t++;
        return t
    }

    function b(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
    }

    function m(e) {
        return e && e.type && e.type >= 100
    }

    function w(e) {
        return e && e.mode
    }

    function E(e) {
        return e && e.sep
    }
    var O = 0;

    function P() {
        return ++O
    }

    function C(e) {
        var t = void 0;
        return t = isObject(e) ? e.type : e, inArray(t, [n.ParagraphType.Header1, n.ParagraphType.Header2, n.ParagraphType.Header3])
    }

    function j(e) {
        return e && (e.type == n.ParagraphType.NumericList || e.type == n.ParagraphType.BulletList)
    }

    function T(e) {
        var t = {};
        return m(e = e || {}) && (t._uuid = e._uuid), t.lines = e.lines || [{
            text: "",
            decorations: {},
            brs: []
        }], t.type = e.type ? parseInt(e.type) : n.ParagraphType.Text, e.mediaId && (t.mediaId = e.mediaId), e.sep && (t.sep = e.sep), e.fromExtPage && (t.fromExtPage = e.fromExtPage), t
    }

    function x(e) {
        if (isArray(e)) return e;
        var t = [];
        return each(e, function(e, r) {
            t.push(intval(r))
        }), t.sort(), t
    }

    function S() {
        var e = window.getSelection();
        return e.rangeCount ? [e.getRangeAt(0), e.isCollapsed, e] : [!1]
    }

    function k(e) {
        return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + a), e
    }

    function I(e) {
        return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
    }

    function L(e) {
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

    function A(e) {
        return /\s/.test(e)
    }
    var N = /[\u0400-\u04FF]/;

    function D(e) {
        return N.test(e)
    }

    function M(e) {
        return /[a-zA-Z]/.test(e)
    }

    function R(e) {
        return !hasClass(e, c)
    }

    function H() {
        return window.getSelection().focusNode
    }

    function B(e) {
        var t = [];
        each(e, function(e, r) {
            t.push(r)
        });
        var r = t.sort(function(e, t) {
            return t[1] - e[1]
        })[0];
        return [r[1], r[2]]
    }

    function z(e) {
        for (var t = e.parentNode, r = 0; r < t.childNodes.length; r++)
            if (e == t.childNodes[r]) return r;
        return -1
    }
    var U = {
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
    };

    function F(e, t) {
        e = e.toLowerCase();
        for (var r = "", n = !1, i = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), a = 0; a < e.length; a++)
            if (/\s/.test(e[a])) n || (r += "-", n = !0);
            else if (inArray(e[a], i)) r += e[a], n = !1;
        else {
            var o = U[e.charCodeAt(a)];
            o && (r += o, n = !1)
        }
        return r = (r = r.substr(0, t)).replace(/-*$/, "").replace(/^-*/, "").replace(/-+/g, "-")
    }

    function W(e) {
        var t, r = void 0,
            n = void 0;
        r = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), t = e.split(",")[0].split(":")[1].split(";")[0], n = new Uint8Array(r.length);
        for (var i = 0; i < r.length; i++) n[i] = r.charCodeAt(i);
        return new Blob([n], {
            type: t
        })
    }

    function Y(e, t, r) {
        var n = void 0;
        if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
        if ("object" === (void 0 === e ? "undefined" : i(e)) && "img" === e.tagName.toLowerCase() && (n = e.src), "string" == typeof e && (n = e), !/^data:/.test(n) || t.convert) {
            var a, o = {
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                svg: "image/svg+xml"
            };
            t.type = o[t.type] || ((a = n) ? o[a.split("?").shift().split(".").pop()] : null), t.src = n, t.callback = r, t.name = n, t.type ? function(e, t) {
                var r = document.createElement("canvas"),
                    n = document.createElement("img");
                n.onload = function() {
                    var e = r.getContext("2d");
                    r.width = n.width, r.height = n.height, e.drawImage(n, 0, 0), t(null, r.toDataURL("image/png"))
                }, n.addEventListener("error", function() {
                    t(new Error("FailedToLoadImage"))
                }), r.getContext ? (n.crossOrigin = "anonymous", n.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
            }(n, function(e, t, r) {
                if (t) return void e.callback(t);
                var n = W(r);
                n.name = n.filename = e.name, e.callback(null, n)
            }.bind(null, t)) : r(new Error("Image type is not supported"))
        } else r(null, W(n))
    }
    var K = [],
        V = 0,
        $ = 2;

    function q(e, t) {
        K.push({
                src: e,
                cb: t
            }),
            function e() {
                if (0 != K.length && V != $) {
                    V++;
                    var t = K.shift(),
                        r = new Image;
                    r.addEventListener("error", function() {
                        t.cb(!0, !1, function() {
                            V--, e()
                        })
                    }), r.addEventListener("load", function() {
                        Y(r, {}, function(r, n) {
                            t.cb(r, n, function() {
                                V--, e()
                            })
                        })
                    }), r.src = t.src
                }
            }()
    }

    function G(e) {
        return 1 == (e = trim(e)).length && e[0] == o
    }

    function X(e, t) {
        if (!e) return !0;
        if (m(e)) return !1;
        var r = e.lines;
        return 0 == r.length || !(t ? trim(r[0].text) : r[0].text)
    }

    function Q(e) {
        return e.filter(function(e, t, r) {
            return r.indexOf(e) === t
        })
    }

    function J(e, t, r) {
        var n = {};
        for (var i in e) e.hasOwnProperty(i) && function() {
            var a = [];
            e[i].forEach(function(e) {
                t < e[1] && e[0] <= r && a.push([Math.max(e[0], t) - t, Math.min(r, e[1]) - t, e[2]])
            }), n[i] = a
        }();
        return n
    }

    function Z(e) {
        e.brs = Q(e.brs), e.brs[e.brs.length - 1] == e.text.length && e.brs.pop()
    }

    function ee(e, t) {
        var r = e.length;
        return 1 == r && e[r - 1] == t ? e.pop() : r > 1 && e[r - 1] == t && e[r - 2] != t && e.pop(), e
    }

    function te() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments[1] ? 'data-sep="' + P() + '"' : "";
        return se('<p class="' + c + '" ' + t + ">" + e + "</p>")
    }

    function re(e, t) {
        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            n = t(e, !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]);
        if (void 0 !== n) return n;
        for (var i = Array.prototype.slice.call(r ? e.children : e.childNodes), a = void 0; a = i.shift();) {
            var o = re(a, t, r, !1);
            if (void 0 !== o) return o
        }
    }

    function ne(e, t, r) {
        var n = void 0,
            i = void 0,
            a = void 0,
            o = null,
            s = 0;
        r || (r = {});
        var c = function() {
            s = !1 === r.leading ? 0 : Date.now(), o = null, a = e.apply(n, i), o || (n = i = null)
        };
        return function() {
            var l = Date.now();
            s || !1 !== r.leading || (s = l);
            var d = t - (l - s);
            return n = this, i = arguments, d <= 0 || d > t ? (o && (clearTimeout(o), o = null), s = l, a = e.apply(n, i), o || (n = i = null)) : o || !1 === r.trailing || (o = setTimeout(c, d)), a
        }
    }

    function ie(e) {
        return !!/^[a-z0-9\-]+$/.test(e) && (-1 == e.indexOf("--") && ("-" != e[0] && "-" != e[e.length - 1] && !(e.length > 60)))
    }

    function ae(e, t, r) {
        e.decorations && each(e.decorations, function(e, n) {
            n.forEach(function(e) {
                e[0] > t && (e[0] += r), e[1] > t && (e[1] += r)
            })
        }), e.brs && e.brs.forEach(function(r, n) {
            r > t && (e.brs[n] -= 1)
        })
    }

    function oe(e, t) {
        e.forEach(function(e) {
            e.lines.forEach(function(e) {
                for (var r = 0, n = e.text.length; r < n; r++) {
                    var i = e.text.charCodeAt(r);
                    i >= 55296 && i <= 56319 && (ae(e, r, t), r += 1)
                }
            })
        })
    }

    function ce(e) {
        return /^(https?:\/\/)?([a-z0-9_\-.]+\.)?vk.com(\/.*)?/.test(e)
    }

    function le(e) {
        var t = e;
        try {
            t = decodeURIComponent(e)
        } catch (r) {
            t = e
        }
        return t
    }
    var de = "div p footer form h1 h2 h3 h4 h5 h6 header hgroup hr main nav output pre section table tfoot address article aside blockquote canvas dd dl dt fieldset figcaption figure".toUpperCase().split(" ");

    function ue(e) {
        for (var t = 0, r = e.children.length; t < r; t++)
            if (de.indexOf(e.children[t].tagName) >= 0) return !0;
        return !1
    }
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(37),
        i = (r(4), function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }());
    var a = window.browser && (browser.mozilla || browser.safari),
        o = void 0,
        s = function() {
            function e(t, r, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._mediaId = t, this._editor = r, this._highlighted = !1, this._isCaptioned = !!n, o = this.getEditor().getOptions().multiMediasSeparator
            }
            return e.prototype.isCaptioned = function() {
                return this._isCaptioned
            }, e.prototype.getEditor = function() {
                return this._editor
            }, e.prototype.getMediaIdsCount = function() {
                return this._mediaId.split(o).length
            }, e.prototype.getMediaId = function(e) {
                return void 0 !== e ? this._mediaId.split(o)[e] : this._mediaId
            }, e.prototype.setMediaId = function(e) {
                this._mediaId = e
            }, e.prototype.highlight = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (e != this._highlighted) {
                    this._highlighted = e;
                    var r = this.el();
                    if (e) {
                        var i = getSize(r),
                            a = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>');
                        setStyle(a, {
                            width: i[0] + 0,
                            height: i[1] + 0
                        }), addClass(r, "article_ed__object_highlighted")
                    } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted");
                    if (this._isCaptioned)
                        if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || Object(n.focusEl)(this._getCaptionEl());
                        else {
                            var o = this.isEmptyCaption();
                            this._toggleCaptionPlaceholder(o), this._toggleCaption(!o)
                        }
                }
            }, e.prototype.render = function() {}, e.prototype.el = function() {
                var e = this;
                if (!this._objectEl) {
                    var t = this.render();
                    addClass(t, "article_object_el"), t.setAttribute("contenteditable", "false");
                    var r = this.getEditor().isLocked() ? "false" : "true",
                        i = browser.mozilla ? 'contenteditable="' + r + '"' : 'contenteditable="false"';
                    this._objectEl = se("<figure " + i + "></figure>");
                    var o = this.renderExtraControlsEl();
                    if (o) {
                        var s = se('<div class="article_ed__img_wrapper"></div>'),
                            c = se('<div class="article_ed__img_inner"></div>');
                        o.setAttribute("contenteditable", "false"), addClass(o, "article_ed__extra_controls"), c.appendChild(t), c.appendChild(o), s.appendChild(c), this._objectEl.appendChild(s)
                    } else this._objectEl.appendChild(t);
                    this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="' + r + '"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), a && t.addEventListener("click", function() {
                        e.highlight(!0), Object(n.focusEl)(t)
                    })
                }
                return this._setLoadingEl(), this._objectEl
            }, e.prototype.renderExtraControlsEl = function() {
                return !1
            }, e.prototype.setLoadingState = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                !!this._isLoading != e && (this._isLoading = e, this._setLoadingEl(t), toggleClass(this._objectEl, "article_ed__object_loading", e), e || this.getEditor().onObjectStateLoaded(this))
            }, e.prototype.isLoading = function() {
                return !!this._isLoading
            }, e.prototype._setLoadingEl = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (this._objectEl) {
                    if (re(geByClass1("article_ed___object_loading_placeholder", this._objectEl)), this._isLoading) {
                        var t = se('<div class="article_ed___object_loading_placeholder"></div>');
                        toggleClass(t, "article_ed__object_loading_white", e), domInsertBefore(t, this._objectEl.firstChild)
                    }
                    toggleClass(this._objectEl, "article_ed___object_loading", !!this._isLoading)
                }
            }, e.prototype.getCaptionEl = function() {
                return !!this._isCaptioned && this._getCaptionEl()
            }, e.prototype.isCaptionFocused = function() {
                return !!this._isCaptioned && this._isFocusInCaption()
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
                void 0 !== this._captionPlaceholderShown && this._captionPlaceholderShown === e || (this._captionPlaceholderShown = toggle(geByClass1("article_ed__caption_placeholder", this._captionEl), e))
            }, e.prototype._isFocusInCaption = function() {
                var e = this,
                    t = Object(n.getRange)(),
                    r = i(t, 2),
                    a = r[0],
                    o = function(t) {
                        return !!traverseParent(t, function(t) {
                            return t == e._captionEl
                        }, 10)
                    };
                if (r[1]) return o(a.startContainer);
                var s = o(a.startContainer),
                    c = o(a.endContainer);
                return s && c
            }, e
        }();
    t.default = s
}, , function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(38),
        i = r(31),
        a = r(4),
        o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var s = function(e) {
        function t(r, n) {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n, !0))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), t.prototype.render = function() {
            var e = this;
            this._el = se('\n      <div class="article_object_audio"></div>\n    ');
            var t = i.default.get(a.ParagraphType.ObjectAudioPlaylist, this.getMediaId());
            if (t.snippet) this._el.innerHTML = t.snippet;
            else {
                var r = this.getMediaId().split("_"),
                    n = o(r, 2),
                    s = n[0],
                    c = n[1];
                this.setLoadingState(!0), ajax.post("al_articles.php", {
                    act: "get_audioplaylist_snippet",
                    pl_owner_id: s,
                    pl_id: c,
                    pl_access_hash: t.accessHash
                }, {
                    onDone: function(t) {
                        e.setLoadingState(!1), e._el.innerHTML = t
                    }
                })
            }
            return this._el.appendChild(se('<div class="article_ed__audioplaylist_play_note" contenteditable="false">' + getLang("pages_articles_editor_audio_play_note") + "</div>")), this._el
        }, t
    }(n.default);
    t.default = s
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "ge", function() {
        return a
    }), r.d(t, "geByTag", function() {
        return o
    }), r.d(t, "geByTag1", function() {
        return s
    }), r.d(t, "geByClass", function() {
        return c
    }), r.d(t, "geByClass1", function() {
        return l
    }), r.d(t, "gpeByClass", function() {
        return d
    }), r.d(t, "domQuery", function() {
        return u
    }), r.d(t, "domQuery1", function() {
        return p
    }), r.d(t, "domClosest", function() {
        return h
    }), r.d(t, "domClosestByTag", function() {
        return f
    }), r.d(t, "gpeByTag", function() {
        return _
    }), r.d(t, "ce", function() {
        return g
    }), r.d(t, "re", function() {
        return E
    }), r.d(t, "se", function() {
        return O
    }), r.d(t, "sech", function() {
        return P
    }), r.d(t, "rs", function() {
        return C
    }), r.d(t, "psr", function() {
        return j
    }), r.d(t, "domReplaceEl", function() {
        return T
    }), r.d(t, "domEL", function() {
        return x
    }), r.d(t, "domNS", function() {
        return S
    }), r.d(t, "domPS", function() {
        return k
    }), r.d(t, "domFC", function() {
        return I
    }), r.d(t, "domLC", function() {
        return L
    }), r.d(t, "domPN", function() {
        return A
    }), r.d(t, "domChildren", function() {
        return N
    }), r.d(t, "domInsertBefore", function() {
        return D
    }), r.d(t, "domInsertAfter", function() {
        return M
    }), r.d(t, "domByClass", function() {
        return R
    }), r.d(t, "domData", function() {
        return H
    }), r.d(t, "domChildIndex", function() {
        return B
    }), r.d(t, "domCA", function() {
        return z
    }), r.d(t, "domClosestSibling", function() {
        return U
    }), r.d(t, "matchesSelector", function() {
        return F
    }), r.d(t, "isHover", function() {
        return W
    }), r.d(t, "isAncestor", function() {
        return Y
    }), r.d(t, "getScroll", function() {
        return K
    }), r.d(t, "domClosestPositioned", function() {
        return V
    }), r.d(t, "domClosestOverflowHidden", function() {
        return $
    }), r.d(t, "show", function() {
        return q
    }), r.d(t, "hide", function() {
        return G
    }), r.d(t, "isVisible", function() {
        return X
    }), r.d(t, "clientHeight", function() {
        return Q
    }), r.d(t, "getClientRectOffsetY", function() {
        return J
    }), r.d(t, "toggle", function() {
        return Z
    }), r.d(t, "boundingRectEnabled", function() {
        return ee
    }), r.d(t, "getXYRect", function() {
        return te
    }), r.d(t, "getXY", function() {
        return re
    }), r.d(t, "isWindow", function() {
        return ne
    }), r.d(t, "getSize", function() {
        return ie
    }), r.d(t, "getW", function() {
        return ae
    }), r.d(t, "getH", function() {
        return oe
    }), r.d(t, "hasClass", function() {
        return se
    }), r.d(t, "addClass", function() {
        return ce
    }), r.d(t, "addClassDelayed", function() {
        return le
    }), r.d(t, "removeClass", function() {
        return de
    }), r.d(t, "removeClassDelayed", function() {
        return ue
    }), r.d(t, "toggleClass", function() {
        return pe
    }), r.d(t, "toggleClassDelayed", function() {
        return he
    }), r.d(t, "replaceClass", function() {
        return fe
    }), r.d(t, "getStyle", function() {
        return _e
    }), r.d(t, "setStyle", function() {
        return ge
    }), r.d(t, "setStyleDelayed", function() {
        return ve
    }), r.d(t, "setPseudoStyle", function() {
        return ye
    }), r.d(t, "data", function() {
        return be
    }), r.d(t, "attr", function() {
        return me
    }), r.d(t, "removeAttr", function() {
        return we
    }), r.d(t, "removeData", function() {
        return Ee
    }), r.d(t, "cleanElems", function() {
        return Oe
    }), r.d(t, "setTitle", function() {
        return Pe
    }), r.d(t, "getZoom", function() {
        return Ce
    }), r.d(t, "val", function() {
        return je
    }), r.d(t, "elfocus", function() {
        return Te
    }), r.d(t, "traverseParent", function() {
        return xe
    }), r.d(t, "setDocumentTitle", function() {
        return ke
    }), r.d(t, "lockDocumentTitle", function() {
        return Ie
    }), r.d(t, "initDomScripts", function() {
        return Le
    });
    var n = r(30),
        i = r(15),
        a = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function o(e, t) {
        return (t = a(t) || document).getElementsByTagName(e)
    }

    function s(e, t) {
        return (t = a(t) || document).querySelector && t.querySelector(e) || o(e, t)[0]
    }

    function c(e, t, r) {
        return t = a(t) || document, r = r || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(r + e))
    }

    function l(e, t, r) {
        return t = a(t) || document, r = r || "*", t.querySelector && t.querySelector(r + ("." + e).replace(/\s+/gm, ".")) || c(e, t, r)[0]
    }

    function d(e, t, r) {
        if (!(t = a(t))) return null;
        for (; r !== t && (t = t.parentNode);)
            if (se(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function p(e, t) {
        return (t || document).querySelector(e)
    }

    function h(e, t) {
        return se(t, e) ? t : d(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : _(e, t)
    }

    function _(e, t) {
        if (!(t = a(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function g(e, t, r) {
        var i = document.createElement(e);
        return t && Object(n.extend)(i, t), r && ge(i, r), i
    }
    var v, y, b, m, w = (v = document, y = v.createDocumentFragment(), b = v.createElement("div"), m = v.createRange && v.createRange(), y.appendChild(b), m && m.selectNodeContents(b), m && m.createContextualFragment ? function(e) {
        return e ? m.createContextualFragment(e) : v.createDocumentFragment()
    } : function(e) {
        if (!e) return v.createDocumentFragment();
        b.innerHTML = e;
        for (var t = v.createDocumentFragment(); b.firstChild;) t.appendChild(b.firstChild);
        return t
    });

    function E(e) {
        return (e = a(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var O = function(e) {
            return I(g("div", {
                innerHTML: e
            }))
        },
        P = function(e) {
            return N(g("div", {
                innerHTML: e
            }))
        };

    function C(e, t) {
        return Object(n.each)(t, function(t, r) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === r ? "" : r).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function j(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function T(e, t) {
        return Object(n.isString)(t) && (t = O(t)), A(e).replaceChild(t, e), t
    }

    function x(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var S = function(e) {
            return x((e || {}).nextSibling)
        },
        k = function(e) {
            return x((e || {}).previousSibling, 1)
        },
        I = function(e) {
            return x((e || {}).firstChild)
        },
        L = function(e) {
            return x((e || {}).lastChild, 1)
        },
        A = function(e) {
            return (e || {}).parentNode
        };

    function N(e) {
        for (var t = [], r = e.childNodes, n = 0; n < r.length; n++) r[n].tagName && t.push(r[n]);
        return t
    }

    function D(e, t) {
        var r = A(t);
        return r && r.insertBefore(e, t)
    }

    function M(e, t) {
        var r = A(t);
        return r && r.insertBefore(e, S(t))
    }

    function R(e, t) {
        return e ? l(t, e) : e
    }

    function H(e, t, r) {
        return e ? void 0 !== r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
    }

    function B(e) {
        for (var t = 0; null != (e = k(e));) t++;
        return t
    }

    function z(e, t) {
        do {
            e = A(e)
        } while (e && !F(e, t));
        return e
    }

    function U(e, t, r) {
        for (var n = null; null === n && e;)(e = -1 === r ? k(e) : S(e)) && F(e, t) && (n = e);
        return n
    }

    function F(e, t) {
        return !(!(e = a(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t.item(r) !== this;);
            return r > -1
        }).call(e, t)
    }

    function W(e) {
        return F(e, ":hover")
    }

    function Y(e, t) {
        var r = a(e);
        if (t = a(t), !e || !t) return !1;
        for (; r = r.parentNode;)
            if (r === t) return !0;
        return !1
    }

    function K() {
        var e = browser.msie6 ? a("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function V(e, t) {
        for (var r = (t = t || {}).fromEl || A(e), i = t.positions || ["relative", "absolute", "fixed"]; r && r !== bodyNode;) {
            var a = _e(r, "position");
            if (Object(n.inArray)(a, i) && (!t.noOverflow || "hidden" !== _e(r, "overflow"))) break;
            r = A(r)
        }
        return r
    }

    function $(e, t) {
        for (var r = e = a(e), n = void 0, i = void 0, o = void 0, s = !1; r && r.tagName && r !== bodyNode;) {
            if (n = _e(r, "position"), i = _e(r, "overflow"), o = _e(r, "transform"), t && browser.mozilla) {
                if ("page_wrap" != r.id && r !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break
            } else if (r !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break;
            "none" !== o ? s = void 0 : "static" !== n && "fixed" !== s && (s = n), r = A(r)
        }
        return r
    }

    function q(e) {
        var t = arguments.length;
        if (t > 1)
            for (var r = 0; r < t; r++) q(arguments[r]);
        else if ((e = a(e)) && e.style) {
            var n = e.olddisplay,
                i = e.tagName.toLowerCase(),
                o = "block";
            e.style.display = n || "", "none" === _e(e, "display") && (o = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = o)
        }
    }

    function G(e) {
        var t = arguments.length;
        if (t > 1)
            for (var r = 0; r < t; r++) G(arguments[r]);
        else if ((e = a(e)) && e.style) {
            var n = _e(e, "display");
            e.olddisplay = "none" !== n ? n : "", e.style.display = "none"
        }
    }

    function X(e) {
        return !(!(e = a(e)) || !e.style) && "none" !== _e(e, "display")
    }

    function Q() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function J(e, t, r) {
        e = a(e), r = r || 0;
        var i = re(e)[1],
            o = ie(e)[1],
            s = window,
            c = document.documentElement,
            l = Math.max(Object(n.intval)(s.innerHeight), Object(n.intval)(c.clientHeight)),
            d = a("page_header_cont"),
            u = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            p = vk.staticheader ? Math.max(0, ie(d)[1] - u) : ie(d)[1];
        if (t) {
            if (i + o < u + p + r) return i + o - u - p - r;
            if (i > u + l - r) return i - u - l + r
        } else {
            if (i < u + p + r) return i - u - p - r;
            if (i + o > u + l - r) return i + o - u - l + r
        }
        return 0
    }

    function Z(e, t) {
        return void 0 === t && (t = !X(e)), t ? q(e) : G(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var r = void 0;
        if (t && "inline" === _e(e, "display")) {
            var n = e.getClientRects();
            r = n && n[0] || e.getBoundingClientRect()
        } else r = e.getBoundingClientRect();
        return r
    }

    function re(e, t) {
        if (!(e = a(e))) return [0, 0];
        var r = e.ownerDocument,
            n = {
                top: 0,
                left: 0
            };
        if (!r) return [0, 0];
        var i = r.documentElement;
        ee(e) && (n = te(e, !0));
        var o = r === r.window ? r : 9 === r.nodeType && (r.defaultView || r.parentWindow);
        return [n.left + (t ? 0 : o.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : o.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
    }

    function ne(e) {
        return null != e && e === e.window
    }

    function ie(e, t, r) {
        e = a(e);
        var i = document.documentElement,
            o = [0, 0],
            s = void 0;
        if (t && "border-box" === _e(e, "boxSizing") && (t = !1), e === document) o = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
        else if (e) {
            var c = function() {
                o = ee(e) && (s = te(e, r)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(n.each)(o, function(t, r) {
                    var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(n.each)(i, function() {
                        o[t] -= parseFloat(_e(e, "padding" + this)) || 0, o[t] -= parseFloat(_e(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (X(e)) c();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    d = {},
                    u = !1;
                e.style.cssText.indexOf("!important") > -1 && (u = e.style.cssText), Object(n.each)(l, function(t, r) {
                    d[t] = e.style[t], e.style[t] = r
                }), c(), Object(n.each)(l, function(t, r) {
                    e.style[t] = d[t]
                }), u && (e.style.cssText = u)
            }
        }
        return o
    }

    function ae(e) {
        return ie(e)[0]
    }

    function oe(e) {
        return ie(e)[1]
    }

    function se(e, t) {
        var r = a(e);
        return r && 1 === r.nodeType && (" " + r.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function ce(e, t) {
        var r = a(e);
        r && !se(r, t) && (r.className = (r.className ? r.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var le = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function de(e, t) {
        var r = a(e);
        r && (r.className = Object(n.trim)((r.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var ue = function(e, t) {
        return setTimeout(de.pbind(e, t), 0)
    };

    function pe(e, t, r) {
        return void 0 === r && (r = !se(e, t)), (r ? ce : de)(e, t), r
    }

    function he(e, t, r) {
        return void 0 === r && (r = !se(e, t)), (r ? le : ue)(e, t), r
    }

    function fe(e, t, r) {
        de(e, t), ce(e, r)
    }

    function _e(e, t, r) {
        if (e = a(e), Object(n.isArray)(t)) {
            var i = {};
            return Object(n.each)(t, function(t, r) {
                return i[r] = _e(e, r)
            }), i
        }
        if (!e) return "";
        if (void 0 === r && (r = !0), !r && "opacity" === t && browser.msie) {
            var o = e.style.filter;
            return o ? o.indexOf("opacity=") >= 0 ? parseFloat(o.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!r && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var s = void 0,
            c = document.defaultView || window;
        if (c.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = c.getComputedStyle(e, null);
            l && (s = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var d = e.currentStyle.filter;
                return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (s = e.currentStyle[t] || e.currentStyle[u]) && (s = 0), s = (s + "").split(" "), Object(n.each)(s, function(t, r) {
                if (!/^\d+(px)?$/i.test(r) && /^\d/.test(r)) {
                    var n = e.style,
                        i = n.left,
                        a = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = r || 0, s[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = a
                }
            }), s = s.join(" ")
        }
        if (r && ("width" === t || "height" === t)) {
            var p = ie(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            s = (Object(n.intval)(s) ? Math.max(Object(n.floatval)(s), p) : p) + "px"
        }
        return s
    }

    function ge(e, t, r) {
        if (e = a(e))
            if (Object(n.isObject)(t)) Object(n.each)(t, function(t, r) {
                return ge(e, t, r)
            });
            else if ("opacity" === t) browser.msie && ((r + "").length ? e.style.filter = 1 !== r ? "alpha(opacity=" + 100 * r + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== r && (e.style.opacity = r);
        else try {
            var i = "number" == typeof r;
            i && /height|width/i.test(t) && (r = Math.abs(r)), r = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? r + "px" : r, e.style[t] !== r && (e.style[t] = r)
        } catch (e) {
            debugLog("setStyle error: ", [t, r], e)
        }
    }
    window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var r in t)
                if (void 0 !== e.style[t[r] + "Transform"]) return t[r] + "Transform"
        }
        return "transform"
    }();
    var ve = function(e, t, r) {
        return setTimeout(ge.pbind(e, t, r), 0)
    };

    function ye(e, t, r) {
        var i = be(e, "pseudo-id");
        i || (be(e, "pseudo-id", i = Object(n.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
        var o = t + "-style-" + i,
            s = a(o),
            c = "._pseudo_" + i + ":" + t + "{";
        s || (s = headNode.appendChild(g("style", {
            id: o,
            type: "text/css"
        }))), Object(n.each)(r, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(c, 0)) : s.styleSheet && (s.styleSheet.cssText = c)
    }

    function be(e, t, r) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== r && (vkCache[n] || (vkCache[n] = {}, window.__debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = r), t ? vkCache[n] && vkCache[n][t] : n
    }

    function me(e, t, r) {
        return e = a(e), void 0 === r ? e.getAttribute(t) : (e.setAttribute(t, r), r)
    }

    function we(e) {
        for (var t = 0, r = arguments.length; t < r; ++t) {
            var n = arguments[t];
            if (void 0 !== e[n]) try {
                delete e[n]
            } catch (t) {
                try {
                    e.removeAttribute(n)
                } catch (e) {}
            }
        }
    }

    function Ee(e, t) {
        var r = !!e && e[vkExpand];
        if (r)
            if (t) {
                if (vkCache[r]) {
                    delete vkCache[r][t], t = "";
                    var n = 0;
                    for (var a in vkCache[r])
                        if ("__elem" !== a) {
                            n++;
                            break
                        }
                    n || Ee(e)
                }
            } else Object(i.removeEvent)(e), we(e, vkExpand), delete vkCache[r]
    }

    function Oe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var r = a(e[t]);
            r && (Ee(r), we(r, "btnevents"))
        }
    }

    function Pe(e, t, r) {
        if ((e = a(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", r || e.innerText || e.textContent);
            else {
                var n = s("b", e);
                n && (n.scrollWidth > n.clientWidth || n.scrollHeight > n.clientHeight) ? e.setAttribute("title", r || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Ce() {
        var e = a("zoom_test_1") || document.body.appendChild(g("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (a("zoom_test_2") || document.body.appendChild(g("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function je(e, t, r) {
        if (e = a(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !r && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !r && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Te(e, t, r) {
        e = a(e);
        try {
            if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== r && !1 !== r || (r = t), e.setSelectionRange) e.setSelectionRange(t, r);
            else if (window.getSelection && document.createRange) {
                var n = document.createRange();
                n.selectNodeContents(e), n.collapse(!1);
                var i = window.getSelection();
                i.removeAllRanges(), i.addRange(n)
            }
        } catch (e) {}
    }

    function xe(e, t, r) {
        for (e = a(e), r = r || 999; e && !t(e);) {
            if (0 === --r) return !1;
            try {
                if ((e = A(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    var Se = !1;

    function ke(e) {
        if (!Se) return window.document.title = Object(n.replaceEntities)(e)
    }

    function Ie(e) {
        Se = e, e && window.cur && window.cur.destroy.push(function() {
            Ie(!1)
        })
    }

    function Le() {
        window.vkExpand = window.vkExpand || "VK" + Object(n.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
    window.ge = a, window.geByTag = o, window.geByTag1 = s, window.geByClass = c, window.geByClass1 = l, window.gpeByClass = d, window.domQuery = u, window.domQuery1 = p, window.domClosest = h, window.ce = g, window.cf = w, window.re = E, window.se = O, window.sech = P, window.rs = C, window.psr = j, window.domReplaceEl = T, window.domEL = x, window.domNS = S, window.domPS = k, window.domFC = I, window.domLC = L, window.domPN = A, window.domChildren = N, window.domInsertBefore = D, window.domInsertAfter = M, window.domByClass = R, window.domData = H, window.domChildIndex = B, window.domCA = z, window.domClosestSibling = U, window.matchesSelector = F, window.isHover = W, window.isAncestor = Y, window.getScroll = K, window.domClosestPositioned = V, window.domClosestOverflowHidden = $, window.show = q, window.hide = G, window.isVisible = X, window.clientHeight = Q, window.getClientRectOffsetY = J, window.toggle = Z, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = re, window.isWindow = ne, window.getSize = ie, window.hasClass = se, window.addClass = ce, window.addClassDelayed = le, window.removeClass = de, window.removeClassDelayed = ue, window.toggleClass = pe, window.toggleClassDelayed = he, window.replaceClass = fe, window.getStyle = _e, window.setStyle = ge, window.setStyleDelayed = ve, window.setPseudoStyle = ye, window.data = be, window.attr = me, window.removeAttr = we, window.removeData = Ee, window.cleanElems = Oe, window.setTitle = Pe, window.getZoom = Ce, window.val = je, window.elfocus = Te, window.traverseParent = xe, window.getH = oe, window.getW = ae, window.domClosestByTag = f, window.setDocumentTitle = ke, window.lockDocumentTitle = Ie
}, , , function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "parseLatin", function() {
        return a
    }), r.d(t, "parseCyr", function() {
        return o
    }), r.d(t, "parseLatKeys", function() {
        return s
    }), r.d(t, "langNumeric", function() {
        return c
    }), r.d(t, "langSex", function() {
        return l
    }), r.d(t, "langStr", function() {
        return d
    }), r.d(t, "addLangKeys", function() {
        return u
    }), r.d(t, "getLang", function() {
        return p
    }), r.d(t, "langDate", function() {
        return h
    }), r.d(t, "getShortDate", function() {
        return f
    }), r.d(t, "getShortDateOrTime", function() {
        return _
    }), r.d(t, "langWordNumeric", function() {
        return g
    }), r.d(t, "getDateText", function() {
        return v
    }), r.d(t, "getBigDateNew", function() {
        return y
    }), r.d(t, "getSmDate", function() {
        return b
    });
    var n = r(57),
        i = r(30);

    function a(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], r = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = e, i = 0, a = t.length; i < a; i++) n = n.split(t[i]).join(r[i]);
        for (var o = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = o.length; s < c; s++) n = n.split(o.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return n === e ? null : n
    }

    function o(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], r = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, a = 0; a < r.length; a++) i = i.split(r[a]).join(t[a]);
        for (var o = 0; o < n.length; o++) i = i.split(n.charAt(o)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(o));
        return i === e ? null : i
    }

    function s(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", r = e, n = 0; n < t.length; n++) r = r.split(t.charAt(n)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(n));
        return r == e ? null : r
    }

    function c(e, t, r) {
        if (!t || !window.langConfig) return e;
        var n = void 0;
        if (Object(i.isArray)(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(r, a) {
                if ("*" == a[0]) return n = t[a[2]], !1;
                var o = a[0] ? e % a[0] : e;
                return -1 != Object(i.indexOf)(a[1], o) ? (n = t[a[2]], !1) : void 0
            })) : n = t, r) {
            for (var a = e.toString().split("."), o = [], s = a[0].length - 3; s > -3; s -= 3) o.unshift(a[0].slice(s > 0 ? s : 0, s + 3));
            a[0] = o.join(langConfig.numDel), e = a.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function l(e, t) {
        if (!Object(i.isArray)(t)) return t;
        var r = t[1];
        return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (r = t[i[1]], !1) : e == i[0] && t[i[1]] ? (r = t[i[1]], !1) : void 0
        }), r) : r
    }

    function d(e) {
        for (var t = arguments, r = t.length, n = e + "", i = 1; i < r; i += 2) {
            var a = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
            n = n.replace(a, t[i + 1])
        }
        return n
    }

    function u(e, t) {
        var r = t ? window : window.cur;
        r.lang ? Object(i.extend)(r.lang, e) : r.lang = e
    }

    function p() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var r = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!r) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return Object(i.isFunction)(r) ? r.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(r) || "raw" === e[0] ? r : c(e[0], r, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function h(e, t, r, a, o, s) {
        var c = void 0;
        if (s || (s = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += r, c = new Date(e)) : c = e, o) t = t[1];
        else {
            var l = "";
            !(l = Object(n.isToday)(c) ? t[3] : Object(n.isYesterday)(c) ? t[2] : Object(n.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (l = t[1]), t = l
        }
        var d = {
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
                day: c.getDate(),
                month: c.getMonth() + 1,
                year: c.getFullYear()
            },
            u = "";
        switch (3 === vk.lang && (u = c.getHours() > 11 ? "pm" : "am", d.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
            case 1:
                switch (c.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !Object(n.isToday)(c) || Object(n.isYesterday)(c) || Object(n.isTomorrow)(c) || (t = s + t);
                break;
            case 12:
            case 73:
                1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(n.leadingZero)(d.hours)).replace("{minute}", Object(n.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(n.leadingZero)(d.day)).replace("{month}", a[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(n.leadingZero)(d.seconds)).replace("{am_pm}", u)
    }

    function f(e, t, r, n, i) {
        e *= 1e3, void 0 === r && (r = !0), void 0 === n && (n = p("months_of", "raw")), t *= 1e3;
        var a = Date.now(),
            o = new Date(a),
            s = new Date(e + t);
        return !i && e > a && e - a < 864e5 && o.getDate() === s.getDate() ? h(e, "{hour}:{minute} {am_pm}", t, [], !r) : s.getYear() !== o.getYear() || e < a - 157248e5 ? h(e, p("global_date", "raw"), t, n, !r) : h(e, p("global_short_date", "raw"), t, n, !r)
    }

    function _(e, t, r, i) {
        return Object(n.isToday)(new Date(1e3 * e + 1e3 * t)) ? h(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !r) : f(e, t, r, i)
    }

    function g(e, t, r) {
        return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, r)
    }

    function v(e, t) {
        e += t;
        var r = parseInt(Date.now() / 1e3) - e,
            n = "";
        if (r < 60) n = p("global_just_now");
        else if (r < 3600) {
            n = g(Object(i.intval)(r / 60), p("global_word_mins_ago", "raw"), p("global_mins_ago", "raw"))
        } else if (r < 14400) {
            n = g(Object(i.intval)(r / 3600), p("global_word_hours_ago", "raw"), p("global_hours_ago", "raw"))
        } else n = y(e, 0, !0, "_l");
        return n
    }

    function y(e, t, r, n) {
        void 0 === r && (r = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            a = new Date;
        return i.getFullYear() !== a.getFullYear() && i.getTime() < a.getTime() - 1728e5 || Math.abs(i.getTime() - a.getTime()) > 157248e5 ? h(1e3 * e, p("global_date", "raw"), t, p("months_sm_of"), !r) : h(1e3 * e, p("global_short_date_time" + n, "raw"), t, p("months_sm_of"), !r)
    }

    function b(e, t, r) {
        void 0 === r && (r = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            a = n.getMonth(),
            o = new Date(1e3 * e),
            s = o.getFullYear(),
            c = o.getMonth();
        return h(1e3 * e, p(s < i && (a > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, p("months_sm_of", "raw"), !r)
    }
    window.parseLatin = a, window.parseCyr = o, window.parseLatKeys = s, window.langNumeric = c, window.langSex = l, window.langStr = d, window.addLangKeys = u, window.getLang = p, window.langDate = h, window.getShortDate = f, window.getShortDateOrTime = _, window.langWordNumeric = g, window.getDateText = v, window.getBigDateNew = y, window.getSmDate = b
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(38),
        i = r(31),
        a = r(4);
    var o = function(e) {
        function t(r, n) {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n, !0))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), t.prototype.render = function() {
            var e = this;
            this._el = se('\n      <div class="article_ed__gif_content"></div>\n    ');
            var t = i.default.get(a.ParagraphType.ObjectGIF, this.getMediaId());
            if (t)
                if (t.video) {
                    if (this._videoEl = ce("video", {
                            autoplay: !0,
                            loop: "loop",
                            muted: !0,
                            src: t.video + "&mp4=1"
                        }), t.size) {
                        var r = t.size[0] < t.size[1],
                            n = !this._isSmallGifSize();
                        (r || n) && setStyle(this._videoEl, {
                            width: t.size[0]
                        })
                    }
                    this._el.appendChild(this._videoEl), this._el.appendChild(se('<span class="article_ed__select_dummy">&nbsp;</span>'))
                } else if (t.href) {
                var o = t.href + "&wnd=1&module=" + cur.module;
                this._imgEl = ce("img"), this._imgEl.addEventListener("error", function() {
                    showFastBox(getLang("pages_article_error_box_title"), getLang("pages_article_error_box_text")), e._editor.removeObject(e)
                }), this._imgEl.src = o, this._el.appendChild(this._imgEl)
            }
            return this._el
        }, t.prototype.onViewport = function(e) {
            if (this._imgEl) setStyle(this._imgEl, "visibility", e ? "visible" : "hidden");
            else if (e) {
                var t = this._videoEl.play();
                t && t.catch(function() {})
            } else this._videoEl.pause()
        }, t.prototype.onRender = function() {
            var e = this;
            setTimeout(function() {
                var t = e._videoEl && e._videoEl.play();
                if (t && t.catch(function() {}), browser.msie && e._videoEl) {
                    var r = e._videoEl.src;
                    e._videoEl.src = "", e._videoEl.src = r
                }
            })
        }, t.prototype._isSmallGifSize = function() {
            var e = i.default.get(a.ParagraphType.ObjectGIF, this.getMediaId());
            return !(!e && !e.size) && e.size[0] > this.getEditor().getOptions().minGifWidthExpand
        }, t
    }(n.default);
    t.default = o
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(38),
        i = r(31),
        a = r(4);
    var o = function(e) {
        function t(r, n) {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n, !0))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), t.prototype.render = function() {
            var e = i.default.get(a.ParagraphType.ObjectAudio, this.getMediaId()).audio,
                t = AudioUtils.drawAudio(e);
            return this._el = se('\n      <div class="article_object_audio">' + t + "</div>\n    "), this._el
        }, t
    }(n.default);
    t.default = o
}, , function(e, t, r) {
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
}, , , , function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(38),
        i = r(4),
        a = r(31);
    var o = function(e) {
        function t(r, n) {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n, !0))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), t.prototype.render = function() {
            this._el = se('\n      <div class="article_object_video"></div>\n    ');
            var e = a.default.get(i.ParagraphType.ObjectVideo, this.getMediaId());
            if (e && (e.editable || e.thumb)) {
                var t = void 0;
                if (e.thumb) t = e.thumb;
                else t = Object(i.getAppropriateImage)(e.editable.sizes, this.getEditor().getWidth(!0))[0];
                this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                    duration: e.duration || 0,
                    platform: e.platform || ""
                }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>")), this._el.appendChild(se('<img class="article_ed__video_img" src=' + t + ' contenteditable="false" />'))
            }
            return this._el
        }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
    }(n.default);
    t.default = o
}, , function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(58);
    window.ArticleEditor = n.default, stManager.done(jsc("web/article.js"))
}, , , function(e, t, r) {
    "use strict";

    function n(e) {
        var t = new Date;
        return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
    }

    function i(e) {
        return n(new Date(e.getTime() + 864e5))
    }

    function a(e) {
        return n(new Date(e.getTime() - 864e5))
    }

    function o(e, t) {
        var r = new Date(e),
            n = new Date(t);
        return r.getFullYear() === n.getFullYear() && r.getMonth() === n.getMonth() && r.getDate() === n.getDate()
    }

    function s(e) {
        return e >= 10 ? e : "0" + e
    }

    function c(e, t) {
        var r = void 0;
        e = Math.max(e, 0);
        var n = Math.floor(e % 60);
        r = n < 10 ? "0" + n : n;
        var i = (e = Math.floor(e / 60)) % 60;
        return r = i + ":" + r, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (r = "0" + r), r = e + ":" + r), r
    }
    r.r(t), r.d(t, "isToday", function() {
        return n
    }), r.d(t, "isYesterday", function() {
        return i
    }), r.d(t, "isTomorrow", function() {
        return a
    }), r.d(t, "isSameDate", function() {
        return o
    }), r.d(t, "leadingZero", function() {
        return s
    }), r.d(t, "formatTime", function() {
        return c
    })
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(3),
        i = r(52),
        a = r(45),
        o = r(46),
        s = r(40),
        c = r(48),
        l = r(37),
        d = r(4),
        u = r(36),
        p = r(27),
        h = r(16),
        f = r(31),
        _ = r(41),
        g = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var v = window,
        y = v.cur,
        b = v.browser,
        m = v.each,
        w = v.addClass,
        E = v.geByTag1,
        O = v.geByClass1,
        P = v.extractUrls,
        C = v.removeClass,
        j = v.domClosestByTag,
        T = v.hasClass,
        x = v.domData,
        S = v.getSize,
        k = v.getXY,
        I = v.re,
        L = v.se,
        A = v.domInsertBefore,
        N = v.traverseParent,
        D = v.extend,
        M = v.toggleClass,
        R = v.trim,
        H = v.domInsertAfter,
        B = v.gpeByClass,
        z = v.clean,
        U = v.domReplaceEl,
        F = v.isObject,
        W = v.ge,
        Y = v.domChildIndex,
        K = v.domNS,
        V = 65,
        $ = 66,
        q = 67,
        G = 73,
        X = 83,
        Q = 89,
        J = 90,
        Z = 8,
        ee = 13,
        te = 38,
        re = 40,
        ne = 46,
        ie = 9,
        ae = [{
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
        oe = ae.slice().reverse(),
        se = {};
    m(ae, function(e, t) {
        se[t.tag] = t
    });
    var le = {};
    m(ae, function(e, t) {
        le[t.type] = t
    });
    var de = 1;

    function ue() {
        return de++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
    }
    var pe = function() {
        function e(t, r, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this._id = ue(), y.lang = y.lang || {}, D(y.lang, i.lang), this._options = i, this._els = {
                editor: W(t),
                canvas: L('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
            }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = L('<div class="article_photo_upload"></div>')), w(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._redos = [], this._objects = {}, this._floatedObjects = [], Object(p.initLimits)(i.limits);
            var a = n || [];
            if (i.postData) {
                var o = i.postData.text || "";
                o = (o = o.replace(/❤/g, "❤️")).split("\n");
                var s = [];
                s.push(Object(l.buildParagraph)({
                    type: d.ParagraphType.Header1,
                    lines: [{
                        text: ""
                    }]
                })), o.forEach(function(e) {
                    R(e) && s.push(Object(l.buildParagraph)({
                        lines: [{
                            text: z(e)
                        }]
                    }))
                }), a = s.concat(a)
            }
            a && 0 != a.length || (a = [Object(l.buildParagraph)({
                type: this._options.noTitle ? d.ParagraphType.Text : d.ParagraphType.Header1
            })]), (a = a.filter(function(e) {
                return !1 !== e
            })).forEach(function(e) {
                e.lines.forEach(function(e) {
                    e.text = Object(l.replaceParagraphEntities)(e.text), e.brs && F(e.brs) && (e.brs = Object(l.convertBRsToArray)(e.brs))
                })
            }), i.needIndexCorrection && Object(l.correctRealIndexes)(a, 1), this.initParagraphs(a), this._updateTextPlaceholders(), this._initObjectDrag(), i.postData ? Object(l.focusEl)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), i.coverPhoto && this.setCoverPhoto(i.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this.updateWarnInfos(), this._publishNameCandidate = i.name || this._getName(), this._saveUndoState(), stManager.add("audio.js")
        }
        return e.prototype.updateWarnInfos = function() {
            this.showWarningInfo(), this.showEditLockInfo(), this.showRevEditInfo()
        }, e.prototype._setEventListener = function(e, t, r) {
            this._events = this._events || [], this._events.push({
                el: e,
                event: t,
                handler: r
            }), e.addEventListener(t, r)
        }, e.prototype.setCoverPhoto = function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this._coverPhoto = e, this._options.isPublished || this.saveDraft(t)
        }, e.prototype.getCoverPhoto = function() {
            return !1 !== this._coverPhoto && (this._coverPhoto ? this._coverPhoto : void 0)
        }, e.prototype.getFirstCoverPhotoFromParagraphs = function() {
            var e = !1;
            return this._ps.forEach(function(t) {
                if (!e && t.type == d.ParagraphType.ObjectPhoto) {
                    var r = t._object.getMediaId(0);
                    e = {
                        id: r,
                        data: f.default.get(d.ParagraphType.ObjectPhoto, r)
                    }
                }
            }), e
        }, e.prototype.getPublishName = function() {
            return this._publishName || this._publishNameCandidate || this._getName()
        }, e.prototype.setPublishName = function(e) {
            this._publishName = e, this._options.isPublished || this.saveDraft(!0)
        }, e.prototype._updateTextPlaceholders = function() {
            if (!this._options.noTitle) {
                this._els.placeholders || (this._els.placeholders = L('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = L("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = L("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(l.isParagraphEmpty)(this._ps[0]) ? C(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : w(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                var e = this._ps[1],
                    t = !!e && e.sep,
                    r = this._getCurrentParagraphIndex(),
                    n = g(r, 1)[0];
                Object(l.isParagraphEmpty)(e) && (!e || e.type != d.ParagraphType.Code) && n < 2 && this._ps.length <= 2 && !t ? C(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : w(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
            }
        }, e.prototype.destroy = function() {
            this._els.editor.innerHTML = "", C(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(function(e) {
                e.el.removeEventListener(e.event, e.handler)
            }), delete y.docsCurFilter
        }, e.prototype.getLimits = function() {
            return this._options.limits
        }, e.prototype.getOptions = function() {
            return this._options
        }, e.prototype.getWidth = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return S(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
        }, e.prototype.getPhotoUploadOptions = function() {
            return this._options.photoUploadOptions
        }, e.prototype.getPhotoUploadEl = function() {
            return this._photoUploadEl
        }, e.prototype.removeObject = function(e) {
            var t = this;
            m(this._ps, function(r, n) {
                if (n._object == e) {
                    var i = t._getParagraphElByIndex(r + 1);
                    return Object(l.focusEl)(i), I(t._getParagraphElByIndex(r)), t._setAllParagraphsDirty(), t._triggerInputEvent(), !1
                }
            })
        }, e.prototype._processPastedUrl = function(e, t) {
            var r = this,
                n = this._getParagraph(e);
            n && n.type == d.ParagraphType.Text && (I(this._els.shareParseForm), I(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(L('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
            })), window.onUploadFail = function() {}, window.onUploadDone = function(t) {
                if (t) {
                    var n = t[2];
                    if (n) {
                        var i, a = void 0,
                            o = {};
                        switch (t[0]) {
                            case "audio_playlist":
                                a = d.ParagraphType.ObjectAudioPlaylist, o = {
                                    accessHash: n.accessHash
                                }, t[1] = n.ownerId + "_" + n.id + (n.accessHash ? "_" + n.accessHash : "");
                                break;
                            case "doc":
                                "gif" == n.ext && (a = d.ParagraphType.ObjectGIF, o = {
                                    size: n.video_preview_size,
                                    video: n.video_preview,
                                    href: n.href
                                });
                                break;
                            case "photo":
                                a = d.ParagraphType.ObjectPhoto, o = {
                                    size: Object(l.getPhotoSize)(n.editable.sizes),
                                    sizes: n.editable.sizes
                                };
                                break;
                            case "video":
                                a = d.ParagraphType.ObjectVideo, o = {
                                    editable: n.editable,
                                    duration: n.editable.duration,
                                    platform: n.editable.platform
                                }
                        }
                        if (a) {
                            var s = Object(l.hasSeparator)(r._ps[e]),
                                c = {
                                    mediaId: t[1],
                                    type: a,
                                    sep: s,
                                    fromExtPage: intval(n.from_ext_page)
                                };
                            f.default.add(a, c.mediaId, o), r._linkTooltip && r._linkTooltip.hide(), c = Object(l.buildParagraph)(c), (i = r._getParagraph(e + 1)) && i._object && i._object._mediaId === c.mediaId || (r._getOrCreateParagraphObject(c), r._insertParagraphAt(e + 1, c), r._els.canvas.normalize(), r._redraw(!0, !0), r._saveUndoState(), setTimeout(function() {
                                r.onObjectStateLoaded()
                            }, 10))
                        }
                    }
                }
            }, this._els.shareParseForm.submit())
        }, e.prototype._handleObjectPaste = function(e) {
            var t = (e.clipboardData || e.originalEvent.clipboardData).getData("text/plain");
            if (t) {
                var r = t.split(":"),
                    n = g(r, 2),
                    i = n[0],
                    a = n[1];
                if ("uuid" == i && a) {
                    var o = domQuery1('[data-uuid="' + a + '"]');
                    if (o) {
                        var s = o.cloneNode(!0);
                        s.setAttribute("data-force-update", "1");
                        var c = this._getCurrentParagraphIndex(),
                            l = g(c, 1)[0];
                        H(s, this._getParagraphElByIndex(l)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                    }
                }
            }
        }, e.prototype._handleLinkPaste = function(e) {
            var t = this,
                r = (e.clipboardData || e.originalEvent.clipboardData).items;
            for (var n in r)
                if (r.hasOwnProperty(n)) {
                    var i = r[n];
                    "string" === i.kind && function() {
                        var e = t._getCurrentParagraphIndex(),
                            r = g(e, 1)[0];
                        i.getAsString(function(e) {
                            var n = P(e, !0);
                            if (1 === n.length) {
                                var i = n[0].url,
                                    a = t._getParagraphElByIndex(r);
                                t._processPastedUrl(r, i), Object(l.traverseTree)(a, function(e) {
                                    if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(i) >= 0 && !N(e, function(e) {
                                            return e.tagName && "a" == e.tagName.toLowerCase()
                                        }, 3)) {
                                        t._saveCursorMarker();
                                        var n = document.createRange();
                                        n.setStart(e, e.textContent.indexOf(i)), n.setEnd(e, e.textContent.indexOf(i) + i.length);
                                        var a = window.getSelection();
                                        a.removeAllRanges(), a.addRange(n), t._setParagraphDirty(r), document.execCommand("createLink", !1, i), t._restoreCursorFromMarker()
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
                    "file" === i.kind && function() {
                        t._photoPasteUploadingProcess = !0;
                        var e = i.getAsFile(),
                            r = new FileReader;
                        r.onload = function() {
                            t._photoPasteUploadingProcess = !1;
                            var n = t._getCurrentParagraphIndex(),
                                i = g(n, 1)[0];
                            i = i || 0;
                            var a = Object(l.buildParagraph)({
                                type: d.ParagraphType.ObjectPhoto
                            });
                            t._getOrCreateParagraphObject(a).setBLOB(e);
                            var o = void 0;
                            Object(l.isParagraphEmpty)(t._ps[i]) ? (o = i, Object(l.hasSeparator)(t._ps[o]) && (a.sep = 1), t._ps[o] = a) : (o = i + 1, t._insertParagraphAt(o, a)), t._redraw(!0, !0);
                            var s = new Image;
                            s.onload = function() {
                                t._focusParagraph(o + 1), t._showObjectPicker()
                            }, s.src = r.result
                        }, r.readAsDataURL(e)
                    }()
                }
        }, e.prototype._getCurrentSelectionState = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 2),
                r = t[0],
                n = t[1];
            if (!1 === r || !1 === n) return !1;
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
                }, a = {}, o = 0, s = void 0, c = void 0, u = r; u <= n && u < this._ps.length; u++) {
                var p = Object(l.isObjectParagraph)(this._ps[u]) ? this._ps[u]._object.getCaptionEl() : this._getParagraphElByIndex(u);
                if (void 0 === s) {
                    var h = getCaretCharacterOffsetWithin(p),
                        f = g(h, 2);
                    s = f[0], c = f[1]
                }
                this._ps[u].lines.forEach(function(e) {
                    var t = e.decorations;
                    ae.forEach(function(r) {
                        var n = t[r.type];
                        n && !isEmpty(n) && n.forEach(function(t) {
                            var n = [t[0] + o, t[1] + o];
                            if ("link" == r.type) s < n[1] && c > n[0] && (a[r.type] = 1, i.decorations[r.type] = !0);
                            else if (1 == a[r.type]) {
                                c > n[1] || (c >= n[0] && c <= n[1] ? t[0] > 0 ? a[r.type] = -1 : (a[r.type] = 2, i.decorations[r.type] = !0) : a[r.type] = -1)
                            } else if (!a[r.type]) {
                                var l = s >= n[0] && s <= n[1];
                                l && (c >= n[0] && c <= n[1]) ? (a[r.type] = 2, i.decorations[r.type] = !0) : l && (e.text.length > n[1] ? a[r.type] = -1 : a[r.type] = 1)
                            }
                        })
                    }), o += e.text.length
                })
            }
            for (var _ = r; _ <= n && _ < this._ps.length; _++) Object(l.isObjectParagraph)(this._ps[_]) && (i.captionFocused = i.captionFocused || this._ps[_]._object.isCaptionFocused(), i.object = !0), this._ps[_].type == d.ParagraphType.Header1 && (i.header1 = !0), this._ps[_].type != d.ParagraphType.Header2 && (i.header2 = !1), this._ps[_].type != d.ParagraphType.Header3 && (i.header3 = !1), inArray(this._ps[_].type, [d.ParagraphType.Header1, d.ParagraphType.Header2, d.ParagraphType.Header3]) ? i.header = !0 : i.justHeaders = !1, inArray(this._ps[_].type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) || (i.quote = !1), inArray(this._ps[_].type, [d.ParagraphType.BulletList, d.ParagraphType.NumericList]) && (i.list = !0);
            var v = Object(l.getRange)(),
                y = g(v, 1)[0];
            return !(y && y.startContainer && T(y.startContainer, "article_ed__noconteditable")) && (i.multiline = r != n, i)
        }, e.prototype._hideFormatTooltip = function() {
            this._formatTooltip && this._formatTooltip.hide()
        }, e.prototype._showFormatTooltip = function() {
            if (!this.isLocked()) {
                clearTimeout(this._doShowFormatTooltipTO);
                try {
                    var e = window.getSelection();
                    if (e.focusNode && (T(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase())) return;
                    var t = !e.isCollapsed;
                    this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, t), 1)
                } catch (e) {}
            }
        }, e.prototype._doShowFormatTooltip = function(e) {
            var t = this;
            if (!this._formatTooltip) {
                var r = L('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                    n = void 0;
                this._formatTooltip = new ElementTooltip(this._els.editor, {
                    cls: "article_format_tt",
                    content: r,
                    customShow: !0,
                    offset: [0, -3],
                    onShow: function() {
                        var e = t._getCurrentSelectionState(),
                            n = [];
                        if (!e || e.header1 || e.object && !e.captionFocused || (e.justHeaders || n.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || n.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), n.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? n.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : n.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (n.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), n.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), n.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 != n.length) {
                            var i = O("article_format_btns", r);
                            i.innerHTML = "", n.forEach(function(e, t) {
                                t > 0 && inArray(e[0], ["header1"]) && i.appendChild(L('<div class="article_format_divider"></div>'));
                                var r = e[2] ? "article_format_btn_active" : "";
                                i.appendChild(L('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                            }), t.setLinkMode(!1)
                        } else t._formatTooltip.hide()
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
                                c = k(s),
                                d = S(s);
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
                    if (e.keyCode == ee) return t._setLinkToSelectedText(i.value.trim()), t._formatTooltip.hide(), cancelEvent(e)
                }), O("article_set_link_delete", r).addEventListener("click", function(e) {
                    return t._setLinkToSelectedText(), cancelEvent(e)
                })
            }
            e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
        }, e.prototype._setLinkToSelectedText = function(e) {
            if (e) {
                if (!(e = (e = e.substr(0, 1500)).replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://")) e = (Object(l.isVKUrl)(e) ? "https" : "http") + "://" + e;
                e = encodeURIComponent(e)
            }
            this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), !b.msie && e || this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor), this._linkCursor
        }, e.prototype.clearLink = function() {
            this.setLinkMode(!1);
            var e = Object(l.getRange)(),
                t = g(e, 3),
                r = t[0],
                n = t[2],
                i = j("a", r.startContainer),
                a = j("a", r.endContainer) || i;
            i && (this._saveCursorMarker(), n.setBaseAndExtent(i, 0, a, Math.max(1, a.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
        }, e.prototype.setLinkMode = function(e, t) {
            var r = void 0;
            e && (r = this._getCursor(), b.msie || document.execCommand("superscript", !1, !0));
            var n = this._formatTooltip.getContent();
            if (this._formatTooltip.linkMode != !!e)
                if (e) {
                    var i = E("input", n);
                    i.value = "", w(n, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), i.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                } else setStyle(n, {
                    width: null
                }), C(n, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
        }, e.prototype.setHeader1 = function(e) {
            this._setHeader(d.ParagraphType.Header2, !e)
        }, e.prototype.setHeader2 = function(e) {
            this._setHeader(d.ParagraphType.Header3, !e)
        }, e.prototype.setQuote = function() {
            var e = this._getCursor(),
                t = this._getCurrentParagraphIndex(),
                r = g(t, 2),
                n = r[0],
                i = r[1];
            if (!1 !== n) {
                i || (i = n);
                for (var a = d.ParagraphType.Text, o = n; o <= i; o++)
                    if (u(this._ps[o])) {
                        a = this._ps[o].type == d.ParagraphType.Quote ? d.ParagraphType.Quote2 : this._ps[o].type == d.ParagraphType.Quote2 ? d.ParagraphType.Text : d.ParagraphType.Quote;
                        break
                    }
                for (var s = n; s <= i; s++) {
                    var c = this._ps[s];
                    u(c) && (this._ps[s] = Object(l.buildParagraph)({
                        type: a,
                        lines: [c.lines[0]],
                        sep: Object(l.hasSeparator)(this._ps[s])
                    }), this._setParagraphDirty(s))
                }
                this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(e), this._saveUndoState(), this.saveDraft()
            }

            function u(e) {
                return !Object(l.isObjectParagraph)(e) && !Object(l.isListParagraph)(e)
            }
        }, e.prototype._setHeader = function(e, t) {
            var r = this._getCursor(),
                n = this._getCurrentParagraphIndex(),
                i = g(n, 2),
                a = i[0],
                o = i[1];
            if (!1 !== a) {
                o || (o = a);
                for (var s = a; s <= o; s++) {
                    c(this._ps[s]) && (this._ps[s].type = t ? e : d.ParagraphType.Text, this._setParagraphDirty(s))
                }
                this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(r), this._saveUndoState(), this.saveDraft()
            }

            function c(e) {
                return !Object(l.isObjectParagraph)(e) && !Object(l.isListParagraph)(e)
            }
        }, e.prototype.setStrong = function() {
            this._setAllParagraphsDirty(), document.execCommand("bold"), b.msie && this._triggerInputEvent()
        }, e.prototype.setEm = function() {
            this._setAllParagraphsDirty(), document.execCommand("italic"), b.msie && this._triggerInputEvent()
        }, e.prototype.setStrike = function() {
            this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), b.msie && this._triggerInputEvent()
        }, e.prototype.saveUndoStateAndDraft = function() {
            this._saveUndoState(), this.saveDraft()
        }, e.prototype._saveUndoStateDelayed = function() {
            var e = this;
            clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = setTimeout(function() {
                e._saveUndoState()
            }, 1e3)
        }, e.prototype._saveUndoState = function() {
            clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = !1;
            var e = Object(u.getCleanedState)(this._ps, !0);
            if (this._undoCurrentState) {
                if (JSON.stringify(e) == JSON.stringify(this._undoCurrentState)) return;
                this._undos.push({
                    ps: this._undoCurrentState,
                    cursor: this._undoCurrentStateCursor
                }), this._undos.length > 100 && this._undos.shift()
            }
            this._undoCurrentState = e, this._undoCurrentStateCursor = this._getCursor(), this._redos = [], this._options.onUndoRedo && this._options.onUndoRedo()
        }, e.prototype.undo = function() {
            if (this._saveUndoDelayedTO && this._saveUndoState(), this._undos.length) {
                this._redos.push({
                    ps: this._undoCurrentState,
                    cursor: this._undoCurrentStateCursor
                });
                var e = this._undos.pop();
                this._ps = Object(u.expandParagraphFields)(e.ps), this._undoCurrentState = Object(u.getCleanedState)(this._ps), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), 0 == this._undos.length && (this._undoable = !1)
            }
            this._options.onUndoRedo && this._options.onUndoRedo()
        }, e.prototype.redo = function() {
            if (0 != this._redos.length) {
                this._undos.push({
                    ps: this._undoCurrentState,
                    cursor: this._undoCurrentStateCursor
                });
                var e = this._redos.pop();
                this._ps = Object(u.expandParagraphFields)(e.ps), this._undoCurrentState = Object(u.getCleanedState)(this._ps), this._undoCurrentStateCursor = e.cursor, this._redraw(!0), e.cursor && this._restoreCursor(e.cursor), this._updateTextPlaceholders(), this._options.onUndoRedo && this._options.onUndoRedo()
            }
        }, e.prototype.canUndo = function() {
            return this._undoable || this._undos.length > 0
        }, e.prototype.canRedo = function() {
            return this._redos.length > 0
        }, e.prototype.initParagraphs = function(e) {
            e.forEach(function(e) {
                e._preparedData && (e.mediaId.split(",").forEach(function(t, r) {
                    f.default.add(e.type, t, e._preparedData[r])
                }), delete e._preparedData)
            }), this._ps = Object(u.expandParagraphFields)(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
        }, e.prototype._getParagraphFromHTML = function(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

            function n(t, r) {
                if (t.nodeType == Node.TEXT_NODE) {
                    var i = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    r.text += "pre" == e ? i : Object(l.cleanTextSpaces)(i)
                } else Object(l.isBR)(t) && r.text.length > 0 && r.brs.push(r.text.length);
                m(t.childNodes, function(e, t) {
                    var i = [r.text.length];
                    n(t, r), i.push(r.text.length);
                    var a = (t.tagName || "").toLowerCase();
                    t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (a = "strong");
                    var o = void 0;
                    switch (a) {
                        case "b":
                        case "strong":
                            o = le.strong;
                            break;
                        case "em":
                        case "i":
                            o = le.em;
                            break;
                        case "s":
                        case "strike":
                        case "del":
                            o = le.strike;
                            break;
                        case "a":
                            o = le.link, i.push(Object(l.decodeURL)(t.getAttribute("href") || ""));
                            break;
                        case "code":
                            o = le.code;
                            break;
                        case "font":
                            var s = t.getAttribute("face");
                            "monospace" === s ? o = le.code : "times" === s && (o = le.code)
                    }
                    o && (r.decorations[o.type] = r.decorations[o.type] || [], i[0] < i[1] && r.decorations[o.type].push(i), r.decorations[o.type] = Object(l.mergeRanges)(r.decorations[o.type]))
                })
            }
            var i = document.createElement("div");
            i.innerHTML = t;
            var a = [],
                o = void 0,
                s = {};
            if ("ol" == e || "ul" == e) {
                switch (e) {
                    case "ol":
                        o = d.ParagraphType.NumericList;
                        break;
                    case "ul":
                        o = d.ParagraphType.BulletList
                }
                for (var c = 0, u = i.children.length; c < u; c++) {
                    var p = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    n(i.children[c], p), p.brs = Object(l.cleanBRs)(p.brs), a.push(p)
                }
            } else {
                switch (e) {
                    case "h1":
                        o = d.ParagraphType.Header1;
                        break;
                    case "h2":
                    case "header":
                        o = d.ParagraphType.Header2;
                        break;
                    case "h3":
                    case "h4":
                        o = d.ParagraphType.Header3;
                        break;
                    case "blockquote":
                        o = d.ParagraphType.Quote;
                        break;
                    case "cite":
                        o = d.ParagraphType.Quote2;
                        break;
                    case "pre":
                        o = d.ParagraphType.Code;
                        break;
                    default:
                        o = d.ParagraphType.Text
                }
                var h = i.firstElementChild;
                if (Object(l.isObjectParagraphEl)(h)) {
                    var f = x(h, "type"),
                        _ = x(h, "media-id");
                    f && _ && (i = E("figure", h), o = f, s.mediaId = _)
                }
                var g = {
                    text: "",
                    decorations: {},
                    brs: []
                };
                n(i, g), g.brs = Object(l.cleanBRs)(g.brs, g.text.length), a.push(g), o == d.ParagraphType.Code && delete g.decorations.code, r || o != d.ParagraphType.Text || "```" != g.text || 0 != g.brs.length || (g.text = "", o = d.ParagraphType.Code), Object(l.isHeaderParagraph)(o) || (0 == g.text.indexOf("1. ") ? (o = d.ParagraphType.NumericList, this._removeParagraphLineTextPart(g, 0, "1. ".length)) : 0 == g.text.indexOf("* ") && (o = d.ParagraphType.BulletList, this._removeParagraphLineTextPart(g, 0, "* ".length))), g.brs = g.brs.filter(function(e) {
                    return e > 0
                })
            }
            return s.lines = a, s.type = o, Object(l.buildParagraph)(s)
        }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
            e.text = e.text.substring(0, t) + e.text.substring(r);
            for (var n = r - t, i = 0, a = e.brs.length; i < a; i++) {
                var o = e.brs[i];
                o > t && o < r ? e.brs[i] = void 0 : e.brs[i] > t && e.brs[i] >= r && (e.brs[i] -= n)
            }
            e.brs = e.brs.filter(function(e) {
                return void 0 !== e
            }), m(e.decorations, function(i, a) {
                a.forEach(function(e) {
                    e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= n) : (e[0] -= n, e[1] -= n))
                }), e.decorations[i] = e.decorations[i].filter(function(e) {
                    return void 0 !== e[0]
                })
            })
        }, e.prototype._renderObjectParagraph = function(e, t) {
            var r = this._getOrCreateParagraphObject(e),
                n = r.el(),
                i = parseInt(e.mode) || 0;
            return r.onRender && r.onRender(), r.setCaptionElHtml(t), x(n, "uuid", e._uuid), x(n, "type", e.type), x(n, "media-id", e._object.getMediaId()), x(n, "mode", i), w(n, l.ArticleEditorParagraphClass), n
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
                var s = n.text,
                    c = n.decorations,
                    u = [];

                function p(e) {
                    return e[2] || !0
                }
                m(ae, function(e, t) {
                    if (!Object(l.isHeaderParagraph)(o) && o != d.ParagraphType.Code || "code" != t.type) {
                        var r = c[t.type];
                        if (r)
                            for (var n = function(e, n) {
                                    var i = r[n];
                                    (u[i[0]] = u[i[0]] || {
                                        open: {},
                                        close: {}
                                    }).open[t.type] = p(i);
                                    var a = u[i[1]] = u[i[1]] || {
                                            open: {},
                                            close: {}
                                        },
                                        o = function(e, t) {
                                            for (var r = []; e > 0;) {
                                                var n = u[--e];
                                                if (n)
                                                    for (var i in n.open)
                                                        if (n.open.hasOwnProperty(i)) {
                                                            if (i == t) return [];
                                                            r.push(i)
                                                        }
                                            }
                                            return r
                                        }(i[1], t.type);
                                    o.forEach(function(e) {
                                        a.close[e.type] = !0
                                    }), a.close[t.type] = !0, o.forEach(function(e) {
                                        a.open[e.type] = p(i)
                                    })
                                }, i = 0, a = r.length; i < a; i++) n(0, i)
                    }
                });
                var h = 0,
                    f = [];
                u.forEach(function(t, r) {
                    if (t) {
                        var i = !1,
                            a = t.close.link && 1 == Object.keys(t.close).length;
                        r > 0 && (i = Object(l.prepareLineText)(s, h, r, n.brs, e.type == d.ParagraphType.Code), a || f.push(i));
                        var o = 0;
                        a && (i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), !1 !== i && f.push(i)), m(oe, function(e, r) {
                            void 0 !== t.close[r.type] && f.push("</" + r.tag + ">")
                        }), f.push("<br/>".repeat(o)), m(ae, function(e, r) {
                            var n = t.open[r.type];
                            void 0 !== t.open[r.type] && (!0 === n ? f.push("<" + r.tag + ">") : f.push("<" + r.tag + ' href="' + z(n) + '">'))
                        }), h = r
                    }
                }), f.push(Object(l.prepareLineText)(s, h, void 0, n.brs, e.type == d.ParagraphType.Code)), i && (r += "<" + i + (a = a ? " " + a : "") + ">"), inArray(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "<p>"), r += f.join("") || (t ? "" : "<br/>"), inArray(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "</p>"), i && (r += "</" + i + ">")
            }), [n, r]
        }, e.prototype._renderParagraph = function(e) {
            var t = Object(l.isObjectParagraph)(e),
                r = this._renderParagraphLines(e, t),
                n = g(r, 2),
                i = n[0],
                a = n[1],
                o = void 0;
            return o = t ? this._renderObjectParagraph(e, a) : L(i ? "<" + i + ">" + a + "</" + i + ">" : a), Object(l.hasSeparator)(e) ? x(o, "sep", Object(l.genSepatorId)()) : x(o, "sep", null), w(o, l.ArticleEditorParagraphClass), w(o, "article_paragraph"), o
        }, e.prototype._getParagraphElByIndex = function(e) {
            return !1 === e ? null : this._els.canvas.childNodes[e] || null
        }, e.prototype._getParagraph = function(e) {
            return e < this._ps.length ? this._ps[e] : null
        }, e.prototype._decorateParagraphEls = function() {
            for (var e = 0, t = this._ps.length; e < t; e++) {
                var r = e > 0 && this._ps[e - 1],
                    n = this._ps[e],
                    i = e + 1 < t && this._ps[e + 1],
                    a = !1,
                    o = !1,
                    s = !1;
                r && n.type == r.type || (a = !0), i && n.type == i.type || (o = !0), (d.ResizableObjectTypes.includes(+i.type) || i.sep) && (s = !0);
                var c = this._getParagraphElByIndex(e);
                M(c, "article_decoration_first", a), M(c, "article_decoration_last", o), M(c, "article_decoration_before", s)
            }
        }, e.prototype._redraw = function(e, t) {
            var r = this,
                n = this._getCursor();
            e ? (this._els.canvas.innerHTML = "", this._ps.forEach(function(e) {
                r._els.canvas.appendChild(r._renderParagraph(e)), e._object && e._object._isCarousel && e._object._isCarousel() && e._object._rerender()
            })) : this._dirty.forEach(function(e) {
                if (!(e >= r._ps.length)) {
                    var t = r._getParagraph(e);
                    t._object && t._object._isCarousel && t._object._isCarousel() && t._object._rerender();
                    var n = r._getParagraphElByIndex(e),
                        i = r._renderParagraph(r._ps[e]);
                    n ? i.outerHTML != n.outerHTML && U(n, i) : r._els.canvas.appendChild(i)
                }
            }), t && this._restoreCursor(n), this._decorateParagraphEls(), this._dirty = []
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
                    n = g(r, 2)[1],
                    i = t.endContainer;
                if (0 === t.endOffset && (this._isParagraphEl(i) || this._isParagraphEl(domPN(i)) && 0 == Object(l.childNodeIndex)(i))) {
                    var a = this._getContainingParagraphEl(i),
                        o = g(a, 1)[0];
                    i = Object(_.domPS)(o) || o
                }
                var s = this._getContainingParagraphEl(i),
                    c = g(s, 2)[1];
                return [n, Math.max(n, c)]
            }
            return [0, !1]
        }, e.prototype._saveCursorMarker = function() {
            if (!this._markerCursorSet) {
                var e = Object(l.getRange)(),
                    t = g(e, 2),
                    r = t[0],
                    n = t[1];
                if (!r) return [0, 0];
                var i = r.startContainer,
                    a = r.startOffset,
                    o = r.endContainer,
                    s = r.endOffset;
                if (i != this._els.canvas) {
                    var c = this._getContainingParagraphEl(i)[1];
                    d(i, a, l.CURSOR_MARKER_START), n || (this._getContainingParagraphEl(o)[1] == c && o.textContent.includes(l.CURSOR_MARKER_START) && (s += 1), d(o, s, l.CURSOR_MARKER_END)), this._markerCursorSet = !0
                }
            }

            function d(e, t, r) {
                if (e.nodeType == Node.TEXT_NODE) {
                    var n = e.textContent;
                    e.textContent = n.substring(0, t) + r + n.substring(t)
                } else {
                    var i = document.createTextNode(r);
                    e.insertBefore(i, e.childNodes[t])
                }
            }
        }, e.prototype._restoreCursorFromMarker = function() {
            var e = this;
            if (this._markerCursorSet) {
                var t = function(e, t, r) {
                        return function t(n) {
                            if (n.nodeType == Node.TEXT_NODE) {
                                var i = n.textContent.indexOf(e);
                                if (i >= 0) {
                                    n.textContent = n.textContent.split(e).join("");
                                    var a = n.parentElement;
                                    return -1 != a.innerHTML.search(/\s$/) && (a.innerHTML = a.innerHTML.trimRight() + l.NBSP, r && r[0] == n && (r[0] = a.lastChild), n = a.lastChild), a.innerHTML || ((n = a).innerHTML = "<br/>", i = 0), [n, i]
                                }
                            } else
                                for (var o = 0, s = n.childNodes.length; o < s; o++) {
                                    var c;
                                    if (c = t(n.childNodes[o])) return c
                                }
                        }(t)
                    },
                    r = void 0,
                    n = void 0,
                    i = void 0;
                for (i = 0; i < this._els.canvas.children.length && !(r = t(l.CURSOR_MARKER_START, this._els.canvas.children[i])); i++);
                for (; i < this._els.canvas.children.length && !(n = t(l.CURSOR_MARKER_END, this._els.canvas.children[i], r)); i++);
                if (r) {
                    var a = document.createRange();
                    r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), a.setStart(r[0], r[1]), n && (n[0].nodeType == Node.TEXT_NODE && (n[1] = Math.min(n[1], n[0].textContent.length)), a.setEnd(n[0], n[1])), window.getSelection().setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset)
                }
                var o = function(t) {
                    e._ps.forEach(function(e) {
                        e.lines.forEach(function(e) {
                            var r = e.text.indexOf(t);
                            if (r >= 0) {
                                e.text = e.text.replace(t, "");
                                for (var n = 0, i = 0; i < e.brs.length; i++) e.brs[i] > r && (n = 1), e.brs[i] -= n;
                                m(ae, function(t, n) {
                                    var i = e.decorations[n.type];
                                    if (i)
                                        for (var a = 0, o = i.length; a < o; a++) {
                                            var s = i[a];
                                            s[0] > r && (s[0] -= 1), s[1] > r && (s[1] -= 1)
                                        }
                                })
                            }
                        })
                    })
                };
                o(l.CURSOR_MARKER_START), o(l.CURSOR_MARKER_END), this._markerCursorSet = !1
            }
        }, e.prototype._setAllParagraphsDirty = function() {
            this._dirty = [];
            for (var e = this._els.canvas.children.length, t = 0; t < e; t++) this._dirty.push(t);
            this._ps = []
        }, e.prototype._setCurrentParagraphDirty = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 2),
                r = t[0],
                n = t[1];
            this._setParagraphDirty(r, n)
        }, e.prototype._setParagraphDirty = function(e, t) {
            if (void 0 === e || e < 0) throw new Error("Invalid paragraph index");
            t = t || e;
            for (var r = e; r <= t; r++) inArray(r, this._dirty) || this._dirty.push(r)
        }, e.prototype._expandDoubleBRs = function() {
            function e(e, t, r) {
                var n = e.lines[0];
                void 0 === r && (r = n.text.length);
                var i = [];
                return n.brs.forEach(function(e) {
                    e < r && e > t && i.push(e - t)
                }), Object(l.buildParagraph)({
                    type: e.type,
                    lines: [{
                        text: n.text.substr(t, r - t),
                        decorations: Object(l.decorationsSlice)(n.decorations, t, r),
                        brs: i
                    }]
                })
            }
            for (var t = !1, r = 0, n = this._ps.length; r < n; r++) {
                var i = this._ps[r];
                if (i.lines.length > 1) i.lines.forEach(l.cleanLineBRs);
                else {
                    var a = i.lines[0].brs;
                    if (0 == a.length) continue;
                    for (var o = [], s = 0, c = 0, d = a.length; c < d; c++)
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
                                var t = N(i, function(t) {
                                        return t == e._els.canvas || "FIGURE" == t.tagName
                                    }, 10),
                                    n = !(!t || t == e._els.canvas) && E("figcaption", t),
                                    a = Object(l.buildParagraph)({
                                        type: d.ParagraphType.ObjectPhoto
                                    }),
                                    o = e._renderObjectParagraph(a, n ? n.innerHTML : "");
                                Object(l.justCursorInString)(r.textContent) ? (U(r, o), I(i), H(L("<p>" + l.CURSOR_MARKER_START + "</p>"), o)) : (H(o, domPN(i)), I(n), I(i)), N(o, function(t) {
                                    if (t == e._els.canvas) return !0;
                                    C(t, l.ArticleEditorParagraphClass)
                                }), Object(l.queuePhotoProcess)(i.src, function(t, r, n) {
                                    t ? (I(o), e._forgetObject(a._uuid), e._setAllParagraphsDirty(), e._triggerInputEvent(), n()) : e._getOrCreateParagraphObject(a).setBLOB(r, n)
                                })
                            }; i = n.shift();) a()
        }, e.prototype._flattenAlienParagraphs = function() {
            var e = this;
            if (this._fromPasteEvent) {
                for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, n = this._fromPasteEvent, i = this._pasteCurrentIndex, a = this._getCurrentParagraphIndex(), o = g(a, 1)[0], s = -1, c = function() {
                        if (s++, n && !R(r.textContent) && s > i && s <= o) return I(r), "continue";
                        var t = r;
                        Object(l.isQuoteEl)(r) && !Object(l.isAlienParagraphEl)(r) && (t = r.firstChild);
                        var a = !1;
                        (function e(n) {
                            if (n && n.nodeType != Node.TEXT_NODE && !Object(l.isBR)(n))
                                if (Object(l.hasBlockElements)(n))
                                    if (this._isTrackedObjectEl(n)) n != t && (A(n, r), a = !0);
                                    else
                                        for (var i = Array.prototype.slice.call(n.childNodes), o = void 0; o = i.shift();) e.call(this, o);
                            else n != t && (R(n.innerHTML) && A(n, r), a = !0)
                        }).call(e, t, !0), a && I(r)
                    }; r = t.shift();) c();
                this._setAllParagraphsDirty()
            }
        }, e.prototype._correctCaptionSelection = function() {
            var e = Object(l.getRange)(),
                t = g(e, 3),
                r = t[0],
                n = t[1],
                i = t[2];
            if (r && !n) {
                var a = N(r.startContainer, function(e) {
                    return "FIGCAPTION" == e.tagName
                }, 5);
                if (a && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && Object(l.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                    var o = O("article_ed__figcaption_edit", a),
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
                t ? this._lastSavedDraft = i : this._lastSavedDraft != i || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(function() {
                    if (n._lastSavedDraft = i, 0 != n._ps.length) {
                        var e = Object(p.checkLimits)(n._ps);
                        e ? n._options.onDraftNotSaved && n._options.onDraftNotSaved(e) : n.save(!1, function(e, t, r) {
                            n._initDraftSave = !0, n._options.onDraftSaved && n._options.onDraftSaved(e, t, r)
                        })
                    }
                }, r ? 0 : 1e3 * this._options.draftSaveDelay)) : !t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId())
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
            void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && ((r = r || {}).from_post_convert = 1), h.default.save(this.getArticleOwnerId(), this.getArticleId(), i, e, a, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s, c, l) {
                if (isString(r) && r.startsWith("locked ")) return n.getOptions().editLockMessage = r.slice("locked ".length), n.showEditLockInfo(), void(t && t(!0));
                r || (i && (n._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(D({}, nav.objLoc, {
                    article_id: n.getArticleOwnerId() + "_" + n.getArticleId()
                })), n._publishNameCandidate = a, e && (n._options.isPublished = !0), n._options.monetizationAllowed = l, n._replaceVideos(c)), t && t(r, i, o, s)
            })
        }, e.prototype._replaceVideos = function() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                r = !1;
            try {
                t.forEach(function(t) {
                    var n = g(t, 4),
                        i = n[0],
                        a = n[1],
                        o = n[2],
                        s = n[3];
                    e._ps.forEach(function(t, n) {
                        if (t.type == d.ParagraphType.ObjectVideo) {
                            var c = t.mediaId.split("_"),
                                l = g(c, 3),
                                u = l[0],
                                p = l[1];
                            l[2] || u != i || p != a || (t.mediaId = o + "_" + s, e._setParagraphDirty(n), r = !0)
                        }
                    })
                })
            } catch (e) {}
            r && this._redrawModel()
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
                    if (1 == i.length && a && a.tagName && inArray(a.tagName, ["H1", "H2", "H3"])) {
                        U(r, a);
                        continue
                    }
                    if (i.shift(), i.length)
                        for (var o = void 0; o = i.shift();) {
                            if (this._saveCursorMarker(), e) H(o, r);
                            else {
                                var s = L("<" + n + "></" + n + ">");
                                s.appendChild(o), H(s, r)
                            }
                            this._restoreCursorFromMarker()
                        }
                }
        }, e.prototype._ensureDummyParagraphs = function() {
            if (this._els.canvas) {
                var e = this._els.canvas.lastChild;
                if (e)
                    if (R(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML || "H1" == e.tagName) {
                        var t = Object(l.buildParagraph)({});
                        this._els.canvas.appendChild(this._renderParagraph(t)), this._ps.push(t), this._updateTextPlaceholders()
                    }
            }
        }, e.prototype._ensureAtLeastOneParagraph = function() {
            0 == this._ps.length && (this._ps = [Object(l.buildParagraph)({
                type: d.ParagraphType.Text
            })])
        }, e.prototype._ensureTitleParagraph = function() {
            var e = this;
            if (!this._options.noTitle) {
                var t = this._ps[0];
                Object(l.isObjectParagraph)(t) && (this._ps[0] = Object(l.buildParagraph)({
                    type: d.ParagraphType.Header1
                })), t.type = d.ParagraphType.Header1, t.lines[0].decorations = {}, t.lines[0].brs = [], delete t.sep
            }
            this._ps.forEach(function(t, r) {
                (e._options.noTitle || 0 != r) && (1 == r && t.type == d.ParagraphType.Header1 && (t.type = d.ParagraphType.Text), t.type == d.ParagraphType.Header1 && (t.type = d.ParagraphType.Header2))
            })
        }, e.prototype._insertParagraphAt = function(e, t) {
            this._ps.splice(e, 0, t)
        }, e.prototype._deleteParagraphFrom = function(e) {
            this._ps.splice(e, 1)
        }, e.prototype._focusParagraph = function(e, t) {
            Object(l.focusEl)(this._getParagraphElByIndex(e), t)
        }, e.prototype._init = function() {
            this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._initResizeTooltip()
        }, e.prototype._redrawModel = function() {
            this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
        }, e.prototype.addObjectAudio = function() {
            var e = this,
                t = this._getCurrentParagraphIndex(),
                r = g(t, 1)[0];
            this.getArticleOwnerId() < 0 && (y.audioAttachOriginalOwnerId = this.getArticleOwnerId(), y.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                canPlaylistAttach: !0,
                onAudioChoose: function(t, n, i, a) {
                    Object(l.isParagraphEmpty)(e._ps[r]) || e._insertParagraphAt(r, Object(l.buildParagraph)());
                    var o = Object(l.buildParagraph)({
                        type: d.ParagraphType.ObjectAudio,
                        mediaId: i.fullId
                    });
                    f.default.add(d.ParagraphType.ObjectAudio, i.fullId, {
                        audio: a
                    }), e._getOrCreateParagraphObject(o), e._ps[r] = o, t.shiftKey || curBox().hide(), e._redrawModel();
                    var s = e._getParagraphElByIndex(r);
                    Object(l.focusEl)(s), e.saveUndoStateAndDraft(), r++
                },
                onPlaylistChoose: function(t, n) {
                    var i = n.getOwnerId() + "_" + n.getPlaylistId() + (n.getAccessHash() ? "_" + n.getAccessHash() : ""),
                        a = Object(l.buildParagraph)({
                            type: d.ParagraphType.ObjectAudioPlaylist,
                            mediaId: i
                        });
                    f.default.add(d.ParagraphType.ObjectAudioPlaylist, i, {
                        accessHash: n.getAccessHash()
                    }), e._getOrCreateParagraphObject(a), e._ps[r] = a, curBox().hide(), e._redrawModel();
                    var o = e._getParagraphElByIndex(r);
                    Object(l.focusEl)(o), e.saveUndoStateAndDraft()
                }
            })
        }, e.prototype.closeAllCarouselEditors = function() {
            this._ps.forEach(function(e) {
                e.type == d.ParagraphType.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
            })
        }, e.prototype.setMediaUploadMode = function(e) {
            this._isUploading = !!e, M(this._els.editor, "article_ed__uploading", this._isUploading)
        }, e.prototype.isMediaUploadMode = function() {
            return this._isUploading
        }, e.prototype.addObjectVideo = function() {
            var e = this,
                t = this._getCurrentParagraphIndex(),
                r = g(t, 1)[0],
                n = this._getParagraph(r),
                i = Object(l.hasSeparator)(n);
            delete n.sep;
            showBox("al_video.php", {
                act: "a_choose_video_box",
                from: "article",
                to_id: this.getArticleOwnerId()
            });
            y.chooseMedia = function(t, n, a, o, s) {
                var c = Object(d.getAppropriateImage)(a.editable.sizes, e.getWidth()),
                    u = g(c, 1)[0],
                    p = Object(l.buildParagraph)({
                        type: d.ParagraphType.ObjectVideo,
                        mediaId: n,
                        sep: i
                    });
                i = !1, f.default.add(d.ParagraphType.ObjectVideo, n, {
                    editable: a.editable,
                    thumb: u,
                    duration: a.editable.duration,
                    platform: a.editable.platform
                }), e._getOrCreateParagraphObject(p), 0 == o ? e._ps[r] = p : e._ps.splice(r + o, 0, p), e._redrawModel(), e._saveUndoState();
                var h = e._getParagraphElByIndex(r);
                Object(l.focusEl)(h), !s && curBox() && curBox().hide(), e.saveDraft()
            }
        }, e.prototype.addObjectDoc = function() {
            var e = this,
                t = this._getCurrentParagraphIndex(),
                r = g(t, 1)[0],
                n = this._getParagraph(r),
                i = Object(l.hasSeparator)(n);
            delete n.sep, y.docsCurFilter = "gif";
            var a = showBox("docs.php", {
                act: "a_choose_doc_box",
                from: "article",
                ext_filter: "gif",
                to_id: this.getArticleOwnerId()
            }, {
                stat: ["docs.css"]
            });
            y.chooseMedia = function(t, n, o) {
                a.hide();
                var s = Object(l.buildParagraph)({
                    type: d.ParagraphType.ObjectGIF,
                    mediaId: n,
                    sep: i
                });
                i = !1, f.default.add(d.ParagraphType.ObjectGIF, n, {
                    video: o.video_preview,
                    size: o.video_preview_size,
                    href: o.href
                }), e._getOrCreateParagraphObject(s), e._insertParagraphAt(r, s), e._redrawModel(), e._saveUndoState(), e.saveDraft(), e._updateTextPlaceholders()
            }, y.showMediaProgress = function() {}
        }, e.prototype.addObjectPhoto = function() {
            var e = this,
                t = this._getCurrentParagraphIndex(),
                r = g(t, 1)[0],
                n = this._getParagraph(r),
                i = showBox("al_photos.php", {
                    to_id: this.getArticleOwnerId(),
                    act: "choose_photo",
                    max_files: 200,
                    article: 1
                }, {
                    cache: 1,
                    stat: ["photos.js", "photos.css", "upload.js"],
                    dark: 1
                }),
                a = void 0;
            y.onMediaUploadStarted = function() {
                var t = Object(l.buildParagraph)({
                        type: d.ParagraphType.ObjectPhoto
                    }),
                    n = e._renderObjectParagraph(t, ""),
                    i = e._getParagraphElByIndex(r);
                A(n, i), Object(l.focusEl)(i), a = n, e.setMediaUploadMode(!0)
            }, y.onMediaUploadFail = function() {
                delete y.onMediaUploadStarted, a && I(a), e.setMediaUploadMode(!1)
            };
            var o = void 0,
                s = -1;
            y.chooseMedia = function(t, c, u, p) {
                void 0 === p ? s++ : s = intval(p), delete y.onMediaUploadStarted, e.setMediaUploadMode(!1), a && I(a);
                var h = Object(l.buildParagraph)({
                    type: d.ParagraphType.ObjectPhoto,
                    mediaId: c,
                    sep: n.sep
                });
                return f.default.add(d.ParagraphType.ObjectPhoto, c, {
                    size: Object(l.getPhotoSize)(u.editable.sizes),
                    sizes: u.editable.sizes
                }), e._getOrCreateParagraphObject(h), s ? e._ps.splice(r + s, 0, h) : e._ps[r] = h, void 0 === p && i.hide(), clearTimeout(o), o = setTimeout(function() {
                    e._redrawModel(), e._focusParagraph(r + s), e._updateTextPlaceholders(), e.saveUndoStateAndDraft()
                }, 10), !1
            }, y.showMediaProgress = function() {}
        }, e.prototype.addSeparator = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 1)[0],
                r = Object(l.hasSeparator)(this._getParagraph(t)),
                n = Object(l.hasSeparator)(this._getParagraph(t + 1));
            !r && !n && t < this._ps.length - 1 && this._ps.splice(t, 1), this._getParagraph(t).sep = 1;
            var i = this._getCursor();
            this._redraw(!0), this._restoreCursor(i), this._updateTextPlaceholders()
        }, e.prototype.onObjectStateLoaded = function() {
            this.saveDraft(), this._showObjectPicker()
        }, e.prototype._hideObjectPicker = function() {
            this._objectPickerTooltip && this._objectPickerTooltip.hide()
        }, e.prototype._showObjectPicker = function() {
            if (!this.isLocked()) {
                if (!this._objectPickerEl) {
                    this._objectPickerEl = L('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                    var e = L('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_audio" onclick="cur.articleEditor.addObjectAudio()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_sep" onclick="cur.articleEditor.addSeparator()">\n        </button>\n      </div>');
                    this._objectPickerTooltip = new ElementTooltip(this._objectPickerEl, {
                        content: e,
                        forceSide: "right",
                        cls: "article_editor_object_picker_tt",
                        autoShow: !1,
                        elClassWhenShown: "article_editor_object_picker_tt_shown",
                        offset: [2, 0]
                    }), this._objectPickerEl.addEventListener("mousedown", function(e) {
                        return cancelEvent(e)
                    })
                }
                var t = this._getCurrentParagraphIndex(),
                    r = g(t, 2),
                    n = r[0],
                    i = r[1];
                if (!this.isMediaUploadMode() && !1 !== n && n == i && Object(l.isParagraphEmpty)(this._ps[n], !0) && this._ps[n] && inArray(this._ps[n].type, [d.ParagraphType.Text, d.ParagraphType.Header2, d.ParagraphType.Header3])) {
                    show(this._objectPickerEl);
                    var a = this._getParagraphElByIndex(n),
                        o = k(this._els.editor),
                        s = k(a)[1] - o[1],
                        c = !1;
                    this._uploadFloatList(), this._floatedObjects.forEach(function(e) {
                        e.startY <= s + 15 && e.endY + 30 >= s && (c = !0)
                    }), setStyle(this._objectPickerEl, {
                        left: c ? 355 : -40,
                        top: s
                    })
                } else hide(this._objectPickerEl)
            }
        }, e.prototype._initLinksHrefTooltip = function() {
            var e = this;
            this._els.canvas.addEventListener("mouseover", function(t) {
                if ("a" == t.target.tagName.toLowerCase()) {
                    if (e._linkTooltip && e._linkTooltip.destroy(), e._formatTooltip && e._formatTooltip.isShown()) return;
                    var r = t.target,
                        n = r.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                        i = Object(l.decodeURL)(n);
                    Object(l.isVKUrl)(n) || (n = "/away.php?to=" + encodeURIComponent(n) + "&utf=1"), e._linkTooltip = new ElementTooltip(r, {
                        cls: "article_editor_link_show_tt",
                        appendTo: e._els.editor,
                        content: L('<a target="_blank" href="' + n + '" class="article_editor_link">' + i + "</a>")
                    })
                }
            })
        }, e.prototype._isTrackedObjectEl = function(e) {
            var t = x(e, "uuid");
            return !!t && !!this._getObject(t)
        }, e.prototype._cloneObjectParagraphs = function() {
            for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                if (Object(l.isObjectParagraphEl)(t)) {
                    var n = t.getAttribute("data-uuid"),
                        i = parseInt(t.getAttribute("data-type"));
                    if (r[n]) {
                        var a = this._getObject(n);
                        n = ue(), this._getOrCreateParagraphObject({
                            type: i,
                            _uuid: n,
                            mediaId: a.getMediaId()
                        }), x(t, "uuid", n)
                    }
                    r[n] = !0
                }
        }, e.prototype._correctCursorToBeWithinCanvas = function() {
            var e = Object(l.getRange)(),
                t = g(e, 2),
                r = t[0];
            t[1] && r.startContainer == this._els.canvas && this._focusParagraph(0)
        }, e.prototype._triggerInputEvent = function() {
            this._els.canvas.dispatchEvent(new Event("input"))
        }, e.prototype._getCursor = function() {
            var e = this._els.canvas,
                t = Object(l.getRange)(),
                r = g(t, 2),
                n = r[0],
                i = r[1];
            if (!n) return !1;
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

            function o(t, r, n) {
                r.nodeType == Node.TEXT_NODE ? t.textOffset = n : t.nodeOffset = n, N(r, function(r) {
                    if (r == e) return !0;
                    Object(l.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && t.path.pop(), t.path.push(Object(l.childNodeIndex)(r))
                }, 10), t.path = t.path.slice().reverse()
            }
            return o(a.start, n.startContainer, n.startOffset), i ? delete a.end : o(a.end, n.endContainer, n.endOffset), a
        }, e.prototype._restoreCursor = function(e) {
            if (!e) return this._restoreCursorFromMarker();
            var t = this._els.canvas;

            function r(e) {
                var r = t;
                e.path.forEach(function(t, i) {
                    if (Object(l.isQuoteEl)(r)) {
                        var a = r.firstChild;
                        a && 1 == i && a.nodeType == Node.ELEMENT_NODE && "p" == a.tagName.toLowerCase() && (r = a)
                    }
                    t = Math.min(r.childNodes.length - 1, t);
                    var o = r.childNodes[t];
                    if (!o) return e.nodeOffset = n = 0, !1;
                    r = o
                });
                var n = void 0;
                return n = r.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(r.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && r && r.children && (n = Math.min(e.nodeOffset, r.childNodes.length)), [r, n]
            }
            var n = document.createRange();
            try {
                var i = r(e.start),
                    a = g(i, 2),
                    o = a[0],
                    s = a[1];
                if (Object(l.isBR)(o) && 0 == s) {
                    var c = domPN(o);
                    Object(l.isParagraphEl)(c) && 1 == c.childNodes.length && (o = c)
                }
                if (n.setStart(o, s), e.end) {
                    var d = r(e.end),
                        u = g(d, 2),
                        p = u[0],
                        h = u[1];
                    n.setEnd(p, h)
                }
                window.getSelection().setBaseAndExtent(n.startContainer, n.startOffset, n.endContainer, n.endOffset)
            } catch (e) {
                debugLog(e)
            }
        }, e.prototype._saveLastCursor = function() {
            var e = this._getCursor(),
                t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
            e ? ls.set(t, JSON.stringify(e)) : ls.remove(t)
        }, e.prototype._restoreLastCursor = function() {
            var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
            e ? (e = JSON.parse(e), this._restoreCursor(e)) : Object(l.focusEl)(this._els.canvas.firstChild)
        }, e.prototype._toggleCodeBlocks = function() {
            for (var e = void 0, t = this._getCurrentParagraphIndex(), r = g(t, 2), n = r[0], i = r[1], a = n; a <= i; a++) void 0 === e && (e = this._ps[a].type != d.ParagraphType.Code), this._ps[a].type = e ? d.ParagraphType.Code : d.ParagraphType.Text;
            var o = this._getCursor();
            this._redraw(!0), this._restoreCursor(o), this._updateTextPlaceholders()
        }, e.prototype._removeExtraSeparators = function() {
            for (var e = this._els.canvas.children, t = void 0, r = 0; r < e.length; r++) {
                var n = e[r],
                    i = x(n, "sep");
                i && (void 0 !== t && i == t && x(n, "sep", null), t = i)
            }
        }, e.prototype._replaceAlienInlineTags = function() {
            var e = !1,
                t = {
                    b: "strong",
                    i: "em"
                };
            return function r(n) {
                var i = n.tagName.toLowerCase();
                if (t[i]) {
                    e || (this._saveCursorMarker(), e = !0);
                    var a = ce(t[i], {
                        innerHTML: n.innerHTML
                    });
                    U(n, a)
                } else
                    for (var o = Array.prototype.slice.call(n.childNodes), s = void 0; s = o.shift();) s.nodeType == Node.ELEMENT_NODE && r.call(this, s)
            }.call(this, this._els.canvas), e && this._restoreCursorFromMarker(), e
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
                                o = S(a),
                                s = k(a),
                                c = s[1] < t + r && s[1] + o[1] > t;
                            n._object.onViewport && n._object.onViewport(c)
                        }
                    })
                });
                var t = 0;
                this._setEventListener(document, "selectionchange", function() {
                    var r = Object(l.getRange)(),
                        n = g(r, 2),
                        a = n[0],
                        o = n[1];
                    if (a && !N(a.commonAncestorContainer, function(t) {
                            return t == e._els.canvas
                        })) return;
                    var s = e._getCurrentParagraphIndex(),
                        c = g(s, 1)[0];
                    if (!1 !== c) {
                        if (!o && T(a.startContainer, "article")) {
                            var u = e._ps[t];
                            if (Object(l.isObjectParagraph)(u)) return void Object(l.focusEl)(u._object.getCaptionEl())
                        }
                        var p = a.startContainer;
                        if (b.msie && o && B("article_ed__extra_controls", p) && "BUTTON" != p.tagName) {
                            var h = e._ps[c];
                            if (Object(l.isObjectParagraph)(h)) return void h._object.getCaptionEl().focus()
                        }
                        t = c, e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), e._ensureDummyParagraphs(), 0 == i && e._showFormatTooltip(), e._saveLastCursor();
                        var f = e._getParagraph(c);
                        if (Object(l.isObjectParagraph)(f) && d.ResizableObjectTypes.includes(parseInt(f.type))) {
                            if (e._resizeTooltip) {
                                clearTimeout(_);
                                var _ = setTimeout(function() {
                                    e._showResizeTooltip()
                                }, 100)
                            }
                        } else e._resizeTooltip && e._resizeTooltip.isShown() && e._resizeTooltip.hide()
                    } else e._showObjectPicker()
                });
                var r = !1,
                    n = !1,
                    i = !1;
                this._els.canvas.addEventListener("mousedown", function() {
                    i = !0;
                    var t = void 0;
                    e._setEventListener(window, "mouseup", t = function(r) {
                        i = !1, "article_format_btn_link" == r.target.id || (e._showFormatTooltip(), t && window.removeEventListener("mouseup", t))
                    })
                }), this._els.canvas.addEventListener("selectstart", function() {
                    e._hideFormatTooltip()
                }), this._els.canvas.addEventListener("copy", function(t) {
                    var r = Object(l.getRange)(),
                        n = g(r, 2),
                        i = n[0];
                    if (n[1]) {
                        var a = e._getContainingParagraphEl(i.commonAncestorContainer),
                            o = g(a, 1)[0];
                        Object(l.isObjectParagraphEl)(o) && (t.clipboardData.setData("text/plain", "uuid:" + o.getAttribute("data-uuid")), t.preventDefault())
                    }
                }), this._els.canvas.addEventListener("paste", function(t) {
                    var r = e._getCurrentParagraphIndex(),
                        n = g(r, 1)[0];
                    n && (e._handleObjectPaste(t), e._handleLinkPaste(t), e._handlePhotoPaste(t), e._fromPasteEvent = !0, e._pasteCurrentIndex = n)
                }), this._els.canvas.addEventListener("click", function(e) {
                    if (e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName) return cancelEvent(e)
                });
                var a = !1;
                this._els.canvas.addEventListener("input", function() {
                    e._hideObjectPicker(), e._expandBlockquoteParagraphs(s), e._removeExtraSeparators();
                    var t = e._replaceAlienInlineTags();
                    b.safari || e._els.canvas.normalize();
                    var i = void 0;
                    e._fromPasteEvent || t || e._markerCursorSet ? e._saveCursorMarker() : i = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), a && (e._cleanParagraphsBRs(), a = !1), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph();
                    var o = e._fromPasteEvent && e._expandDoubleBRs();
                    e._redraw(o), e._restoreCursor(i), e._correctCursorToBeWithinCanvas(), e._dirty = [], n ? e._saveUndoStateDelayed() : e._saveUndoState(), r = n = !1, e._fromPasteEvent = !1, b.mozilla && e._showFormatTooltip(), e._updateTextPlaceholders(), e.saveDraft(), e._undoable = !0, e._options.onUndoRedo && e._options.onUndoRedo()
                });
                var o = !1,
                    s = !1,
                    u = 1,
                    p = void 0;
                this._els.canvas.addEventListener("keydown", function(t) {
                    var i = t.keyCode,
                        h = t.metaKey || t.ctrlKey,
                        f = t.shiftKey,
                        v = Object(l.getRange)(),
                        y = g(v, 2),
                        w = y[0],
                        E = y[1];
                    if (w) {
                        var O = e._getCurrentParagraphIndex(),
                            P = g(O, 2),
                            C = P[0],
                            T = P[1],
                            x = e._getParagraph(C),
                            S = !1;
                        if (Object(l.isObjectParagraph)(x))
                            if (x._object.isCaptionFocused()) S = 0 == w.startOffset && E;
                            else {
                                var k = e._getContainingParagraphEl(w.startContainer);
                                S = g(k, 1)[0] == x._object.el()
                            }
                        if (S && E && b.mozilla) {
                            if (i == te) return e._focusParagraph(C - 1, !0), cancelEvent(t);
                            if (i == re) return e._focusParagraph(C + 1, !0), cancelEvent(t)
                        }
                        if ((i == ne || i == Z) && e._resizeTooltip && e._resizeTooltip.isShown() && e._resizeTooltip.hide(), i == ie && E && 0 == C) return Object(l.focusEl)(e._getParagraphElByIndex(1)), cancelEvent(t);
                        if (h && i == V && Object(l.isObjectParagraph)(x) && x._object.isCaptionFocused()) {
                            var I = x._object.getCaptionEl();
                            return Object(l.selectEl)(I), cancelEvent(t)
                        }
                        if (h) switch (i) {
                            case $:
                                return e._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(t);
                            case G:
                                return e._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(t);
                            case X:
                                return e.saveDraft(!1, !1, !0), cancelEvent(t);
                            case J:
                                return f ? e.redo() : e.undo(), cancelEvent(t);
                            case Q:
                                return e.redo(), cancelEvent(t)
                        }
                        var N = i == q && t.altKey,
                            D = x ? x.type : d.ParagraphType.Text,
                            M = Object(_.gpeByTag)("pre", w.startContainer),
                            R = !!(M || Object(_.gpeByTag)("pre", w.endContainer) || w.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == w.startContainer.tagName);
                        if (N) {
                            if (D === d.ParagraphType.Header1) return cancelEvent(t);
                            if (E) return e._toggleCodeBlocks(), cancelEvent(t);
                            if (!R && inArray(D, [d.ParagraphType.Text, d.ParagraphType.NumericList, d.ParagraphType.BulletList])) {
                                e._setCurrentParagraphDirty();
                                var B = Object(_.gpeByTag)("code", w.startContainer) || Object(_.gpeByTag)("code", w.endContainer);
                                if (B) {
                                    e._saveCursorMarker();
                                    var z = L("<span></span>");
                                    z.innerHTML = B.innerHTML, U(B, z), e._triggerInputEvent()
                                } else document.execCommand("fontName", !1, "monospace"), b.msie && e._triggerInputEvent();
                                return cancelEvent(t)
                            }
                        }
                        if (i == ie && R && D == d.ParagraphType.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(t);
                        var F = !1;
                        if (i == Z) {
                            if (o) return o[0].textContent = o[1], e._restoreCursor(o[2]), o = !1, cancelEvent(t);
                            if (S) {
                                var W = e._getParagraphElByIndex(C),
                                    ae = Object(l.createParagraphEl)("", Object(l.hasSeparator)(x));
                                return e._correctEmptyParagraphAfterFloatObjects(), U(W, ae), Object(l.focusEl)(ae), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                            }
                            if (w && 0 == w.startOffset && w.collapsed) {
                                var oe = Object(_.gpeByTag)("li", w.startContainer),
                                    se = Object(l.getElementIndex)(oe);
                                if (oe) {
                                    var ce = e._ps[C],
                                        le = clone(ce),
                                        de = clone(ce);
                                    le.lines = le.lines.slice(0, se);
                                    var ue = Object(l.buildParagraph)({
                                        lines: [clone(ce.lines[se])]
                                    });
                                    de.lines = de.lines.slice(se + 1), e._ps.splice(C, 1, le, ue, de), e._redraw(!0);
                                    var pe = e._getParagraphElByIndex(C + 1);
                                    return Object(l.focusEl)(pe), e._saveUndoState(), cancelEvent(t)
                                }
                            }
                            if (w && E && 0 == w.startOffset && "LI" !== w.startContainer.nodeName) {
                                var he = e._getCurrentParagraphIndex(),
                                    fe = g(he, 1)[0],
                                    _e = fe > 0 && e._ps[fe - 1];
                                if (Object(l.isObjectParagraph)(_e)) {
                                    Object(l.isParagraphEmpty)(e._ps[fe]) && (e._ps.splice(fe, 1), e._redraw(!0));
                                    var ge = e._getParagraphElByIndex(fe - 1);
                                    return Object(l.focusEl)(ge), cancelEvent(t)
                                }
                            }
                            e._setAllParagraphsDirty(), b.msie && setTimeout(function() {
                                e._triggerInputEvent()
                            })
                        }
                        if (i == ne) {
                            var ve = e._ps[C],
                                ye = e._ps[C + 1],
                                be = getCaretCharacterOffsetWithin(w.startContainer),
                                me = g(be, 1)[0],
                                we = w.startContainer.textContent.length == me;
                            if (S)
                                if (!(ve._object.isCaptionFocused() && !!ve.lines[0].text)) {
                                    var Ee = e._getParagraphElByIndex(C),
                                        Oe = Object(l.createParagraphEl)();
                                    return U(Ee, Oe), Object(l.focusEl)(Oe), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                                }
                            if (E && Object(l.hasSeparator)(ye) && we) return e._setParagraphDirty(C + 1), delete ye.sep, e._redraw(!1, !0), cancelEvent(t);
                            if (E && we && Object(l.isObjectParagraph)(ye)) return Object(l.isParagraphEmpty)(ve) && ve.type != d.ParagraphType.Header1 && (e._ps.splice(C, 1), e._redraw(!0, !0)), Object(l.focusEl)(ye._object.getCaptionEl()), cancelEvent(t);
                            ye && Object(l.isParagraphEmpty)(ve) && inArray(ye.type, [d.ParagraphType.Header2, d.ParagraphType.Header3]) && (ve.type = ye.type, e._setParagraphDirty(C), e._redraw()), e._setAllParagraphsDirty(), (b.msie && 0 == w.startOffset && 0 == C || f) && setTimeout(function() {
                                e._setCurrentParagraphDirty(), e._triggerInputEvent()
                            })
                        } else if (i == ee) {
                            if (R && M && D == d.ParagraphType.Code && E) {
                                var Pe = M.textContent.search(/[^\s]/);
                                return -1 == Pe && (Pe = M.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(Pe)), cancelEvent(t)
                            }
                            if (e._isWithinObjectParagraphEl(Object(l.getFocusedElement)())) {
                                var Ce = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                    je = g(Ce, 2),
                                    Te = je[0],
                                    xe = je[1],
                                    Se = Object(l.createParagraphEl)(),
                                    ke = e._ps[xe]._object;
                                return !ke.isCaptioned() || ke.isCaptionFocused() ? H(Se, Te) : A(Se, Te), e._setAllParagraphsDirty(), Object(l.focusEl)(Se), e._triggerInputEvent(), cancelEvent(t)
                            }
                            var Ie = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                Le = g(Ie, 3),
                                Ae = Le[0],
                                Ne = (Le[1], Le[2]),
                                De = getCaretCharacterOffsetWithin(Ae),
                                Me = g(De, 2)[1];
                            if (t.shiftKey || t.ctrlKey && b.safari) {
                                var Re = getCaretCharacterOffsetWithin(Ae),
                                    He = g(Re, 2)[1],
                                    Be = j("li", w.startContainer),
                                    ze = 0;
                                Be && (ze = Y(Be));
                                var Ue = !1;
                                if (m(Ne.lines, function(e, t) {
                                        var r = t.brs,
                                            n = t.text.length;
                                        return 0 == He || He <= n && inArray(He, r) ? (Ue = !0, !1) : !((He -= n) <= 0 && e == ze) && void 0
                                    }), Ue) {
                                    a = !0, e._setParagraphDirty(C, T), document.execCommand("insertParagraph");
                                    var Fe = K(Ae);
                                    return Fe && (Object(l.focusEl)(Fe), Fe.focus()), e._triggerInputEvent(), cancelEvent(t)
                                }
                                b.msie && 0 == He && w.insertNode(L("<br>"))
                            }
                            var We = E && w.startContainer.nodeType == Node.TEXT_NODE && !w.startContainer.nextSibling && Me == Ae.textContent.length;
                            s = We && !Object(l.isListParagraph)(e._ps[C]) && !t.shiftKey && inArray(Ne.type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), e._setParagraphDirty(C, T)
                        } else t.key && 1 == t.key.length ? (e._setParagraphDirty(C), e._setParagraphDirty(T), t.metaKey || (F = !0, t.key && (Object(l.isCyrillicChar)(t.key) ? u += 1 : Object(l.isLatinChar)(t.key) && (u -= 1), u = Math.min(Math.max(u, -5), 5))), r = Object(l.isWhiteSpaceChar)(t.key), F && !r && (n = !0), setTimeout(function() {
                            var t = Object(l.getRange)(),
                                r = g(t, 2),
                                n = r[0],
                                i = r[1],
                                a = e._getParagraph(C);
                            if (a && (a.type != d.ParagraphType.Code && !!!(Object(_.gpeByTag)("code", n.startContainer) || n.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == n.startContainer.tagName) && (p = p || u > 0, i && n))) {
                                var s = n.startContainer;
                                if (s.nodeType == Node.TEXT_NODE && n.startOffset > 0)
                                    for (var h = s.textContent.substring(n.startOffset - 5, n.startOffset), f = 0, v = c.Sequences.length; f < v; f++) {
                                        var y = c.Sequences[f];
                                        if (void 0 === y.cyrillic || y.cyrillic === p)
                                            if (y.pattern instanceof RegExp) {
                                                var b = h.match(y.pattern);
                                                if (b) {
                                                    var m = y.substitution;
                                                    b.length > 1 && (m = m.replace("$1", b[1])), w.call(e, n.startOffset, s, b[0], m, y.noUndo);
                                                    break
                                                }
                                            } else if (h.endsWith(y.pattern)) {
                                            w.call(e, n.startOffset, s, y.pattern, y.substitution, y.noUndo);
                                            break
                                        }
                                    }
                            }

                            function w(e, t, r, n, i) {
                                var a = this._getCursor(),
                                    s = t.textContent.substring(0, e - r.length),
                                    c = t.textContent.substring(e);
                                i || (o = [t, s + r + c, a]), t.textContent = s + n + c, this._restoreCursor(a), this._setParagraphDirty(C), this._triggerInputEvent()
                            }
                        }, 0)) : !1;
                        o = !1
                    }
                }), this._setEventListener(window, "resize", function() {
                    e._resizeTooltip && e._resizeTooltip.isShown() && e._updatePositionResizeTooltip()
                })
            }
        }, e.prototype._isParagraphEl = function(e) {
            return e && T(e, l.ArticleEditorParagraphClass)
        }, e.prototype._isWithinObjectParagraphEl = function(e) {
            var t = this._getContainingParagraphEl(e),
                r = g(t, 1)[0];
            return r && Object(l.isObjectParagraphEl)(r)
        }, e.prototype._highlightObjectsInCurrentSelection = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 2),
                r = t[0],
                n = t[1];
            !1 !== r && !1 !== n && this._ps.forEach(function(e, t) {
                if (e._object) {
                    var i = r != n;
                    e._object.highlight(t >= r && t <= n, i)
                }
            })
        }, e.prototype._getOrCreateParagraphObject = function(e) {
            e._uuid || (e._uuid = ue());
            var t = this._getObject(e._uuid);
            if (!t) {
                var r = e.mediaId || "";
                switch (parseInt(e.type)) {
                    case d.ParagraphType.ObjectPhoto:
                        t = new n.default(r, this, e);
                        break;
                    case d.ParagraphType.ObjectVideo:
                        t = new i.default(r, this);
                        break;
                    case d.ParagraphType.ObjectGIF:
                        t = new a.default(r, this);
                        break;
                    case d.ParagraphType.ObjectAudio:
                        t = new o.default(r, this);
                        break;
                    case d.ParagraphType.ObjectAudioPlaylist:
                        t = new s.default(r, this)
                }
                this._setObject(e._uuid, t)
            }
            return e._object = t, t
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
                        n = g(r, 3),
                        i = n[0],
                        a = n[1],
                        o = n[2],
                        s = this._getObject(a);
                    if (!s) return;
                    var c = void 0;
                    (c = s.getCaptionEl() ? this._getParagraphFromHTML("", s.getCaptionEl().innerHTML, !0) : Object(l.buildParagraph)())._uuid = a, c.type = i, c.mode = o, c._object = s, this._ps[e] = c
                } else if (t.nodeType == Node.ELEMENT_NODE) {
                    var d = t.tagName.toLowerCase();
                    this._ps[e] = this._getParagraphFromHTML(d, t.innerHTML)
                } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent);
                t.nodeType == Node.ELEMENT_NODE && x(t, "sep") && (this._ps[e].sep = !0)
            }
        }, e.prototype.onDragEnd = function() {
            this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
        }, e.prototype.getCurrentParagraphs = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 2),
                r = t[0],
                n = t[1];
            return [this._getParagraphElByIndex(r), this._getParagraphElByIndex(n)]
        }, e.prototype._initObjectDrag = function() {
            var e = this,
                t = void 0,
                r = void 0,
                n = void 0,
                i = void 0,
                a = !1,
                o = this._els,
                s = void 0;

            function c(e) {
                s != e && (m(geByClass("article_ed__drag_hovered"), function(e, t) {
                    C(t, "article_ed__drag_hovered")
                }), e && w(e, "article_ed__drag_hovered"), s = e)
            }

            function d() {
                window.removeEventListener("mousemove", t), window.removeEventListener("mouseup", r), a = !1, C(o.canvas, "no_select"), clearInterval(i), c(!1), I(n), n = !1
            }
            this._els.canvas.addEventListener("mousedown", function(o) {
                if (n && I(n), 2 == o.button) return d(), cancelEvent(o);
                var s = S(e._els.canvas)[1];
                C(e._els.canvas, "no_select"), c(!1);
                var u = e._getContainingParagraphEl(o.target),
                    p = g(u, 3),
                    h = p[0],
                    f = p[1],
                    v = p[2];
                if (Object(l.isObjectParagraph)(v)) {
                    var y = o.pageY,
                        b = void 0,
                        m = void 0,
                        E = void 0,
                        O = void 0,
                        P = void 0;
                    window.addEventListener("mousemove", t = function(t) {
                        if (n || !(Math.abs(y - t.pageY) < 10)) {
                            n || (n = L('<div class="article_ed__drag_shadow"></div>'), e._els.editor.appendChild(n), (b = k(e._els.canvas))[1] -= scrollGetY(), m = S(h), E = k(h), O = t.pageX - E[0], P = t.pageY - E[1] + e._options.layer.scrollTop, setStyle(n, {
                                width: m[0],
                                height: m[1]
                            }), e._focusParagraph(f)), w(e._els.canvas, "no_select"), b || d(), setStyle(n, {
                                left: t.pageX - b[0] - O,
                                top: t.pageY - scrollGetY() - P - b[1] + e._options.layer.scrollTop
                            }), clearInterval(i), t.pageY - scrollGetY() < 200 ? i = setInterval(function() {
                                e._options.layer.scrollTop -= 10
                            }, 10) : t.pageY - scrollGetY() > window.innerHeight - 200 && (i = setInterval(function() {
                                e._options.layer.scrollTop + window.innerHeight > s + 300 ? clearInterval(i) : e._options.layer.scrollTop += 10
                            }, 10));
                            var r = e._getContainingParagraphEl(t.target),
                                o = g(r, 2),
                                l = o[0],
                                u = o[1];
                            l && l != h && l != Object(_.domPS)(h) ? (c(l), a = u) : (c(!1), a = !1)
                        }
                    }), window.addEventListener("mouseup", r = function() {
                        !1 !== a && f && (e._ps.splice(f, 1), Object(l.hasSeparator)(v) && (e._ps[f].sep = 1, delete v.sep), e._ps.splice(a + 1, 0, v), e._redraw(!0, !0), e.saveUndoStateAndDraft(), e._resizeTooltip && e._resizeTooltip.isShown() && e._resizeTooltip.hide()), d()
                    })
                }
            })
        }, e.prototype.isLocked = function() {
            return !!this.getOptions().editLockMessage
        }, e.prototype.showEditLockInfo = function() {
            this.isLocked() ? (this.showWarningInfo(this.getOptions().editLockMessage), this._els.canvas.removeAttribute("contenteditable"), hide(this._objectPickerEl), this._hideObjectPicker(), this._hideFormatTooltip()) : this.showWarningInfo(!1)
        }, e.prototype.showRevEditInfo = function() {
            nav.objLoc.from_rev && this.showWarningInfo(getLang("pages_article_rev_edit"))
        }, e.prototype.showWarningInfo = function(e) {
            var t = O("article_ed__warn_info", this._els.editor);
            t && !e && (C(this._els.editor, "article_ed__warn_shown"), I(t)), t || e && (t = L('<div class="article_ed__warn_info">' + e + "</div>"), this._els.editor.appendChild(t), w(this._els.editor, "article_ed__warn_shown"))
        }, e.prototype._initResizeTooltip = function() {
            var e = this,
                t = L('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
            this._resizeTooltip = new ElementTooltip(this._els.editor.parentNode, {
                content: t,
                autoShow: !1,
                customShow: !0,
                forceSide: "top",
                cls: "resize-tooltip article_format_tt"
            }), t.addEventListener("click", function(t) {
                if (t.target.classList.contains("article_format_btn")) {
                    var r = parseInt(t.target.dataset.mode);
                    e.setModeCurrentObject(r)
                }
            })
        }, e.prototype._showResizeTooltip = function() {
            var e = this._getCurrentParagraphIndex(),
                t = g(e, 1)[0],
                r = this._getParagraphElByIndex(t),
                n = this._getParagraph(t),
                i = intval(n.type);
            if (d.ResizableObjectTypes.includes(i))
                if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), T(r, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                else if (n._object.isLoading()) this._resizeTooltip.hide();
            else {
                var a = [{
                        id: d.ObjectResizeType.Float,
                        type: "inline"
                    }, {
                        id: d.ObjectResizeType.Normal,
                        type: "text"
                    }, {
                        id: d.ObjectResizeType.Medium,
                        type: "bigger"
                    }, {
                        id: d.ObjectResizeType.Large,
                        type: "cover"
                    }],
                    o = O("resize-tooltip__btns"),
                    s = [1, 1, 1, 1];
                switch (i) {
                    case d.ParagraphType.ObjectPhoto:
                        n._object._isCarousel() ? s = [0, 1, 1, 0] : n._object._isSmallPhotoSize() || (s = [1, 1, 0, 0]);
                        break;
                    case d.ParagraphType.ObjectGIF:
                        n._object._isSmallGifSize() || (s = [1, 1, 0, 0])
                }
                o.innerHTML = "", a.forEach(function(e, t) {
                    s[t] && o.appendChild(L('\n          <button class="article_format_btn' + (n.mode == e.id || !n.mode && !e.id ? " article_format_btn_active" : "") + '" id="article_format_btn_' + e.type + '"  data-mode=' + e.id + " ></button>\n        "))
                }), this._updatePositionResizeTooltip()
            }
        }, e.prototype._updatePositionResizeTooltip = function() {
            var e = this._resizeTooltip,
                t = k(this._els.editor),
                r = g(t, 2)[1],
                n = this._getCurrentParagraphIndex(),
                i = g(n, 1)[0],
                a = this._getParagraphElByIndex(i).getBoundingClientRect(),
                o = a.top,
                s = a.left,
                c = a.width,
                l = S(e._ttel)[0] / 2;
            setStyle(e._ttel, {
                top: o - r - 60 + window.scrollY + 140,
                left: s + c / 2 - l
            })
        }, e.prototype.setModeObject = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d.ObjectResizeType.Normal,
                r = this._getParagraph(e);
            Object(l.isObjectParagraph)(r) && (r.mode = t, this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0, !0), this.saveUndoStateAndDraft())
        }, e.prototype.setModeCurrentObject = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d.ObjectResizeType.Normal,
                t = this._getCurrentParagraphIndex(),
                r = g(t, 1)[0];
            this.setModeObject(r, e)
        }, e.prototype._uploadFloatList = function() {
            var e = this,
                t = k(this._els.editor);
            this._floatedObjects = [], this._ps.forEach(function(r, n) {
                if (r.mode && parseInt(r.mode) === d.ObjectResizeType.Float) {
                    var i = e._getParagraphElByIndex(n),
                        a = i.getBoundingClientRect().height,
                        o = k(i);
                    e._floatedObjects.push({
                        startY: o[1] - t[1],
                        endY: o[1] - t[1] + a
                    })
                }
            })
        }, e.prototype._correctEmptyParagraphAfterFloatObjects = function() {
            for (var e = 0; e < this._ps.length; e++) {
                var t = this._ps[e],
                    r = this._ps[e + 1];
                if (Object(l.isObjectResize)(t) >= 0)
                    if (1 === parseInt(t.mode) && Object(l.isObjectParagraph)(r)) {
                        var n = Object(l.buildParagraph)();
                        n._autoInsert = !0, this._insertParagraphAt(e + 1, n)
                    } else 1 !== parseInt(t.mode) && r && r._autoInsert && this._deleteParagraphFrom(e + 1)
            }
        }, e
    }();
    t.default = pe
}, , , , , function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(31),
        i = r(4),
        a = r(37),
        o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function s(e, t) {
        return e ? '<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="' + t + '">\n      <div class="article_ed__caredit_photo" style="background-image: url(' + e + ')"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>' : '<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">' + getLang("pages_article_ed_carousel_add") + "</div>\n    </button>"
    }
    var c = function() {
        function e(t, r, a, c) {
            var l = this;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var d = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
            d += '\n      <div class="article_ed__caredit_header">\n        <div class="article_ed__caredit_container">\n          ' + getLang("pages_article_ed_carousel_title") + '\n          <div class="article_ed__caredit_header_controls">\n            <div class="article_ed__caredit_header_counter"></div>\n            <button class="flat_button article_ed__caredit_save">' + getLang("global_save") + '</button>\n            <button class="flat_button article_ed__caredit_cancel">' + getLang("global_cancel") + "</button>\n          </div>\n         </div>\n      </div>\n    ", d += '\n      <div class="article_ed__caredit_items_wrap article_ed__caredit_container">\n        <div class="article_ed__caredit_items">\n    ', r.getMediaId().split(",").forEach(function(e) {
                var t = n.default.get(i.ParagraphType.ObjectPhoto, e),
                    r = Object(i.getAppropriateImage)(t.sizes, 251),
                    a = o(r, 1)[0];
                d += s(a, e)
            }), d += s(), d += "  </div>", d += "</div>", d += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(d), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", function() {
                showBox("al_photos.php", {
                    to_id: r.getEditor().getArticleOwnerId(),
                    act: "choose_photo",
                    max_files: l._limit - l._medias.length,
                    article: 1
                }, {
                    cache: 1,
                    stat: ["photos.js", "photos.css", "upload.js"]
                });
                cur.chooseMedia = l.onPhotoAdd.bind(l), cur.showMediaProgress = function() {
                    show(l._els.loading), r.getEditor().setMediaUploadMode(!0)
                }, cur.choosePhotoUploadedAll = function() {
                    hide(l._els.loading), r.getEditor().setMediaUploadMode(!1)
                }
            }), this._els.saveButton.addEventListener("click", function() {
                re(l._els.editor), a(l._medias.join(","))
            }), this._onSave = a, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", function(e) {
                if (hasClass(e.target, "article_ed__caredit_remove")) {
                    var t = gpeByClass("article_ed__caredit_item", e.target);
                    re(t), l._collectMediaIds(), l._initSorter(), l._toggleAddButton(), l._updateCounter()
                }
            }), t.appendChild(this._els.editor), setStyle(this._els.itemsWrap, {
                height: getSize(this._els.itemsWrap)[1]
            }), this._initSorter(), this._scroll = new uiScroll(this._els.itemsWrap, {
                global: !0,
                stopScrollPropagation: !0,
                stopScrollPropagationAlways: !0,
                theme: "dark"
            }), this._limit = c, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
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
                n && e._medias.push(n)
            }), this._medias = this._medias.slice(0, this._limit), this._medias
        }, e.prototype.onPhotoAdd = function(e, t, r, c) {
            if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                n.default.add(i.ParagraphType.ObjectPhoto, t, {
                    size: Object(a.getPhotoSize)(r.editable.sizes),
                    sizes: r.editable.sizes
                });
                var l = Object(i.getAppropriateImage)(r.editable.sizes, 251),
                    d = o(l, 1)[0];
                domInsertBefore(se(s(d, t)), this._els.addButton)
            }
            return void 0 === c && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
        }, e.prototype._initSorter = function() {
            var e = this;
            this._sorter ? this._sorter.update() : stManager.add(["grid_sorter.js"], function() {
                e._sorter = new GridSorter(e._els.items, "", {
                    onReorder: function() {
                        e._collectMediaIds()
                    }
                })
            })
        }, e
    }();
    t.default = c
}]);