var FullWall = {
  getsect: function() {
    var current = ge('full_wall_filters').firstChild;
    for (; !hasClass(current, 'active_link') && current;) {
      current = current.nextSibling;
    }
    return current;
  },
  failed: function(old, text) {
    FullWall.getsect().className = '';
    if (old) old.className = 'active_link';
    if (!text) return;

    setTimeout(showFastBox(getLang('global_error'), text).hide, 2000);
    return true;
  },
  go: function(el, ev) {
    var current = FullWall.getsect();
    var result = nav.go(el, ev, {onFail: FullWall.failed.pbind(current)});
    if (result === false) {
      if (current) current.className = '';
      el.parentNode.className = 'active_link';
    }
  },
  scrollCheck: function(e, st) {
    var ch = lastWindowHeight, top, ntop = 0, el, nel, bits, posts = [];
    if (domPN(cur.topRow) != cur.pgCont) {
      cur.topRow = domFC(cur.pgCont);
    }
    if (
      !vk.id ||
      !cur.topRow ||
      ((window.curNotifier || {}).idle_manager || {}).is_idle
    ) {
      return;
    }
    postsUnseen = [];
    for (el = domPS(cur.topRow); el; el = domPS(el)) {
      if (cur.topRow.offsetTop > st) cur.topRow = el;
      if (!el.unseen) {
        el.unseen = true;
        postsUnseen.push(FullWall.postsGetRaws(el));
      }
    }
    Page.postsUnseen(postsUnseen);
    for (el = cur.topRow; el; el = nel) {
      top = ntop ? ntop : el.offsetTop;
      if (top >= st + ch) break;

      nel = domNS(el);

      ntop = nel ? nel.offsetTop : top + el.offsetHeight;
      if (ntop < st && nel) cur.topRow = nel;

      bits = el.bits || 0;
      if (bits >= 3) continue;

      if (bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0)) {
        el.bits = bits;
        if (bits == 3) {
          posts.push(FullWall.postsGetRaws(el));
        }
      }
    }
    Page.postsSeen(posts);
  },
  postsGetRaws: function(el) {
    var index = indexOf(domPN(el).children, el);
    var m, res = {};
    if (m = el.id.match(new RegExp('^post(' + cur.oid + '_\\d+)$', ''))) {
      res[m[1]] = 1;
      if (m = (el.getAttribute('data-copy') || '').match(/^(-?\d+_\d+)$/)) {
        res[m[1]] = -1;
      }
    }
    res.index = index;
    res.module = cur.module;
    return res;
  },
  init: function(opts, preload) {
    extend(cur, {
      options: opts,
      module: 'wall',

      pgStart: opts.start,
      pgOffset: opts.offset,
      pgCount: opts.count,
      pgPerPage: opts.per_page,
      pgCont: ge('page_wall_posts'),
      pgMore: ge('fw_load_more'),
      pgPages: ge('fw_pages'),
      pgMorePrg: ge('fw_more_progress'),
      pgPreload: preload,
      pgUrl: opts.url,
      pgOnScroll: FullWall.scrollCheck,

      pgParams: opts.params,
      pgHref: opts.href,

      pgPostProcess: FullWall.loadedPosts,
      pgNoArrowNav: FullWall.noArrowNav,

      oid: opts.owner_id,
      postTo: opts.owner_id,
      fullPostView: true
    });
    wall.init(opts);
    if (!opts.wall_type || opts.wall_type != 'cards' && opts.wall_type != 'supp' && opts.wall_type != 'restore' && opts.wall_type != 'phone_info') {
      Pagination.init();
    }
    cur.destroy.push(Pagination.deinit);
    if (opts.with_id) return;

    if (opts.search) {
      var searchEl = ge('wall_search');
      placeholderSetup(searchEl, {back: 1});
      addEvent(searchEl, 'keydown', function (e) {
        if (e.keyCode == KEY.RETURN) {
          FullWall.doSearch();
          searchEl.blur();
          return cancelEvent(e);
        }
      });
      elfocus(searchEl);
      setTimeout(elfocus.pbind(searchEl), 100);
      if (val(searchEl)) show('wall_reset_search');
    }

    wall.initUpdates(opts.add_queue_key);
    if (opts.wall_type && (opts.wall_type == 'cards' || opts.wall_type == 'supp' || opts.wall_type == 'restore' || opts.wall_type == 'phone_info')) return;
    cur.nav.push(function(changed, current, next) {
      var own = changed.own;
      delete(changed.own);
      delete(changed.offset);
      if (!isEmpty(changed) || own === undefined) return;
      ajax.post('al_wall.php', {
        act: 's',
        owner_id: cur.oid,
        own: next.own || undefined,
        lnav: 1,
        offset: next.offset || undefined
      }, {onDone: function(summary, rows, names, href, start, offset, perpage, count, preload, queue) {
        ge('fw_summary_wrap').innerHTML = summary;
        Pagination.deinit();
        extend(cur, {
          pgStart: start,
          pgOffset: offset,
          pgCount: count,
          pgParams: next.own ? {own: 1} : false,
          pgHref: href,
          pgPages: ge('fw_pages'),
          pgPreload: preload
        });
        toggle(cur.pgMore, (count > offset + cur.pgPerPage));
        wall.cancelEdit();
        var posts = ge('page_wall_posts');
        posts.innerHTML = rows;
        each(geByTag('textarea', posts), function() { placeholderSetup(this, {fast: 1}); });
        Pagination.init();
        wall.initUpdates(queue);

        for (var mid in names) {
          cur.options.reply_names[mid] = names[mid];
        }

        cur.wallType = 'full_' + (next.own ? 'own' : 'all');
        nav.setLoc(next);

        scrollToTop();

        ge('wall_' + (next.own ? 'all' : 'own') + '_filter').className = '';
        var selFilter = ge('wall_' + (next.own ? 'own' : 'all') + '_filter');
        selFilter.className = 'active_link';
      }, showProgress: function() {
        hide('full_wall_return', 'fw_search_toggler');
        show('full_wall_progress');
      }, hideProgress: function() {
        hide('full_wall_progress');
        show('full_wall_return', 'fw_search_toggler');
      }, onFail: FullWall.failed.pbind(FullWall.getsect())});
      return false;
    });
  },
  loadedPosts: function(count, from, rows, offset, pages, preload, names) {
    if (preload) {
      each(geByTag('textarea', cur.pgCont), function() { placeholderSetup(this, {fast: 1}); });
      wall.cancelEdit();
    } else {
      var l = cur.pgCont.childNodes.length, i = 0;
      for (var el = cur.pgCont.lastChild; el && ++i <= cur.pgPerPage; el = el.previousSibling) {
        placeholderSetup(geByTag1('textarea', el), {fast: 1});
      }
      names = offset;
    }
    for (var mid in names) {
      cur.options.reply_names[mid] = names[mid];
    }
    FullWall.updateSummary(count);
  },
  updateSummary: function(count) {
    var ds = re('wall_datesearch_wrap');
    if (count > 1) {
      ge('fw_summary').innerHTML = getLang('wall_x_posts_at_all', count, true);
    } else if (count > 0) {
      ge('fw_summary').innerHTML = getLang('wall_one_post');
    } else {
      ge('fw_summary').innerHTML = getLang('wall_no_posts');
    }
    if (ds) ge('fw_summary').appendChild(ds);
  },
  noArrowNav: function() {
    return cur.__focused || (ge('own_reply_field') || {}).focused || cur.editingPost;
  },

  initOnePost: function(opts, preload) {
    Page.postsSeen(opts.seen);
    extend(cur, {
      onepost: true,
      options: opts,
      module: 'wall',

      docked: false,

      addField: ge('fwr_text'),
      addBlock: ge('fwr_form'),
      addBlockWrap: ge('fwr_wrap'),

      pgStart: opts.start,
      pgOffset: opts.offset,
      pgCount: opts.count,
      pgPerPage: opts.per_page,
      pgCont: ge('fw_replies_rows'),
      pgMore: ge('fwp_load_more'),
      pgPages: ge('fw_pages'),
      pgMorePrg: ge('fw_more_progress'),
      pgPreload: preload,
      pgUrl: opts.url,
      pgParams: opts.params,
      pgHref: opts.href,

      pgPostProcess: FullWall.loadedReplies,
      pgOnScroll: FullWall.onePostOnScroll,
      pgNoArrowNav: FullWall.noArrowNav,

      oid: opts.owner_id,
      pid: opts.post_id,
      nid: opts.note_id,
      fullPostView: true,
      named: {replies: ge('fw_one_replies_wrap')}
    });
    wall.init(opts);

    if (cur.addField) {
      stManager.add(['emoji.js', 'notifier.css'], function() {
        cur.fwEmoji = Emoji.init(cur.addField, {
          ttDiff: -48,
          rPointer: true,
          controlsCont: cur.addField.parentNode,
          onSend: function() {
            if (!isButtonLocked('fwr_send')) {
              FullWall.sendReply();
            }
          },
          noEnterSend: 1,
          //sharedTT: cur.sharedIm,
          checkEditable: function() {
            FullWall.replyFieldUpdated();
            wall.checkTextLen(cur.addField, 'fwr_warn');
          },
          onStickerSend: function(stNum) {
            FullWall.sendReply(false, stNum);
          }
        });
      });

      var mediaTypes = [];
      each (cur.options.rmedia_types, function () {
        if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link', 'page'])) {
          mediaTypes.push(this);
        }
      });
      var media;
      if (mediaTypes.length) {
        media = {
          lnk: ge('fwr_reply_media_lnk').firstChild,
          preview: ge('fwr_reply_media_preview'),
          types: mediaTypes,
          options: {limit: 2, disabledTypes: ['album'], toggleLnk: true}
        };
      }
      Wall.initComposer(cur.addField, {
        lang: {
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found')
        },
        media: media
      });
      FullWall.replyFieldUpdated();
    }
    Pagination.init(opts.scroll);
    cur.destroy.push(Pagination.deinit);

    wall.initUpdates(opts.add_queue_key);
  },
  scrollToEnd: function() {
    var st = cur.addBlockTop + cur.addBlockHeight + 20 - lastWindowHeight;
    if (scrollGetY() < st) {
      Pagination.setScroll(st);
    }
  },
  replyFieldUpdated: function() {
    if (!cur.addField || !window.Emoji) return;

    var newt = Emoji.val(cur.addField), newh = getSize(cur.addBlock)[1];
    var ch = (cur.addBlockHeight != newh), ct = (cur.addText != newt);
    if (ch) {
      cur.addBlockHeight = newh;
      cur.addBlockWrap.style.height = newh + 'px';
    }
    if (ct) {
      cur.addText = newt;
    }
    if (ch || ct) {
      FullWall.onePostOnScroll(false, false, true);
    }
  },
  onePostResetStyle: function() {
    cur.addBlock.style.left = '';
  },
  onePostOnScroll: function(e, st, pp) {
    if (!cur.addField) return;

    if (st === false || st === undefined) {
      st = scrollGetY();
    }
    if (pp === true) {
      cur.addBlockTop = getXY(cur.addBlockWrap)[1];
      if (browser.msie6) cur.addBlockTop += st;
    }
    var needDock = (cur.addText || cur.addForce) && (st + lastWindowHeight < cur.addBlockTop + cur.addBlockHeight);
    if (needDock && !cur.docked) {
      cur.addBlock.className = 'fixed';
      if (browser.msie6) {
        bodyNode.appendChild(cur.addBlock);
        e = {type: 'resize'};
      }
      cur.docked = true;
      show('fwr_cancel');
      cur.addForce = true;
    } else if (!needDock && cur.docked) {
      FullWall.cancelAddReply();
    }
    if (cur.docked && e && e.type == 'resize') {
      if (browser.msie6) {
        cur.addBlock.style.left = getXY(ge('content'))[0] + 'px';
      } else {
        cur.addBlock.style.left = (ge('page_layout').offsetLeft + ge('content').offsetLeft) + 'px';
        setTimeout(FullWall.onePostResetStyle, 0);
      }
    }
  },
  loadedReplies: function(count, from, rows, offset, pages, preload, names) {
    if (!preload) {
      names = offset;
    }
    for (var mid in names) {
      cur.options.reply_names[mid] = names[mid];
    }
    FullWall.onePostOnScroll(false, false, true);
    FullWall.repliesSummary(count);
  },
  repliesSummary: function(count) {
    var summary = ge('fw_summary');
    summary.innerHTML = count ? getLang('wall_n_replies', count) : getLang('wall_no_replies');
    show(summary.parentNode);
  },
  sendReply: function(ev, stickerId) {
    var rf = ge('fwr_text'),
        composer = rf && data(rf, 'composer'),
        replyName = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
        state;

    if (!Emoji) {
      return false;
    }
    if (stickerId) {
      var params = {message: '', attach1_type: "sticker", attach1: stickerId};
    } else {
      var params = composer ? Composer.getSendParams(composer, FullWall.sendReply) : {message: trim(Emoji.val(rf))};
      if (params.delayed) {
        return;
      }

      if (!params.attach1_type) {
        if (!params.message ||
            isArray(replyName) && !replyName[1].indexOf(params.message)) {
          elfocus(rf);
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
    var sendBtn = ge('fwr_send');
    if (sendBtn && buttonLocked(sendBtn)) {
      return;
    }

    rf.blur();
    cur.wallMyReplied[cur.oid + '_' + cur.pid] = 1;
    cur.wallMyOpened[cur.oid + '_' + cur.pid] = 1;
    if (cur.pid) {
      var replyTo = cur.oid + '_' + cur.pid;
    } else {
      var replyTo = cur.oid + '_note' + cur.nid;
    }

    extend(params, {
      act: 'post',
      type: cur.wallType,
      reply_to: replyTo,
      reply_to_msg: val('fwr_to'),
      reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
      last: ((cur.pgCont.lastChild || {}).id || '').split('_')[1],
      from_group: isChecked('fwr_as_group'),
      hash: cur.options.post_hash
    });
    ajax.post('al_wall.php', params, {
      onDone: function(count, from, rows, offset, pages, preload, names) {
        cur.wallMyReplied[cur.oid + '_' + cur.pid] = 0;
        Pagination.loaded.apply(window, arguments);
        FullWall.cancelAddReply(!stickerId);
        setTimeout(FullWall.scrollToEnd, 0);
        if (pages && offset) {
          nav.setLoc(extend(nav.objLoc, {offset: offset}));
        }
        if (window.Emoji) {
          Emoji.focus(rf);
        }
      },
      onFail: function () {
        if (composer) {
          Composer.restore(composer, state);
        }
      },
      showProgress: lockButton.pbind(sendBtn),
      hideProgress: unlockButton.pbind(sendBtn)
    });
  },
  cancelAddReply: function(clear) {
    cur.addForce = false;
    hide('fwr_cancel');
    cur.addBlock.className = '';
    if (browser.msie6) {
      cur.addBlockWrap.appendChild(cur.addBlock);
    }
    cur.docked = false;
    if (clear === true && window.Emoji) {
      Emoji.val(cur.addField, '');
      hide('fwr_warn');
      FullWall.cancelReplyTo();
      FullWall.replyFieldUpdated();
    }
  },

  replyTo: function(post, toMsgId, toId, event) {
    event = normEvent(event);
    val('fwr_to', toMsgId);
    var replyName = cur.options.reply_names[toId], cancel = '<span class="fwr_no_to" onclick="FullWall.cancelReplyTo(); elfocus(\'fwr_text\');"></span>';
    if (isArray(replyName)) {
      val('fwr_to_title', replyName[0] + cancel);
      var rf = ge('fwr_text'), replyNameOld = cur.reply_to && cur.options.reply_names[cur.reply_to[0]], v = trim(val(rf));
      v = v.replace(/&nbsp;/g, ' ');
      if (!v || replyNameOld && isArray(replyNameOld) && !replyNameOld[1].indexOf(v)) {
        if (window.Emoji) {
          Emoji.val(rf, !checkEvent(event) ? replaceEntities(replyName[1]) : '');
          Emoji.focus(rf);
        }
        FullWall.replyFieldUpdated();
      }
    } else {
      val('fwr_to_title', replyName + cancel);
    }
    cur.reply_to = [toId, toMsgId];
    cur.addForce = true;
    FullWall.onePostOnScroll();
    if (window.Emoji) {
      setTimeout(elfocus.pbind(cur.addField), 0);
    }

    var productId = cur.stickerClicked || false,
        rf = ge('fwr_text');
    cur.stickerClicked = false;
    if (productId && rf && rf.emojiId !== undefined) {
      Emoji.clickSticker(productId, rf);
    }
    return false;
  },
  cancelReplyTo: function() {
    var rf = ge('fwr_text'), replyNameOld = cur.reply_to && cur.options.reply_names[cur.reply_to[0]], v = trim(val(rf));
    val('fwr_to_title', '');
    val('fwr_to', '');
    cur.reply_to = false;
    if (!v || replyNameOld && isArray(replyNameOld) && !replyNameOld[1].indexOf(v)) {
      if (window.Emoji) {
        Emoji.val(rf, '');
      }
      FullWall.replyFieldUpdated();
    }
  },
  deletePost: function(post, hash) {
    return FullWall.replyAction('delete', post, hash);
  },
  markAsSpam: function(post, hash) {
    return FullWall.replyAction('spam', post, hash);
  },
  restorePost: function(post, hash, root) {
    if (!root) {
      if (cur.pid) {
        root = (post == cur.oid + '_' + cur.pid);
      } else {
        root = (post == cur.oid + 'note_' + cur.nid);
      }
    }
    ajax.post('al_wall.php', {act: 'restore', post: post, hash: hash, root: root ? 1 : 0}, {onDone: function() {
      var p = root ? ge('fw_post') : ge('post' + post);
      if (!p || isVisible(p.firstChild)) return;
      if (root) {
        cur.pgPaused = false;
        show('fwr_wrap', 'fw_one_replies_wrap', 'post_publish' + post);
      } else {
        Pagination.recache(1);
        FullWall.repliesSummary(cur.pgCount);
      }
      show(p.firstChild);
      re(p.firstChild.nextSibling);
    }});
  },
  replyAction: function(act, post, hash, force) {
    if (cur.pid) {
      var root = (post == cur.oid + '_' + cur.pid);
    } else {
      var root = (post == cur.oid + 'note_' + cur.nid);
    }
    cur.wallMyDeleted[post] = act == 'restore' ? 0 : 1;
    ajax.post('al_wall.php', {act: act, post: post, hash: hash, from: 'full', root: root ? 1 : 0, confirm: force ? 1 : 0}, {onDone: function(msg, additional, need_confirm) {
      if (need_confirm && act == 'delete') {
        var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() { box.hide(); FullWall.replyAction(act, post, hash, 1); }, getLang('box_cancel'));
        return;
      }
      var p = root ? ge('fw_post') : ge('post' + post);
      if (!p) return;
      if (root) {
        cur.pgPaused = true;
        hide('fwr_wrap', 'fw_one_replies_wrap', 'post_publish' + post);
      }
      if (p.firstChild.nextSibling) {
        p.firstChild.nextSibling.innerHTML = msg;
        if (act == 'spam' && additional) {
          eval(additional);
        }
      } else {
        p.appendChild(ce('div', {id: 'post_del' + post, innerHTML: msg, className: 'fw_deleted'}));
        hide(p.firstChild);
        if (act == 'spam' && additional) {
          eval(additional);
        } else if (additional && !root) {
          Pagination.recache(-1);
          FullWall.repliesSummary(cur.pgCount);
        }
      }
    }, progress: ge('wpe_prg' + post) || geByClass1('fw_reply_prg', ge('post' + post))});
  },

  addTetaTet: function(repls, ev) {
    var upd = {
      own_reply_link: '',
      tet_a_tet: ''
    };
    if (ev[9] && ev[9] != ev[2].split('_')[0] && cur.wallTpl.tet_a_tet) {
      upd.tet_a_tet = cur.wallTpl.tet_a_tet.replace('%from_uid%', ev[9]);
    } else {
      upd.own_reply_link = cur.wallTpl.own_reply_link.replace('%post_id%', ev[2]);
    }
    // debugLog(ev[9], ev[2], cur.wallTpl.tet_a_tet, upd);
    return upd;
  },

  notePart: function(obj, obj_id) {
    hide(obj);
    show(obj_id);
  },

  doSearch: function () {
    var q = trim(val('wall_search'));
    if (nav.objLoc[0].split('/').length > 1) {
      nav.change({0: 'wall'+cur.oid, q: q || false, search: !q && 1, offset: false});
    } else {
      nav.change({q: q || false, search: !q && 1, offset: false});
    }
    lockButton('wall_search_btn');
  },
  fixPost: function (link, post, hash, value) {
    ajax.post('al_wall.php', {act: 'a_fix_post', post: post, hash: hash, value: value}, {
      progress: ge('wpe_prg' + post),
      onDone: function () {
        val(link, getLang(value ? 'wall_unfix_post' : 'wall_fix_post'));
        link.onclick = function () {
          return FullWall.fixPost(link, post, hash, value ? 0 : 1);
        }
      }
    });
    return false;
  },
  calendar: function() {
    stManager.add(['ui_controls.js', 'datepicker.js', 'datepicker.css'], function() {
      if (!cur.wallDP) {
        cur.wallSD = val('wall_datesearch');
        cur.wallDP = new Datepicker(ge('wall_datesearch'), {
          width: 140,
          resfmt: 'plain',
          addRows: nav.objLoc.day ? '<tr><td class="wall_cal_clear" colspan="7"><a onclick="nav.change({day: false, offset: false, search: nav.objLoc.q ? false : 1})" id="wall_cal_clear_lnk">' + getLang('wall_clear_date_filter') + '</a></td></tr>' : '',
          onUpdate: function() {
            if (cur.wallSD != val('wall_datesearch')) {
              var nd = val('wall_datesearch').split('.');
              nav.change({'day': (nd[0] < 10 ? '0' : '') + nd[0] + (nd[1] < 10 ? '0' : '') + nd[1] + nd[2], search: false, offset: false});
            }
          }
        });
      }
      triggerEvent(geByClass1('datepicker_control', ge('wall_datesearch_cont')), 'mousedown', false, true);
      ge('wall_datesearch_cal_box').style[vk.rtl ? 'right' : 'left'] = Math.floor((ge('wall_datesearch_lnk').offsetWidth - ge('wall_datesearch_cal_div').offsetWidth) / 2 + ge('wall_datesearch_lnk')[vk.rtl ? 'offsetRight' : 'offsetLeft']) + 'px';
      ge('wall_datesearch_cal_box').style.marginTop = '-2px';
    });
  },
  emojiShowTT: function(obj, ev) {
    if (cur.fwEmoji === undefined) {
      return false;
    }
    return Emoji.ttShow(cur.fwEmoji, obj, ev);
  },
  emojiHideTT: function(obj, ev) {
    if (cur.fwEmoji === undefined) {
      return false;
    }
    return Emoji.ttHide(cur.fwEmoji, obj, ev);
  },
  showEmojiTT: function(obj, ev) {
    if (cur.fwEmoji === undefined) {
      return false;
    }
    return Emoji.ttClick(cur.fwEmoji, obj, false, false, ev);
  }
}

try{stManager.done('wall.js');}catch(e){}
