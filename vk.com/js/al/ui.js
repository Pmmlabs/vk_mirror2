var Ui = {};

Ui.tableSetFilterTerm = function(table, headerCell, filterTerm) {
  filterTerm = trim(filterTerm);
  var currentTerm = headerCell.getAttribute('ui_filter_term');
  if (currentTerm === filterTerm) {
    return false;
  }
  headerCell.setAttribute('ui_filter_term', filterTerm);
  if (filterTerm.length == 0) {
    table.removeAttribute('ui_filter_rows_indices');
    return true;
  } else {
    var filterDataRaw = headerCell.getAttribute('ui_filter_data');
    var filterIndex = parseJSON(headerCell.getAttribute('ui_filter_index'));
    var filterRegexp;
    var filterMatch;
    var rowsMatches;
    var matchesPositions = [];
    var matchPositionIndex = 0;
    var matchesCount = 0;

    filterTerm = filterTerm.replace(/[|]/g, '');
    filterRegexp = new RegExp(filterTerm, 'gi');
    rowsMatches = {};

    while ((filterMatch = filterRegexp.exec(filterDataRaw)) != null) {
      matchesPositions.push(filterMatch.index);
    }

    for (var offset in filterIndex) {
      while (matchPositionIndex < matchesPositions.length) {
        if (matchesPositions[matchPositionIndex] < offset) {
          if (!rowsMatches[filterIndex[offset]]) {
            rowsMatches[filterIndex[offset]] = 1;
            matchesCount++;
          }
          matchPositionIndex++;
        } else {
          break;
        }
      }
      if (matchPositionIndex >= matchesPositions.length) {
        break;
      }
    }

    table.setAttribute('ui_filter_rows_indices', JSON.stringify(rowsMatches));
    return matchesCount;
  }
}

Ui.tableOnclick = function(event, table) {
  var clickTimeBegin = vkNow();

  var event = normEvent(event || window.event);

  var tableHeaderId   = table.getAttribute('ui_table_header_id');
  var tableRowsId     = table.getAttribute('ui_table_rows_id');
  var tableMoreId     = table.getAttribute('ui_table_more_id');
  var tableExcludedId = table.getAttribute('ui_table_excluded_id');
  var tableShowerId   = table.getAttribute('ui_table_shower_id');
  var tableResultId   = table.getAttribute('ui_table_result_id');
  var tablePagesId    = table.getAttribute('ui_table_pages_id');
  var groupKey        = table.getAttribute('ui_group_key');
  var tableHeader     = ge(tableHeaderId);
  var tableRows       = ge(tableRowsId);
  var tableMore       = ge(tableMoreId);
  var tableExcluded   = ge(tableExcludedId);
  var tableShower     = ge(tableShowerId);
  var tableResult     = ge(tableResultId);
  var tablePages      = ge(tablePagesId);

  var elem             = event.target;
  var thElem           = false;
  var tdElem           = false;
  var hiderElem        = false;
  var hiderRowElem     = false;
  var perPageLimitElem = false;
  var pageNumberElem   = false;
  var hiderValue       = 0;

  if (!tableRows) {
    return;
  }

  while (elem) {
    if (elem === table || elem === tableHeader || elem === tableRows || elem === tableMore || elem === tableShower || elem === tableResult || elem === tablePages) {
      break;
    } else if (elem.nodeName === 'TH') {
      thElem = elem;
    } else if (elem.nodeName === 'TD') {
      tdElem = elem;
    } else if (elem.hasAttribute('ui_page_number')) {
      pageNumberElem = elem;
    } else if (elem.hasAttribute('ui_per_page_limit')) {
      perPageLimitElem = elem;
    } else if (elem.hasAttribute(groupKey)) {
      hiderElem = elem;
      hiderValue = Math.abs(intval(elem.getAttribute(groupKey)));
    } else if (hiderElem && elem.nodeName === 'TR') {
      hiderRowElem = elem;
    }
    elem = elem.parentNode;
  }

  if (elem === tableHeader && thElem) {
    Ui.tableUpdateSort(table, tableRows, tableMore, tableExcluded, thElem, true);
  } else if ((elem === tableRows || elem === tableMore || elem === tableResult) && hiderRowElem) {
    Ui.tableUpdateHiderGroup(tableRows, tableMore, hiderRowElem, hiderValue);
  } else if (elem === tableShower && tdElem) {
    Ui.tableUpdateShower(table, tableMore, tableShower, tdElem);
  } else if (elem === tablePages && perPageLimitElem) {
    Ui.tableUpdatePerPageLimit(table, tableHeader, tableRows, tableMore, tableExcluded, perPageLimitElem);
  } else if (elem === tablePages && pageNumberElem) {
    Ui.tableUpdatePageNumber(table, tableHeader, tableRows, tableMore, tableExcluded, pageNumberElem);
  }

  var clickTimeEndJs = vkNow();
  var offsetHeight = document.body.offsetHeight; // Force reflow
  var clickTimeEndReflow = vkNow();
  window.debugLog && debugLog('Table click time JS: ', clickTimeEndJs - clickTimeBegin, ', time with reflow: ', clickTimeEndReflow - clickTimeBegin);
}

