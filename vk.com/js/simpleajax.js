var wall_post_types = [];
var wall_icons = 'images/icons/wall_icons.gif';

function getPostMsg() {
  var el = ge('reply_field');
  return el && isFunction(el.getValue) ? el.getValue() : el && el.value || '';
}

function add_graffiti_post_type(to_id, label) {
  wall_post_types.push({
    type:'graffiti',
    url: base_domain + 'graffiti.php?act=draw&' + (to_id < 0 ? ('group_id=' + (-to_id)) : ('to_id=' + to_id)),
    icon: wall_icons,
    bgpos: [0, 0],
    label: label,
    onClick: function(type) { return drawGraffiti(to_id, type); }
  });
}

function add_video_post_type(to_id, label) {
  var url = base_domain + 'video.php?to_id=' + to_id;
  wall_post_types.push({
    type:'video',
    url: url,
    icon: wall_icons,
    bgpos: [0, -22],
    label: label,
    onClick: function(type) { return chooseVideo(to_id, url, type); }
  });
}
function add_photo_post_type(to_id, label) {
  var url = base_domain + 'photos.php?to_id=' + to_id;
  wall_post_types.push({
    type:'photo',
    url: url,
    icon: wall_icons,
    bgpos: [0, -44],
    label: label,
    onClick: function(type) { return choosePhoto(to_id, url, type); }
  });
}
function add_audio_post_type(to_id, label) {
  var url = base_domain + 'audio.php?to_id=' + to_id;
  wall_post_types.push({
    type:'audio',
    url: url,
    icon: wall_icons,
    bgpos: [0, -66],
    label: label,
    onClick: function(type) { return chooseAudio(to_id, url, type); }
  });
}
function add_app_post_type(to_id, app_id, name, icon) {
  var url = base_domain + 'app' + app_id + '?to_id=' + to_id;
  wall_post_types.push({
    type:'app',
    url: url,
    icon: icon,
    bgpos: [3, 3],
    label: name,
    onClick: function(type) { return chooseApp(app_id, to_id, url, type); }
  });
}

var add_wall_hide_timeout = false;
function show_add_wall_media(type) {
  clearTimeout(add_wall_hide_timeout);
  if (ge('reply_to')) {
    if (type == 'status') {
      ge('reply_to').value = -1;
      if (ge('group_status') && !ge('group_status').value) ge('reply_to').value = 0;
    }
  }
  type = type ? '_' + type : '';
  onDomReady(function() {
    var elem = ge('add_wall_menu' + type);
    if (elem && !isVisible(elem)) {
      var lnk = ge('add_wall_media_link' + type);
      lnk.blur();
      var coords = getXY(lnk);
      elem.style.left = (coords[0] - 8 + (browser.msie6 ? 1 : 0)) + 'px';
      elem.style.top = (coords[1] - 4 + (browser.msie && !browser.msie8 ? 1 : 0)) + 'px';
      if (/mac/.test(_ua) && browser.mozilla) {
        ge('add_wall_rows'+type).style.top = '22px';
      }
      browser.msie ? show(elem) : fadeIn(elem, 100);
    }
  });
}
function hide_add_wall_media(noTimeout, type) {
  type = type ? '_' + type : '';
  var hideFunc = function() {
    browser.msie ? hide('add_wall_menu'+type) : fadeOut(ge('add_wall_menu'+type), 100);
  }
  if (noTimeout == true) hideFunc();
  else add_wall_hide_timeout = setTimeout(hideFunc, 300);
}

