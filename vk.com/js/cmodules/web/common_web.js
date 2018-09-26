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
    }, o.p = "", o(o.s = 11)
}([, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "isInputActive", function() {
        return r
    }), o.d(t, "placeholderSetup", function() {
        return s
    }), o.d(t, "placeholderInit", function() {
        return c
    });
    var n = o(32),
        i = o(28);

    function r() {
        return document.activeElement && (attr(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }

    function a(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2],
            r = arguments[3],
            a = e.phshown,
            s = e.phcont,
            c = t.back,
            _ = t.editable,
            l = t.hideBackAfter,
            u = t.timeout,
            d = t.phColor,
            p = void 0 === d ? "#8C8E91" : d,
            f = t.activeColor,
            h = void 0 === f ? "#C0C8D0" : f,
            w = u || 0 === u ? u : 100,
            b = t.period || 200,
            v = void 0;
        if (v = _ ? (void 0 !== e.textContent ? e.textContent : e.innerText) || Object(n.geByTag)("img", e).length : e.value, a && (c && v || !c && (o && !o.type || v)) ? (hide(s), e.phshown = !1) : a || v || !c && !r || (show(s), e.phshown = !0, browser.opera && r && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), c && !v) {
            if (o && !o.type) {
                var g = l ? hide.pbind(s.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    Object(i.animate)(s.firstChild.firstChild, {
                        color: h
                    }, b, g)
                }, w)
            }
            r && (clearTimeout(e.phanim), l && show(s.firstChild.firstChild), e.phanim = setTimeout(function() {
                Object(i.animate)(s.firstChild.firstChild, {
                    color: p
                }, b)
            }, w))
        }
    }

    function s(e, t) {
        var o = Object(n.ge)(e),
            i = t ? clone(t) : {};
        if (o && (!o.phevents || i.reload)) {
            var r = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (r) {
                o.removeAttribute("placeholder");
                var s = {},
                    c = !1,
                    _ = ["Top", "Bottom", "Left", "Right"];
                if (i.pad) s = i.pad;
                else {
                    if (i.fast) {
                        for (var l = 0; l < 4; l++) s["padding" + _[l]] = 3, s["margin" + _[l]] = 0, s["border" + _[l] + "Width"] = 1;
                        extend(s, i.styles || {})
                    } else {
                        for (var u = [], d = 0; d < 4; d++) u.push("margin" + _[d]), u.push("padding" + _[d]), u.push("border" + _[d] + "Width");
                        s = Object(n.getStyle)(o, u)
                    }
                    for (var p = 0; p < 4; p++) {
                        var f = "margin" + _[p],
                            h = "border" + _[p] + "Width";
                        s[f] = intval(s[f]) + intval(s[h]) + "px", delete s[h]
                    }
                }
                if (i.reload) {
                    var w = o.previousSibling;
                    w && hasClass(w, "input_back_wrap") && Object(n.re)(w)
                }
                var b = i.big ? " big" : "",
                    v = Object(n.getSize)(o)[0] - 20,
                    g = o.phcont = o.parentNode.insertBefore(Object(n.ce)("div", {
                        className: "input_back_wrap no_select",
                        innerHTML: '<div class="input_back"><div class="input_back_content' + b + '" style="width: ' + v + 'px;">' + r + "</div></div>"
                    }), o),
                    m = Object(n.domFC)(g);
                Object(n.setStyle)(m, s);
                var O = a.pbind(o, i),
                    y = browser.mobile ? O : function(e, t) {
                        return setTimeout(O.pbind(e, t), 0)
                    };
                browser.msie && browser.version < 8 && Object(n.setStyle)(m, {
                    marginTop: 1
                }), o.phonfocus = function(e) {
                    c || (o.focused = !0, cur.__focused = o, !0 === e && (Object(n.setStyle)(o, {
                        backgroundColor: "#FFF"
                    }), hide(m)), y(!0, !1))
                }, o.phonblur = function() {
                    c || (cur.__focused = o.focused = !1, show(m), y(!1, !0))
                }, o.phshown = !0, o.phanim = null, (o.value || i.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(n.geByTag)("img", o).length)) && (o.phshown = !1, hide(g)), browser.opera_mobile || (addEvent(g, "focus click", function(e) {
                    c || (i.editableFocus ? (setTimeout(i.editableFocus.pbind(o), 0), o.phonfocus()) : (o.blur(), o.focus()))
                }), addEvent(o, "focus" + (i.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", y)), addEvent(o, "blur", o.phonblur), o.check = y, o.getValue = function() {
                    return i.editable ? o.innerHTML : o.value
                }, o.setPlaceholder = function(e) {
                    return geByClass1("input_back_content", g).textContent = e
                }, o.setDisabled = function(e) {
                    return c = e
                }, o.setValue = function(e) {
                    i.editable ? o.innerHTML = e : o.value = e, a(o, i)
                }, o.phevents = !0, o.phonsize = function() {}, i.global || i.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                    for (var t = 0, o = e.length; t < o; t++) Object(n.removeData)(e[t])
                }.pbind(cur.__phinputs))), cur.__phinputs.push(o))
            }
        }
    }

    function c(e, t) {
        var o = Object(n.ge)(e),
            i = t ? clone(t) : {},
            r = void 0 === Object(n.ce)("input").placeholder || o && o.getAttribute && o.getAttribute("contenteditable");
        if (o && (!o.phevents || i.reload)) {
            var a = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (a && (o.getValue = function() {
                    return i.editable ? o.innerHTML : o.value
                }, o.setValue = function(e) {
                    i.editable ? o.innerHTML = e : o.value = e, r && u(o, i)
                }, o.phonfocus = function() {}, o.phonblur = function() {}, r)) {
                if (o.removeAttribute("placeholder"), i.reload) {
                    var s = domNS(o);
                    s && hasClass(s, "placeholder") && Object(n.re)(s)
                }
                var c = o.phcont = Object(n.domInsertAfter)(Object(n.ce)("div", {
                        className: "placeholder",
                        innerHTML: '<div class="ph_input"><div class="ph_content">' + a + "</div></div>"
                    }), o),
                    _ = u.pbind(o, i),
                    l = browser.mobile ? _ : function(e, t) {
                        return setTimeout(_.pbind(e, t), 0)
                    };
                o.phonfocus = function() {
                    o.focused = !0, cur.__focused = o, l(!0, !1)
                }, o.phonblur = function() {
                    cur.__focused = o.focused = !1, l(!1, !0)
                }, o.phshown = !0, (o.value || i.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(n.geByTag)("img", o).length)) && (o.phshown = !1, hide(c)), browser.opera_mobile || (addEvent(c, "focus click contextmenu", function(e) {
                    i.editableFocus ? (setTimeout(i.editableFocus.pbind(o), 0), "contextmenu" === e.type && browser.msie && i.editableFocus(o), o.phonfocus()) : (o.blur(), o.focus())
                }), addEvent(o, "focus" + (i.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", l)), addEvent(o, "blur", o.phonblur), o.check = l, o.phevents = !0, o.phonsize = function() {}, i.global || i.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                    if (cur.__phinputs)
                        for (var e = 0, t = cur.__phinputs.length; e < t; ++e) Object(n.removeData)(cur.__phinputs[e])
                })), cur.__phinputs.push(o))
            }
        }

        function u(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = e.phshown,
                i = e.phcont,
                r = void 0;
            t.editable ? ((r = void 0 !== e.textContent ? e.textContent : e.innerText) && browser.opera && r.match(/^[ ]+$/) && (r = ""), r || (r = Object(n.geByTag)("img", e).length > 0), r || (r = Object(n.geByTag)("br", e).length > 1), r || (r = Object(n.geByTag)("p", e).length > 1)) : r = e.value, o && r ? (hide(i), e.phshown = !1) : o || r || (show(i), e.phshown = !0)
        }
    }
}, function(e, t, o) {
    var n = o(49),
        i = o(105);
    e.exports = Object.keys || function(e) {
        return n(e, i)
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var _top_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37),
        _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86),
        _debug_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32),
        _dom_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(132),
        _scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14),
        _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76),
        _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24),
        _nav_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(124),
        _layout_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(39),
        _video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(91),
        _legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(58),
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Nav = {
            getData: function(e) {
                if (e.length) {
                    for (var t in navMap) {
                        if (navMap.hasOwnProperty(t))
                            if ("<" !== t[0])
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
                if (!Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.reloadCheckFlood)(e)) {
                    e = e || {};
                    var t = Nav.strLoc.replace(/^\/+/g, "");
                    e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), Nav.go("/" + t, void 0, extend({
                        nocur: !0
                    }, e)))
                }
            },
            link: function(e, t) {
                if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.checkEvent)(t) || cur.noAjaxNav) {
                    var o = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                    window.open(o)
                } else Nav.go(e)
            },
            go: function go(loc, ev) {
                var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                    var newLink = loc.href,
                        _postParams = Nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)),
                        postOptions = Nav.mergePostParamsOptions(_postParams, opts.params),
                        extraQuery = {};
                    return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), postOptions._post_click_cc_key && (extraQuery.cc_key = postOptions._post_click_cc_key), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(extraQuery)), location.href = newLink, !1
                }
                if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.checkEvent)(ev) && !cur.noAjaxNav) {
                    if (LongView.onBeforePageChange(), loc.tagName && "a" === loc.tagName.toLowerCase()) {
                        if ("_blank" === loc.target || Nav.baseBlank) return;
                        var _params = loc.getAttribute("hrefparams");
                        if (_params && (opts.params = extend(opts.params || {}, Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                    }
                    var strLoc = "",
                        objLoc = {},
                        changed = {};
                    "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = Nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = Nav.toStr(loc), objLoc = loc), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.statDurationsLoadImage)(), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.statNavigationTiming)();
                    var ap = getAudioPlayer();
                    if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                        for (var i in changed = clone(objLoc), Nav.objLoc) Nav.objLoc.hasOwnProperty(i) && (Nav.objLoc[i] === changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1));
                        if (!1 === Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)(clone(changed), {
                                hist: opts.hist,
                                asBox: opts.asBox,
                                onDone: opts.onDone
                            }, objLoc)) return Nav.setLoc(strLoc), !1;
                        var isHandled = articleNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                        if (isHandled) return Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)({
                            z: Nav.objLoc.z,
                            w: Nav.objLoc.w
                        }, {}), !1
                    }
                    if (!opts.nocur && (vk.loaded || !changed[0]))
                        for (var curnav = cur.nav || [], _i = curnav.length - 1; _i >= 0; _i--) {
                            var oldUrl = document.URL;
                            if (!1 === curnav[_i](clone(changed), Nav.objLoc, objLoc, opts)) {
                                var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                    referrer = oldUrl === currentURL ? "" : oldUrl;
                                return setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10), !1
                            }
                        }
                    if (4 === vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                        location.href = "/" + (strLoc || "").replace("%23", "#")
                    }, 0), !1;
                    if (window.Upload && Upload.terminateAllUploads(), Object(_top_search__WEBPACK_IMPORTED_MODULE_0__.topHeaderClose)(), opts.back) {
                        if (cur._back && cur._back.onBack) return cur._back.onBack();
                        for (var _i2 = 0, l = globalHistory.length; _i2 < l; _i2++)
                            if (globalHistory[_i2].loc === strLoc) {
                                var _ret = function() {
                                    var e = globalHistory.splice(_i2, 1)[0],
                                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("wrap3"),
                                        o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("title"),
                                        n = cur._onback;
                                    return window.tooltips && tooltips.destroyAll(), hide("audio_tip_wrap"), processDestroy(cur), radioBtns = e.radioBtns, ajaxCache = e.ajaxCache, PageID = e.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), showBackLink(), cur = e.cur, setTimeout(function() {
                                        if (t.innerHTML = "", t.parentNode.replaceChild(e.content, t), vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || handlePageView(e), Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(e.scrollTop, 0), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setDocumentTitle)(e.htitle), o.innerHTML = e.title, e.bodyClass !== bodyNode.className && (bodyNode.className = e.bodyClass || "", vk.body_class = e.bodyClass || ""), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setStyle)(o.parentNode, "display", e.hideHeader ? "none" : "block"), cur._back.show)
                                            for (var i = 0, r = cur._back.show.length; i < r; i++) cur._back.show[i]();
                                        if (n)
                                            for (var a = 0, s = n.length; a < s; a++) n[a]();
                                        Nav.setLoc(strLoc);
                                        var c = e.back || {};
                                        setTimeout(function() {
                                            showBackLink(c[0], c[1], c[2]), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)({
                                                z: Nav.objLoc.z,
                                                w: Nav.objLoc.w
                                            }, {}), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), updateAriaElements(), TopSearch.clear()
                                        }, 10), getAudioPlayer().updateCurrentPlaying()
                                    }, 10), {
                                        v: !1
                                    }
                                }();
                                if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v
                            }
                    }
                    var dest = objLoc[0];
                    delete objLoc[0];
                    var where = Nav.getData(dest);
                    opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = extend(opts.params || {}, {
                        _ref: Nav.objLoc[0] || ""
                    })), where.files && stManager.add(where.files), where.params = extend({
                        __query: dest,
                        al_id: vk.id
                    }, objLoc, opts.params || {});
                    var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null,
                        postParams = Nav.getPostParams(postParamsEl, !!where.params._post_click_type);
                    where.params = Nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                    var curNavVersion = ++NextPageID,
                        done = function done(title, html, js, params) {
                            if (curNavVersion === NextPageID) {
                                try {
                                    params._id = params.id
                                } catch (e) {
                                    return Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(e, {
                                        dt: 15,
                                        type: 6,
                                        msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                        url: where.url,
                                        query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(where.params),
                                        answer: arguments.length
                                    })
                                }
                                if (window.lastScrollTop = Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollGetY)(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                    if (Nav.setLoc(params.loc || Nav.strLoc), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.reloadCheckFlood)({
                                            force: !0,
                                            from: 4
                                        })) return;
                                    location.reload(!0)
                                } else {
                                    var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                        tNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("title"),
                                        wNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("wrap3"),
                                        _back = cur._back,
                                        hist = !1;
                                    if ((strLoc === (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && showBackLink()), window.tooltips && tooltips.destroyAll(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass)("page_actions_wrap"), function(e, t) {
                                            return hide(t)
                                        }), hide("audio_tip_wrap"), _back) {
                                        if (Object(_video__WEBPACK_IMPORTED_MODULE_11__.revertLastInlineVideo)(), hist = {
                                                loc: _back.loc || Nav.strLoc,
                                                cur: cur,
                                                radioBtns: radioBtns,
                                                ajaxCache: ajaxCache,
                                                pid: PageID,
                                                scrollTop: Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollGetY)(),
                                                htitle: document.title.toString(),
                                                width: vk.width,
                                                width_dec: vk.width_dec,
                                                width_dec_footer: vk.width_dec_footer,
                                                noleftmenu: vk.noleftmenu,
                                                notopmenu: vk.notopmenu,
                                                nobottommenu: vk.nobottommenu,
                                                bodyClass: vk.body_class,
                                                back: !!_tbLink.loc && [_tbLink.loc, val(_tbLink), _tbLink.fast]
                                            }, tNode && tNode.parentNode && !Object(_dom__WEBPACK_IMPORTED_MODULE_4__.isVisible)(tNode.parentNode) && (hist.hideHeader = !0), globalHistoryDestroy(hist.loc), globalHistory.length > 2) {
                                            var h = globalHistory.shift();
                                            processDestroy(h.cur), h.content.innerHTML = ""
                                        }
                                        if (cur._back.hide)
                                            for (var _i5 = 0, _l3 = cur._back.hide.length; _i5 < _l3; _i5++) cur._back.hide[_i5]();
                                        _back.text && showBackLink(hist.loc, _back.text, 1)
                                    } else _tbLink && (_tbLink.fast = 0), processDestroy(cur);
                                    if (PageID = NextPageID, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(radioBtns, function(e, t) {
                                            t.keep || delete radioBtns[e]
                                        }), ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), cur = {
                                            destroy: [],
                                            nav: []
                                        }, window._stlWas = 0, newPage) {
                                        for (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                            var _h = globalHistory.shift();
                                            processDestroy(_h.cur), _h.content.innerHTML = ""
                                        }
                                        var oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        pageNode.innerHTML = html, oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: oldTopW
                                        }), window._tbLink = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("top_back_link");
                                        try {
                                            _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                        } catch (e) {}
                                        browser.mobile || Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(!0)
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
                                        var _oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        wNode.innerHTML = html, _oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: _oldTopW
                                        }), tNode.innerHTML = title, (title ? show : hide)(tNode.parentNode), getAudioPlayer().updateCurrentPlaying()
                                    }
                                    if (Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.checkPageBlocks)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), updateAriaElements(), TopSearch.clear(), window.LazyLoad && LazyLoad.scanDelayed(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.handlePageParams)(params), opts.preventScroll || (opts.scrollTop > 0 ? Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(opts.scrollTop, 0) : opts.noscroll || params.noscroll || Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToTop)(0)), opts.bench && (ajax.tRender = (new Date).getTime()), Nav.curLoc = params.loc, js) {
                                        var evalString = "(function(){" + js + ";})()";
                                        if (__debugMode) eval(evalString);
                                        else try {
                                            eval(evalString)
                                        } catch (e) {
                                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_3__.logEvalError)(e, evalString)
                                        }
                                    }
                                    ajax._framenext(), opts.onDone && opts.onDone(), browser.mobile && Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(), changed.f && handleScroll(changed.f), Nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.lTimeout)(function() {
                                        getAudioPlayer().updateCurrentPlaying(), TopMenu.toggle(!1)
                                    }, browser.chrome ? 100 : 50)
                                }
                            }
                        };
                    return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.updSeenAdsInfo)(), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.__adsUpdate)("already"), "im" !== Nav.objLoc[0] && "im" !== changed[0] || (where.params = extend({}, where.params, {
                        _full_page: !0
                    })), ajax.post(where.url, where.params, {
                        onDone: function() {
                            var e = arguments;
                            if (__debugMode) done.apply(null, e);
                            else try {
                                done.apply(null, e)
                            } catch (t) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(t, {
                                    dt: 15,
                                    type: 6,
                                    url: where.url,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(where.params),
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
                        showProgress: opts.showProgress,
                        hideProgress: opts.hideProgress,
                        cache: opts.search ? 1 : "",
                        bench: opts.bench
                    }), !1
                }
            },
            setLoc: function(e) {
                "string" == typeof e ? (Nav.strLoc = e, Nav.objLoc = Nav.fromStr(e)) : (Nav.strLoc = Nav.toStr(e), Nav.objLoc = e), hab.setLoc(Nav.strLoc)
            },
            change: function(e, t, o) {
                var n = clone(Nav.objLoc);
                return Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(e, function(e, t) {
                    !1 === t ? delete n[e] : n[e] = t
                }), Nav.go(n, t, o)
            },
            fromStr: function(e) {
                var t = (e = e.split("#"))[0].split("?"),
                    o = {
                        0: t[0] || ""
                    };
                return e[1] && (o["#"] = e[1]), extend(Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(t[1] || ""), o)
            },
            toStr: function(e) {
                var t = (e = clone(e))["#"] || "",
                    o = e[0] || "";
                delete e[0], delete e["#"];
                var n = Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(e);
                return (n ? o + "?" + n : o) + (t ? "#" + t : "")
            },
            init: function() {
                window.globalHistory = [], Nav.strLoc = hab.getLoc(), Nav.objLoc = Nav.fromStr(Nav.strLoc)
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
                var s = e.getAttribute("data-post-click-cc-key");
                s && (o.post_click_cc_key = s);
                var c = [e.getAttribute("href"), e.getAttribute("data-href")];
                if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(c, function(e, t) {
                        if (t && "#" !== t) return o.post_click_url = t, !1
                    }), !!r || t) {
                    var _ = gpeByClass("_ads_promoted_post_data_w", e),
                        l = _ && _.getAttribute("data-ad"),
                        u = _ && _.getAttribute("data-ad-block-uid");
                    l && (o.ad_data = l), u && (o.ad_block_unique_id = u)
                }
                return o
            },
            mergePostParamsOptions: function(e, t) {
                if (t = t || {}, !e) return t;

                function o(e, o, n) {
                    var i = n && t[o];
                    return !(!e || i) && (t[o] = e, !0)
                }
                return o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && (o(e.post_click_mention_id, "_post_click_mention_id", !0), o(e.post_click_cc_key, "_post_click_cc_key", !0), o(e.post_click_url, "_post_click_url", !0), o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id")), t
            }
        };

    function articleNav(e, t, o, n) {
        var i = e,
            r = /^(?:%40|@)[.a-z0-9_-]+(?:\?\w+)?/;
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
            return delete cur.articlePrevLoc, s && !r.test(s) ? e === s ? (a(), !0) : (layers.fullhide = function() {
                a()
            }, !1) : (a(), !0)
        }
        return !1
    }
    __webpack_exports__.default = Nav
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(117);
    window.EventEmitter = n, t.default = n
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "hasAccessibilityMode", function() {
        return a
    }), o.d(t, "updateOnlineText", function() {
        return s
    }), o.d(t, "updateAriaCheckboxes", function() {
        return c
    }), o.d(t, "updateAriaRadioBtns", function() {
        return _
    }), o.d(t, "updateAriaElements", function() {
        return l
    });
    var n = o(109),
        i = o(37),
        r = o(32);

    function a() {
        return !(!window.vk || !vk.a11y)
    }

    function s() {
        clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
            Object(i.each)(Object(r.geByClass)("_online"), function() {
                var e = geByClass1("_online_reader", this) || this,
                    t = hasClass(this, "online"),
                    o = hasClass(this, "mobile"),
                    n = Object(r.geByTag)("img", e),
                    a = function(e) {
                        var t = Object(r.domClosest)("_post", e),
                            o = t && Object(r.domByClass)(t, "author");
                        return o ? o.innerText || o.textContent : ""
                    };
                if (t) {
                    var s = "";
                    Object(i.each)(n, function() {
                        var e = attr(this, "alt") || attr(this, "data-alt") || a(this);
                        e && (s = Object(i.trim)(s + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), s = Object(i.trim)(s + " " + (o ? getLang("global_user_is_online_mobile") : getLang("global_user_is_online"))), e.setAttribute("aria-label", s)
                } else Object(i.each)(n, function() {
                    var e = attr(this, "data-alt") || a(this);
                    e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                }), e.removeAttribute("aria-label")
            })
        }, 100)
    }

    function c() {
        clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
            var e = [];
            Object(i.each)(["checkbox", "checkbox_pic"], function() {
                e = e.concat(Object(r.geByClass)(this))
            }), Object(i.each)(e, function() {
                "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(n.isChecked)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
            })
        }, 100)
    }

    function _() {
        clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
            var e = [],
                t = Object(r.geByClass)("radiobtn");
            Object(i.each)(t, function() {
                if ("DIV" === this.tagName && !this.getAttribute("role")) {
                    var t = Object(n.isChecked)(this);
                    this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                    var o = function(e) {
                        var t = 0,
                            o = e;
                        for (; t < 5 && o !== document;) {
                            o = domPN(o);
                            var n = Object(r.geByClass)("radiobtn", o);
                            if (n.length > 1) break;
                            t++
                        }
                        return o
                    }(this);
                    ~e.indexOf(o) || e.push(o)
                }
            }), Object(i.each)(e, function() {
                if (!Object(r.geByClass)("on", this).length) {
                    var e = Object(r.geByClass)("radiobtn", this);
                    e.length && e[0].setAttribute("tabindex", 0)
                }
            })
        }, 100)
    }

    function l() {
        s(), c(), _()
    }
}, function(e, t, o) {
    'eat script';

    function n() {
        window._logTimer = (new Date).getTime()
    }

    function i(e, t) {
        window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
    }

    function r(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), browser.msie || browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (e) {}
    }

    function a(e) {
        if (!e) return !1;
        var t = e.tagName,
            o = e.id,
            n = e.className,
            i = (t || "").toLowerCase();
        return n && (i += "." + e.className.replace(/\s+/g, ".")), o && !/^__vk/.test(o) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
    }
    o.r(t), o.d(t, "initDebugTools", function() {
        return n
    }), o.d(t, "logEvalError", function() {
        return i
    }), o.d(t, "debugLog", function() {
        return r
    }), o.d(t, "debugEl", function() {
        return a
    })
}, function(e, t, o) {
    'eat script';
    var n = o(16),
        i = {};
    i[o(118)("toStringTag")] = "z", i + "" != "[object z]" && o(17)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t, o) {
    var n = o(84),
        i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    })
}, function(e, t, o) {
    e.exports = o(104)
}, function(e, t, o) {
    var n = o(15),
        i = o(84).document,
        r = n(i) && n(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(e, t, o) {
    var n = o(15);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "scrollToY", function() {
        return a
    }), o.d(t, "scrollToTop", function() {
        return s
    }), o.d(t, "scrollGetX", function() {
        return c
    }), o.d(t, "scrollGetY", function() {
        return _
    }), o.d(t, "disableBodyScroll", function() {
        return l
    }), o.d(t, "enableBodyScroll", function() {
        return u
    }), o.d(t, "isBodyScrollEnabled", function() {
        return d
    });
    var n = o(109),
        i = o(28),
        r = o(32);

    function a(e, t, o, s) {
        if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), s || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(r.getSize)("page_header_cont")[1]))), Object(r.data)(bodyNode, "tween") && Object(r.data)(bodyNode, "tween").stop(!1), Object(r.data)(htmlNode, "tween") && Object(r.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var l = function() {
                window.scrollAnimation = !1, 2 === o && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(n.updSideTopLink)())
            };
            window.scrollAnimation = !0, Object(i.animate)(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: l
            }), Object(i.animate)(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: l
            })
        } else {
            if (o && 2 !== o) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var u = _() - e;
                return Math.abs(u) > 6 && a(e + (u > 0 ? 6 : -6), 0, 2, !0), Object(n.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(a.pbind(e, 100, 2, !0), 0))
            }
            window.scroll(c(), e), o || Object(n.updSideTopLink)()
        }
    }

    function s(e) {
        return a(0, e)
    }

    function c() {
        return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
    }

    function _() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }

    function l() {
        bodyNode.style.overflow = "hidden"
    }

    function u() {
        bodyNode.style.overflow = "auto"
    }

    function d() {
        return "hidden" !== bodyNode.style.overflow
    }
    window.scrollToY = a, window.scrollToTop = s, window.scrollGetX = c, window.scrollGetY = _, window.disableBodyScroll = l, window.enableBodyScroll = u
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, o) {
    var n = o(71),
        i = o(118)("toStringTag"),
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
    var n = o(84),
        i = o(34),
        r = o(77),
        a = o(103)("src"),
        s = Function.toString,
        c = ("" + s).split("toString");
    o(94).inspectSource = function(e) {
        return s.call(e)
    }, (e.exports = function(e, t, o, s) {
        var _ = "function" == typeof o;
        _ && (r(o, "name") || i(o, "name", t)), e[t] !== o && (_ && (r(o, a) || i(o, a, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : s ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || s.call(this)
    })
}, , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "toggleFlash", function() {
        return c
    }), o.d(t, "renderFlash", function() {
        return _
    });
    var n = o(37),
        i = o(32),
        r = o(132),
        a = o(95);
    ! function() {
        var e = "ShockwaveFlash.ShockwaveFlash",
            t = [0, 0, 0],
            o = "embed",
            i = 'type="application/x-shockwave-flash" ',
            r = function(e) {
                return e.toString().replace("&", "&amp;").replace('"', "&quot;")
            };
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            var s = navigator.plugins["Shockwave Flash"];
            if (s && s.description)
                for (var c = s.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), _ = 0; _ < 3; ++_) t[_] = c[_] || 0
        } else {
            if (_ua.indexOf("Windows CE") >= 0)
                for (var l = !0, u = 6; l;) try {
                    ++u, l = new ActiveXObject(e + "." + u), t[0] = u
                } catch (e) {} else try {
                    t = new ActiveXObject(e + ".7").GetVariable("$version").split(" ")[1].split(",")
                } catch (e) {}
            o = "object", i = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
        }
        browser.flashwrap = "embed" === o ? function(e, t) {
            t = extend({
                id: e.id,
                name: e.id,
                width: e.width,
                height: e.height,
                style: e.style,
                preventhide: e.preventhide
            }, t), browser.flash >= e.version ? t.src = e.url : t.src = e.express;
            var o = [];
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var a = t[n];
                    void 0 !== a && null !== a && o.push(n + '="' + r(a) + '" ')
                }
            return "<embed " + (i + o.join("")) + "/>"
        } : function(e, t) {
            browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
            var o = {
                    id: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                },
                n = [];
            for (var a in o)
                if (o.hasOwnProperty(a)) {
                    var s = o[a];
                    void 0 !== s && null !== s && n.push(a + '="' + r(s) + '" ')
                }
            var c = [];
            for (var _ in t)
                if (t.hasOwnProperty(_)) {
                    var l = t[_];
                    void 0 !== l && null !== l && c.push('<param name="' + _ + '" value="' + r(l) + '" />')
                }
            return "<object " + (i + n.join("")) + ">" + c.join("") + "</object>"
        }, t[0] < 7 && (t = [0, 0, 0]), browser.flash = Object(n.intval)(t[0]), browser.flashfull = {
            major: browser.flash,
            minor: Object(n.intval)(t[1]),
            rev: Object(n.intval)(t[2])
        }, Object(a.setCookie)("remixflash", Object(n.intval)(t[0]) + "." + Object(n.intval)(t[1]) + "." + Object(n.intval)(t[2]), 30)
    }();
    var s = 0;

    function c(e, t) {
        if (clearTimeout(s), t > 0) s = setTimeout(function() {
            return c(e, 0)
        }, t);
        else {
            var o = e ? "visible" : "hidden";
            Object(r.triggerEvent)(document, e ? "unblock" : "block");
            var a = function(t, n) {
                n.getAttribute("preventhide") || "internal/link" === n.getAttribute("type") || ("flash_app" === n.id && browser.msie ? e ? Object(i.setStyle)(n, {
                    position: "static",
                    top: 0
                }) : Object(i.setStyle)(n, {
                    position: "absolute",
                    top: "-5000px"
                }) : n.style.visibility = o)
            };
            Object(n.each)(Object(i.geByTag)("embed"), a), Object(n.each)(Object(i.geByTag)("object"), a)
        }
    }

    function _(e, t, o, i) {
        if (!t.url || !t.id) return !1;
        var r = (t = extend({
            version: 9,
            width: 1,
            height: 1
        }, t)).url;
        return stVersions[r] || (stVersions[r] = ""), __debugMode && stVersions[r] < 1e6 && (stVersions[r] += Object(n.irand)(1e6, 2e6)), stVersions[r] && (t.url += (-1 === t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[r]), o = extend({
            quality: "high",
            flashvars: ajx2q(i)
        }, o), !(browser.flash < t.version) && (ge(e).innerHTML = browser.flashwrap(t, o), !0)
    }
    window.toggleFlash = c, window.renderFlash = _
}, function(e, t, o) {
    'eat script';
    var n = o(84),
        i = o(69),
        r = o(135),
        a = o(118)("species");
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
    for (var n = o(35), i = o(17), r = o(84), a = o(34), s = o(42), c = o(118), _ = c("iterator"), l = c("toStringTag"), u = s.Array, d = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var f, h = d[p],
            w = r[h],
            b = w && w.prototype;
        if (b)
            for (f in b[_] || a(b, _, u), b[l] || a(b, l, h), s[h] = u, n) b[f] || i(b, f, n[f], !0)
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
    var n = o(13);
    e.exports = function(e, t, o, i) {
        try {
            return i ? t(n(o)[0], o[1]) : t(o)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && n(r.call(e)), t
        }
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "locBase", function() {
        return locBase
    }), __webpack_require__.d(__webpack_exports__, "ajx2q", function() {
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
    }), __webpack_require__.d(__webpack_exports__, "initAjax", function() {
        return initAjax
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7),
        locBase = location.toString().replace(/#.+$/, ""),
        decodeErors = {},
        iframeTransport = void 0,
        iframeTO = 0;

    function ajx2q(e, t) {
        var o = [],
            n = function(e) {
                if (decodeErors[e]) return e;
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
                    return decodeErors[e] = 1, e
                }
            };
        return e = e.split("&"), each(e, function(e, n) {
            var i = n.split("=");
            if (i[0]) {
                var r = o(i[1] + "");
                if ("[]" === i[0].substr(i.length - 2)) {
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
            if (iframeTransport) {
                var o = iframeTransport.parentNode;
                o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
            }
        },
        _receive: function _receive(cont, html, js, bench, params) {
            var container = cont && ge(cont);
            if (container && html && (container.firstChild ? container.appendChild(cf(html)) : val(container, html)), js) {
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
                    }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, scr)
                }
                bench && (ajax.tModule = cur.module)
            }
            params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
        },
        framedata: !1,
        _framenext: function() {
            if ((ajax.framedata || {}).length) {
                var e = ajax.framedata.shift();
                !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.lTimeout)(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
            }
        },
        framegot: function(e, t, o, n) {
            ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
        },
        framepost: function(e, t, o, n) {
            clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(ce("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + irand(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, r, a, s) {
            var c = ajax._getreq(),
                _ = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
            c.onreadystatechange = function() {
                4 === c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
            };
            try {
                c.open("POST", e, !0)
            } catch (e) {
                return !1
            }
            return r && each(r, function(e, t) {
                c[e] = t
            }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(_), c
        },
        post: function(e, t, o) {
            "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
            var n = extend({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = extend({
                    al: n.frame ? -1 : 1
                }, t),
                r = vkNow(),
                a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + a), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
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
            "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = clone(t);
            return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
        },
        _debugLog: function(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        },
        _parseRes: function(e, t) {
            for (var o = e.length - 1; o >= 0; --o) {
                var n = e[o];
                if ("<!" === n.substr(0, 2)) {
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
        _post: function _post(url, query, options) {
            !query.captcha_sid && options.showProgress && options.showProgress();
            var cacheKey = !1,
                statAct = void 0;
            window.__adsGetAjaxParams && extend(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
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
                    if (options.hideProgress && options.hideProgress(), options._suggest && cleanElems(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && inArray(vk.id, [100])) return ajax._post(url, query, options), !1;
                    options.onFail && !0 === options.onFail(e) || topError(e, {
                        dt: 5,
                        type: 3,
                        status: t.status,
                        url: url,
                        query: query && ajx2q(query, options.noSort)
                    })
                };
            options.local && (fail = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(fail)), options.stat && (statAct = !1, stManager.add(options.stat, function() {
                statAct && statAct(), options.stat = !1
            }));
            var _processResponse = function processResponse(code, answer) {
                if (options.cache) {
                    var answ = ajaxCache[cacheKey];
                    answ && answ._loading && (setTimeout(function() {
                        for (var e in answ._callbacks) answ._callbacks.hasOwnProperty(e) && answ._callbacks[e](code, answer)
                    }, 0), delete ajaxCache[cacheKey])
                }
                if (options.stat) return options.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && cleanElems(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                    case 1:
                        showFastBox({
                            width: 520,
                            title: answer[0],
                            onDestroy: options.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === intval(answer[1])) {
                            var resend = function(e) {
                                var t = extend(query, {
                                        recaptcha: e
                                    }),
                                    o = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, t, o)
                            };
                            options._captcha = showReCaptchaBox(answer[0], answer[2], options._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        } else {
                            var _resend = function(e, t) {
                                var o = extend(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    n = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, o, n)
                            };
                            options._captcha = showCaptchaBox(answer[0], intval(answer[1]), options._captcha, {
                                onSubmit: _resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        }
                        options._suggest = geByClass1("phone_validation_link", options._captcha.bodyNode), options._suggest && addEvent(options._suggest, "click", function() {
                            options._box = validateMobileBox({
                                onDone: options._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validateMobileBox({
                            acceptCaptcha: 11 === code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (options._captcha = curBox());
                                var o = e ? extend(query, {
                                    captcha_sid: e,
                                    captcha_key: t
                                }) : query;
                                ajax._post(url, o, newOptions)
                            },
                            onFail: options.onFail,
                            hash: answer[0],
                            ahash: answer[1]
                        });
                        break;
                    case 14:
                        var _newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, query, _newOptions),
                            onFail: options.onFail
                        });
                        break;
                    case 15:
                        var _newOptions2 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validatePassBox({
                            onDone: ajax._post.pbind(url, query, _newOptions2),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var _newOptions3 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
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
                            showProgress: options.showProgress,
                            hideProgress: options.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: intval(answer[0]),
                            from: 1,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 6:
                        var _newOptions4 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, query, _newOptions4),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        options.onFail && options.onFail(), topMsg(answer[0], 10);
                        break;
                    case 8:
                        if (options.onFail && options.onFail(answer[0])) return;
                        topError(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 9:
                        if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                        options._box = showFastBox({
                            title: trim(answer[0])
                        }, answer[1]);
                        var _newOptions5 = extend(clone(options), {
                            showProgress: options._box.showProgress,
                            hideProgress: options._box.hideProgress
                        });
                        options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                            isVisible(options._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, extend(query, e), _newOptions5))
                        }, options.onFail), options._box.evalBox(answer[2]);
                        break;
                    case 10:
                        options._box = showFastBox({
                            title: answer[0] || getLang("global_charged_zone_title"),
                            onHide: options.onFail
                        }, answer[1], getLang("global_charged_zone_continue"), function() {
                            var e = extend(query, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, options)
                        }, getLang("global_cancel"));
                        break;
                    case 13:
                        var evalString = "(function(){" + answer[0] + ";})()";
                        if (__debugMode) eval(evalString);
                        else try {
                            eval(evalString)
                        } catch (e) {
                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, evalString)
                        }
                        break;
                    default:
                        if (-1 === code || -2 === code || -3 === code) {
                            var adsShowed = answer.pop(),
                                adsCanShow = answer.pop(),
                                adsHtml = answer.pop(),
                                adsProps = void 0; - 3 === code && (adsProps = answer.pop()), window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps)
                        }
                        options.onDone && options.onDone.apply(window, answer)
                }
                window.LazyLoad && LazyLoad.scanDelayed()
            };
            options.local && (_processResponse = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(_processResponse));
            var done = function(e, t) {
                options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), trim(e).length || (t = [8, getLang("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var o = e.split("<!>"),
                    n = clone(o);
                each(n, function(e, t) {
                    return n[e] = t.substr(0, 100)
                }), ajax.lastResp = n.join("<!>");
                var i = intval(o.shift());
                if (!i) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version !== i) i && o.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: query && ajx2q(query)
                }) : nav.strLoc ? location.replace(locBase) : topError("Server error.", {
                    type: 100
                });
                else {
                    vk.version = !1;
                    var r = o.shift(),
                        a = intval(o.shift()),
                        s = intval(o.shift());
                    options.frame && (o = t);
                    var c = intval(o.shift());
                    if (vk.lang !== a && options.canReload) nav.reload({
                        force: !0,
                        from: 3,
                        url: url,
                        query: query && ajx2q(query)
                    });
                    else {
                        var _ = function() {
                            var e = ["common.css"];
                            if (r)
                                for (var t = 0, n = (r = r.split(",")).length; t < n; ++t) e.push(r[t]);
                            if (stVersions.lang < s)
                                for (var i in stVersions.lang = s, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                            if (!options.frame) try {
                                ajax._parseRes(o, options._reqid)
                            } catch (e) {
                                topError("<b>JSON Error:</b> " + e.message, {
                                    type: 5,
                                    answer: o.join("<!>"),
                                    url: url,
                                    query: query && ajx2q(query)
                                })
                            }
                            stManager.add(e, _processResponse.pbind(c, o))
                        };
                        if (window.stVersions) {
                            if (i === stVersions.nav) return _();
                            headNode.appendChild(ce("script", {
                                type: "text/javascript",
                                src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                            })), setTimeout(function e() {
                                if (i === stVersions.nav) return _();
                                setTimeout(e, 100)
                            }, 0)
                        }
                    }
                }
            };
            if (options.local && (done = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(done)), options.cache > 0 || options.forceGlobalCache) {
                var answer = ajaxCache[cacheKey];
                if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                if (answer && !options.forceGlobalCache) return _processResponse(0, answer), void(3 === options.cache && delete ajaxCache[cacheKey]);
                if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || isFunction(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
            }
            ajaxCache[cacheKey] = {
                _loading: 1,
                _callbacks: []
            }, window.debuglogSent ? (options._reqid = debuglogSent(url + (query ? ": " + ajx2q(query, options.noSort).replace(/&/g, "&amp;") : "")), options.frame && (window._lfrid = options._reqid)) : options._reqid = 0;
            var xhrOptions = {};
            return options.timeout && (xhrOptions.timeout = options.timeout), options.frame ? ajax.framepost(url, query, done, options) : ajax.plainpost(url, query, done, fail, !1, xhrOptions, options)
        },
        tGetParam: function() {
            if (ajax.tStart && ajax.tModule) {
                var e = [ajax.tDone - ajax.tStart, ajax.tProcess - ajax.tDone, ajax.tRender - ajax.tProcess, ajax.tOver - ajax.tStart, ajax.tModule];
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        if (e[t] < 0) return !1;
                        if (!e[t] && 0 !== e[t]) return !1
                    }
                return ajax.tStart = !1, e.join(",")
            }
        }
    };

    function initAjax() {
        window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = ajax
    }
    window.ajx2q = ajx2q, window.q2ajx = q2ajx, window.requestBox = requestBox, window.activateMobileBox = activateMobileBox, window.validateMobileBox = validateMobileBox, window.validatePassBox = validatePassBox, window.photoCaptchaBox = photoCaptchaBox
}, function(e, t, o) {
    (function(n, i) {
        var r;
        (function() {
            'eat script';

            function a(e) {
                return "function" == typeof e
            }
            var s, c, _ = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                l = 0,
                u = function(e, t) {
                    E[l] = e, E[l + 1] = t, 2 === (l += 2) && (c ? c(k) : v())
                };
            var d = "undefined" != typeof window ? window : void 0,
                p = d || {},
                f = p.MutationObserver || p.WebKitMutationObserver,
                h = void 0 !== n && "[object process]" === {}.toString.call(n),
                w = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function b() {
                return function() {
                    setTimeout(k, 1)
                }
            }
            var v, g, m, O, y, E = new Array(1e3);

            function k() {
                for (var e = 0; e < l; e += 2) {
                    (0, E[e])(E[e + 1]), E[e] = void 0, E[e + 1] = void 0
                }
                l = 0
            }
            h ? v = function() {
                n.nextTick(k)
            } : f ? (m = 0, O = new f(k), y = document.createTextNode(""), O.observe(y, {
                characterData: !0
            }), v = function() {
                y.data = m = ++m % 2
            }) : w ? ((g = new MessageChannel).port1.onmessage = k, v = function() {
                g.port2.postMessage(0)
            }) : v = void 0 === d ? function() {
                try {
                    var e = o(130);
                    return s = e.runOnLoop || e.runOnContext,
                        function() {
                            s(k)
                        }
                } catch (e) {
                    return b()
                }
            }() : b();
            var j = function(e, t) {
                var o = this._state;
                if (o === T && !e || o === M && !t) return this;
                var n = new this.constructor(P),
                    i = this._result;
                if (o) {
                    var r = arguments[o - 1];
                    u(function() {
                        q(o, n, r, i)
                    })
                } else W(this, n, e, t);
                return n
            };
            var C = function(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(P);
                return A(t, e), t
            };

            function P() {}
            var x = void 0,
                T = 1,
                M = 2,
                L = new U;

            function D(e) {
                try {
                    return e.then
                } catch (e) {
                    return L.error = e, L
                }
            }

            function B(e, t, o) {
                t.constructor === e.constructor && o === j && constructor.resolve === C ? function(e, t) {
                    t._state === T ? I(e, t._result) : t._state === M ? R(e, t._result) : W(t, void 0, function(t) {
                        A(e, t)
                    }, function(t) {
                        R(e, t)
                    })
                }(e, t) : o === L ? R(e, L.error) : void 0 === o ? I(e, t) : a(o) ? function(e, t, o) {
                    u(function(e) {
                        var n = !1,
                            i = function(e, t, o, n) {
                                try {
                                    e.call(t, o, n)
                                } catch (e) {
                                    return e
                                }
                            }(o, t, function(o) {
                                n || (n = !0, t !== o ? A(e, o) : I(e, o))
                            }, function(t) {
                                n || (n = !0, R(e, t))
                            }, e._label);
                        !n && i && (n = !0, R(e, i))
                    }, e)
                }(e, t, o) : I(e, t)
            }

            function A(e, t) {
                var o;
                e === t ? R(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(o = t) || "object" == typeof o && null !== o ? B(e, t, D(t)) : I(e, t)
            }

            function S(e) {
                e._onerror && e._onerror(e._result), N(e)
            }

            function I(e, t) {
                e._state === x && (e._result = t, e._state = T, 0 !== e._subscribers.length && u(N, e))
            }

            function R(e, t) {
                e._state === x && (e._state = M, e._result = t, u(S, e))
            }

            function W(e, t, o, n) {
                var i = e._subscribers,
                    r = i.length;
                e._onerror = null, i[r] = t, i[r + T] = o, i[r + M] = n, 0 === r && e._state && u(N, e)
            }

            function N(e) {
                var t = e._subscribers,
                    o = e._state;
                if (0 !== t.length) {
                    for (var n, i, r = e._result, a = 0; a < t.length; a += 3) n = t[a], i = t[a + o], n ? q(o, n, i, r) : i(r);
                    e._subscribers.length = 0
                }
            }

            function U() {
                this.error = null
            }
            var K = new U;

            function q(e, t, o, n) {
                var i, r, s, c, _ = a(o);
                if (_) {
                    if ((i = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return K.error = e, K
                            }
                        }(o, n)) === K ? (c = !0, r = i.error, i = null) : s = !0, t === i) return void R(t, new TypeError("A promises callback cannot return that same promise."))
                } else i = n, s = !0;
                t._state !== x || (_ && s ? A(t, i) : c ? R(t, r) : e === T ? I(t, i) : e === M && R(t, i))
            }
            var F = function(e) {
                return new X(this, e).promise
            };
            var H = function(e) {
                var t = new this(P);
                if (!_(e)) return R(t, new TypeError("You must pass an array to race.")), t;
                var o = e.length;

                function n(e) {
                    A(t, e)
                }

                function i(e) {
                    R(t, e)
                }
                for (var r = 0; t._state === x && r < o; r++) W(this.resolve(e[r]), void 0, n, i);
                return t
            };
            var V = function(e) {
                    var t = new this(P);
                    return R(t, e), t
                },
                z = 0;
            var G = Y;

            function Y(e) {
                this._id = z++, this._state = void 0, this._result = void 0, this._subscribers = [], P !== e && ("function" != typeof e && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof Y ? function(e, t) {
                    try {
                        t(function(t) {
                            A(e, t)
                        }, function(t) {
                            R(e, t)
                        })
                    } catch (t) {
                        R(e, t)
                    }
                }(this, e) : function() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }())
            }
            Y.all = F, Y.race = H, Y.resolve = C, Y.reject = V, Y._setScheduler = function(e) {
                c = e
            }, Y._setAsap = function(e) {
                u = e
            }, Y._asap = u, Y.prototype = {
                constructor: Y,
                then: j,
                catch: function(e) {
                    return this.then(null, e)
                }
            };
            var X = $;

            function $(e, t) {
                this._instanceConstructor = e, this.promise = new e(P), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? I(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && I(this.promise, this._result))) : R(this.promise, this._validationError())
            }
            $.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, $.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, o = 0; this._state === x && o < e; o++) this._eachEntry(t[o], o)
            }, $.prototype._eachEntry = function(e, t) {
                var o = this._instanceConstructor,
                    n = o.resolve;
                if (n === C) {
                    var i = D(e);
                    if (i === j && e._state !== x) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                    else if (o === G) {
                        var r = new o(P);
                        B(r, e, i), this._willSettleAt(r, t)
                    } else this._willSettleAt(new o(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(n(e), t)
            }, $.prototype._settledAt = function(e, t, o) {
                var n = this.promise;
                n._state === x && (this._remaining--, e === M ? R(n, o) : this._result[t] = o), 0 === this._remaining && I(n, this._result)
            }, $.prototype._willSettleAt = function(e, t) {
                var o = this;
                W(e, void 0, function(e) {
                    o._settledAt(T, t, e)
                }, function(e) {
                    o._settledAt(M, t, e)
                })
            };
            var Z = function() {
                    var e;
                    if (void 0 !== i) e = i;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var t = e.Promise;
                    t && "[object Promise]" === Object.prototype.toString.call(t.resolve()) && !t.cast || (e.Promise = G)
                },
                Q = {
                    Promise: G,
                    polyfill: Z
                };
            void 0 === (r = function() {
                return Q
            }.call(t, o, t, e)) || (e.exports = r), Z()
        }).call(this)
    }).call(this, o(33), o(72))
}, function(e, t) {
    var o = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
    }
}, , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "animate", function() {
        return a
    }), o.d(t, "cubicBezier", function() {
        return s
    }), o.d(t, "fadeTo", function() {
        return c
    }), o.d(t, "FxBase", function() {
        return _
    }), o.d(t, "Fx", function() {
        return l
    }), o.d(t, "genFx", function() {
        return u
    }), o.d(t, "slideDown", function() {
        return d
    }), o.d(t, "slideUp", function() {
        return p
    }), o.d(t, "slideToggle", function() {
        return f
    }), o.d(t, "fadeIn", function() {
        return h
    }), o.d(t, "fadeOut", function() {
        return w
    }), o.d(t, "fadeToggle", function() {
        return b
    }), o.d(t, "getRGB", function() {
        return v
    }), o.d(t, "getColor", function() {
        return g
    }), o.d(t, "animateCount", function() {
        return m
    });
    var n = o(37),
        i = o(32),
        r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function a(e, t, o, a) {
        if (e = Object(i.ge)(e)) {
            var s = Object(n.isFunction)(a) ? a : function() {},
                c = Object(n.extend)({}, "object" === (void 0 === o ? "undefined" : r(o)) ? o : {
                    duration: o,
                    onComplete: s
                }),
                l = {},
                u = {},
                d = Object(i.isVisible)(e),
                p = void 0;
            c.orig = {}, (t = Object(n.clone)(t)).discrete && (c.discrete = 1, delete t.discrete), browser.iphone && (c.duration = 0);
            var f = Object(i.data)(e, "tween"),
                h = d ? "hide" : "show";
            for (var w in f && f.isTweening && (c.orig = Object(n.extend)(c.orig, f.options.orig), f.stop(!1), f.options.show ? h = "hide" : f.options.hide && (h = "show")), t)
                if (t.hasOwnProperty(w)) {
                    if (!f && ("show" === t[w] && d || "hide" === t[w] && !d)) return c.onComplete.call(this, e);
                    if ("height" !== w && "width" !== w || !e.style || (t.overflow || (void 0 === c.orig.overflow && (c.orig.overflow = Object(i.getStyle)(e, "overflow")), e.style.overflow = "hidden"), Object(i.hasClass)(e, "inl_bl") || "TD" === e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[w]))
                        if ("toggle" === t[w] && (t[w] = h), "show" === t[w]) {
                            p = 0, c.show = !0, void 0 === c.orig[w] && (c.orig[w] = Object(i.getStyle)(e, w, !1) || "", Object(i.setStyle)(e, w, 0));
                            var b = e.style[w];
                            e.style[w] = c.orig[w], t[w] = parseFloat(Object(i.getStyle)(e, w, !0)), e.style[w] = b, "height" === w && browser.msie && !t.overflow && (e.style.overflow = "hidden")
                        } else void 0 === c.orig[w] && (c.orig[w] = Object(i.getStyle)(e, w, !1) || ""), c.hide = !0, t[w] = 0
                }
            return c.show && !d && Object(i.show)(e), f = new _(e, c), Object(n.each)(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    if (p = g(e, "borderColor" === t ? "borderTopColor" : t), o = v(o), void 0 === p) return
                } else {
                    var r = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    r && (o = parseFloat(r[2]), r[1] && (o = ("-=" == r[1] ? -1 : 1) * o + o)), 0 != (p = f.cur(t, !0)) || "width" !== t && "height" !== t || (p = 1), "opacity" === t && o > 0 && !d && (Object(i.setStyle)(e, "opacity", 0), p = 0, Object(i.show)(e))
                }(p != o || Object(n.isArray)(p) && p.join(",") === o.join(",")) && (l[t] = p, u[t] = o)
            }), f.start(l, u), Object(i.data)(e, "tween", f), f
        }
    }

    function s(e, t, o, n, i, r) {
        var a = function(t) {
                var n = 1 - t;
                return 3 * n * n * t * e + 3 * n * t * t * o + t * t * t
            },
            s = function(e) {
                var o = 1 - e;
                return 3 * o * o * e * t + 3 * o * e * e * n + e * e * e
            },
            c = function(t) {
                var n = 1 - t;
                return 3 * (2 * (t - 1) * t + n * n) * e + 3 * (-t * t * t + 2 * n * t) * o
            },
            _ = i,
            l = void 0,
            u = void 0;
        for (l = _, u = 0; u < 8; u++) {
            var d = a(l) - _;
            if (Math.abs(d) < r) return s(l);
            var p = c(l);
            if (Math.abs(p) < 1e-6) break;
            l -= d / p
        }
        var f = 0,
            h = 1;
        if ((l = _) < f) return s(f);
        if (l > h) return s(h);
        for (; f < h;) {
            var w = a(l);
            if (Math.abs(w - _) < r) return s(l);
            _ > w ? f = l : h = l, l = .5 * (h - f) + f
        }
        return s(l)
    }

    function c(e, t, o, n) {
        return a(e, {
            opacity: o
        }, t, n)
    }
    var _ = function() {
            function e(t, o, r) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.el = Object(i.ge)(t), this.name = r, this.options = Object(n.extend)({
                    onStep: function() {},
                    onComplete: function() {},
                    transition: o.transition || l.Transitions.sineInOut,
                    duration: 500
                }, o || {})
            }
            return e.prototype.start = function(e, t) {
                var o = this;
                this.from = e, this.to = t, this.time = Object(n.vkNow)(), this.isTweening = !0;
                var i = function(e) {
                    return o.step(e)
                };
                return i.el = this.el, i() && l.Timers.push(i) && !l.TimerId && (l.TimerId = setInterval(function() {
                    for (var e = l.Timers, t = e.length, o = 0; o < t; o++) e[o]() || (e.splice(o--, 1), t--);
                    t || (clearInterval(l.TimerId), l.TimerId = null)
                }, 13)), this
            }, e.prototype.stop = function(e) {
                for (var t = l.Timers, o = t.length - 1; o >= 0; o--) t[o].el === this.el && (e && t[o](!0), t.splice(o, 1));
                this.isTweening = !1
            }, e.prototype.step = function(e) {
                var t = Object(n.vkNow)();
                if (!e && t < this.time + this.options.duration) {
                    for (var o in this.cTime = t - this.time, this.now = {}, this.to)
                        if (Object(n.isArray)(this.to[o])) {
                            for (var r = [], a = 0; a < 3; a++) {
                                if (void 0 === this.from[o] || void 0 === this.to[o]) return !1;
                                r.push(Math.min(parseInt(this.compute(this.from[o][a], this.to[o][a])), 255))
                            }
                            this.now[o] = r
                        } else this.now[o] = this.compute(this.from[o], this.to[o]), this.options.discrete && (this.now[o] = Object(n.intval)(this.now[o]));
                    return this.update(), !0
                }
                return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = Object(n.extend)(this.to, this.options.orig), this.update(), this.options.hide && Object(i.hide)(this.el), this.isTweening = !1, !1
            }, e.prototype.compute = function(e, t) {
                var o = t - e;
                return this.options.transition(this.cTime, e, o, this.options.duration)
            }, e.prototype.update = function() {
                for (var e in this.options.onStep(this.now), this.now) Object(n.isArray)(this.now[e]) ? Object(i.setStyle)(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 !== this.el[e] ? this.el[e] = this.now[e] : Object(i.setStyle)(this.el, e, this.now[e])
            }, e.prototype.cur = function(e, t) {
                return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(Object(i.getStyle)(this.el, e, t)) || 0 : this.el[e]
            }, e
        }(),
        l = {
            Base: _,
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
                    return o * s(.4, 0, .22, 1, e / n, 4 / n) + t
                }
            },
            Attrs: [
                ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                ["opacity", "left", "top"]
            ],
            Timers: [],
            TimerId: null
        };

    function u(e, t) {
        var o = {};
        return Object(n.each)(l.Attrs.concat.apply([], l.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }
    var d = function(e, t, o) {
            return a(e, u("show", 1), t, o)
        },
        p = function(e, t, o) {
            return a(e, u("hide", 1), t, o)
        },
        f = function(e, t, o) {
            return a(e, u("toggle", 1), t, o)
        },
        h = function(e, t, o) {
            return a(e, {
                opacity: "show"
            }, t, o)
        },
        w = function(e, t, o) {
            return a(e, {
                opacity: "hide"
            }, t, o)
        },
        b = function(e, t, o) {
            return a(e, {
                opacity: "toggle"
            }, t, o)
        };

    function v(e) {
        var t = void 0;
        return e && Object(n.isArray)(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function g(e, t) {
        var o = void 0;
        do {
            if (0 === (o = Object(i.getStyle)(e, t)).indexOf("rgba") && (o = ""), "" != o && "transparent" !== o || "body" === e.nodeName.toLowerCase()) break;
            t = "backgroundColor", e = e.parentNode
        } while (e);
        return v(o)
    }

    function m(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e = Object(i.ge)(e), t = o.str ? Object(n.trim)(t.toString()) || "" : Object(n.positive)(t), e)
            if (!browser.mobile || browser.safari_mobile || browser.android) {
                var r = Object(i.data)(e, "curCount"),
                    s = Object(i.data)(e, "nextCount");
                if ("number" == typeof s || o.str && "string" == typeof s) t != s && Object(i.data)(e, "nextCount", t);
                else if ("number" == typeof r || o.str && "string" == typeof r) t !== r && Object(i.data)(e, "nextCount", t);
                else if (r = o.str ? Object(n.trim)(val(e).toString()) || "" : Object(n.positive)(val(e)), "auto" === o.str && (o.str = !r.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (r = Object(n.positive)(r), t = Object(n.positive)(t))), r !== t) {
                    Object(i.data)(e, "curCount", t);
                    var c, _ = o.str ? r.length === t.length ? r < t : r.length < t.length : r < t,
                        u = (_ ? t : r).toString(),
                        d = (_ ? r : t).toString(),
                        p = void 0,
                        f = [],
                        h = [];
                    for (o.str || (d = new Array(u.length - d.length + 1).join("0") + d), p = 0, c = u.length; p < c; p++) {
                        var w = u.charAt(p);
                        if (w !== d.charAt(p)) break;
                        f.push(w)
                    }
                    var b = u.substr(p),
                        v = d.substr(p);
                    if (o.str) {
                        for (p = b.length; p > 0; p--) {
                            var g = b.charAt(p);
                            if (g !== v.charAt(p)) break;
                            h.unshift(g)
                        }
                        h.length && (b = b.substr(0, p + 1), v = v.substr(0, p + 1))
                    }
                    f = f.join("").replace(/\s$/, "&nbsp;"), h = h.join("").replace(/^\s/, "&nbsp;"), Object(n.trim)(val(e)) || o.noSpaceIfEmpty || val(e, "&nbsp;");
                    var O = e.clientHeight || e.offsetHeight;
                    val(e, '<div class="counter_wrap inl_bl"></div>');
                    var y, E = e.firstChild,
                        k = void 0,
                        j = void 0,
                        C = void 0,
                        P = !0;
                    f.length && E.appendChild(k = Object(i.ce)("div", {
                        className: "counter_const inl_bl",
                        innerHTML: f
                    })), f.length || (v = v.replace(/^0+/, "")), v && ("0" !== v || f.length) || (v = o.noSpaceIfEmpty ? "" : "&nbsp;", P = !!f.length), E.appendChild(C = Object(i.ce)("div", {
                        className: "counter_anim_wrap inl_bl"
                    })), C.appendChild(y = Object(i.ce)("div", {
                        className: "counter_anim " + (_ ? "counter_anim_inc" : "counter_anim_dec"),
                        innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + b + "</span></div>" + (P ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + v + "</span></div>" : "")
                    }, P ? {
                        marginTop: _ ? -O : 0
                    } : {
                        right: 0
                    })), o.str && Object(i.setStyle)(y, {
                        textAlign: "right",
                        right: 0
                    });
                    var x = Object(i.getSize)(geByClass1("counter_anim_big_c", y, "span"))[0],
                        T = P ? "&nbsp;" === v ? x : Object(i.getSize)(geByClass1("counter_anim_small_c", y, "span"))[0] : 0;
                    !v && o.noSpaceIfEmpty && (T = 0), h.length && E.appendChild(j = Object(i.ce)("div", {
                        className: "counter_const inl_bl",
                        innerHTML: h
                    })), o.noWrapWidth || Object(i.setStyle)(E, {
                        width: (k && Object(i.getSize)(k)[0] || 0) + (j && Object(i.getSize)(j)[0] || 0) + x + 0
                    }), void 0 === browser.csstransitions && (browser.csstransitions = browser.chrome && browser.version >= 9 || browser.mozilla && browser.version >= 4 || browser.opera && browser.version >= 10.5 || browser.safari && browser.version >= 3.2 || browser.safari_mobile || browser.android);
                    var M = browser.csstransitions;
                    Object(i.setStyle)(C, {
                        width: _ ? T : x
                    });
                    var L = function() {
                            val(e, t || (o.noSpaceIfEmpty ? "" : " "));
                            var n = Object(i.data)(e, "nextCount");
                            Object(i.data)(e, "curCount", !1), Object(i.data)(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(m.pbind(e, n, o), 0), o.onDone && o.onDone()
                        },
                        D = P ? {
                            marginTop: _ ? 0 : -O
                        } : {
                            marginRight: _ ? -T : 0
                        };
                    M ? (Object(i.getStyle)(C, "width"), addClass(C, "counter_css_anim_wrap"), x !== T && Object(i.setStyle)(C, {
                        width: _ ? x : T
                    }), P && Object(i.setStyle)(y, D), setTimeout(L, 300), o.fadeMode && (Object(i.setStyle)(geByClass1("counter_anim_big", e), "opacity", 1), Object(i.setStyle)(geByClass1("counter_anim_small", e), "opacity", 0))) : (x !== T && a(C, {
                        width: _ ? x : T
                    }, {
                        duration: 100
                    }), P ? a(y, D, {
                        duration: 300,
                        transition: l.Transitions.easeOutCirc,
                        onComplete: L
                    }) : setTimeout(L, 300))
                }
            } else val(e, t || "")
    }
}, , function(e, t, o) {
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
        }, 1e3), stManager.add(["stories.js", "stories.css", jsc("web/emoji.js")], function() {
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
    'eat script';
    o.r(t), o.d(t, "topHeaderClose", function() {
        return r
    }), o.d(t, "topHeaderClearClose", function() {
        return a
    });
    var n = o(132),
        i = function() {
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
        }();

    function r(e) {
        window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
    }

    function a() {
        delete window.headerDestroy
    }
    var s = {
        cache: {},
        lists: {},
        maxItems: 8,
        init: function() {
            if (this.inited) return !1;
            var e = ge("ts_input"),
                t = ge("ts_cont_wrap");
            if (vk.id && Chat.init(), !e) return !1;
            addEvent(e, "focus", function() {
                s.deselect(), trim(val(this)) && addClass(t.firstChild, "active"), s.toggleInput(!0)
            }), addEvent(e, "keydown", function(o) {
                switch (o.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        s.moveSelection(o.keyCode), cancelEvent(o);
                        break;
                    case KEY.ENTER:
                        var n = geByClass1("active", t);
                        if (n) s.select(n, o);
                        else {
                            var i = trim(val(this));
                            i && (e.blur(), s.clear(), s.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(i)))
                        }
                        cancelEvent(o);
                        break;
                    case KEY.TAB:
                        s.clear(), s.toggleInput(!1), cancelStackFilter("top_search", !0)
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
                        s.prepareRows(trim(val(this)))
                }
            }), addEvent(e, "paste", function() {
                setTimeout(function() {
                    s.prepareRows(trim(val(e)))
                }, 10)
            }), addEvent(document, "mousedown", function(e) {
                Object(n.checkKeyboardEvent)(e) || domClosest("_audio_page_layout", e.target) || domClosest("_ap_layer__close", e.target) || domClosest("layer_wrap", e.target) || r()
            }), this.inited = !0)
        },
        clear: function() {
            window.tooltips && tooltips.destroyAll(ge("ts_cont_wrap"));
            var e = ge("ts_input");
            e && e.phonblur && (val(e, ""), e.blur(), e.phonblur(), this.prepareRows())
        },
        select: function(e, t, o) {
            if (checkEvent(t)) return !0;
            var n = ge("ts_input"),
                i = trim(val(n)).length,
                a = e.getAttribute("hinttype");
            if (this.clear(), r(), i || n.blur(), o && hasClass(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: "chat_box"
            }), this.writeBox(o), !1;
            var s = nav.go(e, t);
            return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: a
            }), s
        },
        deselect: function() {
            var e = ge("ts_cont_wrap");
            each(geByClass("active", e), function(e, t) {
                return removeClass(t, "active")
            })
        },
        itemOver: function(e, t, o) {
            1 === t && s.deselect();
            var n = inArray(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
            toggleClass(e, "write", n), toggleClass(e, "active", t)
        },
        moveSelection: function(e) {
            var t = ge("ts_cont_wrap"),
                o = geByClass1("active", t),
                n = void 0;
            switch (e) {
                case KEY.UP:
                    n = !!o && (this.getNextNode(o, -1, "a") || o);
                    break;
                case KEY.DOWN:
                    n = o ? this.getNextNode(o, 1, "a") || o : t.firstChild
            }
            return this.deselect(), n && addClass(n, "active"), !1
        },
        getNextNode: function(e, t, o) {
            for (var n = e, i = domPN(e);;) {
                if ((n = t > 0 ? domNS(n) : domPS(n)) || (n = t > 0 ? domFC(i) : domLC(i)), o && n.tagName && n.tagName.toLowerCase() === o || !o && n) return n;
                if (n === e) return !1
            }
        },
        toggleInput: function(e) {
            e = !!e;
            var t = ge("ts_cont_wrap");
            isVisible(t) !== e && (toggle("ts_cont_wrap", e), e && cancelStackPush("top_search", function() {
                var e = ge("ts_input");
                s.toggleInput(!1), e.blur()
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
            if (s.friendsLoaded) return !1;
            if (cur.initingFL || vk.isBanned || !vk.id) return !1;
            var e = function() {
                    if (s.friendsLoaded) return !1;
                    cur.initingFL = !0, ajax.post("al_search.php", {
                        act: "get_pages"
                    }, {
                        cache: 1,
                        onDone: function(e) {
                            delete cur.initingFL, s.friendsLoaded || (each(e, function(e, t) {
                                s.lists[e] = t, "onlines" !== e && s.updateCache(e)
                            }), s.friendsLoaded = !0, val("ts_input") || s.prepareRows(""))
                        },
                        onFail: function() {
                            delete cur.initingFL
                        }
                    })
                },
                t = s.getList("friends");
            isEmpty(t) ? (cur.initingFL = !0, ajax.post("al_search.php", {
                act: "get_top_friends"
            }, {
                cache: 1,
                onDone: function(t) {
                    delete cur.initingFL, s.topFriends = t, s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e()
                },
                onFail: function() {
                    delete cur.initingFL
                }
            })) : (s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e())
        },
        getSimilarQueries: function(e) {
            var t = [e = e.toLowerCase()],
                o = void 0;
            return (o = parseLatin(e)) && t.push(o), (o = parseLatKeys(e)) && t.push(o), (o = parseCyr(e)) && t.push(o), t
        },
        searchCache: function(e, t) {
            var o = this,
                n = s.getList(e);
            if (!t) return !1;
            var i = this.getSimilarQueries(t);
            if (void 0 !== this.cache[e][t]) return i;
            var r = this.cache[e][t] = {};
            each(i, function(t, i) {
                var a = o.cache[e][" " + i.charAt(0).toLowerCase()];
                if (a) {
                    var s = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + escapeRE(i), "gi");
                    each(a, function(e) {
                        var t = n[e + "_"];
                        if (!isArray(t)) return !0;
                        null !== t[0].match(s) && (r[e] = 1)
                    })
                }
            });
            var a = 0;
            return each(r, function() {
                return a++
            }), r._num = a, i
        },
        updateCache: function(e, t, o) {
            var n = this,
                i = t || this.getList(e);
            this.cache[e] = o && this.cache[e] || {}, each(i, function(t, o) {
                var i = o[0],
                    r = intval(t),
                    a = i.split(/[\s\-\(\)\.,;|:]+/);
                each(a, function(t, o) {
                    var i = " " + o.charAt(0).toLowerCase();
                    n.cache[e][i] = n.cache[e][i] || {}, n.cache[e][i][r] = 1
                })
            })
        },
        listSearch: function(e, t, o, n) {
            var i = [],
                r = {};
            return t ? (s.searchCache(e, t), r = s.cache[e] && s.cache[e][t] || {}) : each(s.getList(e), function(e) {
                var t = intval(e);
                r[t] = 1
            }), each(s.getList(e), function(e) {
                var t = intval(e),
                    a = r[t];
                if ((!n || !n[t]) && a) return !!o-- && void i.push([t, this])
            }), i
        },
        row: function(e, t, o, n, i, r, a, s, c) {
            var _ = 0;
            if (r && (n = n.replace(r, '$1<em class="ts_clist_hl">$2</em>')), inArray(a, ["h_friends", "h_correspondents", "h_chats"]) && (_ = e), s || (s = ""), c = intval(c)) {
                var l = "";
                1 & c && (l += "page_verified "), 2 & c && (l += "page_top_author "), -128932034 === e ? l += "ph_verified " : -29246653 === e && (l += "pg_verified "), c = '<div class="' + l + '" onmouseover="pageVerifiedTip(this, {type: ' + c + ", oid: " + e + '})"></div>'
            } else c = "";
            return '\n<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + _ + ');" onmousedown="event.cancelBubble = true;"\n      onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + a + '">\n  <span class="ts_contact_photo ' + onlinePlatformClass(i) + '">\n    <img class="ts_contact_img" src="' + o + '"/>\n  </span>\n  <span class="ts_contact_name fl_l">\n    <div class="ts_contact_title_wrap' + (c ? " is_verified" : "") + '">\n      <span class="ts_contact_title">' + n + "</span>\n    </div>\n    " + c + '\n    <div class="ts_contact_info">' + s + '</div>\n  </span>\n  <div class="ts_contact_status"></div>\n</a>'
        },
        searchLists: function(e) {
            return e ? {
                friends: {
                    order: 0,
                    count: s.maxItems - 1,
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
                    count: s.maxItems - 1,
                    label: getLang("global_chats")
                },
                search: {
                    order: 4,
                    count: s.maxItems - 1,
                    label: getLang("head_search_results")
                }
            } : {
                friends: {
                    order: 0,
                    count: s.maxItems,
                    label: getLang("global_friends")
                }
            }
        },
        initListsHtml: function() {
            s.listsHtml = []
        },
        addToListsHtml: function(e, t, o) {
            var n = s.searchLists(o),
                i = n[(n[e] || {}).parent || e] || {},
                r = i.order || 0,
                a = i.label || "";
            s.listsHtml[r] = s.listsHtml[r] || (o && a ? ['<div class="ts_search_sep">' + a + "</div>"] : []), s.listsHtml[r].push(t)
        },
        htmlRows: function(e) {
            var t = "",
                o = s.listsHtml.map(function(e) {
                    return e.join("")
                });
            if (e) {
                var n = "#" === e[0] ? "statuses" : "auto",
                    i = "#" === e[0] ? getLang("global_news_search_results") : getLang("global_show_all_results");
                t += '\n<a href="/search?c[section]=' + n + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link"\n    onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"\n    onmouseout="TopSearch.itemOver(this, 0, event);" >\n  <span class="ts_contact_name fl_l">' + i + '</span>\n  <div class="ts_contact_status "></div>\n</a>'
            }
            return t + o.join("")
        },
        prepareRows: function(e) {
            var t = s.maxItems,
                o = ge("ts_cont_wrap");
            if (!o || !vk.id) return !1;
            if (cur.tsStr && cur.tsStr === e && !s.forceUpdate) return !1;
            delete s.forceUpdate, s.initListsHtml();
            var n = {};
            if (e) {
                var r = [];
                each(this.getSimilarQueries(e), function() {
                    r.push(escapeRE(this))
                }), cur.lastRe = new RegExp("([ -]|^|s|&nbsp;|\b)(" + r.join("|") + ")", "gi"), t--
            }
            each(s.searchLists(e), function(o, r) {
                if (s.cache[o]) {
                    var a = r.count,
                        c = s.listSearch(o, e, a, n),
                        _ = [],
                        l = 0;
                    isEmpty(c) || (each(c, function(e, o) {
                        if (!t || l >= a) return !1;
                        _.push(o), t--, l++
                    }), _.length && each(_, function(t, r) {
                        var a = r[1],
                            c = intval(r[0]),
                            _ = c > 0 && s.onlines()[c],
                            l = i(a, 6),
                            u = l[0],
                            d = l[1],
                            p = l[2],
                            f = l[3],
                            h = l[4],
                            w = l[5],
                            b = "search" === o ? f : "h_" + o,
                            v = s.row(c, p, d, u, _, re, b, h, w);
                        s.addToListsHtml(o, v, e), n[c] = 1
                    }))
                }
            }), o.innerHTML = s.htmlRows(e), t && e && "#" !== e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
        },
        hintsSearch: function(e, t) {
            var o = ge("ts_input"),
                n = ge("ts_cont_wrap"),
                r = void 0;
            ajax.post("al_search.php", {
                act: "get_pages_hints",
                q: e
            }, {
                cache: 1,
                onDone: function(a) {
                    if (trim(val(o)) !== e) return !1;
                    if (!a) return !1;
                    var c = s.maxItems - geByClass("ts_contact", n).length - 1,
                        _ = {};
                    if (each(a, function(o, n) {
                            var a = intval(o),
                                l = i(n, 6),
                                u = l[0],
                                d = l[1],
                                p = l[2],
                                f = l[3],
                                h = l[4],
                                w = l[5],
                                b = s.searchLists(e),
                                v = f.replace("h_", ""),
                                g = (b[v] || {}).parent || v;
                            if (void 0 === b[g] && (g = "search"), _[g] = _[g] || {}, _[g][o] = n, s.lists[g] = s.lists[g] || {}, s.lists[g][o] = n, ge("ts_contact" + a)) return !0;
                            if (!c--) return !1;
                            var m = s.row(a, p, d, u, !1, t, f, h, w);
                            return s.addToListsHtml(g, m, e), r = !0, !0
                        }), each(_, function(e, t) {
                            return s.updateCache(e, t, !0)
                        }), r) {
                        var l = geByClass1("active", n),
                            u = l ? l.id : "";
                        n.innerHTML = s.htmlRows(e), u && ge(u) && addClass(ge(u), "active")
                    }
                }
            })
        },
        writeBox: function(e) {
            window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e, !1, {
                entrypoint: "fastchat_global_search"
            }) : e > 0 && e < 2e9 ? window.showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
        }
    };
    t.default = s
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ge", function() {
        return r
    }), o.d(t, "geByTag", function() {
        return a
    }), o.d(t, "geByTag1", function() {
        return s
    }), o.d(t, "geByClass", function() {
        return c
    }), o.d(t, "geByClass1", function() {
        return _
    }), o.d(t, "gpeByClass", function() {
        return l
    }), o.d(t, "domQuery", function() {
        return u
    }), o.d(t, "domQuery1", function() {
        return d
    }), o.d(t, "domClosest", function() {
        return p
    }), o.d(t, "domClosestByTag", function() {
        return f
    }), o.d(t, "gpeByTag", function() {
        return h
    }), o.d(t, "ce", function() {
        return w
    }), o.d(t, "re", function() {
        return y
    }), o.d(t, "se", function() {
        return E
    }), o.d(t, "sech", function() {
        return k
    }), o.d(t, "rs", function() {
        return j
    }), o.d(t, "psr", function() {
        return C
    }), o.d(t, "domReplaceEl", function() {
        return P
    }), o.d(t, "domEL", function() {
        return x
    }), o.d(t, "domNS", function() {
        return T
    }), o.d(t, "domPS", function() {
        return M
    }), o.d(t, "domFC", function() {
        return L
    }), o.d(t, "domLC", function() {
        return D
    }), o.d(t, "domPN", function() {
        return B
    }), o.d(t, "domChildren", function() {
        return A
    }), o.d(t, "domInsertBefore", function() {
        return S
    }), o.d(t, "domInsertAfter", function() {
        return I
    }), o.d(t, "domByClass", function() {
        return R
    }), o.d(t, "domData", function() {
        return W
    }), o.d(t, "domChildIndex", function() {
        return N
    }), o.d(t, "domCA", function() {
        return U
    }), o.d(t, "domClosestSibling", function() {
        return K
    }), o.d(t, "matchesSelector", function() {
        return q
    }), o.d(t, "isHover", function() {
        return F
    }), o.d(t, "isAncestor", function() {
        return H
    }), o.d(t, "getScroll", function() {
        return V
    }), o.d(t, "domClosestPositioned", function() {
        return z
    }), o.d(t, "domClosestOverflowHidden", function() {
        return G
    }), o.d(t, "show", function() {
        return Y
    }), o.d(t, "hide", function() {
        return X
    }), o.d(t, "isVisible", function() {
        return $
    }), o.d(t, "clientHeight", function() {
        return Z
    }), o.d(t, "getClientRectOffsetY", function() {
        return Q
    }), o.d(t, "toggle", function() {
        return J
    }), o.d(t, "boundingRectEnabled", function() {
        return ee
    }), o.d(t, "getXYRect", function() {
        return te
    }), o.d(t, "getXY", function() {
        return oe
    }), o.d(t, "isWindow", function() {
        return ne
    }), o.d(t, "getSize", function() {
        return ie
    }), o.d(t, "getW", function() {
        return re
    }), o.d(t, "getH", function() {
        return ae
    }), o.d(t, "hasClass", function() {
        return se
    }), o.d(t, "addClass", function() {
        return ce
    }), o.d(t, "addClassDelayed", function() {
        return _e
    }), o.d(t, "removeClass", function() {
        return le
    }), o.d(t, "removeClassDelayed", function() {
        return ue
    }), o.d(t, "toggleClass", function() {
        return de
    }), o.d(t, "toggleClassDelayed", function() {
        return pe
    }), o.d(t, "replaceClass", function() {
        return fe
    }), o.d(t, "getStyle", function() {
        return he
    }), o.d(t, "setStyle", function() {
        return we
    }), o.d(t, "setStyleDelayed", function() {
        return be
    }), o.d(t, "setPseudoStyle", function() {
        return ve
    }), o.d(t, "data", function() {
        return ge
    }), o.d(t, "attr", function() {
        return me
    }), o.d(t, "removeAttr", function() {
        return Oe
    }), o.d(t, "removeData", function() {
        return ye
    }), o.d(t, "cleanElems", function() {
        return Ee
    }), o.d(t, "setTitle", function() {
        return ke
    }), o.d(t, "getZoom", function() {
        return je
    }), o.d(t, "val", function() {
        return Ce
    }), o.d(t, "elfocus", function() {
        return Pe
    }), o.d(t, "traverseParent", function() {
        return xe
    }), o.d(t, "setDocumentTitle", function() {
        return Me
    }), o.d(t, "lockDocumentTitle", function() {
        return Le
    }), o.d(t, "initDomScripts", function() {
        return De
    });
    var n = o(37),
        i = o(132),
        r = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function a(e, t) {
        return (t = r(t) || document).getElementsByTagName(e)
    }

    function s(e, t) {
        return (t = r(t) || document).querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function c(e, t, o) {
        return t = r(t) || document, o = o || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(o + e))
    }

    function _(e, t, o) {
        return t = r(t) || document, o = o || "*", t.querySelector && t.querySelector(o + ("." + e).replace(/\s+/gm, ".")) || c(e, t, o)[0]
    }

    function l(e, t, o) {
        if (!(t = r(t))) return null;
        for (; o !== t && (t = t.parentNode);)
            if (se(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function d(e, t) {
        return (t || document).querySelector(e)
    }

    function p(e, t) {
        return se(t, e) ? t : l(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : h(e, t)
    }

    function h(e, t) {
        if (!(t = r(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function w(e, t, o) {
        var i = document.createElement(e);
        return t && Object(n.extend)(i, t), o && we(i, o), i
    }
    var b, v, g, m, O = (b = document, v = b.createDocumentFragment(), g = b.createElement("div"), m = b.createRange && b.createRange(), v.appendChild(g), m && m.selectNodeContents(g), m && m.createContextualFragment ? function(e) {
        return e ? m.createContextualFragment(e) : b.createDocumentFragment()
    } : function(e) {
        if (!e) return b.createDocumentFragment();
        g.innerHTML = e;
        for (var t = b.createDocumentFragment(); g.firstChild;) t.appendChild(g.firstChild);
        return t
    });

    function y(e) {
        return (e = r(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var E = function(e) {
            return L(w("div", {
                innerHTML: e
            }))
        },
        k = function(e) {
            return A(w("div", {
                innerHTML: e
            }))
        };

    function j(e, t) {
        return Object(n.each)(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function C(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function P(e, t) {
        return Object(n.isString)(t) && (t = E(t)), B(e).replaceChild(t, e), t
    }

    function x(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var T = function(e) {
            return x((e || {}).nextSibling)
        },
        M = function(e) {
            return x((e || {}).previousSibling, 1)
        },
        L = function(e) {
            return x((e || {}).firstChild)
        },
        D = function(e) {
            return x((e || {}).lastChild, 1)
        },
        B = function(e) {
            return (e || {}).parentNode
        };

    function A(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function S(e, t) {
        var o = B(t);
        return o && o.insertBefore(e, t)
    }

    function I(e, t) {
        var o = B(t);
        return o && o.insertBefore(e, T(t))
    }

    function R(e, t) {
        return e ? _(t, e) : e
    }

    function W(e, t, o) {
        return e ? void 0 !== o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function N(e) {
        for (var t = 0; null != (e = M(e));) t++;
        return t
    }

    function U(e, t) {
        do {
            e = B(e)
        } while (e && !q(e, t));
        return e
    }

    function K(e, t, o) {
        for (var n = null; null === n && e;)(e = -1 === o ? M(e) : T(e)) && q(e, t) && (n = e);
        return n
    }

    function q(e, t) {
        return !(!(e = r(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t.item(o) !== this;);
            return o > -1
        }).call(e, t)
    }

    function F(e) {
        return q(e, ":hover")
    }

    function H(e, t) {
        var o = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o === t) return !0;
        return !1
    }

    function V() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function z(e, t) {
        for (var o = (t = t || {}).fromEl || B(e), i = t.positions || ["relative", "absolute", "fixed"]; o && o !== bodyNode;) {
            var r = he(o, "position");
            if (Object(n.inArray)(r, i) && (!t.noOverflow || "hidden" !== he(o, "overflow"))) break;
            o = B(o)
        }
        return o
    }

    function G(e, t) {
        for (var o = e = r(e), n = void 0, i = void 0, a = void 0, s = !1; o && o.tagName && o !== bodyNode;) {
            if (n = he(o, "position"), i = he(o, "overflow"), a = he(o, "transform"), t && browser.mozilla) {
                if ("page_wrap" != o.id && o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break
            } else if (o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break;
            "none" !== a ? s = void 0 : "static" !== n && "fixed" !== s && (s = n), o = B(o)
        }
        return o
    }

    function Y(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) Y(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = e.olddisplay,
                i = e.tagName.toLowerCase(),
                a = "block";
            e.style.display = n || "", "none" === he(e, "display") && (a = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function X(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) X(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = he(e, "display");
            e.olddisplay = "none" !== n ? n : "", e.style.display = "none"
        }
    }

    function $(e) {
        return !(!(e = r(e)) || !e.style) && "none" !== he(e, "display")
    }

    function Z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function Q(e, t, o) {
        e = r(e), o = o || 0;
        var i = oe(e)[1],
            a = ie(e)[1],
            s = window,
            c = document.documentElement,
            _ = Math.max(Object(n.intval)(s.innerHeight), Object(n.intval)(c.clientHeight)),
            l = r("page_header_cont"),
            u = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            d = vk.staticheader ? Math.max(0, ie(l)[1] - u) : ie(l)[1];
        if (t) {
            if (i + a < u + d + o) return i + a - u - d - o;
            if (i > u + _ - o) return i - u - _ + o
        } else {
            if (i < u + d + o) return i - u - d - o;
            if (i + a > u + _ - o) return i + a - u - _ + o
        }
        return 0
    }

    function J(e, t) {
        return void 0 === t && (t = !$(e)), t ? Y(e) : X(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var o = void 0;
        if (t && "inline" === he(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function oe(e, t) {
        if (!(e = r(e))) return [0, 0];
        var o = e.ownerDocument,
            n = {
                top: 0,
                left: 0
            };
        if (!o) return [0, 0];
        var i = o.documentElement;
        ee(e) && (n = te(e, !0));
        var a = o === o.window ? o : 9 === o.nodeType && (o.defaultView || o.parentWindow);
        return [n.left + (t ? 0 : a.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : a.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
    }

    function ne(e) {
        return null != e && e === e.window
    }

    function ie(e, t, o) {
        e = r(e);
        var i = document.documentElement,
            a = [0, 0],
            s = void 0;
        if (t && "border-box" === he(e, "boxSizing") && (t = !1), e === document) a = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
        else if (e) {
            var c = function() {
                a = ee(e) && (s = te(e, o)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(n.each)(a, function(t, o) {
                    var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(n.each)(i, function() {
                        a[t] -= parseFloat(he(e, "padding" + this)) || 0, a[t] -= parseFloat(he(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if ($(e)) c();
            else {
                var _ = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    l = {},
                    u = !1;
                e.style.cssText.indexOf("!important") > -1 && (u = e.style.cssText), Object(n.each)(_, function(t, o) {
                    l[t] = e.style[t], e.style[t] = o
                }), c(), Object(n.each)(_, function(t, o) {
                    e.style[t] = l[t]
                }), u && (e.style.cssText = u)
            }
        }
        return a
    }

    function re(e) {
        return ie(e)[0]
    }

    function ae(e) {
        return ie(e)[1]
    }

    function se(e, t) {
        var o = r(e);
        return o && 1 === o.nodeType && (" " + o.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function ce(e, t) {
        var o = r(e);
        o && !se(o, t) && (o.className = (o.className ? o.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var _e = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function le(e, t) {
        var o = r(e);
        o && (o.className = Object(n.trim)((o.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var ue = function(e, t) {
        return setTimeout(le.pbind(e, t), 0)
    };

    function de(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? ce : le)(e, t), o
    }

    function pe(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? _e : ue)(e, t), o
    }

    function fe(e, t, o) {
        le(e, t), ce(e, o)
    }

    function he(e, t, o) {
        if (e = r(e), Object(n.isArray)(t)) {
            var i = {};
            return Object(n.each)(t, function(t, o) {
                return i[o] = he(e, o)
            }), i
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" === t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!o && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var s = void 0,
            c = document.defaultView || window;
        if (c.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var _ = c.getComputedStyle(e, null);
            _ && (s = _.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var l = e.currentStyle.filter;
                return l && l.indexOf("opacity=") >= 0 ? parseFloat(l.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (s = e.currentStyle[t] || e.currentStyle[u]) && (s = 0), s = (s + "").split(" "), Object(n.each)(s, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        i = n.left,
                        r = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, s[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = r
                }
            }), s = s.join(" ")
        }
        if (o && ("width" === t || "height" === t)) {
            var d = ie(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            s = (Object(n.intval)(s) ? Math.max(Object(n.floatval)(s), d) : d) + "px"
        }
        return s
    }

    function we(e, t, o) {
        if (e = r(e))
            if (Object(n.isObject)(t)) Object(n.each)(t, function(t, o) {
                return we(e, t, o)
            });
            else if ("opacity" === t) browser.msie && ((o + "").length ? e.style.filter = 1 !== o ? "alpha(opacity=" + 100 * o + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
        else try {
            var i = "number" == typeof o;
            i && /height|width/i.test(t) && (o = Math.abs(o)), o = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
        } catch (e) {
            debugLog("setStyle error: ", [t, o], e)
        }
    }
    window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var o in t)
                if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform"
        }
        return "transform"
    }();
    var be = function(e, t, o) {
        return setTimeout(we.pbind(e, t, o), 0)
    };

    function ve(e, t, o) {
        var i = ge(e, "pseudo-id");
        i || (ge(e, "pseudo-id", i = Object(n.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
        var a = t + "-style-" + i,
            s = r(a),
            c = "._pseudo_" + i + ":" + t + "{";
        s || (s = headNode.appendChild(w("style", {
            id: a,
            type: "text/css"
        }))), Object(n.each)(o, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(c, 0)) : s.styleSheet && (s.styleSheet.cssText = c)
    }

    function ge(e, t, o) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== o && (vkCache[n] || (vkCache[n] = {}, window.__debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = o), t ? vkCache[n] && vkCache[n][t] : n
    }

    function me(e, t, o) {
        return e = r(e), void 0 === o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function Oe(e) {
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
                    for (var r in vkCache[o])
                        if ("__elem" !== r) {
                            n++;
                            break
                        }
                    n || ye(e)
                }
            } else Object(i.removeEvent)(e), Oe(e, vkExpand), delete vkCache[o]
    }

    function Ee() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = r(e[t]);
            o && (ye(o), Oe(o, "btnevents"))
        }
    }

    function ke(e, t, o) {
        if ((e = r(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var n = s("b", e);
                n && n.scrollWidth > n.clientWidth ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function je() {
        var e = r("zoom_test_1") || document.body.appendChild(w("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (r("zoom_test_2") || document.body.appendChild(w("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function Ce(e, t, o) {
        if (e = r(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Pe(e, t, o) {
        e = r(e);
        try {
            e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== o && !1 !== o || (o = t), e.setSelectionRange && e.setSelectionRange(t, o)
        } catch (e) {}
    }

    function xe(e, t, o) {
        for (e = r(e), o = o || 999; e && !t(e);) {
            if (0 === --o) return !1;
            try {
                if ((e = B(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    var Te = !1;

    function Me(e) {
        if (!Te) return window.document.title = Object(n.replaceEntities)(e)
    }

    function Le(e) {
        Te = e, e && window.cur && window.cur.destroy.push(function() {
            Le(!1)
        })
    }

    function De() {
        window.vkExpand = window.vkExpand || "VK" + Object(n.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
    window.ge = r, window.geByTag = a, window.geByTag1 = s, window.geByClass = c, window.geByClass1 = _, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = d, window.domClosest = p, window.ce = w, window.cf = O, window.re = y, window.se = E, window.sech = k, window.rs = j, window.psr = C, window.domReplaceEl = P, window.domEL = x, window.domNS = T, window.domPS = M, window.domFC = L, window.domLC = D, window.domPN = B, window.domChildren = A, window.domInsertBefore = S, window.domInsertAfter = I, window.domByClass = R, window.domData = W, window.domChildIndex = N, window.domCA = U, window.domClosestSibling = K, window.matchesSelector = q, window.isHover = F, window.isAncestor = H, window.getScroll = V, window.domClosestPositioned = z, window.domClosestOverflowHidden = G, window.show = Y, window.hide = X, window.isVisible = $, window.clientHeight = Z, window.getClientRectOffsetY = Q, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = oe, window.isWindow = ne, window.getSize = ie, window.hasClass = se, window.addClass = ce, window.addClassDelayed = _e, window.removeClass = le, window.removeClassDelayed = ue, window.toggleClass = de, window.toggleClassDelayed = pe, window.replaceClass = fe, window.getStyle = he, window.setStyle = we, window.setStyleDelayed = be, window.setPseudoStyle = ve, window.data = ge, window.attr = me, window.removeAttr = Oe, window.removeData = ye, window.cleanElems = Ee, window.setTitle = ke, window.getZoom = je, window.val = Ce, window.elfocus = Pe, window.traverseParent = xe, window.getH = ae, window.getW = re, window.domClosestByTag = f, window.setDocumentTitle = Me, window.lockDocumentTitle = Le
}, function(e, t) {
    var o, n, i = e.exports = {};

    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (o === setTimeout) return setTimeout(e, 0);
        if ((o === r || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
        try {
            return o(e, 0)
        } catch (t) {
            try {
                return o.call(null, e, 0)
            } catch (t) {
                return o.call(this, e, 0)
            }
        }
    }! function() {
        try {
            o = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            o = r
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            n = a
        }
    }();
    var c, _ = [],
        l = !1,
        u = -1;

    function d() {
        l && c && (l = !1, c.length ? _ = c.concat(_) : u = -1, _.length && p())
    }

    function p() {
        if (!l) {
            var e = s(d);
            l = !0;
            for (var t = _.length; t;) {
                for (c = _, _ = []; ++u < t;) c && c[u].run();
                u = -1, t = _.length
            }
            c = null, l = !1,
                function(e) {
                    if (n === clearTimeout) return clearTimeout(e);
                    if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
        _.push(new f(e, t)), 1 !== _.length || l || s(p)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e) {
        return []
    }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(e, t, o) {
    var n = o(69),
        i = o(41);
    e.exports = o(135) ? function(e, t, o) {
        return n.f(e, t, i(1, o))
    } : function(e, t, o) {
        return e[t] = o, e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(67),
        i = o(101),
        r = o(42),
        a = o(112);
    e.exports = o(137)(Array, "Array", function(e, t) {
        this._t = a(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            o = this._i++;
        return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
    }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
}, function(e, t, o) {
    'eat script';

    function n(e) {
        var t = new Date;
        return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
    }

    function i(e) {
        return n(new Date(e.getTime() + 864e5))
    }

    function r(e) {
        return n(new Date(e.getTime() - 864e5))
    }

    function a(e, t) {
        var o = new Date(e),
            n = new Date(t);
        return o.getFullYear() === n.getFullYear() && o.getMonth() === n.getMonth() && o.getDate() === n.getDate()
    }

    function s(e) {
        return e >= 10 ? e : "0" + e
    }

    function c(e, t) {
        var o = void 0;
        e = Math.max(e, 0);
        var n = Math.floor(e % 60);
        o = n < 10 ? "0" + n : n;
        var i = (e = Math.floor(e / 60)) % 60;
        return o = i + ":" + o, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (o = "0" + o), o = e + ":" + o), o
    }
    o.r(t), o.d(t, "isToday", function() {
        return n
    }), o.d(t, "isYesterday", function() {
        return i
    }), o.d(t, "isTomorrow", function() {
        return r
    }), o.d(t, "isSameDate", function() {
        return a
    }), o.d(t, "leadingZero", function() {
        return s
    }), o.d(t, "formatTime", function() {
        return c
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "vkLocal", function() {
        return s
    }), o.d(t, "lTimeout", function() {
        return c
    }), o.d(t, "rand", function() {
        return _
    }), o.d(t, "irand", function() {
        return l
    }), o.d(t, "isUndefined", function() {
        return u
    }), o.d(t, "isFunction", function() {
        return d
    }), o.d(t, "isArray", function() {
        return p
    }), o.d(t, "isString", function() {
        return f
    }), o.d(t, "isObject", function() {
        return h
    }), o.d(t, "isEmpty", function() {
        return w
    }), o.d(t, "vkNow", function() {
        return b
    }), o.d(t, "vkImage", function() {
        return v
    }), o.d(t, "trim", function() {
        return g
    }), o.d(t, "stripHTML", function() {
        return m
    }), o.d(t, "escapeRE", function() {
        return O
    }), o.d(t, "intval", function() {
        return y
    }), o.d(t, "floatval", function() {
        return E
    }), o.d(t, "positive", function() {
        return k
    }), o.d(t, "isNumeric", function() {
        return j
    }), o.d(t, "winToUtf", function() {
        return C
    }), o.d(t, "replaceEntities", function() {
        return P
    }), o.d(t, "clean", function() {
        return x
    }), o.d(t, "unclean", function() {
        return T
    }), o.d(t, "each", function() {
        return M
    }), o.d(t, "indexOf", function() {
        return L
    }), o.d(t, "inArray", function() {
        return D
    }), o.d(t, "clone", function() {
        return B
    }), o.d(t, "arrayKeyDiff", function() {
        return A
    }), o.d(t, "extend", function() {
        return S
    }), o.d(t, "addTemplates", function() {
        return I
    }), o.d(t, "getTemplate", function() {
        return R
    }), o.d(t, "serializeForm", function() {
        return W
    }), o.d(t, "extractUrls", function() {
        return N
    }), o.d(t, "isRetina", function() {
        return U
    }), o.d(t, "getCaretCharacterOffsetWithin", function() {
        return K
    }), o.d(t, "formatCount", function() {
        return q
    }), o.d(t, "encodeHtml", function() {
        return V
    }), o.d(t, "decodeHtml", function() {
        return z
    });
    var n = o(32),
        i = o(65),
        r = function() {
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
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
    var _ = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        l = function(e, t) {
            return Math.floor(_(e, t))
        },
        u = function(e) {
            return void 0 === e
        },
        d = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        p = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        f = function(e) {
            return "string" == typeof e
        },
        h = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function w(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var b = function() {
            return +new Date
        },
        v = function() {
            return window.Image ? new Image : ce("img")
        },
        g = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        m = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        O = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function y(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function E(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function k(e) {
        return (e = y(e)) < 0 ? 0 : e
    }

    function j(e) {
        return !isNaN(e)
    }

    function C(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = y(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function P() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(n.se)("<textarea>" + e + "</textarea>").value
    }

    function x(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function T(e) {
        return P(e.replace(/\t/g, "\n"))
    }

    function M(e, t) {
        if (h(e) || void 0 === e.length) {
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && !1 === t.call(e[o], o, e[o])) break
        } else
            for (var n = 0, i = e.length; n < i; n++) {
                var r = e[n];
                if (!1 === t.call(r, n, r)) break
            }
        return e
    }

    function L(e, t, o) {
        for (var n = o || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function D(e, t) {
        return -1 !== L(t, e)
    }

    function B(e, t) {
        var o = h(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === a(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = B(e[n]) : o[n] = e[n]);
        return o
    }

    function A(e) {
        var t = {},
            o = arguments.length,
            n = arguments;
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                for (var r = !1, a = 1; a < o; a++) n[a][i] && n[a][i] === e[i] && (r = !0);
                r || (t[i] = e[i])
            }
        return t
    }

    function S() {
        var e = arguments,
            t = e.length,
            o = e[0] || {},
            n = 1,
            i = !1;
        for ("boolean" == typeof o && (i = o, o = e[1] || {}, n = 2), "object" === (void 0 === o ? "undefined" : a(o)) || d(o) || (o = {}); n < t; n++) {
            var r = e[n];
            if (null != r)
                for (var s in r)
                    if (r.hasOwnProperty(s)) {
                        var c = o[s],
                            _ = r[s];
                        o !== _ && (i && _ && "object" === (void 0 === _ ? "undefined" : a(_)) && !_.nodeType ? o[s] = S(i, c || (null != _.length ? [] : {}), _) : void 0 !== _ && (o[s] = _))
                    }
        }
        return o
    }

    function I(e) {
        window.templates = window.templates || {}, S(window.templates, e)
    }

    function R(e, t) {
        var o = (window.templates = window.templates || {})[e];
        return "function" == typeof o && (o = o()), o && t ? Object(n.rs)(o, t) : o || ""
    }

    function W(e) {
        if ("object" !== (void 0 === e ? "undefined" : a(e))) return !1;
        var t = {},
            o = function(t) {
                return Object(n.geByTag)(t, e)
            },
            i = function(o, i) {
                if (i.name)
                    if ("text" !== i.type && i.type)
                        if (i.getAttribute("bool")) {
                            var r = Object(n.val)(i);
                            if (!r || "0" === r) return;
                            t[i.name] = 1
                        } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                else t[i.name] = Object(n.val)(i)
            };
        return M(o("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
        }), M(o("select"), i), M(o("textarea"), i), t
    }

    function N(e, t) {
        for (var o = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, n = void 0, i = []; e && (n = e.match(o));) {
            e = e.substr(n.index + n[0].length);
            var r = 0;
            n[4] || (r = 7), i.push({
                url: n[2 + r],
                query: n[5 + r] || "",
                domain: n[4 + r]
            })
        }
        return i
    }
    var U = function() {
        return window.devicePixelRatio >= 2
    };

    function K(e) {
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

    function q(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? q(e = (e = y(e / 1e5)) > 1e3 ? y(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "M" : e >= o && !t.noCheck ? q(e = (e = y(e / 100)) > 100 ? y(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var F, H = r((F = null, [function(e) {
            return F || (F = Object(n.se)("<span> </span>")), F.innerText = e, F.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return F || (F = Object(n.se)("<span> </span>")), F.innerHTML = e, F.innerText
        }]), 2),
        V = H[0],
        z = H[1];
    window.isRetina = U, window.extractUrls = N, window.serializeForm = W, window.addTemplates = I, window.getTemplate = R, window.rand = _, window.irand = l, window.isUndefined = u, window.isFunction = d, window.isArray = p, window.isString = f, window.isObject = h, window.isEmpty = w, window.vkNow = b, window.vkImage = v, window.trim = g, window.stripHTML = m, window.escapeRE = O, window.intval = y, window.floatval = E, window.positive = k, window.isNumeric = j, window.winToUtf = C, window.replaceEntities = P, window.clean = x, window.unclean = T, window.each = M, window.indexOf = L, window.inArray = D, window.clone = B, window.arrayKeyDiff = A, window.extend = S, window.vkLocal = s, window.lTimeout = c, window.getCaretCharacterOffsetWithin = K, window.formatCount = q, window.encodeHtml = V, window.decodeHtml = z
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "browser", function() {
        return r
    }), o.d(t, "mobPlatforms", function() {
        return a
    }), o.d(t, "browserFeatures", function() {
        return s
    });
    var n = o(32),
        i = navigator.userAgent.toLowerCase(),
        r = {
            version: (i.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(i) || /opr/i.test(i),
            vivaldi: /vivaldi/i.test(i),
            amigo: /amigo.*mrchrome soc/i.test(i),
            msie: /msie/i.test(i) && !/opera/i.test(i) || /trident\//i.test(i) || /edge/i.test(i),
            msie6: /msie 6/i.test(i) && !/opera/i.test(i),
            msie7: /msie 7/i.test(i) && !/opera/i.test(i),
            msie8: /msie 8/i.test(i) && !/opera/i.test(i),
            msie9: /msie 9/i.test(i) && !/opera/i.test(i),
            msie_edge: /edge/i.test(i) && !/opera/i.test(i),
            mozilla: /firefox/i.test(i),
            chrome: /chrome/i.test(i) && !/edge/i.test(i),
            safari: !/chrome/i.test(i) && /webkit|safari|khtml/i.test(i),
            iphone: /iphone/i.test(i),
            ipod: /ipod/i.test(i),
            iphone4: /iphone.*OS 4/i.test(i),
            ipod4: /ipod.*OS 4/i.test(i),
            ipad: /ipad/i.test(i),
            android: /android/i.test(i),
            bada: /bada/i.test(i),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(i),
            msie_mobile: /iemobile/i.test(i),
            safari_mobile: /iphone|ipod|ipad/i.test(i),
            opera_mobile: /opera mini|opera mobi/i.test(i),
            opera_mini: /opera mini/i.test(i),
            mac: /mac/i.test(i),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(i),
            smart_tv: /smart-tv|smarttv/i.test(i)
        },
        a = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        s = {
            wheelEvent: "onwheel" in Object(n.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : r.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in Object(n.ce)("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
        };
    window.browser = r, window.mobPlatforms = a, window.browserFeatures = s
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "getPageHeaderHeight", function() {
        return d
    }), o.d(t, "updateNarrow", function() {
        return p
    }), o.d(t, "checkPageBlocks", function() {
        return f
    }), o.d(t, "redraw", function() {
        return h
    }), o.d(t, "onBodyScroll", function() {
        return w
    }), o.d(t, "onBodyResize", function() {
        return b
    }), o.d(t, "leftBlockOver", function() {
        return v
    }), o.d(t, "leftBlockOut", function() {
        return g
    }), o.d(t, "leftBlockHide", function() {
        return m
    }), o.d(t, "autosizeSetup", function() {
        return O
    }), o.d(t, "TopMenu", function() {
        return y
    }), o.d(t, "getProgressHtml", function() {
        return E
    }), o.d(t, "getProgressBarEl", function() {
        return k
    });
    var n = o(37),
        i = o(32),
        r = o(14),
        a = o(124),
        s = o(109),
        c = o(86),
        _ = o(28),
        l = o(132),
        u = void 0;

    function d() {
        var e = Object(i.ge)("page_header");
        return u = u || (e ? e.offsetHeight : 0)
    }

    function p() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || Object(i.ge)("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && Object(i.geByClass1)("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || Object(i.ge)("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === Object(i.getStyle)(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || Object(i.ge)("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            a = Object(r.scrollGetY)();
        if (!browser.mobile && e && t && o && !Object(i.isVisible)(boxLoader) && !Object(i.isVisible)(boxLayerBG) && !Object(i.isVisible)(layerBG)) {
            var s = window.lastWindowHeight || 0,
                c = Math.min(a, bodyNode.clientHeight - s),
                _ = cur.__narrowBar.pl,
                l = vk.staticheader ? Math.max(0, d() - c) : d(),
                u = cur.__narrowBar.isBarFixed,
                p = Object(n.floatval)(Object(i.getStyle)(cur.__narrowBar.barBlock, "marginTop")),
                f = Object(i.getSize)(e)[1] - (u ? p : 0),
                h = Object(i.getSize)(o)[1],
                w = Object(i.getXY)(o)[1],
                b = f >= h - p,
                v = p,
                g = c + s - h - w - v,
                m = Math.max(0, g),
                O = w - l,
                y = Object(i.getXY)(e)[1] + (u ? p : 0),
                E = cur.__narrowBar.lastSt || 0,
                k = cur.__narrowBar.lastStyles || {},
                j = l + v + f + p + m <= s && !cur.narrowHide,
                C = !1,
                P = void 0;
            c - 1 < O && !(j && browser.msie && y < l + p) || b ? P = {
                    marginTop: 0
                } : c - 1 < Math.min(E, y - l - p) || j ? (P = {
                    top: l,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(_)[0]))
                }, C = !0) : c + 1 > Math.max(E, y + f + v - s) && g < 0 && !cur.narrowHide || cur.narrowHide && c + 1 > Math.max(E, y + f - l) ? (P = {
                    bottom: cur.narrowHide ? s - l : v,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(_)[0]))
                }, C = !0) : P = {
                    marginTop: g >= 0 ? h - f : Math.min(y - w, h - f + O)
                },
                function(e, t) {
                    var o = clone(e),
                        i = clone(t);
                    return Object(n.each)(o, function(e, t) {
                        "position" !== e && (o[e] = Math.round(t))
                    }), Object(n.each)(i, function(e, t) {
                        "position" !== e && (i[e] = Math.round(t))
                    }), JSON.stringify(o) === JSON.stringify(i)
                }(P, k) || (Object(n.each)(k, function(e) {
                    k[e] = null
                }), Object(i.setStyle)(e, extend(k, P)), cur.__narrowBar.lastStyles = P), C !== u && Object(i.toggleClass)(e, "fixed", C), cur.__narrowBar.lastSt = c, cur.__narrowBar.isBarFixed = C
        }
    }

    function f() {
        var e = Object(i.ge)("content");
        e && (Object(i.toggleClass)(e, "page_block", !Object(i.geByClass1)("page_block", e)), window.updateAriaElements())
    }

    function h(e, t) {
        e && "fixed" === Object(i.getStyle)(e, "position") && (t ? removeClass(e, t) : Object(i.setStyle)(e, {
            position: "relative"
        }), e.offsetLeft, t ? addClass(e, t) : Object(i.setStyle)(e, {
            position: "fixed"
        }))
    }

    function w() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(Object(i.ge)("page_layout"))[0]));
            browser.mobile || vk.staticheader || Object(a.updateHeaderStyles)({
                marginLeft: e
            }), Object(a.updateLeftMenu)(), p(), Object(s.updSideTopLink)()
        }
    }

    function b(e) {
        if (window.pageNode) {
            var t = document.documentElement,
                o = t.clientWidth,
                r = t.clientHeight,
                _ = Object(s.sbWidth)(),
                l = Math.max(Object(n.intval)(window.innerWidth), Object(n.intval)(o)),
                u = Math.max(Object(n.intval)(window.innerHeight), Object(n.intval)(r)),
                d = !1;
            if (browser.mobile && (l = Math.max(l, Object(n.intval)(bodyNode.scrollWidth)), u = Math.max(u, Object(n.intval)(bodyNode.scrollHeight))), window.lastWindowWidth !== l || !0 === e) {
                d = !0, window.lastInnerWidth = window.lastWindowWidth = l, layerWrap.style.width = boxLayerWrap.style.width = l + "px";
                var f = layer.style.width = boxLayer.style.width = l - _ - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = l + "px", mvLayer.style.width = f), window.wkLayerWrap && (wkLayerWrap.style.width = l + "px", wkLayer.style.width = f), bodyNode.offsetWidth < vk.width + _ + 2 && (l = vk.width + _ + 2), l)
                    for (var w = pageNode.firstChild; w; w = w.nextSibling)
                        if (w.tagName) {
                            for (var b = (window.lastInnerWidth = l - _ - 1) - 1, v = w.firstChild; v; v = v.nextSibling) "scroll_fix" === v.className && (v.style.width = b + "px");
                            vk.staticheader || Object(a.updateHeaderStyles)({
                                width: b
                            })
                        }
            }
            if ((window.lastWindowHeight !== u || !0 === e) && (d = !0, window.lastWindowHeight = u, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = u + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = u + "px"), window.wkLayerWrap)) {
                var g = browser.mobile ? window.innerHeight : u;
                wkLayerWrap.style.height = g + "px"
            }
            if (vk.noSideTop || Object(s.updSideTopLink)(1), d && window.curRBox && window.curRBox.boxes && window.getWndInner) {
                var m = getWndInner();
                Object(n.each)(curRBox.boxes, function(e, t) {
                    return t._wnd_resize(m[0], m[1])
                })
            }
            setTimeout(c.updSeenAdsInfo, 0);
            var O = getAudioPlayer();
            O.audioLayer && O.audioLayer.isShown() && O.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && Object(i.setStyle)(cur.lSTL, {
                width: Math.max(Object(i.getXY)(cur.lSTL.el)[0], 0),
                height: u - 1
            }), Object(i.ge)("dev_top_nav") && Object(i.setStyle)(Object(i.ge)("dev_top_nav", "left", null));
            var y = Object(i.geByClass)("ui_search_fixed"),
                E = Object(i.ge)("narrow_column");
            Object(n.each)(y, function() {
                h(this, "ui_search_fixed"), setTimeout(h.pbind(this, "ui_search_fixed"), 0)
            }), E && (h(E, "fixed"), setTimeout(h.pbind(E, "fixed"), 0)), Object(a.updateLeftMenu)(), p(), Object(a.updateSTL)()
        }
    }

    function v(e) {
        var t = 1;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), !t && e.timer || (e.showing ? Object(i.removeAttr)(e, "showing") : (Object(_.animate)(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), Object(i.removeAttr)(e, "timer"))
    }

    function g(e) {
        var t = .5;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            Object(_.animate)(e, {
                opacity: t
            }, 200), Object(i.removeAttr)(e, "timer")
        }, 1)
    }

    function m(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: c.updSeenAdsInfo
        }), hide("left_block" + e)
    }

    function O(e, t) {
        if (e = Object(i.ge)(e))
            if (e.autosize) e.autosize.update();
            else {
                t.minHeight = Object(n.intval)(t.minHeight) || Object(n.intval)(Object(i.getStyle)(e, "height")), t.maxHeight = Object(n.intval)(t.maxHeight);
                var o = Object(i.getSize)(e)[0] || Object(n.intval)(Object(i.getStyle)(e, "width")),
                    r = Object(i.getStyle)(e, "fontSize"),
                    a = Object(i.getStyle)(e, "lineHeight");
                o < 1 && (o = Object(n.intval)(Object(i.getStyle)(e, "width", !1))), r.indexOf("em") > 0 && (r = Object(n.floatval)(r) * vk.fs), r = Object(n.intval)(r);
                var s = {
                    width: o,
                    height: 10,
                    fontFamily: Object(i.getStyle)(e, "fontFamily"),
                    fontSize: r + "px",
                    lineHeight: a,
                    boxSizing: Object(i.getStyle)(e, "boxSizing")
                };
                Object(n.each)(["Top", "Bottom", "Left", "Right"], function() {
                    s["padding" + this] = Object(i.getStyle)(e, "padding" + this)
                }), e.autosize = {
                    options: t,
                    helper: ce("textarea", {
                        className: "ashelper"
                    }, s),
                    handleEvent: function(t, o) {
                        var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                        if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 === o.keyCode || 13 === o.keyCode ? n = "\n" : !browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                        if (!browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                        var i = document.selection.createRange();
                        return i.text && (t = t.replace(i.text, "")), t + n
                    },
                    update: function(t) {
                        var o = e.value;
                        !t || "blur" === t.type || "keyup" === t.type || browser.msie && "keypress" !== t.type || t.ctrlKey || t.altKey || t.metaKey || (o = e.autosize.handleEvent(o, t)), o || (o = " "), e.autosize.helper.value !== o && (e.autosize.helper.value = o);
                        var n = e.autosize.options,
                            r = Object(i.getSize)(e, !0)[1],
                            s = e.autosize.helper.scrollHeight,
                            c = s % a;
                        n.exact && c > 2 && (s -= c - 2), s < n.minHeight && (s = n.minHeight);
                        var _ = {
                                overflow: "hidden"
                            },
                            l = Object(i.getStyle)(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                        n.maxHeight && s > n.maxHeight && (s = n.maxHeight, extend(_, {
                            overflow: "auto",
                            overflowX: "hidden"
                        })), n.addHeight && (s += n.addHeight), r === s && l === _.overflow || (_.height = s, Object(i.setStyle)(e, _), isFunction(n.onResize) && n.onResize(s))
                    }
                }, t.exact && ("normal" === a && (a = "120%"), a.indexOf("%") > 0 && (a = r * Object(n.intval)(a) / 100)), utilsNode.appendChild(e.autosize.helper), browser.opera_mobile ? (Object(i.setStyle)(e, {
                    overflow: "hidden"
                }), e.autosize.update(), addEvent(e, "blur", e.autosize.update)) : (addEvent(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                    Object(i.setStyle)(e, {
                        overflow: "hidden",
                        resize: "none"
                    }), e.autosize.update();
                    var t = val(e);
                    val(e, " ", !0), val(e, t, !0)
                }, 0))
            }
    }
    var y = {
        init: function() {
            if (this.inited) return !1;
            var e = Object(i.ge)("top_profile_link"),
                t = Object(i.ge)("top_profile_menu");
            if (!e || !t) return !1;
            addEvent(e, "mousedown", y.clicked), this.inited = !0
        },
        clicked: function(e) {
            return !(Object(l.checkEvent)(e) || "mousedown" === e.type && Object(l.checkKeyboardEvent)(e)) && (y.toggle(), !1)
        },
        toggle: function(e) {
            var t = Object(i.ge)("top_profile_link"),
                o = Object(i.ge)("top_profile_menu"),
                n = hasClass(o, "shown");
            void 0 !== e && n === e || (void 0 === e && (e = !n), Object(i.toggleClass)(t, "active", e), Object(i.toggleClass)(o, "shown", e), e ? (cancelStackPush("top_menu", y.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : cancelStackFilter("top_menu", !0))
        },
        show: function() {
            y.hidetimer && (clearTimeout(y.hidetimer), y.hidetimer = 0), y.toggle(!0)
        },
        hide: function() {
            y.hidetimer || (y.hidetimer = setTimeout(function() {
                y.toggle(!1), y.hidetimer = 0
            }, 200))
        },
        select: function(e, t) {
            return !!Object(l.checkEvent)(t) || (y.toggle(!1), nav.go(e, t, {
                noback: !0
            }))
        }
    };

    function E(e, t) {
        return Object(i.rs)(vk.pr_tpl, {
            id: e || "",
            cls: t || ""
        })
    }

    function k(e) {
        return Object(i.geByClass1)("ui_progress_bar", e)
    }
}, function(e, t, o) {
    var n = o(9)("keys"),
        i = o(103);
    e.exports = function(e) {
        return n[e] || (n[e] = i(e))
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t, o) {
    var n = o(16),
        i = o(118)("iterator"),
        r = o(42);
    e.exports = o(94).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
    }
}, function(e, t, o) {
    var n = o(15),
        i = o(13),
        r = function(e, t) {
            if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                (n = o(133)(Function.call, o(113).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
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
    var n = o(15);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var o, i;
        if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
        if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, o) {
    'eat script';
    var n = o(102);
    e.exports = o(90)("Map", function(e) {
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
    o.r(t), o.d(t, "subscribePerformanceLoggerCollectors", function() {
        return d
    });
    var n = o(95),
        i = function() {
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
        r = "remixjsp";

    function a() {
        var e;
        (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                "first-contentful-paint" === e.name && u(e.startTime, "TTFCP")
            }),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            n = e.loadEventEnd;
                        u(t, "domComplete"), u(o, "domContentLoadedEventEnd"), u(n, "loadEventEnd")
                    }
                })
            }(), _()
    }
    var s = [],
        c = !1;

    function _() {
        if (c) {
            var e = window.performance,
                t = s[s.length - 1];
            if (!t) return c = !1, void u(-1);
            var o = t.startTime + t.duration;
            e.now() - o >= 3e3 ? u(o, "TTI") : setTimeout(_, 3e3)
        }
    }
    var l = [];

    function u(e, t) {
        var o = Math.floor(e);
        if (-1 !== e && (l.push([o, t]), !(c ? "TTI" === t : l.length > 2))) return;
        var a = "unknown",
            s = navigator.connection;
        s && s.effectiveType && (a = s.effectiveType);
        var _ = {
            id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
            loc: location.href,
            events: []
        };
        l.forEach(function(e) {
            var t = i(e, 2),
                o = t[0],
                n = t[1];
            return _.events.push([n, o, cur.module, a, window.vk.rv])
        }), Object(n.setCookie)(r, JSON.stringify(_), .01)
    }

    function d() {
        window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
            s = s.concat(e.getEntries())
        }).observe({
            entryTypes: ["longtask"]
        }), c = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
            setTimeout(a, 0)
        }) : a()
    }
}, function(e, t, o) {
    var n = o(118)("iterator"),
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
    var n = o(77),
        i = o(112),
        r = o(59)(!1),
        a = o(40)("IE_PROTO");
    e.exports = function(e, t) {
        var o, s = i(e),
            c = 0,
            _ = [];
        for (o in s) o != a && n(s, o) && _.push(o);
        for (; t.length > c;) n(s, o = t[c++]) && (~r(_, o) || _.push(o));
        return _
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
            var o = ce("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }
    o.r(t), o.d(t, "setFavIcon", function() {
        return n
    }), window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.showTitleProgress = function() {}, window.hideTitleProgress = function() {}, window.setFavIcon = n
}, function(e, t, o) {
    o(8), o(53), o(21), o(139), e.exports = o(94).Set
}, function(e, t, o) {
    e.exports = o(84).document && document.documentElement
}, function(e, t, o) {
    'eat script';
    var n = o(87)(!0);
    o(137)(String, "String", function(e) {
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
                            _ = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== _ && _.enumerable && (o[c] = i[c])
                    }
            }
            return o
        }
    })
}, function(e, t, o) {
    var n = o(84),
        i = o(94),
        r = o(34),
        a = o(17),
        s = o(133),
        c = function(e, t, o) {
            var _, l, u, d, p = e & c.F,
                f = e & c.G,
                h = e & c.S,
                w = e & c.P,
                b = e & c.B,
                v = f ? n : h ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                g = f ? i : i[t] || (i[t] = {}),
                m = g.prototype || (g.prototype = {});
            for (_ in f && (o = t), o) u = ((l = !p && v && void 0 !== v[_]) ? v : o)[_], d = b && l ? s(u, n) : w && "function" == typeof u ? s(Function.call, u) : u, v && a(v, _, u, e & c.U), g[_] != u && r(g, _, d), w && m[_] != u && (m[_] = u)
        };
    n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(32),
        i = o(37),
        r = o(132),
        a = o(14),
        s = o(39);
    var c = function() {
        function e(t, o) {
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.constructor !== e) throw new Error("ElementTooltip was called without 'new' operator");
            if (!(t = ge(t)) || !t.nodeType) throw new Error("First argument not a DOM element");
            if (Object(n.data)(t, "ett")) return Object(n.data)(t, "ett");
            if (this._opts = extend({
                    delay: 100,
                    offset: [0, 0],
                    shift: 0,
                    type: e.TYPE_VERTICAL,
                    id: "",
                    cls: "",
                    width: null,
                    appendToParent: !1,
                    autoShow: !0,
                    autoHide: !1,
                    noHideOnClick: !1,
                    arrowSize: "normal",
                    customShow: !1,
                    align: e.ALIGN_CENTER
                }, o), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type === e.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.cls += " eltt_align_" + this._opts.align, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type !== e.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
            this._opts.forceSide && (this._opts.type = Object(i.inArray)(this._opts.forceSide, ["top", "bottom"]) ? e.TYPE_VERTICAL : e.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? Object(n.domClosestPositioned)(t, {
                noOverflow: !0
            }) : t, this._arrowSize = {
                mini: e.ARROW_SIZE_MINI,
                normal: e.ARROW_SIZE_NORMAL,
                big: e.ARROW_SIZE_BIG
            }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = e.getType(this._opts.forceSide)), this._el = t, Object(n.data)(this._el, "ett", this), this._initEvents(t), this._clearTimeouts(), this._isShown = !1
        }
        return e.prototype._initEvents = function(e) {
            var t = this;
            this._opts.autoShow && (this._el_me_event = this._onMouseEnter.bind(this), addEvent(e, "mouseenter", this._el_me_event)), (this._opts.autoShow || this._opts.autoHide) && (this._el_ml_event = this._onMouseLeave.bind(this), addEvent(e, "mouseleave", this._el_ml_event)), this._opts.autoShow || this._opts.customShow || (this._el_c_event = function() {
                t._isShown && t._opts.noHideOnClick || t.toggle(!t._isShown)
            }, addEvent(e, "click", this._el_c_event))
        }, e.prototype._onMouseEnter = function(e) {
            clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
        }, e.prototype._onMouseLeave = function(e) {
            this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
        }, e.prototype._onMouseWindowClick = function(e) {
            if (!this._opts.noAutoHideOnWindowClick) {
                for (var t = e.target; t && t !== this._ttel && t !== document.body && t !== this._el;) t = Object(n.domPN)(t);
                if (!hasClass(e.target, "_ap_layer__close")) return t && t !== document.body ? void 0 : (this.hide(!0), Object(r.cancelEvent)(e))
            }
        }, e.prototype.destroy = function() {
            this._el_me_event && Object(r.removeEvent)(this._el, "mouseenter", this._el_me_event), this._el_ml_event && Object(r.removeEvent)(this._el, "mouseleave", this._el_ml_event), this._el_c_event && Object(r.removeEvent)(this._el, "click", this._el_c_event), this._clearTimeouts(), Object(n.removeData)(this._el, "ett"), Object(n.re)(this._ttel), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick);
            var e = void 0;
            this._ttel && (e = geByClass1("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
        }, e.prototype.hide = function(e) {
            this._hide(e)
        }, e.prototype._onTooltipMouseEnter = function(e) {
            this._clearTimeouts()
        }, e.prototype._onTooltipMouseLeave = function(e) {
            this._onMouseLeave()
        }, e.prototype.build = function() {
            if (!this._ttel) {
                this._ttel = Object(n.se)('\n        <div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '">\n          <div class="eltt_arrow_back _eltt_arrow_back">\n            <div class="eltt_arrow"></div>\n          </div>\n          <div class="eltt_content _eltt_content"></div>\n        </div>'), this._ttArrowEl = geByClass1("_eltt_arrow_back", this._ttel);
                var e = geByClass1("_eltt_content", this._ttel);
                this._opts.content && (isString(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
            }
        }, e.prototype.show = function() {
            if (this._isShown) this.updatePosition();
            else {
                if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (this._ev_ttenter = this._onTooltipMouseEnter.bind(this), this._ev_ttleave = this._onTooltipMouseLeave.bind(this), addEvent(this._ttel, "mouseenter", this._ev_ttenter), addEvent(this._ttel, "mouseleave", this._ev_ttleave))), this._opts.width) {
                    var e = Object(i.isFunction)(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                    Object(n.setStyle)(this._ttel, "width", e)
                }
                Object(n.show)(this._ttel);
                var t = geByClass1("_eltt_content", this._ttel);
                this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this.updatePosition(), this._visTO = setTimeout(addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick), this._ev_wclick = this._onMouseWindowClick.bind(this), addEvent(document, "mousedown", this._ev_wclick)
            }
        }, e.getType = function(t) {
            switch (t) {
                case "top":
                case "bottom":
                    return e.TYPE_VERTICAL;
                case "right":
                case "left":
                    return e.TYPE_HORIZONTAL
            }
        }, e.prototype.getOptions = function() {
            return this._opts
        }, e.prototype.updatePosition = function() {
            var t = this,
                o = this._opts.forceSide,
                r = !!this._opts.getTargetBoundingBox && this._opts.getTargetBoundingBox(this);
            if (!r) {
                var c = Object(n.getXY)(this._el),
                    _ = Object(n.getSize)(this._el);
                r = {
                    left: c[0],
                    top: c[1],
                    width: _[0],
                    height: _[1]
                }
            }
            var l = Object(n.gpeByClass)("audio_layer_container", this._ttel),
                u = l || Object(n.domClosestOverflowHidden)(this._ttel),
                d = u !== bodyNode ? Object(n.getXY)(u) : [Object(a.scrollGetX)(), Object(a.scrollGetY)() + Object(s.getPageHeaderHeight)()],
                p = u !== bodyNode ? Object(n.getSize)(u) : [window.innerWidth, window.innerHeight],
                f = Object(n.getSize)(this._ttel),
                h = this._arrowSize,
                w = this._opts.noBorder ? 0 : 1,
                b = Object(i.isFunction)(this._opts.offset) ? this._opts.offset() : this._opts.offset,
                v = void 0,
                g = function(o, i) {
                    var a = {},
                        s = [vk.rtl ? "marginRight" : "marginLeft", "marginTop"].indexOf(o),
                        c = void 0;
                    c = t._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? f[s] - Math.max(w + h + (i || 0), Math.min(f[s], r[s ? "height" : "width"]) / 2) : t._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? Math.max(w + h + (i || 0), Math.min(f[s], r[s ? "height" : "width"]) / 2) : f[s] / 2, a[o] = Math.floor(c) - w - h - (i || 0), Object(n.setStyle)(t._ttArrowEl, a)
                };
            if (this._opts.setPos) v = this._opts.setPos(this) || {}, e.getType(o) === e.TYPE_VERTICAL ? void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginLeft: v.arrowPosition
            }) : vk.rtl ? g("marginRight") : g("marginLeft") : void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginTop: v.arrowPosition
            }) : g("marginTop");
            else {
                if (!o && this._prevSide && this._opts.preventSideChange) o = this._prevSide;
                else if (!o)
                    if (this._opts.type === e.TYPE_VERTICAL) {
                        var m = hasClass(bodyNode, "body_im") ? 60 : this._opts.bottomGap || 0,
                            O = r.top - d[1] > f[1] + h - b[1],
                            y = Object(a.scrollGetY)() + p[1] - (r.top + r.height + h) - m > f[1];
                        o = "top" === this._opts.defaultSide ? O ? "top" : "bottom" : y ? "bottom" : "top"
                    } else o = r.left - d[0] < f[0] ? "right" : "left";
                var E = Object(n.getXY)(this._appendToEl),
                    k = [r.left - E[0], r.top - E[1]],
                    j = void 0,
                    C = b[0] + k[0];
                this._opts.centerShift ? (C += this._opts.centerShift || 0, j = this._opts.centerShift) : this._opts.rightShift && (C += j = -(f[0] / 2 - this._opts.rightShift)), this._prevSide = o;
                var P = void 0,
                    x = void 0,
                    T = void 0,
                    M = void 0,
                    L = void 0;
                switch (this._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? (P = r.width - f[0], x = r.height - f[1]) : this._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? (P = 0, x = 0) : (P = -f[0] / 2 + r.width / 2, x = r.height / 2 - f[1] / 2), o) {
                    case "bottom":
                        M = P + C, L = r.height + h - b[1] + k[1], j || ((T = P + r.left + b[0] + f[0] + 20 - (d[0] + p[0])) < 0 && (T = 0), M -= T, j = -T), v = {
                            left: M,
                            top: L
                        };
                        break;
                    case "top":
                        M = P + C, L = -f[1] - h + b[1] + k[1], j || ((T = P + r.left + b[0] + f[0] + 20 - (d[0] + p[0])) < 0 && (T = 0), M -= T, j = -T), v = {
                            left: M,
                            top: L
                        };
                        break;
                    case "right":
                        M = r.width + h + C, L = x + b[1] + k[1], j || ((T = x + r.top + b[1] - (d[1] + 20)) > 0 && (T = 0), L -= T, j = -T), v = {
                            left: M,
                            top: L
                        };
                        break;
                    case "left":
                        M = -f[0] - h + C, L = x + b[1] + k[1], j || ((T = x + r.top + b[1] - (d[1] + 20)) > 0 && (T = 0), L -= T, j = -T), v = {
                            left: M,
                            top: L
                        }
                }
                this._opts.type === e.TYPE_VERTICAL ? vk.rtl ? g("marginRight", j) : g("marginLeft", j) : g("marginTop", j)
            }
            Object(i.each)(["top", "bottom", "left", "right"], function(e, t) {
                o !== t && removeClass(this._ttel, "eltt_" + t)
            }.bind(this)), addClass(this._ttel, "eltt_" + o), Object(n.setStyle)(this._ttel, v)
        }, e.prototype._hide = function(t) {
            if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                    hide(this._ttel), this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!t)
                }.bind(this), e.FADE_SPEED), this._opts.onBeforeHide) try {
                this._opts.onBeforeHide(this._ttel, !!t)
            } catch (e) {}
            removeClass(this._ttel, "eltt_vis"), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick)
        }, e.prototype.isShown = function() {
            return this._isShown
        }, e.prototype.toggle = function() {
            this.isShown() ? this.hide() : this.show()
        }, e.prototype._clearTimeouts = function() {
            this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
        }, e.prototype.getContent = function() {
            return geByClass1("_eltt_content", this._ttel)
        }, e
    }();
    c.TYPE_VERTICAL = 0, c.TYPE_HORIZONTAL = 1, c.FADE_SPEED = 100, c.ARROW_SIZE_MINI = 9, c.ARROW_SIZE_NORMAL = 8, c.ARROW_SIZE_BIG = 16, c.ALIGN_LEFT = "left", c.ALIGN_CENTER = "center", c.ALIGN_RIGHT = "right", window.ElementTooltip = c
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "collectMemoryStats", function() {
        return a
    }), o.d(t, "statDurationsLoadImage", function() {
        return s
    }), o.d(t, "statNavigationTiming", function() {
        return c
    });
    var n = o(70),
        i = o(37);

    function r(e, t) {
        for (var o = void 0, n = 0; n < t.length; n++)
            if (">" === (o = t[n])) o = ">" + t[n - 1];
            else {
                if (1e3 * o > e) {
                    o = "<" + o;
                    break
                }
                o = !1
            }
        return o
    }

    function a() {
        var e = {},
            t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
            o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
            i = !1;
        setInterval(function() {
            var a = window.cur && window.cur.module;
            a !== i && (e = {}, i = a);
            var s = window.vkLastNav;
            if (a && s) {
                var c = r(Date.now() - s, t);
                if (c && !e[c]) {
                    var _ = r(Date.now() - window.vkTabLoaded, o);
                    e[c] = !0;
                    var l = performance.memory.usedJSHeapSize;
                    Object(n.statlogsValueEvent)("js_memory_stats_modules", l, a, c, _)
                }
            }
        }, 5e3)
    }

    function s() {
        if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
            if (window.clientStatsInited) return !1;
            var e = window.performance.getEntriesByType("resource");
            if (!e) return !1;
            for (var t = {}, o = {}, r = 0; r < e.length; r++)
                if (e[r] && "img" === e[r].initiatorType)
                    if (e[r].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                    else if (e[r].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
            else if (e[r].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
            else if (e[r].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
            else if (e[r].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
            else if (e[r].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
            else if (t[">5000"] = (t[">5000"] || 0) + 1, e[r].name && e[r].name.indexOf("pp.vk.me") > 0) {
                var a = "";
                (a = (a = e[r].name).substr(a.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[a = a.substr(0, a.indexOf("/"))] = (o[a] || 0) + 1)
            }
            Object(i.each)(t, function(e, t) {
                return Object(n.statlogsValueEvent)("img_load", t, e)
            }), Object(i.each)(o, function(e, t) {
                return Object(n.statlogsValueEvent)("img_slow", t, e)
            }), window.clientStatsInited = !0
        }
    }

    function c() {
        if (window.clientStatsInitedNT) return !1;
        if (window.performance && performance.timing) {
            if (Math.random() > .001 && !__dev) return !1;
            var e = {},
                t = window.cur && window.cur.module;
            performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), Object(i.each)(e, function(e, o) {
                return Object(n.statlogsValueEvent)("navigation_timing", o, e, t)
            }), window.clientStatsInitedNT = !0
        }
    }
}, function(e, t, o) {
    var n = o(112),
        i = o(82),
        r = o(143);
    e.exports = function(e) {
        return function(t, o, a) {
            var s, c = n(t),
                _ = i(c.length),
                l = r(a, _);
            if (e && o != o) {
                for (; _ > l;)
                    if ((s = c[l++]) != s) return !0
            } else
                for (; _ > l; l++)
                    if ((e || l in c) && c[l] === o) return e || l;
            return !e && -1
        }
    }
}, function(e, t, o) {
    var n = o(13),
        i = o(140),
        r = o(105),
        a = o(40)("IE_PROTO"),
        s = function() {},
        c = function() {
            var e, t = o(12)("iframe"),
                n = r.length;
            for (t.style.display = "none", o(52).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var o;
        return null !== e ? (s.prototype = n(e), o = new s, s.prototype = null, o[a] = e) : o = c(), void 0 === t ? o : i(o, t)
    }
}, function(e, t) {
    e.exports = !1
}, , , , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "parseLatin", function() {
        return r
    }), o.d(t, "parseCyr", function() {
        return a
    }), o.d(t, "parseLatKeys", function() {
        return s
    }), o.d(t, "langNumeric", function() {
        return c
    }), o.d(t, "langSex", function() {
        return _
    }), o.d(t, "langStr", function() {
        return l
    }), o.d(t, "addLangKeys", function() {
        return u
    }), o.d(t, "getLang", function() {
        return d
    }), o.d(t, "langDate", function() {
        return p
    }), o.d(t, "getShortDate", function() {
        return f
    }), o.d(t, "getShortDateOrTime", function() {
        return h
    }), o.d(t, "langWordNumeric", function() {
        return w
    }), o.d(t, "getDateText", function() {
        return b
    }), o.d(t, "getBigDateNew", function() {
        return v
    }), o.d(t, "getSmDate", function() {
        return g
    });
    var n = o(36),
        i = o(37);

    function r(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = e, i = 0, r = t.length; i < r; i++) n = n.split(t[i]).join(o[i]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = a.length; s < c; s++) n = n.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return n === e ? null : n
    }

    function a(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, r = 0; r < o.length; r++) i = i.split(o[r]).join(t[r]);
        for (var a = 0; a < n.length; a++) i = i.split(n.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
        return i === e ? null : i
    }

    function s(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", o = e, n = 0; n < t.length; n++) o = o.split(t.charAt(n)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(n));
        return o == e ? null : o
    }

    function c(e, t, o) {
        if (!t || !window.langConfig) return e;
        var n = void 0;
        if (Object(i.isArray)(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(o, r) {
                if ("*" == r[0]) return n = t[r[2]], !1;
                var a = r[0] ? e % r[0] : e;
                return -1 != Object(i.indexOf)(r[1], a) ? (n = t[r[2]], !1) : void 0
            })) : n = t, o) {
            for (var r = e.toString().split("."), a = [], s = r[0].length - 3; s > -3; s -= 3) a.unshift(r[0].slice(s > 0 ? s : 0, s + 3));
            r[0] = a.join(langConfig.numDel), e = r.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function _(e, t) {
        if (!Object(i.isArray)(t)) return t;
        var o = t[1];
        return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (o = t[i[1]], !1) : e == i[0] && t[i[1]] ? (o = t[i[1]], !1) : void 0
        }), o) : o
    }

    function l(e) {
        for (var t = arguments, o = t.length, n = e + "", i = 1; i < o; i += 2) {
            var r = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
            n = n.replace(r, t[i + 1])
        }
        return n
    }

    function u(e, t) {
        var o = t ? window : window.cur;
        o.lang ? Object(i.extend)(o.lang, e) : o.lang = e
    }

    function d() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return Object(i.isFunction)(o) ? o.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(o) || "raw" === e[0] ? o : c(e[0], o, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function p(e, t, o, r, a, s) {
        var c = void 0;
        if (s || (s = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, c = new Date(e)) : c = e, a) t = t[1];
        else {
            var _ = "";
            !(_ = Object(n.isToday)(c) ? t[3] : Object(n.isYesterday)(c) ? t[2] : Object(n.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (_ = t[1]), t = _
        }
        var l = {
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
                day: c.getDate(),
                month: c.getMonth() + 1,
                year: c.getFullYear()
            },
            u = "";
        switch (3 === vk.lang && (u = c.getHours() > 11 ? "pm" : "am", l.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
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
        return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", Object(n.leadingZero)(l.hours)).replace("{minute}", Object(n.leadingZero)(l.minutes)).replace("{day}", l.day).replace("{num_day}", Object(n.leadingZero)(l.day)).replace("{month}", r[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", Object(n.leadingZero)(l.seconds)).replace("{am_pm}", u)
    }

    function f(e, t, o, n, i) {
        e *= 1e3, void 0 === o && (o = !0), void 0 === n && (n = d("months_of", "raw")), t *= 1e3;
        var r = Date.now(),
            a = new Date(r),
            s = new Date(e + t);
        return !i && e > r && e - r < 864e5 && a.getDate() === s.getDate() ? p(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() !== a.getYear() || e < r - 157248e5 ? p(e, d("global_date", "raw"), t, n, !o) : p(e, d("global_short_date", "raw"), t, n, !o)
    }

    function h(e, t, o, i) {
        return Object(n.isToday)(new Date(1e3 * e + 1e3 * t)) ? p(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : f(e, t, o, i)
    }

    function w(e, t, o) {
        return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, o)
    }

    function b(e, t) {
        e += t;
        var o = parseInt(Date.now() / 1e3) - e,
            n = "";
        if (o < 60) n = d("global_just_now");
        else if (o < 3600) {
            n = w(Object(i.intval)(o / 60), d("global_word_mins_ago", "raw"), d("global_mins_ago", "raw"))
        } else if (o < 14400) {
            n = w(Object(i.intval)(o / 3600), d("global_word_hours_ago", "raw"), d("global_hours_ago", "raw"))
        } else n = v(e, 0, !0, "_l");
        return n
    }

    function v(e, t, o, n) {
        void 0 === o && (o = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            r = new Date;
        return i.getFullYear() !== r.getFullYear() && i.getTime() < r.getTime() - 1728e5 || Math.abs(i.getTime() - r.getTime()) > 157248e5 ? p(1e3 * e, d("global_date", "raw"), t, d("months_sm_of"), !o) : p(1e3 * e, d("global_short_date_time" + n, "raw"), t, d("months_sm_of"), !o)
    }

    function g(e, t, o) {
        void 0 === o && (o = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            r = n.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            c = a.getMonth();
        return p(1e3 * e, d(s < i && (r > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, d("months_sm_of", "raw"), !o)
    }
    window.parseLatin = r, window.parseCyr = a, window.parseLatKeys = s, window.langNumeric = c, window.langSex = _, window.langStr = l, window.addLangKeys = u, window.getLang = d, window.langDate = p, window.getShortDate = f, window.getShortDateOrTime = h, window.langWordNumeric = w, window.getDateText = b, window.getBigDateNew = v, window.getSmDate = g
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "onDocumentClick", function() {
        return _
    }), o.d(t, "onEnter", function() {
        return l
    }), o.d(t, "onCtrlEnter", function() {
        return u
    }), o.d(t, "handleGlobalEsc", function() {
        return d
    });
    var n = o(132),
        i = o(32),
        r = o(37),
        a = o(96),
        s = o(83),
        c = function() {
            Object(i.re)(window._opener), window._opener = utilsNode.appendChild(Object(i.ce)("iframe"))
        };

    function _(e) {
        if (Object(n.checkEvent)(e)) return !0;
        if (ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t = 8, o = e.target || e.srcElement, a = void 0, s = void 0, _ = void 0; o && o !== bodyNode && "A" !== o.tagName && t--;) o = o.parentNode;
            if (!o || "A" !== o.tagName || o.onclick || o.onmousedown) return !0;
            var l = o.href;
            if (l && (o.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !browser.msie) return (_ = window.open("", "_blank", "")) && (browser.msie && -1 !== l.indexOf(";") && (l = "'" + l.replace(/'/g, "%27") + "'"), _.opener = null, _.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + Object(r.clean)(l) + '">'), _.document.close()), Object(n.cancelEvent)(e);
                try {
                    return window._opener.contentWindow.open(l, "_blank"), setTimeout(c, 0), Object(n.cancelEvent)(e)
                } catch (e) {
                    return !0
                }
            }
            if ("https:" !== location.protocol && !l.indexOf("https://")) return !0;
            (l = l.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (l = l.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (l = l.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var u = {};
            (s = l.match(/^\/(.+?)#[\!\/](.+?)$/)) && !s[1].match(/^app(\d+)/) && (u.permanent = s[1], l = "/" + s[2]);
            var d = !!(o.getAttribute && o.getAttribute("data-post-click-type") && o.getAttribute("data-post-id"));
            if (l.match(/#$/) && !d) return !0;
            var p = Object(i.domData)(o, "post-id");
            p && (u.postId = p);
            var f = void 0,
                h = l;
            if (a = l.match(/^\/(.*?)(\?|#|$)/)) a = a[1];
            else {
                if (o.hostname) f = o.hostname, a = o.pathname + o.search;
                else {
                    var w = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(l);
                    if (!w) return !0;
                    f = w[1], a = w[3] || "/"
                }
                if (!f || !d) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), h = o
            }
            if ("add_community_app" === a) return attr(o, "target", "_blank"), !0;
            if (a.indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!d) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), h = o
            }
            var b = o.getAttribute("hrefparams");
            b && (u.params = extend(u.params || {}, q2ajx(b)));
            try {
                return nav.go(h, e, u), Object(n.cancelEvent)(e)
            } catch (e) {
                return !0
            }
        }
    }

    function l(e, t) {
        (t = t || window.event).keyCode === n.KEY.ENTER && (e(), Object(n.cancelEvent)(t))
    }

    function u(e, t) {
        (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && (t(), Object(n.cancelEvent)(e))
    }

    function d(e) {
        if (window._wf = 1, e.keyCode === n.KEY.ESC && __bq.count() && !cur._noEscHide) return __bq.hideLast(), -1;
        if (e.keyCode === n.KEY.ESC && window.articleCloseImageFullSize && articleCloseImageFullSize()) return Object(n.cancelEvent)(event);
        if (e.keyCode === n.KEY.ESC && cur.articleLayer) return cur.articleLayer.close(!0), Object(n.cancelEvent)(event);
        if (e.keyCode === n.KEY.ESC) return cancelStackPop(), Object(n.cancelEvent)(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(n.KEY.LEFT), t.push(n.KEY.RIGHT)), Object(r.each)(t, function(t, n) {
            if (e.keyCode === n) return o = !0, !1
        }), o && Object(a.getAudioPlayer)().onMediaKeyPressedEvent(e), s.Chat.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac) && s.Chat.showFriends()
    }
}, function(e, t, o) {
    var n = o(118)("unscopables"),
        i = Array.prototype;
    void 0 == i[n] && o(34)(i, n, {}), e.exports = function(e) {
        i[n][e] = !0
    }
}, , function(e, t, o) {
    var n = o(13),
        i = o(93),
        r = o(45),
        a = Object.defineProperty;
    t.f = o(135) ? Object.defineProperty : function(e, t, o) {
        if (n(e), t = r(t, !0), n(o), i) try {
            return a(e, t, o)
        } catch (e) {}
        if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
        return "value" in o && (e[t] = o.value), e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "statlogsValueEvent", function() {
        return a
    });
    var n = o(95),
        i = o(37),
        r = o(107);

    function a(e, t, o, a, s) {
        if (void 0 !== e && void 0 !== t) {
            var c = Array.from(arguments).slice(2, 5),
                _ = void 0;
            ! function e(t, o, n) {
                var i = "lockkk_" + t;
                if (!0 === r.ls.get(i)) r.ls.checkVersion() ? n || setTimeout(e.pbind(t, o, !0), 100) : o();
                else {
                    r.ls.set(i, !0);
                    try {
                        o()
                    } catch (e) {}
                    r.ls.set(i, !1)
                }
            }("stats_cookie_lock", function() {
                try {
                    _ = (_ = JSON.parse(Object(n.getCookie)("remixsts"))).data
                } catch (e) {
                    _ = []
                }
                for (_.push([Math.round(Date.now() / 1e3), e, t].concat(c)); _.length > 100;) _.shift();
                var o = Math.round(Object(i.rand)(0, 1e9));
                Object(n.setCookie)("remixsts", JSON.stringify({
                    data: _,
                    uniqueId: o
                }), .01)
            })
        }
    }
    window.statlogsValueEvent = a
}, function(e, t) {
    var o = {}.toString;
    e.exports = function(e) {
        return o.call(e).slice(8, -1)
    }
}, function(e, t) {
    var o;
    o = function() {
        return this
    }();
    try {
        o = o || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (o = window)
    }
    e.exports = o
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = function() {
        function e() {
            var t = this;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = window.CallHub;
            this.on = 0, this.hub = new o(function() {
                t.onShow && t.onShow()
            }, 2), this.hintsHub = new o(function() {
                return t.showStartHints()
            }, 2)
        }
        return e.prototype.load = function() {
            var e = this;
            ge("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                return e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = trim(t), e.hintsHub.done()
                }
            }))
        }, e.prototype.show = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e) {
            var t = window.placeholderSetup;
            if (ge("quick_search") && !this.on) return this.on = 1, show(this.sCont), t("search_input"), ge("search_input").setAttribute("autocomplete", "off"), addClass(ge("qsearch_link"), "active"), this.prev_content = ge("content"), this.qsearch_cont || (this.qsearch_cont = ce("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? cancelEvent(e) : void 0
        }), e.prototype.go = function(e) {
            var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + trim(ge("search_input").value) + "&name=1";
            return cancelEvent(e || window.event), location.href = t, !1
        }, e.prototype.init = function(e) {
            this.sCont = ge("quick_search"), this.opt = e || {}
        }, e.prototype.hide = function(e) {
            function t(t, o) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t) {
            if (ge("quick_search") && (!this.active || t) && this.on) {
                var o = window.toggleFlash;
                if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                ge("search_input").setValue ? ge("search_input").setValue("") : ge("search_input").value = "", hide(this.sCont), removeClass(ge("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
            }
        }), e.prototype.preload = function() {}, e
    }();
    t.default = n
}, , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "initLayers", function() {
        return u
    });
    var n = o(19),
        i = o(32),
        r = o(14),
        a = o(91),
        s = o(30),
        c = o(37),
        _ = {
            sh: function(e, t) {
                Object(i.show)(e), Object(c.isFunction)(t) && t()
            },
            hd: function(e, t) {
                hide(e), Object(c.isFunction)(t) && t()
            },
            visible: !1,
            _show: function(e, t, o, s) {
                var c = "layers" + (__bq.count() + 1);
                cancelStackPush(c, function() {}), Object(i.setStyle)(e, {
                    opacity: o || "",
                    backgroundColor: s || ""
                }), _.visible || (Object(n.toggleFlash)(), Object(r.disableBodyScroll)()), _.visible || Object(a.pauseLastInlineVideo)(), _.visible = !0, addClass(bodyNode, "layers_shown"), t.visibilityHide ? removeClass(t, "box_layer_hidden") : Object(i.show)(t), _.sh(e), window.updateWndVScroll && updateWndVScroll()
            },
            _hide: function(e, t) {
                _.hd(e, function() {
                    var e = "layers" + (__bq.count() + 1);
                    cancelStackFilter(e), t && t.visibilityHide ? addClass(t, "box_layer_hidden") : hide(t), Object(i.isVisible)(layerWrap) || cur._inLayer || Object(i.isVisible)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(i.isVisible)(window.mvLayerWrap)) || Object(i.isVisible)(window.wkLayerWrap) || (_.visible = !1, removeClass(bodyNode, "layers_shown"), Object(n.toggleFlash)(!0), Object(r.enableBodyScroll)()), window.updateWndVScroll && updateWndVScroll()
                }), _.visible || Object(a.playLastInlineVideo)()
            }
        },
        l = {
            push: function(e) {
                var t = void 0,
                    o = !!l.count() && l._layers[l._layers.length - 1];
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
                return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || l._layers.push(t), l.skipVideo = !1, !0
            },
            noHistory: function() {
                for (var e = l._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
            },
            hide: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                l._bl = !0, window.WkView && _.fullhide == WkView.hide ? (hide(wkLayerWrap), clearTimeout(wkcur.showT)) : _.fullhide && _.fullhide(!0, !0), setTimeout(l.unblock, 5)
            }),
            unblock: function() {
                l._bl = !1
            },
            pop: function() {
                if (l.count() && !l._bl) {
                    var e = l._layers.pop();
                    if (l.skipVideo && (l.skipVideo = !1, "video" == e[0])) return l._layers.push(e), void(l.skipVideo = !1);
                    "photo" === e[0] ? (extend(e[3], {
                        fromQueue: !0
                    }), showPhoto(e[1], e[2], e[3], !1)) : "video" === e[0] ? (extend(e[3], {
                        fromQueue: !0
                    }), Object(a.showVideo)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? showWiki({
                        w: e[1]
                    }, !1, !1, e[3]) : "stories" === e[0] && Object(s.showStory)(e[1])
                }
            },
            back: function(e, t, o, n) {
                for (var i = l._layers, r = i.length; r > 0; --r)
                    if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return l._layers = i.slice(0, r), l.pop(), !0;
                return !1
            },
            count: function() {
                return l._layers.length
            },
            clear: function() {
                l._layers = []
            },
            _layers: []
        };

    function u(e, t, o, n) {
        return window.layerQueue = l, extend(_, {
            show: _._show.pbind(e, t),
            boxshow: _._show.pbind(o, n),
            wrapshow: _._show.pbind(e),
            hide: _._hide.pbind(e, t),
            boxhide: _._hide.pbind(o, n),
            wraphide: _._hide.pbind(e)
        }), _
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), __webpack_require__.d(__webpack_exports__, "showGlobalPrg", function() {
        return showGlobalPrg
    });
    var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);

    function topMsg(e, t, o) {
        if (o || (o = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
            n.style.backgroundColor = o, n.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.hide)("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var error = text;
            text = "<b>JavaScript error:</b> " + error.message, opts.stack = error.stack, error.stack && __debugMode && (text += "<br/>" + error.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(error.stack)
            } catch (e) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts, {
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
        n && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
        var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(o, e),
            a = r || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
            s = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                className: i,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), a);
        r && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(r), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(s, "msg_appear"), 0)
    }

    function showGlobalPrg(e, t) {
        var o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
            n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
            i = t || {},
            r = i.w,
            a = void 0 === r ? 32 : r,
            s = i.h,
            c = void 0 === s ? 13 : s,
            _ = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
        _.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(_, {
            left: o[0] + Math.floor((n[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[0] : 0),
            top: o[1] + Math.floor((n[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[1] : 0),
            width: a,
            height: c,
            display: "block",
            "z-index": i.zIndex ? i.zIndex : null
        }), i.hide && (e.style.visibility = "hidden")
    }
}, function(e, t) {
    var o = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return o.call(e, t)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "MessageBox", function() {
        return MessageBox
    }), __webpack_require__.d(__webpack_exports__, "showBox", function() {
        return showBox
    }), __webpack_require__.d(__webpack_exports__, "showTabbedBox", function() {
        return showTabbedBox
    }), __webpack_require__.d(__webpack_exports__, "showFastBox", function() {
        return showFastBox
    }), __webpack_require__.d(__webpack_exports__, "showCaptchaBox", function() {
        return showCaptchaBox
    }), __webpack_require__.d(__webpack_exports__, "showReCaptchaBox", function() {
        return showReCaptchaBox
    });
    var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(109),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7),
        _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(132),
        _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32),
        _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28),
        _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37);

    function MessageBox(_options) {
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
            },
            options = extend(defaults, _options),
            guid = window._message_box_guid++,
            visible = !1,
            btns = {
                ok: [],
                cancel: []
            },
            boxTitleBck = void 0;
        options.progress || (options.progress = "box_progress" + guid);
        var controlsStyle = options.hideButtons ? ' style="display: none"' : "",
            boxContainer = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("div", {
                className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
                innerHTML: '\n<div class="box_layout" onclick="__bq.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + getLang("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
            }, {
                display: "none"
            });
        hide(boxContainer);
        var boxLayout = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxContainer),
            boxTitleWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxLayout),
            boxCloseButton = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxTitleWrap),
            boxTitle = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domLC)(boxTitleWrap),
            boxTitleControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxCloseButton);
        options.noCloseButton && hide(boxCloseButton);
        var boxBody = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxTitleWrap),
            boxControlsWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxBody),
            boxControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControlsWrap),
            boxButtons = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControls),
            boxProgress = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxButtons),
            boxControlsText = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxProgress);
        boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), boxRefreshCoords(boxContainer);
        var emitter = new EventEmitter;

        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, removeClass(boxBody, "box_no_title"), show(boxTitleWrap)) : (addClass(boxBody, "box_no_title"), hide(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxBody, "box_no_buttons", options.hideButtons), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxTitleWrap, "box_grey", options.grey), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
        }

        function _addButton(e, t, o, n) {
            var i = "flat_button";
            "no" === o || "gray" === o ? (i += " secondary", o = "cancel") : o = "ok";
            var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("button", {
                className: i,
                innerHTML: e,
                id: n
            });
            return boxButtons.rows[0].insertCell(0).appendChild(r), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.createButton)(r, function() {
                emitter.emit(o, retBox), t.apply(null, arguments)
            }), btns[o].push(r), r
        }

        function setControlsText(e) {
            boxControlsText.innerHTML = e
        }

        function _removeButtons() {
            for (var e = boxButtons.rows[0]; e.cells.length;) Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)(e.cells[0]), e.deleteCell(0);
            btns.ok.length = btns.cancel.length = 0
        }
        var destroyMe = function() {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onClean) && options.onClean(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onDestroy) && options.onDestroy(), _removeButtons(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete window._message_boxes[guid]
            },
            hideMe = function(e, t, o) {
                if (visible) {
                    visible = !1;
                    var n = !0 === e ? 0 : options.animSpeed;
                    options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", __bq.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onBeforeHide) && options.onBeforeHide();
                    var i = function() {
                        __bq.currHiding === _message_boxes[guid] && (__bq.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : hide(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (__bq.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeOut)(boxContainer, n, i)) : i()
                }
            };

        function showMe(e, t, o) {
            if (!visible && window._message_boxes[guid]) {
                visible = !0;
                var n = !0 === e || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), t || layers.boxshow(), __bq.currHiding) {
                    __bq.currHiding.shOther = !0;
                    var i = __bq.currHiding.bodyNode.parentNode.parentNode;
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.data)(i, "tween").stop(!0)
                }
                n > 0 ? fadeIn(boxContainer, n) : show(boxContainer), boxRefreshCoords(boxContainer), options.onShow && options.onShow(o)
            }
        }
        addEvent(boxCloseButton, "click", __bq.hideLast);
        var retBox = window._message_boxes[guid] = {
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
                return !(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHideAttempt) && !options.onHideAttempt(e)) && (__bq._hide(guid), !0)
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
                if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", __bq.hideBGClick), options = extend(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; o++) {
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
                    var _fn = eval(scr);
                    _fn.apply(this, [url, params])
                } catch (e) {
                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? ajx2q(params) : void 0,
                        js: js
                    }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, scr)
                }
            }
        };
        return retBox
    }

    function showBox(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = arguments[3];
        if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.checkEvent)(n)) return !1;
        var i = o.params || {};
        o.containerClass && (i.containerClass = o.containerClass);
        var r = new MessageBox(i),
            a = {
                onDone: function(n, a, s, c) {
                    if (o.preOnDone && o.onDone && o.onDone(r), r.isVisible())
                        if (__debugMode) _();
                        else try {
                            _()
                        } catch (o) {
                            Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(o, {
                                dt: 15,
                                type: 103,
                                url: e,
                                query: ajx2q(t),
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            }), r.isVisible() && r.hide()
                        } else o.onDone && o.onDone(r, c);

                    function _() {
                        show(boxLayerBG), addClass(bodyNode, "layers_shown"), r.setOptions({
                            title: n,
                            hideButtons: i.hideButtons || !1
                        }), o.showProgress ? r.show() : show(r.bodyNode), r.content(a), r.evalBox(s, e, t), o.onDone && o.onDone(r, c)
                    }
                },
                onFail: function(e) {
                    if (r.failed = !0, setTimeout(r.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(o.onFail)) return o.onFail(e)
                },
                cache: o.cache,
                stat: o.stat,
                fromBox: !0
            };
        return o.prgEl && (o.showProgress = _ui_util__WEBPACK_IMPORTED_MODULE_3__.showGlobalPrg.pbind(o.prgEl, {
            cls: o.prgClass,
            w: o.prgW,
            h: o.prgH,
            hide: !0
        }), o.hideProgress = hide.pbind("global_prg")), o.showProgress ? extend(a, {
            showProgress: o.showProgress,
            hideProgress: o.hideProgress
        }) : (r.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), __bq.count() < 2 && (hide(boxLayerBG), removeClass(bodyNode, "layers_shown")), hide(r.bodyNode), a.showProgress = function() {
            show(boxLoader), boxRefreshCoords(boxLoader)
        }, a.hideProgress = hide.pbind(boxLoader)), r.removeButtons().addButton(getLang("global_close")), ajax.post(e, t, a), r
    }

    function showTabbedBox(e, t, o, n) {
        return (o = o || {}).stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
    }

    function showFastBox(e, t, o, n, i, r) {
        return new MessageBox("string" == typeof e ? {
            title: e
        } : e).content(t).setButtons(o, n, i, r).show()
    }

    function showCaptchaBox(e, t, o, n) {
        var i = function(t) {
                if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                    var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode);
                    if (trim(i.value) || !0 === t) {
                        var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode)[0];
                        Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(r), show(geByClass1("progress", o.bodyNode)), hide(i), n.onSubmit(e, i.value)
                    } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(i)
                }
            },
            r = !!o,
            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.intval)(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + a;
        if (!r) {
            var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + getLang("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, c, getLang("captcha_send"), function() {
                o.submit()
            }, getLang("captcha_cancel"), function() {
                var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
                    t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
                Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
            l = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
        return r && (_.value = "", l.src = "/captcha.php?sid=" + e + a, hide(geByClass1("progress", o.bodyNode))), show(_), addEvent(_, "keypress", i), addEvent(l, "click", function() {
            this.src = "/captcha.php?sid=" + e + a + "&v=" + irand(1e6, 2e6)
        }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(_), o
    }

    function showReCaptchaBox(e, t, o, n) {
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
                    o && (val(o, ""), window.grecaptcha.render(o, {
                        sitekey: e,
                        callback: window.recaptchaResponse
                    }))
                }
            }, headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("script", {
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
        return i && r ? window.grecaptcha.reset() : r && window.recaptchaCallback(), o.changed = !0, o
    }
}, function(e, t, o) {
    var n = o(133),
        i = o(23),
        r = o(123),
        a = o(13),
        s = o(82),
        c = o(43);
    e.exports = function(e, t, o, _, l) {
        var u, d, p, f = l ? function() {
                return e
            } : c(e),
            h = n(o, _, t ? 2 : 1),
            w = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (r(f))
            for (u = s(e.length); u > w; w++) t ? h(a(d = e[w])[0], d[1]) : h(e[w]);
        else
            for (p = f.call(e); !(d = p.next()).done;) i(p, h, d.value, t)
    }
}, , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "menuSettings", function() {
        return s
    }), o.d(t, "showWriteMessageBox", function() {
        return c
    }), o.d(t, "giftsBox", function() {
        return _
    }), o.d(t, "moneyTransferBox", function() {
        return l
    }), o.d(t, "reportAd", function() {
        return u
    }), o.d(t, "mobilePromo", function() {
        return d
    }), o.d(t, "showAudioClaimWarning", function() {
        return p
    });
    var n = o(78),
        i = o(109),
        r = o(32),
        a = o(132);

    function s(e) {
        return Object(n.showTabbedBox)("al_settings.php", {
            act: "menu_box",
            type: e
        })
    }

    function c(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = Object(n.showBox)("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", jsc("web/emoji.js"), "notifier.css"],
            cache: 1
        }, e);
        return o && Object(a.cancelEvent)(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }

    function _(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !Object(n.showBox)("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }

    function l(e, t, o, a, s, c, _) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (s) {
            if (!_) {
                var u = void 0,
                    d = void 0;
                return 2 === s ? (u = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || getLang("mail_money_transfer_cancel_confirm"), d = cur.lang && cur.lang.mail_money_transfer_cancel_btn || getLang("mail_money_transfer_cancel_btn")) : (u = cur.lang && cur.lang.mail_money_transfer_decline_confirm || getLang("news_fb_money_transfer_decline_confirm"), d = cur.lang && cur.lang.mail_money_transfer_decline_btn || getLang("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = Object(n.showFastBox)(getLang("global_action_confirmation"), u, d, l.pbind(e, t, o, a, s, !1, 1), getLang("global_cancel")))
            }
            var p = hasClass(Object(r.domPN)(a), "wall_postlink_preview_btn"),
                f = geByClass1("flat_button", Object(r.domPN)(a));
            return 2 !== _ && (Object(i.disableButton)(f, !0), p ? (addClass(a.firstChild, "round_spinner"), removeClass(a.firstChild, "button")) : Object(i.lockButton)(a), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: p ? "snippet" : ""
            }, {
                onDone: function(n, i, c) {
                    0 !== n ? (p ? (Object(r.re)(a), hasClass(f, "secondary") || Object(r.domReplaceEl)(f, c)) : Object(r.re)(Object(r.domPN)(a)), showDoneBox(i), window.TopNotifier.invalidate()) : setTimeout(l.pbind(e, t, o, a, s, !1, 2), 2e3)
                },
                onFail: function(e) {
                    return Object(i.disableButton)(f, !1), p ? (addClass(a.firstChild, "button"), removeClass(a.firstChild, "round_spinner")) : Object(i.unlockButton)(a), setTimeout(Object(n.showFastBox)(getLang("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var h = void 0;
        return h = c ? {
            act: "money_transfer_box",
            request_id: e,
            request: c,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = a, !Object(n.showBox)("al_payments.php", h, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(Object(n.showFastBox)(getLang("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }

    function u(e) {
        Object(n.showBox)("/reports.php?act=a_report_ad_box", {
            ad_id: e
        }, {
            params: {
                width: 370
            },
            stat: ["ui_controls.js", "ui_controls.css"]
        })
    }
    var d = n.showBox.pbind("al_login.php", {
        act: "mobile",
        box: 1
    });

    function p(e, t, o) {
        var r = e.id,
            a = e.ownerId,
            s = e.title,
            c = t.id,
            _ = t.reason,
            l = t.original,
            u = {
                width: 470
            },
            d = void 0,
            p = void 0;
        "geo" === _ ? (d = getLang("audio_claimed_geo"), p = getLang("audio_claim_warning_title")) : "site_rules_violation" === _ ? (d = getLang("audio_site_rules_violation_warning"), p = getLang("audio_site_rules_violation_header")) : "replace" === _ ? (d = getLang("audio_claimed_replacement_available"), p = getLang("audio_claim_warning_title")) : "subscription" === _ ? (u.hideButtons = !0, u.bodyStyle = "padding: 0; border-radius: 4px;", u.width = 450, p = !1, d = '\n      <div class="audio_claim_popup">\n        <div class="audio_claim_popup__title">' + getLang("global_audio_only_with_subscription_title") + '</div>\n        <div class="audio_claim_popup__text">' + getLang("global_audio_only_with_subscription_text") + '</div>\n        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>\n        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + getLang("global_audio_only_with_subscription_btn") + "</button>\n      </div>") : (d = getLang("audio_claim_warning"), p = getLang("audio_claim_warning_title")), u.title = p;
        var f = [u, d = (d = (d = d.replace(/\{audio\}/g, "<b>" + s + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + c + "&content=audio" + a + "_" + r + '">' + getLang("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + a + ", " + r + '); return false;">' + getLang("audio_claim_delete") + "</a>")],
            h = null;
        if (o && l) {
            var w = AudioUtils.drawAudio(l, "no_extra");
            f[1] = d.replace(/\{original\}/g, l[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + l[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + w, f.push(getLang("audio_replace_with_original"), function() {
                Object(i.lockButton)(h.btns.ok[0]), o(function() {
                    return h.hide()
                })
            }), u.textControls = '<a onclick="deleteAudioOnClaim(' + a + ", " + r + '); return false;">' + getLang("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = h = n.showFastBox.apply(null, f)
    }
}, function(e, t, o) {
    var n = o(26),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(n(e), 9007199254740991) : 0
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "Chat", function() {
        return u
    }), o.d(t, "cssAnim", function() {
        return d
    }), o.d(t, "fifaReplaceText", function() {
        return p
    }), o.d(t, "imagesLoader", function() {
        return f
    }), o.d(t, "hideNewsAnnounce", function() {
        return h
    }), o.d(t, "leftAdBlockClose", function() {
        return w
    }), o.d(t, "leftBlockToggleFriend", function() {
        return b
    }), o.d(t, "leftBlockFriendTooltip", function() {
        return v
    }), o.d(t, "initLegacyBrowserDetectionInAttribute", function() {
        return g
    });
    var n = o(142),
        i = o(109),
        r = o(32),
        a = o(28),
        s = o(132),
        c = o(37),
        _ = o(78),
        l = function() {
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
        }();
    var u = {
        maxHeight: 300,
        tabs: {},
        counters: {},
        showFriends: function() {
            curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), u.cont.tt && u.cont.tt.destroy && u.cont.tt.destroy())
        },
        showTT: function() {
            if (!Object(r.hasClass)(u.wrap, "chat_active") && !Object(r.hasClass)(u.wrap, "chat_expand")) {
                var e = browser.mac ? "Cmd" : "Ctrl";
                Object(n.showTooltip)(u.cont, {
                    text: getLang("head_fr_online_tip") + " (" + e + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            }
        },
        init: function() {
            u.wrap = Object(r.ce)("div", {
                id: "chat_onl_wrap",
                className: "chat_onl_wrap",
                innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
            }), utilsNode.appendChild(u.wrap), u.scrollNode = geByClass1("chat_cont_scrolling", u.wrap), u.ttNode = geByClass1("chat_tt_wrap", u.wrap), u.itemsCont = u.scrollNode.firstChild, u.onl = ge("chat_onl"), u.cont = u.onl.parentNode.parentNode, hide(u.wrap), u.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + Object(i.sbWidth)() + "px;}")
        }
    };

    function d(e, t, o, n) {
        var i = Object(c.intval)(browser.version);
        if (e && (browser.chrome && i > 14 || browser.mozilla && i > 13 || browser.opera && i > 2)) {
            var _ = "all " + o.duration + "ms " + (o.func || "ease-out");
            e.style.WebkitTransition = _, e.style.MozTransition = _, e.style.OTransition = _, e.style.transition = _;
            var l = function t() {
                return browser.opera && Object(c.intval)(browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : Object(s.removeEvent)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
            };
            n && (browser.opera && Object(c.intval)(browser.version) <= 12 ? e.addEventListener("oTransitionEnd", l) : addEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", l)), setTimeout(r.setStyle.pbind(e, t), 0)
        } else Object(a.animate)(e, t, extend(o, {
            onComplete: n
        }))
    }

    function p(e) {
        return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
            return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
        }) : e
    }

    function f(e, t) {
        var o = [],
            n = 0,
            i = null,
            a = extend({
                top_load: 0,
                bottom_load: 2,
                load_limit: 10,
                need_load_class: "__need_load",
                skip_process_load: !1,
                use_iframe: !1
            }, t),
            s = {};

        function _(e, t) {
            o[e] && (--n, delete o[e]), t || s.processLoad()
        }

        function u(t) {
            var o = 0,
                n = t;
            if (n && n.offsetParent)
                do {
                    if (o += n.offsetTop, e && n.offsetParent === e) break
                } while (n = n.offsetParent);
            return o
        }
        return s.processLoad = function() {
            if (Object(c.each)(o, function(e, t) {
                    var n = l(t, 2),
                        i = n[0],
                        r = n[1];
                    (r.width || r.height || Object(c.vkNow)() - i > 2e4) && o[e] && _.call(r, e, !0)
                }), clearTimeout(i), n && (i = setTimeout(s.processLoad, 500)), !(n >= a.load_limit)) {
                var t = Object(r.geByClass)(a.need_load_class, e || bodyNode),
                    d = [],
                    p = void 0,
                    f = void 0;
                if (e && t.length) {
                    var h = e.offsetHeight;
                    p = e.scrollTop - h * a.top_load, f = e.scrollTop + h * a.bottom_load
                }
                for (var w = 0, b = t.length; w < b && n < a.load_limit; w++) {
                    var v = t[w];
                    if ("IMG" === v.tagName) {
                        var g = v.getAttribute("data-src");
                        if (g) {
                            if (e) {
                                var m = u(v),
                                    O = m + v.parentNode.offsetHeight;
                                if (m > f) continue;
                                if (O < p) continue
                            }
                            d.push([v, g])
                        }
                    }
                }
                Object(c.each)(d, function(e, t) {
                    var i = l(t, 2),
                        r = i[0],
                        u = i[1];
                    s.iloader && s.iloader.add(u, _, r), r.src = u, r.removeAttribute("data-src"), removeClass(r, a.need_load_class), o[u] || (n++, o[u] = [Object(c.vkNow)(), r])
                }), clearTimeout(i), n && (i = setTimeout(s.processLoad, 500))
            }
        }, s.destroy = function() {
            o = [], n = 0, clearTimeout(i)
        }, a.use_iframe && (s.iloader = new function() {
            var e = void 0,
                t = void 0,
                o = void 0,
                n = void 0,
                i = void 0,
                a = void 0;

            function s(e) {
                return t && t.body ? t.getElementById("___img" + e) : geByClass1("___img" + e, o)
            }

            function _() {
                e = utilsNode.appendChild(Object(r.ce)("iframe")), t = function(e) {
                    if (browser.mozilla) return !1;
                    try {
                        return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                    } catch (e) {}
                    return !1
                }(e), o = t && t.body ? t.body : utilsNode.appendChild(Object(r.ce)("div", {}, {
                    display: "none"
                })), n = 0, i = []
            }

            function u(e, a, c) {
                var _ = n++;
                i[_] = {
                    src: e,
                    onLoad: a,
                    that: c
                }, o.appendChild(Object(r.ce)("div", {
                    innerHTML: function(e) {
                        return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                    }(_)
                }));
                var l = s(_);
                return l.src = e, l.onload = function() {
                    var e = i[_];
                    e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[_], o.removeChild(s(_).parentNode))
                }, l
            }
            return _(), {
                add: u,
                abort: function() {
                    Object(r.re)(e), a = [].concat(function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
                            return o
                        }
                        return Array.from(e)
                    }(i.filter(function(e) {
                        return void 0 !== e
                    }))), _()
                },
                repeat: function(e) {
                    if (!a) return [];
                    var t = [];
                    if (Object(c.each)(a, function(e, o) {
                            u(o.src, o.onLoad, o.that), t.push(o.that)
                        }), a = null, e) {
                        var o = [];
                        Object(c.each)(t, function() {
                            o.push([this, this.src]), this.src = "", hide(this)
                        }), setTimeout(function() {
                            Object(c.each)(o, function(e, t) {
                                var o = l(t, 2),
                                    n = o[0],
                                    i = o[1];
                                n.src = i, show(n)
                            })
                        }, 10)
                    }
                    return t
                }
            }
        }), a.skip_process_load || s.processLoad(), s
    }

    function h(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), hide("news_announce_" + e)
    }

    function w(e, t) {
        function o() {
            Object(a.animate)("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, n)
        }

        function n() {
            Object(r.setStyle)("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        Object(r.setStyle)("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: function(t) {
                if (!t.done) return;
                if ("ya_direct" === e) return Object(a.animate)(e, {
                    opacity: 0
                }, 200, function() {
                    Object(r.re)("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(window.vk__adsLight.yaDirectAdActive = !1);
                var n = ge("ads_ad_close_info_" + e);
                if (!n) return !1;
                Object(r.setStyle)(n, {
                    opacity: 0
                }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
            }
        })
    }

    function b(e, t, o, n, i) {
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
                Object(r.cleanElems)(i.firstChild), t ? (show(i), val(i, t)) : hide(i), o && (ajax.preload("al_friends.php", {
                    act: "friend_tt",
                    mid: e
                }, [o, n]), setTimeout(v, 0))
            },
            showProgress: function() {
                var t = (ge("left_friend_subscribed") || {}).tt;
                t && (t.hide({
                    fasthide: 1
                }), t.destroy()), ge("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
            },
            hideProgress: function() {
                return hide("left_friend_status_" + e)
            },
            onFail: function(e) {
                if (e) return Object(_.showFastBox)({
                    title: getLang("global_error")
                }, e), !0
            }
        }), Object(s.cancelEvent)(i)
    }

    function v() {
        return Object(n.showTooltip)(ge("left_friend_subscribed"), {
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
    }

    function g() {
        var e = [];
        Object(c.each)(browser, function(t, o) {
            o && !Object(c.inArray)(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
        }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e)
    }
}, function(e, t) {
    var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = o)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "updSeenAdsInfo", function() {
        return a
    }), o.d(t, "__adsGetAjaxParams", function() {
        return s
    }), o.d(t, "__adsUpdate", function() {
        return c
    }), o.d(t, "__adsSet", function() {
        return _
    }), o.d(t, "__adsUpdateExternalStats", function() {
        return l
    });
    var n = o(95),
        i = o(37),
        r = o(32);

    function a() {
        if ((Object(r.getXY)("ads_left", !0) || {})[1] && vk.id) {
            var e = Object(r.getXYRect)(Object(r.geByTag1)("ol", Object(r.ge)("side_bar_inner")), !0),
                t = e ? e.height : 0,
                o = Object(r.getXYRect)(Object(r.ge)("left_blocks"), !0),
                a = o ? o.height : 0,
                s = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - a - 42 - 10) / 260), 0);
            __seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), __seenAds !== s && (__seenAds = s, Object(n.setCookie)("remixseenads", s, 30))
        }
    }

    function s(e, t) {
        return !window.noAdsAtAll && (s = function() {
            return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                al_ad: null
            }
        }, stManager.add(["aes_light.js"], s.pbind(e, t)) || {
            al_ad: null
        })
    }

    function c(e) {
        if (window.noAdsAtAll) return !1;
        c = function() {
            window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
        }, stManager.add(["aes_light.js"], c.pbind(e))
    }

    function _(e, t, o, n, i, r) {
        if (window.noAdsAtAll) return !1;
        _ = function() {
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
        }, stManager.add(["aes_light.js"], _.pbind(e, t, o, n, i, r))
    }

    function l(e) {
        if (window.noAdsAtAll) return !1;
        l = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, stManager.add(["aes_light.js"], l.pbind(e))
    }
    window.__seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), window.__adsLoaded = Object(i.vkNow)(), window.__adsGetAjaxParams = s, window.__adsUpdate = c, window.__adsSet = _, window.__adsUpdateExternalStats = l
}, function(e, t, o) {
    var n = o(26),
        i = o(85);
    e.exports = function(e) {
        return function(t, o) {
            var r, a, s = String(i(t)),
                c = n(o),
                _ = s.length;
            return c < 0 || c >= _ ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === _ || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "mobileOnlineTip", function() {
        return r
    }), o.d(t, "pageVerifiedTip", function() {
        return a
    }), o.d(t, "audioShowActionTooltip", function() {
        return s
    }), o.d(t, "mentionOver", function() {
        return c
    });
    var n = o(142),
        i = o(32);

    function r(e, t) {
        var o = t.asrtl ? 0 : t.right ? 289 : 35,
            i = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
        return Object(n.showTooltip)(e, {
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
            className: "mobile_tt" + i
        })
    }

    function a(e, t) {
        return Object(n.showTooltip)(e, {
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
    }

    function s(e, t, o) {
        if (!cur._addRestoreInProgress) {
            var r = Object(i.gpeByClass)("_audio_row", e),
                a = AudioUtils.getAudioFromEl(r, !0),
                s = domData(e, "action"),
                c = AudioUtils.getRowActionName(s, a, r),
                _ = {
                    text: function() {
                        return c
                    },
                    black: 1,
                    shift: t || [7, 4, 0],
                    needLeft: !0,
                    forcetodown: o
                };
            Object(i.gpeByClass)("_im_mess_stack", e) ? (_.appendParentCls = "_im_mess_stack", _.shift = [7, 10, 0], _.noZIndex = !0) : Object(i.gpeByClass)("top_notify_wrap", e) ? _.appendParentCls = "top_notify_wrap" : Object(i.gpeByClass)("_ape_audio_item", e) && (_.appendParentCls = "_ape_audio_item"), Object(n.showTooltip)(e, _)
        }
    }

    function c(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        Object(n.showTooltip)(e, {
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
            appendEl: Object(i.domClosest)("im-page-history-w", e) || Object(i.domClosest)("rb_box_wrap", e) || Object(i.domClosest)("wk_cont", e) || Object(i.domClosest)("scroll_fix_wrap", e)
        })
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "shortCurrency", function() {
        return r
    });
    var n = o(37),
        i = o(32);

    function r() {
        var e = {};
        Object(n.each)(Object(i.geByClass)("_short_currency"), function() {
            var t = Object(i.domData)(this, "short") || "";
            if (!t) return !0;
            var o = this.innerHTML,
                r = Object(n.winToUtf)(o).length,
                a = Object(i.getStyle)(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (void 0 === e[a]) {
                for (var s = "", c = r - 1; c >= 0; c--) s += "&#8399;";
                var _ = Object(i.ce)("div", {
                    innerHTML: "<b>" + o + "</b><b>" + s + "</b>"
                }, {
                    fontFamily: a,
                    fontSize: "24px"
                });
                Object(i.ge)("utils").appendChild(_), e[a] = Math.abs(_.firstChild.offsetWidth - _.lastChild.offsetWidth) >= 2 * r, Object(i.re)(_)
            }!1 === e[a] && val(this, t)
        })
    }
    window.shortCurrency = r
}, function(e, t, o) {
    'eat script';
    var n = o(84),
        i = o(56),
        r = o(17),
        a = o(111),
        s = o(115),
        c = o(79),
        _ = o(138),
        l = o(15),
        u = o(3),
        d = o(48),
        p = o(108),
        f = o(114);
    e.exports = function(e, t, o, h, w, b) {
        var v = n[e],
            g = v,
            m = w ? "set" : "add",
            O = g && g.prototype,
            y = {},
            E = function(e) {
                var t = O[e];
                r(O, e, "delete" == e ? function(e) {
                    return !(b && !l(e)) && t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return !(b && !l(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return b && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, o) {
                    return t.call(this, 0 === e ? 0 : e, o), this
                })
            };
        if ("function" == typeof g && (b || O.forEach && !u(function() {
                (new g).entries().next()
            }))) {
            var k = new g,
                j = k[m](b ? {} : -0, 1) != k,
                C = u(function() {
                    k.has(1)
                }),
                P = d(function(e) {
                    new g(e)
                }),
                x = !b && u(function() {
                    for (var e = new g, t = 5; t--;) e[m](t, t);
                    return !e.has(-0)
                });
            P || ((g = t(function(t, o) {
                _(t, g, e);
                var n = f(new v, t, g);
                return void 0 != o && c(o, w, n[m], n), n
            })).prototype = O, O.constructor = g), (C || x) && (E("delete"), E("has"), w && E("get")), (x || j) && E(m), b && O.clear && delete O.clear
        } else g = h.getConstructor(t, e, w, m), a(g.prototype, o), s.NEED = !0;
        return p(g, e), y[e] = g, i(i.G + i.W + i.F * (g != v), y), b || h.setStrong(g, e, w), g
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
    var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);

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
            var s = new CallHub(function() {
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
            if (window._videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                var container = domByClass(videoWrap, "video_box_wrap");
                isFunction(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded);
                var linkAttr = attr(thumb, "data-link-attr");
                linkAttr && (opts.player.params[0].link_attr = linkAttr), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
            }
            try {
                eval("(function () {" + js + "})();")
            } catch (e) {}
            if (!params.from_autoplay) {
                var notifier = window.Notifier;
                notifier && setTimeout(function() {
                    return notifier.lcSend("video_start")
                }, 0);
                var audioPlayer = window.ap;
                audioPlayer && audioPlayer.isPlaying() && (audioPlayer.pause(), audioPlayer.pausedByVideo = vkNow())
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
        var n = extend({
            autoplay: 0,
            module: cur.module
        }, e);
        trim(n.module) || (n._nol = JSON.stringify(nav.objLoc));
        var i = ["videoview.js"];

        function r(e, o) {
            isFunction(t) && t(e, o)
        }
        n.from_autoplay && i.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", n, {
            onDone: function() {
                r(!0, [].slice.call(arguments))
            },
            onFail: function() {
                return r(!1, [].slice.call(arguments)), !0
            },
            stat: i,
            local: 1,
            cache: o
        })
    }

    function revertLastInlineVideo(e) {
        if (_videoLastInlined) {
            var t = void 0,
                o = !1,
                n = ge(e);
            if (n && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == n) {
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
                var o = void 0,
                    n = void 0,
                    i = ce("video");
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
                e(t, r), clearTimeout(o), i.src = "", i.load(), i.onerror = null, i.onloadedmetadata = null, i = null
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
            var _ = Number(arguments[a]);
            if (!isFinite(_) || _ < 0 || _ > 1114111 || r(_) != _) throw RangeError("Invalid code point: " + _);
            _ <= 65535 ? n.push(_) : (t = 55296 + ((_ -= 65536) >> 10), o = _ % 1024 + 56320, n.push(t, o)), (a + 1 == s || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
        }
        return c
    }, n ? n(String, "fromCodePoint", {
        value: a,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = a)
}, function(e, t, o) {
    e.exports = !o(135) && !o(3)(function() {
        return 7 != Object.defineProperty(o(12)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    var o = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = o)
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "_initCookies", function() {
        return i
    }), o.d(t, "getCookie", function() {
        return r
    }), o.d(t, "setCookie", function() {
        return a
    }), o.d(t, "hideCookiesPolicy", function() {
        return s
    });
    var n = o(32);

    function i() {
        _cookies = {};
        for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
            var i = e[o].split("=");
            2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
        }
    }

    function r(e) {
        return i(), _cookies[e]
    }

    function a(e, t, o, n) {
        var i = "";
        if (o) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
        }
        var a = window.locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (a ? "; domain=." + a : "") + (n && "https:" === locProtocol ? "; secure" : "")
    }

    function s() {
        Object(n.re)("cookies_policy_wrap"), ajax.post("/settings", {
            act: "a_hide_cookies_policy"
        })
    }
    window._cookies = {}, window._initCookies = i, window.getCookie = r, window.setCookie = a, window.hideCookiesPolicy = s
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "TopNotifier", function() {
        return c
    }), o.d(t, "isPhotoeditor3Available", function() {
        return _
    }), o.d(t, "showPhoto", function() {
        return l
    }), o.d(t, "showManyPhoto", function() {
        return u
    }), o.d(t, "showAlbums", function() {
        return d
    }), o.d(t, "showAlbum", function() {
        return p
    }), o.d(t, "showPhotoTags", function() {
        return f
    }), o.d(t, "showVideoTags", function() {
        return h
    }), o.d(t, "videoCallback", function() {
        return w
    }), o.d(t, "showWiki", function() {
        return b
    }), o.d(t, "showApp", function() {
        return v
    }), o.d(t, "showPodcast", function() {
        return g
    }), o.d(t, "articlePrepare", function() {
        return m
    }), o.d(t, "isArticleEditorAvailable", function() {
        return O
    }), o.d(t, "openArticleEditor", function() {
        return y
    }), o.d(t, "bookmark", function() {
        return E
    }), o.d(t, "bookmarkPost", function() {
        return k
    }), o.d(t, "bookmarkArticle", function() {
        return j
    }), o.d(t, "bookmarkPodcast", function() {
        return C
    }), o.d(t, "shareAudioPlaylist", function() {
        return P
    }), o.d(t, "getAudioPlayer", function() {
        return x
    }), o.d(t, "deleteAudioOnClaim", function() {
        return T
    }), o.d(t, "initTopAudioPlayer", function() {
        return M
    }), o.d(t, "AudioMessagePlayer", function() {
        return L
    }), o.d(t, "mentionClick", function() {
        return D
    });
    var n = o(132),
        i = o(37),
        r = o(78),
        a = o(32),
        s = ["notifier.js", "notifier.css"],
        c = {
            preload: function() {
                stManager.add(s, function() {
                    return window.TopNotifier.preload()
                })
            },
            show: function(e) {
                if (!0 !== Object(n.checkEvent)(e)) return stManager.add(s, function() {
                    return window.TopNotifier.show(e)
                }), Object(n.cancelEvent)(e)
            },
            showTooltip: function(e) {
                stManager.add(s, function() {
                    return window.TopNotifier.showTooltip(e)
                })
            },
            invalidate: function() {},
            setCount: function() {}
        };

    function _() {
        return !browser.msie || parseInt(browser.version) > 10
    }

    function l(e, t, o, i) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!(Object(n.checkEvent)(i) || cur._editMode && cur._editMode(i))) {
            var r = ["photoview.js", "photoview.css", "page.js", "page.css"];
            if (o.img && (o.showProgress = function() {
                    showProgress(o.img)
                }, o.hideProgress = function() {
                    hideProgress(o.img)
                }), !e) return !1;
            if (window.Photoview && !1 === Photoview.showPhoto(e, t, o)) return !1;
            var a = !0;
            o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(r, function() {
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
                    Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), a && ("deleted" === n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                },
                stat: r,
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
    }

    function u(e, t, o, n) {
        Page.showManyPhoto(e, t, o, n)
    }

    function d(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbums(e, t)
        }), !1)
    }

    function p(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbum(e, t)
        }), !1)
    }

    function f(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showTagged(e, t)
        }), !1)
    }

    function h(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
            Photoview.showVideoTags(e, t)
        }), !1)
    }

    function w(e) {
        var t = e.shift();
        if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
        throw Error("Unregistered player callback: " + t)
    }

    function b(e, t, o) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (Object(n.checkEvent)(o)) return !0;
        if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw === e.w && e.w && !e.reply) return WkView.restoreLayer(i), Object(n.cancelEvent)(o);
        (window.wkcur && wkcur.hideTitle || e.hide_title) && (i.hide_title = e.hide_title = 1);
        var r = i.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
        t && r.push("wk_editor.js", "wk_editor.css");
        var a = {
            stat: r,
            loader: !i.noloader,
            onDone: function(e, t, n, r) {
                WkView.show(e, t, extend(n, i), r, o)
            },
            onFail: function(e) {
                return WkView.showError(e)
            }
        };
        if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" === e.w.substr(-6)) {
            var s = clone(nav.objLoc);
            delete s[0], delete s.w, e.query = JSON.stringify(s)
        }
        i.preload && extend(a, i.preload);
        var c = void 0,
            _ = void 0;
        return i.ads_params && (c = i.ads_params, (_ = nav.getPostParams(o && o.target)).post_click_url && (c._post_click_url = _.post_click_url)), ajax.post("wkview.php", extend({
            act: "show",
            loc: nav.objLoc[0],
            is_znav: i.isZnav
        }, e, c, cur.getWkviewOpts && cur.getWkviewOpts()), a), Object(n.cancelEvent)(o)
    }

    function v(e, t, o, n, r, a) {
        a || (a = {});
        var s = !1,
            c = extend({
                w: "app" + t
            }, a);
        if (o = Object(i.intval)(o), n && (Object(i.isObject)(n) ? c = extend(c, n) : c.ref = n), a.layer && (s = !0), (cur.apps && cur.apps[t] || !o) && !s) {
            delete c.w;
            var _ = "app" + t + (r ? "_" + r : ""),
                l = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === _;
            return nav.go("/" + _ + nav.toStr(c), e, {
                nocur: l
            })
        }
        r && (c.mid = r);
        var u = {
            stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
        };
        return a.queue && (u.queue = 1), a.urlHash && (c.url_hash = a.urlHash), b(c, !1, e, u)
    }

    function g(e, t) {
        if (!vk.widget) return show(boxLoader), show(boxLayerWrap), boxRefreshCoords(boxLoader), stManager.add([jsc("web/podcast.js")], function() {
            Podcast.show(e)
        }), t && Object(n.cancelEvent)(t)
    }

    function m(e) {
        e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            window.ArticleLayer.prepare(e)
        })
    }

    function O() {
        return !(browser.msie && parseInt(browser.version) <= 11)
    }

    function y(e, t, o) {
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
                    return Object(r.showFastBox)(getLang("global_error"), e), !0
                },
                onDone: function(e, t, i, r) {
                    window.WkView && WkView.hide(), window.__bq && __bq.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
                        layers.fullhide = function() {
                            cur.articleEditorLayer && cur.articleEditorLayer.hide()
                        }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, i, r, function() {
                            return delete cur.articleEditorLayer
                        })
                    }) : nav.change({
                        z: !1
                    })
                }
            })
        }
    }

    function E(e, t, o, n) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        ajax.post("al_bookmarks.php", {
            act: "bookmark",
            owner_id: e,
            object_id: t,
            type: o,
            state: i ? 1 : 0,
            hash: n
        }, {
            onDone: function(e) {
                e && window.showDoneBox(e)
            }
        })
    }

    function k(e, t, o, n, i) {
        var r = parseInt(Object(a.domData)(e, "state"));
        e.innerHTML = r ? Object(a.domData)(e, "add") : Object(a.domData)(e, "remove"), Object(a.domData)(e, "state", r ? 0 : 1), E(t, o, n, i, r)
    }

    function j(e, t, o, i, r, s) {
        var c = parseInt(Object(a.domData)(t, "state"));
        return Object(a.domData)(t, "state", c ? 0 : 1), E(o, i, r, s, c), Object(n.cancelEvent)(e)
    }

    function C(e, t, o) {
        stManager.add([jsc("web/podcast.js")], function() {
            Podcast.toggleFave(e, t, o)
        })
    }

    function P(e, t, o, i) {
        return Object(r.showBox)("like.php", {
            act: "publish_box",
            object: "audio_playlist" + t + "_" + o,
            list: i
        }, {
            stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
        }), Object(n.cancelEvent)(e)
    }

    function x() {
        return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : {}
    }

    function T(e, t) {
        var o = geByClass1("_audio_row_" + (e + "_" + t));
        AudioUtils.deleteAudio(o, AudioUtils.getAudioFromEl(o, !0)), cur.claimWarning && cur.claimWarning.hide()
    }

    function M() {
        stManager.add(["audioplayer.js"], function() {
            window.TopAudioPlayer.init()
        })
    }
    var L = {
        loaded: !1,
        togglePlay: function(e, t) {
            stManager.add("voice_message_player.js", function() {
                return window.AudioMessagePlayer.togglePlay(e, t)
            })
        },
        detachPlayer: function(e) {
            stManager.add("voice_message_player.js", function() {
                return window.AudioMessagePlayer.detachPlayer(e)
            })
        }
    };

    function D(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        e && e.tt && e.tt.hide && e.tt.hide({
            fasthide: 1
        });
        var n = e,
            i = !1;
        if (cur.articleLayer && cur.articleLayer.isStandalone() && (i = !0), n.tagName && "a" === n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
            var r = n.getAttribute("hrefparams");
            r && (o.params = extend(o.params || {}, q2ajx(r))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, ""));
            var a = void 0;
            (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(a = n.match(/^\/(.*?)(\?|#|$)/)) ? i = !0 : ((a = a[1]).indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (i = !0)
        }
        if (i) {
            if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
            e.setAttribute("data-change-location-with-post-away", 1), n = e
        }
        return nav.go(n, t, o)
    }
}, function(e, t, o) {
    var n = o(77),
        i = o(128),
        r = o(40)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(32),
        i = o(76),
        r = o(37),
        a = {
            _waiters: [],
            _wait: function() {
                var e = a._waiters.length,
                    t = {},
                    o = [];
                if (!e) return clearInterval(a._waitTimer), void(a._waitTimer = !1);
                for (var s = 0; s < e; ++s) {
                    for (var c = a._waiters[s][0], _ = 0, l = c.length; _ < l; ++_) {
                        var u = c[_];
                        if (!t[u])
                            if (StaticFiles[u].l || "css" !== StaticFiles[u].t || "none" !== Object(n.getStyle)(StaticFiles[u].n, "display") || a.done(u), StaticFiles[u].l) t[u] = 1;
                            else if (t[u] = -1, vk.loaded) {
                            var d = ++StaticFiles[u].c;
                            (d > a.lowlimit && stVersions[u] > 0 || d > a.highlimit) && (stVersions[u] < 0 ? (Object(i.topError)("<b>Error:</b> Could not load <b>" + u + "</b>.", {
                                dt: 5,
                                type: 1,
                                msg: "Failed to load with " + a.lowlimit + "/" + a.highlimit + " limits (" + (Object(r.vkNow)() - vk.started) / 100 + " ticks passed)",
                                file: u
                            }), StaticFiles[u].waitersLength = 1, t[u] = 1) : (Object(i.topMsg)("Some problems with loading <b>" + u + "</b>...", 5), stVersions[u] = Object(r.irand)(-1e4, -1), a._add(u, StaticFiles[u])))
                        }
                        t[u] > 0 && (c.splice(_, 1), --_, --l)
                    }
                    c.length || (o.push(a._waiters.splice(s, 1)[0][1]), s--, e--)
                }
                for (var p = 0, f = o.length; p < f; ++p) o[p]()
            },
            _addCss: function(e, t) {
                var o = Object(n.ce)("style", {
                        type: "text/css",
                        media: "screen"
                    }),
                    i = Object(n.domNS)(t);
                return i ? headNode.insertBefore(o, i) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
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
                    i = stVersions[e],
                    r = e + "?" + i,
                    s = a._srcPrefix(e, i);
                if (StaticFiles[e] = {
                        v: i,
                        n: o,
                        l: 0,
                        c: 0
                    }, -1 !== e.indexOf(".js")) {
                    var c = "/js/";
                    if (stTypes.fromLib[e] ? c += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? c += jsc("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 !== e.indexOf("/") || (c += "al/"), StaticFiles[e].t = "js", e === jsc("web/common_web.js")) setTimeout(a.done.bind(a).pbind(jsc("web/common_web.js")), 0);
                    else {
                        var _ = s + c + r;
                        a._insertNode(_, e), StaticFiles[e].src = _
                    }
                } else if (-1 !== e.indexOf(".css")) {
                    var l = s + ("/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 !== e.indexOf("/") ? "" : "al/")) + r;
                    t && t.l && "css" === t.t && (StaticFiles[e].styleNode = a._addCss("#" + o + " {display: block; }", a._getOldNode(l))), a._insertNode(l, e), StaticFiles[e].t = "css", StaticFiles[e].src = l, ge(o) || utilsNode.appendChild(Object(n.ce)("div", {
                        id: o
                    }))
                }
            },
            _getOldNode: function(e) {
                return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
            },
            _insertNode: function(e, t) {
                var o = e.split("?")[0].match(/\.css$/),
                    i = a._getOldNode(e);
                o && StaticFiles[t] && StaticFiles[t].styleNode ? i = Object(n.domNS)(StaticFiles[t].styleNode) : i && (i = Object(n.domNS)(i));
                var r = void 0;
                o ? (r = Object(n.ce)("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: e
                })).onload = function() {
                    a._removeDuplicateNodes(t)
                } : r = Object(n.ce)("script", {
                    type: "text/javascript",
                    src: e
                }), i ? headNode.insertBefore(r, i) : headNode.appendChild(r)
            },
            _removeDuplicateNodes: function(e) {
                var t = StaticFiles[e];
                if (t && t.src) {
                    var o = t.src.split("?")[0],
                        i = a._getOldNode(o);
                    if (i) {
                        t.styleNode && (Object(n.re)(t.styleNode), delete StaticFiles[e].styleNode);
                        for (var r = o.match(/\.css$/); i && (i = Object(n.domNS)(i));) {
                            var s = r ? i.href : i.src;
                            if (!s) break;
                            if ((s = s.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                            Object(n.re)(Object(n.domPS)(i))
                        }
                    }
                }
            },
            add: function(e, t, o) {
                var n = [],
                    i = document.documentElement;
                for (var s in Object(r.isArray)(e) || (e = [e]), e)
                    if (e.hasOwnProperty(s)) {
                        var c = e[s];
                        if (c) {
                            -1 !== c.indexOf("?") && (c = c.split("?")[0]), /^lang\d/i.test(c) ? stVersions[c] = stVersions.lang : stVersions[c] || (stVersions[c] = 1), (browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !browser.iphone && !browser.ipad && c !== jsc("web/common_web.js") && "common.css" !== c && stVersions[c] > 0 && stVersions[c] < 1e9 && (stVersions[c] += Object(r.irand)(1e9, 2e9));
                            var _ = StaticFiles[c];
                            _ && _.v == stVersions[c] || a._add(c, _), t && !StaticFiles[c].l && n.push(c)
                        }
                    }
                if (t) {
                    if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                    a._waiters.push([n, t]), a._waitTimer || (a._waitTimer = setInterval(a._wait, 100))
                }
            },
            done: function(e) {
                stVersions[e] < 0 && Object(i.topMsg)('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && a._removeDuplicateNodes(e)
            }
        };
    window.stManager = a, window.__stm = a
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "cancelStackFilter", function() {
        return i
    }), o.d(t, "cancelStackPush", function() {
        return r
    }), o.d(t, "cancelStackPop", function() {
        return a
    });
    var n = o(31);

    function i(e, t) {
        var o = window.cancelStack || [];
        return t && Object(n.topHeaderClearClose)(), window.cancelStack = o.filter(function(t) {
            return t.name !== e
        }), window.cancelStack
    }

    function r(e, t, o) {
        return o && Object(n.topHeaderClose)(function() {
            t(), i(e)
        }), window.cancelStack = i(e).concat([{
            func: t,
            name: e,
            dclick: o
        }]), window.cancelStack
    }

    function a() {
        var e = window.cancelStack || [];
        Object(n.topHeaderClearClose)(), e.length > 0 && e.pop().func();
        var t = e[e.length - 1];
        return t && t.dclick && Object(n.topHeaderClose)(function() {
            t.func(), i(t.name)
        }), window.cancelStack = e, window.cancelStack
    }
}, function(e, t, o) {
    var n = o(71);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, o) {
    'eat script';
    var n = o(69).f,
        i = o(60),
        r = (o(34), o(111)),
        a = o(133),
        s = o(138),
        c = o(85),
        _ = o(79),
        l = o(137),
        u = o(101),
        d = o(20),
        p = o(135),
        f = o(115).fastKey,
        h = p ? "_s" : "size",
        w = function(e, t) {
            var o, n = f(t);
            if ("F" !== n) return e._i[n];
            for (o = e._f; o; o = o.n)
                if (o.k == t) return o
        };
    e.exports = {
        getConstructor: function(e, t, o, l) {
            var u = e(function(e, n) {
                s(e, u, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[h] = 0, void 0 != n && _(n, o, e[l], e)
            });
            return r(u.prototype, {
                clear: function() {
                    for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                    this._f = this._l = void 0, this[h] = 0
                },
                delete: function(e) {
                    var t = w(this, e);
                    if (t) {
                        var o = t.n,
                            n = t.p;
                        delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[h]--
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
            }), p && n(u.prototype, "size", {
                get: function() {
                    return c(this[h])
                }
            }), u
        },
        def: function(e, t, o) {
            var n, i, r = w(e, t);
            return r ? r.v = o : (e._l = r = {
                i: i = f(t, !0),
                k: t,
                v: o,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = r), n && (n.n = r), e[h]++, "F" !== i && (e._i[i] = r)), e
        },
        getEntry: w,
        setStrong: function(e, t, o) {
            l(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                return this._t && (this._l = t = t ? t.n : this._t._f) ? u(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, u(1))
            }, o ? "entries" : "values", !o, !0), d(t)
        }
    }
}, function(e, t) {
    var o = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(127),
        core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51),
        _polyfill_from_code_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92),
        _polyfill_array_find_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(122),
        _polyfill_array_from_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10),
        _polyfill_object_assign_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55),
        _polyfill_number_isinteger_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(110),
        _polyfill_canvas_to_blob__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(131),
        es6_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(25),
        _lib_ee__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5),
        _lib_polyfills__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(54),
        _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(76),
        _lib_cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(95),
        _lib_ajax__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(24),
        _lib_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38),
        _lib_element_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(57),
        _lib_favicon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(50),
        _lib_flash__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(19),
        _lib_fx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(28),
        _lib_history_and_bookmarks__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(120),
        _lib_lang__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(65),
        _lib_layers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(75),
        _lib_ls__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(107),
        _lib_market__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(89),
        _lib_scroll__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(14),
        _lib_static_manager__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(98),
        _lib_stats__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(70),
        _lib_ui__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(109),
        _lib_video__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(91),
        _lib_scripts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(106),
        _lib_global_search__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(73),
        _lib_top_search__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(31),
        _lib_nav__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(4),
        _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(124),
        _lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(47),
        _shared_constants_groups__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(134),
        _lib_date__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(36),
        _lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(7),
        _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(39),
        _lib_message_box__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(78),
        _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(126),
        _lib_feature_tooltips__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(88),
        _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(81),
        _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(96),
        _lib_tooltip_utils__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(142),
        _lib_legacy__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(83),
        _lib_long_view__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(119),
        _lib_accessibility__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(6),
        _lib_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(58),
        _lib_input_utils__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(1),
        _lib_global_handlers__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(66),
        _lib_utils__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(125),
        _lib_cancel_stack__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(99),
        _lib_dom__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(32);

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    es6_promise__WEBPACK_IMPORTED_MODULE_8__.polyfill(), window.Map = core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__, window.Set = core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__, Object(_lib_dom__WEBPACK_IMPORTED_MODULE_53__.initDomScripts)(), Object(_lib_ajax__WEBPACK_IMPORTED_MODULE_13__.initAjax)();
    var _window = window,
        vk = _window.vk;

    function nodeUpdated(e, t) {
        setStyle(e, {
            backgroundColor: "#F5F7FA"
        }), Object(_lib_fx__WEBPACK_IMPORTED_MODULE_18__.animate)(e, {
            backgroundColor: "#FFF"
        }, t || 6e3, function(e) {
            setStyle(e, {
                backgroundColor: null
            })
        })
    }
    1 === vk.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== vk.al || history.pushState || (vk.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), vk.version = !1), window.stVersions || (window.navMap = window.stVersions = window.stTypes = {}, window._rnd = 1), window.jsc = function(e) {
        return "cmodules/" + e
    }, window.NextPageID = 1, window.__debugMode = !0, window._wf = 0, window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.StaticFiles || (window.StaticFiles = {}), window.parseJSON = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.parseJSON, window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now(), window.cur = {
        destroy: [],
        nav: []
    }, window.browser.android && (setCookie("remixscreen_width", window.screen.width, 365), setCookie("remixscreen_height", window.screen.height, 365), setCookie("remixscreen_dpr", window.devicePixelRatio || 1, 365)), setCookie("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), each(StaticFiles, function(e, t) {
        t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
    }), window.locHost = location.host, window.locProtocol = location.protocol, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window.locHash = location.hash.replace("#/", "").replace("#!", ""), window.nodeUpdated = nodeUpdated, Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__.initDebugTools)(), window.debugLog = _lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__.debugLog, window.debugEl = _lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__.debugEl;
    var reopen = function() {
        re(window._opener), window._opener = utilsNode.appendChild(ce("iframe"))
    };

    function tnActive(e) {
        window.tnAct = e, addClass(e, "active")
    }

    function tnInactive() {
        removeClass("head_music", "head_play_down"), removeClass("top_logo_down", "tld_d"), removeClass(window.tnAct, "active")
    }

    function _stlClick(e) {
        return checkEvent(e) || cancelEvent(e)
    }

    function _stlMousedown(e) {
        if (e = e || window.event, !checkEvent(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                _stlWas = 0, scrollToY(t, 0, !0, !0), Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.updateLeftMenu)(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (_stlWas = scrollGetY(), scrollToY(0, 0, !0, !0), Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.updateLeftMenu)())
    }

    function _stlMouseover(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" === t.type && (t.pageX > 0 || t.clientX > 0);
        toggleClass(_stlLeft, "over", o), toggleClass(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), toggleClass(_stlSide, "over", o)
    }
    addEvent(window, "unload", function() {
        for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && removeEvent(vkCache[e].handle.elem)
    }), addEvent(window, "DOMContentLoaded load", function() {
        vk.loaded || (vk.loaded = !0, Object(_lib_ui__WEBPACK_IMPORTED_MODULE_27__.updSideTopLink)()), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.checkPageBlocks)()
    }), window.tnActive = tnActive, addEvent(window, "mouseup dragstart", tnInactive), addEvent(document, "mouseup dragstart", tnInactive), addEvent(document, "mousedown", function(e) {
        window._wf = 1, cur.__mdEvent = e
    }), window.updateHeaderStyles = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.updateHeaderStyles, window.updateNarrow = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.updateNarrow, window.checkPageBlocks = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.checkPageBlocks, window.redraw = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.redraw, window.onBodyResize = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyResize, window.onBodyScroll = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyScroll, window.onDocumentClick = _lib_global_handlers__WEBPACK_IMPORTED_MODULE_50__.onDocumentClick, window.onEnter = _lib_global_handlers__WEBPACK_IMPORTED_MODULE_50__.onEnter, window.onCtrlEnter = _lib_global_handlers__WEBPACK_IMPORTED_MODULE_50__.onCtrlEnter, vk.width = 960;
    var initedCheck = 0,
        needBlur = !1;

    function initStl() {
        var e = {
            onclick: _stlClick,
            onmousedown: _stlMousedown,
            onmouseover: _stlMouseover,
            onmouseout: _stlMouseover
        };
        val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang("global_to_top") + "</nobr></div>"), extend(_stlLeft, e), extend(_stlSide, e), window._stlBg = _stlLeft.firstChild, window._stlText = window._stlBg.firstChild, addEvent(window, "blur", function() {
            window._wf = -1, needBlur = !1
        });
        var t = !0;
        addEvent(window, "focus", function() {
            window._wf = 1, needBlur || (window.__afterFocus = needBlur = !0, setTimeout(function() {
                window.__afterFocus = !1
            }, 10), t && (Object(_lib_ui__WEBPACK_IMPORTED_MODULE_27__.sbWidth)(!0), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyResize)(!0), t = !1))
        })
    }

    function onDomReady(e) {
        e()
    }
    window.domStarted = function() {
        if (window.headNode = geByTag1("head"), window.icoNode = geByTag1("link", headNode), window.bodyNode = geByTag1("body"), window.htmlNode = geByTag1("html"), window.utilsNode = ge("utils"), window._fixedNav = !1, window._tbLink = {}, addEvent(bodyNode, "resize", _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyResize.pbind(!1)), utilsNode) {
            browser.mozilla ? addClass(bodyNode, "firefox") : browser.mobile && addClass(bodyNode, "mobfixed"), Object(_lib_legacy__WEBPACK_IMPORTED_MODULE_45__.initLegacyBrowserDetectionInAttribute)(), each(StaticFiles, function(e, t) {
                t.l = 1, "css" === t.t && utilsNode.appendChild(ce("div", {
                    id: t.n
                }))
            });
            var e = ge("layer_bg"),
                t = e.nextSibling,
                o = ge("box_layer_bg"),
                n = o.nextSibling;
            window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = n, window.boxLayer = n.firstChild, window.boxLoader = n.firstChild.firstChild, window._stlSide = ge("stl_side"), window._stlLeft = ge("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, reopen(), browser.mobile || initStl(), addEvent(n, "click", __bq.hideLastCheck), window.LazyLoad && LazyLoad.watch(n), window.layers = Object(_lib_layers__WEBPACK_IMPORTED_MODULE_21__.initLayers)(e, t, o, n), hab.init(), window._retinaInit ? window._retinaInit() : initedCheck = 1
        }
    }, vk.started = vkNow(), window.domReady = function() {
        if (utilsNode) {
            Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.updateSTL)();
            var e = ge("side_bar");
            extend(window, {
                pageNode: ge("page_wrap"),
                _fixedNav: e && "fixed" === getStyle(e, "position"),
                _tbLink: ge("top_back_link")
            }), browser.chrome || browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = browser.safari ? bodyNode : htmlNode;
            var t = Math.max(vkNow() - vk.started, 10),
                o = intval((vk.contlen || 1) / t * 1e3);
            if (browser.mozilla && browser.version >= 4 ? o /= 2.5 : browser.mozilla ? o *= 1.5 : browser.msie && browser.version >= 7 ? o /= 1.5 : browser.msie && (o *= 2.5), stManager.lowlimit = intval(150 * Math.max(2e6 / o, 1)), stManager.highlimit = 6 * stManager.lowlimit, stManager.lowlimit = Math.min(stManager.lowlimit, 600), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyResize)(), setTimeout(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyResize.pbind(!1), 0), Object(_lib_accessibility__WEBPACK_IMPORTED_MODULE_47__.updateAriaElements)(), window.addEventListener("scroll", _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.onBodyScroll, {
                    passive: !0
                }), window.debuglogInit && debuglogInit(), !vk.id && ls.checkVersion() && ls.get("last_reloaded")) try {
                var n = {};
                each(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                    var o = ls.get(t);
                    null !== o && (n[t] = o)
                }), window.localStorage.clear(), each(n, function(e, t) {
                    return ls.set(e, t)
                })
            } catch (e) {}
        }
    }, Object(_lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_34__.subscribePerformanceLoggerCollectors)(), window.onDomReady = onDomReady;
    var hab = new window.HistoryAndBookmarks({
        onLocChange: function(e) {
            var t = {
                back: !0,
                hist: !0
            };
            3 === vk.al && history.state && isObject(history.state) && (t.scrollTop = intval(history.state.scrollTop)), nav.go("/" + e, void 0, t)
        }
    });

    function __qlClear() {
        clearTimeout(window.__qlTimer), setTimeout(function() {
            return clearTimeout(window.__qlTimer)
        }, 2e3)
    }

    function storePasswordCredential(e) {
        if (browserFeatures.cmaEnabled && window.ResizeObserver) {
            var t = new PasswordCredential({
                id: ge("quick_email").value,
                password: ge("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }
    window.hab = hab, window.leftBlockOver = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.leftBlockOver, window.leftBlockOut = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.leftBlockOut, window.leftBlockHide = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.leftBlockHide, window.hideNewsAnnounce = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.hideNewsAnnounce, window.leftAdBlockClose = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.leftAdBlockClose, window.leftBlockToggleFriend = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.leftBlockToggleFriend, window.leftBlockFriendTooltip = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.leftBlockFriendTooltip, vk.counts = {}, window.handlePageView = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.handlePageView, window.handlePageParams = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.handlePageParams, window.handlePageCount = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.handlePageCount, window.comScoreUDM = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.comScoreUDM, window.updateOtherCounters = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.updateOtherCounters, window.processDestroy = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.processDestroy, window.globalHistoryDestroy = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.globalHistoryDestroy, window.showBackLink = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.showBackLink, window.nav = _lib_nav__WEBPACK_IMPORTED_MODULE_32__.default, nav.init(), vk.time && !window.browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 === t[1] && 12 === vk.time[1] ? vk.time[1] = 0 : 12 === t[1] && 1 === vk.time[1] ? t[1] = 0 : (t[1] > vk.time[1] + 1 || vk.time[1] > t[1] + 1) && (t[1] = vk.time[1] = t[2] = vk.time[2] = 0), t[1] > vk.time[1] && 1 === t[2] ? 31 === vk.time[2] || (4 === vk.time[1] || 6 === vk.time[1] || 9 === vk.time[1] || 11 === vk.time[1]) && 30 === vk.time[2] || 2 === vk.time[1] && (29 === vk.time[2] || 28 === vk.time[2] && vk.time[0] % 4) ? vk.time[2] = 0 : vk.time[2] = t[2] = 0 : vk.time[1] > t[1] && 1 === vk.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && vk.time[0] % 4) ? t[2] = 0 : t[2] = vk.time[2] = 0), (t[2] > vk.time[2] + 1 || vk.time[2] > t[2] + 1) && (t[2] = vk.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - vk.time[2]) + (t[3] - vk.time[3])) + (t[4] - vk.time[4]));
        o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o);
        each([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
            var r = Math.round(3600 * (t - 3)),
                a = Math.abs(o - r);
            a < i && (i = a, n = r)
        }), vk.dt = n, getCookie("remixdt") !== vk.dt && setCookie("remixdt", vk.dt, 365);
        var r = intval(getCookie("remixrt"));
        window.devicePixelRatio >= 2 && (!browser.iphone || getCookie("remixme")) ? 1 & r || (setCookie("remixrt", 1 | r, 365), window._retinaInit = function() {
            stManager.add(["retina.css"]), addClass(document.body, "is_2x")
        }, initedCheck && window._retinaInit()) : 1 & r && setCookie("remixrt", 1 ^ r, 365)
    }, 0), window.placeholderSetup = _lib_input_utils__WEBPACK_IMPORTED_MODULE_49__.placeholderSetup, window.placeholderInit = _lib_input_utils__WEBPACK_IMPORTED_MODULE_49__.placeholderInit, window.isInputActive = _lib_input_utils__WEBPACK_IMPORTED_MODULE_49__.isInputActive, window.__bq = _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.boxQueue, window.boxQueue = _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.boxQueue, window.curBox = _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.curBox, Object(_lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.initBoxQueue)(), window.browser.mobile || addEvent(document, "keydown", _lib_global_handlers__WEBPACK_IMPORTED_MODULE_50__.handleGlobalEsc), window.boxRefreshCoords = _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.boxRefreshCoords, window.MessageBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.MessageBox, window.showBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showBox, window.showTabbedBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showTabbedBox, window.showFastBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showFastBox, window.showCaptchaBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showCaptchaBox, window.showReCaptchaBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showReCaptchaBox, window.checkTextLength = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.checkTextLength, window.autosizeSetup = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.autosizeSetup, window.goAway = function(e, t, o) {
        if (-1 !== (t || {}).h || checkEvent(o)) return !0;
        if (-1 !== (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." !== n[1].toLowerCase()) return location.href = e, !1;
            var i = intval(getCookie("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_lib_ajax__WEBPACK_IMPORTED_MODULE_13__.locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var r = extend({
            act: "a_go",
            to: e
        }, t || {});
        return !Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showBox)("away.php", r, {}, o)
    }, window.showAudioClaimWarning = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.showAudioClaimWarning, window.sureDeleteAll = function(title, text, where, objectId, toId, fromId, hash, event) {
        if (!checkEvent(event)) {
            var box = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showFastBox)({
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
                        if (__debugMode) eval(res);
                        else try {
                            eval(res)
                        } catch (e) {
                            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__.logEvalError)(e, res)
                        }
                        box.hide()
                    },
                    showProgress: _lib_ui__WEBPACK_IMPORTED_MODULE_27__.lockButton.pbind(btn),
                    hideProgress: _lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockButton.pbind(btn)
                })
            }, getLang("global_cancel"));
            return !1
        }
    }, window.__qlTimer = null, window.__qlClear = __qlClear, window.onLoginDone = function(e, t) {
        __qlClear(), storePasswordCredential(t), nav.reload({
            force: !0,
            from: 6
        })
    }, window.onLogout = function() {
        if (__qlClear(), audioPlayer && audioPlayer.stop(), window.Notifier && Notifier.standby(), window.FastChat && FastChat.standby(), window.Page && Page.postsClear(), ls.checkVersion()) try {
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
        __qlClear(), Object(_lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockButton)(window.__qfBtn), window.qloginBox = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                ge("quick_captcha_sid").value = e, ge("quick_captcha_key").value = t, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.onLoginReCaptcha = function(e, t) {
        __qlClear(), Object(_lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockButton)(window.__qfBtn), window.qloginBox = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_39__.showReCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e) {
                ge("quick_recaptcha").value = e, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.storePasswordCredential = storePasswordCredential;
    var CallHub = function() {
        function e(t, o) {
            _classCallCheck(this, e), this.count = o || 1, this.func = t
        }
        return e.prototype.done = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.count -= e, this.count <= 0 && this.func()
        }, e
    }();

    function handleScroll(e) {
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
    }
    window.callHub = CallHub, window.CallHub = CallHub, window.showWriteMessageBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.showWriteMessageBox, window.giftsBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.giftsBox, window.moneyTransferBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.moneyTransferBox, window.reportAd = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.reportAd, window.gSearch = new _lib_global_search__WEBPACK_IMPORTED_MODULE_30__.default, window.showTooltip = _lib_tooltip_utils__WEBPACK_IMPORTED_MODULE_44__.showTooltip, window.showTitle = _lib_tooltip_utils__WEBPACK_IMPORTED_MODULE_44__.showTitle, window.showHint = _lib_tooltip_utils__WEBPACK_IMPORTED_MODULE_44__.showHint, window.updateMoney = function(e, t) {
        if (void 0 !== e && !1 !== e) {
            var o = "";
            !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
            var n = geByClass("votes_balance_nom" + o);
            each(n, function(t, o) {
                return o.innerHTML = e + " " + getLang("votes_flex", e)
            });
            var i = e * (vk.vcost || 7),
                r = geByClass("money_balance_nom" + o);
            each(r, function(e, t) {
                return t.innerHTML = getLang("global_money_amount_rub", i, !0)
            }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
        }
    }, window.zNav = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_33__.zNav, window.handleScroll = handleScroll, window.topMsg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.topMsg, window.showMsg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.showMsg, window.topError = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.topError, window.showGlobalPrg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.showGlobalPrg, window.showPhoto = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showPhoto, window.showManyPhoto = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showManyPhoto, window.showAlbums = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showAlbums, window.showAlbum = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showAlbum, window.showPhotoTags = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showPhotoTags, window.showVideoTags = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showVideoTags, window.videoCallback = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.videoCallback, window.showWiki = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showWiki, window.showApp = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showApp, window.showPodcast = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.showPodcast, window.articlePrepare = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.articlePrepare, window.showDoneBox = _lib_box_utils__WEBPACK_IMPORTED_MODULE_40__.showDoneBox, window.Fx = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.Fx, window.fx = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.Fx, window.animate = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.animate, window.cubicBezier = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.cubicBezier, window.fadeTo = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.fadeTo, window.genFx = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.genFx, window.getRGB = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.getRGB, window.getColor = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.getColor, window.slideDown = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.slideDown, window.slideUp = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.slideUp, window.slideToggle = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.slideToggle, window.fadeIn = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.fadeIn, window.fadeOut = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.fadeOut, window.fadeToggle = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.fadeToggle, window.animateCount = _lib_fx__WEBPACK_IMPORTED_MODULE_18__.animateCount, window.Chat = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.Chat, window.TopMenu = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.TopMenu, window.TopNotifier = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.TopNotifier, window.TopSearch = _lib_top_search__WEBPACK_IMPORTED_MODULE_31__.default, window.mentionOver = _lib_feature_tooltips__WEBPACK_IMPORTED_MODULE_41__.mentionOver, window.mentionClick = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.mentionClick, window.menuSettings = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.menuSettings, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, window.mobilePromo = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_42__.mobilePromo, window.mobileOnlineTip = _lib_feature_tooltips__WEBPACK_IMPORTED_MODULE_41__.mobileOnlineTip, window.pageVerifiedTip = _lib_feature_tooltips__WEBPACK_IMPORTED_MODULE_41__.pageVerifiedTip, window.cssAnim = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.cssAnim, window.imagesLoader = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.imagesLoader, window.getSelectionText = function() {
        var e = "";
        return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
    }, window.getProgressBarEl = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.getProgressBarEl, window.getProgressHtml = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_38__.getProgressHtml, window.onLoaded = function(e) {
        vk.loaded ? e() : addEvent(window, "load", e)
    }, window.currentModule = function() {
        return cur.currentModule ? cur.currentModule() : cur.module
    }, window.debounce = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.debounce, window.throttle = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.throttle, window.shuffle = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.shuffle, Object(_lib_ui__WEBPACK_IMPORTED_MODULE_27__.initUiHelpers)(), window.notaBene = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.notaBene, window.updSideTopLink = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.updSideTopLink, window.createButton = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.createButton, window.actionsMenuItemLocked = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.actionsMenuItemLocked, window.lockActionsMenuItem = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.lockActionsMenuItem, window.unlockActionsMenuItem = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockActionsMenuItem, window.linkLocked = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.linkLocked, window.lockLink = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.lockLink, window.unlockLink = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockLink, window.lockButton = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.lockButton, window.unlockButton = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.unlockButton, window.buttonLocked = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.buttonLocked, window.isButtonLocked = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.isButtonLocked, window.disableButton = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.disableButton, window.sbWidth = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.sbWidth, window.isChecked = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.isChecked, window.checkbox = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.checkbox, window.disable = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.disable, window.radioval = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.radioval, window.radiobtn = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.radiobtn, window.showProgress = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.showProgress, window.hideProgress = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.hideProgress, window.disableEl = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.disableEl, window.enableEl = _lib_ui__WEBPACK_IMPORTED_MODULE_27__.enableEl, window.hashCode = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.hashCode, window.onlinePlatformClass = function(e) {
        var t = " _online";
        return e && (t += " online"), mobPlatforms[e] && (t += " mobile"), Object(_lib_accessibility__WEBPACK_IMPORTED_MODULE_47__.updateOnlineText)(), t
    }, window.toggleOnline = function(e, t) {
        var o = onlinePlatformClass(t).split(" "),
            n = [];
        ["online", "mobile", "_online"].forEach(function(t) {
            inArray(t, o) && !hasClass(e, t) ? n.push(t) : !inArray(t, o) && hasClass(e, t) && removeClass(e, t)
        }), n.length > 0 && addClass(e, n.join(" "))
    }, window.updateAriaElements = _lib_accessibility__WEBPACK_IMPORTED_MODULE_47__.updateAriaElements, window.updateAriaCheckboxes = _lib_accessibility__WEBPACK_IMPORTED_MODULE_47__.updateAriaCheckboxes, window.isFullScreen = function() {
        return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
    }, window.performance && window.performance.memory && rand(0, 100) < 5 && Object(_lib_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_48__.collectMemoryStats)(), window.isPhotoeditor3Available = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.isPhotoeditor3Available, window.cancelStackFilter = _lib_cancel_stack__WEBPACK_IMPORTED_MODULE_52__.cancelStackFilter, window.cancelStackPush = _lib_cancel_stack__WEBPACK_IMPORTED_MODULE_52__.cancelStackPush, window.cancelStackPop = _lib_cancel_stack__WEBPACK_IMPORTED_MODULE_52__.cancelStackPop, window.hasAccessibilityMode = _lib_accessibility__WEBPACK_IMPORTED_MODULE_47__.hasAccessibilityMode, window.AudioMessagePlayer = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.AudioMessagePlayer, Object(_lib_long_view__WEBPACK_IMPORTED_MODULE_46__.initLongView)(), window.parallel = _lib_utils__WEBPACK_IMPORTED_MODULE_51__.parallel, window.audioShowActionTooltip = _lib_feature_tooltips__WEBPACK_IMPORTED_MODULE_41__.audioShowActionTooltip, window.shareAudioPlaylist = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.shareAudioPlaylist, window.getAudioPlayer = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.getAudioPlayer, window.deleteAudioOnClaim = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.deleteAudioOnClaim, window.initTopAudioPlayer = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.initTopAudioPlayer, window.isArticleEditorAvailable = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.isArticleEditorAvailable, window.openArticleEditor = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.openArticleEditor, window.bookmark = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.bookmark, window.bookmarkPost = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.bookmarkPost, window.bookmarkArticle = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.bookmarkArticle, window.bookmarkPodcast = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_43__.bookmarkPodcast, window.fifaReplaceText = _lib_legacy__WEBPACK_IMPORTED_MODULE_45__.fifaReplaceText;
    var initCommonWeb = function() {
        window.isToday = _lib_date__WEBPACK_IMPORTED_MODULE_36__.isToday, window.isYesterday = _lib_date__WEBPACK_IMPORTED_MODULE_36__.isYesterday, window.isTomorrow = _lib_date__WEBPACK_IMPORTED_MODULE_36__.isTomorrow, window.isSameDate = _lib_date__WEBPACK_IMPORTED_MODULE_36__.isSameDate, window.leadingZero = _lib_date__WEBPACK_IMPORTED_MODULE_36__.leadingZero, window.formatTime = _lib_date__WEBPACK_IMPORTED_MODULE_36__.formatTime, window.constants = {
            Groups: _shared_constants_groups__WEBPACK_IMPORTED_MODULE_35__.default
        }, Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_37__.debugLog)("common module enabled")
    };
    initCommonWeb(), stManager.done(jsc("web/common_web.js"))
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
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
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (_(), n && n())
        }

        function c(e) {
            _(), i && i()
        }

        function _() {
            clearTimeout(a), r.removeEventListener("load", s), r.removeEventListener("readystatechange", s), r.removeEventListener("error", c)
        }
        return o && (a = setTimeout(c, o)), {
            destroy: function() {
                _()
            }
        }
    }
    o.r(t), o.d(t, "loadScript", function() {
        return n
    }), window.loadScript = n
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ls", function() {
        return n
    });
    var n = {
        checkVersion: function() {
            return void 0 !== window.localStorage && void 0 !== window.JSON
        },
        set: function(e, t) {
            this.remove(e);
            try {
                return !!n.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                return !1
            }
        },
        get: function(e) {
            if (!n.checkVersion()) return !1;
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
    };
    window.ls = n
}, function(e, t, o) {
    var n = o(69).f,
        i = o(77),
        r = o(118)("toStringTag");
    e.exports = function(e, t, o) {
        e && !i(e = o ? e : e.prototype, r) && n(e, r, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "notaBene", function() {
        return c
    }), o.d(t, "updSideTopLink", function() {
        return _
    }), o.d(t, "createButton", function() {
        return l
    }), o.d(t, "actionsMenuItemLocked", function() {
        return u
    }), o.d(t, "lockActionsMenuItem", function() {
        return d
    }), o.d(t, "unlockActionsMenuItem", function() {
        return p
    }), o.d(t, "linkLocked", function() {
        return f
    }), o.d(t, "lockLink", function() {
        return h
    }), o.d(t, "unlockLink", function() {
        return w
    }), o.d(t, "lockButton", function() {
        return b
    }), o.d(t, "unlockButton", function() {
        return v
    }), o.d(t, "buttonLocked", function() {
        return g
    }), o.d(t, "isButtonLocked", function() {
        return m
    }), o.d(t, "disableButton", function() {
        return O
    }), o.d(t, "sbWidth", function() {
        return y
    }), o.d(t, "isChecked", function() {
        return E
    }), o.d(t, "checkbox", function() {
        return k
    }), o.d(t, "disable", function() {
        return j
    }), o.d(t, "radioval", function() {
        return C
    }), o.d(t, "radiobtn", function() {
        return P
    }), o.d(t, "showProgress", function() {
        return x
    }), o.d(t, "hideProgress", function() {
        return T
    }), o.d(t, "disableEl", function() {
        return M
    }), o.d(t, "enableEl", function() {
        return L
    }), o.d(t, "initUiHelpers", function() {
        return D
    });
    var n = o(32),
        i = o(132),
        r = o(37),
        a = o(14),
        s = o(28);

    function c(e, t, o) {
        if (e = Object(n.ge)(e)) {
            o || Object(n.elfocus)(e), void 0 === Object(n.data)(e, "backstyle") && Object(n.data)(e, "backstyle", e.style.backgroundColor || "");
            var i = Object(n.data)(e, "back") || Object(n.data)(e, "back", Object(n.getStyle)(e, "backgroundColor")),
                r = {
                    notice: "#FFFFE0",
                    warning: "#FAEAEA"
                };
            Object(n.setStyle)(e, "backgroundColor", r[t] || t || r.warning), setTimeout(s.animate.pbind(e, {
                backgroundColor: i
            }, 300, function() {
                e.style.backgroundColor = Object(n.data)(e, "backstyle")
            }), 400)
        }
    }

    function _(e) {
        if (window.scrollNode && !browser.mobile && window._tbLink) {
            var t = Object(n.ge)("page_body"),
                o = Object(n.getXY)(t),
                i = Object(a.scrollGetY)(),
                r = bodyNode.scrollLeft,
                c = Object(n.ge)("side_bar"),
                _ = Object(n.isVisible)(c);
            if (window._stlSideTop = Math.max((_ ? Object(n.getSize)(c)[1] : 0) - i - (browser.mozilla ? Object(n.getXY)(pageNode)[1] : 0), o[1]), e || r != __scrLeft) {
                var l = Object(n.ge)("page_layout"),
                    u = vk.rtl ? l.offsetLeft + l.offsetWidth : 0,
                    d = vk.rtl ? (window.lastWindowWidth || 0) - u : l.offsetLeft;
                Object(n.setStyle)(_stlLeft, {
                    width: Math.max(d - 1, 0)
                });
                var p = vk.rtl ? o[0] + t.offsetWidth + 5 : d,
                    f = vk.rtl ? u - p : o[0] - 5 - p;
                Object(n.setStyle)(_stlSide, {
                    left: p - r,
                    width: Math.max(f, 0)
                }), __scrLeft = r
            }
            Object(n.setStyle)(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var h = _tbLink.loc || _stlWas || i > 200,
                w = i > 250 && cur._regBar,
                b = 0,
                v = !1;
            if (h) {
                1 !== _stlShown && (Object(n.show)(_stlLeft, _stlSide), Object(n.addClass)(_stlLeft, "stl_active"), Object(n.addClass)(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (i = 0), _stlWas && i > 500 && (_stlWas = 0), i > 200 ? (b = (i - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, v = 1, Object(n.val)(_stlText, getLang("global_to_top")), Object(n.removeClass)(_stlText, "down"), Object(n.removeClass)(_stlText, "back"))) : (b = (200 - i) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, v = 0, Object(n.val)(_stlText, ""), Object(n.addClass)(_stlText, "down"), _stlBack && (_stlBack = 0, Object(n.removeClass)(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, v = _tbLink.fast ? 1 : 0, Object(n.val)(_stlText, getLang("global_back")), Object(n.addClass)(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, Object(n.removeClass)(_stlText, "down"))))), !1 !== v && Object(n.toggleClass)(_stlLeft, "over_fast", Object(n.hasClass)(_stlLeft, "over") && v);
                var g = {
                    opacity: Math.min(Math.max(b, 0), 1)
                };
                vk.staticheader && (g.top = -Math.min(Object(n.getSize)("page_header_cont")[1], i)), Object(n.setStyle)(_stlLeft, g)
            } else 0 !== _stlShown && (Object(n.hide)(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && w ? (_regBar = 1, Object(n.val)(Object(n.ge)("reg_bar_content"), cur._regBar), Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: 0,
                transition: Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 60,
                transition: Fx.Transitions.sineInOut
            }, 400)) : _regBar && !w && (_regBar = 0, Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: -56,
                transition: Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 13,
                transition: Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function l(e, t) {
        if ((e = Object(n.ge)(e)) && !e.btnevents)
            if (Object(n.hasClass)(e, "flat_button")) Object(r.isFunction)(t) && (e.onclick = t.pbind(e));
            else {
                var o = e.parentNode;
                if (Object(n.hasClass)(o, "button_blue") || Object(n.hasClass)(o, "button_gray")) Object(r.isFunction)(t) && (e.onclick = t.pbind(e));
                else {
                    var a = !1;
                    Object(i.addEvent)(e, "click mousedown mouseover mouseout", function(r) {
                        if (!Object(n.hasClass)(o, "locked")) switch (r.type) {
                            case "click":
                                if (!a) return;
                                return e.className = "button_hover", t(e), Object(i.cancelEvent)(r);
                            case "mousedown":
                                e.className = "button_down";
                                break;
                            case "mouseover":
                                a = !0, e.className = "button_hover";
                                break;
                            case "mouseout":
                                e.className = "button", a = !1
                        }
                    }), e.btnevents = !0
                }
            }
    }

    function u(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "ui_actions_menu_item_lock")
    }

    function d(e) {
        if ((e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && !Object(n.hasClass)(e, "ui_actions_menu_item_lock")) {
            Object(n.data)(e, "inner", e.innerHTML), Object(n.addClass)(e, "ui_actions_menu_item_lock");
            var t = Object(n.ce)("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            Object(n.val)(t, e.innerHTML), e.appendChild(t), x(e)
        }
    }

    function p(e) {
        (e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && Object(n.hasClass)(e, "ui_actions_menu_item_lock") && (Object(n.removeClass)(e, "ui_actions_menu_item_lock"), e.innerHTML = Object(n.data)(e, "inner"))
    }

    function f(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "link_lock")
    }

    function h(e, t) {
        var o = Object(n.ge)(e);
        o && "a" === o.tagName.toLowerCase() && !f(o) && (Object(n.addClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.addClass)(o, t)
        }))
    }

    function w(e, t) {
        var o = Object(n.ge)(e);
        !o && f(o) && (Object(n.removeClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.removeClass)(o, t)
        }))
    }

    function b(e) {
        var t = Object(n.ge)(e);
        if (t && ("button" === t.tagName.toLowerCase() || Object(n.hasClass)(t, "flat_button") || Object(n.hasClass)(t, "wr_header")) && !m(t)) {
            var o = Object(n.getSize)(t);
            Object(n.addClass)(t, "flat_btn_lock"), Object(n.data)(t, "inner", t.innerHTML), Object(n.setStyle)(t, {
                width: o[0],
                height: o[1]
            }), t.innerHTML = "", x(t, "btn_lock")
        }
    }

    function v(e) {
        var t = Object(n.ge)(e);
        t && m(t) && (T(t), t.innerHTML = Object(n.data)(t, "inner"), Object(n.removeClass)(t, "flat_btn_lock"), Object(n.setStyle)(t, {
            width: null,
            height: null
        }))
    }

    function g(e) {
        return m(e)
    }

    function m(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "flat_btn_lock")
    }

    function O(e, t) {
        var o = Object(n.ge)(e);
        if (o && "button" === o.tagName.toLowerCase())
            if (t) {
                if (!Object(n.isVisible)(o)) return;
                o.parentNode.insertBefore(Object(n.ce)("button", {
                    innerHTML: o.innerHTML,
                    className: o.className + " button_disabled"
                }), o), Object(n.hide)(o)
            } else {
                var i = Object(n.domPS)(o);
                i && Object(n.hasClass)(i, "button_disabled") && Object(n.re)(i), Object(n.show)(o)
            }
    }

    function y(e) {
        if (void 0 === window._sbWidth || e) {
            var t = Object(n.ce)("div", {
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

    function E(e) {
        return e = Object(n.ge)(e), Object(n.hasClass)(e, "on") ? 1 : ""
    }

    function k(e, t) {
        var o = Object(n.ge)(e);
        if (o && !Object(n.hasClass)(o, "disabled")) return void 0 === t && (t = !E(o)), Object(n.toggleClass)(o, "on", t), o.setAttribute("aria-checked", t ? "true" : "false"), !1
    }

    function j(e, t) {
        return e = Object(n.ge)(e), void 0 === t && (t = !Object(n.hasClass)(e, "disabled")), Object(n.toggleClass)(e, "disabled", t), "INPUT" === e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function C(e) {
        return !!radioBtns[e] && radioBtns[e].val
    }

    function P(e, t, o) {
        if (radioBtns[o] && !Object(n.hasClass)(e, "disabled")) return Object(r.each)(radioBtns[o].els, function() {
            this == e ? (Object(n.addClass)(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (Object(n.removeClass)(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t
    }

    function x(e, t, o, i) {
        if (e = Object(n.ge)(e)) {
            var r = void 0;
            return Object(n.hasClass)(e, "pr") ? r = e : (r = se(rs(vk.pr_tpl, {
                id: t || "",
                cls: o || ""
            })), i ? Object(n.domInsertBefore)(r, e) : e.appendChild(r)), setTimeout(function() {
                Object(n.setStyle)(r, {
                    opacity: 1
                })
            }), r
        }
    }

    function T(e) {
        e && (Object(n.hasClass)(e, "pr") ? Object(n.setStyle)(e, {
            opacity: 0
        }) : Object(n.re)(geByClass1("pr", e)))
    }

    function M(e) {
        Object(n.setStyle)(e, "pointer-events", "none")
    }

    function L(e) {
        Object(n.setStyle)(e, "pointer-events", "")
    }

    function D() {
        window.__scrLeft = 0, window.radioBtns = {}
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, function(e, t, o) {
    var n = o(17);
    e.exports = function(e, t, o) {
        for (var i in t) n(e, i, t[i], o);
        return e
    }
}, function(e, t, o) {
    var n = o(100),
        i = o(85);
    e.exports = function(e) {
        return n(i(e))
    }
}, function(e, t, o) {
    var n = o(116),
        i = o(41),
        r = o(112),
        a = o(45),
        s = o(77),
        c = o(93),
        _ = Object.getOwnPropertyDescriptor;
    t.f = o(135) ? _ : function(e, t) {
        if (e = r(e), t = a(t, !0), c) try {
            return _(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!n.f.call(e, t), e[t])
    }
}, function(e, t, o) {
    var n = o(15),
        i = o(44).set;
    e.exports = function(e, t, o) {
        var r, a = t.constructor;
        return a !== o && "function" == typeof a && (r = a.prototype) !== o.prototype && n(r) && i && i(e, r), e
    }
}, function(e, t, o) {
    var n = o(103)("meta"),
        i = o(15),
        r = o(77),
        a = o(69).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        _ = !o(3)(function() {
            return c(Object.preventExtensions({}))
        }),
        l = function(e) {
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
                    l(e)
                }
                return e[n].i
            },
            getWeak: function(e, t) {
                if (!r(e, n)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    l(e)
                }
                return e[n].w
            },
            onFreeze: function(e) {
                return _ && u.NEED && c(e) && !r(e, n) && l(e), e
            }
        }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
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
    var n = o(9)("wks"),
        i = o(103),
        r = o(84).Symbol,
        a = "function" == typeof r;
    e.exports = function(e) {
        return n[e] || (n[e] = a && r[e] || (a ? r : i)("Symbol." + e))
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "initLongView", function() {
        return U
    });
    var n = .5,
        i = .25,
        r = 300,
        a = 1e3,
        s = 3e5,
        c = 2500,
        _ = 5e3,
        l = 6e3,
        u = 2e4,
        d = 1e3,
        p = 36e4,
        f = "_longViewType",
        h = "_longViewIdled",
        w = "_longViewModule",
        b = "_longViewStarted",
        v = "_longViewProcessed",
        g = "_longViewCached",
        m = "_longViewHeight",
        O = "_longViewTop",
        y = "_longViewBottom",
        E = "REGULAR",
        k = "AUTOPLAY_AD",
        j = "LongView.viewed",
        C = "LongView.idled",
        P = vk.longViewTestGroup,
        x = [],
        T = [],
        M = [],
        L = Date.now(),
        D = 0,
        B = 0,
        A = !1,
        S = null,
        I = null,
        R = null,
        W = null,
        N = {};

    function U() {
        P ? (addEvent(window, "blur", z), addEvent(window, "focus", G), onDomReady(function() {
            return setTimeout(K, 500)
        }), window.LongView = {
            register: F,
            onScroll: throttle(H, 50),
            onBeforePageChange: Y,
            clearElemsCache: q,
            _debug: function() {
                return {
                    started: T,
                    tracking: x,
                    viewedData: M,
                    viewIndexes: N,
                    blindTop: D,
                    blindBottom: B
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }
    }

    function K() {
        var e = ae();
        e.length && (oe(e), se())
    }

    function q() {
        x.forEach(function(e) {
            e[g] = !1
        })
    }

    function F(e, t) {
        "im" === t && !e[f] && function(e) {
            if (hasClass(e, "im-mess--post")) return !0;
            var t = e && domFC(e);
            return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || hasClass(e, "no_posts"))
        }(e) && (e[f] = function(e) {
            var t = e && domFC(e);
            return t && t.hasAttribute("data-ad-video-autoplay") ? k : E
        }(e), e[w] = t, x.push(e))
    }

    function H(e, t) {
        var o = H;
        ! function(e, t) {
            var o = [];
            x.forEach(function(r) {
                de(r) ? o.push(r) : ! function(e, t, o) {
                    return !e[b] && _e(e, n, t, o)
                }(r, e, t) ? function(e, t, o) {
                    return e[b] && !_e(e, i, t, o)
                }(r, e, t) && (r[h] ? delete r[h] : (pe(T, r), M = M.concat(ue(r))), delete r[b]) : (r[b] = Date.now(), T.push(r))
            }), o.forEach(function(e) {
                pe(x, e)
            })
        }(e || scrollGetY(), t || window.innerHeight), A ? (clearTimeout(o.timer), o.timer = setTimeout(V, 150)) : (A = !0, $(), function() {
            if ("/im" === location.pathname) {
                var e = geByClass1("im-page--chat-header"),
                    t = geByClass1("im-page--chat-input");
                D = e.getBoundingClientRect().top + e.offsetHeight, B = window.innerHeight - t.getBoundingClientRect().top
            } else D = ge("page_header").offsetHeight, B = 0
        }())
    }

    function V() {
        $(), X(), A = !1
    }

    function z() {
        $(), te()
    }

    function G() {
        M = [], T.forEach(function(e) {
            return e[b] = Date.now()
        }), ne(null), ie(null), X()
    }

    function Y() {
        $(), te(), M = [], T = [], ne(null), ie(null)
    }

    function X() {
        S = setTimeout(Z, c), I = setTimeout(Q, _), R = setTimeout(J, l), W = setTimeout(ee, u)
    }

    function $() {
        clearTimeout(S), clearTimeout(I), clearTimeout(R), clearTimeout(W)
    }

    function Z() {
        M.length && ne(M)
    }

    function Q() {
        oe(M), M = [], ne(null)
    }

    function J() {
        T.length && (ie(le(T, !0, !0)), R = setTimeout(J, d))
    }

    function ee() {
        clearTimeout(R), oe(le(T)), T.forEach(function(e) {
            return e[h] = !0
        }), T = [], ie(null)
    }

    function te() {
        oe(M.concat(le(T)))
    }

    function oe(e) {
        e && e.length && ajax.post("/al_page.php", {
            act: "seen",
            data: function(e) {
                var t = {};
                e.forEach(function(e) {
                    var o = e.ownerId,
                        n = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                    t[o] || (t[o] = []), t[o].push(e.module + e.postId + n + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                });
                var o = [];
                return each(t, function(e, t) {
                    return o.push(e + "_" + t.join(","))
                }), o.join(";")
            }(e),
            long_view: 1
        })
    }

    function ne(e) {
        re(j, e)
    }

    function ie(e) {
        re(C, e)
    }

    function re(e, t) {
        var o = ls.get(e) || {};
        t ? o[L] = t : delete o[L], ls.set(e, o)
    }

    function ae() {
        var e = ae,
            t = [],
            o = ls.get(j) || {},
            n = ls.get(C) || {};
        return e.iterator || (e.iterator = function(e) {
            return function(o) {
                ce(o) && (t = t.concat(e[o]))
            }
        }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
    }

    function se() {
        var e = se,
            t = ls.get(j) || {},
            o = ls.get(C) || {};
        e.iterator || (e.iterator = function(e) {
            return function(t) {
                ce(t) && delete e[t]
            }
        }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ls.set(j, t), ls.set(C, o)
    }

    function ce(e) {
        var t = Number(e);
        return t !== L && Date.now() - t >= p
    }

    function _e(e, t, o, n) {
        if (!e) return !1;
        e[g] || (e[g] = !0, e[m] = e.offsetHeight, e[O] = o + e.getBoundingClientRect().top, e[y] = e[O] + e[m]);
        var i = n - D - B,
            r = o + D,
            a = o + n - B,
            s = e[m],
            c = e[O],
            _ = e[y];
        return (_ > r && c < a ? Math.min(a, _) - Math.max(r, c) : 0) >= Math.min(i * t, s * t)
    }

    function le(e, t, o) {
        return e.map(function(e) {
            return ue(e, t, o)
        })
    }

    function ue(e, t, o) {
        if (de(e)) return [];
        var n = Math.min(s, Date.now() - e[b]);
        if (e[f] === E && n < r || e[f] === k && n < a) return [];
        o || (e[v] = !0);
        var i, c = function(e) {
                var t = e[w];
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
            _ = {
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
            }["feed_other" === (i = c.module) ? "feed_" + cur.section : i] || "u",
            l = cur.feed_session_id || "na",
            u = [];
        for (var d in c)
            if ("index" !== d && "module" !== d && "q" !== d) {
                var p = d.split("_"),
                    h = p[0],
                    g = p[1];
                "ads" === h && (g = p[3]), /^post\d+$/.test(h) && (h = p[1], g = p[2]);
                var m = void 0;
                t || (N[m = h + "_" + g] || (N[m] = 0), N[m]++), u.push("ad" === h ? {
                    ownerId: "ad",
                    postId: g,
                    module: _,
                    viewIndex: N[m]
                } : "ads" === h ? {
                    ownerId: "ads",
                    postId: g,
                    module: _,
                    index: c.index,
                    duration: n,
                    sessionId: l,
                    viewIndex: N[m]
                } : {
                    ownerId: h,
                    postId: (1 === c[d] ? "" : "-") + g,
                    module: _,
                    index: c.index,
                    duration: n,
                    sessionId: l,
                    q: c.q || null,
                    viewIndex: N[m]
                })
            }
        return u
    }

    function de(e) {
        return "page_view" === P && e[v] || !document.body.contains(e)
    }

    function pe(e, t) {
        var o = e.indexOf(t);
        o >= 0 && e.splice(o, 1)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "HistoryAndBookmarks", function() {
        return s
    });
    var n = o(132),
        i = o(37),
        r = o(24),
        a = function() {
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
        }();

    function s(e) {
        var t = function(e) {
                var t = e.split("#"),
                    o = a(t, 2),
                    n = o[0],
                    i = o[1],
                    s = n.split("?"),
                    c = a(s, 2),
                    _ = c[0],
                    l = c[1];
                return _ + (l ? "?" + Object(r.ajx2q)(Object(r.q2ajx)(l)) : "") + (i ? "#" + i : "")
            },
            o = Object(i.extend)({
                onLocChange: function() {}
            }, e),
            s = function() {
                var e = "";
                return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
            },
            c = s(),
            _ = function(e) {
                var t = s();
                t === c && !0 !== e || (o.onLocChange(t), c = t)
            },
            l = void 0;
        return {
            setLoc: function(e) {
                c = t(e);
                var o = (location.toString().match(/#(.*)/) || {})[1] || "";
                if (!o && vk.al > 1 && (o = (location.pathname || "") + (location.search || "")), (o = (o = t(o)).replace(/^(\/|!)/, "")) !== c) {
                    if (3 == vk.al) try {
                        return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                            scrollTop: window.lastScrollTop,
                            preventScroll: window.preventLocationScroll
                        }, "", "/" + o), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + c)
                    } catch (e) {}
                    window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + c
                }
            },
            getLoc: s,
            init: function() {
                1 == vk.al && _(!0), 3 == vk.al ? (Object(n.addEvent)(window, "popstate", _), browser.safari && Object(n.addEvent)(window, "hashchange", _)) : "onhashchange" in window ? Object(n.addEvent)(window, "hashchange", function() {
                    window.chHashFlag ? window.chHashFlag = !1 : _()
                }) : l = setInterval(_, 200)
            },
            setOptions: function(e) {
                o = Object(i.extend)(o, e)
            },
            checker: _,
            stop: function() {
                vk.al < 3 ? clearInterval(l) : 3 == vk.al && Object(n.removeEvent)(window, "popstate", _)
            }
        }
    }
    window.HistoryAndBookmarks = s
}, function(e, t, o) {
    'eat script';
    var n = o(60),
        i = o(41),
        r = o(108),
        a = {};
    o(34)(a, o(118)("iterator"), function() {
        return this
    }), e.exports = function(e, t, o) {
        e.prototype = n(a, {
            next: i(1, o)
        }), r(e, t + " Iterator")
    }
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
}, function(e, t, o) {
    var n = o(42),
        i = o(118)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || r[i] === e)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "updateHeaderStyles", function() {
        return g
    }), o.d(t, "updateLeftMenu", function() {
        return m
    }), o.d(t, "updateSTL", function() {
        return O
    }), o.d(t, "handlePageCount", function() {
        return E
    }), o.d(t, "handlePageParams", function() {
        return k
    }), o.d(t, "updateOtherCounters", function() {
        return j
    }), o.d(t, "comScoreUDM", function() {
        return C
    }), o.d(t, "reloadCheckFlood", function() {
        return P
    }), o.d(t, "globalHistoryDestroy", function() {
        return x
    }), o.d(t, "showBackLink", function() {
        return T
    }), o.d(t, "processDestroy", function() {
        return M
    }), o.d(t, "handlePageView", function() {
        return L
    }), o.d(t, "zNav", function() {
        return D
    });
    var n = o(32),
        i = o(37),
        r = o(65),
        a = o(28),
        s = o(70),
        c = o(86),
        _ = o(76),
        l = o(109),
        u = o(30),
        d = o(78),
        p = o(24),
        f = o(126),
        h = o(96),
        w = o(91),
        b = o(81),
        v = function() {
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
        }();

    function g(e) {
        var t = [Object(n.ge)("dev_top_nav_wrap"), Object(n.ge)("page_header_wrap")];
        Object(i.each)(t, function(t, o) {
            o && Object(n.setStyle)(o, e)
        })
    }

    function m(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }

    function O() {
        var e = window.innerWidth,
            t = document.documentElement.clientWidth,
            o = Math.max(Object(i.intval)(e), Object(i.intval)(t));
        Object(n.toggleClass)(bodyNode, "no_stl", o < vk.width + 280), Object(n.toggleClass)(bodyNode, "no_sett", o < vk.width + 62)
    }

    function y(e, t, o) {
        var s = "",
            c = "",
            _ = '<span class="inl_bl left_count_sign"></span>',
            l = "spr" === o ? 5 : 3,
            u = geByClass1("left_count_wrap", e),
            d = hasClass(geByClass1("left_row", e, "a"), "left_nav_over"),
            p = geByClass1("left_count", e, "span"),
            f = val(p);
        t && ((s = t.toString()).length > l && (c = ' title="' + Object(i.stripHTML)(Object(r.langNumeric)(t, "%s", !0)) + '"', s = ".." + s.substr(s.length - l)), _ = '<span class="inl_bl left_count" ' + c + ">" + s + "</span>");
        var h = function() {
            val(u, _), (t ? removeClass : addClass)(u, "left_void"), Object(n.setStyle)(u, {
                opacity: ""
            })
        };
        if (f || d)
            if (s) animateCount(p, s, {
                str: "auto",
                onDone: h
            });
            else if (d) {
            var w = bodyNode.appendChild(Object(n.se)('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>')),
                b = Object(n.getSize)(Object(n.domFC)(w))[0];
            Object(n.re)(w), f && "." === f.charAt(0) && val(p, f.replace("..", "")), Object(a.animate)(p, {
                width: b
            }, 100, h)
        } else Object(a.animate)(u, {
            opacity: 0
        }, 100, h);
        else h(), Object(n.setStyle)(u, {
            opacity: 0
        }), Object(a.animate)(u, {
            opacity: 1
        }, 100)
    }

    function E(e, t, o, r) {
        var a = Object(i.intval)(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== a)
            if (vk.counts[e] = a, "ntf" !== e) {
                var s = Object(n.ge)("l_" + e),
                    c = hasClass(Object(n.domFC)(s), "left_nav_over"),
                    _ = void 0;
                s && (y(s, a > 0 ? a : 0, e), r && o && (_ = a > 0 && r ? "?" + r : "", s.firstChild.href = "/" + o + _)), (a >= 0 || !c) && Object(n.toggle)(s, a >= 0)
            } else window.TopNotifier.setCount(a > 0 ? a : 0)
    }

    function k(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), O(), m(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, Object(s.statlogsValueEvent)("page_scroll", 0, cur.module, "0")
        }, 300), L(e);
        var t = Object(n.ge)("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = Object(i.intval)(e.nophone), vk.staticheader = Object(i.intval)(e.staticheader), vk.id) {
            var o = Object(n.ge)("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && window.__adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var r = locProtocol + "//" + location.host + "/";
        e.loc && ("?" === e.loc.charAt(0) ? r += nav.strLoc : r += e.loc);
        var a = document.URL === r ? "" : document.URL;
        if (setTimeout(j.pbind(r, a), 10), e.counters) {
            var _ = (e.counters || "").split(","),
                l = "",
                u = "";
            Object(i.intval)(_[9]) > 0 ? (l = "adsmarket", u = "act=overview&status=-1") : Object(i.intval)(_[9]) < -1 ? (_[9] = 1, l = "ads", u = "act=a_comeback_office_redirect") : l = "ads?act=office&last=1";
            var d = Object(n.ge)("l_set"),
                p = d && d.nextSibling || !1,
                f = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                h = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", l, "feed" + (Object(n.ge)("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                w = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", u, Object(n.ge)("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"],
                b = !1;
            if (e.handlecnts) {
                for (var v = 0; v < f.length; v++) E(f[v], _[v], h[v], w[v]);
                for (var g = p.nextSibling; g; g = g.nextSibling) {
                    if (g.tagName && "li" === g.tagName.toLowerCase() && Object(n.isVisible)(g)) {
                        b = !0;
                        break
                    }
                    if (hasClass(g, "more_div")) break
                }(b ? show : hide)(p);
                for (var k = _.length; v < k; v++) {
                    var C = _[v].split(":"),
                        P = Object(n.ge)("l_app" + Object(i.intval)(C[0]));
                    P && y(P, Object(i.intval)(C[1]))
                }
                setTimeout(c.updSeenAdsInfo, 0)
            } else
                for (var x = 0; x < f.length; x++) vk.counts[f[x]] = _[x]
        }
    }

    function j(e, t) {
        if (!vk.zero && !__dev) {
            t = t || document.referrer;
            for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; n++)
                if (e.match(o[n])) return;
            var r = [
                    [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                    [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                ],
                a = {
                    referrer: t,
                    url: e
                };
            Object(i.each)(a, function(e) {
                Object(i.each)(r, function() {
                    a[e] = a[e].replace(this[0], this[1])
                })
            }), t = a.referrer, e = a.url;
            var s = void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);
            Object(i.vkImage)().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + s + ";u" + escape(e) + ";" + Math.random(), Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" === vk.tnsPixelType && (Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), C(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }

    function C(e, t) {
        if (!vk.zero) {
            t = t || document.referrer;
            var o = "https:" === locProtocol ? "sb" : "b",
                n = escape(e),
                r = escape(t),
                a = Math.random();
            Object(i.vkImage)().src = locProtocol + "//" + o + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + n + "&c5=&c7=" + n + "&c9=" + r + "&c15=&cv=2.0&cj=1&rn=" + a
        }
    }

    function P(e) {
        e = e || {};
        var t = ls.get("last_reloaded") || [];
        t.unshift(Object(i.vkNow)());
        var o = t.length;
        return o > 5 && (t.splice(5, o - 5), o = 5), ls.set("last_reloaded", t), !!(5 === o && t[0] - t[4] < 2e4) && (Object(_.topError)('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0)
    }

    function x(e) {
        for (var t = 0, o = globalHistory.length; t < o; t++)
            if (globalHistory[t].loc === e) {
                var n = globalHistory.splice(t, 1)[0];
                M(n.cur), n.content.innerHTML = "", --t, --o
            }
    }

    function T(e, t, o) {
        var n = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var i = 0, r = globalHistory.length; i < r; i++)
                if (globalHistory[i].loc === e) {
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
            }), show(_tbLink), window._stlWas = 0
        } else hide(_tbLink);
        Object(l.updSideTopLink)(1)
    }

    function M(e) {
        if (e._back && e._back.hide && e === cur)
            for (var t in e._back.hide)
                if (e._back.hide.hasOwnProperty(t)) try {
                    e._back.hide[t]()
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
        if (e.destroy && e.destroy.length)
            for (var o in e.destroy)
                if (e.destroy.hasOwnProperty(o)) try {
                    e.destroy[o](e)
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
    }

    function L(e) {
        var t = Object(n.ge)("footer_wrap"),
            o = geByClass1("top_home_link"),
            r = void 0 === e.width ? vk.width : e.width,
            a = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            s = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if (vk.noleftmenu === e.noleftmenu && vk.nobottommenu === e.nobottommenu && vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || (vk.noleftmenu !== e.noleftmenu && e.noleftmenu && hide("side_bar"), vk.nobottommenu !== e.nobottommenu && (e.nobottommenu ? hide("bottom_nav") : show("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (addClass(t, "simple"), t.style.width = "auto") : t && (removeClass(t, "simple"), t.style.width = r - s + "px")), vk.notopmenu !== e.notopmenu && (e.notopmenu ? hide("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : show("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), o && vk.top_home_link_class !== e.top_home_link_class && (o.className = e.top_home_link_class), r !== vk.width || a !== vk.width_dec) {
            Object(n.ge)("page_layout").style.width = r + "px", Object(n.ge)("page_header").style.width = r + "px", Object(n.ge)("page_body").style.width = r - a + "px", Object(n.ge)("ts_wrap") && hasClass(Object(n.ge)("ts_wrap"), "vk") && (Object(n.ge)("ts_wrap").style.width = r - 191 + "px"), setTimeout(l.updSideTopLink.pbind(!0), 0), setTimeout(O, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
        }
        vk.noleftmenu === e.noleftmenu || e.noleftmenu || show("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = r, vk.width_dec = a, vk.width_dec_footer = s, vk.body_class = e.body_class, vk.staticheader = Object(i.intval)(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }

    function D(e, t, o) {
        var r = e.z,
            a = e.f,
            s = e.w,
            c = (r || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
        if (delete e.z, delete e.f, delete e.w, t || (t = {}), isEmpty(e)) {
            if (a && (handleScroll(a), void 0 === r)) return !1;
            if (t.hist)
                if (r || s) {
                    if (layerQueue.back("wiki", s, (c || {})[1], (c || {})[2])) return !1
                } else if (!1 === r && o.w && layerQueue.back("wiki", o.w)) return !1;
            if (s) {
                if (!1 === r) layers.fullhide(!!t.hist && 2);
                else {
                    if (s.match(/^story([0-9\-]+)_(\d+)/)) return Object(u.showStory)(s);
                    o || (o = clone(nav.objLoc)), s && (o.w = s), a && (o.f = a), delete o.z, nav.setLoc(o)
                }
                return showWiki({
                    w: s
                }, "note_new" === s, !1, {
                    onLoaded: r && D.pbind({
                        z: r
                    }, extend(t, {
                        queue: 1
                    })),
                    isZnav: 1
                }), !1
            }
            if ("giftbox" === r) return !Object(d.showBox)("/al_gifts.php", {
                act: "get_gift_box",
                mid: t.id || 0,
                fr: t.is && t.id !== vk.id ? 0 : 1,
                link: nav.objLoc[0]
            }, {
                stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                cache: 1
            }, window.event);
            if ("validatebox" === r) return !Object(p.validateMobileBox)({
                closeLink: 1,
                onDone: function() {
                    return Object(n.ge)("change_phone_wrap").parentNode.removeChild(Object(n.ge)("change_phone_wrap"))
                }
            });
            if ("upload_video" === r) return VideoUpload.showBox();
            if (!1 === r || !1 === s) {
                var _ = !window.wkcur || !wkcur.shown || layers.fullhide !== WkView.hide;
                !layers.fullhide || !_ && !1 !== s || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                var l = Object(f.curBox)();
                return l && l.wkRaw && l.hide(), !1
            }
            if (r && c) {
                var g = function() {
                    return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                };
                switch (c[1]) {
                    case "photo":
                        return Object(h.showPhoto)(c[2], c[3], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "albums":
                        return Object(h.showAlbums)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "album":
                        return Object(h.showAlbum)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "tag":
                    case "photo_tag":
                        return Object(h.showPhotoTags)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "video":
                        var m = c[3],
                            O = extend(t, {
                                onFail: g,
                                noLocChange: 1,
                                focusPlay: 1
                            });
                        if (m) {
                            var y = [],
                                E = "";
                            if (Object(i.each)(m.split("/"), function(e, t) {
                                    0 === t.indexOf("pl_") ? E = t : y.push(t)
                                }), m = y.join("/"), E) {
                                E = E.substr("pl_".length);
                                var k = cur.currentModule ? cur.currentModule() : cur.module;
                                O = extend(O, {
                                    playlistId: E,
                                    module: k,
                                    addParams: {
                                        force_no_repeat: 1,
                                        show_next: 1,
                                        playlist_id: E
                                    }
                                })
                            }
                        }
                        return Object(w.showVideo)(c[2], m, O), !1;
                    case "single":
                        return void 0 === s && stManager.add(["single_pv.css", "single_pv.js"], Object(n.ge)(r).onclick), !1;
                    case "accept_money":
                        return Object(b.moneyTransferBox)(c[2], c[3]), !1;
                    case "audio_playlist":
                        var j = c[2].split("_"),
                            C = v(j, 2),
                            P = C[0],
                            x = C[1];
                        return AudioUtils.showAudioPlaylist(P, x, c[3], void 0, void 0, t.onDone), !1;
                    case "article_edit":
                        return openArticleEditor.apply(null, c[2].split("_")), !1;
                    case "podcast":
                        return stManager.add([jsc("web/podcast.js"), "page.css"], function() {
                            Podcast.show(c[2])
                        }), !1
                }
            }
        }
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "throttleAccumulate", function() {
        return throttleAccumulate
    }), __webpack_require__.d(__webpack_exports__, "executionStackPop", function() {
        return executionStackPop
    }), __webpack_require__.d(__webpack_exports__, "lplog", function() {
        return lplog
    }), __webpack_require__.d(__webpack_exports__, "toArray", function() {
        return toArray
    }), __webpack_require__.d(__webpack_exports__, "arrayUnique", function() {
        return arrayUnique
    }), __webpack_require__.d(__webpack_exports__, "unpackStore", function() {
        return unpackStore
    }), __webpack_require__.d(__webpack_exports__, "debounce", function() {
        return debounce
    }), __webpack_require__.d(__webpack_exports__, "throttle", function() {
        return throttle
    }), __webpack_require__.d(__webpack_exports__, "shuffle", function() {
        return shuffle
    }), __webpack_require__.d(__webpack_exports__, "parallel", function() {
        return parallel
    }), __webpack_require__.d(__webpack_exports__, "hashCode", function() {
        return hashCode
    }), __webpack_require__.d(__webpack_exports__, "parseJSON", function() {
        return parseJSON
    }), __webpack_require__.d(__webpack_exports__, "checkTextLength", function() {
        return checkTextLength
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37),
        _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76),
        _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);

    function throttleAccumulate(e, t) {
        var o = [],
            n = 0;
        return function(i) {
            o.push(i), n || (n = setTimeout(function() {
                n = !1, e(o), o = []
            }, t))
        }
    }

    function executionStackPop(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function lplog(e, t) {
        var o = void 0,
            n = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    o = "color: red", n = "background: red; color: white";
                    break;
                case "success":
                    o = "color: green", n = "background: green; color: white";
                    break;
                default:
                    o = "color: blue;", n = "background: #000; color: #fff;"
            }
            try {
                var i = new Date;
                console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, n, o)
            } catch (e) {}
        }
    }

    function toArray(e) {
        var t = [];
        if (void 0 === e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var o = 0; o < e.length; o++) t.push(e[o]);
        return t
    }

    function arrayUnique(e) {
        for (var t = {}, o = [], n = 0; n < e.length; n++) t[e[n]] || (o.push(e[n]), t[o[n]] = 1);
        return o
    }

    function unpackStore(e) {
        return e.get ? e.get() : e
    }

    function debounce(e, t, o) {
        var n = void 0;
        return function() {
            var i = this,
                r = arguments,
                a = o && !n;
            clearTimeout(n), n = setTimeout(function() {
                n = null, o || e.apply(i, r)
            }, t), a && e.apply(this, r)
        }
    }

    function throttle(e, t) {
        var o = void 0;
        return function() {
            o || (e.apply(this, arguments), o = setTimeout(function() {
                o = !1
            }, t))
        }
    }

    function shuffle(e) {
        for (var t = e.length; t > 0;) {
            var o = Math.floor(Math.random() * t),
                n = e[--t];
            e[t] = e[o], e[o] = n
        }
        return e
    }

    function parallel() {
        var e = [].slice.call(arguments),
            t = e.pop(),
            o = new CallHub(t, e.length);
        Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
            return t(function() {
                return o.done()
            })
        })
    }

    function hashCode(e) {
        var t = 0;
        if (0 === e.length) return t;
        for (var o = 0, n = e.length; o < n; o++) {
            t = (t << 5) - t + e.charCodeAt(o), t |= 0
        }
        return t
    }

    function parseJSON(obj) {
        if (window.JSON && JSON.parse) try {
            return JSON.parse(obj)
        } catch (e) {
            Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.topError)("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            });
            var evalString = "(" + obj + ")";
            try {
                return eval(evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalString)
            }
        } else {
            var _evalString = "(" + obj + ")";
            try {
                return eval(_evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, _evalString)
            }
        }
    }

    function checkTextLength(e, t, o, n, i, r, a) {
        var s = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== s.length || r) {
            t.lastLen = s.length;
            var _ = {
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
                l = {
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
            i && (_[","] = 5);
            var d = function(e) {
                for (var t = 0, o = 0, n = e.length; o < n; o++) {
                    var i = _[e.charAt(o)],
                        r = e.charCodeAt(o);
                    t += void 0 !== i ? i : !a && r >= 128 && (r < 1025 || u[r] || r > 1119) && !l[r] && (r < 8220 || r > 8222) && (r < 8224 || r > 8226) ? ("&#" + r + ";").length : 1
                }
                return t
            }(s);
            if (o = ge(o), d > Math.max(e - 100, .75 * e))
                if (show(o), d > e)
                    if (i) {
                        var p = val(t, function(e, t) {
                            for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                var s = e.charAt(i),
                                    c = _[s],
                                    d = e.charCodeAt(i);
                                if ((o += void 0 !== c ? c : !a && d >= 128 && (d < 1025 || u[d] || d > 1119) && !l[d] && (d < 8220 || d > 8222) && (d < 8224 || d > 8226) ? ("&#" + d + ";").length : 1) > t) break;
                                n += s
                            }
                            return n
                        }(s, Math.min(e, c)));
                        t.lastLen = p.length, o.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else o.innerHTML = getLang("text_exceeds_symbol_limit", d - e);
            else o.innerHTML = getLang("text_N_symbols_remain", e - d);
            else hide(o)
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "boxQueue", function() {
        return s
    }), o.d(t, "curBox", function() {
        return c
    }), o.d(t, "initBoxQueue", function() {
        return _
    }), o.d(t, "boxRefreshCoords", function() {
        return l
    }), o.d(t, "showDoneBox", function() {
        return u
    });
    var n = o(132),
        i = o(37),
        r = o(32),
        a = o(28),
        s = {
            hideAll: function(e, t) {
                if (e)
                    for (; s.count();) s.hideLast();
                else {
                    if (s.count()) {
                        var o = _message_boxes[s._boxes.pop()];
                        o._in_queue = !1, o._hide(!1, !1, t)
                    }
                    for (; s.count();) {
                        _message_boxes[s._boxes.pop()]._in_queue = !1
                    }
                }
            },
            hideLast: function(e, t) {
                if (s.count()) {
                    var o = window._message_boxes[s._boxes[s.count() - 1]];
                    if (!0 === e && (o.changed || s.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(s.skip = !1);
                    o.hide()
                }
                if (t && "click" === t.type) return Object(n.cancelEvent)(t)
            },
            hideBGClick: function(e) {
                e && e.target && /^box_layer/.test(e.target.id) && s.hideLast()
            },
            count: function() {
                return s._boxes.length
            },
            _show: function(e) {
                var t = _message_boxes[e];
                if (t && !t._in_queue) {
                    s.count() ? _message_boxes[s._boxes[s.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                    var o = !!s.count();
                    s.curBox = e, t._show(o || s.currHiding, o), s._boxes.push(e)
                }
            },
            _hide: function(e) {
                var t = _message_boxes[e];
                if (t && t._in_queue && s._boxes[s.count() - 1] === e && t.isVisible() && (t._in_queue = !1, s._boxes.pop(), t._hide(!!s.count()), s.count())) {
                    var o = s._boxes[s.count() - 1];
                    s.curBox = o, _message_boxes[o]._show(!0, !0, !0)
                }
            },
            _boxes: [],
            curBox: 0
        };

    function c() {
        var e = window._message_boxes[s.curBox];
        return e && e.isVisible() ? e : null
    }

    function _() {
        s.hideLastCheck = s.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
    }

    function l(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
            n = Object(r.getSize)(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }

    function u(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = (t.w || 380) + 20,
            n = t.w ? ' style="width: ' + t.w + 'px;"' : "",
            s = bodyNode.offsetWidth,
            c = Object(r.ce)("div", {
                className: "top_result_baloon_wrap fixed " + (t.className || ""),
                innerHTML: '<div class="top_result_baloon"' + n + ">" + e + "</div>"
            }, {
                left: (s - o) / 2
            });
        t.parentEl ? geByClass1(t.parentEl).appendChild(c) : bodyNode.insertBefore(c, pageNode);
        var _ = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
            l = browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
            u = Object(r.getSize)(c);
        c.style.top = Math.max(10, l + (_ - u[1]) / 3) + "px";
        var d = t.out || 2e3,
            p = new Date,
            f = function e() {
                d < 0 || (window.doneBoxTO = setTimeout(function() {
                    !t.permit || t.permit() ? Object(a.fadeOut)(c.firstChild, 500, function() {
                        Object(r.re)(c), t.callback && t.callback()
                    }) : e()
                }, d))
            };
        addEvent(c, "mouseenter", function() {
            clearTimeout(window.doneBoxTO), d -= new Date - p
        }), addEvent(c, "mouseleave", function() {
            p = new Date, f()
        }), f()
    }
}, function(e, t, o) {
    o(8), o(53), o(21), o(46), e.exports = o(94).Map
}, function(e, t, o) {
    var n = o(85);
    e.exports = function(e) {
        return Object(n(e))
    }
}, , function(e, t) {}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n, i, r, a, s, c, _, l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
    }(), s = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, c = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, _ = (r || s) && n.atob && n.ArrayBuffer && n.Uint8Array && function(e) {
        var t, o, n, i, _, l, u, d, p;
        if (!(t = e.match(c))) throw new Error("invalid data URI");
        for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), _ = n ? atob(i) : decodeURIComponent(i), l = new ArrayBuffer(_.length), u = new Uint8Array(l), d = 0; d < _.length; d += 1) u[d] = _.charCodeAt(d);
        return r ? new Blob([a ? u : l], {
            type: o
        }) : ((p = new s).append(l), p.getBlob(o))
    }, n.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function(e, t, o) {
        e(o && i.toDataURL && _ ? _(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
    } : i.toDataURL && _ && (i.toBlob = function(e, t, o) {
        e(_(this.toDataURL(t, o)))
    })), "function" == typeof define && define.amd ? define(function() {
        return _
    }) : "object" == ("undefined" == typeof module ? "undefined" : l(module)) && module.exports ? module.exports = _ : n.dataURLtoBlob = _
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "KEY", function() {
        return r
    }), o.d(t, "addEvent", function() {
        return a
    }), o.d(t, "removeEvent", function() {
        return s
    }), o.d(t, "triggerEvent", function() {
        return c
    }), o.d(t, "cancelEvent", function() {
        return _
    }), o.d(t, "stopEvent", function() {
        return l
    }), o.d(t, "normEvent", function() {
        return u
    }), o.d(t, "checkEvent", function() {
        return d
    }), o.d(t, "checkKeyboardEvent", function() {
        return p
    }), o.d(t, "checkOver", function() {
        return f
    });
    var n = o(32),
        i = o(37),
        r = {
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

    function a(e, t, o, r, a, s) {
        if ((e = Object(n.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var c, l = a ? ((c = function(e) {
                var t = e.data;
                e.data = a;
                var n = o.apply(this, [e]);
                return e.data = t, n
            }).handler = o, c) : o;
            e.setInterval && e !== window && (e = window);
            var d = Object(n.data)(e, "events") || Object(n.data)(e, "events", {}),
                p = Object(n.data)(e, "handle") || Object(n.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = u(e);
                            var t = Array.from(arguments);
                            t[0] = e;
                            var o = Object(n.data)(this, "events");
                            if (!o || "string" != typeof e.type || !o[e.type] || !o[e.type].length) return;
                            var i = (o[e.type] || []).slice();
                            for (var r in i)
                                if (i.hasOwnProperty(r)) {
                                    if ("mouseover" === e.type || "mouseout" === e.type) {
                                        for (var a = e.relatedElement; a && a !== this;) a = a.parentNode;
                                        if (a === this) continue
                                    }
                                    var s = i[r].apply(this, t);
                                    if (!1 !== s && -1 !== s || _(e), -1 === s) return !1
                                }
                        }).apply(e, arguments)
                    }
                }(e));
            Object(i.each)(t.split(/\s+/), function(t, o) {
                d[o] || (d[o] = [], !r && e.addEventListener ? e.addEventListener(o, p, s) : !r && e.attachEvent && e.attachEvent("on" + o, p)), d[o].push(l)
            })
        }
    }

    function s(e, t, o, r) {
        if (void 0 === r && (r = !1), e = Object(n.ge)(e)) {
            var a = Object(n.data)(e, "events");
            if (a)
                if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, s) {
                    if (Object(i.isArray)(a[s])) {
                        var c = a[s].length;
                        if (Object(i.isFunction)(o)) {
                            for (var _ = c - 1; _ >= 0; _--)
                                if (a[s][_] && (a[s][_] === o || a[s][_].handler === o)) {
                                    a[s].splice(_, 1), c--;
                                    break
                                }
                        } else {
                            for (var l = 0; l < c; l++) delete a[s][l];
                            c = 0
                        }
                        c || (e.removeEventListener ? e.removeEventListener(s, Object(n.data)(e, "handle"), r) : e.detachEvent && e.detachEvent("on" + s, Object(n.data)(e, "handle")), delete a[s])
                    }
                }), Object(i.isEmpty)(a) && (Object(n.removeData)(e, "events"), Object(n.removeData)(e, "handle"));
                else
                    for (var c in a) a.hasOwnProperty(c) && s(e, c)
        }
    }

    function c(e, t, o, r) {
        e = Object(n.ge)(e);
        var a = Object(n.data)(e, "handle");
        if (a) {
            var s = function() {
                return a.call(e, Object(i.extend)(o || {}, {
                    type: t,
                    target: e
                }))
            };
            r ? s() : setTimeout(s, 0)
        }
    }

    function _(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function l(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function u(e) {
        var t = e = e || window.event;
        if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function d(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
    }

    function p(e) {
        if (!(e = u(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(n.getSize)(e.target),
            o = Object(n.getXY)(e.target),
            i = e.pageX - o[0],
            r = e.pageY - o[1];
        return i < -1 || i > t[0] + 1 || r < -1 || r > t[1] + 1 || Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function f(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o === t || o === t.parentNode) return !0;
        for (; o !== t && o.parentNode && o.parentNode !== bodyNode;) o = o.parentNode;
        return o !== t
    }
    window.KEY = r, window.addEvent = a, window.removeEvent = s, window.triggerEvent = c, window.cancelEvent = _, window.stopEvent = l, window.normEvent = u, window.checkEvent = d, window.checkKeyboardEvent = p, window.checkOver = f
}, function(e, t, o) {
    var n = o(136);
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
    o.r(t), o.d(t, "GROUPS_ADMIN_LEVEL_USER", function() {
        return n
    }), o.d(t, "GROUPS_ADMIN_LEVEL_MODERATOR", function() {
        return i
    }), o.d(t, "GROUPS_ADMIN_LEVEL_EDITOR", function() {
        return r
    }), o.d(t, "GROUPS_ADMIN_LEVEL_ADMINISTRATOR", function() {
        return a
    }), o.d(t, "GROUPS_ADMIN_LEVEL_HOST", function() {
        return s
    }), o.d(t, "GROUPS_ADMIN_LEVEL_EVENT_CREATOR", function() {
        return c
    }), o.d(t, "GROUPS_ADMIN_LEVEL_CREATOR", function() {
        return _
    }), o.d(t, "GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER", function() {
        return l
    }), o.d(t, "GROUPS_ADMIN_FLAG_ADS", function() {
        return u
    });
    var n = 0,
        i = 1,
        r = 2,
        a = 3,
        s = 4,
        c = 5,
        _ = 6,
        l = 100,
        u = 8;
    t.default = {
        GROUPS_ADMIN_LEVEL_USER: n,
        GROUPS_ADMIN_LEVEL_MODERATOR: i,
        GROUPS_ADMIN_LEVEL_EDITOR: r,
        GROUPS_ADMIN_LEVEL_ADMINISTRATOR: a,
        GROUPS_ADMIN_LEVEL_HOST: s,
        GROUPS_ADMIN_LEVEL_EVENT_CREATOR: c,
        GROUPS_ADMIN_LEVEL_CREATOR: _,
        GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: l,
        GROUPS_ADMIN_FLAG_ADS: u
    }
}, function(e, t, o) {
    e.exports = !o(3)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(61),
        i = o(56),
        r = o(17),
        a = o(34),
        s = o(77),
        c = o(42),
        _ = o(121),
        l = o(108),
        u = o(97),
        d = o(118)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = function() {
            return this
        };
    e.exports = function(e, t, o, h, w, b, v) {
        _(o, t, h);
        var g, m, O, y = function(e) {
                if (!p && e in C) return C[e];
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
            E = t + " Iterator",
            k = "values" == w,
            j = !1,
            C = e.prototype,
            P = C[d] || C["@@iterator"] || w && C[w],
            x = P || y(w),
            T = w ? k ? y("entries") : x : void 0,
            M = "Array" == t && C.entries || P;
        if (M && (O = u(M.call(new e))) !== Object.prototype && (l(O, E, !0), n || s(O, d) || a(O, d, f)), k && P && "values" !== P.name && (j = !0, x = function() {
                return P.call(this)
            }), n && !v || !p && !j && C[d] || a(C, d, x), c[t] = x, c[E] = f, w)
            if (g = {
                    values: k ? x : y("values"),
                    keys: b ? x : y("keys"),
                    entries: T
                }, v)
                for (m in g) m in C || r(C, m, g[m]);
            else i(i.P + i.F * (p || j), t, g);
        return g
    }
}, function(e, t) {
    e.exports = function(e, t, o, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(102);
    e.exports = o(90)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return n.def(this, e = 0 === e ? 0 : e, e)
        }
    }, n)
}, function(e, t, o) {
    var n = o(69),
        i = o(13),
        r = o(2);
    e.exports = o(135) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var o, a = r(t), s = a.length, c = 0; s > c;) n.f(e, o = a[c++], t[o]);
        return e
    }
}, , function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showTooltip", function() {
        return r
    }), o.d(t, "showTitle", function() {
        return a
    }), o.d(t, "showHint", function() {
        return s
    });
    var n = o(32),
        i = o(132);

    function r(e, t) {
        (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
            e.showing = !1
        }, Object(i.addEvent)(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" !== e.tt && (e.tt || (e.tt = "loadingstat"), Object(n.domClosest)("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
            "loadingstat" === e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (! function(e) {
                e.temphide && (Object(i.removeEvent)(e, "mouseout", e.temphide), Object(n.removeAttr)(e, "temphide"), Object(n.removeAttr)(e, "showing"))
            }(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
        })))
    }

    function a(e, t, o, i) {
        e = ge(e);
        o || (o = [Math.round(20 - Object(n.getSize)(e)[0] / 2), 8]);
        r(e, extend({
            text: function() {
                return t || e.getAttribute("data-title")
            },
            shift: o,
            black: 1
        }, i || {}))
    }

    function s(e, t) {
        e = ge(e), t = t || {};
        r(e, extend({
            text: function() {
                return e.getAttribute("data-title")
            },
            dir: "auto",
            width: 300,
            shift: [22, 8]
        }, t))
    }
}, function(e, t, o) {
    var n = o(26),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
    }
}]);