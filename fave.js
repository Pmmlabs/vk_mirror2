var Fave = {
  switchTab: function(section) {
    if (cur.section == section) {
      return;
    }

    replaceClass(geByClass1('summary_tab_sel'), 'summary_tab_sel', 'summary_tab');
    if (section == 'likes_notes') {
      replaceClass(ge('fave_like_tab_likes_posts').parentNode, 'summary_tab', 'summary_tab_sel');
    } else {
      replaceClass(ge('fave_like_tab_' + section).parentNode, 'summary_tab', 'summary_tab_sel');
    }
    nav.setLoc('fave?section=' + section);

    toggle('fave_notes_tab_wrap', section == 'likes_posts' || section == 'likes_notes');
    checkbox('fave_notes_tab', section == 'likes_notes');

    if (section == 'faces') {
      show('fave_faces_other');
    } else {
      hide('fave_faces_other');
    }

    var doSwitch = function(section) {
      Fave.hideCurrentSection();
      cur.section = section;
      Fave.showCurrentSection();
      nav.setLoc('fave?section=' + section);
      ajax.post('al_fave.php', {act: 'a_set_default', section: section});
      if (cur.section == 'faces') {
        Fave.facesOther(true);
      }
    };

    if (!cur.preloaded) {
      show('fave_progress');
      if (!cur.preloading) {
        this.preloadTabs();
      }

      var waitPreload = setInterval(function() {
        if (cur.preloaded) {
          hide('fave_progress');
          clearInterval(waitPreload);
          doSwitch(section);
        }
      }, 100);
    } else {
      doSwitch(section);
    }
  },

  hideCurrentSection: function() {
    var s = cur.section;
    if (ge('empty_' + s)) {
      addClass(ge('empty_' + s), 'unshown');
    }
    if (ge(s)) {
      addClass(ge(s), 'unshown');
    }
    switch (s) {
      case 'users':
        addClass(geByClass1('fave_search'), 'unshown');
        addClass(ge('users_online'), 'unshown');
        break;

      case 'links':
        addClass(geByClass1('fave_new_link'), 'unshown');
        addClass(ge('msg_links'), 'unshown');
        break;
    }
  },

  showCurrentSection: function() {
    var s = cur.section;
    if (ge('empty_' + s)) {
      removeClass(ge('empty_' + s), 'unshown');
      switch (s) {
        case 'links':
          removeClass(geByClass1('fave_new_link'), 'unshown');
          elfocus('fave_new_link');
          break;
      }
    } else if (ge(s)) {
      removeClass(ge(s), 'unshown');
      switch (s) {
        case 'users':
          removeClass(geByClass1('fave_search'), 'unshown');
          removeClass(ge('users_online'), 'unshown');
          elfocus('fave_search');
          break;

        case 'links':
          removeClass(geByClass1('fave_new_link'), 'unshown');
          break;
      }
    }
  },

  newLink: function(event, obj) {
    if ((event.keyCode == 13 || event.keyCode == 10) && event.ctrlKey) {
      Fave.newLinkSubmit();
    }
    var link = ge('fave_new_link').value;
    var desc = ge('fave_new_link_desc');
    if (link.length > 0 && ((link.indexOf('vk.com') != -1) || (link.indexOf('vkontakte.ru') != -1))) {
      removeClass(desc, 'unshown');
    } else {
      addClass(desc, 'unshown');
    }
  },

  newLinkSubmit: function(event, obj) {
    var link = ge('fave_new_link').value;
    if (link.length == 0) {
      return;
    }
    var desc = ge('fave_new_link_desc').value;
    var hash = ge('new_link_hash').value;
    ajax.post('al_fave.php', {act: 'add_link', link: link, desc: desc, hash: hash}, {onDone: function(res, html) {
      if (res) {
        var parent;
        var child;
        if (ge('empty_links')) {
          child = ge('empty_links');
          parent = child.parentNode;
        } else if (ge('links')) {
          child = ge('links');
          parent = child.parentNode;
        }
        parent.removeChild(child);
        parent.innerHTML += html;

        ge('fave_new_link').value = '';
        ge('fave_new_link_desc').value = '';
        addClass(ge('fave_new_link_desc'), 'unshown');

        var msg = ge('msg_links');
        msg.innerHTML = cur.lang['fave_link_added'];
        removeClass(msg, 'unshown');
      } else {
        var msg = ge('msg_links');
        msg.innerHTML = html;
        removeClass(msg, 'unshown');
      }
    }, onFail: function() {
      //ON FAIL
    }});
  },

  showDeleteLink: function(node) {
    var link = node.id.substr(4);
    var unfave = ge('unfave' + link);
    fadeTo(unfave, 200, 1);
  },

  hideDeleteLink: function(node) {
    var link = node.id.substr(4);
    var unfave = ge('unfave' + link);
    fadeTo(unfave, 200, 0);
  },

  deleteLink: function(node, hash) {
    var link = node.id.substr(6);
    var parts = link.split('_');
    ajax.post('al_fave.php', {act: 'unfave_link', type: parts[0], owner_id: parts[1], item_id: parts[2], hash: hash}, {onDone: function(res, html) {
      if (res) {
        ge('link' + link).innerHTML = html;
        var num = geByClass('fave_link_item').length - 1;
        if (!cur.linksNum) {
          cur.linksNum = num;
        } else {
          cur.linksNum--;
          num = cur.linksNum;
        }
        //if (num > 0) {
          var text = langNumeric(num, cur.lang.fave_links_summary, true);
          var summary = geByClass1('summary', ge('links'));
          summary.innerHTML = text;
        //}
      }
    }, onFail: function() {
      //ON FAIL
    }});
  },

  preloadTabs: function() {
    ajax.post('al_fave.php', {act: 'preload', section: cur.section}, {onDone: function(data, usersHtml, userRows, linksHtml, photosHtml, videosHtml, postsHtml, notesHtml, facesHtml) {
      var page = ge('content');
      if (cur.section != 'users') {
        page.appendChild(ce('div', {innerHTML: usersHtml}));
        cur.faveData.userRows = userRows;

        if (data.faveUsers) {
          cur.faveData.faveUsers = data.faveUsers;
        }
        if (data.userRows) {
          cur.faveData.userRows = data.userRows;
        }

        if (!ge('empty_users') && geByClass1('summary', ge('users'))) {
          cur.lang['users_summary'] = geByClass1('summary', ge('users')).innerHTML;
          Fave.indexAll();
        }
      }

      if (cur.section != 'links') {
        page.appendChild(ce('div', {innerHTML: linksHtml}));
      }

      if (cur.section != 'likes_photo') {
        page.appendChild(ce('div', {innerHTML: photosHtml}));
      }

      if (cur.section != 'likes_video') {
        page.appendChild(ce('div', {innerHTML: videosHtml}));
      }

      if (cur.section != 'likes_posts') {
        page.appendChild(ce('div', {innerHTML: postsHtml}));
      }

      if (cur.section != 'likes_notes') {
        page.appendChild(ce('div', {innerHTML: notesHtml}));
      }

      if (cur.section != 'faces') {
        page.appendChild(ce('div', {innerHTML: facesHtml}));
      }

      cur.preloaded = true;
      cur.preloading = false;
    }, onFail: function() {
      cur.preloading = false;
    }});
  },

  showMore: function(module, updated) {
    cur.disableAutoMore = false;
    updated = updated || false;
    var nextRows = ge('fave_rows_next_' + module);
    faveRows = ge(module + '_content').firstChild;
    if (!updated && nextRows) {
      while (nextRows.firstChild) {
        faveRows.insertBefore(nextRows.firstChild, nextRows);
        updated = true;
      }
    }
    if (cur.isListLoading) return;
    hide('show_more_' + module);
    show('show_more_progress_' + module);
    var escPressed = false;
    var tmp = function (e) { if (e.keyCode == KEY.ESC) { escPressed = true; } };
    addEvent(document, 'keyup', tmp);

    if (!cur.faveData[module + 'Offset']) {
      cur.faveData[module + 'Offset'] = 0;
    }
    var offset = intval(cur.faveData[module + 'Offset']) + intval(cur.faveData[module + 'PerPage']);

    if (cur.section == 'faces') return;

    ajax.post('al_fave.php', {act: 'load', section: cur.section, offset: offset, part: 1}, {
      onDone: function (rows, shownAll) {
        removeEvent(document, 'keyup', tmp);
        if (escPressed) {
          show('show_more_' + module);
          hide('show_more_progress_' + module);
          cur.disableAutoMore = true;
          return;
        }
        if (rows) {
          var au = ce('div'), row, cont = updated ? nextRows : faveRows;
          au.innerHTML = rows;
          if (!updated) {
            cont.removeChild(nextRows);
          }
          while (row = au.firstChild) {
            cont.appendChild(row);
          }
          if (!updated) {
            cont.appendChild(nextRows);
          }
        }
        if (!shownAll) {
          show('show_more_' + module);
        } else {
          hide('show_more_link_' + module);
        }
        hide('show_more_progress_' + module);
        cur.faveData[module + 'Offset'] = offset;
      },
      showProgress: function () {
        cur.isListLoading = true;
      },
      hideProgress: function () {
        cur.isListLoading = false;
      },
      cache: 1
    });
  },

  scrollCheck: function () {
    if (browser.mobile || cur.isListLoading || cur.disableAutoMore || (cur.section || '').indexOf('likes_')) return;

    var el = ge('show_more_' + cur.section);
    if (!isVisible(el)) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (st + ch + 200 > el.offsetTop) {
      Fave.showMore(cur.section);
    }
  },

  searchSummary: function(users) {
    var num = users.length;
    var text = cur.lang['users_summary'];
    if (num < cur.faveData.faveUsers.length && num > 0) {
      text = langNumeric(num, cur.lang.fave_search_summary, true);
    } else if (num == 0) {
      text = cur.lang['fave_search_query_not_found'];

      var notFound = ge('not_found_users');
      removeClass(notFound, 'unshown');
      var query = ge('fave_search').value.replace(/([<>&#]*)/g, '');
      notFound.innerHTML = text.replace('{search}', '<b>' + query + '</b>');

      text = cur.lang['fave_search_not_found'];
    }

    if (num > 0) {
      var notFound = ge('not_found_users');
      addClass(notFound, 'unshown');
    }

    geByClass1('summary', ge('users')).innerHTML = text;
  },

  filterOnline: function() {
    if (!cur.shownOnline) {
      cur.shownOnline = true;
    var online = geByClass('fave_online');
    users = new Array();
    for (var i in online) {
      if (online[i].nodeName != "DIV") continue;
      var userNodeId = online[i].parentNode.parentNode.id;
      userId = userNodeId.substr(13);
      var userObj = new Object();
      userObj.id = userId
      users.push(userObj);
    }
    this.drawUsers(users);
    ge('fave_filter_online_toggler').innerHTML = 'Показать все';
    } else {
      cur.shownOnline = false;
      ge('fave_filter_online_toggler').innerHTML = 'Онлайн';
      this.drawUsers(cur.faveData.faveUsers);
      cur.shownOnline = false;
    }
  },

  drawUsers: function(users, query) {
    if (!users) {
      return;
    } else {
      this.searchSummary(users);
    }
    var parent = ge('users_content');
    parent.innerHTML = '';
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      parent.innerHTML += cur.faveData.userRows[user.id];
      if (i > 28) {
        setTimeout(function () {
          var html = '';
          for (var j = i + 1; j < users.length; j++) {
            var user = users[j];
            html += cur.faveData.userRows[user.id];
          }
          parent.innerHTML += html;
        }, 0);
        break;
      }
    }

    if (query && query.length > 0) {

      cur.selection = {
        re: new RegExp('('+query.replace(cur.vIndex.delimiter, '|')+')', 'gi'),
        val: '<em>$1</em>'
      };
      var names = geByClass('fave_user_name', ge('users_content'));
      for (var i in names) {
        var name = names[i].firstChild;
        if (name) {
          name.innerHTML = name.innerHTML.replace(cur.selection.re, cur.selection.val);
        }
      }
    }
  },

  updateList: function() {
    var query = val('fave_search').toLowerCase();
    query = trim(query);
    if (query.length == 0) {
      if (cur.prevQuery && cur.prevQuery.length > 0) {
        this.drawUsers(cur.faveData.faveUsers);
        show(ge('users_online'));
      }
      cur.prevQuery = query;
      return;
    }
    cur.prevQuery = query;

    var results =  cur.vIndex.search(query);
    this.drawUsers(results, query);
    hide(ge('users_online'));
  },

  indexAll: function(callback) {
    var all = cur.faveData.faveUsers;
    cur.vIndex = new vkIndexer(all, (function(obj) {
      return obj['name'];
    }).bind(this), function() {
      // pass
      if (callback) {
        callback();
      }
    });
  },

  reorderFave: function(uid, before, after) {
    uid = uid.id.substr(13);
    before = before ? before.id.substr(13) : null;
    after = after ? after.id.substr(13) : null;
    ajax.post('al_fave.php', {act: 'reorder_users', uid: uid, before: before, after: after});
  },

  searchFocus: function() {
    //
  },

  init: function() {
    extend(cur, {
      module: 'fave',
      bigphCache: {},
      bigphShown: {},
      _back: {
        text: getLang('fave_return_to_fave'),
        show: [],
        hide: [function() {
          for (var i in cur.bigphShown) {
            animate(cur.bigphShown[i], {marginTop: 100}, 0);
          }
          cur.bigphShown = {};
        }],
        loc: false
      }
    });

    if (!cur.debug) {
      cur.preloading = true;
      this.preloadTabs();
    }

    //Scroll check routine
    Fave.scrollNode = browser.msie6 ? pageNode : window;
    addEvent(Fave.scrollNode, 'scroll', Fave.scrollCheck);
    addEvent(window, 'resize', Fave.scrollCheck);
    cur.destroy.push(function() {
      removeEvent(Fave.scrollNode, 'scroll', Fave.scrollCheck);
      removeEvent(window, 'resize', Fave.scrollCheck);
    });

    if (cur.section == 'users' && !ge('empty_users')) {
      cur.lang['users_summary'] = geByClass1('summary', ge('users')).innerHTML;
      this.indexAll();
    }

    var userSearch = ge('fave_search');
    addEvent(userSearch, 'focus', Fave.searchFocus);
    if (cur.section == 'users') {
      elfocus(userSearch);
    }

    placeholderSetup(userSearch, {back: true});
    placeholderSetup('fave_new_link', {back: true});

    if (cur.faveData.faveUsers && cur.faveData.faveUsers.length > 0) {
      cur.qsorterRowClass = 'fave_user_div';
      cur.qsorterRowUpClass = 'fave_user_div fave_user_div_up';
      cur.qsorterNoOperaStyle = true;
      cur.qsorterSetSize = true;
      cur.qsorterEl = qsorter.init('users_content', {onReorder: Fave.reorderFave, xsize: 5, width: 120, height: 150 + (browser.msie8 ? 2 : 0)});
    }

    cur.nav.push(Fave.nav);
  },

  nav: function(changed, oldLoc, newLoc) {
    if (changed[0] !== undefined) {
      return;
    }

    var newSection = changed.section;
    delete(changed.section);
    if (newSection === false) return;

    if (!isEmpty(changed) || newSection === undefined || newSection == cur.section) {
      if (cur.section == 'faces') {
        Fave.facesOther();
        return false;
      }
      return;
    }
    Fave.switchTab(newSection || 'likes_photo');
    return false;
  },
  itemOver: function(post) {
    if (!vk.id) return;

    var lnk = ge('like_link' + post), icon = ge('like_icon' + post), no_likes = hasClass(icon, 'no_likes');
    if (!lnk) {
      return;
    }
    if (lnk.timeout) {
      clearTimeout(lnk.timeout);
      removeAttr(lnk, 'timeout');
    } else {
      lnk.style.visibility = 'visible';
      animate(lnk, {opacity: 1}, 200);
      if (no_likes) {
        icon.style.visibility = 'visible';
        animate(icon, {opacity: 0.4}, 200);
      }
    }
  },
  itemOut: function(post) {
    if (!vk.id) return;
    var lnk = ge('like_link' + post), icon = ge('like_icon' + post), hid = function(el) {
      el.style.visibility = 'hidden';
    }
    if (!lnk) {
      return;
    }
    lnk.timeout = setTimeout(function() {
      removeAttr(lnk, 'timeout');
      animate(lnk, {opacity: 0}, 200, hid.pbind(lnk));
      if (hasClass(icon, 'no_likes')) {
        animate(icon, {opacity: 0}, 200, hid.pbind(icon));
      }
    }, 0);
  },
  facesOther: function(noshow) {
    var other = ge('fave_faces_more');
    var cont = ge('fave_face_cont');
    if (!noshow) {
      if (other.firstChild) {
        cont.innerHTML = '';
        cont.appendChild(other.firstChild);
      } else {
        var needShow = 1;
        lockButton(ge('faces_other_btn'));
      }
    }

    if (other.childNodes.length < 5) {
      ajax.post('fave', {act: 'preload_faces'}, {
        onDone: function(rows) {
          for(var i in rows) {
            other.appendChild(ce('div', {innerHTML: rows[i]}));
          }
          cur.faveNeedFaces = false;
          if (needShow) {
            Fave.facesOther();
            unlockButton(ge('faces_other_btn'));
          }
        }
      });
      cur.faveNeedFaces = 1;
    }
  },

  removeTip: function(el) {
    showTooltip(el, {
      text: getLang('fave_delete'),
      shift: [13, 1, 1],
      black: 1
    });
  },
  remove: function(el, uid, user, hash, ev) {
    if (el.tt && el.tt.destroy) el.tt.destroy();
    showFastBox({title: getLang('global_warning'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('fave_sure_delete').replace('{user}', user), getLang('global_delete'), function() {
      if (isVisible(curBox().progress)) return;

      ajax.post('al_fave.php', {act: 'unfave_user', uid: uid, hash: hash}, {onDone: function() {
        if (cur.qsorterEl) {
          cur.qsorterEl.destroy();
        }
        val('fave_search', '');
        cur.prevQuery = '';
        for (var i = 0, l = cur.faveData.faveUsers.length; i < l; ++i) {
          if (cur.faveData.faveUsers[i].id == uid) {
            cur.faveData.faveUsers.splice(i, 1);
            break;
          }
        }
        if (!cur.faveData.faveUsers.length) return nav.reload();
        Fave.indexAll();
        cur.lang['users_summary'] = geByClass1('summary', ge('users')).innerHTML = getLang('fave_N_users', cur.faveData.faveUsers.length);
        Fave.drawUsers(cur.faveData.faveUsers);
        show(ge('users_online'));
        if (ge('fave_user_div_onl' + uid)) {
          re('fave_user_div_onl' + uid);
          var onlcnt = geByClass('fave_user_div', ge('users_online_content')).length;
          if (onlcnt > 0) {
            val(geByClass1('summary', ge('users_online')), getLang('fave_N_users_online', onlcnt));
          } else {
            re('users_online');
          }
        }
        cur.qsorterRowClass = 'fave_user_div';
        cur.qsorterRowUpClass = 'fave_user_div fave_user_div_up';
        cur.qsorterNoOperaStyle = true;
        cur.qsorterSetSize = true;
        cur.qsorterEl = qsorter.init('users_content', {onReorder: Fave.reorderFave, xsize: 5, width: 120, height: 150 + (browser.msie8 ? 2 : 0)});
        curBox().hide();
      }, progress: curBox().progress});
    }, getLang('global_cancel'));
    return cancelEvent(ev);
  },
  bigphOver: function(obj, uid) {
    if (!cur.lang || !cur.lang.global_photo_full_size || browser.mobile) return;
    var o = obj.firstChild, ch = cur.bigphCache[uid];
    if (o.tagName != 'A' || o.className != 'fave_uph') {
      (o = obj.insertBefore(ce('a', {className: 'fave_uph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="fave_uph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild)).onclick = Fave.bigphClick.pbind(uid);
      o._uid = uid;
    }

    clearTimeout(o.hideTO);
    animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    cur.bigphShown[uid] = o;

    if (ch === undefined) {
      cur.bigphCache[uid] = 'load';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
        if (!res) {
          obj.onmouseover = function() {};
          re(obj.firstChild);
          return;
        }
        var sh = (cur.bigphCache[uid] == 'show');
        cur.bigphCache[uid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) Fave.bigphClick(uid);
      }, onFail: function() {
        obj.onmouseover = function() {};
        re(obj.firstChild);
        return true;
      }});
    }

    if (!obj.onmouseout) obj.onmouseout = Fave.bigphOut.pbind(obj);
  },
  bigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'fave_uph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 100}, 200);
      delete(cur.bigphShown[o._uid]);
    }, 150);
  },
  bigphClick: function(uid, ev) {
    if (checkEvent(ev) !== false) return;

    var ch = cur.bigphCache[uid];
    if (ch == 'load' || ch == 'show') {
      cur.bigphCache[uid] = 'show';
      return cancelEvent(ev);
    }
    if (!ch) return;
    return showPhoto(ch._id, 'album' + uid + '_0/rev', extend({jumpTo: {z: 'albums' + uid}}, ch), ev);
  }
}

try{stManager.done('fave.js');}catch(e){}