Ui.tableOnFilterKeypress = function(event, tableId) {
  var self = event.target;
  if (Ui.tableFilterTimeout) {
    clearTimeout(Ui.tableFilterTimeout);
  }
  Ui.tableFilterTimeout = setTimeout(function () {
    Ui.tableFilterRows(ge(tableId), self.value);
  }, 200);
}

Ui.tableClearRowsSortCache = function(table) {
  if (table.t_rows_sort) {
    delete table.t_rows_sort;
  }
}

Ui.tableGetRowsSort = function(table, tableRows, tableMore, tableExcluded, filterRowsIndices, groupIndices) {
  var emptyFilter = !isObject(filterRowsIndices);
  var rowsSort = table.t_rows_sort;
  if (!rowsSort) {
    var rows;
    var sortIndex;
    var parentRowIndex;
    var scanTable;
    var row;
    rowsSort = [];

    for (var tableIndex = 0; scanTable = [tableRows, tableMore, tableExcluded][tableIndex]; ++tableIndex) {
      rows = scanTable.children;
      for (var i = 0; row = rows[i]; i++) {
        sortIndex = intval(row.getAttribute('ui_sort_index'));
        if (!rowsSort[sortIndex]) {
          rowsSort[sortIndex] = {};
        }
        rowsSort[sortIndex].row = row;
        if (!rowsSort[sortIndex].hasOwnProperty('excludedByFilter')) {
          rowsSort[sortIndex].excludedByFilter = !emptyFilter && !filterRowsIndices[sortIndex];
        }

        if (!emptyFilter && filterRowsIndices[sortIndex] && (sortIndex in groupIndices)) { // if subrow matches, also show parent row
          parentRowIndex = groupIndices[sortIndex];
          if (parentRowIndex) {
            if (!rowsSort[parentRowIndex]) {
              rowsSort[parentRowIndex] = {};
            }
            rowsSort[parentRowIndex].excludedByFilter = false;
          }
        }
      }
    }

    if (Object.defineProperty) {
      Object.defineProperty(table, 't_rows_sort', {configurable: true, writable: true});
      table.t_rows_sort = rowsSort;
    }
  }
  return rowsSort;
}

