var Privacy = {
  flistBox: function (box, friendsData, selectedFriends, rowTemplate, saveLang, hash) {
    cur.flistTpl = rowTemplate;
    if (selectedFriends.length === 0) selectedFriends = {};

    cur.flistList = cur.flistFriends = friendsData;
    cur.flistSelected = selectedFriends;

    cur.flistIndex = new vkIndexer(friendsData, function(obj) {
      return obj[1]+' '+obj[4];
    });

    box.removeButtons();

    if (cur.flistTooltip) {
      if (cur.flistTooltipRight) {
        var hintLeft = '<td class="priv_h_arrow_td" style="vertical-align: top;"><div class="priv_h_arrow" style="margin-top: 50px;"><img src="/images/ddtooltip'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png" width="16" height="11" class="priv_h_arrow_img png" /></div></td>';
        var hintRight = '';
      } else {
        var hintRight = '<td class="priv_h_arrow_td" style="vertical-align: top;"><div class="priv_h_arrow_l" style="margin-top: 50px;"><img src="/images/ddtooltip'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png" width="16" height="11" class="priv_h_arrow_img png" /></div></td>';
        var hintLeft = '';
      }


      var ttHelper = ge('flist_helper');
      ttHelper.appendChild(ce('div', {
        innerHTML: '<table cellspacing="0" cellpadding="0">\
  <tr class="priv_h_top_sh">\
    <td></td>\
    <td colspan="5"><div class="priv_h_bottom2"></div></td>\
  </tr>\
  <tr class="priv_h_top_sh">\
    <td></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td colspan="3"><div class="priv_h_bottom"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
  </tr>\
  <tr>\
    '+hintLeft+'\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td class="priv_h_side_td"><div class="priv_h_side"></div></td>\
    <td><div class="priv_h_rows flist_info_text" style="width: 179px;">'+cur.flistTooltip+'</div></td>\
    <td class="priv_h_side_td"><div class="priv_h_side"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    '+hintRight+'\
  </tr>\
  <tr class="priv_h_bottom_sh">\
    <td></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td colspan="3"><div class="priv_h_bottom"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
  </tr>\
  <tr class="priv_h_bottom_sh">\
    <td></td>\
    <td colspan="5"><div class="priv_h_bottom2"></div></td>\
  </tr>\
</table>'
      }));
      if (cur.flistTooltipRight) {
        ttHelper.style.marginLeft = '510px';
        animate(ttHelper, {opacity: 1, marginLeft: 538}, 200);
      } else {
        animate(ttHelper, {opacity: 1, marginLeft: -228}, 200);
      }
    } else {
      box.addButton(getLang('global_cancel'), function () {
        box.hide();
      }, 'no');
    }
    box.addButton(saveLang || getLang('global_save'), function () {
      var listName = ge('flist_list_name');
      var listStr = false;
      if (isVisible(listName)) {
        listStr = listName.value;
        if (!listStr) {
          return notaBene(listName);
        }
        placeholderSetup(listName, {back: true});
        elfocus(listName, 0, listName.value.length);
      }
      var list = {}, ids = [];
      each (friendsData, function () {
        if (cur.flistSelected[this[0]]) {
          list[this[0]] = this;
          ids.push(this[0]);
        }
      });
      if (cur.flistFriendsPrivacy) {
        ajax.post('al_settings.php', {act: 'hide_friends', hash: hash, ids: ids.join(',')}, {
          onDone: function(control, rules) {
            showDoneBox(cur.flistFriendsPrivacyText);
            box.hide();
          },
          showProgress: box.showProgress,
          hiderogress: box.hideProgress
        });
        showDoneBox(cur.flistFriendsPrivacyText, {out: 4000});
        if (cur.flistNavReload) setTimeout(function() {nav.reload();}, 2000);
        return;
      }

      if (cur.onFlistSave) {
        cur.onFlistSave(ids, list, hash, listStr);
      }

      if (!box.leaveOnSave) {
        box.hide();
      }
    });

    var rInner = ge('flist_right_inner');
    var rCol = ge('flist_right_col');
    var rHeight = getSize(rInner)[1];
    var rColHeight = getSize(rCol)[1];
    cur.flistScrollbar = new Scrollbar('flist_scroll_wrap', {
      nomargin: true,
      right: vk.rtl ? 'auto' : 0,
      left: !vk.rtl ? 'auto' : 0,
      more: Privacy.flistMore,
      onScroll: function(delta) {
        rCol.scrollTop -= delta;
      },
      wheelObj: ge('flist_cont')
    });
    addEvent(rCol, 'mousewheel DOMMouseScroll', cur.flistScrollbar.wheel.bind(cur.flistScrollbar));

    cur.flistAllCont = ge('flist_all_list');
    cur.flistSelCont = ge('flist_sel_list');
    cur.flistSearchEl = ge('flist_search');

    if (cur.flistLimit && cur.flistSelectedCnt >= (cur.flistLimit - 1)) {
      Privacy.flistFull();
    }

    if (cur.flistCountStr && cur.flistSelectedCnt > 0) {
      ge('flist_sel_summary').innerHTML = langNumeric(cur.flistSelectedCnt, cur.flistCountStr);
    }


    return false;
  },
  flistMore: function() {
    var lim = cur.flistShown + 60;
    while(cur.flistShown < lim && Privacy.flistShowOne(cur.flistList[cur.flistShown + 1])) {
      ++cur.flistShown;
    }
    setTimeout(function() {
      cur.flistScrollbar.update();
    }, 10);
  },
  flistShowOne: function(u, ins) {
    if (!u) return false;
    if (ge('flist_sel_cell' + u[0])) {
      return true;
    }
    if (ge('flist_cell' + u[0])) {
      show(ge('flist_cell' + u[0]));
      return true;
    }
    var uname = u[1];
    if (cur.flistSelection) {
      uname = uname.replace(cur.flistSelection.re, cur.flistSelection.val);
    }
    var row = ce('div', {id: 'flist_cell' + u[0], innerHTML: cur.flistTpl.replace('%id%', u[0]).replace('%name%', uname).replace('%photo%', u[2])});
    if (ins) {
      cur.flistAllCont.insertBefore(row, cur.flistAllCont.firstChild);
    } else {
      cur.flistAllCont.appendChild(row);
    }
    return true;
  },
  flistSelect: function(id, obj, event) {
    var el = ge('flist_cell'+id);
    var cont = obj.parentNode;
    if (cont.id.slice(0, 9) == 'flist_sel') {
      re(cont);
      if (el) {
        show(el);
      } else {
        for (var i in cur.flistList) {
          if (cur.flistList[i][0] == id) {
            Privacy.flistShowOne(cur.flistList[i], true);
            break;
          }
        }
      }
      cur.flistSelectedCnt--;
      if (cur.flistSelectedCnt == 0) {
        show('flist_info');
      }
      if (cur.flistLimit && cur.flistSelectedCnt == (cur.flistLimit - 1)) {
        removeClass(cur.flistAllCont, 'flist_full');
      }
      curBox().changed = true;
      delete cur.flistSelected[id];
    } else {
      if (cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit) {
        Privacy.flistFull(event || window.event);
        return false;
      }
      var html = val(el);
      hide(el);
      cur.flistSelCont.insertBefore(ce('div', {
        id: 'flist_sel_cell'+id,
        innerHTML: html
      }), cur.flistSelCont.firstChild);
      if (Privacy.flistShowOne(cur.flistList[cur.flistShown + 1])) {
        ++cur.flistShown;
      }
      if (cur.flistSelectedCnt == 0) {
        hide('flist_info');
      }
      cur.flistSelectedCnt++;
      if (cur.flistLimit && cur.flistSelectedCnt >= cur.flistLimit) {
        Privacy.flistFull(event || window.event);
      }
      cur.flistSelected[id] = true;
      if (cur.flistSearchStr) {
        Privacy.flistSearch(false);
      }
    }
    if (cur.flistCountStr) {
      val('flist_sel_summary', cur.flistSelectedCnt > 0 ? langNumeric(cur.flistSelectedCnt, cur.flistCountStr) : cur.flistNoSelStr);
    }
    cur.flistScrollbar.update();
    return false;
  },
  flistFull: function(tooltipEvent) {
    if (tooltipEvent) {
      var tt = showTooltip(bodyNode, {
        text: cur.limitTooltip,
        className: 'flist_max_size_tt',
        slideX: -15,
        shift: [-tooltipEvent.pageX - 5, -tooltipEvent.pageY - 5, 300],
        nohide: 1,
        hasover: 1,
        toup: 1
      });
      setTimeout(function() {
        tooltips.hide(bodyNode);
      }, 2000);
    }
    addClass(cur.flistAllCont, 'flist_full');
  },
  flistSearch: function(obj, event) {
    if (event && event.keyCode < 41 && event.keyCode > 15) {
      if (event.keyCode == 27) {
        if (obj.value) {
          cancelEvent(event);
        }
        obj = false;
      } else {
        return;
      }
    }
    setTimeout(function() {
      var str = obj ? obj.value : '';
      cur.flistSearchStr = str;
      if (str) {
        cur.flistList = cur.flistIndex.search(str);
        cur.flistSelection = {
          re: new RegExp('('+str.replace(cur.flistIndex.delimiter, '|').replace(/[\/\\\(\)\[\]\{\}\*,]/g, '').replace(/^\||\|$/g, '')+')', 'gi'),
          val: '<em>$1</em>'
        };
        show('flist_search_reset');
        cur.flistScrollbar.scrollTop(0);
      } else {
        cur.flistList = cur.flistFriends;
        cur.flistSelection = false;
        hide('flist_search_reset');
        val(cur.flistSearchEl, '');
      }

      if (cur.flistList.length) {
        cur.flistAllCont.innerHTML = '';
        cur.flistShown = -1;
        Privacy.flistMore();
      } else {

      }
    }, 0);
  },
  hideFriends: function(key, obj) {
    var checked = cur.privacy[key][2];
    showBox('al_friends.php', {act: 'select_friends_box', from: 'friends_privacy', Checked: checked.join(',')}, {stat: ['privacy.js', 'privacy.css', 'indexer.js'], params: {dark: 1}});
    cur.onFlistSave = function(ids, list, hash) {
      ajax.post('al_settings.php', {act: 'hide_friends', hash: hash, ids: ids.join(',')}, {
        onDone: function(control, rules) {
          ge('privacy_'+key+'_hide').innerHTML = control;
          cur.privacy[key] = rules;
          if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
        }
      });
    }
  },

  customType: 4,
  someType: 5,
  listsType: 6,
  update: function(key) {
    var el = ge('privacy_edit_' + key), p = cur.privacy[key], v = p[0];
    var types = cur.privacy[key + '_types'] || cur.privacy._types;
    var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};
    var _lists = {};
    for (var i in lists) {
      var _i = parseInt(i);
      _lists[_i] = lists[i];
    }

    if (el) {
      el.innerHTML = types[v];
      var privacyHeader = ge('privacy_header');
      if (privacyHeader) {
        privacyHeader.innerHTML = types[v];
      }
      if (el.nextSibling) {
        if (v == Privacy.listsType) {
          var str = [];
          for (var i in p[2]) {
            var cat_id = -p[2][i], color = (cat_id - 1) % 8 + 1;
            if (_lists[cat_id]) str.push(cat_id < 100 ? '<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + _lists[cat_id] + '</a>' : '<span class="group' + color + '">' + _lists[cat_id] + '</span>');
          }
          el.nextSibling.innerHTML = (str.length ? ': ' : '') + str.join(', ');
        } else {
          el.nextSibling.innerHTML = '';
        }
      }
    }

    if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
  },
  someSaved: function(key, ids, list, plain) {
    cur.privacy[key] = [Privacy.someType, 0, ids, []];

    var count = ids.length, str = [];
    for (var i = 0; i < count && i < 5; ++i) {
      var id = ids[i], mem = plain ? list[i] : list[id], shortname = mem[4].replace(/'/g, '');
      str.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + (mem[5] || mem[1]) + '</a>');
    }
    str = str.join(', ');
    if (count > 5) {
      str += ' ' + getLang('privacy_N_friends_some', count - 5);
    }

    var el = ge('privacy_edit_' + key);
    var types = cur.privacy[key + '_types'] || cur.privacy._types;
    el.innerHTML = types[Privacy.someType];
    el.nextSibling.innerHTML = ': ' + str;

    if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
  },
  customSaved: function(key, np, plus, minus) {
    cur.privacy[key] = np;
    if (np[1] == 1 && !np[3].length || np[0] == Privacy.listsType) {
      Privacy.update(key);
    } else if (np[0] == Privacy.someType) {
      Privacy.someSaved(key, np[2], plus, true);
    } else { // save here
      var el = ge('privacy_edit_' + key);
      var types = cur.privacy[key + '_types'] || cur.privacy._types;
      var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};

      var label = types[Privacy.listsType], str = '';
      if (np[1] == 1) {
        label = types[np[2][0]];
      } else {
        str = [];
        var count = plus.length, hasUser = false;
        for (var i = 0; i < count && i < 5; ++i) {
          var mem = plus[i], id = mem[0];
          if (id > 0) {
            var shortname = mem[4].replace(/'/g, '');
            hasUser = true;
            str.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + mem[5] + '</a>');
          } else {
            var cat_id = -id, color = (cat_id - 1) % 8 + 1;
            str.push('<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + lists[cat_id] + '</a>');
          }
        }
        if (hasUser) {
          label = types[Privacy.someType];
        }
        str = ': ' + str.join(', ');
        if (count > 5) {
          str += ' ' + getLang('privacy_N_friends_some', count - 5);
        }
      }
      if (minus.length) {
        var count = minus.length, mstr = [];
        for (var i = 0; i < count && i < 5; ++i) {
          var mem = minus[i], id = mem[0];
          if (id > 0) {
            var shortname = mem[4].replace(/'/g, '');
            mstr.push('<a href="/' + (shortname ? shortname : ('id' + id)) + '" onclick="return nav.go(this, event)">' + mem[6] + '</a>');
          } else {
            var cat_id = -id, color = (cat_id - 1) % 8 + 1;
            mstr.push('<a href="/friends?section=list' + cat_id + '" class="group' + color + '">' + lists[cat_id] + '</a>');
          }
        }
        str += ', ' + getLang('global_privacy_except') + ' ' + mstr.join(', ');
        if (count > 5) {
          str += ' ' + getLang('privacy_N_friends_more', count - 5);
        }
      }
      el.innerHTML = label;
      el.nextSibling.innerHTML = str;

      if (cur.onPrivacyChanged) cur.onPrivacyChanged(key);
    }
  },
  choose: function(ev, val, list) {
    var key = cur.privSel, p = cur.privacy[key], noselect = (cur.privacy._noselect || key == 'chat_actions');
    if (noselect) {
      if (cur.onPrivacyChanged) cur.onPrivacyChanged(key, val, list);
      Privacy.qhide();
      return cancelEvent(ev);
    }
    if (val == Privacy.customType) {
      var type, plus, minus = [], opt = '';
      if (p[0] == Privacy.customType) {
        type = p[1];
        plus = p[2];
        minus = p[3];
      } else if (p[0] == Privacy.someType || p[0] == Privacy.listsType) {
        type = 0;
        plus = p[2];
      } else {
        type = 1;
        plus = p[2];
      }
      cur.onCprivSave = Privacy.customSaved.pbind(key);
      if (cur.privacy.custom_box_type) {
        opt = cur.privacy.custom_box_type;
      } else if (key == 'apps_invite' || key == 'videocalls') {
        opt = 'fronly';
      } else if (key == 'hidden_friends') {
        opt = 'hidden_friends';
      }
      return showBox('al_friends.php', {act: 'custom_privacy_box', type: type, plus: plus.join(','), minus: minus.join(','), opt: opt}, {stat: ['ui_controls.js', 'ui_controls.css'], dark: 1});
    } else if (val == Privacy.someType) {
      var checked = (p[0] == Privacy.someType || p[0] == Privacy.complexType && p[1] == 0) ? p[2].join(',') : '';
      cur.onFlistSave = function (ids, list) {
        Privacy.someSaved(key, ids, list);
      }
      return showTabbedBox('al_friends.php', {act: 'select_friends_box', Checked: checked}, {stat: ['ui_controls.js']});
    } else if (val == Privacy.listsType) {
      var el = ge('privacy_l_item' + list);
      if (el.className == 'l_item_sel') {
        el.className = 'l_item';
        var ind = indexOf(p[2], -list);
        if (ind != -1) {
          p[2].splice(ind, 1);
        }
        if (!p[2].length && key != 'updates') { // sorry, dirty hack
          cur.privacy[key] = [0, 1, [0], []];
        }
      } else {
        el.className = 'l_item_sel';
        if (p[0] != val) {
          p = cur.privacy[key] = [val, 0, [], []];
        }
        p[2].push(-list);
      }
      Privacy.update(key);
      return cancelEvent(ev);
    }
    cur.privacy[key] = [val, 1, [val], []];
    Privacy.update(key);
    Privacy.qhide();
  },
  select: function(val, force) {
    if (!force && val === cur.privSelIndex) return;
    if (cur.privSelIndex !== false) {
      var el = ge('privacy_item' + cur.privSelIndex);
      if (el) el.className = 'item';
      if (cur.privSelIndex == Privacy.listsType && cur.privacy[cur.privSel][0] != Privacy.listsType) {
        if (Privacy.toup) {
          hide(el.previousSibling);
          setStyle(cur.privEl, {top: cur.privFromY - getSize(cur.privEl)[1]});
        } else {
          hide(el.nextSibling);
        }
      }
    }
    cur.privSelIndex = val;
    var el = ge('privacy_item' + cur.privSelIndex), add = (cur.privSelIndex == Privacy.someType) ? '_plus' : '';
    if (el.nextSibling && el.nextSibling.id == 'privacy_item' + Privacy.listsType && isVisible(el.nextSibling.nextSibling)) {
      el.className = 'last item_sel' + add;
    } else {
      if (val == Privacy.listsType) {
        if (Privacy.toup) {
          show(el.previousSibling);
          setStyle(cur.privEl, {top: cur.privFromY - getSize(cur.privEl)[1]});
        } else {
          show(el.nextSibling);
        }
      } else {
        el.className = 'item_sel' + add;
      }
    }
  },
  unselect: function(val) {
    if (val != cur.privSelIndex) return;
    ge('privacy_item' + val).className = 'item';
    cur.privSelIndex = false;
  },
  hide: function(timeout) {
    if (timeout > 0) {
      cur.hidePrivacyTimer = setTimeout(Privacy.hide.pbind(0), timeout);
      return;
    }
    clearTimeout(cur.hidePrivacyTimer);
    if (timeout == -1) {
      hide(cur.privEl, cur.privHelper);
    } else if (isVisible) {
      fadeOut(cur.privEl, 200);
      if (cur.privHelper) {
        fadeOut(cur.privHelper, 200);
      }
    }
    cur.privSel = cur.privSelIndex = false;
    removeEvent(document, 'click', Privacy.qhide);
  },
  show: function(el, ev, key, delta) {
    var p = cur.privacy[key], noselect = (key.indexOf('actions') != -1);
    if (!p) return;

    if (!cur.privEl) {
      if (cur.privEl = ge('privacy_dropdown')) {
        cur.privRows = cur.privEl.firstChild.rows[1].cells[1].firstChild;
      }
    }
    if (!cur.privEl) {
      cur.privEl = bodyNode.appendChild(ce('div', {id: 'privacy_dropdown', innerHTML: '\
<table cellspacing="0" cellpadding="0">\
  <tr class="top_sh">\
    <td colspan="3">\
      <div class="bottom2"></div><div class="bottom"></div>\
    </td>\
  <tr>\
    <td class="side"><div></div></td>\
    <td><div class="rows"></div></td>\
    <td class="side"><div></div></td>\
  </tr>\
  <tr class="bottom_sh">\
    <td colspan="3">\
      <div class="bottom"></div><div class="bottom2"></div>\
    </td>\
  </tr>\
</table>'}));
      cur.privRows = cur.privEl.firstChild.rows[1].cells[1].firstChild;
      addEvent(cur.privEl, 'mouseout', Privacy.hide.pbind(500));
      addEvent(cur.privEl, 'mouseover', function() { clearTimeout(cur.hidePrivacyTimer); });
    }
    setTimeout(addEvent.pbind(document, 'click', Privacy.qhide), 1);

    var types = cur.privacy[key + '_types'] || cur.privacy._types;
    var lists = cur.privacy[key + '_lists'] || cur.privacy._lists || {};
    var hidden = cur.privacy[key + '_hidden'] || cur.privacy._hidden || {};
    var fontSize = getStyle(el, 'fontSize') || vk.fs;
    setStyle(cur.privRows, {fontSize: fontSize});

    cur.privSelIndex = p[0];
    if (hidden[cur.privSelIndex]) { cur.privSelIndex = 0; }

    var html = [], sel, handlers, hasLists = false;
    for (var i in lists) {
      hasLists = true; break;
    }
    html.push('<div class="header" onclick="Privacy.hide(-1)"><div id="privacy_header">' + el.innerHTML + '</div></div>');
    html.push('<div class="body">');
    for (var i in types) {
      if (hidden[i]) { continue; }
      sel = (i == cur.privSelIndex && i != Privacy.listsType) ? '_sel' : '';
      handlers = 'onmouseover="Privacy.select(\'' + i + '\')" onclick="Privacy.choose(event, \'' + i + '\')"';
      if (i == Privacy.listsType) {
        if (!hasLists) {
          continue;
        }
      } else {
        handlers += ' onmouseout="Privacy.unselect(\'' + i + '\')"';
      }
      if (sel && i == Privacy.someType) {
        sel += '_plus';
      }
      html.push('<div class="item' + sel + '" id="privacy_item' + i + '" ' + handlers + '>' + types[i] + '</div>');
    }
    if (types[Privacy.listsType] && hasLists) {
      var hideLists = (cur.privSelIndex != Privacy.listsType);
      html.push('<div id="privacy_lists">');
      html.push('<div class="l_header" onclick="return cancelEvent(event)"><div>' + types[Privacy.listsType] + '</div></div>');
      for (var i in lists) {
        var _i = parseInt(i);
        var sel = hideLists ? '' : (inArray(-_i, p[2]) ? '_sel' : '');
        html.push('<div class="l_item' + sel + '" id="privacy_l_item' + _i + '" onclick="Privacy.choose(event, ' + Privacy.listsType + ', ' + _i + ')"><div class="privacy_item_icon"></div>' + lists[i] + '</div>');
      }
      html.push('</div>');
    }
    html.push('</div>');
    cur.privRows.innerHTML = html.join('');
    cur.privSel = key;

    var helpText = cur.privacy[key + '_help'], hsz = [0, 0], hw = cur.privacy[key + '_help_w'];
    if (helpText) {
      if (!cur.privHelper) {
        if (cur.privHelper = ge('privacy_helper')) {
          cur.privHelp = cur.privHelper.firstChild.rows[2].cells[3].firstChild;
        }
      }
      if (!cur.privHelper) {
        cur.privHelper = bodyNode.appendChild(ce('div', {id: 'privacy_helper', innerHTML: '\
<table cellspacing="0" cellpadding="0">\
  <tr class="priv_h_top_sh">\
    <td></td>\
    <td colspan="5"><div class="priv_h_bottom2"></div></td>\
  </tr>\
  <tr class="priv_h_top_sh">\
    <td></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td colspan="3"><div class="priv_h_bottom"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
  </tr>\
  <tr>\
    <td class="priv_h_arrow_td"><div class="priv_h_arrow"><img src="/images/ddtooltip'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png" width="16" height="11" class="priv_h_arrow_img png" /></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td class="priv_h_side_td"><div class="priv_h_side"></div></td>\
    <td><div class="priv_h_rows"' + (hw ? ' style="width: ' + hw + 'px"' : '') + '></div></td>\
    <td class="priv_h_side_td"><div class="priv_h_side"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
  </tr>\
  <tr class="priv_h_bottom_sh">\
    <td></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
    <td colspan="3"><div class="priv_h_bottom"></div></td>\
    <td class="priv_h_side_td2"><div class="priv_h_side"></div></td>\
  </tr>\
  <tr class="priv_h_bottom_sh">\
    <td></td>\
    <td colspan="5"><div class="priv_h_bottom2"></div></td>\
  </tr>\
</table>'}));
        cur.privHelp = cur.privHelper.firstChild.rows[2].cells[3].firstChild;
        addEvent(cur.privHelper, 'mouseout', Privacy.hide.pbind(500));
        addEvent(cur.privHelper, 'mouseover', function() { clearTimeout(cur.hidePrivacyTimer); });
      }
      cur.privHelp.innerHTML = helpText;

      var tw = data(cur.privHelper, 'tween');
      if (tw) tw.stop(true);
      //show(cur.privHelper);

      var hsz = getSize(cur.privHelper);
    }
    var tw = data(cur.privEl, 'tween');
    if (tw) tw.stop(true);
    show(cur.privEl);

    var isFixed = false, pel = el;
    while (pel) {
      if (getStyle(pel, 'position') == 'fixed') {
        isFixed = true;
        break;
      }
      pel = pel.offsetParent;
    }
    cur.privEl.className = 'privacy_dropdown_' + key;
    if (isFixed) {
      addClass(cur.privEl, 'fixed');
      setStyle(cur.privEl, {position: ''});
      addClass(cur.privHelper, 'fixed');
      setStyle(cur.privHelper, {position: ''});
    } else {
      removeClass(cur.privEl, 'fixed');
      setStyle(cur.privEl, {position: 'absolute'});
      removeClass(cur.privHelper, 'fixed');
      setStyle(cur.privHelper, {position: 'absolute'});
    }

    var sz = getSize(cur.privEl), h = Math.max(sz[1], hsz[1])
    if (types[Privacy.listsType] && hideLists) {
      hide('privacy_lists');
    }

    if (delta === undefined) {
      delta = isFixed ? [0, 0] : [-1, -1];
    }
    var xy = getXY(el, isFixed), dx = 7 + delta[0], dy = 3 + delta[1];
    if ((browser.msie || browser.opera) && !isFixed) {
      dx += 1;
      dy += 1;
    }

    var y = xy[1] - dy - ((browser.msie6 || isFixed) ? 0 : scrollNode.scrollTop);
    Privacy.toup = false;
    if (y - h > 0) {
      if (y + h > lastWindowHeight) {
        Privacy.toup = true;

        var r = cur.privRows;
        r.appendChild(r.firstChild);

        var b = r.firstChild;
        for (var e = b.firstChild, t = false; e.nextSibling && e.nextSibling != t; e = b.firstChild) {
          if (t) {
            t = b.insertBefore(e, t);
          } else {
            t = b.appendChild(e);
          }
        }

        var l = b.firstChild;
        if (l.id == 'privacy_lists') {
          for (var e = l.firstChild, t = false; e.nextSibling && e.nextSibling != t; e = l.firstChild) {
            if (t) {
              t = l.insertBefore(e, t);
            } else {
              t = l.appendChild(e);
            }
          }
        }
        sz = getSize(cur.privEl);
      }
    }

    if (vk.rtl) {
      var sz1 = getSize(el);
      xy[0] -= sz[0] - sz1[0];
      dx = -8;
    }

    bodyNode.appendChild(cur.privEl);
    if (Privacy.toup) {
      cur.privEl.firstChild.className = 'to_up';
      dy -= 1;
      cur.privFromY = xy[1] + getSize(cur.privRows.lastChild)[1] - dy;
      setStyle(cur.privEl, {left: xy[0] - dx, top: cur.privFromY - sz[1]});
    } else {
      cur.privEl.firstChild.className = '';
      setStyle(cur.privEl, {left: xy[0] - dx, top: xy[1] - dy});
    }

    if (helpText) {
      var hx = (xy[0] - dx) + (vk.rtl ? (-hsz[0]) : sz[0]), hy = 0;
      if (Privacy.toup) {
        cur.privHelper.firstChild.className = 'to_up';
        hy = cur.privFromY - hsz[1];
      } else {
        cur.privHelper.firstChild.className = '';
        hy = xy[1] - dy;
      }
      setStyle(cur.privHelper, {left: hx + 15, top: hy});
      animate(cur.privHelper, {opacity: 1, left: hx}, 200);
    } else {
      hide(cur.privHelper);
    }
    return cancelEvent(ev);
  },
  getValue: function(key) {
    var p = cur.privacy[key], res = [];
    if (p[0] < Privacy.customType) {
      res = [p[0]];
    } else if (p[0] == Privacy.someType) {
      res = [4, p[2].join(',')];
    } else if (p[0] == Privacy.listsType) {
      var l = [];
      for (var i in p[2]) {
        l.push(-p[2][i]);
      }
      res = [5, l.join(',')];
    } else {
      res = [-1, p[1], p[2].join(','), p[3].join(',')];
    }
    return res.join('_');
  }
}

Privacy.qhide = Privacy.hide.pbind(-1);

function OList (box, owners, selected, options) {
  if (selected.length === 0) selected = {};
  options = options || {};
  // this.indexer = new Indexer(owners); // Requires ui_controls for indexer
  this.indexer = new vkIndexer(owners, options.getName ? options.getName : function(owner) {
    return owner[1];
  });
  this.owners = owners;
  this.tpl = options.tpl;
  this.rsTpl = options.rsTpl;
  this.idIndex = options.idIndex || 0;
  this.selected = selected;
  this.getUnsorted = options.getUnsorted;
  this.unsortedIndex = options.unsortedIndex || 0;
  this.box = box;
  this.nofocus = options.nofocus;
  if (options.onTabUpdate) {
    this.onTabUpdate = options.onTabUpdate;
  }
  if (box.tabContent) {
    addClass(box.tabContent.parentNode, 'has_sh');
  }

  box.removeButtons();
  box.addButton(getLang('global_cancel'), function () {
    if (cur.onOListCancel && cur.onOListCancel(options.ret || {}) === false) {
      return;
    }
    box.hide(200);
  }, 'no');
  box.addButton(options['save_lang'] || getLang('global_save'), function () {
    var list = {}, ids = [], inv = [];
    each (owners, function () {
      if (!self.invertedSelection && self.selected[this[self.idIndex]] || self.invertedSelection && !self.selected[this[self.idIndex]]) {
        list[this[self.idIndex]] = this;
        ids.push(this[self.idIndex]);
      } else {
        inv.push(this[self.idIndex])
      }
    });
    if (cur.onOListSave(ids, inv, list, options.ret || {}) !== false) {
      box.hide(200);
    }
  });
  if (options['box_options']) {
    box.setOptions(options['box_options']);
  }

  var self = this;
  var tabsEl = geByClass1('summary_tabs', box.bodyNode);
  var actionsWrap = geByClass1('olist_actions', box.bodyNode, 'div');
  var selButton = geByTag1('button', box.bodyNode);
  this.scrolNode = geByClass1('privacy_olist', box.bodyNode);
  this.moreEl = geByClass1('olist_more', box.bodyNode, 'a');
  this.olistEl = geByClass1('olist', box.bodyNode, 'div');
  this.selCnt = intval(val('olist_selected'));
  this.sel = options.sel || 0;
  this.noSelMsg = options.noSelMsg || getLang('friends_no_user_selected');
  this.invertedSelection = false;

  var filter = this.filter = geByClass1('olist_filter', box.bodyNode, 'input');
  var filterWrap = filter.parentNode;
  placeholderSetup(filter, {back: 1});
  if (!options.nofocus) {
    setTimeout(elfocus.pbind(filter), 100);
  }

  if (this.moreEl) {
    if (!isVisible(this.moreEl)) {
      re(this.moreEl);
      show(this.moreEl);
    } else {
      this.moreEl.onclick = function (event) {
        self.renderList('', 60);
        return cancelEvent(event);
      }
    }
  }

  var actMenuOptions = [], selMenuOptions = [], selTitle = '';
  each (options.actions_menu, function () {
    var menuItem = {i: this[0], l: this[1]};
    if (!this[0]) {
      menuItem.onMouseOver = function () {
        self.olistSelectMenu.options.target = this;
        self.olistSelectMenu.moveToTarget();
        setStyle(self.olistSelectMenu.header, {width: getSize(this)[0]});
        setStyle(self.olistSelectMenu.rows, {minWidth: getSize(this)[0]});
        if (browser.msie) {
          setStyle(self.olistSelectMenu.rows, {width: getSize(this)[0] + 20});
        }
        self.olistSelectMenu.show();
      }
      menuItem.onClick = function () {return false;}
      selTitle = this[1];
    }
    actMenuOptions.push(menuItem);
  });
  each (options.selection_menu, function () {
    var menuItem = {i: this[0], l: this[1]};
    selMenuOptions.push(menuItem);
  });
  this.olistActionsMenu = new DropdownMenu(actMenuOptions, {
    target: selButton,
    containerClass: 'dd_menu_olist_act',
    title: '<span class="olist_dd_over"></span>',
    updateTarget: false,
    offsetLeft: 0,
    offsetTop: 0,
    showHover: false,
    fadeSpeed: 0,
    onSelect: this.selMenuOnSelect.bind(this)
  });

  this.olistSelectMenu = new DropdownMenu(selMenuOptions, {
    parentMenu: this.olistActionsMenu,
    showHover: false,
    updateTarget: false,
    title: selTitle,
    offsetLeft: 0,
    offsetTop: 1,
    fadeSpeed: 0,
    containerClass: 'dd_menu_nested dd_menu_olist_sel',
    onSelect: this.selMenuOnSelect.bind(this)
  });

  addEvent(filter, 'keyup', function (e) {
    self.renderList(val(this));
  });
  addEvent(this.olistEl, 'click mouseover mouseout', this.onMouseEvent.bind(this));
  addEvent(this.scrolNode, 'scroll', this.onScroll.bind(this));

  if (options.ignored) {
    // this.ignoredIndexer = new Indexer(options.ignored);
    this.ignoredIndexer = new vkIndexer(options.ignored, options.getName ? options.getName : function(owner) {
      return owner[1];
    });
    this.ignoredOwners = options.ignored;
    this.ignoredTpl = options.ignored_tpl;
    this.ignoredSelected = {};
    this.ignoredCnt = options.ignored.length;
  }

  (cur.onOListTabChange = function (tab) {
      if (tab === undefined) {
        tab = self.selPrev === undefined ? 0 : self.selPrev;
      }
      self.selPrev = self.sel;
      self.sel = tab;
      toggle(tabsEl, tab != 2);
      if (tab == 2) {
        if (filterWrap.nextSibling != tabsEl) {
          tabsEl.parentNode.insertBefore(filterWrap, tabsEl);
        }
      } else {
        if (filterWrap.parentNode != actionsWrap) {
          actionsWrap.appendChild(filterWrap);
        }
      }
      toggleClass(filterWrap, 'fl_l', tab != 2);
      toggleClass(actionsWrap, 'olist_ignored_actions', tab == 2);
      toggleClass(self.olistEl, 'olist_ignored', tab == 2);
      if (options.ignored) {
        box.setControlsText(tab == 2 ? options.ignored_return_link : options.ignored_link.replace('%s', self.ignoredCnt));
      }
      self.renderList(val(filter), 0, tab);

      if (!options.nofocus) {
        setTimeout(elfocus.pbind(filter), 100);
      }
  })(self.sel);

}
extend(OList.prototype, {
  onScroll: function () {
    if (!this.moreEl || !this.moreEl.offsetTop || !this.moreEl.onclick) {
      return;
    }
    var y = this.moreEl.offsetTop,
        sh = this.scrolNode.scrollHeight,
        st = this.scrolNode.scrollTop,
        h = this.scrolNode.offsetHeight || this.scrolNode.clientHeight;

    if (st + h + 100 >= y) {
      this.moreEl.onclick();
    }
  },
  onMouseEvent: function (event) {
    var target = event.originalTarget || event.target;
    while (target && target != bodyNode && (!target.className || target.className.indexOf('olist_item_wrap') == -1)) {
      target = target.parentNode;
    }
    if (!target || target == bodyNode) return;
    if (hasClass(target, 'olist_item_loading')) {
      return cancelEvent(event);
    }
    if (event.type == 'mouseover' || event.type == 'mouseout') {
      if (!hasClass(target, 'olist_item_wrap_on'))
        target.className = 'olist_item_wrap' + (event.type == 'mouseover' ? '_over' : '');
    } else {
      if (checkEvent(event)) return true;
      this.box.changed = true;
      var id = target.id.match(/-?\d+/)[0];
      if (this.sel == 2) {
        this.ignoreOnClick(target, id);
      } else {
        var checked = !this.invertedSelection && this.selected[id] || this.invertedSelection && !this.selected[id];
        target.className = !checked ? 'olist_item_wrap_on' : 'olist_item_wrap_over';
        this.selected[id] = !checked || this.invertedSelection;
        this.selCnt += !checked || this.invertedSelection ? 1 : -1;
        this.selTabUpdate();
      }
      if (!this.nofocus && this.scrolNode.scrollTop < 50) {
        var filter = this.filter;
        setTimeout(function () {
          elfocus(filter);
          if (val(filter).length) {
            filter.select();
          }
        }, 100);
      }

      return cancelEvent(event);
    }
  },
  selMenuOnSelect: function (event) {
    this.olistActionsMenu.hide(false);
    this.olistSelectMenu.hide(false);
    var k = event.target.index,
        selCnt = this.selCnt,
        selected = this.selected;

    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      selected = {};
      selCnt = 0;
    }

    switch (k) {
      case -1:
        selected = {};
        selCnt = 0;
        each (this.owners, function () {
          selected[this[0]] = 1;
          selCnt++;
        });
        break;

      case -2: // None
        selected = {};
        selCnt = 0;
        break;

      case -3:
        each (this.owners, function () {
          if (this[0] > 0 && !selected[this[0]]) {
            selected[this[0]] = 1;
            selCnt++;
          }
        });
        break;

      case -4:
        each (this.owners, function () {
          if (this[0] < 0 && !selected[this[0]]) {
            selected[this[0]] = 1;
            selCnt++;
          }
        });
        break;

      default:
        var mask = (1 << k);
        each (this.owners, function () {
          if ((this[4] & mask) && !selected[this[0]]) {
            selected[this[0]] = 1;
            selCnt++;
          }
        });
    }

    this.selCnt = selCnt;
    this.selected = selected;
    this.selTabUpdate();
    this.renderList();
    return false;
  },
  selTabUpdate: function () {
    var cnt1 = this.selCnt, cnt2 = this.owners.length - cnt1;
    val('olist_selected', cnt1);
    val('olist_unselected', cnt2);
    toggle('olist_selected', cnt1 > 0);
    toggle('olist_unselected', cnt2 > 0);
    if (this.onTabUpdate) {
      this.onTabUpdate();
    }
  },
  ignoreOnClick: function (target, id) {
    var self = this,
        hash = false;

    var checked = !this.invertedSelection && this.ignoredSelected[id] || this.invertedSelection && !this.ignoredSelected[id];
    each (this.ignoredOwners, function () {
      if (this[0] == id) {
        hash = this[4];
        return false;
      }
    });
    ajax.post('/al_feed.php?misc', {act: checked ? 'a_ignore_owner' : 'a_unignore_owner', owner_id: id, hash: hash}, {
      onDone: function () {
        target.className = !checked ? 'olist_item_wrap_on' : 'olist_item_wrap_over';
        self.ignoredSelected[id] = !checked || self.invertedSelection;
        self.ignoredCnt += !checked || self.invertedSelection ? -1 : 1;
        val('olist_blacklisted', self.ignoredCnt);
        toggle('olist_blacklisted', self.ignoredCnt);
      },
      showProgress: function () {
        addClass(target, 'olist_item_loading');
      },
      hideProgress: function () {
        removeClass(target, 'olist_item_loading');
      }
    });
  },
  renderList: function (pattern, offset, sel) {
    offset = offset || 0;
    sel = sel || this.sel;
    var slice, selected, tpl,
        limit = offset ? 60 : 120,
        self = this;

    if (pattern) {
      pattern = pattern.replace(/\u2013|\u2014/g, '-');
    }
    if (sel == 2) {
      slice = pattern ? this.ignoredIndexer.search(pattern) : this.ignoredOwners;
      selected = this.ignoredSelected;
      tpl = self.ignoredTpl;
    } else {
      slice = pattern ? this.indexer.search(pattern) : this.owners;
      if (self.unsortedIndex == sel && self.getUnsorted) {
        slice = self.getUnsorted(slice);
      }
      selected = this.selected;
      var inverted = self.invertedSelection ? !(this.sel < 0) : (this.sel < 0);
      tpl = self.tpl;
      if (sel && self.unsortedIndex != sel) {
        var sel_slice = [];
        each (slice, function () {
          var id = this[self.idIndex];
          if (!inverted && selected[id] || inverted && !selected[id]) {
            sel_slice.push(this);
            if (sel_slice.length > offset + limit) {
              return false;
            }
          }
        });
        slice = sel_slice;
      }
    }
    var total = slice.length;
    slice = slice.slice(offset, offset + limit);
    var html = [];
    if (pattern) {
      pattern = clean(pattern);
      var term = escapeRE(pattern), termRus = parseLatin(pattern);
      if (termRus != null) {
        term = term + '|' + escapeRE(termRus);
      }
      var regexp = new RegExp('(?![^&;]+;)(?!<[^<>]*)((\\(*)(' + term + '))(?![^<>]*>)(?![^&;]+;)', 'gi');
    }
    var rsTpl = self.rsTpl ? self.rsTpl : function(obj, pattern, invertedSelection, selected, regexp) {
      var checked = !invertedSelection && selected[obj[0]] || invertedSelection && !selected[obj[0]];
      var label = obj[1];
      if (pattern) {
        label = pattern.indexOf(' ') == -1 ? label.split(' ') : [label];
        var tmp = '';
        for (var i in label) {
          tmp += (i > 0 ? ' ' : '') + label[i].replace(regexp, '$2<em>$3</em>');
        }
        label = tmp;
      }
      return {
        id: obj[0],
        name: label,
        photo: obj[2],
        classname: checked ? ' olist_item_wrap_on' : '',
        link: obj[3] || (obj[0] > 0 ? ('id' + obj[0]) : ('club' + (-obj[0])))
      };
    }
    each (slice, function () {
      html.push(rs(tpl, rsTpl(this, pattern, self.invertedSelection, selected, regexp)));
    });
    if (!offset && !html.length) {
      html.push('<div class="olist_empty">' + (pattern ? getLang('global_search_not_found').replace('{search}', pattern) : self.noSelMsg) + '</div>');
    }
    re(this.moreEl);
    html = html.join(' ');

    if (!offset) {
      val(this.olistEl, html);
    } else {
      this.olistEl.appendChild(cf(html));
    }
    if (total > offset + limit) {
      this.olistEl.appendChild(this.moreEl);
      this.moreEl.onclick = function (event) {
        self.renderList(pattern, offset + limit);
        return cancelEvent(event);
      }
    }
    if (self.box && self.box.scroll) {
      self.box.scroll.update(false, true);
    }
  }
});

try{jsDispatcher.triggerOnload('privacy.js');}catch(e){}
try{stManager.done('privacy.js');}catch(e){}
