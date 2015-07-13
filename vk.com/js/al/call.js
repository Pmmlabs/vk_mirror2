if (!window._iconAdd) window._iconAdd = (window.devicePixelRatio >= 2 ? '_2x' : '');
function videochatCallback(args) {
  var method = args.shift();
  if (Call && Call.callbacks) {
    if (!Call.callbacks[method] && !Call.defaultCallbacks[method]) {
      setTimeout(function() {
        //throw new Error('unsupported app method: ' + method);
        //debugLog('trying to call ' + method + ' without any listener');
      }, 0);
    }
    setTimeout(function() {
      if (Call.callbacks[method]) {
        return Call.callbacks[method].apply(Call, args);
      } else
      if (Call.defaultCallbacks[method]) {
        return Call.defaultCallbacks[method].apply(Call, args);
      }
    }, 0);
    return true;
  }
  return true;
}

var Call = {

invitation: null,
videochat: null,
params: {},
initiated: false,
width: 480,
log: '',

playRing: function() {
  if (window.ls && ls.get("videocall_sound") && (ls.get("videocall_sound") + 6000 > (new Date()).getTime())) {
    return;
  }
  if (window.ls) {
    ls.set("videocall_sound", (new Date()).getTime());
  }

  if (!Call.sound) {
    if (!window.Sound) {
      Call.sound = {play: function () {}, pause: function() {}};
    } else {
      Call.sound = new Sound('mp3/call');
    }
  }
  Call.sound.play();
  Call.ringTimer = setInterval(function() {
    if (Call.sound) {
      Call.sound.play();
      if (window.ls) {
        ls.set("videocall_sound", (new Date()).getTime());
      }
    }
  }, 5000);
},

stopRing: function() {
  if (window.ls) {
    ls.remove("videocall_sound");
  }
  clearInterval(Call.ringTimer);
  if (Call.sound) {
    Call.sound.pause();
    Call.sound = false;
  }
},

baseVideoBox: function(wrap, options, params) {
  if (browser.flash < 10 || (browser.flash == 10 && browser.flashfull.minor < 1)) {
    ge(wrap).innerHTML = '<div class="flash_needed"><div>' + getLang('calls_install_flash_text').replace('{link}', '<a href="http://get.adobe.com/flashplayer/">').replace('{/link}', '</a>') + '</div>' +
      '<div class="button_blue">' +
        '<button id="videocalls_need_flash">' + getLang('calls_install_flash_player') + '</button>' +
      '</div>' +
    '</div>';
    ge('videocalls_need_flash').onclick = function() { location.href = 'http://get.adobe.com/flashplayer/'; };
    return false;
  }
  renderFlash(ge(wrap), extend({
    url: '/swf/vkvideochat.swf',
    id: wrap+'_pl',
    width: 480,
    height: 360,
    preventhide: 1,
    bgcolor: '#000000',
    version: 10
  }, options || {}), {
    allowFullScreen: true,
    allowscriptaccess: 'always',
    allownetworking: 'all',
    //wmode: /linux/i.test(_ua) ? 'window' : 'opaque'
    wmode: 'opaque'
  }, extend(params || {}, {
    lang_calls_allow_access: getLang('calls_allow_access'),
    lang_calls_no_popup: getLang('calls_no_popup'),
    lang_calls_no_video: getLang('calls_no_video'),
    lang_calls_outgoing_waiting: getLang('calls_outgoing_waiting'),
    lang_calls_tooltip_microphone_on: getLang('calls_tooltip_microphone_on'),
    lang_calls_tooltip_microphone_off: getLang('calls_tooltip_microphone_off'),
    lang_calls_tooltip_camera_on: getLang('calls_tooltip_camera_on'),
    lang_calls_tooltip_camera_off: getLang('calls_tooltip_camera_off'),
    lang_calls_tooltip_volume_on: getLang('calls_tooltip_volume_on'),
    lang_calls_tooltip_volume_off: getLang('calls_tooltip_volume_off'),
    lang_calls_tooltip_fullscreen_on: getLang('calls_tooltip_fullscreen_on'),
    lang_calls_tooltip_fullscreen_off: getLang('calls_tooltip_fullscreen_off'),
    lang_calls_no_devices: getLang('calls_no_devices'),
    lang_calls_microphone_inactive: getLang('calls_microphone_inactive'),
    lang_calls_camera_inactive: getLang('calls_camera_inactive')
  }));
  return ge(wrap+'_pl');
},

incomingBox: function(text, photo, call_id, far_uid, far_id, rtmp_hash, hash, stream, rtmp, rtmfp, prefer) {
  Call.debug('incoming call ' + call_id + ' from ' + far_uid + ', prefer ' + prefer);
  var wrap = se('<div>\
    <div class="call_invitation_wrap clear_fix">\
      <div class="call_title noselect">'+getLang('calls_invitation_title')+'</div>\
      <div class="call_text noselect">'+text+'</div>\
      <div class="call_user_pic"><img src="'+photo+'" /></div>\
      <div class="call_buttons">\
        <div class="button_green"><button onclick="Call.incomingReply('+call_id+', '+far_uid+', \''+far_id+'\', \''+hash+'\', \''+stream+'\', \''+rtmp+'\', \''+rtmfp+'\', \''+prefer+'\', Call.enableCamera)">'+getLang('calls_reply')+'</button></div>\
        <div class="button_red"><button onclick="Call.incomingReject(3,'+call_id+','+far_uid+','+far_uid+',\''+hash+'\');">'+getLang('calls_reject')+'</button></div>\
        <button class="hover_button" onclick="Call.incomingToggleCam(this);"><div class="call_camera_btn"></div>'+getLang('calls_camera_on')+'</button>\
      </div>\
    </div></div>');
  var cont = geByClass1('call_invitation_wrap', wrap, 'div');
  var opts = {
    movable: cont,
    startLeft: parseInt((window.innerWidth - 244) / 2) + 'px',
    startTop: parseInt((window.innerHeight - 404) / 2) + 'px',
    startWidth: 244,
    startHeight: 404,
    resize: false,
    onBeforeHide: function() {
      Call.incomingReject(0, call_id, far_uid, far_uid, hash);
    },
    onDragEnd: function (y, x) {},
    onResize: function (h, w) {}
  }
  // show chat here
  Call.invitation = new RBox(wrap, opts);
  Call.doShowChat(far_uid, false, false);
},
calcBoxPos: function() {
  var w = window, de = document.documentElement;
  var size = {
    dw: Math.max(intval(w.innerWidth), intval(de.clientWidth)),
    dh: Math.max(intval(w.innerHeight), intval(de.clientHeight)),
    w: Call.width,
    h: 454 + (vk.id < 10000000 ? 37 : 0)
  }
  size.x = parseInt((size.dw - Call.width) / 2);
  size.y = parseInt((size.dh - 454) / 2);
  return size;
},
videochatBox: function(title) {
  var size = Call.calcBoxPos();
  var box = defBox({
    title: getLang('calls_alpha_version') + '</div><div class="fc_tab_title noselect">' + title,
    x: size.x + 'px',
    y: size.y + 'px',
    resize: true,
    width: Call.width,
    minW: 320,
    minH: size.h,
    subClass: 'calls_rb',
    onResize: function(h, w) {
      if (Call.videochat) {
        Call.videochat.width = w - 20;
        Call.videochat.height = h - 94/* - (vk.id < 10000000 ? 11 + getSize(ge('alpha_testing_disclaimer'))[1] : 0)*/;
      }
      Call.resizeToggleChat(h, w);
    },
    onBeforeHide: function() {
      Call.endCall(true, 0);
      return true;
    },
    innerHTML: '<div id="call_wrap" class="call_wrap clear_fix">\
      <div id="call_videochat"></div>' +
      '<div id="chat_toggle_btn" class="hover_button fl_r call_open_chat" onclick="Call.toggleChat(event)"><img class="call_chat_toggle_img" align="middle" src="/images/icons/call_chat_toggle.png" />\
      <span id="call_chat_toggle">'+getLang('calls_open_chat')+'</span></div>\
      <div id="call_cancel" class="call_cancel">\
        <div class="button_red"><button onclick="Call.endCall(true, 0)">'+getLang('calls_finish')+'</button></div>\
      </div>\
    </div>'
    //(vk.id < 10000000 ? '<div style="color: white; text-align: center; margin-top: 11px; text-shadow: 0px 1px 0px #262626; line-height: 140%" id="alpha_testing_disclaimer">'+getLang('calls_alpha_disclaimer').replace('{link}', '<a class="mem_link" style="font-weight: bold; color: #B1DAFF;" href="/support" target="_blank">').replace('{/link}', '</a>')+'</div>' : '') +
  }, function() {});

  Call.chatToggleBtn = ge('chat_toggle_btn');
  Call.chatToggleLabel = ge('call_chat_toggle');

  if (curFastChat && curFastChat.tabs && curFastChat.tabs[Call.params['far_uid']]) {
    var size = getSize(Call.chatToggleLabel);
    setStyle(Call.chatToggleLabel, {width: size[0]+'px'});
    Call.chatToggleLabel.innerHTML = getLang('calls_hide_chat');
    addClass(Call.chatToggleBtn, 'call_chat_sel');
  }

  var header = geByClass1('fc_tab_head', box.content, 'div');
  var tt = geByClass1('fc_tab_title', header, 'div');
  setStyle(tt, {color: '#FFFFFF', fontSize: '11px'});
  addClass(tt, 'fl_r');
  var wrapper = geByClass1('fc_clist_inner', box.content, 'div');
  if (!browser.msie) {
    setStyle(wrapper, 'background', 'rgba(0, 0, 0, 0.8);');
  }
  return box;
},

resizeToggleChat: function(h, w) {
  if (w < 470) {
    addClass(Call.chatToggleBtn, 'call_only_icon');
  } else {
    removeClass(Call.chatToggleBtn, 'call_only_icon');
  }
  setStyle(Call.chatToggleBtn, {
    width: Math.floor((w - 192 - 95) / 2)
  });

},

hideChat: function(obj) {
  var obj = Call.chatToggleBtn;
  if (!obj) return;
  if (curFastChat) {
    var tab = curFastChat.tabs[Call.params['far_uid']];
    if (tab) {
      tab.box.close();
    }
  }
  removeClass(obj, 'call_chat_sel');
  ge('call_chat_toggle').innerHTML = getLang('calls_open_chat');
},

showChat: function(force, ev) {
  var obj = Call.chatToggleBtn;
  if (!obj) return;
  if (!hasClass(obj, 'call_chat_sel') || force) {
    Call.doShowChat(Call.params['far_uid'], obj, ev);
  }
},

doShowChat: function(uid, obj, ev, box) {
  stManager.add(['notifier.js', 'notifier.css'], function() {
    var opts = {};
    if (obj) {
      var size = getSize(Call.chatToggleLabel);
      setStyle(Call.chatToggleLabel, {width: size[0]+'px'});
      addClass(obj, 'call_chat_sel');
      Call.chatToggleLabel.innerHTML = getLang('calls_hide_chat');
      opts.beforeClose = function() {
        obj && removeClass(obj, 'call_chat_sel');
        Call.chatToggleLabel.innerHTML = getLang('calls_open_chat');
      }
    }
    if (Call.box) {
      opts.startLeft = Call.box.pos[1] + Call.box.pos[3] + 10;
      opts.startTop = Math.abs(Call.box.pos[0] + Call.box.pos[2] - 319);
    }
    FastChat.selectPeer(uid, ev, opts);
  });
},

toggleChat: function(ev) {
  if (hasClass(Call.chatToggleBtn, 'call_chat_sel')) {
    Call.hideChat();
  } else {
    Call.showChat(true, ev);
  }
},

init: function() {
  if (Call.initiated) {
    return;
  }
  Call.initiated = true;

  var _n = window.Notifier;
  if (_n) {
    _n.addRecvClbk('videocall_reject', 'videocall', Call.dismissInvitation);
    _n.addRecvClbk('videocall_accept', 'videocall', Call.dismissInvitation);
  }

  Call.stopRing();
},

doneMsg: function(msg) {
  showDoneBox(getLang(msg), {out: 4000});
},

incomingToggleCam: function(btn) {
  Call.enableCamera = Call.enableCamera ? 0 : 1;
  btn.innerHTML = Call.enableCamera ?
    '<div class="call_camera_btn"></div>'+getLang('calls_camera_on') :
    '<img src="/images/icons/videocall_off.png">'+getLang('calls_camera_off');
},

incomingReceive: function(ev) {
  Call.init();
  if (Call.invitation || Call.box) {
    if ((Call.params.far_uid == ev.author_id) && (vk.id < ev.author_id)) {
      Call.debug('simultaneous invitations, instant reply');
      Call.endCall();
      Call.incomingReply(ev.custom.call_id, ev.author_id, ev.custom.near_id, ev.custom.hash, ev.custom.stream, ev.custom.rtmp, ev.custom.rtmfp, ev.custom.prefer);
    } else {
      Call.debug('incoming call declined, busy');
      Call.incomingReject(1, ev.custom.call_id, ev.author_id, ev.author_id, ev.custom.hash);
    }
    return;
  }
  if (browser.flash < 10 || (browser.flash == 10 && browser.flashfull.minor < 1)) {
    Call.debug('old fp, can not respond now, ignoring');
    return;
  }
  if (!Call.devices) {
    var dv = ce('div', {id: 'vchatdevices_swf'});
    utilsNode.appendChild(dv);
    window.__vchatDevicesCB = function(cams, mics) {
      Call.devices = ((cams > 0) || (mics > 0)) ? 1 : -1;
      if (Call.devices > 0) {
        Call.incomingDoReceive(ev.custom.call_id, ev.author_id, ev.custom.near_id, ev.custom.rtmp_hash, ev.custom.hash, ev.custom.stream, ev.custom.rtmp, ev.custom.rtmfp, ev.custom.prefer, ev.custom.video);
      }
    };
    renderFlash(dv, {
      url: 'swf/vchatdevices.swf',
      id: 'vchatdevices_pl',
      width: 1,
      height: 1,
      bgcolor: '#FFFFFF',
      version: 10
    }, {
      allowscriptaccess: 'always',
      allownetworking: 'all',
      wmode: 'opaque'
    }, {});
  } else
  if (Call.devices > 0) {
    Call.incomingDoReceive(ev.custom.call_id, ev.author_id, ev.custom.near_id, ev.custom.rtmp_hash, ev.custom.hash, ev.custom.stream, ev.custom.rtmp, ev.custom.rtmfp, ev.custom.prefer, ev.custom.video);
  }
},

incomingDoReceive: function(call_id, uid, far_id, rtmp_hash, hash, stream, rtmp, rtmfp, prefer, video) {
  ajax.post('call.php', {act: 'received', call_id: call_id, uid: uid, hash: hash}, {
    onDone: function(lang, text, photo) {
      if (!lang) return;

      Call.videocallActive(true);
      //Call.endCall();
      window.langpack = extend(window.langpack || {}, lang);
      Call.enableCamera = 1;
      Call.incomingBox(text, photo, call_id, uid, far_id, rtmp_hash, hash, stream, rtmp, rtmfp, prefer);
      Call.far_camera = video;
      Call.invitation_text = stripHTML(text);
      Call.pingTimeout = setTimeout(Call.noPing, 20000);
      if (!cur.titleTO) {
        cur.titleTO = setInterval(Call.changeTitle, 1000);
      }
      Call.playRing();
    }
  });
},

noPing: function() {
  Call.debug('invitation ping timed out');
  Call.doneMsg('calls_error_connection');
  Call.endCall(true, -1);
},

dismissInvitation: function() {
  clearInterval(Call.pingTimer);
  clearInterval(Call.shortPollTimer);
  clearTimeout(Call.pingTimeout);
  if (Call.invitation) {
    Call.invitation.close();
    Call.invitation = null;
  }
  Call.stopRing();
  Call.restoreTitle();
},

incomingReject: function(reason, call_id, from_id, uid, hash) {
  var _n = window.Notifier;
  if (_n) _n.lcSend('videocall_reject', {});
  Call.dismissInvitation();
  Call.videocallActive(false);

  ajax.post('call.php', {act: 'reject', reason: reason, call_id: call_id, from_id: from_id, uid: uid, hash: hash});
},

incomingReply: function(call_id, uid, farId, hash, stream, rtmp, rtmfp, prefer, video) {
  Call.debug('accepting call ' + call_id + ' from ' + uid + ', prefer ' + prefer);
  var _n = window.Notifier;
  if (_n) _n.lcSend('videocall_accept', {});
  Call.dismissInvitation();
  setFavIcon('/images/icons/fav_call' + _iconAdd + '.ico');
  Call.params = {
    call_id: call_id,
    from_id: uid,
    far_stream: stream,
    far_uid: uid,
    far_id: farId,
    far_prefer: prefer,
    hash: hash,
    video: video,
    audio: 1
  };
  Call.box = Call.videochatBox(getLang('calls_incoming_title'));
  Call.connected = {rtmp: (rtmp == "" ? 2 : 0), rtmfp: (rtmfp == "" ? 2 : 0)};
  Call.callbacks.onConnectionSuccess = function(protocol, nearId) {
    Call.debug(protocol + ' connected, proceed');
    Call.connected[protocol] = 1;
    if (protocol == "rtmfp") {
      Call.params.near_id = nearId;
    }
    Call.incomingInitialized();
  }
  Call.callbacks.onConnectionError = function(protocol) {
    Call.debug(protocol + ' failed, proceed');
    Call.connected[protocol] = 2;
    Call.incomingInitialized();
    ajax.post('call.php', {act: 'fail', type: (protocol == "rtmp") ? 1 : 2, rtmp: Call.rtmpServer, rtmp_hash: vk.vc_h});
  }
  Call.callbacks.onCameraStatus = function(muted) {
    Call.debug('camera ' + (muted ? 'muted' : 'unmuted') + ', proceed');
    Call.params.cameraActive = !muted;
    Call.incomingInitialized();
  }
  Call.callbacks.onMicrophoneStatus = function(muted) {
    Call.debug('mic ' + (muted ? 'muted' : 'unmuted') + ', proceed');
    Call.params.microphoneActive = !muted;
    Call.incomingInitialized();
  }
  ajax.post('call.php', {act: 'init', incoming: 1}, {
    onDone: function(rtmp_hash) {
      vk.vc_h = rtmp_hash;
      Call.videochat = Call.baseVideoBox('call_videochat', null, {
        rtmp: rtmp,
        rtmp_id: vk.id,
        rtmp_hash: vk.vc_h,
        rtmfp: rtmfp
      });
      if (Call.videochat) {
        Call.incomingInitialized();
      } else {
        hide('alpha_testing_disclaimer');
        hide('call_cancel');
      }
    }
  });
},

incomingInitialized: function() {
  if (Call.params.init_complete) {
    return;
  }
  if (Call.params.cameraActive || Call.params.microphoneActive) {
    Call.toggleMessage('calls_allow_access', true);
    Call.toggleMessage('calls_initialization');
  }
  if (!Call.connected || (!Call.connected.rtmp && !Call.connected.rtmfp) || (!Call.params.cameraActive && !Call.params.microphoneActive) || !Call.videochat) {
    return;
  }
  if (Call.connected.rtmp && !Call.connected.rtmfp && !Call.params.waitForRtmfp) {
    Call.params.waitForRtmfp = 1;
    setTimeout(Call.incomingInitialized, 1000);
    return;
  }
  Call.params.init_complete = true;
  Call.debug('initialization complete');
  Call.callbacks.onConnectionSuccess = function(protocol, nearId) {
    Call.debug(protocol + ' connected, proceed');
    Call.connected[protocol] = 1;
    if (protocol == "rtmfp") {
      Call.params.near_id = nearId;
    }
  };
  Call.callbacks.onConnectionError = null;
  Call.callbacks.onCameraStatus = null;
  Call.callbacks.onMicrophoneStatus = null;
  if (!Call.videochat) {
    return;
  }
  Call.establishConnection(function() {
    Call.debug('answering with ' + Call.params.near_prefer + ' preferred');
    ajax.post('call.php', {act: 'reply', call_id: Call.params.call_id, from_id: Call.params.from_id, uid: Call.params.far_uid, near_id: Call.params.near_id, hash: Call.params.hash, prefer: Call.params.near_prefer, video: Call.params.video}, {
      onDone: function(stream) {
        Call.debug('done, incoming call is started');
        Call.params.near_stream = stream;
        Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video));
        Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""), Call.params.near_prefer);
        Call.videochat.cameraAvailable(Call.far_camera);
        Call.toggleMessage('calls_allow_access', true);
        Call.toggleMessage('calls_initialization', true);
      }
    });
  });

},

