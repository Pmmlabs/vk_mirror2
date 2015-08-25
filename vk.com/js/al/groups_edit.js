var GroupsEdit = {
  uInit: function(opts) {
    GroupsEdit.uInitScroll();
    extend(cur, {
      opts: opts,
      oid: -opts.id,
      tab: opts.tab,
      searchInp: ge('gedit_users_search_inp'),
      index: {},
      cache: {},
      offsets: {},
      htmls: {},
      allshown: {},
      rnd: irand(0, 10000),

      bigphCache: {},
      bigphShown: {},
      lang: extend(cur.lang || {}, opts.lang)
    });
    placeholderSetup(cur.searchInp, {back: true});
    elfocus(cur.searchInp);
    cur.nav.push(GroupsEdit.uNav);
    cur.destroy.push(function(c) {
      if (c == cur) GroupsEdit.uDeinitScroll();
    });
    if (cur.opts.admin) GroupsEdit.uIndex('admins', cur.opts.data.admins);
    GroupsEdit.uStart();
  },
  uNav: function(ch, from, to) {
    if (ch[0] || cur.noLocNav) return;
    var oldTab = cur.tab, newTab = to.tab || 'members';
    delete(ch.tab);
    if (!isEmpty(ch) || newTab == oldTab) return;

    GroupsEdit.uResetSearch();

    replaceClass(domPN(ge('gedit_tab_' + oldTab)), 'summary_tab_sel', 'summary_tab');
    replaceClass(domPN(ge('gedit_tab_' + newTab)), 'summary_tab', 'summary_tab_sel');
    hide('gedit_users_' + oldTab);
    show('gedit_users_' + newTab);

    cur.tab = newTab;

    GroupsEdit.uResetSearch();
    GroupsEdit.uStart();

    nav.setLoc(to);
    return false;
  },
  uStart: function() {
    var tab = cur.tab, d = cur.opts.data[tab], nd = d, rnd = cur.rnd, ph = getLang('groups_users_search');
    cur.qShown = false;
    if (cur.opts.counts[tab] > 1000 || d == 'lazy') {
      if (d == 'lazy') {
        cur.opts.data[tab] = d = false;
      }
      if (!d) {
        cur.offsets[tab] = ge('gedit_users_rows_' + tab).childNodes.length;
        nd = 'notavail';
        if (cur.offsets[tab] < cur.opts.counts[tab]) {
          ajax.post('groupsedit.php', {
            act: 'get_more', id: cur.opts.id, tab: tab, offset: cur.offsets[tab]
          }, {cache: 1});
        }
      }
    } else if (!d || d == 'notavail') {
      nd = 'loading';
      delete(cur.offsets[tab]);
      ajax.post('groupsedit.php', {act: 'get_list', id: cur.opts.id, tab: tab}, {onDone: function(cnt, res) {
        if (cur.rnd != rnd) return;
        cur.opts.counts[tab] = cnt;
        GroupsEdit.uIndex(tab, res);
      }});
    }
    if (tab == 'admins') {
      show('gedit_users_admsearch_btn');
      hide('gedit_users_search_btn');
      removeClass(ge('gedit_reset_search'), 'gedit_search_wide');
      removeClass(ge('gedit_users_search_inp'), 'gedit_search_wide');
    } else {
      hide('gedit_users_admsearch_btn');
      show('gedit_users_search_btn');
      addClass(ge('gedit_reset_search'), 'gedit_search_wide');
      addClass(ge('gedit_users_search_inp'), 'gedit_search_wide');
    }
    cur.opts.data[tab] = nd;
    if (nd == 'notavail' && (tab == 'declined' || tab == 'requests' || tab == 'invites')) {
      ph = getLang('groups_users_lnksearch');
    }
    val(geByClass1('input_back_content', domPS(cur.searchInp)), ph);
    GroupsEdit.uUpdateBack();
  },
  uInitScroll: function() {
    GroupsEdit.scrollnode = browser.msie6 ? pageNode : window;
    GroupsEdit.uDeinitScroll();
    addEvent(GroupsEdit.scrollnode, 'scroll', GroupsEdit.uScroll);
    addEvent(window, 'resize', GroupsEdit.uScroll);
  },
  uDeinitScroll: function() {
    removeEvent(GroupsEdit.scrollnode, 'scroll', GroupsEdit.uScroll);
    removeEvent(window, 'resize', GroupsEdit.uScroll);
  },
  uScroll: function() {
    if (browser.mobile) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY(), lnk = ge('gedit_users_more_' + cur.tab);

    if (!isVisible(lnk)) return;
    if (st + ch > lnk.offsetTop) {
      lnk.onclick();
    }
  },
  uUpdateBack: function() {
    var text = (cur.tab == 'members' || cur.tab == 'unsure') ? getLang('groups_back_to_people') : ((cur.tab == 'admins') ? getLang('groups_back_to_leaders') : false);
    if (text) {
      cur._back = {
        text: text,
        show: [GroupsEdit.uInitScroll, elfocus.pbind(cur.searchInp)],
        hide: [GroupsEdit.uDeinitScroll]
      };
    } else {
      cur._back = false;
    }
  },
  uIndex: function(tab, res, noRefresh) {
    cur.opts.data[tab] = res;
    cur.cache[tab] = {all: []};
    for (var i = 0, count = res.length; i < count; ++i) {
      cur.cache[tab].all.push(i);
    }
    cur.index[tab] = new vkIndexer(cur.cache[tab].all, function(obj) {
      return cur.opts.data[tab][obj][2];
    }, noRefresh ? function(){} : GroupsEdit.uSearchUpdate);
  },
  uResetSearch: function() {
    val(cur.searchInp, '');
    elfocus(cur.searchInp);
    GroupsEdit.uSearchUpdate();
  },
  uSearch: function() {
    var q = trim(val(cur.searchInp)), tab = cur.tab, d = cur.opts.data[tab];
    clearTimeout(cur.updateTimer);
    if (d == 'notavail') {
      if (q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
        return GroupsEdit.uGetPage();
      }
    }
    if (tab == 'admins' && q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
      return GroupsEdit.uEditAdmin(GroupsEdit.uGetAddr(q));
    }
    if (tab == 'members' || tab == 'unsure' || tab == 'admins') {
      return nav.go('/search?c[section]=people&gid=' + cur.opts.id + '&c[q]=' + encodeURIComponent(q) + '&from=' + tab, false, {noback: false});
    }
    return GroupsEdit.uSearchUpdate(true);
  },
  uGetAddr: function(lnk) {
    var m = lnk.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/(.+)$/), result = m[4].substr(m[4].indexOf('#') + 1).replace(/^[\/\!]*/, '');
    if (m = result.match(/^profile\.php\?id=(\d+)/)) {
      result = intval(m[1]);
    } else {
      if (result.indexOf('?') !== -1) result = result.substr(0, result.indexOf('?'));
      if (m = result.match(/^id(\d+)/)) {
        result = intval(m[1]);
      }
    }
    return result;
  },
  uSearchUpdate: function(force) {
    if ((cur.searchInp || {}).id != 'gedit_users_search_inp') return;

    var q = trim(val(cur.searchInp)), tab = cur.tab, d = cur.opts.data[tab];
    toggle('gedit_reset_search', !!q);
    toggle('gedit_users_additional_admins', !q && domFC(ge('gedit_users_rows_additional_admins')));
    if (!q) cur.searched = false;
    clearTimeout(cur.updateTimer);
    if (d == 'notavail') {
      if (q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
        cur.updateTimer = setTimeout(GroupsEdit.uGetPage, 1000);
        return;
      }
      if (q && force !== true) {
        cur.updateTimer = setTimeout(GroupsEdit.uSearchUpdate.pbind(true), 1000);
        return;
      }
      var cont = ge('gedit_users_rows_' + tab), more = ge('gedit_users_more_' + tab), el;
      if (q) {
        if (!cur.htmls[tab]) cur.htmls[tab] = cont;
        hide(more, 'gedit_users_summaryw_' + tab);
        domPN(cont).replaceChild(ce('div', {
          id: 'gedit_users_tmp_' + tab,
          className: 'gedit_users_rows',
          innerHTML: GroupsEdit.uGenEmpty(getLang((tab == 'members' || tab == 'unsure' || tab == 'admins' ? 'groups_too_many_enter' : 'groups_too_many_for_search')))
        }), cont);
      } else {
        if (cur.htmls[tab]) {
          el = ge('gedit_users_tmp_' + tab);
          domPN(el).replaceChild(cur.htmls[tab], el);
          debugLog(domPN(ge(domFC(el).id)));
          if (domFC(el).className == 'gedit_user' && domPN(ge(domFC(el).id)) == cur.htmls[tab]) {
            cur.htmls[tab].replaceChild(domFC(el), ge(domFC(el).id));
          }
          toggle(more, cur.offsets[tab] < cur.opts.counts[tab]);
          show('gedit_users_summaryw_' + tab);
          cur.htmls[tab] = el = false;
        }
        GroupsEdit.uUpdateSummary();
      }
    } else if (d != 'loading') {
      GroupsEdit.uShowMore(true);
    }
  },
  uUpdateSummary: function() {
    var tab = cur.tab, add = (tab == 'requests') ? '<span class="divide">|</span><span><a onclick="GroupsEdit.uApproveAll()">' + getLang('groups_approve_all') + '</a></span>' : '';
    if (trim(val(cur.searchInp)) || !isVisible('gedit_users_summaryw_' + tab)) return;

    if (cur.opts.counts[tab] > 0) {
      val('gedit_users_summary_' + tab, getLang(cur.opts.summaries[tab], cur.opts.counts[tab], true) + add);
    } else {
      val('gedit_users_summary_' + tab, cur.opts.noSummaries[tab]);
    }
  },
  uApproveAll: function() {
    var box = showFastBox(
      {title: getLang('groups_invitations_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'},
      getLang('groups_sure_approve_all'),
      getLang('groups_approve_all'),
      GroupsEdit.uDoApproveAll.pbind(0),
      getLang('global_cancel')
    );
  },
  uDoApproveAll: function(partcount) {
    if (!curBox()) return;

    ajax.post('groupsedit.php', {act: 'approve_all', id: cur.opts.id, hash: cur.opts.hash, part_count: partcount}, {
      onDone: function(text, done) {
        if (text === false) return GroupsEdit.uDoApproveAll(done);

        if (curBox()) curBox().hide();
        GroupsEdit.uShowMessage(text);

        var l = nav.objLoc;
        if (done) {
          delete(l.tab);
        } else {
          l.tab = 'requests';
        }
        nav.go(l, false, {nocur: true});
      }, progress: curBox().progress
    });
  },
  uShowMore: function(force) {
    var tab = cur.tab, d = cur.opts.data[tab], q = trim(val(cur.searchInp)), highlight = false, rnd = cur.rnd;
    if (!d || d == 'loading' || d == 'notavail' && force || d == 'lazy') return;

    if (d == 'notavail') {
      ajax.post('groupsedit.php', {
        act: 'get_more',
        id: cur.opts.id,
        tab: tab,
        offset: cur.offsets[tab]
      }, {onDone: function(count, html) {
        if (cur.rnd != rnd || cur.searched) return;

        cur.opts.counts[tab] = count;
        var el = ce('div', {innerHTML: html}), cont = ge('gedit_users_rows_' + tab), i;
        for (i = domFC(el); i; i = domFC(el)) {
          if (ge(i.id)) {
            el.removeChild(i);
          } else {
            cont.appendChild(i);
            ++cur.offsets[tab];
          }
        }
        if (cur.offsets[tab] < cur.opts.counts[tab]) {
          ajax.post('groupsedit.php', {
            act: 'get_more', id: cur.opts.id, tab: tab, offset: cur.offsets[tab]
          }, {cache: 1});
        }
      }, cache: 1});
      return;
    }
    var lst = cur.cache[tab].all, m;
    if (force) {
      GroupsEdit.uUpdateSummary();
      if (cur.qShown === q) return;
      cur.qShown = q;
    }
    if (q) {
      if (q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
        var addr = GroupsEdit.uGetAddr(q);
        lst = [];
        for (var i = 0, l = d.length; i < l; ++i) {
          if (d[i][0] == addr || d[i][1] == '/' + addr) {
            lst.push(i);
          }
        }
      } else {
        lst = cur.cache[tab]['_' + q];
        if (lst === undefined) {
          var tmp = cur.index[tab].search(q), mp = {};
          lst = [];
          for (var i = 0, l = tmp.length; i < l; ++i) {
            if (!mp[tmp[i]]) {
              mp[tmp[i]] = true;
              lst.push(tmp[i]);
            }
          }
          lst.sort(function(a,b){return a-b;});
          cur.cache[tab]['_' + q] = lst;
        }
        highlight = GroupsEdit.uGetHighlight(q);
      }
    }

    var len = lst.length, cont = ge('gedit_users_rows_' + tab), more = ge('gedit_users_more_' + tab);
    if (!len) {
      hide(more, 'gedit_users_summaryw_' + tab);
      val(cont, GroupsEdit.uGenEmpty(q ? cur.opts.nfound[tab] : getLang('groups_no_users_in_club')));
      return;
    }

    var start = force ? 0 : cont.childNodes.length, end = Math.min(len, start + 20), html = [];
    for (var i = start; i < end; ++i) {
      var row = d[lst[i]], name = (row || {})[2];
      if (!row) continue;
      if (highlight) {
        name = name.replace(highlight.re, highlight.val);
      }
      html.push(GroupsEdit.uGenRow(tab, row, name));
    }

    if (force) {
      val(cont, html.join(''));
      show('gedit_users_summaryw_' + tab);
      if (q) {
        val('gedit_users_summary_' + tab, getLang('groups_found_n_users', len, true));
      } else {
        GroupsEdit.uUpdateSummary();
      }
    } else {
      cont.innerHTML += html.join('');
    }
    toggle(more, end < len);
  },
  uGetPage: function(force) {
    var q = trim(val(cur.searchInp)), tab = cur.tab, rnd = cur.rnd;
    if (force !== true && cur.searched === q) return;

    cur.searched = q;
    ajax.post('groupsedit.php', {act: 'get_page', id: cur.opts.id, tab: tab, addr: GroupsEdit.uGetAddr(q)}, {
      onDone: function(html, found) {
        if (cur.rnd != rnd) return;

        var cont = ge('gedit_users_rows_' + tab);
        if (!cur.htmls[tab]) cur.htmls[tab] = cont;
        hide('gedit_users_more_' + tab);
        if (found) {
          show('gedit_users_summaryw_' + tab);
          val('gedit_users_summary_' + tab, getLang('groups_found_n_users', 1, true));
        } else {
          hide('gedit_users_summaryw_' + tab);
        }
        if (cont) {
          domPN(cont).replaceChild(ce('div', {
            id: 'gedit_users_tmp_' + tab,
            className: 'gedit_users_rows',
            innerHTML: html
          }), cont);
        } else {
          val('gedit_users_tmp_' + tab, html);
        }
      }
    });
  },
  uGetHighlight: function(q) {
    var indxr = cur.index[cur.tab], delimiter = indxr.delimiter, trimmer = indxr.trimmer;

    q += ' ' + (parseLatin(q) || '');
    q = escapeRE(q).replace(/&/g, '&amp;');
    q = q.replace(trimmer, '').replace(delimiter, '|');
    return {
      re: new RegExp('(' + q + ')', 'gi'),
      val: '<span class="gedit_user_highlight">$1</span>'
    }
  },
  uGenEmpty: function(text) {
    return '<div class="gedit_users_none">' + text + '</div>';
  },
  uGenRow: function(tab, row, name) {
    var oid = row[0], href = row[1], photo = row[3], sex = row[4], infoArr = row[5], level = row[6], hash = row[7], info = '', btns = '', actions = '', nm = name || row[2], q = cur.qShown;
    if (!name && q && !q.match(/^(https?:\/\/)?([a-z0-9]+\.)*(vkontakte\.ru|vk\.com)\/.+/)) {
      highlight = GroupsEdit.uGetHighlight(q);
      nm = nm.replace(highlight.re, highlight.val);
    }
    if (infoArr[0]) { // uni
      info += '<div class="gedit_user_uni">' + infoArr[0] + '</div>';
    }
    if (level > 0) {
      info += '<div class="gedit_user_level">' + cur.opts.levels[level] + '</div>';
    }
    if (infoArr[1]) { // online
      info += '<div class="gedit_user_online">' + (getLang('global_online', sex) + (infoArr[1] > 0 && infoArr[1] < 6 ? '<b class="mob_onl gedit_mob_onl" onmouseover="mobileOnlineTip(this, {mid: ' + oid + '})" onclick="mobilePromo()"></b>' : '')) + '</div>';
    }

    switch (tab) {
      case 'requests':
        if (level == -3) {
          btns = [
'<div class="gedit_user_buttons">',
  '<div class="gedit_btns_text">', getLang('groups_limit_message_autoremoved'),
  '</div>',
'</div>'
          ].join('');
        } else if (level == -1) { // request
          btns = [
            '<div class="gedit_user_buttons">',
            '<div class="button_blue fl_l">',
            '<button onclick="GroupsEdit.uAction(this, ', oid, ', \'', hash, '\', 1)">', getLang('groups_members_application_admit'), '</button>',
            '</div>',
            '<div class="button_cancel gedit_user_cancel_button fl_l">',
            '<div class="button" onclick="GroupsEdit.uAction(this, ', oid, ', \'', hash, '\', -1)">', getLang('groups_members_application_decline'), '</div>',
            '</div>',
            '</div>'].join('');
        } else { // declined or approved request
          btns = [
'<div class="gedit_user_buttons">',
  '<div class="gedit_btns_text">', getLang(level < 0 ? 'groups_request_declined' : 'groups_request_accepted'),
    ' <a onclick="GroupsEdit.uAction(this, ', oid, ', \'', hash, '\', 0)">', getLang('global_cancel'), '</a>',
  '</div>',
'</div>'].join('');
        }
      break;

      case 'members':
      case 'unsure':
      case 'admins':
        if (level > 3) {
          if (level < 6) {
            actions += '<a class="gedit_user_action" onclick="GroupsEdit.uMainAdmin()">' + getLang('Edit') + '</a>';
          }
        } else if (level > 0) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uEditAdmin(' + oid + ')">' + getLang('Edit') + '</a>';
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uRemoveAdmin(' + oid + ')">' + getLang('group_managers_demote') + '</a>';
        } else if (!level && cur.opts.admin) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uEditAdmin(' + oid + ')">' + getLang('groups_members_appoint_manager') + '</a>';
        }
        if (level < 0) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', 0)">' + getLang('groups_restore_member') + '</a>';
        } else if (level < 3) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', -1)">' + getLang('groups_members_delete') + '</a>';
        }
      break;

      case 'declined':
        if (level < 0) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', 0)">' + getLang('groups_restore_member') + '</a>';
        } else {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', -1)">' + getLang('groups_members_delete') + '</a>';
        }
      break;

      case 'invites':
        if (level < 0) {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', 0)">' + getLang('groups_send_invitation') + '</a>';
        } else {
          actions += '<a class="gedit_user_action" onclick="GroupsEdit.uAction(this, ' + oid + ', \'' + hash + '\', -1)">' + getLang('groups_members_invitations_cancel') + '</a>';
        }
      break;
    }

    return [
'<div id="gedit_user_', tab, oid, '" class="gedit_user">',
  '<div class="gedit_user_bigph_wrap fl_l" onmouseover="GroupsEdit.bigphOver(this, ', oid, ')">',
    '<a class="gedit_user_thumb" href="', href, '"><img class="gedit_user_img" src="', photo, '" /></a>',
  '</div>',
  '<div class="gedit_user_info fl_l">',
    '<div class="gedit_user_name"><a class="gedit_user_lnk" href="', href, '">', nm, '</a></div>',
    info,
    '<div class="gedit_user_btns">', btns, '</div>',
  '</div>',
  '<div class="gedit_user_actions fl_r">', actions, '</div>',
'</div>'].join('');
  },
  bigphOver: function(obj, uid) {
    if (!cur.lang || !cur.lang.global_photo_full_size || browser.mobile) return;
    var o = obj.firstChild, ch = cur.bigphCache[uid];
    if (o.tagName != 'A' || o.className != 'gedit_bigph') {
      o = obj.insertBefore(ce('a', {className: 'gedit_bigph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="gedit_bigph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild);
    }
    if (!o.onclick) o.onclick = GroupsEdit.bigphClick.pbind(uid);
    if (!o._uid) o._uid = uid;

    clearTimeout(o.hideTO);
    animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    cur.bigphShown[uid] = o;

    if (!obj.onmouseout) obj.onmouseout = GroupsEdit.bigphOut.pbind(obj);
  },
  bigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'gedit_bigph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 100}, 200);
      delete(cur.bigphShown[o._uid]);
    }, 150);
  },
  bigphClick: function(uid, ev) {
    if (checkEvent(ev) !== false) return;

    var ch = cur.bigphCache[uid], o = cur.bigphShown[uid], obj = domPN(o);
    if (!o || !obj) return;
    if (ch === undefined) {
      ch = cur.bigphCache[uid] = 'show';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
        if (!res) {
          obj.onmouseover = function() {};
          re(o);
          return;
        }
        var sh = (cur.bigphCache[uid] == 'show');
        cur.bigphCache[uid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) GroupsEdit.bigphClick(uid);
      }, onFail: function() {
        obj.onmouseover = function() {};
        re(o);
        return true;
      }});
    }
    if (ch == 'show') {
      return cancelEvent(ev);
    }
    if (!ch) return;
    return showPhoto(ch._id, 'album' + uid + '_0/rev', extend({jumpTo: {z: 'albums' + uid}}, ch), ev);
  },
  uShowMessage: function(txt) {
    showDoneBox(txt);
  },
  uEditAdmin: function(user) {
    showBox('groupsedit.php', {act: 'edit_admin', id: cur.opts.id, addr: user}, {params: {dark: 1, bodyStyle: 'padding: 20px;'}});
  },
  uRemoveAdmin: function(user) {
    return showBox('groupsedit.php', {act: 'edit_admin', id: cur.opts.id, addr: user, remove: 1}, {params: {dark: 1, bodyStyle: 'padding: 20px;'}});
  },
  uDoneAdmin: function(mid, hash) {
    var level = intval(radioBtns['admlevel'].val);
    if (cur.notSureAdmin && level >= 3) {
      return showFastBox({title: getLang('groups_admin_warning_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, cur.notSureAdmin, getLang('groups_admin_do_add'), function() {
        curBox().hide();
        cur.notSureAdmin = false;
        GroupsEdit.uDoneAdmin(mid, hash);
      }, getLang('global_back'));
    }
    ajax.post('groupsedit.php', {
      act: 'done_admin',
      id: cur.opts.id,
      addr: mid,
      level: level,
      contact: isChecked('gedit_admbox_check'),
      position: val('gedit_admbox_position'),
      email: val('gedit_admbox_email'),
      phone: val('gedit_admbox_phone'),
      hash: hash
    }, {onDone: function(msg, row) {
      var tabs = ['members', 'unsure', 'admins'], i;

      var rem = curBox().uRemove;
      if (!rem) {
        curBox().hide();
        if (msg) GroupsEdit.uShowMessage(msg);
      }
      if (!row) return;

      for (i = 0; i < 3; ++i) {
        var t = tabs[i], d = cur.opts.data[t], found = false, j, k, l, el;
        if (isArray(d)) {
          for (j = 0, l = d.length; j < l; ++j) {
            if (d[j][0] == mid) {
              found = true;
              if (t == 'admins') {
                if (row[6] > 0 && d[j][6] <= 0) {
                  ++cur.opts.counts[t];
                } else if (row[6] <= 0 && d[j][6] > 0) {
                  --cur.opts.counts[t];
                }
              }
              cur.opts.data[t][j] = row;
              break;
            }
          }
        }
        if (t == 'admins' && !found && level) {
          cur.opts.data[t].unshift(row);
          ++cur.opts.counts['admins'];
          val(cur.searchInp, '');
          GroupsEdit.uIndex(t, cur.opts.data[t]);
        } else {
          if (el = ge('gedit_user_' + t + mid)) {
            domPN(el).replaceChild(se(GroupsEdit.uGenRow(t, row)), el);
          }
          if (!found) {
            ajaxCache = {};
          }
        }
        GroupsEdit.uUpdateSummary();
      }
      if (rem) GroupsEdit.uAction(false, rem[0], rem[1], rem[2]);
    }, showProgress: curBox().showProgress, hideProgress: curBox().hideProgress});
  },
  uMainAdmin: function() {
    showBox('groupsedit.php', {act: 'main_admin', id: cur.opts.id}, {params: {dark: 1, bodyStyle: 'padding: 20px;'}});
  },
  uInitAdmin: function(box, hosts, extcur, lng) {
    box.setOptions({onClean: function() {
      if (window.WideDropdown) {
        WideDropdown.deinit('gedit_host_dd');
      }
    }});
    extend(cur, extcur, {
      lang: extend(cur.lang || {}, lng)
    });
    WideDropdown.init('gedit_host_dd', {
      defaultItems: hosts,
      noResult: getLang('groups_host_not_found'),
      introText: getLang('groups_choose_host'),
      onItemSelect: function(sel) {
        ge('gedit_hostbox_thumb').href = ge('gedit_hostbox_name').href = sel[4];
        ge('gedit_hostbox_img').src = sel[3];
        val(ge('gedit_hostbox_name'), sel[1]);
        cur.hostSel = sel;
        WideDropdown.clear('gedit_host_dd');
        return false;
      }
    });
    WideDropdown.select('gedit_host_dd', false, cur.hostSel);
    box.removeButtons().addButton(getLang('global_cancel'), box.hide, 'no');
    box.addButton(getLang('global_save'), GroupsEdit.uSaveAdmin);
  },
  uSaveAdmin: function() {
    ajax.post('groupsedit.php', {
      act: 'save_admin', id: cur.hostGid, oid: cur.hostSel[0], from: cur.hostFrom, hash: cur.hostHash
    }, {
      onDone: function(row, admrows, msg) {
        if (cur.hostFrom == 'page') {
          curBox().hide();
          showDoneBox(msg);
          domPN(ge('event_admin')).replaceChild(se(row), ge('event_admin'));
          return;
        }
        var t = 'admins';
        toggle('gedit_users_additional_' + t, !!admrows);
        val('gedit_users_rows_additional_' + t, admrows);
        var last = cur.opts.data[t][cur.opts.data[t].length - 1];
        if (el = ge('gedit_user_' + t + row[0])) {
          domPN(el).replaceChild(se(GroupsEdit.uGenRow(t, row)), el);
        }
        if (row[0] > 0 && last[0] < 0) {
          cur.opts.data[t].pop();
          --cur.opts.counts[t];
          if (el = ge('gedit_user_' + t + last[0])) {
            domPN(el).removeChild(el);
          }
        } else if (row[0] < 0 && last[0] > 0) {
          cur.opts.data[t].push(row);
          ++cur.opts.counts[t];
          if (el = ge('gedit_user_' + t + last[0])) {
            domPN(el).appendChild(se(GroupsEdit.uGenRow(t, row)), el);
          }
        } else {
          cur.opts.data[t][cur.opts.data[t].length - 1] = row;
          if (el = ge('gedit_user_' + t + last[0])) {
            domPN(el).replaceChild(se(GroupsEdit.uGenRow(t, row)), el);
          }
        }
        GroupsEdit.uIndex(t, cur.opts.data[t], true);
        curBox().hide();
        GroupsEdit.uShowMessage(msg);
        if (cur.tab != 'admins') nav.go(extend(nav.objLoc, {tab: 'admins'}));
      },
      showProgress: curBox().showProgress,
      hideProgress: curBox().hideProgress
    });
  },
  uAction: function(el, mid, hash, act) {
    if (!curBox() && (buttonLocked(el) || (domFC(el) || {}).className == 'progress_inline')) return;
    var tab = cur.tab;
    ajax.post('groupsedit.php', {act: 'user_action', id: cur.opts.id, addr: mid, hash: hash, action: act}, {
      onDone: function(row) {
        if (curBox()) curBox().hide();
        if (isArray(row)) {
          var tabs = (tab == 'requests' || tab == 'declined' || tab == 'invites') ? [tab] : ['members', 'unsure', 'admins'], cnt = tabs.length, i;
          for (i = 0; i < cnt; ++i) {
            var t = tabs[i], d = cur.opts.data[t], found = false, j, k, l, el;
            if (isArray(d)) {
              for (j = 0, l = d.length; j < l; ++j) {
                if (d[j][0] == mid) {
                  found = true;
                  cur.opts.data[t][j] = row;
                  if (t != 'admins') {
                    if (act) {
                      --cur.opts.counts[t];
                    } else {
                      ++cur.opts.counts[t];
                    }
                  }
                  break;
                }
              }
            }
            if (el = ge('gedit_user_' + t + mid)) {
              domPN(el).replaceChild(se(GroupsEdit.uGenRow(t, row)), el);
              if (t != 'admins' && d == 'notavail') {
                if (act) {
                  --cur.opts.counts[t];
                  --cur.offsets[t];
                } else {
                  ++cur.opts.counts[t];
                  ++cur.offsets[t];
                }
              }
            }
            if (!found) {
              ajaxCache = {};
            }
          }
          if (tab == 'requests' && act > 0 || tab == 'admins' && act < 0) {
            cur.noLocNav = true;
          }
          GroupsEdit.uUpdateSummary();
        } else if (row) {
          GroupsEdit.uShowMessage(row);
        } else {
          GroupsEdit.uRemoveAdmin(mid).uRemove = [mid, hash, act];
        }
      },
      showProgress: function() {
        if (curBox()) {
          curBox().showProgress();
        } else if (el && el.tagName == 'BUTTON') {
          lockButton(el);
        } else {
          if (!el._s) el._s = val(el);
          val(el, '<span class="progress_inline"></span>');
        }
      },
      hideProgress: function() {
        if (curBox()) {
          curBox().hideProgress();
        } else if (el && el.tagName == 'BUTTON') {
          unlockButton(el);
        } else {
          if (el._s) {
            val(el, el._s);
            el._s = false;
          }
        }
      }
    });
  },

  waitTwitter: function() {
    ajax.post('al_groups.php', {act: 'get_twitter_auth', gid: cur.gid}, {onDone: function(url) {
      if (url) {
        hide(cur.twitterBox.progress);
        ge('group_status_export_data').innerHTML = getLang('groups_authorize_please');
        cur.twitterBox.addButton(getLang('groups_auth_in_twitter'), function() {
          location.href = url;
        });
      } else {
        cur.twitterTimer = setTimeout(GroupsEdit.waitTwitter, 1000);
      }
    }});
  },
  startTwitter: function() {
    cur.twitterBox = showFastBox({title: getLang('groups_status_export'), dark: 1, width: 420, bodyStyle: 'padding: 20px; line-height: 160%;'}, '\
<div class="group_status_export_info">\
  <img class="groups_twitter_icon fl_l" src="/images/twitter_sync.png" />\
  <div class="groups_twitter_info fl_l">\
    <b>Twitter</b><br />' + getLang('groups_twitter_desc') + '\
  </div>\
  <br class="clear" />\
</div>\
<center id="group_status_export_data">' + getLang('groups_external_site_request') + '</center>\
    ');
    cur.twitterBox.setOptions({onHide: clearTimeout.bind(window).pbind(cur.twitterTimer)});
    cur.twitterBox.removeButtons().addButton(getLang('global_cancel'), cur.twitterBox.hide, 'no');
    show(cur.twitterBox.progress);
    ajax.post('al_groups.php', {act: 'get_twitter_auth', gid: cur.gid, first: 1}, {onDone: function() {
      cur.twitterTimer = setTimeout(GroupsEdit.waitTwitter, 1000);
    }});
  },
  checkTwitter: function() {
    ajax.post('al_groups.php', {act: 'get_twitter_name', gid: cur.gid}, {onDone: function(name) {
      if (name) {
        cur.twitterCheckTimer = false;
        var lnk = ge('name_service1');
        lnk.innerHTML = name;
        lnk.href = 'http://twitter.com/' + name;
      } else {
        cur.twitterCheckTimer = setTimeout(GroupsEdit.checkTwitter, 1000);
      }
    }});
  },
  removeTwitter: function() {
    var box = showFastBox({title: getLang('groups_status_export'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('groups_status_confirm'), getLang('global_continue'), function() {
      ajax.post('al_groups.php', {act: 'clear_twitter', gid: cur.gid, hash: cur.hash}, {progress: box.progress});
    }, getLang('global_cancel'));
  },

  getFields: function() {
    var result = {};
    for (var i = 0; i < arguments.length; ++i) {
      var n = arguments[i];
      result[n] = cur.privacy['g_' + n][0];
    }
    return result;
  },
  nbAddr: function() {
    notaBene('group_edit_addr');
  },
  saveInfo: function(state) {
    var name = trim(ge('group_edit_name').value), addr = trim(ge('group_edit_addr').value);
    if (!state) state = 0;

    if (!state && isChecked('group_obscene_stopwords')) {
      return GroupsEdit.saveObsceneWords();
    }

    if (!name) {
      return notaBene(ge('group_edit_name'));
    }
    if (!addr) {
      return GroupsEdit.nbAddr();
    }

    var swInput = ge('group_sw');

    var params = {
      act: 'save',
      gid: cur.gid,
      name: name,
      addr: addr,
      description: trim(ge('group_edit_desc').value),
      website: trim(ge('group_website').value),
      sw: swInput ? trim(swInput.value) : undefined,
      rss: trim(ge('group_rss').value),
      age_limits: radioval('group_age_limits'),
      obscene_filter: isChecked('group_obcene_words'),
      obscene_stopwords: isChecked('group_obscene_stopwords'),
      hash: cur.hash
    }, btn = ge('group_save');

    if (cur.cls == 0 || cur.cls == 2) {
      extend(params, GroupsEdit.getFields(
        'wall', 'photos', 'video', 'audio', 'docs', 'topics', 'wiki', 'access'
      ));
      params.subject = cur.subjectDD.val();
      if (cur.cls == 2) {
        extend(params, {
          start_date: val('group_start_date'),
          finish_date: isVisible('group_edit_finish_time') ? val('group_finish_date') : 0,
          host: cur.hostDD ? cur.hostDD.val() : false,
          email: val('event_mail'),
          phone: val('event_phone')
        });
      }
    } else if (cur.cls == 1) {
      extend(params, {
        pcategory: cur.pcategoryDD.val(),
        psubcategory: cur.psubcategoryDD.val(),
        public_date: val('gedit_public_date')
      });
      each(['enable_replies', 'enable_topics', 'enable_photos', 'enable_video', 'enable_audio', 'enable_links', 'enable_events', 'enable_places', 'enable_contacts'], function(i, v) {
        params[v] = isChecked(v);
      });
    }

    ajax.post('al_groups.php', params, {onDone: function(result, oldaddr) {
      if (result < 0) {
        return GroupsEdit.nbAddr();
      }
      if (result === false) {
        return notaBene(ge('group_edit_name'));
      }
      if (nav.objLoc.act == 'edit_first') {
        return nav.go(nav.objLoc[0]);
      }
      ((cur.privacy['g_wall'][0] > 1 || cur.twitterVal) ? show : hide)('group_edit_twitter');
      var msg = ge('group_saved_msg');
      show(msg);
      msg.style.backgroundColor = '#F4EBBD';
      animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
      scrollToTop();
      if (oldaddr != addr) {
        each(geByTag('a'), function() {
          this.href = this.href.replace(new RegExp('/' + oldaddr + '\\?', 'g'), '/' + addr + '?').replace(new RegExp('/' + oldaddr + '$', 'g'), '/' + addr);
        });
        nav.setLoc({0: addr, act: 'edit'});
        globalHistoryDestroy(oldaddr);
        if (ge('group_edit_addr_print_text')) {
          if (addr != 'club'+cur.gid && addr != 'public'+cur.gid && addr != 'event'+cur.gid) {
            ge('group_edit_addr_print_text').innerHTML = cur.lang['groups_print_text'].replace('{link}', '<a href="/'+addr+'?act=edit&amp;w=print">').replace('{/link}', '</a>');
          } else {
            ge('group_edit_addr_print_text').innerHTML = cur.lang['groups_print_no_domain_text'].replace('{link}', '<span onclick="GroupsEdit.nbAddr()">').replace('{/link}', '</span>');
          }
        }
      }
      globalHistoryDestroy(addr);
    }, showProgress: lockButton.pbind(btn), hideProgress: unlockButton.pbind(btn)});
  },

  checkAddr: function(timeout) {
    clearTimeout(cur.checkAddrTimer);
    if (timeout) {
      var inp = ge('group_edit_addr'), tmp = inp.value.replace(/[^0-9a-zA-Z_\.]/g, '');
      if (tmp != inp.value) inp.value = tmp;
      cur.checkAddrTimer = setTimeout(GroupsEdit.checkAddr.pbind(false), 1000);
      return;
    }
    var val = ge('group_edit_addr').value;
    if (val) {
      ajax.post('al_settings.php', {act: 'check_addr', addr: val, oid: -cur.gid}, {onDone: function(result, text) {
        ge('group_edit_about_addr').innerHTML = text;
      }});
    }
  },
  show: function(elem) {
    if (!isVisible(elem)) {
      slideDown(elem, 150);
    }
  },
  hide: function(elem) {
    if (isVisible(elem)) {
      slideUp(elem, 150);
    }
  },
  init: function(selData) {
    autosizeSetup('group_edit_desc', {
      minHeight: 50,
      maxHeight: 600
    });

    cur.twitterVal = selData.twitter;
    extend(cur, {
      module: 'groups_edit',
      privacy: cur.privacy || {},
      cls: selData.cls
    });
    if (cur.cls == 0 || cur.cls == 2) {
      extend(cur, {
        subjectDD: new Dropdown(ge('group_subject'), selData.subjects, {
          width: cur.cls == 2 ? 266 : 186,
          multiselect: false,
          autocomplete: true,
          introText: getLang('groups_start_typing_subject'),
          noResult: '',
          placeholder: getLang('groups_choose_subject')
        })
      });
      if (selData.subject && selData.subject != '0') {
        cur.subjectDD.val(selData.subject);
      }
    }
    if (cur.cls == 1) {
      extend(cur, {
        pcategoryDD: new Dropdown(ge('public_type'), selData.pcategories, {
          width: 266,
          multiselect: false,
          autocomplete: false,
          onChange: function(v) {
            v = intval(v);
            if (v && (selData.psubcategories[v] || {}).length > 1) {
              cur.psubcategoryDD.setOptions({defaultItems: selData.psubcategories[v]});
              cur.psubcategoryDD.val(0);
              GroupsEdit.show(ge('group_edit_psubcategory'));
            } else {
              GroupsEdit.hide(ge('group_edit_psubcategory'));
            }
            if (selData.plabelsmap[v] !== undefined) {
              val('gedit_public_date_label', selData.plabels[selData.plabelsmap[v]]);
            } else {
              val('gedit_public_date_label', selData.plabels[selData.plabelsmap[0]]);
            }
          }
        }),
        psubcategoryDD: new Dropdown(ge('public_subtype'), selData.psubcategories[selData.pcategory || 0] || [], {
          width: 266,
          multiselect: false,
          autocomplete: false
        }),
        bdPicker: new Daypicker('gedit_public_date', {startYear: 1800, width: 266})
      });
      cur.pcategoryDD.val(selData.pcategory, true);
      cur.psubcategoryDD.val(selData.psubcategory);
    } else if (cur.cls == 2) {
      new Datepicker('group_start_date', {time: 'group_start_time', width: 140, resfmt: 'plain'});
      new Datepicker('group_finish_date', {time: 'group_finish_time', width: 140, resfmt: 'plain'});
      var width = 140 + 2 * 47 + 10, el = geByClass1('group_edit_at', ge('group_edit_start_time'));

      width += el.offsetWidth;
      var toAdd = (266 - width), toAddLeft = Math.floor(toAdd / 2), toAddRight = toAdd - toAddLeft;
      var st = {paddingLeft: toAddLeft + 'px', paddingRight: toAddRight + 'px'};
      setStyle(el, st);
      setStyle(geByClass1('group_edit_at', ge('group_edit_finish_time')), st);

      if (selData.hosts) {
        extend(cur, {
          hostDD: new Dropdown(ge('event_host'), selData.hosts, {
            width: 266,
            multiselect: false,
            autocomplete: false,
            selectedItems: [selData.host]
          })
        });
      }
    }

    cur.destroy.push(function(c) {
      if (c.cls == 0) {
        c.subjectDD.destroy();
      } else if (c.cls == 1) {
        c.pcategoryDD.destroy();
        c.psubcategoryDD.destroy();
      } else if (c.cls == 2) {
        c.subjectDD.destroy();
        if (c.hostDD) c.hostDD.destroy();
      }
    });

    placeholderSetup('group_rss');
  },

  doSearchBlacklist: function() {
    var inp = ge('group_bl_search'), name = trim(inp.value), btn = ge('group_bl_submit');
    if (!name) {
      return elfocus(inp);
    }

    return showBox('al_groups.php', {act: 'bl_edit', name: name, gid: cur.gid}, {stat: ['page.css', 'ui_controls.js', 'ui_controls.css'], dark: 1});
  },
  toggleBlacklist: function(mid, el) {
    if ((domFC(el) || {}).className == 'progress_inline') return;
    ajax.post('al_groups.php', {act: 'bl_user', mid: mid, gid: cur.gid, hash: cur.hash}, {
      onDone: GroupsEdit.updateBlacklist.pbind(cur.gid),
      showProgress: function() {
        if (!el._s) el._s = val(el);
        val(el, '<span class="progress_inline"></span>');
      }, hideProgress: function() {
        if (el._s) {
          val(el, el._s);
          el._s = false;
        }
      }
    });
  },
  editBlacklist: function(mid) {
    showBox('al_groups.php', {act: 'bl_edit', name: 'id' + mid, gid: cur.gid}, {stat: ['page.css', 'ui_controls.js', 'ui_controls.css'], dark: 1});
  },
  updateBlacklist: function(gid, msg, mid, html, delta) {
    if (mid && curBox()) curBox().hide();
    if (msg === 0) return GroupsEdit.editBlacklist(mid);
    if (msg) showDoneBox(msg, {out: 3000});
    if (nav.objLoc[0] == 'search' && nav.objLoc.from == 'ban' && nav.objLoc.gid && mid) {
      return nav.go(
        (ge('club_bl_lnk') || {href: 'club' + nav.objLoc.gid + '?act=blacklist'}).href,
        false,
        {noback: true}
      );
    }
    if (ge('group_bl_rows') && cur.gid == gid) {
      var row = ge('group_bl' + mid), newrow = se(html);
      if (!row && !(delta > 0)) return;

      if (row) {
        domPN(row).replaceChild(newrow, row);
      } else if (delta > 0) {
        var rows = ge('group_bl_rows');
        rows.insertBefore(newrow, domFC(rows));
        re('group_bl_no');
      }
      GroupsEdit.recache(cur.offset, delta);
      GroupsEdit.updateBlacklistSummary(delta);
    }
  },
  updateBlacklistSummary: function(delta) {
    cur.count += delta;
    if (cur.count > 0) {
      ge('group_bl_summary').innerHTML = getLang('groups_X_banned_members', cur.count);
    } else {
      ge('group_bl_summary').innerHTML = getLang('group_no_banned_users');
    }
  },
  scrollResize: function() {
    if (browser.mobile) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();
    var lnk = ge(cur.moreLink);

    if (!isVisible(lnk)) return;
    if (st + ch > lnk.offsetTop) {
      cur.showMore();
    }
  },
  initScroll: function() {
    GroupsEdit.scrollnode = browser.msie6 ? pageNode : window;
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;

    addEvent(GroupsEdit.scrollnode, 'scroll', GroupsEdit.scrollResize);
    addEvent(window, 'resize', GroupsEdit.scrollResize);
    removeEvent(window, 'load', GroupsEdit.initScroll);
  },
  deinitScroll: function() {
    removeEvent(GroupsEdit.scrollnode, 'scroll', GroupsEdit.scrollResize);
    removeEvent(window, 'resize', GroupsEdit.scrollResize);
  },
  recache: function(from, delta) {
    if (cur.loading) {
      cur.loading = 1;
      setTimeout(GroupsEdit.recache.pbind(from, delta), 100);
      return;
    }

    var i = cur.offset, key = '/' + nav.objLoc[0] + '#' + ajx2q(extend({offset: 12345, part: 1}, cur.moreParams));
    var a = ajaxCache[key.replace('12345', i)];
    if (a) {
      a[0] += delta;
      ajaxCache[key.replace('12345', i + delta)] = a;
      delete(ajaxCache[key.replace('12345', i)]);
    }
    cur.offset += delta;
  },
  loaded: function(off, rows) {
    cur.offset = off;

    var cont = ge('group_bl_rows'), d = ce('div', {innerHTML: rows});
    while (d.firstChild) {
      cont.appendChild(d.firstChild);
    }

    if (off >= cur.count || !rows) {
      hide('group_users_more');
      return;
    }
    cur.loading = 1;
    ajax.post(nav.objLoc[0], extend({offset: cur.offset, part: 1}, cur.moreParams), {cache: 1, onDone: function() {
      if (cur.loading == 2) {
        GroupsEdit.loaded.apply(window, arguments);
      } else {
        cur.loading = false;
      }
    }, onFail: function() {
      cur.loading = 0;
      return true;
    }});
  },
  load: function() {
    if (!isVisible('group_users_more') || isVisible('group_more_progress')) return;
    if (cur.loading) {
      cur.loading = 2;
      return;
    }

    ajax.post(nav.objLoc[0], extend({offset: cur.offset, part: 1}, cur.moreParams), {onDone: GroupsEdit.loaded, onFail: function() {
      cur.loading = 0;
      return true;
    }, showProgress: function() {
      show('group_more_progress');
      hide(ge('group_users_more').firstChild);
    }, hideProgress: function() {
      show(ge('group_users_more').firstChild);
      hide('group_more_progress');
    }, cache: 1});
  },

  initLinks: function() {
    placeholderSetup('group_l_search', {back: true});
    elfocus('group_l_search');
    cur.module = 'groups_edit';
    if (!ge('group_l_no')) {
      var cont = ge('group_l_rows');
      sorter.init(cont, {onReorder: GroupsEdit.reorderLinks, dh: 1});
      cur.destroy.push(cont.sorter.destroy);
    }
  },
  reorderLinks: function(lnk, before, after) {
    var lnk_id = lnk.id.replace('group_l_row', '');
    for (; after && (!after.id || isVisible('group_l_restore' + after.id.replace('group_l_row', ''))); ) {
      after = after.previousSibling;
    }
    var after_id = (after && after.id || '').replace('group_l_row', '');
    ajax.post('al_groups.php', {act: 'reorder_links', gid: cur.gid, hash: cur.hash, lid: lnk_id, after: after_id}, {onDone: GroupsEdit.invalidateBack});
  },
  editLink: function(id) {
    showBox('al_groups.php', {act: 'edit_link', lid: id, gid: cur.gid, hash: cur.hash}, {params: {dark: 1, bodyStyle: 'padding: 20px;', width: 422}});
  },
  invalidateBack: function() {
    globalHistoryDestroy(nav.objLoc[0]);
    globalHistoryDestroy('club' + cur.gid);
    globalHistoryDestroy('event' + cur.gid);
  },
  linkAction: function(el, act, id) {
    var del = (act == 'delete_link');
    if (!del && cur.count >= cur.linksLimit) {
      return GroupsEdit.linkMessage('<b>' + getLang('global_unknown_error') + '.</b>', true);
    }

    var params = {act: act, lid: id, gid: cur.gid, hash: cur.hash};
    GroupsEdit.linksCount(cur.count + (del ? -1 : 1));
    if (!del) { // say after what link is that one
      var after = ge('group_l_row' + id).previousSibling
      for (; after && (!after.id || isVisible('group_l_restore' + after.id.replace('group_l_row', ''))); ) {
        after = after.previousSibling;
      }
      params.after = (after && after.id || '').replace('group_l_row', '');
    }
    ajax.post('al_groups.php', params, {onDone: function() {
      GroupsEdit.invalidateBack();
      (del ? hide : show)('group_l_actions' + id);
      (del ? show : hide)('group_l_restore' + id);
    }, onFail: function() {
      GroupsEdit.linksCount(cur.count + (del ? 1 : -1));
    }, showProgress: function() {
      hide('group_l_actions' + id, 'group_l_restore' + id);
      show('group_l_progress' + id);
    }, hideProgress: function() {
      hide('group_l_progress' + id);
      show((del ? 'group_l_actions' : 'group_l_restore') + id);
    }});
  },
  updateImgs: function() {
    if (cur.lnkImages.length > 1) {
      ge('group_al_thumb_img').parentNode.style.cursor = 'pointer';
    }
  },
  rotateImgs: function() {
    if (cur.lnkImages.length < 2) return;

    var index = ((cur.lnkIndex || 0) + 1) % cur.lnkImages.length;
    ge('group_al_thumb_img').src = cur.lnkImages[index];
    cur.lnkIndex = index;
  },
  parseLink: function(url, cuteurl) {
    if (!/https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }
    if (cuteurl && !/https?:\/\//i.test(cuteurl)) {
      cuteurl = 'http://' + cuteurl;
    }
    lockButton(ge('group_l_submit'));

    var cont = ge('group_l_bar');
    re(cur.lnkParse);
    cur.lnkParse = cont.insertBefore(ce('div', {innerHTML: '\
<iframe class="upload_frame" name="link_parse_iframe"></iframe>\
   '}), cont.firstChild);

    var parseForm = cur.lnkParse.appendChild(ce('form', {action: cur.parseUrl, method: 'post', target: 'link_parse_iframe'}));
    each({
      act: 'parse_share',
      from_host: locHost,
      mid: vk.id,
      hash: cur.parseHash,
      rhash: cur.parseRHash,
      url: url
    }, function(i, v) {
      parseForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
    });

    cur.lnkImages = ['/images/lnkouter100.gif'];
    window.onParseDone = function(data) {
      unlockButton(ge('group_l_submit'));
      GroupsEdit.addLinkBox(data.title || '', cuteurl || url);
      if (!data.images || !data.images.length) {
        return;
      }
      cur.addBox.setOptions({onClean: function() {
        clearInterval(cur.imgLoadInterval);
      }});
      for (var i in data.images) {
        var src = '', img = vkImage();
        if (/^\//.test(data.images[i])) {
          src = (/^https:\/\//i.test(url) ? 'https://' : 'http://') + GroupsEdit.getDomain(url);
        } else if (!/^https?:\/\//i.test(data.images[i])) {
          src = url.replace(/[^\/]*$/, '');
          if (/^https?:\/\/$/i.test(src)) {
            src = url + '/';
          }
        }
        img.src = src + data.images[i];
        data.images[i] = img;
      }
      cur.imgLoadInterval = setInterval(function() {
        var nl = 0;
        for (var i in data.images) {
          var img = data.images[i];
          if (!img) continue;
          var w = img.width, h = img.height;
          if (w || h) {
            if (w >= 50 && h >= 20) {
              cur.lnkImages.push(img.src);
              GroupsEdit.updateImgs();
              if (!cur.lnkIndex) GroupsEdit.rotateImgs();
            }
            data.images[i] = false;
          } else {
            ++nl;
          }
        }
        if (!nl) {
          clearInterval(cur.imgLoadInterval);
          cur.imgLoadInterval = true;
        }
      }, 200);
    }

    window.onParseFail = function() {
      unlockButton(ge('group_l_submit'));
      GroupsEdit.addLinkBox('', cuteurl || url);
    }

    parseForm.submit();
  },
  getDomain: function(url) {
    if (url.charAt(0) == '/') return locDomain;
    return url.match(/^(https?:\/\/)?([^\/]+)(\/|$)/)[2];
  },
  addLinkBox: function(title, url) {
    title = trim(clean(title));
    var img = cur.lnkImages[0];
    cur.lnk = url;
    cur.lnkOwnerId = cur.lnkPhotoId = false;
    cur.editing = false;
    cur.addBox = showFastBox({title: cur.boxTitle, dark: 1, width: 420, bodyStyle: 'padding: 20px; line-height: 160%;'}, '\
<div class="group_al_thumb select_fix fl_l" onclick="GroupsEdit.rotateImgs()">\
  <img src="' + img + '" id="group_al_thumb_img" />\
</div>\
<div class="group_al_info fl_l">\
  <input type="text" class="text" id="group_al_title" value="' + title + '" onkeypress="if (event.keyCode == 10 || event.keyCode == 13) GroupsEdit.doAddLink()" placeholder="' + getLang('group_link_add_title') + '" />\
  <div class="group_al_position">' + GroupsEdit.getDomain(url) + '</div>\
</div>\
<br class="clear" />', getLang('global_add'), GroupsEdit.doAddLink, getLang('global_cancel'));
    var inp = ge('group_al_title');
    placeholderSetup(inp, {back: true});
    elfocus(inp);
  },
  addLink: function() {
    var lnk = trim(ge('group_l_search').value).replace(/\s/g, '+');
    if (!lnk) {
      return elfocus('group_l_search');
    }
    cur.lnkIndex = 0;
    ajax.post('al_groups.php', {act: 'add_link_box', lnk: lnk}, {onDone: function(code, innerlnk, html, js) {
      if (code > 0) {
        if (code & 1) { // inner link
          ajax.plainpost(innerlnk, {_tmp: 1}, function(text) {
            var title = trim((text.match(/<title>([^<]*)/i) || {})[1] || '');
            cur.lnkImages = ['/images/lnkinner100.gif'];
            cur.lnk = innerlnk;
            GroupsEdit.addLinkBox(title, innerlnk);
          }, (code & 2) ? GroupsEdit.parseLink.pbind(html, js) : function(text) {
            GroupsEdit.linkMessage(getLang('groups_bad_link'), true);
            return elfocus('group_l_search');
          }, true);
        } else if (code & 2) {
          GroupsEdit.parseLink(innerlnk, html);
        }
      } else if (code < 0) {
        GroupsEdit.linkMessage(getLang('groups_bad_link'), true);
        return elfocus('group_l_search');
      } else {
        cur.lnk = innerlnk;
        cur.lnkOwnerId = cur.lnkPhotoId = false;
        cur.addBox = showFastBox({title: cur.boxTitle, dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, html, getLang('global_add'), GroupsEdit.doAddLink, getLang('global_cancel'));
        cur.addBox.evalBox(js);
      }
    }, showProgress: lockButton.pbind(ge('group_l_submit')), hideProgress: unlockButton.pbind(ge('group_l_submit'))});
  },
  uploadImg: function() {
    show(cur.addBox.progress);
    var cont = ge('group_l_bar');
    var uploadCont = cont.appendChild(ce('div', {innerHTML: '<iframe class="upload_frame" name="link_upload_iframe"></iframe>'})),
        uploadForm = uploadCont.appendChild(ce('form', {action: '/share.php', method: 'post', target: 'link_upload_iframe'}));
    each({
      act: 'a_photo',
      index: 0,
      image: cur.lnkImages[cur.lnkIndex],
      extra: 'link',
      hash: vk.ip_h
    }, function (i, v) {
      uploadForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
    });
    window.onUploadDone = function(index, params) {
      window.onUploadFail = window.onUploadDone = function () {};
      cur.lnkOwnerId = params.user_id;
      cur.lnkPhotoId = params.photo_id;
      cont.removeChild(uploadCont);
      cur.lnkIndex = 0;
      GroupsEdit.doAddLink(true);
    }
    window.onUploadFail = function(index, msg) {
      window.onUploadFail = window.onUploadDone = function () {};
      cont.removeChild(uploadCont);
      cur.lnkIndex = 0;
      GroupsEdit.doAddLink(true);
    }
    cur.lnkOwnerId = cur.lnkPhotoId = false;
    uploadForm.submit();
  },
  linkMessage: function(text, error) {
    var msg = ge('group_l_msg');
    msg.innerHTML = text;
    show(msg);
    var colors = error ? ['#FACEBB', '#FFEFE8', '#E89B88'] : ['#F4EBBD', '#F9F6E7', '#D4BC4C'];
    msg.style.backgroundColor = colors[0];
    each(['Left', 'Top', 'Right', 'Bottom'], function() {
      msg.style['border' + this + 'Color'] = colors[2];
    });
    animate(msg, {backgroundColor: colors[1]}, 2000);
  },
  linksCount: function(count) {
    cur.count = count;
    ge('group_l_summary').innerHTML = count ? getLang('links_count', count) : getLang('links_no_count');
    (count >= cur.linksLimit ? hide : show)('group_l_bar');
  },
  doAddLink: function(force) {
    if (!force && isVisible(cur.addBox.progress)) return;

    var title = ge('group_al_title');
    if (title && cur.lnkIndex) {
      return GroupsEdit.uploadImg();
    }
    var str = (title ? title : ge('group_al_position')).value;
    var params = {
      lnk: cur.lnk,
      index: cur.lnkIndex,
      owner_id: cur.lnkOwnerId,
      photo_id: cur.lnkPhotoId,
      str: str,
      gid: cur.gid,
      lid: cur.editing,
      hash: cur.hash
    }, callback;
    if (cur.editing) {
      params.act = 'do_edit_link';
      callback = function(lid, thumb, title, position) {
        cur.addBox.hide();
        GroupsEdit.invalidateBack();
        if (thumb !== false) ge('group_l_photo' + lid).src = thumb;
        if (title !== false) ge('group_l_title' + lid).innerHTML = title;
        if (position !== false) ge('group_l_position' + lid).innerHTML = position;
      }
    } else {
      params.act = 'add_link';
      callback = function(count, text, row) {
        cur.addBox.hide();
        GroupsEdit.invalidateBack();
        GroupsEdit.linkMessage(text);
        var cont = ge('group_l_rows');
        cont.appendChild(ce('div', {innerHTML: row}).firstChild);
        var no = ge('group_l_no');
        if (no) {
          cont.removeChild(no);
          sorter.init(cont, {onReorder: GroupsEdit.reorderLinks, dh: 1});
          cur.destroy.push(cont.sorter.destroy);
        } else {
          sorter.added(cont);
          sorter.shift(cont);
        }
        GroupsEdit.linksCount(count);
        var s = ge('group_l_search');
        s.setValue('');
        elfocus(s);
      }
    }
    setTimeout(ajax.post.pbind('al_groups.php', params, {onDone: callback, onFail: function(text) {
      cur.addBox.hide();
      GroupsEdit.linkMessage(text || getLang('groups_bad_link'), true);
      return true;
    }, progress: cur.addBox.progress}), 0);
  },

  failed: function(old, text) {
    GroupsEdit.setActive(old);
    if (!text) return;

    setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text).hide, 2000);
    return true;
  },
  getsect: function() {
    var filters = ge('group_edit_filters');
    if (!filters) return;

    var current = filters.firstChild;
    for (; !current.tagName || !hasClass(current, 'active_link');) {
      current = current.nextSibling;
    }
    return current;
  },
  setActive: function(el) {
    var filters = ge('group_edit_filters');
    if (!filters) return;

    var current = GroupsEdit.getsect();
    if (current != el) {
      current.className = '';
      el.className = 'active_link';
    }
  },
  go: function(el, ev) {
    var result = nav.go(el, ev, {onFail: GroupsEdit.failed.pbind(GroupsEdit.getsect())});
    if (result === false) {
      GroupsEdit.setActive(el.parentNode);
    }
  },

  editPlace: function() {
    showBox('al_page.php', {act: 'edit_group_place', gid: cur.gid}, {stat: ['maps.js', 'ui_controls.js', 'ui_controls.css', 'selects.js', 'page.css'], dark: 1});
  },
  onPlaceSave: function(res) {
    ge('group_edit_address_link').innerHTML = res;
  },

  switchAdSubTab: function(el, wrap, link, evt, params) {
    if (checkEvent(evt) || hasClass(el, 'active')) return false;
    each(geByClass('group_ad_subtab1', ge(wrap)), function(i, v) {
      removeClass(v, 'active');
    });
    addClass(el, 'active');
    if (params.part) {
      var obj = nav.fromStr(link), url = obj[0];
      delete obj[0];
      ajax.post(url, extend(obj, {part: 1}), {
        cache: 1,
        onDone: params.onDone.pbind(obj)
      });
      return false;
    }
    return nav.go(link, evt);
  },
  getAdPage: function(offset, wrap) {
    var obj = clone(nav.objLoc), url = obj[0];
    delete obj[0];
    ajax.post(url, extend(obj, {offset: offset, part: 1}), {
      onDone: function(res) {
        ge(wrap || 'group_ad_requests_table_warp').innerHTML = res;
        nav.setLoc(extend(nav.objLoc, {offset: offset}));
      }
    });
    return false;
  },
  getAdWithdrawalPage: function(offset) {
    ajax.post('al_groups.php', {act: 'a_adspost_withdrawal_history', gid: cur.gid, offset: offset}, {
      onDone: function(res) {
        ge('group_ad_withdrawal_table_wrap').innerHTML = res;
      }
    });
    return false;
  },
  updateAdRequest: function(ad_id, request_id, status, hash) {
    return !showBox('/al_groups.php', {act: 'a_adspost_update_request', gid: cur.gid, ad_id: ad_id, request_id: request_id, status: status, hash: hash}, { params: {dark: true}});
  },
  toggleAdOtherSettings: function() {
    if (!isVisible('group_ad_other_settings')) {
      ge('group_ad_other_settings_lnk').innerHTML = getLang('groups_adspost_hide_other_settings');
      slideDown(ge("group_ad_other_settings"), 200);
      GroupsEdit.initAdOtherSettings();
    } else {
      ge('group_ad_other_settings_lnk').innerHTML = getLang('groups_adspost_show_other_settings');
      slideUp(ge("group_ad_other_settings"), 200);
    }
    return false;
  },
  initAdOtherSettings: function() {
    if (cur.adOtherSettingInit) {
      return;
    }
    cur.adOtherSettingInit = true;
    cur.subjectDD = new Dropdown(ge('group_ad_subject'), cur.selData.subjects, {
      width: 246,
      multiselect: false,
      autocomplete: true,
      introText: getLang('groups_start_typing_subject'),
      noResult: '',
      placeholder: getLang('groups_choose_subject')
    });
    if (cur.selData.subject && cur.selData.subject != '0') {
      cur.subjectDD.val(cur.selData.subject);
    }
    cur.destroy.push(function(c) {
      c.subjectDD.destroy();
    });

    for (var k in cur.selData.events) {
      var ev = cur.selData.events[k];
      if (ev[1] >= 0) {
        new Checkbox(ge('notification_event_' + k), {
          label: getLang('groups_adspost_notify_email'),
          checked: ev[1],
          width: 60
        });
      }
      if (ev[2] >= 0) {
        new Checkbox(ge('notification_event_sms_' + k), {
          label: getLang('groups_adspost_notify_sms'),
          checked: ev[2],
          width: 60
        });
      }
    }
  },
  updateAdRecommendedCost: function(subject) {
    ge('group_ad_recom_cost').innerHTML = '<img src="/images/upload.gif" />';
    var params = {act: 'a_adspost_recom_cost', gid: cur.gid};
    if (subject) {
      params.subject = subject;
    }
    ajax.post('al_groups.php', params, {
      onDone: function(msg) {
        ge('group_ad_recom_cost').innerHTML = msg;
      },
      onFail: function(msg) {
        ge('group_ad_recom_cost').innerHTML = '';
        return true;
      }
    });
  },
  saveAdNotificationsSettings: function(hash) {
    var params = {
      act: 'a_adspost_notify_save',
      gid: cur.gid,
      hash: hash,
      events: [],
      sms_events: []
    };
    for (var k in cur.selData.events) {
      params.events.push(k + ':' + ge('notification_event_' + k).value);
      params.sms_events.push(k + ':' + ge('notification_event_sms_' + k).value);
    }
    params.events = params.events.join(',');
    params.sms_events = params.sms_events.join(',');

    hide('ge_ad_notifications_error');
    ajax.post('al_groups.php', params, {
      onDone: function(msg) {
        showDoneBox(msg, {out: 2000});
      },
      onFail: function(msg) {
        cur.showError(msg);
        return true;
      },
      showProgress: lockButton('group_ad_save_notify'),
      hideProgress: unlockButton('group_ad_save_notify')
    });
  },
  showAgeLimitsTT: function(el, title, text, allBlock) {
    showTooltip(el, {
      text: '<div class="age_limits_tt_pointer"></div><div class="age_limits_tt_title">' + title + '</div>' + text.replace('{link}', "<a href=\"https://vk.com/support?act=new\">").replace('{/link}', '</a>'),
      className: 'age_limits_tt',
      slideX: 15,
      shift: [-150, allBlock ? -63 : -50, 3],
      hidedt: 1000,
      nohideover: true
    });
  },
  showAgeLimitsInfo: function() {
    showFastBox({title: getLang('groups_age_limits_title'), dark: 1, width: 500}, '<div class="group_edit_age_limits_box">' + getLang('groups_age_limits_description') + '</div>');
  },
  showAgeLimitsBlock: function() {
    hide('group_edit_limits_link');
    setTimeout(slideDown.pbind('group_edit_limits_wrap', 300), 20);
  },
  showAddrTooltip: function(text) {
    var ttEl = ge('group_edit_addr_table');
    showTooltip(ttEl, {
      text: text,
      className: 'group_addr_tt',
      slide: 15,
      shift: [1, -1, 0],
      nohide: 1,
    });
    ge('group_edit_addr').onblur = function() {
      GroupsEdit.checkAddr();
      if (!ttEl.tt || !ttEl.tt.hide) return;
      ttEl.tt.hide();
    }
  },
  saveObsceneEdit: function(el) {
    cur.obscene.words = val(el).replace(/\&nbsp\;/ig, ' ');
    debugLog(cur.obscene.words);
  },
  saveObsceneWords: function() {
    var words = cur.obscene.words,
        btn = ge('group_save');
    var params = {
      gid : cur.gid,
      act : 'save',
      obscene_words : words,
      hash: cur.hash,
    }
    var onDone = function(code, word) {
      switch (code) {
        case 7:  key = 'obscene_add_pattern_success'; break;
        case -7: key = 'obscene_word_wrong_chars';    break;
        case -6: key = 'obscene_word_too_short';      break;
        default: key = 'obscene_save_patterns_error';
      }
      if (code < 0) {
        words_field = ge('group_edit_obscene_stopwords');
        return notaBene(words_field, 'warning');
      }
      GroupsEdit.saveInfo(1);
    }
    var onFail = GroupsEdit.uShowMessage.pbind(getLang('global_unknown_error'), 0);
    ajax.post('al_groups.php', params, {onDone: onDone, onFail: onFail, showProgress: lockButton.pbind(btn), hideProgress: unlockButton.pbind(btn)});
  },
  deleteObscenePattern: function(pid, hash) {
    var button = ge('groups_obscene_delete_box_button');
    var params = {
      gid     : cur.gid,
      act     : 'a_obscene_delete_pattern',
      delete  : 1,
      pid     : pid,
      hash    : hash || '',
    }
    var onDone = function(code) {
      switch (code) {
        case 7:  key = 'obscene_pattern_deleted'; break;
        default: key = 'obscene_delete_pattern_error';
      }
      GroupsEdit.uShowMessage(getLang(key)+ ' (code: '+ code +')');
      unlockFlatButton(button);
    }
    var onFail = GroupsEdit.uShowMessage.pbind(getLang('global_unknown_error'), 0);

    lockFlatButton(button);
    ajax.post('al_groups.php', params, {onDone: onDone, onFail: onFail});
  },
  addObscenePattern: function(override, hash) {
    var box = curBox(),
        is_box = box && box.isVisible(),
        button = ge(is_box ? 'groups_obscene_edit_box_save' : 'group_bl_submit');

    var onDone = function(code) {
      switch (code) {
        case 15:
        case 7:
          key = (code & 3 ? 'obscene_edit_pattern_success' : 'obscene_add_pattern_success');
          break;
        case -7: key = 'obscene_word_wrong_chars';         break;
        case -6: key = 'obscene_word_too_short';           break;
        case -2: key = 'obscene_word_alredy_exists';       break;
        default: key = 'obscene_add_pattern_error';
      }
      GroupsEdit.uShowMessage(getLang(key)+ ' (code: '+ code +')');
      unlockFlatButton(button);
    }
    var onFail = GroupsEdit.uShowMessage.pbind(getLang('global_unknown_error'), 0);
    var params = {
      gid     : cur.gid,
      act     : 'a_obscene_add_pattern',
      word    : is_box ? val('obs_pattern_word') : val('group_bl_search'),
      pid     : intval(val('obs_pattern_pid') || 0),
      hash    : hash || '',
      override: override,
    }

    if (!trim(params.word)) {
      el = is_box ? 'obs_pattern_word' : 'group_bl_search';
      return notaBene(el, 'warning');
    }

    lockFlatButton(button);
    ajax.post('al_groups.php', params, {onDone: onDone, onFail: onFail});
  },
  showObsceneWordsHint: function(el) {
    var hint = getLang('obscene_settings_stopwords_hint');
    var params = {
      text: hint,
      className: 'group_edit_obscene_stopwords_hint',
      hasover: 1,
      slideX: 15,
      showsp: 150,
      shift: function(){
        var tt = geByClass1('group_edit_obscene_stopwords_hint');
        var xpoz = (tt.offsetHeight + el.offsetHeight) / 2 - 2;
        return [-278, 0, -xpoz];
      },
      forcetodown: true,
      no_shadow: true,
    };
    showTooltip(el, params);
  },
  enableObsceneStopWords: function(el, e) {
    var box = 'group_edit_obscene_stopwords',
        words_wrap = 'group_edit_obscene_stopwords_wrap';

    if (isChecked(el.id)) {
      show(ge('group_activity'));
      show(words_wrap);
      return elfocus(box);
    }
    hide(words_wrap);
  }
}

try{stManager.done('groups_edit.js');}catch(e){}
