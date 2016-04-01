/*
  scrollNode - (optional) default is window
  threshold  - (optional) px, bottom edge offser, default - 0
  renderImmediate - (optional)
  rowClass   - (optional) specify row class (in case there will be not rows elements)
  showProgress
  hideProgress
  onNoMore
  onHasMore
  onRendered - called when next rows are rendered

  required:
    onNeedRows - function(offset, cb), return Array of elements / false
*/
function AutoList (containerEl, options) {
  if (this.constructor != AutoList) {
    throw new Error('AutoList: AutoList was called without \'new\' operator');
  }

  this._opts = extend({
    scrollNode: window,
    threshold: 0,
    renderImmediate: false
  }, options);

  this._containerEl = ge(containerEl);

  if (!this._containerEl) {
    throw new Error('AutoList: container not found');
  }

  this._rowClasses = isArray(this._opts.rowClass) ? this._opts.rowClass : this._opts.rowClass.split(' ');
  delete this._opts.rowClass;

  this._initialRender = this._opts.renderImmediate;
  this._isProgressShown = false;
  this._prefetched = [];
  this._offset = this._initialRender ? 0 : (this._opts.rowClasses ? this._countRows(this._containerEl.children) : this._containerEl.children.length);
  this._page = this._offset > 0 ? 1 : 0;

  addEvent(this._opts.scrollNode, 'scroll', this._ev_scroll = this._onScroll.bind(this));

  this._setState(this._opts.renderImmediate ? AutoList.STATE_PENDING_ROWS : AutoList.STATE_PENDING_PREFETCH_ROWS);
  this._requestRows();
}

AutoList.STATE_IDLE = 'idle';
AutoList.STATE_PENDING_ROWS = 'pend_rows';
AutoList.STATE_PENDING_PREFETCH_ROWS = 'pend_prefetch';
AutoList.STATE_DONE_PREFETCH = 'done_prefetch';
AutoList.STATE_DONE = 'done';

AutoList.prototype._countRows = function(rows) {
  var _this = this, count = 0;
  each(rows, function(ri, row) {
    if (typeof row == 'string') {
      row = se(row);
    }

    each(_this._rowClasses, function(ci, cls) {
      if (hasClass(row, cls)) {
        count ++;
        return false;
      }
    });
  });
  return count;
}

AutoList.prototype._drawRows = function(rows) {
  var _this = this;

  each(rows, function(i, row) {
    if (typeof row == 'string') {
      row = se(trim(row));
    }
    _this._containerEl.appendChild(row);
  });

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
  }
}

AutoList.prototype.destroy = function() {
  if (this._ev_scroll) {
    removeEvent(this._opts.scrollNode, 'scroll', this._ev_scroll);
    this._ev_scroll = false;
  }
  this._setState(AutoList.STATE_DONE);
  this.toggleProgress(false);
}

AutoList.prototype._requestRows = function(immediate) {
  if (this._state != AutoList.STATE_DONE_PREFETCH) {
    var _this = this;

    function fetch() {
      _this._opts.onNeedRows(_this._onRowsProvided.bind(_this), _this._offset, _this._page ++);
    }

    if (true || immediate || this._initialRender) {
      // initial render request came from ctor and should be done in current tick
      this._initialRender = false;
      fetch();
    } else {
      // else need next tick
      setTimeout(fetch);
    }
  }
}

AutoList.prototype._onRowsProvided = function(rows) {
  if (rows === false) {
    // building rows skipped... fetch next chunk of rows
    return this._requestRows();
  }

  rows = rows || [];

  this._offset += this._countRows(rows);

  switch (this._state) {
    case AutoList.STATE_PENDING_PREFETCH_ROWS:
      if (rows.length == 0) {
        this._setState(AutoList.STATE_DONE_PREFETCH);
        this._opts.onNoMore && this._opts.onNoMore();

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
        this._opts.onNoMore && this._opts.onNoMore();
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

AutoList.prototype._onScroll = function() {
  if (this._forceDrawCalled) {
    return;
  }

  if (this._state == AutoList.STATE_PENDING_ROWS) {
    return;
  }

  var scrollY = this._opts.scrollNode.scrollY || this._opts.scrollNode.scrollTop || 0;
  var contTop = Math.max(0, getXY(this._containerEl)[1] - (this._opts.scrollNode ? scrollNode.scrollTop : 0));
  var contHeight = getSize(this._containerEl)[1];
  var wrapHeight = this._opts.scrollNode.innerHeight || this._opts.scrollNode.offsetHeight;

  var reachedBottom = (contHeight < wrapHeight) || (scrollY + wrapHeight) >= (contHeight + contTop - this._opts.threshold);
  if (reachedBottom) {
    if (this._state == AutoList.STATE_PENDING_ROWS || !this._prefetched.length && this._state == AutoList.STATE_PENDING_PREFETCH_ROWS) {  // no data to draw
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

try{stManager.done('auto_list.js');}catch(e){}