establishConnection: function(callback) {
  if (Call.videochat) {
    if (Call.params.far_prefer && (Call.connected[Call.params.far_prefer] == 1)) {
      Call.params.near_prefer = Call.params.far_prefer;
    } else if (Call.connected.rtmp == 1) {
      Call.params.near_prefer = "rtmp";
    } else if (Call.connected.rtmfp == 1) {
      Call.params.near_prefer = "rtmfp";
    } else {
      Call.params.establishTry = (Call.params.establishTry || 0) + 1;
      Call.debug('wait to establish');
      if (Call.params.establishTry < 10) {
        return setTimeout(Call.establishConnection.pbind(callback), 1000);
      }
      Call.debug('unable to establish any connection, terminating');
      Call.doneMsg('calls_error_connection');
      Call.endCall(true, -1);
      return false;
    }
    if ((Call.params.near_prefer == "rtmfp") && !Call.params.connected) {
      Call.peerTimer = setTimeout(function() {
        if (!Call.videochat) {
          return;
        }
        Call.debug("no response for 5 seconds, fallback to rtmp...(2)");
        Call.params.near_prefer = "rtmp";
        Call.connected.rtmfp = 2;
        if (Call.establishConnection()) {
          Call.debug('reconnecting to ' + Call.params.near_prefer);
          Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video));
          Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""));
          Call.videochat.cameraAvailable(Call.far_camera);
          ajax.post('call.php', {act: 'reconnect', call_id: Call.params.call_id, from_id: Call.params.from_id, uid: Call.params.far_uid, hash: Call.params.hash, prefer: Call.params.near_prefer});
        }
        ajax.post('call.php', {act: 'fail', type: 0});
      }, 5000);
    }
    if (callback) {
      callback();
    }
    return true;
  }
  return false;
},

