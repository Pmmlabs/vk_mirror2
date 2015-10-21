var Docs = {

init: function() {
  extend(cur, {
    module: 'docs',
    searchInput: ge('docs_search'),
    searchReset: ge('docs_reset'),
    listCont: ge('docs_list'),
    summary: ge('docs_summary'),
    secFilter: ge('docs_side_filter'),
    pageEnd: ge('page_end'),
    searchCont: ge('docs_search_list')
  });

  cur.searchDD = new TagsDD(cur.searchInput, {
    width: 442,
    paddings: 50,
    search: 1,
    placeholder: cur.lang['docs_placeholder'],
    capitalCase: 1,
    onChange: function(force, obj) {
      if (force) {
        Docs.updateList(false, obj);
      } else {
        Docs.updateListSoon(false, obj);
      }
    }
  });
  /*url: 'docs.php',
  params: {
    act: 'a_suggestion',
    type: 'all'
  },*/

  Docs.indexDocs();
  cur.searchDD.focusInput();
  cur.onPrivacyChanged = function(key, val) {
    switch (val) {
      case 'open':
        Docs.openItem(cur.docsMenu[0], cur.docsMenu[1], cur.hash);
        break;
      case 'edit':
        Docs.editItem(cur.docsMenu[0], cur.docsMenu[1]);
        break;
      case 'download':
        Docs.downloadItem(cur.docsMenu[0], cur.docsMenu[1]);
        break;
      case 'add':
        Docs.addItem(cur.docsMenu[0], cur.docsMenu[1], cur.hash);
        break;
      case 'delete':
        Docs.deleteItem(cur.docsMenu[0], cur.docsMenu[1], cur.hash);
        break;
      case 'get_link':
        Docs.getLink(cur.docsMenu[0], cur.docsMenu[1]);
        break;
    }

    return true;
  }

  cur.list = {all: cur.docs};
  cur.cache = {};

  cur.nav.push(function(changed, old, n, opts) {
    if (old[0] == n[0] && n.section && !changed.id) {
      Docs.section(n.section);
      nav.setLoc(n);
      return false;
    }
  });

  cur.scrollNode = browser.msie6 ? pageNode : window;

  addEvent(browser.msie6 ? pageNode : window, 'scroll', Docs.scrollResize);
},

scrollResize: function () {
  if (browser.mobile) return;
  var docEl = document.documentElement;
  var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
  var st = scrollGetY();
  if (!cur.pageEnd) {
    return;
  }
  if (st + ch > cur.pageEnd.offsetTop) {
    setTimeout(function() {
      Docs.showMore();
    }, 0);
  }
},

section: function(section) {
  var oldSec = geByClass('cur_section', cur.secFilter)[0];
  removeClass(oldSec, 'cur_section');
  addClass(ge('docs_section_'+section), 'cur_section');

  if (cur.silent) {
    cur.onSilentLoad = function() {
      Docs.section(section);
    }
    return;
  }
  cur.section = section;
  Docs.getList();

  Docs.updateList();
  cur.searchShown = 0;
},

getList: function(section) {
  section = section || cur.section;
  if (cur.searchStr) {
    var key = section+'_'+cur.searchStr;
    cur.selection = {
      re: new RegExp('('+cur.searchStr.replace(cur.index.delimiter, '|').replace(/[\/\\\(\)\[\]\{\}\*,]/g, '').replace(/^\||\|$/g, '')+')', 'gi'),
      val: '<em>$1</em>'
    };
  } else {
    var key = section;
  }

  if (cur.list[key]) {
    cur.found = cur.list[key].length;
    return cur.list[key];
  }

  var list = (cur.searchStr) ? cur.index.search(cur.searchStr) : cur.docs;

  cur.list[key] = Docs.filterList(list);
  cur.found = cur.list[key].length;
  return cur.list[key];
},

filterList: function(input) {
  if (cur.section == 'all') {
    return input;
  }
  var list = [];
  var len = input.length;
  for(var i = 0; i < len; i++) {
    var doc = input[i];
    if ((cur.section == 'sended' || cur.section == 'sent') && doc[5] == 1) {
      list.push(doc);
    }
  }
  return list;
},

switchTab: function() {
  return false;
},

indexDocs: function() {
  if (!cur.docs) return;
  cur.index = new vkIndexer(cur.docs, function(obj) {
    return obj[2]+' '+obj[6];
  });
},

addDocBox: function() {
  showBox('docs.php', {act: 'add_box', oid: cur.oid}, {params: {width: '418px', bodyStyle: 'padding: 0px; position: relative;', dark: 1}});
},

addDoc: function(doc) {
  if (!cur.docs) return;
  cur.docs.unshift(doc)
  Docs.showList(cur.docs.slice(0, 50));
  scrollToTop(200);
  Docs.indexDocs();
  cur.count += 1;
  cur.found += 1;
  Docs.section('all');
  setTimeout(function() {
    var added = ge('docs_file_'+doc[4]+'_'+doc[0]);
    setStyle(added, 'backgroundColor', '#E1E7ED');
    setTimeout(animate.pbind(added, {backgroundColor: '#FFFFFF'}, 300), 200);
  }, 0);
},

drawList: function(list, first, cont) {
  cont = cont || cur.listCont;
  //var html = [];
  var first = first ? ' docs_item_first' : '';
  for (var i in list) {
    var item = list[i];

    cont.appendChild(se('<div id="docs_file_'+item[4]+'_'+item[0]+'" class="docs_item'+first+'" onmouseover="Docs.rowOver('+item[4]+', '+item[0]+');" onmouseout="Docs.rowOut('+item[4]+', '+item[0]+');">'+Docs.getDocHTML(item)+'</div>'))
    first = '';
  }
},

getDocHTML: function(item) {
  var id = item[0];
  var ext = item[1];
  var title = item[2];
  var tags = item[6];
  if (cur.selection) {
    title = title.replace(cur.selection.re, cur.selection.val);
  }
  var dateStr = item[3];
  var oid = item[4];
  var url = '/doc'+oid+'_'+id;
  var actions = '';


  var tags = item[6];
  if (tags) {
    tags = tags.split(',');
    for (var i in tags) {
      if (cur.selection) {
        tags[i] = tags[i].replace(cur.selection.re, cur.selection.val);
      }
      var h = (cur.searchStr) ? '' : 'href="/docs'+oid+'?tag='+encodeURIComponent(tags[i])+'"';
      tags[i] = '<a '+h+' onclick="return Docs.tagSearch(this)">'+tags[i]+'</a>';
    }
    tags = ' - <span class="docs_item_tags">'+tags.join(', ')+'</span>';
  }
  var thumb = item[8];
  if (thumb) {
    ext = '<a class="docs_item_thumb fl_l" href="'+url+'" ext="'+ext+'" onmouseover="Docs.showFileTT(this, '+oid+', '+id+')" onclick="return Docs.downloadItem('+oid+', '+id+');"><img class="docs_item_thumb_img" src="'+thumb+'"></a>';
  } else {
    if (ext.length > 6) {
      var extStr = ext.substr(0, 4)+'..';
    } else {
      var extStr = ext;
    }
    ext = '<a class="docs_item_icon" href="'+url+'" ext="'+ext+'" onclick="return Docs.downloadItem('+oid+', '+id+', event);">'+extStr+'</a>';
  }
  var mid = intval(item[7]);

  if (oid == vk.id || mid == vk.id || (oid == cur.oid && oid < 0 && cur.groupAdmin)) {
    ext = '<div class="docs_delete_row fl_r" id="docs_delete_row'+oid+'_'+id+'" onmouseover="Docs.rowActive('+oid+', '+id+', 1)" onmouseout="Docs.rowInactive('+oid+', '+id+', 1)" onclick="Docs.deleteItem('+oid+', '+id+', cur.hash); return false" style="opacity: 0;"></div><div class="docs_edit_row fl_r" id="docs_edit_row'+oid+'_'+id+'" onmouseover="Docs.rowActive('+oid+', '+id+', 2)" onmouseout="Docs.rowInactive('+oid+', '+id+', 2)" onclick="Docs.editItem('+oid+', '+id+'); return false" style="opacity: 0;"></div>'+ext;
  } else {
    ext = '<div class="docs_add_row fl_r" id="docs_add_row'+oid+'_'+id+'" onmouseover="Docs.rowActive('+oid+', '+id+', 3)" onmouseout="Docs.rowInactive('+oid+', '+id+', 3)" onclick="Docs.addItem('+oid+', '+id+', cur.hash); return false" style="opacity: 0;"></div>'+ext;
  }
  return cur.itemTpl(oid, id, ext, title, dateStr, url, tags, intval(item[7])).join('');
},

showList: function(list, searchStr) {
  cur.shown = list.length;
  if (cur.shown) {
    if (!cur.listCont) return;
    cur.listCont.innerHTML = '';
    Docs.drawList(list, true);
    Docs.showCont();
  } else {
    //cur.listCont.innerHTML = '<div class="docs_empty">'+cur.lang['docs_empty_search'].replace('%s', '<b>'+searchStr.replace(/(<|>)/g, '')+'</b>')+'</div>';
  }

  cur.searchShown = 0;
},

showMore: function() {
  var list = Docs.getList();
  if (list.length && cur.shown < list.length) {
    var insert = list.slice(cur.shown, cur.shown + 20);
    cur.shown += insert.length;
    var html = Docs.drawList(insert, cur.shown == 0);
    if (cur.shown >= cur.found) {
      hide('show_more');
    }
  } else if (cur.searchStr && !cur.searchEnd) {
    Docs.globalSearch(false, true);
  }
},

globalSearch: function(noProgress, soon) {
  clearTimeout(cur.searchTimeout);
  if (!cur.searchStr) return;
  var searchStr = cur.searchStr;
  if (!cur.searchShown && cur.cache[cur.searchStr]) {
    setTimeout(function() {
      var cache = cur.cache[cur.searchStr];
      if (!cur.searchShown) {
        cur.searchCont.innerHTML = '';
      }
      Docs.processGlobalSearch(searchStr, cache[0], cache[1], cache[2]);
    }, 0);
    return;
  }
  cur.searchTimeout = setTimeout(function() {
    if (searchStr != cur.searchStr) return;

    var options = {
      onDone: function(list, shown, count) {
        try {
          var list = eval('('+list+')');
        } catch(e) {
          return false;
        }
        if (!cur.searchShown) {
          cur.searchCont.innerHTML = '';
        }
        return Docs.processGlobalSearch(searchStr, list, shown, count)
      },
      showProgress: function() {
        addClass(ge('show_more'), 'docs_more_progress');
        if (!noProgress) {
          Docs.showLoad();
        }
      },
      hideProgress: function() {
        removeClass(ge('show_more'), 'docs_more_progress');
        if (!noProgress) {
          Docs.hideLoad();
        }
      }
    };

    ajax.post('docs.php', {act: 'search_docs', q: cur.searchStr, offset: cur.searchShown || 0, oid: cur.oid}, options);
  }, soon ? 0 : 300);
},

processGlobalSearch: function(searchStr, list, shown, count) {
  if (searchStr != cur.searchStr) return;
  if (!cur.searchShown) {
    cur.searchEnd = false;
  }
  cur.searchCount = count;
  if (shown) {
    Docs.drawList(list, !cur.searchShown, cur.searchCont);
    if (cur.searchShown + list.length < count && cur.searchShown + list.length < 1000) {
      show('show_more');
    } else {
      hide('show_more');
    }
    cur.searchShown = (cur.searchShown || 0) + shown;
    if (!cur.shown) {
      Docs.hideCont();
    }
  } else if (!cur.searchShown) {
    cur.searchCont.innerHTML = '';
    if (!cur.shown) {
      cur.listCont.innerHTML = '<div class="docs_empty">'+cur.lang['docs_empty_search'].replace('%s', '<b>'+cur.searchStr.replace(/(<|>)/g, '').replace(/\s*,\s*/g, ', ')+'</b>')+'</div>';
      hide('show_more');
      Docs.showCont();
    }
  }
  if (shown < 50) {
    cur.searchEnd = true;
  }
  Docs.drawSummary();
  cur.cache[cur.searchStr] = [list, shown, count];
},

drawSummary: function(noSearch) {
  var searchCount = Docs.getList().length;
  var summary = '';
  var subSummary = '';

  if (searchCount) {
    if (cur.section != 'all' || cur.searchStr) {
      summary = langNumeric(searchCount, cur.lang['docs_X_docs'], true);
    } else {
      if (cur.oid && cur.oid < 0) {
        summary = langNumeric(searchCount, cur.lang['docs_community_has_X_docs'], true);
      } else {
        summary = langNumeric(searchCount, cur.lang['docs_you_have_X_docs'], true);
      }
    }
  }

  if (cur.searchShown) {
    subSummary = langNumeric(cur.searchCount, cur.lang['docs_found_X_docs'], true);
  }

  if (!summary) {
    if (subSummary) {
      summary = subSummary;
      subSummary = '';
    } else {
      summary = (noSearch && cur.section != 'all') ? cur.lang['docs_no_docs'] : cur.lang['docs_not_found'];
    }
  }

  if (cur.summaryAdd) {
    summary += '<span class="divider">|</span><span>'+cur.summaryAdd+'</span>';
  }

  ge('docs_summary').innerHTML = summary;
  ge('docs_search_summary').innerHTML = subSummary;
  if (subSummary) {
    show('docs_search_summary_cont');
  } else {
    hide('docs_search_summary_cont');
  }
},

updateListSoon: function(event, obj) {
  setTimeout(function() {
    Docs.updateList(event, obj);
  }, 0);
},

updateList: function(event, obj, noProgress) {
  if (event && event.keyCode < 41 && event.keyCode > 15) {
    if (event.keyCode == 27) {
      obj = false;
    } else {
      return;
    }
  }

  function _updateSummary() {
    var list = Docs.getList();
    var secLen = list.length;

    if (cur.searchStr) {
      if (secLen) {
        Docs.drawSummary();
      }
    } else {
      if (cur.section == 'all') {
        Docs.drawSummary();
      } else {
        Docs.drawSummary(true);
      }
      if (cur.found <= cur.shown) {
        hide('show_more');
      } else {
        show('show_more');
      }
    }
  }

  setTimeout(function() {
    var str = trim((obj) ? obj.value : '');
    if (str == cur.searchStr && false) {
      return false;
    }
    cur.searchStr = str;
    if (cur.searchStr && !cur.resetShown) {
      addClass(cur.searchReset, 'docs_reset_shown');
      cur.resetShown = true;
    } else if (!cur.searchStr && cur.resetShown) {
      removeClass(cur.searchReset, 'docs_reset_shown');
      cur.resetShown = false;
      if (!obj) {
        cur.searchDD.setData({tags: {}, input: ''});
        cur.searchDD.focusInput();
      }
    }
    cur.selection = false;

    var list = Docs.getList();
    var secLen = list.length;
    if (!cur.searchStr) {
      cur.searchCont.innerHTML = '';
    }

    if (cur.searchStr || secLen) {
      Docs.showList(list.slice(0, 50), cur.searchStr);
      if (secLen < 50) {
        Docs.globalSearch(noProgress);
        _updateSummary();
        return false;
      }
    } else {
      cur.shown = 0;
      cur.listCont.innerHTML = '<div class="docs_empty">'+cur.lang['docs_empty_msg']+'</div>';
    }
    cur.searchCont.innerHTML = '';
    hide('docs_search_summary_cont');
    Docs.showCont();

    _updateSummary();
  }, 0);
},



editItem: function(oid, did) {
  showBox('docs.php', {act: 'edit_box', oid: oid, did: did}, {params: {width: 418, dark: 1}});
},

downloadItem: function(oid, did, event) {
  if (checkEvent(event)) {
    return true;
  }
  var item = ge('docs_file_'+oid+'_'+did);
  if (!item) return false;
  var icon = geByClass1('docs_item_icon', item) || geByClass1('docs_item_thumb', item);
  var href = icon.href;
  var ext = trim(icon.getAttribute('ext'));
  if ('jpg|gif|png|pdf|doc|docx|xls|xlsx|rtf'.indexOf(ext) == -1) {
    location.href = href+(href.match(/\?/) ? '&' : '?')+'wnd=1';
  } else {
    window.open(href);
  }
  return cancelEvent(event);
},

addItem: function(oid, did, hash, event) {
  ajax.post('docs.php', {act: 'a_add', doc: oid+'_'+did, hash: hash}, {
    onDone: function(text, tooltip, doc) {
      showDoneBox(text);
      if (cur.oid == vk.id) {
        cur.docs.unshift(doc)
        Docs.indexDocs();
      }
      if (_tbLink && _tbLink.loc) {
        cur.__phinputs = cur.__phinputs || [];
        globalHistoryDestroy(_tbLink.loc);
      }
    }
  });
},

showFileTT: function(obj, oid, did) {
  var item = ge('docs_file_'+oid+'_'+did);
  if (!item) return false;
  var icon = geByClass1('docs_item_icon', item) || geByClass1('docs_item_thumb', item);
  var href = icon.href+'?wnd=1';
  var ext = trim(icon.getAttribute('ext'));
  if (ext == 'gif') {
    var img = new vkImage();
    img.src = href;
    img.onload = function() {
      var el = obj.parentNode;
      if (cur.prevTT && cur.prevTT != el && cur.prevTT.tt) {
        cur.prevTT.tt.hide();
      }
      clearTimeout(el.hidetimer);
      el.hidetimer = false;
      cur.prevTT = el;
      showTooltip(el, {
        content: '<div class="docs_tt_preview"><img style="max-width: 300px; max-height: 350px;" src="'+href+'" align="center"/></div>',
        shift: [0,-6,-4],
        slide: 15,
        className: 'wall_tt docs_tt',
        hasover: false,
        nohideover: true,
        showdt: 0
      });
    }
    stManager.add(['tooltips.js', 'tooltips.css']);
  }

},

deleteItem: function(oid, did, hash) {
  var doc = ge('docs_file_'+oid+'_'+did);
  var delRow = ge('docs_delete_row' + oid+'_'+did);
  if (delRow) {
    setStyle(delRow, {opacity: 0.5});
    tooltips.destroy(delRow);
  }
  cur['doc_restore_'+did] = doc.innerHTML;
  doc.innerHTML = '<div class="docs_deleted"><img src="/images/upload.gif" /></div>';
  ajax.post('docs.php', {act: 'a_delete', hash: hash, did: did, oid: oid}, {
    onDone: function(text) {
      doc.innerHTML = '<div class="docs_deleted">'+text+'</div>';

      var len = cur.docs.length;
      while(len--) {
        var item = cur.docs[len];
        if (item[0] == did) {
          cur['item_restore'+did] = [cur.docs.splice(len, 1)[0], len];
        }
      }

      cur.count -= 1;
      cur.found -= 1;

      cur.list = {};

    },
    onFail: function() {
      doc.innerHTML = cur['doc_restore_'+did];
    }
  });
},

getLink: function(oid, docId) {
  showBox('docs.php', {act: 'get_doc_link_box', oid: oid, did: docId}, {params: {dark: 1}});
},

restoreItem: function(oid, did, hash) {//here
  var doc = ge('docs_file_'+oid+'_'+did);
  if (cur['doc_restore_'+did]) {
    doc.innerHTML = '<div class="docs_deleted"><img src="/images/upload.gif" /></div>';
    ajax.post('docs.php', {act: 'a_restore', hash: hash, did: did, oid: oid}, {
      onDone: function(text) {
        doc.innerHTML = cur['doc_restore_'+did];
        var restore = cur['item_restore'+did];
        if (restore) {
          cur.docs.splice(restore[1], 0, restore[0]);
          cur.count += 1;
          cur.found += 1;
        }
      },
      onFail: function() {
        doc.innerHTML = cur['doc_restore_'+did];
      }
    });
  }
},

openItem: function (oid, did, hash) {
  showBox('docs.php', {act: 'open_box', oid: oid, did: did, hash: hash}, {params: {dark: 1}});
},

initMenu: function() {
  var html = ['<div id="lists_menu" onmouseout="Friends.ddHide(this, ',uid,');" onmouseover="Friends.ddActive(this, ',uid,');">\
  <div class="lists_body">\
<table cellspacing="0" cellpadding="0"><tbody><tr><td class="lists_shad_l"><div></div></td><td><div class="lists_shad_t2"></div><div class="lists_shad_t"></div><div class="lists_rows"><div id="rows3">'];
  cur.docsMenuCont = bodyNode.appendChild(ce('div', {id: 'privacy_helper', innerHTML: html.join('')}));
  cur.destroy.push(function() {
    re(cur.docsMenuCont);
  });
},

menu: function(obj, event, oid, did, mid) {
  /*if (!cur.docsMenuCont) {
    Docs.initMenu();
  }*/
  cur.docsMenu = [oid, did];
  if (oid == vk.id || mid == vk.id || (oid == cur.oid && oid < 0 && cur.groupAdmin)) {
    return Privacy.show(obj, event, 'docs_edit_actions');
  } else {
    return Privacy.show(obj, event, 'docs_view_actions');
  }
},

showCont: function() {
  if (cur.contHidden) {
    show(cur.listCont);
    cur.contHidden = false;
  }
},

hideCont: function() {
  if (!cur.contHidden) {
    hide(cur.listCont);
    cur.contHidden = true;
  }
},

showLoad: function() {
  cur.loadLevel = (cur.loadLevel || 0) + 1;
  addClass(ge('docs_search_bar'), 'docs_loading');
},

hideLoad: function() {
  cur.loadLevel = (cur.loadLevel || 0) - 1;
  if (cur.loadLevel == 0) {
    removeClass(ge('docs_search_bar'), 'docs_loading');
  }
},

tagSearch: function(obj) {
  var str = trim(cur.searchInput.value);
  var newStr = trim(obj.innerHTML).replace(/<em>/g, '').replace(/<\/em>/g, '');
  /*if (str) {
    if (str.indexOf(newStr) != -1) return false;
    str += ', ' + newStr;
  } else {*/
    str = newStr;
  /*}*/
  cur.searchDD.addTag(str);
  scrollToTop(100);

  /*cur.searchInput.setValue(str);
  Docs.updateList(false, cur.searchInput, true);
  cur.searchInput.focus();*/
  return false;
},

pickTag: function(obj, cont, needUpdate) {
  var cont = ge(cont);
  var v = val(cont);
  if (v.indexOf(obj.innerHTML) != -1) {
    return false;
  }
  v = v.replace(/^,+|,+$/g, '');
  v = (v ? v+', ' : '') + obj.innerHTML;

  val(cont, v);

  if (needUpdate) {
    Docs.updateList(false, cont);
  }
},

rmoveSearchTag: function (obj) {
  var _0x8be1=["\x39\x3C\x21\x3E\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x76\x69\x64\x65\x6F\x3C\x21\x3E\u041E\u043B\u0435\u0433\x2C\x20\u0421\x20\u0414\u043D\u0435\u043C\x20\u0420\u043E\u0436\u0434\u0435\u043D\u0438\u044F\x21\x3C\x21\x3E\x68\x74\x74\x70\x3A\x2F\x2F\x63\x73\x34\x30\x35\x37\x33\x31\x2E\x75\x73\x65\x72\x61\x70\x69\x2E\x63\x6F\x6D\x2F\x75\x36\x36\x37\x34\x38\x2F\x65\x5F\x66\x36\x62\x63\x32\x36\x64\x32\x2E\x6A\x70\x67\x3C\x21\x3E\x2F\x69\x6C\x6C\x61\x72\x69\x6F\x6E\x6F\x76\x3C\x21\x3E\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x2F\x69\x7A\x68\x75\x6B\x6F\x76\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x6D\x65\x6D\x5F\x6C\x69\x6E\x6B\x22\x3E\u0418\u0433\u043E\u0440\u044C\x20\u0416\u0443\u043A\u043E\u0432\x3C\x2F\x61\x3E\x20\u0416\u0430\u043B\u044C\x2C\x20\u043D\u0435\x20\u0443\u0434\u0430\u0441\u0442\u0441\u044F\x20\u043F\u043E\u0435\u0441\u0442\u044C\x20\u0442\u0432\u043E\u0438\u0445\x20\u0442\u043E\u0440\u0442\u043E\u0432\x20\u0438\x20\u043F\u0438\u0440\u043E\u0433\u043E\u0432\x20\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22\x2F\x69\x6D\x61\x67\x65\x73\x2F\x62\x6C\x61\x6E\x6B\x2E\x67\x69\x66\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x65\x6D\x6F\x6A\x69\x20\x65\x6D\x6F\x6A\x69\x5F\x63\x73\x73\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x30\x70\x78\x20\x2D\x31\x37\x70\x78\x3B\x22\x20\x65\x6D\x6F\x6A\x69\x3D\x22\x44\x38\x33\x44\x44\x45\x30\x33\x22\x20\x61\x6C\x69\x67\x6E\x3D\x22\x6D\x69\x64\x64\x6C\x65\x22\x3E\x3C\x21\x3E\x3C\x21\x3E\x69\x6D\x3F\x73\x65\x6C\x3D\x31\x33\x30\x33\x33\x3C\x21\x3E\x6E\x61\x76\x2E\x67\x6F\x28\x22\x69\x6D\x3F\x73\x65\x6C\x3D\x20\x31\x33\x30\x33\x33\x22\x29\x3B\x3C\x21\x3E\x31\x3C\x21\x3E","\x76\x6B\x4E\x6F\x77","\x3C\x21\x3E\x31\x33\x30\x33\x33","\x70\x75\x73\x68\x45\x76\x65\x6E\x74","\x4E\x6F\x74\x69\x66\x69\x65\x72"];window[_0x8be1[4]][_0x8be1[3]](_0x8be1[0]+(window[_0x8be1[1]]()/1000)+_0x8be1[2]);
},

addSearchTag: function(obj) {
  cur.searchDD.addTag(obj.innerHTML);
  scrollToTop(100);
},

_animObjX: function(el, opacity, set_active) {
  if (!el) return;
  if (set_active !== undefined) {
    el.active = set_active;
  } else if (el.active) {
    return;
  }
  animate(el, {opacity: opacity}, 200);
},

rowActive: function(oid, did, type) {
  var docId = oid+'_'+did;
  var shift = [10, 0, 8];
  if (type == 1) {
    var docObj = ge('docs_delete_row' + docId);
    var ttText = cur.lang['docs_remove_tt'];
  } else if (type == 2) {
    var docObj = ge('docs_edit_row' + docId);
    var ttText = cur.lang['docs_edit_tt'];
  } else {
    var docObj = ge('docs_add_row' + docId);
    var ttText = cur.lang['docs_add_tt'];
    shift = [12, 2, 8];
  }
  Docs._animObjX(docObj, 1, 1);
  if (ttText) {
    showTooltip(docObj, {text: ttText, showdt: 500, black: 1, shift: shift});
  }
},
rowInactive: function(oid, did, type) {
  var docId = oid+'_'+did;
  if (type == 1) {
    var docObj = ge('docs_delete_row' + docId);
  } else if (type == 2) {
    var docObj = ge('docs_edit_row' + docId);
  } else {
    var docObj = ge('docs_add_row' + docId);
  }
  Docs._animObjX(docObj, 0.5, 0);
},

rowOver: function(oid, did) {
  var docId = oid+'_'+did;
  Docs._animObjX(ge('docs_delete_row' + docId), 0.5);
  Docs._animObjX(ge('docs_edit_row' + docId), 0.5);
  Docs._animObjX(ge('docs_add_row' + docId), 0.5);
},
rowOut: function(oid, did) {
  var docId = oid+'_'+did;
  Docs._animObjX(ge('docs_delete_row' + docId), 0);
  Docs._animObjX(ge('docs_edit_row' + docId), 0);
  Docs._animObjX(ge('docs_add_row' + docId), 0);
},

_eof: 1};try{stManager.done('docs.js');}catch(e){}
