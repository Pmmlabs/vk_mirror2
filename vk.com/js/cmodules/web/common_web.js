! function(e) {
    var t = {};

    function o(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
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
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) o.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
        return n
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 101)
}([function(e, t, o) {
    var n = o(56),
        i = o(70),
        r = function(e, t) {
            if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                (n = o(57)(Function.call, o(82).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
            } catch (e) {
                t = !0
            }
            return function(e, o) {
                return r(e, o), t ? e.__proto__ = o : n(e, o), e
            }
        }({}, !1) : void 0),
        check: r
    }
}, function(e, t, o) {
    var n = o(104),
        i = o(9);
    e.exports = o(19) ? function(e, t, o) {
        return n.f(e, t, i(1, o))
    } : function(e, t, o) {
        return e[t] = o, e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "EMPTY", function() {
        return n
    }), o.d(t, "UNSTARTED", function() {
        return i
    }), o.d(t, "PLAYING", function() {
        return r
    }), o.d(t, "PAUSED", function() {
        return a
    }), o.d(t, "ENDED", function() {
        return s
    }), o.d(t, "ERROR", function() {
        return c
    });
    var n = "empty",
        i = "unstarted",
        r = "playing",
        a = "paused",
        s = "ended",
        c = "error"
}, function(e, t, o) {
    'eat script';
    o.r(t), Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var o = Object(e), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (void 0 !== i && null !== i)
                    for (var r = Object.keys(Object(i)), a = 0, s = r.length; a < s; a++) {
                        var c = r[a],
                            l = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== l && l.enumerable && (o[c] = i[c])
                    }
            }
            return o
        }
    })
}, function(e, t) {
    var o = {}.toString;
    e.exports = function(e) {
        return o.call(e).slice(8, -1)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n, i, r, a, s, c, l, d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    n = window, i = n.HTMLCanvasElement && n.HTMLCanvasElement.prototype, r = n.Blob && function() {
        try {
            return Boolean(new Blob)
        } catch (e) {
            return !1
        }
    }(), a = r && n.Uint8Array && function() {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch (e) {
            return !1
        }
    }(), s = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, c = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, l = (r || s) && n.atob && n.ArrayBuffer && n.Uint8Array && function(e) {
        var t, o, n, i, l, d, u, p, _;
        if (!(t = e.match(c))) throw new Error("invalid data URI");
        for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), l = n ? atob(i) : decodeURIComponent(i), d = new ArrayBuffer(l.length), u = new Uint8Array(d), p = 0; p < l.length; p += 1) u[p] = l.charCodeAt(p);
        return r ? new Blob([a ? u : d], {
            type: o
        }) : ((_ = new s).append(d), _.getBlob(o))
    }, n.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function(e, t, o) {
        e(o && i.toDataURL && l ? l(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
    } : i.toDataURL && l && (i.toBlob = function(e, t, o) {
        e(l(this.toDataURL(t, o)))
    })), "function" == typeof define && define.amd ? define(function() {
        return l
    }) : "object" == ("undefined" == typeof module ? "undefined" : d(module)) && module.exports ? module.exports = l : n.dataURLtoBlob = l
}, function(e, t, o) {
    var n = o(98),
        i = o(53),
        r = o(1),
        a = o(41),
        s = o(57),
        c = function(e, t, o) {
            var l, d, u, p, _ = e & c.F,
                h = e & c.G,
                f = e & c.S,
                w = e & c.P,
                v = e & c.B,
                g = h ? n : f ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                m = h ? i : i[t] || (i[t] = {}),
                b = m.prototype || (m.prototype = {});
            for (l in h && (o = t), o) u = ((d = !_ && g && void 0 !== g[l]) ? g : o)[l], p = v && d ? s(u, n) : w && "function" == typeof u ? s(Function.call, u) : u, g && a(g, l, u, e & c.U), m[l] != u && r(m, l, p), w && b[l] != u && (b[l] = u)
        };
    n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(e, t) {
    var o = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return o.call(e, t)
    }
}, function(e, t, o) {
    'eat script';

    function n() {
        var e = null,
            t = window.getSelection();
        t.getRangeAt && t.rangeCount && (e = t.getRangeAt(0));
        var o = null,
            n = null,
            i = 0,
            r = 0,
            a = document.activeElement;
        return e && ("selectionStart" in a ? (o = a, n = a, i = a.selectionStart, r = a.selectionEnd) : t.rangeCount && (o = e.startContainer, n = e.endContainer, i = e.startOffset, r = e.endOffset)), [e, o, i, n, r]
    }

    function i(e) {
        var t = window.getSelection();
        return t.removeAllRanges(), t.addRange(e), e
    }

    function r(e, t, o, n) {
        var r = document.createRange();
        return r.setStart(e, t), r.setEnd(o, n), i(r)
    }

    function a(e, t) {
        if (t = t ? t + "" : "", !browser.msie && document.execCommand) document.execCommand("insertHTML", !1, t);
        else if (e) {
            e.deleteContents();
            var o = cf(t),
                n = o.lastChild;
            e.insertNode(o), n && ((e = e.cloneRange()).setStartAfter(n), e.collapse(!0), i(e))
        }
        return e
    }
    o.r(t), o.d(t, "rangeGet", function() {
        return n
    }), o.d(t, "rangeSet", function() {
        return i
    }), o.d(t, "rangeCreate", function() {
        return r
    }), o.d(t, "rangeInsert", function() {
        return a
    })
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, o) {
    'eat script';

    function n(e) {
        var t, o = function(e) {
                var t = e.split("#"),
                    o = t[0].split("?");
                return o[0] + (o[1] ? "?" + ajx2q(q2ajx(o[1])) : "") + (t[1] ? "#" + t[1] : "")
            },
            n = extend({
                onLocChange: function() {}
            }, e),
            i = function() {
                var e = "";
                return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
            },
            r = i(),
            a = function(e) {
                var t = i();
                t == r && !0 !== e || (n.onLocChange(t), r = t)
            };
        return {
            setLoc: function(e) {
                r = o(e);
                var t = (location.toString().match(/#(.*)/) || {})[1] || "";
                if (!t && vk.al > 1 && (t = (location.pathname || "") + (location.search || "")), (t = (t = o(t)).replace(/^(\/|!)/, "")) != r) {
                    if (3 == vk.al) try {
                        return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                            scrollTop: window.lastScrollTop,
                            preventScroll: window.preventLocationScroll
                        }, "", "/" + t), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + r)
                    } catch (e) {}
                    window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + r
                }
            },
            getLoc: i,
            init: function() {
                1 == vk.al && a(!0), 3 == vk.al ? (addEvent(window, "popstate", a), browser.safari && addEvent(window, "hashchange", a)) : "onhashchange" in window ? addEvent(window, "hashchange", function() {
                    window.chHashFlag ? window.chHashFlag = !1 : a()
                }) : t = setInterval(a, 200)
            },
            setOptions: function(e) {
                n = extend(n, e)
            },
            checker: a,
            stop: function() {
                vk.al < 3 ? clearInterval(t) : 3 == vk.al && removeEvent(window, "popstate", a)
            }
        }
    }
    o.r(t), o.d(t, "HistoryAndBookmarks", function() {
        return n
    }), window.HistoryAndBookmarks = n
}, function(e, t, o) {
    'eat script';
    var n = o(103),
        i = o(18),
        r = o(61),
        a = o(80);
    e.exports = o(58)(Array, "Array", function(e, t) {
        this._t = a(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            o = this._i++;
        return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
    }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
}, function(e, t) {
    var o = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
    }
}, function(e, t, o) {
    var n = o(97),
        i = o(32);
    e.exports = function(e) {
        return function(t, o) {
            var r, a, s = String(i(t)),
                c = n(o),
                l = s.length;
            return c < 0 || c >= l ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
        }
    }
}, function(e, t, o) {
    var n = o(7),
        i = o(80),
        r = o(52)(!1),
        a = o(71)("IE_PROTO");
    e.exports = function(e, t) {
        var o, s = i(e),
            c = 0,
            l = [];
        for (o in s) o != a && n(s, o) && l.push(o);
        for (; t.length > c;) n(s, o = t[c++]) && (~r(l, o) || l.push(o));
        return l
    }
}, function(e, t, o) {
    var n = o(43)("iterator"),
        i = !1;
    try {
        var r = [7][n]();
        r.return = function() {
            i = !0
        }, Array.from(r, function() {
            throw 2
        })
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !i) return !1;
        var o = !1;
        try {
            var r = [7],
                a = r[n]();
            a.next = function() {
                o = !0
            }, r[n] = function() {
                return a
            }, e(r)
        } catch (e) {}
        return o
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "browser", function() {
        return n
    }), o.d(t, "mobPlatforms", function() {
        return i
    }), o.d(t, "browserFeatures", function() {
        return r
    });
    var n = {
            version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(_ua) || /opr/i.test(_ua),
            vivaldi: /vivaldi/i.test(_ua),
            amigo: /amigo.*mrchrome soc/i.test(_ua),
            msie: /msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua) || /edge/i.test(_ua),
            msie6: /msie 6/i.test(_ua) && !/opera/i.test(_ua),
            msie7: /msie 7/i.test(_ua) && !/opera/i.test(_ua),
            msie8: /msie 8/i.test(_ua) && !/opera/i.test(_ua),
            msie9: /msie 9/i.test(_ua) && !/opera/i.test(_ua),
            msie_edge: /edge/i.test(_ua) && !/opera/i.test(_ua),
            mozilla: /firefox/i.test(_ua),
            chrome: /chrome/i.test(_ua) && !/edge/i.test(_ua),
            safari: !/chrome/i.test(_ua) && /webkit|safari|khtml/i.test(_ua),
            iphone: /iphone/i.test(_ua),
            ipod: /ipod/i.test(_ua),
            iphone4: /iphone.*OS 4/i.test(_ua),
            ipod4: /ipod.*OS 4/i.test(_ua),
            ipad: /ipad/i.test(_ua),
            android: /android/i.test(_ua),
            bada: /bada/i.test(_ua),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
            msie_mobile: /iemobile/i.test(_ua),
            safari_mobile: /iphone|ipod|ipad/i.test(_ua),
            opera_mobile: /opera mini|opera mobi/i.test(_ua),
            opera_mini: /opera mini/i.test(_ua),
            mac: /mac/i.test(_ua),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua),
            smart_tv: /smart-tv|smarttv/i.test(_ua)
        },
        i = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        r = {
            wheelEvent: "onwheel" in ce("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : n.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in ce("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
        };
    window.browser = n, window.mobPlatforms = i, window.browserFeatures = r
}, function(e, t, o) {
    var n = o(90),
        i = o(43)("iterator"),
        r = o(61);
    e.exports = o(53).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, o) {
    e.exports = !o(21)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "_initCookies", function() {
        return r
    }), o.d(t, "getCookie", function() {
        return a
    }), o.d(t, "setCookie", function() {
        return s
    }), o.d(t, "hideCookiesPolicy", function() {
        return c
    });
    var n = o(48),
        i = o(78);

    function r() {
        _cookies = {};
        for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
            var i = e[o].split("=");
            2 == i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
        }
    }

    function a(e) {
        return r(), _cookies[e]
    }

    function s(e, t, o, n) {
        var i = "";
        if (o) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
        }
        var a = locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (a ? "; domain=." + a : "") + (n && "https:" == locProtocol ? "; secure" : "")
    }

    function c() {
        Object(n.re)("cookies_policy_wrap"), i.ajax.post("/settings", {
            act: "a_hide_cookies_policy"
        })
    }
    window._cookies = {}, window._initCookies = r, window.getCookie = a, window.setCookie = s, window.hideCookiesPolicy = c
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showStory", function() {
        return i
    }), o.d(t, "storiesPreloadStatic", function() {
        return a
    }), o.d(t, "sendMask", function() {
        return c
    });
    var n = !1;

    function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (cur.storiesNotSupported) return showFastBox(getLang("global_error"), getLang("stories_bad_browser"));
        curBox() && curBox().bodyNode.contains(t.fromEl) && (curBox().hide(), t.fromEl = null), clearTimeout(n), n = setTimeout(function() {
            bodyNode.appendChild(ce("div", {
                id: "stories_loader",
                innerHTML: getProgressHtml("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
            }))
        }, 1e3), stManager.add(["stories.js", "stories.css", "emoji.js"], function() {
            var o = window.Stories;
            clearTimeout(n), re("stories_loader"), o.show(e, t)
        })
    }
    var r = !1;

    function a() {
        r || cur.storiesNotSupported || (r = !0, stManager.add(["stories.js", "stories.css"]))
    }
    var s = !1;

    function c(e, t) {
        s || (s = !0, ajax.post("al_stories.php", {
            act: "send_mask",
            mask_id: e,
            hash: t
        }, {
            loader: !0,
            onDone: function(e, t, o, n) {
                "cant_send" === e ? showFastBox({
                    title: t,
                    width: 460
                }, o, n) : showDoneBox(getLang("stories_mask_sent")), s = !1
            },
            onFail: function() {
                return s = !1, showFastBox({
                    title: getLang("global_box_error_title")
                }, getLang("global_unknown_error")), !0
            }
        }))
    }
    window.showStory = i, window.storiesPreloadStatic = a, window.sendMask = c
}, function(e, t, o) {
    var n = o(14),
        i = o(96);
    e.exports = Object.keys || function(e) {
        return n(e, i)
    }
}, function(e, t, o) {
    'eat script';
    var n = o(90),
        i = {};
    i[o(43)("toStringTag")] = "z", i + "" != "[object z]" && o(41)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (this.constructor != n) throw new Error("ElementTooltip was called without 'new' operator");
        if (!(e = ge(e)) || !e.nodeType) throw new Error("First argument not a DOM element");
        if (data(e, "ett")) return data(e, "ett");
        if (this._opts = extend({
                delay: 100,
                offset: [0, 0],
                shift: 0,
                type: n.TYPE_VERTICAL,
                id: "",
                cls: "",
                width: null,
                appendToParent: !1,
                autoShow: !0,
                autoHide: !1,
                noHideOnClick: !1,
                arrowSize: "normal",
                customShow: !1,
                align: n.ALIGN_CENTER
            }, t), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type == n.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.cls += " eltt_align_" + this._opts.align, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type != n.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
        this._opts.forceSide && (this._opts.type = inArray(this._opts.forceSide, ["top", "bottom"]) ? n.TYPE_VERTICAL : n.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? domClosestPositioned(e, {
            noOverflow: !0
        }) : e, this._arrowSize = {
            mini: n.ARROW_SIZE_MINI,
            normal: n.ARROW_SIZE_NORMAL,
            big: n.ARROW_SIZE_BIG
        }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = n.getType(this._opts.forceSide)), this._el = e, data(this._el, "ett", this), this._initEvents(e), this._clearTimeouts(), this._isShown = !1
    }
    o.r(t), o.d(t, "ElementTooltip", function() {
        return n
    }), n.TYPE_VERTICAL = 0, n.TYPE_HORIZONTAL = 1, n.FADE_SPEED = 100, n.ARROW_SIZE = 6, n.ARROW_SIZE_MINI = 9, n.ARROW_SIZE_NORMAL = 7, n.ARROW_SIZE_BIG = 16, n.ALIGN_LEFT = "left", n.ALIGN_CENTER = "center", n.ALIGN_RIGHT = "right", n.prototype._initEvents = function(e) {
        this._opts.autoShow && addEvent(e, "mouseenter", this._el_me_event = this._onMouseEnter.bind(this)), (this._opts.autoShow || this._opts.autoHide) && addEvent(e, "mouseleave", this._el_ml_event = this._onMouseLeave.bind(this)), this._opts.autoShow || this._opts.customShow || addEvent(e, "click", this._el_c_event = function() {
            this._isShown && this._opts.noHideOnClick || this.toggle(!this._isShown)
        }.bind(this))
    }, n.prototype._onMouseEnter = function(e) {
        clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
    }, n.prototype._onMouseLeave = function(e) {
        this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
    }, n.prototype._onMouseWindowClick = function(e) {
        if (!this._opts.noAutoHideOnWindowClick) {
            for (var t = e.target; t && t != this._ttel && t != document.body && t != this._el;) t = domPN(t);
            if (!hasClass(e.target, "_ap_layer__close")) return t && t != document.body ? void 0 : (this.hide(!0), cancelEvent(e))
        }
    }, n.prototype.destroy = function() {
        var e;
        this._el_me_event && removeEvent(this._el, "mouseenter", this._el_me_event), this._el_ml_event && removeEvent(this._el, "mouseleave", this._el_ml_event), this._el_c_event && removeEvent(this._el, "click", this._el_c_event), this._clearTimeouts(), removeData(this._el, "ett"), re(this._ttel), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick), this._ttel && (e = geByClass1("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
    }, n.prototype.hide = function(e) {
        this._hide(e)
    }, n.prototype._onTooltipMouseEnter = function(e) {
        this._clearTimeouts()
    }, n.prototype._onTooltipMouseLeave = function(e) {
        this._onMouseLeave()
    }, n.prototype.build = function() {
        if (!this._ttel) {
            this._ttel = se('<div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '"><div class="eltt_arrow_back _eltt_arrow_back"><div class="eltt_arrow"></div></div><div class="eltt_content _eltt_content"></div></div>'), this._ttArrowEl = geByClass1("_eltt_arrow_back", this._ttel);
            var e = geByClass1("_eltt_content", this._ttel);
            this._opts.content && (isString(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
        }
    }, n.prototype.show = function() {
        if (this._isShown) this.updatePosition();
        else {
            if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (addEvent(this._ttel, "mouseenter", this._ev_ttenter = this._onTooltipMouseEnter.bind(this)), addEvent(this._ttel, "mouseleave", this._ev_ttleave = this._onTooltipMouseLeave.bind(this)))), this._opts.width) {
                var e = isFunction(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                setStyle(this._ttel, "width", e)
            }
            show(this._ttel);
            var t = geByClass1("_eltt_content", this._ttel);
            this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this.updatePosition(), this._visTO = setTimeout(addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick), addEvent(document, "mousedown", this._ev_wclick = this._onMouseWindowClick.bind(this))
        }
    }, n.getType = function(e) {
        switch (e) {
            case "top":
            case "bottom":
                return n.TYPE_VERTICAL;
            case "right":
            case "left":
                return n.TYPE_HORIZONTAL
        }
    }, n.prototype.getOptions = function() {
        return this._opts
    }, n.prototype.updatePosition = function() {
        var e = this._opts.forceSide,
            t = !!this._opts.getTargetBoundingBox && this._opts.getTargetBoundingBox(this);
        if (!t) {
            var o = getXY(this._el),
                i = getSize(this._el);
            t = {
                left: o[0],
                top: o[1],
                width: i[0],
                height: i[1]
            }
        }
        var r, a = getSize(this._ttel),
            s = this._arrowSize,
            c = this._opts.noBorder ? 0 : 1,
            l = isFunction(this._opts.offset) ? this._opts.offset() : this._opts.offset,
            d = this;

        function u(e, o) {
            var i = {},
                r = ["marginLeft", "marginTop"].indexOf(e),
                l = void 0;
            l = d._opts.align === (vk.rtl ? n.ALIGN_LEFT : n.ALIGN_RIGHT) ? a[r] - Math.max(c + s + (o || 0), Math.min(a[r], t[r ? "height" : "width"]) / 2) : d._opts.align === (vk.rtl ? n.ALIGN_RIGHT : n.ALIGN_LEFT) ? Math.max(c + s + (o || 0), Math.min(a[r], t[r ? "height" : "width"]) / 2) : a[r] / 2, i[e] = Math.floor(l) - c - s - (o || 0), setStyle(d._ttArrowEl, i)
        }
        if (this._opts.setPos) r = this._opts.setPos(this) || {}, n.getType(e) == n.TYPE_VERTICAL ? void 0 !== r.arrowPosition ? setStyle(this._ttArrowEl, {
            marginLeft: r.arrowPosition
        }) : u("marginLeft") : void 0 !== r.arrowPosition ? setStyle(this._ttArrowEl, {
            marginTop: r.arrowPosition
        }) : u("marginTop");
        else {
            if (!e && this._prevSide && this._opts.preventSideChange) e = this._prevSide;
            else if (!e) {
                var p = gpeByClass("audio_layer_container", this._ttel),
                    _ = p || domClosestOverflowHidden(this._ttel),
                    h = _ != bodyNode ? getXY(_) : [scrollGetX(), scrollGetY() + getPageHeaderHeight()],
                    f = _ != bodyNode ? getSize(_) : [window.innerWidth, window.innerHeight];
                if (this._opts.type == n.TYPE_VERTICAL) {
                    var w = hasClass(bodyNode, "body_im") ? 60 : this._opts.bottomGap || 0,
                        v = t.top - h[1] > a[1] + s - l[1],
                        g = scrollGetY() + f[1] - (t.top + t.height + s) - w > a[1];
                    e = "top" == this._opts.defaultSide ? v ? "top" : "bottom" : g ? "bottom" : "top"
                } else e = t.left - h[0] < a[0] ? "right" : "left"
            }
            var m, b = getXY(this._appendToEl),
                y = [t.left - b[0], t.top - b[1]],
                x = l[0] + y[0];
            this._opts.centerShift ? (x += this._opts.centerShift || 0, m = this._opts.centerShift) : this._opts.rightShift && (x += m = -(a[0] / 2 - this._opts.rightShift)), this._prevSide = e;
            var k = void 0,
                C = void 0;
            switch (this._opts.align === (vk.rtl ? n.ALIGN_LEFT : n.ALIGN_RIGHT) ? (k = t.width - a[0], C = t.height - a[1]) : this._opts.align === (vk.rtl ? n.ALIGN_RIGHT : n.ALIGN_LEFT) ? (k = 0, C = 0) : (k = -a[0] / 2 + t.width / 2, C = t.height / 2 - a[1] / 2), e) {
                case "bottom":
                    r = {
                        left: k + x,
                        top: t.height + s - l[1] + y[1]
                    };
                    break;
                case "top":
                    r = {
                        left: k + x,
                        top: -a[1] - s + l[1] + y[1]
                    };
                    break;
                case "right":
                    r = {
                        left: t.width + s + x,
                        top: C + l[1] + y[1]
                    };
                    break;
                case "left":
                    r = {
                        left: -a[0] - s + x,
                        top: C + l[1] + y[1]
                    }
            }
            this._opts.type == n.TYPE_VERTICAL ? u("marginLeft", m) : u("marginTop", m)
        }
        each(["top", "bottom", "left", "right"], function(t, o) {
            e != o && removeClass(this._ttel, "eltt_" + o)
        }.bind(this)), addClass(this._ttel, "eltt_" + e), setStyle(this._ttel, r)
    }, n.prototype._hide = function(e) {
        if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                hide(this._ttel), this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!e)
            }.bind(this), n.FADE_SPEED), this._opts.onBeforeHide) try {
            this._opts.onBeforeHide(this._ttel, !!e)
        } catch (e) {}
        removeClass(this._ttel, "eltt_vis"), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick)
    }, n.prototype.isShown = function() {
        return this._isShown
    }, n.prototype.toggle = function() {
        this.isShown() ? this.hide() : this.show()
    }, n.prototype._clearTimeouts = function() {
        this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
    }, n.prototype.getContent = function() {
        return geByClass1("_eltt_content", this._ttel)
    }, window.ElementTooltip = n
}, function(e, t, o) {
    'eat script';

    function n(e) {
        for (var t = e, o = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], i = 0, r = o.length; i < r; i++) t = t.split(o[i]).join(n[i]);
        var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ";
        for (i = 0, r = a.length; i < r; i++) t = t.split(a.charAt(i)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(i));
        return t == e ? null : t
    }

    function i(e) {
        var t, o = e,
            n = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"],
            i = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"],
            r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ";
        for (t = 0; t < i.length; t++) o = o.split(i[t]).join(n[t]);
        for (t = 0; t < r.length; t++) o = o.split(r.charAt(t)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(t));
        return o == e ? null : o
    }

    function r(e) {
        var t, o = e,
            n = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
        for (t = 0; t < n.length; t++) o = o.split(n.charAt(t)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(t));
        return o == e ? null : o
    }

    function a(e, t, o) {
        if (!t || !window.langConfig) return e;
        var n;
        if (isArray(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules.float] : each(langConfig.numRules.int, function(o, i) {
                if ("*" == i[0]) return n = t[i[2]], !1;
                var r = i[0] ? e % i[0] : e;
                return -1 != indexOf(i[1], r) ? (n = t[i[2]], !1) : void 0
            })) : n = t, o) {
            for (var i = e.toString().split("."), r = [], a = i[0].length - 3; a > -3; a -= 3) r.unshift(i[0].slice(a > 0 ? a : 0, a + 3));
            i[0] = r.join(langConfig.numDel), e = i.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function s(e, t) {
        if (!isArray(t)) return t;
        var o = t[1];
        return window.langConfig ? (each(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (o = t[i[1]], !1) : e == i[0] && t[i[1]] ? (o = t[i[1]], !1) : void 0
        }), o) : o
    }

    function c(e) {
        for (var t = e + "", o = arguments, n = o.length, i = 1; i < n; i += 2) {
            var r = "%" == o[i][0] ? o[i] : "{" + o[i] + "}";
            t = t.replace(r, o[i + 1])
        }
        return t
    }

    function l(e, t) {
        var o = t ? window : window.cur;
        o.lang ? extend(o.lang, e) : o.lang = e
    }

    function d() {
        try {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return isFunction(o) ? o.apply(null, e) : void 0 === e[0] && !isArray(o) || "raw" === e[0] ? o : a(e[0], o, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.prototype.slice.call(arguments).join(", ") + ")")
        }
    }

    function u(e, t, o, n, i, r) {
        var a;
        if (r || (r = ""), isArray(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, a = new Date(e)) : a = e, i) t = t[1];
        else {
            var s = "";
            !(s = isToday(a) ? t[3] : isYesterday(a) ? t[2] : isTomorrow(a) ? t[4] : t[1]) && t[1] && (s = t[1]), t = s
        }
        var c = "",
            l = {
                hours: a.getHours(),
                minutes: a.getMinutes(),
                seconds: a.getSeconds(),
                day: a.getDate(),
                month: a.getMonth() + 1,
                year: a.getFullYear()
            };
        switch (3 === vk.lang && (c = a.getHours() > 11 ? "pm" : "am", l.hours = a.getHours() % 12 == 0 ? 12 : a.getHours() % 12), vk.lang) {
            case 1:
                switch (a.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !isToday(a) || isYesterday(a) || isTomorrow(a) || (t = r + t);
                break;
            case 12:
            case 73:
                1 == a.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", leadingZero(l.hours)).replace("{minute}", leadingZero(l.minutes)).replace("{day}", l.day).replace("{num_day}", leadingZero(l.day)).replace("{month}", n[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", leadingZero(l.seconds)).replace("{am_pm}", c)
    }

    function p(e, t, o, n, i) {
        e *= 1e3, void 0 === o && (o = !0), void 0 === n && (n = d("months_of", "raw")), t *= 1e3;
        var r = Date.now(),
            a = new Date(r),
            s = new Date(e + t);
        return !i && e > r && e - r < 864e5 && a.getDate() == s.getDate() ? u(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() != a.getYear() || e < r - 157248e5 ? u(e, d("global_date", "raw"), t, n, !o) : u(e, d("global_short_date", "raw"), t, n, !o)
    }

    function _(e, t, o, n) {
        return isToday(new Date(1e3 * e + 1e3 * t)) ? u(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : p(e, t, o, n)
    }

    function h(e, t, o) {
        return isArray(t) && e < t.length ? t[e] : a(e, o)
    }

    function f(e, t) {
        var o = "";
        e += t;
        var n = parseInt(Date.now() / 1e3) - e;
        if (n < 60) o = d("global_just_now");
        else if (n < 3600) {
            o = h(intval(n / 60), d("global_word_mins_ago", "raw"), d("global_mins_ago", "raw"))
        } else if (n < 14400) {
            o = h(intval(n / 3600), d("global_word_hours_ago", "raw"), d("global_hours_ago", "raw"))
        } else o = w(e, 0, !0, "_l");
        return o
    }

    function w(e, t, o, n) {
        void 0 === o && (o = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            r = new Date;
        return i.getFullYear() != r.getFullYear() && i.getTime() < r.getTime() - 1728e5 || Math.abs(i.getTime() - r.getTime()) > 157248e5 ? u(1e3 * e, d("global_date", "raw"), t, d("months_sm_of"), !o) : u(1e3 * e, d("global_short_date_time" + n, "raw"), t, d("months_sm_of"), !o)
    }

    function v(e, t, o) {
        void 0 === o && (o = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            r = n.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            c = a.getMonth();
        return u(1e3 * e, d(s < i && (r > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, d("months_sm_of", "raw"), !o)
    }
    o.r(t), o.d(t, "parseLatin", function() {
        return n
    }), o.d(t, "parseCyr", function() {
        return i
    }), o.d(t, "parseLatKeys", function() {
        return r
    }), o.d(t, "langNumeric", function() {
        return a
    }), o.d(t, "langSex", function() {
        return s
    }), o.d(t, "langStr", function() {
        return c
    }), o.d(t, "addLangKeys", function() {
        return l
    }), o.d(t, "getLang", function() {
        return d
    }), o.d(t, "langDate", function() {
        return u
    }), o.d(t, "getShortDate", function() {
        return p
    }), o.d(t, "getShortDateOrTime", function() {
        return _
    }), o.d(t, "langWordNumeric", function() {
        return h
    }), o.d(t, "getDateText", function() {
        return f
    }), o.d(t, "getBigDateNew", function() {
        return w
    }), o.d(t, "getSmDate", function() {
        return v
    }), window.parseLatin = n, window.parseCyr = i, window.parseLatKeys = r, window.langNumeric = a, window.langSex = s, window.langStr = c, window.addLangKeys = l, window.getLang = d, window.langDate = u, window.getShortDate = p, window.getShortDateOrTime = _, window.langWordNumeric = h, window.getDateText = f, window.getBigDateNew = w, window.getSmDate = v
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return o;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return this[o]
        }
    })
}, function(e, t) {
    e.exports = function(e, t, o, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(74),
        i = o(9),
        r = o(49),
        a = {};
    o(1)(a, o(43)("iterator"), function() {
        return this
    }), e.exports = function(e, t, o) {
        e.prototype = n(a, {
            next: i(1, o)
        }), r(e, t + " Iterator")
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (clearTimeout(hfTimeout), t > 0) hfTimeout = setTimeout(function() {
            n(e, 0)
        }, t);
        else {
            var o = e ? "visible" : "hidden";
            triggerEvent(document, e ? "unblock" : "block");
            var i = function() {
                this.getAttribute("preventhide") || "internal/link" == this.getAttribute("type") || ("flash_app" == this.id && browser.msie ? e ? setStyle(this, {
                    position: "static",
                    top: 0
                }) : setStyle(this, {
                    position: "absolute",
                    top: "-5000px"
                }) : this.style.visibility = o)
            };
            each(geByTag("embed"), i), each(geByTag("object"), i)
        }
    }

    function i(e, t, o, n) {
        if (!t.url || !t.id) return !1;
        var i = (t = extend({
            version: 9,
            width: 1,
            height: 1
        }, t)).url;
        return stVersions[i] || (stVersions[i] = ""), __debugMode && stVersions[i] < 1e6 && (stVersions[i] += irand(1e6, 2e6)), stVersions[i] && (t.url += (-1 == t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[i]), o = extend({
            quality: "high",
            flashvars: ajx2q(n)
        }, o), !(browser.flash < t.version) && (ge(e).innerHTML = browser.flashwrap(t, o), !0)
    }
    o.r(t), o.d(t, "toggleFlash", function() {
            return n
        }), o.d(t, "renderFlash", function() {
            return i
        }),
        function() {
            var e = [0, 0, 0],
                t = "ShockwaveFlash.ShockwaveFlash",
                o = "embed",
                n = 'type="application/x-shockwave-flash" ',
                i = function(e) {
                    return e.toString().replace("&", "&amp;").replace('"', "&quot;")
                };
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                var r = navigator.plugins["Shockwave Flash"];
                if (r && r.description)
                    for (var a = r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), s = 0; s < 3; ++s) e[s] = a[s] || 0
            } else {
                if (_ua.indexOf("Windows CE") >= 0) {
                    var c = !0;
                    for (a = 6; c;) try {
                        ++a, c = new ActiveXObject(t + "." + a), e[0] = a
                    } catch (e) {}
                } else try {
                    e = (c = new ActiveXObject(t + ".7")).GetVariable("$version").split(" ")[1].split(",")
                } catch (e) {}
                o = "object", n = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
            }
            browser.flashwrap = "embed" == o ? function(e, t) {
                t = extend({
                    id: e.id,
                    name: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                }, t), browser.flash >= e.version ? t.src = e.url : t.src = e.express;
                var o = [];
                for (var r in t) {
                    var a = t[r];
                    void 0 !== a && null !== a && o.push(r + '="' + i(a) + '" ')
                }
                return "<embed " + n + o.join("") + "/>"
            } : function(e, t) {
                browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
                var o = {
                        id: e.id,
                        width: e.width,
                        height: e.height,
                        style: e.style,
                        preventhide: e.preventhide
                    },
                    r = [];
                for (var a in o) {
                    void 0 !== (c = o[a]) && null !== c && r.push(a + '="' + i(c) + '" ')
                }
                var s = [];
                for (var a in t) {
                    var c;
                    void 0 !== (c = t[a]) && null !== c && s.push('<param name="' + a + '" value="' + i(c) + '" />')
                }
                return "<object " + n + r.join("") + ">" + s.join("") + "</object>"
            }, e[0] < 7 && (e = [0, 0, 0]), browser.flash = intval(e[0]), browser.flashfull = {
                major: browser.flash,
                minor: intval(e[1]),
                rev: intval(e[2])
            }, setCookie("remixflash", intval(e[0]) + "." + intval(e[1]) + "." + intval(e[2]), 30)
        }(), window.hfTimeout = 0, window.toggleFlash = n, window.renderFlash = i
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, o) {
    var n = o(56);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var o, i;
        if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
        if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63),
        core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86),
        _polyfill_from_code_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42),
        _polyfill_array_find_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28),
        _polyfill_array_from_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27),
        _polyfill_object_assign_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3),
        _polyfill_number_isinteger_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76),
        _lib_ee__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50),
        _lib_canvas_to_blob__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5),
        _lib_polyfills__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92),
        _lib_ui_util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(47),
        _lib_cookies__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(20),
        _lib_utils_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(45),
        _lib_ads__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(100),
        _lib_ajax__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(78),
        _lib_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(48),
        _lib_dom_events__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(102),
        _lib_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(16),
        _lib_element_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(25),
        _lib_favicon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(40),
        _lib_flash__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(31),
        _lib_fx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(105),
        _lib_history_and_bookmarks__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(10),
        _lib_lang__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(26),
        _lib_layers__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(65),
        _lib_ls__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(44),
        _lib_market__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(81),
        _lib_scroll__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(59),
        _lib_static_manager__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(85),
        _lib_stats__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(55),
        _lib_ui__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(95),
        _lib_video__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(89),
        _lib_scripts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(79),
        _lib_stories__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(22),
        _lib_range__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(8);
    window.Map = core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__, window.Set = core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__;
    var vk = window.vk;

    function jsc(e) {
        return "cmodules/" + e
    }
    for (var i in 1 == vk.al ? (location.search || "/" != location.pathname) && location.replace("/") : (3 != vk.al || history.pushState || (vk.al = 2), location.search || "/index.php" != location.pathname || location.replace("/"), vk.version = !1), window.stVersions || (window.navMap = window.stVersions = window.stTypes = {}, window._rnd = 1), window.jsc = jsc, window.NextPageID = 1, window.__debugMode = !0, window._wf = 0, window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.StaticFiles || (window.StaticFiles = {}), window.parseJSON = window.JSON && JSON.parse ? function(obj) {
            try {
                return JSON.parse(obj)
            } catch (e) {
                return topError("<b>parseJSON:</b> " + e.message, {
                    dt: -1,
                    type: 5,
                    answer: obj
                }), eval("(" + obj + ")")
            }
        } : function(obj) {
            return eval("(" + obj + ")")
        }, window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now(), window.cur = {
            destroy: [],
            nav: []
        }, browser.android && (setCookie("remixscreen_width", window.screen.width, 365), setCookie("remixscreen_height", window.screen.height, 365), setCookie("remixscreen_dpr", window.devicePixelRatio || 1, 365)), setCookie("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), StaticFiles) {
        var f = StaticFiles[i];
        f.t = -1 != i.indexOf(".css") ? "css" : "js", f.n = i.replace(/[\/\.]/g, "_"), f.l = 0, f.c = 0
    }

    function nodeUpdated(e, t) {
        setStyle(e, {
            backgroundColor: "#F5F7FA"
        }), animate(e, {
            backgroundColor: "#FFF"
        }, t || 6e3, function(e) {
            setStyle(e, {
                backgroundColor: null
            })
        })
    }

    function debugLog(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - _logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), browser.msie || browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (e) {}
    }

    function debugEl(e) {
        return e && ((e.tagName || "").toLowerCase() + (e.className ? "." + e.className.replace(/\s+/g, ".") : "") + (e.id && !/^__vk/.test(e.id) ? "#" + e.id : "") || e.toString()) || "[NULL]"
    }

    function __bf() {}

    function tnActive(e) {
        window.tnAct = e, addClass(e, "active")
    }

    function tnInactive() {
        removeClass("head_music", "head_play_down"), removeClass("top_logo_down", "tld_d"), removeClass(window.tnAct, "active")
    }
    if (window.locHost = location.host, window.locProtocol = location.protocol, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), __dev || (window.__debugMode = !1), window.locHash = location.hash.replace("#/", "").replace("#!", ""), window.locBase = location.toString().replace(/#.+$/, ""), window.nodeUpdated = nodeUpdated, window._logTimer = (new Date).getTime(), window.debugLog = debugLog, window.debugEl = debugEl, window.__bf = __bf, addEvent(window, "unload", function() {
            for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem != window && removeEvent(vkCache[e].handle.elem)
        }), addEvent(window, "DOMContentLoaded load", function() {
            vk.loaded || (vk.loaded = !0, updSideTopLink()), checkPageBlocks()
        }), window.tnActive = tnActive, window.tnInactive = tnInactive, addEvent(window, "mouseup dragstart", tnInactive), addEvent(document, "mouseup dragstart", tnInactive), __debugMode) {
        var __checkData = function() {
            var e = [];
            for (var t in vkCache) {
                var o, n = vkCache[t];
                if (n && (o = n.__elem)) {
                    var i = o.id;
                    if (i || (o.id = i = "__vk" + irand(1e6, 9999999)), ge(i) != o) {
                        var r = [];
                        for (var a in n)
                            if (!("__elem" == a || "handle" == a && n.events))
                                if ("events" == a) {
                                    var s = [];
                                    for (var c in n[a]) s.push(c + "(" + n[a][c].length + ")");
                                    r.push("{" + s.join(", ") + "}")
                                } else r.push(a);
                        e.push("<b>" + debugEl(o) + "</b>: " + r.join(", "))
                    }
                }
            }
            return e.join("<br>")
        };
        addEvent(document, "keydown", function(e) {
            120 != e.keyCode || e.charCode || showFastBox({
                title: "Debug"
            }, __checkData())
        })
    }

    function updateHeaderStyles(e) {
        var t = [ge("dev_top_nav_wrap"), ge("page_header_wrap")];
        each(t, function(t, o) {
            o && setStyle(o, e)
        })
    }

    function compareScrollStyles(e, t) {
        var o = clone(e),
            n = clone(t);
        return each(o, function(e, t) {
            "position" !== e && (o[e] = Math.round(t))
        }), each(n, function(e, t) {
            "position" !== e && (n[e] = Math.round(t))
        }), JSON.stringify(o) === JSON.stringify(n)
    }

    function updateNarrow() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || ge("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && geByClass1("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || ge("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === getStyle(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || ge("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            n = scrollGetY();
        if (!browser.mobile && e && t && o && !isVisible(boxLoader) && !isVisible(boxLayerBG) && !isVisible(layerBG)) {
            var i, r = window.lastWindowHeight || 0,
                a = Math.min(n, bodyNode.clientHeight - r),
                s = cur.__narrowBar.pl,
                c = vk.staticheader ? Math.max(0, getPageHeaderHeight() - a) : getPageHeaderHeight(),
                l = cur.__narrowBar.isBarFixed,
                d = floatval(getStyle(cur.__narrowBar.barBlock, "marginTop")),
                u = getSize(e)[1] - (l ? d : 0),
                p = getSize(o)[1],
                _ = getXY(o)[1],
                h = u >= p - d,
                f = d,
                w = a + r - p - _ - f,
                v = Math.max(0, w),
                g = _ - c,
                m = getXY(e)[1] + (l ? d : 0),
                b = cur.__narrowBar.lastSt || 0,
                y = cur.__narrowBar.lastStyles || {},
                x = !1,
                k = c + f + u + d + v <= r && !cur.narrowHide;
            a - 1 < g && !(k && browser.msie && m < c + d) || h ? i = {
                marginTop: 0
            } : a - 1 < Math.min(b, m - c - d) || k ? (i = {
                top: c,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(s)[0]))
            }, x = !0) : a + 1 > Math.max(b, m + u + f - r) && w < 0 && !cur.narrowHide || cur.narrowHide && a + 1 > Math.max(b, m + u - c) ? (i = {
                bottom: cur.narrowHide ? r - c : f,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(s)[0]))
            }, x = !0) : i = {
                marginTop: w >= 0 ? p - u : Math.min(m - _, p - u + g)
            }, compareScrollStyles(i, y) || (each(y, function(e, t) {
                y[e] = null
            }), setStyle(e, extend(y, i)), cur.__narrowBar.lastStyles = i), x !== l && toggleClass(e, "fixed", x), cur.__narrowBar.lastSt = a, cur.__narrowBar.isBarFixed = x
        }
    }

    function updateLeftMenu(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }
    addEvent(document, "mousedown", function(e) {
        _wf = 1, cur.__mdEvent = e
    }), window.updateHeaderStyles = updateHeaderStyles, window.compareScrollStyles = compareScrollStyles, window.updateNarrow = updateNarrow, window.getLmDomEles = function() {
        var e = {};

        function t(e) {
            return e && document.body.contains(e)
        }
        return function() {
            return {
                bar: e.bar = t(e.bar) ? e.bar : ge("side_bar_inner"),
                pl: e.pl = t(e.pl) ? e.pl : ge("page_layout"),
                pb: e.pb = t(e.pb) ? e.pb : ge("page_body")
            }
        }
    }(), window.updateSTL = function() {
        var e = window,
            t = document.documentElement,
            o = Math.max(intval(e.innerWidth), intval(t.clientWidth));
        toggleClass(bodyNode, "no_stl", o < vk.width + 280), toggleClass(bodyNode, "no_sett", o < vk.width + 62)
    }, window.checkPageBlocks = function() {
        var e = ge("content");
        e && (toggleClass(e, "page_block", !geByClass1("page_block", e)), updateAriaElements())
    }, window.onBodyResize = function(e) {
        var t = window,
            o = document.documentElement;
        if (t.pageNode) {
            var n = Math.max(intval(t.innerWidth), intval(o.clientWidth)),
                i = Math.max(intval(t.innerHeight), intval(o.clientHeight)),
                r = sbWidth(),
                a = !1;
            if (browser.mobile && (n = Math.max(n, intval(bodyNode.scrollWidth)), i = Math.max(i, intval(bodyNode.scrollHeight))), t.lastWindowWidth != n || !0 === e) {
                a = !0, t.lastInnerWidth = t.lastWindowWidth = n, layerWrap.style.width = boxLayerWrap.style.width = n + "px";
                var s = layer.style.width = boxLayer.style.width = n - r - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = n + "px", mvLayer.style.width = s), window.wkLayerWrap && (wkLayerWrap.style.width = n + "px", wkLayer.style.width = s), bodyNode.offsetWidth < vk.width + r + 2 && (n = vk.width + r + 2), n)
                    for (var c = pageNode.firstChild; c; c = c.nextSibling)
                        if (c.tagName) {
                            for (var l = (t.lastInnerWidth = n - r - 1) - 1, d = c.firstChild; d; d = d.nextSibling) "scroll_fix" == d.className && (d.style.width = l + "px");
                            vk.staticheader || updateHeaderStyles({
                                width: l
                            })
                        }
            }
            if ((t.lastWindowHeight != i || !0 === e) && (a = !0, t.lastWindowHeight = i, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = i + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = i + "px"), window.wkLayerWrap)) {
                var u = browser.mobile ? t.innerHeight : i;
                wkLayerWrap.style.height = u + "px"
            }
            if (vk.noSideTop || updSideTopLink(1), a && t.curRBox && t.curRBox.boxes && window.getWndInner) {
                var p = getWndInner();
                each(curRBox.boxes, function() {
                    this._wnd_resize(p[0], p[1])
                })
            }
            setTimeout(updSeenAdsInfo, 0);
            var _ = getAudioPlayer();
            _.audioLayer && _.audioLayer.isShown() && _.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && setStyle(cur.lSTL, {
                width: Math.max(getXY(cur.lSTL.el)[0], 0),
                height: i - 1
            }), ge("dev_top_nav") && setStyle(ge("dev_top_nav", "left", null));
            var h = geByClass("ui_search_fixed"),
                f = ge("narrow_column");
            each(h, function() {
                redraw(this, "ui_search_fixed"), setTimeout(redraw.pbind(this, "ui_search_fixed"), 0)
            }), f && (redraw(f, "fixed"), setTimeout(redraw.pbind(f, "fixed"), 0)), updateLeftMenu(), updateNarrow(), updateSTL()
        }
    }, window.redraw = function(e, t) {
        e && "fixed" == getStyle(e, "position") && (t ? removeClass(e, t) : setStyle(e, {
            position: "relative"
        }), e.offsetLeft, t ? addClass(e, t) : setStyle(e, {
            position: "fixed"
        }))
    }, window.onBodyScroll = function() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0]));
            browser.mobile || vk.staticheader || updateHeaderStyles({
                marginLeft: e
            }), updateLeftMenu(), updateNarrow(), updSideTopLink()
        }
    }, window.onDocumentClick = function(e) {
        if (checkEvent(e)) return !0;
        if (ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t, o, n, i = 8, r = e.target || e.srcElement, a = window; r && r != bodyNode && "A" != r.tagName && i--;) r = r.parentNode;
            if (!r || "A" != r.tagName || r.onclick || r.onmousedown) return !0;
            if ((t = r.href) && (r.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !browser.msie) return (blankWnd = a.open("", "_blank", "")) && (browser.msie && -1 != t.indexOf(";") && (t = "'" + t.replace(/'/g, "%27") + "'"), blankWnd.opener = null, blankWnd.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + clean(t) + '">'), blankWnd.document.close()), cancelEvent(e);
                try {
                    return a._opener.contentWindow.open(t, "_blank"), setTimeout(a._reopen, 0), cancelEvent(e)
                } catch (e) {
                    return !0
                }
            }
            if ("https:" != location.protocol && !t.indexOf("https://")) return !0;
            (t = t.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (t = t.replace(location.hostname, "")), vk.dev && "vk.com" == location.hostname && (t = t.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var s = {};
            (n = t.match(/^\/(.+?)#[\!\/](.+?)$/)) && !n[1].match(/^app(\d+)/) && (s.permanent = n[1], t = "/" + n[2]);
            var c = !!(r.getAttribute && r.getAttribute("data-post-click-type") && r.getAttribute("data-post-id"));
            if (t.match(/#$/) && !c) return !0;
            var l, d = domData(r, "post-id");
            d && (s.postId = d);
            var u = t;
            if (o = t.match(/^\/(.*?)(\?|#|$)/)) o = o[1];
            else {
                if (r.hostname) l = r.hostname, o = r.pathname + r.search;
                else {
                    var p = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(t);
                    if (!p) return !0;
                    l = p[1], o = p[3] || "/"
                }
                if (!l || !c) return !0;
                r.setAttribute("data-change-location-with-post-away", 1), u = r
            }
            if ("add_community_app" == o) return attr(r, "target", "_blank"), !0;
            if (o.indexOf(".php") > 0 || o.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!c) return !0;
                r.setAttribute("data-change-location-with-post-away", 1), u = r
            }
            var _ = r.getAttribute("hrefparams");
            _ && (s.params = extend(s.params || {}, q2ajx(_)));
            try {
                return nav.go(u, e, s), cancelEvent(e)
            } catch (e) {
                return !0
            }
        }
    }, window.onEnter = function(e, t) {
        (t = t || window.event).keyCode == KEY.ENTER && (e(), cancelEvent(t))
    }, window.onCtrlEnter = function(e, t) {
        (10 == (e = e || window.event).keyCode || 13 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && (t(), cancelEvent(e))
    }, window._stlClick = function(e) {
        return checkEvent(e) || cancelEvent(e)
    }, window._stlMousedown = function(e) {
        if (e = e || window.event, !checkEvent(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                _stlWas = 0, scrollToY(t, 0, !0, !0), updateLeftMenu(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (_stlWas = scrollGetY(), scrollToY(0, 0, !0, !0), updateLeftMenu())
    }, window._stlMouseover = function(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" == t.type && (t.pageX > 0 || t.clientX > 0);
        toggleClass(_stlLeft, "over", o), toggleClass(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), toggleClass(_stlSide, "over", o)
    }, vk.width = 960, window.domStarted = function() {
        if (window.headNode = geByTag1("head"), extend(window, {
                icoNode: geByTag1("link", headNode),
                bodyNode: geByTag1("body"),
                htmlNode: geByTag1("html"),
                utilsNode: ge("utils"),
                _fixedNav: !1,
                _tbLink: {}
            }), addEvent(bodyNode, "resize", onBodyResize.pbind(!1)), utilsNode) {
            browser.mozilla ? addClass(bodyNode, "firefox") : browser.mobile && addClass(bodyNode, "mobfixed");
            var e = [];
            for (var t in each(browser, function(t, o) {
                    o && !inArray(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
                }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), StaticFiles) {
                var o = StaticFiles[t];
                o.l = 1, "css" == o.t && utilsNode.appendChild(ce("div", {
                    id: o.n
                }))
            }
            var n = ge("layer_bg"),
                i = n.nextSibling,
                r = ge("box_layer_bg"),
                a = r.nextSibling;
            if (extend(window, {
                    _reopen: function() {
                        re(window._opener), window._opener = utilsNode.appendChild(ce("iframe"))
                    },
                    layerBG: n,
                    boxLayerBG: r,
                    layerWrap: i,
                    layer: i.firstChild,
                    boxLayerWrap: a,
                    boxLayer: a.firstChild,
                    boxLoader: a.firstChild.firstChild,
                    _stlSide: ge("stl_side"),
                    _stlLeft: ge("stl_left"),
                    _stlShown: 0,
                    _stlWas: 0,
                    _stlWasSet: 0,
                    _stlBack: 0,
                    _regBar: 0,
                    __afterFocus: !1,
                    __needBlur: !1
                }), _reopen(), !browser.mobile) {
                var s = {
                    onclick: _stlClick,
                    onmousedown: _stlMousedown,
                    onmouseover: _stlMouseover,
                    onmouseout: _stlMouseover
                };
                val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang("global_to_top") + "</nobr></div>"), extend(_stlLeft, s), extend(_stlSide, s), window._stlBg = _stlLeft.firstChild, window._stlText = _stlBg.firstChild, addEvent(window, "blur", function(e) {
                    _wf = -1, __needBlur = !1
                });
                var c = !0;
                addEvent(window, "focus", function(e) {
                    _wf = 1, __needBlur || (__afterFocus = __needBlur = !0, setTimeout(function() {
                        __afterFocus = !1
                    }, 10), c && (sbWidth(!0), onBodyResize(!0), c = !1))
                })
            }
            addEvent(boxLayerWrap, "click", __bq.hideLastCheck), window.LazyLoad && LazyLoad.watch(boxLayerWrap), extend(layers, {
                show: layers._show.pbind(n, i),
                boxshow: layers._show.pbind(r, a),
                wrapshow: layers._show.pbind(n),
                hide: layers._hide.pbind(n, i),
                boxhide: layers._hide.pbind(r, a),
                wraphide: layers._hide.pbind(n)
            }), hab.init(), window._retinaInit ? window._retinaInit() : window._initedCheck = 1
        }
    }, vk.started = vkNow(), window.domReady = function() {
        if (utilsNode) {
            updateSTL();
            var e = ge("side_bar");
            extend(window, {
                pageNode: ge("page_wrap"),
                _fixedNav: e && "fixed" === getStyle(e, "position"),
                _tbLink: ge("top_back_link")
            }), browser.chrome || browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = browser.safari ? bodyNode : htmlNode, 1 == vk.al && showTitleProgress();
            var t = Math.max(vkNow() - vk.started, 10),
                o = intval((vk.contlen || 1) / t * 1e3);
            if (browser.mozilla && browser.version >= 4 ? o /= 2.5 : browser.mozilla ? o *= 1.5 : browser.msie && browser.version >= 7 ? o /= 1.5 : browser.msie && (o *= 2.5), __stm.lowlimit = intval(150 * Math.max(2e6 / o, 1)), __stm.highlimit = 6 * __stm.lowlimit, __stm.lowlimit = Math.min(__stm.lowlimit, 600), onBodyResize(), setTimeout(onBodyResize.pbind(!1), 0), updateAriaElements(), window.addEventListener("scroll", onBodyScroll, {
                    passive: !0
                }), window.debuglogInit && debuglogInit(), !vk.id && ls.checkVersion() && ls.get("last_reloaded")) try {
                var n = {};
                each(["sound_notify_off", "im_ui_notify_off"], function() {
                    var e = ls.get(this);
                    null !== e && (n[this] = e)
                }), window.localStorage.clear(), each(n, function(e, t) {
                    ls.set(e, t)
                })
            } catch (e) {}
            if (Math.random() < 1e-4 && window.performance && performance.timing && performance.timing.navigationStart) {
                var i = (new Date).getTime() - performance.timing.navigationStart;
                statlogsValueEvent("page_load", i, "domReady")
            }
        }
    }, window.onDomReady = function(e) {
        e()
    }, window.hab = new HistoryAndBookmarks({
        onLocChange: function(e) {
            var t = {
                back: !0,
                hist: !0
            };
            3 == vk.al && history.state && isObject(history.state) && (t.scrollTop = intval(history.state.scrollTop)), nav.go("/" + e, void 0, t)
        }
    }), window.leftBlockOver = function(e) {
        var t = 1;
        e.id || (e = ge("left_hide" + e), t = 0), !t && e.timer || (e.showing ? removeAttr(e, "showing") : (animate(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), removeAttr(e, "timer"))
    }, window.leftBlockOut = function(e) {
        var t = .5;
        e.id || (e = ge("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            animate(e, {
                opacity: t
            }, 200), removeAttr(e, "timer")
        }, 1)
    }, window.leftBlockHide = function(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: updSeenAdsInfo
        }), hide("left_block" + e)
    }, window.hideNewsAnnounce = function(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), hide("news_announce_" + e)
    }, window.leftAdBlockClose = function(e, t) {
        function o() {
            animate("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, n)
        }

        function n() {
            setStyle("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        setStyle("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: function(t) {
                if (!t.done) return;
                if ("ya_direct" == e) return animate(e, {
                    opacity: 0
                }, 200, function() {
                    re("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(vk__adsLight.yaDirectAdActive = !1);
                var n = ge("ads_ad_close_info_" + e);
                if (!n) return !1;
                setStyle(n, {
                    opacity: 0
                }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
            }
        })
    }, window.leftBlockFriendHide = function(e, t, o) {
        var n = ge("left_friends");
        if (n) {
            var i = geByClass("left_friend_block", n),
                r = [];
            for (var a in i) {
                var s = i[a].id.split("_");
                r.push(s[2])
            }
            var c = {
                act: "hide_block",
                block: t,
                showed: r.join(","),
                hash: o
            };
            ajax.post("al_index.php", c, {
                onDone: function(e) {
                    if (e) {
                        var t = se(e);
                        geByClass("left_friend_block", n).length >= 2 && hide(t), n.insertBefore(t, geByClass1("left_friend_all_link", n))
                    }
                    geByClass("left_friend_block", n).length || hide("left_friend_all_link")
                }
            });
            var l = ge("left_block" + e),
                d = i.pop();
            d && !isVisible(d) ? (show(d), l.parentNode.replaceChild(d, l)) : re(l)
        }
    }, window.leftBlockToggleFriend = function(e, t, o, n, i) {
        n && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
            act: n ? "add" : "remove",
            mid: e,
            mf_type: t,
            hash: o,
            from: "leftblock"
        }, {
            onDone: function(t, o, n) {
                if (!t) return nav.reload();
                var i = ge("left_friend_status_" + e);
                cleanElems(i.firstChild), t ? (show(i), val(i, t)) : hide(i), o && (ajax.preload("al_friends.php", {
                    act: "friend_tt",
                    mid: e
                }, [o, n]), setTimeout(leftBlockFriendTooltip, 0))
            },
            showProgress: function() {
                var t = (ge("left_friend_subscribed") || {}).tt;
                t && (t.hide({
                    fasthide: 1
                }), t.destroy()), ge("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
            },
            hideProgress: function() {
                hide("left_friend_status_" + e)
            },
            onFail: function(e) {
                if (e) return showFastBox({
                    title: getLang("global_error")
                }, e), !0
            }
        }), cancelEvent(i)
    }, window.leftBlockFriendTooltip = function() {
        return showTooltip(ge("left_friend_subscribed"), {
            url: "al_friends.php",
            params: {
                act: "friend_tt",
                mid: cur.mfid,
                from: "leftblock"
            },
            slide: 15,
            hidedt: 500,
            shift: [40, -1, 3],
            className: "preq_tt",
            forcetodown: !0
        })
    }, window.leftBlockUnpaidGiftsHide = function(e, t) {
        return showFastBox({
            title: getLang("left_delete_unpaid_gifts_title")
        }, getLang("left_delete_unpaid_gifts_text"), getLang("global_delete"), function() {
            leftBlockHide(e, t), re("payments_box_unpaid_gifts_info"), curBox().hide()
        }, getLang("global_cancel"))
    }, window.comScoreUDM = function(e, t) {
        vk.zero || (t = t || document.referrer, vkImage().src = locProtocol + "//" + ("https:" == locProtocol ? "sb" : "b") + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + escape(e) + "&c5=&c7=" + escape(e) + "&c9=" + escape(t) + "&c15=&cv=2.0&cj=1&rn=" + Math.random())
    }, window.updateOtherCounters = function(e, t) {
        if (!vk.zero && !__dev) {
            t = t || document.referrer;
            for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; ++n)
                if (e.match(o[n])) return;
            var i = [
                    [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                    [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                ],
                r = {
                    referrer: t,
                    url: e
                };
            each(r, function(e, t) {
                each(i, function() {
                    r[e] = r[e].replace(this[0], this[1])
                })
            }), t = r.referrer, e = r.url, vkImage().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + (void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) + ";u" + escape(e) + ";" + Math.random(), vkImage().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" == vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" == vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" == vk.tnsPixelType && (vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), comScoreUDM(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }, window.handlePageView = function(e) {
        var t = ge("footer_wrap"),
            o = geByClass1("top_home_link"),
            n = void 0 === e.width ? vk.width : e.width,
            i = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            r = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if (vk.noleftmenu == e.noleftmenu && vk.nobottommenu == e.nobottommenu && vk.width == e.width && vk.width_dec_footer == e.width_dec_footer || (vk.noleftmenu != e.noleftmenu && e.noleftmenu && hide("side_bar"), vk.nobottommenu != e.nobottommenu && (e.nobottommenu ? hide("bottom_nav") : show("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (addClass(t, "simple"), t.style.width = "auto") : t && (removeClass(t, "simple"), t.style.width = n - r + "px")), vk.notopmenu != e.notopmenu && (e.notopmenu ? hide("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : show("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), o && vk.top_home_link_class != e.top_home_link_class && (o.className = e.top_home_link_class), n != vk.width || i != vk.width_dec) {
            ge("page_layout").style.width = n + "px", ge("page_header").style.width = n + "px", ge("page_body").style.width = n - i + "px", ge("ts_wrap") && hasClass(ge("ts_wrap"), "vk") && (ge("ts_wrap").style.width = n - 191 + "px"), setTimeout(updSideTopLink.pbind(!0), 0), setTimeout(updateSTL, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
        }
        vk.noleftmenu == e.noleftmenu || e.noleftmenu || show("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = n, vk.width_dec = i, vk.width_dec_footer = r, vk.body_class = e.body_class, vk.staticheader = intval(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }, window.handleSetCount = function(e, t, o) {
        var n = "",
            i = "",
            r = "spr" == o ? 5 : 3,
            a = '<span class="inl_bl left_count_sign"></span>',
            s = geByClass1("left_count_wrap", e),
            c = hasClass(geByClass1("left_row", e, "a"), "left_nav_over"),
            l = geByClass1("left_count", e, "span"),
            d = val(l);
        t && ((n = t.toString()).length > r && (i = ' title="' + stripHTML(langNumeric(t, "%s", !0)) + '"', n = ".." + n.substr(n.length - r)), a = '<span class="inl_bl left_count" ' + i + ">" + (n = n) + "</span>");
        var u = function() {
            val(s, a), (t ? removeClass : addClass)(s, "left_void"), setStyle(s, {
                opacity: ""
            })
        };
        if (d || c)
            if (n) animateCount(l, n, {
                str: "auto",
                onDone: u
            });
            else if (c) {
            var p = bodyNode.appendChild(se('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>'));
            plusWidth = getSize(domFC(p))[0], re(p), d && "." == d.charAt(0) && val(l, d.replace("..", "")), animate(l, {
                width: plusWidth
            }, 100, u)
        } else animate(s, {
            opacity: 0
        }, 100, u);
        else u(), setStyle(s, {
            opacity: 0
        }), animate(s, {
            opacity: 1
        }, 100)
    }, vk.counts = {}, window.handlePageParams = function(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), updateSTL(), updateLeftMenu(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, statlogsValueEvent("page_scroll", 0, cur.module, "0")
        }, 300), handlePageView(e);
        var t = ge("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = intval(e.nophone), vk.staticheader = intval(e.staticheader), vk.id) {
            var o = ge("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && __adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var n = locProtocol + "//" + location.host + "/";
        e.loc && ("?" == e.loc.charAt(0) ? n += nav.strLoc : n += e.loc);
        var i = document.URL == n ? "" : document.URL;
        if (setTimeout(updateOtherCounters.pbind(n, i), 10), e.counters) {
            var r = (e.counters || "").split(","),
                a = "",
                s = "";
            intval(r[9]) > 0 ? (a = "adsmarket", s = "act=overview&status=-1") : intval(r[9]) < -1 ? (r[9] = 1, a = "ads", s = "act=a_comeback_office_redirect") : a = "ads?act=office&last=1";
            var c = 0,
                l = ge("l_set"),
                d = l && l.nextSibling || !1,
                u = !1,
                p = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                _ = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", a, "feed" + (ge("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                h = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", s, ge("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"];
            if (e.handlecnts) {
                for (; c < p.length; ++c) handlePageCount(p[c], r[c], _[c], h[c]);
                for (var f = d.nextSibling; f; f = f.nextSibling) {
                    if (f.tagName && "li" == f.tagName.toLowerCase() && isVisible(f)) {
                        u = !0;
                        break
                    }
                    if (hasClass(f, "more_div")) break
                }(u ? show : hide)(d);
                for (var w = r.length; c < w; ++c) {
                    var v = r[c].split(":");
                    (f = ge("l_app" + intval(v[0]))) && handleSetCount(f, intval(v[1]))
                }
                setTimeout(updSeenAdsInfo, 0)
            } else
                for (; c < p.length; ++c) vk.counts[p[c]] = r[c]
        }
    }, window.handlePageCount = function(e, t, o, n) {
        var i = intval(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== i)
            if (vk.counts[e] = i, "ntf" != e) {
                var r, a = ge("l_" + e),
                    s = hasClass(domFC(a), "left_nav_over");
                a && (handleSetCount(a, i > 0 ? i : 0, e), n && o && (r = i > 0 && n ? "?" + n : "", a.firstChild.href = "/" + o + r)), (i >= 0 || !s) && toggle(a, i >= 0)
            } else TopNotifier.setCount(i > 0 ? i : 0)
    }, window.processDestroy = function(e) {
        if (e._back && e._back.hide && e == cur)
            for (var t in e._back.hide) try {
                e._back.hide[t]()
            } catch (e) {
                try {
                    console.log(e.stack)
                } catch (e) {}
            }
        if (e.destroy && e.destroy.length)
            for (var t in e.destroy) try {
                e.destroy[t](e)
            } catch (e) {
                try {
                    console.log(e.stack)
                } catch (e) {}
            }
    }, window.globalHistory = [], window.globalHistoryDestroy = function(e) {
        for (var t = 0, o = globalHistory.length; t < o; ++t)
            if (globalHistory[t].loc == e) {
                var n = globalHistory.splice(t, 1)[0];
                processDestroy(n.cur), n.content.innerHTML = "", --t, --o
            }
    }, window.showBackLink = function(e, t, o) {
        var n = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var i = 0, r = globalHistory.length; i < r; ++i)
                if (globalHistory[i].loc == e) {
                    o = 1;
                    break
                }
        if (n) {
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
            extend(_tbLink, {
                href: "/" + e,
                innerHTML: t,
                fast: o
            }), show(_tbLink), _stlWas = 0
        } else hide(_tbLink);
        updSideTopLink(1)
    }, window.reloadCheckFlood = function(e) {
        e = e || {};
        var t = ls.get("last_reloaded") || [],
            o = 1;
        return t.unshift(vkNow()), (o = t.length) > 5 && (t.splice(5, o - 5), o = 5), ls.set("last_reloaded", t), !!(5 == o && t[0] - t[4] < 2e4) && (topError('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0)
    }, window.nav = {
        getData: function(e) {
            if (e.length) {
                for (var t in navMap) {
                    if ("<" != t[0])
                        if (e.match(new RegExp("^" + t, "i"))) return {
                            url: navMap[t][0],
                            files: navMap[t][1]
                        }
                }
                return e.match(/^[a-z0-9\-_]+\.php$/i) ? {
                    url: e
                } : {
                    url: navMap["<other>"][0],
                    files: navMap["<other>"][1]
                }
            }
            return {
                url: navMap["<void>"][0],
                files: navMap["<void>"][1]
            }
        },
        reload: function(e) {
            if (!reloadCheckFlood(e)) {
                e = e || {};
                var t = nav.strLoc.replace(/^\/+/g, "");
                e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), nav.go("/" + t, void 0, extend({
                    nocur: !0
                }, e)))
            }
        },
        link: function(e, t) {
            if (checkEvent(t) || cur.noAjaxNav) {
                e = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                window.open(e)
            } else nav.go(e)
        },
        go: function go(loc, ev, opts) {
            var newLink, postParams, postOptions;
            if (opts = opts || {}, loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                newLink = loc.href, postParams = nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)), postOptions = nav.mergePostParamsOptions(postParams, opts.params);
                var extraQuery = {};
                return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + ajx2q(extraQuery)), location.href = newLink, !1
            }
            if (!checkEvent(ev) && !cur.noAjaxNav) {
                if (LongView.onBeforePageChange(), loc.tagName && "a" == loc.tagName.toLowerCase()) {
                    if ("_blank" == loc.target || nav.baseBlank) return;
                    var _params = loc.getAttribute("hrefparams");
                    if (_params && (opts.params = extend(opts.params || {}, q2ajx(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                }
                var strLoc = "",
                    objLoc = {},
                    changed = {};
                "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = nav.toStr(loc), objLoc = loc), statDurationsLoadImage(), statNavigationTiming();
                var ap = getAudioPlayer();
                if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                    for (var i in changed = clone(objLoc), nav.objLoc) nav.objLoc[i] == changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1);
                    if (!1 === zNav(clone(changed), {
                            hist: opts.hist,
                            asBox: opts.asBox,
                            onDone: opts.onDone
                        }, objLoc)) return nav.setLoc(strLoc), !1;
                    var isHandled = articleNav(strLoc, nav.toStr(nav.objLoc), opts.back, opts.postId);
                    if (isHandled) return nav.setLoc(strLoc), (nav.objLoc.z || nav.objLoc.w) && zNav({
                        z: nav.objLoc.z,
                        w: nav.objLoc.w
                    }, {}), !1
                }
                if (!opts.nocur && (vk.loaded || !changed[0]))
                    for (var curnav = cur.nav || [], i = curnav.length - 1; i >= 0; i--) {
                        var oldUrl = document.URL;
                        if (!1 === curnav[i](clone(changed), nav.objLoc, objLoc, opts)) {
                            var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                referrer = oldUrl == currentURL ? "" : oldUrl;
                            return setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10), !1
                        }
                    }
                if (4 == vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                    location.href = "/" + (strLoc || "").replace("%23", "#")
                }, 0), !1;
                if (_topHeaderClose(), opts.back) {
                    if (cur._back && cur._back.onBack) return cur._back.onBack();
                    for (var i = 0, l = globalHistory.length; i < l; ++i)
                        if (globalHistory[i].loc == strLoc) {
                            var h = globalHistory.splice(i, 1)[0],
                                wNode = ge("wrap3"),
                                tNode = ge("title"),
                                onback = cur._onback;
                            return window.tooltips && tooltips.destroyAll(), hide("audio_tip_wrap"), processDestroy(cur), radioBtns = h.radioBtns, ajaxCache = h.ajaxCache, PageID = h.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), showBackLink(), cur = h.cur, setTimeout(function() {
                                if (wNode.innerHTML = "", wNode.parentNode.replaceChild(h.content, wNode), vk.width == h.width && vk.width_dec_footer == h.width_dec_footer || handlePageView(h), scrollToY(h.scrollTop, 0), setDocumentTitle(h.htitle), tNode.innerHTML = h.title, h.bodyClass !== bodyNode.className && (bodyNode.className = h.bodyClass || "", vk.body_class = h.bodyClass || ""), setStyle(tNode.parentNode, "display", h.hideHeader ? "none" : "block"), cur._back.show)
                                    for (var e = 0, t = cur._back.show.length; e < t; ++e) cur._back.show[e]();
                                if (onback)
                                    for (e = 0, t = onback.length; e < t; ++e) onback[e]();
                                nav.setLoc(strLoc);
                                var o = h.back || {};
                                setTimeout(function() {
                                    showBackLink(o[0], o[1], o[2]), (nav.objLoc.z || nav.objLoc.w) && zNav({
                                        z: nav.objLoc.z,
                                        w: nav.objLoc.w
                                    }, {}), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear()
                                }, 10), getAudioPlayer().updateCurrentPlaying()
                            }, 10), !1
                        }
                }
                var dest = objLoc[0];
                delete objLoc[0];
                var where = nav.getData(dest);
                opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = extend(opts.params || {}, {
                    _ref: nav.objLoc[0] || ""
                })), where.files && stManager.add(where.files), where.params = extend({
                    __query: dest,
                    al_id: vk.id
                }, objLoc, opts.params || {});
                var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null;
                postParams = nav.getPostParams(postParamsEl, !!where.params._post_click_type), where.params = nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                var curNavVersion = ++NextPageID,
                    done = function done(title, html, js, params) {
                        if (curNavVersion === NextPageID) {
                            try {
                                params._id = params.id
                            } catch (e) {
                                return topError(e, {
                                    dt: 15,
                                    type: 6,
                                    msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                    url: where.url,
                                    query: ajx2q(where.params),
                                    answer: arguments.length
                                })
                            }
                            if (window.lastScrollTop = scrollGetY(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                if (nav.setLoc(params.loc || nav.strLoc), reloadCheckFlood({
                                        force: !0,
                                        from: 4
                                    })) return;
                                location.reload(!0)
                            } else {
                                var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                    _back = cur._back,
                                    wNode = ge("wrap3"),
                                    tNode = ge("title"),
                                    hist = !1;
                                if ((strLoc == (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && showBackLink()), window.tooltips && tooltips.destroyAll(), each(geByClass("page_actions_wrap"), function() {
                                        hide(this)
                                    }), hide("audio_tip_wrap"), _back) {
                                    if (revertLastInlineVideo(), hist = {
                                            loc: _back.loc || nav.strLoc,
                                            cur: cur,
                                            radioBtns: radioBtns,
                                            ajaxCache: ajaxCache,
                                            pid: PageID,
                                            scrollTop: scrollGetY(),
                                            htitle: document.title.toString(),
                                            width: vk.width,
                                            width_dec: vk.width_dec,
                                            width_dec_footer: vk.width_dec_footer,
                                            noleftmenu: vk.noleftmenu,
                                            notopmenu: vk.notopmenu,
                                            nobottommenu: vk.nobottommenu,
                                            bodyClass: vk.body_class,
                                            back: !!_tbLink.loc && [_tbLink.loc, val(_tbLink), _tbLink.fast]
                                        }, tNode && tNode.parentNode && !isVisible(tNode.parentNode) && (hist.hideHeader = !0), globalHistoryDestroy(hist.loc), globalHistory.length > 2) {
                                        var h = globalHistory.shift();
                                        processDestroy(h.cur), h.content.innerHTML = ""
                                    }
                                    if (cur._back.hide)
                                        for (var i = 0, l = cur._back.hide.length; i < l; ++i) cur._back.hide[i]();
                                    _back.text && showBackLink(hist.loc, _back.text, 1)
                                } else _tbLink && (_tbLink.fast = 0), processDestroy(cur);
                                if (PageID = NextPageID, each(radioBtns, function(e, t) {
                                        t.keep || delete radioBtns[e]
                                    }), ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), cur = {
                                        destroy: [],
                                        nav: []
                                    }, _stlWas = 0, newPage) {
                                    for (cleanElems("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                        var h = globalHistory.shift();
                                        processDestroy(h.cur), h.content.innerHTML = ""
                                    }
                                    var oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                    pageNode.innerHTML = html, oldTopW && !vk.staticheader && updateHeaderStyles({
                                        width: oldTopW
                                    }), _tbLink = ge("top_back_link");
                                    try {
                                        _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                    } catch (e) {}
                                    browser.mobile || onBodyResize(!0)
                                } else {
                                    if (_back) {
                                        var newW = ce("div", {
                                            id: "wrap3"
                                        });
                                        extend(hist, {
                                            content: wNode.parentNode.replaceChild(newW, wNode),
                                            title: tNode.innerHTML
                                        }), globalHistory.push(hist), wNode = newW
                                    }
                                    var oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                    wNode.innerHTML = html, oldTopW && !vk.staticheader && updateHeaderStyles({
                                        width: oldTopW
                                    }), tNode.innerHTML = title, (title ? show : hide)(tNode.parentNode), getAudioPlayer().updateCurrentPlaying()
                                }
                                checkPageBlocks(), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear(), window.LazyLoad && LazyLoad.scanDelayed(), handlePageParams(params), opts.preventScroll || (opts.scrollTop > 0 ? scrollToY(opts.scrollTop, 0) : opts.noscroll || params.noscroll || scrollToTop(0)), opts.bench && (ajax.tRender = (new Date).getTime()), nav.curLoc = params.loc, js && eval("(function(){" + js + ";})()"), ajax._framenext(), opts.onDone && opts.onDone(), browser.mobile && onBodyResize(), changed.f && handleScroll(changed.f), nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), lTimeout(function() {
                                    getAudioPlayer().updateCurrentPlaying(), TopMenu.toggle(!1)
                                }, browser.chrome ? 100 : 50)
                            }
                        }
                    };
                return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), updSeenAdsInfo(), __adsUpdate("already"), "im" !== nav.objLoc[0] && "im" !== changed[0] || (where.params = extend({}, where.params, {
                    _full_page: !0
                })), ajax.post(where.url, where.params, {
                    onDone: function() {
                        var e = arguments;
                        if (__debugMode) done.apply(null, e);
                        else try {
                            done.apply(null, e)
                        } catch (t) {
                            topError(t, {
                                dt: 15,
                                type: 6,
                                url: where.url,
                                query: ajx2q(where.params),
                                js: e[2],
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            })
                        }
                    },
                    onFail: opts.onFail || function(e) {
                        if (e) return setTimeout(showFastBox({
                            title: getLang("global_error")
                        }, e).hide, __debugMode ? 3e4 : 3e3), !0
                    },
                    frame: opts.noframe ? 0 : 1,
                    canReload: !0,
                    showProgress: opts.showProgress || showTitleProgress,
                    hideProgress: opts.hideProgress || hideTitleProgress,
                    cache: opts.search ? 1 : "",
                    bench: opts.bench
                }), !1
            }
        },
        setLoc: function(e) {
            "string" == typeof e ? (nav.strLoc = e, nav.objLoc = nav.fromStr(e)) : (nav.strLoc = nav.toStr(e), nav.objLoc = e), hab.setLoc(nav.strLoc)
        },
        change: function(e, t, o) {
            var n = clone(nav.objLoc);
            return each(e, function(e, t) {
                !1 === t ? delete n[e] : n[e] = t
            }), nav.go(n, t, o)
        },
        fromStr: function(e) {
            var t = (e = e.split("#"))[0].split("?"),
                o = {
                    0: t[0] || ""
                };
            return e[1] && (o["#"] = e[1]), extend(q2ajx(t[1] || ""), o)
        },
        toStr: function(e) {
            var t = (e = clone(e))["#"] || "",
                o = e[0] || "";
            delete e[0], delete e["#"];
            var n = ajx2q(e);
            return (n ? o + "?" + n : o) + (t ? "#" + t : "")
        },
        init: function() {
            nav.strLoc = hab.getLoc(), nav.objLoc = nav.fromStr(nav.strLoc)
        },
        getPostParams: function(e, t) {
            var o = {};
            if (!!(!e || !e.getAttribute)) return o;
            var n = e.getAttribute("data-post-id");
            n && (o.post_id = n);
            var i = e.getAttribute("data-parent-post-id");
            i && (o.parent_post_id = i);
            var r = e.getAttribute("data-post-click-type");
            r && (o.post_click_type = r);
            var a = e.getAttribute("mention_id");
            a && (o.post_click_mention_id = a);
            var s = [e.getAttribute("href"), e.getAttribute("data-href")];
            if (each(s, function(e, t) {
                    if (t && "#" !== t) return o.post_click_url = t, !1
                }), !!r || t) {
                var c = gpeByClass("_ads_promoted_post_data_w", e),
                    l = c && c.getAttribute("data-ad"),
                    d = c && c.getAttribute("data-ad-block-uid");
                l && (o.ad_data = l), d && (o.ad_block_unique_id = d)
            }
            return o
        },
        mergePostParamsOptions: function(e, t) {
            if (t = t || {}, !e) return t;

            function o(e, o, n) {
                var i = n && t[o];
                return !(!e || i) && (t[o] = e, !0)
            }
            return o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && (o(e.post_click_mention_id, "_post_click_mention_id", !0), o(e.post_click_url, "_post_click_url", !0), o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id")), t
        }
    }, nav.init(), vk.time && !browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 == t[1] && 12 == vk.time[1] ? vk.time[1] = 0 : 12 == t[1] && 1 == vk.time[1] ? t[1] = 0 : (t[1] > vk.time[1] + 1 || vk.time[1] > t[1] + 1) && (t[1] = vk.time[1] = t[2] = vk.time[2] = 0), t[1] > vk.time[1] && 1 == t[2] ? 31 == vk.time[2] || (4 == vk.time[1] || 6 == vk.time[1] || 9 == vk.time[1] || 11 == vk.time[1]) && 30 == vk.time[2] || 2 == vk.time[1] && (29 == vk.time[2] || 28 == vk.time[2] && vk.time[0] % 4) ? vk.time[2] = 0 : vk.time[2] = t[2] = 0 : vk.time[1] > t[1] && 1 == vk.time[2] && (31 == t[2] || (4 == t[1] || 6 == t[1] || 9 == t[1] || 11 == t[1]) && 30 == t[2] || 2 == t[1] && (29 == t[2] || 28 == t[2] && vk.time[0] % 4) ? t[2] = 0 : t[2] = vk.time[2] = 0), (t[2] > vk.time[2] + 1 || vk.time[2] > t[2] + 1) && (t[2] = vk.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - vk.time[2]) + (t[3] - vk.time[3])) + (t[4] - vk.time[4]));
        o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o),
            r = [-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13];
        for (var a in r) {
            var s = Math.round(3600 * (r[a] - 3)),
                c = Math.abs(o - s);
            c < i && (i = c, n = s)
        }
        vk.dt = n, getCookie("remixdt") != vk.dt && setCookie("remixdt", vk.dt, 365);
        var l = intval(getCookie("remixrt"));
        window.devicePixelRatio >= 2 && (!browser.iphone || getCookie("remixme")) ? 1 & l || (setCookie("remixrt", 1 | l, 365), window._retinaInit = function() {
            stManager.add(["retina.css"]), addClass(document.body, "is_2x")
        }, window._initedCheck && window._retinaInit()) : 1 & l && setCookie("remixrt", 1 ^ l, 365)
    }, 0), window.dispatchIntro = function(e, t) {
        "undefined" != typeof dispatchIntroEvent && dispatchIntroEvent(e, t)
    }, window.__phCheck = function(e, t, o, n) {
        t = t || {};
        var i = e.phshown,
            r = e.phcont,
            a = t.back,
            s = t.editable,
            c = t.phColor || "#8C8E91",
            l = t.activeColor || "#C0C8D0",
            d = t.hideBackAfter,
            u = t.timeout || 0 === t.timeout ? t.timeout : 100,
            p = t.period || 200;
        if (s) var _ = (void 0 !== e.textContent ? e.textContent : e.innerText) || geByTag("img", e).length;
        else _ = e.value;
        if (i && (a && _ || !a && (o && !o.type || _)) ? (hide(r), e.phshown = !1) : i || _ || !a && !n || (show(r), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), a && !_) {
            if (o && !o.type) {
                var h = d ? hide.pbind(r.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    animate(r.firstChild.firstChild, {
                        color: l
                    }, p, h)
                }, u)
            }
            n && (clearTimeout(e.phanim), d && show(r.firstChild.firstChild), e.phanim = setTimeout(function() {
                animate(r.firstChild.firstChild, {
                    color: c
                }, p)
            }, u))
        }
    }, window.placeholderSetup = function(e, t) {
        var o, n = ge(e),
            i = !1,
            r = t ? clone(t) : {};
        if (n && (!n.phevents || r.reload) && (o = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder)) {
            n.removeAttribute("placeholder");
            var a = {},
                s = ["Top", "Bottom", "Left", "Right"];
            if (r.pad) a = r.pad;
            else {
                if (r.fast) {
                    for (var c = 0; c < 4; ++c) a["padding" + s[c]] = 3, a["margin" + s[c]] = 0, a["border" + s[c] + "Width"] = 1;
                    extend(a, r.styles || {})
                } else {
                    var l = [];
                    for (c = 0; c < 4; ++c) l.push("margin" + s[c]), l.push("padding" + s[c]), l.push("border" + s[c] + "Width");
                    a = getStyle(n, l)
                }
                for (c = 0; c < 4; ++c) {
                    var d = "margin" + s[c],
                        u = "border" + s[c] + "Width";
                    a[d] = intval(a[d]) + intval(a[u]) + "px", delete a[u]
                }
            }
            if (r.reload) {
                var p = n.previousSibling;
                p && hasClass(p, "input_back_wrap") && re(p)
            }
            var _ = n.phcont = n.parentNode.insertBefore(ce("div", {
                    className: "input_back_wrap no_select",
                    innerHTML: '<div class="input_back"><div class="input_back_content' + (r.big ? " big" : "") + '" style="width: ' + (getSize(n)[0] - 20) + 'px;">' + o + "</div></div>"
                }), n),
                h = domFC(_);
            domFC(h);
            setStyle(h, a);
            var f = __phCheck.pbind(n, r),
                w = browser.mobile ? f : function(e, t) {
                    setTimeout(f.pbind(e, t), 0)
                };
            browser.msie && browser.version < 8 && setStyle(h, {
                marginTop: 1
            }), n.phonfocus = function(e) {
                i || (n.focused = !0, cur.__focused = n, !0 === e && (setStyle(n, {
                    backgroundColor: "#FFF"
                }), hide(h)), w(!0, !1))
            }, n.phonblur = function() {
                i || (cur.__focused = n.focused = !1, show(h), w(!1, !0))
            }, n.phshown = !0, n.phanim = null, (n.value || r.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || geByTag("img", n).length)) && (n.phshown = !1, hide(_)), browser.opera_mobile || (addEvent(_, "focus click", function(e) {
                i || (r.editableFocus ? (setTimeout(r.editableFocus.pbind(n), 0), n.phonfocus()) : (n.blur(), n.focus()))
            }), addEvent(n, "focus" + (r.editable ? " click" : ""), n.phonfocus), addEvent(n, "keydown paste cut input", w)), addEvent(n, "blur", n.phonblur), n.check = w, n.getValue = function() {
                return r.editable ? n.innerHTML : n.value
            }, n.setPlaceholder = function(e) {
                geByClass1("input_back_content", _).textContent = e
            }, n.setDisabled = function(e) {
                i = e
            }, n.setValue = function(e) {
                r.editable ? n.innerHTML = e : n.value = e, __phCheck(n, r)
            }, n.phevents = !0, n.phonsize = function() {}, r.global || r.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                for (var t = 0, o = e.length; t < o; ++t) removeData(e[t])
            }.pbind(cur.__phinputs))), cur.__phinputs.push(n))
        }
    }, window.isInputActive = function() {
        return document.activeElement && (attr(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }, window.placeholderInit = function(e, t) {
        var o, n = ge(e),
            i = t ? clone(t) : {},
            r = void 0 === ce("input").placeholder || n && n.getAttribute && n.getAttribute("contenteditable");
        if (n && (!n.phevents || i.reload) && (o = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder) && (n.getValue = function() {
                return i.editable ? n.innerHTML : n.value
            }, n.setValue = function(e) {
                i.editable ? n.innerHTML = e : n.value = e, r && u(n, i)
            }, n.phonfocus = function() {}, n.phonblur = function() {}, r)) {
            if (n.removeAttribute("placeholder"), i.reload) {
                var a = domNS(n);
                a && hasClass(a, "placeholder") && re(a)
            }
            var s = n.phcont = domInsertAfter(ce("div", {
                    className: "placeholder",
                    innerHTML: '<div class="ph_input"><div class="ph_content">' + o + "</div></div>"
                }), n),
                c = domFC(s),
                l = (domFC(c), u.pbind(n, i)),
                d = browser.mobile ? l : function(e, t) {
                    setTimeout(l.pbind(e, t), 0)
                };
            n.phonfocus = function(e) {
                n.focused = !0, cur.__focused = n, d(!0, !1)
            }, n.phonblur = function() {
                cur.__focused = n.focused = !1, d(!1, !0)
            }, n.phshown = !0, (n.value || i.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || geByTag("img", n).length)) && (n.phshown = !1, hide(s)), browser.opera_mobile || (addEvent(s, "focus click contextmenu", function(e) {
                i.editableFocus ? (setTimeout(i.editableFocus.pbind(n), 0), "contextmenu" === e.type && browser.msie && i.editableFocus(n), n.phonfocus()) : (n.blur(), n.focus())
            }), addEvent(n, "focus" + (i.editable ? " click" : ""), n.phonfocus), addEvent(n, "keydown paste cut input", d)), addEvent(n, "blur", n.phonblur), n.check = d, n.phevents = !0, n.phonsize = function() {}, i.global || i.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                if (cur.__phinputs)
                    for (var e = 0, t = cur.__phinputs.length; e < t; ++e) removeData(cur.__phinputs[e])
            })), cur.__phinputs.push(n))
        }

        function u(e, t, o, n) {
            t = t || {};
            var i = e.phshown,
                r = e.phcont;
            if (t.editable)(a = void 0 !== e.textContent ? e.textContent : e.innerText) && browser.opera && a.match(/^[ ]+$/) && (a = ""), a || (a = geByTag("img", e).length > 0), a || (a = geByTag("br", e).length > 1), a || (a = geByTag("p", e).length > 1);
            else var a = e.value;
            if (i && a) hide(r), e.phshown = !1;
            else if (!i && !a) {
                var s = function() {
                    show(r), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))
                };
                browser.msie ? setTimeout(s, 0) : s()
            }
        }
    }, window._message_box_guid = 0, window._message_boxes = [], window._show_flash_timeout = 0, window.__bq = window.boxQueue = {
        hideAll: function(e, t) {
            if (e)
                for (; __bq.count();) __bq.hideLast();
            else {
                if (__bq.count())(o = _message_boxes[__bq._boxes.pop()])._in_queue = !1, o._hide(!1, !1, t);
                for (; __bq.count();) {
                    var o;
                    (o = _message_boxes[__bq._boxes.pop()])._in_queue = !1
                }
            }
        },
        hideLast: function(e, t) {
            if (__bq.count()) {
                var o = _message_boxes[__bq._boxes[__bq.count() - 1]];
                if (!0 === e && (o.changed || __bq.skip || t && t.target && t.target.tagName && "input" != t.target.tagName.toLowerCase() && cur.__mdEvent && t.target != cur.__mdEvent.target)) return void(__bq.skip = !1);
                o.hide()
            }
            if (t && "click" == t.type) return cancelEvent(t)
        },
        hideBGClick: function(e) {
            e && e.target && /^box_layer/.test(e.target.id) && __bq.hideLast()
        },
        count: function() {
            return __bq._boxes.length
        },
        _show: function(e) {
            var t = _message_boxes[e];
            if (t && !t._in_queue) {
                __bq.count() ? _message_boxes[__bq._boxes[__bq.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                var o = !!__bq.count();
                __bq.curBox = e, t._show(o || __bq.currHiding, o), __bq._boxes.push(e)
            }
        },
        _hide: function(e) {
            var t = _message_boxes[e];
            if (t && t._in_queue && __bq._boxes[__bq.count() - 1] == e && t.isVisible() && (t._in_queue = !1, __bq._boxes.pop(), t._hide(!!__bq.count()), __bq.count())) {
                var o = __bq._boxes[__bq.count() - 1];
                __bq.curBox = o, _message_boxes[o]._show(!0, !0, !0)
            }
        },
        _boxes: [],
        curBox: 0
    }, __bq.hideLastCheck = __bq.hideLast.pbind(!0), window.curBox = function() {
        var e = _message_boxes[__bq.curBox];
        return e && e.isVisible() ? e : null
    }, browser.mobile || addEvent(document, "keydown", function(e) {
        if (_wf = 1, e.keyCode == KEY.ESC && __bq.count() && !cur._noEscHide) return __bq.hideLast(), -1;
        if (e.keyCode == KEY.ESC && window.articleCloseImageFullSize && articleCloseImageFullSize()) return cancelEvent(event);
        if (e.keyCode == KEY.ESC && cur.articleLayer) return cur.articleLayer.close(!0), cancelEvent(event);
        if (e.keyCode == KEY.ESC) return cancelStackPop(), cancelEvent(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(KEY.LEFT), t.push(KEY.RIGHT)), each(t, function(t, n) {
            if (e.keyCode == n) return o = !0, !1
        }), o && getAudioPlayer().onMediaKeyPressedEvent(e), Chat.inited && 191 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac) && Chat.showFriends()
    }), window.boxRefreshCoords = function(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = browser.mobile ? intval(window.pageYOffset) : 0,
            n = getSize(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }, window.MessageBox = function(options, dark) {
        var defaults = {
            title: !1,
            titleControls: "",
            width: 450,
            height: "auto",
            animSpeed: 0,
            bodyStyle: "",
            grey: !1,
            selfDestruct: !0,
            progress: !1,
            hideOnBGClick: !1,
            hideButtons: !1,
            onShow: !1,
            onHideAttempt: !1,
            onBeforeHide: !1,
            onHide: !1,
            onClean: !1,
            onDestroy: !1
        };
        options = extend(defaults, options);
        var buttonsCount = 0,
            boxContainer, boxBG, boxLayout, boxTitleWrap, boxTitle, boxTitleControls, boxCloseButton, boxBody, boxControlsWrap, boxControls, boxButtons, boxProgress, boxControlsText, guid = _message_box_guid++,
            visible = !1,
            btns = {
                ok: [],
                cancel: []
            },
            boxTitleBck;
        options.progress || (options.progress = "box_progress" + guid);
        var controlsStyle = options.hideButtons ? ' style="display: none"' : "";
        boxContainer = ce("div", {
            className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
            innerHTML: '<div class="box_layout" onclick="__bq.skip=true;"><div class="box_title_wrap"><div class="box_x_button" aria-label="' + getLang("global_close") + '" tabindex="0" role="button"></div><div class="box_title_controls"></div><div class="box_title"></div></div><div class="box_body" style="' + options.bodyStyle + '"></div><div class="box_controls_wrap"' + controlsStyle + '><div class="box_controls"><table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table><div class="progress" id="' + options.progress + '"></div><div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div></div></div></div>"
        }, {
            display: "none"
        }), hide(boxContainer), boxLayout = domFC(boxContainer), boxTitleWrap = domFC(boxLayout), boxCloseButton = domFC(boxTitleWrap), boxTitle = domLC(boxTitleWrap), boxTitleControls = domNS(boxCloseButton), options.noCloseButton && hide(boxCloseButton), boxBody = domNS(boxTitleWrap), boxControlsWrap = domNS(boxBody), boxControls = domFC(boxControlsWrap), boxButtons = domFC(boxControls), boxProgress = domNS(boxButtons), boxControlsText = domNS(boxProgress), boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), boxRefreshCoords(boxContainer);
        var emitter = new EventEmitter;

        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, removeClass(boxBody, "box_no_title"), show(boxTitleWrap)) : (addClass(boxBody, "box_no_title"), hide(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), toggleClass(boxBody, "box_no_buttons", options.hideButtons), toggleClass(boxTitleWrap, "box_grey", options.grey), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
        }

        function _addButton(e, t, o, n) {
            ++buttonsCount;
            var i = "flat_button";
            "no" == o || "gray" == o ? (i += " secondary", o = "cancel") : o = "ok";
            var r = ce("button", {
                className: i,
                innerHTML: e,
                id: n
            });
            return boxButtons.rows[0].insertCell(0).appendChild(r), createButton(r, function() {
                emitter.emit(o, retBox), t.apply(null, arguments)
            }), btns[o].push(r), r
        }

        function setControlsText(e) {
            boxControlsText.innerHTML = e
        }

        function _removeButtons() {
            for (var e = boxButtons.rows[0]; e.cells.length;) cleanElems(e.cells[0]), e.deleteCell(0);
            btns.ok.length = btns.cancel.length = 0
        }
        var destroyMe = function() {
                isFunction(options.onClean) && options.onClean(), isFunction(options.onDestroy) && options.onDestroy(), _removeButtons(), cleanElems(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete _message_boxes[guid]
            },
            hideMe = function(e, t, o) {
                if (visible) {
                    visible = !1;
                    var n = !0 === e ? 0 : options.animSpeed;
                    options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), isFunction(options.onBeforeHide) && options.onBeforeHide(), _layerAnim && !e && layers.boxhide();
                    var i = function() {
                        __bq.currHiding == _message_boxes[guid] && (__bq.currHiding = !1), _layerAnim || _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : hide(boxContainer), isFunction(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (__bq.currHiding = _message_boxes[guid], fadeOut(boxContainer, n, i)) : i()
                }
            };

        function showMe(e, t, o) {
            if (!visible && _message_boxes[guid]) {
                visible = !0;
                var n = !0 === e || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), t || layers.boxshow(), __bq.currHiding) {
                    __bq.currHiding.shOther = !0;
                    var i = __bq.currHiding.bodyNode.parentNode.parentNode;
                    data(i, "tween").stop(!0)
                }
                n > 0 ? fadeIn(boxContainer, n) : show(boxContainer), boxRefreshCoords(boxContainer), options.onShow && options.onShow(o)
            }
        }
        addEvent(boxCloseButton, "click", __bq.hideLast);
        var retBox = _message_boxes[guid] = {
            guid: guid,
            _show: showMe,
            _hide: hideMe,
            bodyNode: boxBody,
            controlsTextNode: boxControlsText,
            titleWrap: boxTitleWrap,
            btns: btns,
            show: function() {
                return __bq._show(guid), this
            },
            progress: boxProgress,
            showCloseProgress: addClass.pbind(boxTitleWrap, "box_loading"),
            hideCloseProgress: removeClass.pbind(boxTitleWrap, "box_loading"),
            showProgress: function() {
                hide(boxControlsText), show(boxProgress)
            },
            hideProgress: function() {
                hide(boxProgress), show(boxControlsText)
            },
            hide: function(e) {
                return !(isFunction(options.onHideAttempt) && !options.onHideAttempt(e)) && (__bq._hide(guid), !0)
            },
            isVisible: function() {
                return visible
            },
            bodyHeight: function() {
                return getStyle(boxBody, "height")
            },
            content: function(e) {
                return options.onClean && options.onClean(), boxBody.innerHTML = e, boxRefreshCoords(boxContainer), boxContainer.focus(), refreshBox(), updateAriaElements(), this
            },
            emit: function(e, t) {
                emitter.emit(e, t)
            },
            addButton: function(e, t, o, n, i) {
                var r = _addButton(e, t || this.hide, o, i);
                return n ? r : this
            },
            setButtons: function(e, t, o, n) {
                var i = this.removeButtons();
                return e ? (i.addButton(e, t), o && i.addButton(o, n, "no"), i) : i.addButton(getLang("box_close"))
            },
            setControlsText: setControlsText,
            removeButtons: function() {
                return _removeButtons(), this
            },
            setBackTitle: function(e) {
                e ? (boxTitle.innerHTML = '<div class="back">' + getLang("global_box_title_back") + "</div>", geByClass1("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
            },
            destroy: destroyMe,
            getOptions: function() {
                return options
            },
            on: function(e, t) {
                emitter.on(e, t)
            },
            once: function(e, t) {
                emitter.once(e, t)
            },
            updateBoxCoords: function() {
                boxRefreshCoords(boxContainer)
            },
            setOptions: function(e) {
                if (options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), options = extend(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; ++o) {
                        var i = t[o].split(":");
                        i.length > 1 && i[0].length && (boxBody.style[trim(i[0])] = trim(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(trim(i[0]), trim(i[1]), ""))
                    }
                return options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), toggle(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || boxRefreshCoords(boxContainer), this
            },
            evalBox: function evalBox(js, url, params) {
                var scr = "((function() { return function() { var box = this; " + (js || "") + ";}; })())";
                if (__debugMode) {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } else try {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? ajx2q(params) : void 0,
                        js: js
                    })
                }
            }
        };
        return retBox
    }, window.showBox = function(e, t, o, n) {
        if (checkEvent(n)) return !1;
        var i = o || {},
            r = i.params || {};
        i.containerClass && (r.containerClass = i.containerClass);
        var a = new MessageBox(r),
            s = {
                onDone: function(o, n, s, c) {
                    if (i.preOnDone && i.onDone && i.onDone(a), a.isVisible())
                        if (__debugMode) l();
                        else try {
                            l()
                        } catch (o) {
                            topError(o, {
                                dt: 15,
                                type: 103,
                                url: e,
                                query: ajx2q(t),
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            }), a.isVisible() && a.hide()
                        } else i.onDone && i.onDone(a, c);

                    function l() {
                        show(boxLayerBG), addClass(bodyNode, "layers_shown"), a.setOptions({
                            title: o,
                            hideButtons: r.hideButtons || !1
                        }), i.showProgress ? a.show() : show(a.bodyNode), a.content(n), a.evalBox(s, e, t), i.onDone && i.onDone(a, c)
                    }
                },
                onFail: function(e) {
                    if (a.failed = !0, setTimeout(a.hide, 0), isFunction(i.onFail)) return i.onFail(e)
                },
                cache: i.cache,
                stat: i.stat,
                fromBox: !0
            };
        return i.prgEl && (i.showProgress = showGlobalPrg.pbind(i.prgEl, {
            cls: i.prgClass,
            w: i.prgW,
            h: i.prgH,
            hide: !0
        }), i.hideProgress = hide.pbind("global_prg")), i.showProgress ? extend(s, {
            showProgress: i.showProgress,
            hideProgress: i.hideProgress
        }) : (a.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), __bq.count() < 2 && (hide(boxLayerBG), removeClass(bodyNode, "layers_shown")), hide(a.bodyNode), s.showProgress = function() {
            show(boxLoader), boxRefreshCoords(boxLoader)
        }, s.hideProgress = hide.pbind(boxLoader)), a.removeButtons().addButton(getLang("global_close")), ajax.post(e, t, s), a
    }, window.showTabbedBox = function(e, t, o, n) {
        return (o = o || {}).stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
    }, window.showFastBox = function(e, t, o, n, i, r) {
        return new MessageBox("string" == typeof e ? {
            title: e
        } : e).content(t).setButtons(o, n, i, r).show()
    }, window.showCaptchaBox = function(e, t, o, n) {
        var i = function(t) {
                if (!t || void 0 === t.keyCode || 10 == t.keyCode || 13 == t.keyCode) {
                    var i = geByTag1("input", o.bodyNode);
                    if (trim(i.value) || !0 === t) {
                        var r = geByTag1("img", o.bodyNode),
                            a = r[0];
                        r[1];
                        removeEvent(i), removeEvent(a), show(geByClass1("progress", o.bodyNode)), hide(i), n.onSubmit(e, i.value)
                    } else elfocus(i)
                }
            },
            r = !!o,
            a = intval(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + a;
        if (!r) {
            var c = '<div class="captcha">  <div><img src="' + s + '"/></div>  <div><input type="text" class="big_text" maxlength="7" placeholder="' + getLang("global_captcha_input_here") + '" /><div class="progress" /></div></div></div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, c, getLang("captcha_send"), function() {
                o.submit()
            }, getLang("captcha_cancel"), function() {
                var e = geByTag1("input", o.bodyNode),
                    t = geByTag1("img", o.bodyNode);
                removeEvent(e), removeEvent(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var l = geByTag1("input", o.bodyNode),
            d = geByTag1("img", o.bodyNode);
        return r && (l.value = "", d.src = "/captcha.php?sid=" + e + a, hide(geByClass1("progress", o.bodyNode))), show(l), addEvent(l, "keypress", i), addEvent(d, "click", function() {
            this.src = "/captcha.php?sid=" + e + a + "&v=" + irand(1e6, 2e6)
        }), elfocus(l), o
    }, window.showReCaptchaBox = function(e, t, o, n) {
        window.recaptchaResponse = function(e) {
            n.onSubmit(e)
        };
        var i = !!o,
            r = !!window.grecaptcha;
        if (!i) {
            r || (window.recaptchaCallback = function() {
                var t = curBox();
                if (t) {
                    var o = geByClass1("recaptcha", t.bodyNode);
                    o && (val(o, ""), grecaptcha.render(o, {
                        sitekey: e,
                        callback: recaptchaResponse
                    }))
                }
            }, headNode.appendChild(ce("script", {
                type: "text/javascript",
                src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
            })));
            var a = '<div class="recaptcha"></div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("global_recaptcha_title"),
                width: 354,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, a, getLang("captcha_cancel"));
            var s = geByClass1("recaptcha", o.bodyNode);
            s.id = "recaptcha" + (o.guid ? o.guid : "0"), showProgress(s)
        }
        return i && r ? grecaptcha.reset() : r && recaptchaCallback(), o.changed = !0, o
    }, window.checkTextLength = function(e, t, o, n, i, r, a) {
        var s = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== s.length || r) {
            t.lastLen = s.length;
            var l = {
                    "&": 5,
                    "<": 4,
                    ">": 4,
                    '"': 6,
                    "\n": n ? 1 : 4,
                    "\r": 0,
                    "!": 5,
                    "'": 5,
                    $: 6,
                    "\\": 6
                },
                d = {
                    1168: 1,
                    1169: 1,
                    8211: 1,
                    8212: 1,
                    8216: 1,
                    8217: 1,
                    8218: 1,
                    8230: 1,
                    8240: 1,
                    8249: 1,
                    8250: 1,
                    8364: 1,
                    8470: 1,
                    8482: 1,
                    65533: 1
                },
                u = {
                    1037: 1,
                    1104: 1,
                    1117: 1
                };
            i && (l[","] = 5);
            var p = function(e, t) {
                for (var o = 0, n = 0, i = e.length; n < i; n++) {
                    var r = l[e.charAt(n)],
                        s = e.charCodeAt(n);
                    o += void 0 !== r ? r : !a && s >= 128 && (s < 1025 || u[s] || s > 1119) && !d[s] && (s < 8220 || s > 8222) && (s < 8224 || s > 8226) ? ("&#" + s + ";").length : 1
                }
                return o
            }(s);
            if (o = ge(o), p > Math.max(e - 100, .75 * e))
                if (show(o), p > e)
                    if (i) {
                        var _ = val(t, function(e, t) {
                            for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                var s = e.charAt(i),
                                    c = l[s],
                                    p = e.charCodeAt(i);
                                if ((o += void 0 !== c ? c : !a && p >= 128 && (p < 1025 || u[p] || p > 1119) && !d[p] && (p < 8220 || p > 8222) && (p < 8224 || p > 8226) ? ("&#" + p + ";").length : 1) > t) break;
                                n += s
                            }
                            return n
                        }(s, Math.min(e, c)));
                        t.lastLen = _.length, o.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else o.innerHTML = getLang("text_exceeds_symbol_limit", p - e);
            else o.innerHTML = getLang("text_N_symbols_remain", e - p);
            else hide(o)
        }
    }, window.autosizeSetup = function(e, t) {
        if (e = ge(e))
            if (e.autosize) e.autosize.update();
            else {
                t.minHeight = intval(t.minHeight) || intval(getStyle(e, "height")), t.maxHeight = intval(t.maxHeight);
                var o, n = getSize(e)[0] || intval(getStyle(e, "width")),
                    i = getStyle(e, "fontSize");
                n < 1 && (n = intval(getStyle(e, "width", !1))), i.indexOf("em") > 0 && (i = floatval(i) * vk.fs), i = intval(i);
                var r = {
                    width: n,
                    height: 10,
                    fontFamily: getStyle(e, "fontFamily"),
                    fontSize: i + "px",
                    lineHeight: o = getStyle(e, "lineHeight"),
                    boxSizing: getStyle(e, "boxSizing")
                };
                each(["Top", "Bottom", "Left", "Right"], function() {
                    r["padding" + this] = getStyle(e, "padding" + this)
                }), e.autosize = {
                    options: t,
                    helper: ce("textarea", {
                        className: "ashelper"
                    }, r),
                    handleEvent: function(t, o) {
                        var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                        if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 == o.keyCode || 13 == o.keyCode ? n = "\n" : !browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                        if (!browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                        var i = document.selection.createRange();
                        return i.text && (t = t.replace(i.text, "")), t + n
                    },
                    update: function(t) {
                        var n = e.value;
                        !t || "blur" == t.type || "keyup" == t.type || browser.msie && "keypress" != t.type || t.ctrlKey || t.altKey || t.metaKey || (n = e.autosize.handleEvent(n, t)), n || (n = " "), e.autosize.helper.value != n && (e.autosize.helper.value = n);
                        var i, r = e.autosize.options,
                            a = getSize(e, !0)[1],
                            s = e.autosize.helper.scrollHeight;
                        r.exact && (i = s % o) > 2 && (s -= i - 2), s < r.minHeight && (s = r.minHeight);
                        var c = {
                                overflow: "hidden"
                            },
                            l = getStyle(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                        r.maxHeight && s > r.maxHeight && (s = r.maxHeight, extend(c, {
                            overflow: "auto",
                            overflowX: "hidden"
                        })), r.addHeight && (s += r.addHeight), a == s && l == c.overflow || (c.height = s, setStyle(e, c), isFunction(r.onResize) && r.onResize(s))
                    }
                }, t.exact && ("normal" == o && (o = "120%"), o = intval(o.indexOf("%") > 0 ? i * intval(o) / 100 : o)), utilsNode.appendChild(e.autosize.helper), browser.opera_mobile ? (setStyle(e, {
                    overflow: "hidden"
                }), e.autosize.update(), addEvent(e, "blur", e.autosize.update)) : (addEvent(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                    setStyle(e, {
                        overflow: "hidden",
                        resize: "none"
                    }), e.autosize.update();
                    var t = val(e);
                    val(e, " ", !0), val(e, t, !0)
                }, 0))
            }
    }, window.goAway = function(e, t, o) {
        if (-1 != (t || {}).h || checkEvent(o)) return !0;
        if (-1 != (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." != n[1].toLowerCase()) return location.href = e, !1;
            var i = intval(getCookie("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var r = extend({
            act: "a_go",
            to: e
        }, t || {});
        return !showBox("away.php", r, {}, o)
    }, window.showAudioClaimWarning = function(e, t, o) {
        var n, i, r = e.id,
            a = e.ownerId,
            s = e.title,
            c = t.id,
            l = (t.deleteHash, t.reason),
            d = t.original,
            u = {
                width: 470
            };
        "geo" == l ? (n = getLang("audio_claimed_geo"), i = getLang("audio_claim_warning_title")) : "replace" == l ? (n = getLang("audio_claimed_replacement_available"), i = getLang("audio_claim_warning_title")) : "subscription" == l ? (u.hideButtons = !0, u.bodyStyle = "padding: 0; border-radius: 4px;", u.width = 450, i = !1, n = '      <div class="audio_claim_popup">        <div class="audio_claim_popup__title">' + getLang("global_audio_only_with_subscription_title") + '</div>        <div class="audio_claim_popup__text">' + getLang("global_audio_only_with_subscription_text") + '</div>        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + getLang("global_audio_only_with_subscription_btn") + "</button>      </div>") : (n = getLang("audio_claim_warning"), i = getLang("audio_claim_warning_title")), u.title = i;
        var p = [u, n = (n = (n = n.replace(/\{audio\}/g, "<b>" + s + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + c + "&content=audio" + a + "_" + r + '">' + getLang("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + a + "," + r + '); return false;">' + getLang("audio_claim_delete") + "</a>")],
            _ = null;
        if (o && d) {
            var h = AudioUtils.drawAudio(d, "no_extra");
            p[1] = n.replace(/\{original\}/g, d[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + d[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + h, p.push(getLang("audio_replace_with_original"), function() {
                lockButton(_.btns.ok[0]), o(function() {
                    _.hide()
                })
            }), u.textControls = '<a onclick="deleteAudioOnClaim(' + a + "," + r + '); return false;">' + getLang("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = _ = showFastBox.apply(null, p)
    }, window.sureDeleteAll = function(title, text, where, objectId, toId, fromId, hash, event) {
        if (!checkEvent(event)) {
            var box = showFastBox({
                title: title
            }, text, getLang("global_delete"), function(btn) {
                ajax.post("/delete_all.php", {
                    act: where,
                    object_id: objectId,
                    to_id: toId,
                    from_id: fromId,
                    hash: hash,
                    loc: nav.objLoc[0]
                }, {
                    onDone: function onDone(res) {
                        eval(res), box.hide()
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                })
            }, getLang("global_cancel"));
            return !1
        }
    }, window.__qlTimer = null, window.__qlClear = function() {
        clearTimeout(__qlTimer), setTimeout(function() {
            clearTimeout(__qlTimer)
        }, 2e3)
    }, window.onLoginDone = function(e, t) {
        __qlClear(), storePasswordCredential(t), nav.reload({
            force: !0,
            from: 6
        })
    }, window.onLogout = function() {
        if (__qlClear(), window.audioPlayer && audioPlayer.stop(), window.Notifier && Notifier.standby(), window.FastChat && FastChat.standby(), window.Page && Page.postsClear(), ls.checkVersion()) try {
            window.localStorage.clear()
        } catch (e) {}
        nav.reload({
            from: 5
        })
    }, window.onLoginFailed = function(e, t) {
        switch (__qlClear(), e) {
            case -1:
                location.href = location.href.replace(/^http:/, "https:");
                break;
            case 4:
                location.href = "/login?m=1" + (t.expire ? "&s=0" : "") + "&email=" + t.email;
                break;
            default:
                location.href = "/login"
        }
    }, window.onLoginCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                ge("quick_captcha_sid").value = e, ge("quick_captcha_key").value = t, ge("quick_login_form").submit()
            },
            onHide: function() {
                window.qloginBox = !1
            }
        })
    }, window.onLoginReCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showReCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e) {
                ge("quick_recaptcha").value = e, ge("quick_login_form").submit()
            },
            onHide: function() {
                window.qloginBox = !1
            }
        })
    }, window.storePasswordCredential = function(e) {
        if (browserFeatures.cmaEnabled && window.ResizeObserver) {
            var t = new PasswordCredential({
                id: ge("quick_email").value,
                password: ge("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }, window.callHub = function(e, t) {
        this.count = t || 1, this.done = function(t) {
            this.count -= t || 1, this.count <= 0 && e()
        }
    }, window.showWriteMessageBox = function(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = showBox("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", "emoji.js", "notifier.css"],
            cache: 1
        }, e);
        return o && cancelEvent(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }, window.giftsBox = function(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }, window.moneyTransferBox = function(e, t, o, n, i, r, a) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (i) {
            var s, c;
            if (!a) return 2 == i ? (s = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || getLang("mail_money_transfer_cancel_confirm"), c = cur.lang && cur.lang.mail_money_transfer_cancel_btn || getLang("mail_money_transfer_cancel_btn")) : (s = cur.lang && cur.lang.mail_money_transfer_decline_confirm || getLang("news_fb_money_transfer_decline_confirm"), c = cur.lang && cur.lang.mail_money_transfer_decline_btn || getLang("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = showFastBox(getLang("global_action_confirmation"), s, c, moneyTransferBox.pbind(e, t, o, n, i, !1, 1), getLang("global_cancel")));
            var l = hasClass(domPN(n), "wall_postlink_preview_btn");
            return accept_btn = geByClass1("flat_button", domPN(n)), 2 !== a && (disableButton(accept_btn, !0), l ? (addClass(n.firstChild, "round_spinner"), removeClass(n.firstChild, "button")) : lockButton(n), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: l ? "snippet" : ""
            }, {
                onDone: function(r, a, s) {
                    0 !== r ? (l ? (re(n), hasClass(accept_btn, "secondary") || domReplaceEl(accept_btn, s)) : re(domPN(n)), showDoneBox(a), TopNotifier.invalidate()) : setTimeout(moneyTransferBox.pbind(e, t, o, n, i, !1, 2), 2e3)
                },
                onFail: function(e) {
                    return disableButton(accept_btn, !1), l ? (addClass(n.firstChild, "button"), removeClass(n.firstChild, "round_spinner")) : unlockButton(n), setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var d;
        return d = r ? {
            act: "money_transfer_box",
            request_id: e,
            request: r,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = n, !showBox("al_payments.php", d, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }, window.gSearch = new function() {
        this.on = 0;
        var e = this;
        this.hub = new callHub(function() {
            e.onShow && e.onShow()
        }, 2), this.hintsHub = new callHub(function() {
            e.showStartHints()
        }, 2), this.load = function() {
            ge("quick_search") && (this.loading || (this.loading = !0, stManager.add("qsearch.js", function() {
                e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = trim(t), e.hintsHub.done()
                }
            })))
        }, this.show = function(t, o) {
            if (ge("quick_search")) return this.on ? this.go(t) : (this.on = 1, show(e.sCont), placeholderSetup("search_input"), ge("search_input").setAttribute("autocomplete", "off"), addClass(ge("qsearch_link"), "active"), this.prev_content = ge("content"), this.qsearch_cont || (this.qsearch_cont = ce("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), e.hub.done(), e.hintsHub.done(), t ? cancelEvent(t) : void 0)
        }, this.go = function(t) {
            var o = "/gsearch.php?section=" + (e.last_section || "people") + "&q=" + trim(ge("search_input").value) + "&name=1";
            return cancelEvent(t || window.event), location.href = o, !1
        }, this.hide = function(t, o) {
            if (ge("quick_search") && (!e.active || o) && e.on) {
                if (e.on = 0, toggleFlash(), e.beforeHide && e.beforeHide()) return !0;
                ge("search_input").setValue ? ge("search_input").setValue("") : ge("search_input").value = "", hide(e.sCont), removeClass(ge("qsearch_link"), "active"), e.qsearch_cont.parentNode.replaceChild(e.prev_content, e.qsearch_cont)
            }
        }, this.init = function(e) {
            this.sCont = ge("quick_search"), this.opt = e || {}
        };
        this.preload = function() {}
    };
    var _cleanHide = function(e) {
            e.temphide && (removeEvent(e, "mouseout", e.temphide), removeAttr(e, "temphide"), removeAttr(e, "showing"))
        },
        cached;
    window.showTooltip = function(e, t) {
            (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
                e.showing = !1
            }, addEvent(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" != e.tt && (e.tt || (e.tt = "loadingstat"), domClosest("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
                "loadingstat" == e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (_cleanHide(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
            })))
        }, window.showTitle = function(e, t, o, n) {
            e = ge(e);
            var i = function() {
                return t || e.getAttribute("data-title")
            };
            if (browser.msie && browser.version < 9) e.setAttribute("title", i());
            else {
                if (!o) o = [Math.round(20 - getSize(e)[0] / 2), 8];
                showTooltip(e, extend({
                    text: i,
                    shift: o,
                    black: 1
                }, n || {}))
            }
        }, window.showHint = function(e, t) {
            e = ge(e), t = t || {};
            var o = function() {
                return e.getAttribute("data-title")
            };
            browser.msie && browser.version < 9 ? e.setAttribute("title", o().replace("<br>", "\n")) : showTooltip(e, extend({
                text: o,
                dir: "auto",
                width: 300,
                shift: [22, 8]
            }, t))
        }, window.reportAd = function(e) {
            showBox("/reports.php?act=a_report_ad_box", {
                ad_id: e
            }, {
                params: {
                    width: 370
                },
                stat: ["ui_controls.js", "ui_controls.css"]
            })
        }, window.updateMoney = function(e, t) {
            if (void 0 !== e && !1 !== e) {
                var o = "";
                !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
                var n = geByClass("votes_balance_nom" + o);
                for (var i in n) n[i].innerHTML = e + " " + getLang("votes_flex", e);
                var r = e * (vk.vcost || 7);
                n = geByClass("money_balance_nom" + o);
                for (var i in n) n[i].innerHTML = getLang("global_money_amount_rub", r, !0);
                void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }, window.articleNav = function(e, t, o, n) {
            var i = e,
                r = /^(?:%40|@)[.a-z0-9_-]+(?:\?rev=[0-9a-z_]+)?$/;
            if (i.toLowerCase().match(r)) return cur.articleLayer || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.__bq && __bq.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                var e = cur.articleLayer;
                e && e.setFaded(), cur.articleLayer = new ArticleLayer({
                    url: i
                }, !1, n), cur.articleLayer.show(function() {
                    e && e.close()
                }, !e), cur.articleSequence = (cur.articleSequence || 0) + (o ? -1 : 1)
            }), !0;
            if (cur.articleLayer && cur.articleLayer.isShown()) {
                var a = function() {
                        cur.articleLayer && cur.articleLayer.close(), delete cur.articleLayer, delete cur.articleSequence
                    },
                    s = cur.articlePrevLoc;
                return delete cur.articlePrevLoc, s && !r.test(s) ? e == s ? (a(), !0) : (layers.fullhide = function() {
                    a()
                }, !1) : (a(), !0)
            }
            return !1
        }, window.articlePrepare = function(e) {
            e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                ArticleLayer.prepare({
                    url: e
                })
            })
        }, window.zNav = function(e, t, o) {
            var n = e.z,
                i = e.f,
                r = e.w,
                a = (n || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
            if (delete e.z, delete e.f, delete e.w, t || (t = {}), isEmpty(e)) {
                if (i && (handleScroll(i), void 0 === n)) return !1;
                if (t.hist)
                    if (n || r) {
                        if (layerQueue.back("wiki", r, (a || {})[1], (a || {})[2])) return !1
                    } else if (!1 === n && o.w && layerQueue.back("wiki", o.w)) return !1;
                if (r) {
                    if (!1 === n) layers.fullhide(!!t.hist && 2);
                    else {
                        if (r.match(/^story([0-9\-]+)_(\d+)/)) return showStory(r);
                        o || (o = clone(nav.objLoc)), r && (o.w = r), i && (o.f = i), delete o.z, nav.setLoc(o)
                    }
                    return showWiki({
                        w: r
                    }, "note_new" == r, !1, {
                        onLoaded: n && zNav.pbind({
                            z: n
                        }, extend(t, {
                            queue: 1
                        })),
                        isZnav: 1
                    }), !1
                }
                if ("giftbox" == n) return !showBox("/al_gifts.php", {
                    act: "get_gift_box",
                    mid: t.id || 0,
                    fr: t.is && t.id != vk.id ? 0 : 1,
                    link: nav.objLoc[0]
                }, {
                    stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                    cache: 1
                }, window.event);
                if ("validatebox" == n) return !validateMobileBox({
                    closeLink: 1,
                    onDone: function() {
                        ge("change_phone_wrap").parentNode.removeChild(ge("change_phone_wrap"))
                    }
                });
                if ("upload_video" == n) return VideoUpload.showBox();
                if (!1 === n || !1 === r) {
                    var s = !window.wkcur || !wkcur.shown || layers.fullhide != WkView.hide;
                    !layers.fullhide || !s && !1 !== r || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                    var c = curBox();
                    return c && c.wkRaw && c.hide(), !1
                }
                if (n && a) {
                    var l = function() {
                        return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                    };
                    switch (a[1]) {
                        case "photo":
                            return showPhoto(a[2], a[3], extend(t, {
                                onFail: l,
                                noHistory: !0
                            })), !1;
                        case "albums":
                            return showAlbums(a[2], extend(t, {
                                onFail: l,
                                noHistory: !0
                            })), !1;
                        case "album":
                            return showAlbum(a[2], extend(t, {
                                onFail: l,
                                noHistory: !0
                            })), !1;
                        case "tag":
                        case "photo_tag":
                            return showPhotoTags(a[2], extend(t, {
                                onFail: l,
                                noHistory: !0
                            })), !1;
                        case "video":
                            var d = a[3],
                                u = extend(t, {
                                    onFail: l,
                                    noLocChange: 1,
                                    focusPlay: 1
                                });
                            if (d) {
                                var p = [],
                                    _ = "";
                                if (each(d.split("/"), function(e, t) {
                                        0 == t.indexOf("pl_") ? _ = t : p.push(t)
                                    }), d = p.join("/"), _) {
                                    _ = _.substr("pl_".length);
                                    var h = cur.currentModule ? cur.currentModule() : cur.module;
                                    u = extend(u, {
                                        playlistId: _,
                                        module: h,
                                        addParams: {
                                            force_no_repeat: 1,
                                            show_next: 1,
                                            playlist_id: _
                                        }
                                    })
                                }
                            }
                            return showVideo(a[2], d, u), !1;
                        case "single":
                            return void 0 === r && stManager.add(["single_pv.css", "single_pv.js"], ge(n).onclick), !1;
                        case "accept_money":
                            return moneyTransferBox(a[2], a[3]), !1;
                        case "audio_playlist":
                            _ = a[2].split("_");
                            return AudioUtils.showAudioPlaylist.apply(this, [_[0], _[1], a[3], void 0, void 0, t.onDone]), !1;
                        case "article_edit":
                            return openArticleEditor.apply(this, a[2].split("_")), !1
                    }
                }
            }
        }, window.handleScroll = function(e) {
            e = e.split(",");
            var t = cur.named || {},
                o = e[0] && (t[e[0]] || ge(e[0])) || !1,
                n = e[1] && (t[e[1]] || ge(e[1])) || !1;
            if (!o && !n) {
                if (!(o = document.getElementsByName(e[0])[0])) return;
                o = o.nextSibling
            }
            var i = ge("page_header_wrap") || ge("dev_top_nav_wrap");
            setTimeout(function() {
                o && scrollToY(getXY(o)[1] - (i ? getSize(i)[1] : 0), 0), n && elfocus(n)
            }, 300)
        }, window.showGlobalPrg = function(e, t) {
            var o = getXY(e),
                n = getSize(e),
                i = t || {},
                r = i.w || 32,
                a = i.h || 13,
                s = ge("global_prg");
            s.className = i.cls || "progress", setStyle(s, {
                left: o[0] + Math.floor((n[0] - r) / 2) + intval(i.shift ? i.shift[0] : 0),
                top: o[1] + Math.floor((n[1] - a) / 2) + intval(i.shift ? i.shift[1] : 0),
                width: r,
                height: a,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }, window.showManyPhoto = function(e, t, o, n) {
            Page.showManyPhoto(e, t, o, n)
        }, window.showPhoto = function(e, t, o, n) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (!(checkEvent(n) || cur._editMode && cur._editMode(n))) {
                var i = ["photoview.js", "photoview.css", "page.js", "page.css"],
                    r = window.Photoview;
                if (o.img && (o.showProgress = function() {
                        showProgress(o.img)
                    }, o.hideProgress = function() {
                        hideProgress(o.img)
                    }), !e) return !1;
                if (r && !1 === r.showPhoto(e, t, o)) return !1;
                var a = !0;
                o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(i, function() {
                    extend(cur, {
                        pvCancelLoad: function() {
                            a = !1
                        },
                        pvData: cur.pvData || {},
                        pvOptions: cur.pvOptions || {}
                    }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
                });
                var s = 1;
                return o && o.additional && o.additional.open_pe && (s = 0), extend(o, {
                    onDone: function(n) {
                        Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), a && ("deleted" == n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                    },
                    stat: i,
                    cache: s
                }), o.temp_final ? !1 : (ajax.post("al_photos.php", extend({
                    act: "show",
                    gid: cur.gid,
                    photo: e,
                    list: t,
                    module: cur.module || "",
                    list_info: o.list_info || null
                }, o.additional), o), !1)
            }
        }, window.showAlbums = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbums(e, t)
            }), !1)
        }, window.showAlbum = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbum(e, t)
            }), !1)
        }, window.showPhotoTags = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showTagged(e, t)
            }), !1)
        }, window.showVideoTags = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
                Photoview.showVideoTags(e, t)
            }), !1)
        }, window.showWiki = function(e, t, o, n) {
            if (checkEvent(o)) return !0;
            n = n || {};
            if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw == e.w && e.w && !e.reply) return WkView.restoreLayer(n), cancelEvent(o);
            (window.wkcur && wkcur.hideTitle || e.hide_title) && (n.hide_title = e.hide_title = 1);
            var i = n.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
            t && i.push("wk_editor.js", "wk_editor.css");
            var r, a, s = {
                stat: i,
                loader: !n.noloader,
                onDone: function(e, t, i, r) {
                    WkView.show(e, t, extend(i, n), r, o)
                },
                onFail: function(e) {
                    return WkView.showError(e)
                }
            };
            if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" == e.w.substr(-6)) {
                var c = clone(nav.objLoc);
                delete c[0], delete c.w, e.query = JSON.stringify(c)
            }
            return n.preload && extend(s, n.preload), n.ads_params && (r = n.ads_params, (a = nav.getPostParams(o && o.target)).post_click_url && (r._post_click_url = a.post_click_url)), ajax.post("wkview.php", extend({
                act: "show",
                loc: nav.objLoc[0],
                is_znav: n.isZnav
            }, e, r, cur.getWkviewOpts && cur.getWkviewOpts()), s), cancelEvent(o)
        }, window.videoCallback = function(e) {
            var t = e.shift();
            if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
            throw Error("Unregistered player callback: " + t)
        }, window.showApp = function(e, t, o, n, i, r) {
            r || (r = {});
            var a = !1,
                s = extend({
                    w: "app" + t
                }, r);
            if (o = intval(o), n && (isObject(n) ? s = extend(s, n) : s.ref = n), r.layer && (a = !0), (cur.apps && cur.apps[t] || !o) && !a) {
                delete s.w;
                var c = "app" + t + (i ? "_" + i : ""),
                    l = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === c;
                return nav.go("/" + c + nav.toStr(s), e, {
                    nocur: l
                })
            }
            i && (s.mid = i);
            var d = {
                stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
            };
            return r.queue && (d.queue = 1), r.urlHash && (s.url_hash = r.urlHash), showWiki(s, !1, e, d)
        }, window.showDoneBox = function(e, t) {
            var o = ((t = t || {}).w || 380) + 20,
                n = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                i = bodyNode.offsetWidth,
                r = ce("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + n + ">" + e + "</div>"
                }, {
                    left: (i - o) / 2
                });
            bodyNode.insertBefore(r, pageNode);
            var a = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                s = browser.mobile ? intval(window.pageYOffset) : 0,
                c = getSize(r);
            r.style.top = Math.max(10, s + (a - c[1]) / 3) + "px";
            var l = t.out || 2e3,
                d = new Date,
                u = function e() {
                    l < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? fadeOut(r.firstChild, 500, function() {
                            re(r), t.callback && t.callback()
                        }) : e()
                    }, l))
                };
            addEvent(r, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), l -= new Date - d
            }), addEvent(r, "mouseleave", function() {
                d = new Date, u()
            }), u()
        }, window.animateCount = function(e, t, o) {
            if (e = ge(e), t = (o = o || {}).str ? trim(t.toString()) || "" : positive(t), e)
                if (!browser.mobile || browser.safari_mobile || browser.android) {
                    var n = data(e, "curCount"),
                        i = data(e, "nextCount");
                    if ("number" == typeof i || o.str && "string" == typeof i) t != i && data(e, "nextCount", t);
                    else if ("number" == typeof n || o.str && "string" == typeof n) t != n && data(e, "nextCount", t);
                    else if (n = o.str ? trim(val(e).toString()) || "" : positive(val(e)), "auto" === o.str && (o.str = !n.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (n = positive(n), t = positive(t))), n != t) {
                        data(e, "curCount", t);
                        var r, a, s, c = o.str ? n.length == t.length ? n < t : n.length < t.length : n < t,
                            l = (c ? t : n).toString(),
                            d = (c ? n : t).toString(),
                            u = [],
                            p = [],
                            _ = "",
                            h = "";
                        for (o.str || (d = new Array(l.length - d.length + 1).join("0") + d), r = 0, a = l.length; r < a && (s = l.charAt(r)) === d.charAt(r); r++) u.push(s);
                        if (_ = l.substr(r), h = d.substr(r), o.str) {
                            for (r = _.length; r > 0 && (s = _.charAt(r)) === h.charAt(r); r--) p.unshift(s);
                            p.length && (_ = _.substr(0, r + 1), h = h.substr(0, r + 1))
                        }
                        u = u.join("").replace(/\s$/, "&nbsp;"), p = p.join("").replace(/^\s/, "&nbsp;"), trim(val(e)) || o.noSpaceIfEmpty || val(e, "&nbsp;");
                        var f = e.clientHeight || e.offsetHeight;
                        val(e, '<div class="counter_wrap inl_bl"></div>');
                        var w, v, g, m, b = e.firstChild,
                            y = !0;
                        u.length && b.appendChild(w = ce("div", {
                            className: "counter_const inl_bl",
                            innerHTML: u
                        })), u.length || (h = h.replace(/^0+/, "")), h && ("0" != h || u.length) || (h = o.noSpaceIfEmpty ? "" : "&nbsp;", y = !!u.length), b.appendChild(g = ce("div", {
                            className: "counter_anim_wrap inl_bl"
                        })), g.appendChild(m = ce("div", {
                            className: "counter_anim " + (c ? "counter_anim_inc" : "counter_anim_dec"),
                            innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + _ + "</span></div>" + (y ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + h + "</span></div>" : "")
                        }, y ? {
                            marginTop: c ? -f : 0
                        } : {
                            right: 0
                        })), o.str && setStyle(m, {
                            textAlign: "right",
                            right: 0
                        });
                        var x = getSize(geByClass1("counter_anim_big_c", m, "span"))[0],
                            k = y ? "&nbsp;" == h ? x : getSize(geByClass1("counter_anim_small_c", m, "span"))[0] : 0;
                        if (!h && o.noSpaceIfEmpty && (k = 0), p.length && b.appendChild(v = ce("div", {
                                className: "counter_const inl_bl",
                                innerHTML: p
                            })), o.noWrapWidth || setStyle(b, {
                                width: (w && getSize(w)[0] || 0) + (v && getSize(v)[0] || 0) + x + 0
                            }), void 0 === browser.csstransitions) {
                            var C = browser,
                                T = floatval(C.version);
                            browser.csstransitions = C.chrome && T >= 9 || C.mozilla && T >= 4 || C.opera && T >= 10.5 || C.safari && T >= 3.2 || C.safari_mobile || C.android
                        }
                        var L = browser.csstransitions;
                        setStyle(g, {
                            width: c ? k : x
                        });
                        var S = function() {
                                val(e, t || (o.noSpaceIfEmpty ? "" : " "));
                                var n = data(e, "nextCount");
                                data(e, "curCount", !1), data(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(animateCount.pbind(e, n, o), 0), o.onDone && o.onDone()
                            },
                            E = y ? {
                                marginTop: c ? 0 : -f
                            } : {
                                marginRight: c ? -k : 0
                            };
                        L ? (getStyle(g, "width"), addClass(g, "counter_css_anim_wrap"), x != k && setStyle(g, {
                            width: c ? x : k
                        }), y && setStyle(m, E), setTimeout(S, 300), o.fadeMode && (setStyle(geByClass1("counter_anim_big", e), "opacity", 1), setStyle(geByClass1("counter_anim_small", e), "opacity", 0))) : (x != k && animate(g, {
                            width: c ? x : k
                        }, {
                            duration: 100
                        }), y ? animate(m, E, {
                            duration: 300,
                            transition: Fx.Transitions.easeOutCirc,
                            onComplete: S
                        }) : setTimeout(S, 300))
                    }
                } else val(e, t || "")
        }, window.Chat = {
            maxHeight: 300,
            tabs: {},
            counters: {},
            showFriends: function() {
                curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), Chat.cont.tt && Chat.cont.tt.destroy && Chat.cont.tt.destroy())
            },
            showTT: function() {
                hasClass(Chat.wrap, "chat_active") || hasClass(Chat.wrap, "chat_expand") || showTooltip(Chat.cont, {
                    text: getLang("head_fr_online_tip") + " (" + (browser.mac ? "Cmd" : "Ctrl") + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            },
            init: function() {
                Chat.wrap = ce("div", {
                    id: "chat_onl_wrap",
                    className: "chat_onl_wrap",
                    innerHTML: '<div class="chat_tt_wrap"></div><div class="chat_onl_inner"><div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div><div class="chat_cont_sh_top"></div><div class="chat_cont_sh_bottom"></div><a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();"><div class="chat_onl_cont"><div class="chat_onl" id="chat_onl"></div></div></a></div>'
                }), utilsNode.appendChild(Chat.wrap), Chat.scrollNode = geByClass1("chat_cont_scrolling", Chat.wrap), Chat.ttNode = geByClass1("chat_tt_wrap", Chat.wrap), Chat.itemsCont = Chat.scrollNode.firstChild, Chat.onl = ge("chat_onl"), Chat.cont = Chat.onl.parentNode.parentNode, hide(Chat.wrap), Chat.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + sbWidth() + "px;}")
            }
        }, window.TopMenu = {
            init: function() {
                if (this.inited) return !1;
                var e = ge("top_profile_link"),
                    t = ge("top_profile_menu");
                if (!e || !t) return !1;
                addEvent(e, "mousedown", TopMenu.clicked), this.inited = !0
            },
            clicked: function(e) {
                return !(checkEvent(e) || "mousedown" == e.type && checkKeyboardEvent(e)) && (TopMenu.toggle(), !1)
            },
            toggle: function(e) {
                var t = ge("top_profile_link"),
                    o = ge("top_profile_menu"),
                    n = hasClass(o, "shown");
                void 0 !== e && n == e || (void 0 === e && (e = !n), toggleClass(t, "active", e), toggleClass(o, "shown", e), e ? (cancelStackPush("top_menu", TopMenu.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : cancelStackFilter("top_menu", !0))
            },
            show: function() {
                TopMenu.hidetimer && (clearTimeout(TopMenu.hidetimer), TopMenu.hidetimer = 0), TopMenu.toggle(!0)
            },
            hide: function() {
                TopMenu.hidetimer || (TopMenu.hidetimer = setTimeout(function() {
                    TopMenu.toggle(!1), TopMenu.hidetimer = 0
                }, 200))
            },
            select: function(e, t) {
                return !!checkEvent(t) || (TopMenu.toggle(!1), nav.go(e, t, {
                    noback: !0
                }))
            }
        }, window.TopNotifier = {
            preload: function() {
                stManager.add(["notifier.js", "notifier.css"], function() {
                    TopNotifier.preload()
                })
            },
            show: function(e) {
                if (!0 !== checkEvent(e)) {
                    return stManager.add(["notifier.js", "notifier.css"], function() {
                        TopNotifier.show(id)
                    }), cancelEvent(e)
                }
            },
            showTooltip: function(e) {
                stManager.add(["notifier.js", "notifier.css"], function() {
                    TopNotifier.showTooltip(e)
                })
            },
            invalidate: __bf,
            setCount: __bf
        }, window.TopSearch = {
            cache: {},
            lists: {},
            maxItems: 8,
            init: function() {
                if (this.inited) return !1;
                var e = ge("ts_input"),
                    t = (ge("ts_wrap"), ge("ts_cont_wrap"));
                if (vk.id && Chat.init(), !e) return !1;
                addEvent(e, "focus", function() {
                    TopSearch.deselect(), trim(val(this)) && addClass(t.firstChild, "active"), TopSearch.toggleInput(!0)
                }), addEvent(e, "keydown", function(o) {
                    switch (o.keyCode) {
                        case KEY.DOWN:
                        case KEY.UP:
                            TopSearch.moveSelection(o.keyCode), cancelEvent(o);
                            break;
                        case KEY.ENTER:
                            var n = geByClass1("active", t);
                            if (n) TopSearch.select(n, o);
                            else {
                                var i = trim(val(this));
                                i && (e.blur(), TopSearch.clear(), TopSearch.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(i)))
                            }
                            cancelEvent(o);
                            break;
                        case KEY.TAB:
                            TopSearch.clear(), TopSearch.toggleInput(!1), cancelStackFilter("top_search", !0)
                    }
                }), vk.id && (addEvent(e, "keyup", function(e) {
                    switch (e.keyCode) {
                        case KEY.DOWN:
                        case KEY.UP:
                        case KEY.ENTER:
                        case KEY.ESC:
                            cancelEvent(e);
                            break;
                        default:
                            TopSearch.prepareRows(trim(val(this)))
                    }
                }), addEvent(e, "paste", function() {
                    setTimeout(function() {
                        TopSearch.prepareRows(trim(val(e)))
                    }, 10)
                }), addEvent(document, "mousedown", function(e) {
                    checkKeyboardEvent(e) || domClosest("_audio_page_layout", e.target) || domClosest("_ap_layer__close", e.target) || domClosest("layer_wrap", e.target) || _topHeaderClose()
                }), this.inited = !0)
            },
            clear: function() {
                window.tooltips && tooltips.destroyAll(ge("ts_cont_wrap"));
                var e = ge("ts_input");
                e && e.phonblur && (val(e, ""), e.blur(), e.phonblur(), this.prepareRows())
            },
            select: function(e, t, o) {
                if (checkEvent(t)) return !0;
                ge("ts_cont_wrap");
                var n = ge("ts_input"),
                    i = trim(val(n)).length,
                    r = e.getAttribute("hinttype");
                if (this.clear(), _topHeaderClose(), i || n.blur(), o && hasClass(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: i,
                    mk: "chat_box"
                }), this.writeBox(o), !1;
                var a = nav.go(e, t);
                return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: i,
                    mk: r
                }), a
            },
            deselect: function() {
                var e = ge("ts_cont_wrap");
                each(geByClass("active", e), function(e, t) {
                    removeClass(t, "active")
                })
            },
            itemOver: function(e, t, o) {
                1 == t && TopSearch.deselect();
                var n = inArray(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
                toggleClass(e, "write", n), toggleClass(e, "active", t)
            },
            moveSelection: function(e) {
                var t, o = ge("ts_cont_wrap"),
                    n = geByClass1("active", o);
                switch (e) {
                    case KEY.UP:
                        t = !!n && (this.getNextNode(n, -1, "a") || n);
                        break;
                    case KEY.DOWN:
                        t = n ? this.getNextNode(n, 1, "a") || n : o.firstChild
                }
                return this.deselect(), t && addClass(t, "active"), !1
            },
            getNextNode: function(e, t, o) {
                for (var n = e, i = domPN(e);;) {
                    if ((n = t > 0 ? domNS(n) : domPS(n)) || (n = t > 0 ? domFC(i) : domLC(i)), o && n.tagName && n.tagName.toLowerCase() == o || !o && n) return n;
                    if (n === e) return !1
                }
            },
            toggleInput: function(e) {
                e = !!e;
                var t = ge("ts_cont_wrap");
                isVisible(t) != e && (toggle("ts_cont_wrap", e), e && cancelStackPush("top_search", function() {
                    var e = ge("ts_input");
                    TopSearch.toggleInput(!1), e.blur()
                }, !0))
            },
            getList: function(e) {
                switch (e) {
                    case "friends":
                        return this.lists.friends || this.topFriends || {};
                    case "publics":
                    case "events":
                    case "groups":
                    case "apps":
                    case "chats":
                    case "search":
                        return this.lists[e] || {}
                }
                return {}
            },
            onlines: function() {
                return window.curFastChat && curFastChat.onlines || this.lists.onlines || {}
            },
            initFriendsList: function() {
                var e = this;
                if (e.friendsLoaded) return !1;
                if (cur.initingFL || vk.isBanned || !vk.id) return !1;
                var t = function() {
                    if (e.friendsLoaded) return !1;
                    cur.initingFL = !0, ajax.post("al_search.php", {
                        act: "get_pages"
                    }, {
                        cache: 1,
                        onDone: function(t) {
                            delete cur.initingFL, e.friendsLoaded || (each(t, function(t, o) {
                                e.lists[t] = o, "onlines" != t && e.updateCache(t)
                            }), e.friendsLoaded = !0, val("ts_input") || e.prepareRows(""))
                        },
                        onFail: function() {
                            delete cur.initingFL
                        }
                    })
                };
                ! function(e) {
                    for (var t in e) return !1;
                    return !0
                }(e.getList("friends")) ? (e.updateCache("friends"), e.forceUpdate = !0, e.prepareRows(cur.tsStr || ""), t()) : (cur.initingFL = !0, ajax.post("al_search.php", {
                    act: "get_top_friends"
                }, {
                    cache: 1,
                    onDone: function(o) {
                        delete cur.initingFL, e.topFriends = o, e.updateCache("friends"), e.forceUpdate = !0, e.prepareRows(cur.tsStr || ""), t()
                    },
                    onFail: function() {
                        delete cur.initingFL
                    }
                }))
            },
            getSimilarQueries: function(e) {
                var t, o = [e = e.toLowerCase()];
                return (t = parseLatin(e)) && o.push(t), (t = parseLatKeys(e)) && o.push(t), (t = parseCyr(e)) && o.push(t), o
            },
            searchCache: function(e, t) {
                var o = TopSearch.getList(e);
                if (!t) return !1;
                var n, i, r, a, s, c, l = this.getSimilarQueries(t);
                if (void 0 !== this.cache[e][t]) return l;
                for (var d in c = this.cache[e][t] = {}, l)
                    if (n = l[d], r = this.cache[e][" " + n.charAt(0).toLowerCase()])
                        for (i in a = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + escapeRE(n), "gi"), r) s = o[i + "_"], isArray(s) && null !== s[0].match(a) && (c[i] = 1);
                for (var d in i = 0, c) i++;
                return c._num = i, l
            },
            updateCache: function(e, t, o) {
                var n, i, r, a = t || this.getList(e);
                for (var s in this.cache[e] = o && this.cache[e] || {}, a)
                    for (var c in n = a[s][0], s = intval(s), r = n.split(/[\s\-\(\)\.,;|:]+/)) i = " " + r[c].charAt(0).toLowerCase(), this.cache[e][i] = this.cache[e][i] || {}, this.cache[e][i][s] = 1
            },
            listSearch: function(e, t, o, n) {
                var i = TopSearch,
                    r = [],
                    a = {};
                return t ? (i.searchCache(e, t), a = i.cache[e] && i.cache[e][t] || {}) : each(i.getList(e), function(e) {
                    var t = intval(e);
                    a[t] = 1
                }), each(i.getList(e), function(e) {
                    var t = intval(e),
                        i = a[t];
                    if ((!n || !n[t]) && i) return !!o-- && void r.push([t, this])
                }), r
            },
            row: function(e, t, o, n, i, r, a, s, c) {
                var l = 0;
                if (r && (n = n.replace(r, '$1<em class="ts_clist_hl">$2</em>')), inArray(a, ["h_friends", "h_correspondents", "h_chats"]) && (l = e), s || (s = ""), c = intval(c)) {
                    var d = "";
                    1 & c && (d += "page_verified "), 2 & c && (d += "page_top_author "), -128932034 == e ? d += "ph_verified " : -29246653 == e && (d += "pg_verified "), c = '<div class="' + d + '" onmouseover="pageVerifiedTip(this, {type: ' + c + ", oid: " + e + '})"></div>'
                } else c = "";
                return '<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + l + ');" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + a + '"><span class="ts_contact_photo ' + onlinePlatformClass(i) + '"><img class="ts_contact_img" src="' + o + '"/></span><span class="ts_contact_name fl_l"><div class="ts_contact_title_wrap' + (c ? " is_verified" : "") + '"><span class="ts_contact_title">' + n + "</span></div>" + c + '<div class="ts_contact_info">' + s + '</div></span><div class="ts_contact_status"></div></a>'
            },
            searchLists: function(e) {
                var t = TopSearch;
                return e ? {
                    friends: {
                        order: 0,
                        count: t.maxItems - 1,
                        label: getLang("global_friends")
                    },
                    groups: {
                        order: 1,
                        count: 4,
                        label: getLang("global_communities")
                    },
                    publics: {
                        count: 2,
                        parent: "groups"
                    },
                    events: {
                        count: 1,
                        parent: "groups"
                    },
                    apps: {
                        order: 2,
                        count: 1,
                        label: getLang("global_apps")
                    },
                    chats: {
                        order: 3,
                        count: t.maxItems - 1,
                        label: getLang("global_chats")
                    },
                    search: {
                        order: 4,
                        count: t.maxItems - 1,
                        label: getLang("head_search_results")
                    }
                } : {
                    friends: {
                        order: 0,
                        count: t.maxItems,
                        label: getLang("global_friends")
                    }
                }
            },
            initListsHtml: function() {
                TopSearch.listsHtml = []
            },
            addToListsHtml: function(e, t, o) {
                var n = TopSearch,
                    i = n.searchLists(o),
                    r = i[(i[e] || {}).parent || e] || {},
                    a = r.order || 0,
                    s = r.label || "";
                n.listsHtml[a] = n.listsHtml[a] || (o && s ? ['<div class="ts_search_sep">' + s + "</div>"] : []), n.listsHtml[a].push(t)
            },
            htmlRows: function(e) {
                var t = TopSearch,
                    o = [],
                    n = "";
                for (var i in t.listsHtml) o.push(t.listsHtml[i].join(""));
                if (e) {
                    e.length > 27 && e.substr(0, 25);
                    var r = "#" == e[0] ? "statuses" : "auto",
                        a = "#" == e[0] ? getLang("global_news_search_results") : getLang("global_show_all_results");
                    n += '<a href="/search?c[section]=' + r + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link" onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" ><span class="ts_contact_name fl_l">' + a + '</span><div class="ts_contact_status "></div></a>'
                }
                return n + o.join("")
            },
            prepareRows: function(e) {
                var t = TopSearch,
                    o = t.maxItems,
                    n = ge("ts_cont_wrap");
                geByClass1("active", n);
                if (!n || !vk.id) return !1;
                if (cur.tsStr && cur.tsStr == e && !t.forceUpdate) return !1;
                delete t.forceUpdate, t.initListsHtml();
                var i, r = {};
                e && (i = [], each(this.getSimilarQueries(e), function() {
                    i.push(escapeRE(this))
                }), i = new RegExp("([ -]|^|s|&nbsp;|\b)(" + i.join("|") + ")", "gi"), cur.lastRe = i, o--), each(t.searchLists(e), function(n, a) {
                    if (t.cache[n]) {
                        var s = a.count,
                            c = t.listSearch(n, e, s, r),
                            l = [],
                            d = 0;
                        if (!isEmpty(c)) {
                            for (var u in c) {
                                if (!o || d >= s) break;
                                l.push(c[u]), o--, d++
                            }
                            if (l.length)
                                for (var u in l) {
                                    var p, _ = l[u][1],
                                        h = intval(l[u][0]),
                                        f = h > 0 && t.onlines()[h],
                                        w = _[0],
                                        v = _[2],
                                        g = _[4],
                                        m = _[5],
                                        b = "search" == n ? _[3] : "h_" + n;
                                    p = t.row(h, v, _[1], w, f, i, b, g, m), t.addToListsHtml(n, p, e), r[h] = 1
                                }
                        }
                    }
                }), n.innerHTML = t.htmlRows(e), o && e && "#" != e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
            },
            hintsSearch: function(e, t) {
                var o, n, i, r = TopSearch,
                    a = ge("ts_input"),
                    s = ge("ts_cont_wrap");
                ajax.post("al_search.php", {
                    act: "get_pages_hints",
                    q: e
                }, {
                    cache: 1,
                    onDone: function(c) {
                        if (trim(val(a)) != e) return !1;
                        if (!c) return !1;
                        var l = r.maxItems - geByClass("ts_contact", s).length - 1,
                            d = {};
                        for (var u in each(c, function(o) {
                                var n = intval(o),
                                    a = this[0],
                                    s = this[2],
                                    c = this[3],
                                    u = this[4],
                                    p = this[5],
                                    _ = r.searchLists(e),
                                    h = c.replace("h_", ""),
                                    f = (_[h] || {}).parent || h;
                                if (void 0 === _[f] && (f = "search"), d[f] = d[f] || {}, d[f][o] = this, r.lists[f] = r.lists[f] || {}, r.lists[f][o] = this, ge("ts_contact" + n)) return !0;
                                if (!l--) return !1;
                                var w = r.row(n, s, this[1], a, !1, t, c, u, p);
                                return r.addToListsHtml(f, w, e), i = !0, !0
                            }), d) r.updateCache(u, d[u], !0);
                        i && (o = geByClass1("active", s), n = o ? o.id : "", s.innerHTML = r.htmlRows(e), n && ge(n) && addClass(ge(n), "active"))
                    }
                })
            },
            writeBox: function(e) {
                window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e, !1, {
                    entrypoint: "fastchat_global_search"
                }) : e > 0 && e < 2e9 ? showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
            }
        }, window._topHeaderClose = function(e) {
            window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
        }, window._topHeaderClearClose = function() {
            delete window.headerDestroy
        }, window.mentionOver = function(e, t) {
            t = t || {}, showTooltip(e, {
                url: "al_wall.php",
                params: {
                    act: "mention_tt",
                    mention: e.getAttribute("mention_id"),
                    from: "wall"
                },
                shift: t.shift || [52, 7, 7],
                hidedt: 500,
                showdt: 500,
                slide: 15,
                checkLeft: !0,
                reverseOffset: t.reverseOffset || 112,
                dir: "auto",
                appendEl: domClosest("im-page-history-w", e) || domClosest("rb_box_wrap", e) || domClosest("wk_cont", e) || domClosest("scroll_fix_wrap", e)
            })
        }, window.mentionClick = function(e, t, o) {
            e && e.tt && e.tt.hide && e.tt.hide({
                fasthide: 1
            });
            var n = e,
                i = !1;
            if (cur.articleLayer && cur.articleLayer.isStandalone() && (i = !0), n.tagName && "a" == n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
                o = o || {};
                var r, a = n.getAttribute("hrefparams");
                a && (o.params = extend(o.params || {}, q2ajx(a))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, "")), (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(r = n.match(/^\/(.*?)(\?|#|$)/)) ? i = !0 : ((r = r[1]).indexOf(".php") > 0 || r.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (i = !0)
            }
            if (i) {
                if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
                e.setAttribute("data-change-location-with-post-away", 1), n = e
            }
            return nav.go(n, t, o)
        }, window.headPlayPause = function(e) {
            var t = currentAudioId();
            if (t || (t = ls.get("audio_id")) && (window.padPlClicked = !0), t) playAudioNew(t);
            else {
                var o = padAudioPlaylist();
                o && o.start ? playAudioNew(o.start) : (addClass(ge("head_play_btn"), "playing"), window.onPlaylistLoaded = function() {
                    var e = padAudioPlaylist();
                    e && e.start && playAudioNew(e.start)
                })
            }
            e && cancelEvent(e)
        }, window.menuSettings = function(e) {
            return showTabbedBox("al_settings.php", {
                act: "menu_box",
                type: e
            })
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, window.mobilePromo = showBox.pbind("al_login.php", {
            act: "mobile",
            box: 1
        }), window.mobileOnlineTip = function(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                n = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return showTooltip(e, {
                url: "al_login.php",
                params: {
                    act: "mobile_tt",
                    mid: t.mid,
                    was: t.was,
                    vk_mobile: t.vk_mobile
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                forcetoup: t.forcetoup,
                toup: !1,
                dir: "auto",
                asrtl: t.asrtl,
                appendParentCls: t.appendParentCls,
                shift: [o, 8, 7],
                className: "mobile_tt" + n
            })
        }, window.pageVerifiedTip = function(e, t) {
            return showTooltip(e, {
                url: "/al_page.php",
                params: {
                    act: "verified_tt",
                    type: t.type,
                    oid: t.oid
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                dir: "auto",
                shift: [94, 7, 7],
                className: "verified_tt"
            })
        }, window.cssAnim = function(e, t, o, n) {
            var i = intval(browser.version);
            if (e && (browser.chrome && i > 14 || browser.mozilla && i > 13 || browser.opera && i > 2)) {
                var r = "all " + o.duration + "ms " + (o.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function t() {
                    return browser.opera && intval(browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : removeEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
                };
                n && (browser.opera && intval(browser.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : addEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(setStyle.pbind(e, t), 0)
            } else animate(e, t, extend(o, {
                onComplete: n
            }))
        }, window.imagesLoader = function(e, t) {
            var o = [],
                n = 0,
                i = null,
                r = extend({
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                }, t),
                a = {};

            function s(e, t) {
                o[e] && (--n, delete o[e]), t || a.processLoad()
            }

            function c(t) {
                var o = 0,
                    n = t;
                if (n && n.offsetParent)
                    do {
                        if (o += n.offsetTop, e && n.offsetParent === e) break
                    } while (n = n.offsetParent);
                return o
            }
            return a.processLoad = function() {
                for (var t in o) {
                    var l = o[t],
                        d = l[0];
                    ((g = l[1]).width || g.height || vkNow() - d > 2e4) && o[t] && s.call(g, t, !0)
                }
                if (clearTimeout(i), n && (i = setTimeout(a.processLoad, 500)), !(n >= r.load_limit)) {
                    var u = geByClass(r.need_load_class, e || bodyNode),
                        p = [];
                    if (e && u.length) var _ = e.offsetHeight,
                        h = e.scrollTop - _ * r.top_load,
                        f = e.scrollTop + _ * r.bottom_load;
                    for (var w = 0, v = u.length; w < v && n < r.load_limit; w++) {
                        var g;
                        if ("IMG" == (g = u[w]).tagName)
                            if (t = g.getAttribute("data-src")) {
                                if (e) {
                                    var m = c(g),
                                        b = m + g.parentNode.offsetHeight;
                                    if (m > f) continue;
                                    if (b < h) continue
                                }
                                p.push([g, t])
                            }
                    }
                    each(p, function() {
                        var e = this[0],
                            t = this[1];
                        a.iloader && a.iloader.add(t, s, e), e.src = t, e.removeAttribute("data-src"), removeClass(e, r.need_load_class), o[t] || (++n, o[t] = [vkNow(), e])
                    }), clearTimeout(i), n && (i = setTimeout(a.processLoad, 500))
                }
            }, a.destroy = function() {
                o = [], n = 0, clearTimeout(i)
            }, r.use_iframe && window.IframeLoader && (a.iloader = new IframeLoader), r.skip_process_load || a.processLoad(), a
        }, window.IframeLoader = function() {
            var e, t, o, n, i, r;

            function a(e) {
                return t && t.body ? t.getElementById("___img" + e) : geByClass1("___img" + e, o)
            }

            function s() {
                e = utilsNode.appendChild(ce("iframe")), t = function(e) {
                    if (browser.mozilla) return !1;
                    try {
                        return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                    } catch (e) {}
                    return !1
                }(e), o = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
                    display: "none"
                })), n = 0, i = []
            }

            function c(e, r, s) {
                var c = n++;
                i[c] = {
                    src: e,
                    onLoad: r,
                    that: s
                }, o.appendChild(ce("div", {
                    innerHTML: function(e) {
                        return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                    }(c)
                }));
                var l = a(c);
                return l.src = e, l.onload = function() {
                    var e = i[c];
                    e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[c], o.removeChild(a(c).parentNode))
                }, l
            }
            return s(), {
                add: c,
                abort: function() {
                    for (var t in re(e), r = [], i) r.push(i[t]);
                    s()
                },
                repeat: function(e) {
                    if (!r) return [];
                    var t = [];
                    for (var o in r) {
                        var n = r[o];
                        c(n.src, n.onLoad, n.that), t.push(n.that)
                    }
                    if (r = null, e) {
                        var i = [];
                        each(t, function() {
                            i.push([this, this.src]), this.src = "", hide(this)
                        }), setTimeout(function() {
                            each(i, function() {
                                var e = this[0],
                                    t = this[1];
                                e.src = t, show(e)
                            })
                        }, 10)
                    }
                    return t
                }
            }
        }, window.getCaretBoundingRect = function(e) {
            var t = e.getBoundingClientRect(),
                o = null,
                n = null;
            if (t.top === t.bottom) return {
                left: 0,
                top: 0,
                bottom: 0
            };
            if (document.selection)(o = (n = document.selection.createRange()).getClientRects() || []).length || (n.text = "_", n.moveStart("character", -1), o = n.getClientRects(), n.text = ""), o = o[o.length - 1];
            else if (window.getSelection) {
                if ((n = getSelection().getRangeAt(0)).collapsed) {
                    var i = n.startOffset;
                    n.setStart(n.startContainer, 0), o = n.getClientRects(), n.setStart(n.startContainer, i)
                }
                o = o && o.length ? o[o.length - 1] : {
                    right: t.left,
                    top: t.top,
                    bottom: t.top
                }
            }
            return {
                left: o.right - t.left,
                top: o.top - t.top,
                bottom: o.bottom - t.top
            }
        }, window.getSelectionText = function() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" != document.selection.type && (e = document.selection.createRange().text), e
        }, window.aquireLock = function(e, t, o) {
            var n = "lockkk_" + e;
            if (!0 === ls.get(n)) ls.checkVersion() ? o || setTimeout(aquireLock.pbind(e, t, !0), 100) : t();
            else {
                ls.set(n, !0);
                try {
                    t()
                } catch (e) {}
                ls.set(n, !1)
            }
        }, window.statNavigationTiming = function() {
            if (window.clientStatsInitedNT) return !1;
            if (window.performance && performance.timing) {
                if (Math.random() > .001 && !__dev) return !1;
                var e = {},
                    t = window.cur && window.cur.module;
                for (var o in performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), e) statlogsValueEvent("navigation_timing", e[o], o, t);
                window.clientStatsInitedNT = !0
            }
        }, window.statDurationsLoadImage = function() {
            if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
                if (window.clientStatsInited) return !1;
                var e = window.performance.getEntriesByType("resource");
                if (!e) return !1;
                for (var t = {}, o = {}, n = 0; n < e.length; n++)
                    if (e[n] && "img" == e[n].initiatorType)
                        if (e[n].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                        else if (e[n].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
                else if (e[n].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
                else if (e[n].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
                else if (e[n].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
                else if (e[n].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
                else if (t[">5000"] = (t[">5000"] || 0) + 1, e[n].name && e[n].name.indexOf("pp.vk.me") > 0) {
                    var i = "";
                    (i = (i = e[n].name).substr(i.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[i = i.substr(0, i.indexOf("/"))] = (o[i] || 0) + 1)
                }
                for (var r in t) statlogsValueEvent("img_load", t[r], r);
                for (var r in o) statlogsValueEvent("img_slow", o[r], r);
                window.clientStatsInited = !0
            }
        }, window.getProgressBarEl = function(e) {
            return geByClass1("ui_progress_bar", e)
        }, window.onLoaded = function(e) {
            vk.loaded ? e() : addEvent(window, "load", e)
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.formatTime = function(e, t) {
            var o, n, i;
            return e = Math.max(e, 0), o = (n = Math.floor(e % 60)) < 10 ? "0" + n : n, o = (i = (e = Math.floor(e / 60)) % 60) + ":" + o, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (o = "0" + o), o = e + ":" + o), o
        }, window.debounce = function(e, t, o) {
            var n;
            return function() {
                var i = this,
                    r = arguments,
                    a = o && !n;
                clearTimeout(n), n = setTimeout(function() {
                    n = null, o || e.apply(i, r)
                }, t), a && e.apply(i, r)
            }
        }, window.throttle = function(e, t) {
            var o;
            return function() {
                o || (e.apply(this, arguments), o = setTimeout(function() {
                    o = !1
                }, t))
            }
        }, window.shuffle = function(e) {
            for (var t, o, n = e.length; n > 0;) o = Math.floor(Math.random() * n), t = e[--n], e[n] = e[o], e[o] = t;
            return e
        }, window.getProgressHtml = function(e, t) {
            return rs(vk.pr_tpl, {
                id: e || "",
                cls: t || ""
            })
        }, window.showProgress = function(e, t, o, n) {
            var i;
            if (e = ge(e)) return hasClass(e, "pr") ? i = e : (i = se(rs(vk.pr_tpl, {
                id: t || "",
                cls: o || ""
            })), n ? domInsertBefore(i, e) : e.appendChild(i)), setTimeout(function() {
                setStyle(i, {
                    opacity: 1
                })
            }), i
        }, window.hideProgress = function(e) {
            e && (hasClass(e, "pr") ? setStyle(e, {
                opacity: 0
            }) : re(geByClass1("pr", e)))
        }, window.disableEl = function(e) {
            setStyle(e, "pointer-events", "none")
        }, window.enableEl = function(e) {
            setStyle(e, "pointer-events", "")
        }, window.isToday = function(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }, window.isYesterday = function(e) {
            var t = new Date(e.getTime() + 864e5);
            return isToday(t)
        }, window.isTomorrow = function(e) {
            var t = new Date(e.getTime() - 864e5);
            return isToday(t)
        }, window.isSameDate = function(e, t) {
            var o = new Date(e),
                n = new Date(t);
            return o.getFullYear() === n.getFullYear() && o.getMonth() === n.getMonth() && o.getDate() === n.getDate()
        }, window.leadingZero = function(e) {
            return e >= 10 ? e : "0" + e
        }, window.hashCode = function(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var o = 0, n = e.length; o < n; o++) {
                t = (t << 5) - t + e.charCodeAt(o), t |= 0
            }
            return t
        }, window.onlinePlatformClass = function(e) {
            var t = " _online";
            return e && (t += " online"), mobPlatforms[e] && (t += " mobile"), updateOnlineText(), t
        }, window.toggleOnline = function(e, t) {
            var o = onlinePlatformClass(t).split(" "),
                n = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                inArray(t, o) && !hasClass(e, t) ? n.push(t) : !inArray(t, o) && hasClass(e, t) && removeClass(e, t)
            }), n.length > 0 && addClass(e, n.join(" "))
        }, window.updateAriaElements = function() {
            updateOnlineText(), updateAriaCheckboxes(), updateAriaRadioBtns()
        }, window.updateOnlineText = function() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                each(geByClass("_online"), function() {
                    var e, t = geByClass1("_online_reader", this) || this,
                        o = hasClass(this, "online"),
                        n = hasClass(this, "mobile"),
                        i = geByTag("img", t),
                        r = "",
                        a = function(e) {
                            var t = domClosest("_post", e),
                                o = t && domByClass(t, "author");
                            return o ? o.innerText || o.textContent : ""
                        };
                    o ? (each(i, function() {
                        (e = attr(this, "alt") || attr(this, "data-alt") || a(this)) && (r = trim(r + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), r = trim(r + " " + (n ? getLang("global_user_is_online_mobile") : getLang("global_user_is_online"))), t.setAttribute("aria-label", r)) : (each(i, function() {
                        (e = attr(this, "data-alt") || a(this)) && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), t.removeAttribute("aria-label"))
                })
            }, 100)
        }, window.updateAriaCheckboxes = function() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                each(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(geByClass(this))
                }), each(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", isChecked(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }, window.updateAriaRadioBtns = function() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = geByClass("radiobtn");
                each(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = isChecked(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var o = getRadioBtnWrap(this);
                        ~e.indexOf(o) || e.push(o)
                    }
                }), each(e, function() {
                    if (!geByClass("on", this).length) {
                        var e = geByClass("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }, window.getRadioBtnWrap = function(e) {
            for (var t = e, o = 0; o < 5 && t !== document;) {
                if (t = domPN(t), geByClass("radiobtn", t).length > 1) break;
                o++
            }
            return t
        }, window.isFullScreen = function() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }, window.extractPercentile = function(e, t) {
            for (var o = 0; o < t.length; o++) {
                var n = t[o];
                if (">" === n) n = ">" + t[o - 1];
                else {
                    if (1e3 * n > e) {
                        n = "<" + n;
                        break
                    }
                    n = !1
                }
            }
            return n
        }, window.collectMemtoryStats = function() {
            var e = {},
                t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
                o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
                n = !1;
            setInterval(function() {
                var i = window.cur && window.cur.module;
                i !== n && (e = {}, n = i);
                var r = window.vkLastNav;
                if (i && r) {
                    Date.now();
                    var a = extractPercentile(Date.now() - r, t);
                    if (a && !e[a]) {
                        var s = extractPercentile(Date.now() - window.vkTabLoaded, o);
                        e[a] = !0;
                        var c = performance.memory.usedJSHeapSize;
                        statlogsValueEvent("js_memory_stats_modules", c, i, a, s)
                    }
                }
            }, 5e3)
        }, window.performance && window.performance.memory && rand(0, 100) < 5 && collectMemtoryStats(), window.isPhotoeditor3Available = function() {
            return !browser.msie || parseInt(browser.version) > 10
        }, window.cancelStackFilter = function(e, t) {
            var o = window.cancelStack || [];
            return t && _topHeaderClearClose(), window.cancelStack = o.filter(function(t) {
                return t.name !== e
            }), window.cancelStack
        }, window.cancelStackPush = function(e, t, o) {
            o && _topHeaderClose(function() {
                t(), cancelStackFilter(e)
            });
            window.cancelStack;
            return window.cancelStack = cancelStackFilter(e).concat([{
                func: t,
                name: e,
                dclick: o
            }]), window.cancelStack
        }, window.cancelStackPop = function() {
            var e = window.cancelStack || [];
            _topHeaderClearClose(), e.length > 0 && e.pop().func();
            var t = e[e.length - 1];
            return t && t.dclick && _topHeaderClose(function() {
                t.func(), cancelStackFilter(t.name)
            }), window.cancelStack = e, window.cancelStack
        }, window.hasAccessibilityMode = function() {
            return !(!window.vk || !vk.a11y)
        }, window.AudioMessagePlayer = {
            loaded: !1,
            togglePlay: function(e, t) {
                stManager.add("voice_message_player.js", function() {
                    window.AudioMessagePlayer.togglePlay(e, t)
                })
            },
            detachPlayer: function(e) {
                stManager.add("voice_message_player.js", function() {
                    window.AudioMessagePlayer.detachPlayer(e)
                })
            }
        }, window.repaintFixedElements = function(e) {
            var t = "safari-repaint";
            e.forEach(function(e) {
                hasClass(e, t) && removeClass(e, t), addClass(e, t)
            }), setTimeout(function() {
                e.forEach(function(e) {
                    removeClass(e, t)
                })
            }, 100)
        }, window.setWorkerTimeout = function(e, t) {
            if (window.Worker && window.Blob) {
                var o = new Blob(["       var timeout;       onmessage = function(e) {         clearTimeout(timeout);         if (e.data == 'start') {           timeout = setTimeout(function() { postMessage({}); }, " + t + ");         }       }     "]);
                try {
                    var n = new Worker(window.URL.createObjectURL(o));
                    n.onmessage = function() {
                        n.terminate(), e()
                    }, n.postMessage("start")
                } catch (o) {
                    return setTimeout(e, t)
                }
                return n
            }
            return setTimeout(e, t)
        }, window.clearWorkerTimeout = function(e) {
            if (!e) return !1;
            isNumeric(e) ? clearTimeout(e) : e.terminate()
        }, window.getStatusExportHash = function() {
            return vk.statusExportHash
        }, window.getPageHeaderHeight = function() {
            var e = ge("page_header");
            return cached = cached || (e ? e.offsetHeight : 0)
        },
        function() {
            var e = .5,
                t = .25,
                o = 300,
                n = 1e3,
                i = 3e5,
                r = 2500,
                a = 5e3,
                s = 6e3,
                c = 2e4,
                l = 1e3,
                d = 36e4,
                u = "_longViewType",
                p = "_longViewIdled",
                _ = "_longViewModule",
                h = "_longViewStarted",
                f = "_longViewProcessed",
                w = "_longViewCached",
                v = "_longViewHeight",
                g = "_longViewTop",
                m = "_longViewBottom",
                b = "REGULAR",
                y = "AUTOPLAY_AD",
                x = "LongView.viewed",
                k = "LongView.idled",
                C = vk.longViewTestGroup,
                T = [],
                L = [],
                S = [],
                E = Date.now(),
                B = 0,
                A = 0,
                P = !1,
                M = null,
                N = null,
                j = null,
                I = null,
                O = {};

            function D() {
                var e = oe();
                e.length && (Q(e), ne())
            }

            function F() {
                T.forEach(function(e) {
                    e[w] = !1
                })
            }

            function H(e, t) {
                "im" === t && !e[u] && function(e) {
                    if (hasClass(e, "im-mess--post")) return !0;
                    var t = e && domFC(e);
                    return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || hasClass(e, "no_posts"))
                }(e) && (e[u] = function(e) {
                    var t = e && domFC(e);
                    return t && t.hasAttribute("data-ad-video-autoplay") ? y : b
                }(e), e[_] = t, T.push(e))
            }

            function q(o, n) {
                var i = q;
                ! function(o, n) {
                    var i = [];
                    T.forEach(function(r) {
                        ce(r) ? i.push(r) : ! function(t, o, n) {
                            return !t[h] && re(t, e, o, n)
                        }(r, o, n) ? function(e, o, n) {
                            return e[h] && !re(e, t, o, n)
                        }(r, o, n) && (r[p] ? delete r[p] : (le(L, r), S = S.concat(se(r))), delete r[h]) : (r[h] = Date.now(), L.push(r))
                    }), i.forEach(function(e) {
                        le(T, e)
                    })
                }(o || scrollGetY(), n || window.innerHeight), P ? (clearTimeout(i.timer), i.timer = setTimeout(R, 150)) : (P = !0, Y(), function() {
                    if ("/im" === location.pathname) {
                        var e = geByClass1("im-page--chat-header"),
                            t = geByClass1("im-page--chat-input");
                        B = e.getBoundingClientRect().top + e.offsetHeight, A = window.innerHeight - t.getBoundingClientRect().top
                    } else B = ge("page_header").offsetHeight, A = 0
                }())
            }

            function R() {
                Y(), U(), P = !1
            }

            function W() {
                Y(), Z()
            }

            function V() {
                S = [], L.forEach(function(e) {
                    e[h] = Date.now()
                }), J(null), ee(null), U()
            }

            function z() {
                Y(), Z(), S = [], L = [], J(null), ee(null)
            }

            function U() {
                M = setTimeout(K, r), N = setTimeout(G, a), j = setTimeout(X, s), I = setTimeout($, c)
            }

            function Y() {
                clearTimeout(M), clearTimeout(N), clearTimeout(j), clearTimeout(I)
            }

            function K() {
                S.length && J(S)
            }

            function G() {
                Q(S), S = [], J(null)
            }

            function X() {
                L.length && (ee(ae(L, !0, !0)), j = setTimeout(X, l))
            }

            function $() {
                clearTimeout(j), Q(ae(L)), L.forEach(function(e) {
                    e[p] = !0
                }), L = [], ee(null)
            }

            function Z() {
                Q(S.concat(ae(L)))
            }

            function Q(e) {
                e && e.length && ajax.post("/al_page.php", {
                    act: "seen",
                    data: function(e) {
                        var t = {},
                            o = [];
                        for (var n in e.forEach(function(e) {
                                var o = e.ownerId,
                                    n = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                                t[o] || (t[o] = []), t[o].push(e.module + e.postId + n + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                            }), t) o.push(n + "_" + t[n].join(","));
                        return o.join(";")
                    }(e),
                    long_view: 1
                })
            }

            function J(e) {
                te(x, e)
            }

            function ee(e) {
                te(k, e)
            }

            function te(e, t) {
                var o = ls.get(e) || {};
                t ? o[E] = t : delete o[E], ls.set(e, o)
            }

            function oe() {
                var e = oe,
                    t = [],
                    o = ls.get(x) || {},
                    n = ls.get(k) || {};
                return e.iterator || (e.iterator = function(e) {
                    return function(o) {
                        ie(o) && (t = t.concat(e[o]))
                    }
                }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
            }

            function ne() {
                var e = ne,
                    t = ls.get(x) || {},
                    o = ls.get(k) || {};
                e.iterator || (e.iterator = function(e) {
                    return function(t) {
                        ie(t) && delete e[t]
                    }
                }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ls.set(x, t), ls.set(k, o)
            }

            function ie(e) {
                var t = Number(e);
                return t !== E && Date.now() - t >= d
            }

            function re(e, t, o, n) {
                if (!e) return !1;
                e[w] || (e[w] = !0, e[v] = e.offsetHeight, e[g] = o + e.getBoundingClientRect().top, e[m] = e[g] + e[v]);
                var i = n - B - A,
                    r = o + B,
                    a = o + n - A,
                    s = e[v],
                    c = e[g],
                    l = e[m];
                return (l > r && c < a ? Math.min(a, l) - Math.max(r, c) : 0) >= Math.min(i * t, s * t)
            }

            function ae(e, t, o) {
                var n = [];
                return e.forEach(function(e) {
                    n = n.concat(se(e, t, o))
                }), n
            }

            function se(e, t, r) {
                if (ce(e)) return [];
                var a = Math.min(i, Date.now() - e[h]);
                if (e[u] === b && a < o || e[u] === y && a < n) return [];
                r || (e[f] = !0);
                var s, c, l, d, p, w = function(e) {
                        var t = e[_];
                        if ("im" === t) {
                            var o = attr(e, "data-post-id"),
                                n = attr(e, "data-copy"),
                                i = {
                                    index: -1,
                                    module: "im"
                                };
                            return o && (i[o] = -1), n && (i[n] = -1), i
                        }
                        try {
                            return window[t].postsGetRaws(e)
                        } catch (t) {
                            return console.error("Unable to extract data from elem", e), []
                        }
                    }(e),
                    v = {
                        feed: "f",
                        public: "c",
                        groups: "c",
                        profile: "p",
                        im: "m",
                        feed_search: "s",
                        feed_news_recent: "r",
                        feed_news: "r",
                        feed_news_top: "t",
                        feed_recommended: "d",
                        feed_recommended_recent: "d",
                        feed_recommended_top: "e",
                        feed_photos: "h",
                        feed_videos: "v",
                        feed_friends: "n",
                        feed_likes: "k",
                        feed_list: "z",
                        feed_other: "o"
                    }["feed_other" === (s = w.module) ? "feed_" + cur.section : s] || "u",
                    g = cur.feed_session_id || "na",
                    m = [];
                for (p in w)
                    if ("index" !== p && "module" !== p && "q" !== p) {
                        if (c = (d = p.split("_"))[0], l = d[1], "ads" === c && d[3], /^post\d+$/.test(c) && (c = d[1], l = d[2]), !t) {
                            var x = c + "_" + l;
                            O[x] || (O[x] = 0), O[x]++
                        }
                        m.push("ad" === c ? {
                            ownerId: "ad",
                            postId: l,
                            module: v,
                            viewIndex: O[x]
                        } : "ads" === c ? {
                            ownerId: "ads",
                            postId: l,
                            module: v,
                            index: w.index,
                            duration: a,
                            sessionId: g,
                            viewIndex: O[x]
                        } : {
                            ownerId: c,
                            postId: (1 === w[p] ? "" : "-") + l,
                            module: v,
                            index: w.index,
                            duration: a,
                            sessionId: g,
                            q: w.q || null,
                            viewIndex: O[x]
                        })
                    }
                return m
            }

            function ce(e) {
                return "page_view" === C && e[f] || !document.body.contains(e)
            }

            function le(e, t) {
                var o = e.indexOf(t);
                o >= 0 && e.splice(o, 1)
            }
            C ? (addEvent(window, "blur", W), addEvent(window, "focus", V), onDomReady(function() {
                setTimeout(D, 500)
            }), window.LongView = {
                register: H,
                onScroll: throttle(q, 50),
                onBeforePageChange: z,
                clearElemsCache: F,
                _debug: function() {
                    return {
                        started: L,
                        tracking: T,
                        viewedData: S,
                        viewIndexes: O,
                        blindTop: B,
                        blindBottom: A
                    }
                }
            }) : window.LongView = {
                register: function() {},
                onScroll: function() {},
                onBeforePageChange: function() {},
                clearElemsCache: function() {}
            }
        }(), window.parallel = function() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                o = new callHub(t, e.length);
            each(e, function(e, t) {
                t(function() {
                    o.done()
                })
            })
        }, window.shareAudioPlaylist = function(e, t, o, n) {
            return showBox("like.php", {
                act: "publish_box",
                object: "audio_playlist" + t + "_" + o,
                list: n
            }, {
                stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
            }), cancelEvent(e)
        }, window.audioSearchPerformer = function(e, t) {
            var o = gpeByClass("_audio_row", e),
                n = AudioUtils.getAudioFromEl(o, !0),
                i = !!window.AudioPage && currentAudioPage(o),
                r = window.AudioPage && currentAudioPage(o) || cur.audioPage;
            return layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                if (r) {
                    var o = unclean(n.performer).replace(/<em>|<\/em>/g, "");
                    nav.change({
                        q: o,
                        performer: 1
                    }, t, {
                        searchPerformer: !0,
                        nav: !0,
                        isLayer: i.isLayer()
                    })
                } else nav.go(e, t)
            }, 50), cancelEvent(t)
        }, window.getAudioPlayer = function() {
            return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : {}
        }, window.audioShowActionTooltip = function(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var n = gpeByClass("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(n, !0),
                    r = domData(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, n),
                    s = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                gpeByClass("_im_mess_stack", e) ? (s.appendParentCls = "_im_mess_stack", s.shift = [7, 10, 0], s.noZIndex = !0) : gpeByClass("top_notify_wrap", e) ? s.appendParentCls = "top_notify_wrap" : gpeByClass("_ape_audio_item", e) && (s.appendParentCls = "_ape_audio_item"), showTooltip(e, s)
            }
        }, window.deleteAudioOnClaim = function(e, t) {
            var o = geByClass1("_audio_row_" + (e + "_" + t));
            AudioUtils.deleteAudio(o, AudioUtils.getAudioFromEl(o, !0)), cur.claimWarning && cur.claimWarning.hide()
        }, window.initTopAudioPlayer = function() {
            stManager.add(["audioplayer.js"], function() {
                TopAudioPlayer.init()
            })
        }, window.toggleAudioLyrics = function(e, t, o, n) {
            if (!n) return !1;
            var i = gpeByClass("_audio_row", t),
                r = geByClass1("_audio_lyrics_wrap", i);
            return r.innerHTML ? (toggle(r), cancelEvent(e), !1) : ((n = intval(n)) && (addClass(i, "audio_loading"), showProgress(i), ajax.post("al_audio.php", {
                act: "get_lyrics",
                aid: o,
                lid: n
            }, {
                onDone: function(e) {
                    hideProgress(i), removeClass(i, "audio_loading"), r.innerHTML = e, show(r)
                }
            }), cancelEvent(e)), !1)
        }, window.openArticleEditor = function(e, t, o) {
            if (cur.articleEditorLayer) cur.articleEditorLayer.open(e, t);
            else {
                var n = [jsc("web/article_editor_layer.js"), "article.css", "article_editor.css"];
                stManager.add(n, function() {}), ajax.post("al_articles.php", {
                    act: "open_editor",
                    article_owner_id: e,
                    article_id: t,
                    from_post_convert: o ? 1 : 0,
                    post_data_medias: o ? o.medias.join(",") : ""
                }, {
                    loader: !0,
                    onFail: function(e) {
                        return showFastBox(getLang("global_error"), e), !0
                    },
                    onDone: function(e, t, i, r) {
                        window.WkView && WkView.hide(), window.__bq && __bq.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
                            layers.fullhide = function() {
                                cur.articleEditorLayer && cur.articleEditorLayer.hide()
                            }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, i, r, function() {
                                delete cur.articleEditorLayer
                            })
                        }) : nav.change({
                            z: !1
                        })
                    }
                })
            }
        }, window.toggleFastChats = function(e) {
            var t = !e;
            toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", t), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", t), each(geByClass("rb_box_wrap"), function() {
                toggleClass(this, "fast_chats_toggle_hide", t)
            })
        }, window.isArticleEditorAvailable = function() {
            return !(browser.msie && parseInt(browser.version) <= 11)
        }, window.bookmark = function(e, t, o, n) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            ajax.post("al_bookmarks.php", {
                act: "bookmark",
                owner_id: e,
                object_id: t,
                type: o,
                state: i ? 1 : 0,
                hash: n
            })
        }, window.bookmarkPost = function(e, t, o, n, i) {
            var r = parseInt(domData(e, "state"));
            e.innerHTML = r ? domData(e, "add") : domData(e, "remove"), domData(e, "state", r ? 0 : 1), bookmark(t, o, n, i, r)
        }, window.bookmarkArticle = function(e, t, o, n, i, r) {
            var a = parseInt(domData(t, "state"));
            return domData(t, "state", a ? 0 : 1), bookmark(o, n, i, r, a), cancelEvent(e)
        }, window.fifaReplaceText = function(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }, debugLog("common module enabled"), stManager.done(jsc("web/common_web.js"))
}, function(e, t, o) {
    'eat script';
    var n = o(93);
    e.exports = o(51)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return n.def(this, e = 0 === e ? 0 : e, e)
        }
    }, n)
}, function(e, t, o) {
    var n = o(98),
        i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, o) {
    var n = o(61),
        i = o(43)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || r[i] === e)
    }
}, function(e, t, o) {
    'eat script';
    var n = o(98),
        i = o(104),
        r = o(19),
        a = o(43)("species");
    e.exports = function(e) {
        var t = n[e];
        r && t && !t[a] && i.f(t, a, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, o) {
    'eat script';
    var n = o(93);
    e.exports = o(51)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = n.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return n.def(this, 0 === e ? 0 : e, t)
        }
    }, n, !0)
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") != e || t)) {
            var o = ce("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }
    var i, r, a, s;
    o.r(t), o.d(t, "setFavIcon", function() {
        return n
    }), window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", a = 1, s = !1, browser.mozilla ? s = function() {
        n("/images/icons/prgicon.gif")
    } : (browser.chrome || browser.opera && !browser.opera_mobile) && (s = function() {
        n("/images/icons/prgicon" + (a = a % 4 + 1) + ".gif"), i = setTimeout(arguments.callee, 250)
    }), window.showTitleProgress = function(e) {
        browser.mozilla || browser.chrome || (e > 0 ? r = setTimeout(showTitleProgress.pbind(!1), e) : i || (document.body && (document.body.style.cursor = "progress"), s && s()))
    }, window.hideTitleProgress = function() {
        browser.mozilla || browser.chrome || (clearTimeout(r), document.body.style.cursor = "default", i && (clearTimeout(i), i = !1), (browser.mozilla || browser.chrome || browser.opera && !browser.opera_mobile) && n("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico?" + stVersions.favicon))
    }, window.setFavIcon = n
}, function(e, t, o) {
    var n = o(98),
        i = o(1),
        r = o(7),
        a = o(12)("src"),
        s = Function.toString,
        c = ("" + s).split("toString");
    o(53).inspectSource = function(e) {
        return s.call(e)
    }, (e.exports = function(e, t, o, s) {
        var l = "function" == typeof o;
        l && (r(o, "name") || i(o, "name", t)), e[t] !== o && (l && (r(o, a) || i(o, a, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : s ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || s.call(this)
    })
}, function(e, t, o) {
    'eat script';
    var n, i, r, a;
    o.r(t), String.fromCodePoint || (n = function() {
        try {
            var e = {},
                t = Object.defineProperty,
                o = t(e, e, e) && t
        } catch (e) {}
        return o
    }(), i = String.fromCharCode, r = Math.floor, a = function(e) {
        var t, o, n = [],
            a = -1,
            s = arguments.length;
        if (!s) return "";
        for (var c = ""; ++a < s;) {
            var l = Number(arguments[a]);
            if (!isFinite(l) || l < 0 || l > 1114111 || r(l) != l) throw RangeError("Invalid code point: " + l);
            l <= 65535 ? n.push(l) : (t = 55296 + ((l -= 65536) >> 10), o = l % 1024 + 56320, n.push(t, o)), (a + 1 == s || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
        }
        return c
    }, n ? n(String, "fromCodePoint", {
        value: a,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = a)
}, function(e, t, o) {
    var n = o(36)("wks"),
        i = o(12),
        r = o(98).Symbol,
        a = "function" == typeof r;
    e.exports = function(e) {
        return n[e] || (n[e] = a && r[e] || (a ? r : i)("Symbol." + e))
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), window.ls = {
        checkVersion: function() {
            return void 0 !== window.localStorage && void 0 !== window.JSON
        },
        set: function(e, t) {
            this.remove(e);
            try {
                return !!ls.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                return !1
            }
        },
        get: function(e) {
            if (!ls.checkVersion()) return !1;
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (e) {
                return !1
            }
        },
        remove: function(e) {
            try {
                localStorage.removeItem(e)
            } catch (e) {}
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "vkLocal", function() {
        return r
    }), o.d(t, "lTimeout", function() {
        return a
    }), o.d(t, "rand", function() {
        return s
    }), o.d(t, "irand", function() {
        return c
    }), o.d(t, "isUndefined", function() {
        return l
    }), o.d(t, "isFunction", function() {
        return d
    }), o.d(t, "isArray", function() {
        return u
    }), o.d(t, "isString", function() {
        return p
    }), o.d(t, "isObject", function() {
        return _
    }), o.d(t, "isEmpty", function() {
        return h
    }), o.d(t, "vkNow", function() {
        return f
    }), o.d(t, "vkImage", function() {
        return w
    }), o.d(t, "trim", function() {
        return v
    }), o.d(t, "stripHTML", function() {
        return g
    }), o.d(t, "escapeRE", function() {
        return m
    }), o.d(t, "intval", function() {
        return b
    }), o.d(t, "floatval", function() {
        return y
    }), o.d(t, "positive", function() {
        return x
    }), o.d(t, "isNumeric", function() {
        return k
    }), o.d(t, "winToUtf", function() {
        return C
    }), o.d(t, "replaceEntities", function() {
        return T
    }), o.d(t, "clean", function() {
        return L
    }), o.d(t, "unclean", function() {
        return S
    }), o.d(t, "each", function() {
        return E
    }), o.d(t, "indexOf", function() {
        return B
    }), o.d(t, "inArray", function() {
        return A
    }), o.d(t, "clone", function() {
        return P
    }), o.d(t, "arrayKeyDiff", function() {
        return M
    }), o.d(t, "extend", function() {
        return N
    }), o.d(t, "addTemplates", function() {
        return j
    }), o.d(t, "getTemplate", function() {
        return I
    }), o.d(t, "serializeForm", function() {
        return O
    }), o.d(t, "extractUrls", function() {
        return H
    }), o.d(t, "isRetina", function() {
        return q
    }), o.d(t, "getCaretCharacterOffsetWithin", function() {
        return R
    }), o.d(t, "formatCount", function() {
        return W
    }), o.d(t, "encodeHtml", function() {
        return U
    }), o.d(t, "decodeHtml", function() {
        return Y
    });
    var n = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function r(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function a(e, t) {
        return setTimeout(r(e), t)
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

    function _(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function h(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function f() {
        return +new Date
    }

    function w() {
        return window.Image ? new Image : ce("img")
    }

    function v(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function g(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function m(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function b(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function y(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function x(e) {
        return (e = b(e)) < 0 ? 0 : e
    }

    function k(e) {
        return !isNaN(e)
    }

    function C(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = b(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function T(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function L(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function S(e) {
        return T(e.replace(/\t/g, "\n"))
    }

    function E(e, t) {
        if (_(e) || void 0 === e.length) {
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && !1 === t.call(e[o], o, e[o])) break
        } else
            for (var n = 0, i = e.length; n < i; n++) {
                var r = e[n];
                if (!1 === t.call(r, n, r)) break
            }
        return e
    }

    function B(e, t, o) {
        for (var n = o || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function A(e, t) {
        return -1 != B(t, e)
    }

    function P(e, t) {
        var o = _(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === i(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = P(e[n]) : o[n] = e[n]);
        return o
    }

    function M(e) {
        var t, o, n = {},
            i = 1,
            r = arguments.length,
            a = arguments;
        for (t in e) {
            for (o = !1, i = 1; i < r; i++) a[i][t] && a[i][t] == e[t] && (o = !0);
            o || (n[t] = e[t])
        }
        return n
    }

    function N() {
        var e, t = arguments,
            o = t[0] || {},
            n = 1,
            r = t.length,
            a = !1;
        for ("boolean" == typeof o && (a = o, o = t[1] || {}, n = 2), "object" === (void 0 === o ? "undefined" : i(o)) || d(o) || (o = {}); n < r; ++n)
            if (null != (e = t[n]))
                for (var s in e) {
                    var c = o[s],
                        l = e[s];
                    o !== l && (a && l && "object" === (void 0 === l ? "undefined" : i(l)) && !l.nodeType ? o[s] = N(a, c || (null != l.length ? [] : {}), l) : void 0 !== l && (o[s] = l))
                }
        return o
    }

    function j(e) {
        window.templates = window.templates || {}, N(window.templates, e)
    }

    function I(e, t) {
        var o = (window.templates = window.templates || {})[e];
        return "function" == typeof o && (o = o()), o && t ? rs(o, t) : o || ""
    }

    function O(e) {
        if ("object" != (void 0 === e ? "undefined" : i(e))) return !1;
        var t = {},
            o = function(t) {
                return geByTag(t, e)
            },
            n = function(o, n) {
                if (n.name)
                    if ("text" != n.type && n.type)
                        if (n.getAttribute("bool")) {
                            var i = val(n);
                            if (!i || "0" === i) return;
                            t[n.name] = 1
                        } else t[n.name] = browser.msie && !n.value && e[n.name] ? e[n.name].value : n.value;
                else t[n.name] = val(n)
            };
        return E(o("input"), function(e, t) {
            if ("radio" != t.type && "checkbox" != t.type || t.checked) return n(0, t)
        }), E(o("select"), n), E(o("textarea"), n), t
    }
    window.PageID = window.PageID || 1;
    var D = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        F = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

    function H(e, t) {
        for (var o, n = t ? F : D, i = []; e && (o = e.match(n));) {
            e = e.substr(o.index + o[0].length);
            var r = 0;
            o[4] || (r = 7), i.push({
                url: o[2 + r],
                query: o[5 + r] || "",
                domain: o[4 + r]
            })
        }
        return i
    }

    function q() {
        return window.devicePixelRatio >= 2
    }

    function R(e) {
        var t = 0,
            o = 0,
            n = e.ownerDocument || e.document,
            i = n.defaultView || n.parentWindow;
        if (i.getSelection().rangeCount > 0) {
            var r = i.getSelection().getRangeAt(0),
                a = r.cloneRange();
            a.selectNodeContents(e), a.setEnd(r.startContainer, r.startOffset), t = a.toString().length, a.setEnd(r.endContainer, r.endOffset), o = a.toString().length
        }
        return [t, o]
    }

    function W(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? W(e = (e = b(e / 1e5)) > 1e3 ? b(e / 10) : e / 10, N(t, {
            noCheck: !0
        }), !0) + "M" : e >= o && !t.noCheck ? W(e = (e = b(e / 100)) > 100 ? b(e / 10) : e / 10, N(t, {
            noCheck: !0
        }), !0) + "K" : langNumeric(e, "%s", !0).replace(/,/g, ".")
    }
    var V, z = n((V = null, [function(e) {
            return V || (V = se("<span> </span>")), V.innerText = e, V.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return V || (V = se("<span> </span>")), V.innerHTML = e, V.innerText
        }]), 2),
        U = z[0],
        Y = z[1];
    window.isRetina = q, window.extractUrls = H, window.serializeForm = O, window.addTemplates = j, window.getTemplate = I, window.rand = s, window.irand = c, window.isUndefined = l, window.isFunction = d, window.isArray = u, window.isString = p, window.isObject = _, window.isEmpty = h, window.vkNow = f, window.vkImage = w, window.trim = v, window.stripHTML = g, window.escapeRE = m, window.intval = b, window.floatval = y, window.positive = x, window.isNumeric = k, window.winToUtf = C, window.replaceEntities = T, window.clean = L, window.unclean = S, window.each = E, window.indexOf = B, window.inArray = A, window.clone = P, window.arrayKeyDiff = M, window.extend = N, window.vkLocal = r, window.lTimeout = a, window.getCaretCharacterOffsetWithin = R, window.formatCount = W, window.encodeHtml = U, window.decodeHtml = Y
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';

    function topMsg(e, t, o) {
        if (o || (o = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var n = ge("system_msg");
            n.style.backgroundColor = o, n.innerHTML = e, show(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else hide("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var e = text;
            text = "<b>JavaScript error:</b> " + e.message, opts.stack = e.stack, e.stack && __debugMode && (text += "<br/>" + e.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(e.stack)
            } catch (e) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || ge("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", extend(opts, {
            msg: opts.msg || text,
            module: (window.cur || {}).module,
            id: vk.id,
            host: locHost,
            lang: vk.lang,
            loc: (window.nav || {}).strLoc,
            realloc: location.toString()
        })))
    }

    function showMsg(e, t, o, n) {
        var i = "msg" + ("msg" !== o ? " " + o : "");
        n && (i += " msg_appear"), e = ge(e);
        var r = geByClass1(o, e),
            a = r || domFC(e),
            s = e.insertBefore(ce("div", {
                className: i,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), a);
        r && re(r), setTimeout(removeClass.pbind(s, "msg_appear"), 0)
    }
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), window.topMsg = topMsg, window.showMsg = showMsg, window.topError = topError
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ge", function() {
        return l
    }), o.d(t, "geByTag", function() {
        return d
    }), o.d(t, "geByTag1", function() {
        return u
    }), o.d(t, "geByClass", function() {
        return p
    }), o.d(t, "geByClass1", function() {
        return _
    }), o.d(t, "gpeByClass", function() {
        return h
    }), o.d(t, "domQuery", function() {
        return f
    }), o.d(t, "domQuery1", function() {
        return w
    }), o.d(t, "domClosest", function() {
        return v
    }), o.d(t, "domClosestByTag", function() {
        return g
    }), o.d(t, "gpeByTag", function() {
        return m
    }), o.d(t, "ce", function() {
        return b
    }), o.d(t, "re", function() {
        return y
    }), o.d(t, "se", function() {
        return x
    }), o.d(t, "sech", function() {
        return k
    }), o.d(t, "rs", function() {
        return C
    }), o.d(t, "psr", function() {
        return T
    }), o.d(t, "domReplaceEl", function() {
        return L
    }), o.d(t, "domEL", function() {
        return S
    }), o.d(t, "domNS", function() {
        return E
    }), o.d(t, "domPS", function() {
        return B
    }), o.d(t, "domFC", function() {
        return A
    }), o.d(t, "domLC", function() {
        return P
    }), o.d(t, "domPN", function() {
        return M
    }), o.d(t, "domChildren", function() {
        return N
    }), o.d(t, "domInsertBefore", function() {
        return j
    }), o.d(t, "domInsertAfter", function() {
        return I
    }), o.d(t, "domByClass", function() {
        return O
    }), o.d(t, "domData", function() {
        return D
    }), o.d(t, "domChildIndex", function() {
        return F
    }), o.d(t, "domCA", function() {
        return H
    }), o.d(t, "domClosestSibling", function() {
        return q
    }), o.d(t, "matchesSelector", function() {
        return R
    }), o.d(t, "isHover", function() {
        return W
    }), o.d(t, "isAncestor", function() {
        return V
    }), o.d(t, "getScroll", function() {
        return z
    }), o.d(t, "domClosestPositioned", function() {
        return U
    }), o.d(t, "domClosestOverflowHidden", function() {
        return Y
    }), o.d(t, "show", function() {
        return K
    }), o.d(t, "hide", function() {
        return G
    }), o.d(t, "isVisible", function() {
        return X
    }), o.d(t, "clientHeight", function() {
        return $
    }), o.d(t, "getClientRectOffsetY", function() {
        return Z
    }), o.d(t, "toggle", function() {
        return Q
    }), o.d(t, "boundingRectEnabled", function() {
        return J
    }), o.d(t, "getXYRect", function() {
        return ee
    }), o.d(t, "getXY", function() {
        return te
    }), o.d(t, "isWindow", function() {
        return oe
    }), o.d(t, "getSize", function() {
        return ne
    }), o.d(t, "getW", function() {
        return ie
    }), o.d(t, "getH", function() {
        return re
    }), o.d(t, "hasClass", function() {
        return ae
    }), o.d(t, "addClass", function() {
        return se
    }), o.d(t, "addClassDelayed", function() {
        return ce
    }), o.d(t, "removeClass", function() {
        return le
    }), o.d(t, "removeClassDelayed", function() {
        return de
    }), o.d(t, "toggleClass", function() {
        return ue
    }), o.d(t, "toggleClassDelayed", function() {
        return pe
    }), o.d(t, "replaceClass", function() {
        return _e
    }), o.d(t, "getStyle", function() {
        return he
    }), o.d(t, "setStyle", function() {
        return fe
    }), o.d(t, "setStyleDelayed", function() {
        return we
    }), o.d(t, "setPseudoStyle", function() {
        return ve
    }), o.d(t, "data", function() {
        return ge
    }), o.d(t, "attr", function() {
        return me
    }), o.d(t, "removeAttr", function() {
        return be
    }), o.d(t, "removeData", function() {
        return ye
    }), o.d(t, "cleanElems", function() {
        return xe
    }), o.d(t, "setTitle", function() {
        return ke
    }), o.d(t, "getZoom", function() {
        return Ce
    }), o.d(t, "val", function() {
        return Te
    }), o.d(t, "elfocus", function() {
        return Le
    }), o.d(t, "traverseParent", function() {
        return Se
    }), o.d(t, "setDocumentTitle", function() {
        return Be
    }), o.d(t, "lockDocumentTitle", function() {
        return Ae
    });
    var n, i, r, a, s = o(45),
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

    function p(e, t, o) {
        t = l(t) || document, o = o || "*";
        var n = [];
        if (t.querySelectorAll && "*" != o) return t.querySelectorAll(o + "." + e);
        if (t.getElementsByClassName) {
            var i = t.getElementsByClassName(e);
            if ("*" != o) {
                o = o.toUpperCase();
                for (var r = 0, a = i.length; r < a; ++r) i[r].tagName.toUpperCase() == o && n.push(i[r])
            } else n = Array.prototype.slice.call(i);
            return n
        }
        var s = d(o, t),
            c = new RegExp("(^|\\s)" + e + "(\\s|$)");
        for (r = 0, a = s.length; r < a; ++r) c.test(s[r].className) && n.push(s[r]);
        return n
    }

    function _(e, t, o) {
        return t = l(t) || document, o = o || "*", t.querySelector && t.querySelector(o + "." + e) || p(e, t, o)[0]
    }

    function h(e, t, o) {
        if (!(t = l(t))) return null;
        for (; o !== t && (t = t.parentNode);)
            if (ae(t, e)) return t;
        return null
    }

    function f(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function w(e, t) {
        return (t || document).querySelector(e)
    }

    function v(e, t) {
        return ae(t, e) ? t : h(e, t)
    }

    function g(e, t) {
        return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : m(e, t)
    }

    function m(e, t) {
        if (!(t = l(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() == e) return t;
        return null
    }

    function b(e, t, o) {
        var n = document.createElement(e);
        return t && extend(n, t), o && fe(n, o), n
    }

    function y(e) {
        return (e = l(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }

    function x(e) {
        return A(b("div", {
            innerHTML: e
        }))
    }

    function k(e) {
        return N(b("div", {
            innerHTML: e
        }))
    }

    function C(e, t) {
        return each(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function T(e) {
        return "https:" != locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function L(e, t) {
        return isString(t) && (t = x(t)), M(e).replaceChild(t, e), t
    }

    function S(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function E(e) {
        return S((e || {}).nextSibling)
    }

    function B(e) {
        return S((e || {}).previousSibling, 1)
    }

    function A(e) {
        return S((e || {}).firstChild)
    }

    function P(e) {
        return S((e || {}).lastChild, 1)
    }

    function M(e) {
        return (e || {}).parentNode
    }

    function N(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function j(e, t) {
        var o = M(t);
        return o && o.insertBefore(e, t)
    }

    function I(e, t) {
        var o = M(t);
        return o && o.insertBefore(e, E(t))
    }

    function O(e, t) {
        return e ? _(t, e) : e
    }

    function D(e, t, o) {
        return e ? void 0 !== o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function F(e) {
        for (var t = 0; null != (e = B(e));) t++;
        return t
    }

    function H(e, t) {
        do {
            e = M(e)
        } while (e && !R(e, t));
        return e
    }

    function q(e, t, o) {
        for (var n = null; null === n && e;)(e = -1 === o ? B(e) : E(e)) && R(e, t) && (n = e);
        return n
    }

    function R(e, t) {
        return !(!(e = l(e)) || e == document) && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t[o] !== this;);
            return o > -1
        }).call(e, t)
    }

    function W(e) {
        return R(e, ":hover")
    }

    function V(e, t) {
        var o = l(e);
        if (t = l(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o == t) return !0;
        return !1
    }

    function z() {
        var e = browser.msie6 ? l("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function U(e, t) {
        for (var o = (t = t || {}).fromEl || M(e), n = t.positions || ["relative", "absolute", "fixed"]; o && o != bodyNode;) {
            var i = he(o, "position");
            if (inArray(i, n) && (!t.noOverflow || "hidden" != he(o, "overflow"))) break;
            o = M(o)
        }
        return o
    }

    function Y(e, t) {
        for (var o, n, i, r, a = e = l(e); a && a.tagName && a !== bodyNode && (o = he(a, "position"), n = he(a, "overflow"), i = he(a, "transform"), !t || !browser.mozilla || "page_wrap" == a.id || a === e || "visible" === n || ("static" === o ? r && "relative" !== r : "fixed" === r));) "none" !== i ? r = void 0 : "static" !== o && "fixed" !== r && (r = o), a = M(a);
        return a
    }

    function K(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) K(arguments[o]);
        else if ((e = l(e)) && e.style) {
            var n = e.olddisplay,
                i = "block",
                r = e.tagName.toLowerCase();
            e.style.display = n || "", "none" === he(e, "display") && (i = ae(e, "inline") || ae(e, "_inline") ? "inline" : ae(e, "_inline_block") ? "inline-block" : "tr" !== r || browser.msie ? "table" !== r || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
        }
    }

    function G(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) G(arguments[o]);
        else if ((e = l(e)) && e.style) {
            var n = he(e, "display");
            e.olddisplay = "none" != n ? n : "", e.style.display = "none"
        }
    }

    function X(e) {
        return !(!(e = l(e)) || !e.style) && "none" != he(e, "display")
    }

    function $() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function Z(e, t, o) {
        e = l(e), o = o || 0;
        var n = te(e)[1],
            i = ne(e)[1],
            r = window,
            a = document.documentElement,
            s = Math.max(intval(r.innerHeight), intval(a.clientHeight)),
            c = l("page_header_cont"),
            d = a.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            u = vk.staticheader ? Math.max(0, ne(c)[1] - d) : ne(c)[1];
        if (t) {
            if (n + i < d + u + o) return n + i - d - u - o;
            if (n > d + s - o) return n - d - s + o
        } else {
            if (n < d + u + o) return n - d - u - o;
            if (n + i > d + s - o) return n + i - d - s + o
        }
        return 0
    }

    function Q(e, t) {
        return void 0 === t && (t = !X(e)), t ? K(e) : G(e), t
    }

    function J(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function ee(e, t) {
        var o;
        if (t && "inline" == he(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function te(e, t) {
        if (!(e = l(e))) return [0, 0];
        var o, n, i = {
                top: 0,
                left: 0
            },
            r = e.ownerDocument;
        return r ? (o = r.documentElement, J(e) && (i = ee(e, !0)), n = r == r.window ? r : 9 === r.nodeType && (r.defaultView || r.parentWindow), [i.left + (t ? 0 : n.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), i.top + (t ? 0 : n.pageYOffset || o.scrollTop) - (o.clientTop || 0)]) : [0, 0]
    }

    function oe(e) {
        return null != e && e === e.window
    }

    function ne(e, t, o) {
        e = l(e);
        var n, i = [0, 0],
            r = document.documentElement;
        if (t && "border-box" === he(e, "boxSizing") && (t = !1), e == document) i = [Math.max(r.clientWidth, bodyNode.scrollWidth, r.scrollWidth, bodyNode.offsetWidth, r.offsetWidth), Math.max(r.clientHeight, bodyNode.scrollHeight, r.scrollHeight, bodyNode.offsetHeight, r.offsetHeight)];
        else if (e) {
            var a = function() {
                if (i = J(e) && (n = ee(e, o)) && void 0 !== n.width ? [n.width, n.height] : [e.offsetWidth, e.offsetHeight], t) {
                    each(i, function(t, o) {
                        each(t ? ["Top", "Bottom"] : ["Left", "Right"], function() {
                            i[t] -= parseFloat(he(e, "padding" + this)) || 0, i[t] -= parseFloat(he(e, "border" + this + "Width")) || 0
                        })
                    })
                }
            };
            if (X(e)) a();
            else {
                var s = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    c = {},
                    d = !1;
                e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), each(s, function(t, o) {
                    c[t] = e.style[t], e.style[t] = o
                }), a(), each(s, function(t, o) {
                    e.style[t] = c[t]
                }), d && (e.style.cssText = d)
            }
        }
        return i
    }

    function ie(e) {
        return ne(e)[0]
    }

    function re(e) {
        return ne(e)[1]
    }

    function ae(e, t) {
        return !!((e = l(e)) && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0)
    }

    function se(e, t) {
        (e = l(e)) && !ae(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
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

    function ue(e, t, o) {
        return void 0 === o && (o = !ae(e, t)), (o ? se : le)(e, t), o
    }

    function pe(e, t, o) {
        return void 0 === o && (o = !ae(e, t)), (o ? ce : de)(e, t), o
    }

    function _e(e, t, o) {
        le(e, t), se(e, o)
    }

    function he(e, t, o) {
        if (e = l(e), isArray(t)) {
            var n = {};
            return each(t, function(t, o) {
                n[o] = he(e, o)
            }), n
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" == t && browser.msie) return (s = e.style.filter) ? s.indexOf("opacity=") >= 0 ? parseFloat(s.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : "";
        if (!o && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var i, r = document.defaultView || window;
        if (r.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var a = r.getComputedStyle(e, null);
            a && (i = a.getPropertyValue(t))
        } else if (e.currentStyle) {
            var s;
            if ("opacity" == t && browser.msie) return (s = e.currentStyle.filter) && s.indexOf("opacity=") >= 0 ? parseFloat(s.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1";
            var c = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" == (i = e.currentStyle[t] || e.currentStyle[c]) && (i = 0), i = (i + "").split(" "), each(i, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        r = n.left,
                        a = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, i[t] = n.pixelLeft + "px", n.left = r, e.runtimeStyle.left = a
                }
            }), i = i.join(" ")
        }
        if (o && ("width" == t || "height" == t)) {
            var d = ne(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            i = (intval(i) ? Math.max(floatval(i), d) : d) + "px"
        }
        return i
    }

    function fe(e, t, o) {
        if (e = l(e)) {
            if ("object" == (void 0 === t ? "undefined" : c(t))) return each(t, function(t, o) {
                fe(e, t, o)
            });
            if ("opacity" == t) browser.msie && ((o + "").length ? e.style.filter = 1 !== o ? "alpha(opacity=" + 100 * o + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
            else try {
                var n = "number" == typeof o;
                n && /height|width/i.test(t) && (o = Math.abs(o)), o = n && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
            } catch (e) {
                debugLog("setStyle error: ", [t, o], e)
            }
        }
    }

    function we(e, t, o) {
        setTimeout(fe.pbind(e, t, o), 0)
    }

    function ve(e, t, o) {
        var n = ge(e, "pseudo-id");
        n || (ge(e, "pseudo-id", n = irand(1e8, 999999999)), se(e, "_pseudo_" + n));
        var i = t + "-style-" + n,
            r = l(i),
            a = "._pseudo_" + n + ":" + t + "{";
        r || (r = headNode.appendChild(b("style", {
            id: i,
            type: "text/css"
        }))), each(o, function(e, t) {
            a += e + ": " + t + " !important;"
        }), a += "}", r.sheet ? (r.sheet.cssRules.length && r.sheet.deleteRule(0), r.sheet.insertRule(a, 0)) : r.styleSheet && (r.styleSheet.cssText = a)
    }

    function ge(e, t, o) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== o && (vkCache[n] || (vkCache[n] = {}, __debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = o), t ? vkCache[n] && vkCache[n][t] : n
    }

    function me(e, t, o) {
        return e = l(e), void 0 === o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function be(e) {
        for (var t = 0, o = arguments.length; t < o; ++t) {
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

    function ye(e, t) {
        var o = !!e && e[vkExpand];
        if (o)
            if (t) {
                if (vkCache[o]) {
                    delete vkCache[o][t], t = "";
                    var n = 0;
                    for (t in vkCache[o])
                        if ("__elem" !== t) {
                            n++;
                            break
                        }
                    n || ye(e)
                }
            } else removeEvent(e), be(e, vkExpand), delete vkCache[o]
    }

    function xe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = l(e[t]);
            o && (ye(o), be(o, "btnevents"))
        }
    }

    function ke(e, t, o) {
        if ((e = l(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var n = u("b", e);
                n && n.scrollWidth > n.clientWidth ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Ce() {
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

    function Te(e, t, o) {
        if (e = l(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || ""
    }

    function Le(e, t, o) {
        e = l(e);
        try {
            if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== o && !1 !== o || (o = t), e.createTextRange) {
                var n = e.createTextRange();
                n.collapse(!0), n.moveEnd("character", o), n.moveStart("character", t), n.select()
            } else e.setSelectionRange && e.setSelectionRange(t, o)
        } catch (e) {}
    }

    function Se(e, t, o) {
        for (e = l(e), o = o || 999; e && !t(e);) {
            if (0 == --o) return !1;
            try {
                if ((e = M(e)) == document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    window.cf = (n = document, i = n.createDocumentFragment(), r = n.createElement("div"), a = n.createRange && n.createRange(), i.appendChild(r), a && a.selectNodeContents(r), a && a.createContextualFragment ? function(e) {
        return e ? a.createContextualFragment(e) : n.createDocumentFragment()
    } : function(e) {
        if (!e) return n.createDocumentFragment();
        r.innerHTML = e;
        for (var t = n.createDocumentFragment(); r.firstChild;) t.appendChild(r.firstChild);
        return t
    }), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var o in t)
                if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform"
        }
        return "transform"
    }(), window.vkExpand = window.vkExpand || "VK" + Object(s.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Ee = !1;

    function Be(e) {
        if (!Ee) return window.document.title = replaceEntities(e)
    }

    function Ae(e) {
        Ee = e, e && window.cur && window.cur.destroy.push(function() {
            Ae(!1)
        })
    }
    window.ge = l, window.geByTag = d, window.geByTag1 = u, window.geByClass = p, window.geByClass1 = _, window.gpeByClass = h, window.domQuery = f, window.domQuery1 = w, window.domClosest = v, window.ce = b, window.re = y, window.se = x, window.sech = k, window.rs = C, window.psr = T, window.domReplaceEl = L, window.domEL = S, window.domNS = E, window.domPS = B, window.domFC = A, window.domLC = P, window.domPN = M, window.domChildren = N, window.domInsertBefore = j, window.domInsertAfter = I, window.domByClass = O, window.domData = D, window.domChildIndex = F, window.domCA = H, window.domClosestSibling = q, window.matchesSelector = R, window.isHover = W, window.isAncestor = V, window.getScroll = z, window.domClosestPositioned = U, window.domClosestOverflowHidden = Y, window.show = K, window.hide = G, window.isVisible = X, window.clientHeight = $, window.getClientRectOffsetY = Z, window.toggle = Q, window.boundingRectEnabled = J, window.getXYRect = ee, window.getXY = te, window.isWindow = oe, window.getSize = ne, window.hasClass = ae, window.addClass = se, window.addClassDelayed = ce, window.removeClass = le, window.removeClassDelayed = de, window.toggleClass = ue, window.toggleClassDelayed = pe, window.replaceClass = _e, window.getStyle = he, window.setStyle = fe, window.setStyleDelayed = we, window.setPseudoStyle = ve, window.data = ge, window.attr = me, window.removeAttr = be, window.removeData = ye, window.cleanElems = xe, window.setTitle = ke, window.getZoom = Ce, window.val = Te, window.elfocus = Le, window.traverseParent = Se, window.getH = re, window.getW = ie, window.domClosestByTag = g, window.setDocumentTitle = Be, window.lockDocumentTitle = Ae
}, function(e, t, o) {
    var n = o(104).f,
        i = o(7),
        r = o(43)("toStringTag");
    e.exports = function(e, t, o) {
        e && !i(e = o ? e : e.prototype, r) && n(e, r, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(64);
    window.EventEmitter = n, t.default = n
}, function(e, t, o) {
    'eat script';
    var n = o(98),
        i = o(6),
        r = o(41),
        a = o(99),
        s = o(94),
        c = o(60),
        l = o(29),
        d = o(56),
        u = o(21),
        p = o(15),
        _ = o(49),
        h = o(62);
    e.exports = function(e, t, o, f, w, v) {
        var g = n[e],
            m = g,
            b = w ? "set" : "add",
            y = m && m.prototype,
            x = {},
            k = function(e) {
                var t = y[e];
                r(y, e, "delete" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return v && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, o) {
                    return t.call(this, 0 === e ? 0 : e, o), this
                })
            };
        if ("function" == typeof m && (v || y.forEach && !u(function() {
                (new m).entries().next()
            }))) {
            var C = new m,
                T = C[b](v ? {} : -0, 1) != C,
                L = u(function() {
                    C.has(1)
                }),
                S = p(function(e) {
                    new m(e)
                }),
                E = !v && u(function() {
                    for (var e = new m, t = 5; t--;) e[b](t, t);
                    return !e.has(-0)
                });
            S || ((m = t(function(t, o) {
                l(t, m, e);
                var n = h(new g, t, m);
                return void 0 != o && c(o, w, n[b], n), n
            })).prototype = y, y.constructor = m), (L || E) && (k("delete"), k("has"), w && k("get")), (E || T) && k(b), v && y.clear && delete y.clear
        } else m = f.getConstructor(t, e, w, b), a(m.prototype, o), s.NEED = !0;
        return _(m, e), x[e] = m, i(i.G + i.W + i.F * (m != g), x), v || f.setStrong(m, e, w), m
    }
}, function(e, t, o) {
    var n = o(80),
        i = o(84),
        r = o(88);
    e.exports = function(e) {
        return function(t, o, a) {
            var s, c = n(t),
                l = i(c.length),
                d = r(a, l);
            if (e && o != o) {
                for (; l > d;)
                    if ((s = c[d++]) != s) return !0
            } else
                for (; l > d; d++)
                    if ((e || d in c) && c[d] === o) return e || d;
            return !e && -1
        }
    }
}, function(e, t) {
    var o = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = o)
}, function(e, t, o) {
    var n = o(7),
        i = o(87),
        r = o(71)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t, o, n, i) {
        if (void 0 !== e && void 0 !== t) {
            var r, a = [].slice.apply(arguments, [2, 5]);
            aquireLock("stats_cookie_lock", function() {
                try {
                    r = (r = JSON.parse(getCookie("remixsts"))).data
                } catch (e) {
                    r = []
                }
                for (r.push([Math.round(Date.now() / 1e3), e, t].concat(a)); r.length > 100;) r.shift();
                var o = Math.round(rand(0, 1e9));
                setCookie("remixsts", JSON.stringify({
                    data: r,
                    uniqueId: o
                }), .01)
            })
        }
    }
    o.r(t), o.d(t, "statlogsValueEvent", function() {
        return n
    }), window.statlogsValueEvent = n
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, o) {
    var n = o(66);
    e.exports = function(e, t, o) {
        if (n(e), void 0 === t) return e;
        switch (o) {
            case 1:
                return function(o) {
                    return e.call(t, o)
                };
            case 2:
                return function(o, n) {
                    return e.call(t, o, n)
                };
            case 3:
                return function(o, n, i) {
                    return e.call(t, o, n, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, o) {
    'eat script';
    var n = o(68),
        i = o(6),
        r = o(41),
        a = o(1),
        s = o(7),
        c = o(61),
        l = o(30),
        d = o(49),
        u = o(54),
        p = o(43)("iterator"),
        _ = !([].keys && "next" in [].keys()),
        h = function() {
            return this
        };
    e.exports = function(e, t, o, f, w, v, g) {
        l(o, t, f);
        var m, b, y, x = function(e) {
                if (!_ && e in L) return L[e];
                switch (e) {
                    case "keys":
                    case "values":
                        return function() {
                            return new o(this, e)
                        }
                }
                return function() {
                    return new o(this, e)
                }
            },
            k = t + " Iterator",
            C = "values" == w,
            T = !1,
            L = e.prototype,
            S = L[p] || L["@@iterator"] || w && L[w],
            E = S || x(w),
            B = w ? C ? x("entries") : E : void 0,
            A = "Array" == t && L.entries || S;
        if (A && (y = u(A.call(new e))) !== Object.prototype && (d(y, k, !0), n || s(y, p) || a(y, p, h)), C && S && "values" !== S.name && (T = !0, E = function() {
                return S.call(this)
            }), n && !g || !_ && !T && L[p] || a(L, p, E), c[t] = E, c[k] = h, w)
            if (m = {
                    values: C ? E : x("values"),
                    keys: v ? E : x("keys"),
                    entries: B
                }, g)
                for (b in m) b in L || r(L, b, m[b]);
            else i(i.P + i.F * (_ || T), t, m);
        return m
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t, o, i) {
        if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), i || (e = Math.max(0, e - (vk.staticheader ? 0 : getSize("page_header_cont")[1]))), data(bodyNode, "tween") && data(bodyNode, "tween").stop(!1), data(htmlNode, "tween") && data(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var s = function() {
                window.scrollAnimation = !1, 2 === o && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), updSideTopLink())
            };
            window.scrollAnimation = !0, animate(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: s
            }), animate(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: s
            })
        } else {
            if (o && 2 !== o) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var c = a() - e;
                return Math.abs(c) > 6 && n(e + (c > 0 ? 6 : -6), 0, 2, !0), updSideTopLink(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(n.pbind(e, 100, 2, !0), 0))
            }
            window.scroll(r(), e), o || updSideTopLink()
        }
    }

    function i(e) {
        return n(0, e)
    }

    function r() {
        return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
    }

    function a() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }

    function s() {
        bodyNode.style.overflow = "hidden"
    }

    function c() {
        bodyNode.style.overflow = "auto"
    }
    o.r(t), o.d(t, "scrollToY", function() {
        return n
    }), o.d(t, "scrollToTop", function() {
        return i
    }), o.d(t, "scrollGetX", function() {
        return r
    }), o.d(t, "scrollGetY", function() {
        return a
    }), o.d(t, "disableBodyScroll", function() {
        return s
    }), o.d(t, "enableBodyScroll", function() {
        return c
    }), window.scrollToY = n, window.scrollToTop = i, window.scrollGetX = r, window.scrollGetY = a, window.disableBodyScroll = s, window.enableBodyScroll = c
}, function(e, t, o) {
    var n = o(57),
        i = o(91),
        r = o(37),
        a = o(70),
        s = o(84),
        c = o(17);
    e.exports = function(e, t, o, l, d) {
        var u, p, _, h = d ? function() {
                return e
            } : c(e),
            f = n(o, l, t ? 2 : 1),
            w = 0;
        if ("function" != typeof h) throw TypeError(e + " is not iterable!");
        if (r(h))
            for (u = s(e.length); u > w; w++) t ? f(a(p = e[w])[0], p[1]) : f(e[w]);
        else
            for (_ = h.call(e); !(p = _.next()).done;) i(_, f, p.value, t)
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t, o) {
    var n = o(56),
        i = o(0).set;
    e.exports = function(e, t, o) {
        var r, a = t.constructor;
        return a !== o && "function" == typeof a && (r = a.prototype) !== o.prototype && n(r) && i && i(e, r), e
    }
}, function(e, t, o) {
    o(24), o(75), o(72), o(39), e.exports = o(53).Map
}, function(e, t, o) {
    var n;
    ! function(t) {
        'eat script';

        function i() {}
        var r = i.prototype,
            a = t.EventEmitter;

        function s(e, t) {
            for (var o = e.length; o--;)
                if (e[o].listener === t) return o;
            return -1
        }

        function c(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        r.getListeners = function(e) {
            var t, o, n = this._getEvents();
            if (e instanceof RegExp)
                for (o in t = {}, n) n.hasOwnProperty(o) && e.test(o) && (t[o] = n[o]);
            else t = n[e] || (n[e] = []);
            return t
        }, r.flattenListeners = function(e) {
            var t, o = [];
            for (t = 0; t < e.length; t += 1) o.push(e[t].listener);
            return o
        }, r.getListenersAsObject = function(e) {
            var t, o = this.getListeners(e);
            return o instanceof Array && ((t = {})[e] = o), t || o
        }, r.addListener = function(e, t) {
            if (! function e(t) {
                    return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
                }(t)) throw new TypeError("listener must be a function");
            var o, n = this.getListenersAsObject(e),
                i = "object" == typeof t;
            for (o in n) n.hasOwnProperty(o) && -1 === s(n[o], t) && n[o].push(i ? t : {
                listener: t,
                once: !1
            });
            return this
        }, r.on = c("addListener"), r.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, r.once = c("addOnceListener"), r.defineEvent = function(e) {
            return this.getListeners(e), this
        }, r.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, r.removeListener = function(e, t) {
            var o, n, i = this.getListenersAsObject(e);
            for (n in i) i.hasOwnProperty(n) && -1 !== (o = s(i[n], t)) && i[n].splice(o, 1);
            return this
        }, r.off = c("removeListener"), r.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, r.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, r.manipulateListeners = function(e, t, o) {
            var n, i, r = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = o.length; n--;) r.call(this, t, o[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? r.call(this, n, i) : a.call(this, n, i));
            return this
        }, r.removeEvent = function(e) {
            var t, o = typeof e,
                n = this._getEvents();
            if ("string" === o) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, r.removeAllListeners = c("removeEvent"), r.emitEvent = function(e, t) {
            var o, n, i, r, a = this.getListenersAsObject(e);
            for (r in a)
                if (a.hasOwnProperty(r))
                    for (o = a[r].slice(0), i = 0; i < o.length; i++) !0 === (n = o[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, r.trigger = c("emitEvent"), r.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, r.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, r._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, r._getEvents = function() {
            return this._events || (this._events = {})
        }, i.noConflict = function() {
            return t.EventEmitter = a, i
        }, void 0 === (n = function() {
            return i
        }.call(t, o, t, e)) || (e.exports = n)
    }(this || {})
}, function(e, t, o) {
    'eat script';
    o.r(t), window._layerAnim = !1, window.layers = {
        sh: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            show(e), t && t()
        } : function(e, t) {
            fadeIn(e, 200, t)
        },
        hd: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            hide(e), t && t()
        } : function(e, t) {
            fadeOut(e, 200, t)
        },
        visible: !1,
        _show: function(e, t, o, n) {
            var i = "layers" + (__bq.count() + 1);
            cancelStackPush(i, function() {}), setStyle(e, {
                opacity: o || "",
                backgroundColor: n || ""
            }), layers.visible || (toggleFlash(), disableBodyScroll()), layers.visible || pauseLastInlineVideo(), layers.visible = !0, addClass(bodyNode, "layers_shown"), t.visibilityHide ? removeClass(t, "box_layer_hidden") : show(t), layers.sh(e), window.updateWndVScroll && updateWndVScroll()
        },
        _hide: function(e, t) {
            layers.hd(e, function() {
                var e = "layers" + (__bq.count() + 1);
                cancelStackFilter(e), t && t.visibilityHide ? addClass(t, "box_layer_hidden") : hide(t), isVisible(layerWrap) || cur._inLayer || isVisible(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !isVisible(window.mvLayerWrap)) || isVisible(window.wkLayerWrap) || (layers.visible = !1, removeClass(bodyNode, "layers_shown"), toggleFlash(!0), enableBodyScroll()), window.updateWndVScroll && updateWndVScroll()
            }), layers.visible || playLastInlineVideo()
        }
    }, window.__lq = window.layerQueue = {
        push: function(e) {
            var t, o = !!__lq.count() && __lq._layers[__lq._layers.length - 1];
            if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                onHide: cur.pvOptions.onHide,
                scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                onShow: e,
                noHistory: !!cur.pvNoHistory,
                histLen: cur.pvHistoryLength
            }];
            else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                var n = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                    i = {
                        scroll: mvLayerWrap.scrollTop,
                        noHistory: !!mvcur.noHistory,
                        nomin: 1,
                        autoplay: n,
                        prevLoc: mvcur.mvPrevLoc
                    };
                VideoPlaylist.getCurListId() && (i = extend(i, {
                    playlistId: VideoPlaylist.getCurListId(),
                    module: Videoview.getVideoModule(),
                    addParams: {
                        force_no_repeat: 1,
                        show_next: 1
                    }
                })), t = ["video", mvcur.videoRaw, mvcur.listId, i]
            } else if (window.wkcur && wkcur.shown) t = ["wiki", wkcur.wkRaw, !1, {
                toScroll: wkLayerWrap.scrollTop,
                prevLoc: wkcur.prevLoc,
                myLoc: wkcur.myLoc,
                onHide: wkcur.onHide
            }];
            else {
                if (!cur.storyLayer) return !1;
                t = ["stories", cur.storyLayer.getList()]
            }
            return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || __lq._layers.push(t), __lq.skipVideo = !1, !0
        },
        noHistory: function() {
            for (var e = __lq._layers, t = e.length; t > 0; --t) "photo" == e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" == e[t - 1][0] && (e[t - 1][3].noHistory = 1)
        },
        hide: function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            __lq._bl = !0, window.WkView && layers.fullhide == WkView.hide ? (hide(wkLayerWrap), clearTimeout(wkcur.showT)) : layers.fullhide && layers.fullhide(!0, !0), setTimeout(layerQueue.unblock, 5)
        }),
        unblock: function() {
            __lq._bl = !1
        },
        pop: function() {
            if (__lq.count() && !__lq._bl) {
                var e = __lq._layers.pop();
                if (__lq.skipVideo && (__lq.skipVideo = !1, "video" == e[0])) return __lq._layers.push(e), void(__lq.skipVideo = !1);
                "photo" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showPhoto(e[1], e[2], e[3], !1)) : "video" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showVideo(e[1], e[2], e[3], !1)) : "wiki" == e[0] ? showWiki({
                    w: e[1]
                }, !1, !1, e[3]) : "stories" == e[0] && showStory(e[1])
            }
        },
        back: function(e, t, o, n) {
            for (var i = __lq._layers, r = i.length; r > 0; --r)
                if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return __lq._layers = i.slice(0, r), __lq.pop(), !0;
            return !1
        },
        count: function() {
            return __lq._layers.length
        },
        clear: function() {
            __lq._layers = []
        },
        _layers: []
    }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, o) {
    var n = o(104),
        i = o(70),
        r = o(23);
    e.exports = o(19) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var o, a = r(t), s = a.length, c = 0; s > c;) n.f(e, o = a[c++], t[o]);
        return e
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, o) {
    e.exports = !o(19) && !o(21)(function() {
        return 7 != Object.defineProperty(o(77)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    var n = o(56);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, o) {
    var n = o(36)("keys"),
        i = o(12);
    e.exports = function(e) {
        return n[e] || (n[e] = i(e))
    }
}, function(e, t, o) {
    for (var n = o(11), i = o(41), r = o(98), a = o(1), s = o(61), c = o(43), l = c("iterator"), d = c("toStringTag"), u = s.Array, p = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], _ = 0; _ < 5; _++) {
        var h, f = p[_],
            w = r[f],
            v = w && w.prototype;
        if (v)
            for (h in v[l] || a(v, l, u), v[d] || a(v, d, f), s[f] = u, n) v[h] || i(v, h, n[h], !0)
    }
}, function(e, t, o) {
    e.exports = o(98).document && document.documentElement
}, function(e, t, o) {
    var n = o(70),
        i = o(67),
        r = o(96),
        a = o(71)("IE_PROTO"),
        s = function() {},
        c = function() {
            var e, t = o(77)("iframe"),
                n = r.length;
            for (t.style.display = "none", o(73).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var o;
        return null !== e ? (s.prototype = n(e), o = new s, s.prototype = null, o[a] = e) : o = c(), void 0 === t ? o : i(o, t)
    }
}, function(e, t, o) {
    'eat script';
    var n = o(13)(!0);
    o(58)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            o = this._i;
        return o >= t.length ? {
            value: void 0,
            done: !0
        } : (e = n(t, o), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, function(e, t, o) {
    var n = o(56),
        i = o(98).document,
        r = n(i) && n(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';

    function ajx2q(e, t) {
        var o = [],
            n = function(e) {
                if (window._decodeEr && _decodeEr[e]) return e;
                try {
                    return encodeURIComponent(e)
                } catch (e) {
                    return ""
                }
            };
        for (var i in e)
            if (null != e[i] && !isFunction(e[i]))
                if (isArray(e[i]))
                    for (var r = 0, a = 0, s = e[i].length; r < s; ++r) null == e[i][r] || isFunction(e[i][r]) || (o.push(n(i) + "[" + a + "]=" + n(e[i][r])), ++a);
                else o.push(n(i) + "=" + n(e[i]));
        return t || o.sort(), o.join("&")
    }

    function q2ajx(e) {
        if (!e) return {};
        var t = {},
            o = function(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return window._decodeEr = window._decodeEr || {}, _decodeEr[e] = 1, e
                }
            };
        return e = e.split("&"), each(e, function(e, n) {
            var i = n.split("=");
            if (i[0]) {
                var r = o(i[1] + "");
                if ("[]" == i[0].substr(i.length - 2)) {
                    var a = o(i[0].substr(0, i.length - 2));
                    t[a] || (t[a] = []), t[a].push(r)
                } else t[o(i[0])] = r
            }
        }), t
    }

    function requestBox(e, t, o) {
        return e.setOptions({
            onDestroy: o
        }), e.onDone = function() {
            t && t.apply(null, arguments)
        }, e
    }

    function activateMobileBox(e) {
        return requestBox(showBox("activation.php", {
            act: "activate_mobile_box",
            hash: e.hash
        }), function() {
            vk.nophone = 0, e.onDone()
        }, e.onFail)
    }

    function validateMobileBox(e) {
        return requestBox(showBox("activation.php", {
            act: "validate_box",
            captcha: e.acceptCaptcha ? 1 : "",
            skip_push: e.skip_push ? e.skip_push : "",
            from: e.from || "",
            hash: e.hash,
            ahash: e.ahash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function validatePassBox(e) {
        return requestBox(showBox("activation.php", {
            act: "pass_validate_box",
            hash: e.hash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function photoCaptchaBox(e) {
        return requestBox(showBox("pcaptcha.php", {
            act: "box"
        }, {
            stat: ["pcaptcha.css", "pcaptcha.js"]
        }), e.onDone, e.onFail)
    }
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "ajx2q", function() {
        return ajx2q
    }), __webpack_require__.d(__webpack_exports__, "q2ajx", function() {
        return q2ajx
    }), __webpack_require__.d(__webpack_exports__, "requestBox", function() {
        return requestBox
    }), __webpack_require__.d(__webpack_exports__, "activateMobileBox", function() {
        return activateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validateMobileBox", function() {
        return validateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validatePassBox", function() {
        return validatePassBox
    }), __webpack_require__.d(__webpack_exports__, "photoCaptchaBox", function() {
        return photoCaptchaBox
    }), __webpack_require__.d(__webpack_exports__, "ajax", function() {
        return ajax
    }), window.ajaxCache = {}, window.globalAjaxCache = {}, window.iframeTO = 0;
    var ajax = {
        _init: function() {
            try {
                if (new XMLHttpRequest) return void(ajax._req = function() {
                    return new XMLHttpRequest
                })
            } catch (e) {}
            ajax._req || browser.search_bot || location.replace("/badbrowser.php")
        },
        _getreq: function() {
            return ajax._req || ajax._init(), ajax._req()
        },
        _frameover: function(e, t) {
            if (window.iframeTransport) {
                var o = iframeTransport.parentNode;
                o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
            }
        },
        _receive: function _receive(cont, html, js, bench, params) {
            var c = cont && ge(cont);
            if (c && html && (c.firstChild ? c.appendChild(cf(html)) : val(c, html)), js) {
                var scr = "(function(){" + js + ";})()";
                if (__debugMode) eval(scr);
                else try {
                    eval(scr)
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 8,
                        url: ajax._frameurl,
                        js: js,
                        answer: Array.prototype.slice.call(arguments).join("<!>")
                    })
                }
                bench && (ajax.tModule = cur.module)
            }
            params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
        },
        framedata: !1,
        _framenext: function() {
            if ((ajax.framedata || {}).length) {
                var e = ajax.framedata.shift();
                !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = lTimeout(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
            }
        },
        framegot: function(e, t, o, n) {
            ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
        },
        framepost: function(e, t, o, n) {
            clearTimeout(iframeTO), window.iframeTransport && ajax._frameover(), window.iframeTransport = utilsNode.appendChild(ce("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + irand(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, r, a, s) {
            var c = ajax._getreq(),
                l = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
            c.onreadystatechange = function() {
                4 == c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
            };
            try {
                c.open("POST", e, !0)
            } catch (e) {
                return !1
            }
            return r && each(r, function(e, t) {
                c[e] = t
            }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(l), c
        },
        post: function(e, t, o) {
            "/" != e.substr(0, 1) && "http" != e.substr(0, 4) && (e = "/" + e);
            var n = extend({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = extend({
                    al: n.frame ? -1 : 1
                }, t),
                r = vkNow(),
                a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i = extend({
                    _smt: cur.module + ":" + a
                }, i)), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 1), show(e)
                }), n.hideProgress || (n.hideProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 0), hide(e)
                })), n.loader) {
                var s = isVisible(boxLayerWrap);
                n.showProgress = function() {
                    boxRefreshCoords(boxLoader), show(boxLoader), s || show(boxLayerWrap)
                }, n.hideProgress = function() {
                    hide(boxLoader), s || hide(boxLayerWrap)
                }
            }
            return ajax._post(e, i, n)
        },
        preload: function(e, t, o) {
            "/" != e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = clone(t);
            return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
        },
        _debugLog: function(e, t) {
            window.debuglogGot && debuglogGot(t, e)
        },
        _parseRes: function(e, t) {
            window._updateDebug = !1;
            for (var o = e.length - 1; o >= 0; --o) {
                var n = e[o];
                if ("<!" == n.substr(0, 2)) {
                    var i = n.indexOf(">"),
                        r = n.substr(2, i - 2);
                    switch (n = n.substr(i + 1), r) {
                        case "json":
                            e[o] = parseJSON(n);
                            break;
                        case "int":
                            e[o] = intval(n);
                            break;
                        case "float":
                            e[o] = floatval(n);
                            break;
                        case "bool":
                            e[o] = !!intval(n);
                            break;
                        case "null":
                            e[o] = null;
                            break;
                        case "pageview_candidate":
                            e.pop();
                            break;
                        case "debug":
                            ajax._debugLog(n, t), e.pop()
                    }
                }
            }
        },
        _post: function _post(url, q, o) {
            !q.captcha_sid && o.showProgress && o.showProgress();
            var cacheKey = !1;
            window.__adsGetAjaxParams && extend(q, __adsGetAjaxParams(q, o)), o.cache && (cacheKey = ajax._getCacheKey(url, q, o));
            var hideBoxes = function() {
                    for (var e = 0, t = arguments.length; e < t; ++e) {
                        var o = arguments[e];
                        o && o.isVisible() && (o.setOptions({
                            onHide: !1,
                            onDestroy: !1
                        }), o.hide())
                    }
                    return !1
                },
                fail = function(e, t) {
                    if (o.hideProgress && o.hideProgress(), o._suggest && cleanElems(o._suggest), o._suggest = o._captcha = o._box = hideBoxes(o._captcha, o._box), -1 != e.indexOf("The page is temporarily unavailable") && __dev && inArray(vk.id, [100])) return ajax._post(url, q, o), !1;
                    o.onFail && !0 === o.onFail(e) || topError(e, {
                        dt: 5,
                        type: 3,
                        status: t.status,
                        url: url,
                        query: q && ajx2q(q, o.noSort)
                    })
                };
            if (o.local && (fail = vkLocal(fail)), o.stat) {
                var statAct = !1;
                stManager.add(o.stat, function() {
                    statAct && statAct(), o.stat = !1
                })
            }
            var _processResponse = function processResponse(code, answer) {
                if (o.cache) {
                    var answ = ajaxCache[cacheKey];
                    answ && answ._loading && (setTimeout(function() {
                        for (var e in answ._callbacks) answ._callbacks[e](code, answer)
                    }, 0), delete ajaxCache[cacheKey])
                }
                if (o.stat) return o.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                switch (o.cache && !o.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), o.hideProgress && o.hideProgress(), 2 != code && (o._captcha && (o._suggest && cleanElems(o._suggest), o._suggest = o._captcha = hideBoxes(o._captcha)), o._box = hideBoxes(o._box)), code) {
                    case 1:
                        showFastBox({
                            width: 520,
                            title: answer[0],
                            onDestroy: o.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === intval(answer[1])) {
                            var resend = function(e) {
                                var t = extend(q, {
                                        recaptcha: e
                                    }),
                                    n = o.cache ? extend(o, {
                                        cache: -1
                                    }) : o;
                                ajax._post(url, t, n)
                            };
                            o._captcha = showReCaptchaBox(answer[0], answer[2], o._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    o.onFail && o.onFail()
                                }
                            })
                        } else {
                            var resend = function(e, t) {
                                var n = extend(q, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    i = o.cache ? extend(o, {
                                        cache: -1
                                    }) : o;
                                ajax._post(url, n, i)
                            };
                            o._captcha = showCaptchaBox(answer[0], intval(answer[1]), o._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    o.onFail && o.onFail()
                                }
                            })
                        }
                        o._suggest = geByClass1("phone_validation_link", o._captcha.bodyNode), o._suggest && addEvent(o._suggest, "click", function() {
                            o._box = validateMobileBox({
                                onDone: o._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = validateMobileBox({
                            acceptCaptcha: 11 == code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (o._captcha = curBox()), ajax._post(url, e ? extend(q, {
                                    captcha_sid: e,
                                    captcha_key: t
                                }) : q, no)
                            },
                            onFail: o.onFail,
                            hash: answer[0],
                            ahash: answer[1]
                        });
                        break;
                    case 14:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail
                        });
                        break;
                    case 15:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = validatePassBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        window.onReLoginDone = ajax._post.pbind(url, q, no), window.onReLoginFailed = function(e, t) {
                            t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                        }, utilsNode.appendChild(ce("iframe", {
                            src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                role: "al_frame",
                                _origin: locProtocol + "//" + locHost,
                                ip_h: answer[0] || vk.ip_h,
                                to: answer[1] || ""
                            })
                        }));
                        break;
                    case 4:
                        intval(answer[1]) ? nav.go(answer[0], !1, {
                            nocur: "2" === answer[1],
                            noback: !0 === answer[1],
                            showProgress: o.showProgress,
                            hideProgress: o.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: intval(answer[0]),
                            from: 1,
                            url: url,
                            query: q && ajx2q(q)
                        });
                        break;
                    case 6:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        o.onFail && o.onFail(), topMsg(answer[0], 10);
                        break;
                    case 8:
                        if (o.onFail && o.onFail(answer[0])) return;
                        topError(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: q && ajx2q(q)
                        });
                        break;
                    case 9:
                        if ((o.fromBox || o.forceDone) && (o.onDone && o.onDone.apply(window, answer), o.fromBox)) break;
                        o._box = showFastBox({
                            title: trim(answer[0])
                        }, answer[1]);
                        var no = extend(clone(o), {
                            showProgress: o._box.showProgress,
                            hideProgress: o._box.hideProgress
                        });
                        o.cache && (no.cache = -1), o._box = requestBox(o._box, function(e) {
                            isVisible(o._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, extend(q, e), no))
                        }, o.onFail), o._box.evalBox(answer[2]);
                        break;
                    case 10:
                        o._box = showFastBox({
                            title: answer[0] || getLang("global_charged_zone_title"),
                            onHide: o.onFail
                        }, answer[1], getLang("global_charged_zone_continue"), function() {
                            var e = extend(q, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, o)
                        }, getLang("global_cancel"));
                        break;
                    case 13:
                        eval("(function(){" + answer[0] + ";})()");
                        break;
                    default:
                        if (-1 == code || -2 == code || -3 == code) {
                            var adsShowed = answer.pop(),
                                adsCanShow = answer.pop(),
                                adsHtml = answer.pop(),
                                adsProps; - 3 == code && (adsProps = answer.pop()), window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps)
                        }
                        o.onDone && o.onDone.apply(window, answer)
                }
                window._updateDebug && _updateDebug(), window.LazyLoad && LazyLoad.scanDelayed()
            };
            o.local && (_processResponse = vkLocal(_processResponse));
            var done = function(e, t) {
                o.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), trim(e).length || (t = [8, getLang("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var n = e.split("<!>"),
                    i = clone(n);
                each(i, function(e, t) {
                    i[e] = t.substr(0, 100)
                }), ajax.lastResp = i.join("<!>");
                var r = intval(n.shift());
                if (!r) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version != r) r && n.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: q && ajx2q(q)
                }) : nav.strLoc ? location.replace(locBase) : topError("Server error.", {
                    type: 100
                });
                else {
                    vk.version = !1;
                    var a = n.shift(),
                        s = intval(n.shift()),
                        c = intval(n.shift());
                    o.frame && (n = t);
                    var l = intval(n.shift());
                    if (vk.lang != s && o.canReload) nav.reload({
                        force: !0,
                        from: 3,
                        url: url,
                        query: q && ajx2q(q)
                    });
                    else {
                        var d = function() {
                            var e = ["common.css"];
                            if (a)
                                for (var t = 0, i = (a = a.split(",")).length; t < i; ++t) e.push(a[t]);
                            if (stVersions.lang < c)
                                for (var t in stVersions.lang = c, StaticFiles) /^lang\d/i.test(t) && e.push(t);
                            if (!o.frame) try {
                                ajax._parseRes(n, o._reqid)
                            } catch (e) {
                                topError("<b>JSON Error:</b> " + e.message, {
                                    type: 5,
                                    answer: n.join("<!>"),
                                    url: url,
                                    query: q && ajx2q(q)
                                })
                            }
                            stManager.add(e, _processResponse.pbind(l, n))
                        };
                        if (window.stVersions) {
                            if (r == stVersions.nav) return d();
                            headNode.appendChild(ce("script", {
                                type: "text/javascript",
                                src: "/js/loader_nav" + r + "_" + vk.lang + ".js"
                            })), setTimeout(function e() {
                                if (r == stVersions.nav) return d();
                                setTimeout(e, 100)
                            }, 0)
                        }
                    }
                }
            };
            if (o.local && (done = vkLocal(done)), o.cache > 0 || o.forceGlobalCache) {
                var answer = ajaxCache[cacheKey];
                if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                if (answer && !o.forceGlobalCache) return _processResponse(0, answer), void(3 === o.cache && delete ajaxCache[cacheKey]);
                if (answer = globalAjaxCache[cacheKey]) return -1 == answer || isFunction(answer) ? globalAjaxCache[cacheKey] = o.onDone : o.onDone.apply(window, answer), void(o.hideProgress && o.hideProgress())
            }
            ajaxCache[cacheKey] = {
                _loading: 1,
                _callbacks: []
            }, window.debuglogSent ? (o._reqid = debuglogSent(url + (q ? ": " + ajx2q(q, o.noSort).replace(/&/g, "&amp;") : "")), o.frame && (window._lfrid = o._reqid)) : o._reqid = 0;
            var xhrOptions = {};
            return o.timeout && (xhrOptions.timeout = o.timeout), o.frame ? ajax.framepost(url, q, done, o) : ajax.plainpost(url, q, done, fail, !1, xhrOptions, o)
        },
        tGetParam: function() {
            if (ajax.tStart && ajax.tModule) {
                var e = [ajax.tDone - ajax.tStart, ajax.tProcess - ajax.tDone, ajax.tRender - ajax.tProcess, ajax.tOver - ajax.tStart, ajax.tModule];
                for (var t in e) {
                    if (e[t] < 0) return !1;
                    if (!e[t] && 0 !== e[t]) return !1
                }
                return ajax.tStart = !1, e.join(",")
            }
        }
    };
    window.ajax = ajax, window.ajx2q = ajx2q, window.q2ajx = q2ajx, window.requestBox = requestBox, window.activateMobileBox = activateMobileBox, window.validateMobileBox = validateMobileBox, window.validatePassBox = validatePassBox, window.photoCaptchaBox = photoCaptchaBox
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        var o = t.timeout,
            n = t.onLoad,
            i = t.onError,
            r = document.createElement("script");
        r.addEventListener("load", s), r.addEventListener("readystatechange", s), r.addEventListener("error", c), r.src = e, document.head.appendChild(r);
        var a = void 0;

        function s(e) {
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (l(), n && n())
        }

        function c(e) {
            l(), i && i()
        }

        function l() {
            clearTimeout(a), r.removeEventListener("load", s), r.removeEventListener("readystatechange", s), r.removeEventListener("error", c)
        }
        return o && (a = setTimeout(c, o)), {
            destroy: function() {
                l()
            }
        }
    }
    o.r(t), o.d(t, "loadScript", function() {
        return n
    }), window.loadScript = n
}, function(e, t, o) {
    var n = o(83),
        i = o(32);
    e.exports = function(e) {
        return n(i(e))
    }
}, function(e, t, o) {
    'eat script';

    function n() {
        var e = {};
        each(geByClass("_short_currency"), function() {
            var t = this.getAttribute("data-short") || "",
                o = winToUtf(t).length,
                n = getStyle(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (!t) return !0;
            if (void 0 === e[n]) {
                for (var i = "", r = o - 1; r >= 0; r--) i += "&#8399;";
                var a = ce("div", {
                    innerHTML: "<b>" + t + "</b><b>" + i + "</b>"
                }, {
                    fontFamily: n,
                    fontSize: "24px"
                });
                ge("utils").appendChild(a), e[n] = Math.abs(a.firstChild.offsetWidth - a.lastChild.offsetWidth) >= 2 * o, re(a)
            }
            e[n] && val(this, t)
        })
    }
    o.r(t), o.d(t, "shortCurrency", function() {
        return n
    }), window.shortCurrency = n
}, function(e, t, o) {
    var n = o(46),
        i = o(9),
        r = o(80),
        a = o(33),
        s = o(7),
        c = o(69),
        l = Object.getOwnPropertyDescriptor;
    t.f = o(19) ? l : function(e, t) {
        if (e = r(e), t = a(t, !0), c) try {
            return l(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!n.f.call(e, t), e[t])
    }
}, function(e, t, o) {
    var n = o(4);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t, o) {
    var n = o(97),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(n(e), 9007199254740991) : 0
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), window.stManager = {
        _waiters: [],
        _wait: function() {
            var e = {},
                t = [];
            if (!(c = __stm._waiters.length)) return clearInterval(__stm._waitTimer), void(__stm._waitTimer = !1);
            for (var o = 0; o < c; ++o) {
                for (var n = __stm._waiters[o][0], i = 0, r = n.length; i < r; ++i) {
                    var a = n[i];
                    if (!e[a])
                        if (StaticFiles[a].l || "css" != StaticFiles[a].t || "none" != getStyle(StaticFiles[a].n, "display") || __stm.done(a), StaticFiles[a].l) e[a] = 1;
                        else if (e[a] = -1, vk.loaded) {
                        var s = ++StaticFiles[a].c;
                        (s > __stm.lowlimit && stVersions[a] > 0 || s > __stm.highlimit) && (stVersions[a] < 0 ? (topError("<b>Error:</b> Could not load <b>" + a + "</b>.", {
                            dt: 5,
                            type: 1,
                            msg: "Failed to load with " + __stm.lowlimit + "/" + __stm.highlimit + " limits (" + (vkNow() - vk.started) / 100 + " ticks passed)",
                            file: a
                        }), StaticFiles[a].l = 1, e[a] = 1) : (topMsg("Some problems with loading <b>" + a + "</b>...", 5), stVersions[a] = irand(-1e4, -1), __stm._add(a, StaticFiles[a])))
                    }
                    e[a] > 0 && (n.splice(i, 1), --i, --r)
                }
                n.length || (t.push(__stm._waiters.splice(o, 1)[0][1]), --o, --c)
            }
            o = 0;
            for (var c = t.length; o < c; ++o) t[o]()
        },
        _addCss: function(e, t) {
            var o = ce("style", {
                    type: "text/css",
                    media: "screen"
                }),
                n = domNS(t);
            return n ? headNode.insertBefore(o, n) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
        },
        _srcPrefix: function(e, t) {
            return -1 === e.indexOf(".js") && -1 === e.indexOf(".css") || function(e) {
                for (var t = 0; t < vk.stExcludedMasks.length; t++)
                    if (-1 !== e.indexOf(vk.stExcludedMasks[t])) return !0;
                return !1
            }(e) ? "" : vk.stDomain || ""
        },
        _add: function(e, t) {
            var o = e.replace(/[\/\.]/g, "_"),
                n = stVersions[e],
                i = e + "?" + n,
                r = stManager._srcPrefix(e, n);
            if (StaticFiles[e] = {
                    v: n,
                    n: o,
                    l: 0,
                    c: 0
                }, -1 != e.indexOf(".js")) {
                var a = "/js/";
                if (stTypes.fromLib[e] ? a += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? a += jsc("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 != e.indexOf("/") || (a += "al/"), StaticFiles[e].t = "js", e == jsc("web/common_web.js")) setTimeout(stManager.done.bind(stManager).pbind(jsc("web/common_web.js")), 0);
                else {
                    var s = r + a + i;
                    __stm._insertNode(s, e), StaticFiles[e].src = s
                }
            } else if (-1 != e.indexOf(".css")) {
                s = r + (a = "/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 != e.indexOf("/") ? "" : "al/")) + i;
                t && t.l && "css" == t.t && (StaticFiles[e].styleNode = __stm._addCss("#" + o + " {display: block; }", __stm._getOldNode(s))), __stm._insertNode(s, e), StaticFiles[e].t = "css", StaticFiles[e].src = s, ge(o) || utilsNode.appendChild(ce("div", {
                    id: o
                }))
            }
        },
        _getOldNode: function(e) {
            return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
        },
        _insertNode: function(e, t) {
            var o, n = e.split("?")[0].match(/\.css$/),
                i = __stm._getOldNode(e);
            n && StaticFiles[t] && StaticFiles[t].styleNode ? i = domNS(StaticFiles[t].styleNode) : i && (i = domNS(i)), n ? (o = ce("link", {
                type: "text/css",
                rel: "stylesheet",
                href: e
            })).onload = function() {
                __stm._removeDuplicateNodes(t)
            } : o = ce("script", {
                type: "text/javascript",
                src: e
            }), i ? headNode.insertBefore(o, i) : headNode.appendChild(o)
        },
        _removeDuplicateNodes: function(e) {
            var t = StaticFiles[e];
            if (t && t.src) {
                var o = t.src.split("?")[0],
                    n = __stm._getOldNode(o);
                if (n) {
                    t.styleNode && (re(t.styleNode), delete StaticFiles[e].styleNode);
                    for (var i = o.match(/\.css$/); n && (n = domNS(n));) {
                        var r = i ? n.href : n.src;
                        if (!r) break;
                        if ((r = r.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                        re(domPS(n))
                    }
                }
            }
        },
        add: function(e, t, o) {
            var n = [],
                i = document.documentElement;
            for (var r in isArray(e) || (e = [e]), e) {
                var a = e[r];
                if (a) {
                    -1 != a.indexOf("?") && (a = a.split("?")[0]), /^lang\d/i.test(a) ? stVersions[a] = stVersions.lang : stVersions[a] || (stVersions[a] = 1), (browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !browser.iphone && !browser.ipad && a != jsc("web/common_web.js") && "common.css" != a && stVersions[a] > 0 && stVersions[a] < 1e9 && (stVersions[a] += irand(1e9, 2e9));
                    var s = StaticFiles[a];
                    s && s.v == stVersions[a] || __stm._add(a, s), t && !StaticFiles[a].l && n.push(a)
                }
            }
            if (t) {
                if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                __stm._waiters.push([n, t]), __stm._waitTimer || (__stm._waitTimer = setInterval(__stm._wait, 100))
            }
        },
        done: function(e) {
            stVersions[e] < 0 && topMsg('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && __stm._removeDuplicateNodes(e)
        }
    }, window.__stm = stManager
}, function(e, t, o) {
    o(24), o(75), o(72), o(35), e.exports = o(53).Set
}, function(e, t, o) {
    var n = o(32);
    e.exports = function(e) {
        return Object(n(e))
    }
}, function(e, t, o) {
    var n = o(97),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "showVideo", function() {
        return showVideo
    }), __webpack_require__.d(__webpack_exports__, "showInlineVideo", function() {
        return showInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "loadInlineVideo", function() {
        return loadInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "revertLastInlineVideo", function() {
        return revertLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "destroyInlineVideoPlayer", function() {
        return destroyInlineVideoPlayer
    }), __webpack_require__.d(__webpack_exports__, "pauseLastInlineVideo", function() {
        return pauseLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "playLastInlineVideo", function() {
        return playLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "checkMp4", function() {
        return checkMp4
    });
    var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

    function showVideo(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!checkEvent(n)) {
            if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
            o || (o = {});
            var i = nav.objLoc.claim,
                r = !(!o.addParams || !/^-?\d+_\d+$/.test(o.addParams.post_id)) && o.addParams.post_id;
            if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && hasClass("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = extend(o.addParams, {
                    playlist_id: o.playlistId
                }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                if (/^wall_/.test(o.playlistId)) {
                    var a = cur.wallVideos && cur.wallVideos[o.playlistId];
                    o.addParams.load_playlist = a && a.list.length >= 50 ? 0 : 1
                } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
            !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = extend(o.addParams, {
                expand_player: 1
            }), delete cur.videoInlinePlayer);
            var s = new callHub(function() {
                o.hidden ? o.hidden(s.data, o, t, e) : Videoview.showVideo.apply(Videoview, s.data)
            }, 2);
            stManager.add(["videoview.js", "videoview.css", "page.js", "page.css"], function() {
                s.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), s.done())
            }), extend(o, {
                onDone: function() {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e), s.data = t, s.done()
                },
                onFail: function(t) {
                    if (s.failed = 1, !o.hidden) {
                        if (window.mvcur && mvcur.mvShown) Videoview.hide();
                        else {
                            var n = clone(nav.objLoc);
                            n.z == "video" + e && delete n.z, n[0] == "video" + e && (n[0] = "videos" + e.split("_")[0]), nav.setLoc(n)
                        }
                        showFastBox(getLang("global_error"), t || getLang("global_error_occured"))
                    }
                    return !0
                },
                cache: "status" != t
            });
            var c = o.params;
            return c || (c = {
                act: "show",
                video: e,
                list: t,
                autoplay: o.autoplay ? 1 : 0,
                ad_video: o.ad_video,
                module: o.module || currentModule() || "",
                svids: o.svids
            }), o.addParams && (c = extend(c, o.addParams)), trim(c.module) || extend(c, {
                _nol: JSON.stringify(nav.objLoc)
            }), i && (c.claim = i), ajax.post("al_video.php", c, o), vkImage().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", cur.articleLayer && cur.articleLayer.videoOpened(), !1
        }
    }

    function showInlineVideo(videoId, listId, options, ev, thumb) {
        if (checkEvent(ev)) return !0;
        if (window.mvcur && mvcur.mvShown) return showVideo(videoId, listId, options, ev);
        if (attr(thumb, "data-loading")) return !1;
        options = options || {};
        var h = thumb.clientHeight,
            w = thumb.clientWidth,
            btn = domByClass(thumb, "page_post_video_play_inline"),
            onLoaded = options.onLoaded;
        onLoaded && delete options.onLoaded;
        var params = {
            video: videoId,
            list: listId,
            autoplay: options.autoplay,
            module: options.module
        };
        return domData(thumb, "stretch-vertical") && (params.stretch_vertical = 1), extend(params, options.addParams), showProgress(), loadInlineVideo(params, function(e, t) {
            hideProgress(), e ? onDone.apply(null, t) : onFail.apply(null, t)
        }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), vkImage().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1;

        function onDone(title, html, js, opts) {
            revertLastInlineVideo(), hide(thumb);
            var videoWrap = ce("div", {
                innerHTML: html
            }, {
                width: w,
                height: h
            });
            if (_videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                var container = domByClass(videoWrap, "video_box_wrap");
                isFunction(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
            }
            try {
                eval("(function () {" + js + "})();")
            } catch (e) {}
            if (!params.from_autoplay) {
                var _n = window.Notifier,
                    _a = window.audioPlayer;
                _n && setTimeout(function() {
                    _n.lcSend("video_start")
                }, 0);
                var ap = window.ap;
                ap && ap.isPlaying() && (ap.pause(), ap.pausedByVideo = vkNow())
            }
            thumb.setAttribute("data-playing", 1)
        }

        function onFail(e) {
            params.from_autoplay || showFastBox(getLang("global_error"), e || getLang("global_error_occured"))
        }

        function showProgress() {
            thumb.setAttribute("data-loading", 1), options.no_progress || (addClass(btn, "page_post_video_play_inline_loading"), val(btn, getProgressHtml()))
        }

        function hideProgress() {
            thumb.removeAttribute("data-loading"), options.no_progress || (removeClass(btn, "page_post_video_play_inline_loading"), val(btn, ""))
        }
    }

    function loadInlineVideo(e, t, o) {
        e = extend({
            autoplay: 0,
            module: cur.module
        }, e);
        trim(e.module) || (e._nol = JSON.stringify(nav.objLoc));
        var n = ["videoview.js"];

        function i(e, o) {
            isFunction(t) && t(e, o)
        }
        e.from_autoplay && n.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", e, {
            onDone: function() {
                i(!0, [].slice.call(arguments))
            },
            onFail: function() {
                return i(!1, [].slice.call(arguments)), !0
            },
            stat: n,
            local: 1,
            cache: o
        })
    }

    function revertLastInlineVideo(e) {
        if (_videoLastInlined) {
            var t, o = !1;
            if ((e = ge(e)) && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == e) {
                        o = !0;
                        break
                    }
                if (!o) return
            }
            re(_videoLastInlined[0]), show(_videoLastInlined[1]), _videoLastInlined[1].removeAttribute("data-playing"), _videoLastInlined = !1, destroyInlineVideoPlayer(), delete cur.mvOpts
        }
    }

    function destroyInlineVideoPlayer() {
        cur.videoInlinePlayer && (cur.videoInlinePlayer.destroy(), delete cur.videoInlinePlayer)
    }

    function pauseLastInlineVideo() {
        if (_videoLastInlined) {
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            if (e) {
                if (e.isActiveLive && e.isActiveLive()) return;
                cur.mvOpts.lastPlayerState = e.getState(), e.togglePlay(!1)
            }
        }
    }

    function playLastInlineVideo() {
        if (_videoLastInlined && cur.mvOpts && cur.mvOpts.lastPlayerState === _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__.PLAYING) {
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            e && e.togglePlay(!0)
        }
    }

    function checkMp4(e) {
        if (browser.smart_tv) e(!0);
        else if (ls.get("video_can_play_mp4")) e(!0);
        else {
            var t = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
            if (null == t) {
                var o, n, i = ce("video");
                i.canPlayType && i.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (i.onloadedmetadata = r.pbind(!0), i.onerror = function() {
                    r(!1, "error_" + i.error.code)
                }, i.src = "/images/blank.mp4", i.load(), o = setTimeout(r.pbind(!1, "timeout"), 3e3)) : r(!1, "video_type")
            } else e(!!intval(t))
        }

        function r(t, r) {
            if (!n) {
                n = !0;
                var a = t ? window.localStorage : window.sessionStorage;
                try {
                    a.setItem("video_can_play_mp4", intval(t))
                } catch (e) {}
                e(t, r), clearTimeout(o), i.src = "", i.load(), i = i.onloadedmetadata = i.onerror = null
            }
        }
    }
    window._videoLastInlined = !1, window.VideoConstants = {
        VIDEO_ITEM_INDEX_OWNER_ID: 0,
        VIDEO_ITEM_INDEX_ID: 1,
        VIDEO_ITEM_INDEX_THUMB: 2,
        VIDEO_ITEM_INDEX_TITLE: 3,
        VIDEO_ITEM_INDEX_FLAGS: 4,
        VIDEO_ITEM_INDEX_DURATION: 5,
        VIDEO_ITEM_INDEX_HASH: 6,
        VIDEO_ITEM_INDEX_MODER_ACTS: 7,
        VIDEO_ITEM_INDEX_OWNER: 8,
        VIDEO_ITEM_INDEX_DATE: 9,
        VIDEO_ITEM_INDEX_VIEWS: 10,
        VIDEO_ITEM_INDEX_PLATFORM: 11,
        VIDEO_ITEM_FLAG_EXTERNAL: 1,
        VIDEO_ITEM_FLAG_ACTIVE_LIVE: 2,
        VIDEO_ITEM_FLAG_CAN_EDIT: 64,
        VIDEO_ITEM_FLAG_CAN_DELETE: 128,
        VIDEO_ITEM_FLAG_CAN_ADD: 256,
        VIDEO_ITEM_FLAG_PRIVATE: 512,
        VIDEO_ITEM_FLAG_NO_AUTOPLAY: 1024,
        VIDEO_ITEM_FLAG_ADDED: 2048,
        VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD: 4096,
        VIDEO_ITEM_FLAG_NEED_SIGN_IN: 8192,
        VIDEO_ITEM_FLAG_HD: 16384
    }, window.showVideo = showVideo, window.showInlineVideo = showInlineVideo, window.loadInlineVideo = loadInlineVideo, window.revertLastInlineVideo = revertLastInlineVideo, window.destroyInlineVideoPlayer = destroyInlineVideoPlayer, window.pauseLastInlineVideo = pauseLastInlineVideo, window.playLastInlineVideo = playLastInlineVideo, window.checkMp4 = checkMp4
}, function(e, t, o) {
    var n = o(4),
        i = o(43)("toStringTag"),
        r = "Arguments" == n(function() {
            return arguments
        }());
    e.exports = function(e) {
        var t, o, a;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(o = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        }(t = Object(e), i)) ? o : r ? n(t) : "Object" == (a = n(t)) && "function" == typeof t.callee ? "Arguments" : a
    }
}, function(e, t, o) {
    var n = o(70);
    e.exports = function(e, t, o, i) {
        try {
            return i ? t(n(o)[0], o[1]) : t(o)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && n(r.call(e)), t
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), Function.prototype.pbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.bind.apply(this, e)
    }, Function.prototype.rpbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.rbind.apply(this, e)
    }, Function.prototype.rbind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift(),
            n = t.shift();
        return function() {
            var i = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(i)), n
        }
    }, Function.prototype.bind || (Function.prototype.bind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift();
        return function() {
            var n = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(n))
        }
    }), Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var o in e) e.hasOwnProperty(o) && t.push(o);
        return t
    })
}, function(e, t, o) {
    'eat script';
    var n = o(104).f,
        i = o(74),
        r = (o(1), o(99)),
        a = o(57),
        s = o(29),
        c = o(32),
        l = o(60),
        d = o(58),
        u = o(18),
        p = o(38),
        _ = o(19),
        h = o(94).fastKey,
        f = _ ? "_s" : "size",
        w = function(e, t) {
            var o, n = h(t);
            if ("F" !== n) return e._i[n];
            for (o = e._f; o; o = o.n)
                if (o.k == t) return o
        };
    e.exports = {
        getConstructor: function(e, t, o, d) {
            var u = e(function(e, n) {
                s(e, u, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[f] = 0, void 0 != n && l(n, o, e[d], e)
            });
            return r(u.prototype, {
                clear: function() {
                    for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                    this._f = this._l = void 0, this[f] = 0
                },
                delete: function(e) {
                    var t = w(this, e);
                    if (t) {
                        var o = t.n,
                            n = t.p;
                        delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[f]--
                    }
                    return !!t
                },
                forEach: function(e) {
                    s(this, u, "forEach");
                    for (var t, o = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (o(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!w(this, e)
                }
            }), _ && n(u.prototype, "size", {
                get: function() {
                    return c(this[f])
                }
            }), u
        },
        def: function(e, t, o) {
            var n, i, r = w(e, t);
            return r ? r.v = o : (e._l = r = {
                i: i = h(t, !0),
                k: t,
                v: o,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = r), n && (n.n = r), e[f]++, "F" !== i && (e._i[i] = r)), e
        },
        getEntry: w,
        setStrong: function(e, t, o) {
            d(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                return this._t && (this._l = t = t ? t.n : this._t._f) ? u(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, u(1))
            }, o ? "entries" : "values", !o, !0), p(t)
        }
    }
}, function(e, t, o) {
    var n = o(12)("meta"),
        i = o(56),
        r = o(7),
        a = o(104).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        l = !o(21)(function() {
            return c(Object.preventExtensions({}))
        }),
        d = function(e) {
            a(e, n, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        u = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: function(e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!r(e, n)) {
                    if (!c(e)) return "F";
                    if (!t) return "E";
                    d(e)
                }
                return e[n].i
            },
            getWeak: function(e, t) {
                if (!r(e, n)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    d(e)
                }
                return e[n].w
            },
            onFreeze: function(e) {
                return l && u.NEED && c(e) && !r(e, n) && d(e), e
            }
        }
}, function(e, t, o) {
    'eat script';

    function n(e, t, o) {
        if (e = ge(e)) {
            o || elfocus(e), void 0 === data(e, "backstyle") && data(e, "backstyle", e.style.backgroundColor || "");
            var n = data(e, "back") || data(e, "back", getStyle(e, "backgroundColor")),
                i = {
                    notice: "#FFFFE0",
                    warning: "#FAEAEA"
                };
            setStyle(e, "backgroundColor", i[t] || t || i.warning), setTimeout(animate.pbind(e, {
                backgroundColor: n
            }, 300, function() {
                e.style.backgroundColor = data(e, "backstyle")
            }), 400)
        }
    }

    function i(e) {
        if (window.scrollNode && !browser.mobile && window._tbLink) {
            var t = ge("page_body"),
                o = getXY(t),
                n = scrollGetY(),
                i = bodyNode.scrollLeft,
                r = ge("side_bar"),
                a = isVisible(r);
            if (window._stlSideTop = Math.max((a ? getSize(r)[1] : 0) - n - (browser.mozilla ? getXY(pageNode)[1] : 0), o[1]), e || i != __scrLeft) {
                var s = ge("page_layout"),
                    c = vk.rtl ? s.offsetLeft + s.offsetWidth : 0,
                    l = vk.rtl ? (window.lastWindowWidth || 0) - c : s.offsetLeft;
                setStyle(_stlLeft, {
                    width: Math.max(l - 1, 0)
                });
                var d = vk.rtl ? o[0] + t.offsetWidth + 5 : l,
                    u = vk.rtl ? c - d : o[0] - 5 - d;
                setStyle(_stlSide, {
                    left: d - i,
                    width: Math.max(u, 0)
                }), __scrLeft = i
            }
            setStyle(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var p = _tbLink.loc || _stlWas || n > 200,
                _ = 0,
                h = !1,
                f = n > 250 && cur._regBar;
            if (p) {
                1 !== _stlShown && (show(_stlLeft, _stlSide), addClass(_stlLeft, "stl_active"), addClass(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (n = 0), _stlWas && n > 500 && (_stlWas = 0), n > 200 ? (_ = (n - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, h = 1, val(_stlText, getLang("global_to_top")), removeClass(_stlText, "down"), removeClass(_stlText, "back"))) : (_ = (200 - n) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, h = 0, val(_stlText, ""), addClass(_stlText, "down"), _stlBack && (_stlBack = 0, removeClass(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, h = _tbLink.fast ? 1 : 0, val(_stlText, getLang("global_back")), addClass(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, removeClass(_stlText, "down"))))), !1 !== h && toggleClass(_stlLeft, "over_fast", hasClass(_stlLeft, "over") && h);
                var w = {
                    opacity: Math.min(Math.max(_, 0), 1)
                };
                vk.staticheader && (w.top = -Math.min(getSize("page_header_cont")[1], n)), setStyle(_stlLeft, w)
            } else 0 !== _stlShown && (hide(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && f ? (_regBar = 1, val(ge("reg_bar_content"), cur._regBar), animate(ge("reg_bar"), {
                top: 0,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 60,
                transition: Fx.Transitions.sineInOut
            }, 400)) : _regBar && !f && (_regBar = 0, animate(ge("reg_bar"), {
                top: -56,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 13,
                transition: Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function r(e, t) {
        if ((e = ge(e)) && !e.btnevents)
            if (hasClass(e, "flat_button")) isFunction(t) && (e.onclick = t.pbind(e));
            else {
                var o = e.parentNode;
                if (hasClass(o, "button_blue") || hasClass(o, "button_gray")) isFunction(t) && (e.onclick = t.pbind(e));
                else {
                    var n = !1;
                    addEvent(e, "click mousedown mouseover mouseout", function(i) {
                        if (!hasClass(o, "locked")) switch (i.type) {
                            case "click":
                                if (!n) return;
                                return e.className = "button_hover", t(e), cancelEvent(i);
                            case "mousedown":
                                e.className = "button_down";
                                break;
                            case "mouseover":
                                n = !0, e.className = "button_hover";
                                break;
                            case "mouseout":
                                e.className = "button", n = !1
                        }
                    }), e.btnevents = !0
                }
            }
    }

    function a(e) {
        if (e = ge(e)) return hasClass(e, "ui_actions_menu_item_lock")
    }

    function s(e) {
        if ((e = ge(e)) && hasClass(e, "ui_actions_menu_item") && !hasClass(e, "ui_actions_menu_item_lock")) {
            data(e, "inner", e.innerHTML), addClass(e, "ui_actions_menu_item_lock");
            var t = ce("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            val(t, e.innerHTML), e.appendChild(t), showProgress(e)
        }
    }

    function c(e) {
        (e = ge(e)) && hasClass(e, "ui_actions_menu_item") && hasClass(e, "ui_actions_menu_item_lock") && (removeClass(e, "ui_actions_menu_item_lock"), e.innerHTML = data(e, "inner"))
    }

    function l(e) {
        if (e = ge(e)) return hasClass(e, "link_lock")
    }

    function d(e, t) {
        (e = ge(e)) && "a" == e.tagName.toLowerCase() && !l(e) && (addClass(e, "link_lock"), t && each(t, function(t, o) {
            addClass(e, o)
        }))
    }

    function u(e, t) {
        (e = ge(e)) && l(e) && (removeClass(e, "link_lock"), t && each(t, function(t, o) {
            removeClass(e, o)
        }))
    }

    function p(e) {
        if ((e = ge(e)) && ("button" == e.tagName.toLowerCase() || hasClass(e, "flat_button") || hasClass(e, "wr_header")) && !f(e)) {
            var t = getSize(e);
            addClass(e, "flat_btn_lock"), data(e, "inner", e.innerHTML), setStyle(e, {
                width: t[0],
                height: t[1]
            }), e.innerHTML = "", showProgress(e, "btn_lock")
        }
    }

    function _(e) {
        (e = ge(e)) && f(e) && (hideProgress(e), e.innerHTML = data(e, "inner"), removeClass(e, "flat_btn_lock"), setStyle(e, {
            width: null,
            height: null
        }))
    }

    function h(e) {
        return f(e)
    }

    function f(e) {
        if (e = ge(e)) return hasClass(e, "flat_btn_lock")
    }

    function w(e, t) {
        if ((e = ge(e)) && "button" === e.tagName.toLowerCase())
            if (t) {
                if (!isVisible(e)) return;
                e.parentNode.insertBefore(ce("button", {
                    innerHTML: e.innerHTML,
                    className: e.className + " button_disabled"
                }), e), hide(e)
            } else {
                var o = domPS(e);
                o && hasClass(o, "button_disabled") && re(o), show(e)
            }
    }

    function v(e) {
        if (void 0 === window._sbWidth || e) {
            var t = ce("div", {
                innerHTML: '<div style="height: 75px;">1<br>1</div>'
            }, {
                overflowY: "scroll",
                position: "absolute",
                width: "50px",
                height: "50px"
            });
            bodyNode.appendChild(t), window._sbWidth = Math.max(0, t.offsetWidth - t.firstChild.offsetWidth - 1), bodyNode.removeChild(t)
        }
        return window._sbWidth
    }

    function g(e) {
        return e = ge(e), hasClass(e, "on") ? 1 : ""
    }

    function m(e, t) {
        if ((e = ge(e)) && !hasClass(e, "disabled")) return void 0 === t && (t = !g(e)), toggleClass(e, "on", t), e.setAttribute("aria-checked", t ? "true" : "false"), !1
    }

    function b(e, t) {
        return e = ge(e), void 0 === t && (t = !hasClass(e, "disabled")), toggleClass(e, "disabled", t), "INPUT" == e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function y(e) {
        return !!radioBtns[e] && radioBtns[e].val
    }

    function x(e, t, o) {
        if (radioBtns[o] && !hasClass(e, "disabled")) return each(radioBtns[o].els, function() {
            this == e ? (addClass(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (removeClass(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t
    }
    o.r(t), o.d(t, "notaBene", function() {
        return n
    }), o.d(t, "updSideTopLink", function() {
        return i
    }), o.d(t, "createButton", function() {
        return r
    }), o.d(t, "actionsMenuItemLocked", function() {
        return a
    }), o.d(t, "lockActionsMenuItem", function() {
        return s
    }), o.d(t, "unlockActionsMenuItem", function() {
        return c
    }), o.d(t, "linkLocked", function() {
        return l
    }), o.d(t, "lockLink", function() {
        return d
    }), o.d(t, "unlockLink", function() {
        return u
    }), o.d(t, "lockButton", function() {
        return p
    }), o.d(t, "unlockButton", function() {
        return _
    }), o.d(t, "buttonLocked", function() {
        return h
    }), o.d(t, "isButtonLocked", function() {
        return f
    }), o.d(t, "disableButton", function() {
        return w
    }), o.d(t, "sbWidth", function() {
        return v
    }), o.d(t, "isChecked", function() {
        return g
    }), o.d(t, "checkbox", function() {
        return m
    }), o.d(t, "disable", function() {
        return b
    }), o.d(t, "radioval", function() {
        return y
    }), o.d(t, "radiobtn", function() {
        return x
    }), window.__scrLeft = 0, window.radioBtns = {}, window.notaBene = n, window.updSideTopLink = i, window.createButton = r, window.actionsMenuItemLocked = a, window.lockActionsMenuItem = s, window.unlockActionsMenuItem = c, window.linkLocked = l, window.lockLink = d, window.unlockLink = u, window.lockButton = p, window.unlockButton = _, window.buttonLocked = h, window.isButtonLocked = f, window.disableButton = w, window.sbWidth = v, window.isChecked = g, window.checkbox = m, window.disable = b, window.radioval = y, window.radiobtn = x
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t) {
    var o = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
    }
}, function(e, t) {
    var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = o)
}, function(e, t, o) {
    var n = o(41);
    e.exports = function(e, t, o) {
        for (var i in t) n(e, i, t[i], o);
        return e
    }
}, function(e, t, o) {
    'eat script';

    function n() {
        if ((getXY("ads_left", !0) || {})[1] && vk.id) {
            var e = getXYRect(geByTag1("ol", ge("side_bar_inner")), !0),
                t = e ? e.height : 0,
                o = getXYRect(ge("left_blocks"), !0),
                n = o ? o.height : 0,
                i = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - n - 42 - 10) / 260), 0);
            __seenAds = intval(getCookie("remixseenads")), __seenAds !== i && (__seenAds = i, setCookie("remixseenads", i, 30))
        }
    }

    function i(e, t) {
        return !window.noAdsAtAll && (i = function() {
            return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                al_ad: null
            }
        }, stManager.add(["aes_light.js"], i.pbind(e, t)) || {
            al_ad: null
        })
    }

    function r(e) {
        if (window.noAdsAtAll) return !1;
        r = function() {
            window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
        }, stManager.add(["aes_light.js"], r.pbind(e))
    }

    function a(e, t, o, n, i, r) {
        if (window.noAdsAtAll) return !1;
        a = function() {
            var e = "";
            arguments && arguments[0] && (e = arguments[0]), "\x3c!--criteo" === e.slice(0, "\x3c!--criteo".length) && Math.random() < .05 && (window.AdsLight && AdsLight.setNewBlock ? ajax.post("/wkview.php?act=mlet&mt=750", {}, {
                onFail: function() {
                    return !0
                }
            }) : ajax.post("/wkview.php?act=mlet&mt=751", {}, {
                onFail: function() {
                    return !0
                }
            })), window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments)
        }, stManager.add(["aes_light.js"], a.pbind(e, t, o, n, i, r))
    }

    function s(e) {
        if (window.noAdsAtAll) return !1;
        s = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, stManager.add(["aes_light.js"], s.pbind(e))
    }
    o.r(t), o.d(t, "updSeenAdsInfo", function() {
        return n
    }), o.d(t, "__adsGetAjaxParams", function() {
        return i
    }), o.d(t, "__adsUpdate", function() {
        return r
    }), o.d(t, "__adsSet", function() {
        return a
    }), o.d(t, "__adsUpdateExternalStats", function() {
        return s
    }), window.__seenAds = intval(getCookie("remixseenads")), window.__adsLoaded = vkNow(), window.updSeenAdsInfo = n, window.__adsGetAjaxParams = i, window.__adsUpdate = r, window.__adsSet = a, window.__adsUpdateExternalStats = s
}, function(e, t, o) {
    e.exports = o(34)
}, function(e, t, o) {
    'eat script';

    function n(e, t, o, n, i, r) {
        if ((e = ge(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var a, s = i ? ((a = function(e) {
                var t = e.data;
                e.data = i;
                var n = o.apply(this, [e]);
                return e.data = t, n
            }).handler = o, a) : o;
            e.setInterval && e != window && (e = window);
            var l = data(e, "events") || data(e, "events", {}),
                d = data(e, "handle") || data(e, "handle", function(e) {
                    return function() {
                        c.apply(e, arguments)
                    }
                }(e));
            each(t.split(/\s+/), function(t, o) {
                l[o] || (l[o] = [], !n && e.addEventListener ? e.addEventListener(o, d, r) : !n && e.attachEvent && e.attachEvent("on" + o, d)), l[o].push(s)
            })
        }
    }

    function i(e, t, o, n) {
        if (void 0 === n && (n = !1), e = ge(e)) {
            var r = data(e, "events");
            if (r)
                if ("string" == typeof t) each(t.split(/\s+/), function(t, i) {
                    if (isArray(r[i])) {
                        var a = r[i].length;
                        if (isFunction(o)) {
                            for (var s = a - 1; s >= 0; s--)
                                if (r[i][s] && (r[i][s] === o || r[i][s].handler === o)) {
                                    r[i].splice(s, 1), a--;
                                    break
                                }
                        } else {
                            for (s = 0; s < a; s++) delete r[i][s];
                            a = 0
                        }
                        a || (e.removeEventListener ? e.removeEventListener(i, data(e, "handle"), n) : e.detachEvent && e.detachEvent("on" + i, data(e, "handle")), delete r[i])
                    }
                }), isEmpty(r) && (removeData(e, "events"), removeData(e, "handle"));
                else
                    for (var a in r) i(e, a)
        }
    }

    function r(e, t, o, n) {
        e = ge(e);
        var i = data(e, "handle");
        if (i) {
            var r = function() {
                i.call(e, extend(o || {}, {
                    type: t,
                    target: e
                }))
            };
            n ? r() : setTimeout(r, 0)
        }
    }

    function a(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function s(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function c(e) {
        e = l(e);
        var t = Array.prototype.slice.call(arguments);
        t[0] = e;
        var o = data(this, "events");
        if (o && "string" == typeof e.type && o[e.type] && o[e.type].length) {
            var n = (o[e.type] || []).slice();
            for (var i in n) {
                if ("mouseover" == e.type || "mouseout" == e.type) {
                    for (var r = e.relatedElement; r && r != this;) r = r.parentNode;
                    if (r == this) continue
                }
                var s = n[i].apply(this, t);
                if (!1 !== s && -1 !== s || a(e), -1 === s) return !1
            }
        }
    }

    function l(e) {
        var t = e = e || window.event;
        if ((e = clone(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function d(e) {
        return (e = e || window.event) && ("click" == e.type || "mousedown" == e.type || "mouseup" == e.type) && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey) || !1
    }

    function u(e) {
        if (!(e = l(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = getSize(e.target),
            o = getXY(e.target),
            n = e.pageX - o[0],
            i = e.pageY - o[1];
        return n < -1 || n > t[0] + 1 || i < -1 || i > t[1] + 1 || Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function p(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o == t || o == t.parentNode) return !0;
        for (; o != t && o.parentNode && o.parentNode != bodyNode;) o = o.parentNode;
        return o != t
    }
    o.r(t), o.d(t, "addEvent", function() {
        return n
    }), o.d(t, "removeEvent", function() {
        return i
    }), o.d(t, "triggerEvent", function() {
        return r
    }), o.d(t, "cancelEvent", function() {
        return a
    }), o.d(t, "stopEvent", function() {
        return s
    }), o.d(t, "_eventHandle", function() {
        return c
    }), o.d(t, "normEvent", function() {
        return l
    }), o.d(t, "checkEvent", function() {
        return d
    }), o.d(t, "checkKeyboardEvent", function() {
        return u
    }), o.d(t, "checkOver", function() {
        return p
    }), window.KEY = {
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
    }, window.addEvent = n, window.removeEvent = i, window.triggerEvent = r, window.cancelEvent = a, window.stopEvent = s, window._eventHandle = c, window.normEvent = l, window.checkEvent = d, window.checkKeyboardEvent = u, window.checkOver = p
}, function(e, t, o) {
    var n = o(43)("unscopables"),
        i = Array.prototype;
    void 0 == i[n] && o(1)(i, n, {}), e.exports = function(e) {
        i[n][e] = !0
    }
}, function(e, t, o) {
    var n = o(70),
        i = o(69),
        r = o(33),
        a = Object.defineProperty;
    t.f = o(19) ? Object.defineProperty : function(e, t, o) {
        if (n(e), t = r(t, !0), n(o), i) try {
            return a(e, t, o)
        } catch (e) {}
        if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
        return "value" in o && (e[t] = o.value), e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "animate", function() {
        return i
    }), o.d(t, "cubicBezier", function() {
        return r
    }), o.d(t, "fadeTo", function() {
        return a
    }), o.d(t, "genFx", function() {
        return s
    }), o.d(t, "getRGB", function() {
        return c
    }), o.d(t, "getColor", function() {
        return l
    });
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function i(e, t, o, i) {
        if (e = ge(e)) {
            var r, a = isFunction(i) ? i : function() {},
                s = extend({}, "object" == (void 0 === o ? "undefined" : n(o)) ? o : {
                    duration: o,
                    onComplete: a
                }),
                d = {},
                u = {},
                p = isVisible(e);
            s.orig = {}, (t = clone(t)).discrete && (s.discrete = 1, delete t.discrete), browser.iphone && (s.duration = 0);
            var _ = data(e, "tween"),
                h = p ? "hide" : "show";
            for (r in _ && _.isTweening && (s.orig = extend(s.orig, _.options.orig), _.stop(!1), _.options.show ? h = "hide" : _.options.hide && (h = "show")), t) {
                if (!_ && ("show" == t[r] && p || "hide" == t[r] && !p)) return s.onComplete.call(this, e);
                if ("height" != r && "width" != r || !e.style || (t.overflow || (void 0 == s.orig.overflow && (s.orig.overflow = getStyle(e, "overflow")), e.style.overflow = "hidden"), hasClass(e, "inl_bl") || "TD" == e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[r]))
                    if ("toggle" == t[r] && (t[r] = h), "show" == t[r]) {
                        var f = 0;
                        s.show = !0, void 0 == s.orig[r] && (s.orig[r] = getStyle(e, r, !1) || "", setStyle(e, r, 0));
                        var w = s.orig[r],
                            v = e.style[r];
                        e.style[r] = w, t[r] = parseFloat(getStyle(e, r, !0)), e.style[r] = v, "height" == r && browser.msie && !t.overflow && (e.style.overflow = "hidden")
                    } else void 0 == s.orig[r] && (s.orig[r] = getStyle(e, r, !1) || ""), s.hide = !0, t[r] = 0
            }
            return s.show && !p && show(e), _ = new Fx.Base(e, s), each(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    if (f = l(e, "borderColor" == t ? "borderTopColor" : t), o = c(o), void 0 === f) return
                } else {
                    var n = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    _.cur(t, !0);
                    n && (o = parseFloat(n[2]), n[1] && (o = ("-=" == n[1] ? -1 : 1) * o + o)), 0 != (f = _.cur(t, !0)) || "width" != t && "height" != t || (f = 1), "opacity" == t && o > 0 && !p && (setStyle(e, "opacity", 0), f = 0, show(e))
                }(f != o || isArray(f) && f.join(",") == o.join(",")) && (d[t] = f, u[t] = o)
            }), _.start(d, u), data(e, "tween", _), _
        }
    }

    function r(e, t, o, n, i, r) {
        var a, s, c, l, d, u, p = function(t) {
                var n = 1 - t;
                return 3 * n * n * t * e + 3 * n * t * t * o + t * t * t
            },
            _ = function(e) {
                var o = 1 - e;
                return 3 * o * o * e * t + 3 * o * e * e * n + e * e * e
            },
            h = function(t) {
                var n = 1 - t;
                return 3 * (2 * (t - 1) * t + n * n) * e + 3 * (-t * t * t + 2 * n * t) * o
            },
            f = i;
        for (c = f, u = 0; u < 8; u++) {
            if (l = p(c) - f, Math.abs(l) < r) return _(c);
            if (d = h(c), Math.abs(d) < 1e-6) break;
            c -= l / d
        }
        if (s = 1, (c = f) < (a = 0)) return _(a);
        if (c > s) return _(s);
        for (; a < s;) {
            if (l = p(c), Math.abs(l - f) < r) return _(c);
            f > l ? a = c : s = c, c = .5 * (s - a) + a
        }
        return _(c)
    }

    function a(e, t, o, n) {
        return i(e, {
            opacity: o
        }, t, n)
    }

    function s(e, t) {
        var o = {};
        return each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }

    function c(e) {
        var t;
        return e && isArray(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function l(e, t) {
        var o;
        do {
            if ((o = getStyle(e, t)).indexOf("rgba") || (o = ""), "" != o && "transparent" != o || "body" == e.nodeName.toLowerCase()) break;
            t = "backgroundColor"
        } while (e = e.parentNode);
        return c(o)
    }
    window.Fx = {
        Transitions: {
            linear: function(e, t, o, n) {
                return o * e / n + t
            },
            sineInOut: function(e, t, o, n) {
                return -o / 2 * (Math.cos(Math.PI * e / n) - 1) + t
            },
            halfSine: function(e, t, o, n) {
                return o * Math.sin(Math.PI * (e / n) / 2) + t
            },
            easeOutBack: function(e, t, o, n) {
                var i = 1.70158;
                return o * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t
            },
            easeInCirc: function(e, t, o, n) {
                return -o * (Math.sqrt(1 - (e /= n) * e) - 1) + t
            },
            easeOutCirc: function(e, t, o, n) {
                return o * Math.sqrt(1 - (e = e / n - 1) * e) + t
            },
            easeInQuint: function(e, t, o, n) {
                return o * (e /= n) * e * e * e * e + t
            },
            easeOutQuint: function(e, t, o, n) {
                return o * ((e = e / n - 1) * e * e * e * e + 1) + t
            },
            easeOutCubic: function(e, t, o, n) {
                return o * ((e = e / n - 1) * e * e + 1) + t
            },
            swiftOut: function(e, t, o, n) {
                return o * r(.4, 0, .22, 1, e / n, 4 / n) + t
            }
        },
        Attrs: [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity", "left", "top"]
        ],
        Timers: [],
        TimerId: null
    }, window.fx = Fx, Fx.Base = function(e, t, o) {
        this.el = ge(e), this.name = o, this.options = extend({
            onStep: function() {},
            onComplete: function() {},
            transition: t.transition || Fx.Transitions.sineInOut,
            duration: 500
        }, t || {})
    }, each({
        slideDown: s("show", 1),
        slideUp: s("hide", 1),
        slideToggle: s("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        window[e] = function(e, o, n) {
            return i(e, t, o, n)
        }
    }), Fx.Base.prototype = {
        start: function(e, t) {
            this.from = e, this.to = t, this.time = vkNow(), this.isTweening = !0;
            var o = this;

            function n(e) {
                return o.step(e)
            }
            return n.el = this.el, n() && Fx.Timers.push(n) && !Fx.TimerId && (Fx.TimerId = setInterval(function() {
                for (var e = Fx.Timers, t = e.length, o = 0; o < t; o++) e[o]() || (e.splice(o--, 1), t--);
                t || (clearInterval(Fx.TimerId), Fx.TimerId = null)
            }, 13)), this
        },
        stop: function(e) {
            for (var t = Fx.Timers, o = t.length - 1; o >= 0; o--) t[o].el == this.el && (e && t[o](!0), t.splice(o, 1));
            this.isTweening = !1
        },
        step: function(e) {
            var t = vkNow();
            if (!e && t < this.time + this.options.duration) {
                for (var o in this.cTime = t - this.time, this.now = {}, this.to)
                    if (isArray(this.to[o])) {
                        var n, i = [];
                        for (n = 0; n < 3; n++) {
                            if (void 0 === this.from[o] || void 0 === this.to[o]) return !1;
                            i.push(Math.min(parseInt(this.compute(this.from[o][n], this.to[o][n])), 255))
                        }
                        this.now[o] = i
                    } else this.now[o] = this.compute(this.from[o], this.to[o]), this.options.discrete && (this.now[o] = intval(this.now[o]));
                return this.update(), !0
            }
            return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = extend(this.to, this.options.orig), this.update(), this.options.hide && hide(this.el), this.isTweening = !1, !1
        },
        compute: function(e, t) {
            var o = t - e;
            return this.options.transition(this.cTime, e, o, this.options.duration)
        },
        update: function() {
            for (var e in this.options.onStep(this.now), this.now) isArray(this.now[e]) ? setStyle(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 != this.el[e] ? this.el[e] = this.now[e] : setStyle(this.el, e, this.now[e])
        },
        cur: function(e, t) {
            return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(getStyle(this.el, e, t)) || 0 : this.el[e]
        }
    }, window.animate = i, window.cubicBezier = r, window.fadeTo = a, window.genFx = s, window.getRGB = c, window.getColor = l
}]);