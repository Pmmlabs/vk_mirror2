! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 14)
}([function(e, t, n) {
    "use strict";

    function r() {
        return {
            txt: "",
            attaches: [],
            urlBinds: []
        }
    }

    function i(e, t) {
        this._db = e, this._key = t, this.dData = r(), this.load()
    }

    function a(e) {
        switch (e.type) {
            case "mail":
                return e.id < 0 && 1 == e.object.fwd_count;
            default:
                return !e.object
        }
    }

    function o(e) {
        return {
            txt: e.txt,
            attaches: e.attaches.length ? e.attaches : void 0,
            urlBinds: e.urlBinds.length ? e.urlBinds : void 0
        }
    }

    function s(e) {
        return {
            txt: e.txt,
            attaches: e.attaches || [],
            urlBinds: e.urlBinds || []
        }
    }

    function c(e, t) {
        var n = [];
        e.fwd_count ? n.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: e.fwd_count
            }
        }) : e.fwd && n.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: Object(d.parseFwd)(e.fwd).length
            }
        });
        for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
            type: e["attach" + r + "_type"],
            id: e["attach" + r],
            initiatorId: intval(e["attach" + r + "_call_initiator_id"]),
            state: e["attach" + r + "_call_state"],
            duration: intval(e["attach" + r + "_call_duration"]),
            receiverId: intval(e["attach" + r + "_call_receiver_id"])
        }) : n.push({
            type: e["attach" + r + "_type"],
            id: e["attach" + r],
            kind: e["attach" + r + "_kind"],
            productId: e["attach" + r + "_product_id"]
        });
        return e.geo && n.push({
            type: "geo",
            id: e.geo
        }), n
    }

    function u(e, t) {
        return new i(e, "draft_" + t)
    }
    n.r(t), n.d(t, "ImDraft", function() {
        return i
    }), n.d(t, "convertKludgesToAttaches", function() {
        return c
    }), n.d(t, "loadDraftForPeer", function() {
        return u
    });
    var l = n(64),
        d = n(70),
        f = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    i.prototype.dump = function() {
        this._key && this._db.updateByKey(this._key, o(this.dData))
    }, i.prototype.load = function() {
        if (this._key) {
            var e = this._db.selectByKey(this._key);
            e && (this.dData = s(e))
        }
    }, i.prototype.clear = function() {
        this.dData = r(), this.dump()
    }, i.prototype.setText = function(e) {
        this.dData.txt = trim(e), this.dump()
    }, i.prototype.addAttach = function(e, t, n) {
        if (("share" === e || "mail" === e) && this.removeAttachByType(e), !e || !t) return !1;
        var r = this.dData.attaches.findIndex(function(n) {
            return n.type === e && n.id === t
        }); - 1 === r ? (this.dData.attaches.push({
            type: e,
            id: t,
            object: n
        }), this.dump()) : "video" === e && (this.dData.attaches[r] = {
            type: e,
            id: t,
            object: n
        }, this.dump())
    }, i.prototype.syncWithSelector = function(e) {
        var t = this,
            n = this.getFwdRaw();
        this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
            var n = f(e, 2),
                r = n[0],
                i = n[1],
                a = t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == i
                });
            return a || {
                type: r,
                id: i
            }
        })), this.dump()
    }, i.prototype.removeAttachByType = function(e) {
        for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
        this.dump()
    }, i.prototype.removeAllAttaches = function() {
        this.dData.attaches = [], this.dump()
    }, i.prototype.addBindUrl = function(e, t, n) {
        this.getBoundAttach(e) || (this.dData.urlBinds.push({
            url: e,
            type: t,
            id: n
        }), this.dump())
    }, i.prototype.getBoundAttach = function(e) {
        var t = this.dData.urlBinds.find(function(t) {
            return t.url === e
        });
        return t ? this.dData.attaches.find(function(e) {
            return e.type === t.type && e.id === t.id
        }) || null : null
    }, i.prototype.getShareUrl = function() {
        var e = this.dData.attaches.find(function(e) {
            return "share" === e.type
        });
        return e && e.object ? e.object.url : void 0
    }, i.prototype.hasAttaches = function() {
        return this.dData.attaches.length > 0
    }, i.prototype.destroy = function() {
        this.dData = {}, this._key = this._db = null
    }, i.prototype.prepareObjects = function(e, t) {
        var n = this,
            r = this.dData.attaches.find(a);
        return r ? Object(l.post)(l.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = f(e, 1),
                r = t[0];
            n.dData.attaches = r.map(function(e) {
                return {
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }
            })
        }) : Promise.resolve()
    }, i.prototype.getFwdRaw = function() {
        return this.dData.attaches.find(function(e) {
            return "mail" === e.type
        })
    }, i.prototype.getFwdCount = function() {
        var e = this.getFwdRaw();
        return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    var r = n(157),
        i = "__core-js_shared__",
        a = r[i] || (r[i] = {});
    e.exports = function(e) {
        return a[e] || (a[e] = {})
    }
}, function(e, t, n) {
    var r = n(174),
        i = n(144),
        a = n(8);
    e.exports = function(e) {
        return function(t, n, o) {
            var s, c = r(t),
                u = i(c.length),
                l = a(o, u);
            if (e && n != n) {
                for (; u > l;)
                    if (s = c[l++], s != s) return !0
            } else
                for (; u > l; l++)
                    if ((e || l in c) && c[l] === n) return e || l;
            return !e && -1
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            unmount: function() {
                Object(a.destroyModule)(e)
            }
        }
    }

    function i(e, t, n) {
        var i = Object(a.createMutations)(r),
            o = i.bindMutations,
            s = Object(a.createModule)({
                handlers: function(e, t) {}
            });
        return o(s)
    }
    n.r(t), n.d(t, "mount", function() {
        return i
    });
    var a = n(110)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function i(e, t) {
        return t = r(t) || document, t.getElementsByTagName(e)
    }

    function a(e, t) {
        return t = r(t) || document, t.querySelector && t.querySelector(e) || i(e, t)[0]
    }

    function o(e, t, n) {
        t = r(t) || document, n = n || "*";
        var a = [];
        if (t.querySelectorAll && "*" != n) return t.querySelectorAll(n + "." + e);
        if (t.getElementsByClassName) {
            var o = t.getElementsByClassName(e);
            if ("*" != n) {
                n = n.toUpperCase();
                for (var s = 0, c = o.length; c > s; ++s) o[s].tagName.toUpperCase() == n && a.push(o[s])
            } else a = Array.prototype.slice.call(o);
            return a
        }
        for (var u = i(n, t), l = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, c = u.length; c > s; ++s) l.test(u[s].className) && a.push(u[s]);
        return a
    }

    function s(e, t, n) {
        return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || o(e, t, n)[0]
    }

    function c(e, t, n) {
        if (t = r(t), !t) return null;
        for (; n !== t && (t = t.parentNode);)
            if (ee(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function l(e, t) {
        return (t || document).querySelector(e)
    }

    function d(e, t) {
        return ee(t, e) ? t : c(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : p(e, t)
    }

    function p(e, t) {
        if (t = r(t), !t) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() == e) return t;
        return null
    }

    function m(e, t, n) {
        var r = document.createElement(e);
        return t && extend(r, t), n && ue(r, n), r
    }

    function g(e) {
        return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function h(e) {
        return k(m("div", {
            innerHTML: e
        }))
    }

    function _(e) {
        return S(m("div", {
            innerHTML: e
        }))
    }

    function v(e, t) {
        return each(t, function(t, n) {
            e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof n ? "" : n).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function b(e) {
        return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
    }

    function y(e, t) {
        return isString(t) && (t = h(t)), j(e).replaceChild(t, e), t
    }

    function w(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function O(e) {
        return w((e || {}).nextSibling)
    }

    function C(e) {
        return w((e || {}).previousSibling, 1)
    }

    function k(e) {
        return w((e || {}).firstChild)
    }

    function E(e) {
        return w((e || {}).lastChild, 1)
    }

    function j(e) {
        return (e || {}).parentNode
    }

    function S(e) {
        for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
        return t
    }

    function T(e, t) {
        var n = j(t);
        return n && n.insertBefore(e, t)
    }

    function I(e, t) {
        var n = j(t);
        return n && n.insertBefore(e, O(t))
    }

    function L(e, t) {
        return e ? s(t, e) : e
    }

    function x(e, t, n) {
        return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function P(e) {
        for (var t = 0; null != (e = C(e));) t++;
        return t
    }

    function M(e, t) {
        do e = j(e); while (e && !N(e, t));
        return e
    }

    function A(e, t, n) {
        for (var r = null; null === r && e;) e = -1 === n ? C(e) : O(e), e && N(e, t) && (r = e);
        return r
    }

    function N(e, t) {
        if (e = r(e), !e || e == document) return !1;
        var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t[n] !== this;);
            return n > -1
        };
        return n.call(e, t)
    }

    function D(e) {
        return N(e, ":hover")
    }

    function R(e, t) {
        var n = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; n = n.parentNode;)
            if (n == t) return !0;
        return !1
    }

    function F() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function B(e, t) {
        t = t || {};
        for (var n = t.fromEl || j(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
            var i = ce(n, "position");
            if (inArray(i, r) && (!t.noOverflow || "hidden" != ce(n, "overflow"))) break;
            n = j(n)
        }
        return n
    }

    function H(e, t) {
        e = r(e);
        for (var n, i, a, o, s = e; s && s.tagName && s !== bodyNode && (n = ce(s, "position"), i = ce(s, "overflow"), a = ce(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === i || ("static" === n ? o && "relative" !== o : "fixed" === o));) "none" !== a ? o = void 0 : "static" !== n && "fixed" !== o && (o = n), s = j(s);
        return s
    }

    function U(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) U(arguments[n]);
        else if (e = r(e), e && e.style) {
            var i = e.olddisplay,
                a = "block",
                o = e.tagName.toLowerCase();
            e.style.display = i || "", "none" === ce(e, "display") && (a = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function z(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) z(arguments[n]);
        else if (e = r(e), e && e.style) {
            var i = ce(e, "display");
            e.olddisplay = "none" != i ? i : "", e.style.display = "none"
        }
    }

    function G(e) {
        return e = r(e), e && e.style ? "none" != ce(e, "display") : !1
    }

    function V() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function W(e, t, n) {
        e = r(e), n = n || 0;
        var i = Y(e)[1],
            a = X(e)[1],
            o = window,
            s = document.documentElement,
            c = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
            u = r("page_header_cont"),
            l = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            d = vk.staticheader ? Math.max(0, X(u)[1] - l) : X(u)[1];
        if (t) {
            if (l + d + n > i + a) return i + a - l - d - n;
            if (i > l + c - n) return i - l - c + n
        } else {
            if (l + d + n > i) return i - l - d - n;
            if (i + a > l + c - n) return i + a - l - c + n
        }
        return 0
    }

    function q(e, t) {
        return void 0 === t && (t = !G(e)), t ? U(e) : z(e), t
    }

    function K(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function Q(e, t) {
        var n;
        if (t && "inline" == ce(e, "display")) {
            var r = e.getClientRects();
            n = r && r[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function Y(e, t) {
        if (e = r(e), !e) return [0, 0];
        var n, i, a = {
                top: 0,
                left: 0
            },
            o = e.ownerDocument;
        return o ? (n = o.documentElement, K(e) && (a = Q(e, !0)), i = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [a.left + (t ? 0 : i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), a.top + (t ? 0 : i.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
    }

    function $(e) {
        return null != e && e === e.window
    }

    function X(e, t, n) {
        e = r(e);
        var i, a = [0, 0],
            o = document.documentElement;
        if (t && "border-box" === ce(e, "boxSizing") && (t = !1), e == document) a = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var s = function() {
                a = K(e) && (i = Q(e, n)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t && each(a, function(t, n) {
                    var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    each(r, function() {
                        a[t] -= parseFloat(ce(e, "padding" + this)) || 0, a[t] -= parseFloat(ce(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (G(e)) s();
            else {
                var c = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    u = {},
                    l = !1;
                e.style.cssText.indexOf("!important") > -1 && (l = e.style.cssText), each(c, function(t, n) {
                    u[t] = e.style[t], e.style[t] = n
                }), s(), each(c, function(t, n) {
                    e.style[t] = u[t]
                }), l && (e.style.cssText = l)
            }
        }
        return a
    }

    function Z(e) {
        return X(e)[0]
    }

    function J(e) {
        return X(e)[1]
    }

    function ee(e, t) {
        return e = r(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
    }

    function te(e, t) {
        (e = r(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
    }

    function ne(e, t) {
        return setTimeout(te.pbind(e, t), 0)
    }

    function re(e, t) {
        (e = r(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }

    function ie(e, t) {
        return setTimeout(re.pbind(e, t), 0)
    }

    function ae(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? te : re)(e, t), n
    }

    function oe(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? ne : ie)(e, t), n
    }

    function se(e, t, n) {
        re(e, t), te(e, n)
    }

    function ce(e, t, n) {
        if (e = r(e), isArray(t)) {
            var i = {};
            return each(t, function(t, n) {
                i[n] = ce(e, n)
            }), i
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
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
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            o = e.currentStyle[t] || e.currentStyle[u], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var r = e.style,
                        i = r.left,
                        a = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, o[t] = r.pixelLeft + "px", r.left = i, e.runtimeStyle.left = a
                }
            }), o = o.join(" ")
        }
        if (n && ("width" == t || "height" == t)) {
            var l = X(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            o = (intval(o) ? Math.max(floatval(o), l) : l) + "px"
        }
        return o
    }

    function ue(e, t, n) {
        if (e = r(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : Ee(t))) return each(t, function(t, n) {
                ue(e, t, n)
            });
            if ("opacity" == t) browser.msie && ((n + "").length ? 1 !== n ? e.style.filter = "alpha(opacity=" + 100 * n + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var i = "number" == typeof n;
                i && /height|width/i.test(t) && (n = Math.abs(n)), n = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (a) {
                debugLog("setStyle error: ", [t, n], a)
            }
        }
    }

    function le(e, t, n) {
        setTimeout(ue.pbind(e, t, n), 0)
    }

    function de(e, t, n) {
        var i = fe(e, "pseudo-id");
        i || (fe(e, "pseudo-id", i = irand(1e8, 999999999)), te(e, "_pseudo_" + i));
        var a = t + "-style-" + i,
            o = r(a),
            s = "._pseudo_" + i + ":" + t + "{";
        o || (o = headNode.appendChild(m("style", {
            id: a,
            type: "text/css"
        }))), each(n, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
    }

    function fe(e, t, n) {
        if (!e) return !1;
        var r, i = e[vkExpand];
        return i || (i = e[vkExpand] = ++vkUUID), n !== r && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = n), t ? vkCache[i] && vkCache[i][t] : i
    }

    function pe(e, t, n) {
        return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function me(e) {
        for (var t = 0, n = arguments.length; n > t; ++t) {
            var r = arguments[t];
            if (void 0 !== e[r]) try {
                delete e[r]
            } catch (i) {
                try {
                    e.removeAttribute(r)
                } catch (i) {}
            }
        }
    }

    function ge(e, t) {
        var n = e ? e[vkExpand] : !1;
        if (n)
            if (t) {
                if (vkCache[n]) {
                    delete vkCache[n][t], t = "";
                    var r = 0;
                    for (t in vkCache[n])
                        if ("__elem" !== t) {
                            r++;
                            break
                        }
                    r || ge(e)
                }
            } else removeEvent(e), me(e, vkExpand), delete vkCache[n]
    }

    function he() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = r(e[t]);
            n && (ge(n), me(n, "btnevents"))
        }
    }

    function _e(e, t, n) {
        if (e = r(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var i = a("b", e);
                i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function ve() {
        var e = r("zoom_test_1") || document.body.appendChild(m("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = r("zoom_test_2") || document.body.appendChild(m("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function be(e, t, n) {
        return (e = r(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
    }

    function ye(e, t, n) {
        e = r(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                var i = e.createTextRange();
                i.collapse(!0), i.moveEnd("character", n), i.moveStart("character", t), i.select()
            } else e.setSelectionRange && e.setSelectionRange(t, n)
        } catch (a) {}
    }

    function we(e, t, n) {
        for (e = r(e), n = n || 999; e && !t(e);) {
            if (n--, 0 == n) return !1;
            try {
                if (e = j(e), e == document) break
            } catch (i) {
                e = !1
            }
        }
        return e
    }

    function Oe(e) {
        return je ? void 0 : window.document.title = replaceEntities(e)
    }

    function Ce(e) {
        je = e, e && window.cur && window.cur.destroy.push(function() {
            Ce(!1)
        })
    }
    n.r(t), n.d(t, "ge", function() {
        return r
    }), n.d(t, "geByTag", function() {
        return i
    }), n.d(t, "geByTag1", function() {
        return a
    }), n.d(t, "geByClass", function() {
        return o
    }), n.d(t, "geByClass1", function() {
        return s
    }), n.d(t, "gpeByClass", function() {
        return c
    }), n.d(t, "domQuery", function() {
        return u
    }), n.d(t, "domQuery1", function() {
        return l
    }), n.d(t, "domClosest", function() {
        return d
    }), n.d(t, "domClosestByTag", function() {
        return f
    }), n.d(t, "gpeByTag", function() {
        return p
    }), n.d(t, "ce", function() {
        return m
    }), n.d(t, "re", function() {
        return g
    }), n.d(t, "se", function() {
        return h
    }), n.d(t, "sech", function() {
        return _
    }), n.d(t, "rs", function() {
        return v
    }), n.d(t, "psr", function() {
        return b
    }), n.d(t, "domReplaceEl", function() {
        return y
    }), n.d(t, "domEL", function() {
        return w
    }), n.d(t, "domNS", function() {
        return O
    }), n.d(t, "domPS", function() {
        return C
    }), n.d(t, "domFC", function() {
        return k
    }), n.d(t, "domLC", function() {
        return E
    }), n.d(t, "domPN", function() {
        return j
    }), n.d(t, "domChildren", function() {
        return S
    }), n.d(t, "domInsertBefore", function() {
        return T
    }), n.d(t, "domInsertAfter", function() {
        return I
    }), n.d(t, "domByClass", function() {
        return L
    }), n.d(t, "domData", function() {
        return x
    }), n.d(t, "domChildIndex", function() {
        return P
    }), n.d(t, "domCA", function() {
        return M
    }), n.d(t, "domClosestSibling", function() {
        return A
    }), n.d(t, "matchesSelector", function() {
        return N
    }), n.d(t, "isHover", function() {
        return D
    }), n.d(t, "isAncestor", function() {
        return R
    }), n.d(t, "getScroll", function() {
        return F
    }), n.d(t, "domClosestPositioned", function() {
        return B
    }), n.d(t, "domClosestOverflowHidden", function() {
        return H
    }), n.d(t, "show", function() {
        return U
    }), n.d(t, "hide", function() {
        return z
    }), n.d(t, "isVisible", function() {
        return G
    }), n.d(t, "clientHeight", function() {
        return V
    }), n.d(t, "getClientRectOffsetY", function() {
        return W
    }), n.d(t, "toggle", function() {
        return q
    }), n.d(t, "boundingRectEnabled", function() {
        return K
    }), n.d(t, "getXYRect", function() {
        return Q
    }), n.d(t, "getXY", function() {
        return Y
    }), n.d(t, "isWindow", function() {
        return $
    }), n.d(t, "getSize", function() {
        return X
    }), n.d(t, "getW", function() {
        return Z
    }), n.d(t, "getH", function() {
        return J
    }), n.d(t, "hasClass", function() {
        return ee
    }), n.d(t, "addClass", function() {
        return te
    }), n.d(t, "addClassDelayed", function() {
        return ne
    }), n.d(t, "removeClass", function() {
        return re
    }), n.d(t, "removeClassDelayed", function() {
        return ie
    }), n.d(t, "toggleClass", function() {
        return ae
    }), n.d(t, "toggleClassDelayed", function() {
        return oe
    }), n.d(t, "replaceClass", function() {
        return se
    }), n.d(t, "getStyle", function() {
        return ce
    }), n.d(t, "setStyle", function() {
        return ue
    }), n.d(t, "setStyleDelayed", function() {
        return le
    }), n.d(t, "setPseudoStyle", function() {
        return de
    }), n.d(t, "data", function() {
        return fe
    }), n.d(t, "attr", function() {
        return pe
    }), n.d(t, "removeAttr", function() {
        return me
    }), n.d(t, "removeData", function() {
        return ge
    }), n.d(t, "cleanElems", function() {
        return he
    }), n.d(t, "setTitle", function() {
        return _e
    }), n.d(t, "getZoom", function() {
        return ve
    }), n.d(t, "val", function() {
        return be
    }), n.d(t, "elfocus", function() {
        return ye
    }), n.d(t, "traverseParent", function() {
        return we
    }), n.d(t, "setDocumentTitle", function() {
        return Oe
    }), n.d(t, "lockDocumentTitle", function() {
        return Ce
    });
    var ke = n(47),
        Ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    window.cf = function(e) {
        var t = e.createDocumentFragment(),
            n = e.createElement("div"),
            r = e.createRange && e.createRange();
        return t.appendChild(n), r && r.selectNodeContents(n), r && r.createContextualFragment ? function(t) {
            return t ? r.createContextualFragment(t) : e.createDocumentFragment()
        } : function(t) {
            if (!t) return e.createDocumentFragment();
            n.innerHTML = t;
            for (var r = e.createDocumentFragment(); n.firstChild;) r.appendChild(n.firstChild);
            return r
        }
    }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var n in t)
                if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
        }
        return "transform"
    }(), window.vkExpand = window.vkExpand || "VK" + Object(ke.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var je = !1;
    window.ge = r, window.geByTag = i, window.geByTag1 = a, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = c, window.domQuery = u, window.domQuery1 = l, window.domClosest = d, window.ce = m, window.re = g, window.se = h, window.sech = _, window.rs = v, window.psr = b, window.domReplaceEl = y, window.domEL = w, window.domNS = O, window.domPS = C, window.domFC = k, window.domLC = E, window.domPN = j, window.domChildren = S, window.domInsertBefore = T, window.domInsertAfter = I, window.domByClass = L, window.domData = x, window.domChildIndex = P, window.domCA = M, window.domClosestSibling = A, window.matchesSelector = N, window.isHover = D, window.isAncestor = R, window.getScroll = F, window.domClosestPositioned = B, window.domClosestOverflowHidden = H, window.show = U, window.hide = z, window.isVisible = G, window.clientHeight = V, window.getClientRectOffsetY = W, window.toggle = q, window.boundingRectEnabled = K, window.getXYRect = Q, window.getXY = Y, window.isWindow = $, window.getSize = X, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = ie, window.toggleClass = ae, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = ce, window.setStyle = ue, window.setStyleDelayed = le, window.setPseudoStyle = de, window.data = fe, window.attr = pe, window.removeAttr = me, window.removeData = ge, window.cleanElems = he, window.setTitle = _e, window.getZoom = ve, window.val = be, window.elfocus = ye, window.traverseParent = we, window.getH = J, window.getW = Z, window.domClosestByTag = f, window.setDocumentTitle = Oe, window.lockDocumentTitle = Ce
}, function(e, t, n) {
    var r = n(2)("keys"),
        i = n(119);
    e.exports = function(e) {
        return r[e] || (r[e] = i(e))
    }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(20),
        i = Math.max,
        a = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? i(e + t, 0) : a(e, t)
    }
}, function(e, t, n) {
    e.exports = n(124)()
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(120)),
        c = n(117),
        u = n(35),
        l = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        d = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.checkLoad = Object(s["default"])(function(e) {
                    var t = l(e, 3),
                        n = t[0],
                        r = t[1],
                        i = t[2];
                    return a.loading ? void 0 : a.props.virtualized || a.props.hasMore ? void(r - n - i <= a.props.threshold && (a.loading = !0, a.props.loadMore().then(function() {
                        a.loading = !1
                    }))) : a.detachListeners()
                }, 34), a.onScroll = function(e) {
                    var t = a.getScrollData();
                    a.props.virtualized && a.processChildren(a.props.children, t), a.props.hasMore && a.checkLoad(t)
                }, a.getRef = function(e) {
                    a.container = e, a.props.virtualized && a.setState(a.getChildrenData(a.props.children, a.getScrollData()))
                }, a.useWindowScroll = n.useWindowScroll, n.virtualized && (a.state = {
                    before: 0,
                    after: n.children.length,
                    start: 0,
                    end: 0
                }), a
            }
            return a(t, e), t.prototype.getScrollData = function() {
                var e = this.useWindowScroll ? document.body : this.container;
                return [this.getScrollTop(), e ? e.scrollHeight : 0, e ? e.clientHeight : 0]
            }, t.prototype.getScrollTop = function() {
                var e = document.documentElement || document.body.parentNode || document.body;
                return this.useWindowScroll ? void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollTop : this.container ? this.container.scrollTop : 0
            }, t.prototype.attachListeners = function() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.addEventListener("scroll", this.onScroll, this.props.useCapture), e.addEventListener("resize", this.onScroll, this.props.useCapture))
            }, t.prototype.detachListeners = function() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.removeEventListener("scroll", this.onScroll, this.props.useCapture), e.removeEventListener("resize", this.onScroll, this.props.useCapture))
            }, t.prototype.processChildren = function(e, t) {
                var n = this.state,
                    r = this.getChildrenData(e, t || this.getScrollData()),
                    i = r.start,
                    a = r.end,
                    o = r.before,
                    s = r.after;
                (i !== n.start || a !== n.end || o !== n.before || s !== n.after) && this.setState(r)
            }, t.prototype.getChildrenData = function(e, t) {
                var n = l(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2],
                    o = this.useWindowScroll ? window : this.container,
                    s = o && o.offsetHeight;
                if (!o || 0 === i || 0 === a) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                a = Math.max(a, s);
                var c = e.length,
                    u = Math.max(Math.floor(r / this.props.itemHeight) - 1, 0),
                    d = Math.min(Math.floor((r + 2 * a) / this.props.itemHeight + 1), c),
                    f = {
                        start: u,
                        end: d,
                        before: u,
                        after: c - d
                    };
                return f
            }, t.prototype.componentWillReceiveProps = function(e) {
                this.props.virtualized && this.processChildren(e.children)
            }, t.prototype.componentDidMount = function() {
                this.attachListeners()
            }, t.prototype.componentWillUnmount = function() {
                this.detachListeners()
            }, t.prototype.render = function() {
                return o.createElement("div", {
                    className: Object(u.classNames)("InfiniteScroll", this.props.className),
                    ref: this.getRef,
                    style: this.props.style
                }, this.props.virtualized && this.state.before > 0 && o.createElement("div", {
                    style: {
                        height: this.state.before * this.props.itemHeight
                    },
                    key: "before"
                }), this.props.virtualized ? [].concat(this.props.children).slice(this.state.start, this.state.end) : this.props.children, this.props.virtualized && this.state.after > 0 && o.createElement("div", {
                    style: {
                        height: this.state.after * this.props.itemHeight
                    },
                    key: "after"
                }), this.props.hasMore && (this.props.loader || o.createElement("div", {
                    className: "InfiniteScroll__loader",
                    key: "loader"
                }, o.createElement(c["default"], null))))
            }, t
        }(o.Component);
    t["default"] = d, d.defaultProps = {
        useWindowScroll: !1,
        virtualized: !1,
        hasMore: !0,
        useCapture: !1,
        threshold: 100,
        itemHeight: 55
    }
}, function(e, t, n) {
    var r = n(196),
        i = n(202),
        a = n(96);
    e.exports = n(182) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var n, o = a(t), s = o.length, c = 0; s > c;) r.f(e, n = o[c++], t[n]);
        return e
    }
}, function(e, t, n) {
    var r = n(196),
        i = n(92);
    e.exports = n(182) ? function(e, t, n) {
        return r.f(e, t, i(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, , function(e, t, n) {
    e.exports = n(193)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(133)),
        c = n(35),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = function(e) {
            function t() {
                return r(this, t), i(this, e.apply(this, arguments))
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = Object(s["default"])(e, ["appearance", "wide", "size"]),
                    n = Object(c.classNames)("Button", "Button--" + e.appearance, "Button--size-" + e.size, {
                        "Button--wide": !!e.wide,
                        "Button--disabled": !!e.disabled,
                        "Button--loading": !!e.loading
                    }, e.className);
                return o.createElement("button", u({}, t, {
                    className: n
                }), e.children)
            }, t
        }(o.Component);
    t["default"] = l, l.defaultProps = {
        appearance: "primary",
        size: "m",
        wide: !1
    }
}, function(e, t, n) {
    "use strict";
    var r = n(157),
        i = n(134),
        a = n(29),
        o = n(152),
        s = n(109),
        c = n(86),
        u = n(97),
        l = n(129),
        d = n(87),
        f = n(78),
        p = n(113),
        m = n(142);
    e.exports = function(e, t, n, g, h, _) {
        var v = r[e],
            b = v,
            y = h ? "set" : "add",
            w = b && b.prototype,
            O = {},
            C = function(e) {
                var t = w[e];
                a(w, e, "delete" == e ? function(e) {
                    return _ && !l(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return _ && !l(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return _ && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (_ || w.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var k = new b,
                E = k[y](_ ? {} : -0, 1) != k,
                j = d(function() {
                    k.has(1)
                }),
                S = f(function(e) {
                    new b(e)
                }),
                T = !_ && d(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            S || (b = t(function(t, n) {
                u(t, b, e);
                var r = m(new v, t, b);
                return void 0 != n && c(n, h, r[y], r), r
            }), b.prototype = w, w.constructor = b), (j || T) && (C("delete"), C("has"), h && C("get")), (T || E) && C(y), _ && w.clear && delete w.clear
        } else b = g.getConstructor(t, e, h, y), o(b.prototype, n), s.NEED = !0;
        return p(b, e), O[e] = b, i(i.G + i.W + i.F * (b != v), O), _ || g.setStrong(b, e, h), b
    }
}, function(e, t, n) {
    "use strict";
    var r = n(108);
    e.exports = n(16)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = r.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return r.def(this, 0 === e ? 0 : e, t)
        }
    }, r, !0)
}, function(e, t) {}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.get().tabs,
            n = e.get().peer,
            r = Object.keys(t).filter(function(t) {
                return Object(a.isFullyLoadedTab)(e, t) && intval(t) !== n
            }).map(function(e) {
                return t[e]
            });
        r.filter(function(e) {
            return Date.now() - e.last_visited > c
        }).forEach(function(t) {
            return e.set(o.cleanTab.bind(null, t.peerId))
        }), r.filter(function(t) {
            return Object(a.isFullyLoadedTab)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > u
        }).forEach(function(t) {
            return e.set(o.stringifyTab.bind(null, t.peerId))
        })
    }

    function i(e) {
        var t = setInterval(r.bind(null, e), s);
        return {
            unmount: function() {
                clearInterval(t)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return i
    });
    var a = n(81),
        o = n(41),
        s = 5e3,
        c = 54e6,
        u = 72e5
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = w.slice(0, w.length);
        if ("types" === e) {
            for (var n = t.length, r = 0; n > r; ++r) t.push(t[r].toUpperCase());
            return "*." + t.join(";*.")
        }
        return "accept" === e ? "." + w.join(",.") : "mask" === e ? w.join("|") : ""
    }

    function i(e, t, n) {
        var r = void 0 !== t.ind ? t.ind : t,
            i = t.fileName ? r + "_" + t.fileName : t;
        re("upload" + i + "_progress_wrap"), e().unchoose(i);
        var a = geByClass1("popup_box_container");
        if (!a) {
            var o = getLang("mail_add_doc_error");
            "photo" === Upload.options[r].file_name ? o = getLang("mail_add_photo_error") : "video_file" === Upload.options[r].file_name && (o = getLang("video_upload_error")), setTimeout(showFastBox({
                title: getLang("global_error")
            }, o).hide, 2e3)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    }

    function a(e) {
        var t = void 0 !== e.ind ? e.ind : e,
            n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
            r = n ? t + "_" + n : e,
            i = ge("upload" + r + "_progress_wrap");
        return i && hide(geByClass1("progress_x", i)), r
    }

    function o(e, t, n, r) {
        var o = a(e);
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, t), {
            onDone: function(e, t) {
                r().choose("photo", e, extend(t, {
                    upload_ind: o
                }))
            },
            onFail: i.bind(null, r, e)
        })
    }

    function s(e, t, n, r) {
        var o = a(e),
            s = {
                act: "a_save_doc",
                from: "choose",
                mail_add: 1
            };
        n.opts.imhash && (s = extend(s, {
            from_place: "from_gim",
            imhash: n.opts.imhash
        })), ajax.post("docs.php", extend(s, t), {
            onDone: function(e, t, n) {
                r().choose("doc", e + "_" + t, extend(n, {
                    upload_ind: o
                }))
            },
            onFail: i.bind(null, r, e)
        })
    }

    function c(e, t) {
        if (!e().canAddMedia()) return "none";
        if (!t.items || !t.items.length) return "media";
        var n = "^(" + r("mask") + ")",
            i = [].slice.call(t.items).every(function(e) {
                var t = e.type.split("/");
                return new RegExp(n, "i").test(t[1])
            });
        if (i) return "photo";
        var a = [].slice.call(t.items).every(function(e) {
            var t = e.type.split("/");
            return "video" === t[0] || ~O.indexOf(e.type)
        });
        return a ? "video" : "doc"
    }

    function u(e) {
        var t = geByClass1(y),
            n = geByClass1("im-page--chat-header").getBoundingClientRect(),
            r = geByClass1("im-chat-input").getBoundingClientRect();
        (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
    }

    function l() {
        var e = geByClass1(y);
        hide(e)
    }

    function d(e, t, n) {
        return {
            loaded: t,
            total: n,
            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
        }
    }

    function f(e, t, n, r) {
        var i = "string" == typeof t && t.indexOf("TERMINATED") > -1;
        i || Upload.onUploadError(e), r().reHeight(n)
    }

    function p(e, t, n, a) {
        var s = t.get().upload_opts,
            p = geByClass1("_im_upload_photo"),
            m = geByClass1("_im_drop_photo");
        return Upload.init(p, s.url, s.params, {
            accept: r("accept"),
            file_name: "photo",
            file_size_limit: 26214400,
            file_types: r("types"),
            file_match: s.opts.ext_re,
            lang: s.opts.lang,
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "photo",
            max_attempts: 3,
            server: s.opts.server,
            error: s.opts.default_error,
            error_hash: s.opts.error_hash,
            dropbox: m,
            dragEl: bodyNode,
            onNoFilteredCallback: function(e) {
                Upload.onFileApiSend(a, e)
            },
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, r) {
                var i = window.parseJSON(r);
                i.photos ? (statlogsValueEvent("upload_photo_fails", 1, s.opts.server, "success"), o(e, i, s, n)) : f(e, r, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var i = void 0 !== e.ind ? e.ind : e;
                n().progress("photo", i, d(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, s.opts.server, t), i(n, e, t)
            },
            onDragEnter: function(e) {
                var t = geByClass1("im-audio-message_recording");
                e.dataTransfer && !t && u(c(n, e.dataTransfer))
            },
            onDragOut: function() {
                l()
            },
            onDrop: function() {
                l()
            }
        })
    }

    function m(e, t, n, r) {
        var a = t.get().upload_video_opts;
        if (a) {
            var o = geByClass1("_im_upload_video"),
                s = geByClass1("_im_drop_video");
            return a.options.visible_dropbox = !1, Object(v.getUploadModule)(o, s, a, {
                onUploadStart: function(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete: function(e, r) {
                    var i = window.parseJSON(r);
                    i.video_id ? Object(v.onVideoUploaded)(e, i, t.get().textMediaSelector, function(e, n) {
                        var r = document.querySelector('[data-video="' + n + '"]'),
                            i = e.editable.sizes.x[0] || e.thumb;
                        if (r && i) {
                            r.style.backgroundImage = "url(" + i + ")";
                            var a = gpeByClass("_im_mess", r);
                            a && Object(b.updateVideoThumb)(t, a)
                        }
                    }) : f(e, r, t, n)
                },
                onUploadProgress: function(e, t, r) {
                    var i = void 0 !== e.ind ? e.ind : e;
                    n().progress("video", i, d(e, t, r))
                },
                onUploadError: function(e, t) {
                    statlogsValueEvent("upload_video_fails", 1, a.options.server, t), i(n, e, t)
                },
                onNoFilteredCallback: function(e) {
                    Upload.onFileApiSend(r, e)
                },
                onDragEnter: function(e) {
                    var t = geByClass1("im-audio-message_recording");
                    e.dataTransfer && !t && u(c(n, e.dataTransfer))
                },
                onDragOut: function() {
                    l()
                },
                onDrop: function() {
                    l()
                }
            })
        }
    }

    function g(e, t, n) {
        var r = t.get().upload_doc_opts,
            a = geByClass1("_im_upload_doc"),
            o = geByClass1("_im_drop_doc");
        return Upload.init(a, r.url, r.params, {
            file_name: "file",
            file_size_limit: 209715200,
            file_types: "*.*;",
            lang: r.opts.lang,
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "doc",
            max_attempts: 3,
            server: r.opts.server,
            error: r.opts.default_error,
            error_hash: r.opts.error_hash,
            dropbox: o,
            dragEl: bodyNode,
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, i) {
                var a = window.parseJSON(i);
                a.file ? (statlogsValueEvent("upload_doc_fails", 1, r.opts.server, "success"), s(e, a, r, n)) : f(e, i, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var i = void 0 !== e.ind ? e.ind : e;
                n().progress("doc", i, d(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_doc_fails", 1, r.opts.server, t), i(n, e, t)
            }
        })
    }

    function h(e, t, n) {
        removeEvent(bodyNode, "dragover dragenter");
        var r = g(e, t, n),
            i = p(e, t, n, r),
            a = m(e, t, n, r);
        cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
        var o = Object(_.createModule)({
            handlers: function(e) {
                var t = ge("im_full_upload"),
                    r = ge("im_full_upload_video");
                e(t, "change", function a(r) {
                    n().canAddMedia() ? Upload.onFileApiSend(i, r.target.files) : showFastBox(getLang("global_error"), getLang("global_error")), Object(_.destroyModule)(o);
                    var s = t.cloneNode();
                    t.parentNode.replaceChild(s, t), t = s, e(t, "change", a)
                }), e(r, "change", function s(t) {
                    n().canAddMedia() ? Upload.onFileApiSend(r, t.target.files) : showFastBox(getLang("global_error"), getLang("global_error")), Object(_.destroyModule)(o);
                    var i = r.cloneNode();
                    r.parentNode.replaceChild(i, r), r = i, e(r, "change", s)
                })
            }
        });
        return {
            paste: function(e) {
                Upload.onFileApiSend(i, e)
            },
            unmount: function() {
                Object(_.destroyModule)(o), Upload.deinit(i), Upload.deinit(a), Upload.deinit(r)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return h
    });
    var _ = n(110),
        v = n(186),
        b = n(41),
        y = "_im_upload_dropbox",
        w = "jpg jpeg png gif heic heif".split(" "),
        O = ["application/vnd.rn-realmedia-vbr", "application/vnd.rn-realmedia"]
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(24),
        c = n(148),
        u = n(175),
        l = n(15),
        d = n(162),
        f = n(154),
        p = n(153),
        m = n(107),
        g = n(65),
        h = Math.log2 || function(e) {
            return Math.log(e) / Math.LN2
        },
        _ = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onChange = function(e) {
                    var t = e.name,
                        n = e.selected.value,
                        r = a.state.flags;
                    a.setState({
                        flags: n ? r | 1 << t : r & ~(1 << t)
                    })
                }, a.onCancel = function() {
                    a.setState({
                        flags: a.props.tab.data.flags
                    }), a.props.back()
                }, a.onSave = function() {
                    a.state.loading || (a.setState({
                        loading: !0
                    }), a.props.onSave(a.state.flags).then(function() {
                        a.setState({
                            loading: !1,
                            saved: !0
                        })
                    })["catch"](function(e) {
                        a.setState({
                            loading: !1,
                            flags: a.props.tab.data.flags
                        })
                    }))
                }, a.onBlinkTextHide = function() {
                    a.setState({
                        saved: !1
                    })
                }, a.state = {
                    flags: n.tab.data.flags,
                    loading: !1,
                    saved: !1
                }, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.getLang,
                    r = t.tab,
                    i = this.state.flags,
                    a = [{
                        value: !0,
                        label: n("mail_settings_only_admins")
                    }, {
                        value: !1,
                        label: n("mail_settings_all_members")
                    }],
                    _ = r.serverSettings;
                return o.createElement("div", {
                    className: "ChatSettingsOptions"
                }, o.createElement(s["default"], null, o.createElement(c["default"], {
                    selectable: !1,
                    aside: o.createElement(u["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: h(g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE),
                        options: a,
                        value: !!(i & g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE)
                    })
                }, o.createElement(m["default"], {
                    type: "plus"
                }), n("mail_settings_can_invite")), o.createElement(c["default"], {
                    selectable: !1,
                    aside: o.createElement(u["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: h(g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK),
                        options: a,
                        value: !!(i & g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK)
                    })
                }, o.createElement(m["default"], {
                    type: "remove"
                }), n("mail_settings_can_kick")), o.createElement(c["default"], {
                    selectable: !1,
                    aside: o.createElement(u["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: h(g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE),
                        options: a,
                        value: !!(i & g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE)
                    })
                }, o.createElement(m["default"], {
                    type: "pencil"
                }), n("mail_settings_can_edit_info")), o.createElement(c["default"], {
                    selectable: !1,
                    aside: o.createElement(u["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: h(g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN),
                        options: a,
                        value: !!(i & g.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN)
                    })
                }, o.createElement(m["default"], {
                    type: "pin"
                }), n("mail_settings_can_pin")), o.createElement(c["default"], {
                    selectable: !1,
                    aside: o.createElement(u["default"], {
                        className: "ChatSettingsOptions__longselect",
                        onChange: this.onChange,
                        name: h(g.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS),
                        options: [{
                            value: !1,
                            label: n("mail_settings_only_owner")
                        }, {
                            value: !0,
                            label: n("mail_settings_owner_and_admins")
                        }],
                        value: !!(i & g.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS)
                    })
                }, o.createElement(m["default"], {
                    type: "user"
                }), n("mail_settings_admins_can_add_admins")), _.map(function(t) {
                    return o.createElement(c["default"], {
                        selectable: !1,
                        key: t.name,
                        aside: o.createElement(u["default"], {
                            className: "ChatSettingsOptions__select",
                            onChange: e.onChange,
                            name: h(t.bit),
                            options: t.options,
                            value: !!(i & t.bit)
                        })
                    }, o.createElement(m["default"], {
                        type: t.icon
                    }), t.name)
                })), o.createElement(f["default"], {
                    alignment: "right"
                }, o.createElement("div", {
                    className: "ChatSettingsOptions__saved"
                }, o.createElement(p["default"], {
                    shown: this.state.saved,
                    callback: this.onBlinkTextHide
                }, n("global_changes_saved"))), o.createElement(l["default"], {
                    appearance: "tertiary",
                    onClick: this.onCancel
                }, n("global_cancel")), o.createElement(d["default"], {
                    onClick: this.onSave,
                    loading: this.state.loading
                }, n("global_save"))))
            }, t
        }(o.Component);
    t["default"] = _
}, function(e, t, n) {
    "use strict";
    n.r(t), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return n;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return this[n]
        }
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = {
            "List--border": !!e.border
        };
        return i.createElement("ul", {
            className: Object(a.classNames)("List", t, e.className),
            style: e.style
        }, e.children)
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = (n(9), n(35));
    r.defaultProps = {
        border: !0
    }
}, function(e, t, n) {
    var r = n(129),
        i = n(157).document,
        a = r(i) && r(i.createElement);
    e.exports = function(e) {
        return a ? i.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function i(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            i = 0;
        return function a() {
            for (var o = arguments.length, s = Array(o), c = 0; o > c; c++) s[c] = arguments[c];
            return Promise.resolve().then(function() {
                return e.apply(void 0, s)
            })["catch"](function(e) {
                if (i++, t >= i) {
                    var o = "function" == typeof n ? n(i) : 0;
                    return 0 === o ? a.apply(void 0, s) : r(o).then(function() {
                        return a.apply(void 0, s)
                    })
                }
                throw e
            })
        }
    }

    function a(e, t, n) {
        var r = void 0,
            i = void 0;
        return function() {
            for (var a = arguments.length, o = Array(a), s = 0; a > s; s++) o[s] = arguments[s];
            return new Promise(function(e, a) {
                var s = function() {
                        r = null, i = null, n || e(o)
                    },
                    c = n && !r;
                clearTimeout(r), i && i.reject("debounce"), r = setTimeout(s, t), c ? e(o) : n && a("debounce"), i = {
                    resolve: e,
                    reject: a
                }
            }).then(function(t) {
                return e.apply(void 0, t)
            })
        }
    }

    function o(e, t) {
        var n = void 0,
            r = new Promise(function(r) {
                n = r, setTimeout(r.bind(null, t), 1e3 * e)
            });
        return {
            pause: function() {
                return r
            },
            abort: function() {
                n(t)
            }
        }
    }
    n.r(t), n.d(t, "pause", function() {
        return r
    }), n.d(t, "retryFn", function() {
        return i
    }), n.d(t, "debouncedPromise", function() {
        return a
    }), n.d(t, "abortablePause", function() {
        return o
    })
}, function(e, t, n) {
    var r = n(20),
        i = n(143);
    e.exports = function(e) {
        return function(t, n) {
            var a, o, s = String(i(t)),
                c = r(n),
                u = s.length;
            return 0 > c || c >= u ? e ? "" : void 0 : (a = s.charCodeAt(c), 55296 > a || a > 56319 || c + 1 === u || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) : (a - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, function(e, t, n) {
    var r = n(157),
        i = n(12),
        a = n(66),
        o = n(119)("src"),
        s = "toString",
        c = Function[s],
        u = ("" + c).split(s);
    n(104).inspectSource = function(e) {
        return c.call(e)
    }, (e.exports = function(e, t, n, s) {
        var c = "function" == typeof n;
        c && (a(n, "name") || i(n, "name", t)), e[t] !== n && (c && (a(n, o) || i(n, o, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || c.call(this)
    })
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    n.r(t), n.d(t, "OUR_DOMAINS", function() {
        return C
    }), n.d(t, "ENTITIES", function() {
        return k
    }), n.d(t, "VK_DOMAIN", function() {
        return E
    }), n.d(t, "MENTION", function() {
        return j
    }), n.d(t, "MENTION_RAW", function() {
        return S
    }), n.d(t, "ARROW_UP", function() {
        return T
    }), n.d(t, "ARROW_DOWN", function() {
        return I
    }), n.d(t, "PAGE_UP", function() {
        return L
    }), n.d(t, "PAGE_DOWN", function() {
        return x
    }), n.d(t, "END_KEY", function() {
        return P
    }), n.d(t, "HOME", function() {
        return M
    }), n.d(t, "ENTER", function() {
        return A
    }), n.d(t, "ESC", function() {
        return N
    }), n.d(t, "UNPRINTABLE_KEYS", function() {
        return D
    }), n.d(t, "UP_DOWN_CONTROLS", function() {
        return R
    }), n.d(t, "PRINTABLE", function() {
        return F
    }), n.d(t, "FOLDER_UNREAD", function() {
        return B
    }), n.d(t, "FOLDER_ALL", function() {
        return H
    }), n.d(t, "FOLDER_UNRESPOND", function() {
        return U
    }), n.d(t, "FOLDER_IMPORTANT", function() {
        return z
    }), n.d(t, "FOLDERS", function() {
        return G
    }), n.d(t, "FOLDER_MASKS", function() {
        return V
    }), n.d(t, "TOP_DOMAINS", function() {
        return W
    }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
        return q
    }), n.d(t, "EMAIL", function() {
        return K
    }), n.d(t, "MESSAGE_REGEXP", function() {
        return Q
    }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
        return ne
    });
    var i, a = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        o = "(https?:\\/\\/)?",
        s = "((?:[" + a + "\\—\\-\\_]+\\.){1,5})",
        c = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        u = "(?:\\:(\\d{2,5}))",
        l = "(" + s + c + u + "?)",
        d = "([\\/?#])",
        f = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        p = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        m = "　-〿＀-￯",
        g = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        h = "[" + f + g + p + m + "]",
        _ = "(?:\\(|\\[)[" + a + "\\d&#%;,]+(?:\\)|\\])",
        v = "(" + d + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + h + "+|" + _ + "){0,200})?",
        b = o + l + v,
        y = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
        w = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        O = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        C = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
        k = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
        E = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
        j = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
        S = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
        T = 38,
        I = 40,
        L = 33,
        x = 34,
        P = 35,
        M = 36,
        A = 13,
        N = 27,
        D = [T, I, L, x, A, N, P, M],
        R = [L, x, I, T, M, P],
        F = "printable",
        B = "unread",
        H = "all",
        U = "unrespond",
        z = "important",
        G = [H, B, U, z],
        V = (i = {}, r(i, U, 2), r(i, z, 1), i),
        W = [].concat(y.split(","), w.split(","), O.split(",").map(function(e) {
            return "xn--" + e
        })),
        q = W.reduce(function(e, t) {
            return Math.max(e, t.length)
        }, 0),
        K = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + c + "))", "ig"),
        Q = new RegExp(b, "ig"),
        Y = "#",
        $ = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
        X = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
        Z = "(?:[" + $ + "]|" + X + ")",
        J = "(?:[" + $ + "_\\d]|" + X + ")",
        ee = "(" + Y + J + "{0,100}" + Z + J + "{0,100})",
        te = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)",
        ne = "(^|[s.,:'\";>)(]?)(" + ee + ")(@" + te + ")?(?=$|[s.,:'\"&;?<)(]?)"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(198),
        c = n(121),
        u = n(65),
        l = n(56),
        d = n(41),
        f = function(e) {
            function t() {
                var n, a, o;
                r(this, t);
                for (var s = arguments.length, c = Array(s), u = 0; s > u; u++) c[u] = arguments[u];
                return n = a = i(this, e.call.apply(e, [this].concat(c))), a.toggleAdmin = function() {
                    var e = a.props,
                        t = e.store,
                        n = e.mid,
                        r = e.adminMap,
                        i = t.get().peer,
                        o = !r[n];
                    t.set(d.toggleAdminOptimisticly.bind(null, i, n, o)), t.set(d.toggleAdmin.bind(null, i, n, o))
                }, a.kick = function() {
                    var e = a.props.store,
                        t = e.get().peer,
                        n = a.props.mid;
                    e.set(d.kickUserOptimisticly.bind(null, t, n)), e.set(d.kickUser.bind(null, t, n))["catch"](function(e) {
                        Object(l.imWeirdCatch)("ChatSettingsMemberEdit.kick", e)
                    })
                }, o = n, i(a, o)
            }
            return a(t, e), t.prototype.getMemberRole = function(e, t) {
                var n = this.props.storeData,
                    r = n.peer,
                    i = n.tabs[r];
                return t === i.ownerId ? getLang("mail_settings_owner") : e[t] ? getLang("mail_settings_admin") : null
            }, t.prototype.getActions = function(e) {
                var t = window.vk.id,
                    n = this.props,
                    r = n.store,
                    i = n.getLang,
                    a = n.mid,
                    o = t === a,
                    s = [];
                return o ? [{
                    text: i("mail_leave_chat"),
                    onClick: this.props.onLeave
                }] : (Object(u.canAddAdmin)(r, a) && s.push({
                    text: i(e[a] ? "mail_chat_remove_admin" : "mail_settings_appoint_admin"),
                    onClick: this.toggleAdmin
                }), Object(u.canKickUser)(r, a) && s.push({
                    text: i("mail_settings_kick"),
                    onClick: this.kick
                }), s)
            }, t.prototype.render = function() {
                var e = window.vk.id,
                    t = this.props,
                    n = t.getLang,
                    r = t.adminMap,
                    i = t.storeData,
                    a = t.mid,
                    l = !!r[e],
                    d = this.getMemberRole(r, a),
                    f = e === a,
                    p = l && this.getActions(r);
                return o.createElement(o.Fragment, null, d && o.createElement("span", {
                    className: "ChatSettingsMembersEdit__role"
                }, d), p && p.length > 0 && o.createElement(s["default"], {
                    position: "b",
                    align: "right",
                    trigger: "hover",
                    marginTop: -8,
                    marginLeft: 1,
                    data: this.getActions(r)
                }, o.createElement("span", {
                    className: "ChatSettingsMembersEdit__actions"
                })), !l && !f && Object(u.canKickUser)(i, a) && o.createElement(c["default"], {
                    text: n("mail_settings_kick"),
                    position: "t",
                    align: "right"
                }, o.createElement("span", {
                    onClick: this.kick,
                    className: "ChatSettingsMembersEdit__kick"
                })), !l && f && o.createElement(c["default"], {
                    text: n("mail_leave_chat"),
                    position: "t",
                    align: "right"
                }, o.createElement("span", {
                    onClick: this.props.onLeave,
                    className: "ChatSettingsMembersEdit__kick"
                })))
            }, t
        }(o.Component);
    t["default"] = f
}, , , function(e, t, n) {
    var r = n(66),
        i = n(174),
        a = n(3)(!1),
        o = n(6)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = i(e),
            c = 0,
            u = [];
        for (n in s) n != o && r(s, n) && u.push(n);
        for (; t.length > c;) r(s, n = t[c++]) && (~a(u, n) || u.push(n));
        return u
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = [];
        return [].concat(Array.prototype.slice.call(arguments)).forEach(function(t) {
            if (t) switch ("undefined" == typeof t ? "undefined" : i(t)) {
                case "string":
                    e.push(t);
                    break;
                case "object":
                    Object.keys(t).forEach(function(n) {
                        t[n] && e.push(n)
                    });
                    break;
                default:
                    e.push("" + t)
            }
        }), e.join(" ")
    }
    n.r(t), n.d(t, "classNames", function() {
        return r
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia,
            t = function(t) {
                return new Promise(function(n, r) {
                    e ? e.call(navigator, t, n, r) : r(new Error("NotSupported"))
                })
            },
            n = function() {
                return new Promise(function(e, t) {
                    if (MediaStreamTrack && MediaStreamTrack.getSources) {
                        var n = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return MediaStreamTrack.getSources(function(t) {
                            e(t.map(function(e) {
                                return {
                                    label: e.label,
                                    kind: n[e.kind],
                                    deviceId: e.id,
                                    groupId: ""
                                }
                            }))
                        })
                    }
                    t(new Error("NotSupported"))
                })
            };
        e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = t), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = n)), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
    }
    n.r(t), n.d(t, "initFailBack", function() {
        return r
    })
}, function(e, t, n) {
    var r = n(66),
        i = n(150),
        a = n(6)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
}, function(e, t, n) {
    var r = n(2)("wks"),
        i = n(119),
        a = n(157).Symbol,
        o = "function" == typeof a;
    e.exports = function(e) {
        return r[e] || (r[e] = o && a[e] || (o ? a : i)("Symbol." + e))
    }
}, function(e, t, n) {
    var r = n(26),
        i = n(38)("iterator"),
        a = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || a[i] === e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t, n) {
        return !e.map(function(e) {
            var r = Object(x.getMessage)(t, n, e);
            return Object(P.isImportant)(r)
        }).reduce(function(e, t) {
            return e && t
        }, !1)
    }

    function a(e, t) {
        var n = t.get(),
            r = n.peer,
            i = n.tabs[r].pinned;
        return 1 === e.length && i && e[0] === Object(x.parserMessage)(i).messageId
    }

    function o(e, t) {
        var n = e.get().peer,
            r = geByClass1("_im_page_peer_online", t);
        r && Object(I.isUserPeer)(n) && Object(x.getTab)(e, n) && Object(I.applyInnerHtml)(r, Object(I.getLastSeenTextInHeader)(e, n))
    }

    function s(e, t, n) {
        geByClass("_im_header_icon", e).forEach(function(e) {
            if (n.length > 0) hide(e);
            else if ("star" === domData(e, "type") && Object(I.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", Object(I.isImportant)(t)), setStyle(e, {
                    display: "inline-block"
                })), "answer" === domData(e, "type") && Object(I.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", Object(I.isUnrespond)(t)), Object(I.isUnrespond)(t) ? setStyle(e, {
                    display: "inline-block"
                }) : hide(e)), "search" === domData(e, "type") && !Object(I.isCommunityInterface)(t)) {
                var r = Object(I.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                setStyle(e, {
                    display: "inline-block"
                }), toggleClass(e, "im-page-header-icon_search-shown", r)
            }
        })
    }

    function c(e, t, n) {
        var r = getLang("mail_selected_shorted", t.length);
        f({
            actions: !0
        }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
            label: r.replace("{count}", t.length),
            tip: getLang("mail_deselect_all")
        }));
        var o = Object(x.getTab)(n, n.get().peer),
            s = geByClass1(z, e),
            c = i(t, n, n.get().peer),
            u = a(t, n),
            l = Object(I.isChatPeer)(o.peerId) && Object(D.canPinOrUnpin)(n, o.peerId),
            d = Object(I.isFvkcomgroup)(n, o.peerId);
        toggleClass(s, "im-page--mess-actions_important", !c), toggleClass(s, "im-page--mess-actions_pinned", u), toggleClass(s, "im-page--mess-actions_vkcomgroup", d && !n.get().gid), toggleClass(s, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(s, "im-page--mess-actions_no-pin-btn", !l);
        var p = c ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
            m = u ? getLang("mail_unpin") : getLang("mail_pin");
        attr(geByClass1("im-page-action_star", e), "aria-label", p), attr(geByClass1("im-page-action_pin", e), "aria-label", m)
    }

    function u(e, t, n) {
        var i = t.get(),
            a = i.peer,
            o = i.tabs[a],
            c = clean(stripHTML(unclean(o.tab))),
            p = geByClass1(W, e),
            m = geByClass1(I.PINNED_CONTAINER_CLASS),
            g = Object(I.isChatPeer)(a),
            h = g && Object(I.isFvkcomgroup)(t, a);
        p.tt = !1;
        var _ = Object(I.renderPhotosFromTab)(t, o, !0),
            v = getTemplate("im_simple_link", {
                href: h ? "/club_" + -o.ownerId : o.href,
                content: getTemplate("im_peer_photo", {
                    online_class: "",
                    owner_photo: _,
                    modifier_class: "nim-peer_smaller"
                })
            });
        val(geByClass1("im-page--aside-photo", e), v);
        var b = g ? !o.data.closed && !o.data.kicked : 0,
            y = {
                muted: inArray(a, i.mutedPeers),
                verified: !!o.verified,
                chat: g,
                actions: !1,
                derelict: g && !b && !h,
                pinned: !1
            };
        if (g) {
            var w = Object(x.getPinnedMessage)(t),
                O = d(t);
            w && Object(A.isPinnedMessageVisibleInTab)(t, a) && (O ? t.set(T.loadChatMember.bind(null, r({}, a, [O]))).then(u.bind(null, e, t, n)) : y.pinned = !0)
        }
        var C = "";
        g ? C = h ? getTemplate("im_vkcomgroup_members", {
            name: getLang("mail_im_n_vkcomgroup_members", Object(I.getAliveMembersCount)(o))
        }) : b ? getTemplate("im_chat_members", {
            name: getLang("mail_im_n_chat_members", Object(I.getAliveMembersCount)(o))
        }) : "" : Object(I.isUserPeer)(a) && (C = Object(I.getLastSeenTextInHeader)(t, a));
        var k = getTemplate("im_simple_name", {
            name: o.tab,
            href: h ? "/club_" + -o.ownerId : o.href,
            name_attr: c,
            ads_union: o.ad_union_ids_attr,
            online: C,
            more_cls: "" === C ? "im-page--title--1line" : ""
        });
        val(geByClass1("im-page--title-wrapper", e), k);
        var E = val(m) && !o.top_banner,
            j = l(t) && !o.top_banner,
            S = geByClass1(B, e);
        if (removeClass(S, I.DESELECT_ALL_CLASS), show(geByClass1(U, e)), removeClass(geByClass1(z, e), "im-page--mess-actions_visible"), removeClass(geByClass1(z, e), "im-page--mess-actions_all-sel"), s(e, t, []), Object(I.isClassicInterface)(t)) {
            var L = geByClass1("_im_page_back", e);
            attr(L, "href", Object(I.getBaseLink)(t) + "?tab=" + i.active_tab)
        }
        f(y, "im-page--chat-header"), Object(I.compensateHistoryHeightChange)(t, j, E, n)
    }

    function l(e) {
        var t = Object(x.getPinnedMessage)(e),
            n = geByClass1(I.PINNED_CONTAINER_CLASS);
        if (removeClass(n, "im-page--pinned_with-bar"), t && Object(P.isMoneyRequest)(t)) {
            if (void 0 === t.kludges.attach1_tr_amount) return;
            t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
        }
        var r = Object(I.renderPinnedMessage)(e);
        return val(n, r), !!r
    }

    function d(e) {
        var t = Object(x.getPinnedMessage)(e);
        return !t || Object(M.oCacheGet)(e, t.userId) ? !1 : t.userId
    }

    function f(e, t) {
        var n = geByClass1(t);
        Object.keys(e).forEach(function(r) {
            toggleClass(n, t + "_" + r, !!e[r])
        })
    }

    function p(e, t, n, r, i) {
        e.set(T.removeMessagesWithRestore.bind(null, n, i, r)).then(t().removeMessagesRestore.bind(null, n, i, r)), Object(T.removeMessageSend)(n, i, null, r, e.get())
    }

    function m(e, t, n, r, o) {
        var s = e.get().selectedMessages,
            c = domData(o, "action"),
            u = e.get().peer,
            l = !0;
        switch (c) {
            case "delete":
                var d = vk.id == u && !e.get().gid,
                    f = !d && s.every(function(t) {
                        return Object(I.canMessageBeDeletedForAll)(e, Object(x.getMessage)(e, u, t))
                    });
                if (f || s.length > 1) {
                    l = !1;
                    var m = Object(I.showMsgDeleteDialog)(u, s.length, f, function(r) {
                        b(e, t, n), m.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? Object(T.removeMessageSend)(s, u, null, "deleteforall", e.get()) : p(e, t, s, c, u)
                    })
                } else p(e, t, s, c, u);
                break;
            case "spam":
                p(e, t, s, c, u);
                break;
            case "forward":
                Object(T.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(T.prepareForward.bind(null, t))
                }).then(function() {
                    Object(I.isClassicInterface)(e) ? (cancelStackPush("forward", function(t) {
                        e.set(T.prepareForward.bind(null, null)).then(function() {
                            e.get().longpoll.push([Object(L.changePeer)(t)])
                        })
                    }.bind(null, e.get().peer)), e.get().longpoll.push([Object(L.resetPeer)(!0)])) : t().startForward(e)
                });
                break;
            case "star":
                var g = i(s, e, u);
                e.set(T.favMessage.bind(null, s, g, u)), e.get().longpoll.push(s.map(function(e) {
                    return {
                        type: g ? L.SET_FLAGS : L.RESET_FLAGS,
                        messageId: e,
                        peerId: u,
                        flags: L.FLAG_IMPORTANT
                    }
                }));
                break;
            case "respond":
                Object(T.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(T.forwardMessages.bind(null, t, e.get().tfdraft))
                }).then(function() {
                    t().respond(e, u)
                });
                break;
            case "pin":
                var h = Object(x.getLocalId)(e, s[0]),
                    _ = a(s, e),
                    v = _ ? T.unpinMessageOptimistic.bind(null, u) : T.pinMessageOptimistic.bind(null, h, u),
                    y = _ ? T.unpinMessage.bind(null, u) : T.pinMessage.bind(null, h, u),
                    w = k.bind(null, t, u);
                e.set(T.checkChatMember.bind(null, e, h, u)).then(function(e) {
                    return e.set(v)
                }).then(w).then(function(e) {
                    return e.set(y)
                }).then(w)
        }
        l && b(e, t, n)
    }

    function g(e, t, n, r, i, a) {
        if ("keydown" !== a.type || 13 === a.which) {
            var o = trim(val(i));
            return o ? (o !== n && e.set(T.updateChatTopic.bind(null, t, o)), !0) : (notaBene(i), !1)
        }
    }

    function h(e, t, n) {
        var r = showFastBox({
            title: getLang("mail_chat_invite_link"),
            dark: 1
        }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(i) {
            var a = gpeByClass("_im_invite_box", n.target),
                o = geByClass1(Y, a),
                s = geByClass1("_im_invite_new", a);
            lockButton(r.btns.ok[0]), Object(T.resetInviteLink)(t, e.get()).then(function(e) {
                var t = R(e, 1),
                    n = t[0];
                unlockButton(r.btns.ok[0]), o.value = n, unlockButton(s), addClass(a, "im-invite-box_reseted"), elfocus(o, 0, n.length), r.hide()
            })
        }, getLang("global_cancel"), function() {
            r.hide()
        })
    }

    function _(e, t, n) {
        if (Object(I.isChatPeer)(t)) {
            var r = e.get().tabs[t].name,
                i = g.bind(null, e, t, r, n),
                a = showFastBox({
                    title: getLang("mail_chat_topic_change_title"),
                    dark: 1
                }, getTemplate("im_chat_change_topic", {
                    value: r
                }), getLang("global_save"), function(e, t) {
                    var n = i(o, t);
                    n && a.hide()
                }, getLang("global_cancel"), function() {
                    a.hide()
                }),
                o = geByClass1(V, a.bodyNode);
            elfocus(o), addEvent(o, "keydown", function(e) {
                var t = i(o, e);
                t && a.hide()
            })
        }
    }

    function v(e, t, n, r, i, a) {
        var o = domData(a, "action"),
            s = geByClass1(H, r).parentNode,
            c = e.get().peer,
            u = Object(I.isFvkcomgroup)(e, c);
        switch (o) {
            case "clear":
                var l = Object(I.showFlushDialog)(c, function() {
                    Object(I.cleanHistory)(e, l, t, T.flushHistory, e.get().peer)
                });
                break;
            case "photos":
            case "media":
                showWiki({
                    w: "history" + Object(I.convertPeerToUrl)(c) + "_photo"
                }, null, {});
                break;
            case "topic":
                _(e, c, t);
                break;
            case "avatar":
                cur.recieveCropResult = void 0, Page.ownerPhoto(c);
                break;
            case "search":
                t().showSearch(e);
                break;
            case "block_community":
                e.set(T.toggleCommunityMessages.bind(null, !1, c)).then(function() {
                    e.get().longpoll.push([Object(L.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                });
                break;
            case "allow_community":
                e.set(T.toggleCommunityMessages.bind(null, !0, c)).then(function() {
                    n().changeActions(e)
                });
                break;
            case "block":
                var d = Object(I.showBlacklistBox)(c, e);
                d.once("success", function(t) {
                    t.delta && (showDoneBox(t.msg), e.get().longpoll.push([Object(L.resetPeer)()]))
                });
                break;
            case "leave":
                var f = showFastBox({
                    title: u ? getLang("mail_vkcomgroup_leave_title") : getLang("mail_chat_leave_title"),
                    dark: 1
                }, u ? getLang("mail_vkcomgroup_leave_confirm") : getLang("mail_chat_leave_confirm"), u ? getLang("mail_leave_vkcomgroup") : getLang("mail_leave_chat"), function() {
                    e.set(T.leaveChat.bind(null, c)), e.set(T.unpinMessageOptimistic.bind(null, c)), f.hide(), e.get().longpoll.push([Object(L.resetPeer)()])
                }, getLang("global_cancel"), function() {
                    f.hide()
                });
                break;
            case "invite_link":
                var p = h.bind(null, e, c),
                    m = !1,
                    g = !1,
                    v = !1,
                    b = function() {
                        elfocus(m, 0, m.value.length), document.execCommand("copy"), setStyle(g, {
                            opacity: 1
                        }), v && (v = clearTimeout(v)), v = setTimeout(function() {
                            return setStyle(g, {
                                opacity: 0
                            })
                        }, 2e3)
                    },
                    y = !1,
                    w = !1;
                showBox("al_im.php", {
                    act: "a_get_link",
                    gid: e.get().gid,
                    chat_id: c - 2e9,
                    markup: 1
                }, {
                    onDone: function(e) {
                        m = geByClass1(Y, e.bodyNode), y = geByClass1("_im_reset_link", e.bodyNode), w = geByClass1("_im_invite_copy", e.bodyNode), g = geByClass1("_im_invite_copied", e.bodyNode), elfocus(m, 0, m.value.length), addEvent(y, "click", p), addEvent(w, "click", b)
                    },
                    params: {
                        hideButtons: !0,
                        onHide: function() {
                            removeEvent(y, "click", p), removeEvent(w, "click", b)
                        },
                        onShow: function() {
                            addEvent(y, "click", p), addEvent(w, "click", b)
                        }
                    }
                }, {});
                break;
            case "return":
                e.set(T.returnToChat.bind(null, c)).then(function(e) {
                    return e.set(T.getPinnedMessage.bind(null, c))
                }).then(t().updateChatTopic.bind(null, c))["catch"](function(e) {
                    showFastBox(getLang("global_error"), e)
                });
                break;
            case "unmute":
            case "mute":
                e.set(T.toggleMutePeer.bind(null, c, "mute" === o)).then(t().updateState.bind(null, c));
                break;
            case "chat":
            case "invite":
                if (Object(I.isChatPeer)(c)) Object(I.inviteUser)(e, c, t, T.setCreationType);
                else if (Object(I.isUserPeer)(c)) {
                    var O = e.get().tabs[c],
                        C = [
                            [c, O.tab]
                        ];
                    e.set(T.setCreationType.bind(null, "chat", [])).then(function() {
                        return t().showCreation(e, C)
                    })
                }
                break;
            case "pin_hide":
                Object(A.pinnedMessageHide)(e, Object(x.getPeer)(e), t);
                break;
            case "pin_unhide":
                Object(A.pinnedMessageUnHide)(e, Object(x.getPeer)(e), t);
                break;
            case "unpin":
                Object(A.pinnedMessageUnpin)(e, Object(x.getPeer)(e), t);
                break;
            case "settings":
                n().showSettings(e)
        }
        uiActionsMenu.toggle(s, !1), t().cancelEditing()
    }

    function b(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(T.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
    }

    function y(e, t, n, r) {
        var i = Object(I.isClassicInterface)(e),
            a = void 0,
            o = void 0;
        switch (domData(r, "type")) {
            case "star":
                o = [4, 6], a = function() {
                    return Object(I.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                };
                break;
            case "answer":
                o = [4, 6], a = getLang("mail_end_conversation");
                break;
            case "search":
                o = i ? [5, 6] : [4, -9], a = getLang("mail_search_in_peer")
        }
        showTooltip(r, {
            text: a || "",
            black: 1,
            shift: o,
            forcetoup: !0,
            appendParentCls: i ? "_im_dialog_actions" : "_im_mess_actions"
        })
    }

    function w(e, t, n) {
        var r = Object(I.isClassicInterface)(e),
            i = domData(n.target, "action");
        "respond" !== i && "forward" !== i && showTooltip(n.target, {
            text: O.bind(null, e, i) || "",
            black: 1,
            shift: [2, r ? -4 : 11],
            forcetodown: !0,
            appendParentCls: "_im_dialog_actions"
        })
    }

    function O(e, t) {
        var n = e.get(),
            r = n.selectedMessages,
            o = n.peer;
        switch (t) {
            case "pin":
                return a(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
            case "star":
                return i(r, e, o) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
            case "delete":
                return getLang("mail_delete");
            case "spam":
                return getLang("mail_im_mark_spam")
        }
    }

    function C(e, t, n, r, i) {
        var a = domData(i, "type");
        switch (a) {
            case "star":
                e.set(T.toggleDialogImportant.bind(null, e.get().peer)).then(function() {
                    setTimeout(function() {
                        return y(e, t, r, i)
                    }, 40)
                });
                break;
            case "search":
                n().showSearch(e), window.tooltips && tooltips.hide(i, {
                    fasthide: !0
                });
                break;
            case "answer":
                var o = Object(x.getTab)(e, e.get().peer);
                o && (e.set(T.markDialogAnswered.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), e.get().longpoll.push([Object(L.resetPeer)()]))
        }
    }

    function k(e, t, n) {
        return e().updateChatTopic(t, n), n
    }

    function E(e, t, n, r) {
        return {
            changeActions: function(t) {
                var n = geByClass1(H, e),
                    r = geByClass1(U, e),
                    i = t.get().curActions,
                    a = Object.keys(i).map(function(e, t) {
                        var n = "";
                        return 7 !== T.ACTION_PRIORITIES[e] && 10 !== T.ACTION_PRIORITIES[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs($, {
                            name: i[e].name,
                            icon: i[e].icon,
                            action: e
                        })
                    }).join("");
                0 === Object.keys(i).length ? addClass(r, "im-page--header-more_loading") : (val(n, a), removeClass(r, "im-page--header-more_loading"))
            },
            showSettings: function(n) {
                var i = n.get(),
                    a = i.chatSettingsAllowed,
                    o = Object(x.getTab)(n, i.peer),
                    s = Object(I.isFvkcomgroup)(n, i.peer);
                a ? o.data.closed || o.data.kicked || Object(N.mount)(e, n, r) : s || Object(I.showChatMembers)(n, t, T.setCreationType)
            },
            renderPeer: function(n) {
                u(e, n, t)
            },
            reRenderPinned: function(e) {
                var t = Object(x.getCurrentTab)(e);
                t && t.pinned && l(e)
            },
            renderActions: function(t) {
                var n = t.get().selectedMessages || [];
                n.length > 0 && c(e, n, t)
            },
            hideActions: function(t) {
                if (!Object(I.isFullyLoadedTab)(t, t.get().peer)) {
                    var n = geByClass1(U, e);
                    addClass(n, "im-page--header-more_loading")
                }
            },
            changedMessageSelection: function(n) {
                if (0 !== n.get().peer) {
                    var r = n.get().selectedMessages || [];
                    r.length > 0 ? c(e, r, n) : u(e, n, t)
                }
            },
            updateLastSeen: function(t) {
                o(t, e)
            },
            deselectAll: function(e) {
                b(e, t, r)
            },
            unmount: function() {
                Object(S.destroyModule)(n), cancelStackFilter("fowrward")
            }
        }
    }

    function j(e, t, n) {
        var r = Object(S.createMutations)(E),
            i = r.callMutations,
            a = r.bindMutations,
            o = m.bind(null, t, n, i),
            s = v.bind(null, t, n, i, e),
            c = b.bind(null, t, n, i),
            u = function(e, n) {
                return Object(I.showVerifiedTooltip)(n, t.get().peer)
            },
            l = y.bind(null, t, e),
            d = w.bind(null, t, e),
            f = C.bind(null, t, e, n),
            p = function() {
                return i().showSettings(t)
            },
            g = function(t) {
                gpeByClass(q, t.target, e) && !checkEvent(t) && (p(), cancelEvent(t))
            },
            h = Object(S.createModule)({
                handlers: function(n, r) {
                    r(e, "click", G, o), r(e, "click", F, s), r(e, "click", I.DESELECT_ALL_CLASS, c), r(e, "mouseover", W, u), r(e, "mouseover", "_im_header_icon", l), r(e, "mouseover", G, d), r(e, "click", "_im_header_icon", f), r(e, "click", "_im_header_link", g), r(e, "click", K, g), r(e, "click", Q, p), r(e, "click", "_im_page_back", function(e) {
                        checkEvent(e) || (t.get().longpoll.push([Object(L.resetPeer)()]), cancelEvent(e))
                    })
                }
            });
        return Object(I.isReservedPeer)(t.get().peer) || setTimeout(function() {
            t.set(T.setActions).then(i().changeActions)
        }), a(e, n, h, i)
    }
    n.r(t), n.d(t, "mount", function() {
        return j
    });
    var S = n(110),
        T = n(41),
        I = n(81),
        L = n(132),
        x = n(199),
        P = n(158),
        M = n(136),
        A = n(201),
        N = n(76),
        D = n(65),
        R = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        F = "_im_action",
        B = "_im_page_peer_name",
        H = "_ui_menu",
        U = "_im_dialog_action_wrapper",
        z = "_im_mess_actions",
        G = "_im_page_action",
        V = "_im_chat_topic_change_input",
        W = "_im_chat_verified",
        q = "im-page--chat-header_chat",
        K = "_im_page_peer_name",
        Q = "_im_chat_members",
        Y = "_im_chat_invite_link",
        $ = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + F + ' im-action im-action_%icon%" data-action="%action%">%name%</a>'
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function a(e) {
        if (!e.renew_hashes) {
            var t = e.last_hashes_update || 0;
            if (Date.now() - t < 1e4) return Promise.resolve();
            var n = Object.keys(e.tabs).filter(function(t) {
                return Object(Ft.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_renew_hash",
                peers: n.join(","),
                gid: e.gid
            }).then(function(t) {
                var r = Kt(t, 2),
                    i = r[0],
                    a = r[1];
                return n.forEach(function(t) {
                    e.tabs[t].hash = i[t]
                }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
            })
        }
        return e.renew_hashes
    }

    function o(e, t, n) {
        return i(e).then(function(r) {
            return r ? t.apply(void 0, n) : a(e).then(function(e) {
                return t.apply(void 0, n)
            })
        })
    }

    function s(e) {
        return function() {
            var t = arguments,
                n = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(r) {
                if (r && r.match && r.match(/1001;/)) return o(n, e, t);
                throw r
            })
        }
    }

    function c(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function u(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function l(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function d(e, t, n, r, i) {
        return i.tabHistoryNotChanged = !1, Object(Nt.retryFn)(Pt.post, 3, function(e) {
            return e - 1
        })(Pt.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: i.prevPeer,
            gid: i.gid,
            block: r
        }).then(function(t) {
            var r = Kt(t, 5),
                a = r[0],
                o = r[1],
                s = r[2],
                c = r[3],
                u = r[4];
            if (o.forEach(function(e) {
                    return Object(zt.oCacheAdd)(i, e)
                }), i.tabs || (i.tabs = {}), i.dialog_tab_cts = u, i.tabs[e] || (i.tabs[e] = Object(Ft.normalizeTab)(i, a)), l(c, i), n) {
                if (i.tabs[e]) {
                    var d = i.tabs[e].lastmsg,
                        p = i.tabs[e].lastmsg_meta;
                    extend(i.tabs[e], a), i.tabs[e].lastmsg = d, i.tabs[e].lastmsg_meta = p
                }
            } else extend(i.tabs[e], a);
            return i.admins = extend(i.admins, s), i.imQueue(e, !1), Lt(), f(e, i)
        })["catch"](function(e) {
            return Object(Gt.imWeirdCatch)("loadPeer", e)
        })
    }

    function f(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            i = n.filter(function(n) {
                return !Object(Ht.isRidExist)(t, e, n.rid)
            });
        return r.msgs = i.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(Ft.restoreQueue)(i, t, c(t.tabs[e].history)), Promise.resolve(t)
    }

    function p(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = Object(Ft.removeMessages)([t], c(n.tabs[e].history)), Promise.resolve(n)
    }

    function m(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Kt(e, 1),
                r = n[0];
            return l(r, t)
        })
    }

    function g(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, Object(Ft.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && m(n, t), Promise.resolve(t).then(y)) : (Object(Ft.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), d(n, e, !1, !0, t))
        }).then(y).then(h.bind(null, n))
    }

    function h(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return Object(Ft.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(Ft.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function _(e, t, n) {
        var r = n.msgid,
            i = n.peer;
        return !e && Object(Ft.isFullyLoadedTab)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && m(i, n), Promise.resolve(n).then(y).then(h.bind(null, i))) : d(i, !0, r, !0, n).then(y).then(function() {
            var e = Object(Ht.getTab)(n, i);
            return e.msgid = r, n
        }).then(h.bind(null, i))
    }

    function v(e, t, n, r) {
        if (Ge(r)) throw Object(Ft.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var i = r.gid ? "gim" + r.gid : "im";
        if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, Zt({
                sel: e ? Object(Ft.convertPeerToUrl)(e) : null,
                msgid: r.msgid,
                email: "",
                0: i
            }), 0 != r.prevPeer && h(r.prevPeer, r, !0), 0 !== e) {
            var a = [];
            Object(Ft.isTabLoaded)(r, e) && h(e, r, !0), a = r.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), ot(a, !1, r)
        } else ot(r.tabbedPeers, !1, r);
        return Jt(), de(r.prevPeer, r)
    }

    function b(e) {
        if (cur.wallMentions = [], Object(Ft.isChatPeer)(e.peer) && Object(Ft.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                n = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var r = Object(Ht.parserMessage)(t.msgs[e]),
                    i = r && r.userId;
                i && i != vk.id && -1 === n.indexOf(i) && Object(Ft.isUserAliveInChat)(t, i) && n.push(i)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === n.indexOf(e) && n.push(e)
            }), n.forEach(function(t) {
                if (Object(zt.oCacheExists)(e, t)) {
                    var n = Object(zt.oCacheGet)(e, t),
                        r = n.link.substring(1);
                    cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                }
            })
        }
    }

    function y(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = [],
            i = Object(Ft.isChatPeer)(t) && (n.data.closed || n.data.kicked),
            a = Object(Ft.isFvkcomgroup)(e, t);
        n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && !a && r.push("clear"), Object(Ft.isCommunityInterface)(e) && !a && r.push("block"), Object(Ft.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !Object(Ft.isChatPeer)(t) && !Object(Ft.isUserPeer)(t) || Object(Ft.isCommunityInterface)(e) || Object(Ft.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), Object(Ft.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), !e.chatSettingsAllowed && Object(Ft.isChatPeer)(t) && !i && n.data.link && r.push("invite_link"), Object(Ft.isChatPeer)(t) && !i && (e.chatSettingsAllowed || (Object(Wt.canChangeTitle)(e) && r.push("topic"), Object(Wt.canChangeAvatar)(e) && r.push("avatar")), Object(Wt.canInviteUser)(e) && r.push("invite"), e.gid || r.push("leave")), Object(Ft.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(Ft.isChatPeer)(t) && e.chatSettingsAllowed && !n.data.closed && !n.data.kicked && r.push("settings"), Object(Ft.isChatPeer)(t) && n.pinned && (r.push(Object(Vt.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(Wt.canPinOrUnpin)(e) && r.push("unpin"));
        var o = Object(Ft.chatActions)(e, a);
        return e.curActions = r.sort(function(e, t) {
            return tn[e] - tn[t]
        }).reduce(function(e, t) {
            return e[t] = o[t], e
        }, {}), Promise.resolve(e)
    }

    function w(e, t, n) {
        var r = n.tabs[n.peer];
        return Object(Pt.post)(Pt.CONTROLLER, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Kt(e, 4),
                i = t[0],
                a = t[1],
                o = t[2],
                s = t[3];
            return r.allShown = o, n.admins = extend(n.admins, s), r.history = i + u(r.history), r.historyToAppend = i, r.offset += Object.keys(a).length, r.msgs = extend(r.msgs, a), n
        })
    }

    function O(e) {
        var t = e.tabs[e.peer];
        return Object(Pt.post)(Pt.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Kt(n, 5),
                i = r[0],
                a = r[1],
                o = r[2];
            r[3], r[4], t.allShown = t.allShown || o, t.history = u(t.history) + i, t.historyToAppend = i;
            var s = Object.keys(a).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, a), e
        })
    }

    function C(e, t, n, r) {
        var i = e.tabs[t];
        return r === At.FLAG_OUTBOUND && i.out_up_to > n ? e : (r === At.FLAG_OUTBOUND ? i.out_up_to = n : i.in_up_to = n, e)
    }

    function k(e) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Kt(t, 3),
                r = n[0],
                i = n[1],
                a = n[2];
            return extend({}, e, {
                imKey: r,
                imUrl: i,
                imPart: a
            })
        })
    }

    function E(e) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Kt(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function j(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(Ft.setMessageError)(e, t, c(r.history))), Promise.resolve(n)
    }

    function S(e, t, n, r) {
        var i = r.tabs[e];
        return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(Ft.startResendMessage)(e, t, c(i.history))), Promise.resolve(r)
    }

    function T(e, t, n, r) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
            return !n && !Ye(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(Dt.arrayUnique)(r(e[a], a))), e
        }, e.dialog_tabs))
    }

    function I(e, t) {
        return 0 === e.length ? Promise.resolve(t) : Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Kt(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function L(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            ot(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function x(e, t, n) {
        return Object(Ft.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function P(e, t) {
        var n = e.get().peer,
            r = Object(Ht.getTab)(e, n);
        if (Object(Ft.isFullyLoadedTab)(e, n)) {
            var i = c(r.history);
            r.history = Object(Ft.updateMessageInCache)(e, i, t)
        }
    }

    function M(e, t) {
        var n = Object(Ht.getTab)(t, e.peerId);
        if (Object(Ft.isFullyLoadedTab)(t, e.peerId)) {
            var r = c(n.history);
            n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(Ft.editAndReplaceMessage)(t, e, r)
        }
        n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
        var i = n && n.pinned && Object(Ht.parserMessage)(n.pinned);
        return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
    }

    function A(e, t) {
        var n = e.flags & At.FLAG_OUTBOUND,
            i = e.peerId;
        if (Object(Ft.isTabLoaded)(t, i)) {
            var a = t.tabs[i];
            if (a.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = r({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? a.unread = 0 : (a.lastmsg == e.messageId && a.unread ? N(t, 1, e.peerId) : (!a.unread && N(t, 1, e.peerId), a.unread++), L(e.peerId, t)), Object(Ft.isFullyLoadedTab)(t, i)) {
                var o = c(a.history);
                a.skipped > 0 && a.skipped++, a.offset++, a.msgs[e.messageId] = extend(!0, {}, e), a.history = Object(Ft.appendToHistory)(t, e, o, !0, !0, !0), Object(Ut.isOut)(e) && (a.blocked_community = 0, y(t))
            }
            if (a.typing) {
                var s = a.typing.userIds.indexOf(e.userId);
                s >= 0 && a.typing.userIds.splice(s, 1)
            }
            return a.lastmsg = e.messageId, a.lastmsg_meta = e, h(e.peerId, t), T(t, a, !1, x.bind(null, i), Je.bind(null, t)), Promise.resolve(t)
        }
        return d(i, 0, 0, 0, t).then(function(t) {
            var r = t.tabs[i];
            return T(t, r, !1, x.bind(null, i), Je.bind(null, t)), h(e.peerId, t), n || L(e.peerId, t), t
        })
    }

    function N(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function D(e, t) {
        if (Object(Ft.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = C(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(Ht.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && N(t, -1, e.peerId), !n.skipped) {
                var i = c(n.history);
                n.history = Object(Ft.removewNewUnreadBarAndMerge)(t, i, e.peerId)
            }
        } else Object(Ft.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && N(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return Object(Ft.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Bt.FOLDER_UNREAD] = t.dialog_tabs[Bt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== Bt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : $e(Bt.FOLDER_ALL, t)
    }

    function R(e, t) {
        var n = t.tabs[e.peerId];
        if (Object(Ft.isTabLoaded)(t, e.peerId) && C(t, e.peerId, e.upToId, At.FLAG_OUTBOUND), Object(Ft.isFullyLoadedTab)(t, e.peerId)) {
            var r = c(n.history);
            n.history = Object(Ft.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function F(e, t, n, r, i) {
        return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
    }

    function B(e, t, n) {
        function i(e, t) {
            return {
                id: e.messageId,
                text: e.text,
                date: e.date,
                kludges: e.kludges,
                authorName: t
            }
        }
        if (1 === e.length) {
            var a = e[0],
                o = Object(Ht.getMessage)(n, t, a),
                s = Object(Ht.getAuthorFullName)(n, t, a);
            return s === !1 ? n.set(Ee.bind(null, r({}, t, [o.userId]))).then(function(n) {
                var r = Object(Ht.getAuthorFullName)(n, t, a);
                return {
                    msgIds: e,
                    object: i(o, r)
                }
            }) : Promise.resolve({
                msgIds: e,
                object: i(o, s)
            })
        }
        return Promise.resolve({
            msgIds: e
        })
    }

    function H(e, t) {
        Object(Ft.normalizeTabsGotFromServer)(t, e);
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var i = t.tabs[r] ? t.tabs[r].msgs : {},
                a = extend({}, i || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
    }

    function U(e, t, n, r) {
        var i = Object(Ht.getTab)(r, e);
        if (i) {
            var a = t !== !1 ? t == $t ? 2 : mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
            i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
        }
        return Promise.resolve(r)
    }

    function z(e, t) {
        var n = Object(Ht.getTab)(t, e.peerId);
        return n && (e.ts = Date.now() / 1e3, n.typing = e), Promise.resolve(t)
    }

    function G(e, t) {
        return Object(Nt.pause)(Qt + 2).then(function() {
            if (Object(Ft.isTabLoaded)(t, e)) {
                var n = t.tabs[e];
                if (n.typing) {
                    var r = Date.now() - 1e3 * n.typing.ts;
                    r >= 1e3 * Qt && (n.typing = void 0)
                }
            }
            return t
        })
    }

    function V(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function W(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = Object(Dt.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function q(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function K(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function Q(e, t) {
        if (Object(Ft.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var i = n.msgs["rid" + e.randomId];
            i && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(Ft.replaceMessageAttrs)(t, c(n.history), e)
        }
        return Promise.resolve(t)
    }

    function Y(e, t) {
        return Promise.resolve()
    }

    function $(e, t) {
        var n = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return Object(Nt.retryFn)(Pt.post, 3, function(e) {
            return e * e
        })(Pt.CONTROLLER, n).then(function(n) {
            return X(e, n, t)
        })["catch"](function() {
            return X(e, null, t)
        })
    }

    function X(e, t, n) {
        var r = n.tabs[e.peerId];
        return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], Z(e, n)
    }

    function Z(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = Object(Ft.replaceAttaches)(c(n.history), e, t), Promise.resolve(t)
    }

    function J(e, t, n) {
        var r = Object(Ft.dayFromVal)(t),
            i = n.tabs[e];
        return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
    }

    function ee(e, t, n) {
        var r = n.tabs[t];
        return r.searchText = e, pe(t, n), n
    }

    function te(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function ne(e, t, n, r) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Kt(e, 3),
                n = t[0],
                i = t[1],
                a = t[2];
            return l(a, r), i.forEach(function(e) {
                return Object(zt.oCacheAdd)(r, e)
            }), H(n, r), Object.keys(n).sort(function(e, t) {
                return n[e].order - n[t].order
            }).map(function(e) {
                return n[e]
            })
        })
    }

    function re(e, t, n, r) {
        return ne(e, t, n, r).then(function(e) {
            return e.map(function(e) {
                return {
                    peerId: e.peerId,
                    name: e.tab,
                    photo: e.photo,
                    online: e.online,
                    is_friend: "friends" === n ? !0 : !1
                }
            })
        })
    }

    function ie(e) {
        return {
            peerId: e[0],
            name: e[1],
            tab: e[1],
            photo: e[2],
            href: e[3],
            online: e[4],
            is_friend: e[5],
            local_index: !0
        }
    }

    function ae(e) {
        return function(t, n) {
            return e(n).then(function(e) {
                var r = t ? e.search(t) : e.list,
                    i = r.map(ie);
                return n.mapped_index || (n.mapped_index = {}), i.forEach(function(e) {
                    n.mapped_index[e.peerId] = e
                }), i
            })
        }
    }

    function oe(e, t) {
        var n = void 0,
            r = void 0;
        t.topConvTree = new Promise(function(e) {
            n = e
        }), t.hintsTree = new Promise(function(e) {
            r = e
        });
        var i = e.select(Rt.RECENT_SEARCH_OP);
        return Object(Nt.retryFn)(Pt.post, 1, function() {
            return 4
        })(Pt.CONTROLLER, {
            act: "a_dialogs_preload",
            rs: i.join(","),
            gid: t.gid
        })["catch"](function(e) {
            return [
                [],
                [],
                []
            ]
        }).then(function(e) {
            var i = Kt(e, 3),
                a = i[0],
                o = i[1],
                s = i[2];
            return t.popular_sugg = s, new vkIndexer(a, function(e) {
                return e[1]
            }, n), new vkIndexer(o, function(e) {
                return e[1]
            }, r), t
        })
    }

    function ce(e) {
        var t = e.active_tab,
            n = void 0;
        return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
            return e.tabs[t].lastmsg
        })) : 0, Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_dialogs",
            start_message_id: n,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Kt(n, 4),
                i = r[0],
                a = r[1],
                o = r[2],
                s = r[3];
            return o.forEach(function(t) {
                return Object(zt.oCacheAdd)(e, t)
            }), l(s, e), H(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
        })
    }

    function ue(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function le(e, t) {
        if (t.peer === e && Object(Ft.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function de(e, t) {
        if (Object(Ft.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, Zt({
                st: ""
            }), Jt()
        }
        return Promise.resolve(t)
    }

    function fe(e, t) {
        if (Object(Ft.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function pe(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function me(e) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function ge(e, t) {
        var n = Object(Ht.getTab)(e, t);
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(r) {
            var i = Kt(r, 2),
                a = i[0],
                o = i[1];
            n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
            var s = Kt(o, 3);
            n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[Bt.FOLDER_UNREAD] = e.get().dialog_tabs[Bt.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), T(e.get(), n, !1, x.bind(null, t), Je.bind(null, e.get()))
        })
    }

    function he(e, t, n) {
        if (Object(Ft.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e
        }
        return Promise.resolve(n)
    }

    function _e(e, t, n) {
        if (Object(Ft.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.history = Object(Ft.removeMessages)(e, c(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            }), e.forEach(function(e) {
                var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(n)
    }

    function ve(e, t, n, r) {
        if (Object(Ft.isFullyLoadedTab)(r, t)) {
            var i = r.tabs[t];
            i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(Ft.removeMessagesWithRestore)(e, t, n, c(i.history)), i.offset -= e.filter(function(e) {
                return i.msgs[e]
            }).length
        }
        return Promise.resolve(r)
    }

    function be(e, t, n) {
        if (Object(Ft.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = Object(Ft.restoreMessage)(e, t, c(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function ye(e, t, n, r) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function we(e, t, n) {
        return t && (n.pendingForward = null, e || (e = {
            msgIds: []
        }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
    }

    function Oe(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function Ce(e, t, n) {
        if (Object(Ft.isTabLoaded)(n, e)) {
            n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, T(n, n.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), n.tabs[e].unread > 0 && N(n, -1, e);
            var r = n.tabs[e];
            r.deletedDialog = !0;
            var i = n.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return ot(i, !0, n), t.then(function(t) {
                var i = Kt(t, 2);
                return i[0], i[1], delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
            })
        }
    }

    function ke(e, t, n) {
        var r = n.tabs[e];
        return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
            return n.indexOf(e) === t
        }), Promise.resolve(n)
    }

    function Ee(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Kt(e, 1),
                r = n[0];
            return r.forEach(function(e) {
                return Object(zt.oCacheAdd)(t, e)
            }), t
        })
    }

    function je(e, t, n) {
        function r(e, t) {
            Object(Ft.isChatPeer)(e) && t && !Object(zt.oCacheExists)(a, t) && (i[e] ? -1 === i[e].indexOf(t) && i[e].push(t) : i[e] = [t])
        }
        var i = {},
            a = n.get(),
            o = t.filter(function(e) {
                return !Object(Ft.isTabLoaded)(a, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
        t.forEach(function(e) {
            Object(Ft.isTabLoaded)(a, e.peerId) && r(e.peerId, e.userId)
        }), e.forEach(function(e) {
            r(e.peerId, +e.kludges.source_mid)
        });
        var s = t.filter(function(e) {
            return e.flags & At.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !a.admins[e]
        });
        if (0 === Object.keys(i).length && 0 === s.length && 0 === o.length) return Promise.resolve(a);
        var c = Object.keys(i).length > 0 || s.length > 0 || o.length > 0;
        return {
            shouldLoad: c,
            needMembers: i,
            needAdminIds: s,
            needPeers: o
        }
    }

    function Se(e, t, n) {
        var r = e.needMembers,
            i = e.needAdminIds,
            a = e.needPeers;
        return t.pause(), Promise.all([Ee(r, n), I(i, n), Promise.all(a.map(function(e) {
            return d(e, 0, 0, 0, n)
        }))])["catch"](function() {
            return n
        }).then(function() {
            return t.resume()
        }).then(function() {
            return n
        })
    }

    function Te(e, t, n, r) {
        return t !== vk.id ? Promise.resolve(r) : (Object(Ft.isTabLoaded)(r, n) && r.peer == n && (r = y(r)), Promise.resolve(r))
    }

    function Ie(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, y(n)
    }

    function Le(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function xe(e, t, n, r) {
        if (Object(Ft.isFullyLoadedTab)(r, t)) {
            var i = r.tabs[t];
            e.filter(function(e) {
                return i.msgs[e]
            }).forEach(function(e) {
                var a = Object(Ht.getMessage)(r, t, e),
                    o = n ? a.flags | At.FLAG_IMPORTANT : a.flags & ~At.FLAG_IMPORTANT;
                a.flags = o, i.msgs[e] = a, i.history = Object(Ft.updateStar)(e, n, c(i.history))
            })
        }
        return Promise.resolve(r)
    }

    function Pe(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function Me(e, t) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function Ae(e, t) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function Ne(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function De(e, t) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function Re(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function Fe(e, t, n) {
        return Object(Pt.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function Be(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            i = e.active_tab;
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: i,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var a = Kt(n, 5),
                o = a[0],
                s = a[1],
                u = a[2],
                l = a[3],
                d = a[4];
            s.forEach(function(t) {
                return Object(zt.oCacheAdd)(e, t)
            }), Object(Ft.normalizeTabsGotFromServer)(e, o), u.user_unread && handlePageCount("msg", u.user_unread), Object(Dt.lplog)("Resync success", "success");
            var f = e.peer,
                p = void 0;
            if (Object(Ft.isReservedPeer)(f)) p = Promise.resolve(!1);
            else {
                var m = {
                    tabs: r({}, f, e.tabs[f]),
                    oCache: {}
                };
                p = H(r({}, f, o[f]), m)
            }
            return p.then(function(n) {
                e.tabs = o, e.admins = extend(e.admins, l), n && (e.tabs[f] = n.tabs[f], e.tabs[f].history = Object(Ft.restoreQueue)(f, e, c(e.tabs[f].history))), e.loadingDialogs = !1, e.mutedPeers = u.mutedPeers, e.lastDialogsOptions = {
                    has_more: u.has_more
                }, e.dialog_tab_cts = u.folder_cts, e.dialog_tabs[i] = d.map(intval);
                var r = e.dialog_tabs[i].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != i
                }).forEach(function(t) {
                    i == Bt.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(Ye(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ve(intval(u.unread), e)
            })
        })["catch"](function(t) {
            return Object(Dt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(Nt.pause)(2).then(Be.bind(null, e))
        })
    }

    function He(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function Ue(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function ze() {
        return window.Upload && Upload.options && Upload.isSomethingUploading ? Object.keys(Upload.options).filter(function(e) {
            return Upload.isSomethingUploading(e)
        }).length > 0 : !1
    }

    function Ge(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || ze()
    }

    function Ve(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[Bt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function We(e, t) {
        return t.ctrl_submit = !!e, Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function qe(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return Object(qt.setDocumentTitle)(e ? e : document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e) Object(qt.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var i = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + i + t + ".ico"), Object(qt.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r)))
            }
        }
    }

    function Ke(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            i = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var a = qe(r, i, n);
            n.update_title_to = setInterval(a, 1e3), a()
        } else !t && n.update_old_title && (Object(qt.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function Qe(e, t, n, r, i) {
        return Object(Ft.isFullyLoadedTab)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
    }

    function Ye(e) {
        return e === Bt.FOLDER_ALL ? function() {
            return !0
        } : e === Bt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & Bt.FOLDER_MASKS[e]
        }
    }

    function $e(e, t) {
        t.active_tab = e, Object(Mt.updateLocation)({
            tab: e === Bt.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== Bt.FOLDER_ALL && !Object(Ft.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[Bt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(Ye(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return Promise.resolve(t)
    }

    function Xe(e, t, n) {
        return e === At.SET_DIRECTORIES && n.folders & t ? !1 : e !== At.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function Ze(e, t, n) {
        return t !== At.RESET_DIRECTORIES || e.folders & Bt.FOLDER_MASKS[n] ? t === At.REPLACE_DIRECTORIES ? e.folders & Bt.FOLDER_MASKS[n] ? -1 : 1 : t === At.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function Je(e, t, n, r) {
        var i = e.dialog_tabs_all;
        if (i[Bt.FOLDER_ALL] || i[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var a = n.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return Object(Ft.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return a.length > 0 ? !0 : !1
    }

    function et(e, t, n, r, i) {
        if (Object(Ft.isTabLoaded)(i, e)) {
            var a = i.tabs[e];
            return n === At.REPLACE_DIRECTORIES && (t ^= a.folders), Xe(n, t, a) && Object.keys(Bt.FOLDER_MASKS).filter(function(e) {
                return Bt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                i.dialog_tab_cts[e] += Ze(a, n, e)
            }), n === At.SET_DIRECTORIES ? i.tabs[e].folders |= t : n === At.RESET_DIRECTORIES ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= a.folders, T(i, i.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return i.tabs[e]
                }).filter(Ye(n)).map(function(e) {
                    return e.peerId
                })
            }, Je.bind(null, i)), Promise.resolve(i)
        }
        return d(e, 0, 0, 0, i).then(et.bind(null, e, t, n, i))
    }

    function tt(e) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function nt(e, t) {
        return l(r({}, e, {
            free: !0
        }), t), Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function rt(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function it(e, t, n, r) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, T(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function at(e, t, n) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function ot(e, t, n) {
        return n.tabbedPeers = e, Object(Ft.isClassicInterface)(n) && (Zt({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return Object(Ft.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(Ft.convertPeerToUrl).join("_")
        }), t && Jt()), Promise.resolve(n)
    }

    function st(e) {
        return e.peer ? le(e.peer, e) ? ue(e.peer, e) : Object(Ft.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function ct(e, t) {
        var n = t.tabs[e];
        return Object(Ft.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function ut(e, t) {
        var n = t.tabs[e];
        return Object(Ft.isFullyLoadedTab)(t, e) && (n.history = u(n.history)), Promise.resolve(t)
    }

    function lt(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function dt(e, t, n) {
        if (!Object(Ft.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = Object(Ht.getTab)(n, t);
        return r.blocked_community = !e, Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return y(n)
        })
    }

    function ft(e, t) {
        if (0 !== t.peer && Object(Ft.isFullyLoadedTab)(t, t.peer)) {
            var n = Object(Ht.getTab)(t, t.peer);
            n.history = c(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function pt(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function mt(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function gt(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function ht(e) {
        Zt({
            act: e ? "create" : null
        }), Jt()
    }

    function _t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        Zt({
            q: e
        }), Jt()
    }

    function vt(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(Ft.getClassicChatHeight)() > window.clientHeight() && Object(Ft.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function bt(e, t) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_get_link",
            gid: t.gid,
            chat_id: e
        })
    }

    function yt(e) {
        return en({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function wt(e, t) {
        var n = Object(Dt.arrayUnique)([e].concat(t.select(Rt.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Rt.RECENT_SEARCH_OP, n)
    }

    function Ot(e) {
        e.update(Rt.RECENT_SEARCH_OP, [])
    }

    function Ct(e, t) {
        var n = t.select(Rt.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Rt.RECENT_SEARCH_OP, n), n
    }

    function kt(e, t, n) {
        var r = n.tabs[t],
            i = Object(Ht.getMessage)(n, t, e);
        return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
    }

    function Et(e, t) {
        var n = t.tabs[e];
        return n.pinned = null, Promise.resolve(t)
    }

    function jt(e, t, n) {
        var r = n.tabs[e];
        return r.memberIds = r.memberIds.filter(function(e) {
            return e !== t
        }), r.adminIds = r.adminIds.filter(function(e) {
            return e !== t
        }), Promise.resolve(n)
    }

    function St(e, t, n, r) {
        var i = r.tabs[e];
        return n ? i.adminIds = [].concat(i.adminIds, t).filter(function(e, t, n) {
            return n.indexOf(e) === t
        }) : i.adminIds = i.adminIds.filter(function(e) {
            return e !== t
        }), Promise.resolve(r)
    }

    function Tt(e, t, n, i) {
        var a = Object(Ht.getMessage)(e, n, t),
            o = a.userId;
        return Object(zt.oCacheGet)(i, o) ? Promise.resolve(i) : Ee(r({}, n, [o]), i)
    }

    function It() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }

    function Lt() {
        cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
    }

    function xt(e, t) {
        return Object(Pt.post)(Pt.CONTROLLER, {
            act: "a_load_banner",
            peer_id: e
        }).then(function(n) {
            var r = Kt(n, 1),
                i = r[0];
            return t.tabs[e].top_banner = i, t
        })
    }
    n.r(t), n.d(t, "TYPING_PERIOD", function() {
        return Qt
    }), n.d(t, "ACTION_PRIORITIES", function() {
        return tn
    }), n.d(t, "strHistory", function() {
        return u
    }), n.d(t, "updateBlockStates", function() {
        return l
    }), n.d(t, "loadPeer", function() {
        return d
    }), n.d(t, "restoreHistoryQueue", function() {
        return f
    }), n.d(t, "removeFailed", function() {
        return p
    }), n.d(t, "selectPeer", function() {
        return g
    }), n.d(t, "selectPeerOnMessage", function() {
        return _
    }), n.d(t, "changePeer", function() {
        return v
    }), n.d(t, "updateMentions", function() {
        return b
    }), n.d(t, "setActions", function() {
        return y
    }), n.d(t, "loadMoreHistory", function() {
        return w
    }), n.d(t, "loadLessHistory", function() {
        return O
    }), n.d(t, "readLastMessages", function() {
        return nn
    }), n.d(t, "loadLongPollKey", function() {
        return k
    }), n.d(t, "loadLongPollTs", function() {
        return E
    }), n.d(t, "setMessageErrored", function() {
        return j
    }), n.d(t, "resendMessage", function() {
        return S
    }), n.d(t, "loadAdmins", function() {
        return I
    }), n.d(t, "updateVideoThumb", function() {
        return P
    }), n.d(t, "editMessage", function() {
        return M
    }), n.d(t, "addMessage", function() {
        return A
    }), n.d(t, "markInboundMessagesAsRead", function() {
        return D
    }), n.d(t, "markOutboundMessagesAsRead", function() {
        return R
    }), n.d(t, "initTextStore", function() {
        return F
    }), n.d(t, "processFwd", function() {
        return B
    }), n.d(t, "mergeTabs", function() {
        return H
    }), n.d(t, "updateOnline", function() {
        return U
    }), n.d(t, "setTyping", function() {
        return z
    }), n.d(t, "waitTyping", function() {
        return G
    }), n.d(t, "deliverMessage", function() {
        return rn
    }), n.d(t, "deliverEditedMessage", function() {
        return an
    }), n.d(t, "addSelection", function() {
        return W
    }), n.d(t, "cleanSelected", function() {
        return q
    }), n.d(t, "dropSelection", function() {
        return K
    }), n.d(t, "replaceMessage", function() {
        return Q
    }), n.d(t, "saveMedia", function() {
        return Y
    }), n.d(t, "loadMedia", function() {
        return $
    }), n.d(t, "addAttachmentsToStoreData", function() {
        return X
    }), n.d(t, "replaceMediaAttachesStore", function() {
        return Z
    }), n.d(t, "setCurrentSearchDate", function() {
        return J
    }), n.d(t, "setInplaceSearch", function() {
        return ee
    }), n.d(t, "setCurrentSearch", function() {
        return te
    }), n.d(t, "searchHints", function() {
        return ne
    }), n.d(t, "searchHintsIndex", function() {
        return re
    }), n.d(t, "localIndexToDialog", function() {
        return ie
    }), n.d(t, "searchTopConv", function() {
        return on
    }), n.d(t, "searchLocalHints", function() {
        return sn
    }), n.d(t, "preloadSearchIndex", function() {
        return oe
    }), n.d(t, "loadDialogs", function() {
        return ce
    }), n.d(t, "searchMessages", function() {
        return cn
    }), n.d(t, "isSearchAllLoaded", function() {
        return ue
    }), n.d(t, "isSearchingInplace", function() {
        return le
    }), n.d(t, "cancelSearch", function() {
        return de
    }), n.d(t, "clearDate", function() {
        return fe
    }), n.d(t, "searchInplaceStart", function() {
        return pe
    }), n.d(t, "searchMessagesInplace", function() {
        return un
    }), n.d(t, "loadImportant", function() {
        return me
    }), n.d(t, "loadActualLastMessage", function() {
        return ge
    }), n.d(t, "removeMessagesMarkDeleted", function() {
        return he
    }), n.d(t, "removeMessages", function() {
        return _e
    }), n.d(t, "removeMessageSend", function() {
        return ln
    }), n.d(t, "removeMessagesWithRestore", function() {
        return ve
    }), n.d(t, "restoreMessage", function() {
        return be
    }), n.d(t, "restoreMessageSend", function() {
        return ye
    }), n.d(t, "sendTyping", function() {
        return dn
    }), n.d(t, "forwardMessages", function() {
        return we
    }), n.d(t, "prepareForward", function() {
        return Oe
    }), n.d(t, "deletedDialog", function() {
        return Ce
    }), n.d(t, "flushHistory", function() {
        return fn
    }), n.d(t, "updateChatTopic", function() {
        return pn
    }), n.d(t, "loadChatInfo", function() {
        return mn
    }), n.d(t, "addNewMemberOptimisticly", function() {
        return ke
    }), n.d(t, "addNewMember", function() {
        return gn
    }), n.d(t, "loadChatMember", function() {
        return Ee
    }), n.d(t, "checkNewPeople", function() {
        return je
    }), n.d(t, "loadNewPeople", function() {
        return Se
    }), n.d(t, "updateChatPhoto", function() {
        return hn
    }), n.d(t, "updateActions", function() {
        return Te
    }), n.d(t, "leaveChat", function() {
        return _n
    }), n.d(t, "returnToChat", function() {
        return vn
    }), n.d(t, "toggleMutePeer", function() {
        return bn
    }), n.d(t, "setMutedPeer", function() {
        return Ie
    }), n.d(t, "setExecStack", function() {
        return Le
    }), n.d(t, "favMessage", function() {
        return yn
    }), n.d(t, "updateFavMessage", function() {
        return xe
    }), n.d(t, "updateImportant", function() {
        return Pe
    }), n.d(t, "loadSpam", function() {
        return Me
    }), n.d(t, "flushSpam", function() {
        return Ae
    }), n.d(t, "setCreationType", function() {
        return Ne
    }), n.d(t, "getOwnerPhoto", function() {
        return De
    }), n.d(t, "presetAvatar", function() {
        return Re
    }), n.d(t, "setChatPhoto", function() {
        return Fe
    }), n.d(t, "createChat", function() {
        return wn
    }), n.d(t, "resync", function() {
        return Be
    }), n.d(t, "toggleSendingAbility", function() {
        return He
    }), n.d(t, "setDelayedMessage", function() {
        return Ue
    }), n.d(t, "isAnythingLoading", function() {
        return Ge
    }), n.d(t, "updateUnreadCount", function() {
        return Ve
    }), n.d(t, "changeSubmitSettings", function() {
        return We
    }), n.d(t, "updateFavAndTitle", function() {
        return Ke
    }), n.d(t, "saveHistoryScroll", function() {
        return Qe
    }), n.d(t, "filterFromTab", function() {
        return Ye
    }), n.d(t, "changeDialogsTab", function() {
        return $e
    }), n.d(t, "updateFolderState", function() {
        return et
    }), n.d(t, "toggleDialogImportant", function() {
        return On
    }), n.d(t, "markDialogAnswered", function() {
        return Cn
    }), n.d(t, "getMutexQueue", function() {
        return tt
    }), n.d(t, "releaseBlock", function() {
        return nt
    }), n.d(t, "toggleCommunityMute", function() {
        return rt
    }), n.d(t, "deleteDialog", function() {
        return kn
    }), n.d(t, "restoreDialog", function() {
        return it
    }), n.d(t, "spamDialog", function() {
        return at
    }), n.d(t, "updateTabbedPeers", function() {
        return ot
    }), n.d(t, "isEverythingLoaded", function() {
        return st
    }), n.d(t, "cleanTab", function() {
        return ct
    }), n.d(t, "stringifyTab", function() {
        return ut
    }), n.d(t, "updateGoToEndVisibility", function() {
        return lt
    }), n.d(t, "toggleCommunityMessages", function() {
        return dt
    }), n.d(t, "updateHistory", function() {
        return ft
    }), n.d(t, "startRecording", function() {
        return pt
    }), n.d(t, "cancelRecording", function() {
        return mt
    }), n.d(t, "setVoiceMessageAvail", function() {
        return gt
    }), n.d(t, "toggleConversation", function() {
        return ht
    }), n.d(t, "updateSearchQuery", function() {
        return _t
    }), n.d(t, "initializeChatResize", function() {
        return vt
    }), n.d(t, "joinChat", function() {
        return En
    }), n.d(t, "getInviteLink", function() {
        return bt
    }), n.d(t, "resetInviteLink", function() {
        return jn
    }), n.d(t, "leaveInvitation", function() {
        return yt
    }), n.d(t, "saveRecentSearchPeer", function() {
        return wt
    }), n.d(t, "resetRecentSearch", function() {
        return Ot
    }), n.d(t, "removeFromRecentSearch", function() {
        return Ct
    }), n.d(t, "pinMessageOptimistic", function() {
        return kt
    }), n.d(t, "unpinMessageOptimistic", function() {
        return Et
    }), n.d(t, "pinMessage", function() {
        return Sn
    }), n.d(t, "unpinMessage", function() {
        return Tn
    }), n.d(t, "getPinnedMessage", function() {
        return In
    }), n.d(t, "getMessageLocalId", function() {
        return Ln
    }), n.d(t, "getChatDetails", function() {
        return xn
    }), n.d(t, "updateFlags", function() {
        return Pn
    }), n.d(t, "removeChatPhoto", function() {
        return Mn
    }), n.d(t, "kickUserOptimisticly", function() {
        return jt
    }), n.d(t, "kickUser", function() {
        return An
    }), n.d(t, "toggleAdminOptimisticly", function() {
        return St
    }), n.d(t, "toggleAdmin", function() {
        return Nn
    }), n.d(t, "checkChatMember", function() {
        return Tt
    }), n.d(t, "hidePromoTooltip", function() {
        return It
    }), n.d(t, "videoAutoPlayHandler", function() {
        return Lt
    }), n.d(t, "hideTopBannerAction", function() {
        return Dn
    }), n.d(t, "callbackTopBannerAction", function() {
        return Rn
    }), n.d(t, "loadBanner", function() {
        return xt
    });
    var Pt = n(64),
        Mt = n(200),
        At = n(132),
        Nt = n(27),
        Dt = n(145),
        Rt = n(77),
        Ft = n(81),
        Bt = n(30),
        Ht = n(199),
        Ut = n(158),
        zt = n(136),
        Gt = n(56),
        Vt = n(201),
        Wt = n(65),
        qt = n(5),
        Kt = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        Qt = 5,
        Yt = 2e4,
        $t = 8,
        Xt = Object(Mt.updateLazyLocation)(),
        Zt = Xt.scheduleNav,
        Jt = Xt.commitNav,
        en = Xt.scheduleNavWithTimeOut,
        tn = {
            settings: 0,
            block: 1,
            fav: 1,
            chat: 2,
            invite: 2,
            invite_link: 3,
            topic: 3,
            avatar: 4,
            photos: 5,
            search: 6,
            pin_hide: 7,
            pin_unhide: 7,
            unpin: 8,
            mute: 10,
            unmute: 10,
            clear: 11,
            leave: 12,
            "return": 12,
            block_community: 12,
            allow_community: 12
        },
        nn = s(function(e, t) {
            var n = t.tabs[e],
                r = Object.keys(n.msgs).map(function(n) {
                    return Object(Ht.getMessage)(t, e, n)
                }).filter(function(e) {
                    return !Object(Ut.isOut)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (r = r.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([At.readInboundEvent([6, e, r])]), Object(Pt.post)(Pt.CONTROLLER, {
                peer: e,
                ids: [r],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return C(t, e, r, At.FLAG_OUTBOUND)
            }))
        }),
        rn = s(function(e, t, n) {
            var r = Date.now() + rand(0, 100).toFixed(0),
                i = n.tabs[e];
            return Object(Nt.retryFn)(Pt.post, 1)(Pt.CONTROLLER, {
                act: "a_send",
                to: e,
                hash: i.hash,
                msg: t.message,
                media: V(t.attaches),
                guid: r,
                share_url: t.share_url,
                random_id: t.rid,
                gid: n.gid,
                entrypoint: n.currentEntryPoint || "",
                sticker_referrer: t.sticker_referrer
            }, Yt).then(function(e) {
                var t = Kt(e, 1),
                    r = t[0];
                return n.version !== r.version && nav.reload({
                    force: !0
                }), n.currentEntryPoint = "", n
            })
        }),
        an = s(function(e, t, n) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_edit_message",
                hash: e.hash,
                id: t.messageId,
                peerId: e.peerId,
                gid: n.gid,
                msg: t.origText,
                media: V(t.attaches),
                share_url: t.share_url
            }, Yt).then(function(e) {
                var t = Kt(e, 1);
                return t[0], n
            })
        }),
        on = ae(function(e) {
            return e.topConvTree
        }),
        sn = ae(function(e) {
            return e.hintsTree
        }),
        cn = s(function(e, t) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = Kt(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3],
                    c = r[4];
                return a.forEach(function(e) {
                    return Object(zt.oCacheAdd)(t, e)
                }), Object(Ft.normalizeTabsGotFromServer)(t, i), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = i[e]
                }), [i, o]
            })
        }),
        un = s(function(e, t) {
            var n = t.tabs[e],
                r = "";
            if (pe(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
            var i = "in:" + e + " " + r + " " + (n.searchText || "");
            return Zt({
                st: n.searchText
            }), Jt(), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_search",
                q: i,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = Kt(e, 3),
                    r = t[0],
                    i = t[1],
                    a = t[2];
                return n.searchOffset = i, n.searchAllLoaded = a, r
            })
        }),
        ln = s(function(e, t, n, r, i) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: r
            })
        }),
        dn = s(function(e, t) {
            return t.tabs[e].lastTyping = Date.now(), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_typing",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function() {
                return t
            }, function() {
                return t
            })
        }),
        fn = s(function(e, t) {
            return Ce(e, Object(Pt.post)("al_im.php", {
                act: "a_flush_history",
                id: e,
                from: "im",
                gid: t.gid,
                hash: t.tabs[e].hash
            }), t)
        }),
        pn = s(function(e, t, n) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_set_chat_title",
                peer: e,
                new_title: t,
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function() {
                return n
            })
        }),
        mn = s(function(e, t) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_load_chat_info",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                var r = Kt(n, 1),
                    i = r[0];
                return t.tabs[e] = extend(t.tabs[e], i), t
            })
        }),
        gn = s(function(e, t, n) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function() {
                return n
            })
        }),
        hn = s(function(e, t) {
            return e.kludges.source_act === Ft.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = Kt(n, 2),
                    i = r[0],
                    a = r[1];
                t.chat_photo_msg = a;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(Ft.isFullyLoadedTab)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    o.history = Object(Ft.addChatPhotoToUpdate)(e, s, t, c(o.history))
                }
                return t
            })
        }),
        _n = s(function(e, t) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_leave_chat",
                chat: e - 2e9,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(Te.bind(null, Ft.CHAT_KICK_USER, vk.id, e, t))
        }),
        vn = s(function(e, t) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_return_to_chat",
                chat: e - 2e9,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(Te.bind(null, Ft.CHAT_INVITE_USER, vk.id, e, t))
        }),
        bn = s(function(e, t, n) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_mute",
                peer: e,
                hash: n.tabs[e].hash,
                gid: n.gid,
                value: t ? 1 : 0
            }).then(function() {
                var r = t ? "mute" : "unmute";
                return window.Notifier && Notifier.lcSend("im", {
                    act: r,
                    peer: e
                }), n
            }).then(Ie.bind(null, e, t))
        }),
        yn = s(function(e, t, n, r) {
            return xe(e, n, t, r), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: r.gid,
                peer: n,
                hash: r.tabs[n].hash
            }).then(function(e) {
                return r
            })
        }),
        wn = s(function(e, t, n, r) {
            return r.creating = !0, r.longpoll.pause(), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_multi_start",
                hash: r.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = Kt(e, 1),
                    n = t[0];
                return r.next_peer = n.peerId, r.tabs[n.peerId] = n, T(r, n, !1, function(e) {
                    return [n.peerId].concat(e)
                }), r.longpoll.resume(), r
            }).then(function(t) {
                return e ? Fe(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            })["catch"](function(e) {
                throw r.creating = !1, r.longpoll.resume(), e
            })
        }),
        On = s(function(e, t) {
            var n = Bt.FOLDER_MASKS[Bt.FOLDER_IMPORTANT],
                r = t.tabs[e].folders & n,
                i = r ? At.resetDirectoriesEvent : At.setDirectoriesEvent;
            return t.longpoll.push([i([0, e, n, !0])]), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_dialog_star",
                val: r ? 0 : 1,
                peer: e,
                hash: t.tabs[e].hash,
                gid: t.gid
            }).then(function() {
                return t
            })
        }),
        Cn = s(function(e, t, n) {
            var r = Bt.FOLDER_MASKS[Bt.FOLDER_UNRESPOND];
            return n.longpoll.push([At.resetDirectoriesEvent([0, e, r, !0]), At.readInboundEvent([6, e, t])]), Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_mark_answered",
                peer: e,
                lastmsg: t,
                hash: n.tabs[e].hash,
                gid: n.gid
            }).then(function() {
                return n
            })
        }),
        kn = s(function(e, t) {
            return T(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? (ot(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, T(t, t.tabs[e], !1, x.bind(null, e), Je.bind(null, t))), n
            })
        }),
        En = s(function(e, t, n) {
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = Kt(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    o = t[3];
                return a.forEach(function(e) {
                    return Object(zt.oCacheAdd)(n, e)
                }), n.tabs[r] = i, T(n, i, !1, x.bind(null, r), Je.bind(null, n)), n.admins = extend(n.admins, o), [r]
            })
        }),
        jn = s(function(e, t) {
            var n = t.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        }),
        Sn = s(function(e, t, n) {
            var r = n.tabs[t];
            return r.data.kicked || r.data.closed ? Promise.resolve(n) : Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_pin_message",
                msgid: e,
                chat: t,
                gid: n.gid,
                hash: n.tabs[t].hash
            }).then(function(e) {
                var i = Kt(e, 1),
                    a = i[0];
                return n.tabs[t] = Object.assign({}, r, a), n
            })
        }),
        Tn = s(function(e, t) {
            var n = t.tabs[e];
            return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_unpin_message",
                chat: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(r) {
                var i = Kt(r, 1),
                    a = i[0];
                return t.tabs[e] = Object.assign({}, n, a), t
            })
        }),
        In = s(function(e, t) {
            var n = t.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_get_pinned_message",
                chat: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(e) {
                var r = Kt(e, 1),
                    i = r[0];
                return n.pinned = i || null, t
            })
        }),
        Ln = s(function(e, t, n) {
            var r = n.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_get_message_local_id",
                chat: e,
                chat_local_id: t,
                hash: r.hash
            })
        }),
        xn = s(function(e, t) {
            var n = t.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_get_chat_details",
                chat: e,
                hash: n.hash
            }).then(function(e) {
                var r = Kt(e, 1),
                    i = r[0];
                return n.photoGrid = i.grid, n.photoLarge = i.photo, n.membersLastSeen = i.lastSeen || null, n.invitedByMe = i.invitedByMe || [], n.inviteLink = i.link || null, n.serverSettings = i.serverSettings || null, t
            })
        }),
        Pn = s(function(e, t, n) {
            var r = n.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_update_flags",
                chat: e,
                hash: r.hash,
                flags: t
            })
        }),
        Mn = s(function(e, t) {
            var n = t.tabs[e];
            return Object(Pt.post)("al_page.php", {
                act: "owner_photo_remove",
                oid: e,
                hash: n.photoHash
            }).then(function() {
                return n.photo = null, n.photoLarge = null, t
            })
        }),
        An = s(function(e, t, n) {
            var r = n.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_kick_user",
                chat: e,
                hash: r.hash,
                mid: t
            }).then(function() {
                return r.adminIds = r.adminIds.filter(function(e) {
                    return e !== t
                }), n
            })
        }),
        Nn = s(function(e, t, n, r) {
            var i = r.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return St(e, t, n, r)
            })
        }),
        Dn = s(function(e, t) {
            return t.tabs[e].top_banner = void 0, Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_hide_banner",
                peer_id: e,
                hash: t.tabs[e].hash
            }).then(function() {
                return t
            })
        }),
        Rn = s(function(e, t, n) {
            n.tabs[e].top_banner = void 0;
            var r = n.tabs[e];
            return Object(Pt.post)(Pt.CONTROLLER, {
                act: "a_callback_banner",
                peer_id: e,
                callback_data: t,
                hash: r.hash
            }).then(function() {
                return n
            })
        })
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
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
    n.r(t);
    var s = n(83),
        c = (n(9), n(35)),
        u = n(180),
        l = "/images/camera_c.gif",
        d = function(e) {
            function t(n) {
                i(this, t);
                var r = a(this, e.call(this, n));
                return r.onError = function() {
                    r.setState({
                        errored: !0
                    })
                }, r.state = {}, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.style,
                    i = e.size,
                    a = e.photo,
                    o = e.href,
                    d = e.title,
                    f = e.description,
                    p = r({}, "Entity--size" + i, !!i);
                return s.createElement("div", {
                    className: Object(c.classNames)("Entity", t, p),
                    style: n
                }, s.createElement("div", {
                    className: "Entity__aside"
                }, a && (o ? s.createElement("a", {
                    href: o
                }, s.createElement("img", {
                    width: i,
                    height: i,
                    src: this.state.errored ? l : a,
                    alt: d,
                    onError: this.onError,
                    className: "Entity__photo"
                })) : s.createElement("img", {
                    width: i,
                    height: i,
                    src: a,
                    alt: d,
                    className: "Entity__photo"
                }))), s.createElement("div", {
                    className: "Entity__main"
                }, d && o ? s.createElement(u["default"], {
                    href: o
                }, s.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: d
                    }
                })) : s.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: d
                    }
                }), f && s.createElement("div", {
                    className: "Entity__description",
                    dangerouslySetInnerHTML: {
                        __html: f
                    }
                })))
            }, t
        }(s.PureComponent);
    t["default"] = d, d.defaultProps = {
        size: null,
        photo: "",
        title: "",
        description: "",
        href: ""
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        if (!e.loading && !e.all) {
            var i = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (i > -300) {
                var a = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, Object(g.wrapLoading)(a)(Object(m.loadSpam)(e.offset, r.get().gid).then(function(t) {
                    var n = y(t, 4),
                        i = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(a, "im-important_all") : e.loading = !1, r.set(m.mergeTabs.bind(null, Object(g.tabFromIds)(o.msgs, o.hash)));
                    var s = ce("div");
                    s.innerHTML = i, a.appendChild(s), Object(g.ensureDomHasActions)(a)
                }), "bottom")
            }
        }
    }

    function i() {
        return '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + g.DESELECT_ALL_CLASS + '"></button>'
    }

    function a(e, t) {
        var n = t.get().selectedMessages,
            r = geByClass1("_im_spam_box", e.bodyNode),
            a = geByClass1("ui_tab_sel", e.bodyNode);
        if (n.length > 0) {
            var o = getLang("mail_selected", n.length);
            o = o.replace("{count}", n.length), val(a, o + i())
        } else val(a, getLang("mail_spam"));
        0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(w), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(O), getLang("mail_im_mark_delspam", n.length)))
    }

    function o(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(m.cleanSelected).then(n.cleanSelection.bind(null, r)).then(function(n) {
            return a(t, e)
        })
    }

    function s(e, t, n, r) {
        var i = gpeByClass("_im_mess", r, t);
        if (i) {
            var a = intval(domData(i, "msgid"));
            i && (Object(m.removeMessageSend)([a], 0, e.get().tabs[0].hash, "undel", e.get()), Object(g.restoreMessage)(a, 0, t))
        }
    }

    function c(e, t, n) {
        var r = e.get().selectedMessages;
        Object(m.removeMessageSend)(r, 0, e.get().tabs[0].hash, "delete", e.get()), Object(g.removeMessagesWithRestore)(r, 0, "delete", t), o(e, t, n)
    }

    function u(e, t, n) {
        var r = e.get().selectedMessages;
        Object(m.removeMessageSend)(r, 0, e.get().tabs[0].hash, "nospam", e.get()), r.map(function(e) {
            return geByClass1("_im_mess_" + e)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            var t = intval(domData(e, "peer")),
                n = intval(domData(e, "msgid"));
            val(e, Object(g.renderGoTo)(t, n)), addClass(e, "im-mess_light")
        }), o(e, t, n)
    }

    function l(e, t, n, r, i) {
        var a = gpeByClass("_im_mess", i, t.bodyNode),
            o = intval(domData(a, "peer")),
            s = intval(domData(a, "msgid"));
        return t.hide(), n().unmount(), e.get().longpoll.push([Object(b.changePeer)(o, s)]), stopEvent(r), cancelEvent(r), !1
    }

    function d(e, t, n, r) {
        var i = showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function() {
            Object(m.flushSpam)(e, r).then(function(e) {
                var t = y(e, 2),
                    n = (t[0], t[1]);
                showDoneBox(n)
            }), i.hide(), t.hide(), n().unmount()
        }, getLang("mail_close"), function() {
            return i.hide()
        })
    }

    function f(e, t) {
        return {
            unmount: function() {
                t.unmount(), Object(h.destroyModule)(e)
            }
        }
    }

    function p(e, t, n) {
        var i = ge("box_layer_wrap"),
            p = Object(h.createMutations)(f),
            m = p.callMutations,
            b = p.bindMutations,
            y = Object(v["default"])({
                peer: 0,
                oCache: {},
                tabs: Object(g.tabFromIds)(n.msgs, n.hash),
                gid: t.get().gid
            }),
            C = r.bind(null, {
                all: n.all,
                loading: !1,
                offset: n.offset
            }, e, i, y),
            k = s.bind(null, y, e.bodyNode),
            E = l.bind(null, t, e, m),
            j = d.bind(null, n.hash, e, m, t.get().gid),
            S = Object(_.mount)(e.bodyNode, y, function(t) {
                return {
                    changedMessageSelection: a.bind(null, e)
                }
            }),
            T = c.bind(null, y, e.bodyNode, S),
            I = u.bind(null, y, e.bodyNode, S),
            L = o.bind(null, y, e, S);
        Object(g.ensureDomHasActions)(e.bodyNode);
        var x = Object(h.createModule)({
            handlers: function(t, n) {
                t(i, "scroll", C), t(geByClass1(O, e.bodyNode), "click", T), t(geByClass1(w, e.bodyNode), "click", I), t(geByClass1("_im_spam_flush", e.bodyNode), "click", j), n(e.bodyNode, "click", "_im_mess_restore", k), n(e.bodyNode, "click", "_im_go_to", E), n(e.bodyNode, "click", g.DESELECT_ALL_CLASS, L)
            }
        });
        return b(x, S)
    }
    n.r(t), n.d(t, "mount", function() {
        return p
    });
    var m = n(41),
        g = n(81),
        h = n(110),
        _ = n(165),
        v = n(188),
        b = n(132),
        y = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        w = "_im_spam_not_spam",
        O = "_im_spam_spam"
}, function(e, t, n) {
    "use strict";
    var r = n(46),
        i = n(173),
        a = n(26),
        o = n(174);
    e.exports = n(85)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, i(1)) : "keys" == t ? i(0, n) : "values" == t ? i(0, e[n]) : i(0, [n, e[n]])
    }, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    var r = n(202),
        i = n(11),
        a = n(137),
        o = n(6)("IE_PROTO"),
        s = function() {},
        c = "prototype",
        u = function() {
            var e, t = n(25)("iframe"),
                r = a.length,
                i = ">";
            for (t.style.display = "none", n(98).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + i), e.close(), u = e.F; r--;) delete u[c][a[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[c] = r(e), n = new s, s[c] = null, n[o] = e) : n = u(), void 0 === t ? n : i(n, t)
    }
}, function(e, t, n) {
    var r = n(38)("unscopables"),
        i = Array.prototype;
    void 0 == i[r] && n(12)(i, r, {}), e.exports = function(e) {
        i[r][e] = !0
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function i(e, t) {
        return setTimeout(r(e), t)
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

    function u(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function l(e) {
        return "string" == typeof e
    }

    function d(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function f(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function p() {
        return +new Date
    }

    function m() {
        return window.Image ? new Image : ce("img")
    }

    function g(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function h(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function _(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function v(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function b(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function y(e) {
        return e = v(e), 0 > e ? 0 : e
    }

    function w(e) {
        return !isNaN(e)
    }

    function O(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return t = v(t), t >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function C(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function k(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function E(e) {
        return C(e.replace(/\t/g, "\n"))
    }

    function j(e, t) {
        if (d(e) || "undefined" == typeof e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
        } else
            for (var r = 0, i = e.length; i > r; r++) {
                var a = e[r];
                if (t.call(a, r, a) === !1) break
            }
        return e
    }

    function S(e, t, n) {
        for (var r = n || 0, i = (e || []).length; i > r; r++)
            if (e[r] == t) return r;
        return -1
    }

    function T(e, t) {
        return -1 != S(t, e)
    }

    function I(e, t) {
        var n = d(e) || "undefined" == typeof e.length ? {} : [];
        for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === F(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = I(e[r]) : n[r] = e[r]);
        return n
    }

    function L(e) {
        var t, n, r = {},
            i = 1,
            a = arguments.length,
            o = arguments;
        for (t in e) {
            for (n = !1, i = 1; a > i; i++) o[i][t] && o[i][t] == e[t] && (n = !0);
            n || (r[t] = e[t])
        }
        return r
    }

    function x() {
        var e, t = arguments,
            n = t[0] || {},
            r = 1,
            i = t.length,
            a = !1;
        for ("boolean" == typeof n && (a = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : F(n)) || c(n) || (n = {}); i > r; ++r)
            if (null != (e = t[r]))
                for (var o in e) {
                    var s = n[o],
                        u = e[o];
                    n !== u && (a && u && "object" === ("undefined" == typeof u ? "undefined" : F(u)) && !u.nodeType ? n[o] = x(a, s || (null != u.length ? [] : {}), u) : void 0 !== u && (n[o] = u))
                }
        return n
    }

    function P(e) {
        window.templates = window.templates || {}, x(window.templates, e)
    }

    function M(e, t) {
        var n = window.templates = window.templates || {},
            r = n[e];
        return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
    }

    function A(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : F(e))) return !1;
        var t = {},
            n = function(t) {
                return geByTag(t, e)
            },
            r = function(n, r) {
                if (r.name)
                    if ("text" != r.type && r.type)
                        if (r.getAttribute("bool")) {
                            var i = val(r);
                            if (!i || "0" === i) return;
                            t[r.name] = 1
                        } else t[r.name] = browser.msie && !r.value && e[r.name] ? e[r.name].value : r.value;
                else t[r.name] = val(r)
            };
        return j(n("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? r(e, t) : void 0
        }), j(n("select"), r), j(n("textarea"), r), t
    }

    function N(e, t) {
        for (var n, r = t ? H : B, i = []; e && (n = e.match(r));) {
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

    function D() {
        return window.devicePixelRatio >= 2
    }

    function R(e) {
        var t = 0,
            n = 0,
            r = e.ownerDocument || e.document,
            i = r.defaultView || r.parentWindow,
            a = i.getSelection();
        if (a.rangeCount > 0) {
            var o = i.getSelection().getRangeAt(0),
                s = o.cloneRange();
            s.selectNodeContents(e), s.setEnd(o.startContainer, o.startOffset), t = s.toString().length, s.setEnd(o.endContainer, o.endOffset), n = s.toString().length
        }
        return [t, n]
    }
    n.r(t), n.d(t, "vkLocal", function() {
        return r
    }), n.d(t, "lTimeout", function() {
        return i
    }), n.d(t, "rand", function() {
        return a
    }), n.d(t, "irand", function() {
        return o
    }), n.d(t, "isUndefined", function() {
        return s
    }), n.d(t, "isFunction", function() {
        return c
    }), n.d(t, "isArray", function() {
        return u
    }), n.d(t, "isString", function() {
        return l
    }), n.d(t, "isObject", function() {
        return d
    }), n.d(t, "isEmpty", function() {
        return f
    }), n.d(t, "vkNow", function() {
        return p
    }), n.d(t, "vkImage", function() {
        return m
    }), n.d(t, "trim", function() {
        return g
    }), n.d(t, "stripHTML", function() {
        return h
    }), n.d(t, "escapeRE", function() {
        return _
    }), n.d(t, "intval", function() {
        return v
    }), n.d(t, "floatval", function() {
        return b
    }), n.d(t, "positive", function() {
        return y
    }), n.d(t, "isNumeric", function() {
        return w
    }), n.d(t, "winToUtf", function() {
        return O
    }), n.d(t, "replaceEntities", function() {
        return C
    }), n.d(t, "clean", function() {
        return k
    }), n.d(t, "unclean", function() {
        return E
    }), n.d(t, "each", function() {
        return j
    }), n.d(t, "indexOf", function() {
        return S
    }), n.d(t, "inArray", function() {
        return T
    }), n.d(t, "clone", function() {
        return I
    }), n.d(t, "arrayKeyDiff", function() {
        return L
    }), n.d(t, "extend", function() {
        return x
    }), n.d(t, "addTemplates", function() {
        return P
    }), n.d(t, "getTemplate", function() {
        return M
    }), n.d(t, "serializeForm", function() {
        return A
    }), n.d(t, "extractUrls", function() {
        return N
    }), n.d(t, "isRetina", function() {
        return D
    }), n.d(t, "getCaretCharacterOffsetWithin", function() {
        return R
    });
    var F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    window.PageID = window.PageID || 1;
    var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = D, window.extractUrls = N, window.serializeForm = A, window.addTemplates = P, window.getTemplate = M, window.rand = a, window.irand = o, window.isUndefined = s, window.isFunction = c, window.isArray = u, window.isString = l, window.isObject = d, window.isEmpty = f, window.vkNow = p, window.vkImage = m, window.trim = g, window.stripHTML = h, window.escapeRE = _, window.intval = v, window.floatval = b, window.positive = y, window.isNumeric = w, window.winToUtf = O, window.replaceEntities = C, window.clean = k, window.unclean = E, window.each = j, window.indexOf = S, window.inArray = T, window.clone = I, window.arrayKeyDiff = L, window.extend = x, window.vkLocal = r, window.lTimeout = i, window.getCaretCharacterOffsetWithin = R
}, function(e, t) {
    function n() {
        throw new Error("setTimeout has not been defined")
    }

    function r() {
        throw new Error("clearTimeout has not been defined")
    }

    function i(e) {
        if (l === setTimeout) return setTimeout(e, 0);
        if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
        try {
            return l(e, 0)
        } catch (t) {
            try {
                return l.call(null, e, 0)
            } catch (t) {
                return l.call(this, e, 0)
            }
        }
    }

    function a(e) {
        if (d === clearTimeout) return clearTimeout(e);
        if ((d === r || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
        try {
            return d(e)
        } catch (t) {
            try {
                return d.call(null, e)
            } catch (t) {
                return d.call(this, e)
            }
        }
    }

    function o() {
        g && p && (g = !1, p.length ? m = p.concat(m) : h = -1, m.length && s())
    }

    function s() {
        if (!g) {
            var e = i(o);
            g = !0;
            for (var t = m.length; t;) {
                for (p = m, m = []; ++h < t;) p && p[h].run();
                h = -1, t = m.length
            }
            p = null, g = !1, a(e)
        }
    }

    function c(e, t) {
        this.fun = e, this.array = t
    }

    function u() {}
    var l, d, f = e.exports = {};
    ! function() {
        try {
            l = "function" == typeof setTimeout ? setTimeout : n
        } catch (e) {
            l = n
        }
        try {
            d = "function" == typeof clearTimeout ? clearTimeout : r
        } catch (e) {
            d = r
        }
    }();
    var p, m = [],
        g = !1,
        h = -1;
    f.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        m.push(new c(e, t)), 1 !== m.length || g || i(s)
    }, c.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function(e) {
        return []
    }, f.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, f.cwd = function() {
        return "/"
    }, f.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, f.umask = function() {
        return 0
    }
}, function(e, t) {
    e.exports = {
        im_img_prebody: '<div class="im-prebody"> <img alt="" src="%photo%" /> </div>',
        im_admin_link: ' (<a href="%href%" class="_im_admin_name" target="_blank">%name%</a>)',
        im_right_menu_tpl: '<a id="ui_rmenu_peer_%peer%" href="%href%" class="_im_peer_tab ui_rmenu_item %cls%"%attrs%>\n  <span>%label%</span>\n</a>',
        im_right_menu_sep: '<div class="ui_rmenu_sep"></div>',
        im_right_menu_ct: '<span class="ui_rmenu_count im-right-menu--count _im_r_ct">%count%</span> <button type="button" class="im-right-menu--close _im_r_cl"></button><span class="im-right-menu--text _im_r_tx">%name%</span>',
        im_dialogs_link_img: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank"><div class="im_grid">%photo%</div></a>',
        im_dialogs_link: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank">%photo%</a>',
        im_peer_photo: '<div class="nim-peer %online_class% %modifier_class%"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> %owner_photo% </div> </div> </div>',
        im_owner_item: '<a href="%link%" class="olist_item_wrap%cls%" id="olist_item_wrap%owner_id%" >\n  <div class="olist_item clear_fix">\n    <div class="olist_item_photo_wrap %img_cls%">\n      <img class="olist_item_photo" src="%photo%"/>\n    </div>\n    <div class="olist_item_name">%name%</div>\n    <div class="olist_checkbox"></div>\n  </div>\n</a>',
        im_simple_name: '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> </div>',
        im_simple_link: '<a href="%href%" class="_im_header_link" target="_blank">%content%</a>',
        im_selected_messages: '<span class="im-page--selected-messages-count">%label%</span> <button aria-label="%tip%" type="button" class="im-page--selected-messages-remove"></button>',
        im_topic: "<div class='im-topic %cls%'>%topic%</div>",
        im_stack_date: ' <a href="%link%" class="_im_mess_link" >%date%</a>',
        im_dialogs_none: '<li data-list-id="002300" class="im-page--dialogs-empty"> %msg%</li>',
        im_filter: '<a class="im-page--dialogs-filter %cls%">%filter%</a>',
        im_drow_prebody: '<span class="nim-dialog--who">%prebody%</span> <span class="nim-dialog--inner-text">%body%</span>',
        im_attach_mess: ' <div class="im-fwd %modifier%"> <span class="im-fwd--title"> <span class="im-fwd--title-name">%text%</span> <span class="im-fwd--date">%date%</span></span> <span class="im-fwd--close _im_fwd_close"></span> <div rel="button" tab-index="0" type="button" class="im-fwd--messages _im_will_fwd">%messages%</div> </div>',
        im_preloader: '<div class="im-preloader %cls%"> %preloader%</div>',
        im_service_row: '<ul class="ui_clean_list"> <li class="im-mess im-mess_srv _im_mess _im_mess_srv _im_mess_%message_id%" data-msgid="%message_id%" data-from="%from_id%" data-ts="%date%"> <div class="im-mess--text">%text%</div> </li> </ul>',
        im_chat_members: '<button type="button" class="_im_chat_members im-page--members">%name%</button>',
        im_vkcomgroup_members: '<span class="im-page--members im-page--members--nohover">%name%</span>',
        im_mess_stack: '<div class="im-mess-stack _im_mess_stack %cls%" data-peer="%peerId%" data-admin="%admin%"> <div class="im-mess-stack--photo"> <div class="nim-peer nim-peer_small fl_l"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> <a target="_blank" class="im_grid" href="%href%"><img alt="%name%" src="%photo%" /></a> </div> </div> </div> </div> <div class="im-mess-stack--content"> <div class="im-mess-stack--info"> <div class="im-mess-stack--pname"> %stack_name% <span class="im-mess-stack--tools">%date%</span> </div> </div> <ul class="ui_clean_list im-mess-stack--mess _im_stack_messages"> %messages% </ul> </div> </div>',
        im_mess_stack_name: '<a href="%link%" class="im-mess-stack--lnk%class%" title="" target="_blank">%name%</a>',
        im_message_media: '<div class="_im_msg_media%messageId%" class="wall_module">%attaches%</div>%text%',
        im_dialog_media: '<span class="nim-dialog--preview nim-dialog--preview-attach">%name%</span>',
        im_typing: '<div class="im-page--typing _im_typing"> <div class="im-typing %cls%"><div class="pr im-typing--icon" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><span class="_im_typing_name">&nbsp;</span></div> </div>',
        ctrl_submit_hint: function() {
            return '<div class="reply_submit_hint_wrap" >\n  <div class="reply_submit_hint_title">' + getLang("wall_reply_submit_settings") + '</div>\n  <div class="reply_submit_hint_opts" id="">\n    <div class="radiobtn %enter_on% _im_submit_btn" data-val="0" onclick="radiobtn(this, 0, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_1") + '</div></div>\n    <div class="radiobtn %ctrl_on% _im_submit_btn" data-val="1" onclick="radiobtn(this, 1, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_2") + "</div></div>\n  </div>\n</div>"
        },
        im_day_bar: '<h5 class="im-page--history-new-bar im-page--history-new-bar_days _im_bar_date %day_class%" data-date="%date%"><span>%day%</span></h5>',
        im_mess_bar: function() {
            return '<h4 class="im-page--history-new-bar _im_unread_bar_row"><span>' + getLang("mail_new_unread_msgs") + "</span></h4>"
        },
        im_drow: function() {
            return '<li data-list-id="%peer%" class="nim-dialog _im_dialog _im_dialog_%peer% %is_unread% %is_unread_out% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <div class="nim-dialog--date _im_dialog_date">%date%</div> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <button type="button" class="nim-dialog--markre _im_dialog_markre"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> <span class="nim-dialog--verfifed _im_dialog_verified"></span> <span class="nim-dialog--mute"></span> <button type="button" class="nim-dialog--star _im_dialog_star"></button> </div> <div class="nim-dialog--text-preview"> <span class="nim-dialog--preview _dialog_body" tabindex="0">%body%</span> <span class="nim-dialog--typing _im_dialog_typing"></span><span class="nim-dialog--typer-el"></span> </div> <label class="blind_label _im_unread_blind_label">%unread_message_string%</label> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_conversation_search_row: function() {
            return '<li data-list-id="%peer%" class="nim-dialog nim-conversation-search-row _im_dialog _im_dialog_%peer% %is_unread% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer nim-peer_search %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> </div> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_delete_actions: function() {
            return '<span class="nim-dialog--who">%text%</span> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="restore" type="button">' + getLang("mail_restore") + '</button> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="spam" type="button">' + getLang("mail_im_mark_spam") + '</button> <button class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="block" type="button">' + getLang("mail_user_black_list") + "</button>"
        },
        im_chat_change_topic: function() {
            return '<div class="im_change_topic_wrap clear_fix"> <div class="im_change_topic_label fl_l ta_r">' + getLang("mail_chat_topic_change_label") + '</div> <div class="im_change_topic_labeled fl_l"> <input class="text _im_chat_topic_change_input" value="%value%"/> </div> </div>'
        },
        im_msg_row: function() {
            return '<li class="im-mess %cls% _im_mess_noa _im_mess_%msg_id%" aria-hidden="%aria_hidden%" data-ts="%ts%" data-msgid="%msg_id%" data-peer="%from_id%"> <div class="im-mess--text wall_module _im_log_body">%text%</div> <span tabindex="0" role="link" aria-label="' + getLang("mail_select_message") + '" class="blind_label im-mess--blind-select _im_mess_blind_label_select"></span> <span class="blind_label im-mess--blind-read _im_mess_blind_unread_marker" %unread_params%></span> <span class="im-mess--marker _im_mess_marker" %marker_params%></span> </li>'
        },
        sImHistoryRowActions: function() {
            return '<div class="im-mess--actions"> <span role="link" aria-label="' + getLang("mail_im_reply") + '" class="im-mess--reply _im_mess_reply"></span><span role="link" aria-label="' + getLang("mail_im_edit") + '" class="im-mess--edit _im_mess_edit"></span><span role="link" aria-label="' + getLang("mail_important_message") + '" class="im-mess--fav _im_mess_fav"></span> </div> <div class="im-mess--check fl_l"></div>'
        },
        im_wrap_mobile: '<b class="mob_onl %class%" %attrs% onmouseover="mobileOnlineTip(this, {%params%})"></b>',
        im_pinned_message: '<div class="im-page-pinned _im_pinned_message"> <button class="im-page-pinned--hide _im_pin_hide"></button> <div class="im-page-pinned--meta"> <a href="%link%" target="_blank" class="im-page-pinned--name">%name%</a> <span class="im-page-pinned--date">%date%</span> </div> <div class="im-page-pinned--content">%content%</div> </div>',
        im_pinned_message_media: '<span class="im-page-pinned--media">%text%</span>',
        im_pinned_message_media_bar: '<div class="im-page-pinned--media-bar">\n  <div class="im-page-pinned--media-bar_progress" style="width: %percent%%;"></div>\n</div>',
        im_pinned_messages_promo: '<div class="im-page--mess-actions-promo-content">%content%</div>',
        im_retry_link: function() {
            return '<button class="im-page--retry _im_retry_media">' + getLang("mail_retry") + "</button>"
        },
        sImLblWasEdited: function() {
            return " <span class='im-mess--lbl-was-edited _im_edit_time' data-time='%update_time%'>" + getLang("mail_was_edited_short") + "</span>"
        },
        im_top_banner: '<div class="im-top-banner">\n  %icon%\n  <div class="im-top-banner--text"><div>%text%</div></div>\n  <div class="im-top-banner--buttons">%buttons%</div>\n</div>',
        im_top_banner_icon: '<div class="im-top-banner--icon">\n  <img src="%icon%" alt=""/>\n</div>',
        im_top_banner_button_link: '<a href="%link%" target="_blank" class="_im_top_banner_button im-top-banner--button %css_class% flat_button">%text%</a>',
        im_top_banner_button: '<button class="_im_top_banner_button im-top-banner--button %css_class% flat_button" data-payload="%callback_data%">%text%</button>',
        im_top_banner_hide_btn: '<button class="im-top-banner--button im-top-banner--button_hide _im_top_banner_hide"></button>',
        im_calls_link: '<a href="/vk_calls" class="im_srv_lnk_light" onclick="return showWiki({ w: \'vk_calls\'});">%text%</a>',
        sImPeerMuteUnmute: '<a href="#" class="_im_peer_mute_unmute ui_actions_menu_item im-action nohover %cls%">%text%</a>',
        sImPeerReturnToChat: '<a href="#" class="_im_peer_return_to_chat">%text%</a>'
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.queues[e].currEv = !1, Promise.resolve(t)
    }

    function i(e, t) {
        var n = t.queues[e].currEv;
        return n ? (t.queues[e].errored.push(n), r(e, t)) : Promise.resolve(t)
    }

    function a(e) {
        for (var t = {}, n = Object.keys(e.queues), r = n.length, i = 0; r > i; i++) {
            var a = n[i],
                o = e.queues[a];
            (o.currEv || o.evs.length || o.errored.length) && (t[a] = o)
        }
        return {
            queues: t,
            opts: e.opts
        }
    }

    function o(e, t, n) {
        return n.queues[e] ? (t ? n.queues[e].errored = [] : n.queues[e].errored = n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], r(e, n)) : Promise.resolve(n)
    }

    function s(e, t) {
        var n = d(e, t.get()).errored;
        return n.length > 0 ? n[n.length - 1] : !1
    }

    function c(e, t, n, a) {
        var o = a.get().queues[e];
        if (o && !o.currEv && o.evs.length > 0 && !o.pause) {
            var u = c.bind(null, e, t, n, a),
                l = o.evs.shift();
            o.currEv = l, t(e, l).then(function() {
                a.get().opts.waitCommit || a.set(r.bind(null, e))
            }).then(u)["catch"](function(t) {
                return a.set(i.bind(null, e)).then(function() {
                    n(e, s(e, a), t)
                }).then(u)
            })
        }
    }

    function u(e, t, n) {
        var r = n.queues[e];
        return r.errored.filter(function(e) {
            return e.mess.messageId === t
        }).forEach(function(e) {
            e.failed = !1, r.evs.push(e)
        }), r.errored = r.errored.filter(function(e) {
            return e.mess.messageId !== t
        }), Promise.resolve(n)
    }

    function l() {
        return {
            evs: [],
            pause: !1,
            errored: [],
            currEv: !1
        }
    }

    function d(e, t) {
        return t.queues[e] || (t.queues[e] = l()), t.queues[e]
    }

    function f(e, t, n) {
        var r = d(e, n);
        return r.pause = t, Promise.resolve(n)
    }

    function p(e, t, n) {
        t.ts = Date.now();
        var r = d(e, n);
        return r.evs.push(t), Promise.resolve(n)
    }

    function m(e) {
        var t = Object.keys(e.get().queues);
        t.forEach(function(t) {
            e.set(i.bind(null, t)), e.set(o.bind(null, t, !1))
        })
    }

    function g(e, t, n) {
        var i = Object(h["default"])({
            queues: {},
            debug: n && n.debug,
            opts: extend({}, n)
        }, n);
        return n && n.store ? (i.setState(a(i.get())), m(i)) : m(i), {
            pushMessage: function(n, r) {
                return i.set(p.bind(null, n, r)).then(function(r) {
                    c(n, e, t, r)
                })
            },
            resend: function(n, r) {
                return i.set(u.bind(null, n, r)).then(function(a) {
                    var o = i.get().queues[n].evs.filter(function(e) {
                        return e.mess.messageId === r
                    })[0];
                    return c(n, e, t, i), o
                })
            },
            reset: function(n) {
                return i.set(o.bind(null, n, !0)).then(function(r) {
                    c(n, e, t, r)
                })
            },
            setErrored: function(e, t) {
                return i.set(function(n) {
                    var r = d(e, n);
                    return r.errored = t, Promise.resolve(n)
                })
            },
            pause: function(e) {
                i.set(f.bind(null, e, !0))
            },
            isPaused: function(e) {
                return !!d(e, i.get()).pause
            },
            complete: function(n, a) {
                var o = i.get();
                o.queues[n].currEv && o.queues[n].currEv.rid === a && i.set(r.bind(null, n)).then(function() {
                    c(n, e, t, i)
                })
            },
            resume: function(n) {
                i.set(f.bind(null, n, !1)).then(Object(_.pause)(.1)).then(function() {
                    c(n, e, t, i)
                })
            },
            inspectQueue: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                if (!i.get().queues[e]) return [];
                var n = i.get().queues[e],
                    r = t && n.currEv ? [n.currEv] : [];
                return r.concat(n.evs.slice()).concat(n.errored.slice().map(function(e) {
                    return extend({}, e, {
                        failed: !0
                    })
                })).sort(function(e, t) {
                    return e.ts - t.ts
                })
            }
        }
    }
    n.r(t), n.d(t, "initQueue", function() {
        return g
    });
    var h = n(188),
        _ = n(27)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a, o, s, c) {
        if (i(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var l = [n, r, a, o, s, c],
                    d = 0;
                u = new Error(t.replace(/%s/g, function() {
                    return l[d++]
                })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
    var i = function(e) {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(71),
        c = n(15),
        u = n(153),
        l = n(180),
        d = window,
        f = d.elfocus,
        p = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onCopy = function() {
                    a.input && (f(a.input, 0, a.input.value.length), document.execCommand("copy"), a.setState({
                        copied: !0
                    }))
                }, a.onBlinkTextHide = function() {
                    a.setState({
                        copied: !1
                    })
                }, a.getInputRef = function(e) {
                    e && e.element && (a.input = e.element)
                }, a.state = {
                    copied: !1
                }, a
            }
            return a(t, e), t.prototype.componentDidMount = function() {
                this.input && f(this.input, 0, this.input.value.length)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.getLang,
                    n = e.onReset,
                    r = e.invitationLink,
                    i = t("mail_invite_link_reset_explainer").split("{reset_link}");
                return o.createElement("div", {
                    className: "ChatSettingsInvitationLink"
                }, this.props.reseted && o.createElement("div", {
                    className: "ChatSettingsInvitationLink__reseted"
                }, t("mail_invite_link_reseted_explainer")), o.createElement("p", null, t("mail_invite_link_explainer")), o.createElement("div", {
                    className: "ChatSettingsInvitationLink__main"
                }, o.createElement(s["default"], {
                    ref: this.getInputRef,
                    readOnly: "readonly",
                    className: "ChatSettingsInvitationLink__input",
                    value: r
                }), o.createElement(c["default"], {
                    onClick: this.onCopy
                }, t("mail_get_invite_link_copy")), o.createElement(u["default"], {
                    className: "ChatSettingsInvitationLink__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, t("mail_invite_link_copied"))), o.createElement("p", null, i[0], o.createElement(l["default"], {
                    className: "ChatSettingsInvitationLink__reset",
                    onClick: n
                }, t("mail_invite_reset_link")), i[1]))
            }, t
        }(o.Component);
    t["default"] = p
}, function(e, t, n) {
    "use strict";
    var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i) {
        var a = Object(g.getPeer)(e),
            o = Object(g.getTab)(e, a),
            s = Object(v.isPinnedMessageVisibleInTab)(e, Object(g.getPeer)(e)) || o && o.top_banner,
            c = 105 + (s ? Object(p.getPinnedMessageHeight)() : 0);
        showTooltip(t, {
            shift: [n, 10],
            black: 1,
            className: "_im_history_tooltip " + r,
            appendParentCls: "_im_mess_stack",
            toup: t.getBoundingClientRect().top > c + 37,
            text: i
        })
    }

    function i(e, t, n) {
        var r = gpeByClass("_im_mess", n),
            i = intval(domData(r, "msgid")),
            o = e.get().peer,
            s = Object(g.getMessage)(e, o, i),
            c = !Object(m.isImportant)(s);
        return e.get().longpoll.push([{
            peerId: o,
            messageId: i,
            type: c ? _.SET_FLAGS : _.RESET_FLAGS,
            flags: _.FLAG_IMPORTANT
        }]), e.set(f.favMessage.bind(null, [i], c, o)), a(e, -10, t, n), !1
    }

    function a(e, t, n, i) {
        var a = getLang("mail_im_toggle_important").length > 14;
        r(e, i, a ? 84 : 34, a ? "im-star-tt_long" : "im-star-tt", function() {
            var t = domData(gpeByClass("_im_mess", i), "msgid"),
                n = Object(g.getMessage)(e, e.get().peer, t);
            return n ? Object(m.isImportant)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
        })
    }

    function o(e, t, n) {
        var r = e.get().peer,
            i = +domData(domClosest("im-mess", n.target), "msgid");
        return Object(f.processFwd)([i], r, e).then(function(t) {
            return e.set(f.forwardMessages.bind(null, t, e.get().tfdraft))
        }).then(function() {
            return t().respond(e, r)
        }), !1
    }

    function s(e, t, n, i) {
        r(e, i, 18, "im-reply-tt", getLang("mail_im_reply"))
    }

    function c(e, t, n, r) {
        var i = intval(domData(gpeByClass("_im_mess", r), "msgid")),
            a = Object(g.getMessage)(e, e.get().peer, i);
        return a && t().startEditing(a), !1
    }

    function u(e, t, n) {
        r(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
    }

    function l(e, t) {
        return {
            markImportant: function(t, n, r) {
                Object(p.updateStar)(t, n, e)
            },
            unmount: function() {
                Object(h.destroyModule)(t)
            }
        }
    }

    function d(e, t, n) {
        var r = a.bind(null, t, 0),
            d = i.bind(null, t),
            f = s.bind(null, t, 0),
            p = o.bind(null, t, n),
            m = u.bind(null, t),
            g = c.bind(null, t, n),
            _ = Object(h.createModule)({
                handlers: function(t, n) {
                    n(e, "click", b, d), n(e, "mouseover", b, r), n(e, "click", y, p), n(e, "mouseover", y, f), n(e, "click", w, g), n(e, "mouseover", w, m)
                }
            });
        return l(e, _)
    }
    n.r(t), n.d(t, "mount", function() {
        return d
    });
    var f = n(41),
        p = n(81),
        m = n(158),
        g = n(199),
        h = n(110),
        _ = n(132),
        v = n(201),
        b = "_im_mess_fav",
        y = "_im_mess_reply",
        w = "_im_mess_edit"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
    }

    function i(e, t) {
        return (e & t) === t
    }

    function a(e, t) {
        if (In.hasOwnProperty(e) || 2 < e.length && ("o" === e[0] || "O" === e[0]) && ("n" === e[1] || "N" === e[1])) return !1;
        if (null === t) return !0;
        switch (typeof t) {
            case "boolean":
                return In.hasOwnProperty(e) ? e = !0 : (t = o(e)) ? e = t.hasBooleanValue || t.hasStringBooleanValue || t.hasOverloadedBooleanValue : (e = e.toLowerCase().slice(0, 5), e = "data-" === e || "aria-" === e), e;
            case "undefined":
            case "number":
            case "string":
            case "object":
                return !0;
            default:
                return !1
        }
    }

    function o(e) {
        return xn.hasOwnProperty(e) ? xn[e] : null
    }

    function s(e) {
        return e[1].toUpperCase()
    }

    function c(e, t, n, r, i, a, o, s, c) {
        Vn._hasCaughtError = !1, Vn._caughtError = null;
        var u = Array.prototype.slice.call(arguments, 3);
        try {
            t.apply(n, u)
        } catch (l) {
            Vn._caughtError = l, Vn._hasCaughtError = !0
        }
    }

    function u() {
        if (Vn._hasRethrowError) {
            var e = Vn._rethrowError;
            throw Vn._rethrowError = null, Vn._hasRethrowError = !1, e
        }
    }

    function l() {
        if (Wn)
            for (var e in qn) {
                var t = qn[e],
                    n = Wn.indexOf(e);
                if (n > -1 ? void 0 : r("96", e), !Kn[n]) {
                    t.extractEvents ? void 0 : r("97", e), Kn[n] = t, n = t.eventTypes;
                    for (var i in n) {
                        var a = void 0,
                            o = n[i],
                            s = t,
                            c = i;
                        Qn.hasOwnProperty(c) ? r("99", c) : void 0, Qn[c] = o;
                        var u = o.phasedRegistrationNames;
                        if (u) {
                            for (a in u) u.hasOwnProperty(a) && d(u[a], s, c);
                            a = !0
                        } else o.registrationName ? (d(o.registrationName, s, c), a = !0) : a = !1;
                        a ? void 0 : r("98", i, e)
                    }
                }
            }
    }

    function d(e, t, n) {
        Yn[e] ? r("100", e) : void 0, Yn[e] = t, $n[e] = t.eventTypes[n].dependencies
    }

    function f(e) {
        Wn ? r("101") : void 0, Wn = Array.prototype.slice.call(e), l()
    }

    function p(e) {
        var t, n = !1;
        for (t in e)
            if (e.hasOwnProperty(t)) {
                var i = e[t];
                qn.hasOwnProperty(t) && qn[t] === i || (qn[t] ? r("102", t) : void 0, qn[t] = i, n = !0)
            }
        n && l()
    }

    function m(e, t, n, r) {
        t = e.type || "unknown-event", e.currentTarget = er(r), Vn.invokeGuardedCallbackAndCatchFirstError(t, n, void 0, e), e.currentTarget = null
    }

    function g(e, t) {
        return null == t ? r("30") : void 0, null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t]
    }

    function h(e, t, n) {
        Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e)
    }

    function _(e, t) {
        if (e) {
            var n = e._dispatchListeners,
                r = e._dispatchInstances;
            if (Array.isArray(n))
                for (var i = 0; i < n.length && !e.isPropagationStopped(); i++) m(e, t, n[i], r[i]);
            else n && m(e, t, n, r);
            e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e)
        }
    }

    function v(e) {
        return _(e, !0)
    }

    function b(e) {
        return _(e, !1)
    }

    function y(e, t) {
        var n = e.stateNode;
        if (!n) return null;
        var i = Zn(n);
        if (!i) return null;
        n = i[t];
        e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
                (i = !i.disabled) || (e = e.type, i = !("button" === e || "input" === e || "select" === e || "textarea" === e)), e = !i;
                break e;
            default:
                e = !1
        }
        return e ? null : (n && "function" != typeof n ? r("231", t, typeof n) : void 0, n)
    }

    function w(e, t, n, r) {
        for (var i, a = 0; a < Kn.length; a++) {
            var o = Kn[a];
            o && (o = o.extractEvents(e, t, n, r)) && (i = g(i, o))
        }
        return i
    }

    function O(e) {
        e && (tr = g(tr, e))
    }

    function C(e) {
        var t = tr;
        tr = null, t && (e ? h(t, v) : h(t, b), tr ? r("95") : void 0, Vn.rethrowCaughtError())
    }

    function k(e) {
        if (e[ar]) return e[ar];
        for (var t = []; !e[ar];) {
            if (t.push(e), !e.parentNode) return null;
            e = e.parentNode
        }
        var n = void 0,
            r = e[ar];
        if (5 === r.tag || 6 === r.tag) return r;
        for (; e && (r = e[ar]); e = t.pop()) n = r;
        return n
    }

    function E(e) {
        return 5 === e.tag || 6 === e.tag ? e.stateNode : void r("33")
    }

    function j(e) {
        return e[or] || null
    }

    function S(e) {
        do e = e["return"]; while (e && 5 !== e.tag);
        return e ? e : null
    }

    function T(e, t, n) {
        for (var r = []; e;) r.push(e), e = S(e);
        for (e = r.length; 0 < e--;) t(r[e], "captured", n);
        for (e = 0; e < r.length; e++) t(r[e], "bubbled", n)
    }

    function I(e, t, n) {
        (t = y(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = g(n._dispatchListeners, t), n._dispatchInstances = g(n._dispatchInstances, e))
    }

    function L(e) {
        e && e.dispatchConfig.phasedRegistrationNames && T(e._targetInst, I, e)
    }

    function x(e) {
        if (e && e.dispatchConfig.phasedRegistrationNames) {
            var t = e._targetInst;
            t = t ? S(t) : null, T(t, I, e)
        }
    }

    function P(e, t, n) {
        e && n && n.dispatchConfig.registrationName && (t = y(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = g(n._dispatchListeners, t), n._dispatchInstances = g(n._dispatchInstances, e))
    }

    function M(e) {
        e && e.dispatchConfig.registrationName && P(e._targetInst, null, e)
    }

    function A(e) {
        h(e, L)
    }

    function N(e, t, n, r) {
        if (n && r) e: {
            for (var i = n, a = r, o = 0, s = i; s; s = S(s)) o++;s = 0;
            for (var c = a; c; c = S(c)) s++;
            for (; o - s > 0;) i = S(i),
            o--;
            for (; s - o > 0;) a = S(a),
            s--;
            for (; o--;) {
                if (i === a || i === a.alternate) break e;
                i = S(i), a = S(a)
            }
            i = null
        }
        else i = null;
        for (a = i, i = []; n && n !== a && (o = n.alternate, null === o || o !== a);) i.push(n), n = S(n);
        for (n = []; r && r !== a && (o = r.alternate, null === o || o !== a);) n.push(r), r = S(r);
        for (r = 0; r < i.length; r++) P(i[r], "bubbled", e);
        for (e = n.length; 0 < e--;) P(n[e], "captured", t)
    }

    function D() {
        return !ur && yn.canUseDOM && (ur = "textContent" in document.documentElement ? "textContent" : "innerText"), ur
    }

    function R() {
        if (lr._fallbackText) return lr._fallbackText;
        var e, t, n = lr._startText,
            r = n.length,
            i = F(),
            a = i.length;
        for (e = 0; r > e && n[e] === i[e]; e++);
        var o = r - e;
        for (t = 1; o >= t && n[r - t] === i[a - t]; t++);
        return lr._fallbackText = i.slice(e, t > 1 ? 1 - t : void 0), lr._fallbackText
    }

    function F() {
        return "value" in lr._root ? lr._root.value : lr._root[D()]
    }

    function B(e, t, n, r) {
        this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface;
        for (var i in e) e.hasOwnProperty(i) && ((t = e[i]) ? this[i] = t(n) : "target" === i ? this.target = r : this[i] = n[i]);
        return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? On.thatReturnsTrue : On.thatReturnsFalse, this.isPropagationStopped = On.thatReturnsFalse, this
    }

    function H(e, t, n, r) {
        if (this.eventPool.length) {
            var i = this.eventPool.pop();
            return this.call(i, e, t, n, r), i
        }
        return new this(e, t, n, r)
    }

    function U(e) {
        e instanceof this ? void 0 : r("223"), e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e)
    }

    function z(e) {
        e.eventPool = [], e.getPooled = H, e.release = U
    }

    function G(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function V(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function W(e, t) {
        switch (e) {
            case "topKeyUp":
                return -1 !== pr.indexOf(t.keyCode);
            case "topKeyDown":
                return 229 !== t.keyCode;
            case "topKeyPress":
            case "topMouseDown":
            case "topBlur":
                return !0;
            default:
                return !1
        }
    }

    function q(e) {
        return e = e.detail, "object" == typeof e && "data" in e ? e.data : null
    }

    function K(e, t) {
        switch (e) {
            case "topCompositionEnd":
                return q(t);
            case "topKeyPress":
                return 32 !== t.which ? null : (Cr = !0, wr);
            case "topTextInput":
                return e = t.data, e === wr && Cr ? null : e;
            default:
                return null
        }
    }

    function Q(e, t) {
        if (kr) return "topCompositionEnd" === e || !mr && W(e, t) ? (e = R(), lr._root = null, lr._startText = null, lr._fallbackText = null, kr = !1, e) : null;
        switch (e) {
            case "topPaste":
                return null;
            case "topKeyPress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t["char"] && 1 < t["char"].length) return t["char"];
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "topCompositionEnd":
                return yr ? null : t.data;
            default:
                return null
        }
    }

    function Y(e) {
        if (e = Jn(e)) {
            jr && "function" == typeof jr.restoreControlledState ? void 0 : r("194");
            var t = Zn(e.stateNode);
            jr.restoreControlledState(e.stateNode, e.type, t)
        }
    }

    function $(e) {
        Sr ? Tr ? Tr.push(e) : Tr = [e] : Sr = e
    }

    function X() {
        if (Sr) {
            var e = Sr,
                t = Tr;
            if (Tr = Sr = null, Y(e), t)
                for (e = 0; e < t.length; e++) Y(t[e])
        }
    }

    function Z(e, t) {
        return e(t)
    }

    function J(e, t) {
        if (xr) return Z(e, t);
        xr = !0;
        try {
            return Z(e, t)
        } finally {
            xr = !1, X()
        }
    }

    function ee(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return "input" === t ? !!Pr[e.type] : "textarea" === t ? !0 : !1
    }

    function te(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
    }

    function ne(e, t) {
        if (!yn.canUseDOM || t && !("addEventListener" in document)) return !1;
        t = "on" + e;
        var n = t in document;
        return n || (n = document.createElement("div"), n.setAttribute(t, "return;"), n = "function" == typeof n[t]), !n && vr && "wheel" === e && (n = document.implementation.hasFeature("Events.wheel", "3.0")), n
    }

    function re(e) {
        var t = e.type;
        return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
    }

    function ie(e) {
        var t = re(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
        return e.hasOwnProperty(t) || "function" != typeof n.get || "function" != typeof n.set ? void 0 : (Object.defineProperty(e, t, {
            enumerable: n.enumerable,
            configurable: !0,
            get: function() {
                return n.get.call(this)
            },
            set: function(e) {
                r = "" + e, n.set.call(this, e)
            }
        }), {
            getValue: function() {
                return r
            },
            setValue: function(e) {
                r = "" + e
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        })
    }

    function ae(e) {
        e._valueTracker || (e._valueTracker = ie(e))
    }

    function oe(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
            r = "";
        return e && (r = re(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
    }

    function se(e, t, n) {
        return e = B.getPooled(Mr.change, e, t, n), e.type = "change", $(n), A(e), e
    }

    function ce(e) {
        O(e), C(!1)
    }

    function ue(e) {
        var t = E(e);
        return oe(t) ? e : void 0
    }

    function le(e, t) {
        return "topChange" === e ? t : void 0
    }

    function de() {
        Ar && (Ar.detachEvent("onpropertychange", fe), Nr = Ar = null)
    }

    function fe(e) {
        "value" === e.propertyName && ue(Nr) && (e = se(Nr, e, te(e)), J(ce, e))
    }

    function pe(e, t, n) {
        "topFocus" === e ? (de(), Ar = t, Nr = n, Ar.attachEvent("onpropertychange", fe)) : "topBlur" === e && de()
    }

    function me(e) {
        return "topSelectionChange" === e || "topKeyUp" === e || "topKeyDown" === e ? ue(Nr) : void 0
    }

    function ge(e, t) {
        return "topClick" === e ? ue(t) : void 0
    }

    function he(e, t) {
        return "topInput" === e || "topChange" === e ? ue(t) : void 0
    }

    function _e(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function ve(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = Fr[e]) ? !!t[e] : !1
    }

    function be() {
        return ve
    }

    function ye(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function we(e) {
        return e = e.type, "string" == typeof e ? e : "function" == typeof e ? e.displayName || e.name : null
    }

    function Oe(e) {
        var t = e;
        if (e.alternate)
            for (; t["return"];) t = t["return"];
        else {
            if (0 !== (2 & t.effectTag)) return 1;
            for (; t["return"];)
                if (t = t["return"], 0 !== (2 & t.effectTag)) return 1
        }
        return 3 === t.tag ? 2 : 3
    }

    function Ce(e) {
        return (e = e._reactInternalFiber) ? 2 === Oe(e) : !1
    }

    function ke(e) {
        2 !== Oe(e) ? r("188") : void 0
    }

    function Ee(e) {
        var t = e.alternate;
        if (!t) return t = Oe(e), 3 === t ? r("188") : void 0, 1 === t ? null : e;
        for (var n = e, i = t;;) {
            var a = n["return"],
                o = a ? a.alternate : null;
            if (!a || !o) break;
            if (a.child === o.child) {
                for (var s = a.child; s;) {
                    if (s === n) return ke(a), e;
                    if (s === i) return ke(a), t;
                    s = s.sibling
                }
                r("188")
            }
            if (n["return"] !== i["return"]) n = a, i = o;
            else {
                s = !1;
                for (var c = a.child; c;) {
                    if (c === n) {
                        s = !0, n = a, i = o;
                        break
                    }
                    if (c === i) {
                        s = !0, i = a, n = o;
                        break
                    }
                    c = c.sibling
                }
                if (!s) {
                    for (c = o.child; c;) {
                        if (c === n) {
                            s = !0, n = o, i = a;
                            break
                        }
                        if (c === i) {
                            s = !0, i = o, n = a;
                            break
                        }
                        c = c.sibling
                    }
                    s ? void 0 : r("189")
                }
            }
            n.alternate !== i ? r("190") : void 0
        }
        return 3 !== n.tag ? r("188") : void 0, n.stateNode.current === n ? e : t
    }

    function je(e) {
        if (e = Ee(e), !e) return null;
        for (var t = e;;) {
            if (5 === t.tag || 6 === t.tag) return t;
            if (t.child) t.child["return"] = t, t = t.child;
            else {
                if (t === e) break;
                for (; !t.sibling;) {
                    if (!t["return"] || t["return"] === e) return null;
                    t = t["return"]
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        return null
    }

    function Se(e) {
        if (e = Ee(e), !e) return null;
        for (var t = e;;) {
            if (5 === t.tag || 6 === t.tag) return t;
            if (t.child && 4 !== t.tag) t.child["return"] = t, t = t.child;
            else {
                if (t === e) break;
                for (; !t.sibling;) {
                    if (!t["return"] || t["return"] === e) return null;
                    t = t["return"]
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        return null
    }

    function Te(e) {
        var t = e.targetInst;
        do {
            if (!t) {
                e.ancestors.push(t);
                break
            }
            var n;
            for (n = t; n["return"];) n = n["return"];
            if (n = 3 !== n.tag ? null : n.stateNode.containerInfo, !n) break;
            e.ancestors.push(t), t = k(n)
        } while (t);
        for (n = 0; n < e.ancestors.length; n++) t = e.ancestors[n], Vr(e.topLevelType, t, e.nativeEvent, te(e.nativeEvent))
    }

    function Ie(e) {
        Gr = !!e
    }

    function Le(e, t, n) {
        return n ? Cn.listen(n, t, Pe.bind(null, e)) : null
    }

    function xe(e, t, n) {
        return n ? Cn.capture(n, t, Pe.bind(null, e)) : null
    }

    function Pe(e, t) {
        if (Gr) {
            var n = te(t);
            if (n = k(n), null === n || "number" != typeof n.tag || 2 === Oe(n) || (n = null), zr.length) {
                var r = zr.pop();
                r.topLevelType = e, r.nativeEvent = t, r.targetInst = n, e = r
            } else e = {
                topLevelType: e,
                nativeEvent: t,
                targetInst: n,
                ancestors: []
            };
            try {
                J(Te, e)
            } finally {
                e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > zr.length && zr.push(e)
            }
        }
    }

    function Me(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n
    }

    function Ae(e) {
        if (Kr[e]) return Kr[e];
        if (!qr[e]) return e;
        var t, n = qr[e];
        for (t in n)
            if (n.hasOwnProperty(t) && t in Qr) return Kr[e] = n[t];
        return ""
    }

    function Ne(e) {
        return Object.prototype.hasOwnProperty.call(e, Zr) || (e[Zr] = Xr++, $r[e[Zr]] = {}), $r[e[Zr]]
    }

    function De(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function Re(e, t) {
        var n = De(e);
        e = 0;
        for (var r; n;) {
            if (3 === n.nodeType) {
                if (r = e + n.textContent.length, t >= e && r >= t) return {
                    node: n,
                    offset: t - e
                };
                e = r
            }
            e: {
                for (; n;) {
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e
                    }
                    n = n.parentNode
                }
                n = void 0
            }
            n = De(n)
        }
    }

    function Fe(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable)
    }

    function Be(e, t) {
        if (ii || null == ti || ti !== kn()) return null;
        var n = ti;
        return "selectionStart" in n && Fe(n) ? n = {
            start: n.selectionStart,
            end: n.selectionEnd
        } : window.getSelection ? (n = window.getSelection(), n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset
        }) : n = void 0, ri && En(ri, n) ? null : (ri = n, e = B.getPooled(ei.select, ni, e, t), e.type = "select", e.target = ti, A(e), e)
    }

    function He(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function Ue(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function ze(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function Ge(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, 0 === e && 13 === t && (e = 13)) : e = t, e >= 32 || 13 === e ? e : 0
    }

    function Ve(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function We(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function qe(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function Ke(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function Qe(e, t, n, r) {
        return B.call(this, e, t, n, r)
    }

    function Ye(e) {
        0 > fi || (e.current = di[fi], di[fi] = null, fi--)
    }

    function $e(e, t) {
        fi++, di[fi] = e.current, e.current = t
    }

    function Xe(e) {
        return Je(e) ? gi : pi.current
    }

    function Ze(e, t) {
        var n = e.type.contextTypes;
        if (!n) return Tn;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
        var i, a = {};
        for (i in n) a[i] = t[i];
        return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a
    }

    function Je(e) {
        return 2 === e.tag && null != e.type.childContextTypes
    }

    function et(e) {
        Je(e) && (Ye(mi, e), Ye(pi, e))
    }

    function tt(e, t, n) {
        null != pi.cursor ? r("168") : void 0, $e(pi, t, e), $e(mi, n, e)
    }

    function nt(e, t) {
        var n = e.stateNode,
            i = e.type.childContextTypes;
        if ("function" != typeof n.getChildContext) return t;
        n = n.getChildContext();
        for (var a in n) a in i ? void 0 : r("108", we(e) || "Unknown", a);
        return wn({}, t, n)
    }

    function rt(e) {
        if (!Je(e)) return !1;
        var t = e.stateNode;
        return t = t && t.__reactInternalMemoizedMergedChildContext || Tn, gi = pi.current, $e(pi, t, e), $e(mi, mi.current, e), !0
    }

    function it(e, t) {
        var n = e.stateNode;
        if (n ? void 0 : r("169"), t) {
            var i = nt(e, gi);
            n.__reactInternalMemoizedMergedChildContext = i, Ye(mi, e), Ye(pi, e), $e(pi, i, e)
        } else Ye(mi, e);
        $e(mi, t, e)
    }

    function at(e, t, n) {
        this.tag = e, this.key = t, this.stateNode = this.type = null, this.sibling = this.child = this["return"] = null, this.index = 0, this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null, this.internalContextTag = n, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.expirationTime = 0, this.alternate = null
    }

    function ot(e, t, n) {
        var r = e.alternate;
        return null === r ? (r = new at(e.tag, e.key, e.internalContextTag), r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.expirationTime = n, r.pendingProps = t, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
    }

    function st(e, t, n) {
        var i = void 0,
            a = e.type,
            o = e.key;
        return "function" == typeof a ? (i = a.prototype && a.prototype.isReactComponent ? new at(2, o, t) : new at(0, o, t), i.type = a, i.pendingProps = e.props) : "string" == typeof a ? (i = new at(5, o, t), i.type = a, i.pendingProps = e.props) : "object" == typeof a && null !== a && "number" == typeof a.tag ? (i = a, i.pendingProps = e.props) : r("130", null == a ? a : typeof a, ""), i.expirationTime = n, i
    }

    function ct(e, t, n, r) {
        return t = new at(10, r, t), t.pendingProps = e, t.expirationTime = n, t
    }

    function ut(e, t, n) {
        return t = new at(6, null, t), t.pendingProps = e, t.expirationTime = n, t
    }

    function lt(e, t, n) {
        return t = new at(7, e.key, t), t.type = e.handler, t.pendingProps = e, t.expirationTime = n, t
    }

    function dt(e, t, n) {
        return e = new at(9, null, t), e.expirationTime = n, e
    }

    function ft(e, t, n) {
        return t = new at(4, e.key, t), t.pendingProps = e.children || [], t.expirationTime = n, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }

    function pt(e) {
        return function(t) {
            try {
                return e(t)
            } catch (n) {}
        }
    }

    function mt(e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
            var n = t.inject(e);
            hi = pt(function(e) {
                return t.onCommitFiberRoot(n, e)
            }), _i = pt(function(e) {
                return t.onCommitFiberUnmount(n, e)
            })
        } catch (r) {}
        return !0
    }

    function gt(e) {
        "function" == typeof hi && hi(e)
    }

    function ht(e) {
        "function" == typeof _i && _i(e)
    }

    function _t(e) {
        return {
            baseState: e,
            expirationTime: 0,
            first: null,
            last: null,
            callbackList: null,
            hasForceUpdate: !1,
            isInitialized: !1
        }
    }

    function vt(e, t) {
        null === e.last ? e.first = e.last = t : (e.last.next = t, e.last = t), (0 === e.expirationTime || e.expirationTime > t.expirationTime) && (e.expirationTime = t.expirationTime)
    }

    function bt(e, t) {
        var n = e.alternate,
            r = e.updateQueue;
        null === r && (r = e.updateQueue = _t(null)), null !== n ? (e = n.updateQueue, null === e && (e = n.updateQueue = _t(null))) : e = null, e = e !== r ? e : null, null === e ? vt(r, t) : null === r.last || null === e.last ? (vt(r, t), vt(e, t)) : (vt(r, t), e.last = t)
    }

    function yt(e, t, n, r) {
        return e = e.partialState, "function" == typeof e ? e.call(t, n, r) : e
    }

    function wt(e, t, n, r, i, a) {
        null !== e && e.updateQueue === n && (n = t.updateQueue = {
            baseState: n.baseState,
            expirationTime: n.expirationTime,
            first: n.first,
            last: n.last,
            isInitialized: n.isInitialized,
            callbackList: null,
            hasForceUpdate: !1
        }), n.expirationTime = 0, n.isInitialized ? e = n.baseState : (e = n.baseState = t.memoizedState, n.isInitialized = !0);
        for (var o = !0, s = n.first, c = !1; null !== s;) {
            var u = s.expirationTime;
            if (u > a) {
                var l = n.expirationTime;
                (0 === l || l > u) && (n.expirationTime = u), c || (c = !0, n.baseState = e)
            } else c || (n.first = s.next, null === n.first && (n.last = null)), s.isReplace ? (e = yt(s, r, e, i), o = !0) : (u = yt(s, r, e, i)) && (e = o ? wn({}, e, u) : wn(e, u), o = !1), s.isForced && (n.hasForceUpdate = !0), null !== s.callback && (u = n.callbackList, null === u && (u = n.callbackList = []), u.push(s));
            s = s.next
        }
        return null !== n.callbackList ? t.effectTag |= 32 : null !== n.first || n.hasForceUpdate || (t.updateQueue = null), c || (n.baseState = e), e
    }

    function Ot(e, t) {
        var n = e.callbackList;
        if (null !== n)
            for (e.callbackList = null, e = 0; e < n.length; e++) {
                var i = n[e],
                    a = i.callback;
                i.callback = null, "function" != typeof a ? r("191", a) : void 0, a.call(t)
            }
    }

    function Ct(e, t, n, i) {
        function a(e, t) {
            t.updater = o, e.stateNode = t, t._reactInternalFiber = e
        }
        var o = {
            isMounted: Ce,
            enqueueSetState: function(n, r, i) {
                n = n._reactInternalFiber, i = void 0 === i ? null : i;
                var a = t(n);
                bt(n, {
                    expirationTime: a,
                    partialState: r,
                    callback: i,
                    isReplace: !1,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), e(n, a)
            },
            enqueueReplaceState: function(n, r, i) {
                n = n._reactInternalFiber, i = void 0 === i ? null : i;
                var a = t(n);
                bt(n, {
                    expirationTime: a,
                    partialState: r,
                    callback: i,
                    isReplace: !0,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), e(n, a)
            },
            enqueueForceUpdate: function(n, r) {
                n = n._reactInternalFiber, r = void 0 === r ? null : r;
                var i = t(n);
                bt(n, {
                    expirationTime: i,
                    partialState: null,
                    callback: r,
                    isReplace: !1,
                    isForced: !0,
                    nextCallback: null,
                    next: null
                }), e(n, i)
            }
        };
        return {
            adoptClassInstance: a,
            constructClassInstance: function(e, t) {
                var n = e.type,
                    r = Xe(e),
                    i = 2 === e.tag && null != e.type.contextTypes,
                    o = i ? Ze(e, r) : Tn;
                return t = new n(t, o), a(e, t), i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t
            },
            mountClassInstance: function(e, t) {
                var n = e.alternate,
                    i = e.stateNode,
                    a = i.state || null,
                    s = e.pendingProps;
                s ? void 0 : r("158");
                var c = Xe(e);
                i.props = s, i.state = e.memoizedState = a, i.refs = Tn, i.context = Ze(e, c), null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent && (e.internalContextTag |= 1), "function" == typeof i.componentWillMount && (a = i.state, i.componentWillMount(), a !== i.state && o.enqueueReplaceState(i, i.state, null), a = e.updateQueue, null !== a && (i.state = wt(n, e, a, i, s, t))), "function" == typeof i.componentDidMount && (e.effectTag |= 4)
            },
            updateClassInstance: function(e, t, a) {
                var s = t.stateNode;
                s.props = t.memoizedProps, s.state = t.memoizedState;
                var c = t.memoizedProps,
                    u = t.pendingProps;
                u || (u = c, null == u ? r("159") : void 0);
                var l = s.context,
                    d = Xe(t);
                if (d = Ze(t, d), "function" != typeof s.componentWillReceiveProps || c === u && l === d || (l = s.state, s.componentWillReceiveProps(u, d), s.state !== l && o.enqueueReplaceState(s, s.state, null)), l = t.memoizedState, a = null !== t.updateQueue ? wt(e, t, t.updateQueue, s, u, a) : l, !(c !== u || l !== a || mi.current || null !== t.updateQueue && t.updateQueue.hasForceUpdate)) return "function" != typeof s.componentDidUpdate || c === e.memoizedProps && l === e.memoizedState || (t.effectTag |= 4), !1;
                var f = u;
                if (null === c || null !== t.updateQueue && t.updateQueue.hasForceUpdate) f = !0;
                else {
                    var p = t.stateNode,
                        m = t.type;
                    f = "function" == typeof p.shouldComponentUpdate ? p.shouldComponentUpdate(f, a, d) : m.prototype && m.prototype.isPureReactComponent ? !En(c, f) || !En(l, a) : !0
                }
                return f ? ("function" == typeof s.componentWillUpdate && s.componentWillUpdate(u, a, d), "function" == typeof s.componentDidUpdate && (t.effectTag |= 4)) : ("function" != typeof s.componentDidUpdate || c === e.memoizedProps && l === e.memoizedState || (t.effectTag |= 4), n(t, u), i(t, a)), s.props = u, s.state = a, s.context = d, f
            }
        }
    }

    function kt(e) {
        return null === e || "undefined" == typeof e ? null : (e = ki && e[ki] || e["@@iterator"], "function" == typeof e ? e : null)
    }

    function Et(e, t) {
        var n = t.ref;
        if (null !== n && "function" != typeof n) {
            if (t._owner) {
                t = t._owner;
                var i = void 0;
                t && (2 !== t.tag ? r("110") : void 0, i = t.stateNode), i ? void 0 : r("147", n);
                var a = "" + n;
                return null !== e && null !== e.ref && e.ref._stringRef === a ? e.ref : (e = function(e) {
                    var t = i.refs === Tn ? i.refs = {} : i.refs;
                    null === e ? delete t[a] : t[a] = e
                }, e._stringRef = a, e)
            }
            "string" != typeof n ? r("148") : void 0, t._owner ? void 0 : r("149", n)
        }
        return n
    }

    function jt(e, t) {
        "textarea" !== e.type && r("31", "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, "")
    }

    function St(e) {
        function t(t, n) {
            if (e) {
                var r = t.lastEffect;
                null !== r ? (r.nextEffect = n, t.lastEffect = n) : t.firstEffect = t.lastEffect = n, n.nextEffect = null, n.effectTag = 8
            }
        }

        function n(n, r) {
            if (!e) return null;
            for (; null !== r;) t(n, r), r = r.sibling;
            return null
        }

        function i(e, t) {
            for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
            return e
        }

        function a(e, t, n) {
            return e = ot(e, t, n), e.index = 0, e.sibling = null, e
        }

        function o(t, n, r) {
            return t.index = r, e ? (r = t.alternate, null !== r ? (r = r.index, n > r ? (t.effectTag = 2, n) : r) : (t.effectTag = 2, n)) : n
        }

        function s(t) {
            return e && null === t.alternate && (t.effectTag = 2), t
        }

        function c(e, t, n, r) {
            return null === t || 6 !== t.tag ? (t = ut(n, e.internalContextTag, r), t["return"] = e, t) : (t = a(t, n, r), t["return"] = e, t)
        }

        function u(e, t, n, r) {
            return null !== t && t.type === n.type ? (r = a(t, n.props, r), r.ref = Et(t, n), r["return"] = e, r) : (r = st(n, e.internalContextTag, r), r.ref = Et(t, n), r["return"] = e, r)
        }

        function l(e, t, n, r) {
            return null === t || 7 !== t.tag ? (t = lt(n, e.internalContextTag, r), t["return"] = e, t) : (t = a(t, n, r), t["return"] = e, t)
        }

        function d(e, t, n, r) {
            return null === t || 9 !== t.tag ? (t = dt(n, e.internalContextTag, r), t.type = n.value, t["return"] = e, t) : (t = a(t, null, r), t.type = n.value, t["return"] = e, t)
        }

        function f(e, t, n, r) {
            return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ft(n, e.internalContextTag, r), t["return"] = e, t) : (t = a(t, n.children || [], r), t["return"] = e, t)
        }

        function p(e, t, n, r, i) {
            return null === t || 10 !== t.tag ? (t = ct(n, e.internalContextTag, r, i), t["return"] = e, t) : (t = a(t, n, r), t["return"] = e, t)
        }

        function m(e, t, n) {
            if ("string" == typeof t || "number" == typeof t) return t = ut("" + t, e.internalContextTag, n), t["return"] = e, t;
            if ("object" == typeof t && null !== t) {
                switch (t.$$typeof) {
                    case bi:
                        return t.type === Ci ? (t = ct(t.props.children, e.internalContextTag, n, t.key), t["return"] = e, t) : (n = st(t, e.internalContextTag, n), n.ref = Et(null, t), n["return"] = e, n);
                    case yi:
                        return t = lt(t, e.internalContextTag, n), t["return"] = e, t;
                    case wi:
                        return n = dt(t, e.internalContextTag, n), n.type = t.value, n["return"] = e, n;
                    case Oi:
                        return t = ft(t, e.internalContextTag, n), t["return"] = e, t
                }
                if (Ei(t) || kt(t)) return t = ct(t, e.internalContextTag, n, null), t["return"] = e, t;
                jt(e, t)
            }
            return null
        }

        function g(e, t, n, r) {
            var i = null !== t ? t.key : null;
            if ("string" == typeof n || "number" == typeof n) return null !== i ? null : c(e, t, "" + n, r);
            if ("object" == typeof n && null !== n) {
                switch (n.$$typeof) {
                    case bi:
                        return n.key === i ? n.type === Ci ? p(e, t, n.props.children, r, i) : u(e, t, n, r) : null;
                    case yi:
                        return n.key === i ? l(e, t, n, r) : null;
                    case wi:
                        return null === i ? d(e, t, n, r) : null;
                    case Oi:
                        return n.key === i ? f(e, t, n, r) : null
                }
                if (Ei(n) || kt(n)) return null !== i ? null : p(e, t, n, r, null);
                jt(e, n)
            }
            return null
        }

        function h(e, t, n, r, i) {
            if ("string" == typeof r || "number" == typeof r) return e = e.get(n) || null, c(t, e, "" + r, i);
            if ("object" == typeof r && null !== r) {
                switch (r.$$typeof) {
                    case bi:
                        return e = e.get(null === r.key ? n : r.key) || null, r.type === Ci ? p(t, e, r.props.children, i, r.key) : u(t, e, r, i);
                    case yi:
                        return e = e.get(null === r.key ? n : r.key) || null, l(t, e, r, i);
                    case wi:
                        return e = e.get(n) || null, d(t, e, r, i);
                    case Oi:
                        return e = e.get(null === r.key ? n : r.key) || null, f(t, e, r, i)
                }
                if (Ei(r) || kt(r)) return e = e.get(n) || null, p(t, e, r, i, null);
                jt(t, r)
            }
            return null
        }

        function _(r, a, s, c) {
            for (var u = null, l = null, d = a, f = a = 0, p = null; null !== d && f < s.length; f++) {
                d.index > f ? (p = d, d = null) : p = d.sibling;
                var _ = g(r, d, s[f], c);
                if (null === _) {
                    null === d && (d = p);
                    break
                }
                e && d && null === _.alternate && t(r, d), a = o(_, a, f), null === l ? u = _ : l.sibling = _, l = _, d = p
            }
            if (f === s.length) return n(r, d), u;
            if (null === d) {
                for (; f < s.length; f++)(d = m(r, s[f], c)) && (a = o(d, a, f), null === l ? u = d : l.sibling = d, l = d);
                return u
            }
            for (d = i(r, d); f < s.length; f++)(p = h(d, r, f, s[f], c)) && (e && null !== p.alternate && d["delete"](null === p.key ? f : p.key), a = o(p, a, f), null === l ? u = p : l.sibling = p, l = p);
            return e && d.forEach(function(e) {
                return t(r, e)
            }), u
        }

        function v(a, s, c, u) {
            var l = kt(c);
            "function" != typeof l ? r("150") : void 0, c = l.call(c), null == c ? r("151") : void 0;
            for (var d = l = null, f = s, p = s = 0, _ = null, v = c.next(); null !== f && !v.done; p++, v = c.next()) {
                f.index > p ? (_ = f, f = null) : _ = f.sibling;
                var b = g(a, f, v.value, u);
                if (null === b) {
                    f || (f = _);
                    break
                }
                e && f && null === b.alternate && t(a, f), s = o(b, s, p), null === d ? l = b : d.sibling = b, d = b, f = _
            }
            if (v.done) return n(a, f), l;
            if (null === f) {
                for (; !v.done; p++, v = c.next()) v = m(a, v.value, u), null !== v && (s = o(v, s, p), null === d ? l = v : d.sibling = v, d = v);
                return l
            }
            for (f = i(a, f); !v.done; p++, v = c.next()) v = h(f, a, p, v.value, u), null !== v && (e && null !== v.alternate && f["delete"](null === v.key ? p : v.key), s = o(v, s, p), null === d ? l = v : d.sibling = v, d = v);
            return e && f.forEach(function(e) {
                return t(a, e)
            }), l
        }
        return function(e, i, o, c) {
            "object" == typeof o && null !== o && o.type === Ci && null === o.key && (o = o.props.children);
            var u = "object" == typeof o && null !== o;
            if (u) switch (o.$$typeof) {
                case bi:
                    e: {
                        var l = o.key;
                        for (u = i; null !== u;) {
                            if (u.key === l) {
                                if (10 === u.tag ? o.type === Ci : u.type === o.type) {
                                    n(e, u.sibling), i = a(u, o.type === Ci ? o.props.children : o.props, c), i.ref = Et(u, o), i["return"] = e, e = i;
                                    break e
                                }
                                n(e, u);
                                break
                            }
                            t(e, u), u = u.sibling
                        }
                        o.type === Ci ? (i = ct(o.props.children, e.internalContextTag, c, o.key), i["return"] = e, e = i) : (c = st(o, e.internalContextTag, c), c.ref = Et(i, o), c["return"] = e, e = c)
                    }
                    return s(e);
                case yi:
                    e: {
                        for (u = o.key; null !== i;) {
                            if (i.key === u) {
                                if (7 === i.tag) {
                                    n(e, i.sibling), i = a(i, o, c), i["return"] = e, e = i;
                                    break e
                                }
                                n(e, i);
                                break
                            }
                            t(e, i), i = i.sibling
                        }
                        i = lt(o, e.internalContextTag, c),
                        i["return"] = e,
                        e = i
                    }
                    return s(e);
                case wi:
                    e: {
                        if (null !== i) {
                            if (9 === i.tag) {
                                n(e, i.sibling), i = a(i, null, c), i.type = o.value, i["return"] = e, e = i;
                                break e
                            }
                            n(e, i)
                        }
                        i = dt(o, e.internalContextTag, c),
                        i.type = o.value,
                        i["return"] = e,
                        e = i
                    }
                    return s(e);
                case Oi:
                    e: {
                        for (u = o.key; null !== i;) {
                            if (i.key === u) {
                                if (4 === i.tag && i.stateNode.containerInfo === o.containerInfo && i.stateNode.implementation === o.implementation) {
                                    n(e, i.sibling), i = a(i, o.children || [], c), i["return"] = e, e = i;
                                    break e
                                }
                                n(e, i);
                                break
                            }
                            t(e, i), i = i.sibling
                        }
                        i = ft(o, e.internalContextTag, c),
                        i["return"] = e,
                        e = i
                    }
                    return s(e)
            }
            if ("string" == typeof o || "number" == typeof o) return o = "" + o, null !== i && 6 === i.tag ? (n(e, i.sibling), i = a(i, o, c)) : (n(e, i), i = ut(o, e.internalContextTag, c)), i["return"] = e, e = i, s(e);
            if (Ei(o)) return _(e, i, o, c);
            if (kt(o)) return v(e, i, o, c);
            if (u && jt(e, o), "undefined" == typeof o) switch (e.tag) {
                case 2:
                case 1:
                    c = e.type, r("152", c.displayName || c.name || "Component")
            }
            return n(e, i)
        }
    }

    function Tt(e, t, n, i, a) {
        function o(e, t, n) {
            var r = t.expirationTime;
            t.child = null === e ? Si(t, null, n, r) : ji(t, e.child, n, r);
        }

        function s(e, t) {
            var n = t.ref;
            null === n || e && e.ref === n || (t.effectTag |= 128)
        }

        function c(e, t, n, r) {
            if (s(e, t), !n) return r && it(t, !1), l(e, t);
            n = t.stateNode, Ur.current = t;
            var i = n.render();
            return t.effectTag |= 1, o(e, t, i), t.memoizedState = n.state, t.memoizedProps = n.props, r && it(t, !0), t.child
        }

        function u(e) {
            var t = e.stateNode;
            t.pendingContext ? tt(e, t.pendingContext, t.pendingContext !== t.context) : t.context && tt(e, t.context, !1), h(e, t.containerInfo)
        }

        function l(e, t) {
            if (null !== e && t.child !== e.child ? r("153") : void 0, null !== t.child) {
                e = t.child;
                var n = ot(e, e.pendingProps, e.expirationTime);
                for (t.child = n, n["return"] = t; null !== e.sibling;) e = e.sibling, n = n.sibling = ot(e, e.pendingProps, e.expirationTime), n["return"] = t;
                n.sibling = null
            }
            return t.child
        }

        function d(e, t) {
            switch (t.tag) {
                case 3:
                    u(t);
                    break;
                case 2:
                    rt(t);
                    break;
                case 4:
                    h(t, t.stateNode.containerInfo)
            }
            return null
        }
        var f = e.shouldSetTextContent,
            p = e.useSyncScheduling,
            m = e.shouldDeprioritizeSubtree,
            g = t.pushHostContext,
            h = t.pushHostContainer,
            _ = n.enterHydrationState,
            v = n.resetHydrationState,
            b = n.tryToClaimNextHydratableInstance;
        e = Ct(i, a, function(e, t) {
            e.memoizedProps = t
        }, function(e, t) {
            e.memoizedState = t
        });
        var y = e.adoptClassInstance,
            w = e.constructClassInstance,
            O = e.mountClassInstance,
            C = e.updateClassInstance;
        return {
            beginWork: function(e, t, n) {
                if (0 === t.expirationTime || t.expirationTime > n) return d(e, t);
                switch (t.tag) {
                    case 0:
                        null !== e ? r("155") : void 0;
                        var i = t.type,
                            a = t.pendingProps,
                            k = Xe(t);
                        return k = Ze(t, k), i = i(a, k), t.effectTag |= 1, "object" == typeof i && null !== i && "function" == typeof i.render ? (t.tag = 2, a = rt(t), y(t, i), O(t, n), t = c(e, t, !0, a)) : (t.tag = 1, o(e, t, i), t.memoizedProps = a, t = t.child), t;
                    case 1:
                        e: {
                            if (a = t.type, n = t.pendingProps, i = t.memoizedProps, mi.current) null === n && (n = i);
                            else if (null === n || i === n) {
                                t = l(e, t);
                                break e
                            }
                            i = Xe(t),
                            i = Ze(t, i),
                            a = a(n, i),
                            t.effectTag |= 1,
                            o(e, t, a),
                            t.memoizedProps = n,
                            t = t.child
                        }
                        return t;
                    case 2:
                        return a = rt(t), i = void 0, null === e ? t.stateNode ? r("153") : (w(t, t.pendingProps), O(t, n), i = !0) : i = C(e, t, n), c(e, t, i, a);
                    case 3:
                        return u(t), a = t.updateQueue, null !== a ? (i = t.memoizedState, a = wt(e, t, a, null, null, n), i === a ? (v(), t = l(e, t)) : (i = a.element, k = t.stateNode, (null === e || null === e.child) && k.hydrate && _(t) ? (t.effectTag |= 2, t.child = Si(t, null, i, n)) : (v(), o(e, t, i)), t.memoizedState = a, t = t.child)) : (v(), t = l(e, t)), t;
                    case 5:
                        g(t), null === e && b(t), a = t.type;
                        var E = t.memoizedProps;
                        return i = t.pendingProps, null === i && (i = E, null === i ? r("154") : void 0), k = null !== e ? e.memoizedProps : null, mi.current || null !== i && E !== i ? (E = i.children, f(a, i) ? E = null : k && f(a, k) && (t.effectTag |= 16), s(e, t), 2147483647 !== n && !p && m(a, i) ? (t.expirationTime = 2147483647, t = null) : (o(e, t, E), t.memoizedProps = i, t = t.child)) : t = l(e, t), t;
                    case 6:
                        return null === e && b(t), e = t.pendingProps, null === e && (e = t.memoizedProps), t.memoizedProps = e, null;
                    case 8:
                        t.tag = 7;
                    case 7:
                        return a = t.pendingProps, mi.current ? null === a && (a = e && e.memoizedProps, null === a ? r("154") : void 0) : (null === a || t.memoizedProps === a) && (a = t.memoizedProps), i = a.children, t.stateNode = null === e ? Si(t, t.stateNode, i, n) : ji(t, t.stateNode, i, n), t.memoizedProps = a, t.stateNode;
                    case 9:
                        return null;
                    case 4:
                        e: {
                            if (h(t, t.stateNode.containerInfo), a = t.pendingProps, mi.current) null === a && (a = e && e.memoizedProps, null == a ? r("154") : void 0);
                            else if (null === a || t.memoizedProps === a) {
                                t = l(e, t);
                                break e
                            }
                            null === e ? t.child = ji(t, null, a, n) : o(e, t, a),
                            t.memoizedProps = a,
                            t = t.child
                        }
                        return t;
                    case 10:
                        e: {
                            if (n = t.pendingProps, mi.current) null === n && (n = t.memoizedProps);
                            else if (null === n || t.memoizedProps === n) {
                                t = l(e, t);
                                break e
                            }
                            o(e, t, n),
                            t.memoizedProps = n,
                            t = t.child
                        }
                        return t;
                    default:
                        r("156")
                }
            },
            beginFailedWork: function(e, t, n) {
                switch (t.tag) {
                    case 2:
                        rt(t);
                        break;
                    case 3:
                        u(t);
                        break;
                    default:
                        r("157")
                }
                return t.effectTag |= 64, null === e ? t.child = null : t.child !== e.child && (t.child = e.child), 0 === t.expirationTime || t.expirationTime > n ? d(e, t) : (t.firstEffect = null, t.lastEffect = null, t.child = null === e ? Si(t, null, null, n) : ji(t, e.child, null, n), 2 === t.tag && (e = t.stateNode, t.memoizedProps = e.props, t.memoizedState = e.state), t.child)
            }
        }
    }

    function It(e, t, n) {
        function i(e) {
            e.effectTag |= 4
        }
        var a = e.createInstance,
            o = e.createTextInstance,
            s = e.appendInitialChild,
            c = e.finalizeInitialChildren,
            u = e.prepareUpdate,
            l = e.persistence,
            d = t.getRootHostContainer,
            f = t.popHostContext,
            p = t.getHostContext,
            m = t.popHostContainer,
            g = n.prepareToHydrateHostInstance,
            h = n.prepareToHydrateHostTextInstance,
            _ = n.popHydrationState,
            v = void 0,
            b = void 0,
            y = void 0;
        return e.mutation ? (v = function() {}, b = function(e, t, n) {
            (t.updateQueue = n) && i(t)
        }, y = function(e, t, n, r) {
            n !== r && i(t)
        }) : r(l ? "235" : "236"), {
            completeWork: function(e, t, n) {
                var l = t.pendingProps;
                switch (null === l ? l = t.memoizedProps : (2147483647 !== t.expirationTime || 2147483647 === n) && (t.pendingProps = null), t.tag) {
                    case 1:
                        return null;
                    case 2:
                        return et(t), null;
                    case 3:
                        return m(t), Ye(mi, t), Ye(pi, t), l = t.stateNode, l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (null === e || null === e.child) && (_(t), t.effectTag &= -3), v(t), null;
                    case 5:
                        f(t), n = d();
                        var w = t.type;
                        if (null !== e && null != t.stateNode) {
                            var O = e.memoizedProps,
                                C = t.stateNode,
                                k = p();
                            C = u(C, w, O, l, n, k), b(e, t, C, w, O, l, n), e.ref !== t.ref && (t.effectTag |= 128)
                        } else {
                            if (!l) return null === t.stateNode ? r("166") : void 0, null;
                            if (e = p(), _(t)) g(t, n, e) && i(t);
                            else {
                                e = a(w, l, n, e, t);
                                e: for (O = t.child; null !== O;) {
                                    if (5 === O.tag || 6 === O.tag) s(e, O.stateNode);
                                    else if (4 !== O.tag && null !== O.child) {
                                        O.child["return"] = O, O = O.child;
                                        continue
                                    }
                                    if (O === t) break;
                                    for (; null === O.sibling;) {
                                        if (null === O["return"] || O["return"] === t) break e;
                                        O = O["return"]
                                    }
                                    O.sibling["return"] = O["return"], O = O.sibling
                                }
                                c(e, w, l, n) && i(t), t.stateNode = e
                            }
                            null !== t.ref && (t.effectTag |= 128)
                        }
                        return null;
                    case 6:
                        if (e && null != t.stateNode) y(e, t, e.memoizedProps, l);
                        else {
                            if ("string" != typeof l) return null === t.stateNode ? r("166") : void 0, null;
                            e = d(), n = p(), _(t) ? h(t) && i(t) : t.stateNode = o(l, e, n, t)
                        }
                        return null;
                    case 7:
                        (l = t.memoizedProps) ? void 0: r("165"), t.tag = 8, w = [];
                        e: for ((O = t.stateNode) && (O["return"] = t); null !== O;) {
                            if (5 === O.tag || 6 === O.tag || 4 === O.tag) r("247");
                            else if (9 === O.tag) w.push(O.type);
                            else if (null !== O.child) {
                                O.child["return"] = O, O = O.child;
                                continue
                            }
                            for (; null === O.sibling;) {
                                if (null === O["return"] || O["return"] === t) break e;
                                O = O["return"]
                            }
                            O.sibling["return"] = O["return"], O = O.sibling
                        }
                        return O = l.handler, l = O(l.props, w), t.child = ji(t, null !== e ? e.child : null, l, n), t.child;
                    case 8:
                        return t.tag = 7, null;
                    case 9:
                        return null;
                    case 10:
                        return null;
                    case 4:
                        return m(t), v(t), null;
                    case 0:
                        r("167");
                    default:
                        r("156")
                }
            }
        }
    }

    function Lt(e, t) {
        function n(e) {
            var n = e.ref;
            if (null !== n) try {
                n(null)
            } catch (r) {
                t(e, r)
            }
        }

        function i(e) {
            switch ("function" == typeof ht && ht(e), e.tag) {
                case 2:
                    n(e);
                    var r = e.stateNode;
                    if ("function" == typeof r.componentWillUnmount) try {
                        r.props = e.memoizedProps, r.state = e.memoizedState, r.componentWillUnmount()
                    } catch (i) {
                        t(e, i)
                    }
                    break;
                case 5:
                    n(e);
                    break;
                case 7:
                    a(e.stateNode);
                    break;
                case 4:
                    u && s(e)
            }
        }

        function a(e) {
            for (var t = e;;)
                if (i(t), null === t.child || u && 4 === t.tag) {
                    if (t === e) break;
                    for (; null === t.sibling;) {
                        if (null === t["return"] || t["return"] === e) return;
                        t = t["return"]
                    }
                    t.sibling["return"] = t["return"], t = t.sibling
                } else t.child["return"] = t, t = t.child
        }

        function o(e) {
            return 5 === e.tag || 3 === e.tag || 4 === e.tag
        }

        function s(e) {
            for (var t = e, n = !1, o = void 0, s = void 0;;) {
                if (!n) {
                    n = t["return"];
                    e: for (;;) {
                        switch (null === n ? r("160") : void 0, n.tag) {
                            case 5:
                                o = n.stateNode, s = !1;
                                break e;
                            case 3:
                                o = n.stateNode.containerInfo, s = !0;
                                break e;
                            case 4:
                                o = n.stateNode.containerInfo, s = !0;
                                break e
                        }
                        n = n["return"]
                    }
                    n = !0
                }
                if (5 === t.tag || 6 === t.tag) a(t), s ? b(o, t.stateNode) : v(o, t.stateNode);
                else if (4 === t.tag ? o = t.stateNode.containerInfo : i(t), null !== t.child) {
                    t.child["return"] = t, t = t.child;
                    continue
                }
                if (t === e) break;
                for (; null === t.sibling;) {
                    if (null === t["return"] || t["return"] === e) return;
                    t = t["return"], 4 === t.tag && (n = !1)
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        var c = e.getPublicInstance,
            u = e.mutation;
        e = e.persistence, u || r(e ? "235" : "236");
        var l = u.commitMount,
            d = u.commitUpdate,
            f = u.resetTextContent,
            p = u.commitTextUpdate,
            m = u.appendChild,
            g = u.appendChildToContainer,
            h = u.insertBefore,
            _ = u.insertInContainerBefore,
            v = u.removeChild,
            b = u.removeChildFromContainer;
        return {
            commitResetTextContent: function(e) {
                f(e.stateNode)
            },
            commitPlacement: function(e) {
                e: {
                    for (var t = e["return"]; null !== t;) {
                        if (o(t)) {
                            var n = t;
                            break e
                        }
                        t = t["return"]
                    }
                    r("160"),
                    n = void 0
                }
                var i = t = void 0;
                switch (n.tag) {
                    case 5:
                        t = n.stateNode, i = !1;
                        break;
                    case 3:
                        t = n.stateNode.containerInfo, i = !0;
                        break;
                    case 4:
                        t = n.stateNode.containerInfo, i = !0;
                        break;
                    default:
                        r("161")
                }
                16 & n.effectTag && (f(t), n.effectTag &= -17);e: t: for (n = e;;) {
                    for (; null === n.sibling;) {
                        if (null === n["return"] || o(n["return"])) {
                            n = null;
                            break e
                        }
                        n = n["return"]
                    }
                    for (n.sibling["return"] = n["return"], n = n.sibling; 5 !== n.tag && 6 !== n.tag;) {
                        if (2 & n.effectTag) continue t;
                        if (null === n.child || 4 === n.tag) continue t;
                        n.child["return"] = n, n = n.child
                    }
                    if (!(2 & n.effectTag)) {
                        n = n.stateNode;
                        break e
                    }
                }
                for (var a = e;;) {
                    if (5 === a.tag || 6 === a.tag) n ? i ? _(t, a.stateNode, n) : h(t, a.stateNode, n) : i ? g(t, a.stateNode) : m(t, a.stateNode);
                    else if (4 !== a.tag && null !== a.child) {
                        a.child["return"] = a, a = a.child;
                        continue
                    }
                    if (a === e) break;
                    for (; null === a.sibling;) {
                        if (null === a["return"] || a["return"] === e) return;
                        a = a["return"]
                    }
                    a.sibling["return"] = a["return"], a = a.sibling
                }
            },
            commitDeletion: function(e) {
                s(e), e["return"] = null, e.child = null, e.alternate && (e.alternate.child = null, e.alternate["return"] = null)
            },
            commitWork: function(e, t) {
                switch (t.tag) {
                    case 2:
                        break;
                    case 5:
                        var n = t.stateNode;
                        if (null != n) {
                            var i = t.memoizedProps;
                            e = null !== e ? e.memoizedProps : i;
                            var a = t.type,
                                o = t.updateQueue;
                            t.updateQueue = null, null !== o && d(n, o, a, e, i, t)
                        }
                        break;
                    case 6:
                        null === t.stateNode ? r("162") : void 0, n = t.memoizedProps, p(t.stateNode, null !== e ? e.memoizedProps : n, n);
                        break;
                    case 3:
                        break;
                    default:
                        r("163")
                }
            },
            commitLifeCycles: function(e, t) {
                switch (t.tag) {
                    case 2:
                        var n = t.stateNode;
                        if (4 & t.effectTag)
                            if (null === e) n.props = t.memoizedProps, n.state = t.memoizedState, n.componentDidMount();
                            else {
                                var i = e.memoizedProps;
                                e = e.memoizedState, n.props = t.memoizedProps, n.state = t.memoizedState, n.componentDidUpdate(i, e)
                            }
                        t = t.updateQueue, null !== t && Ot(t, n);
                        break;
                    case 3:
                        n = t.updateQueue, null !== n && Ot(n, null !== t.child ? t.child.stateNode : null);
                        break;
                    case 5:
                        n = t.stateNode, null === e && 4 & t.effectTag && l(n, t.type, t.memoizedProps, t);
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    default:
                        r("163")
                }
            },
            commitAttachRef: function(e) {
                var t = e.ref;
                if (null !== t) {
                    var n = e.stateNode;
                    switch (e.tag) {
                        case 5:
                            t(c(n));
                            break;
                        default:
                            t(n)
                    }
                }
            },
            commitDetachRef: function(e) {
                e = e.ref, null !== e && e(null)
            }
        }
    }

    function xt(e) {
        function t(e) {
            return e === Ti ? r("174") : void 0, e
        }
        var n = e.getChildHostContext,
            i = e.getRootHostContext,
            a = {
                current: Ti
            },
            o = {
                current: Ti
            },
            s = {
                current: Ti
            };
        return {
            getHostContext: function() {
                return t(a.current)
            },
            getRootHostContainer: function() {
                return t(s.current)
            },
            popHostContainer: function(e) {
                Ye(a, e), Ye(o, e), Ye(s, e)
            },
            popHostContext: function(e) {
                o.current === e && (Ye(a, e), Ye(o, e))
            },
            pushHostContainer: function(e, t) {
                $e(s, t, e), t = i(t), $e(o, e, e), $e(a, t, e)
            },
            pushHostContext: function(e) {
                var r = t(s.current),
                    i = t(a.current);
                r = n(i, e.type, r), i !== r && ($e(o, e, e), $e(a, r, e))
            },
            resetHostContainer: function() {
                a.current = Ti, s.current = Ti
            }
        }
    }

    function Pt(e) {
        function t(e, t) {
            var n = new at(5, null, 0);
            n.type = "DELETED", n.stateNode = t, n["return"] = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
        }

        function n(e, t) {
            switch (e.tag) {
                case 5:
                    return t = o(t, e.type, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                case 6:
                    return t = s(t, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                default:
                    return !1
            }
        }

        function i(e) {
            for (e = e["return"]; null !== e && 5 !== e.tag && 3 !== e.tag;) e = e["return"];
            f = e
        }
        var a = e.shouldSetTextContent;
        if (e = e.hydration, !e) return {
            enterHydrationState: function() {
                return !1
            },
            resetHydrationState: function() {},
            tryToClaimNextHydratableInstance: function() {},
            prepareToHydrateHostInstance: function() {
                r("175")
            },
            prepareToHydrateHostTextInstance: function() {
                r("176")
            },
            popHydrationState: function() {
                return !1
            }
        };
        var o = e.canHydrateInstance,
            s = e.canHydrateTextInstance,
            c = e.getNextHydratableSibling,
            u = e.getFirstHydratableChild,
            l = e.hydrateInstance,
            d = e.hydrateTextInstance,
            f = null,
            p = null,
            m = !1;
        return {
            enterHydrationState: function(e) {
                return p = u(e.stateNode.containerInfo), f = e, m = !0
            },
            resetHydrationState: function() {
                p = f = null, m = !1
            },
            tryToClaimNextHydratableInstance: function(e) {
                if (m) {
                    var r = p;
                    if (r) {
                        if (!n(e, r)) {
                            if (r = c(r), !r || !n(e, r)) return e.effectTag |= 2, m = !1, void(f = e);
                            t(f, p)
                        }
                        f = e, p = u(r)
                    } else e.effectTag |= 2, m = !1, f = e
                }
            },
            prepareToHydrateHostInstance: function(e, t, n) {
                return t = l(e.stateNode, e.type, e.memoizedProps, t, n, e), e.updateQueue = t, null !== t ? !0 : !1
            },
            prepareToHydrateHostTextInstance: function(e) {
                return d(e.stateNode, e.memoizedProps, e)
            },
            popHydrationState: function(e) {
                if (e !== f) return !1;
                if (!m) return i(e), m = !0, !1;
                var n = e.type;
                if (5 !== e.tag || "head" !== n && "body" !== n && !a(n, e.memoizedProps))
                    for (n = p; n;) t(e, n), n = c(n);
                return i(e), p = f ? c(e.stateNode) : null, !0
            }
        }
    }

    function Mt(e) {
        function t(e) {
            ae = Y = !0;
            var t = e.stateNode;
            if (t.current === e ? r("177") : void 0, t.isReadyForCommit = !1, Ur.current = null, 1 < e.effectTag)
                if (null !== e.lastEffect) {
                    e.lastEffect.nextEffect = e;
                    var n = e.firstEffect
                } else n = e;
            else n = e.firstEffect;
            for (V(), J = n; null !== J;) {
                var i = !1,
                    a = void 0;
                try {
                    for (; null !== J;) {
                        var o = J.effectTag;
                        if (16 & o && M(J), 128 & o) {
                            var s = J.alternate;
                            null !== s && B(s)
                        }
                        switch (-242 & o) {
                            case 2:
                                A(J), J.effectTag &= -3;
                                break;
                            case 6:
                                A(J), J.effectTag &= -3, D(J.alternate, J);
                                break;
                            case 4:
                                D(J.alternate, J);
                                break;
                            case 8:
                                oe = !0, N(J), oe = !1
                        }
                        J = J.nextEffect
                    }
                } catch (u) {
                    i = !0, a = u
                }
                i && (null === J ? r("178") : void 0, c(J, a), null !== J && (J = J.nextEffect))
            }
            for (W(), t.current = e, J = n; null !== J;) {
                n = !1, i = void 0;
                try {
                    for (; null !== J;) {
                        var l = J.effectTag;
                        if (36 & l && R(J.alternate, J), 128 & l && F(J), 64 & l) switch (a = J, o = void 0, null !== ee && (o = ee.get(a), ee["delete"](a), null == o && null !== a.alternate && (a = a.alternate, o = ee.get(a), ee["delete"](a))), null == o ? r("184") : void 0, a.tag) {
                            case 2:
                                a.stateNode.componentDidCatch(o.error, {
                                    componentStack: o.componentStack
                                });
                                break;
                            case 3:
                                null === re && (re = o.error);
                                break;
                            default:
                                r("157")
                        }
                        var d = J.nextEffect;
                        J.nextEffect = null, J = d
                    }
                } catch (u) {
                    n = !0, i = u
                }
                n && (null === J ? r("178") : void 0, c(J, i), null !== J && (J = J.nextEffect))
            }
            return Y = ae = !1, "function" == typeof gt && gt(e.stateNode), ne && (ne.forEach(g), ne = null), null !== re && (e = re, re = null, C(e)), t = t.current.expirationTime, 0 === t && (te = ee = null), t
        }

        function n(e) {
            for (;;) {
                var t = P(e.alternate, e, Z),
                    n = e["return"],
                    r = e.sibling,
                    i = e;
                if (2147483647 === Z || 2147483647 !== i.expirationTime) {
                    if (2 !== i.tag && 3 !== i.tag) var a = 0;
                    else a = i.updateQueue, a = null === a ? 0 : a.expirationTime;
                    for (var o = i.child; null !== o;) 0 !== o.expirationTime && (0 === a || a > o.expirationTime) && (a = o.expirationTime), o = o.sibling;
                    i.expirationTime = a
                }
                if (null !== t) return t;
                if (null !== n && (null === n.firstEffect && (n.firstEffect = e.firstEffect), null !== e.lastEffect && (null !== n.lastEffect && (n.lastEffect.nextEffect = e.firstEffect), n.lastEffect = e.lastEffect), 1 < e.effectTag && (null !== n.lastEffect ? n.lastEffect.nextEffect = e : n.firstEffect = e, n.lastEffect = e)), null !== r) return r;
                if (null === n) {
                    e.stateNode.isReadyForCommit = !0;
                    break
                }
                e = n
            }
            return null
        }

        function i(e) {
            var t = L(e.alternate, e, Z);
            return null === t && (t = n(e)), Ur.current = null, t
        }

        function a(e) {
            var t = x(e.alternate, e, Z);
            return null === t && (t = n(e)), Ur.current = null, t
        }

        function o(e) {
            if (null !== ee) {
                if (!(0 === Z || Z > e))
                    if (K >= Z)
                        for (; null !== $;) $ = u($) ? a($) : i($);
                    else
                        for (; null !== $ && !O();) $ = u($) ? a($) : i($)
            } else if (!(0 === Z || Z > e))
                if (K >= Z)
                    for (; null !== $;) $ = i($);
                else
                    for (; null !== $ && !O();) $ = i($)
        }

        function s(e, t) {
            if (Y ? r("243") : void 0, Y = !0, e.isReadyForCommit = !1, e !== X || t !== Z || null === $) {
                for (; fi > -1;) di[fi] = null, fi--;
                gi = Tn, pi.current = Tn, mi.current = !1, T(), X = e, Z = t, $ = ot(X.current, null, t)
            }
            var n = !1,
                i = null;
            try {
                o(t)
            } catch (s) {
                n = !0, i = s
            }
            for (; n;) {
                if (ie) {
                    re = i;
                    break
                }
                var u = $;
                if (null === u) ie = !0;
                else {
                    var l = c(u, i);
                    if (null === l ? r("183") : void 0, !ie) {
                        try {
                            for (n = l, i = t, l = n; null !== u;) {
                                switch (u.tag) {
                                    case 2:
                                        et(u);
                                        break;
                                    case 5:
                                        S(u);
                                        break;
                                    case 3:
                                        j(u);
                                        break;
                                    case 4:
                                        j(u)
                                }
                                if (u === l || u.alternate === l) break;
                                u = u["return"]
                            }
                            $ = a(n), o(i)
                        } catch (s) {
                            n = !0, i = s;
                            continue
                        }
                        break
                    }
                }
            }
            return t = re, ie = Y = !1, re = null, null !== t && C(t), e.isReadyForCommit ? e.current.alternate : null
        }

        function c(e, t) {
            var n = Ur.current = null,
                r = !1,
                i = !1,
                a = null;
            if (3 === e.tag) n = e, l(e) && (ie = !0);
            else
                for (var o = e["return"]; null !== o && null === n;) {
                    if (2 === o.tag ? "function" == typeof o.stateNode.componentDidCatch && (r = !0, a = we(o), n = o, i = !0) : 3 === o.tag && (n = o), l(o)) {
                        if (oe || null !== ne && (ne.has(o) || null !== o.alternate && ne.has(o.alternate))) return null;
                        n = null, i = !1
                    }
                    o = o["return"]
                }
            if (null !== n) {
                null === te && (te = new Set), te.add(n);
                var s = "";
                o = e;
                do {
                    e: switch (o.tag) {
                        case 0:
                        case 1:
                        case 2:
                        case 5:
                            var c = o._debugOwner,
                                u = o._debugSource,
                                d = we(o),
                                f = null;
                            c && (f = we(c)), c = u, d = "\n    in " + (d || "Unknown") + (c ? " (at " + c.fileName.replace(/^.*[\\\/]/, "") + ":" + c.lineNumber + ")" : f ? " (created by " + f + ")" : "");
                            break e;
                        default:
                            d = ""
                    }
                    s += d,
                    o = o["return"]
                } while (o);
                o = s, e = we(e), null === ee && (ee = new Map), t = {
                    componentName: e,
                    componentStack: o,
                    error: t,
                    errorBoundary: r ? n.stateNode : null,
                    errorBoundaryFound: r,
                    errorBoundaryName: a,
                    willRetry: i
                }, ee.set(n, t);
                try {
                    var p = t.error;
                    p && p.suppressReactErrorLogging || console.error(p)
                } catch (m) {
                    m && m.suppressReactErrorLogging || console.error(m)
                }
                return ae ? (null === ne && (ne = new Set), ne.add(n)) : g(n), n
            }
            return null === re && (re = t), null
        }

        function u(e) {
            return null !== ee && (ee.has(e) || null !== e.alternate && ee.has(e.alternate))
        }

        function l(e) {
            return null !== te && (te.has(e) || null !== e.alternate && te.has(e.alternate))
        }

        function d() {
            return 20 * (((h() + 100) / 20 | 0) + 1)
        }

        function f(e) {
            return 0 !== Q ? Q : Y ? ae ? 1 : Z : !G || 1 & e.internalContextTag ? d() : 1
        }

        function p(e, t) {
            return m(e, t, !1)
        }

        function m(e, t) {
            for (; null !== e;) {
                if ((0 === e.expirationTime || e.expirationTime > t) && (e.expirationTime = t), null !== e.alternate && (0 === e.alternate.expirationTime || e.alternate.expirationTime > t) && (e.alternate.expirationTime = t), null === e["return"]) {
                    if (3 !== e.tag) break;
                    var n = e.stateNode;
                    !Y && n === X && Z > t && ($ = X = null, Z = 0);
                    var i = n,
                        a = t;
                    if (Oe > ye && r("185"), null === i.nextScheduledRoot) i.remainingExpirationTime = a, null === ce ? (se = ce = i, i.nextScheduledRoot = i) : (ce = ce.nextScheduledRoot = i, ce.nextScheduledRoot = se);
                    else {
                        var o = i.remainingExpirationTime;
                        (0 === o || o > a) && (i.remainingExpirationTime = a)
                    }
                    de || (ve ? be && (fe = i, pe = 1, w(fe, pe)) : 1 === a ? y(1, null) : _(a)), !Y && n === X && Z > t && ($ = X = null, Z = 0)
                }
                e = e["return"]
            }
        }

        function g(e) {
            m(e, 1, !0)
        }

        function h() {
            return K = ((H() - q) / 10 | 0) + 2
        }

        function _(e) {
            if (0 !== ue) {
                if (e > ue) return;
                z(le)
            }
            var t = H() - q;
            ue = e, le = U(b, {
                timeout: 10 * (e - 2) - t
            })
        }

        function v() {
            var e = 0,
                t = null;
            if (null !== ce)
                for (var n = ce, i = se; null !== i;) {
                    var a = i.remainingExpirationTime;
                    if (0 === a) {
                        if (null === n || null === ce ? r("244") : void 0, i === i.nextScheduledRoot) {
                            se = ce = i.nextScheduledRoot = null;
                            break
                        }
                        if (i === se) se = a = i.nextScheduledRoot, ce.nextScheduledRoot = a, i.nextScheduledRoot = null;
                        else {
                            if (i === ce) {
                                ce = n, ce.nextScheduledRoot = se, i.nextScheduledRoot = null;
                                break
                            }
                            n.nextScheduledRoot = i.nextScheduledRoot, i.nextScheduledRoot = null
                        }
                        i = n.nextScheduledRoot
                    } else {
                        if ((0 === e || e > a) && (e = a, t = i), i === ce) break;
                        n = i, i = i.nextScheduledRoot
                    }
                }
            n = fe, null !== n && n === t ? Oe++ : Oe = 0, fe = t, pe = e
        }

        function b(e) {
            y(0, e)
        }

        function y(e, t) {
            for (_e = t, v(); null !== fe && 0 !== pe && (0 === e || e >= pe) && !me;) w(fe, pe), v();
            if (null !== _e && (ue = 0, le = -1), 0 !== pe && _(pe), _e = null, me = !1, Oe = 0, ge) throw e = he, he = null, ge = !1, e
        }

        function w(e, n) {
            if (de ? r("245") : void 0, de = !0, n <= h()) {
                var i = e.finishedWork;
                null !== i ? (e.finishedWork = null, e.remainingExpirationTime = t(i)) : (e.finishedWork = null, i = s(e, n), null !== i && (e.remainingExpirationTime = t(i)))
            } else i = e.finishedWork, null !== i ? (e.finishedWork = null, e.remainingExpirationTime = t(i)) : (e.finishedWork = null, i = s(e, n), null !== i && (O() ? e.finishedWork = i : e.remainingExpirationTime = t(i)));
            de = !1
        }

        function O() {
            return null === _e || _e.timeRemaining() > Ce ? !1 : me = !0
        }

        function C(e) {
            null === fe ? r("246") : void 0, fe.remainingExpirationTime = 0, ge || (ge = !0, he = e)
        }
        var k = xt(e),
            E = Pt(e),
            j = k.popHostContainer,
            S = k.popHostContext,
            T = k.resetHostContainer,
            I = Tt(e, k, E, p, f),
            L = I.beginWork,
            x = I.beginFailedWork,
            P = It(e, k, E).completeWork;
        k = Lt(e, c);
        var M = k.commitResetTextContent,
            A = k.commitPlacement,
            N = k.commitDeletion,
            D = k.commitWork,
            R = k.commitLifeCycles,
            F = k.commitAttachRef,
            B = k.commitDetachRef,
            H = e.now,
            U = e.scheduleDeferredCallback,
            z = e.cancelDeferredCallback,
            G = e.useSyncScheduling,
            V = e.prepareForCommit,
            W = e.resetAfterCommit,
            q = H(),
            K = 2,
            Q = 0,
            Y = !1,
            $ = null,
            X = null,
            Z = 0,
            J = null,
            ee = null,
            te = null,
            ne = null,
            re = null,
            ie = !1,
            ae = !1,
            oe = !1,
            se = null,
            ce = null,
            ue = 0,
            le = -1,
            de = !1,
            fe = null,
            pe = 0,
            me = !1,
            ge = !1,
            he = null,
            _e = null,
            ve = !1,
            be = !1,
            ye = 1e3,
            Oe = 0,
            Ce = 1;
        return {
            computeAsyncExpiration: d,
            computeExpirationForFiber: f,
            scheduleWork: p,
            batchedUpdates: function(e, t) {
                var n = ve;
                ve = !0;
                try {
                    return e(t)
                } finally {
                    (ve = n) || de || y(1, null)
                }
            },
            unbatchedUpdates: function(e) {
                if (ve && !be) {
                    be = !0;
                    try {
                        return e()
                    } finally {
                        be = !1
                    }
                }
                return e()
            },
            flushSync: function(e) {
                var t = ve;
                ve = !0;
                try {
                    e: {
                        var n = Q;Q = 1;
                        try {
                            var i = e();
                            break e
                        } finally {
                            Q = n
                        }
                        i = void 0
                    }
                    return i
                }
                finally {
                    ve = t, de ? r("187") : void 0, y(1, null)
                }
            },
            deferredUpdates: function(e) {
                var t = Q;
                Q = d();
                try {
                    return e()
                } finally {
                    Q = t
                }
            }
        }
    }

    function At(e) {
        function t(e) {
            return e = je(e), null === e ? null : e.stateNode
        }
        var n = e.getPublicInstance;
        e = Mt(e);
        var i = e.computeAsyncExpiration,
            a = e.computeExpirationForFiber,
            o = e.scheduleWork;
        return {
            createContainer: function(e, t) {
                var n = new at(3, null, 0);
                return e = {
                    current: n,
                    containerInfo: e,
                    pendingChildren: null,
                    remainingExpirationTime: 0,
                    isReadyForCommit: !1,
                    finishedWork: null,
                    context: null,
                    pendingContext: null,
                    hydrate: t,
                    nextScheduledRoot: null
                }, n.stateNode = e
            },
            updateContainer: function(e, t, n, s) {
                var c = t.current;
                if (n) {
                    n = n._reactInternalFiber;
                    var u;
                    e: {
                        for (2 === Oe(n) && 2 === n.tag ? void 0 : r("170"), u = n; 3 !== u.tag;) {
                            if (Je(u)) {
                                u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                                break e
                            }(u = u["return"]) ? void 0: r("171")
                        }
                        u = u.stateNode.context
                    }
                    n = Je(n) ? nt(n, u) : u
                } else n = Tn;
                null === t.context ? t.context = n : t.pendingContext = n, t = s, t = void 0 === t ? null : t, s = null != e && null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent ? i() : a(c), bt(c, {
                    expirationTime: s,
                    partialState: {
                        element: e
                    },
                    callback: t,
                    isReplace: !1,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), o(c, s)
            },
            batchedUpdates: e.batchedUpdates,
            unbatchedUpdates: e.unbatchedUpdates,
            deferredUpdates: e.deferredUpdates,
            flushSync: e.flushSync,
            getPublicRootInstance: function(e) {
                if (e = e.current, !e.child) return null;
                switch (e.child.tag) {
                    case 5:
                        return n(e.child.stateNode);
                    default:
                        return e.child.stateNode
                }
            },
            findHostInstance: t,
            findHostInstanceWithNoPortals: function(e) {
                return e = Se(e), null === e ? null : e.stateNode
            },
            injectIntoDevTools: function(e) {
                var n = e.findFiberByHostInstance;
                return mt(wn({}, e, {
                    findHostInstanceByFiber: function(e) {
                        return t(e)
                    },
                    findFiberByHostInstance: function(e) {
                        return n ? n(e) : null
                    }
                }))
            }
        }
    }

    function Nt(e, t, n) {
        var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
            $$typeof: Oi,
            key: null == r ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n
        }
    }

    function Dt(e) {
        return Qi.hasOwnProperty(e) ? !0 : Ki.hasOwnProperty(e) ? !1 : qi.test(e) ? Qi[e] = !0 : (Ki[e] = !0, !1)
    }

    function Rt(e, t, n) {
        var r = o(t);
        if (r && a(t, n)) {
            var i = r.mutationMethod;
            i ? i(e, n) : null == n || r.hasBooleanValue && !n || r.hasNumericValue && isNaN(n) || r.hasPositiveNumericValue && 1 > n || r.hasOverloadedBooleanValue && !1 === n ? Bt(e, t) : r.mustUseProperty ? e[r.propertyName] = n : (t = r.attributeName, (i = r.attributeNamespace) ? e.setAttributeNS(i, t, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && !0 === n ? e.setAttribute(t, "") : e.setAttribute(t, "" + n))
        } else Ft(e, t, a(t, n) ? n : null)
    }

    function Ft(e, t, n) {
        Dt(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
    }

    function Bt(e, t) {
        var n = o(t);
        n ? (t = n.mutationMethod) ? t(e, void 0) : n.mustUseProperty ? e[n.propertyName] = n.hasBooleanValue ? !1 : "" : e.removeAttribute(n.attributeName) : e.removeAttribute(t)
    }

    function Ht(e, t) {
        var n = t.value,
            r = t.checked;
        return wn({
            type: void 0,
            step: void 0,
            min: void 0,
            max: void 0
        }, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: null != n ? n : e._wrapperState.initialValue,
            checked: null != r ? r : e._wrapperState.initialChecked
        })
    }

    function Ut(e, t) {
        var n = t.defaultValue;
        e._wrapperState = {
            initialChecked: null != t.checked ? t.checked : t.defaultChecked,
            initialValue: null != t.value ? t.value : n,
            controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
        }
    }

    function zt(e, t) {
        t = t.checked, null != t && Rt(e, "checked", t)
    }

    function Gt(e, t) {
        zt(e, t);
        var n = t.value;
        null != n ? 0 === n && "" === e.value ? e.value = "0" : "number" === t.type ? (t = parseFloat(e.value) || 0, (n != t || n == t && e.value != n) && (e.value = "" + n)) : e.value !== "" + n && (e.value = "" + n) : (null == t.value && null != t.defaultValue && e.defaultValue !== "" + t.defaultValue && (e.defaultValue = "" + t.defaultValue), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked))
    }

    function Vt(e, t) {
        switch (t.type) {
            case "submit":
            case "reset":
                break;
            case "color":
            case "date":
            case "datetime":
            case "datetime-local":
            case "month":
            case "time":
            case "week":
                e.value = "", e.value = e.defaultValue;
                break;
            default:
                e.value = e.value
        }
        t = e.name, "" !== t && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !e.defaultChecked, "" !== t && (e.name = t)
    }

    function Wt(e) {
        var t = "";
        return bn.Children.forEach(e, function(e) {
            null == e || "string" != typeof e && "number" != typeof e || (t += e)
        }), t
    }

    function qt(e, t) {
        return e = wn({
            children: void 0
        }, t), (t = Wt(t.children)) && (e.children = t), e
    }

    function Kt(e, t, n, r) {
        if (e = e.options, t) {
            t = {};
            for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
            for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + n, t = null, i = 0; i < e.length; i++) {
                if (e[i].value === n) return e[i].selected = !0, void(r && (e[i].defaultSelected = !0));
                null !== t || e[i].disabled || (t = e[i])
            }
            null !== t && (t.selected = !0)
        }
    }

    function Qt(e, t) {
        var n = t.value;
        e._wrapperState = {
            initialValue: null != n ? n : t.defaultValue,
            wasMultiple: !!t.multiple
        }
    }

    function Yt(e, t) {
        return null != t.dangerouslySetInnerHTML ? r("91") : void 0, wn({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }

    function $t(e, t) {
        var n = t.value;
        null == n && (n = t.defaultValue, t = t.children, null != t && (null != n ? r("92") : void 0, Array.isArray(t) && (1 >= t.length ? void 0 : r("93"), t = t[0]), n = "" + t), null == n && (n = "")), e._wrapperState = {
            initialValue: "" + n
        }
    }

    function Xt(e, t) {
        var n = t.value;
        null != n && (n = "" + n, n !== e.value && (e.value = n), null == t.defaultValue && (e.defaultValue = n)), null != t.defaultValue && (e.defaultValue = t.defaultValue)
    }

    function Zt(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && (e.value = t)
    }

    function Jt(e) {
        switch (e) {
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml"
        }
    }

    function en(e, t) {
        return null == e || "http://www.w3.org/1999/xhtml" === e ? Jt(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
    }

    function tn(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
        }
        e.textContent = t
    }

    function nn(e, t) {
        e = e.style;
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = 0 === n.indexOf("--"),
                    i = n,
                    a = t[n];
                i = null == a || "boolean" == typeof a || "" === a ? "" : r || "number" != typeof a || 0 === a || Zi.hasOwnProperty(i) && Zi[i] ? ("" + a).trim() : a + "px", "float" === n && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i
            }
    }

    function rn(e, t, n) {
        t && (ea[e] && (null != t.children || null != t.dangerouslySetInnerHTML ? r("137", e, n()) : void 0), null != t.dangerouslySetInnerHTML && (null != t.children ? r("60") : void 0, "object" == typeof t.dangerouslySetInnerHTML && "__html" in t.dangerouslySetInnerHTML ? void 0 : r("61")), null != t.style && "object" != typeof t.style ? r("62", n()) : void 0)
    }

    function an(e, t) {
        if (-1 === e.indexOf("-")) return "string" == typeof t.is;
        switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0
        }
    }

    function on(e, t) {
        e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument;
        var n = Ne(e);
        t = $n[t];
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            n.hasOwnProperty(i) && n[i] || ("topScroll" === i ? xe("topScroll", "scroll", e) : "topFocus" === i || "topBlur" === i ? (xe("topFocus", "focus", e), xe("topBlur", "blur", e), n.topBlur = !0, n.topFocus = !0) : "topCancel" === i ? (ne("cancel", !0) && xe("topCancel", "cancel", e), n.topCancel = !0) : "topClose" === i ? (ne("close", !0) && xe("topClose", "close", e), n.topClose = !0) : Yr.hasOwnProperty(i) && Le(i, Yr[i], e), n[i] = !0)
        }
    }

    function sn(e, t, n, r) {
        return n = 9 === n.nodeType ? n : n.ownerDocument, r === ta && (r = Jt(e)), r === ta ? "script" === e ? (e = n.createElement("div"), e.innerHTML = "<script></script>", e = e.removeChild(e.firstChild)) : e = "string" == typeof t.is ? n.createElement(e, {
            is: t.is
        }) : n.createElement(e) : e = n.createElementNS(r, e), e
    }

    function cn(e, t) {
        return (9 === t.nodeType ? t : t.ownerDocument).createTextNode(e)
    }

    function un(e, t, n, r) {
        var i = an(t, n);
        switch (t) {
            case "iframe":
            case "object":
                Le("topLoad", "load", e);
                var a = n;
                break;
            case "video":
            case "audio":
                for (a in ra) ra.hasOwnProperty(a) && Le(a, ra[a], e);
                a = n;
                break;
            case "source":
                Le("topError", "error", e), a = n;
                break;
            case "img":
            case "image":
                Le("topError", "error", e), Le("topLoad", "load", e), a = n;
                break;
            case "form":
                Le("topReset", "reset", e), Le("topSubmit", "submit", e), a = n;
                break;
            case "details":
                Le("topToggle", "toggle", e), a = n;
                break;
            case "input":
                Ut(e, n), a = Ht(e, n), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            case "option":
                a = qt(e, n);
                break;
            case "select":
                Qt(e, n), a = wn({}, n, {
                    value: void 0
                }), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            case "textarea":
                $t(e, n), a = Yt(e, n), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            default:
                a = n
        }
        rn(t, a, na);
        var o, s = a;
        for (o in s)
            if (s.hasOwnProperty(o)) {
                var c = s[o];
                "style" === o ? nn(e, c, na) : "dangerouslySetInnerHTML" === o ? (c = c ? c.__html : void 0, null != c && Xi(e, c)) : "children" === o ? "string" == typeof c ? ("textarea" !== t || "" !== c) && tn(e, c) : "number" == typeof c && tn(e, "" + c) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (Yn.hasOwnProperty(o) ? null != c && on(r, o) : i ? Ft(e, o, c) : null != c && Rt(e, o, c))
            }
        switch (t) {
            case "input":
                ae(e), Vt(e, n);
                break;
            case "textarea":
                ae(e), Zt(e, n);
                break;
            case "option":
                null != n.value && e.setAttribute("value", n.value);
                break;
            case "select":
                e.multiple = !!n.multiple, t = n.value, null != t ? Kt(e, !!n.multiple, t, !1) : null != n.defaultValue && Kt(e, !!n.multiple, n.defaultValue, !0);
                break;
            default:
                "function" == typeof a.onClick && (e.onclick = On)
        }
    }

    function ln(e, t, n, r, i) {
        var a = null;
        switch (t) {
            case "input":
                n = Ht(e, n), r = Ht(e, r), a = [];
                break;
            case "option":
                n = qt(e, n), r = qt(e, r), a = [];
                break;
            case "select":
                n = wn({}, n, {
                    value: void 0
                }), r = wn({}, r, {
                    value: void 0
                }), a = [];
                break;
            case "textarea":
                n = Yt(e, n), r = Yt(e, r), a = [];
                break;
            default:
                "function" != typeof n.onClick && "function" == typeof r.onClick && (e.onclick = On)
        }
        rn(t, r, na);
        var o, s;
        e = null;
        for (o in n)
            if (!r.hasOwnProperty(o) && n.hasOwnProperty(o) && null != n[o])
                if ("style" === o)
                    for (s in t = n[o]) t.hasOwnProperty(s) && (e || (e = {}), e[s] = "");
                else "dangerouslySetInnerHTML" !== o && "children" !== o && "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (Yn.hasOwnProperty(o) ? a || (a = []) : (a = a || []).push(o, null));
        for (o in r) {
            var c = r[o];
            if (t = null != n ? n[o] : void 0, r.hasOwnProperty(o) && c !== t && (null != c || null != t))
                if ("style" === o)
                    if (t) {
                        for (s in t) !t.hasOwnProperty(s) || c && c.hasOwnProperty(s) || (e || (e = {}), e[s] = "");
                        for (s in c) c.hasOwnProperty(s) && t[s] !== c[s] && (e || (e = {}), e[s] = c[s])
                    } else e || (a || (a = []), a.push(o, e)), e = c;
            else "dangerouslySetInnerHTML" === o ? (c = c ? c.__html : void 0, t = t ? t.__html : void 0, null != c && t !== c && (a = a || []).push(o, "" + c)) : "children" === o ? t === c || "string" != typeof c && "number" != typeof c || (a = a || []).push(o, "" + c) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && (Yn.hasOwnProperty(o) ? (null != c && on(i, o), a || t === c || (a = [])) : (a = a || []).push(o, c))
        }
        return e && (a = a || []).push("style", e), a
    }

    function dn(e, t, n, r, i) {
        "input" === n && "radio" === i.type && null != i.name && zt(e, i), an(n, r), r = an(n, i);
        for (var a = 0; a < t.length; a += 2) {
            var o = t[a],
                s = t[a + 1];
            "style" === o ? nn(e, s, na) : "dangerouslySetInnerHTML" === o ? Xi(e, s) : "children" === o ? tn(e, s) : r ? null != s ? Ft(e, o, s) : e.removeAttribute(o) : null != s ? Rt(e, o, s) : Bt(e, o)
        }
        switch (n) {
            case "input":
                Gt(e, i);
                break;
            case "textarea":
                Xt(e, i);
                break;
            case "select":
                e._wrapperState.initialValue = void 0, t = e._wrapperState.wasMultiple, e._wrapperState.wasMultiple = !!i.multiple, n = i.value, null != n ? Kt(e, !!i.multiple, n, !1) : t !== !!i.multiple && (null != i.defaultValue ? Kt(e, !!i.multiple, i.defaultValue, !0) : Kt(e, !!i.multiple, i.multiple ? [] : "", !1))
        }
    }

    function fn(e, t, n, r, i) {
        switch (t) {
            case "iframe":
            case "object":
                Le("topLoad", "load", e);
                break;
            case "video":
            case "audio":
                for (var a in ra) ra.hasOwnProperty(a) && Le(a, ra[a], e);
                break;
            case "source":
                Le("topError", "error", e);
                break;
            case "img":
            case "image":
                Le("topError", "error", e), Le("topLoad", "load", e);
                break;
            case "form":
                Le("topReset", "reset", e), Le("topSubmit", "submit", e);
                break;
            case "details":
                Le("topToggle", "toggle", e);
                break;
            case "input":
                Ut(e, n), Le("topInvalid", "invalid", e), on(i, "onChange");
                break;
            case "select":
                Qt(e, n), Le("topInvalid", "invalid", e), on(i, "onChange");
                break;
            case "textarea":
                $t(e, n), Le("topInvalid", "invalid", e), on(i, "onChange")
        }
        rn(t, n, na), r = null;
        for (var o in n) n.hasOwnProperty(o) && (a = n[o], "children" === o ? "string" == typeof a ? e.textContent !== a && (r = ["children", a]) : "number" == typeof a && e.textContent !== "" + a && (r = ["children", "" + a]) : Yn.hasOwnProperty(o) && null != a && on(i, o));
        switch (t) {
            case "input":
                ae(e), Vt(e, n);
                break;
            case "textarea":
                ae(e), Zt(e, n);
                break;
            case "select":
            case "option":
                break;
            default:
                "function" == typeof n.onClick && (e.onclick = On)
        }
        return r
    }

    function pn(e, t) {
        return e.nodeValue !== t
    }

    function mn(e) {
        return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    }

    function gn(e) {
        return e = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null, !(!e || 1 !== e.nodeType || !e.hasAttribute("data-reactroot"))
    }

    function hn(e, t, n, i, a) {
        mn(n) ? void 0 : r("200");
        var o = n._reactRootContainer;
        if (o) sa.updateContainer(t, o, e, a);
        else {
            if (i = i || gn(n), !i)
                for (o = void 0; o = n.lastChild;) n.removeChild(o);
            var s = sa.createContainer(n, i);
            o = n._reactRootContainer = s, sa.unbatchedUpdates(function() {
                sa.updateContainer(t, s, e, a)
            })
        }
        return sa.getPublicRootInstance(o)
    }

    function _n(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        return mn(t) ? void 0 : r("200"), Nt(e, t, null, n)
    }

    function vn(e, t) {
        this._reactRootContainer = sa.createContainer(e, t)
    }
    var bn = n(83),
        yn = n(206),
        wn = n(139),
        On = n(105),
        Cn = n(189),
        kn = n(177),
        En = n(151),
        jn = n(192),
        Sn = n(94),
        Tn = n(99);
    bn ? void 0 : r("227");
    var In = {
            children: !0,
            dangerouslySetInnerHTML: !0,
            defaultValue: !0,
            defaultChecked: !0,
            innerHTML: !0,
            suppressContentEditableWarning: !0,
            suppressHydrationWarning: !0,
            style: !0
        },
        Ln = {
            MUST_USE_PROPERTY: 1,
            HAS_BOOLEAN_VALUE: 4,
            HAS_NUMERIC_VALUE: 8,
            HAS_POSITIVE_NUMERIC_VALUE: 24,
            HAS_OVERLOADED_BOOLEAN_VALUE: 32,
            HAS_STRING_BOOLEAN_VALUE: 64,
            injectDOMPropertyConfig: function(e) {
                var t = Ln,
                    n = e.Properties || {},
                    a = e.DOMAttributeNamespaces || {},
                    o = e.DOMAttributeNames || {};
                e = e.DOMMutationMethods || {};
                for (var s in n) {
                    xn.hasOwnProperty(s) ? r("48", s) : void 0;
                    var c = s.toLowerCase(),
                        u = n[s];
                    c = {
                        attributeName: c,
                        attributeNamespace: null,
                        propertyName: s,
                        mutationMethod: null,
                        mustUseProperty: i(u, t.MUST_USE_PROPERTY),
                        hasBooleanValue: i(u, t.HAS_BOOLEAN_VALUE),
                        hasNumericValue: i(u, t.HAS_NUMERIC_VALUE),
                        hasPositiveNumericValue: i(u, t.HAS_POSITIVE_NUMERIC_VALUE),
                        hasOverloadedBooleanValue: i(u, t.HAS_OVERLOADED_BOOLEAN_VALUE),
                        hasStringBooleanValue: i(u, t.HAS_STRING_BOOLEAN_VALUE)
                    }, 1 >= c.hasBooleanValue + c.hasNumericValue + c.hasOverloadedBooleanValue ? void 0 : r("50", s), o.hasOwnProperty(s) && (c.attributeName = o[s]), a.hasOwnProperty(s) && (c.attributeNamespace = a[s]), e.hasOwnProperty(s) && (c.mutationMethod = e[s]), xn[s] = c
                }
            }
        },
        xn = {},
        Pn = Ln,
        Mn = Pn.MUST_USE_PROPERTY,
        An = Pn.HAS_BOOLEAN_VALUE,
        Nn = Pn.HAS_NUMERIC_VALUE,
        Dn = Pn.HAS_POSITIVE_NUMERIC_VALUE,
        Rn = Pn.HAS_OVERLOADED_BOOLEAN_VALUE,
        Fn = Pn.HAS_STRING_BOOLEAN_VALUE,
        Bn = {
            Properties: {
                allowFullScreen: An,
                async: An,
                autoFocus: An,
                autoPlay: An,
                capture: Rn,
                checked: Mn | An,
                cols: Dn,
                contentEditable: Fn,
                controls: An,
                "default": An,
                defer: An,
                disabled: An,
                download: Rn,
                draggable: Fn,
                formNoValidate: An,
                hidden: An,
                loop: An,
                multiple: Mn | An,
                muted: Mn | An,
                noValidate: An,
                open: An,
                playsInline: An,
                readOnly: An,
                required: An,
                reversed: An,
                rows: Dn,
                rowSpan: Nn,
                scoped: An,
                seamless: An,
                selected: Mn | An,
                size: Dn,
                start: Nn,
                span: Dn,
                spellCheck: Fn,
                style: 0,
                tabIndex: 0,
                itemScope: An,
                acceptCharset: 0,
                className: 0,
                htmlFor: 0,
                httpEquiv: 0,
                value: Fn
            },
            DOMAttributeNames: {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv"
            },
            DOMMutationMethods: {
                value: function(e, t) {
                    return null == t ? e.removeAttribute("value") : void("number" !== e.type || !1 === e.hasAttribute("value") ? e.setAttribute("value", "" + t) : e.validity && !e.validity.badInput && e.ownerDocument.activeElement !== e && e.setAttribute("value", "" + t))
                }
            }
        },
        Hn = Pn.HAS_STRING_BOOLEAN_VALUE,
        Un = {
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace"
        },
        zn = {
            Properties: {
                autoReverse: Hn,
                externalResourcesRequired: Hn,
                preserveAlpha: Hn
            },
            DOMAttributeNames: {
                autoReverse: "autoReverse",
                externalResourcesRequired: "externalResourcesRequired",
                preserveAlpha: "preserveAlpha"
            },
            DOMAttributeNamespaces: {
                xlinkActuate: Un.xlink,
                xlinkArcrole: Un.xlink,
                xlinkHref: Un.xlink,
                xlinkRole: Un.xlink,
                xlinkShow: Un.xlink,
                xlinkTitle: Un.xlink,
                xlinkType: Un.xlink,
                xmlBase: Un.xml,
                xmlLang: Un.xml,
                xmlSpace: Un.xml
            }
        },
        Gn = /[\-\:]([a-z])/g;
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(e) {
        var t = e.replace(Gn, s);
        zn.Properties[t] = 0, zn.DOMAttributeNames[t] = e
    }), Pn.injectDOMPropertyConfig(Bn), Pn.injectDOMPropertyConfig(zn);
    var Vn = {
            _caughtError: null,
            _hasCaughtError: !1,
            _rethrowError: null,
            _hasRethrowError: !1,
            injection: {
                injectErrorUtils: function(e) {
                    "function" != typeof e.invokeGuardedCallback ? r("197") : void 0, c = e.invokeGuardedCallback
                }
            },
            invokeGuardedCallback: function(e, t, n, r, i, a, o, s, u) {
                c.apply(Vn, arguments)
            },
            invokeGuardedCallbackAndCatchFirstError: function(e, t, n, r, i, a, o, s, c) {
                if (Vn.invokeGuardedCallback.apply(this, arguments), Vn.hasCaughtError()) {
                    var u = Vn.clearCaughtError();
                    Vn._hasRethrowError || (Vn._hasRethrowError = !0, Vn._rethrowError = u)
                }
            },
            rethrowCaughtError: function() {
                return u.apply(Vn, arguments)
            },
            hasCaughtError: function() {
                return Vn._hasCaughtError
            },
            clearCaughtError: function() {
                if (Vn._hasCaughtError) {
                    var e = Vn._caughtError;
                    return Vn._caughtError = null, Vn._hasCaughtError = !1, e
                }
                r("198")
            }
        },
        Wn = null,
        qn = {},
        Kn = [],
        Qn = {},
        Yn = {},
        $n = {},
        Xn = Object.freeze({
            plugins: Kn,
            eventNameDispatchConfigs: Qn,
            registrationNameModules: Yn,
            registrationNameDependencies: $n,
            possibleRegistrationNames: null,
            injectEventPluginOrder: f,
            injectEventPluginsByName: p
        }),
        Zn = null,
        Jn = null,
        er = null,
        tr = null,
        nr = {
            injectEventPluginOrder: f,
            injectEventPluginsByName: p
        },
        rr = Object.freeze({
            injection: nr,
            getListener: y,
            extractEvents: w,
            enqueueEvents: O,
            processEventQueue: C
        }),
        ir = Math.random().toString(36).slice(2),
        ar = "__reactInternalInstance$" + ir,
        or = "__reactEventHandlers$" + ir,
        sr = Object.freeze({
            precacheFiberNode: function(e, t) {
                t[ar] = e
            },
            getClosestInstanceFromNode: k,
            getInstanceFromNode: function(e) {
                return e = e[ar], !e || 5 !== e.tag && 6 !== e.tag ? null : e
            },
            getNodeFromInstance: E,
            getFiberCurrentPropsFromNode: j,
            updateFiberProps: function(e, t) {
                e[or] = t
            }
        }),
        cr = Object.freeze({
            accumulateTwoPhaseDispatches: A,
            accumulateTwoPhaseDispatchesSkipTarget: function(e) {
                h(e, x)
            },
            accumulateEnterLeaveDispatches: N,
            accumulateDirectDispatches: function(e) {
                h(e, M)
            }
        }),
        ur = null,
        lr = {
            _root: null,
            _startText: null,
            _fallbackText: null
        },
        dr = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
        fr = {
            type: null,
            target: null,
            currentTarget: On.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: null,
            isTrusted: null
        };
    wn(B.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = On.thatReturnsTrue)
        },
        stopPropagation: function() {
            var e = this.nativeEvent;
            e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = On.thatReturnsTrue)
        },
        persist: function() {
            this.isPersistent = On.thatReturnsTrue
        },
        isPersistent: On.thatReturnsFalse,
        destructor: function() {
            var e, t = this.constructor.Interface;
            for (e in t) this[e] = null;
            for (t = 0; t < dr.length; t++) this[dr[t]] = null
        }
    }), B.Interface = fr, B.augmentClass = function(e, t) {
        function n() {}
        n.prototype = this.prototype;
        var r = new n;
        wn(r, e.prototype), e.prototype = r, e.prototype.constructor = e, e.Interface = wn({}, this.Interface, t), e.augmentClass = this.augmentClass, z(e)
    }, z(B), B.augmentClass(G, {
        data: null
    }), B.augmentClass(V, {
        data: null
    });
    var pr = [9, 13, 27, 32],
        mr = yn.canUseDOM && "CompositionEvent" in window,
        gr = null;
    yn.canUseDOM && "documentMode" in document && (gr = document.documentMode);
    var hr;
    if (hr = yn.canUseDOM && "TextEvent" in window && !gr) {
        var _r = window.opera;
        hr = !("object" == typeof _r && "function" == typeof _r.version && 12 >= parseInt(_r.version(), 10))
    }
    var vr, br = hr,
        yr = yn.canUseDOM && (!mr || gr && gr > 8 && 11 >= gr),
        wr = String.fromCharCode(32),
        Or = {
            beforeInput: {
                phasedRegistrationNames: {
                    bubbled: "onBeforeInput",
                    captured: "onBeforeInputCapture"
                },
                dependencies: ["topCompositionEnd", "topKeyPress", "topTextInput", "topPaste"]
            },
            compositionEnd: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionEnd",
                    captured: "onCompositionEndCapture"
                },
                dependencies: "topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            },
            compositionStart: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionStart",
                    captured: "onCompositionStartCapture"
                },
                dependencies: "topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            },
            compositionUpdate: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionUpdate",
                    captured: "onCompositionUpdateCapture"
                },
                dependencies: "topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            }
        },
        Cr = !1,
        kr = !1,
        Er = {
            eventTypes: Or,
            extractEvents: function(e, t, n, r) {
                var i;
                if (mr) e: {
                    switch (e) {
                        case "topCompositionStart":
                            var a = Or.compositionStart;
                            break e;
                        case "topCompositionEnd":
                            a = Or.compositionEnd;
                            break e;
                        case "topCompositionUpdate":
                            a = Or.compositionUpdate;
                            break e
                    }
                    a = void 0
                }
                else kr ? W(e, n) && (a = Or.compositionEnd) : "topKeyDown" === e && 229 === n.keyCode && (a = Or.compositionStart);
                return a ? (yr && (kr || a !== Or.compositionStart ? a === Or.compositionEnd && kr && (i = R()) : (lr._root = r, lr._startText = F(), kr = !0)), a = G.getPooled(a, t, n, r), i ? a.data = i : (i = q(n), null !== i && (a.data = i)), A(a), i = a) : i = null, (e = br ? K(e, n) : Q(e, n)) ? (t = V.getPooled(Or.beforeInput, t, n, r), t.data = e, A(t)) : t = null, [i, t]
            }
        },
        jr = null,
        Sr = null,
        Tr = null,
        Ir = {
            injectFiberControlledHostComponent: function(e) {
                jr = e
            }
        },
        Lr = Object.freeze({
            injection: Ir,
            enqueueStateRestore: $,
            restoreStateIfNeeded: X
        }),
        xr = !1,
        Pr = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };
    yn.canUseDOM && (vr = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
    var Mr = {
            change: {
                phasedRegistrationNames: {
                    bubbled: "onChange",
                    captured: "onChangeCapture"
                },
                dependencies: "topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")
            }
        },
        Ar = null,
        Nr = null,
        Dr = !1;
    yn.canUseDOM && (Dr = ne("input") && (!document.documentMode || 9 < document.documentMode));
    var Rr = {
        eventTypes: Mr,
        _isInputEventSupported: Dr,
        extractEvents: function(e, t, n, r) {
            var i = t ? E(t) : window,
                a = i.nodeName && i.nodeName.toLowerCase();
            if ("select" === a || "input" === a && "file" === i.type) var o = le;
            else if (ee(i))
                if (Dr) o = he;
                else {
                    o = me;
                    var s = pe
                }
            else a = i.nodeName, !a || "input" !== a.toLowerCase() || "checkbox" !== i.type && "radio" !== i.type || (o = ge);
            return o && (o = o(e, t)) ? se(o, n, r) : (s && s(e, i, t), void("topBlur" === e && null != t && (e = t._wrapperState || i._wrapperState) && e.controlled && "number" === i.type && (e = "" + i.value, i.getAttribute("value") !== e && i.setAttribute("value", e))))
        }
    };
    B.augmentClass(_e, {
        view: null,
        detail: null
    });
    var Fr = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    _e.augmentClass(ye, {
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: be,
        button: null,
        buttons: null,
        relatedTarget: function(e) {
            return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
        }
    });
    var Br = {
            mouseEnter: {
                registrationName: "onMouseEnter",
                dependencies: ["topMouseOut", "topMouseOver"]
            },
            mouseLeave: {
                registrationName: "onMouseLeave",
                dependencies: ["topMouseOut", "topMouseOver"]
            }
        },
        Hr = {
            eventTypes: Br,
            extractEvents: function(e, t, n, r) {
                if ("topMouseOver" === e && (n.relatedTarget || n.fromElement) || "topMouseOut" !== e && "topMouseOver" !== e) return null;
                var i = r.window === r ? r : (i = r.ownerDocument) ? i.defaultView || i.parentWindow : window;
                if ("topMouseOut" === e ? (e = t, t = (t = n.relatedTarget || n.toElement) ? k(t) : null) : e = null, e === t) return null;
                var a = null == e ? i : E(e);
                i = null == t ? i : E(t);
                var o = ye.getPooled(Br.mouseLeave, e, n, r);
                return o.type = "mouseleave", o.target = a, o.relatedTarget = i, n = ye.getPooled(Br.mouseEnter, t, n, r), n.type = "mouseenter", n.target = i, n.relatedTarget = a, N(o, n, e, t), [o, n]
            }
        },
        Ur = bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        zr = [],
        Gr = !0,
        Vr = void 0,
        Wr = Object.freeze({
            get _enabled() {
                return Gr
            },
            get _handleTopLevel() {
                return Vr
            },
            setHandleTopLevel: function(e) {
                Vr = e
            },
            setEnabled: Ie,
            isEnabled: function() {
                return Gr
            },
            trapBubbledEvent: Le,
            trapCapturedEvent: xe,
            dispatchEvent: Pe
        }),
        qr = {
            animationend: Me("Animation", "AnimationEnd"),
            animationiteration: Me("Animation", "AnimationIteration"),
            animationstart: Me("Animation", "AnimationStart"),
            transitionend: Me("Transition", "TransitionEnd")
        },
        Kr = {},
        Qr = {};
    yn.canUseDOM && (Qr = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
    var Yr = {
            topAbort: "abort",
            topAnimationEnd: Ae("animationend") || "animationend",
            topAnimationIteration: Ae("animationiteration") || "animationiteration",
            topAnimationStart: Ae("animationstart") || "animationstart",
            topBlur: "blur",
            topCancel: "cancel",
            topCanPlay: "canplay",
            topCanPlayThrough: "canplaythrough",
            topChange: "change",
            topClick: "click",
            topClose: "close",
            topCompositionEnd: "compositionend",
            topCompositionStart: "compositionstart",
            topCompositionUpdate: "compositionupdate",
            topContextMenu: "contextmenu",
            topCopy: "copy",
            topCut: "cut",
            topDoubleClick: "dblclick",
            topDrag: "drag",
            topDragEnd: "dragend",
            topDragEnter: "dragenter",
            topDragExit: "dragexit",
            topDragLeave: "dragleave",
            topDragOver: "dragover",
            topDragStart: "dragstart",
            topDrop: "drop",
            topDurationChange: "durationchange",
            topEmptied: "emptied",
            topEncrypted: "encrypted",
            topEnded: "ended",
            topError: "error",
            topFocus: "focus",
            topInput: "input",
            topKeyDown: "keydown",
            topKeyPress: "keypress",
            topKeyUp: "keyup",
            topLoadedData: "loadeddata",
            topLoad: "load",
            topLoadedMetadata: "loadedmetadata",
            topLoadStart: "loadstart",
            topMouseDown: "mousedown",
            topMouseMove: "mousemove",
            topMouseOut: "mouseout",
            topMouseOver: "mouseover",
            topMouseUp: "mouseup",
            topPaste: "paste",
            topPause: "pause",
            topPlay: "play",
            topPlaying: "playing",
            topProgress: "progress",
            topRateChange: "ratechange",
            topScroll: "scroll",
            topSeeked: "seeked",
            topSeeking: "seeking",
            topSelectionChange: "selectionchange",
            topStalled: "stalled",
            topSuspend: "suspend",
            topTextInput: "textInput",
            topTimeUpdate: "timeupdate",
            topToggle: "toggle",
            topTouchCancel: "touchcancel",
            topTouchEnd: "touchend",
            topTouchMove: "touchmove",
            topTouchStart: "touchstart",
            topTransitionEnd: Ae("transitionend") || "transitionend",
            topVolumeChange: "volumechange",
            topWaiting: "waiting",
            topWheel: "wheel"
        },
        $r = {},
        Xr = 0,
        Zr = "_reactListenersID" + ("" + Math.random()).slice(2),
        Jr = yn.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
        ei = {
            select: {
                phasedRegistrationNames: {
                    bubbled: "onSelect",
                    captured: "onSelectCapture"
                },
                dependencies: "topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")
            }
        },
        ti = null,
        ni = null,
        ri = null,
        ii = !1,
        ai = {
            eventTypes: ei,
            extractEvents: function(e, t, n, r) {
                var i, a = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
                if (!(i = !a)) {
                    e: {
                        a = Ne(a),
                        i = $n.onSelect;
                        for (var o = 0; o < i.length; o++) {
                            var s = i[o];
                            if (!a.hasOwnProperty(s) || !a[s]) {
                                a = !1;
                                break e
                            }
                        }
                        a = !0
                    }
                    i = !a
                }
                if (i) return null;
                switch (a = t ? E(t) : window, e) {
                    case "topFocus":
                        (ee(a) || "true" === a.contentEditable) && (ti = a, ni = t, ri = null);
                        break;
                    case "topBlur":
                        ri = ni = ti = null;
                        break;
                    case "topMouseDown":
                        ii = !0;
                        break;
                    case "topContextMenu":
                    case "topMouseUp":
                        return ii = !1, Be(n, r);
                    case "topSelectionChange":
                        if (Jr) break;
                    case "topKeyDown":
                    case "topKeyUp":
                        return Be(n, r)
                }
                return null
            }
        };
    B.augmentClass(He, {
        animationName: null,
        elapsedTime: null,
        pseudoElement: null
    }), B.augmentClass(Ue, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }), _e.augmentClass(ze, {
        relatedTarget: null
    });
    var oi = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        },
        si = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        };
    _e.augmentClass(Ve, {
        key: function(e) {
            if (e.key) {
                var t = oi[e.key] || e.key;
                if ("Unidentified" !== t) return t
            }
            return "keypress" === e.type ? (e = Ge(e), 13 === e ? "Enter" : String.fromCharCode(e)) : "keydown" === e.type || "keyup" === e.type ? si[e.keyCode] || "Unidentified" : ""
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: be,
        charCode: function(e) {
            return "keypress" === e.type ? Ge(e) : 0
        },
        keyCode: function(e) {
            return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
        },
        which: function(e) {
            return "keypress" === e.type ? Ge(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
        }
    }), ye.augmentClass(We, {
        dataTransfer: null
    }), _e.augmentClass(qe, {
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: be
    }), B.augmentClass(Ke, {
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null
    }), ye.augmentClass(Qe, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: null,
        deltaMode: null
    });
    var ci = {},
        ui = {};
    "abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(e) {
        var t = e[0].toUpperCase() + e.slice(1),
            n = "on" + t;
        t = "top" + t, n = {
            phasedRegistrationNames: {
                bubbled: n,
                captured: n + "Capture"
            },
            dependencies: [t]
        }, ci[e] = n, ui[t] = n
    });
    var li = {
        eventTypes: ci,
        extractEvents: function(e, t, n, r) {
            var i = ui[e];
            if (!i) return null;
            switch (e) {
                case "topKeyPress":
                    if (0 === Ge(n)) return null;
                case "topKeyDown":
                case "topKeyUp":
                    e = Ve;
                    break;
                case "topBlur":
                case "topFocus":
                    e = ze;
                    break;
                case "topClick":
                    if (2 === n.button) return null;
                case "topDoubleClick":
                case "topMouseDown":
                case "topMouseMove":
                case "topMouseUp":
                case "topMouseOut":
                case "topMouseOver":
                case "topContextMenu":
                    e = ye;
                    break;
                case "topDrag":
                case "topDragEnd":
                case "topDragEnter":
                case "topDragExit":
                case "topDragLeave":
                case "topDragOver":
                case "topDragStart":
                case "topDrop":
                    e = We;
                    break;
                case "topTouchCancel":
                case "topTouchEnd":
                case "topTouchMove":
                case "topTouchStart":
                    e = qe;
                    break;
                case "topAnimationEnd":
                case "topAnimationIteration":
                case "topAnimationStart":
                    e = He;
                    break;
                case "topTransitionEnd":
                    e = Ke;
                    break;
                case "topScroll":
                    e = _e;
                    break;
                case "topWheel":
                    e = Qe;
                    break;
                case "topCopy":
                case "topCut":
                case "topPaste":
                    e = Ue;
                    break;
                default:
                    e = B
            }
            return t = e.getPooled(i, t, n, r), A(t), t
        }
    };
    Vr = function(e, t, n, r) {
        e = w(e, t, n, r), O(e), C(!1)
    }, nr.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), Zn = sr.getFiberCurrentPropsFromNode, Jn = sr.getInstanceFromNode, er = sr.getNodeFromInstance, nr.injectEventPluginsByName({
        SimpleEventPlugin: li,
        EnterLeaveEventPlugin: Hr,
        ChangeEventPlugin: Rr,
        SelectEventPlugin: ai,
        BeforeInputEventPlugin: Er
    });
    var di = [],
        fi = -1;
    new Set;
    var pi = {
            current: Tn
        },
        mi = {
            current: !1
        },
        gi = Tn,
        hi = null,
        _i = null,
        vi = "function" == typeof Symbol && Symbol["for"],
        bi = vi ? Symbol["for"]("react.element") : 60103,
        yi = vi ? Symbol["for"]("react.call") : 60104,
        wi = vi ? Symbol["for"]("react.return") : 60105,
        Oi = vi ? Symbol["for"]("react.portal") : 60106,
        Ci = vi ? Symbol["for"]("react.fragment") : 60107,
        ki = "function" == typeof Symbol && Symbol.iterator,
        Ei = Array.isArray,
        ji = St(!0),
        Si = St(!1),
        Ti = {},
        Ii = Object.freeze({
            "default": At
        }),
        Li = Ii && At || Ii,
        xi = Li["default"] ? Li["default"] : Li,
        Pi = "object" == typeof performance && "function" == typeof performance.now,
        Mi = void 0;
    Mi = Pi ? function() {
        return performance.now()
    } : function() {
        return Date.now()
    };
    var Ai = void 0,
        Ni = void 0;
    if (yn.canUseDOM)
        if ("function" != typeof requestIdleCallback || "function" != typeof cancelIdleCallback) {
            var Di, Ri = null,
                Fi = !1,
                Bi = -1,
                Hi = !1,
                Ui = 0,
                zi = 33,
                Gi = 33;
            Di = Pi ? {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = Ui - performance.now();
                    return e > 0 ? e : 0
                }
            } : {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = Ui - Date.now();
                    return e > 0 ? e : 0
                }
            };
            var Vi = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
            window.addEventListener("message", function(e) {
                if (e.source === window && e.data === Vi) {
                    if (Fi = !1, e = Mi(), 0 >= Ui - e) {
                        if (!(-1 !== Bi && e >= Bi)) return void(Hi || (Hi = !0, requestAnimationFrame(Wi)));
                        Di.didTimeout = !0
                    } else Di.didTimeout = !1;
                    Bi = -1, e = Ri, Ri = null, null !== e && e(Di)
                }
            }, !1);
            var Wi = function(e) {
                Hi = !1;
                var t = e - Ui + Gi;
                Gi > t && Gi > zi ? (8 > t && (t = 8), Gi = zi > t ? zi : t) : zi = t, Ui = e + Gi, Fi || (Fi = !0, window.postMessage(Vi, "*"))
            };
            Ai = function(e, t) {
                return Ri = e, null != t && "number" == typeof t.timeout && (Bi = Mi() + t.timeout), Hi || (Hi = !0, requestAnimationFrame(Wi)), 0
            }, Ni = function() {
                Ri = null, Fi = !1, Bi = -1
            }
        } else Ai = window.requestIdleCallback, Ni = window.cancelIdleCallback;
    else Ai = function(e) {
        return setTimeout(function() {
            e({
                timeRemaining: function() {
                    return 1 / 0
                }
            })
        })
    }, Ni = function(e) {
        clearTimeout(e)
    };
    var qi = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        Ki = {},
        Qi = {},
        Yi = {
            html: "http://www.w3.org/1999/xhtml",
            mathml: "http://www.w3.org/1998/Math/MathML",
            svg: "http://www.w3.org/2000/svg"
        },
        $i = void 0,
        Xi = function(e) {
            return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
                MSApp.execUnsafeLocalFunction(function() {
                    return e(t, n, r, i)
                })
            } : e
        }(function(e, t) {
            if (e.namespaceURI !== Yi.svg || "innerHTML" in e) e.innerHTML = t;
            else {
                for ($i = $i || document.createElement("div"), $i.innerHTML = "<svg>" + t + "</svg>", t = $i.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                for (; t.firstChild;) e.appendChild(t.firstChild)
            }
        }),
        Zi = {
            animationIterationCount: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0
        },
        Ji = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Zi).forEach(function(e) {
        Ji.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1), Zi[t] = Zi[e]
        })
    });
    var ea = wn({
            menuitem: !0
        }, {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0
        }),
        ta = Yi.html,
        na = On.thatReturns(""),
        ra = {
            topAbort: "abort",
            topCanPlay: "canplay",
            topCanPlayThrough: "canplaythrough",
            topDurationChange: "durationchange",
            topEmptied: "emptied",
            topEncrypted: "encrypted",
            topEnded: "ended",
            topError: "error",
            topLoadedData: "loadeddata",
            topLoadedMetadata: "loadedmetadata",
            topLoadStart: "loadstart",
            topPause: "pause",
            topPlay: "play",
            topPlaying: "playing",
            topProgress: "progress",
            topRateChange: "ratechange",
            topSeeked: "seeked",
            topSeeking: "seeking",
            topStalled: "stalled",
            topSuspend: "suspend",
            topTimeUpdate: "timeupdate",
            topVolumeChange: "volumechange",
            topWaiting: "waiting"
        },
        ia = Object.freeze({
            createElement: sn,
            createTextNode: cn,
            setInitialProperties: un,
            diffProperties: ln,
            updateProperties: dn,
            diffHydratedProperties: fn,
            diffHydratedText: pn,
            warnForUnmatchedText: function() {},
            warnForDeletedHydratableElement: function() {},
            warnForDeletedHydratableText: function() {},
            warnForInsertedHydratedElement: function() {},
            warnForInsertedHydratedText: function() {},
            restoreControlledState: function(e, t, n) {
                switch (t) {
                    case "input":
                        if (Gt(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var i = n[t];
                                if (i !== e && i.form === e.form) {
                                    var a = j(i);
                                    a ? void 0 : r("90"), oe(i), Gt(i, a)
                                }
                            }
                        }
                        break;
                    case "textarea":
                        Xt(e, n);
                        break;
                    case "select":
                        t = n.value, null != t && Kt(e, !!n.multiple, t, !1)
                }
            }
        });
    Ir.injectFiberControlledHostComponent(ia);
    var aa = null,
        oa = null,
        sa = xi({
            getRootHostContext: function(e) {
                var t = e.nodeType;
                switch (t) {
                    case 9:
                    case 11:
                        e = (e = e.documentElement) ? e.namespaceURI : en(null, "");
                        break;
                    default:
                        t = 8 === t ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = en(e, t)
                }
                return e
            },
            getChildHostContext: function(e, t) {
                return en(e, t)
            },
            getPublicInstance: function(e) {
                return e
            },
            prepareForCommit: function() {
                aa = Gr;
                var e = kn();
                if (Fe(e)) {
                    if ("selectionStart" in e) var t = {
                        start: e.selectionStart,
                        end: e.selectionEnd
                    };
                    else e: {
                        var n = window.getSelection && window.getSelection();
                        if (n && 0 !== n.rangeCount) {
                            t = n.anchorNode;
                            var r = n.anchorOffset,
                                i = n.focusNode;
                            n = n.focusOffset;
                            try {
                                t.nodeType, i.nodeType
                            } catch (a) {
                                t = null;
                                break e
                            }
                            var o = 0,
                                s = -1,
                                c = -1,
                                u = 0,
                                l = 0,
                                d = e,
                                f = null;
                            t: for (;;) {
                                for (var p; d !== t || 0 !== r && 3 !== d.nodeType || (s = o + r), d !== i || 0 !== n && 3 !== d.nodeType || (c = o + n), 3 === d.nodeType && (o += d.nodeValue.length), null !== (p = d.firstChild);) f = d, d = p;
                                for (;;) {
                                    if (d === e) break t;
                                    if (f === t && ++u === r && (s = o), f === i && ++l === n && (c = o), null !== (p = d.nextSibling)) break;
                                    d = f, f = d.parentNode
                                }
                                d = p
                            }
                            t = -1 === s || -1 === c ? null : {
                                start: s,
                                end: c
                            }
                        } else t = null
                    }
                    t = t || {
                        start: 0,
                        end: 0
                    }
                } else t = null;
                oa = {
                    focusedElem: e,
                    selectionRange: t
                }, Ie(!1)
            },
            resetAfterCommit: function() {
                var e = oa,
                    t = kn(),
                    n = e.focusedElem,
                    r = e.selectionRange;
                if (t !== n && jn(document.documentElement, n)) {
                    if (Fe(n))
                        if (t = r.start, e = r.end, void 0 === e && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
                        else if (window.getSelection) {
                        t = window.getSelection();
                        var i = n[D()].length;
                        e = Math.min(r.start, i), r = void 0 === r.end ? e : Math.min(r.end, i), !t.extend && e > r && (i = r, r = e, e = i), i = Re(n, e);
                        var a = Re(n, r);
                        if (i && a && (1 !== t.rangeCount || t.anchorNode !== i.node || t.anchorOffset !== i.offset || t.focusNode !== a.node || t.focusOffset !== a.offset)) {
                            var o = document.createRange();
                            o.setStart(i.node, i.offset), t.removeAllRanges(), e > r ? (t.addRange(o), t.extend(a.node, a.offset)) : (o.setEnd(a.node, a.offset), t.addRange(o))
                        }
                    }
                    for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                        element: e,
                        left: e.scrollLeft,
                        top: e.scrollTop
                    });
                    for (Sn(n), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
                }
                oa = null, Ie(aa), aa = null
            },
            createInstance: function(e, t, n, r, i) {
                return e = sn(e, t, n, r), e[ar] = i, e[or] = t, e
            },
            appendInitialChild: function(e, t) {
                e.appendChild(t)
            },
            finalizeInitialChildren: function(e, t, n, r) {
                un(e, t, n, r);
                e: {
                    switch (t) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                            e = !!n.autoFocus;
                            break e
                    }
                    e = !1
                }
                return e
            },
            prepareUpdate: function(e, t, n, r, i) {
                return ln(e, t, n, r, i)
            },
            shouldSetTextContent: function(e, t) {
                return "textarea" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && "string" == typeof t.dangerouslySetInnerHTML.__html
            },
            shouldDeprioritizeSubtree: function(e, t) {
                return !!t.hidden
            },
            createTextInstance: function(e, t, n, r) {
                return e = cn(e, t), e[ar] = r, e
            },
            now: Mi,
            mutation: {
                commitMount: function(e) {
                    e.focus()
                },
                commitUpdate: function(e, t, n, r, i) {
                    e[or] = i, dn(e, t, n, r, i)
                },
                resetTextContent: function(e) {
                    e.textContent = ""
                },
                commitTextUpdate: function(e, t, n) {
                    e.nodeValue = n
                },
                appendChild: function(e, t) {
                    e.appendChild(t)
                },
                appendChildToContainer: function(e, t) {
                    8 === e.nodeType ? e.parentNode.insertBefore(t, e) : e.appendChild(t)
                },
                insertBefore: function(e, t, n) {
                    e.insertBefore(t, n)
                },
                insertInContainerBefore: function(e, t, n) {
                    8 === e.nodeType ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n)
                },
                removeChild: function(e, t) {
                    e.removeChild(t)
                },
                removeChildFromContainer: function(e, t) {
                    8 === e.nodeType ? e.parentNode.removeChild(t) : e.removeChild(t)
                }
            },
            hydration: {
                canHydrateInstance: function(e, t) {
                    return 1 !== e.nodeType || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e
                },
                canHydrateTextInstance: function(e, t) {
                    return "" === t || 3 !== e.nodeType ? null : e
                },
                getNextHydratableSibling: function(e) {
                    for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
                    return e
                },
                getFirstHydratableChild: function(e) {
                    for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
                    return e
                },
                hydrateInstance: function(e, t, n, r, i, a) {
                    return e[ar] = a, e[or] = n, fn(e, t, n, i, r)
                },
                hydrateTextInstance: function(e, t, n) {
                    return e[ar] = n, pn(e, t)
                },
                didNotMatchHydratedContainerTextInstance: function() {},
                didNotMatchHydratedTextInstance: function() {},
                didNotHydrateContainerInstance: function() {},
                didNotHydrateInstance: function() {},
                didNotFindHydratableContainerInstance: function() {},
                didNotFindHydratableContainerTextInstance: function() {},
                didNotFindHydratableInstance: function() {},
                didNotFindHydratableTextInstance: function() {}
            },
            scheduleDeferredCallback: Ai,
            cancelDeferredCallback: Ni,
            useSyncScheduling: !0
        });
    Z = sa.batchedUpdates, vn.prototype.render = function(e, t) {
        sa.updateContainer(e, this._reactRootContainer, null, t)
    }, vn.prototype.unmount = function(e) {
        sa.updateContainer(null, this._reactRootContainer, null, e)
    };
    var ca = {
        createPortal: _n,
        findDOMNode: function(e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternalFiber;
            return t ? sa.findHostInstance(t) : void("function" == typeof e.render ? r("188") : r("213", Object.keys(e)))
        },
        hydrate: function(e, t, n) {
            return hn(null, e, t, !0, n)
        },
        render: function(e, t, n) {
            return hn(null, e, t, !1, n)
        },
        unstable_renderSubtreeIntoContainer: function(e, t, n, i) {
            return null == e || void 0 === e._reactInternalFiber ? r("38") : void 0, hn(e, t, n, !1, i)
        },
        unmountComponentAtNode: function(e) {
            return mn(e) ? void 0 : r("40"), e._reactRootContainer ? (sa.unbatchedUpdates(function() {
                hn(null, null, e, !1, function() {
                    e._reactRootContainer = null
                })
            }), !0) : !1
        },
        unstable_createPortal: _n,
        unstable_batchedUpdates: J,
        unstable_deferredUpdates: sa.deferredUpdates,
        flushSync: sa.flushSync,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            EventPluginHub: rr,
            EventPluginRegistry: Xn,
            EventPropagators: cr,
            ReactControlledComponent: Lr,
            ReactDOMComponentTree: sr,
            ReactDOMEventListener: Wr
        }
    };
    sa.injectIntoDevTools({
        findFiberByHostInstance: k,
        bundleType: 0,
        version: "16.2.0",
        rendererPackageName: "react-dom"
    });
    var ua = Object.freeze({
            "default": ca
        }),
        la = ua && ca || ua;
    e.exports = la["default"] ? la["default"] : la
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i) {
        if ("Script error." !== e) {
            var a = i ? i.stack || i.message : null;
            o("unhandled_error", a ? {
                err: e,
                stack: a
            } : {
                err: e
            })
        }
        f && f.apply(this, arguments)
    }

    function i(e) {
        e.preventDefault()
    }

    function a() {
        return !!window.imwl
    }

    function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
        a() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(d.retryFn)(l.post, 3, function() {
            return 2
        })("al_im.php", {
            act: "a_weird_log",
            kind: e,
            data: JSON.stringify(extend({
                errIdx: p++,
                ua: navigator.userAgent
            }, t))
        }))
    }

    function s(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return o(e, extend({
            err: t && t.message || t
        }, n)), Promise.reject(t)
    }

    function c() {
        f = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", i)
    }

    function u() {
        window.onerror = f, f = void 0, window.removeEventListener("unhandledrejection", i)
    }
    n.r(t), n.d(t, "isWeirdLogging", function() {
        return a
    }), n.d(t, "imWeirdLog", function() {
        return o
    }), n.d(t, "imWeirdCatch", function() {
        return s
    }), n.d(t, "startLoggingAllUnhandled", function() {
        return c
    }), n.d(t, "stopLoggingAllUnhandled", function() {
        return u
    });
    var l = n(64),
        d = n(27),
        f = void 0,
        p = 1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return i.createElement("header", {
            className: Object(a.classNames)("PopupHeader", e.className),
            style: e.style
        }, e.back && i.createElement("div", {
            className: "PopupHeader__back",
            onClick: e.onBackClick
        }, i.createElement("button", {
            className: "PopupHeader__backBtn",
            onClick: e.onBackClick
        }, e.back)), i.createElement("h2", {
            className: "PopupHeader__title"
        }, e.title), i.createElement("div", {
            className: "PopupHeader__close"
        }, i.createElement("button", {
            className: "PopupHeader__closeBtn",
            onClick: e.onCloseClick
        })))
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = (n(9), n(35));
    r.defaultProps = {
        back: null,
        title: "",
        onCloseClick: function() {}
    }
}, function(e, t, n) {
    var r = n(202);
    e.exports = function(e, t, n, i) {
        try {
            return i ? t(r(n)[0], n[1]) : t(n)
        } catch (a) {
            var o = e["return"];
            throw void 0 !== o && r(o.call(e)), a
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = geByClass("post");
        LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(function(e) {
            return LongView.register(e, "im")
        })
    }

    function i(e) {
        LongView.onScroll(e, window.innerHeight)
    }
    n.r(t), t["default"] = {
        onNewMessagesChunk: r,
        onHistoryScroll: i
    }
}, function(e, t, n) {
    var r = n(185),
        i = n(38)("toStringTag"),
        a = "Arguments" == r(function() {
            return arguments
        }()),
        o = function(e, t) {
            try {
                return e[t]
            } catch (n) {}
        };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = o(t = Object(e), i)) ? n : a ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t, n, r, i) {
        var a = i.reduce(function(e, t) {
            return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
        }, {});
        Object.keys(a).forEach(function(i) {
            var o = a[i];
            e.set(ie.removeMessages.bind(null, o, i)).then(function() {
                return e.set(ie.removeMessagesMarkDeleted.bind(null, o, i))
            }).then(function() {
                return t.removeMessages(o, +i, e)
            }).then(function() {
                var a = Object(ne.getTab)(e, i),
                    s = a && o.some(function(e) {
                        return e >= a.lastmsg
                    });
                s && Object(ie.loadActualLastMessage)(e, i).then(function() {
                    n.promoteDialog(e, i), r.updateCounter(e, i), t.updateGoToEnd(e, !0)
                })
            })
        })
    }

    function a(e, t, n, r) {
        t.set(ie.updateChatPhoto.bind(null, e)).then(function() {
            var i = e.kludges.source_act;
            n.updateDialog(e.peerId, t), r.updateChatPhoto(e, i, t)
        })
    }

    function o(e, t) {
        "spam" === t ? Object(ae.showSpamLayer)(e, X.mount, {}) : "fav" === t && Object(ae.showFavvedBox)(e, {}, se.mount, {})
    }

    function s(e, t) {
        if (e.get().gid) {
            var n = t.parentNode,
                r = geByClass("_im_right_menu_counter", n),
                i = e.get().dialog_tab_cts;
            r.forEach(function(e) {
                var t = domData(e, "tab");
                val(e, i[t] || "")
            })
        }
    }

    function c(e, t, n, r) {
        e.set(ie.cancelRecording).then(function() {
            n.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(r, "im-page_history-show"), n.stopLoading(), Object(ne.isAnyMessageBeingEdited)(e) && n.cancelEditing();
        var i = e.get().peer;
        e.set(ie.changePeer.bind(null, 0, !1, !1)).then(function() {
            window.tooltips && window.tooltips.hideAll(), y(), Object(ae.isClassicInterface)(e) && t.activate(), n.changePeer(e), Object(ae.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(function() {
                e.get().longpoll.push([Y.transitionEvent("search")])
            }, 13), Object(ae.isLocksAvailable)(e) && Object(ae.isPeerBlockedByMe)(i, e) && e.set(ie.releaseBlock.bind(null, i))
        })
    }

    function u(e, t, n, r, i) {
        e.forEach(function(e) {
            var i = e.kludges.source_act;
            switch (i) {
                case ae.CHAT_PHOTO_REMOVE:
                case ae.CHAT_PHOTO_UPDATE:
                    a(e, t, n, r)
            }
        })
    }

    function l(e, t) {
        return 2e9 > t && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
    }

    function d(e, t) {
        var n = t.flags & Y.FLAG_OUTBOUND,
            r = inArray(t.peerId, e.get().mutedPeers),
            i = t.flags & Y.FLAG_DELETED,
            a = e.get().gid;
        if (!n && !r && !i) {
            var o = l(t.subject, t.peerId) || "",
                s = (o ? o + " " : "") + t.text || "",
                c = t.userId,
                u = t.peerId,
                d = void 0,
                f = void 0,
                p = e.get().tabs[u];
            if (t.kludges && t.kludges.source_act && (s = stripHTML(Object(ae.renderServiceMsg)(e, t, p, !1))), (!e.get().notify_msg && !Object(ae.isChatPeer)(u) || a && !e.get().mute) && window.Notifier && Notifier.playSound({
                    author_id: u
                }), !Object(ae.isChatPeer)(u)) return;
            s = trim(replaceEntities(stripHTML(s.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), s = Object(W.replaceMentions)(s, function(e, t, n, r, i) {
                return i
            }), Object(ae.isChatPeer)(u) ? (d = Object(ue.oCacheGet)(e, c).name, p.tab && (d += " » " + p.tab), f = Object(ue.oCacheGet)(e, c).photo) : (d = p.tab, f = p.photo);
            var m = t.attaches[0];
            if (m && "mail" === m.type) s += "\n[" + getLang("mail_added_msgs") + "]";
            else if (m) {
                var g = "doc" === m.type && "graffiti" === m.kind ? "graffiti" : m.type;
                s += "\n[" + getLang("mail_added_" + g) + "]"
            }
            d = trim(replaceEntities(stripHTML((d || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                id: t.messageId,
                text: s,
                author_id: u,
                title: d,
                author_photo: f
            })
        }
    }

    function f(e, t) {
        var n = e.get().longpoll.push.bind(null, [Y.resetPeer()]),
            r = function i() {
                var r = e.get().selectedMessages;
                r && r.length ? (e.setState({
                    selectedMessages: []
                }).then(function() {
                    t.changedMessageSelection(e), t.cleanSelection(r)
                }), setTimeout(function() {
                    return cancelStackPush("im_peer", i)
                }, 0)) : n()
            };
        cancelStackPush("im_peer", r)
    }

    function p(e) {
        e.set(ie.leaveInvitation)
    }

    function m(e, t) {
        var n = e.get().tabs[t.peerId],
            r = e.get().active_tab;
        return r === oe.FOLDER_ALL ? !0 : Object(ie.filterFromTab)(r)(n)
    }

    function g(e) {
        var t = e.attaches.filter(function(e) {
            return "sticker" !== e.type
        });
        return Object(re.isServiceMsg)(e) || 0 === t.length
    }

    function h(e, t, n) {
        addClass(n, "im-page_history-show"), t.loadingPeer(e)
    }

    function _(e, t) {
        Object(ae.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(ie.forwardMessages.bind(null, e.get().pendingForward, Object(ne.getTabDraft)(Object(ne.getTab)(e, t)))))
    }

    function v(e, t) {
        var n = document.querySelector(Ce),
            r = Object(ae.isCommunityInterface)(e) ? ye : we,
            i = n ? n.offsetHeight : 0;
        return r += Oe, r += i, Math.floor((t.offsetHeight - r) / _e)
    }

    function b(e, t) {
        var n = v(e, t);
        if (e.get().tabbedPeers.length > n) {
            var r = e.get().tabbedPeers.filter(function(t) {
                    var n = t.peer;
                    return intval(n) !== e.get().peer
                }),
                i = r.map(function(t) {
                    var n = t.peer;
                    return e.get().tabs[n]
                }),
                a = i.sort(function(e, t) {
                    return t.last_touched - e.last_touched
                }),
                o = [];
            0 !== e.get().peer && o.push(e.get().tabs[e.get().peer]);
            var s = o.concat(a).slice(n).map(function(e) {
                    return e.peerId
                }),
                c = e.get().tabbedPeers.filter(function(e) {
                    return !inArray(e.peer, s)
                });
            return e.set(ie.updateTabbedPeers.bind(null, c, !0))
        }
        return Promise.resolve(e)
    }

    function y() {
        for (var e = curBox(); e;) e.hide(), e = curBox()
    }

    function w(e, t, n, r, i, a, o, s, c) {
        e.get().audio_msg.isRecording && e.set(ie.cancelRecording).then(function() {
            r.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.forward && r.hideFwd(e), Object(ne.isAnyMessageBeingEdited)(e) && r.cancelEditing(), Object(ne.isSearching)(e) && t.cancelSearch && (i.clearSearch(e), n.restoreDialogs(e)), O(e, s, c), h(e, r, a);
        var u = e.get().peer;
        Object(ie.updateMentions)(e.get()), Object(ie.videoAutoPlayHandler)(), Object(ae.isFullyLoadedTab)(e, t.peerId) && (t.msgid && !Object(ne.getMessage)(e, t.peerId, t.msgid) || !t.msgid && !Object(ne.getMessage)(e, t.peerId, Object(ne.getTab)(e, t.peerId).lastmsg) || Object(ne.getTab)(e, t.peerId).skipped) && e.mutate(function(e) {
            return Object(ne.makeTabNotFullyLoaded)(e, t.peerId)
        });
        var l = e.set(ie.changePeer.bind(null, t.peerId, t.msgid, t.entryPoint)).then(function(e) {
            var n = e.get(),
                r = ie.loadPeer.bind(null, t.peerId, !1, t.msgid, !1, n);
            return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
        }).then(function() {
            n.selectPeer(t.msgid, e), _(e, e.get().peer), window.tooltips && tooltips.hideAll(), y(), r.preparePeer(e), f(e, r), Object(ae.isClassicInterface)(e) && (n.deactivate(), b(e, a).then(function() {
                return o.updateMenu(e)
            }))
        });
        return l = t.msgid ? l.then(function() {
            return e.set(ie.selectPeerOnMessage.bind(null, t.peerId === u, u))
        }) : l.then(function() {
            return e.set(ie.selectPeer.bind(null, !0))
        }), l.then(function() {
            if (e.get().peer === t.peerId) {
                if (t.forward) {
                    var n = e.get().tabs[e.get().peer];
                    !n.scrollBottom && n.unread && e.set(ie.readLastMessages.bind(null, e.get().peer))
                }
                Object(ae.isClassicInterface)(e) && o.updateMenu(e), r.changePeer(e, !1), r.updateTyping(t.peerId, e), Object(ie.updateMentions)(e.get())
            }
        })["catch"](function(e) {
            return Object(le.imWeirdCatch)("applyNewPeer", e)
        })
    }

    function O(e, t, n) {
        t && e.get().shown && (t.hide(e), n().createCanceled(e))
    }

    function C(e, t, n) {
        Object(ne.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
    }

    function k(e, t, n, r, i, a, o) {
        Object(ae.isClassicInterface)(e) && (i.saveScroll(e), a.saveScroll(e)), r.rotateCross(e), addClass(o, "im-page_creating"), e.setState({
            isCreating: !0
        }), n && n.show(e, t), Object(ae.isClassicInterface)(e) && (setStyle(o, {
            height: L(o, e).page
        }), setTimeout(function() {
            addClass(o, "im-page_cropped")
        }, 200)), Object(ie.toggleConversation)(!0)
    }

    function E(e, t, n, r) {
        n && n.hide(e, t)
    }

    function j(e) {
        for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== Y.UNREAD_COUNT || t ? e[n].type === Y.UNREAD_COUNT && e.splice(n, 1) : t = !0;
        return e
    }

    function S(e, t, n, r, i) {
        r.updateChatTopic(t, e), Object(ae.isClassicInterface)(e) && i.updateName(t, e), e.get().peer == t && (Object(ie.setActions)(e.get()), r.updateActions(e))
    }

    function T(e, t, n, i, a, l, f, _, v, y, T, I, L, x, P, M, A, N, R, F, B) {
        return {
            changePeer: function(e, n) {
                t.selectPeer(e, n)
            },
            cancelSearch: function(e) {
                C(e, i, t)
            },
            loadingPeer: function(e) {
                h(e, n, a)
            },
            restoreDialogs: function(e, n, r) {
                t.restoreDialogs(e, n, r)
            },
            focusSearch: function(e) {
                i.focusInput(e)
            },
            appendSearch: function(e, n, r, i) {
                t.appendSearch(e, n, r, i)
            },
            appendDialogs: function(e, n) {
                t.appendDialogs(e, n)
            },
            showCreation: function(e, r) {
                k(e, r, y, i, t, n, a)
            },
            updateState: function(e, r) {
                t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
            },
            appendFastDialogs: function(e, n) {
                t.appendFastDialogs(e, n, !0)
            },
            createCanceled: function(e, r) {
                i.createCanceled(e, r), Object(ae.isClassicInterface)(e) ? (setStyle(a, {
                    height: "auto"
                }), removeClass(a, "im-page_cropped"), setTimeout(function() {
                    return i.focusInput(e)
                }, 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(function() {
                    0 === e.get().peer ? i.focusInput(e) : n.focustTxt(e)
                }, 0), removeClass(a, "im-page_creating"), e.setState({
                    isCreating: !1
                })
            },
            updateMenu: function(e) {
                M && M.updateMenu(e)
            },
            hideFwd: function(e) {
                n.hideFwd(e)
            },
            goToHistoryEnd: function() {
                n.goToEnd()
            },
            updateDialog: function(e, n) {
                t.updateDialog(e, n)
            },
            focusTxt: function(e) {
                n.focustTxt(e)
            },
            resync: function(e) {
                Object(ne.isSearching)(e) && i.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), y && y.hide(e), Object(ae.isCommunityInterface)(e) && s(e, a), Object(ae.isClassicInterface)(e) && e.get().tabbedPeers.forEach(function(t) {
                    var n = t.peer;
                    M.updateCounter(e, n), M.updateName(n, e)
                }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), Object(ae.isReservedPeer)(e.get().peer) || n.changePeer(e, !1);
                var r = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                handlePageCount(r, e.get().unread_cnt)
            },
            toggleSettingsLoader: function(e, t) {
                T.toggleLoader(e, t)
            },
            onUserActions: function(e, t) {
                if (!Object(ie.isSearchingInplace)(e.get().peer, e.get())) {
                    var r = e.get(),
                        i = r.peer;
                    if (Object(ae.isFullyLoadedTab)(r, i) && !l.is_idle) {
                        var a = Object(ne.countUnread)(e.get().peer, e.get());
                        if (a > 0) {
                            var o = r.tabs[i];
                            !o.skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(ie.readLastMessages.bind(null, i)))
                        }
                    }
                }
            },
            removeSelection: function(e) {
                t.removeSelection(e), i.focusInput(e)
            },
            route: function(e, r, s, c) {
                if ("undefined" != typeof e[0]) return !0;
                e.box && (e = {
                    box: e.box
                });
                var u = !1;
                return e.invite_chat_id && s.invite_hash ? !0 : (c && c.params && "left_nav" === c.params._ref && "undefined" == typeof e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(function(e) {
                    switch (e) {
                        case "sel":
                            s.q || (u = !0);
                            var l = s.sel ? Object(ae.unUrlPeer)(s.sel) : 0,
                                d = c.back;
                            0 === l ? I.get().longpoll.push([Y.resetPeer(!1, d)]) : l !== I.get().peer && I.get().longpoll.push([Y.changePeer(l, s.msgid || !1)]);
                            break;
                        case "invite_chat_id":
                        case "invite_hash":
                            p(I);
                            break;
                        case "tab":
                            O(I, y, v), u = !0;
                            var f = s.tab || oe.FOLDER_ALL;
                            I.get().longpoll.push([Y.changeTab(f)]);
                            break;
                        case "act":
                            s.act && "create" === s.act ? k(I, [], y, i, t, n, a) : E(I, [], y, a);
                            break;
                        case "st":
                            s.st && s.sel ? (curBox() && curBox().hide(), I.mutate(ie.setInplaceSearch.bind(null, unescape(s.st), s.sel)), n.startSearch(I)) : (I.mutate(ie.cancelSearch.bind(null, r.sel)), n.cancelSearch(I, !0));
                            break;
                        case "q":
                            s.q ? (curBox() && curBox().hide(), i.setSearch(I, s.q, !0)) : i.clearSearch(I);
                            break;
                        case "box":
                            o(I, s.box)
                    }
                }), Object(ae.isClassicInterface)(I) && "undefined" == typeof e.sel && M.updateMenu(I), u && C(I, i, t), !1)
            },
            updateDialogFilters: function(e) {
                Object(ne.isSearching)(e) || t.restoreDialogs(e), T.updateFilter(e)
            },
            removePeer: function(e, n) {
                t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([Y.resetPeer()]), Object(ae.isClassicInterface)(e) && M.updateMenu(e)
            },
            newMessage: function(e) {
                Object(ae.isClassicInterface)(e) || t.scrollUp(!0)
            },
            onEvents: function(e, o) {
                var l = j(o.filter(function(e) {
                        return e.type !== Y.ADD_MESSAGE || !(e.flags & Y.FLAG_STEALTH)
                    })),
                    p = o.filter(re.isServiceMsg),
                    h = o.filter(function(e) {
                        return e.type === Y.ADD_MESSAGE
                    });
                u(p, e, t, n, M);
                var O = Object(ie.checkNewPeople)(p, h, e),
                    k = Promise.resolve();
                O.shouldLoad && (k = e.set(ie.loadNewPeople.bind(null, O, f))), k.then(function() {
                    l.forEach(function(o) {
                        switch (o.type) {
                            case Y.ADD_MESSAGE:
                                var u = e.get().tabs[e.get().peer],
                                    l = !u || !u.msgs || 0 == u.msgs.length,
                                    f = Object(ae.isDuplicate)(o, e.get()),
                                    p = Object(ne.isCommunityBlocked)(e, o.peerId);
                                if (0 === f) {
                                    o.flags & Y.FLAG_OUTBOUND || e.set(ie.updateFavAndTitle.bind(null, o.peerId, !0)), e.set(ie.addMessage.bind(null, o)), b(e, a), m(e, o) && (d(e, o), t.updateTyping(o.peerId, e), Object(ne.isSearching)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId));
                                    var h = Object(ne.isCommunityBlocked)(e, o.peerId);
                                    h === !1 && p === !0 && n.updateActions(e), Object(ae.isClassicInterface)(e) && (M.updateCounter(e, o.peerId), M.updateMenu(e)), n.updateTyping(o.peerId, e), n.addMessage(e, o), Object(ae.isClassicInterface)(e) || T.updateFilter(e), g(o) || !Object(ae.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(ie.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o), Object(ie.videoAutoPlayHandler)()
                                    })
                                } else 2 === f ? (g(o) || e.set(ie.loadMedia.bind(null, o)).then(function(e) {
                                    n.replaceAttachmentPlaceholders(e, o)
                                }), e.set(ie.replaceMessage.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e)) : Object(ne.isSearching)(e) || t.promoteDialog(e, o.peerId);
                                u && l && F();
                                break;
                            case Y.EDIT_MESSAGE:
                                e.set(ie.editMessage.bind(null, o)).then(function(e) {
                                    t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), g(o) || !Object(ae.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(ie.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    })
                                });
                                break;
                            case Y.READ_INBOUND:
                                e.set(ie.markInboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), Object(ae.isClassicInterface)(e) && M.updateCounter(e, o.peerId), Object(ne.isSearching)(e) || t.restoreDialogs(e), T.updateFilter(e)
                                });
                                break;
                            case Y.READ_OUTBOUND:
                                e.set(ie.markOutboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                });
                                break;
                            case Y.UNREAD_COUNT:
                                e.set(ie.updateUnreadCount.bind(null, o.count)).then(function() {
                                    var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                    handlePageCount(t, o.count), T.updateFilter(e), Object(ae.isClassicInterface)(e) && s(e, a)
                                });
                                break;
                            case Y.GOT_ONLINE:
                            case Y.GOT_OFFLINE:
                                var O = o.type === Y.GOT_ONLINE;
                                e.set(ie.updateOnline.bind(null, o.userId, O ? o.platform : !1, o.lastSeenTs)).then(function(e) {
                                    Object(ae.isTabLoaded)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                });
                                break;
                            case Y.SET_FLAGS:
                            case Y.RESET_FLAGS:
                                if (o.flags & Y.FLAG_DELETED && o.type === Y.SET_FLAGS && !Object(ae.isAlreadyDeleted)(e, o.peerId, o.messageId) && !e.get().blockedFlagUpdates[o.peerId] && _(o), o.flags === Y.FLAG_IMPORTANT) {
                                    var k = o.type === Y.SET_FLAGS;
                                    e.set(ie.updateImportant.bind(null, k ? 1 : -1, o.messageId)).then(function() {
                                        Object(ae.isClassicInterface)(e) || i.updateImportantCnt(e)
                                    }), e.set(ie.updateFavMessage.bind(null, [o.messageId], o.peerId, k)).then(function(t) {
                                        n.markImportant(o.messageId, k, e)
                                    })
                                }
                                break;
                            case Y.TYPING:
                                Object(ae.isSelfMessage)(o.peerId, e.get().gid) || (e.set(ie.setTyping.bind(null, o)).then(function(e) {
                                    Object(ae.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }), e.set(ie.waitTyping.bind(null, o.peerId)).then(function(e) {
                                    Object(ae.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }));
                                break;
                            case Y.NOTIFY_SETTINGS_CHANGED:
                                D(e, v, o.peerId, 0 !== o.disabledUntil);
                                break;
                            case Y.RESYNC:
                                e.get().longpoll.pause(), e.set(ie.resync).then(v().resync).then(function() {
                                    return e.get().longpoll.resume()
                                });
                                break;
                            case Y.TRANSITION:
                                L.transition(o.state);
                                break;
                            case Y.RESET_PEER:
                                if (o.removeActivePeer) {
                                    var E = e.get().tabbedPeers.filter(function(t) {
                                        var n = t.peer,
                                            r = t.type;
                                        return n !== e.get().peer && "perm" === r
                                    });
                                    e.setState({
                                        tabbedPeers: E
                                    })
                                }
                                c(e, t, n, a), o.cancelSearch && C(e, i, t), Object(ae.isClassicInterface)(e) && M.updateMenu(e), i.focusInput(e);
                                break;
                            case Y.CHANGE_TAB:
                                Object(ae.changeTab)(o.tab, e, v, ie.changeDialogsTab).then(function(e) {
                                    T.updateFilter(e)
                                });
                                break;
                            case Y.RESET_DIRECTORIES:
                            case Y.SET_DIRECTORIES:
                            case Y.REPLACE_DIRECTORIES:
                                if (o.mask === Y.FOLDER_HAS_BANNER) break;
                                e.set(ie.updateFolderState.bind(null, o.peerId, o.mask, o.type, o.local)).then(function(e) {
                                    Object(ne.isSearching)(e) || o.type === Y.RESET_DIRECTORIES && o.mask === Y.FOLDER_IMPORTANT || o.type === Y.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(o.peerId, e), s(e, a), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                });
                                break;
                            case Y.DELETE_DIALOG:
                                e.set(ie.deletedDialog.bind(null, o.peerId, Promise.resolve([]))).then(function() {
                                    v().removePeer(e, o.peerId), v().updateDialogFilters(e)
                                });
                                break;
                            case Y.CHANGE_PEER:
                                w(e, o, t, n, i, a, M, y, v);
                                break;
                            case Y.MUTEX:
                                var j = r({}, o.peerId, o),
                                    S = Object(ae.isPeerBlocked)(o.peerId, e);
                                e.set(ie.updateBlockStates.bind(null, j)).then(function() {
                                    t.updateDialog(o.peerId, e);
                                    var r = Object(ae.isPeerBlocked)(o.peerId, e);
                                    Object(ae.isFullyLoadedTab)(e.get(), o.peerId) && S !== r && n.updateChat(e, o.peerId)
                                });
                                break;
                            case Y.FAILED_MESSAGE:
                                e.set(ie.setMessageErrored.bind(null, o.peer, o.message)).then(function() {
                                    n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                });
                                break;
                            case Y.RESEND:
                                var I = o.message.messageId;
                                e.set(ie.resendMessage.bind(null, o.peerId, I, o.message)).then(function() {
                                    n.resendMessage(o.peerId, I), t.promoteDialog(e, o.peerId)
                                });
                                break;
                            case Y.CONVERSATION_UPDATED:
                                if (Object(ae.isTabLoaded)(e.get(), o.peerId)) {
                                    var x = Object(de.handleEventChatUpdated)(e, o.peerId, o.updateType, o.updateArg, n, t);
                                    x || v().reloadChatInfo(o.peerId)
                                }
                        }
                    })
                })
            },
            updateHistory: function(e) {
                return n.updateHistory(e)
            },
            reloadChatInfo: function(e) {
                Object(ae.isTabLoaded)(I.get(), e) && I.set(ie.loadChatInfo.bind(null, e)).then(function() {
                    return S(I, e, t, n, M)
                })
            },
            cancelRecording: function() {
                return I.set(ie.cancelRecording).then(function() {
                    return n.cancelRecording()
                })
            },
            fixHeight: function() {
                F()
            },
            unmount: function() {
                Object(q.destroyModule)(e), clearInterval(I.get().update_title_to), l.stop(), B(), t.unmount();
                var r = window.devicePixelRatio >= 2 ? "_2x" : "";
                setFavIcon("/images/icons/favicons/fav_logo" + r + ".ico"), n.unmount(), i.unmount(), cancelStackFilter("im_peer"), T.unmount(), y && y.unmount(), M && M.unmount(), A && A(), x && x(), Object(ae.isLocksAvailable)(I) && I.get().peer && I.set(ie.releaseBlock.bind(null, I.get().peer)), N.unmount(), M && M.unmount(), R.unmount(), clearInterval(P), cur.imDb.unmount(), cur.imDb = !1
            }
        }
    }

    function I(e, t, n, r) {
        var i = t.get();
        Object(ae.isReservedPeer)(i.peer) || e().onUserActions(t, r), i.update_old_title && t.set(ie.updateFavAndTitle.bind(null, !1, !1))
    }

    function L(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_page_history", e),
            i = window.clientHeight() - n.offsetHeight - pe - 2,
            a = Object(ae.isClassicInterface)(t) ? he : me,
            o = {
                page: Math.max(i, a)
            };
        if (Object(ae.isClassicInterface)(t)) {
            var s = Object(ae.getClassicChatHeight)();
            s = s > 0 ? Math.min(s - n.offsetHeight - pe - 2, i) : i;
            var c = hasClass(r, "im-page--history_empty-hist") ? s : i;
            o.history = Math.max(s, a), o.chat = Math.max(c, a)
        }
        return o
    }

    function x(e, t, n, r, i) {
        var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !1;
        if (!isFullScreen()) {
            var s = L(e, t);
            if (setStyle(e, {
                    minHeight: s.page
                }), Object(ae.isClassicInterface)(t) && ("undefined" == typeof t.get().chatResizeInitialized && t.set(ie.initializeChatResize), setStyle(e, {
                    height: t.get().isCreating ? s.page : "auto"
                }), setStyle(geByClass1("_im_page_dialogs", e), {
                    minHeight: s.page,
                    position: "static",
                    top: 0
                }), setStyle(geByClass1("_im_page_history", e), {
                    minHeight: s.history,
                    position: "relative",
                    top: 0
                }), setStyle(geByClass1("_im_chat_body_abs", e), {
                    minHeight: s.chat,
                    height: s.chat,
                    position: "relative",
                    top: 0
                })), browser.safari && o && "function" == typeof o && o(), r && r.updateScroll(), i && i.updateScroll(), n) {
                var c = n.updateScroll();
                n.scrollFix(t, t.get().peer, c)
            }
            a && setTimeout(function() {
                return x(e, t, n, r, i, !1)
            }, 100)
        }
    }

    function P(e) {
        var t = "safari-repaint";
        e.forEach(function(e) {
            hasClass(e, t) && removeClass(e, t), addClass(e, t)
        }), setTimeout(function() {
            e.forEach(function(e) {
                removeClass(e, t)
            })
        }, 100)
    }

    function M() {
        var e = [geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")];
        P(e)
    }

    function A(e, t, n, i) {
        function a() {
            var t = Object(V.getNativeOption)("scrollLeft"),
                n = hasClass(e, "im-page--header_static"),
                i = [];
            u !== t ? i = c.slice().concat([e]) : n !== l && (i = [e]), u = t, l = n, i.length > 0 && i.forEach(function(i) {
                var a = e === i && n ? 0 : -t;
                setStyle(i, r({}, cssTransformProp, 0 === a ? "unset" : "translateX(" + a + "px)"))
            })
        }
        if (browser.mobile) return !1;
        var o = geByClass1("_im_chat_input_w", i),
            s = geByClass1("_im_dialog_actions", i),
            c = [t, n, o, s],
            u = null,
            l = hasClass(e, "im-page--header_static"),
            d = ge("im-group-online-disabled-notice");
        return d && c.push(d), c = c.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", a), a(),
            function() {
                removeEvent(window, "scroll", a)
            }
    }

    function N(e) {
        var t = e.get();
        if (!Object(ae.isLocksAvailable)(e)) return null;
        var n = Object($.createWorker)(t.mutex_key, function(e) {
                t.longpoll.push([Y.mutexEvent(e)])
            }, function(e, n) {
                return Object(ie.getMutexQueue)(t.gid).then(function(e) {
                    var t = fe(e, 1),
                        n = t[0];
                    return n
                })
            }),
            r = n.stop;
        return r
    }

    function D(e, t, n, r) {
        e.set(ie.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
    }

    function R(e, t) {
        function n() {
            for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
            l().onEvents(t, n)
        }

        function r() {
            p ? m.offData(n) : m.stop()
        }
        var a = t.get(),
            s = void 0,
            c = window.devicePixelRatio >= 2 ? "_2x" : "";
        setFavIcon("/images/icons/favicons/fav_im" + c + ".ico"), x(e, t, !1, !1, !1, !0), show(e);
        var u = Object(q.createMutations)(T),
            l = u.callMutations,
            d = u.bindMutations,
            p = !a.lpConfig,
            m = p ? Notifier.getLpInstance() : t.get().gid ? Object(Q.startLongPollForGroup)(a.lpConfig) : Object(Q.startLongPoll)(a);
        m.onData(n), p && Object(le.imWeirdLog)("im_use_fc_longpoll", {}, !1);
        var g = geByClass1("_im_dialogs_search", e),
            h = geByClass1("_im_dialogs_settings", e),
            _ = Object(F.mount)(geByClass1("_im_page_dcontent", e), t, l),
            v = Object(B.mount)(geByClass1("_im_page_history", e), t, l),
            b = Object(H.mount)(g, t, l),
            y = Object(U.mount)(h, t, l),
            w = Object(J.mount)(t);
        cur.imDb = Object(ee.mount)(t.get().gid ? -t.get().gid : vk.id), t.set(ie.preloadSearchIndex.bind(null, cur.imDb)), Object(ae.isClassicInterface)(t) && y.updateSettings(t);
        var O = void 0,
            C = void 0;
        if (Object(ae.isClassicInterface)(t)) {
            var k = geByClass1("_im_ui_peers_list", e.parentNode);
            O = Object(Z.mount)(k, t, l), C = A(g, h, geByClass1("_im_right_menu", e.parentNode), e)
        }
        Object(ae.isClassicInterface)(t) && a.peer && _.deactivate(), a.gid || (s = Object(z.mount)(geByClass1("_im_dialogs_creation", e), t, l));
        var E = a.isCreating,
            j = E ? "create" : 0 === a.peer ? "search" : "default";
        E && s.show(t, []);
        var S = Object(K.create)(t, j, _, v, b, s),
            L = Object(ce.mount)(t, S);
        v.updateScroll();
        var P = I.bind(null, l, t, S);
        Object(ae.isReservedPeer)(a.peer) || setTimeout(function() {
            return f(t, v)
        }, 10);
        var D = new IdleManager({
                id: "im",
                element: document,
                focusElement: window,
                triggerEvents: "mouseover mousedown keypress"
            }),
            R = debounce(M, 300),
            V = x.bind(null, e, t, v, _, s, !1, R);
        t.setState({
            longpoll: m
        }), t.set(ie.setExecStack.bind(null, [])), D.on("unidle", function() {
            m.abortWaiting(), P()
        }), D.start(), nav.objLoc.box && (o(t, nav.objLoc.box), Object(G.updateLocation)({
            box: null
        }));
        var W = N(t),
            Y = void 0;
        Object(ae.isLocksAvailable)(t) && (Y = setInterval(ae.blockLatencyCompensation.bind(null, t, a.longpoll), 2e3)), t.get().invitation && Object(ae.showInvitationBox)(t, t.get().invitation, ie.leaveInvitation);
        var $ = Object(te.throttleAccumulate)(i.bind(null, t, v, _, O), 200),
            X = ae.hideTopNotice.bind(null, t),
            ne = ae.hideAsideNotice.bind(null, t),
            re = Object(q.createModule)({
                handlers: function(t, n) {
                    t(document, "mousemove mousedown keypress", P), t(window, "resize", V), n(e, "click", ae.HIDE_TOP_NOTICE_CLASS, X), n(gpeByClass("_im-page-wrap", e), "click", ae.HIDE_ASIDE_NOTICE_CLASS, ne), n(gpeByClass("_im-page-wrap", e), "click", ae.HIDE_ASIDE_PROMO_BLOCK_CLASS, ae.hideAsidePromoBlock), n(gpeByClass("_im-page-wrap", e), "click", ae.INSTALL_VKADMIN_LINK, ae.installVKAdminApp), browser.safari && t(document, "visibilitychange", M)
                }
            });
        return d(re, _, v, b, e, D, m, $, l, s, y, t, S, W, Y, O, C, w, L, V, r)
    }
    n.r(t), n.d(t, "mount", function() {
        return R
    });
    var F = n(161),
        B = n(100),
        H = n(80),
        U = n(118),
        z = n(101),
        G = n(200),
        V = n(181),
        W = n(70),
        q = n(110),
        K = n(84),
        Q = n(190),
        Y = n(132),
        $ = n(75),
        X = n(43),
        Z = n(63),
        J = n(19),
        ee = n(77),
        te = n(145),
        ne = n(199),
        re = n(158),
        ie = n(41),
        ae = n(81),
        oe = n(30),
        se = n(62),
        ce = n(179),
        ue = n(136),
        le = n(56),
        de = n(79),
        fe = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        pe = 30,
        me = 400,
        he = 250,
        _e = 32,
        ve = 12,
        be = 52,
        ye = 5 * _e + 2 * ve + be,
        we = 3 * _e + 2 * ve,
        Oe = 10,
        Ce = "._im_aside_notice"
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        if (!e.loading && !e.all) {
            var i = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (i > -300) {
                var a = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, Object(u.wrapLoading)(a)(Object(o.loadImportant)(e.offset).then(function(t) {
                    var n = p(t, 4),
                        i = (n[0], n[1]),
                        s = (n[2], n[3]);
                    e.all = s.all, e.offset = s.offset, e.all ? addClass(a, "im-important_all") : e.loading = !1, r.set(o.mergeTabs.bind(null, Object(u.tabFromIds)(s.msgs, s.hash)));
                    var c = ce("div");
                    c.innerHTML = i, a.appendChild(c), Object(u.ensureDomHasActions)(a)
                }), "bottom")
            }
        }
    }

    function i(e, t, n) {
        for (var r = arguments.length, i = Array(r > 3 ? r - 3 : 0), a = 3; r > a; a++) i[a - 3] = arguments[a];
        i.filter(function(e) {
            return inArray(e.type, [f.SET_FLAGS, f.RESET_FLAGS, f.CHANGE_PEER])
        }).forEach(function(r) {
            if (r.type === f.CHANGE_PEER) return void n.hide();
            if (r.flags === f.FLAG_IMPORTANT) {
                var i = r.type === f.SET_FLAGS;
                e.set(o.updateFavMessage.bind(null, [r.messageId], 0, i)).then(function(n) {
                    t.markImportant(r.messageId, i, e)
                })
            }
        })
    }

    function a(e, t, n, a) {
        var o = ge("box_layer_wrap"),
            f = t.get().longpoll,
            p = Object(l["default"])({
                peer: 0,
                longpoll: f,
                oCache: {},
                tabs: Object(u.tabFromIds)(a.msgs, a.hash)
            }),
            m = Object(c.mount)(e.bodyNode, p, function() {
                return {}
            }),
            g = Object(s.mount)(e.bodyNode, t);
        Object(u.ensureDomHasActions)(e.bodyNode);
        var h = i.bind(null, t, m, e);
        f.onData(h);
        var _ = r.bind(null, {
                all: !1,
                loading: a.all,
                offset: a.offset
            }, e, o, p),
            v = Object(d.createModule)({
                handlers: function(e, t) {
                    e(o, "scroll", _)
                }
            });
        return {
            unmount: function() {
                Object(d.destroyModule)(v), g.unmount(), m.unmount(), f.offData(h)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return a
    });
    var o = n(41),
        s = n(195),
        c = n(54),
        u = n(81),
        l = n(188),
        d = n(110),
        f = n(132),
        p = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.get().tabbedPeers.map(function(t) {
            return e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]
        }).filter(function(e) {
            return e
        }).filter(function(e) {
            return !e.deletedDialog
        }).map(function(e) {
            var t = e.peerId;
            return {
                type: "peer",
                peer: t
            }
        });
        return t.length > 0 && (t = [{
            type: "sep"
        }].concat(t)), t
    }

    function i(e, t) {
        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
        var n = Object(p.getBaseLink)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
            r = Object(p.getBareTab)(t.peer, e),
            i = r.tab;
        return i = getTemplate("im_right_menu_ct", {
            name: i,
            count: r.unread > 0 ? r.unread : ""
        }), getTemplate("im_right_menu_tpl", {
            href: n,
            label: i,
            peer: t.peer,
            attrs: 'title="' + stripHTML(r.tab) + '"',
            cls: r.unread > 0 ? "im-right-menu--unread" : ""
        })
    }

    function a(e, t, n, r) {
        var i = gpeByClass("_im_peer_tab", r),
            a = intval(domData(i, "list-id")),
            s = e.get().tabbedPeers.filter(function(e) {
                var t = e.peer;
                return t !== a
            });
        return e.set(m.updateTabbedPeers.bind(null, s, !0)).then(function() {
            if (o(t, e), a === e.get().peer) e.get().longpoll.push([Object(g.resetPeer)()]);
            else if (0 !== e.get().peer) {
                var n = gpeByClass("_im_right_menu", r);
                uiRightMenu.hideSliding(n)
            }
        }), cancelEvent(n), !1
    }

    function o(e, t) {
        return e.pipeReplace(Promise.resolve(r(t)))
    }

    function s(e, t) {
        geByClass("_im_peer_tab", e).forEach(function(e) {
            var n = q2ajx(attr(e, "href").split("?")[1]);
            n.tab !== t.get().active_tab && attr(e, "href", Object(p.getBaseLink)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
        })
    }

    function c(e, t, n, r) {
        return {
            updateMenu: function(t) {
                s(e, t);
                var r = gpeByClass("_im_right_menu", e);
                o(n, t).then(function() {
                    var e = void 0;
                    e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab), e && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                })
            },
            updateName: function(e, t) {
                var n = ge("ui_rmenu_peer_" + e);
                if (n) {
                    var r = geByClass1("_im_r_tx", n),
                        i = t.get().tabs[e].tab;
                    val(r, i)
                }
            },
            updateCounter: function(e, t) {
                var n = ge("ui_rmenu_peer_" + t);
                if (n) {
                    var r = geByClass1("_im_r_ct", n),
                        i = e.get().tabs[t].unread;
                    val(r, i > 0 ? i : ""), toggleClass(n, "im-right-menu--unread", i > 0)
                }
            },
            unmount: function() {
                Object(h.destroyModule)(r), n.unmount()
            }
        }
    }

    function u(e, t, n) {
        1 === n.which && (e.get().peer && e.get().longpoll.push([Object(g.resetPeer)()]), e.get().longpoll.push([Object(g.changeTab)(t)]), cancelEvent(n))
    }

    function l(e, t, n) {
        var o = Object(d.mount)(e, Object(f["default"])({
                limit: 50,
                offset: 0,
                noScroll: !0,
                elements: r(t)
            }), function() {
                return {
                    idFn: function(e) {
                        return e.peer || "000"
                    },
                    renderFn: i.bind(null, t)
                }
            }),
            s = a.bind(null, t, o),
            l = Object(h.createModule)({
                handlers: function(n, r) {
                    r(e, "click", "_im_r_cl", s), r(e, "click", "_im_peer_tab", function(e, n) {
                        if (!checkEvent(e)) {
                            var r = intval(domData(n, "list-id"));
                            t.get().longpoll.push([Object(g.changePeer)(r, !1, !0, !0)]), cancelEvent(e)
                        }
                    }), _.FOLDERS.forEach(function(r) {
                        n(geByClass1("_ui_item_" + r, e.parentNode), "mousedown", u.bind(null, t, r))
                    })
                }
            });
        return c(e, t, o, l)
    }
    n.r(t), n.d(t, "mount", function() {
        return l
    });
    var d = n(73),
        f = n(188),
        p = n(81),
        m = n(41),
        g = n(132),
        h = n(110),
        _ = n(30)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t && (t.im_v = s), new Promise(function(r, i) {
            ajax.post(e, t, {
                timeout: n,
                onDone: function() {
                    r.apply(null, [
                        [].concat(Array.prototype.slice.call(arguments))
                    ])
                },
                onFail: function() {
                    return i.apply(null, arguments), !0
                }
            })
        })
    }

    function i(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = a(e, t, n),
            i = r.request;
        return i
    }

    function a(e, t) {
        function n() {
            i.abort()
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = void 0;
        i = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var a = new Promise(function(n, a) {
            var o = void 0,
                s = Date.now(),
                c = r.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) i.open("get", e + "?" + u), i.ontimeout = function() {
                a(["", {}])
            }, i.onerror = function() {
                a(["", {}])
            }, i.onload = function() {
                n([i.responseText, {}])
            }, setTimeout(function() {
                i.send()
            }, 0);
            else {
                i.onreadystatechange = function() {
                    4 == i.readyState && (clearInterval(o), i.status >= 200 && i.status < 300 ? n([i.responseText, i]) : a([i.responseText, i]))
                };
                try {
                    i.open("GET", e + "?" + u, !0)
                } catch (l) {
                    return a([l, i])
                }
                i.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * c && (a(["", {}]), clearInterval(o))
            }, 1e3)
        });
        return {
            request: a,
            cancel: n
        }
    }
    n.r(t), n.d(t, "CONTROLLER", function() {
        return o
    }), n.d(t, "post", function() {
        return r
    }), n.d(t, "plainget", function() {
        return i
    }), n.d(t, "plaingetCancelable", function() {
        return a
    });
    var o = "al_im.php",
        s = 2
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t, n) {
        return f(e, j, t, n)
    }

    function a(e, t, n) {
        return f(e, S, t, n)
    }

    function o(e, t, n, r) {
        var i = Object(v.unpackStore)(e),
            a = Object(v.getTab)(i, n || i.peer);
        return g(a, t) ? !1 : f(e, P, n, r)
    }

    function s(e, t, n) {
        return f(e, T, t, n)
    }

    function c(e, t, n, r) {
        var i = Object(v.unpackStore)(e),
            a = Object(v.getTab)(i, n || i.peer),
            o = f(e, I, n, r),
            s = p(a, w);
        return r = "undefined" == typeof r ? window.vk.id : r, g(a, t) ? !1 : s || g(a, r) || m(a, r) ? o : o && !m(a, t) && h(a, t)
    }

    function u(e, t, n) {
        return f(e, L, t, n)
    }

    function l(e, t, n) {
        return f(e, x, t, n)
    }

    function d(e, t, n) {
        return l(e, t, n) && !Object(b.isFvkcomgroup)(e, t)
    }

    function f(e, t, n, r) {
        var i = Object(v.unpackStore)(e);
        r = "undefined" == typeof r ? window.vk.id : r, n = "undefined" == typeof n ? i.peer : n;
        var a = Object(v.getTab)(i, n),
            o = !a.data.kicked && !a.data.closed,
            s = M[t],
            c = Object(b.isFvkcomgroup)(e, n);
        if (c && !i.gid) return !1;
        if (c) switch (t) {
            case P:
            case T:
            case I:
                return !1
        }
        switch (t) {
            case j:
            case S:
            case P:
                return p(a, s) ? m(a, r) && o : g(a, r);
            case T:
            case I:
            case L:
            case x:
                return p(a, s) ? m(a, r) && o : o
        }
        return !1
    }

    function p(e, t) {
        var n = e && e.data && e.data.flags || 0;
        return (n & t) > 0
    }

    function m(e, t) {
        var n = e && e.adminIds || [];
        return n.indexOf(+t) > -1
    }

    function g(e, t) {
        return e.ownerId === t
    }

    function h(e, t) {
        return -1 !== e.invitedByMe.indexOf(t)
    }
    n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
        return y
    }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK", function() {
        return w
    }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
        return O
    }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
        return C
    }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
        return k
    }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
        return E
    }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
        return j
    }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
        return S
    }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
        return T
    }), n.d(t, "MAIL_CHATS_ACTION_KICK_USER", function() {
        return I
    }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
        return L
    }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
        return x
    }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
        return P
    }), n.d(t, "canSeeInviteLink", function() {
        return i
    }), n.d(t, "canChangeInviteLink", function() {
        return a
    }), n.d(t, "canAddAdmin", function() {
        return o
    }), n.d(t, "canInviteUser", function() {
        return s
    }), n.d(t, "canKickUser", function() {
        return c
    }), n.d(t, "canPinOrUnpin", function() {
        return u
    }), n.d(t, "canChangeTitle", function() {
        return l
    }), n.d(t, "canChangeAvatar", function() {
        return d
    }), n.d(t, "checkChatRights", function() {
        return f
    }), n.d(t, "doesChatTabHaveFlag", function() {
        return p
    }), n.d(t, "isUserAdminInChat", function() {
        return m
    }), n.d(t, "isUserOwnerInChat", function() {
        return g
    }), n.d(t, "isUserInvitedByMe", function() {
        return h
    });
    var _, v = n(199),
        b = n(81),
        y = 1,
        w = 2,
        O = 4,
        C = 8,
        k = 16,
        E = 32,
        j = "see_invite_link",
        S = "change_invite_link",
        T = "invite_user",
        I = "kick_user",
        L = "pin_unpin",
        x = "change_title",
        P = "add_admin",
        M = (_ = {}, r(_, j, E), r(_, S, E), r(_, P, k), r(_, T, y), r(_, I, w), r(_, L, O), r(_, x, C), _)
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(35),
        c = n(121),
        u = n(163),
        l = n(65),
        d = n(41),
        f = n(56),
        p = window,
        m = p.unclean,
        g = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onSaveTitle = function(e) {
                    var t = a.props.store,
                        n = t.get(),
                        r = e.value.trim().replace("\n", "");
                    r && r !== m(a.props.title) && (a.setState({
                        titleChanged: !1
                    }), t.set(d.updateChatTopic.bind(null, n.peer, r)))
                }, a.onChangeTitle = function(e) {
                    if (a.state.title !== e.target.value) {
                        var t = e.target.value.replace("\n", "");
                        a.setState({
                            title: t,
                            titleChanged: m(a.props.title) !== t
                        })
                    }
                }, a.onValidateTitle = function(e) {
                    return !!e.trim().replace("\n", "")
                }, a.onCancelTitle = function() {
                    a.setState({
                        title: m(a.props.title),
                        titleChanged: !1
                    })
                }, a.onSaveDescription = function(e) {}, a.onPhotoUpload = function() {
                    var e = a.props.store,
                        t = e.get().peer;
                    Object(l.canChangeTitle)(e) && (cur.recieveCropResult = void 0, Page.ownerPhoto(t))
                }, a.onPhotoRemove = function() {
                    var e = a.props.store,
                        t = e.get().peer;
                    Object(l.canChangeTitle)(e) && e.set(d.removeChatPhoto.bind(null, t)).then(function() {
                        return e.set(d.getChatDetails.bind(null, t))
                    })["catch"](function(e) {
                        return Object(f.imWeirdCatch)("onPhotoRemove", e)
                    })
                }, a.state = {
                    title: m(n.title),
                    titleChanged: !1
                }, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.getLang,
                    n = e.store,
                    r = e.photo,
                    i = e.title,
                    a = e.description,
                    d = e.grid,
                    f = e.meta,
                    p = m(i),
                    g = Object(l.canChangeTitle)(n),
                    h = Object(s.classNames)("ChatSettingsInfo", {
                        "ChatSettingsInfo--editable": g
                    }),
                    _ = Object(s.classNames)("ChatSettingsInfo__title", {
                        "ChatSettingsInfo__title-service": 64 & this.props.flags
                    });
                return o.createElement("div", {
                    className: h
                }, o.createElement("header", {
                    className: "ChatSettingsInfo__header"
                }, o.createElement("div", {
                    className: "ChatSettingsInfo__photo"
                }, o.createElement("div", {
                    className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                    "data-tip": t("mail_settings_photo"),
                    onClick: this.onPhotoUpload
                }, r ? o.createElement("img", {
                    src: r,
                    width: "80",
                    height: "80",
                    alt: p,
                    className: "ChatSettingsInfo__photoSelf"
                }) : o.createElement("div", {
                    className: "nim-peer--photo-w"
                }, o.createElement("div", {
                    className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                    dangerouslySetInnerHTML: {
                        __html: d
                    }
                }))), r && g && o.createElement(c["default"], {
                    text: t("mail_settings_remove_photo"),
                    position: "t",
                    align: "left"
                }, o.createElement("button", {
                    onClick: this.onPhotoRemove,
                    className: "ChatSettingsInfo__photoRemove"
                }))), o.createElement("h3", {
                    className: _
                }, g ? o.createElement(u["default"], {
                    value: this.state.title,
                    changed: this.state.titleChanged,
                    useEnter: !0,
                    onSave: this.onSaveTitle,
                    onChange: this.onChangeTitle,
                    onCancel: this.onCancelTitle,
                    validate: this.onValidateTitle
                }) : p), o.createElement("div", {
                    className: "ChatSettingsInfo__meta"
                }, f)), a && o.createElement("div", {
                    className: "ChatSettingsInfo__description"
                }, g ? o.createElement(u["default"], {
                    value: a,
                    onSave: this.onSaveDescription
                }) : a))
            }, t
        }(o.PureComponent);
    t["default"] = g
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = parseInt(e / 60),
            n = e % 60;
        return t + ":" + (10 > n ? "0" : "") + n
    }

    function i(e) {
        var t = e.match(/.*\/(\w*).*/);
        switch (t[1]) {
            case "mpeg":
                return "mp3";
            case "ogg":
            case "webm":
            case "wav":
                return t[1]
        }
        return ""
    }

    function a(e) {
        return new Promise(function(t, n) {
            for (var r = new FormData, a = [], o = 0; o < e.wave.length; o++) a.push(parseInt(31 * e.wave[o]));
            r.append("waveform", JSON.stringify(a)), r.append("file", e.buffer, "voice_message." + i(e.mimeType));
            var s = new M;
            s.onload = s.onerror = function(e) {
                var r = e.currentTarget.response;
                200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
            }, s.open("POST", K.upload_url, !0), s.send(r)
        })
    }

    function o(e) {
        if (!Y) {
            Y = !0, Object(x.lockButton)(B);
            var t = {
                peer: G.get().peer,
                from_place: cur.docsChooseFrom,
                imhash: cur.docsChooseImHash,
                blockPersonal: cur.docsChooseBlockPersonal,
                mail_add: cur.docsChooseMailAdd
            };
            a(e).then(function(e) {
                return e.file ? new Promise(function(n, r) {
                    ajax.post("/docs.php", extend({
                        act: "a_save_doc",
                        from: "choose",
                        from_place: t.from_place,
                        imhash: t.imhash,
                        blockPersonal: t.blockPersonal,
                        mail_add: t.mail_add
                    }, e), {
                        onDone: function(e, r) {
                            p(), q([
                                ["doc", e + "_" + r, "audiomsg"]
                            ], {}, t.peer), w(), n()
                        },
                        onFail: function(e) {
                            r(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()
            }).then(function() {
                Object(x.unlockButton)(B), Y = !1
            })["catch"](function() {
                Y = !1, Object(x.unlockButton)(B), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
            })
        }
    }

    function s(e) {
        var t = URL.createObjectURL(Q.buffer);
        domData(V, "duration", Q.duration), domData(V, "ogg", t), domData(V, "mp3", t), geByClass1("audio-msg-track--duration", V).innerHTML = r(Q.duration), geByClass1("audio-msg-track--wave-wrapper", V).innerHTML = AudioMessagePlayer.getWave(Q.wave, $)
    }

    function c() {
        N.innerHTML = r(Q.duration), Q.duration >= P && v()
    }

    function u(e) {
        e.set(I.cancelRecording).then(h)
    }

    function l() {
        stManager.add(["voice_message_player.js", "speech.js"], function() {
            Q || (Q = Speech.newRecorder(), addEvent(Q, "progress", c)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Q.record().then(function() {
                f(G), b(), y(), W = Speech.createVisualization("wave", Q.source, D), W.start();
                var e = D.getBoundingClientRect();
                $ = (e.right - e.left) / 3
            })["catch"](function(e) {
                AudioMessagePlayer.resumeGlobalMedia();
                var t = e.name;
                switch (e.name) {
                    case "DevicesNotFoundError":
                    case "NotFoundError":
                        t = "mail_audio_message_device_error";
                        break;
                    case "PermissionDeniedError":
                    case "PermissionDismissedError":
                        t = "mail_audio_message_permission_error";
                        break;
                    case "Unsupported":
                        t = "mail_audio_message_unsupported_error"
                }
                showFastBox(getLang("global_error"), getLang(t)), console.error(e)
            })
        })
    }

    function d() {
        Q && Q.stop(), W && (W.destroy(), W = null)
    }

    function f(e) {
        K.isRecording = !0, cancelStackPush("audio_message_cancel", u.bind(null, e))
    }

    function p() {
        K.isRecording = !1, cancelStackFilter("audio_message_cancel")
    }

    function m() {
        g(), o(Q)
    }

    function g() {
        AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Q, "finish", g), removeEvent(Q, "finish", m), s(), removeClass(A, "im-audio-message_recording"), addClass(A, "im-audio-message_recorded")
    }

    function h() {
        p(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Q, "finish", g), removeEvent(Q, "finish", m), d(), w()
    }

    function _() {
        Q.isRecording ? (addEvent(Q, "finish", m), removeEvent(Q, "finish", g), d()) : o(Q)
    }

    function v() {
        addEvent(Q, "finish", g), removeEvent(Q, "finish", m), d()
    }

    function b() {
        hideProgress(geByClass1("im-audio-message-send-wrapper", A)), show(B), N.innerHTML = "0:00", addClass(A, "im-audio-message_recording"), removeClass(A, "im-audio-message_recorded")
    }

    function y() {
        show(A), hide(geByClass1("_im_chat_input_parent"))
    }

    function w() {
        removeClass(A, "im-audio-message_recorded"), removeClass(A, "im-audio-message_recording"), hide(A), show(geByClass1("_im_chat_input_parent"))
    }

    function O() {
        U = ge("audiomsg_record"), V = ge("audiomsg_player"), A = geByClass1("im-audio-message-input"), N = geByClass1("audio-msg-track--duration", A), D = geByClass1("audio-msg-track--wave", A), F = geByClass1("im-audio-message--cancel-btn", A), B = geByClass1("_im_audio_send", A), H = geByClass1("audio-msg-track--btn", A), z = geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
        var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
        addClass(e, "_voice_field_wrap"), k()
    }

    function C() {
        E(), U = V = A = N = D = R = F = B = H = null
    }

    function k() {
        addEvent(R, "click", l), addEvent(F, "click", h), addEvent(B, "click", _), addEvent(H, "click", v)
    }

    function E() {
        Q && removeEvent(Q, "progress", c), removeEvent(R, "click", l), removeEvent(F, "click", h), removeEvent(B, "click", _), removeEvent(H, "click", v)
    }

    function j(e, t, n) {
        return {
            cancelRecording: h,
            start: function() {
                l()
            },
            unmount: function() {
                h(), C()
            }
        }
    }

    function S(e, t, n, r) {
        G = t, K = t.get().audio_msg, q = n, Object(L.initFailBack)(), Object(x.getAvailableMicrophones)().then(function(e) {
            var n = e.length > 0;
            n ? (O(), r()) : setCookie("remixvoice", "0", 7), t.set(I.setVoiceMessageAvail.bind(null, n))
        })["catch"](function(e) {
            throw setCookie("remixvoice", "0", 7), e
        });
        var i = Object(T.createMutations)(j),
            a = i.bindMutations;
        return a(e, t, n)
    }
    n.r(t), n.d(t, "mount", function() {
        return S
    });
    var T = n(110),
        I = n(41),
        L = n(36),
        x = n(81),
        P = 600,
        M = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
        A = void 0,
        N = void 0,
        D = void 0,
        R = void 0,
        F = void 0,
        B = void 0,
        H = void 0,
        U = void 0,
        z = void 0,
        G = void 0,
        V = void 0,
        W = void 0,
        q = void 0,
        K = void 0,
        Q = !1,
        Y = !1,
        $ = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e ? e.ownerDocument || e : document,
            n = t.defaultView || window;
        return !(!e || !("function" == typeof n.Node ? e instanceof n.Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = e.split("_"),
            r = _(n, 2),
            i = r[0],
            a = r[1];
        return [i, a, t]
    }

    function i(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (a > 50) return [
            [], e.length
        ];
        for (var o = [], s = ""; n < e.length;) {
            var c = e[n];
            if ("id" === c) s = t[n];
            else if ("," === c && s) o.push(r(s)), s = "";
            else if ("(" === c) {
                var u = i(e, t, n + 1, a + 1),
                    l = _(u, 2),
                    d = l[0],
                    f = l[1];
                n = f, o.push(r(s, d)), s = ""
            } else if (")" === c) return "" !== s && o.push(r(s)), [o, n];
            n++
        }
        return s && o.push(r(s)), [o, n]
    }

    function a(e) {
        if (C[e]) return C[e];
        for (var t = e ? e.length : 0, n = [], r = [], a = "", o = 0; t > o; o++) {
            var s = e[o],
                c = s.charCodeAt(0);
            c >= 48 && 57 >= c || "_" === s || "-" === s ? a += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== a && (r.push(a), n.push("id"), a = ""), r.push(s), n.push(s))
        }
        a.length > 0 && (r.push(a), n.push("id"));
        var u = i(n, r),
            l = _(u, 1),
            d = l[0];
        return Object.keys(C).length > 300 && (C = {}), C[e] = d, d
    }

    function o(e, t) {
        for (var n = void 0, r = 0, i = e; null !== (n = h.MESSAGE_REGEXP.exec(e));) {
            n = u(n);
            var a = n[0].length,
                o = n.index + a,
                s = e[n.index - 1],
                c = e[o - 1],
                d = void 0 !== s && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(s),
                f = void 0 !== c && /([:;$])/i.test(c);
            if (!d && !f) {
                var p = l(n),
                    m = p.domain;
                if (m.length <= h.MAX_DOMAIN_LENGTH && -1 !== h.TOP_DOMAINS.indexOf(m)) {
                    var g = t(p);
                    i = i.slice(0, n.index + r) + g + i.slice(o + r), r += g.length - a
                }
            }
        }
        return i
    }

    function s(e, t) {
        return e.replace(h.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function c(e, t) {
        return e.replace(h.MENTION, t || function(e, t, n, r, i) {
            return '<a href="/' + (t + n) + '" class="mem_link" mention="' + y(r || "") + '" mention_id="' + y(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
        })
    }

    function u(e) {
        if (!e[0] || !e[6]) return e;
        var t = e[0].length - 1,
            n = e[6].length - 1;
        return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
    }

    function l(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function d() {
        return v || (v = new RegExp(h.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
    }

    function f(e, t) {
        return e.replace(d(), function(e, n, r, i, a, o) {
            return (n || "") + t(r + (a || ""))
        })
    }

    function p(e) {
        O("ttl_message_confirm_delivery", e)
    }

    function m(e, t) {
        var n = t.protocol,
            r = t.url,
            i = t.query,
            a = t.domain,
            o = t.full;
        try {
            o = decodeURIComponent(o)
        } catch (s) {}
        if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = y(o).replace(/&amp;/g, "&"), !e && a.match(h.OUR_DOMAINS)) {
            r = w(r).replace(h.ENTITIES, encodeURIComponent);
            var c = r,
                u = r.indexOf("#/"),
                l = "",
                d = void 0;
            return u >= 0 ? c = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (c = "/" + r.substr(u + 2).replace(/^\//, ""))), d = c.match(h.VK_DOMAIN), d && d[1].length < 32 && (l = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + g(n + r + i) + '" target="_blank"' + l + ">" + o + "</a>"
        }
        var f = "away.php?utf=1&to=" + encodeURIComponent(n + w(r + i)),
            p = y((n + r + i).replace(/'/g, "\\'")),
            m = "return goAway('" + p + "', {}, event);";
        return '<a href="' + f + '" target="_blank" onclick="' + m + '">' + o + "</a>"
    }

    function g(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    n.r(t), n.d(t, "parseFwd", function() {
        return a
    }), n.d(t, "replaceHyperLinks", function() {
        return o
    }), n.d(t, "replaceEmailLinks", function() {
        return s
    }), n.d(t, "replaceMentions", function() {
        return c
    }), n.d(t, "replaceHashtags", function() {
        return f
    }), n.d(t, "confirmDelivery", function() {
        return p
    }), n.d(t, "linksReplacer", function() {
        return m
    });
    var h = n(30),
        _ = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        v = void 0,
        b = window,
        y = b.clean,
        w = b.replaceEntities,
        O = b.statlogsValueEvent,
        C = {}
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(133)),
        c = n(35),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onChange = function(e) {
                    a.isControlledOutside || a.setState({
                        value: e.target.value
                    }), a.props.onChange && a.props.onChange(e)
                }, a.getRef = function(e) {
                    a.element = e
                }, "undefined" != typeof n.value ? a.isControlledOutside = !0 : a.state = {
                    value: n.initialValue || ""
                }, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.alignment,
                    n = e.value,
                    r = {
                        "Input--left": "left" === t,
                        "Input--center": "center" === t,
                        "Input--right": "right" === t
                    };
                return o.createElement("input", u({}, Object(s["default"])(this.props, ["onChange", "initialValue", "alignment", "className"]), {
                    className: Object(c.classNames)("Input", r, this.props.className),
                    ref: this.getRef,
                    value: this.isControlledOutside ? n : this.state.value,
                    onChange: this.onChange
                }))
            }, t
        }(o.Component);
    t["default"] = l, l.defaultProps = {
        type: "text",
        initialValue: "",
        alignment: "left"
    }
}, , function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        return Object(I.toArray)(e).find(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function a(e, t) {
        return Object(I.toArray)(e).findIndex(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function o(e, t, n, r) {
        if (n) {
            s(e, t, r);
            var a = domData(n, "list-id"),
                o = a && i(t.children, a);
            o && r.forEach(function(e) {
                return addClass(o, e)
            }), e.setState({
                hoveredListItemId: a
            })
        }
    }

    function s(e, t, n) {
        var r = domQuery("." + n.join("."), t);
        r && Object(I.toArray)(r).forEach(function(e) {
            n.forEach(function(t) {
                return removeClass(e, t)
            })
        }), e.setState({
            hoveredListItemId: null
        })
    }

    function c(e, t) {
        var n = t && domQuery("." + t.join("."), e)[0];
        return n ? domData(n, "list-id") : null
    }

    function u(e, t, n) {
        return e.map(t).reduce(function(e, t) {
            return e[t] = !0, e
        }, n)
    }

    function l(e, t, n) {
        var r = e.filter(function(e) {
            return !n.ids[t(e)]
        });
        return {
            _sortedEls: !1,
            els: r,
            ids: u(r, t, n.ids),
            elements: n.elements.concat(r)
        }
    }

    function d(e, t, n) {
        return {
            ids: u(n.get().elements, e, {}),
            scrolls: t,
            activated: !0
        }
    }

    function f(e, t, n) {
        return n.elements = n.elements.filter(function(n) {
            return t(n) !== e
        }), delete n.ids[e], Promise.resolve(n)
    }

    function p(e, t, n) {
        var r = [];
        n.elements = n.elements.map(function(n) {
            var i = t(n),
                a = e.filter(function(e) {
                    return t(e) === i
                })[0];
            return r.push(i), a || n
        });
        var i = e.filter(function(e) {
            return !inArray(t(e), r)
        });
        return n.elements = n.elements.concat(i), Promise.resolve(n)
    }

    function m(e, t) {
        var n = t.get();
        return !n._sortedEls && e && t.setState({
            elements: n.elements.sort(e),
            _sortedEls: !0
        }), t.get().elements
    }

    function g(e) {
        var t = {};
        return e.forEach(function(e) {
            "r" === e[0] && t["a," + e[1]] ? delete t["a," + e[1]] : t[e[0] + "," + e[1]] = e
        }), Object.keys(t).map(function(e) {
            return t[e]
        })
    }

    function h(e, t) {
        for (var n = [], r = Math.max(e.length, t.length), i = 0; r > i; i++) {
            var a = e[i],
                o = t[i];
            !a && o ? n.push(["a", o, i]) : a && !o ? n.push(["r", a, i]) : a !== o && (n.push(["r", a, i]), n.push(["a", o, i]))
        }
        var s = g(n),
            c = g(n.reverse());
        return s.length > c.length ? c : s
    }

    function _(e, t, n, r, i, a) {
        for (var o = 0; r > o; o++) e = domNS(e);
        var s = se(i(t));
        return domData(s, "list-id", n), e ? a.insertBefore(s, e) : a.appendChild(s), e
    }

    function v(e, t, n, r) {
        if (0 !== t.length) {
            t = t.sort(function(e, t) {
                return e[2] - t[2]
            });
            var i = t.filter(function(e) {
                    return "a" === e[0]
                }),
                a = t.filter(function(e) {
                    return "r" === e[0]
                });
            if (a.map(function(t) {
                    return e.children[t[2]]
                }).forEach(function(e) {
                    return re(e)
                }), 0 !== i.length)
                for (var o = i.shift(), s = o[2], c = _(e.children[s], n[o[2]], o[1], 0, r, e), u = 0; u < i.length; u++) o = i[u], c = _(e.children[s], n[o[2]], o[1], o[2] - s, r, e), s = o[2]
        }
    }

    function b(e, t) {
        e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
    }

    function y(e, t, n, r, i) {
        var a = r.get(),
            o = a.limit,
            s = a.offset,
            c = n().sortFn,
            u = m(c, r).slice(0, s + o),
            l = Object(I.toArray)(e.children).map(function(e) {
                return domData(e, "list-id")
            }).filter(function(e) {
                return !!e
            }),
            d = u.map(function(e) {
                return n().idFn(e).toString()
            }),
            f = h(l, d);
        return v(e, f, u, n().renderFn), b(r, t), i ? f.filter(function(e) {
            return "a" == e[0]
        }).map(function(e) {
            return parseInt(e[1])
        }) : void 0
    }

    function w(e, t, n, r) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1,
            o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            c = e.get(),
            u = t.getContainer().children,
            l = a(u, r || c.hoveredListItemId);
        if (!(0 > l)) {
            var d = void 0;
            d = c.limit + c.offset < l ? e.setState({
                offset: l - c.limit + 1
            }).then(y.bind(null, t.getContainer(), t, n)) : Promise.resolve(), d.then(function() {
                var e = u[l],
                    n = t.scrollTop(),
                    r = t.getScrollHeight(),
                    a = e.offsetHeight;
                o = "center" === o ? -.5 * t.getScrollHeight() : o, s = "center" === s ? r / 2 : s;
                var c = i ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    d = n + o > e.offsetTop,
                    f = a + e.offsetTop > n + r - s;
                d ? c(e.offsetTop - o) : f && c(e.offsetTop - r + a + s)
            })
        }
    }

    function O(e, t) {
        if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
        e.get().loading = !0;
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; n > i; i++) r[i - 2] = arguments[i];
        return t.apply(void 0, r).then(function() {
            e.get().loading = !1
        })
    }

    function C(e, t, n) {
        return n.scrolls || (n.scrolls = {}), (!n.scrolls[e] || t) && (n.scrolls[e] = {
            scrolled: n.scrolled || 0,
            scrollItem: n.scrollItem
        }), Promise.resolve(n)
    }

    function k(e, t, n, r) {
        var i = e.get(),
            a = i.elements,
            o = r.getContainer(),
            s = e.setState({
                offset: i.offset + i.limit
            }).then(function() {
                var n = i.offset,
                    s = i.limit,
                    c = void 0;
                return s + n > a.length ? c = t().more(n, s).then(function(t) {
                    return t === !1 ? [] : (0 === t.length && e.setState({
                        stop: !0
                    }), t)
                }).then(j.bind(null, e, o, r, t, i.pipeId)) : (c = Promise.resolve(), y(o, r, t, e)), c
            });
        if (!n) {
            var c = a.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
            Object(T.wrapLoading)(o)(s, "bottom", c)
        }
        return s
    }

    function E(e, t) {
        var n = e.get().pipeId;
        return !("undefined" != typeof n && "undefined" != typeof t && n !== t)
    }

    function j(e, t, n, r, i, a) {
        return E(e, i) ? e.setState(l(a, r().idFn, e.get())).then(y.bind(null, t, n, r)) : !1
    }

    function S(e, t, n) {
        var l = O.bind(null, t, k.bind(null, t, n)),
            m = function(e, r) {
                (t.get().activated || e) && ("undefined" != typeof r && t.get().elements.length > 0 && t.setState({
                    scrolled: r
                }), n().onScroll && n().onScroll())
            },
            g = Object(L.createScroll)(e, {
                noScroll: t.get().noScroll,
                nativeScroll: t.get().nativeScroll,
                scrollChange: m.bind(null, !1),
                more: n().more ? l.bind(null, !1) : !1
            }),
            h = Object(x.createModule)({
                handlers: function(r, i) {
                    i(e, "click", t.get().elCls, n().onClick)
                }
            });
        return t.setState(d(n().idFn, {}, t)), {
            pipe: function(e, r) {
                return t.setState({
                    pipeId: r
                }), e.then(j.bind(null, t, g.getContainer(), g, n, r))
            },
            replacePreserveOrder: function(e) {
                return t.set(p.bind(null, e, n().idFn)).then(y.bind(null, g.getContainer(), g, n))
            },
            pipeReplace: function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
                return t.setState({
                    pipeId: r,
                    stop: !1
                }), e.then(function(e) {
                    return E(t, r) ? t.setState({
                        elements: e,
                        _sortedEls: !1,
                        ids: u(e, n().idFn, {})
                    }).then(y.bind(null, g.getContainer(), g, n, t, i)) : void 0
                })
            },
            wipe: function() {
                g.getContainer().innerHTML = ""
            },
            deactivate: function() {
                t.setState({
                    activated: !1
                })
            },
            activate: function() {
                t.setState({
                    activated: !0
                })
            },
            saveScroll: function(e, n) {
                return t.set(C.bind(null, e, n))
            },
            updateScroll: function() {
                g.update(!1, !0)
            },
            toTop: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                t ? g.smoothScroll(-g.scrollTop()) : g.scrollTop(0), e && m(e, 0)
            },
            scrollTop: function(e) {
                return g.scrollTop(e)
            },
            restoreScroll: function(e) {
                var n = t.get().scrolls,
                    i = n[e];
                return i && (t.setState({
                    scrolls: extend({}, n, r({}, e, null))
                }), g.scrollTop(i.scrolled)), !!i
            },
            unsetScroll: function(e) {
                t.setState({
                    scrolls: extend({}, t.get().scrolls, r({}, e, null))
                })
            },
            scrollPage: function(e, t) {
                var n = g.scroll.scroller,
                    r = g.scrollTop(),
                    i = "up" === e ? -1 : 1,
                    a = r + i * n.clientHeight;
                t ? g.smoothScroll(a - r) : g.scrollTop(a)
            },
            scrollToElement: function(e, r, i, a) {
                w(t, g, n, e, r, i, a)
            },
            checkMore: function(e) {
                return t.get().elements.length < t.get().limit ? l(e, g) : Promise.resolve([])
            },
            add: function(e, r) {
                return j(t, g.getContainer(), g, n, r, e)
            },
            hoverNextElement: function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = g.getContainer(),
                    u = s.children,
                    l = t.get().hoveredListItemId || c(s, r),
                    d = a(u, l),
                    f = Object(I.toArray)(u).slice(d + 1).find(n().hoverableFn);
                o(t, s, f, e), w(t, g, n, null, !1, i.top, i.bottom)
            },
            hoverPrevElement: function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = g.getContainer(),
                    u = s.children,
                    l = t.get().hoveredListItemId || c(s, r),
                    d = a(u, l),
                    f = d >= 0 && Object(I.toArray)(u).slice(0, d).reverse().find(n().hoverableFn);
                o(t, s, f, e), w(t, g, n, null, !1, i.top, i.bottom)
            },
            hoverFirstElement: function(e, r) {
                var i = g.getContainer(),
                    a = i.children,
                    s = Object(I.toArray)(a).findIndex(n().hoverableFn),
                    c = a[s];
                !t.get().hoveredListItemId && c && (o(t, i, c, e), w(t, g, n, s, !1, r.top, r.bottom))
            },
            hoverElement: function(e, r, i) {
                var s = g.getContainer(),
                    c = s.children,
                    u = a(c, e),
                    l = c[u];
                l && (o(t, s, l, r), w(t, g, n, u, !1, i.top, i.bottom))
            },
            unhoverElements: function(e) {
                s(t, g.getContainer(), e)
            },
            reset: function() {
                var e = t.get().scrolls;
                t.reset(), t.setState(d(n().idFn, e, t))
            },
            getHoveredElement: function() {
                return i(g.getContainer().children, t.get().hoveredListItemId)
            },
            getCurrentElements: function() {
                return t.get().elements
            },
            isLoading: function() {
                return t.get().loading
            },
            isEmpty: function() {
                return 0 === t.get().elements.length
            },
            remove: function(e) {
                t.set(f.bind(null, e, n().idFn)).then(y.bind(null, g.getContainer(), g, n))
            },
            unmount: function() {
                Object(x.destroyModule)(h), g.destroy()
            }
        }
    }
    n.r(t), n.d(t, "createIdMap", function() {
        return u
    }), n.d(t, "addElements", function() {
        return l
    }), n.d(t, "collapseOps", function() {
        return g
    }), n.d(t, "distance", function() {
        return h
    }), n.d(t, "mount", function() {
        return S
    });
    var T = n(81),
        I = n(145),
        L = n(181),
        x = n(110)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = void 0,
            r = void 0,
            i = function(i) {
                n = "undefined" != typeof i.clientX ? i.clientX : i.touches[0].clientX, r = "undefined" != typeof i.clientY ? i.clientY : i.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, r)
            },
            a = function s(a) {
                t.onDrop && t.onDrop.call(e, n, r), removeEvent(document, "mouseup touchend mouseleave", s), removeEvent(document, "mousemove touchmove", i)
            },
            o = function(o) {
                (1 === o.which || o.touches && o.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", a), addEvent(document, "mousemove touchmove", i), n = "undefined" != typeof o.clientX ? o.clientX : o.touches[0].clientX, r = "undefined" != typeof o.clientY ? o.clientY : o.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, r), t.onDrag && t.onDrag.call(e, n, r), cancelEvent(o))
            };
        e.beginDragHandler = o, addEvent(e, "mousedown touchstart", o)
    }

    function i(e) {
        removeEvent(e, "mousedown touchstart", e.beginDragHandler)
    }
    n.r(t), n.d(t, "initDraggable", function() {
        return r
    }), n.d(t, "removeDraggable", function() {
        return i
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.queue || e.key
    }

    function i(e) {
        return window.curNotifier ? !curNotifier.addQueues[r(e)] : !1
    }

    function a(e) {
        return window.curNotifier ? void!curNotifier.addQueues[r(e)] : !1
    }

    function o() {
        m.forEach(function(e, t) {
            var n = e.onData,
                r = e.onUpdateKey,
                a = e.ts;
            i(t) && Notifier.addKey(extend(t, {
                ts: a
            }), l.bind(null, n, r, t))
        })
    }

    function s() {
        g || (g = setInterval(o, 3e3))
    }

    function c(e) {
        a(e), m["delete"](e), 0 === m.size && (clearInterval(g), g = !1)
    }

    function u(e, t, n, r) {
        var i = void 0;
        switch (e) {
            case 1:
            case 2:
            case 3:
            case 5:
                i = r(t, e);
                break;
            case 4:
                i = Object(p.pause)(1).then(function() {
                    return t
                });
                break;
            default:
                throw new Error("Unkonwn error from queue: " + e)
        }
        Object(p.pause)(3).then(function() {
            return i
        }).then(function(e) {
            m.set(e, {
                onUpdateKey: r,
                onData: n,
                ts: e.ts
            }), o(), s()
        })
    }

    function l(e, t, n, r, i) {
        return i.failed ? (c(n), void u(i.err, n, e, t)) : (m.set(n, {
            onData: e,
            onUpdateKey: t,
            ts: intval(i.ts)
        }), void i.events.map(function(e) {
            return e.split("<!>")
        }).forEach(e))
    }

    function d(e, t, n) {
        return Notifier.addKey(e, l.bind(null, t, n, e)), m.set(e, {
            onData: t,
            onUpdateKey: n,
            ts: e.ts
        }), s(), {
            stop: c.bind(null, e)
        }
    }
    n.r(t), n.d(t, "createWorker", function() {
        return d
    });
    var f = n(187),
        p = n(27),
        m = new f,
        g = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = Object(g.getTab)(e, e.get().peer);
        t && t.data && !t.data.closed && !t.data.kicked ? i(e) : a()
    }

    function i(e) {
        var t = s();
        t && f.render(d.createElement(p["default"], {
            store: e,
            getLang: w,
            closePopup: a,
            updatePopup: o
        }), t)
    }

    function a() {
        C && C.hide()
    }

    function o() {
        C && C.updateBoxCoords()
    }

    function s() {
        return document.querySelector("#ChatSettings")
    }

    function c(e) {
        var t = document.querySelector("#box_layer_wrap"),
            n = document.querySelector("#box_loader"),
            r = y(t);
        return {
            unmount: function() {
                var t = s();
                t && f.unmountComponentAtNode(t), Object(l.destroyModule)(e)
            },
            showLoader: function() {
                O(n), v(n), r || v(t)
            },
            hideLoader: function() {
                b(n), r || b(t)
            }
        }
    }

    function u(e, t, n) {
        var a = Object(l.createMutations)(c),
            o = a.bindMutations,
            s = t.get(),
            u = Object(l.createModule)({
                handlers: function(e, t) {}
            }),
            d = o(u),
            f = {
                hideButtons: !0,
                bodyStyle: "padding: 0; background: none;",
                width: 560,
                onShow: function() {
                    i(t), t.subscribe(r), requestAnimationFrame(function() {
                        return C.updateBoxCoords()
                    })
                },
                onHideAttempt: function() {
                    return t.unsubscribe(i), d.unmount(), !0
                }
            };
        return d.showLoader(), t.set(m.getChatDetails.bind(null, s.peer)).then(function(e) {
            d.hideLoader(), C = new _(f).content('<div id="ChatSettings"></div>').show()
        }), d
    }
    n.r(t), n.d(t, "mount", function() {
        return u
    });
    var l = n(110),
        d = n(83),
        f = n(204),
        p = n(95),
        m = n(41),
        g = n(199),
        h = window,
        _ = h.MessageBox,
        v = h.show,
        b = h.hide,
        y = h.isVisible,
        w = h.getLang,
        O = h.boxRefreshCoords,
        C = void 0
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return "im_store_" + e
    }

    function i(e) {
        return ls.get(r(e)) || {}
    }

    function a(e, t, n) {
        if (ls.checkVersion()) {
            var i = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", i.length), n(r(e), i)
        }
    }

    function o(e, t, n) {
        return t === f ? e[t] || [] : t === p ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
    }

    function s(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case f:
                var r = n;
                r && r.length > 0 ? e[t] = r : delete e[t];
                break;
            case p:
                var i = d(n, 2),
                    a = i[0],
                    o = i[1];
                o ? e[t][a] = +o : delete e[t][a]
        }
        return e
    }

    function c(e, t) {
        for (var n = ["fwd", "draft", "bind_attach"], r = i(e), o = !1, s = n.length; s--;) n[s] in r && (delete r[n[s]], o = !0);
        o && a(e, r, t)
    }

    function u(e, t, n) {
        n.key === r(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
    }

    function l(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && c(e, t);
        var n = {
                db: i(e),
                checkTime: Date.now()
            },
            r = u.bind(null, e, n);
        return window.addEventListener("storage", r, !1), {
            select: function(t, r) {
                return Date.now() - n.checkTime > 1e3 && (n.db = i(e)), o(n.db, t, r)
            },
            selectByKey: function(t) {
                return Date.now() - n.checkTime > 1e3 && (n.db = i(e)), n.db[t]
            },
            update: function(r, i) {
                var o = s(n.db, r, i);
                return n.db = o, n.checkTime = Date.now(), a(e, o, t)
            },
            updateByKey: function(r, i) {
                return n.db[r] = i, n.checkTime = Date.now(), a(e, n.db, t)
            },
            unmount: function() {
                window.removeEventListener("storage", r, !1)
            }
        }
    }
    n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
        return f
    }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
        return p
    }), n.d(t, "deleteOldStoredFormat", function() {
        return c
    }), n.d(t, "mount", function() {
        return l
    });
    var d = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        f = "recent_search",
        p = "pin_hide"
}, function(e, t, n) {
    var r = n(38)("iterator"),
        i = !1;
    try {
        var a = [7][r]();
        a["return"] = function() {
            i = !0
        }, Array.from(a, function() {
            throw 2
        })
    } catch (o) {}
    e.exports = function(e, t) {
        if (!t && !i) return !1;
        var n = !1;
        try {
            var a = [7],
                o = a[r]();
            o.next = function() {
                n = !0
            }, a[r] = function() {
                return o
            }, e(a)
        } catch (s) {}
        return n
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        var n = e ? e.indexOf(t) : 0;
        return -1 === n ? (e.push(t), !0) : !1
    }

    function a(e, t) {
        var n = e ? e.indexOf(t) : -1;
        return -1 !== n ? (e.splice(n, 1), !0) : !1
    }

    function o(e, t, n) {
        if (Object(d.isTabLoaded)(n.get(), e)) {
            var a = Object(f.getTab)(n, e);
            i(a.memberIds, t) && a.membersCount++, t === vk.id && (a.data.kicked = 0, a.data.closed = 0)
        }
        return n.set(p.loadChatMember.bind(null, r({}, e, [t]))).then(function(r) {
            return t === vk.id && n.get().peer === e ? n.set(p.getPinnedMessage.bind(null, e)) : void 0
        })
    }

    function s(e, t, n, r, i) {
        if (Object(d.isTabLoaded)(r.get(), e)) {
            var o = Object(f.getTab)(r, e);
            a(o.memberIds, t) && o.membersCount--, t === vk.id && (n ? o.data.kicked = 1 : o.data.closed = 1)
        }
        return t === vk.id && r.get().peer === e ? (i.cancelEditing(), r.set(p.unpinMessageOptimistic.bind(null, e))) : Promise.resolve()
    }

    function c(e, t, n, r, c, d) {
        var C = Object(f.getTab)(e, t);
        switch (n) {
            case g:
            case w:
                return n === g ? i(C.adminIds, r) : a(C.adminIds, r), u(e, t, c), !0;
            case h:
                return C.data.flags = r, u(e, t, c), !0;
            case _:
                return delete C.pinHideId, cur.imDb.update(m.PIN_HIDDEN_ID_OP, [C.peerId, void 0]), !1;
            case v:
                return o(t, r, e).then(function() {
                    return l(e, t, c, d)
                }), !0;
            case b:
            case y:
                return s(t, r, n === y, e, c).then(function() {
                    return l(e, t, c, d)
                }), !0;
            case O:
                return e.set(p.loadBanner.bind(null, t)).then(function() {
                    return c.updateBanner(e)
                }), !0;
            default:
                return !1
        }
    }

    function u(e, t, n) {
        e.get().peer === t && (Object(p.setActions)(e.get()), n.updateActions(e))
    }

    function l(e, t, n, r) {
        e.get().peer === t && (Object(p.setActions)(e.get()), n.updateChat(e, t), r.updateDialog(t, e))
    }
    n.r(t), n.d(t, "chatUserHasJoined", function() {
        return o
    }), n.d(t, "chatUserHasLeft", function() {
        return s
    }), n.d(t, "handleEventChatUpdated", function() {
        return c
    });
    var d = n(81),
        f = n(199),
        p = n(41),
        m = n(77),
        g = 3,
        h = 4,
        _ = 5,
        v = 6,
        b = 7,
        y = 8,
        w = 9,
        O = 10
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return ge("im_dialogs_search", e)
    }

    function i(e, t, n, r, i, a) {
        var o = trim(a);
        if (Object(w.isSearchingValue)(e, o)) {
            var s = d.bind(null, e, n, i, t);
            o ? (e.setState({
                recentSearch: !1
            }), i.stop()) : i.replaceOrAdd(s), cancelStackPush("im_search", s), o && e.set(y.setCurrentSearch.bind(null, o, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
        } else o || (i.stop(), e.set(y.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
    }

    function a(e, t, n) {
        return function() {
            var r = Object(w.getSearchText)(t);
            r === e && n.apply(void 0, arguments)
        }
    }

    function o(e, t, n) {
        var r = t().appendFastDialogs.bind(null, n),
            i = a(e, n, r);
        return Object(y.searchTopConv)(e, n.get()).then(function(e) {
            var t = e;
            return i(t), e
        })
    }

    function s(e, t, n) {
        var r = Object(w.getSearchText)(n);
        return x(.01, "im_search_stat", 1, "search_start"), Object(y.updateSearchQuery)(r), n.setState({
            recentSearch: !1
        }), r ? (n.get().dialog_search_going = !0, o(r, e, n).then(function(i) {
            var a = i.map(function(e) {
                return e.peerId
            });
            return t(r, e, a, n)
        }).then(function(e) {
            n.get().dialog_search_going = !1
        })["catch"](function() {})) : (e().restoreDialogs(n, !1, !0), Promise.resolve(!1))
    }

    function c(e, t, n, r) {
        var i = r.get(),
            o = a(e, r, t().appendDialogs.bind(null, r)),
            s = a(e, r, t().appendSearch);
        return Object(O.isPendingForward)(r) ? Object(y.searchHints)(e, n, "all", i).then(o) : Promise.all([Object(y.searchHints)(e, n, "all", i).then(o), Object(y.searchMessages)(e, i)]).then(function(e) {
            var t = L(e, 2),
                n = L(t[1], 2),
                i = n[0],
                a = n[1];
            s(r, i, a, !0)
        })
    }

    function u(e, t, n) {
        n().showCreation(e)
    }

    function l(e, t, n, a, o) {
        var s = r(t);
        s.value = o, i(e, a, t, s, n, s.value)
    }

    function d(e, t, n, a) {
        cancelStackFilter("im_search");
        var o = r(t);
        uiSearch.reset(o), e.setState({
            recentSearch: !1
        }), i(e, a, t, o, n, o.value)
    }

    function f(e, t, n, r, i, a) {
        Object(w.isSearching)(e) ? (d(e, t, i, n), setTimeout(function() {
            return m(e, a)
        }, 10)) : (window.tooltips && tooltips.hide(a, {
            showsp: 0
        }), u(e, a, r))
    }

    function p(e, t, n, r, i) {
        return Object(O.showFavvedBox)(e, n, T.mount, r)
    }

    function m(e, t) {
        return showTooltip(t, {
            appendEl: bodyNode,
            text: function() {
                return Object(w.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
            },
            black: 1,
            shift: [3, -1],
            appendCls: "js-im-page"
        })
    }

    function g(e, t, n) {
        var r = n.target;
        e.set(y.toggleCommunityMute.bind(null, t)).then(function() {
            toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && _(e, {
                target: r
            })
        })
    }

    function h(e, t, n, r, a) {
        if (!Object(w.isSearching)(e)) {
            var o = cur.imDb.select(I.RECENT_SEARCH_OP);
            if (0 !== o.length || Object(w.doPopularSuggExist)(e)) {
                e.setState({
                    recentSearch: !0
                }), i(e, function() {
                    Object(w.isSearching)(e) || (r.stop(), a().restoreDialogs(e, !1, !0))
                }, t, n, r, "");
                var s = o.filter(function(t) {
                        return !Object(O.isTabLoadedWithMessage)(e.get(), t)
                    }),
                    c = o.filter(function(t) {
                        return Object(O.isTabLoadedWithMessage)(e.get(), t)
                    }).reduce(function(t, n) {
                        return t[n] = Object(w.getTab)(e, n), t
                    }, {});
                e.get().topConvTree.then(function(t) {
                    var n = t.list.filter(function(e) {
                            return inArray(e[0], s)
                        }).reduce(function(e, t) {
                            return e[t[0]] = Object(y.localIndexToDialog)(t), e
                        }, {}),
                        r = extend({}, n, c);
                    return a().appendFastDialogs(e, o.map(function(e) {
                        return r[e]
                    })), Object(y.searchHints)(!1, Object.keys(n), !1, e.get())
                }).then(function(t) {
                    a().appendDialogs(e, t)
                })
            }
        }
    }

    function _(e, t) {
        var n = t.target;
        return showTooltip(n, {
            text: function() {
                return e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
            },
            black: 1,
            shift: [13, 9],
            appendCls: "js-im-page"
        })
    }

    function v(e, t, n, i, a, o) {
        return {
            focusInput: function(t) {
                uiSearch.focus(r(e).parentNode)
            },
            createCanceled: function(e, n) {
                removeClass(t, "im-dialog-select_rotated")
            },
            rotateCross: function(e) {
                addClass(t, "im-dialog-select_rotated")
            },
            setSearch: function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    a = r ? o : function() {};
                l(t, e, i, a, n)
            },
            clearSearch: function(t) {
                d(t, e, i, function() {})
            },
            updateImportantCnt: function(t) {
                var n = t.get().important_cnt,
                    r = geByClass1(P, e);
                toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
            },
            unmount: function() {
                i.stop(), Object(k.destroyModule)(a), uiSearch.destroy(n), cancelStackFilter("im_search")
            }
        }
    }

    function b(e, t, n) {
        var a = geByClass1("_im_search_croll", e),
            o = r(e),
            u = Object(C["default"])("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
            l = Object(j.debouncedPromise)(c, 300),
            d = s.bind(null, n, l),
            b = i.bind(null, t, d, e, o, u),
            y = f.bind(null, t, e, d, n, u, a),
            w = p.bind(null, t, e, n),
            E = geByClass1("_im_dialogs_search_input", e);
        uiSearch.init(E, {
            onChange: b
        });
        var T = m.bind(null, t, a),
            I = geByClass1(M, e);
        o.value && b(o.value);
        var L = Object(k.createModule)({
            handlers: function(r, i) {
                if (r(geByClass1("_im_av_time", e), "mouseover", function(e) {
                        showTooltip(e.target, {
                            text: getLang("mail_admin_av_time"),
                            dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                            shift: [0, 8]
                        })
                    }), r(a, "click", y), r(a, "mouseover", T), r(geByClass1(P, e), "click", w), Object(O.isClassicInterface)(t)) {
                    var s = g.bind(null, t, !0),
                        c = _.bind(null, t);
                    r(I, "click", s), r(I, "mouseover", c)
                }
                r(o, "focus", function() {
                    t.get().longpoll.push([Object(S.transitionEvent)("search")])
                }), r(o, "click", function() {
                    h(t, e, o, u, n)
                }), r(o, "blur", function() {
                    var e = void 0;
                    e = 0 === t.get().peer ? "search" : Object(O.isPendingForward)(t) ? "search" : "default", t.get().longpoll.push([Object(S.transitionEvent)(e)])
                })
            }
        });
        return Object(O.isClassicInterface)(t) && g(t, !1, {
            target: I
        }), v(e, a, E, u, L, d)
    }
    n.r(t), n.d(t, "mount", function() {
        return b
    });
    var y = n(41),
        w = n(199),
        O = n(81),
        C = n(82),
        k = n(110),
        E = n(141),
        j = n(27),
        S = n(132),
        T = n(62),
        I = n(77),
        L = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        x = debounce(E.statlogsProbValueEvent, 1e3),
        P = "_im_important_counter",
        M = "_im_gim_mute"
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i() {
        var e = ln.get(sr);
        return e || 0
    }

    function a(e) {
        e >= window.clientHeight() - 30 && (e = 0), ln.set(sr, e)
    }

    function o(e, t) {
        var n = jn(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && Mn(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function s(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function c(e, t, n, r) {
        var i = t && !n ? 1 : !t && n ? -1 : 0;
        i && !Object(Et.isClassicInterface)(e) && r().compensateHistoryHeightChange(i)
    }

    function u(e, t, n, r) {
        var i = window.devicePixelRatio >= 2 ? "256" : "128",
            a = "animation" === n,
            o = "im_gift";
        a && (o += " sticker_img");
        var s = "/images/stickers/" + hn(e) + "/" + i + ".png",
            c = '<img height="128" class="' + o + '" src="' + s + '"/>';
        if (a) {
            var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                l = "animatedSticker" + r;
            c = '<div id="' + l + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + hn(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + c + "</div>";
            var d = !1;
            browser.msie ? (0 ^ r) === r && (d = !0) : d = Number.isInteger(r), d && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(l, 10)
        }
        return t && (c = '<a onmouseover="return Emoji.stickerOver(' + hn(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + hn(t) + ', this, event);">' + c + "</a>"), c = '<div class="im_sticker_row">' + c + "</div>"
    }

    function l(e, t, n) {
        var r = e.get ? e.get() : e;
        if (D(r, t)) {
            var i = r.tabs[t].deleted || [];
            return gn(n, i)
        }
        return !1
    }

    function d(e, t, n) {
        var r = n.randomId,
            i = jn("_im_mess_rid" + r, t);
        return i && (t = ae([i], t), t = k(e, n, t, !0, !1)), t
    }

    function f(e) {
        var t = Object(Et.checkVoiceMessageAvailable)(e);
        return browser.mobile && browser.safari ? Promise.resolve(!1) : "undefined" != typeof t ? Promise.resolve(t) : p().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function p() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function m(e) {
        return Nn("im_preloader", {
            preloader: pn(un.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function g(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function h(e) {
        var t = jn("_im_invisible_bar", e);
        t && (In(t, "_im_invisible_bar"), In(t, "im-page--history-new-bar_hide"))
    }

    function _(e, t, n) {
        var r = kn(n, "msgid"),
            i = jn("_im_mess_" + r, t),
            a = n.cloneNode(!0);
        return i && (i.parentNode.replaceChild(a, i), w(t)), t
    }

    function v(e, t, n) {
        var r = b(e, t),
            i = jn("_im_mess_" + t.messageId, n);
        return i && (i.parentNode.replaceChild(dn(r), i), w(n)), n
    }

    function b(e, t) {
        var n = ["_im_mess"],
            r = Object(jt.isUnread)(e.tabs[t.peerId], t);
        Object(jt.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(jt.isOut)(t) && n.push("im-mess_out"), Object(jt.wasEdited)(t) && n.push("im-mess_was_edited"), Object(Pt.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(jt.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
        var i = Date.now() - 1e3 * t.date > 1e3;
        t.local && i && n.push("im-mess_sending"), t.local && n.push("" + Ft), t.local && Object(jt.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Bt), Object(jt.isGift)(t) && n.push("im-mess_gift");
        var a = y(t),
            o = U(e, t.text, t.kludges);
        "" != o && Object(jt.wasEdited)(t) && (o += Nn("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !P(t.peerId) && (o = Nn("im_topic", {
            topic: t.subject
        }) + o);
        var s = Nn("im_message_media", {
            messageId: t.messageId,
            attaches: a.join(""),
            text: Object(jt.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
        });
        return Object(jt.isGift)(t) || (s = o + s), "" == o && Object(jt.wasEdited)(t) && (s += Nn("sImLblWasEdited", {
            update_time: t.update_time
        })), Nn("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: s,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + Dn("mail_send_message_error") + '" role="link"' : "",
            unread_params: r ? 'aria-label="' + Dn("mail_unread_message") + '"' : "",
            cls: n.join(" ")
        })
    }

    function y(e) {
        return e.attaches.map(function(t) {
            return "sticker" === t.type ? e.messageId ? u(t.id, t.productId, t.kind, e.messageId) : u(t.id, t.productId) : m(t.type)
        })
    }

    function w(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) xn(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", Nn("sImHistoryRowActions")), In(t[n], "_im_mess_noa")
    }

    function O(e) {
        var t = Math.floor(e / 3600),
            n = Math.floor(e / 60) - 60 * t,
            r = e - 3600 * t - 60 * n,
            i = [t, n, r],
            a = !1,
            o = !1;
        return i.reduce(function(e, t) {
            if (0 === t && !o) return o = !0, e;
            a && (t = 10 > t ? "0" + t : t);
            var n = "" + e + ("" !== e ? ":" : "") + t;
            return a = !0, o = !0, n
        }, "")
    }

    function C(e, t, n) {
        var r = un.id,
            i = e.attaches[0],
            a = i.initiatorId,
            o = i.state,
            s = i.receiverId,
            c = void 0;
        switch (o) {
            case "reached":
                c = Dn(r === a ? "mail_call_outgoing" : "mail_call_incoming");
                var u = t ? "" : O(i.duration);
                c = c.replace("{duration}", u);
                break;
            case "canceled_by_initiator":
                c = Dn(r === a ? "mail_call_canceled" : "mail_call_missed");
                break;
            case "canceled_by_receiver":
                if (r === a) {
                    if (t) return Dn("mail_call_declined");
                    var l = Object(Lt.oCacheGet)(n, s);
                    return l ? Rn(l.sex, Dn("mail_call_declined_by", "raw")).replace("{user_name}", l.first_name) : Dn("mail_call_declined")
                }
                return Dn("mail_call_canceled");
            default:
                c = Dn("mail_added_call")
        }
        return Nn("im_calls_link", {
            text: c
        })
    }

    function k(e, t, n) {
        var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            a = Date.now() - 1e3 * t.date > 1e3,
            o = e.tabs[t.peerId];
        if (!n || jn("_im_mess", n) || jn("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
        var s = [];
        t.local || (s = e.imQueue(t.peerId, r)), s.length > 0 && ae(s.map(function(e) {
            return jn("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        }));
        var c = b(e, t),
            u = wn(n);
        xn(u, "_im_mess_stack") || (u = Cn(u, "._im_mess_stack", -1));
        for (var l = Object(Et.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && l && !jn("_im_mess_" + l.messageId);) l = Object(Et.getLastMessage)(e, t.peerId, l.messageId);
        var d = jn("_im_unread_bar_row", n),
            f = Object(jt.getUserId)(t),
            p = l ? F(l.date, e) : 0;
        if (!l || B(o, l, t, e, i)) {
            var m = "",
                g = !1;
            if (d && Object(jt.isOut)(t) && Ke(e, n, t.peerId), 1 === o.unread && !Object(jt.isOut)(t) && i && (m += Nn("im_mess_bar", {}), g = !0, Ke(e, n, t.peerId)), !Vn(new Date(p))) {
                var h = new Date,
                    _ = g ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                m += Nn("im_day_bar", {
                    day: zn(t.date, e.timeshift, !0, Dn("months_of", "raw"), !0),
                    date: t.date,
                    day_class: h.getDate() + h.getMonth() + h.getFullYear() + " " + _
                })
            }
            if (Object(jt.isServiceMsg)(t)) m += Nn("im_service_row", {
                text: pe(e, t, o),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else if (Object(jt.isCallMessage)(t)) m += Nn("im_service_row", {
                text: fe("", C(t, !1, e), ""),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var v = e.gid && Object(jt.isOut)(t) ? hn(t.kludges.from_admin) || 0 : 0,
                    y = Object(Lt.oCacheGet)(e, v ? -e.gid : f) || o,
                    O = P(t.peerId) ? y.name : y.first_name,
                    k = y.link || o.href,
                    j = Nn("im_mess_stack_name", {
                        name: O,
                        link: k,
                        "class": Object(jt.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if (Object(jt.isGift)(t)) {
                    var S = Dn("mail_gift_message_sent", "raw");
                    j += ' <span class="im-mess-stack--gift">' + Rn(y.sex || 0, S) + "</span>"
                }
                if (Object(jt.isMoney)(t)) {
                    var T = Object(jt.isMoneyRequest)(t) ? Dn("mail_money_request_message_sent", "raw") : Dn("mail_money_tranfer_message_sent", "raw");
                    j += ' <span class="im-mess-stack--money-transfer">' + Rn(y.sex || 0, T) + "</span>"
                }
                var I = e.gid ? "/gim" + e.gid : "/im",
                    L = void 0;
                if (L = t.local ? H(t.date, e.timeshift) : Nn("im_stack_date", {
                        date: H(t.date, e.timeshift),
                        link: I + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), v && e.admins[v]) {
                    var x = e.admins[v],
                        M = v === un.id ? Dn("mail_by_you") : x[0];
                    L = L + " " + Nn("im_admin_link", {
                        name: M,
                        href: x[1]
                    })
                }
                m += Nn("im_mess_stack", {
                    photo: y.photo,
                    href: k,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: vn(j),
                    stack_name: j,
                    peerId: f,
                    date: L,
                    messages: c,
                    admin: t.kludges.from_admin || 0
                })
            }
            Object(It.toArray)(mn(m)).forEach(function(e) {
                return n && n.appendChild(e)
            })
        } else d && e.peer === t.peerId && !o.inplaceSearch && Object(jt.isOut)(t) && Ke(e, n, t.peerId), jn("_im_stack_messages", u).appendChild(dn(c));
        return Object(jt.isOut)(t) && !a && setTimeout(function() {
            var e = jn("_im_mess_" + t.messageId, n);
            xn(e, Ft) && Tn(e, "im-mess_sending")
        }, 500), s = s.filter(function(e) {
            return e.rid !== t.randomId
        }), w(n), E(s, e, n)
    }

    function E(e, t, n) {
        var r = void 0;
        return r = "object" === ("undefined" == typeof e ? "undefined" : Rt(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return Object(Et.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return k(t, e, n, !1)
        }), n
    }

    function j(e) {
        var t = jn("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function S(e, t, n) {
        var r = e.tabs[t];
        return Object(It.toArray)(En("_im_mess_unread", n)).forEach(function(e) {
            var t = hn(kn(e, "msgid"));
            t > 0 && r.out_up_to >= t && (In(e, "_im_mess_unread"), In(e, "im-mess_unread"), j(e))
        }), n
    }

    function T(e, t, n) {
        var r = jn("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function I(e, t) {
        if (!Object(Et.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function L(e) {
        return 0 == e ? !0 : !1
    }

    function x(e) {
        return e > 0 && 2e9 > e
    }

    function P(e) {
        return e > 2e9
    }

    function M(e) {
        return -2e9 > e
    }

    function A(e, t) {
        return e === t.peer
    }

    function N(e, t) {
        return Object(Nt.doesChatTabHaveFlag)(Object(Et.getTab)(e, t), 1024)
    }

    function D(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function R(e, t) {
        return D(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function F(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function B(e, t, n, r, i) {
        if (Object(jt.getUserId)(t) !== Object(jt.getUserId)(n)) return !0;
        var a = F(t.date, r),
            o = F(n.date, r);
        return Gn(a, o) ? Object(Et.isCommunityInterface)(r) && hn(t.kludges.from_admin) !== hn(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : Object(jt.isServiceMsg)(t) || Object(jt.isServiceMsg)(n) ? !0 : Object(jt.isCallMessage)(n) || Object(jt.isCallMessage)(t) ? !0 : Object(jt.isGift)(t) || Object(jt.isGift)(n) ? !0 : Object(jt.isGraffiti)(t) || Object(jt.isGraffiti)(n) ? !0 : Object(jt.isUnread)(e, t) === Object(jt.isUnread)(e, n) || !i || Object(jt.isOut)(n) || he(n.peerId, r.gid) ? !1 : !0 : !0
    }

    function H(e, t) {
        return Fn(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function U(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            i = Math.round(1e9 * Math.random()).toString(16),
            a = {},
            o = 0;
        return t = Object(St.replaceHyperLinks)(t || "", St.linksReplacer.bind(null, r)), t = t.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + o + "_" + i + "!";
            return a[t] = e, o++, t
        }), t = Object(St.replaceMentions)(t), t = Object(St.replaceEmailLinks)(t), t = Object(St.replaceHashtags)(t, function(t) {
            var n = Object(Et.getGroupId)(e),
                r = n ? "gim" + n : "im";
            return '<a href="/' + r + "?sel=" + Object(Et.getPeer)(e) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
        }), Object.keys(a).forEach(function(e) {
            t = t.replace(e, function() {
                return a[e]
            })
        }), n.emoji && (t = Jn.emojiToHTML(t, !0)), t
    }

    function z(e) {
        return P(e) ? "c" + (e - 2e9) : M(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function G(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - hn(e.substr(1));
            case "c":
                return 2e9 + hn(e.substr(1));
            default:
                return hn(e)
        }
    }

    function V(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
    }

    function W(e, t) {
        return {
            search: {
                name: Dn("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: Dn("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: Dn("mail_allow_comm_messages")
            },
            clear: {
                name: Dn(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: Dn("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: Dn("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: Dn("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: Dn(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: Dn("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: Dn("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: Dn("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: Dn("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: Dn(t ? "mail_leave_vkcomgroup" : "mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: Dn("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: Dn(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: Dn("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: Dn("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: Dn("mail_menu_unpin")
            },
            settings: {
                icon: "settings",
                name: Dn("mail_settings")
            }
        }
    }

    function q(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = Nn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function K(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = Nn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function Q(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return q(e, t[n])
                }).join("");
            case 3:
                return q(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return K(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return K(e, t[n])
                }).join("")
        }
    }

    function Y(e, t, n) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (P(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return Q(t.photo);
        var r = t.data.active.slice(0, 4).map(Lt.oCacheGet.bind(null, e)),
            i = r.map(function(e) {
                return e.photo
            }),
            a = n ? [] : r.map(function(e) {
                return e.link
            });
        return Q(i, a)
    }

    function $(e) {
        var t = Dn(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + on + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function X() {
        return '<li class="im-search-results-head">' + Dn("mail_search_messages") + "</li>"
    }

    function Z() {
        return '<li class="im-search-results-head">' + Dn("mail_search_conversations_sep") + "</li>"
    }

    function J() {
        return '<li class="im-search-results-head">' + Dn("mail_search_dialogs_sep") + "</li>"
    }

    function ee() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + Dn("mail_recent_searches") + '\n    <button type="button" class="' + an + ' im-page--clear-recent">' + Dn("mail_clear_recent") + "</button>\n  </li>"
    }

    function te(e) {
        var t = e.get().popular_sugg,
            n = Object(Et.isClassicInterface)(e) ? 8 : 5;
        return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var n = t.peerId,
                r = Object(Lt.oCacheGet)(e, n) || t,
                i = e.get().tabs[n] || t,
                a = (e.get().mutedPeers || []).indexOf(n) >= 0,
                o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + o + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Xn(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + V(i.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function ne(e, t, n) {
        var r = jn("_im_mess_" + t.messageId, n);
        if (r) {
            Pn(r, "aria-hidden", "false"), Tn(r, "im-mess_failed " + Bt);
            var i = jn("_im_mess_marker", r);
            Pn(i, "aria-label", Dn("mail_send_message_error")), Pn(i, "role", "link")
        }
        return n
    }

    function re(e, t, n) {
        var r = jn("_im_mess_" + t, n);
        if (r) {
            In(r, "im-mess_failed"), Pn(r, "aria-hidden", "true"), In(r, Bt);
            var i = jn("_im_mess_marker", r);
            Pn(i, "aria-label", ""), Pn(i, "role", "")
        }
        return n
    }

    function ie(e, t) {
        var n = e.map(function(e) {
            return jn("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return ae(n, t)
    }

    function ae(e, t) {
        var n = e.filter(function(e) {
            return !xn(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === On(e).length
        }).map(function(e) {
            return Sn("_im_mess_stack", e)
        }).forEach(function(e) {
            xn(yn(e), "_im_bar_date") && fn(yn(e)), xn(yn(e), "_im_unread_bar_row") && fn(yn(e)), fn(e)
        }), t
    }

    function oe(e, t, n, r) {
        return e.map(function(e) {
            return jn("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            An(e, le(t, e, n)), Tn(e, "im-mess_light")
        }), r
    }

    function se(e, t, n) {
        var r = jn("_im_mess_" + e, n);
        if (r) {
            var i = jn(Ht, r);
            An(r, i.innerHTML), In(r, "im-mess_light")
        }
        return n
    }

    function ce(e, t, n, r) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (a) return ue(e, t, n, r, !0, i);
        var o = (Object(Et.isClassicInterface)(r), 60),
            s = ue(e, t, n, r, !1, i);
        return s.length > o ? ue(e, t, n, r, !0, i) : s
    }

    function ue(e, t, n, i, a, o) {
        var s = [],
            c = (e && e.userIds || []).filter(function(e) {
                var t = Object(Lt.oCacheExists)(i, e);
                return t || s.push(e), t && e != i.id
            });
        if (s.length && Object(Mt.loadChatMember)(r({}, t, s), i), 0 === c.length) return "";
        var u = x(t) || Object(Et.isCommunityPeer)(t) ? "first_name" : a ? "short_name" : "name";
        if (1 == c.length) {
            var l = n ? "" : Object(Lt.oCacheGet)(i, c[0])[u];
            return l + " " + Dn("mail_typing")
        }
        var d = Dn("mail_typing_several", c.length),
            f = c.slice(0, Math.min(c.length - 1, o)),
            p = f.map(function(e) {
                return Object(Lt.oCacheGet)(i, e)[u]
            }).join(", ");
        if (c.length > o + 1) p += " " + Dn("mail_and_peer").replace("{count}", e.totalCount - o).replace("{typing}", d);
        else {
            var m = Object(Lt.oCacheGet)(i, c[f.length])[u];
            p += " " + Dn("mail_and_peer_one") + " " + m + " " + d
        }
        return p
    }

    function le(e, t, n) {
        var r = t.innerHTML,
            i = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + Dn(i) + ' <button type="button" data-peer="' + e + '" class="' + Ut + ' im-mess--btn">' + Dn("mail_restore") + '</button>\n    <div class="' + Ht + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function de() {
        return '<div class="im-page--chat-search-empty">\n    ' + Dn("mail_im_search_empty") + "\n  </div>"
    }

    function fe(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
    }

    function pe(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            i = t.kludges,
            a = i.source_act,
            o = hn(i.source_mid),
            s = t.userId,
            c = Object(Lt.oCacheGet)(e, s),
            u = "",
            l = s === o;
        switch (a) {
            case Gt:
                u = "mail_im_chat_created";
                break;
            case Vt:
                u = "mail_im_title_updated_dot";
                break;
            case Wt:
                u = l ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case qt:
                u = l ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case Kt:
                u = "mail_im_photo_set";
                break;
            case Qt:
                u = "mail_im_photo_removed";
                break;
            case Yt:
                u = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case $t:
                u = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case Xt:
                u = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (u = Rn(c.sex, Dn(u, "raw")), u = u.replace("{from}", fe(c.link, c.name, r)), o && o !== s) {
            var d = i.source_email;
            if (d) u = u.replace("{user}", fe("/im?email=" + encodeURIComponent(d), "email", r));
            else {
                var f = Object(Lt.oCacheGet)(e, o),
                    p = a === qt ? f.inv_name : f.kick_name;
                u = u.replace("{user}", fe(f.link, p, r))
            }
        }
        if (i.source_text) {
            var m = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
            u = u.replace("{title}", m + ('«<b class="im_srv_lnk">' + i.source_text + "</b>»"))
        }
        if (i.source_act === Yt || i.source_act === $t)
            if (i.source_message) {
                var g = ge(Jn.emojiToHTML(vn(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    h = fe("", g, !1, "im_srv_mess_link");
                u = u.replace("{msg}", h)
            } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                return fe("", t, !1, "im_srv_mess_link")
            });
        return u
    }

    function me(e, t, n, r) {
        if (t === Kt) {
            var i = jn("_im_mess_" + e.messageId, r);
            if (i) {
                var a = n.tabs[e.peerId];
                i.parentNode.innerHTML = Nn("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: pe(n, e, a) + n.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return r
    }

    function ge(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(Ct.MENTION_RAW, "$1$4")
    }

    function he(e, t) {
        return t ? !1 : e === un.id
    }

    function _e(e, t) {
        return Yn(e, {
            url: Object(Et.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
            params: {
                act: "verified_tt",
                mid: t,
                gid: t
            },
            slide: 15,
            ajxdt: 200,
            showdt: 200,
            hidedt: 200,
            dir: "auto",
            shift: [94, 7, 7],
            className: "verified_tt"
        })
    }

    function ve(e) {
        return function(t) {
            function n() {
                o = !0, In(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
            }
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = dn(Nn("im_preloader", {
                    preloader: pn(un.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === r ? "im-preloader_bottom" : "im-preloader_top", i].join(" ")
                })),
                o = !1;
            setTimeout(function() {
                o || ("bottom" === r ? e.appendChild(a) : e.insertBefore(a, bn(e)), Tn(a, "im-preloader_visible"))
            }, 0), t.then(n)["catch"](function(e) {
                Object(At.imWeirdCatch)("wrapLoading", e), n()
            })
        }
    }

    function be(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, Ot.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function ye(e, t) {
        if (!t && !e) return !1;
        var n = e.target || e.srcElement,
            r = ar,
            i = !1,
            a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!n || n.onclick || n.onmousedown || "A" == n.tagName || xn(n, "_im_no_select") || xn(n, "im_msg_media_link") || "IMG" == n.tagName && !xn(n, "_im_graffiti") && !xn(n, "emoji") && !xn(n, "emoji_css") && !xn(n, "im_gift") || "TEXTAREA" == n.tagName || xn(n, "play_new") || xn(n, "videoplayer") || (i = a.test(n.className))) break; while (r-- && (n = n.parentNode));
        return i ? !!_n(we()) : !0
    }

    function we() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function Oe(e, t) {
        return '<div class="im-mess--text">\n      <span>' + Dn("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + z(e) + "&msgid=" + t + '">' + Dn("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function Ce(e, t) {
        var n = Dn(P(e) ? "mail_chat_sure_to_delete_all" : Object(Et.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Kn(Dn("mail_deleteall1"), n, Dn("mail_delete"), t, Dn("global_cancel"))
    }

    function ke(e) {
        return Kn(Dn("mail_unpin_title"), Dn("mail_unpin_text"), Dn("mail_unpin"), e, Dn("global_cancel"))
    }

    function Ee(e, t, n, r) {
        var i = Dn("mail_dialog_msg_delete_N", t),
            a = Kn(Dn("mail_dialog_msg_delete_title"), i, Dn("mail_delete"), function() {
                return r(isChecked(jn("_check_forall")))
            }, Dn("global_cancel")),
            o = "",
            s = !1;
        return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Dn("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), s && checkbox(jn("_check_forall")), a
    }

    function je(e, t, n, r, i) {
        t.showProgress(), e.set(r.bind(null, i)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
        })
    }

    function Se(e, t, n, r, i) {
        var a = e.get().peer;
        nr(r), qn("al_im.php", {
            act: "a_show_members_box",
            chat: a - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, i) {
                var a = Object(kt.createModule)({
                    handlers: function(i, o) {
                        o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), Te(e, e.get().peer, t, n), Object(kt.destroyModule)(a)
                        }), o(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var n = jn("_im_chat_members_w", r.bodyNode.parentNode),
                                i = 160,
                                a = Sn("_im_member_item", t),
                                o = a.offsetTop - n.scrollTop + i,
                                s = o > 370;
                            mobileOnlineTip(t, {
                                was: hn(kn(t, "was")),
                                mid: hn(kn(t, "peer")),
                                vk_mobile: hn(kn(t, "vk_mobile")),
                                forcetoup: s
                            })
                        })
                    }
                })
            }
        }, r)
    }

    function Te(e, t, n, r) {
        var i = e.get().tabs[t],
            a = i.memberIds;
        e.set(r.bind(null, "add_member", a)).then(n().showCreation)
    }

    function Ie(e, t, n) {
        if (e.get().active_tab === Ct.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === Ct.FOLDER_ALL ? Ct.FOLDER_UNREAD : Ct.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function Le(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var i = Object(Et.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, i !== Object(Et.isReversedDialogs)(e)), e
        })
    }

    function xe(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return Ct.FOLDER_MASKS[Ct.FOLDER_IMPORTANT] & n.folders
    }

    function Pe(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !Object(Et.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return Ct.FOLDER_MASKS[Ct.FOLDER_UNRESPOND] & r.folders
    }

    function Me(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Ae(e) {
        return null != e.get().pendingForward
    }

    function Ne(e, t) {
        return (t.get().block_states[e] || {}).who === un.id
    }

    function De(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([Ot.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function Re(e, t, n) {
        var r = void 0;
        return !Qn("al_im.php", {
            act: "a_spam",
            offset: "0",
            gid: e.get().gid
        }, {
            onDone: function(n, i) {
                i && (r = t(n, e, i))
            },
            params: {
                width: 638,
                onHide: function() {
                    Zn.loaded && Zn.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function Fe(e, t) {
        return Be(e.get(), t, Object(Et.getTab)(e, t).last_seen)
    }

    function Be(e, t, n, r) {
        if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + Dn("mail_header_online_status") + He(t, !1, !0, !0, r) + "</span>" : "online" + ($n[n[0]] ? He(t, !1, !1, !0, r) : "");
        if (!n[1]) return "";
        var i = Hn(n[1], e.timeshift),
            a = Rn(Object(Lt.oCacheGet)(e, t).sex, Dn("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
        return 2 === n[2] ? a += He(t, !1, !0, !1, r) : n[2] && (a += He(t, !1, !1, !1, r)), a
    }

    function He(e, t, n, r, i) {
        var a = {
            mid: e
        };
        r && (a.was = 1), t ? a.forcetoup = !0 : a.forcetodown = !0, n && (a.vk_mobile = 1), a = Object.assign(a, i);
        var o = Object.keys(a).map(function(e) {
                return e + ": " + a[e]
            }).join(", "),
            s = n ? "" : 'onclick="mobilePromo();"',
            c = n ? " vk_mobile" : "";
        return Nn("im_wrap_mobile", {
            "class": "im_status_mob_onl" + c,
            params: o,
            attrs: s
        })
    }

    function Ue(e, t) {
        var n = t.get().tabs[e];
        return qn("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function ze(e, t) {
        return qn("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function Ge(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function Ve(e, t, n, r) {
        var i = void 0,
            a = Qn("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, a) {
                    a && (i = n(r, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Zn.loaded && Zn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        i && i.unmount()
                    }
                }
            }, r);
        st(a, e)
    }

    function We() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function qe(e, t, n) {
        var r = jn("_im_mess_" + e, n);
        return r && Ln(r, "im-mess_fav", t), n
    }

    function Ke(e, t, n) {
        var r = jn("_im_unread_bar_row", t);
        if (!r) return t;
        var i = Cn(r, "._im_mess_stack", -1),
            a = Cn(r, "._im_mess_stack"),
            o = i ? En("_im_mess", i).pop() : null,
            s = a ? jn("_im_mess", a) : null;
        if (fn(r), h(t), !s || !o) return t;
        var c = kn(s, "msgid"),
            u = Object(Et.getPreviousMessage)(e, n, c),
            l = Object(Et.getMessage)(e, n, c);
        if (!u || B(e.tabs[n], u, l, e)) return t;
        var d = jn("_im_stack_messages", i),
            f = jn("_im_stack_messages", a).children;
        return Object(It.toArray)(f).forEach(function(e) {
            fn(e), d.appendChild(e)
        }), fn(a), t
    }

    function Qe(e, t, n) {
        var r = Object(Et.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var i = jn("_im_mess_" + r, t);
        if (!i) {
            var a = Object(Et.getLastMessage)(e, e.get().peer, r);
            if (!a) return [!0, 0];
            i = jn("_im_mess_" + a.messageId, t)
        }
        var o = xn(i, "_im_mess_srv") ? i : Sn("_im_mess_stack", i);
        if (!o) return [!0, 0];
        var s = i ? i.offsetTop : 0,
            c = o.offsetTop + s,
            u = n.contHeight();
        return c <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - c)]
    }

    function Ye(e, t, n) {
        nr(t);
        var r = Sn("_im_top_notice", n);
        tr(r, 200, fn.pbind(r));
        var i = Sn("_im_page_dialogs", r);
        i && xn(i, "im-page--dialogs-notice") && In(i, "im-page--dialogs-notice"), Wn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function $e(e, t, n) {
        nr(t);
        var r = Sn("_im_aside_notice", n);
        er(r, 200, fn.pbind(r)), Wn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Xe(e, t) {
        nr(e);
        var n = Sn("_im_aside_promo_block", t);
        er(n, 200, fn.pbind(n)), Wn.post("al_im.php", {
            act: "a_hide_promo_block",
            type: n.getAttribute("data-type"),
            hash: n.getAttribute("data-hash")
        })
    }

    function Ze(e, t) {
        var n = Sn("_im_aside_promo_block", t);
        n.classList.add("--action-called"), Wn.post("al_im.php", {
            act: "a_vkadmin_app_install",
            hash: kn(t, "hash"),
            platform: kn(t, "platform")
        })
    }

    function Je(e, t, n, r, i) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(St.replaceMentions)(n, function(e, t, n, r, i) {
            return i
        }), r && (n = Jn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !P(e) && (n = Nn("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && i.length > 0 && (n = Nn("im_dialog_media", {
            name: et(i[0], i)
        })), n
    }

    function et(e, t) {
        var n = {
            photo: Dn("mail_added_photos", "raw"),
            video: Dn("mail_added_videos", "raw"),
            audio: Dn("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return Bn(e.object.fwd_count, Dn("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var r = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return Bn(r, n[e.type], !0);
            case "audio_playlist":
                return Dn("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return Dn("mail_added_graffiti");
                    case "audiomsg":
                        return Dn("mail_added_audiomsg");
                    default:
                        return Dn("mail_added_docs")
                }
            case "geo":
            case "map":
                return Dn("mail_added_geo");
            case "wall":
                return Dn("mail_added_wall");
            case "wall_reply":
                return Dn("mail_added_wall_reply");
            case "gift":
                return Dn("mail_added_gift");
            case "link":
            case "share":
                return Dn("mail_added_link");
            case "sticker":
                return Dn("mail_added_sticker");
            case "market":
                return Dn("mail_added_market_item");
            case "money_transfer":
                return Dn("mail_added_money_transfer");
            case "money_request":
                return Dn("mail_added_money_request");
            case "story":
                return Dn("mail_added_story");
            case "mask":
                return Dn("mail_added_mask");
            case "article":
                return Dn("mail_added_article");
            case "call":
                return Dn("mail_added_call");
            default:
                return Dn("mail_added_" + e.type)
        }
        return ""
    }

    function tt(e) {
        Tn(e, "im-send-btn_loading")
    }

    function nt(e) {
        In(e, "im-send-btn_loading")
    }

    function rt(e) {
        var t = e.get(),
            n = Object(Et.getPinnedMessage)(e);
        if (!n || !Object(xt.isPinnedMessageVisibleInTab)(e, Object(Et.getPeer)(e))) return "";
        var r = Object(Lt.oCacheGet)(e, n.userId);
        if (!r) return "";
        var i = it(e, n);
        i || (i = n.text, i = !i && n.attaches.length ? Nn("im_pinned_message_media", {
            text: et(n.attaches[0], n.attaches)
        }) : U(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " ");
        var a = Nn("im_pinned_message", {
            date: Un(n.date, t.timeshift),
            content: i,
            link: r.link,
            name: r.name
        });
        return a
    }

    function it(e, t) {
        var n = "";
        if (t && Object(jt.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
            var r = "%s " + t.kludges.attach1_currency;
            if ("RUB" === t.kludges.attach1_currency && (r = Dn("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                var i = Bn(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                    a = Bn(t.kludges.attach1_total_amount / 1e3, r, !0);
                n = Dn("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
            } else {
                var o = Bn(t.kludges.attach1_tr_amount / 1e3, r, !0);
                n = Dn("mail_money_request_collected_amount").replace("{amount}", o)
            }
            if (hn(t.kludges.attach1_held_amount)) {
                var s = Bn(t.kludges.attach1_held_amount / 1e3, r, !0);
                n += " " + Dn("mail_money_request_held_amount").replace("{amount}", s)
            }
            t.text && (n += '<span class="divider"></span>' + U(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += Nn("im_pinned_message_media_bar", {
                percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
            }))
        }
        return n
    }

    function at(e, t, n) {
        var r = +n.getAttribute("data-time");
        r && Yn(n, {
            text: Dn("mail_message_edited") + " " + Un(r, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function ot() {
        var e = getSize(jn(sn))[1];
        return e || (e = or), e
    }

    function st(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            xn(e.target, "_im_edit_time") && at(t, e, e.target)
        })
    }

    function ct(e, t, n, r, i) {
        var a = e.get(),
            o = void 0,
            s = Qn("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                hash: a.tabs[n].hash
            }, {
                onDone: function(n, i) {
                    i && (o = r(n, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Zn.loaded && Zn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, i);
        st(s, e)
    }

    function ut(e, t) {
        return P(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function lt(e) {
        return !P(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function dt(e, t) {
        var n = Object(Lt.oCacheGet)(e, t.peerId),
            r = Object(Et.getTab)(e, t.peerId) || {};
        return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, P(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
    }

    function ft(e, t) {
        for (var n in t) t.hasOwnProperty(n) && dt(e, t[n])
    }

    function pt(e, t) {
        var n = [],
            r = t.find(function(e) {
                return "mail" === e[0]
            }),
            i = r ? r[1].split(";") : [];
        for (i.length > ir && (r[1] = i.slice(0, ir).join(";")); e.length > rr;) {
            var a = e.substr(0, rr).lastIndexOf(" "); - 1 == a && (a = rr), n.push({
                msgText: _n(e.substr(0, a))
            }), e = _n(e.substr(a))
        }
        for (e.length && n.push({
                msgText: e,
                attaches: t
            }), n.length || n.push({
                attaches: t
            }), i = i.slice(ir); i.length; i = i.slice(ir)) n.push({
            attaches: [
                ["mail", i.slice(0, ir).join(";")]
            ]
        });
        return n
    }

    function mt(e) {
        return e.length > rr
    }

    function gt(e, t, n) {
        var r = !1;
        qn("al_im.php", {
            act: "a_chat_preview",
            chat_id: t.invite_chat_id,
            hash: t.invite_hash
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1,
                hideButtons: !0,
                onHide: function() {
                    e.set(n), r && r.unmount()
                }
            },
            onFail: function(e) {
                return setTimeout(function() {
                    return Kn(Dn("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, n) {
                r = Object(Tt.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function ht() {
        Kn(Dn("global_error"), Dn("mail_message_wait_until_uploaded"))
    }

    function _t(e, t) {
        var n = Object(Et.getTab)(e, t.peerId) || {};
        if (!t || !Object(jt.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (l(e, t.peerId, t.messageId)) return !1;
        if (P(t.peerId)) {
            if (n.data.kicked || n.data.closed) return !1
        } else if (n.block_error > 0) return !1;
        return !0
    }

    function vt(e, t) {
        var n = Object(Et.getTab)(e, t),
            r = -1 !== n.memberIds.indexOf(n.ownerId),
            i = 5,
            a = r ? [n.ownerId] : [];
        return a = a.concat(n.memberIds.filter(function(t) {
            return t !== n.ownerId && Object(Lt.oCacheExists)(e, t)
        }).slice(0, r ? i - 1 : i)), a.map(function(t) {
            return Object(Lt.oCacheGet)(e, t)
        })
    }

    function bt(e, t) {
        return t.map(function(t) {
            return Object(Lt.oCacheGet)(e, t)
        })
    }

    function yt(e, t) {
        var n = Object(Et.getTab)(e, t);
        return n.memberIds.reduce(function(t, n) {
            var r = Object(Lt.oCacheGet)(e, n);
            return t[r.id] = r, t
        }, {})
    }

    function wt(e, t) {
        if ("number" != typeof e || 0 === e) return "";
        var n = 1,
            r = 60,
            i = 3600,
            a = 86400,
            o = 604800,
            s = 2592e3,
            c = 31536e3,
            u = [
                [c, t ? Dn("global_years_accusative", "raw") : Dn("global_age_years", "raw")],
                [s, t ? Dn("global_months_accusative", "raw") : Dn("global_age_months", "raw")],
                [o, t ? Dn("global_weeks_accusative", "raw") : Dn("global_age_weeks", "raw")],
                [a, t ? Dn("global_days_accusative", "raw") : Dn("global_age_days", "raw")],
                [i, t ? Dn("global_hours_accusative", "raw") : Dn("global_hours", "raw")],
                [r, t ? Dn("global_minutes_accusative", "raw") : Dn("global_minutes", "raw")],
                [n, t ? Dn("global_seconds_accusative", "raw") : Dn("global_age_seconds", "raw")]
            ],
            l = e,
            d = [],
            f = void 0;
        if (u.forEach(function(e) {
                var t = Dt(e, 2),
                    n = t[0],
                    r = t[1],
                    i = Math.floor(l / n);
                l %= n, i >= 1 && d.push(Bn(i, r))
            }), f = d.length, 1 === f) return d.pop();
        var p = d.slice(0, f - 1).join(", "),
            m = d.pop();
        return Dn("global_and").replace(/{before}/gi, p).replace(/{after}/gi, m)
    }
    n.r(t), n.d(t, "SENDING_CLASS", function() {
        return Ft
    }), n.d(t, "FAILED_CLASS", function() {
        return Bt
    }), n.d(t, "ORIGINAL_CLASS", function() {
        return Ht
    }), n.d(t, "RESTORE_CLASS", function() {
        return Ut
    }), n.d(t, "TYPING_CLASS", function() {
        return zt
    }), n.d(t, "CREATE_CHAT_ACTION", function() {
        return Gt
    }), n.d(t, "CHAT_TITLE_ACTION", function() {
        return Vt
    }), n.d(t, "CHAT_INVITE_USER", function() {
        return Wt
    }), n.d(t, "CHAT_KICK_USER", function() {
        return qt
    }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
        return Kt
    }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
        return Qt
    }), n.d(t, "CHAT_PIN_MESSAGE", function() {
        return Yt
    }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
        return $t
    }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
        return Xt
    }), n.d(t, "DESELECT_ALL_CLASS", function() {
        return Zt
    }), n.d(t, "SHOW_CHAT_MEMBERS_CLASS", function() {
        return Jt
    }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
        return en
    }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
        return tn
    }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
        return nn
    }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
        return rn
    }), n.d(t, "CLEAR_RECENT_CLASS", function() {
        return an
    }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
        return on
    }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
        return sn
    }), n.d(t, "getClassicChatHeight", function() {
        return i
    }), n.d(t, "setClassicChatHeight", function() {
        return a
    }), n.d(t, "fixTableCellChildHeight", function() {
        return o
    }), n.d(t, "applyInnerHtml", function() {
        return s
    }), n.d(t, "compensateHistoryHeightChange", function() {
        return c
    }), n.d(t, "renderSticker", function() {
        return u
    }), n.d(t, "isAlreadyDeleted", function() {
        return l
    }), n.d(t, "replaceMessageAttrs", function() {
        return d
    }), n.d(t, "isVoiceMessageAvailable", function() {
        return f
    }), n.d(t, "getAvailableMicrophones", function() {
        return p
    }), n.d(t, "renderAttach", function() {
        return m
    }), n.d(t, "dayFromVal", function() {
        return g
    }), n.d(t, "showInvisibleBar", function() {
        return h
    }), n.d(t, "updateMessageInCache", function() {
        return _
    }), n.d(t, "editAndReplaceMessage", function() {
        return v
    }), n.d(t, "renderMessage", function() {
        return b
    }), n.d(t, "renderMessageMedia", function() {
        return y
    }), n.d(t, "ensureDomHasActions", function() {
        return w
    }), n.d(t, "renderCallMessage", function() {
        return C
    }), n.d(t, "appendToHistory", function() {
        return k
    }), n.d(t, "restoreQueue", function() {
        return E
    }), n.d(t, "markMessagesAsRead", function() {
        return S
    }), n.d(t, "replaceAttaches", function() {
        return T
    }), n.d(t, "isDuplicate", function() {
        return I
    }), n.d(t, "isReservedPeer", function() {
        return L
    }), n.d(t, "isUserPeer", function() {
        return x
    }), n.d(t, "isChatPeer", function() {
        return P
    }), n.d(t, "isPeerActive", function() {
        return A
    }), n.d(t, "isFvkcomgroup", function() {
        return N
    }), n.d(t, "isTabLoaded", function() {
        return D
    }), n.d(t, "isTabLoadedWithMessage", function() {
        return R
    }), n.d(t, "parseMessage", function() {
        return U
    }), n.d(t, "convertPeerToUrl", function() {
        return z
    }), n.d(t, "unUrlPeer", function() {
        return G
    }), n.d(t, "simplifyCounter", function() {
        return V
    }), n.d(t, "chatActions", function() {
        return W
    }), n.d(t, "renderPhotos", function() {
        return Q
    }), n.d(t, "renderPhotosFromTab", function() {
        return Y
    }), n.d(t, "renderBtnSearchOnlyMessages", function() {
        return $
    }), n.d(t, "renderMessagesSep", function() {
        return X
    }), n.d(t, "renderConversationsSep", function() {
        return Z
    }), n.d(t, "renderPopularSuggSep", function() {
        return J
    }), n.d(t, "renderClearRecent", function() {
        return ee
    }), n.d(t, "renderPopularSuggestions", function() {
        return te
    }), n.d(t, "setMessageError", function() {
        return ne
    }), n.d(t, "startResendMessage", function() {
        return re
    }), n.d(t, "removeMessages", function() {
        return ie
    }), n.d(t, "removeMessagesWithRestore", function() {
        return oe
    }), n.d(t, "restoreMessage", function() {
        return se
    }), n.d(t, "formatTyper", function() {
        return ce
    }), n.d(t, "renderEmptySearch", function() {
        return de
    }), n.d(t, "serviceLink", function() {
        return fe
    }), n.d(t, "renderServiceMsg", function() {
        return pe
    }), n.d(t, "addChatPhotoToUpdate", function() {
        return me
    }), n.d(t, "replaceSpecialSymbols", function() {
        return ge
    }), n.d(t, "isSelfMessage", function() {
        return he
    }), n.d(t, "showVerifiedTooltip", function() {
        return _e
    }), n.d(t, "wrapLoading", function() {
        return ve
    }), n.d(t, "tabFromIds", function() {
        return be
    }), n.d(t, "checkSelectClick", function() {
        return ye
    }), n.d(t, "renderGoTo", function() {
        return Oe
    }), n.d(t, "showFlushDialog", function() {
        return Ce
    }), n.d(t, "showUnpinDialog", function() {
        return ke
    }), n.d(t, "showMsgDeleteDialog", function() {
        return Ee
    }), n.d(t, "cleanHistory", function() {
        return je
    }), n.d(t, "showChatMembers", function() {
        return Se
    }), n.d(t, "inviteUser", function() {
        return Te
    }), n.d(t, "showUnreadOnly", function() {
        return Ie
    }), n.d(t, "changeTab", function() {
        return Le
    }), n.d(t, "isImportant", function() {
        return xe
    }), n.d(t, "isUnrespond", function() {
        return Pe
    }), n.d(t, "isPeerBlocked", function() {
        return Me
    }), n.d(t, "isPendingForward", function() {
        return Ae
    }), n.d(t, "isPeerBlockedByMe", function() {
        return Ne
    }), n.d(t, "blockLatencyCompensation", function() {
        return De
    }), n.d(t, "showSpamLayer", function() {
        return Re
    }), n.d(t, "getLastSeenTextInHeader", function() {
        return Fe
    }), n.d(t, "getLastSeenText", function() {
        return Be
    }), n.d(t, "showBlacklistBoxUser", function() {
        return Ue
    }), n.d(t, "showBlacklistBox", function() {
        return ze
    }), n.d(t, "getBaseLink", function() {
        return Ge
    }), n.d(t, "showFavvedBox", function() {
        return Ve
    }), n.d(t, "isEditableFocused", function() {
        return We
    }), n.d(t, "updateStar", function() {
        return qe
    }), n.d(t, "removewNewUnreadBarAndMerge", function() {
        return Ke
    }), n.d(t, "isMessagesVisible", function() {
        return Qe
    }), n.d(t, "hideTopNotice", function() {
        return Ye
    }), n.d(t, "hideAsideNotice", function() {
        return $e
    }), n.d(t, "hideAsidePromoBlock", function() {
        return Xe
    }), n.d(t, "installVKAdminApp", function() {
        return Ze
    }), n.d(t, "renderShortText", function() {
        return Je
    }), n.d(t, "attachToText", function() {
        return et
    }), n.d(t, "lockButton", function() {
        return tt
    }), n.d(t, "unlockButton", function() {
        return nt
    }), n.d(t, "renderPinnedMessage", function() {
        return rt
    }), n.d(t, "renderPinnedMedia", function() {
        return it
    }), n.d(t, "showEditTimeTooltip", function() {
        return at
    }), n.d(t, "getPinnedMessageHeight", function() {
        return ot
    }), n.d(t, "boxHandleEditTimeTooltips", function() {
        return st
    }), n.d(t, "showPinnedBox", function() {
        return ct
    }), n.d(t, "isUserAliveInChat", function() {
        return ut
    }), n.d(t, "getAliveMembersCount", function() {
        return lt
    }), n.d(t, "normalizeTab", function() {
        return dt
    }), n.d(t, "normalizeTabsGotFromServer", function() {
        return ft
    }), n.d(t, "splitMessageToParts", function() {
        return pt
    }), n.d(t, "isMessageTooLong", function() {
        return mt
    }), n.d(t, "showInvitationBox", function() {
        return gt
    }), n.d(t, "showWaitUntilUploadedBox", function() {
        return ht
    }), n.d(t, "canMessageBeDeletedForAll", function() {
        return _t
    }), n.d(t, "getTopChatMembers", function() {
        return vt
    }), n.d(t, "getChatMembersByIds", function() {
        return bt
    }), n.d(t, "getChatMembers", function() {
        return yt
    }), n.d(t, "formatTimespan", function() {
        return wt
    });
    var Ot = n(132),
        Ct = n(30),
        kt = n(110),
        Et = n(199);
    n.d(t, "unpackStore", function() {
        return Et.unpackStore
    }), n.d(t, "getFirstUnread", function() {
        return Et.getFirstUnread
    }), n.d(t, "isSearchShown", function() {
        return Et.isSearchShown
    }), n.d(t, "getPeer", function() {
        return Et.getPeer
    }), n.d(t, "getTab", function() {
        return Et.getTab
    }), n.d(t, "getCurrentTab", function() {
        return Et.getCurrentTab
    }), n.d(t, "getSelectedMessages", function() {
        return Et.getSelectedMessages
    }), n.d(t, "getMessageRangeFromSelection", function() {
        return Et.getMessageRangeFromSelection
    }), n.d(t, "countUnread", function() {
        return Et.countUnread
    }), n.d(t, "getMessageByRid", function() {
        return Et.getMessageByRid
    }), n.d(t, "isRidExist", function() {
        return Et.isRidExist
    }), n.d(t, "getLocalId", function() {
        return Et.getLocalId
    }), n.d(t, "getLastMessage", function() {
        return Et.getLastMessage
    }), n.d(t, "parserMessage", function() {
        return Et.parserMessage
    }), n.d(t, "getAuthorFullName", function() {
        return Et.getAuthorFullName
    }), n.d(t, "getMessage", function() {
        return Et.getMessage
    }), n.d(t, "getPreviousMessage", function() {
        return Et.getPreviousMessage
    }), n.d(t, "isClassicInterface", function() {
        return Et.isClassicInterface
    }), n.d(t, "isLocksAvailable", function() {
        return Et.isLocksAvailable
    }), n.d(t, "isFoldersAvailable", function() {
        return Et.isFoldersAvailable
    }), n.d(t, "isCommunityInterface", function() {
        return Et.isCommunityInterface
    }), n.d(t, "getBareTab", function() {
        return Et.getBareTab
    }), n.d(t, "isReversedDialogs", function() {
        return Et.isReversedDialogs
    }), n.d(t, "isFullyLoadedTab", function() {
        return Et.isFullyLoadedTab
    }), n.d(t, "makeTabNotFullyLoaded", function() {
        return Et.makeTabNotFullyLoaded
    }), n.d(t, "isGoToEndVisible", function() {
        return Et.isGoToEndVisible
    }), n.d(t, "getUnreadScrollBottom", function() {
        return Et.getUnreadScrollBottom
    }), n.d(t, "isSendingAvailable", function() {
        return Et.isSendingAvailable
    }), n.d(t, "isCommunityPeer", function() {
        return Et.isCommunityPeer
    }), n.d(t, "isCommunityBlocked", function() {
        return Et.isCommunityBlocked
    }), n.d(t, "checkVoiceMessageAvailable", function() {
        return Et.checkVoiceMessageAvailable
    }), n.d(t, "isSearching", function() {
        return Et.isSearching
    }), n.d(t, "getSearchText", function() {
        return Et.getSearchText
    }), n.d(t, "isSearchingValue", function() {
        return Et.isSearchingValue
    }), n.d(t, "isRecentSearchesActive", function() {
        return Et.isRecentSearchesActive
    }), n.d(t, "getPinnedMessage", function() {
        return Et.getPinnedMessage
    }), n.d(t, "doPopularSuggExist", function() {
        return Et.doPopularSuggExist
    }), n.d(t, "isAnyMessageBeingEdited", function() {
        return Et.isAnyMessageBeingEdited
    }), n.d(t, "getGroupId", function() {
        return Et.getGroupId
    }), n.d(t, "getTabDraft", function() {
        return Et.getTabDraft
    });
    var jt = n(158),
        St = n(70),
        Tt = n(88),
        It = n(145),
        Lt = n(136),
        xt = n(201),
        Pt = n(205),
        Mt = n(41),
        At = n(56),
        Nt = n(65),
        Dt = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        Rt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Ft = "_im_mess_sending",
        Bt = "_im_mess_failed",
        Ht = "_im_mess_original",
        Ut = "_im_mess_restore",
        zt = "_im_typing",
        Gt = "chat_create",
        Vt = "chat_title_update",
        Wt = "chat_invite_user",
        qt = "chat_kick_user",
        Kt = "chat_photo_update",
        Qt = "chat_photo_remove",
        Yt = "chat_pin_message",
        $t = "chat_unpin_message",
        Xt = "chat_invite_user_by_link",
        Zt = "_im_deselect_all",
        Jt = "_im_show_chat_mems",
        en = "_im_top_notice_hide",
        tn = "_im_aside_notice_hide",
        nn = "_im_aside_promo_block_hide",
        rn = "_im_vkadmin_promo_link",
        an = "_im_clear_recent",
        on = "_im_mess_search",
        sn = "_im_pinned",
        cn = window,
        un = cn.vk,
        ln = cn.ls,
        dn = cn.se,
        fn = cn.re,
        pn = cn.rs,
        mn = cn.sech,
        gn = cn.inArray,
        hn = cn.intval,
        _n = cn.trim,
        vn = cn.stripHTML,
        bn = cn.domFC,
        yn = cn.domPS,
        wn = cn.domLC,
        On = cn.domChildren,
        Cn = cn.domClosestSibling,
        kn = cn.domData,
        En = cn.geByClass,
        jn = cn.geByClass1,
        Sn = cn.gpeByClass,
        Tn = cn.addClass,
        In = cn.removeClass,
        Ln = cn.toggleClass,
        xn = cn.hasClass,
        Pn = cn.attr,
        Mn = cn.setStyle,
        An = cn.val,
        Nn = cn.getTemplate,
        Dn = cn.getLang,
        Rn = cn.langSex,
        Fn = cn.langDate,
        Bn = cn.langNumeric,
        Hn = cn.getDateText,
        Un = cn.getSmDate,
        zn = cn.getShortDate,
        Gn = cn.isSameDate,
        Vn = cn.isToday,
        Wn = cn.ajax,
        qn = cn.showBox,
        Kn = cn.showFastBox,
        Qn = cn.showTabbedBox,
        Yn = cn.showTooltip,
        $n = cn.mobPlatforms,
        Xn = cn.onlinePlatformClass,
        Zn = cn.AudioMessagePlayer,
        Jn = cn.Emoji,
        er = cn.slideUp,
        tr = cn.fadeOut,
        nr = cn.cancelEvent,
        rr = 4096,
        ir = 100,
        ar = 8,
        or = 52,
        sr = "chatPosition"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        u = u.reduce(function(t, n) {
            var r = c(n, 2),
                i = r[0],
                a = r[1],
                o = a(e);
            return o ? t : t.concat([
                [i, a]
            ])
        }, [])
    }

    function i(e, t) {
        d === !1 && (d = !0, document.body.addEventListener("click", r, !0)), u = u.concat([
            [e, t]
        ])
    }

    function a(e) {
        u = u.filter(function(t) {
            var n = c(t, 1),
                r = n[0];
            return r !== e
        }), 0 === l && (document.body.removeEventListener("click", r, !0), d = !1)
    }

    function o(e, t) {
        u = u.map(function(n) {
            var r = c(n, 2),
                i = r[0],
                a = r[1];
            return i === e ? [e, t] : [i, a]
        })
    }

    function s(e, t) {
        return 0 === t.length ? function(t) {
            return e(t), !0
        } : function(n) {
            var r = t.reduce(function(e, t) {
                return e && !domClosest(t, n.target)
            }, !0);
            return r && e(n), r
        }
    }
    n.r(t);
    var c = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        u = [],
        l = 0,
        d = !1;
    t["default"] = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return l++, {
            stop: function() {
                l--, a(e)
            },
            replaceOrAdd: function(n) {
                var r = u.filter(function(t) {
                        var n = c(t, 1),
                            r = n[0];
                        return e === r
                    }),
                    a = s(n, t);
                r.length > 0 ? o(e, a) : i(e, a)
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    e.exports = n(171)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.state = e, Promise.resolve(t)
    }

    function i(e, t, n, r, i) {
        switch (t) {
            case d.ARROW_UP:
                Object(l.isEditableFocused)() || (r.scroll(i, "up"), cancelEvent(n));
                break;
            case d.ARROW_DOWN:
                Object(l.isEditableFocused)() || (r.scroll(i, "down"), cancelEvent(n));
                break;
            case d.PAGE_UP:
                n.ctrlKey || Object(l.isClassicInterface)(i) || (r.scroll(i, "up", !0), cancelEvent(n));
                break;
            case d.PAGE_DOWN:
                n.ctrlKey || Object(l.isClassicInterface)(i) || (r.scroll(i, "down", !0), cancelEvent(n));
                break;
            case d.HOME:
                Object(l.isEditableFocused)() || (r.scroll(i, "up", !1, !0), cancelEvent(n));
                break;
            case d.END_KEY:
                Object(l.isEditableFocused)() || (r.scroll(i, "down", !1, !0), cancelEvent(n));
                break;
            case d.PRINTABLE:
                r.focustTxt(e)
        }
    }

    function a(e, t, n, r, i, a) {
        switch (t) {
            case d.ARROW_DOWN:
                r.hoverNextDialog(a), cancelEvent(n);
                break;
            case d.ARROW_UP:
                r.hoverPrevDialog(a), cancelEvent(n);
                break;
            case d.ENTER:
                (!Object(l.isEditableFocused)() || gpeByClass("_im_dialogs_search_input", document.activeElement)) && r.selectHoveredDialog(a);
                break;
            case d.PRINTABLE:
                i.focusInput(a)
        }
    }

    function o(e, t, n, r, a) {
        switch (t) {
            case d.HOME:
            case d.END_KEY:
                r.isEmpty(a) && i(e, t, n, r, a);
                break;
            case d.PAGE_UP:
            case d.PAGE_DOWN:
                i(e, t, n, r, a)
        }
    }

    function s(e, t, n, r, i) {
        switch (t) {
            case d.PAGE_UP:
                !n.ctrlKey && Object(l.isClassicInterface)(i) && (r.scroll("up"), cancelEvent(n));
                break;
            case d.PAGE_DOWN:
                !n.ctrlKey && Object(l.isClassicInterface)(i) && (r.scroll("down"), cancelEvent(n));
                break;
            case d.ARROW_DOWN:
                r.hoverNextElement(i);
                break;
            case d.ARROW_UP:
                r.hoverPrevElement(i);
                break;
            case d.ENTER:
                gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(i) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(i);
                break;
            case d.PRINTABLE:
                r.focusSearch(i)
        }
    }

    function c(e, t, n, c, l, d) {
        var f = Object(u["default"])({
            state: t || "default"
        });
        return {
            signal: function(t, r) {
                if (!(cur.storyLayer || cur.articleEditorLayer || cur.articleLayer)) switch (f.get().state) {
                    case "default":
                        return i(f, t, r, c, e);
                    case "fwd":
                    case "search":
                        return a(f, t, r, n, l, e);
                    case "create":
                        return s(f, t, r, d, e);
                    case "message":
                        return o(f, t, r, c, e);
                    default:
                        throw new Error("Unknown state: " + f.get().state)
                }
            },
            transition: function(e) {
                return f.set(r.bind(null, e))
            }
        }
    }
    n.r(t), n.d(t, "create", function() {
        return c
    });
    var u = n(188),
        l = n(81),
        d = n(30)
}, function(e, t, n) {
    "use strict";
    var r = n(1),
        i = n(134),
        a = n(29),
        o = n(12),
        s = n(66),
        c = n(26),
        u = n(159),
        l = n(113),
        d = n(37),
        f = n(38)("iterator"),
        p = !([].keys && "next" in [].keys()),
        m = "@@iterator",
        g = "keys",
        h = "values",
        _ = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, w) {
        u(n, t, v);
        var O, C, k, E = function(e) {
                if (!p && e in I) return I[e];
                switch (e) {
                    case g:
                        return function() {
                            return new n(this, e)
                        };
                    case h:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            j = t + " Iterator",
            S = b == h,
            T = !1,
            I = e.prototype,
            L = I[f] || I[m] || b && I[b],
            x = L || E(b),
            P = b ? S ? E("entries") : x : void 0,
            M = "Array" == t ? I.entries || L : L;
        if (M && (k = d(M.call(new e)), k !== Object.prototype && (l(k, j, !0), r || s(k, f) || o(k, f, _))), S && L && L.name !== h && (T = !0, x = function() {
                return L.call(this)
            }), r && !w || !p && !T && I[f] || o(I, f, x), c[t] = x, c[j] = _, b)
            if (O = {
                    values: S ? x : E(h),
                    keys: y ? x : E(g),
                    entries: P
                }, w)
                for (C in O) C in I || a(I, C, O[C]);
            else i(i.P + i.F * (p || T), t, O);
        return O
    }
}, function(e, t, n) {
    var r = n(112),
        i = n(58),
        a = n(39),
        o = n(202),
        s = n(144),
        c = n(160);
    e.exports = function(e, t, n, u, l) {
        var d, f, p, m = l ? function() {
                return e
            } : c(e),
            g = r(n, u, t ? 2 : 1),
            h = 0;
        if ("function" != typeof m) throw TypeError(e + " is not iterable!");
        if (a(m))
            for (d = s(e.length); d > h; h++) t ? g(o(f = e[h])[0], f[1]) : g(e[h]);
        else
            for (p = m.call(e); !(f = p.next()).done;) i(p, g, f.value, t)
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = domData(t, "chat-id"),
            r = domData(t, "hash");
        return lockButton(t), Object(a.joinChat)(n, r, e.get()).then(function(n) {
            var r = c(n, 1),
                i = r[0];
            unlockButton(t), e.get().longpoll.push([Object(s.changePeer)(i)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function i(e, t) {
        var n = Object(o.createModule)({
            handlers: function(n, i) {
                i(e, "click", u, function(e) {
                    return r(t, e.target)
                })
            }
        });
        return {
            unmount: function() {
                Object(o.destroyModule)(n)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return i
    });
    var a = n(41),
        o = n(110),
        s = n(132),
        c = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        u = "_im_join_chat"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function i() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                i[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, i)).join("") ? !1 : !0
        } catch (a) {
            return !1
        }
    }
    var a = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = i() ? Object.assign : function(e, t) {
        for (var n, i, c = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var l in n) o.call(n, l) && (c[l] = n[l]);
            if (a) {
                i = a(n);
                for (var d = 0; d < i.length; d++) s.call(n, i[d]) && (c[i[d]] = n[i[d]])
            }
        }
        return c
    }
}, function(e, t, n) {
    var r = n(197),
        i = n(92),
        a = n(174),
        o = n(140),
        s = n(66),
        c = n(128),
        u = Object.getOwnPropertyDescriptor;
    t.f = n(182) ? u : function(e, t) {
        if (e = a(e), t = o(t, !0), c) try {
            return u(e, t)
        } catch (n) {}
        return s(e, t) ? i(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "VIDEO_UPLOAD_EXTS", function() {
        return r
    }), n.d(t, "VIDEO_UPLOAD_MAX_FILE_SIZE_IN_GB", function() {
        return i
    }), n.d(t, "VIDEO_UPLOAD_CHUNK_SIZE", function() {
        return a
    });
    var r = "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf".split(" "),
        i = 5,
        a = 4194304
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = Object(a.classNames)("Progress", {
            "Progress--inverted": e.inverted
        }, e.className);
        return i.createElement("div", {
            className: t
        }, i.createElement("div", {
            className: "Progress__item"
        }), i.createElement("div", {
            className: "Progress__item"
        }), i.createElement("div", {
            className: "Progress__item"
        }))
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = (n(9), n(35));
    r.defaultProps = {
        inverted: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        try {
            e.focus()
        } catch (t) {}
    }
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(81),
        c = n(41),
        u = n(132),
        l = n(57),
        d = n(15),
        f = n(67),
        p = n(52),
        m = n(164),
        g = n(102),
        h = n(111),
        _ = n(167),
        v = n(22),
        b = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        y = 0,
        w = 1,
        O = 2,
        C = 3,
        k = 6,
        E = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.showInvitationLink = function() {
                    var e = a.props.store,
                        t = e.get(),
                        n = t.peer;
                    return a.setState({
                        invitationLoading: !0
                    }), Object(c.getInviteLink)(n - 2e9, t).then(function(e) {
                        var t = b(e, 1),
                            n = t[0];
                        a.setState({
                            section: O,
                            invitationLoading: !1,
                            invitationLink: n
                        })
                    })
                }, a.onUpdateFlags = function(e) {
                    var t = a.props.store,
                        n = t.get(),
                        r = n.peer;
                    return Object(c.updateFlags)(r, e, n)
                }, a.onLeave = function() {
                    var e = a.props,
                        t = e.store,
                        n = e.closePopup,
                        r = t.get(),
                        i = r.peer,
                        o = Object(s.isFvkcomgroup)(t, i),
                        l = showFastBox({
                            title: o ? getLang("mail_vkcomgroup_leave_title") : getLang("mail_chat_leave_title"),
                            dark: 1,
                            bodyStyle: "padding: 20px; line-height: 160%;"
                        }, o ? getLang("mail_vkcomgroup_leave_confirm") : getLang("mail_chat_leave_confirm"), o ? getLang("mail_leave_vkcomgroup") : getLang("mail_leave_chat"), function() {
                            t.set(c.unpinMessageOptimistic.bind(null, i)), t.set(c.leaveChat.bind(null, i)), l.hide(), n(), t.get().longpoll.push([Object(u.resetPeer)()])
                        }, getLang("global_cancel"), function() {
                            l.hide()
                        })
                }, a.onResetLink = function() {
                    var e = a.props.store,
                        t = e.get(),
                        n = t.peer;
                    return Object(c.resetInviteLink)(n, t).then(function(e) {
                        var t = b(e, 1),
                            n = t[0];
                        a.setState({
                            invitationLink: n,
                            invitationLinkReseted: !0
                        })
                    })
                }, a.onShowAttachments = function() {
                    var e = a.props.store.get().peer;
                    window.showWiki({
                        w: "history" + Object(s.convertPeerToUrl)(e) + "_photo"
                    }, null, {})
                }, a.state = {
                    section: y,
                    invitationLink: null,
                    invitationLinkReseted: !1
                }, a
            }
            return a(t, e), t.prototype.go = function(e) {
                this.setState({
                    section: e
                }, this.props.updatePopup)
            }, t.prototype.getPopupTitle = function() {
                var e = this.props.getLang;
                switch (this.state.section) {
                    case w:
                        return e("mail_settings_add_members");
                    case O:
                    case C:
                        return e("mail_chat_invite_link");
                    case k:
                        return e("mail_settings_options");
                    default:
                        return e("mail_settings_title")
                }
            }, t.prototype.componentWillReceiveProps = function(e) {
                var t = this,
                    n = e.store.get(),
                    r = n.peer,
                    i = n.tabs[r];
                i.photoLarge || i.photoGrid || this.resync || (this.resync = !0, e.store.set(c.getChatDetails.bind(null, r)).then(function() {
                    t.resync = !0
                }))
            }, t.prototype.componentDidMount = function() {
                this.props.updatePopup()
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.store,
                    r = t.getLang,
                    i = t.closePopup,
                    a = n.get(),
                    c = a.peer,
                    u = a.tabs[c],
                    b = Object(s.isFvkcomgroup)(n, c),
                    E = b ? r("mail_im_n_vkcomgroup_members", Object(s.getAliveMembersCount)(u)) : r("mail_im_n_chat_members", Object(s.getAliveMembersCount)(u));
                return o.createElement("section", {
                    className: "ChatSettings"
                }, o.createElement(l["default"], {
                    title: this.getPopupTitle(),
                    back: this.state.section !== y ? r("global_back") : void 0,
                    onCloseClick: i,
                    onBackClick: function() {
                        return e.go(y)
                    }
                }), this.state.section === y && o.createElement("div", {
                    className: "ChatSettings__content"
                }, o.createElement(f["default"], {
                    store: n,
                    getLang: r,
                    photo: u.photoLarge,
                    grid: u.photoGrid,
                    title: u.name,
                    flags: u.data.flags,
                    meta: E,
                    description: ""
                }), o.createElement(g["default"], {
                    store: n,
                    getLang: r,
                    showNotificationSettings: function() {},
                    showMembersSettings: function() {
                        return e.go(w)
                    },
                    showAttachments: this.onShowAttachments,
                    showInvitationLink: this.showInvitationLink,
                    showSettings: function() {
                        return e.go(k)
                    }
                }), b ? null : o.createElement("div", {
                    className: "ChatSettings__pane"
                }, o.createElement(h["default"], {
                    store: n,
                    getLang: r,
                    onLeave: this.onLeave
                })), o.createElement("div", {
                    className: "ChatSettings__pane"
                }, o.createElement(d["default"], {
                    appearance: "mobile",
                    className: "ChatSettings__leave",
                    onClick: this.onLeave
                }, r(b ? "mail_leave_vkcomgroup" : "mail_settings_leave")))), this.state.section === w && o.createElement(_["default"], {
                    store: n,
                    getLang: r
                }), this.state.section === k && o.createElement(v["default"], {
                    tab: u,
                    getLang: r,
                    back: function() {
                        return e.go(y)
                    },
                    onSave: this.onUpdateFlags
                }), this.state.section === O && o.createElement(p["default"], {
                    getLang: r,
                    onReset: function() {
                        return e.go(C)
                    },
                    reseted: this.state.invitationLinkReseted,
                    invitationLink: this.state.invitationLink
                }), this.state.section === C && o.createElement(m["default"], {
                    getLang: r,
                    onConfirm: this.onResetLink,
                    onCancel: function() {
                        return e.go(O)
                    }
                }))
            }, t
        }(o.Component);
    t["default"] = E
}, function(e, t, n) {
    var r = n(34),
        i = n(137);
    e.exports = Object.keys || function(e) {
        return r(e, i)
    }
}, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t, n) {
    e.exports = n(157).document && document.documentElement
}, function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = Object(ie.getTab)(e, e.get().peer);
        return !!Object(ie.getPinnedMessage)(e) || !!t.top_banner
    }

    function i(e, t) {
        var n = Object(ie.unpackStore)(e),
            r = Object(ie.getTab)(n, t);
        return Object(re.isChatPeer)(t) && Object(_e.isPinnedMessageVisibleInTab)(n, t) || !!r.top_banner && !Object(ie.isSearchShown)(t, n)
    }

    function a(e, t) {
        return Object(re.getPinnedMessageHeight)()
    }

    function o(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_chat_input_w", t),
            i = r.offsetHeight - r.clientHeight;
        return Math.min(window.clientHeight() - i, Math.max(Math.max(0, e), Me + n.offsetHeight + t.offsetTop))
    }

    function s(e, t) {
        var n = intval(domData(t.target, "msgid")),
            r = gpeByClass("_im_mess_" + n, t.target),
            i = geByClass1("_im_log_body", r),
            a = geByClass1("_im_mess_susp_cont", r);
        i.innerHTML = a.innerHTML
    }

    function c(e, t) {
        return geByClass1("_im_mess_" + t, e)
    }

    function u(e, t, n) {
        var r = geByClass1(e, t),
            i = void 0,
            a = void 0;
        Object(we.initDraggable)(r, {
            onStartDrag: function(e, t) {
                addClass(bodyNode, "cursor_ns_resize"), i = t, a = t
            },
            onDrop: function() {
                removeClass(bodyNode, "cursor_ns_resize")
            },
            onDrag: function(e, r) {
                var s = o(a - i + r, t);
                Object(re.setClassicChatHeight)(s), n().fixHeight()
            }
        })
    }

    function l(e, t) {
        Object(we.removeDraggable)(geByClass1(e, t))
    }

    function d(e) {
        hide(e.target)
    }

    function f(e, t, n, r, i, a, o, s, c, u) {
        removeClass(e, "im-page--history_empty"), b(e, t, n, r, i, a, o, s, c, u)
    }

    function p(e, t, n, r, i) {
        if (checkEvent(r)) return !0;
        var a = q2ajx(i.getAttribute("href")),
            o = intval(a.msgid);
        o && e.set(ne.changePeer.bind(null, e.get().peer, o)).then(function() {
            j(n, t, o, e)
        }), cancelEvent(r)
    }

    function m(e, t, n) {
        var r = Object(ie.getTab)(t, n),
            i = Object(ne.strHistory)(r.history);
        toggleClass(e, "im-page--history_empty-hist", !i)
    }

    function g(e, t, n, r) {
        if (hasClass(n.target, "_im_mess_marker")) {
            var i = n.target;
            window.tooltips && Object(se.toArray)(geByClass(re.FAILED_CLASS, t)).map(function(e) {
                return geByClass1("_im_mess_marker", e)
            }).filter(function(e) {
                return e !== i
            }).forEach(function(e) {
                return tooltips.hide(e, {
                    fasthide: !0
                })
            });
            var a = domData(r, "msgid");
            showTooltip(i, {
                content: getTemplate("im_failed_menu", {
                    id: a
                }),
                className: "im-page--failed-tt" + (a > 0 ? " no_delete" : ""),
                appendParentCls: "_chat_body_wrap",
                dir: "down",
                noZIndex: !0,
                shift: [12, 8],
                hasover: !0
            })
        }
    }

    function h(e) {
        return geByClass1("_im_peer_history", e)
    }

    function _(e) {
        addClass(e, "im-page--history_empty"), h(e).innerHTML = ""
    }

    function v(e, t) {
        var n = t.contHeight(),
            r = e.scrollTop + (n - e.contHeight);
        t.scrollTop(r)
    }

    function b(e, t, n, r, i, a, o, s) {
        var c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0,
            u = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : !1,
            l = (t.get().tabs || {})[n];
        i().hideError(), a.renderPeer(t), s.renderPeer(t);
        var d = geByClass1("_im_peer_history", e);
        if (!t.get().tabHistoryNotChanged) {
            val(geByClass1("_im_page_peer_name", e), l.tab);
            var f = Object(ne.strHistory)(l.history);
            m(e, t, n), f || (f = getLang("mail_im_here_history")), val(d, f), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), Object(re.isClassicInterface)(t) || Object(re.fixTableCellChildHeight)("_chat_body_wrap", e), F(t, r, e)
        }
        if (Object(ne.isSearchingInplace)(n, t.get()) ? i().showSearch(t) : i().cancelSearch(t, !1), o.changePeer(n, t), t.get().msgid) j(r, e, t.get().msgid, t);
        else if (l.scrollBottom && c) {
            v(l, r);
            var p = Object(re.isMessagesVisible)(t, e, r),
                g = Te(p, 1),
                h = g[0];
            l.skipped || setTimeout(function() {
                l.unread && !h && L(t, e, !0), O(t, r, e)
            }, 100)
        } else E(r, e, i, t, u) || r.scrollBottom(Le);
        window.LazyLoad && window.LazyLoad.scan(r.scroll ? r.scroll.scroller : !1)
    }

    function y(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || t.scrollTop(),
            i = t.scrollBottom(),
            a = t.contHeight(),
            o = e.get().peer;
        e.set(ne.saveHistoryScroll.bind(null, o, r, i, a))
    }

    function w() {
        return oe.screenfull.isFullscreen
    }

    function O(e, t, n) {
        var r = Object(ie.isGoToEndVisible)(e),
            i = 4 * t.getScrollHeight();
        t.scrollBottom() > i && !r && L(e, n, !0, 2 * t.getScrollHeight())
    }

    function C(e, t, n, r, i, a, o, s) {
        var c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0;
        if ((e.get().history_init || (e.get().history_init = !0, !(s.scrollTop() >= 0))) && !w()) {
            i.update(s), i.show();
            var u = e.get().peer;
            if (0 !== u && Object(re.isFullyLoadedTab)(e.get(), u) && (Oe["default"].onHistoryScroll(s.scrollTop()), !layers.visible)) {
                var l = Object(ie.isGoToEndVisible)(e),
                    d = Object(ie.getTab)(e, u);
                d && !d.skipped && 0 > o ? O(e, s, a) : o > 0 && !d.skipped && !d.unread && z(e, a), I(e, s) && (l && d && !d.skipped && z(e, a), d.unread > 0 && k(e));
                var f = Object(re.wrapLoading)(n);
                if (!Object(ne.isSearchingInplace)(u, e.get()) && c && r(s), !Xe && (0 > o || 0 === s.scrollBottom()) && s.scrollBottom() < Ie) {
                    if (Object(ne.isSearchingInplace)(u, e.get())) return;
                    if (d.skipped > 0 && !e.get().no_moving_down) {
                        var p = gpeByClass("_im_page_history", p),
                            m = e.get();
                        Xe = !0;
                        var g = e.set(ne.loadLessHistory).then(t().loadHistory.bind(null, m.peer, {
                            reversed: !0
                        })).then(function() {
                            k(e), Xe = !1, L(e, p), d.skipped || e.set(ne.changePeer.bind(null, e.get().peer, !1, !1))
                        });
                        return D(p, !0), void g.then(D.bind(null, p, !1))
                    }
                }
                if (!Xe && s.scrollTop() < Ie) {
                    if (Object(ne.isSearchingInplace)(u, e.get())) {
                        Xe = !0;
                        var h = t().getSearchResulstModule();
                        return h.isAll(e) ? void(Xe = !1) : void f(h.loadMore(e).then(function(n) {
                            Xe = !1, n && (t().loadHistory(e.get().peer, {}, e, n), r(s))
                        }), "up")
                    }
                    var _ = e.get();
                    d.allShown || (Xe = !0, f(e.set(ne.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, _.peer, {})).then(function() {
                        Xe = !1, r(s)
                    }), "up"))
                }
                0 > o && J(e, u, s.scrollBottom(), a, t), Object(ne.videoAutoPlayHandler)()
            }
        }
    }

    function k(e) {
        return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void 0 : e.set(ne.readLastMessages.bind(null, e.get().peer))
    }

    function E(e, t, n, r, o) {
        var s = geByClass1("_im_unread_bar_row", t);
        if (s) {
            var c = r.get(),
                u = c.peer,
                l = s.getBoundingClientRect(),
                d = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
            Object(re.isClassicInterface)(r) && (d += Ne + (i(c, u) ? a(c, u) : 0));
            var f = e.scrollTop() - d + l.top;
            return e.scrollTop(f), y(r, e, f), setTimeout(function() {
                u === r.get().peer && C(r, n, h(t), function() {}, o, t, 0, e)
            }, 80), k(r), !0
        }
        return !1
    }

    function j(e, t, n, r) {
        var o = c(t, n);
        if (o) {
            var s = Object(re.isClassicInterface)(r),
                u = r.get().peer,
                l = s ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                d = o.offsetTop + domPN(o).offsetTop + domPN(domPN(o)).offsetTop + domPN(domPN(domPN(o))).offsetTop;
            s && i(r, u) && (d -= a(r.get(), u)), e.scrollTop(d - e.getScrollHeight() / 2 + l / 2), addClass(o, "im-mess_light"), setTimeout(function() {
                removeClass(o, "im-mess_light")
            }, Pe)
        }
    }

    function S(e, t, n) {
        n.updateLastSeen(e)
    }

    function T(e, t, n, r, i) {
        var a = domData(i, "action"),
            o = domData(i, "msgid"),
            s = geByClass1("_im_mess_marker", c(n, o));
        switch (a) {
            case "resend":
                t(r, i);
                break;
            case "delete":
                e.set(ne.removeFailed.bind(null, e.get().peer, o)).then(function() {
                    Object(re.removeMessages)([o], h(n))
                })
        }
        tooltips.hide(s, {
            fasthide: !0
        })
    }

    function I(e, t) {
        return Object(ie.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
    }

    function L(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            i = e.get().peer;
        if (!Object(re.isReservedPeer)(i)) {
            var a = e.get().tabs[i],
                o = geByClass1(Re, t),
                s = geByClass1("_im_to_end_label", o);
            n && a.unread > 0 ? val(s, getLang("mail_im_new_messages", a.unread)) : val(s, getLang("mail_im_to_end_new"));
            var c = !1;
            (n || a.skipped > 0) && !Object(ne.isSearchingInplace)(e.get().peer, e.get()) ? (c = !0, addClass(o, "im-to-end_shown")) : U(o, !0), e.set(ne.updateGoToEndVisibility.bind(null, [c, intval(r)]))
        }
    }

    function x(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 === e.scrollTop() && 0 === e.scrollBottom()) return !1;
        var n = e.scrollBottom();
        return (t ? xe + t : xe) > n
    }

    function P(e, t, n, r, i) {
        var a = domData(i, "msgid"),
            o = e.get().peer,
            s = Object(ie.getMessage)(e, o, a);
        s.type === ye.EDIT_MESSAGE ? (n().sendEditMessage(e, s), n().resendMessage(o, a)) : e.get().imQueueResend(o, a).then(function(t) {
            e.get().longpoll.push([Object(ye.resendEvent)(o, t.mess)])
        })
    }

    function M(e, t, n, r, i) {
        var a = intval(domData(i, "peer")),
            o = intval(domData(gpeByClass("_im_mess", i), "msgid")),
            s = e.get().tabs[a].hash;
        return Object(ne.restoreMessageSend)(o, a, s, e.get().gid), e.set(ne.restoreMessage.bind(null, o, a)).then(re.restoreMessage.bind(null, o, a, h(t))).then(function() {
            return F(e, n, t)
        }), !1
    }

    function A(e, t) {
        e().showCreation(t)
    }

    function N(e, t, n) {
        cancelStackFilter("forward"), e.set(ne.prepareForward.bind(null, null)).then(function() {
            t().changePeer(!1, e), removeClass(n, "im-page--history_fwd"), e.get().longpoll.push([Object(ye.transitionEvent)("default")])
        })
    }

    function D(e, t) {
        var n = geByClass1(Re, e);
        toggleClass(n, "im-to-end_loading", t)
    }

    function R(e, t, n, r) {
        var i = t.get().tabs[t.get().peer];
        return i.skipped ? (D(n, !0), void t.set(ne.changePeer.bind(null, t.get().peer, !1, !1)).then(function() {
            return t.set(ne.loadPeer.bind(null, t.get().peer, !0, -1, !1))
        }).then(function() {
            D(n, !1), e().changePeer(t, !1, !1), k(t)
        })) : (r.scrollBottom(Le), L(t, n), k(t), void J(t, t.get().peer, 0, n, e))
    }

    function F(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        if (Object(re.isClassicInterface)(e)) {
            var i = t.contHeight(),
                a = geByClass1("_im_chat_input_w", n),
                s = a.offsetHeight - a.clientHeight,
                c = geByClass1("_im_chat_resize", n),
                u = geByClass1("_im_chat_input_parent", n),
                l = geByClass1("_im_chat_audio_input_parent", n);
            if (r = r !== !1 ? r : Object(re.getClassicChatHeight)(), r !== !1 && r > 0) {
                var d = o(r, n),
                    f = hasClass(l, qe) || hasClass(l, We),
                    p = f ? l : u,
                    m = d - p.offsetHeight;
                c.style.height = window.clientHeight() - d - s + "px", setStyle(a, {
                    top: m + "px",
                    bottom: "auto"
                })
            } else c.style.height = "0px", setStyle(a, {
                top: "auto",
                bottom: "0px"
            });
            var g = geByClass1("_im_peer_history_w", n);
            return setStyle(g, {
                borderBottomWidth: a.offsetHeight - Ae - 1
            }), t.contHeight() - i
        }
        Object(re.fixTableCellChildHeight)("_chat_body_wrap", n);
        var h = t.getScrollHeight();
        t.update(!1, !0);
        var _ = t.getScrollHeight();
        return h - _
    }

    function B(e, t, n, r) {
        var i = t.offsetHeight;
        r(), e.heightIncreased(t.offsetHeight - i, n)
    }

    function H(e, t) {
        var n = t.getBoundingClientRect().top;
        showTooltip(t, {
            className: "im-page--admin-tt",
            text: getLang("mail_only_admin_see"),
            appendParentCls: "_chat_body_wrap",
            shift: [20, 5],
            dir: "auto",
            showdt: 400,
            noZIndex: !0,
            toup: n > 200
        })
    }

    function U(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
    }

    function z(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = geByClass1(Re, t);
        e.set(ne.updateGoToEndVisibility.bind(null, [!1, 0])), U(r, n)
    }

    function G(e, t, n) {
        oe.screenfull.isFullscreen || 0 === t.get().peer || Object(re.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
    }

    function V(e, t) {
        var n = e.get(),
            r = n.peer,
            i = domClosest(Ke, t.target),
            a = intval(domData(i, "msgid")),
            o = Object(ie.getMessage)(e, r, a),
            s = o && Object(ae.isServiceMsg)(o) && o.kludges.source_act;
        if (s === re.CHAT_PIN_MESSAGE || s === re.CHAT_UNPIN_MESSAGE) {
            var c = i.querySelector("." + Qe);
            if (c && "A" !== c.tagName) {
                var u = o.kludges.source_chat_local_id;
                if (!u || Ze[u]) return;
                Ze[u] = Object(ne.getMessageLocalId)(r, u, n).then(function(e) {
                    var t = Te(e, 1),
                        n = t[0];
                    if (n) {
                        var i = "/im?sel=" + Object(re.convertPeerToUrl)(r) + "&msgid=" + n,
                            a = c.innerHTML;
                        domReplaceEl(c, Object(re.serviceLink)(i, a, !0, Qe)), delete Ze[u]
                    }
                })
            }
        }
    }

    function W(e, t, n) {
        var r = e.get(),
            i = r.peer,
            a = n.target.href && n.target.href.match(/msgid=([\d]+)/),
            o = a && a[1];
        if ("A" === n.target.tagName && o && !Object(re.isAlreadyDeleted)(e, i, o) && !checkEvent(n)) {
            var s = Object(ie.getMessage)(e, i, o);
            s ? (e.setState({
                msgid: o
            }), Object(Ce.updateLocation)({
                msgid: o
            }), t().focusOnMessage()) : r.longpoll.push([Object(ye.changePeer)(i, o)])
        }
        cancelEvent(n)
    }

    function q(e) {
        var t = Object(ie.getCurrentTab)(e);
        Object(re.isChatPeer)(t.peerId) && (t.pinHideId = cur.imDb.select(ke.PIN_HIDDEN_ID_OP, t.peerId))
    }

    function K(e, t, n, r, i) {
        e.setState({
            isEditing: !0
        }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", function() {
            return Q(e, t, n, r, i)
        });
        var a = new je.ImDraft;
        a.dData.txt = Object(Ee.convertEmojiHtmlToRegularText)(i.text), a.dData.attaches = Object(je.convertKludgesToAttaches)(i.kludges, i.messageId), n.toggleStickers(e, !1), n.setDraft(e, a), setTimeout(function() {
            return n.focusOn(e)
        }, 0)
    }

    function Q(e, t, n, r, i) {
        e.setState({
            isEditing: !1
        }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, Object(ie.getPeer)(e) ? Object(ie.getTabDraft)(Object(ie.getCurrentTab)(e)) : null), n.toggleStickers(e, !0), $(t)
    }

    function Y(e) {
        var t = geByClass1("im-mess_is_editing");
        if (!t) return null;
        var n = e.get().tabs[e.get().peer],
            r = Object(ie.parserMessage)(n.msgs[domData(t, "msgid")]);
        return r && r.peerId == e.get().peer ? r : null
    }

    function $(e) {
        Object(se.toArray)(geByClass("_im_history_tooltip", e)).forEach(hide)
    }

    function X(e, t, n) {
        var r = e.get(),
            i = domClosest($e, n.target),
            a = domData(i, "msgid"),
            o = Object(ie.getMessage)(r, r.peer, a),
            s = function(e) {
                return t().replaceAttachmentPlaceholders(e, o)
            };
        o && (e.set(ne.addAttachmentsToStoreData.bind(null, o, [Object(re.renderMessageMedia)(o)])).then(s), e.set(ne.loadMedia.bind(null, o)).then(s))
    }

    function Z(e, t) {
        Object(re.boxHandleEditTimeTooltips)(showBox("al_im.php", t, {
            dark: 1
        }), e)
    }

    function J(e, t, n, r, i) {
        var a = 50,
            o = Object(ie.getTab)(e, t),
            s = o && o.msgs && o.history && !Xe && o.offset > 60 && 0 == o.skipped && 50 > n && n >= 0 && 0 === (e.get().selectedMessages || []).length;
        if (s) {
            var c = Object.keys(o.msgs).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return e - t
            }).slice(0, -a);
            e.set(ne.removeMessages.bind(null, c, t)).then(function() {
                return i().removeMessages(c, t, e)
            })
        }
    }

    function ee(e, t, n, i, o, s, u, d, p, m, g, w, O, C, k, E) {
        var T = void 0,
            P = throttle(function() {
                n.smoothScroll.apply(n, arguments)
            }, 300);
        return {
            changePeer: function(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0,
                    a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
                if (0 === e.get().peer && k.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return o.setDraft(e, null), _(t, e);
                if (Object(re.isFullyLoadedTab)(e.get(), e.get().peer)) {
                    removeClass(t, "im-page--history_search"), e.set(ne.dropSelection), i.changeActions(e);
                    var c = e.get().peer,
                        u = e.get().prevPeer;
                    removeClass(t, "im-page--history_loading"), r ? o.setDraft(e, Object(ie.getTabDraft)(Object(ie.getCurrentTab)(e))) : o.updateState(e), L(e, t), s().updateTyping(c, e), k.toggle(!0), S(e, t, i), Object(re.isReservedPeer)(u) && !Object(re.isReservedPeer)(c) ? (f(t, e, c, n, s, i, d, E, a, k), k.reset(n)) : Object(re.isReservedPeer)(u) || Object(re.isReservedPeer)(c) || (b(t, e, c, n, s, i, d, E, a, k), k.reset(n)), Object(re.ensureDomHasActions)(t)
                }
            },
            preparePeer: function(e) {
                var n = Object(ie.getPeer)(e);
                q(e), o.setDraft(e, Object(ie.getTabDraft)(Object(ie.getTab)(e, n))), s().updateTyping(n, e), s().hideError(), i.renderPeer(e), E.renderPeer(e), i.hideActions(e), d.changePeer(n, e), S(e, t, i), k.toggle(!1), z(e, t, !0)
            },
            saveScroll: function(e) {
                return y(e, n)
            },
            loadingPeer: function(e) {
                Object(ne.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
            },
            stopLoading: function(e) {
                removeClass(t, "im-page--history_loading")
            },
            deselectDialog: function(e) {
                u().removeSelection(e)
            },
            replaceMessageAttrs: function(e, n) {
                Object(re.replaceMessageAttrs)(n.get(), h(t), e)
            },
            cleanSelection: function(e) {
                m.cleanSelection(e)
            },
            updateDialogFilters: function(e) {
                u().updateDialogFilters(e)
            },
            getSearchResulstModule: function() {
                return T
            },
            insertSearch: function(e, r) {
                T || (i.deselectAll(r), T = Object(pe.mount)(t, r, s)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), h(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), h(t).innerHTML = Object(re.renderEmptySearch)()), F(r, n, t), n.scrollBottom(0), L(r, t), k.reset(n)
            },
            updateChatTopic: function(e, t) {
                u().updateDialog(e, t), e === t.get().peer && (i.renderPeer(t), i.renderActions(t), E.renderPeer(t))
            },
            updateActions: function(e) {
                i.changeActions(e)
            },
            updateChatPhoto: function(e, r, a) {
                if (Object(re.isPeerActive)(e.peerId, a.get())) {
                    i.renderPeer(a), E.renderPeer(a);
                    var o = x(n);
                    Object(re.addChatPhotoToUpdate)(e, r, a.get(), h(t)), o && n.scrollBottom(Le)
                }
            },
            markImportant: function(e, n, r) {
                var a = c(t, e);
                a && (i.changedMessageSelection(r), p.markImportant(e, n, r))
            },
            isNewMessagesVisible: function(e) {
                return I(e, n)
            },
            loadHistory: function(e, r, i) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                    o = i.get();
                if (Object(re.isPeerActive)(e, o)) {
                    var s = a || o.tabs[e].historyToAppend;
                    if (!s) return;
                    var c = geByClass1("_im_peer_history", t),
                        u = domFC(c),
                        l = n.scrollBottom(),
                        d = r.reversed ? function(e) {
                            return c.appendChild(e)
                        } : function(e) {
                            return c.insertBefore(e, u)
                        },
                        f = 0;
                    r.reversed && (f = c.offsetHeight);
                    var p = sech(s),
                        m = document.createDocumentFragment();
                    p.forEach(function(e) {
                        return m.appendChild(e)
                    }), d(m), r.reversed && k.heightIncreased(c.offsetHeight - f, n), r.reversed || n.scrollBottomFixSave(l), n.update(!1, !0);
                    var g = p.filter(function(e) {
                        return hasClass(e, "_im_bar_date")
                    });
                    k.parseMore(g, n), Object(re.ensureDomHasActions)(t)
                }
            },
            sendMessage: function(e) {
                0 !== e.get().peer && o.sendMessage()
            },
            editMessage: function(e, r) {
                if (Object(re.isFullyLoadedTab)(e, r.peerId) && Object(re.isPeerActive)(r.peerId, e.get())) {
                    var a = c(t, r.messageId);
                    if (!a) return;
                    Object(re.editAndReplaceMessage)(e.get(), r, t), i.reRenderPinned(e), k.reset(n)
                }
            },
            addMessage: function(e, r) {
                if (!Object(ne.isSearchingInplace)(r.peerId, e.get()) && Object(re.isFullyLoadedTab)(e, r.peerId) && Object(re.isPeerActive)(r.peerId, e.get())) {
                    if (c(t, r.messageId)) return;
                    var i = h(t);
                    B(k, i, n, function() {
                        var a = x(n),
                            o = geByClass1("_im_unread_bar_row", t),
                            c = Object(re.isMessagesVisible)(e, t, n),
                            u = Te(c, 2),
                            l = u[0],
                            d = u[1];
                        Object(re.appendToHistory)(e.get(), r, i, !0, !0, !l && !o), removeClass(t, "im-page--history_empty-hist");
                        var f = Object(ie.getTab)(e, e.get().peer),
                            p = Object(ae.isServiceMsg)(r) && r.userId === vk.id,
                            m = r.kludges && r.kludges.source_act,
                            g = p && m !== re.CHAT_PIN_MESSAGE && m !== re.CHAT_UNPIN_MESSAGE;
                        f.skipped || l || !Object(ae.isUnread)(f, r) || Object(ae.isOut)(r) || L(e, t, !0, d), (r.local || a || g) && n.scrollBottom(0), s().updateTyping(r.peerId, e), $(t)
                    });
                    var a = domPS(domLC(i));
                    if (hasClass(a, "_im_bar_date")) {
                        var o = ce("div");
                        o.innerHTML = a.outerHTML, k.parseMore(o, n)
                    }
                    s().hideError(), k.update(n), Object(ne.updateMentions)(e.get()), J(e, r.peerId, n.scrollBottom(), t, s)
                }
            },
            setMessageErrored: function(e, n, r, i) {
                r && s().showError(r), Object(re.setMessageError)(e, n, t)
            },
            markMessagesAsRead: function(e, n) {
                e.get().peer === n.peerId && Object(re.markMessagesAsRead)(e.get(), n.peerId, t)
            },
            compensateHistoryHeightChange: function(e) {
                n.scrollTop(n.scrollTop() + e * a(w.get(), w.get().peer))
            },
            hideFwd: function(e) {
                removeClass(t, "im-page--history_fwd")
            },
            updateTyping: function(e, n) {
                if (!Object(ne.isSearchingInplace)(e, n.get())) {
                    var r = n.get();
                    if (n.get().peer === e && Object(re.isFullyLoadedTab)(r, e)) {
                        var i = Object(re.formatTyper)(n.get().tabs[e].typing, e, !1, n.get()),
                            a = geByClass1(re.TYPING_CLASS, t);
                        if (a || i) {
                            if (!a) {
                                var o = geByClass1(Ue, t);
                                val(o, getTemplate("im_typing", {
                                    cls: Object(re.isClassicInterface)(n) ? "im-typing_classic" : ""
                                })), a = geByClass1(re.TYPING_CLASS, t)
                            }
                            val(geByClass1("_im_typing_name", a), i), i ? (addClass(a, "im-page--typing_vis"), s().hideError()) : removeClass(a, "im-page--typing_vis")
                        }
                    }
                }
            },
            scrollFix: function(e, t, r) {
                k.heightIncreased(r, n), k.update(n), Object(re.isPeerActive)(t, e.get()) && x(n, r) && n.scrollBottom(Le)
            },
            goToEnd: function() {
                var e = this;
                R(function() {
                    return e
                }, w, t, n)
            },
            updateGoToEnd: function(e, r) {
                var i = Object(ie.getTab)(e, e.get().peer);
                i && i.skipped ? L(e, t) : z(e, t, r), g(0, n, !1);
                var a = e.get().peer;
                setTimeout(function() {
                    e.get().peer === a && y(e, n)
                })
            },
            newMessage: function(e) {
                u().newMessage(e), z(e, t, !0)
            },
            scroll: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
                if (0 !== e.get().peer) {
                    var a = r ? n.getScrollHeight() : 40;
                    i === !0 && (a = n.contHeight()), a = "up" === t ? -a : a, r || i ? P(a, function() {
                        g(a, n)
                    }) : (n.scrollTop(n.scrollTop() + a), g(a, n))
                }
            },
            showCreation: function(e, t) {
                u().showCreation(e, t)
            },
            updateScroll: function() {
                return F(w, n, t)
            },
            toggleBarDate: function(e) {
                k.toggle(e)
            },
            changedMessageSelection: function(e) {
                i.changedMessageSelection(e)
            },
            updateOnline: function(e, t) {
                Object(re.isTabLoaded)(t.get(), e) && e === t.get().peer && i.renderPeer(t)
            },
            isEmpty: function(e) {
                return o.isEmpty(e)
            },
            replaceAttachmentPlaceholders: function(e, r) {
                if (Object(re.isPeerActive)(r.peerId, e.get())) B(k, h(t), n, function() {
                    var a = x(n);
                    Object(re.replaceAttaches)(t, r, e.get());
                    var o = Object(ie.getTab)(e, r.peerId);
                    if (o.mediacontent[r.messageId].length >= 3 && o.mediacontent[r.messageId][2].pinned) {
                        var s = Object(ie.parserMessage)(o.pinned);
                        s && s.messageId == r.messageId && (o.pinned = o.mediacontent[r.messageId][2].pinned, i.reRenderPinned(e))
                    }
                    a && n.scrollBottom(0)
                }), k.update(n);
                else if (Object(ae.isMoneyRequest)(r)) {
                    var a = Object(ie.getTab)(e, r.peerId);
                    if (a.mediacontent[r.messageId].length >= 3 && a.mediacontent[r.messageId][2].pinned) {
                        var o = Object(ie.parserMessage)(a.pinned);
                        o && o.messageId == r.messageId && (a.pinned = a.mediacontent[r.messageId][2].pinned)
                    }
                }
            },
            removeMessages: function(e, r, a) {
                a.get().peer === r && (Object(re.removeMessages)(e, h(t)), F(a, n, t), i.changedMessageSelection(a))
            },
            hideGoToEnd: function(e) {
                z(w, t, e)
            },
            removeMessagesRestore: function(e, n, r, i) {
                i.get().peer === n && Object(re.removeMessagesWithRestore)(e, n, r, h(t))
            },
            updateState: function(e, t) {
                u().updateState(e, t)
            },
            updateBanner: function(e) {
                E.renderPeer(e)
            },
            updateChat: function(e, t) {
                e.get().peer === t && (i.changeActions(e), i.renderPeer(e), i.renderActions(e), E.renderPeer(e), o.updateState(e), Object(ne.updateMentions)(e.get()))
            },
            focustTxt: function(e) {
                o.focusOn(e)
            },
            startSearch: function(e) {
                s().showSearch(e), d.changePeer(e.get().peer, e), d.search()
            },
            showSearch: function(e) {
                addClass(t, "im-page--hisory_search-open"), e.setState({
                    searchShown: !0
                }), r(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(function() {
                    return d.focus(e)
                }, 10)
            },
            cancelSearch: function(e) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                        searchShown: !1
                    }), r(e) && this.updateChatTopic(e.get().peer, e), i.changedMessageSelection(e)), a && !Object(re.isReservedPeer)(e.get().peer) && T) {
                    var o = e.get().tabs[e.get().peer];
                    h(t).innerHTML = Object(ne.strHistory)(o.history), F(e, n, t), n.scrollBottom(0), e.get().msgid && (j(n, t, e.get().msgid, e), L(e, t)), O(n), k.reset(n)
                }
                T && (T.unmount(), T = !1, Object(re.ensureDomHasActions)(t))
            },
            updateHistory: function(e) {
                0 !== w.get().peer && e(t)
            },
            focusOnMessage: function() {
                j(n, t, w.get().msgid, w)
            },
            sendEditMessage: function(e, t) {
                e.set(ne.deliverEditedMessage.bind(null, Object(ie.getTab)(e, t.peerId), t))["catch"](function(n) {
                    return e.get().longpoll.push([Object(ye.failedMessage)(t.peerId, t, n)])
                })
            },
            unmount: function() {
                Object(ue.destroyModule)(e), n.destroy(), clearInterval(C), o.unmount(), i.unmount(), p.unmount(), m.unmount(), d.unmount(), cancelStackFilter("forward"), l("_im_chat_resize_track", t)
            },
            removePeer: function(e, t) {
                u().removePeer(e, t)
            },
            restoreScroll: function(e, t) {
                var r = e.get().tabs[t];
                r.scrollBottom ? v(r, n) : n.scrollBottom(Le)
            },
            resendMessage: function(e, n) {
                e === w.get().peer && Object(re.startResendMessage)(e, n, t)
            },
            respond: function(e, t) {
                o.attachMessages(e, t), o.focusOn(e);
                var r = Object(ie.getTab)(e, t);
                r && !r.skipped && (n.scrollBottom(Le), O(n))
            },
            startForward: function(e) {
                addClass(t, "im-page--history_fwd"), geByClass1("_im_explain_fwd", t).textContent = getLang("mail_explain_fwd", e.get().pendingForward.msgIds.length), u().cancelSearch(e), u().removeSelection(e), cancelStackPush("forward", function() {
                    return N(e, u, t)
                })
            },
            cancelRecording: function() {
                o.cancelRecording()
            },
            hideError: function() {
                hide(geByClass1(ze, t))
            },
            showError: function(e) {
                geByClass1(ze, t).innerHTML = e, show(geByClass1(ze, t)), n.scrollBottom(Le)
            },
            startEditing: function(e) {
                if (Object(ne.isAnythingLoading)(w.get())) return void Object(re.showWaitUntilUploadedBox)();
                e = Object(ie.parserMessage)(e);
                var n = Y(w);
                if (!(o.isBlocked() || n && n.messageId == e.messageId)) {
                    n && this.cancelEditing(), $(t), w.get().searchShown && this.cancelSearch(w);
                    var r = c(t, e.messageId);
                    r && (this.cancelRecording(), K(w, t, o, r, e), i.deselectAll(w))
                }
            },
            cancelEditing: function() {
                var e = Y(w);
                e && Q(w, t, o, c(t, e.messageId), e)
            },
            getEditingMessage: function() {
                return Y(w)
            },
            focusEditingMessage: function() {
                var e = Y(w);
                e && j(n, t, e.messageId, w), o.focusOn(w)
            }
        }
    }

    function te(e, t, n) {
        var r = geByClass1("_im_peer_history_w", e);
        show(r), hasAccessibilityMode() && addClass(r, "history_a11y");
        var i = Object(ue.createMutations)(ee),
            a = i.callMutations,
            o = i.bindMutations,
            c = function(e) {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return function(e) {
                    t(e), n(e)
                }
            }(y.bind(null, t)),
            l = Object(be.mount)(t, e),
            f = C.bind(null, t, a, r, c, l, e),
            _ = Object(ve.createScroll)(geByClass1("_im_chat_body_abs", e), {
                onScroll: f,
                nativeScroll: Object(re.isClassicInterface)(t),
                shadows: !1
            });
        setTimeout(function() {
            t.get().peer && (q(t), (Object(ie.getCurrentTab)(t).pinned || Object(ie.getCurrentTab)(t).top_banner) && (a().updateChatTopic(t.get().peer, t), t.set(ne.setActions), v.changeActions(t)), t.get().msgid ? j(_, e, t.get().msgid, t) : E(_, e, a, t, l) || _.scrollBottom(Le), t.get().history_init = !1, l.reset(_), L(t, e), C(t, a, r, c, l, e, 0, _), Object(re.ensureDomHasActions)(e), nav.objLoc.st && (t.mutate(ne.setInplaceSearch.bind(null, nav.objLoc.st, t.get().peer)), a().startSearch(t)))
        }, 15);
        var v = Object(le.mount)(geByClass1("_im_dialog_actions", e), t, a),
            b = Object(de.mount)(geByClass1("_im_text_input", e), t, a),
            w = Object(fe.mount)(geByClass1("_im_dialog_actions", e), t, a),
            O = Object(me.mount)(e, t, a),
            k = Object(he.mount)(e, t, function() {
                return {
                    changedMessageSelection: v.changedMessageSelection
                }
            });
        Object(_e.mount)(e, t, a);
        var I = Object(Se.mount)(e, t, function() {
            return {
                hidePinned: function() {
                    Object(_e.pinnedMessageHide)(t, t.get().peer, a, !1)
                },
                compensateHistoryHeightChange: function(e) {
                    a().compensateHistoryHeightChange(e)
                },
                showPinned: function() {
                    Object(_e.pinnedMessageUnHide)(t, t.get().peer, a, !1)
                }
            }
        });
        Object(re.isReservedPeer)(t.get().peer) || t.set(ne.restoreHistoryQueue.bind(null, t.get().peer)).then(function() {
            Object(re.restoreQueue)(t.get().peer, t.get(), h(e)), m(e, t, t.get().peer)
        }), u("_im_chat_resize_track", e, n);
        var x = P.bind(null, t, e, a),
            D = M.bind(null, t, e, _),
            F = N.bind(null, t, n, e),
            B = A.bind(null, n, t),
            U = R.bind(null, a, t, e, _),
            z = g.bind(null, t, e),
            K = re.showEditTimeTooltip.bind(null, t),
            Q = T.bind(null, t, x, e),
            Y = re.showChatMembers.bind(null, t, a, ne.setCreationType),
            $ = p.bind(null, t, e, _),
            J = G.bind(null, a, t, _),
            te = V.bind(null, t),
            ae = W.bind(null, t, a),
            se = Object(ue.createModule)({
                handlers: function(n, r) {
                    r(e, "click", re.RESTORE_CLASS, D), r(e, "mouseover click", re.FAILED_CLASS, z), r(e, "mouseover", "_im_edit_time", K), r(e, "click", "_im_mess_susp", s.bind(null, e)), r(e, "click", De, F), r(e, "click", Fe, Q), r(e, "click", re.SHOW_CHAT_MEMBERS_CLASS, Y), r(e, "click", Be, $), r(e, "mouseover", He, H), r(e, "mouseover", Ke, te), r(e, "click", Qe, ae), r(e, "click", ze, d), r(e, "click", Ye, function(e, n) {
                        if (checkEvent(e)) return !0;
                        if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                        var r = geByClass1("flat_button", n),
                            i = {
                                invite_chat_id: domData(r, "inv-id"),
                                invite_hash: domData(r, "hash")
                            };
                        Object(re.showInvitationBox)(t, i, ne.leaveInvitation), cancelEvent(e)
                    }), r(e, "click", Ge, function() {
                        return t.get().longpoll.push([Object(ye.resetPeer)()])
                    }), r(e, "click", Ve, function(e) {
                        return X(t, a, e)
                    }), n(geByClass1("_im_peer_history_w", e), "mousemove", l.show), n(geByClass1("_im_start_new", e), "click", B), n(geByClass1(Re, e), "click", U), n(geByClass1("_im_cancel_edit", e), "click", function() {
                        return a().cancelEditing(), !1
                    }), n(geByClass1("_im_edit_focus_cur", e), "click", function() {
                        return a().focusEditingMessage(), !1
                    }), oe.screenfull.raw && n(document, oe.screenfull.raw.fullscreenchange, J)
                }
            });
        curNotifier.recvClbks.pin_hide = [function(e) {
            e.hide ? Object(_e.pinnedMessageHide)(t, e.peer, a, !1) : Object(_e.pinnedMessageUnHide)(t, e.peer, a, !1)
        }], window.showForwardBox = function(e) {
            return Z(t, e)
        };
        var ce = setInterval(S.bind(null, t, e, v), 1e4);
        return o(se, e, _, v, b, a, n, w, O, k, f, t, c, ce, l, I)
    }
    n.r(t), n.d(t, "mount", function() {
        return te
    });
    var ne = n(41),
        re = n(81),
        ie = n(199),
        ae = n(158),
        oe = n(135),
        se = n(145),
        ue = n(110),
        le = n(40),
        de = n(191),
        fe = n(127),
        pe = n(195),
        me = n(54),
        he = n(165),
        _e = n(201),
        ve = n(181),
        be = n(176),
        ye = n(132),
        we = n(74),
        Oe = n(59),
        Ce = n(200),
        ke = n(77),
        Ee = n(205),
        je = n(0),
        Se = n(147),
        Te = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        Ie = 1e3,
        Le = -30,
        xe = 30,
        Pe = 2e3,
        Me = 700,
        Ae = 15,
        Ne = 47,
        De = "_im_cancel_fwd",
        Re = "_im_to_end",
        Fe = "_im_failed_action",
        Be = "_im_mess_link",
        He = "_im_admin_name",
        Ue = "_im_typer_c",
        ze = "_im_error",
        Ge = "_im_join_cancel",
        Ve = "_im_retry_media",
        We = "im-audio-message_recorded",
        qe = "im-audio-message_recording",
        Ke = "_im_mess_srv",
        Qe = "im_srv_mess_link",
        Ye = "_chat_invitation",
        $e = "_im_mess",
        Xe = !1,
        Ze = {}
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i, o) {
        Object(E.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(a.bind(null, t, !1), 100);
        var c = d(o);
        c.map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            removeClass(e, W)
        }), n().createCanceled(e, r), i.resetSelection(), "add_member" === e.get().creationType && e.set(E.setCreationType.bind(null, "chat", [])), e.set(E.presetAvatar.bind(null, !1));
        var u = geByClass1(G, t);
        s(e, o, t), uiSearch.reset(geByClass1(R, t)), uiSearch.reset(geByClass1(F, t)), u && u.parentNode.removeChild(u), s(e, o, t), cancelStackFilter("im_search");
        var l = 0 === e.get().peer ? "search" : "default";
        e.get().longpoll.push([Object(P.transitionEvent)(l)]), attr(t, "aria-hidden", "true")
    }

    function i(e, t, n) {
        return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(function(e) {
            e.then(function(e) {
                e = e.filter(function(e) {
                    return !n.current_create_peer_ids[e.peerId]
                }), n.current_create_peer_ids = e.reduce(function(e, t) {
                    return e[t.peerId] = !0, e
                }, n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
            })
        }), Promise.resolve(n)
    }

    function a(e, t) {
        toggleClass(e, "im-create_material", t)
    }

    function o(e, t, n, i, a, o) {
        r(e, t, n, !1, a, o), e.get().longpoll.push([Object(P.changePeer)(i, !1, !1, !1, "create_conversation")])
    }

    function s(e, t, n) {
        var r = geByClass1(U, n),
            i = t.get().selection.length,
            a = "add_member" === e.get().creationType,
            o = i > 0,
            s = i > 1;
        a ? val(r, 1 === i ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with")) : (val(r, s ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog")), toggleClass(n, "im-create_chat-details", s)), toggleClass(n, "im-create_tools", o), toggleClass(r, "button_disabled", !o)
    }

    function c(e, t, n, r, i, a, o) {
        if (o) {
            var c = intval(domData(o, "list-id")),
                u = d(a),
                l = trim(o.textContent),
                f = geByClass1(F, t),
                p = getSize(f)[1],
                m = void 0;
            inArray(c, u) ? (m = r.removeSelection(c, l), removeClass(o, W)) : (m = r.addSelection(c, l), addClass(o, W)), m.then(function() {
                var e = p - getSize(f)[1],
                    t = i.scrollTop();
                i.scrollTop(t - e)
            }), s(e, a, t);
            var g = geByClass1(F, t);
            uiSearch.reset(g)
        }
    }

    function u(e, t) {
        var n = d(e),
            r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
            i = [];
        return t.online && i.push("online"), mobPlatforms[t.online] && i.push("mobile"), inArray(t.peerId, n) && r.push(W), getTemplate("im_owner_item", {
            owner_id: t.peerId,
            cls: " " + r.join(" "),
            photo: t.photo,
            name: t.name,
            link: t.href,
            img_cls: i.join(" ")
        })
    }

    function l(e) {
        return Object(j.getSearchText)(e) || !1
    }

    function d(e) {
        return e.get().selection.map(function(e) {
            return e.id
        })
    }

    function f(e, t, n, r) {
        toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
        var i = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
            a = geByClass1("_im_create_title", e);
        val(a, i), val(geByClass1(U, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat"));
        var o = n.get().selection.map(function(e) {
            return e.id
        });
        m(e, r, t, !1, o), Object(T.fixTableCellChildHeight)("_im_create_wrap_safe", e)
    }

    function p(e, t, n) {
        return e.then(function(e) {
            return e.filter(function(e) {
                return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
            })
        })
    }

    function m(e, t, n, r, a) {
        var o = geByClass1(F, e),
            s = void 0,
            c = void 0,
            u = Object(E.searchLocalHints)(r, t.get()),
            l = n.hoverFirstElement.bind(n, V, O(t));
        t.get().creation_shown_all = !1, n.reset(), n.pipe(p(u, r, t), r), n.toTop(), r ? (c = Object(E.searchTopConv)(r, t.get()), s = Object(E.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(p(s, r, t), r).then(l), n.pipe(p(c, r, t), r).then(l)) : (s = Promise.resolve([]), c = Promise.resolve([])), t.set(i.bind(null, [u, c, s], !0)), uiSearch.showProgress(o), Promise.all([u, s, c]).then(function() {
            return uiSearch.hideProgress(o)
        })
    }

    function g(e, t, n, r, i, a, o, s) {
        uiTabs.switchTab(s.firstElementChild);
        var c = domData(s, "type");
        switch (c) {
            case "chat":
                a.restore()
        }
        e.set(E.setCreationType.bind(null, c, [])).then(f.bind(null, t, r, i))
    }

    function h(e, t, n, r) {
        var i = r.get(),
            a = l(i),
            o = i.selection.map(function(e) {
                return e.id
            });
        n.unhoverElements(V), e.get().creationQuery = a, m(t, e, n, a, o)
    }

    function _(e, t, n, r) {
        var i = 2e9 + Math.round(rand(1e6, 2e6));
        cur.recieveCropResult = function(n) {
            cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(E.presetAvatar.bind(null, n)), Object(E.getOwnerPhoto)(n, i).then(function(e) {
                geByClass1(B, t).appendChild(ce("img", {
                    className: "im-chat-placeholder--img " + G,
                    src: e
                }))
            }), addClass(t, "im-create_photo-attached")
        }, Page.ownerPhoto(i)
    }

    function v(e, t) {
        geByClass1(B, t).innerHTML = "", e.set(E.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
    }

    function b(e, t, n, i, a, o) {
        d(t).map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            return removeClass(e, W)
        }), t.reset(), m(n, e, i, !1, d(t)), a.resetSelection(), r(e, n, o, !1, a, t)
    }

    function y(e, t, n, i, a, s, c) {
        function u(r) {
            b(e, t, n, i, a, s), o(e, n, s, r, a, t), unlockButton(p), Object(j.isSearching)(e) ? s().cancelSearch(e) : s().restoreDialogs(e)
        }
        var l = d(t),
            f = e.get(),
            p = geByClass1(U, n),
            m = uiSearch.getFieldEl(geByClass1(R, n)).value;
        return 0 !== l.length ? "add_member" === e.get().creationType ? (e.set(E.addNewMember.bind(null, f.peer, l))["catch"](function(e) {
            return showFastBox(getLang("global_error"), e)
        }), r(e, n, s, "", a, t)) : (lockButton(p), 1 === l.length ? u(l[0]) : void e.set(E.createChat.bind(null, f.next_chat_avatar, l, m)).then(function() {
            return u(f.next_peer)
        })["catch"](function(e) {
            unlockButton(p), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
        })) : void 0
    }

    function w(e, t) {
        return showTooltip(e, {
            text: getLang("mail_cancel"),
            black: 1,
            zIndex: 1e3,
            shift: [3, -2],
            appendCls: "js-im-page"
        })
    }

    function O(e, t) {
        var n = 70,
            r = t && t.get().selection.length;
        return {
            top: -1,
            bottom: Object(T.isClassicInterface)(e) ? r > 0 ? n - 1 : 0 : -1
        }
    }

    function C(e, t, n, i, o, s, u, l) {
        return {
            show: function(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                t.setState({
                    shown: !0
                }), a(e, !0), cancelStackPush("im_create", u), addClass(e, "im-create_shown");
                var s = i.get().selection.reduce(function(e, t) {
                    return e[t.id] = !0, e
                }, {});
                r && r.forEach(function(t) {
                    if (!s[t[0]]) {
                        var n = e.querySelector("._im_dialog" + t[0]);
                        o.addSelection(t[0], t[1]), n && !n.classList.contains(W) && n.classList.add(W)
                    }
                }), f(e, n, i, t), setTimeout(function() {
                    t.get().longpoll.push([Object(P.transitionEvent)("create")]), attr(e, "aria-hidden", "false"), o.focus()
                }, 1)
            },
            focusSearch: function(e) {
                o.focus()
            },
            confirmCreate: function(e) {
                l()
            },
            hide: function(n) {
                n.get().shown = !1, r(n, e, t, !1, o, i)
            },
            scroll: function(e) {
                n.scrollPage(e, !0)
            },
            updateScroll: function() {
                Object(T.fixTableCellChildHeight)("_im_create_wrap_safe", e), n.updateScroll()
            },
            selectElement: function(r) {
                c(r, e, t, o, n, i, n.getHoveredElement())
            },
            hoverPrevElement: function(e) {
                n.hoverPrevElement(V, null, O(e, i))
            },
            hoverNextElement: function(e) {
                n.hoverNextElement(V, null, O(e, i))
            },
            unmount: function() {
                Object(L.destroyModule)(s), n.unmount(), o.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
            }
        }
    }

    function k(e, t, n) {
        var a = Object(x["default"])({
                selection: []
            }),
            o = geByClass1(A, e),
            d = Object(S.mount)(o, Object(x["default"])({
                offset: 0,
                limit: q,
                elements: [],
                elCls: N
            }), function() {
                return {
                    idFn: function(e) {
                        return intval(e.peerId)
                    },
                    hoverableFn: function(e) {
                        return hasClass(e, "_im_dialog")
                    },
                    renderFn: u.bind(null, a),
                    more: function(e, n) {
                        var r = void 0;
                        return t.get().shown ? (t.get().creation_shown_all || l(a) !== !1 ? r = Promise.resolve([]) : (t.get().creation_shown_all = !0, r = Object(E.searchTopConv)(l(a), t.get())), t.set(i.bind(null, [r], !1)), p(r, l(a), t)) : Promise.resolve(!1)
                    },
                    onClick: function(r, i) {
                        checkEvent(r) || (c(t, e, n, m, d, a, i), cancelEvent(r))
                    }
                }
            });
        t.get().creationQuery = !1, t.get().creationType = "chat";
        var f = geByClass1(F, e),
            m = Object(I.mount)(f, a, function() {
                return {
                    selectionDeleted: function(n, r) {
                        s(t, n, e), removeClass(geByClass1("_im_dialog" + r), W)
                    },
                    onChange: h.bind(null, t, e, d)
                }
            }),
            O = r.bind(null, t, e, n, "cross", m, a),
            k = g.bind(null, t, e, n, d, a, m),
            j = _.bind(null, t, e),
            T = v.bind(null, t, e),
            P = b.bind(null, t, a, e, d, m, n),
            R = y.bind(null, t, a, e, d, m, n),
            G = geByClass1(M, e),
            K = Object(L.createModule)({
                handlers: function(t, n) {
                    t(G, "click", O), t(G, "mouseover", w.bind(null, G)), t(geByClass1(B, e), "click", j), t(geByClass1(H, e), "click", T), t(geByClass1(z, e), "click", P), t(geByClass1(U, e), "click", R), t(e, "mouseover", throttle(d.unhoverElements.bind(d, V), 100)), n(e, "click", D, k)
                }
            });
        return C(e, n, d, a, m, K, O, R)
    }
    n.r(t), n.d(t, "mount", function() {
        return k
    });
    var E = n(41),
        j = n(199),
        S = n(73),
        T = n(81),
        I = n(155),
        L = n(110),
        x = n(188),
        P = n(132),
        M = "_im_create_cancel",
        A = "_im_create_list",
        N = "_im_dialog",
        D = "_im_create_tab",
        R = "_im_dialogs_creation_name",
        F = "_im_create_select",
        B = "_im_create_avatar",
        H = "_im_create_remove_avatar",
        U = "_im_confirm_creation",
        z = "_im_cancel_creation",
        G = "_im_avatar_img",
        V = ["im-creation--item_hovered"],
        W = "olist_item_wrap_on",
        q = 100
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(35),
        c = n(180),
        u = n(24),
        l = n(148),
        d = n(153),
        f = n(107),
        p = n(65),
        m = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onCopyInviteLink = function(e) {
                    a.input && (a.input.focus(), a.input.select(), document.execCommand("copy"), a.setState({
                        copied: !0
                    })), e.preventDefault(), e.stopPropagation()
                }, a.onBlinkTextHide = function() {
                    a.setState({
                        copied: !1
                    })
                }, a.getHiddenInput = function(e) {
                    a.input = e
                }, a.onShowInviteLink = function() {
                    Object(p.canChangeInviteLink)(a.props.store) && a.props.showInvitationLink()
                }, a.state = {
                    copied: !1
                }, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.store,
                    n = e.getLang,
                    r = t.get(),
                    i = r.tabs[r.peer],
                    a = Object(s.classNames)("ChatSettingsMenu", {
                        "ChatSettingsMenu--copied": this.state.copied
                    });
                return o.createElement(u["default"], {
                    className: a
                }, Object(p.canInviteUser)(t) && o.createElement(l["default"], {
                    onClick: this.props.showMembersSettings,
                    chevron: !0
                }, o.createElement(f["default"], {
                    type: "plus"
                }), n("mail_settings_add_members")), o.createElement(l["default"], {
                    onClick: this.props.showAttachments,
                    chevron: !0
                }, o.createElement(f["default"], {
                    type: "attach"
                }), n("mail_im_show_media_history")), (i.inviteLink && Object(p.canSeeInviteLink)(t) || Object(p.canChangeInviteLink)(t)) && o.createElement(l["default"], {
                    onClick: this.onShowInviteLink,
                    chevron: Object(p.canChangeInviteLink)(t)
                }, o.createElement(f["default"], {
                    type: "link"
                }), n("mail_chat_invite_link"), i.inviteLink && o.createElement("span", {
                    className: "ChatSettingsMenu__invite"
                }, o.createElement("span", {
                    className: "ChatSettingsMenu__hidden"
                }, o.createElement("input", {
                    type: "text",
                    readOnly: !0,
                    value: i.inviteLink,
                    ref: this.getHiddenInput
                })), o.createElement(d["default"], {
                    className: "ChatSettingsMenu__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, n("mail_invite_link_copied")), o.createElement(c["default"], {
                    className: "ChatSettingsMenu__copy",
                    onClick: this.onCopyInviteLink
                }, n("mail_get_invite_link_copy")))), Object(p.isUserOwnerInChat)(i, r.id) && o.createElement(l["default"], {
                    onClick: this.props.showSettings,
                    chevron: !0
                }, o.createElement(f["default"], {
                    type: "gear"
                }), n("mail_settings_options")))
            }, t
        }(o.Component);
    t["default"] = m
}, , function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            return e
        }
    }
    var i = function() {};
    i.thatReturns = r, i.thatReturnsFalse = r(!1), i.thatReturnsTrue = r(!0), i.thatReturnsNull = r(null), i.thatReturnsThis = function() {
        return this
    }, i.thatReturnsArgument = function(e) {
        return e
    }, e.exports = i
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(35)),
        c = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                u.call(a);
                var o = a.getChildrenArray(n)[0];
                return a.refsStore = {}, a.state = {
                    isAnimating: !1,
                    active: o && (o.key || 0)
                }, a
            }
            return a(t, e), t.prototype.getTransform = function(e) {
                var t = e.offsetWidth,
                    n = e.offsetLeft - 50 + .5 * t;
                return "translateX(" + n + "px) scaleX(" + t / 100 + ")"
            }, t.prototype.componentDidMount = function() {
                var e = this.refsStore[this.state.active];
                this.setState({
                    transform: this.getTransform(e)
                })
            }, t.prototype.render = function() {
                var e = this,
                    t = {
                        "Tabs--animating": this.state.isAnimating
                    };
                return o.createElement("nav", {
                    className: Object(s.classNames)("Tabs", this.props.className, t),
                    style: this.props.style
                }, o.createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map(function(t, n) {
                    return o.createElement("li", {
                        className: Object(s.classNames)("Tabs__item", {
                            "Tabs__item--active": e.state.active === (t.key || n)
                        }),
                        onClick: function(r) {
                            return e.onClick(r, t.key || n)
                        },
                        ref: function(r) {
                            return e.getRef(t.key || n, r)
                        },
                        key: t.key || n
                    }, t)
                })), o.createElement("div", {
                    style: {
                        transform: this.state.transform
                    },
                    className: "Tabs__divider",
                    onTransitionEnd: this.onTransitionEnd
                }))
            }, t
        }(o.Component),
        u = function() {
            var e = this;
            this.getChildrenArray = function(e) {
                return [].concat(e.children)
            }, this.onClick = function(t, n) {
                if (n !== e.state.active) {
                    var r = e.refsStore[n],
                        i = e.getTransform(r);
                    e.setState({
                        active: n,
                        isAnimating: !0,
                        transform: i
                    }), e.props.onTabClick(t, n)
                }
            }, this.onTransitionEnd = function(t) {
                "transform" === t.propertyName && e.setState({
                    isAnimating: !1
                })
            }, this.getRef = function(t, n) {
                e.refsStore[t] = n
            }
        };
    t["default"] = c, c.defaultProps = {
        onTabClick: function() {}
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return i.createElement("div", {
            className: Object(a.classNames)("ChatSettingsRoundedIcon", "ChatSettingsRoundedIcon--" + e.type)
        })
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = n(35)
}, function(e, t, n) {
    "use strict";
    var r = n(196).f,
        i = n(45),
        a = (n(12), n(152)),
        o = n(112),
        s = n(97),
        c = n(143),
        u = n(86),
        l = n(85),
        d = n(173),
        f = n(203),
        p = n(182),
        m = n(109).fastKey,
        g = p ? "_s" : "size",
        h = function(e, t) {
            var n, r = m(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, l) {
            var d = e(function(e, r) {
                s(e, d, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[g] = 0, void 0 != r && u(r, n, e[l], e)
            });
            return a(d.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[g] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = h(t, e);
                    if (n) {
                        var r = n.n,
                            i = n.p;
                        delete t._i[n.i], n.r = !0, i && (i.n = r), r && (r.p = i), t._f == n && (t._f = r), t._l == n && (t._l = i), t[g]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    s(this, d, "forEach");
                    for (var t, n = o(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!h(this, e)
                }
            }), p && r(d.prototype, "size", {
                get: function() {
                    return c(this[g])
                }
            }), d
        },
        def: function(e, t, n) {
            var r, i, a = h(e, t);
            return a ? a.v = n : (e._l = a = {
                i: i = m(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = a), r && (r.n = a), e[g]++, "F" !== i && (e._i[i] = a)), e
        },
        getEntry: h,
        setStrong: function(e, t, n) {
            l(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [n.k, n.v]) : (e._t = void 0, d(1))
            }, n ? "entries" : "values", !n, !0), f(t)
        }
    }
}, function(e, t, n) {
    var r = n(119)("meta"),
        i = n(129),
        a = n(66),
        o = n(196).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        u = !n(87)(function() {
            return c(Object.preventExtensions({}))
        }),
        l = function(e) {
            o(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, r)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                l(e)
            }
            return e[r].i
        },
        f = function(e, t) {
            if (!a(e, r)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                l(e)
            }
            return e[r].w
        },
        p = function(e) {
            return u && m.NEED && c(e) && !a(e, r) && l(e), e
        },
        m = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: f,
            onFreeze: p
        }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            callMutations: function() {
                if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                return e
            },
            bindMutations: function() {
                if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                return e = e.apply(void 0, arguments)
            }
        }
    }

    function i(e, t, n, r) {
        l(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function a(e, t, n, r, i) {
        Object(c.addDelegateEvent)(t, n, r, i), e._registeredHandlers.push(["delegate", t, n, r, i])
    }

    function o(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(i.bind(null, t), a.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? c.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    n.r(t), n.d(t, "createMutations", function() {
        return r
    }), n.d(t, "createModule", function() {
        return o
    }), n.d(t, "destroyModule", function() {
        return s
    });
    var c = n(149),
        u = window,
        l = u.addEvent,
        d = u.removeEvent
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
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
    n.r(t);
    var s = n(83),
        c = n(35),
        u = n(81),
        l = n(106),
        d = n(24),
        f = n(148),
        p = n(42),
        m = n(31),
        g = 5,
        h = {
            appendParentCls: "ChatSettings"
        },
        _ = function(e) {
            function t(n) {
                i(this, t);
                var o = a(this, e.call(this, n));
                o.onToggleSearch = function() {
                    o.state.showSearch ? o.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }) : (o.setState({
                        showSearch: !0
                    }), requestAnimationFrame(function() {
                        o.searchInput.focus()
                    }))
                }, o.onSearchChange = function(e) {
                    e.target.value !== o.state.searchQuery && o.setState({
                        searchQuery: e.target.value
                    })
                }, o.onShowMore = function() {
                    var e = "all" === o.state.current ? "allShowMore" : "adminsShowMore";
                    o.state[e] && o.setState(r({}, e, !1))
                }, o.onTabClick = function(e, t) {
                    e.preventDefault(), o.state.current !== t && o.setState({
                        current: t
                    })
                }, o.handleDocumentClick = function(e) {
                    var t = ".ChatSettingsMembersWidget__search",
                        n = ".ChatSettingsMembersWidget__searchIcon";
                    !o.state.showSearch || o.state.searchQuery || e.target.closest(t) || e.target.closest(n) || o.setState({
                        showSearch: !1
                    })
                }, o.onKeydown = function(e) {
                    o.state.showSearch && 27 === e.keyCode && (o.searchInput.blur(), o.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }), e.preventDefault(), e.stopPropagation())
                }, o.searchInputRef = function(e) {
                    o.searchInput = e
                };
                var s = n.store.get(),
                    c = o.getMembers(s),
                    u = o.getAdmins(s);
                return o.state = {
                    showSearch: !1,
                    searchQuery: "",
                    current: "all",
                    all: c,
                    allShowMore: c.length > 5,
                    admins: u,
                    adminsShowMore: u.length > 5
                }, o.membersMap = c.reduce(function(e, t) {
                    return e[t] = !0, e
                }, {}), o.getSearchIndex(c).then(function(e) {
                    o.searchIndex = e
                }), o
            }
            return o(t, e), t.prototype.componentWillReceiveProps = function(e) {
                var t = this,
                    n = e.store.get(),
                    r = this.getMembers(n),
                    i = this.getAdmins(n),
                    a = {
                        removes: [],
                        additions: []
                    },
                    o = r.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {});
                r.forEach(function(e) {
                    t.membersMap[e] || a.additions.push(e)
                }), Object.keys(this.membersMap).forEach(function(e) {
                    o[e] || a.removes.push(e)
                }), (a.removes.length || a.additions.length) && (this.updateSearchIndex(n, a), this.membersMap = o), this.setState({
                    all: r,
                    allShowMore: this.state.allShowMore && r.length > 5,
                    admins: i,
                    adminsShowMore: this.state.adminsShowMore && i.length > 5
                })
            }, t.prototype.getMembers = function(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    r = -1 !== n.memberIds.indexOf(n.ownerId),
                    i = n.adminIds.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {}),
                    a = r ? [n.ownerId] : [];
                return a.concat(n.adminIds.filter(function(e) {
                    return e !== n.ownerId
                }), n.memberIds.filter(function(e) {
                    return e !== n.ownerId && !i[e]
                }))
            }, t.prototype.getAdmins = function(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    r = -1 !== n.memberIds.indexOf(n.ownerId),
                    i = r ? [n.ownerId] : [];
                return i.concat(n.adminIds.filter(function(e) {
                    return e !== n.ownerId
                }))
            }, t.prototype.getCurrentList = function() {
                var e = this.props.store,
                    t = this.state,
                    n = t.current,
                    r = t.showSearch,
                    i = t.searchQuery;
                if (r && i && this.searchIndex) return this.searchIndex.search(i);
                var a = this.state[n],
                    o = Object(u.getChatMembersByIds)(e.get(), a);
                return this.state[n + "ShowMore"] ? o.slice(0, g) : o
            }, t.prototype.getSearchIndex = function(e) {
                var t = window,
                    n = t.vkIndexer,
                    r = Object(u.getChatMembersByIds)(this.props.store.get(), e);
                return this.membersMap = r.reduce(function(e, t) {
                    return e[t.id] = !0, e
                }, {}), new Promise(function(e, t) {
                    var i = new n(r, function(e) {
                        return e.name
                    }, function() {
                        e(i)
                    })
                })
            }, t.prototype.updateSearchIndex = function(e, t) {
                var n = this,
                    r = Object(u.getChatMembersByIds)(e, t.removes),
                    i = Object(u.getChatMembersByIds)(e, t.additions);
                r.forEach(function(e) {
                    n.searchIndex.remove(e)
                }), i.forEach(function(e) {
                    n.searchIndex.add(e)
                })
            }, t.prototype.componentDidMount = function() {
                this.searchInput.addEventListener("keydown", this.onKeydown)
            }, t.prototype.componentWillUnmount = function() {
                this.searchInput.removeEventListener("keydown", this.onKeydown)
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props.store,
                    n = this.state,
                    r = n.current,
                    i = n.showSearch,
                    a = n.searchQuery,
                    o = n.allShowMore,
                    g = n.adminsShowMore,
                    _ = t.get(),
                    v = _.peer,
                    b = _.tabs[v],
                    y = this.getCurrentList(),
                    w = "all" === r ? o : g,
                    O = b.membersLastSeen,
                    C = {
                        "ChatSettingsMembersWidget--search": !!i
                    },
                    k = b.adminIds.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {});
                return s.createElement("div", {
                    className: Object(c.classNames)("ChatSettingsMembersWidget", C)
                }, s.createElement("header", {
                    className: "ChatSettingsMembersWidget__header"
                }, s.createElement("input", {
                    placeholder: getLang("mail_members_search"),
                    className: "ChatSettingsMembersWidget__search",
                    onChange: this.onSearchChange,
                    onInput: this.onSearchChange,
                    onPaste: this.onSearchChange,
                    value: this.state.searchQuery,
                    ref: this.searchInputRef
                }), s.createElement("button", {
                    className: "ChatSettingsMembersWidget__searchIcon",
                    onClick: this.onToggleSearch
                }), s.createElement(l["default"], {
                    className: "ChatSettingsMembersWidget__tabs",
                    onTabClick: this.onTabClick
                }, s.createElement("span", {
                    key: "all"
                }, getLang("mail_settings_everyone") + " ", s.createElement("span", {
                    className: "Tabs__desc"
                }, Object(u.getAliveMembersCount)(b))), b.adminIds.length > 0 && s.createElement("span", {
                    key: "admins"
                }, getLang("mail_settings_admins") + " ", s.createElement("span", {
                    className: "Tabs__desc"
                }, b.adminIds.length)))), s.createElement("div", {
                    className: "ChatSettingsMembersWidget__list"
                }, s.createElement(d["default"], {
                    border: !1
                }, y.length > 0 && y.map(function(n) {
                    return s.createElement(f["default"], {
                        selectable: !1,
                        border: !1,
                        aside: s.createElement(m["default"], {
                            getLang: getLang,
                            adminMap: k,
                            store: t,
                            storeData: _,
                            mid: n.id,
                            onLeave: e.props.onLeave
                        }),
                        key: n.id
                    }, s.createElement(p["default"], {
                        photo: n.photo,
                        title: n.name,
                        description: O && O[n.id] ? Object(u.getLastSeenText)(_, n.id, O[n.id], h) : "",
                        href: n.link
                    }))
                }), !y.length && i && a && s.createElement("div", {
                    className: "ChatSettingsMembersWidget__empty"
                }, getLang("mail_settings_not_found")), !(i && a) && w && s.createElement("div", {
                    className: "ChatSettingsMembersWidget__more",
                    onClick: this.onShowMore
                }, getLang("mail_settings_show_all_members")))))
            }, t
        }(s.Component);
    t["default"] = _
}, function(e, t, n) {
    var r = n(7);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, i) {
                    return e.call(t, n, r, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, n) {
    var r = n(196).f,
        i = n(66),
        a = n(38)("toStringTag");
    e.exports = function(e, t, n) {
        e && !i(e = n ? e : e.prototype, a) && r(e, a, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    "use strict";
    var r = n(28)(!0);
    n(85)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    "use strict";

    function r() {
        try {
            if (window.crypto) {
                var e = new Int32Array(1);
                return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                    return e + t
                }))
            }
        } catch (t) {}
        return intval(rand(0, a).toFixed(0))
    }
    n.r(t), n.d(t, "MAX_SAFE_INTEGER", function() {
        return i
    }), n.d(t, "MAX_INTERGER", function() {
        return a
    }), n.d(t, "random", function() {
        return r
    });
    var i = 9007199254740991,
        a = 2147483647
}, function(e, t, n) {
    var r = n(129),
        i = n(202),
        a = function(e, t) {
            if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(112)(Function.call, n(90).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (i) {
                t = !0
            }
            return function(e, n) {
                return a(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: a
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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

    function o(e, t) {
        if (!e || !t) return "";
        var n = Object.keys(t).map(function(e) {
            return e + " {" + Object.keys(t[e]).map(function(n) {
                return n + ":" + t[e][n]
            }).join(";") + "}"
        }).join("");
        return "@-webkit-keyframes " + e + " {" + n + "} @keyframes " + e + " {" + n + "}"
    }
    n.r(t);
    var s = n(83),
        c = (n(9), function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.id = Math.round(1e6 * Math.random()).toString(16), a.setSpinnerParams(n), a
            }
            return a(t, e), t.prototype.componentWillReceiveProps = function(e) {
                this.setSpinnerParams(e)
            }, t.prototype.setSpinnerParams = function(e) {
                this.offset = Math.round(Math.PI * e.size), this.c = .5 * e.size, this.animation = o("dash" + this.id, {
                    "0%": {
                        "stroke-dashoffset": this.offset
                    },
                    "50%": {
                        "stroke-dashoffset": Math.round(.25 * this.offset),
                        transform: "rotate(135deg)"
                    },
                    "100%": {
                        "stroke-dashoffset": this.offset,
                        transform: "rotate(360deg)"
                    }
                })
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.style,
                    n = e.color,
                    r = e.size,
                    i = e.duration,
                    a = e.strokeWidth,
                    o = this.id,
                    c = this.offset,
                    u = this.animation;
                return s.createElement("div", {
                    className: "Spinner",
                    style: t
                }, s.createElement("svg", {
                    className: "Spinner__svg",
                    width: r,
                    height: r,
                    viewBox: "0 0 " + r + " " + r,
                    xmlns: "http://www.w3.org/2000/svg"
                }, s.createElement("g", {
                    style: {
                        width: r,
                        height: r,
                        transformOrigin: .5 * r + "px " + .5 * r + "px"
                    }
                }, s.createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: u
                    }
                }), s.createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: n,
                    strokeDasharray: c,
                    strokeDashoffset: c,
                    strokeWidth: a,
                    style: {
                        animationName: "dash" + o,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: i + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * r,
                    cy: .5 * r,
                    r: .5 * r - .5 * a
                }))))
            }, t
        }(s.Component));
    t["default"] = c, c.defaultProps = {
        color: "#5181b8",
        size: 19,
        strokeWidth: 2,
        duration: 1.4
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings";
        return getTemplate(e, {
            sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
            browser: a() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off")
        })
    }

    function i(e, t) {
        showTooltip(t.target, {
            content: r("im_settings_pop"),
            dir: "down",
            shift: [220, 9],
            hasover: !0,
            showdt: 300
        })
    }

    function a() {
        return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
    }

    function o(e, t, n, i, o) {
        var s = domData(o, "action"),
            c = gpeByClass("_im_settings_menu", o),
            u = hasClass(c, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
        switch (s) {
            case "spam":
                Object(f.showSpamLayer)(e, l.mount, i);
                break;
            case "sound":
                ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), c.outerHTML = r(u);
                break;
            case "browser":
                a() ? (ls.set("im_ui_notify_off", 1), c.outerHTML = r(u)) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                    c.parentNode && (c.outerHTML = r(u))
                }) : (ls.set("im_ui_notify_off", 0), c.outerHTML = r(u))
        }
    }

    function s(e, t) {
        return {
            updateFilter: function(t) {
                var n = void 0,
                    r = t.get().active_tab === p.FOLDER_UNREAD;
                n = t.get().unread_cnt > 0 ? getTemplate("im_filter", {
                    filter: r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread"),
                    cls: ""
                }) : getTemplate("im_filter", {
                    filter: getLang("mail_all_dialogs"),
                    cls: "im-page--dialogs-filter_disabled"
                }), val(geByClass1(h, e), n)
            },
            toggleLoader: function(t, n) {
                var r = geByClass1(m, e);
                toggleClass(r, "im-page--dialogs-settings_loading", n)
            },
            updateSettings: function(t) {
                var n = geByClass1("_im_settings_menu", e);
                n.outerHTML = r()
            },
            unmount: function() {
                Object(u.destroyModule)(t)
            }
        }
    }

    function c(e, t, n) {
        var r = i.bind(null, t),
            a = o.bind(null, t, n, e),
            c = function(e, r) {
                if (Object(f.showUnreadOnly)(t, n, d.changeDialogsTab)) {
                    var i = t.get().active_tab === p.FOLDER_UNREAD;
                    val(r, getTemplate("im_filter", {
                        filter: i ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                    }))
                }
            },
            l = Object(u.createModule)({
                handlers: function(t, n) {
                    n(e, "mouseover", m, r), n(e, "click", g, a), n(e, "click", h, c)
                }
            });
        return s(e, l)
    }
    n.r(t), n.d(t, "mount", function() {
        return c
    });
    var u = n(110),
        l = n(43),
        d = n(41),
        f = n(81),
        p = n(30),
        m = "_im_dialogs_cog_settings",
        g = "_im_settings_action",
        h = "_im_to_unread"
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        function n() {
            return r ? (i = arguments, void(a = this)) : (e.apply(this, arguments), r = !0, void setTimeout(function() {
                r = !1, i && (n.apply(a, i), i = a = null)
            }, t))
        }
        var r = !1,
            i = void 0,
            a = void 0;
        return n
    }
    n.r(t), n.d(t, "default", function() {
        return r
    })
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
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
    n.r(t);
    var s = n(83),
        c = n(204),
        u = (n(9), n(35)),
        l = n(138),
        d = function() {
            return "undefined" != typeof window
        },
        f = function(e) {
            function t(n) {
                i(this, t);
                var o = a(this, e.call(this, n));
                return o.onMouseEnter = function(e) {
                    if (o.el) {
                        var t = o.props,
                            n = t.text,
                            r = t.position,
                            i = t.align,
                            a = t.marginTop,
                            s = t.marginLeft,
                            c = Object(l["default"])(o.el);
                        o.update({
                            text: n,
                            position: r,
                            align: i,
                            rect: c,
                            marginTop: a,
                            marginLeft: s
                        })
                    }
                }, o.onMouseLeave = function(e) {
                    return o.update()
                }, o.onTransitionEnd = function(e) {
                    "visibility" === e.propertyName && o.state.tooltip && o.setState({
                        tooltip: void 0
                    })
                }, o.renderTooltip = function() {
                    if (!o.state.tooltip) return null;
                    var e = o.state.tooltip,
                        t = e.x,
                        n = e.y,
                        i = e.position,
                        a = e.align,
                        c = e.text,
                        l = e.removed,
                        d = Object(u.classNames)("Tooltip", "Tooltip--" + i, r({
                            "Tooltip--removed": !!l
                        }, "Tooltip--align-" + a, "t" === i || "b" === i));
                    return s.createElement("div", {
                        className: d,
                        style: {
                            top: n,
                            left: t
                        },
                        onTransitionEnd: o.onTransitionEnd
                    }, s.createElement("div", {
                        className: "Tooltip__in"
                    }, c))
                }, o.state = {}, o
            }
            return o(t, e), t.prototype.componentDidMount = function() {
                this.el = c.findDOMNode(this), this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave)
            }, t.prototype.componentWillUnmount = function() {
                this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)
            }, t.prototype.update = function(e) {
                if (!e) return this.setState({
                    tooltip: Object.assign({}, this.state.tooltip, {
                        removed: !0
                    })
                });
                var t = e.position,
                    n = e.align,
                    r = e.text,
                    i = e.rect,
                    a = e.marginTop,
                    o = e.marginLeft,
                    s = i.left,
                    c = i.top;
                switch (t) {
                    case "t":
                        s += .5 * i.width;
                        break;
                    case "r":
                        s += i.width, c += .5 * i.height;
                        break;
                    case "b":
                        s += .5 * i.width, c += i.height;
                        break;
                    case "l":
                        c += .5 * i.height
                }
                s = Math.round(s + o), c = Math.round(c + a), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: r,
                        x: s,
                        y: c
                    }
                })
            }, t.prototype.render = function() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && d() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), s.createElement(s.Fragment, null, this.props.children, c.createPortal(e, this.defaultNode))) : this.props.children
            }, t
        }(s.Component);
    t["default"] = f, f.defaultProps = {
        position: "b",
        align: "center",
        marginTop: 0,
        marginLeft: 0
    }
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (1, eval)("this")
    } catch (r) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n;
        if (window.vk.lpConfig.debug) {
            for (var r = "background: " + e + "; color: white", i = new Date, a = function(e) {
                    return 10 > e ? "0" + e : e
                }, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; o > c; c++) s[c - 2] = arguments[c];
            (n = console).log.apply(n, ["%c " + i.getHours() + ":" + a(i.getMinutes()) + ":" + a(i.getSeconds()) + ":" + i.getMilliseconds() + " " + t + " ", r].concat(s))
        }
    }

    function i() {
        return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
    }

    function a() {
        return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
    }

    function o(e, t) {
        window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
            msg: e,
            ev: t,
            is_master: window.curNotifier.is_server
        }), setTimeout(s, 1e4)
    }

    function s() {
        window.lpWeird.length && (Object(p.imWeirdLog)("fc_im_differ", {
            diff: window.lpWeird
        }, !1), window.lpWeird = [])
    }

    function c() {
        var e = Date.now() - 3e4;
        window.lpBufferFc = i().filter(function(t) {
            return t.time > e
        }), window.lpBufferIm = a().filter(function(t) {
            return t.time > e
        })
    }

    function u() {
        return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
    }

    function l() {
        u() && (a().forEach(function(e) {
            var t = i().find(function(t) {
                return e.ev === t.ev
            });
            !t && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, r("red", "im not fc", e.ev), Object(p.isWeirdLogging)() && o("im not fc", e.ev))
        }), i().forEach(function(e) {
            var t = a().find(function(t) {
                return t.ev === e.ev
            });
            t && t.warned && !e.warned && (e.warned = !0, r("red", "now fc like im", e.ev), Object(p.isWeirdLogging)() && o("now fc like im", e.ev))
        })), c()
    }

    function d(e) {
        if (u()) {
            var t;
            (t = i()).push.apply(t, e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            })), setTimeout(l, 0)
        }
        r.apply(void 0, ["green", "fc"].concat(e))
    }

    function f(e) {
        if (u()) {
            var t;
            (t = a()).push.apply(t, e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            })), setTimeout(l, 1100)
        }
        r.apply(void 0, ["blue", "im"].concat(e))
    }
    n.r(t), n.d(t, "lpLogFc", function() {
        return r
    }), n.d(t, "longpollTesting_onFcEvents", function() {
        return d
    }), n.d(t, "longpollTesting_onImEvents", function() {
        return f
    });
    var p = n(56);
    window.longpollTesting_onImEvents = f
}, function(e, t, n) {
    "use strict";
    var r = n(105),
        i = n(51),
        a = n(53);
    e.exports = function() {
        function e(e, t, n, r, o, s) {
            s !== a && i(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
        }

        function t() {
            return e
        }
        e.isRequired = e;
        var n = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t
        };
        return n.checkPropTypes = r, n.PropTypes = n, n
    }
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(133)),
        c = n(35),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.getRef = function(e) {
                    a.element = e
                }, a.resize = function() {
                    var e = a.element;
                    if (e) {
                        var t = e.offsetHeight,
                            n = e.scrollHeight,
                            r = 0,
                            i = 0,
                            o = r + i;
                        t >= n + o && (o = 0), e.value && a.setState({
                            height: n - o
                        }), a.setState({
                            height: 0
                        }, function() {
                            var t = e.scrollHeight - o;
                            a.setState({
                                height: t
                            }), a.props.onResize(e)
                        })
                    }
                }, a.onChange = function(e) {
                    a.props.grow && a.resize(), a.isControlledOutside || a.setState({
                        value: e.target.value
                    }), a.props.onChange && a.props.onChange(e)
                }, a.state = {
                    value: "undefined" == typeof n.value ? n.initialValue || "" : void 0
                }, "undefined" != typeof n.value && (a.isControlledOutside = !0), a
            }
            return a(t, e), t.prototype.componentDidMount = function() {
                this.props.grow && this.resize()
            }, t.prototype.render = function() {
                var e = this.props,
                    t = this.isControlledOutside ? e.value : this.state.value,
                    n = this.state.height || this.props.style.height || 66;
                return o.createElement("textarea", u({}, Object(s["default"])(e, ["initialValue", "grow", "style", "onResize"]), {
                    value: t,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({}, e.style, {
                        height: n
                    }),
                    className: Object(c.classNames)("Textarea", e.className)
                }))
            }, t
        }(o.Component);
    t["default"] = l, l.defaultProps = {
        initialValue: "",
        grow: !0,
        onResize: function() {},
        style: {}
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        var i = '<td class="im_cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
        return new Promise(function(e) {
            stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                var t = new Datepicker(n, {
                    width: 140,
                    resfmt: "plain",
                    addRows: '<tr id="im_day_clear">' + i + "</tr>",
                    addRowsM: '<tr id="im_month_clear">' + i + "</tr>",
                    onUpdate: r
                });
                e(t)
            })
        })
    }

    function i(e, t, n, r, i, a) {
        return {
            focus: function(e) {
                uiSearch.focus(t), c(e, t, n, r)
            },
            changePeer: function(e, n) {
                uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
            },
            search: function() {
                a({})
            },
            unmount: function() {
                Object(m.destroyModule)(i), cancelStackFilter(g), r.then(function(e) {
                    return e.destroy()
                })
            }
        }
    }

    function a(e, t, n, r) {
        e.set(p.setCurrentSearchDate.bind(null, e.get().peer, r.d + "." + r.m + "." + r.y)).then(s.bind(null, e, t, n))
    }

    function o(e, t) {
        e.then(function(e) {
            triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
        })
    }

    function s(e, t, n) {
        var r = e.get().peer;
        uiSearch.showProgress(n), Object(p.searchMessagesInplace)(r, e.get()).then(function(r) {
            uiSearch.hideProgress(n), t().insertSearch(r, e)
        })["catch"](function() {
            uiSearch.focus(n), uiSearch.hideProgress(n)
        })
    }

    function c(e, t, n, r) {
        cancelStackPush(g, l.bind(null, e, t, n, r))
    }

    function u(e, t, n, r, i, a) {
        if ("keyup" !== a.type || 13 == a.which) {
            var o = clean(uiSearch.getFieldEl(t).value);
            e.set(p.setCurrentSearch.bind(null, o, e.get().peer)).then(i.bind(null, e, r, t))
        }
    }

    function l(e, t, n, r) {
        cancelStackFilter(g), r.then(function(e) {
            e.hide()
        }), e.set(p.cancelSearch.bind(null, e.get().peer)).then(function() {
            uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
        })
    }

    function d(e, t, n, r) {
        n.then(function(e) {
            e.hide()
        }), e.set(p.clearDate.bind(null, e.get().peer)).then(s.bind(null, e, t, r))
    }

    function f(e, t, n) {
        var c = geByClass1(_, e),
            f = geByClass1(v, e),
            p = a.bind(null, t, n, f),
            g = r(t, e, c, p),
            O = o.bind(null, g, e),
            C = u.bind(null, t, f, c, n, debounce(s, 300)),
            k = l.bind(null, t, f, n, g),
            E = d.bind(null, t, n, g, f),
            j = Object(m.createModule)({
                handlers: function(t, n) {
                    t(geByClass1(h, e), "click", O), t(uiSearch.getFieldEl(f), "keyup", C), t(geByClass1(b, e), "click", C), t(geByClass1(y, e), "click", k), n(e, "click", w, E)
                }
            });
        return i(e, f, n, g, j, C)
    }
    n.r(t), n.d(t, "mount", function() {
        return f
    });
    var p = n(41),
        m = n(110),
        g = "im_hist_search",
        h = "_im_search_date",
        _ = "_im_search_date_input",
        v = "_im_search_history_input",
        b = "_im_start_inplace_search",
        y = "_im_cancel_inplace_search",
        w = "_im_clear_date"
}, function(e, t, n) {
    e.exports = !n(182) && !n(87)(function() {
        return 7 != Object.defineProperty(n(25)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, n) {
    (function(r, i) {
        var a;
        (function() {
            "use strict";

            function o(e) {
                return "function" == typeof e || "object" == typeof e && null !== e
            }

            function s(e) {
                return "function" == typeof e
            }

            function c(e) {
                K = e
            }

            function u(e) {
                X = e
            }

            function l() {
                return function() {
                    r.nextTick(g)
                }
            }

            function d() {
                return function() {
                    q(g)
                }
            }

            function f() {
                var e = 0,
                    t = new ee(g),
                    n = document.createTextNode("");
                return t.observe(n, {
                        characterData: !0
                    }),
                    function() {
                        n.data = e = ++e % 2
                    }
            }

            function p() {
                var e = new MessageChannel;
                return e.port1.onmessage = g,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function m() {
                return function() {
                    setTimeout(g, 1)
                }
            }

            function g() {
                for (var e = 0; $ > e; e += 2) {
                    var t = re[e],
                        n = re[e + 1];
                    t(n), re[e] = void 0, re[e + 1] = void 0
                }
                $ = 0
            }

            function h() {
                try {
                    var e = n(18);
                    return q = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return m()
                }
            }

            function _(e, t) {
                var n = this,
                    r = n._state;
                if (r === se && !e || r === ce && !t) return this;
                var i = new this.constructor(b),
                    a = n._result;
                if (r) {
                    var o = arguments[r - 1];
                    X(function() {
                        N(r, i, o, a)
                    })
                } else x(n, i, e, t);
                return i
            }

            function v(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(b);
                return S(n, e), n
            }

            function b() {}

            function y() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function w() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function O(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function C(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (i) {
                    return i
                }
            }

            function k(e, t, n) {
                X(function(e) {
                    var r = !1,
                        i = C(n, t, function(n) {
                            r || (r = !0, t !== n ? S(e, n) : I(e, n))
                        }, function(t) {
                            r || (r = !0, L(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && i && (r = !0, L(e, i))
                }, e)
            }

            function E(e, t) {
                t._state === se ? I(e, t._result) : t._state === ce ? L(e, t._result) : x(t, void 0, function(t) {
                    S(e, t)
                }, function(t) {
                    L(e, t)
                })
            }

            function j(e, t, n) {
                t.constructor === e.constructor && n === ie && constructor.resolve === ae ? E(e, t) : n === ue ? L(e, ue.error) : void 0 === n ? I(e, t) : s(n) ? k(e, t, n) : I(e, t)
            }

            function S(e, t) {
                e === t ? L(e, y()) : o(t) ? j(e, t, O(t)) : I(e, t)
            }

            function T(e) {
                e._onerror && e._onerror(e._result), P(e)
            }

            function I(e, t) {
                e._state === oe && (e._result = t, e._state = se, 0 !== e._subscribers.length && X(P, e))
            }

            function L(e, t) {
                e._state === oe && (e._state = ce, e._result = t, X(T, e))
            }

            function x(e, t, n, r) {
                var i = e._subscribers,
                    a = i.length;
                e._onerror = null, i[a] = t, i[a + se] = n, i[a + ce] = r, 0 === a && e._state && X(P, e)
            }

            function P(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, i, a = e._result, o = 0; o < t.length; o += 3) r = t[o], i = t[o + n], r ? N(n, r, i, a) : i(a);
                    e._subscribers.length = 0
                }
            }

            function M() {
                this.error = null
            }

            function A(e, t) {
                try {
                    return e(t)
                } catch (n) {
                    return le.error = n, le
                }
            }

            function N(e, t, n, r) {
                var i, a, o, c, u = s(n);
                if (u) {
                    if (i = A(n, r), i === le ? (c = !0, a = i.error, i = null) : o = !0, t === i) return void L(t, w())
                } else i = r, o = !0;
                t._state !== oe || (u && o ? S(t, i) : c ? L(t, a) : e === se ? I(t, i) : e === ce && L(t, i))
            }

            function D(e, t) {
                try {
                    t(function(t) {
                        S(e, t)
                    }, function(t) {
                        L(e, t)
                    })
                } catch (n) {
                    L(e, n)
                }
            }

            function R(e) {
                return new he(this, e).promise
            }

            function F(e) {
                function t(e) {
                    S(i, e)
                }

                function n(e) {
                    L(i, e)
                }
                var r = this,
                    i = new r(b);
                if (!Y(e)) return L(i, new TypeError("You must pass an array to race.")), i;
                for (var a = e.length, o = 0; i._state === oe && a > o; o++) x(r.resolve(e[o]), void 0, t, n);
                return i
            }

            function B(e) {
                var t = this,
                    n = new t(b);
                return L(n, e), n
            }

            function H() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function U() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function z(e) {
                this._id = me++, this._state = void 0, this._result = void 0, this._subscribers = [], b !== e && ("function" != typeof e && H(), this instanceof z ? D(this, e) : U())
            }

            function G(e, t) {
                this._instanceConstructor = e, this.promise = new e(b), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? I(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && I(this.promise, this._result))) : L(this.promise, this._validationError())
            }

            function V() {
                var e;
                if ("undefined" != typeof i) e = i;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var n = e.Promise;
                (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = ge)
            }
            var W;
            W = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var q, K, Q, Y = W,
                $ = 0,
                X = function(e, t) {
                    re[$] = e, re[$ + 1] = t, $ += 2, 2 === $ && (K ? K(g) : Q())
                },
                Z = "undefined" != typeof window ? window : void 0,
                J = Z || {},
                ee = J.MutationObserver || J.WebKitMutationObserver,
                te = "undefined" != typeof r && "[object process]" === {}.toString.call(r),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            Q = te ? l() : ee ? f() : ne ? p() : void 0 === Z ? h() : m();
            var ie = _,
                ae = v,
                oe = void 0,
                se = 1,
                ce = 2,
                ue = new M,
                le = new M,
                de = R,
                fe = F,
                pe = B,
                me = 0,
                ge = z;
            z.all = de, z.race = fe, z.resolve = ae, z.reject = pe, z._setScheduler = c, z._setAsap = u, z._asap = X, z.prototype = {
                constructor: z,
                then: ie,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var he = G;
            G.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, G.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === oe && e > n; n++) this._eachEntry(t[n], n)
            }, G.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ae) {
                    var i = O(e);
                    if (i === ie && e._state !== oe) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                    else if (n === ge) {
                        var a = new n(b);
                        j(a, e, i), this._willSettleAt(a, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, G.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === oe && (this._remaining--, e === ce ? L(r, n) : this._result[t] = n), 0 === this._remaining && I(r, this._result)
            }, G.prototype._willSettleAt = function(e, t) {
                var n = this;
                x(e, void 0, function(e) {
                    n._settledAt(se, t, e)
                }, function(e) {
                    n._settledAt(ce, t, e)
                })
            };
            var _e = V,
                ve = {
                    Promise: ge,
                    polyfill: _e
                };
            a = function() {
                return ve
            }.call(t, n, t, e), !(void 0 !== a && (e.exports = a)), _e()
        }).call(this)
    }).call(this, n(48), n(122))
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(35)),
        c = n(10),
        u = n(148),
        l = n(121),
        d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        f = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onRemoveToken = function(e) {
                    var t = a.searchContainer.offsetHeight;
                    a.props.onRemoveToken(e.target.getAttribute("data-id")).then(function() {
                        a.updateScroll(t)
                    })
                }, a.onChange = function(e) {
                    var t = e.target.value;
                    t !== a.value && (a.value = t, a.props.onChange(e))
                }, a.onSelect = function(e) {
                    var t = a.searchContainer.offsetHeight;
                    a.props.onSelect(e.currentTarget.getAttribute("data-id")).then(function() {
                        a.updateScroll(t)
                    })
                }, a.updateScroll = function(e) {
                    var t = a.searchContainer.offsetHeight;
                    a.input.focus(), a.searchContainer.scrollTop = a.searchContainer.scrollHeight, e !== t && (a.scrollContainer.scrollTop = a.scrollContainer.scrollTop + t - e)
                }, a.inputRef = function(e) {
                    a.input = e
                }, a.searchContainerRef = function(e) {
                    a.searchContainer = e
                }, a.scrollContainerRef = function(e) {
                    var t = e;
                    if (e && e.container)
                        for (t = e; t.container;) t = t.container;
                    a.scrollContainer = t
                }, a.value = n.value, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.className,
                    r = t.tokens,
                    i = t.removeTokenPlaceholder,
                    a = t.value,
                    f = t.placeholder,
                    p = t.useInfiniteScroll,
                    m = t.loadMore,
                    g = t.hasMore,
                    h = t.virtualized,
                    _ = t.notFoundText,
                    v = p ? c["default"] : "div",
                    b = p ? {
                        loadMore: m,
                        hasMore: g,
                        virtualized: h,
                        useCapture: !1
                    } : {},
                    y = [].concat(this.props.children);
                return o.createElement("div", {
                    className: Object(s.classNames)("MultiSelect", n)
                }, o.createElement("div", {
                    className: "MultiSelect__search",
                    ref: this.searchContainerRef
                }, r.map(function(t, n) {
                    return o.createElement("span", {
                        className: "MultiSelect__token",
                        key: t.id
                    }, o.createElement("span", {
                        className: "MultiSelect__tokenTitle"
                    }, t.text), i ? o.createElement(l["default"], {
                        text: i
                    }, o.createElement("span", {
                        className: "MultiSelect__tokenRemove",
                        "data-id": t.id,
                        onClick: e.onRemoveToken
                    })) : o.createElement("span", {
                        className: "MultiSelect__tokenRemove",
                        "data-id": t.id,
                        onClick: e.onRemoveToken
                    }))
                }), o.createElement("div", {
                    className: "MultiSelect__caret"
                }, o.createElement("div", {
                    className: "MultiSelect__caretIn"
                }, o.createElement("input", {
                    type: "text",
                    className: "MultiSelect__input",
                    placeholder: 0 === r.length ? f : "",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: a,
                    ref: this.inputRef
                })))), 0 === y.length && this.props.value && o.createElement("div", {
                    className: "MultiSelect__empty"
                }, o.createElement("div", {
                    className: "MultiSelect__emptyIn"
                }, _)), o.createElement(v, d({
                    className: "MultiSelect__scroll",
                    ref: this.scrollContainerRef
                }, b), y.map(function(t) {
                    return o.createElement(u["default"], {
                        className: "MultiSelect__suggestsItem",
                        "data-id": t.props["data-id"],
                        onClick: e.onSelect,
                        key: t.key
                    }, t)
                })))
            }, t
        }(o.PureComponent);
    t["default"] = f, f.defaultProps = {
        removeTokenPlaceholder: "",
        placeholder: "",
        value: "",
        useInfiniteScroll: !1,
        notFoundText: "Not found"
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = F(e, 2),
            n = t[1];
        return {
            type: B,
            localId: n
        }
    }

    function i(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: U,
            messageId: n,
            mask: r,
            peerId: i
        }
    }

    function a(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: H,
            messageId: n,
            flags: r,
            peerId: i
        }
    }

    function o(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: z,
            messageId: n,
            flags: r,
            peerId: i
        }
    }

    function s(e) {
        var t = F(e, 11),
            n = t[1],
            r = t[2],
            i = t[3],
            a = t[4],
            o = t[5],
            s = t[6],
            c = t[7],
            u = t[8],
            l = t[9],
            d = t[10],
            f = extend(s, c || void 0);
        return s || (Object(R.imWeirdLog)("empty_other_kludges", [n, r, i, a, o, s, c, u, l, d]), s = {}), {
            type: G,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(i),
            date: intval(a),
            attaches: Object(D.convertKludgesToAttaches)(f, n),
            subject: s.title || "",
            text: o,
            kludges: f,
            randomId: intval(u),
            userId: Object(N.isChatPeer)(i) ? intval(f.from) : intval(i),
            update_time: d,
            chat_local_id: l
        }
    }

    function c(e) {
        var t = s(e);
        return t.type = me, t
    }

    function u(e) {
        return extend({}, e, {
            type: me
        })
    }

    function l(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: V,
            peerId: n,
            upToId: r,
            unread: i
        }
    }

    function d(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: W,
            peerId: n,
            upToId: r,
            unread: i
        }
    }

    function f(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: q,
            userId: -n,
            platform: r,
            lastSeenTs: i
        }
    }

    function p(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: K,
            userId: -n,
            reason: r,
            lastSeenTs: i
        }
    }

    function m(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3],
            a = void 0 === i ? !1 : i;
        return {
            type: te,
            peerId: n,
            mask: r,
            local: a
        }
    }

    function g(e) {
        var t = F(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: ne,
            peerId: n,
            mask: r
        }
    }

    function h(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3],
            a = void 0 === i ? !1 : i;
        return {
            type: re,
            peerId: n,
            mask: r,
            local: a
        }
    }

    function _(e) {
        var t = F(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: pe,
            peerId: n,
            localId: r
        }
    }

    function v(e) {
        var t = F(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: Q,
            chatId: n,
            self: r
        }
    }

    function b(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: Y,
            peerId: r,
            updateType: n,
            updateArg: i
        }
    }

    function y(e) {
        var t = F(e, 5),
            n = t[1],
            r = t[2],
            i = t[3],
            a = t[4];
        return {
            type: $,
            peerId: n,
            userIds: r,
            totalCount: i,
            ts: a
        }
    }

    function w(e) {
        var t = F(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: X,
            userId: n,
            callId: r
        }
    }

    function O(e) {
        var t = F(e, 4),
            n = t[1],
            r = t[2],
            i = t[3];
        return {
            type: Z,
            count: n,
            countNotMuted: r,
            showOnlyNotMuted: i
        }
    }

    function C(e) {
        var t = F(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: J,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function k(e) {
        var t = F(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n,
            i = s([!1, r.id, r.flags, r.peer_id, r.date, r.message, extend(r.kludges, {
                title: r.title || ""
            }), {}, r.random_id, r.chat_local_id, r.update_time]);
        return i.type = me, i
    }

    function E(e) {
        return {
            type: ee,
            params: e
        }
    }

    function j(e) {
        return {
            type: oe,
            state: e
        }
    }

    function S() {
        return {
            type: ie
        }
    }

    function T(e) {
        var t = F(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: ae,
            key: n,
            url: r
        }
    }

    function I() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: se,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function L(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
        return {
            type: ue,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r,
            entryPoint: i
        }
    }

    function x(e) {
        return {
            type: le,
            tab: e
        }
    }

    function P(e, t, n) {
        return {
            type: de,
            message: t,
            peer: e,
            error: n
        }
    }

    function M(e) {
        var t = F(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            i = t[3],
            a = t[4],
            o = t[5];
        return {
            type: ce,
            free: !!intval(n) || intval(a) === vk.id,
            resource: r,
            peerId: intval(i),
            who: intval(a),
            name: o
        }
    }

    function A(e, t) {
        return {
            type: fe,
            message: t,
            peerId: e
        }
    }
    n.r(t), n.d(t, "DELETE", function() {
        return B
    }), n.d(t, "SET_FLAGS", function() {
        return H
    }), n.d(t, "REPLACE_FLAGS", function() {
        return U
    }), n.d(t, "RESET_FLAGS", function() {
        return z
    }), n.d(t, "ADD_MESSAGE", function() {
        return G
    }), n.d(t, "READ_INBOUND", function() {
        return V
    }), n.d(t, "READ_OUTBOUND", function() {
        return W
    }), n.d(t, "GOT_ONLINE", function() {
        return q
    }), n.d(t, "GOT_OFFLINE", function() {
        return K
    }), n.d(t, "CHAT_CHANGED", function() {
        return Q
    }), n.d(t, "CONVERSATION_UPDATED", function() {
        return Y
    }), n.d(t, "TYPING", function() {
        return $
    }), n.d(t, "VIDEO_CALL", function() {
        return X
    }), n.d(t, "UNREAD_COUNT", function() {
        return Z
    }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
        return J
    }), n.d(t, "EMPTY", function() {
        return ee
    }), n.d(t, "RESET_DIRECTORIES", function() {
        return te
    }), n.d(t, "REPLACE_DIRECTORIES", function() {
        return ne
    }), n.d(t, "SET_DIRECTORIES", function() {
        return re
    }), n.d(t, "RESYNC", function() {
        return ie
    }), n.d(t, "REFRESH_LP_KEY", function() {
        return ae
    }), n.d(t, "TRANSITION", function() {
        return oe
    }), n.d(t, "RESET_PEER", function() {
        return se
    }), n.d(t, "MUTEX", function() {
        return ce
    }), n.d(t, "CHANGE_PEER", function() {
        return ue
    }), n.d(t, "CHANGE_TAB", function() {
        return le
    }), n.d(t, "FAILED_MESSAGE", function() {
        return de
    }), n.d(t, "RESEND", function() {
        return fe
    }), n.d(t, "DELETE_DIALOG", function() {
        return pe
    }), n.d(t, "EDIT_MESSAGE", function() {
        return me
    }), n.d(t, "FLAG_UNREAD", function() {
        return ge
    }), n.d(t, "FLAG_OUTBOUND", function() {
        return he
    }), n.d(t, "FLAG_IMPORTANT", function() {
        return _e
    }), n.d(t, "FLAG_CHAT", function() {
        return ve
    }), n.d(t, "FLAG_FRIENDS", function() {
        return be
    }), n.d(t, "FLAG_SPAM", function() {
        return ye
    }), n.d(t, "FLAG_DELETED", function() {
        return we
    }), n.d(t, "FLAG_MEDIA", function() {
        return Oe
    }), n.d(t, "FLAG_STEALTH", function() {
        return Ce
    }), n.d(t, "FOLDER_IMPORTANT", function() {
        return ke
    }), n.d(t, "FOLDER_UNRESPOND", function() {
        return Ee
    }), n.d(t, "FOLDER_HAS_BANNER", function() {
        return je
    }), n.d(t, "deleteEvent", function() {
        return r
    }), n.d(t, "replaceFlagsEvent", function() {
        return i
    }), n.d(t, "setFlagsEvent", function() {
        return a
    }), n.d(t, "resetFlagsEvent", function() {
        return o
    }), n.d(t, "addMessageEvent", function() {
        return s
    }), n.d(t, "editMessageEvent", function() {
        return c
    }), n.d(t, "editMessageLocallyEvent", function() {
        return u
    }), n.d(t, "readInboundEvent", function() {
        return l
    }), n.d(t, "readOutboundEvent", function() {
        return d
    }), n.d(t, "gotOnlineEvent", function() {
        return f
    }), n.d(t, "gotOfflineEvent", function() {
        return p
    }), n.d(t, "resetDirectoriesEvent", function() {
        return m
    }), n.d(t, "replaceDirectoriesEvent", function() {
        return g
    }), n.d(t, "setDirectoriesEvent", function() {
        return h
    }), n.d(t, "deleteDialogEvent", function() {
        return _
    }), n.d(t, "chatChangedEvent", function() {
        return v
    }), n.d(t, "chatUpdatedEvent", function() {
        return b
    }), n.d(t, "typingEvent", function() {
        return y
    }), n.d(t, "videoCallEvent", function() {
        return w
    }), n.d(t, "unreadCountEvent", function() {
        return O
    }), n.d(t, "notifySettingsChangedEvent", function() {
        return C
    }), n.d(t, "refreshMessageEvent", function() {
        return k
    }), n.d(t, "emptyEvent", function() {
        return E
    }), n.d(t, "transitionEvent", function() {
        return j
    }), n.d(t, "resyncEvent", function() {
        return S
    }), n.d(t, "refreshLpKeyEvent", function() {
        return T
    }), n.d(t, "resetPeer", function() {
        return I
    }), n.d(t, "changePeer", function() {
        return L
    }), n.d(t, "changeTab", function() {
        return x
    }), n.d(t, "failedMessage", function() {
        return P
    }), n.d(t, "mutexEvent", function() {
        return M
    }), n.d(t, "resendEvent", function() {
        return A
    });
    var N = n(81),
        D = n(0),
        R = n(56),
        F = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        B = "event_delete",
        H = "event_set_flags",
        U = "event_replace_flags",
        z = "event_reset_flags",
        G = "event_add_message",
        V = "event_read_inbound",
        W = "event_read_outbound",
        q = "event_got_online",
        K = "event_got_offline",
        Q = "event_chat_changed",
        Y = "event_chat_updated",
        $ = "event_typing",
        X = "event_video_call",
        Z = "event_unread_count",
        J = "event_notify_settings_changed",
        ee = "event_empty",
        te = "event_reset_directories",
        ne = "event_replace_directories",
        re = "event_set_directories",
        ie = "event_resync",
        ae = "event_refresh_lp_key",
        oe = "transition_event",
        se = "reset_peer",
        ce = "mutex",
        ue = "change_peer",
        le = "event_change_tab",
        de = "event_failed_message",
        fe = "event_resend",
        pe = "event_delete_dialog",
        me = "event_edit_message",
        ge = 1,
        he = 2,
        _e = 8,
        ve = 16,
        be = 32,
        ye = 64,
        we = 128,
        Oe = 512,
        Ce = 65536,
        ke = 1,
        Ee = 2,
        je = 8
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = Object.assign({}, e);
        return t.forEach(function(e) {
            return delete n[e]
        }), n
    }
    n.r(t), n.d(t, "default", function() {
        return r
    })
}, function(e, t, n) {
    var r = n(157),
        i = n(104),
        a = n(12),
        o = n(29),
        s = n(112),
        c = "prototype",
        u = function(e, t, n) {
            var l, d, f, p, m = e & u.F,
                g = e & u.G,
                h = e & u.S,
                _ = e & u.P,
                v = e & u.B,
                b = g ? r : h ? r[t] || (r[t] = {}) : (r[t] || {})[c],
                y = g ? i : i[t] || (i[t] = {}),
                w = y[c] || (y[c] = {});
            g && (n = t);
            for (l in n) d = !m && b && void 0 !== b[l], f = (d ? b : n)[l], p = v && d ? s(f, r) : _ && "function" == typeof f ? s(Function.call, f) : f, b && o(b, l, f, e & u.U), y[l] != f && a(y, l, p), _ && w[l] != f && (w[l] = f)
        };
    r.core = i, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "screenfull", function() {
        return r
    });
    var r = function() {
        var e = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            t = function() {
                for (var e = void 0, t = void 0, n = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], r = 0, i = n.length, a = {}; i > r; r++)
                    if (e = n[r], e && e[1] in document) {
                        for (r = 0, t = e.length; t > r; r++) a[n[0][r]] = e[r];
                        return a
                    }
                return !1
            }(),
            n = {
                request: function r(n) {
                    var r = t.requestFullscreen;
                    n = n || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? n[r]() : n[r](e && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[t.exitFullscreen]()
                },
                toggle: function(e) {
                    this.isFullscreen ? this.exit() : this.request(e)
                },
                raw: t
            };
        return t ? (Object.defineProperties(n, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[t.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[t.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[t.fullscreenEnabled])
                }
            }
        }), n) : !1
    }()
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (!e.first_name) {
            var t = e.name.split(" ", 2);
            e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
        }
        e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
    }

    function i(e, t) {
        var n = Object(s.unpackStore)(e);
        return t in n.oCache
    }

    function a(e, t) {
        var n = Object(s.unpackStore)(e).oCache[t];
        return n && !n._n && (r(n), n._n = 1), n
    }

    function o(e, t) {
        var n = Object(s.unpackStore)(e);
        n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
    }
    n.r(t), n.d(t, "oCacheExists", function() {
        return i
    }), n.d(t, "oCacheGet", function() {
        return a
    }), n.d(t, "oCacheAdd", function() {
        return o
    });
    var s = n(199)
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.getBoundingClientRect(),
            n = document.body,
            r = document.documentElement,
            i = window.pageYOffset || r.scrollTop || n.scrollTop,
            a = window.pageXOffset || r.scrollLeft || n.scrollLeft,
            o = r.clientTop || n.clientTop || 0,
            s = r.clientLeft || n.clientLeft || 0;
        return {
            top: Math.round(t.top + i - o),
            left: Math.round(t.left + a - s),
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }
    n.r(t), n.d(t, "default", function() {
        return r
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function i() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                i[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, i)).join("") ? !1 : !0
        } catch (a) {
            return !1
        }
    }
    var a = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = i() ? Object.assign : function(e, t) {
        for (var n, i, c = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var l in n) o.call(n, l) && (c[l] = n[l]);
            if (a) {
                i = a(n);
                for (var d = 0; d < i.length; d++) s.call(n, i[d]) && (c[i[d]] = n[i[d]])
            }
        }
        return c
    }
}, function(e, t, n) {
    var r = n(129);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, i;
        if (t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
        if ("function" == typeof(n = e.valueOf) && !r(i = n.call(e))) return i;
        if (!t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i) {
        return window.statlogsValueEvent(e, t, n, r, i)
    }

    function i(e) {
        return Math.random() < e
    }

    function a(e, t, n, a, o, s) {
        i(e) && r(n, a, o, s)
    }
    n.r(t), n.d(t, "statlogsValueEvent", function() {
        return r
    }), n.d(t, "randEnabled", function() {
        return i
    }), n.d(t, "statlogsProbValueEvent", function() {
        return a
    })
}, function(e, t, n) {
    var r = n(129),
        i = n(116).set;
    e.exports = function(e, t, n) {
        var a, o = t.constructor;
        return o !== n && "function" == typeof o && (a = o.prototype) !== n.prototype && r(a) && i && i(e, a), e
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, n) {
    var r = n(20),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(r(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = [],
            r = 0;
        return function(i) {
            n.push(i), r || (r = setTimeout(function() {
                r = !1, e(n), n = []
            }, t))
        }
    }

    function i(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function a(e, t) {
        var n = void 0,
            r = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    n = "color: red", r = "background: red; color: white";
                    break;
                case "success":
                    n = "color: green", r = "background: green; color: white";
                    break;
                default:
                    n = "color: blue;", r = "background: #000; color: #fff;"
            }
            try {
                var i = new Date;
                console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, r, n)
            } catch (a) {}
        }
    }

    function o(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function s(e) {
        for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
        return n
    }

    function c(e) {
        for (var t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), i = new Uint8Array(r.length), a = 0; a < r.length; ++a) i[a] = r.charCodeAt(a);
        return i
    }
    n.r(t), n.d(t, "throttleAccumulate", function() {
        return r
    }), n.d(t, "executionStackPop", function() {
        return i
    }), n.d(t, "lplog", function() {
        return a
    }), n.d(t, "toArray", function() {
        return o
    }), n.d(t, "arrayUnique", function() {
        return s
    }), n.d(t, "urlBase64ToUint8Array", function() {
        return c
    })
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        function n() {
            return s > 0
        }

        function r() {
            !u.length || n() || l || (t(u), u = [])
        }

        function o() {
            var e = window.extend({}, window.lpConnect.options, {
                ts: c
            });
            Object(a.lpLogFc)("orange", "createLongPoll to load from", c), l = !0;
            var t = Object(i.createLongPoll)(e, function(e, n, i) {
                var o;
                Object(a.lpLogFc)("orange", "Loaded [" + e + "," + n + ")"), t.stopConnection(), c = n, l = !1, (o = u).push.apply(o, i), r()
            })
        }
        var s = 0,
            c = e,
            u = [],
            l = !1;
        return {
            pause: function() {
                s++
            },
            resume: function() {
                s > 0 && (s--, r())
            },
            onLp: function(e, t, n) {
                if (!l)
                    if (c >= e) {
                        var i;
                        c = t, (i = u).push.apply(i, n), r()
                    } else o()
            }
        }
    }
    n.r(t), n.d(t, "createLongpollEventsQueue", function() {
        return r
    });
    var i = n(168),
        a = n(123)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = geByClass1("_im_dialog_actions", e);
        toggleClass(n, "im-page--chat-header_top-banner", t)
    }

    function i(e, t) {
        var n = geByClass1(p, e);
        n && window.tooltips && tooltips.hide(n), r(e, !1), t.innerHTML = ""
    }

    function a(e, t, n, r) {
        var a = domData(e, "payload");
        return a ? (t.set(u.callbackTopBannerAction.bind(null, t.get().peer, a)), i(n, r), !0) : !1
    }

    function o(e) {
        var t = e.icon ? getTemplate("im_top_banner_icon", {
                icon: e.icon
            }) : "",
            n = (e.buttons || []).map(function(e) {
                var t = "";
                switch (e.layout) {
                    case "secondary":
                        t = "secondary";
                        break;
                    default:
                        t = "blue_button"
                }
                return "link" === e.type ? getTemplate("im_top_banner_button_link", {
                    link: e.link,
                    text: e.text,
                    css_class: t
                }) : getTemplate("im_top_banner_button", {
                    callback_data: e.callback_data,
                    text: e.text,
                    css_class: t
                })
            });
        return n = n.concat([getTemplate("im_top_banner_hide_btn", {})]), getTemplate("im_top_banner", {
            text: e.text,
            icon: t,
            buttons: n.join("")
        })
    }

    function s(e, t, n) {
        var s = geByClass1("_im_top_banner", e),
            m = Object(c.createModule)({
                handlers: function(r, o) {
                    var c = geByClass1("_im_dialog_actions", e);
                    o(e, "click", p, function(r) {
                        t.set(u.hideTopBannerAction.bind(null, t.get().peer)), i(e, s);
                        var a = !!Object(d.renderPinnedMessage)(t);
                        Object(d.compensateHistoryHeightChange)(t, a, !0, n)
                    }), o(e, "click", f, function(r) {
                        var i = a(r.target, t, e, s),
                            o = !!Object(d.renderPinnedMessage)(t);
                        Object(d.compensateHistoryHeightChange)(t, o, !i, n)
                    }), o(c, "mouseover", p, function(e, t) {
                        showTooltip(t, {
                            text: getLang("mail_top_banner_hide"),
                            black: 1,
                            shift: [8, 4],
                            appendEl: bodyNode
                        })
                    })
                }
            });
        return {
            renderPeer: function(t) {
                var a = Object(l.getTab)(t, t.get().peer),
                    c = a.top_banner,
                    u = s.children.length;
                c && !Object(l.isSearchShown)(t) ? (r(e, !0), s.innerHTML = o(c)) : s.children.length && i(e, s);
                var f = s.children.length;
                Object(d.compensateHistoryHeightChange)(t, f, u, n)
            },
            unmount: function() {
                Object(c.destroyModule)(m)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return s
    });
    var c = n(110),
        u = n(41),
        l = n(199),
        d = n(81),
        f = "_im_top_banner_button",
        p = "_im_top_banner_hide"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = Object(o["default"])(e, ["icon", "aside", "chevron", "selectable", "border"]),
            n = {
                "ListItem--chevron": !!e.chevron,
                "ListItem--selectable": !!e.selectable,
                "ListItem--border": !!e.border
            };
        return i.createElement("li", s({}, t, {
            className: Object(a.classNames)("ListItem", n, e.className)
        }), e.icon && i.createElement("div", {
            className: "ListItem__icon"
        }, e.icon), i.createElement("div", {
            className: "ListItem__main"
        }, e.children), i.createElement("div", {
            className: "ListItem__aside"
        }, e.aside))
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = n(35),
        o = (n(9), n(133)),
        s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        };
    r.defaultProps = {
        onClick: function() {},
        icon: null,
        aside: null,
        chevron: !1,
        selectable: !0,
        border: !0
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = s.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r = void 0, i = 0; i < n.length; i++) {
                    var a = o(n[i], 2),
                        c = a[0],
                        u = a[1],
                        l = void 0;
                    if (hasClass(e.target, c) ? l = u(e, e.target) : (r = gpeByClass(c, e.target, e.currentTarget)) && (l = u(e, r)), l === !1) break
                }
        }
    }

    function i(e, t, n, i) {
        var a = s.get(e);
        a || (s.set(e, {}), a = s.get(e));
        for (var o = t.split(" "), c = 0; c < o.length; c++) {
            var u = o[c];
            a[u] || (a[u] = [], addEvent(e, u, r)), a[u].push([n, i])
        }
    }

    function a(e, t, n, i) {
        var a = s.get(e);
        if (a) {
            t.split(" ").forEach(function(t) {
                a[t] && (a[t] = a[t].filter(function(e) {
                    return e[0] !== n || e[1] !== i
                }), 0 === a[t].length && removeEvent(e, t, r))
            });
            var o = Object.keys(a).map(function(e) {
                return a[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === o && s["delete"](e)
        }
    }
    n.r(t), n.d(t, "addDelegateEvent", function() {
        return i
    }), n.d(t, "removeDelegateEvent", function() {
        return a
    });
    var o = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        s = new window.Map
}, function(e, t, n) {
    var r = n(143);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t
    }

    function i(e, t) {
        if (r(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            i = Object.keys(t);
        if (n.length !== i.length) return !1;
        for (var o = 0; o < n.length; o++)
            if (!a.call(t, n[o]) || !r(e[n[o]], t[n[o]])) return !1;
        return !0
    }
    var a = Object.prototype.hasOwnProperty;
    e.exports = i
}, function(e, t, n) {
    var r = n(29);
    e.exports = function(e, t, n) {
        for (var i in t) r(e, i, t[i], n);
        return e
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(133)),
        c = n(35),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onTransitionEnd = function(e) {
                    a.state.shown && "opacity" === e.propertyName && (a.timeout = setTimeout(function() {
                        a.setState({
                            shown: !1
                        }), a.props.callback()
                    }, a.props.duration))
                }, a.state = {
                    shown: n.shown
                }, a
            }
            return a(t, e), t.prototype.componentWillReceiveProps = function(e) {
                !this.props.shown && e.shown && this.setState({
                    shown: !0
                })
            }, t.prototype.componentWillUnmount = function() {
                this.timeout && clearTimeout(this.timeout)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = Object(s["default"])(e, ["shown", "callback", "duration", "className"]),
                    n = Object(c.classNames)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, e.className);
                return o.createElement("span", u({}, t, {
                    className: n,
                    onTransitionEnd: this.onTransitionEnd
                }), e.children)
            }, t
        }(o.Component);
    t["default"] = l, l.defaultProps = {
        duration: 2e3
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = {
            "SubmitArea--left": !e.alignment || "left" === e.alignment,
            "SubmitArea--center": "center" === e.alignment,
            "SubmitArea--right": "right" === e.alignment
        };
        return i.createElement("div", {
            className: Object(a.classNames)("SubmitArea", t),
            style: e.style
        }, e.children)
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(83),
        a = n(35)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
    }

    function i(e) {
        return e.selection = [], Promise.resolve(e)
    }

    function a(e, t) {
        return t.selection = t.selection.filter(function(t) {
            return t.id !== e
        }), Promise.resolve(t)
    }

    function o(e, t, n, r, i, o, s) {
        var c = intval(domData(s, "peer"));
        tooltips.hide(s), t.set(a.bind(null, c)).then(function(a) {
            l(e, r, t, i), n().selectionDeleted(t, c)
        })
    }

    function s(e) {
        var t = 0;
        return function() {
            var n = e.offsetWidth;
            setStyle(e, {
                width: 1
            });
            var r = e.offsetLeft;
            return t === r ? void setStyle(e, {
                width: n
            }) : (t = r, n = e.parentNode.offsetWidth, void setStyle(e, {
                width: Math.max(30, n - r - 20)
            }))
        }
    }

    function c(e, t, n, r) {
        e.set(p.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
    }

    function u(e, t, n, r) {
        e.set(i).then(l.bind(null, t, n, e, r))
    }

    function l(e, t, n, r) {
        var i = n.get().selection,
            a = uiSearch.getFieldEl(e);
        uiSearch.focus(e), i.length > 0 ? attr(a, "placeholder", "") : attr(a, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = i.map(function(e) {
            return '<div class="token">\n      <div class="token_title">' + e.name + '</div>\n      <div data-peer="' + e.id + '" class="token_del ' + g + '"></div>\n    </div>'
        }).join(""), toggleClass(e, "ui_multiselect_has_selection", i.length > 0), domFC(e).scrollTop += 50, r()
    }

    function d(e, t) {
        return showTooltip(t, {
            text: getLang("mail_create_chat_remove_user"),
            black: 1,
            shift: [15, 8],
            appendParentCls: "_wrap"
        })
    }

    function f(e, t, n) {
        uiSearch.init(e, {
            onChange: c.bind(null, t, n)
        });
        var f = uiSearch.getFieldEl(e),
            p = ce("div", {
                className: "_ui_multiselection ui_multiselect_cnt"
            });
        f && f.parentNode.insertBefore(p, f);
        var h = s(f);
        t.set(i);
        var _ = o.bind(null, e, t, n, p, h),
            v = function(t) {
                document.activeElement !== f && uiSearch.focus(e)
            },
            b = Object(m.createModule)({
                handlers: function(t, n) {
                    n(e, "click", g, _), n(e, "mouseover", g, d), t(e, "click", v)
                }
            });
        return {
            addSelection: function(n, i) {
                return t.set(r.bind(null, {
                    id: n,
                    name: i
                })).then(l.bind(null, e, p, t, h))
            },
            removeSelection: function(n) {
                return t.set(a.bind(null, n)).then(l.bind(null, e, p, t, h))
            },
            resetSelection: function() {
                u(t, e, p, h)
            },
            focus: function() {
                uiSearch.focus(e)
            },
            save: function() {
                t.stash(), l(e, p, t, h)
            },
            restore: function() {
                t.pop(), l(e, p, t, h)
            },
            unmount: function() {
                uiSearch.destroy(e), Object(m.destroyModule)(b)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return f
    });
    var p = n(41),
        m = n(110),
        g = "_ui_multiselect_cancel"
}, , function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return "number" != typeof t.messageId ? !0 : o(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
    }

    function i(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function a(e) {
        return "call" == e.kludges.attach1_type
    }

    function o(e) {
        return e.flags & y.FLAG_OUTBOUND
    }

    function s(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = e.attaches[0];
        return r && (r.type === t || r.type === n)
    }

    function c(e) {
        return s(e, "doc") && "graffiti" === e.attaches[0].kind
    }

    function u(e) {
        return s(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function l(e) {
        return s(e, "sticker")
    }

    function d(e) {
        return s(e, "gift")
    }

    function f(e) {
        return s(e, "money_transfer", "money_request")
    }

    function p(e) {
        return s(e, "money_request")
    }

    function m(e) {
        return s(e, "link") && g(e.kludges.attach1_url)
    }

    function g(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || n.test(e)
    }

    function h(e) {
        return e.flags & y.FLAG_IMPORTANT
    }

    function _(e) {
        return o(e) ? vk.id : e.userId
    }

    function v(e) {
        return e.update_time > 0
    }

    function b(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    n.r(t), n.d(t, "isUnread", function() {
        return r
    }), n.d(t, "isServiceMsg", function() {
        return i
    }), n.d(t, "isCallMessage", function() {
        return a
    }), n.d(t, "isOut", function() {
        return o
    }), n.d(t, "isGraffiti", function() {
        return c
    }), n.d(t, "isAudioMsg", function() {
        return u
    }), n.d(t, "isSticker", function() {
        return l
    }), n.d(t, "isGift", function() {
        return d
    }), n.d(t, "isMoney", function() {
        return f
    }), n.d(t, "isMoneyRequest", function() {
        return p
    }), n.d(t, "isMessageWithInviteLink", function() {
        return m
    }), n.d(t, "isImportant", function() {
        return h
    }), n.d(t, "getUserId", function() {
        return _
    }), n.d(t, "wasEdited", function() {
        return v
    }), n.d(t, "isMessageSelected", function() {
        return b
    });
    var y = n(132)
}, function(e, t, n) {
    "use strict";
    var r = n(45),
        i = n(92),
        a = n(113),
        o = {};
    n(12)(o, n(38)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
            next: i(1, n)
        }), a(e, t + " Iterator")
    }
}, function(e, t, n) {
    var r = n(60),
        i = n(38)("iterator"),
        a = n(26);
    e.exports = n(104).getIteratorMethod = function(e) {
        return void 0 != e ? e[i] || e["@@iterator"] || a[r(e)] : void 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        removeClass(t.parentNode, "im-page--dialogs_with-mess");
        var r = n.getCurrentElements().filter(function(e) {
            return e.message
        });
        n.toTop(), n.reset(), Object(J.statlogsProbValueEvent)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
            type: "sep_messages"
        }].concat(r), e.setState({
            searchOnlyMessages: !0
        })) : r = [S()], n.pipeReplace(Promise.resolve(r))
    }

    function i(e) {
        return hasClass(e, "_im_search")
    }

    function a(e, t, n, r) {
        if (Object(W.isSearching)(e) && e.get().searchAllLoaded || Object(W.isRecentSearchesActive)(e)) return Promise.resolve([]);
        if (e.get().dialog_search_going || Object(V.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
        if (Object(W.isSearching)(e)) return Object(G.searchMessages)(Object(W.getSearchText)(e), e.get()).then(function(e) {
            var t = te(e, 2),
                n = t[0],
                r = t[1];
            return j(r, n)
        });
        var i = e.get().active_tab,
            a = e.get().dialog_tabs_all;
        return a[Q.FOLDER_ALL] && !Object(V.isReversedDialogs)(e) || a[i] ? 0 === H(e).length ? Promise.resolve([{
            type: "empty_dialogs"
        }]) : Promise.resolve([]) : e.set(G.loadDialogs).then(function(t) {
            var n = H(e);
            return 0 === n.length ? [{
                type: "empty_dialogs"
            }] : n
        })
    }

    function o(e, t, n, r, a) {
        if (!gpeByClass("_im_peer_target", r.target)) {
            var o = t.get(),
                s = i(a),
                c = parseInt(domData(a, "peer"), 10),
                u = parseInt(domData(a, "msgid"), 10),
                l = "";
            Object(W.isSearching)(t) && (l = "conversations_search"), Object(W.isRecentSearchesActive)(t) && (l = "recent_searches"), hasClass(a, "_im_sugg_" + c) && (l = "popular_suggestions"), s && (l = "message_search");
            var d = Object(W.getTab)(t, c);
            if (checkEvent(r)) return window.open(g(t, d, u, s));
            if (n.saveScroll("list"), s && o.msgid !== u) o.longpoll.push([X.changePeer(c, u, !1, !1, l)]);
            else if (c !== o.peer) {
                o.longpoll.push([X.changePeer(c, !1, !0, !0, l)]);
                var f = Object(W.isSearching)(t);
                f && !hasClass(a, "_dont_add_recent") && Object(G.saveRecentSearchPeer)(c, cur.imDb), f && d && !Object(V.isClassicInterface)(t) && setTimeout(function() {
                    var e = d.message ? d.message.messageId : d.peerId;
                    n.scrollToElement(e.toString(), !0, 0, "center")
                }, 100)
            } else c === o.peer && (o.pendingForward ? o.longpoll.push([X.changePeer(c, !1, !0, !s, l)]) : e().goToHistoryEnd());
            cancelEvent(r)
        }
    }

    function s(e, t, n, r) {
        var i = void 0;
        !Object(V.isChatPeer)(t) || "string" == typeof n.photo && "" !== n.photo ? (i = '<img src="' + n.photo + '" alt="">', r && (i = getTemplate("im_dialogs_link_img", {
            href: n.href,
            photo: i
        }))) : i = Object(V.renderPhotosFromTab)(e, n, !r);
        var a = '<span class="_im_dialog_link">' + n.tab + "</span>";
        return {
            photo: i,
            userLink: a
        }
    }

    function c(e) {
        return !Object(V.isPendingForward)(e)
    }

    function u(e, t, n) {
        return n ? getTemplate("im_img_prebody", {
            photo: t
        }) : e + ":"
    }

    function l(e, t, n, r, i, a, o, s, c, l) {
        var d = "",
            f = "";
        return t & X.FLAG_OUTBOUND ? d = u(getLang("mail_by_you"), l, c) : Object(V.isChatPeer)(n) && 0 !== r && (d = u(Object(ee.oCacheGet)(e, r).first_name, Object(ee.oCacheGet)(e, r).photo, c)), o = Object(V.renderShortText)(n, s, o, i, a), f = d ? getTemplate("im_drow_prebody", {
            prebody: d,
            body: o
        }) : o
    }

    function d(e, t, n, r) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            a = [];
        return Object(V.isClassicInterface)(r) && a.push("nim-dialog_classic"), Object(W.isRecentSearchesActive)(r) && a.push("nim-dialog_recent"), a.push("nim-dialog_empty"), i.search && a.push("_im_search"), getTemplate("im_drow", {
            peer: e.peerId,
            msg_id: "",
            photo: t,
            user_link: n,
            date: "",
            body: "",
            unread: "",
            more: a.join(" "),
            is_star: "",
            unread_message_string: "",
            is_online: onlinePlatformClass(e.online),
            is_unread: "",
            is_unread_out: "",
            is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
        })
    }

    function f(e, t, n) {
        return n & X.FLAG_OUTBOUND ? Object(V.isSelfMessage)(t.peerId, e.get().gid) ? !1 : Object(V.isChatPeer)(t.peerId) && t.data && t.data.closed ? !1 : t.unread ? !1 : t.lastmsg <= t.out_up_to ? !1 : !0 : !1
    }

    function p(e) {
        var t = b(e),
            n = e.unread > 0 ? e.unread : "";
        return n > 0 && t
    }

    function m(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            i = s(e, t.peerId, t, Object(V.isClassicInterface)(e)),
            a = i.photo,
            o = i.userLink,
            c = n || b(t);
        if (!c) return d(t, a, o, e, r);
        var u = c.flags,
            l = v(t, e, n),
            m = [];
        r.search && m.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && m.push("nim-dialog_muted"), t.verified && m.push("nim-dialog_verified"), Object(W.isRecentSearchesActive)(e) && m.push("nim-dialog_recent"), -1 === c.messageId && m.push("nim-dialog_empty"), Object(V.isClassicInterface)(e) && m.push("nim-dialog_classic"), t.folders & X.FOLDER_IMPORTANT && m.push("nim-dialog_starred"), !r.search && Object(V.isUnrespond)(e, t.peerId, t) && m.push("nim-dialog_unrespond");
        var g = e.get().timeshift,
            h = f(e, t, u) ? "nim-dialog_unread-out" : "",
            _ = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
        return getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: c.messageId,
            photo: a,
            user_link: o,
            date: c.date ? getShortDateOrTime(c.date, g, !0, getLang("months_sm_of", "raw")) : "",
            body: l,
            unread_message_string: _,
            tab_name: stripHTML(t.tab),
            unread: Object(V.simplifyCounter)(t.unread),
            more: m.join(" "),
            is_online: onlinePlatformClass(t.online),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_unread_out: h,
            is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
        })
    }

    function g(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            i = Object(V.getBaseLink)(e),
            a = function() {
                return i + "?sel=" + Object(V.convertPeerToUrl)(t.peerId) + (r && n ? "&msgid=" + n : "")
            };
        return r ? a() : Object(V.isUserPeer)(t.peerId) || Object(V.isCommunityPeer)(t.peerId) ? Object(V.isClassicInterface)(e) ? a() : t.href : a()
    }

    function h(e, t, n, r, i) {
        if (!t.deletedDialog) {
            if (hasClass(e, "nim-conversation-search-row")) return void _(e, t, n);
            var a = b(t),
                o = a.flags,
                c = v(t, n),
                u = s(n, t.peerId, t, Object(V.isClassicInterface)(n)),
                l = u.photo,
                d = n.get().timeshift,
                m = a.date ? getShortDateOrTime(a.date, d, !0, getLang("months_sm_of", "raw")) : "";
            M(e, t), val(geByClass1("_dialog_body", e), c), val(geByClass1("_im_dialog_date", e), m), val(geByClass1("_im_dialog_unread_ct", e), Object(V.simplifyCounter)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
            var g = geByClass1("_im_dialog_photo", e);
            g.innerHTML !== l && val(g, l), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & X.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", Object(V.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", Object(V.isClassicInterface)(n)), toggleClass(e, "nim-dialog_unread", p(t)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", Object(W.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === a.messageId), f(n, t, o) && addClass(e, "nim-dialog_unread-out"), i && setTimeout(function() {
                addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
            }, 100)
        }
    }

    function _(e, t, n) {
        M(e, t), toggleClass(e, "nim-dialog_recent", Object(W.isRecentSearchesActive)(n)), val(geByClass1("_im_dialog_unread_ct", e), Object(V.simplifyCounter)(t.unread));
        var r = s(n, t.peerId, t, Object(V.isClassicInterface)(n)),
            i = r.photo,
            a = geByClass1("_im_dialog_photo", e);
        a.innerHTML !== i && val(a, i), toggleOnline(geByClass1("_im_peer_online", e), t.online), p(t) && addClass(e, "nim-dialog_unread")
    }

    function v(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || b(e);
        if (Object(V.isPeerBlocked)(e.peerId, t)) {
            var i = t.get().block_states[e.peerId].name,
                a = getLang("mail_community_answering").replace("{username}", i);
            return getTemplate("im_drow_prebody", {
                prebody: a,
                body: ""
            })
        }
        return Object(q.isServiceMsg)(r) ? Object(V.renderServiceMsg)(t, r, e, !1) : l(t, r.flags, e.peerId, r.userId, !0, r.attaches, r.text, r.subject, Object(V.isClassicInterface)(t), Object(ee.oCacheGet)(t, t.get().id).photo)
    }

    function b(e) {
        var t = e.lastmsg_meta;
        return isArray(t) && (t = Object(X.addMessageEvent)([4].concat(t))), t ? t : Object(X.addMessageEvent)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
    }

    function y(e, t, n, r, i) {
        var a = geByClass1("_dialog_body", t);
        addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(a, getTemplate("im_delete_actions", {
            text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
            peer: e,
            spam_id: r
        }))
    }

    function w(e, t, n) {
        var r = Object(V.showFlushDialog)(t, function(i) {
            n().updateMenu(e), Object(V.cleanHistory)(e, r, n, G.flushHistory, t)
        })
    }

    function O(e, t, n, r, i, a) {
        var o = gpeByClass("_im_dialog", a, n);
        if (o) {
            var s = intval(domData(o, "peer"));
            if (t.get().recentSearch) {
                var c = Object(G.removeFromRecentSearch)(s, cur.imDb);
                return re(o), cancelEvent(i), 0 === c.length && F(t, r, e), !1
            }
            var u = Object(V.isCommunityPeer)(s) || Object(V.isUserPeer)(s);
            Object(V.isClassicInterface)(t) && u ? Object(G.deleteDialog)(s, t.get()).then(function(n) {
                var r = te(n, 2),
                    i = r[0],
                    a = r[1];
                i ? (y(s, o, i, a, t), e().updateMenu(t)) : w(t, s, e)
            }) : w(t, s, e)
        }
        return cancelEvent(i), !1
    }

    function C(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            r = s(e, t.peerId, t, Object(V.isClassicInterface)(e)),
            i = r.photo,
            a = r.userLink,
            o = c(e),
            u = "" === n ? [] : [n];
        return Object(W.isRecentSearchesActive)(e) && u.push("nim-dialog_recent"), Object(V.isClassicInterface)(e) && u.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && u.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
            peer: t.peerId,
            msg_id: t.lastmsg || "",
            photo: i,
            user_link: a,
            unread: Object(V.simplifyCounter)(t.unread),
            tab_name: stripHTML(t.tab),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_online: onlinePlatformClass(t.online),
            is_selected: t.peerId == e.get().peer && o ? "nim-dialog_selected _im_dialog_selected" : "",
            more: u.join(" ")
        })
    }

    function k(e, t) {
        switch (t.type) {
            case "sep_btn_search_msg":
                return Object(V.renderBtnSearchOnlyMessages)(e);
            case "sep_messages":
                return Object(V.renderMessagesSep)();
            case "sep_conversations":
                return Object(V.renderConversationsSep)();
            case "sep_popular":
                return Object(V.renderPopularSuggSep)();
            case "popular_sugg":
                return Object(V.renderPopularSuggestions)(e);
            case "clear_recent":
                return Object(V.renderClearRecent)();
            case "empty_dialogs":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_dialogs_list_empty")
                });
            case "empty":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_im_search_empty")
                });
            default:
                return t.message ? m(e, t, t.message, {
                    noselect: !0,
                    search: !0
                }) : t.local_index || Object(W.isSearching)(e) ? C(e, t) : m(e, t)
        }
    }

    function E(e, t, n, r, i, a) {
        var o = intval(domData(a, "peer")),
            s = domData(a, "action"),
            c = domData(a, "sid"),
            u = geByClass1("_im_dialog_" + o, t),
            l = intval(domData(a, "spam"));
        switch (s) {
            case "restore":
                u && e.set(G.restoreDialog.bind(null, o, c, l)).then(function() {
                    addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), h(u, e.get().tabs[o], e, t, !1), r().updateMenu(e)
                });
                break;
            case "spam":
                var d = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + c + '" data-peer="' + o + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                if (u) {
                    var f = geByClass1("_dialog_body", u);
                    val(f, d), Object(G.spamDialog)(o, c, e.get())
                }
                break;
            case "block":
                var p = void 0;
                p = Object(V.isCommunityInterface)(e) ? Object(V.showBlacklistBox)(o, e) : Object(V.showBlacklistBoxUser)(o, e), p.once("success", function() {
                    e.set(G.flushHistory.bind(null, o)).then(function() {
                        n().restoreDialogs(e)
                    })
                })
        }
        cancelEvent(i)
    }

    function j(e, t) {
        return e.map(function(e) {
            return Object(X.addMessageEvent)([4].concat(e))
        }).map(function(e) {
            return extend({}, t[e.peerId], {
                message: e
            })
        })
    }

    function S(e) {
        return {
            type: "empty",
            lang: e
        }
    }

    function T(e, t, n) {
        return Object(V.isClassicInterface)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!Object(V.isClassicInterface)(n)).then(function() {
            Object(V.isClassicInterface)(n) || t().toggleSettingsLoader(n, !1)
        })
    }

    function I(e, t) {
        var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
        return "undefined" != typeof n ? 2e9 + n : t.lastmsg
    }

    function L(e, t, n, r) {
        var i = gpeByClass("_im_dialog", r, t),
            a = intval(domData(i, "peer"));
        return e.set(G.toggleDialogImportant.bind(null, a)), setTimeout(function() {
            P(e, t, n, r)
        }, 100), cancelEvent(n), !1
    }

    function x(e, t, n) {
        var r = void 0;
        return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = Object(V.isReversedDialogs)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = I(e, n) - I(e, t), r = Object(V.isReversedDialogs)(e) ? -r : r), r
    }

    function P(e, t, n, r) {
        var i = r.getBoundingClientRect().top;
        showTooltip(r, {
            text: function() {
                var n = gpeByClass("_im_dialog", r, t),
                    i = domData(n, "peer");
                return e.get().tabs[i].folders & X.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
            },
            black: 1,
            zIndex: 1,
            shift: [14, 8],
            toup: Object(W.isSearching)(e) ? i > 190 : i > 150
        })
    }

    function M(e, t) {
        var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
            r = geByClass1("_im_unread_blind_label", e);
        val(r, n)
    }

    function A(e, t, n, r, i) {
        var a = gpeByClass("_im_dialog", i, t),
            o = intval(domData(a, "peer")),
            s = e.get().tabs[o].lastmsg;
        return e.set(G.markDialogAnswered.bind(null, o, s)).then(function() {
            h(a, e.get().tabs[o], e, t), Object(W.isRecentSearchesActive)(e) || n().restoreDialogs(e)
        }), showDoneBox(getLang("mail_marked_as_answered"), {
            out: 1e3
        }), cancelEvent(r), !1
    }

    function N(e) {
        var t = 42,
            n = 60,
            r = 45,
            i = 37,
            a = Object(W.isSearching)(e),
            o = e.get().searchOnlyMessages;
        return Object(V.isClassicInterface)(e) ? {
            top: a && !o ? n + i - 1 : n,
            bottom: Object(V.isCommunityInterface)(e) ? t : t + r
        } : {
            top: a && !o ? i - 1 : 0,
            bottom: 0
        }
    }

    function D(e, t) {
        e.hoverFirstElement(se, N(t))
    }

    function R(e) {
        e.unhoverElements(se)
    }

    function F(e, t, n) {
        if (Object(W.doPopularSuggExist)(e)) {
            var r = [{
                type: "sep_popular"
            }, {
                type: "popular_sugg"
            }];
            t.pipeReplace(Promise.resolve(r)), t.toTop()
        } else n().cancelSearch(e), cancelStackFilter("im_search")
    }

    function B(e, t, n, r, a) {
        return {
            selectPeer: function(t, n) {
                for (var r = geByClass("_im_dialog", e), a = n.get().peer, o = 0; o < r.length; o++) {
                    var s = r[o],
                        c = intval(domData(s, "peer")),
                        u = intval(domData(s, "msgid"));
                    c === a && (!i(s) || t === u && i(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                }
            },
            appendFastDialogs: function(t, r, i) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), i ? (n.reset(), Object(V.isPendingForward)(t) || Object(W.isRecentSearchesActive)(t) || !Object(K.doesSearchResultContainConversations)(r) ? Object(W.isRecentSearchesActive)(t) && (Object(K.doesSearchResultContainConversations)(r) && (r = [{
                    type: "clear_recent"
                }].concat(r)), Object(W.doPopularSuggExist)(t) && (r = [{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }].concat(r))) : r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r), t.setState({
                    searchOnlyMessages: !1
                }), n.pipeReplace(Promise.resolve(r)).then(function() {
                    return D(n, t)
                })) : n.pipe(Promise.resolve(r)), (!Object(V.isClassicInterface)(t) || Object(V.isReservedPeer)(t.get().peer)) && n.toTop()
            },
            deactivate: function() {
                n.deactivate()
            },
            activate: function() {
                n.activate()
            },
            hoverFirstDialog: function(e) {
                D(n, e)
            },
            hoverNextDialog: function(e) {
                n.hoverNextElement(se, oe, N(e))
            },
            hoverPrevDialog: function(e) {
                n.hoverPrevElement(se, oe, N(e))
            },
            unhoverDialogs: R.bind(n),
            selectHoveredDialog: function(t) {
                var i = geByClass1("_im_dialog_hovered", e);
                i || (i = geByClass1("_im_dialog", e)), i && o(r, t, n, {}, i)
            },
            appendSearch: function(t, r, i) {
                var a = j(i, r);
                i.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                    type: "sep_messages"
                }].concat(a))).then(function() {
                    return D(n, t)
                })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([S()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
            },
            updateDialog: function(t, n) {
                var r = geByClass1("_im_dialog_" + t);
                r && !i(r) && h(r, n.get().tabs[t], n, e)
            },
            focusOnSelected: function(e) {
                var t = e.get().peer;
                if (t) {
                    var r = geByClass1("_im_dialog_" + t);
                    r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                }
            },
            restoreScroll: function(e) {
                var t = n.restoreScroll("list");
                t || n.toTop()
            },
            restoreDialogs: function(t, i, a) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                    searchOnlyMessages: !1
                }), 0 !== H(t).length || n.isLoading() || (i = !0), i && n.reset(), a && n.wipe(), n.pipeReplace(Promise.resolve(H(t))).then(function(e) {
                    if (i && (!Object(V.isClassicInterface)(t) || !t.get().peer)) {
                        var a = T(n, r, t);
                        return n.toTop(), a
                    }
                }).then(function() {
                    return R(n)
                })
            },
            appendDialogs: function(t, r) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                    var r = geByClass1("_im_dialog_" + n.peerId, e);
                    r && _(r, n, t)
                }), Object(V.isPendingForward)(t) || Object(W.isRecentSearchesActive)(t) || !Object(K.doesSearchResultContainConversations)(r) || (r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r)), t.setState({
                    searchOnlyMessages: !1
                }), n.isEmpty() && 0 === r.length && Object(V.isPendingForward)(t) && (r = [S(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
            },
            updateCounter: function(t, n) {
                var r = geByClass1("_im_dialog_" + n, e),
                    a = Object(W.getTab)(t, n);
                if (r && !i(r) && (M(r, a), val(geByClass1("_im_dialog_unread_ct", r), Object(V.simplifyCounter)(a.unread)), toggleClass(r, "nim-dialog_unread", a.unread > 0), toggleClass(r, "nim-dialog_unread-out", f(t, a, b(a).flags))), Object(W.isRecentSearchesActive)(t)) {
                    var o = geByClass1("_im_sugg_" + n);
                    o && (val(geByClass1("_sugg_unread_ct", o), Object(V.simplifyCounter)(a.unread)), toggleClass(o, "sugg-is_unread", a.unread > 0))
                }
            },
            removeDialog: function(e, t) {
                n.remove(t)
            },
            updateOnline: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r) {
                    var i = n.get().tabs[t],
                        a = geByClass1("_im_peer_online", r);
                    toggleOnline(a, i.online)
                }
            },
            setDialogFailed: function(t, n, r) {
                var i = geByClass1("_im_dialog_" + t, e);
                if (i) {
                    var a = r.get().tabs[t];
                    a.lastmsg === n && (addClass(i, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", i), "!"))
                }
            },
            scrollUp: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                n.toTop(e, t), n.saveScroll("list", !0)
            },
            saveScroll: function(e) {
                n.saveScroll("list", !0)
            },
            promoteDialog: function(r, a) {
                var o = geByClass1("_im_dialog_" + a, e);
                return o && !i(o) || !Object(W.isSearching)(r) ? (n.pipeReplace(Promise.resolve(H(r)), void 0, !0).then(function(t) {
                    !inArray(a, t) && o && h(o, Object(W.getTab)(r, a), r, e)
                }), void t().updateTyping(a, r)) : void n.unsetScroll("list")
            },
            removeSelection: function(t) {
                var r = t.get().peer.toString(),
                    i = "._im_dialog_" + r + "." + oe.join("."),
                    a = domQuery(i, e)[0];
                oe.forEach(function(e) {
                    return removeClass(a, e)
                }), Object(V.isClassicInterface)(t) || n.hoverElement(r, se, N(t))
            },
            updateScroll: function() {
                n.updateScroll()
            },
            updateTyping: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r && !i(r) && !n.get().tabs[t].deletedDialog) {
                    var a = geByClass1("_im_dialog_typing", r),
                        o = !Object(V.isClassicInterface)(n),
                        s = Object(V.formatTyper)(n.get().tabs[t].typing, t, !Object(V.isChatPeer)(t), n.get(), 1, o);
                    val(a, s), toggleClass(r, "nim-dialog_typing", s)
                }
            },
            unmount: function() {
                n.unmount(), Object(Z.destroyModule)(a)
            }
        }
    }

    function H(e) {
        var t = e.get().active_tab,
            n = e.get().dialog_tabs[t],
            r = e.get().tabs;
        return n.map(function(e) {
            return r["" + e]
        }).sort(x.bind(null, e))
    }

    function U(e, t) {
        return t.message ? t.message.messageId : Object(W.isSearching)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
    }

    function z(e, t, n) {
        var i = Object(Z.createMutations)(B),
            s = i.callMutations,
            c = i.bindMutations,
            u = function(e, n) {
                var r = n.getBoundingClientRect().top;
                showTooltip(n, {
                    text: function() {
                        return Object(W.isRecentSearchesActive)(t) ? getLang("mail_hide_from_recent") : getLang("mail_delete")
                    },
                    black: 1,
                    center: !0,
                    shift: Object(V.isClassicInterface)(t) ? [-4, 10] : [2, 10],
                    toup: r > 150 || Object(W.isSearching)(t),
                    zIndex: 1
                })
            },
            l = function(e, t) {
                var n = t.getBoundingClientRect().top;
                showTooltip(t, {
                    text: getLang("mail_end_conversation"),
                    black: 1,
                    center: !0,
                    zIndex: 1,
                    shift: [1, 4],
                    toup: n > 150
                })
            },
            d = P.bind(null, t, e),
            f = L.bind(null, t, e),
            p = A.bind(null, t, e, s),
            m = geByClass1("_im_dialogs_search"),
            g = {
                idFn: function(e) {
                    return U(t, e)
                },
                hoverableFn: function(e) {
                    return hasClass(e, "_im_dialog")
                },
                renderFn: k.bind(null, t),
                more: a.bind(null, t, s),
                onScroll: Object(V.isClassicInterface)(t) ? function() {
                    var e = bodyNode.scrollTop || document.documentElement.scrollTop;
                    0 >= e && !layers.visible && browser.safari ? addClass(m, "im-page--header_static") : removeClass(m, "im-page--header_static");
                } : !1
            },
            h = Object($.mount)(e, Object(Y["default"])({
                limit: 40,
                offset: 0,
                nativeScroll: !!Object(V.isClassicInterface)(t),
                height: ne,
                elements: H(t)
            }), function() {
                return g
            }),
            _ = o.bind(null, n, t, h),
            v = r.bind(null, t, e, h),
            b = E.bind(null, t, e, s, n),
            y = O.bind(null, n, t, e, h),
            w = Object(Z.createModule)({
                handlers: function(r, i) {
                    i(e, "click", "_im_dialog_close", y), i(e, "click", "_im_dialog_markre", p), i(e, "click", ie, f), i(e, "click", "_im_dialog", _), i(e, "click", V.MESSAGE_SEARCH_CLASS, v), i(e, "mouseover", "_im_dialog_close", u), i(e, "mouseover", "_im_dialog_markre", l), i(e, "click", V.CLEAR_RECENT_CLASS, function() {
                        Object(G.resetRecentSearch)(cur.imDb), F(t, h, n)
                    }), i(e, "mouseover", ie, d), i(e, "click", ae, b), r(e, "mouseover", throttle(h.unhoverElements.bind(h, se), 100))
                }
            });
        return c(e, s, h, n, w)
    }
    n.r(t), n.d(t, "mount", function() {
        return z
    });
    var G = n(41),
        V = n(81),
        W = n(199),
        q = n(158),
        K = n(195),
        Q = n(30),
        Y = n(188),
        $ = n(73),
        X = n(132),
        Z = n(110),
        J = n(141),
        ee = n(136),
        te = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        ne = 64,
        ie = "_im_dialog_star",
        ae = "_im_dialog_daction",
        oe = ["_im_dialog_selected", "nim-dialog_selected"],
        se = ["_im_dialog_hovered", "nim-dialog_hovered"]
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(133)),
        c = n(35),
        u = n(93),
        l = n(15),
        d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        f = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.needRecalcSize = !1, a.state = {}, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = Object(s["default"])(e, ["className", "loading"]),
                    n = Object(c.classNames)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": e.loading
                    }, e.className);
                return o.createElement(l["default"], d({}, t, {
                    className: n
                }), o.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, e.children), e.loading && o.createElement(u["default"], {
                    inverted: "primary" === e.appearance,
                    className: "ButtonWithProgress__progress"
                }))
            }, t
        }(o.Component);
    t["default"] = f, f.defaultProps = {
        appearance: "primary",
        size: "m",
        wide: !1,
        loading: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(204),
        c = (n(9), n(35)),
        u = n(126),
        l = window,
        d = l.elfocus,
        f = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onChange = function(e) {
                    a.props.onChange ? a.props.onChange(e) : a.setState({
                        value: e.target.value,
                        changed: a.props.value !== a.state.value
                    })
                }, a.onClick = function() {
                    a.setState({
                        editing: !0
                    }, function() {
                        a.textarea && d(a.textarea)
                    })
                }, a.onBlur = function() {
                    a.state.changed || a.setState({
                        editing: !1
                    })
                }, a.onSave = function() {
                    (!a.props.validate || a.props.validate(a.state.value)) && (a.setState({
                        editing: !1,
                        changed: !1
                    }), a.props.onSave && a.props.onSave({
                        value: a.state.value
                    }))
                }, a.onKeydown = function(e) {
                    a.state.editing && (27 === e.keyCode && (a.props.onCancel && a.props.onCancel(), a.setState({
                        editing: !1,
                        changed: !1,
                        value: a.props.value
                    }), e.preventDefault(), e.stopPropagation()), a.props.useEnter && 13 === e.keyCode && (a.onSave(), e.preventDefault(), e.stopPropagation()))
                }, a.getRef = function(e) {
                    e && e.element && (a.textarea = e.element)
                }, a.state = {
                    value: n.value,
                    editing: !1,
                    changed: n.onChange ? n.changed : !1
                }, a
            }
            return a(t, e), t.prototype.componentWillReceiveProps = function(e) {
                this.setState({
                    value: e.value,
                    changed: e.onChange ? e.changed : e.value === this.state.value
                })
            }, t.prototype.componentDidMount = function() {
                this.el = s.findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
            }, t.prototype.componentWillUnmount = function() {
                this.el.removeEventListener("keydown", this.onKeydown)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.validate,
                    r = this.state,
                    i = r.editing,
                    a = r.changed,
                    s = r.value,
                    l = Object(c.classNames)("EditableLabel", {
                        "EditableLabel--editing": i,
                        "EditableLabel--changed": a,
                        "EditableLabel--invalid": n && !n(s)
                    }, t);
                return o.createElement("div", {
                    className: l
                }, i ? o.createElement(o.Fragment, null, o.createElement(u["default"], {
                    className: "EditableLabel__textarea",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: s,
                    onBlur: this.onBlur,
                    style: {
                        height: "auto"
                    },
                    rows: "1",
                    ref: this.getRef
                }), a && o.createElement("button", {
                    className: "EditableLabel__save",
                    onClick: this.onSave
                })) : o.createElement("div", {
                    className: "EditableLabel__text",
                    onClick: this.onClick
                }, s))
            }, t
        }(o.Component);
    t["default"] = f, f.defaultProps = {
        value: "",
        changed: !1,
        useEnter: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = n(15),
        c = n(162),
        u = n(154),
        l = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.onConfirm = function() {
                    a.state.loading || (a.setState({
                        loading: !0
                    }), a.props.onConfirm().then(function() {
                        a.setState({
                            loading: !1
                        }), a.props.onCancel()
                    })["catch"](function() {
                        return a.setState({
                            loading: !1
                        })
                    }))
                }, a.state = {}, a
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props.getLang;
                return o.createElement("div", {
                    className: "ChatSettingsResetInvitationLink"
                }, o.createElement("div", {
                    className: "ChatSettingsResetInvitationLink__text",
                    dangerouslySetInnerHTML: {
                        __html: e("mail_chat_reset_link_warning")
                    }
                }), o.createElement(u["default"], {
                    alignment: "right"
                }, o.createElement(s["default"], {
                    appearance: "tertiary",
                    onClick: this.props.onCancel
                }, e("global_cancel")), o.createElement(c["default"], {
                    onClick: this.onConfirm,
                    loading: this.state.loading
                }, e("mail_chat_reset_link_confirm"))))
            }, t
        }(o.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function i(e, t, n, i, o) {
        if (!Object(l.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(o, u.FAILED_CLASS) || hasClass(o, u.SENDING_CLASS) || hasClass(o, "_im_mess_srv") || Object(u.checkSelectClick)(i, o) || Object(d.isAnyMessageBeingEdited)(e) || "A" === i.target.tagName || i.target.classList.contains(f))) {
            var s = intval(domData(o, "msgid")),
                c = e.get().peer;
            if (!Object(u.isAlreadyDeleted)(e, c, s)) {
                var p = void 0,
                    m = void 0;
                p = i.shiftKey ? Object(d.getMessageRangeFromSelection)(e, c, s) : [s], e.set(l.addSelection.bind(null, p)).then(function() {
                    var i = Object(d.getSelectedMessages)(e),
                        a = !1;
                    p.forEach(function(e) {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var r = inArray(e, i);
                            a |= r, toggleClass(t, "im-mess_selected", r);
                            var o = r ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                s = geByClass1("_im_mess_blind_label_select", t);
                            attr(s, "aria-label", o)
                        }
                    }), a && r(), t().changedMessageSelection(e)
                }).then(function() {
                    1 !== e.get().selectedMessages.length || m ? m && m.hide() : m = a(e)
                })
            }
        }
    }

    function a(e) {
        var t = e.get();
        if (t.pinnedMessagesPromo && Object(u.isChatPeer)(t.peer)) {
            var n = geByClass1("_mess-action-promo"),
                r = new ElementTooltip(n, {
                    autoShow: !1,
                    appendTo: n,
                    content: getTemplate("im_pinned_messages_promo", {
                        content: getLang("mail_pinned_messages_promo_tooltip")
                    }),
                    forceSide: "bottom",
                    cls: "feature_intro_tt",
                    width: 260,
                    onHide: function() {
                        e.setState({
                            pinnedMessagesPromo: !1
                        }), Object(l.hidePromoTooltip)()
                    }
                });
            return r.show(), r
        }
    }

    function o(e, t) {
        return {
            cleanSelection: function(t) {
                t.map(function(t) {
                    return geByClass1("_im_mess_" + t, e)
                }).filter(function(e) {
                    return e
                }).forEach(function(e) {
                    return removeClass(e, "im-mess_selected")
                })
            },
            unmount: function() {
                Object(c.destroyModule)(t)
            }
        }
    }

    function s(e, t, n) {
        var r = i.bind(null, t, n, e),
            a = Object(c.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_mess", r)
                }
            });
        return o(e, a)
    }
    n.r(t), n.d(t, "mount", function() {
        return s
    });
    var c = n(110),
        u = n(81),
        l = n(41),
        d = n(199),
        f = "_im_retry_media"
}, function(e, t, n) {
    var r = n(185);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
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
    n.r(t);
    var s = n(83),
        c = n(35),
        u = n(199),
        l = n(41),
        d = n(42),
        f = n(131),
        p = n(162),
        m = n(154),
        g = window,
        h = g.showFastBox,
        _ = g.unclean,
        v = function() {},
        b = function(e) {
            function t(n) {
                i(this, t);
                var r = a(this, e.call(this, n));
                return r.onChange = function(e) {
                    var t = r.props.store.get(),
                        n = e.target.value;
                    Object(l.searchLocalHints)(n, t).then(r.setSearchResults.bind(r, {}, !1, n))
                }, r.onRemoveToken = function(e) {
                    return new Promise(function(t) {
                        var n = r.state.selected.filter(function(t) {
                            return t !== e
                        });
                        r.selected = n.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {}), r.setState({
                            selected: n
                        }, t)
                    })
                }, r.onSelect = function(e) {
                    return new Promise(function(t) {
                        var n = r.selected[e] ? r.state.selected.filter(function(t) {
                            return t !== e
                        }) : [].concat(r.state.selected, e).filter(function(e, t, n) {
                            return n.indexOf(e) === t
                        });
                        r.selected = n.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {}), r.resetSearch({
                            selected: n,
                            value: ""
                        }, t)
                    })
                }, r.onAddPeople = function() {
                    var e = r.props.store,
                        t = e.get(),
                        n = t.peer,
                        i = r.state.selected.map(function(e) {
                            return parseInt(e)
                        });
                    r.setState({
                        loading: !0
                    }), e.set(l.addNewMemberOptimisticly.bind(null, n, i)), e.set(l.addNewMember.bind(null, n, i)).then(function() {
                        return e.set(l.getChatDetails.bind(null, n)).then(function() {
                            r.selected = {}, r.resetSearch({
                                selected: [],
                                loading: !1
                            })
                        })
                    })["catch"](function(e) {
                        r.selected = {}, r.resetSearch({
                            selected: [],
                            loading: !1
                        }), h(getLang("global_error"), e)
                    })
                }, r.setSearchResults = function(e, t, n, i) {
                    var a = r.props.store,
                        o = a.get(),
                        s = Object(u.getTab)(o, o.peer),
                        c = [];
                    i.forEach(function(e) {
                        r.data[e.peerId] || (r.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && c.push(e.peerId)
                    }), r.setState(Object.assign({}, e, {
                        found: c,
                        value: n
                    }), t || v)
                }, r.state = {
                    selected: [],
                    value: "",
                    loading: !1,
                    found: []
                }, r.data = {}, r.selected = {}, r
            }
            return o(t, e), t.prototype.resetSearch = function(e, t) {
                return Object(l.searchLocalHints)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
            }, t.prototype.componentDidMount = function() {
                this.resetSearch()
            }, t.prototype.render = function() {
                var e, t = this,
                    n = this.props.getLang,
                    i = Object.keys(this.state.selected).length,
                    a = "ChatSettingsMembers__entity";
                return s.createElement("div", {
                    className: "ChatSettingsMembers"
                }, s.createElement(f["default"], (e = {
                    className: "ChatSettingsMembers__multiSelect",
                    tokens: this.state.selected.map(function(e) {
                        return {
                            text: _(t.data[e].name),
                            id: e
                        }
                    }),
                    removeTokenPlaceholder: n("mail_create_chat_remove_user"),
                    onRemoveToken: this.onRemoveToken,
                    placeholder: n("mail_search_creation"),
                    value: this.state.value,
                    useInfiniteScroll: !1,
                    onChange: this.onChange,
                    onSelect: this.onSelect
                }, r(e, "useInfiniteScroll", !0), r(e, "hasMore", !1), r(e, "virtualized", !0), r(e, "loadMore", function() {}), r(e, "notFoundText", n("mail_not_found")), e), this.state.found.map(function(e) {
                    return s.createElement("div", {
                        className: Object(c.classNames)(a, r({}, a + "--selected", t.selected[e])),
                        key: e,
                        "data-id": e
                    }, s.createElement(d["default"], {
                        size: "34",
                        title: t.data[e].name,
                        photo: t.data[e].photo
                    }))
                })), s.createElement(m["default"], {
                    alignment: "right"
                }, s.createElement(p["default"], {
                    disabled: 0 === i,
                    onClick: this.onAddPeople,
                    loading: this.state.loading
                }, n(2 > i ? "mail_append_chat" : "mail_im_create_chat_with"))))
            }, t
        }(s.Component);
    t["default"] = b
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (t && t.status && e.lpstat) {
            var n = Math.floor(t.status / 100);
            t.status >= 500 && t.status < 600 && v("fc_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), C[n] = n in C ? C[n] + 1 : 1, Date.now() - k >= O && (Object.keys(C).forEach(function(e) {
                v("fc_longpoll", C[e], e + "0x", t.getResponseHeader("x-frontend"))
            }), C = {}, k = Date.now())
        }
    }

    function i(e) {
        return Object(p.post)(p.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.id < 0 ? -e.id : 0
        })
    }

    function a(e, t) {
        e.waitAbortFns.push(t)
    }

    function o(e, t) {
        var n = t.failed ? Object(f.abortablePause)(w, null) : {},
            r = n.abort,
            o = n.pause;
        switch (t.failed) {
            case 1:
                return Object(g.lpLogFc)("red", "LP failed: old timestamp; resync, next ts", t.ts), e.onResult({
                    ts: t.ts,
                    updates: [
                        [-1]
                    ]
                }), a(e, r), o().then(function() {
                    return c(e)
                });
            case 2:
                return Object(g.lpLogFc)("red", "LP failed: key is incorrect; refresh key"), a(e, r), i(e).then(function(t) {
                    var n = h(t, 4),
                        r = n[0],
                        i = n[1],
                        a = n[2],
                        o = n[3];
                    return e.onResult({
                        ts: +o,
                        updates: [
                            [-2, r, i + "/" + a],
                            [-1]
                        ]
                    })
                }).then(o).then(function() {
                    return c(e)
                });
            case 3:
                throw window.nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return t
        }
    }

    function s(e) {
        return e.map(function(e) {
            switch (e[0]) {
                case 0:
                    return m.deleteEvent(e);
                case 1:
                    return m.replaceFlagsEvent(e);
                case 2:
                    return m.setFlagsEvent(e);
                case 3:
                    return m.resetFlagsEvent(e);
                case 4:
                    return m.addMessageEvent(e);
                case 5:
                    return m.editMessageEvent(e);
                case 6:
                    return m.readInboundEvent(e);
                case 7:
                    return m.readOutboundEvent(e);
                case 8:
                    return m.gotOnlineEvent(e);
                case 9:
                    return m.gotOfflineEvent(e);
                case 10:
                    return m.resetDirectoriesEvent(e);
                case 11:
                    return m.replaceDirectoriesEvent(e);
                case 12:
                    return m.setDirectoriesEvent(e);
                case 13:
                    return m.deleteDialogEvent(e);
                case 51:
                    return m.chatChangedEvent(e);
                case 52:
                    return m.chatUpdatedEvent(e);
                case 63:
                    return m.typingEvent(e);
                case 70:
                    return m.videoCallEvent(e);
                case 80:
                    return m.unreadCountEvent(e);
                case 114:
                    return m.notifySettingsChangedEvent(e);
                case 116:
                    return m.refreshMessageEvent(e);
                case -1:
                    return m.resyncEvent();
                case -2:
                    return m.refreshLpKeyEvent(e);
                default:
                    return m.emptyEvent(e)
            }
        })
    }

    function c(e) {
        if (e.isStoppedFn()) return Promise.resolve({
            ts: 0,
            updates: []
        });
        var t = Object(p.plaingetCancelable)(e.url, {
                act: "a_check",
                key: e.key,
                version: e.version,
                ts: e.ts,
                wait: 25,
                mode: e.mode
            }),
            n = t.request,
            i = t.cancel;
        return e.stopFn = i, n.then(function(t) {
            var n = h(t, 2),
                i = n[0],
                a = n[1];
            return r(e, a), e.waitTimeout = 2, JSON.parse(i)
        })["catch"](function(t) {
            var n = h(t, 2),
                i = n[0],
                a = n[1];
            throw r(e, a), i
        }).then(function(t) {
            return o(e, t)
        })
    }

    function u(e) {
        e.isStoppedFn() || c(e).then(e.onResult)["catch"](function(t) {
            return l(e, t)
        }).then(function() {
            return u(e)
        })
    }

    function l(e, t) {
        if (!e.isStoppedFn()) {
            window.topError(t), Object(g.lpLogFc)("red", "LP error", t.message || "no message (probably browser reset)"), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
            var n = Object(f.abortablePause)(e.waitTimeout, null),
                r = n.abort,
                i = n.pause;
            return a(e, r), i()
        }
    }

    function d(e, t) {
        function n(e, n, r) {
            i.ts = n;
            for (var a = 0; a < r.length; ++a) r[a].type === m.REFRESH_LP_KEY && (i.key = r[a].key, i.url = r[a].url);
            t(e, n, r)
        }
        var r = !!e.stopped,
            i = {
                id: e.id,
                key: e.key,
                ts: e.ts,
                url: e.url,
                lpstat: e.lpstat || 0,
                version: y,
                mode: b,
                waitTimeout: 2,
                waitAbortFns: [],
                isStoppedFn: function() {
                    return r
                },
                onResult: function(e) {
                    e.ts && n(i.ts, e.ts, s(e.updates))
                }
            },
            a = {
                options: i,
                isStopped: function() {
                    return r
                },
                stopConnection: function() {
                    r = !0, i.stopFn && i.stopFn(), i.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection: function() {
                    this.stopConnection(), r = !1, u(i)
                },
                abortWaiting: function() {
                    i.waitAbortFns.forEach(function(e) {
                        return e()
                    }), i.waitAbortFns = [], i.waitTimeout = 2
                },
                onLp: n
            };
        return u(i), a
    }
    n.r(t), n.d(t, "createLongPoll", function() {
        return d
    });
    var f = n(27),
        p = n(64),
        m = n(132),
        g = n(123),
        h = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        _ = window,
        v = _.statlogsValueEvent,
        b = 202,
        y = 5,
        w = 4,
        O = 3e4,
        C = {},
        k = Date.now()
}, function(e, t, n) {
    "use strict";
    var r = n(60),
        i = {};
    i[n(38)("toStringTag")] = "z", i + "" != "[object z]" && n(29)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
    }

    function i(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || T
    }

    function a(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || T
    }

    function o() {}

    function s(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || T
    }

    function c(e, t, n) {
        var r, i = {},
            a = null,
            o = null;
        if (null != t)
            for (r in void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (a = "" + t.key), t) P.call(t, r) && !M.hasOwnProperty(r) && (i[r] = t[r]);
        var s = arguments.length - 2;
        if (1 === s) i.children = n;
        else if (s > 1) {
            for (var c = Array(s), u = 0; s > u; u++) c[u] = arguments[u + 2];
            i.children = c
        }
        if (e && e.defaultProps)
            for (r in s = e.defaultProps) void 0 === i[r] && (i[r] = s[r]);
        return {
            $$typeof: O,
            type: e,
            key: a,
            ref: o,
            props: i,
            _owner: x.current
        }
    }

    function u(e) {
        return "object" == typeof e && null !== e && e.$$typeof === O
    }

    function l(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + ("" + e).replace(/[=:]/g, function(e) {
            return t[e]
        })
    }

    function d(e, t, n, r) {
        if (N.length) {
            var i = N.pop();
            return i.result = e, i.keyPrefix = t, i.func = n, i.context = r, i.count = 0, i
        }
        return {
            result: e,
            keyPrefix: t,
            func: n,
            context: r,
            count: 0
        }
    }

    function f(e) {
        e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > N.length && N.push(e)
    }

    function p(e, t, n, i) {
        var a = typeof e;
        ("undefined" === a || "boolean" === a) && (e = null);
        var o = !1;
        if (null === e) o = !0;
        else switch (a) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case O:
                    case C:
                    case k:
                    case E:
                        o = !0
                }
        }
        if (o) return n(i, e, "" === t ? "." + m(e, 0) : t), 1;
        if (o = 0, t = "" === t ? "." : t + ":", Array.isArray(e))
            for (var s = 0; s < e.length; s++) {
                a = e[s];
                var c = t + m(a, s);
                o += p(a, c, n, i)
            } else if (null === e || "undefined" == typeof e ? c = null : (c = S && e[S] || e["@@iterator"], c = "function" == typeof c ? c : null), "function" == typeof c)
                for (e = c.call(e), s = 0; !(a = e.next()).done;) a = a.value, c = t + m(a, s++), o += p(a, c, n, i);
            else "object" === a && (n = "" + e, r("31", "[object Object]" === n ? "object with keys {" + Object.keys(e).join(", ") + "}" : n, ""));
        return o
    }

    function m(e, t) {
        return "object" == typeof e && null !== e && null != e.key ? l(e.key) : t.toString(36)
    }

    function g(e, t) {
        e.func.call(e.context, t, e.count++)
    }

    function h(e, t, n) {
        var r = e.result,
            i = e.keyPrefix;
        e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? _(e, r, n, y.thatReturnsArgument) : null != e && (u(e) && (t = i + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(A, "$&/") + "/") + n, e = {
            $$typeof: O,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }), r.push(e))
    }

    function _(e, t, n, r, i) {
        var a = "";
        null != n && (a = ("" + n).replace(A, "$&/") + "/"), t = d(t, a, r, i), null == e || p(e, "", h, t), f(t)
    }
    var v = n(89),
        b = n(99),
        y = n(105),
        w = "function" == typeof Symbol && Symbol["for"],
        O = w ? Symbol["for"]("react.element") : 60103,
        C = w ? Symbol["for"]("react.call") : 60104,
        k = w ? Symbol["for"]("react.return") : 60105,
        E = w ? Symbol["for"]("react.portal") : 60106,
        j = w ? Symbol["for"]("react.fragment") : 60107,
        S = "function" == typeof Symbol && Symbol.iterator,
        T = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        };
    i.prototype.isReactComponent = {}, i.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e ? r("85") : void 0, this.updater.enqueueSetState(this, e, t, "setState")
    }, i.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }, o.prototype = i.prototype;
    var I = a.prototype = new o;
    I.constructor = a, v(I, i.prototype), I.isPureReactComponent = !0;
    var L = s.prototype = new o;
    L.constructor = s, v(L, i.prototype), L.unstable_isAsyncReactComponent = !0, L.render = function() {
        return this.props.children
    };
    var x = {
            current: null
        },
        P = Object.prototype.hasOwnProperty,
        M = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        },
        A = /\/+/g,
        N = [],
        D = {
            Children: {
                map: function(e, t, n) {
                    if (null == e) return e;
                    var r = [];
                    return _(e, r, null, t, n), r
                },
                forEach: function(e, t, n) {
                    return null == e ? e : (t = d(null, null, t, n), null == e || p(e, "", g, t), void f(t))
                },
                count: function(e) {
                    return null == e ? 0 : p(e, "", y.thatReturnsNull, null)
                },
                toArray: function(e) {
                    var t = [];
                    return _(e, t, null, y.thatReturnsArgument), t
                },
                only: function(e) {
                    return u(e) ? void 0 : r("143"), e
                }
            },
            Component: i,
            PureComponent: a,
            unstable_AsyncComponent: s,
            Fragment: j,
            createElement: c,
            cloneElement: function(e, t, n) {
                var r = v({}, e.props),
                    i = e.key,
                    a = e.ref,
                    o = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (a = t.ref, o = x.current), void 0 !== t.key && (i = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
                    for (c in t) P.call(t, c) && !M.hasOwnProperty(c) && (r[c] = void 0 === t[c] && void 0 !== s ? s[c] : t[c])
                }
                var c = arguments.length - 2;
                if (1 === c) r.children = n;
                else if (c > 1) {
                    s = Array(c);
                    for (var u = 0; c > u; u++) s[u] = arguments[u + 2];
                    r.children = s
                }
                return {
                    $$typeof: O,
                    type: e.type,
                    key: i,
                    ref: a,
                    props: r,
                    _owner: o
                }
            },
            createFactory: function(e) {
                var t = c.bind(null, e);
                return t.type = e, t
            },
            isValidElement: u,
            version: "16.2.0",
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: x,
                assign: v
            }
        },
        R = Object.freeze({
            "default": D
        }),
        F = R && D || R;
    e.exports = F["default"] ? F["default"] : F
}, function(e, t, n) {
    for (var r = n(44), i = n(29), a = n(157), o = n(12), s = n(26), c = n(38), u = c("iterator"), l = c("toStringTag"), d = s.Array, f = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; 5 > p; p++) {
        var m, g = f[p],
            h = a[g],
            _ = h && h.prototype;
        if (_) {
            _[u] || o(_, u, d), _[l] || o(_, l, g), s[g] = d;
            for (m in r) _[m] || i(_, m, r[m], !0)
        }
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    var r = n(166),
        i = n(143);
    e.exports = function(e) {
        return r(i(e))
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(204)),
        c = n(35),
        u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        l = "Select...",
        d = function(e) {
            function t(n) {
                r(this, t);
                var a = i(this, e.call(this, n));
                return a.handleMouseDown = function(e) {
                    a.props.onFocus && "function" == typeof a.props.onFocus && a.props.onFocus(a.state.opened), ("mousedown" !== e.type || 0 === e.button) && (e.stopPropagation(), e.preventDefault(), a.props.disabled || a.setState({
                        opened: !a.state.opened
                    }))
                }, a.setValue = function(e, t) {
                    var n = {
                        selected: {
                            value: e,
                            label: t
                        },
                        opened: !1
                    };
                    a.fireChangeEvent(n), a.setState(n)
                }, a.fireChangeEvent = function(e) {
                    e.selected !== a.state.selected && a.props.onChange && a.props.onChange({
                        name: a.props.name,
                        selected: e.selected
                    })
                }, a.handleDocumentClick = function(e) {
                    a.mounted && a.state.opened && !a.el.contains(e.target) && a.setState({
                        opened: !1
                    })
                }, a.state = {
                    selected: "undefined" != typeof n.value ? a.getOptionByValue(n.options, n.value) : {
                        label: n.placeholder || l,
                        value: ""
                    },
                    opened: !1
                }, a.mounted = !0, a
            }
            return a(t, e), t.prototype.componentWillReceiveProps = function(e) {
                "undefined" != typeof e.value && e.value !== this.state.selected ? this.setState({
                    selected: this.getOptionByValue(e.options, e.value)
                }) : "undefined" == typeof e.value && this.setState({
                    selected: {
                        label: e.placeholder || l,
                        value: ""
                    }
                })
            }, t.prototype.componentDidMount = function() {
                this.el = s.findDOMNode(this), document.addEventListener("click", this.handleDocumentClick, !1), document.addEventListener("touchend", this.handleDocumentClick, !1)
            }, t.prototype.componentWillUnmount = function() {
                this.mounted = !1, document.removeEventListener("click", this.handleDocumentClick, !1), document.removeEventListener("touchend", this.handleDocumentClick, !1)
            }, t.prototype.getOptionByValue = function(e, t) {
                return e.find(function(e) {
                    return "object" !== ("undefined" == typeof e ? "undefined" : u(e)) ? e === t : e.value === t
                })
            }, t.prototype.renderOption = function(e) {
                var t = this,
                    n = Object(c.classNames)("Select__option", {
                        "Select__option--selected": e === this.state.selected
                    }),
                    r = "undefined" != typeof e.value ? e.value : e.label || e,
                    i = "undefined" != typeof e.label ? e.label : e;
                return o.createElement("div", {
                    key: r,
                    className: n,
                    onMouseDown: function() {
                        return t.setValue(r, i)
                    },
                    onClick: function() {
                        return t.setValue(r, i)
                    }
                }, i)
            }, t.prototype.buildMenu = function() {
                var e = this,
                    t = this.props.options.map(function(t) {
                        return "group" === t.type ? o.createElement("div", {
                            className: "Select__group",
                            key: t.name
                        }, t.name && o.createElement("div", {
                            className: "Select__title"
                        }, t.name), t.items.map(function(t) {
                            return e.renderOption(t)
                        })) : e.renderOption(t)
                    });
                return t.length ? t : o.createElement("div", {
                    className: "Select__noresults"
                }, "No options found")
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.style,
                    r = Object(c.classNames)("Select", t, {
                        "Select--opened": this.state.opened,
                        "Select--disabled": this.props.disabled
                    });
                return o.createElement("div", {
                    className: r,
                    style: n
                }, o.createElement("div", {
                    className: "Select__control",
                    onClick: this.handleMouseDown
                }, o.createElement("div", {
                    className: "Select__placeholder"
                }, "string" == typeof this.state.selected ? this.state.selected : this.state.selected.label), o.createElement("span", {
                    className: "Select__arrow"
                })), this.state.opened && o.createElement("div", {
                    className: "Select__menu"
                }, this.buildMenu()))
            }, t
        }(o.Component);
    t["default"] = d
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
            visibility: "visible"
        }))
    }

    function a(e, t, n, r) {
        var i = e instanceof Array ? e : geByClass("_im_bar_date", e),
            a = t.contHeight();
        _["default"].onNewMessagesChunk();
        var o = i.reduce(function(e, t) {
                return e[domData(t, "date")] = [t.offsetTop + j, a, t], e
            }, {}),
            s = !n && r.barMap ? r.barMap : {};
        return r.barMap = extend(s, o), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
    }

    function o(e, t) {
        return t.barMapKeys.forEach(function(n) {
            t.barMap[n][0] -= e
        }), Promise.resolve(t)
    }

    function s(e, t, n, r, i) {
        var a = e.get().barMap[t],
            o = Object(g.isClassicInterface)(i) ? E : k;
        return n - (a[0] + n - a[1]) + r - o
    }

    function c(e, t) {
        var n = e.get().barMap[t][2];
        return {
            text: n.textContent,
            date: domData(n, "date")
        }
    }

    function u(e, t, n, r) {
        return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : 0 > n && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
    }

    function l(e, t) {
        return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
    }

    function d(e, t, n, r, i) {
        var a = e.get(),
            o = void 0,
            u = void 0,
            l = n - t;
        a.barMapKeys.forEach(function(t) {
            var a = s(e, t, n, r, i);
            if (a >= l) {
                var c = o ? s(e, o, n, r, i) : n;
                o = c > a ? t : o
            } else if (l > a) {
                var d = u ? s(e, u, n, r, i) : 0;
                u = a > d ? t : u
            }
        });
        var d = {};
        return [
            [u, "prev"],
            [o, "cur"]
        ].forEach(function(t) {
            var a = y(t, 2),
                o = a[0],
                u = a[1];
            o && (d[u + "Bar"] = c(e, o), d[u + "Left"] = s(e, o, n, r, i) - l)
        }), d
    }

    function f(e) {
        var t = geByClass1("_im_mess", e),
            n = domData(t, "ts");
        return t && n ? {
            text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
            date: n
        } : null
    }

    function p(e, t, n, a, o) {
        var s = e.get(),
            c = Object(h.isEverythingLoaded)(s),
            p = t.get(),
            m = o.scrollTop(),
            _ = p.lastTop ? p.lastTop - m : 0;
        p.lastTop = m;
        var v = Object(b.isPinnedMessageVisibleInTab)(s, s.peer) ? Object(g.getPinnedMessageHeight)() : 0,
            y = Object(h.isSearchingInplace)(s.peer, s) && s.tabs[s.peer] && s.tabs[s.peer].top_banner ? 50 : 0,
            C = (Object(g.isClassicInterface)(e) ? w + v + y : 0) - O / 2,
            k = o.contHeight(),
            E = d(t, m, k, C, e),
            j = E.prevBar,
            S = E.curBar,
            T = E.prevLeft,
            I = "translateY(0px)",
            L = !1,
            x = !1,
            P = !1;
        S || c || (S = f(a)), S ? L = S : x = !0, j && S && T > -O && 0 > T && (P = !0, x = !1, L = S, I = "translateY(" + (-O - T) + "px)"), L && i(n, L), P ? t.set(u.bind(null, n, j.date, _)) : t.set(l.bind(null, n)), I && setStyle(n, r({}, cssTransformProp, I)), toggleClass(n, "im-page--top-date-bar_no-b", x)
    }

    function m(e, t) {
        var n = geByClass1("_im_top_date_bar"),
            r = Object(v["default"])({
                lastTop: !1,
                barMap: {},
                barMapKeys: []
            }),
            i = null,
            s = null,
            c = null,
            u = debounce(function(e) {
                r.set(a.bind(null, t, e, !1))
            }, 500);
        return {
            reset: function(i) {
                r.set(a.bind(null, t, i, !0)).then(function() {
                    p(e, r, n, t, i)
                })
            },
            disable: function() {
                r.reset()
            },
            heightIncreased: function(e, t) {
                return u(t), r.set(o.bind(null, e))
            },
            parseMore: function(i, o) {
                r.set(a.bind(null, i, o, !1)).then(function() {
                    p(e, r, n, t, o)
                })
            },
            toggle: function(e) {
                e ? setStyle(n, {
                    display: ""
                }) : hide(n)
            },
            show: function() {
                s = Date.now(), c || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), c = setInterval(function() {
                    Date.now() - s > S && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(c), c = null)
                }, T))
            },
            update: function(a) {
                i && (clearTimeout(i), i = null), i = setTimeout(function() {
                    p(e, r, n, t, a)
                }, C), p(e, r, n, t, a)
            }
        }
    }
    n.r(t), n.d(t, "setCurrentDateBar", function() {
        return i
    }), n.d(t, "mount", function() {
        return m
    });
    var g = n(81),
        h = n(41),
        _ = n(59),
        v = n(188),
        b = n(201),
        y = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        w = 68,
        O = 32,
        C = 300,
        k = 20,
        E = 68,
        j = 10,
        S = 2e3,
        T = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e = e || ("undefined" != typeof document ? document : void 0), "undefined" == typeof e) return null;
        try {
            return e.activeElement || e.body
        } catch (t) {
            return e.body
        }
    }
    e.exports = r
}, function(e, t, n) {
    "use strict";
    n.r(t), Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var n = Object(e), r = 1; r < arguments.length; r++) {
                var i = arguments[r];
                if (void 0 !== i && null !== i)
                    for (var a = Object.keys(Object(i)), o = 0, s = a.length; s > o; o++) {
                        var c = a[o],
                            u = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== u && u.enumerable && (n[c] = i[c])
                    }
            }
            return n
        }
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.which || e.keyCode
    }

    function i(e, t) {
        var n = e.get().tabbedPeers[t];
        n && e.get().longpoll.push([Object(f.changePeer)(n.peer, !1, !0, !0)]);
    }

    function a(e, t, n) {
        !n || inArray(r(n), u.UNPRINTABLE_KEYS) || Object(l.isSearchingInplace)(e.get().peer, e.get()) || Object(d.isEditableFocused)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
    }

    function o(e, t, n) {
        r(n) === u.ENTER && e.signal(r(n), n)
    }

    function s(e, t, n, a) {
        var o = r(a);
        if (!layers.visible) {
            if (o >= 49 && 57 >= o && (a.ctrlKey || a.metaKey && browser.mac) && Object(d.isClassicInterface)(t)) return i(t, o - 49), cancelEvent(a);
            inArray(o, u.UP_DOWN_CONTROLS) && e.signal(o, a)
        }
    }

    function c(e, t) {
        var n = browser.mozilla ? "keydown" : "keypress",
            r = Object(p["default"])({
                signalTimer: !1
            }),
            i = a.bind(null, e, t),
            c = s.bind(null, t, e, r),
            u = o.bind(null, t, r),
            l = Object(m.createModule)({
                handlers: function(e, t) {
                    e(document, "keydown", c), e(document, "keyup", u), e(document, n, i)
                }
            });
        return {
            unmount: function() {
                Object(m.destroyModule)(l)
            }
        }
    }
    n.r(t), n.d(t, "mount", function() {
        return c
    });
    var u = n(30),
        l = n(41),
        d = n(81),
        f = n(132),
        p = n(188),
        m = n(110)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
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
    n.r(t);
    var o = n(83),
        s = (n(9), n(35)),
        c = n(133),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = function(e) {
            function t() {
                return r(this, t), i(this, e.apply(this, arguments))
            }
            return a(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.href,
                    n = e.hovered,
                    r = e.className,
                    i = e.children,
                    a = Object(c["default"])(this.props, ["hovered"]),
                    l = Object(s.classNames)("Link", {
                        "Link--hovered": !!n
                    }, r);
                return t ? o.createElement("a", u({}, a, {
                    className: l
                }), i) : o.createElement("span", u({}, a, {
                    className: l
                }), i)
            }, t
        }(o.Component);
    t["default"] = l, l.defaultProps = {
        href: void 0,
        hovered: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        return bodyNode[e] || document.documentElement[e]
    }

    function a(e, t, n) {
        "scrollTop" === e && window.scrollTo(0, t)
    }

    function o(e, t) {
        return t.noScroll ? new l(e) : t.nativeScroll ? new c(e, t) : new u(e, t)
    }
    n.r(t), n.d(t, "getNativeOption", function() {
        return i
    }), n.d(t, "setNativeOption", function() {
        return a
    }), n.d(t, "createScroll", function() {
        return o
    });
    var s = n(110),
        c = function() {
            function e(t, n) {
                var i = this;
                r(this, e), this.el = t, this.opts = n, this.module = Object(s.createModule)({
                    handlers: function(e, t) {
                        e(window, "scroll", i.onScroll.bind(i)), e(window, "resize", i.resize.bind(i))
                    }
                }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
            }
            return e.prototype.update = function() {}, e.prototype.resize = function() {
                this.innerHeight = window.innerHeight
            }, e.prototype.scrollTop = function(e) {
                return "undefined" == typeof e ? i("scrollTop", this.el) : void a("scrollTop", e, this.el)
            }, e.prototype.contHeight = function() {
                return i("scrollHeight")
            }, e.prototype.smoothScroll = function(e) {
                scrollToY(e + this.scrollTop(), 300)
            }, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollBottom = function(e) {
                if ("undefined" == typeof e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }, e.prototype.scrollBottomFixSave = function(e) {
                this.scrollBottom(e)
            }, e.prototype.onScroll = function(e) {
                var t = this.scrollTop(),
                    n = t - this.prevScroll,
                    r = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }, e.prototype.getScrollHeight = function() {
                return this.innerHeight
            }, e.prototype.destroy = function() {
                Object(s.destroyModule)(this.module)
            }, e
        }(),
        u = function() {
            function e(t, n) {
                var i = this;
                r(this, e), this.prevTop = 0, this.scroll = new uiScroll(t, {
                    hidden: !0,
                    shadows: n.shadows,
                    stopScrollPropagation: !1,
                    theme: n.scrollTheme,
                    onmore: function() {
                        return n.more && n.more(i)
                    },
                    onscroll: function(e) {
                        var t = i.scrollTop(),
                            r = i.prevTop - t;
                        i.prevTop = t, n.scrollChange && n.scrollChange(t), n.onScroll && n.onScroll(r, i)
                    }
                })
            }
            return e.prototype.update = function() {
                this.scroll.update("sync")
            }, e.prototype.scrollTop = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
            }, e.prototype.getContainer = function() {
                return this.scroll.content
            }, e.prototype.contHeight = function() {
                return this.scroll.data.scrollHeight
            }, e.prototype.smoothScroll = function(e) {
                this.scroll.scrollTop(this.scrollTop() + e, 300)
            }, e.prototype.scrollBottom = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
            }, e.prototype.scrollBottomFixSave = function(e) {
                var t = this,
                    n = function() {
                        Date.now() - r < 500 && t.scroll && t.scrollBottom(e)
                    },
                    r = Date.now();
                this.scroll.emitter.addOnceListener("resize", n), this.scrollBottom(e)
            }, e.prototype.getScrollHeight = function() {
                return this.scroll.data.viewportHeight
            }, e.prototype.destroy = function() {
                this.scroll.destroy()
            }, e
        }(),
        l = function() {
            function e(t, n) {
                r(this, e), this.el = t
            }
            return e.prototype.update = function() {}, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollTop = function(e) {
                return 0
            }, e.prototype.contHeight = function() {
                return 0
            }, e.prototype.smoothScroll = function(e) {}, e.prototype.scrollBottom = function(e) {
                return 0
            }, e.prototype.scrollBottomFixSave = function(e) {}, e.prototype.getScrollHeight = function() {
                return 0
            }, e.prototype.destroy = function() {}, e
        }()
}, function(e, t, n) {
    e.exports = !n(87)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return i(e) && 3 == e.nodeType
    }
    var i = n(69);
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = ge("page_header"),
            n = window.clientHeight() - t.offsetHeight - b - 2,
            r = y;
        p(e, {
            height: Math.max(n, r)
        })
    }

    function i() {
        var e = localStorage.getItem("im_sick_timer"),
            t = e ? Math.min(2 * parseInt(e), v) : _;
        return localStorage.setItem("im_sick_timer", t), t
    }

    function a(e) {
        var t = Object(l.formatTimespan)(Math.floor(Math.max(e, 0) / 1e3), !0);
        return t ? m("mail_sick_timer").replace(/{timer}/gi, t) : ""
    }

    function o() {
        f.reload({
            force: !0
        })
    }

    function s(e) {
        return {
            unmount: function() {
                clearInterval(O), clearTimeout(w), Object(u.destroyModule)(e)
            }
        }
    }

    function c(e, t, n) {
        r(e);
        var c = Object(u.createMutations)(s),
            l = c.bindMutations,
            d = Object(u.createModule)({
                handlers: function(t, n) {
                    t(e.querySelector(g), "click", o), t(window, "resize", r.bind(null, e))
                }
            }),
            f = l(d),
            p = i(),
            m = e.querySelector(h),
            _ = +new Date;
        return m.innerHTML = a(p), O = setInterval(function() {
            m.innerHTML = a(_ + p - new Date)
        }, 500), w = setTimeout(o, p), f
    }
    n.r(t), n.d(t, "mount", function() {
        return c
    });
    var u = n(110),
        l = n(81),
        d = window,
        f = d.nav,
        p = d.setStyle,
        m = d.getLang,
        g = "._im_sick_reload",
        h = "._im_sick_timer",
        _ = 5e3,
        v = 6e5,
        b = 30,
        y = 400,
        w = void 0,
        O = void 0
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = u.VIDEO_UPLOAD_EXTS.slice(0, u.VIDEO_UPLOAD_EXTS.length);
        if ("types" === e) {
            for (var n = t.length, r = 0; n > r; ++r) t.push(t[r].toUpperCase());
            return "*." + t.join(";*.")
        }
        return "accept" === e ? "." + u.VIDEO_UPLOAD_EXTS.join(",.") : ""
    }

    function i(e, t, n, i) {
        i = i || {}, cur.maxFiles = (cur.chooseParams || {}).maxFiles || 10;
        var a = cur.maxFiles - (cur.savedVideos || []).length,
            o = browser.safari ? "" : "video/*," + r("accept"),
            s = {
                accept: o,
                file_input: null,
                file_name: "video_file",
                file_size_limit: 1024 * (n.options.file_size_limit_in_GB || u.VIDEO_UPLOAD_MAX_FILE_SIZE_IN_GB) * 1024 * 1024,
                file_types_description: "Video files",
                file_types: r("types"),
                chooseBox: 1,
                chunked: 1,
                chunkSize: u.VIDEO_UPLOAD_CHUNK_SIZE,
                clear: 1,
                dragEl: t === boxLayerWrap ? boxLayerWrap : bodyNode,
                dropbox: t,
                lang: n.lang,
                max_attempts: 3,
                max_files: a,
                multiple: 1,
                multi_progress: 1,
                requestOptionsForFile: !0,
                type: "video",
                visibleDropbox: n.options.hasOwnProperty("visible_dropbox") ? n.options.visible_dropbox : !0
            };
        return Upload.init(e, "", {}, Object.assign(s, i))
    }

    function a(e, t, n, r) {
        n = n || cur;
        var i = void 0 !== e.ind ? e.ind : e,
            a = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
            s = a ? i + "_" + a : e,
            c = cur.gid ? -cur.gid : vk.id,
            u = c + "_" + t.video_id,
            l = ge("upload" + s + "_progress_wrap");
        l && hide(geByClass1("progress_x", l)), ajax.post("al_video.php", {
            act: "a_video_photo_sizes",
            oid: c,
            vid: t.video_id
        }, {
            onDone: function(e) {
                n.chooseMedia("video", u, extend(e, {
                    upload_ind: s
                })), setTimeout(function() {
                    var e = function(e) {
                        n.hasChosenMedia("video", u) ? n.updateChosenMedia("video", u, extend(e, {
                            upload_ind: s
                        })) : r && r(e, u)
                    };
                    o(c, t.video_id, t.video_hash, e)
                })
            }
        })
    }

    function o(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
            i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
        ajax.post("al_video.php", {
            act: "encode_progress",
            oid: e,
            vid: t,
            hash: n,
            need_thumb: a
        }, {
            onDone: function(c) {
                if (c) {
                    if (c.error) return void s(getLang("video_upload_encode_error"));
                    a && c.thumb && (a = 0, ajax.post("al_video.php", {
                        act: "a_video_photo_sizes",
                        oid: e,
                        vid: t
                    }, {
                        onDone: function(e) {
                            r && r(e)
                        }
                    }))
                }
                a && setTimeout(o.pbind(e, t, n, r, i, a), 1e3)
            },
            onFail: function() {
                i || (i = 1), setTimeout(o.pbind(e, t, n, r, i + 1, a), 2e3 * i)
            }
        })
    }

    function s(e) {
        setTimeout(showFastBox({
            title: getLang("global_error")
        }, e).hide, 2e3)
    }

    function c(e) {
        var t = void 0 !== e.ind ? e.ind : e,
            n = e.fileName ? t + "_" + e.fileName : e;
        re("upload" + n + "_progress_wrap");
        var r = geByClass1("popup_box_container");
        if (!r) {
            var i = getLang("video_upload_error");
            setTimeout(showFastBox({
                title: getLang("global_error")
            }, i).hide, 2e3)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + t) || {}).action
        }), Upload.embed(t)
    }
    n.r(t), n.d(t, "getUploadModule", function() {
        return i
    }), n.d(t, "onVideoUploaded", function() {
        return a
    });
    var u = n(91);
    t["default"] = {
        getUploadModule: function(e, t, n, r) {
            return i(e, t, n, r)
        },
        initModalVideoUploader: function() {
            var e = this,
                t = cur.videoUploadOptions,
                n = ge("choose_video_upload"),
                r = {
                    onUploadStart: function(e, t) {
                        boxQueue.hideLast(), r.onUploadProgress(e, 0, 0)
                    },
                    onUploadComplete: function(e, n) {
                        var r = window.parseJSON(n);
                        if (r.video_id) statlogsValueEvent("upload_video_fails", 1, t.options.server, "success"), a(e, r);
                        else {
                            var i = "string" == typeof n && n.indexOf("TERMINATED") > -1;
                            i || Upload.onUploadError(e)
                        }
                    },
                    onUploadProgress: function(t, n, r) {
                        var i = void 0 !== t.ind ? t.ind : t;
                        show("_im_media_preview"), cur.showMediaProgress("video", i, e.parseOnUploadProgress(t, n, r))
                    },
                    onUploadError: function(e, n) {
                        statlogsValueEvent("upload_video_fails", 1, t.options.server, n), c(e)
                    },
                    onNoFilteredCallback: function(e) {},
                    onDragOut: function() {},
                    onDrop: function() {}
                };
            return this.initDragEvents(), i(n, boxLayerWrap, t, r)
        },
        initDragEvents: function() {
            var e = function(e) {
                    cur.dragTimeout && (clearTimeout(cur.dragTimeout), delete cur.dragTimeout);
                    var t = ge("video_choose_upload_area_wrap");
                    if (!hasClass(t, "video_choose_upload_area_enter")) {
                        addClass(t, "video_choose_upload_area_enter");
                        var n = ge("video_choose_wrap"),
                            r = getXY(n)[1],
                            i = getSize(t)[1];
                        return hide("video_choose_wrap"), setStyle(t, "height", scrollGetY() + window.clientHeight() - r + i), cancelEvent(e)
                    }
                },
                t = function(e) {
                    return cur.dragTimeout && (clearTimeout(cur.dragTimeout), delete cur.dragTimeout), cur.dragTimeout = setTimeout(function() {
                        var e = ge("video_choose_upload_area_wrap");
                        removeClass(e, "video_choose_upload_area_enter"), setStyle(e, "height", null), show("video_choose_wrap")
                    }, 100), cancelEvent(e)
                },
                n = function(e) {
                    t();
                    var n = e.dataTransfer.files;
                    return n.length && Upload.checkFilesSizes(window.videoInlineUploader, e.dataTransfer.files) ? (window.Upload && Upload.checked && Upload.checked[window.videoInlineUploader] && Upload.onFileApiSend(window.videoInlineUploader, e.dataTransfer.files), cancelEvent(e)) : void 0
                },
                r = function() {
                    addEvent(boxLayerWrap, "dragenter dragover", e), addEvent(boxLayerWrap, "dragleave", t), addEvent(boxLayerWrap, "drop", n)
                };
            r(), setTimeout(curBox().setOptions.pbind({
                onHide: function() {
                    removeEvent(boxLayerWrap, "dragenter dragover", e), removeEvent(boxLayerWrap, "dragleave", t), removeEvent(boxLayerWrap, "drop", n)
                },
                onShow: function() {
                    r()
                }
            }), 0)
        },
        parseOnUploadProgress: function(e, t, n) {
            return {
                loaded: t,
                total: n,
                fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
            }
        }
    }
}, function(e, t, n) {
    n(169), n(114), n(172), n(17), e.exports = n(104).Map
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t ? void ls.set(e, t) : ls.get(e)
    }

    function i(e) {
        try {
            var t = {};
            return Error.captureStackTrace(t, e), t.stack
        } catch (n) {
            return ""
        }
    }
    n.r(t);
    var a = n(56);
    t["default"] = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = debounce(r, 300),
            o = extend({}, e),
            s = [],
            c = [];
        return t.store && (o = ls.get(t.key) || o), {
            get: function() {
                return o
            },
            set: function(e) {
                var r = this,
                    s = Object(a.isWeirdLogging)() ? i(this.set) : null;
                return e(o).then(function(e) {
                    return o = e, t.store && n(t.key, e), r.emit(), r
                })["catch"](function(e) {
                    return Object(a.imWeirdCatch)("store_set_catch", e, {
                        stack: s
                    })
                })
            },
            setState: function(e) {
                var t = this;
                return this.set(function(n) {
                    return n = extend(n, e), t.emit(), Promise.resolve(n)
                })
            },
            stash: function() {
                s.push(o), o = extend({}, e), this.emit()
            },
            reset: function() {
                o = extend({}, e), this.emit()
            },
            unmount: function() {
                o = {}, e = !1, c = []
            },
            pop: function() {
                s.length > 0 && (o = s.pop(), this.emit())
            },
            emit: function() {
                var e = this;
                c.length > 0 && c.forEach(function(t) {
                    return t(e)
                })
            },
            subscribe: function(e) {
                -1 === c.indexOf(e) && c.push(e)
            },
            unsubscribe: function(e) {
                c = c.filter(function(t) {
                    return t !== e
                })
            },
            mutate: function(e) {
                e(o), t.store && n(t.key, o), this.emit()
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(105),
        i = {
            listen: function(e, t, n) {
                return e.addEventListener ? (e.addEventListener(t, n, !1), {
                    remove: function() {
                        e.removeEventListener(t, n, !1)
                    }
                }) : e.attachEvent ? (e.attachEvent("on" + t, n), {
                    remove: function() {
                        e.detachEvent("on" + t, n)
                    }
                }) : void 0
            },
            capture: function(e, t, n) {
                return e.addEventListener ? (e.addEventListener(t, n, !0), {
                    remove: function() {
                        e.removeEventListener(t, n, !0)
                    }
                }) : {
                    remove: r
                }
            },
            registerDefault: function() {}
        };
    e.exports = i
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = Math.floor(t.status / 100);
        t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), x[n] = x[n] ? x[n] + 1 : 1, Date.now() - P >= L && (Object.keys(x).forEach(function(e) {
            statlogsValueEvent("im_longpoll", x[e], e + "0x", t.getResponseHeader("x-frontend"))
        }), x = {}, P = Date.now()))
    }

    function i(e) {
        var t = e.updates;
        return t.map(function(e) {
            switch (e[0]) {
                case 0:
                    return b.deleteEvent(e);
                case 1:
                    return b.replaceFlagsEvent(e);
                case 2:
                    return b.setFlagsEvent(e);
                case 3:
                    return b.resetFlagsEvent(e);
                case 4:
                    return b.addMessageEvent(e);
                case 5:
                    return b.editMessageEvent(e);
                case 6:
                    return b.readInboundEvent(e);
                case 7:
                    return b.readOutboundEvent(e);
                case 8:
                    return b.gotOnlineEvent(e);
                case 9:
                    return b.gotOfflineEvent(e);
                case 10:
                    return b.resetDirectoriesEvent(e);
                case 11:
                    return b.replaceDirectoriesEvent(e);
                case 12:
                    return b.setDirectoriesEvent(e);
                case 13:
                    return b.deleteDialogEvent(e);
                case 51:
                    return b.chatChangedEvent(e);
                case 52:
                    return b.chatUpdatedEvent(e);
                case 63:
                    return b.typingEvent(e);
                case 70:
                    return b.videoCallEvent(e);
                case 80:
                    return b.unreadCountEvent(e);
                case 114:
                    return b.notifySettingsChangedEvent(e);
                case 116:
                    return b.refreshMessageEvent(e);
                case -1:
                    return b.resyncEvent();
                default:
                    return b.emptyEvent(e)
            }
        })
    }

    function a(e, t) {
        return Promise.resolve(extend({}, t, {
            timeout: 64 > e ? 2 * e : e
        }))
    }

    function o(e, t) {
        return Promise.resolve(extend({}, t, {
            imTs: e
        }))
    }

    function s(e) {
        e.set(function(e) {
            return Promise.resolve(extend({}, e, {
                stopped: !0
            }))
        }).then(function() {
            e.get().cancelToken()
        })
    }

    function c(e, t) {
        return t.cancelToken = e, Promise.resolve(t)
    }

    function u(e, t) {
        return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
    }

    function l(e) {
        return e.pauses || (e.pauses = []), Object(O.lplog)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
            return e()
        }), e.pauses = [], Promise.resolve(e)
    }

    function d(e, t, n, r) {
        var i = r.failed ? Object(y.abortablePause)(T, e) : {},
            a = i.abort,
            s = i.pause;
        switch (r.failed) {
            case 1:
                return Object(O.lplog)("Old timestamp, init resync", "error"), e.set(u.bind(null, a)), n([b.resyncEvent()]), e.set(h.loadLongPollTs).then(s).then(f.bind(null, e, t, n));
            case 2:
                return Object(O.lplog)("Key is incorrect", "error"), e.set(u.bind(null, a)), e.set(h.loadLongPollKey).then(s).then(f.bind(null, e, t, n));
            case 3:
                throw nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return e.set(o.bind(null, r.ts)).then(function() {
                    return r
                })
        }
    }

    function f(e, t, n) {
        if (e.get().stopped) return Promise.resolve({
            updates: []
        });
        if (t()) return Promise.reject(new Error("pause"));
        var i = e.get(),
            o = i.imUrl + "/" + i.imPart,
            s = Object(v.plaingetCancelable)(o, {
                act: "a_check",
                key: i.imKey,
                version: I,
                ts: i.imTs,
                wait: 25,
                mode: i.mode
            }),
            u = s.request,
            l = s.cancel;
        return e.set(c.bind(null, l)).then(function() {
            return u
        }).then(function(t) {
            var n = j(t, 2),
                o = n[0],
                s = n[1];
            return s && r(i, s), e.set(a.bind(null, 1)), JSON.parse(o)
        })["catch"](function(e) {
            var t = j(e, 2),
                n = t[0],
                a = t[1];
            throw a && r(i, a), n
        }).then(d.bind(null, e, t, n))
    }

    function p(e, t, n) {
        e.get().stopped || (Object(O.lplog)("New request"), f(e, n, t).then(i).then(function(e) {
            return Object(O.lplog)("Request success", "success"), e
        }).then(t)["catch"](function(t) {
            return e.get().stopped ? void Object(O.lplog)("Stopped longpoll") : ("pause" !== t.message && topError(t), Object(O.lplog)("Error, waiting: " + (t.message || "no message (probably browser reset)"), "error"), e.set(a.bind(null, n() ? T / 2 : e.get().timeout)).then(function() {
                var t = Object(y.abortablePause)(e.get().timeout, e),
                    n = t.abort,
                    r = t.pause;
                return e.set(u.bind(null, n)).then(r)
            }))
        }).then(p.bind(null, e, t, n)))
    }

    function m(e) {
        Object(E.imWeirdLog)("im_start_longpoll_group", {}, !1);
        var t = Object(k.createLongpollEventsQueue)(e.ts, function(e) {
                r.trigger("data", e)
            }),
            n = Object(C.createLongPoll)(e, t.onLp),
            r = new window.EventEmitter;
        return {
            onData: function(e) {
                return r.on("data", e)
            },
            offData: function(e) {
                return r.off("data", e)
            },
            push: function(e) {
                return r.trigger("data", e)
            },
            pause: t.pause.bind(t),
            resume: t.resume.bind(t),
            abortWaiting: n.abortWaiting.bind(n),
            onLp: t.onLp.bind(t),
            stop: n.stopConnection.bind(n)
        }
    }

    function g(e) {
        var t = e.id,
            n = e.gid,
            r = e.key,
            i = e.ts,
            a = e.url,
            o = e.lhost,
            c = e.lpstat,
            u = "main",
            d = new EventEmitter,
            f = Object(w.initQueue)(function(e, t) {
                return window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents && window.longpollTesting_onImEvents(t), d.trigger("data", t), Promise.resolve({})
            }),
            m = f.pause,
            g = f.resume,
            h = f.pushMessage,
            v = f.isPaused,
            b = f.reset,
            y = Object(_["default"])({
                id: t,
                gid: n,
                mode: S,
                timeout: 1,
                imKey: r,
                imTs: i,
                imPart: a,
                imUrl: o,
                pause: !1,
                stat: c
            });
        return p(y, h.bind(null, u), v.bind(null, u)), {
            onData: function(e) {
                return d.on("data", e)
            },
            offData: function(e) {
                return d.off("data", e)
            },
            abortWaiting: function() {
                return y.set(l)
            },
            stop: s.bind(null, y),
            pause: m.bind(null, u),
            resume: g.bind(null, u),
            reset: b.bind(null, u),
            push: function(e) {
                return d.trigger("data", e)
            }
        }
    }
    n.r(t), n.d(t, "startLongPollForGroup", function() {
        return m
    }), n.d(t, "startLongPoll", function() {
        return g
    });
    var h = n(41),
        _ = n(188),
        v = n(64),
        b = n(132),
        y = n(27),
        w = n(50),
        O = n(145),
        C = n(168),
        k = n(146),
        E = n(56),
        j = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (c) {
                    i = !0, a = c
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        S = 202,
        T = 4,
        I = 5,
        L = 3e4,
        x = {},
        P = Date.now()
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e ? void(window.tooltips && tooltips.hide(e, t)) : !1
    }

    function i(e) {
        return e.map(function(e) {
            return {
                id: e[1],
                type: e[0],
                kind: e[2] || null
            }
        })
    }

    function a(e, t, n, r, a, o) {
        var s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !0;
        if (T(t, r)) return Promise.resolve(!1);
        d(r).getBoundAttach(n.message) && (n.message = ""), n.share_url = d(r).getShareUrl();
        var c = Object(W.random)(),
            u = {
                peerId: t,
                messageId: "rid" + c,
                flags: B.FLAG_OUTBOUND,
                date: intval(Date.now() / 1e3) - r.get().timeshift,
                subject: "",
                text: Object(z.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                local: !0,
                kludges: {
                    emoji: !0,
                    from_admin: r.get().gid ? vk.id : null
                },
                type: B.ADD_MESSAGE,
                attaches: i(n.attaches)
            };
        return n.rid = c, n.mess = u, e(t, n), r.get().longpoll.push([u]), s && o().clearText(t, r), a().newMessage(r), Promise.resolve(!0)
    }

    function o(e, t, n, r, i, o, c) {
        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !1;
        u || (u = e.get().peer);
        var d = {
            message: "",
            attaches: o
        };
        c && extend(d, c), s(e, t, !1).then(function(i) {
            return a(n, u, d, e, t, r, !1)
        })["catch"](function(t) {
            debugLog(t), l(e, i)
        })
    }

    function s(e, t, n) {
        var r = e.get().tabs[e.get().peer];
        return r.skipped > 0 ? (t().loadingPeer(e), e.setState({
            no_moving_down: !0
        }), e.set(U.changePeer.bind(null, e.get().peer, !1, !1)).then(function() {
            return e.set(U.loadPeer.bind(null, e.get().peer, !0, -1, !1))
        }).then(function() {
            return t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n
        })) : Promise.resolve(n)
    }

    function c(e, t, n) {
        var r = !!intval(domData(n, "val"));
        r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(U.changeSubmitSettings.bind(null, r)))
    }

    function u(e, t, n) {
        return e.get().delayed_ts ? !1 : setTimeout(function() {
            e.set(U.setDelayedMessage.bind(null, !1, !1)).then(function() {
                f.apply(void 0, n)
            })
        }, t)
    }

    function l(e, t) {
        document.activeElement && document.activeElement.blur(), showFastBox({
            title: getLang("global_error")
        }, getLang("mail_send_error"), getLang("mail_ok"), function() {
            nav.reload({
                force: !0
            })
        });
        var n = geByClass1("_im_send", t);
        return e.set(U.toggleSendingAbility.bind(null, !0)).then(function() {
            Object(z.lockButton)(n)
        })
    }

    function d(e) {
        var t = e.get().tfdraft;
        return t || new $.ImDraft
    }

    function f(e, t, n, r, i, o) {
        var c = arguments,
            f = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
        return Promise.resolve().then(function() {
            var o = geByClass1("_im_send", r);
            if (!Object(G.isSendingAvailable)(e)) return !1;
            if (Object(U.isAnythingLoading)(e.get()) || !Object(z.isFullyLoadedTab)(e, e.get().peer)) {
                var l = u(e, de, Object(q.toArray)(c));
                return e.set(U.setDelayedMessage.bind(null, !0, l)).then(function() {
                    Object(z.lockButton)(o)
                })
            }
            clearTimeout(e.get().delayed_ts), i().saveText(e);
            var m = e.set(U.setDelayedMessage.bind(null, !1, !1)).then(function() {
                    Object(z.unlockButton)(o)
                }),
                g = Object(G.getPeer)(e);
            return m.then(s.bind(null, e, t)).then(function() {
                var o = d(e),
                    s = o.dData.attaches.map(function(e) {
                        return [e.type, e.id]
                    }).concat(f),
                    c = o.dData.txt,
                    u = t().getEditingMessage();
                if (u || c || s.length) {
                    if (u) return c || s.length ? Object(z.isMessageTooLong)(c) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void(Object(Y.wasMessageReallyModified)(e, u, o) && (Object(Y.replaceMsgAfterEdit)(e, u, c, s, o.getShareUrl()), t().sendEditMessage(e, u), e.get().longpoll.push([Object(B.editMessageLocallyEvent)(u)])))) : void p(e, t, r, u.messageId);
                    var l = Object(z.splitMessageToParts)(c, s),
                        m = l.map(function(r) {
                            return a(n, g, {
                                message: r.msgText || "",
                                attaches: r.attaches || []
                            }, e, t, i)
                        });
                    return Promise.all(m)
                }
            })
        })["catch"](function(t) {
            debugLog(t), l(e, r)
        })
    }

    function p(e, t, n, r) {
        var i = e.get(),
            a = i.peer,
            o = showFastBox({
                title: getLang("mail_dialog_msg_delete_title"),
                dark: 1
            }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(e) {
                Object(U.removeMessageSend)([r], a, null, "deleteforall", i), o.hide(), t().cancelEditing()
            }, getLang("global_cancel"), function() {
                o.hide(), y(geByClass1("_im_text", n))
            })
    }

    function m(e, t, n) {
        return e.set(U.deliverMessage.bind(null, t, n))
    }

    function g(e, t, n, r) {
        e.get().longpoll.push([B.failedMessage(t, n.mess, r)])
    }

    function h(e, t, n, r, i, a, o) {
        function s(n, r) {
            var i = e.get().peer,
                a = Emoji.val(r);
            Object(z.isReservedPeer)(i) || T(i, e) || d(e).dData.txt == a || !a || L(e), N(e, t, a), u(r);
            var s = t.offsetHeight;
            if (c && c !== s) {
                var l = o().updateScroll();
                o().scrollFix(e, e.get().peer, l)
            }
            c = s
        }
        var c = void 0,
            u = debounce(I.bind(null, e, n), 500),
            l = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: function() {
                    return r([])
                },
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: s,
                onStickerSend: function(e, t, n) {
                    return i([
                        ["sticker", e, n]
                    ], {
                        sticker_referrer: t
                    })
                },
                uploadActions: a
            });
        return Emoji.emojiLoadMore(l), e.setState({
            emojiOptId: l
        }), l
    }

    function _(e, t) {
        var n = geByClass1("_im_text", e);
        Wall.initComposer(n, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            toup: !0,
            getValue: function() {
                return t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(n) : ""
            },
            onShow: function() {
                addClass(e, "im_mention_shown");
                var t = data(n, "composer");
                if (t && t.wdd && t.wdd.shown) {
                    var r = 0,
                        i = !1,
                        a = function() {
                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                        };
                    each(t.wdd.shown, function() {
                        this[0] && (r++, "@" + t.curTerm == this[2] && (i = !0))
                    }), !r || i && 1 == r ? a() : cancelStackPush("im_mention", a)
                }
            },
            onHide: function() {
                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
            },
            searchKeys: [1, 7],
            wddOpts: {}
        })
    }

    function v(e, t, n, r, i, a, o, s, c) {
        if (!t.get().removingMedias) {
            if ("album" === i || "page" === i || "mail" === i) return !1;
            if ("share" === i && !o.title) return !1;
            show(be), a && "string" == typeof i ? (s && d(t).addBindUrl(s, i, a), d(t).addAttach(i, a, o)) : d(t).syncWithSelector(c);
            var u = e().updateScroll();
            return e().scrollFix(t, t.get().peer, u), t.get().delayed_message && !Object(U.isAnythingLoading)(t.get()) ? (n([]), !1) : void N(t, r)
        }
    }

    function b(e, t, n) {
        var r = Emoji.val(geByClass1("_im_text", t));
        Object(G.isAnyMessageBeingEdited)(e) && "" !== r || A(e, t).then(function(t) {
            var i = intval(domData(n.target, "tttype"));
            if ((2 === i && t !== !0 || 1 === i && t === !0 || 3 !== i && "" === r) && window.tooltips && tooltips.destroy(n.target, {
                    fasthide: !0
                }), Object(G.isAnyMessageBeingEdited)(e) && "" === r) return domData(n.target, "tttype", 3), showTooltip(n.target, {
                text: getLang("mail_delete_for_all"),
                black: !0,
                force: 3 !== i,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            if (t !== !0) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                text: getLang("mail_added_audiomsg"),
                black: !0,
                force: 1 !== i,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            domData(n.target, "tttype", 2);
            var a = e.get().ctrl_submit ? 1 : 0;
            return showTooltip(n.target, {
                text: getTemplate("ctrl_submit_hint", {
                    enter_on: a ? "" : "on",
                    ctrl_on: a ? "on" : ""
                }),
                dir: "down",
                shift: [-28, -5],
                needLeft: !0,
                className: "im-chat-input--tt",
                hasover: !0,
                force: 2 !== i,
                showdt: 700,
                zIndex: 200,
                hidedt: 700,
                appendParentCls: "_im_chat_input_parent",
                onCreate: function() {
                    radioBtns.im_submit = {
                        els: Object(q.toArray)(geByClass(ve)),
                        val: a
                    }
                }
            })
        })
    }

    function y(e) {
        Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
    }

    function w(e, t) {
        Emoji.val(e, clean(t)), y(e)
    }

    function O(e, t, n) {
        var r = e.getFwdRaw(),
            i = geByClass1(pe, t);
        if (r)
            if (r.object && r.object.authorName) {
                var a = r.object,
                    o = Object(z.renderShortText)(0, "", a.text, !0, Object($.convertKludgesToAttaches)(a.kludges, 0));
                i.innerHTML = getTemplate("im_attach_mess", {
                    messages: o,
                    text: a.authorName,
                    date: getSmDate(a.date, n.get().timeshift),
                    modifier: "im-fwd_msg"
                })
            } else i.innerHTML = getTemplate("im_attach_mess", {
                messages: getLang("mail_title_X_msgs", e.getFwdCount()),
                text: getLang("mail_im_fwd_msgs_title"),
                date: "",
                modifier: ""
            });
        else i.innerHTML = ""
    }

    function C(e, t, n) {
        e.set(U.forwardMessages.bind(null, null, d(e))).then(function() {
            var r = geByClass1(pe, t);
            if (r && r.children.length) {
                r.innerHTML = "";
                var i = n().updateScroll();
                n().scrollFix(e, e.get().peer, i)
            }
            N(e, t)
        })
    }

    function k(e, t, n, r) {
        var i = e.get().peer,
            a = inArray(i, e.get().mutedPeers);
        e.set(U.toggleMutePeer.bind(null, i, !a)).then(n().updateState.bind(null, i)), cancelEvent(r)
    }

    function E(e, t, n, r) {
        var i = e.get().peer;
        e.set(U.returnToChat.bind(null, i)).then(function(e) {
            return e.set(U.getPinnedMessage.bind(null, i))
        }).then(n().updateChatTopic.bind(null, i)), cancelEvent(r)
    }

    function j(e, t, n, r, i, a, o, s, c, u) {
        return {
            restoreDraft: function(e, i) {
                t.chosenMedias.length > 0 && (e.setState({
                    removingMedias: !0
                }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                    removingMedias: !1
                }));
                var o = e.get().peer,
                    s = Object(z.isUserPeer)(o) && o != vk.id && !e.get().gid,
                    c = Object(z.isUserPeer)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) || Object(z.isCommunityPeer)(o) && e.get().moneyTransferCommAvail && Object(G.getCurrentTab)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || Object(z.isChatPeer)(o) && Object(G.getCurrentTab)(e).moneyRequestAvail;
                if (toggle(geByClass1("ms_item_gift", r), s && !Object(G.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_money", r), c && !Object(G.isAnyMessageBeingEdited)(e)), Object(z.isReservedPeer)(o)) return Promise.resolve();
                var u = d(e);
                return Emoji.val(n) !== u.dData.txt ? w(n, u.dData.txt) : y(n), u.prepareObjects(e.get().gid, i && i.messageId).then(function() {
                    var i = M(e, o, n);
                    if (!i && o == e.get().peer) {
                        for (var s = u.dData.attaches, c = 0; c < s.length; c++) t.chooseMedia(s[c].type, s[c].id, s[c].object || {});
                        O(u, r, e);
                        var l = a().updateScroll();
                        a().scrollFix(e, o, l), N(e, r, u.dData.txt)
                    }
                })
            },
            sendMessage: function() {
                i([])
            },
            choose: function(e, n, r) {
                t.chooseMedia(e, n, r)
            },
            updateChosenMedia: function(e, n, r) {
                t.updateChosenMedia(e, n, r)
            },
            canAddMedia: function() {
                return !t.hasRestrictingAttach() && !T(e.get().peer, e)
            },
            isEmpty: function(e) {
                return !trim(Emoji.val(n)) && !d(e).hasAttaches()
            },
            unchoose: function(e) {
                t.unchooseMedia(e)
            },
            attachCount: function() {
                return t.attachCount()
            },
            progress: function(e, n, r) {
                show(be), t.showMediaProgress(e, n, r)
            },
            updateState: function(e) {
                M(e, e.get().peer, n)
            },
            focusOn: function(e) {
                Emoji.editableFocus(n, !1, !0)
            },
            setDraft: function(e, t) {
                e.setState({
                    tfdraft: t
                }), t && this.restoreDraft(e, a().getEditingMessage())
            },
            clearText: function(e, i) {
                d(i).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), C(i, r, a);
                var o = a().updateScroll();
                a().scrollFix(i, i.get().peer, o)
            },
            attachMessages: function(e, t) {
                if (e.get().peer === t) {
                    O(d(e), r, e);
                    var n = a().updateScroll();
                    a().scrollFix(e, t, n), N(e, r)
                }
            },
            cancelRecording: function() {
                u.cancelRecording()
            },
            reHeight: function(e) {
                var t = a().updateScroll();
                a().scrollFix(e, e.get().peer, t)
            },
            isBlocked: function() {
                return T(e.get().peer, e)
            },
            toggleStickers: function(e, t) {
                Emoji.toggleStickers(e.get().emojiOptId, !t)
            },
            saveText: function(e) {
                d(e).setText(Emoji.val(geByClass1("_im_text", r)))
            },
            unmount: function() {
                Object(K.destroyModule)(c), t.destroy(), s.unmount(), Emoji.destroy(e.get().emojiOptId), u.unmount()
            }
        }
    }

    function S(e, t) {
        return Object(z.isChatPeer)(e) ? t.get().tabs[e].data.kicked : !1
    }

    function T(e, t) {
        return S(e, t) || Object(G.getTab)(t, e) && Object(G.getTab)(t, e).block_error > 0 || Object(z.isLocksAvailable)(t) && Object(z.isPeerBlocked)(e, t)
    }

    function I(e, t, n) {
        var r = e.get().peer,
            i = Emoji.val(n);
        Object(z.isReservedPeer)(r) || d(e).dData.txt == i || T(r, e) || (t.checkMessageURLs(i, !0, de), d(e).setText(i))
    }

    function L(e) {
        var t = e.get().peer;
        Object(z.isFullyLoadedTab)(e, t) && !Object(G.isAnyMessageBeingEdited)(e) && Date.now() - (Object(G.getTab)(e, t).lastTyping || 0) > 1e3 * U.TYPING_PERIOD && e.set(U.sendTyping.bind(null, t))
    }

    function x(e) {
        var t = d(e).getFwdRaw();
        t && window.showForwardBox({
            act: "a_show_forward_box",
            will_fwd: t.id,
            gid: e.get().gid
        })
    }

    function P(e, t, n) {
        switch (n.block_error) {
            case te:
            case J:
                return getLang("mail_peer_deleted");
            case oe:
                return getLang("mail_community_deleted");
            case re:
                return getLang("mail_group_banned_messages");
            case Z:
            case ee:
            case ne:
            case ce:
            case ue:
            case ae:
                return Object(z.isCommunityPeer)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
            case le:
                var r = Object(X.oCacheGet)(e, t);
                return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
            case ie:
                return getLang("mail_cant_send_messages_to_community");
            case se:
                return getLang("mail_chat_youre_kicked");
            case 0:
                if (S(t, e)) return getLang("mail_chat_youre_kicked");
                var i = e.get().block_states[t].name;
                return getLang("mail_community_answering").replace("{username}", i);
            default:
                return getLang("mail_send_privacy_error")
        }
    }

    function M(e, t, n) {
        var r = gpeByClass("_im_chat_input_parent", n),
            i = geByClass1("_im_chat_input_error", r);
        if (T(t, e)) {
            n.disabled = !0;
            var a = Object(G.getTab)(e, t),
                o = P(e, t, a);
            if (addClass(n, "im-chat-input--text_disabled"), addClass(r, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked"), n.contentEditable = "false", Object(z.isFvkcomgroup)(e, t)) {
                addClass(r, "is-f-vkcomgroup");
                var s = inArray(t, e.get().mutedPeers);
                o = a.data.closed || a.data.kicked ? getTemplate("sImPeerReturnToChat", {
                    text: getLang("mail_return_to_vkcomgroup")
                }) : getTemplate("sImPeerMuteUnmute", {
                    text: s ? getLang("mail_im_unmute") : getLang("mail_im_mute"),
                    cls: s ? "im-action_unmute" : "im-action_mute"
                })
            } else removeClass(r, "is-f-vkcomgroup");
            return val(i, o), !0
        }
        return n.disabled && (n.disabled = !1, removeClass(r, "im-chat-input_error"),
            removeClass(r, "is-f-vkcomgroup"), n.contentEditable = "true", removeClass(n, "im-chat-input--text_disabled"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked"), val(i, "")), !1
    }

    function A(e, t, n) {
        return Object(z.isVoiceMessageAvailable)(e).then(function(r) {
            if (!r && !Object(G.isAnyMessageBeingEdited)(e)) return !0;
            var i = null != n ? n : Emoji.val(geByClass1("_im_text", t));
            return trim(i) ? Object(G.isAnyMessageBeingEdited)(e) ? !Object(z.isMessageTooLong)(i) : !0 : d(e).hasAttaches()
        })
    }

    function N(e, t, n) {
        var i = geByClass1("_im_send", t.parentNode);
        r(i, {
            fasthide: !0
        }), A(e, t, n).then(function(t) {
            if (Object(G.isAnyMessageBeingEdited)(e)) toggleClass(i, "is_input_empty", !t), attr(i, "aria-label", getLang("mail_im_edit"));
            else {
                toggleClass(i, "im-send-btn_audio", !t), toggleClass(i, "im-send-btn_send", t), t && removeClass(i, "im-send-btn_saudio");
                var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                attr(i, "aria-label", n)
            }
        })
    }

    function D(e) {
        var t = ge(be),
            n = t.offsetHeight;
        toggleClass(e, "im-chat-input--overflowed", n > 400)
    }

    function R(e, t, n, r) {
        if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !Object(U.isAnythingLoading)(e.get())) {
            var i = Object(Y.findLastMessageToEdit)(e, Object(G.getCurrentTab)(e));
            i && t().startEditing(Object(G.getMessage)(e, e.get().peer, i))
        }
    }

    function F(e, t, n) {
        cur.share_timehash = t.get().share_timehash;
        var i = Object(K.createMutations)(j),
            a = i.callMutations,
            s = i.bindMutations,
            u = Object(Q.mount)(e, t, a),
            l = m.bind(null, t);
        ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
        var d = Object(V.initQueue)(l, g.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }),
            p = d.pushMessage,
            y = d.inspectQueue,
            w = d.resend,
            O = d.setErrored,
            S = d.complete,
            T = o.bind(null, t, n, p, a, e),
            I = x.bind(null, t);
        hide(geByClass1("ms_items_more_helper", e));
        var L = [
            ["video", getLang("profile_wall_video")],
            ["audio", getLang("profile_wall_audio")],
            ["doc", getLang("profile_wall_doc")],
            ["map", getLang("profile_wall_map")],
            ["gift", getLang("profile_wall_gift")]
        ];
        (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && L.push(["money", getLang("profile_wall_money")]), L.unshift(["photo", getLang("mail_added_photo")]);
        var P = new MediaSelector(geByClass1(fe, e), be, L, {
                maxShown: 0,
                vectorIcon: !0,
                ignoreMobile: !0,
                onAddMediaChange: function(r, i, a, o) {
                    return v(n, t, M, e, r, i, a, o, P)
                },
                editable: 1,
                onChangedSize: function() {
                    var r = n().updateScroll();
                    n().scrollFix(t, t.get().peer, r), D(e)
                },
                sortable: 1,
                teWidth: 150,
                mail: 1,
                teHeight: 100,
                forceToUp: !0,
                toId: t.get().gid ? -t.get().gid : void 0,
                blockPersonal: t.get().gid ? 1 : 0,
                docParams: t.get().gid ? {
                    imhash: t.get().upload_doc_opts.opts.imhash,
                    from: "from_gim"
                } : {}
            }),
            M = f.bind(null, t, n, p, e, a, P),
            N = b.bind(null, t, e),
            F = geByClass1("_im_send", e),
            z = o.bind(null, t, n, p, a, e),
            W = Object(H.mount)(e, t, z, function() {
                addClass(F, "im-send-btn_audio"), removeClass(F, "im-send-btn_static")
            });
        _(e, t), t.get().textMediaSelector = P, t.set(U.initTextStore.bind(null, y, w, O, S));
        var q = geByClass1("_im_text", e);
        setTimeout(function() {
            Object(G.getPeer)(t) && a().setDraft(t, Object(G.getTabDraft)(Object(G.getCurrentTab)(t))), h(t, e, P, M, T, u, n)
        }, 0);
        var Y = C.bind(null, t, e, n),
            $ = k.bind(null, t, e, n),
            X = E.bind(null, t, e, n),
            Z = c.bind(null, t),
            J = Object(K.createModule)({
                handlers: function(i, o) {
                    i(F, "click", function() {
                        A(t, e).then(function(e) {
                            e || Object(G.isAnyMessageBeingEdited)(t) ? M([]) : (r(F, {
                                fasthide: !0
                            }), W.start(), setTimeout(function() {
                                return removeClass(F, "im-send-btn_saudio")
                            }, 300))
                        })
                    }), i(F, "mouseover", N), i(q, "focus", function() {
                        t.get().longpoll.push([B.transitionEvent("message")]), cur.focused = t.get().peer
                    }), i(q, "blur", function() {
                        var e = 0 === t.get().peer ? "search" : "default";
                        t.get().longpoll.push([B.transitionEvent(e)]), cur.focused = !1
                    }), o(e.parentNode, "click", he, $), o(e.parentNode, "click", _e, X), o(e, "click", me, Y), o(e, "click", "_im_will_fwd", I), o(e, "keydown", "_im_text", function(e) {
                        return R(t, n, a, e)
                    }), o(bodyNode, "click", ve, Z)
                }
            });
        return s(t, P, q, e, M, n, y, u, J, W)
    }
    n.r(t), n.d(t, "mount", function() {
        return F
    });
    var B = n(132),
        H = n(68),
        U = n(41),
        z = n(81),
        G = n(199),
        V = n(50),
        W = n(115),
        q = n(145),
        K = n(110),
        Q = n(21),
        Y = n(205),
        $ = n(0),
        X = n(136),
        Z = 4,
        J = 5,
        ee = 6,
        te = 7,
        ne = 9,
        re = 11,
        ie = 12,
        ae = 13,
        oe = 14,
        se = 16,
        ce = 19,
        ue = 20,
        le = 23,
        de = 2e3,
        fe = "_im_media_selector",
        pe = "_im_media_fwd",
        me = "_im_fwd_close",
        he = "_im_peer_mute_unmute",
        _e = "_im_peer_return_to_chat",
        ve = "_im_submit_btn",
        be = "_im_media_preview"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e && t ? e === t ? !0 : i(e) ? !1 : i(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(16 & e.compareDocumentPosition(t)) : !1 : !1
    }
    var i = n(183);
    e.exports = r
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = (n(23), n(178), n(61)),
        i = n(184),
        a = n(188),
        o = n(130),
        s = n(132),
        c = n(41),
        u = n(136),
        l = n(81),
        d = n(56),
        f = n(49),
        p = o.Promise;
    window.IM = {
        init: function(e) {
            if (window.imwl = e.imwl, Object(d.startLoggingAllUnhandled)(), addTemplates(f), window.Promise || (window.Promise = p), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return Object(i.mount)(geByClass1("im-sick", ge("page_body")), null);
            localStorage.removeItem("im_sick_timer"), e.tabbedPeers = (e.tabbedPeers || []).map(function(e) {
                return {
                    peer: e,
                    type: "perm"
                }
            }), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                blacklist_hash: e.thash
            };
            var t = 60 * (new Date).getTimezoneOffset(),
                n = -10800,
                o = n - t,
                m = e.timeshift;
            e.timeshift = m - o, e.oCache = {};
            var g = Object(a["default"])(e);
            e.owners.forEach(function(e) {
                return Object(u.oCacheAdd)(g, e)
            }), e.owners = void 0, Object(l.normalizeTabsGotFromServer)(g, g.get().tabs), window.store = g, cur.imClassicInterface = Object(l.isClassicInterface)(g);
            var h = Object(r.mount)(geByClass1("js-im-page", ge("page_body")), g);
            Object(c.updateMentions)(g.get()), window.IMBRIDGE = {
                chatPhotoSaved: function(e) {
                    curBox() && curBox().hide();
                    var t = (e || {})[1];
                    return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || g.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                },
                updateHistory: function(e) {
                    g.set(c.updateHistory.bind(null, e)).then(function() {
                        h.updateHistory(e)
                    })
                },
                activateTab: function(e) {
                    g.get().longpoll.push([Object(s.changePeer)(intval(e), !1, !1, !0)])
                }
            };
            var _ = !1;
            cur.nav.push(function() {
                if (_) return !0;
                g.get().audio_msg && g.get().audio_msg.isRecording && h.cancelRecording(), AudioMessagePlayer.detachPlayer();
                var t = h.route.apply(null, arguments);
                return t !== !1 && (h.unmount(), window.IMBRIDGE = void 0, g.unmount(), window.store = void 0, _ = !0, e = !1, g = !1, h = !1, Object(d.stopLoggingAllUnhandled)()), t
            })
        }
    };
    try {
        stManager.done("imn.js")
    } catch (m) {}
}, , function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = intval(domData(n, "msgid"));
        if (!getSelectionText() && !Object(l.checkSelectClick)(t)) {
            var i = intval(domData(n, "peer"));
            return e.set(u.cancelSearch.bind(null, i)), e.get().longpoll.push([Object(d.changePeer)(i, r)]), !1
        }
    }

    function i(e) {
        return Object(u.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : Object(u.searchMessagesInplace)(e.get().peer, e.get())
    }

    function a(e, t) {
        return {
            isAll: function(e) {
                return Object(u.isSearchAllLoaded)(e.get().peer, e.get())
            },
            loadMore: function(e) {
                return i(e)
            },
            unmount: function() {
                Object(c.destroyModule)(t)
            }
        }
    }

    function o(e) {
        return e.findIndex(function(e) {
            return "number" == typeof e.peerId && e.href
        }) > -1
    }

    function s(e, t) {
        var n = r.bind(null, t),
            i = Object(c.createModule)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            });
        return a(e, i)
    }
    n.r(t), n.d(t, "doesSearchResultContainConversations", function() {
        return o
    }), n.d(t, "mount", function() {
        return s
    });
    var c = n(110),
        u = n(41),
        l = n(81),
        d = n(132)
}, function(e, t, n) {
    var r = n(202),
        i = n(128),
        a = n(140),
        o = Object.defineProperty;
    t.f = n(182) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = a(t, !0), r(n), i) try {
            return o(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
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
    n.r(t);
    var s = n(83),
        c = n(204),
        u = (n(9), n(35)),
        l = n(138),
        d = 80,
        f = 250,
        p = function() {
            return "undefined" != typeof window
        },
        m = function(e) {
            function t(n) {
                i(this, t);
                var r = a(this, e.call(this, n));
                return r.onClick = function() {
                    if (!r.state.dropdown || r.state.dropdown.removed) {
                        var e = r.props,
                            t = e.text,
                            n = e.position,
                            i = e.align,
                            a = e.marginTop,
                            o = e.marginLeft,
                            s = Object(l["default"])(r.el);
                        r.update({
                            text: t,
                            position: n,
                            align: i,
                            rect: s,
                            marginTop: a,
                            marginLeft: o
                        })
                    } else r.update()
                }, r.onMouseEnter = function(e) {
                    r.callerHovered = !0, r.timeouts.appear = setTimeout(function() {
                        if (r.el && r.callerHovered) {
                            var e = r.props,
                                t = e.position,
                                n = e.align,
                                i = e.marginTop,
                                a = e.marginLeft,
                                o = Object(l["default"])(r.el);
                            r.update({
                                position: t,
                                align: n,
                                rect: o,
                                marginTop: i,
                                marginLeft: a
                            })
                        }
                    }, d)
                }, r.onMouseLeave = function(e) {
                    r.callerHovered = !1, r.timeouts.callerDisappear = setTimeout(function() {
                        r.callerHovered || r.hovered || r.update()
                    }, f)
                }, r.onDropdownMouseEnter = function() {
                    "hover" === r.props.trigger && (r.hovered = !0)
                }, r.onDropdownMouseLeave = function(e) {
                    "hover" === r.props.trigger && (r.hovered = !1, r.timeouts.disappear = setTimeout(function() {
                        r.callerHovered || r.hovered || r.update()
                    }, f))
                }, r.onDocumentClick = function(e) {
                    !r.state.dropdown || r.state.dropdown.removed || r.el.contains(e.target) || r.update()
                }, r.onResize = function(e) {
                    if (r.state.dropdown && !r.state.dropdown.removed) {
                        var t = r.props,
                            n = t.text,
                            i = t.position,
                            a = t.align,
                            o = t.marginTop,
                            s = t.marginLeft,
                            c = Object(l["default"])(r.el);
                        r.update({
                            text: n,
                            position: i,
                            align: a,
                            rect: c,
                            marginTop: o,
                            marginLeft: s
                        })
                    }
                }, r.onTransitionEnd = function(e) {
                    "visibility" === e.propertyName && r.state.dropdown && r.state.dropdown.removed && r.setState({
                        dropdown: void 0
                    })
                }, r.onItemClick = function(e, t) {
                    r.update(), t.onClick(e)
                }, r.state = {}, r.timeouts = {}, r
            }
            return o(t, e), t.prototype.componentDidMount = function() {
                this.el = c.findDOMNode(this), "click" === this.props.trigger ? (this.el.addEventListener("click", this.onClick), document.addEventListener("mousedown", this.onDocumentClick), window.addEventListener("resize", this.onResize)) : (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave))
            }, t.prototype.componentWillUnmount = function() {
                var e = this;
                Object.keys(this.timeouts).forEach(function(t) {
                    clearTimeout(e.timeouts[t])
                }), "click" === this.props.trigger ? (this.el.removeEventListener("click", this.onClick), document.removeEventListener("mousedown", this.onDocumentClick), window.removeEventListener("resize", this.onResize)) : (this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)), this.defaultNode && (this.defaultNode.parentNode.removeChild(this.defaultNode), delete this.defaultNode)
            }, t.prototype.update = function(e) {
                if (!e) return this.setState({
                    dropdown: Object.assign({}, this.state.dropdown, {
                        removed: !0
                    })
                });
                var t = e.position,
                    n = e.align,
                    r = e.rect,
                    i = e.marginTop,
                    a = e.marginLeft,
                    o = r.left,
                    s = r.top;
                switch (t) {
                    case "t":
                        o += .5 * r.width;
                        break;
                    case "r":
                        o += r.width, s += .5 * r.height;
                        break;
                    case "b":
                        o += .5 * r.width, s += r.height;
                        break;
                    case "l":
                        s += .5 * r.height
                }
                o = Math.round(o + a), s = Math.round(s + i), this.setState({
                    dropdown: {
                        position: t,
                        align: n,
                        x: o,
                        y: s
                    }
                })
            }, t.prototype.renderDropdown = function() {
                var e = this;
                if (!this.state.dropdown) return null;
                var t = this.state.dropdown,
                    n = t.x,
                    i = t.y,
                    a = t.position,
                    o = t.align,
                    c = t.removed,
                    l = Object(u.classNames)("Dropdown", "Dropdown--" + a, r({
                        "Dropdown--removed": !!c
                    }, "Dropdown--align-" + o, "t" === a || "b" === a));
                return s.createElement("div", {
                    className: l,
                    style: {
                        top: i,
                        left: n
                    },
                    onTransitionEnd: function(t) {
                        return e.onTransitionEnd(t)
                    },
                    onMouseEnter: this.onDropdownMouseEnter,
                    onMouseLeave: this.onDropdownMouseLeave
                }, s.createElement("ul", {
                    className: "Dropdown__in"
                }, this.props.data.map(function(t, n) {
                    return s.createElement("li", {
                        className: "Dropdown__item",
                        onClick: function(n) {
                            return e.onItemClick(n, t)
                        },
                        key: t.id || n
                    }, t.text)
                })))
            }, t.prototype.render = function() {
                var e = this.renderDropdown();
                return e ? (!this.defaultNode && p() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), s.createElement(s.Fragment, null, this.props.children, c.createPortal(e, this.defaultNode))) : this.props.children
            }, t
        }(s.Component);
    t["default"] = m, m.defaultProps = {
        position: "b",
        align: "center",
        marginTop: 0,
        marginLeft: 0,
        trigger: "click"
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.get ? e.get() : e
    }

    function i(e, t) {
        var n = r(e),
            i = n.tabs[n.peer];
        return Object.keys(i.msgs).filter(function(n) {
            var r = v(e, t, n);
            return !Object(G.isOut)(r) && intval(n) > i.in_up_to
        })[0]
    }

    function a(e) {
        var t = r(e);
        return t.searchShown
    }

    function o(e) {
        var t = r(e);
        return t.peer
    }

    function s(e, t) {
        var n = r(e);
        return n.tabs[t]
    }

    function c(e) {
        var t = r(e);
        return t.peer ? t.tabs[t.peer] : null
    }

    function u(e) {
        var t = r(e);
        return t.selectedMessages
    }

    function l(e, t, n) {
        var r = s(e, t),
            i = u(e)[0];
        if ("undefined" == typeof i) return [n];
        var a = Math.min(n, i),
            o = Math.max(n, i);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= a && o >= e
        }).filter(function(t) {
            var n = v(e, e.get().peer, t);
            return !Object(G.isServiceMsg)(n) && !Object(G.isCallMessage)(n)
        }).map(intval)
    }

    function d(e, t) {
        var n = r(t),
            i = s(n, e),
            a = 0;
        for (var o in i.msgs)
            if (i.msgs.hasOwnProperty(o)) {
                var c = v(t, e, o);
                Object(G.isOut)(c) || (a += Object(G.isUnread)(i, c) ? 1 : 0)
            }
        return a
    }

    function f(e, t, n) {
        var r = s(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(v(e, t, r).randomId) === n
        }).length > 0
    }

    function p(e, t, n) {
        var r = f(e, t, n);
        return !!r
    }

    function m(e, t) {
        var n = r(e),
            i = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof i ? 2e9 + i : t
    }

    function g(e, t, n) {
        var r = s(e, t),
            i = v(e, t, n),
            a = Object.keys(r.msgs).filter(function(n) {
                var r = v(e, t, n),
                    a = r.local && r.type !== V.EDIT_MESSAGE;
                return !i.local && a ? !1 : i.local && !a ? !0 : m(e, i.messageId) > m(e, r.messageId)
            }),
            o = a.pop();
        return o ? v(e, t, o) : null
    }

    function h(e) {
        return e && e.length > 0 ? V.addMessageEvent([0].concat(e)) : e
    }

    function _(e, t, n) {
        var i = s(e, t),
            a = v(e, t, n),
            o = r(e);
        return Object(G.isOut)(a) ? Object(q.oCacheGet)(e, o.id).name : a.userId !== a.peerId ? Object(q.oCacheExists)(e, a.userId) ? Object(q.oCacheGet)(e, a.userId).name : !1 : i.tab
    }

    function v(e, t, n) {
        var r = s(e, t),
            i = r && r.msgs && r.msgs[n];
        return i ? h(i) : null
    }

    function b(e, t, n) {
        var r = s(e, t),
            i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                return +e - t
            });
        if (!i) return null;
        var a = i && i.indexOf("" + n),
            o = a > -1 ? i[a - 1] : null;
        return r.msgs[o]
    }

    function y(e) {
        var t = r(e);
        return t.gid || t.isClassic
    }

    function w(e) {
        return r(e).gid
    }

    function O(e) {
        return r(e).gid
    }

    function C(e) {
        return r(e).gid
    }

    function k(e, t) {
        var n = r(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function E(e) {
        var t = r(e);
        return C(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === W.FOLDER_UNRESPOND || t.active_tab === W.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function j(e, t) {
        e = r(e);
        var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
    }

    function S(e, t) {
        var n = s(e, t);
        n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
    }

    function T(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function I(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function L(e) {
        var t = r(e);
        return !t.lockedSending
    }

    function x(e) {
        return e > -2e9 && 0 > e
    }

    function P(e, t) {
        return x(t) ? !!s(e, t).blocked_community : !1
    }

    function M(e) {
        var t = r(e);
        return t.voice_message_available
    }

    function A(e) {
        var t = r(e);
        return !(!N(t) && !t.recentSearch)
    }

    function N(e) {
        var t = r(e);
        return t.searchText
    }

    function D(e, t) {
        var n = r(e);
        return t && t !== N(e) || n.recentSearch ? !0 : !1
    }

    function R(e) {
        var t = r(e);
        return t.recentSearch
    }

    function F(e) {
        var t = c(e);
        return t && t.pinned && h(t.pinned)
    }

    function B(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function H(e) {
        return 1 == r(e).isEditing
    }

    function U(e) {
        return r(e).gid
    }

    function z(e) {
        return e.draft || (e.draft = Object(K.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    n.r(t), n.d(t, "unpackStore", function() {
        return r
    }), n.d(t, "getFirstUnread", function() {
        return i
    }), n.d(t, "isSearchShown", function() {
        return a
    }), n.d(t, "getPeer", function() {
        return o
    }), n.d(t, "getTab", function() {
        return s
    }), n.d(t, "getCurrentTab", function() {
        return c
    }), n.d(t, "getSelectedMessages", function() {
        return u
    }), n.d(t, "getMessageRangeFromSelection", function() {
        return l
    }), n.d(t, "countUnread", function() {
        return d
    }), n.d(t, "getMessageByRid", function() {
        return f
    }), n.d(t, "isRidExist", function() {
        return p
    }), n.d(t, "getLocalId", function() {
        return m
    }), n.d(t, "getLastMessage", function() {
        return g
    }), n.d(t, "parserMessage", function() {
        return h
    }), n.d(t, "getAuthorFullName", function() {
        return _
    }), n.d(t, "getMessage", function() {
        return v
    }), n.d(t, "getPreviousMessage", function() {
        return b
    }), n.d(t, "isClassicInterface", function() {
        return y
    }), n.d(t, "isLocksAvailable", function() {
        return w
    }), n.d(t, "isFoldersAvailable", function() {
        return O
    }), n.d(t, "isCommunityInterface", function() {
        return C
    }), n.d(t, "getBareTab", function() {
        return k
    }), n.d(t, "isReversedDialogs", function() {
        return E
    }), n.d(t, "isFullyLoadedTab", function() {
        return j
    }), n.d(t, "makeTabNotFullyLoaded", function() {
        return S
    }), n.d(t, "isGoToEndVisible", function() {
        return T
    }), n.d(t, "getUnreadScrollBottom", function() {
        return I
    }), n.d(t, "isSendingAvailable", function() {
        return L
    }), n.d(t, "isCommunityPeer", function() {
        return x
    }), n.d(t, "isCommunityBlocked", function() {
        return P
    }), n.d(t, "checkVoiceMessageAvailable", function() {
        return M
    }), n.d(t, "isSearching", function() {
        return A
    }), n.d(t, "getSearchText", function() {
        return N
    }), n.d(t, "isSearchingValue", function() {
        return D
    }), n.d(t, "isRecentSearchesActive", function() {
        return R
    }), n.d(t, "getPinnedMessage", function() {
        return F
    }), n.d(t, "doPopularSuggExist", function() {
        return B
    }), n.d(t, "isAnyMessageBeingEdited", function() {
        return H
    }), n.d(t, "getGroupId", function() {
        return U
    }), n.d(t, "getTabDraft", function() {
        return z
    });
    var G = n(158),
        V = n(132),
        W = n(30),
        q = n(136),
        K = n(0)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = s({}, o.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = o.toStr(t);
        o.setLoc(n)
    }

    function i() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = s(e, t)
            },
            commitNav: function() {
                r(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = s(e, t), setTimeout(function() {
                    r(e), e = {}
                }, n)
            }
        }
    }
    n.r(t), n.d(t, "updateLocation", function() {
        return r
    }), n.d(t, "updateLazyLocation", function() {
        return i
    });
    var a = window,
        o = a.nav,
        s = a.extend
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (Object(_.unpackStore)(e).searchShown) return !1;
        var n = Object(_.getTab)(e, t),
            r = n && Object(_.parserMessage)(n.pinned);
        return r ? n.pinHideId != r.chat_local_id : !1
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            i = Object(_.getTab)(e, t),
            a = i && Object(_.parserMessage)(i.pinned);
        i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [i.peerId, i.pinHideId]), c(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function a(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            i = Object(_.getTab)(e, t);
        i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [i.peerId, void 0]), c(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function o(e, t, n) {
        var r = c.bind(null, n, t),
            i = Object(h.showUnpinDialog)(function() {
                i.hideProgress(), i.hide(), e.set(p.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                    return e.set(p.unpinMessage.bind(null, t))
                }).then(r)
            })
    }

    function s(e, t, n) {
        var r = e.get(),
            a = r.peer,
            o = Object(_.parserMessage)(Object(_.getTab)(e, a).pinned);
        if (n.target.classList.contains(y)) o && i(e, a, t);
        else if ("A" !== n.target.tagName) {
            var s = o && o.messageId;
            if (s && !Object(h.isAlreadyDeleted)(e, a, s)) {
                var c = e.get(),
                    u = Object(_.getMessage)(e, a, s);
                u ? (e.setState({
                    msgid: s
                }), Object(v.updateLocation)({
                    msgid: s
                }), t().focusOnMessage()) : c.longpoll.push([Object(m.changePeer)(a, s)])
            } else Object(h.showPinnedBox)(e, t, a, g.mount, n);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function c(e, t, n) {
        return e().updateChatTopic(t, n), Object(p.setActions)(n.get()), e().updateActions(n), n
    }

    function u(e) {
        showTooltip(e.target, {
            text: getLang("mail_hide_unpin_hover"),
            black: 1,
            needLeft: 1,
            shift: [8, 4],
            forcetoup: !0,
            className: "_im_pinned_tt",
            appendEl: bodyNode
        })
    }

    function l(e) {
        return {
            unmount: function() {
                Object(f.destroyModule)(e)
            }
        }
    }

    function d(e, t, n) {
        var r = Object(f.createMutations)(l),
            i = r.bindMutations,
            a = s.bind(null, t, n),
            o = u.bind(null),
            c = Object(f.createModule)({
                handlers: function(t, n) {
                    n(e, "click", w, a), n(e, "mouseover", y, o)
                }
            });
        return i(c)
    }
    n.r(t), n.d(t, "isPinnedMessageVisibleInTab", function() {
        return r
    }), n.d(t, "pinnedMessageHide", function() {
        return i
    }), n.d(t, "pinnedMessageUnHide", function() {
        return a
    }), n.d(t, "pinnedMessageUnpin", function() {
        return o
    }), n.d(t, "mount", function() {
        return d
    });
    var f = n(110),
        p = n(41),
        m = n(132),
        g = n(4),
        h = n(81),
        _ = n(199),
        v = n(200),
        b = n(77),
        y = "_im_pin_hide",
        w = "_im_pinned_message"
}, function(e, t, n) {
    var r = n(129);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(157),
        i = n(196),
        a = n(182),
        o = n(38)("species");
    e.exports = function(e) {
        var t = r[e];
        a && t && !t[o] && i.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
        } catch (e) {
            console.error(e)
        }
    }
    r(), e.exports = n(55)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = Object(c.parserMessage)(t);
        var n = vk.id == t.peerId && !Object(c.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : n || Object(u.isOut)(t) ? Object(u.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : Object(u.isGift)(t) || Object(u.isSticker)(t) || Object(u.isAudioMsg)(t) || Object(u.isGraffiti)(t) || Object(u.isMoney)(t) || Object(u.isMessageWithInviteLink)(t) ? !1 : Object(c.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : Object(l.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
    }

    function i(e) {
        var t = document.createElement("div");
        return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
    }

    function a(e, t) {
        var n = t && t.msgs ? Object.keys(t.msgs) : [],
            i = n.filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return r(e, t.msgs[n])
            });
        return +i || null
    }

    function o(e, t, n) {
        var r = Object(d.convertKludgesToAttaches)(t.kludges, t.messageId),
            a = n.dData.attaches;
        if (i(t.text) !== n.dData.txt || r.length !== a.length) return !0;
        for (var o = r.length; o--;)
            if (r[o].id != a[o].id || r[o].type != a[o].type) return !0;
        return !1
    }

    function s(e, t, n, r, i) {
        t.origText = n, t.text = Object(l.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    n.r(t), n.d(t, "canMessageBeEdited", function() {
        return r
    }), n.d(t, "convertEmojiHtmlToRegularText", function() {
        return i
    }), n.d(t, "findLastMessageToEdit", function() {
        return a
    }), n.d(t, "wasMessageReallyModified", function() {
        return o
    }), n.d(t, "replaceMsgAfterEdit", function() {
        return s
    });
    var c = n(199),
        u = n(158),
        l = n(81),
        d = n(0)
}, function(e, t, n) {
    "use strict";
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
        i = {
            canUseDOM: r,
            canUseWorkers: "undefined" != typeof Worker,
            canUseEventListeners: r && !(!window.addEventListener && !window.attachEvent),
            canUseViewport: r && !!window.screen,
            isInWorker: !r
        };
    e.exports = i
}]);