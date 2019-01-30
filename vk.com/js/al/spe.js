! function(e) {
    function t() {
        return window.devicePixelRatio >= 2
    }

    function a(e, t, a) {
        function r(t, a) {
            re(o);
            var n = getSize(cur.pvCont)[1],
                r = se(t);
            cur.pvNarrowColumnWrap.appendChild(r), setStyle(r, "height", n), hide(cur.pvNarrowColumn), Le = {}, J = a, J.hash = e.pe_hash, Le.stickersListEl = geByClass1("pe_sticker_pack_list"), Le.tabs = geByClass("pe_tab"), Le.tabContents = geByClass("pe_tab_content"), Le.editPanel = r, extend(cur.lang, a.lang), each(J.stickerPacks, function(e, t) {
                each(t, function(e, t) {
                    Be[t.id] = t
                })
            }), v(), Pe = se("<div></div>"), cur.pvBottomInfo.appendChild(Pe), J.edited && J.canEdit && !cur.shownAs1AprilEditor ? Pe.appendChild(se('<a class="pe_restore_link" onclick="SPE.restoreOriginal()">' + getLang("photos_filtered_restore") + "</a>")) : J.canEdit || cur.shownAs1AprilEditor || Pe.appendChild(se('<span class="pe_bottom_info">' + getLang("photos_will_be_saved_to_pe_album") + "</span>")), Pe.appendChild(G = se('<a class="pe_delete_selected_btn" onclick="SPE.deleteSelected()"></a>')), U = geByClass1("_pe_save_btn"), cur.shownAs1AprilEditor && (hide(geByClass1("pe_tabs", "pv_box")), Le.info1April = ce("div", {
                className: "pe_1april_info",
                innerHTML: e.pe_data.info_1april
            }), cur.pvBox.appendChild(Le.info1April), Le.stickersLimit1AprilMsg = ce("div", {
                className: "pe_1april_stickers_limit",
                innerHTML: e.pe_data.stickers_limit_1april.replace("{selected}", '<span id="pe_1april_selected_stickers_count"></span>').replace("{limit}", '<span class="bold">' + be + "</span>")
            }), cur.pvBottomInfo.appendChild(Le.stickersLimit1AprilMsg)), this.openTab(ge("pe_tab_stickers")), i()
        }
        s(), V = t, Z = a, addClass(cur.pvCont, "pv_pe");
        var o = se('<div id="pe_font_preload">      <div style="font-family: \'ImpactPE\'">test</div>       <div style="font-family: \'Lobster\'">test</div>       <div style="font-family: \'RobotoPE\'">test</div>     </div>');
        cur.pvCont.appendChild(o), hide(domFC(cur.pvBottomInfo)), e.pe_html && e.pe_data ? (r.call(this, e.pe_html, e.pe_data), delete e.pe_html, delete e.pe_data) : ajax.post("al_photos.php", {
            act: "get_editor",
            photo_id: e.id,
            hash: e.pe_hash
        }, {
            onDone: r.bind(this)
        }), cur.shownAs1AprilEditor && n()
    }

    function n() {
        for (var e = cur.pvPhWidth < cur.pvCurData.width ? (cur.pvCurData.width - cur.pvPhWidth) / 2 : 0, t = (cur.pvPhHeight < 449 ? (cur.pvCurData.height - cur.pvPhHeight) / 2 : 0, cur.pvCurPhoto.faked_detected), a = 0; a < t.faces.length; a++) {
            var n = t.faces[a],
                i = ze[irand(0, ze.length - 1)],
                r = Math.max(xe, Math.min(Se, n.width)),
                s = E("sticker", n.x, n.y, extend(Be[i], {
                    size: [r, r],
                    packId: "editor"
                })),
                o = n.y0 - .7 * r,
                l = n.x0 - e;
            e && (r -= e / 2), setStyle(s, {
                transform: "rotate(" + n.rotate + "deg)",
                width: r,
                height: r,
                top: o,
                left: l
            })
        }
        for (var a = 0; a < t.ext.length; a++) {
            var c = t.ext[a];
            for (var d in c) {
                var p, n = c[d],
                    l = 0,
                    o = 0,
                    h = 0;
                if ("eyes" === d ? p = De[irand(0, De.length - 1)] : "nose" === d && (p = Te[irand(0, Te.length - 1)]), l = n.x, o = n.y, h = n.width, e && (h -= e / 2), !(30 > h)) {
                    var s = E("sticker", 0, 0, extend(Be[p], {
                        size: [r, r],
                        packId: "editor"
                    }));
                    setStyle(s, {
                        transform: "rotate(" + n.rotate + "deg)",
                        width: h,
                        height: h,
                        top: o,
                        left: l - e
                    })
                }
            }
        }
    }

    function i() {
        var e = z(!0).length > 0 || Ie.length > 0 || Le.textLayers.children.length > 0;
        if (toggleClass(U, "button_disabled", !e), cur.shownAs1AprilEditor) {
            var t = Le.stickerLayers.children.length;
            t >= be ? addClass(Le.stickersListEl, "pe_stickers_disabled") : removeClass(Le.stickersListEl, "pe_stickers_disabled");
            var a = ge("pe_1april_selected_stickers_count");
            t > 0 ? (val(a, langNumeric(t, cur.lang.pe_1april_limit_N_stickers).replace("{count}", ' <span class="bold">' + t + "</span> ")), show(a.parentNode)) : hide(a.parentNode)
        }
    }

    function r() {
        removeClass(cur.pvCont, "pv_pe"), show(cur.pvNarrowColumn), re(Le.editPanel), re(Le.canvasEl), re(de), Pe && re(Pe), show(domFC(cur.pvBottomInfo)), Z()
    }

    function s() {
        te = null, he = null, Ie = [], _e && _e.destroy(), ve && ve.destroy(), pe && pe.destroy(), _e = ve = pe = null
    }

    function o() {
        function e() {
            i = Math.max(Math.min(0, i), s), setStyle(a, "left", i), toggle(t[0], 0 > i), toggle(t[1], i > s)
        }
        var t = geByClass("pe_sticker_pack_tab_btn"),
            a = geByClass1("pe_sticker_packs_slider_cont"),
            n = domPN(a),
            i = intval(getStyle(a, "left")),
            r = 250,
            s = -a.scrollWidth + getSize(n)[0];
        addEvent(n, "mousewheel", function(t) {
            i -= t.deltaY, e()
        }), addEvent(t[0], "click", function(t) {
            return i += r, e(), cancelEvent(t)
        }), addEvent(t[1], "click", function(t) {
            return i -= r, e(), cancelEvent(t)
        })
    }

    function l(e) {
        each(Le.tabs, function() {
            removeClass(this, "pe_selected")
        }), each(Le.tabContents, function() {
            hide(this)
        }), addClass(e, "pe_selected");
        var t = e.id.split("_")[2],
            a = ge("pe_tab_content_" + t);
        switch (show(a), $ = Q = ee = !1, t) {
            case "stickers":
                C(a);
                break;
            case "text":
                S(a);
                break;
            case "draw":
                I(a)
        }
    }

    function c() {
        var e = te;
        w(), re(e), i()
    }

    function d(e) {
        return 90 == e.keyCode && (e.metaKey || e.ctrlKey) && M(), inArray(e.keyCode, [8, 46]) && te && "TEXTAREA" != e.target.nodeName ? (c(), cancelEvent(e)) : !0
    }

    function p(e, t, a) {
        var n = e + "_" + t;
        if (!Fe[n] || a) {
            var i = vkImage();
            i.crossOrigin = "anonymous", i.onload = function() {
                a && a(this)
            }, i.src = Be[e].sizes[t], Fe[n] = i
        }
    }

    function h(e, t) {
        var a = e + "_" + t;
        return Fe[a]
    }

    function _(e) {
        J.stickerPackSelected = e, each(geByClass("pe_sticker_pack_tab"), function() {
            removeClass(this, "pe_selected")
        }), addClass("pe_stickers_pack_tab_" + e, "pe_selected"), ae && ae.destroy(), Le.stickersListEl.innerHTML = "", setStyle(Le.stickersListEl, "height", getXY(cur.pvCont)[1] + getSize(cur.pvCont)[1] - getXY(Le.stickersListEl)[1] - getSize(geByClass1("pe_bottom_actions"))[1]);
        var a = 0,
            n = 16;
        ae = new uiScroll(Le.stickersListEl, {
            onmoreThreshold: 200,
            onmore: function(t) {
                var i = J.stickerPacks[e].slice(a, a + n);
                each(i, function(e, a) {
                    t.content.appendChild(se('<div class="pe_sticker_preview" data-sticker-id="' + a.id + '"><img src="' + a.sizes[me] + '"/></div>'))
                }), a += n
            }
        });
        var i, r;
        removeEvent(Le.stickersListEl, "mousedown"), addEvent(Le.stickersListEl, "mousedown", function(a) {
            var n = domClosest("pe_sticker_preview", a.target);
            if (n && !(cur.shownAs1AprilEditor && Le.stickerLayers.children.length >= be)) {
                var s = domData(n, "sticker-id"),
                    o = Be[s],
                    l = 1;
                p(s, ke, function(e) {
                    l = e.width / e.height
                });
                var c = se('<div class="pe_sticker_preview_drag"><img src="' + o.sizes[Ce] + '" height="' + we + '"/><div>');
                cur.pvCont.appendChild(c);
                var d = [a.pageX, a.pageY],
                    h = 0;
                return i = function(e) {
                    var t = [we * l, we];
                    cur.shownAs1AprilEditor && (t = [128 * l, 128]), setStyle(c, {
                        left: e.pageX - t[0] / 2,
                        top: e.pageY - scrollGetY() - t[1] / 2
                    });
                    var a = [e.pageX - d[0], e.pageY - d[1]];
                    h = Math.sqrt(a[0] * a[0] + a[1] * a[1])
                }, addEvent(window, "mousemove", i), addEvent(window, "mouseup", r = function(a) {
                    var n = getSize(geByTag1("img", c));
                    re(c);
                    var s = g(a);
                    n && n[0] || (n = [we, we], cur.shownAs1AprilEditor && t() && (n = [we / 2, we / 2])), o = extend({}, o, {
                        size: n,
                        packId: e
                    }), s[0] > 0 && s[0] < K[0] && s[1] > 0 && s[1] < K[1] ? E("sticker", s[0], s[1], o) : 5 > h && E("sticker", K[0] / 2, K[1] / 2, o), removeEvent(window, "mousemove", i), removeEvent(window, "mouseup", r)
                }), i(a), cancelEvent(a)
            }
        })
    }

    function v() {
        var e = domFC(cur.pvPhoto),
            t = getSize(e);
        getXY(e);
        Le.canvasEl = se('<div class="pe_canvas">       <div class="pe_canvas_sticker_layers"></div>       <canvas class="pe_drawing_canvas" width="' + t[0] + '" height="' + t[1] + '"></canvas>       <div class="pe_canvas_text_layers"></div>     </div>'), setStyle(Le.canvasEl, {
            width: t[0],
            height: t[1],
            marginTop: e.style.marginTop,
            marginLeft: e.offsetLeft
        }), K = t, cur.pvPhoto.appendChild(Le.canvasEl), Le.textEdits = cur.pvCont, Le.stickerLayers = geByClass1("pe_canvas_sticker_layers", Le.canvasEl), Le.textLayers = geByClass1("pe_canvas_text_layers", Le.canvasEl), Le.drawingCanvas = geByClass1("pe_drawing_canvas", Le.canvasEl);
        var a, n;
        addEvent(Le.canvasEl, "mousedown", function(e) {
            return hasClass(e.target, "pe_textarea") ? void e.originalEvent.stopPropagation() : (cancelEvent(e), $ && $(e), a && removeEvent(window, "mousemove", a), addEvent(window, "mousemove", a = function(e) {
                Q && Q(e)
            }), n && removeEvent(window, "mouseup", n), addEvent(window, "mouseup", n = function(e) {
                ee && ee(e), removeEvent(window, "mousemove", a), removeEvent(window, "mouseup", n)
            }), !1)
        })
    }

    function u(e, t) {
        if (t) return [e.offsetLeft, e.offsetTop];
        var a = getXY(Le.canvasEl),
            n = getXY(e);
        return [n[0] - a[0], n[1] - a[1]]
    }

    function f(e) {
        return [e.offsetWidth, e.offsetHeight]
    }

    function g(e) {
        var t = getXY(Le.canvasEl);
        return [e.pageX - t[0], e.pageY - t[1]]
    }

    function y(e) {
        return e && hasClass(e, "pe_canvas_text_layer")
    }

    function m(e) {
        return geByClass1("pe_layer_text_inner", e)
    }

    function w() {
        B(), ne && (re(ne), te = !1), hide(G)
    }

    function C() {
        o(), _(J.stickerPackSelected), x()
    }

    function k(e) {
        if (w(), ne && re(ne), ne = se('       <div class="pe_layer_selection">         <div class="pe_layer_selection_handler" id="pe_nw"></div>         <div class="pe_layer_selection_handler" id="pe_ne"></div>         <div class="pe_layer_selection_handler" id="pe_se"></div>         <div class="pe_layer_selection_handler" id="pe_sw"></div>       </div>     '), e.appendChild(ne), te = e, y(te)) {
            var t = m(te);
            ie = parseInt(t.style.fontSize), le = t.style.fontFamily, oe = domData(t, "color-index");
            var a = ge("pe_font_roboto");
            le.toLowerCase().indexOf("impact") >= 0 && (a = ge("pe_font_impact")), le.toLowerCase().indexOf("lobster") >= 0 && (a = ge("pe_font_lobster")), radiobtn(a, 1, "pe_fonts"), pe.setValue((ie - Ee) / 100), A(ge("pe_text_color_picker"), oe)
        }
        G.innerHTML = y(te) ? getLang("photos_pe_delete_text") : getLang("photos_pe_delete_sticker"), show(G)
    }

    function x() {
        $ = function(e) {
            if (hasClass(e.target, "pe_layer_selection_handler")) {
                var t, a = e.target.id.split("_")[1],
                    n = gpeByClass("pe_canvas_layer", e.target),
                    i = f(n),
                    r = u(n, !0),
                    s = [r[0] + i[0] / 2, r[1] + i[1] / 2];
                switch (a) {
                    case "se":
                        t = [r[0] + i[0] - s[0], r[1] + i[1] - s[1]];
                        break;
                    case "sw":
                        t = [r[0] - s[0], r[1] + i[1] - s[1]];
                        break;
                    case "ne":
                        t = [r[0] + i[0] - s[0], r[1] - s[1]];
                        break;
                    case "nw":
                        t = [r[0] - s[0], r[1] - s[1]]
                }
                var o = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
                return Q = function(e) {
                    var a = g(e),
                        r = [a[0] - s[0], a[1] - s[1]],
                        l = 180 * (Math.atan2(r[1], r[0]) - Math.atan2(t[1], t[0])) / Math.PI,
                        c = {
                            transform: "rotateZ(" + l + "deg)"
                        };
                    if (!y(te)) {
                        var d = Math.max(xe, Math.sqrt(r[0] * r[0] + r[1] * r[1])),
                            p = d / o,
                            h = i[0] * p,
                            _ = i[1] * p;
                        cur.shownAs1AprilEditor && (h = Math.min(Se, h), _ = Math.min(Se, _)), extend(c, {
                            width: h,
                            height: _,
                            left: s[0] - h / 2,
                            top: s[1] - _ / 2
                        })
                    }
                    setStyle(n, c)
                }, void(ee = !1)
            }
            var l = e.target;
            if (l == Le.canvasEl) return w(), ee = Q = !1, !1;
            var d = !1;
            if (hasClass(l, "pe_layer_selection") && (l = gpeByClass("pe_canvas_layer", l), d = !0), !l || !hasClass(l, "pe_canvas_layer")) return !1;
            k(l);
            var p = g(e),
                h = u(l, !0),
                _ = 0;
            Q = function(e) {
                var t = g(e);
                _ = [p[0] - t[0], p[1] - t[1]], setStyle(l, {
                    left: h[0] - _[0],
                    top: h[1] - _[1]
                })
            }, ee = function(e) {
                var t = _ ? Math.sqrt(_[0] * _[0] + _[1] * _[1]) : 0;
                if (d && y(l) && 2 >= t) return w(), void P(l);
                if (cur.shownAs1AprilEditor) {
                    var a = getSize(l);
                    (l.offsetTop < -a[1] | l.offsetLeft < -a[0] || l.offsetTop > cur.pvPhHeight || l.offsetLeft > cur.pvPhWidth) && c()
                }
            }
        }
    }

    function E(e, a, n, r) {
        var s = se('<div class="pe_canvas_layer"></div>');
        if (w(), "sticker" == e) {
            setStyle(s, "background-image", "url('" + r.sizes[me] + "')"), domData(s, "sticker-id", r.id), domData(s, "pack-id", r.packId);
            var o = (Math.max(K[0], K[1]), r.size[0] / r.size[1]),
                l = [we * o, we];
            cur.shownAs1AprilEditor && t() && (l = [128 * o, 128]), setStyle(s, {
                left: a - l[0] / 2,
                top: n - l[1] / 2,
                width: l[0],
                height: l[1]
            });
            var c = vkImage();
            c.onload = function() {
                setStyle(s, "background-image", "url('" + r.sizes[ke] + "')")
            }, c.src = r.sizes[ke], setTimeout(function() {
                k(s)
            }, 10), Le.stickerLayers.appendChild(s)
        } else if ("text" == e) {
            var d = J.textPlaceholders[irand(0, J.textPlaceholders.length - 1)];
            s.innerHTML = '<span class="pe_layer_text_inner">' + d + "</span>", setStyle(m(s), {
                fontFamily: le,
                fontSize: ie,
                color: Ae[oe]
            }), setStyle(s, "visibility", "hidden"), domData(m(s), "color-index", oe), setTimeout(function() {
                var e = getSize(s);
                setStyle(s, {
                    top: .7 * K[1],
                    left: .5 * K[0] - e[0] / 2,
                    visibility: null
                })
            }), addClass(s, "pe_canvas_text_layer"), Le.textLayers.appendChild(s)
        }
        return i(), s
    }

    function b(e) {
        if (y(te)) {
            e || (e = {
                fontFamily: le,
                fontSize: ie,
                color: Ae[oe]
            });
            var t = m(te),
                a = e.fontFamily ? e.fontFamily : t.style.fontFamily,
                n = a.toLowerCase().indexOf("impact") >= 0,
                i = a.toLowerCase().indexOf("lobster") >= 0;
            setStyle(t, e), toggleClass(t, "pe_text_impact_style", n), toggleClass(t, "pe_text_lobster_style", i), de && (setStyle(de, e), toggleClass(de, "pe_text_impact_style", n), toggleClass(de, "pe_text_lobster_style", i), triggerEvent(de, "change"))
        }
    }

    function S(e) {
        var t = geByClass1("pe_text_fonts");
        radioBtns.pe_fonts = {
            els: geByClass("_pe_text_font_rdbtn")
        }, removeEvent(t, "click"), addEvent(t, "click", function(e) {
            var t = e.target;
            hasClass(t, "radiobtn") && (radiobtn(t, 1, "pe_fonts"), le = domData(t, "font"), b({
                fontFamily: le
            }))
        }), le = domData(geByClass1("_pe_text_font_rdbtn", t), "font"), pe = pe || new Slider(geByClass1("pe_text_size_slider"), {
            value: .5,
            fireChangeEventOnInit: !0,
            size: 2,
            onChange: function(e) {
                e = 100 * e + Ee, ie = e, b({
                    fontSize: e
                })
            },
            formatHint: function(e) {
                return parseInt(100 * e + Ee)
            }
        }), F(ge("pe_text_color_picker"), function(e, t) {
            if (oe = t, y(te)) {
                var a = m(te);
                setStyle(a, {
                    color: e
                }), domData(a, "color-index", t)
            }
        }, 7);
        var a = Le.textLayers.children.length > 0;
        a || L(), x()
    }

    function L() {
        w();
        var e = E("text", 0, 0);
        setTimeout(P.pbind(e), 5)
    }

    function B() {
        if (te && y(te)) {
            var e = geByClass1("pe_textarea", Le.textEdits);
            if (e) {
                var t = clean(val(e)).replace(/\n/g, "</br>");
                val(geByClass1("pe_layer_text_inner", te), t), domPN(e) && re(e), show(te), de = !1
            }
        }
    }

    function P(e) {
        var t = se('<textarea class="pe_textarea"></textarea>'),
            a = f(e),
            n = u(e, !0),
            i = m(e),
            r = i.innerHTML;
        r = r.replace(/<\/?br>/g, "\n"), val(t, unclean(r));
        var s = window.getComputedStyle(i),
            o = {
                color: "white",
                fontFamily: s.fontFamily,
                fontSize: s.fontSize
            };
        setStyle(t, extend({
            width: a[0] + 2,
            height: a[1],
            left: n[0] + parseInt(Le.textEdits.style.paddingLeft) + parseInt(Le.canvasEl.style.marginLeft),
            top: n[1] + parseInt(Le.canvasEl.style.marginTop)
        }, o)), Le.textEdits.appendChild(t), t.select(), t.focus();
        var l = !0;
        addEvent(t, "input paste change", function() {
            if (l) {
                var e = val(t);
                if (!trim(e)) return l = !1, c();
                e = clean(e).replace(/\n/g, "</br>") + (inArray(e[e.length - 1], ["\n", " "]) ? "&nbsp;" : "");
                var a = se('<div class="pe_text_temp">' + e + "</div>"),
                    n = m(te),
                    i = window.getComputedStyle(n),
                    r = {
                        fontSize: i.fontSize,
                        fontFamily: i.fontFamily,
                        letterSpacing: i.letterSpacing
                    };
                Le.canvasEl.appendChild(a), setStyle(a, r);
                var s = getSize(a);
                re(a), setStyle(t, {
                    width: s[0],
                    height: s[1] + 8
                })
            }
        }), hide(e), te = e, de = t, b(), triggerEvent(t, "change")
    }

    function A(e, t) {
        var a = e.children[t];
        removeClass(geByClass1("pe_selected", e), "pe_selected"), addClass(a, "pe_selected")
    }

    function F(e, t, a) {
        function n(a) {
            var n = a.target,
                i = domData(n, "color-index");
            A(e, i), t(Ae[i], i)
        }
        e.children.length > 0 || (each(Ae, function(t, a) {
            var n = "#FFFFFF" == a ? "pe_drawing_color_white" : "";
            e.appendChild(se('<div class="pe_drawing_color ' + n + '" data-color-index="' + t + '" style="background-color: ' + a + '"></div>'))
        }), removeEvent(e, "click"), addEvent(e, "click", n), addClass(e, "pe_drawing_colors_wrap"), addClass(e, "clear_fix"), n({
            target: e.children[a || 0]
        }))
    }

    function I(e) {
        function t(e) {
            fe = e, D()
        }
        var a;
        w(), $ = function(e) {
            var t = g(e);
            a = [t, clone(t)], a[1][1] += .1, Ie.push({
                color: fe,
                width: ue,
                opacity: ye,
                path: a
            }), H()
        }, Q = function(e) {
            a.push(g(e)), H()
        }, ee = function(e) {
            i(), toggle(Le.undoDrawing, Ie.length > 0)
        }, _e = _e || new Slider(geByClass1("pe_drawing_width_slider"), {
            value: .3,
            fireChangeEventOnInit: !0,
            size: 2,
            log: !0,
            onChange: function(e) {
                e += .1, ue = 20 * e, D()
            },
            formatHint: function(e) {
                return parseInt(100 * e)
            }
        }), ve = ve || new Slider(geByClass1("pe_drawing_intensity_slider"), {
            value: 1,
            fireChangeEventOnInit: !0,
            size: 2,
            onChange: function(e) {
                ye = e, D()
            },
            formatHint: function(e) {
                return parseInt(100 * e) + "%"
            }
        }), F(ge("pe_drawing_color_picker"), t, 0), Le.undoDrawing = geByClass1("_pe_drawing_undo"), removeEvent(Le.undoDrawing, "click"), addEvent(Le.undoDrawing, "click", M), Le.drawingPreview = geByClass1("pe_drawing_preview"), D()
    }

    function z(e) {
        var t = [];
        return each(Le.stickerLayers.children, function() {
            var a = domData(this, "pack-id");
            (!isNaN(a) || e) && t.push(domData(this, "sticker-id"))
        }), t
    }

    function D() {
        if (Le.drawingPreview) {
            var e = Le.drawingPreview.getContext("2d");
            e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.beginPath(), e.moveTo(26, 25), e.bezierCurveTo(69, 65, 162, 61, 180, 23), e.lineWidth = ue, e.strokeStyle = T(fe, ye), e.lineJoin = e.lineCap = "round", e.stroke()
        }
    }

    function T(e, t) {
        var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return "rgba(" + parseInt(a[1], 16) + ", " + parseInt(a[2], 16) + ", " + parseInt(a[3], 16) + ", " + t + ")"
    }

    function M() {
        Ie.pop(), H(), toggle(Le.undoDrawing, Ie.length > 0)
    }

    function H(e, t) {
        var a = e;
        he || a || (he = Le.drawingCanvas.getContext("2d")), e = e || he, t = t || 1, e.lineJoin = e.lineCap = "round", a || e.clearRect(0, 0, e.canvas.width, e.canvas.height);
        for (var n = 0, i = Ie.length; i > n; n++) {
            var r = Ie[n];
            e.lineWidth = r.width * t, e.strokeStyle = T(r.color, r.opacity), e.beginPath(), e.moveTo(r.path[0][0] * t, r.path[0][1] * t);
            for (var s = 0, o = r.path.length; o > s; s++) e.lineTo(r.path[s][0] * t, r.path[s][1] * t);
            e.stroke()
        }
    }

    function O(e) {
        isArray(e) && (e = e[0]);
        var t = 512;
        return 256 >= e ? t = 256 : 128 >= e ? t = 128 : 64 >= e && (t = 64), t
    }

    function N(e) {
        for (var t = (cur.pvPhWidth < cur.pvCurData.width ? (cur.pvCurData.width - cur.pvPhWidth) / 2 : 0, cur.pvPhHeight < 449 ? (cur.pvCurData.height - cur.pvPhHeight) / 2 : 0, []), a = Le.stickerLayers.children, n = 0; n < a.length; n++) {
            var i = a[n],
                r = i.style.transform ? parseFloat(i.style.transform.match(/-?[\d.]+/)[0]) : 0,
                s = cur.pvCurData.width / cur.pvPhWidth,
                o = cur.pvCurData.height / cur.pvPhHeight;
            t.push({
                packId: attr(i, "data-pack-id"),
                stickerId: attr(i, "data-sticker-id").split("_")[1],
                left: i.offsetLeft * s,
                top: i.offsetTop * o,
                width: i.offsetWidth * s,
                height: i.offsetHeight * o,
                rotate: r
            })
        }
        t.length && (lockButton(e), w(), ajax.post("al_photos.php", {
            act: "1april_stickers_save",
            stickers: JSON.stringify(t),
            hash: cur.saveHash1AprilEditor,
            photo_raw: cur.pvCurPhoto.id
        }, {
            onDone: function(e) {
                Photoview.doHide(cur), window.Profile && Profile.render1AprilStickers && Profile.render1AprilStickers(JSON.parse(e));
                var t = geByClass1("page_avatar_wrap");
                addClass(t, "stickers_added_1april"), removeClass(t, "no_stickers_1april")
            },
            onFail: function() {
                unlockButton(e)
            }
        }))
    }

    function X(e) {
        if (cur.shownAs1AprilEditor) return N(e);
        lockButton(e), w();
        var t = vkImage();
        t.setAttribute("crossOrigin", "Anonymous"), t.onerror = function() {
            new MessageBox({
                title: getLang("global_error")
            }).content(getLang("photos_pe_save_error")).setButtons("Ok", function() {
                curBox().hide()
            }).show(), unlockButton(e)
        }, t.onload = function() {
            var a = t.width / K[0],
                n = Le.stickerLayers.children;
            if (n.length) {
                var i = new callHub(function() {
                    R(t, Y.pbind(e))
                }, n.length);
                each(n, function() {
                    var e = f(this)[0] * a,
                        t = domData(this, "sticker-id");
                    p(t, O(e), function() {
                        i.done()
                    })
                })
            } else R(t, Y.pbind(e))
        }, t.src = J.maxPhotoUrl
    }

    function W() {
        var e = "";
        return each(Le.textLayers.children, function() {
            e += m(this).innerHTML
        }), e
    }

    function Y(e, t) {
        var a = new FormData;
        a.append("file0", t, encodeURIComponent("edited_" + irand(99999) + ".jpg"));
        var n = J.upload.url,
            i = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
            s = new i;
        s.open("POST", n, !0), s.onload = function(t) {
            t = t.target.responseText;
            var a = (parseJSON(t), z());
            ajax.post("al_photos.php", {
                act: "pe_save",
                photo: J.photoId,
                hash: J.hash,
                _query: t,
                stickers: a.length ? a.join(",") : null,
                need_copy: J.need_copy,
                texts: W()
            }, {
                onDone: function(e, t, a, n, i) {
                    r(), V(t, a, n, i)
                },
                onFail: function(t) {
                    return unlockButton(e), showFastBox(getLang("global_error"), t), !0
                }
            })
        }, s.send(a)
    }

    function j() {
        var e = J.photoId.split("_");
        ajax.post("al_photos.php", {
            act: "restore_original",
            oid: e[0],
            pid: e[1],
            hash: J.hash
        }, {
            onDone: function(e, t, a, n) {
                r(), V(e, t, a, n)
            }
        })
    }

    function R(e, t) {
        var a = se('<canvas width="' + e.width + '" height="' + e.height + '">'),
            n = a.getContext("2d"),
            i = e.width / K[0],
            r = browser.mozilla ? -5 : browser.chrome ? 7.778 : 0;
        r *= i, n.drawImage(e, 0, 0), each(Le.stickerLayers.children, function() {
            var e = this;
            n.save();
            var t = f(e);
            t[0] *= i, t[1] *= i;
            var a = u(e, !0);
            a[0] *= i, a[1] *= i;
            var r = e.style.transform ? parseFloat(e.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180 : 0;
            n.translate(a[0], a[1]), n.translate(t[0] / 2, t[1] / 2), n.rotate(r), n.translate(-t[0] / 2, -t[1] / 2);
            var s = domData(e, "sticker-id"),
                o = h(s, O(t));
            n.drawImage(o, 0, 0, t[0], t[1]), n.restore()
        }), H(n, i), each(Le.textLayers.children, function() {
            var e = this;
            n.save();
            var t = f(e);
            t[0] *= i, t[1] *= i;
            var a = u(e, !0);
            a[0] *= i, a[1] *= i;
            var s = e.style.transform ? parseFloat(e.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180 : 0;
            n.translate(t[0] / 2, 0), n.translate(a[0], a[1]), n.translate(0, t[1] / 2), n.rotate(s), n.translate(0, -t[1] / 2);
            var o = m(e),
                l = replaceEntities(o.innerHTML.replace(/<br>/g, "\n")).split("\n"),
                c = parseInt(o.style.fontSize) * i,
                d = o.style.fontFamily,
                p = d.toLowerCase().indexOf("impact") >= 0,
                h = d.toLowerCase().indexOf("lobster") >= 0;
            n.textBaseline = "top", n.fillStyle = o.style.color, n.font = c + "px " + d, n.textAlign = "center", p && (n.strokeStyle = "black", n.lineWidth = 10, n.lineJoin = "round"), h && (n.shadowColor = "rgba(0, 0, 0, 0.6)", n.shadowBlur = 3, n.shadowOffsetX = 1, n.shadowOffsetY = 1);
            for (var _ = 0; _ < l.length; _++) p && n.strokeText(l[_], 0, _ * c - r), n.fillText(l[_], 0, _ * c - r);
            n.restore()
        }), a.toBlob(t, "image/jpeg", 1)
    }

    function q(e) {
        if (hasClass(U, "button_disabled")) return r(), e();
        var t = showFastBox({
            title: getLang("photos_pe_are_you_sure_close_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("photos_pe_are_you_sure_close_text"), getLang("box_yes"), function() {
            r(), t.hide(), e()
        }, getLang("box_no"))
    }
    var J, K, U, G, V, Z, $, Q, ee, te, ae, ne, ie, oe, le, de, pe, he, _e, ve, ue, fe, ye, me = t() ? 256 : 128,
        we = 128,
        Ce = t() ? 256 : 128,
        ke = 512,
        xe = 30,
        Ee = 10,
        be = 10,
        Se = 260,
        Le = {},
        Be = {},
        Pe = "",
        Ae = ["#E64646", "#FF9300", "#FFCB00", "#62DA37", "#00AEF9", "#CC74E1", "#000000", "#FFFFFF"],
        Fe = {},
        Ie = [],
        ze = ["editor_4061", "editor_4062", "editor_3992", "editor_3993", "editor_3756", "editor_3759", "editor_3769", "editor_3772", "editor_3541", "editor_3175", "editor_3176", "editor_3177", "editor_3178", "editor_3179", "editor_3180", "editor_3182", "editor_3183", "editor_3190", "editor_3947", "editor_3948", "editor_3995", "editor_4267"],
        De = ["editor_4262", "editor_3994", "editor_3198", "editor_3199", "editor_3200", "editor_3202", "editor_3205", "editor_4270"],
        Te = ["editor_3187", "editor_3188", "editor_3184", "editor_3185"];
    e.SPE = {
        init: a,
        openTab: l,
        onKeyPress: d,
        addTextLayer: L,
        save: X,
        closeEditor: r,
        restoreOriginal: j,
        selectStickerPack: _,
        attemptHide: q,
        deleteSelected: c
    }
}(window);
try {
    stManager.done("spe.js")
} catch (e) {}