onDomReady(function() {
  if (wall_post_types.length) {
    var wall_icons = base_domain + 'images/icons/wall_icons.gif';

    var plwi = new Image();
    plwi.src = wall_icons;
    var status_menu = ge('add_wall_menu_status') ? 1 : 0;
    var wall_menu = ge('add_wall_menu') ? 1 : 0;
    if (wall_menu) {
      addEvent(ge('add_wall_menu'), 'mouseover', function() { show_add_wall_media(); });
      addEvent(ge('add_wall_menu'), 'mouseout', function() { hide_add_wall_media(); });
    }
    if (status_menu) {
      addEvent(ge('add_wall_menu_status'), 'mouseover', function() { show_add_wall_media('status'); });
      addEvent(ge('add_wall_menu_status'), 'mouseout', function() { hide_add_wall_media(false, 'status'); });
    }

    var rows = '', status_rows = '', spec_style = (/mac/.test(_ua) && browser.mozilla) ? 'height: 19px; padding-top: 3px;' : '';
    for (var i in wall_post_types) {
      var row = wall_post_types[i];
      if (row.icon.substr(0, 7) != 'http://' && row.icon.substr(0, 1) != '/') {
        row.icon = base_domain + row.icon;
      }
      rows += '<a onfocus="this.blur()" id="wall_post_type' + i + '" style="background-image: url(' + row.icon + '); background-position: ' + row.bgpos[0] + 'px ' + row.bgpos[1] + 'px;' + spec_style + '" href="' + row.url + '">' + row.label.replace(/\s/g, '&nbsp;') + '</a>';
      if (status_menu && row.type != 'app' /*&& row.type != 'graffiti'*/) {
        status_rows += '<a onfocus="this.blur()" id="wall_post_type_status' + i + '" style="background-image: url(' + row.icon + '); background-position: ' + row.bgpos[0] + 'px ' + row.bgpos[1] + 'px;' + spec_style + '" href="' + row.url + '">' + row.label.replace(/\s/g, '&nbsp;') + '</a>';
      }
    }
    if (wall_menu) {
      ge('add_wall_rows').innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td class="add_wall_side"><div>&nbsp;</div></td><td><div class="rows">' + rows + '</div><div class="add_wall_bottom"></div><div class="add_wall_bottom2"></div></td><td class="add_wall_side"><div>&nbsp;</div></td></tr></table>';
    }
    if (status_menu) {
      ge('add_wall_rows_status').innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td class="add_wall_side"><div>&nbsp;</div></td><td><div class="rows">' + status_rows + '</div><div class="add_wall_bottom"></div><div class="add_wall_bottom2"></div></td><td class="add_wall_side"><div>&nbsp;</div></td></tr></table>';
    }
    for (var i in wall_post_types) {
      addEvent(ge('wall_post_type' + i), 'click', (function(onClick) {
        return function() {
          hide_add_wall_media(true);
          return onClick();
        }
      })(wall_post_types[i].onClick));
      if (status_menu) addEvent(ge('wall_post_type_status' + i), 'click', (function(onClick) {
        return function() {
          hide_add_wall_media(true, 'status');
          return onClick('status');
        }
      })(wall_post_types[i].onClick));
    }
    addEvent(ge('add_wall_header'), 'click', function() { hide_add_wall_media(true); });
    if (status_menu) addEvent(ge('add_wall_header_status'), 'click', function() { hide_add_wall_media(true, 'status'); });

  }
});

var six_members_page = 0;
function getSixMembers(url, params) {
  if (isVisible(ge('progr'))) {
    return;
  }
  show('progr');
  params.page = (++six_members_page);
  Ajax.Post({url: url, query: params, onDone: function(obj, text) {
    hide('progr');
    ge('fBox').innerHTML = parseResponse(text);
  }, onFail: function() {
    hide('progr');
  }});
}

function getWallPage(oid, page, hash) {
  if (isVisible(ge('progr2'))) {
    return;
  }
  show('progr2');
  var type = ge('wall_type') ? ge('wall_type').value : 0;
  Ajax.Send('wall.php', {act: 'a_get_wall', to_id: oid, offset: page*10, type:type, hash:hash}, {onSuccess: function(o, text) {
    var r = eval('('+text+')');
    hide('progr2');
    ge('fBox2').innerHTML = r.html;
    if (ge('wall_shown') && r.wall_shown) {
      ge('wall_shown').innerHTML = r.wall_shown;
    }
    if (window.setupReply) setupReply();
  }, onFail: function() {
    hide('progr2');
  }});
}

