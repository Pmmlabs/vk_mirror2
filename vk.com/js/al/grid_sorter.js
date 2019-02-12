/*
  dragThreshold
  onReorder(draggedEl, nextEl, prevEl)
  noPosTransform - force drag positioning with left/top instead of translate()
  limitBottomMove - (dafault: false)
*/


function GridSorter(contEl, dragElClass, options) {
    if (isObject(dragElClass)) {
        options = dragElClass;
    } else {
        this._dragElClass = dragElClass;
    }

    this.options = extend({
        dragThreshold: GridSorter.DRAG_THRESHOLD_DIST
    }, options);

    this._contEl = ge(contEl);

    if (!this._contEl) return;

    this._excludedCount = 0;
    for (var i = 0; i < this._contEl.children.length; i++) {
        if (this._contEl.children[i].getAttribute('nodrag')) {
            this._excludedCount++;
        }
    }

    addEvent(this._contEl, 'mousedown', this._ev_mousedown_handler = this._onMouseDown.bind(this));

    setStyle(this._contEl, 'position', 'relative');

    this._inited = true;
}

GridSorter.AUTO_SCROLL_DY = 10;
GridSorter.DRAG_THRESHOLD_DIST = 0;
GridSorter.AUTO_SCROLL_DISTANCE_THRESHOLD = 300;
GridSorter.AUTO_SCROLL_GAP = 300;

GridSorter.prototype.destroy = function() {
    this._inited = false;
    this._deinitEvents(true);
};

GridSorter.prototype._getParentDragItemEl = function(el) {
    var curEl = el,
        parentEl;

    while (curEl && (parentEl = domPN(curEl)) != this._contEl) {
        curEl = parentEl;
    }

    if (curEl == this._curPlaceholderEl) {
        curEl = null;
    }

    return curEl;
};

GridSorter.prototype._onKey = function(ev) {
    if (ev.keyCode == KEY.ESC && this.isCurrentlyDragging()) {
        this._onMouseUp();
    }
}

GridSorter.prototype._onMouseDown = function(ev) {
    if (
        this._disabled ||
        (ev.button != 0) ||
        this._curDragEl ||
        !!attr(ev.target, 'nodrag') ||
        (this._dragElClass ? !domClosest(this._dragElClass, ev.target) : false)
    ) return;

    var el = ev.target;
    while (el && el != window.document) {
        if (intval(domData(el, 'nodrag'))) {
            return;
        }
        el = domPN(el);
    }

    var itemEl = this._getParentDragItemEl(ev.target);
    if (!itemEl || attr(itemEl, 'nodrag')) return;

    re(geByClass1('ui_gridsorter_placeholder'), this._contEl);

    this._contInfo = this._contInfo || {
        prevSize: getSize(this._contEl)
    };

    this._ensureGridIsActual();

    if (this._grid.length <= 1) return;

    var itemStyle = window.getComputedStyle(itemEl);
    var pos = getXY(itemEl);

    this._initial = {
        candidateEl: itemEl,
        x: ev.clientX,
        y: ev.clientY,
        itemMargin: {
            x: parseInt(itemStyle.marginLeft),
            y: parseInt(itemStyle.marginTop),
        },
        shift: {
            x: ev.pageX - pos[0],
            y: ev.pageY - pos[1],
        }
    };

    addEvent(document, 'mousemove', this._ev_mousemove_handler = this._onMouseMove.bind(this));
    addEvent(document, 'mouseup', this._ev_mouseup_handler = this._onMouseUp.bind(this));
    addEvent(document, 'keydown', this._ev_keydown_handler = this._onKey.bind(this));

    cur.cancelClick = false;
    cancelEvent(ev);
};

GridSorter.prototype._dist = function(ev) {
    return Math.abs(ev.clientX - this._initial.x) + Math.abs(ev.clientY - this._initial.y);
};