Ui.tableGetAllIndices = function(table, headerCell) {
  var sortIndicesAsc;
  var sortIndicesDesc;
  var groupIndices;
  var wideIndices;

  groupIndices = table.p_group_indices;
  if (!groupIndices) {
    groupIndices = table.getAttribute('ui_group_indices');
    groupIndices = (groupIndices ? parseJSON(groupIndices) : {});
    if (Object.defineProperty) {
      Object.defineProperty(table, 'p_group_indices', {configurable: true, writable: true});
      table.p_group_indices = groupIndices;
    }
  }

  wideIndices = table.p_wide_indices;
  if (!wideIndices) {
    wideIndices = table.getAttribute('ui_wide_indices');
    wideIndices = (wideIndices ? parseJSON(wideIndices) : {});
    if (Object.defineProperty) {
      Object.defineProperty(table, 'p_wide_indices', {configurable: true, writable: true});
      table.p_wide_indices = wideIndices;
    }
  }

  sortIndicesAsc  = (headerCell ? headerCell.p_sort_indices_asc  : []);
  sortIndicesDesc = (headerCell ? headerCell.p_sort_indices_desc : []);

  if (!sortIndicesAsc) {
    sortIndicesAsc  = headerCell.getAttribute('ui_sort_indices_asc');
    sortIndicesDesc = headerCell.getAttribute('ui_sort_indices_desc');
    if (sortIndicesAsc) {
      sortIndicesAsc  = sortIndicesAsc.split(',');
      sortIndicesDesc = sortIndicesDesc.split(',');
      for (var i in sortIndicesAsc) {
        sortIndicesAsc[i] = intval(sortIndicesAsc[i]);
      }
      for (var i in sortIndicesDesc) {
        sortIndicesDesc[i] = intval(sortIndicesDesc[i]);
      }
    }
  }

  if (!sortIndicesAsc) {
    sortIndicesAsc  = [];
    sortIndicesDesc = [];

    var sortDataRaw = headerCell.getAttribute('ui_sort_data');
    var sortData    = [];
    var groupIndex;
    var groupValue;
    if (!sortDataRaw) {
      return;
    }

    sortDataRaw = sortDataRaw.split('!');

    var sortDataType = sortDataRaw.shift();
    if (sortDataType === 'int') {
      for (var i = 0, len = sortDataRaw.length; i < len; i++) {
        groupIndex = ((i in groupIndices) ? groupIndices[i] : -1);
        groupValue = intval(sortDataRaw[groupIndex]);
        if (wideIndices[i]) {
          sortData[i] = [i, sortData[i - 1][1], sortData[i - 1][2], sortData[i - 1][3], 1];
        } else {
          sortData[i] = [i, intval(sortDataRaw[i]), groupIndex, groupValue, 0];
        }
      }
    } else if (sortDataType === 'float') {
      for (var i = 0, len = sortDataRaw.length; i < len; i++) {
        groupIndex = ((i in groupIndices) ? groupIndices[i] : -1);
        groupValue = floatval(sortDataRaw[groupIndex]);
        if (wideIndices[i]) {
          sortData[i] = [i, sortData[i - 1][1], sortData[i - 1][2], sortData[i - 1][3], 1];
        } else {
          sortData[i] = [i, floatval(sortDataRaw[i]), groupIndex, groupValue, 0];
        }
      }
    } else {
      for (var i = 0, len = sortDataRaw.length; i < len; i++) {
        groupIndex = ((i in groupIndices) ? groupIndices[i] : -1);
        groupValue = sortDataRaw[groupIndex];
        if (wideIndices[i]) {
          sortData[i] = [i, sortData[i - 1][1], sortData[i - 1][2], sortData[i - 1][3], 1];
        } else {
          sortData[i] = [i, sortDataRaw[i], groupIndex, groupValue, 0];
        }
      }
    }

    sortData.sort(sortAsc);
    for (var i = 0, len = sortData.length; i < len; i++) {
      sortIndicesAsc.push(sortData[i][0]);
    }
    sortData.sort(sortDesc);
    for (var i = 0, len = sortData.length; i < len; i++) {
      sortIndicesDesc.push(sortData[i][0]);
    }

    headerCell.setAttribute('ui_sort_indices_asc', sortIndicesAsc.join(','));
    headerCell.setAttribute('ui_sort_indices_desc', sortIndicesDesc.join(','));
    if (Object.defineProperty) {
      Object.defineProperty(headerCell, 'p_sort_indices_asc', {configurable: true, writable: true});
      Object.defineProperty(headerCell, 'p_sort_indices_desc', {configurable: true, writable: true});
      headerCell.p_sort_indices_asc  = sortIndicesAsc;
      headerCell.p_sort_indices_desc = sortIndicesDesc;
    }
  }

  return [sortIndicesAsc, sortIndicesDesc, groupIndices];

  function sortAsc(a, b) {
    if (a[2] < 0 && b[2] < 0) {
      if (a[1] != b[1]) return (a[1] < b[1]) ? -1 : 1;
      if (a[4] || b[4]) return (a[0] < b[0]) ? -2 : 2;
      if (a[0] != b[0]) return (a[0] < b[0]) ? -1 : 1;
    } else if (a[2] >= 0 && b[2] >= 0) {
      if (a[3] != b[3]) return (a[3] < b[3]) ? -1 : 1;
      if (a[2] != b[2]) return (a[2] < b[2]) ? -1 : 1;
      if (a[1] != b[1]) return (a[1] < b[1]) ? -1 : 1;
      if (a[4] || b[4]) return (a[0] < b[0]) ? -2 : 2;
      if (a[0] != b[0]) return (a[0] < b[0]) ? -1 : 1;
    } else if (a[2] >= 0) {
      if (a[3] != b[1]) return (a[3] < b[1]) ? -1 : 1;
      if (b[4]) return 2;
      if (a[2] != b[0]) return (a[2] < b[0]) ? -1 : 1;
      return 2;
    } else if (b[2] >= 0) {
      if (a[1] != b[3]) return (a[1] < b[3]) ? -1 : 1;
      if (a[4]) return -2;
      if (a[0] != b[2]) return (a[0] < b[2]) ? -1 : 1;
      return -2;
    }
    return 0;
  }
  function sortDesc(a, b) {
    result = sortAsc(a, b);
    if (result == 1 || result == -1) {
      result *= -1;
    }
    return result;
  }
}