videocallActive: function(active) {
  var btn = ge('profile_message_send');
  var cl =  false;
  if (active) {
    if (hasClass(btn, 'profile_msg_split')) {
      cl = 'profile_msg_msg';
    } else {
      cl = 'profile_msg_none';
    }
    hide(boxLoader);
    hide(boxLayerWrap);
    var _n = window.Notifier;
    if (_n) _n.lcSend('videocall_start', {});
  } else {
    if (hasClass(btn, 'profile_msg_msg')) {
      cl = 'profile_msg_split';
    } else if (!hasClass(btn, 'profile_msg_split')) {
      cl = 'profile_msg_call';
    }
    var _n = window.Notifier;
    if (_n) _n.lcSend('videocall_end', {});
  }
  if (btn && cl) {
    btn.className = 'profile_action_btn ' + cl;
  }
},

toggleVideo: function() {
  if (Call.videochat) {
    Call.params.video = Call.params.video ? 0 : 1;
    Call.videochat.toggleVideo(Boolean(Call.params.video));
  }
},
toggleAudio: function() {
  if (Call.videochat) {
    Call.params.audio = Call.params.audio ? 0 : 1;
    Call.videochat.toggleAudio(Boolean(Call.params.audio));
  }
},
toggleFullscreen: function() {
  if (Call.videochat) {
    Call.params.fullscreen = Call.params.fullscreen ? 0 : 1;
    Call.videochat.toggleFullscreen(Boolean(Call.params.fullscreen));
  }
},
toggleMute: function() {
  if (Call.videochat) {
    Call.params.mute = Call.params.mute ? 0 : 1;
    Call.videochat.setVolume(Call.params.mute ? 0.0 : 1.0);
  }
},