function parseResponse(response) {
  response = response.replace(/^[\s\n]+/g, '');

  if (response.substr(0,10)=="<noscript>") {
    try {
      var arr = response.substr(10).split("</noscript>");
      eval(arr[0]);
      return arr[1];
    } catch(e) {
      return response;
    }
  } else {
    return response;
  }
}

var restoreCache = {};

function restorePost(cid, oid, hash, reply) {
  var ajax = new Ajax();
  var full_id = oid + '_' + cid;
  ajax.onDone = function(obj, text) {
    var r = eval('(' + text + ')');
    if (!r.res) {
      var el = reply ? ge('wall_reply' + full_id) : ge('wPostContainer' + full_id);
      if (!reply && !el) el = ge('status' + cid);
      el.innerHTML = restoreCache[full_id];
    } else {
      replacePostContent(cid, oid, r.text, reply);
    }
  }
  ajax.onFail = function(o, t) {
    replacePostContent(cid, oid, '<div class="msg_wall" id="wResult' + full_id + '">Server error.</div>', reply);
  };
  ajax.post('/wall.php', {act: 'a_restore', oid: oid, cid: cid, reply: reply});
}

function deletePost(cid, oid, hash, reply, app) {
  var ajax = new Ajax();
  ajax.onDone = function(o,t) {
    replacePostContent(cid, oid, t, reply);
  };
  ajax.onFail = function(o,t) {
    replacePostContent(cid, oid, '<div class="msg_wall" id="wResult' + oid + '_' + cid + '">Server error.</div>', reply);
  };
  var params = {act: 'a_delete', oid: oid, cid: cid, hash: hash, reply: reply};
  if (app) {
    params['app'] = app;
  }
  ajax.post('/wall.php', params);
}

function reportSpamPost(cid, oid, hash, del, reply) {
  var ajax = new Ajax();
  ajax.onDone = function(o,t) {
    replacePostContent(cid, oid, t, reply);
  };
  ajax.onFail = function(o,t) {
    replacePostContent(cid, oid, '<div class="msg_wall" id="wResult' + oid + '_' + cid + '">Server error.</div>', reply);
  };
  ajax.post('/wall.php', {act: 'a_report_spam', oid: oid, cid: cid, hash: hash, del: del, reply: reply});
}

function replacePostContent(cid, oid, text, reply) {
  var full_id = oid + '_' + cid;
  var el = reply ? ge('wall_reply' + full_id) : ge('wPostContainer' + full_id);
  if (!reply && !el) el = ge('status' + cid);

  if (!restoreCache[full_id]) restoreCache[full_id] = el.innerHTML;
  el.innerHTML = text;
  
  return;
/*
  ge('wPostContent' + full_id).style.display = 'none';
  ge('wPostContainer' + full_id).innerHTML += text;
  var adding = '';
  if (ge('dArrow' + full_id)) {
    adding += '<div style="position: relative; top: -6px;" class="dArrow">' + ge('dArrow' +full_id).innerHTML + '</div>';
  }
  if (ge('upArrow' + full_id)) {
    adding += '<div style="position: relative; top: -6px;" class="upArrow">' + ge('upArrow' + full_id).innerHTML + '</div>';
  }
  if (adding.length && ge('wResult' + full_id)) {
    ge('wResult' + full_id).innerHTML = adding + ge('wResult' + full_id).innerHTML;
  }
  */
}

function banUser(act, mid, gid, hash, msgid){
  var a = new Ajax(function(res, text) {
    ge(msgid).innerHTML = text;
  }, function(res, text) {
    var prev = ge(msgid).innerHTML;
    ge(msgid).innerHTML = text;
    setTimeout(function() {
      ge(msgid).innerHTML = prev;
    }, 5000);
  });
  a.post('/ban.php', {act:act, mid:mid, gid:gid, hash:hash});
}