Ui.tableUpdateEven = function(tableRows, tableMore) {
  var rows;
  var rowIndexEven = 0;
  var isHidden;
  var isWide;
  var className;

  rows = tableRows.children;
  for (var i = 0, row; row = rows[i]; i++) {
    isHidden = hasClass(row, 'unshown');
    isWide   = hasClass(row, 'wide');
    if (isHidden) {
      continue;
    }
    className  = 'ui_table_row';
    className += ((rowIndexEven % 2) ? ' even' : '');
    className += (isWide             ? ' wide' : '');
    row.className = className;
    rowIndexEven++;
    if (isWide) {
      rowIndexEven = 1;
    }
  }

  if (isVisible(tableMore)) {
    rows = tableMore.children;
    for (var i = 0, row; row = rows[i]; i++) {
      isHidden = hasClass(row, 'unshown');
      isWide   = hasClass(row, 'wide');
      if (isHidden) {
        continue;
      }
      className  = 'ui_table_row';
      className += ((rowIndexEven % 2) ? ' even' : '');
      className += (isWide             ? ' wide' : '');
      row.className = className;
      rowIndexEven++;
      if (isWide) {
        rowIndexEven = 1;
      }
    }
  }
}

Ui.tableFilterRows = function(table, term) {
  var tableRowsId        = table.getAttribute('ui_table_rows_id');
  var tableMoreId        = table.getAttribute('ui_table_more_id');
  var tablePagesId       = table.getAttribute('ui_table_pages_id');
  var tableExcludedId    = table.getAttribute('ui_table_excluded_id');
  var tableEmptyFilterId = table.getAttribute('ui_table_empty_filter_id');
  var tableShowerId      = table.getAttribute('ui_table_shower_id');
  var showerEnabled      = parseInt(table.getAttribute('ui_shower_enabled'));
  var tableResultId      = table.getAttribute('ui_table_result_id');
  var tableResult        = ge(tableResultId);
  var tableRows          = ge(tableRowsId);
  var tableMore          = ge(tableMoreId);
  var tableExcluded      = ge(tableExcludedId);
  var tablePages         = ge(tablePagesId);
  var tableEmptyFilter   = ge(tableEmptyFilterId);
  var tableShower        = ge(tableShowerId);
  var header             = geByTag1('thead', table);
  var headerFilterCell   = geByClass1('filterable', header, 'th');
  var sortHeaderCell     = geByClass1('sort', header, 'th');
  var showerCell         = geByClass1('shower', tableShower, 'td');
  var pagesNumbersElem   = geByClass1('ui_table_pages_numbers', tablePages);

  if (!headerFilterCell) {
    return;
  }

  var setFilterResult = Ui.tableSetFilterTerm(table, headerFilterCell, term);
  if (setFilterResult === false) {
    return false;
  } else if (setFilterResult === 0) {
    removeClass(tableEmptyFilter, 'unshown');
    addClass(tableResult, 'unshown');
  } else {
    addClass(tableEmptyFilter, 'unshown');
    removeClass(tableResult, 'unshown');
  }

  Ui.tableClearRowsSortCache(table);
  table.setAttribute('ui_rows_page_number', 0);
  Ui.tableUpdateSort(table, tableRows, tableMore, tableExcluded, sortHeaderCell, false);

  if (showerCell) {
    var showerLess = showerCell.getAttribute('ui_shower_less');
    if (showerEnabled && tableMore.children.length) {
      if (showerLess || tableMore.hasClass(tableMore, 'unshown')) {
        removeClass(tableShower, 'unshown');
      }
    } else {
      addClass(tableShower, 'unshown');
    }
  }

  if (pagesNumbersElem) {
    Ui.tableUpdatePages(table, pagesNumbersElem, 0);
  }
}