changeTitle: function() {
  if (!Call.invitation) return Call.restoreTitle();
  if (!Call.old_title) {
    Call.old_title = document.title.toString();
    document.title = Call.invitation_text;
    setFavIcon('/images/icons/fav_call' + _iconAdd + '.ico');
  } else {
    document.title = Call.old_title;
    Call.old_title = false;
    setFavIcon('/images/favicon' + (vk.intnat ? '_vk' : 'new') + _iconAdd + '.ico');
  }
},

restoreTitle: function() {
  if (Call.old_title) {
    var t = Call.old_title;
    setTimeout(function() { document.title = t; }, 200);
    setFavIcon('/images/favicon' + (vk.intnat ? '_vk' : 'new') + _iconAdd + '.ico');
    Call.old_title = false;
  }
  clearInterval(cur.titleTO);
  cur.titleTO = false;
},

sendPing: function(fast) {
  ajax.post('call.php', {
    act: 'ping',
    call_id: Call.params.call_id,
    from_id: Call.params.from_id,
    uid: Call.params.far_uid,
    near_id: Call.params.near_id,
    prefer: Call.params.near_prefer,
    hash: Call.params.hash,
    fast: fast ? 1 : 0
  }, {
    onDone: function(actions) {
      if (actions && actions.length) {
        for (var i in actions) {
          Call.processNotify(actions[i], true);
        }
      }
    },
    onFail: function(text) {
      debugLog(text);
      return true;
    }
  });
},

