var MediaPoster = function(postType, target, preview, msgBox, toId, types, isAdmin) {
  target = ge(target);
  if (!target || data(target, 'inited')) return;
  data(target, 'inited', 1);
  preview = ge(preview);
  var base_domain = (vk.al ? '/' : window.base_domain);

  var icon = base_domain + 'images/icons/wall_icons.gif?1';
  var id = target.id, hideTO = false;
  (new Image()).src = icon;

  var itemInfo = {
    graffiti: ['graffiti.php?act=draw&to_id=', 0],
    video: ['video.php?to_id=', -22],
    photo: ['photos.php?to_id=', -44],
    audio: ['audio.php?to_id=', -66],
    poll: ['id', -88]
  }

  var rows = '', spec_style = (/mac/.test(_ua) && browser.mozilla) ? 'height: 19px; padding-top: 3px;' : '';
  each(types, function(i, v) {
    if (v[0] != 'app') {
      var info = itemInfo[v[0]], url = base_domain + info[0] + toId;
      var ico = icon;
      var bgpos = '0px ' + info[1] + 'px;';
    } else {
      var appId = v[3];
      var ico = v[5];
      var url = base_domain + 'app' + appId + '?to_id=' + toId;
      var bgpos = '3px 3px';;
    }
    rows += '<a onfocus="this.blur()" id="' + id + '_post_type' + i + '" style="background-image: url(' + ico + '); background-position: ' + bgpos + spec_style + '" href="' + url + '">' + v[1].replace(/\s/g, '&nbsp;') + '</a>';
  });

  var prefix = vk.al ? 'add_media' : 'add_wall';
  var html = '<table cellspacing="0" cellpadding="0"><tr><td class="' + prefix + '_side"><div>&nbsp;</div></td><td><div class="rows">' + rows + '</div><div class="' + prefix + '_bottom"></div><div class="' + prefix + '_bottom2"></div></td><td class="' + prefix + '_side"><div>&nbsp;</div></td></tr></table>';
  if (!ge(id + '_add_menu')) {
    var toAppend = document.body;
    toAppend.appendChild(ce('div', {
      id: id + '_menu',
      className: prefix + '_menu',
      innerHTML: '<div id="' + id + '_header" class="' + prefix + '_header"><div>' + target.innerHTML + '</div></div><div id="' + id + '_rows" class="' + prefix + '_rows">' + html + '</div>'
    }));
  } else {
    ge(id + '_rows').innerHTML = html;
  }

  var hideMenu = function(noTimeout) {
    var hideFunc = function() {
      browser.msie ? hide(id + '_menu') : fadeOut(ge(id + '_menu'), 100);
    }
    if (noTimeout) hideFunc();
    else hideTO = setTimeout(hideFunc, 300);
  }

  var showMenu = function() {
    clearTimeout(hideTO);
    onDomReady(function() {
      var el = ge(id + '_menu');
      if (el && !isVisible(el)) {
        target.blur();
        var coords = getXY(target);
        var left = coords[0] - 8 + (browser.msie6 ? 1 : 0);
        var top = coords[1] - 4 + (browser.msie && !browser.msie8 ? 1 : 0);
        setStyle(el, {left: left, top: top});
        if (/mac/.test(_ua) && browser.mozilla) {
          setStyle(ge(id + '_rows'), 'top', 22);
        }
        browser.msie ? show(el) : fadeIn(el, 100);
//el.style.display = 'block';
//el.style.opacity = 0.5;
      }
    });
    return false;
  }

  addEvent(ge(id + '_menu'), 'mouseover', function() { showMenu(); });
  addEvent(ge(id + '_menu'), 'mouseout', function() { hideMenu(); });

  each(types, function(i, v){
    addEvent(ge(id + '_post_type' + i), 'click', function(onClick) {
      hideMenu(true);
      var href = itemInfo[v[0]] && itemInfo[v[0]][0];
      var t = v[2], h = v[3];
      var appId = v[3], appHref = v[4], icon = v[5], appHash = v[6];
      var url = base_domain + (v[0] == 'app' ? ('app' + appId + '?to_id=') : href) + toId;
      switch (v[0]) {
        case 'graffiti': showGraffitiBox(toId, t, h); break;
        case 'photo': showPhotoBox(toId, t, url, h, isAdmin); break;
        case 'video': showVideoBox(toId, t, url); break;
        case 'audio': showAudioBox(toId, t, url); break;
        case 'app': showAppBox(toId, t, appId, url, appHash, v[1], icon); break;
        case 'poll': showPollBox(toId, t, h); break;
      }
      return false;
    });
  });

  var boxes = {};

  var cancelBox = function(type){
    if (type == 'share' || !boxes[type]) return;
    boxes[type].content('');
    boxes[type].setOptions({onHideAttempt: false}).hide(); return false;
  };

  function clearReplyField(el) {
    if (window.mentions_mod) {
      var mention = data(el, 'mention');
      if (mention) {
        hide(mention.cont);
        show(el);
      }
      hide('status_warn');
      hide('submit_status');
    }
    if (!el) return;
    setStyle(el, {height: 14});
    if (el.setValue) {el.setValue();}
    else {
      el.value = '';
      el.phevents = 0;
      placeholderSetup(el);
    }
  }

  function postAttach(media, media_id, toId, hash, options, target, preview) {
    posting_on_wall = true;
    var own_reply = ge('own_reply_field');
    var el = ge(msgBox), msg = (el && isFunction(el.getValue)) ? el.getValue() : (el && el.value || '');
    var type = ge('wall_type') ? ge('wall_type').value : 0, export_el = ge('export_to_twitter'), reply_to;
    var do_export = own_reply ? isChecked('own_reply_export') : (export_el && export_el.value || 0);

    if (own_reply) {
      type = '';
      reply_to = -1;
      hide('export_cb');
      show('own_reply_progress');
    } else if (ge('group_status')) {
      reply_to = ge('group_status').value == 1 ? -1 : 0;
    } else {
      reply_to = postType=='status' ? -1 : 0;
    }

    if (own_reply) {
      msg = cur.ownReplyField.getValue ? cur.ownReplyField.getValue() : cur.ownReplyField.value;
    }
    var params = {act: 'a_post_wall', hash: hash, media: media, media_id: media_id, to_id: toId, message: msg, type: type, reply_to: reply_to, status_export: do_export};
    if (own_reply) {
      params.own_reply = ge('own_reply_post_raw').value;
    }
    if (ge('mainFeed')) {
      params.microblog_on = 1;
    }
    if (media == 'share') {
      if (share_data.parse_failed || !share_data.url) {
        delete params.media;
        delete params.media_id;
      } else {
        params.media_id = share_data.user_id + '_' + share_data.photo_id;
        params.description = share_data.description;
        params.url = share_data.url;
        params.title = share_data.title;
      }
    }
    if (share_data && share_data.initial_pattern) {
      params.message = params.message.replace(share_data.initial_pattern, ' ');
    }
    if (media == 'poll') {
      params.question = ge(postType + '_poll_question').value;
      var answers = [], answer;
      for (var i = 1; i <= 10; i++) {
        if (answer = trim(ge(postType + '_poll_answer'+i).value)) {
          answers.push(answer);
        }
        params.answers = answers.join('#@*');
      }
    }

    if (share_data.extra) { //youtube
      params.extra = share_data.extra;
      params.extra_data = share_data.extraData;
    }

    if (share_data.openGraph) {
      params['open_graph_data'] = share_data.openGraph.data;
      params['open_graph_hash'] = share_data.openGraph.hash;
    }

    var opt = {
      onSuccess: function(o, t) {
        data(target, 'postFunc', false);
        data(target, 'media', false);
        preview.innerHTML = '';
        if (sharePreview) {
          share_data = {};
          sharePreview.innerHTML = '';
          hide(sharePreview);
          hide(sharePreview.nextSibling);
        }
        if (pollConstructor) {
          hide(pollConstructor);
          hide(pollConstructor.nextSibling);
        }
        try{
        posting_on_wall = false;
        if (own_reply) {
          hide('own_reply_progress');
          show('export_cb');
          var box = AlertBox(cur.ownReplyTitle, t);
          box.show();
          setTimeout(box.hide.pbind(200), 2000);
          return;
        }
        var r = eval('(' + t + ')');
        if (toId < 0 && type) {
          wallHistory[0] = r.microblog;
          wallHistory[1] = r.wall;
          if (type == 2) {
            ge('status_top_box_wrap').innerHTML = wallHistory[0];
          } else {
            ge('status_top_box_wrap').innerHTML = wallHistory[1];
          }
          clearReplyField(el);
        } else {
          if (ge('fBox2')) {
            ge('fBox2').innerHTML = r.html;
          } else {
            fbox2_cache = r.html;
          }
          clearReplyField(el);
          if (ge('status_box')) {
            ge('status_box').innerHTML = r.status || '';
          }
        }

        if (isFunction(options.onSuccess)) return options.onSuccess(o,t,r);
        } catch(e) { debugLog(e.message); }
      },
      onFail: function(o,t) {
        if (own_reply) {
          hide('own_reply_progress');
          show('export_cb');
        }
        posting_on_wall = false;
        if (isFunction(options.onFail)) return options.onFail(o,t);
      },
      onCaptchaShow: function() {
        if (own_reply) {
          hide('own_reply_progress');
          show('export_cb');
        }
        posting_on_wall = false;
        if (isFunction(options.onCaptchaShow)) options.onCaptchaShow();
      },
      onCaptchaHide: function(done) {
        if (own_reply) {
          hide('own_reply_progress');
          show('export_cb');
        }
        posting_on_wall = false;
        if (done) return;
        if (isFunction(options.onCaptchaHide)) options.onCaptchaHide(done);
      }
    };
    Ajax.Send('wall.php', params, opt);
  }

  var showGraffitiBox = function(toId, title, post_hash) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }

    if (!boxes['graffiti']) {
      boxes['graffiti'] = new MessageBox({returnHidden: true, title:title, width: 610, bodyStyle: 'padding: 0px', type: 'POPUP', hideOnClick: false, progress: 'graffiti_draw_progress', onLoad: function() {
        if (ge('graffitiDraw')) {
          boxes['graffiti'].setOptions({onHideAttempt: function() {
            var result = ge('graffitiDraw').cancelDrawing(), grel = ge('graffitiDrawing');
            if (result) {
              grel.innerHTML = '';
              grel.parentNode.removeChild(grel);
            }
            return result;
          }});
          setStyle(ge('graffitiDrawing'), 'height', 483);
        } else {
          boxes['graffiti'].setOptions({width: 400, bodyStyle: 'padding: 16px 14px', type: 'MESSAGE'}).addButton({label: global_close, onClick: function() { return cancelBox('graffiti'); }});
        }
      }});
    } else {
      boxes['graffiti'].setOptions({width: 610, bodyStyle: 'padding: 0px', type: 'POPUP'});
    }
    window.drawGraffitiTitle = title;
    boxes['graffiti'].removeButtons().loadContent('graffiti.php', {act: 'a_draw_box', to_id: toId}, true).show();

    window.graffitiUploaded = function() {
      if (posting_on_wall) {
        return;
      }
      drawNeedConfirm = true;

      var box = boxes['graffiti'];

      var options = {onSuccess: function(o, t, r) {
        drawNeedConfirm = false;
      }, onFail: function() {
      }, onCaptchaShow: function() {
        box.setOptions({onHide: null});
      }, onCaptchaHide: function(done) {
        box.setOptions({width: 606, bodyStyle: 'padding: 10px', type: 'MESSAGE', onHide: function() {
          if (!boxes['graffiti_warning']) {
            var bw = new MessageBox({title: global_warning});
            boxes['graffiti_warning'] = bw;
            bw.content(window.lang_graffiti_cancel_confirm).addButton({label: global_cancel, style: 'button_no', onClick: function() { bw.hide(); return false; }}).addButton({label: global_continue, onClick: function() { drawNeedConfirm = false; bw.setOptions({onHide: null}); bw.hide(); }});
          }
          boxes['graffiti_warning'].setOptions({onHide: function() { box.show(); }}).show();
        }});
        box.removeButtons().addButton({label: global_cancel, style: 'button_no', onClick: function() { box.hide(); return false; }}).addButton({label: window.lang_graffiti_send, onClick: function() {
          show('graffiti_draw_progress');
          box.setOptions({onHide: null});
          graffitiUploaded();
        }});
        box.content('<div id="uploadedGraffiti" style="width: 586px; height: 293px; background: #fff url(' + base_domain + 'images/progress7.gif) no-repeat 50% 50%; overflow: hidden"></div>').show();
      }};


      Ajax.Post({url: 'graffiti.php', query: {act: 'a_get_last',preview:1}, onDone: function(obj, text) {
        if (text) {
          setPreview('graffiti', [text, 136, 68], null, toId, post_hash, options);
        } else if (box) {
          box.content(global_unknown_error).removeButtons().addButton({label: global_cancel, style: 'button_no', onClick: function() { boxes['graffiti'].hide(); return false; }});
        }
      }});
    }

    window.doCancelDrawing = function(){cancelBox('graffiti');}
    return false;
  }

  var showPhotoBox = function(toId, title, href, post_hash, isAdmin) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }
    addCss('css/profile.css');
    if (postType == 'status') href += '&status_add=1';
    var b = boxes['photo'];
    if (!b) {
      boxes['photo'] = b = (new TabbedBox('', [], {
        returnHidden: true,
        title: title, search: '<div style="padding:4px;">&nbsp;</div>', width: 610, progress: 'choose_photo_progress', closeButton: true,
        fullPageLink: href, showOneTab: true, bodyStyle: 'height: 374px; padding: 0px;',
        onTab: function(tab, loaded) {
          if(!loaded) {
            b.tabLoadContent(tab, 'photos.php', {act: 'a_choose_photo_box', tab:tab, to_id: toId, scrollbar_width: window.sbWidth(),preview:1}, true, 'height: 374px');
            return false;
          }
        }
      })).addButton({label: global_close, onClick: function(){b.hide(); return false;}});
    }

    hide('choose_photo_progress');
    b.loadTab('my_photos').show();

    window.doSendPhoto = function(phid, toId, hash, src) {
      if (posting_on_wall) {
        return false;
      }
      var options = {onSuccess: function(o, t, r) {
        hide('choose_photo_progress');
        b.hide();
      }, onCaptchaHide: function(done) {
        b.show();
        b.fixIE6();
        hide('choose_photo_progress');
      }};
      setPreview('photo', [src, 75, 0], phid, toId, hash, options);
      return false;
    }

    window.newPostedUploaded = function(phid, thumb_x, thumb_s) {
      hide('upload_new_error', 'choose_photo_progress');
      if (ge('upload_new_file')) {
        ge('upload_new_file').innerHTML = '<input type="file" name="' + ge('upload_new_file').firstChild.name + '" onchange="uploadNew()" style="font-size: 11px" />';
      }
      if (!boxes['photo'].isVisible()) {
        return;
      }
      cancelBox('photo');
      setPreview('posted_photo', [thumb_s, 75, 0], phid, toId, post_hash, {});
    }

    return false;
  }

  var showVideoBox = function(toId, title, href) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }
    addCss('css/profile.css');
    href = href.href ? href.href : href;
    var b = boxes['video'];
    if (!b) {
      boxes['video'] = b = (new TabbedBox('', [], {
        returnHidden: true,
        title: title, width: 610, progress: 'choose_video_progress', closeButton: true, fullPageLink: href,
        bodyStyle: 'height: 374px; padding: 0px;', showOneTab: true, search: '<div style="padding:7px 4px;">&nbsp;</div>',
        onTab: function(tab, loaded) {
          if(!loaded) {
            b.tabLoadContent(tab, 'video.php', {act: 'a_choose_video_box', tab:tab, to_id: toId, scrollbar_width: window.sbWidth(), preview:1}, true, 'height: 374px');
            return false;
          }
        }
      })).addButton({label: global_close, onClick: function(){b.hide(); return false;}});
    }

    hide('choose_video_progress');
    b.loadTab('my_videos').show();

    window.doSendVideo = function(id, owner, toId, hash, src) {
      if (posting_on_wall) {
        return false;
      }
      show('choose_video_progress');
      var options = {onSuccess: function(o, t, r) {
        hide('choose_video_progress');
        show('msg_video');
        b.hide();
      }, onCaptchaHide: function(done) {
        b.show();
        b.fixIE6();
        hide('choose_video_progress');
      }};
      setPreview('video', [src, 65, 0], owner + '_' + id, toId, hash, options);
      return false;
    }

    return false;
  }

  var showAudioBox = function(toId, title, href) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }
    addCss('css/profile.css');
    var b = boxes['audio'];
    if (!b) {
      boxes['audio'] = b = new TabbedBox('', [], {
        returnHidden: true,
        title: title, width: 610, progress: 'choose_audio_progress', closeButton: true, fullPageLink: href,
        bodyStyle: 'height: 374px; padding: 0px;', showOneTab: true, search: '<div style="padding:7px 4px;">&nbsp;</div>',
        onHide: function() {
          if (window.AudioObject) {
            AudioObject.hidePlayer();
            AudioObject.curAudio = null;
          }
        },
        onTab: function(tab, loaded) {
          if(!loaded) {
            b.tabLoadContent(tab, 'audio.php', {act: 'a_choose_audio_box', tab:tab, to_id: toId, preview:1}, true, 'height: 374px');
            return false;
          }
        }
      }).addButton({label: global_close, onClick: function(){b.hide(); return false;}});
    }
    hide('choose_audio_progress');
    b.loadTab('my_audios').show();

    window.doSendAudio = function(id, owner, toId, hash, performer, songTitle) {
      if (posting_on_wall) {
        return false;
      }
      audio_owner = owner ? owner : 0;
      show('choose_audio_progress');
      var options = {onSuccess: function(o, t, r) {
        posting_on_wall = false;
        hide('choose_audio_progress');
        show('msg_audio');
        b.hide();
      }, onCaptchaHide: function(done) {
        b.show();
        b.fixIE6();
        hide('choose_audio_progress');
      }};
      setPreview('audio', [performer, songTitle], audio_owner + '_' + id, toId, hash, options);
      return false;
    }
    return false;
  }

  // Inline Polls
  var pollConstructor = null, pollHTML = '<div><div class="row"><div class="label">{question}</div><div class="labeled"><input id="'+postType+'_poll_question" type="text" style="margin-bottom: 8px;"/></div></div><div class="row"><div class="label">{answers} <nobr><a href="#" id="'+postType+'_poll_inc">'+getLang('global_add').toLowerCase()+'</a><span class="divider" id="'+postType+'_poll_split"> | </span><a href="#" id="'+postType+'_poll_dec" class="disabled">'+getLang('global_delete').toLowerCase()+'</a></nobr></div><div class="labeled">{answers_inputs}</div><div class="clear"></div></div>', ansHTML = '', numAnswers = 2;
  for (var i = 1; i <= 10; i++) {
    ansHTML += '<input type="text" id="'+postType+'_poll_answer'+i+'"'+(i > 2 ? ' style="display: none; "' : '')+'/> ';
  }
  var showPollBox = function(toId, labels, hash) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }
    if (!pollConstructor) {
      pollConstructor = ce('div', {id: postType+'_poll', className: 'wall_poll'});
      data(preview, 'pollConstructor', pollConstructor);
      ge(postType+'_attach').parentNode.insertBefore(pollConstructor, ge(postType+'_attach'));
      ge(postType+'_attach').parentNode.insertBefore(ce('div', {className: 'status_poll_preview_tail tt_bottom_pointer'}), ge(postType+'_attach'));
    } else {
      pollConstructor.innerHTML = '';
      show(pollConstructor);
      show(pollConstructor.nextSibling);
    }
    var html = pollHTML.replace('{question}', labels[1]).replace('{answers}', labels[2]).replace('{answers_inputs}', ansHTML);
    var tmpDiv = ce('div', {innerHTML: html}, {position: 'absolute', width: getSize(pollConstructor)[0], visibility: 'hidden'});
    document.body.appendChild(tmpDiv);
    var tmpDiv1 = ce('div');
    pollConstructor.appendChild(tmpDiv1);

    animate(tmpDiv1, {height: getSize(tmpDiv)[1]}, 400, function () {
      pollConstructor.innerHTML = html;
      addEvent(ge(postType+'_poll_question'), 'keyup', function () {
        var q = this.value;
        ge(postType+'_poll_question_preview').innerHTML = q ? (': <span class="pollQ">' + (q.length > 40 ? q.substr(0,40)+'...' : q) + '</span>') : '';
      });
      numAnswers = 2;
      addEvent(ge(postType+'_poll_inc'), 'click', function () {
        if (numAnswers >= 10) return false;
        numAnswers++;
        show(postType+'_poll_answer'+numAnswers);
        ge(postType+'_poll_inc').className = numAnswers >= 10 ? 'disabled' : '';
        ge(postType+'_poll_dec').className = numAnswers <= 2 ? 'disabled' : '';
        return false;
      });
      addEvent(ge(postType+'_poll_dec'), 'click', function () {
        if (numAnswers <= 2) return false;
        hide(postType+'_poll_answer'+numAnswers);
        numAnswers--;
        ge(postType+'_poll_inc').className = numAnswers >= 10 ? 'disabled' : '';
        ge(postType+'_poll_dec').className = numAnswers <= 2 ? 'disabled' : '';
        return false;
      });
    });
    document.body.removeChild(tmpDiv);
    tmpDiv.innerHTML = '';
    setPreview('poll', labels, false, toId, hash, false);
    addCss('css/profile.css');
  }

  function showAppBox(toId, title, app_id, href, post_hash, name, icon) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
      return true;
    }
    //if (window.hideReplyBox) hideReplyBox();
    var b = boxes['app'];
    if (!b) {
      attachScript('appsFlash', base_domain+'js/apps_flash.js?35');
      b = boxes['app'] = new MessageBox({title: title, width: 609, progress: 'choose_app_progress', closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;', onHideAttempt: function() {
        b.content('');
        return true;
      }});
      b.addButton({label: global_close, onClick: function(){b.hide(); return false;}});
    }
    hide('choose_app_progress');
    b.loadContent('apps.php', {act: 'a_choose_app_box', to_id: toId, aid: app_id}, true, 'height: 412px').show();

    window.doSendAppPost = function(dataHash) {
      if (posting_on_wall || !b || !b.isVisible()) {
        return;
      }
      show('choose_app_progress');

      var options = {onSuccess: function(o, t, r) {
        hide('choose_app_progress');
        show('msg_photo');
        if (r.url) {
          location.replace(text.url);
          return;
        }
        b.hide();
      }, onCaptchaHide: function(done) {
        b.show();
        b.fixIE6();
        hide('choose_app_progress');
      }};
      setPreview('app', [name, icon], dataHash, toId, decodehash(post_hash), options);
    }
    return false;
  }

  var drawNeedConfirm = false;

  var setPreview = function(type, info, media_id, toId, hash, options) {
    var obj;
    switch(type) {
      case 'audio': obj = '<div class="attach_audio fl_l"><span class="performer">'+info[0]+'</span> - <span class="title">'+info[1]+'</span></div>'; break;
      case 'app': obj = '<div class="attach_app fl_l"><span><img src="'+info[1]+'"/></span><span>'+info[0]+'</span></div>'; break;
      case 'share': obj = '<div class="attach_url fl_l"><span>'+getLang('wall_link_label')+': <a href="' + base_domain + 'away.php?to=' + encodeURIComponent(info[1]) + '" target="_blank">'+info[0]+'</a></span></div>';
      shareLoadPreview(info[1]);
      break;
      case 'poll': obj = '<div class="attach_poll fl_l"><span>Опрос</span><span id="'+postType+'_poll_question_preview"></span></div>'; break;
      default:
        var size = 'width: '+info[1]+'px;' + (info[2] ? 'height: '+info[2]+'px;' : '');
        obj = '<div class="attach_img fl_l"><img style="'+size+'" src="'+info[0]+'" /></div>';
        break;
    }
    if (type != 'poll' && pollConstructor) {
      hide(pollConstructor);
      hide(pollConstructor.nextSibling);
    }
    if (type != 'share' && sharePreview) {
      hide(sharePreview);
      hide(sharePreview.nextSibling);
    }
    preview.innerHTML = '<div class="attach_box clearFix">'+obj+'<div class="attach_x fl_l"><div class="iconX" onmouseover="overX(this);" onmouseout="outX(this);" onclick="cancelMedia(\''+preview.id+'\', \''+id+'\')"></div></div></div>';

    data(target, 'postFunc', function(onSuccess) {
      if (isFunction(onSuccess)) {
        var f = options.onSuccess;
        options.onSuccess = function(o,t,r) {if(isFunction(f)) f(o,t,r); onSuccess(o,t,r);};
      }
      if (type == 'share') {
        postShareAttach(type, media_id, toId, hash, options, target, preview);
        return;
      }
      postAttach(type, media_id, toId, hash, options, target, preview);
    });
    data(target, 'media', type); data(target, 'force', 1);
    cancelBox(type);
    try {ge(msgBox).onkeyup(); ge(msgBox).blur(); ge(msgBox).focus(); } catch (e) {debugLog(e);}
  }

  window.overX = function(obj) {
    obj.className = 'iconXover';
    //showTooltip(obj, obj.getAttribute('tooltip_text'), 1);
  }

  window.outX = function(obj) {
    obj.className = 'iconX';
    //hideTooltip();
  }

  window.cancelMedia = function(preview, id) {
    preview = ge(preview);
    preview.innerHTML = '';
    var pollConstructor = data(preview, 'pollConstructor');
    var sharePreview = data(preview, 'sharePreview');
    if (share_data) {
      if (share_data.url) urls_cancelled.push(share_data.url);
      if (share_data.initial_pattern) urls_cancelled.push(share_data.initial_pattern);
      share_data = {};
    }
    if (sharePreview) {
      sharePreview.innerHTML = '';
      hide(sharePreview);
      hide(sharePreview.nextSibling);
    }
    if (pollConstructor) {
      hide(pollConstructor);
      hide(pollConstructor.nextSibling);
    }
    data(ge(id), 'postFunc', false);
    data(ge(id), 'media', false);
    data(ge(id), 'force', 1);
    ge(msgBox).onkeyup();
  }

  /* Share URL posting */
  var
    share_data = {},
    sharePreview = ge('wall_share_preview'),
    url_active_ta = /([!()?., \r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0])/i,
    url_inactive_ta = /([!()?., \r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i,
    url_matches,
    urls_cancelled = [],
    media_info_loading = false;


  var checkLinkInField = function (wiki_value, noFocus) {
    if (browser.msie6) return;
    if (trim(ge(postType+'_attach').innerHTML)) return;
    var rx = noFocus ? url_inactive_ta : url_active_ta;
    while (wiki_value && (matches_url = wiki_value.match(rx))) {
      wiki_value = wiki_value.substr(matches_url.index + matches_url[0].length);
      var url = matches_url[2], initial_url = url;
      url = url.replace(/[,.;'!@#$%^&*()?:]+$/, '');
      if (!url.match(/^https?:\/\//)) url = 'http://' + url;
      if (inArray(url, urls_cancelled) || inArray(initial_url, urls_cancelled)) continue;
      if (matches_url[4].match(/vkontakte.ru|vk.com|vkontakte.com|vk.cc/)) {
        var query = matches_url[5], media_matches = null, media_type = false;
        if ((media_matches = query.match(/#photo\/(\-?\d+)_(\d+)/)) || (media_matches = query.match(/photo(\-?\d+)_(\d+)/)) || (media_matches = query.match(/photos.php\?oid=\-?\d+&act=show&id=(\-?\d+)_(\d+)/))) {
          media_type = 'photo';
        } else if ((media_matches = query.match(/video(\-?\d+)_(\d+)/))) {
          media_type = 'video';
        } else if ((media_matches = query.match(/audio.php\?id=(\-?\d+)&audio_id=(\d+)/))) {
          media_type = 'audio';
        }
        if (!media_type) continue;
        if (media_info_loading) return;
        media_info_loading = true;
        Ajax.Send('wall.php?act=a_get_media_info', {type: media_type, media: media_matches[1]+'_'+media_matches[2], to_id: toId}, {
          onSuccess: function (o, t) {
            var res = eval('('+t+')');
            switch (res.media) {
              case 'photo':
                setPreview('photo', [res.thumb, 75, 0], res.full_id, res.to_id, res.hash, {});
                break;
              case 'audio':
                setPreview('audio', [res.performer, res.song], res.full_id, res.to_id, res.hash, {});
                break;
              case 'video':
                setPreview('video', [res.thumb, 75, 0], res.full_id, res.to_id, res.hash, {});
                break;
            }
            share_data = {initial_pattern: initial_url};
            data(preview, 'sharePreview', sharePreview);
            media_info_loading = false;
          },
          onFail: function () {
            media_info_loading = false;
          }
        });
        return;
      }

      share_data = {url: url, domain: matches_url[4], initial_pattern: initial_url};
      addCss('css/profile.css');
      setPreview('share', [share_data.domain, share_data.url], 0, toId, shareServerData.send_hash, {});
      wiki_value = wiki_value.substr(matches_url.index, matches_url.index + matches_url[0].length);
    }
  }
  data(ge((postType == 'status' ? 'status' : 'reply')+'_field'), 'checkLink', checkLinkInField);

  function shareLoadPreview(url) {
    if (!sharePreview) {
      sharePreview = ce('div', {id: 'wall_share_preview'});
      data(preview, 'sharePreview', sharePreview);
      ge(postType + '_attach').parentNode.insertBefore(sharePreview, ge(postType + '_attach'));
      ge(postType + '_attach').parentNode.insertBefore(ce('div', {className: 'wall_share_preview_tail tt_bottom_pointer'}), ge(postType + '_attach'));
    }
    sharePreview.innerHTML = '<img src="/images/upload.gif" class="loading"/>';

    sharePreview.appendChild(ce('div', {innerHTML: '<iframe id="wall_share_parse_iframe" name="wall_share_parse_iframe"></iframe>'}, {left: -1000, top: -1000, position: 'absolute'}));

    var shareForm = ce('form', {action: shareServerData.server, method: 'POST', target: 'wall_share_parse_iframe'});
    each ({url: url, mid: shareServerData.mid, hash: shareServerData.hash, rhash: shareServerData.rhash, from_host: location.host, act: 'parse_share', vk: ''}, function (k, v) {
      shareForm.appendChild(ce('input', {type: 'hidden', 'name': k, value: v}));
    });
    sharePreview.appendChild(shareForm);
    show(sharePreview);
    show(sharePreview.nextSibling);

    window.onParseDone = function (data) {
      extend(share_data, data);
      if (!share_data.images || !share_data.images.length) {
        shareShowPreview();
        return;
      }
      var tmpImg = new Image();
      var url = '';
      share_data.imagesStyles = {};
      if (/^\//.test(share_data.images[0])) {
        url = (/^https:\/\//i.test(share_data.url) ? 'https://' : 'http://') + share_data.domain;
      } else if (!/^https?:\/\//i.test(share_data.images[0])) {
        url = share_data.url.replace(/[^\/]*$/, '');
        if (/^https?:\/\/$/i.test(url)) {
          url = share_data.url + '/';
        }
      }
      share_data.images[0] = url + share_data.images[0];
      tmpImg.src = share_data.images[0];
      var imgLoadInterval = setInterval(function (){
        if (tmpImg.width || tmpImg.height) {
          var w = tmpImg.width, h = tmpImg.height;
          if (w < 10 || h < 10) {
            share_data.images = [];
          } else {
            if (w > h && w > 150) {
              h = 150 * h / w;
              w = 150;
            } else if (h > 150) {
              w = 150 * w / h;
              h = 150;
            }
            share_data.imagesStyles[0] = 'style="width: '+w+'px; height: '+h+'px;"';
          }
          clearInterval(imgLoadInterval);
          imgLoadInterval = true;
          shareShowPreview();
          }
      }, 500);
      setTimeout(function () {
        if (imgLoadInterval === true) return;
        share_data.images = [];
        clearInterval(imgLoadInterval);
        shareShowPreview();
      }, 5000);
    }

    window.onParseFail = function () {
      share_data.parse_failed = true;
      shareShowPreview();
    }

    var locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+$/)[0];
    if (!browser.msie6 || document.domain != locDomain) document.domain = locDomain;

    shareForm.submit();
  }

  function shareShowPreview() {
    if (share_data.parse_failed) {
      var html = getLang('page_not_loaded');
    } else {
      var html = (share_data.images && share_data.images[0]  ? '<img src="'+share_data.images[0]+'" class="fl_l tt_thumb" '+share_data.imagesStyles[0]+'/>' : '') + (share_data.title ? '<h4 class="tt_header">' + share_data.title + '</h4>' : '') + (share_data.description ? '<div class="descr">' + share_data.description + '</div>' : '')+'<div class="clear"></div>';
    }
    var tmpDiv = ce('div', {innerHTML: html}, {position: 'absolute', width: getSize(sharePreview)[0], visibility: 'hidden'});
    document.body.appendChild(tmpDiv);
    var tmpDiv1 = ce('div');
    sharePreview.appendChild(tmpDiv1);
    tmpDiv1.appendChild(sharePreview.firstChild);

    animate(tmpDiv1, {height: getSize(tmpDiv)[1]}, 400, function () {
      sharePreview.innerHTML = html;
    });
  }

  function postShareAttach(type, media_id, toId, hash, options, target, preview) {
    if (!share_data.images) return postAttach(type, media_id, toId, hash, options, target, preview);
    window.onUploadDone = function(index, params) {
      share_data.user_id = params.user_id;
      share_data.photo_id = params.photo_id;
      postAttach(type, media_id, toId, hash, options, target, preview);
      window.onUploadDone = function () {}
    }
    window.onUploadFail = function(index, msg) {
      share_data.user_id = 0;
      share_data.photo_id = 0;
      postAttach(type, media_id, toId, hash, options, target, preview);
    }
    sharePreview.appendChild(ce('div', {innerHTML: '<iframe id="wall_share_upload_iframe" name="wall_share_upload_iframe"></iframe>'}, {left: -1000, top: -1000, position: 'absolute'}));
    var postData = {
      act: 'a_photo',
      url: share_data.url,
      image: share_data.images[0],
      extra: share_data.extra || 0,
      hash: vk.ip_h
    };
    /*if (share_data.openGraph) {
      postData['open_graph_data'] = share_data.openGraph.data;
      postData['open_graph_hash'] = share_data.openGraph.hash;
    }*/
    var shareUploadForm = ce('form', {action: 'share.php', method: 'POST', target: 'wall_share_upload_iframe'});
    each(postData, function (k, v) {
      shareUploadForm.appendChild(ce('input', {type: 'hidden', 'name': k, value: v}));
    });
    sharePreview.appendChild(shareUploadForm);
    shareUploadForm.submit();
  }

  removeEvent(target, 'click');
  target.setAttribute('onclick', '');
  addEvent(target, 'click', showMenu);
  addEvent(ge(id + '_header'), 'click', function(e) {
    hideMenu(true);
  });

  return {
    destroy: function() {
      removeEvent(target, 'click');
      var el = ge(id + '_menu');
      el.parentNode.removeChild(el);
    }
  }
}

function checkStatusLength(max_len, val, warn, note, link) {
  if (!window.test_status_note || data(link, 'media')) {
    hide(note);
    return checkTextLength(max_len, val, warn);
  }

  var lastLen = data(warn, 'length');
  if (!data(link, 'force') && (lastLen == val.length) || !max_len) return;
  val = trim(val);
  val = val.replace(/\n\n\n+/g, '\n\n');
  data(link, 'force', 0);
  data(warn, 'length', val.length);

  var n_len = val.length;
  var brCount = n_len - val.replace(/\n/g, '').length;

  if (n_len > max_len - 100 || brCount > 4) {
    show(warn);
  } else {
    hide(warn);
  }
  if (n_len > max_len || brCount > 4) {
    //warn.innerHTML = getLang('text_exceeds_symbol_limit', n_len - max_len);
    hide(warn);
    var title_id = note.id+'_title';
    if (!note.innerHTML) {
      //note.innerHTML = '<span class="status_note_label">'+getLang('profile_status_note_label')+'</span> <input type="text" id="'+title_id+'" class="status_note_title"/>';
      note.innerHTML = '<input type="text" id="'+title_id+'" class="status_note_title" placeholder="'+getLang('profile_status_note_placeholder')+'"/>';
      placeholderSetup(ge(title_id));
      addEvent(title_id, 'focus', showStatusBox);
    }
    //var words = val.split(/\s/);
    //ge(title_id).value = words.length > 5 ? words.slice(0,5).join(' ')+'...' : words.join(' ');
    show(note);
    //hide(link);
    data(warn, 'note', title_id);
  } else {
    hide(note);
    //show(link);
    data(warn, 'note', false);
    if (n_len > max_len - 100) {
      warn.innerHTML = getLang('text_N_symbols_remain', max_len - n_len);
      show(warn);
    } else {
      hide(warn);
      warn.innerHTML = '';
    }
  }
};

// Mentions availibility (contenteditable attribute)
window.mentions_mod = !(browser.mozilla && browser.version.match(/^2\./) || browser.ipod || browser.iphone || browser.ipad || browser.opera && !browser.version.match(/^10\./));

/* Mentions onfocus initialisation */
function initMentions(el) {
  if (!mentions_mod) return;
  var _tmp = function () {
    addCss('css/ui_controls.css');
    var onsubmit = null;
    if (!el.id.indexOf('status')) {
      onsubmit = function () {
        if (ge('group')) {
          postGroupStatus(ge('mid').value, window.wall_phash);
        } else {
          postStatus(ge('mid').value, window.wall_phash);
        }
      };
    } else {
      onsubmit = function () {postWall(ge('mid').value, window.wall_phash);};
    }
    jsDispatcher.include('mentions', function () {
      var mention = new MentionAutocomplete(el, {
        minHeight: 30,
        introText: getLang('mention_start_typing'),
        noResult: getLang('mention_not_found'),
        onSubmit: onsubmit,
        checkLen: !el.id.indexOf('status') ? function(text){checkStatusLength(window.max_status_length, text, ge('status_warn'), ge('status_note'), ge('add_wall_media_link_status'));} : null,
        onValueChange: data(el, 'checkLink')
      });
      addEvent(mention.rtaEl, 'focus', function () { if (!el.id.indexOf('status')) {if (ge('group')) showGroupStatusBox(); else showStatusBox();} else showReplyBox(); });
      triggerEvent(el, 'focus');
    });
    removeEvent(el, 'focus', _tmp);
  }
  addEvent(el, 'focus', _tmp);
}

/* Share preview */
function sharePreview(anchor, params, hash) {
  //anchor = anchor.getElementsByTagName('a')[0];
  params.posTarget = geByClass('a', anchor)[0];
  showTT(anchor, ShareTooltip, 'share.php', extend({act: 'a_status_info', hash: hash}, params));
}

function ShareTooltip(target, options) {
  //target = geByClass('a', target)[0];
  var link_text = options.link_text || options.full_url || '';
  if (link_text.length > 58) link_text = link_text.substr(0, 57) + '...';
  if (options.full_url.match(/http:\/\/([^\/]*)(vkontakte\.ru|vk\.com|vk\.cc)/) || options.full_url.charAt(0) == '/') {
    var away_url = options.full_url || '';
  } else {
    var away_url = 'away.php?to=' + encodeURIComponent(options.full_url || '') + (parseInt(getCookie('remixsettings_bits')) & 1 ? '&h=' + options.full_url_h || '' : '');
  }
  options.footer = '<a href="' + away_url + '" target="_blank">' + link_text + '</a>';
  options.title = '<a href="' + away_url + '" target="_blank">' + (options.title || '') + '</a>';

  return new BaseTooltip(target, extend({
    width: 350,
    height: 100,
    contentTemplate:
  '<div class="tt_content">\
    <img class="tt_thumb" src="{thumb}" />\
    <h4 class="tt_header">{title}</h4>\
    <div class="tt_descr">{description}</div>\
    <div class="tt_footer clear">{footer}</div>\
  </div>',
    params: {
      title: options.title,
      description: options.description,
      thumb: options.thumb,
      footer: options.footer
    },
    className: 'share_tooltip',
    onInit: function() {
      if (this.options.thumb) {
        var pic = new Image();
        pic.src = this.options.thumb;
        var self = this;

        var checkPhotoInterval = setInterval(function() {
          if (pic.height) {
            clearInterval(checkPhotoInterval);
            self.height = getSize(self.container)[1];
            setStyle(self.container, {display: 'none', visibility: 'visible'});
          }
        }, 200);
        return false;
      }
      return true;
    }
  }, options));
}


/* Check-in preview */
function checkinPreview(anchor, params) {
  params.posTarget = geByClass('a', anchor)[0];
  currentPlaceLink = anchor;
  showTT(anchor, checkinTooltip, 'places.php', extend({act: 'a_checkin_info'}, params));
}

function checkinTooltip(target, options) {
  return new BaseTooltip(target, extend({
    width: 350,
    height: 100,
    contentTemplate:
  '<div class="tt_content">\
    <h4 class="tt_header">{title}</h4>\
    <div class="tt_checkin_type">{type}</div>\
    <div class="tt_descr">{description}</div>\
    <div class="tt_footer clear">{footer}</div>\
  </div>',
    params: {
      title: options.title,
      type: options.type,
      description: options.description,
      footer: options.footer
    },
    className: 'checkin_tooltip'
  }, options));
}

/* Like preview */

function LikeWallTooltip(target, options) {
  var m = options.object.match(/^wall(-?\d+_\d+)$/);
  options.status = m[1];
  var link = ge('like_link'+options.status), stats = ge('like_count'+options.status), wrapper = link.parentNode;
  return new BaseTooltip(target, extend({
    width: 206,
    height: 100,
    contentTemplate:
  '<div class="tt_content">\
    <div class="tt_head">{head}</div>\
    <div class="tt_descr">{users}</div>' +
    (options.footer ? '<div class="tt_footer clear">{footer}</div>' : '') +
  '</div>',
    params: {
      head: options.head,
      users: options.users,
      footer: options.footer
    },
    onInit: function () {
      var self = this;
      this.head = geByClass('tt_head', this.container)[0];
      this.publishCb = geByClass('lite_cb', this.container)[0];
      addEvent(this.head, 'click', function () {
        showLikedByBox(options.status, 0, options.boxlang);
        self.hide();
      });
      addEvent(this.publishCb, 'click', function () {
        this.blur();
        if (wrapper.loading) return false;
        checkbox(this);
        if (!hasClass(wrapper, 'like_wrap_on')) {
          animate(self.statsTable, {left: 0}, 200);
          addClass(link.parentNode, 'like_wrap_on');
          if (!isVisible(stats)) setStyle(stats, 'visibility', 'visible');
        }
        wrapper.loading = true;
        Ajax.Send('like.php', {act: 'a_do_'+ (isChecked(this) ? '' : 'un') + 'publish', object: 'wall' + options.status, hash: options.publish_hash}, {
          onSuccess: function (o, t) {
            wrapper.loading = false;
            var res = eval('('+t+')');
            stats.innerHTML = res.likes_count > 0 ? res.likes_count : 1;
            setStyle(stats, 'visibility', res.likes_count > 0 ? 'visible' : 'hidden');
            self.head.innerHTML = res.head;
          }
        });
        return false;
      });
      this.statsTable = geByClass('like_stats', this.container)[0];
    },
    className: 'share_tooltip like_stats_tooltip' + (options.footer ? '' : ' tt_no_footer'),
    onShow: function () {
      if (!isVisible(stats)) return false;
      if (hasClass(wrapper, 'like_wrap_on') && this.statsTable.style.left == '-31px') {
        animate(this.statsTable, {left: 0}, 200);
      }
    },
    onHide: function () {
      if (link.toHide) setStyle(link, 'visibility', 'hidden');
      if (wrapper.toHide) setStyle(wrapper, 'visibility', 'hidden');
    }
  }, options));
}

function likePreview(likeButton, params) {
  var counter = geByClass('like_count', likeButton)[0];
  if (!hasClass(likeButton, 'like_wrap') || !counter /* || !isVisible(counter) */) return;
  showTT(likeButton, LikeWallTooltip, 'like.php', extend({'act': 'a_get_stats'}, params));
}


var likedByBoxes = {};
function showLikedByBox(status_id, tab, titles) {
  var curTab = tab ? 'publishedBy' : 'likedBy', likedByBox = likedByBoxes[status_id];
  if (!likedByBox) {
    likedByBox = new TabbedBox(curTab, titles, {
      title: titles[0][1],
      width: 478,
      tabStyle: 'height:310px',
      onTab: function(tab, loaded) {
        if(!loaded) {
          likedByBox.tabLoadContent(tab, '/like.php', {act: 'a_get_members', object: 'wall' + status_id, offset: 0, published: tab == 'publishedBy' ? 1 : 0}, true, 'height:310px;');
          return false;
        }
      }
    });
    likedByBox.addButton({
      label: getLang('box_close'),
      onClick: function() {likedByBox.hide(200);}
    });
    likedByBoxes[status_id] = likedByBox;
  }
  likedByBox.loadTab(curTab).show();
}
function getLikedByPage(status_id, mode, offset) {
  Ajax.Send('/like.php', {act: 'a_get_members', published: mode ? 1 : 0, object: 'wall' + status_id, offset: offset}, function(o, t) {
    var res = eval('('+t+')');
    likedByBoxes[status_id].tabContent(mode ? 'publishedBy' : 'likedBy', res.html);
  });
  return false;
}
function showStatusLike(status_id) {
  var link = ge('like_link'+status_id), count = ge('like_count'+status_id);
  if (!link) return;
  var wrapper = link.parentNode;
  wrapper.toHide = link.toHide = false;
  setStyle(link, 'visibility', 'visible');
  setStyle(wrapper, 'visibility', 'visible');
}
function hideStatusLike(status_id) {
  var link = ge('like_link'+status_id), count = ge('like_count'+status_id);
  if (!link) return;
  var wrapper = link.parentNode, tooltip = data(wrapper, 'tooltip');
  if (tooltip && isVisible(tooltip.container)) {
    link.toHide = true;
    if (!isVisible(count)) wrapper.toHide = true;
  } else {
    setStyle(link, 'visibility', 'hidden');
    if (!isVisible(count)) setStyle(wrapper, 'visibility', 'hidden');
  }
}

function likePost(status_id, hash, prefix, no_send) {
  if (!prefix) prefix = '';
  var link = ge(prefix+'like_link'+status_id), stats = ge(prefix+'like_count'+status_id), wrapper = link.parentNode, tooltip = data(wrapper, 'tooltip'), act = 'a_do_like';
  if (!hash || wrapper.loading) return;
  wrapper.loading = true;
  if (hasClass(wrapper, 'like_wrap_on')) {
    if (tooltip && stats.innerHTML != "1") animate(tooltip.statsTable, {left: -31}, 200);
    if (tooltip) removeClass(tooltip.publishCb, 'on');
    removeClass(link.parentNode, 'like_wrap_on');
    act = 'a_do_unlike';
    var next_num = intval(stats.innerHTML) - 1;
    if (!next_num) {
      next_num = 1;
      setStyle(stats, 'visibility', 'hidden');
    }
    stats.innerHTML = next_num;
  } else {
    if (tooltip) {
      animate(tooltip.statsTable, {left: 0}, 200);
    }
    addClass(wrapper, 'like_wrap_on');
    if (!isVisible(stats)) setStyle(stats, 'visibility', 'visible');
  }
  if (!no_send) {
  Ajax.Send('like.php', {act: act, object: 'wall' + status_id, hash: hash, wall: 1, hz: 'aaaa', loc: location.toString()}, {
    onSuccess: function(o, t) {
      wrapper.loading = false;
      var res = eval('('+t+')');
      stats.innerHTML = res.likes_count > 0 ? res.likes_count : 1;
      setStyle(stats, 'visibility', res.likes_count > 0 ? 'visible' : 'hidden');
      if (tooltip) {
        if (!intval(res.likes_count)) {
          tooltip.hide();
        } else {
          tooltip.head.innerHTML = res.head;
          if (!isVisible(tooltip.container)) tooltip.show();
        }
      } else {
        data(wrapper, 'over', false);
        wrapper.onmouseover();
      }
    }
  });
  }
}

function getGroupLang(key) {
  return getLang(key);
}
function lenLimit(raw) {
  var el = ge('len_limit' + raw);
  return el ? el.value : 400;
}

function showDeleteBox(el) {
  el = ge(el);
  if (el.active) return;
  animate(el, {backgroundColor:'#C4D2E1'}, 200);
}

function hideDeleteBox(el) {
  el = ge(el);
  if (el.active) return;
  animate(el, {backgroundColor:'#FFFFFF'}, 200);
}

function activeDeleteBox(el) {
  el = ge(el);
  el.active = 1;
  animate(el, {backgroundColor:'#6B8DB1'}, 200);
}

function inactiveDeleteBox(el) {
  el = ge(el);
  el.active = 0;
  showDeleteBox(el);
}

function showReplies(to_id, msg_id, count, hl, offset) {
  var params = {act: 'a_get_replies', count: count, msg_id: msg_id, to_id: to_id};
  var prevOnly = 0;
  if (offset !== undefined) {
    params.prev_only = prevOnly = 1;
    params.offset = offset;
  }
  var r = ge('replies' + to_id + '_' + msg_id), h = geByClass('replies_header_wrap', r)[0];
  if (geByClass('fl_r', h)[0]) geByClass('fl_r', h)[0].innerHTML = '<img src="/images/upload.gif"/>';
  Ajax.Send('wall.php', params, function(o, t) {
    var r = ge('replies' + to_id + '_' + msg_id);
    if (hl) {
      var n1 = document.getElementsByTagName('html')[0], n2 = document.getElementsByTagName('body')[0];
      var h = r.offsetHeight;
      r.innerHTML = t;
      var dh = r.offsetHeight - h;
      n1.scrollTop = intval(n1.scrollTop) + dh;
      n2.scrollTop = intval(n2.scrollTop) + dh;
      highlightReply(hl);
    } else {
      if (prevOnly) {
        var res = eval('('+t+')');
        geByClass('replies_header_wrap', r)[0].innerHTML = res.header;
        var c = ce('div', {innerHTML:res.replies});
        var b = geByClass('replies_body_wrap', r)[0];
        //b.innerHTML = res.replies + b.innerHTML;
        b.insertBefore(c, b.firstChild);
      } else {
        r.innerHTML = t;
      }
    }
  });
}