GridSorter.prototype._onMouseUp = function(ev) {
    var curDragEl = this._curDragEl;
    var doCancelDrag = !ev;
    var _this = this;

    if (this._curDragEl) {
        this._curDragEl = null;

        removeClass(curDragEl, 'ui_gridsorter_moveable_notrans');

        if (!this._curOverCell) {
            this._curOverCell = {
                el: this._curPlaceholderEl,
                pos: getXY(this._curPlaceholderEl),
                size: getSize(this._curPlaceholderEl)
            }
        }

        var newPos = this._curOverCell.pos;
        var curOverEl = this._curOverCell.el;
        var cd = this._grid[this._curDragCellIndex];
        var curDragElSize = cd && cd.size;

        // hell hack yeah!
        if (gpeByClass('_ape_item_list', curDragEl)) {
            newPos[0] += 20
            newPos[1] += 20
        }

        if (curDragElSize && this._isShiftToLeft) {
            // position correction for elements that has different sizes
            newPos[1] -= curDragElSize[1] - this._curOverCell.size[1];
        }

        setTimeout(function() {
            if (doCancelDrag) {
                for (var i = 0, len = _this._grid.length; i < len; i++) {
                    var cell = _this._grid[i];
                    if (cell.dirty) {
                        _this._setPos(cell.el, {
                            left: 0,
                            top: 0
                        });
                    }
                }
                _this._setPos(curDragEl, _this._initialCurDragPos);
            } else {
                _this._setPos(curDragEl, {
                    left: newPos[0],
                    top: newPos[1]
                });
            }
        });

        setTimeout(function() {
            re(_this._curPlaceholderEl);
            removeClass(_this._contEl, 'ui_gridsorter_cont');

            _this.options.dragCls && removeClass(curDragEl, _this.options.dragCls);

            if (!_this._inited) return;

            if (doCancelDrag) {
                for (var i = 0, len = _this._grid.length; i < len; i++) {
                    var cell = _this._grid[i];
                    if (cell.dirty) {
                        _this._setPos(cell.el, {
                            left: null,
                            top: null
                        });
                    }
                }
                _this._setPos(curDragEl, {
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                });
            } else {
                var nextEl = _this._isShiftToLeft ? domNS(curOverEl) : curOverEl;

                _this._contEl.insertBefore(curDragEl, nextEl);

                var draggedIndex, overIndex = -1;

                var hasInlineSize = _this._initial.hasInlineSize;

                _this._setPos(curDragEl, {
                    left: null,
                    top: null
                });

                if (!hasInlineSize) {
                    setStyle(curDragEl, {
                        width: null,
                        height: null
                    });
                }

                for (var i = 0, len = _this._grid.length; i < len; i++) {
                    var cell = _this._grid[i];

                    if (cell.dirty || cell.el == curDragEl) {
                        _this._setPos(cell.el, {
                            left: null,
                            top: null
                        });

                        if (!hasInlineSize) {
                            setStyle(cell.el, {
                                width: null,
                                height: null
                            });
                        }

                        cell.pos = _this._calcElementPos(cell.el);
                        cell.dirty = false;
                    }

                    if (cell.el == curDragEl) {
                        draggedIndex = i;
                    } else if (cell.el == curOverEl) {
                        overIndex = i;
                    }
                }

                if (overIndex >= 0) {
                    // swap items in grid
                    var tmp = _this._grid.splice(draggedIndex, 1);
                    _this._grid.splice(overIndex, 0, tmp[0]);
                }
            }

            removeClass(curDragEl, 'ui_gridsorter_moveable');

            _this._curOverCell = _this._curPlaceholderEl = null;

            if (doCancelDrag) {
                _this.update();
            }

            curOverEl != curDragEl && !doCancelDrag && _this.options.onReorder && _this.options.onReorder(curDragEl, nextEl, domPS(curDragEl));
        }, 210);

        if (ev && this._dist(ev) > 5) {
            cancelEvent(ev);
            cur.cancelClick = true;
        }
    }

    this._updateScrollbar();
    this._deinitEvents();

    curDragEl && this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, curDragEl);
    if (!doCancelDrag) {
        curDragEl && this._overEl && this.options.onDragDrop && (doCancelDrag = this.options.onDragDrop(this._overEl, curDragEl));
    }
    this._overEl = null;
};