var deleting_all_id = 0;

function toggleDeleteAll(message_id) {
  toggle('wConfirm' + message_id);
  if (isVisible('wConfirm' + message_id)) {
    hide('wConfirm' + deleting_all_id);
    removeEvent(document, 'keydown');
    addEvent(document, 'keydown', function(e) { if (e.keyCode == 27) { toggleDeleteAll(message_id); }});
    deleting_all_id = message_id;
  } else {
    removeEvent(document, 'keydown');
    deleting_all_id = 0;
  }
}

var graffitiBox = null;
function showGraffiti(grid, owner, elem) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  if (!graffitiBox) {
    graffitiBox = new MessageBox({width: 606, bodyStyle: 'padding: 10px', closeButton: true, fullPageLink: elem.href});
  }
  graffitiBox.removeButtons();
  graffitiBox.addButton({label: global_close, onClick: function() {
    graffitiBox.hide();
  }});
  graffitiBox.addControlsText(ge('graffiti_author' + grid).innerHTML);
  graffitiBox.setOptions({title: ge('graffiti_title' + owner).value, fullPageLink: elem.href});

  graffitiBox.content('<div style="width: 586px; overflow: hidden; height: 293px; background: #fff url(' + base_domain + 'images/progress7.gif) no-repeat 50% 50%" onclick="graffitiBox.hide()"><img src="' + ge('graffiti_src' + grid).value + '" /></div>').show();
  return false;
}

var wallPhotoBox = null;
var wallImages = {};
function showWallPhoto(phid, owner, elem) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  if (!wallImages[phid]) {
    wallImages[phid] = new Image();
    wallImages[phid].src = ge('wallphoto_src' + phid).value;
  }
  setTimeout(function() {
    var width = wallImages[phid].width;
    if (!wallPhotoBox) {
      wallPhotoBox = new MessageBox({bodyStyle: 'padding: 10px', closeButton: true, fullPageLink: elem.href});
    }
    wallPhotoBox.removeButtons();
    wallPhotoBox.addButton({label: global_close, onClick: function() {
      wallPhotoBox.hide();
    }});
    wallPhotoBox.addControlsText(ge('wallphoto_author' + phid).innerHTML);
    wallPhotoBox.setOptions({width: (intval(width) > 410) ? (width + 20) : 430, title: ge('wallphoto_title' + owner).value, fullPageLink: elem.href});
    if (wallImages[phid].height) {
      wallPhotoBox.content('<div style="height: ' + wallImages[phid].height + 'px; text-align: center;" onclick="wallPhotoBox.hide()"><img style="background: #fff url(' + base_domain + 'images/progress7.gif) no-repeat 50% 50%" src="' + ge('wallphoto_src' + phid).value + '" /></div>').show();
    } else {
      wallPhotoBox.content('<div class="box_loader"></div>').show();
      var updateBox = function() {
        if (wallImages[phid].height) {
          var width = (wallImages[phid].width > 410) ? (wallImages[phid].width + 20) : 430;
          wallPhotoBox.setOptions({width: width});
          wallPhotoBox.content('<div style="height: ' + wallImages[phid].height + 'px; text-align: center;" onclick="wallPhotoBox.hide()"><img style="background: #fff url(' + base_domain + 'images/progress7.gif) no-repeat 50% 50%" src="' + ge('wallphoto_src' + phid).value + '" /></div>');
        } else {
          setTimeout(updateBox, 50);
        }
      }
      setTimeout(updateBox, 50);
    }
  }, 0);
  return false;
}

