function GridSorter(t, e, i) {
    if (isObject(e) ? i = e : this._dragElClass = e, this.options = extend({
            dragThreshold: GridSorter.DRAG_THRESHOLD_DIST
        }, i), this._contEl = ge(t), this._contEl) {
        this._excludedCount = 0;
        for (var o = 0; o < this._contEl.children.length; o++) this._contEl.children[o].getAttribute("nodrag") && this._excludedCount++;
        addEvent(this._contEl, "mousedown", this._ev_mousedown_handler = this._onMouseDown.bind(this)), setStyle(this._contEl, "position", "relative"), this._inited = !0
    }
}
GridSorter.AUTO_SCROLL_DY = 10, GridSorter.DRAG_THRESHOLD_DIST = 0, GridSorter.AUTO_SCROLL_DISTANCE_THRESHOLD = 300, GridSorter.AUTO_SCROLL_GAP = 300, GridSorter.prototype.destroy = function() {
    this._inited = !1, this._deinitEvents(!0)
}, GridSorter.prototype._getParentDragItemEl = function(t) {
    for (var e, i = t; i && (e = domPN(i)) != this._contEl;) i = e;
    return i == this._curPlaceholderEl && (i = null), i
}, GridSorter.prototype._onKey = function(t) {
    t.keyCode == KEY.ESC && this.isCurrentlyDragging() && this._onMouseUp()
}, GridSorter.prototype._onMouseDown = function(t) {
    if (!(this._disabled || 0 != t.button || this._curDragEl || attr(t.target, "nodrag")) && (this._dragElClass ? domClosest(this._dragElClass, t.target) : 1)) {
        for (var e = t.target; e && e != window.document;) {
            if (intval(domData(e, "nodrag"))) return;
            e = domPN(e)
        }
        var i = this._getParentDragItemEl(t.target);
        if (i && !attr(i, "nodrag") && (re(geByClass1("ui_gridsorter_placeholder"), this._contEl), this._contInfo = this._contInfo || {
                prevSize: getSize(this._contEl)
            }, this._ensureGridIsActual(), !(this._grid.length <= 1))) {
            var o = window.getComputedStyle(i),
                r = getXY(i);
            this._initial = {
                candidateEl: i,
                x: t.clientX,
                y: t.clientY,
                itemMargin: {
                    x: parseInt(o.marginLeft),
                    y: parseInt(o.marginTop)
                },
                shift: {
                    x: t.pageX - r[0],
                    y: t.pageY - r[1]
                }
            }, addEvent(document, "mousemove", this._ev_mousemove_handler = this._onMouseMove.bind(this)), addEvent(document, "mouseup", this._ev_mouseup_handler = this._onMouseUp.bind(this)), addEvent(document, "keydown", this._ev_keydown_handler = this._onKey.bind(this)), cur.cancelClick = !1, cancelEvent(t)
        }
    }
}, GridSorter.prototype._dist = function(t) {
    return Math.abs(t.clientX - this._initial.x) + Math.abs(t.clientY - this._initial.y)
}, GridSorter.prototype._onMouseUp = function(t) {
    var e = this._curDragEl,
        i = !t,
        o = this;
    if (this._curDragEl) {
        this._curDragEl = null, removeClass(e, "ui_gridsorter_moveable_notrans"), this._curOverCell || (this._curOverCell = {
            el: this._curPlaceholderEl,
            pos: getXY(this._curPlaceholderEl),
            size: getSize(this._curPlaceholderEl)
        });
        var r = this._curOverCell.pos,
            s = this._curOverCell.el,
            n = this._grid[this._curDragCellIndex],
            l = n.size;
        gpeByClass("_ape_item_list", e) && (r[0] += 20, r[1] += 20), this._isShiftToLeft && (r[1] -= l[1] - this._curOverCell.size[1]), setTimeout(function() {
            if (i) {
                for (var t = 0, s = o._grid.length; s > t; t++) {
                    var n = o._grid[t];
                    n.dirty && o._setPos(n.el, {
                        left: 0,
                        top: 0
                    })
                }
                o._setPos(e, o._initialCurDragPos)
            } else o._setPos(e, {
                left: r[0],
                top: r[1]
            })
        }), setTimeout(function() {
            if (re(o._curPlaceholderEl), removeClass(o._contEl, "ui_gridsorter_cont"), o.options.dragCls && removeClass(e, o.options.dragCls), o._inited) {
                if (i) {
                    for (var t = 0, r = o._grid.length; r > t; t++) {
                        var n = o._grid[t];
                        n.dirty && o._setPos(n.el, {
                            left: null,
                            top: null
                        })
                    }
                    o._setPos(e, {
                        left: null,
                        top: null,
                        width: null,
                        height: null
                    })
                } else {
                    var l = o._isShiftToLeft ? domNS(s) : s;
                    o._contEl.insertBefore(e, l);
                    var h, a = -1,
                        _ = o._initial.hasInlineSize;
                    o._setPos(e, {
                        left: null,
                        top: null
                    }), _ || setStyle(e, {
                        width: null,
                        height: null
                    });
                    for (var t = 0, r = o._grid.length; r > t; t++) {
                        var n = o._grid[t];
                        (n.dirty || n.el == e) && (o._setPos(n.el, {
                            left: null,
                            top: null
                        }), _ || setStyle(n.el, {
                            width: null,
                            height: null
                        }), n.pos = o._calcElementPos(n.el), n.dirty = !1), n.el == e ? h = t : n.el == s && (a = t)
                    }
                    if (a >= 0) {
                        var d = o._grid.splice(h, 1);
                        o._grid.splice(a, 0, d[0])
                    }
                }
                removeClass(e, "ui_gridsorter_moveable"), o._curOverCell = o._curPlaceholderEl = null, i && o.update(), s != e && !i && o.options.onReorder && o.options.onReorder(e, l, domPS(e))
            }
        }, 210), t && this._dist(t) > 5 && (cancelEvent(t), cur.cancelClick = !0)
    }
    this._updateScrollbar(), this._deinitEvents(), e && this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, e), i || e && this._overEl && this.options.onDragDrop && (i = this.options.onDragDrop(this._overEl, e)), this._overEl = null
}, GridSorter.prototype._deinitEvents = function(t) {
    t && (this._onMouseUp(), removeEvent(this._contEl, "mousedown", this._ev_mousedown_handler)), clearTimeout(this._autoScrollTO), this._autoScrollTO = !1, this._ev_mousemove_handler && removeEvent(document, "mousemove", this._ev_mousemove_handler), this._ev_mouseup_handler && removeEvent(document, "mouseup", this._ev_mouseup_handler), this._ev_keydown_handler && removeEvent(document, "keydown", this._ev_keydown_handler)
}, GridSorter.prototype._setPos = function(t, e) {
    !this.options.noPosTransform && this._grid.length > 100 && (this._hasTranslateFeauture || (this._hasTranslateFeauture = window.getComputedStyle(t).getPropertyValue("transform"))) ? null === e.left || null === e.top ? setStyle(t, {
        transform: null,
        top: null,
        left: null
    }) : setStyle(t, {
        transform: "translate(" + e.left + "px, " + e.top + "px)",
        top: null,
        pos: null
    }) : setStyle(t, extend({
        transform: null
    }, e))
}, GridSorter.prototype._recalc = function() {
    var t = this._curDragEl,
        e = this._curOverCell.el;
    if (this._initGrid(), e != t) {
        for (var i, o = 0, r = !1, s = !1, n = 0, l = this._grid.length; l > n; n++) {
            if (i = this._grid[n], i.el == t) {
                r = !0;
                break
            }
            if (i.el == e) {
                r = !1;
                break
            }
        }
        this._isShiftToLeft = r;
        for (var n = r ? 0 : this._grid.length - 1, h = r ? this._grid.length : -1, a = r ? 1 : -1, _ = [0, 0]; n != h; n += a)
            if (i = this._grid[n], 2 != o)
                if (i.el != t) {
                    if (i.el == e && o++, 1 == o || 2 == o) {
                        var d = 0,
                            c = 0;
                        r ? (d = s.pos[0] + _[0], c = s.pos[1] + _[1], _[0] += i.size[0] - s.size[0], _[1] += i.size[1] - s.size[1]) : (_[0] += s.size[0] - i.size[0], _[1] += s.size[1] - i.size[1], d = s.pos[0] + _[0], c = s.pos[1] + _[1]), this._setPos(i.el, {
                            left: d - i.pos[0],
                            top: c - i.pos[1]
                        }), i.dirty = !0
                    } else i.dirty && (this._setPos(i.el, {
                        left: null,
                        top: null
                    }), i.dirty = !1);
                    s = i
                } else o++, s = i;
        else i.dirty && (this._setPos(i.el, {
            left: null,
            top: null
        }), i.dirty = !1), s = i
    } else
        for (var n = 0, l = this._grid.length; l > n; n++) {
            var i = this._grid[n];
            i.el != t && i.dirty && (i.dirty = !1, this._setPos(i.el, {
                left: null,
                top: null
            }))
        }
}, GridSorter.prototype.disable = function() {
    this._disabled = !0
}, GridSorter.prototype.enable = function() {
    this._disabled = !1, this._initGrid(!0)
}, GridSorter.prototype.update = function() {
    this._disabled || this._initGrid(!0)
}, GridSorter.prototype._ensureGridIsActual = function() {
    this._initGrid()
}, GridSorter.prototype._needGridUpdate = function() {
    if (!this._grid) return 1;
    this._contInfo.prevSize = this._contInfo.prevSize || getSize(this._contEl);
    var t = 0,
        e = this._contEl.children.length - this._excludedCount - intval(!!this._curPlaceholderEl);
    if (e != this._grid.length) t = e > this._grid.length ? 2 : 1, this._contInfo.prevSize = getSize(this._contEl);
    else {
        var i = getSize(this._contEl),
            o = this._contInfo.prevSize;
        (Math.abs(o[0] - i[0]) > 5 || Math.abs(o[1] - i[1]) > 5) && (t = 1), this._contInfo.prevSize = i
    }
    return t
}, GridSorter.prototype._initGrid = function(t) {
    var e = t ? 1 : this._needGridUpdate();
    if (e) {
        1 == e && (this._grid = [], this._contInfo && (delete this._contInfo.pos, delete this._contInfo.size));
        var i = this._grid ? this._grid[this._grid.length - 1] : null;
        this._grid = this._grid || [];
        var o, r = !!i,
            s = this._contEl.children;
        if (0 != s.length)
            for (var n = this._getItemMargins(), l = this._curDragEl ? this._grid.length : 0, h = l, a = s.length; a > h; h++) {
                var _ = s[h];
                i && _ == i.el ? r = !1 : r || _ == this._curPlaceholderEl || _.getAttribute("nodrag") || (o = getSize(_), o[0] += n[0], o[1] += n[1], this._grid.push({
                    el: _,
                    size: o,
                    pos: this._calcElementPos(_)
                }))
            }
    }
}, GridSorter.prototype._getRelativeMousePos = function(t) {
    var e = this._getContPos(),
        i = this._getContShift();
    return {
        left: t.clientX - e[0] - i[0],
        top: t.clientY - e[1] - i[1]
    }
}, GridSorter.prototype._updateDraggablePosition = function(t) {
    if (this._curDragEl) {
        var e = this._getRelativeMousePos(t),
            i = this._getItemShift(),
            o = this._getContShift(),
            r = this._getContSize(),
            s = e.top - this._initial.shift.y - i[1] + o[1];
        this.options.limitBottomMove && (s = Math.min(s, r[1] + 30)), hasClass(this._contEl, "_ape_item_list") && (s += this._contEl.scrollTop), this._setPos(this._curDragEl, {
            left: e.left - this._initial.shift.x - i[0] + o[0],
            top: s
        })
    }
}, GridSorter.prototype._getContShift = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.shift) {
        var t = window.getComputedStyle(this._contEl);
        this._contInfo.shift = [parseFloat(t.paddingLeft), parseFloat(t.paddingTop)]
    }
    return this._contInfo.shift
}, GridSorter.prototype._getContSize = function() {
    return this._contInfo = this._contInfo || {}, this._contInfo.size = getSize(this._contEl), this._contInfo.size
}, GridSorter.prototype._getContPos = function() {
    return this._contInfo = this._contInfo || {}, this._contInfo.pos = getXY(this._contEl), this._contInfo.pos[1] -= scrollGetY(), this._contInfo.pos
}, GridSorter.prototype._getItemShift = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.itemShift) {
        var t = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemShift = [parseFloat(t.marginLeft), parseFloat(t.marginTop)]
    }
    return this._contInfo.itemShift
}, GridSorter.prototype._getItemMargins = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.itemMargins) {
        var t = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemMargins = [parseFloat(t.marginLeft) + parseFloat(t.marginRight), parseFloat(t.marginTop) + parseFloat(t.marginBottom)]
    }
    return this._contInfo.itemMargins
}, GridSorter.prototype._calcElementPos = function(t) {
    var e = this._getContShift(),
        i = this._getItemShift();
    return [t.offsetLeft - e[0] - i[0], t.offsetTop - e[1] - i[1]]
}, GridSorter.prototype.isCurrentlyDragging = function() {
    return !!this._curDragEl
}, GridSorter.prototype._updateScrollbar = throttle(function() {
    var t = this.options.wrapNode || scrollNode,
        e = data(t, "sb");
    e && e.update(!1, !0)
}, 500), GridSorter.prototype._onMouseMove = function(t) {
    function e() {
        return o.options.wrapNode ? o.options.wrapNode.scrollTop : scrollGetY()
    }

    function i(t) {
        o.options.wrapNode ? o.options.wrapNode.scrollTop = t : scrollToY(t, 0, !1, !0)
    }
    var o = this;
    if (this._curDragEl) {
        this._ensureGridIsActual();
        var r = !t;
        r && (t = {
            clientX: this._lastMousePos.x,
            clientY: this._lastMousePos.y
        }), this._lastMousePos = {
            x: t.clientX,
            y: t.clientY
        }, this._updateDraggablePosition(t);
        var s = this._getContSize(),
            n = this._getContPos(),
            l = this._getRelativeMousePos(t),
            h = !1;
        hasClass(this._contEl, "_ape_item_list") && (l.top += this._contEl.scrollTop);
        var a = l.left > 0 && l.left < s[0] && l.top > 0 && l.top < s[1];
        if (a)
            for (var _, d = 0, c = this._grid.length - 1, u = 50; u;) {
                var g = d + Math.floor((c - d) / 2);
                if (_ = this._grid[g], l.left > _.pos[0] && l.top > _.pos[1] && l.left < _.pos[0] + _.size[0] && l.top < _.pos[1] + _.size[1]) {
                    h = _;
                    break
                }
                if (d == c) break;
                l.top < _.pos[1] || l.left < _.pos[0] && l.top < _.pos[1] + _.size[1] ? c = c == g ? c - 1 : g : d = d == g ? d + 1 : g, u--
            } else {
                for (var p, f, v, E, m = 999999, S = 0, y = this._grid.length; y > S; S++) {
                    var _ = this._grid[S];
                    v = l.left - (_.pos[0] + _.size[0] / 2), E = l.top - (_.pos[1] + _.size[1] / 2), f = v * v + E * E, m > f && (m = f, p = _)
                }
                h = p
            }!h || this._curOverCell && this._curOverCell.el == h.el || (this._curOverCell = h, this._recalc());
        var C, D, I, P, G = 0;
        if (this.options.wrapNode) C = P = this.options.wrapNode, D = getSize(C), I = getXY(C), I[1] -= scrollGetY(), G = t.clientY;
        else {
            var w = window,
                f = document,
                z = f.documentElement,
                T = f.getElementsByTagName("body")[0],
                b = w.innerWidth || z.clientWidth || T.clientWidth,
                M = w.innerHeight || z.clientHeight || T.clientHeight;
            P = w.bodyNode, D = [b, M], I = [0, 0], G = t.clientY
        }
        var O = Math.max(20, D[1] / 10),
            L = I[1] + O - G,
            Y = O - (I[1] + D[1] - G);
        if (Y > 0 || L > 0) {
            var x = Math.min(1, L / O),
                F = Math.min(1, Y / O);
            this._autoScrollTO || (this._autoScrollTO = setTimeout(function() {
                o._autoScrollTO = !1;
                var t = e();
                i(t + 16 * (x > 0 ? -x : F)), t != P.scrollTop && (o._updateScrollbar(), o._onMouseMove())
            }, 20))
        }
        if (this.options.onDragOverElClass) {
            var N = t.target;
            hasClass(N, this.options.onDragOverElClass) || (N = gpeByClass(this.options.onDragOverElClass, N)) ? this._overEl != N && (this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl), this.options.onDragEnter && this.options.onDragEnter(N, this._curDragEl), this._overEl = N) : (this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl), this._overEl = null)
        }
    } else if (this._dist(t) > this.options.dragThreshold) {
        this._curDragEl = this._initial.candidateEl;
        for (var S = 0, y = this._grid.length; y > S; S++)
            if (this._grid[S].el == this._curDragEl) {
                this._curDragCellIndex = S;
                break
            }
        this.options.dragCls && addClass(this._curDragEl, this.options.dragCls);
        var R = getSize(this._curDragEl),
            k = getXY(this._curDragEl),
            A = window.getComputedStyle(this._curDragEl),
            n = this._getContPos();
        this._initial.hasInlineSize = !(!this._curDragEl.style.width && !this._curDragEl.style.height), setStyle(this._curDragEl, {
            width: R[0],
            height: R[1]
        }), this._initialCurDragPos = {
            left: k[0] - n[0],
            top: k[1] - n[1] - bodyNode.scrollTop
        }, this._curPlaceholderEl = ce("div", {
            className: "ui_gridsorter_placeholder"
        }), setStyle(this._curPlaceholderEl, {
            width: R[0] + parseFloat(A.marginLeft) + parseFloat(A.marginRight),
            height: R[1] + parseFloat(A.marginTop) + parseFloat(A.marginBottom)
        }), this._contEl.insertBefore(this._curPlaceholderEl, this._curDragEl), addClass(this._curDragEl, "ui_gridsorter_moveable"), addClass(this._curDragEl, "ui_gridsorter_moveable_notrans"), addClass(this._contEl, "ui_gridsorter_cont"), this._onMouseMove(t), this._updateDraggablePosition(t)
    }
    cancelEvent(t)
};
try {
    stManager.done("grid_sorter.js")
} catch (e) {}