GridSorter.prototype._deinitEvents = function(full) {
    if (full) {
        this._onMouseUp();
        removeEvent(this._contEl, 'mousedown', this._ev_mousedown_handler);
    }

    clearTimeout(this._autoScrollTO);
    this._autoScrollTO = false;

    this._ev_mousemove_handler && removeEvent(document, 'mousemove', this._ev_mousemove_handler);
    this._ev_mouseup_handler && removeEvent(document, 'mouseup', this._ev_mouseup_handler);
    this._ev_keydown_handler && removeEvent(document, 'keydown', this._ev_keydown_handler);
};

GridSorter.prototype._setPos = function(el, pos) {
    if (!this.options.noPosTransform && this._grid.length > 100 && (this._hasTranslateFeauture || (this._hasTranslateFeauture = window.getComputedStyle(el).getPropertyValue('transform')))) {
        if (pos.left === null || pos.top === null) {
            setStyle(el, {
                transform: null,
                top: null,
                left: null
            });
        } else {
            setStyle(el, {
                transform: 'translate(' + pos.left + 'px, ' + pos.top + 'px)',
                top: null,
                pos: null
            });
        }
    } else {
        setStyle(el, extend({
            transform: null
        }, pos));
    }
}

GridSorter.prototype._recalc = function() {
    var curDragEl = this._curDragEl,
        curOverEl = this._curOverCell.el;

    this._initGrid();

    if (curOverEl == curDragEl) {
        for (var i = 0, len = this._grid.length; i < len; i++) {
            var cell = this._grid[i];
            if (cell.el != curDragEl && cell.dirty) {
                cell.dirty = false;
                this._setPos(cell.el, {
                    left: null,
                    top: null,
                });
            }
        }

        return;
    }

    var state = 0,
        shiftToLeft = false,
        cell,
        prevCell = false;

    for (var i = 0, len = this._grid.length; i < len; i++) {
        cell = this._grid[i];

        if (cell.el == curDragEl) {
            shiftToLeft = true;
            break;

        } else if (cell.el == curOverEl) {
            shiftToLeft = false;
            break;
        }
    }

    this._isShiftToLeft = shiftToLeft;

    var i = shiftToLeft ? 0 : this._grid.length - 1;
    var end = shiftToLeft ? this._grid.length : -1;
    var step = shiftToLeft ? 1 : -1;

    var corr = [0, 0];

    for (; i != end; i += step) {
        cell = this._grid[i];

        if (state == 2) {
            if (cell.dirty) {
                this._setPos(cell.el, {
                    left: null,
                    top: null,
                });
                cell.dirty = false;
            }

            prevCell = cell;
            continue;
        }

        if (cell.el == curDragEl) {
            state++;

            prevCell = cell;
            continue;
        }

        if (cell.el == curOverEl) {
            state++;
        }

        if (state == 1 || state == 2) {
            var left = 0,
                top = 0;

            if (shiftToLeft) {
                left = prevCell.pos[0] + corr[0];
                top = prevCell.pos[1] + corr[1];

                corr[0] += cell.size[0] - prevCell.size[0];
                corr[1] += cell.size[1] - prevCell.size[1];

            } else {
                corr[0] += prevCell.size[0] - cell.size[0];
                corr[1] += prevCell.size[1] - cell.size[1];

                left = prevCell.pos[0] + corr[0];
                top = prevCell.pos[1] + corr[1];
            }

            this._setPos(cell.el, {
                left: left - cell.pos[0],
                top: top - cell.pos[1]
            });

            cell.dirty = true;
        } else {
            if (cell.dirty) {
                this._setPos(cell.el, {
                    left: null,
                    top: null,
                });
                cell.dirty = false;
            }
        }

        prevCell = cell;
    }
};

GridSorter.prototype.disable = function() {
    this._disabled = true;
};

GridSorter.prototype.enable = function() {
    this._disabled = false;
    this._initGrid(true);
};

GridSorter.prototype.update = function() {
    if (!this._disabled) {
        this._initGrid(true);
    }
};

GridSorter.prototype._ensureGridIsActual = function() {
    this._initGrid();
};

