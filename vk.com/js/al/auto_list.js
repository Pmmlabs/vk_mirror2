function AutoList(t, s) {
    if (this.constructor != AutoList) throw new Error("AutoList: AutoList was called without 'new' operator");
    if (AutoList._counter = AutoList._counter || 0, this._id = AutoList._counter++, this.setListEl(t, s.scrollNode), this._opts = extend({
            threshold: 0,
            renderImmediate: !1
        }, s), !this._containerEl) throw new Error("AutoList: container not found");
    this._rowClasses = this._opts.rowClass ? this._opts.rowClass.split(" ") : !1, delete this._opts.rowClass, this._initialRender = this._opts.renderImmediate, this._isProgressShown = !1, this._prefetched = [], this._offset = this._initialRender ? 0 : this._opts.offset ? this._opts.offset : this._opts.rowClasses ? this._countRows(this._containerEl.children) : this._containerEl.children.length, this._page = this._offset > 0 ? 1 : 0, addEvent(this._scrollNode, "scroll", this._ev_scroll = this._onScroll.bind(this)), addEvent(window, "resize", this._ev_window_resize = this._onScroll.bind(this)), this._setState(this._opts.renderImmediate ? AutoList.STATE_PENDING_ROWS : AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()
}
AutoList.prototype.getListEl = function() {
    return this._containerEl
}, AutoList.prototype.setListEl = function(t, s) {
    this._containerEl = ge(t), this._scrollNode = s || AutoList.closestOverflowParent(this._containerEl);
    var o;
    o = this._scrollNode == window ? 0 : getXY(this._scrollNode)[1], this._contentYOffset = getXY(this._containerEl)[1] - o
}, AutoList.prototype.options = function(t) {
    extend(this._opts, t)
}, AutoList.STATE_IDLE = "idle", AutoList.STATE_PENDING_ROWS = "pend_rows", AutoList.STATE_PENDING_PREFETCH_ROWS = "pend_prefetch", AutoList.STATE_DONE_PREFETCH = "done_prefetch", AutoList.STATE_DONE = "done", AutoList.prototype._countRows = function(t) {
    var s = this,
        o = 0;
    return each(t, function(t, e) {
        "string" == typeof e && (e = se(e)), s._rowClasses ? each(s._rowClasses, function(t, s) {
            return hasClass(e, s) ? (o++, !1) : void 0
        }) : o++
    }), o
}, AutoList.prototype._drawRows = function(t) {
    var s = this;
    this._opts.drawRows ? this._opts.drawRows(s._containerEl, t) : each(t, function(t, o) {
        "string" == typeof o && (o = se(trim(o))), s._containerEl.appendChild(o)
    }), this.toggleProgress(this._state != AutoList.STATE_DONE), !this._forceDrawCalled && this._opts.onRendered && this._opts.onRendered()
}, AutoList.prototype.toggleProgress = function(t) {
    t ? !this._isProgressShown && this._opts.showProgress && this._opts.showProgress() : this._isProgressShown && this._opts.hideProgress && this._opts.hideProgress(), this._isProgressShown = t
}, AutoList.prototype.drawMore = function() {
    inArray(this._state, [AutoList.STATE_IDLE, AutoList.STATE_DONE_PREFETCH]) && (this._forceDrawCalled = !0, this._drawRows(this._prefetched), this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._prefetched = [], this._requestRows(!0), this._forceDrawCalled = !1)
}, AutoList.prototype.destroy = function() {
    this._ev_scroll && (removeEvent(this._scrollNode, "scroll", this._ev_scroll), this._ev_scroll = !1), this._ev_window_resize && removeEvent(window, "resize", this._ev_window_resize), this._setState(AutoList.STATE_DONE), this.toggleProgress(!1)
}, AutoList.prototype.getOffset = function() {
    return this._offset
}, AutoList.prototype._requestRows = function(t) {
    function s() {
        this._opts.onNeedRows(this._onRowsProvided.bind(this), this._offset, this._page++, this._state == AutoList.STATE_PENDING_PREFETCH_ROWS, this)
    }
    this.isDone() || this._state != AutoList.STATE_DONE_PREFETCH && (this._initialRender = !1, s.apply(this))
}, AutoList.prototype._onRowsProvided = function(t, s) {
    if (!this.isDone()) {
        if (t === !1) return this._requestRows();
        switch (t = t || [], this._offset += void 0 === s ? this._countRows(t) : s, this._state) {
            case AutoList.STATE_PENDING_PREFETCH_ROWS:
                0 == t.length ? (this._setState(AutoList.STATE_DONE_PREFETCH), this._opts.onNoMore && this._opts.onNoMore(), 0 == this._prefetched.length && this._setState(AutoList.STATE_DONE)) : (this._setState(AutoList.STATE_IDLE), this._prefetched = this._prefetched.concat(t), this._opts.onHasMore && this._opts.onHasMore(), this._onScroll());
                break;
            case AutoList.STATE_PENDING_ROWS:
                this._drawRows(t), 0 == t.length ? (this._setState(AutoList.STATE_DONE), this._opts.onNoMore && this._opts.onNoMore()) : (this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()), this.toggleProgress(!1);
                break;
            case AutoList.STATE_IDLE:
                this._prefetched = this._prefetched.concat(t);
                break;
            case AutoList.STATE_DONE_PREFETCH:
            case AutoList.STATE_DONE:
        }
    }
}, AutoList.prototype._setState = function(t) {
    this._state = t
}, AutoList.prototype.isDone = function() {
    return this._state == AutoList.STATE_DONE
}, AutoList.prototype.isPendingRows = function() {
    return this._state == AutoList.STATE_PENDING_ROWS
}, AutoList.closestOverflowParent = function(t) {
    for (var s, o = t; o && o.tagName && (s = getStyle(o, "overflow"), "visible" === s || "page_wrap" === o.id);) o = domPN(o);
    return o != window.document && o != bodyNode && o || (o = window), o
}, AutoList.prototype._onScroll = function() {
    if (!this._forceDrawCalled && this._state != AutoList.STATE_PENDING_ROWS) {
        var t, s, o, e = this._scrollNode,
            i = e == window;
        i ? (o = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), t = scrollGetY()) : (o = getSize(e)[1], t = this._scroll ? this._scroll.data.scrollTop : e.scrollTop), 10 > o || (s = this._containerEl.scrollHeight, s - o - t + this._contentYOffset < 10 && (this._state == AutoList.STATE_PENDING_ROWS || !this._prefetched.length && this._state == AutoList.STATE_PENDING_PREFETCH_ROWS ? (this.toggleProgress(!0), this._setState(AutoList.STATE_PENDING_ROWS)) : this._state == AutoList.STATE_PENDING_PREFETCH_ROWS || this._state == AutoList.STATE_IDLE ? (this._drawRows(this._prefetched), this._prefetched = [], this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()) : this._state == AutoList.STATE_DONE_PREFETCH && (this._drawRows(this._prefetched), this._prefetched = [], this._setState(AutoList.STATE_DONE), this._opts.onNoMore && this._opts.onNoMore(), this.destroy())))
    }
};
try {
    stManager.done("auto_list.js")
} catch (e) {}