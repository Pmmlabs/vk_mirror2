var WComments = {

  init: function (options) {
    extend(cur, {
      options: options,
      oid: options.user_id,
      postTo: options.user_id,
      heightEl: geByClass1('_wcomments_page'),
      countEl: geByClass1('_wcomments_count'),
      contentEl: geByClass1('_wcomments_content'),
      section: options.section,
      noAwayCheck: true,
      sendPostBtn: ge('send_post'),
      postsEl: ge('wcomments_posts'),
      postsOuterEl: geByClass1('_wcomments_posts_outer'),
      wallType: 'widget_comments',
      onReplyFormSizeUpdate: WComments.contentUpdated.bind(WComments, false),
      onEditFormSizeUpdate: WComments.contentUpdated.bind(WComments, false)
    });

    cur.options.filter_media_types = cur.options.media_types || [];

    this.override('lite.js');
    this.override('page.js');
    this.override('emoji.js');
    this.override('ui_media_selector.js', true);

    stManager.emitter.addListener('update', this.override.bind(this));

    this.updateSize();

    if (options.is_auto || options.is_nano) {
      extend(options, {
        media_opts: {
          hideAfterCount: 0,
          maxShown: 0
        }
      });
    }

    Wall.init(options);

    if (options.fixed_height) {
      setStyle(cur.postsOuterEl, {
        maxHeight: options.fixed_height - getSize(geByClass1('_wcomments_head'))[1] - getSize(geByClass1('_wcomments_form'))[1]
      });
      cur.scrollbar = new uiScroll(cur.postsOuterEl, {
        hidden: 1,
        onmore: this.showMore.bind(this),
        ondragstart: function() {cur.Rpc.callMethod('startDrag')},
        ondragstop: function() {cur.Rpc.callMethod('stopDrag')}
      });
      cur.mouseMove = cur.scrollbar.ondrag.bind(cur.scrollbar);
      cur.mouseUp = cur.scrollbar.ondragstop.bind(cur.scrollbar)
    } else {
      cur.mouseMove = function() {};
      cur.mouseUp = function() {};
    }

    options.qtransport && this.initQTransport(options.qtransport);

    // Times update interval. For relative time correction
    timeUpdateInt = setInterval(this.updateTimes.bind(this), 10000);

    cur.RpcMethods = {
      onInit: function() {
        var resizeWidget = this.resizeWidget.bind(this);
        setTimeout(resizeWidget, 0);
        setTimeout(resizeWidget, 500);
      }.bind(this),

      updateStickers: function() {
        window.emojiStickers = false;
        window.Emoji && Emoji.updateTabs();
      },

      mouseMove: cur.mouseMove,

      mouseUp: cur.mouseUp,

      chooseMedia: function() {
        var args = cleanObj(this.uncleanObj([].slice.call(arguments)));
        cur.chooseMedia.apply(cur.chooseMedia, args);
        setTimeout(this.resizeWidget.bind(this), 0);
      }.bind(this),

      showMediaProgress: function() {
        var args = cleanObj([].slice.call(arguments));
        cur.showMediaProgress.apply(cur.showMediaProgress, args);
      },

      likeFullUpdate: function() {}
    };

    try {
      cur.Rpc = new fastXDM.Client(cur.RpcMethods, {safe: true});
      cur.resizeInt = setInterval(this.resizeWidget.bind(this), 1000);
    } catch (e) {
      debugLog(e);
    }

    if (!options.user_id) {
      addEvent('send_post', 'click', Widgets.oauth.bind(Widgets));
      addEvent('post_field', 'click', Widgets.oauth.bind(Widgets));
    }
  },

  uncleanObj: function(data) {
    if (isObject(data)) {
      var dataUncleaned = {};
      for(var i in data) {
        dataUncleaned[i.replace(/[^a-zA-Z0-9_\-]/g, '')] = this.uncleanObj(data[i]);
      }
    } else if (isArray(data)) {
      var dataUncleaned = [];
      for(var i in data) {
        dataUncleaned.push(this.uncleanObj(data[i]));
      }
    } else {
      var type = typeof(data);
      if (type == 'number' || type == 'boolean' || type == 'function') {
        var dataUncleaned = data;
      } else {
        var dataUncleaned = unclean(data);
      }
    }
    return dataUncleaned;
  },

  getSectionParams: function () {
    var params = {
      app: cur.options.app,
      width: cur.options.width,
      startWidth: cur.options.startWidth,
      limit: cur.options.limit
    };
    switch (cur.section) {
      case 'admin_browse':
        params.act = 'admin_browse';
        break;

      case 'admin_bl':
        params.act = 'admin_bl';
        params.limit = 15;
        break;

      case 'admin_updates':
        params.act = 'admin_updates';
        break;

      case 'browse':
        params.browse = 1;
        params.replies = cur.options.replies;
        break;

      default: // posts
        params.page_query = cur.options.page_query;
        params.part = 1;
    }
    return params
  },

  contentUpdated: function(options) {
    options && this.applyOptions(options);
    this.resizeWidget();
  },

  applyOptions: function (options) {
    if (options.reply_names) {
      cur.options.reply_names = extend(cur.options.reply_names || {}, options.reply_names);
      delete options.reply_names;
    }
    if (options.head_count && cur.section != 'browse') {
      val(geByClass1('_wcomments_count'), options.head_count);
      delete options.head_count;
    }
    if (options.script) {
      eval(options.script);
      delete options.script;
    }
    extend(cur.options, options);
    toggle(geByClass1('_wcomments_more'), options.offset < options.count);
  },

  updateSize: function self(size) {
    var width = (size ? size : getSize('page_wrap'))[0];
    setStyle(cur.heightEl, {'width': width}); // need for scroll

    if (cur.options.is_auto) {
      var isMini = cur.options.mini == 1 || cur.options.mini != 0 && width < 630,
        isNano = isMini && width < 380;
      if (self.size != isMini+''+isNano) {
        self.size = isMini+''+isNano;
        replaceClass(bodyNode, 'wcomments_mini wcomments_nano', (isMini ? 'wcomments_mini ' : '')+(isNano ? 'wcomments_nano ' : ''));
      }
    }
  },

  resizeWidget: function self() {
    if (!cur.heightEl || !cur.Rpc) return;
    var size = getSize('page_wrap');
    if (browser.msie && !browser.msie8 || browser.opera) size[1] += 15;
    window.onBodyResize && onBodyResize();
    if (self.size != size.join(' ')) {
      self.size = size.join(' ');
      this.updateSize(size);
      cur.Rpc.callMethod('resize', size[1]);
    }
  },

  showMore: function () {
    if (cur.switchingSection) return;
    var moreBtn = geByClass1('_wcomments_more');
    if (cur.options.offset >= cur.options.count) return hide(moreBtn);
    if (buttonLocked(moreBtn)) return;

    ajax.post('al_widget_comments.php', extend(WComments.getSectionParams(), {
        offset: cur.options.offset,
        width: cur.options.width,
        startWidth: cur.options.startWidth,
        part: 1
    }), {
      onDone: function (options, rows) {
        ge('wcomments_posts').appendChild(cf(rows));
        WComments.contentUpdated(options);
      },
      showProgress: lockButton.pbind(moreBtn),
      hideProgress: unlockButton.pbind(moreBtn)
    });
  },

  switchSection: function (section) {
    if (cur.switchingSection || cur.section == section) return false;
    cur.switchingSection = true;

    var tabs = uiTabs && geByClass1('_wcomments_admin_tabs'),
      tab = tabs && geByClass1('_' + section);

    if (section == 'posts' || cur.section == 'posts') {
      addClass(cur.contentEl, 'wcomments_content_loading');
    } else {
      tabs && uiTabs.showProgress(tabs);
    }
    tab && uiTabs.switchTab(geByClass1('ui_tab', tab));
    cur.section = section;

    ajax.post('al_widget_comments.php', WComments.getSectionParams(), {
      onDone: function (options, rows) {
        val(cur.postsEl, rows);
        tabs && uiTabs.hideProgress(tabs);
        removeClass(cur.contentEl, 'wcomments_content_loading');
        replaceClass(cur.heightEl, 'wcomments_section_posts wcomments_section_admin_browse wcomments_section_admin_bl wcomments_section_admin_updates wcomments_section_browse', 'wcomments_section_' + section);
        cur.options.fixed_height && setStyle(cur.postsOuterEl, {
          maxHeight: cur.options.fixed_height - getSize(geByClass1('_wcomments_head'))[1] - getSize(cur.section == 'posts' || cur.section == 'browse' ? geByClass1('_wcomments_form') : geByClass1('_wcomments_admin_tabs'))[1]
        });
        cur.switchingSection = false;
        cur.scrollbar && cur.scrollbar.scrollTop();
        WComments.contentUpdated(options);
      }
    });

    return false;
  },

  addToBl: function (mid, hash, action) {
    if (hasClass(action, 'wcomments_bl_action_loading')) return false;

    ajax.post('al_widget_comments.php', {
      act: 'a_add_to_bl',
      id: mid,
      hash: hash,
      app: cur.options.app
    }, {
      onDone: function() {
        hide(geByClass1('_wcomments_bl_label_' + mid));
        action.onclick = WComments.delFromBl.bind(WComments, mid, hash, action);
        val(action, getLang('widgets_remove_from_banlist'));
      },
      showProgress: addClass.pbind(action, 'wcomments_bl_action_loading'),
      hideProgress: removeClass.pbind(action, 'wcomments_bl_action_loading')
    });
  },

  delFromBl: function (mid, hash, action) {
    if (hasClass(action, 'wcomments_bl_action_loading')) return false;

    ajax.post('al_widget_comments.php', {
      act: 'a_del_from_bl',
      id: mid,
      hash: hash,
      app: cur.options.app
    }, {
      onDone: function() {
        setStyle(geByClass1('_wcomments_bl_label_' + mid), 'display', 'inline');
        action.onclick = WComments.addToBl.bind(WComments, mid, hash, action);
        val(action, getLang('widgets_restore_to_banlist'));
      },
      showProgress: addClass.pbind(action, 'wcomments_bl_action_loading'),
      hideProgress: removeClass.pbind(action, 'wcomments_bl_action_loading')
    });
  },

  updateTimes: function(cont) {
    if (!(cur.lang || {}).wall_X_seconds_ago_words) {
      return;
    }
    var timeNow = intval(vkNow() / 1000), toClean = [];
    timeNow -= cur.tsDiff;
    each(geByClass('rel_date_needs_update', cont || ge('wcomments_posts'), 'span'), function(k, v) {
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

  langWordNumeric: function(num, words, arr) {
    if (isArray(words) && num < words.length) {
      return words[num];
    }
    return langNumeric(num, arr);
  },

  showLikesBox: function (obj, params) {
    showBox('widget_like.php', extend({
      act: 'a_stats_box',
      app: cur.options.app,
      obj: obj,
      from: 'wcomments',
      check_hash: cur.likeCheckHash,
      widget_width: 638
    }, params || {}));
  },

  deleteAllAndBan: function (post_id, mid, hash, btn) {
    ajax.post('al_widget_comments.php', {
      act: 'a_add_to_bl',
      id: mid,
      hash: hash,
      app: cur.options.app
    }, {
      onDone: function (response, earliest_post_id) {
        earliest_post_id && each(geByClass('wcomments_post', ge('wcomments_posts'), 'div'), function() {
          !this.id.indexOf('post' + mid) && this.id.split('_')[1] >= earliest_post_id && this.id != 'post' + post_id && isVisible(this) && hide(this);
        });
        ge('post_del' + post_id).innerHTML = response;
        WComments.contentUpdated();
      },
      showProgress: function () {
        lockButton(btn);
      },
      hideProgress: function () {
        unlockButton(btn);
      }
    });
  },

  initQTransport: function (options) {
    window.curNotifier = extend(options, {
      lp_connected: false,
      error_timeout: 1,
      addQueues: {},
      recvClbks: {},
      recvData: {},
      onConnectionId: []
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

    cur.saveScrollPosition = cur.scrollbar && cur.scrollbar.data.scrollTop > 100;
    each(response.events, function (k, v) {
      WComments.eventsParse(v);
    });

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

  /* Resize post content for pushed updates */

  resizePostSizedThumbs: function(meshEl, widthTo, marginFrom, heightTo, auto) {
    var tileEls = geByClass('page_post_thumb_wrap', meshEl),
      lines = [],
      widthTaken = 0,
      heightTaken = 0,
      Line = function() {
        line && lines.push(line);
        widthTaken = heightTaken = 0;
        extend(this, {
          tiles:[],
          height: 0,
          x: 0,
          y: 0
        });
      },
      Tile = function(tileEl) {
        if (!tileEl) return;
        extend(this, {
          el: tileEl,
          lastRow: hasClass(tileEl, 'page_post_thumb_last_row'),
          lastColumn: hasClass(tileEl, 'page_post_thumb_last_column'),
          width: intval(tileEl.style.width),
          height: intval(tileEl.style.height)
        })
      },
      line = new Line(),
      widthFrom = positive(meshEl.style.width),
      heightFrom = positive(meshEl.style.height),
      heightToTaken = 0;

    // decrease size only
    if (widthTo > widthFrom) widthTo = null;
    if (heightTo > heightFrom || auto && tileEls.length > 1) heightTo = null;

    if (!heightTo && widthTo) {
      heightTo = Math.round(heightFrom * (widthTo / widthFrom));
    } else if (heightTo && !widthTo) {
      widthTo = Math.round(widthFrom * (heightTo / heightFrom));
    } else if (widthTo && heightTo) {
      if (auto) {
        heightTo = Math.min(heightTo, Math.round(heightFrom * (widthTo / widthFrom)));
        widthTo = Math.round(widthFrom * (heightTo / heightFrom));
      }
    } else {
      return;
    }

    // allocate tiles into lines
    each(tileEls, function(i, tileEl) { // works only if first tile in line is higher or equal to others!
      var tile = tileEl.tile || new Tile(tileEl),
        nextTile = new Tile(tileEls[i + 1]);

      line.height = Math.max(line.height, tile.height);

      if (widthFrom - widthTaken >= tile.width / 2) { // tile is next to the right in the line
        widthTaken += tile.width + (tile.lastColumn ? 0 : marginFrom);
        heightTaken = tile.height;

        tile.x = line.x;
        tile.y = line.y = 0;
        line.tiles.push(tile);

        if (tile.lastColumn) {
          if (!nextTile || !(nextTile.lastColumn && line.height - heightTaken >= nextTile.height / 2)) { // last tile in line
            line = new Line();
          }
        } else {
          line.x++;
        }
      } else if (tile.lastColumn && line.height - heightTaken >= tile.height / 2) { // vertically stacked tile
        heightTaken += tile.height + marginFrom;

        tile.x = line.x;
        tile.y = ++line.y;
        line.tiles.push(tile);

        if (tile.lastRow || !nextTile || !(nextTile.lastColumn && line.height - heightTaken >= nextTile.height / 2)) {
          line.height = Math.max(line.height, heightTaken);
          line = new Line();
        }
      }
    });

    // resize tiles
    each(lines, function(i, line) {
      var widthTaken = 0,
        heightTaken = 0,
        scaleX = (widthTo - (marginFrom * line.x)) / (widthFrom - (marginFrom * line.x)),
        scaleY = (heightTo - (marginFrom * line.y)) / (heightFrom - (marginFrom * line.y)),
        lineHeightTo = lines.length - 1 == i ? heightTo - heightToTaken : Math.round(line.height * scaleY),
        tileWidthTo = 0,
        tileHeightTo = 0;

      heightToTaken += lineHeightTo + marginFrom;

      each(line.tiles, function(i, tile) {
        if (tile.x < line.x) { // not one tile width line
          tileWidthTo = Math.round(tile.width * scaleX);
          widthTaken += tileWidthTo + marginFrom;
          if (!tile.y) { // one tile height line
            tileHeightTo = lineHeightTo;
          }
        } else if (tile.lastColumn) { // right edge tile
          tileWidthTo = widthTo - widthTaken;
          if (tile.y == line.y) { // bottom right corner tile
            tileHeightTo = lineHeightTo - heightTaken;
          } else {
            tileHeightTo = Math.round(tile.height * scaleY);
            heightTaken += tileHeightTo + marginFrom;
          }
        }
        setStyle(tile.el, {
          width: tileWidthTo,
          height: tileHeightTo
        });
      });
    });

    setStyle(meshEl, {
      width: widthTo,
      height: heightTo
    });

    return [widthTo, heightTo];
  },

  resizePostAlbumWrap: function(albumEl, widthTo, marginFrom, prefix) {
    if (!prefix) prefix = '';
    var widthFrom = positive(albumEl.style.width),
      thumbEl = geByClass1('page'+prefix+'_album_thumb_wrap', albumEl, 'div'),
      sideMeshEl = domFC(geByClass1('page'+prefix+'_album_photos', albumEl, 'div')),
      bottomMeshEl = domFC(geByClass1('page'+prefix+'_album_under_row', albumEl, 'div'))
      scaleX = widthTo / widthFrom;

    if (widthFrom < widthTo) return; // decrase width only
    if (!thumbEl) return; // not supported

    setStyle(albumEl, {width: widthTo});
    var thumbWidthTo = Math.round(positive(thumbEl.style.width) * scaleX),
      thumbHeightTo = Math.round(positive(thumbEl.style.height) * scaleX);
    setStyle(thumbEl, {
      width: thumbWidthTo,
      height: thumbHeightTo
    });

    sideMeshEl && WComments.resizePostSizedThumbs(
      sideMeshEl,
      widthTo - marginFrom - thumbWidthTo,
      marginFrom,
      thumbHeightTo
    );
    bottomMeshEl && WComments.resizePostSizedThumbs(
      bottomMeshEl,
      widthTo,
      marginFrom,
      positive(bottomMeshEl.style.height) * ((widthTo - marginFrom) / (widthFrom - marginFrom))
    );
  },

  resizePost: function(postEl, isReply) {
    var widthTo = isReply ? cur.options.reply_max_w : cur.options.max_w,
      heightTo = Math.max(cur.options.kludges_min_h, widthTo * (isReply ? cur.options.reply_kludges_ratio : cur.options.kludges_ratio));
    each(geByClass('page_album_wrap', postEl, 'div'), function(i, albumEl) {
        WComments.resizePostAlbumWrap(albumEl, widthTo, 5);
    });
    each(geByClass('page_market_album_wrap', postEl, 'div'), function(i, albumEl) {
        WComments.resizePostAlbumWrap(albumEl, widthTo - 2, 2, '_market');
    });
    each(geByClass('page_post_sized_thumbs', postEl, 'div'), function(i, meshEl) {
        WComments.resizePostSizedThumbs(meshEl, widthTo, 5, heightTo, true);
    });

    return postEl;
  },

  /* Events */

  eventsQueue: [],

  eventsPaused: false,

  eventsPause: function() {
    this.eventsPaused = true;
  },

  eventsProceed: function() {
    this.eventsPaused = false;
    while(this.eventsQueue.length) this.eventsParse(this.eventsQueue.shift());
  },

  eventsUpdateAttaches: function(el) {
    each(geByClass('audio_row', el, 'div'), function(i, e) {
      addClass(e, 'audio_no_actions');
    });
  },

  eventsParse: function (ev_text) {
    if (this.eventsPaused) return this.eventsQueue.push(ev_text);

    var ev = ev_text.split('<!>'),
      ev_ver = ev[0],
      ev_type = ev[1],
      post_id = ev[2],
      el = ge('post' + post_id);
    if (ev_ver != cur.options.qversion) return location.reload();

    switch (ev_type) {
      case 'new_post':
        if (el) break;
        var cont = ge('wcomments_posts'),
          flgs = intval(ev[ev.length - 1]),
          newEl = this.resizePost(se(Wall.getNewPostHTML(ev, cur.options.is_admin)));

        WComments.eventsUpdateAttaches(newEl);
        function addPost() {
          cont.insertBefore(newEl, cont.firstChild);
          if (ge('post_poll_id' + post_id)) {
            Wall.updatePoll(post_id);
          }
        }
        if (cur.saveScrollPosition) {
          cur.scrollbar.updateAbove(addPost);
        } else {
          addPost();
          cur.scrollbar && cur.scrollbar.scrollTop(0, true);
        }
        nodeUpdated(newEl);
        Wall.updateMentionsIndex();
        if (cur.section !== 'browse') val(cur.countEl, newCnt ? getLang('widgets_comments_top_count', newCnt) : getLang('widgets_comments'));

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
          newEl = this.resizePost(se(Wall.getNewReplyHTML(ev, cur.options.is_admin)), true),
          highlight = false;

        if (isVisible('reply_link' + post_id)) {
          re('reply_link' + post_id);
          show('replies_wrap' + post_id);
          highlight = true;
        } else {
          var openEl = repliesEl.nextSibling,
            newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
          if (cur.wallMyOpened[post_id]) {
            openEl && openEl.className == 'replies_open' && re(openEl);
            highlight = true;
            var headerEl = geByClass1('wr_header', repliesEl, 'a'),
              shown = geByClass('reply', repliesEl, 'div').length + 1,
              total = shown;
            if (headerEl) total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
            if (total > 5 || shown < total) {
              if (!headerEl) {
                headerEl = ce('a', {className: 'wr_header'});
                repliesEl.insertBefore(headerEl, repliesEl.firstChild);
              }
              Wall.updateRepliesHeader(post_id, headerEl, shown, total);
            }
          } else {
            addClass(newEl, 'new_reply');
            if (!openEl || openEl.className != 'replies_open') {
              openEl = ce('div', {className: 'replies_open', onclick: Wall.openNewComments.pbind(post_id)});
              repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
            }
            val(openEl, getLang('news_x_new_replies_more', Math.min(100, newCnt)));
            openEl.newCnt = newCnt;
          }
        }

        WComments.eventsUpdateAttaches(newEl);
        repliesEl.appendChild(newEl);
        highlight && nodeUpdated(newEl);
      break;

      case 'del_reply':
        !cur.wallMyDeleted[post_id] && re(el);
      break;

    }
    this.resizeWidget();
  },

  override: function(file, force) {
    if (!StaticFiles[file] && force !== true) return;
    switch (file) {
      case 'lite.js':
        extend(window, {

          showTooltip: Widgets.showTooltip,

          showBox: Widgets.showBox({
            'al_photos.php': {'photo_box': true, 'choose_photo': true},
            'al_video.php': {'video_box': true, 'a_choose_video_box': true},
            'al_places.php': {'show_photo_place': true},
            'like.php': {'publish_box': true},
            'widget_like.php': {'a_stats_box': true},
            'widget_post.php': {'subscribed_box': true, 'audio_claim_warning': true},
            'al_wall.php': {'canvas_draw_box': true},
            'al_im.php': {'stickers_store': true, 'sticker_preview': true},
            'al_audio.php': {'a_choose_audio_box': {stat: ['audioplayer.css', 'audioplayer.js']}}
          }),

          showCaptchaBox: Widgets.showCaptchaBox,

          showReCaptchaBox: Widgets.showReCaptchaBox,

          gotSession: function(session_data) {
            location.reload();
          },

          showPhoto: Widgets.showPhoto,

          showVideo: Widgets.showVideo,

          showWiki: function(likeInfo) {
            likeInfo = (likeInfo && likeInfo['w'] || '').split('/');
            if (likeInfo[0] == 'likes') {
              WComments.showLikesBox(likeInfo[1]);
            } else if (likeInfo[0] == 'shares') {
              WComments.showLikesBox(likeInfo[1], {tab: 'published'});
            } else {
              return true;
            }
          },

          mentionOver: function() {
            return true;
          },

          mentionClick: function() {
            return true;
          },

          showInlineVideo: Widgets.showInlineVideo,

          revertLastInlineVideo: Widgets.revertLastInlineVideo,

          pauseLastInlineVideo: Widgets.pauseLastInlineVideo

        });
      break;

      case 'emoji.js':
        extend(Emoji, {
          focus: function(cont, shouldScroll) {
            Emoji.editableFocus(cont, false, true);
            if (shouldScroll && cur.scrollbar) {
              var el = domCA(cont, '.reply_box');
              el && cur.scrollbar.scrollIntoView(el);
            }
          }
        });
      break;

      case 'page.js':
        if (cur.options.is_auto || cur.options.is_nano) {
          Composer.init = (function(init) { // wrap with extended media options
            return function() {
              var args = [].slice.call(arguments);
              if (args[1].media) args[1].media.options = extend(args[1].media.options || {}, {
                hideAfterCount: 0,
                maxShown: 0,
                forceToUp: 1
              });
              return init.apply(Wall, args);
            }
          })(Composer.init);
        }

        extend(Wall, {

          scrollHighlightReply: function(el) {
            if (!(el = ge(el))) return;
            if (cur.options.fixed_height && cur.scrollbar) {
              cur.scrollbar.scrollIntoView(el, true, Wall.highlightReply.bind(Wall, el));
            } else {
              el.scrollIntoView();
              Wall.highlightReply(el);
            }
          },

          postTooltip: (function(postTooltip) { // wrap with additional opts
            return function() {
              var args = [].slice.call(arguments);
              args[3] = extend(args[3] || {}, {
                appendEl: cur.postsOuterEl
              });
              return postTooltip.apply(this, args);
            }
          })(Wall.postTooltip),

          sendPost: function() {
            if (!cur.sendPostBtn) return;

            var addmedia = cur.wallAddMedia || {},
                media = addmedia.chosenMedia || {},
                medias = cur.wallAddMedia ? addmedia.getMedias() : [],
                share = (addmedia.shareData || {})
                msg = trim((window.Emoji ? Emoji.editableVal : val)(ge('post_field'))),
                postponePost = false;

            var pType = cur.options.suggesting ? 'suggest' : cur.wallType, params = {
              act: 'post',
              message: msg,
              to_id: cur.postTo,
              type: pType,
              status_export: '',
              widget_app: cur.options.app,
              widget_page_url: cur.options.page_url,
              widget_page_title: cur.options.page_title,
              widget_page_desc: cur.options.page_desc,
              widget_page_query: cur.options.page_query,
              hash: cur.options.post_hash
            }, ownmsg = (cur.postTo == vk.id || params.official || cur.options.only_official), attachI = 0;

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
                      mode: share.mode,
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
              WComments.eventsPause();
              ajax.post('al_wall.php', Wall.fixPostParams(params), {
                onDone: function(post_id) {
                  if (post_id) {
                    var params = {
                      act: 'a_post',
                      post: post_id,
                      width: cur.options.width,
                      startWidth: cur.options.startWidth,
                      hash: cur.options.post_hash,
                      app: cur.options.app,
                      limit: cur.options.limit,
                      'export': isChecked('wcomments_export')
                    };

                    ajax.post('al_widget_comments.php', params, {
                      onDone: function (options, rows) {
                        if (cur.section == 'posts' && cur.Rpc) {
                          cur.Rpc.callMethod('publish', 'widgets.comments.new_comment', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
                        }
                        val('wcomments_posts', rows);
                        WComments.contentUpdated(options);
                        Wall.updateMentionsIndex();
                        WComments.eventsProceed();
                      },
                      onFail: function() {
                        WComments.eventsProceed();
                      },
                      showProgress: function() {
                        lockButton(ge('send_post'));
                      },
                      hideProgress: function() {
                        Wall.clearInput();
                        cur.postSent = false;
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

                        if (cur.onWallSendPost) {
                          cur.onWallSendPost();
                        }

                        unlockButton(ge('send_post'));
                      }
                    });
                  }
                },
                onFail: function(msg) {
                  cur.postSent = false;
                  if (!msg) {
                    return true;
                  }
                  ge('submit_post_error').innerHTML = (msg.length > 60 ? '<div class="msg_text">' + msg + '</div>' : msg);
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

          sendReply: function(post, ev, options) {
            options = extend({}, options);

            if (window.mvcur && mvcur.post == post) {
              return Videoview.sendComment(post, ev, options.stickerId);
            }

            var wallLayer = (window.cur.wallLayer == post),
                cur = wallLayer ? wkcur : window.cur,
                rf = ge('reply_field' + post),
                composer = rf && data(rf, 'composer'),
                replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
                state;

            var _send = rf && data(rf, 'send');
            if (_send && isFunction(_send)) {
              return _send(post, ev, options);
            }

            if (options.stickerId) {
              var params = {message: '', attach1_type: "sticker", attach1: options.stickerId, sticker_referrer: options.sticker_referrer};
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

            cur.wallMyOpened = cur.wallMyOpened || {};

            cur.wallMyReplied[post] = 1;
            cur.wallMyOpened[post] = 1;
            var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash,
                fromGroupEl = ge('reply_as_group' + post),
                newEl = null;

            extend(params, {
              act: 'post',
              type: 'widget',
              width: cur.options.width,
              startWidth: cur.options.startWidth,
              reply_to: post,
              reply_to_msg: val('reply_to' + post),
              reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
              start_id: val('start_reply' + post),
              from: 'widget',
              hash: post_hash
            });
            if (cur.reverse) {
              params.rev = 1;
            }

            if (browser.mobile) {
              Wall.hideEditReply(post);
            } else {
              Emoji.editableFocus(rf, false, true);
              Wall.cancelReplyTo(post, ev);
            }

            ajax.post('al_wall.php', Wall.fixPostParams(params), {
              onDone: function(reply, replies, names, data) {
                if (cur.wallType == 'full') {
                  return FullWall.onReplySent.apply(window, arguments);
                }
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

            var message = Emoji.emojiToHTML(clean(params.message), true),
                toName = params.reply_to_user < 0 ? getLang('wall_replied_to_group') : cur.options.reply_names[params.reply_to_user] && cur.options.reply_names[params.reply_to_user][0],
                toLnk = toName ? rs(cur.wallTpl.reply_link_to, {to_user: toName}) : '';
            newEl = se(rs(cur.wallTpl.reply_fast, {
              reply_id: '0_' + replyId,
              message: message.replace(/\n/g, '<br/>'),
              to_link: toLnk,
              date: Wall.getNowRelTime(cur)
            }));

            if (repliesEl && !isVisible(repliesEl) || ge('reply_link' + post)) {
              re('reply_link' + post);
              show('replies_wrap' + post);
            } else if (!cur.onepost) {
              var openEl = repliesEl.nextSibling;
              if (openEl && openEl.className == 'replies_open') {
                Wall.openNewComments(post);
              }
              if (!wallLayer) {
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
            }
            if (cur.reverse) {
              repliesEl.insertBefore(newEl, repliesEl.firstChild);
            } else {
              repliesEl.appendChild(newEl);
            }
          },

          deletePost: function(el, post, hash, root, force) {
            (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 1;
            var r = ge('post' + post),
                actionsWrap = geByClass1('post_actions', r);
            ajax.post('al_wall.php', {
              act: 'delete',
              post: post,
              hash: hash,
              root: root ? 1 : 0,
              confirm: force ? 1 : 0,
              from: 'widget'
            }, {
              onDone: function(msg, res, need_confirm) {
                if (need_confirm) {
                  var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() { box.hide(); wall.deletePost(post, hash, root, 1); }, getLang('box_cancel'));
                  return;
                }
                if (res && cur.section == 'posts' && cur.Rpc) {
                  cur.Rpc.callMethod('publish', 'widgets.comments.delete_comment', res.count, res.last_comment, res.date, res.full_hash, res.pageId);
                }
                var t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
                revertLastInlineVideo(t);
                var pd = ge('post_del' + post);
                if (pd) {
                  pd.innerHTML = '<span class="dld_inner">' + msg + '</span>';
                  show(pd);
                } else {
                  r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: '<span class="dld_inner">' + msg + '</span>'}));
                }
                hide(t);
                if (domNS(t).className == 'post_publish') hide(domNS(t));
                if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
                  Pagination.recache(-1);
                  FullWall.updateSummary(cur.pgCount);
                } else if (cur.wallType == 'full') {
                  if (hasClass(r, 'reply')) {
                    cur.pgOffset--;
                    cur.pgCount--;
                    FullWall.repliesSummary(cur.pgCount);
                  }
                }

                if (hasClass(r, 'suggest')) {
                  Wall.suggestUpdate(-1);
                } else if (hasClass(r, 'postponed')) {
                } else if (cur.wallType == 'own' || cur.wallType == 'all') {
                  if (hasClass(r, 'own')) ++cur.deletedCnts.own;
                  if (hasClass(r, 'all')) ++cur.deletedCnts.all;
                  Wall.update();
                }

                WComments.contentUpdated();
              },
              showProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                  lockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                  lockButton(el);
                } else {
                  addClass(actionsWrap, 'post_actions_progress');
                }
              },
              hideProgress: function() {
                if (hasClass(el, 'ui_actions_menu_item')) {
                  unlockActionsMenuItem(el);
                } else if (hasClass(el, 'flat_button')) {
                  unlockButton(el);
                } else {
                  removeClass(actionsWrap, 'post_actions_progress');
                }
              }
            });
            var btn = ge('delete_post' + post), myReply;
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
              root: root ? 1 : 0,
              from: 'widget'
            }, {
              onDone: function(msg) {
                var pd = ge('post_del' + post);
                if (!pd) return;
                var r = ge('post' + post), t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
                show(t);
                if (domNS(t).className == 'post_publish') show(domNS(t));
                hide(pd);

                if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
                  Pagination.recache(1);
                  FullWall.updateSummary(cur.pgCount);
                } else if (cur.wallType == 'full') {
                  if (hasClass(r, 'reply')) {
                    cur.pgOffset++;
                    cur.pgCount++;
                    FullWall.repliesSummary(cur.pgCount);
                  }
                }

                if (hasClass(r, 'suggest')) {
                  Wall.suggestUpdate(1);
                } else if (hasClass(r, 'postponed')) {
                } else if (cur.wallType == 'own' || cur.wallType == 'all') {
                  if (hasClass(r, 'own')) --cur.deletedCnts.own;
                  if (hasClass(r, 'all')) --cur.deletedCnts.all;
                  Wall.update();
                }

                WComments.contentUpdated();
              }
            });
            return false;
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
            if (hasClass(ge('wcomments_posts'), 'no_post_click')) return;

            window.open('wall' + matches[1] + '_' + matches[3], '_blank');
          },

          _repliesLoaded: function(post, hl, replies, names) {
            var r = ge('replies' + post);
            if (!r) return; // fixme: shortcut solution that prevents js error when clicking on name of replied person in comments
            if (hl) {
              var el = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
              var h = r.offsetHeight;
              if (cur.options.fixed_height && cur.scrollbar) {
                cur.scrollbar.updateAbove(function() {
                  r.innerHTML = replies;
                });
              } else {
                r.innerHTML = replies;
              }
              setTimeout(Wall.scrollHighlightReply.pbind('post' + hl), 0);
            } else {
              r.innerHTML = replies;
            }
            var openEl = r.nextSibling;
            if (openEl && openEl.className == 'replies_open') {
              re(openEl);
            }
            extend(cur.options.reply_names || {}, names);
            Wall.updateMentionsIndex();
          },

          editPost: (function(editPost) { // wrap with audioplayer preload
            return function(el, post) {
              stManager.add(['audioplayer.css', 'audioplayer.js'], Function.apply.bind(editPost, Wall, [].slice.call(arguments)));
            }
          })(Wall.editPost),

          checkTextLen: function() {},

          checkPostLen: function() {},

          replySubmitTooltip: function() {},

          repliesSideSetup: function() {},

          repliesSideClick: function() {},

          pollFull: function() {},

          likesShow: function(el, post_id, opts) {
            opts = opts || {};
            var p = wall.parsePostId(post_id),
                like_type = p.type,
                post_raw = p.id,
                like_obj = like_type + post_raw,
                postEl = el && gpeByClass('_post_content', el) || wall.domPost(post_raw),
                wrapClass = opts.share ? '_share_wrap' : '_like_wrap',
                wrapEl = domByClass(postEl, wrapClass),
                iconEl = domByClass(wrapEl, '_icon'),
                hasShare = postEl && domByClass(postEl, '_share_wrap');
            if (!iconEl || cur.viewAsBox) return;

            var tt_offset = 56,
                wrap_left = getXY(wrapEl)[0],
                icon_left = getXY(iconEl)[0],
                icon_width = getSize(iconEl, true)[0],
                left_offset = icon_left + icon_width / 2 - wrap_left - tt_offset;

            showTooltip(iconEl.parentNode, {
              url: '/like.php',
              params: extend({act: 'a_get_stats', 'object': like_obj, has_share: hasShare ? 1 : ''}, opts.share ? {published: 1} : {}),
              slide: 15,
              shift: [-left_offset, -3],
              ajaxdt: 100,
              showdt: 400,
              hidedt: 200,
              dir: 'auto',
              checkLeft: true,
              reverseOffset: 80,
              appendEl: ge('page_wrap'),
              tip: {
                over: function() {
                  Wall.likesShow(el, post_id, opts);
                }
              },
              typeClass: 'like_tt wcomments_like_tt',
              className: opts.cl || ''
            });
          },

          showReplies: function(post, count, hl, ev) {
            if (checkEvent(ev || window.event)) return;
            if (cur.viewAsBox) return cur.viewAsBox();
            cur.wallMyOpened[post] = count != 3;
            ajax.post('al_wall.php', {
              act: 'get_replies',
              width: cur.options.width,
              startWidth: cur.options.startWidth,
              post: post,
              count: count,
              from: 'widget'
            }, {
              onDone: function() {
                var args = [].slice.call(arguments);
                args.unshift(post, hl);
                Wall._repliesLoaded.apply(Wall, args);
                WComments.resizeWidget();
              },
              showProgress: lockButton.pbind('wrh' + post),
              hideProgress: unlockButton.pbind('wrh' + post)
            });
            return false;
          }

        });

        // wrap with authorization demand
        each(['showEditReply', 'markAsSpam', 'stickerClick', 'likeIt'], function(k, v) {
          Wall[v] = (function(func) {
            return function() {
              if (!vk.id) {
                Widgets.oauth();
              } else {
                return func.apply(Wall, [].slice.call(arguments));
              }
            }
          })(Wall[v]);
        });
      break;

      case 'ui_media_selector.js':
        window.MediaSelector = function(lnk, previewId, mediaTypes, opts) {
          var types = [], addMedia;
          opts = opts || {};
          var customMediaHandlers = opts.mediaHandlers || {};
          each(mediaTypes || [], function (i, v) {
            var type = v[0], label = v[1], data = v[2];
            if (!label) return;
            var handler = false, params = {to_id: cur.postTo, scrollbar_width: sbWidth()};
            params.mail_add = opts.mail ? 1 : '';
            switch (type) {
              case 'graffiti':
                handler = showBox.pbind('al_wall.php', {to_id: cur.postTo, act: 'canvas_draw_box', flash: browser.flash}, {cache: 1, dark: 1});
              break;
              case 'photo':
                handler = showBox.pbind('al_photos.php', {to_id: cur.postTo, act: 'choose_photo', max_files: opts.limit || 10}, {cache: 1, stat: ['photos.js', 'photos.css', 'upload.js'], dark: 1});
              break;
              case 'video':
                handler = showBox.pbind('al_video.php', {to_id: cur.postTo, act: 'a_choose_video_box'}, {cache: 1, dark: 1});
              break;
              case 'audio':
                handler = showBox.pbind('al_audio.php', {to_id: cur.postTo, act: 'a_choose_audio_box'}, {cache: 1, dark: 1});
              break;
              default:
                return;
              break;
            }
            types.push([type, label, handler]);
          });

          var limit = opts.limit || 10,
              multi = limit > 1,
              editable = opts.editable && (!browser.msie || browser.version > 8),
              sortable = opts.sortable && (!browser.msie || browser.version > 8);

          var menu = initSelector(lnk, types, {
            onActivate: function () {
              cur.chooseMedia = addMedia.chooseMedia;
              cur.showMediaProgress = addMedia.showMediaProgress;
              cur.attachCount = addMedia.attachCount;
              cur.lastAddMedia = addMedia;
            },
            onItemClick: function(type) {
              if (multi && addMedia.attachCount() >= limit && type !== 'postpone' && type !== 'mark_as_ads') {
                showBox('blank.php', {code: 1900, limit: limit});
                return false;
              }
              return true;
            },
            hideAfterCount: opts.hideAfterCount,
            topOffset: opts.topOffset,
            forceUp: opts.forceUp,
            global: opts.global,
            maxShown: opts.maxShown,
            forceToUp: opts.forceToUp
          });

          if (!menu) return;
          previewId = previewId || 'media_preview';

          var lnkId = clean(menu.id),
              previewEl = ge(previewId),
              progressEl;

          if (multi) {
            previewEl.innerHTML = '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + lnkId + '" class="page_pics_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>';
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
            types: types,
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
                if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
                return false;
              }
              if (inArray(type, opts.disabledTypes || [])) {
                return false;
              }
              if (addMedia.attachCount() >= limit && data.upload_ind === undefined && type !== 'postpone' && type !== 'mark_as_ads' || geByClass1('medadd_c_market', docsEl)) {
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
              var preview = '', postview = '', wrap_class = '', toPics = false, toEl = docsEl, oncl, attrs = '';
              switch (type) {
                case 'graffiti':
                  if (!isObject(data)) {
                    data = {thumb: data || ''};
                  }
                  preview = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + clean(data.thumb) + '" /></div>';
                  toEl = toPics = mpicsEl;
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
                  _vopts += '&quot;queue&quot;:1';
                  _vopts = '{' + _vopts + '}';

                  if (editable) {
                    if (!data.editable) return false;
                    if (!opts.nocl) {
                      fastXDM.getJSON(function(json) {
                        data.editable.click = showPhoto.pbind(media, data.list, json.parse(_vopts.replace(/&quot;/g, '"')));
                      });
                    }
                  }

                  oncl = opts.nocl ? '' : ' onclick="return showPhoto(\'' + clean(media) + '\', \'' + data.list + '\', {' + _vopts.replace(/"/g, '&quot;') + '});"';
                  preview = '<div ' + oncl + ' class="fl_l page_preview_photo'+(isGraffiti ? ' page_preview_ph_graff' : '')+'"><img class="page_preview_photo" src="' + clean(data.thumb_m) + '" /></div>';
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

                  oncl = opts.nocl ? '' : ' onclick="return showVideo(\'' + clean(media) + '\', false, {queue:1});"';
                  preview = '<div' + oncl + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + clean(data.thumb) + '" /></div>';
                  toPics = 1;
                  toEl = picsEl;
                break;

                case 'audio':
                  if (!data.info) return false;

                  var mediaRowEl = geByClass1('_audio_row_' + media);
                  if (mediaRowEl) {
                    data = AudioUtils.getAudioFromEl(mediaRowEl);
                  }

                  preview = Page.addAudioPreview(clean(media), data);
                  attrs = ' id="pam' + clean(lnkId) + '_audio' + clean(media) + '"';
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
                  preview = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(data.url) + '" class="medadd_h medadd_h_link inl_bl">' + clean(data.lang.profile_choose_link) + '</a>';
                  addMedia.shareData = extend(addMedia.shareData || {}, data, {imagesStyles: ['']});
                  toEl = ldocsEl;
                break;

                case 'poll':
                  if (!data.lang) return false;
                  preview = '<div class="medadd_h medadd_h_poll inl_bl">' + clean(data.lang.q) + '</div>';
                  hide(domByClass(menu.menuNode, '_type_poll'));
                  toEl = pdocsEl;
                break;

                case 'album':
                  if (data.thumb.match(/^\/images\//)) {
                    data.thumb = '';
                  }

                  if (editable) {
                    if (!data.editable) return false;
                    extend(data.editable, {
                      title: data.title,
                      size: data.count,
                      click: opts.nocl ? false : nav.change.pbind({z: 'album' + media})
                    });
                  }

                  var thumb = data.thumb;
                  vkImage().src = thumb;
                  oncl = opts.nocl ? '' : ' href="/album' + clean(media) + '" onclick="return nav.change({z: \'album' + clean(media) + '\'}, event)"';
                  var cls = 'fl_l page_album_link' + (thumb ? '' : ' page_album_nocover');
                  preview = '<a class="' + cls + '" ' + oncl + '>\
                    ' + (thumb ? '<div class="page_album_thumb_wrap"><img class="page_album_thumb" src="' + clean(thumb) + '"/></div>' : '') + '\
                      <div class="page_album_title">\
                        <div class="page_album_size">' + clean(data.count) + '</div>\
                        <div class="page_album_title_text">' + clean(data.title) + '</div>\
                      </div>\
                    </a>';
                  toPics = 1;
                  toEl = picsEl;
                break;

                default:
                  return;
                break;
              }

              if (multi) {
                var medias = addMedia.chosenMedias,
                    ind = medias.length,
                    mediaEl = (editable && toPics === 1) ? false : ((type == 'photos_list') ?
                      se('<div class="page_preview_' + type + '_wrap' + wrap_class + '" style="position: relative">' + preview + '<div class="page_photos_count">' + media.split(',').length + '</div></div>') :
                      se('<div class="page_preview_' + type + '_wrap' + wrap_class + '"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="'+getLang('dont_attach')+'" onmouseover="showTitle(this)" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div>'));
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
                    var teMed = ThumbsEdit.convert(type, media, data.editable, data.peEditable);
                    if (domFC(toEl)) {
                      ThumbsEdit.addMedia(toEl, teMed, data);
                    } else if (opts.teWidth && opts.teHeight) {
                      ThumbsEdit.init(toEl, [teMed], {width: opts.teWidth, height: opts.teHeight, force: true, onMove: opts.onAddMediaChange, onUpdate: opts.onChangedSize});
                    } else {
                      ThumbsEdit.init(toEl, [teMed], {onMove: opts.onAddMediaChange, force: true, onUpdate: opts.onChangedSize});
                    }
                    toggleClass(previewEl, 'media_preview_has_medias', addMedia.hasVisibleRows());
                    opts.onChangedSize && opts.onChangedSize()
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
                        opts.onChangedSize && opts.onChangedSize()
                      }, true);
                    } else if (toEl == dpicsEl) {
                      stManager.add(['qsorter.js'], function() {
                        if (dpicsEl.qsorter) {
                          qsorter.added(dpicsEl);
                        } else if (toEl.childNodes.length > 1) {
                          qsorter.init(dpicsEl, addMedia.qsorterOpts());
                        }
                        opts.onChangedSize && opts.onChangedSize()
                      }, true);
                    }
                  }
                  opts.onChangedSize && opts.onChangedSize();
                }
                medias.push([type, media, mediaEl, url]);
              } else {
                var ind = 0;
                if (type === 'postpone') {
                  ind = 1;
                } else if (type === 'mark_as_ads') {
                  ind = 2;
                }
                var mediaEl = se('<div class="' + (toPics === false ? 'page_docs_preview' : 'page_pics_preview') + (ind ? '' : ' post_thumbed_media') + '"><div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="'+getLang('dont_attach')+'" onmouseover="showTitle(this)" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div></div>');
                addClass(mediaEl, toPics ? 'fl_l' : 'clear_fix');
                if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
                if (type !== 'postpone' && type !== 'mark_as_ads') {
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
              } else if (type == 'mark_as_ads') {
                addMedia.markAsAds = 1;
              }

              toggleClass(previewEl, 'media_preview_has_medias', addMedia.hasVisibleRows());
              opts.onChangedSize && opts.onChangedSize();

              var ev = window.event;
              if (ev && ev.type == 'click' && (ev.ctrlKey || ev.metaKey || ev.shiftKey)) {
                noboxhide = true;
              }
              if ((!cur.fileApiUploadStarted || data.upload_ind === undefined) && !cur.preventBoxHide && noboxhide !== true && !inArray(type, ['poll', 'share', 'page', 'postpone', 'mark_as_ads'])) {
                boxQueue.hideLast();
              }

              cur.lastPostMsg = false;
              if (opts.onMediaAdd) {
                opts.onMediaAdd();
              }

              cur.onMediaChanged && cur.onMediaChanged();

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
                      hide('medadd_c_linkimg_loader');
                      clearTimeout(cur.showLoaderTimeout);
                      clearInterval(cur.shareImgInterval);
                      clearTimeout(cur.shareImgInterval2);
                      clearTimeout(cur.imgLoadTimeout);
                      delete addMedia.sharePreview;
                      break;

                    case 'poll':
                      re(addMedia.pollPreview);
                      addMedia.pollPreview = false;
                      show(domByClass(menu.menuNode, '_type_poll'));
                      break;

                    case 'map':
                      show(domByClass(menu.menuNode, '_type_map'));
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
                        ge('wpe_save').innerHTML = getLang('wall_publish_now');
                      }
                      show(domByClass(menu.menuNode, '_type_postpone'));
                      break;

                    case 'mark_as_ads':
                      show(domByClass(menu.menuNode, '_type_mark_as_ads'));
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
                if ((ind == 1) && addMedia.postponePreview) {
                  show(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
                  var postponeWrap = domPN(addMedia.postponePreview);
                  window.tooltips && tooltips.destroyAll(postponeWrap);
                  re(postponeWrap);
                  addMedia.postponePreview = false;
                  var newTypes = menu.lastTypes;
                  each(menu.types, function (i, v) {
                    if (v[0] === 'postpone') {
                      newTypes.push(v);
                    }
                  });
                  menu.setItems(newTypes);
                } else if ((ind == 2) && addMedia.markAsAds) {
                  addMedia.markAsAds = false;
                  var markAsAdsWrap = geByClass1('page_preview_mark_as_ads_wrap', previewEl);
                  window.tooltips && markAsAdsWrap && tooltips.destroyAll(markAsAdsWrap);
                  re(markAsAdsWrap);
                  var newTypes = menu.lastTypes;
                  each(menu.types, function (i, v) {
                    if (v[0] === 'mark_as_ads') {
                      newTypes.push(v);
                    }
                  });
                  menu.setItems(newTypes);
                } else {
                  if (addMedia.postponePreview || addMedia.markAsAds) {
                    var postponeWrap = addMedia.postponePreview && domPN(addMedia.postponePreview);
                    var markAsAdsWrap = addMedia.markAsAds && domPN(geByClass1('page_preview_mark_as_ads_wrap', previewEl));
                    var nodesToDelete = [];
                    for (var i = 0; i < previewEl.childNodes.length; i++) {
                      var v = previewEl.childNodes[i];
                      if (v.nodeName == 'DIV' && v != postponeWrap && v != markAsAdsWrap) {
                        nodesToDelete.push(v);
                      }
                    }
                    each(nodesToDelete, function (i, v) {
                      re(v);
                    });
                    var newTypes = [];
                    each(menu.types, function(i, v) {
                      if (v[0] === 'postpone' && addMedia.postponePreview) {
                        return;
                      } else if (v[0] === 'mark_as_ads' && addMedia.markAsAds) {
                        return;
                      }
                      newTypes.push(v);
                    });
                    menu.setItems(newTypes);
                  } else {
                    val(previewEl, '');
                    addClass(previewEl, 'med_no_attach');
                    menu.setItems(menu.types);
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

              toggleClass(previewEl, 'media_preview_has_medias', addMedia.hasVisibleRows());

              cur.onMediaChanged && cur.onMediaChanged();

              cur.lastPostMsg = false;

              if (addMedia.onChange) addMedia.onChange(false);
            },
            singleAdded: function(mediaEl, type) {
              if (type === 'postpone') {
                previewEl.appendChild(mediaEl);
              } else if (type === 'mark_as_ads') {
                if (addMedia.postponePreview) {
                  previewEl.insertBefore(mediaEl, domLC(previewEl));
                } else {
                  previewEl.appendChild(mediaEl);
                }
              } else {
                if (domFC(previewEl)) {
                  previewEl.insertBefore(mediaEl, domFC(previewEl));
                } else {
                  previewEl.appendChild(mediaEl);
                }
              }
              removeClass(previewEl, 'med_no_attach');

              var newTypes = [];
              each(menu.lastTypes, function(i, v) {
                if (v[0] === 'postpone' && (addMedia.postponePreview || type === 'postpone')) {
                  return;
                } else if (v[0] === 'mark_as_ads' && (addMedia.markAsAds || type === 'mark_as_ads')) {
                  return;
                } else if (!inArray(type, ['postpone', 'mark_as_ads']) && !inArray(v[0], ['postpone', 'mark_as_ads'])) {
                  return;
                }
                newTypes.push(v);
              });
              menu.setItems(newTypes);
              if (opts.toggleLnk && !newTypes.length) {
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
            showMediaProgress: function(type, i, info) {
              if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
                return false;
              }
              var frac = info.loaded / info.total, percent = intval(frac * 100),
                  fileName = (info.fileName || info.name || '').replace(/[&<>"']/g, ''),
                  ind = fileName ? i + '_' + fileName : i,
                  label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

              var prg = ge('upload' + ind + '_progress');
              if (!prg) {
                if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
                cur.attachMediaIndexes[ind] = lnkId;

                var labelEl = label ? '<div class="attach_label fl_l">' + label + '</div>' : '';

                var progress = '\
                  <div class="fl_l"> \
                    <div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;"> \
                      <div id="upload' + ind + '_progress" class="page_attach_progress ui_progress"> \
                        <div class="ui_progress_back"></div> \
                        <div class="ui_progress_bar"></div> \
                      </div> \
                    </div> \
                  </div>' +
                  labelEl +
                  '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\', this);"></div>';

                if (multi) {
                  progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'}, {marginTop: '6px'}));
                  show(progressEl);
                  if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
                } else {
                  var mediaEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'});
                  addMedia.chosenMedia = 'progress';
                  addMedia.singleAdded(mediaEl, 'progress');
                }
                opts.onChangedSize && opts.onChangedSize();
                prg = ge('upload' + ind + '_progress');
                var prgBar = geByClass1('ui_progress_bar', prg);

                if (percent) {
                  setStyle(prgBar, {width: percent + '%'})
                } else {
                  setStyle(prgBar, {width: '1px'});
                  hide(prg);
                }
              } else {
                show(prg);
                var prgBar = geByClass1('ui_progress_bar', prg);
                setStyle(prgBar, {width: percent + '%'});
              }
            },

            hasVisibleRows: function() {
              var has = false;
              each(geByClass('media_preview', previewEl), function() {
                if (isVisible(this)) {
                  has = true;
                  return false;
                }
              });
              return has;
            },

            attachCount: function() {
              if (addMedia.attachedCount) {
                return addMedia.attachedCount();
              }
              if (!previewEl) {
                return 0;
              }
              if (!multi) {
                return previewEl.childNodes.length - (addMedia.postponePreview ? 1 : 0) - (addMedia.markAsAds ? 1 : 0);
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
              var h = data.question ? '' : '1px', html = [], ans;
              var incCl = data[4 + (10 - 1) * 2] ? 'disabled' : '', decCl = data[4 + 2 * 2] ? '' : 'disabled';
              addMedia.pollPreview = pdocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_poll', innerHTML: '\
                <input onkeydown="cur.addMedia[' + lnkId + '].keyPoll(this, event)" class="text dark medadd_c_pollq" id="create_poll_question' + lnkId + '" value="' + (data.question || '') + '" />\
                <div class="medadd_c_pollh">' + data.lang.a + '</div>\
                <div class="medadd_c_pollans" id="create_poll_answers' + lnkId + '"></div>\
                <div class="medadd_c_polladd_wr" id="create_poll_add' + lnkId + '">\
                  <div class="medadd_c_polladd fakeinput dark" onclick="cur.addMedia[' + lnkId + '].incPoll()">' + data.lang.i + '</div>\
                </div>' + (data.edit ? '' : '<div class="checkbox medadd_c_pollcb' + (data.anon ? ' on' : '') + '" id="create_poll_anonymous' + lnkId + '" onclick="checkbox(this);cur.addMedia[' + lnkId + '].changedPoll();">' + data.lang.c + '</div>') + (data.pollSettings || '')}));
                      if (!data.answers) data.answers = [[0, ''], [0, '']];
                      cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text dark medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem" data-title="'+clean(stripHTML(unclean(data.lang.d)))+'" onmouseover="showTitle(this)" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
              for (var i = 0, l = data.answers.length; i < l; ++i) {
                ans = data.answers[i];
                html.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
                  attrs: (ans[0] ? 'id="create_poll_ans' + ans[0] + '" ' : '') + (ans[1] ? '" value="' + ans[1] + '" ' : ''),
                  lnkid: lnkId
                }) + '</div>');
                if (i == 9) hide('create_poll_add' + lnkId);
              }
              val('create_poll_answers' + lnkId, html.join(''));
              if (data.question) {
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
              var answers = ge('create_poll_answers' + lnkId),
                  l = answers.childNodes.length,
                  max = opts.pollLimit || 10;
              if (l < max) {
                elfocus(geByTag1('input', answers.appendChild(ce('div', {
                  className: 'medadd_c_polla_wr',
                  innerHTML: rs(cur.pollAnswerTemplate, {attrs: '', lnkid: lnkId})
                }))));
              }
              toggle('create_poll_add' + lnkId, l < max - 1);
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
            checkMessageURLs: function(message, inactive, withTimeout) {
              if (cur.noCheckMessageURLs || addMedia.chosenMedia || addMedia.urlAttachmentLoading && addMedia.urlAttachmentLoading[0] > vkNow() - 10000 || addMedia.attachCount() >= limit) {
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
                  valid = query.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video)|w=(page|product))(-?\d+_)?\d+|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|^\/blog\/.+$|^http:\/\/instagram\.com\/p\/.+/) ? true : false;
                }
                if (valid) {
                  addMedia.checkURL(initialUrl, withTimeout);
                  return;
                }
              }
            },

            clearCheckURL: function() {
              clearTimeout(cur.checkURLTO);
              re(addMedia.urlAttachmentLoading[2]);
              if (multi) {
                toggle(progressEl, progressEl.childNodes > 0);
              } else {
                toggleClass(previewEl, 'med_no_attach', !previewEl.childNodes);
              }
              addMedia.urlAttachmentLoading = false;
              setStyle(bodyNode, {cursor: 'default'});
            },

            onCheckURLDone: function(result, data) {
              var url = '';
              if (addMedia.urlAttachmentLoading) {
                url = addMedia.urlAttachmentLoading[1];
                addMedia.clearCheckURL();
              }
              if (result) {
                addMedia.chooseMedia(data[0], data[1], data[2], url, true);
              } else if (opts.onCheckURLDone) {
                opts.onCheckURLDone(result, data);
              }
            },
            checkURL: function(url, withTimeout) {
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

              setStyle(bodyNode, {cursor: 'wait'});

              window.onUploadDone = addMedia.onCheckURLDone.pbind(true);
              window.onUploadFail = addMedia.onCheckURLDone.pbind(false);

              if (withTimeout) {
                cur.checkURLTO = setTimeout(function() {
                  if (addMedia.urlAttachmentLoading.length > 0) {
                    addMedia.clearCheckURL();
                  }
                }, withTimeout);
              }

              parseForm.submit();
            },
            addPreview: function(progress) {
              return (addMedia.sharePreview = ldocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_link', innerHTML: '<div class="medadd_c_linkcon"><div></div>' + (progress ? '<div class="progress medadd_c_linkprg"></div>' : '') + '</div>'})));
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

                    var uploadTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_choose_own_photo') + '\', black: 1, shift: [7, 11, 8], appendParentCls: \'post\'})"';
                    var removeTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_remove_photo') + '\', black: 1, shift: [7, 11, 8], appendParentCls: \'post\'})"';

                    var imgControls = (!data.media || data.media == '_' ) ? '' : '<div class="medadd_c_linkimg_controls">' +
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
                var description = data.description_short || data.description;
                var html =
                  imghtml +
                  (data.title ? '<h4 class="medadd_c_linkhead">' + data.title + '</h4>' : '') +
                  (!bigLinkClass && data.domain ? '<div class="page_media_link_url">' + data.domain + '</div>' : '') +
                  //(data.domain ? '<div class="medadd_c_linkdomain">' + data.domain + '</div>' : '') +
                  (microdata ? '<div class="medadd_c_linkmicrodata">' + microdata + '</div>' : '') +
                  (description ? '<div class="medadd_c_linkdsc">' + description + '</div>' : '') +
                  '<div class="clear"></div>';
              }

              if (fast) {
                if (cur.preventShareAnim) {
                  cur.preventShareAnim.stop();
                  clearInterval(cur.animateUpdateInterval);
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
                cur.animateUpdateInterval = setInterval(function() { opts.onChangedSize && opts.onChangedSize(); }, 100);
                cur.preventShareAnim = animate(domFC(prev), {height: height}, 200, function() {
                  clearInterval(cur.animateUpdateInterval);
                });

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
                  cur.imgLoadTimeout = imgLoadTimeout = setTimeout(function() {
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
                  opts.onChangedSize && opts.onChangedSize();
                }, 100);

                cur.showLoaderTimeout = showLoaderTimeout;

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
                      var bigLink = (w >= 537 && h >= 240) && data.big_link === undefined;

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
                cur.shareImgInterval2 = setTimeout(updatePreview, 0);
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
              var ed = (cur.editingPost && domPN(toEl).id == 'wpe_media_preview'), h = (ed || !multi) ? '' : '1px', addedhtml = false;
              var html = '<div class="clear_fix">\
                <div class="fl_l"><input type="hidden" id="postpone_date' + lnkId + '" value="' + (data.date || '') + '" /></div>\
                <div class="fl_l medadd_c_timerat">' + data.lang.profile_wall_postpone_at + '</div>\
                <div class="fl_l"><input type="hidden" id="postpone_time' + lnkId + '"/></div></div>';
              if (cur.editingPost && data.friends_only != undefined) {
                html += '<div class="medadd_c_timersett">';
                if (data.status_export != undefined) {
                  html += '<div class="checkbox_status_export' + (data.status_export ? ' on' : '') + ' fl_l" id="status_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_twitter + '\', black: 1, shift: [12,4,0]});"></div>';
                }
                if (data.facebook_export != undefined) {
                  html += '<div class="checkbox_facebook_export' + (data.facebook_export ? ' on' : '') + ' fl_l" id="facebook_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_facebook + '\', black: 1, shift: [12,4,0]});"></div>';
                }
                html += '<div class="checkbox' + (data.friends_only ? ' on' : '') + ' fl_l" id="friends_only' + lnkId + '" onclick="checkbox(this);checkbox(\'status_export' + lnkId + '\',!isChecked(this));checkbox(\'facebook_export' + lnkId + '\',!isChecked(this));">'+ data.lang.friends_only +'</div></div>';
                addedhtml = true;
              } else if (cur.editingPost && export_row) {
                html += export_row;
                addedhtml = true;
              }
              addMedia.postponePreview = toEl.appendChild(ce('div', {className: 'medadd_c medadd_c_timer clear_fix' + (addedhtml ? ' medadd_c_nofixed' : ''), innerHTML: html}));
              addMedia.postponePreview.style.height = h;
              stManager.add(['ui_controls.css', 'ui_controls.js', 'datepicker.css', 'datepicker.js'], function() {
                new Datepicker('postpone_date' + lnkId, {time: 'postpone_time' + lnkId, width: 155, noPast: true, minStep: 1, onUpdate: opts.onMediaChange});
                if (!ed && multi) {
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
                xsize: Math.floor(dpicsEl.offsetWidth / 135),
                width: 135,
                height: 102,
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

          function initSelector(lnk, types, opts) {
            lnk = ge(lnk);
            if (!lnk) return false;

            opts = opts || {};

            if (!window.__addMediaIndex) __addMediaIndex = 0;
            var menuId = ++__addMediaIndex;

            var html = '<div class="media_selector clear_fix"></div>';
            lnk.innerHTML = html;

            var menuNode = domByClass(lnk, 'media_selector');

            var reverseMargin = opts.reverseMargin || 25;
            var _hideTimer, mediaMenu = {
              id: menuId,
              menuNode: menuNode,
              types: types,
              lastTypes: types,
              activate: function(touched) {
                mediaMenu.touched = (touched === true);
                opts.onActivate && opts.onActivate();
              },
              show: function() {
                if (_hideTimer) {
                  clearTimeout(_hideTimer);
                  _hideTimer = 0;
                }
                if (!mediaMenu.moreWrap) return;
                if (hasClass(mediaMenu.moreWrap, 'shown')) return;
                if (!opts.forceToUp) {
                  replaceClass(mediaMenu.moreWrap, 'to_up', 'to_down');
                }
                var moreItems = domByClass(mediaMenu.moreWrap, '_more_items'),
                    dy = getClientRectOffsetY(moreItems);

                if (dy > 0 || opts.forceToUp) {
                  replaceClass(mediaMenu.moreWrap, 'to_down', 'to_up');
                }
                setTimeout(addClass.pbind(mediaMenu.moreWrap, 'shown'), 0);
              },
              hide: function(force) {
                if (_hideTimer) {
                  return;
                }
                var _hide = function() {
                  _hideTimer = 0;
                  if (!mediaMenu.moreWrap) return;
                  removeClass(mediaMenu.moreWrap, 'shown');
                };
                if (force) {
                  var moreItems = domByClass(mediaMenu.moreWrap, '_more_items');
                  hide(moreItems);
                  _hide();
                  setTimeout(show.pbind(moreItems), 0);
                } else {
                  _hideTimer = setTimeout(_hide, 300);
                }
              },
              setOptions: function(options) {
                extend(opts, options);
              },
              setItems: function(types) {
                window.tooltips && tooltips.destroyAll(menuNode);
                while (menuNode.firstChild) {
                  re(menuNode.firstChild);
                }

                var hideAfterCount = opts.hideAfterCount !== undefined ? opts.hideAfterCount : 4;
                var maxShown = opts.maxShown !== undefined ? opts.maxShown : 3;

                var moreNode = false;
                var hideItem = opts.hideItem;
                var needHide = (hideItem || (types.length > hideAfterCount)) && !browser.mobile;
                var hideLabel = hideItem && opts.hideLabel || getLang('global_media_selector_more');

                mediaMenu.moreWrap = false;
                mediaMenu.lastTypes = types;

                each(types, function(i, v) {
                  var type = v[0], label = v[1], handler = v[2];

                  var row;
                  if (needHide && (hideItem ? type == hideItem : i == maxShown)) {
                    var moreWrap = menuNode.appendChild(ce('div', {className: 'ms_items_more_wrap'}));
                    addEvent(moreWrap, 'mouseover click', function(ev) {
                      if (ev.type == 'mouseover' && mediaMenu.touched) return;
                      mediaMenu.show();
                    });
                    addEvent(moreWrap, 'mouseout', function () {
                      mediaMenu.hide();
                    });
                    row = moreWrap.appendChild(ce('a', {
                      className: 'ms_item_more',
                      innerHTML: '<span class="ms_item_more_label">' + hideLabel + '</span>'
                    }));
                    row.setAttribute('tabindex', 0);
                    var moreNodeHelper = ce('div', {className: 'ms_items_more_helper'});
                    moreNode = ce('div', {className: 'ms_items_more _more_items'});
                    moreNodeHelper.appendChild(moreNode);
                    row = moreWrap.appendChild(moreNodeHelper);
                    mediaMenu.moreWrap = moreWrap;
                  }

                  row = (moreNode ? moreNode : menuNode).appendChild(ce('a', {
                    innerHTML: moreNode ? label : '<span class="blind_label">' + label + '</span>',
                    className: 'ms_item ms_item_' + type + ' _type_' + type
                  }));
                  row.setAttribute('tabindex', 0);
                  if (!moreNode) {
                    row.setAttribute('data-title', label);
                    row.setAttribute('aria-label', label);
                    row.setAttribute('role', 'link');
                    addEvent(row, 'mouseover', function(){ showTitle(this, false, false, {noZIndex: true}); });
                  }
                  if (handler) {
                    addEvent(row, 'click', function () {
                      mediaMenu.hide(true);
                      if (opts.onItemClick && !opts.onItemClick(type)) {
                        return false;
                      }
                      handler();
                      return false;
                    });
                  }
                });
              }
            };

            types && mediaMenu.setItems(types);

            if (browser.msie) {
              removeEvent(lnk, 'MSPointerDown'); // for ie10 touch
              addEvent(lnk, 'MSPointerDown', mediaMenu.activate.pbind(true));
            }

            removeEvent(lnk, 'mouseover');
            addEvent(lnk, 'mouseover click', mediaMenu.activate);

            if (!opts.global) {
              cur.destroy.push(function() {
                removeEvent(lnk, 'mouseover click', mediaMenu.activate);
              });
            }

            return mediaMenu;
          }

          if (!cur.addMedia) {
            cur.addMedia = {};
          }

          cur.addMedia[lnkId] = addMedia;
          if (opts.onAddMediaChange) addMedia.onChange = opts.onAddMediaChange;
          return addMedia;
        }
      break;
    }
  }

};

try{stManager.done('api/widgets/al_comments.js');}catch(e){}