// 0 - no need
// 1 - child count decreased - better to recalculate all grid
// 2 - child count increased - most of the time it was added to the end
// 3 - same childs but size changed
GridSorter.prototype._needGridUpdate = function() {
    if (!this._grid) return 1;

    this._contInfo.prevSize = this._contInfo.prevSize || getSize(this._contEl);

    var needUpdate = 0;

    var realContChilds = this._contEl.children.length - this._excludedCount - intval(!!this._curPlaceholderEl);
    if (realContChilds != this._grid.length) {
        needUpdate = realContChilds > this._grid.length ? 2 : 1;

        this._contInfo.prevSize = getSize(this._contEl);

    } else {
        var curSize = getSize(this._contEl);
        var prevSize = this._contInfo.prevSize;

        if (Math.abs(prevSize[0] - curSize[0]) > 5 || Math.abs(prevSize[1] - curSize[1]) > 5) {
            needUpdate = 1; // size changed, seems that some of the elements might be resized
        }

        this._contInfo.prevSize = curSize;
    }

    return needUpdate;
};

GridSorter.prototype._initGrid = function(force) {
    var needUpdate = force ? 1 : this._needGridUpdate();

    if (!needUpdate) {
        return;
    }

    if (needUpdate == 1) {
        this._grid = [];

        if (this._contInfo) {
            delete this._contInfo.pos;
            delete this._contInfo.size;
        }
    }

    var lastElInGrid = this._grid ? this._grid[this._grid.length - 1] : null;
    this._grid = this._grid || [];

    var skip = !!lastElInGrid,
        children = this._contEl.children,
        size;

    if (children.length == 0) {
        return;
    }

    var itemMargins = this._getItemMargins();
    var startFrom = this._curDragEl ? this._grid.length : 0;

    for (var i = startFrom, len = children.length; i < len; i++) {
        var el = children[i];

        if (lastElInGrid && el == lastElInGrid.el) {
            skip = false;
            continue;
        }

        if (skip || el == this._curPlaceholderEl || el.getAttribute('nodrag')) continue;

        size = getSize(el);
        size[0] += itemMargins[0];
        size[1] += itemMargins[1];

        this._grid.push({
            el: el,
            size: size,
            pos: this._calcElementPos(el),
        });
    }
};

GridSorter.prototype._getRelativeMousePos = function(ev) {
    var contPos = this._getContPos();
    var contShift = this._getContShift();

    return {
        left: ev.clientX - contPos[0] - contShift[0],
        top: ev.clientY - contPos[1] - contShift[1]
    };
};

GridSorter.prototype._updateDraggablePosition = function(ev) {
    if (!this._curDragEl) return;

    var mp = this._getRelativeMousePos(ev);
    var itemShift = this._getItemShift();
    var contShift = this._getContShift();
    var contSize = this._getContSize();

    var top = mp.top - this._initial.shift.y - itemShift[1] + contShift[1];
    if (this.options.limitBottomMove) {
        top = Math.min(top, contSize[1] + 30);
    }

    // todo: hell hack. will fix it shortly
    if (hasClass(this._contEl, '_ape_item_list')) {
        top += this._contEl.scrollTop
    }

    this._setPos(this._curDragEl, {
        left: mp.left - this._initial.shift.x - itemShift[0] + contShift[0],
        top: top
    });
};

GridSorter.prototype._getContShift = function() {
    this._contInfo = this._contInfo || {};

    if (!this._contInfo.shift) {
        var contStyle = window.getComputedStyle(this._contEl);
        this._contInfo.shift = [parseFloat(contStyle.paddingLeft), parseFloat(contStyle.paddingTop)];
    }

    return this._contInfo.shift;
};

GridSorter.prototype._getContSize = function() {
    this._contInfo = this._contInfo || {};
    this._contInfo.size = getSize(this._contEl);
    return this._contInfo.size;
};

GridSorter.prototype._getContPos = function() {
    this._contInfo = this._contInfo || {};
    this._contInfo.pos = /*this._contInfo.pos || */ getXY(this._contEl);
    this._contInfo.pos[1] -= scrollGetY();

    return this._contInfo.pos;
};

