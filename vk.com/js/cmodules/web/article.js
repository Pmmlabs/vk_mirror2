! function(e) {
    var t = {};

    function r(i) {
        if (t[i]) return t[i].exports;
        var n = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, i) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
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
        var i = Object.create(null);
        if (r.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) r.d(i, n, function(t) {
                return e[t]
            }.bind(null, n));
        return i
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 113)
}({
    103: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Sequences", function() {
            return i
        });
        var i = [{
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
    104: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(123),
            n = r(6),
            a = r(11);
        var o = function(e) {
            function t(r, i) {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, r, i, !0))
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
                var e = n.default.get(a.ParagraphType.ObjectAudio, this.getMediaId()).audio,
                    t = AudioUtils.drawAudio(e);
                return this._el = se('\n      <div class="article_object_audio">' + t + "</div>\n    "), this._el
            }, t
        }(i.default);
        t.default = o
    },
    11: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "ParagraphType", function() {
            return i
        }), r.d(t, "ResizableObjectTypes", function() {
            return n
        }), r.d(t, "ObjectResizeType", function() {
            return a
        }), r.d(t, "getAppropriateImage", function() {
            return s
        }), r.d(t, "preloadImage", function() {
            return l
        }), r.d(t, "mailruStatsPixel", function() {
            return d
        });
        var i = {
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
            n = [i.ObjectPhoto, i.ObjectGIF, i.ObjectVideo],
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
            var i = [];
            if (o(e, function(e, t) {
                    r && -1 == ["w", "z", "y", "x", "m", "s"].indexOf(e) || i.push(t)
                }), !i.length) return [!1];
            i.sort(function(e, t) {
                return e[1] - t[1]
            }), t *= window.devicePixelRatio >= 2 ? 2 : 1;
            var n = i[i.length - 1];
            return o(i, function(e, r) {
                if (r[1] >= t) return n = r, !1
            }), n
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
    },
    110: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return e._saveChunk = function(e, t, r, i, n) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: i,
                    chunk_index: r,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: function(e) {
                        n(e)
                    },
                    onError: function() {
                        n(!0)
                    }
                })
            }, e._saveFinally = function(e, t, r, i, n, a, o, s, c, l) {
                c = c ? JSON.stringify(c) : "", ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: n,
                    name: i,
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
            }, e.save = function(t, r, i, n, a, o, s, c, l, d) {
                var u = [],
                    p = [],
                    h = 0;
                if (i.forEach(function(e) {
                        var t = 0;
                        e.lines.forEach(function(e) {
                            t += e.text.length, e.decorations && e.decorations.link && e.decorations.link.forEach(function(e) {
                                t += (e[2] || "").length
                            })
                        }), (h += t) >= c && (u.push(p), h = t, p = []), p.push(e)
                    }), p.length && u.push(p), u.length > 1) {
                    var f = new callHub(function() {
                        e._saveFinally(t, r, n, a, o, l, s, u.length, !1, d)
                    }, u.length);
                    u.forEach(function(r, i) {
                        e._saveChunk(t, r, i, s, function(e) {
                            e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : f.done()
                        })
                    })
                } else e._saveFinally(t, r, n, a, o, l, s, 0, i, d)
            }, e
        }();
        t.default = i
    },
    113: function(e, t, r) {
        e.exports = r(30)
    },
    123: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(28),
            n = (r(11), function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
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
                function e(t, r, i) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._mediaId = t, this._editor = r, this._highlighted = !1, this._isCaptioned = !!i, o = this.getEditor().getOptions().multiMediasSeparator
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
                            var n = getSize(r),
                                a = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>');
                            setStyle(a, {
                                width: n[0] + 0,
                                height: n[1] + 0
                            }), addClass(r, "article_ed__object_highlighted")
                        } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted");
                        if (this._isCaptioned)
                            if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || Object(i.focusEl)(this._getCaptionEl());
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
                            n = browser.mozilla ? 'contenteditable="' + r + '"' : 'contenteditable="false"';
                        this._objectEl = se("<figure " + n + "></figure>");
                        var o = this.renderExtraControlsEl();
                        if (o) {
                            var s = se('<div class="article_ed__img_wrapper"></div>'),
                                c = se('<div class="article_ed__img_inner"></div>');
                            o.setAttribute("contenteditable", "false"), addClass(o, "article_ed__extra_controls"), c.appendChild(t), c.appendChild(o), s.appendChild(c), this._objectEl.appendChild(s)
                        } else this._objectEl.appendChild(t);
                        this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption" contenteditable="false">\n          <div class="article_ed__figcaption_edit" contenteditable="' + r + '"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), a && t.addEventListener("click", function() {
                            e.highlight(!0), Object(i.focusEl)(t)
                        })
                    }
                    return this._setLoadingEl(), this._objectEl
                }, e.prototype.renderExtraControlsEl = function() {
                    return !1
                }, e.prototype.setLoadingState = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    !!this._isLoading != e && (this._isLoading = e, this._setLoadingEl(t), toggleClass(this._objectEl, "article_ed__object_loading", e), e || this.getEditor().onObjectStateLoaded(this))
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
                        t = Object(i.getRange)(),
                        r = n(t, 2),
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
    },
    129: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(81),
            n = r(58),
            a = r(82),
            o = r(104),
            s = r(50),
            c = r(103),
            l = r(28),
            d = r(11),
            u = r(133),
            p = r(24),
            h = r(110),
            f = r(6),
            _ = r(65),
            g = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var v = window,
            y = v.cur,
            m = v.browser,
            b = v.each,
            w = v.addClass,
            P = v.geByTag1,
            C = v.geByClass1,
            E = v.extractUrls,
            O = v.removeClass,
            T = v.domClosestByTag,
            j = v.hasClass,
            x = v.domData,
            S = v.getSize,
            I = v.getXY,
            k = v.re,
            L = v.se,
            A = v.domInsertBefore,
            M = v.traverseParent,
            N = v.extend,
            D = v.toggleClass,
            R = v.trim,
            B = v.domInsertAfter,
            z = v.gpeByClass,
            H = v.clean,
            U = v.domReplaceEl,
            F = v.isObject,
            W = v.ge,
            Y = v.domChildIndex,
            $ = v.domNS,
            V = 65,
            q = 66,
            G = 67,
            Q = 73,
            X = 83,
            K = 90,
            J = 8,
            Z = 13,
            ee = 38,
            te = 40,
            re = 46,
            ie = 9,
            ne = [{
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
            ae = ne.slice().reverse(),
            oe = {};
        b(ne, function(e, t) {
            oe[t.tag] = t
        });
        var se = {};
        b(ne, function(e, t) {
            se[t.type] = t
        });
        var le = 1;

        function de() {
            return le++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        var ue = function() {
            function e(t, r, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._id = de(), y.lang = y.lang || {}, N(y.lang, n.lang), this._options = n, this._els = {
                    editor: W(t),
                    canvas: L('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = L('<div class="article_photo_upload"></div>')), w(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._objects = {}, this._floatedObjects = [], Object(p.initLimits)(n.limits);
                var a = i || [];
                if (n.postData) {
                    var o = n.postData.text || "";
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
                                text: H(e)
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
                }), n.needIndexCorrection && Object(l.correctRealIndexes)(a, 1), this.initParagraphs(a), this._updateTextPlaceholders(), this._initObjectDrag(), n.postData ? Object(l.focusEl)(this._getParagraphElByIndex(0)) : this._restoreLastCursor(), this.saveDraft(!1, !0), n.coverPhoto && this.setCoverPhoto(n.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this.updateWarnInfos(), this._publishNameCandidate = n.name || this._getName(), this._saveUndoState(), stManager.add("audio.js")
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
                    this._els.placeholders || (this._els.placeholders = L('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = L("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = L("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders)), Object(l.isParagraphEmpty)(this._ps[0]) ? O(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : w(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var e = this._ps[1],
                        t = !!e && e.sep,
                        r = this._getCurrentParagraphIndex(),
                        i = g(r, 1)[0];
                    Object(l.isParagraphEmpty)(e) && (!e || e.type != d.ParagraphType.Code) && i < 2 && this._ps.length <= 2 && !t ? O(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : w(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }, e.prototype.destroy = function() {
                this._els.editor.innerHTML = "", O(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._resizeTooltip && this._resizeTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events = this._events || [], this._events.forEach(function(e) {
                    e.el.removeEventListener(e.event, e.handler)
                }), delete y.docsCurFilter
            }, e.prototype.getLimits = function() {
                return this._options.limits
            }, e.prototype.getOptions = function() {
                return this._options
            }, e.prototype.canResizeObjects = function() {
                return this._options.canResizeObjects
            }, e.prototype.getWidth = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return S(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
            }, e.prototype.getPhotoUploadOptions = function() {
                return this._options.photoUploadOptions
            }, e.prototype.getPhotoUploadEl = function() {
                return this._photoUploadEl
            }, e.prototype.removeObject = function(e) {
                var t = this;
                b(this._ps, function(r, i) {
                    if (i._object == e) {
                        var n = t._getParagraphElByIndex(r + 1);
                        return Object(l.focusEl)(n), k(t._getParagraphElByIndex(r)), t._setAllParagraphsDirty(), t._triggerInputEvent(), !1
                    }
                })
            }, e.prototype._parseUrlParagraph = function(e) {
                var t = this,
                    r = this._getParagraph(e);
                if (r && r.type == d.ParagraphType.Text && r.lines.length && r.lines[0].text) {
                    var i = E(r.lines[0].text, !0),
                        n = i && i.length ? i[0].url : "";
                    if (n && r.lines[0].text == n) {
                        var a = this._getCurrentParagraphIndex(),
                            o = g(a, 1)[0];
                        k(this._els.shareParseForm), k(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(L('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                            value: n
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
                                    i = {},
                                    n = e[2];
                                switch (e[0]) {
                                    case "audio_playlist":
                                        r = d.ParagraphType.ObjectAudioPlaylist, i = {
                                            accessHash: n.accessHash
                                        }, e[1] = n.ownerId + "_" + n.id;
                                        break;
                                    case "doc":
                                        "gif" == n.ext && (r = d.ParagraphType.ObjectGIF, i = {
                                            size: n.video_preview_size,
                                            video: n.video_preview,
                                            href: n.href
                                        });
                                        break;
                                    case "photo":
                                        r = d.ParagraphType.ObjectPhoto, i = {
                                            size: Object(l.getPhotoSize)(n.editable.sizes),
                                            sizes: n.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        r = d.ParagraphType.ObjectVideo, i = {
                                            fromExtPage: intval(n.from_ext_page),
                                            editable: n.editable,
                                            duration: n.editable.duration,
                                            platform: n.editable.platform
                                        }
                                }
                                if (r) {
                                    var a = Object(l.hasSeparator)(t._ps[o]),
                                        s = {
                                            mediaId: e[1],
                                            type: r,
                                            sep: a
                                        };
                                    f.default.add(r, s.mediaId, i), t._linkTooltip && t._linkTooltip.hide(), s = Object(l.buildParagraph)(s), t._getOrCreateParagraphObject(s), t._ps[o] = s;
                                    var c = t._getCursor();
                                    t._redrawModel(), t._restoreCursor(c), t._saveUndoState(), setTimeout(function() {
                                        t.onObjectStateLoaded()
                                    }, 10)
                                }
                            }
                        }, this._els.shareParseForm.submit()
                    }
                }
            }, e.prototype._handleObjectPaste = function(e) {
                var t = (e.clipboardData || e.originalEvent.clipboardData).getData("text/plain");
                if (t) {
                    var r = t.split(":"),
                        i = g(r, 2),
                        n = i[0],
                        a = i[1];
                    if ("uuid" == n && a) {
                        var o = domQuery1('[data-uuid="' + a + '"]');
                        if (o) {
                            var s = o.cloneNode(!0);
                            s.setAttribute("data-force-update", "1");
                            var c = this._getCurrentParagraphIndex(),
                                l = g(c, 1)[0];
                            B(s, this._getParagraphElByIndex(l)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                        }
                    }
                }
            }, e.prototype._handleLinkPaste = function(e) {
                var t = this,
                    r = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (var i in r)
                    if (r.hasOwnProperty(i)) {
                        var n = r[i];
                        "string" === n.kind && function() {
                            var e = t._getCurrentParagraphIndex(),
                                r = g(e, 1)[0];
                            n.getAsString(function(e) {
                                var i = E(e, !0);
                                if (1 === i.length) {
                                    var n = i[0].url,
                                        a = t._getParagraphElByIndex(r);
                                    Object(l.traverseTree)(a, function(e) {
                                        if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(n) >= 0 && !M(e, function(e) {
                                                return e.tagName && "a" == e.tagName.toLowerCase()
                                            }, 3)) {
                                            t._saveCursorMarker();
                                            var i = document.createRange();
                                            i.setStart(e, e.textContent.indexOf(n)), i.setEnd(e, e.textContent.indexOf(n) + n.length);
                                            var a = window.getSelection();
                                            a.removeAllRanges(), a.addRange(i), t._setParagraphDirty(r), document.execCommand("createLink", !1, n), t._restoreCursorFromMarker()
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
                for (var i in r)
                    if (r.hasOwnProperty(i)) {
                        var n = r[i];
                        "file" === n.kind && function() {
                            t._photoPasteUploadingProcess = !0;
                            var e = n.getAsFile(),
                                r = new FileReader;
                            r.onload = function() {
                                t._photoPasteUploadingProcess = !1;
                                var i = t._getCurrentParagraphIndex(),
                                    n = g(i, 1)[0];
                                n = n || 0;
                                var a = Object(l.buildParagraph)({
                                    type: d.ParagraphType.ObjectPhoto
                                });
                                t._getOrCreateParagraphObject(a).setBLOB(e);
                                var o = void 0;
                                Object(l.isParagraphEmpty)(t._ps[n]) ? (o = n, Object(l.hasSeparator)(t._ps[o]) && (a.sep = 1), t._ps[o] = a) : (o = n + 1, t._insertParagraphAt(o, a)), t._redraw(!0, !0);
                                var s = new Image;
                                s.onload = function() {
                                    t._focusParagraph(o + 1), t._showObjectPicker()
                                }, s.src = r.result, t.saveUndoStateAndDraft()
                            }, r.readAsDataURL(e)
                        }()
                    }
            }, e.prototype._getCurrentSelectionState = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = g(e, 2),
                    r = t[0],
                    i = t[1];
                if (!1 === r || !1 === i) return !1;
                for (var n = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        list: !1,
                        justHeaders: !0
                    }, a = {}, o = 0, s = void 0, c = void 0, u = r; u <= i && u < this._ps.length; u++) {
                    var p = Object(l.isObjectParagraph)(this._ps[u]) ? this._ps[u]._object.getCaptionEl() : this._getParagraphElByIndex(u);
                    if (void 0 === s) {
                        var h = getCaretCharacterOffsetWithin(p),
                            f = g(h, 2);
                        s = f[0], c = f[1]
                    }
                    this._ps[u].lines.forEach(function(e) {
                        var t = e.decorations;
                        ne.forEach(function(r) {
                            var i = t[r.type];
                            i && !isEmpty(i) && i.forEach(function(t) {
                                var i = [t[0] + o, t[1] + o];
                                if ("link" == r.type) s < i[1] && c > i[0] && (a[r.type] = 1, n.decorations[r.type] = !0);
                                else if (1 == a[r.type]) {
                                    c > i[1] || (c >= i[0] && c <= i[1] ? t[0] > 0 ? a[r.type] = -1 : (a[r.type] = 2, n.decorations[r.type] = !0) : a[r.type] = -1)
                                } else if (!a[r.type]) {
                                    var l = s >= i[0] && s <= i[1];
                                    l && (c >= i[0] && c <= i[1]) ? (a[r.type] = 2, n.decorations[r.type] = !0) : l && (e.text.length > i[1] ? a[r.type] = -1 : a[r.type] = 1)
                                }
                            })
                        }), o += e.text.length
                    })
                }
                for (var _ = r; _ <= i && _ < this._ps.length; _++) Object(l.isObjectParagraph)(this._ps[_]) && (n.captionFocused = n.captionFocused || this._ps[_]._object.isCaptionFocused(), n.object = !0), this._ps[_].type == d.ParagraphType.Header1 && (n.header1 = !0), this._ps[_].type != d.ParagraphType.Header2 && (n.header2 = !1), this._ps[_].type != d.ParagraphType.Header3 && (n.header3 = !1), inArray(this._ps[_].type, [d.ParagraphType.Header1, d.ParagraphType.Header2, d.ParagraphType.Header3]) ? n.header = !0 : n.justHeaders = !1, inArray(this._ps[_].type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) || (n.quote = !1), inArray(this._ps[_].type, [d.ParagraphType.BulletList, d.ParagraphType.NumericList]) && (n.list = !0);
                var v = Object(l.getRange)(),
                    y = g(v, 1)[0];
                return !(y && y.startContainer && j(y.startContainer, "article_ed__noconteditable")) && (n.multiline = r != i, n)
            }, e.prototype._hideFormatTooltip = function() {
                this._formatTooltip && this._formatTooltip.hide()
            }, e.prototype._showFormatTooltip = function() {
                if (!this.isLocked()) {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var e = window.getSelection();
                        if (e.focusNode && (j(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase())) return;
                        var t = !e.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, t), 1)
                    } catch (e) {}
                }
            }, e.prototype._doShowFormatTooltip = function(e) {
                var t = this;
                if (!this._formatTooltip) {
                    var r = L('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                        i = void 0;
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: r,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: function() {
                            var e = t._getCurrentSelectionState(),
                                i = [];
                            if (!e || e.header1 || e.object && !e.captionFocused || (e.justHeaders || i.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || i.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), i.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? i.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : i.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (i.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), i.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), i.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 != i.length) {
                                var n = C("article_format_btns", r);
                                n.innerHTML = "", i.forEach(function(e, t) {
                                    t > 0 && inArray(e[0], ["header1"]) && n.appendChild(L('<div class="article_format_divider"></div>'));
                                    var r = e[2] ? "article_format_btn_active" : "";
                                    n.appendChild(L('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                                }), t.setLinkMode(!1)
                            } else t._formatTooltip.hide()
                        },
                        getTargetBoundingBox: function() {
                            if (t._formatTooltip.linkMode) return i;
                            var e = Object(l.getRange)(),
                                r = g(e, 3),
                                n = r[0],
                                a = r[2];
                            if (!a || !a.rangeCount) return i;
                            var o = n.getBoundingClientRect();
                            if (!o.left) {
                                var s = n.startContainer.nodeType == Node.ELEMENT_NODE ? n.startContainer : domPN(n.startContainer),
                                    c = I(s),
                                    d = S(s);
                                return i = {
                                    top: c[1] + scrollGetY(),
                                    left: c[0] + d[0] / 2,
                                    width: o.width,
                                    height: o.height
                                }
                            }
                            return i = {
                                top: o.top + scrollGetY(),
                                left: o.left,
                                width: o.width,
                                height: o.height
                            }
                        }
                    }), this._formatTooltip.linkMode = !1;
                    var n = P("input", r);
                    n.addEventListener("keypress", function(e) {
                        if (e.keyCode == Z) return t._setLinkToSelectedText(n.value.trim()), t._formatTooltip.hide(), cancelEvent(e)
                    }), C("article_set_link_delete", r).addEventListener("click", function(e) {
                        return t._setLinkToSelectedText(), cancelEvent(e)
                    })
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }, e.prototype._setLinkToSelectedText = function(e) {
                if (e) {
                    if (!(e = (e = e.substr(0, 1500)).replace("#", "%23").replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, "")).match("^https?://")) e = (Object(l.isVKUrl)(e) ? "https" : "http") + "://" + e;
                    e = encodeURIComponent(e)
                }
                this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), !m.msie && e || this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor), this._linkCursor
            }, e.prototype.clearLink = function() {
                this.setLinkMode(!1);
                var e = Object(l.getRange)(),
                    t = g(e, 3),
                    r = t[0],
                    i = t[2],
                    n = T("a", r.startContainer),
                    a = T("a", r.endContainer) || n;
                n && (this._saveCursorMarker(), i.setBaseAndExtent(n, 0, a, Math.max(1, a.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }, e.prototype.setLinkMode = function(e, t) {
                var r = void 0;
                e && (r = this._getCursor(), m.msie || document.execCommand("superscript", !1, !0));
                var i = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var n = P("input", i);
                        n.value = "", w(i, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), n.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(i, {
                        width: null
                    }), O(i, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }, e.prototype.setHeader1 = function(e) {
                this._setHeader(d.ParagraphType.Header2, !e)
            }, e.prototype.setHeader2 = function(e) {
                this._setHeader(d.ParagraphType.Header3, !e)
            }, e.prototype.setQuote = function() {
                var e = this._getCursor(),
                    t = this._getCurrentParagraphIndex(),
                    r = g(t, 2),
                    i = r[0],
                    n = r[1];
                if (!1 !== i) {
                    n || (n = i);
                    for (var a = d.ParagraphType.Text, o = i; o <= n; o++)
                        if (u(this._ps[o])) {
                            a = this._ps[o].type == d.ParagraphType.Quote ? d.ParagraphType.Quote2 : this._ps[o].type == d.ParagraphType.Quote2 ? d.ParagraphType.Text : d.ParagraphType.Quote;
                            break
                        }
                    for (var s = i; s <= n; s++) {
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
                    i = this._getCurrentParagraphIndex(),
                    n = g(i, 2),
                    a = n[0],
                    o = n[1];
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
                this._setAllParagraphsDirty(), document.execCommand("bold"), m.msie && this._triggerInputEvent()
            }, e.prototype.setEm = function() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), m.msie && this._triggerInputEvent()
            }, e.prototype.setStrike = function() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), m.msie && this._triggerInputEvent()
            }, e.prototype.saveUndoStateAndDraft = function() {
                this._saveUndoState(), this.saveDraft()
            }, e.prototype._saveUndoStateDelayed = function() {
                var e = this;
                clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = setTimeout(function() {
                    e._saveUndoState()
                }, 1e3)
            }, e.prototype._saveUndoState = function() {
                if (clearTimeout(this._saveUndoDelayedTO), this._saveUndoDelayedTO = !1, this._undoStatePrev) {
                    if (this._undos.length) {
                        var e = this._undos[this._undos.length - 1];
                        if (JSON.stringify(e) == JSON.stringify(this._undoStatePrev)) return void delete this._undoStatePrev
                    }
                    this._undos.push({
                        ps: this._undoStatePrev,
                        cursor: this._undoStateCursorPrev
                    }), this._undos.length > 50 && this._undos.shift()
                }
                this._undoStatePrev = Object(u.getCleanedState)(this._ps, !0), this._undoStateCursorPrev = this._getCursor()
            }, e.prototype._undo = function() {
                if (this._saveUndoDelayedTO && this._saveUndoState(), this._undos.length) {
                    var e = this._undos.pop();
                    this._ps = Object(u.expandParagraphFields)(e.ps), this._redraw(!0), this._restoreCursor(e.cursor), this._updateTextPlaceholders(), delete this._undoStatePrev, this._saveUndoState()
                }
            }, e.prototype.initParagraphs = function(e) {
                e.forEach(function(e) {
                    e._preparedData && (e.mediaId.split(",").forEach(function(t, r) {
                        f.default.add(e.type, t, e._preparedData[r])
                    }), delete e._preparedData)
                }), this._ps = Object(u.expandParagraphFields)(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }, e.prototype._getParagraphFromHTML = function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

                function i(t, r) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var n = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        r.text += "pre" == e ? n : Object(l.cleanTextSpaces)(n)
                    } else Object(l.isBR)(t) && r.text.length > 0 && r.brs.push(r.text.length);
                    b(t.childNodes, function(e, t) {
                        var n = [r.text.length];
                        i(t, r), n.push(r.text.length);
                        var a = (t.tagName || "").toLowerCase();
                        t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (a = "strong");
                        var o = void 0;
                        switch (a) {
                            case "b":
                            case "strong":
                                o = se.strong;
                                break;
                            case "em":
                            case "i":
                                o = se.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                o = se.strike;
                                break;
                            case "a":
                                o = se.link, n.push(Object(l.decodeURL)(t.getAttribute("href") || ""));
                                break;
                            case "code":
                                o = se.code;
                                break;
                            case "font":
                                var s = t.getAttribute("face");
                                "monospace" === s ? o = se.code : "times" === s && (o = se.code)
                        }
                        o && (r.decorations[o.type] = r.decorations[o.type] || [], n[0] < n[1] && r.decorations[o.type].push(n), r.decorations[o.type] = Object(l.mergeRanges)(r.decorations[o.type]))
                    })
                }
                var n = document.createElement("div");
                n.innerHTML = t;
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
                    for (var c = 0, u = n.children.length; c < u; c++) {
                        var p = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        i(n.children[c], p), p.brs = Object(l.cleanBRs)(p.brs), a.push(p)
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
                    var h = n.firstElementChild;
                    if (Object(l.isObjectParagraphEl)(h)) {
                        var f = x(h, "type"),
                            _ = x(h, "media-id");
                        f && _ && (n = P("figure", h), o = f, s.mediaId = _)
                    }
                    var g = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    i(n, g), g.brs = Object(l.cleanBRs)(g.brs, g.text.length), a.push(g), o == d.ParagraphType.Code && delete g.decorations.code, r || o != d.ParagraphType.Text || "```" != g.text || 0 != g.brs.length || (g.text = "", o = d.ParagraphType.Code), Object(l.isHeaderParagraph)(o) || (0 == g.text.indexOf("1. ") ? (o = d.ParagraphType.NumericList, this._removeParagraphLineTextPart(g, 0, "1. ".length)) : 0 == g.text.indexOf("* ") && (o = d.ParagraphType.BulletList, this._removeParagraphLineTextPart(g, 0, "* ".length))), g.brs = g.brs.filter(function(e) {
                        return e > 0
                    })
                }
                return s.lines = a, s.type = o, Object(l.buildParagraph)(s)
            }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
                e.text = e.text.substring(0, t) + e.text.substring(r);
                for (var i = r - t, n = 0, a = e.brs.length; n < a; n++) {
                    var o = e.brs[n];
                    o > t && o < r ? e.brs[n] = void 0 : e.brs[n] > t && e.brs[n] >= r && (e.brs[n] -= i)
                }
                e.brs = e.brs.filter(function(e) {
                    return void 0 !== e
                }), b(e.decorations, function(n, a) {
                    a.forEach(function(e) {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= i) : (e[0] -= i, e[1] -= i))
                    }), e.decorations[n] = e.decorations[n].filter(function(e) {
                        return void 0 !== e[0]
                    })
                })
            }, e.prototype._renderObjectParagraph = function(e, t) {
                var r = this._getOrCreateParagraphObject(e),
                    i = r.el(),
                    n = parseInt(e.mode) || 0;
                return r.onRender && r.onRender(), r.setCaptionElHtml(t), x(i, "uuid", e._uuid), x(i, "type", e.type), x(i, "media-id", e._object.getMediaId()), x(i, "mode", n), w(i, l.ArticleEditorParagraphClass), i
            }, e.prototype._renderParagraphLines = function(e, t) {
                if (!e.lines) return ["", ""];
                var r = "",
                    i = "",
                    n = "",
                    a = "",
                    o = parseInt(e.type);
                switch (o) {
                    case d.ParagraphType.NumericList:
                        i = "ol", n = "li";
                        break;
                    case d.ParagraphType.BulletList:
                        i = "ul", n = "li";
                        break;
                    case d.ParagraphType.Header1:
                        n = "h1";
                        break;
                    case d.ParagraphType.Header2:
                        n = "h2";
                        break;
                    case d.ParagraphType.Header3:
                        n = "h3";
                        break;
                    case d.ParagraphType.Quote:
                        n = "blockquote";
                        break;
                    case d.ParagraphType.Quote2:
                        n = "cite";
                        break;
                    case d.ParagraphType.Code:
                        n = "pre";
                        break;
                    default:
                        i = "p"
                }
                return e.lines.forEach(function(i) {
                    var s = i.text,
                        c = i.decorations,
                        u = [];

                    function p(e) {
                        return e[2] || !0
                    }
                    b(ne, function(e, t) {
                        if (!Object(l.isHeaderParagraph)(o) && o != d.ParagraphType.Code || "code" != t.type) {
                            var r = c[t.type];
                            if (r)
                                for (var i = function(e, i) {
                                        var n = r[i];
                                        (u[n[0]] = u[n[0]] || {
                                            open: {},
                                            close: {}
                                        }).open[t.type] = p(n);
                                        var a = u[n[1]] = u[n[1]] || {
                                                open: {},
                                                close: {}
                                            },
                                            o = function(e, t) {
                                                for (var r = []; e > 0;) {
                                                    var i = u[--e];
                                                    if (i)
                                                        for (var n in i.open)
                                                            if (i.open.hasOwnProperty(n)) {
                                                                if (n == t) return [];
                                                                r.push(n)
                                                            }
                                                }
                                                return r
                                            }(n[1], t.type);
                                        o.forEach(function(e) {
                                            a.close[e.type] = !0
                                        }), a.close[t.type] = !0, o.forEach(function(e) {
                                            a.open[e.type] = p(n)
                                        })
                                    }, n = 0, a = r.length; n < a; n++) i(0, n)
                        }
                    });
                    var h = 0,
                        f = [];
                    u.forEach(function(t, r) {
                        if (t) {
                            var n = !1,
                                a = t.close.link && 1 == Object.keys(t.close).length;
                            r > 0 && (n = Object(l.prepareLineText)(s, h, r, i.brs, e.type == d.ParagraphType.Code), a || f.push(n));
                            var o = 0;
                            a && (n && n.endsWith("<br/>") && (o++, n = n.replace(/<br\/>$/, "")), n && n.endsWith("<br/>") && (o++, n = n.replace(/<br\/>$/, "")), !1 !== n && f.push(n)), b(ae, function(e, r) {
                                void 0 !== t.close[r.type] && f.push("</" + r.tag + ">")
                            }), f.push("<br/>".repeat(o)), b(ne, function(e, r) {
                                var i = t.open[r.type];
                                void 0 !== t.open[r.type] && (!0 === i ? f.push("<" + r.tag + ">") : f.push("<" + r.tag + ' href="' + H(i) + '">'))
                            }), h = r
                        }
                    }), f.push(Object(l.prepareLineText)(s, h, void 0, i.brs, e.type == d.ParagraphType.Code)), n && (r += "<" + n + (a = a ? " " + a : "") + ">"), inArray(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "<p>"), r += f.join("") || (t ? "" : "<br/>"), inArray(o, [d.ParagraphType.Quote, d.ParagraphType.Quote2]) && (r += "</p>"), n && (r += "</" + n + ">")
                }), [i, r]
            }, e.prototype._renderParagraph = function(e) {
                var t = Object(l.isObjectParagraph)(e),
                    r = this._renderParagraphLines(e, t),
                    i = g(r, 2),
                    n = i[0],
                    a = i[1],
                    o = void 0;
                return o = t ? this._renderObjectParagraph(e, a) : L(n ? "<" + n + ">" + a + "</" + n + ">" : a), Object(l.hasSeparator)(e) ? x(o, "sep", Object(l.genSepatorId)()) : x(o, "sep", null), w(o, l.ArticleEditorParagraphClass), w(o, "article_paragraph"), o
            }, e.prototype._getParagraphElByIndex = function(e) {
                return !1 === e ? null : this._els.canvas.childNodes[e] || null
            }, e.prototype._getParagraph = function(e) {
                return e < this._ps.length ? this._ps[e] : null
            }, e.prototype._decorateParagraphEls = function() {
                for (var e = 0, t = this._ps.length; e < t; e++) {
                    var r = e > 0 && this._ps[e - 1],
                        i = this._ps[e],
                        n = e + 1 < t && this._ps[e + 1],
                        a = !1,
                        o = !1,
                        s = !1;
                    r && i.type == r.type || (a = !0), n && i.type == n.type || (o = !0), d.ResizableObjectTypes.includes(+n.type) && (s = !0);
                    var c = this._getParagraphElByIndex(e);
                    D(c, "article_decoration_first", a), D(c, "article_decoration_last", o), D(c, "article_decoration_before", s)
                }
            }, e.prototype._redraw = function(e, t) {
                var r = this,
                    i = this._getCursor();
                e ? (this._els.canvas.innerHTML = "", this._ps.forEach(function(e) {
                    r._els.canvas.appendChild(r._renderParagraph(e)), e._object && e._object._isCarousel && e._object._isCarousel() && e._object._rerender()
                })) : this._dirty.forEach(function(e) {
                    if (!(e >= r._ps.length)) {
                        var t = r._getParagraph(e);
                        t._object && t._object._isCarousel && t._object._isCarousel() && t._object._rerender();
                        var i = r._getParagraphElByIndex(e),
                            n = r._renderParagraph(r._ps[e]);
                        i ? n.outerHTML != i.outerHTML && U(i, n) : r._els.canvas.appendChild(n)
                    }
                }), t && this._restoreCursor(i), this._decorateParagraphEls(), this._dirty = []
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
                        i = g(r, 2)[1],
                        n = t.endContainer;
                    if (0 === t.endOffset && (this._isParagraphEl(n) || this._isParagraphEl(domPN(n)) && 0 == Object(l.childNodeIndex)(n))) {
                        var a = this._getContainingParagraphEl(n),
                            o = g(a, 1)[0];
                        n = Object(_.domPS)(o) || o
                    }
                    var s = this._getContainingParagraphEl(n),
                        c = g(s, 2)[1];
                    return [i, Math.max(i, c)]
                }
                return [0, !1]
            }, e.prototype._saveCursorMarker = function() {
                if (!this._markerCursorSet) {
                    var e = Object(l.getRange)(),
                        t = g(e, 2),
                        r = t[0],
                        i = t[1];
                    if (!r) return [0, 0];
                    var n = r.startContainer,
                        a = r.startOffset,
                        o = r.endContainer,
                        s = r.endOffset;
                    if (n != this._els.canvas) {
                        var c = this._getContainingParagraphEl(n)[1];
                        d(n, a, l.CURSOR_MARKER_START), i || (this._getContainingParagraphEl(o)[1] == c && o.textContent.includes(l.CURSOR_MARKER_START) && (s += 1), d(o, s, l.CURSOR_MARKER_END)), this._markerCursorSet = !0
                    }
                }

                function d(e, t, r) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var i = e.textContent;
                        e.textContent = i.substring(0, t) + r + i.substring(t)
                    } else {
                        var n = document.createTextNode(r);
                        e.insertBefore(n, e.childNodes[t])
                    }
                }
            }, e.prototype._restoreCursorFromMarker = function() {
                var e = this;
                if (this._markerCursorSet) {
                    var t = function(e, t, r) {
                            return function t(i) {
                                if (i.nodeType == Node.TEXT_NODE) {
                                    var n = i.textContent.indexOf(e);
                                    if (n >= 0) {
                                        i.textContent = i.textContent.split(e).join("");
                                        var a = i.parentElement;
                                        return -1 != a.innerHTML.search(/\s$/) && (a.innerHTML = a.innerHTML.trimRight() + l.NBSP, r && r[0] == i && (r[0] = a.lastChild), i = a.lastChild), a.innerHTML || ((i = a).innerHTML = "<br/>", n = 0), [i, n]
                                    }
                                } else
                                    for (var o = 0, s = i.childNodes.length; o < s; o++) {
                                        var c;
                                        if (c = t(i.childNodes[o])) return c
                                    }
                            }(t)
                        },
                        r = void 0,
                        i = void 0,
                        n = void 0;
                    for (n = 0; n < this._els.canvas.children.length && !(r = t(l.CURSOR_MARKER_START, this._els.canvas.children[n])); n++);
                    for (; n < this._els.canvas.children.length && !(i = t(l.CURSOR_MARKER_END, this._els.canvas.children[n], r)); n++);
                    if (r) {
                        var a = document.createRange();
                        r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), a.setStart(r[0], r[1]), i && (i[0].nodeType == Node.TEXT_NODE && (i[1] = Math.min(i[1], i[0].textContent.length)), a.setEnd(i[0], i[1]));
                        var o = window.getSelection();
                        o.removeAllRanges(), o.addRange(a)
                    }
                    var s = function(t) {
                        e._ps.forEach(function(e) {
                            e.lines.forEach(function(e) {
                                var r = e.text.indexOf(t);
                                if (r >= 0) {
                                    e.text = e.text.replace(t, "");
                                    for (var i = 0, n = 0; n < e.brs.length; n++) e.brs[n] > r && (i = 1), e.brs[n] -= i;
                                    b(ne, function(t, i) {
                                        var n = e.decorations[i.type];
                                        if (n)
                                            for (var a = 0, o = n.length; a < o; a++) {
                                                var s = n[a];
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
                for (var e = this._els.canvas.children.length, t = 0; t < e; t++) this._dirty.push(t);
                this._ps = []
            }, e.prototype._setCurrentParagraphDirty = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = g(e, 2),
                    r = t[0],
                    i = t[1];
                this._setParagraphDirty(r, i)
            }, e.prototype._setParagraphDirty = function(e, t) {
                if (void 0 === e || e < 0) throw new Error("Invalid paragraph index");
                t = t || e;
                for (var r = e; r <= t; r++) inArray(r, this._dirty) || this._dirty.push(r)
            }, e.prototype._expandDoubleBRs = function() {
                function e(e, t, r) {
                    var i = e.lines[0];
                    void 0 === r && (r = i.text.length);
                    var n = [];
                    return i.brs.forEach(function(e) {
                        e < r && e > t && n.push(e - t)
                    }), Object(l.buildParagraph)({
                        type: e.type,
                        lines: [{
                            text: i.text.substr(t, r - t),
                            decorations: Object(l.decorationsSlice)(i.decorations, t, r),
                            brs: n
                        }]
                    })
                }
                for (var t = !1, r = 0, i = this._ps.length; r < i; r++) {
                    var n = this._ps[r];
                    if (n.lines.length > 1) n.lines.forEach(l.cleanLineBRs);
                    else {
                        var a = n.lines[0].brs;
                        if (0 == a.length) continue;
                        for (var o = [], s = 0, c = 0, d = a.length; c < d; c++)
                            if (s != a[c] && c > 0 && a[c - 1] == a[c]) {
                                var u = e(n, s, a[c]);
                                Object(l.isParagraphEmpty)(u) || o.push(u), s = a[c]
                            }
                        o.push(e(n, s)), o.length > 1 && (Array.prototype.splice.apply(this._ps, [r, 1].concat(o)), r = r + o.length - 1, t = !0)
                    }
                }
                return t
            }, e.prototype._processAlienPhotos = function() {
                var e = this;
                if (!this._photoPasteUploadingProcess)
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                        if (!Object(l.isObjectParagraphEl)(r) || !this._isTrackedObjectEl(r))
                            for (var i = Array.prototype.slice.call(geByTag("img", r)), n = void 0, a = function() {
                                    if (!n.src || !domPN(r) || !isVisible(n)) return "continue";
                                    var t = M(n, function(t) {
                                            return t == e._els.canvas || "FIGURE" == t.tagName
                                        }, 10),
                                        i = !(!t || t == e._els.canvas) && P("figcaption", t),
                                        a = Object(l.buildParagraph)({
                                            type: d.ParagraphType.ObjectPhoto
                                        }),
                                        o = e._renderObjectParagraph(a, i ? i.innerHTML : "");
                                    Object(l.justCursorInString)(r.textContent) ? (U(r, o), k(n), B(L("<p>" + l.CURSOR_MARKER_START + "</p>"), o)) : (B(o, domPN(n)), k(i), k(n)), M(o, function(t) {
                                        if (t == e._els.canvas) return !0;
                                        O(t, l.ArticleEditorParagraphClass)
                                    }), Object(l.queuePhotoProcess)(n.src, function(t, r, i) {
                                        t ? (k(o), e._forgetObject(a._uuid), e._setAllParagraphsDirty(), e._triggerInputEvent(), i()) : e._getOrCreateParagraphObject(a).setBLOB(r, i)
                                    })
                                }; n = i.shift();) a()
            }, e.prototype._flattenAlienParagraphs = function() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, i = this._fromPasteEvent, n = this._pasteCurrentIndex, a = this._getCurrentParagraphIndex(), o = g(a, 1)[0], s = -1, c = function() {
                            if (s++, i && !R(r.textContent) && s > n && s <= o) return k(r), "continue";
                            var t = r;
                            Object(l.isQuoteEl)(r) && !Object(l.isAlienParagraphEl)(r) && (t = r.firstChild);
                            var a = !1;
                            (function e(i) {
                                if (i && i.nodeType != Node.TEXT_NODE && !Object(l.isBR)(i))
                                    if (Object(l.hasBlockElements)(i))
                                        if (this._isTrackedObjectEl(i)) i != t && (A(i, r), a = !0);
                                        else
                                            for (var n = Array.prototype.slice.call(i.childNodes), o = void 0; o = n.shift();) e.call(this, o);
                                else i != t && (R(i.innerHTML) && A(i, r), a = !0)
                            }).call(e, t, !0), a && k(r)
                        }; r = t.shift();) c();
                    this._setAllParagraphsDirty()
                }
            }, e.prototype._correctCaptionSelection = function() {
                var e = Object(l.getRange)(),
                    t = g(e, 3),
                    r = t[0],
                    i = t[1],
                    n = t[2];
                if (r && !i) {
                    var a = M(r.startContainer, function(e) {
                        return "FIGCAPTION" == e.tagName
                    }, 5);
                    if (a && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && Object(l.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                        var o = C("article_ed__figcaption_edit", a),
                            s = r.cloneRange();
                        s.selectNodeContents(o), n.removeAllRanges(), n.addRange(s)
                    }
                }
            }, e.prototype.cancelSaveDraft = function() {
                clearTimeout(this._draftSaveTO)
            }, e.prototype.saveDraft = function(e, t, r) {
                var i = this;
                if (!this.isLocked()) {
                    clearTimeout(this._draftSaveTO);
                    var n = JSON.stringify({
                        paragraphs: Object(u.getCleanedState)(this._ps)
                    });
                    t ? this._lastSavedDraft = n : this._lastSavedDraft != n || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), this._draftSaveTO = setTimeout(function() {
                        if (i._lastSavedDraft = n, 0 != i._ps.length) {
                            var e = Object(p.checkLimits)(i._ps);
                            e ? i._options.onDraftNotSaved && i._options.onDraftNotSaved(e) : i.save(!1, function(e, t, r) {
                                i._initDraftSave = !0, i._options.onDraftSaved && i._options.onDraftSaved(e, t, r)
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
                var i = this,
                    n = Object(u.getCleanedState)(this._ps, !1, !0);
                e && Object(l.correctRealIndexes)(n, -1);
                var a = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), this.getOptions().postData && ((r = r || {}).from_post_convert = 1), h.default.save(this.getArticleOwnerId(), this.getArticleId(), n, e, a, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, n, o, s, c) {
                    if (isString(r) && r.startsWith("locked ")) return i.getOptions().editLockMessage = r.slice("locked ".length), i.showEditLockInfo(), void(t && t(!0));
                    r || (n && (i._options.articleId = n), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(N({}, nav.objLoc, {
                        article_id: i.getArticleOwnerId() + "_" + i.getArticleId()
                    })), i._publishNameCandidate = a, e && (i._options.isPublished = !0), i._replaceVideos(c)), t && t(r, n, o, s)
                })
            }, e.prototype._replaceVideos = function(e) {
                var t = this,
                    r = !1;
                e.forEach(function(e) {
                    var i = g(e, 4),
                        n = i[0],
                        a = i[1],
                        o = i[2],
                        s = i[3];
                    t._ps.forEach(function(e, i) {
                        if (e.type == d.ParagraphType.ObjectVideo) {
                            var c = e.mediaId.split("_"),
                                l = g(c, 3),
                                u = l[0],
                                p = l[1];
                            l[2] || u != n || p != a || (e.mediaId = o + "_" + s, t._setParagraphDirty(i), r = !0)
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
                        var i = r.tagName,
                            n = Array.prototype.slice.call(r.children),
                            a = n[0];
                        if (1 == n.length && a && a.tagName && inArray(a.tagName, ["H1", "H2", "H3"])) {
                            U(r, a);
                            continue
                        }
                        if (n.shift(), n.length)
                            for (var o = void 0; o = n.shift();) {
                                if (this._saveCursorMarker(), e) B(o, r);
                                else {
                                    var s = L("<" + i + "></" + i + ">");
                                    s.appendChild(o), B(s, r)
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
                this._correctEmptyParagraphAfterFloatObjects(), this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._initResizeTooltip(), this._saveUndoState()
            }, e.prototype._redrawModel = function() {
                this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
            }, e.prototype.addObjectAudio = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = g(t, 1)[0];
                this.getArticleOwnerId() < 0 && (y.audioAttachOriginalOwnerId = this.getArticleOwnerId(), y.audioAttachSwitchOwnerId = vk.id), AudioPage.showAttachBox(this.getArticleOwnerId(), {
                    canPlaylistAttach: !0,
                    onAudioChoose: function(t, i, n, a) {
                        Object(l.isParagraphEmpty)(e._ps[r]) || e._insertParagraphAt(r, Object(l.buildParagraph)());
                        var o = Object(l.buildParagraph)({
                            type: d.ParagraphType.ObjectAudio,
                            mediaId: n.fullId
                        });
                        f.default.add(d.ParagraphType.ObjectAudio, n.fullId, {
                            audio: a
                        }), e._getOrCreateParagraphObject(o), e._ps[r] = o, t.shiftKey || curBox().hide(), e._redrawModel();
                        var s = e._getParagraphElByIndex(r);
                        Object(l.focusEl)(s), e.saveUndoStateAndDraft(), r++
                    },
                    onPlaylistChoose: function(t, i) {
                        var n = i.getOwnerId() + "_" + i.getPlaylistId() + (i.getAccessHash() ? "_" + i.getAccessHash() : ""),
                            a = Object(l.buildParagraph)({
                                type: d.ParagraphType.ObjectAudioPlaylist,
                                mediaId: n
                            });
                        f.default.add(d.ParagraphType.ObjectAudioPlaylist, n, {
                            accessHash: i.getAccessHash()
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
                this._isUploading = !!e, D(this._els.editor, "article_ed__uploading", this._isUploading)
            }, e.prototype.isMediaUploadMode = function() {
                return this._isUploading
            }, e.prototype.addObjectVideo = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = g(t, 1)[0],
                    i = this._getParagraph(r),
                    n = Object(l.hasSeparator)(i);
                delete i.sep;
                showBox("al_video.php", {
                    act: "a_choose_video_box",
                    from: "article",
                    to_id: this.getArticleOwnerId()
                });
                y.chooseMedia = function(t, i, a, o, s) {
                    var c = Object(d.getAppropriateImage)(a.editable.sizes, e.getWidth()),
                        u = g(c, 1)[0],
                        p = Object(l.buildParagraph)({
                            type: d.ParagraphType.ObjectVideo,
                            mediaId: i,
                            sep: n
                        });
                    n = !1, f.default.add(d.ParagraphType.ObjectVideo, i, {
                        editable: a.editable,
                        thumb: u,
                        duration: a.editable.duration,
                        platform: a.editable.platform
                    }), e._getOrCreateParagraphObject(p), 0 == o ? e._ps[r] = p : e._ps.splice(r + o, 0, p), e._redrawModel(), e._saveUndoState();
                    var h = e._getParagraphElByIndex(r);
                    Object(l.focusEl)(h), s || curBox().hide(), e.saveDraft()
                }
            }, e.prototype.addObjectDoc = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = g(t, 1)[0],
                    i = this._getParagraph(r),
                    n = Object(l.hasSeparator)(i);
                delete i.sep, y.docsCurFilter = "gif";
                var a = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                y.chooseMedia = function(t, i, o) {
                    a.hide();
                    var s = Object(l.buildParagraph)({
                        type: d.ParagraphType.ObjectGIF,
                        mediaId: i,
                        sep: n
                    });
                    n = !1, f.default.add(d.ParagraphType.ObjectGIF, i, {
                        video: o.video_preview,
                        size: o.video_preview_size,
                        href: o.href
                    }), e._getOrCreateParagraphObject(s), e._insertParagraphAt(r, s), e._redrawModel(), e._saveUndoState(), e.saveDraft(), e._updateTextPlaceholders()
                }, y.showMediaProgress = function() {}
            }, e.prototype.addObjectPhoto = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = g(t, 1)[0],
                    i = this._getParagraph(r),
                    n = showBox("al_photos.php", {
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
                        i = e._renderObjectParagraph(t, ""),
                        n = e._getParagraphElByIndex(r);
                    A(i, n), Object(l.focusEl)(n), a = i, e.setMediaUploadMode(!0)
                }, y.onMediaUploadFail = function() {
                    delete y.onMediaUploadStarted, a && k(a), e.setMediaUploadMode(!1)
                };
                var o = void 0,
                    s = -1;
                y.chooseMedia = function(t, c, u, p) {
                    void 0 === p ? s++ : s = intval(p), delete y.onMediaUploadStarted, e.setMediaUploadMode(!1), a && k(a);
                    var h = Object(l.buildParagraph)({
                        type: d.ParagraphType.ObjectPhoto,
                        mediaId: c,
                        sep: i.sep
                    });
                    return f.default.add(d.ParagraphType.ObjectPhoto, c, {
                        size: Object(l.getPhotoSize)(u.editable.sizes),
                        sizes: u.editable.sizes
                    }), e._getOrCreateParagraphObject(h), s ? e._ps.splice(r + s, 0, h) : e._ps[r] = h, void 0 === p && n.hide(), clearTimeout(o), o = setTimeout(function() {
                        e._redrawModel(), e._focusParagraph(r + s), e._updateTextPlaceholders(), e.saveUndoStateAndDraft()
                    }, 10), !1
                }, y.showMediaProgress = function() {}
            }, e.prototype.addSeparator = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = g(e, 1)[0],
                    r = Object(l.hasSeparator)(this._getParagraph(t)),
                    i = Object(l.hasSeparator)(this._getParagraph(t + 1));
                !r && !i && t < this._ps.length - 1 && this._ps.splice(t, 1), this._getParagraph(t).sep = 1;
                var n = this._getCursor();
                this._redraw(!0), this._restoreCursor(n), this._updateTextPlaceholders()
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
                            offset: [3, 0]
                        }), this._objectPickerEl.addEventListener("mousedown", function(e) {
                            return cancelEvent(e)
                        })
                    }
                    var t = this._getCurrentParagraphIndex(),
                        r = g(t, 2),
                        i = r[0],
                        n = r[1];
                    if (!this.isMediaUploadMode() && !1 !== i && i == n && Object(l.isParagraphEmpty)(this._ps[i], !0) && this._ps[i] && inArray(this._ps[i].type, [d.ParagraphType.Text, d.ParagraphType.Header2, d.ParagraphType.Header3])) {
                        show(this._objectPickerEl);
                        var a = this._getParagraphElByIndex(i),
                            o = I(this._els.editor),
                            s = I(a)[1] - o[1],
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
                            i = r.getAttribute("href").replace("#", "%23").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                            n = Object(l.decodeURL)(i);
                        Object(l.isVKUrl)(i) || (i = "/away.php?to=" + encodeURIComponent(i) + "&utf=1"), e._linkTooltip = new ElementTooltip(r, {
                            cls: "article_editor_link_show_tt",
                            appendTo: e._els.editor,
                            content: L('<a target="_blank" href="' + i + '" class="article_editor_link">' + n + "</a>")
                        })
                    }
                })
            }, e.prototype._isTrackedObjectEl = function(e) {
                var t = x(e, "uuid");
                return !!t && !!this._getObject(t)
            }, e.prototype._cloneObjectParagraphs = function() {
                for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                    if (Object(l.isObjectParagraphEl)(t)) {
                        var i = t.getAttribute("data-uuid"),
                            n = parseInt(t.getAttribute("data-type"));
                        if (r[i]) {
                            var a = this._getObject(i);
                            i = de(), this._getOrCreateParagraphObject({
                                type: n,
                                _uuid: i,
                                mediaId: a.getMediaId()
                            }), x(t, "uuid", i)
                        }
                        r[i] = !0
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
                    i = r[0],
                    n = r[1];
                if (!i) return !1;
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

                function o(t, r, i) {
                    r.nodeType == Node.TEXT_NODE ? t.textOffset = i : t.nodeOffset = i, M(r, function(r) {
                        if (r == e) return !0;
                        Object(l.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && t.path.pop(), t.path.push(Object(l.childNodeIndex)(r))
                    }, 10), t.path = t.path.slice().reverse()
                }
                return o(a.start, i.startContainer, i.startOffset), n ? delete a.end : o(a.end, i.endContainer, i.endOffset), a
            }, e.prototype._restoreCursor = function(e) {
                if (!e) return this._restoreCursorFromMarker();
                var t = this._els.canvas;

                function r(e) {
                    var r = t;
                    e.path.forEach(function(t, n) {
                        if (Object(l.isQuoteEl)(r)) {
                            var a = r.firstChild;
                            a && 1 == n && a.nodeType == Node.ELEMENT_NODE && "p" == a.tagName.toLowerCase() && (r = a)
                        }
                        t = Math.min(r.childNodes.length - 1, t);
                        var o = r.childNodes[t];
                        if (!o) return e.nodeOffset = i = 0, !1;
                        r = o
                    });
                    var i = void 0;
                    return i = r.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(r.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && r && r.children && (i = Math.min(e.nodeOffset, r.childNodes.length)), [r, i]
                }
                var i = document.createRange();
                try {
                    var n = r(e.start),
                        a = g(n, 2),
                        o = a[0],
                        s = a[1];
                    if (Object(l.isBR)(o) && 0 == s) {
                        var c = domPN(o);
                        Object(l.isParagraphEl)(c) && 1 == c.childNodes.length && (o = c)
                    }
                    if (i.setStart(o, s), e.end) {
                        var d = r(e.end),
                            u = g(d, 2),
                            p = u[0],
                            h = u[1];
                        i.setEnd(p, h)
                    }
                    var f = window.getSelection();
                    f.removeAllRanges(), f.addRange(i)
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
                for (var e = void 0, t = this._getCurrentParagraphIndex(), r = g(t, 2), i = r[0], n = r[1], a = i; a <= n; a++) void 0 === e && (e = this._ps[a].type != d.ParagraphType.Code), this._ps[a].type = e ? d.ParagraphType.Code : d.ParagraphType.Text;
                var o = this._getCursor();
                this._redraw(!0), this._restoreCursor(o), this._updateTextPlaceholders()
            }, e.prototype._removeExtraSeparators = function() {
                for (var e = this._els.canvas.children, t = void 0, r = 0; r < e.length; r++) {
                    var i = e[r],
                        n = x(i, "sep");
                    n && (void 0 !== t && n == t && x(i, "sep", null), t = n)
                }
            }, e.prototype._replaceAlienInlineTags = function() {
                var e = !1,
                    t = {
                        b: "strong",
                        i: "em"
                    };
                return function r(i) {
                    var n = i.tagName.toLowerCase();
                    if (t[n]) {
                        e || (this._saveCursorMarker(), e = !0);
                        var a = ce(t[n], {
                            innerHTML: i.innerHTML
                        });
                        U(i, a)
                    } else
                        for (var o = Array.prototype.slice.call(i.childNodes), s = void 0; s = o.shift();) s.nodeType == Node.ELEMENT_NODE && r.call(this, s)
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
                        e._ps.forEach(function(i, n) {
                            if (Object(l.isObjectParagraph)(i)) {
                                var a = e._getParagraphElByIndex(n),
                                    o = S(a),
                                    s = I(a),
                                    c = s[1] < t + r && s[1] + o[1] > t;
                                i._object.onViewport && i._object.onViewport(c)
                            }
                        })
                    });
                    var t = 0;
                    this._setEventListener(document, "selectionchange", function() {
                        var r = Object(l.getRange)(),
                            i = g(r, 2),
                            n = i[0],
                            o = i[1];
                        if (n && !M(n.commonAncestorContainer, function(t) {
                                return t == e._els.canvas
                            })) return;
                        var s = e._getCurrentParagraphIndex(),
                            c = g(s, 1)[0];
                        if (!1 !== c) {
                            if (!o && j(n.startContainer, "article")) {
                                var u = e._ps[t];
                                if (Object(l.isObjectParagraph)(u)) return void Object(l.focusEl)(u._object.getCaptionEl())
                            }
                            var p = n.startContainer;
                            if (m.msie && o && z("article_ed__extra_controls", p) && "BUTTON" != p.tagName) {
                                var h = e._ps[c];
                                if (Object(l.isObjectParagraph)(h)) return void h._object.getCaptionEl().focus()
                            }
                            t = c, e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), e._ensureDummyParagraphs(), 0 == a && e._showFormatTooltip(), e._saveLastCursor();
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
                        i = !1,
                        n = !1,
                        a = !1;
                    this._els.canvas.addEventListener("mousedown", function() {
                        a = !0;
                        var t = void 0;
                        e._setEventListener(window, "mouseup", t = function(r) {
                            a = !1, "article_format_btn_link" == r.target.id || (e._showFormatTooltip(), t && window.removeEventListener("mouseup", t))
                        })
                    }), this._els.canvas.addEventListener("selectstart", function() {
                        e._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", function(t) {
                        var r = Object(l.getRange)(),
                            i = g(r, 2),
                            n = i[0];
                        if (i[1]) {
                            var a = e._getContainingParagraphEl(n.commonAncestorContainer),
                                o = g(a, 1)[0];
                            Object(l.isObjectParagraphEl)(o) && (t.clipboardData.setData("text/plain", "uuid:" + o.getAttribute("data-uuid")), t.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", function(t) {
                        var r = e._getCurrentParagraphIndex(),
                            i = g(r, 1)[0];
                        i && (e._handleObjectPaste(t), e._handlePhotoPaste(t), e._handleLinkPaste(t)), e._fromPasteEvent = !0, e._pasteCurrentIndex = i
                    }), this._els.canvas.addEventListener("click", function(e) {
                        if (e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName) return cancelEvent(e)
                    });
                    var o = !1;
                    this._els.canvas.addEventListener("input", function() {
                        e._hideObjectPicker(), e._expandBlockquoteParagraphs(u), e._removeExtraSeparators();
                        var t = e._replaceAlienInlineTags();
                        m.safari || e._els.canvas.normalize();
                        var r = void 0;
                        e._fromPasteEvent || t || e._markerCursorSet ? e._saveCursorMarker() : r = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), o && (e._cleanParagraphsBRs(), o = !1), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph();
                        var a = e._fromPasteEvent && e._expandDoubleBRs();
                        e._redraw(a), e._restoreCursor(r), e._correctCursorToBeWithinCanvas(), e._dirty = [], n ? e._saveUndoStateDelayed() : e._saveUndoState(), i = n = !1, e._fromPasteEvent = !1, m.mozilla && e._showFormatTooltip(), e._updateTextPlaceholders(), e.saveDraft()
                    });
                    var s = !1,
                        u = !1,
                        p = 1,
                        h = void 0;
                    this._els.canvas.addEventListener("keydown", function(t) {
                        var a = t.keyCode,
                            f = t.metaKey || t.ctrlKey,
                            v = t.shiftKey,
                            y = Object(l.getRange)(),
                            w = g(y, 2),
                            P = w[0],
                            C = w[1];
                        if (P) {
                            var E = e._getCurrentParagraphIndex(),
                                O = g(E, 2),
                                j = O[0],
                                x = O[1],
                                S = e._getParagraph(j),
                                I = !1;
                            if (Object(l.isObjectParagraph)(S))
                                if (S._object.isCaptionFocused()) I = 0 == P.startOffset && C;
                                else {
                                    var k = e._getContainingParagraphEl(P.startContainer);
                                    I = g(k, 1)[0] == S._object.el()
                                }
                            if (I && C && m.mozilla) {
                                if (a == ee) return e._focusParagraph(j - 1, !0), cancelEvent(t);
                                if (a == te) return e._focusParagraph(j + 1, !0), cancelEvent(t)
                            }
                            if ((a == re || a == J) && e._resizeTooltip && e._resizeTooltip.isShown() && e._resizeTooltip.hide(), a == ie && C && 0 == j) return Object(l.focusEl)(e._getParagraphElByIndex(1)), cancelEvent(t);
                            if (f && a == V && Object(l.isObjectParagraph)(S) && S._object.isCaptionFocused()) {
                                var M = S._object.getCaptionEl();
                                return Object(l.selectEl)(M), cancelEvent(t)
                            }
                            if (f) switch (a) {
                                case q:
                                    return e._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(t);
                                case Q:
                                    return e._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(t);
                                case X:
                                    return e.saveDraft(!1, !1, !0), cancelEvent(t);
                                case K:
                                    return e._undo(), cancelEvent(t)
                            }
                            var N = a == G && t.altKey,
                                D = S ? S.type : d.ParagraphType.Text,
                                R = Object(_.gpeByTag)("pre", P.startContainer),
                                z = !!(R || Object(_.gpeByTag)("pre", P.endContainer) || P.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == P.startContainer.tagName);
                            if (N) {
                                if (D === d.ParagraphType.Header1) return cancelEvent(t);
                                if (C) return e._toggleCodeBlocks(), cancelEvent(t);
                                if (!z && inArray(D, [d.ParagraphType.Text, d.ParagraphType.NumericList, d.ParagraphType.BulletList])) {
                                    e._setCurrentParagraphDirty();
                                    var H = Object(_.gpeByTag)("code", P.startContainer) || Object(_.gpeByTag)("code", P.endContainer);
                                    if (H) {
                                        e._saveCursorMarker();
                                        var F = L("<span></span>");
                                        F.innerHTML = H.innerHTML, U(H, F), e._triggerInputEvent()
                                    } else document.execCommand("fontName", !1, "monospace"), m.msie && e._triggerInputEvent();
                                    return cancelEvent(t)
                                }
                            }
                            if (a == ie && z && D == d.ParagraphType.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(t);
                            var W = !1;
                            if (a == J) {
                                if (s) return s[0].textContent = s[1], e._restoreCursor(s[2]), s = !1, cancelEvent(t);
                                if (I) {
                                    var ne = e._getParagraphElByIndex(j),
                                        ae = Object(l.createParagraphEl)("", Object(l.hasSeparator)(S));
                                    return e._correctEmptyParagraphAfterFloatObjects(), U(ne, ae), Object(l.focusEl)(ae), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                                }
                                if (P && 0 == P.startOffset && P.collapsed) {
                                    var oe = Object(_.gpeByTag)("li", P.startContainer),
                                        se = Object(l.getElementIndex)(oe);
                                    if (oe) {
                                        var ce = e._ps[j],
                                            le = clone(ce),
                                            de = clone(ce);
                                        le.lines = le.lines.slice(0, se);
                                        var ue = Object(l.buildParagraph)({
                                            lines: [clone(ce.lines[se])]
                                        });
                                        de.lines = de.lines.slice(se + 1), e._ps.splice(j, 1, le, ue, de), e._redraw(!0);
                                        var pe = e._getParagraphElByIndex(j + 1);
                                        return Object(l.focusEl)(pe), e._saveUndoState(), cancelEvent(t)
                                    }
                                }
                                if (P && C && 0 == P.startOffset && "LI" === !P.startContainer.nodeName) {
                                    var he = e._getCurrentParagraphIndex(),
                                        fe = g(he, 1)[0],
                                        _e = fe > 0 && e._ps[fe - 1];
                                    if (Object(l.isObjectParagraph)(_e)) {
                                        Object(l.isParagraphEmpty)(e._ps[fe]) && (e._ps.splice(fe, 1), e._redraw(!0));
                                        var ge = e._getParagraphElByIndex(fe - 1);
                                        return Object(l.focusEl)(ge), cancelEvent(t)
                                    }
                                }
                                e._setAllParagraphsDirty(), m.msie && setTimeout(function() {
                                    e._triggerInputEvent()
                                })
                            }
                            if (a == re) {
                                var ve = e._ps[j],
                                    ye = e._ps[j + 1],
                                    me = getCaretCharacterOffsetWithin(P.startContainer),
                                    be = g(me, 1)[0],
                                    we = P.startContainer.textContent.length == be;
                                if (I)
                                    if (!(ve._object.isCaptionFocused() && !!ve.lines[0].text)) {
                                        var Pe = e._getParagraphElByIndex(j),
                                            Ce = Object(l.createParagraphEl)();
                                        return U(Pe, Ce), Object(l.focusEl)(Ce), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(t)
                                    }
                                if (C && Object(l.hasSeparator)(ye) && we) return e._setParagraphDirty(j + 1), delete ye.sep, e._redraw(!1, !0), cancelEvent(t);
                                if (C && we && Object(l.isObjectParagraph)(ye)) return Object(l.isParagraphEmpty)(ve) && ve.type != d.ParagraphType.Header1 && (e._ps.splice(j, 1), e._redraw(!0, !0)), Object(l.focusEl)(ye._object.getCaptionEl()), cancelEvent(t);
                                ye && Object(l.isParagraphEmpty)(ve) && inArray(ye.type, [d.ParagraphType.Header2, d.ParagraphType.Header3]) && (ve.type = ye.type, e._setParagraphDirty(j), e._redraw()), e._setAllParagraphsDirty(), (m.msie && 0 == P.startOffset && 0 == j || v) && setTimeout(function() {
                                    e._setCurrentParagraphDirty(), e._triggerInputEvent()
                                })
                            } else if (a == Z) {
                                if (z && R && D == d.ParagraphType.Code && C) {
                                    var Ee = R.textContent.search(/[^\s]/);
                                    return -1 == Ee && (Ee = R.textContent.length), document.execCommand("insertText", !1, "\n" + " ".repeat(Ee)), cancelEvent(t)
                                }
                                if (e._isWithinObjectParagraphEl(Object(l.getFocusedElement)())) {
                                    var Oe = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                        Te = g(Oe, 2),
                                        je = Te[0],
                                        xe = Te[1],
                                        Se = Object(l.createParagraphEl)(),
                                        Ie = e._ps[xe]._object;
                                    return !Ie.isCaptioned() || Ie.isCaptionFocused() ? B(Se, je) : A(Se, je), e._setAllParagraphsDirty(), Object(l.focusEl)(Se), e._triggerInputEvent(), cancelEvent(t)
                                }
                                var ke = e._getContainingParagraphEl(Object(l.getFocusedElement)()),
                                    Le = g(ke, 3),
                                    Ae = Le[0],
                                    Me = Le[1],
                                    Ne = Le[2],
                                    De = getCaretCharacterOffsetWithin(Ae),
                                    Re = g(De, 2)[1];
                                if (t.shiftKey || t.ctrlKey && m.safari) {
                                    var Be = getCaretCharacterOffsetWithin(Ae),
                                        ze = g(Be, 2)[1],
                                        He = T("li", P.startContainer),
                                        Ue = 0;
                                    He && (Ue = Y(He));
                                    var Fe = !1;
                                    if (b(Ne.lines, function(e, t) {
                                            var r = t.brs,
                                                i = t.text.length;
                                            return 0 == ze || ze <= i && inArray(ze, r) ? (Fe = !0, !1) : !((ze -= i) <= 0 && e == Ue) && void 0
                                        }), Fe) {
                                        o = !0, e._setParagraphDirty(j, x), document.execCommand("insertParagraph");
                                        var We = $(Ae);
                                        return We && (Object(l.focusEl)(We), We.focus()), e._triggerInputEvent(), cancelEvent(t)
                                    }
                                    m.msie && 0 == ze && P.insertNode(L("<br>"))
                                }
                                var Ye = C && P.startContainer.nodeType == Node.TEXT_NODE && !P.startContainer.nextSibling && Re == Ae.textContent.length;
                                u = Ye && !Object(l.isListParagraph)(e._ps[j]) && !t.shiftKey && inArray(Ne.type, [d.ParagraphType.Quote, d.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), u || t.shiftKey || e._parseUrlParagraph(Me), e._setParagraphDirty(j, x)
                            } else t.key && 1 == t.key.length ? (e._setParagraphDirty(j), e._setParagraphDirty(x), t.metaKey || (W = !0, t.key && (Object(l.isCyrillicChar)(t.key) ? p += 1 : Object(l.isLatinChar)(t.key) && (p -= 1), p = Math.min(Math.max(p, -5), 5))), i = Object(l.isWhiteSpaceChar)(t.key), r && !i && (n = !0), r = W, setTimeout(function() {
                                var t = Object(l.getRange)(),
                                    r = g(t, 2),
                                    i = r[0],
                                    n = r[1],
                                    a = e._getParagraph(j);
                                if (a && (a.type != d.ParagraphType.Code && !!!(Object(_.gpeByTag)("code", i.startContainer) || i.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == i.startContainer.tagName) && (h = h || p > 0, n && i))) {
                                    var o = i.startContainer;
                                    if (o.nodeType == Node.TEXT_NODE && i.startOffset > 0)
                                        for (var u = o.textContent.substring(i.startOffset - 5, i.startOffset), f = 0, v = c.Sequences.length; f < v; f++) {
                                            var y = c.Sequences[f];
                                            if (void 0 === y.cyrillic || y.cyrillic === h)
                                                if (y.pattern instanceof RegExp) {
                                                    var m = u.match(y.pattern);
                                                    if (m) {
                                                        var b = y.substitution;
                                                        m.length > 1 && (b = b.replace("$1", m[1])), w.call(e, i.startOffset, o, m[0], b, y.noUndo);
                                                        break
                                                    }
                                                } else if (u.endsWith(y.pattern)) {
                                                w.call(e, i.startOffset, o, y.pattern, y.substitution, y.noUndo);
                                                break
                                            }
                                        }
                                }

                                function w(e, t, r, i, n) {
                                    var a = this._getCursor(),
                                        o = t.textContent.substring(0, e - r.length),
                                        c = t.textContent.substring(e);
                                    n || (s = [t, o + r + c, a]), t.textContent = o + i + c, this._restoreCursor(a), this._setParagraphDirty(j), this._triggerInputEvent()
                                }
                            }, 0)) : r = !1;
                            s = !1
                        }
                    }), this._setEventListener(window, "resize", function() {
                        e._resizeTooltip && e._resizeTooltip.isShown() && e._updatePositionResizeTooltip()
                    })
                }
            }, e.prototype._isParagraphEl = function(e) {
                return e && j(e, l.ArticleEditorParagraphClass)
            }, e.prototype._isWithinObjectParagraphEl = function(e) {
                var t = this._getContainingParagraphEl(e),
                    r = g(t, 1)[0];
                return r && Object(l.isObjectParagraphEl)(r)
            }, e.prototype._highlightObjectsInCurrentSelection = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = g(e, 2),
                    r = t[0],
                    i = t[1];
                !1 !== r && !1 !== i && this._ps.forEach(function(e, t) {
                    if (e._object) {
                        var n = r != i;
                        e._object.highlight(t >= r && t <= i, n)
                    }
                })
            }, e.prototype._getOrCreateParagraphObject = function(e) {
                e._uuid || (e._uuid = de());
                var t = this._getObject(e._uuid);
                if (!t) {
                    var r = e.mediaId || "";
                    switch (parseInt(e.type)) {
                        case d.ParagraphType.ObjectPhoto:
                            t = new i.default(r, this, e);
                            break;
                        case d.ParagraphType.ObjectVideo:
                            t = new n.default(r, this);
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
                            i = g(r, 3),
                            n = i[0],
                            a = i[1],
                            o = i[2],
                            s = this._getObject(a);
                        if (!s) return;
                        var c = void 0;
                        (c = s.getCaptionEl() ? this._getParagraphFromHTML("", s.getCaptionEl().innerHTML, !0) : Object(l.buildParagraph)())._uuid = a, c.type = n, c.mode = o, c._object = s, this._ps[e] = c
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
                    i = t[1];
                return [this._getParagraphElByIndex(r), this._getParagraphElByIndex(i)]
            }, e.prototype._initObjectDrag = function() {
                var e = this,
                    t = void 0,
                    r = void 0,
                    i = void 0,
                    n = void 0,
                    a = !1,
                    o = this._els,
                    s = void 0;

                function c(e) {
                    s != e && (b(geByClass("article_ed__drag_hovered"), function(e, t) {
                        O(t, "article_ed__drag_hovered")
                    }), e && w(e, "article_ed__drag_hovered"), s = e)
                }

                function d() {
                    window.removeEventListener("mousemove", t), window.removeEventListener("mouseup", r), a = !1, O(o.canvas, "no_select"), clearInterval(n), c(!1), k(i), i = !1
                }
                this._els.canvas.addEventListener("mousedown", function(o) {
                    if (i && k(i), 2 == o.button) return d(), cancelEvent(o);
                    var s = S(e._els.canvas)[1];
                    O(e._els.canvas, "no_select"), c(!1);
                    var u = e._getContainingParagraphEl(o.target),
                        p = g(u, 3),
                        h = p[0],
                        f = p[1],
                        v = p[2];
                    if (Object(l.isObjectParagraph)(v)) {
                        var y = o.pageY,
                            m = void 0,
                            b = void 0,
                            P = void 0,
                            C = void 0,
                            E = void 0;
                        window.addEventListener("mousemove", t = function(t) {
                            if (i || !(Math.abs(y - t.pageY) < 10)) {
                                i || (i = L('<div class="article_ed__drag_shadow"></div>'), e._els.editor.appendChild(i), (m = I(e._els.canvas))[1] -= scrollGetY(), b = S(h), P = I(h), C = t.pageX - P[0], E = t.pageY - P[1] + e._options.layer.scrollTop, setStyle(i, {
                                    width: b[0],
                                    height: b[1]
                                }), e._focusParagraph(f)), w(e._els.canvas, "no_select"), m || d(), setStyle(i, {
                                    left: t.pageX - m[0] - C,
                                    top: t.pageY - scrollGetY() - E - m[1] + e._options.layer.scrollTop
                                }), clearInterval(n), t.pageY - scrollGetY() < 200 ? n = setInterval(function() {
                                    e._options.layer.scrollTop -= 10
                                }, 10) : t.pageY - scrollGetY() > window.innerHeight - 200 && (n = setInterval(function() {
                                    e._options.layer.scrollTop + window.innerHeight > s + 300 ? clearInterval(n) : e._options.layer.scrollTop += 10
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
                var t = C("article_ed__warn_info", this._els.editor);
                t && !e && (O(this._els.editor, "article_ed__warn_shown"), k(t)), t || e && (t = L('<div class="article_ed__warn_info">' + e + "</div>"), this._els.editor.appendChild(t), w(this._els.editor, "article_ed__warn_shown"))
            }, e.prototype._initResizeTooltip = function() {
                var e = this;
                if (this.canResizeObjects()) {
                    var t = L('<div class="resize-tooltip__btns article_format_btns clear_fix"></div>');
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
                }
            }, e.prototype._showResizeTooltip = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = g(e, 1)[0],
                    r = this._getParagraphElByIndex(t),
                    i = this._getParagraph(t);
                if (d.ResizableObjectTypes.includes(+i.type))
                    if (this._resizeTooltip && !this._resizeTooltip.isShown() && this._resizeTooltip.show(), j(r, "article_ed__carousel_edit_open")) this._resizeTooltip.hide();
                    else {
                        var n = [{
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
                            a = C("resize-tooltip__btns"),
                            o = [1, 1, 1, 1];
                        switch (+i.type) {
                            case d.ParagraphType.ObjectPhoto:
                                i._object._isCarousel() ? o = [0, 1, 1, 0] : i._object._isSmallPhotoSize() || (o = [1, 1, 0, 0]);
                                break;
                            case d.ParagraphType.ObjectGIF:
                                i._object._isSmallGifSize() || (o = [1, 1, 0, 0])
                        }
                        a.innerHTML = "", n.forEach(function(e, t) {
                            o[t] && a.appendChild(L('\n          <button class="article_format_btn' + (+i.mode == e.id || !i.mode && !e.id ? " article_format_btn_active" : "") + '" id="article_format_btn_' + e.type + '"  data-mode=' + e.id + " ></button>\n        "))
                        }), this._updatePositionResizeTooltip()
                    }
            }, e.prototype._updatePositionResizeTooltip = function() {
                var e = this._resizeTooltip,
                    t = I(this._els.editor),
                    r = g(t, 2)[1],
                    i = this._getCurrentParagraphIndex(),
                    n = g(i, 1)[0],
                    a = this._getParagraphElByIndex(n).getBoundingClientRect(),
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
                    t = I(this._els.editor);
                this._floatedObjects = [], this._ps.forEach(function(r, i) {
                    if (r.mode && parseInt(r.mode) === d.ObjectResizeType.Float) {
                        var n = e._getParagraphElByIndex(i),
                            a = n.getBoundingClientRect().height,
                            o = I(n);
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
                            var i = Object(l.buildParagraph)();
                            i._autoInsert = !0, this._insertParagraphAt(e + 1, i)
                        } else 1 !== parseInt(t.mode) && r && r._autoInsert && this._deleteParagraphFrom(e + 1)
                }
            }, e
        }();
        t.default = ue
    },
    133: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "getCleanedState", function() {
            return a
        }), r.d(t, "expandParagraphFields", function() {
            return o
        });
        var i = r(11),
            n = r(28);

        function a(e, t, r) {
            var a = [];
            return e.forEach(function(e, o) {
                if (!r || Object(n.isObjectParagraph)(e) || !Object(n.isParagraphEmpty)(e) || 0 == o || e.type == i.ParagraphType.Code) {
                    var s = {};
                    for (var c in e) {
                        if (!e.hasOwnProperty(c)) return;
                        if (!c.startsWith("_") || "_uuid" === c && t) {
                            var l = e[c];
                            s[c] = isObject(l) || isArray(l) ? clone(l, !0) : l
                        }
                    }
                    Object(n.isObjectParagraph)(e) && e._object && (s.mediaId = e._object.getMediaId()), e.sep && (s.sep = 1), s.type == i.ParagraphType.Text && delete s.type, s.lines.forEach(function(e) {
                        if (void 0 !== e.decorations) {
                            var t = !0;
                            each(e.decorations, function(r, i) {
                                0 == i.length ? delete e.decorations[r] : t = !1
                            }), t && delete e.decorations
                        }
                        e.brs && 0 == e.brs.length && delete e.brs
                    }), a.push(s)
                }
            }), JSON.parse(JSON.stringify(a))
        }

        function o(e) {
            return e.forEach(function(e) {
                e.type = e.type || i.ParagraphType.Text, e.lines.forEach(function(e) {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
    },
    15: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "initPhotoCarousel", function() {
            return a
        });
        var i = r(11),
            n = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function a(e, t) {
            var r = domQuery1("[data-sizes]", e),
                a = JSON.parse(domData(r, "sizes")),
                o = (domData(r, "media-links") || "").split(",");
            if (!(a.length <= 1 || domData(e, "carousel-inited")))
                if (domData(e, "carousel-inited", 1), t.mobile) ! function(e, t) {
                    var r = geByClass1("article_photo_carousel__controls", t),
                        a = geByClass1("article_photo_carousel__counter", t),
                        o = domData(a, "counter-lang") || getLang("global_article_carousel_counter"),
                        s = getSize(geByClass1("article_figure_content", t)),
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
                    var y = !1,
                        m = void 0;
                    r.addEventListener("touchmove", function(r) {
                        if (g || !(Math.abs(r.touches[0].pageY - p) > 5 || _)) {
                            if (!v && (u = r.touches[0].pageX - h, !(Math.abs(u) < 10) || y)) {
                                g || window.addEventListener("touchmove", m = function(e) {
                                    return cancelEvent(e)
                                }, {
                                    passive: !1
                                }), g = !0, y = !0;
                                var a = Math.min(e.length - 1, Math.max(0, l + (u < 0 ? 1 : -1))),
                                    o = 0 === a && 0 === l,
                                    b = a === e.length - 1 && l === e.length - 1;
                                if (f !== a)
                                    if (f = a, re(d), o || b) d = !1;
                                    else {
                                        var w = Object(i.getAppropriateImage)(e[a], s[0], !0),
                                            P = n(w, 1),
                                            C = P[0];
                                        d = ce("div", {
                                            innerHTML: '<img src="' + C + '">'
                                        }), setStyle(domFC(d), {
                                            "max-width": s[0],
                                            "max-height": s[1],
                                            width: "initial"
                                        }), setStyle(d, {
                                            transform: "scale(1.05)",
                                            opacity: 0
                                        }), domInsertBefore(d, domPN(geByTag1("img", t)))
                                    }
                                var E = Math.abs(u),
                                    O = 0;
                                O = o || b ? .2 * u : u, setStyle(c, {
                                    transform: "translateX(" + O + "px)"
                                }), d && setStyle(d, {
                                    transform: "scale(" + Math.max(1, 1.05 - 5e-4 * E) + ")",
                                    opacity: Math.min(1, .01 * E)
                                })
                            }
                        } else _ = !0
                    }), r.addEventListener("touchend", function() {
                        y = !1, _ = !1, v = !0, g = !1, m && window.removeEventListener("touchmove", m);
                        var t = u < 0,
                            r = Math.abs(u) < 50 || !d;
                        if (!r)
                            for (var p = l = f; p < Math.min(l + 3, e.length); p++) {
                                var h = Object(i.getAppropriateImage)(e[p], s[0], !0),
                                    b = n(h, 1),
                                    w = b[0];
                                Object(i.preloadImage)(w)
                            }
                        a.innerHTML = o.replace("{counter}", l + 1).replace("{total}", e.length), addClass(c, "with_transition"), addClass(d, "with_transition"), setTimeout(function() {
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
                }(a, e);
                else {
                    var s = function(e, t, r, a) {
                        var o = 0,
                            s = geByClass1("article_photo_carousel__controls", t),
                            c = geByClass1("article_photo_carousel__counter", t),
                            l = domData(c, "counter-lang") || getLang("global_article_carousel_counter"),
                            d = getSize(geByClass1("article_figure_content", t)),
                            u = domPN(geByTag1("img", t)),
                            p = geByClass1("article_photo_carousel__left", t),
                            h = geByClass1("article_photo_carousel__right", t);

                        function f(s) {
                            o += s, o = Math.min(e.length - 1, Math.max(0, o));
                            var f = Object(i.getAppropriateImage)(e[o], d[0], !0),
                                _ = n(f, 1),
                                g = _[0],
                                v = "";
                            if (r.moderDeletePhoto) {
                                var y = a[o];
                                v = '<a href="' + y + '" target="_blank" class="flat_button article_photo_moder_open">Открыть</a>'
                            }
                            var m = s < 0 ? "fading_in_left" : "fading_in_right",
                                b = se('<div class="' + m + '"><img src="' + g + '">' + v + "</div>");
                            setStyle(domFC(b), {
                                "max-width": d[0],
                                "max-height": Math.ceil(d[1]) + 1,
                                width: "initial"
                            }), domInsertAfter(b, domPN(geByTag1("img", t)));
                            var w = u;
                            setTimeout(function() {
                                removeClass(b, "fading_in_left"), removeClass(b, "fading_in_right"), addClass(w, "fading_out")
                            }), setTimeout(function() {
                                re(w)
                            }, 150);
                            for (var P = o; P < Math.min(o + 3, e.length); P++) {
                                var C = Object(i.getAppropriateImage)(e[P], d[0], !0),
                                    E = n(C, 1),
                                    O = E[0];
                                Object(i.preloadImage)(O)
                            }
                            u = b, c.innerHTML = l.replace("{counter}", o + 1).replace("{total}", e.length), toggle(p, o > 0), toggle(h, o < e.length - 1), domData(t, "photo-carousel-index", o)
                        }
                        var _ = void 0;

                        function g(e) {
                            clearTimeout(_), toggleClass(s, "article_photo_carousel__mouse_idle", e)
                        }
                        var v = browser.msie && intval(browser.version) <= 11;
                        return h.addEventListener("click", function(e) {
                            return f(1), v || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
                        }), p.addEventListener("click", function(e) {
                            return f(-1), v || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
                        }), t.addEventListener("mousemove", function() {
                            g(!1), addClass(s, "article_photo_carousel__mouse_over"), clearTimeout(_), _ = setTimeout(function() {
                                g(!0)
                            }, 1e3)
                        }), t.addEventListener("mouseleave", function() {
                            clearTimeout(_), removeClass(s, "article_photo_carousel__mouse_over"), removeClass(s, "article_photo_carousel__mouse_idle")
                        }), f
                    }(a, e, t, o);
                    data(e, "changePhotoFunction", s)
                }
        }
    },
    20: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(6),
            n = r(11),
            a = r(28),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
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
                    var t = i.default.get(n.ParagraphType.ObjectPhoto, e),
                        r = Object(n.getAppropriateImage)(t.sizes, 251),
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
                    var i = domData(r, "media-id");
                    i && e._medias.push(i)
                }), this._medias = this._medias.slice(0, this._limit), this._medias
            }, e.prototype.onPhotoAdd = function(e, t, r, c) {
                if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                    i.default.add(n.ParagraphType.ObjectPhoto, t, {
                        size: Object(a.getPhotoSize)(r.editable.sizes),
                        sizes: r.editable.sizes
                    });
                    var l = Object(n.getAppropriateImage)(r.editable.sizes, 251),
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
    },
    24: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "initLimits", function() {
            return a
        }), r.d(t, "checkLimits", function() {
            return o
        });
        var i = r(28),
            n = void 0;

        function a(e) {
            n = e
        }

        function o(e) {
            var t = [];
            e.length > n.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", n.maxParagraphs));
            var r = 0,
                a = 0;
            return e.forEach(function(e) {
                var o = 0;
                e.lines.forEach(function(e) {
                    r += e.text.length, o += e.text.length
                }), Object(i.isObjectParagraph)(e) && a++, o > n.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", o).replace("{limit}", n.maxSymbolsPerParagraph))
            }), r > n.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", n.maxSymbols)), a > n.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", n.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
    },
    25: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "imageProxyURL", function() {
            return s
        });
        var i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            n = window,
            a = n.each,
            o = n.intval;

        function s(e, t) {
            var r = [];
            return a(t, function(e, t) {
                switch (e) {
                    case "size":
                        n = ("" + t).split("x"), a = i(n, 2), o = a[0], s = a[1], o = o ? c(o) : "", s = s ? c(s) : "", t = o + "x" + s
                }
                var n, a, o, s;
                t && r.push(e + "=" + t)
            }), r.length ? e + "&" + r.join("&") : e
        }

        function c(e) {
            return 0 < e && e < 1 ? Math.round(100 * e) / 100 : o(e)
        }
    },
    28: function(e, t, r) {
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
            return m
        }), r.d(t, "isObjectParagraph", function() {
            return b
        }), r.d(t, "isObjectResize", function() {
            return w
        }), r.d(t, "hasSeparator", function() {
            return P
        }), r.d(t, "genSepatorId", function() {
            return E
        }), r.d(t, "isHeaderParagraph", function() {
            return O
        }), r.d(t, "isListParagraph", function() {
            return T
        }), r.d(t, "buildParagraph", function() {
            return j
        }), r.d(t, "convertBRsToArray", function() {
            return x
        }), r.d(t, "getRange", function() {
            return S
        }), r.d(t, "prepareSpacesWithSpaces", function() {
            return I
        }), r.d(t, "cleanTextSpaces", function() {
            return k
        }), r.d(t, "mergeRanges", function() {
            return L
        }), r.d(t, "isWhiteSpaceChar", function() {
            return A
        }), r.d(t, "isCyrillicChar", function() {
            return N
        }), r.d(t, "isLatinChar", function() {
            return D
        }), r.d(t, "isAlienParagraphEl", function() {
            return R
        }), r.d(t, "getFocusedElement", function() {
            return B
        }), r.d(t, "getPhotoSize", function() {
            return z
        }), r.d(t, "childNodeIndex", function() {
            return H
        }), r.d(t, "generateLatinizedName", function() {
            return F
        }), r.d(t, "dataURItoBlob", function() {
            return W
        }), r.d(t, "imageToBlob", function() {
            return Y
        }), r.d(t, "queuePhotoProcess", function() {
            return G
        }), r.d(t, "justCursorInString", function() {
            return Q
        }), r.d(t, "isParagraphEmpty", function() {
            return X
        }), r.d(t, "arrayUnique", function() {
            return K
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
            return ie
        }), r.d(t, "isPublishNameCorrect", function() {
            return ne
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
        var i = r(11),
            n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
                var i = window.getSelection();
                i.removeAllRanges(), i.addRange(r)
            } catch (e) {}
        }

        function g(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && "BR" == e.tagName
        }

        function v(e, t, r, i) {
            var n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (e = e.substring(t, r), i && i.length) {
                var a = [],
                    o = 0;
                i.forEach(function(r) {
                    if (!((r -= t) <= 0 || r > e.length)) {
                        var i = e.substring(o, r) + "<br/>";
                        i = n ? i : I(i), a.push(i), o = r
                    }
                });
                var s = e.substring(o);
                a.push(n ? s : I(s));
                a[a.length - 1];
                return a.join("")
            }
            return n ? e : I(e)
        }

        function y(e) {
            if (!e) return !1;
            for (var t = 0; null != (e = e.previousSibling);) t++;
            return t
        }

        function m(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
        }

        function b(e) {
            return e && e.type && e.type >= 100
        }

        function w(e) {
            return e && e.mode
        }

        function P(e) {
            return e && e.sep
        }
        var C = 0;

        function E() {
            return ++C
        }

        function O(e) {
            var t = void 0;
            return t = isObject(e) ? e.type : e, inArray(t, [i.ParagraphType.Header1, i.ParagraphType.Header2, i.ParagraphType.Header3])
        }

        function T(e) {
            return e && (e.type == i.ParagraphType.NumericList || e.type == i.ParagraphType.BulletList)
        }

        function j(e) {
            var t = {};
            return b(e = e || {}) && (t._uuid = e._uuid), t.lines = e.lines || [{
                text: "",
                decorations: {},
                brs: []
            }], t.type = e.type ? parseInt(e.type) : i.ParagraphType.Text, e.mediaId && (t.mediaId = e.mediaId), e.sep && (t.sep = e.sep), e.fromExtPage && (t.fromExtPage = e.fromExtPage), t
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

        function I(e) {
            return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + a), e
        }

        function k(e) {
            return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
        }

        function L(e) {
            var t = e.slice();
            t.sort(function(e, t) {
                return e[0] - t[0]
            });
            for (var r = 0; r < t.length - 1;) {
                var i = t[r],
                    n = t[r + 1];
                i[1] >= n[0] ? (i[1] = Math.max(i[1], n[1]), t.splice(r + 1, 1)) : r++
            }
            return t
        }

        function A(e) {
            return /\s/.test(e)
        }
        var M = /[\u0400-\u04FF]/;

        function N(e) {
            return M.test(e)
        }

        function D(e) {
            return /[a-zA-Z]/.test(e)
        }

        function R(e) {
            return !hasClass(e, c)
        }

        function B() {
            return window.getSelection().focusNode
        }

        function z(e) {
            var t = [];
            each(e, function(e, r) {
                t.push(r)
            });
            var r = t.sort(function(e, t) {
                return t[1] - e[1]
            })[0];
            return [r[1], r[2]]
        }

        function H(e) {
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
            for (var r = "", i = !1, n = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), a = 0; a < e.length; a++)
                if (/\s/.test(e[a])) i || (r += "-", i = !0);
                else if (inArray(e[a], n)) r += e[a], i = !1;
            else {
                var o = U[e.charCodeAt(a)];
                o && (r += o, i = !1)
            }
            return r = (r = r.substr(0, t)).replace(/-*$/, "").replace(/^-*/, "").replace(/-+/g, "-")
        }

        function W(e) {
            var t, r = void 0,
                i = void 0;
            r = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), t = e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(r.length);
            for (var n = 0; n < r.length; n++) i[n] = r.charCodeAt(n);
            return new Blob([i], {
                type: t
            })
        }

        function Y(e, t, r) {
            var i = void 0;
            if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
            if ("object" === (void 0 === e ? "undefined" : n(e)) && "img" === e.tagName.toLowerCase() && (i = e.src), "string" == typeof e && (i = e), !/^data:/.test(i) || t.convert) {
                var a, o = {
                    png: "image/png",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    svg: "image/svg+xml"
                };
                t.type = o[t.type] || ((a = i) ? o[a.split("?").shift().split(".").pop()] : null), t.src = i, t.callback = r, t.name = i, t.type ? function(e, t) {
                    var r = document.createElement("canvas"),
                        i = document.createElement("img");
                    i.onload = function() {
                        var e = r.getContext("2d");
                        r.width = i.width, r.height = i.height, e.drawImage(i, 0, 0), t(null, r.toDataURL("image/png"))
                    }, i.addEventListener("error", function() {
                        t(new Error("FailedToLoadImage"))
                    }), r.getContext ? (i.crossOrigin = "anonymous", i.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
                }(i, function(e, t, r) {
                    if (t) return void e.callback(t);
                    var i = W(r);
                    i.name = i.filename = e.name, e.callback(null, i)
                }.bind(null, t)) : r(new Error("Image type is not supported"))
            } else r(null, W(i))
        }
        var $ = [],
            V = 0,
            q = 2;

        function G(e, t) {
            $.push({
                    src: e,
                    cb: t
                }),
                function e() {
                    if (0 != $.length && V != q) {
                        V++;
                        var t = $.shift(),
                            r = new Image;
                        r.addEventListener("error", function() {
                            t.cb(!0, !1, function() {
                                V--, e()
                            })
                        }), r.addEventListener("load", function() {
                            Y(r, {}, function(r, i) {
                                t.cb(r, i, function() {
                                    V--, e()
                                })
                            })
                        }), r.src = t.src
                    }
                }()
        }

        function Q(e) {
            return 1 == (e = trim(e)).length && e[0] == o
        }

        function X(e, t) {
            if (!e) return !0;
            if (b(e)) return !1;
            var r = e.lines;
            return 0 == r.length || !(t ? trim(r[0].text) : r[0].text)
        }

        function K(e) {
            return e.filter(function(e, t, r) {
                return r.indexOf(e) === t
            })
        }

        function J(e, t, r) {
            var i = {};
            for (var n in e) e.hasOwnProperty(n) && function() {
                var a = [];
                e[n].forEach(function(e) {
                    t < e[1] && e[0] <= r && a.push([Math.max(e[0], t) - t, Math.min(r, e[1]) - t, e[2]])
                }), i[n] = a
            }();
            return i
        }

        function Z(e) {
            e.brs = K(e.brs), e.brs[e.brs.length - 1] == e.text.length && e.brs.pop()
        }

        function ee(e, t) {
            var r = e.length;
            return 1 == r && e[r - 1] == t ? e.pop() : r > 1 && e[r - 1] == t && e[r - 2] != t && e.pop(), e
        }

        function te() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments[1] ? 'data-sep="' + E() + '"' : "";
            return se('<p class="' + c + '" ' + t + ">" + e + "</p>")
        }

        function re(e, t) {
            var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                i = t(e, !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]);
            if (void 0 !== i) return i;
            for (var n = Array.prototype.slice.call(r ? e.children : e.childNodes), a = void 0; a = n.shift();) {
                var o = re(a, t, r, !1);
                if (void 0 !== o) return o
            }
        }

        function ie(e, t, r) {
            var i = void 0,
                n = void 0,
                a = void 0,
                o = null,
                s = 0;
            r || (r = {});
            var c = function() {
                s = !1 === r.leading ? 0 : Date.now(), o = null, a = e.apply(i, n), o || (i = n = null)
            };
            return function() {
                var l = Date.now();
                s || !1 !== r.leading || (s = l);
                var d = t - (l - s);
                return i = this, n = arguments, d <= 0 || d > t ? (o && (clearTimeout(o), o = null), s = l, a = e.apply(i, n), o || (i = n = null)) : o || !1 === r.trailing || (o = setTimeout(c, d)), a
            }
        }

        function ne(e) {
            return !!/^[a-z0-9\-]+$/.test(e) && (-1 == e.indexOf("--") && ("-" != e[0] && "-" != e[e.length - 1] && !(e.length > 60)))
        }

        function ae(e, t, r) {
            e.decorations && each(e.decorations, function(e, i) {
                i.forEach(function(e) {
                    e[0] > t && (e[0] += r), e[1] > t && (e[1] += r)
                })
            }), e.brs && e.brs.forEach(function(r, i) {
                r > t && (e.brs[i] -= 1)
            })
        }

        function oe(e, t) {
            e.forEach(function(e) {
                e.lines.forEach(function(e) {
                    for (var r = 0, i = e.text.length; r < i; r++) {
                        var n = e.text.charCodeAt(r);
                        n >= 55296 && n <= 56319 && (ae(e, r, t), r += 1)
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
    },
    30: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(129),
            n = r(47);
        window.ArticleEditor = i.default, window.ArticleView = {
            initArticle: n.initArticle
        }, stManager.done(jsc("web/article.js"))
    },
    47: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "initArticle", function() {
            return v
        }), r.d(t, "updateArticle", function() {
            return y
        }), r.d(t, "deinitArticle", function() {
            return m
        });
        var i = r(25),
            n = r(11),
            a = r(15),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = void 0,
            c = void 0,
            l = void 0,
            d = void 0,
            u = void 0,
            p = void 0,
            h = void 0,
            f = void 0,
            _ = void 0,
            g = void 0;

        function v(e, t) {
            d = t || {}, h = e, window.cur && (window.cur.article = e), c = ge("article_view_" + e.owner_id + "_" + e.id), l = d.scrollNode || window, u = d.getScrollTop || function() {
                    return (document.scrollingElement || window.scrollNode || document.body).scrollTop
                }, s = gpeByClass("article_body", c) || gpeByClass("_article_layer", c), l.addEventListener("scroll", f = function() {
                    P()
                }, {
                    passive: !0
                }), P(), w(), I(),
                function() {
                    if (d.ga)
                        if (window.dataLayer = window.dataLayer || [], window.gtag) gtag("config", d.ga, {
                            page_location: window.location.href
                        });
                        else {
                            var e = document.createElement("script");
                            e.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + d.ga), e.setAttribute("async", "true"), document.head.appendChild(e), window.gtag = function() {
                                dataLayer.push(arguments)
                            }, gtag("js", new Date), gtag("config", d.ga)
                        }
                }(), b(), setTimeout(function() {
                    l.click && l.click(), l.focus()
                }, 10), window.onBodyResize = window.onBodyResize || function() {}, window.cur && cur.destroy.push(function() {
                    m()
                }), !d.mobile && window.AudioPlaylist && h.audiosList && h.audiosList.length > 0 && (cur.articlePlaylist = new AudioPlaylist(AudioPlaylist.TYPE_TEMP, h.owner_id, "article_" + h.id), cur.articlePlaylist.mergeWith({
                    list: h.audiosList
                }))
        }

        function y() {
            d.notFull = !1, w(), I(), P(), b()
        }

        function m() {
            f && (l.removeEventListener("scroll", f), f = !1), _ && (l.removeEventListener("scroll", _), _ = !1), clearTimeout(g)
        }

        function b() {
            if (!(isEmpty(h.ads) || d.notFull || isArray(h.ads) && 0 == h.ads.length)) {
                if (!window.mailRuSdsScriptLoaded) {
                    var e = document.createElement("script");
                    e.setAttribute("src", h.ads.script), e.setAttribute("async", "true"), document.head.appendChild(e), window.mailRuSdsScriptLoaded = !0
                }
                var t = ce("ins");
                for (var r in addClass(t, "mrg-tag"), addClass(t, "article_adsblock"), setStyle(t, {
                        display: "block",
                        "text-decoration": "none"
                    }), h.ads.data) h.ads.data.hasOwnProperty(r) && domData(t, r, "" + h.ads.data[r]);
                var i = geByClass1("article_misc_block");
                i ? i.firstChild ? domInsertBefore(t, i.firstChild) : i.appendChild(t) : domInsertAfter(t, c), window.MRGtag || (window.MRGtag = []), window.MRGtag.push({})
            }
        }

        function w() {
            each(geByClass("_article_unmute_button"), function(e, t) {
                t.addEventListener("click", function() {
                    var e = t.parentNode,
                        r = geByTag1("video", e);
                    r.muted = !r.muted, toggleClass(e, "article_object_unmuted", !r.muted)
                })
            }), each(geByTag("figure", c), function(e, t) {
                var r = parseInt(domData(t, "type"));
                r == n.ParagraphType.ObjectPhoto && Object(a.initPhotoCarousel)(t, d), d.mobile || r != n.ParagraphType.ObjectPhoto || function(e) {
                    if (d.noImageOpen) return;
                    var t = geByTag1("img", e),
                        r = domQuery1("[data-sizes]", e),
                        i = JSON.parse(domData(r, "sizes")),
                        a = Object(n.getAppropriateImage)(i[0], window.innerWidth, !0),
                        l = o(a, 3),
                        u = l[0],
                        h = l[1],
                        f = l[2],
                        _ = S({
                            width: h,
                            height: f
                        }, {
                            width: window.innerWidth,
                            height: window.innerHeight
                        }),
                        g = getW(e) < _.width && getH(e) < _.height;
                    if (!u || !g) return;
                    var v = geByClass1("article_photo_carousel__controls", e) || t;
                    addClass(v, "article_image_full_viewable");
                    var y = data(e, "changePhotoFunction");
                    v.addEventListener("click", function() {
                        var t = intval(domData(e, "photo-carousel-index"));
                        addClass(s, "article_no_scroll");
                        var r = geByTag1("figcaption", e),
                            n = se('<div class="article_full_view"><img class="article_full_view__image"></div>');
                        r && r.innerHTML && n.appendChild(se('<div class="article_full_view__caption"><div class="article_full_view__caption_inner">' + r.innerHTML + "</div></div>")), i.length > 1 && (toggleClass(O, "article_full_view__carousel", i.length > 1), C = se('<div class="article_full_view__right"></div>'), n.appendChild(C), E = se('<div class="article_full_view__left"></div>'), n.appendChild(E), C.addEventListener("click", function(e) {
                            return t = Math.min(i.length - 1, Math.max(0, t + 1)), j(a, i, t), y && y(1), cancelEvent(e)
                        }), E.addEventListener("click", function(e) {
                            return t = Math.min(i.length - 1, Math.max(0, t - 1)), j(a, i, t), y && y(-1), cancelEvent(e)
                        })), O = se('<div class="article_full_view__counter"><div class="article_full_view__counter_text"></div><div class="article_full_view__close"></div></div>'), n.appendChild(O), i.length > 1 && toggleClass(O, "article_full_view__carousel", i.length > 1), c.appendChild(n), n.addEventListener("click", function(e) {
                            domClosest("article_full_view__caption_inner", e.target) || x()
                        }), n.addEventListener("mousewheel", x), p = n;
                        var a = geByTag1("img", n);
                        j(a, i, t)
                    })
                }(t)
            })
        }

        function P() {
            var e = {
                    101: -2e3
                },
                t = u(),
                r = window.innerHeight,
                a = getXY(c)[1];
            each(geByTag("figure", c), function(s, c) {
                var l = intval(domData(c, "done"));
                if (!l) {
                    var u = getH(c),
                        p = getXY(c)[1] - a,
                        h = intval(domData(c, "type")),
                        f = void 0 !== e[h] ? e[h] : 60;
                    (l = function(e, t, r) {
                        var a = !1;
                        switch (t) {
                            case n.ParagraphType.ObjectPhoto:
                                if (e) {
                                    var s = geByTag1("img", r),
                                        c = getW(s) || d.width,
                                        l = domData(s, "baseurl");
                                    if (l) l = Object(i.imageProxyURL)(l, {
                                        size: c
                                    }), Object(n.preloadImage)(l, function() {
                                        removeClass(s, "article_object_photo__image_blur"), s.src = l
                                    });
                                    else {
                                        var u = domQuery1("[data-sizes]", r),
                                            p = JSON.parse(domData(u, "sizes"));
                                        p.forEach(function(e, t) {
                                            if (!(t > 3)) {
                                                var r = Object(n.getAppropriateImage)(p[t], c, !0),
                                                    i = o(r, 1),
                                                    a = i[0];
                                                Object(n.preloadImage)(a, function() {
                                                    0 == t && (removeClass(s, "article_object_photo__image_blur"), s.src = a)
                                                })
                                            }
                                        })
                                    }
                                    a = !0
                                }
                                break;
                            case n.ParagraphType.ObjectGIF:
                                if (!d.mobile) {
                                    var h = geByTag1("video", r);
                                    if (h)
                                        if (e) {
                                            if (h.hasAttribute("autoplay")) {
                                                var f = h.play();
                                                f && f.catch(function() {})
                                            }
                                        } else h.pause();
                                    else a = !0
                                }
                        }
                        return a
                    }(p <= t + r - f && t <= p + u - f, h, c)) && domData(c, "done", 1)
                }
            })
        }
        var C = void 0,
            E = void 0,
            O = void 0;
        var T = void 0;

        function j(e, t, r) {
            (toggleClass(E, "article_full_view__nav_hidden", 0 == r), toggleClass(C, "article_full_view__nav_hidden", r == t.length - 1), t.length > 1) && (geByClass1("article_full_view__counter_text", O).innerHTML = getLang("global_article_carousel_counter").replace("{counter}", r + 1).replace("{total}", t.length));
            T = r;
            var i = Object(n.getAppropriateImage)(t[r], window.innerWidth, !0),
                a = o(i, 3),
                s = a[0],
                c = S({
                    width: a[1],
                    height: a[2]
                }, {
                    width: window.innerWidth,
                    height: window.innerHeight
                }),
                l = !1;
            if (Object(n.preloadImage)(s, function() {
                    if (T === r) {
                        l = !0, c.width && isNumeric(c.width) ? setStyle(e, {
                            width: c.width,
                            height: c.height
                        }) : setStyle(e, {
                            width: null,
                            height: null
                        }), e.src = s, removeClass(e, "article_full_view__image_blurred");
                        for (var i = r; i < Math.min(r + 3, t.length); i++) {
                            var a = Object(n.getAppropriateImage)(t[i], window.innerWidth, !0),
                                d = o(a, 1)[0];
                            Object(n.preloadImage)(d)
                        }
                    }
                })) removeClass(e, "article_full_view__image_blurred");
            else {
                var d = Object(n.getAppropriateImage)(t[r], 200, !0),
                    u = o(d, 1)[0];
                Object(n.preloadImage)(u, function() {
                    T === r && (l || (setStyle(e, {
                        width: c.width,
                        height: c.height
                    }), e.src = u))
                }), addClass(e, "article_full_view__image_blurred")
            }
        }

        function x() {
            return !!p && (re(p), s && removeClass(s, "article_no_scroll"), p = !1, !0)
        }

        function S(e, t) {
            var r = e.width / e.height,
                i = {};
            return r > t.width / t.height ? (i.width = Math.min(t.width, e.width), i.height = e.height * (i.width / e.width)) : (i.height = Math.min(t.height, e.height), i.width = i.height * r), i
        }

        function I() {
            if (!d.notFull) {
                var e = getH(c),
                    t = getXY(c)[1] - scrollGetY(),
                    r = window.innerHeight,
                    i = Date.now(),
                    a = -1,
                    o = void 0,
                    s = [];
                f(0), l.addEventListener("scroll", _ = y, {
                    passive: !0
                }), y()
            }

            function p() {
                return Math.round((Date.now() - i) / 1e3)
            }

            function f(e) {
                if (!(a >= e)) {
                    for (var t = a + 1; t <= e; t++) s.push(t);
                    if (a = e, clearTimeout(o), o = setTimeout(v, 100), 3 == e && h.ttr) {
                        var r = h.ttr - p();
                        r > 0 && (g = setTimeout(function() {
                            document.hidden || (s = [a = 4], v())
                        }, 1e3 * r))
                    }
                }
            }

            function v() {
                s.length && (ajax.post(window.isMVK ? "article.php" : "al_articles.php", {
                    act: "stats",
                    scroll: s.join(","),
                    spent: p(),
                    hash: h.access_hash,
                    article_owner_id: h.owner_id,
                    article_id: h.id,
                    is_web_view: d.isWebView ? 1 : 0,
                    post_id: d.postId,
                    ref: window.cur ? window.cur.module : ""
                }), s.forEach(function(e) {
                    Object(n.mailruStatsPixel)("scroll_" + e, h.mailruStatsData)
                }), s = [])
            }

            function y() {
                var i = u();
                i > 0 && f(1);
                for (var n = 1; n < 4; n++) i + 3 * r / 4 > t + e * n / 3 && f(n + 1);
                i + r > e - 20 && f(4)
            }
        }
        window.initArticle = v, window.deinitArticle = m, window.updateArticle = y, window.articleCloseImageFullSize = x
    },
    50: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(123),
            n = r(6),
            a = r(11),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var s = function(e) {
            function t(r, i) {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, r, i, !0))
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
                var t = n.default.get(a.ParagraphType.ObjectAudioPlaylist, this.getMediaId());
                if (t.snippet) this._el.innerHTML = t.snippet;
                else {
                    var r = this.getMediaId().split("_"),
                        i = o(r, 2),
                        s = i[0],
                        c = i[1];
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
        }(i.default);
        t.default = s
    },
    58: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(123),
            n = r(11),
            a = r(6);
        var o = function(e) {
            function t(r, i) {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, r, i, !0))
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
                var e = a.default.get(n.ParagraphType.ObjectVideo, this.getMediaId());
                if (e && (e.editable || e.thumb)) {
                    var t = void 0;
                    if (e.thumb) t = e.thumb;
                    else t = Object(n.getAppropriateImage)(e.editable.sizes, this.getEditor().getWidth(!0))[0];
                    this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: e.duration || 0,
                        platform: e.platform || ""
                    }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>")), this._el.appendChild(se('<img class="article_ed__video_img" src=' + t + ' contenteditable="false" />'))
                }
                return this._el
            }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
        }(i.default);
        t.default = o
    },
    6: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = {};

        function n(e) {
            return (e = e.split("_"))[0] + "_" + e[1]
        }
        var a = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return e.add = function(e, t, r) {
                i[e] = i[e] || {}, i[e][n(t)] = r
            }, e.get = function(e, t, r) {
                return void 0 !== r && (t = (t = t.split(","))[r]), i[e] = i[e] || {}, i[e][n(t)]
            }, e
        }();
        t.default = a
    },
    65: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "ge", function() {
            return l
        }), r.d(t, "geByTag", function() {
            return d
        }), r.d(t, "geByTag1", function() {
            return u
        }), r.d(t, "geByClass", function() {
            return p
        }), r.d(t, "geByClass1", function() {
            return h
        }), r.d(t, "gpeByClass", function() {
            return f
        }), r.d(t, "domQuery", function() {
            return _
        }), r.d(t, "domQuery1", function() {
            return g
        }), r.d(t, "domClosest", function() {
            return v
        }), r.d(t, "domClosestByTag", function() {
            return y
        }), r.d(t, "gpeByTag", function() {
            return m
        }), r.d(t, "ce", function() {
            return b
        }), r.d(t, "re", function() {
            return w
        }), r.d(t, "se", function() {
            return P
        }), r.d(t, "sech", function() {
            return C
        }), r.d(t, "rs", function() {
            return E
        }), r.d(t, "psr", function() {
            return O
        }), r.d(t, "domReplaceEl", function() {
            return T
        }), r.d(t, "domEL", function() {
            return j
        }), r.d(t, "domNS", function() {
            return x
        }), r.d(t, "domPS", function() {
            return S
        }), r.d(t, "domFC", function() {
            return I
        }), r.d(t, "domLC", function() {
            return k
        }), r.d(t, "domPN", function() {
            return L
        }), r.d(t, "domChildren", function() {
            return A
        }), r.d(t, "domInsertBefore", function() {
            return M
        }), r.d(t, "domInsertAfter", function() {
            return N
        }), r.d(t, "domByClass", function() {
            return D
        }), r.d(t, "domData", function() {
            return R
        }), r.d(t, "domChildIndex", function() {
            return B
        }), r.d(t, "domCA", function() {
            return z
        }), r.d(t, "domClosestSibling", function() {
            return H
        }), r.d(t, "matchesSelector", function() {
            return U
        }), r.d(t, "isHover", function() {
            return F
        }), r.d(t, "isAncestor", function() {
            return W
        }), r.d(t, "getScroll", function() {
            return Y
        }), r.d(t, "domClosestPositioned", function() {
            return $
        }), r.d(t, "domClosestOverflowHidden", function() {
            return V
        }), r.d(t, "show", function() {
            return q
        }), r.d(t, "hide", function() {
            return G
        }), r.d(t, "isVisible", function() {
            return Q
        }), r.d(t, "clientHeight", function() {
            return X
        }), r.d(t, "getClientRectOffsetY", function() {
            return K
        }), r.d(t, "toggle", function() {
            return J
        }), r.d(t, "boundingRectEnabled", function() {
            return Z
        }), r.d(t, "getXYRect", function() {
            return ee
        }), r.d(t, "getXY", function() {
            return te
        }), r.d(t, "isWindow", function() {
            return re
        }), r.d(t, "getSize", function() {
            return ie
        }), r.d(t, "getW", function() {
            return ne
        }), r.d(t, "getH", function() {
            return ae
        }), r.d(t, "hasClass", function() {
            return oe
        }), r.d(t, "addClass", function() {
            return se
        }), r.d(t, "addClassDelayed", function() {
            return ce
        }), r.d(t, "removeClass", function() {
            return le
        }), r.d(t, "removeClassDelayed", function() {
            return de
        }), r.d(t, "toggleClass", function() {
            return ue
        }), r.d(t, "toggleClassDelayed", function() {
            return pe
        }), r.d(t, "replaceClass", function() {
            return he
        }), r.d(t, "getStyle", function() {
            return fe
        }), r.d(t, "setStyle", function() {
            return _e
        }), r.d(t, "setStyleDelayed", function() {
            return ge
        }), r.d(t, "setPseudoStyle", function() {
            return ve
        }), r.d(t, "data", function() {
            return ye
        }), r.d(t, "attr", function() {
            return me
        }), r.d(t, "removeAttr", function() {
            return be
        }), r.d(t, "removeData", function() {
            return we
        }), r.d(t, "cleanElems", function() {
            return Pe
        }), r.d(t, "setTitle", function() {
            return Ce
        }), r.d(t, "getZoom", function() {
            return Ee
        }), r.d(t, "val", function() {
            return Oe
        }), r.d(t, "elfocus", function() {
            return Te
        }), r.d(t, "traverseParent", function() {
            return je
        }), r.d(t, "setDocumentTitle", function() {
            return Se
        }), r.d(t, "lockDocumentTitle", function() {
            return Ie
        });
        var i, n, a, o, s = r(9),
            c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function l(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        }

        function d(e, t) {
            return (t = l(t) || document).getElementsByTagName(e)
        }

        function u(e, t) {
            return (t = l(t) || document).querySelector && t.querySelector(e) || d(e, t)[0]
        }

        function p(e, t, r) {
            t = l(t) || document, r = r || "*";
            var i = [];
            if (t.querySelectorAll && "*" != r) return t.querySelectorAll(r + "." + e);
            if (t.getElementsByClassName) {
                var n = t.getElementsByClassName(e);
                if ("*" != r) {
                    r = r.toUpperCase();
                    for (var a = 0, o = n.length; a < o; ++a) n[a].tagName.toUpperCase() == r && i.push(n[a])
                } else i = Array.prototype.slice.call(n);
                return i
            }
            var s = d(r, t),
                c = new RegExp("(^|\\s)" + e + "(\\s|$)");
            for (a = 0, o = s.length; a < o; ++a) c.test(s[a].className) && i.push(s[a]);
            return i
        }

        function h(e, t, r) {
            return t = l(t) || document, r = r || "*", t.querySelector && t.querySelector(r + "." + e) || p(e, t, r)[0]
        }

        function f(e, t, r) {
            if (!(t = l(t))) return null;
            for (; r !== t && (t = t.parentNode);)
                if (oe(t, e)) return t;
            return null
        }

        function _(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function g(e, t) {
            return (t || document).querySelector(e)
        }

        function v(e, t) {
            return oe(t, e) ? t : f(e, t)
        }

        function y(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : m(e, t)
        }

        function m(e, t) {
            if (!(t = l(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function b(e, t, r) {
            var i = document.createElement(e);
            return t && extend(i, t), r && _e(i, r), i
        }

        function w(e) {
            return (e = l(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }

        function P(e) {
            return I(b("div", {
                innerHTML: e
            }))
        }

        function C(e) {
            return A(b("div", {
                innerHTML: e
            }))
        }

        function E(e, t) {
            return each(t, function(t, r) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === r ? "" : r).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function O(e) {
            return "https:" != locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function T(e, t) {
            return isString(t) && (t = P(t)), L(e).replaceChild(t, e), t
        }

        function j(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }

        function x(e) {
            return j((e || {}).nextSibling)
        }

        function S(e) {
            return j((e || {}).previousSibling, 1)
        }

        function I(e) {
            return j((e || {}).firstChild)
        }

        function k(e) {
            return j((e || {}).lastChild, 1)
        }

        function L(e) {
            return (e || {}).parentNode
        }

        function A(e) {
            for (var t = [], r = e.childNodes, i = 0; i < r.length; i++) r[i].tagName && t.push(r[i]);
            return t
        }

        function M(e, t) {
            var r = L(t);
            return r && r.insertBefore(e, t)
        }

        function N(e, t) {
            var r = L(t);
            return r && r.insertBefore(e, x(t))
        }

        function D(e, t) {
            return e ? h(t, e) : e
        }

        function R(e, t, r) {
            return e ? void 0 !== r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
        }

        function B(e) {
            for (var t = 0; null != (e = S(e));) t++;
            return t
        }

        function z(e, t) {
            do {
                e = L(e)
            } while (e && !U(e, t));
            return e
        }

        function H(e, t, r) {
            for (var i = null; null === i && e;)(e = -1 === r ? S(e) : x(e)) && U(e, t) && (i = e);
            return i
        }

        function U(e, t) {
            return !(!(e = l(e)) || e == document) && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
                for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t[r] !== this;);
                return r > -1
            }).call(e, t)
        }

        function F(e) {
            return U(e, ":hover")
        }

        function W(e, t) {
            var r = l(e);
            if (t = l(t), !e || !t) return !1;
            for (; r = r.parentNode;)
                if (r == t) return !0;
            return !1
        }

        function Y() {
            var e = browser.msie6 ? l("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function $(e, t) {
            for (var r = (t = t || {}).fromEl || L(e), i = t.positions || ["relative", "absolute", "fixed"]; r && r != bodyNode;) {
                var n = fe(r, "position");
                if (inArray(n, i) && (!t.noOverflow || "hidden" != fe(r, "overflow"))) break;
                r = L(r)
            }
            return r
        }

        function V(e, t) {
            for (var r, i, n, a, o = e = l(e); o && o.tagName && o !== bodyNode && (r = fe(o, "position"), i = fe(o, "overflow"), n = fe(o, "transform"), !t || !browser.mozilla || "page_wrap" == o.id || o === e || "visible" === i || ("static" === r ? a && "relative" !== a : "fixed" === a));) "none" !== n ? a = void 0 : "static" !== r && "fixed" !== a && (a = r), o = L(o);
            return o
        }

        function q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; r < t; r++) q(arguments[r]);
            else if ((e = l(e)) && e.style) {
                var i = e.olddisplay,
                    n = "block",
                    a = e.tagName.toLowerCase();
                e.style.display = i || "", "none" === fe(e, "display") && (n = oe(e, "inline") || oe(e, "_inline") ? "inline" : oe(e, "_inline_block") ? "inline-block" : "tr" !== a || browser.msie ? "table" !== a || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = n)
            }
        }

        function G(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; r < t; r++) G(arguments[r]);
            else if ((e = l(e)) && e.style) {
                var i = fe(e, "display");
                e.olddisplay = "none" != i ? i : "", e.style.display = "none"
            }
        }

        function Q(e) {
            return !(!(e = l(e)) || !e.style) && "none" != fe(e, "display")
        }

        function X() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function K(e, t, r) {
            e = l(e), r = r || 0;
            var i = te(e)[1],
                n = ie(e)[1],
                a = window,
                o = document.documentElement,
                s = Math.max(intval(a.innerHeight), intval(o.clientHeight)),
                c = l("page_header_cont"),
                d = o.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                u = vk.staticheader ? Math.max(0, ie(c)[1] - d) : ie(c)[1];
            if (t) {
                if (i + n < d + u + r) return i + n - d - u - r;
                if (i > d + s - r) return i - d - s + r
            } else {
                if (i < d + u + r) return i - d - u - r;
                if (i + n > d + s - r) return i + n - d - s + r
            }
            return 0
        }

        function J(e, t) {
            return void 0 === t && (t = !Q(e)), t ? q(e) : G(e), t
        }

        function Z(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function ee(e, t) {
            var r;
            if (t && "inline" == fe(e, "display")) {
                var i = e.getClientRects();
                r = i && i[0] || e.getBoundingClientRect()
            } else r = e.getBoundingClientRect();
            return r
        }

        function te(e, t) {
            if (!(e = l(e))) return [0, 0];
            var r, i, n = {
                    top: 0,
                    left: 0
                },
                a = e.ownerDocument;
            return a ? (r = a.documentElement, Z(e) && (n = ee(e, !0)), i = a == a.window ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow), [n.left + (t ? 0 : i.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), n.top + (t ? 0 : i.pageYOffset || r.scrollTop) - (r.clientTop || 0)]) : [0, 0]
        }

        function re(e) {
            return null != e && e === e.window
        }

        function ie(e, t, r) {
            e = l(e);
            var i, n = [0, 0],
                a = document.documentElement;
            if (t && "border-box" === fe(e, "boxSizing") && (t = !1), e == document) n = [Math.max(a.clientWidth, bodyNode.scrollWidth, a.scrollWidth, bodyNode.offsetWidth, a.offsetWidth), Math.max(a.clientHeight, bodyNode.scrollHeight, a.scrollHeight, bodyNode.offsetHeight, a.offsetHeight)];
            else if (e) {
                var o = function() {
                    if (n = Z(e) && (i = ee(e, r)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t) {
                        each(n, function(t, r) {
                            each(t ? ["Top", "Bottom"] : ["Left", "Right"], function() {
                                n[t] -= parseFloat(fe(e, "padding" + this)) || 0, n[t] -= parseFloat(fe(e, "border" + this + "Width")) || 0
                            })
                        })
                    }
                };
                if (Q(e)) o();
                else {
                    var s = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        c = {},
                        d = !1;
                    e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), each(s, function(t, r) {
                        c[t] = e.style[t], e.style[t] = r
                    }), o(), each(s, function(t, r) {
                        e.style[t] = c[t]
                    }), d && (e.style.cssText = d)
                }
            }
            return n
        }

        function ne(e) {
            return ie(e)[0]
        }

        function ae(e) {
            return ie(e)[1]
        }

        function oe(e, t) {
            return !!((e = l(e)) && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0)
        }

        function se(e, t) {
            (e = l(e)) && !oe(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
        }

        function ce(e, t) {
            return setTimeout(se.pbind(e, t), 0)
        }

        function le(e, t) {
            (e = l(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }

        function de(e, t) {
            return setTimeout(le.pbind(e, t), 0)
        }

        function ue(e, t, r) {
            return void 0 === r && (r = !oe(e, t)), (r ? se : le)(e, t), r
        }

        function pe(e, t, r) {
            return void 0 === r && (r = !oe(e, t)), (r ? ce : de)(e, t), r
        }

        function he(e, t, r) {
            le(e, t), se(e, r)
        }

        function fe(e, t, r) {
            if (e = l(e), isArray(t)) {
                var i = {};
                return each(t, function(t, r) {
                    i[r] = fe(e, r)
                }), i
            }
            if (!e) return "";
            if (void 0 === r && (r = !0), !r && "opacity" == t && browser.msie) return (s = e.style.filter) ? s.indexOf("opacity=") >= 0 ? parseFloat(s.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : "";
            if (!r && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var n, a = document.defaultView || window;
            if (a.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var o = a.getComputedStyle(e, null);
                o && (n = o.getPropertyValue(t))
            } else if (e.currentStyle) {
                var s;
                if ("opacity" == t && browser.msie) return (s = e.currentStyle.filter) && s.indexOf("opacity=") >= 0 ? parseFloat(s.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1";
                var c = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" == (n = e.currentStyle[t] || e.currentStyle[c]) && (n = 0), n = (n + "").split(" "), each(n, function(t, r) {
                    if (!/^\d+(px)?$/i.test(r) && /^\d/.test(r)) {
                        var i = e.style,
                            a = i.left,
                            o = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, i.left = r || 0, n[t] = i.pixelLeft + "px", i.left = a, e.runtimeStyle.left = o
                    }
                }), n = n.join(" ")
            }
            if (r && ("width" == t || "height" == t)) {
                var d = ie(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                n = (intval(n) ? Math.max(floatval(n), d) : d) + "px"
            }
            return n
        }

        function _e(e, t, r) {
            if (e = l(e)) {
                if ("object" == (void 0 === t ? "undefined" : c(t))) return each(t, function(t, r) {
                    _e(e, t, r)
                });
                if ("opacity" == t) browser.msie && ((r + "").length ? e.style.filter = 1 !== r ? "alpha(opacity=" + 100 * r + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== r && (e.style.opacity = r);
                else try {
                    var i = "number" == typeof r;
                    i && /height|width/i.test(t) && (r = Math.abs(r)), r = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? r + "px" : r, e.style[t] !== r && (e.style[t] = r)
                } catch (e) {
                    debugLog("setStyle error: ", [t, r], e)
                }
            }
        }

        function ge(e, t, r) {
            setTimeout(_e.pbind(e, t, r), 0)
        }

        function ve(e, t, r) {
            var i = ye(e, "pseudo-id");
            i || (ye(e, "pseudo-id", i = irand(1e8, 999999999)), se(e, "_pseudo_" + i));
            var n = t + "-style-" + i,
                a = l(n),
                o = "._pseudo_" + i + ":" + t + "{";
            a || (a = headNode.appendChild(b("style", {
                id: n,
                type: "text/css"
            }))), each(r, function(e, t) {
                o += e + ": " + t + " !important;"
            }), o += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(o, 0)) : a.styleSheet && (a.styleSheet.cssText = o)
        }

        function ye(e, t, r) {
            if (!e) return !1;
            var i = e[vkExpand];
            return i || (i = e[vkExpand] = ++vkUUID), void 0 !== r && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = r), t ? vkCache[i] && vkCache[i][t] : i
        }

        function me(e, t, r) {
            return e = l(e), void 0 === r ? e.getAttribute(t) : (e.setAttribute(t, r), r)
        }

        function be(e) {
            for (var t = 0, r = arguments.length; t < r; ++t) {
                var i = arguments[t];
                if (void 0 !== e[i]) try {
                    delete e[i]
                } catch (t) {
                    try {
                        e.removeAttribute(i)
                    } catch (e) {}
                }
            }
        }

        function we(e, t) {
            var r = !!e && e[vkExpand];
            if (r)
                if (t) {
                    if (vkCache[r]) {
                        delete vkCache[r][t], t = "";
                        var i = 0;
                        for (t in vkCache[r])
                            if ("__elem" !== t) {
                                i++;
                                break
                            }
                        i || we(e)
                    }
                } else removeEvent(e), be(e, vkExpand), delete vkCache[r]
        }

        function Pe() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var r = l(e[t]);
                r && (we(r), be(r, "btnevents"))
            }
        }

        function Ce(e, t, r) {
            if ((e = l(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", r || e.innerText || e.textContent);
                else {
                    var i = u("b", e);
                    i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", r || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function Ee() {
            var e = l("zoom_test_1") || document.body.appendChild(b("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (l("zoom_test_2") || document.body.appendChild(b("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / e.offsetLeft
        }

        function Oe(e, t, r) {
            if (e = l(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !r && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !r && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || ""
        }

        function Te(e, t, r) {
            e = l(e);
            try {
                if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== r && !1 !== r || (r = t), e.createTextRange) {
                    var i = e.createTextRange();
                    i.collapse(!0), i.moveEnd("character", r), i.moveStart("character", t), i.select()
                } else e.setSelectionRange && e.setSelectionRange(t, r)
            } catch (e) {}
        }

        function je(e, t, r) {
            for (e = l(e), r = r || 999; e && !t(e);) {
                if (0 == --r) return !1;
                try {
                    if ((e = L(e)) == document) break
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        window.cf = (i = document, n = i.createDocumentFragment(), a = i.createElement("div"), o = i.createRange && i.createRange(), n.appendChild(a), o && o.selectNodeContents(a), o && o.createContextualFragment ? function(e) {
            return e ? o.createContextualFragment(e) : i.createDocumentFragment()
        } : function(e) {
            if (!e) return i.createDocumentFragment();
            a.innerHTML = e;
            for (var t = i.createDocumentFragment(); a.firstChild;) t.appendChild(a.firstChild);
            return t
        }), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var r in t)
                    if (void 0 !== e.style[t[r] + "Transform"]) return t[r] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + Object(s.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var xe = !1;

        function Se(e) {
            if (!xe) return window.document.title = replaceEntities(e)
        }

        function Ie(e) {
            xe = e, e && window.cur && window.cur.destroy.push(function() {
                Ie(!1)
            })
        }
        window.ge = l, window.geByTag = d, window.geByTag1 = u, window.geByClass = p, window.geByClass1 = h, window.gpeByClass = f, window.domQuery = _, window.domQuery1 = g, window.domClosest = v, window.ce = b, window.re = w, window.se = P, window.sech = C, window.rs = E, window.psr = O, window.domReplaceEl = T, window.domEL = j, window.domNS = x, window.domPS = S, window.domFC = I, window.domLC = k, window.domPN = L, window.domChildren = A, window.domInsertBefore = M, window.domInsertAfter = N, window.domByClass = D, window.domData = R, window.domChildIndex = B, window.domCA = z, window.domClosestSibling = H, window.matchesSelector = U, window.isHover = F, window.isAncestor = W, window.getScroll = Y, window.domClosestPositioned = $, window.domClosestOverflowHidden = V, window.show = q, window.hide = G, window.isVisible = Q, window.clientHeight = X, window.getClientRectOffsetY = K, window.toggle = J, window.boundingRectEnabled = Z, window.getXYRect = ee, window.getXY = te, window.isWindow = re, window.getSize = ie, window.hasClass = oe, window.addClass = se, window.addClassDelayed = ce, window.removeClass = le, window.removeClassDelayed = de, window.toggleClass = ue, window.toggleClassDelayed = pe, window.replaceClass = he, window.getStyle = fe, window.setStyle = _e, window.setStyleDelayed = ge, window.setPseudoStyle = ve, window.data = ye, window.attr = me, window.removeAttr = be, window.removeData = we, window.cleanElems = Pe, window.setTitle = Ce, window.getZoom = Ee, window.val = Oe, window.elfocus = Te, window.traverseParent = je, window.getH = ae, window.getW = ne, window.domClosestByTag = y, window.setDocumentTitle = Se, window.lockDocumentTitle = Ie
    },
    81: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(123),
            n = r(11),
            a = r(6),
            o = r(20),
            s = r(28),
            c = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var l = void 0,
            d = function(e) {
                function t(r, i, n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, r, i, !0));
                    return a._currentImageIndex = 0, a.paragraph = n, a
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
                        i = geByClass1("article_ed__carousel_nav_btn_left", t),
                        n = geByClass1("article_ed__carousel_nav_btn_right", t),
                        a = function() {
                            var t = e.getMediaIdsCount() > 1;
                            r.innerHTML = t ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                        };
                    return a(), r.addEventListener("click", function(r) {
                        var i = e.getEditor();
                        return i.closeAllCarouselEditors(), i._resizeTooltip && i._resizeTooltip.hide(), addClass(e._objectEl, "article_ed__carousel_edit_open"), e._carouselEditor = new o.default(t, e, function(r) {
                            r ? (delete e._fixedImageSize, e.setMediaId(r), e._rerender(), e.getEditor().saveUndoStateAndDraft(), a(), e._setImageIndex(0, t), removeClass(e._objectEl, "article_ed__carousel_edit_open"), delete e._carouselEditor) : e.getEditor().removeObject(e)
                        }, e.getEditor().getLimits().maxCarouselItems), cancelEvent(r)
                    }), i.addEventListener("click", function() {
                        e._setImageIndex(e._getImageIndex() - 1, t)
                    }), n.addEventListener("click", function() {
                        e._setImageIndex(e._getImageIndex() + 1, t)
                    }), this._setImageIndex(0, t), t
                }, t.prototype._getImageIndex = function() {
                    return Math.min(this.getMediaIdsCount() - 1, this._currentImageIndex)
                }, t.prototype._setImageIndex = function(e, t) {
                    this._currentImageIndex = Math.min(Math.max(0, e), this.getMediaIdsCount());
                    var r = geByClass1("article_ed__carousel_nav_btn", t);
                    toggleClass(r, "no_left", 0 == this._currentImageIndex), toggleClass(r, "no_right", this._currentImageIndex == this.getMediaIdsCount() - 1), toggleClass(this._objectEl, "article__carousel", this._isCarousel());
                    var i = geByClass1("article_ed__carousel_counter", t);
                    this._isCarousel() ? (setStyle(i, "display", "inline-block"), i.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(i), this._drawImage()
                }, t.prototype._rerender = function() {
                    var e = this._el,
                        t = this.render();
                    domReplaceEl(e, t)
                }, t.prototype.render = function() {
                    this._el = se('\n      <div class="article_ed__img_content">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                    var e = a.default.get(n.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
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
                                        e._mediaId = t, a.default.add(n.ParagraphType.ObjectPhoto, t, {
                                            size: Object(s.getPhotoSize)(r.editable.sizes),
                                            sizes: r.editable.sizes
                                        }), e._drawImage(), e._onUploadCallback && e._onUploadCallback()
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
                    var i = new FileReader;
                    i.onload = function() {
                        r._initUpload(), Upload.onFileApiSend(r._upload, [e])
                    }, i.readAsDataURL(e)
                }, t.prototype._updateSize = function() {}, t.prototype._drawImage = function() {
                    var e = this,
                        t = a.default.get(n.ParagraphType.ObjectPhoto, this.getMediaId(), this._getImageIndex()),
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
                        var i = Object(n.getAppropriateImage)(t.sizes, r),
                            o = c(i, 1)[0],
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
                    var e = a.default.get(n.ParagraphType.ObjectPhoto, this.getMediaId(), 0);
                    return !(!e && !e.size) && e.size[0] >= 720
                }, t
            }(i.default);
        t.default = d
    },
    82: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(123),
            n = r(6),
            a = r(11);
        var o = function(e) {
            function t(r, i) {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, r, i, !0))
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
                var t = n.default.get(a.ParagraphType.ObjectGIF, this.getMediaId());
                if (t)
                    if (t.video) {
                        if (this._videoEl = ce("video", {
                                autoplay: !0,
                                loop: "loop",
                                muted: !0,
                                src: t.video + "&mp4=1"
                            }), t.size) {
                            var r = t.size[0] < t.size[1],
                                i = !this._isSmallGifSize();
                            (r || i) && setStyle(this._videoEl, {
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
                var e = n.default.get(a.ParagraphType.ObjectGIF, this.getMediaId());
                return !(!e && !e.size) && e.size[0] > this.getEditor().getOptions().minGifWidthExpand
            }, t
        }(i.default);
        t.default = o
    },
    9: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "vkLocal", function() {
            return a
        }), r.d(t, "lTimeout", function() {
            return o
        }), r.d(t, "rand", function() {
            return s
        }), r.d(t, "irand", function() {
            return c
        }), r.d(t, "isUndefined", function() {
            return l
        }), r.d(t, "isFunction", function() {
            return d
        }), r.d(t, "isArray", function() {
            return u
        }), r.d(t, "isString", function() {
            return p
        }), r.d(t, "isObject", function() {
            return h
        }), r.d(t, "isEmpty", function() {
            return f
        }), r.d(t, "vkNow", function() {
            return _
        }), r.d(t, "vkImage", function() {
            return g
        }), r.d(t, "trim", function() {
            return v
        }), r.d(t, "stripHTML", function() {
            return y
        }), r.d(t, "escapeRE", function() {
            return m
        }), r.d(t, "intval", function() {
            return b
        }), r.d(t, "floatval", function() {
            return w
        }), r.d(t, "positive", function() {
            return P
        }), r.d(t, "isNumeric", function() {
            return C
        }), r.d(t, "winToUtf", function() {
            return E
        }), r.d(t, "replaceEntities", function() {
            return O
        }), r.d(t, "clean", function() {
            return T
        }), r.d(t, "unclean", function() {
            return j
        }), r.d(t, "each", function() {
            return x
        }), r.d(t, "indexOf", function() {
            return S
        }), r.d(t, "inArray", function() {
            return I
        }), r.d(t, "clone", function() {
            return k
        }), r.d(t, "arrayKeyDiff", function() {
            return L
        }), r.d(t, "extend", function() {
            return A
        }), r.d(t, "addTemplates", function() {
            return M
        }), r.d(t, "getTemplate", function() {
            return N
        }), r.d(t, "serializeForm", function() {
            return D
        }), r.d(t, "extractUrls", function() {
            return z
        }), r.d(t, "isRetina", function() {
            return H
        }), r.d(t, "getCaretCharacterOffsetWithin", function() {
            return U
        }), r.d(t, "formatCount", function() {
            return F
        }), r.d(t, "encodeHtml", function() {
            return $
        }), r.d(t, "decodeHtml", function() {
            return V
        });
        var i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            i = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0);
                        } catch (e) {
                            n = !0, a = e
                        } finally {
                            try {
                                !i && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function a(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function o(e, t) {
            return setTimeout(a(e), t)
        }

        function s(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function c(e, t) {
            return Math.floor(s(e, t))
        }

        function l(e) {
            return void 0 === e
        }

        function d(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        }

        function u(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function p(e) {
            return "string" == typeof e
        }

        function h(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function f(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function _() {
            return +new Date
        }

        function g() {
            return window.Image ? new Image : ce("img")
        }

        function v(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function y(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function m(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function b(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function w(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function P(e) {
            return (e = b(e)) < 0 ? 0 : e
        }

        function C(e) {
            return !isNaN(e)
        }

        function E(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = b(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function O(e) {
            return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function T(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function j(e) {
            return O(e.replace(/\t/g, "\n"))
        }

        function x(e, t) {
            if (h(e) || void 0 === e.length) {
                for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r) && !1 === t.call(e[r], r, e[r])) break
            } else
                for (var i = 0, n = e.length; i < n; i++) {
                    var a = e[i];
                    if (!1 === t.call(a, i, a)) break
                }
            return e
        }

        function S(e, t, r) {
            for (var i = r || 0, n = (e || []).length; i < n; i++)
                if (e[i] == t) return i;
            return -1
        }

        function I(e, t) {
            return -1 != S(t, e)
        }

        function k(e, t) {
            var r = h(e) || void 0 === e.length ? {} : [];
            for (var i in e)(!/webkit/i.test(_ua) || "layerX" != i && "layerY" != i && "webkitMovementX" != i && "webkitMovementY" != i) && (t && "object" === n(e[i]) && "prototype" !== i && null !== e[i] ? r[i] = k(e[i]) : r[i] = e[i]);
            return r
        }

        function L(e) {
            var t, r, i = {},
                n = 1,
                a = arguments.length,
                o = arguments;
            for (t in e) {
                for (r = !1, n = 1; n < a; n++) o[n][t] && o[n][t] == e[t] && (r = !0);
                r || (i[t] = e[t])
            }
            return i
        }

        function A() {
            var e, t = arguments,
                r = t[0] || {},
                i = 1,
                a = t.length,
                o = !1;
            for ("boolean" == typeof r && (o = r, r = t[1] || {}, i = 2), "object" === (void 0 === r ? "undefined" : n(r)) || d(r) || (r = {}); i < a; ++i)
                if (null != (e = t[i]))
                    for (var s in e) {
                        var c = r[s],
                            l = e[s];
                        r !== l && (o && l && "object" === (void 0 === l ? "undefined" : n(l)) && !l.nodeType ? r[s] = A(o, c || (null != l.length ? [] : {}), l) : void 0 !== l && (r[s] = l))
                    }
            return r
        }

        function M(e) {
            window.templates = window.templates || {}, A(window.templates, e)
        }

        function N(e, t) {
            var r = (window.templates = window.templates || {})[e];
            return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
        }

        function D(e) {
            if ("object" != (void 0 === e ? "undefined" : n(e))) return !1;
            var t = {},
                r = function(t) {
                    return geByTag(t, e)
                },
                i = function(r, i) {
                    if (i.name)
                        if ("text" != i.type && i.type)
                            if (i.getAttribute("bool")) {
                                var n = val(i);
                                if (!n || "0" === n) return;
                                t[i.name] = 1
                            } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                    else t[i.name] = val(i)
                };
            return x(r("input"), function(e, t) {
                if ("radio" != t.type && "checkbox" != t.type || t.checked) return i(0, t)
            }), x(r("select"), i), x(r("textarea"), i), t
        }
        window.PageID = window.PageID || 1;
        var R = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

        function z(e, t) {
            for (var r, i = t ? B : R, n = []; e && (r = e.match(i));) {
                e = e.substr(r.index + r[0].length);
                var a = 0;
                r[4] || (a = 7), n.push({
                    url: r[2 + a],
                    query: r[5 + a] || "",
                    domain: r[4 + a]
                })
            }
            return n
        }

        function H() {
            return window.devicePixelRatio >= 2
        }

        function U(e) {
            var t = 0,
                r = 0,
                i = e.ownerDocument || e.document,
                n = i.defaultView || i.parentWindow;
            if (n.getSelection().rangeCount > 0) {
                var a = n.getSelection().getRangeAt(0),
                    o = a.cloneRange();
                o.selectNodeContents(e), o.setEnd(a.startContainer, a.startOffset), t = o.toString().length, o.setEnd(a.endContainer, a.endOffset), r = o.toString().length
            }
            return [t, r]
        }

        function F(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? F(e = (e = b(e / 1e5)) > 1e3 ? b(e / 10) : e / 10, A(t, {
                noCheck: !0
            }), !0) + "M" : e >= r && !t.noCheck ? F(e = (e = b(e / 100)) > 100 ? b(e / 10) : e / 10, A(t, {
                noCheck: !0
            }), !0) + "K" : langNumeric(e, "%s", !0).replace(/,/g, ".")
        }
        var W, Y = i((W = null, [function(e) {
                return W || (W = se("<span> </span>")), W.innerText = e, W.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(e) {
                return W || (W = se("<span> </span>")), W.innerHTML = e, W.innerText
            }]), 2),
            $ = Y[0],
            V = Y[1];
        window.isRetina = H, window.extractUrls = z, window.serializeForm = D, window.addTemplates = M, window.getTemplate = N, window.rand = s, window.irand = c, window.isUndefined = l, window.isFunction = d, window.isArray = u, window.isString = p, window.isObject = h, window.isEmpty = f, window.vkNow = _, window.vkImage = g, window.trim = v, window.stripHTML = y, window.escapeRE = m, window.intval = b, window.floatval = w, window.positive = P, window.isNumeric = C, window.winToUtf = E, window.replaceEntities = O, window.clean = T, window.unclean = j, window.each = x, window.indexOf = S, window.inArray = I, window.clone = k, window.arrayKeyDiff = L, window.extend = A, window.vkLocal = a, window.lTimeout = o, window.getCaretCharacterOffsetWithin = U, window.formatCount = F, window.encodeHtml = $, window.decodeHtml = V
    }
});