var drawBox = null, drawWarningBox = null, drawNeedConfirm = false;
window.posting_on_wall = false;
function doCancelDrawing() {
  if (!drawBox) return;
  drawBox.setOptions({onHideAttempt: false});
  drawBox.hide();
}
function drawGraffiti(to_id) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  //if (window.hideReplyBox) hideReplyBox();
  if (!drawBox) {
    drawBox = new MessageBox({title: ge('draw_graffiti_title').value, width: 610, bodyStyle: 'padding: 0px', type: 'POPUP', hideOnClick: false, progress: 'graffiti_draw_progress', onLoad: function() {
      if (ge('graffitiDraw')) {
        drawBox.setOptions({onHideAttempt: function() {
          var result = ge('graffitiDraw').cancelDrawing();
          if (result) {
            ge('graffitiDrawing').innerHTML = '';
          }
          return result;
        }});
        ge('graffitiDrawing').style.height = '483px';
      } else {
        drawBox.setOptions({width: 400, bodyStyle: 'padding: 16px 14px', type: 'MESSAGE'});
        drawBox.addButton({label: global_close, onClick: function() { doCancelDrawing(); return false; }});
      }
    }});
  } else {
    drawBox.setOptions({width: 610, bodyStyle: 'padding: 0px', type: 'POPUP'});
  }
  drawBox.removeButtons();
  drawBox.loadContent('graffiti.php', {act: 'a_draw_box', to_id: to_id}, true).show();
  return false;
}

function clearReplyField(reply_to) {
  var el = (reply_to == -1) ? ge('status_field') : ge('reply_field');
  if (reply_to == -1 && window.mentions_mod) {
    var mention = data(el, 'mention');
    if (mention) {
      hide(mention.cont);
      show(el);
    }
    hide('status_warn');
    hide('submit_status');
  }
  if (!el) return;
  el.value = '';
  el.phevents = 0;
  placeholderSetup(el);
}

var fbox2_cache = '';

function postMedia(media, media_id, to_id, hash, options) {
  posting_on_wall = true;
  
  var reply_to = ge('reply_to') ? ge('reply_to').value : 0;
  var el = reply_to == -1 ? ge('status_field') : ge('reply_field');
  var msg = el && isFunction(el.getValue) ? el.getValue() : el && el.value || '';
  var type = ge('wall_type') ? ge('wall_type').value : 0;


  var params = {act: 'a_post_wall', hash: hash, media: media, media_id: media_id, to_id: to_id, message: msg, type: type, reply_to: reply_to};
  
  var export_el = ge('export_to_twitter');
  if (export_el && export_el.value) {
    params.status_export = export_el.value;
  }

  var opt = {
    onSuccess: function(o,t) {
      try{
      posting_on_wall = false;
      var r = eval('('+t+')');
      if (to_id < 0 && type) {
        wallHistory[0] = r.microblog;
        wallHistory[1] = r.wall;
        if (type == 2) {
          ge('status_top_box_wrap').innerHTML = wallHistory[0];
        } else {
          ge('status_top_box_wrap').innerHTML = wallHistory[1];
        }
      } else {
        if (ge('fBox2')) {
          ge('fBox2').innerHTML = r.html;
        } else {
          fbox2_cache = r.html;
        }
        clearReplyField(reply_to);
        hide('msg', 'msg_graffiti', 'msg_photo', 'msg_video', 'msg_audio');
        show(media ? 'msg_'+media : 'msg');
        if (ge('status_box')) {
          ge('status_box').innerHTML = r.status || '';
        }
      }
      if (isFunction(options.onSuccess)) return options.onSuccess(o,t,r);
      }catch(e){debugLog(e.message)}
    },
    onFail: function(o,t) {
      posting_on_wall = false;
      if (isFunction(options.onFail)) return options.onFail(o,t);
    },
    onCaptchaShow: function() {
      posting_on_wall = false;
      if (isFunction(options.onCaptchaShow)) options.onCaptchaShow();
    },
    onCaptchaHide: function(done) {
      posting_on_wall = false;
      if (done) return;
      if (isFunction(options.onCaptchaHide)) options.onCaptchaHide(done);
    }
  };
  Ajax.Send('wall.php', params, opt);
}

