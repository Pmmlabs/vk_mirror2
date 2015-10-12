WComments = {
  getSectionParams: function () {
    var params = {
      app: cur.options.app,
      limit: cur.options.limit
    };
    switch (cur.section) {
      case 'admin_browse':
        params.act = 'admin_browse';
        break;

      case 'admin_bl':
        params.act = 'admin_bl';
        break;

      case 'admin_updates':
        params.act = 'admin_updates';
        break;

      case 'browse':
        params.browse = 1;
        params.replies = cur.options.replies;
        break;

      default: // page
        params.page_query = cur.options.page_query;
        params.part = 1;
    }
    return params
  },
  showMore: function () {
    if (cur.options.offset >= cur.options.count) {
      hide('wcomments_more_link');
      return;
    }
    if (cur.moreLoading) return;
    cur.moreLoading = true;
    var params = extend(WComments.getSectionParams(), {
      offset: cur.options.offset,
      part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').appendChild(cf(rows));
        WComments.resizeWidget();
        WComments.applyOptions(options);
        cur.scrollbar && cur.scrollbar.update(false, true);
        cur.moreLoading = false;
      },
      showProgress: function () {
        hide('wcomments_more');
        show('wcomments_more_progress');
        cur.moreLoading = true;
      },
      hideProgress: function () {
        hide('wcomments_more_progress');
        show('wcomments_more');
        cur.moreLoading = false;
      }
    });
  },
  switchSection: function (newSection) {
    var toAdmin = !newSection.indexOf('admin'),
        curTab = ge('wcomments_tab_' + cur.section),
        newTab = ge('wcomments_tab_' + newSection),
        topLnk = ge('wcomments_admin_link');

    toggle('wcomments_admin_nav', toAdmin);
    toggle('wcomments_form', !toAdmin);
    if (curTab) {
      curTab.className = 'wcomments_tab';
    }
    cur.section = newSection;
    if (newTab) {
      newTab.className = 'wcomments_tab_selected';
    }
    removeEvent(topLnk, 'click');
    topLnk.removeAttribute('onclick');
    if (toAdmin) {
      topLnk.innerHTML = getLang('widgets_comments_moder_return');
      topLnk.onclick = function () {
        WComments.switchSection('page');
        return false;
      };
    } else {
      topLnk.innerHTML = getLang('widgets_comments_moder_browse');
      topLnk.onclick = function () {
        WComments.switchSection('admin_browse');
        return false;
      };
    }
    ge('wcomments_posts').innerHTML = '<div class="wcomments_posts_loading"></div>';
    hide('wcomments_more_link');
    var params = extend(WComments.getSectionParams(), {
      // part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').innerHTML = rows;
        cur.scrollbar && cur.scrollbar.update(false, true);
        WComments.applyOptions(options);
      }
    });
  },
  refresh: function () {
    var params = extend(WComments.getSectionParams(), {
      part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').innerHTML = rows;
        WComments.applyOptions(options);
        WComments.resizeWidget();
      },
      showProgress: function() {
        ge('wcomments_posts').innerHTML = '<div class="wcomments_posts_loading"></div>';
        hide('wcomments_more_link');
        WComments.resizeWidget();
      },
      hideProgress: function() {
      }
    });
  },
  applyOptions: function (options) {
    if (options.reply_names) {
      cur.options.reply_names = extend(cur.options.reply_names || {}, options.reply_names);
      delete options.reply_names;
    }
    if (options.head_count && cur.section != 'browse') {
      ge('wcomments_count').innerHTML = options.head_count;
      delete options.head_count;
    }
    if (options.script) {
      eval(options.script);
      delete options.script;
    }
    extend(cur.options, options);
    toggle('wcomments_more_link', options.offset < options.count);
  },
  addToBl: function (mid, hash, link) {
    ajax.post('al_widget_comments.php', {act: 'a_add_to_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (summary) {
        hide('wcomments_bl_label' + mid);
        link.onclick = function () {
          WComments.delFromBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('widgets_remove_from_banlist');
      },
      showProgress: function () {
        hide(link);
        show('wcomments_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('wcomments_progress' + mid);
      }
    });
  },
  delFromBl: function (mid, hash, link) {
    ajax.post('al_widget_comments.php', {act: 'a_del_from_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (summary) {
        setStyle('wcomments_bl_label' + mid, 'display', 'inline');
        link.onclick = function () {
          WComments.addToBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('widgets_restore_to_banlist');
      },
      showProgress: function () {
        hide(link);
        show('wcomments_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('wcomments_progress' + mid);
      }
    });
  },
  deleteAllAndBan: function (post_id, mid, hash, btn) {
    ajax.post('al_widget_comments.php', {act: 'a_add_to_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (response) {
        each(geByClass('wcomments_post', ge('wcomments_posts'), 'div'), function () {
          if (!this.id.indexOf('post' + mid) && this.id != 'post' + post_id) {
            hide(this);
          }
        });
        ge('post_del' + post_id).innerHTML = response;
      },
      showProgress: function () {
        lockButton(btn);
      },
      hideProgress: function () {
        unlockButton(btn);
      }
    });
  },
  showLikesBox: function (obj) {
    cur.Rpc.callMethod('showBox', 'widget_like.php?' + ajx2q({act: 'a_stats_box', obj: obj, from: 'wcomments', app: cur.options.app, widget_width: 620}), {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028});
  },
  resizeWidget: function () {
    if (!cur.heightEl || !cur.Rpc) return;
    var size = getSize(cur.heightEl)[1];
    if (browser.msie && !browser.msie8 || browser.opera) size += 15;
    if (window.onBodyResize) onBodyResize();

    // if (window.mentions_mod && size < 150 && window.mention) { // fix for mentions list
    //   if (mention.select.isVisible()) {
    //     size += Math.max(getSize(mention.select.list)[1] - 35, 0);
    //   }
    // }
    cur.Rpc.callMethod('resize', size);
  },
  auth: function () {
    var
      screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
      features = 'width=655,height=479,left=' + parseInt(screenX + ((outerWidth - 655) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 479) / 2.5), 10);
      var active = this.active = window.open(location.protocol + '//oauth.vk.com/authorize?client_id=-1&redirect_uri=close.html&display=widget', 'vk_openapi', features);
      function checkWnd() {
         if (active.closed) {
           window.gotSession(true);
         } else {
           setTimeout(checkWnd, 1000);
         }
      }
      checkWnd();
  },
  initQTransport: function (options) {
    window.curNotifier = extend(options, {
      lp_connected: false,
      error_timeout: 1
    });
    WComments.lpInit();
    WComments.lpStart();
  },
  lpGetTransportWrap: function () {
    var queueCont = ge('queue_transport_wrap');
    if (!queueCont) {
      queueCont = ce('div', {id: 'queue_transport_wrap'});
      utilsNode.appendChild(queueCont);
    }
    return queueCont;
  },
  /* Long-poll methods */
  lpInit: function () {
    if (curNotifier.lpMakeRequest) return;
    delete curNotifier.lpMakeRequest;
    re('queue_transport_frame');
    WComments.lpGetTransportWrap().appendChild(
      ce('iframe', {
        id: 'queue_transport_frame',
        name: 'queue_transport_frame',
        src: curNotifier.frame_path
      })
    );
  },
  lpStart: function () {
    curNotifier.lp_started = true;
    WComments.lpCheck();
  },
  lpStop: function () {
    curNotifier.lp_started = false;
    clearTimeout(curNotifier.lp_check_to);
    clearTimeout(curNotifier.lp_error_to);
  },
  lpCheck: function () {
    if (!curNotifier.lp_started) return;
    if (!curNotifier.lpMakeRequest) {
      curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1000);
      return;
    }
    curNotifier.lpMakeRequest(curNotifier.frame_url, {
      act: 'a_check',
      ts: curNotifier.timestamp,
      key: curNotifier.key,
      id: curNotifier.uid,
      wait: 25
    }, function (text) {
      if (!curNotifier.lp_started) return;
      try {
        var success = this.lpChecked(eval('(' + text + ')'));
        if (success) {
          this.lpCheck();
          curNotifier.error_timeout = 1;
        }
      } catch (e) {
        topError('Notify error: ' + e.message);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
      }
    }.bind(this), function (msg) {
//        topError('Notify error: ' + msg);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
    }.bind(this));
  },
  lpChecked: function(response) {
    var failed = response.failed;
    if (failed == 2) {
      curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
      return false;
    } else if (failed) {
      throw getLang('global_unknown_error');
    }

    curNotifier.timestamp = response.ts;
    if (!cur.section.indexOf('admin')) {
      return true;
    }
    if (cur.options.fixed_height) {
      var scrollCont = ge('wcomments_posts_wrap'),
          postsCont = ge('wcomments_posts'),
          st = scrollCont.scrollTop, sh = postsCont.offsetHeight;
    }
    each (response.events, function (k, v) {
      WComments.pushEvent(v);
    });
    if (cur.options.fixed_height) {
      if (st > 100) {
        scrollCont.scrollTop = st + (postsCont.offsetHeight - sh);
      } else {
        scrollCont.scrollTop = 0;
      }
      cur.scrollbar && cur.scrollbar.update(false, true);
    }
    return true;
  },
  lpGetKey: function () {
    var stNow = vkNow();
    ajax.post('al_widget_comments.php', {act: 'a_get_key', id: curNotifier.uid, app: cur.options.app, page_query: cur.options.page_query}, {
      onDone: function (key, ts) {
        curNotifier.timestamp = ts;
        curNotifier.key = key;
        this.lpCheck();
      }.bind(this),
      onFail: function (code) {
        if (code == 3) {
          location.reload();
          return;
        }
        curNotifier.error_timeout = 64;
        this.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
        return true;
      }.bind(this)
    });
  },
  pushEvent: function (ev_text) {
    var ev = ev_text.split('<!>'), ev_ver = ev[0], ev_type = ev[1], post_id = ev[2], el = ge('post' + post_id);
    if (ev_ver != cur.options.qversion) {
      location.reload();
      return;
    }
    switch (ev_type) {
      case 'new_post':
        if (el) break;
        var cont = ge('wcomments_posts'),
            newEl = ce('div', {innerHTML: Wall.getNewPostHTML(ev, cur.options.is_admin)}).firstChild,
            newCnt = intval(ev[8]),
            posts = geByClass('wcomments_post', cont, 'div'),
            lastPost = posts && posts.length && posts[posts.length - 1];

        cont.insertBefore(newEl, cont.firstChild);
        setStyle(newEl, {backgroundColor: '#FEFAE4'});
        animate(newEl, {backgroundColor: '#FFF'}, 6000);
        if (cur.section != 'browse') {
          val('wcomments_count', newCnt > 0 ? getLang('widgets_comments_top_count', newCnt) : getLang('widgets_comments'));
        }
        lastPost && lastPost.parentNode.removeChild(lastPost);
        break;

      case 'del_post':
        if (el) {
          !cur.wallMyDeleted[post_id] && hide(el);
          cur.options.offset--;
        }
        break;

      case 'res_post':
        el && cur.options.offset++;
        break;

      case 'new_reply':
        if (!el || cur.wallMyReplied[post_id] || ge('post' + ev[3])) break;

        var repliesEl = ge('replies' + post_id),
            newEl = ce('div', {innerHTML: Wall.getNewReplyHTML(ev, cur.options.is_admin)}).firstChild,
            highlight = false;

        if (isVisible('reply_link' + post_id)) {
          re('reply_link' + post_id);
          show('replies_wrap' + post_id);
          highlight = true;
        } else {
          var openEl = repliesEl.nextSibling, newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
          if (!cur.wallMyOpened[post_id]) {
            addClass(newEl, 'new_reply');
            if (!openEl || openEl.className != 'replies_open') {
              openEl = ce('div', {className: 'replies_open', onclick: Wall.openNewComments.pbind(post_id)});
              repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
            }
            openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newCnt));
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
            if (total > 5 || shown < total) {
              if (!headerEl) {
                repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
              }
              Wall.updateRepliesHeader(post_id, headerEl, shown, total);
            }
          }
        }
        repliesEl.appendChild(newEl);
        if (highlight) {
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000);
        }
        break;

      case 'del_reply':
        !cur.wallMyDeleted[post_id] && re(el);
        break;
    }
  },
  updateMini: function () {
    if (cur.options.mini == 'auto') {
      cur.options.mini = cur.heightEl.clientWidth < 630;
    } else {
      cur.options.mini = intval(cur.options.mini) == 1;
    }
    toggleClass('wcomments_posts', 'wide_wall_module', !cur.options.mini);
    toggleClass(bodyNode, 'font_medium', !cur.options.mini);
  },
  init: function (options) {
    cur.options = options;
    extend(cur, {
      oid: options.user_id,
      postTo: options.user_id,
      heightEl: ge('wcomments_page'),
      fullPostView: 1,
      fullPostHeight: 56,
      noNavGo: true,
      section: 'posts',
      noAwayCheck: true
    });
    cur.section = options.browse ? 'browse' : 'posts';
    Wall.init(options);
    WComments.updateMini();
    if (options.fixed_height) {
      if (browser.msie6) {
        setStyle('wcomments_posts_wrap', {height: options.fixed_height - 127});
      } else {
        setStyle('wcomments_posts_wrap', {maxHeight: options.fixed_height - 127});
      }
      cur.scrollbar = new Scrollbar('wcomments_posts_wrap', {
        more: WComments.showMore,
        startDrag: function() {
          try {
            cur.Rpc.callMethod('startDrag');
          } catch(e) {}
        },
        stopDrag: function() {
          try {
            cur.Rpc.callMethod('stopDrag');
          } catch(e) {}
        },
        mlDiff: 16
      });

      cur.mouseMove = function(ev) {
        cur.scrollbar.mouseMove(ev);
      }
      cur.mouseUp = function() {
        cur.scrollbar.mouseUp();
      }
    }
    if (options.qtransport) {
      WComments.initQTransport(options.qtransport);
    }
    // Times update interval. For relative time correction
    timeUpdateInt = setInterval(function () {WComments.updateTimes();}, 10000);

    cur.RpcMethods = {
      onInit: function() {
        setTimeout(function () {
          WComments.resizeWidget();
        }, 0);
        setTimeout(function () {
          WComments.resizeWidget();
        }, 500);
      },
      mouseMove: function(screenY) {
        cur.mouseMove(intval(screenY));
      },
      mouseUp: function() {
        cur.mouseUp();
      },
      chooseMedia: function() {
        var args = [];
        var argsUnclean = Array.prototype.slice.apply(arguments);
        for(var i in argsUnclean) {
          args.push(cleanObj(argsUnclean[i]))
        }
        cur.chooseMedia.apply(cur.chooseMedia, args);
      },
      showMediaProgress: function() {
        var args = [cleanObj(arguments[0]), cleanObj(arguments[1]), cleanObj(arguments[2]), arguments[3]];
        cur.showMediaProgress.apply(cur.showMediaProgress, args);
      },
      likeFullUpdate: function() {
      }
    };
    try {
      cur.Rpc = new fastXDM.Client(cur.RpcMethods, {safe: true});
      cur.resizeInt = setInterval(WComments.resizeWidget, 1000);
    } catch (e) {
      debugLog(e);
      // Return scroll
    }
    if (!options.user_id) {
      addEvent('send_post', 'click', WComments.auth);
      addEvent('post_field', 'click focus', WComments.auth);
      // addEvent(document, 'click', WComments.auth);
    }
  },
  langWordNumeric: function(num, words, arr) {
    if (num < words.length) {
      return words[num];
    }
    return langNumeric(num, arr);
  },
  updateTimes: function() {
    var timeNow = intval(vkNow() / 1000), rm_class = [];
    each(geByClass('rel_date_needs_update', ge('wcomments_posts'), 'span'), function(k, v) {
      if (!v) return;
      var timeRow = intval(v.getAttribute('time')), diff = timeNow - timeRow, timeText = v.getAttribute('abs_time');
      if (diff < 5) {
        timeText = getLang('news_just_now');
      } else if (diff < 60) {
        timeText = WComments.langWordNumeric(diff, cur.lang.news_X_seconds_ago_words, cur.lang.news_X_seconds_ago);
      } else if (diff < 3600) {
        timeText = WComments.langWordNumeric(intval(diff / 60), cur.lang.news_X_minutes_ago_words, cur.lang.news_X_minutes_ago);
      } else if (diff < 4 * 3600) {
        timeText = WComments.langWordNumeric(intval(diff / 3600), cur.lang.news_X_hours_ago_words, cur.lang.news_X_hours_ago);
      } else {
        rm_class.push(v);
      }
      v.innerHTML = timeText;
    });
    each (rm_class, function () {
      removeClass(this, 'rel_date_needs_update');
    });
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
};



