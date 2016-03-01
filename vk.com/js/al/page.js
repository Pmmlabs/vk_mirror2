var Page = {
  buildMediaLinkEl: function(url) {
    return '<div class="page_media_link_url"><div class="page_media_link_icon"></div><div class="page_media_link_text">' + url + '</div></div>';
  },
  showManyPhoto: function(el, photoId, listId, opts) {
    var m = allPhotos = [];
    each(domPN(el).childNodes, function(k, v) {
      var cl = v && v.getAttribute && v.getAttribute('onclick'), m = cl.match(/'(-?\d+_\d+)'\s*,\s*'([a-f0-9]{18})'/i);
      if (m) {
        allPhotos.push(m[1] + '/' + m[2]);
      }
    });
    opts.additional = {draft_photos: allPhotos.join(';')};
    return showPhoto(photoId, listId, extend(opts, {queue: 1}));
  },
  inviteToGroup: function(gid, mid, invited, hash) {
    var setInvited = function(invited) {
      var row = ge('member_row'+mid);
      geByClass('actions', row)[0].innerHTML = invited ? '<a href="" onclick="return page.inviteToGroup('+gid+', '+mid+', 1, \''+hash+'\')">'+getLang('friends_cancel_event_invite')+'</a>' : '<a href="" onclick="return page.inviteToGroup('+gid+', '+mid+', 0, \''+hash+'\')">'+getLang('friends_send_event_invite')+'</a>';
    }
    if (invited) {
      ajax.post('/al_page.php', {act: 'a_cancel_invite', mid: mid, gid: gid, hash: hash}, {onDone: function(res){ }});
      setInvited(0);
    } else {
      ajax.post('/al_page.php', {act: 'a_invite', mid: mid, gid:gid, hash: hash}, {onDone: function(res, message) {
        if (!res) {
          setInvited(0);
          ge('res'+mid).innerHTML = '<div class="res">' + message + '</div>';
          var row = ge('member_row' + mid);
          hide(geByClass('actions', row)[0]);
        }
      }});
      setInvited(1);
    }
    return false;
  },
  showPageMembers: function(ev, oid, tab) {
    return !showTabbedBox('al_page.php', {act: 'box', oid: oid, tab: tab}, {cache: 1}, ev);
  },
  ownerPhotoFast: function() {
    var inp = ge('owner_photo_bubble_input');
    if (!inp) inp = ge('owner_photo_wrap').appendChild(ce('input', {
      type: 'file',
      id: 'owner_photo_bubble_input',
      onchange: function() {
        data(this, 'changed', true);
        showBox('al_page.php', {act: 'owner_photo_box', oid: cur.oid}).inp = this;
      }
    }));
    inp.click();
  },
  ownerPhoto: function(oid) {
    showBox('al_page.php', {
      act: 'owner_photo_box',
      oid: oid || cur.oid
    }, {stat: ['owner_photo.css', 'owner_photo.js']});
  },
  ownerCrop: function(oid) {
    showBox('al_page.php', {
      act: 'owner_photo_crop',
      oid: oid || cur.oid
    }, {stat: ['owner_photo.css', 'owner_photo.js']});
  },
  editPhoto: function(newph) {
    cur.hideOther();
    showBox('al_page.php', extend(newph || {}, {act: 'a_edit_photo'}), {
      params: {bodyStyle: 'padding: 16px 7px'},
      stat: ['tagger.js', 'tagger.css']
    });
  },
  deletePhoto: function(oid, hash) {
    cur.hideOther();
    var box = showFastBox({title: getLang('global_warning')}, getLang('sure_delete_photo'), getLang('global_delete'), function() {
      ajax.post('al_page.php', {
        act: 'a_delete_photo',
        hash: hash,
        oid: oid
      }, {
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
      });
    }, getLang('global_cancel'));
  },
  shareCurrent: function() {
    var curAudio = geByClass1('current_audio', ge('page_current_info'));
    if (!curAudio) nav.reload(); // :(

    curAudio = curAudio.getAttribute('data-audio');
    if (!curAudio) nav.reload(); // :(

    curAudio = curAudio.split('_');
    if (curAudio.length < 3 || curAudio[2].substr(0, 1) != 's') nav.reload(); // :(

    return !showBox('like.php', {act: 'publish_box', object: 'audio' + curAudio[0] + '_' + curAudio[1], list: curAudio[2] + ((curAudio[3] && curAudio[3].charAt(0) == 'h') ? '_' + curAudio[3] : '')}, {stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css', 'sharebox.js']});
  },
  playCurrent: function(el, audioId, hash) {
    var prg = geByClass1('current_audio_prg', el.parentNode) || el.parentNode.appendChild(ce('span', {className: 'progress_inline current_audio_prg'}));
    return Page.playLive(audioId, hash, {
      showProgress: function() {
        show(prg);
        addClass(el, 'prg');
      },
      hideProgress: function() {
        hide(prg);
        removeClass(el, 'prg');
      }
    });
  },
  playLive: function(audioId, hash, ajaxOpts) {
    var _a = window.audioPlayer, aid = currentAudioId();
    if (_a) _a.gpDisabled = false;
    if (aid == audioId) {
      return playAudioNew(audioId);
    }

    stManager.add(['audioplayer.css', 'audioplayer.js'], ajax.post.pbind('audio', {act: 'play_audio_status', id: audioId, hash: hash}, extend({
      onDone: function(info, data, uid) {
        if (uid != vk.id) {
          if (data && uid) {
            audioPlayer.statusData = audioPlayer.statusData || {};
            audioPlayer.statusData[uid] = data;
          }
          if (!info) return;

          if (!window.audioPlaylist) {
            window.audioPlaylist = {};
          }
          audioPlaylist[audioId] = info;
          audioPlaylist.start = audioId;
          if (data && uid) {
            audioPlaylist.statusData = data;
          } else {
            delete audioPlaylist.statusData;
          }
          audioPlayer.setPadPlaylist(audioPlaylist);
        }
        playAudioNew(audioId);
      }
    }, ajaxOpts || {})));
  },
  audioStatusUpdate: function(hash) {
    var exp = isChecked('currinfo_audio'), _a = window.audioPlayer, aid = currentAudioId();
    if (_a) {
      _a.statusExport = _a.statusExport || {};
      if (exp) {
        _a.statusExport[vk.id] = 1;
      } else {
        delete _a.statusExport[vk.id];
      }
    }
    var audioId = (_a && _a.player && _a.player.paused && !_a.player.paused()) ? aid : '', top = (_a && (_a.playbackParams.top_audio || _a.playbackParams.top)) ? 1 : '';
    ajax.post('al_audio.php', {act: 'toggle_status', hash: hash, exp: exp, id: audioId, oid: vk.id, top: top}, {onDone: function(text) {
      if (vk.id != cur.oid || !text) return;
      val('current_info', text);
    }});
  },
  audioListenersOver: function(el, oid) {
    var valueEl = geByClass1('value', el), pointerShift = 92,
        valueW = valueEl && (valueEl.clientWidth || valueEl.offsetWidth) || 7;

    showTooltip(el, {
      url: 'al_audio.php',
      params: {act: 'listeners_tt', 'oid': oid},
      slide: 15,
      shift: [88 - valueW, 10, 10],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich like_tt ',
      onShowStart: function (tt) {
        if (!tt.container || pointerShift === false) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  showAudioListeners: function(oid, ev) {
    function onBoxScroll() {
      var moreLink = ge('listeners_more_link');
      var moreLinkTrigger = ge('listeners_more_link_trigger');
      if (isVisible(moreLinkTrigger) && boxLayerWrap.scrollHeight - 500 < (boxLayerWrap.scrollTop + boxLayerWrap.offsetHeight)) {
        hide(moreLinkTrigger);
        moreLink.click();
      }
    }

    ev.cancelBubble = true;
    return !showBox('/al_audio.php', {act: 'listeners_box', oid: oid}, { cache: 1,
      onHide:  function() {
        removeEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
      },
      onDone: function(box, needMore) {
        window.audioListenersOffset = 0;
        hide(ge('audio_listeners_progress'));

        if (!needMore) {
          re('listeners_more_link');
          re('listeners_more_link_trigger');
        } else {
          addEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
        }
      }
    });
  },
  moreAudioListeners: function(oid) {
    window.audioListenersOffset += 50;
    var content = geByClass1('audio_listeners');
    var progress = ge('audio_listeners_progress');

    ajax.post("/al_audio.php", {act: 'listeners_box', oid: oid, offset: window.audioListenersOffset}, {
      onDone: function(rows, needMore) {
        hide(progress);
        show(ge('more_link_text'));

        var newRows = ce('div', { innerHTML: rows });

        for (var e = domFC(newRows); e; e = domFC(newRows)) {
          content.appendChild(e);
        }

        if (!needMore) {
          re('listeners_more_link');
          re('listeners_more_link_trigger');
        } else {
          var moreLink = ge('listeners_more_link_trigger');
          show(moreLink);
        }
      }
    });

    hide(ge('more_link_text'));
    show(progress);
  },
  postsUnseen: function(posts) {
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    var now = vkNow();
    var ch = false;
    for (i in posts) {
      for (j in posts[i]) {
        if (j == 'module' || j == 'index' || j == 'q') continue;
        var pdict = _postsExtras[j];
        if (pdict && pdict.diff == -1) {
          pdict.diff = now - pdict.start;
          ch = true;
        }
      }
    }
    if (ch) {
      Page.postsClearTimeouts();
    }
  },
  postsSeen: function(posts) {
    var i, j, ch, p, se, sa, module, query;
    if (!vk.id || !posts.length || vk.pd) return;

    if (!window._postsSeenModules) _postsSeenModules = {};
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    var now = vkNow();
    for (i in posts) {
      module = Page.getPostModuleCode(posts[i].module ? posts[i].module : '');
      index = posts[i].index;
      query = posts[i].q;
      for (j in posts[i]) {
        if (j == 'module' || j == 'index' || j == 'q') continue;

        _postsSeenModules[j] = module;

        p = posts[i][j];
        se = _postsSeen[j];
        sa = _postsSaved[j];
        if (sa == -1 || se == -1 || p == 1 && (sa || se)) continue;
        ch = _postsSeen[j] = p;
        _postsExtras[j] = {start: now, diff: -1, index: index, q: query};
        _postsExtras[j]['session_id'] = cur.feed_session_id ? cur.feed_session_id : 'na'
      }
    }
    if (ch) {
      Page.postsClearTimeouts();
    }
  },
  postsClearTimeouts: function() {
    clearTimeout(_postsSaveTimer);
    _postsSaveTimer = setTimeout(Page.postsSave, 2500);
    clearTimeout(_postsSendTimer);
    _postsSendTimer = setTimeout(Page.postsSend, 5000);
  },
  postsSave: function() {
    if (!ls.checkVersion() || isEmpty(_postsSeen)) return _postsSeen;

    var sent = ls.get('posts_sent') || {};
    var seen = ls.get('posts_seen') || {};
    var modules = ls.get('posts_seen_modules') || {};
    var extras = ls.get('posts_extras') || {};
    var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
    var ch, i, p, snt, sn;
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    for (i in _postsSeen) {
      sn = _postsSeen[i];
      if (_postsExtras[i]) {
        extras[i] = {
            diff: _postsExtras[i].diff, index: _postsExtras[i].index,
            q: _postsExtras[i].q, session_id: _postsExtras[i].session_id ? _postsExtras[i].session_id : 'na'};
        delete _postsExtras[i];
      }
      p = i.split('_');
      if (p[0] !== 'ad' && p[0] !== 'posthashtag') {
        p[0] = intval(p[0]);
        p[1] = intval(p[1]);
      }
      snt = (sent[p[0]] || {})[p[1]];
      if (p[0] != vk.id && (!snt || sn == -1 && snt > 0)) {
        if (!seen[p[0]]) {
          seen[p[0]] = {};
          delete modules[i];
        }
        if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
          ch = seen[p[0]][p[1]] = t * sn;
          modules[i] = _postsSeenModules[i];
        }
      }
      _postsSaved[i] = sn;
    }
    _postsSeen = {};
    _postsSeenModules = {};
    if (ch) {
      ls.set('posts_seen', seen);
      ls.set('posts_seen_modules', modules);
      ls.set('posts_extras', extras);
    }
  },
  getPostModuleCode: function(module) {
    switch(module) {
      case 'feed': return 'f';
      case 'public': return 'c';
      case 'profile': return 'p';
      case 'feed_search': return 's';
      case 'feed_news_recent': return 'r';
      case 'feed_news': return 'r';
      case 'feed_news_top': return 't';
      case 'feed_other': return 'o';
      default: return '';
    }
  },
  postsSend: function() {
    var seen = {};
    var modules = {};
    var extras = {};
    var data = [];
    var i, j, r, m;
    if (ls.checkVersion()) {
      seen = ls.get('posts_seen');
      modules = ls.get('posts_seen_modules') || {};
      extras = ls.get('posts_extras') || {};
    } else {
      r = Page.postsSave();
      for (i in r) {
        sn = r[i];
        p = i.split('_');
        if (p[0] !== 'ad' && p[0] !== 'posthashtag') {
          p[0] = intval(p[0]);
          p[1] = intval(p[1]);
        }
        if (!seen[p[0]]) {
          seen[p[0]] = {};
        }
        if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
          seen[p[0]][p[1]] = sn;
        }
      }
    }
    for (i in seen) {
      r = [];
      for (j in seen[i]) {
        var full_id = i + '_' + j;
        m = modules[full_id] || '';
        var extra = extras[full_id];
        var query_str = (m == 's' && extra.q) ? extra.q : '';
        query_str = query_str.replace(/[,;:]/g, '');
        if (query_str) {
          query_str = ':' + query_str;
        }
        var session_id_str = extra && extra.session_id ? extra.session_id : 'na';
        var extra_str = (extra && i != 'ad' && i != 'posthashtag') ? (':' + extra.diff + ':' + extra.index + ':' + session_id_str + query_str) : '';
        r.push(m + ((seen[i][j] > 0) ? j : -j) + extra_str);
      }
      if (r.length) {
        data.push(i + '_' + r.join(','));
      }
    }
    if (!data.length) return;
    if (!vk.id) return Page.postsClear();

    ajax.post('al_page.php', {act: 'seen', data: data.join(';')}, {onDone: function() {
      if (!ls.checkVersion()) {
        return extend(_postsSaved, _postsSeen);
      }
      var cseen = ls.get('posts_seen') || {}, sent = ls.get('posts_sent') || {}, smodules = ls.get('posts_seen_modules'), i, j;
      for (i in seen) {
        for (j in seen[i]) {
          if (!sent[i]) {
            sent[i] = {};
          }
          if (sent[i][j] != -1) {
            sent[i][j] = seen[i][j];
          }
          if ((cseen[i] || {})[j]) {
            delete(cseen[i][j]);
            delete smodules[i + '_' + j];
          }
        }
        if (cseen[i] && isEmpty(cseen[i])) {
          delete(cseen[i]);
          delete smodules[i + '_' + j];
        }
      }
      ls.set('posts_seen', cseen);
      ls.set('posts_sent', sent);
      ls.set('posts_seen_modules', smodules);

      clearTimeout(_postsCleanTimer);
      _postsCleanTimer = setTimeout(Page.postsClean, 10000);
    }});
  },
  postsClean: function() {
    if (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle) {
      debugLog('waiting ls clean..');
      clearTimeout(_postsCleanTimer);
      _postsCleanTimer = setTimeout(Page.postsClean, 10000);
      return;
    }

    debugLog('cleaning ls..');
    var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
    var sent = ls.get('posts_sent') || {}, i, j, k, ch = 0;
    for (i in sent) {
      for (j in sent[i]) {
        k = sent[i][j];
        if (t - ((k > 0) ? k : -k) > 24) {
          delete(sent[i][j]);
          ch = 1;
        }
      }
      if (isEmpty(sent[i])) {
        delete(sent[i]);
        ch = 1;
      }
    }
    ls.set('posts_sent', sent);
  },
  postsClear: function() {
    ls.set('posts_seen', {});
    ls.set('posts_extras', {});
    ls.set('posts_sent', _postsSaved = _postsSeen = _postsSeenModules = _postsExtras = {});
  },
  showContacts: function(oid, edit, callback) {
    var b = showBox('/al_page.php', {act: 'a_get_contacts', oid: oid, edit: edit}, {params:{width:467, dark: 1}});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        if (callback) {
          callback();
        } else {
          nav.reload({noscroll: true});
          cur.reloadAfterClose = false;
        }
      }
      return true;
    }});
  },
  editContact: function(oid, mid, hash, callback) {
    var b = showBox('al_page.php', {act: 'a_edit_contact_box', mid: mid, oid: oid}, {params: {bodyStyle: 'padding: 20px', width: 430, dark: 1}}).setButtons(getLang('global_save'), function() {
      cur.reloadAfterClose = true;
      function onSearch() {
        var params = {act: 'a_add_contact', mid: mid, oid: oid};
        params.hash = hash;
        if (!hash) params.hash = ge('public_contact_hash').value;
        if (ge('public_contact_memlink')) params.page = ge('public_contact_memlink').value;
        params.title = ge('public_contact_position').value;
        params.phone = ge('public_contact_phone').value;
        params.email = ge('public_contact_email').value;
        if (ge('public_contact_memlink') && !params.page && !params.phone && !params.email) {
          b.hide();
          return;
        }
        ajax.post('al_page.php', params, {onDone: function(res, script) {
          b.hide();
          var box = curBox();
          if (box) {
            box.content(res);
            if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
              ge('public_contacts_list').sorter.destroy();
            }
            if (script) {
              eval(script);
            }
            toggle('public_add_contact', ge('public_contacts_list').childNodes.length < 30);
          } else {
            page.showContacts(oid, 1, callback);
          }
        }, onFail: function(error) {
          if (ge('public_contact_error')) {
            ge('public_contact_error').innerHTML = error;
            show('public_contact_error');
            return true;
          }
        }});
      }
      if (!mid && cur.lastContact != ge('public_contact_memlink').value) {
        page.searchContact(oid, ge('public_contact_memlink').value, onSearch);
      } else {
        onSearch();
      }
    }, getLang('global_cancel'));
  },
  searchContact: function(oid, page, onSearch) {
    if (!trim(page)) {
      cur.lastContact = '';
      if (onSearch) onSearch();
      return;
    }
    if (page == cur.lastContact) return;
    ajax.post('al_page.php', {act: 'a_search_contact', oid: oid, page: page}, {onDone: function(uid, img, name, hash) {
      cur.lastContact = page;
      ge('public_contact_name').innerHTML = name;
      ge('public_contact_image').innerHTML = img;
      ge('public_contact_hash').value = hash;
      if (!uid) {
        notaBene('public_contact_memlink', '', true);
        hide('public_contact_error');
      } else {
        if (onSearch) {
          onSearch();
        } else {
          hide('public_contact_error');
        }
      }
    }});
  },
  deleteContact: function(oid, mid, hash) {
    cur.reloadAfterClose = true;
    ajax.post('al_page.php', {act:'a_delete_contact', oid: oid, mid: mid, hash:hash}, {onDone: function(res, script){
      var box = curBox();
      box.content(res);
      if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
        ge('public_contacts_list').sorter.destroy();
      }
      if (script) {
        eval(script);
      }
      toggle('public_add_contact', ge('public_contacts_list').childNodes.length < 30);
    }});
  },
  reorderContacts: function(oid, hash, user, before, after) {
    var mid = user.id.replace('public_contact_cell', '');
    var before_id = (before && before.id || '').replace('public_contact_cell', '');
    var after_id = (after && after.id || '').replace('public_contact_cell', '');
    cur.reloadAfterClose = true;
    ajax.post('/al_page.php', {act: 'a_reorder_contacts', oid: oid, mid: mid, before: before_id, after: after_id, hash: hash});
  },
  showInput: function(el) {
    el = el.parentNode;
    addClass(el, 'unshown');

    var input_wrap = geByClass('input_wrap', el.parentNode)[0];
    removeClass(input_wrap, 'unshown');
    geByClass('text', input_wrap)[0].focus();
  },
  hideInput: function(el, val) {
    return;
  },

  infoEdit: function(audio) {
    if (cur.viewAsBox) return cur.viewAsBox();

    var tt = ge('current_info').tt;
    if (tt && tt.hide) {
      tt.hide({fasthide: true});
    }
    var ed = ge('currinfo_editor');
    if (browser.msie8 || browser.opera) {
      ed.style.marginLeft = '-13px';
    } else if (browser.msie) {
      ed.style.marginTop = '-28px';
      ed.style.marginLeft = '-13px';
    }
    show(ed, ge('page_current_info').firstChild.nextSibling);
    hide(ge('page_current_info').firstChild);
    if (isVisible('currinfo_app') && !cur.ciApp) {
      show('currinfo_audio');
      hide('currinfo_app');
    } else if (cur.ciApp) {
      hide('currinfo_audio');
      show('currinfo_app');
    }
    var info = ge('current_info').firstChild, input = ge('currinfo_input'), link = geByTag1('a', info);
    cur.infoEditing = (info.className == 'my_current_info');
    if (cur.infoEditing) {
      var infoHtml = link ? link.innerHTML : info.innerHTML;
      infoHtml = infoHtml.replace(/<img[^>]+alt="([^"]+)"[^>]*>/g, '$1');
      cur.infoOld = stripHTML(infoHtml);
    } else {
      cur.infoOld = '';
    }
    input.value = winToUtf(cur.infoOld);
    elfocus(input, 0, cur.infoOld.length);
    addEvent(window, 'keydown', Page.infoKeydown);
    addEvent(document, 'mousedown', Page.infoMousedown);
    ge('currinfo_save').onclick = Page.infoCheckSave;
  },
  infoCancel: function() {
    hide('currinfo_editor', ge('page_current_info').firstChild.nextSibling);
    show(ge('page_current_info').firstChild);
    cleanElems('currinfo_save', 'currinfo_cancel');
    removeEvent(window, 'keydown', Page.infoKeydown);
    removeEvent(document, 'mousedown', Page.infoMousedown);
    cur.ciApp = false;
  },
  infoShowShare: function() {
    if (cur.viewAsBox) return cur.viewAsBox();

    var el = ge('current_info'), label = getLang('share_current_info');
    showTooltip(el, {
      content: '<div class="content"><div class="checkbox"><div></div>' + label + '</div></div>',
      className: 'share_tt',
      init: function() {
        addEvent(geByClass1('checkbox', el.tt.container), 'click', function() {
          checkbox(this);
          ajax.post('al_page.php', {act: 'share_currinfo', hash: cur.options.info_hash, oid: cur.oid, checked: isChecked(this)}, {onDone: Wall.receive});
        });
      },
      toup: false,
      showdt: 0,
      slide: 10,
      hidedt: 200,
      onClean: function() {
        cleanElems(geByClass1('checkbox', el.tt.container));
      }
    });
  },
  infoKeydown: function(e) {
    if (e.keyCode == KEY.ESC) {
      Page.infoCancel();
    }
  },
  infoMousedown: function(e) {
    var t = e.target;
    while (t.parentNode) {
      if (t.id == 'currinfo_editor') {
        return;
      }
      t = t.parentNode;
    }
    Page.infoCancel();
  },
  infoCheck: function(el) {
  },
  infoSave: function(txt) {
    if (cur.viewAsBox) return cur.viewAsBox();
    if (txt == cur.infoOld || txt == winToUtf(cur.infoOld)) {
      return Page.infoCancel();
    }
    txt = trim(txt).substr(0, 140);
    ajax.post('al_page.php', {act: 'current_info', oid: cur.oid, info: txt, hash: cur.options.info_hash}, {onDone: function() {
      var c = txt ? 'my' : 'no', t = txt ? ('<span class="current_text">' + Emoji.emojiToHTML(txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'), true) + '</span>') : getLang('change_current_info');
      ge('current_info').innerHTML = ge('page_current_info').firstChild.nextSibling.innerHTML = '<span class="' + c + '_current_info">' + t + '</span>';
      Page.infoCancel();
      var el = ge('current_info'), tt = el.tt;
      if (tt && tt.el) {
        tt.destroy();
        removeEvent(el, 'mouseover');
      }
      if (txt) {
        addEvent(el, 'mouseover', Page.infoShowShare);
        Page.infoShowShare();
      }
    }, onFail: function(t) {
      if (!t) {
        Page.infoCheck('currinfo_input');
        return true;
      }
    }, showProgress: lockButton.pbind('currinfo_save'), hideProgress: unlockButton.pbind('currinfo_save'), stat: ['tooltips.js', 'tooltips.css', 'emoji.js']});
  },
  infoCheckSave: function(e) {
    e = e || window.event;
    if (e && e.type == 'keydown' && e.keyCode != 10 && e.keyCode != 13) {
      return;
    }
    Page.infoSave(ge('currinfo_input').value);
  },
  mentionInit: function (el) {
  },
  toggleFixedPost: function(postRaw, e) {
    if (checkEvent(e)) {
      return true;
    }
    cur.fixedWide = !cur.fixedWide;
    toggleClass(cur.wallPage, 'page_fixed_wide', cur.fixedWide);
    toggleClass(cur.wallPage, 'page_wide_no_narrow', cur.fixedWide);
    var fixedCont = ge('wall_fixed');
    var wallCont = ge('profile_wall') || ge('group_wall') || ge('public_wall');
    toggleClass(wallCont, 'wide_wall_module', cur.fixedWide);
    var fixedWallCont = geByClass1('wall_module', fixedCont);
    toggleClass(fixedWallCont, 'wide_wall_module', cur.fixedWide);
    toggleClass(ge('info_module_cont'), 'fixed_module_cont', cur.fixedWide);
    var topHeader = geByClass1('top_header', ge('info_module_header'));
    if (cur.fixedWide) {
      if (!cur.topHeaderBack) {
        cur.topHeaderBack = topHeader.innerHTML;
      }
      topHeader.innerHTML = '<a onclick="nav.change({fixed: false})">'+topHeader.innerHTML+'</a>';
      hide('page_fixed_more_text');
      show('page_fixed_back_text');
      cur.wallTypeBack = cur.wallType;
      cur.wallType = ge('page_wall_posts').className = 'all';
    } else {
      if (cur.topHeaderBack) {
        topHeader.innerHTML = cur.topHeaderBack;
      }
      show('page_fixed_more_text');
      hide('page_fixed_back_text');
      cur.wallType = ge('page_wall_posts').className = cur.wallTypeBack || 'own';
    }
    if (window._tbLink && cur._back) {
      if (cur.fixedWide) {
        showBackLink(nav.objLoc[0], cur._back.text, 1);
        cur._back.onBack = nav.change.pbind({fixed: false})
      } else {
        showBackLink();
        delete cur._back.onBack;
      }
      updSideTopLink();
    }

    Wall.update();
    var wallHeader = geByClass1('wall_header', wallCont);
    toggle(wallCont, !cur.fixedWide);
    toggle(ge('wall_fixed_comments'), cur.fixedWide);
    Page.initFixed(postRaw);
    cur.wallMyOpened[postRaw] = cur.fixedWide;
    var videos = geByClass('page_video_inline_wrap', fixedCont);
    for (var i in videos) {
      var el = videos[i];
      w = el.parentNode.clientWidth;
      h = el.parentNode.clientHeight;

      setStyle(el, {width: w, height: h});
      var player = geByTag1('embed', el);
      if (player) {
        setStyle(player, {width: w, height: h});
      }
    }
    Wall.showEditReply(postRaw, false, true);
    return cancelEvent(e);
  },
  initFixed: function(postRaw) {
    if (cur.fixedInited) return;
    cur.fixedPostRaw = postRaw;
    cur.fixedInited = 1;
    var text = ge('reply_field' + postRaw);
    //placeholderSetup(text);
    Page.showFixedMore(postRaw, {clear: 1});
    var canReplyAsGroup = false;
    var fakeBox = ge('reply_fakebox'+postRaw);
    debugLog('init reply form 1');
    realBox = se(rs(cur.wallTpl.reply_form, {
      reply_as_group_class: canReplyAsGroup ? 'reply_as_group_active' : '',
      post_id: postRaw
    }));
    fakeBox.parentNode.replaceChild(realBox, fakeBox);
  },
  showFixedMore: function(postRaw, opts) {
    if (cur.fixedLoading) return;
    cur.fixedLoading = true;
    cur.fixedOffset = cur.fixedOffset || 0;
    var pr = ge('wall_fixed_more_progress');
    show(pr);
    hide(pr.nextSibling);
    Wall.moreReplies(postRaw, -cur.fixedOffset, 20, extend({
      rev: 1,
      onDone: function(replies, names, data) {
        cur.fixedLoading = false;
        show(pr.nextSibling);
        hide(pr);
        cur.fixedOffset += data.num;
        if (cur.fixedOffset >= data.count) {
          hide('wall_fixed_more_link');
        }
      }
    }, opts));
  },
  showGif: function(obj, ev, dontHideActive) {
    if (ev && (ev.ctrlKey || ev.metaKey)) {
      return true;
    }

    cur.gifAdded = cur.gifAdded || {};
    if (cur.activeGif && domPN(domPN(cur.activeGif)) == domPN(domPN(obj)) || hasClass(domPN(cur.activeGif), 'page_gif_large') && !dontHideActive) {
      Page.hideGif(cur.activeGif, false);
    }

    var doc = obj.getAttribute('data-doc')
    var hash = obj.getAttribute('data-hash');
    var addTxt = obj.getAttribute('data-add-txt') || '';
    var addHash = obj.getAttribute('data-add-hash');
    var shareTxt = obj.getAttribute('data-share-txt') || '';
    var postRaw = obj.getAttribute('data-post');
    var replyRaw = obj.getAttribute('data-reply');
    var hasPreview = obj.getAttribute('data-preview');
    var previewWidth = obj.getAttribute('data-width');
    var previewHeight = obj.getAttribute('data-height');
    var canPlayVideo = false;
    var largeGif = hasClass(domPN(obj), 'page_gif_large');
    var isAutoplay = !ev;
    var el;

    if (postRaw) {
      var oid, post_id, ids;
      ids = postRaw.split('_');
      oid = ids[0];
      post_id = ids[1];
      statlogsValueEvent('show_post_gif', 1, oid, post_id);
    }

    if (hasPreview) {
      var v = ce('video');
      if (v.canPlayType && v.canPlayType('video/mp4').replace('no', '')) {
        canPlayVideo = true;
      }
    }

    var el_src = obj.href + '&wnd=1&module=' + cur.module;

    if (canPlayVideo) {
      el = ce('video', {
        autoplay: true,
        loop: 'loop',
        poster: obj.getAttribute('data-thumb'),
        className: 'pages_gif_img page_gif_big'
      }, {
        width: previewWidth ? previewWidth + 'px' : null,
        height: previewHeight ? previewHeight + 'px' : null,
        background: largeGif ? 'transparent url(' + obj.getAttribute('data-thumb') + ') no-repeat 0 0' : '',
        backgroundSize: 'cover'
      });
      el.appendChild(ce('source', {
        type: 'video/mp4',
        src: el_src + '&mp4=1'
      }));
    } else {
      el = ce('img', {
        src: el_src,
        className: 'pages_gif_img'
      }, {
        width: previewWidth ? previewWidth + 'px' : null,
        height: previewHeight ? previewHeight + 'px' : null
      });
    }

    var acts = '<div class="page_gif_share" onmouseover="showTooltip(this, {text: \'' + shareTxt + '\', black: 1, center: 1, shift: [1, 2, 0]})" onclick="return Page.shareGif(this, \''+doc+'\', \''+hash+'\', event)"><div class="page_gif_share_icon"></div></div>';;
    if (addHash) {
      acts += '<div class="page_gif_add" onmouseover="return Page.overGifAdd(this, \'' + addTxt + '\', \''+doc+'\', event);" onclick="return Page.addGif(this, \''+doc+'\', \''+hash+'\', \''+addHash+'\', event);"><div class="page_gif_add_icon"></div></div>';
    }
    acts = '<div class="page_gif_actions">' + acts + '</div>';

    var imgCont = ce('a', {
      href: obj.href,
      className: 'page_gif_preview' + (cur.gifAdded[doc] ? ' page_gif_added' : ''),
      innerHTML: '<div class="page_gif_progress_icon" style="display:none;"></div>' + (largeGif ? '<div class="page_gif_label">gif</div>' : '') + acts,
      onclick: cancelEvent
    }, {
      background: canPlayVideo ? '' : (getStyle(domFC(obj), 'background') || '').replace(/"/g, '\''),
      width: previewWidth ? previewWidth + 'px' : '',
      height: previewHeight ? previewHeight + 'px' : ''
    });

    imgCont.appendChild(el);
    cur.activeGif = imgCont;
    domPN(obj).insertBefore(imgCont, obj);
    hide(obj);

    var isLoaded = false;

    var onLoaded = function() {
      if (getSize(el)[0] || getSize(el)[1]) {
        clearInterval(loadingInterval);
        el.onload = el.onloadeddata = null;
        isLoaded = true;

        // if (!cur.activeGif) return;
        hide(domFC(imgCont));
        imgCont.style.background = '';
        imgCont.setAttribute('onclick', "return Page.hideGif(this, event);");
        addClass(el, 'page_gif_big');
        addClass(imgCont, 'page_gif_loaded');
        statlogsValueEvent('gif_play', 0, canPlayVideo ? 'mp4' : 'gif');
      }
    };

    if (ev) { // clicked by user
      show(domFC(imgCont));
    } else {
      setTimeout(function() {
        if (!isLoaded) {
          show(domFC(imgCont));
        }
      }, 300);
    }

    if (canPlayVideo) {
      el.onloadeddata = onLoaded;
    } else {
      var loadingInterval = setInterval(onLoaded, 10);
      el.onload = onLoaded;
    }

    domPN(obj).setAttribute('data-playing', 1);

    var statsMode = isAutoplay? 'autoplay' : 'manual';
    var statsModule = cur.module || 'other';
    var statsFrom = postRaw ? 'post' : (replyRaw ? 'reply' : '');
    statlogsValueEvent('gif_show', statsMode, statsModule, statsFrom);

    return cancelEvent(ev);
  },
  hideGif: function(obj, ev) {
    if (ev && (ev.ctrlKey || ev.metaKey)) {
      return true;
    }

    var wrap = domPN(obj);
    var thumb = domNS(obj);

    wrap.removeAttribute('data-playing');
    if (ev) {
      removeClass(wrap, 'page_gif_autoplay');
    }
    re(obj);
    show(thumb);
    delete cur.activeGif;
    return false;
  },
  overGifAdd: function(obj, txt, doc, ev) {
    cur.gifAdded = cur.gifAdded || {};
    if (cur.gifAdded[doc]) {
      txt = cur.gifAdded[doc].tooltip;
      if (!txt) return false;
    }

    showTooltip(obj, {text: txt, black: 1, center: 1, shift: [1, 2, 0]});
    return false;
  },
  addGif: function(obj, doc, hash, addHash, ev) {
    cur.gifAdded = cur.gifAdded || {};
    if (obj.tt) obj.tt.hide();

    var wrap = gpeByClass('page_gif_large', obj) || domPN(obj);

    if (!cur.gifAdded[doc]) {
      addClass(obj, 'page_gif_adding');
      ajax.post('docs.php', {act: 'a_add', doc: doc, hash: hash, add_hash: addHash}, {
        onDone: function(text, tooltip, docObj, hash) {
          showDoneBox(text);
          addClass(wrap, 'page_gif_added');
          if (obj.tt && obj.tt.el) obj.tt.destroy();
          cur.gifAdded[doc] = {
            tooltip: tooltip,
            did: docObj[0],
            hash: hash
          };
        }
      });
    } else {
      ajax.post('docs.php', {act: 'a_delete', oid: vk.id, did: cur.gifAdded[doc].did, hash: cur.gifAdded[doc].hash}, {
        onDone: function() {
          removeClass(wrap, 'page_gif_added');
          if (obj.tt && obj.tt.el) obj.tt.destroy();
          delete cur.gifAdded[doc];
        }
      });
    }
    return cancelEvent(ev);
  },

  shareGif: function(obj, doc, hash, ev) {
    if (obj.tt) obj.tt.hide();
    showBox('like.php', {
      act: 'publish_box',
      object: 'doc' + doc,
      list: hash,
    }, {
      stat: ['wide_dd.js', 'wide_dd.css', 'sharebox.js']
    });

    return cancelEvent(ev);
  },

  albumOver: function(obj, id) {
    if (cur.hideAlbumTO && cur.hideAlbumTO[id]) {
      clearTimeout(cur.hideAlbumTO[id]);
    }
    var desc = geByClass1('page_album_description', obj), title = geByClass1('page_album_title_wrap', obj), descY = getSize(desc)[1];
    animate(title, {marginTop: 98 - (descY ? descY + 5 : 0)}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
  },

  albumOut: function(obj, id) {
    var doHide = function() {
      var desc = geByClass1('page_album_description', obj), title = geByClass1('page_album_title_wrap', obj);
      animate(title, {marginTop: 98}, 200);
    }
    cur.hideAlbumTO = cur.hideAlbumTO || {};
    cur.hideAlbumTO[id] = setTimeout(doHide, 150);
  },

  addAudioPreview: function(media, data) {
    stManager.add(['audioplayer.css']);
    var rnd = Math.floor((1 + Math.random()) * 1000000000), aid = media + '_' + rnd, nfo = data.info;
    return '\
<div class="medadd_aud inl_bl" id="audio' + aid + '"><table cellspacing="0" cellpadding="0" width="100%"><tr>\
  <td rowspan="2"><div class="medadd_aud_playwrap" onclick="playAudioNew(\'' + aid + '\') + data">\
    <div class="medadd_aud_play" id="play' + aid + '"></div>\
    <input type="hidden" id="audio_info' + aid + '" value="' + nfo + '"/>\
  </div></td>\
  <td class="info medadd_aud_td medadd_aud_wid"><div class="title_wrap fl_l" onmouseover="setTitle(this)">\
    <b class="medadd_aud_perf">' + data.performer + '</b> &ndash; <span class="title" id="title' + aid + '">' + data.title + ' </span>\
  </div><div class="duration fl_r" onmousedown="if (window.audioPlayer) audioPlayer.switchTimeFormat(\'' + aid + '\', event)">' + data.duration + '</div></td></tr><tr>\
  <td class="medadd_aud_td"><div class="audio_back_line medadd_aud_ph"></div><div id="player' + aid + '" class="player" ondragstart="return false;" onselectstart="return false;">\
    <table cellspacing="0" cellpadding="0" border="0" width="100%"><tr>\
      <td class="medadd_aud_td medadd_aud_wid">\
        <div id="audio_pr' + aid + '" class="audio_pr" onmouseover="addClass(this, \'over\'); if (cur.hideTipTO) clearTimeout(cur.hideTipTO);" onmouseout="removeClass(this, \'over\'); removeClass(this, \'down\'); cur.hideTipTO = setTimeout(hide.pbind(\'audio_tip_wrap\'), 100);" onmousedown="addClass(this, \'down\'); audioPlayer.prClick(event);" onmouseup="removeClass(this, \'down\')">\
          <div id="audio_white_line' + aid + '" class="audio_white_line" onmousedown="audioPlayer.prClick(event);"></div>\
          <div id="audio_back_line' + aid + '" class="audio_back_line" onmousedown="audioPlayer.prClick(event);"><!-- --></div>\
          <div id="audio_load_line' + aid + '" class="audio_load_line" onmousedown="audioPlayer.prClick(event);"><!-- --></div>\
          <div id="audio_pr_line' + aid + '" class="audio_progress_line" onmousedown="audioPlayer.prClick(event);">\
            <div id="audio_pr_slider' + aid + '" class="audio_slider"><!-- --></div>\
          </div>\
        </div>\
      </td><td class="medadd_aud_td">\
        <div id="audio_vol' + aid + '" class="audio_vol" onmouseover="addClass(this, \'over\')" onmouseout="removeClass(this, \'over\'); removeClass(this, \'down\')" onmousedown="addClass(this, \'down\'); audioPlayer.volClick(event)" onmouseup="removeClass(this, \'down\')">\
          <div id="audio_vol_white_line' + aid + '" class="audio_vol_white_line" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
          <div id="audio_vol_back_line' + aid + '" class="audio_load_line" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
          <div id="audio_vol_line' + aid + '" class="audio_progress_line" onmousedown="audioPlayer.volClick(event);">\
            <div id="audio_vol_slider' + aid + '" class="audio_slider" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
          </div>\
        </div>\
      </td>\
    </tr></table>\
  </div></td>\
</tr></table></div>';
  }
}, page = Page;

var Wall = {
  deleteAll: function(el, post, hash) {
    ajax.post('al_wall.php', {act: 'delete_all', post: post, hash: hash}, {onDone: function(text) {
      var p = domPN(domPN(el));
      p.oldt = val(p);
      val(p, text);
    }, showProgress: function() {
      hide(el);
      show(domNS(el) || domPN(el).appendChild(ce('div', {className: 'progress'})));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  restoreAll: function(el, post, hash) {
    var rnd = cur.wallRnd = Math.floor(Math.random() * 100000);
    ajax.post('al_wall.php', {act: 'restore_all', post: post, hash: hash, rnd: rnd}, {onDone: function(text) {
      var p = domPN(el);
      val(p, p.oldt);
    }, showProgress: function() {
      hide(el);
      show(domNS(el) || domPN(el).appendChild(ce('span', {className: 'progress_inline'})));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  block: function(el, post, hash, bl) {
    ajax.post('al_wall.php', {act: 'block', post: post, hash: hash, bl: bl}, {onDone: function(text) {
      if (bl) {
        domPN(el).insertBefore(ce('div', {innerHTML: text}), el);
        hide(el);
      } else {
        show(domNS(domPN(el)));
        re(domPN(el));
      }
    }, showProgress: function() {
      var prg = bl ? ce('div', {className: 'progress'}) : ce('span', {className: 'progress_inline'});
      hide(el);
      show(domNS(el) || domPN(el).appendChild(prg));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  blockEx: function(gid, mid) {
    showBox('al_groups.php', {act: 'bl_edit', name: 'id' + mid, gid: gid, auto: 1}, {stat: ['page.css', 'ui_controls.js', 'ui_controls.css'], dark: 1});
  },
  withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
  editPost: function(post, options, onFail, onDone) {
    if (cur.editingPost && ge('wpe_text')) {
      onFail && onFail();
      return elfocus('wpe_text');
    }
    cur.editingPost = [post];
    if (Wall.withMentions) {
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js', 'walledit.js']);
    } else {
      stManager.add(['walledit.js']);
    }
    ajax.post('al_wall.php', extend({act: 'edit', post: post, mention: Wall.withMentions ? 1 : ''}, options), {onDone: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(post);
      WallEdit.editPost.apply(window, args);
      onDone && onDone();
    }, onFail: function() {
      cur.editingPost = false;
      onFail && onFail();
    }, progress: 'wpe_prg' + post});
  },

  cancelEdit: function(layerOnly) {
    if (cur.editingPost) {
      if (layerOnly === true && cur.editingPost[0].match(/^-?\d+_/)) return;
      if (window.WallEdit) {
        WallEdit.cancelEditPost();
      } else {
        cur.editingPost = false;
      }
    }
  },

  switchWall: function(ev) {
    var cnts = {all: 0, own: 0}, sw = ge('page_wall_switch');
    if (ge('page_wall_count_all')) cnts.all = intval(ge('page_wall_count_all').value);
    if (ge('page_wall_count_own')) cnts.own = intval(ge('page_wall_count_own').value);
    if (!cnts.own || cnts.own >= cnts.all) {
      return cancelEvent(ev);
    }
    cur.wallType = ge('page_wall_posts').className = (cur.wallType == 'own') ? 'all' : 'own';
    Wall.update();
    return cancelEvent(ev);
  },
  suggest: function(ev) {
    if (!cur.oid) return cancelEvent(ev);
    var cont = ge('page_suggest_post'), posts = domPN(ge('page_wall_posts')), vis = isVisible(cont);
    toggle(posts, vis);
    toggle(cont, !vis);
    val('page_wall_suggest', cur.options[vis ? 'wall_suggest_post' : 'wall_return_to_posts']);
    cur.suggestsView = !vis;
    if (vis) {
      Wall.update();
    } else {
      Wall.loadSuggests();
      Wall.suggestUpdate();
      if (cur.suggesting = (domPN(ge('submit_post_box')) == ge('page_suggest_post'))) {
        elfocus('post_field');
      }
    }
    return cancelEvent(ev);
  },
  suggestMore: function() {
    var cont = ge('page_suggestions'), pr = ge('page_suggest_prg');
    if (isVisible(pr)) return;
    ajax.post('al_wall.php', {
      act: 'get_suggests',
      owner_id: cur.oid,
      offset: cont.childNodes.length - geByClass('dld', cont).length - 1
    }, {
      onDone: function(rows, notAll) {
        removeClass(cont, 'page_sugg_loading');
        var el = ce('div', {innerHTML: rows}), fc = domFC(el);
        while (fc) {
          if (ge(fc.id) || !hasClass(fc, 'post')) {
            re(fc);
          } else {
            cont.appendChild(fc);
          }
          fc = domFC(el);
        }
        toggle('page_suggest_more', notAll);
      },
      showProgress: function() {
        show(pr);
        hide(domNS(pr));
      },
      hideProgress: function() {
        show(domNS(pr));
        hide(pr);
      }
    });
  },
  suggestUpdate: function(delta) {
    var c = ge('page_suggests_count'), v = intval(val(c));
    if (delta === -1 || delta === 1 && c) val(c, v += delta);
    val('page_wall_posts_count', v ? langNumeric(v, cur.options.wall_suggests_label) : cur.options.wall_no_suggests_label);
  },
  loadSuggests: function() {
    if (cur.suggLoading || !cur.oid) return;
    cur.suggLoading = true;
    var cont = ge('page_suggestions');
    ajax.post('al_wall.php', {act: 'get_suggests', owner_id: cur.oid}, {onDone: function(rows, notAll) {
      removeClass(cont, 'page_sugg_loading');
      val(cont, rows);
      if (cur.suggestsView) Wall.suggestUpdate();
      toggle('page_suggest_more', notAll);
    }});
  },
  showPostponed: function() {
    if (cur.postponedLoading || !cur.oid) return;
    var tmp = cur.postponedLoading = cur.oid;
    var pr = ge('wall_postponed_progress');
    ajax.post('al_wall.php', {act: 'get_postponed', owner_id: cur.oid}, {
      onDone: function (rows) {
        if (tmp !== cur.oid) return;
        delete(cur.postponedLoading);
        val(ge('wall_postponed'), rows);
      },
      showProgress: function() {
        show(pr);
        hide(domNS(pr));
      },
      hideProgress: function() {
        show(domNS(pr));
        hide(pr);
      }
    });
  },
  hidePostponed: function() {
    var lnk = ge('wall_postponed_link');
    if (lnk) {
      lnk.onclick = Wall.showPostponed;
      hide('wall_postponed_posts', 'wall_postponed_msg_hide');
      show('wall_postponed_msg_show');
    }
  },
  publishPostponedPost: function(post, hash, from) {
    showFastBox(getLang('publish_postponed_title'), getLang('publish_postponed_confirm'), getLang('publish_postponed_btn'), function() {
      curBox().hide();
      ajax.post('al_wall.php', {act: 'publish_postponed', post: post, from: from, hash: hash}, {
        onDone: function (html) {
          if (from == 'one') {
            var p = ge('fw_post');
            if (!p) return;
            hide('fwr_wrap', 'fw_one_replies_wrap');
            if (p.firstChild.nextSibling) {
              p.firstChild.nextSibling.innerHTML = html;
            } else {
              p.appendChild(ce('div', {id: 'post_del' + post, innerHTML: html, className: 'fw_deleted'}));
              hide(p.firstChild);
            }
          } else {
            val('wall_postponed', html);
            if (!html) {
              addClass('wall_postponed', 'wall_postponed_empty');
            }
          }
        },
        progress: 'wpe_prg' + post
      });
    }, getLang('global_cancel'));
  },
  postponedUpdate: function(delta) {
    var c = ge('wall_postponed_cnt'), v = intval(val(c));
    if (delta === -1 || delta === 1 && c) val(c, v += delta);

    if (v == 0) {
      hide('wall_postponed_link');
      addClass('wall_postponed', 'wall_postponed_empty');
    } else {
      show('wall_postponed_link');
      removeClass('wall_postponed', 'wall_postponed_empty');
    }
  },
  cmp: function(id1, id2) {
    var l1 = id1.length, l2 = id2.length;
    if (l1 < l2) {
      return -1;
    } else if (l1 > l2) {
      return 1;
    } else if (id1 < id2) {
      return -1;
    } else if (id1 > id2) {
      return 1;
    }
    return 0;
  },
  receive: function(rows, names) {
    var n = ce('div', {innerHTML: rows}), posts = ge('page_wall_posts'), revert = !!cur.options.revert;
    var current = (revert ? posts.firstChild : posts.lastChild), added = 0;
    for (el = (revert ? n.firstChild : n.lastChild); el; el = re(revert ? n.firstChild : n.lastChild)) {
      if (el.tagName.toLowerCase() == 'input') {
        var old = ge(el.id);
        if (old) {
          posts.replaceChild(el, old);
        }
        continue;
      }
      if (hasClass(el, 'post_fixed')) {
        continue;
      }
      while (current && current.tagName && current.tagName.toLowerCase() == 'div' && !hasClass(current, 'post_fixed') && Wall.cmp(current.id, el.id) < 0) {
        current = (revert ? current.nextSibling : current.previousSibling);
      }
      ++added;
      if (!current) {
        if (revert) {
          posts.appendChild(el);
        } else {
          posts.insertBefore(el, posts.firstChild);
        }
      } else if (!Wall.cmp(current.id, el.id)) {
        posts.replaceChild(el, current);
        current = el;
        --added;
      } else {
        if (revert) {
          posts.insertBefore(el, current);
        } else {
          posts.insertBefore(el, current.nextSibling);
        }
      }
      placeholderSetup(geByTag1('textarea', el), {fast: 1});
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.recache(added);
      FullWall.updateSummary(cur.pgCount);
    }
    Wall.update();
    extend(cur.options.reply_names, names);
    Wall.updateMentionsIndex();
  },
  showMore: function(offset) {
    if (cur.viewAsBox) return cur.viewAsBox();
    if (cur.wallLayer) return;

    var type = cur.wallType;
    var pr = ge('wall_more_progress');
    var tmp = cur.wallLoading = cur.oid;
    ajax.post('al_wall.php', {act: 'get_wall', owner_id: cur.oid, offset: offset, type: type, fixed: cur.options.fixed_post_id || ''}, {
      onDone: function (rows, names, videos) {
        if (tmp !== cur.oid) return;
        delete(cur.wallLoading);
        setTimeout(Wall.receive.pbind(rows, names), 0);
        if (cur.wallVideos) {
          each(videos, function(playlistId, playlist) {
            if (cur.wallVideos[playlistId]) {
              cur.wallVideos[playlistId].list = cur.wallVideos[playlistId].list.concat(playlist.list);
            }
          });
        }
      },
      showProgress: function() {
        show(pr);
        hide(domNS(pr));
      },
      hideProgress: function() {
        show(domNS(pr));
        hide(pr);
      }
    });
  },
  checkTextLen: function(inp, warn, force) {
    if (cur.fixedWide) return;
    var val =  trim(Emoji.editableVal(inp).replace(/\n\n\n+/g, '\n\n'));
    //var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
    if (inp.lastLen === val.length && !force) return;

    var realLen = inp.lastLen = val.length, maxLen = cur.options.max_post_len;
    var brCount = realLen - val.replace(/\n/g, '').length;

    warn = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      show(warn);
      if (realLen > maxLen) {
        warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        warn.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
    } else {
      hide(warn);
    }
  },
  checkPostLen: function(field, warn, val, force) {
    var pf = ge(field);
    val = trim(val).replace(/\n\n\n+/g, '\n\n');
    if (!pf || pf.lastLen === val.length && !force) return;
    var realLen = pf.lastLen = val.length, maxLen = cur.options.max_post_len;
    var brCount = realLen - val.replace(/\n/g, '').length;
    var pw = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      if (realLen > maxLen) {
        pw.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        pw.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        pw.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
      show(pw);
    } else {
      hide(pw);
    }
  },
  postChanged: function(force) {
    if (!isVisible('submit_post')) Wall.showEditPost();
    if (vk.id && intval(cur.oid) == vk.id) {
      clearTimeout(cur.postAutosave);
      if (force === true) {
        Wall.saveDraft();
      } else {
        cur.postAutosave = setTimeout(Wall.saveDraft, (force === 10) ? 10 : 1000);
      }
    }
  },
  saveDraft: function() {
    if (cur.noDraftSave) {
      cur.noDraftSave = false;
      return;
    }
    if (cur.postSent || vk.id != intval(cur.oid)) return;

    var addmedia = cur.wallAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.wallAddMedia ? addmedia.getMedias() : [],
        share = (addmedia.shareData || {})
        msg = val(ge('post_field')), attachI = 0,
        params = {
      act: 'save_draft',
      message: msg,
      hash: cur.options.post_hash
    };

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if (medias.length) {
      var ret = false;
      each (medias, function (k, v) {
        if (!v) return;

        var type = this[0], attachVal = this[1];
        switch (type) {
          case 'poll':
            var poll = addmedia.pollData(true);
            if (!poll) {
              ret = true;
              return false;
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
          break;
          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                ret = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = (share.user_id && share.photo_id) ? share.user_id + '_' + share.photo_id : '';
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            params = extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            var ts = val('postpone_date' + addmedia.lnkId);
            params = extend(params, {postpone: ts});
            return;
        }
        if (this[3] && trim(msg) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
      if (ret) {
        return;
      }
    }
    ajax.post('al_wall.php', Wall.fixPostParams(params), {onFail: function() {
      return true;
    }});
  },
  setDraft: function(data) {
    if (!data[0] && !data[1]) return;
    var field = ge('post_field');
    if (!field) return;

    var draftUncleaned = replaceEntities(data[0] || '');
    val(field, draftUncleaned);
    Wall.showEditPost(function() {
      setTimeout(function() {
        if (data[1] && cur.wallAddMedia) {
          for (var i in data[1]) {
            cur.noDraftSave = true;
            cur.wallAddMedia.chooseMedia.apply(cur.wallAddMedia, data[1][i]);
          }
        }
      }, 0);

    });
  },
  showEditPost: function(callback) {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('post_field').blur() }, 0);
      return cur.viewAsBox();
    }

    if (cur.editing === 0) return;

    setTimeout(function() {
      if (cur.withUpload) {
        if (!cur.uploadAdded) {
          cur.uploadAdded = true;
          if (!window.Upload) {
            stManager.add(['upload.js'], function() {
              WallUpload.init();
            });
          } else {
            WallUpload.init();
          }
        } else {
          WallUpload.show();
        }
      }
    }, 0);

    Wall.initComposer(ge('post_field'), {
      lang: {
        introText: getLang('profile_mention_start_typing'),
        noResult: getLang('profile_mention_not_found')
      },
      checkLen: Wall.postChanged,
      onValueChange: Wall.onPostValChange
    }, callback);

    Wall.hideEditPostReply();
    show('submit_post');
    autosizeSetup('post_field', {minHeight: cur.fullPostHeight || (cur.fullPostView ? 50 : 32), onResize: function() {
      if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
        Pagination.pageTopUpdated();
      }
    }});
    cur.editing = 0;
  },

  initComposer: function (input, options, callback) {
    if (!data(input, 'composer')) {
      if (!cur.composerAdded) {
        stManager.add(['wide_dd.css', 'wide_dd.js'], function() {
          cur.composerAdded = true;
          composer = Composer.init(input, options);
          callback && callback();
          cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
        });
      } else {
        composer = Composer.init(input, options);
        callback && callback();
        cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
      }
    } else {
      callback && callback();
    }
  },
  deinitComposer: function (input) {
    var composer = data(input, 'composer');
    if (composer) {
      Composer.destroy(composer);
    }
    if (input.emojiId && window.Emoji) {
      Emoji.destroy(input.emojiId);
    }
  },
  hasComposerMedia: function (input) {
    var composer = input && data(input, 'composer');
    if (!composer || !composer.addMedia) {
      return false;
    }
    return composer.addMedia.attachCount() > 0;
  },

  onPostValChange: function() {
    if (cur.wallAddMedia) {
      cur.wallAddMedia.checkMessageURLs.apply(window, arguments);
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.pageTopUpdated();
    }
  },
  hideEditPost: function(force) {
    cur.editing = false;
    var rf = ge('post_field'),
        addmedia = cur.wallAddMedia || {},
        empty = true;
    if (browser.opera_mobile || !rf || cur.fullPostView) return;
    each (addmedia.chosenMedias || [], function (k, v) {
      if (v) {
        empty = false;
        return false;
      }
    });
    if (!force && (val(rf) || addmedia.chosenMedia || !empty)) return;
    hide('submit_post');
    if (rf && !rf.value) {
      if (cur.postMention) {
        cur.postMention.options.minHeight = cur.emptyPostheight || 14;
      }
      setStyle(rf, {height: cur.emptyPostheight || 11});
    }
    cur.onWallSendCancel && cur.onWallSendCancel();
    window.WallUpload && WallUpload.hide();
    if (cur.wallAddMedia) {
      cur.wallAddMedia._hideAddMedia(true);
    }
  },
  clearInput: function(type) {
    show('page_add_media');

    if (type == 'fixed') {
      var rf = ge('post_fixed_field');
    } else {
      var rf = ge('post_field');
    }
    if (Wall.withMentions) {
      var mention = data(rf, 'mention');
      if (mention) {
        mention.rtaEl.innerHTML = '';
        hide(mention.cont);
        show(rf);
      }
    }
    rf.value = '';
    rf.blur();
    rf.phonblur();
    Wall.hideEditPost(true);
    if (cur.wallAddMedia) cur.wallAddMedia.unchooseMedia();
    checkbox('export_status', false);
    hide('post_warn');
  },
  fixPostParams: function (params) {
    var newParams = clone(params);
    newParams.Message = params.message;
    delete newParams.message;
    return newParams;
  },
  sendPost: function(inputType) {
    if (inputType == 'fixed') {
      var addmedia = {}, media = {}, medias = [], share = {}, msg = val(ge('post_fixed_field')), edited = [], added = {};
    } else {
      var addmedia = cur.wallAddMedia || {},
          media = addmedia.chosenMedia || {},
          medias = cur.wallAddMedia ? addmedia.getMedias() : [],
          share = (addmedia.shareData || {})
          msg = val(ge('post_field'));
    }
    var postponePost = false;

    var pType = cur.suggesting ? 'suggest' : cur.wallType, params = {
      act: 'post',
      message: msg,
      to_id: cur.postTo,
      type: pType,
      friends_only: isChecked('friends_only'),
      status_export: isChecked('status_export'),
      facebook_export: ge('facebook_export') ? (isChecked('facebook_export') ? 1 : 0) : '',
      official: isChecked('official'),
      signed: isChecked('signed'),
      hash: cur.options.post_hash,
      from: cur.from ? cur.from : '',
      fixed: cur.options.fixed_post_id || ''
    }, ownmsg = (cur.postTo == vk.id || params.official || cur.options.only_official), attachI = 0;
    if (inputType == 'fixed') {
      params['fixed'] = 1;
    }

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if (medias.length) {
      var ret = false;
      each (medias, function (k, v) {
        if (!v) return;
        var type = this[0], attachVal = this[1];
        switch (type) {
          case 'poll':
            var poll = addmedia.pollData();
            if (!poll) {
              ret = true;
              return false;
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
            break;
          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                ret = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = (!share.noPhoto && share.user_id && share.photo_id) ? share.user_id + '_' + share.photo_id : '';
            if (share.images && share.images.length && !share.share_own_image) {
              addmedia.uploadShare(Wall.sendPost);
              ret = true;
              return false;
            }
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            params = extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: share.noPhoto ? '' : replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            var ts = val('postpone_date' + addmedia.lnkId);
            params = extend(params, {postpone: ts});
            cur.postponedLastDate = ts;
            postponePost = true;
            return;
        }
        if (this[3] && trim(msg) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
      if (ret) {
        return;
      }
    }
    if (!attachI && !msg) {
      elfocus('post_field');
      return;
    }

    var sendBtn = ge('send_post');
    if (sendBtn && buttonLocked(sendBtn)) {
      return;
    }

    if (cur.postAutosave) {
      clearTimeout(cur.postAutosave);
    }
    hide('submit_post_error');

    cur.postSent = true;
    setTimeout(function() {
      ajax.post('al_wall.php', Wall.fixPostParams(params), {
        onDone: function(rows, names) {
          Wall.clearInput(inputType);
          cur.postSent = false;
          if (postponePost) {
            if (pType == 'feed') {
              showDoneBox(rows, {out: 3000});
            }
            val(ge('wall_postponed'), rows);
            removeClass('wall_postponed', 'wall_postponed_empty');
            show('wall_postponed');
            return;
          }
          Wall.hidePostponed();
          if ((pType == 'full_own' || pType == 'full_all') && cur.pgStart) {
            var nloc = clone(nav.objLoc);
            delete(nloc.offset);
            if (vk.id != cur.oid) {
              delete(nloc.own);
            }
            return nav.go(nloc);
          }
          if (vk.id != cur.oid && pType == 'full_own') {
            var nloc = clone(nav.objLoc);
            delete(nloc.own);
            return nav.go(nloc);
          }
          if (pType == 'feed') {
            return cur.wallPostCb();
          }
          if (pType == 'suggest') {
            val('page_suggestions', rows);
            toggle('page_suggest_more', names);
            return Wall.suggestUpdate();
          } else if (cur.suggestsView) {
            Wall.suggest();
          }
          Wall.receive(rows, names);
          if (!ownmsg && cur.wallType == 'own') {
            Wall.switchWall();
          }

          if (cur.onWallSendPost) {
            cur.onWallSendPost();
          }
        },
        onFail: function(msg) {
          cur.postSent = false;
          if (!msg) {
            return true;
          }
          ge('submit_post_error').innerHTML = msg;
          if (!isVisible('submit_post_error')) {
            slideDown('submit_post_error', 100);
          }
          return true;
        },
        showProgress: function() {
          lockButton(sendBtn);
        },
        hideProgress: function() {
          unlockButton(sendBtn);
        }
      });
    }, 0);
  },

  _repliesLoaded: function(post, hl, replies, names, data) {
    var r = ge('replies' + post), openEl = r.nextSibling;
    var a = vkNow();
    if (hl) {
      var h = r.offsetHeight;
      r.innerHTML = replies;
      var scrollEl = (browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode));
      scrollEl.scrollTop = intval(scrollEl.scrollTop) + (r.offsetHeight - h);
      setTimeout(Wall.highlightReply.pbind('post' + hl), 0);
    } else {
      r.innerHTML = replies;
    }
    debugLog('render in', vkNow() - a);
    if (openEl && openEl.className == 'replies_open') {
      re(openEl);
    }

    ajax._framenext();

    if (post == cur.wallLayer) {
      var reverse = wkcur.reverse;
      extend(wkcur, {
        offset: !reverse && data.offset || 0,
        loaded: data.num || geByClass('reply', r, 'div').length,
        count: data.count
      });
      extend(wkcur.options.reply_names, names);
      WkView.wallUpdateReplies();
      if (!reverse) {
        wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
        WkView.wallUpdateRepliesOnScroll();
      }
    } else {
      extend(cur.options.reply_names, names);
      Wall.repliesSideSetup(post);
    }
    Wall.updateMentionsIndex();
    setTimeout(function() {
      var _a = window.audioPlayer, aid = currentAudioId();
      if (_a && aid && _a.showCurrentTrack) {
        _a.showCurrentTrack();
      }
    }, 10);
  },
  repliesSideSetup: function (post) {
    if (cur.wallLayer == post) {
      WkView.wallUpdateReplies();
      return;
    }
    if (browser.msie6 || browser.msie7) return;
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        h = r && r.offsetHeight || 0,
        ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
        side = ge('replies_side' + post);

    if (cur.wallMyOpened[post] && header) {
      if (!side) {
        var sideWrap = se('<div class="replies_side_wrap"><div id="replies_side' + post + '" class="replies_side"><div class="replies_side_icon" id="replies_side_icon' + post + '"></div></div></div>')
        r.parentNode.insertBefore(sideWrap, r);
        side = sideWrap.firstChild;
        side.onclick = Wall.repliesSideClick.pbind(post);
        side.onmouseover = Wall.repliesSideOver.pbind(post);
        side.onmouseout = Wall.repliesSideOut.pbind(post);
      }
      setStyle(side, {height: r.clientHeight - 31});
      show(side);
    } else {
      hide(side);
    }
  },
  repliesSideClick: function (post) {
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        st = scrollGetY(),
        pos = getXY(r)[1];

    if (st > pos) {
      scrollToY(pos - 100, 0);
    }
    hide('replies_side' + post);
    return Wall.showReplies(post, 3, false);
  },
  repliesSideOver: function (post) {
    var side = ge('replies_side' + post);

    addClass(side, 'replies_side_over');
    setStyle(side, {height: ge('replies' + post).clientHeight - 51});

    var icon = ge('replies_side_icon' + post),
        top = getXY(side)[1],
        h = side.clientHeight;

    var minOffset = 16,
        maxOffset = h - 23,
        minSt = top + minOffset - 16,
        maxSt = top + maxOffset - 16;


    cur.wallRepliesSideOver = [
      post,
      icon,
      false,
      minSt,
      maxSt,
      getXY(side)[0] + 18,
      maxOffset,
      false
    ];
    Wall.repliesSideUpdate();
  },
  repliesSideOut: function (post) {
    removeClass(ge('replies_side' + post), 'replies_side_over');
    if (cur.wallRepliesSideOver && cur.wallRepliesSideOver[0] == post) {
      delete cur.wallRepliesSideOver;
    }
  },

  repliesSideUpdate: function (st) {
    var postData = cur.wallRepliesSideOver;
    if (!postData) return;

    var curState = postData[7], newState;
    if (st === undefined) {
      st = scrollGetY();
    }
    if (st < postData[3]) {
      if (curState != 1) {
        setStyle(postData[1], {position: 'absolute', top: '16px', bottom: 'auto', left: '18px'})
        postData[7] = 1;
      }
    } else if (st < postData[4]) {
      if (curState != 2) {
        setStyle(postData[1], {position: 'fixed', top: '16px', bottom: 'auto', left: postData[5]})
        postData[7] = 2;
      }
    } else {
      if (curState != 3) {
        setStyle(postData[1], {position: 'absolute', bottom: '16px', top: 'auto', left: '18px'})
        postData[7] = 3;
      }
    }
  },
  highlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
      setTimeout(function() {
        animate(el, {backgroundColor: '#FFF'}, 200);
      }, 1000);
    });

    if (cur.wallLayer) {
      var top = getXY(el, true)[1];
      if (top < 0 || top > lastWindowHeight - 200) {
        animate(wkLayerWrap, {scrollTop: wkLayerWrap.scrollTop + top - 50}, 300, hlfunc);
      } else {
        hlfunc();
      }
      return;
    }

    var xy = getXY(el), top = xy[1] - (bodyNode.scrollTop || htmlNode.scrollTop || 0);
    if (top < 0) {
      var cont = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      animate(cont, {scrollTop: cont.scrollTop + top - 50}, 300, hlfunc);
    } else {
      hlfunc();
    }
  },
  showReply: function(post, reply) {
    if (cur.viewAsBox) return false;
    var p = ge('post' + reply);
    if (p) {
      Wall.highlightReply(p);
    } else {
      if (cur.wallLayer == post) {
        WkView.wallShowPreviousReplies(reply);
      } else {
        Wall.showReplies(post, false, reply);
      }
    }
    return false;
  },
  showReplies: function(post, count, hl, ev) {
    if (checkEvent(ev || window.event)) { return true; }
    if (cur.viewAsBox) return cur.viewAsBox();
    if (cur.fixedWide || cur.wallLayer == post && wkcur.reverse) {
      return;
    }
    hide('wrh_text' + post);
    cur.wallMyOpened[post] = (count != 3);
    var params = {
      act: 'get_replies',
      post: post,
      count: count
    }, opts = {
      onDone: Wall._repliesLoaded.pbind(post, hl),
      onFail: show.pbind('wrh_text' + post),
      progress: 'wrh_prg' + post,
      local: 1
    };
    if (!hl && (!count || count > 20)) {
      extend(params, {cont: 'replies' + post});
      extend(opts, {frame: 1});
      if (!browser.msie6 && !browser.msie7)  {
        cur.onFrameBlocksDone = /*vkLocal(*/function () {
          setTimeout(Wall.repliesSideSetup.pbind(post), browser.msie ? 100 : 10);
        }/*)*/
      }
    }
    ajax.post('al_wall.php', params, opts);

    if (!browser.msie && count > 0 && count < 10) {
      var cont = ge('replies' + post), el = cont && cont.lastChild, slice = [];
      while (slice.length < count && el) {
        if (el.tagName == 'DIV' && hasClass(el, 'reply')) {
          slice.push(el);
        }
        el = el.previousSibling;
      }
      if (slice.length == count) {
        var total = geByClass('reply', cont, 'div').length;
        val(cont, '<a class="wr_header wrh_all"></a>');
        Wall.updateRepliesHeader(post, cont.firstChild, count, total);
        while (slice.length) {
          cont.appendChild(slice.pop());
        }
        hide('wrh_text' + post);
        show('wrh_prg' + post);
      }
    }
    return false;
  },
  moreReplies: function(post, offset, count, opts) {
    if (!opts.append) {
      hide('wrh_text' + post);
    }
    var params = {act: 'get_replies', offset: offset, post: post, count: count};
    extend(params, {rev: opts.rev, from: opts.from});

    ajax.post('al_wall.php', params, {
      onDone: function(replies, names, data) {
        var r = ge('replies' + post);
        if (opts.clear) {
          // r.removeChild(r.firstChild); // remove header
          r.innerHTML = replies;
        } else if (opts.rev || opts.append) {
          r.appendChild(cf(replies))
        } else {
          r.removeChild(r.firstChild); // remove header
          r.innerHTML = replies + r.innerHTML;
        }
        extend((post == cur.wallLayer ? wkcur : cur).options.reply_names, names);
        if (opts.onDone) {
          opts.onDone(replies, names, data);
        }
        Wall.updateMentionsIndex();
      },
      onFail: !opts.append && show.pbind('wrh_text' + post),
      showProgress: opts.showProgress,
      hideProgress: opts.hideProgress,
      progress: opts.progress || 'wrh_prg' + post
    });
    return false;
  },
  emojiOpts: {},
  getReplyName: function (id) {
    return (((cur.wallLayer ? wkcur : cur).options || {}).reply_names || {})[id] || [];
  },
  emojiShowTT: function(post, obj, ev) {
    if (Wall.emojiOpts[post] === undefined) {
      return false;
    }
    return Emoji.ttShow(Wall.emojiOpts[post], obj, ev);
  },
  emojiHideTT: function(post, obj, ev) {
    if (Wall.emojiOpts[post] === undefined) {
      return false;
    }
    return Emoji.ttHide(Wall.emojiOpts[post], obj, ev);
  },
  showEmojiTT: function(post, obj, ev) {
    if (Wall.emojiOpts[post] === undefined) {
      return false;
    }
    return Emoji.ttClick(Wall.emojiOpts[post], obj, false, false, ev);
  },
  initReplyEditable: function(txt, cont, post, fixed) {
    if (txt.emojiInited) {
      return false;
    }
    txt.emojiInited = true;
    stManager.add(['emoji.js', 'notifier.css'], function() {
      var optId = Emoji.init(txt, {
        ttDiff: fixed ? -40 : -42,
        rPointer: true,
        controlsCont: cont,
        shouldFocus: true,
        onSend: function() {
          Wall.sendReply(post);
          txt.blur();
        },
        ctrlSend: function() {
          return cur.wallTpl.reply_multiline;
        },
        //sharedTT: cur.sharedIm,
        checkEditable: Wall.checkTextLen.pbind(txt, 'reply_warn' + post),
        onStickerSend: function(stNum) {
          Wall.sendReply(post, false, stNum);
        }
      });
      Wall.emojiOpts[post] = optId;
      if (cur.afterEmojiInit && cur.afterEmojiInit[post]) {
        var sm = geByClass1('emoji_smile', Emoji.opts[optId].controlsCont);
        if (isVisible(sm)) {
          cur.afterEmojiInit[post]();
          delete cur.afterEmojiInit[post];
        }
      }
    });
  },
  showEditReply: function(post, ev, fixed) {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('reply_field' + post).blur() }, 0);
      return cur.viewAsBox();
    }
    var rf = ge('reply_field' + post),
        postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post),
        fakeBox = ge('reply_fakebox' + post),
        realBox = ge('reply_box' + post),
        replyLink;

    if (fakeBox) {
      var postHash = ge('post_hash' + post),
          canReplyAsGroup = intval(postHash && postHash.getAttribute('can_reply_as_group')) > 0;

      realBox = se(rs(cur.wallTpl.reply_form, {
        reply_as_group_class: canReplyAsGroup ? 'reply_as_group_active' : '',
        post_id: post
      }));
      fakeBox.parentNode.replaceChild(realBox, fakeBox);
      rf = ge('reply_field' + post);
      Wall.initReplyEditable(rf, realBox, post, fixed);
      //!browser.msie6 && placeholderSetup(rf, {pad: {margin: 0, padding: 0}});
    } else {
      Wall.initReplyEditable(rf, realBox, post, fixed);
    }
    if (cur.editing === post) {
      Emoji.editableFocus(rf, false, true);
      return cancelEvent(ev);
    }
    Wall.hideEditPostReply();
    addClass(postEl, 'reply_box_open');
    setStyle('replies_wrap' + post, {display: ''});

    cur.editing = post;
    if (window.Emoji) {
      setTimeout(Emoji.editableFocus.pbind(rf, false, true), 0);
    }

    if (!data(rf, 'composer') && (fakeBox || cur.fixedWide || cur.wallLayer)) {
      var mediaTypes = [];
      each ((cur.wallLayer == post ? wkcur : cur).options.rmedia_types || cur.options.media_types || [], function () {
        if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link', 'page'])) {
          mediaTypes.push(this);
        }
      });
      var media;
      if (mediaTypes.length > 0 && post.match(/^-?\d+_(photo|video|topic)?\d+$/)) {
        media = {
          lnk: ge('reply_media_lnk' + post).firstChild,
          preview: ge('reply_media_preview' + post),
          types: mediaTypes,
          options: {limit: 2, disabledTypes: ['album'], toggleLnk: true}
        };
        if (post.match(/^-?\d+_topic/)) {
          extend(media.options, {
            disabledTypes: ['album', 'share', 'link', 'page'],
            limit: 10,
            editable: 1,
            sortable: 1,
            teWidth: 280,
            teHeight: 200
          });
        }
      } else {
        re('reply_media_lnk' + post);
      }
      Wall.initComposer(rf, {
        lang: {
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found')
        },
        wddClass: 'reply_composer_dd',
        width: getSize(rf.parentNode)[0],
        media: media
      });
    }
    if (rf.emojiId !== undefined && cur.afterEmojiInit && cur.afterEmojiInit[post]) {
      cur.afterEmojiInit[post]();
      delete cur.afterEmojiInit[post];
    }

    if (cur.wallTpl && cur.wallTpl.reply_multiline_intro && !cur.fixedWide) {
      ajax.post('al_wall.php', {act: 'a_ctrl_submit_intro', hash: cur.wallTpl.poll_hash}, {
        onDone: function (perform) {
          if (perform && cur.editing === post) {
            Wall.replySubmitTooltip(post, 1);
          }
        },
        onFail: function () {
          return true;
        }
      })
    }
    return cancelEvent(ev);
  },
  hideEditReply: function(post) {
    cur.editing = false;

    var rf = ge('reply_field' + post),
        postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post),
        replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
        v = trim(window.Emoji ? Emoji.editableVal(rf) : ''),
        hasMedia = Wall.hasComposerMedia(rf),
        replyLink;

    if (!rf || hasMedia) return;
    if (replyName && isArray(replyName)) {
      if (!v || !replyName[1].indexOf(v)) {
        val(rf, '');
        v = '';
      }
    }
    if (browser.opera_mobile || browser.safari_mobile || v) return;
    removeClass(postEl, 'reply_box_open');
    if (replyLink = ge('reply_link' + post)) {
      hide('replies_wrap' + post);
    }
    rf.blur();
    if (cur.fixedWide) {
      hide('submit_reply' + post);
    }
    if (!rf.active && !cur.fixedWide) {
      setStyle(rf, {height: 14});
    }
    rf.phonblur && rf.phonblur();
    val('reply_to' + post, '');
    hide('reply_to_title' + post);
    cur.reply_to = false;

    var point = cur.replySubmitSettings;
    point && point.tt && point.tt.el && point.tt.destroy();
  },
  replyTo: function(post, toMsgId, toId, event) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    Wall.showEditReply(post);
    val('reply_to' + post, toMsgId);
    var replyNameOld = cur.reply_to && Wall.getReplyName(cur.reply_to[0]);
    cur.reply_to = [toId, toMsgId];
    var replyName = Wall.getReplyName(toId);
    if (isArray(replyName) && window.Emoji) {
      val('reply_to_title' + post, replyName[0]);
      var rf = ge('reply_field' + post);
      var v = trim(Emoji.val(rf));
      v = v.replace(/&nbsp;/g, ' ');
      if (!v || replyNameOld && isArray(replyNameOld) && !winToUtf(replyNameOld[1]).indexOf(v)) {
        Emoji.val(rf, !checkEvent(event) ? replyName[1] : '');
        Emoji.focus(rf, true);
      }
    } else {
      val('reply_to_title' + post, replyName);
    }
    show('reply_to_title' + post);

    var replyAs = ge('reply_as_group' + post),
        replyParts = post.match(/^(-?\d+)_([a-z]+)?(\d+)$/),
        replyOid = replyParts[1],
        replyType = replyParts[2] || '',
        reply = ge('post' + replyOid + replyType + '_' + toMsgId),
        replyTo = reply && geByClass1('reply_to', reply, 'a');

    toggleClass(replyAs, 'on', (replyAs && isVisible(replyAs.parentNode) && replyOid < 0 && replyTo && replyTo.getAttribute('rid') === replyOid) ? true : false);
    (event || {}).cancelBubble = true;
    return false;
  },
  replySubmitTooltip: function (post, over, place) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    var box = ge('reply_box' + post),
        hintPlace = box && geByClass1('button_blue', box, 'div'),
        point = cur.replySubmitSettings;

    if (place && hintPlace && isVisible(hintPlace)) {
      return
    }
    place = place || hintPlace;
    if (hasClass(place, 'flat_button') && buttonLocked(place)) {
      return;
    }


    if (!point) {
      point = cur.replySubmitSettings = ce('div', {className: 'reply_multiline_tt_point'});
    }
    if (!over) {
      if (point && point.tt && point.tt.hide) {
        point.tt.hide();
      }
      return;
    }

    if (point.parentNode == place && point.tt && point.tt.show) {
      point.tt.show();
      return;
    }

    point.tt && point.tt.el && point.tt.destroy();
    place.insertBefore(point, place.firstChild);
    var ctrlSubmit = cur.wallTpl.reply_multiline ? 1 : 0,
        hint = rs(cur.wallTpl.reply_multiline_hint, {
      enabled: ctrlSubmit ? 'on' : '',
      disabled: !ctrlSubmit ? 'on' : ''
    });

    showTooltip(point, {
      text: hint,
      className: 'reply_multiline_tt rich',
      slideX: -15,
      shift: [244, -31, -123],
      hasover: 1,
      toup: 1,
      showdt: 700,
      hidedt: 700,
      onCreate: function () {
        radioBtns.reply_submit = {
          els: Array.prototype.slice.apply(geByClass('radiobtn', ge('reply_submit_hint_opts'))),
          val: hint ? 1 : 0
        };
      }
    });
  },
  onReplySubmitChanged: function (value, from) {
    cur.wallTpl.reply_multiline = value;
    if (from) {
      var point = cur.replySubmitSettings;
      point && point.tt && point.tt.el && point.tt.destroy();
    } else {
      ajax.post('al_wall.php', {act: 'a_save_ctrl_submit', value: value, hash: cur.wallTpl.poll_hash})
      window.Notifier && Notifier.lcSend('wall_reply_multiline', {value: value});
    }
  },
  onReplySubmit: function (post, e) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    var rf = ge('reply_field' + post);
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      var composer = data(rf, 'composer'),
          isListVisible = composer && composer.wdd && composer.wdd.listWrap && isVisible(composer.wdd.listWrap);

      if (cur.wallTpl.reply_multiline && (e.ctrlKey || browser.mac && e.metaKey) ||
          !cur.wallTpl.reply_multiline && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey) && !isListVisible ||
          cur.fixedWide) {
        Wall.sendReply(post);
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var v = val(rf),
          pos = Composer.getCursorPosition(rf);

      val(rf, v.substr(0, pos) + "\n" + v.substr(pos));
      elfocus(rf, pos + 1, pos + 1);

      rf.autosize.update();
      setTimeout(function () {
        rf.autosize.update();
      }, 0);
      return cancelEvent(e);
    }
  },
  sendReply: function(post, ev, stickerNum) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    var rf = ge('reply_field' + post),
        composer = rf && data(rf, 'composer'),
        replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
        state;

    if (stickerNum) {
      var params = {message: '', attach1_type: "sticker", attach1: stickerNum};
    } else {
      var params = composer ? Composer.getSendParams(composer, Wall.sendReply.pbind(post)) : {message: trim(Emoji.editableVal(rf))};
      if (params.delayed) {
        return;
      }

      if (!params.attach1_type) {
        if (!params.message ||
            isArray(replyName) && !replyName[1].indexOf(params.message)) {
          Emoji.editableFocus(ge('reply_field' + post), false, true);
          return;
        }
      }

      if (composer) {
        state = Composer.reset(composer);
      } else if (window.Emoji) {
        Emoji.val(rf, '');
      }
      if (rf.autosize) {
        rf.autosize.update();
      }
    }

    if (browser.mobile) {
      Wall.hideEditReply(post);
    } else {
      Emoji.editableFocus(rf, false, true);
    }

    cur.wallMyReplied[post] = 1;
    cur.wallMyOpened[post] = 1;
    var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash,
        fromGroupEl = ge('reply_as_group' + post),
        newEl = null;

    extend(params, {
      act: 'post',
      type: cur.wallType,
      reply_to: post,
      reply_to_msg: val('reply_to' + post),
      reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
      start_id: val('start_reply' + post),
      from: window.cur.wallLayer == post && 'wkview' || '',
      hash: post_hash
    });

    if (cur.fixedWide || cur.reverse) {
      params.rev = 1;
    }
    if (fromGroupEl && isVisible(fromGroupEl.parentNode)) {
      params.from_group = isChecked(fromGroupEl); // else autodetect
    }

    ajax.post('al_wall.php', Wall.fixPostParams(params), {
      onDone: function(reply, replies, names, data) {
        cur.wallMyReplied[post] = 0;
        re('reply_link' + post);
        hide('reply_warn' + post);
        Wall._repliesLoaded(post, false, replies, names, data);
      },
      onFail: function () {
        newEl && re(newEl);
        if (composer) {
          state = Composer.restore(composer, state);
        } else {
          val(rf, params.message);
        }
        if (rf.autosize) rf.autosize.update();
      },
      showProgress: lockButton.pbind(ge('reply_button' + post)),
      hideProgress: unlockButton.pbind(ge('reply_button' + post))
    });

    if (params.from_group || !params.message) return;

    var repliesEl = ge('replies' + post),
        replyId = -(++cur.wallMyRepliesCnt);

    var message = Emoji.emojiToHTML(clean(params.message), true)
    newEl = se(rs(cur.wallTpl.reply_fast, {
      reply_id: '0_' + replyId,
      message: message.replace(/\n/g, '<br/>'),
      date: Wall.getNowRelTime(cur)
    }));

    if (repliesEl && !isVisible(repliesEl) || ge('reply_link' + post)) {
      re('reply_link' + post);
      show('replies_wrap' + post);
    } else {
      var openEl = repliesEl.nextSibling;
      if (openEl && openEl.className == 'replies_open') {
        Wall.openNewComments(post);
      }
      var headerEl = geByClass1('wr_header', repliesEl, 'a'),
          shown = geByClass('reply', repliesEl, 'div').length + 1,
          total = shown;
      if (headerEl) {
        total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
      }
      if ((total > 5 || shown < total) && !cur.fixedWide) {
        if (!headerEl) {
          repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
        }
        Wall.updateRepliesHeader(post, headerEl, shown, total);
      }
    }
    if (cur.fixedWide || cur.reverse) {
      repliesEl.insertBefore(newEl, repliesEl.firstChild);
    } else {
      repliesEl.appendChild(newEl);
    }

    if (window.cur.wallLayer == post) {
      WkView.wallUpdateReplies();
      if (!cur.reverse) {
        wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
        WkView.wallUpdateRepliesOnScroll();
      }
    }
  },
  postTooltip: function(el, post, opts) {
    if (cur.viewAsBox) return;
    var reply = (opts || {}).reply;

    showTooltip(el, {
      url: 'al_wall.php',
      params: extend({act: 'post_tt', post: post}, opts || {}),
      slide: 15,
      shift: [(reply && !(reply % 2)) ? 329 : 64, 0, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },

  hideEditPostReply: function(e) {
    if (cur.fixedWide) {
      removeClass(ge('wall_fixed_comments'), 'wall_fixed_reply_to');
      hide('submit_reply'+cur.fixedPostRaw)
      return true;
    }
    if (cur.editing === false || isVisible(boxLayerBG) || isVisible(layerBG)) return;
    var el = (e && e.target) ? e.target : {};
    var id = el.id;
    if (cur.editing) {
      if (cur.editingHide) {
        cur.editingHide(cur.editing, el);
      } else if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
        Wall.hideEditReply(cur.editing);
      }
    } else if (!(cur.wallAddMedia || {}).chosenMedia) {
      if (!e || id != 'post_field') {
        Wall.hideEditPost();
      }
    }
  },
  deletePost: function(post, hash, root, force) {
    (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 1;
    var r = ge('post' + post);
    ajax.post('al_wall.php', {
      act: 'delete',
      post: post,
      hash: hash,
      root: root ? 1 : 0,
      confirm: force ? 1 : 0,
      from: 'wall'
    }, {
      onDone: function(msg, res, need_confirm) {
        if (need_confirm) {
          var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() { box.hide(); wall.deletePost(post, hash, root, 1); }, getLang('box_cancel'));
          return;
        }
        var t = geByClass1('post_table', r) || geByClass1('reply_table', r) || geByClass1('feedback_row_t', r);
        revertLastInlineVideo(t);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        hide(t);
        if (domNS(t).className == 'post_publish') hide(domNS(t));
        if (hasClass(r, 'suggest')) {
          Wall.suggestUpdate(-1);
        } else if (hasClass(r, 'postponed')) {
          Wall.postponedUpdate(-1);
        } else if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(-1);
          FullWall.updateSummary(cur.pgCount);
        } else if (cur.wallType == 'own' || cur.wallType == 'all') {
          if (hasClass(r, 'own')) ++cur.deletedCnts.own;
          if (hasClass(r, 'all')) ++cur.deletedCnts.all;
          Wall.update();
        }
      }
    });
    var btn = ge('delete_post' + post), myReply;
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  markAsSpam: function(post, hash, el) {
    ajax.post('al_wall.php', {
      act: 'spam',
      post: post,
      hash: hash,
      from: el ? 'inline' : ''
    }, {
      onDone: function(msg, js) {
        if (el) {
          domPN(el).replaceChild(ce('div', {innerHTML: msg}), el);
        } else {
          var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r) || geByClass1('feedback_row_t', r);
          revertLastInlineVideo(r);
          var pd = ge('post_del' + post);
          if (pd) {
            pd.innerHTML = msg;
            show(pd);
          } else {
            r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
          }
          hide(t);
        }
        if (js) {
          eval(js);
        }
      }, showProgress: el ? function() {
        hide(el);
        show(domNS(el) || domPN(el).appendChild(ce('span', {className: 'progress_inline'})));
      } : false, hideProgress: el ? function() {
        show(el);
        re(domNS(el));
      } : false,
      stat: ['privacy.js', 'privacy.css']
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  restorePost: function(post, hash, root) {
    (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 0;
    ajax.post('al_wall.php', {
      act: 'restore',
      post: post,
      hash: hash,
      root: root ? 1 : 0
    }, {
      onDone: function(msg) {
        var pd = ge('post_del' + post);
        if (!pd) return;
        var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r) || geByClass1('feedback_row_t', r);
        show(t);
        if (domNS(t).className == 'post_publish') show(domNS(t));
        hide(pd);
        if (hasClass(r, 'suggest')) {
          Wall.suggestUpdate(1);
        } else if (hasClass(r, 'postponed')) {
          Wall.postponedUpdate(1);
        } else if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(1);
          FullWall.updateSummary(cur.pgCount);
        } else if (cur.wallType == 'own' || cur.wallType == 'all') {
          if (hasClass(r, 'own')) --cur.deletedCnts.own;
          if (hasClass(r, 'all')) --cur.deletedCnts.all;
          Wall.update();
        }
      }
    });
  },
  blockPostApp: function(aid, from, hash, obj) {
    ajax.post('al_wall.php', {act: 'block_post_app', aid: aid, from: from, hash: hash}, {
      onDone: function(text) {
        obj.parentNode.parentNode.innerHTML = text;
      },
      showProgress: lockButton.pbind(obj),
      hideProgress: unlockButton.pbind(obj)
    });
  },

  checkPostClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return true;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /wall_post_text|published_comment|reply_link_wrap|post_media|event_share|public_share|group_share|feed_friends|feed_gifts|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          inArray(target.className, ['play_new', 'page_video_inline_wrap']) ||
          (foundGood = target.className.match(classRE))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return false;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return false;
    }
    return target || true;
  },
  postClick: function (post, event, opts) {
    var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + post);
    if (opts && opts.skipCheck) {
      var clickEl = true;
    } else {
      var clickEl = Wall.checkPostClick(el, event);
    }
    if (!clickEl) return;

    if (clickEl !== true) {
      var moreLink = geByClass1('wall_post_more', clickEl, 'a');
      if (moreLink && isVisible(moreLink)) {
        moreLink.onclick();
        if (!matches) removeClass(el, 'wall_post_over');
        return;
      }
    }

    if (!matches) return;

    if (hasClass(el, 'suggest') || geByClass1('post_publish', el)) return;
    var url = 'wall' + matches[1] + '_' + matches[3];
    if (browser.mobile && event) {
      nav.go(url);
    } else if (checkEvent(event)) {
      window.open(url, '_blank');
    } else {
      Wall.hideEditPostReply();
      Wall.postFull('wall' + matches[1] + '_' + matches[3], false, opts);
    }
  },
  postClickStat: function(event) {
    event = normEvent(event);
    var elem = event.currentTarget;
    var posts = [];
    if (elem.getAttribute('data-ad-view')) {
      posts.push(Wall.postsGetRaws(elem));
      Page.postsSeen(posts);
      __adsUpdateExternalStats(elem);
    }
  },
  copyHistory: function(ev, el, post, offset) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement,
        i = 8,
        foundGood = false,
        classRE = /published_a_quote/;
    do {
      if (!target ||
          (foundGood = target.className.match(classRE)) ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG'])
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) return;
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) return;

    ajax.post('al_wall.php', {act: 'copy_history', post: post, offset: offset}, {onDone: function(rows) {
      if (!domPN(el)) return;

      hide(el);
      if (!rows) return;

      var after = hasClass(domPN(el), 'published_by_quote') ? domPN(el) : el;
      domPN(after).insertBefore(cf(rows), domNS(after));
      if (isAncestor(after, 'im_rows')) {
        IM.updateScroll(true);
      } else if (isAncestor(after, 'wl_post')) {
        WkView.wallUpdateReplies();
      }
    }});

    return cancelEvent(ev);
  },
  postFull: function (post, event, opts) {
    if (post.match(/^wall-?\d+_\d+$/) && !(opts || {}).nolist) {
      switch (cur.wallType) {
        case 'all':
        case 'full_all':
          post += '/all';
          break;

        // case 'feed':
        //   if (cur.section == 'news') {
        //     post += '/feed';
        //   }
        //   break;
      }
    }
    return showWiki({w: post}, false, event, opts);
  },
  checkReplyClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /reply_dived/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          target.tagName == 'A' && target.className != '_reply_lnk' ||
          inArray(target.tagName, ['IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          target.id == 'wpe_cont' ||
          (foundGood = hasClass(target, 'reply_table'))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  replyClick: function (post, reply, event, answering) {
    var oid_pid = post.split('_');
    var oid = intval(oid_pid[0]), pid_type = oid_pid[1].replace(/-?\d+$/, ''),
        el = ge('post' + oid + pid_type + '_' + reply);

    if (!cur.stickerClicked && Wall.checkReplyClick(el, event)) return;
    (event || {}).cancelBubble = true;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (answering) {
      var productId = cur.stickerClicked || false,
          rf = ge('reply_field' + post);
      cur.stickerClicked = false;
      if (productId && (!rf || !rf.emojiInited)) {
        cur.afterEmojiInit = cur.afterEmojiInit || {};
        cur.afterEmojiInit[post] = function() {
          Emoji.clickSticker(productId, ge('reply_field' + post));
        };
      }
      Wall.replyTo(post, reply, answering, event);
      if (productId && rf && rf.emojiInited) {
        Emoji.clickSticker(productId, rf);
      }
    }
  },
  stickerClick: function(packId, obj, event) {
    (event || {}).cancelBubble = true;
    if (!window.Emoji) {
      stManager.add(['emoji.js', 'notifier.css'], function() {
        Wall.stickerClick(packId, obj);
      });
      return;
    }
    if (!obj) {
      Emoji.clickSticker(packId, false);
      return;
    }

    var en = Emoji.isStickerPackEnabled(packId, Wall.stickerClick.pbind(packId, obj));
    if (en === 0) {
      return;
    } else if (!en) {
      Emoji.clickSticker(packId, false);
    } else {
      var searchClass = cur.onepost ? 'fw_reply_info' : 'reply',
          el = obj.parentNode,
          i = 8;
      do {
        if (!el || hasClass(el, searchClass)) {
          break;
        }
      } while (i-- && (el = el.parentNode));
      if (cur.onepost && el && (el = geByClass1('reply_to_link', el)) && el.onmouseup) {
        cur.stickerClicked = packId;
        el.onmouseup();
      } else if (!cur.onepost && el && el.onclick) {
        cur.stickerClicked = packId;
        el.onclick();
      }
    }
  },

  postOver: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/) || isVisible(geByClass1('wall_post_more', el, 'a'))) {
      addClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    Wall.showDeletePost(post);
  },
  postOut: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;

    removeClass(el, 'wall_post_over');
    if (!vk.id) return;

    if (!el || hasClass(el, 'one')) return;
    Wall.hideDeletePost(post);
  },


  replyOver: function(post) {
    if (!vk.id) return;
    var postParts = post.split('_'),
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|topic|market)/) ? '_comment' : '_wall_reply'),
        lnk = ge('like_link' + reply),
        icon = ge('like_icon' + reply);

    if (!lnk) {
      Wall._animDelX(0.3, undefined, post, 'reply_delete');
      Wall._animDelX(0.3, undefined, post, 'reply_edit');
      return;
    }

    if (lnk.timeout) {
      clearTimeout(lnk.timeout);
      removeAttr(lnk, 'timeout');
    } else {
      fadeTo(lnk, 200, 1);
      Wall._animDelX(0.3, undefined, post, 'reply_delete');
      Wall._animDelX(0.3, undefined, post, 'reply_edit');
      if (hasClass(icon, 'no_likes')) {
        setStyle(icon, 'visibility', 'visible');
        animate(icon, {opacity: 0.4}, 200);
      }
    }
  },
  replyOut: function(post) {
    if (!vk.id) return;
    var postParts = post.split('_'),
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|topic|market)/) ?  '_comment' : '_wall_reply'),
        lnk = ge('like_link' + reply),
        icon = ge('like_icon' + reply);

    if (!lnk) {
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      return;
    }

    lnk.timeout = setTimeout(function() {
      removeAttr(lnk, 'timeout');
      if (!hasClass(icon, 'no_like_hide')) fadeTo(lnk, 200, 0);
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      if (hasClass(icon, 'no_likes') && !hasClass(icon, 'no_like_hide')) {
        animate(icon, {opacity: 0}, 200, function () {
          hasClass(icon, 'no_likes') && (icon.style.visibility = 'hidden');
        });
      }
    }, 1);
  },
  likeOver: function(post, opts) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post);
    if (!icon) return;
    opts = opts || {};
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(icon, {opacity: 1}, 200, false), 1);
    } else {
      icon.style.visibility = 'visible';
      setStyle(icon, {opacity: 1});
    }
    if (cur.viewAsBox) return;
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        leftShift = opts.leftShift || (link.parentNode == icon.parentNode ? 0 : linkW),
        pointerShift = false,
        ttW = 230,
        x = getXY(icon.parentNode)[0], rem = vk.id ? 0 : 10;

    if (x - (link.parentNode == icon.parentNode ? 0 : linkW) - (opts.noLabels ? 50 : 0) + ttW + 5 > lastWindowWidth) {
      leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 4;
      pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;
      if (opts.noLabels) {
        leftShift -= 5;
        pointerShift -= 1;
      }
    } else {
      leftShift = (link.parentNode == icon.parentNode ? 0 : linkW) + rem;
      pointerShift = linkW + 2 + rem;
      if (opts.noLabels) {
        leftShift += 50;
        pointerShift += 48;
      }
    }

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj},
      slide: 15,
      shift: [leftShift, opts.topShift || 5, 9],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          Wall.postOver(post);
          Wall.likeOver(post);
        },
        out: function() {
          Wall.likeOut(post);
          Wall.postOut(post);
        }
      },
      className: 'rich like_tt ' + (opts.cl || ''),
      onShowStart: function (tt) {
        if (!tt.container || pointerShift === false) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  likeOut: function(post, opts) {
    var icon = ge('like_icon' + post);
    if (!icon) return;
    opts = opts || {};
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      data(icon, 'likeoutTO', setTimeout(animate.pbind(icon, {opacity: opts.opacity || 0.4}, 200, false), 1));
    }
    if (opts.tthide) {
      triggerEvent(icon.parentNode, 'mouseout');
    }
  },
  postLikeOver: function(post, opts) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post),
        hasShare = ge('share_icon' + post);

    if (!icon || cur.viewAsBox) return;
    opts = opts || {};
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        leftShift = opts.leftShift || (link.parentNode == icon.parentNode ? 0 : linkW),
        pointerShift = false,
        ttW = 230,
        x = getXY(icon.parentNode)[0];

    if (opts.leftShift !== undefined) {
      leftShift = opts.leftShift;
    } else {
      if (x + ttW + 20 > lastWindowWidth) {
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 7;
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;
      } else {
        leftShift = (link.parentNode == icon.parentNode ? 0 : linkW);
        pointerShift = linkW + 8;
      }
    }

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj, 'has_share': hasShare ? 1 : ''},
      slide: 15,
      shift: [leftShift, opts.topShift || 7, 7],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          Wall.postOver(post);
          Wall.postLikeOver(post);
        },
        out: function() {
          Wall.postOut(post);
          Wall.postLikeOut(post);
        }
      },
      className: 'rich like_tt ' + (opts.cl || ''),
      onShowStart: function (tt) {
        if (!tt.container || pointerShift === false) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  postLikeOut: function () {
  },
  postShareOver: function(post, opts) {
    var icon = ge('share_icon' + post),
        link = ge('share_link' + post),
        count = ge('share_count' + post);
    if (!icon || cur.viewAsBox) return;
    opts = opts || {};
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        leftShift = opts.leftShift || (link.parentNode == icon.parentNode ? 0 : linkW),
        pointerShift = false,
        ttW = 230,
        x = getXY(icon.parentNode)[0];

    if (opts.leftShift !== undefined) {
      leftShift = opts.leftShift;
    } else {
      if (x + ttW + 20 > lastWindowWidth) {
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 7;
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;
      } else {
        leftShift = (link.parentNode == icon.parentNode ? 0 : linkW);
        pointerShift = linkW + 8;
      }
    }

    if (link.timeout) {
      clearTimeout(link.timeout);
      link.timeout = false;
    } else {
      addClass(icon.parentNode, 'post_share_over');
    }

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj, published: 1},
      slide: 15,
      shift: [leftShift, opts.topShift || 7, 7],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          Wall.postOver(post);
          Wall.postShareOver(post);
        },
        out: function() {
          Wall.postOut(post);
          Wall.postShareOut(post);
        }
      },
      className: 'rich like_tt ' + (opts.cl || ''),
      onShowStart: function (tt) {
        if (!tt.container || pointerShift === false) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  postShareOut: function (post, event) {
    var icon = ge('share_icon' + post),
        link = ge('share_link' + post);

    if (!icon) return;

    if (!link.timeout) {
      link.timeout = setTimeout(function () {
        removeClass(icon.parentNode, 'post_share_over');
        link.timeout = false;
      }, 10);
    }
  },
  likeFullUpdate: function (like_obj, likeData) {
    // debugLog(like_obj, likeData);
    var matches = like_obj.match(/^(wall|photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(-?\d+_)(\d+)/),
        post = matches ? (matches[2] + (matches[1] == 'wall' ? '' : matches[1]) + matches[3]) : like_obj;

    Wall.likeUpdate(post, likeData.like_my, likeData.like_num, likeData.like_title);
    Wall.likeShareUpdate(post, likeData.share_my, likeData.share_num, likeData.share_title);
  },
  likeUpdate: function(post, my, count, title) {
    // console.trace();
    // debugLog(post, my, count, title);
    count = intval(count);

    var m = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (m[3] || 'wall') + m[1] + '_' + m[4];

    var countInput = ge('like_real_count_' + like_obj) || {}, rows = ge('like_table_' + like_obj);
    var titleNode = ge('like_title_' + like_obj), countNode = ge('like_count' + post);
    if (!countNode) {
      return;
    }
    var icon = ge('like_icon' + post);
    var tt = countNode.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -36);

    if (title && titleNode) {
      val(titleNode, title);
    }
    if (tt) {
      tt.likeInvalidated = true;
    }
    countInput.value = count;
    animateCount(countNode, count);

    if (my) {
      addClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    } else {
      removeClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    }
    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      } else if (rows) {
        var params = {};
        params[styleName] = newleft;
        animate(rows, params, 200);
      }
      removeClass(icon, 'no_likes');
    } else {
      if (tt.el) tt.hide();
      addClass(icon, 'no_likes');
    }
  },
  likeShareUpdate: function (post, my, count, title) {
    // console.trace();
    // debugLog(post, my, count, title);
    count = intval(count);

    var m = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (m[3] || 'wall') + m[1] + '_' + m[4];

    var countInput = ge('like_real_countshares_' + like_obj) || {},
        rows = ge('like_tableshares_' + like_obj),
        titleNode = ge('like_titleshares_' + like_obj),
        countNode = ge('share_count' + post),
        icon = ge('share_icon' + post),
        classEl = icon && icon.parentNode,
        tt = (classEl || {}).tt || {},
        opts = clone(tt.opts || {}),
        shareCb = ge('like_share_' + like_obj),
        newleft = (my ? 0 : -36);

    if (!classEl) {
      return;
    }

    if (title && titleNode) {
      val(titleNode, title);
    }
    if (tt) {
      tt.likeInvalidated = true;
    }
    countInput.value = count;
    animateCount(countNode, count);
    toggleClass(classEl, 'my_share', my);
    checkbox(shareCb, my);

    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      } else if (rows) {
        var params = {};
        params[styleName] = newleft;
        animate(rows, params, 200);
      }
      removeClass(classEl, 'no_shares');
    } else {
      if (tt.el) tt.hide();
      addClass(classEl, 'no_shares');
    }
  },
  like: function(post, hash) {
    if (!vk.id || cur.viewAsBox) return;

    var icon = ge('like_icon' + post),
        my = hasClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like'),
        matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        ref = cur.module;
    if (cur.wallType) {
      if (cur.wallType == 'feed') {
        ref = 'feed_' + ((cur.section == 'news' && cur.subsection) ? cur.subsection : cur.section)
      } else {
        ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'))
      }
    }

    ajax.post('like.php', {act: 'a_do_' + (my ? 'un' : '') + 'like', 'object': like_obj, hash: hash, wall: 2, from: ref}, {
      onDone: Wall.likeFullUpdate.pbind(post)
    });
    var count = val(ge('like_real_count_wall' + post) || ge('like_count' + post));
    Wall.likeUpdate(post, !my, intval(count) + (my ? -1 : 1));
    if (cur.onWallLike) {
      cur.onWallLike();
    }
  },
  likeShare: function(post, hash) {
    if (!vk.id || cur.viewAsBox) return;
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        el = ge('like_share_' + like_obj), was = isChecked(el),
        ref = cur.wallType ? (cur.wallType == 'feed' ? 'feed_' + cur.section : ('wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page')))) : cur.module;

    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: like_obj, hash: hash, wall: 2, ref: ref}, {
      onDone: Wall.likeFullUpdate.pbind(post)
    });
    var count = val(ge('like_real_count_wall' + post) || ge('like_count' + post));
    var icon = ge('like_icon' + post), my = hasClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    Wall.likeUpdate(post, true, intval(count) + (my ? 0 : 1));
  },
  likeShareCustom: function (post, params) {
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4];

    showBox('like.php', extend({act: 'publish_box', object: like_obj}, params));
  },
  likeShareCheckLen: function(inp, warn, maxLen) {
    inp = ge(inp);
    warn = ge(warn);
    maxLen = maxLen || 255;
    var v = trim(val(inp)).replace(/\n\n\n+/g, '\n\n');
    if (inp.lastLen === v.length) return;

    var realLen = inp.lastLen = v.length;
    var brCount = realLen - v.replace(/\n/g, '').length;


    if (realLen > maxLen - 50 || brCount > 4) {
      if (realLen > maxLen) {
        val(warn, getLang('text_exceeds_symbol_limit', realLen - maxLen));
      } else if (brCount > 4) {
        val(warn, getLang('global_recommended_lines', brCount - 4));
      } else {
        val(warn, getLang('text_N_symbols_remain', maxLen - realLen));
      }
      show(warn);
    } else {
      hide(warn);
    }
  },
  showLikesPage: function(like_obj, published, offset) {
    cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: like_obj, published: published, offset: offset, wall: 1}, published);
  },
  clearLikesCache: function(like_obj, published) {
    var str = '^/like.php#' + ajx2q({act: 'a_get_members', object: like_obj, published: published, offset: 12345, wall: 1, tab: published, only_content: 1}).replace('12345', '\\d+') + '$',
        re = new RegExp(str, 'i');
    for (var i in ajaxCache) {
      if (re.test(i)) {
        delete(ajaxCache[i]);
      }
    }
  },
  albumCoverOver: function(obj, id, h) {
    clearTimeout((cur.wallAlbumTO || {})[id]);
    var title = geByClass1('wall_album_caption', obj),
        descY = getSize(geByClass1('wall_album_description', obj))[1];
    if (descY < 5) return;

    animate(title, {marginTop: Math.max(0, getSize(obj)[1] - 22 - (descY + 7))}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
  },
  albumCoverOut: function(obj, id) {
    if (!cur.wallAlbumTO) cur.wallAlbumTO = {};
    cur.wallAlbumTO[id] = setTimeout(function() {
      animate(geByClass1('wall_album_caption', obj), {marginTop: getSize(obj)[1] - 22}, 200);
    }, 150);
  },
  showPhoto: function(to_id, ph, hash, el, ev) {
    return !showBox('al_photos.php', {act: 'photo_box', to_id: to_id, photo: ph, hash: hash}, {cache: 1}, el.href ? ev : false);
  },
  _animDelX: function(opacity, new_active, post, action) {
    if (post === undefined) {
      post = new_active;
      new_active = undefined;
    }
    var el = ge((action || 'delete_post') + post);
    if (!el) return;
    if (new_active !== undefined) {
      el.active = new_active;
    } else if (el.active) {
      return;
    }
    animate(el, {opacity: opacity}, 200);
  },
  domFC: function(el) {
    for (el = domFC(el); el && el.id.match(/page_wall_count_/);) {
      el = domNS(el);
    }
    return el;
  },
  domPS: function(el) {
    for (el = domPS(el); el && el.id.match(/page_wall_count_/);) {
      el = domPS(el);
    }
    return el;
  },
  scrollCheck: function (ev, st, noScrollToY) {
    var st = st == undefined ? scrollGetY() : st, top, ntop = 0, el, nel, bits, posts = [], ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
    if (window.scrollAnimation) {
      return false;
    }
    Wall.repliesSideUpdate(st);
    if (cur.wallPage && !cur.fixedWide) {
      var pageNarrowH = cur.wallPageNarrow.offsetHeight || cur.pageNarrowH,
          offsetTop = cur.wallPage.offsetTop,
          maxSt = pageNarrowH + offsetTop + 30;
          pageWide = st > maxSt,
          rowsCont = cur.suggesting ? ge('page_suggestions') : ge('page_wall_posts'),
          fsElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

      if (cur.wallPageWide != pageWide && (!pageWide || rowsCont.offsetHeight > 3 * lastWindowHeight || isVisible('wall_more_link')) && !layers.visible && !fsElement) {
        var lastOffsetParent, lastOffsetTop, lastPost, lastPostY;
        each(rowsCont.childNodes, function () {
          if (!this.offsetParent || !this.offsetTop) return;
          if (lastOffsetParent != this.offsetParent) {
            lastOffsetTop = getXY(lastOffsetParent = this.offsetParent)[1];
          }
          if (lastOffsetTop + this.offsetTop > pageNarrowH + offsetTop) {
            lastPost = this;
            return false;
          }
        });
        if (lastPost) {
          lastPostY = getXY(lastPost)[1];
        }
        cur.wallPageWide = pageWide;
        if (pageWide) {
          cur.pageNarrowH = pageNarrowH;
        }
        if (!cur.fixedWide) {
          toggleClass(cur.wallPage, 'page_wide_no_narrow', pageWide);
        }
        var wallCont = ge('profile_wall') || ge('group_wall') || ge('public_wall');
        revertLastInlineVideo(wallCont);
        toggleClass(wallCont, 'wide_wall_module', pageWide);
        if (cur.wallEditComposer && cur.wallEditComposer.addMedia) {
          cur.wallEditComposer.addMedia.resized();
        }
        if (lastPost) {
          var diff = getXY(lastPost)[1] - lastPostY;
          if ((diff > 0) == cur.wallPageWide && !noScrollToY) {
            scrollToY(scrollGetY() + diff, 0);
          }
        }

        var mapWrap = ge('profile_map_cont'), map = cur.placesPhotoMap, mapOpts = cur.placesPhotoOpts;
        if (mapWrap && map) {
          setStyle(mapWrap, pageWide ? {width: 585, height: 270} : {width: 390, height: 200});
          map.invalidateSize && map.invalidateSize();
        }
      }

      if (
        domPN(cur.topRow) != rowsCont ||
        ((cur.topRow || {}).id || '').match(/page_wall_count_/)
      ) {
        cur.topRow = Wall.domFC(rowsCont);
      }
      if (
        vk.id &&
        cur.topRow &&
        !cur.topRow.id.match(/page_wall_count_/) &&
        !((window.curNotifier || {}).idle_manager || {}).is_idle
      ) {
        postsUnseen = [];
        for (el = Wall.domPS(cur.topRow); el ; el = Wall.domPS(el)) {
          if (cur.topRow.offsetTop > st) cur.topRow = el;
          if (!el.unseen) {
            el.unseen = true;
            postsUnseen.push(Wall.postsGetRaws(el));
          }
        }
        Page.postsUnseen(postsUnseen);
        for (el = cur.topRow; el; el = nel) {
          top = ntop ? ntop : el.offsetTop;
          if (top >= st + ch) break;

          nel = domNS(el);
          if (((nel || {}).id || '').match(/page_wall_count_/)) nel = null;

          ntop = nel ? nel.offsetTop : top + el.offsetHeight;
          if (ntop < st && nel) cur.topRow = nel;

          bits = el.bits || 0;
          if (bits >= 3) continue;

          if (bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0)) {
            el.bits = bits;
            if (bits == 3) {
              posts.push(Wall.postsGetRaws(el));
            }
          }
        }
        Page.postsSeen(posts);
      }
    }
    if (cur.suggestsView) {
      el = ge('page_suggest_more');
    } else if (cur.fixedWide) {
      el = ge('wall_fixed_more_link');
    } else {
      if (!cur.wallAutoMore || cur.wallLoading || cur.viewAsBox) return;
      el = ge('wall_more_link');
    }
    if (!isVisible(el)) return;

    if (st + lastWindowHeight + 1000 > getXY(el)[1]) {
      el.onclick();
    }
  },
  postsGetRaws: function(el) {
    var index = indexOf(domPN(el).children, el);
    var m, res = {};
    if (!el) return res;

    res.module = cur.module;
    res.index = index;

    var dataAdView = el.getAttribute('data-ad-view');
    if (dataAdView) {
      res['ad_' + dataAdView] = 1;
    }

    if (!hasClass(el, 'own')) return res;

    if (m = el.id.match(/^post(-?\d+_\d+)$/)) {
      res[m[1]] = 1;
      if (m = (el.getAttribute('data-copy') || '').match(/^(-?\d+_\d+)$/)) {
        res[m[1]] = -1;
      }
    }
    return res;
  },
  pollVote: function(option, post, params, attachI) {
    if (cur.viewAsBox) return cur.viewAsBox();

    addClass(option, 'on');
    // var progress = option.nextSibling;
    var progress = geByClass1('progress', option);
    ajax.post('widget_poll.php', extend(params, {
      act: 'a_vote',
      no_widget: 1,
      inline: 1,
      sid: post,
      i: attachI
    }), {
      onDone: function(html, script) {
        val('post_poll' + post, html);
        if (script) {
          eval(script);
        }
      },
      showProgress: addClass.pbind(progress, 'progress_inline'),
      hideProgress: removeClass.pbind(progress, 'progress_inline')
    });
  },
  pollFull: function(v, post, e, opt) {
    stManager.add('wkpoll.js');
    return showWiki({w: 'poll' + post, opt_id: opt}, false, e, {queue: 1});
  },
  pollOver: function(el, post, opt) {
    var ttel = (el.cells[0].className == 'page_poll_row') ? domPS(el) : el;
    if (el != ttel && !el.mo) {
      el.mo = true;
      addEvent(el, 'mouseout', function(e) { triggerEvent(ttel, 'mouseout', e, true); });
    }
    showTooltip(ttel, {
      url: 'al_wall.php',
      params: {act: 'poll_opt_stats', post_raw: post, opt_id: opt},
      slide: 15,
      shift: [0, 0, 25],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich poll_tt'
    });
  },
  foTT: function(el, text, opts) {
    if (opts && opts.oid) {
      if (opts.oid == vk.id) {
        text = getLang('wall_my_friends_only');
      } else {
        text = val('wpfo' + opts.pid);
      }
    }
    showTooltip(el, {
      text: text,
      shift: [15, 1, 1],
      black: 1
    });
  },
  update: function() {
    if (cur.wallLayer) {
      WkView.wallUpdateReplies();
      return;
    }
    if (cur.wallType != 'all' && cur.wallType != 'own') return;
    var sw = ge('page_wall_switch'), pnw = ge('page_no_wall'),
        cnts = {
      all: intval(val('page_wall_count_all')),
      own: intval(val('page_wall_count_own'))
    };
    if (cnts.all && pnw) {
      pnw.parentNode.removeChild(pnw);
    }
    if (!cnts.own || cnts.own >= cnts.all) {
      hide(sw);
    } else {
      show(sw);
      sw.innerHTML = cur.options[cur.wallType + '_link'];
    }
    var h = ge('page_wall_header'), cnt = cnts[cur.wallType];
    if (cur.oid < 0 && cur.options['fixed_post_id']) {
      cnt -= 1;
    }
    if (!cur.suggestsView) {
      val('page_wall_posts_count', cnt ? langNumeric(cnt, cur.options.wall_counts) : cur.options.wall_no);
    }
    h.style.cursor = cnt ? '' : 'default';
    h.onclick = function(event) { return cnt ? nav.go(this, event) : false; };
    ge('page_wall_header').href = '/wall' + cur.oid + ((cur.wallType == 'own') ? '?own=1' : '');
    var morelnk = ge('wall_more_link'), del = intval(cur.deletedCnts[cur.wallType]), count = geByClass(cur.wallType, ge('page_wall_posts')).length - del;
    var checkCount = count;
    if (cur.options['fixed_post_id'] && cur.options['wall_oid'] < 0) {
      checkCount += 1;
    }
    if (checkCount >= cnts[cur.wallType] - del) {
      hide(morelnk);
    } else {
      show(morelnk);
      morelnk.onclick = Wall.showMore.pbind(count);
    }
    shortCurrency();
    if (window.mvcur && mvcur.mvShown) {
      Videoview.updatePlaylistBoxPosition();
    }
    if (cur.gifAutoplayScrollHandler) {
      cur.gifAutoplayScrollHandler();
    }
  },
  getAbsDate: function(ts, cur) {
    cur = cur || window.cur;
    var date = new Date(ts || vkNow()),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = '', numhours;
    if (cur.wallTpl.time_system) {
      ampm = cur.wallTpl.time_system[hours > 11 ? 1 : 0];
      hours = (hours % 12) || 12;
    }
    numhours = hours > 9 ? hours : ('0' + hours);
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    return cur.wallTpl.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
  },
  getNowRelTime: function(cur) {
    cur = cur || window.cur;
    var ts = vkNow();
    return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + Wall.getAbsDate(ts, cur) + '">' + getLang('wall_just_now') + '</span>';
  },
  getNewPostHTML: function(ev, adminLevel, extendCb, cur) {
    cur = cur || window.cur;
    var acts = [],
        post_id = ev[2],
        oid = post_id.split('_')[0],
        reply_link = '',
        repls;

    if (ev[8] == 1) {
      reply_link += cur.wallTpl.reply_link;
    } else if (oid != vk.id) {
      reply_link += cur.wallTpl.own_reply_link;
    }
    var nameStr = ev[3].replace('mem_link', 'author').replace('memLink', 'author');
    if (ev[6].indexOf('id="wpfo') != -1) {
      nameStr += '<span class="page_fronly inl_bl" onmouseover="Wall.foTT(this, false, {oid: \'' + oid + '\', pid: \'' + ev[2] + '\'})"></span>';
    }

    if ((adminLevel > (ev[9] == oid ? 1 : 0) || oid == vk.id || ev[9] == vk.id)) {
      acts.push(cur.wallTpl.del);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam);
    }
    if (adminLevel > 1 && ev[9] == oid || oid == vk.id || ev[9] == vk.id) {
      acts.push(cur.wallTpl.edit);
    }

    repls = {
      oid: oid,
      name: nameStr,
      online: '',
      actions: acts.length ? rs(cur.wallTpl.post_actions, {actions: acts.join('')}) : '',
      replies: '',
      reply_link: reply_link,
      own_reply_link: cur.wallTpl.own_reply_link,
      reply_box: ev[8] == 1 ? cur.wallTpl.reply_box : '',
      photo: psr(ev[4]),
      link: ev[5],
      text: psr(ev[6]),
      date: Wall.getNowRelTime(cur),
      post_id: ev[2],
      poll_hash: cur.wallTpl.poll_hash,
      date_postfix: '',
      can_reply_as_group: (oid < 0 && adminLevel > 1) ? 1 : 0,
      post_url: '/wall' + post_id.replace('_wall_reply', '_')
    };
    extendCb && extend(repls, extendCb(repls, ev));
    return rs(rs(cur.wallTpl.post, repls), repls);
  },
  getNewReplyHTML: function (ev, adminLevel, extendCb, cur) {
    cur = cur || window.cur;
    var acts = [],
        can_reply = ge('reply_field' + ev[2]) || ge('reply_fakebox' + ev[2]) || ge('fwr_text'),
        className = '';
        attr = '', toLnk = ev[10] ? (' ' + ev[10]) : '';

    if (adminLevel > 0 || !ev[2].indexOf(vk.id + '_') || ev[4] == vk.id) {
      acts.push(cur.wallTpl.del_reply);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam_reply);
    }
    if ((adminLevel > 1) && (ev[4] == intval(ev[2])) || ev[4] == vk.id) {
      acts.push(cur.wallTpl.edit_reply);
    }
    if (ev[8].indexOf('class="wall_reply_more"') != -1) {
      className += 'reply_moreable';
    }
    if (can_reply) {
      if (cur.onepost) {
        acts.push(cur.wallTpl.answer_reply);
      } else {
        className += ' reply_replieable';
        if (vk.id != ev[4]) {
          toLnk += '<span class="sdivide">|</span><a class="_reply_lnk">' + getLang('wall_reply_post') + '</a>';
        }
      }
      if (!cur.options.reply_names[ev[4]]) {
        cur.options.reply_names[ev[4]] = [ev[11], ev[12]]; // name link, name greeting
      }
    }
    if (className) {
      attr = ' onclick="Wall.replyClick(\'%post_id%\', %reply_msg_id%, event, %reply_uid%)"';
    }
    if (cur.onepost) {
      acts.push('');
      acts.unshift('');
      acts = acts.join('<span class="divide">|</span>');
    } else {
      acts = rs(cur.wallTpl.post_actions, {actions: acts.join('')});
    }
    var repls = {
      name: ev[5].replace('mem_link', 'author'),
      photo: psr(ev[6]),
      online: '',
      link: ev[7],
      text: psr(ev[8]),
      media: '', // not returned by now
      classname: className,
      actions: acts,
      attr: attr,
      date: Wall.getNowRelTime(cur),
      to_link: toLnk,
      post_id: ev[2],
      reply_id: ev[3],
      like_id: ev[3].replace('_', '_wall_reply'),
      reply_msg_id: ev[3].split('_')[1],
      reply_uid: ev[4] || 'false'
    };
    extendCb && extend(repls, extendCb(repls));
    return rs(cur.wallTpl.reply, repls);
  },
  updatePostImages: function(html) {
    return html.replace(/<img[^>]+>/g, function(str) {
      if (str.match(/class=/)) {
        return str.replace('src=', 'data-src=').replace('class="', 'class="__need_img ');
      }
      return str;
    });
  },
  loadPostImages: function(container) {
    each (geByClass('__need_img', container, 'img'), function() {
      var src = this.getAttribute('data-src');
      if (src) {
        this.src = src;
        this.removeAttribute('data-src');
      }
      removeClass(this, '__need_img');
    });
  },
  openNewComments: function (post_raw) {
    var repliesEl = cur.onepost ? ge('fw_replies_rows') : ge('replies' + post_raw),
        openEl = repliesEl.nextSibling,
        headerEl = geByClass1('wr_header', repliesEl, 'a'),
        newCnt = 0,
        shown = geByClass('reply', repliesEl, 'div').length,
        total = shown,
        newTotal = openEl.newCnt;
    Wall.loadPostImages(repliesEl);
    each (clone(geByClass('new_reply', repliesEl, 'div')), function () {
      removeClass(this, 'new_reply');
      this.style.backgroundColor = '#FEFAE4';
      animate(this, {backgroundColor: '#FFF'}, 6000);
      newCnt++;
      if (newCnt == 100) return false;
    });
    if (headerEl) {
      total = newCnt + intval(headerEl.getAttribute('offs').split('/')[1]);
    }
    shown += - newTotal + newCnt;
    if (total > 3 || shown < total) {
      if (!headerEl) {
        repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
      }
      Wall.updateRepliesHeader(post_raw, headerEl, shown, total);
    }
    cur.wallMyOpened[post_raw] = 1;
    if (openEl && openEl.className == 'replies_open') {
      if (newTotal > 100) {
        openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newTotal - newCnt));
        openEl.newCnt -= newCnt;
      } else {
        re(openEl);
      }
    }
    Wall.repliesSideSetup(post_raw);
  },
  langWordNumeric: function(num, words, arr) {
    if (isArray(words) && num < words.length) {
      return words[num];
    }
    return langNumeric(num, arr);
  },
  updateTimes: function (cont) {
    if (!(cur.lang || {}).wall_X_seconds_ago_words) {
      return;
    }
    var timeNow = intval(vkNow() / 1000), toClean = [];
    timeNow -= cur.tsDiff;
    each(geByClass('rel_date_needs_update', cont || ge('page_wall_posts'), 'span'), function(k, v) {
      if (!v) return;
      var timeRow = intval(v.getAttribute('time')), diff = timeNow - timeRow, timeText = v.getAttribute('abs_time');
      if (diff < 5) {
        timeText = getLang('wall_just_now');
      } else if (diff < 60) {
        timeText = Wall.langWordNumeric(diff, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago);
      } else if (diff < 3600) {
        timeText = Wall.langWordNumeric(intval(diff / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago);
      } else if (diff < 4 * 3600) {
        timeText = Wall.langWordNumeric(intval(diff / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago);
      } else {
        toClean.push(v);
      }
      v.innerHTML = timeText;
    });
    each (toClean, function () {
      removeClass(this, 'rel_date_needs_update');
    });
  },

  updateRepliesHeader: function(post_raw, headerEl, shown, total) {
    if (cur.onepost) return;
    var headerText, href = headerEl.href, matches, showCount = 3, cls = 0;

    if (!href && (matches = post_raw.match(/^(-?\d+)_(photo|video|note|topic|video|)(\d+)$/))) {
      var type = matches[2] || 'wall';
      href = '/' + type + matches[1] + '_' + matches[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      headerEl.href = href;
    }
    if (total > shown) {
      if (shown < 100) {
        if (total > 100) {
          headerText = getLang('wall_show_n_of_m_last', 100);
          headerText = headerText.replace('{count}', total);
        } else {
          headerText = getLang('wall_show_all_n_replies', total);
        }
        showCount = false;
      } else {
        headerText = getLang('wall_hide_replies');
      }
    } else {
      headerText = getLang('wall_hide_replies');
      cls = 1;
    }
    toggleClass(headerEl, 'wrh_all', cls);
    headerEl.innerHTML = '<div class="wrh_text" id="wrh_text' + post_raw + '">' + headerText + '</div><div class="progress wrh_prg" id="wrh_prg' + post_raw + '"></div>';
    headerEl.onclick = Wall.showReplies.pbind(post_raw, showCount, false);
    headerEl.setAttribute('offs', shown + '/' + total);
  },

  updatePoll: function(post_raw) {
    if (!vk.id) return;
    ajax.post('al_wall.php', {act: 'post_poll', post_raw: post_raw}, {
      onDone: function (html) {
        if (html) {
          var pollWrapEl = ge('post_poll' + post_raw), pollTable = geByTag1('table', pollWrapEl);
          if (pollTable) {
            for (var i = 0; i < pollTable.rows.length; ++i) {
              var t = pollTable.rows[i].tt;
              if (t && t.destroy) t.destroy();
            }
          }
          val(pollWrapEl, html);
        }
      }, onFail: function() { return true; }
    });
  },

  updatePollResults: function (post_raw, newPollDataTxt) {
    var pollWrapEl = ge('post_poll' + post_raw),
        pollTable = geByTag1('table', pollWrapEl),
        pollRaw = val('post_poll_raw' + post_raw);

    if (!pollWrapEl) return;

    var newPollData = eval('(' + newPollDataTxt + ')'),
        totalVotes = 0,
        maxVotes = 0,
        pollStats = '';

    each (newPollData, function () {
      totalVotes += this[1];
      if (this[1] > maxVotes) {
        maxVotes = this[1];
      }
    });

    if (pollTable && pollRaw) {
      each (newPollData, function(i) {
        pollStats += rs(cur.wallTpl.poll_stats, {
          option_text: this[0],
          css_percent: totalVotes ? Math.round(this[1] * 100 / maxVotes) : 0,
          count: langNumeric(this[1], '%s', true),
          percent: totalVotes ? Math.round(this[1] * 1000 / totalVotes) / 10 : 0,
          handlers: val('post_poll_open' + post_raw) ? (' onmouseover="Wall.pollOver(this, \'' + post_raw + '\', ' + i + ')"') : ''
        });
      });
      for (var i = 0; i < pollTable.rows.length; ++i) {
        var t = pollTable.rows[i].tt;
        if (t && t.destroy) t.destroy();
      }
      val(pollTable, pollStats);
    }
    var codeLink = geByClass1('page_poll_code', pollWrapEl, 'a'), totalEl = geByClass1('page_poll_total', pollWrapEl, 'span');
    val(totalEl, langNumeric(totalVotes, cur.lang.wall_X_people_voted || '%', true));
    if (codeLink) totalEl.insertBefore(codeLink, domFC(totalEl));
  },

  updated: function (layer, key, data) {
    var cur = layer ? wkcur : window.cur;
    if (!cur.wallAddQueue || cur.wallAddQueue.key != key) {
      return;
    }
    if (data.failed) {
      cur.wallAddQueue = false;
      return;
    }
    cur.wallAddQueue.ts = data.ts;
    if (!isArray(data.events) || !data.events.length) {
      return;
    }

    var len = data.events.length,
        startST = layer ? wkLayerWrap.scrollTop : scrollGetY(),
        curST = startST,
        fullWall = !(cur.wallType || '').indexOf('full'),
        onepost = cur.onepost,
        layerpost = layer ? true : false,
        fixed = layer;

    if (fullWall && (nav.objLoc.q || nav.objLoc.search || nav.objLoc.day)) return;

    each(data.events, function () {
      var ev = this.split('<!>'),
          ev_ver = ev[0],
          ev_type = ev[1],
          post_id = ev[2],
          updH = 0,
          updY = 0,
          el = layer && window.cur.wallLayer == post_id && ge('wl_post_body') ||
               !layer && onepost && ge('fw_post');

      if (!el || ev_type == 'del_reply') {
        el = ge('post' + post_id);
        if (!isAncestor(el, layer ? wkLayerWrap : pageNode)) {
          el = null;
        }
      }

      if (ev_ver != cur.options.qversion) {
        // location.reload();
        return;
      }
      switch (ev_type) {
        case 'new_post': {
          if (el) break;
          if (fullWall && cur.pgStart > 0) {
            cur.pgOffset++;
            break;
          }
          if (cur.oid == vk.id && vk.id == ev[9]) {
            if (window.curNotifier && curNotifier.idle_manager.is_idle) {
              Wall.clearInput();
            }
          }

          var cont = ge('page_wall_posts'),
              lastPost = cont.lastChild,
              extendCb = fullWall ? FullWall.addTetaTet : false,
              flgs = intval(ev[ev.length - 1]),
              adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
              newEl = se(Wall.getNewPostHTML(ev, adminLevel, extendCb, cur)),
              insBefore = cont.firstChild;

          if (ge('post' + post_id)) break;
          if (lastPost && lastPost != newEl) {
            re(lastPost);
          } else lastPost = false;
          if (!fullWall) {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            addClass(newEl, 'all');
            if (intval(ev[10])) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
              addClass(newEl, 'own');
            }
          } else if (!lastPost) {
            cur.pgOffset++;
          }
          while (insBefore && (insBefore.tagName == 'INPUT' || insBefore.nodeType != 1 || hasClass(insBefore, 'post_fixed'))) {
            insBefore = insBefore.nextSibling;
          }
          cont.insertBefore(newEl, insBefore);
          if (ge('post_poll_id' + post_id)) {
            Wall.updatePoll(post_id);
          }
          //!browser.msie6 && placeholderSetup(ge('reply_field' + post_id));
          updH = newEl.offsetHeight;
          updY = getXY(newEl, fixed)[1];
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000);
          Wall.updateMentionsIndex();
          break;
        }
        case 'edit_post': {
          var editEl = ge('wpt' + post_id);
          if (!isVisible(el) || !editEl) break;

          var wasExpanded = geByClass1('wall_post_more', editEl);
          if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

          updH = -editEl.offsetHeight;
          updY = getXY(editEl, fixed)[1];
          var text = psr(rs(ev[3], {
            poll_hash: cur.wallTpl.poll_hash
          }));
          val(editEl, text);
          if (wasExpanded) {
            wasExpanded = geByClass1('wall_post_more', editEl);
            if (wasExpanded) wasExpanded.onclick();
          }
          if (ge('post_poll_id' + post_id)) {
            Wall.updatePoll(post_id);
          }
          updH += editEl.offsetHeight;
          setStyle(editEl, {backgroundColor: '#FEFAE4'});
          animate(editEl, {backgroundColor: '#FFF'}, 6000);
          break;
        }
        case 'edit_reply': {
          var reply_id = ev[3],
              editEl = ge('wpt' + reply_id);
          if (!isVisible('post' + reply_id) || !editEl) break;

          var wasExpanded = geByClass1('wall_reply_more', editEl);
          if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

          updH = -editEl.offsetHeight;
          updY = getXY(editEl, fixed)[1];
          val(editEl, psr(ev[4]));
          if (wasExpanded) {
            wasExpanded = geByClass1('wall_reply_more', editEl);
            if (wasExpanded) wasExpanded.onclick();
          }
          updH += editEl.offsetHeight;
          setStyle(editEl, {backgroundColor: '#FEFAE4'});
          animate(editEl, {backgroundColor: '#FFF'}, 6000, setStyle.pbind(editEl, {color: ''}));
          break;
        }
        case 'post_parsed_link': {
          if (!el) break;
          var btnWrap = geByClass1('wall_postlink_preview_btn_disabled', el);
          if (!btnWrap) break;
          if (intval(ev[3])) {
            removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');
          } else {
            re(btnWrap);
          }
          break;
        }
        case 'del_post': {
          if (!isVisible(el)) break;

          if (!cur.wallMyDeleted[post_id] && !onepost) {
            updH = -el.offsetHeight;
            updY = getXY(el, fixed)[1];
            revertLastInlineVideo(el);
            hide(el);
            if (!fullWall && !layerpost) {
              val('page_wall_count_all', intval(val('page_wall_count_all')) - 1);
              if (ev[3]) {
                val('page_wall_count_own', intval(val('page_wall_count_own')) - 1);
              }
            }
          }
          break;
        }
        case 'res_post': {
          if (!el || isVisible(el)) break;
          if (cur.wallRnd == ev[4]) show(el);

          if (fullWall) {
            cur.pgOffset++;
          } else {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            if (ev[3]) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
            }
          }
          break;
        }
        case 'new_reply': {
          if (!el || cur.wallMyReplied[post_id] ||
              ge('post' + ev[3]) ||
              (onepost && cur.pgOffset < cur.pgCount) ||
              (layerpost && (!cur.reverse ? cur.offset + cur.loaded < cur.count : cur.offset))
          ) break;

          var repliesEl = onepost ? ge('fw_replies_rows') : ge('replies' + post_id),
              repliesWrap = ge('replies_wrap' + post_id),
              extendCb = !onepost ? false : function (repls) {
                return (repls.acts ? {acts: '<span class="divide">|</span>' + repls.acts} : {})
              },
              flgs = intval(ev[ev.length - 1]),
              adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
              newEl = se(Wall.getNewReplyHTML(ev, adminLevel, extendCb, cur)),
              highlight = false,
              startH = layerpost ? repliesEl.offsetHeight : el.offsetHeight;

          if (!isVisible(repliesEl) || !isVisible(repliesWrap) || isVisible('reply_link' + post_id)) {
            re('reply_link' + post_id);
            show(repliesWrap, repliesEl);
            highlight = true;
          } else {
            var openEl = repliesEl.nextSibling, newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
            if (!layerpost && !onepost && !cur.wallMyOpened[post_id]) {
              addClass(newEl, 'new_reply');
              if (!openEl || openEl.className != 'replies_open') {
                openEl = ce('div', {className: 'replies_open', onclick: Wall.openNewComments.pbind(post_id)});
                repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
              }
              openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
              openEl.newCnt = newCnt;
            } else {
              if (openEl && openEl.className == 'replies_open') re(openEl);
              highlight = true;
              var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                  shown = geByClass('reply', repliesEl, 'div').length + 1,
                  total = shown;
              if (headerEl) {
                total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
              }
              if ((total > 5 || shown < total) && !cur.fixedWide) {
                if (!headerEl) {
                  repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
                }
                Wall.updateRepliesHeader(post_id, headerEl, shown, total);
              }
            }
          }
          if ((layer ? cur.reverse : cur.fixedWide) && repliesEl.firstChild) {
            repliesEl.insertBefore(newEl, repliesEl.firstChild);
          } else {
            repliesEl.appendChild(newEl);
          }
          if (highlight) {
            setStyle(newEl, {backgroundColor: '#FEFAE4'});
            animate(newEl, {backgroundColor: '#FFF'}, 6000);
          }
          if (layerpost) {
            cur.count++;
            cur.loaded++;
            WkView.wallUpdateReplies();
            updH = repliesEl.offsetHeight - startH;
            updY = getXY(newEl, fixed)[1];
          } else if (onepost) {
            FullWall.repliesSummary(ev[13]);
            cur.pgOffset++;
            cur.pgCount++;
            Pagination.pageReady(false);
            FullWall.onePostOnScroll(false, false, true);
          } else {
            updH = el.offsetHeight - startH;
            updY = getXY(highlight ? newEl : openEl)[1];
            Wall.repliesSideSetup(post_id);
          }
          Wall.updateMentionsIndex();
          break;
        }
        case 'del_reply': {
          if (cur.wallMyDeleted[post_id] || !el) break;
          updH = -el.offsetHeight;
          updY = getXY(el, fixed)[1];
          // debugLog(ev, post_id, el);
          revertLastInlineVideo(el);
          if (cur.layerpost) {
            hide(el);
            cur.count--;
            cur.loaded--;
          } else if (cur.onepost) {
            hide(el);
            cur.pgOffset--;
            cur.pgCount--;
          } else {
            var post = el.parentNode.id.match(/replies(-?\d+_\d+)/);
            re(el);
            if (post) {
              Wall.repliesSideSetup(post[1]);
            }
          }
          break;
        }
        case 'like_post':
        case 'like_reply': {
          var likePost = (ev_type == 'like_reply' ? post_id.replace('_', '_wall_reply') : post_id);
          var likeLayerPost = (layer && post_id == window.cur.wallLayerLike);
          var cntEl = (likeLayerPost ? ge('wk_like_count') : ge('like_count' + likePost));
          var iconEl = (likeLayerPost ? ge('wk_like_icon') : ge('like_icon' + likePost));

          if (!el && !cntEl) break;

          var ttEl = (iconEl && iconEl.parentNode);
          var cnum = intval(val(cntEl));
          var num = intval(ev[3]);

          animateCount(cntEl, num);
          val('like_real_count_wall' + post_id, num);
          toggleClass(iconEl, 'no_likes', num <= 0);
          if (ttEl && ttEl.tt && !isVisible(ttEl.tt.container)) {
            ttEl.tt.destroy && ttEl.tt.destroy();
          }
          setStyle(iconEl, {opacity: '', visibility: ''});
          break;
        }
        case 'vote_poll': {
          if (!el) break;
          Wall.updatePollResults(post_id, ev[3]);
          break;
        }
        case 'upd_ci': {
          var info = ev[2],
              edit = ge('current_info'),
              el = edit || ge('page_current_info'),
              dataAudio = ' data-audio="' + ev[4] + '"';

          if (!el) {
            break;
          }
          switch (ev[3]) {
            case 'audio':
              var curCntEl = geByClass1('current_audio_cnt');
              if (curCntEl && curCntEl.tt) curCntEl.tt.hide();
              var attr = edit ? '' : (' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAudioTip + '\', black: 1, shift: [13, 0, 0]})" onclick="Page.playCurrent(this, this.getAttribute(\'data-audio\'), \'' + cur.options.ciAudioHash + '\')"');
              info = '<a class="current_audio fl_l"' + attr + dataAudio + '><div class="label fl_l"></div>' + info + '</a>';
              var ci_cnt = intval(ev[5] || ''), ci_cnt_class = ci_cnt ? '' : ' hidden';
              info += '<div class="current_audio_cnt' + ci_cnt_class + ' fl_r" onmouseover="Page.audioListenersOver(this, cur.oid)" onclick="Page.showAudioListeners(cur.oid, event)"><div class="value fl_l">' + ci_cnt + '</div><div class="label fl_r"></div></div>';
              wall.updateOwnerStatus(info, el, ev, edit);
            break;

            case 'app':
              var shift = ev[6] ? '[11, 0, 0]' : '[13, 0, 0]', addCls = ev[6] ? ' current_app_icon' : '';
              var attr = edit ? (' onclick="cur.ciApp = ' + ev[4] + '"') : (' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAppTip + '\', black: 1, shift: ' + shift + '})" href="' + ev[5] + '?ref=14" onclick="return showApp(event, ' + ev[4] + ', 1, 14, cur.oid)"');
              if (ev[6]) attr += ' style="background-image: url(\'' + ev[6] + '\')"';
              info = '<a class="current_app' + addCls + '"' + attr + '>' + info + '</a>';
              wall.updateOwnerStatus(info, el, ev, edit);
            break;

            default:
              stManager.add(['emoji.js'], function() {
                info = info ? ('<span class="current_text">' + Emoji.emojiToHTML(info, true) + '</span>') : info;
                wall.updateOwnerStatus(info, el, ev, edit);
              });
            break;
          }
          break;
        }
        case 'upd_ci_cnt': {
          var edit = ge('current_info'), cnt = intval(ev[2]), el = edit || ge('page_current_info'),
              cntEl = el && geByClass1('current_audio_cnt', el);
          if (cntEl) {
            if (cntEl.tt) {
              cntEl.tt.destroy();
            }
            toggleClass(cntEl, 'hidden', cnt == 0);
            var valEl = geByClass1('value', cntEl);
            if (valEl) {
              animateCount(valEl, cnt)
            }
          }
          break;
        }
      }
      if (updH && (layer ? (updY < 0) : (curST > updY))) {
        curST += updH;
      }
    });
    var endST = scrollGetY();
    if (curST != startST && startST > 100/* && Math.abs(startST - endST) > 100*/) {
      if (layer) {
        wkLayerWrap.scrollTop = curST;
      } else {
        scrollToY(curST, 0);
      }
    }
    Wall.update();
  },

  updateOwnerStatus: function(info, el, ev, edit) {
    if (edit) {
      var cls = info ? 'my_current_info' : 'no_current_info';
      info = '<span class="' + cls + '">' + (info || getLang('change_current_info')) + '</span>';
      val(el.parentNode.nextSibling, info);
      if (!isVisible('currinfo_editor') && cur.oid > 0) {
        toggle('currinfo_audio', ev[3] != 'app');
        toggle('currinfo_app', ev[3] == 'app');
        addClass('currinfo_app', 'on');
      }
    }
    val(el, info);
    setStyle(el.firstChild, {backgroundColor: '#FEFAE4'});
    animate(el.firstChild, {backgroundColor: '#FFF'}, 6000, function () {
      setStyle(el.firstChild, {backgroundColor: ''});
    });
  },

  updateMentionsIndex: function (force) {
    clearTimeout(cur.wallUpdateMentionsIndexTO);
    if (!force) {
      cur.wallUpdateMentionsIndexTO = setTimeout(wall.updateMentionsIndex.pbind(true), 300);
      return;
    }

    var byHref = {},
        list = [],
        linkRe = new RegExp('^(https?://(vk\.com|' + location.host.replace(/\./, '\\.') + '))?\/?'),
        photoLinks = [];

    each (geByClass('author', bodyNode, 'a'), function () {
      var name = val(this), href = this.href.replace(linkRe, '');
      if (byHref[href] !== undefined) {
        return;
      }
      var // oidMatches = href.match(/^(id|club|event|public)(\d+)$/),
          oid = /*oidMatches ? (oidMatches[1] == 'id' ? oidMatches[2] : -oidMatches[2]) : */intval(this.getAttribute('data-from-id'));

      if (oid && oid != vk.id) {
        byHref[href] = list.length;
        list.push([oid, name, '@' + href, '/images/camera_c.gif']);
      }
    });

    photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('post_image', bodyNode, 'a')));
    photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('reply_image', bodyNode, 'a')));

    each (photoLinks, function () {
      var href = this.href.replace(linkRe, ''),
          listId = byHref[href];
      if (listId === undefined) {
        return;
      }

      var img = domFC(this);
      while (img && img.tagName != 'IMG') {
        img = domNS(img);
      }
      if (img) {
        list[listId][3] = img.getAttribute('src');
        delete byHref[href];
      }
    });
    cur.wallMentions = list;
  },

  initUpdates: function (key) {
    if (!key || !window.Notifier) {
      return;
    }
    var wasKey = cur.wallAddQueue,
        checkCb = function () {if (cur.wallAddQueue) Notifier.addKey(cur.wallAddQueue, Wall.updated.pbind(false));};

    cur.wallAddQueue = key;
    checkCb();
    if (!wasKey) {
      checkInt = setInterval(checkCb, 10000);
      cur.destroy.push(function () {clearInterval(checkInt)});
    }
  },

  initWallOptions: function (opts) {
    extend(cur, {
      wallType: opts.wall_type,
      wallTpl: opts.wall_tpl,
      wallMyDeleted: {},
      tsDiff: opts.wall_tpl && opts.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
      wallMyOpened: {},
      wallMyReplied: {},
      wallMentions: [],
      wallMyRepliesCnt: 0
    });
    if (opts.wall_tpl && opts.wall_tpl.lang) {
      cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
    }

    window.Notifier && Notifier.addRecvClbk('wall_reply_multiline', 'wall', function(data) {
      Wall.onReplySubmitChanged(data.value, 1);
    }, true);
  },

  init: function(opts) {
    Wall.initWallOptions(opts);

    extend(cur, {
      wallInited: true,
      postField: ge('post_field'),
      wallPage: ge('profile') || ge('group') || ge('public'),
      wallPageNarrow: ge('profile_narrow') || ge('group_narrow'),
      wallPageWide: false,
      wallUploadOpts: opts.upload || false,
      deletedCnts: {own: 0, all: 0}
    });

    cur.destroy.push(function(c) {
      cleanElems(c.postField);
    });
    var rem = removeEvent.pbind(document, 'click', Wall.hideEditPostReply);

    if (cur._back) {
      cur._back.hide.push(rem);
      cur._back.show.push(rem);
      cur._back.show.push(addEvent.pbind(document, 'click', Wall.hideEditPostReply));
    } else {
      cur.destroy.push(rem);
    }
    var ownCnt = ge('page_wall_count_own');
    if (cur.wallType == 'own' && !intval(ownCnt && ownCnt.value)) {
      cur.wallType = ge('page_wall_posts').className = 'all';
    }
    Wall.update();
    Wall.initUpdates(opts.add_queue_key);

    // Times update interval. For relative time correction
    if (opts.wall_tpl) {
      cur.timeUpdateInt = setInterval(function () {Wall.updateTimes(opts.wallCont);}, 10000);
      cur.destroy.push(function () {clearInterval(cur.timeUpdateInt);});
    }

    if (opts.draft) {
      Wall.setDraft(opts.draft);
    }

    var scrollNode = browser.msie6 ? pageNode : window;
    addEvent(scrollNode, 'scroll', Wall.scrollCheck);
    addEvent(window, 'resize', Wall.scrollCheck);
    cur.destroy.push(function () {
      removeEvent(scrollNode, 'scroll', Wall.scrollCheck);
      removeEvent(window, 'resize', Wall.scrollCheck);
    });
    cur.wallAutoMore = opts.automore;

    placeholderSetup(cur.postField, { pad: { paddingTop: 7, paddingBottom: 6, paddingLeft: 6 }});

    removeEvent(document, 'click', Wall.hideEditPostReply);
    addEvent(document, 'click', Wall.hideEditPostReply);

    if (opts.media_types) {
      cur.wallAddMedia = initAddMedia(ge('page_add_media').firstChild, 'media_preview', opts.media_types, extend({
        onAddMediaChange: function() {
          if (cur.module == 'profile' || cur.module == 'feed' || cur.module == 'wall') {
            Wall.postChanged(10);
          }
        }, onMediaChange: function() {
          if (cur.module == 'profile' || cur.module == 'feed' || cur.module == 'wall') {
            Wall.postChanged();
          }
        }, editable: 1, sortable: 1}, opts.media_opts || {})
      );
    }
    cur.withUpload = window.WallUpload && !(browser.msie111 || browser.safari_mobile) && (cur.wallType == 'all' || cur.wallType == 'own' || cur.wallType == 'feed') && Wall.withMentions && cur.wallUploadOpts;
    if (cur.withUpload && WallUpload.checkDragDrop()) {
      var clean = function () {
          removeEvent(document, 'dragover dragenter drop dragleave', cb);
        },
        cb = function (e) {
          if (dragtimer !== false) {
            clearTimeout(dragtimer);
            dragtimer = false;
          }
          if (cur.uploadInited) {
            clean();
            return cancelEvent(e);
          }
          switch (e.type) {
            case 'drop':
              started = false;
              delete cur.wallUploadFromDrag;
              hide('post_upload_dropbox');
              break;

            case 'dragleave':
              dragtimer = setTimeout(function () {
                started = false;
                delete cur.wallUploadFromDrag;
                hide('post_upload_dropbox');
              }, 100);
              break;

            case 'dragover':
            case 'dragenter':
              if (!started) {
                started = (e.target && (e.target.tagName == 'IMG' || e.target.tagName == 'A')) ? 1 : 2;
                if (started == 2) {
                  setTimeout(Wall.showEditPost, 0);
                }
              }
              if (started == 2) {
                cur.wallUploadFromDrag = 1;
              }
          }
          return cancelEvent(e);
        },
        started = false,
        dragtimer = false;
      addEvent(document, 'dragover dragenter drop dragleave', cb);
      cur.destroy.push(clean);
    }
    cur.nav.push(function(changed, old, n) {
      if (!changed[0] && changed.fixed != undefined) {
        Page.toggleFixedPost(cur.oid+'_'+cur.options['fixed_post_id']);
        nav.setLoc(n);
        return false;
      }
    });
    Wall.updateMentionsIndex();
  },
  switchOwner: function(obj, sw) {
    obj.innerHTML = '<div class="progress_inline"></div>';
    nav.change({owners_only: sw});
  },
  replyAsGroup: function(obj, imgSrc) {
    checkbox(obj);
    var el = obj.parentNode;
    while(el && !hasClass(el, 'reply_box')) {
      el = el.parentNode;
    }
    if (!el) return;
    var photoImg = geByClass1('reply_form_img', el);
    if (isChecked(obj)) {
      if (!obj.backImg) {
        obj.backImg = photoImg.src;
      }
      if (imgSrc && imgSrc != '%owner_photo%') {
        photoImg.src = imgSrc;
      }
    } else if (obj.backImg) {
      photoImg.src = obj.backImg;
    }
  },
  reportPost: function(obj, ev, postRaw) {
    stManager.add(['privacy.js', 'privacy.css'], function() {
      return Privacy.show(obj, ev, 'report_'+postRaw);
    });
  }
}

