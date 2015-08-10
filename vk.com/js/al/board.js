var Board = {
  createTopic: function(oid, hash) {
    var title = trim(val('bnt_title')), post = trim(val('bnt_text')), question, answers = [];
    var chosen = cur.boardNewMedia.chosenMedias || {}, media = [], types = [];
    for (var i = 0, l = chosen.length; i < l; ++i) {
      var m = chosen[i];
      if (m) {
        types.push(m[0]);
        media.push(m[1]);
      }
    }
    if (!title) return elfocus('bnt_title');
    if (!post && !media.length) return elfocus('bnt_text');
    if (cur.pollPreview) {
      question = trim(val('bnt_poll_question'));
      if (!question) {
        return elfocus('bnt_poll_question');
      }
      for (var el = ge('bnt_poll_answers').firstChild; el; el = el.nextSibling) {
        if (!isVisible(el)) break;
        var answer = trim(val(el));
        if (answer) {
          answers.push(answer);
        }
      }
      if (!answers.length) {
        return elfocus(ge('bnt_poll_answers').firstChild);
      }
    }

    globalHistoryDestroy('board' + (-oid));
    if (_tbLink && _tbLink.loc) {
      cur.__phinputs = cur.__phinputs || [];
      globalHistoryDestroy(_tbLink.loc);
    }
    ajax.post('al_board.php', {
      act: 'do_create',
      oid: oid,
      hash: hash,
      title: title,
      post: post,
      media_types: types,
      media: media,
      question: question,
      from_group: isChecked('bnt_from_group'),
      answers: answers
    }, {
      showProgress: lockButton.pbind(ge('bnt_subm')),
      hideProgress: unlockButton.pbind(ge('bnt_subm'))
    });
  },
  attachPoll: function() {
    var prev = ge('bnt_media_preview');
    cur.pollPreview = prev.parentNode.insertBefore(ce('div', {id: 'bnt_poll', innerHTML: '\
<div class="bnt_header">' + getLang('voting_topic') + '</div>\
<input type="text" class="text" id="bnt_poll_question" />\
<nobr class="no_select fl_r" onselectstart="return false;" ondblclick="return false;">\
  <a id="bnt_poll_add" onclick="Board.incPoll(\'bnt\')">' + getLang('voting_variants_add') + '</a><span class="sdivide">|</span><a id="bnt_poll_delete" class="bnt_disabled" onclick="Board.decPoll(\'bnt\')">' + getLang('voting_variants_del') + '</a>\
</nobr>\
<div class="bnt_header">' + getLang('voting_variants') + '</div>\
<div id="bnt_poll_answers"></div>\
    '}, {display: 'none'}), prev);
    Board.initAddPoll('bnt');
    slideDown(cur.pollPreview, 200, function() {
      show('bnt_cancel_poll');
      elfocus('bnt_poll_question');
    });
  },
  initAddPoll: function(prefix) {
    var html = [];
    for (var i = 0; i < 20; ++i) {
      html.push('<input type="text" class="text ' + prefix + '_poll_answer" style="' + (i > 1 ? 'display: none' : '') + '" />');
    }
    ge(prefix + '_poll_answers').innerHTML = html.join('');
  },
  cancelPoll: function() {
    hide('bnt_cancel_poll');
    slideUp(cur.pollPreview, 200, function() {
      re(cur.pollPreview);
      cur.pollPreview = false;
      show('bnt_attach');
    });
  },
  incPoll: function(prefix) {
    var answers = ge(prefix + '_poll_answers');
    for (var el = answers.firstChild; el; el = el.nextSibling) {
      if (!isVisible(el)) {
        break;
      }
    }
    if (el) {
      ge(prefix + '_poll_delete').className = '';
      show(el);
    }
    if (!el || !el.nextSibling) {
      ge(prefix + '_poll_add').className = prefix + '_disabled';
    }
  },
  decPoll: function(prefix) {
    var answers = ge(prefix + '_poll_answers'), first = answers.firstChild;
    for (var el = answers.lastChild; el; el = el.previousSibling) {
      if (isVisible(el)) {
        break;
      }
    }
    if (el) {
      if (el == first || el == first.nextSibling) {
        el = false;
      }
      if (el) {
        ge(prefix + '_poll_add').className = '';
        hide(el);
      }
    }
    if (!el || !el.previousSibling || el.previousSibling == first.nextSibling) {
      ge(prefix + '_poll_delete').className = prefix + '_disabled';
    }
  },

  scrollResize: function() {
    if (browser.mobile || cur.pvShown) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();
    var lnk = ge('blst_load_more');

    if (!isVisible(lnk)) return;
    if (st + ch > lnk.offsetTop) {
      Board.load();
    }
  },
  initScroll: function() {
    cur.module = 'board';

    Board.scrollnode = browser.msie6 ? pageNode : window;

    addEvent(Board.scrollnode, 'scroll', Board.scrollResize);
    addEvent(window, 'resize', Board.scrollResize);
    removeEvent(window, 'load', Board.initScroll);
    cur.destroy.push(Board.deinitScroll);
  },
  deinitScroll: function() {
    removeEvent(Board.scrollnode, 'scroll', Board.scrollResize);
    removeEvent(window, 'resize', Board.scrollResize);
  },
  loaded: function(off, rows) {
    cur.offset = off;

    var cont = ge('blst_cont'), d = ce('div', {innerHTML: rows});
    while (d.firstChild) {
      cont.appendChild(d.firstChild);
    }

    if (off >= cur.count || !rows) {
      hide('blst_load_more');
      return;
    }
    cur.loading = 1;
    var params = cur.query ? {act: 'search', q: cur.query} : {order: cur.order};
    ajax.post('/board' + cur.gid, extend(params, {offset: cur.offset, part: 1}), {cache: 1, onDone: function() {
      if (cur.loading == 2) {
        Board.loaded.apply(window, arguments);
      } else {
        cur.loading = false;
      }
    }, onFail: function() {
      cur.loading = 0;
      return true;
    }});
  },
  load: function() {
    if (!isVisible('blst_load_more') || isVisible('blst_more_progress')) return;
    if (cur.loading) {
      cur.loading = 2;
      return;
    }

    var params = cur.query ? {act: 'search', q: cur.query} : {order: cur.order};
    ajax.post('/board' + cur.gid, extend(params, {offset: cur.offset, part: 1}), {onDone: Board.loaded, onFail: function() {
      cur.loading = 0;
      return true;
    }, showProgress: function() {
      show('blst_more_progress');
      hide(ge('blst_load_more').firstChild);
    }, hideProgress: function() {
      show(ge('blst_load_more').firstChild);
      hide('blst_more_progress');
    }, cache: 1});
  },

  topicFieldUpdated: function() {
    var newt = window.Emoji ? Emoji.editableVal(cur.addField) : '', newh = getSize(cur.addBlock)[1];
    var ch = (cur.addBlockHeight != newh), ct = (cur.addText != newt);
    if (ch) {
      cur.addBlockHeight = newh;
      cur.addBlockWrap.style.height = newh + 'px';
    }
    if (ct) {
      cur.addText = newt;
    }
    if (ch || ct) {
      Board.topicOnScroll(false, false, true);
    }
  },
  topicOnProgress: function() {
    Board.topicFieldUpdated();
  },
  topicCheckAttach: function() {
    var img = geByClass1('photo', cur.addAttach);
    if (!img) return;
    if (img.width && img.height) {
      Board.topicFieldUpdated();
    } else {
      img.onload = Board.topicCheckAttach;
    }
  },
  topicAttachAdded: function() {
    Board.topicFieldUpdated();
    Board.topicCheckAttach();
  },
  topicAttachWillAdd: function() {
    setTimeout(Board.topicAttachAdded, 10);
    setTimeout(Board.topicAttachAdded, 100);
    setTimeout(Board.topicAttachAdded, 1000);
  },
  repliesCount: function() {
    var m = cur.addText.match(/\[post\d+\|[^\]]+\]/g), res = 0;
    for (var i in (m || {})) ++res;
    return res;
  },
  replyPost: function(post, mid) {
    if (browser.mobile && window.Emoji) {
      return Emoji.focus(cur.addField);
    }
    Board.topicOnScroll(false, false, true);
    var count = Board.repliesCount();
    if (count >= 10 && window.Emoji) {
      return setTimeout(Emoji.focus.pbind(cur.addField), 0);
    }
    var insert = cur.names[mid].replace('{post_id}', 'post' + post), pos;
    insert = insert.replace(/ $/, '&nbsp;');
    if (!window.Emoji) return false;
    elfocus(cur.addField);
    Emoji.insertHTML(insert);

    cur.addText = Emoji.editableVal(cur.addField);
  },
  privacyChanged: function(key) {
    if (key == 'voting_action') {
      Board.votingAction(key);
    } else if (key == 'topic_action') {
      Board.topicAction(key);
    }
  },
  topicAction: function(key) {
    ge('privacy_edit_topic_action').innerHTML = getLang('global_edit');
    var act = cur.privacy[key][0];
    cur.privacy[key] = [0, 0, []];
    if (act == 'edit') {
      showFastBox(getLang('board_edit_topic'), '\
<div class="bte_label fl_l">' + getLang('board_new_topic_title') + '</div>\
<div class="bte_labeled fl_l">\
  <input id="bte_title" class="text" type="text" onchange="curBox().changed = true;" onkeypress="if (event.keyCode == 10 || event.keyCode == 13) Board.saveTopic()" />\
</div><br class="clear">\
      ', getLang('global_save'), Board.saveTopic, getLang('global_cancel'));
      val('bte_title', winToUtf(val('bt_title')));
      elfocus('bte_title');
    } else if (act == 'voting') {
      showBox('al_board.php', {act: 'create_voting', topic: cur.topic});
    } else if (act == 'delete') {
      showFastBox(getLang('board_edit_topic'), '<div>' + getLang('board_sure_delete_topic') + '</div>', getLang('global_delete'), Board.deleteTopic, getLang('global_cancel'));
    } else if (act == 'open' || act == 'close') {
      ajax.post('al_board.php', {act: (act == 'open') ? 'open_topic' : 'close_topic', topic: cur.topic, hash: cur.hash, offset: nav.objLoc.offset}, {
        showProgress: function() {
          hide('privacy_edit_topic_action');
          show('edit_topic_prg');
        },
        hideProgress: function() {
          hide('edit_topic_prg');
          show('privacy_edit_topic_action');
        }
      });
    } else if (act == 'fix' || act == 'unfix') {
      var t = cur.topic;
      ajax.post('al_board.php', {act: (act == 'fix') ? 'fix_topic' : 'unfix_topic', topic: t, hash: cur.hash}, {
        onDone: function(text, priv) {
          if (cur.topic !== t) return;
          cur.privacy.topic_action_types = priv;
          var msg = ge('bt_msg');
          if (!msg) {
            msg = ge('content').insertBefore(ce('div', {id: 'bt_msg', className: 'msg'}), ge('bt_title').parentNode.nextSibling);
            re('bv_msg');
          }
          msg.innerHTML = text;
          msg.style.backgroundColor = '#F4EBBD';
          animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
        },
        showProgress: function() {
          hide('privacy_edit_topic_action');
          show('edit_topic_prg');
        },
        hideProgress: function() {
          hide('edit_topic_prg');
          show('privacy_edit_topic_action');
        }
      });
    }
  },
  saveTopic: function() {
    var newtitle = trim(val('bte_title'));
    if (!newtitle) {
      return elfocus('bte_title');
    }
    ajax.post('al_board.php', {act: 'save_topic', topic: cur.topic, hash: cur.hash, title: newtitle}, {onDone: function(text) {
      ge('bt_title').innerHTML = text;
      curBox().hide();
    }, progress: curBox().progress});
  },
  deleteTopic: function() {
    ajax.post('al_board.php', {act: 'delete_topic', topic: cur.topic, hash: cur.hash}, {progress: curBox().progress});
  },
  emojiShowTT: function(obj, ev) {
    if (cur.baEmoji === undefined) {
      return false;
    }
    return Emoji.ttShow(cur.baEmoji, obj, ev);
  },
  emojiHideTT: function(obj, ev) {
    if (cur.baEmoji === undefined) {
      return false;
    }
    return Emoji.ttHide(cur.baEmoji, obj, ev);
  },
  showEmojiTT: function(obj, ev) {
    if (cur.baEmoji === undefined) {
      return false;
    }
    return Emoji.ttClick(cur.baEmoji, obj, false, false, ev);
  },
  initTopic: function(opts, preload) {
    extend(cur, {
      module: 'board',

      docked: false,
      topic: opts.topic,
      owner: opts.owner,
      hash: opts.hash,
      postLimit: opts.limit,
      postTo: 'board' + (-opts.owner),

      names: opts.names,
      mediaTypes: opts.media,

      addField: ge('ba_text'),
      addBlock: ge('ba_post'),
      addAttach: ge('ba_media_preview'),
      addBlockWrap: ge('ba_post_wrap'),

      pgStart: opts.start,
      pgOffset: opts.offset,
      pgCount: opts.count,
      pgPerPage: opts.perpage,
      pgCont: ge('bt_rows'),
      pgMore: ge('bt_load_more'),
      pgPages: ge('bt_pages'),
      pgMorePrg: ge('bt_more_progress'),
      pgPreload: preload,
      pgUrl: opts.url,
      pgHref: opts.url + '?offset=',

      pgPostProcess: Board.loadedPosts,
      pgOnScroll: Board.topicOnScroll,
      pgNoArrowNav: Board.noArrowNav,

      onPrivacyChanged: Board.privacyChanged,
      updates: opts.updates,
      topicMyReplied: false,
      topicMyDeleted: {}
    });
    cur.privacy = extend(cur.privacy || {}, opts.privacy);
    Board.initUpdates();

    if (cur.addField) {
      cur.boardAddMedia = initAddMedia(ge('ba_add_media').firstChild, 'ba_media_preview', cur.mediaTypes, {
        limit: 10,
        editable: 1,
        sortable: 1,
        teWidth: 280,
        teHeight: 200
      });
      cur.boardAddMedia.onChange = Board.topicAttachWillAdd;
      cur.boardAddMedia.onProgress = Board.topicOnProgress;

      stManager.add(['emoji.js', 'notifier.css'], function() {
        cur.baEmoji = Emoji.init(cur.addField, {
          ttDiff: -48,
          rPointer: true,
          controlsCont: cur.addField.parentNode,
          onSend: function() {
            if (!isButtonLocked('ba_send_btn')) {
              Board.sendPost();
            }
          },
          noEnterSend: 1,
          checkEditable: Board.topicFieldUpdated,
          //sharedTT: cur.sharedIm,
          onStickerSend: function(stNum) {
            Board.sendPost(false, stNum);
          }
        });
        Board.topicFieldUpdated();
      });
    }

    Board.topicOnScroll(false, false, true);

    Pagination.init(opts.bottom);
    cur.destroy.push(Pagination.deinit);
    cur.destroy.push(removeEvent.pbind(window, 'keydown', Board.handleEditEsc));
  },
  initUpdates: function () {
    if (!cur.updates || !window.Notifier) {
      return
    }
    Board.checkUpdates();
    cur.updates.unread = 0;
    cur.updates.interval = setInterval(Board.checkUpdates, 20000);
    cur.destroy.push(function () {
      clearInterval(cur.updates.interval);
    });

    if (!isArray(cur.onUnidle)) {
      cur.onUnidle = [];
    }
    cur.onUnidle.push(function () {
      Board.updateTitle(true);
    });
  },
  checkUpdates: function () {
    if (!cur.updates || !cur.updates.queue) {
      return;
    }
    Notifier.addKey(cur.updates.queue, Board.checkedUpdates);
  },
  getAbsDate: function (ts) {
    var date = new Date(ts || vkNow()),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = '', numhours;
    if (cur.updates.time_system) {
      ampm = cur.updates.time_system[hours > 11 ? 1 : 0];
      hours = (hours % 12) || 12;
    }
    numhours = hours > 9 ? hours : ('0' + hours);
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    return cur.updates.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
  },
  checkedUpdates: function (key, data) {
    if (!cur.updates || !cur.updates.queue || cur.updates.queue.key != key) {
      return;
    }
    if (data.failed) {
      cur.updates.queue = false;
      return;
    }
    cur.updates.queue.ts = data.ts;
    if (!isArray(data.events) || !data.events.length) {
      return;
    }
    // debugLog('board updated', data);
    var count = false;
    each(data.events, function () {
      var ev = this.split('<!>'), evVer = ev[0], evType = ev[1],
          topicId = ev[2], postId = ev[4], el = ge('post' + postId);

      if (evVer != cur.updates.qversion) {
        location.reload();
        return false;
      }
      if (ev[3] > -1) count = ev[3];
      // debugLog(ev, count, evType);
      switch (evType) {
        case 'new_post':
          if (cur.topicMyReplied || el || cur.pgOffset < cur.pgCount) break;

          var data = {
            actions: '',
            owner_id: cur.owner,
            topic_raw: cur.topic,
            post_raw: postId,
            post_id: ev[5],
            post_uid: ev[6],
            name: ev[7],
            photo: ev[8],
            link: ev[9],
            text: ev[10],
            media: ev[11],
            date: Board.getAbsDate(),
            online: ''
          }, skin = cur.updates.skin, actions = '';
          if (vk.id) {
            if (vk.id == data.post_uid || cur.updates.admin_level > 0) {
              if (vk.id == data.post_uid || cur.updates.admin_level > 1) {
                actions += skin.sep + skin.act_edit;
              }
              actions += skin.sep + skin.act_delete;
            } else if (vk.id != data.post_uid) {
              actions += skin.sep + skin.act_report;
            }
            if (vk.id != data.post_uid) {
              actions += skin.sep + skin.act_reply;
            }
          }
          data.actions = actions;
          cur.names[data.post_uid] = ev[12];

          var newEl = se(rs(skin.post, data));
          ge('bt_rows').appendChild(newEl);
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000);

          cur.pgOffset++;
          cur.pgCount++;
          if (window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle) {
            cur.updates.unread++;
          }
          break;

        case 'del_post':
          if (cur.topicMyDeleted[ev[4]] || !el) break;
          hide(el);
          cur.pgOffset--;
          cur.pgCount--;
          break;

        case 'res_post':
          if (isVisible(el)) break;
          show(el);
          cur.pgOffset++;
          cur.pgCount++;
          break;
      }
    });
    if (count !== false) {
      val('bt_summary', count ? getLang('board_msgs_in_topic', count) : getLang('board_no_msgs_in_topic'));
      Pagination.pageReady(false);
      Board.topicOnScroll(false, false, true);
      Board.updateTitle();
    }
  },
  updateTitle: function (unidle) {
    if (!cur.updates) {
      return;
    }
    if (unidle) {
      cur.updates.unread = 0;
    }
    document.title = replaceEntities((cur.updates.unread ? '('+ cur.updates.unread + ') ' : '') + cur.updates.skin.title);
  },
  showPostField: function() {
    addClass(cur.addBlock, 'board_post_open');
    Board.topicFieldUpdated();
    Wall.initComposer(cur.addField, {
      lang: {
        introText: getLang('profile_mention_start_typing'),
        noResult: getLang('profile_mention_not_found')
      },
      wddOpts: {
        toup: 1
      }
    });
  },
  cancelAddPost: function(clear) {
    if (clear === true) {
      removeClass(cur.addBlock, 'board_post_open');
      if (window.Emoji) {
        Emoji.val(cur.addField, '');
      }
      cur.boardAddMedia.unchooseMedia();
      hide('bp_warn');
      Board.topicFieldUpdated();
    } else {
      cur.docked = false;
      removeClass(cur.addBlock, 'fixed');
      cur.boardAddMedia.menu.updateFixed(false);
    }
  },
  topicResetStyle: function() {
    cur.addBlock.style.left = '';
  },
  topicOnScroll: function(e, st, pp) {
    if (st === false || st === undefined) {
      st = scrollGetY();
    }
    if (!cur.addField) return;
    if (pp === true || cur.bEditingPost) {
      cur.addBlockTop = getXY(cur.addBlockWrap)[1];
      if (browser.msie6) cur.addBlockTop += st;
    }
    var needDock = (st + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight);
    if (needDock && !cur.docked) {
      addClass(cur.addBlock,'fixed');
      cur.boardAddMedia.menu.updateFixed(true);
      cur.docked = true;
    } else if (!needDock && cur.docked) {
      Board.cancelAddPost();
    }
    if (cur.docked && e && e.type == 'resize') {
      if (browser.msie6) {
        cur.addBlock.style.left = getXY(ge('content'))[0] + 'px';
      } else {
        cur.addBlock.style.left = (ge('page_layout').offsetLeft + ge('content').offsetLeft) + 'px';
        setTimeout(Board.topicResetStyle, 0);
      }
    }
  },
  loadedPosts: function(count, from, rows, offset, pages, preload, names) {
    Board.topicOnScroll(false, false, true);
    ge('bt_summary').innerHTML = count ? getLang('board_msgs_in_topic', count) : getLang('board_no_msgs_in_topic');
    if (preload) { // got new page
      Board.cancelEditPost();
    } else {
      names = offset;
    }
    extend(cur.names, names);
  },
  noArrowNav: function() {
    return cur.__focused || cur.bEditingPost;
  },
  scrollToEnd: function() {
    var st = cur.addBlockTop + cur.addBlockHeight + 20 - lastWindowHeight;
    if (scrollGetY() < st) {
      Pagination.setScroll(st);
    }
  },
  sendPost: function(ev, stickerId) {
    var prg = ge('ba_progress');
    if (isVisible(prg)) return;

    var value = window.Emoji ? trim(Emoji.editableVal(cur.addField)) : '',
        addmedia = cur.boardAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.boardAddMedia ? addmedia.getMedias() : [],
        params = {
      act: 'post_comment',
      topic: cur.topic,
      hash: cur.hash,
      comment: value,
      last: last,
      from_group: isChecked('ba_from_group')
    }, attachI = 0;

    if (stickerId) {
      params['attach1_type'] = 'sticker';
      params['attach1'] = stickerId;
      params.comment = '';
    } else {
      if (isArray(media) && media.length) {
        medias.push(clone(media));
      }

      if (medias.length) {
        each(medias, function(k, v) {
          if (!v) return;
          ++attachI;
          params['attach' + attachI + '_type'] = this[0];
          params['attach' + attachI] = this[1];
        });
      }
      if (!attachI && !value && window.Emoji) {
        return Emoji.focus(cur.addField);
      }
    }

    cur.topicMyReplied = true;
    var last = ((cur.pgCont.childNodes[cur.pgNodesCount - 1].id || '').match(/\d+$/) || [0])[0];
    ajax.post('al_board.php', params, {onDone: function(count, from, rows, offset, pages, preload) {
      cur.topicMyReplied = false;
      re('b_no_content');
      Pagination.loaded.apply(window, arguments);
      Board.cancelAddPost(!stickerId);
      if (window.Emoji) {
        Emoji.focus(cur.addField);
      }
      setTimeout(Board.scrollToEnd, 0);
      if (pages && offset) {
        nav.setLoc(extend(nav.objLoc, {offset: offset}));
      }
    }, progress: prg});
  },
  deleteReportPost: function(post, act) {
    post = cur.owner + '_' + post;
    var prg = geByClass1('bp_progress', ge('post' + post));
    if (isVisible(prg)) return;

    cur.topicMyDeleted[post] = 1;
    ajax.post('al_board.php', {act: act, post: post, hash: cur.hash}, {onDone: function(text, deleted) {
      var info = ge('post' + post).firstChild.nextSibling;
      if (info) {
        info.firstChild.rows[0].cells[0].innerHTML = text;
      } else {
        info = ge('post' + post).appendChild(ce('div', {className: 'bp_deleted', innerHTML: '\
<table cellspacing="0" cellpadding="0" style="width: 100%"><tr><td class="bp_deleted_td">\
  ' + text + '\
</td></tr></table>'}));
        hide(info.previousSibling);
      }

      if (deleted) {
        Pagination.recache(-1);
        Board.loadedPosts(cur.pgCount);
      }
    }, progress: prg});
  },
  deletePost: function(post) {
    Board.deleteReportPost(post, 'delete_comment');
  },
  reportPost: function(post) {
    Board.deleteReportPost(post, 'spam_comment');
  },
  restorePost: function(post) {
    post = cur.owner + '_' + post;
    cur.topicMyDeleted[post] = 0;
    ajax.post('al_board.php', {act: 'restore_comment', post: post, hash: cur.hash}, {onDone: function() {
      var info = ge('post' + post).firstChild.nextSibling;
      if (info) {
        show(info.previousSibling);
        re(info);

        Pagination.recache(1);
        Board.loadedPosts(cur.pgCount);
      }
    }});
  },
  editPost: function(post) {
    if (cur.bEditingPost) {
      return ge('bpe_text') ? elfocus('bpe_text') : false;
    }
    post = cur.owner + '_' + post;
    cur.bEditingPost = post;

    var postNode = ge('post' + post), dataNode = ge('bp_data' + post);
    var bottom = geByClass1('bp_bottom', postNode), prg = geByClass1('bp_progress', bottom);
    ajax.post('al_board.php', {act: 'edit_comment', post: post}, {onDone: function(text, media, add) {
      addEvent(window, 'keydown', Board.handleEditEsc);
      var textField = dataNode.parentNode.insertBefore(ce('div', {className: 'bpe_wrap', innerHTML: '\
<textarea id="bpe_text" onkeyup="Board.topicOnScroll(false, false, true); checkTextLength(cur.postLimit, this, \'bpe_warn\')" onkeypress="onCtrlEnter(event, Board.savePost)">' + text + '</textarea>\
<div id="bpe_warn"></div>\
<div id="bpe_media_preview" class="clear_fix media_preview"></div>\
' + (add ? '<div class="wpe_auth">' + add + '</div>' : '') + '\
<div class="bpe_buttons">\
  <div id="bpe_add_media" class="fl_r"><span class="add_media_lnk">' + getLang('board_add_attach') + '</span></div>\
  <div class="button_blue fl_l">\
    <button onclick="Board.savePost()">' + getLang('global_save') + '</button>\
  </div>\
  <div class="button_cancel bpe_cancel fl_l">\
    <div class="button" onclick="Board.cancelEditPost()">' + getLang('global_cancel') + '</div>\
  </div>\
  <div class="progress fl_l" id="bpe_progress"></div>\
</div>'}), dataNode).firstChild;
      autosizeSetup(textField, {minHeight: 17, delta: 0});
      setTimeout(function() {
        show(textField.parentNode);
        elfocus(textField);
        hide(dataNode, bottom);
        cur.boardEditMedia = initAddMedia(ge('bpe_add_media').firstChild, 'bpe_media_preview', cur.mediaTypes, {limit: 10, editable: 1, sortable: 1, teWidth: 280, teHeight: 200});
        if (media && media.length) {
          for (var i = 0, l = (media || []).length; i < l; ++i) {
            cur.boardEditMedia.chooseMedia.apply(window, media[i]);
          }
        }

        Wall.initComposer(textField, {
          lang: {
            introText: getLang('profile_mention_start_typing'),
            noResult: getLang('profile_mention_not_found')
          }
        });
      }, 0);
    }, onFail: function() {
      cur.bEditingPost = false;
    }, progress: prg});
  },
  cancelEditPost: function(nt, nm, ne) {
    var post = cur.bEditingPost, prg = ge('bpe_progress');
    if (!post || isVisible(prg)) return;

    cur.bEditingPost = false;
    if (!prg) return;

    removeEvent(window, 'keydown', Board.handleEditEsc);
    cleanElems(ge('bpe_add_media').firstChild);

    var postNode = ge('post' + post), dataNode = ge('bp_data' + post);
    var textNode = dataNode.firstChild, mediaNode = textNode.nextSibling;
    var bottom = geByClass1('bp_bottom', postNode);

    if (nt !== undefined) {
      val(textNode, nt);
      (nt ? show : hide)(textNode);
    }
    if (nm !== undefined) {
      if (mediaNode && !nm) {
        re(mediaNode);
      } else if (nm) {
        if (!mediaNode) {
          mediaNode = dataNode.appendChild(ce('div'));
        }
        dataNode.replaceChild(ce('div', {innerHTML: nm}).firstChild, mediaNode);
      }
    }
    if (ne !== undefined) {
      var ed = geByClass1('bp_edited_by', postNode);
      val(ed, ne);
      (ne ? show : hide)(ed);
    }
    show(bottom, dataNode);
    Wall.deinitComposer(ge('bpe_text'));
    re(ge('bpe_text').parentNode);
    Board.topicOnScroll(false, false, true);
  },
  handleEditEsc: function(e) {
    if (e.keyCode == KEY.ESC) {
      Board.cancelEditPost();
    }
  },
  savePost: function() {
    var post = cur.bEditingPost, prg = ge('bpe_progress');
    if (!post || !prg || isVisible(prg)) return;

    var newtext = trim(val('bpe_text')),
        addmedia = cur.boardEditMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.boardEditMedia ? addmedia.getMedias() : [],
        params = {
      act: 'save_comment',
      post: post,
      hash: cur.hash,
      comment: newtext
    }, attachI = 0;

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if (medias.length) {
      each(medias, function(k, v) {
        if (!v) return;
        ++attachI;
        params['attach' + attachI + '_type'] = this[0];
        params['attach' + attachI] = this[1];
      });
    }
    if (!attachI && !newtext) {
      return elfocus('bpe_text');
    }

    ajax.post('al_board.php', params, {
      onDone: Board.cancelEditPost,
      progress: prg
    });
  },

  votingUpdate: function(html, js) {
    if (curBox()) {
      curBox().hide();
    }

    var wrap = ge('bv_wrap');
    wrap.innerHTML = html;
    if (js) eval(js);
    if (!/^board\d+([\?#]|$)/.test(_tbLink.loc || '')) {
      globalHistoryDestroy(_tbLink.loc);
    }
    if (html) {
      delete(cur.privacy.topic_action_types.voting);
    } else {
      var newTypes = {edit: cur.privacy.topic_action_types.edit, voting: getLang('board_create_voting')};
      for (var i in cur.privacy.topic_action_types) {
        newTypes[i] = cur.privacy.topic_action_types[i];
      }
      cur.privacy.topic_action_types = newTypes;
    }
  },
  vote: function(el, oid, vid, option) {
    var pr = hasClass(el.firstChild, 'progress') ? el.firstChild : el.insertBefore(ce('span', {className: 'fl_r progress'}), el.firstChild);
    ajax.post('al_voting.php', {
      act: 'vote',
      option_id: option,
      owner_id: oid,
      voting_id: vid,
      context: 'topic',
      hash: cur.polls[vid].hash
    }, {onDone: Board.votingUpdate, progress: pr});
  },
  votingAction: function(key) {
    ge('privacy_edit_voting_action').innerHTML = getLang('voting_settings');
    var act = intval(cur.privacy[key][0]);
    cur.privacy[key] = [0, 0, []];
    Board.votingActionPerform(act);
  },
  votingActionPerform: function(act, sure) {
    if (act == 105) {
      if (sure) {
        curBox().hide();
      } else {
        return showFastBox(getLang('global_warning'), getLang('voting_sure_del_quiz'), getLang('global_delete'), Board.votingActionPerform.pbind(act, true), getLang('global_cancel'));
      }
    }
    var state = 0;
    switch (act) {
      case 101: act = 'openclose'; state = 0; break;
      case 102: act = 'openclose'; state = 1; break;
      case 103: act = 'tomain';    state = 0; break;
      case 104: act = 'tomain';    state = 1; break;
      case 105: act = 'delete';    state = 0; break;
    }
    ajax.post('al_voting.php', {
      act: act,
      owner_id: cur._voting.oid,
      voting_id: cur._voting.vid,
      state: state,
      context: 'topic',
      hash: cur._voting.hash
    }, {onDone: Board.votingUpdate, showProgress: function() {
      hide('privacy_edit_voting_action');
      show('bv_progress');
    }, onHideProgress: function() {
      hide('bv_progress');
      show('privacy_edit_voting_action');
    }});
  },

  mentionOver: function(el) {
    var post = ((el.getAttribute('mention') || '').match(/^bp(-?\d+_\d+)$/) || {})[1];
    if (!post) {
      mentionOver(el);
      return;
    }
    showTooltip(el, {
      url: 'al_board.php',
      params: {act: 'post_tt', post: post},
      slide: 15,
      shift: [78, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich board_tt'
    });
  },
  docTooltip: function(el, post, doc) {
    showTooltip(el, {
      url: 'al_board.php',
      params: {act: 'doc_tt', post: post, doc: doc},
      slide: 15,
      shift: [78, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich board_tt'
    });
  },

  searchGo: function(el, ev) {
    return nav.go(el, ev, {params: {q: nav.objLoc.q}});
  }

}

try{stManager.done('board.js');}catch(e){}