start: function(uid, video) {
  Call.debug('started outgoing call to ' + uid);
  Call.init();
  Call.endCall();
  var tt = (ge('videocall_btn') || {}).tt;
  if (tt && tt.hide && tt.destroy) {
    //tt.hide({fasthide: 1});
    tt.destroy();
  }

  Call.videocallActive(true);
  setFavIcon('/images/icons/fav_call' + _iconAdd + '.ico');
  Call.params = {from_id: vk.id, far_uid: uid, video: video, audio: 1};
  Call.box = Call.videochatBox(getLang('calls_outgoing_title'));
  Call.connected = {rtmp: (Call.rtmpServer == "" ? 2 : 0), rtmfp: (Call.rtmfpServer == "" ? 2 : 0)};
  Call.callbacks.onConnectionSuccess = function(protocol, nearId) {
    Call.debug(protocol + ' connected, proceed');
    Call.connected[protocol] = 1;
    if (protocol == "rtmfp") {
      Call.params.near_id = nearId;
    }
    Call.outgoingInitialized();
  }
  Call.callbacks.onConnectionError = function(protocol) {
    Call.debug(protocol + ' failed, proceed');
    Call.connected[protocol] = 2;
    ajax.post('call.php', {act: 'fail', type: (protocol == "rtmp") ? 1 : 2, rtmp: Call.rtmpServer, rtmp_hash: vk.vc_h});
    Call.outgoingInitialized();
  }
  Call.callbacks.onCameraStatus = function(muted) {
    Call.debug('camera ' + (muted ? 'muted' : 'unmuted') + ', proceed');
    Call.params.cameraActive = !muted;
    Call.outgoingInitialized();
  }
  Call.callbacks.onMicrophoneStatus = function(muted) {
    Call.debug('mic ' + (muted ? 'muted' : 'unmuted') + ', proceed');
    Call.params.microphoneActive = !muted;
    Call.outgoingInitialized();
  }
  Call.videochat = Call.baseVideoBox('call_videochat', null, {
    rtmp: Call.rtmpServer,
    rtmp_id: vk.id,
    rtmp_hash: vk.vc_h,
    rtmfp: Call.rtmfpServer
  });
  if (!Call.videochat) {
    hide('alpha_testing_disclaimer');
    hide('call_cancel');
  }
},

