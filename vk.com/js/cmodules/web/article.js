! function(e) {
    function t(a) {
        if (r[a]) return r[a].exports;
        var n = r[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
}([function(e, t, r) {
    e.exports = r(43)
}, , , function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
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
    var s = r(19),
        l = a(s),
        c = function(e) {
            function t(r, a, o) {
                return n(this, t), i(this, e.call(this, r, a, o, !0))
            }
            return o(t, e), t.prototype.render = function() {
                var e = this;
                return loadScript("https://platform.twitter.com/widgets.js", {
                    onLoad: function() {
                        e.setLoadingState(!1), twttr.widgets.createTweet(e.getMediaId(), e._el, {
                            align: "center",
                            lang: window.vk && 0 == window.vk.lang ? "ru" : "en",
                            dnt: !0
                        }).then(function() {})
                    }
                }), this._el = se("<div></div>"), this.setLoadingState(!0), this._el
            }, t
        }(l["default"]);
    t["default"] = c
}, , , , , function(e, t) {
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

    function n(e, t) {
        return Math.random() * (t - e + 1) + e
    }

    function i(e, t) {
        return Math.floor(n(e, t))
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
            for (var a = 0, n = e.length; n > a; a++) {
                var i = e[a];
                if (t.call(i, a, i) === !1) break
            }
        return e
    }

    function O(e, t, r) {
        for (var a = r || 0, n = (e || []).length; n > a; a++)
            if (e[a] == t) return a;
        return -1
    }

    function x(e, t) {
        return -1 != O(t, e)
    }

    function j(e, t) {
        var r = d(e) || "undefined" == typeof e.length ? {} : [];
        for (var a in e)(!/webkit/i.test(_ua) || "layerX" != a && "layerY" != a && "webkitMovementX" != a && "webkitMovementY" != a) && (t && "object" === R(e[a]) && "prototype" !== a && null !== e[a] ? r[a] = j(e[a]) : r[a] = e[a]);
        return r
    }

    function S(e) {
        var t, r, a = {},
            n = 1,
            i = arguments.length,
            o = arguments;
        for (t in e) {
            for (r = !1, n = 1; i > n; n++) o[n][t] && o[n][t] == e[t] && (r = !0);
            r || (a[t] = e[t])
        }
        return a
    }

    function k() {
        var e, t = arguments,
            r = t[0] || {},
            a = 1,
            n = t.length,
            i = !1;
        for ("boolean" == typeof r && (i = r, r = t[1] || {}, a = 2), "object" === ("undefined" == typeof r ? "undefined" : R(r)) || s(r) || (r = {}); n > a; ++a)
            if (null != (e = t[a]))
                for (var o in e) {
                    var l = r[o],
                        c = e[o];
                    r !== c && (i && c && "object" === ("undefined" == typeof c ? "undefined" : R(c)) && !c.nodeType ? r[o] = k(i, l || (null != c.length ? [] : {}), c) : void 0 !== c && (r[o] = c))
                }
        return r
    }

    function A(e) {
        window.templates = window.templates || {}, k(window.templates, e)
    }

    function D(e, t) {
        var r = window.templates = window.templates || {},
            a = r[e];
        return "function" == typeof a && (a = a()), a && t ? rs(a, t) : a || ""
    }

    function N(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : R(e))) return !1;
        var t = {},
            r = function(t) {
                return geByTag(t, e)
            },
            a = function(r, a) {
                if (a.name)
                    if ("text" != a.type && a.type)
                        if (a.getAttribute("bool")) {
                            var n = val(a);
                            if (!n || "0" === n) return;
                            t[a.name] = 1
                        } else t[a.name] = browser.msie && !a.value && e[a.name] ? e[a.name].value : a.value;
                else t[a.name] = val(a)
            };
        return T(r("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? a(e, t) : void 0
        }), T(r("select"), a), T(r("textarea"), a), t
    }

    function L(e, t) {
        for (var r, a = t ? H : M, n = []; e && (r = e.match(a));) {
            e = e.substr(r.index + r[0].length);
            var i = 0;
            r[4] || (i = 7), n.push({
                url: r[2 + i],
                query: r[5 + i] || "",
                domain: r[4 + i]
            })
        }
        return n
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
    t.vkLocal = r, t.lTimeout = a, t.rand = n, t.irand = i, t.isUndefined = o, t.isFunction = s, t.isArray = l, t.isString = c, t.isObject = d, t.isEmpty = u, t.vkNow = p, t.vkImage = h, t.trim = f, t.stripHTML = g, t.escapeRE = _, t.intval = v, t.floatval = y, t.positive = m, t.isNumeric = b, t.winToUtf = w, t.replaceEntities = E, t.clean = C, t.unclean = P, t.each = T, t.indexOf = O, t.inArray = x, t.clone = j, t.arrayKeyDiff = S, t.extend = k, t.addTemplates = A, t.getTemplate = D, t.serializeForm = N, t.extractUrls = L, t.isRetina = I, window.PageID = window.PageID || 1;
    var M = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = I, window.extractUrls = L, window.serializeForm = N, window.addTemplates = A, window.getTemplate = D, window.rand = n, window.irand = i, window.isUndefined = o, window.isFunction = s, window.isArray = l, window.isString = c, window.isObject = d, window.isEmpty = u, window.vkNow = p, window.vkImage = h, window.trim = f, window.stripHTML = g, window.escapeRE = _, window.intval = v, window.floatval = y, window.positive = m, window.isNumeric = b, window.winToUtf = w, window.replaceEntities = E, window.clean = C, window.unclean = P, window.each = T, window.indexOf = O, window.inArray = x, window.clone = j, window.arrayKeyDiff = S, window.extend = k, window.vkLocal = r, window.lTimeout = a
}, , function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && inArray(e.tagName.toLowerCase(), ["cite", "blockquote"])
    }

    function n(e) {
        var t = domData(e, "type"),
            r = domData(e, "uuid");
        return [t, r]
    }

    function i(e, t) {
        cur[e] = cur[e] || 0, void 0 === t ? console.log(e, cur[e]) : cur[e] >= t, cur[e]++
    }

    function o(e) {
        return e && hasClass(e, "_article_paragraph")
    }

    function s(e) {
        if (e.endContainer != e.startContainer && e.endContainer.nodeType == Node.ELEMENT_NODE && o(e.endContainer) && 0 == e.endOffset && 0 == e.startOffset) {
            var t = e.cloneRange();
            t.selectNodeContents(domPS(e.endContainer));
            var r = e.cloneRange();
            return r.setEnd(cloned.endContainer, cloned.endOffset), r
        }
        return e
    }

    function l(e) {
        if (e) try {
            var t = document.createRange();
            t.setStart(e, 0), t.setEnd(e, 0);
            var r = window.getSelection();
            r.removeAllRanges(), r.addRange(t)
        } catch (a) {}
    }

    function c(e) {
        var t, r = 0,
            a = 0,
            n = e.ownerDocument || e.document,
            i = n.defaultView || n.parentWindow;
        if ("undefined" != typeof i.getSelection) {
            if (t = i.getSelection(), t.rangeCount > 0) {
                var o = i.getSelection().getRangeAt(0),
                    s = o.cloneRange();
                s.selectNodeContents(e), s.setEnd(o.startContainer, o.startOffset), r = s.toString().length, s.setEnd(o.endContainer, o.endOffset), a = s.toString().length
            }
        } else if ((t = n.selection) && "Control" != t.type) {
            var l = t.createRange(),
                c = n.body.createTextRange();
            c.moveToElementText(e), c.setEndPoint("EndToStart", l), r = c.text.length, c.setEndPoint("EndToEnd", l), a = c.text.length
        }
        return [r, a]
    }

    function d(e, t, r, a) {
        if (e = e.substring(t, r), a && a.length) {
            var n = [],
                i = 0;
            a.forEach(function(r) {
                r -= t, 0 >= r || r > e.length || (n.push(y(e.substring(i, r) + "<br/>")), i = r)
            }), n.push(y(e.substring(i)));
            var o = "" == n[n.length - 1];
            return o && n.push("<br/>"), n.join("")
        }
        return y(e)
    }

    function u(e) {
        if (!e) return !1;
        for (var t = 0; null != (e = e.previousSibling);) t++;
        return t
    }

    function p(e) {
        return e && e.nodeType == Node.ELEMENT_NODE && !!domData(e, "uuid")
    }

    function h(e) {
        return e && e.type && e.type >= 100
    }

    function f(e) {
        var t = void 0;
        return t = isObject(e) ? e.type : e, inArray(t, [X.ParagraphType.Header1, X.ParagraphType.Header2, X.ParagraphType.Header3])
    }

    function g(e) {
        return e && (e.type == X.ParagraphType.NumericList || e.type == X.ParagraphType.BulletList)
    }

    function _(e) {
        e = e || {};
        var t = {};
        return h(e) && (t._uuid = e._uuid), t.lines = e.lines || [{
            text: "",
            decorations: {},
            brs: []
        }], t.type = e.type ? parseInt(e.type) : X.ParagraphType.Text, e._preparedData && (t._preparedData = e._preparedData), e.mediaId && (t.mediaId = e.mediaId), t
    }

    function v() {
        var e = window.getSelection();
        return e.rangeCount ? [e.getRangeAt(0), e.isCollapsed, e] : [!1]
    }

    function y(e) {
        return -1 != e.search(/^\s/) && (e = " " + e.trimLeft()), -1 != e.search(/\s$/) && (e = e.trimRight() + K), e
    }

    function m(e) {
        return e.replace(/\s\s+/g, " ").replace(/\s/g, " ")
    }

    function b(e) {
        for (var t = 5; t--;) {
            if (hasClass(e, "_article_paragraph")) return e;
            e = e.parentNode
        }
        return !1
    }

    function w(e) {
        for (var t = e.slice().sort(function(e, t) {
                return e[0] > t[0]
            }), r = 0; r < t.length - 1;) {
            var a = t[r],
                n = t[r + 1];
            a[1] >= n[0] ? (a[1] = Math.max(a[1], n[1]), t.splice(r + 1, 1)) : r++
        }
        return t
    }

    function E(e) {
        return /\s/.test(e)
    }

    function C(e) {
        return Z.test(e)
    }

    function P(e) {
        return /[a-zA-Z]/.test(e)
    }

    function T(e) {
        return !hasClass(e, J)
    }

    function O() {
        var e = window.getSelection();
        return e.focusNode
    }

    function x(e) {
        if (e.hasAttribute(V)) {
            for (var t = e.getAttribute(V); e = e.previousSibling;)
                if (e.hasAttribute(V) && t == e.getAttribute(V)) return !1;
            return !0
        }
        return !1
    }

    function j(e) {
        var t = [];
        each(e, function(e, r) {
            t.push(r)
        });
        var r = t.sort(function(e, t) {
            return t[1] - e[1]
        })[0];
        return [r[1], r[2]]
    }

    function S(e) {
        for (var t = e.parentNode, r = 0; r < t.childNodes.length; r++)
            if (e == t.childNodes[r]) return r;
        return -1
    }

    function k(e) {
        e = e || document.body;
        var t = v(),
            r = Q(t, 2),
            a = r[0],
            n = void r[1],
            i = void 0,
            o = [];
        return a.startContainer.nodeType == Node.TEXT_NODE ? n = a.startOffset : i = a.startOffset, traverseParent(a.startContainer, function(t) {
            return t == e ? !0 : void o.push(S(t))
        }, 10), o = o.reverse(), [o, n, i]
    }

    function A(e, t) {
        e = e.toLowerCase();
        for (var r = "", a = !1, n = "-qwertyuiopasdfghjklzxcvbnm0123456789".split(""), i = 0; i < e.length; i++)
            if (/\s/.test(e[i])) a || (r += "-", a = !0);
            else if (inArray(e[i], n)) r += e[i], a = !1;
        else {
            var o = ee[e.charCodeAt(i)];
            o && (r += o, a = !1)
        }
        return r = r.substr(0, t), r = r.replace(/-*$/, "")
    }

    function D(e) {
        var t = void 0,
            r = void 0,
            a = void 0;
        t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], a = new Uint8Array(t.length);
        for (var n = 0; n < t.length; n++) a[n] = t.charCodeAt(n);
        return new Blob([a], {
            type: r
        })
    }

    function N(e, t, r) {
        function a(e) {
            return e ? i[e.split("?").shift().split(".").pop()] : null
        }
        var n = void 0;
        if ("function" == typeof t && (r = t, t = {}), t = t || {}, !e) return r(new Error("Pass in a IMG DOM node or a url as first param"));
        if ("object" === ("undefined" == typeof e ? "undefined" : q(e)) && "img" === e.tagName.toLowerCase() && (n = e.src), "string" == typeof e && (n = e), /^data:/.test(n) && !t.convert) return void r(null, D(n));
        var i = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            svg: "image/svg+xml"
        };
        return t.type = i[t.type] || a(n), t.src = n, t.callback = r, t.name = n, t.type ? void I(n, L.bind(null, t)) : void r(new Error("Image type is not supported"))
    }

    function L(e, t, r) {
        if (t) return void e.callback(t);
        var a = D(r);
        a.name = a.filename = e.name, e.callback(null, a)
    }

    function I(e, t) {
        var r = document.createElement("canvas"),
            a = document.createElement("img");
        a.onload = function() {
            var e = r.getContext("2d");
            r.width = a.width, r.height = a.height, e.drawImage(a, 0, 0), t(null, r.toDataURL("image/png"))
        }, a.addEventListener("error", function() {
            t(new Error("FailedToLoadImage"))
        }), r.getContext ? (a.crossOrigin = "anonymous", a.src = e) : setTimeout(t, 0, new Error("CanvasIsNotSupported"))
    }

    function R() {
        if (0 != te.length && re != ae) {
            re++;
            var e = te.shift(),
                t = new Image;
            t.addEventListener("load", function() {
                N(t, {}, function(t, r) {
                    e.cb(t, r, function() {
                        re--, R()
                    })
                })
            }), t.src = e.src
        }
    }

    function M(e, t) {
        te.push({
            src: e,
            cb: t
        }), R()
    }

    function H(e) {
        return e.replace(/\s/g, "").replace(Y, "").replace(G, "")
    }

    function B(e) {
        return e = trim(e), 1 == e.length && e[0] == Y
    }

    function U(e) {
        return e.filter(function(e, t, r) {
            return r.indexOf(e) === t
        })
    }

    function F(e) {
        var t = [],
            r = void 0,
            a = void 0;
        return e.forEach(function(e) {
            if (e === r) {
                if (a >= 2) return;
                a++
            } else a = 1;
            t.push(r = e)
        }), t
    }

    function z() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return se('<p class="' + J + '">' + e + "</p>")
    }

    function W(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            n = t(e, a);
        if (void 0 !== n) return n;
        for (var i = Array.prototype.slice.call(r ? e.children : e.childNodes), o = void 0; o = i.shift();) {
            var s = W(o, t, r, !1);
            if (void 0 !== s) return s
        }
    }

    function $(e, t, r) {
        var a = void 0,
            n = void 0,
            i = void 0,
            o = null,
            s = 0;
        r || (r = {});
        var l = function() {
            s = r.leading === !1 ? 0 : Date.now(), o = null, i = e.apply(a, n), o || (a = n = null)
        };
        return function() {
            var c = Date.now();
            s || r.leading !== !1 || (s = c);
            var d = t - (c - s);
            return a = this, n = arguments, 0 >= d || d > t ? (o && (clearTimeout(o), o = null), s = c, i = e.apply(a, n), o || (a = n = null)) : o || r.trailing === !1 || (o = setTimeout(l, d)), i
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ArticleEditorParagraphClass = t.CURSOR_MARKER_END = t.CURSOR_MARKER_START = t.DATA_ATTR_TRACKED = t.NBSP = void 0;
    var q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Q = function() {
            function e(e, t) {
                var r = [],
                    a = !0,
                    n = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                } catch (l) {
                    n = !0, i = l
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (n) throw i
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
    t.isQuoteEl = a, t.paragraphElProperties = n, t.deb = i, t.isParagraphEl = o, t.getCorrectedRange = s, t.focusEl = l, t.getCaretCharacterOffsetWithin = c, t.prepareLineText = d, t.getElementIndex = u, t.isObjectParagraphEl = p, t.isObjectParagraph = h, t.isHeaderParagraph = f, t.isListParagraph = g, t.buildParagraph = _, t.getRange = v, t.prepareSpacesWithSpaces = y, t.cleanTextSpaces = m, t.getLineEl = b, t.mergeRanges = w, t.isWhiteSpaceChar = E, t.isCyrillicChar = C, t.isLatinChar = P, t.isAlienParagraphEl = T, t.getFocusedElement = O, t.isTrackedParagraphEl = x, t.getPhotoSize = j, t.childNodeIndex = S, t.getAbsoluteCursorPosition = k, t.generateLatinizedName = A, t.dataURItoBlob = D, t.imageToBlob = N, t.queuePhotoProcess = M, t.cleanWhiteSpaces = H, t.justCursorInString = B, t.arrayUnique = U, t.arrayClear3Repetitions = F, t.createParagraphEl = z, t.traverseTree = W, t.throttle = $;
    var X = r(18),
        K = t.NBSP = "&nbsp;",
        V = t.DATA_ATTR_TRACKED = "data-t",
        Y = t.CURSOR_MARKER_START = "​",
        G = t.CURSOR_MARKER_END = "‌",
        J = t.ArticleEditorParagraphClass = "_article_p",
        Z = /[\u0400-\u04FF]/,
        ee = {
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
        te = [],
        re = 0,
        ae = 2
}, , , , , , , , function(e, t, r) {
    "use strict";

    function a(e, t) {
        var r = [];
        (0, n.each)(e, function(e, t) {
            r.push(t)
        }), r.sort(function(e, t) {
            return e[1] - t[1]
        }), t *= (0, n.isRetina)() ? 2 : 1;
        var a = r[r.length - 1];
        return r.forEach(function(e) {
            e[1] >= t && (a = e)
        }), a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ParagraphType = void 0, t.getAppropriateImage = a;
    var n = r(8);
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
        ObjectGIF: 103,
        ObjectTweet: 104
    }
}, function(e, t, r) {
    "use strict";

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function() {
            function e(e, t) {
                var r = [],
                    a = !0,
                    n = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                } catch (l) {
                    n = !0, i = l
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (n) throw i
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
        i = r(10),
        o = window.browser && (browser.mozilla || browser.safari),
        s = function() {
            function e(t, r, n, i) {
                a(this, e), this._preparedData = r, this._mediaId = t, this._editor = n, this._highlighted = !1, this._isCaptioned = !!i
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
                            n = se('<div class="article_ed__object_highlight _article_ed__object_highlight"></div>'),
                            s = 0;
                        setStyle(n, {
                            width: a[0] + s,
                            height: a[1] + s
                        }), addClass(r, "article_ed__object_highlighted"), o && r.setAttribute("contenteditable", "false"), o || this._objectEl.setAttribute("draggable", !0)
                    } else re(geByClass1("_article_ed__object_highlight", r)), removeClass(r, "article_ed__object_highlighted"), o && r.removeAttribute("contenteditable"), o || this._objectEl.setAttribute("draggable", !1);
                    if (this._isCaptioned)
                        if (e) this._toggleCaption(!0), this._toggleCaptionPlaceholder(this._isEmptyCaption()), t || (0, i.focusEl)(this._getCaptionEl());
                        else {
                            var l = this._isEmptyCaption();
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
                    var r = o ? 'contenteditable="true"' : 'contenteditable="false" ondragstart="cur.articleEditor.onDragStart(event)"';
                    this._objectEl = se("<figure " + r + ' contenteditable="true"></figure>'), this._objectEl.appendChild(se('<div contenteditable="false"></div>')), this._objectEl.firstChild.appendChild(t), this._isCaptioned && (this._captionEl = se('<figcaption class="article_ed__figcaption">\n          <div class="article_ed__figcaption_edit" contenteditable="true"></div>\n          <div class="article_ed__caption_placeholder">' + getLang("pages_article_figure_placeholder") + "</div>\n        </figcaption>"), this._objectEl.appendChild(this._captionEl)), o && t.addEventListener("click", function() {
                        e.highlight(!0), (0, i.focusEl)(t)
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
                this._toggleCaption(!0), this._toggleCaptionPlaceholder(this._isEmptyCaption()), this._isFocusInCaption() || (0, i.focusEl)(this._getCaptionEl())
            }, e.prototype._isEmptyCaption = function() {
                return !this._getCaptionEl().textContent.trim()
            }, e.prototype._getCaptionEl = function() {
                return geByClass1("article_ed__figcaption_edit", this._captionEl)
            }, e.prototype._toggleCaption = function(e) {
                toggleClass(this._captionEl, "article_ed__figcaption_visible", e)
            }, e.prototype._toggleCaptionPlaceholder = function(e) {
                (void 0 === this._captionPlaceholderShown || this._captionPlaceholderShown !== e) && (this._captionPlaceholderShown = toggle(geByClass1("article_ed__caption_placeholder", this._captionEl), e))
            }, e.prototype._isFocusInCaption = function() {
                var e = this,
                    t = (0, i.getRange)(),
                    r = n(t, 2),
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
}, , , function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
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
    var s = r(19),
        l = a(s),
        c = function(e) {
            function t(r, a, o) {
                return n(this, t), i(this, e.call(this, r, a, o, !0))
            }
            return o(t, e), t.prototype.render = function() {
                var e = this;
                this._el = se('\n      <div class="article_object_video"></div>\n    ');
                var t = this.getPreparedData();
                if (t && (t.editable || t.thumb)) {
                    var r = this.getEditor().getWidth(!0),
                        a = Math.floor(r * (9 / 16)),
                        n = function() {
                            var r = [];
                            each(t.editable.sizes, function(e, t) {
                                r.push(t)
                            }), r = r.sort(function(e, t) {
                                return e[1] < t[1]
                            });
                            var a = e.getEditor().getWidth() * (isRetina() ? 2 : 1),
                                n = r[0][0];
                            return r.forEach(function(e) {
                                e[1] >= a && (n = e[0])
                            }), n
                        },
                        i = t.thumb || n();
                    setStyle(this._el, {
                        width: r,
                        height: a,
                        backgroundImage: "url(" + i + ")"
                    }), this._el.appendChild(se('<div class="article_object_video_play"></div>')), this._el.appendChild(se(rs(this.getEditor().getOptions().videoLabelTemplate, {
                        duration: t.duration,
                        platform: t.platform
                    })))
                }
                return this._el
            }, t.prototype.onViewport = function(e) {}, t.prototype.onRender = function() {}, t
        }(l["default"]);
    t["default"] = c
}, , , , , function(e, t, r) {
    "use strict";

    function a(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function n(e, t) {
        return t = a(t) || document, t.getElementsByTagName(e)
    }

    function i(e, t) {
        return t = a(t) || document, t.querySelector && t.querySelector(e) || n(e, t)[0]
    }

    function o(e, t, r) {
        t = a(t) || document, r = r || "*";
        var i = [];
        if (t.querySelectorAll && "*" != r) return t.querySelectorAll(r + "." + e);
        if (t.getElementsByClassName) {
            var o = t.getElementsByClassName(e);
            if ("*" != r) {
                r = r.toUpperCase();
                for (var s = 0, l = o.length; l > s; ++s) o[s].tagName.toUpperCase() == r && i.push(o[s])
            } else i = Array.prototype.slice.call(o);
            return i
        }
        for (var c = n(r, t), d = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = c.length; l > s; ++s) d.test(c[s].className) && i.push(c[s]);
        return i
    }

    function s(e, t, r) {
        return t = a(t) || document, r = r || "*", t.querySelector && t.querySelector(r + "." + e) || o(e, t, r)[0]
    }

    function l(e, t, r) {
        if (t = a(t), !t) return null;
        for (; r !== t && (t = t.parentNode);)
            if (J(t, e)) return t;
        return null
    }

    function c(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function d(e, t) {
        return (t || document).querySelector(e)
    }

    function u(e, t) {
        return J(t, e) ? t : l(e, t)
    }

    function p(e, t, r) {
        var a = document.createElement(e);
        return t && extend(a, t), r && se(a, r), a
    }

    function h(e) {
        return e = a(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function f(e) {
        return E(p("div", {
            innerHTML: e
        }))
    }

    function g(e) {
        return T(p("div", {
            innerHTML: e
        }))
    }

    function _(e, t) {
        return each(t, function(t, r) {
            e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof r ? "" : r).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function v(e) {
        return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
    }

    function y(e, t) {
        return isString(t) && (t = f(t)), P(e).replaceChild(t, e), t
    }

    function m(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function b(e) {
        return m((e || {}).nextSibling)
    }

    function w(e) {
        return m((e || {}).previousSibling, 1)
    }

    function E(e) {
        return m((e || {}).firstChild)
    }

    function C(e) {
        return m((e || {}).lastChild, 1)
    }

    function P(e) {
        return (e || {}).parentNode
    }

    function T(e) {
        for (var t = [], r = e.childNodes, a = 0; a < r.length; a++) r[a].tagName && t.push(r[a]);
        return t
    }

    function O(e, t) {
        var r = P(t);
        return r && r.insertBefore(e, t)
    }

    function x(e, t) {
        var r = P(t);
        return r && r.insertBefore(e, b(t))
    }

    function j(e, t) {
        return e ? s(t, e) : e
    }

    function S(e, t, r) {
        return e ? "undefined" != typeof r ? (null === r ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, r), r) : e.getAttribute("data-" + t) : null
    }

    function k(e) {
        for (var t = 0; null != (e = w(e));) t++;
        return t
    }

    function A(e, t) {
        do e = P(e); while (e && !N(e, t));
        return e
    }

    function D(e, t, r) {
        for (var a = null; null === a && e;) e = -1 === r ? w(e) : b(e), e && N(e, t) && (a = e);
        return a
    }

    function N(e, t) {
        if (e = a(e), !e || e == document) return !1;
        var r = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t[r] !== this;);
            return r > -1
        };
        return r.call(e, t)
    }

    function L(e) {
        return N(e, ":hover")
    }

    function I(e, t) {
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

    function M(e, t) {
        t = t || {};
        for (var r = t.fromEl || P(e), a = t.positions || ["relative", "absolute", "fixed"]; r && r != bodyNode;) {
            var n = oe(r, "position");
            if (inArray(n, a) && (!t.noOverflow || "hidden" != oe(r, "overflow"))) break;
            r = P(r)
        }
        return r
    }

    function H(e, t) {
        e = a(e);
        for (var r, n, i, o, s = e; s && s.tagName && s !== bodyNode && (r = oe(s, "position"), n = oe(s, "overflow"), i = oe(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === n || ("static" === r ? o && "relative" !== o : "fixed" === o));) "none" !== i ? o = void 0 : "static" !== r && "fixed" !== o && (o = r), s = P(s);
        return s
    }

    function B(e) {
        var t = arguments.length;
        if (t > 1)
            for (var r = 0; t > r; r++) B(arguments[r]);
        else if (e = a(e), e && e.style) {
            var n = e.olddisplay,
                i = "block",
                o = e.tagName.toLowerCase();
            e.style.display = n || "", "none" === oe(e, "display") && (i = J(e, "inline") || J(e, "_inline") ? "inline" : J(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
        }
    }

    function U(e) {
        var t = arguments.length;
        if (t > 1)
            for (var r = 0; t > r; r++) U(arguments[r]);
        else if (e = a(e), e && e.style) {
            var n = oe(e, "display");
            e.olddisplay = "none" != n ? n : "", e.style.display = "none"
        }
    }

    function F(e) {
        return e = a(e), e && e.style ? "none" != oe(e, "display") : !1
    }

    function z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function W(e, t, r) {
        e = a(e), r = r || 0;
        var n = X(e)[1],
            i = V(e)[1],
            o = window,
            s = document.documentElement,
            l = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
            c = a("page_header_cont"),
            d = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            u = vk.staticheader ? Math.max(0, V(c)[1] - d) : V(c)[1];
        if (t) {
            if (d + u + r > n + i) return n + i - d - u - r;
            if (n > d + l - r) return n - d - l + r
        } else {
            if (d + u + r > n) return n - d - u - r;
            if (n + i > d + l - r) return n + i - d - l + r
        }
        return 0
    }

    function $(e, t) {
        return void 0 === t && (t = !F(e)), t ? B(e) : U(e), t
    }

    function q(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function Q(e, t) {
        var r;
        if (t && "inline" == oe(e, "display")) {
            var a = e.getClientRects();
            r = a && a[0] || e.getBoundingClientRect()
        } else r = e.getBoundingClientRect();
        return r
    }

    function X(e, t) {
        if (e = a(e), !e) return [0, 0];
        var r, n, i = {
                top: 0,
                left: 0
            },
            o = e.ownerDocument;
        return o ? (r = o.documentElement, q(e) && (i = Q(e, !0)), n = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [i.left + (t ? 0 : n.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), i.top + (t ? 0 : n.pageYOffset || r.scrollTop) - (r.clientTop || 0)]) : [0, 0]
    }

    function K(e) {
        return null != e && e === e.window
    }

    function V(e, t, r) {
        e = a(e);
        var n, i = [0, 0],
            o = document.documentElement;
        if (t && "border-box" === oe(e, "boxSizing") && (t = !1), e == document) i = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var s = function() {
                i = q(e) && (n = Q(e, r)) && void 0 !== n.width ? [n.width, n.height] : [e.offsetWidth, e.offsetHeight], t && each(i, function(t, r) {
                    var a = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    each(a, function() {
                        i[t] -= parseFloat(oe(e, "padding" + this)) || 0, i[t] -= parseFloat(oe(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (F(e)) s();
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
        return i
    }

    function Y(e) {
        return V(e)[0]
    }

    function G(e) {
        return V(e)[1]
    }

    function J(e, t) {
        return e = a(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
    }

    function Z(e, t) {
        (e = a(e)) && !J(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
    }

    function ee(e, t) {
        return setTimeout(Z.pbind(e, t), 0)
    }

    function te(e, t) {
        (e = a(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }

    function re(e, t) {
        return setTimeout(te.pbind(e, t), 0)
    }

    function ae(e, t, r) {
        return void 0 === r && (r = !J(e, t)), (r ? Z : te)(e, t), r
    }

    function ne(e, t, r) {
        return void 0 === r && (r = !J(e, t)), (r ? ee : re)(e, t), r
    }

    function ie(e, t, r) {
        te(e, t), Z(e, r)
    }

    function oe(e, t, r) {
        if (e = a(e), isArray(t)) {
            var n = {};
            return each(t, function(t, r) {
                n[r] = oe(e, r)
            }), n
        }
        if (!e) return "";
        if (void 0 === r && (r = !0), !r && "opacity" == t && browser.msie) {
            var i = e.style.filter;
            return i ? i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!r && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var o, s = document.defaultView || window;
        if (s.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = s.getComputedStyle(e, null);
            l && (o = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" == t && browser.msie) {
                var i = e.currentStyle.filter;
                return i && i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var c = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            o = e.currentStyle[t] || e.currentStyle[c], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, r) {
                if (!/^\d+(px)?$/i.test(r) && /^\d/.test(r)) {
                    var a = e.style,
                        n = a.left,
                        i = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, a.left = r || 0, o[t] = a.pixelLeft + "px", a.left = n, e.runtimeStyle.left = i
                }
            }), o = o.join(" ")
        }
        if (r && ("width" == t || "height" == t)) {
            var d = V(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            o = (intval(o) ? Math.max(floatval(o), d) : d) + "px"
        }
        return o
    }

    function se(e, t, r) {
        if (e = a(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : be(t))) return each(t, function(t, r) {
                se(e, t, r)
            });
            if ("opacity" == t) browser.msie && ((r + "").length ? 1 !== r ? e.style.filter = "alpha(opacity=" + 100 * r + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== r && (e.style.opacity = r);
            else try {
                var n = "number" == typeof r;
                n && /height|width/i.test(t) && (r = Math.abs(r)), r = n && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? r + "px" : r, e.style[t] !== r && (e.style[t] = r)
            } catch (i) {
                debugLog("setStyle error: ", [t, r], i)
            }
        }
    }

    function le(e, t, r) {
        setTimeout(se.pbind(e, t, r), 0)
    }

    function ce(e, t, r) {
        var n = de(e, "pseudo-id");
        n || (de(e, "pseudo-id", n = irand(1e8, 999999999)), Z(e, "_pseudo_" + n));
        var i = t + "-style-" + n,
            o = a(i),
            s = "._pseudo_" + n + ":" + t + "{";
        o || (o = headNode.appendChild(p("style", {
            id: i,
            type: "text/css"
        }))), each(r, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
    }

    function de(e, t, r) {
        if (!e) return !1;
        var a, n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), r !== a && (vkCache[n] || (vkCache[n] = {}, __debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = r), t ? vkCache[n] && vkCache[n][t] : n
    }

    function ue(e, t, r) {
        return e = a(e), "undefined" == typeof r ? e.getAttribute(t) : (e.setAttribute(t, r), r)
    }

    function pe(e) {
        for (var t = 0, r = arguments.length; r > t; ++t) {
            var a = arguments[t];
            if (void 0 !== e[a]) try {
                delete e[a]
            } catch (n) {
                try {
                    e.removeAttribute(a)
                } catch (n) {}
            }
        }
    }

    function he(e, t) {
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
                    a || he(e)
                }
            } else removeEvent(e), pe(e, vkExpand), delete vkCache[r]
    }

    function fe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var r = a(e[t]);
            r && (he(r), pe(r, "btnevents"))
        }
    }

    function ge(e, t, r) {
        if (e = a(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", r || e.innerText || e.textContent);
            else {
                var n = i("b", e);
                n && n.scrollWidth > n.clientWidth ? e.setAttribute("title", r || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function _e() {
        var e = a("zoom_test_1") || document.body.appendChild(p("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = a("zoom_test_2") || document.body.appendChild(p("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function ve(e, t, r) {
        return (e = a(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !r && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !r && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
    }

    function ye(e, t, r) {
        e = a(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === r || r === !1) && (r = t), e.createTextRange) {
                var n = e.createTextRange();
                n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n.select()
            } else e.setSelectionRange && e.setSelectionRange(t, r)
        } catch (i) {}
    }

    function me(e, t, r) {
        for (e = a(e), r = r || 999; e && !t(e);) {
            if (r--, 0 == r) return !1;
            try {
                if (e = P(e), e == document) break
            } catch (n) {
                e = !1
            }
        }
        return e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.ge = a, t.geByTag = n, t.geByTag1 = i, t.geByClass = o, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = c, t.domQuery1 = d, t.domClosest = u, t.ce = p, t.re = h, t.se = f, t.sech = g, t.rs = _, t.psr = v, t.domReplaceEl = y, t.domEL = m, t.domNS = b, t.domPS = w, t.domFC = E, t.domLC = C, t.domPN = P, t.domChildren = T, t.domInsertBefore = O, t.domInsertAfter = x, t.domByClass = j, t.domData = S, t.domChildIndex = k, t.domCA = A, t.domClosestSibling = D, t.matchesSelector = N, t.isHover = L, t.isAncestor = I, t.getScroll = R, t.domClosestPositioned = M, t.domClosestOverflowHidden = H, t.show = B, t.hide = U, t.isVisible = F, t.clientHeight = z, t.getClientRectOffsetY = W, t.toggle = $, t.boundingRectEnabled = q, t.getXYRect = Q, t.getXY = X, t.isWindow = K, t.getSize = V, t.getW = Y, t.getH = G, t.hasClass = J, t.addClass = Z, t.addClassDelayed = ee, t.removeClass = te, t.removeClassDelayed = re, t.toggleClass = ae, t.toggleClassDelayed = ne, t.replaceClass = ie, t.getStyle = oe, t.setStyle = se, t.setStyleDelayed = le, t.setPseudoStyle = ce, t.data = de, t.attr = ue, t.removeAttr = pe, t.removeData = he, t.cleanElems = fe, t.setTitle = ge, t.getZoom = _e, t.val = ve, t.elfocus = ye, t.traverseParent = me;
    var we = r(8);
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
    }(), window.vkExpand = window.vkExpand || "VK" + (0, we.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}, window.ge = a, window.geByTag = n, window.geByTag1 = i, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = c, window.domQuery1 = d, window.domClosest = u, window.ce = p, window.re = h, window.se = f, window.sech = g, window.rs = _, window.psr = v, window.domReplaceEl = y, window.domEL = m, window.domNS = b, window.domPS = w, window.domFC = E, window.domLC = C, window.domPN = P, window.domChildren = T, window.domInsertBefore = O, window.domInsertAfter = x, window.domByClass = j, window.domData = S, window.domChildIndex = k, window.domCA = A, window.domClosestSibling = D, window.matchesSelector = N, window.isHover = L, window.isAncestor = I, window.getScroll = R, window.domClosestPositioned = M, window.domClosestOverflowHidden = H, window.show = B, window.hide = U, window.isVisible = F, window.clientHeight = z, window.getClientRectOffsetY = W, window.toggle = $, window.boundingRectEnabled = q, window.getXYRect = Q, window.getXY = X, window.isWindow = K, window.getSize = V, window.hasClass = J, window.addClass = Z, window.addClassDelayed = ee, window.removeClass = te, window.removeClassDelayed = re, window.toggleClass = ae, window.toggleClassDelayed = ne, window.replaceClass = ie, window.getStyle = oe, window.setStyle = se, window.setStyleDelayed = le, window.setPseudoStyle = ce, window.data = de, window.attr = ue, window.removeAttr = pe, window.removeData = he, window.cleanElems = fe, window.setTitle = ge, window.getZoom = _e, window.val = ve, window.elfocus = ye, window.traverseParent = me, window.getH = G, window.getW = Y
}, , function(e, t) {
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
}, function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i() {
        return j++ + "-" + Date.now() % 1e6 + "-" + irand(0, 99999)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                var r = [],
                    a = !0,
                    n = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
                } catch (l) {
                    n = !0, i = l
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (n) throw i
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
        s = r(31),
        l = a(s),
        c = r(22),
        d = a(c),
        u = r(38),
        p = a(u),
        h = r(3),
        f = a(h),
        g = r(29),
        _ = r(10),
        v = r(18),
        y = r(8),
        m = r(27),
        b = {
            KeyA: 65,
            KeyZ: 90,
            Backspace: 8,
            Enter: 13,
            Space: 32,
            Delete: 46
        },
        w = [{
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
        E = w.slice().reverse(),
        C = {};
    each(w, function(e, t) {
        C[t.tag] = t
    });
    var P = {};
    each(w, function(e, t) {
        P[t.type] = t
    });
    var T = "footer form h1 h2 h3 h4 h5 h6 header hgroup hr main nav output p pre section table tfoot address article aside blockquote canvas dd div dl dt fieldset figcaption figure",
        O = T.split(" "),
        x = 50,
        j = 1,
        S = function() {
            function e(t, r, a) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                n(this, e), this._id = i(), cur.lang = cur.lang || {}, extend(cur.lang, o.lang), this._els = {
                    editor: ge(t),
                    canvas: se('<div class="article_editor_canvas article" contenteditable="true"></div>')
                }, this._els.editor.appendChild(this._els.canvas), this._els.editor.appendChild(this._photoUploadEl = se('<div class="article_photo_upload"></div>')), addClass(this._els.editor, "article_editor"), this._dirty = [], this._undos = [], this._objects = {}, this._options = o;
                var s = a || [];
                s && 0 != s.length || (s = [(0, _.buildParagraph)({
                    type: this._options.noTitle ? v.ParagraphType.Text : v.ParagraphType.Header1
                })]), s = s.filter(function(e) {
                    return e !== !1
                }), s.forEach(function(e) {
                    e.lines.forEach(function(e) {})
                }), this.createNew(s), this._updateTextPlaceholders(!0), this._restoreLastCursor(), o.coverPhoto && this.setCoverPhoto(o.coverPhoto, !1), (this._options.isPublished || this._options.wasPublished) && this.setPublishName(r.name), this._publishNameCandidate = o.name || this._getName(), this.saveDraft(!1, !0)
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
                    e || t.type != v.ParagraphType.ObjectPhoto || (e = {
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
                    var r = this._isParagraphEmpty(this._getParagraph(0)),
                        a = this._els.canvas.children[0];
                    a.setAttribute("title", getLang("pages_article_title_placeholder")), r ? addClass(a, "article_ed__empty") : removeClass(a, "article_ed__empty");
                    var n = this._isParagraphEmpty(this._getParagraph(1)) && this._ps.length < 3,
                        i = this._els.canvas.children[1];
                    i && (i.setAttribute("title", getLang("pages_article_text_placeholder")), n ? addClass(i, "article_ed__empty") : removeClass(i, "article_ed__empty")), e && this._els.canvas.addEventListener("input", function() {
                        t._updateTextPlaceholders()
                    })
                }
            }, e.prototype.destroy = function() {
                this._els.editor.innerHTML = "", removeClass(this._els.editor, "article_editor"), this._formatTooltip && this._formatTooltip.destroy(), this._objectPickerTooltip && this._objectPickerTooltip.destroy(), this._events.forEach(function(e) {
                    e.el.removeEventListener(e.event, e.handler)
                })
            }, e.prototype.getOptions = function() {
                return this._options
            }, e.prototype.getWidth = function() {
                return arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1, getSize(this._els.canvas)[0]
            }, e.prototype.getPhotoUploadOptions = function() {
                return this._options.photoUploadOptions
            }, e.prototype.getPhotoUploadEl = function() {
                return this._photoUploadEl
            }, e.prototype._parseUrlParagraph = function(e) {
                var t = this,
                    r = this._getParagraph(e);
                if (r.type == v.ParagraphType.Text && r.lines.length && r.lines[0].text) {
                    var a = extractUrls(r.lines[0].text, !0);
                    if (a && 1 == a.length) {
                        var n = a[0],
                            s = n.url,
                            l = this._getCurrentParagraphIndex(),
                            c = o(l, 1),
                            d = c[0],
                            u = s.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/);
                        if (u) {
                            var p = {
                                _uuid: i(),
                                mediaId: u[3],
                                type: v.ParagraphType.ObjectTweet
                            };
                            this._getOrCreateParagraphObject(p), this._ps[d] = p;
                            var h = this._getCursor();
                            return this._redrawModel(), this._restoreCursor(h), void this._saveUndoState(h)
                        }
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
                            value: s
                        })), this._els.shareParseForm.appendChild(ce("input", {
                            type: "hidden",
                            name: "index",
                            value: 1
                        })), window.onUploadDone = function(e) {
                            if (e) {
                                var r = e[2],
                                    a = {
                                        _uuid: i(),
                                        mediaId: e[1]
                                    };
                                switch (e[0]) {
                                    case "doc":
                                        "gif" == r.ext ? extend(a, {
                                            type: v.ParagraphType.ObjectGIF,
                                            _preparedData: {
                                                size: r.video_preview_size,
                                                video: r.video_preview,
                                                href: r.href
                                            }
                                        }) : a = !1;
                                        break;
                                    case "photo":
                                        extend(a, {
                                            type: v.ParagraphType.ObjectPhoto,
                                            _preparedData: {
                                                sizes: r.editable.sizes
                                            }
                                        });
                                        break;
                                    case "video":
                                        extend(a, {
                                            type: v.ParagraphType.ObjectVideo,
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
                                    t._getOrCreateParagraphObject(a), t._ps[d] = a;
                                    var n = t._getCursor();
                                    t._redrawModel(), t._restoreCursor(n), t._saveUndoState(n)
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
                        n = o(a, 2),
                        i = n[0],
                        s = n[1];
                    if ("uuid" == i && s) {
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
                        var n = r[a];
                        "string" === n.kind && ! function() {
                            var e = t._getCurrentParagraphIndex(),
                                r = o(e, 1),
                                a = r[0];
                            n.getAsString(function(e) {
                                var r = extractUrls(e, !0);
                                if (1 === r.length) {
                                    var n = r[0].url,
                                        i = t._getParagraphElByIndex(a);
                                    (0, _.traverseTree)(i, function(e) {
                                        if (e.nodeType == Node.TEXT_NODE && e.textContent.indexOf(n) >= 0) {
                                            var r = traverseParent(e, function(e) {
                                                return e.tagName && "a" == e.tagName.toLowerCase()
                                            }, 3);
                                            if (!r) {
                                                t._saveCursorMarker();
                                                var i = document.createRange();
                                                i.setStart(e, e.textContent.indexOf(n)), i.setEnd(e, e.textContent.indexOf(n) + n.length);
                                                var o = window.getSelection();
                                                o.removeAllRanges(), o.addRange(i), t._setParagraphDirty(a), document.execCommand("createLink", !1, n), t._restoreCursorFromMarker()
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
                        var n = r[a];
                        "file" === n.kind && ! function() {
                            t._photoPasteUploadingProcess = !0;
                            var e = n.getAsFile(),
                                r = new FileReader;
                            r.onload = function() {
                                t._photoPasteUploadingProcess = !1;
                                var a = t._getCurrentParagraphIndex(),
                                    n = o(a, 1),
                                    s = n[0];
                                s = s || 0;
                                var l = (0, _.buildParagraph)({
                                    type: v.ParagraphType.ObjectPhoto,
                                    _uuid: i()
                                });
                                t._getOrCreateParagraphObject(l).setBLOB(e);
                                var c = void 0;
                                t._isParagraphEmpty(t._ps[s]) ? (c = s, t._ps[c] = l) : (c = s + 1, t._insertParagraphAt(c, l)), t._ensureDummyParagraphs(), t._redraw(!0);
                                var d = new Image;
                                d.onload = function() {
                                    t._focusParagraph(c + 1), t._showObjectPicker()
                                }, d.src = r.result
                            }, r.readAsDataURL(e)
                        }()
                    }
            }, e.prototype._isParagraphEmpty = function(e) {
                return !e || !(0, _.isObjectParagraph)(e) && (0 == e.lines.length || 1 == e.lines.length && !e.lines[0].text)
            }, e.prototype._getCurrentSelectionState = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = o(e, 2),
                    r = t[0],
                    a = t[1];
                if (a === !1 || a === !1) return !1;
                for (var n = {
                        decorations: {},
                        header1: !1,
                        header2: !0,
                        header3: !0,
                        header: !1,
                        object: !1,
                        quote: !0,
                        justHeaders: !0
                    }, i = {}, s = 0, l = void 0, c = void 0, d = r; a >= d && d < this._ps.length; d++) {
                    var u = (0, _.isObjectParagraph)(this._ps[d]) ? this._ps[d]._object.getCaptionEl() : this._getParagraphElByIndex(d);
                    if (void 0 === l) {
                        var p = (0, _.getCaretCharacterOffsetWithin)(u),
                            h = o(p, 2);
                        l = h[0], c = h[1]
                    }
                    var f = this._ps[d];
                    f.lines.forEach(function(e) {
                        var t = e.decorations;
                        w.forEach(function(r) {
                            var a = t[r.type];
                            a && !(0, y.isEmpty)(a) && a.forEach(function(t) {
                                var a = [t[0] + s, t[1] + s];
                                if ("link" == r.type) l < a[1] && c > a[0] && (i[r.type] = 1, n.decorations[r.type] = !0);
                                else if (1 == i[r.type]) {
                                    var o = c >= a[0] && c <= a[1];
                                    c > a[1] || (o ? t[0] > 0 ? i[r.type] = -1 : (i[r.type] = 2, n.decorations[r.type] = !0) : i[r.type] = -1)
                                } else if (!i[r.type]) {
                                    var d = l >= a[0] && l <= a[1],
                                        u = c >= a[0] && c <= a[1];
                                    d && u ? (i[r.type] = 2, n.decorations[r.type] = !0) : d && (e.text.length > a[1] ? i[r.type] = -1 : i[r.type] = 1)
                                }
                            })
                        }), s += e.text.length
                    })
                }
                for (var g = r; a >= g && g < this._ps.length; g++)(0, _.isObjectParagraph)(this._ps[g]) ? this._ps[g]._object.getCaptionEl() : this._getParagraphElByIndex(g), (0, _.isObjectParagraph)(this._ps[g]) && (n.captionFocused = n.captionFocused || this._ps[g]._object.isCaptionFocused(), n.object = !0), this._ps[g].type == v.ParagraphType.Header1 && (n.header1 = !0), this._ps[g].type != v.ParagraphType.Header2 && (n.header2 = !1), this._ps[g].type != v.ParagraphType.Header3 && (n.header3 = !1), (0, y.inArray)(this._ps[g].type, [v.ParagraphType.Header1, v.ParagraphType.Header2, v.ParagraphType.Header3]) ? n.header = !0 : n.justHeaders = !1, (0, y.inArray)(this._ps[g].type, [v.ParagraphType.Quote, v.ParagraphType.Quote2]) || (n.quote = !1);
                return n.multiline = r != a, n
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
                    var r = se('\n        <div>\n          <div class="article_format_btns clear_fix"></div>\n          <div class="article_set_link"><input type="text" placeholder="Enter link"/><div class="article_set_link_delete"></div></div>\n        </div>'),
                        a = void 0;
                    this._formatTooltip = new ElementTooltip(this._els.editor, {
                        cls: "article_format_tt",
                        content: r,
                        customShow: !0,
                        offset: [0, -3],
                        onShow: function() {
                            var e = t._getCurrentSelectionState();
                            if (e) {
                                var a = [],
                                    n = e.header1;
                                if (n = n || e.object && !e.captionFocused, n || (e.justHeaders || a.push(["strong", "cur.articleEditor.setStrong()", !!e.decorations.strong]), e.quote || e.justHeaders || a.push(["em", "cur.articleEditor.setEm()", !!e.decorations.em]), a.push(["strike", "cur.articleEditor.setStrike()", !!e.decorations.strike]), e.decorations.link ? a.push(["link", "cur.articleEditor.clearLink()", e.decorations.link]) : a.push(["link", "cur.articleEditor.setLinkMode(true)", e.decorations.link]), e.object || (a.push(["header1", "cur.articleEditor.setHeader1(" + intval(e.header2) + ")", e.header2]), a.push(["header2", "cur.articleEditor.setHeader2(" + intval(e.header3) + ")", e.header3]), a.push(["quote", "cur.articleEditor.setQuote()", e.quote]))), 0 == a.length) return void t._formatTooltip.hide();
                                var i = geByClass1("article_format_btns", r);
                                i.innerHTML = "", a.forEach(function(e, t) {
                                    t > 0 && (0, y.inArray)(e[0], ["header1"]) && i.appendChild(se('<div class="article_format_divider"></div>'));
                                    var r = e[2] ? "article_format_btn_active" : "";
                                    i.appendChild(se('<button class="article_format_btn ' + r + '" id="article_format_btn_' + e[0] + '" onclick="' + e[1] + '"></button>'))
                                }), t.setLinkMode(!1)
                            }
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
                    var n = geByTag1("input", r);
                    n.addEventListener("keypress", function(e) {
                        return e.keyCode == b.Enter ? (t._setLinkToSelectedText(n.value.trim()), t._formatTooltip.hide(), cancelEvent(e)) : void 0
                    })
                }
                e ? (this._linkTooltip && this._linkTooltip.isShown() && this._linkTooltip.hide(), this._formatTooltip.show(), this._formatTooltip.getOptions().onShow(), this._formatTooltip.updatePosition()) : (this._formatTooltip.hide(), this._formatTooltip.linkMode && this.setLinkMode(!1, !0))
            }, e.prototype._setLinkToSelectedText = function(e) {
                e.match("^https?://") || (e = "http://" + e.substr(0, 1500)), this.setLinkMode(!1, !1), this._restoreCursor(this._linkCursor), this._setAllParagraphsDirty(), document.execCommand("createLink", !1, clean(e)), this._restoreCursor(this._linkCursor)
            }, e.prototype.clearLink = function() {
                this.setLinkMode(!1), this._setCurrentParagraphDirty(), document.execCommand("unlink", !1)
            }, e.prototype.setLinkMode = function(e, t) {
                e && (browser.msie || document.execCommand("superscript", !1, !0));
                var r = this._formatTooltip.getContent();
                if (this._formatTooltip.linkMode != !!e)
                    if (e) {
                        var a = geByTag1("input", r);
                        a.value = "", addClass(r, "article_editor_format_tt_set_link"), this._linkCursor = this._getCursor(), a.focus(), this._formatTooltip.linkMode = !0, this._formatTooltip.updatePosition()
                    } else setStyle(r, {
                        width: null
                    }), removeClass(r, "article_editor_format_tt_set_link"), this._formatTooltip.linkMode = !1, t && (this._setAllParagraphsDirty(), this._triggerInputEvent())
            }, e.prototype.setHeader1 = function(e) {
                this._setHeader(v.ParagraphType.Header2, !e)
            }, e.prototype.setHeader2 = function(e) {
                this._setHeader(v.ParagraphType.Header3, !e)
            }, e.prototype.setQuote = function() {
                function e(e) {
                    return !(0, _.isObjectParagraph)(e) && !(0, _.isListParagraph)(e)
                }
                var t = this._getCursor(),
                    r = this._getCurrentParagraphIndex(),
                    a = o(r, 2),
                    n = a[0],
                    i = a[1];
                if (n !== !1) {
                    i || (i = n);
                    for (var s = v.ParagraphType.Text, l = n; i >= l; l++)
                        if (e(this._ps[l])) {
                            s = this._ps[l].type == v.ParagraphType.Quote ? v.ParagraphType.Quote2 : this._ps[l].type == v.ParagraphType.Quote2 ? v.ParagraphType.Text : v.ParagraphType.Quote;
                            break
                        }
                    for (var c = n; i >= c; c++) {
                        var d = this._ps[c];
                        e(d) && (this._ps[c] = (0, _.buildParagraph)({
                            type: s,
                            lines: [d.lines[0]]
                        }), this._setParagraphDirty(c))
                    }
                    this._redraw(!0), this._updateTextPlaceholders(), this._restoreCursor(t), this._saveUndoState(), this.saveDraft()
                }
            }, e.prototype._setHeader = function(e, t) {
                var r = this._getCursor();
                this._setAllParagraphsDirty(), t ? document.execCommand("formatBlock", !1, e == v.ParagraphType.Header2 ? "H2" : "H3") : document.execCommand("formatBlock", !1, "P"), this._restoreCursor(r)
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
                    }), this._undos.length > x && this._undos.shift()
                }
                var r = !0;
                this._undoStateDelayed = clone(this._getCleanedState(r), !0)
            }, e.prototype._undo = function() {
                if (this._undos.length) {
                    var e = this._undos.pop();
                    this._ps = e.ps, this._redraw(!0), this._restoreCursor(e.cursor), this._updateTextPlaceholders(), delete this._undoStateDelayed, this._saveUndoState()
                }
            }, e.prototype.createNew = function(e) {
                this._ps = e, this._ensureDummyParagraphs(), this._init()
            }, e.prototype._getParagraphFromHTML = function(e, t) {
                function r(e, t) {
                    e.nodeType == Node.TEXT_NODE ? t.text += (0, _.cleanTextSpaces)(clean(e.data)) : "BR" == e.nodeName && t.text.length > 0 && t.brs.push(t.text.length), each(e.childNodes, function(a, n) {
                        var i = [t.text.length];
                        if ("br" != n.nodeName.toLowerCase() || a != e.childNodes.length - 1) {
                            r(n, t), i.push(t.text.length);
                            var o = (n.tagName || "").toLowerCase();
                            n.style && parseInt(n.style.fontWeight) > 400 && (o = "strong");
                            var s = void 0;
                            switch (o) {
                                case "b":
                                case "strong":
                                    s = P.strong;
                                    break;
                                case "em":
                                case "i":
                                    s = P.em;
                                    break;
                                case "s":
                                case "strike":
                                case "del":
                                    s = P.strike;
                                    break;
                                case "a":
                                    s = P.link, i.push(n.getAttribute("href") || "")
                            }
                            s && (t.decorations[s.type] = t.decorations[s.type] || [], i[0] < i[1] && t.decorations[s.type].push(i), t.decorations[s.type] = (0, _.mergeRanges)(t.decorations[s.type]))
                        }
                    })
                }
                var a = document.createElement("div");
                a.innerHTML = t;
                var n = "ol" == e || "ul" == e,
                    i = [],
                    o = void 0,
                    s = {};
                if (n) {
                    switch (e) {
                        case "ol":
                            o = v.ParagraphType.NumericList;
                            break;
                        case "ul":
                            o = v.ParagraphType.BulletList
                    }
                    for (var l = 0, c = a.children.length; c > l; l++) {
                        var d = {
                            text: "",
                            decorations: {},
                            brs: []
                        };
                        r(a.children[l], d), d.brs = (0, _.arrayClear3Repetitions)(d.brs), i.push(d)
                    }
                } else {
                    switch (e) {
                        case "h1":
                            o = v.ParagraphType.Header1;
                            break;
                        case "h2":
                        case "header":
                            o = v.ParagraphType.Header2;
                            break;
                        case "h3":
                        case "h4":
                            o = v.ParagraphType.Header3;
                            break;
                        case "blockquote":
                            o = v.ParagraphType.Quote;
                            break;
                        case "cite":
                            o = v.ParagraphType.Quote2;
                            break;
                        default:
                            o = v.ParagraphType.Text
                    }
                    var u = a.firstElementChild;
                    if ((0, _.isObjectParagraphEl)(u)) {
                        var p = u.getAttribute("data-type"),
                            h = u.getAttribute("data-media-id"),
                            f = JSON.parse(u.getAttribute("data-data") || "{}");
                        p && h && (a = geByTag1("figure", u), o = p, s.mediaId = h, s._preparedData = f)
                    }
                    var g = {
                        text: "",
                        decorations: {},
                        brs: []
                    };
                    r(a, g), g.brs = (0, _.arrayClear3Repetitions)(g.brs), i.push(g), (0, _.isHeaderParagraph)(o) || (0 == g.text.indexOf("1. ") ? (o = v.ParagraphType.NumericList, this._removeParagraphLineTextPart(g, 0, "1. ".length)) : 0 == g.text.indexOf("* ") && (o = v.ParagraphType.BulletList, this._removeParagraphLineTextPart(g, 0, "* ".length))), g.brs = g.brs.filter(function(e) {
                        return e > 0
                    })
                }
                return s.lines = i, s.type = o, (0, _.buildParagraph)(s)
            }, e.prototype._removeParagraphLineTextPart = function(e, t, r) {
                e.text = e.text.substring(0, t) + e.text.substring(r);
                for (var a = r - t, n = 0, i = e.brs.length; i > n; n++) {
                    var o = e.brs[n];
                    o > t && r > o ? e.brs[n] = void 0 : e.brs[n] > t && e.brs[n] >= r && (e.brs[n] -= a)
                }
                e.brs = e.brs.filter(function(e) {
                    return void 0 !== e
                }), each(e.decorations, function(n, i) {
                    i.forEach(function(e) {
                        e[0] <= t && e[1] <= t || (e[0] <= t && e[1] <= r ? e[1] = t : e[0] >= t && e[1] <= r ? e[0] = e[1] = void 0 : e[0] >= t && e[1] > r ? (e[0] = t, e[1] -= a) : (e[0] -= a, e[1] -= a))
                    }), e.decorations[n] = e.decorations[n].filter(function(e) {
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
                    n = "",
                    i = "",
                    o = parseInt(e.type);
                switch (o) {
                    case v.ParagraphType.NumericList:
                        a = "ol", n = "li";
                        break;
                    case v.ParagraphType.BulletList:
                        a = "ul", n = "li";
                        break;
                    case v.ParagraphType.Header1:
                        n = "h1";
                        break;
                    case v.ParagraphType.Header2:
                        n = "h2";
                        break;
                    case v.ParagraphType.Header3:
                        n = "h3";
                        break;
                    case v.ParagraphType.Quote:
                        n = "blockquote";
                        break;
                    case v.ParagraphType.Quote2:
                        n = "cite";
                        break;
                    default:
                        a = "p"
                }
                return e.lines.forEach(function(e) {
                    function a(e, t) {
                        for (var r = []; e > 0;) {
                            var a = d[--e];
                            if (a)
                                for (var n in a.open)
                                    if (a.open.hasOwnProperty(n)) {
                                        if (n == t) return [];
                                        r.push(n)
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
                    each(w, function(e, t) {
                        var r = c[t.type];
                        if (r)
                            for (var n = function(e, n) {
                                    var i = r[n],
                                        o = d[i[0]] = d[i[0]] || {
                                            open: {},
                                            close: {}
                                        };
                                    o.open[t.type] = s(i);
                                    var l = d[i[1]] = d[i[1]] || {
                                            open: {},
                                            close: {}
                                        },
                                        c = a(i[1], t.type);
                                    c.forEach(function(e) {
                                        l.close[e.type] = !0
                                    }), l.close[t.type] = !0, c.forEach(function(e) {
                                        l.open[e.type] = s(i)
                                    })
                                }, i = 0, o = r.length; o > i; i++) n(o, i)
                    });
                    var u = 0,
                        p = [];
                    d.forEach(function(t, r) {
                        if (t) {
                            if (r > 0) {
                                var a = (0, _.prepareLineText)(l, u, r, e.brs);
                                p.push(a)
                            }
                            each(E, function(e, r) {
                                var a = t.close[r.type];
                                void 0 !== a && p.push("</" + r.tag + ">")
                            }), each(w, function(e, r) {
                                var a = t.open[r.type];
                                void 0 !== t.open[r.type] && (a === !0 ? p.push("<" + r.tag + ">") : p.push("<" + r.tag + ' href="' + clean(a) + '">'))
                            }), u = r
                        }
                    }), p.push((0, _.prepareLineText)(l, u, void 0, e.brs)), n && (i = i ? " " + i : "", r += "<" + n + i + ">"), (0, y.inArray)(o, [v.ParagraphType.Quote, v.ParagraphType.Quote2]) && (r += "<p>"), r += p.join("") || (t ? "" : "<br/>"), (0, y.inArray)(o, [v.ParagraphType.Quote, v.ParagraphType.Quote2]) && (r += "</p>"), n && (r += "</" + n + ">")
                }), [a, r]
            }, e.prototype._renderParagraph = function(e) {
                var t = (0, _.isObjectParagraph)(e),
                    r = this._renderParagraphLines(e, t),
                    a = o(r, 2),
                    n = a[0],
                    i = a[1],
                    s = void 0;
                return s = t ? this._renderObjectParagraph(e, i) : n ? se("<" + n + ">" + i + "</" + n + ">") : se(i), addClass(s, "_article_paragraph"), addClass(s, "article_paragraph"), addClass(s, "_article_p"), s
            }, e.prototype._getParagraphElByIndex = function(e) {
                return e === !1 ? null : this._els.canvas.children[e] || null
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
                var t = (0, _.getElementIndex)(e);
                return [e, t, this._getParagraph(t)]
            }, e.prototype._getCurrentParagraphIndex = function() {
                var e = window.getSelection();
                if (e.rangeCount) {
                    var t = e.getRangeAt(0);
                    if (t.startContainer == this._els.canvas) return [t.startOffset, t.endOffset];
                    var r = this._getContainingParagraphEl(t.startContainer),
                        a = o(r, 2),
                        n = a[1],
                        i = t.endContainer;
                    if (0 === t.endOffset) {
                        var s = this._isParagraphEl(i) || this._isParagraphEl(domPN(i)) && 0 == (0, _.childNodeIndex)(i);
                        if (s) {
                            var l = this._getContainingParagraphEl(i),
                                c = o(l, 1),
                                d = c[0];
                            i = (0, m.domPS)(d) || d
                        }
                    }
                    var u = this._getContainingParagraphEl(i),
                        p = o(u, 2),
                        h = p[1];
                    return [n, Math.max(n, h)]
                }
                return [0, !1]
            }, e.prototype._saveCursorMarker = function() {
                function e(e, t, r) {
                    if (e.nodeType == Node.TEXT_NODE) {
                        var a = e.textContent;
                        e.textContent = a.substring(0, t) + r + a.substring(t)
                    } else {
                        var n = document.createTextNode(r);
                        e.insertBefore(n, e.childNodes[t])
                    }
                }
                var t = (0, _.getRange)(),
                    r = o(t, 2),
                    a = r[0],
                    n = r[1];
                if (!a) return [0, 0];
                var i = a.startContainer,
                    s = a.startOffset,
                    l = a.endContainer,
                    c = a.endOffset;
                if (i != this._els.canvas) {
                    var d = this._getContainingParagraphEl(i)[1],
                        u = void 0;
                    e(i, s, _.CURSOR_MARKER_START), n || (u = this._getContainingParagraphEl(l)[1], u == d && (c += 1), e(l, c, _.CURSOR_MARKER_END))
                }
            }, e.prototype._restoreCursorFromMarker = function() {
                var e = this,
                    t = function(e, t, r) {
                        function a(t) {
                            if (t.nodeType == Node.TEXT_NODE) {
                                var n = t.textContent.indexOf(e);
                                if (n >= 0) {
                                    t.textContent = t.textContent.split(e).join("");
                                    var i = t.parentElement;
                                    return -1 != i.innerHTML.search(/\s$/) && (i.innerHTML = i.innerHTML.trimRight() + _.NBSP, r && r[0] == t && (r[0] = i.lastChild), t = i.lastChild), i.innerHTML || (t = i, t.innerHTML = "<br/>", n = 0), [t, n]
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
                    n = void 0;
                for (n = 0; n < this._els.canvas.children.length && !(r = t(_.CURSOR_MARKER_START, this._els.canvas.children[n])); n++);
                for (; n < this._els.canvas.children.length && !(a = t(_.CURSOR_MARKER_END, this._els.canvas.children[n], r)); n++);
                if (r) {
                    var i = document.createRange();
                    r[0].nodeType == Node.TEXT_NODE && (r[1] = Math.min(r[1], r[0].textContent.length)), i.setStart(r[0], r[1]), a && (a[0].nodeType == Node.TEXT_NODE && (a[1] = Math.min(a[1], a[0].textContent.length)), i.setEnd(a[0], a[1]));
                    var o = window.getSelection();
                    o.removeAllRanges(), o.addRange(i)
                }
                var s = function(t) {
                    e._ps.forEach(function(e) {
                        e.lines.forEach(function(e) {
                            var r = e.text.indexOf(t);
                            if (r >= 0) {
                                e.text = e.text.replace(t, "");
                                for (var a = 0, n = 0; n < e.brs.length; n++) e.brs[n] > r && (a = 1), e.brs[n] -= a;
                                each(w, function(t, a) {
                                    var n = e.decorations[a.type];
                                    if (n)
                                        for (var i = 0, o = n.length; o > i; i++) {
                                            var s = n[i];
                                            s[0] > r && (s[0] -= 1), s[1] > r && (s[1] -= 1)
                                        }
                                })
                            }
                        })
                    })
                };
                s(_.CURSOR_MARKER_START), s(_.CURSOR_MARKER_END)
            }, e.prototype._setAllParagraphsDirty = function() {
                this._dirty = [];
                for (var e = this._els.canvas.children.length, t = 0; e > t; t++) this._dirty.push(t);
                this._ps = []
            }, e.prototype._setCurrentParagraphDirty = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = o(e, 2),
                    r = t[0],
                    a = t[1];
                this._setParagraphDirty(r), this._setParagraphDirty(a)
            }, e.prototype._setParagraphDirty = function(e, t) {
                if (void 0 === e || 0 > e) throw new Error("Invalid paragraph index");
                t = t || e;
                for (var r = e; t >= r; r++)(0, y.inArray)(r, this._dirty) || this._dirty.push(r)
            }, e.prototype._processAlienPhotos = function() {
                var e = this;
                if (!this._photoPasteUploadingProcess)
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                        if (!(0, _.isObjectParagraphEl)(r) || !this._isTrackedObjectEl(r))
                            for (var a = Array.prototype.slice.call(geByTag("img", r)), n = void 0, o = function() {
                                    if (!n.src || !domPN(r) || !isVisible(n)) return "continue";
                                    var t = traverseParent(n, function(e) {
                                            return "FIGURE" == e.tagName
                                        }, 10),
                                        a = t ? geByTag1("figcaption", t) : !1,
                                        o = (0, _.buildParagraph)({
                                            type: v.ParagraphType.ObjectPhoto,
                                            _uuid: i(),
                                            _preparedData: {
                                                size: [n.width, n.height]
                                            }
                                        }),
                                        s = e._renderObjectParagraph(o, a ? a.innerHTML : "");
                                    (0, _.justCursorInString)(r.textContent) ? (domReplaceEl(r, s), re(n), domInsertAfter(se("<p>" + _.CURSOR_MARKER_START + "</p>"), s)) : (domInsertAfter(s, domPN(n)), re(a), re(n)), traverseParent(s, function(t) {
                                        return t == e._els.canvas ? !0 : void removeClass(t, _.ArticleEditorParagraphClass)
                                    }), (0, _.queuePhotoProcess)(n.src, function(t, r, a) {
                                        if (t) re(s), e._forgetObject(o._uuid), a();
                                        else {
                                            var n = e._getOrCreateParagraphObject(o);
                                            n.setBLOB(r, a)
                                        }
                                    })
                                }; n = a.shift();) o()
            }, e.prototype._flattenAlienParagraphs = function() {
                var e = this;
                if (this._fromPasteEvent) {
                    for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0, a = this._fromPasteEvent, n = this._pasteCurrentIndex, i = this._getCurrentParagraphIndex(), s = o(i, 1), l = s[0], c = -1, d = function() {
                            function t(e) {
                                if (this._isTrackedObjectEl(e)) return void domInsertBefore(e, r);
                                var a = e.tagName.toLowerCase();
                                if (hasClass(e, "_im_stack_messages") && (a = "div"), (0, y.inArray)(a, O)) {
                                    for (var n = Array.prototype.slice.call(e.childNodes), o = void 0, s = ""; o = n.shift();)
                                        if (o.nodeType != Node.TEXT_NODE) {
                                            if (s) {
                                                var l = se("<p>" + s + "</p>");
                                                domInsertBefore(l, r), s = ""
                                            }
                                            t.call(this, o)
                                        } else s += o.textContent;
                                    if (s) {
                                        var c = se("<p>" + s + "</p>");
                                        domInsertBefore(c, r)
                                    }
                                    i = !0
                                } else e != r && trim(e.textContent) && (domInsertBefore(e, r), i = !0)
                            }
                            c++;
                            var i = !1;
                            if (a && !trim(r.textContent) && c > n && l >= c) return re(r), "continue";
                            var o = r;
                            (0, _.isQuoteEl)(r) && !(0, _.isAlienParagraphEl)(r) && (o = r.firstChild);
                            var s = (0, _.traverseTree)(o, function(e, t) {
                                if (!t) {
                                    var r = e.tagName.toLowerCase();
                                    return (0, y.inArray)(r, O) ? !0 : void 0
                                }
                            });
                            return s ? (t.call(e, r, !0), void(i && re(r))) : "continue"
                        }; r = t.shift();) d();
                    this._setAllParagraphsDirty()
                }
            }, e.prototype._correctCaptionSelection = function() {
                var e = (0, _.getRange)(),
                    t = o(e, 3),
                    r = t[0],
                    a = t[1],
                    n = t[2];
                if (r && !a) {
                    var i = traverseParent(r.startContainer, function(e) {
                        return "FIGCAPTION" == e.tagName
                    }, 5);
                    if (i && r.endContainer != r.startContainer && r.endContainer.nodeType == Node.ELEMENT_NODE && (0, _.isParagraphEl)(r.endContainer) && 0 == r.endOffset && 0 == r.startOffset) {
                        var s = geByClass1("article_ed__figcaption_edit", i),
                            l = r.cloneRange();
                        l.selectNodeContents(s), n.removeAllRanges(), n.addRange(l)
                    }
                }
            }, e.prototype._getCleanedState = function(e) {
                var t = [];
                return this._ps.forEach(function(r) {
                    var a = {};
                    each(r, function(t, r) {
                        (!t.startsWith("_") || e && "_uuid" === t) && (a[t] = isObject(r) || isArray(r) ? clone(r, !0) : r)
                    }), (0, _.isObjectParagraph)(r) && r._object && (a.mediaId = r._object.getMediaId()), t.push(a)
                }), t
            }, e.prototype.saveDraft = function(e, t, r) {
                var a = this;
                clearTimeout(this._draftSaveTO);
                var n = JSON.stringify({
                    paragraphs: this._getCleanedState()
                });
                return t ? void(this._lastSavedDraft = n) : this._lastSavedDraft != n || e ? (this._options.onDraftNotSaved && this._options.onDraftNotSaved(), void(this._draftSaveTO = setTimeout(function() {
                    a._lastSavedDraft = n, a.save(!1, function(e, t, r) {
                        a._initDraftSave = !0, a._options.onDraftSaved && a._options.onDraftSaved(e, t, r)
                    })
                }, r ? 0 : 1e3 * this._options.draftSaveDelay))) : void(!t && this._initDraftSave && this._options.onDraftSaved && this._options.onDraftSaved(!1, this.getArticleId()))
            }, e.prototype._getName = function() {
                if (this._publishName) return this._publishName;
                var e = this._getCleanedState(),
                    t = e.length ? e[0].lines[0].text : "";
                return (0, _.generateLatinizedName)(t, this._options.maxNameLength)
            }, e.prototype.save = function(e, t, r) {
                var a = this,
                    n = this._getCleanedState(),
                    i = this._getName(),
                    o = this.getCoverPhoto();
                void 0 === o && e && (o = this.getFirstCoverPhotoFromParagraphs()), ajax.post("al_articles.php", extend({
                    act: "save",
                    article_id: this.getArticleId(),
                    article_owner_id: this.getArticleOwnerId(),
                    hash: this._getSaveDraftHash(),
                    cover_photo_id: o ? o.id : "",
                    name: i,
                    is_published: intval(e || !1),
                    Article_text: JSON.stringify(n)
                }, r || {}), {
                    onDone: function(r, n, o, s) {
                        r || (n && (a._options.articleId = n), "al_articles.php" != nav.objLoc[0] || nav.objLoc.article_id || nav.setLoc(extend({}, nav.objLoc, {
                            article_id: a.getArticleOwnerId() + "_" + a.getArticleId()
                        })), a._publishNameCandidate = i, e && (a._options.isPublished = !0)), t && t(r, n, o, s)
                    }
                })
            }, e.prototype.getArticleId = function() {
                return this._options.articleId
            }, e.prototype.getArticleOwnerId = function() {
                return this._options.articleOwnerId
            }, e.prototype._getSaveDraftHash = function() {
                return this._options.saveDraftHash
            }, e.prototype._expandBlockquoteParagraphs = function(e) {
                for (var t = Array.prototype.slice.call(this._els.canvas.children), r = void 0; r = t.shift();)
                    if ((0, _.isQuoteEl)(r)) {
                        var a = Array.prototype.slice.call(r.children),
                            n = a[0];
                        if (1 == a.length && n && n.tagName && (0, y.inArray)(n.tagName, ["H1", "H2", "H3"])) {
                            domReplaceEl(r, n);
                            continue
                        }
                        if (a.shift(), a.length)
                            for (var i = void 0; i = a.shift();) {
                                if (this._saveCursorMarker(), e) domInsertAfter(i, r);
                                else {
                                    var o = se("<blockquote></blockquote>");
                                    o.appendChild(i), domInsertAfter(o, r)
                                }
                                this._restoreCursorFromMarker()
                            }
                    }
            }, e.prototype._ensureDummyParagraphs = function() {
                1 == this._ps.length && this._ps.push((0, _.buildParagraph)({
                    type: v.ParagraphType.Text
                })), (0, _.isObjectParagraph)(this._ps[this._ps.length - 1]) && this._ps.push((0, _.buildParagraph)({
                    type: v.ParagraphType.Text
                }))
            }, e.prototype._ensureAtLeastOneParagraph = function() {
                0 == this._ps.length && (this._ps = [(0, _.buildParagraph)({
                    type: v.ParagraphType.Text
                })])
            }, e.prototype._ensureTitleParagraph = function() {
                var e = this;
                this._options.noTitle || this._ps[0].type != v.ParagraphType.Header1 && (this._ps[0].type = v.ParagraphType.Header1), this._ps.forEach(function(t, r) {
                    (e._options.noTitle || 0 != r) && (1 == r && t.type == v.ParagraphType.Header1 && (t.type = v.ParagraphType.Text), t.type == v.ParagraphType.Header1 && (t.type = v.ParagraphType.Header2))
                })
            }, e.prototype._insertParagraphAt = function(e, t) {
                this._ps.splice(e, 0, t)
            }, e.prototype._focusParagraph = function(e) {
                (0, _.focusEl)(this._getParagraphElByIndex(e))
            }, e.prototype._init = function() {
                this._redraw(!0), this._initEvents(), this._initLinksHrefTooltip(), this._saveUndoState()
            }, e.prototype._redrawModel = function() {
                this._saveCursorMarker(), this._setCurrentParagraphDirty(), this._dirty.forEach(function(e) {}), this._redraw(!0), this._dirty = []
            }, e.prototype.addObjectVideo = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = o(t, 1),
                    a = r[0],
                    n = showBox("al_video.php", {
                        act: "a_choose_video_box",
                        to_id: vk.id
                    });
                cur.chooseMedia = function(t, r, o) {
                    n.hide();
                    var s = (0, _.buildParagraph)({
                        _uuid: i(),
                        type: v.ParagraphType.ObjectVideo,
                        mediaId: r,
                        _preparedData: {
                            editable: o.editable,
                            thumb: o.thumb,
                            duration: o.editable.duration,
                            platform: o.editable.platform
                        }
                    });
                    e._getOrCreateParagraphObject(s), e._ps[a] = s, e._redrawModel(), e._saveUndoState();
                    var l = e._getParagraphElByIndex(a);
                    (0, _.focusEl)(l)
                }
            }, e.prototype.addObjectDoc = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = o(t, 1),
                    a = r[0];
                cur.docsCurFilter = "gif";
                var n = showBox("docs.php", {
                    act: "a_choose_doc_box",
                    from: "article",
                    ext_filter: "gif"
                }, {
                    stat: ["docs.css"]
                });
                cur.chooseMedia = function(t, r, o) {
                    n.hide();
                    var s = (0, _.buildParagraph)({
                        _uuid: i(),
                        type: v.ParagraphType.ObjectGIF,
                        mediaId: r,
                        _preparedData: {
                            video: o.video_preview,
                            size: o.video_preview_size,
                            href: o.href
                        }
                    });
                    e._getOrCreateParagraphObject(s), e._insertParagraphAt(a, s), e._redrawModel(), e._saveUndoState()
                }, cur.showMediaProgress = function() {}
            }, e.prototype.addObjectPhoto = function() {
                var e = this,
                    t = this._getCurrentParagraphIndex(),
                    r = o(t, 1),
                    a = r[0],
                    n = showBox("al_photos.php", {
                        to_id: vk.id,
                        act: "choose_photo",
                        max_files: 10,
                        article: 1
                    }, {
                        cache: 1,
                        stat: ["photos.js", "photos.css", "upload.js"],
                        dark: 1
                    });
                cur.chooseMedia = function(t, r, o, s) {
                    var l = (0, _.buildParagraph)({
                        _uuid: i(),
                        type: v.ParagraphType.ObjectPhoto,
                        mediaId: r,
                        _preparedData: {
                            size: (0, _.getPhotoSize)(o.editable.sizes),
                            sizes: o.editable.sizes
                        }
                    });
                    e._getOrCreateParagraphObject(l);
                    var c = e._renderObjectParagraph(l, ""),
                        d = e._getParagraphElByIndex(a + intval(s));
                    domInsertBefore(c, d), (0, _.focusEl)(d), e._setAllParagraphsDirty(), e._triggerInputEvent(), e._saveUndoState(), void 0 === s && n.hide()
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
                    n = r[1];
                if (a !== !1 && a == n && this._isParagraphEmpty(this._ps[a]) && this._ps[a] && (0, y.inArray)(this._ps[a].type, [v.ParagraphType.Text, v.ParagraphType.Header2, v.ParagraphType.Header3])) {
                    show(this._objectPickerEl);
                    var i = this._getParagraphElByIndex(a),
                        s = getXY(this._els.editor),
                        l = getXY(i);
                    setStyle(this._objectPickerEl, {
                        left: -40,
                        top: l[1] - s[1] - 3
                    })
                } else hide(this._objectPickerEl)
            }, e.prototype._initLinksHrefTooltip = function() {
                var e = this;
                this._els.canvas.addEventListener("mouseover", function(t) {
                    if ("a" == t.target.tagName.toLowerCase()) {
                        if (e._linkTooltip && e._linkTooltip.destroy(), e._formatTooltip && e._formatTooltip.isShown()) return;
                        var r = t.target,
                            a = r.getAttribute("href");
                        e._linkTooltip = new ElementTooltip(r, {
                            cls: "article_editor_link_show_tt",
                            appendTo: e._els.editor,
                            content: se('<a target="_blank" href="' + unclean(a) + '" class="article_editor_link">' + a + "</a>")
                        })
                    }
                })
            }, e.prototype._isTrackedObjectEl = function(e) {
                var t = domData(e, "uuid");
                return t ? !!this._getObject(t) : !1
            }, e.prototype._cloneObjectParagraphs = function() {
                for (var e = Array.prototype.slice.call(this._els.canvas.children), t = void 0, r = {}; t = e.shift();)
                    if ((0, _.isObjectParagraphEl)(t)) {
                        var a = t.getAttribute("data-uuid"),
                            n = parseInt(t.getAttribute("data-type"));
                        if (r[a]) {
                            var o = this._getObject(a);
                            a = i(), this._getOrCreateParagraphObject({
                                type: n,
                                _uuid: a,
                                mediaId: o.getMediaId(),
                                _preparedData: clone(o.getPreparedData(), !0)
                            }), t.setAttribute("data-uuid", a)
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
                    r.nodeType == Node.TEXT_NODE ? e.textOffset = a : e.nodeOffset = a, traverseParent(r, function(r) {
                        return r == t ? !0 : ((0, _.isQuoteEl)(r) && r.firstChild && r.firstChild.nodeType == Node.ELEMENT_NODE && "p" == r.firstChild.tagName.toLowerCase() && e.path.pop(), void e.path.push((0, _.childNodeIndex)(r)))
                    }, 10), e.path = e.path.slice().reverse()
                }
                var t = this._els.canvas,
                    r = (0, _.getRange)(),
                    a = o(r, 2),
                    n = a[0],
                    i = a[1];
                if (!n) return !1;
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
                return e(s.start, n.startContainer, n.startOffset), i ? delete s.end : e(s.end, n.endContainer, n.endOffset), s
            }, e.prototype._restoreCursor = function(e) {
                function t(e) {
                    var t = r;
                    e.path.forEach(function(r, n) {
                        if ((0, _.isQuoteEl)(t)) {
                            var i = t.firstChild;
                            i && 1 == n && i.nodeType == Node.ELEMENT_NODE && "p" == i.tagName.toLowerCase() && (t = i)
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
                    var n = t(e.start),
                        i = o(n, 2),
                        s = i[0],
                        l = i[1];
                    if (a.setStart(s, l), e.end) {
                        var c = t(e.end),
                            d = o(c, 2),
                            u = d[0],
                            p = d[1];
                        a.setEnd(u, p)
                    }
                    var h = window.getSelection();
                    h.removeAllRanges(), h.addRange(a)
                } catch (f) {
                    debugLog(f)
                }
            }, e.prototype._saveLastCursor = function() {
                var e = this._getCursor();
                this.getArticleId() && e && ls.set("article_cursor_" + this.getArticleOwnerId() + "_" + this.getArticleId(), JSON.stringify(e))
            }, e.prototype._restoreLastCursor = function() {
                if (this.getArticleId()) {
                    var e = ls.get("article_cursor_" + this.getArticleOwnerId() + "_" + this.getArticleId());
                    e && (e = JSON.parse(e), this._restoreCursor(e))
                } else(0, _.focusEl)(this._els.canvas.firstChild)
            }, e.prototype._replaceAlienInlineTags = function() {
                function e(a) {
                    var n = a.tagName.toLowerCase();
                    if (r[n]) {
                        t || (this._saveCursorMarker(), t = !0);
                        var i = ce(r[n], {
                            innerHTML: a.innerHTML
                        });
                        domReplaceEl(a, i)
                    } else
                        for (var o = Array.prototype.slice.call(a.childNodes), s = void 0; s = o.shift();) s.nodeType == Node.ELEMENT_NODE && e.call(this, s)
                }
                var t = !1,
                    r = {
                        b: "strong",
                        i: "em"
                    };
                return e.call(this, this._els.canvas), t && this._restoreCursorFromMarker(), t
            }, e.prototype._initEvents = function() {
                var e = this;
                this._setEventListener(window, "scroll", function() {
                    var t = scrollGetY(),
                        r = window.innerHeight;
                    e._ps.forEach(function(a, n) {
                        if ((0, _.isObjectParagraph)(a)) {
                            var i = e._getParagraphElByIndex(n),
                                o = getSize(i),
                                s = getXY(i),
                                l = s[1] < t + r && s[1] + o[1] > t;
                            a._object.onViewport && a._object.onViewport(l)
                        }
                    })
                }), this._setEventListener(document, "selectionchange", function() {
                    var t = (0, _.getRange)(),
                        r = o(t, 1),
                        a = r[0];
                    if (a) {
                        var i = traverseParent(a.commonAncestorContainer, function(t) {
                            return t == e._els.canvas
                        });
                        if (!i) return
                    }
                    var s = e._getCurrentParagraphIndex(),
                        l = o(s, 1),
                        c = l[0];
                    c !== !1 && (e._highlightObjectsInCurrentSelection(), e._showObjectPicker(), e._correctCaptionSelection(), 0 == n && e._showFormatTooltip(), e._lastCursor = e._getCursor(), e._saveLastCursor())
                });
                var t = !1,
                    r = !1,
                    a = !1,
                    n = !1;
                this._els.canvas.addEventListener("mousedown", function() {
                    n = !0;
                    var t = void 0;
                    e._setEventListener(window, "mouseup", t = function(r) {
                        n = !1;
                        var a = "article_format_btn_link" == r.target.id;
                        a || (e._showFormatTooltip(), t && window.removeEventListener("mouseup", t))
                    })
                }), this._els.canvas.addEventListener("selectstart", function() {
                    e._hideFormatTooltip()
                }), this._els.canvas.addEventListener("copy", function(t) {
                    var r = (0, _.getRange)(),
                        a = o(r, 2),
                        n = a[0],
                        i = a[1];
                    if (i) {
                        var s = e._getContainingParagraphEl(n.commonAncestorContainer),
                            l = o(s, 1),
                            c = l[0];
                        (0, _.isObjectParagraphEl)(c) && (t.clipboardData.setData("text/plain", "uuid:" + c.getAttribute("data-uuid")), t.preventDefault())
                    }
                }), this._els.canvas.addEventListener("paste", function(t) {
                    e._handleObjectPaste(t), e._handlePhotoPaste(t), e._handleLinkPaste(t);
                    var r = e._getCurrentParagraphIndex(),
                        a = o(r, 1),
                        n = a[0];
                    e._fromPasteEvent = !0, e._pasteCurrentIndex = n
                }), this._els.canvas.addEventListener("click", function(e) {
                    return e.target.nodeType == Node.ELEMENT_NODE && "A" == e.target.tagName ? cancelEvent(e) : void 0
                }), this._els.canvas.addEventListener("input", function() {
                    e._hideObjectPicker(), e._expandBlockquoteParagraphs(l);
                    var t = e._replaceAlienInlineTags();
                    e._els.canvas.normalize();
                    var n = void 0;
                    e._fromPasteEvent || t ? e._saveCursorMarker() : n = e._getCursor(), e._processAlienPhotos(), e._flattenAlienParagraphs(), e._cloneObjectParagraphs(), e._ps.length > 0 && e._els.canvas.children.length !== e._ps.length && e._setAllParagraphsDirty(), e._dirty.forEach(e._updateLineData.bind(e)), e._ensureAtLeastOneParagraph(), e._ensureTitleParagraph(), e._ensureDummyParagraphs(), e._redraw(), e._restoreCursor(n), e._correctCursorToBeWithinCanvas(), e._dirty = [], a ? e._saveUndoStateDelayed(e._lastCursor) : e._saveUndoState(e._lastCursor), r = a = !1, e._fromPasteEvent = !1, e.saveDraft()
                });
                var i = 0,
                    s = !1,
                    l = !1,
                    c = 1;
                this._els.canvas.addEventListener("keydown", function(n) {
                    var d = n.keyCode;
                    if (83 == n.keyCode && (n.metaKey || n.ctrlKey)) return e.saveDraft(!1, !1, !0), cancelEvent(n);
                    if (90 == n.keyCode && (n.metaKey || n.ctrlKey)) return e._undo(), cancelEvent(n);
                    var u = !1,
                        p = (0, _.getRange)(),
                        h = o(p, 2),
                        f = h[0],
                        m = h[1],
                        w = e._getCurrentParagraphIndex(),
                        E = o(w, 2),
                        C = E[0],
                        P = E[1];
                    if (d == b.Backspace) {
                        if (s) return s[0].textContent = s[1], e._restoreCursor(s[2]), s = !1, cancelEvent(n);
                        var T = e._getParagraph(C),
                            O = !1;
                        if ((0, _.isObjectParagraph)(T))
                            if (T._object.isCaptionFocused()) O = 0 == f.startOffset && m;
                            else {
                                var x = e._getContainingParagraphEl(f.startContainer),
                                    j = o(x, 1),
                                    S = j[0];
                                O = S == T._object.el()
                            }
                        if (O) {
                            if (T._object.isCaptionFocused()) {
                                if (i++, i >= 2) {
                                    var k = e._getParagraphElByIndex(C),
                                        A = (0, _.createParagraphEl)();
                                    domReplaceEl(k, A), (0, _.focusEl)(A), e._setAllParagraphsDirty(), e._triggerInputEvent()
                                }
                                return cancelEvent(n)
                            }
                            var D = e._getParagraphElByIndex(C),
                                N = (0, _.createParagraphEl)();
                            return domReplaceEl(D, N), (0, _.focusEl)(N), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(n)
                        }
                        if (i = 0, f && 0 == f.startOffset) {
                            var L = e._getCurrentParagraphIndex(),
                                I = o(L, 1),
                                R = I[0],
                                M = R > 0 ? e._ps[R - 1] : !1;
                            if ((0, _.isObjectParagraph)(M)) return void M._object.highlight(!0)
                        }
                        e._setAllParagraphsDirty()
                    } else i = 0;
                    if (d == b.Delete) {
                        var H = e._ps[C],
                            B = e._ps[C + 1],
                            U = !1;
                        if ((0, _.isObjectParagraph)(H) && f && m && (U = !H._object.isCaptionFocused() && f.startContainer == H._object.el()), U && !H._object.isCaptionFocused()) {
                            var F = e._getParagraphElByIndex(C),
                                z = (0, _.createParagraphEl)();
                            return domReplaceEl(F, z), (0, _.focusEl)(z), e._setAllParagraphsDirty(), e._triggerInputEvent(), cancelEvent(n)
                        }
                        B && e._isParagraphEmpty(H) && (0, y.inArray)(B.type, [v.ParagraphType.Header2, v.ParagraphType.Header3]) && (H.type = B.type, e._setParagraphDirty(C), e._redraw()), e._setAllParagraphsDirty()
                    } else if (d == b.Enter) {
                        if (e._isWithinObjectParagraphEl((0, _.getFocusedElement)())) {
                            var W = e._getContainingParagraphEl((0, _.getFocusedElement)()),
                                $ = o(W, 2),
                                q = $[0],
                                Q = $[1],
                                X = (0, _.createParagraphEl)();
                            return e._ps[Q]._object.isCaptionFocused() ? domInsertAfter(X, q) : domInsertBefore(X, q), e._setAllParagraphsDirty(), (0, _.focusEl)(X), e._triggerInputEvent(), cancelEvent(n)
                        }
                        var K = e._getContainingParagraphEl((0, _.getFocusedElement)()),
                            V = o(K, 3),
                            Y = V[0],
                            G = V[1],
                            J = V[2],
                            Z = (0, _.getRange)(),
                            ee = o(Z, 2),
                            te = ee[0],
                            re = ee[1],
                            ae = (0, _.getCaretCharacterOffsetWithin)(Y),
                            ne = o(ae, 2),
                            ie = (ne[0], ne[1]),
                            oe = re && te.startContainer.nodeType == Node.TEXT_NODE && !te.startContainer.nextSibling && ie == Y.textContent.length;
                        l = oe && !(0, _.isListParagraph)(e._ps[C]) && !n.shiftKey && (0, y.inArray)(J.type, [v.ParagraphType.Quote, v.ParagraphType.Quote2]), window.browser && window.browser.msie && setTimeout(e._triggerInputEvent.bind(e)), l || n.shiftKey || e._parseUrlParagraph(G), e._setParagraphDirty(C, P)
                    } else n.key && 1 == n.key.length ? (e._setParagraphDirty(C), e._setParagraphDirty(P), n.metaKey || (u = !0, n.key && ((0, _.isCyrillicChar)(n.key) ? c += 1 : (0, _.isLatinChar)(n.key) && (c -= 1), c = Math.min(Math.max(c, -5), 5))), r = (0, _.isWhiteSpaceChar)(n.key), t && !r && (a = !0), t = u, setTimeout(function() {
                        function t(e, t, r, a, n) {
                            var i = this._getCursor(),
                                o = t.textContent.substring(0, e - r.length),
                                l = t.textContent.substring(e);
                            n || (s = [t, o + r + l, i]), t.textContent = o + a + l, this._restoreCursor(i), this._setParagraphDirty(C), this._triggerInputEvent()
                        }
                        var r = c > 0,
                            a = window.getSelection();
                        if (a.isCollapsed && a.rangeCount) {
                            var n = a.getRangeAt(0),
                                i = n.startContainer;
                            if (i.nodeType == Node.TEXT_NODE && n.startOffset > 0)
                                for (var o = i.textContent.substring(n.startOffset - 5, n.startOffset), l = 0, d = g.Sequences.length; d > l; l++) {
                                    var u = g.Sequences[l];
                                    if (void 0 === u.cyrillic || u.cyrillic === r)
                                        if (u.pattern instanceof RegExp) {
                                            var p = o.match(u.pattern);
                                            if (p) {
                                                var h = u.substitution;
                                                p.length > 1 && (h = h.replace("$1", p[1])), t.call(e, n.startOffset, i, p[0], h, u.noUndo);
                                                break
                                            }
                                        } else if (o.endsWith(u.pattern)) {
                                        t.call(e, n.startOffset, i, u.pattern, u.substitution, u.noUndo);
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
                return a && (0, _.isObjectParagraphEl)(a)
            }, e.prototype._highlightObjectsInCurrentSelection = function() {
                var e = this._getCurrentParagraphIndex(),
                    t = o(e, 2),
                    r = t[0],
                    a = t[1];
                r !== !1 && a !== !1 && this._ps.forEach(function(e, t) {
                    if (e._object) {
                        var n = r != a;
                        e._object.highlight(t >= r && a >= t, n)
                    }
                })
            }, e.prototype._getOrCreateParagraphObject = function(e) {
                e._uuid || (e._uuid = i());
                var t = this._getObject(e._uuid);
                if (!t) {
                    var r = e.mediaId || "",
                        a = e._preparedData || {};
                    switch (parseInt(e.type)) {
                        case v.ParagraphType.ObjectPhoto:
                            t = new l["default"](r, a, this);
                            break;
                        case v.ParagraphType.ObjectVideo:
                            t = new d["default"](r, a, this);
                            break;
                        case v.ParagraphType.ObjectGIF:
                            t = new p["default"](r, a, this);
                            break;
                        case v.ParagraphType.ObjectTweet:
                            t = new f["default"](r, a, this)
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
                        var r = (0, _.paragraphElProperties)(t),
                            a = o(r, 2),
                            n = a[0],
                            i = a[1],
                            s = this._getObject(i);
                        if (!s) return;
                        var l = void 0;
                        l = s.getCaptionEl() ? this._getParagraphFromHTML("", s.getCaptionEl().innerHTML) : (0, _.buildParagraph)(), l._uuid = i, l.type = n, l._object = s, this._ps[e] = l
                    } else {
                        var c = t.tagName.toLowerCase();
                        this._ps[e] = this._getParagraphFromHTML(c, t.innerHTML)
                    }
            }, e.prototype.isPublishNameCorrect = function(e) {
                return /^[a-z0-9\-]+$/.test(e) ? -1 != e.indexOf("--") ? !1 : "-" == e[0] || "-" == e[e.length - 1] ? !1 : e.length > this._options.maxNameLength ? !1 : !0 : !1
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
    t["default"] = S
}, function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
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
    var s = r(19),
        l = a(s),
        c = function(e) {
            function t(r, a, o) {
                return n(this, t), i(this, e.call(this, r, a, o, !0))
            }
            return o(t, e), t.prototype.render = function() {
                return this._el = se('\n      <img contenteditable="false"/>\n    '), this._preparedData && this._preparedData.sizes ? (this.setLoadingState(!1), this._drawImage()) : this.setLoadingState(!0), this._el
            }, t.prototype._initUpload = function() {
                var e = this;
                if (void 0 === this._upload) {
                    var t = this.getEditor().getPhotoUploadOptions();
                    this._upload = Upload.init(this.getEditor().getPhotoUploadEl(), t.url, t.params, {
                        file_name: "photo",
                        file_size_limit: 10485760,
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
                    var r = function() {
                            var r = [];
                            each(t.sizes, function(e, t) {
                                r.push(t)
                            }), r = r.sort(function(e, t) {
                                return e[1] < t[1]
                            });
                            var a = e.getEditor().getWidth() * (isRetina() ? 2 : 1),
                                n = r[0][0];
                            return r.forEach(function(e) {
                                e[1] >= a && (n = e[0])
                            }), n
                        },
                        a = r(),
                        n = this._getImageEl();
                    n.onload = function() {
                        e.setLoadingState(!1)
                    }, n.src = a, this._updateSize()
                }
            }, t
        }(l["default"]);
    t["default"] = c
}, , , function(e, t, r) {
    "use strict";

    function a(e, t) {
        _ = t || {}, y = e, f = ge("article_view_" + e.owner_id + "_" + e.id), g = _.scrollNode || window, v = _.getScrollTop || function() {
            var e = document.scrollingElement || window.scrollNode || document.body;
            return e.scrollTop
        }, s(), o(), u(), window.onBodyResize = window.onBodyResize || function() {}
    }

    function n() {
        _.notFull = !1, o(), u(), l()
    }

    function i() {
        m && g.removeEventListener("scroll", m), b && g.removeEventListener("scroll", b), m = b = !1
    }

    function o() {
        each(geByClass("_article_unmute_button"), function(e, t) {
            t.addEventListener("click", function() {
                var e = t.parentNode,
                    r = geByTag1("video", e);
                r.muted = !r.muted, toggleClass(e, "article_object_unmuted", !r.muted)
            })
        }), each(geByTag("figure", f), function(e, t) {
            var r = parseInt(domData(t, "type"));
            _.isWebView || r != h.ParagraphType.ObjectPhoto || d(t)
        })
    }

    function s() {
        g.addEventListener("scroll", m = function() {
            l()
        }), l()
    }

    function l() {
        var e = {
                101: -2e3
            },
            t = v(),
            r = window.innerHeight,
            a = getXY(f)[1];
        each(geByTag("figure", f), function(n, i) {
            var o = intval(domData(i, "done"));
            if (!o) {
                var s = getH(i),
                    l = getXY(i)[1] - a,
                    d = intval(domData(i, "type")),
                    u = void 0 !== e[d] ? e[d] : 60,
                    p = t + r - u >= l && l + s - u >= t;
                o = c(p, d, i), o && domData(i, "done", 1)
            }
        })
    }

    function c(e, t, r) {
        var a = !1;
        switch (t) {
            case h.ParagraphType.ObjectTweet:
                if (e) {
                    var n = domData(r.firstChild, "tweet-id");
                    loadScript("https://platform.twitter.com/widgets.js", {
                        onLoad: function() {
                            twttr.widgets.createTweet(n, r, {
                                align: "center",
                                lang: window.vk && 0 == window.vk.lang ? "ru" : "en",
                                dnt: !0
                            }).then(function() {})
                        }
                    }), a = !0
                }
                break;
            case h.ParagraphType.ObjectPhoto:
                if (e) {
                    var i = geByTag1("img", r),
                        o = JSON.parse(domData(i, "sizes")),
                        s = (0, h.getAppropriateImage)(o, getW(i)),
                        l = p(s, 1),
                        c = l[0],
                        d = new Image;
                    d.onload = function() {
                        removeClass(i, "article_object_photo__image_blur"), i.src = c
                    }, d.src = c, a = !0
                }
                break;
            case h.ParagraphType.ObjectGIF:
                if (!_.mobile) {
                    var u = geByTag1("video", r);
                    u && (e ? u.play() : u.pause())
                }
        }
        return a
    }

    function d(e) {
        if (!_.noImageOpen) {
            var t = geByTag1("img", e),
                r = JSON.parse(domData(t, "sizes")),
                a = (0, h.getAppropriateImage)(r, window.innerWidth),
                n = p(a, 3),
                i = n[0],
                o = n[1],
                s = n[2],
                l = void 0,
                c = void 0;
            l = Math.min(o, window.innerWidth), c = l * o / s;
            var d = getW(t) < l && getH(t) < c;
            i && d && (addClass(t, "article_image_full_viewable"), t.addEventListener("click", function() {
                var r = gpeByClass("article_body", t) || gpeByClass("_article_layer", t);
                r && addClass(r, "article_no_scroll");
                var a = geByTag1("figcaption", e),
                    n = !!domData(e, "loaded"),
                    o = se('<div class="article_full_view"><img class="article_full_view__image ' + (n ? "" : "article_full_view__image_blurred") + '" src="' + t.src + '"></div>');
                a && a.innerHTML && o.appendChild(se('<div class="article_full_view__caption"><div class="article_full_view__caption_inner">' + a.innerHTML + "</div></div>"));
                var s = geByTag1("img", o);
                setStyle(s, {
                    "max-width": l,
                    "max-height": c
                }), f.appendChild(o), o.addEventListener("click", function(e) {
                    domClosest("article_full_view__caption_inner", e.target) || (re(o), r && removeClass(r, "article_no_scroll"))
                }), o.addEventListener("mousewheel", function() {
                    re(o), r && removeClass(r, "article_no_scroll")
                });
                var d = new Image;
                d.onload = function() {
                    s.src = i, removeClass(s, "article_full_view__image_blurred"), domData(e, "loaded", 1)
                }, d.src = i
            }))
        }
    }

    function u() {
        function e() {
            return Math.round((Date.now() - o) / 1e3)
        }

        function t(t) {
            if (!(s >= t) && (s = t, c.push(t), clearTimeout(l), l = setTimeout(r, 100), 4 == t && y.ttr)) {
                var a = y.ttr - e();
                a > 0 && setTimeout(function() {
                    c = [4], r()
                }, 1e3 * a)
            }
        }

        function r() {
            c.length && (ajax.post(window.isMVK ? "article.php" : "al_articles.php", {
                act: "stats",
                scroll: c.join(","),
                spent: e(),
                hash: y.access_hash,
                article_owner_id: y.owner_id,
                article_id: y.id
            }), c = [])
        }
        if (!_.notFull) {
            var a = getH(f),
                n = getXY(f)[1],
                i = window.innerHeight,
                o = Date.now(),
                s = -1,
                l = void 0,
                c = [];
            g.addEventListener("scroll", b = function() {
                var e = v();
                e > 0 && t(1);
                for (var r = 1; 4 > r; r++) e + 3 * i / 4 > n + a * r / 3 && t(r + 1);
                e + i > a && t(4)
            })
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = function() {
        function e(e, t) {
            var r = [],
                a = !0,
                n = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); a = !0);
            } catch (l) {
                n = !0, i = l
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (n) throw i
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
    t.initArticle = a, t.updateArticle = n, t.deinitArticle = i;
    var h = r(18),
        f = void 0,
        g = void 0,
        _ = void 0,
        v = void 0,
        y = void 0,
        m = void 0,
        b = void 0;
    window.initArticle = a, window.deinitArticle = i, window.updateArticle = n
}, , , , function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
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
    var s = r(19),
        l = a(s),
        c = function(e) {
            function t(r, a, o) {
                return n(this, t), i(this, e.call(this, r, a, o, !0))
            }
            return o(t, e), t.prototype.render = function() {
                this._el = se('\n      <div class="article_object_gif"></div>\n    ');
                var e = this.getPreparedData();
                if (e)
                    if (e.video) this._videoEl = ce("video", {
                        autoplay: !0,
                        loop: "loop",
                        muted: !0,
                        src: e.video + "&mp4=1"
                    }), this._el.appendChild(this._videoEl);
                    else if (e.href) {
                    var t = e.href + "&wnd=1&module=" + cur.module;
                    this._imgEl = ce("img", {
                        src: t
                    }), this._el.appendChild(this._imgEl)
                }
                return this._el
            }, t.prototype.onViewport = function(e) {
                this._imgEl ? setStyle(this._imgEl, "visibility", e ? "visible" : "hidden") : e ? this._videoEl.play() : this._videoEl.pause()
            }, t.prototype.onRender = function() {
                var e = this;
                setTimeout(function() {
                    e._videoEl && e._videoEl.play()
                })
            }, t
        }(l["default"]);
    t["default"] = c
}, , , , , function(e, t, r) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var n = r(30),
        i = a(n),
        o = r(34);
    window.ArticleEditor = i["default"], window.ArticleView = {
        initArticle: o.initArticle
    }, stManager.done(jsc("web/article.js"))
}]);