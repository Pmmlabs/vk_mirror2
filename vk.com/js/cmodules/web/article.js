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
}([function(e, t, r) {
    e.exports = r(11)
}, function(e, t) {
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
                },
                onError: function() {
                    i(!0)
                }
            })
        }, e._saveFinally = function(e, t, r, a, i, n, o, s, l, c) {
            l = l ? JSON.stringify(l) : "", ajax.post("al_articles.php", extend({
                act: "save",
                article_owner_id: e,
                article_id: t,
                cover_photo_id: i,
                name: a,
                is_published: intval(r),
                chunks_count: s,
                Article_text: l,
                hash: o
            }, n || {}), {
                onDone: c,
                onFail: function(e) {
                    return e ? (showFastBox(getLang("global_error"), e), c(!0), !0) : void 0
                }
            })
        }, e.save = function(t, r, a, i, n, o, s, l, c, d) {
            var u = [],
                p = [],
                h = 0;
            if (a.forEach(function(e) {
                    var t = 0;
                    e.lines.forEach(function(e) {
                        t += e.text.length, e.decorations && e.decorations.link && e.decorations.link.forEach(function(e) {
                            t += (e[2] || "").length
                        })
                    }), h += t, h >= l && (u.push(p), h = t, p = []), p.push(e)
                }), p.length && u.push(p), u.length > 1) {
                var _ = new callHub(function() {
                    e._saveFinally(t, r, i, n, o, c, s, u.length, !1, d)
                }, u.length);
                u.forEach(function(r, a) {
                    e._saveChunk(t, r, a, s, function(e) {
                        e ? showFastBox(getLang("global_error"), getLang("pages_articles_save_fail")) : _.done()
                    })
                })
            } else e._saveFinally(t, r, i, n, o, c, s, 0, a, d)
        }, e
    }();
    t["default"] = a
}, function(e, t, r) {
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
        return e ? '<div class="article_ed__caredit_item article_ed__caredit_item_photo" data-media-id="' + t + '">\n      <div class="article_ed__caredit_photo" style="background-image: url(' + e + ')"></div>\n      <div class="article_ed__caredit_remove"><div class="article_ed__caredit_remove_icon"></div></div>\n    </div>' : '<button class="article_ed__caredit_item article_ed__caredit_item_add" nodrag="1">\n      <div class="article_ed__caredit_add"></div>\n      <div class="article_ed__caredit_item_text">' + getLang("pages_article_ed_carousel_add") + "</div>\n    </button>"
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
        s = r(18),
        l = a(s),
        c = r(14),
        d = r(4),
        u = function() {
            function e(t, r, a, s) {
                var d = this;
                i(this, e);
                var u = '<div class="article_ed__caredit">\n                  <div class="article_ed__caredit_inner">\n    ';
                u += '\n      <div class="article_ed__caredit_header">\n        ' + getLang("pages_article_ed_carousel_title") + '\n        <div class="article_ed__caredit_header_controls">\n          <div class="article_ed__caredit_header_counter"></div>\n          <button class="flat_button article_ed__caredit_save">' + getLang("global_save") + '</button>\n          <button class="flat_button article_ed__caredit_cancel">' + getLang("global_cancel") + "</button>\n        </div>\n      </div>\n    ", u += '\n      <div class="article_ed__caredit_items_wrap">\n        <div class="article_ed__caredit_items">\n    ';
                var p = r.getMediaId().split(",");
                p.forEach(function(e) {
                    var t = l["default"].get(e),
                        r = (0, c.getAppropriateImage)(t.sizes, 251),
                        a = o(r, 1),
                        i = a[0];
                    u += n(i, e)
                }), u += n(), u += "  </div>", u += "</div>", u += '</div>\n             <div class="article_ed__caredit_loading" style="display: none"></div>\n           </div>', this._els = {}, this._els.editor = se(u), this._els.itemsWrap = geByClass1("article_ed__caredit_items_wrap", this._els.editor), this._els.items = geByClass1("article_ed__caredit_items", this._els.editor), this._els.addButton = geByClass1("article_ed__caredit_item_add", this._els.editor), this._els.saveButton = geByClass1("article_ed__caredit_save", this._els.editor), this._els.cancelButton = geByClass1("article_ed__caredit_cancel", this._els.editor), this._els.loading = geByClass1("article_ed__caredit_loading", this._els.editor), this._els.counter = geByClass1("article_ed__caredit_header_counter", this._els.editor), this._els.addButton.addEventListener("click", function() {
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
                    re(d._els.editor), a(d._medias.join(","))
                }), this._onSave = a, this._els.cancelButton.addEventListener("click", this.cancel.bind(this)), this._els.items.addEventListener("click", function(e) {
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
                }), this._limit = s, this._originalMedias = this._collectMediaIds(), this._toggleAddButton(), this._updateCounter()
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
                    var a = domData(r, "media-id");
                    a && e._medias.push(a)
                }), this._medias = this._medias.slice(0, this._limit), this._medias
            }, e.prototype.onPhotoAdd = function(e, t, r, a) {
                if (!inArray(t, this._medias) && this._medias.length < this._limit) {
                    l["default"].add(t, {
                        size: (0, d.getPhotoSize)(r.editable.sizes),
                        sizes: r.editable.sizes
                    });
                    var i = (0, c.getAppropriateImage)(r.editable.sizes, 251),
                        s = o(i, 1),
                        u = s[0];
                    domInsertBefore(se(n(u, t)), this._els.addButton)
                }
                return void 0 === a && (curBox() && curBox().hide(), this._initSorter(), this._scroll.update()), this._collectMediaIds(), this._toggleAddButton(), this._updateCounter(), !1
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
    t["default"] = u
}, , function(e, t, r) {
    "use strict";

    function a(e) {
        for (var t = e.parentNode; e.firstChild;) t.insertBefore(e.firstChild, e);
        t.removeChild(e)
    }

    function i(e) {
        return se("<textarea>" + (e || "") + "</textarea>").value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
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

    function _(e, t, r, a) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        if (e = e.substring(t, r), a && a.length) {
            var n = [],
                o = 0;
            a.forEach(function(r) {
                if (r -= t, !(0 >= r || r > e.length)) {
                    var a = e.substring(o, r) + "<br/>";
                    a = i ? a : C(a), n.push(a), o = r
                }
            });
            var s = e.substring(o);
            return n.push(i ? s : C(s)), "" == n[n.length - 1], n.join("")
        }
        return i ? e : C(e)
    }

    function g(e) {
        if (!e) return !1;
        for (var t = 0; null != (e = e.previousSibling);) t++;
        return t
    }

    function f(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
    }

    function v(e) {
        return e && e.type && e.type >= 100
    }

    function m(e) {
        var t = void 0;
        return t = isObject(e) ? e.type : e, inArray(t, [le.ParagraphType.Header1, le.ParagraphType.Header2, le.ParagraphType.Header3])
    }

    function y(e) {
        return e && (e.type == le.ParagraphType.NumericList || e.type == le.ParagraphType.BulletList)
    }

    function b(e) {
        e = e || {};
        var t = {};
        return v(e) && (t._uuid = e._uuid), t.lines = e.lines || [{
            text: "",
            decorations: {},
            brs: []
        }], t.type = e.type ? parseInt(e.type) : le.ParagraphType.Text, e.mediaId && (t.mediaId = e.mediaId), e.fromExtPage && (t.fromExtPage = e.fromExtPage), t
    }

    function w(e) {
        if (isArray(e)) return e;
        var t = [];
        return each(e, function(e, r) {
            t.push(intval(r))
        }), t.sort(), t
    }

    function E() {
        var e = window.getSelection();
        return e.rangeCount ? [e.getRangeAt(0), e.isCollapsed, e] : [!1]
    }

    function C(e) {
        return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + ce), e
    }

    function P(e) {
        return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
    }

    function T(e) {
        for (var t = 5; t--;) {
            if (hasClass(e, "_article_paragraph")) return e;
            e = e.parentNode
        }
        return !1
    }

    function x(e) {
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

    function S(e) {
        return /\s/.test(e)
    }

    function O(e) {
        return _e.test(e)
    }

    function k(e) {
        return /[a-zA-Z]/.test(e)
    }

    function j(e) {
        return !hasClass(e, he)
    }

    function I() {
        var e = window.getSelection();
        return e.focusNode
    }

    function L(e) {
        if (e.hasAttribute(de)) {
            for (var t = e.getAttribute(de); e = e.previousSibling;)
                if (e.hasAttribute(de) && t == e.getAttribute(de)) return !1;
            return !0
        }
        return !1
    }

    function A(e) {
        var t = [];
        each(e, function(e, r) {
            t.push(r)
        });
        var r = t.sort(function(e, t) {
            return t[1] - e[1]
        })[0];
        return [r[1], r[2]]
    }

    function N(e) {
        for (var t = e.parentNode, r = 0; r < t.childNodes.length; r++)
            if (e == t.childNodes[r]) return r;
        return -1
    }

    function M(e) {
        e = e || document.body;
        var t = E(),
            r = oe(t, 2),
            a = r[0],
            i = void r[1],
            n = void 0,
            o = [];
        return a.startContainer.nodeType == Node.TEXT_NODE ? i = a.startOffset : n = a.startOffset, traverseParent(a.startContainer, function(t) {
            return t == e ? !0 : void o.push(N(t))
        }, 10), o = o.reverse(), [o, i, n]
    }

    function D(e, t) {
        e = e.toLowerCase();
        for (var r = "", a = !1, i = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), n = 0; n < e.length; n++)
            if (/\s/.test(e[n])) a || (r += "-", a = !0);
            else if (inArray(e[n], i)) r += e[n], a = !1;
        else {
            var o = ge[e.charCodeAt(n)];
            o && (r += o, a = !1)
        }
        return r = r.substr(0, t), r = r.replace(/-*$/, "").replace(/^-*/, "").replace(/-+/g, "-")
    }

    function B(e) {
        var t = void 0,
            r = void 0,
            a = void 0;
        t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], a = new Uint8Array(t.length);
        for (var i = 0; i < t.length; i++) a[i] = t.charCodeAt(i);
        return new Blob([a], {
            type: r
        })
    }

    function R(e, t, r) {
        function a(e) {
            return e ? n[e.split("?").shift().split(".").pop()] : null
        }
        var i = void 0;
        if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
        if ("object" === ("undefined" == typeof e ? "undefined" : ne(e)) && "img" === e.tagName.toLowerCase() && (i = e.src), "string" == typeof e && (i = e), /^data:/.test(i) && !t.convert) return void r(null, B(i));
        var n = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            svg: "image/svg+xml"
        };
        return t.type = n[t.type] || a(i), t.src = i, t.callback = r, t.name = i, t.type ? void U(i, H.bind(null, t)) : void r(new Error("Image type is not supported"))
    }

    function H(e, t, r) {
        if (t) return void e.callback(t);
        var a = B(r);
        a.name = a.filename = e.name, e.callback(null, a)
    }

    function U(e, t) {
        var r = document.createElement("canvas"),
            a = document.createElement("img");
        a.onload = function() {
            var e = r.getContext("2d");
            r.width = a.width, r.height = a.height, e.drawImage(a, 0, 0), t(null, r.toDataURL("image/png"))
        }, a.addEventListener("error", function() {
            t(new Error("FailedToLoadImage"))
        }), r.getContext ? (a.crossOrigin = "anonymous", a.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
    }

    function F() {
        if (0 != fe.length && ve != me) {
            ve++;
            var e = fe.shift(),
                t = new Image;
            t.addEventListener("load", function() {
                R(t, {}, function(t, r) {
                    e.cb(t, r, function() {
                        ve--, F()
                    })
                })
            }), t.src = e.src
        }
    }

    function z(e, t) {
        fe.push({
            src: e,
            cb: t
        }), F()
    }

    function W(e) {
        return e.replace(/\s/g, "").replace(ue, "").replace(pe, "")
    }

    function K(e) {
        return e = trim(e), 1 == e.length && e[0] == ue
    }

    function $(e) {
        return !e || !v(e) && (0 == e.lines.length || 1 == e.lines.length && !e.lines[0].text)
    }

    function Q(e) {
        return e.filter(function(e, t, r) {
            return r.indexOf(e) === t
        })
    }

    function q(e, t, r) {
        var a = {};
        for (var i in e) e.hasOwnProperty(i) && ! function() {
            var n = [];
            e[i].forEach(function(e) {
                t < e[1] && e[0] <= r && n.push([Math.max(e[0], t) - t, Math.min(r, e[1]) - t, e[2]])
            }), a[i] = n
        }();
        return a
    }

    function V(e) {
        e.brs = Q(e.brs), e.brs[e.brs.length - 1] == e.text.length && e.brs.pop()
    }

    function X(e, t) {
        var r = e.length;
        return 1 == r && e[r - 1] == t ? e.pop() : r > 1 && e[r - 1] == t && e[r - 2] != t && e.pop(), e
    }

    function Y() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return se('<p class="' + he + '">' + e + "</p>")
    }

    function G(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            i = t(e, a);
        if (void 0 !== i) return i;
        for (var n = Array.prototype.slice.call(r ? e.children : e.childNodes), o = void 0; o = n.shift();) {
            var s = G(o, t, r, !1);
            if (void 0 !== s) return s
        }
    }

    function J(e, t, r) {
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

    function Z(e) {
        return /^[a-z0-9\-]+$/.test(e) ? -1 != e.indexOf("--") ? !1 : "-" == e[0] || "-" == e[e.length - 1] ? !1 : e.length > 60 ? !1 : !0 : !1
    }

    function ee(e, t, r) {
        e.decorations && each(e.decorations, function(e, a) {
            a.forEach(function(e) {
                e[0] > t && (e[0] += r), e[1] > t && (e[1] += r)
            })
        }), e.brs && e.brs.forEach(function(r, a) {
            r > t && (e.brs[a] -= 1)
        })
    }

    function te(e, t) {
        e.forEach(function(e) {
            e.lines.forEach(function(e) {
                for (var r = 0, a = e.text.length; a > r; r++) {
                    var i = e.text.charCodeAt(r);
                    i >= 55296 && 56319 >= i && (ee(e, r, t), r += 1)
                }
            })
        })
    }

    function re(e) {
        return /^(https?:\/\/)?([a-z0-9_\-.]+\.)?vk.com(\/.*)?/.test(e)
    }

    function ae(e) {
        var t = e;
        try {
            t = decodeURIComponent(e)
        } catch (r) {
            t = e
        }
        return t
    }

    function ie(e) {
        for (var t = 0, r = e.children.length; r > t; t++)
            if (be.indexOf(e.children[t].tagName) >= 0) return !0;
        return !1
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BlockElements = t.ArticleEditorParagraphClass = t.CURSOR_MARKER_END = t.CURSOR_MARKER_START = t.DATA_ATTR_TRACKED = t.NBSP = void 0;
    var ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        oe = function() {
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
    t.unwrapElement = a, t.replaceParagraphEntities = i, t.isQuoteEl = n, t.paragraphElProperties = o, t.deb = s, t.isParagraphEl = l, t.getCorrectedRange = c, t.selectEl = d, t.focusEl = u, t.isBR = p, t.getCaretCharacterOffsetWithin = h, t.prepareLineText = _, t.getElementIndex = g, t.isObjectParagraphEl = f, t.isObjectParagraph = v, t.isHeaderParagraph = m, t.isListParagraph = y, t.buildParagraph = b, t.convertBRsToArray = w, t.getRange = E, t.prepareSpacesWithSpaces = C, t.cleanTextSpaces = P, t.getLineEl = T, t.mergeRanges = x, t.isWhiteSpaceChar = S, t.isCyrillicChar = O, t.isLatinChar = k, t.isAlienParagraphEl = j, t.getFocusedElement = I, t.isTrackedParagraphEl = L, t.getPhotoSize = A, t.childNodeIndex = N, t.getAbsoluteCursorPosition = M, t.generateLatinizedName = D, t.dataURItoBlob = B, t.imageToBlob = R, t.queuePhotoProcess = z, t.cleanWhiteSpaces = W, t.justCursorInString = K, t.isParagraphEmpty = $, t.arrayUnique = Q, t.decorationsSlice = q, t.cleanLineBRs = V, t.cleanBRs = X, t.createParagraphEl = Y, t.traverseTree = G, t.throttle = J, t.isPublishNameCorrect = Z, t.correctRealIndexes = te, t.isVKUrl = re, t.decodeURL = ae, t.hasBlockElements = ie;
    var le = r(14),
        ce = t.NBSP = "&nbsp;",
        de = t.DATA_ATTR_TRACKED = "data-t",
        ue = t.CURSOR_MARKER_START = "​",
        pe = t.CURSOR_MARKER_END = "‌",
        he = t.ArticleEditorParagraphClass = "_article_p",
        _e = /[\u0400-\u04FF]/,
        ge = {
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
        ve = 0,
        me = 2,
        ye = "div p footer form h1 h2 h3 h4 h5 h6 header hgroup hr main nav output pre section table tfoot address article aside blockquote canvas dd dl dt fieldset figcaption figure",
        be = t.BlockElements = ye.toUpperCase().split(" ")
}, function(e, t, r) {
    "use strict";

    function a(e, t, r) {
        var a = [];
        return e.forEach(function(e, i) {
            if (!r || (0, o.isObjectParagraph)(e) || !(0, o.isParagraphEmpty)(e) || 0 == i || e.type == n.ParagraphType.Code) {
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
    var n = r(14),
        o = r(4)
}, , function(e, t, r) {
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
    var s = r(10),
        l = a(s),
        c = r(14),
        d = r(18),
        u = a(d),
        p = function(e) {
            function t(r, a) {
                return i(this, t), n(this, e.call(this, r, a, !0))
            }
            return o(t, e), t.prototype.render = function() {
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var e = u["default"].get(this.getMediaId());
                if (e && (e.editable || e.thumb)) {
                    var t = this.getEditor().getWidth(!0),
                        r = Math.floor(t * (9 / 16)),
                        a = void 0;
                    if (e.thumb) a = e.thumb;
                    else {
                        var i = (0, c.getAppropriateImage)(e.editable.sizes, this.getEditor().getWidth(!0));
                        a = i[0]
                    }
                    setStyle(this._el, {
                        width: t,
                        height: r,
                        backgroundImage: "url(" + a + ")"
                    }), this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: e.duration || 0,
                        platform: e.platform || ""
                    }))), this._el.appendChild(se('<div class="article_ed__video_play_note" contenteditable="false">' + getLang("pages_articles_editor_video_play_note") + "</div>"))
                }
                return this._el
            }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
        }(l["default"]);
    t["default"] = p
}, function(e, t, r) {
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
        return te++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
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
        s = r(20),
        l = a(s),
        c = r(7),
        d = a(c),
        u = r(16),
        p = a(u),
        h = r(13),
        _ = r(4),
        g = r(14),
        f = r(5),
        v = r(12),
        m = r(1),
        y = a(m),
        b = r(18),
        w = a(b),
        E = r(19),
        C = r(22),
        P = window,
        T = P.cur,
        x = P.browser,
        S = P.each,
        O = P.addClass,
        k = P.geByTag1,
        j = P.geByClass1,
        I = P.extractUrls,
        L = P.removeClass,
        A = P.domClosestByTag,
        N = P.hasClass,
        M = P.domData,
        D = P.getSize,
        B = P.getXY,
        R = P.re,
        H = P.se,
        U = P.domInsertBefore,
        F = P.traverseParent,
        z = P.extend,
        W = P.toggleClass,
        K = P.trim,
        $ = P.domInsertAfter,
        Q = P.gpeByClass,
        q = P.clean,
        V = P.domReplaceEl,
        X = {
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
            Delete: 46,
            Tab: 9
        },
        Y = [{
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
        G = Y.slice().reverse(),
        J = {};
    S(Y, function(e, t) {
        J[t.tag] = t
    });
    var Z = {};
    S(Y, function(e, t) {
        Z[t.type] = t
    });
    var ee = 50,
        te = 1,
        re = function() {
            function e(t, r, a) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                i(this, e), this._id = n(), T.lang = T.lang || {}, z(T.lang, o.lang), this._els = {
                    editor: ge(t),
                    canvas: H('<div class="article_editor_canvas article_edit article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = H('<div class="article_photo_upload"></div>')), O(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._objects = {}, this._options = o, (0, v.initLimits)(o.limits);
                var s = a || [];
                s && 0 != s.length || (s = [(0, _.buildParagraph)({
                    type: this._options.noTitle ? g.ParagraphType.Text : g.ParagraphType.Header1
                })]), s = s.filter(function(e) {
                    return e !== !1
                }), s.forEach(function(e) {
                    e.lines.forEach(function(e) {
                        e.text = (0, _.replaceParagraphEntities)(e.text), e.brs && isObject(e.brs) && (e.brs = (0, _.convertBRsToArray)(e.brs))
                    })
                }), o.needIndexCorrection && (0, _.correctRealIndexes)(s, 1), this.initParagraphs(s), this._updateTextPlaceholders(), this._restoreLastCursor(), this.saveDraft(!1, !0), o.coverPhoto && this.setCoverPhoto(o.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this._publishNameCandidate = o.name || this._getName()
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
                    if (!e && t.type == g.ParagraphType.ObjectPhoto) {
                        var r = t._object.getMediaId(0);
                        e = {
                            id: r,
                            data: w["default"].get(r)
                        }
                    }
                }), e
            }, e.prototype.getPublishName = function() {
                return this._publishName || this._publishNameCandidate || this._getName()
            }, e.prototype.setPublishName = function(e) {
                this._publishName = e, this._options.isPublished || this.saveDraft(!0)
            }, e.prototype._updateTextPlaceholders = function() {
                if (!this._options.noTitle) {
                    this._els.placeholders || (this._els.placeholders = H('<div class="article_ed__text_placeholders"></div>'), this._els.placeholderTitle = H("<h1>" + this.getOptions().placeholderTitle + "</h1>"), this._els.placeholderFirstParagraph = H("<p>" + this.getOptions().placeholderParagraph + "</p>"), this._els.placeholders.appendChild(this._els.placeholderTitle), this._els.placeholders.appendChild(this._els.placeholderFirstParagraph), this._els.editor.appendChild(this._els.placeholders));
                    var e = (0, _.isParagraphEmpty)(this._ps[0]);
                    e ? L(this._els.placeholderTitle, "article_ed__text_placeholder_hidden") : O(this._els.placeholderTitle, "article_ed__text_placeholder_hidden");
                    var t = this._ps[1],
                        r = this._getCurrentParagraphIndex(),
                        a = o(r, 1),
                        i = a[0],
                        n = (0, _.isParagraphEmpty)(t) && (t ? t.type != g.ParagraphType.Code : !0);
                    n && 2 > i && this._ps.length <= 3 ? L(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden") : O(this._els.placeholderFirstParagraph, "article_ed__text_placeholder_hidden")
                }
            }, e.prototype.destroy = function() {
                this._els.editor.innerHTML = "", L(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events.forEach(function(e) {
                    e.el.removeEventListener(e.event, e.handler)
                }), delete T.docsCurFilter
            }, e.prototype.getLimits = function() {
                return this._options.limits
            }, e.prototype.getOptions = function() {
                return this._options
            }, e.prototype.getWidth = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                return D(this._els.canvas)[0] + (e ? 2 * this._options.figureSideMargin : 0)
            }, e.prototype.getPhotoUploadOptions = function() {
                return this._options.photoUploadOptions
            }, e.prototype.getPhotoUploadEl = function() {
                return this._photoUploadEl
            }, e.prototype.removeObject = function(e) {
                var t = this;
                S(this._ps, function(r, a) {
                    if (a._object == e) {
                        var i = t._getParagraphElByIndex(r + 1);
                        return (0, _.focusEl)(i), R(t._getParagraphElByIndex(r)), t._setAllParagraphsDirty(), t._triggerInputEvent(), !1
                    }
                })
            }, e.prototype._parseUrlParagraph = function(e) {
                var t = this,
                    r = this._getParagraph(e);
                if (r && r.type == g.ParagraphType.Text && r.lines.length && r.lines[0].text) {
                    var a = I(r.lines[0].text, !0),
                        i = a && a.length ? a[0].url : "";
                    if (i && r.lines[0].text == i) {
                        var n = this._getCurrentParagraphIndex(),
                            s = o(n, 1),
                            l = s[0];
                        R(this._els.shareParseForm), R(this._els.shareIFrame), this._els.shareIFrame = this._els.editor.appendChild(H('<iframe class="editor__share_parse_iframe" name="editor__share_parse_iframe"></iframe>')), this._els.shareParseForm = this._els.editor.appendChild(ce("form", {
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
                                    a = {},
                                    i = e[2];
                                switch (e[0]) {
                                    case "doc":
                                        "gif" == i.ext && (r = g.ParagraphType.ObjectGIF, a = {
                                            size: i.video_preview_size,
                                            video: i.video_preview,
                                            href: i.href
                                        });
                                        break;
                                    case "photo":
                                        r = g.ParagraphType.ObjectPhoto, a = {
                                            sizes: i.editable.sizes
                                        };
                                        break;
                                    case "video":
                                        r = g.ParagraphType.ObjectVideo, a = {
                                            fromExtPage: intval(i.from_ext_page),
                                            editable: i.editable,
                                            duration: i.editable.duration,
                                            platform: i.editable.platform
                                        }
                                }
                                if (r) {
                                    var n = {
                                        mediaId: e[1],
                                        type: r
                                    };
                                    w["default"].add(n.mediaId, a), t._linkTooltip && t._linkTooltip.hide(), n = (0, _.buildParagraph)(n), t._getOrCreateParagraphObject(n), t._ps[l] = n;
                                    var o = t._getCursor();
                                    t._redrawModel(), t._restoreCursor(o), t._saveUndoState(o), setTimeout(function() {
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
                            $(c, this._getParagraphElByIndex(p)), e.preventDefault(), this._setAllParagraphsDirty(), this._triggerInputEvent()
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
                                var r = I(e, !0);
                                if (1 === r.length) {
                                    var i = r[0].url,
                                        n = t._getParagraphElByIndex(a);
                                    (0, _.traverseTree)(n, function(e) {
                                        if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(i) >= 0) {
                                            var r = F(e, function(e) {
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
                                    n = i[0];
                                n = n || 0;
                                var s = (0, _.buildParagraph)({
                                    type: g.ParagraphType.ObjectPhoto
                                });
                                t._getOrCreateParagraphObject(s).setBLOB(e);
                                var l = void 0;
                                (0, _.isParagraphEmpty)(t._ps[n]) ? (l = n, t._ps[l] = s) : (l = n + 1, t._insertParagraphAt(l, s)), t._redraw(!0);
                                var c = new Image;
                                c.onload = function() {
                                    t._focusParagraph(l + 1), t._showObjectPicker()
                                }, c.src = r.result
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
                    var u = (0, _.isObjectParagraph)(this._ps[d]) ? this._ps[d]._object.getCaptionEl() : this._getParagraphElByIndex(d);
                    if (void 0 === l) {
                        var p = (0, _.getCaretCharacterOffsetWithin)(u),
                            h = o(p, 2);
                        l = h[0], c = h[1]
                    }
                    var f = this._ps[d];
                    f.lines.forEach(function(e) {
                        var t = e.decorations;
                        Y.forEach(function(r) {
                            var a = t[r.type];
                            a && !(0, E.isEmpty)(a) && a.forEach(function(t) {
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
                for (var v = r; a >= v && v < this._ps.length; v++)(0, _.isObjectParagraph)(this._ps[v]) && (i.captionFocused = i.captionFocused || this._ps[v]._object.isCaptionFocused(), i.object = !0), this._ps[v].type == g.ParagraphType.Header1 && (i.header1 = !0), this._ps[v].type != g.ParagraphType.Header2 && (i.header2 = !1), this._ps[v].type != g.ParagraphType.Header3 && (i.header3 = !1), (0, E.inArray)(this._ps[v].type, [g.ParagraphType.Header1, g.ParagraphType.Header2, g.ParagraphType.Header3]) ? i.header = !0 : i.justHeaders = !1, (0, E.inArray)(this._ps[v].type, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) || (i.quote = !1), (0, E.inArray)(this._ps[v].type, [g.ParagraphType.BulletList, g.ParagraphType.NumericList]) && (i.list = !0);
                var m = (0, _.getRange)(),
                    y = o(m, 1),
                    b = y[0];
                return b && b.startContainer && N(b.startContainer, "article_ed__noconteditable") ? !1 : (i.multiline = r != a, i)
            }, e.prototype._hideFormatTooltip = function() {
                this._formatTooltip && this._formatTooltip.hide()
            }, e.prototype._showFormatTooltip = function() {
                clearTimeout(this._doShowFormatTooltipTO);
                try {
                    var e = window.getSelection(),
                        t = e.focusNode && (N(e.focusNode, "article_set_link") || "input" == e.focusNode.nodeName.toLowerCase());
                    if (t) return;
                    var r = !e.isCollapsed;
                    this._doShowFormatTooltipTO = setTimeout(this._doShowFormatTooltip.bind(this, r), 1)
                } catch (a) {}
            }, e.prototype._doShowFormatTooltip = function(e) {
                var t = this;
                if (!this._formatTooltip) {
                    var r = H('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="' + getLang("pages_articles_enter_link") + '"/><div class="article_set_link_delete"></div></div>\n        </div>'),
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
                            var n = j("article_format_btns", r);
                            n.innerHTML = "", a.forEach(function(e, t) {
                                t > 0 && (0, E.inArray)(e[0], ["header1"]) && n.appendChild(H('<div class="article_format_divider"></div>'));
                                var r = e[2] ? "article_format_btn_active" : "";
                                n.appendChild(H('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                            }), t.setLinkMode(!1)
                        },
                        getTargetBoundingBox: function() {
                            if (t._formatTooltip.linkMode) return a;
                            var e = (0, _.getRange)(),
                                r = o(e, 3),
                                i = r[0],
                                n = r[2];
                            if (!n || !n.rangeCount) return a;
                            var s = i.getBoundingClientRect();
                            if (!s.left) {
                                var l = i.startContainer.nodeType == Node.ELEMENT_NODE ? i.startContainer : domPN(i.startContainer),
                                    c = B(l),
                                    d = D(l);
                                return a = {
                                    top: c[1] + scrollGetY(),
                                    left: c[0] + d[0] / 2,
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
                    var i = k("input", r);
                    i.addEventListener("keypress", function(e) {
                        return e.keyCode == X.Enter ? (t._setLinkToSelectedText(i.value.trim()), t._formatTooltip.hide(), cancelEvent(e)) : void 0
                    });
                    var n = j("article_set_link_delete", r);
                    n.addEventListener("click", function(e) {
                        return t._setLinkToSelectedText(), cancelEvent(e)
                    })
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }, e.prototype._setLinkToSelectedText = function(e) {
                if (e) {
                    if (e = e.substr(0, 1500), e = e.replace(/%E2%80%AE/i, "").replace("&#8238;", "").replace(/&#x202E;/i, ""), !e.match("^https?://")) {
                        var t = (0, _.isVKUrl)(e) ? "https" : "http";
                        e = t + "://" + e
                    }
                    e = encodeURIComponent(e)
                }
                this.setLinkMode(!1, !1), this._restoreCursor(this._linkSelectedCursor), this._setAllParagraphsDirty(), e && document.execCommand("createLink", !1, e), (x.msie || !e) && this._triggerInputEvent(), e ? this._restoreCursor(this._linkSelectedCursor) : this._restoreCursor(this._linkCursor), this._linkCursor
            }, e.prototype.clearLink = function() {
                this.setLinkMode(!1);
                var e = (0, _.getRange)(),
                    t = o(e, 3),
                    r = t[0],
                    a = t[2],
                    i = A("a", r.startContainer),
                    n = A("a", r.endContainer) || i;
                i && (this._saveCursorMarker(), a.setBaseAndExtent(i, 0, n, Math.max(1, n.children.length))), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }, e.prototype.setLinkMode = function(e, t) {
                var r = void 0;
                e && (r = this._getCursor(), x.msie || document.execCommand("superscript", !1, !0));
                var a = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var i = k("input", a);
                        i.value = "", O(a, "article_editor_format_tt_set_link"), this._linkCursor = r, this._linkSelectedCursor = this._getCursor(), i.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(a, {
                        width: null
                    }), L(a, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._saveCursorMarker(), this._setAllParagraphsDirty(), this._triggerInputEvent())
            }, e.prototype.setHeader1 = function(e) {
                this._setHeader(g.ParagraphType.Header2, !e)
            }, e.prototype.setHeader2 = function(e) {
                this._setHeader(g.ParagraphType.Header3, !e)
            }, e.prototype.setQuote = function() {
                function e(e) {
                    return !(0, _.isObjectParagraph)(e) && !(0, _.isListParagraph)(e)
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
                        e(d) && (this._ps[c] = (0, _.buildParagraph)({
                            type: s,
                            lines: [d.lines[0]]
                        }), this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                }
            }, e.prototype._setHeader = function(e, t) {
                function r(e) {
                    return !(0, _.isObjectParagraph)(e) && !(0, _.isListParagraph)(e)
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
                this._setAllParagraphsDirty(), document.execCommand("bold"), x.msie && this._triggerInputEvent()
            }, e.prototype.setEm = function() {
                this._setAllParagraphsDirty(), document.execCommand("italic"), x.msie && this._triggerInputEvent()
            }, e.prototype.setStrike = function() {
                this._setCurrentParagraphDirty(), document.execCommand("strikeThrough"), x.msie && this._triggerInputEvent()
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
                    }), this._undos.length > ee && this._undos.shift()
                }
                var r = !0;
                this._undoStateDelayed = (0, f.getCleanedState)(this._ps, r)
            }, e.prototype._undo = function() {
                if (this._undos.length) {
                    var e = this._undos.pop();
                    this._ps = (0, f.expandParagraphFields)(e.ps), this._redraw(!0), this._restoreCursor(e.cursor), this._updateTextPlaceholders(), delete this._undoStateDelayed, this._saveUndoState()
                }
            }, e.prototype.initParagraphs = function(e) {
                e.forEach(function(e) {
                    if (e._preparedData) {
                        var t = e.mediaId.split(",");
                        t.forEach(function(t, r) {
                            w["default"].add(t, e._preparedData[r])
                        }), delete e._preparedData
                    }
                }), this._ps = (0, f.expandParagraphFields)(e), this._cleanParagraphsBRs(), this._ensureDummyParagraphs(), this._init()
            }, e.prototype._getParagraphFromHTML = function(e, t) {
                function r(t, a) {
                    if (t.nodeType == Node.TEXT_NODE) {
                        var i = t.data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        a.text += "pre" == e ? i : (0, _.cleanTextSpaces)(i)
                    } else "BR" == t.nodeName && a.text.length > 0 && a.brs.push(a.text.length);
                    S(t.childNodes, function(e, t) {
                        var i = [a.text.length];
                        r(t, a), i.push(a.text.length);
                        var n = (t.tagName || "").toLowerCase();
                        t.style && ("bold" == t.style.fontWeight || parseInt(t.style.fontWeight) > 400) && (n = "strong");
                        var o = void 0;
                        switch (n) {
                            case "b":
                            case "strong":
                                o = Z.strong;
                                break;
                            case "em":
                            case "i":
                                o = Z.em;
                                break;
                            case "s":
                            case "strike":
                            case "del":
                                o = Z.strike;
                                break;
                            case "a":
                                o = Z.link, i.push((0, _.decodeURL)(t.getAttribute("href") || ""));
                                break;
                            case "code":
                                o = Z.code;
                                break;
                            case "font":
                                var s = t.getAttribute("face");
                                "monospace" === s ? o = Z.code : "times" === s && (o = Z.code)
                        }
                        o && (a.decorations[o.type] = a.decorations[o.type] || [], i[0] < i[1] && a.decorations[o.type].push(i), a.decorations[o.type] = (0, _.mergeRanges)(a.decorations[o.type]))
                    })
                }
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    i = document.createElement("div");
                i.innerHTML = t;
                var n = "ol" == e || "ul" == e,
                    o = [],
                    s = void 0,
                    l = {};
                if (n) {
                    switch (e) {
                        case "ol":
                            s = g.ParagraphType.NumericList;
                            break;
                        case "ul":
                            s = g.ParagraphType.BulletList
                    }
                    for (var c = 0, d = i.children.length; d > c; c++) {
                        var u = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        r(i.children[c], u), u.brs = (0, _.cleanBRs)(u.brs), o.push(u)
                    }
                } else {
                    switch (e) {
                        case "h1":
                            s = g.ParagraphType.Header1;
                            break;
                        case "h2":
                        case "header":
                            s = g.ParagraphType.Header2;
                            break;
                        case "h3":
                        case "h4":
                            s = g.ParagraphType.Header3;
                            break;
                        case "blockquote":
                            s = g.ParagraphType.Quote;
                            break;
                        case "cite":
                            s = g.ParagraphType.Quote2;
                            break;
                        case "pre":
                            s = g.ParagraphType.Code;
                            break;
                        default:
                            s = g.ParagraphType.Text
                    }
                    var p = i.firstElementChild;
                    if ((0, _.isObjectParagraphEl)(p)) {
                        var h = M(p, "type"),
                            f = M(p, "media-id");
                        h && f && (i = k("figure", p), s = h, l.mediaId = f)
                    }
                    var v = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    r(i, v), v.brs = (0, _.cleanBRs)(v.brs, v.text.length), o.push(v), s == g.ParagraphType.Code && delete v.decorations.code, !a && s == g.ParagraphType.Text && "```" == v.text && 0 == v.brs.length && this.getOptions().codeFormatEnabled && (v.text = "", s = g.ParagraphType.Code), (0, _.isHeaderParagraph)(s) || (0 == v.text.indexOf("1. ") ? (s = g.ParagraphType.NumericList, this._removeParagraphLineTextPart(v, 0, "1. ".length)) : 0 == v.text.indexOf("* ") && (s = g.ParagraphType.BulletList, this._removeParagraphLineTextPart(v, 0, "* ".length))), v.brs = v.brs.filter(function(e) {
                        return e > 0
                    })
                }
                return l.lines = o, l.type = s, (0, _.buildParagraph)(l)
            }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
                e.text = e.text.substring(0, t) + e.text.substring(r);
                for (var a = r - t, i = 0, n = e.brs.length; n > i; i++) {
                    var o = e.brs[i];
                    o > t && r > o ? e.brs[i] = void 0 : e.brs[i] > t && e.brs[i] >= r && (e.brs[i] -= a)
                }
                e.brs = e.brs.filter(function(e) {
                    return void 0 !== e
                }), S(e.decorations, function(i, n) {
                    n.forEach(function(e) {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= a) : (e[0] -= a, e[1] -= a))
                    }), e.decorations[i] = e.decorations[i].filter(function(e) {
                        return void 0 !== e[0]
                    })
                })
            }, e.prototype._renderObjectParagraph = function(e, t) {
                var r = this._getOrCreateParagraphObject(e),
                    a = r.el();
                return r.onRender && r.onRender(), r.setCaptionElHtml(t), M(a, "uuid", e._uuid), M(a, "type", e.type), M(a, "media-id", e._object.getMediaId()), O(a, "_article_p"), a
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
                    case g.ParagraphType.Code:
                        i = "pre";
                        break;
                    default:
                        a = "p"
                }
                return e.lines.forEach(function(a) {
                    function s(e, t) {
                        for (var r = []; e > 0;) {
                            var a = u[--e];
                            if (a)
                                for (var i in a.open)
                                    if (a.open.hasOwnProperty(i)) {
                                        if (i == t) return [];
                                        r.push(i)
                                    }
                        }
                        return r
                    }

                    function l(e) {
                        return e[2] || !0
                    }
                    var c = a.text,
                        d = a.decorations,
                        u = [];
                    S(Y, function(e, t) {
                        if (!(0, _.isHeaderParagraph)(o) && o != g.ParagraphType.Code || "code" != t.type) {
                            var r = d[t.type];
                            if (r)
                                for (var a = function(e, a) {
                                        var i = r[a],
                                            n = u[i[0]] = u[i[0]] || {
                                                open: {},
                                                close: {}
                                            };
                                        n.open[t.type] = l(i);
                                        var o = u[i[1]] = u[i[1]] || {
                                                open: {},
                                                close: {}
                                            },
                                            c = s(i[1], t.type);
                                        c.forEach(function(e) {
                                            o.close[e.type] = !0
                                        }), o.close[t.type] = !0, c.forEach(function(e) {
                                            o.open[e.type] = l(i)
                                        })
                                    }, i = 0, n = r.length; n > i; i++) a(n, i)
                        }
                    });
                    var p = 0,
                        h = [];
                    u.forEach(function(t, r) {
                        if (t) {
                            var i = !1,
                                n = t.close.link && 1 == Object.keys(t.close).length;
                            r > 0 && (i = (0, _.prepareLineText)(c, p, r, a.brs, e.type == g.ParagraphType.Code), n || h.push(i));
                            var o = 0;
                            n && (i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), i && i.endsWith("<br/>") && (o++, i = i.replace(/<br\/>$/, "")), i !== !1 && h.push(i)), S(G, function(e, r) {
                                var a = t.close[r.type];
                                void 0 !== a && h.push("</" + r.tag + ">")
                            }), h.push("<br/>".repeat(o)), S(Y, function(e, r) {
                                var a = t.open[r.type];
                                void 0 !== t.open[r.type] && (a === !0 ? h.push("<" + r.tag + ">") : h.push("<" + r.tag + ' href="' + q(a) + '">'))
                            }), p = r
                        }
                    }), h.push((0, _.prepareLineText)(c, p, void 0, a.brs, e.type == g.ParagraphType.Code)), i && (n = n ? " " + n : "", r += "<" + i + n + ">"), (0, E.inArray)(o, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) && (r += "<p>"), r += h.join("") || (t ? "" : "<br/>"), (0, E.inArray)(o, [g.ParagraphType.Quote, g.ParagraphType.Quote2]) && (r += "</p>"), i && (r += "</" + i + ">")
                }), [a, r]
            }, e.prototype._renderParagraph = function(e) {
                var t = (0, _.isObjectParagraph)(e),
                    r = this._renderParagraphLines(e, t),
                    a = o(r, 2),
                    i = a[0],
                    n = a[1],
                    s = void 0;
                return s = t ? this._renderObjectParagraph(e, n) : H(i ? "<" + i + ">" + n + "</" + i + ">" : n), O(s, "_article_paragraph"), O(s, "article_paragraph"), O(s, "_article_p"), s
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
                        r ? a.outerHTML != r.outerHTML && V(r, a) : t._els.canvas.appendChild(a)
                    }
                }), this._dirty = []
            }, e.prototype._getContainingParagraphEl = function(e) {
                for (; e && e.parentNode != this._els.canvas;) e = e.parentNode;
                var t = (0, _.getElementIndex)(e);
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
                        var s = this._isParagraphEl(n) || this._isParagraphEl(domPN(n)) && 0 == (0, _.childNodeIndex)(n);
                        if (s) {
                            var l = this._getContainingParagraphEl(n),
                                c = o(l, 1),
                                d = c[0];
                            n = (0, C.domPS)(d) || d
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
                    var t = (0, _.getRange)(),
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
                        e(n, s, _.CURSOR_MARKER_START), i || (u = this._getContainingParagraphEl(l)[1], u == d && l.textContent.includes(_.CURSOR_MARKER_START) && (c += 1), e(l, c, _.CURSOR_MARKER_END)), this._markerCursorSet = !0
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
                                        return -1 != n.innerHTML.search(/\s$/) && (n.innerHTML = n.innerHTML.trimRight() + _.NBSP, r && r[0] == t && (r[0] = n.lastChild), t = n.lastChild), n.innerHTML || (t = n, t.innerHTML = "<br/>", i = 0), [t, i]
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
                    for (i = 0; i < this._els.canvas.children.length && !(r = t(_.CURSOR_MARKER_START, this._els.canvas.children[i])); i++);
                    for (; i < this._els.canvas.children.length && !(a = t(_.CURSOR_MARKER_END, this._els.canvas.children[i], r)); i++);
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
                                    S(Y, function(t, a) {
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
                    s(_.CURSOR_MARKER_START), s(_.CURSOR_MARKER_END), this._markerCursorSet = !1
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
                for (var r = e; t >= r; r++)(0, E.inArray)(r, this._dirty) || this._dirty.push(r)
            }, e.prototype._expandDoubleBRs = function() {
                function e(e, t, r) {
                    var a = e.lines[0];
                    void 0 === r && (r = a.text.length);
                    var i = [];
                    return a.brs.forEach(function(e) {
                        r > e && e > t && i.push(e - t)
                    }), (0, _.buildParagraph)({
                        type: e.type,
                        lines: [{
                            text: a.text.substr(t, r - t),
                            decorations: (0, _.decorationsSlice)(a.decorations, t, r),
                            brs: i
                        }]
                    })
                }
                for (var t = !1, r = 0, a = this._ps.length; a > r; r++) {
                    var i = this._ps[r];
                    if (i.lines.length > 1) i.lines.forEach(_.cleanLineBRs);
                    else {
                        var n = i.lines[0].brs;
                        if (0 == n.length) continue;
                        for (var o = [], s = 0, l = 0, c = n.length; c > l; l++)
                            if (s != n[l] && l > 0 && n[l - 1] == n[l]) {
                                var d = e(i, s, n[l]);
                                (0, _.isParagraphEmpty)(d) || o.push(d), s = n[l]
                            }
                        o.push(e(i, s)), o.length > 1 && (Array.prototype.splice.apply(this._ps, [r, 1].concat(o)), r = r + o.length - 1, t = !0)
                    }
                }
                return t
            }, e.prototype._processAlienPhotos = function() {
                var e = this;
                if (!this._photoPasteUploadingProcess)
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                        if (!(0, _.isObjectParagraphEl)(r) || !this._isTrackedObjectEl(r))
                            for (var a = Array.prototype.slice.call(geByTag("img", r)), i = void 0, n = function() {
                                    if (!i.src || !domPN(r) || !isVisible(i)) return "continue";
                                    var t = F(i, function(t) {
                                            return t == e._els.canvas ? !0 : "FIGURE" == t.tagName
                                        }, 10),
                                        a = t && t != e._els.canvas ? k("figcaption", t) : !1,
                                        n = (0, _.buildParagraph)({
                                            type: g.ParagraphType.ObjectPhoto
                                        }),
                                        o = e._renderObjectParagraph(n, a ? a.innerHTML : "");
                                    (0, _.justCursorInString)(r.textContent) ? (V(r, o), R(i), $(H("<p>" + _.CURSOR_MARKER_START + "</p>"), o)) : ($(o, domPN(i)), R(a), R(i)), F(o, function(t) {
                                        return t == e._els.canvas ? !0 : void L(t, _.ArticleEditorParagraphClass)
                                    }), (0, _.queuePhotoProcess)(i.src, function(t, r, a) {
                                        if (t) R(o), e._forgetObject(n._uuid), a();
                                        else {
                                            var i = e._getOrCreateParagraphObject(n);
                                            i.setBLOB(r, a)
                                        }
                                    })
                                }; i = a.shift();) n()
            }, e.prototype._flattenAlienParagraphs = function() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, a = this._fromPasteEvent, i = this._pasteCurrentIndex, n = this._getCurrentParagraphIndex(), s = o(n, 1), l = s[0], c = -1, d = function() {
                            function t(e) {
                                if (e && e.nodeType != Node.TEXT_NODE && "BR" != e.tagName) {
                                    if (!(0, _.hasBlockElements)(e)) return void(e != n && (K(e.innerHTML) && U(e, r), o = !0));
                                    if (this._isTrackedObjectEl(e)) return void(e != n && (U(e, r), o = !0));
                                    for (var a = Array.prototype.slice.call(e.childNodes), i = void 0; i = a.shift();) t.call(this, i)
                                }
                            }
                            if (c++, a && !K(r.textContent) && c > i && l >= c) return R(r), "continue";
                            var n = r;
                            (0, _.isQuoteEl)(r) && !(0, _.isAlienParagraphEl)(r) && (n = r.firstChild);
                            var o = !1;
                            t.call(e, n, !0), o && R(r)
                        }; r = t.shift();) d();
                    this._setAllParagraphsDirty()
                }
            }, e.prototype._correctCaptionSelection = function() {
                var e = (0, _.getRange)(),
                    t = o(e, 3),
                    r = t[0],
                    a = t[1],
                    i = t[2];
                if (r && !a) {
                    var n = F(r.startContainer, function(e) {
                        return "FIGCAPTION" == e.tagName
                    }, 5);
                    if (n && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && (0, _.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                        var s = j("article_ed__figcaption_edit", n),
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
                    paragraphs: (0, f.getCleanedState)(this._ps)
                });
                return t ? void(this._lastSavedDraft = i) : this._lastSavedDraft != i || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), void(this._draftSaveTO = setTimeout(function() {
                    if (a._lastSavedDraft = i, 0 != a._ps.length) {
                        var e = (0, v.checkLimits)(a._ps);
                        return e ? void(a._options.onDraftNotSaved && a._options.onDraftNotSaved(e)) : void a.save(!1, function(e, t, r) {
                            a._initDraftSave = !0, a._options.onDraftSaved && a._options.onDraftSaved(e, t, r)
                        })
                    }
                }, r ? 0 : 1e3 * this._options.draftSaveDelay))) : void(!t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId()))
            }, e.prototype._getName = function() {
                if (this._publishName) return this._publishName;
                var e = (0, f.getCleanedState)(this._ps),
                    t = e.length ? e[0].lines[0].text : "";
                return (0, _.generateLatinizedName)(t, this._options.maxNameLength)
            }, e.prototype.getTitle = function() {
                var e = this._ps[0];
                return e ? e.lines[0].text : ""
            }, e.prototype.isLimitsExceeded = function() {
                return !!(0, v.checkLimits)(this._ps)
            }, e.prototype.save = function(e, t, r) {
                var a = this,
                    i = (0, f.getCleanedState)(this._ps, !1, !0);
                e && (0, _.correctRealIndexes)(i, -1);
                var n = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), y["default"].save(this.getArticleOwnerId(), this.getArticleId(), i, e, n, o ? o.id : "", this._getSaveDraftHash(), this._options.limits.maxSymbolsPerChunk, r, function(r, i, o, s, l) {
                    r || (i && (a._options.articleId = i), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(z({}, nav.objLoc, {
                        article_id: a.getArticleOwnerId() + "_" + a.getArticleId()
                    })), a._publishNameCandidate = n, e && (a._options.isPublished = !0), a._replaceVideos(l)), t && t(r, i, o, s)
                })
            }, e.prototype._replaceVideos = function(e) {
                var t = this,
                    r = !1;
                e.forEach(function(e) {
                    var a = o(e, 4),
                        i = a[0],
                        n = a[1],
                        s = a[2],
                        l = a[3];
                    t._ps.forEach(function(e, a) {
                        if (e.type == g.ParagraphType.ObjectVideo) {
                            var c = e.mediaId.split("_"),
                                d = o(c, 3),
                                u = d[0],
                                p = d[1],
                                h = d[2];
                            h || u != i || p != n || (e.mediaId = s + "_" + l, t._setParagraphDirty(a), r = !0)
                        }
                    })
                }), r && this._redrawModel()
            }, e.prototype.focus = function() {
                this._restoreLastCursor()
            }, e.prototype.focusLastParagraph = function() {
                (0, _.focusEl)(this._getParagraphElByIndex(this._ps.length - 1))
            }, e.prototype.getArticleId = function() {
                return this._options.articleId
            }, e.prototype.getArticleOwnerId = function() {
                return this._options.articleOwnerId
            }, e.prototype._getSaveDraftHash = function() {
                return this._options.saveDraftHash
            }, e.prototype._expandBlockquoteParagraphs = function(e) {
                for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                    if ((0, _.isQuoteEl)(r)) {
                        var a = r.tagName,
                            i = Array.prototype.slice.call(r.children),
                            n = i[0];
                        if (1 == i.length && n && n.tagName && (0, E.inArray)(n.tagName, ["H1", "H2", "H3"])) {
                            V(r, n);
                            continue
                        }
                        if (i.shift(), i.length)
                            for (var o = void 0; o = i.shift();) {
                                if (this._saveCursorMarker(), e) $(o, r);
                                else {
                                    var s = H("<" + a + "></" + a + ">");
                                    s.appendChild(o), $(s, r)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }, e.prototype._ensureDummyParagraphs = function() {
                if (this._els.canvas) {
                    var e = this._els.canvas.lastChild;
                    if (e) {
                        var t = K(e.innerHTML) && "<br>" != e.innerHTML && "&nbsp;" != e.innerHTML;
                        if (t || "H1" == e.tagName) {
                            var r = (0, _.buildParagraph)({});
                            this._els.canvas.appendChild(this._renderParagraph(r)), this._ps.push(r), this._updateTextPlaceholders()
                        }
                    }
                }
            }, e.prototype._ensureAtLeastOneParagraph = function() {
                0 == this._ps.length && (this._ps = [(0, _.buildParagraph)({
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
                (0, _.focusEl)(this._getParagraphElByIndex(e))
            }, e.prototype._init = function() {
                this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._saveUndoState()
            }, e.prototype._redrawModel = function() {
                this._saveCursorMarker(), this._redraw(!0), this._restoreCursor()
            }, e.prototype.closeAllCarouselEditors = function() {
                this._ps.forEach(function(e) {
                    e.type == g.ParagraphType.ObjectPhoto && e._object.cancelCarouselEditor && e._object.cancelCarouselEditor()
                })
            }, e.prototype.setMediaUploadMode = function(e) {
                this._isUploading = !!e, W(this._els.editor, "article_ed__uploading", this._isUploading)
            }, e.prototype.isMediaUploadMode = function() {
                return this._isUploading
            }, e.prototype.addObjectVideo = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = o(t, 1),
                    a = r[0];
                showBox("al_video.php", {
                    act: "a_choose_video_box",
                    to_id: this.getArticleOwnerId()
                }), T.chooseMedia = function(t, r, i, n, s) {
                    var l = (0, g.getAppropriateImage)(i.editable.sizes, e.getWidth()),
                        c = o(l, 1),
                        d = c[0],
                        u = (0, _.buildParagraph)({
                            type: g.ParagraphType.ObjectVideo,
                            mediaId: r
                        });
                    w["default"].add(r, {
                        editable: i.editable,
                        thumb: d,
                        duration: i.editable.duration,
                        platform: i.editable.platform
                    }), e._getOrCreateParagraphObject(u), 0 == n ? e._ps[a] = u : e._ps.splice(a + n, 0, u), e._redrawModel(), e._saveUndoState();
                    var p = e._getParagraphElByIndex(a);
                    (0, _.focusEl)(p), s || curBox().hide(), e.saveDraft()
                }
            }, e.prototype.addObjectDoc = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = o(t, 1),
                    a = r[0];
                T.docsCurFilter = "gif";
                var i = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif",
                    to_id: this.getArticleOwnerId()
                }, {
                    stat: ["docs.css"]
                });
                T.chooseMedia = function(t, r, n) {
                    i.hide();
                    var o = (0, _.buildParagraph)({
                        type: g.ParagraphType.ObjectGIF,
                        mediaId: r
                    });
                    w["default"].add(r, {
                        video: n.video_preview,
                        size: n.video_preview_size,
                        href: n.href
                    }), e._getOrCreateParagraphObject(o), e._insertParagraphAt(a, o), e._redrawModel(), e._saveUndoState(), e.saveDraft(), e._updateTextPlaceholders()
                }, T.showMediaProgress = function() {}
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
                    }),
                    n = void 0;
                T.onMediaUploadStarted = function() {
                    var t = (0, _.buildParagraph)({
                            type: g.ParagraphType.ObjectPhoto
                        }),
                        r = e._renderObjectParagraph(t, ""),
                        i = e._getParagraphElByIndex(a);
                    U(r, i), (0, _.focusEl)(i), n = r, e.setMediaUploadMode(!0)
                }, T.onMediaUploadFail = function() {
                    delete T.onMediaUploadStarted, n && R(n), e.setMediaUploadMode(!1)
                }, T.chooseMedia = function(t, r, o, s) {
                    delete T.onMediaUploadStarted, n && R(n);
                    var l = (0, _.buildParagraph)({
                        type: g.ParagraphType.ObjectPhoto,
                        mediaId: r
                    });
                    w["default"].add(r, {
                        size: (0, _.getPhotoSize)(o.editable.sizes),
                        sizes: o.editable.sizes
                    }), e._getOrCreateParagraphObject(l);
                    var c = e._renderObjectParagraph(l, ""),
                        d = e._getParagraphElByIndex(a + intval(s));
                    U(c, d), (0, _.focusEl)(d), e._setAllParagraphsDirty(), e._triggerInputEvent(), e._saveUndoState(), e.saveDraft(), void 0 === s && i.hide(), e.setMediaUploadMode(!1)
                }, T.showMediaProgress = function() {}
            }, e.prototype.onObjectStateLoaded = function() {
                this.saveDraft(), this._showObjectPicker()
            }, e.prototype._hideObjectPicker = function() {
                this._objectPickerTooltip && this._objectPickerTooltip.hide()
            }, e.prototype._showObjectPicker = function() {
                if (!this._objectPickerEl) {
                    this._objectPickerEl = H('<div class="article_editor_object_picker"><div class="article_editor_object_picker_icon"></div></div>'), this._els.editor.appendChild(this._objectPickerEl);
                    var e = H('<div class="article_editor_object_picker_btns_wrap clear_fix">\n        <button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_photo" onclick="cur.articleEditor.addObjectPhoto()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_video" onclick="cur.articleEditor.addObjectVideo()">\n        </button><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_doc" onclick="cur.articleEditor.addObjectDoc()">\n        </button><!--div class="article_editor_object_picker_divider">\n        </div><button class="article_editor_object_picker_btn" id="article_editor_object_picker_btn_break"></button-->\n      </div>');
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
                if (!this.isMediaUploadMode() && a !== !1 && a == i && (0, _.isParagraphEmpty)(this._ps[a]) && this._ps[a] && (0, E.inArray)(this._ps[a].type, [g.ParagraphType.Text, g.ParagraphType.Header2, g.ParagraphType.Header3])) {
                    show(this._objectPickerEl);
                    var n = this._getParagraphElByIndex(a),
                        s = B(this._els.editor),
                        l = B(n);
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
                            a = (0, _.decodeURL)(r.getAttribute("href").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")),
                            i = a + "";
                        (0, _.isVKUrl)(i) || (i = "/away.php?to=" + encodeURIComponent(i) + "&utf=1"), e._linkTooltip = new ElementTooltip(r, {
                            cls: "article_editor_link_show_tt",
                            appendTo: e._els.editor,
                            content: H('<a target="_blank" href="' + i + '" class="article_editor_link">' + a + "</a>")
                        })
                    }
                })
            }, e.prototype._isTrackedObjectEl = function(e) {
                var t = M(e, "uuid");
                return t ? !!this._getObject(t) : !1
            }, e.prototype._cloneObjectParagraphs = function() {
                for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                    if ((0, _.isObjectParagraphEl)(t)) {
                        var a = t.getAttribute("data-uuid"),
                            i = parseInt(t.getAttribute("data-type"));
                        if (r[a]) {
                            var o = this._getObject(a);
                            a = n(), this._getOrCreateParagraphObject({
                                type: i,
                                _uuid: a,
                                mediaId: o.getMediaId()
                            }), M(t, "uuid", a)
                        }
                        r[a] = !0
                    }
            }, e.prototype._correctCursorToBeWithinCanvas = function() {
                var e = (0, _.getRange)(),
                    t = o(e, 2),
                    r = t[0],
                    a = t[1];
                a && r.startContainer == this._els.canvas && this._focusParagraph(0)
            }, e.prototype._triggerInputEvent = function() {
                this._els.canvas.dispatchEvent(new Event("input"))
            }, e.prototype._getCursor = function() {
                function e(e, r, a) {
                    r.nodeType == Node.TEXT_NODE ? e.textOffset = a : e.nodeOffset = a, F(r, function(r) {
                        return r == t ? !0 : ((0, _.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), void e.path.push((0, _.childNodeIndex)(r)))
                    }, 10), e.path = e.path.slice().reverse()
                }
                var t = this._els.canvas,
                    r = (0, _.getRange)(),
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
                        if ((0, _.isQuoteEl)(t)) {
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
                        (0, _.isParagraphEl)(c) && 1 == c.childNodes.length && (s = c)
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
                } catch (f) {
                    debugLog(f)
                }
            }, e.prototype._saveLastCursor = function() {
                var e = this._getCursor(),
                    t = "article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0);
                e ? ls.set(t, JSON.stringify(e)) : ls.remove(t)
            }, e.prototype._restoreLastCursor = function() {
                var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + (this.getArticleId() || 0));
                e ? (e = JSON.parse(e), this._restoreCursor(e)) : (0, _.focusEl)(this._els.canvas.firstChild)
            }, e.prototype._toggleCodeBlocks = function() {
                for (var e = void 0, t = this._getCurrentParagraphIndex(), r = o(t, 2), a = r[0], i = r[1], n = a; i >= n; n++) void 0 === e && (e = this._ps[n].type != g.ParagraphType.Code), this._ps[n].type = e ? g.ParagraphType.Code : g.ParagraphType.Text;
                var s = this._getCursor();
                this._redraw(!0), this._restoreCursor(s)
            }, e.prototype._replaceAlienInlineTags = function() {
                function e(a) {
                    var i = a.tagName.toLowerCase();
                    if (r[i]) {
                        t || (this._saveCursorMarker(), t = !0);
                        var n = ce(r[i], {
                            innerHTML: a.innerHTML
                        });
                        V(a, n)
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
                    e.lines.forEach(_.cleanLineBRs)
                })
            }, e.prototype._initEvents = function() {
                var e = this;
                this._setEventListener(window, "scroll", function() {
                    var t = scrollGetY(),
                        r = window.innerHeight;
                    e._ps.forEach(function(a, i) {
                        if ((0, _.isObjectParagraph)(a)) {
                            var n = e._getParagraphElByIndex(i),
                                o = D(n),
                                s = B(n),
                                l = s[1] < t + r && s[1] + o[1] > t;
                            a._object.onViewport && a._object.onViewport(l)
                        }
                    })
                }), this._setEventListener(document, "selectionchange", function() {
                    var t = (0, _.getRange)(),
                        r = o(t, 2),
                        a = r[0],
                        n = r[1];
                    if (a) {
                        var s = F(a.commonAncestorContainer, function(t) {
                            return t == e._els.canvas
                        });
                        if (!s) return
                    }
                    var l = e._getCurrentParagraphIndex(),
                        c = o(l, 1),
                        d = c[0];
                    if (d === !1) return void e._showObjectPicker();
                    var u = a.startContainer;
                    if (x.msie && n && Q("article_ed__extra_controls", u) && "BUTTON" != u.tagName) {
                        var p = e._ps[d];
                        if ((0, _.isObjectParagraph)(p)) return void p._object.getCaptionEl().focus()
                    }
                    e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), e._ensureDummyParagraphs(), 0 == i && e._showFormatTooltip(), e._lastCursor = e._getCursor(), e._saveLastCursor()
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
                    var r = (0, _.getRange)(),
                        a = o(r, 2),
                        i = a[0],
                        n = a[1];
                    if (n) {
                        var s = e._getContainingParagraphEl(i.commonAncestorContainer),
                            l = o(s, 1),
                            c = l[0];
                        (0, _.isObjectParagraphEl)(c) && (t.clipboardData.setData("text/plain", "uuid:" + c.getAttribute("data-uuid")), t.preventDefault())
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
                    x.safari || e._els.canvas.normalize();
                    var i = void 0;
                    e._fromPasteEvent || t || e._markerCursorSet ? e._saveCursorMarker() : i = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), n && (e._cleanParagraphsBRs(), n = !1), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph();
                    var o = e._fromPasteEvent && e._expandDoubleBRs();
                    e._redraw(o), e._restoreCursor(i), e._correctCursorToBeWithinCanvas(), e._dirty = [], a ? e._saveUndoStateDelayed(e._lastCursor) : e._saveUndoState(e._lastCursor), r = a = !1, e._fromPasteEvent = !1, x.mozilla && e._showFormatTooltip(), e._updateTextPlaceholders(), e.saveDraft()
                });
                var s = !1,
                    l = !1,
                    c = 1,
                    d = void 0;
                this._els.canvas.addEventListener("keydown", function(i) {
                    var u = i.keyCode,
                        p = i.metaKey || i.ctrlKey,
                        f = (0, _.getRange)(),
                        v = o(f, 2),
                        m = v[0],
                        y = v[1],
                        b = e._getCurrentParagraphIndex(),
                        w = o(b, 2),
                        P = w[0],
                        T = w[1],
                        O = e._getParagraph(P);
                    if (i.keyCode == X.Tab && y && 0 == P) return (0, _.focusEl)(e._getParagraphElByIndex(1)), cancelEvent(i);
                    if (p && i.keyCode == X.KeyA && (0, _.isObjectParagraph)(O) && O._object.isCaptionFocused()) {
                        var k = O._object.getCaptionEl();
                        return (0, _.selectEl)(k), cancelEvent(i)
                    }
                    if (p) switch (i.keyCode) {
                        case X.KeyB:
                            return e._setCurrentParagraphDirty(), document.execCommand("Bold", !1, null), cancelEvent(i);
                        case X.KeyI:
                            return e._setCurrentParagraphDirty(), document.execCommand("Italic", !1, null), cancelEvent(i);
                        case X.KeyS:
                            return e.saveDraft(!1, !1, !0), cancelEvent(i);
                        case X.KeyZ:
                            return e._undo(), cancelEvent(i)
                    }
                    var j = e._ps[P].type,
                        I = !!((0, C.gpeByTag)("pre", m.startContainer) || (0, C.gpeByTag)("pre", m.endContainer) || m.startContainer.nodeType == Node.ELEMENT_NODE && "PRE" == m.startContainer.tagName);
                    if (u == X.KeyC && i.altKey) return void e._toggleCodeBlocks();
                    if (u == X.Apostrophe && !y && !I && e.getOptions().codeFormatEnabled && j == g.ParagraphType.Text) {
                        e._setCurrentParagraphDirty();
                        var L = (0, C.gpeByTag)("code", m.startContainer) || (0, C.gpeByTag)("code", m.endContainer);
                        if (L) {
                            e._saveCursorMarker();
                            var N = H("<span></span>");
                            N.innerHTML = L.innerHTML, V(L, N), e._triggerInputEvent()
                        } else document.execCommand("fontName", !1, "monospace"), x.msie && e._triggerInputEvent();
                        return cancelEvent(i)
                    }
                    if (u == X.Tab && I && j == g.ParagraphType.Code) return document.execCommand("insertText", !1, "  "), cancelEvent(i);
                    var M = !1;
                    if (u == X.Backspace) {
                        if (s) return s[0].textContent = s[1], e._restoreCursor(s[2]), s = !1, cancelEvent(i);
                        var D = !1;
                        if ((0, _.isObjectParagraph)(O))
                            if (O._object.isCaptionFocused()) D = 0 == m.startOffset && y;
                            else {
                                var B = e._getContainingParagraphEl(m.startContainer),
                                    R = o(B, 1),
                                    F = R[0];
                                D = F == O._object.el()
                            }
                        if (D) {
                            if (O._object.isCaptionFocused()) {
                                var z = e._getParagraphElByIndex(P),
                                    W = (0, _.createParagraphEl)();
                                return V(z, W), (0, _.focusEl)(W), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                            }
                            var K = e._getParagraphElByIndex(P),
                                Q = (0, _.createParagraphEl)();
                            return V(K, Q), (0, _.focusEl)(Q), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                        }
                        if (m && 0 == m.startOffset && m.collapsed) {
                            var q = (0, C.gpeByTag)("li", m.startContainer),
                                Y = (0, _.getElementIndex)(q);
                            if (q) {
                                var G = e._ps[P],
                                    J = clone(G),
                                    Z = clone(G);
                                J.lines = J.lines.slice(0, Y);
                                var ee = (0, _.buildParagraph)({
                                    lines: [clone(G.lines[Y])]
                                });
                                Z.lines = Z.lines.slice(Y + 1), e._ps.splice(P, 1, J, ee, Z), e._redraw(!0);
                                var te = e._getParagraphElByIndex(P + 1);
                                return (0, _.focusEl)(te), e._saveUndoState(e._lastCursor), cancelEvent(i)
                            }
                        }
                        if (m && y && 0 == m.startOffset) {
                            var re = e._getCurrentParagraphIndex(),
                                ae = o(re, 1),
                                ie = ae[0],
                                ne = ie > 0 ? e._ps[ie - 1] : !1;
                            if ((0, _.isObjectParagraph)(ne)) {
                                (0, _.isParagraphEmpty)(e._ps[ie]) && (e._ps.splice(ie, 1), e._redraw(!0));
                                var oe = e._getParagraphElByIndex(ie - 1);
                                return (0, _.focusEl)(oe), cancelEvent(i)
                            }
                        }
                        e._setAllParagraphsDirty(), x.msie && setTimeout(function() {
                            e._triggerInputEvent()
                        })
                    }
                    if (u == X.Delete) {
                        var se = e._ps[P],
                            le = e._ps[P + 1],
                            ce = !1;
                        if ((0, _.isObjectParagraph)(se) && m && y && (ce = !se._object.isCaptionFocused() && m.startContainer == se._object.el(), ce = ce || se._object.isCaptionFocused() && se._object.isEmptyCaption()), ce) {
                            var de = e._getParagraphElByIndex(P),
                                ue = (0, _.createParagraphEl)();
                            return V(de, ue), (0, _.focusEl)(ue), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(i)
                        }
                        le && (0, _.isParagraphEmpty)(se) && (0, E.inArray)(le.type, [g.ParagraphType.Header2, g.ParagraphType.Header3]) && (se.type = le.type, e._setParagraphDirty(P), e._redraw()), e._setAllParagraphsDirty(), x.msie && 0 == m.startOffset && 0 == P && setTimeout(function() {
                            e._setCurrentParagraphDirty(), e._triggerInputEvent()
                        })
                    } else if (u == X.Enter) {
                        if (e._isWithinObjectParagraphEl((0, _.getFocusedElement)())) {
                            var pe = e._getContainingParagraphEl((0, _.getFocusedElement)()),
                                he = o(pe, 2),
                                _e = he[0],
                                ge = he[1],
                                fe = (0, _.createParagraphEl)();
                            return e._ps[ge]._object.isCaptionFocused() ? $(fe, _e) : U(fe, _e), e._setAllParagraphsDirty(), (0, _.focusEl)(fe), e._triggerInputEvent(), cancelEvent(i)
                        }
                        var ve = e._getContainingParagraphEl((0, _.getFocusedElement)()),
                            me = o(ve, 3),
                            ye = me[0],
                            be = me[1],
                            we = me[2],
                            Ee = (0, _.getCaretCharacterOffsetWithin)(ye),
                            Ce = o(Ee, 2),
                            Pe = Ce[1];
                        if (i.shiftKey || i.ctrlKey && x.safari) {
                            var Te = (0, _.getCaretCharacterOffsetWithin)(ye),
                                xe = o(Te, 2),
                                Se = xe[1],
                                Oe = A("li", m.startContainer),
                                ke = 0;
                            Oe && (ke = domChildIndex(Oe));
                            var je = !1;
                            if (S(we.lines, function(e, t) {
                                    var r = t.brs,
                                        a = t.text,
                                        i = a.length;
                                    return 0 == Se || i >= Se && (0, E.inArray)(Se, r) ? (je = !0, !1) : (Se -= i, 0 >= Se && e == ke ? !1 : void 0)
                                }), je) {
                                n = !0, e._setParagraphDirty(P, T), document.execCommand("insertParagraph");
                                var Ie = domNS(ye);
                                return Ie && ((0, _.focusEl)(Ie), Ie.focus()), e._triggerInputEvent(), cancelEvent(i)
                            }
                            x.msie && 0 == Se && m.insertNode(H("<br>"))
                        }
                        var Le = y && m.startContainer.nodeType == Node.TEXT_NODE && !m.startContainer.nextSibling && Pe == ye.textContent.length;
                        l = Le && !(0, _.isListParagraph)(e._ps[P]) && !i.shiftKey && (0, E.inArray)(we.type, [g.ParagraphType.Quote, g.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), l || i.shiftKey || e._parseUrlParagraph(be), e._setParagraphDirty(P, T)
                    } else i.key && 1 == i.key.length ? (e._setParagraphDirty(P), e._setParagraphDirty(T), i.metaKey || (M = !0, i.key && ((0, _.isCyrillicChar)(i.key) ? c += 1 : (0, _.isLatinChar)(i.key) && (c -= 1), c = Math.min(Math.max(c, -5), 5))), r = (0, _.isWhiteSpaceChar)(i.key), t && !r && (a = !0), t = M, setTimeout(function() {
                        function t(e, t, r, a, i) {
                            var n = this._getCursor(),
                                o = t.textContent.substring(0, e - r.length),
                                l = t.textContent.substring(e);
                            i || (s = [t, o + r + l, n]), t.textContent = o + a + l, this._restoreCursor(n), this._setParagraphDirty(P), this._triggerInputEvent()
                        }
                        var r = (0, _.getRange)(),
                            a = o(r, 2),
                            i = a[0],
                            n = a[1],
                            l = e._ps[P].type;
                        if (l != g.ParagraphType.Code) {
                            var u = !!((0, C.gpeByTag)("code", i.startContainer) || i.startContainer.nodeType == Node.ELEMENT_NODE && "CODE" == i.startContainer.tagName);
                            if (!u && (d = d || c > 0, n && i)) {
                                var p = i.startContainer;
                                if (p.nodeType == Node.TEXT_NODE && i.startOffset > 0)
                                    for (var f = p.textContent.substring(i.startOffset - 5, i.startOffset), v = 0, m = h.Sequences.length; m > v; v++) {
                                        var y = h.Sequences[v];
                                        if (void 0 === y.cyrillic || y.cyrillic === d)
                                            if (y.pattern instanceof RegExp) {
                                                var b = f.match(y.pattern);
                                                if (b) {
                                                    var w = y.substitution;
                                                    b.length > 1 && (w = w.replace("$1", b[1])), t.call(e, i.startOffset, p, b[0], w, y.noUndo);
                                                    break
                                                }
                                            } else if (f.endsWith(y.pattern)) {
                                            t.call(e, i.startOffset, p, y.pattern, y.substitution, y.noUndo);
                                            break
                                        }
                                    }
                            }
                        }
                    }, 0)) : t = !1;
                    s = !1
                })
            }, e.prototype._isParagraphEl = function(e) {
                return e && N(e, "_article_paragraph")
            }, e.prototype._isWithinObjectParagraphEl = function(e) {
                var t = this._getContainingParagraphEl(e),
                    r = o(t, 1),
                    a = r[0];
                return a && (0, _.isObjectParagraphEl)(a)
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
                        a = parseInt(e.type);
                    switch (a) {
                        case g.ParagraphType.ObjectPhoto:
                            t = new l["default"](r, this);
                            break;
                        case g.ParagraphType.ObjectVideo:
                            t = new d["default"](r, this);
                            break;
                        case g.ParagraphType.ObjectGIF:
                            t = new p["default"](r, this)
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
                if (t)
                    if (this._isWithinObjectParagraphEl(t)) {
                        var r = (0, _.paragraphElProperties)(t),
                            a = o(r, 2),
                            i = a[0],
                            n = a[1],
                            s = this._getObject(n);
                        if (!s) return;
                        var l = void 0;
                        l = s.getCaptionEl() ? this._getParagraphFromHTML("", s.getCaptionEl().innerHTML, !0) : (0, _.buildParagraph)(), l._uuid = n, l.type = i, l._object = s, this._ps[e] = l
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
                    t._isParagraphEl(r) && O(r, "article_ed__drag_drop")
                }), this._els.canvas.addEventListener("dragleave", this._dragLeaveEventsHandler = function(e) {
                    var r = e.target;
                    t._isParagraphEl(r) && L(r, "article_ed__drag_drop")
                }), this._els.canvas.addEventListener("dragover", this._dragLeaveEventsHandler = function(e) {
                    var r = e.target;
                    t._isParagraphEl(r) && (e.preventDefault(), e.dataTransfer.dropEffect = "move")
                }), this._els.canvas.addEventListener("drop", this._dragDropEventsHandler = function(e) {
                    var a = e.target;
                    t._isParagraphEl(a) && ($(r, a), L(a, "article_ed__drag_drop")), t.onDragEnd(), t._setAllParagraphsDirty(), t._triggerInputEvent(), setTimeout(function() {
                        var e = j("article_ed__figcaption_edit", r);
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
    t["default"] = re
}, function(e, t, r) {
    "use strict";

    function a(e, t) {
        w = t || {}, P = e, y = ge("article_view_" + e.owner_id + "_" + e.id), b = w.scrollNode || window, E = w.getScrollTop || function() {
            var e = document.scrollingElement || window.scrollNode || document.body;
            return e.scrollTop
        }, m = gpeByClass("article_body", y) || gpeByClass("_article_layer", y), s(), o(), _(), setTimeout(function() {
            b.click && b.click(), b.focus()
        }, 10), window.onBodyResize = window.onBodyResize || function() {}, window.cur && cur.destroy.push(function() {
            n()
        })
    }

    function i() {
        w.notFull = !1, o(), _(), l()
    }

    function n() {
        T && (b.removeEventListener("scroll", T), T = !1), x && (b.removeEventListener("scroll", x), x = !1), clearTimeout(S)
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
            r == f.ParagraphType.ObjectPhoto && (0, v.initPhotoCarousel)(t, w.mobile), w.isWebView || r != f.ParagraphType.ObjectPhoto || d(t)
        })
    }

    function s() {
        b.addEventListener("scroll", T = function() {
            l()
        }, {
            passive: !0
        }), l()
    }

    function l() {
        var e = {
                101: -2e3
            },
            t = E(),
            r = window.innerHeight,
            a = getXY(y)[1];
        each(geByTag("figure", y), function(i, n) {
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
            case f.ParagraphType.ObjectPhoto:
                if (e) {
                    var i = geByTag1("img", r),
                        n = domQuery1("[data-sizes]", r),
                        o = JSON.parse(domData(n, "sizes"));
                    o.forEach(function(e, t) {
                        if (!(t > 3)) {
                            var r = (0, f.getAppropriateImage)(o[t], getW(i) || w.width, !0),
                                a = g(r, 1),
                                n = a[0];
                            (0, f.preloadImage)(n, function() {
                                0 == t && (removeClass(i, "article_object_photo__image_blur"), i.src = n)
                            })
                        }
                    }), a = !0
                }
                break;
            case f.ParagraphType.ObjectGIF:
                if (!w.mobile) {
                    var s = geByTag1("video", r);
                    s ? e ? s.hasAttribute("autoplay") && s.play() : s.pause() : a = !0
                }
        }
        return a
    }

    function d(e) {
        if (!w.noImageOpen) {
            var t = geByTag1("img", e),
                r = domQuery1("[data-sizes]", e),
                a = JSON.parse(domData(r, "sizes")),
                i = (0, f.getAppropriateImage)(a[0], window.innerWidth, !0),
                n = g(i, 3),
                o = n[0],
                s = n[1],
                l = n[2],
                c = h({
                    width: s,
                    height: l
                }, {
                    width: window.innerWidth,
                    height: window.innerHeight
                }),
                d = getW(e) < c.width && getH(e) < c.height;
            if (o && d) {
                var _ = geByClass1("article_photo_carousel__controls", e) || t;
                addClass(_, "article_image_full_viewable");
                var v = data(e, "changePhotoFunction");
                _.addEventListener("click", function() {
                    var t = intval(domData(e, "photo-carousel-index"));
                    addClass(m, "article_no_scroll");
                    var r = geByTag1("figcaption", e),
                        i = se('<div class="article_full_view"><img class="article_full_view__image"></div>');
                    r && r.innerHTML && i.appendChild(se('<div class="article_full_view__caption"><div class="article_full_view__caption_inner">' + r.innerHTML + "</div></div>")), a.length > 1 && (toggleClass(j, "article_full_view__carousel", a.length > 1), O = se('<div class="article_full_view__right"></div>'), i.appendChild(O), k = se('<div class="article_full_view__left"></div>'), i.appendChild(k), O.addEventListener("click", function(e) {
                        return t = Math.min(a.length - 1, Math.max(0, t + 1)), u(n, a, t), v && v(1), cancelEvent(e)
                    }), k.addEventListener("click", function(e) {
                        return t = Math.min(a.length - 1, Math.max(0, t - 1)), u(n, a, t), v && v(-1), cancelEvent(e)
                    })), j = se('<div class="article_full_view__counter"><div class="article_full_view__counter_text"></div><div class="article_full_view__close"></div></div>'), i.appendChild(j), a.length > 1 && toggleClass(j, "article_full_view__carousel", a.length > 1), y.appendChild(i), i.addEventListener("click", function(e) {
                        domClosest("article_full_view__caption_inner", e.target) || p()
                    }), i.addEventListener("mousewheel", p), C = i;
                    var n = geByTag1("img", i);
                    u(n, a, t)
                })
            }
        }
    }

    function u(e, t, r) {
        if (toggleClass(k, "article_full_view__nav_hidden", 0 == r), toggleClass(O, "article_full_view__nav_hidden", r == t.length - 1), t.length > 1) {
            var a = geByClass1("article_full_view__counter_text", j);
            a.innerHTML = getLang("global_article_carousel_counter").replace("{counter}", r + 1).replace("{total}", t.length)
        }
        I = r;
        var i = (0, f.getAppropriateImage)(t[r], window.innerWidth, !0),
            n = g(i, 3),
            o = n[0],
            s = n[1],
            l = n[2],
            c = h({
                width: s,
                height: l
            }, {
                width: window.innerWidth,
                height: window.innerHeight
            }),
            d = !1,
            u = (0, f.preloadImage)(o, function() {
                if (I === r) {
                    d = !0, c.width && isNumeric(c.width) ? setStyle(e, {
                        width: c.width,
                        height: c.height
                    }) : setStyle(e, {
                        width: null,
                        height: null
                    }), e.src = o, removeClass(e, "article_full_view__image_blurred");
                    for (var a = r; a < Math.min(r + 3, t.length); a++) {
                        var i = (0, f.getAppropriateImage)(t[a], window.innerWidth, !0),
                            n = g(i, 1),
                            s = n[0];
                        (0, f.preloadImage)(s)
                    }
                }
            });
        if (u) removeClass(e, "article_full_view__image_blurred");
        else {
            var p = (0, f.getAppropriateImage)(t[r], 200, !0),
                _ = g(p, 1),
                v = _[0];
            (0, f.preloadImage)(v, function() {
                I === r && (d || (setStyle(e, {
                    width: c.width,
                    height: c.height
                }), e.src = v))
            }), addClass(e, "article_full_view__image_blurred")
        }
    }

    function p() {
        return C ? (re(C), m && removeClass(m, "article_no_scroll"), C = !1, !0) : !1
    }

    function h(e, t) {
        var r = e.width / e.height,
            a = t.width / t.height,
            i = {};
        return r > a ? (i.width = Math.min(t.width, e.width), i.height = e.height * (i.width / e.width)) : (i.height = Math.min(t.height, e.height), i.width = i.height * r), i
    }

    function _() {
        function e() {
            return Math.round((Date.now() - o) / 1e3)
        }

        function t(t) {
            if (!(s >= t) && (s = t, c.push(t), clearTimeout(l), l = setTimeout(r, 100), 3 == t && P.ttr)) {
                var a = P.ttr - e();
                a > 0 && (S = setTimeout(function() {
                    document.hidden || (s = 4, c = [s], r())
                }, 1e3 * a))
            }
        }

        function r() {
            c.length && (ajax.post(window.isMVK ? "article.php" : "al_articles.php", {
                act: "stats",
                scroll: c.join(","),
                spent: e(),
                hash: P.access_hash,
                article_owner_id: P.owner_id,
                article_id: P.id,
                is_web_view: w.isWebView ? 1 : 0,
                post_id: w.postId,
                ref: window.cur ? window.cur.module : ""
            }), c.forEach(function(e) {
                (0, f.mailruStatsPixel)("scroll_" + e, P.mailruStatsData)
            }), c = [])
        }
        if (!w.notFull) {
            var a = getH(y),
                i = getXY(y)[1] - scrollGetY(),
                n = window.innerHeight,
                o = Date.now(),
                s = -1,
                l = void 0,
                c = [];
            t(0), b.addEventListener("scroll", x = function() {
                var e = E();
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
    var g = function() {
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
    var f = r(14),
        v = r(17),
        m = void 0,
        y = void 0,
        b = void 0,
        w = void 0,
        E = void 0,
        C = void 0,
        P = void 0,
        T = void 0,
        x = void 0,
        S = void 0,
        O = void 0,
        k = void 0,
        j = void 0,
        I = void 0;
    ({
        php: new RegExp("\\b(array|as|break|case|class|const|continue|default|do|else|elseif|for|foreach|function|global|if|return|static|switch|while|try|catch|throw)\\b", "g"),
        js: new RegExp("\\b(break|case|class|const|continue|default|do|else|for|function|if|return|static|switch|while|try|catch|throw|let)\\b", "g")
    }), window.initArticle = a, window.deinitArticle = n, window.updateArticle = i, window.articleCloseImageFullSize = p
}, function(e, t, r) {
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
        n = r(4),
        o = (r(14), window.browser && (browser.mozilla || browser.safari)),
        s = void 0,
        l = function() {
            function e(t, r, i) {
                a(this, e), this._mediaId = t, this._editor = r, this._highlighted = !1, this._isCaptioned = !!i, s = this.getEditor().getOptions().multiMediasSeparator
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
                        if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this.isEmptyCaption()), t || (0, n.focusEl)(this._getCaptionEl());
                        else {
                            var l = this.isEmptyCaption();
                            this._toggleCaptionPlaceholder(l), this._toggleCaption(!l)
                        }
                }
            }, e.prototype.render = function() {}, e.prototype.el = function() {
                var e = this;
                if (!this._objectEl) {
                    var t = this.render();
                    addClass(t, "article_object_el");
                    var r = o ? "" : 'ondragstart="cur.articleEditor.onDragStart(event)"';
                    this._objectEl = se("<figure " + r + ' contenteditable="true"></figure>');
                    var a = se('<div class="article_ed__noconteditable" contenteditable="false"></div>');
                    this._objectEl.appendChild(a), a.appendChild(t);
                    var i = this.renderExtraControlsEl();
                    i && (i.setAttribute("contenteditable", "false"), addClass(i, "article_ed__extra_controls"), a.appendChild(i)), this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption">\n          <div class="article_ed__figcaption_edit" contenteditable="true"></div>\n          <div class="article_ed__caption_placeholder" contenteditable="false">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), o && t.addEventListener("click", function() {
                        e.highlight(!0), (0, n.focusEl)(t)
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
    t["default"] = l
}, function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var i = r(8),
        n = a(i),
        o = r(9);
    window.ArticleEditor = n["default"], window.ArticleView = {
        initArticle: o.initArticle
    }, stManager.done(jsc("web/article.js"))
}, function(e, t, r) {
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
    var n = r(4),
        o = void 0
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Sequences = [{
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
}, function(e, t) {
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

    function i(e, t, i) {
        var n = [];
        if (a(e, function(e, t) {
                i && -1 == ["w", "z", "y", "x", "m", "s"].indexOf(e) || n.push(t)
            }), !n.length) return [!1];
        n.sort(function(e, t) {
            return e[1] - t[1]
        }), t *= r() ? 2 : 1;
        var o = n[n.length - 1];
        return a(n, function(e, r) {
            return r[1] >= t ? (o = r, !1) : void 0
        }), o
    }

    function n(e, t) {
        if (s[e] === !0) return t && t(), !0;
        if (isArray(s[e])) return s[e].push(t), !1;
        s[e] = [t];
        var r = new Image;
        return r.onload = function() {
            var t = s[e];
            s[e] = !0, a(t, function(e, t) {
                t && t()
            })
        }, r.src = e, !1
    }

    function o(e, t) {
        if (isObject(t) && !isEmpty(t)) {
            var r = "https://vk-callback.go.mail.ru/longread_pxl?action=" + e;
            a(t, function(e, t) {
                r += "&" + e + "=" + t
            });
            var i = new Image;
            i.src = r
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getAppropriateImage = i, t.preloadImage = n, t.mailruStatsPixel = o;
    var s = (t.ParagraphType = {
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
    }, {})
}, , function(e, t, r) {
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
    var s = r(10),
        l = a(s),
        c = r(18),
        d = a(c),
        u = function(e) {
            function t(r, a) {
                return i(this, t), n(this, e.call(this, r, a, !0))
            }
            return o(t, e), t.prototype.render = function() {
                var e = this;
                this._el = se("\n      <div></div>\n    ");
                var t = d["default"].get(this.getMediaId());
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
        }(l["default"]);
    t["default"] = u
}, function(e, t, r) {
    "use strict";

    function a(e, t) {
        var r = domQuery1("[data-sizes]", e),
            a = JSON.parse(domData(r, "sizes"));
        if (!(a.length <= 1 || domData(e, "carousel-inited")))
            if (domData(e, "carousel-inited", 1), t) i(a, e);
            else {
                var o = n(a, e);
                data(e, "changePhotoFunction", o)
            }
    }

    function i(e, t) {
        var r = geByClass1("article_photo_carousel__controls", t),
            a = geByClass1("article_photo_carousel__counter", t),
            i = domData(a, "counter-lang") || getLang("global_article_carousel_counter"),
            n = getSize(geByClass1("article_figure_content", t)),
            l = domPN(geByTag1("img", t)),
            c = 0,
            d = void 0,
            u = 0,
            p = void 0,
            h = void 0,
            _ = 0,
            g = !1,
            f = !1,
            v = !1;
        r.addEventListener("touchstart", function(e) {
            h = e.touches[0].pageX, p = e.touches[0].pageY
        });
        var m = !1,
            y = void 0;
        r.addEventListener("touchmove", function(r) {
            if (!f && (Math.abs(r.touches[0].pageY - p) > 5 || g)) return void(g = !0);
            if (!v && (u = r.touches[0].pageX - h, !(Math.abs(u) < 10) || m)) {
                f || window.addEventListener("touchmove", y = function(e) {
                    return cancelEvent(e)
                }, {
                    passive: !1
                }), f = !0, m = !0;
                var a = Math.min(e.length - 1, Math.max(0, c + (0 > u ? 1 : -1))),
                    i = 0 === a && 0 === c,
                    b = a === e.length - 1 && c === e.length - 1;
                if (_ !== a)
                    if (_ = a, re(d), i || b) d = !1;
                    else {
                        var w = (0, s.getAppropriateImage)(e[a], n[0], !0),
                            E = o(w, 1),
                            C = E[0];
                        d = ce("div", {
                            innerHTML: '<img src="' + C + '">'
                        }), setStyle(domFC(d), {
                            "max-width": n[0],
                            "max-height": n[1],
                            width: "initial"
                        }), setStyle(d, {
                            transform: "scale(1.05)",
                            opacity: 0
                        }), domInsertBefore(d, domPN(geByTag1("img", t)))
                    }
                var P = Math.abs(u),
                    T = 0;
                T = i || b ? .2 * u : u, setStyle(l, {
                    transform: "translateX(" + T + "px)"
                }), d && setStyle(d, {
                    transform: "scale(" + Math.max(1, 1.05 - 5e-4 * P) + ")",
                    opacity: Math.min(1, .01 * P)
                })
            }
        }), r.addEventListener("touchend", function() {
            m = !1, g = !1, v = !0, f = !1, y && window.removeEventListener("touchmove", y);
            var t = 0 > u,
                r = Math.abs(u) < 50 || !d;
            if (!r) {
                c = _;
                for (var p = c; p < Math.min(c + 3, e.length); p++) {
                    var h = (0, s.getAppropriateImage)(e[p], n[0], !0),
                        b = o(h, 1),
                        w = b[0];
                    (0, s.preloadImage)(w)
                }
            }
            a.innerHTML = i.replace("{counter}", c + 1).replace("{total}", e.length), addClass(l, "with_transition"), addClass(d, "with_transition"), setTimeout(function() {
                r ? (setStyle(l, {
                    transform: "translateX(0px)",
                    opacity: 1
                }), setStyle(d, {
                    transform: "scale(1.05)",
                    opacity: 0
                })) : (setStyle(l, {
                    transform: "translateX(" + (t ? "-500px" : "500px") + ")"
                }), setStyle(d, {
                    transform: "scale(1)",
                    opacity: 1
                }))
            }), setTimeout(function() {
                v = !1, _ = !1, removeClass(l, "with_transition"), removeClass(d, "with_transition"), r ? re(d) : (re(l), l = d), d = !1
            }, 150)
        })
    }

    function n(e, t) {
        function r(r) {
            i += r, i = Math.min(e.length - 1, Math.max(0, i));
            var a = (0, s.getAppropriateImage)(e[i], d[0], !0),
                n = o(a, 1),
                _ = n[0],
                g = 0 > r ? "fading_in_left" : "fading_in_right",
                f = se('<div class="' + g + '"><img src="' + _ + '"></div>');
            setStyle(domFC(f), {
                "max-width": d[0],
                "max-height": d[1],
                width: "initial"
            }), domInsertAfter(f, domPN(geByTag1("img", t)));
            var v = u;
            setTimeout(function() {
                removeClass(f, "fading_in_left"), removeClass(f, "fading_in_right"), addClass(v, "fading_out")
            }), setTimeout(function() {
                re(v)
            }, 150);
            for (var m = i; m < Math.min(i + 3, e.length); m++) {
                var y = (0, s.getAppropriateImage)(e[m], d[0], !0),
                    b = o(y, 1),
                    w = b[0];
                (0, s.preloadImage)(w)
            }
            u = f, l.innerHTML = c.replace("{counter}", i + 1).replace("{total}", e.length), toggle(p, i > 0), toggle(h, i < e.length - 1), domData(t, "photo-carousel-index", i)
        }

        function a(e) {
            clearTimeout(_), toggleClass(n, "article_photo_carousel__mouse_idle", e)
        }
        var i = 0,
            n = geByClass1("article_photo_carousel__controls", t),
            l = geByClass1("article_photo_carousel__counter", t),
            c = domData(l, "counter-lang") || getLang("global_article_carousel_counter"),
            d = getSize(geByClass1("article_figure_content", t)),
            u = domPN(geByTag1("img", t)),
            p = geByClass1("article_photo_carousel__left", t),
            h = geByClass1("article_photo_carousel__right", t),
            _ = void 0,
            g = browser.msie && intval(browser.version) <= 11;
        return h.addEventListener("click", function(e) {
            return r(1), g || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
        }), p.addEventListener("click", function(e) {
            return r(-1), g || t.dispatchEvent(new Event("mousemove")), cancelEvent(e)
        }), t.addEventListener("mousemove", function() {
            a(!1), addClass(n, "article_photo_carousel__mouse_over"), clearTimeout(_), _ = setTimeout(function() {
                a(!0)
            }, 1e3)
        }), t.addEventListener("mouseleave", function() {
            clearTimeout(_), removeClass(n, "article_photo_carousel__mouse_over"), removeClass(n, "article_photo_carousel__mouse_idle")
        }), r
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
    }();
    t.initPhotoCarousel = a;
    var s = r(14)
}, function(e, t) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = {},
        i = function() {
            function e() {
                r(this, e)
            }
            return e.add = function(e, t) {
                a[e] = t
            }, e.get = function(e, t) {
                return void 0 !== t ? (e = e.split(","), a[e[t]]) : a[e]
            }, e
        }();
    t["default"] = i
}, function(e, t) {
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

    function _(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function g(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function f(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function v(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function m(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function y(e) {
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

    function S(e, t) {
        return -1 != x(t, e)
    }

    function O(e, t) {
        var r = d(e) || "undefined" == typeof e.length ? {} : [];
        for (var a in e)(!/webkit/i.test(_ua) || "layerX" != a && "layerY" != a && "webkitMovementX" != a && "webkitMovementY" != a) && (t && "object" === D(e[a]) && "prototype" !== a && null !== e[a] ? r[a] = O(e[a]) : r[a] = e[a]);
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
        for ("boolean" == typeof r && (n = r, r = t[1] || {}, a = 2), "object" === ("undefined" == typeof r ? "undefined" : D(r)) || s(r) || (r = {}); i > a; ++a)
            if (null != (e = t[a]))
                for (var o in e) {
                    var l = r[o],
                        c = e[o];
                    r !== c && (n && c && "object" === ("undefined" == typeof c ? "undefined" : D(c)) && !c.nodeType ? r[o] = j(n, l || (null != c.length ? [] : {}), c) : void 0 !== c && (r[o] = c))
                }
        return r
    }

    function I(e) {
        window.templates = window.templates || {}, j(window.templates, e)
    }

    function L(e, t) {
        var r = window.templates = window.templates || {},
            a = r[e];
        return "function" == typeof a && (a = a()), a && t ? rs(a, t) : a || ""
    }

    function A(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : D(e))) return !1;
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

    function N(e, t) {
        for (var r, a = t ? R : B, i = []; e && (r = e.match(a));) {
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

    function M() {
        return window.devicePixelRatio >= 2
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.vkLocal = r, t.lTimeout = a, t.rand = i, t.irand = n, t.isUndefined = o, t.isFunction = s, t.isArray = l, t.isString = c, t.isObject = d, t.isEmpty = u, t.vkNow = p, t.vkImage = h, t.trim = _, t.stripHTML = g, t.escapeRE = f, t.intval = v, t.floatval = m, t.positive = y, t.isNumeric = b, t.winToUtf = w, t.replaceEntities = E, t.clean = C, t.unclean = P, t.each = T, t.indexOf = x, t.inArray = S, t.clone = O, t.arrayKeyDiff = k, t.extend = j, t.addTemplates = I, t.getTemplate = L, t.serializeForm = A, t.extractUrls = N, t.isRetina = M, window.PageID = window.PageID || 1;
    var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        R = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = M, window.extractUrls = N, window.serializeForm = A, window.addTemplates = I, window.getTemplate = L, window.rand = i, window.irand = n, window.isUndefined = o, window.isFunction = s, window.isArray = l, window.isString = c, window.isObject = d, window.isEmpty = u, window.vkNow = p, window.vkImage = h, window.trim = _, window.stripHTML = g, window.escapeRE = f, window.intval = v, window.floatval = m, window.positive = y, window.isNumeric = b, window.winToUtf = w, window.replaceEntities = E, window.clean = C, window.unclean = P, window.each = T, window.indexOf = x, window.inArray = S, window.clone = O, window.arrayKeyDiff = k, window.extend = j, window.vkLocal = r, window.lTimeout = a
}, function(e, t, r) {
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
        l = r(10),
        c = a(l),
        d = r(14),
        u = r(18),
        p = a(u),
        h = r(2),
        _ = a(h),
        g = void 0,
        f = function(e) {
            function t(r, a) {
                i(this, t);
                var o = n(this, e.call(this, r, a, !0));
                return o._currentImageIndex = 0, o
            }
            return o(t, e), t.prototype.cancelCarouselEditor = function() {
                this._carouselEditor && this._carouselEditor.cancel()
            }, t.prototype.renderExtraControlsEl = function() {
                var e = this;
                if (!this.getEditor().getOptions().carouselEnabled) return !1;
                var t = se('\n        <div>\n          <div class="article_ed__carousel_nav_btn">\n            <div class="article_ed__carousel_nav_btn_left"></div>\n            <div class="article_ed__carousel_nav_btn_right"></div>\n          </div>\n          <div class="article_ed__carousel_btns">\n            <button class="article_ed__carousel_btn article_ed__carousel_btn_edit">' + getLang("pages_article_ed_create_carousel") + '</button>\n            <div class="article_ed__carousel_btn article_ed__carousel_counter"></div>\n          </div>\n        </div>\n    '),
                    r = geByClass1("article_ed__carousel_btn_edit", t),
                    a = geByClass1("article_ed__carousel_nav_btn_left", t),
                    i = geByClass1("article_ed__carousel_nav_btn_right", t),
                    n = function() {
                        var t = e.getMediaIdsCount() > 1;
                        r.innerHTML = t ? getLang("pages_article_ed_edit_carousel") : getLang("pages_article_ed_create_carousel")
                    };
                return n(), r.addEventListener("click", function(r) {
                    return e.getEditor().closeAllCarouselEditors(), addClass(e._el, "article_ed__carousel_edit_open"), e._carouselEditor = new _["default"](t, e, function(r) {
                        return r ? (delete e._fixedImageSize, e.setMediaId(r), e._rerender(), e.getEditor().saveUndoSateAndDraft(), n(), e._setImageIndex(0, t), removeClass(e._el, "article_ed__carousel_edit_open"), void delete e._carouselEditor) : void e.getEditor().removeObject(e)
                    }, e.getEditor().getLimits().maxCarouselItems), cancelEvent(r)
                }), a.addEventListener("click", function() {
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
                var a = geByClass1("article_ed__carousel_counter", t);
                this._isCarousel() ? (setStyle(a, "display", "inline-block"), a.innerHTML = getLang("pages_article_ed_carousel_counter").replace("{counter}", this._currentImageIndex + 1).replace("{total}", this.getMediaIdsCount())) : hide(a), this._drawImage()
            }, t.prototype._rerender = function() {
                var e = this._el,
                    t = this.render();
                domReplaceEl(e, t)
            }, t.prototype.render = function() {
                this._el = se('\n      <div class="article_ed__img_wrap">\n        <img contenteditable="false" class="article_ed__img"/>\n      </div>\n    ');
                var e = p["default"].get(this.getMediaId(), 0);
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
                                    e._mediaId = t, p["default"].add(t, r.editable), e._drawImage(), e._onUploadCallback && e._onUploadCallback()
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
                var a = new FileReader;
                a.onload = function() {
                    r._initUpload(), Upload.onFileApiSend(r._upload, [e])
                }, a.readAsDataURL(e)
            }, t.prototype._updateSize = function() {}, t.prototype._drawImage = function() {
                var e = this,
                    t = p["default"].get(this.getMediaId(), this._currentImageIndex);
                if (t) {
                    var r = (0, d.getAppropriateImage)(t.sizes, this.getEditor().getWidth(!0)),
                        a = s(r, 1),
                        i = a[0],
                        n = this._getImageEl(),
                        o = !1;
                    n.onload = function() {
                        clearTimeout(g), o = !0, setStyle(n, "visibility", "visible"), show(n), e.setLoadingState(!1), e._fixSize()
                    }, n.src = i, clearTimeout(g), o || (g = setTimeout(function() {
                        o || (setStyle(n, "visibility", "hidden"), e.setLoadingState(!0, e._isCarousel()))
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
        }(c["default"]);
    t["default"] = f
}, , function(e, t, r) {
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

    function _(e, t, r) {
        var a = document.createElement(e);
        return t && extend(a, t), r && ce(a, r), a
    }

    function g(e) {
        return e = a(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function f(e) {
        return P(_("div", {
            innerHTML: e
        }))
    }

    function v(e) {
        return S(_("div", {
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
        return isString(t) && (t = f(t)), x(e).replaceChild(t, e), t
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

    function S(e) {
        for (var t = [], r = e.childNodes, a = 0; a < r.length; a++) r[a].tagName && t.push(r[a]);
        return t
    }

    function O(e, t) {
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

    function I(e, t, r) {
        return e ? "undefined" != typeof r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
    }

    function L(e) {
        for (var t = 0; null != (e = C(e));) t++;
        return t
    }

    function A(e, t) {
        do e = x(e); while (e && !M(e, t));
        return e
    }

    function N(e, t, r) {
        for (var a = null; null === a && e;) e = -1 === r ? C(e) : E(e), e && M(e, t) && (a = e);
        return a
    }

    function M(e, t) {
        if (e = a(e), !e || e == document) return !1;
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
        var r = a(e);
        if (t = a(t), !e || !t) return !1;
        for (; r = r.parentNode;)
            if (r == t) return !0;
        return !1
    }

    function R() {
        var e = browser.msie6 ? a("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function H(e, t) {
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

    function K() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function $(e, t, r) {
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

    function Q(e, t) {
        return void 0 === t && (t = !W(e)), t ? F(e) : z(e), t
    }

    function q(e) {
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
        return o ? (r = o.documentElement, q(e) && (n = V(e, !0)), i = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [n.left + (t ? 0 : i.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), n.top + (t ? 0 : i.pageYOffset || r.scrollTop) - (r.clientTop || 0)]) : [0, 0]
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
                n = q(e) && (i = V(e, r)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t && each(n, function(t, r) {
                    var a = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    each(a, function() {
                        n[t] -= parseFloat(le(e, "padding" + this)) || 0, n[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                    })
                })
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
            if ("object" == ("undefined" == typeof t ? "undefined" : Pe(t))) return each(t, function(t, r) {
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
        o || (o = headNode.appendChild(_("style", {
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

    function _e(e) {
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
            } else removeEvent(e), _e(e, vkExpand), delete vkCache[r]
    }

    function fe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var r = a(e[t]);
            r && (ge(r), _e(r, "btnevents"))
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

    function me() {
        var e = a("zoom_test_1") || document.body.appendChild(_("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = a("zoom_test_2") || document.body.appendChild(_("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function ye(e, t, r) {
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

    function Ee(e) {
        return xe ? void 0 : window.document.title = e
    }

    function Ce(e) {
        xe = e, e && window.cur && window.cur.destroy.push(function() {
            Ce(!1)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var Pe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.ge = a, t.geByTag = i, t.geByTag1 = n, t.geByClass = o, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = c, t.domQuery1 = d, t.domClosest = u, t.domClosestByTag = p, t.gpeByTag = h, t.ce = _, t.re = g, t.se = f, t.sech = v, t.rs = m, t.psr = y, t.domReplaceEl = b, t.domEL = w, t.domNS = E, t.domPS = C, t.domFC = P, t.domLC = T, t.domPN = x, t.domChildren = S, t.domInsertBefore = O, t.domInsertAfter = k, t.domByClass = j, t.domData = I, t.domChildIndex = L, t.domCA = A, t.domClosestSibling = N, t.matchesSelector = M, t.isHover = D, t.isAncestor = B, t.getScroll = R, t.domClosestPositioned = H, t.domClosestOverflowHidden = U, t.show = F, t.hide = z, t.isVisible = W, t.clientHeight = K, t.getClientRectOffsetY = $, t.toggle = Q, t.boundingRectEnabled = q, t.getXYRect = V, t.getXY = X, t.isWindow = Y, t.getSize = G, t.getW = J, t.getH = Z, t.hasClass = ee, t.addClass = te, t.addClassDelayed = re, t.removeClass = ae, t.removeClassDelayed = ie, t.toggleClass = ne, t.toggleClassDelayed = oe, t.replaceClass = se, t.getStyle = le, t.setStyle = ce, t.setStyleDelayed = de, t.setPseudoStyle = ue, t.data = pe, t.attr = he, t.removeAttr = _e, t.removeData = ge, t.cleanElems = fe, t.setTitle = ve, t.getZoom = me, t.val = ye, t.elfocus = be, t.traverseParent = we, t.setDocumentTitle = Ee, t.lockDocumentTitle = Ce;
    var Te = r(19);
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
    }(), window.vkExpand = window.vkExpand || "VK" + (0, Te.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var xe = !1;
    window.ge = a, window.geByTag = i, window.geByTag1 = n, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = c, window.domQuery1 = d, window.domClosest = u, window.ce = _, window.re = g, window.se = f, window.sech = v, window.rs = m, window.psr = y, window.domReplaceEl = b, window.domEL = w, window.domNS = E, window.domPS = C, window.domFC = P, window.domLC = T, window.domPN = x, window.domChildren = S, window.domInsertBefore = O, window.domInsertAfter = k, window.domByClass = j, window.domData = I, window.domChildIndex = L, window.domCA = A, window.domClosestSibling = N, window.matchesSelector = M, window.isHover = D, window.isAncestor = B, window.getScroll = R, window.domClosestPositioned = H, window.domClosestOverflowHidden = U, window.show = F, window.hide = z, window.isVisible = W, window.clientHeight = K, window.getClientRectOffsetY = $, window.toggle = Q, window.boundingRectEnabled = q, window.getXYRect = V, window.getXY = X, window.isWindow = Y,
        window.getSize = G, window.hasClass = ee, window.addClass = te, window.addClassDelayed = re, window.removeClass = ae, window.removeClassDelayed = ie, window.toggleClass = ne, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = le, window.setStyle = ce, window.setStyleDelayed = de, window.setPseudoStyle = ue, window.data = pe, window.attr = he, window.removeAttr = _e, window.removeData = ge, window.cleanElems = fe, window.setTitle = ve, window.getZoom = me, window.val = ye, window.elfocus = be, window.traverseParent = we, window.getH = Z, window.getW = J, window.domClosestByTag = p, window.setDocumentTitle = Ee, window.lockDocumentTitle = Ce
}]);