outgoingInitialized: function() {
  if (Call.params.init_complete) {
    return;
  }
  if (Call.params.cameraActive || Call.params.microphoneActive) {
    Call.toggleMessage('calls_allow_access', true);
    Call.toggleMessage('calls_initialization');
  }
  if (!Call.connected || (!Call.connected.rtmp && !Call.connected.rtmfp) || (!Call.params.cameraActive && !Call.params.microphoneActive)) {
    return;
  }
  if (Call.connected.rtmp && !Call.connected.rtmfp && !Call.params.waitForRtmfp) {
    Call.params.waitForRtmfp = 1;
    setTimeout(Call.outgoingInitialized, 1000);
    return;
  }
  Call.params.init_complete = true;
  Call.debug('initialization complete');
  //Call.callbacks.onConnectionSuccess = null;
  Call.callbacks.onConnectionSuccess = function(protocol, nearId) {
    Call.debug(protocol + ' connected, proceed');
    Call.connected[protocol] = 1;
    if (protocol == "rtmfp" && !Call.params.near_id) {
      Call.params.near_id = nearId;
    }
  }
  Call.callbacks.onConnectionError = null;
  Call.callbacks.onMicrophoneStatus = null;
  Call.callbacks.onCameraStatus = null;
  if (Call.videochat) {
    Call.params.near_prefer = ((Call.connected.rtmfp == 1) ? "rtmfp" : "rtmp");
    //Call.params.near_prefer = ((Call.connected.rtmp == 1) ? "rtmp" : "rtmfp");
    Call.debug('calling with ' + Call.params.near_prefer + ' preferred');

    Call.receiveTimeout = setTimeout(function() {
      if (Call.box) {
        Call.doneMsg('calls_user_unavailable');
        Call.endCall(true, 2);
      }
    }, 10000);
    Call.replyTimeout = setTimeout(function() {
      if (Call.box) {
        Call.doneMsg('calls_no_reply');
        Call.endCall(true, 2);
      }
    }, 180000);


    ajax.post('call.php', {act: 'start', uid: Call.params.far_uid, near_id: Call.params.near_id, prefer: Call.params.near_prefer, video: Call.params.video}, {
      onDone: function(call_id, stream, hash, user_pic) {
        if (call_id == 0) {
          Call.debug('server says other user can not reply to this call...');
          Call.doneMsg('calls_user_unavailable');
          Call.endCall();
          return;
        }
        Call.debug('call ' + call_id + ' started, publishing');
        Call.params = extend(Call.params, {call_id: call_id, near_stream: stream, hash: hash});
        Call.videochat.setUserPic(user_pic);
        Call.startPublish(stream);
      }
    });
  }
},

