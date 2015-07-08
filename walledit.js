var WallEdit = {
  handleEditEsc: function(e) {
    if (e.keyCode == KEY.ESC) {
      WallEdit.cancelEditPost();
    }
  },
  editPost: function(post, text, mediaData, hash, opts, types) {
    if (!window.Emoji) {
      stManager.add(['emoji.js', 'notifier.css'], function() {
        WallEdit.editPost(post, text, mediaData, hash, opts, types);
      });
      return false;
    }
    var txt = ge('wpe_text');
    if (cur.editingPost && (cur.editingPost[0] != post || cur.editingPost[1]) && txt) {
      return window.Emoji ? Emoji.focus(txt) : false;
    }
    var acts = opts.wkview ? 'wl_post_actions_wrap' : ('wpe_bottom' + post),
        node = 'wpt' + post,
        postNode;
    if (opts.reply == 'photo_comment') {
      postNode = ge('pv_comment' + post.replace(/(\d+)photo_(\d+)pv/, '$1_$2'));
    } else if (opts.reply == 'video_comment') {
      postNode = ge('mv_comment' + post.replace(/(\d+)video_(\d+)mv/, '$1_$2'));
    } else {
      postNode = ge('post' + post);
    }

    var editButtonEl = geByClass1('post_edit_button', postNode) || geByClass1('reply_edit_button', postNode);
    if (editButtonEl) {
      setStyle(editButtonEl, { visibility: 'hidden' });
    }

    cur.editingPost = [post, node, acts, opts];
    node = ge(node);
    var author = null;
    if (opts.wkview) {
      author = geByClass1('wl_owner_head_name', ge('wl_post'), 'a');
      WkView.wallOnEdit(post, opts);
    } else {
      author = geByClass1(opts.reply ? 'fw_reply_author' : 'fw_post_author', node.parentNode) || geByClass1('author', node.parentNode);
    }
    hide(geByClass1('wall_signed', domPN(node)));
    var info = ce('span', {className: 'wpe_info'});
    var likeWrap = geByClass1(opts.reply ? 'like_wrap' : 'post_full_like_wrap', postNode, 'div');
    if (author && author.nextSibling) {
      if (author.nextSibling.className == 'wpe_info') {
        re(author.nextSibling);
      }
    }
    cur.editingPost.push(author.nextSibling ? author.parentNode.insertBefore(info, author.nextSibling) : author.parentNode.appendChild(info));
    cur.editingPost.push(likeWrap);

    cur.lang = extend(cur.lang || {}, opts.lang);
    cur.options = extend(cur.options || {}, {share: opts.share});
    cur.editHash = hash;
    val(info, ' - ' + (opts.reply ? getLang('wall_editing_reply') : getLang('wall_editing_post')));

    addEvent(window, 'keydown', WallEdit.handleEditEsc);

    text = Emoji.emojiToHTML(clean(replaceEntities(text)), true);

    var checkev = browser.opera_mobile ? 'blur' : 'keyup';
    node.parentNode.insertBefore(ce('div', {id: 'wpe_cont', innerHTML: '\
<div class="clear_fix"><div class="wpe_text_cont">\
<div id="pv_reply_smile" title="' + stripHTML(getLang('wall_reply_emoji_hint')) + '" class="emoji_smile fl_l" onmouseover="return WallEdit.emojiShowTT(this, event);" onmouseout="return WallEdit.emojiHideTT(this, event);" onmousedown="return cancelEvent(event);"><div class="emoji_smile_icon_on"></div><div class="emoji_smile_icon"></div></div>\
<div id="wpe_text" class="fl_l" contenteditable="true">' + text + '</div>\
</div></div>\
<div id="wpe_warn"></div>\
<div id="wpe_media_preview" class="clear_fix media_preview"></div>\
' + (opts.signed ? ('<div id="wpe_signed" class="checkbox' + (opts.signed > 0 ? ' on' : '') + '" onclick="checkbox(this)"><div></div>' + getLang('wall_suggest_subscribe') + '</div>') : '') + '\
' + (opts.add ? '<div class="wpe_auth">' + opts.add + '</div>' : '') + '\
<div class="wpe_buttons">' +
  ((!opts.noatt) ? '<div id="wpe_add_media" class="fl_r"><span class="add_media_lnk">' + getLang('global_add_media') + '</span></div>' : '') +
  '<div class="button_blue fl_l">\
    <button onclick="WallEdit.savePost()">' + getLang('global_save') + '</button>\
  </div>\
  <div class="button_cancel wpe_cancel fl_l">\
    <div class="button" onclick="WallEdit.cancelEditPost()">' + getLang('global_cancel') + '</div>\
  </div>\
  <div class="progress fl_l" id="wpe_prg"></div>\
</div>'}, {display: 'none'}), node);

    var mentionsLang = {introText: getLang('profile_mention_start_typing'), noResult: getLang('profile_mention_not_found')};

    if (opts.noatt) {
      setTimeout(function () {
        addClass('wpe_media_preview', 'med_no_attach');
        show(node.previousSibling, 'wpe_media_preview');
        hide(node, acts, likeWrap);
        cur.wallEditComposer = Composer.init(ge('wpe_text'), {lang: mentionsLang});
        Emoji.editableFocus('wpe_text');
      }, 0);
      return;
    }

    setTimeout(function() {
      show(node.previousSibling);
      hide(node, acts, likeWrap);

      var mediaTypes = [], mediaOpts, dis = [];
      if (opts.reply) {
        each (types, function () {
          if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link'])) {
            mediaTypes.push(this);
          }
        });
        dis = ['album'];
      } else if (opts.copy) {
        each (types, function () {
          if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'postpone'])) {
            mediaTypes.push(this);
          }
        });
        dis = ['album', 'share', 'link', 'page'];
      } else {
        mediaTypes = types;
      }
      if (mediaTypes.length > 0) {
        mediaOpts = {
          lnk: ge('wpe_add_media').firstChild,
          preview: 'wpe_media_preview',
          types: mediaTypes,
          options: {
            toId: post.split('_')[0],
            disabledTypes: dis,
            limit: opts.copy ? 1 : (opts.reply ? 2 : 10),
            toggleLnk: opts.reply || opts.copy,
            editable: !opts.reply && !opts.copy,
            sortable: !opts.reply && !opts.copy
          }
        };
        if (opts.teWidth) mediaOpts.options.teWidth = opts.teWidth;
        if (opts.teHeight) mediaOpts.options.teHeight = opts.teHeight;
        if (opts.reply == 'photo_comment' || opts.reply == 'video_comment') {
          mediaOpts.options.nocl = 1;
        }
      }

      var txt = ge('wpe_text');
      cur.wallEditComposer = Composer.init(txt, {
        lang: mentionsLang,
        media: mediaOpts
      });

      if (mediaOpts) {
        cur.wallEditMedia = cur.wallEditComposer.addMedia;

        for (var i = 0, l = mediaData.length; i < l; ++i) {
          cur.wallEditMedia.chooseMedia.apply(cur.wallEditMedia, mediaData[i]);
          if (mediaData[i][0] == 'postpone') {
            cur.editingPost.push(mediaData[i][1]);
          }
        }
      }

      cur.weEmoji = Emoji.init(txt, {
        ttDiff: -48,
        rPointer: true,
        controlsCont: txt.parentNode,
        shouldFocus: true,
        onSend: function() {
          WallEdit.savePost();
        },
        noEnterSend: true,
        noStickers: true,
        checkEditable: function() {
          Wall.checkPostLen.pbind(txt, 'wpe_warn', Emoji.val(txt));
        }
      });
    }, 0);
  },
  emojiShowTT: function(obj, ev) {
    if (cur.weEmoji === undefined) {
      return false;
    }
    return Emoji.ttShow(cur.weEmoji, obj, ev);
  },
  emojiHideTT: function(obj, ev) {
    if (cur.weEmoji === undefined) {
      return false;
    }
    return Emoji.ttHide(cur.weEmoji, obj, ev);
  },
  showEmojiTT: function(obj, ev) {
    if (cur.weEmoji === undefined) {
      return false;
    }
    return Emoji.ttClick(cur.weEmoji, obj, false, false, ev);
  },
  cancelEditPost: function(data, html, fronly) {
    if (!cur.editingPost) return;
    var post = cur.editingPost[0],
        node = ge(cur.editingPost[1]),
        acts = ge(cur.editingPost[2]),
        opts = cur.editingPost[3],
        prg = ge('wpe_prg'),
        info = cur.editingPost[4],
        likeWrap = cur.editingPost[5],
        postponeDate = cur.editingPost[6];

    if (!post || !node || !acts || !prg || isVisible(prg)) return;

    var txt = ge('wpe_text');
    if (data === 0) {
      return window.Emoji ? Emoji.focus(txt) : false;
    }

    cur.editingPost = false;
    removeEvent(window, 'keydown', WallEdit.handleEditEsc);

    Wall.deinitComposer(txt);

    var mediaEl = ge('wpe_add_media');

    mediaEl && cleanElems(mediaEl.firstChild);

    var postNode = ge('post' + post);
    var editButtonEl = geByClass1('post_edit_button', postNode) || geByClass1('reply_edit_button', postNode);
    if (editButtonEl) {
      setStyle(editButtonEl, { visibility: '' });
    }

    if (data == -1) {
      val('wall_postponed', html);
      return;
    } else if (data !== undefined) {
      val(node, data);
      val(info, ' - ' + (opts && opts.reply ? getLang('wall_reply_saved') : getLang('wall_post_saved')));
      var dcont = geByClass1('rel_date', acts);
      if (postponeDate) {
        if (html && dcont) {
          dcont.innerHTML = html;
        }
        var fronlyEl = geByClass1('page_fronly', node.parentNode);
        if (fronly && !fronlyEl) {
          if (info.nextSibling) info.parentNode.insertBefore(se(fronly), info.nextSibling);
          else info.parentNode.appendChild(se(fronly));
        } else if (!fronly && fronlyEl) {
          re(fronlyEl);
        }
      }
      setTimeout(animate.pbind(info, {opacity: 0}, 500, re.pbind(info)), 1500);
      if (post.match(/^-?\d+photo_/)) {
        window.Photoview && Photoview.commSaved(post);
      } else if (post.match(/^-?\d+video_/)) {
        window.Videoview && Videoview.commSaved(post);
      }
    } else {
      re(info);
    }
    show(acts, node, likeWrap);
    show(geByClass1('wall_signed', domPN(node)));
    re(node.previousSibling);
    if (opts.wkview) {
      WkView.wallOnEdited(post);
    }
    if (opts.from == 'exchange') {
      re('exchange_msg');
    }
    var _a = window.audioPlayer;
    if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
  },
  savePost: function() {
    if (!cur.editingPost) return;
    var post = cur.editingPost[0],
        prg = ge('wpe_prg'),
        opts = cur.editingPost[3];

    if (!post || !prg || isVisible(prg)) return;

    var composer = cur.wallEditComposer,
        addMedia = cur.wallEditMedia || {},
        params = Composer.getSendParams(composer, WallEdit.savePost),
        from = cur.onepost ? 'one' : ((window.wkcur || {}).shown ? 'wk' : '');

    if (opts.from) {
      from = opts.from;
    } else if (post.match(/^-?\d+photo_/) && cur.pvShown) {
      from = 'photo';
    } else if (post.match(/^-?\d+video_/) && window.mvcur && mvcur.mvShown && !mvcur.minimized) {
      from = 'video';
    }

    if (params.delayed) {
      return;
    }

    extend(params, {
      act: 'save',
      post: post,
      whole: 1,
      hash: cur.editHash,
      signed: isChecked('wpe_signed'),
      from: from
    });
    var chk;
    if (chk = ge('status_export' + addMedia.lnkId)) {
      params.status_export = isChecked(chk);
    }
    if (chk = ge('facebook_export' + addMedia.lnkId)) {
      params.facebook_export = isChecked(chk);
    }
    if (chk = ge('friends_only' + addMedia.lnkId)) {
      params.friends_only = isChecked(chk);
    }

    if (!params.attach1_type && !params.message && !opts.copy) {
      return window.Emoji ? Emoji.focus(ge('wpe_text')) : false;
    }

    ajax.post('al_wall.php', Wall.fixPostParams(params), {
      progress: prg,
      onDone: WallEdit.cancelEditPost
    });
  }
};

try{stManager.done('walledit.js');}catch(e){}