function graffitiUploaded() {
  if (posting_on_wall) {
    return;
  }
  drawNeedConfirm = true;

    debugLog(1);
  
  var box = drawBox;
  
    debugLog(box);


  var options = {onSuccess: function(o, t, r) {
    drawNeedConfirm = false;
    hide('graffiti_draw_progress');
    show('msg_graffiti');
    doCancelDrawing();
  }, onFail: function() {
    hide('graffiti_draw_progress');
  }, onCaptchaShow: function() {
    box.setOptions({onHide: null});
    doCancelDrawing();
  }, onCaptchaHide: function(done) {
    hide('graffiti_draw_progress');
    box.setOptions({width: 606, bodyStyle: 'padding: 10px', type: 'MESSAGE', onHide: function() {
      if (!drawWarningBox) {
        drawWarningBox = new MessageBox({title: global_warning});
        drawWarningBox.content(window.lang_graffiti_cancel_confirm);
        drawWarningBox.addButton({label: global_cancel, style: 'button_no', onClick: function() { drawWarningBox.hide(); return false; }});
        drawWarningBox.addButton({label: global_continue, onClick: function() { drawNeedConfirm = false; drawWarningBox.setOptions({onHide: null}); drawWarningBox.hide(); }});
      }
      drawWarningBox.setOptions({onHide: function() { box.show(); }});
      drawWarningBox.show();
    }});
    box.removeButtons().addButton({label: global_cancel, style: 'button_no', onClick: function() { box.hide(); return false; }}).addButton({label: window.lang_graffiti_send, onClick: function() {
      show('graffiti_draw_progress');
      box.setOptions({onHide: null});
      graffitiUploaded();
    }});
    box.content('<div id="uploadedGraffiti" style="width: 586px; height: 293px; background: #fff url(' + base_domain + 'images/progress7.gif) no-repeat 50% 50%; overflow: hidden"></div>').show();
    Ajax.Post({url: 'graffiti.php', query: {act: 'a_get_last'}, onDone: function(obj, text) {
      if (text && ge('uploadedGraffiti')) {
        ge('uploadedGraffiti').innerHTML = '<img style="width: 586px; height: 293px" src="' + text + '" />';
      } else if (box) {
        box.content(global_unknown_error).removeButtons().addButton({label: global_cancel, style: 'button_no', onClick: function() { box.hide(); return false; }});
      }
    }});
  }};
  postMedia('graffiti', null, graffiti_data.to_id, graffiti_data.hash, options);
}
var flashNeedConfirm = false;
function confirmWhenExit() {
  flashNeedConfirm = true;
}
window.onbeforeunload = function() {
  flashNeedConfirm = false;
  if (ge('graffitiDraw') && drawBox.isVisible()) ge('graffitiDraw').confirmWhenExit();
  if (drawNeedConfirm || flashNeedConfirm) {
    return window.lang_graffiti_are_you_sure;
  }
}

var showAppBox = null;
function showApp(app_id, to_id, from_id, loc, href, photo) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  if (!showAppBox) {
    attachScript('appsFlash', base_domain+'js/apps_flash.js?35');
    showAppBox = new MessageBox({title: ge('show_app_title').value, width: 609, closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;', onHideAttempt: function() {
      showAppBox.content('');
      return true;
    }});
  }
  showAppBox.setOptions({fullPageLink: href});
  showAppBox.removeButtons().addButton({label: global_close, onClick: showAppBox.hide}).addControlsText('<a href="'+href+'">'+ge('go_to_app_label').value+'</a>');
  showAppBox.loadContent('apps.php', {act: 'a_show_app_box', to_id: to_id, from_id: from_id, loc: loc, aid: app_id, photo:photo}, true, 'height: 412px').show();
  return false;
}