Ui.tableUpdateSort = function(table, tableRows, tableMore, tableExcluded, headerCell, changeSortOrder) {
  var tableMoreVisible = !hasClass(tableMore, 'unshown');
  var tableMoreNext = tableMore.nextSibling;
  var allIndices;
  var sortIndices = [];
  var groupIndices;
  var rowsSort;
  var rowsCount;
  var rowsLimit;
  var rowsOffset;
  var filterRowsIndices;

  // Get data
  {
    allIndices = Ui.tableGetAllIndices(table, headerCell);
    if (!allIndices) {
      return;
    }

    groupIndices = allIndices[2];
    filterRowsIndices = parseJSON(table.getAttribute('ui_filter_rows_indices'));
    rowsSort = Ui.tableGetRowsSort(table, tableRows, tableMore, tableExcluded, filterRowsIndices, groupIndices);

    rowsCount  = rowsSort.length;
    rowsLimit  = intval(table.getAttribute('ui_rows_limit'));
    rowsOffset = intval(table.getAttribute('ui_rows_page_number')) * rowsLimit;
  }

  // Detach elements from DOM
  {
    table.removeChild(tableRows);
    table.removeChild(tableMore);

    while (tableRows.firstChild) {
      tableRows.removeChild(tableRows.firstChild);
    }
    while (tableMore.firstChild) {
      tableMore.removeChild(tableMore.firstChild);
    }
  }

  // Choose sorting order
  {
    var sortCurrent  = (headerCell ? hasClass(headerCell, 'sort')    : true);
    var sortReverse  = (headerCell ? hasClass(headerCell, 'reverse') : false);
    var sortOriginal = (headerCell ? intval(headerCell.getAttribute('ui_sort_original')) : 3);

    if (changeSortOrder) {
      if (sortOriginal) {
        sortOriginal = (sortCurrent ? sortOriginal % 3 + 1 : 1);
      }
      sortReverse = (sortCurrent && !sortReverse || !sortCurrent && sortReverse);
    }

    if (sortCurrent && sortOriginal == 3) {
      for (var i = 0; i < rowsCount; i++) {
        sortIndices[i] = i;
      }
    } else if (sortReverse) {
      sortIndices = allIndices[1];
    } else {
      sortIndices = allIndices[0];
    }
  }

  // Modify detached DOM
  {
    var rowsMore = ((!tableMoreVisible && Object.defineProperty && false) ? [] : false);
    var rowsIndexMain = 0;
    var rowIndexEven = false;
    var row;
    var sortIndex;
    var isMain;
    var isHidden;
    var isWide;
    var isExcluded;
    var className;
    var groupId;
    var ensureGroupVisibilities = tableRows.hasAttribute('ui_ensure_group_visibilities') ? parseJSON(tableRows.getAttribute('ui_ensure_group_visibilities')) : {};

    for (var i = 0; i < rowsCount; i++) {
      sortIndex  = sortIndices[i];
      row        = rowsSort[sortIndex].row;
      isMain     = !(sortIndex in groupIndices);
      isHidden   = hasClass(row, 'unshown');
      isWide     = hasClass(row, 'wide');
      isExcluded = rowsSort[sortIndex].excludedByFilter;
      if (!isMain && row.hasAttribute('ui_group')) {
        groupId = groupIndices[sortIndex] + ':' + intval(row.getAttribute('ui_group'));
        isHidden = (groupId in ensureGroupVisibilities) ? ensureGroupVisibilities[groupId] : isHidden;
      }

      className  = 'ui_table_row';
      className += (isHidden           ? ' unshown' : '');
      className += ((rowIndexEven % 2) ? ' even'    : '');
      className += (isWide             ? ' wide'    : '');
      row.className = className;

      if (isExcluded) {
        tableExcluded.appendChild(row);
      } else {
        if (rowsIndexMain < rowsOffset || rowsIndexMain <= rowsOffset && !isMain || rowsLimit && (rowsIndexMain - rowsOffset - 1 >= rowsLimit || rowsIndexMain - rowsOffset >= rowsLimit && isMain)) {
          if (rowsMore) {
            rowsMore.push(row);
          } else {
            tableMore.appendChild(row);
          }
        } else {
          tableRows.appendChild(row);
          if (rowIndexEven === false) {
            rowIndexEven = 0;
          }
        }

        rowsIndexMain += isMain;
        if (rowIndexEven !== false) {
          rowIndexEven += !isHidden;
          if (isWide && !isHidden) {
            rowIndexEven = 1;
          }
        }
      }
    }
    table.setAttribute('ui_main_rows_count', rowsIndexMain);
    tableRows.removeAttribute('ui_ensure_group_visibilities');

    if (rowsMore && rowsMore.length) {
      Object.defineProperty(tableMore, 'p_rows_more', {configurable: true, writable: true});
      tableMore.p_rows_more = rowsMore;
    }
  }

  // Save sorting info
  if (headerCell && changeSortOrder) {
    removeClass(geByClass1('sort', headerCell.parentNode), 'sort');
    if (!sortCurrent || sortOriginal != 3) {
      addClass(headerCell, 'sort');
    }
    if (sortCurrent && sortOriginal != 1) {
      toggleClass(headerCell, 'reverse', sortReverse);
    }
    if (sortOriginal) {
      headerCell.setAttribute('ui_sort_original', sortOriginal);
    }
  }

  // Attach elements to DOM
  {
    table.insertBefore(tableMore, tableMoreNext);
    table.insertBefore(tableRows, tableMore);
  }
}