GridSorter.prototype._getItemShift = function() {
    this._contInfo = this._contInfo || {};

    if (!this._contInfo.itemShift) {
        var style = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemShift = [parseFloat(style.marginLeft), parseFloat(style.marginTop)];
    }
    return this._contInfo.itemShift;
};

GridSorter.prototype._getItemMargins = function() {
    this._contInfo = this._contInfo || {};

    if (!this._contInfo.itemMargins) {
        var style = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemMargins = [parseFloat(style.marginLeft) + parseFloat(style.marginRight), parseFloat(style.marginTop) + parseFloat(style.marginBottom)];
    }
    return this._contInfo.itemMargins;
};

GridSorter.prototype._calcElementPos = function(el) {
    var contShift = this._getContShift(),
        itemShift = this._getItemShift();

    return [el.offsetLeft - contShift[0] - itemShift[0], el.offsetTop - contShift[1] - itemShift[1]];
};

GridSorter.prototype.isCurrentlyDragging = function() {
    return !!this._curDragEl;
}

GridSorter.prototype._updateScrollbar = throttle(function() {
    var sn = this.options.wrapNode || scrollNode;

    var scrollbar = data(sn, 'sb');
    if (scrollbar) {
        scrollbar.update(false, true);
    }
}, 500);

GridSorter.prototype._onMouseMove = function(ev) {
    var _this = this;

    function getScrollY() {
        return _this.options.wrapNode ? _this.options.wrapNode.scrollTop : scrollGetY();
    }

    function setScrollY(st) {
        if (_this.options.wrapNode) {
            _this.options.wrapNode.scrollTop = st;
        } else {
            scrollToY(st, 0, false, true);
        }
    }

    if (this._curDragEl) { // already moving some element
        this._ensureGridIsActual();

        var isAutoscroll = !ev;

        if (isAutoscroll) { // from autoscroll
            ev = {
                clientX: this._lastMousePos.x,
                clientY: this._lastMousePos.y,
            };
        }

        this._lastMousePos = {
            x: ev.clientX,
            y: ev.clientY
        };

        this._updateDraggablePosition(ev);

        var contSize = this._getContSize(),
            contPos = this._getContPos(),
            mp = this._getRelativeMousePos(ev),
            foundCell = false;

        // todo: hell hack. will fix it shortly
        if (hasClass(this._contEl, '_ape_item_list')) {
            mp.top += this._contEl.scrollTop
        }

        var inCont = mp.left > 0 && mp.left < contSize[0] && mp.top > 0 && mp.top < contSize[1];

        if (inCont) {
            // binary search
            var startIndex = 0,
                endIndex = this._grid.length - 1,
                cell, ensure = 50;
            while (ensure) {
                var middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

                cell = this._grid[middleIndex];

                if (mp.left > cell.pos[0] && mp.top > cell.pos[1] &&
                    mp.left < (cell.pos[0] + cell.size[0]) && mp.top < (cell.pos[1] + cell.size[1])) {

                    foundCell = cell;
                    break;
                } else {
                    if (startIndex == endIndex) {
                        break;
                    }

                    if (mp.top < cell.pos[1] || mp.left < cell.pos[0] && mp.top < (cell.pos[1] + cell.size[1])) {
                        endIndex = endIndex == middleIndex ? endIndex - 1 : middleIndex;
                    } else {
                        startIndex = startIndex == middleIndex ? startIndex + 1 : middleIndex;
                    }
                }

                ensure--;
            }

        } else {
            var dist = 999999,
                distCell, d, dx, dy;
            for (var i = 0, len = this._grid.length; i < len; i++) {
                var cell = this._grid[i];

                dx = mp.left - (cell.pos[0] + cell.size[0] / 2);
                dy = mp.top - (cell.pos[1] + cell.size[1] / 2);
                d = dx * dx + dy * dy;
                if (dist > d) {
                    dist = d;
                    distCell = cell;
                }
            }

            foundCell = distCell;
        }

        if (foundCell && (!this._curOverCell || this._curOverCell.el != foundCell.el)) {
            this._curOverCell = foundCell;
            this._recalc();
        }

        { // autoscroll
            var wrapNode, wrapNodeSize, wrapNodePos, scrollNode;
            var mpY = 0;

            if (this.options.wrapNode) {
                wrapNode = scrollNode = this.options.wrapNode;
                wrapNodeSize = getSize(wrapNode);
                wrapNodePos = getXY(wrapNode);
                wrapNodePos[1] -= scrollGetY();
                mpY = ev.clientY;
            } else {
                var w = window;
                var d = document;
                var e = d.documentElement;
                var g = d.getElementsByTagName('body')[0];
                var ww = w.innerWidth || e.clientWidth || g.clientWidth;
                var wh = w.innerHeight || e.clientHeight || g.clientHeight;

                scrollNode = w.bodyNode;
                wrapNodeSize = [ww, wh];
                wrapNodePos = [0, 0];
                mpY = ev.clientY;
            }

            var autoScrollZoneHeight = Math.max(20, wrapNodeSize[1] / 10);

            var mouseOverTopZone = wrapNodePos[1] + autoScrollZoneHeight - mpY;
            var mouseOverBottomZone = autoScrollZoneHeight - (wrapNodePos[1] + wrapNodeSize[1] - mpY);

            if (mouseOverBottomZone > 0 || mouseOverTopZone > 0) {
                var mouseOverTopZoneNormalized = Math.min(1, mouseOverTopZone / autoScrollZoneHeight);
                var mouseOverBottomZoneNormalized = Math.min(1, mouseOverBottomZone / autoScrollZoneHeight);

                if (!this._autoScrollTO) {
                    this._autoScrollTO = setTimeout(function() {
                        _this._autoScrollTO = false;

                        var prev = getScrollY();
                        setScrollY(prev + (mouseOverTopZoneNormalized > 0 ? -mouseOverTopZoneNormalized : mouseOverBottomZoneNormalized) * 16);

                        if (prev != scrollNode.scrollTop) {
                            _this._updateScrollbar();
                            _this._onMouseMove();
                        }

                    }, 20);
                }
            }
        }

        if (this.options.onDragOverElClass) {
            var overEl = ev.target;
            if (hasClass(overEl, this.options.onDragOverElClass) || (overEl = gpeByClass(this.options.onDragOverElClass, overEl))) {
                if (this._overEl != overEl) {

                    this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl);
                    this.options.onDragEnter && this.options.onDragEnter(overEl, this._curDragEl);

                    this._overEl = overEl;
                }
            } else {
                this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl);
                this._overEl = null;
            }
        }
    } else {
        if (this._dist(ev) > this.options.dragThreshold) {
            this._curDragEl = this._initial.candidateEl;

            for (var i = 0, len = this._grid.length; i < len; i++) {
                if (this._grid[i].el == this._curDragEl) {
                    this._curDragCellIndex = i;
                    break;
                }
            }

            this.options.dragCls && addClass(this._curDragEl, this.options.dragCls);

            var size = getSize(this._curDragEl);
            var pos = getXY(this._curDragEl);
            var cs = window.getComputedStyle(this._curDragEl);
            var contPos = this._getContPos();

            this._initial.hasInlineSize = !!(this._curDragEl.style.width || this._curDragEl.style.height);

            setStyle(this._curDragEl, {
                width: size[0],
                height: size[1]
            });

            this._initialCurDragPos = {
                left: pos[0] - contPos[0],
                top: pos[1] - contPos[1] - bodyNode.scrollTop,
            };

            this._curPlaceholderEl = ce('div', {
                className: 'ui_gridsorter_placeholder'
            });

            setStyle(this._curPlaceholderEl, {
                width: size[0] + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight),
                height: size[1] + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom)
            });

            this._contEl.insertBefore(this._curPlaceholderEl, this._curDragEl);

            addClass(this._curDragEl, 'ui_gridsorter_moveable');
            addClass(this._curDragEl, 'ui_gridsorter_moveable_notrans');

            addClass(this._contEl, 'ui_gridsorter_cont');

            this._onMouseMove(ev);

            this._updateDraggablePosition(ev);
        }
    }

    cancelEvent(ev);
};

try {
    stManager.done('grid_sorter.js');
} catch (e) {}