var Wall = {
  checkTextLen: function(inp, warn, force) {
    return;
  },
  checkPostLen: function(val, force) {
    return;
  },
  showEditPost: function() {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('post_field').blur() }, 0);
      return cur.viewAsBox();
    }

    if (cur.editing === 0) return;
    if (cur.withMentions && !cur.mentionsAdded) {
      cur.mentionsAdded = true;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js'], function() {
        initMentionClass();
        cur.postMention = new MentionAutocomplete('post_field', {
          minHeight: cur.fullPostView ? (cur.fullPostHeight || 50) : 32,
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found'),
          onSubmit: Wall.sendPost,
          checkLen: Wall.checkPostLen,
          onValueChange: (cur.wallAddMedia || {}).checkMessageURLs
        });
        addEvent(cur.postMention.rtaEl, 'focus', Wall.showEditPost);
        if (ge('post_field').focused !== false) {
          triggerEvent(ge('post_field'), 'focus');
        }
      });
    } else if (cur.postMention) {
      cur.postMention.options.minHeight = cur.fullPostView ? (cur.fullPostHeight || 50) : 32;
    }
    Wall.hideEditPostReply();
    show('submit_post');
    autosizeSetup('post_field', {minHeight: cur.fullPostView ? (cur.fullPostHeight || 50) : 32});
    cur.editing = 0;
  },
  hideEditPost: function(force) {
    cur.editing = false;
    var rf = ge('post_field');
    if (browser.opera_mobile || !rf || cur.fullPostView) return;
    if (!force && rf.getValue && trim(rf.getValue())) return;
    hide('submit_post');
    if (rf && !rf.value) {
      if (cur.postMention) {
        cur.postMention.options.minHeight = 14;
      }
      setStyle(rf, {height: 14});
      if (rf.phonsize) rf.phonsize();
    }
  },
  sendPost: function() {
    var addmedia = cur.wallAddMedia || {}, media = addmedia.chosenMedia || {}, medias = addmedia.getMedias ? addmedia.getMedias() : [], share = (addmedia.shareData || {});
    var msg = ge('post_field').getValue();
    var attachI = 0;
    if (share.initialPattern && (trim(msg) == share.initialPattern)) {
      msg = '';
    }

    var params = {
      act: 'post',
      message: msg,
      to_id: cur.postTo,
      type: 'widget_comments',
      status_export: '',
      widget_app: cur.options.app,
      widget_page_url: cur.options.page_url,
      widget_page_title: cur.options.page_title,
      widget_page_desc: cur.options.page_desc,
      widget_page_query: cur.options.page_query,
      hash: cur.options.post_hash
    };

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if ((!medias || !medias.length) && !msg) {
      elfocus('post_field');
      return;
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
            attachVal = share.user_id + '_' + share.photo_id;
            if (share.images && share.images.length) {
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

    ajax.post('al_wall.php', params, {
      onDone: function(post_id) {
        if (post_id) {
          var params = {
            act: 'a_post',
            post: post_id,
            hash: cur.options.post_hash,
            app: cur.options.app,
            limit: cur.options.limit,
            'export': isChecked('wcomments_export')
          };

          ajax.post('al_widget_comments.php', params, {
            onDone: function (options, rows) {
              if (cur.section == 'posts' && cur.Rpc) {
                cur.Rpc.callMethod('publish', 'widgets.comments.new_comment', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
                // cur.Rpc.callMethod('onChange', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
              }
              ge('wcomments_posts').innerHTML = rows;
              WComments.applyOptions(options);
              cur.scrollbar && cur.scrollbar.update(false, true);
            },
            showProgress: function() {
              lockButton(ge('send_post'));
            },
            hideProgress: function() {
              unlockButton(ge('send_post'));
            }
          });
        }

        var rf = ge('post_field');
        if (cur.withMentions) {
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
        hide('post_warn');
        return

        // Wall.receive(rows, names);
      },
      showProgress: function() {
        lockButton(ge('send_post'));
      },
      hideProgress: function() {
        unlockButton(ge('send_post'));
      }
    });
  },

  _repliesLoaded: function(post, hl, replies, names) {
     var r = ge('replies' + post), openEl = r.nextSibling;
     if (hl) {
      var el = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      var h = r.offsetHeight;
      r.innerHTML = replies;
      el.scrollTop = intval(el.scrollTop) + (r.offsetHeight - h);
      setTimeout(Wall.highlightReply.pbind('post' + hl), 0);
    } else {
      r.innerHTML = replies;
    }
    if (openEl && openEl.className == 'replies_open') {
      re(openEl);
    }
    extend(cur.options.reply_names, names);
  },
  highlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
      setTimeout(function() {
        animate(el, {backgroundColor: '#FFF'}, 200);
      }, 1000);
    });

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
      Wall.showReplies(post, false, reply);
    }
    return false;
  },
  showReplies: function(post, count, hl, ev) {
    if (checkEvent(ev || window.event)) { return; }
    if (cur.viewAsBox) return cur.viewAsBox();
    hide('wrh_text' + post);
    cur.wallMyOpened[post] = (count != 3);
    ajax.post('al_wall.php', {act: 'get_replies', post: post, count: count}, {
      onDone: Wall._repliesLoaded.pbind(post, hl),
      onFail: show.pbind('wrh_text' + post),
      progress: 'wrh_prg' + post
    });
    return false;
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
  emojiOpts: {},
  initReplyEditable: function(txt, cont, post) {
    if (txt.emojiInited) {
      return false;
    }
    txt.emojiInited = true;
    stManager.add(['emoji.js', 'notifier.css'], function() {
      var optId = Emoji.init(txt, {
        ttDiff: -42,
        rPointer: true,
        controlsCont: cont,
        shouldFocus: true,
        onSend: function() {
          Wall.sendReply(post);
        },
        ctrlSend: function() {
          return cur.wallTpl.reply_multiline;
        },
        noStickers: true,
        checkEditable: function() {
          Wall.checkTextLen.pbind(txt, 'reply_warn'+post);
        },
        onStickerSend: function(stNum) {
          Wall.sendReply(post, false, stNum);
        }
      });
      Wall.emojiOpts[post] = optId;
    });
  },
  showEditReply: function(post) {
    if (!vk.id) {
      WComments.auth();
      return false;
    }

    var rf = ge('reply_field' + post),
        postEl = ge('post' + post),
        fakeBox = ge('reply_fakebox' + post),
        realBox = ge('reply_box' + post),
        replyLink;

    if (fakeBox) {
      realBox = se(rs(cur.wallTpl.reply_form, {post_id: post}));
      fakeBox.parentNode.replaceChild(realBox, fakeBox);
      rf = ge('reply_field' + post);
    }
    Wall.initReplyEditable(rf, realBox, post);
    if (cur.editing === post) {
      elfocus(rf);
      return;
    }
    Wall.hideEditPostReply();
    addClass(postEl, 'reply_box_open');
    setStyle('replies_wrap' + post, {display: ''});
    Wall.replyFormHintUpdate(post);
    cur.editing = post;
    setTimeout(elfocus.pbind(rf), 0);
  },
  hideEditReply: function(post) {
    cur.editing = false;

    var rf = ge('reply_field' + post),
        postEl = ge('post' + post),
        replyName = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
        v = trim(val(rf)),
        replyLink;
    if (!rf) return;
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
    rf.phonblur && rf.phonblur();
    val('reply_to' + post, '');
    hide('reply_to_title' + post);
    cur.reply_to = false;

    var point = cur.replySubmitSettings;
    point && point.tt && point.tt.destroy();
  },
  replyTo: function(post, toMsgId, toId, event) {
    Wall.showEditReply(post);
    val('reply_to' + post, toMsgId);
    cur.reply_to = [toId, toMsgId];
    var replyName = cur.options.reply_names[toId];
    if (isArray(replyName)) {
      val('reply_to_title' + post, replyName[0]);
      var rf = ge('reply_field' + post),
          replyNameOld = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
          v = trim(val(rf));
      if (!v || replyNameOld && isArray(replyNameOld) && !replyNameOld[1].indexOf(v)) {
        val(rf, !checkEvent(event) ? replyName[1] : '');
      }
    } else {
      val('reply_to_title' + post, replyName);
    }
    show('reply_to_title' + post);
    Wall.replyFormHintUpdate(post);
    return false;
  },
  replySubmitTooltip: function (post, over) {
    var box = ge('reply_box' + post),
        place = box && geByClass1('reply_hint', box, 'div'),
        point = cur.replySubmitSettings;

    if (!place) return;

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

    point.tt && point.tt.destroy && point.tt.destroy();
    place.insertBefore(point, place.firstChild);
    var ctrlSubmit = cur.wallTpl.reply_multiline ? 1 : 0,
        hint = rs(cur.wallTpl.reply_multiline_hint, {
      enabled: ctrlSubmit ? 'on' : '',
      disabled: !ctrlSubmit ? 'on' : ''
    });

    showTooltip(point, {
      text: hint,
      className: 'reply_multiline_tt rich wall_tt',
      shift: [3, 15, 13],
      forcetodown: 1,
      slide: 15,
      showdt: 400,
      hidedt: 400,
      hasover: 1,
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
      point && point.tt && point.tt.destroy();
    } else {
      ajax.post('al_wall.php', {act: 'a_save_ctrl_submit', value: value, hash: cur.wallTpl.poll_hash})
      window.Notifier && Notifier.lcSend('wall_reply_multiline', {value: value});
    }
    if (cur.editing) {
      Wall.replyFormHintUpdate(cur.editing);
    }
  },
  replyFormHintUpdate: function (post) {
    var replyHint = ge('reply_hint' + post),
        value = cur.wallTpl.reply_multiline,
        wrap = ge('submit_reply' + post),
        btn = ge('reply_button' + post),
        title = ge('reply_to_title' + post);
    if (!replyHint) return;

    var w = wrap.clientWidth - btn.clientWidth - title.clientWidth - 24;
    val(geByTag1('span', replyHint), getLang('wall_reply_submit_hint_' + (value ? 2 : 1) + (w > 300 ? '_more' : '')));
    setStyle(replyHint, 'width', w);
  },
  onReplySubmit: function (post, e) {
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      if (cur.wallTpl.reply_multiline && (e.ctrlKey || browser.mac && e.metaKey) ||
          !cur.wallTpl.reply_multiline && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
        Wall.sendReply(post);
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var rf = ge('reply_field' + post), v = val(rf);
      if (typeof rf.selectionStart == 'number' && typeof rf.selectionEnd == 'number') {
        var start = rf.selectionStart;
        rf.value = v.slice(0, start) + "\n" + v.slice(rf.selectionEnd);
        rf.selectionStart = rf.selectionEnd = start + 1;
      } else if (document.selection && document.selection.createRange) {
        rf.focus();
        var range = document.selection.createRange();
        range.text = "\r\n";
        range.collapse(false);
        if (browser.opera) {
          range.moveEnd('character', 0);
          range.moveStart('character', 0);
        }
        range.select();
      }
      rf.autosize.update();
      setTimeout(function () {
        rf.autosize.update();
      }, 0);
      return false;
    }
  },
  sendReply: function(post, ev, stickerId) {
    if (!window.Emoji) {
      return false;
    }
    var rf = ge('reply_field' + post),
        msg = Emoji.val(rf),
        v = trim(msg),
        replyName, params;
    if (!v || isArray(replyName = (cur.reply_to && cur.options.reply_names[cur.reply_to[0]])) && !replyName[1].indexOf(v)) {
      elfocus('reply_field' + post);
      return;
    }
    Emoji.val(rf, '');
    Emoji.focus(rf);
    var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash;
    cur.wallMyReplied[post] = 1;
    cur.wallMyOpened[post] = 1;
    var params = {
      act: 'post',
      type: cur.wallType,
      reply_to: post,
      reply_to_msg: val('reply_to' + post),
      start_id: val('start_reply' + post),
      message: msg,
      from: 'widget',
      hash: post_hash
    }
    ajax.post('al_wall.php', params, {
      onDone: function(reply, replies, names) {
        cur.wallMyReplied[post] = 0;
        re('reply_link' + post);
        hide('reply_warn' + post);
        Wall._repliesLoaded(post, false, replies, names);
        cur.wallMyReplies[reply] = {
          message: msg,
          reply_to: params.reply_to,
          reply_to_msg: params.reply_to_msg,
          reply_to_user: params.reply_to_user
        };
      },
      onFail: function () {
        newEl && re(newEl);
        Emoji.val(rf, msg);
      },
      showProgress: lockButton.pbind(ge('reply_button' + post)),
      hideProgress: unlockButton.pbind(ge('reply_button' + post))
    });


    var repliesEl = ge('replies' + post),
        replyId = -(++cur.wallMyRepliesCnt);
        newEl = se(rs(cur.wallTpl.reply_fast, {
          reply_id: '0_' + replyId,
          message: Emoji.emojiToHTML(msg, true).replace(/\n/g, '<br/>'),
          date: Wall.getNowRelTime()
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
      if (total > 5 || shown < total) {
        if (!headerEl) {
          repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
        }
        Wall.updateRepliesHeader(post, headerEl, shown, total);
      }
    }
    repliesEl.appendChild(newEl);
  },
  postTooltip: function(el, post, opts) {
    if (cur.viewAsBox) return;

    showTooltip(el, {
      url: 'al_wall.php',
      params: extend({act: 'post_tt', post: post}, opts || {}),
      slide: 15,
      shift: [35, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      forcetodown: 1,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },

  hideEditPostReply: function(e) {
    if (cur.editing === false) return;
    var el = (e && e.target) ? e.target : {};
    var id = el.id;
    if (cur.editing) {
      if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
        Wall.hideEditReply(cur.editing);
      }
    } else if (!cur.chosenMedia) {
      if (!e || id != 'post_field') {
        Wall.hideEditPost();
      }
    }
  },
  deletePost: function(post, hash) {
    cur.wallMyDeleted[post] = 1;
    var r = ge('post' + post);
    ajax.post('al_wall.php', {
      act: 'delete',
      post: post,
      hash: hash,
      from: 'widget',
      app: cur.options.app
    }, {
      onDone: function(msg, options) {
        var t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        if (cur.section == 'posts' && cur.Rpc) {
          cur.Rpc.callMethod('publish', 'widgets.comments.delete_comment', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
          // cur.Rpc.callMethod('onChange', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
        }
        hide(t);
      }
    });
    var btn = ge('delete_post' + post), myReply;
    if (btn && btn.tt && btn.tt.destroy) {
      btn.tt.destroy();
    }
    if (myReply = cur.wallMyReplies[post]) {
      (window.Emoji ? Emoji.val : val)(ge('reply_field' + myReply.reply_to), myReply.message);
      if (myReply.reply_to_msg && myReply.reply_to_user) {
        Wall.replyTo(myReply.reply_to, myReply.reply_to_msg, myReply.reply_to_user);
      } else {
        Wall.showEditReply(myReply.reply_to);
      }
      (window.Emoji ? Emoji.focus : elfocus)(ge('reply_field' + myReply.reply_to));
    }
  },
  markAsSpam: function(post, hash) {
    if (!vk.id) {
      WComments.auth();
      return false;
    }
    ajax.post('al_wall.php', {
      act: 'spam',
      post: post,
      hash: hash
    }, {
      onDone: function(msg, js) {
        var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        hide(t);
        if (js) {
          eval(js);
        }
      }
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  restorePost: function(post, hash) {
    cur.wallMyDeleted[post] = 0;
    ajax.post('al_wall.php', {
      act: 'restore',
      post: post,
      hash: hash,
      from: 'widget'
    }, {
      onDone: function(msg) {
        var pd = ge('post_del' + post);
        if (!pd) return;
        var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        show(t);
        hide(pd);
      }
    });
  },

  checkPostClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /wall_post_text|post_media|event_share|public_share|group_share|feed_friends|feed_gifts|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
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
  postClick: function (post, event) {
    var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + post);
    if (!matches) return;
    if (Wall.checkPostClick(el, event)) return;

    var moreLink = geByClass1('wall_post_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      moreLink.onclick();
      return;
    }
    if (hasClass(ge('wcomments_posts'), 'no_post_click')) return;

    window.open('wall' + matches[1] + '_' + matches[3], '_blank');
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
    var oid = intval(post),
        matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + oid + '_' + reply);
    if (!matches) return;
    (event || {}).cancelBubble = true;
    if (Wall.checkReplyClick(el, event)) return;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (answering) {
      Wall.replyTo(post, reply, answering, event);
    }
  },
  postOver: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      addClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    Wall.showDeletePost(post);
  },
  postOut: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      removeClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    if (!el || hasClass(el, 'one')) return;
    Wall.hideDeletePost(post);
  },
  replyOver: function(post) {
    if (!vk.id) return;
    var postParts = post.split('_'),
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|note|topic)/) ? '_reply' : '_wall_reply'),
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
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|note|topic)/) ?  '_reply' : '_wall_reply'),
        lnk = ge('like_link' + reply),
        icon = ge('like_icon' + reply);

    if (!lnk) {
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      return;
    }

    lnk.timeout = setTimeout(function() {
      removeAttr(lnk, 'timeout');
      fadeTo(lnk, 200, 0);
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      if (hasClass(icon, 'no_likes')) {
        animate(icon, {opacity: 0}, 200, function () {
          hasClass(icon, 'no_likes') && (icon.style.visibility = 'hidden');
        });
      }
    }, 1);
  },
  likeOver: function(post) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post);

    if (!icon) return;
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(icon, {opacity: 1}, 200, false), 1);
    } else {
      icon.style.visibility = 'visible';
      setStyle(icon, {opacity: 1});
    }

    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        ttW = 230,
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 4,
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj, from: 'wcomments'},
      slide: 15,
      shift: [leftShift, 5, 9],
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
      className: 'rich like_tt',
      onShowStart: function (tt) {
        if (!tt.container) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  likeOut: function(post, tthide) {
    var icon = ge('like_icon' + post);
    if (!icon) return;
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(ge('like_icon' + post), {opacity: 0.4}, 200, false), 1);
    }
    if (tthide) {
      triggerEvent(icon.parentNode, 'mouseout');
    }
  },
  postLikeOver: function(post) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post);

    if (!icon || cur.viewAsBox) return;
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        ttW = 230,
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 7,
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj},
      slide: 15,
      shift: [leftShift, 7, 7],
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
      className: 'rich like_tt',
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
  likeUpdate: function(post, my, count, title) {
    count = intval(count);

    var m = post.match(/(-?\d+)_(photo|video|note|topic|wall_reply|)(\d+)/), like_obj = (m[2] || 'wall') + m[1] + '_' + m[3];

    var countInput = ge('like_real_count_' + like_obj) || {}, rows = ge('like_table_' + like_obj);
    var titleNode = ge('like_title_' + like_obj), countNode = ge('like_count' + post);
    var icon = ge('like_icon' + post);
    var tt = countNode.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -31);

    if (title && titleNode) {
      val(titleNode, title);
    }
    countInput.value = count;
    animateCount(countNode, count);

    if (my) {
      addClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    } else {
      removeClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
      var cb = ge('like_share_wall' + post);
      if (cb) checkbox(cb, false);
    }
    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        if (tt) { // do not know what it but it fixes the issue
          tt.likeInvalidated = true;
        }
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

  like: function(post, hash) {
    if (!vk.id || cur.viewAsBox) return;
    var my = hasClass(ge('like_icon' + post), 'my_like');
    var matches = post.match(/(-?\d+)_(photo|video|note|topic|wall_reply|)(\d+)/);;
    var like_obj = (matches[2] || 'wall') + matches[1] + '_' + matches[3];
    ajax.post('like.php', {act: 'a_do_' + (my ? 'un' : '') + 'like', 'object': like_obj, hash: hash, wall: 1, from: 'wcomments'}, {
      onDone: Wall.likeUpdate.pbind(post)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    Wall.likeUpdate(post, !my, intval(count) + (my ? -1 : 1));
  },
  likeShare: function(post, hash) {
    var el = ge('like_share_wall' + post), was = isChecked(el);
    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: 'wall' + post, hash: hash, wall: 1, from: 'wcomments'}, {
      onDone: Wall.likeUpdate.pbind(post)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    var my = hasClass(ge('like_icon' + post), 'my_like');
    Wall.likeUpdate(post, true, intval(count) + (my ? 0 : 1));
  },
  showLikesPage: function(post, published, offset) {
    cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: 'wall' + post, published: published, offset: offset, wall: 1}, published);
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
  update: function(count) {
    if (cur.wallType != 'all' && cur.wallType != 'own') return;
    var cnts = {}, sw = ge('page_wall_switch'), pnw = ge('page_no_wall');
    each(['all', 'own'], function() {
      var el = ge('page_wall_count_' + this);
      cnts[this + ''] = el && intval(el.value);
    });
    if (cnts.all && pnw) {
      pnw.parentNode.removeChild(pnw);
    }
    if (!cnts.own || cnts.own >= cnts.all) {
      hide(sw);
    } else {
      show(sw);
      sw.innerHTML = cur.options[cur.wallType + '_link'];
    }
    ge('page_wall_posts_count').innerHTML = cnts[cur.wallType] ? langNumeric(cnts[cur.wallType], cur.options.wall_counts) : '';
    ge('page_wall_header').href = '/wall' + cur.oid + ((cur.wallType == 'own') ? '?own=1' : '');
    var morelnk = ge('wall_more_link'), count = geByClass(cur.wallType, ge('page_wall_posts')).length;
    if (count >= cnts[cur.wallType]) {
      hide(morelnk);
    } else {
      show(morelnk);
      morelnk.onclick = Wall.showMore.pbind(count);
    }
  },

  getAbsDate: function (ts) {
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
  getNowRelTime: function () {
    var ts = vkNow();
    return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + Wall.getAbsDate(ts) + '">' + getLang('wall_just_now') + '</span>';
  },
  getNewPostHTML: function (ev, isAdmin, extendCb) {
    var post_id = ev[2],
        html = cur.wallTpl.post,
        actions = rs(cur.wallTpl.post_actions, {actions: (isAdmin || !ev[2].indexOf(vk.id + '_')) ? cur.wallTpl.del : cur.wallTpl.spam}),
        repls = {
      name: ev[3].replace('mem_link', 'author'),
      online: '',
      actions: actions,
      photo: ev[4],
      link: ev[5],
      text: ev[6],
      date: ev[7],
      post_id: ev[2],
      date_postfix: '',
      post_url: post_id.replace('_wall_reply', '_')
    };
    extendCb && extend(ev, extendCb(ev));
    each (repls, function (k, v) {
      html = html.replace(new RegExp('%' + k + '%', 'g'), v);
    });
    return html;
  },
  getNewReplyHTML: function (ev, isAdmin, extendCb) {
    var acts = [],
        can_reply = ge('reply_field' + ev[2]) || ge('reply_fakebox' + ev[2]) || ge('fwr_text'),
        className = '';
        attr = '';

    if (isAdmin || !ev[2].indexOf(vk.id + '_') || !ev[4].indexOf(vk.id + '_')) {
      acts.push(cur.wallTpl.del_reply);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam_reply);
    }
    if (ev[8].indexOf('class="wall_reply_more"') != -1) {
      className += 'reply_moreable';
    }
    if (can_reply) {
      if (cur.onepost) {
        acts.push(cur.wallTpl.answer_reply);
      } else {
        className += ' reply_replieable';
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
      date: Wall.getNowRelTime(),
      to_link: ev[10],
      post_id: ev[2],
      reply_id: ev[3],
      like_id: ev[3].replace('_', '_wall_reply'),
      reply_msg_id: ev[3].split('_')[1],
      reply_uid: ev[4] || 'false'
    };
    extendCb && extend(repls, extendCb(repls));
    return rs(cur.wallTpl.reply, repls);
  },
  openNewComments: function (post_raw) {
    var repliesEl = ge('replies' + post_raw),
        openEl = repliesEl.nextSibling,
        headerEl = geByClass1('wr_header', repliesEl, 'a'),
        newCnt = 0,
        shown = geByClass('reply', repliesEl, 'div').length,
        total = shown,
        newTotal = openEl.newCnt;
    each ([].slice.call(geByClass('new_reply', repliesEl, 'div')), function () {
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
  },
  updateRepliesHeader: function (post_raw, headerEl, shown, total) {
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
  checkRepliesLink: function (el, ev) {
    ev = ev || window.event;
    var post_raw = el.id.match(/^replies_link(-?\d+)_(photo|video|note|topic|video|)(\d+)$/),
        href = el.href;

    if (!checkEvent(ev)) {
      el.parentNode.onclick();
      return cancelEvent(ev);
    }

    if (!post_raw) {
      return;
    }
    if (!href) {
      var type = post_raw[2] || 'wall';
      href = '/' + type + post_raw[1] + '_' + post_raw[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      el.href = href;
    }
    if (ev.type == 'mousedown') {
      return;
    }
    if (browser.mozilla) {
      var wnd = window.open(el.href, '_blank');
      try {wnd.blur(); window.focus();} catch (e) {}
      return cancelEvent(ev);
    } else {
      ev.cancelBubble = true;
    }
  },

  init: function(opts) {
    extend(cur, {
      postField: ge('post_field'),
      sendPostBtn: ge('send_post'),
      wallType: opts.wall_type,
      withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
      wallTpl: opts.wall_tpl,
      wallMyDeleted: {},
      wallMyOpened: {},
      wallMyReplied: {},
      wallMyReplies: {},
      wallMyRepliesCnt: 0
    });
    if (opts.wall_tpl && opts.wall_tpl.lang) {
      cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
    }

    Wall.update();

    if (!cur.sendPostBtn) return; // banned

    cur.sendPostBtn.onclick = Wall.sendPost;
    placeholderSetup(cur.postField);

    each(geByTag('textarea', ge('page_wall_posts')), function() { placeholderSetup(this); });

    removeEvent(document, 'click', Wall.hideEditPostReply);
    addEvent(document, 'click', Wall.hideEditPostReply);

    if (opts.media_types && ge('page_add_media')) {
      cur.wallAddMedia = initAddMedia(ge('page_add_media').firstChild, 'media_preview', opts.media_types);
      cur.wallAddMedia.onChange = function() {
        Wall.checkPostLen(ge('post_field').value, true);
      }
    }
  }
}

var wall = extend(Wall, {
  showDeletePost: function (post) {
    Wall._animDelX(0.3, undefined, post, 'post_delete');
    Wall._animDelX(0.3, undefined, post, 'post_edit');
  },
  hideDeletePost: function (post) {
    Wall._animDelX(0, undefined, post, 'post_delete');
    Wall._animDelX(0, undefined, post, 'post_edit');
  },
  activeDeletePost: function(post, tt, action) {
    Wall._animDelX(1, 1, post, action);
    if (tt) showTooltip(ge((action || 'delete_post') + post), {text: tt, showdt: 0, black: 1, shift: [14, 3, 3]});
  },
  deactiveDeletePost: Wall._animDelX.pbind(0.3, 0)
});

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

  var html = '<div class="rows"><div class="add_media_head"><nobr>' + lnk.innerHTML + '</nobr></div></div>';

  if (!window.customMenuNode) {
    window.customMenuNode = domFC(domFC(pageNode.appendChild(ce('div', {
      id: '',
      innerHTML: '<div class="scroll_fix" id="custom_menu_wrap" style="width:' + (lastInnerWidth - 1) + 'px"><div id="custom_menu_cont"></div></div>'
    }))));
  }
  var menuNode = ce('div', {
    id: 'add_media_menu_' + menuId,
    className: 'add_media_menu',
    innerHTML: '<div class="add_media_rows">' + html + '</div>'
  }, {position: 'absolute'}), rowsNode = geByClass1('rows', menuNode, 'div');
  customMenuNode.appendChild(menuNode);

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
    show: function() {
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
            setStyle(el, {position: 'absolute', bottom: '-25px', width: getSize(el.firstChild)[0]});
            setStyle(el.firstChild, {position: 'absolute', bottom: '0px'});
          }
          animate(el, {height: h - 2}, 200, function() {
            setStyle(el.firstChild, {position: 'relative', bottom: ''});
            setStyle(el, {height: '', overflow: '', position: 'static'});
          });
        }
        opts.onShow && opts.onShow();
      }
    },
    _updatePosition: function(visible) {
      var coords = getXY(lnk, mediaMenu.fixed);
      var top = coords[1] - 4 + (browser.msie && browser.version < 8 ? 1 : 0);
      var rowsEl = menuNode.firstChild, more = geByClass1('add_media_more', menuNode);
      if (vk.rtl) {
        var right = (lastInnerWidth - 1) - (coords[0] + getSize(lnk)[0] + 8);
        setStyle(menuNode, {right: right, top: top});
      } else {
        var left = coords[0] - 8 + (browser.msie6 ? 1 : 0);
        setStyle(menuNode, {left: left, top: top});
      }

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
      if (countSize[1] - 25 < top - st && lastWindowHeight + st < top + countSize[1]) {
        setStyle(rowsEl, 'marginTop', -size[1] + 25);
        if (!mediaMenu.reverse) needReverse = true;
      } else {
        setStyle(rowsEl, 'marginTop', -4);//(/mac/.test(_ua) && browser.mozilla ? 22 : 20));
        if (mediaMenu.reverse) needReverse = true;
      }
      if (needReverse) {
        var els = rowsNode.childNodes, len = els.length, el = (mediaMenu.moreWrap || {}).lastChild || {};
        while (len--) {
          rowsNode.appendChild(els[len]);
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
        hideFunc();
      } else {
        _hideTimer = setTimeout(hideFunc, 300);
      }
      opts.onHide && opts.onHide();
    },
    setItems: function(types) {
      for (var f = rowsNode.firstChild, l = rowsNode.lastChild; f != l; f = rowsNode.firstChild, l = rowsNode.lastChild) {
        rowsNode.removeChild(f.className == 'add_media_head' ? l : f);
      }
      var test = '';
      var spec_style = (/mac/.test(_ua) && browser.mozilla) ? {height: 19, paddingTop: 3} : {};
      var moreNode = false;

      var needHide = (types.length > 6 && getLang('global_add_media_more'));
      mediaMenu.moreWrap = false;

      each(types, function(i, v) { // [id, name, bg-position, onclick, href, bg-url, customStyle]

        var attrs = {
          innerHTML: '<nobr>' + v[1].replace(/\s/g, '&nbsp;') + '</nobr>',
          className: 'add_media_type_' + menuId + '_' + v[0] + ' add_media_item'
        }, style = v[6] || {
          backgroundImage: 'url(' + (v[5] || icons) + ')',
          backgroundPosition: (v[2] || '0 0')
        }, row;
        if (opts.bgSize) {
          style.backgroundSize = opts.bgSize;
        }

        if (needHide && i == 3) {
          var rowsEl = menuNode.firstChild;
          var moreWrap = rowsNode.appendChild(ce('div', {
            className: "add_media_more_wrap"
          }));
          addEvent(moreWrap, 'mouseover click', function() {
            clearTimeout(mediaMenu.moreHide);
            if (isVisible(moreWrap.lastChild)) return;
            show(moreWrap.lastChild);
            hide(moreWrap.firstChild);
            if (!mediaMenu.reverse) return;
            var size = getSize(rowsEl);
            setStyle(rowsEl, 'marginTop', -size[1] + 25);
          });
          addEvent(moreWrap, 'mouseout', function () {
            clearTimeout(mediaMenu.moreHide);
            mediaMenu.moreHide = setTimeout(function() {
              hide(moreWrap.lastChild);
              show(moreWrap.firstChild);
              if (!mediaMenu.reverse) return;
              var size = getSize(rowsEl);
              setStyle(rowsEl, 'marginTop', -size[1] + 25);
            }, 300);
          });
          row = moreWrap.appendChild(ce('a', {
            className: 'add_media_more add_media_item',
            innerHTML: '<nobr>'+getLang('global_add_media_more')+'</nobr>'
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
        row = (moreNode ? moreNode : rowsNode).appendChild(ce('a', attrs, style));
        if (v[3]) {
          addEvent(row, 'click', function () {
            mediaMenu.hide(true);
            v[3]();
            return false;
          });
        }
      });
    }
  };

  types && mediaMenu.setItems(types);

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

  cur.destroy.push(function() {
    cleanElems(menuNode);
    re(menuNode);
    removeEvent(lnk, 'click', mediaMenu.show);
  });

  return mediaMenu;
}

var urlActiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0])/i,
    urlInactiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i;

function initAddMedia(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {graffiti: -151, video: -19, photo: 3, audio: -41}, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false, toId = opts.toId || cur.postTo, params = {to_id: toId, scrollbar_width: sbWidth()};
    var preps = {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028};
    switch (v[0]) {
      case 'graffiti':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'al_wall.php?' + ajx2q({act: 'canvas_draw_box', to_id: cur.postTo, widget: 1}), preps);
        }
        break;

      case 'photo':
        handler = function () {
          stManager.add(['page.css'], function() {
            cur.Rpc.callMethod('showBox', 'al_photos.php?' + ajx2q({act: 'choose_photo', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1, widget_width: 590}), preps);
          });
        }
        break;

      case 'video':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'al_video.php?' + ajx2q({act: 'a_choose_video_box', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1}), preps);
        }
        break;

      case 'audio':
        handler = function () {
          stManager.add(['page.css'], function() {
            cur.Rpc.callMethod('showBox', 'al_audio.php?' + ajx2q({act: 'a_choose_audio_box', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1, addCss: 'profile.css'}), preps);
          });
        }
        break;

      default: topError('Unknown type: ' + v[0]);
    }
    var icon = false, bgpos = ('3px ' + bgposes[v[0]] + 'px'), url = false, name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
      cur.showMediaProgress = addMedia.showMediaProgress;
    }
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      previewEl = ge(previewId),
      progressEl;

  var limit = opts.limit || 10,
      multi = limit > 1,
      editable = (!browser.msie || browser.version > 8),
      sortable = (!browser.msie || browser.version > 8);
  val(previewEl, '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + lnkId + '" class="page_pics_preview page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>');
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

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    menu: menu,
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
      if (inArray(type, opts.disabledTypes || [])) {
        return false;
      }
      if (addMedia.attachCount() >= limit && data.upload_ind === undefined && type !== 'postpone') {
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
          preview = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + clean(data.thumb) + '" /></div>';
          toEl = toPics = mpicsEl;
        break;

        /*case 'photos_list':
          hide(this._addMediaLink);
          vkImage().src = data[1];
          oncl = opts.nocl ? '' : ' onclick="return showPhoto(\'' + clean(data[4]) + '\', \'' + clean(data[2]) + '\', ' + clean(data[3].replace(/"/g, '&quot;')) + ');"';
          preview = '<div' + oncl + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + clean(data[1]) + '" /></div>';
          toEl = toPics = picsEl;
        break;*/

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
          if (editable) {
            if (!data.editable) return false;
            if (!opts.nocl) {
              fastXDM.getJSON(function(json) {
                data.editable.click = showPhoto.pbind(media, data.list, json.parse(data.view_opts.replace(/&quot;/g, '"')));
              });
            }
          }

          var _vopts = data.view_opts.replace(/"/g, '&quot;').replace(/^{|}$/g, '');
          if (_vopts) _vopts += ',';
          _vopts += 'queue:1';
          oncl = opts.nocl ? '' : ' onclick="return showPhoto(\'' + media + '\', \'' + data.list + '\', {' + _vopts + '});"';
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
            if (!opts.nocl) data.editable.click = showVideo.pbind(media);
          }

          oncl = opts.nocl ? '' : ' onclick="return showVideo(\'' + clean(media) + '\', false, {queue:1});"';
          preview = '<div' + oncl + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + clean(data.thumb) + '" /></div>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'audio':
          if (!data.info) return false;
          preview = WComments.addAudioPreview(media, data);
          attrs = ' id="pam' + clean(lnkId) + '_audio' + clean(media) + '"';
        break;

        /*case 'app':
          preview = '<div class="app fl_l"><img src="' + clean(data[0]) + '" /><span>' + clean(data[1]) + '</span></div>';
          each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {hide(this);});
        break;

        case 'doc':
          if (!data.lang) return false;
          if (data.thumb && data.thumb_s) {
            preview = '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + clean(data.href) + '" class="fl_l pam_dpic"><div class="page_preview_doc_photo"><img src="' + clean(data.thumb_s) + '" align="center"></div><div class="page_preview_doc_photo_hint">' + clean(data.title) + '</div>';
            postview = '</a><div class="pam_bg"></div>';
            toEl = toPics = dpicsEl;
            attrs = ' id="pam' + clean(lnkId) + '_doc' + clean(media) + '"';
          } else {
            preview = '<a target="_blank" href="' + clean(data.href) + '" class="medadd_h medadd_h_doc inl_bl">' + clean(data.lang.profile_choose_doc) + '</a>';
            postview = '<div class="medadd_c medadd_c_doc"><a target="_blank" href="' + clean(data.href) + '">' + clean(data.title) + '</a></div>';
            attrs = ' id="pam' + clean(lnkId) + '_doc' + clean(media) + '"';
          }
        break;*/

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
          preview = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(data.url) + '" class="medadd_h medadd_h_link inl_bl">' + clean(data.lang.profile_choose_link) + '</a>';
          addMedia.shareData = extend(addMedia.shareData || {}, data, {imagesStyles: ['']});
          toEl = ldocsEl;
        break;

        case 'poll':
          if (!data.lang) return false;
          preview = '<div class="medadd_h medadd_h_poll inl_bl">' + clean(data.lang.q) + '</div>';
          hide(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
          toEl = pdocsEl;
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
          oncl = opts.nocl ? '' : ' href="/album' + clean(media) + '" onclick="return nav.change({z: \'album' + clean(media) + '\'}, event)"';
          var cls = 'fl_l page_preview_album wall_album_cover_wrap' + (data.thumb ? '' : ' wall_album_nocover');
          preview = '<a class="' + cls + '" ' + oncl + '>\
' + (data.thumb ? '<img class="wall_album_cover" src="' + clean(data.thumb) + '"/>' : '') + '\
  <div class="wall_album_caption">\
    <div class="wall_album_title_wrap clear_fix">\
      <div class="wall_album_title fl_l">' + clean(data.title) + '</div>\
      <div class="wall_album_count fl_r">' + clean(data.count) + '</div>\
    </div>\
  </div>\
</a>';
          toPics = 1;
          toEl = picsEl;
        break;

        /*case 'map':
          var lat = data[0].replace(/[^0-9\.]/g, '');
          var lng = data[1].replace(/[^0-9\.]/g, '');
          var providerId =  intval(data[3]);
          preview = '<div class="fl_l"><a onclick="return showBox(\'al_places.php\', {act: \'geo_box\', lat: '+lat+', long: '+lng+', provider: '+providerId+'}, {dark: 1});"><div class="page_media_map_point"></div><img class="page_preview_map" width="180" height="70" src="/maps?lat='+lat+'&lng='+lng+'&z=11&'+(window.devicePixelRatio >= 2 ? 'w=360&h=140' : 'w=180&h=70')+'" /></a></div>';
          toEl = toPics = mpicsEl;
          hide(geByClass1('add_media_type_' + lnkId + '_map', ge('add_media_menu_' + lnkId)));
        break;*/

        /*case 'page':
          if (alreadyTypes.share || alreadyTypes.page || !data.lang) {
            return false;
          }
          var lst = data.media.split('_');
          preview = '<a href="/page' + clean(data.media) + '" onclick="return showWiki({oid: ' + intval(lst[0]) + ', id: ' + intval(lst[1]) + '}, false, event, {queue: 1})" class="medadd_h medadd_h_page inl_bl">' + clean(data.lang.profile_choose_page) + '</a>';
          toEl = ldocsEl;
        break;

        case 'note':
          if (!data.lang) return false;
          preview = '<a onclick="showWiki({w: \'note' + clean(data.raw) + '\', edit: 1}, true, event)" class="medadd_h medadd_h_note inl_bl">' + clean(data.lang.profile_choose_note) + '</a>';
          postview = '<div class="medadd_c medadd_c_note"><a onclick="showWiki({w: \'note' + clean(data.raw) + '\', edit: 1}, true, event)" id="share_note_title' + clean(data.raw) + '">' + clean(data.title) + '</a></div>';
          toEl = ldocsEl;
        break;

        case 'postpone':
          preview = '<div class="medadd_h medadd_h_timer inl_bl">' + clean(data.lang.profile_choose_timer) + '<span id="postpone_preview' + lnkId + '"></span></div>';

          if (cur.editingPost && domPN(ppdocsEl).id == 'wpe_media_preview') {
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
            if (cur.postponedLastDate) {
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
              btn.innerHTML = clean(data['lang']['profile_wall_postpone_btn']);
            }
          }
          hide(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
          toEl = ppdocsEl;
        break;*/
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
              ThumbsEdit.init(toEl, [teMed], {width: opts.teWidth, height: opts.teHeight});
            } else {
              ThumbsEdit.init(toEl, [teMed]);
            }
          }, true);
        } else {
          show(toEl);
          toEl.appendChild(mediaEl);
          if (sortable) {
            if (toEl == docsEl) {
              stManager.add(['sorter.js'], function() {
                if (docsEl.sorter) {
                  sorter.added(docsEl);
                } else if (toEl.childNodes.length > 1) {
                  sorter.init(docsEl, {});
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
        val(previewEl, '<div class="fl_l">' + preview + '</div><div class="x fl_l" onmouseover="showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [0, 3, 3]})" onclick="cur.addMedia[' + lnkId + '].unchooseMedia()"></div>');
        show(previewEl);
        addMedia.chosenMedia = [type, media];
        addMedia.chosenMediaData = data;
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
      if (!cur.fileApiUploadStarted && !cur.preventBoxHide && noboxhide !== true && !inArray(type, ['poll', 'share', 'page', 'postpone'])) {
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
              if (docsEl.childNodes.length > 1) sorter.init(docsEl, {});
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
        if (addMedia.chosenMedia) {
          if ((x = previewEl.firstChild.nextSibling) && x.tt && x.tt.el) {
            x.tt.destroy();
          }
          addMedia.chosenMedia = false;
          addMedia.chosenMediaData = false;
          val(previewEl, '');
          hide(previewEl);
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
        each([addMedia.sharePreview, addMedia.pollPreview, addMedia.postponePreview], function () {re(this);});
        addMedia.sharePreview = addMedia.pollPreview = addMedia.postponePreview = false;
      }

      cur.lastPostMsg = false;

      if (addMedia.onChange) addMedia.onChange(false);
    },
    getMedias: function() {
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
    },
    showMediaProgress: function(type, i, info, cancelFunc) {
      if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
        return false;
      }
      var frac = info.loaded / info.total, percent = intval(frac * 100),
          fileName = info.fileName || info.name || '',
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
</div></div></div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="cur[\'terminate_upload_' + i + '\'](\'' + (fileName || i) + '\');"></div>';

        if (multi) {
          progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'}, {marginTop: '6px'}));
          show(progressEl);
          if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
        } else {
          val(previewEl, progress);
          addMedia.chosenMedia = 'progress';
        }
        prg = ge('upload' + ind + '_progress');
        prg.full = false;//intval(getStyle(prg.parentNode, 'width'));

        cur['terminate_upload_'+i] = function() {
          re('upload' + ind + '_progress_wrap');
          cancelFunc();
        }

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
      // show(previewEl);
    },

    attachCount: function() {
      if (addMedia.attachedCount) {
        return addMedia.attachedCount();
      }
      if (!previewEl) {
        return 0;
      }
      if (!multi) {
        return previewEl.childNodes.length;
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
</div>' + (data.edit ? '' : '<div class="checkbox medadd_c_pollcb' + (data.anon ? ' on' : '') + '" id="create_poll_anonymous' + lnkId + '" onclick="checkbox(this)"><div></div>' + data.lang.c + '</div>')}));
      if (!data.answers) data.answers = [[0, ''], [0, '']];
      cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem inl_bl" '+ (browser.msie ? 'title' : 'tootltip') + '="'+data.lang.d+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
      for (var i = 0, l = data.answers.length; i < l; ++i) {
        ans = data.answers[i];
        html.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
          attrs: (ans[0] ? 'id="create_poll_ans' + ans[0] + '" value="' + ans[1] + '" ' : ''),
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
        var n = hasClass(el, 'medadd_c_pollq') ? domFC(domNS(domNS(el))) : domNS(domPN(el));
        if (n) {
          elfocus(geByTag1('input', n));
        } else {
          this.incPoll();
        }
        return cancelEvent(ev);
      }
    },
    pollData: function() {
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
        notaBene('create_poll_question' + lnkId);
        return false;
      }
      if (!found) {
        if (!domFC(answers)) cur.addMedia[lnkId].incPoll();
        notaBene(domFC(domFC(answers)));
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
      var rx = inactive ? urlInactiveExp : urlActiveExp,
          matches;
      while (message && (matches = message.match(rx))) {
        message = message.substr(matches.index + matches[0].length);
        var url = matches[2],
            query = matches[5] || '',
            initialUrl = url;
        if (!url.match(/^https?:\/\//)) {
          url = 'http://' + url;
        }
        if ((matches[6] || '').length > 1 || inArray(url, addMedia.urlsCancelled) || inArray(initialUrl, addMedia.urlsCancelled)) {
          continue;
        }
        var valid = true;
        if (matches[4].match(/(^|\.|\/\/)vkontakte\.ru|vk\.com/)) {
          valid = query.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video)|w=(page))(-?\d+_)?\d+|\.(jpg|png|gif)$/) ? true : false;
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
        toggle(progressEl, progressEl.childNodes > 0);
        url = addMedia.urlAttachmentLoading[1];
        addMedia.urlAttachmentLoading = false;
        setStyle(bodyNode, {cursor: 'default'});
      }
      if (result) {
        addMedia.chooseMedia(data[0], data[1], data[2], url, true);
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

      each({hash: cur.share_timehash || cur.options.share.timehash || '', index: lnkId, url: url}, function(i, v) {
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
    showPreview: function(fast) {
      var data = addMedia.shareData,
          prev = addMedia.sharePreview || addMedia.addPreview();

      if (data.failed) {
        var html = getLang('page_not_loaded');
      } else {
        var onloadStr = fast ? '' : 'onload="if (this.width < 130) cur.shareShowNext();"';
        var html = (data.images && data.images[cur.shareShowImg]  ? '<img class="medadd_c_linkimg fl_l" src="' + clean(data.images[cur.shareShowImg]) + '" ' + onloadStr + (data.imagesStyles && data.imagesStyles[cur.shareShowImg] || '') + ' />' : '') + (data.title ? '<h4 class="medadd_c_linkhead">' + data.title + '</h4>' : '') + (data.description ? '<div class="medadd_c_linkdsc">' + data.description + '</div>' : '') + '<div class="clear"></div>';
      }

      if (fast) {
        val(domFC(prev), html);
        domFC(prev).style.height = 'auto';
      } else {
        var hidden = !isVisible(ldocsEl);
        show(ldocsEl);
        var tmpDiv = ge(previewId).appendChild(ce('div', {
          innerHTML: '<div class="medadd_c_linkcon">' + html + '</div>'
        }, {
          position: 'absolute',
          width: getSize(prev)[0] - 10,
          visibility: 'hidden'
        }));
        var height = getSize(tmpDiv)[1] - 12;
        re(tmpDiv);

        animate(domFC(prev), {height: height}, 200, function () {
          val(domFC(prev), html);
        });
      }
    },
    showExternalPreview: function () {
      var data = addMedia.shareData;
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

      cur.shareShowNext = function () {
        var tmpImg = vkImage();
        cur.shareShowImg += 1;

        if (cur.shareShowImg > data.images.length - 1) {
          cur.shareShowImg = 0;
        } else if (cur.shareShowImg == 0) {
          for (var i = 1; i < data.images.length - 1; i++) {
            var t = vkImage();
            t.src = data.images[i];
          }
        }
        if (!data.images.length || isEmpty(data.images) || data.images[cur.shareShowImg] === undefined) {
          addMedia.showPreview(fast);
          fast = true;
          return;
        }
        tmpImg.src = data.images[cur.shareShowImg];

        var imgLoadTimeout = setTimeout(function() {
          if (cur.shareImgInterval === true) return;
          data.images.splice(cur.shareShowImg, 1);
          cur.shareShowNext();
        }, 5000);

        var updatePreview = function() {
          if (tmpImg.width || tmpImg.height) {
            var w = tmpImg.width, h = tmpImg.height;
            var imgStyle = '';
            var imgParams = '';
            if (imgLoadTimeout) {
              clearTimeout(imgLoadTimeout);
            }
            clearInterval(cur.shareImgInterval);
            if (w < 20 || h < 20) {
              data.images.splice(cur.shareShowImg, 1);
              if (data.images.length) {
                return setTimeout(cur.shareShowNext, 0);
              }
            } else {
              if (w > h && w > 150) {
                h = 150 * h / w;
                w = 150;
              } else if (h > 150) {
                w = 150 * w / h;
                h = 150;
              }
              imgStyle = 'width: ' + w + 'px; height: ' + h + 'px;';
            }
            if (data.images.length > 1) {
              imgStyle += 'cursor: pointer';
              imgParams = ' onclick="cur.shareShowNext();"';
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
      var ed = (cur.editingPost && domPN(ppdocsEl).id == 'wpe_media_preview'), h = (browser.msie6 || ed) ? '' : '1px', addedhtml = false;
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
      addMedia.postponePreview = ppdocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_timer clear_fix' + (addedhtml ? ' medadd_c_nofixed' : ''), innerHTML: html}));
      addMedia.postponePreview.style.height = h;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'datepicker.css', 'datepicker.js'], function() {
        new Datepicker('postpone_date' + lnkId, {time: 'postpone_time' + lnkId, width: 120, noPast: true});
        if (!browser.msie6 && !ed) {
          animate(addMedia.postponePreview, {height: 33}, 200, function() {
            addMedia.postponePreview.style.height = '';
          });
        }
      });
    },

    destroy: function() {
      if (docsEl.sorter) {
        docsEl.sorter.destroy();
      }
      if (dpicsEl.qsorter) {
        dpicsEl.qsorter.destroy();
      }
    },
    qsorterOpts: function() {
      return {
        xsize: Math.floor(dpicsEl.offsetWidth / 110),
        width: 110,
        height: 83,
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
  return addMedia;
}
function goAway(url) { return true; }
function gotSession (session_data) {
  location.reload();
}
function showPhoto(photo, list) {
  var h = 607, w = 607;

  cur.Rpc.callMethod('showBox', 'al_photos.php?' + ajx2q({act: 'photo_box', photo: photo, wall_owner: photo.split('_')[0], widget: 1, list: list, widget_width: 654, widget: 1}), {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028});
  return false;
}

function showVideo(video, list) {
  revertLastInlineVideo();
  cur.Rpc.callMethod('showBox', 'al_video.php?' + ajx2q({act: 'video_box', video: video, list: list, wall_owner: video.split('_')[0], widget_width: 654, widget: 1}), {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028});
  return false;
}


function showCaptchaBox (sid, dif, box, o) {
  var difficulty = intval(dif) ? '' : '&s=1';
  var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
  cur.Rpc.callMethod('showBox', 'al_apps.php?' + ajx2q({act: 'show_captcha_box', sid: sid, src: imgSrc, need_mobile: window.need_mobile_act == 1 ? 1 : 0, widget: 1, widget_width: 322}), {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028});
  cur.RpcMethods.captcha = o.onSubmit;
  cur.RpcMethods.captchaHide = o.onHide;
}

try{stManager.done('api/widgets/al_comments.js');}catch(e){}


// Tiny Scrollbars start
function Scrollbar(obj, options) {
  this.obj = obj = ge(obj);
  this.options = options || {};
  this.clPref = options.prefix || '';
  this.isHorizontal = options.horizontal;
  this.scrollProp = this.isHorizontal ? 'scrollLeft' : 'scrollTop';
  this.scrollDimensionProp = this.isHorizontal ? 'scrollWidth' : 'scrollHeight';

  setTimeout((function() {
    setStyle(obj, {
      overflow: 'hidden'
    });

    var size = getSize(obj), s;

    if (this.isHorizontal) {
      s = {
        marginTop: (size[1] + 2)+'px',
        width: size[0] + 'px'
      };
    } else {
      s = {
        marginLeft: (size[0] - (options.mlDiff || 7))+'px',
        height: size[1] + 'px'
      }
    }

    if (options.nomargin) {
      delete s.marginLeft;
      s.right = options.right || 0;
      s.left = options.left || 0;
    }
    this.scrollWidth = size[0];
    this.scrollHeight = size[1];

    this.scrollbar = ce('div', {
      className: this.clPref + 'scrollbar_cont'
    });
    setStyle(this.scrollbar, s);

    this.inner = ce('div', {
      className: this.clPref + 'scrollbar_inner'
    });
    this.scrollbar.appendChild(this.inner);

    if (options.shadows) {
      obj.parentNode.insertBefore(this.topShadowDiv = ce('div', {
        className: this.clPref + 'scrollbar_top'
      }, {width: size[0]}), obj);
      obj.parentNode.insertBefore(this.bottomShadowDiv = ce('div', {
        className: this.clPref + 'scrollbar_bottom'
      }, {width: size[0]}), obj.nextSibling);
    }

    obj.parentNode.insertBefore(this.scrollbar, obj);

    this.destroyList = [];

    this.mouseMove = this._mouseMove.bind(this);
    this.mouseUp = this._mouseUp.bind(this);
    var self = this;
    function down(event) {
      if (self.moveY || checkEvent(event)) return;
      addEvent(window.document, 'mousemove', self.mouseMove);
      addEvent(window.document, 'mouseup', self.mouseUp);
      if (self.isHorizontal) {
        self.moveX = event.pageX - (self.inner.offsetLeft || 0);
      } else {
        self.moveY = event.pageY - (self.inner.offsetTop || 0);
      }

      window.document.body.style.cursor = 'pointer';
      addClass(self.inner, self.clPref + 'scrollbar_hovered');
      if (options.startDrag) {
        options.startDrag();
      }
      if (options.onHold) {
        options.onHold(true);
      }
      self.isDown = true;
      return cancelEvent(event);
    }
    this.mouseDown = down;
    function keydown(event) {
      switch ((event || window.event).keyCode) {
        case 40:  self.obj[self.scrollProp] += 40; break;
        case 38:  self.obj[self.scrollProp] -= 40; break;
        case 34:  self.obj[self.scrollProp] += self[self.scrollDimensionProp]; break;
        case 33:  self.obj[self.scrollProp] -= self[self.scrollDimensionProp]; break;
        default: return true;
      }
      self.update(true);
      return cancelEvent(event);
    }
    var wheel = this.wheel.bind(this);
    addEvent(obj, 'mousewheel', wheel);
    addEvent(obj, 'DOMMouseScroll', wheel);
    if (options.scrollElements) {
      for (var i in options.scrollElements) {
        addEvent(options.scrollElements[i], 'mousewheel', wheel);
        addEvent(options.scrollElements[i], 'DOMMouseScroll', wheel);
      }
    }
    addEvent(this.scrollbar, 'mousewheel', wheel);
    addEvent(this.scrollbar, 'DOMMouseScroll', wheel);

    addEvent(this.scrollbar, 'mouseover', this.contOver.bind(this));
    addEvent(this.scrollbar, 'mouseout', this.contOut.bind(this));
    addEvent(this.scrollbar, 'mousedown', this.contDown.bind(this));

    if (browser.safari_mobile) {
      var touchstart = function(event) {
        if (self.isHorizontal) {
          cur.touchX = event.touches[0].pageX;
        } else {
          cur.touchY = event.touches[0].pageY;
        }
      };
      var touchmove = function(event) {
        if (self.isHorizontal) {
          var touchX = event.touches[0].pageX;
          cur.touchDiff = cur.touchX - touchX;
          obj.scrollLeft += cur.touchDiff;
          cur.touchX = touchX;
          if (obj.scrollLeft > 0 && self.shown !== false) {
            self.update(true);
          }
        } else {
          var touchY = event.touches[0].pageY;
          cur.touchDiff = cur.touchY - touchY;
          obj.scrollTop += cur.touchDiff;
          cur.touchY = touchY;
          if (obj.scrollTop > 0 && self.shown !== false) {
            self.update(true);
          }

          return cancelEvent(event);
        }
      };
      var touchend = function() {
        cur.animateInt = setInterval(function() {
          cur.touchDiff = cur.touchDiff * 0.9;
          if (cur.touchDiff < 1 && cur.touchDiff > -1) {
            clearInterval(cur.animateInt);
          } else {
            obj[self.scrollProp] += cur.touchDiff;
            self.update(true);
          }
        }, 0);
      };
      addEvent(obj, 'touchstart', touchstart);
      addEvent(obj, 'touchmove', touchmove);
      addEvent(obj, 'touchend', touchend);

      this.destroyList.push(function() {
        removeEvent(obj, 'touchstart', touchstart);
        removeEvent(obj, 'touchmove', touchmove);
        removeEvent(obj, 'touchend', touchend);
      });
    }

    addEvent(this.inner, 'mousedown', down);
    if (!options.nokeys) {
      addEvent(window, 'keydown', keydown);
    } else {
      this.onkeydown = keydown;
    }


    this.destroyList.push(function() {
      removeEvent(obj, 'mousewheel', wheel);
      removeEvent(obj, 'DOMMouseScroll', wheel);
      if (options.scrollElements) {
        for (var i in options.scrollElements) {
          removeEvent(options.scrollElements[i], 'mousewheel', wheel);
          removeEvent(options.scrollElements[i], 'DOMMouseScroll', wheel);
        }
      }
      removeEvent(self.inner, 'mousedown', down);
      removeEvent(window, 'keydown', keydown);
    });

    if (!this.isHorizontal) {
      if (this.contHeight() <= this.scrollHeight) {
        hide(this.bottomShadowDiv);
      } else {
        this.bottomShadow = true;
      }
    }
    this.inited = true;
    this.update(true);

    if (!options.global) {
      cur.destroy.push(this.destroy.bind(this));
    }
  }).bind(this), 0);
}

Scrollbar.prototype.contOver = function() {
  this.isOut = false;
  if (this.shown) {
    addClass(this.scrollbar, 'scrollbar_c_overed');
  }
}
Scrollbar.prototype.contOut = function() {
  this.isOut = true;
  if (this.isDown) return;
  removeClass(this.scrollbar, 'scrollbar_c_overed');
}
Scrollbar.prototype.contDown = function(ev) {
  var v, srcH, newScroll;
  if (this.isHorizontal) {
    v = ev.offsetX - this.innerWidth / 2 + 5;
    scrH = this.scrollWidth - this.innerWidth;

    newScroll = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, v / scrH));
    this.obj.scrollLeft = newScroll;
  } else {
    v = ev.offsetY - this.innerHeight / 2 + 5;// - this.innerHeight;
    scrH = this.scrollHeight - this.innerHeight;

    newScroll = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, v / scrH));
    this.obj.scrollTop = newScroll;
  }

  this.update(true);
  this.mouseDown(ev);
}

Scrollbar.prototype._mouseMove = function(event) {
  var newScroll;
  if (this.isHorizontal) {
    newScroll = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, (event.pageX - this.moveX) / (this.scrollWidth - this.innerWidth - 6)));
    if (this.options.onScroll) {
      this.options.onScroll(this.obj.scrollLeft - newScroll);
    }
    this.obj.scrollLeft = newScroll;
  } else {
    newScroll = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, (event.pageY - this.moveY) / (this.scrollHeight - this.innerHeight - 6)));
    if (this.options.onScroll) {
      this.options.onScroll(this.obj.scrollTop - newScroll);
    }
    this.obj.scrollTop = newScroll;
  }
  this.update(true);
  return false;
}

Scrollbar.prototype._mouseUp = function(event) {
  this.moveY = false;
  this.moveX = false;
  this.isDown = false;
  if (this.isOut) {
    this.contOut();
  }
  removeEvent(window.document, 'mousemove', this.mouseMove);
  removeEvent(window.document, 'mouseup', this.mouseUp);
  window.document.body.style.cursor = 'default';
  removeClass(this.inner, this.clPref + 'scrollbar_hovered');
  if (this.options.stopDrag) {
    this.options.stopDrag();
  }
  if (this.options.onHold) {
    this.options.onHold(false);
  }
  return false;
}

Scrollbar.prototype.wheel = function(event) {
  if (this.disabled) {
    return;
  }
  if (!event) event = window.event;
  var delta = 0, stWas;

  if (event.wheelDeltaY || event.wheelDelta) {
    delta = (event.wheelDeltaY || event.wheelDelta) / 2;
  } else if (event.detail) {
    delta = -event.detail * 10
  }

  stWas = this.obj[this.scrollProp];
  this.obj[this.scrollProp] -= delta;

  if (this.options.onScroll) {
    this.options.onScroll(delta);
  }

  if (stWas != this.obj[this.scrollProp] && this.shown !== false) {
    this.update(true);
    addClass(this.inner, this.clPref + 'scrollbar_hovered');
    clearTimeout(this.moveTimeout);
    this.moveTimeout = setTimeout((function() {
      removeClass(this.inner, this.clPref + 'scrollbar_hovered');
    }).bind(this), 300);
  }
  if (this.shown || this.options.forceCancelEvent) {
    if (this.isHorizontal && stWas == this.obj[this.scrollProp]) {
      // no op
    } else {
      return false;
    }
  }
}

Scrollbar.prototype.hide = function(anim) {
  hide(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar)
  this.hidden = true;
}
Scrollbar.prototype.show = function(anim) {
  show(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar)
  this.hidden = false;
}
Scrollbar.prototype.disable = function() {
  this.hide();
  this[this.scrollProp](0);
  this.disabled = true;
}
Scrollbar.prototype.enable = function() {
  this.show();
  this.update();
  this.disabled = false;
}

Scrollbar.prototype.scrollTop = function(top) {
  this.obj.scrollTop = parseInt(top);
  this.update(false, true);
}

Scrollbar.prototype.scrollLeft = function(left) {
  this.obj.scrollLeft = parseInt(left);
  this.update(false, true);
}

Scrollbar.prototype.destroy = function(top) {
  each(this.destroyList, function (k, f) {f();});
}

Scrollbar.prototype.contHeight = function() {
  if (this.options.contHeight) {
    return this.options.contHeight;
  }
  if (this.contHashCash) {
    return this.contHashCash;
  }
  var nodes = this.obj.childNodes;
  var height = 0;
  var i = nodes.length;
  while (i--) {
    height += nodes[i].offsetHeight || 0;
  }
  this.contHashCash = height;
  return height;
}

Scrollbar.prototype.contWidth = function() {
  if (this.options.contWidth) {
    return this.options.contWidth;
  }
  if (this.contHashWidthCash) {
    return this.contHashWidthCash;
  }
  var nodes = this.obj.childNodes;
  var width = 0;
  var i = nodes.length;
  while (i--) {
    width += nodes[i].offsetWidth || 0;
  }
  this.contHashWidthCash = width;
  return width;
}

Scrollbar.prototype.val = function(value) {
  if (value) {
    this.obj[this.scrollProp] = value;
    this.update(true, true);
  }
  return this.obj[this.scrollProp];
}

Scrollbar.prototype.update = function(noChange, updateScroll) {
  if (!this.inited || this.hidden) {
    return;
  }
  if (!noChange) {
    this.contHashCash = false;
    this.contHashWidthCash = false;
    if (this.moveY && !this.isHorizontal) {
      return true;
    } else if (this.moveX) {
      return true;
    }
  }
  if (updateScroll) {
    var size = getSize(this.obj);
    if (this.isHorizontal) {
      this.scrollWidth = size[0];
      setStyle(this.scrollbar, 'width', size[0]);
    } else {
      this.scrollHeight = size[1];
      setStyle(this.scrollbar, 'height', size[1]);
    }
  }
  var height = this.contHeight();
  var width = this.contWidth();
  if (!this.isHorizontal && height <= this.scrollHeight) {
    hide(this.inner, this.bottomShadowDiv, this.topShadowDiv);
    setStyle(this.scrollbar, {pointerEvents: 'none'});
    this.topShadow = this.bottomShadow = false;
    this.shown = false;
    return;
  } else if (this.isHorizontal && width <= this.scrollWidth) {
    hide(this.inner, this.bottomShadowDiv, this.topShadowDiv);
    setStyle(this.scrollbar, {pointerEvents: 'none'});
    this.topShadow = this.bottomShadow = false;
    this.shown = false;
    return;
  } else if (!this.shown) {
    show(this.inner);
    setStyle(this.scrollbar, {pointerEvents: 'auto'});
    this.shown = true;
  }

  var progress;

  if (this.isHorizontal) {
    var leftScroll = this.val();
    if (this.options.scrollChange) {
      this.options.scrollChange(leftScroll);
    }
    progress = this.lastProgress = Math.min(1, leftScroll / (width - this.scrollWidth));
  } else {
    var topScroll = this.val();
    if (this.options.scrollChange) {
      this.options.scrollChange(topScroll);
    }
    progress = this.lastProgress = Math.min(1, topScroll / (height - this.scrollHeight));
  }

  if (progress > 0 != (this.topShadow ? true : false)) {
    (this.topShadow ? hide : show)(this.topShadowDiv);
    this.topShadow = !this.topShadow;
  }
  if (progress < 1 != (this.bottomShadow ? true : false)) {
    (this.bottomShadow ? hide : show)(this.bottomShadowDiv);
    this.bottomShadow = !this.bottomShadow;
  }

  if (this.isHorizontal) {
    this.innerWidth = Math.max(40, Math.floor(this.scrollWidth * this.scrollWidth / width));
    this.inner.style.width = this.innerWidth + 'px';
    this.inner.style.marginLeft = Math.floor((this.scrollWidth - this.innerWidth - 4) * progress + 2) + 'px';
  } else {
    this.innerHeight = Math.max(40, Math.floor(this.scrollHeight * this.scrollHeight / height));
    this.inner.style.height = this.innerHeight + 'px';
    this.inner.style.marginTop = Math.floor((this.scrollHeight - this.innerHeight - 4) * progress + 2) + 'px';
  }

  if (this.options.more && isFunction(this.options.more) && (this.options.contHeight || (height - this.obj[this.scrollProp] < this[this.scrollDimensionProp] * 2))) {
    this.options.more();
  }
}
// Tiny Scrollbars end



/* Inline video from common.js */
window._videoLastInlined = false;
function showInlineVideo(videoId, listId, options, ev, thumb) {
  if (checkEvent(ev)) return true;

  if (window.mvcur && mvcur.mvShown) {
    return showVideo(videoId, listId, options, ev);
  }

  options = options || {};
  options.params = options.params || {act: 'show_inline', video: videoId, list: listId, autoplay: (options.autoplay) ? 1 : 0, module: options.module || cur.module || '_ac'};
  var h = thumb.clientHeight,
      w = thumb.clientWidth,
      btn = geByClass1('video_play_inline', thumb, 'div');

  if (!trim(options.params.module) && window.nav) {
    extend(options.params, { _nol: JSON.stringify(nav.objLoc) });
  }

  extend(options.params, {width: w, height: h});
  options.onDone = function (title, html, js, opts) {
    revertLastInlineVideo();
    hide(thumb);
    var videoWrap = ce('div', {id: 'page_video_inline_wrap' + videoId, className: 'page_video_inline_wrap', innerHTML: html}, {width: w, height: h}),
        videoBg = ge('video_background' + videoId);
    _videoLastInlined = [videoWrap, thumb]
    thumb.parentNode.appendChild(videoWrap);
    videoBg && setStyle(geByTag1('img', videoBg), {width: w, height: h});
    try {
      eval('(function () {' + js + '})();');
    } catch (e) {
      debugLog('video inline error', e.message, e.stack, e, js);
    }
    var _n = window.Notifier, _a = window.audioPlayer;
    if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
    if (_a && _a.player && !_a.player.paused()) {
      _a.pauseTrack();
      _a.pausedByVideo = 1;
    }
  };
  options.showProgress = function () {
    addClass(btn, 'video_play_inline_loading');
  };
  options.hideProgress = function () {
    removeClass(btn, 'video_play_inline_loading');
  };
  ajax.post('al_video.php', options.params, options);
  return false;
}

function revertLastInlineVideo() {
  if (!window._videoLastInlined) {
    return;
  }
  re(_videoLastInlined[0]);
  show(_videoLastInlined[1]);
  _videoLastInlined = false;
}

function showWiki(likeInfo) {
  likeInfo = likeInfo['w'].split('/');
  if (likeInfo[0] != 'likes') {
    return false;
  }
  WComments.showLikesBox(likeInfo[1]);
}

var oldShowBox = showBox;
function showBox(url, params, options, e) {
  var allowed = {}
  allowed['like.php'] = 'publish_box';
  if (!allowed[url] || params.act != allowed[url]) {
    return oldShowBox(url, params, options, e);
  }

  params.widget = cur.widgetHash;
  cur.Rpc.callMethod('showBox', url+'?' + ajx2q(params), {height: window.outerHeight || screen.availHeight || 768, width: window.outerWidth || screen.availWidth || 1028});
}
