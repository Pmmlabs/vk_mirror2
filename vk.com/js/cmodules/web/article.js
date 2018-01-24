! function(e) {
    function t(a) {
        if (r[a]) return r[a].exports;
        var i = r[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
}({
    0: function(e, t, r) {
        e.exports = r(78)
    },
    10: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.Sequences = [{
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
    19: function(e, t, r) {
        "use strict";

        function a(e) {
            o = e
        }

        function i(e) {
            var t = [];
            e.length > o.maxParagraphs && t.push(getLang("pages_article_ed_limit_paragraphs").replace("{count}", e.length).replace("{limit}", o.maxParagraphs));
            var r = 0,
                a = 0;
            return e.forEach(function(e) {
                var i = 0;
                e.lines.forEach(function(e) {
                    r += e.text.length, i += e.text.length
                }), (0, n.isObjectParagraph)(e) && a++, i > o.maxSymbolsPerParagraph && t.push(getLang("pages_article_ed_limit_symbols_per_par").replace("{count}", i).replace("{limit}", o.maxSymbolsPerParagraph))
            }), r > o.maxSymbols && t.push(getLang("pages_article_ed_limit_symbols").replace("{count}", r).replace("{limit}", o.maxSymbols)), a > o.maxObjects && t.push(getLang("pages_article_ed_limit_objects").replace("{count}", a).replace("{limit}", o.maxObjects)), t.length && t.push(getLang("pages_article_ed_limit")), t.join("<br>")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.initLimits = a, t.checkLimits = i;
        var n = r(92),
            o = void 0
    },
    26: function(e, t, r) {
        "use strict";

        function a(e, t, r) {
            var a = [];
            return e.forEach(function(e, i) {
                if (!r || (0, o.isObjectParagraph)(e) || !(0, o.isParagraphEmpty)(e) || 0 == i) {
                    var s = {};
                    for (var l in e) {
                        if (!e.hasOwnProperty(l)) return;
                        if (!l.startsWith("_") || "_uuid" === l && t) {
                            var c = e[l];
                            s[l] = isObject(c) || isArray(c) ? clone(c, !0) : c
                        }
                    }(0, o.isObjectParagraph)(e) && e._object && (s.mediaId = e._object.getMediaId()), s.type == n.ParagraphType.Text && delete s.type, s.lines.forEach(function(e) {
                        if (void 0 !== e.decorations) {
                            var t = !0;
                            each(e.decorations, function(r, a) {
                                0 == a.length ? delete e.decorations[r] : t = !1
                            }), t && delete e.decorations
                        }
                        e.brs && 0 == e.brs.length && delete e.brs
                    }), a.push(s)
                }
            }), JSON.parse(JSON.stringify(a))
        }

        function i(e) {
            return e.forEach(function(e) {
                e.type = e.type || n.ParagraphType.Text, e.lines.forEach(function(e) {
                    e.brs = e.brs || [], e.decorations = e.decorations || {}
                })
            }), e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getCleanedState = a, t.expandParagraphFields = i;
        var n = r(81),
            o = r(92)
    },
    30: function(e, t, r) {
        "use strict";

        function a(e, t) {
            m = t || {}, E = e, v = ge("article_view_" + e.owner_id + "_" + e.id), y = m.scrollNode || window, b = m.getScrollTop || function() {
                var e = document.scrollingElement || window.scrollNode || document.body;
                return e.scrollTop
            }, _ = gpeByClass("article_body", v) || gpeByClass("_article_layer", v), s(), o(), h(), setTimeout(function() {
                y.click && y.click(), y.focus()
            }, 10), window.onBodyResize = window.onBodyResize || function() {}, window.cur && cur.destroy.push(function() {
                n()
            })
        }

        function i() {
            m.notFull = !1, o(), h(), l()
        }

        function n() {
            C && (y.removeEventListener("scroll", C), C = !1), P && (y.removeEventListener("scroll", P), P = !1), clearTimeout(T)
        }

        function o() {
            each(geByClass("_article_unmute_button"), function(e, t) {
                t.addEventListener("click", function() {
                    var e = t.parentNode,
                        r = geByTag1("video", e);
                    r.muted = !r.muted, toggleClass(e, "article_object_unmuted", !r.muted)
                })
            }), each(geByTag("figure", v), function(e, t) {
                var r = parseInt(domData(t, "type"));
                m.isWebView || r != g.ParagraphType.ObjectPhoto || d(t)
            })
        }

        function s() {
            y.addEventListener("scroll", C = function() {
                l()
            }, {
                passive: !0
            }), l()
        }

        function l() {
            var e = {
                    101: -2e3
                },
                t = b(),
                r = window.innerHeight,
                a = getXY(v)[1];
            each(geByTag("figure", v), function(i, n) {
                var o = intval(domData(n, "done"));
                if (!o) {
                    var s = getH(n),
                        l = getXY(n)[1] - a,
                        d = intval(domData(n, "type")),
                        u = void 0 !== e[d] ? e[d] : 60,
                        p = t + r - u >= l && l + s - u >= t;
                    o = c(p, d, n), o && domData(n, "done", 1)
                }
            })
        }

        function c(e, t, r) {
            var a = !1;
            switch (t) {
                case g.ParagraphType.ObjectPhoto:
                    if (e) {
                        var i = geByTag1("img", r),
                            n = JSON.parse(domData(i, "sizes")),
                            o = (0, g.getAppropriateImage)(n, getW(i)),
                            s = f(o, 1),
                            l = s[0],
                            c = new Image;
                        c.onload = function() {
                            removeClass(i, "article_object_photo__image_blur"), i.src = l
                        }, c.src = l, a = !0
                    }
                    break;
                case g.ParagraphType.ObjectGIF:
                    if (!m.mobile) {
                        var d = geByTag1("video", r);
                        d ? e ? d.hasAttribute("autoplay") && d.play() : d.pause() : a = !0
                    }
            }
            return a
        }

        function d(e) {
            if (!m.noImageOpen) {
                var t = geByTag1("img", e),
                    r = JSON.parse(domData(t, "sizes")),
                    a = (0, g.getAppropriateImage)(r, window.innerWidth),
                    i = f(a, 3),
                    n = i[0],
                    o = i[1],
                    s = i[2],
                    l = p({
                        width: o,
                        height: s
                    }, {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }),
                    c = getW(t) < l.width && getH(t) < l.height;
                n && c && (addClass(t, "article_image_full_viewable"), t.addEventListener("click", function() {
                    addClass(_, "article_no_scroll");
                    var r = geByTag1("figcaption", e),
                        a = !!domData(e, "loaded"),
                        i = se('<div class="article_full_view"><img class="article_full_view__image ' + (a ? "" : "article_full_view__image_blurred") + '" src="' + t.src + '"></div>');
                    r && r.innerHTML && i.appendChild(se('<div class="article_full_view__caption"><div class="article_full_view__caption_inner">' + r.innerHTML + "</div></div>"));
                    var o = geByTag1("img", i);
                    setStyle(o, {
                        width: l.width,
                        height: l.height
                    }), v.appendChild(i), i.addEventListener("click", function(e) {
                        domClosest("article_full_view__caption_inner", e.target) || u()
                    }), i.addEventListener("mousewheel", u), w = i;
                    var s = new Image;
                    s.onload = function() {
                        o.src = n, removeClass(o, "article_full_view__image_blurred"), domData(e, "loaded", 1)
                    }, s.src = n
                }))
            }
        }

        function u() {
            return w ? (re(w), _ && removeClass(_, "article_no_scroll"), w = !1, !0) : !1
        }

        function p(e, t) {
            var r = e.width / e.height,
                a = t.width / t.height,
                i = {};
            return r > a ? (i.width = Math.min(t.width, e.width), i.height = e.height * (i.width / e.width)) : (i.height = Math.min(t.height, e.height), i.width = i.height * r), i
        }

        function h() {
            function e() {
                return Math.round((Date.now() - o) / 1e3)
            }

            function t(t) {
                if (!(s >= t) && (s = t, c.push(t), clearTimeout(l), l = setTimeout(r, 100), 3 == t && E.ttr)) {
                    var a = E.ttr - e();
                    a > 0 && (T = setTimeout(function() {
                        document.hidden || (s = 4, c = [s], r())
                    }, 1e3 * a))
                }
            }

            function r() {
                c.length && (ajax.post(window.isMVK ? "article.php" : "al_articles.php", {
                    act: "stats",
                    scroll: c.join(","),
                    spent: e(),
                    hash: E.access_hash,
                    article_owner_id: E.owner_id,
                    article_id: E.id,
                    is_web_view: m.isWebView ? 1 : 0
                }), c = [])
            }
            if (!m.notFull) {
                var a = getH(v),
                    i = getXY(v)[1] - scrollGetY(),
                    n = window.innerHeight,
                    o = Date.now(),
                    s = -1,
                    l = void 0,
                    c = [];
                t(0), y.addEventListener("scroll", P = function() {
                    var e = b();
                    e > 0 && t(1);
                    for (var r = 1; 4 > r; r++) e + 3 * n / 4 > i + a * r / 3 && t(r + 1);
                    e + n > a - 20 && t(4)
                }, {
                    passive: !0
                })
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var f = function() {
            function e(e, t) {
                var r = [],
                    a = !0,
                    i = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                } catch (l) {
                    i = !0, n = l
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (i) throw n
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.initArticle = a, t.updateArticle = i, t.deinitArticle = n;
        var g = r(81),
            _ = void 0,
            v = void 0,
            y = void 0,
            m = void 0,
            b = void 0,
            w = void 0,
            E = void 0,
            C = void 0,
            P = void 0,
            T = void 0;
        window.initArticle = a, window.deinitArticle = n, window.updateArticle = i, window.articleCloseImageFullSize = u
    },
    32: function(e, t, r) {
        "use strict";

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    var r = [],
                        a = !0,
                        i = !1,
                        n = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                    } catch (l) {
                        i = !0, n = l
                    } finally {
                        try {
                            !a && s["return"] && s["return"]()
                        } finally {
                            if (i) throw n
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
            n = r(92),
            o = (window.browser && browser.mozilla, window.browser && (browser.mozilla || browser.safari)),
            s = function() {
                function e(t, r, i, n) {
                    a(this, e), this._preparedData = r, this._mediaId = t, this._editor = i, this._highlighted = !1, this._isCaptioned = !!n
                }
                return e.prototype.getEditor = function() {
                    return this._editor
                }, e.prototype.getPreparedData = function() {
                    return this._preparedData
                }, e.prototype.getMediaId = function() {
                    return this._mediaId
                }, e.prototype.highlight = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                    if (e != this._highlighted) {
                        this._highlighted = e;
                        var r = this.el();
                        if (toggleClass(r, "article_ed__object_highlighted", e), e) {
                            var a = getSize(r),
                                i = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>'),
                                s = 0;
                            setStyle(i, {
                                width: a[0] + s,
                                height: a[1] + s
                            }), addClass(r, "article_ed__object_highlighted"), o && r.setAttribute("contenteditable", "false"), o || this._objectEl.setAttribute("draggable", !0)
                        } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted"), o && r.removeAttribute("contenteditable"), o || this._objectEl.setAttribute("draggable", !1);
                        if (this._isCaptioned)
                            if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || (0, n.selectEl)(this._getCaptionEl());
                            else {
                                var l = this.isEmptyCaption();
                                this._toggleCaptionPlaceholder(l), this._toggleCaption(!l)
                            }
                    }
                }, e.prototype.render = function() {}, e.prototype.mediaEl = function() {
                    return this.el().firstChild
                }, e.prototype.el = function() {
                    var e = this;
                    if (!this._objectEl) {
                        var t = this.render();
                        addClass(t, "article_object_el");
                        var r = o ? "" : 'ondragstart="cur.articleEditor.onDragStart(event)"';
                        this._objectEl = se("<figure " + r + ' contenteditable="true"></figure>');
                        var a = browser.safari ? 'contenteditable="true"' : 'contenteditable="false"';
                        this._objectEl.appendChild(se('<div class="article_ed__noconteditable" ' + a + "></div>")), this._objectEl.firstChild.appendChild(t), this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption">\n          <div class="article_ed__figcaption_edit" contenteditable="true"></div>\n          <div class="article_ed__caption_placeholder">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), o && t.addEventListener("click", function() {
                            e.highlight(!0), (0, n.focusEl)(t)
                        })
                    }
                    return this._setLoadingEl(), this._objectEl
                }, e.prototype.setLoadingState = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                    this._isLoading = e, this._setLoadingEl(), e || this.getEditor().onObjectStateLoaded(this)
                }, e.prototype._setLoadingEl = function() {
                    if (this._objectEl && (re(geByClass1("article_ed___object_loading_placeholder", this._objectEl)), this._isLoading)) {
                        var e = se('<div class="article_ed___object_loading_placeholder"></div>');
                        domInsertBefore(e, this._objectEl.firstChild)
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
                }, e.prototype._focusOnCaption = function() {
                    this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), this._isFocusInCaption() || (0, n.focusEl)(this._getCaptionEl())
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
                        t = (0, n.getRange)(),
                        r = i(t, 2),
                        a = r[0],
                        o = r[1],
                        s = function(t) {
                            return !!traverseParent(t, function(t) {
                                return t == e._captionEl
                            }, 10)
                        };
                    if (o) return s(a.startContainer);
                    var l = s(a.startContainer),
                        c = s(a.endContainer);
                    return l && c
                }, e
            }();
        t["default"] = s
    },
    51: function(e, t) {
        "use strict";

        function r(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function a(e, t) {
            return setTimeout(r(e), t)
        }

        function i(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function n(e, t) {
            return Math.floor(i(e, t))
        }

        function o(e) {
            return "undefined" == typeof e
        }

        function s(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function c(e) {
            return "string" == typeof e
        }

        function d(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function u(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function p() {
            return +new Date
        }

        function h() {
            return window.Image ? new Image : ce("img")
        }

        function f(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function g(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function _(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function v(e) {
            return e === !0 ? 1 : parseInt(e) || 0
        }

        function y(e) {
            return e === !0 ? 1 : parseFloat(e) || 0
        }

        function m(e) {
            return e = v(e), 0 > e ? 0 : e
        }

        function b(e) {
            return !isNaN(e)
        }

        function w(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return t = v(t), t >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function E(e) {
            return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function C(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function P(e) {
            return E(e.replace(/\t/g, "\n"))
        }

        function T(e, t) {
            if (d(e) || "undefined" == typeof e.length) {
                for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r) && t.call(e[r], r, e[r]) === !1) break
            } else
                for (var a = 0, i = e.length; i > a; a++) {
                    var n = e[a];
                    if (t.call(n, a, n) === !1) break
                }
            return e
        }

        function x(e, t, r) {
            for (var a = r || 0, i = (e || []).length; i > a; a++)
                if (e[a] == t) return a;
            return -1
        }

        function O(e, t) {
            return -1 != x(t, e)
        }

        function S(e, t) {
            var r = d(e) || "undefined" == typeof e.length ? {} : [];
            for (var a in e)(!/webkit/i.test(_ua) || "layerX" != a && "layerY" != a && "webkitMovementX" != a && "webkitMovementY" != a) && (t && "object" === R(e[a]) && "prototype" !== a && null !== e[a] ? r[a] = S(e[a]) : r[a] = e[a]);
            return r
        }

        function k(e) {
            var t, r, a = {},
                i = 1,
                n = arguments.length,
                o = arguments;
            for (t in e) {
                for (r = !1, i = 1; n > i; i++) o[i][t] && o[i][t] == e[t] && (r = !0);
                r || (a[t] = e[t])
            }
            return a
        }

        function j() {
            var e, t = arguments,
                r = t[0] || {},
                a = 1,
                i = t.length,
                n = !1;
            for ("boolean" == typeof r && (n = r, r = t[1] || {}, a = 2), "object" === ("undefined" == typeof r ? "undefined" : R(r)) || s(r) || (r = {}); i > a; ++a)
                if (null != (e = t[a]))
                    for (var o in e) {
                        var l = r[o],
                            c = e[o];
                        r !== c && (n && c && "object" === ("undefined" == typeof c ? "undefined" : R(c)) && !c.nodeType ? r[o] = j(n, l || (null != c.length ? [] : {}), c) : void 0 !== c && (r[o] = c))
                    }
            return r
        }

        function A(e) {
            window.templates = window.templates || {}, j(window.templates, e)
        }

        function N(e, t) {
            var r = window.templates = window.templates || {},
                a = r[e];
            return "function" == typeof a && (a = a()), a && t ? rs(a, t) : a || ""
        }

        function L(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : R(e))) return !1;
            var t = {},
                r = function(t) {
                    return geByTag(t, e)
                },
                a = function(r, a) {
                    if (a.name)
                        if ("text" != a.type && a.type)
                            if (a.getAttribute("bool")) {
                                var i = val(a);
                                if (!i || "0" === i) return;
                                t[a.name] = 1
                            } else t[a.name] = browser.msie && !a.value && e[a.name] ? e[a.name].value : a.value;
                    else t[a.name] = val(a)
                };
            return T(r("input"), function(e, t) {
                return "radio" != t.type && "checkbox" != t.type || t.checked ? a(e, t) : void 0
            }), T(r("select"), a), T(r("textarea"), a), t
        }

        function D(e, t) {
            for (var r, a = t ? H : M, i = []; e && (r = e.match(a));) {
                e = e.substr(r.index + r[0].length);
                var n = 0;
                r[4] || (n = 7), i.push({
                    url: r[2 + n],
                    query: r[5 + n] || "",
                    domain: r[4 + n]
                })
            }
            return i
        }

        function I() {
            return window.devicePixelRatio >= 2
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.vkLocal = r, t.lTimeout = a, t.rand = i, t.irand = n, t.isUndefined = o, t.isFunction = s, t.isArray = l, t.isString = c, t.isObject = d, t.isEmpty = u, t.vkNow = p, t.vkImage = h, t.trim = f, t.stripHTML = g, t.escapeRE = _, t.intval = v, t.floatval = y, t.positive = m, t.isNumeric = b, t.winToUtf = w, t.replaceEntities = E, t.clean = C, t.unclean = P, t.each = T, t.indexOf = x, t.inArray = O, t.clone = S, t.arrayKeyDiff = k, t.extend = j, t.addTemplates = A, t.getTemplate = N, t.serializeForm = L, t.extractUrls = D, t.isRetina = I, window.PageID = window.PageID || 1;
        var M = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
        window.isRetina = I, window.extractUrls = D, window.serializeForm = L, window.addTemplates = A, window.getTemplate = N, window.rand = i, window.irand = n, window.isUndefined = o, window.isFunction = s, window.isArray = l, window.isString = c, window.isObject = d, window.isEmpty = u, window.vkNow = p, window.vkImage = h, window.trim = f, window.stripHTML = g, window.escapeRE = _, window.intval = v, window.floatval = y, window.positive = m, window.isNumeric = b, window.winToUtf = w, window.replaceEntities = E, window.clean = C, window.unclean = P, window.each = T, window.indexOf = x, window.inArray = O, window.clone = S, window.arrayKeyDiff = k, window.extend = j, window.vkLocal = r, window.lTimeout = a
    },
    57: function(e, t) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {
                r(this, e)
            }
            return e._saveChunk = function(e, t, r, a, i) {
                ajax.post("al_articles.php", {
                    act: "save_text_chunk",
                    article_owner_id: e,
                    hash: a,
                    chunk_index: r,
                    Article_text: JSON.stringify(t)
                }, {
                    onDone: function(e) {
                        i(e)
                    }
                })
            }, e._saveFinally = function(e, t, r, a, i, n, o, s, l, c) {
                ajax.post("al_articles.php", extend({
                    act: "save",
                    article_owner_id: e,
                    article_id: t,
                    cover_photo_id: i,
                    name: a,
                    is_published: intval(r),
                    chunks_count: l ? "" : s,
                    Article_text: l ? JSON.stringify(l) : "",
                    hash: o
                }, n || {}), {
                    onDone: c
                })
            }, e.save = function(t, r, a, i, n, o, s, l, c, d) {
                var u = [],
                    p = [],
                    h = 0;
                if (a.forEach(function(e) {
                        var t = 0;
                        e.lines.forEach(function(e) {
                            t += e.text.length
                        }), h += t, h >= l && (u.push(p), h = t, p = []), p.push(e)
                    }), p.length && u.push(p), u.length > 1) {
                    var f = new callHub(function() {
                        e._saveFinally(t, r, i, n, o, c, s, u.length, !1, d)
                    }, u.length);
                    u.forEach(function(r, a) {
                        e._saveChunk(t, r, a, s, function() {
                            f.done()
                        })
                    })
                } else e._saveFinally(t, r, i, n, o, c, s, u.length, a, d)
            }, e
        }();
        t["default"] = a
    },
    58: function(e, t, r) {
        "use strict";

        function a(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        }

        function i(e, t) {
            return t = a(t) || document, t.getElementsByTagName(e)
        }

        function n(e, t) {
            return t = a(t) || document, t.querySelector && t.querySelector(e) || i(e, t)[0]
        }

        function o(e, t, r) {
            t = a(t) || document, r = r || "*";
            var n = [];
            if (t.querySelectorAll && "*" != r) return t.querySelectorAll(r + "." + e);
            if (t.getElementsByClassName) {
                var o = t.getElementsByClassName(e);
                if ("*" != r) {
                    r = r.toUpperCase();
                    for (var s = 0, l = o.length; l > s; ++s) o[s].tagName.toUpperCase() == r && n.push(o[s])
                } else n = Array.prototype.slice.call(o);
                return n
            }
            for (var c = i(r, t), d = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = c.length; l > s; ++s) d.test(c[s].className) && n.push(c[s]);
            return n
        }

        function s(e, t, r) {
            return t = a(t) || document, r = r || "*", t.querySelector && t.querySelector(r + "." + e) || o(e, t, r)[0]
        }

        function l(e, t, r) {
            if (t = a(t), !t) return null;
            for (; r !== t && (t = t.parentNode);)
                if (ee(t, e)) return t;
            return null
        }

        function c(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function d(e, t) {
            return (t || document).querySelector(e)
        }

        function u(e, t) {
            return ee(t, e) ? t : l(e, t)
        }

        function p(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : h(e, t)
        }

        function h(e, t) {
            if (t = a(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function f(e, t, r) {
            var a = document.createElement(e);
            return t && extend(a, t), r && ce(a, r), a
        }

        function g(e) {
            return e = a(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function _(e) {
            return P(f("div", {
                innerHTML: e
            }))
        }

        function v(e) {
            return O(f("div", {
                innerHTML: e
            }))
        }

        function y(e, t) {
            return each(t, function(t, r) {
                e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof r ? "" : r).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function m(e) {
            return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
        }

        function b(e, t) {
            return isString(t) && (t = _(t)), x(e).replaceChild(t, e), t
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

        function T(e) {
            return w((e || {}).lastChild, 1)
        }

        function x(e) {
            return (e || {}).parentNode
        }

        function O(e) {
            for (var t = [], r = e.childNodes, a = 0; a < r.length; a++) r[a].tagName && t.push(r[a]);
            return t
        }

        function S(e, t) {
            var r = x(t);
            return r && r.insertBefore(e, t)
        }

        function k(e, t) {
            var r = x(t);
            return r && r.insertBefore(e, E(t))
        }

        function j(e, t) {
            return e ? s(t, e) : e
        }

        function A(e, t, r) {
            return e ? "undefined" != typeof r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
        }

        function N(e) {
            for (var t = 0; null != (e = C(e));) t++;
            return t
        }

        function L(e, t) {
            do e = x(e); while (e && !I(e, t));
            return e
        }

        function D(e, t, r) {
            for (var a = null; null === a && e;) e = -1 === r ? C(e) : E(e), e && I(e, t) && (a = e);
            return a
        }

        function I(e, t) {
            if (e = a(e), !e || e == document) return !1;
            var r = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
                for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t[r] !== this;);
                return r > -1
            };
            return r.call(e, t)
        }

        function R(e) {
            return I(e, ":hover")
        }

        function M(e, t) {
            var r = a(e);
            if (t = a(t), !e || !t) return !1;
            for (; r = r.parentNode;)
                if (r == t) return !0;
            return !1
        }

        function H() {
            var e = browser.msie6 ? a("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function B(e, t) {
            t = t || {};
            for (var r = t.fromEl || x(e), a = t.positions || ["relative", "absolute", "fixed"]; r && r != bodyNode;) {
                var i = le(r, "position");
                if (inArray(i, a) && (!t.noOverflow || "hidden" != le(r, "overflow"))) break;
                r = x(r)
            }
            return r
        }

        function U(e, t) {
            e = a(e);
            for (var r, i, n, o, s = e; s && s.tagName && s !== bodyNode && (r = le(s, "position"), i = le(s, "overflow"), n = le(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === i || ("static" === r ? o && "relative" !== o : "fixed" === o));) "none" !== n ? o = void 0 : "static" !== r && "fixed" !== o && (o = r), s = x(s);
            return s
        }

        function F(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; t > r; r++) F(arguments[r]);
            else if (e = a(e), e && e.style) {
                var i = e.olddisplay,
                    n = "block",
                    o = e.tagName.toLowerCase();
                e.style.display = i || "", "none" === le(e, "display") && (n = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = n)
            }
        }

        function z(e) {
            var t = arguments.length;
            if (t > 1)
                for (var r = 0; t > r; r++) z(arguments[r]);
            else if (e = a(e), e && e.style) {
                var i = le(e, "display");
                e.olddisplay = "none" != i ? i : "", e.style.display = "none"
            }
        }

        function W(e) {
            return e = a(e), e && e.style ? "none" != le(e, "display") : !1
        }

        function $() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function q(e, t, r) {
            e = a(e), r = r || 0;
            var i = X(e)[1],
                n = G(e)[1],
                o = window,
                s = document.documentElement,
                l = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
                c = a("page_header_cont"),
                d = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                u = vk.staticheader ? Math.max(0, G(c)[1] - d) : G(c)[1];
            if (t) {
                if (d + u + r > i + n) return i + n - d - u - r;
                if (i > d + l - r) return i - d - l + r
            } else {
                if (d + u + r > i) return i - d - u - r;
                if (i + n > d + l - r) return i + n - d - l + r
            }
            return 0
        }

        function K(e, t) {
            return void 0 === t && (t = !W(e)), t ? F(e) : z(e), t
        }

        function Q(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function V(e, t) {
            var r;
            if (t && "inline" == le(e, "display")) {
                var a = e.getClientRects();
                r = a && a[0] || e.getBoundingClientRect()
            } else r = e.getBoundingClientRect();
            return r
        }

        function X(e, t) {
            if (e = a(e), !e) return [0, 0];
            var r, i, n = {
                    top: 0,
                    left: 0
                },
                o = e.ownerDocument;
            return o ? (r = o.documentElement, Q(e) && (n = V(e, !0)), i = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [n.left + (t ? 0 : i.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), n.top + (t ? 0 : i.pageYOffset || r.scrollTop) - (r.clientTop || 0)]) : [0, 0]
        }

        function Y(e) {
            return null != e && e === e.window
        }

        function G(e, t, r) {
            e = a(e);
            var i, n = [0, 0],
                o = document.documentElement;
            if (t && "border-box" === le(e, "boxSizing") && (t = !1), e == document) n = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var s = function() {
                    if (n = Q(e) && (i = V(e, r)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t) {
                        each(n, function(t, r) {
                            var a = t ? ["Top", "Bottom"] : ["Left", "Right"];
                            each(a, function() {
                                n[t] -= parseFloat(le(e, "padding" + this)) || 0, n[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                            })
                        })
                    }
                };
                if (W(e)) s();
                else {
                    var l = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        c = {},
                        d = !1;
                    e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), each(l, function(t, r) {
                        c[t] = e.style[t], e.style[t] = r
                    }), s(), each(l, function(t, r) {
                        e.style[t] = c[t]
                    }), d && (e.style.cssText = d)
                }
            }
            return n
        }

        function J(e) {
            return G(e)[0]
        }

        function Z(e) {
            return G(e)[1]
        }

        function ee(e, t) {
            return e = a(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
        }

        function te(e, t) {
            (e = a(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
        }

        function re(e, t) {
            return setTimeout(te.pbind(e, t), 0)
        }

        function ae(e, t) {
            (e = a(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }

        function ie(e, t) {
            return setTimeout(ae.pbind(e, t), 0)
        }

        function ne(e, t, r) {
            return void 0 === r && (r = !ee(e, t)), (r ? te : ae)(e, t), r
        }

        function oe(e, t, r) {
            return void 0 === r && (r = !ee(e, t)), (r ? re : ie)(e, t), r
        }

        function se(e, t, r) {
            ae(e, t), te(e, r)
        }

        function le(e, t, r) {
            if (e = a(e), isArray(t)) {
                var i = {};
                return each(t, function(t, r) {
                    i[r] = le(e, r)
                }), i
            }
            if (!e) return "";
            if (void 0 === r && (r = !0), !r && "opacity" == t && browser.msie) {
                var n = e.style.filter;
                return n ? n.indexOf("opacity=") >= 0 ? parseFloat(n.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!r && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var o, s = document.defaultView || window;
            if (s.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var l = s.getComputedStyle(e, null);
                l && (o = l.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" == t && browser.msie) {
                    var n = e.currentStyle.filter;
                    return n && n.indexOf("opacity=") >= 0 ? parseFloat(n.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var c = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                o = e.currentStyle[t] || e.currentStyle[c], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, r) {
                    if (!/^\d+(px)?$/i.test(r) && /^\d/.test(r)) {
                        var a = e.style,
                            i = a.left,
                            n = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, a.left = r || 0, o[t] = a.pixelLeft + "px", a.left = i, e.runtimeStyle.left = n
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

        function ce(e, t, r) {
            if (e = a(e)) {
                if ("object" == ("undefined" == typeof t ? "undefined" : Ee(t))) return each(t, function(t, r) {
                    ce(e, t, r)
                });
                if ("opacity" == t) browser.msie && ((r + "").length ? 1 !== r ? e.style.filter = "alpha(opacity=" + 100 * r + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== r && (e.style.opacity = r);
                else try {
                    var i = "number" == typeof r;
                    i && /height|width/i.test(t) && (r = Math.abs(r)), r = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? r + "px" : r, e.style[t] !== r && (e.style[t] = r)
                } catch (n) {
                    debugLog("setStyle error: ", [t, r], n)
                }
            }
        }

        function de(e, t, r) {
            setTimeout(ce.pbind(e, t, r), 0)
        }

        function ue(e, t, r) {
            var i = pe(e, "pseudo-id");
            i || (pe(e, "pseudo-id", i = irand(1e8, 999999999)), te(e, "_pseudo_" + i));
            var n = t + "-style-" + i,
                o = a(n),
                s = "._pseudo_" + i + ":" + t + "{";
            o || (o = headNode.appendChild(f("style", {
                id: n,
                type: "text/css"
            }))), each(r, function(e, t) {
                s += e + ": " + t + " !important;"
            }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
        }

        function pe(e, t, r) {
            if (!e) return !1;
            var a, i = e[vkExpand];
            return i || (i = e[vkExpand] = ++vkUUID), r !== a && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = r), t ? vkCache[i] && vkCache[i][t] : i
        }

        function he(e, t, r) {
            return e = a(e), "undefined" == typeof r ? e.getAttribute(t) : (e.setAttribute(t, r), r)
        }

        function fe(e) {
            for (var t = 0, r = arguments.length; r > t; ++t) {
                var a = arguments[t];
                if (void 0 !== e[a]) try {
                    delete e[a]
                } catch (i) {
                    try {
                        e.removeAttribute(a)
                    } catch (i) {}
                }
            }
        }

        function ge(e, t) {
            var r = e ? e[vkExpand] : !1;
            if (r)
                if (t) {
                    if (vkCache[r]) {
                        delete vkCache[r][t], t = "";
                        var a = 0;
                        for (t in vkCache[r])
                            if ("__elem" !== t) {
                                a++;
                                break
                            }
                        a || ge(e)
                    }
                } else removeEvent(e), fe(e, vkExpand), delete vkCache[r]
        }

        function _e() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var r = a(e[t]);
                r && (ge(r), fe(r, "btnevents"))
            }
        }

        function ve(e, t, r) {
            if (e = a(e), e && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", r || e.innerText || e.textContent);
                else {
                    var i = n("b", e);
                    i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", r || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function ye() {
            var e = a("zoom_test_1") || document.body.appendChild(f("div", {
                    id: "zoom_test_1"
                }, {
                    left: "10%",
                    position: "absolute",
                    visibility: "hidden"
                })),
                t = a("zoom_test_2") || document.body.appendChild(f("div", {
                    id: "zoom_test_2"
                }, {
                    left: e.offsetLeft + "px",
                    position: "absolute",
                    visibility: "hidden"
                }));
            return t.offsetLeft / e.offsetLeft
        }

        function me(e, t, r) {
            return (e = a(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !r && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !r && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
        }

        function be(e, t, r) {
            e = a(e);
            try {
                if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === r || r === !1) && (r = t), e.createTextRange) {
                    var i = e.createTextRange();
                    i.collapse(!0), i.moveEnd("character", r), i.moveStart("character", t), i.select()
                } else e.setSelectionRange && e.setSelectionRange(t, r)
            } catch (n) {}
        }

        function we(e, t, r) {
            for (e = a(e), r = r || 999; e && !t(e);) {
                if (r--, 0 == r) return !1;
                try {
                    if (e = x(e), e == document) break
                } catch (i) {
                    e = !1
                }
            }
            return e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var Ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.ge = a, t.geByTag = i, t.geByTag1 = n,
            t.geByClass = o, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = c, t.domQuery1 = d, t.domClosest = u, t.domClosestByTag = p, t.gpeByTag = h, t.ce = f, t.re = g, t.se = _, t.sech = v, t.rs = y, t.psr = m, t.domReplaceEl = b, t.domEL = w, t.domNS = E, t.domPS = C, t.domFC = P, t.domLC = T, t.domPN = x, t.domChildren = O, t.domInsertBefore = S, t.domInsertAfter = k, t.domByClass = j, t.domData = A, t.domChildIndex = N, t.domCA = L, t.domClosestSibling = D, t.matchesSelector = I, t.isHover = R, t.isAncestor = M, t.getScroll = H, t.domClosestPositioned = B, t.domClosestOverflowHidden = U, t.show = F, t.hide = z, t.isVisible = W, t.clientHeight = $, t.getClientRectOffsetY = q, t.toggle = K, t.boundingRectEnabled = Q, t.getXYRect = V, t.getXY = X, t.isWindow = Y, t.getSize = G, t.getW = J, t.getH = Z, t.hasClass = ee, t.addClass = te, t.addClassDelayed = re, t.removeClass = ae, t.removeClassDelayed = ie, t.toggleClass = ne, t.toggleClassDelayed = oe, t.replaceClass = se, t.getStyle = le, t.setStyle = ce, t.setStyleDelayed = de, t.setPseudoStyle = ue, t.data = pe, t.attr = he, t.removeAttr = fe, t.removeData = ge, t.cleanElems = _e, t.setTitle = ve, t.getZoom = ye, t.val = me, t.elfocus = be, t.traverseParent = we;
        var Ce = r(51);
        window.cf = function(e) {
            var t = e.createDocumentFragment(),
                r = e.createElement("div"),
                a = e.createRange && e.createRange();
            return t.appendChild(r), a && a.selectNodeContents(r), a && a.createContextualFragment ? function(t) {
                return t ? a.createContextualFragment(t) : e.createDocumentFragment()
            } : function(t) {
                if (!t) return e.createDocumentFragment();
                r.innerHTML = t;
                for (var a = e.createDocumentFragment(); r.firstChild;) a.appendChild(r.firstChild);
                return a
            }
        }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var r in t)
                    if (void 0 !== e.style[t[r] + "Transform"]) return t[r] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + (0, Ce.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}, window.ge = a, window.geByTag = i, window.geByTag1 = n, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = c, window.domQuery1 = d, window.domClosest = u, window.ce = f, window.re = g, window.se = _, window.sech = v, window.rs = y, window.psr = m, window.domReplaceEl = b, window.domEL = w, window.domNS = E, window.domPS = C, window.domFC = P, window.domLC = T, window.domPN = x, window.domChildren = O, window.domInsertBefore = S, window.domInsertAfter = k, window.domByClass = j, window.domData = A, window.domChildIndex = N, window.domCA = L, window.domClosestSibling = D, window.matchesSelector = I, window.isHover = R, window.isAncestor = M, window.getScroll = H, window.domClosestPositioned = B, window.domClosestOverflowHidden = U, window.show = F, window.hide = z, window.isVisible = W, window.clientHeight = $, window.getClientRectOffsetY = q, window.toggle = K, window.boundingRectEnabled = Q, window.getXYRect = V, window.getXY = X, window.isWindow = Y, window.getSize = G, window.hasClass = ee, window.addClass = te, window.addClassDelayed = re, window.removeClass = ae, window.removeClassDelayed = ie, window.toggleClass = ne, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = le, window.setStyle = ce, window.setStyleDelayed = de, window.setPseudoStyle = ue, window.data = pe, window.attr = he, window.removeAttr = fe, window.removeData = ge, window.cleanElems = _e, window.setTitle = ve, window.getZoom = ye, window.val = me, window.elfocus = be, window.traverseParent = we, window.getH = Z, window.getW = J, window.domClosestByTag = p
    },
    72: function(e, t, r) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n() {
            return j++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    var r = [],
                        a = !0,
                        i = !1,
                        n = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                    } catch (l) {
                        i = !0, n = l
                    } finally {
                        try {
                            !a && s["return"] && s["return"]()
                        } finally {
                            if (i) throw n
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
            s = r(96),
            l = a(s),
            c = r(85),
            d = a(c),
            u = r(87),
            p = a(u),
            h = r(10),
            f = r(92),
            g = r(81),
            _ = r(26),
            v = r(19),
            y = r(57),
            m = a(y),
            b = r(51),
            w = r(58),
            E = {
                KeyA: 65,
                KeyZ: 90,
                Backspace: 8,
                Enter: 13,
                Space: 32,
                Delete: 46,
                Tab: 9
            },
            C = [{
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
            }],
            P = C.slice().reverse(),
            T = {};
        each(C, function(e, t) {
            T[t.tag] = t
        });
        var x = {};
        each(C, function(e, t) {
            x[t.type] = t
        });
        var O = "footer form h1 h2 h3 h4 h5 h6 header hgroup hr main nav output p pre section table tfoot address article aside blockquote canvas dd div dl dt fieldset figcaption figure",
            S = O.split(" "),
            k = 50,
            j = 1,
            A = function() {
                function e(t, r, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    i(this, e), this._id = n(), cur.lang = cur.lang || {}, extend(cur.lang, o.lang), this._els = {
                        editor: ge(t),
                        canvas: se('<div class="article_editor_canvas article" contenteditable="true"></div>')
                    }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = se('<div class="article_photo_upload"></div>')), addClass(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._objects = {}, this._options = o, (0, v.initLimits)(o.limits);
                    var s = a || [];
                    s && 0 != s.length || (s = [(0, f.buildParagraph)({
                        type: this._options.noTitle ? g.ParagraphType.Text : g.ParagraphType.Header1
                    })]), s = s.filter(function(e) {
                        return e !== !1
                    }), s.forEach(function(e) {
                        e.lines.forEach(function(e) {
                            e.text = (0, f.replaceParagraphEntities)(e.text)
                        })
                    }), o.needIndexCorrection && (0, f.correctRealIndexes)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(!0), this._restoreLastCursor(), o.coverPhoto && this.setCoverPhoto(o.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this._publishNameCandidate = o.name || this._getName(), this.saveDraft(!1, !0)
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
                        e || t.type != g.ParagraphType.ObjectPhoto || (e = {
                            id: t._object.getMediaId(),
                            data: t._object.getPreparedData()
                        })
                    }), e
                }, e.prototype.getPublishName = function() {
                    return this._publishName || this._publishNameCandidate || this._getName()
                }, e.prototype.setPublishName = function(e) {
                    this._publishName = e, this._options.isPublished || this.saveDraft(!0)
                }, e.prototype._updateTextPlaceholders = function(e) {
                    var t = this;
                    if (!this._options.noTitle) {
                        if (this._els.canvas.children.length >= 2) {
                            var r = this._els.canvas.children[0],
                                a = !trim(r.innerHTML.replace("<br>", ""));
                            a ? (addClass(r, "article_ed__empty"), r.setAttribute("title", getLang("pages_article_title_placeholder"))) : (removeClass(r, "article_ed__empty"), r.removeAttribute("title"));
                            var i = this._els.canvas.children[1];
                            if (i) {
                                var n = !trim(i.innerHTML.replace("<br>", ""));
                                n ? (addClass(i, "article_ed__empty"), i.setAttribute("title", getLang("pages_article_text_placeholder"))) : (removeClass(i, "article_ed__empty"), i.removeAttribute("title"))
                            }
                        }
                        e && this._els.canvas.addEventListener("input", function() {
                            t._updateTextPlaceholders()
                        })
                    }
                }, e.prototype.destroy = function() {
                    this._els.editor.innerHTML = "", removeClass(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events.forEach(function(e) {
                        e.el.removeEventListener(e.event, e.handler)
                    }), delete cur.docsCurFilter
                }, e.prototype.getOptions = function() {
                    return this._options
                }, e.prototype.getWidth = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                    return getSize(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
                }, e.prototype.getPhotoUploadOptions = function() {
                    return this._options.photoUploadOptions
                }, e.prototype.getPhotoUploadEl = function() {
                    return this._photoUploadEl
                }, e.prototype.removeObject = function(e) {
                    var t = this;
                    each(this._ps, function(r, a) {
                        return a._object == e ? (re(t._getParagraphElByIndex(r)), t._saveCursorMarker(), t._setAllParagraphsDirty(), t._triggerInputEvent(), !1) : void 0
                    })
                }, e.prototype._parseUrlParagraph = function(e) {
                    var t = this,
                        r = this._getParagraph(e);
                    if (r.type == g.ParagraphType.Text && r.lines.length && r.lines[0].text) {
                        var a = extractUrls(r.lines[0].text, !0),
                            i = a && a.length ? a[0].url : "";
                        if (i && r.lines[0].text == i) {
                            var n = this._getCurrentParagraphIndex(),
                                s = o(n, 1),
                                l = s[0];
                            re(this._els.shareParseForm), re(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(se('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                            })), window.onUploadFail = function() {}, window.onUploadDone = function(e) {
                                if (e) {
                                    var r = e[2],
                                        a = {
                                            mediaId: e[1]
                                        };
                                    switch (e[0]) {
                                        case "doc":
                                            "gif" == r.ext ? extend(a, {
                                                type: g.ParagraphType.ObjectGIF,
                                                _preparedData: {
                                                    size: r.video_preview_size,
                                                    video: r.video_preview,
                                                    href: r.href
                                                }
                                            }) : a = !1;
                                            break;
                                        case "photo":
                                            extend(a, {
                                                type: g.ParagraphType.ObjectPhoto,
                                                _preparedData: {
                                                    sizes: r.editable.sizes
                                                }
                                            });
                                            break;
                                        case "video":
                                            extend(a, {
                                                type: g.ParagraphType.ObjectVideo,
                                                _preparedData: {
                                                    editable: r.editable,
                                                    duration: r.editable.duration,
                                                    platform: r.editable.platform
                                                }
                                            });
                                            break;
                                        default:
                                            a = !1
                                    }
                                    if (a) {
                                        t._linkTooltip && t._linkTooltip.hide(), a = (0, f.buildParagraph)(a), t._getOrCreateParagraphObject(a), t._ps[l] = a;
                                        var i = t._getCursor();
                                        t._redrawModel(), t._restoreCursor(i), t._saveUndoState(i), setTimeout(function() {
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
                        var a = r.split(":"),
                            i = o(a, 2),
                            n = i[0],
                            s = i[1];
                        if ("uuid" == n && s) {
                            var l = domQuery1('[data-uuid="' + s + '"]');
                            if (l) {
                                var c = l.cloneNode(!0);
                                c.setAttribute("data-force-update", "1");
                                var d = this._getCurrentParagraphIndex(),
                                    u = o(d, 1),
                                    p = u[0];
                                domInsertAfter(c, this._getParagraphElByIndex(p)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
                            }
                        }
                    }
                }, e.prototype._handleLinkPaste = function(e) {
                    var t = this,
                        r = (e.clipboardData || e.originalEvent.clipboardData).items;
                    for (var a in r)
                        if (r.hasOwnProperty(a)) {
                            var i = r[a];
                            "string" === i.kind && ! function() {
                                var e = t._getCurrentParagraphIndex(),
                                    r = o(e, 1),
                                    a = r[0];
                                i.getAsString(function(e) {
                                    var r = extractUrls(e, !0);
                                    if (1 === r.length) {
                                        var i = r[0].url,
                                            n = t._getParagraphElByIndex(a);
                                        (0, f.traverseTree)(n, function(e) {
                                            if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(i) >= 0) {
                                                var r = traverseParent(e, function(e) {
                                                    return e.tagName && "a" == e.tagName.toLowerCase()
                                                }, 3);
                                                if (!r) {
                                                    t._saveCursorMarker();
                                                    var n = document.createRange();
                                                    n.setStart(e, e.textContent.indexOf(i)), n.setEnd(e, e.textContent.indexOf(i) + i.length);
                                                    var o = window.getSelection();
                                                    o.removeAllRanges(), o.addRange(n), t._setParagraphDirty(a), document.execCommand("createLink", !1, i), t._restoreCursorFromMarker()
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
                    for (var a in r)
                        if (r.hasOwnProperty(a)) {
                            var i = r[a];
                            "file" === i.kind && ! function() {
                                t._photoPasteUploadingProcess = !0;
                                var e = i.getAsFile(),
                                    r = new FileReader;
                                r.onload = function() {
                                    t._photoPasteUploadingProcess = !1;
                                    var a = t._getCurrentParagraphIndex(),
                                        i = o(a, 1),
                                        s = i[0];
                                    s = s || 0;
                                    var l = (0, f.buildParagraph)({
                                        type: g.ParagraphType.ObjectPhoto,
                                        _uuid: n()
                                    });
                                    t._getOrCreateParagraphObject(l).setBLOB(e);
                                    var c = void 0;
                                    (0, f.isParagraphEmpty)(t._ps[s]) ? (c = s, t._ps[c] = l) : (c = s + 1, t._insertParagraphAt(c, l)), t._redraw(!0);
                                    var d = new Image;
                                    d.onload = function() {
                                        t._focusParagraph(c + 1), t._showObjectPicker()
                                    }, d.src = r.result
                                }, r.readAsDataURL(e)
                            }()
                        }
                }, e.prototype._getCurrentSelectionState = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = o(e, 2),
                        r = t[0],
                        a = t[1];
                    if (a === !1 || a === !1) return !1;
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
                        }, n = {}, s = 0, l = void 0, c = void 0, d = r; a >= d && d < this._ps.length; d++) {
                        var u = (0, f.isObjectParagraph)(this._ps[d]) ? this._ps[d]._object.getCaptionEl() : this._getParagraphElByIndex(d);
                        if (void 0 === l) {
                            var p = (0, f.getCaretCharacterOffsetWithin)(u),
                                h = o(p, 2);
                            l = h[0], c = h[1]
                        }
                        var _ = this._ps[d];
                        _.lines.forEach(function(e) {
                            var t = e.decorations;
                            C.forEach(function(r) {
                                var a = t[r.type];
                                a && !(0, b.isEmpty)(a) && a.forEach(function(t) {
                                    var a = [t[0] + s, t[1] + s];
                                    if ("link" == r.type) l < a[1] && c > a[0] && (n[r.type] = 1, i.decorations[r.type] = !0);
                                    else if (1 == n[r.type]) {
                                        var o = c >= a[0] && c <= a[1];
                                        c > a[1] || (o ? t[0] > 0 ? n[r.type] = -1 : (n[r.type] = 2, i.decorations[r.type] = !0) : n[r.type] = -1)
                                    } else if (!n[r.type]) {
                                        var d = l >= a[0] && l <= a[1],
                                            u = c >= a[0] && c <= a[1];
                                        d && u ? (n[r.type] = 2, i.decorations[r.type] = !0) : d && (e.text.length > a[1] ? n[r.type] = -1 : n[r.type] = 1)
                                    }
                                })
                            }), s += e.text.length
                        })
                    }
                    for (var v = r; a >= v && v < this._ps.length; v++)(0, f.isObjectParagraph)(this._ps[v]) && (i.captionFocused = i.captionFocused || this._ps[v]._object.isCaptionFocused(), i.object = !0), this._ps[v].type == g.ParagraphType.Header1 && (i.header1 = !0), this._ps[v].type != g.ParagraphType.Header2 && (i.header2 = !1), this._ps[v].type != g.ParagraphType.Header3 && (i.header3 = !1), (0, b.inArray)(this._ps[v].type, [g.ParagraphType.Header1, g.ParagraphType.Header2, g.ParagraphType.Header3]) ? i.header = !0 : i.justHeaders = !1, (0, b.inArray)(this._ps[v].type, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) || (i.quote = !1), (0, b.inArray)(this._ps[v].type, [g.ParagraphType.BulletList, g.ParagraphType.NumericList]) && (i.list = !0);
                    var y = (0, f.getRange)(),
                        m = o(y, 1),
                        w = m[0];
                    return w && w.startContainer && hasClass(w.startContainer, "article_ed__noconteditable") ? !1 : (i.multiline = r != a, i)
                }, e.prototype._hideFormatTooltip = function() {
                    this._formatTooltip && this._formatTooltip.hide()
                }, e.prototype._showFormatTooltip = function() {
                    clearTimeout(this._doShowFormatTooltipTO);
                    try {
                        var e = window.getSelection(),
                            t = e.focusNode && (hasClass(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase());
                        if (t) return;
                        var r = !e.isCollapsed;
                        this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, r), 1)
                    } catch (a) {}
                }, e.prototype._doShowFormatTooltip = function(e) {
                    var t = this;
                    if (!this._formatTooltip) {
                        var r = se('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                            a = void 0;
                        this._formatTooltip = new ElementTooltip(this._els.editor, {
                            cls: "article_format_tt",
                            content: r,
                            customShow: !0,
                            offset: [0, -3],
                            onShow: function() {
                                var e = t._getCurrentSelectionState(),
                                    a = [],
                                    i = !e || e.header1 || e.object && !e.captionFocused;
                                if (i || (e.justHeaders || a.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || a.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), a.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? a.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : a.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || e.header1 || e.list || (a.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), a.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), a.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 == a.length) return void t._formatTooltip.hide();
                                var n = geByClass1("article_format_btns", r);
                                n.innerHTML = "", a.forEach(function(e, t) {
                                    t > 0 && (0, b.inArray)(e[0], ["header1"]) && n.appendChild(se('<div class="article_format_divider"></div>'));
                                    var r = e[2] ? "article_format_btn_active" : "";
                                    n.appendChild(se('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                                }), t.setLinkMode(!1)
                            },
                            getTargetBoundingBox: function() {
                                var e = window.getSelection();
                                if (!e.rangeCount) return a;
                                var t = e.getRangeAt(0),
                                    r = t.getBoundingClientRect();
                                return !r.width && a ? a : a = {
                                    top: r.top + scrollGetY(),
                                    left: r.left,
                                    width: r.width,
                                    height: r.height
                                }
                            }
                        }), this._formatTooltip.linkMode = !1;
                        var i = geByTag1("input", r);
                        i.addEventListener("keypress", function(e) {
                            return e.keyCode == E.Enter ? (t._setLinkToSelectedText(i.value.trim()), t._formatTooltip.hide(), cancelEvent(e)) : void 0
                        });
                        var n = geByClass1("article_set_link_delete", r);
                        n.addEventListener("click", function(e) {
                            return t._setLinkToSelectedText(), cancelEvent(e)
                        })
                    }
                    e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
                }, e.prototype._setLinkToSelectedText = function(e) {
                    if (e) {
                        if (e = e.substr(0, 1500), !e.match("^https?://")) {
                            var t = (0, f.isVKUrl)(e) ? "https" : "http";
                            e = t + "://" + e
                        }
                        e = encodeURIComponent(e)
                    }
                    this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), (browser.msie || !e) && this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor), this._linkCursor
                }, e.prototype.clearLink = function() {
                    this.setLinkMode(!1);
                    var e = (0, f.getRange)(),
                        t = o(e, 3),
                        r = t[0],
                        a = t[2],
                        i = domClosestByTag("a", r.startContainer),
                        n = domClosestByTag("a", r.endContainer) || i;
                    i && (this._saveCursorMarker(), a.setBaseAndExtent(i, 0, n, Math.max(1, n.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
                }, e.prototype.setLinkMode = function(e, t) {
                    var r = void 0;
                    e && (r = this._getCursor(), browser.msie || document.execCommand("superscript", !1, !0));
                    var a = this._formatTooltip.getContent();
                    if (this._formatTooltip.linkMode != !!e)
                        if (e) {
                            var i = geByTag1("input", a);
                            i.value = "", addClass(a, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), i.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                        } else setStyle(a, {
                            width: null
                        }), removeClass(a, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
                }, e.prototype.setHeader1 = function(e) {
                    this._setHeader(g.ParagraphType.Header2, !e)
                }, e.prototype.setHeader2 = function(e) {
                    this._setHeader(g.ParagraphType.Header3, !e)
                }, e.prototype.setQuote = function() {
                    function e(e) {
                        return !(0, f.isObjectParagraph)(e) && !(0, f.isListParagraph)(e)
                    }
                    var t = this._getCursor(),
                        r = this._getCurrentParagraphIndex(),
                        a = o(r, 2),
                        i = a[0],
                        n = a[1];
                    if (i !== !1) {
                        n || (n = i);
                        for (var s = g.ParagraphType.Text, l = i; n >= l; l++)
                            if (e(this._ps[l])) {
                                s = this._ps[l].type == g.ParagraphType.Quote ? g.ParagraphType.Quote2 : this._ps[l].type == g.ParagraphType.Quote2 ? g.ParagraphType.Text : g.ParagraphType.Quote;
                                break
                            }
                        for (var c = i; n >= c; c++) {
                            var d = this._ps[c];
                            e(d) && (this._ps[c] = (0, f.buildParagraph)({
                                type: s,
                                lines: [d.lines[0]]
                            }), this._setParagraphDirty(c))
                        }
                        this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                    }
                }, e.prototype._setHeader = function(e, t) {
                    function r(e) {
                        return !(0, f.isObjectParagraph)(e) && !(0, f.isListParagraph)(e)
                    }
                    var a = this._getCursor(),
                        i = this._getCurrentParagraphIndex(),
                        n = o(i, 2),
                        s = n[0],
                        l = n[1];
                    if (s !== !1) {
                        l || (l = s);
                        for (var c = s; l >= c; c++) {
                            var d = this._ps[c];
                            r(d) && (this._ps[c].type = t ? e : g.ParagraphType.Text, this._setParagraphDirty(c))
                        }
                        this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(a), this._saveUndoState(), this.saveDraft()
                    }
                }, e.prototype.setStrong = function() {
                    this._setAllParagraphsDirty(), document.execCommand("bold"), browser.msie && this._triggerInputEvent()
                }, e.prototype.setEm = function() {
                    this._setAllParagraphsDirty(), document.execCommand("italic"), browser.msie && this._triggerInputEvent()
                }, e.prototype.setStrike = function() {
                    this._setAllParagraphsDirty(), document.execCommand("strikeThrough"), browser.msie && this._triggerInputEvent()
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
                        }), this._undos.length > k && this._undos.shift()
                    }
                    var r = !0;
                    this._undoStateDelayed = (0, _.getCleanedState)(this._ps, r)
                }, e.prototype._undo = function() {
                    if (this._undos.length) {
                        var e = this._undos.pop();
                        this._ps = (0, _.expandParagraphFields)(e.ps), this._redraw(!0), this._restoreCursor(e.cursor), this._updateTextPlaceholders(), delete this._undoStateDelayed, this._saveUndoState()
                    }
                }, e.prototype.initParagraphs = function(e) {
                    this._ps = (0, _.expandParagraphFields)(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
                }, e.prototype._getParagraphFromHTML = function(e, t) {
                    function r(e, t) {
                        if (e.nodeType == Node.TEXT_NODE) {
                            var a = e.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            t.text += (0, f.cleanTextSpaces)(a)
                        } else "BR" == e.nodeName && t.text.length > 0 && t.brs.push(t.text.length);
                        each(e.childNodes, function(e, a) {
                            var i = [t.text.length];
                            r(a, t), i.push(t.text.length);
                            var n = (a.tagName || "").toLowerCase();
                            a.style && parseInt(a.style.fontWeight) > 400 && (n = "strong");
                            var o = void 0;
                            switch (n) {
                                case "b":
                                case "strong":
                                    o = x.strong;
                                    break;
                                case "em":
                                case "i":
                                    o = x.em;
                                    break;
                                case "s":
                                case "strike":
                                case "del":
                                    o = x.strike;
                                    break;
                                case "a":
                                    o = x.link, i.push((0, f.decodeURL)(a.getAttribute("href") || ""))
                            }
                            o && (t.decorations[o.type] = t.decorations[o.type] || [], i[0] < i[1] && t.decorations[o.type].push(i), t.decorations[o.type] = (0, f.mergeRanges)(t.decorations[o.type]))
                        })
                    }
                    var a = document.createElement("div");
                    a.innerHTML = t;
                    var i = "ol" == e || "ul" == e,
                        n = [],
                        o = void 0,
                        s = {};
                    if (i) {
                        switch (e) {
                            case "ol":
                                o = g.ParagraphType.NumericList;
                                break;
                            case "ul":
                                o = g.ParagraphType.BulletList
                        }
                        for (var l = 0, c = a.children.length; c > l; l++) {
                            var d = {
                                text: "",
                                decorations: {},
                                brs: []
                            };
                            r(a.children[l], d), d.brs = (0, f.cleanBRs)(d.brs), n.push(d)
                        }
                    } else {
                        switch (e) {
                            case "h1":
                                o = g.ParagraphType.Header1;
                                break;
                            case "h2":
                            case "header":
                                o = g.ParagraphType.Header2;
                                break;
                            case "h3":
                            case "h4":
                                o = g.ParagraphType.Header3;
                                break;
                            case "blockquote":
                                o = g.ParagraphType.Quote;
                                break;
                            case "cite":
                                o = g.ParagraphType.Quote2;
                                break;
                            default:
                                o = g.ParagraphType.Text
                        }
                        var u = a.firstElementChild;
                        if ((0, f.isObjectParagraphEl)(u)) {
                            var p = u.getAttribute("data-type"),
                                h = u.getAttribute("data-media-id"),
                                _ = JSON.parse(u.getAttribute("data-data") || "{}");
                            p && h && (a = geByTag1("figure", u), o = p, s.mediaId = h, s._preparedData = _)
                        }
                        var v = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        r(a, v), v.brs = (0, f.cleanBRs)(v.brs, v.text.length), n.push(v), (0, f.isHeaderParagraph)(o) || (0 == v.text.indexOf("1. ") ? (o = g.ParagraphType.NumericList, this._removeParagraphLineTextPart(v, 0, "1. ".length)) : 0 == v.text.indexOf("* ") && (o = g.ParagraphType.BulletList, this._removeParagraphLineTextPart(v, 0, "* ".length))), v.brs = v.brs.filter(function(e) {
                            return e > 0
                        })
                    }
                    return s.lines = n, s.type = o, (0, f.buildParagraph)(s)
                }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
                    e.text = e.text.substring(0, t) + e.text.substring(r);
                    for (var a = r - t, i = 0, n = e.brs.length; n > i; i++) {
                        var o = e.brs[i];
                        o > t && r > o ? e.brs[i] = void 0 : e.brs[i] > t && e.brs[i] >= r && (e.brs[i] -= a)
                    }
                    e.brs = e.brs.filter(function(e) {
                        return void 0 !== e
                    }), each(e.decorations, function(i, n) {
                        n.forEach(function(e) {
                            e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= a) : (e[0] -= a, e[1] -= a))
                        }), e.decorations[i] = e.decorations[i].filter(function(e) {
                            return void 0 !== e[0]
                        })
                    })
                }, e.prototype._renderObjectParagraph = function(e, t) {
                    var r = this._getOrCreateParagraphObject(e),
                        a = r.el();
                    return r.onRender && r.onRender(), r.setCaptionElHtml(t), a.setAttribute("data-uuid", e._uuid), a.setAttribute("data-type", e.type), a.setAttribute("data-media-id", e._object.getMediaId()), a.setAttribute("data-data", JSON.stringify(e._object.getPreparedData())), addClass(a, "_article_p"), a
                }, e.prototype._renderParagraphLines = function(e, t) {
                    if (!e.lines) return ["", ""];
                    var r = "",
                        a = "",
                        i = "",
                        n = "",
                        o = parseInt(e.type);
                    switch (o) {
                        case g.ParagraphType.NumericList:
                            a = "ol", i = "li";
                            break;
                        case g.ParagraphType.BulletList:
                            a = "ul", i = "li";
                            break;
                        case g.ParagraphType.Header1:
                            i = "h1";
                            break;
                        case g.ParagraphType.Header2:
                            i = "h2";
                            break;
                        case g.ParagraphType.Header3:
                            i = "h3";
                            break;
                        case g.ParagraphType.Quote:
                            i = "blockquote";
                            break;
                        case g.ParagraphType.Quote2:
                            i = "cite";
                            break;
                        default:
                            a = "p"
                    }
                    return e.lines.forEach(function(e) {
                        function a(e, t) {
                            for (var r = []; e > 0;) {
                                var a = d[--e];
                                if (a)
                                    for (var i in a.open)
                                        if (a.open.hasOwnProperty(i)) {
                                            if (i == t) return [];
                                            r.push(i)
                                        }
                            }
                            return r
                        }

                        function s(e) {
                            return e[2] || !0
                        }
                        var l = e.text,
                            c = e.decorations,
                            d = [];
                        each(C, function(e, t) {
                            var r = c[t.type];
                            if (r)
                                for (var i = function(e, i) {
                                        var n = r[i],
                                            o = d[n[0]] = d[n[0]] || {
                                                open: {},
                                                close: {}
                                            };
                                        o.open[t.type] = s(n);
                                        var l = d[n[1]] = d[n[1]] || {
                                                open: {},
                                                close: {}
                                            },
                                            c = a(n[1], t.type);
                                        c.forEach(function(e) {
                                            l.close[e.type] = !0
                                        }), l.close[t.type] = !0, c.forEach(function(e) {
                                            l.open[e.type] = s(n)
                                        })
                                    }, n = 0, o = r.length; o > n; n++) i(o, n)
                        });
                        var u = 0,
                            p = [];
                        d.forEach(function(t, r) {
                            if (t) {
                                var a = !1,
                                    i = t.close.link && 1 == Object.keys(t.close).length;
                                r > 0 && (a = (0, f.prepareLineText)(l, u, r, e.brs), i || p.push(a));
                                var n = 0;
                                i && (a && a.endsWith("<br/>") && (n++, a = a.replace(/<br\/>$/, "")), a && a.endsWith("<br/>") && (n++, a = a.replace(/<br\/>$/, "")), a !== !1 && p.push(a)), each(P, function(e, r) {
                                    var a = t.close[r.type];
                                    void 0 !== a && p.push("</" + r.tag + ">")
                                }), p.push("<br/>".repeat(n)), each(C, function(e, r) {
                                    var a = t.open[r.type];
                                    void 0 !== t.open[r.type] && (a === !0 ? p.push("<" + r.tag + ">") : p.push("<" + r.tag + ' href="' + clean(a) + '">'))
                                }), u = r
                            }
                        }), p.push((0, f.prepareLineText)(l, u, void 0, e.brs)), i && (n = n ? " " + n : "", r += "<" + i + n + ">"), (0, b.inArray)(o, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) && (r += "<p>"), r += p.join("") || (t ? "" : "<br/>"), (0, b.inArray)(o, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) && (r += "</p>"), i && (r += "</" + i + ">")
                    }), [a, r]
                }, e.prototype._renderParagraph = function(e) {
                    var t = (0, f.isObjectParagraph)(e),
                        r = this._renderParagraphLines(e, t),
                        a = o(r, 2),
                        i = a[0],
                        n = a[1],
                        s = void 0;
                    return s = t ? this._renderObjectParagraph(e, n) : i ? se("<" + i + ">" + n + "</" + i + ">") : se(n), addClass(s, "_article_paragraph"), addClass(s, "article_paragraph"), addClass(s, "_article_p"), s
                }, e.prototype._getParagraphElByIndex = function(e) {
                    return e === !1 ? null : this._els.canvas.childNodes[e] || null
                }, e.prototype._getParagraph = function(e) {
                    return this._ps[e] || null
                }, e.prototype._redraw = function(e) {
                    var t = this;
                    e ? (this._els.canvas.innerHTML = "", this._ps.forEach(function(e) {
                        t._els.canvas.appendChild(t._renderParagraph(e))
                    })) : this._dirty.forEach(function(e) {
                        if (!(e >= t._ps.length)) {
                            var r = t._getParagraphElByIndex(e),
                                a = t._renderParagraph(t._ps[e]);
                            r ? a.outerHTML != r.outerHTML && domReplaceEl(r, a) : t._els.canvas.appendChild(a)
                        }
                    }), this._dirty = []
                }, e.prototype._getContainingParagraphEl = function(e) {
                    for (; e && e.parentNode != this._els.canvas;) e = e.parentNode;
                    var t = (0, f.getElementIndex)(e);
                    return [e, t, this._getParagraph(t)]
                }, e.prototype._getCurrentParagraphIndex = function() {
                    var e = window.getSelection();
                    if (e.rangeCount) {
                        var t = e.getRangeAt(0);
                        if (t.startContainer == this._els.canvas) return [t.startOffset, t.endOffset];
                        var r = this._getContainingParagraphEl(t.startContainer),
                            a = o(r, 2),
                            i = a[1],
                            n = t.endContainer;
                        if (0 === t.endOffset) {
                            var s = this._isParagraphEl(n) || this._isParagraphEl(domPN(n)) && 0 == (0, f.childNodeIndex)(n);
                            if (s) {
                                var l = this._getContainingParagraphEl(n),
                                    c = o(l, 1),
                                    d = c[0];
                                n = (0, w.domPS)(d) || d
                            }
                        }
                        var u = this._getContainingParagraphEl(n),
                            p = o(u, 2),
                            h = p[1];
                        return [i, Math.max(i, h)]
                    }
                    return [0, !1]
                }, e.prototype._saveCursorMarker = function() {
                    function e(e, t, r) {
                        if (e.nodeType == Node.TEXT_NODE) {
                            var a = e.textContent;
                            e.textContent = a.substring(0, t) + r + a.substring(t)
                        } else {
                            var i = document.createTextNode(r);
                            e.insertBefore(i, e.childNodes[t])
                        }
                    }
                    if (!this._markerCursorSet) {
                        var t = (0, f.getRange)(),
                            r = o(t, 2),
                            a = r[0],
                            i = r[1];
                        if (!a) return [0, 0];
                        var n = a.startContainer,
                            s = a.startOffset,
                            l = a.endContainer,
                            c = a.endOffset;
                        if (n != this._els.canvas) {
                            var d = this._getContainingParagraphEl(n)[1],
                                u = void 0;
                            e(n, s, f.CURSOR_MARKER_START), i || (u = this._getContainingParagraphEl(l)[1], u == d && l.textContent.includes(f.CURSOR_MARKER_START) && (c += 1), e(l, c, f.CURSOR_MARKER_END)), this._markerCursorSet = !0
                        }
                    }
                }, e.prototype._restoreCursorFromMarker = function() {
                    var e = this;
                    if (this._markerCursorSet) {
                        var t = function(e, t, r) {
                                function a(t) {
                                    if (t.nodeType == Node.TEXT_NODE) {
                                        var i = t.textContent.indexOf(e);
                                        if (i >= 0) {
                                            t.textContent = t.textContent.split(e).join("");
                                            var n = t.parentElement;
                                            return -1 != n.innerHTML.search(/\s$/) && (n.innerHTML = n.innerHTML.trimRight() + f.NBSP, r && r[0] == t && (r[0] = n.lastChild), t = n.lastChild), n.innerHTML || (t = n, t.innerHTML = "<br/>", i = 0), [t, i]
                                        }
                                    } else
                                        for (var o = 0, s = t.childNodes.length; s > o; o++) {
                                            var l = void 0;
                                            if (l = a(t.childNodes[o])) return l
                                        }
                                }
                                return a(t)
                            },
                            r = void 0,
                            a = void 0,
                            i = void 0;
                        for (i = 0; i < this._els.canvas.children.length && !(r = t(f.CURSOR_MARKER_START, this._els.canvas.children[i])); i++);
                        for (; i < this._els.canvas.children.length && !(a = t(f.CURSOR_MARKER_END, this._els.canvas.children[i], r)); i++);
                        if (r) {
                            var n = document.createRange();
                            r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), n.setStart(r[0], r[1]), a && (a[0].nodeType == Node.TEXT_NODE && (a[1] = Math.min(a[1], a[0].textContent.length)), n.setEnd(a[0], a[1]));
                            var o = window.getSelection();
                            o.removeAllRanges(), o.addRange(n)
                        }
                        var s = function(t) {
                            e._ps.forEach(function(e) {
                                e.lines.forEach(function(e) {
                                    var r = e.text.indexOf(t);
                                    if (r >= 0) {
                                        e.text = e.text.replace(t, "");
                                        for (var a = 0, i = 0; i < e.brs.length; i++) e.brs[i] > r && (a = 1), e.brs[i] -= a;
                                        each(C, function(t, a) {
                                            var i = e.decorations[a.type];
                                            if (i)
                                                for (var n = 0, o = i.length; o > n; n++) {
                                                    var s = i[n];
                                                    s[0] > r && (s[0] -= 1), s[1] > r && (s[1] -= 1)
                                                }
                                        })
                                    }
                                })
                            })
                        };
                        s(f.CURSOR_MARKER_START), s(f.CURSOR_MARKER_END), this._markerCursorSet = !1
                    }
                }, e.prototype._setAllParagraphsDirty = function() {
                    this._dirty = [];
                    for (var e = this._els.canvas.children.length, t = 0; e > t; t++) this._dirty.push(t);
                    this._ps = []
                }, e.prototype._setCurrentParagraphDirty = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = o(e, 2),
                        r = t[0],
                        a = t[1];
                    this._setParagraphDirty(r, a)
                }, e.prototype._setParagraphDirty = function(e, t) {
                    if (void 0 === e || 0 > e) throw new Error("Invalid paragraph index");
                    t = t || e;
                    for (var r = e; t >= r; r++)(0, b.inArray)(r, this._dirty) || this._dirty.push(r)
                }, e.prototype._expandDoubleBRs = function() {
                    function e(e, t, r) {
                        var a = e.lines[0];
                        void 0 === r && (r = a.text.length);
                        var i = [];
                        return a.brs.forEach(function(e) {
                            r > e && e > t && i.push(e - t)
                        }), (0, f.buildParagraph)({
                            type: e.type,
                            lines: [{
                                text: a.text.substr(t, r - t),
                                decorations: (0, f.decorationsSlice)(a.decorations, t, r),
                                brs: i
                            }]
                        })
                    }
                    for (var t = !1, r = 0, a = this._ps.length; a > r; r++) {
                        var i = this._ps[r];
                        if (i.lines.length > 1) i.lines.forEach(f.cleanLineBRs);
                        else {
                            var n = i.lines[0].brs;
                            if (0 == n.length) continue;
                            for (var o = [], s = 0, l = 0, c = n.length; c > l; l++)
                                if (s != n[l] && l > 0 && n[l - 1] == n[l]) {
                                    var d = e(i, s, n[l]);
                                    (0, f.isParagraphEmpty)(d) || o.push(d), s = n[l]
                                }
                            o.push(e(i, s)), o.length > 1 && (Array.prototype.splice.apply(this._ps, [r, 1].concat(o)), r = r + o.length - 1, t = !0)
                        }
                    }
                    return t
                }, e.prototype._processAlienPhotos = function() {
                    var e = this;
                    if (!this._photoPasteUploadingProcess)
                        for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                            if (!(0, f.isObjectParagraphEl)(r) || !this._isTrackedObjectEl(r))
                                for (var a = Array.prototype.slice.call(geByTag("img", r)), i = void 0, o = function() {
                                        if (!i.src || !domPN(r) || !isVisible(i)) return "continue";
                                        var t = traverseParent(i, function(t) {
                                                return t == e._els.canvas ? !0 : "FIGURE" == t.tagName
                                            }, 10),
                                            a = t && t != e._els.canvas ? geByTag1("figcaption", t) : !1,
                                            o = (0, f.buildParagraph)({
                                                type: g.ParagraphType.ObjectPhoto,
                                                _uuid: n(),
                                                _preparedData: {
                                                    size: [i.width, i.height]
                                                }
                                            }),
                                            s = e._renderObjectParagraph(o, a ? a.innerHTML : "");
                                        (0, f.justCursorInString)(r.textContent) ? (domReplaceEl(r, s), re(i), domInsertAfter(se("<p>" + f.CURSOR_MARKER_START + "</p>"), s)) : (domInsertAfter(s, domPN(i)), re(a), re(i)), traverseParent(s, function(t) {
                                            return t == e._els.canvas ? !0 : void removeClass(t, f.ArticleEditorParagraphClass)
                                        }), (0, f.queuePhotoProcess)(i.src, function(t, r, a) {
                                            if (t) re(s), e._forgetObject(o._uuid), a();
                                            else {
                                                var i = e._getOrCreateParagraphObject(o);
                                                i.setBLOB(r, a)
                                            }
                                        })
                                    }; i = a.shift();) {
                                    o()
                                }
                }, e.prototype._flattenAlienParagraphs = function() {
                    var e = this;
                    if (this._fromPasteEvent) {
                        for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, a = this._fromPasteEvent, i = this._pasteCurrentIndex, n = this._getCurrentParagraphIndex(), s = o(n, 1), l = s[0], c = -1, d = function() {
                                function t(e) {
                                    if (this._isTrackedObjectEl(e)) return void domInsertBefore(e, r);
                                    var a = e.tagName.toLowerCase();
                                    if (hasClass(e, "_im_stack_messages") && (a = "div"), (0, b.inArray)(a, S)) {
                                        for (var i = Array.prototype.slice.call(e.childNodes), o = void 0, s = ""; o = i.shift();)
                                            if (o.nodeType != Node.TEXT_NODE) {
                                                if (s) {
                                                    var l = se("<p>" + clean(s) + "</p>");
                                                    domInsertBefore(l, r), s = ""
                                                }
                                                t.call(this, o)
                                            } else s += o.textContent;
                                        if (s) {
                                            var c = se("<p>" + clean(s) + "</p>");
                                            domInsertBefore(c, r)
                                        }
                                        n = !0
                                    } else e != r && trim(e.textContent) && (domInsertBefore(e, r), n = !0)
                                }
                                c++;
                                var n = !1;
                                if (a && !trim(r.textContent) && c > i && l >= c) return re(r), "continue";
                                var o = r;
                                (0, f.isQuoteEl)(r) && !(0, f.isAlienParagraphEl)(r) && (o = r.firstChild);
                                var s = (0, f.traverseTree)(o, function(e, t) {
                                    if (!t) {
                                        var r = e.tagName.toLowerCase();
                                        return (0, b.inArray)(r, S) ? !0 : void 0
                                    }
                                });
                                return s ? (t.call(e, r, !0), void(n && re(r))) : "continue"
                            }; r = t.shift();) {
                            d()
                        }
                        this._setAllParagraphsDirty()
                    }
                }, e.prototype._correctCaptionSelection = function() {
                    var e = (0, f.getRange)(),
                        t = o(e, 3),
                        r = t[0],
                        a = t[1],
                        i = t[2];
                    if (r && !a) {
                        var n = traverseParent(r.startContainer, function(e) {
                            return "FIGCAPTION" == e.tagName
                        }, 5);
                        if (n && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && (0, f.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                            var s = geByClass1("article_ed__figcaption_edit", n),
                                l = r.cloneRange();
                            l.selectNodeContents(s), i.removeAllRanges(), i.addRange(l)
                        }
                    }
                }, e.prototype.cancelSaveDraft = function() {
                    clearTimeout(this._draftSaveTO)
                }, e.prototype.saveDraft = function(e, t, r) {
                    var a = this;
                    clearTimeout(this._draftSaveTO);
                    var i = JSON.stringify({
                        paragraphs: (0, _.getCleanedState)(this._ps)
                    });
                    return t ? void(this._lastSavedDraft = i) : this._lastSavedDraft != i || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), void(this._draftSaveTO = setTimeout(function() {
                        a._lastSavedDraft = i;
                        var e = (0, v.checkLimits)(a._ps);
                        return e ? void(a._options.onDraftNotSaved && a._options.onDraftNotSaved(e)) : void a.save(!1, function(e, t, r) {
                            a._initDraftSave = !0, a._options.onDraftSaved && a._options.onDraftSaved(e, t, r)
                        })
                    }, r ? 0 : 1e3 * this._options.draftSaveDelay))) : void(!t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId()))
                }, e.prototype._getName = function() {
                    if (this._publishName) return this._publishName;
                    var e = (0, _.getCleanedState)(this._ps),
                        t = e.length ? e[0].lines[0].text : "";
                    return (0, f.generateLatinizedName)(t, this._options.maxNameLength)
                }, e.prototype.getTitle = function() {
                    var e = this._ps[0];
                    return e ? e.lines[0].text : ""
                }, e.prototype.isLimitsExceeded = function() {
                    return !!(0, v.checkLimits)(this._ps)
                }, e.prototype.save = function(e, t, r) {
                    var a = this,
                        i = (0, _.getCleanedState)(this._ps, !1, !0);
                    e && (0, f.correctRealIndexes)(i, -1);
                    var n = this._getName(),
                        o = this.getCoverPhoto();
                    void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), m["default"].save(this.getArticleOwnerId(), this.getArticleId(), i, e, n, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s) {
                        r || (i && (a._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(extend({}, nav.objLoc, {
                            article_id: a.getArticleOwnerId() + "_" + a.getArticleId()
                        })), a._publishNameCandidate = n, e && (a._options.isPublished = !0)), t && t(r, i, o, s)
                    })
                }, e.prototype.focus = function() {
                    this._restoreLastCursor()
                }, e.prototype.getArticleId = function() {
                    return this._options.articleId
                }, e.prototype.getArticleOwnerId = function() {
                    return this._options.articleOwnerId
                }, e.prototype._getSaveDraftHash = function() {
                    return this._options.saveDraftHash
                }, e.prototype._expandBlockquoteParagraphs = function(e) {
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                        if ((0, f.isQuoteEl)(r)) {
                            var a = r.tagName,
                                i = Array.prototype.slice.call(r.children),
                                n = i[0];
                            if (1 == i.length && n && n.tagName && (0, b.inArray)(n.tagName, ["H1", "H2", "H3"])) {
                                domReplaceEl(r, n);
                                continue
                            }
                            if (i.shift(), i.length)
                                for (var o = void 0; o = i.shift();) {
                                    if (this._saveCursorMarker(), e) domInsertAfter(o, r);
                                    else {
                                        var s = se("<" + a + "></" + a + ">");
                                        s.appendChild(o), domInsertAfter(s, r)
                                    }
                                    this._restoreCursorFromMarker()
                                }
                        }
                }, e.prototype._ensureDummyParagraphs = function() {
                    if (this._els.canvas) {
                        var e = this._els.canvas.lastChild;
                        if (e) {
                            var t = trim(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML;
                            if (t || "H1" == e.tagName) {
                                var r = (0, f.buildParagraph)({});
                                this._els.canvas.appendChild(this._renderParagraph(r)), this._ps.push(r), this._updateTextPlaceholders()
                            }
                        }
                    }
                }, e.prototype._ensureAtLeastOneParagraph = function() {
                    0 == this._ps.length && (this._ps = [(0, f.buildParagraph)({
                        type: g.ParagraphType.Text
                    })])
                }, e.prototype._ensureTitleParagraph = function() {
                    var e = this;
                    this._options.noTitle || this._ps[0].type != g.ParagraphType.Header1 && (this._ps[0].type = g.ParagraphType.Header1), this._ps.forEach(function(t, r) {
                        (e._options.noTitle || 0 != r) && (1 == r && t.type == g.ParagraphType.Header1 && (t.type = g.ParagraphType.Text), t.type == g.ParagraphType.Header1 && (t.type = g.ParagraphType.Header2))
                    })
                }, e.prototype._insertParagraphAt = function(e, t) {
                    this._ps.splice(e, 0, t)
                }, e.prototype._focusParagraph = function(e) {
                    (0, f.focusEl)(this._getParagraphElByIndex(e))
                }, e.prototype._init = function() {
                    this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._saveUndoState()
                }, e.prototype._redrawModel = function() {
                    this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
                }, e.prototype.addObjectVideo = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = o(t, 1),
                        a = r[0];
                    showBox("al_video.php", {
                        act: "a_choose_video_box",
                        to_id: this.getArticleOwnerId()
                    });
                    cur.chooseMedia = function(t, r, i, s, l) {
                        var c = (0, g.getAppropriateImage)(i.editable.sizes, e.getWidth()),
                            d = o(c, 1),
                            u = d[0],
                            p = (0, f.buildParagraph)({
                                _uuid: n(),
                                type: g.ParagraphType.ObjectVideo,
                                mediaId: r,
                                _preparedData: {
                                    editable: i.editable,
                                    thumb: u,
                                    duration: i.editable.duration,
                                    platform: i.editable.platform
                                }
                            });
                        e._getOrCreateParagraphObject(p), 0 == s ? e._ps[a] = p : e._ps.splice(a + s, 0, p), e._redrawModel(), e._saveUndoState();
                        var h = e._getParagraphElByIndex(a);
                        (0, f.focusEl)(h), l || curBox().hide(), e.saveDraft()
                    }
                }, e.prototype.addObjectDoc = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = o(t, 1),
                        a = r[0];
                    cur.docsCurFilter = "gif";
                    var i = showBox("docs.php", {
                        act: "a_choose_doc_box",
                        from: "article",
                        ext_filter: "gif",
                        to_id: this.getArticleOwnerId()
                    }, {
                        stat: ["docs.css"]
                    });
                    cur.chooseMedia = function(t, r, o) {
                        i.hide();
                        var s = (0, f.buildParagraph)({
                            _uuid: n(),
                            type: g.ParagraphType.ObjectGIF,
                            mediaId: r,
                            _preparedData: {
                                video: o.video_preview,
                                size: o.video_preview_size,
                                href: o.href
                            }
                        });
                        e._getOrCreateParagraphObject(s), e._insertParagraphAt(a, s), e._redrawModel(), e._saveUndoState(), e.saveDraft()
                    }, cur.showMediaProgress = function() {}
                }, e.prototype.addObjectPhoto = function() {
                    var e = this,
                        t = this._getCurrentParagraphIndex(),
                        r = o(t, 1),
                        a = r[0],
                        i = showBox("al_photos.php", {
                            to_id: this.getArticleOwnerId(),
                            act: "choose_photo",
                            max_files: 200,
                            article: 1
                        }, {
                            cache: 1,
                            stat: ["photos.js", "photos.css", "upload.js"],
                            dark: 1
                        });
                    cur.chooseMedia = function(t, r, o, s) {
                        var l = (0, f.buildParagraph)({
                            _uuid: n(),
                            type: g.ParagraphType.ObjectPhoto,
                            mediaId: r,
                            _preparedData: {
                                size: (0, f.getPhotoSize)(o.editable.sizes),
                                sizes: o.editable.sizes
                            }
                        });
                        e._getOrCreateParagraphObject(l);
                        var c = e._renderObjectParagraph(l, ""),
                            d = e._getParagraphElByIndex(a + intval(s));
                        domInsertBefore(c, d), (0, f.focusEl)(d), e._setAllParagraphsDirty(), e._triggerInputEvent(), e._saveUndoState(), e.saveDraft(), void 0 === s && i.hide()
                    }, cur.showMediaProgress = function() {}
                }, e.prototype.onObjectStateLoaded = function(e) {
                    this.saveDraft(), this._showObjectPicker()
                }, e.prototype._hideObjectPicker = function() {
                    this._objectPickerTooltip && this._objectPickerTooltip.hide()
                }, e.prototype._showObjectPicker = function() {
                    if (!this._objectPickerEl) {
                        this._objectPickerEl = se('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                        var e = se('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><!--div class="article_editor_object_picker_divider">\n        </div><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_break"></button-->\n      </div>');
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
                        r = o(t, 2),
                        a = r[0],
                        i = r[1];
                    if (a !== !1 && a == i && (0, f.isParagraphEmpty)(this._ps[a]) && this._ps[a] && (0, b.inArray)(this._ps[a].type, [g.ParagraphType.Text, g.ParagraphType.Header2, g.ParagraphType.Header3])) {
                        show(this._objectPickerEl);
                        var n = this._getParagraphElByIndex(a),
                            s = getXY(this._els.editor),
                            l = getXY(n);
                        setStyle(this._objectPickerEl, {
                            left: -40,
                            top: l[1] - s[1]
                        })
                    } else hide(this._objectPickerEl)
                }, e.prototype._initLinksHrefTooltip = function() {
                    var e = this;
                    this._els.canvas.addEventListener("mouseover", function(t) {
                        if ("a" == t.target.tagName.toLowerCase()) {
                            if (e._linkTooltip && e._linkTooltip.destroy(), e._formatTooltip && e._formatTooltip.isShown()) return;
                            var r = t.target,
                                a = (0, f.decodeURL)(r.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")),
                                i = a + "";
                            (0, f.isVKUrl)(i) || (i = "/away.php?to=" + encodeURIComponent(i) + "&utf=1"), e._linkTooltip = new ElementTooltip(r, {
                                cls: "article_editor_link_show_tt",
                                appendTo: e._els.editor,
                                content: se('<a target="_blank" href="' + i + '" class="article_editor_link">' + a + "</a>")
                            })
                        }
                    })
                }, e.prototype._isTrackedObjectEl = function(e) {
                    var t = domData(e, "uuid");
                    return t ? !!this._getObject(t) : !1
                }, e.prototype._cloneObjectParagraphs = function() {
                    for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                        if ((0, f.isObjectParagraphEl)(t)) {
                            var a = t.getAttribute("data-uuid"),
                                i = parseInt(t.getAttribute("data-type"));
                            if (r[a]) {
                                var o = this._getObject(a);
                                a = n(), this._getOrCreateParagraphObject({
                                    type: i,
                                    _uuid: a,
                                    mediaId: o.getMediaId(),
                                    _preparedData: clone(o.getPreparedData(), !0)
                                }), t.setAttribute("data-uuid", a)
                            }
                            r[a] = !0
                        }
                }, e.prototype._correctCursorToBeWithinCanvas = function() {
                    var e = (0, f.getRange)(),
                        t = o(e, 2),
                        r = t[0],
                        a = t[1];
                    a && r.startContainer == this._els.canvas && this._focusParagraph(0)
                }, e.prototype._triggerInputEvent = function() {
                    this._els.canvas.dispatchEvent(new Event("input"))
                }, e.prototype._getCursor = function() {
                    function e(e, r, a) {
                        r.nodeType == Node.TEXT_NODE ? e.textOffset = a : e.nodeOffset = a, traverseParent(r, function(r) {
                            return r == t ? !0 : ((0, f.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), void e.path.push((0, f.childNodeIndex)(r)))
                        }, 10), e.path = e.path.slice().reverse()
                    }
                    var t = this._els.canvas,
                        r = (0, f.getRange)(),
                        a = o(r, 2),
                        i = a[0],
                        n = a[1];
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
                    return e(s.start, i.startContainer, i.startOffset), n ? delete s.end : e(s.end, i.endContainer, i.endOffset), s
                }, e.prototype._restoreCursor = function(e) {
                    function t(e) {
                        var t = r;
                        e.path.forEach(function(r, i) {
                            if ((0, f.isQuoteEl)(t)) {
                                var n = t.firstChild;
                                n && 1 == i && n.nodeType == Node.ELEMENT_NODE && "p" == n.tagName.toLowerCase() && (t = n)
                            }
                            r = Math.min(t.childNodes.length - 1, r);
                            var o = t.childNodes[r];
                            return o ? void(t = o) : (e.nodeOffset = a = 0, !1)
                        });
                        var a = void 0;
                        return a = t.nodeType == Node.TEXT_NODE && void 0 !== e.textOffset ? Math.min(t.textContent.length, e.textOffset) : 0, void 0 !== e.nodeOffset && t && t.children && (a = Math.min(e.nodeOffset, t.childNodes.length)), [t, a]
                    }
                    if (!e) return this._restoreCursorFromMarker();
                    var r = this._els.canvas,
                        a = document.createRange();
                    try {
                        var i = t(e.start),
                            n = o(i, 2),
                            s = n[0],
                            l = n[1];
                        if (s.nodeType == Node.ELEMENT_NODE && "BR" == s.tagName && 0 == l) {
                            var c = domPN(s);
                            (0, f.isParagraphEl)(c) && 1 == c.childNodes.length && (s = c)
                        }
                        if (a.setStart(s, l), e.end) {
                            var d = t(e.end),
                                u = o(d, 2),
                                p = u[0],
                                h = u[1];
                            a.setEnd(p, h)
                        }
                        var g = window.getSelection();
                        g.removeAllRanges(), g.addRange(a)
                    } catch (_) {
                        debugLog(_)
                    }
                }, e.prototype._saveLastCursor = function() {
                    var e = this._getCursor(),
                        t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                    e ? ls.set(t, JSON.stringify(e)) : ls.remove(t)
                }, e.prototype._restoreLastCursor = function() {
                    var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                    e ? (e = JSON.parse(e), this._restoreCursor(e)) : (0, f.focusEl)(this._els.canvas.firstChild)
                }, e.prototype._replaceAlienInlineTags = function() {
                    function e(a) {
                        var i = a.tagName.toLowerCase();
                        if (r[i]) {
                            t || (this._saveCursorMarker(), t = !0);
                            var n = ce(r[i], {
                                innerHTML: a.innerHTML
                            });
                            domReplaceEl(a, n)
                        } else
                            for (var o = Array.prototype.slice.call(a.childNodes), s = void 0; s = o.shift();) s.nodeType == Node.ELEMENT_NODE && e.call(this, s)
                    }
                    var t = !1,
                        r = {
                            b: "strong",
                            i: "em"
                        };
                    return e.call(this, this._els.canvas), t && this._restoreCursorFromMarker(), t
                }, e.prototype._cleanParagraphsBRs = function() {
                    this._ps.forEach(function(e) {
                        e.lines.forEach(f.cleanLineBRs)
                    })
                }, e.prototype._initEvents = function() {
                    var e = this;
                    this._setEventListener(window, "scroll", function() {
                        var t = scrollGetY(),
                            r = window.innerHeight;
                        e._ps.forEach(function(a, i) {
                            if ((0, f.isObjectParagraph)(a)) {
                                var n = e._getParagraphElByIndex(i),
                                    o = getSize(n),
                                    s = getXY(n),
                                    l = s[1] < t + r && s[1] + o[1] > t;
                                a._object.onViewport && a._object.onViewport(l)
                            }
                        })
                    }), this._setEventListener(document, "selectionchange", function() {
                        var t = (0, f.getRange)(),
                            r = o(t, 1),
                            a = r[0];
                        if (a) {
                            var n = traverseParent(a.commonAncestorContainer, function(t) {
                                return t == e._els.canvas
                            });
                            if (!n) return
                        }
                        var s = e._getCurrentParagraphIndex(),
                            l = o(s, 1),
                            c = l[0];
                        return c === !1 ? void e._showObjectPicker() : (e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), e._ensureDummyParagraphs(), 0 == i && e._showFormatTooltip(), e._lastCursor = e._getCursor(), void e._saveLastCursor())
                    });
                    var t = !1,
                        r = !1,
                        a = !1,
                        i = !1;
                    this._els.canvas.addEventListener("mousedown", function() {
                        i = !0;
                        var t = void 0;
                        e._setEventListener(window, "mouseup", t = function(r) {
                            i = !1;
                            var a = "article_format_btn_link" == r.target.id;
                            a || (e._showFormatTooltip(), t && window.removeEventListener("mouseup", t))
                        })
                    }), this._els.canvas.addEventListener("selectstart", function() {
                        e._hideFormatTooltip()
                    }), this._els.canvas.addEventListener("copy", function(t) {
                        var r = (0, f.getRange)(),
                            a = o(r, 2),
                            i = a[0],
                            n = a[1];
                        if (n) {
                            var s = e._getContainingParagraphEl(i.commonAncestorContainer),
                                l = o(s, 1),
                                c = l[0];
                            (0, f.isObjectParagraphEl)(c) && (t.clipboardData.setData("text/plain", "uuid:" + c.getAttribute("data-uuid")), t.preventDefault())
                        }
                    }), this._els.canvas.addEventListener("paste", function(t) {
                        e._handleObjectPaste(t), e._handlePhotoPaste(t), e._handleLinkPaste(t);
                        var r = e._getCurrentParagraphIndex(),
                            a = o(r, 1),
                            i = a[0];
                        e._fromPasteEvent = !0, e._pasteCurrentIndex = i
                    }), this._els.canvas.addEventListener("click", function(e) {
                        return e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName ? cancelEvent(e) : void 0
                    });
                    var n = !1;
                    this._els.canvas.addEventListener("input", function() {
                        e._hideObjectPicker(), e._expandBlockquoteParagraphs(l);
                        var t = e._replaceAlienInlineTags();
                        browser.safari || e._els.canvas.normalize();
                        var i = void 0;
                        e._fromPasteEvent || t || e._markerCursorSet || browser.safari ? e._saveCursorMarker() : i = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), n && (e._cleanParagraphsBRs(), n = !1), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph();
                        var o = e._fromPasteEvent && e._expandDoubleBRs();
                        e._redraw(o), e._restoreCursor(i), e._correctCursorToBeWithinCanvas(), e._dirty = [], a ? e._saveUndoStateDelayed(e._lastCursor) : e._saveUndoState(e._lastCursor), r = a = !1, e._fromPasteEvent = !1, e.saveDraft()
                    });
                    var s = !1,
                        l = !1,
                        c = 1,
                        d = void 0;
                    this._els.canvas.addEventListener("keydown", function(i) {
                        var u = i.keyCode,
                            p = (0, f.getRange)(),
                            _ = o(p, 2),
                            v = _[0],
                            y = _[1],
                            m = e._getCurrentParagraphIndex(),
                            w = o(m, 2),
                            C = w[0],
                            P = w[1];
                        if (i.keyCode == E.Tab && y && 0 == C) return (0, f.focusEl)(e._getParagraphElByIndex(1)), cancelEvent(i);
                        if (83 == i.keyCode && (i.metaKey || i.ctrlKey)) return e.saveDraft(!1, !1, !0), cancelEvent(i);
                        if (90 == i.keyCode && (i.metaKey || i.ctrlKey)) return e._undo(), cancelEvent(i);
                        var T = !1;
                        if (u == E.Backspace) {
                            if (s) return s[0].textContent = s[1], e._restoreCursor(s[2]), s = !1, cancelEvent(i);
                            var x = e._getParagraph(C),
                                O = !1;
                            if ((0, f.isObjectParagraph)(x))
                                if (x._object.isCaptionFocused()) O = 0 == v.startOffset && y;
                                else {
                                    var S = e._getContainingParagraphEl(v.startContainer),
                                        k = o(S, 1),
                                        j = k[0];
                                    O = j == x._object.el()
                                }
                            if (O) {
                                if (x._object.isCaptionFocused()) {
                                    var A = e._getParagraphElByIndex(C),
                                        N = (0, f.createParagraphEl)();
                                    return domReplaceEl(A, N), (0, f.focusEl)(N), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                                }
                                var L = e._getParagraphElByIndex(C),
                                    D = (0, f.createParagraphEl)();
                                return domReplaceEl(L, D), (0, f.focusEl)(D), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                            }
                            if (v && 0 == v.startOffset) {
                                var I = e._getCurrentParagraphIndex(),
                                    R = o(I, 1),
                                    M = R[0],
                                    H = M > 0 ? e._ps[M - 1] : !1;
                                if ((0, f.isObjectParagraph)(H)) return
                            }
                            e._setAllParagraphsDirty(), browser.msie && setTimeout(function() {
                                e._triggerInputEvent()
                            })
                        }
                        if (u == E.Delete) {
                            var B = e._ps[C],
                                U = e._ps[C + 1],
                                F = !1;
                            if ((0, f.isObjectParagraph)(B) && v && y && (F = !B._object.isCaptionFocused() && v.startContainer == B._object.el(), F = F || B._object.isCaptionFocused() && B._object.isEmptyCaption()), F) {
                                var z = e._getParagraphElByIndex(C),
                                    W = (0, f.createParagraphEl)();
                                return domReplaceEl(z, W), (0, f.focusEl)(W), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                            }
                            U && (0, f.isParagraphEmpty)(B) && (0, b.inArray)(U.type, [g.ParagraphType.Header2, g.ParagraphType.Header3]) && (B.type = U.type, e._setParagraphDirty(C), e._redraw()), e._setAllParagraphsDirty()
                        } else if (u == E.Enter) {
                            if (e._isWithinObjectParagraphEl((0, f.getFocusedElement)())) {
                                var $ = e._getContainingParagraphEl((0, f.getFocusedElement)()),
                                    q = o($, 2),
                                    K = q[0],
                                    Q = q[1],
                                    V = (0, f.createParagraphEl)();
                                return e._ps[Q]._object.isCaptionFocused() ? domInsertAfter(V, K) : domInsertBefore(V, K), e._setAllParagraphsDirty(), (0, f.focusEl)(V), e._triggerInputEvent(), cancelEvent(i)
                            }
                            var X = e._getContainingParagraphEl((0, f.getFocusedElement)()),
                                Y = o(X, 3),
                                G = Y[0],
                                J = Y[1],
                                Z = Y[2],
                                ee = (0, f.getRange)(),
                                te = o(ee, 2),
                                re = te[0],
                                ae = te[1],
                                ie = (0, f.getCaretCharacterOffsetWithin)(G),
                                ne = o(ie, 2),
                                oe = ne[1];
                            if (i.shiftKey) {
                                var le = (0, f.getCaretCharacterOffsetWithin)(G),
                                    ce = o(le, 2),
                                    de = ce[1],
                                    ue = domClosestByTag("li", re.startContainer),
                                    pe = 0;
                                ue && (pe = domChildIndex(ue));
                                var he = !1;
                                if (each(Z.lines, function(e, t) {
                                        var r = t.brs,
                                            a = t.text,
                                            i = a.length;
                                        return 0 == de || i >= de && (0, b.inArray)(de, r) ? (he = !0, !1) : (de -= i, 0 >= de && e == pe ? !1 : void 0)
                                    }), he) {
                                    n = !0, e._setParagraphDirty(C, P), document.execCommand("insertParagraph");
                                    var fe = domNS(G);
                                    return fe && ((0, f.focusEl)(fe), fe.focus()), e._triggerInputEvent(), cancelEvent(i)
                                }
                                browser.msie && 0 == de && re.insertNode(se("<br>"))
                            }
                            var ge = ae && re.startContainer.nodeType == Node.TEXT_NODE && !re.startContainer.nextSibling && oe == G.textContent.length;
                            l = ge && !(0, f.isListParagraph)(e._ps[C]) && !i.shiftKey && (0, b.inArray)(Z.type, [g.ParagraphType.Quote, g.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), l || i.shiftKey || e._parseUrlParagraph(J), e._setParagraphDirty(C, P)
                        } else i.key && 1 == i.key.length ? (e._setParagraphDirty(C), e._setParagraphDirty(P), i.metaKey || (T = !0, i.key && ((0, f.isCyrillicChar)(i.key) ? c += 1 : (0, f.isLatinChar)(i.key) && (c -= 1), c = Math.min(Math.max(c, -5), 5))), r = (0, f.isWhiteSpaceChar)(i.key), t && !r && (a = !0), t = T, setTimeout(function() {
                            function t(e, t, r, a, i) {
                                var n = this._getCursor(),
                                    o = t.textContent.substring(0, e - r.length),
                                    l = t.textContent.substring(e);
                                i || (s = [t, o + r + l, n]), t.textContent = o + a + l, this._restoreCursor(n), this._setParagraphDirty(C), this._triggerInputEvent()
                            }
                            d = d || c > 0;
                            var r = window.getSelection();
                            if (r.isCollapsed && r.rangeCount) {
                                var a = r.getRangeAt(0),
                                    i = a.startContainer;
                                if (i.nodeType == Node.TEXT_NODE && a.startOffset > 0)
                                    for (var n = i.textContent.substring(a.startOffset - 5, a.startOffset), o = 0, l = h.Sequences.length; l > o; o++) {
                                        var u = h.Sequences[o];
                                        if (void 0 === u.cyrillic || u.cyrillic === d)
                                            if (u.pattern instanceof RegExp) {
                                                var p = n.match(u.pattern);
                                                if (p) {
                                                    var f = u.substitution;
                                                    p.length > 1 && (f = f.replace("$1", p[1])), t.call(e, a.startOffset, i, p[0], f, u.noUndo);
                                                    break
                                                }
                                            } else if (n.endsWith(u.pattern)) {
                                            t.call(e, a.startOffset, i, u.pattern, u.substitution, u.noUndo);
                                            break
                                        }
                                    }
                            }
                        }, 0)) : t = !1;
                        s = !1
                    })
                }, e.prototype._isParagraphEl = function(e) {
                    return e && hasClass(e, "_article_paragraph")
                }, e.prototype._isWithinObjectParagraphEl = function(e) {
                    var t = this._getContainingParagraphEl(e),
                        r = o(t, 1),
                        a = r[0];
                    return a && (0, f.isObjectParagraphEl)(a)
                }, e.prototype._highlightObjectsInCurrentSelection = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = o(e, 2),
                        r = t[0],
                        a = t[1];
                    r !== !1 && a !== !1 && this._ps.forEach(function(e, t) {
                        if (e._object) {
                            var i = r != a;
                            e._object.highlight(t >= r && a >= t, i)
                        }
                    })
                }, e.prototype._getOrCreateParagraphObject = function(e) {
                    e._uuid || (e._uuid = n());
                    var t = this._getObject(e._uuid);
                    if (!t) {
                        var r = e.mediaId || "",
                            a = e._preparedData || {};
                        switch (parseInt(e.type)) {
                            case g.ParagraphType.ObjectPhoto:
                                t = new l["default"](r, a, this);
                                break;
                            case g.ParagraphType.ObjectVideo:
                                t = new d["default"](r, a, this);
                                break;
                            case g.ParagraphType.ObjectGIF:
                                t = new p["default"](r, a, this)
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
                    if (t)
                        if (this._isWithinObjectParagraphEl(t)) {
                            var r = (0, f.paragraphElProperties)(t),
                                a = o(r, 2),
                                i = a[0],
                                n = a[1],
                                s = this._getObject(n);
                            if (!s) return;
                            var l = void 0;
                            l = s.getCaptionEl() ? this._getParagraphFromHTML("", s.getCaptionEl().innerHTML) : (0, f.buildParagraph)(), l._uuid = n, l.type = i, l._object = s, this._ps[e] = l
                        } else if (t.nodeType == Node.ELEMENT_NODE) {
                        var c = t.tagName.toLowerCase();
                        this._ps[e] = this._getParagraphFromHTML(c, t.innerHTML)
                    } else this._ps[e] = this._getParagraphFromHTML("p", t.textContent)
                }, e.prototype.onDragEnd = function() {
                    this._dragEnterEventsHandler && (this._els.canvas.removeEventListener("dragenter", this._dragEnterEventsHandler), delete this._dragEnterEventsHandler), this._dragLeaveEventsHandler && (this._els.canvas.removeEventListener("dragleave", this._dragLeaveEventsHandler), delete this._dragLeaveEventsHandler), this._dragDropEventsHandler && (this._els.canvas.removeEventListener("drop", this._dragDropEventsHandler), delete this._dragDropEventsHandler), this._dragEndEventsHandler && (this._els.canvas.removeEventListener("dragend", this._dragEndEventsHandler), delete this._dragEndEventsHandler)
                }, e.prototype.onDragStart = function(e) {
                    var t = this;
                    e.dataTransfer.setData("text/plain", " "), e.dropEffect = "move";
                    var r = e.target;
                    return this._els.canvas.addEventListener("dragenter", this._dragEnterEventsHandler = function(e) {
                        var r = e.target;
                        t._isParagraphEl(r) && addClass(r, "article_ed__drag_drop")
                    }), this._els.canvas.addEventListener("dragleave", this._dragLeaveEventsHandler = function(e) {
                        var r = e.target;
                        t._isParagraphEl(r) && removeClass(r, "article_ed__drag_drop")
                    }), this._els.canvas.addEventListener("dragover", this._dragLeaveEventsHandler = function(e) {
                        var r = e.target;
                        t._isParagraphEl(r) && (e.preventDefault(), e.dataTransfer.dropEffect = "move")
                    }), this._els.canvas.addEventListener("drop", this._dragDropEventsHandler = function(e) {
                        var a = e.target;
                        t._isParagraphEl(a) && (domInsertAfter(r, a), removeClass(a, "article_ed__drag_drop")), t.onDragEnd(), t._setAllParagraphsDirty(), t._triggerInputEvent(), setTimeout(function() {
                            var e = geByClass1("article_ed__figcaption_edit", r);
                            elfocus(e)
                        }), e.preventDefault()
                    }), this._els.canvas.addEventListener("dragend", this._dragEndEventsHandler = function() {
                        r.focus(), t.onDragEnd()
                    }), !0
                }, e.prototype.getCurrentParagraphs = function() {
                    var e = this._getCurrentParagraphIndex(),
                        t = o(e, 2),
                        r = t[0],
                        a = t[1];
                    return [this._getParagraphElByIndex(r), this._getParagraphElByIndex(a)]
                }, e
            }();
        t["default"] = A
    },
    78: function(e, t, r) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var i = r(72),
            n = a(i),
            o = r(30);
        window.ArticleEditor = n["default"], window.ArticleView = {
            initArticle: o.initArticle
        }, stManager.done(jsc("web/article.js"))
    },
    81: function(e, t) {
        "use strict";

        function r() {
            return window.devicePixelRatio >= 2
        }

        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            for (var r in e)
                if (Object.prototype.hasOwnProperty.call(e, r) && t.call(e[r], r, e[r]) === !1) break;
            return e
        }

        function i(e, t) {
            var i = [];
            a(e, function(e, t) {
                i.push(t)
            }), i.sort(function(e, t) {
                return e[1] - t[1]
            }), t *= r() ? 2 : 1;
            var n = i[i.length - 1];
            return a(i, function(e, r) {
                return r[1] >= t ? (n = r, !1) : void 0
            }), n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getAppropriateImage = i;
        t.ParagraphType = {
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
        }
    },
    85: function(e, t, r) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = r(32),
            l = a(s),
            c = function(e) {
                function t(r, a, o) {
                    return i(this, t), n(this, e.call(this, r, a, o, !0))
                }
                return o(t, e), t.prototype.render = function() {
                    var e = this;
                    this._el = se('\n      <div class="article_object_video"></div>\n    ');
                    var t = this.getPreparedData();
                    if (t && (t.editable || t.thumb)) {
                        var r = this.getEditor().getWidth(!0),
                            a = Math.floor(r * (9 / 16)),
                            i = function() {
                                var r = [];
                                each(t.editable.sizes, function(e, t) {
                                    r.push(t)
                                }), r = r.sort(function(e, t) {
                                    return e[1] < t[1]
                                });
                                var a = e.getEditor().getWidth() * (isRetina() ? 2 : 1),
                                    i = r[0][0];
                                return r.forEach(function(e) {
                                    e[1] >= a && (i = e[0])
                                }), i
                            },
                            n = t.thumb || i();
                        setStyle(this._el, {
                            width: r,
                            height: a,
                            backgroundImage: "url(" + n + ")"
                        }), this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                            duration: t.duration || 0,
                            platform: t.platform || ""
                        }))), this._el.appendChild(se('<div class="article_ed__video_play_note">' + getLang("pages_articles_editor_video_play_note") + "</div>"))
                    }
                    return this._el
                }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
            }(l["default"]);
        t["default"] = c
    },
    87: function(e, t, r) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = r(32),
            l = a(s),
            c = function(e) {
                function t(r, a, o) {
                    return i(this, t), n(this, e.call(this, r, a, o, !0))
                }
                return o(t, e), t.prototype.render = function() {
                    var e = this;
                    this._el = se('\n      <div class="article_object_gif"></div>\n    ');
                    var t = this.getPreparedData();
                    if (t)
                        if (t.video) {
                            if (this._videoEl = ce("video", {
                                    autoplay: !0,
                                    loop: "loop",
                                    muted: !0,
                                    src: t.video + "&mp4=1"
                                }), t.size) {
                                var r = t.size[0] < t.size[1],
                                    a = t.size[0] <= this.getEditor().getOptions().minGifWidthExpand;
                                (r || a) && setStyle(this._videoEl, {
                                    width: t.size[0]
                                })
                            }
                            this._el.appendChild(this._videoEl)
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
            }(l["default"]);
        t["default"] = c
    },
    92: function(e, t, r) {
        "use strict";

        function a(e) {
            for (var t = e.parentNode; e.firstChild;) t.insertBefore(e.firstChild, e);
            t.removeChild(e)
        }

        function i(e) {
            return se("<textarea>" + (e || "") + "</textarea>").value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }

        function n(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && inArray(e.tagName.toLowerCase(), ["cite", "blockquote"])
        }

        function o(e) {
            var t = domData(e, "type"),
                r = domData(e, "uuid");
            return [t, r]
        }

        function s(e, t) {
            cur[e] = cur[e] || 0, void 0 === t ? console.log(e, cur[e]) : cur[e] >= t, cur[e]++
        }

        function l(e) {
            return e && hasClass(e, "_article_paragraph")
        }

        function c(e) {
            if (e.endContainer != e.startContainer && e.endContainer.nodeType == Node.ELEMENT_NODE && l(e.endContainer) && 0 == e.endOffset && 0 == e.startOffset) {
                var t = e.cloneRange();
                t.selectNodeContents(domPS(e.endContainer));
                var r = e.cloneRange();
                return r.setEnd(cloned.endContainer, cloned.endOffset), r
            }
            return e
        }

        function d(e) {
            if (e) try {
                var t = document.createRange();
                t.selectNodeContents(e);
                var r = window.getSelection();
                r.removeAllRanges(), r.addRange(t)
            } catch (a) {}
        }

        function u(e) {
            if (e) try {
                var t = document.createRange();
                t.setStart(e, 0), t.setEnd(e, 0);
                var r = window.getSelection();
                r.removeAllRanges(), r.addRange(t)
            } catch (a) {}
        }

        function p(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && "BR" == e.tagName
        }

        function h(e) {
            var t, r = 0,
                a = 0,
                i = e.ownerDocument || e.document,
                n = i.defaultView || i.parentWindow;
            if ("undefined" != typeof n.getSelection) {
                if (t = n.getSelection(), t.rangeCount > 0) {
                    var o = n.getSelection().getRangeAt(0),
                        s = o.cloneRange();
                    s.selectNodeContents(e), s.setEnd(o.startContainer, o.startOffset), r = s.toString().length, s.setEnd(o.endContainer, o.endOffset), a = s.toString().length
                }
            } else if ((t = i.selection) && "Control" != t.type) {
                var l = t.createRange(),
                    c = i.body.createTextRange();
                c.moveToElementText(e), c.setEndPoint("EndToStart", l), r = c.text.length, c.setEndPoint("EndToEnd", l), a = c.text.length
            }
            return [r, a]
        }

        function f(e, t, r, a) {
            if (e = e.substring(t, r), a && a.length) {
                var i = [],
                    n = 0;
                a.forEach(function(r) {
                    r -= t, 0 >= r || r > e.length || (i.push(E(e.substring(n, r) + "<br/>")), n = r)
                }), i.push(E(e.substring(n)));
                "" == i[i.length - 1];
                return i.join("")
            }
            return E(e)
        }

        function g(e) {
            if (!e) return !1;
            for (var t = 0; null != (e = e.previousSibling);) t++;
            return t
        }

        function _(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
        }

        function v(e) {
            return e && e.type && e.type >= 100
        }

        function y(e) {
            var t = void 0;
            return t = isObject(e) ? e.type : e, inArray(t, [ne.ParagraphType.Header1, ne.ParagraphType.Header2, ne.ParagraphType.Header3])
        }

        function m(e) {
            return e && (e.type == ne.ParagraphType.NumericList || e.type == ne.ParagraphType.BulletList)
        }

        function b(e) {
            e = e || {};
            var t = {};
            return v(e) && (t._uuid = e._uuid), t.lines = e.lines || [{
                text: "",
                decorations: {},
                brs: []
            }], t.type = e.type ? parseInt(e.type) : ne.ParagraphType.Text, e._preparedData && (t._preparedData = e._preparedData), e.mediaId && (t.mediaId = e.mediaId), t
        }

        function w() {
            var e = window.getSelection();
            return e.rangeCount ? [e.getRangeAt(0), e.isCollapsed, e] : [!1]
        }

        function E(e) {
            return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + oe), e
        }

        function C(e) {
            return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
        }

        function P(e) {
            for (var t = 5; t--;) {
                if (hasClass(e, "_article_paragraph")) return e;
                e = e.parentNode
            }
            return !1
        }

        function T(e) {
            var t = e.slice();
            t.sort(function(e, t) {
                return e[0] - t[0]
            });
            for (var r = 0; r < t.length - 1;) {
                var a = t[r],
                    i = t[r + 1];
                a[1] >= i[0] ? (a[1] = Math.max(a[1], i[1]), t.splice(r + 1, 1)) : r++
            }
            return t
        }

        function x(e) {
            return /\s/.test(e)
        }

        function O(e) {
            return pe.test(e)
        }

        function S(e) {
            return /[a-zA-Z]/.test(e)
        }

        function k(e) {
            return !hasClass(e, ue)
        }

        function j() {
            var e = window.getSelection();
            return e.focusNode
        }

        function A(e) {
            if (e.hasAttribute(le)) {
                for (var t = e.getAttribute(le); e = e.previousSibling;)
                    if (e.hasAttribute(le) && t == e.getAttribute(le)) return !1;
                return !0
            }
            return !1
        }

        function N(e) {
            var t = [];
            each(e, function(e, r) {
                t.push(r)
            });
            var r = t.sort(function(e, t) {
                return t[1] - e[1]
            })[0];
            return [r[1], r[2]]
        }

        function L(e) {
            for (var t = e.parentNode, r = 0; r < t.childNodes.length; r++)
                if (e == t.childNodes[r]) return r;
            return -1
        }

        function D(e) {
            e = e || document.body;
            var t = w(),
                r = ie(t, 2),
                a = r[0],
                i = (r[1], void 0),
                n = void 0,
                o = [];
            return a.startContainer.nodeType == Node.TEXT_NODE ? i = a.startOffset : n = a.startOffset, traverseParent(a.startContainer, function(t) {
                return t == e ? !0 : void o.push(L(t))
            }, 10), o = o.reverse(), [o, i, n]
        }

        function I(e, t) {
            e = e.toLowerCase();
            for (var r = "", a = !1, i = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), n = 0; n < e.length; n++)
                if (/\s/.test(e[n])) a || (r += "-", a = !0);
                else if (inArray(e[n], i)) r += e[n], a = !1;
            else {
                var o = he[e.charCodeAt(n)];
                o && (r += o, a = !1)
            }
            return r = r.substr(0, t), r = r.replace(/-*$/, "")
        }

        function R(e) {
            var t = void 0,
                r = void 0,
                a = void 0;
            t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], a = new Uint8Array(t.length);
            for (var i = 0; i < t.length; i++) a[i] = t.charCodeAt(i);
            return new Blob([a], {
                type: r
            })
        }

        function M(e, t, r) {
            function a(e) {
                return e ? n[e.split("?").shift().split(".").pop()] : null
            }
            var i = void 0;
            if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
            if ("object" === ("undefined" == typeof e ? "undefined" : ae(e)) && "img" === e.tagName.toLowerCase() && (i = e.src), "string" == typeof e && (i = e), /^data:/.test(i) && !t.convert) return void r(null, R(i));
            var n = {
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                svg: "image/svg+xml"
            };
            return t.type = n[t.type] || a(i), t.src = i, t.callback = r, t.name = i, t.type ? void B(i, H.bind(null, t)) : void r(new Error("Image type is not supported"))
        }

        function H(e, t, r) {
            if (t) return void e.callback(t);
            var a = R(r);
            a.name = a.filename = e.name, e.callback(null, a)
        }

        function B(e, t) {
            var r = document.createElement("canvas"),
                a = document.createElement("img");
            a.onload = function() {
                var e = r.getContext("2d");
                r.width = a.width, r.height = a.height, e.drawImage(a, 0, 0), t(null, r.toDataURL("image/png"))
            }, a.addEventListener("error", function() {
                t(new Error("FailedToLoadImage"))
            }), r.getContext ? (a.crossOrigin = "anonymous", a.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
        }

        function U() {
            if (0 != fe.length && ge != _e) {
                ge++;
                var e = fe.shift(),
                    t = new Image;
                t.addEventListener("load", function() {
                    M(t, {}, function(t, r) {
                        e.cb(t, r, function() {
                            ge--, U()
                        })
                    })
                }), t.src = e.src
            }
        }

        function F(e, t) {
            fe.push({
                src: e,
                cb: t
            }), U()
        }

        function z(e) {
            return e.replace(/\s/g, "").replace(ce, "").replace(de, "")
        }

        function W(e) {
            return e = trim(e), 1 == e.length && e[0] == ce
        }

        function $(e) {
            return !e || !v(e) && (0 == e.lines.length || 1 == e.lines.length && !e.lines[0].text)
        }

        function q(e) {
            return e.filter(function(e, t, r) {
                return r.indexOf(e) === t
            })
        }

        function K(e, t, r) {
            var a = {};
            for (var i in e) e.hasOwnProperty(i) && ! function() {
                var n = [];
                e[i].forEach(function(e) {
                    t < e[1] && e[0] <= r && n.push([Math.max(e[0], t) - t, Math.min(r, e[1]) - t, e[2]])
                }), a[i] = n
            }();
            return a
        }

        function Q(e) {
            e.brs = q(e.brs), e.brs[e.brs.length - 1] == e.text.length && e.brs.pop()
        }

        function V(e, t) {
            var r = e.length;
            return 1 == r && e[r - 1] == t ? e.pop() : r > 1 && e[r - 1] == t && e[r - 2] != t && e.pop(), e
        }

        function X() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return se('<p class="' + ue + '">' + e + "</p>")
        }

        function Y(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0,
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                i = t(e, a);
            if (void 0 !== i) return i;
            for (var n = Array.prototype.slice.call(r ? e.children : e.childNodes), o = void 0; o = n.shift();) {
                var s = Y(o, t, r, !1);
                if (void 0 !== s) return s
            }
        }

        function G(e, t, r) {
            var a = void 0,
                i = void 0,
                n = void 0,
                o = null,
                s = 0;
            r || (r = {});
            var l = function() {
                s = r.leading === !1 ? 0 : Date.now(), o = null, n = e.apply(a, i), o || (a = i = null)
            };
            return function() {
                var c = Date.now();
                s || r.leading !== !1 || (s = c);
                var d = t - (c - s);
                return a = this, i = arguments, 0 >= d || d > t ? (o && (clearTimeout(o), o = null), s = c, n = e.apply(a, i), o || (a = i = null)) : o || r.trailing === !1 || (o = setTimeout(l, d)), n
            }
        }

        function J(e) {
            return /^[a-z0-9\-]+$/.test(e) ? -1 != e.indexOf("--") ? !1 : "-" == e[0] || "-" == e[e.length - 1] ? !1 : e.length > 60 ? !1 : !0 : !1
        }

        function Z(e, t, r) {
            e.decorations && each(e.decorations, function(e, a) {
                a.forEach(function(e) {
                    e[0] > t && (e[0] += r), e[1] > t && (e[1] += r)
                })
            }), e.brs && e.brs.forEach(function(r, a) {
                r > t && (e.brs[a] -= 1)
            })
        }

        function ee(e, t) {
            e.forEach(function(e) {
                e.lines.forEach(function(e) {
                    for (var r = 0, a = e.text.length; a > r; r++) {
                        var i = e.text.charCodeAt(r);
                        i >= 55296 && 56319 >= i && (Z(e, r, t), r += 1)
                    }
                })
            })
        }

        function te(e) {
            return /^(https?:\/\/)?([a-z0-9_\-.]+\.)?vk.com(\/.*)?/.test(e)
        }

        function re(e) {
            var t = e;
            try {
                t = decodeURIComponent(e)
            } catch (r) {
                t = e
            }
            return t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ArticleEditorParagraphClass = t.CURSOR_MARKER_END = t.CURSOR_MARKER_START = t.DATA_ATTR_TRACKED = t.NBSP = void 0;
        var ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            ie = function() {
                function e(e, t) {
                    var r = [],
                        a = !0,
                        i = !1,
                        n = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                    } catch (l) {
                        i = !0, n = l
                    } finally {
                        try {
                            !a && s["return"] && s["return"]()
                        } finally {
                            if (i) throw n
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        t.unwrapElement = a, t.replaceParagraphEntities = i, t.isQuoteEl = n, t.paragraphElProperties = o, t.deb = s, t.isParagraphEl = l, t.getCorrectedRange = c, t.selectEl = d, t.focusEl = u, t.isBR = p, t.getCaretCharacterOffsetWithin = h, t.prepareLineText = f, t.getElementIndex = g, t.isObjectParagraphEl = _, t.isObjectParagraph = v, t.isHeaderParagraph = y, t.isListParagraph = m, t.buildParagraph = b, t.getRange = w, t.prepareSpacesWithSpaces = E, t.cleanTextSpaces = C, t.getLineEl = P, t.mergeRanges = T, t.isWhiteSpaceChar = x, t.isCyrillicChar = O, t.isLatinChar = S, t.isAlienParagraphEl = k, t.getFocusedElement = j, t.isTrackedParagraphEl = A, t.getPhotoSize = N, t.childNodeIndex = L, t.getAbsoluteCursorPosition = D, t.generateLatinizedName = I, t.dataURItoBlob = R, t.imageToBlob = M, t.queuePhotoProcess = F, t.cleanWhiteSpaces = z, t.justCursorInString = W, t.isParagraphEmpty = $, t.arrayUnique = q, t.decorationsSlice = K, t.cleanLineBRs = Q, t.cleanBRs = V, t.createParagraphEl = X, t.traverseTree = Y, t.throttle = G, t.isPublishNameCorrect = J, t.correctRealIndexes = ee, t.isVKUrl = te, t.decodeURL = re;
        var ne = r(81),
            oe = t.NBSP = "&nbsp;",
            le = t.DATA_ATTR_TRACKED = "data-t",
            ce = t.CURSOR_MARKER_START = "​",
            de = t.CURSOR_MARKER_END = "‌",
            ue = t.ArticleEditorParagraphClass = "_article_p",
            pe = /[\u0400-\u04FF]/,
            he = {
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
            fe = [],
            ge = 0,
            _e = 2
    },
    96: function(e, t, r) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    var r = [],
                        a = !0,
                        i = !1,
                        n = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                    } catch (l) {
                        i = !0, n = l
                    } finally {
                        try {
                            !a && s["return"] && s["return"]()
                        } finally {
                            if (i) throw n
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
            l = r(32),
            c = a(l),
            d = r(81),
            u = function(e) {
                function t(r, a, o) {
                    return i(this, t), n(this, e.call(this, r, a, o, !0))
                }
                return o(t, e), t.prototype.render = function() {
                    return this._el = se('\n      <img contenteditable="false"/>\n    '), this._preparedData && this._preparedData.sizes ? (this.setLoadingState(!1), this._drawImage()) : this.setLoadingState(!0), this._el
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
                                        e._preparedData.sizes = r.editable.sizes, e._mediaId = t, e._drawImage(), e._onUploadCallback && e._onUploadCallback()
                                    }
                                })
                            },
                            onUploadProgress: function() {},
                            onCheckServerFailed: function() {},
                            onUploadCompleteAll: function() {},
                            noFlash: 1,
                            max_files: 1,
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
                    return this._el
                }, t.prototype.setBLOB = function(e, t) {
                    var r = this;
                    this._onUploadCallback = t;
                    var a = new FileReader;
                    a.onload = function() {
                        r._initUpload(), Upload.onFileApiSend(r._upload, [e])
                    }, a.readAsDataURL(e)
                }, t.prototype._updateSize = function() {}, t.prototype._drawImage = function() {
                    var e = this,
                        t = this._preparedData;
                    if (t) {
                        var r = (0, d.getAppropriateImage)(t.sizes, this.getEditor().getWidth(!0)),
                            a = s(r, 1),
                            i = a[0],
                            n = this._getImageEl();
                        n.onload = function() {
                            e.setLoadingState(!1)
                        }, n.src = i, this._updateSize()
                    }
                }, t
            }(c["default"]);
        t["default"] = u
    }
});