var wall = extend(Wall, {
  showDeletePost: function (post) {
    Wall._animDelX(0.3, undefined, post, 'post_delete');
    Wall._animDelX(0.3, undefined, post, 'post_edit');
    Wall._animDelX(0.3, undefined, post, 'post_promote');
    Wall._animDelX(0.3, undefined, post, 'post_promoted_stats');
  },
  hideDeletePost: function (post) {
    Wall._animDelX(0, undefined, post, 'post_delete');
    Wall._animDelX(0, undefined, post, 'post_edit');
    Wall._animDelX(0, undefined, post, 'post_promote');
    Wall._animDelX(0, undefined, post, 'post_promoted_stats');
  },
  activeDeletePost: function(post, tt, action) {
    Wall._animDelX(1, 1, post, action);
    if (tt) showTooltip(ge((action || 'delete_post') + post), {text: tt, showdt: 0, black: 1, shift: [14, 3, 3]});
  },
  deactiveDeletePost: Wall._animDelX.pbind(0.3, 0)
});

WallUpload = {
  photoUploaded: function(info, params) {
    var i = info.ind !== undefined ? info.ind : info,
        fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, ''),
        ind = info.fileName ? i + '_' + info.fileName : info,
        prg = ge('upload' + ind + '_progress_wrap');

    prg && hide(geByClass1('progress_x', prg));
    ajax.post('al_photos.php', extend({act: 'choose_uploaded'}, params), {
      onDone: function(media, data) {
        cur.wallAddMedia.chooseMedia('photo', media, extend(data, {upload_ind: i + '_' + fileName}));
      },
      onFail: WallUpload.uploadFailed.pbind(info)
    });
  },
  uploadFailed: function(info, code) {
    var i = info.ind !== undefined ? info.ind : info,
        fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
    if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
      var lnkId, ind = info.fileName ? i+'_'+info.fileName : info;
      if (cur.imMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = cur.imMedia.lnkId;
        cur.addMedia[lnkId].unchooseMedia();
      } else if (cur.addMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = (cur.attachMediaIndexes || {})[fileName];
        if (lnkId) cur.addMedia[lnkId].unchooseMedia();
      }
    }
    // hide(box.progress);
    topError('Upload failed', {dt: -1, type: 102, url: (ge('file_uploader_form' + i) || {}).action});
    Upload.embed(i);
  },
  show: function () {
    if (!cur.uploadInited) return;
    var s = {};
    if (cur.wallType == 'feed') {
      removeClass(cur.uploadWrap, 'post_upload_min_wrap');
      s.width = 515;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    } else {
      show(cur.uploadWrap);
      s.width = 337;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    }
    setStyle('post_field', s);
  },
  hide: function () {
    if (!cur.uploadInited) return;
    var s = {};
    if (cur.wallType == 'feed') {
      addClass(cur.uploadWrap, 'post_upload_min_wrap');
      s.width = 515;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    } else {
      hide(cur.uploadWrap);
      s.width = 369;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 3;
    }
    setStyle('post_field', s);
    hide('post_upload_dropbox');
  },
  checkDragDrop: function() {
    var b = browser, bv = floatval(browser.version);
    if (!(b.msie && bv >= 9 || b.mozilla && bv >= 3.5 || b.chrome || b.safari)) { // Drag'n'Drop reqs
      return false;
    }
    return (window.XMLHttpRequest || window.XDomainRequest) &&
           (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
  },
  init: function () {
    removeEvent(bodyNode, 'dragover dragenter');
    var data = cur.wallUploadOpts,
        field = ge('post_field'),
        tt = WallUpload.checkDragDrop() ?  ' onmouseover="showTooltip(this, {text: \'' + (data.opts.lang.wall_photos_drag_hint || 'You can also drop files here') + '\', black: 1, shift: [3, -10, 0]})"' : '';

    field.parentNode.insertBefore(cur.uploadWrap = ce('div', {
      className: 'post_upload_wrap fl_r',
      innerHTML: '<div id="post_field_upload" class="post_upload"' + tt + '></div>'
    }), field);
    var submitBox = ge('submit_post_box');
    submitBox.insertBefore(ce('div', {
      id: 'post_upload_dropbox',
      className: 'post_upload_dropbox',
      innerHTML: '<div class="post_upload_dropbox_inner noselect"><span class="post_upload_drop_label">' + (data.opts.lang.wall_drop_photos_here || 'Drop files here') + '</span><span class="post_upload_release_label">' + (data.opts.lang.wall_release_photos_here || 'Release button to attach files') + '</span></div>'
    }), submitBox.firstChild);

    Upload.init('post_field_upload', data.url, data.params, {
      file_name: 'photo',
      file_size_limit: 1024 * 1024 * 5, // 5Mb
      file_types_description: 'Image files (*.jpg, *.png, *.gif)',
      file_types: '*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF',
      file_input: null,
      accept: 'image/jpeg,image/png,image/gif',
      file_match:  data.opts.ext_re,
      lang: data.opts.lang,
      wiki_editor: 0,

      onUploadStart: function(info, res) {
        var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
        if (Upload.types[i] == 'form') {
          // show(box.progress);
          geByClass1('file', ge('choose_photo_upload')).disabled = true;
        }
        if (Upload.types[i] == 'fileApi') {
          if (cur.notStarted) {
            boxQueue.hideLast();
            delete cur.notStarted;
          }
          if (options.multi_progress) this.onUploadProgress(info, 0, 0);
        }
      },
      onUploadComplete: function(info, res) {
        var params, i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
        try {
          params = eval('(' + res + ')');
        } catch(e) {
          params = q2ajx(res);
        }
        if (!params.photos) {
          Upload.onUploadError(info);
          return;
        }
        WallUpload.photoUploaded(info, params);
      },
      onUploadProgress: function(info, bytesLoaded, bytesTotal) {
        var i = info.ind !== undefined ? info.ind : info;
        if (Upload.types[i] == 'fileApi') {
          var lnkId = (cur.attachMediaIndexes || {})[i];
          if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
            var data = {loaded: bytesLoaded, total: bytesTotal};
            if (info.fileName) data.fileName = info.fileName.replace(/[&<>"']/g, '');
            cur.wallAddMedia.showMediaProgress('photo', i, data);
          }
        }
      },
      onUploadError: WallUpload.uploadFailed,
      onCheckServerFailed: function () {
        delete cur.uploadInited;
        WallUpload.hide();
      },
      onUploadCompleteAll: function (i) {
        if (Upload.types[i] == 'form') {
          Upload.embed(i);
        }
      },
      onDragEnter: function () {
        Wall.showEditPost();
        var dropEl = ge('post_upload_dropbox').firstChild,
            h = ge('submit_post_box').offsetHeight - (browser.webkit || browser.chrome ? 2 : 0);
        if (cur.wallType != 'feed') {
          h -= 16;
        }
        setStyle(dropEl, {height: h});
      },

      noFlash: 1,
      multiple: 1,
      multi_progress: 1,
      max_files: 10,
      chooseBox: 1,
      clear: 1,
      type: 'photo',
      max_attempts: 3,
      server: data.opts.server,
      error: data.opts.default_error,
      error_hash: data.opts.error_hash,
      dropbox: 'post_upload_dropbox',
      label: data.opts.label,
      dragEl: bodyNode
    });
    cur.uploadInited = true;
    WallUpload.show();
    if (cur.wallUploadFromDrag) {
      if (cur.wallUploadFromDrag == 1) {
        setTimeout(function() {
          var dropEl = ge('post_upload_dropbox'),
              h = ge('submit_post_box').offsetHeight - (browser.webkit || browser.chrome ? 2 : 0);
          if (cur.wallType != 'feed') {
            h -= 16;
          }
          setStyle(dropEl.firstChild, {height: h});
          show(dropEl);
        }, 0);
      }
      delete cur.wallUploadFromDrag;
    }
  }
};

function initCustomMedia(lnk, types, opts) {
  lnk = ge(lnk);
  if (!lnk) return false;

  opts = opts || {};

  if (!window.__addMediaIndex) __addMediaIndex = 0;
  var menuId = ++__addMediaIndex;

  if (opts.bgsprite) {
    var icons = opts.bgsprite;
  } else if (window.devicePixelRatio >= 2) {
    var icons = '/images/icons/attach_icons_2x.png?6';
    opts.bgSize = '20px 220px';
  } else {
    var icons = '/images/icons/attach_icons.png?6';
  }
  vkImage().src = icons;

  if (opts.tooltip) {
    var html = '<div class="rows"><div class="add_media_items"></div><div class="add_media_pointer"><div class="chats_sp add_media_pointer_icon"></div></div></div>';
  } else {
    var html = '<div class="rows"><div class="add_media_items"><div class="add_media_head noselect"><nobr>' + lnk.innerHTML + '</nobr></div></div></div>';
  }

  if (!window.customMenuNode) {
    window.customMenuNode = domFC(domFC(pageNode.appendChild(ce('div', {
      id: '',
      innerHTML: '<div class="scroll_fix" id="custom_menu_wrap" style="width:' + (lastInnerWidth - 1) + 'px"><div id="custom_menu_cont"></div></div>'
    }))));
  }
  var menuNode = ce('div', {
    id: 'add_media_menu_' + menuId,
    className: 'add_media_menu ' + (opts.menuNodeClass || ''),
    innerHTML: '<div class="add_media_rows">' + html + '</div>'
  }, {position: 'absolute'});
  var itemsNode = geByClass1('add_media_items', menuNode, 'div')
  customMenuNode.appendChild(menuNode);

  var reverseMargin = opts.reverseMargin || 25;
  var _hideTimer, mediaMenu = {
    id: menuId,
    fixed: -1,
    menuNode: menuNode,
    updateFixed: function(newVal) {
      if (mediaMenu.fixed != -1 && newVal != -1 && newVal !== undefined && mediaMenu.fixed == newVal) {
        return;
      }
      if (mediaMenu.fixed == -1 || newVal !== undefined) {
        if (newVal === undefined || newVal == -1) {
          var el = lnk;
          mediaMenu.fixed = false;
          while (el) {
            if (getStyle(el, 'position') == 'fixed') {
              mediaMenu.fixed = true;
              break;
            }
            el = el.offsetParent;
          }
        } else {
          mediaMenu.fixed = newVal;
        }
        if (mediaMenu.fixed) {
          setStyle(customMenuNode, {position: ''});
          addClass(customMenuNode, 'fixed');
        } else {
          setStyle(customMenuNode, {position: 'absolute'});
          removeClass(customMenuNode, 'fixed');
        }
        if (isVisible(menuNode)) {
          mediaMenu._updatePosition(true);
        }
      }
    },
    show: function(touched, ev) {
      clearTimeout(_hideTimer);
      if (menuNode && !isVisible(menuNode)) {
        lnk.blur();
        mediaMenu.updateFixed(-1);
        var h = mediaMenu._updatePosition(), el = menuNode.firstChild;

        if (browser.msie && browser.version < 9 || browser.mobile) {
          show(menuNode);
        } else {
          setStyle(el, {height: 26, overflow: 'hidden'});
          fadeIn(menuNode, 200);
          if (mediaMenu.reverse) {
            setStyle(el, {position: 'absolute', bottom: -reverseMargin, width: getSize(el.firstChild)[0]});
            setStyle(el.firstChild, {position: 'absolute', bottom: '0px'});
          }
          animate(el, {height: h - 2}, 200, function() {
            setStyle(el.firstChild, {position: 'relative', bottom: ''});
            setStyle(el, {height: '', overflow: '', position: 'static'});
          });
        }
        opts.onShow && opts.onShow();
      }
      if (touched === true) {
        mediaMenu.touched = true;
        clearTimeout(mediaMenu.toucht);
        removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
        mediaMenu.toucht = setTimeout(addEvent.pbind(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide), 500);
        return cancelEvent(ev);
      }
    },
    iecheckhide: function() {
      if (mediaMenu.touched) {
        setTimeout(mediaMenu.hide.pbind(true), 500);
      }
      clearTimeout(mediaMenu.toucht);
      removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
    },
    _updatePosition: function(visible) {
      var coords = getXY(lnk, mediaMenu.fixed),
          pointerShift = 0,
          xShift = opts.leftOffset || 0, yShift = opts.topOffset || 0,
          top = coords[1] + yShift - 4 + (browser.msie && browser.version < 8 ? 1 : 0);
      var rowsEl = menuNode.firstChild, more = geByClass1('add_media_more', menuNode);
      if (vk.rtl) {
        var right =
          lastInnerWidth - 4 // full screen width
           - coords[0] // lnk coords
           - 3 * getSize(lnk)[0] / 2 // 3/2 of lnk width
           + xShift // shift from options;
        if(right < 0) {
          pointerShift = -right;
          right = 0;
        }
        setStyle(menuNode, {right: right, top: top});
      } else {
        var left =
          coords[0]
          + xShift // shift from options
          - getSize(menuNode)[0]/2 // half of media menu width
          + getSize(lnk)[0]/2 // half of lnk
          + (browser.msie6 ? 1 : 0); // hack for ie6
        if(left < 0) {
          pointerShift = left;
          left = 0;
        }
        setStyle(menuNode, {left: left, top: top});
      }

      // before we make it relative, fix 100% to prevent twitching
      setStyle(rowsEl.firstChild, { width: '100%' });
      setStyle(geByClass1('add_media_pointer', menuNode), {
        position: 'relative',
        left: pointerShift  + 'px'
      });

      // Showing to up in case of little widget height
      if (!visible) {
        setStyle(menuNode, {visibility: 'hidden', display: 'block'});
        if (more) {
          hide(more);
          show(more.nextSibling);
        }
      }
      var countSize = getSize(rowsEl), st = (mediaMenu.fixed ? 0 : scrollGetY()), size = countSize;
      if (!visible) {
        if (more) {
          show(more);
          hide(more.nextSibling);
          size = getSize(rowsEl);
        }
        setStyle(menuNode, {visibility: '', display: 'none'});
      }

      var needReverse = false;
      if (countSize[1] - reverseMargin < top - st && lastWindowHeight + st < top + countSize[1] || opts.forceUp) {
        setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
        if (!mediaMenu.reverse) needReverse = true;
      } else {
        setStyle(rowsEl, 'marginTop', -4);//(/mac/.test(_ua) && browser.mozilla ? 22 : 20));
        if (mediaMenu.reverse) needReverse = true;
      }
      if (needReverse) {
        var els = itemsNode.childNodes, len = els.length, el = (mediaMenu.moreWrap || {}).lastChild || {};
        while (len--) {
          itemsNode.appendChild(els[len]);
        }
        els = el.childNodes; len = (els || []).length;
        while (len--) {
          el.appendChild(els[len]);
        }
        mediaMenu.reverse = !mediaMenu.reverse;
        (mediaMenu.reverse ? addClass : removeClass)(menuNode, 'add_media_rev');
      }

      return size[1];
    },
    hide: function(noTimeout) {
      clearTimeout(_hideTimer);
      var hideFunc = (browser.msie && browser.version < 9 || browser.mobile) ? hide.pbind(menuNode) : fadeOut.pbind(menuNode, 100);
      if (noTimeout === true) {
        mediaMenu.touched = false;
        hideFunc();
      } else {
        if (mediaMenu.touched) return;
        _hideTimer = setTimeout(hideFunc, 300);
      }
      opts.onHide && opts.onHide();
    },
    setOptions: function (options) {
      each(options, function (k, v) {
        switch (k) {
          case 'bgsprite': vkImage().src = icons = v; break;
        }
      });
      extend(opts, options);
    },
    setItems: function(types) {
      for (var f = itemsNode.firstChild, l = itemsNode.lastChild; f != l; f = itemsNode.firstChild, l = itemsNode.lastChild) {
        itemsNode.removeChild(hasClass(f, 'add_media_head') ? l : f);
      }
      var test = '';
      var spec_style = (/mac/.test(_ua) && browser.mozilla) ? {height: 19} : {};

      var moreNode = false;
      var hideItem = opts.hideItem;
      var needHide = (hideItem || (types.length > 6)) && !browser.mobile;
      var hideLabel = hideItem && opts.hideLabel || getLang('global_add_media_more');

      mediaMenu.moreWrap = false;

      each(types, function(i, v) { // [id, name, bg-position, onclick, href, bg-url, customStyle]
        var attrs = {
          innerHTML: '<nobr>' + v[1].replace(/\s/g, '&nbsp;') + '</nobr>',
          className: 'add_media_type_' + menuId + '_' + v[0] + ' add_media_item'
        }, style = v[6] || {
          backgroundImage: 'url(' + (v[5] || icons) + ')',
          backgroundPosition: (v[2] || '0 0')
        }, row;
        if (!v[6] && opts.bgSize) {
          style.backgroundSize = opts.bgSize;
        }

        if (needHide && (hideItem ? v[0] == hideItem : i == 3)) {
          var rowsEl = menuNode.firstChild;
          var moreWrap = itemsNode.appendChild(ce('div', {
            className: "add_media_more_wrap"
          }));
          addEvent(moreWrap, 'mouseover click', function(ev) {
            if (ev.type == 'mouseover' && mediaMenu.touched) return;
            clearTimeout(mediaMenu.moreHide);
            if (isVisible(moreWrap.lastChild)) return;
            show(moreWrap.lastChild);
            hide(moreWrap.firstChild);
            if (!mediaMenu.reverse) return;
            var size = getSize(rowsEl);
            setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
          });
          addEvent(moreWrap, 'mouseout', function () {
            clearTimeout(mediaMenu.moreHide);
            mediaMenu.moreHide = setTimeout(function() {
              hide(moreWrap.lastChild);
              show(moreWrap.firstChild);
              if (!mediaMenu.reverse) return;
              var size = getSize(rowsEl);
              setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
            }, 300);
          });
          row = moreWrap.appendChild(ce('a', {
            className: 'add_media_more add_media_item',
            innerHTML: '<nobr>' + hideLabel + '</nobr>'
          }));
          moreNode = ce('div', {
            className: 'add_media_more_node',
            innerHTML: '<div class="unshown"></div>'
          }, {
            display: 'none'
          });
          row = moreWrap.appendChild(moreNode);
          mediaMenu.moreWrap = moreWrap;
        }

        extend(style, spec_style);
        if (v[4]) {
          attrs.href = v[4];
        }

        row = (moreNode ? moreNode : itemsNode).appendChild(ce('a', attrs, style));
        if (v[3]) {
          addEvent(row, 'click', function () {
            mediaMenu.hide(true);
            if (opts.onItemClick && !opts.onItemClick(v[0])) {
              return false;
            }
            v[3]();
            return false;
          });
        }
      });
      if (opts.tooltip) {
        var pointerNode = geByClass1('add_media_pointer', menuNode);
        addEvent(itemsNode.firstChild, 'mouseover', function() {
          addClass(pointerNode, 'add_media_pointer_hover');
        });
        addEvent(itemsNode.firstChild, 'mouseout', function() {
          removeClass(pointerNode, 'add_media_pointer_hover');
        });
      }
    }
  };

  types && mediaMenu.setItems(types);

  if (browser.msie) {
    removeEvent(lnk, 'MSPointerDown'); // for ie10 touch
    addEvent(lnk, 'MSPointerDown', mediaMenu.show.pbind(true));
    addEvent(menuNode, 'MSPointerDown', mediaMenu.show.pbind(true));
  }

  removeEvent(lnk, 'mouseover');
  addEvent(lnk, 'mouseover click', mediaMenu.show);
  addEvent(lnk, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'mouseover', mediaMenu.show);
  addEvent(menuNode, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'click', cancelEvent);
  addEvent(geByClass1('add_media_header', menuNode), 'click', function(e) {
    mediaMenu.show(true);
    cancelEvent(e);
  });

  if (!opts.global) {
    cur.destroy.push(function() {
      cleanElems(menuNode);
      re(menuNode);
      removeEvent(lnk, 'click', mediaMenu.show);
      if (browser.msie) {
        clearTimeout(mediaMenu.toucht);
        removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
      }
    });
  }

  return mediaMenu;
}

var urlActiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,7}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
    urlInactiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,7}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