var chooseAppBox = null;
function chooseApp(app_id, to_id, href) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  //if (window.hideReplyBox) hideReplyBox();
  href = href.href ? href.href : href;
  if (!chooseAppBox) {
    attachScript('appsFlash', base_domain+'js/apps_flash.js?35');
    chooseAppBox = new MessageBox({title: ge('choose_app_title').value, width: 609, progress: 'choose_app_progress', closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;', onHideAttempt: function() {
      chooseAppBox.content('');
      return true;
    }});
    chooseAppBox.addButton({label: global_close, onClick: function(){chooseAppBox.hide(); return false;}});
  }
  hide('choose_app_progress');
  chooseAppBox.loadContent('apps.php', {act: 'a_choose_app_box', to_id: to_id, aid: app_id}, true, 'height: 412px').show();
  return false;
}
function doSendAppPost(dataHash) {
  if (posting_on_wall || !chooseAppBox || !chooseAppBox.isVisible()) {
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
    chooseAppBox.hide();
  }, onCaptchaHide: function(done) {
    chooseAppBox.show();
    chooseAppBox.fixIE6();
    hide('choose_app_progress');
  }};
  postMedia('app', dataHash, app_data.to_id, window.app_wall_hash, options);
}

var chooseAudioBox = null;
function chooseAudio(to_id, href) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  addCss('css/profile.css');
  href = href.href ? href.href : href;
  if (!chooseAudioBox) {
    chooseAudioBox = new MessageBox({title: ge('choose_audio_title').value, width: 610, progress: 'choose_audio_progress', closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;', onHide: function() {
      //if (AudioObject.curAudio) {
        AudioObject.hidePlayer();
        AudioObject.curAudio = null;
      //}
    }});
    chooseAudioBox.addButton({label: global_close, onClick: function(){chooseAudioBox.hide(); return false;}});
  }
  ge('choose_audio_progress').style.display = 'none';
  chooseAudioBox.loadContent('audio.php', {act: 'a_choose_audio_box', to_id: to_id}, true, 'height: 412px').show();
  return false;
}
function doSendAudio(id, owner, to_id, hash) {
  //if (AudioObject) AudioObject.hidePlayer();
  if (posting_on_wall) {
    return false;
  }
  audio_owner = owner ? owner : 0;
  show('choose_audio_progress');
  var options = {onSuccess: function(o, t, r) {
    posting_on_wall = false;
    hide('choose_audio_progress');
    show('msg_audio');
    chooseAudioBox.hide();
  }, onCaptchaHide: function(done) {
    chooseAudioBox.show();
    chooseAudioBox.fixIE6();
    hide('choose_audio_progress');
  }};
  postMedia('audio', audio_owner + '_' + id, to_id, hash, options);
  return false;
}

var chooseVideoBox = null;
function chooseVideo(to_id, href) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  addCss('css/profile.css');
  href = href.href ? href.href : href;
  if (!chooseVideoBox) {
    chooseVideoBox = new MessageBox({title: ge('choose_video_title').value, width: 610, progress: 'choose_video_progress', closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;'});
    chooseVideoBox.addButton({label: global_close, onClick: function(){chooseVideoBox.hide(); return false;}});
  }

  ge('choose_video_progress').style.display = 'none';
  chooseVideoBox.loadContent('video.php', {act: 'a_choose_video_box', to_id: to_id, scrollbar_width: window.sbWidth()}, true, 'height: 412px').show();
  return false;
}

function doSendVideo(id, owner, to_id, hash) {
  if (posting_on_wall) {
    return false;
  }
  show('choose_video_progress');
  var options = {onSuccess: function(o, t, r) {
    hide('choose_video_progress');
    show('msg_video');
    chooseVideoBox.hide();
  }, onCaptchaHide: function(done) {
    chooseVideoBox.show();
    chooseVideoBox.fixIE6();
    hide('choose_video_progress');
  }};
  postMedia('video', owner + '_' + id, to_id, hash, options);
  return false;
}

var choosePhotoBox = null, newUploadedBox = null;
function choosePhoto(to_id, href, type) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  addCss('css/profile.css');
  href = href.href ? href.href : href;
  if (type == 'status') href += '&status_add=1';
  if (!choosePhotoBox) {
    choosePhotoBox = new MessageBox({title: ge('choose_photo_title').value, width: 610, progress: 'choose_photo_progress', closeButton: true, fullPageLink: href, bodyStyle: 'height: 412px; padding: 0px;'});
    choosePhotoBox.addButton({label: global_close, onClick: function(){choosePhotoBox.hide(); return false;}});
  }

  ge('choose_photo_progress').style.display = 'none';
  choosePhotoBox.loadContent('photos.php', {act: 'a_choose_photo_box', to_id: to_id, scrollbar_width: window.sbWidth() /*, status_add:type=='status'?1:0*/}, true, 'height: 412px').show();
  return false;
}