startPublish: function(stream) {
  if (!Call.connected[Call.params.near_prefer]) {
    setTimeout(Call.startPublish.pbind(stream), 1000);
    return false;
  }
  Call.videochat.startCallPublish(stream, Call.params.near_prefer, Boolean(Call.params.video));
  Call.toggleMessage('calls_allow_access', true);
  Call.shortPollTimer = setInterval(Call.sendPing.pbind(true), 2000);
  Call.pingTimer = setInterval(Call.sendPing.pbind(false), 15000);
  Call.sendPing(true);
  if (Call.params.far_id) {
    Call.outgoingReplied();
  }
},

outgoingReply: function(ev) {
  Call.debug(Call.params.far_uid + ' replied with ' + ev.custom.prefer + ' preferred');
  Call.params = extend(Call.params, {far_id: ev.custom.far_id, far_prefer: ev.custom.prefer, far_stream: ev.custom.stream});
  Call.far_camera = ev.custom.video;
  Call.videochat.cameraAvailable(Call.far_camera);
  if (Call.params.call_id) {
    Call.outgoingReplied();
  }
},

outgoingReplied: function() {
  Call.debug('processing reply');
  clearInterval(Call.pingTimer);
  clearTimeout(Call.pingTimeout);
  clearTimeout(Call.receiveTimeout);
  clearTimeout(Call.replyTimeout);

  Call.videochat.toggleWait(false);
  if (Call.params.far_prefer == Call.params.near_prefer) {
    if ((Call.params.near_prefer == "rtmfp") && !Call.params.connected) {
      Call.peerTimer = setTimeout(function() {
        Call.debug("no response for 5 seconds, fallback to rtmp...(1)");
        Call.params.near_prefer = "rtmp";
        Call.connected.rtmfp = 2;
        if (Call.establishConnection()) {
          Call.debug('reconnecting to ' + Call.params.near_prefer);
          Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video));
          Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""), Call.params.near_prefer);
          Call.videochat.cameraAvailable(Call.far_camera);
          ajax.post('call.php', {act: 'reconnect', call_id: Call.params.call_id, from_id: Call.params.from_id, uid: Call.params.far_uid, hash: Call.params.hash, prefer: Call.params.near_prefer});
        }
        ajax.post('call.php', {act: 'fail', type: 0});
      }, 5000);
    }
    Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""), Call.params.near_prefer);
  } else {
    if (Call.establishConnection()) {
      Call.debug('connecting over ' + Call.params.near_prefer);
      Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video));
      Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""), Call.params.near_prefer);
      Call.videochat.cameraAvailable(Call.far_camera);
    }
  }
},

doEndCall: function(reject, reason) {
  Call.videocallActive(false);
  if (Call.videochat) {
    try {
      Call.videochat.endCall();
    } catch(e) {
      debugLog('player problems');
    }
    Call.videochat = null;
  }
  if (Call.box) {
    Call.box.close(0, true);
    Call.box = null;
  }
  if (Call.invitation) {
    Call.invitation.close();
    Call.invitation = null;
  }
  if (reject && Call.params.call_id && Call.params.far_uid && Call.params.hash) {
    ajax.post('call.php', {act: 'reject', reason: reason, call_id: Call.params.call_id, from_id: Call.params.from_id, uid: Call.params.far_uid, hash: Call.params.hash});
    var _n = window.Notifier;
    if (_n) _n.lcSend('videocall_reject', Call.params);
  }
  Call.params = {};
  Call.stopRing();
  Call.restoreTitle();
  setFavIcon('/images/favicon' + (vk.intnat ? '_vk' : 'new') + _iconAdd + '.ico');
},

