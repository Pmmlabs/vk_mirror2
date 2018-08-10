var Pagination = {
    init: function(e) {
        cur.pgCont && (cur.initScrollFn = Pagination.initScroll.pbind(e, !0), cur.pgFixed = ce("div", {
            id: "pg_fixed",
            className: "fixed",
            innerHTML: '<div class="pg_fixed_back"></div><div class="pg_fixed_pages">    '
        }), cur.pgFixedBack = cur.pgFixed.firstChild, cur.pgFixedPages = cur.pgFixedBack.nextSibling, cur.pgUrl && (Pagination.clearPreload(), cur.pgPreload && (ajax.preload(cur.pgUrl, extend({
            offset: cur.pgOffset,
            part: 1
        }, cur.pgParams || {}), cur.pgPreload), delete cur.pgPreload)), Pagination.reinit(!0), Pagination.pageReady(!0), cur.nav.push(Pagination.nav))
    },
    scrollnode: function() {
        return window
    },
    initScroll: function(e, r) {
        var i = e === !0 ? getXY(cur.pgCont.lastChild || cur.pgCont)[1] : intval(e);
        r === !0 && (vk.loaded ? setTimeout(Pagination.setScroll.pbind(i), 0) : addEvent(window, "load", function() {
            Pagination.setScroll(i)
        })), addEvent(Pagination.scrollnode(), "scroll", Pagination.scrollResize), addEvent(window, "resize", Pagination.scrollResize)
    },
    setScroll: function(e) {
        scrollToY(e, 0)
    },
    reinit: function(e) {
        cur.initScrollFn(e), bodyNode.appendChild(cur.pgFixed), browser.mobile || (addEvent(cur.pgFixed, "mouseover", Pagination.fixedOver), addEvent(cur.pgFixed, "mouseout", Pagination.fixedOut), addEvent(window, "keydown", Pagination.keyNav))
    },
    pageTopUpdated: function() {
        cur.pgFixedStart = getXY(cur.pgCont)[1], cur.pgFixedDelta = -cur.pgFixed.offsetTop, cur.pgNodesCount && (cur.pgFixedDelta += cur.pgFixedStart - cur.pgCont.childNodes[0].offsetTop)
    },
    pageReady: function(e) {
        e && (cur.pgPage = cur.pgStartPage = Math.floor(cur.pgStart / cur.pgPerPage)), cur.pgNodesCount = cur.pgCont.childNodes.length, Pagination.pageTopUpdated(), setTimeout(Pagination.genFixed, 0)
    },
    deinit: function() {
        removeEvent(Pagination.scrollnode(), "scroll", Pagination.scrollResize), removeEvent(window, "resize", Pagination.scrollResize), removeEvent(window, "keydown", Pagination.keyNav), removeEvent(cur.pgFixed, "mouseover", Pagination.fixedOver), removeEvent(cur.pgFixed, "mouseout", Pagination.fixedOut), re(cur.pgFixed)
    },
    genFixed: function() {
        if (!(cur.pgStart + cur.pgCount <= cur.pgPerPage)) {
            var e, r, i, a, t = cur.pgHref ? ' href="' + cur.pgHref + '%d"' : "",
                o = ' onclick="' + (cur.pgOnClick || "return nav.go(this, event, {pgFromFixed: true})") + '"',
                n = cur.pgPage,
                g = cur.pgPerPage,
                c = cur.pgDelta || 2,
                u = Math.ceil(cur.pgCount / g),
                p = [];
            n > c && (cur.pgByOne ? (e = (n - 1) * g, r = "&lsaquo;") : (e = 0, r = "&laquo;"), p.push('<a class="pg_flnk_nb"' + t.replace("%d", e) + o.replace("%d", e) + ">" + r + "</a>"));
            for (var d = Math.max(0, n - c); n > d; ++d) e = d * g, i = d >= cur.pgStartPage ? "pg_flnk_rd" : "pg_flnk", p.push('<a class="' + i + '"' + t.replace("%d", e) + o.replace("%d", e) + ">" + (d + 1) + "</a>");
            p.push('<a class="pg_flnk_sel"' + t.replace("%d", n * g) + o.replace("%d", n * g) + ">" + (n + 1) + "</a>");
            for (var d = n + 1; n + c + 1 > d && u > d; ++d) e = d * g, i = e >= cur.pgStart + cur.pgNodesCount ? "pg_flnk" : "pg_flnk_rd", p.push('<a class="' + i + '"' + t.replace("%d", e) + o.replace("%d", e) + ">" + (d + 1) + "</a>");
            u - c - 1 > n && (cur.pgByOne ? (e = (n + 1) * g, r = "&rsaquo;") : (e = (u - 1) * g, r = "&raquo;"), p.push('<a class="pg_flnk_nb"' + t.replace("%d", e) + o.replace("%d", e) + ">" + r + "</a>")), cur.pgFixedPages.innerHTML = p.join(""), isVisible(cur.pgFixed) ? a = getSize(cur.pgFixedPages) : (show(cur.pgFixed), a = getSize(cur.pgFixedPages), hide(cur.pgFixed)), setStyle(cur.pgFixedBack, {
                width: a[0],
                height: a[1]
            }), Pagination.updateFixed({
                type: "all"
            })
        }
    },
    keyNav: function(e) {
        if (!(layers.visible || cur.pgNoArrowNav && cur.pgNoArrowNav() || !e.ctrlKey && !e.metaKey)) {
            var r = cur.pgPage,
                i = cur.pgPerPage;
            if (e.keyCode == KEY.RIGHT ? ++r : e.keyCode == KEY.LEFT && --r, !(r == cur.pgPage || 0 > r || r >= Math.ceil(cur.pgCount / i))) {
                var a = nav.objLoc;
                return r ? a.offset = r * i : delete a.offset, nav.go(a, !1, {
                    pgFromFixed: isVisible(cur.pgFixed)
                }), cancelEvent(e)
            }
        }
    },
    nav: function(e, r, i, a) {
        if (!isEmpty(e)) {
            var t = intval(void 0 === e.offset ? r.offset : e.offset),
                o = a.pgFromFixed;
            if (delete e.offset, isEmpty(e)) {
                if ((o || a.hist) && (t > cur.pgStart && t < cur.pgStart + cur.pgNodesCount || t == cur.pgStart && scrollGetY() >= cur.pgFixedStart)) {
                    var n = cur.pgCont.childNodes[t - cur.pgStart].offsetTop + cur.pgFixedDelta,
                        g = Math.floor(t / cur.pgPerPage);
                    return nav.setLoc(i), cur.pgPage = g, setTimeout(function() {
                        Pagination.setScroll(n), Pagination.genFixed()
                    }, 0), !1
                }
                if (cur.pgUrl) return ajax.post(cur.pgUrl, extend({
                    offset: t,
                    local: 1
                }, cur.pgParams || {}), {
                    onDone: function() {
                        Pagination.loaded.apply(window, arguments), nav.setLoc(i), setTimeout(function() {
                            (o || !cur.pgNoNavScroll) && Pagination.setScroll(o ? cur.pgFixedStart - cur.pgFixed.offsetTop : 0)
                        }, 0)
                    },
                    frame: 1,
                    canReload: !0
                }), !1
            }
        }
    },
    fixedOver: function() {
        cur.pgOver = !0, clearTimeout(cur.pgTimer), cur.pgTimer = setTimeout(Pagination.updateFixed, 1e3)
    },
    fixedOut: function() {
        cur.pgOver = !1, clearTimeout(cur.pgTimer), cur.pgTimer = setTimeout(Pagination.updateFixed, 1e3)
    },
    updateFixedLeft: function(e) {
        if (e && ("resize" == e.type || "all" == e.type)) {
            var r = ge("wide_column") || ge("page_body");
            vk.rtl ? cur.pgFixed.style.left = getXY(r)[0] + "px" : cur.pgFixed.style.left = getXY(r)[0] + getSize(r)[0] - getSize(cur.pgFixed)[0] + "px"
        }
    },
    updateFixed: function(e, r) {
        return void 0 === r && (r = scrollGetY()), Pagination.updateFixedLeft(e), !cur.pgOver && r < cur.pgFixedStart ? void(isVisible(cur.pgFixed) && !cur.pgHiding && (cur.pgHiding = !0, cur.pgShowing = !1, fadeOut(cur.pgFixed, 300, function() {
            cur.pgHiding = !1
        }))) : void(cur.pgShowing || !cur.pgHiding && isVisible(cur.pgFixed) || (cur.pgHiding && data(cur.pgFixed, "tween").stop(!0), cur.pgShowing = !0, fadeIn(cur.pgFixed, 300, function() {
            cur.pgShowing = !1
        })))
    },
    scrollResize: function(e) {
        if (!(browser.mobile && !browser.safari_mobile || cur.pgPaused)) {
            var r = document.documentElement,
                i = scrollGetY();
            if ("scroll" == e.type) {
                if (!cur.pgCont) return void Pagination.deinit();
                var a = cur.pgCont.childNodes,
                    t = Math.ceil(cur.pgNodesCount / cur.pgPerPage),
                    o = cur.pgPage - cur.pgStartPage;
                if (i > 50 && (o >= t || i < a[o * cur.pgPerPage].offsetTop + cur.pgFixedDelta)) {
                    for (o = Math.min(o, t - 1); o >= 0 && !(i >= a[o * cur.pgPerPage].offsetTop + cur.pgFixedDelta); --o);
                    ++o
                } else
                    for (50 >= i && (o = 0); t > o && !(i < a[o * cur.pgPerPage].offsetTop + cur.pgFixedDelta); ++o);
                o == t - 1 && a[cur.pgNodesCount - 1] && i + lastWindowHeight > a[cur.pgNodesCount - 1].offsetTop + cur.pgFixedDelta && ++o, o > 0 && --o, cur.pgPage != cur.pgStartPage + o ? (cur.pgPage = cur.pgStartPage + o, Pagination.genFixed()) : Pagination.updateFixed(e)
            } else "resize" == e.type && Pagination.updateFixed(e);
            if (cur.pgOnScroll && cur.pgOnScroll(e, i), !(!cur.pgMore || cur.pgIgnore && cur.pgIgnore())) {
                var n = window.innerHeight || r.clientHeight || bodyNode.clientHeight;
                if (isVisible(cur.pgMore)) {
                    var g = cur.pgCustomOffset || 0;
                    i + g + n > cur.pgMore.offsetTop && Pagination.showMore()
                }
            }
        }
    },
    prepare: function(e, r, i) {
        return ce("div", {
            innerHTML: i
        })
    },
    clearPreload: function() {
        var e = extend({
                offset: "",
                part: 1
            }, cur.pgParams || {}),
            r = ("/" == cur.pgUrl.substr(0, 1) ? "" : "/") + cur.pgUrl + "#" + ajx2q(e),
            i = new RegExp("^" + escapeRE(r).replace(/([&#]offset=)/, "$1\\d+") + "$", "i");
        for (var a in ajaxCache) i.test(a) && delete ajaxCache[a]
    },
    recache: function(e) {
        if (cur.pgLoading) return cur.pgLoading = 1, void setTimeout(Pagination.recache.pbind(e), 100);
        var r = extend({
                offset: cur.pgOffset,
                part: 1
            }, cur.pgParams || {}),
            i = ("/" == cur.pgUrl.substr(0, 1) ? "" : "/") + cur.pgUrl,
            a = i + "#" + ajx2q(r),
            t = ajaxCache[a];
        if (t) {
            t[0] += e, t[1] += e;
            var o = i + "#" + ajx2q(extend(r, {
                offset: cur.pgOffset + e
            }));
            ajaxCache[o] = t, delete ajaxCache[a]
        }
        cur.pgOffset += e, cur.pgCount += e
    },
    loaded: function(e, r, i, a, t, o) {
        extend(cur, {
            pgOffset: r,
            pgCount: e
        });
        var n = o ? !0 : !1;
        if (n) cur.pgStart = a, cur.pgCont.innerHTML = i, cur.pgPages.innerHTML = t;
        else
            for (var g = ge(cur.pgCont), c = (cur.pgPrepare || Pagination.prepare).apply(window, arguments); c.firstChild;) g.appendChild(c.firstChild);
        if (toggle(cur.pgMore, r < cur.pgCount && i), Pagination.clearPreload(), o) ajax.preload(cur.pgUrl, extend({
            offset: cur.pgOffset,
            part: 1
        }, cur.pgParams || {}), o);
        else if (r < cur.pgCount && i) {
            var u = extend({
                    offset: cur.pgOffset,
                    part: 1
                }, cur.pgParams || {}),
                p = ("/" == cur.pgUrl.substr(0, 1) ? "" : "/") + cur.pgUrl + "#" + ajx2q(u);
            cur.pgLoading = 1, ajax.post(cur.pgUrl, u, {
                cache: 1,
                onDone: function() {
                    2 == cur.pgLoading ? (Pagination.loaded.apply(window, arguments), delete ajaxCache[p]) : cur.pgLoading = !1
                },
                onFail: function() {
                    return cur.pgLoading = 0, !0
                }
            })
        }
        Pagination.pageReady(n), cur.pgPostProcess && cur.pgPostProcess.apply(window, arguments)
    },
    showMore: function() {
        cur.pgUrl || cur.pgShow();
        var e = "button" === cur.pgMore.tagName.toLowerCase(),
            r = e ? lockButton.pbind(cur.pgMore) : function() {
                show(cur.pgMorePrg), hide(domFC(cur.pgMore))
            },
            i = e ? unlockButton.pbind(cur.pgMore) : function() {
                show(domFC(cur.pgMore)), hide(cur.pgMorePrg)
            };
        if (!(!isVisible(cur.pgMore) || e && buttonLocked(cur.pgMore) || isVisible(cur.pgMorePrg))) return cur.pgLoading ? void(cur.pgLoading = 2) : void ajax.post(cur.pgUrl, extend({
            offset: cur.pgOffset,
            part: 1
        }, cur.pgParams || {}), {
            onDone: Pagination.loaded,
            onFail: function() {
                return cur.pgLoading = 0, !0
            },
            showProgress: r,
            hideProgress: i,
            cache: 3
        })
    }
};
try {
    stManager.done("pagination.js")
} catch (e) {}