function doSendPhoto(id, to_id, hash) {
  if (posting_on_wall) {
    return false;
  }
  show('choose_photo_progress');
  var options = {onSuccess: function(o, t, r) {
    hide('choose_photo_progress');
    show('msg_photo');
    choosePhotoBox.hide();
  }, onCaptchaHide: function(done) {
    choosePhotoBox.show();
    choosePhotoBox.fixIE6();
    hide('choose_photo_progress');
  }};
  postMedia('photo', id, to_id, hash, options);
  return false;
}

function doSendNewUploaded(server, photo, to_id, hash) {
  if (posting_on_wall) {
    return false;
  }
  show('new_uploaded_progress');
  var options = {onSuccess: function(o, t, r) {
    hide('new_uploaded_progress');
    show('msg_photo');
    newUploadedBox.setOptions({returnHidden: false});
    newUploadedBox.hide();
    choosePhotoBox.hide();
  }, onCaptchaHide: function(done) {
    newUploadedBox.show();
    newUploadedBox.setOptions({returnHidden: true});
    hide('new_uploaded_progress');
  }};
  postMedia('posted_photo', server?server+'_'+photo:photo, to_id, hash, options);
  return false;
}

var hasCheckTextLength = false;
try {
  if (isFunction(checkTextLength)) hasCheckTextLength = true;
} catch (e) {}
if (!hasCheckTextLength) {
  var lastTextLength = 0;
  function checkTextLength(max_len, val, warn) {
    if (lastTextLength == val.length) {
      return;
    }
    lastTextLength = val.length;
    var l = 0;
    val = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(new RegExp('>', 'g'), '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>').replace(/\r/g, '').replace(/!/g, '&#33;').replace(/'/g, '&#39;');
    for (var i = 0; i < val.length; ++i) {
      var c = val.charCodeAt(i);
      if ((c > 0x80 && c < 0xC0) || c > 0x500) {
        l += (c + '').length + 3;
      } else {
        ++l;
      }
    }
    if (l > max_len) {
      var plus = l - max_len;
      show(warn);
      warn.innerHTML = langNumeric(plus, text_exceeds_symbol_limit);
    } else if (l > max_len - 100) {
      var rem = max_len - l;
      show(warn);
      warn.innerHTML = langNumeric(rem, text_N_symbols_remain);
    } else {
      hide(warn);
      warn.innerHTML = '';
    }
  }
}


function showPlaceBox(el, id, tab) {
  var files = ['css/places.css', 'css/privacy.css', 'css/map.css', 'js/map2.js?4'],
  tooltip = data(currentPlaceLink, 'tooltip'),
  options = {title: el.innerHTML, bodyStyle: 'padding:0px', width: 480, progress: 'place_progress', onHide: function() {
    placeMap.destroy();
    currentPlaceLink = null;
  }};
  if (!window.Dropdown) {
    files = files.concat(['css/ui_controls.css', 'js/lib/ui_controls.js']);
  }
  currentPlaceTab = tab || 0;
  if (tooltip) {
    tooltip.hide()
  }
  return showBox('placeBox', 'places.php', {act: 'a_get_place_box', id: id}, true, true, options, files);
}
