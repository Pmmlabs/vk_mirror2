var Community = {

  init: function() {
    this.override('lite.js');
    this.override('page.js');
    stManager.emitter.addListener('update', this.override.bind(this));

    if (cur.mode == 2 || cur.mode == 4) {
      var height = Math.max(cur.minHeight, cur.height - getSize('community_header')[1]);
      if (ge('community_content')) {
        setStyle('community_content', 'height', height);
        cur.scrollbar = new uiScroll('community_content', {
          onmore: this.showMore.bind(this),
          theme: 'default wcommunity',
          hidden: 1,
          ondragstart: function() {
            try {cur.Rpc.callMethod('startDrag')} catch(e) {}
          },
          ondragstop: function() {
            try {cur.Rpc.callMethod('stopDrag')} catch(e) {}
          }
        });
      } else {
        setStyle(geByClass1('_wcommunity_closed_wrap'), 'height', height);
      }
      cur.mouseMove = function(ev) {
        cur.scrollbar && cur.scrollbar.ondrag(ev);
      };
      cur.mouseUp = function() {
        cur.scrollbar && cur.scrollbar.ondragstop();
      };
    }

    cur.Rpc = new fastXDM.Client({
      onInit: function() {
        setTimeout(function () {
          Community.resizeWidget();
        }, 500);
      },
      authorised: function (args) {
        var href = location.href;
        if (href.indexOf('fieldText=') != -1) href = href.replace(/fieldText=.+?(&|$)/, 'fieldText=' + winToUtf(ge('commentFiled').getValue()) + '\1');
        else href = href + '&fieldText=' + winToUtf(ge('commentFiled').getValue());

        if (href.indexOf('autoLogin=1') != -1) href = href.replace('autoLogin=1', 'autoLogin=0');
        location.href = href;
        return;
      },
      unauthorised: function (args) {
        var href = location.href;
        if (href.indexOf('autoLogin=0') != -1) href = href.replace('autoLogin=0', 'autoLogin=1');
        else href = href + '&autoLogin=1';

        cur.Rpc.callMethod('auth');
        location.href = href;
        return;
      },
      mouseMove: function(screenY) {
        cur.mouseMove(screenY);
      },
      mouseUp: function() {
        cur.mouseUp({});
      }
    }, {safe: true});

    cur.wallMyDeleted = {};
    cur.mainDiv = ge('main');
    Community.resizeWidget();
    setTimeout(function () {
      Community.resizeWidget();
    }, 0);
  },

  resizeWidget: function() {
    onBodyResize(true);
    if (cur.mainDiv && cur.Rpc) {
      cur.Rpc.callMethod('resize', getSize(cur.mainDiv)[1]);
    }
  },

  sendStateEvent: function(state) {
    cur.Rpc.callMethod(
      'publish',
      state ? 'widgets.groups.joined' : 'widgets.groups.leaved'
    );
  },

  sendChangeState: function(state, oid, callback, isEvent, failCallback) {
    Community.sendStateEvent(state);
    var hiddenDomain = ge('hiddenDomain');
    ajax.post('/widget_community.php', {
      act: 'a_change_state',
      state: state,
      oid: oid,
      hash: cur.hash,
      domain: hiddenDomain ? hiddenDomain.value : '',
      is_event: isEvent ? 1 : 0
    }, {
      onDone: callback,
      onFail: failCallback
    });
  },

  changeGroupState: function(state, btn) {
    var doChangeState = function() {
      if (cur.changinGroupState) return;
      function participate(yes) {
        if (yes) {
          val('members_count', cur.count_in);
          replaceClass(btn, 'color3_bg', 'color4_bg color2 secondary _subscribed');
          val(btn, cur.unsubscribe_lang);
          setStyle('anim_row', 'left', 0);
        } else {
          val('members_count', cur.count_out);
          replaceClass(btn, 'color4_bg color2 secondary _subscribed', 'color3_bg');
          val(btn, cur.subscribe_lang);
          setStyle('anim_row', 'left', -cur.mWidth);
        }
      }
      cur.changinGroupState = true;
      lockButton(btn);
      if (cur.noAuth) {
        Widgets.auth();
        window.gotSession = function(autorzied) {
          if (autorzied == -1) {
            setTimeout(location.reload.bind(location), 1000);
            location.href = location.href + '&1';
          }
          if (autorzied) {
            ajax.post('/widget_community.php', {act: 'a_get_info', oid: cur.oid}, {
              onDone: function(result) {
                if (result.hash) {
                  cur.noAuth = false;
                  cur.justAuth = true;
                  cur.hash = result.hash;
                  cur.changinGroupState = false;
                  Community.changeGroupState(state, btn);
                }
              }
            });
          }
        }
      } else if (state && !cur.justAuth) {
        unlockButton(btn);
        cur.changinGroupState = false;
        Widgets.showSubscribeBox(cur.oid, function() {
          Community.sendStateEvent(state);
          participate(true);
        }, state);
      } else if (!cur.justAuth) {
        Community.sendChangeState(state, cur.oid, function() {
          unlockButton(btn);
          participate(state);
          cur.changinGroupState = false;
        }, false, function() {
          unlockButton(btn);
          cur.changinGroupState = false;
        });
      }
    }.bind(this);

    cur.confirmUnsubscribe && !state ? Widgets.showUnsubscribeBox(cur.oid, doChangeState) : doChangeState();
  },

  changeEventState: function(state, btn) {
    if (cur.changinEventState) return;
    function participate(yes) {
      if (yes) {
        val('members_count', cur.count_in);
        setStyle('anim_row', 'left', 0);
      } else {
        val('members_count', cur.count_out);
        setStyle('anim_row', 'left', -cur.mWidth);
      }
    }
    cur.changinEventState = true;
    lockButton(btn);
    if (cur.noAuth) {
      Widgets.auth();
      window.gotSession = function(autorzied) {
        cur.noAuth = false;
        ajax.post('/widget_community.php', {
          act: 'a_get_info',
          oid: cur.oid
        }, {
          onDone: function(result) {
            if (result.hash) {
              cur.hash = result.hash;
              cur.changinEventState = false;
              Community.changeEventState(state, btn);
            }
          }
        });
      }
    } else if (state > 0 && !cur.justAuth) {
      unlockButton(btn);
      cur.changinEventState = false;
      Widgets.showSubscribeBox(cur.oid, function(html) {
        html !== void(0) && val('community_footer', html);
        Community.sendStateEvent(state);
        participate(true);
        Community.resizeWidget();
      }, state, true);
    } else if (!cur.justAuth) {
      Community.sendChangeState(state, cur.oid, function(html) {
        html !== void(0) && val('community_footer', html);
        cur.changinEventState = false;
        participate(false);
        Community.resizeWidget();
      }, 1, function() {
        unlockButton(btn);
        cur.changinEventState = false;
      });
    }
  },

  subscribersBox: function(ev, tab) {
    if (!vk.id || ev && ev.metaKey) return true;
    showBox('al_page.php', {
      act: 'box',
      oid: cur.oid,
      tab: tab === 'friends' ? tab : 'members',
      widget_width: 638
    });
    return false;
  },

  subscribeGroupState: function(state, oid) {
    ajax.post('/widget_community.php', {act: 'a_subscribe', state: state, oid: oid, hash: cur.hash}, {
      onDone: function() {},
      onFail: function() {}
    });
    return true;
  },

  showMore: function() {
    var btn = ge('wall_more_cont');
    if (buttonLocked(btn) || !isVisible(btn)) return;
    lockButton(btn);

    var deleted = 0;
    for (post in cur.wallMyDeleted) cur.wallMyDeleted[post] && deleted++;

    ajax.post('/widget_community.php', {
      act: 'load_more',
      offset: cur.offset - deleted,
      oid: cur.oid,
      wide: cur.wide,
      width: cur.width,
      mode: cur.mode ? 1 : void 0
    }, {
      onDone: function(wallCont, count, limit) {
        cur.offset += limit;
        cur.offset >= count ? hide(btn) : unlockButton(btn);
        ge('page_wall_posts').appendChild(cf(wallCont));
        Community.resizeWidget();
        setTimeout(Community.resizeWidget, 500);
      }
    })
  },

  showLikesBox: function (obj, params) {
    showBox('widget_like.php', extend({
      act: 'a_stats_box',
      obj: obj,
      from: 'wpost',
      check_hash: cur.likeCheckHash,
      widget_width: 638
    }, params || {}));
  },

  override: function(file, force) {
    if (!StaticFiles[file] && force !== true) return;
    switch (file) {
      case 'lite.js':
        extend(window, {

          showTooltip: Widgets.showTooltip,

          showBox: Widgets.showBox({
            'al_photos.php': {'photo_box': true},
            'al_video.php': {'video_box': true},
            'al_places.php': {'show_photo_place': true},
            'al_page.php': {'box': true},
            'like.php': {'publish_box': true},
            'widget_like.php': {'a_stats_box': true},
            'widget_post.php': {'subscribed_box': true, 'audio_claim_warning': true}
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
              Community.showLikesBox(likeInfo[1]);
            } else if (likeInfo[0] == 'shares') {
              Community.showLikesBox(likeInfo[1], {tab: 'published'});
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

      case 'page.js':
        window.Emoji = {

          stickerOver: function() {}

        };

        extend(Wall, {

          pollFull: function() {},

          likesShow: function(el, post_id, opts) {
            opts = opts || {};
            var isPostLike = hasClass(el, 'post_like'),
                p = wall.parsePostId(post_id),
                like_type = p.type,
                post_raw = p.id,
                like_obj = like_type + post_raw,
                postEl = el && gpeByClass('_post_content', el) || wall.domPost(post_raw),
                wrapClass = opts.share ? '_share_wrap' : '_like_wrap',
                wrapEl = domByClass(postEl, wrapClass),
                iconEl = domByClass(wrapEl, '_icon'),
                hasShare = postEl && domByClass(postEl, '_share_wrap');
            if (!iconEl || cur.viewAsBox) return;

            var tt_offset = isPostLike ? 14 : 58,
                wrap_left = getXY(wrapEl)[0],
                icon_left = getXY(iconEl)[0],
                icon_width = getSize(iconEl, true)[0],
                left_offset = icon_left + icon_width / 2 - wrap_left - tt_offset;

            showTooltip(iconEl.parentNode, {
              url: '/like.php',
              params: extend({act: 'a_get_stats', 'object': like_obj, has_share: hasShare ? 1 : ''}, opts.share ? {published: 1} : {}),
              slide: 15,
              shift: [-left_offset, isPostLike ? 5 : -3],
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
              typeClass: 'like_tt ' + (isPostLike ? 'wcommunity_post_like_tt' : 'wcommunity_like_tt'),
              className: opts.cl || ''
            });
          },

          postTooltip: function(el, post, opts) {
          },

          postClick: function(post, event, opts) {
          },

          showReplies: function() {
            return true;
          },

          stickerClick: function() {}

        });

        // wrap with authorization demand
        each(['markAsSpam', 'likeIt'], function(k, v) {
          Wall[v] = (function(func) {
            return function() {
              if (!vk.id) {
                Widgets.auth();
              } else {
                return func.apply(Wall, [].slice.call(arguments));
              }
            }
          })(Wall[v]);
        });
      break;
    }
  }

};

try{stManager.done('api/widgets/al_community.js');}catch(e){}