Ui.tableUpdatePages = function(table, pagesNumbersElem, pageNumberNew) {
  while (pagesNumbersElem.firstChild) {
    pagesNumbersElem.removeChild(pagesNumbersElem.firstChild);
  }

  var mainRowsCount = intval(table.getAttribute('ui_main_rows_count'));
  var rowsLimit     = intval(table.getAttribute('ui_rows_limit'));
  var pagesCount    = (rowsLimit ? Math.ceil(mainRowsCount / rowsLimit) : 1);
  var pageNumberMin = ((pageNumberNew >= 4) ? pageNumberNew - 2 : 0);
  var pageNumberMax = ((pagesCount - pageNumberNew > 4) ? pageNumberNew + 2 : (pagesCount - 1));
  var pageElem;
  var className;

  if (pagesCount == 1) {
    return;
  }

  if (pageNumberMin != 0) {
    className = 'ui_table_page';
    pageElem  = document.createElement('a');
    pageElem.className = className;
    pageElem.setAttribute('ui_page_number', 0);
    pageElem.innerHTML = '«';
    pagesNumbersElem.appendChild(pageElem);
  }
  for (var pageNumber = pageNumberMin; pageNumber <= pageNumberMax; pageNumber++) {
    className  = 'ui_table_page';
    className += ((pageNumber == pageNumberNew) ? ' selected' : '');
    pageElem   = document.createElement('a');
    pageElem.className = className;
    pageElem.setAttribute('ui_page_number', pageNumber);
    pageElem.innerHTML = pageNumber + 1;
    pagesNumbersElem.appendChild(pageElem);
  }
  if (pageNumberMax != pagesCount - 1) {
    className = 'ui_table_page';
    pageElem  = document.createElement('a');
    pageElem.className = className;
    pageElem.setAttribute('ui_page_number', pagesCount - 1);
    pageElem.innerHTML = '»';
    pagesNumbersElem.appendChild(pageElem);
  }
}