function extractUrls(text, inactive) {
  var rx = inactive ? urlInactiveExp : urlActiveExp,
    matches;

  var result = [];
  while (text && (matches = text.match(rx))) {
    text = text.substr(matches.index + matches[0].length);
    var offset = 0;
    if (!matches[4]) {
      offset = 7;
    }
    result.push({url: matches[2 + offset], query: matches[5 + offset] || '', domain: matches[4 + offset]});
  }

  return result;
}

function initAddMedia(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {graffiti: -152, video: -20, photo: 3, audio: -42, poll: -108, doc: -64, map: -86, note: -130, postpone: -173, gift: -196}, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false, toId = opts.toId || cur.postTo, params = {to_id: toId, scrollbar_width: sbWidth(), blockPersonal: opts.blockPersonal};
    params.mail_add = opts.mail ? 1 : '';
    switch (v[0]) {
      case 'graffiti':
          handler = showBox.pbind('al_wall.php', {act: 'canvas_draw_box', to_id: toId, flash: browser.flash}, {cache: 1, dark: 1});
        break;
      case 'photos_list':
        handler = showBox.pbind('al_photos.php', extend(params, {act: 'choose_photo'}), {cache: 1, stat: ['photos.js', 'photos.css', 'upload.js'], dark: 1});
        break;
      case 'photo':
        handler = showBox.pbind('al_photos.php', extend(params, {act: 'choose_photo', max_files: opts.limit || 10}), {cache: 1, stat: ['photos.js', 'photos.css', 'upload.js'], dark: 1});
        break;
      case 'video':
        handler = showBox.pbind('al_video.php', extend(params, {act: 'a_choose_video_box'}), {cache: 1, dark: 1});
        break;
      case 'audio':
        handler = showBox.pbind('audio', extend(params, {act: 'a_choose_audio_box'}), {cache: 1, dark: 1});
        break;
      case 'poll':
        handler = function () {addMedia.chooseMedia('poll', '', v[2])};
        break;
      case 'doc':
        var dcparams = opts.docParams || {};
        handler = showBox.pbind('docs.php', extend(params, extend({act: 'a_choose_doc_box'}, dcparams)), {stat: ['docs.css']});
        break;
      case 'map':
        handler = showBox.pbind('al_places.php', extend(params, {act: 'a_choose_place_box'}), {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js', 'boxes.css'], width: 640, bodyStyle: 'padding: 0px;', dark: 1});
        break;
      case 'note':
        handler = showWiki.pbind({note: 'new'}, true, false, {queue: 1});
        break;
      case 'postpone':
        handler = function () {addMedia.chooseMedia('postpone', v[1], v[2])};
        break;
      case 'gift':
        handler = function() {
          var mid = (cur.peer < 2e9) ? cur.peer : 0;
          cur.giftCurrentPrivacy = 1;
          cur.giftCurrentMessage = trim(clean(IM.getPlainText()));
          cur.onGiftSended = val.pbind(ge('im_editable' + mid), '');
          cur.giftSendFrom = 'im';
          showBox('al_gifts.php', {act: 'get_gift_box', mid: mid, fr: (mid == vk.id ? 1 : 0)}, {stat: ['gifts.css', 'wide_dd.js', 'wide_dd.css'], dark: 1});
        }
        break;
    }
    var isApp = (v[0] == 'app');
    var icon = isApp ? v[4] : false;
    var bgpos = isApp ? '5px 5px' : ('3px ' + bgposes[v[0]] + 'px');
    var url = isApp ? ('/app' + v[2] + '?to_id=' + toId) : false;
    var name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var limit = opts.limit || 10,
      multi = limit > 1,
      editable = opts.editable && (!browser.msie || browser.version > 8),
      sortable = opts.sortable && (!browser.msie || browser.version > 8);

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
      cur.showMediaProgress = addMedia.showMediaProgress;
      cur.attachCount = addMedia.attachCount;
    },
    onItemClick: function(type) {
      if (multi && addMedia.attachCount() >= limit && type !== 'postpone') {
        showFastBox(getLang('global_error'), getLang('attachments_limit', limit));
        return false;
      }
      return true;
    },
    tooltip: opts.tooltip,
    topOffset: opts.topOffset,
    forceUp: opts.forceUp,
    global: opts.global
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      previewEl = ge(previewId),
      progressEl;

  if (multi) {
    previewEl.innerHTML = '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + lnkId + '" class="page_pics_preview page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>';
    var picsEl = domFC(previewEl),
        dpicsEl = domNS(picsEl),
        docsEl = domNS(dpicsEl),
        pdocsEl = domNS(docsEl),
        ldocsEl = domNS(pdocsEl),
        mpicsEl = domNS(ldocsEl),
        ppdocsEl = domNS(mpicsEl),
        progressEl = domNS(ppdocsEl);
    removeClass(previewEl, 'media_preview');
    addClass(previewEl, 'multi_media_preview');
  } else {
    addClass(previewEl, 'med_no_attach');
    show(previewEl);
  }

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    menu: menu,
    phLists: {},
    handlers: {},
    chosenMedias: [],
    _showAddMedia: function() {
      menu.show();
    },
    _hideAddMedia: function(noTimeout) {
      menu.hide(noTimeout);
    },
    chooseMedia: function(type, media, data, url, noboxhide, isGraffiti) {
      if (addMedia.onChange && addMedia.onChange(type, media, data, url) === false) {
        return false;
      }
      if (type == 'note') cur.pbNoteAdded = false;
      if (inArray(type, opts.disabledTypes || [])) {
        return false;
      }
      if (addMedia.attachCount() >= limit && data.upload_ind === undefined && type !== 'postpone' || geByClass1('medadd_c_market', docsEl)) {
        if (multi) {
          return false;
        } else {
          addMedia.unchooseMedia();
        }
      }
      var already = false, alreadyTypes = {};
      if (multi) {
        each (addMedia.chosenMedias, function () {
          if (this[0] == type && this[1] == media) {
            already = true;
            return false;
          }
          alreadyTypes[this[0]] = alreadyTypes[this[0]] ? alreadyTypes[this[0]] + 1 : 1;
        });
        if (already) {
          return false;
        }
      }
      var preview = '', postview = '', toPics = false, toEl = docsEl, oncl, attrs = '';
      switch (type) {
        case 'graffiti':
          if (!isObject(data)) {
            data = {thumb: data || ''};
          }
          preview = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + data.thumb + '" /></div>';
          toEl = toPics = mpicsEl;
        break;

        case 'photos_list':
          hide(this._addMediaLink);
          vkImage().src = data[1];
          var _vopts = data[3].replace(/^{|}$/g, '');
          if (_vopts) _vopts += ',';
          _vopts += 'queue:1';

          oncl = opts.nocl ? '' : ' onclick="return showPhoto(\'' + data[4] + '\', \'' + data[2] + '\', ' + _vopts.replace(/"/g, '&quot;') + ');"';
          preview = '<div' + oncl + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + data[1] + '" /></div>';
          toEl = toPics = picsEl;
        break;

        case 'photo':
          if (!isObject(data)) {
            data = {
              thumb_m: data[0] || '',
              thumb_s: data[1] || '',
              list: data[2] || '',
              view_opts: data[3] || '',
              upload_ind: data.upload_ind || undefined
            };
          }
          vkImage().src = data.thumb_m;
          var _vopts = data.view_opts.replace(/^{|}$/g, '');
          if (_vopts) _vopts += ',';
          _vopts += 'queue:1';
          addMedia.phLists[media] = data.list;

          if (editable) {
            if (!data.editable) return false;
            if (!opts.nocl) data.editable.click = addMedia.showPhoto.pbind(media, data.list, parseJSON('{' + _vopts + '}'));
          }

          oncl = opts.nocl ? '' : ' onclick="return cur.addMedia['+addMedia.lnkId+'].showPhoto(\'' + media + '\', \'' + data.list + '\', {' + _vopts.replace(/"/g, '&quot;') + '});"';
          preview = '<div ' + oncl + ' class="fl_l page_preview_photo'+(isGraffiti ? ' page_preview_ph_graff' : '')+'"><img class="page_preview_photo" src="' + data.thumb_m + '" /></div>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'video':
          if (!isObject(data)) {
            data = {
              thumb: data || ''
            };
          }
          if (editable) {
            if (!data.editable) return false;
            if (!opts.nocl) data.editable.click = showVideo.pbind(media, false, {queue:1});
          }

          oncl = opts.nocl ? '' : ' onclick="return showVideo(\'' + media + '\', false, {queue:1});"';
          preview = '<div' + oncl + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + data.thumb + '" /></div>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'audio':
          if (!data.info) return false;
          preview = Page.addAudioPreview(media, data);
          attrs = ' id="pam' + lnkId + '_audio' + media + '"';
        break;

        case 'app':
          preview = '<div class="app fl_l"><img src="' + data[0] + '" /><span>' + data[1] + '</span></div>';
          each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {hide(this);});
        break;

        case 'doc':
          if (!data.lang) return false;
          if (data.thumb && data.thumb_s) {
            preview = '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + data.href + '" class="fl_l pam_dpic"><div class="page_preview_doc_photo"><img src="' + data.thumb_s + '" align="center"></div><div class="page_preview_doc_photo_hint">' + data.title + '</div>';
            postview = '</a><div class="pam_bg"></div>';
            toEl = toPics = dpicsEl;
            attrs = ' id="pam' + lnkId + '_doc' + media + '"';
          } else {
            preview = '<a target="_blank" href="' + data.href + '" class="medadd_h medadd_h_doc inl_bl">' + data.lang.profile_choose_doc + '</a>';
            postview = '<div class="medadd_c medadd_c_doc"><a target="_blank" href="' + data.href + '" title="' + data.title + '">' + data.title + '</a></div>';
            attrs = ' id="pam' + lnkId + '_doc' + media + '"';
          }
        break;

        case 'share':
          if (alreadyTypes.share || alreadyTypes.page || !data.lang) {
            return false;
          }
          if (isArray(data)) {
            data = {
              domain: data[0],
              url: data[1],
              initialPattern: data[2],
              title: data[3],
              description: data[4],
              images: [data[5]],
              user_id: data[6],
              photo_id: data[7]
            };
          };
          data.media = data.media || media;
          if (data.draft) {
            addMedia.checkURL(data.url);
            return false;
          }
          preview = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(data.url) + '" class="medadd_h medadd_h_link inl_bl">' + data.lang.profile_choose_link + '</a>';
          addMedia.shareData = extend(addMedia.shareData || {}, data, {imagesStyles: ['']});
          toEl = ldocsEl;
        break;

        case 'poll':
          if (!data.lang) return false;
          preview = '<div class="medadd_h medadd_h_poll inl_bl">' + data.lang.q + '</div>';
          hide(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
          toEl = pdocsEl;
        break;

        case 'map':
          preview = '<div class="fl_l"><a onclick="return showBox(\'al_places.php\', {act: \'geo_box\', lat: '+data[0]+', long: '+data[1]+', provider: '+intval(data[3])+'}, {dark: 1});"><div class="page_media_map_point"></div><img class="page_preview_map" width="174" height="70" src="/maps?lat='+data[0]+'&lng='+data[1]+'&z=11&'+((window.devicePixelRatio >= 2 || true) ? 'w=360&h=140' : 'w=174&h=70')+'" /></a></div>';
          toEl = toPics = mpicsEl;
          hide(geByClass1('add_media_type_' + lnkId + '_map', ge('add_media_menu_' + lnkId)));
        break;

        case 'page':
          if (alreadyTypes.share || alreadyTypes.page || !data.lang) {
            return false;
          }
          var lst = data.media.split('_');
          preview = '<a href="/page' + data.media + '" onclick="return showWiki({oid: ' + lst[0] + ', id: ' + lst[1] + '}, false, event, {queue: 1})" class="medadd_h medadd_h_page inl_bl">' + data.lang.profile_choose_page + '</a>';
          toEl = ldocsEl;
        break;

        case 'album':
          if (editable) {
            if (!data.editable) return false;
            extend(data.editable, {
              title: data.title,
              size: data.count,
              click: opts.nocl ? false : nav.change.pbind({z: 'album' + media})
            });
          }

          vkImage().src = data.thumb;
          oncl = opts.nocl ? '' : ' href="/album' + media + '" onclick="return nav.change({z: \'album' + media + '\'}, event)"';
          var cls = 'fl_l page_preview_album wall_album_cover_wrap' + (data.thumb ? '' : ' wall_album_nocover');
          preview = '<a class="' + cls + '" ' + oncl + '>\
' + (data.thumb ? '<img class="wall_album_cover" src="' + data.thumb + '"/>' : '') + '\
  <div class="wall_album_caption">\
    <div class="wall_album_title_wrap clear_fix">\
      <div class="wall_album_title fl_l">' + data.title + '</div>\
      <div class="wall_album_count fl_r">' + data.count + '</div>\
    </div>\
  </div>\
</a>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'note':
          if (!data.lang) return false;
          preview = '<a onclick="showWiki({w: \'note' + data.raw + '\', edit: 1}, true, event, {queue: 1})" class="medadd_h medadd_h_note inl_bl">' + data.lang.profile_choose_note + '</a>';
          postview = '<div class="medadd_c medadd_c_note"><a onclick="showWiki({w: \'note' + data.raw + '\', edit: 1}, true, event, {queue: 1})" id="share_note_title' + data.raw + '">' + data.title + '</a></div>';
          toEl = ldocsEl;
        break;

        case 'market':
          preview = '<div class="medadd_c_market fl_l"><a target="_blank" href="' + data.href + '"><img class="medadd_c_market_thumb fl_l" src="' + data.thumb + '" /></a><div class="medadd_c_market_info fl_l"><a class="medadd_c_market_title" target="_blank" href="' + data.href + '">' + data.title + '</a><div class="medadd_c_market_price">' + data.price + '</div></div>';
          hide(lnk);
        break;

        case 'market_album':
          if (editable) {
            if (!data.editable) return false;
            extend(data.editable, {
              title: data.title,
              msize: langNumeric(data.count, data.lang.profile_X_market_items),
              click: false
            });
          }
          var lst = media.split('_');

          vkImage().src = data.thumb;
          oncl = opts.nocl ? '' : ' href="/market' + lst[0] + '?section=album_' + lst[1] + '"';
          var cls = 'fl_l page_preview_album wall_album_cover_wrap wall_market_album_cover' + (data.thumb ? '' : ' wall_album_nocover');
          preview = '<a class="' + cls + '" ' + oncl + '>\
' + (data.thumb ? '<img class="wall_album_cover" src="' + data.thumb + '"/>' : '') + '\
  <div class="wall_album_caption">\
    <div class="wall_album_title_wrap clear_fix">\
      <div class="wall_album_count fl_r">' + data.count + '</div>\
      <div class="wall_album_title">' + data.title + '</div>\
    </div>\
  </div>\
</a>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'postpone':
          preview = '<div class="medadd_h medadd_h_timer inl_bl">' + data.lang.profile_choose_timer + '<span id="postpone_preview' + lnkId + '"></span></div>';

          if (cur.editingPost && !multi) {
            media = intval(media);
            if (media) {
              data.date = media;
            } else {
              data.date = intval(cur.editingPost[6]);
            }
            geByTag1('button', geByClass1('button_blue', ge('post'+cur.editingPost[0]))).innerHTML = getLang('global_save');
          } else if (cur.editingPost && domPN(ppdocsEl).id == 'wpe_media_preview') {
            media = intval(media);
            if (media) {
              data.date = media;
            } else {
              data.date = intval(cur.editingPost[6]);
            }
            var exp = geByClass1('medadd_c_timersett', ppdocsEl);
            if (exp) {
              var pn = domPN(exp);
              exp = pn.innerHTML;
              re(pn);
            } else {
              exp = '';
            }
            geByTag1('button', geByClass1('button_blue', ge('post'+cur.editingPost[0]))).innerHTML = getLang('global_save');
          } else {
            if (data.draft) {
              data.date = intval(media);
            } else if (cur.postponedLastDate) {
              data.date = intval(cur.postponedLastDate) + 14400;
            }
            var chk = ge('official');
            if (chk) {
              if (!isChecked(chk)) {
                checkbox(chk);
                toggle('signed', true);
              }
              addClass(chk, 'disabled');
            }
            var btn = ge('send_post');
            if (btn) {
              btn.innerHTML = data['lang']['profile_wall_postpone_btn'];
            }
          }
          hide(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
          toEl = ppdocsEl;
        break;
      }

      if (multi) {
        var medias = addMedia.chosenMedias,
            ind = medias.length,
            mediaEl = (editable && toPics === 1) ? false : ((type == 'photos_list') ?
              se('<div class="page_preview_' + type + '_wrap" style="position: relative">' + preview + '<div class="page_photos_count">' + media.split(',').length + '</div></div>') :
              se('<div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" '+ (browser.msie && browser.version < 9 ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie && browser.version < 9) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div>'));
        addClass(mediaEl, toPics ? 'fl_l' : 'clear_fix');
        if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
        if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() + 1 < limit);

        if (editable && toPics === 1) {
          addClass(toEl, 'editable_thumbs_wrap');
          if (!domLC(toEl) || !hasClass(domLC(toEl), 'editable_thumbs')) {
            toEl = toEl.appendChild(ce('div', {id: 'thumbs_edit' + lnkId, className: 'editable_thumbs'}));
          } else {
            toEl = domLC(toEl);
          }
          stManager.add(['thumbs_edit.css', 'thumbs_edit.js'], function() {
            if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() + 1 < limit);
            data.editable.remove = addMedia.unchooseMedia.pbind(ind);
            show(domPN(toEl));
            var teMed = ThumbsEdit.convert(type, media, data.editable);
            if (domFC(toEl)) {
              ThumbsEdit.addMedia(toEl, teMed);
            } else if (opts.teWidth && opts.teHeight) {
              ThumbsEdit.init(toEl, [teMed], {width: opts.teWidth, height: opts.teHeight, onMove: opts.onAddMediaChange});
            } else {
              ThumbsEdit.init(toEl, [teMed], {onMove: opts.onAddMediaChange});
            }
          }, true);
        } else {
          show(toEl);
          toEl.appendChild(mediaEl);
          if (sortable) {
            if (toEl == docsEl) {
              stManager.add(['sorter.js'], function() {
                var dXY = getXY(docsEl), dSz = getSize(docsEl),
                docsSorter = function() {
                  if (docsEl.sorter) {
                    sorter.added(docsEl);
                  } else if (toEl.childNodes.length > 1) {
                    sorter.init(docsEl, {onReorder: opts.onAddMediaChange});
                  }
                };
                if (!dXY[0] && !dXY[1] && !dSz[0] && !dSz[1]) {
                  cur.sorterClbk = docsSorter;
                } else {
                  docsSorter();
                }
              }, true);
            } else if (toEl == dpicsEl) {
              stManager.add(['qsorter.js'], function() {
                if (dpicsEl.qsorter) {
                  qsorter.added(dpicsEl);
                } else if (toEl.childNodes.length > 1) {
                  qsorter.init(dpicsEl, addMedia.qsorterOpts());
                }
              }, true);
            }
          }
        }
        medias.push([type, media, mediaEl, url]);
      } else {
        var ind = (type === 'postpone' ? 1 : 0);
        var mediaEl = se('<div class="' + (toPics === false ? 'page_docs_preview' : 'page_pics_preview') + '"><div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" '+ (browser.msie && browser.version < 9 ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie && browser.version < 9) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div></div>');
        if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
        if (type !== 'postpone') {
          addMedia.chosenMedia = [type, media];
          addMedia.chosenMediaData = data;
        }
        addMedia.singleAdded(mediaEl, type);
      }

      if (type == 'share') {
        if (data.title && !url) {
          cur.shareShowImg = 0;
          addMedia.showPreview(true);
          addMedia.shareData.images = false;
        } else {
          addMedia.showExternalPreview();
        }
      } else if (type == 'page') {
        if (!data['nopreview']) {
          cur.shareShowImg = 0;
          addMedia.shareData = extend(addMedia.shareData || {}, data, {images: false});
          addMedia.showPreview();
        }
      } else if (type == 'poll') {
        addMedia.createPoll(data);
      } else if (type == 'postpone') {
        addMedia.setupPostpone(data, exp);
      }

      var ev = window.event;
      if (ev && ev.type == 'click' && (event.ctrlKey || event.metaKey || event.shiftKey)) {
        noboxhide = true;
      }
      if ((!cur.fileApiUploadStarted || data.upload_ind === undefined) && !cur.preventBoxHide && noboxhide !== true && !inArray(type, ['poll', 'share', 'page', 'postpone'])) {
        boxQueue.hideLast();
      }

      cur.lastPostMsg = false;
      if (opts.onMediaAdd) {
        opts.onMediaAdd();
      }

      if (data.upload_ind !== undefined) {
        delete data.upload_ind;
      }
      return false;
    },
    unchooseMedia: function(ind) {
      if (addMedia.onChange && addMedia.onChange(false, ind) === false) {
        return false;
      }
      if (multi) {
        if (ind === undefined) {
          if (window.ThumbsEdit) {
            ThumbsEdit.removeAll('thumbs_edit' + lnkId);
          }
          each (addMedia.chosenMedias, function (k, v) {
            if (v && k !== undefined) addMedia.unchooseMedia(k);
          });
          addMedia.urlsCancelled = [];
          return;
        }
        var medias = addMedia.chosenMedias, x;
        if (medias[ind]) {
          if (medias[ind][2]) {
            if ((x = geByClass1('page_media_x_wrap', medias[ind][2], 'div')) && x.tt && x.tt.el) {
              x.tt.destroy();
            }
            if (domPN(medias[ind][2]) == docsEl && docsEl.sorter) {
              each (docsEl.sorter.elems, function() {
                setStyle(this, {top: 'auto', left: 'auto', cursor: 'auto'});
              });
              docsEl.sorter.destroy();
              re(medias[ind][2]);
              if (docsEl.childNodes.length > 1) sorter.init(docsEl, {onReorder: opts.onAddMediaChange});
            } else if (domPN(medias[ind][2]) == dpicsEl && dpicsEl.qsorter) {
              each (dpicsEl.qsorter.elems, function() {
                setStyle(domFC(this), {top: 'auto', left: 'auto'});
                setStyle(this, {cursor: 'auto'});
              });
              dpicsEl.qsorter.destroy();
              re(medias[ind][2]);
              if (dpicsEl.childNodes.length > 1) qsorter.init(dpicsEl, addMedia.qsorterOpts());
            } else {
              re(medias[ind][2]);
            }
          } else if (medias[ind][0] == 'photo' || medias[ind][0] == 'video' || medias[ind][0] == 'album') {
            if (window.ThumbsEdit) {
              ThumbsEdit.removeById('thumbs_edit' + lnkId, medias[ind][0] + medias[ind][1]);
            }
          }
          switch (medias[ind][0]) {
            case 'page':
            case 'share':
              addMedia.shareData = {};
              re(addMedia.sharePreview);
              delete addMedia.sharePreview;
              break;

            case 'poll':
              re(addMedia.pollPreview);
              addMedia.pollPreview = false;
              show(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
              break;

            case 'app':
              each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {show(this);});
              break;

            case 'map':
              show(geByClass1('add_media_type_' + lnkId + '_map', ge('add_media_menu_' + lnkId)));
              break;

            case 'market':
              show(lnk);
              break;

            case 'postpone':
              var exp = geByClass1('medadd_c_timersett', addMedia.postponePreview);
              if (cur.editingPost && exp) {
                re(domFC(addMedia.postponePreview));
              } else {
                re(addMedia.postponePreview);
              }
              addMedia.postponePreview = false;
              removeClass('official', 'disabled');
              if (!cur.editingPost) {
                ge('send_post').innerHTML = getLang('wall_send');
              } else {
                geByTag1('button', geByClass1('button_blue', ge('post'+cur.editingPost[0]))).innerHTML = getLang('wall_publish_now');
              }
              show(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
              break;
          }
          medias[ind] = false;
        }
        if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
        toggle(picsEl, !!(editable ? geByClass1('thumb_wrap', picsEl) : domFC(picsEl)));
        toggle(dpicsEl, !!domFC(dpicsEl));
        toggle(docsEl, !!domFC(docsEl));
        toggle(pdocsEl, !!domFC(pdocsEl));
        toggle(ldocsEl, !!domFC(ldocsEl));
        toggle(mpicsEl, !!domFC(mpicsEl));
        toggle(ppdocsEl, !!domFC(ppdocsEl));
        toggle(progressEl, !!domFC(progressEl));
      } else {
        var share, x;
        if (ind == undefined) {
          ind = 0;
        }
        if ((x = geByClass('page_media_x_wrap', previewEl, 'div')[ind]) && x.tt && x.tt.el) {
          x.tt.destroy();
        }
        if (ind && addMedia.postponePreview) {
          show(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
          re(domPN(addMedia.postponePreview));
          addMedia.postponePreview = false;
        } else {
          if (addMedia.postponePreview) {
            var postponeWrap = domPN(addMedia.postponePreview);
            for (var i = 0; i < previewEl.childNodes.length; i++) {
              var v = previewEl.childNodes[i];
              if (v.nodeName == 'DIV' && v != postponeWrap) re(v);
            };
            each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
              if (!hasClass(v, 'add_media_type_' + lnkId + '_postpone')) {
                show(v);
              }
            });
          } else {
            val(previewEl, '');
            addClass(previewEl, 'med_no_attach');
            each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
              show(v);
            });
          }
          if (addMedia.chosenMedia) {
            addMedia.chosenMedia = false;
            addMedia.chosenMediaData = false;
          }
          if (share = addMedia.shareData) {
            if (share.url) {
              addMedia.urlsCancelled.push(share.url);
            }
            if (share.initialPattern) {
              addMedia.urlsCancelled.push(share.initialPattern);
            }
            addMedia.shareData = {};
          }
          each([addMedia.sharePreview, addMedia.pollPreview], function () {re(this);});
          addMedia.sharePreview = addMedia.pollPreview = false;
        }
        if (opts.toggleLnk) show(lnk);
      }

      cur.lastPostMsg = false;

      if (addMedia.onChange) addMedia.onChange(false);
    },
    singleAdded: function(mediaEl, type) {
      if (addMedia.postponePreview) {
        previewEl.insertBefore(mediaEl, domFC(previewEl));
      } else {
        previewEl.appendChild(mediaEl);
      }
      removeClass(previewEl, 'med_no_attach');
      var menuItemsVisible = 0;
      each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
        if (type !== 'postpone' && !hasClass(v, 'add_media_type_' + lnkId + '_postpone')) {
          hide(v);
        } else if (isVisible(v)) {
          menuItemsVisible++;
        }
      });
      if (opts.toggleLnk && !menuItemsVisible) {
        hide(lnk);
      }
    },
    getMedias: function() {
      if (multi) {
        var edited = window.ThumbsEdit ? ThumbsEdit.getMedias('thumbs_edit' + lnkId) : [], already = {};
        var chosen = addMedia.chosenMedias || [], result = [], check = function(id, ck, cv) {
          if (cv[0] + cv[1] == id) {
            result.push(cv);
            already[id] = true;
            return false;
          }
        };
        each(edited, function(k, v) {
          each(chosen, check.pbind(v[0] + v[1]));
        });
        each(dpicsEl.childNodes, function(k, v) {
          var m = (v.id || '').match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
          if (m) each(chosen, check.pbind(m[1] + m[2]));
        });
        each(docsEl.childNodes, function(k, v) {
          var m = (v.id || '').match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
          if (m) each(chosen, check.pbind(m[1] + m[2]));
        });
        each(chosen, function(k, v) {
          if (v && isArray(v) && v.length && !already[v[0] + v[1]]) {
            result.push(v);
          }
        });
        return result;
      } else {
        var chosen = addMedia.chosenMedia;
        return chosen ? [chosen[0] + chosen[1]] : [];
      }
    },
    showPhoto: function(photoId, listId, opts, ev) {
      if (cur.pvData && (!cur.pvShown || cur.pvListId != listId)) {
        delete cur.pvData[listId];
      }
      for (var i in ajaxCache) {
        if (i.toString().match(/^\/al_photos\.php\#act=show&draft_photos/)) {
          delete ajaxCache[i];
        }
      }
      var m = addMedia.getMedias(), allPhotos = [];
      each(m, function(k, v) {
        if (v && v[0] == 'photo') {
          allPhotos.push(v[1] + '/' + (addMedia.phLists[v[1]] || ''));
        }
      });
      opts.additional = {draft_photos: allPhotos.join(';')};
      return showPhoto(photoId, listId, extend(opts, {queue: 1}), ev);
    },
    showMediaProgress: function(type, i, info) {
      if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
        return false;
      }
      var frac = info.loaded / info.total, percent = intval(frac * 100),
          fileName = (info.fileName || info.name || '').replace(/[&<>"']/g, ''),
          // ind = i,
          ind = fileName ? i + '_' + fileName : i,
          label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

      var prg = ge('upload' + ind + '_progress');
      if (!prg) {
        if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
        cur.attachMediaIndexes[ind] = lnkId;

        var progress = '\
<div class="fl_l"><div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">\
  <div id="upload' + ind + '_progress" class="page_attach_progress"></div>\
</div></div></div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\', this);"></div>';

        if (multi) {
          progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'}, {marginTop: '6px'}));
          show(progressEl);
          if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
        } else {
          var mediaEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'});
          addMedia.chosenMedia = 'progress';
          addMedia.singleAdded(mediaEl, 'progress');
        }
        prg = ge('upload' + ind + '_progress');
        prg.full = false;//intval(getStyle(prg.parentNode, 'width'));

        if (percent) {
          setStyle(prg, {width: prg.full ? (intval(prg.full * frac) + 'px') : percent + '%'})
        } else {
          setStyle(prg, {width: '1px'});
          hide(prg);
        }
      } else {
        show(prg);
        if (prg.full) {
          var tw = data(prg, 'tween'), w = intval(prg.full * frac);
          if (tw && tw.isTweening) {
            tw.to.width = w;
          } else {
            animate(prg, {width: w + 'px'}, 500);
          }
        } else {
          setStyle(prg, {width: percent + '%'});
        }
      }
    },

    attachCount: function() {
      if (addMedia.attachedCount) {
        return addMedia.attachedCount();
      }
      if (!previewEl) {
        return 0;
      }
      if (!multi) {
        return previewEl.childNodes.length - (addMedia.postponePreview ? 1 : 0);
      }
      var num = (editable && window.ThumbsEdit ? ((ThumbsEdit.cache()['thumbs_edit' + lnkId] || {}).previews || []) : picsEl.childNodes).length + dpicsEl.childNodes.length + mpicsEl.childNodes.length + docsEl.childNodes.length / (docsEl.sorter ? 2 : 1) + progressEl.childNodes.length;
      if (addMedia.sharePreview) {
        ++num;
      }
      if (addMedia.pollPreview) {
        ++num;
      }
      return num;
    },

    // Inline Polls
    createPoll: function(data) {
      var h = (browser.msie6 || data.question) ? '' : '1px', html = [], ans;
      var incCl = data[4 + (10 - 1) * 2] ? 'disabled' : '', decCl = data[4 + 2 * 2] ? '' : 'disabled';
      addMedia.pollPreview = pdocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_poll', innerHTML: '\
<input onkeydown="cur.addMedia[' + lnkId + '].keyPoll(this, event)" class="text medadd_c_pollq" id="create_poll_question' + lnkId + '" value="' + (data.question || '') + '" />\
<div class="medadd_c_pollh">' + data.lang.a + '</div>\
<div class="medadd_c_pollans" id="create_poll_answers' + lnkId + '"></div>\
<div class="medadd_c_polladd_wr" id="create_poll_add' + lnkId + '">\
  <div class="medadd_c_polladd" onclick="cur.addMedia[' + lnkId + '].incPoll()">' + data.lang.i + '</div>\
</div>' + (data.edit ? '' : '<div class="checkbox medadd_c_pollcb' + (data.anon ? ' on' : '') + '" id="create_poll_anonymous' + lnkId + '" onclick="checkbox(this);cur.addMedia[' + lnkId + '].changedPoll();"><div></div>' + data.lang.c + '</div>')}));
      if (!data.answers) data.answers = [[0, ''], [0, '']];
      cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem inl_bl" '+ (browser.msie ? 'title' : 'tootltip') + '="'+data.lang.d+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
      for (var i = 0, l = data.answers.length; i < l; ++i) {
        ans = data.answers[i];
        html.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
          attrs: (ans[0] ? 'id="create_poll_ans' + ans[0] + '" ' : '') + (ans[1] ? '" value="' + ans[1] + '" ' : ''),
          lnkid: lnkId
        }) + '</div>');
        if (i == 9) hide('create_poll_add' + lnkId);
      }
      val('create_poll_answers' + lnkId, html.join(''));
      if (browser.msie6 || data.question) {
        elfocus('create_poll_question' + lnkId);
        return;
      }
      addMedia.pollPreview.style.height = h;
      animate(addMedia.pollPreview, {height: 166}, 200, function() {
        addMedia.pollPreview.style.height = 'auto';
        elfocus('create_poll_question' + lnkId);
      });
    },
    incPoll: function() {
      var answers = ge('create_poll_answers' + lnkId), l = answers.childNodes.length;
      if (l < 10) {
        elfocus(geByTag1('input', answers.appendChild(ce('div', {
          className: 'medadd_c_polla_wr',
          innerHTML: rs(cur.pollAnswerTemplate, {attrs: '', lnkid: lnkId})
        }))));
      }
      toggle('create_poll_add' + lnkId, l < 9);
    },
    decPoll: function(el) {
      if (el.tt && el.tt.el) el.tt.destroy();
      re(domPN(el));
      show('create_poll_add' + lnkId);
    },
    keyPoll: function(el, ev) {
      ev = ev || window.event;
      if (ev && (ev.keyCode == 10 || ev.keyCode == 13 || ev.keyCode == 9)) {
        var q = hasClass(el, 'medadd_c_pollq'), s = ev.shiftKey;
        if (s && q) return;
        var n = q ? domFC(domNS(domNS(el))) : (s ? domPS : domNS)(domPN(el));
        if (n) {
          elfocus(geByTag1('input', n));
        } else if (s) {
          elfocus(geByClass1('medadd_c_pollq', domPN(domPN(domPN(el)))));
        } else {
          this.incPoll();
        }
        return cancelEvent(ev);
      } else {
        addMedia.changedPoll();
      }
    },
    changedPoll: function() {
      opts.onMediaChange && opts.onMediaChange();
    },
    pollData: function(silentCheck) {
      var answers = ge('create_poll_answers' + lnkId), q = trim(val('create_poll_question' + lnkId)), a;
      var result = {media: q, anonymous: isChecked('create_poll_anonymous' + lnkId)}, ind = 0, found = false;
      for (var el = domFC(answers); el; el = domNS(el)) {
        a = trim(val(domFC(el)));
        if (a) {
          var id = -intval((domFC(el).id.match(/^create_poll_ans(\d+)$/) || [0, -(ind++)])[1]); // -id or ind
          result['answers[' + id + ']'] = a;
          found = true;
        }
      }
      if (!q) {
        if (silentCheck !== true) {
          notaBene('create_poll_question' + lnkId);
        }
        return false;
      }
      if (!found) {
        if (!domFC(answers)) cur.addMedia[lnkId].incPoll();
        if (silentCheck !== true) {
          notaBene(domFC(domFC(answers)));
        }
        return false;
      }
      return result;
    },

    // Inline Share
    urlsCancelled: [],
    shareData: {},
    checkMessageURLs: function(message, inactive) {
      if (addMedia.chosenMedia || addMedia.urlAttachmentLoading && addMedia.urlAttachmentLoading[0] > vkNow() - 10000 || addMedia.attachCount() >= limit) {
        return;
      }
      if (cur.reply_to && cur.reply_to[0]) { // prevent urls in club name from parsing
        var reply_name = Wall.getReplyName(cur.reply_to[0]);
        if (reply_name && isArray(reply_name) && reply_name[1]) {
          reply_name = reply_name[1];
        }
        if (reply_name) {
          var urls_in_name = extractUrls(reply_name, inactive);
          for (var i in urls_in_name) {
            var url = urls_in_name[i].url;
            if (!url.match(/^https?:\/\//)) {
              url = 'http://' + url;
            }
            if (!inArray(url, addMedia.urlsCancelled)) {
              addMedia.urlsCancelled.push(url);
            }
          }
        }
      }

      var urls = extractUrls(message, inactive);
      for (var i in urls) {
        var urlInfo = urls[i];
        var url = urlInfo['url'],
          query = urlInfo['query'],
          domain = urlInfo['domain'],
          initialUrl = url;

        if (!url.match(/^https?:\/\//)) {
          url = 'http://' + url;
        }
        if (inArray(url, addMedia.urlsCancelled) || inArray(initialUrl, addMedia.urlsCancelled)) {
          continue;
        }
        var valid = true;
        if (domain.match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/)) {
          valid = query.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video)|w=(page|product))(-?\d+_)?\d+|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|^\/vk2016+$|^http:\/\/instagram\.com\/p\/.+/) ? true : false;
        }
        if (valid) {
          addMedia.checkURL(initialUrl);
          return;
        }
      }
    },
    onCheckURLDone: function(result, data) {
      var url = '';
      if (addMedia.urlAttachmentLoading) {
        re(addMedia.urlAttachmentLoading[2]);
        if (multi) {
          toggle(progressEl, progressEl.childNodes > 0);
        } else {
          toggleClass(previewEl, 'med_no_attach', !previewEl.childNodes);
        }
        url = addMedia.urlAttachmentLoading[1];
        addMedia.urlAttachmentLoading = false;
        setStyle(bodyNode, {cursor: 'default'});
      }
      if (result) {
        addMedia.chooseMedia(data[0], data[1], data[2], url, true);
      } else if (opts.onCheckURLDone) {
        opts.onCheckURLDone(result, data);
      }
    },
    checkURL: function(url) {
      if (!url) return;
      addMedia.urlsCancelled.push(url);
      addMedia.urlAttachmentLoading = [vkNow(), url];

      re(addMedia.checkURLForm);
      addMedia.checkURLForm = ce('div', {innerHTML: '<iframe name="share_parse_iframe' + lnkId + '"></iframe>'});
      utilsNode.appendChild(addMedia.checkURLForm);
      var parseForm = addMedia.checkURLForm.appendChild(ce('form', {
        action: 'share.php?act=url_attachment',
        method: 'post',
        target: 'share_parse_iframe' + lnkId
      }));

      each({
        hash   : cur.share_timehash || cur.options.share.timehash || '',
        index  : lnkId,
        url    : url,
        to_mail: opts.mail ? 1 : ''
      }, function(i, v) {
        parseForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });

      // var progress = ce('div', {className: 'share_parse_progress progress'});
      // progressEl.appendChild(progress);
      // show(progressEl);
      // addMedia.urlAttachmentLoading.push(progress);
      setStyle(bodyNode, {cursor: 'wait'});

      window.onUploadDone = addMedia.onCheckURLDone.pbind(true);
      window.onUploadFail = addMedia.onCheckURLDone.pbind(false);

      parseForm.submit();
    },
    addPreview: function(progress) {
      return (addMedia.sharePreview = ldocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_link', innerHTML: '\
<div class="medadd_c_linkcon"><div></div>' + (progress ? '<div class="progress medadd_c_linkprg"></div>' : '') + '</div>'})));
    },
    shareImgUrl: function(index) {
      var data = addMedia.shareData;
      if (data.images_proxy && data.images_proxy[index]) {
        return data.images_proxy_url + data.images_proxy[index];
      }

      if (data.images) {
        var imgUrl = data.images[index];
        if (isArray(imgUrl)) {
          if (imgUrl[0]) {
            imgUrl = imgUrl[0];
          } else {
            imgUrl = '';
          }
        }
        return imgUrl;
      } else {
        return '';
      }
    },
    showPreview: function(fast) {
      var data = addMedia.shareData,
          prev = addMedia.sharePreview || addMedia.addPreview(), image, bigLinkClass;

      if (data.images) {
        image = data.images[cur.shareShowImg];
        bigLinkClass = addMedia.bigLink || data.big_link || (image && isArray(image) && image[0]) ? 'medadd_c_linkimg_big' : '';
      }

      if (data.failed) {
        var html = getLang('page_not_loaded');
      } else {
        var onloadStr = fast ? '' : 'onload="if (this.width < 130 && !cur.onLoadSwitched) {cur.onLoadSwitched=1;setTimeout(cur.shareShowNext, 0);}"';
        var imghtml = '';
        var imgUrl = clean(addMedia.shareImgUrl(cur.shareShowImg));

        if (data.images && data.images[cur.shareShowImg] && imgUrl) {
          var curImage = data.images[cur.shareShowImg];

          var style = bigLinkClass ? 'style="width: 100%"' : (data.imagesStyles && data.imagesStyles[cur.shareShowImg] || '');
          imghtml = '<img class="medadd_c_linkimg" src="' + imgUrl + '" ' + onloadStr + ' ' + style + ' />';
          imghtml += bigLinkClass ? Page.buildMediaLinkEl(data.domain) : '';

          if (data.images.length > 0) {
            var leftScroller = ((data.images.length > 1) ? ('<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_left ' + ((cur.shareShowImg == 0) ? 'medadd_c_linkimg_scroll_wrap_left_first' : '') + '" onclick="'+((cur.shareShowImg == 0) ? 'Page.ownerPhoto(\''+data.media+'\');' : 'cur.shareShowNext(true);')+'"><div class="medadd_c_linkimg_scroll"></div></div>') : '');
            var rightScroller = '';
            var closeButton = '';
            if (cur.shareShowImg < (data.images.length - 1)) {
              rightScroller = '<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_right" onclick="cur.shareShowNext();"><div class="medadd_c_linkimg_scroll"></div></div>';
            } else if ((cur.shareShowImg == (data.images.length - 1)) && isArray(curImage) && !!curImage[0]) {
              rightScroller = '';
              //closeButton = '<div class="medadd_c_linkimg_scroll_wrap_close" onclick="cur.shareClearOwnPhoto();"></div>';
            }

            var hasOwnPhoto = isArray(data.images[data.images.length - 1]) && !!data.images[data.images.length - 1][0];
            var availableImagesCount = data.uniqueImagesCount + intval(hasOwnPhoto);

            var uploadTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_choose_own_photo') + '\', black: 1, shift: [7, 1, 0]})"';
            var removeTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_remove_photo') + '\', black: 1, shift: [7, 1, 0]})"';

            var imgControls = (!data.media || data.media === '_') ? '' : '<div class="medadd_c_linkimg_controls">' +
                              '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_l">' +
                              (availableImagesCount > 1 ?
                              '    <div class="medadd_c_linkimg_controls_btn_arrows_group">' +
                              '      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_left" onclick="cur.shareShowNext(true);"></div>' +
                              '      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_right" onclick="cur.shareShowNext();"></div>' +
                              '    </div>' : ''
                              ) +
                              '    <div class="medadd_c_linkimg_controls_btn ' + (availableImagesCount > 1 ? 'medadd_c_btn_side_padd' : '') + '" id="medadd_ctrl_upload" ' + uploadTooltip + ' onclick="Page.ownerPhoto(\''+data.media+'\');"></div>'+
                              '  </div>' +
                              '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_r">' +
                              '    <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_remove" ' + removeTooltip + ' onclick="tooltips.hide(this);cur.removeLinkImage(this)"></div>' +
                              '  </div>' +
                              '</div>';

            var containerImageStyle = image ? '' : 'display: none';

            imghtml =
              '<div class="medadd_c_linkimg_container fl_l" style="' + containerImageStyle + '">' +
                imghtml +
                imgControls +
                closeButton +
                '<div id="medadd_c_linkimg_loader" class="medadd_c_linkimg_loader"></div>' +
              '</div>'
            ;
          }
        }
        var microdata = '';
        if (data.microdata) {
          if (data.microdata_preview_html) {
            microdata = data.microdata_preview_html;
          }
        }
        var description = (cur.wallPageWide ? data.description_short : data.description_short_narrow ) || data.description;
        var html =
          imghtml +
          (data.title ? '<h4 class="medadd_c_linkhead">' + data.title + '</h4>' : '') +
          (!bigLinkClass && data.domain ? '<div class="page_media_link_addr">' + data.domain + '</div>' : '') +
          //(data.domain ? '<div class="medadd_c_linkdomain">' + data.domain + '</div>' : '') +
          (microdata ? '<div class="medadd_c_linkmicrodata">' + microdata + '</div>' : '') +
          (description ? '<div class="medadd_c_linkdsc">' + description + '</div>' : '') +
          '<div class="clear"></div>';
      }

      if (fast) {
        if (cur.preventShareAnim) {
          cur.preventShareAnim.stop();
        }
        val(domFC(prev), html);
        domFC(prev).style.height = 'auto';
        shortCurrency();
      } else {
        var hidden = !isVisible(ldocsEl);
        show(ldocsEl);
        var tmpDiv = ge(previewId).appendChild(ce('div', {
          innerHTML: '<div class="medadd_c_linkcon ' + bigLinkClass + '">' + html + '</div>'
        }, {
          position: 'absolute',
          width: getSize(prev)[0] - 10,
          visibility: 'hidden'
        }));
        var height = getSize(tmpDiv)[1];
        re(tmpDiv);

        val(domFC(prev), html);
        shortCurrency();

        cur.preventShareAnim = animate(domFC(prev), {height: height}, 200);

        re(geByClass1('medadd_c_linkprg', ldocsEl));
      }

      if (bigLinkClass) {
        addClass(geByClass1('medadd_c_linkcon', ldocsEl), bigLinkClass);
      }
    },
    showExternalPreview: function () {
      var data = addMedia.shareData;
      if (!data.images) {
        data.images = [];
      }

      var _unique = [], _uniqueProxies = [], _uniqueMap = {};
      each(data.images, function(i, im) {
        if (!_uniqueMap[im]) {
          _uniqueMap[im] = true;
          _unique.push(im);
          if (data.images_proxy) {
            _uniqueProxies.push(data.images_proxy[i]);
          }
        }
      });
      data.uniqueImagesCount = _unique.length;
      data.images = _unique;
      data.images_proxy = _uniqueProxies;

      data.images.push([]); // holder for own photo

      if (!data.images || !data.images.length) {
        cur.shareShowImg = 0;
        addMedia.showPreview();
        return;
      } else {
        cur.shareShowImg = -1;
        addMedia.addPreview(true);
      }
      data.imagesStyles = {};
      var fast = false;


      cur.shareSetOwnPhoto = function (res) {
        if (curBox()) curBox().hide();
        addMedia.bigLink = true;
        data.images[data.images.length-1] = [res.photo_url, res.user_id, res.photo_id];
        cur.shareShowNext(0, 1);
      }

      cur.shareClearOwnPhoto = function () {
        data.images[data.images.length-1] = [];
        cur.shareShowNext(0, 0, 1);
      }

      cur.removeLinkImage = function(removeBtn) {
        var linkWrap = gpeByClass('medadd_c_linkcon', removeBtn);
        re(gpeByClass('medadd_c_linkimg_container', removeBtn));
        setStyle(linkWrap, 'height', '');

        addMedia.shareData.noPhoto = true;
      }

      cur.shareShowNext = function (previous, last, current) {
        var tmpImg = vkImage();

        cur.prevShareShowDir = previous;

        if (current) {
          // nothing
        } else if (last) {
          cur.shareShowImg = data.images.length - 1;
        } else if (previous) {
          cur.shareShowImg -= 1;
        } else {
          cur.shareShowImg += 1;
        }

        var hasOwnPhoto = isArray(data.images[data.images.length - 1]) && !!data.images[data.images.length - 1][0];

        if (!hasOwnPhoto && cur.shareShowImg > data.images.length - 2) {
          cur.shareShowImg = 0;
        } else if (cur.shareShowImg > data.images.length - 1) {
          cur.shareShowImg = 0;
        } else if (!hasOwnPhoto && cur.shareShowImg < 0) {
          cur.shareShowImg = data.images.length - 2;
        } else if (cur.shareShowImg < 0) {
          cur.shareShowImg = data.images.length - 1;
        } else if (cur.shareShowImg == 0) {
          for (var i = 1; i < data.images.length - 1; i++) {
            var t = vkImage();
            t.src = addMedia.shareImgUrl(i);
          }
        }
        if (!data.images.length || isEmpty(data.images) || data.images[cur.shareShowImg] === undefined) {
          addMedia.showPreview(fast);
          fast = true;
          return;
        }
        var tmpImgSrc = addMedia.shareImgUrl(cur.shareShowImg);
        if (tmpImgSrc) {
          tmpImg.src = tmpImgSrc;
        }
        if (isArray(data.images[cur.shareShowImg]) && data.images[cur.shareShowImg][1] && data.images[cur.shareShowImg][2]) {
          data.user_id = data.images[cur.shareShowImg][1];
          data.photo_id = data.images[cur.shareShowImg][2];
          data.share_own_image = true;
        } else {
          data.user_id = undefined;
          data.photo_id = undefined;
          data.share_own_image = false;
        }

        var imgLoadTimeout = null;

        if (tmpImgSrc) {
          imgLoadTimeout = setTimeout(function() {
            if (cur.shareImgInterval === true) return;
            if (isArray(data.images[cur.shareShowImg])) return;
            data.images.splice(cur.shareShowImg, 1);
            if (data.images_proxy && data.images_proxy.length > cur.shareShowImg) {
              data.images_proxy.splice(cur.shareShowImg, 1);
            }
            cur.shareShowNext();
          }, 5000);
        }

        var showLoaderTimeout = setTimeout(function () {
          show('medadd_c_linkimg_loader');
          showLoaderTimeout = null;
        }, 100);

        var updatePreview = function() {
          if (tmpImg.width || tmpImg.height || !tmpImgSrc) {
            var w = tmpImg.width, h = tmpImg.height;
            var imgStyle = '';
            var imgParams = '';
            if (imgLoadTimeout) {
              clearTimeout(imgLoadTimeout);
              imgLoadTimeout = null;
            }
            if (showLoaderTimeout) {
              clearTimeout(showLoaderTimeout);
              showLoaderTimeout = null;
            }
            hide('medadd_c_linkimg_loader');
            clearInterval(cur.shareImgInterval);
            if (!isArray(data.images[cur.shareShowImg]) && (w < 20 || h < 20)) {
              data.images.splice(cur.shareShowImg, 1);
              if (data.images_proxy && data.images_proxy.length > cur.shareShowImg) {
                data.images_proxy.splice(cur.shareShowImg, 1);
              }
              if (data.images.length) {
                return setTimeout(cur.shareShowNext.pbind(0, 0, 1), 0);
              }
            } else {
              var bigLink = (w >= 537 && h >= 240);

              if (!bigLink && addMedia.bigLink && (cur.shareShowImg != data.images.length - 1)) {
                data.images.splice(cur.shareShowImg, 1);
                data.images_proxy.splice(cur.shareShowImg, 1);
                if (!cur.prevShareShowDir) cur.shareShowImg --;
                cur.shareShowNext(cur.prevShareShowDir);
                return;
              }

              addMedia.bigLink = addMedia.bigLink || bigLink;

              if (w > 150) {
                h = 150 * h / w;
                w = 150;
              }
              var hHalf = (Math.round(h / 2));
              var wHalf = (Math.round(w / 2));
              var marginTop = (bigLink && (h > 150)) ? -Math.round(67/2) : -hHalf;

              var marginLeft = (w > 150) ? -Math.round(150/2) : -wHalf;
              //imgStyle = 'width: ' + w + 'px; height: ' + h + 'px; margin-top: ' + marginTop + 'px; margin-left: ' + marginLeft + 'px;';
              imgStyle = 'width: ' + w + 'px; height: ' + h + 'px;';

              if (bigLink) {
                imgStyle = 'width: 100%;';
              }
            }
            if (data.images.length > 1) {
              imgParams = '';
            }
            data.imagesStyles[cur.shareShowImg] = 'style="' + imgStyle + '"' + imgParams;
            addMedia.showPreview(fast);
            fast = true;
          }
        }
        clearInterval(cur.shareImgInterval);
        cur.shareImgInterval = setInterval(updatePreview, 300);
        setTimeout(updatePreview, 0);
      }
      cur.shareShowNext();
    },
    uploadShare: function(callback) {
      var data = addMedia.shareData, prev = addMedia.sharePreview;
      var uploadCont = prev.appendChild(ce('div', {innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + lnkId + '"></iframe>'})),
          uploadForm = uploadCont.appendChild(ce('form', {action: '/share.php', method: 'post', target: 'share_upload_iframe' + lnkId})),
          photoUrl = data.images[cur.shareShowImg];
      each({
        act: 'a_photo',
        url: data.url,
        index: lnkId,
        image: photoUrl,
        extra: data.extra || 0,
        hash: vk.ip_h
      }, function (i, v) {
        uploadForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });
      window.onUploadDone = function(index, params) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData = extend(addMedia.shareData, {
          user_id: params.user_id,
          photo_id: params.photo_id,
          photo_url: photoUrl,
          images: []
        });
        setTimeout(callback, 0);
      };
      window.onUploadFail = function(index, msg) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData.images = [];
        setTimeout(callback, 0);
      };
      cur.shareLastParseSubmitted = vkNow();
      uploadForm.submit();
    },

    setupPostpone: function(data, export_row) {
      var toEl;
      if (!multi && !ppdocsEl) {
        toEl = domPN(geByClass1('page_preview_postpone_wrap', previewEl));
      } else {
        toEl = ppdocsEl;
      }
      var ed = (cur.editingPost && domPN(toEl).id == 'wpe_media_preview'), h = (browser.msie6 || ed || !multi) ? '' : '1px', addedhtml = false;
      var html = '<div class="clear_fix">\
<div class="fl_l"><input type="hidden" id="postpone_date' + lnkId + '" value="' + (data.date || '') + '" /></div>\
<div class="fl_l medadd_c_timerat">' + data.lang.profile_wall_postpone_at + '</div>\
<div class="fl_l"><input type="hidden" id="postpone_time' + lnkId + '"/></div></div>';
      if (cur.editingPost && data.friends_only != undefined) {
        html += '<div class="medadd_c_timersett">';
        if (data.status_export != undefined) {
          html += '<div class="checkbox_status_export' + (data.status_export ? ' on' : '') + ' fl_l" id="status_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_twitter + '\', black: 1, shift: [12,4,0]});"><div></div></div>';
        }
        if (data.facebook_export != undefined) {
          html += '<div class="checkbox_facebook_export' + (data.facebook_export ? ' on' : '') + ' fl_l" id="facebook_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_facebook + '\', black: 1, shift: [12,4,0]});"><div></div></div>';
        }
        html += '<div class="checkbox' + (data.friends_only ? ' on' : '') + ' fl_l" id="friends_only' + lnkId + '" onclick="checkbox(this);checkbox(\'status_export' + lnkId + '\',!isChecked(this));checkbox(\'facebook_export' + lnkId + '\',!isChecked(this));"><div></div>'+ data.lang.friends_only +'</div></div>';
        addedhtml = true;
      } else if (cur.editingPost && export_row) {
        html += export_row;
        addedhtml = true;
      }
      addMedia.postponePreview = toEl.appendChild(ce('div', {className: 'medadd_c medadd_c_timer clear_fix' + (addedhtml ? ' medadd_c_nofixed' : ''), innerHTML: html}));
      addMedia.postponePreview.style.height = h;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'datepicker.css', 'datepicker.js'], function() {
        new Datepicker('postpone_date' + lnkId, {time: 'postpone_time' + lnkId, width: 120, noPast: true, onUpdate: opts.onMediaChange});
        if (!browser.msie6 && !ed && multi) {
          animate(addMedia.postponePreview, {height: 33}, 200, function() {
            addMedia.postponePreview.style.height = '';
          });
        }
      });
    },

    destroy: function() {
      if ((docsEl || {}).sorter) {
        docsEl.sorter.destroy();
      }
      if ((dpicsEl || {}).qsorter) {
        dpicsEl.qsorter.destroy();
      }
    },
    qsorterOpts: function() {
      return {
        xsize: Math.floor(dpicsEl.offsetWidth / 110),
        width: 110,
        height: 83,
        onReorder: opts.onAddMediaChange,
        clsUp: 'pam_dpic_up'
      };
    },
    resized: function() {
      if (window.ThumbsEdit) {
        ThumbsEdit.setWide('thumbs_edit' + cur.wallEditComposer.addMedia.lnkId);
      }
      if (dpicsEl.qsorter) {
        dpicsEl.qsorter.destroy();
        qsorter.init(dpicsEl, addMedia.qsorterOpts());
      }
    }
  }

  if (!cur.addMedia) {
    cur.addMedia = {};
  }

  cur.addMedia[lnkId] = addMedia;
  if (opts.onAddMediaChange) addMedia.onChange = opts.onAddMediaChange;
  return addMedia;
};

