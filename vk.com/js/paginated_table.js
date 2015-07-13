// valich@VKontakte@version 0.5.0
// See club400 for full documentation
(function(){
var tableCount = 0;
var controlCount = 0;

var PAGE_LIST_DEPTH = 5;
var PAGINATION_STYLE = 'short';
var SUM_PRECISION = 2;
var AVG_PRECISION = 3;
var FLOAT_FORMAT_PRECISION = 2;
var PERCENT_FORMAT_PRECISION = 3;

var lastStamp;
var setStamp = function() {lastStamp = new Date().getTime();};
var getDiff = function(setNew) {if (lastStamp === undefined) return 0; var curStamp = new Date().getTime(); var ret = curStamp - lastStamp; if (setNew) lastStamp = curStamp; return ret;};
var alertDiff = function(setNew) {alert(getDiff(setNew));};

var onUnload = (function() {
  var localDestroys = [];

  var destroyAllLocal = function() {
    for (var i in localDestroys) {
      localDestroys[i]();
    }
    localDestroys = [];
  }

  if (('cur' in window) && ('destroy' in window.cur)) {
    window.cur.destroy.push(destroyAllLocal);
  } else {
    addEvent(window, "unload", destroyAllLocal);
  }

  return function(f) {
    localDestroys.push(f);
  }
})();

var myOuterHTML = (function() {
  var tempNode = ce('div');
  var nativeMode = false && !(browser.mozilla || !tempNode.outerHTML);

  return function(node) {
    if (!node) return '';
    if (nativeMode) return node.outerHTML;
    var par = node.parentNode, sib = node.nextSibling;
    var tmpChild =  tempNode.firstChild;
    if (tmpChild) {
      tempNode.replaceChild(node, tmpChild);
    } else {
      tempNode.appendChild(node);
    }
    var ret = tempNode.innerHTML;
    if (par) {
      par.insertBefore(node, sib);
    }
    return ret;
  }
})();

var offlineGe = (function() {
  var tempNode = ce('div', {}, {display: 'none'});
  var flag = 0;

  return function(root, id) {
    var res = ge(id);
    if (res) return res;

    if (!flag) {
      document.body.appendChild(tempNode);
      onUnload(function() {
        document.body.removeChild(tempNode)
        flag = 0;
      });
      flag = 1;
    }
    tempNode.appendChild(root);
    res = ge(id);
    tempNode.removeChild(root);
    return res;
  }
})();

var setInnerHTML = (function() {
  var tempNode = ce('div');

  return function(par, propName, html) {
    var node = par[propName];
    if (!browser.msie) {
      node.innerHTML = html;
      return;
    }
    tempNode.innerHTML = ['<', node.tagName, ' ', (node.id ? 'id="' + node.id + '" ' : ''), (node.className ? 'class="' + node.className + '" ' : ''), '>', html, '</', node.tagName, '>'].join('');
    par[propName] = tempNode.firstChild;
    if (node.parentNode) {
      node.parentNode.replaceChild(par[propName], node);
    }
  };
})();

var ceRowHTML = (function() {
  var tempTable = {qq: ce('table')};

  // Prevent memory leaks in IE and FF
  onUnload(function() {
    tempTable.qq = null;
  });

  return function(params) {
    var newHTML = ['<tr ', (params.id ? 'id="' + params.id + '" ' : ''), (params.className ? 'class="' + params.className + '" ' : ''), '>', params.innerHTML, '</tr>'].join('');
    if (tempTable.qq === null) {
      tempTable.qq = ce('table');
    }
    setInnerHTML(tempTable, 'qq', newHTML);
    var ret = tempTable.qq.tBodies[0].firstChild;
    tempTable.qq.tBodies[0].removeChild(ret);
    return ret;
  };
})();

var getHashParam = function(url, key) {
  var shi = url.indexOf('#');
  try {
    if (shi != -1) {
      var hash = url.substring(shi + 1);
      var params = hash.split('&');
      for (var i in params) {
        var curp = params[i].split('=');
        if (curp[0] == key) {
          return curp[1];
        }
      }
    }
  }
  catch (e) {}

  return null;
}

var setHashParam = function(oldURL, key, value) {
  var shi = oldURL.indexOf('#');
  var params = [];
  try {
    if (shi != -1 && key != null) {
      var hash = oldURL.substring(shi + 1);
      params = hash.split('&');
      for (var i in params) {
        var curp = params[i].split('=');
        if (curp[0] == key || params[i] == '') {
          params.splice(i, 1);
        }
      }
    }
  }
  catch (e) {}

  if (key && value != null) {
    params.push(key + '=' + value);
  }
  if (shi == -1) shi = oldURL.length;

  return oldURL.substring(0, shi) + '#' + params.join('&');
}

// do not forget to use fn.call(this)
var updateHashLocation = function(url) {
  if (history.navigationMode && browser.opera && parseFloat(browser.version) <= 11.11) { // due to problems with location.replace in opera we'll do this fix
    var hs = getHashParam(window.location.href, 'hs');
    var hn = getHashParam(window.location.href, 'hn');
    if (hs == null) {
      hs = window.history.length;
      url = setHashParam(url, 'hs', hs);
      hn = hs;
    }
    if (hn != hs) {
      window.history.go(hs - hn);
    }
    hn = Number(hs) + 1;
    url = setHashParam(url, 'hn', hn);
    location.replace(url);

    if (!this._hashTracker) {
      var _t = this;
      this._hashTracker = setInterval(function(){
          var hashPage = _t._getPageNFromHash();
          var hashStr = _t._getSearchStrFromHash();
          if (_t.curPage != hashPage) {
            _t.goToPage(hashPage, true);
          }
          if (_t._curSearchString != hashStr) {
            _t._onSearchStringChange(hashStr);
          }
        }, 200);
    }
  } else {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', url);
    } else {
      location.replace(url);
    }
  }
}

var validInt = function(s) {
  return new RegExp('^[0-9][0-9]*$').test(s);
};

var genSelPageRef = function(table, n, seln) {
  var label = n;
  if (n == '<') {
    n = seln;
    label = '&lsaquo;';
  } else if (n == '>') {
    n = seln;
    label = '&rsaquo;';
  }

  var ans = ce('td', {innerHTML: '<a>' + label + '</a>'});
  if (label == n && n == seln) {
    ans.className = 'selected';
  }

  var onClick = function() {
    table.parent.goToPage(n);
  };
  addEvent(ans.firstChild, 'click', onClick);
  onUnload(function() {
    removeEvent(ans.firstChild, 'click', onClick);
  });
  return ans;
};

var genCommasTd = function() {
  return ce('td', {className: 'list_commas', innerHTML: '...'});
};

var setParity = function(elem, ind, classname) {
  if (ind & 1) {
    removeClass(elem, classname);
  } else {
    addClass(elem, classname);
  }
};

var getNoBr = function(s) {
  if (typeof s == 'string') {
    return '<nobr>' + s.replace(/[\s]+/g, '</nobr> <nobr>') + '</nobr>';
  }
  return s;
};

var _colAddCl = [];
var getCellClass = function(_t, i, n, addClass) {
  if (_colAddCl.length == 0) {
    for (j = 0; j < n; j++) {
      _colAddCl[j] = (_t.options.columnClasses && _t.options.columnClasses[j] ? _t.options.columnClasses[j] : '');
      if (!_colAddCl[j]) {
        _colAddCl[j] = '';
      }
    }
  }

  var curClass = _t.options.tableClassNames['cell'];
  if (i == 0) {
    curClass += ' ' + _t.options.tableClassNames['firstCol'];
  }
  if (i == n - 1) {
    curClass += ' ' + _t.options.tableClassNames['lastCol'];
  }
  if (_t.options.checkboxPickingEnabled) {
    i--;
  }
  if (i >= 0 && _colAddCl[i]) {
    curClass += ' ' + _colAddCl[i];
  }
  if (i >= 0 && _t.options.columnAlignment) {
    switch (_t.options.columnAlignment[i]) {
      case 'left':
        curClass += ' pt_align_left';
        break;
      case 'right':
        curClass += ' pt_align_right';
        break;
      case 'center':
        curClass += ' pt_align_center';
        break;
      default:
        break;
    }
  }
  if (addClass) {
    curClass += ' ' + addClass;
  }
  if (curClass === undefined) return '!';
  return curClass;
};

var initCb = function(elem, rown) {
  if (rown === undefined) {
    rown = '';
  } else {
    rown = ', ' + rown;
  }
  addClass(elem, 'ads_lite_cb');
  if (rown == '') {
    var onClick = function(){
      var v = this; while (v.tableObj === undefined) v = v.parentNode; return v.tableObj.toggleCheckbox(this);
    };
    addEvent(elem, 'click', onClick);
    onUnload(function() {
      removeEvent(elem, 'click', onClick);
    });
  } else {
    elem.setAttribute('onclick', 'var v = this; while (v.tableObj === undefined) v = v.parentNode; return v.tableObj.toggleCheckbox(this' + rown + ');');
  }
  elem.setAttribute('onmouseover', 'addClass(this, \'checkbox_over\');');
  elem.setAttribute('onmouseout', 'removeClass(this, \'checkbox_over\'); removeClass(this, \'checkbox_pressed\')');
  elem.setAttribute('onmousedown', 'addClass(this, \'checkbox_pressed\');');
  elem.setAttribute('onmouseup', 'addClass(this, \'checkbox_pressed\');');
};

var csvToContent = function(csv) {
  csv = csv.split('\n');
  var content = {header: [], data: []};
  if (!csv.length) {
    return content;
  }

  var i, j;
  for (i = 0; i < csv.length; i++) {
    csv[i] = csv[i].split(',');
    if (i == 0) {
      for (j = 0; j < csv[i].length; j++) {
        content.header.push(csv[i][j]);
      }
    } else {
      content.data[i - 1] = [];
      for (j = 0; j < csv[i].length; j++) {
        content.data[i - 1].push(csv[i][j]);
      }
    }
  }
  return content;
};

var forceAllNumbers = function(obj) {
  for (var prop in obj) {
    switch (typeof obj[prop]) {
      case 'string':
        if (obj[prop] !== '') {
          var tmp = Number(obj[prop]);
          if (tmp.toString() === obj[prop]) {
            obj[prop] = tmp;
          }
        }
        break;
      case 'object':
        obj[prop] = forceAllNumbers(obj[prop]);
        break;
      default:
        break;
    }
  }
  return obj;
};

//
// Paginated Table Controls
//
// constructor
//

var PaginatedTableControl = function(container, options) {
  if (!container)  container = ce('div');
  if (!container.id) container.id = 'paginated_table_control' + controlCount;
  if (!options) options = {};

  container.className = 'paginated_table_control' + (options.addClass ? ' ' + options.addClass : '');
  if (browser.msie || browser.opera) {
    var diff = browser.msie ? 2 : 3;
    var tt = parseInt(getStyle(container, 'margin-top'));
    container.style.marginTop = (tt ? tt + diff : diff) + 'px';
    tt = parseInt(getStyle(container, 'margin-bottom'));
    container.style.marginBottom = (tt ? tt + diff : diff) + 'px';
  }
  this.parent = options.parent;

  var _t = this;
  _t.container = container;
  var html = options.layout;

  var from_to_str, total_str, no_entries_str;
  if (!_t.parent.options.behaviour.SMART_LABELING) {
    from_to_str =    this.parent.options.labels['shown_from_to'] || '';
    total_str =      this.parent.options.labels['shown_total'] || '';
    no_entries_str = this.parent.options.labels['no_entries_to_show'] || '';
  } else {
    from_to_str =    '<span id="label_from_to{controlId}" class="label_from_to"></span>';
    total_str =      '<span id="label_total{controlId}" class="label_total"></span>';
    no_entries_str = '<span id="label_no_entries{controlId}" class="label_no_entries"></span>';
  }
  html = html.replace(/\{no_entries_str\}/g, no_entries_str);
  html = html.replace(/\{total_str\}/g, total_str);
  html = html.replace(/\{from_to_str\}/g, from_to_str);

  html = html.replace(/\{from\}/g, '<span id="value_from{controlId}" class="value_from"></span>');
  html = html.replace(/\{to\}/g, '<span id="value_to{controlId}" class="value_to"></span>');
  html = html.replace(/\{total\}/g, '<span id="value_size{controlId}" class="value_size"></span>');

  // Table size chooser
  var sizes = _t.parent.options.showSizeVariants;
  var showSizeValues = [];
  for (var i = 0; i < sizes.length; i++) {
    switch (sizes[i]) {
      case 20: showSizeValues.push([i, getLang('ads_paginated_table_show_20')]); break;
      case 50: showSizeValues.push([i, getLang('ads_paginated_table_show_50')]); break;
    }
  }
  showSizeValues.push([sizes.length, getLang('ads_paginated_table_show_all')]);


  var size_chooser_html = [];
  size_chooser_html.push('<a id="show_size_dd{globalId}" class="size_chooser_link dd_link">');
  size_chooser_html.push(showSizeValues[0][1]);
  size_chooser_html.push('</a>');
  html = html.replace(/\{size_chooser_label\}/g, this.parent.options.labels['show_num_label']);
  html = html.replace(/\{size_chooser\}/g, size_chooser_html.join(''));

  // Filter
  var filter_html = [];
  if (_t.parent.options.filter && _t.parent.options.filter.enabled) {
    filter_html.push('<nobr>');
    filter_html.push('<a id="table_filter_dd{controlId}" class="table_filter_dd dd_link"></a>');
    filter_html.push('</nobr>');
  }
  html = html.replace(/\{filter\}/g, filter_html.join(''));

  // Mass actions section
  var mass_act_html = [],
      search_html = [];
  if(options.richFeatures) {
    mass_act_html.push('<div id="pt_{globalId}_mass_act_default_container" style="display: none;"></div>');
    search_html.push('<div id="pt_{globalId}_search_default_container" style="display: none;"></div>');
  }
  html = html.replace(/\{mass_actions\}/g, mass_act_html.join(''));
  html = html.replace(/\{search\}/g, search_html.join(''));

  // Pagination -> page list
  var page_list_html = [];
  page_list_html.push('<table id="page_list_table{controlId}" class="page_list_table"></table>');
  html = html.replace(/\{page_list\}/g, page_list_html.join(''));

  // parent Id and control Id
  html = html.replace(/\{globalId\}/g, _t.parent.globalNum);
  html = html.replace(/\{controlId\}/g, controlCount);

  container.innerHTML = html;

  _t.smartFromTo = geByClass('label_from_to', container)[0];
  _t.smartTotal = geByClass('label_total', container)[0];
  _t.smartNoEntries = geByClass('label_no_entries', container)[0];

  _t.spanFrom = geByClass('value_from', container)[0];
  _t.spanTo = geByClass('value_to', container)[0];
  _t.spanSize = geByClass('value_size', container)[0];

  _t.pageListTable = geByClass('page_list_table', container)[0];

  _t.sizeChooserLink = geByClass('size_chooser_link', container)[0];

  _t.labelSpans = {};
  each(['no_entries',
        'from_to',
        'total',
        'dot'],
        function(i, v) {
          _t.labelSpans[v] = geByClass(v + '_label', container)[0];
          hide(_t.labelSpans[v]);
          return true;
        });

  if (_t.sizeChooserLink) {
    var showSizeDdOptions = {
      updateHeader: function(i, t) {
        if (!i) i = 0;
        if (i < sizes.length) {
          _t.parent.showSize = sizes[i];
        } else if (i == sizes.length) {
          _t.parent.showSize = _t.parent.tableSize;
        }
        _t.parent.refreshAll();
        return t;
      },
      target: _t.sizeChooserLink,
      showHover: true
    };
    new DropdownMenu(showSizeValues, showSizeDdOptions);
  }

  this.filterDdContainer = geByClass('table_filter_dd', container)[0];
  if (this.filterDdContainer) {
    var filterDdOptions = {
      target: this.filterDdContainer,
      updateHeader: function(i, t) {
        if (!i) i = 0;

        var type;
        if (i == -1) {
          type = undefined;
        } else {
          type = i;
        }
        _t.parent.setFilterType(type);
        return t;
      }
    };

    this.filterDdContainer.innerHTML = _t.parent.options.filter.types[0][1];
    this.filterDd = new DropdownMenu(_t.parent.options.filter.types || [[0, 'no filter']], filterDdOptions);
  } else {
    this.updateFilter(false);
  }

  onUnload(this.destructor.bind(this));

  controlCount++;
};

PaginatedTableControl.prototype.updateFilter = function(filter, index) {
  var filterDefaultContainer = geByClass('table_filter', this.container)[0];
  if (!this.filterDdContainer) {
    if (filterDefaultContainer) {
      hide(filterDefaultContainer);
    }
    return;
  }

  if (filter === undefined) {
    filter = this.parent.options.filter;
  }
  if (index === undefined) {
    index = 0;
  }

  if (!filter || !filter.enabled) {
    for (var node = this.filterDdContainer.parentNode; node && node.nodeName != 'NOBR'; node = node.parentNode);
    hide(node);
    //hide(this.labelSpans['dot']);
    if (filterDefaultContainer) {
      hide(filterDefaultContainer);
    }
  } else {
    if (filterDefaultContainer) {
      show(filterDefaultContainer);
    }
    this.filterDdContainer.innerHTML = filter.types[index][1];
    this.filterDd.setData(filter.types);
    this.filterDd.setOptions({title: filter.types[index][1]});
    for (var node = this.filterDdContainer.parentNode; node && node.nodeName != 'NOBR'; node = node.parentNode);
    show(node);
    //show(this.labelSpans['dot']);
    this.filterDd.moveToTarget();
  }
};

PaginatedTableControl.prototype.getContainer = function() {
  return this.container;
};

PaginatedTableControl.prototype.generatePaginationHeader = function(curPage) {
  var tSize;
  var promisedSize = this.parent.options.dataGet.total;
  if (!promisedSize) {
    tSize = this.parent.tableSize;
  } else if (this.parent.trueTableSize) {
    tSize = (this.parent.trueTableSize == promisedSize) ? this.parent.tableSize : promisedSize;
  } else {
    tSize = promisedSize;
  }

  var from = 1 + (curPage - 1) * this.parent.showSize,
      to = Math.min(from + this.parent.showSize - 1, this.parent.tableSize);
  var pages = Math.ceil(this.parent.tableSize / this.parent.showSize);


  // Labels
  if (this.parent.tableSize) {
    if (this.spanFrom) this.spanFrom.innerHTML = from;
    if (this.spanTo)   this.spanTo.innerHTML = to;
    if (this.spanSize) this.spanSize.innerHTML = tSize;

    var f;
    if (this.smartFromTo) {
      f = this.parent.options.labels['shown_from_to'];
      if (typeof f == 'function') {
        this.smartFromTo.innerHTML = f.call(this.parent, from, to);
      } else {
        this.smartFromTo.innerHTML = f.replace('{from}', from).replace('{to}', to);
      }
    }
    if (this.smartTotal) {
      f = this.parent.options.labels['shown_total'];
      if (typeof f == 'function') {
        this.smartTotal.innerHTML = f.call(this.parent, tSize);
      } else {
        this.smartTotal.innerHTML = f.replace('{total}', tSize);
      }
    }

    hide(this.labelSpans['no_entries']);
    hide(this.smartNoEntries);
    show(this.labelSpans['from_to']);
    show(this.smartFromTo);
    window[(pages > 1 || this.parent.options.representation.ALWAYS_SHOW_TOTAL_LABEL) ? 'show' : 'hide'](this.labelSpans['total']);
    window[(pages > 1 || this.parent.options.representation.ALWAYS_SHOW_TOTAL_LABEL) ? 'show' : 'hide'](this.smartTotal);
  } else {
   if (this.smartNoEntries) {
      f = this.parent.options.labels['no_entries_to_show'];
      if (typeof f == 'function') {
        this.smartNoEntries.innerHTML = f.call(this.parent);
      } else {
        this.smartNoEntries.innerHTML = f;
      }
    }

    show(this.labelSpans['no_entries']);
    show(this.smartNoEntries);
    hide(this.labelSpans['from_to']);
    hide(this.smartFromTo);
    hide(this.labelSpans['total']);
    hide(this.smartTotal);
  }
  window[(this.parent.options.filter && this.parent.options.filter.enabled) ? 'show' : 'hide'](this.labelSpans['dot']);


  // Pages list

  if (!this.pageListTable) return;
  var row = ce('tr'), i;

  switch (PAGINATION_STYLE) {
    case 'extended':
      for (i = 1; i <= Math.min(pages, PAGE_LIST_DEPTH); i++) {
        row.appendChild(genSelPageRef(this, i, curPage));
      }

      if (curPage - PAGE_LIST_DEPTH + 1 <= PAGE_LIST_DEPTH + 1) {
        for (i = PAGE_LIST_DEPTH + 1; i <= Math.min(pages, curPage + PAGE_LIST_DEPTH - 1); i++) {
          row.appendChild(genSelPageRef(this, i, curPage));
        }
      } else {
        row.appendChild(genCommasTd());
        for (i = curPage - PAGE_LIST_DEPTH + 1; i <= Math.min(pages, curPage + PAGE_LIST_DEPTH - 1); i++) {
          row.appendChild(genSelPageRef(this, i, curPage));
        }
      }

      if (curPage + PAGE_LIST_DEPTH - 1 >= pages - PAGE_LIST_DEPTH + 1 - 1) {
        for (i = curPage + PAGE_LIST_DEPTH; i <= pages; i++) {
          row.appendChild(genSelPageRef(this, i, curPage));
        }
      } else {
        row.appendChild(genCommasTd());
        for (i = pages - PAGE_LIST_DEPTH + 1; i <= pages; i++) {
          row.appendChild(genSelPageRef(this, i, curPage));
        }
      }
      break;

    case 'short':
      if (curPage - PAGE_LIST_DEPTH + 1 > 1) {
        row.appendChild(genSelPageRef(this, '<', 1));
      }
      for (var i = Math.max(1, curPage - PAGE_LIST_DEPTH + 1); i <= Math.min(pages, curPage + PAGE_LIST_DEPTH - 1); i++) {
        row.appendChild(genSelPageRef(this, i, curPage));
      }
      if (curPage + PAGE_LIST_DEPTH - 1 < pages) {
        row.appendChild(genSelPageRef(this, '>', pages));
      }
      break;
  }

  setInnerHTML(this, 'pageListTable', '<tbody></tbody>');

  if (pages > 1) {
    this.pageListTable.tBodies[0].appendChild(row);
  }
};

PaginatedTableControl.prototype.destroy = function(f) {
  if (!('destroyList' in this)) {
    this['destroyList'] = [];
  }
  this.destroyList.push(f);
}

PaginatedTableControl.prototype.destructor = function(f) {
  if ('destroyList' in this) {
    for (var i in this.destroyList) {
      this.destroyList[i]();
    }
  }
}


//
//  PaginatedTable
//
//  constructor
//
window.PaginatedTable = function(container, options, content) {
  if (!('cur' in window)) {
    window.cur = {};
  }

  if (!container) {
    container = ce('div', {id: 'paginated_table' + tableCount});
  }
  if (typeof container == 'string') {
    container = ge(container);
  }

  if (options['set_container_id']) {
    container.id = 'paginated_table' + tableCount;
  }

  var _t = this;
  _t.container = container;
  _t.globalNum = tableCount;
  if (window.cur._paginatedTables === undefined) window.cur._paginatedTables = [];
  window.cur._paginatedTables[_t.globalNum] = _t;

  this.setLayout({});
  this.setOptions(options);

  container.tableObj = this;

  var innerTableContainer = ce('div', {className: 'paginated_table'});
  _t.table = ce('table', {className: _t.options.tableClassNames['table']});
  innerTableContainer.appendChild(_t.table);

  var topControlContainer = ce('div');
  var bottomControlContainer = ce('div');

  var cOptions = {
    parent: _t
  };

  cOptions.addClass = 'top_control';
  cOptions.richFeatures = true;
  cOptions.layout = this.layout.topControl;
  _t.topControl = new PaginatedTableControl(topControlContainer, cOptions);
  cOptions.addClass = 'bottom_control';
  cOptions.richFeatures = false;
  cOptions.layout = this.layout.bottomControl;
  _t.bottomControl = new PaginatedTableControl(bottomControlContainer, cOptions);

  if (_t.options.search && _t.options.search.enabled) {
    var sContainer = _t.options.search.container;
    if (!sContainer) {
      sContainer = 'pt_' + _t.globalNum + '_search_default_container';
    }
    sContainer = ge(sContainer) || offlineGe(_t.topControl.container, sContainer);
    _t._initSearchContainer(sContainer);
  }

  container.appendChild(topControlContainer);
  container.appendChild(innerTableContainer);
  container.appendChild(bottomControlContainer);

  _t.curFrom = 0;
  _t.curTo = -1;

  if (content === undefined) {
    _t.seekTimer = setInterval(function() {
          if (_t.container.jsonData !== undefined) {
            _t.setContent(_t.container.jsonData);
            _t.applyData();
            clearInterval(_t.seekTimer);
          }
        }, 50);
    _t.setContent({data: 'loading'});
    _t._constructTable();
  } else {
    _t.setContent(content);
    _t.applyData();
  }

  if (_t.options.dataGet.url !== null) {
    _t.getData(_t.options.dataGet.url);
  }


  onUnload(_t.destructor.bind(_t));

  tableCount++;
};

window.PaginatedTable.prototype.applyData = function() {
  var _t = this;
  _t._initFormulas();
  _t._updateFormula(null);

  _t._constructTable();

  var startPage = 1;
  var startSrch = '';
  if (_t.options.behaviour.CHANGE_URL_HASH_ON_SCROLL) {
    startPage = _t._getPageNFromHash();
  }
  if (_t.options.behaviour.CHANGE_URL_HASH_ON_SEARCH) {
    startSrch = _t._getSearchStrFromHash();
  }
  if (_t.options.search && _t.options.search.enabled) {
    setTimeout(function() {
      _t._initSearchHashes();
      if (startSrch !== '') {
        _t._onSearchStringChange(startSrch);
        _t.goToPage(startPage);
      }
    }, 200);
  }

  _t.goToPage(startPage);

  var showSizeChooser = ge('show_size_chooser' + this.globalNum);
  if (this.options.paginationEnabled && (this.options.representation.ALWAYS_SHOW_SHOWSIZE_LIST || _t.tableSize > 20)) {
    if (showSizeChooser) {
      show(showSizeChooser);
    }

    var hidemask = ge('paginated_table_' + _t.globalNum + '_show_size_hide_mask');
    if (false && _t.tableSize <= 20) {
      _t.showSizeChooserTd.firstChild.style.color = '#666';
      if (!hidemask) {
        hidemask = ce('div', {id: 'paginated_table_' + _t.globalNum + '_show_size_hide_mask'}, {position: 'absolute', backgroundColor: '#000', opacity: '0.03', width: s[0] + 5, height: s[1] + 4, marginTop: -s[1] - 2, marginLeft: -5});
        _t.showSizeChooserTd.appendChild(hidemask);
        if (browser.msie7) {
          hidemask.style.marginTop = -2;
          hidemask.style.marginLeft = -s[0] - 5;
        }
      } else {
        show(hidemask);
      }
    } else {
//      _t.showSizeChooserTd.firstChild.style.color = '#000';
      if (hidemask) {
        hide(hidemask);
      }
    }
  } else {
    if (showSizeChooser) {
      hide(showSizeChooser);
    }
  }
}

window.PaginatedTable.prototype.setOptions = function(options, reset) {
  if (this.options === undefined || reset) {
    this.options = {
      tableClassNames: {
        table:     'paginated_table_table',
        header:    'paginated_table_header',
        footer:    'paginated_table_footer',
        row:       'paginated_table_row',
        cell:      'paginated_table_cell',
        firstCol:  'first_column',
        lastCol:   'last_column',
        colPrefix: 'column_',
        evenRow:   'even_row',
        emptyRow:  'empty_row',
        sortAsc:   'sort_asc',
        sortDesc:  'sort_desc',
        unsortable:'unsortable'
      },
      columnClasses: [],

      dataGet: {
        url: null,
        start: 0,
        limit: 100,
        total: null
      },

      paginationEnabled: true,
      noBrEnabled: true,
      sortingEnabled: true,

      onRefresh: function() {},

      filter: {
        enabled: false,
        container: false,
        onFilterChange: function() {},
        types: []
      },

      search: {
        enabled: false,
        container: false,
        column: 0,
        placeholder: getLang('ads_paginated_table_search') || 'Search',
        delimiters: /[ _.,/\'«»\+-]|&quot;|&laquo;|&raquo;/
      },

      checkboxPickingEnabled: false,
      onCheckboxPick: function(rown) {},

      columnFormatting: [],
      columnAlignment: [],

      sortOptions: [],

      showSizeVariants: [20, 50],

      labels: {
        'shown_from_to': getLang('ads_paginated_table_shown_from_to_new'),
        'shown_total': getLang('ads_paginated_table_shown_total'),
        'no_entries_to_show': getLang('ads_paginated_table_no_entries'),
        'show_num_label': getLang('ads_paginated_table_show_num_label')
      },
      representation: {
        'ALWAYS_SHOW_SHOWSIZE_LIST': false,
        'ALWAYS_SHOW_TOTAL_LABEL': false,
        'HIDE_SHOWSIZE_LIST_ROW': true,
        'HIDE_CHECKBOX_ON_EMPTY': true,
        'SHOW_CHECKBOX_IN_FOOTER': true
      },
      behaviour: {
        'FORCE_NUMBERS_ON_INIT': true,
        'CHANGE_URL_HASH_ON_SCROLL': true,
        'CHANGE_URL_HASH_ON_SEARCH': true,
        'SKIP_ZEROS_ON_AVERAGE': false,
        'SMART_LABELING': false,
        'SELECT_ONLY_VISIBLE': true
      }
    };
  }

  if (options.layout) {
    this.setLayout(options.layout);
  }
  if (!options.checkboxPickingEnabled || this.selection === undefined) {
    if (this.selection !== undefined) {
      this.toggleCheckbox(false, undefined, 0);  // not sure if it is architectally well enough
    }
    this.selection = [];
  }
  extend(true, this.options, options);
  if (options.filter) {
    if (this.topControl)    this.topControl.updateFilter();
    if (this.bottomControl) this.bottomControl.updateFilter();
  }
  if (this.options.paginationEnabled) {
    this.showSize = 20;
  } else {
    this.showSize = 1000000000;
  }
  if (this.options.behaviour.SMART_LABELING) {
    for (var i in this.options.labels) {
      try {
        this.options.labels[i] = eval('(' + this.options.labels[i] + ')');
      } catch (e) {}
    }
  }
};

window.PaginatedTable.prototype.setLayout = function(layout) {
  var defaultFilterLabel = getLang('ads_paginated_table_shown_filter_label');
  this.layout = {
    topControl: '<div id="show_size_chooser{globalId}" class="show_size_chooser"><table><tbody><tr><td class="control_label">{size_chooser_label}</td><td>{size_chooser}</td></tr></tbody></table></div><table class="paginate_layout_table"><tbody><tr><td class="control_label page_summary"><nobr><span id="no_entries_label{controlId}" class="no_entries_label" style="display: none; ">{no_entries_str}</span><span id="from_to_label{controlId}" class="from_to_label" style="">{from_to_str}</span><span id="total_label{controlId}" class="total_label" style="">{total_str}</span></nobr></td><td class="control_label table_filter">' + defaultFilterLabel + '{filter}</td><td>{mass_actions}</td><td>{search}</td><td>{page_list}</td></tr></tbody></table>',
    bottomControl: '<table id="paginate_layout_table{controlId}" class="paginate_layout_table"><tbody><tr><td>{page_list}</td></tr></tbody></table>'
  }
  extend(this.layout, layout);
}

window.PaginatedTable.prototype.refresh = function() {
  this.scrollTo(this.curFrom, this.curTo);
};

window.PaginatedTable.prototype.refreshAll = function() {
  this.goToPage(1);
};

window.PaginatedTable.prototype.hideAll = function() {
  for (var i = this.curFrom; i <= this.curTo; i++) {
    var row = this.rowPointers[this.permutation[i]];
    hide(row);
  }
};

window.PaginatedTable.prototype.scrollTo = function(from, to) {
  if (to === undefined) {
    to = Math.min(from + this.showSize - 1, this.tableSize - 1);
  }

  from = Number(from);
  to = Number(to);

  if (isNaN(from) || isNaN(to) || ((from < 0 || from >= this.tableSize || to < 0 || to >= this.tableSize || from > to) && this.tableSize)) {
    return false;
  }

  var i;
  for (i = this.curFrom; i <= this.curTo; i++) {
    if (!(this.permutation[i] in this._rowNeedUpdate) || this._rowNeedUpdate[this.permutation[i]]) {
      this.updateRowHTML(this.permutation[i]);
    }
  }

  this.curFrom = from;
  this.curTo = to;

  var html = [];
  html.push('<tbody>');
  for (i = from; i <= to; i++) {
    if (!(this.permutation[i] in this._rowNeedUpdate) || this._rowNeedUpdate[this.permutation[i]]) {
      this.updateRowHTML(this.permutation[i]);
    }
    html.push(this.rowHTMLs[this.permutation[i]]);
  }
  if (this.content && this.content.data && this.content.data == 'loading') {
    html.push('<tr><td style="text-align: center;"><img src="/images/progress7.gif" alt="Loading..."/></td></tr>');
  }
  html.push('</tbody>');

  setInnerHTML(this, 'table', html.join(''));

  var tbody = this.table.tBodies[0];
  if (this.headerPointer) {
    tbody.insertBefore(this.headerPointer, tbody.firstChild);
  }
  if (this.errRowPointer && this.tableSize == 0) {
    tbody.appendChild(this.errRowPointer);
  }
  if (this.footerPointer && this.tableSize > 0) {
    tbody.appendChild(this.footerPointer);
  }

  if (this.options.representation.HIDE_CHECKBOX_ON_EMPTY && this.headerPointer && this.options.checkboxPickingEnabled) {
    window[this.tableSize == 0 ? 'hide' : 'show'](this.headerPointer.firstChild);
    window[this.tableSize == 0 ? 'addClass' : 'removeClass'](this.headerPointer.firstChild, 'cb_shift');
  }

  this._updateControls();

  if (this.options.onRefresh) {
    this.options.onRefresh.apply(this);
  }
};

window.PaginatedTable.prototype.goToPage = function(pagen, noHashUpdate) {
  var from = (pagen - 1) * this.showSize, to = Math.min(from + this.showSize - 1, this.tableSize - 1);
  this.curPage = pagen;
  if (!noHashUpdate && this.options.behaviour.CHANGE_URL_HASH_ON_SCROLL) {
    this._putPageNToHash(this.curPage);
  }
  this.scrollTo(from, to);
};

window.PaginatedTable.prototype.scrollUp = function(num, delay) {
  if (num === undefined) num = 1;
  this.scrollDown(-num, delay);
};

window.PaginatedTable.prototype.scrollDown = function(num, delay) {
  if (num === undefined) num = 1;
  if (delay === undefined) delay = 0;

  var dir = (num < 0 ? -1 : 1);
  var _t = this;
  var timerId;
  num = Math.abs(num);

  var iterate = function() {
    if (num == 0 || _t.curTo + dir >= _t.tableSize || _t.curFrom + dir < 0) {
      if (timerId !== undefined) {
        clearInterval(timerId);
      }
      _t._updateControls();
      return false;
    }

    hide(_t.rowPointers[_t.permutation[(dir == 1 ? _t.curFrom : _t.curTo)]]);
    _t.curFrom += dir;
    _t.curTo += dir;
    show(_t.rowPointers[_t.permutation[(dir == 1 ? _t.curTo : _t.curFrom)]]);

    num--;
    return true;
  };

  if (delay <= 0) {
    while (iterate()) ;
  } else {
    timerId = setInterval(iterate, delay);
  }
};

window.PaginatedTable.prototype.setContent = function(content) {
  this.content = (this.options.behaviour.FORCE_NUMBERS_ON_INIT ? forceAllNumbers(content) : content);

  this.tableSize = this.content.data.length;
  this.curFrom = 0;
  this.curTo = -1;

  this._putPageNToHash(1);
  this.setPermutation();

  if (0 && this.tableSize == 0 && this.options.filter && this.options.filter.enabled) {
    if (this.topControl) this.topControl.updateFilter(false);
    if (this.bottomControl) this.bottomControl.updateFilter(false);
  }
};

window.PaginatedTable.prototype.addContent = function(content) {
  var _t = this;
  if (!_t.content) {
    _t.setContent(content);
    return;
  }

  var i, j;
  if (content.footer) {
    _t.content.footer = content.footer;
  }

  each(['extra', 'data', 'types', 'eventListeners'], function(i, v) {
    if (!(v in content)) {
      content[v] = [];
    }
  });

  for (i in content.extra) {
    if (i in _t.content.extra) {
      for (j in content.extra[i]) {
        _t.content.extra[i][_t.tableSize - (-j)] = content.extra[i][j];
      }
    } else {
      _t.content.extra[i] = content.extra[i];
    }
  }
  _t.tableSize += content.data.length;
  _t.content.data = (_t.content.data || []).concat(content.data);
  _t.content.types = (_t.content.types || []).concat(content.types);
  _t.content.eventListeners = (_t.content.eventListeners || []).concat(content.eventListeners);

  _t.setPermutation(); // at this time we'll do like this, but also we can do an online-update of:
                         //  sort, filter, search query
  // instead of applyData (which will result in O(n^2) contructing time in common) we'll call some particular functions right here
  _t._initFormulas();
  for (i = _t.tableSize - content.data.length; i < _t.tableSize; i++) {
    if (!(i in _t.content._formula)) {
      continue;
    }
    for (j in _t.content._formula[i]) {
      _t._updateFormula(i, j, false);
    }
  }

  var startPage = 1;
  var startSrch = '';
  if (_t.options.behaviour.CHANGE_URL_HASH_ON_SCROLL) {
    startPage = _t._getPageNFromHash();
  }
  if (_t.options.behaviour.CHANGE_URL_HASH_ON_SEARCH) {
    startSrch = _t._getSearchStrFromHash();
  }

  if (_t.options.search && _t.options.search.enabled) {
    setTimeout(function() {
      _t._initSearchHashes(_t.tableSize - content.data.length);
      if (startSrch !== '') {
        _t._onSearchStringChange(startSrch);
        _t.goToPage(startPage);
      }
    }, 200);
  }

  _t.footerPointer = _t._constructFooter();

  _t.refreshAll();
};

window.PaginatedTable.prototype.setPermutation = function(perm) {
  var i;
  if (perm === undefined) {
    perm = [];
    for (i = 0; i < this.tableSize; i++) {
      perm.push(i);
    }
  }

  this.permutation = perm;
  this.invmutation = [];
  for (i = 0; i < this.permutation.length; i++) {
    this.invmutation[this.permutation[i]] = i;
  }
};

window.PaginatedTable.prototype.sortData = function(keyN, desc, length) {
  var dir;
  if (!desc) {
    dir = 1;
  } else {
    dir = -1;
  }
  if (length === undefined) {
    length = this.tableSize;
  }

  if (keyN < -1 || keyN >= this.content.header.length) {
    return;
  }

  var _t = this, cmp, i, j;
  if (keyN == -1) {
    cmp = function(a, b) {return (a - b) * dir;};
  } else {
    var sortCol = keyN;
    var sortParams = [];
    var isCaseSensitive = true;
    var secondary = false;

    if (_t.options.sortOptions && _t.options.sortOptions[keyN]) {
      sortParams = _t.options.sortOptions[keyN].split(' ');
    }
    for (i = 0; i < sortParams.length; i++) {
      if (sortParams[i].indexOf('secondary=') != -1) {
        var dataTree = sortParams[i].substring(10).split('.');
        secondary = _t.content;
        for (j = 0; j < dataTree.length; j++) {
          if (secondary) {
            secondary = secondary[dataTree[j]];
          }
        }
        continue;
      }
      switch (sortParams[i]) {
        case 'case-insensitive':
          isCaseSensitive = false;
          break;
      }
    }


    var sgn = function(x) {return (x > 0 ? 1 : (x == 0 ? 0 : -1))};
    var compareData = function(oa, ob) {
      var na = Number(oa), nb = Number(ob);
      if (!isNaN(na) && !isNaN(nb)) {
        return dir * sgn(na - nb);
      }
      if (!isCaseSensitive) {
        oa = oa.toString().toLowerCase();
        ob = ob.toString().toLowerCase();
      }
      if (oa < ob) return -1 * dir;
      if (oa == ob) return 0;
      return 1 * dir;
    };
    cmp = function(a, b) {
      var oa = _t.content.data[a][sortCol], ob = _t.content.data[b][sortCol];
      var res = compareData(oa, ob);
      if (secondary && (res == 0 || _t.options.sortSecondaryDataOnly)) {
        oa = secondary[a];
        ob = secondary[b];
        res = compareData(oa, ob);
      }
      return res;
    }
  }

  this._curSortOrder = [keyN, desc];
  var toSort = this.permutation.splice(0, length);
  toSort.sort(cmp);
  this.setPermutation(toSort.concat(this.permutation));
  for (i = 0; i < this.content.data.length; i++) {
    this._rowNeedUpdate[i] = 1;
  }
};

window.PaginatedTable.prototype.setSortingOrder = function(keyN, desc) {
  if (this.headerPointer) {
    for (var elem = this.headerPointer.firstChild; elem; elem = elem.nextSibling) {
      removeClass(elem, this.options.tableClassNames['sortAsc']);
      removeClass(elem, this.options.tableClassNames['sortDesc']);
    }

    var i = 0;
    var cell = this.headerPointer.firstChild;
    while (true) {
      if (!cell) break;
      if (hasClass(cell, 'cb_cell')) i--;
      if (i >= keyN) break;
      i++;
      cell = cell.nextSibling;
    }
    if (i == keyN && cell) {
      addClass(cell, this.options.tableClassNames[desc ? 'sortDesc' : 'sortAsc']);
    }
  }
  this.sortData(keyN, desc);
  this.refresh();
};

window.PaginatedTable.prototype.filtrate = function(type) {
  var showAll = (type === undefined);
  if (!showAll && typeof type != 'object') {
    type = [type];
  }

  var savedType = clone(type);

  var i, j;
  this.trueTableSize = this.permutation.length;

  var listFilters = [];
  if (type !== undefined) {
    for (i in type) {
      if (typeof type[i] == 'object') {
        listFilters.push(type[i]);
        delete type[i];
      }
    }
  }

  var cntL, cntR;
  if (showAll) {
    newPerm = this.permutation;
    cntL = this.trueTableSize;
    cntR = this.trueTableSize;
  } else {
    var newPerm = [];
    cntL = 0;
    cntR = this.trueTableSize;

    for (i = 0; i < this.trueTableSize; i++) {
      var f = 1;
      for (j in type) {
        if (type[j] !== undefined && this.content.types[this.permutation[i]] != type[j]) {
          f = 0;
          break;
        }
      }
      for (j in listFilters) {
        if (!listFilters[j][this.permutation[i]]) {
          f = 0;
          break;
        }
      }
      if (f) {
        newPerm[cntL++] = this.permutation[i];
      } else {
        newPerm[--cntR] = this.permutation[i];
      }
    }

    this.setPermutation(newPerm);
  }

  this.tableSize = cntL;

  // Fix header td's if table is sorted or empty
  if (cntL == 0) {
    for (var elem = this.headerPointer.firstChild; elem; elem = elem.nextSibling) {
      addClass(elem, this.options.tableClassNames['unsortable']);
    }
  } else {
    for (var elem = this.headerPointer.firstChild; elem; elem = elem.nextSibling) {
      removeClass(elem, this.options.tableClassNames['unsortable']);
    }
  }

  if (this._curSortOrder) {
    this.sortData(this._curSortOrder[0], this._curSortOrder[1]);
  } else {
    this.sortData(-1, 0);
  }

  this._curFilter = savedType;

  if (this.options.filter.onFilterChange) {
    this.options.filter.onFilterChange.call(this, savedType);
  }
};

window.PaginatedTable.prototype.setFilterType = function(type) {
  if (typeof type == 'object') {
    type = type[0];
  }

  var ind = 0;
  for (var i = 0; i < this.options.filter.types.length; i++) {
    if (this.options.filter.types[i][0] === type || (type === undefined && this.options.filter.types[i][0] == -1)) {
      ind = i;
      break;
    }
  }

  this.topControl.updateFilter(undefined, ind);
  this.bottomControl.updateFilter(undefined, ind);

  var newFilter = this._curFilter;
  if (typeof newFilter != 'object') {
    newFilter = [newFilter];
  }
  newFilter[0] = type;

  this.filtrate(newFilter);
  this.refreshAll();
};

window.PaginatedTable.prototype.updateRowHTML = function(rowN) {
  if (!(rowN in this.rowPointers)) {
    this._constructRow(rowN);
  }

  setParity(this.rowPointers[rowN], this.invmutation[rowN] + 1, this.options.tableClassNames['evenRow']);

  this.rowHTMLs[rowN] = myOuterHTML(this.rowPointers[rowN]);
  this._rowNeedUpdate[rowN] = 0;
};

window.PaginatedTable.prototype._updateControls = function() {
//  this.topControl.updateFrom(this.curFrom + 1);
//  this.bottomControl.updateFrom(this.curFrom + 1);
  if (this.curPage) {
    this.topControl.generatePaginationHeader(this.curPage);
    this.bottomControl.generatePaginationHeader(this.curPage);
  }
};

window.PaginatedTable.prototype._constructTable = function(visible) {
  if (visible === undefined) visible = true;
  var _t = this;
  var content = this.content;
  var i, j, iadd, jadd;
  var curCell, cell;

  this.rowPointers = [];
  this.rowHTMLs = [];
  this._rowNeedUpdate = [];

  _colAddCl = [];

  var n = Math.max(content.header ? content.header.length : 0, _t.options.columnClasses ? _t.options.columnClasses.length : 0);

  if (content.header) {
    var headerRow = this._constructHeader();
  }

  var errRow = ce('tr', {className: _t.options.tableClassNames['emptyRow']});
  if (browser.msie && parseFloat(browser.version) < 9.0) {
    cell = ce('<td colspan="' + (content.header ? content.header.length + (_t.options.checkboxPickingEnabled & !_t.options.representation.HIDE_CHECKBOX_ON_EMPTY) : 1) + '">', {innerHTML: (_t.content.emptyRowText !== undefined ? _t.content.emptyRowText : getLang('ads_paginated_table_no_data'))});
  } else {
    cell = ce('td', {colSpan: content.header ? content.header.length + (_t.options.checkboxPickingEnabled & !_t.options.representation.HIDE_CHECKBOX_ON_EMPTY) : 1, innerHTML: (_t.content.emptyRowText !== undefined ? _t.content.emptyRowText : getLang('ads_paginated_table_no_data'))});
  }
  errRow.appendChild(cell);


  if (content.footer) {
    var footerRow = this._constructFooter();
  }

  this.headerPointer = headerRow;
  this.footerPointer = footerRow;
  this.errRowPointer = errRow;

  var html = [];
  html.push('<tbody>');
  if (content.data && typeof content.data == 'object' && visible) {
    for (i = 0; i < content.data.length; i++) {
      html.push(this.rowHTMLs[i]);
    }
  }

  if (content.data && content.data == 'loading') {
    addClass(this.table, 'table_loading');
    html.push('<tr><td style="text-align: center;"><img src="/images/progress7.gif" alt="Loading..."/></td></tr>');
  } else {
    removeClass(this.table, 'table_loading');
  }

  html.push('</tbody>');
  setInnerHTML(this, 'table', html.join(''));

  var tbody = this.table.tBodies[0];
  if (headerRow) {
    tbody.insertBefore(headerRow, tbody.firstChild);
  }
  if (this.content.data.length == 0 && errRow) {
    tbody.appendChild(errRow);
  }
  if (footerRow) {
    tbody.appendChild(footerRow);
  }

};

window.PaginatedTable.prototype._constructHeader = function() {
  var _t = this,
      content = _t.content,
      options = _t.options;

  var headerRow = ce('tr', {className: _t.options.tableClassNames['header']});
  var iadd, n, cell, curCell;

  iadd = 0;
  n = content.header.length;
  if (content.data && content.data.length && this.options.checkboxPickingEnabled) {
    iadd++;
    n++;
    curCell = ce('th', {className: getCellClass(_t, 0, n, 'cb_cell'), innerHTML: '<a id="total_cb_' + _t.globalNum + '">&lrm;</a>'});
    initCb(curCell.firstChild, undefined);
    headerRow.appendChild(curCell);
  }

  var _sortOrder = [];
  for (i = 0; i < content.header.length; i++) {
    curCell = ce('th', {className: getCellClass(_t, i + iadd, n), innerHTML: '<div><span class="table_header_upper_span">' + content.header[i] + '</span></div>'});
    if (_t.options.noBrEnabled) {
      curCell.style.whiteSpace = 'nowrap';
    }

    var sortParams = [];
    if (_t.options.sortOptions && _t.options.sortOptions[i]) {
      sortParams = _t.options.sortOptions[i].split(' ');
    }
    _sortOrder[i] = ['sortAsc', 'sortDesc'];
    for (j = 0; j < sortParams.length; j++) {
      switch (sortParams[j]) {
        case 'reverse':
        case 'reversed':
          _sortOrder[i] = ['sortDesc', 'sortAsc'];
          break;
      }
    }
    curCell.index = i;

    var onHeaderCellClick = function(e) {
      if (!_t.tableSize) return;

      var curCell = e.currentTarget;
      var newClass = _t.options.tableClassNames[_sortOrder[curCell.index][0]];
      if (_t._curSortOrder && _t._curSortOrder[0] == curCell.index) {
        var oldSortOrder = _t._curSortOrder[1];
        newClass = _t.options.tableClassNames[oldSortOrder == 1 ? 'sortAsc' : 'sortDesc'];
      }

      for (var elem = _t.headerPointer.firstChild; elem; elem = elem.nextSibling) {
        removeClass(elem, _t.options.tableClassNames['sortAsc']);
        removeClass(elem, _t.options.tableClassNames['sortDesc']);
      }

      addClass(curCell, newClass);
      _t.sortData(curCell.index, newClass == _t.options.tableClassNames['sortDesc']);
      _t.refresh();
    };

    addEvent(curCell, 'click', onHeaderCellClick);
    this.destroy(function() {
      removeEvent(curCell, 'click', onHeaderCellClick);
    });


    if (!this.tableSize) {
      addClass(curCell, _t.options.tableClassNames['unsortable']);
    }
    headerRow.appendChild(curCell);
  }

  return headerRow;
}

window.PaginatedTable.prototype._constructFooter = function() {
  var _t = this,
      content = _t.content;

  var footerRow = ce('tr', {className: _t.options.tableClassNames['footer']});

  var curCell, iadd, n;
  iadd = 0;
  n = content.footer.length;
  if (this.options.checkboxPickingEnabled) {
    iadd++;
    n++;
    if (this.options.representation.SHOW_CHECKBOX_IN_FOOTER) {
      curCell = ce('td', {className: getCellClass(_t, 0, n, 'cb_cell'), innerHTML: '<a id="total_ft_cb_' + _t.globalNum + '"></a>'});
      initCb(curCell.firstChild, undefined);
      footerRow.appendChild(curCell);
    }
  }

  function calculateFooterValue(formula, arguments) {
    var text = '';
    switch (formula) {
      case 'none':
        break;
      case 'sum':
        sum = 0;
        cur = 0;
        for (j = 0; j < content.data.length; j++) {
          cur = Number(content.data[j][i]);
          sum += (isNaN(cur) ? 0 : cur);
        }
        text = sum.toFixed(SUM_PRECISION);
        break;
      case 'ctr':
        var index1 = Number(arguments[0]);
        var index2 = Number(arguments[1]);
        var ctr = (Number(content.footer_raw_values[index1]) / Number(content.footer_raw_values[index2])) * 100;
        if (isNaN(ctr)) ctr = 0;
        text = ctr.toFixed(PERCENT_FORMAT_PRECISION);
        break;
      case 'average':
        sum = 0;
        cur = 0;
        num = 0;
        for (j = 0; j < content.data.length; j++) {
          cur = Number(content.data[j][i]);
          if (!isNaN(cur) && (cur != 0 || !_t.options.behaviour.SKIP_ZEROS_ON_AVERAGE)) {
            sum += cur;
            num++;
          }
        }
        sum /= num;
        if (isNaN(sum)) sum = 0;
        text = sum.toFixed(AVG_PRECISION);
        break;
      case 'label':
        text = getLang('ads_paginated_table_footer_total').replace('{total}', content.data.length);
        break;
      default:
        text = formula;
        break;
    }
    return text;
  }

  var deferred_cells = [];
  content.footer_raw_values = {};
  for (var i = 0; i < content.footer.length; i++) {
    var text = '', sum, cur, num, modifier = '', arguments = [];
    var formula = content.footer[i];
    var formula_parts = formula.split(':', 3);

    formula = formula_parts[0];
    if (formula_parts.length > 1) {
      modifier = formula_parts[1];
      if (formula_parts.length > 2) {
        arguments = formula_parts[2].split(',');
      }
    }
    if (modifier == 'deferred') {
      deferred_cells.push({
        formula: formula,
        arguments: arguments,
        cell_index: i
      });
      text = '&nbsp;';
    } else {
      text = calculateFooterValue(formula, arguments);
      content.footer_raw_values[i] = text;
    }

    if (formula != 'none' && formula != 'label' && _t.options.columnFormatting && _t.options.columnFormatting[i]) {
      text = _t._formatData(text, _t.options.columnFormatting[i], -1, -1);
    }
    footerRow.appendChild(ce('td', {className: getCellClass(_t, i + iadd, n), innerHTML: text}, (_t.options.noBrEnabled ? {whiteSpace: 'nowrap'} : {})));
  }
  for (i = 0; i < deferred_cells.length; ++i) {
    formula = deferred_cells[i].formula;
    text = calculateFooterValue(formula, deferred_cells[i].arguments);
    if (formula != 'none' && formula != 'label' && _t.options.columnFormatting && _t.options.columnFormatting[deferred_cells[i].cell_index]) {
      text = _t._formatData(text, _t.options.columnFormatting[deferred_cells[i].cell_index], -1, -1);
    }
    footerRow.childNodes.item(deferred_cells[i].cell_index).innerHTML = text;
  }
  if (this.options.checkboxPickingEnabled && !this.options.representation.SHOW_CHECKBOX_IN_FOOTER) {
    footerRow.firstChild.colSpan = '2';
  }

  return footerRow;
}

window.PaginatedTable.prototype._constructRow = function(i) {
  var content = this.content;
  var _t = this;
  var curHTML = [];

  jadd = 0;
  n = content.data[i].length;
  if (_t.options.checkboxPickingEnabled) {
    jadd++;
    n++;
    curCell = ce('td', {className: getCellClass(_t, 0, n, 'cb_cell'), innerHTML: '<a id="cb_row_' + i + '_' + _t.globalNum + '">&lrm;</a>'});
    initCb(curCell.firstChild, i);
//        curRow.appendChild(curCell);
    curHTML.push(myOuterHTML(curCell));
  }

  for (j = 0; j < content.data[i].length; j++) {
    var dataStr = content.data[i][j];
    if (_t.options.columnFormatting && _t.options.columnFormatting[j]) {
      dataStr = _t._formatData(dataStr, _t.options.columnFormatting[j], i, j);
    }
//        curRow.appendChild(ce('td', {id: 'cell_' + i + '_' + j, className: getCellClass(_t, j + jadd, n), innerHTML: dataStr}, (_t.options.noBrEnabled ?  {whiteSpace: 'nowrap'} : {})));
    curHTML.push(['<td id="cell_', i, '_', j, '" class="', getCellClass(_t, j + jadd, n), '"', _t.options.noBrEnabled ? 'style="white-space: nowrap;"' : '', '>', dataStr, '</td>'].join(''));
  }
  var curRow = null;
  if (browser.mozilla || browser.msie) {
    curRow = ceRowHTML({className: _t.options.tableClassNames['row'], innerHTML: curHTML.join('')});
  } else {
    curRow = ce('tr', {className: _t.options.tableClassNames['row'], innerHTML: curHTML.join('')});
  }
  setParity(curRow, i + 1, this.options.tableClassNames['evenRow']);

  // INIT EVENT LISTENERS
  if (content.eventListeners && content.eventListeners[i]) {
    for (j in content.eventListeners[i]) {
      for (var k in content.eventListeners[i][j])
      var opt = content.eventListeners[i][j][k];
      if (opt) {
        var targetId = opt.target,
            eventName = opt.event,
            fn = eval('(' + opt.listener + ')'),
            globId = _t.globalNum;

        storeGlobalPTFunction(fn, globId, i, j, k);

        var oldEl = ge(targetId); // fix: in case of substituting table content with another with the same id
        if (oldEl) oldEl.id = '';
        var el = offlineGe(curRow, targetId);

        el.setAttribute('on' + eventName, 'invokeGlobalPTFunction(this,' + [globId, i, j, k].join(',') + ');');
      }
    }
  }

  this.rowPointers[i] = curRow;
  this._rowNeedUpdate[i] = 1;
  this.rowHTMLs[i] = myOuterHTML(curRow);
};

window.PaginatedTable.prototype._formatData = function(data, format, rown, coln) {
  if (typeof format == 'function') {
    return format.call(this, data, rown, coln);
  }
  if (typeof format != 'string') {
    return data;
  }

  var i, s, str, matches, tag;
  if (data === undefined || data === null) {
    data = '';
  }

  if (format.charAt(0) == '^') {
    str = format.substring(1);
    matches = str.match(/\{[A-Za-z_^]+\}/g);
    for (i = 0; matches && i < matches.length; i++) {
      tag = matches[i].slice(1, -1);
      tag = tag.split('^');
      var addFormat = tag[1] || false;
      tag = tag[0];

      if (tag == 'value') {
        if (addFormat) {
          str = str.replace(matches[i], this._formatData(data, addFormat, rown, coln));
        } else {
          str = str.replace(matches[i], data);
        }
      } else if (this.content.extra[tag]) {
        var repData = this.content.extra[tag][rown];
        if (typeof repData == 'object') {
          repData = this.content.extra[tag][rown][coln];
        }

        if (repData === undefined) {
          str = str.replace(matches[i], '');
        } else {
          if (addFormat) {
            str = str.replace(matches[i], this._formatData(repData, addFormat, rown, coln));
          } else {
            str = str.replace(matches[i], repData);
          }
        }
      }
    }
    return str;
  }

  if (format.indexOf('date') == 0) {
    var tm = data.split('-');

    str = format.substring(4);
    matches = str.match(/\{[A-Za-z_^]+\}/g);
    for (i = 0; matches && i < matches.length; i++) {
      tag = matches[i].slice(1, -1);
      var repl = '';
      switch (tag) {
        case 'd':
          repl = tm[2];
          break;
        case 'j':
          repl = Number(tm[2]);
          break;
        case 'm':
          repl = tm[1];
          break;
        case 'n':
          repl = Number(tm[1]);
          break;
        case 'F':
          repl = getLang('Month' + Number(tm[1]));
          break;
        case 'f':
          repl = getLang('month' + Number(tm[1]));
          break;
        case 'F_of':
          repl = getLang('Month' + Number(tm[1]) + '_of');
          break;
        case 'f_of':
          repl = getLang('month' + Number(tm[1]) + '_of');
          break;
        case 'Y':
          repl = tm[0];
          break;
        case 'y':
          repl = tm[0].substring(2);
          break;
      }
      str = str.replace(matches[i], repl);
    }
    return str;
  }

  switch (format) {
    case 'currency':
      return getLang('global_money_amount_rub_short', this._formatData(data, 'delim_float'));

    case 'currency_int':
      return getLang('global_money_amount_rub_short', this._formatData(data, 'delim_int'));

    case 'delim_int':
      s = Number(data);
      if (isNaN(s)) {
        s = data.toString();
      } else {
        s = s.toFixed(0);
      }
      var arr = [];
      while (s != '') {
        arr.push(s.slice(-3));
        s = s.substring(0, s.length - 3);
      }
      arr.reverse();
      return arr.join(' ');

    case 'delim_float':
      s = data.toString().replace(',', '.');
      s = Number(s).toFixed(FLOAT_FORMAT_PRECISION);
      var tn = s.indexOf('.');
      var tail = s.substring(tn);
      return this._formatData(s.substring(0, tn), 'delim_int') + tail;

    case 'percent_float':
      if (isNaN(data) || data == Infinity) {
        data = 0;
      }
      s = data.toString().replace(',', '.');
      s = Number(s).toFixed(PERCENT_FORMAT_PRECISION);
      return s + '&nbsp;%';

    case 'percent_float1':
      if (isNaN(data) || data == Infinity) {
        data = 0;
      }
      s = data.toString().replace(',', '.');
      s = Number(s).toFixed(1);
      return s + '&nbsp;%';

    case 'plain':
    default:
      return data;
  }
};

// Data getting from URL
//  this method will send ajax requests to URL.replace(['{offset}', '{limit}'], [offset, limit])
//  until it will get all data (in particular, when response length 'll be less than limit)
//  so be careful in setting URL - it can go into infinite recursion!
window.PaginatedTable.prototype.getData = function(URL) {
  if (!URL) return false;

  var _t=this;
  var limit = this.options.dataGet.limit,
      offset = this.options.dataGet.start,
      lastGet = null,
      onGetData = function(response) {
        if (offset == 0) {
          _t.setContent(response.content);
          _t.applyData();
        } else {
          _t.addContent(response.content);
        }
        lastGet = response.content.data.length;
        offset += lastGet;
        get();
      };

  var get = function() {
    if (_t.options.dataGet.total !== null && offset >= _t.options.dataGet.total) return;
    if (lastGet !== null && lastGet < limit) return;

    var sendUrl = URL.replace(/\{(\w+)\}/g, function() {
      switch (arguments[1]) {
        case 'offset':
          return offset;
        case 'limit':
          return limit;
      }
    });
    ajax.post(sendUrl, {}, {onDone: function(response) {
        try {
          onGetData(eval('(' + response + ')'));
        } catch (e) {}
      }
    });
  };

  get();
};

// type: 0 - array of selected,
//       1 - vector of bits
window.PaginatedTable.prototype.getSelection = function(type, onlyVisible) {
  var i, j, ans;
  var n = onlyVisible ? this.tableSize : this.trueTableSize || this.tableSize;
  switch (type) {
    case 0:
      ans = [];
      for (i = 0; i < n; i++) {
        if (onlyVisible) {
          j = i >= this.curFrom && i <= this.curTo ? this.permutation[i] : -1;
        } else {
          j = i;
        }
        if (this.options.checkboxPickingEnabled && this.selection[j]) {
          ans.push(j);
        }
      }
      return ans;
    case 1:
      ans = [];
      for (i = 0; i < n; i++) {
        if (onlyVisible) {
          j = i >= this.curFrom && i <= this.curTo ? this.permutation[i] : -1;
        } else {
          j = i;
        }
        if (this.options.checkboxPickingEnabled && this.selection[j]) {
          ans.push(1);
        } else {
          ans.push(0);
        }
      }
      return ans;
    default:
      return null;
  }
};

window.PaginatedTable.prototype.getContainer = function() {
  return this.container;
};

//
// Part for support of inline controls and other features
//

//
// Formulas
//
window.PaginatedTable.prototype._initFormulas = function() {
  if (this.content._formula) {
    this.content._formula = null;
  }
  if (!this.content || !this.content.data) return;

  var n = this.content.data.length;
  var m;
  for (var i = 0; i < n; i++) {
    m = this.content.data[i].length;
    if (!m) continue;

    for (var j = 0; j < m; j++) {
      var f = this.content.data[i][j];
      if (f === null || !f.length) continue;
      if (f[0] !== '$' || f[1] !== '=') continue;

      if (!this.content._formula) this.content._formula = [];
      if (!this.content._formula[i]) this.content._formula[i] = [];
      this.content._formula[i][j] = f.substring(2);
      this.content.data[i][j] = '$';
    }
  }
};

window.PaginatedTable.prototype._updateFormula = function(rown, coln, force) {
  if (!this.content._formula) return false;
  if (rown === null) {
    for (var i in this.content._formula) {
      for (var j in this.content._formula[i]) {
        this._updateFormula(i, j, false);
      }
    }
    return true;
  }
  if (!this.content._formula[rown] || !this.content._formula[rown][coln]) return false;
  if (force === undefined) {
    force = true;
  }

  return this.content.data[rown][coln] === (this.content.data[rown][coln] = this._parseExpression(rown, coln, force));
};

window.PaginatedTable.prototype._parseExpression = function(rown, coln, force) {
  var datar = this.content.data[rown];
  var formr = this.content._formula[rown];
  if (!formr[coln]) return datar[coln];
  if (datar[coln] === '&') return 0;
  if (datar[coln] !== '$' && !force) {
    return datar[coln];
  }
  datar[coln] = '&';
  var f = formr[coln];

  var bin = [
    ['+', 5, function(a,b) {if (!a) a = 0; return a+b;}],
    ['-', 5, function(a,b) {if (!a) a = 0; return a-b;}],
    ['*', 4, function(a,b) {return a*b;}],
    ['/', 4, function(a,b) {return a/b;}],
    ['^', 3, function(a,b) {return Math.pow(a, b);}]
  ];


  var curAns = 0, curFname = '';
  var st = [], top, cur;
  var i, i0, j, k, n = f.length;
  for (i = 0; i < n; i++) {
    k = -1;
    for (j in bin) { // search for binary
      if (f[i] === bin[j][0]) {
        k = j;
        break;
      }
    }
    if (k != -1) { // found binary
      cur = {
        pr: bin[k][1],
        f: bin[k][2]
      };
      while (st.length > 0 && st[st.length - 1].pr <= cur.pr) {
        top = st.pop();
        curAns = top.f.apply(this, top.args.concat([curAns]));
      }
      cur.args = [curAns];
      st.push(cur);
      curAns = 0;
      continue;
    }
    if (/[0-9.]/.test(f[i])) { // found number
      i0 = i;
      while (/[0-9.]/.test(f[i])) i++;
      curAns = Number(f.substring(i0, i));
      i--;
      continue;
    }
    if (f[i] == '$') { // found variable
      i++;
      i0 = i;
      while (/[0-9.]/.test(f[i])) i++;
      curAns = this._parseExpression(rown, Number(f.substring(i0, i)) - 1, force);
      i--;
      continue;
    }
    switch (f[i]) {
      case '(':
        st.push({pr: 101, fname: curFname});
        curFname = '';
        break;
      case ',':
        while (st.length > 0 && st[st.length - 1].pr <= 100) {
          top = st.pop();
          curAns = top.f(top.args.concat([curAns]));
        }
        st[st.length - 1].args.push(curAns);
        curAns = 0;
        break;
      case ')':
        while (st[st.length - 1].pr <= 100) {
          top = st.pop();
          curAns = top.f(top.args.concat([curAns]));
        }
        top = st.pop();
        if (top.fname != '') {
          curAns = this.options.functions[top.fname].apply(this, top.args.concat([curAns]));
        }
        break;
      default:
        curFname += f[i];
        break;
    }
  }
  while (st.length > 0) {
    top = st.pop();
    curAns = top.f.apply(this, top.args.concat([curAns]));
  }
  datar[coln] = curAns;
  return curAns;
};

//
//  URL Hashes
//

window.PaginatedTable.prototype._getPageNFromHash = function() {
  return Number(getHashParam(window.location.href, 'pn')) || 1;
}

window.PaginatedTable.prototype._getSearchStrFromHash = function() {
  var s = getHashParam(window.location.href, 'srch');
  if (s === null) s = '';
  return s;
}

window.PaginatedTable.prototype._putPageNToHash = function(pagen) {
  return;
  if (window.location.hash == '' && pagen == 1) return;

  var newURL;
  if (pagen == 1) {
    newURL = setHashParam(window.location.href, 'pn', null);
  } else {
    newURL = setHashParam(window.location.href, 'pn', pagen);
  }

  updateHashLocation.call(this, newURL);
}

window.PaginatedTable.prototype._putSearchStrToHash = function(s) {
  return;
  if (window.location.hash == '' && s == '') return;

  var newURL;
  if (s === '') {
    newURL = setHashParam(window.location.href, 'srch', null);
  } else {
    newURL = setHashParam(window.location.href, 'srch', s);
  }

  updateHashLocation.call(this, newURL);
}

//
// Search
//

window.PaginatedTable.prototype._initSearchContainer = function(container) {
  if (typeof container == 'string') {
    container = ge(container);
  }
  if (!container) return false;

  hide(container);
  container.className = 'pt_search_container';
  var options = this.options.search;
  var textInput = ce('input', {type: 'text', className: 'text', autocomplete: 'off', placeholder: options.placeholder});
  this.options.search.inputElem = textInput;
  textInput.setAttribute('placeholder', options.placeholder);
  _t = this;

  var onKeyUp = function() {
    _t._onSearchStringChange(textInput.value);
  };

  addEvent(textInput, 'keyup', onKeyUp);
  this.destroy(function() {
    removeEvent(textInput, 'keyup', onKeyUp);
  });
  container.appendChild(textInput);
  container.style.display = 'block';

  // At least for chrome
  setTimeout(function() {
    placeholderSetup(textInput);
  }, 100);
}

// arguments from,to:
//   if set => only rows from 'from' to 'to'-1 incl. will be processed (reprocessed)
window.PaginatedTable.prototype._initSearchHashes = function(from, to) {
  if (!this._innerData) this._innerData = {};
  if (from === undefined || !this._innerData.search) {
    this._innerData.search = {};
  }
  var hd = this._innerData.search;
  var data = this.content.data;
  var col = this.options.search.column;

  var i, j, k, n, curhash;
  var s;
  var words;
  var splitRE = new RegExp(this.options.search.delimiters);
  hd.P = 123239;
  hd.M = 1000000007;
  if (from === undefined || !hd.rowHashes) {
    hd.rowHashes = [];
  }

  if (from === undefined) {
    from = 0;
  }
  if (to === undefined) {
    to = data.length;
  }

  for (i = from; i < to; i++) {
    hd.rowHashes[i] = [];
    words = ('' + data[i][col]).split(splitRE);
    for (j in words) {
      if (words[j] === undefined || !words[j].length) continue;

      s = words[j].toLowerCase();
      n = s.length;
      curhash = 0;
      for (k = 0; k < n; k++) {
        curhash = (curhash * hd.P + s.charCodeAt(k)) % hd.M;
        if (!hd.rowHashes[i][curhash]) {
          hd.rowHashes[i][curhash] = 1;
        } else {
          hd.rowHashes[i][curhash]++;
        }
      }
    }
  }
}

window.PaginatedTable.prototype._onSearchStringChange = function(s) {
  if (s.length > 100) return;
  if (s === this._curSearchString) return;

  this._curSearchString = s;
  this.options.search.inputElem.value = s;

  var data = this.content.data;
  var hd = this._innerData.search;
  if (!hd) {
    this._initSearchHashes();
    hd = this._innerData.search;
  }

  var splitRE = new RegExp(this.options.search.delimiters);
  var qwords = s.split(splitRE);
  var i, j, n, incoeff, curhash;
  var s;
  var f = [];

  for (i = 0; i < data.length; i++) {
    f[i] = 1;
  }

  for (i in qwords) {
    if (qwords[i] === undefined || !qwords[i].length) {
      delete qwords[i];
    }
  }

  for (i in qwords) {
    incoeff = 0;
    s = qwords[i].toLowerCase();
    n = s.length;
    for (j in qwords) {
      if (qwords[j].length <= n && s.substring(0, qwords[j].length) == qwords[j]) {
        incoeff++;
      }
    }

    curhash = 0;
    for (j = 0; j < n; j++) {
      curhash = (curhash * hd.P + s.charCodeAt(j)) % hd.M;
    }

    for (j in f) {
      if (!(hd.rowHashes[j][curhash] >= incoeff)) {
        delete f[j];
      }
    }
  }

  var newFilter;
  if (typeof this._curFilter == 'object') {
    newFilter = [this._curFilter[0], f];
  } else {
    newFilter = [this._curFilter, f];
  }
  this.filtrate(newFilter);
  this._putSearchStrToHash(s);
  this.refreshAll();
}

window.PaginatedTable.prototype._updateValue = function(rown, coln, val) {
  for (var td = this.rowPointers[rown].firstChild; td && td.id != 'cell_' + rown + '_' + coln; td = td.nextSibling) ;
  var shownTd = ge('cell_' + rown + '_' + coln);
  var str;
  if (this.options.columnFormatting && this.options.columnFormatting[coln]) {
    if (this.options.columnFormatting[coln] == 'plain' && shownTd) {
      val = str = shownTd.innerHTML;
    } else {
      str = this._formatData(val, this.options.columnFormatting[coln], rown, coln);
    }
  } else {
    str = val;
  }
  this.content.data[rown][coln] = val;
  td.innerHTML = str;

  if (shownTd) {
    shownTd.innerHTML = str;
  }

  for (var i in this.content.eventListeners[rown][coln]) {
    var opt = this.content.eventListeners[rown][coln][i];
    if (opt) {
      var targetId = opt.target,
          eventName = opt.event,
          fn = eval('(' + opt.listener + ')'),
          globId = this.globalNum;

      storeGlobalPTFunction(fn, globId, rown, coln, i);

      var oldEl = ge(targetId);
      if (oldEl) {
        if (fn) {
          oldEl.setAttribute('on' + eventName, 'invokeGlobalPTFunction(this,' + [globId, rown, coln, i].join(',') + ');');
        } else {
          oldEl.removeAttribute('on' + eventName);
        }
        oldEl.id = '';
      }
      var el = offlineGe(this.rowPointers[rown], targetId);
      if (el) {
        if (fn) {
          el.setAttribute('on' + eventName, 'invokeGlobalPTFunction(this,' + [globId, rown, coln, i].join(',') + ');');
        } else {
          e.removeAttribute('on' + eventName);
        }
      }
      if (oldEl) {
        oldEl.id = targetId;
      }
    }
  }
  this._rowNeedUpdate[rown] = 1;
};

window.PaginatedTable.prototype.toggleCheckbox = function(elem, rown, forceVal, isChained) {
  if (!elem) elem = {className: ''};
  var checked = (forceVal === undefined ? !hasClass(elem, 'on') : forceVal);

  if (rown == undefined) {
    for (var i = 0; i < this.tableSize; i++) {
      var ind = this.permutation[i];
      var isVisible = i >= this.curFrom && i <= this.curTo;

      if (isVisible || !this.options.behaviour.SELECT_ONLY_VISIBLE) {
        this.toggleCheckbox(this.rowPointers[ind].firstChild.firstChild, ind, checked, true);
      }
      if (isVisible) {
        window[checked ? 'addClass' : 'removeClass'](ge('cb_row_' + ind + '_' + this.globalNum), 'on');
      }
    }
    var t1 = ge('total_cb_' + this.globalNum), t2 = ge('total_ft_cb_' + this.globalNum);
    if (t1) window[checked ? 'addClass' : 'removeClass'](t1, 'on');
    if (t2) window[checked ? 'addClass' : 'removeClass'](t2, 'on');

    if (this.options.onCheckboxPick) {
      this.options.onCheckboxPick.apply(this);
    }
    return false;
  }

  this.selection[rown] = checked;
  this._rowNeedUpdate[rown] = 1;
  window[checked ? 'addClass' : 'removeClass'](this.rowPointers[rown].firstChild.firstChild, 'on');
  window[checked ? 'addClass' : 'removeClass'](elem, 'on');

  if (!isChained && this.options.onCheckboxPick) {
    this.options.onCheckboxPick.call(this, rown);
  }
  return false;
};

window.storeGlobalPTFunction = function() {
  var n = arguments.length;
  if (n < 2) return false;

  var fn = arguments[0];
  var i;
  var key;
  var o = cur._globalPTFunctions || (cur._globalPTFunctions = []);
  for (i = 1; i < n - 1; i++) {
    var key = arguments[i];
    if (o[key] === undefined) {
      o[key] = [];
    }
    o = o[key];
  }
  o[arguments[n - 1]] = fn;
  return true;
}

window.invokeGlobalPTFunction = function(el, gid, rown, coln, fid) {
  var updatePT = function(ans) {
    if (!ans || typeof ans != 'object') return;

    if (ans['extra'] && typeof ans['extra'] == 'object') {
      var extobj = {};
      for (var i in ans['extra']) {
        extobj[i] = {};
        extobj[i][rown] = {};
        extobj[i][rown][coln] = null;
      }
      extend(true, pt.content.extra, extobj);
      for (var i in ans['extra']) {
        pt.content.extra[i][rown][coln] = ans['extra'][i];
      }
    }
    if (ans['type'] !== undefined) {
      if (pt.content.types === undefined) pt.content.types = [];
      pt.content.types[rown] = ans['type'];
    }
    if (ans['listeners'] && typeof ans['listeners'] == 'object') {
      //var extobj = {};
      //extobj[rown] = {};
      //extobj[rown][coln] = null;
      //extend(true, pt.content.eventListeners, extobj);
      pt.content.eventListeners[rown][coln] = ans['listeners'];
    }
    var newVal = ans['value'];
    if (newVal === undefined) {
      newVal = pt.content.data[rown][coln];
    }
    pt._updateValue(rown, coln, newVal);
  }

  var fn = false;
  try {
    fn = cur._globalPTFunctions[gid][rown][coln][fid];
  }
  catch (e) {}
  if (!fn) return false;


  var pt = cur._paginatedTables[gid];
  var ans = fn.call(pt, el, updatePT, rown, coln, fid);
  if (typeof ans != 'object' || !ans) {
    return false;
  }

  updatePT(ans);
}

window.PaginatedTable.prototype.destroy = function(f) {
  if (!('destroyList' in this)) {
    this['destroyList'] = [];
  }
  this.destroyList.push(f);
}

window.PaginatedTable.prototype.destructor = function() {
  if ('destroyList' in this) {
    for (var i in this.destroyList) {
      this.destroyList[i]();
    }
  }
  this.container.tableObj = null;
  this.content = null;
  this.options = null;
  this._innerData = null;
  this.rowPointers = null;
  this.rowHTMLs = null;
  this._rowNeedUpdate = null;
  this.container = null;
  this.table = null;
  this.permutation = null;
  this.invmutation = null;
  this.headerPointer = null;
  this.footerPointer = null;
  this.errRowPointer = null;
  this.selection = null;
  this.topControl = null;
  this.bottomControl = null;
}

}
)();

try{stManager.done('paginated_table.js');}catch(e){}