Ui.tableUpdatePerPageLimit = function(table, tableHeader, tableRows, tableMore, tableExcluded, perPageLimitElem) {
  if (hasClass(perPageLimitElem, 'selected')) {
    return;
  }
  removeClass(geByClass1('selected', perPageLimitElem.parentNode), 'selected');
  addClass(perPageLimitElem, 'selected');

  table.setAttribute('ui_rows_limit', perPageLimitElem.getAttribute('ui_per_page_limit'));

  var pagesNumbersElem = perPageLimitElem.parentNode.nextSibling;
  if (hasClass(pagesNumbersElem, 'ui_table_pages_numbers')) {
    Ui.tableUpdatePages(table, pagesNumbersElem, 0);
    table.setAttribute('ui_rows_page_number', 0);
  }

  var headerCell = geByClass1('sort', tableHeader, 'th');
  Ui.tableUpdateSort(table, tableRows, tableMore, tableExcluded, headerCell, false);
}

Ui.tableUpdatePageNumber = function(table, tableHeader, tableRows, tableMore, tableExcluded, pageNumberElem) {
  var pageNumberOld = intval(table.getAttribute('ui_rows_page_number'));
  var pageNumberNew = intval(pageNumberElem.getAttribute('ui_page_number'));
  if (pageNumberOld == pageNumberNew) {
    return;
  }
  Ui.tableUpdatePages(table, pageNumberElem.parentNode, pageNumberNew);
  table.setAttribute('ui_rows_page_number', pageNumberNew);

  var headerCell = geByClass1('sort', tableHeader, 'th');
  Ui.tableUpdateSort(table, tableRows, tableMore, tableExcluded, headerCell, false);
}

Ui.tableUpdateShower = function(table, tableMore, tableShower, showerCell) {
  var less = showerCell.getAttribute('ui_shower_less');
  if (less) {
    if (less == 2) {
      scrollToY(Math.max(Math.min(getXY(table)[1] - 10, scrollGetY()), 0), 0);
      showerCell.innerHTML = showerCell.getAttribute('ui_shower_more_text');
      showerCell.setAttribute('ui_shower_less', 1);
      addClass(tableMore, 'unshown');
      return;
    } else {
      showerCell.innerHTML = showerCell.getAttribute('ui_shower_less_text');
      showerCell.setAttribute('ui_shower_less', 2);
      removeClass(tableMore, 'unshown');
    }
  } else {
    addClass(tableShower, 'unshown');
    removeClass(tableMore, 'unshown');
  }

  var rowsMore = tableMore.p_rows_more;
  if (rowsMore && rowsMore.length) {
    var tableMoreNext = tableMore.nextSibling;
    table.removeChild(tableMore);
    for (var i = 0, row; row = rowsMore[i]; i++) {
      tableMore.appendChild(row);
    }
    tableMore.p_rows_more = [];
    table.insertBefore(tableMore, tableMoreNext);
  }
}

Ui.tableUpdateHiderGroup = function(tableRows, tableMore, hiderRow, hiderValue) {
  var hiderHideRow = hiderRow.nextSibling;
  var uiSortIndex = parseInt(hiderRow.getAttribute('ui_sort_index'));
  var groupId;
  var groupVisibility;
  var isWideGroup = false;
  var ensureGroupVisibilities = tableRows.hasAttribute('ui_ensure_group_visibilities') ? parseJSON(tableRows.getAttribute('ui_ensure_group_visibilities')) : {};
  while (hiderHideRow && hiderHideRow.hasAttribute('ui_group')) {
    if (Math.abs(intval(hiderHideRow.getAttribute('ui_group'))) == hiderValue) {
      groupVisibility = toggleClass(hiderHideRow, 'unshown') ? 1 : 0;
      groupId = uiSortIndex + ':' + hiderValue;
      ensureGroupVisibilities[groupId] = groupVisibility;
      isWideGroup = hasClass(hiderHideRow, 'wide');
    } else if (isWideGroup) {
      break;
    }
    hiderHideRow = hiderHideRow.nextSibling;
  }
  tableRows.setAttribute('ui_ensure_group_visibilities', JSON.stringify(ensureGroupVisibilities));
  Ui.tableUpdateEven(tableRows, tableMore);
}

try{stManager.done('ui.js');}catch(e){}
