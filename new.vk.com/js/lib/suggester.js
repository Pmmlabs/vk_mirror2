
// options:
//  - section
//  - sidePadding
//  - onSelect - when user press up/down buttons
//  - onChoose - when user enters on current item

function Suggester(inputEl, opts) {
  var self = this;

  this.inputEl = ge(inputEl);
  this.opts = extend(opts, {
  });

  if (!this.inputEl) return;

  data(this.inputEl, 'suggester', this);

  addEvent(this.inputEl, 'input keydown change click valueChanged', function(event) {
    if (event.type == 'valueChanged') {
      this._prevData = false;
      var v = val(self.inputEl);

      if (v != self._lastQueryText && !self._preventNextEvent) {
        self._hideResultsList();
      }

      self._preventNextEvent = false;

    } else if (event.type == 'click') {
      self._showResultsList();

    } else if (event.type == 'keydown') {
      self.preventShowResults = false;

      switch (event.keyCode) {
        case KEY.UP: // up
          self._preventNextEvent = true;
          self._selectNextItem(-1); break;
        case KEY.DOWN: // down
          self._preventNextEvent = true;
          self._selectNextItem(1); break;
        case KEY.ENTER: // enter
          self._selectItem();
          self._hideResultsList();
          self.preventShowResults = true;
          break;
        case KEY.ESC: // esc
          self._prevInputVal && val(self.inputEl, self._prevInputVal);
          self._hideResultsList();
          break;
      }
    } else {
      self.search(val(this));
    }
  });

  this._resultsListEl = se('<div class="' + Suggester.SUGG_CLASS + '"></div>');
  var parentEl = domPN(this.inputEl);
  if (domLC(parentEl) == this.inputEl) {
    parentEl.appendChild(this._resultsListEl);
  } else {
    parentEl.insertBefore(this._resultsListEl, this.inputEl);
  }

  setStyle(this._resultsListEl, 'top', getSize(this.inputEl)[1]);

  addEvent(this._resultsListEl, 'click', function(event) {
    if (event.target.nodeName.toLowerCase() == 'li') {
      self.selected = self._curItems[event.target.getAttribute('data-index')];
      self._selectItem();
      self._hideResultsList();
    }
  });

  this._lastQueryText = '';

  this._initiateRequest = debounce(this._initiateRequest, 200).bind(this);
}

Suggester.MAX_ITEMS = 10;
Suggester.SUGG_CLASS = 'ui_suggester_results_list';

Suggester.prototype.destroy = function() {
  data(this.inputEl, 'suggester', null);
  this._hideResultsList();
}

Suggester.prototype.search = function(text) {
  text = trim(text);

  if (this._lastQueryText == text) return;
  this._lastQueryText = text;

  if (text) {
    this._initiateRequest(text);
  } else {
    this._prevData = false;
    this._hideResultsList();
  }
}

Suggester.prototype._initiateRequest = function(text) {
  var self = this;

  this._hideResultsList();

  (function(q) {
    ajax.post('/hints.php', {
      act: 'a_gsearch_hints',
      q: q,
      section: self.opts.section
    }, {
      onDone: function(data) {
        if (self._lastQueryText == q && !self.preventShowResults) {
          self._prevData = data;
          self._showResultsList(data);
        }
      }
    });
  })(text);
}

Suggester.prototype._showResultsList = function(items) {
  items = items || this._prevData || [];

  var self = this;

  items = items.filter(function(item) {
    return item[3] != self._lastQueryText;
  });

  if (!items || !items.length) {
    hide(this._resultsListEl);

  } else if (val(self.inputEl)) {
    cur.preventInputActions = true;

    this._curItems = items;

    var itemsHtml = '', style = '';

    if (this.opts.sidePadding) {
      style = 'style="padding-left: ' + this.opts.sidePadding + '; padding-right: ' + this.opts.sidePadding + '"';
    }

    each(items, function(i, item) {
      if (i >= Suggester.MAX_ITEMS) return false;
      itemsHtml += '<li data-index="' + i + '" ' + style + '>' + item[1] + '</li>';
    });

    this._resultsListEl.innerHTML = '<ul>' + itemsHtml + '</ul>';
    show(this._resultsListEl);

    this._wc_event && removeEvent(window, 'mousedown', this._wc_event);
    addEvent(window, 'mousedown', this._wc_event = this._onWindowClick.bind(this));
    cur.destroy.push(function() {
      self._hideResultsList();
    });
  }
}

Suggester.prototype._selectNextItem = function(dir) {
  dir = dir > 0 ? true : false;

  if (isVisible(this._resultsListEl)) {
    var next, selected = geByClass1('active', this._resultsListEl);
    if (selected) {
      next = (dir ? domNS : domPS)(selected);
      if (!next) {
        next = domPN(selected)[dir ? 'firstChild' : 'lastChild'];
      }
    } else {
      var els = geByTag('li', this._resultsListEl);
      next = els[dir ? 0 : els.length - 1];
    }

    removeClass(selected, 'active');
    addClass(next, 'active');

    if (!this._prevInputVal) {
      this._prevInputVal = val(this.inputEl);
    }

    this.selected = this._curItems[next.getAttribute('data-index')];
    this.opts.onSelect && this.opts.onSelect(this.selected);
  }
}

Suggester.prototype._selectItem = function() {
  this.selected && this.opts.onChoose && this.opts.onChoose(this.selected);
}

Suggester.prototype._onWindowClick = function(event) {
  if (event.target != this.inputEl && !gpeByClass(Suggester.SUGG_CLASS, event.target)) {
    this._hideResultsList();
  }
}

Suggester.prototype._hideResultsList = function() {
  this._wc_event && removeEvent(window, 'mousedown', this._wc_event);
  cur.preventInputActions = this.selected = this._curItems = this._prevInputVal = false;
  hide(this._resultsListEl);
}


try{stManager.done('suggester.js');}catch(e){}