endCall: function(reject, reason) {
  clearInterval(Call.pingTimer);
  clearInterval(Call.shortPollTimer);
  clearTimeout(Call.pingTimeout);
  clearTimeout(Call.peerTimer);
  clearTimeout(Call.receiveTimeout);
  clearTimeout(Call.replyTimeout);
  if (Call.box) {
    setStyle(Call.box.wrap, {left: -1000, top: -1000});
    setTimeout(function() {
      Call.doEndCall(reject, reason);
    }, 10);
  } else {
    Call.doEndCall(reject, reason);
  }
},

toggleMessage: function(msg_id, hide) {
  if (Call.videochat) {
    if (hide) {
      Call.videochat.hideMessage(msg_id);
    } else {
      Call.videochat.showMessage(msg_id, getLang(msg_id));
    }
  }
},

processNotify: function(ev, shortPoll) { // could be triggered by sendPing twice
  switch (ev.custom.code) {
    case 'received':
      if (Call.videochat && Call.params.call_id == ev.custom.call_id && !Call.params.far_stream) {
        if (Call.params.received) break;
        Call.params.received = true;
        clearTimeout(Call.receiveTimeout);
        Call.toggleMessage('calls_initialization', true);
        Call.videochat.toggleWait(true);
      }
      break;
    case 'reply':
      if (Call.params.replied) break;
      Call.params.replied = true;
      if (Call.videochat) {
        Call.outgoingReply(ev);
      }
      break;
    case 'ping':
      clearTimeout(Call.pingTimeout);
      if (Call.invitation) {
        Call.pingTimeout = setTimeout(Call.noPing, 20000);
      }
      break;
    case 'selfreply':
      if (!Call.params || !Call.params.call_id) {
        Call.endCall();
      }
      break;
    case 'selfhangup':
      Call.endCall();
      break;
    case 'hangup':
      if (Call.box || Call.invitation) {
        switch (ev.custom.reason) {
          case -1: Call.doneMsg('calls_error_connection'); break;
          case  1: Call.doneMsg('calls_error_busy'); break;
          case  3: Call.doneMsg('calls_rejected'); break;
          default: Call.doneMsg('calls_hangup'); break;
        }
      }
      Call.endCall();
      break;
    case 'reconnect':
      if (Call.videochat && (Call.params.near_prefer != ev.custom.prefer)) {
        clearTimeout(Call.peerTimer);
        Call.params.far_prefer = ev.custom.prefer;
        if (Call.establishConnection()) {
          Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video));
          Call.videochat.startCallPlay(Call.params.far_stream, (Call.params.near_prefer == "rtmfp" ? Call.params.far_id : ""), Call.params.near_prefer);
        }
      }
      break;
    case 'camera':
      if (!shortPoll) {
        clearInterval(Call.shortPollTimer);
      }
      if (Call.videochat) {
        Call.videochat.cameraAvailable(ev.custom.available);
        if (!ev.custom.available) {
          Call.toggleMessage('calls_connection_troubles', true);
        }
      }
      Call.far_camera = ev.custom.available;
      break;
  }
},

debug: function(msg) {
  debugLog(msg);
  var t = '[' + (((new Date()).getTime() - _logTimer) / 1000) + '] ';
  Call.log += t + msg + '\n';
},

defaultCallbacks: {
  debugLog: function(msg) {
    Call.debug(msg);
  },
  onPeerConnect: function() {
    Call.debug("peer connected");
    Call.params.connected = true;
    clearTimeout(Call.peerTimer);
  },
  onCameraToggle: function(available) {
    if (Call.params.call_id && Call.params.from_id && Call.params.far_uid && Call.params.hash) {
      ajax.post('call.php', {act: 'camera', available: available ? 1 : 0, call_id: Call.params.call_id, from_id: Call.params.from_id, uid: Call.params.far_uid, hash: Call.params.hash});
    }
  },
  onSignalChange: function(video) {
    Call.toggleMessage('calls_connection_troubles', video);
    /*if (video) {
      clearTimeout(Call.noSignalTO);
    } else {
      Call.noSignalTO = setTimeout(function() {
        if (Call.box) {
          Call.doneMsg('calls_error_connection');
          Call.endCall(true, -1);
        }
      }, 20000);
    }*/
  },
  onNeedHelpLink: function() {
    Call.endCall();
    nav.go('support');
  }
},

callbacks: {
  debugLog: function(msg) {
    if (vk.host && vk.host.length > 20) {
      debugLog([msg]);
    }
  }
},

eof:1};try{stManager.done('call.js');}catch(e){}
