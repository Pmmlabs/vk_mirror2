/*
  threshold  - (optional) px, bottom edge offser, default - 0
  renderImmediate - (optional)
  rowClass   - (optional) specify row class (in case there will be not rows elements)
  showProgress
  hideProgress
  onNoMore
  onHasMore
  onRendered - called when next rows are rendered

  required:
    onNeedRows - function(cb, offset, pageNumber, isPrefetchingNow), return Array of elements / false
*/


function AutoList(containerEl, options) {
    if (this.constructor != AutoList) {
        throw new Error('AutoList: AutoList was called without \'new\' operator');
    }

    AutoList._counter = AutoList._counter || 0
    this._id = AutoList._counter++

        this.setListEl(containerEl, options.scrollNode)

    this._opts = extend({
        threshold: 0,
        renderImmediate: false,
    }, options)

    if (!this._containerEl) {
        throw new Error('AutoList: container not found');
    }

    this._rowClasses = this._opts.rowClass ? this._opts.rowClass.split(' ') : false;
    delete this._opts.rowClass;

    this._initialRender = this._opts.renderImmediate;
    this._isProgressShown = false;
    this._prefetched = [];

    if (this._initialRender) {
        this._offset = 0
    } else if (this._opts.offset) {
        this._offset = this._opts.offset
    } else if (this._opts.rowClasses) {
        this._offset = this._countRows(this._containerEl.children)
    } else {
        this._offset = this._containerEl.children.length
    }

    this._page = this._offset > 0 ? 1 : 0;

    addEvent(this._scrollNode, 'scroll', this._ev_scroll = this._onScroll.bind(this));
    addEvent(window, 'resize', this._ev_window_resize = this._onScroll.bind(this));

    this._setState(this._opts.renderImmediate ? AutoList.STATE_PENDING_ROWS : AutoList.STATE_PENDING_PREFETCH_ROWS);
    this._requestRows();
}

AutoList.prototype.getListEl = function() {
    return this._containerEl
}

AutoList.prototype.setListEl = function(containerEl, scrollNode) {
    this._containerEl = ge(containerEl);

    this._scrollNode = scrollNode || AutoList.closestOverflowParent(this._containerEl)

    var scrollNodeYOffset
    if (this._scrollNode == window) {
        scrollNodeYOffset = 0
    } else {
        scrollNodeYOffset = getXY(this._scrollNode)[1]
    }

    this._contentYOffset = getXY(this._containerEl)[1] - scrollNodeYOffset
}

AutoList.prototype.options = function(options) {
    extend(this._opts, options)
}

AutoList.STATE_IDLE = 'idle';
AutoList.STATE_PENDING_ROWS = 'pend_rows';
AutoList.STATE_PENDING_PREFETCH_ROWS = 'pend_prefetch';
AutoList.STATE_DONE_PREFETCH = 'done_prefetch';
AutoList.STATE_DONE = 'done';

AutoList.prototype._countRows = function(rows) {
    var _this = this,
        count = 0;
    each(rows, function(ri, row) {
        if (typeof row == 'string') {
            row = se(row);
        }

        if (_this._rowClasses) {
            each(_this._rowClasses, function(ci, cls) {
                if (hasClass(row, cls)) {
                    count++;
                    return false;
                }
            });
        } else {
            count++;
        }
    });

    return count;
}

AutoList.prototype._drawRows = function(rows) {
    var _this = this;

    if (this._opts.drawRows) {
        this._opts.drawRows(_this._containerEl, rows);
    } else {
        each(rows, function(i, row) {
            if (typeof row == 'string') {
                row = se(trim(row));
            }
            if (row) {
                _this._containerEl.appendChild(row);
            }
        });
    }

    this.toggleProgress(this._state != AutoList.STATE_DONE);

    !this._forceDrawCalled && this._opts.onRendered && this._opts.onRendered();
}

AutoList.prototype.toggleProgress = function(show) {
    if (show) {
        !this._isProgressShown && this._opts.showProgress && this._opts.showProgress();
    } else {
        this._isProgressShown && this._opts.hideProgress && this._opts.hideProgress();
    }

    this._isProgressShown = show;
}

AutoList.prototype.drawMore = function() {
    if (inArray(this._state, [
            AutoList.STATE_IDLE,
            AutoList.STATE_DONE_PREFETCH,
        ])) {

        this._forceDrawCalled = true;

        this._drawRows(this._prefetched);
        this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS);
        this._prefetched = [];
        this._requestRows(true);

        this._forceDrawCalled = false;
    } else if (this._state == AutoList.STATE_DONE) {
        this._opts.onNoMore && this._opts.onNoMore(this._containerEl.childElementCount);
    }
}

AutoList.prototype.destroy = function() {
    if (this._ev_scroll) {
        removeEvent(this._scrollNode, 'scroll', this._ev_scroll);
        this._ev_scroll = false;
    }

    this._ev_window_resize && removeEvent(window, 'resize', this._ev_window_resize)

    this._setState(AutoList.STATE_DONE);
    this.toggleProgress(false);
}

