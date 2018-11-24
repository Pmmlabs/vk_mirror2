var tooltips = {
    show: function(el, options) {
        if (el.hidetimer) return el.hidetimer && clearTimeout(el.hidetimer), void(el.hidetimer = 0);
        if (el.tt) {
            if (el.tt.shown = !1, el.ttimer && clearTimeout(el.ttimer), isFunction(options.text)) {
                var tt_text = domByClass(el.tt.container, "tt_text");
                if (tt_text) {
                    var text = options.text();
                    if (!text) return;
                    tt_text.innerHTML = text
                }
            }
            var opts = extend(el.tt.opts ? clone(el.tt.opts) : {}, options || {}),
                isNewTT = void 0 !== opts.dir;
            if (!el.tt.el) return el.tt = "show", void(el.ttimer = setTimeout(function() {
                return el.tt.el ? (opts.showdt = 0, void tooltips.show(el, opts)) : void(el.tt = "shownow")
            }, opts.showdt || 0));
            var canshow = opts.js ? eval("(function(){return function(){var tip=this;" + opts.js + "};})()").apply(el.tt) !== !1 : !0;
            if (canshow) return isVisible(el.tt.container) ? void(el.tt.showing || animate(el.tt.container, {
                opacity: 1
            }, void 0 !== opts.showsp ? opts.showsp : 200)) : void(el.ttimer = setTimeout(function() {
                var t = el.tt.container;
                if (!isVisible(t)) {
                    var e = opts.forcexy ? opts.forcexy : getXY(el),
                        o = opts.forcesize ? opts.forcesize : getSize(el, !1, !0),
                        i = opts.toup,
                        s = vk.rtl && !opts.asrtl || opts.asrtl && !vk.rtl,
                        n = ge("page_header_wrap") && isAncestor(el, "page_layout") ? getSize("page_header_wrap") : [0, 0];
                    if (!o[0] && !o[1]) return void hide(el.tt.container);
                    t.style.opacity = 0, opts.width && (t.style.width = opts.width + "px"), opts.maxWidth && (t.style["max-width"] = opts.maxWidth + "px"), show(t), isNewTT || (t.firstChild.className = "toup" + (opts.toup ? 1 : ""));
                    var r = opts.shift;
                    isFunction(r) && (r = r()), void 0 !== r && 2 == r.length && r.push(r[1]);
                    var l = bodyNode.scrollTop || htmlNode.scrollTop || 0,
                        d = getSize(t),
                        a = e[1] - d[1] - r[1] - n[1] - l,
                        p = lastWindowHeight - (e[1] + o[1] + d[1] + r[2]) + l,
                        c = 0 > a,
                        h = 0 > p,
                        u = 0 > a;
                    c && h ? (a > p && a + l > 0 && (i = !0, u = !1), i && u ? i = !1 : i || !h || u || (i = !0)) : i && c ? i = !1 : i || !h || c || (i = !0);
                    var v = opts.needLeft || (opts.black || opts.checkLeft) && window.lastWindowWidth && lastWindowWidth - (e[0] + (s ? o[0] + r[0] : d[0] - r[0])) < 1,
                        f = "";
                    opts.forceright && (v = 0), opts.forcetodown && (i = !1), opts.forcetoup && (i = !0), isNewTT ? (removeClass(t, "tt_up"), removeClass(t, "tt_down"), f = opts.dir && inArray(opts.dir, ["up", "down", "left", "right"]) ? "tt_" + opts.dir : "tt_" + (i ? "down" : "up"), addClass(t, f), toggleClass(t, "toleft", !!v), d = getSize(t)) : (f = "toup" + (i ? 1 : ""), (i != opts.toup || v) && (f += v ? " toleft" : "", d = getSize(t)), t.firstChild.className = f, addClass(t, i ? "tt_toup" : ""));
                    var m = getXY(domPN(t));
                    e[0] -= m[0], e[1] -= m[1];
                    var w = domPN(t);
                    if (el.tt.zIndexEls = [], !opts.noZIndex)
                        for (; w && w != bodyNode && !hasClass(w, "scroll_fix");) {
                            var x = intval(getStyle(w, "zIndex")),
                                g = intval(w.ttCount);
                            if (x && !g) break;
                            setStyle(w, "zIndex", opts.zIndex || 100), el.tt.zIndexEls.push(w), w.ttCount = g + 1, w = domPN(w)
                        }
                    var _;
                    _ = isNewTT ? !inArray(opts.dir, ["left", "right"]) || opts.forcetoup || opts.forcetodown ? i ? e[1] - (d[1] + r[1]) : e[1] + o[1] + r[2] : e[1] - Math.floor(d[1] / 2) - r[1] : e[1] + (i ? -(d[1] + r[1]) : o[1] + r[2]);
                    var y = _ + intval(opts.slide) * (i ? -1 : 1),
                        C = e[0] + (s ? r[0] + o[0] - d[0] : i ? -r[0] : -(r[3] || r[0]));
                    v && (C -= (d[0] - (opts.reverseOffset || 39)) * (s ? -1 : 1)), opts.center && (addClass(t, "tocenter"), d[0] != o[0] && (C -= s ? 0 : (d[0] - o[0]) / 2));
                    var T = C + (s ? -1 : 1) * intval(opts.slideX);
                    if (opts.showIfFit && (C + m[0] < 0 || C + m[0] + d[0] > lastWindowWidth || _ + m[1] < 0 || _ + m[1] + d[1] > lastWindowHeight)) return hide(el.tt.container);
                    el.tt.showing = !0, setStyle(t, {
                        top: y,
                        left: T
                    });
                    var b = {
                        opacity: 1
                    };
                    T != C && (b.left = C), y != _ && (b.top = _), animate(t, b, void 0 !== opts.showsp ? opts.showsp : 200, function() {
                        el.tt && el.tt.showing && (el.tt.showing = !1), opts.onShowEnd && opts.onShowEnd(), el.tt && (el.tt.shown = !0)
                    }), opts.onShowStart && opts.onShowStart(el.tt)
                }
            }, opts.showdt || 0))
        }
    },
    clearZindex: function(t) {
        t.tt && t.tt.opts && t.tt.zIndexEls && each(t.tt.zIndexEls, function() {
            var t = intval(this.ttCount);
            1 >= t ? (setStyle(this, "zIndex", ""), this.ttCount = 0) : this.ttCount = t - 1
        })
    },
    hide: function(t, e) {
        return t.tt && (t.tt.shown = !1), (e || {}).fasthide ? (clearTimeout(t.hidetimer), clearTimeout(t.ttimer), t.hidetimer = 0, t.tt && t.tt.el && hide(t.tt.container), void tooltips.clearZindex(t)) : void(t.hidetimer || (t.hidetimer = setTimeout(function() {
            if (t.hidetimer = 0, clearTimeout(t.ttimer), !t.tt || "hide" == t.tt || t.tt.el && !isVisible(t.tt.container)) return t.tt && t.tt.el && hide(t.tt.container), void tooltips.clearZindex(t);
            var o = extend(t.tt.opts ? clone(t.tt.opts) : {}, e || {});
            return t.tt.el ? void(t.ttimer = setTimeout(function() {
                o.hasover || setStyle(t.tt.container, {
                    pointerEvents: "none"
                }), fadeOut(t.tt.container, void 0 !== o.showsp ? o.showsp : 200, function() {
                    t.tt && t.tt.container && setStyle(t.tt.container, {
                        pointerEvents: "auto"
                    }), tooltips.clearZindex(t)
                }), o.onHide && o.onHide()
            }, o.hidedt || 0)) : void(t.tt = "hide")
        }, 1)))
    },
    hideAll: function(t) {
        if (cur.tooltips)
            for (var e = 0; e < cur.tooltips.length; ++e) {
                var o = cur.tooltips[e];
                (!t || isAncestor(o.el, t)) && (o.opts.forceNoHide || (o.el && o.el.ttimer && clearTimeout(o.el.ttimer), o.hide({
                    fasthide: !0
                })))
            }
    },
    rePositionTT: function(t) {
        if (t) {
            var e = t.opts,
                o = t.el,
                i = t.container,
                s = getXY(o),
                n = getSize(o, !1, !0);
            if (n[0] || n[1]) {
                var r = getSize(i),
                    l = e.needLeft || e.black && lastWindowWidth && lastWindowWidth - (s[0] + r[0]) < 1,
                    d = hasClass(i.firstChild, "toup1") || e.toup || hasClass(i, "tt_down"),
                    a = e.shift,
                    p = vk.rtl && !e.asrtl || e.asrtl && !vk.rtl;
                isFunction(a) && (a = a());
                var c = getXY(domPN(i));
                s[0] -= c[0], s[1] -= c[1];
                var h = s[0] + (p ? a[0] + n[0] - r[0] : d ? -a[0] : -(a[3] || a[0]));
                l && (h -= r[0] - 39), e.center && r[0] != n[0] && (h -= (r[0] - n[0]) / 2);
                var u = s[1] + (d ? -(r[1] + a[1]) : n[1] + a[2]);
                setStyle(i, {
                    left: h,
                    top: u
                })
            }
        }
    },
    rePositionAll: function() {
        if (cur.tooltips)
            for (var t = 0; t < cur.tooltips.length; ++t) {
                var e = cur.tooltips[t].opts;
                e && (e.nohideover || e.nohide) && tooltips.rePositionTT(cur.tooltips[t])
            }
    },
    destroy: function(t) {
        if (t) {
            if (clearTimeout(t.ttimer), clearTimeout(t.hidetimer), t.tt && t.tt.el) {
                if (t.tt.onClean && t.tt.onClean(), cleanElems(t.tt.container), removeEvent(t, "mouseout", t.tthide), t.tt.container) {
                    var e = domPN(t.tt.container);
                    e && e.removeChild(t.tt.container)
                }
                tooltips.clearZindex(t), t.tt.el = !1
            }
            removeAttr(t, "tt", "tthide", "ttimer", "hidetimer")
        }
    },
    destroyAll: function(t) {
        if (cur.tooltips) {
            for (var e = 0; e < cur.tooltips.length; ++e)(!t || isAncestor(cur.tooltips[e].el, t)) && cur.tooltips[e].destroy();
            t || delete cur.tooltips
        }
    },
    create: function(t, e) {
        void 0 !== e.shift && 2 == e.shift.length && e.shift.push(e.shift[1]);
        var o = extend({
            shift: e.black ? [11, 8, 8] : void 0 !== e.dir ? [2, 8, 8] : [2, 3, 3],
            toup: !0
        }, e);
        e.black && !o.dir && (o.dir = "auto", o.typeClass = "tt_black"), t.tthide || (t.tthide = tooltips.hide.pbind(t), e.nohide || addEvent(t, "mouseout", t.tthide));
        var i = o.no_shadow ? " tt_no_shadow" : "";
        if (!o.content) {
            if (t.tt && !o.force) {
                if (t.hidetimer) return clearTimeout(t.hidetimer), void(t.hidetimer = 0);
                return
            }
            if (!o.text) {
                if (!o.url) return;
                return clearTimeout(t.ttimer), void(t.ttimer = setTimeout(function() {
                    t.tt = "show", ajax.post(o.url, o.params || {}, {
                        onDone: function(e, i) {
                            var s = t.tt,
                                n = clone(o);
                            extend(n, {
                                content: e || "",
                                js: i
                            }), tooltips.create(t, n), "shownow" == s && tooltips.show(t, extend(n, {
                                showdt: 0
                            }))
                        },
                        onFail: function() {
                            return !0
                        },
                        cache: o.cache || 0
                    }), tooltips.show(t, o)
                }, o.ajaxdt || 0))
            }
            o.content = '<div class="tt_text">' + (isFunction(o.text) ? o.text() : o.text) + "</div>"
        }
        if (void 0 !== o.dir) var s = "tt_w";
        else var s = "tt";
        var n = void 0 !== o.dir ? o.typeClass || "tt_default" : "",
            r = s + " " + n + " " + (o.className || "");
        if (t.tt && t.tt.el) {
            var l = t.tt.container;
            t.tt.onClean && t.tt.onClean(), geByClass1("wrapped", l).innerHTML = o.content, extend(t.tt, {
                opts: o,
                show: tooltips.show.pbind(t, e)
            }), l.className = r, hide(l)
        } else {
            if (o.black) var d = ce("div", {
                innerHTML: o.content,
                className: r
            }, {
                display: "none"
            });
            else if (void 0 !== o.dir) var d = ce("div", {
                innerHTML: '<div class="wrapped">' + o.content + "</div>",
                className: r + i
            }, {
                display: "none"
            });
            else var d = ce("div", {
                innerHTML: '<table cellspacing="0" cellpadding="0">    <tr><td colspan="3" class="tt_top"><div class="top_pointer"></div></td></tr>    <tr>      <td class="side_sh"></td>      <td class="outer"><table cellspacing="0" cellpadding="0">        <tr><td class="side_sh"></td>          <td class="wrapped">' + o.content + '</td>        <td class="side_sh"></td></tr>        <tr><td colspan="3"><div class="bottom_sh"></div></td></tr>      </table></td>      <td class="side_sh"></td>    </tr>    <tr><td colspan="3" class="tt_bottom"><div class="bottom_sh"></div><div class="bottom_pointer' + i + '"></div></td></tr>  </table>',
                className: r
            }, {
                display: "none"
            });
            var a = domPN(t);
            if (e.appendEl) a = e.appendEl;
            else if (e.appendParentCls) a = domClosest(e.appendParentCls, a);
            else if (a = domClosest("tt_w", a) || domClosest("tt_default", a), !a)
                do a = domClosestPositioned(a || t, {
                    noOverflow: !0
                }); while (hasClass(a, "tt_noappend"));
            a || (a = bodyNode), a.appendChild(d);
            var p = extend({
                el: t,
                opts: o,
                show: tooltips.show.pbind(t, e),
                hide: t.tthide,
                destroy: tooltips.destroy.pbind(t),
                container: d
            }, o.tip || {});
            o.nohideover || o.text && !o.hasover || (addEvent(d, "mouseover", p.show), addEvent(d, "mouseout", p.hide)), removeClass(p.container, "fixed"), setStyle(p.container, {
                position: "absolute"
            }), t.tt = p, cur.tooltips || (cur.tooltips = []), cur.tooltips.push(p)
        }
        o.init && o.init(p)
    },
    addAudio: function(t, e, o, i) {
        ajax.post("audio.php", {
            act: "a_add",
            oid: e,
            aid: o,
            hash: i
        }, {
            onDone: function() {
                t.parentNode.replaceChild(ce("div", {
                    className: "fl_r add_audio_plus done"
                }), t)
            },
            onFail: function() {
                return !0
            },
            showProgress: function() {
                hide(t.nextSibling), show(t.previousSibling)
            },
            hideProgress: function() {
                hide(t.previousSibling), show(t.nextSibling)
            }
        })
    }
};
try {
    stManager.done("tooltips.js")
} catch (e) {}