Composer = {
  init: function (el, options) {
    if (!(el = ge(el))) {
      return null;
    }

    var composer = data(el, 'composer');
    if (composer) {
      return composer;
    }
    composer = {
      input: el,
      inited: false,
      options: options
    };

    data(el, 'composer', composer);

    el.parentNode.insertBefore(
      composer.wddWrap = ce('div', {
        className: 'composer_wdd clear_fix ' + (options.wddClass || ''),
        id: el.id + '_composer_wdd',
        innerHTML: '<input type="hidden" id="' + el.id + '_composer_wdd_term"/>'
      }, {
        width: options.width || getSize(el)[0]
      }),
      el.nextSibling
    );

    composer.wddInput = composer.wddWrap.firstChild;
    composer.wdd = WideDropdown.initSelect(composer.wddWrap, extend({
      text: composer.wddInput,
      input: el,
      url: 'hints.php',
      params: {act: 'a_json_friends', from: 'composer'},
      noResult: options.lang.noResult || '',
      introText: options.lang.introText || '',
      onItemSelect: Composer.onItemSelect.bind(Composer).pbind(composer)
    }, options.wddOpts || {}));

    el.dd = composer.wddWrap.id;

    Composer.initEvents(composer);

    if (options.media) {
      composer.addMedia = initAddMedia(options.media.lnk, options.media.preview, options.media.types, options.media.options);
    }

    setStyle(composer.wddWrap, 'width', '');

    composer.inited = true;

    return composer;
  },
  initEvents: function (composer) {
    addEvent(composer.input, 'keyup keydown keypress', Composer.onKeyEvent.pbind(composer));
    addEvent(composer.input, 'click mousedown mouseup focus blur paste', Composer.onMouseEvent.pbind(composer));
  },
  destroy: function (composer) {
    WideDropdown.deinit(composer.wddWrap);
    cleanElems(composer.input, composer.wddWrap);
    re(composer.wddWrap);
    composer.inited = false;
    if (composer.addMedia) composer.addMedia.destroy();
    data(composer.input, 'composer', null);
  },

  onKeyEvent: function (composer, event) {
    var controlEvent = composer.wdd && inArray(event.keyCode, [KEY.UP, KEY.DOWN, KEY.RETURN]);
    if (event.type == 'keypress' || event.type == 'keydown') {
      if (event.keyCode == KEY.RETURN || event.keyCode == 10) {
        if (!composer.select || !composer.select.isVisible()) {
          if (event.ctrlKey && isFunction(composer.options.onSubmit)) {
            // composer.input.blur();
            // composer.options.onSubmit();
            return true;
          }
        } else {
          triggerEvent(document, event.type, event);
          return cancelEvent(event);
        }
      }
      if (event.keyCode == KEY.TAB) {
        var input = composer.input,
            value = window.Emoji ? Emoji.editableVal(input) : '',
            curPos = Composer.getCursorPosition(input);
            curValue = value.substr(0, curPos) + "\001" + value.substr(curPos),
            matches = curValue.match(/^[\s\S]*(@|\*)[\S]+\s*\([\s\S]*?\001[\s\S]*?\)\s*/);

        if (matches) {
          var pos = matches[0].length - 1;
          elfocus(composer.input, pos, pos);
          return cancelEvent(event);
        }
      }
      var cnt = 0;
      for (var i in composer.wdd.shown) {
        cnt += 1;
      }
      if (controlEvent && isVisible(composer.wdd.listWrap) && cnt) {
        if (event.type == (browser.opera ? 'keypress' : 'keydown')) {
          WideDropdown._textEvent(event);
        }
        return cancelEvent(event);
      }
    }

    if (event.type == 'keyup' && !controlEvent) {
      if (event.keyCode == 65 && event.ctrlKey) { // fix Ctrl+A
        return;
      }
      if (composer.wdd && inArray(event.keyCode, [KEY.SPACE, KEY.HOME, 190, 191, 78, 55, 49])) {
        Composer.hideSelectList(composer);
      }
      Composer.updateAutoComplete(composer, event);
    }
  },
  onMouseEvent: function (composer, event) {
    if (event.type == 'blur') {
      Composer.hideSelectList(composer);
      return;
    }
    if (event.type == 'focus' || event.type == 'click') {
      Composer.updateAutoComplete(composer, event);
    }
    if (event.type == 'paste') {
      setTimeout(Composer.updateAutoComplete.pbind(composer, event), 0);
    }
  },
  updateAutoComplete: function (composer, event) {
    var input = composer.input,
        value = window.Emoji ? Emoji.editableVal(input) : val(input);


    //curPos = Composer.getCursorPosition(input),
    //prefValue = value.substr(0, curPos),
    var prefValue = value;
    var pos = Math.max(prefValue.lastIndexOf('@'), prefValue.lastIndexOf('*')),
        term = pos > -1 ? prefValue.substr(pos + 1) : false;

    if (term && term.match(/&nbsp;|[,\.\(\)\?\!\s\n \u00A0]|\#/)) {
      term = false;
    }
    composer.curValue = value;
    composer.curTerm = term;
    composer.curPos = pos;
    val(composer.wddInput, term);
    Composer.toggleSelectList(composer);

    if (event.type == 'keyup' || event.type == 'paste') {
      if (composer.options.onValueChange) {
        composer.options.onValueChange(prefValue, event.type != 'keyup');
      }
      if (composer.addMedia) {
        composer.addMedia.checkMessageURLs(prefValue, event.type != 'keyup');
      }
      if (composer.options.checkLen) {
        composer.options.checkLen(value);
      }
    }
  },
  toggleSelectList: function (composer) {
    var term = composer.curTerm;
    if (term === false) {
      Composer.hideSelectList(composer);
    } else {
      Composer.showSelectList(composer, term);
    }
  },
  hideSelectList: function (composer) {
    composer.wddInput.focused = false;
    WideDropdown._hideList(composer.wdd);
  },
  showSelectList: function (composer, term) {
    composer.wddInput.focused = true;
    WideDropdown.items(composer.wdd.id, cur.wallMentions || []);
    WideDropdown._updateList(composer.wdd, false, term);
  },
  onItemSelect: function (composer, item) {
    if (!item) {
      return false;
    }

    var mention = item[2].replace('@', ''),
        alias = item[1],
        prefValue = composer.curValue.substr(0, composer.curPos),
        suffValue = composer.curValue.substr(composer.curPos),
        aliasStartPos, aliasEndPos;

    if (!mention) {
      if (itemId > 0) {
        mention = 'id' + itemId;
      } else {
        mention = 'club' + Math.abs(itemId);
      }
    }

    var noAlias = prefValue.match(/\#[\w_\.\u0400-\u04FF]+$/i) ? true : false;

    var isEmoji = (window.Emoji && composer.input.emojiId !== undefined);
    if (!isEmoji) {
      alias = replaceEntities(alias);
    }

    cur.selNum = (cur.selNum || 0) + 1;
    suffValue = suffValue.replace(/^(@|\*)[^\s]*(?:\s+\((?:(.*?)\))?\s*)?/, function (whole, asterisk, prevAlias) {
      var replacement = asterisk + mention + ' ';
      if (noAlias) {
        aliasStartPos = aliasEndPos = replacement.length;
      } else {
        replacement += '('+(isEmoji ? '<span id="tmp_sel_'+cur.selNum+'">' : '');
        aliasStartPos = replacement.length;
        replacement += alias.replace(/[\(\)\]\[]/g, '');
        aliasEndPos = replacement.length;
        replacement += (isEmoji ? '</span>' : '')+') ';
      }

      return replacement;
    });

    aliasStartPos += composer.curPos;
    aliasEndPos += composer.curPos;

    Composer.hideSelectList(composer);
    if (isEmoji) {
      Emoji.val(composer.input, clean(prefValue) + suffValue);
      Emoji.focus(composer.input);
      Emoji.editableFocus(composer.input, ge('tmp_sel_'+cur.selNum), false, true)
    } else {
      val(composer.input, prefValue + suffValue);
      elfocus(composer.input, aliasStartPos, aliasEndPos);
    }
    return false;
  },
  getCursorPosition: function (node) {
    if (node.selectionStart) {
      return node.selectionStart;
    } else if (!document.selection) {
      return 0;
    }

    var c = "\001",
        sel = document.selection.createRange(),
        txt = sel.text,
        dup = sel.duplicate(),
        len = 0;

    try {
      dup.moveToElementText(node);
    } catch(e) {
      return 0;
    }
    sel.text  = txt + c;
    len = (dup.text.indexOf(c));
    sel.moveStart('character',-1);
    sel.text  = '';
    if (browser.msie && len == -1) {
      return node.value.length;
    }
    return len;
  },
  getSendParams: function(composer, delayedCallback, silentCheck) {
    var addMedia = composer.addMedia || {},
        media = addMedia.chosenMedia || {},
        medias = (addMedia && addMedia.getMedias) ? addMedia.getMedias() : [],
        share = (addMedia.shareData || {}),
        limit = composer && composer.options.media && composer.options.media.options.limit || 0;


      var input = composer.input;
      var message = trim(window.Emoji ? Emoji.editableVal(input) : val(input));
      var params = {message: message};
      var attachI = 0;

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    setStyle(bodyNode, {cursor: 'default'});

    if (medias.length) {
      var delayed = false;
      each (medias, function (k, v) {
        if (!isArray(v) || !v.length) {
          return;
        }
        var type = this[0],
            attachVal = this[1];
        if (attachI >= limit && type != 'postpone') {
          return false;
        }

        switch (type) {
          case 'poll':
            var poll = addMedia.pollData(silentCheck);
            if (!poll) {
              params.delayed = true;
              return false;
            }
            if (intval(attachVal)) {
              params.poll_id = intval(attachVal);
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
            break;

          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                params.delayed = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = share.user_id + '_' + share.photo_id;
            if (share.images && share.images.length && !silentCheck) {
              addMedia.uploadShare(delayedCallback);
              params.delayed = true;
              return false;
            }
            if (share.initialPattern && (trim(message) == share.initialPattern)) {
              params.message = '';
            }
            extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(message) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
            return;
        }
        if (this[3] && trim(message) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
    }
    if (!addMedia.multi && !params.postpone && addMedia.postponePreview) {
      params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
    }

    return params;
  },
  reset: function (composer) {
    var input = composer.input,
        value = val(input),
        media = composer.addMedia,
        state = {value: value};

    //val(input, '');
    if (window.Emoji) {
      Emoji.val(input, '');
    } else {
      input.innerHTML = '';
    }
    if (media) {
      state.urlsCancelled = clone(media.urlsCancelled);
      media.unchooseMedia();
      media.urlsCancelled = [];
    }

    return state;
  },
  restore: function (composer, prevState) {
    var input = composer.input,
        state = Composer.reset(composer);
    val(input, prevState.value || '');

    return state;
  }
}

if (!window._postsSendTimer) _postsSendTimer = setTimeout(Page.postsSend, 10000);

try{stManager.done('page.js');}catch(e){}