AutoList.prototype.getOffset = function() {
    return this._offset
}

AutoList.prototype._requestRows = function(immediate) {
    if (this.isDone()) {
        return
    }

    if (this._state != AutoList.STATE_DONE_PREFETCH) {
        function fetch() {
            this._opts.onNeedRows(this._onRowsProvided.bind(this), this._offset, this._page++, this._state == AutoList.STATE_PENDING_PREFETCH_ROWS, this);
        }

        if (true || immediate || this._initialRender) {
            // initial render request came from ctor and should be done in current tick
            this._initialRender = false;
            fetch.apply(this);
        } else {
            // else need next tick
            setTimeout(fetch.bind(this));
        }
    }
}

/*
  count - custom count, in case of skipped rows on server
*/
AutoList.prototype._onRowsProvided = function(rows, count) {
    if (this.isDone()) {
        return
    }

    if (rows === false) {
        // building rows skipped... fetch next chunk of rows
        return this._requestRows();
    }

    rows = rows || [];

    this._offset += count === undefined ? this._countRows(rows) : count;

    var rowsRendered = this._containerEl.childElementCount;

    switch (this._state) {
        case AutoList.STATE_PENDING_PREFETCH_ROWS:
            if (rows.length == 0) {
                this._setState(AutoList.STATE_DONE_PREFETCH);
                this._opts.onNoMore && this._opts.onNoMore(rowsRendered);

                if (this._prefetched.length == 0) { // nothing to draw more
                    this._setState(AutoList.STATE_DONE);
                }
            } else {
                this._setState(AutoList.STATE_IDLE);
                this._prefetched = this._prefetched.concat(rows);
                this._opts.onHasMore && this._opts.onHasMore();

                this._onScroll();
            }

            break;

        case AutoList.STATE_PENDING_ROWS:
            this._drawRows(rows);

            if (rows.length == 0) {
                this._setState(AutoList.STATE_DONE);
                this._opts.onNoMore && this._opts.onNoMore(rowsRendered);
            } else {
                this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS);
                this._requestRows();
            }
            this.toggleProgress(false);
            break;

        case AutoList.STATE_IDLE:
            this._prefetched = this._prefetched.concat(rows);
            break;

        case AutoList.STATE_DONE_PREFETCH:
        case AutoList.STATE_DONE:
            break;
    }
}

AutoList.prototype._setState = function(newState) {
    //console.log(this._state + ' > ' + newState);
    this._state = newState;
}

AutoList.prototype.isDone = function() {
    return this._state == AutoList.STATE_DONE;
}

AutoList.prototype.isPendingRows = function() {
    return this._state == AutoList.STATE_PENDING_ROWS;
}

AutoList.closestOverflowParent = function(startEl) {
    var el = startEl,
        overflow

    while (el && el.tagName) {
        overflow = getStyle(el, 'overflow')

        if (overflow !== 'visible' && el.id !== 'page_wrap') {
            break
        }

        el = domPN(el)
    }

    if (el == window.document || el == bodyNode || !el) {
        el = window
    }

    return el
}

AutoList.prototype._onScroll = function() {
    if (this._forceDrawCalled) {
        return;
    }

    if (this._state == AutoList.STATE_PENDING_ROWS) {
        return;
    }

    var scrollNode = this._scrollNode
    var isWindowScrollNode = scrollNode == window;

    var st, contentHeight, scrollNodeHeight
    if (isWindowScrollNode) {
        scrollNodeHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        st = scrollGetY()
    } else {
        scrollNodeHeight = getSize(scrollNode)[1]

        if (this._scroll) {
            st = this._scroll.data.scrollTop
        } else {
            st = scrollNode.scrollTop
        }
    }

    if (scrollNodeHeight < 10) {
        return
    }

    contentHeight = this._containerEl.scrollHeight

    if ((contentHeight - scrollNodeHeight - st + this._contentYOffset) < 10) {
        if (this._state == AutoList.STATE_PENDING_ROWS || !this._prefetched.length && this._state == AutoList.STATE_PENDING_PREFETCH_ROWS) { // no data to draw
            this.toggleProgress(true);
            this._setState(AutoList.STATE_PENDING_ROWS);

        } else if (this._state == AutoList.STATE_PENDING_PREFETCH_ROWS || this._state == AutoList.STATE_IDLE) {
            this._drawRows(this._prefetched);
            this._prefetched = [];
            this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS);

            this._requestRows();

        } else if (this._state == AutoList.STATE_DONE_PREFETCH) {
            this._drawRows(this._prefetched);
            this._prefetched = [];
            this._setState(AutoList.STATE_DONE);
            this._opts.onNoMore && this._opts.onNoMore();
            this.destroy();
        }
    }
}

try {
    stManager.done('auto_list.js');
} catch (e) {}