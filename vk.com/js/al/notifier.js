// https://github.com/Olical/EventEmitter
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);

if (!window.curNotifier) {
  curNotifier = {
    addQueues: {},
    recvClbks: {},
    recvData: {},
    onConnectionId: []
  };
}

var BASIC_CHAT_ZINDEX = 1010;

function IdleManager(opts) {
  this.started = false;
  this.is_idle = true;
  this.is_activated = false;
  this.cbActiveB = this.cbActive.bind(this);
  this.cbInactiveB = this.cbInactive.bind(this);
  this.cbInactiveB = this.cbInactive.bind(this);

  this.opts = extend({
    triggerEvents: 'mousemove keydown',
    onIdleCb: function() {},
    onUnIdleCb: function() {},
    focusElement: opts.element,
    element: null,
    idleTimeout: 30000
  }, opts);
}

extend(IdleManager.prototype, EventEmitter.prototype);

extend(IdleManager.prototype, {
  stop: function() {
    this.started = false;
    removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB);
    removeEvent(this.opts.focusElement, 'focus', this.cbActiveB);
    removeEvent(this.opts.focusElement, 'blur', this.cbInactiveB);
    clearTimeout(this.setIdleTo);
    clearTimeout(this.checkIdleCbTo);
    clearTimeout(this.sendCbTO);
    this.is_idle = true;
    if(this.opts.parentManager) {
      this.opts.parentManager.off('idle', this.cbInactiveB);
    }
  },

  idle: function(quite) {
    this.is_idle = true;
    if(!quite) {
      this.opts.onIdleCb();
    }
    this.emit('idle');
  },

  unidle: function(quite) {
    this.is_idle = false;
    if(!quite) {
      this.opts.onUnIdleCb();
    }
    this.emit('unidle');
  },

  activate: function() {
    this.is_idle = false;
    this.is_activated = true;
  },

  start: function() {
    this.started = true;
    if (browser.mobile) {
      return;
    }
    if(this.opts.parentManager) {
      this.opts.parentManager.on('idle', this.cbInactiveB);
    }
    addEvent(this.opts.focusElement, 'focus', this.cbActiveB);
    addEvent(this.opts.focusElement, 'blur', this.cbInactiveB);
    clearTimeout(this.checkIdleCbTo);
    this.checkIdleCb();
    this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this),
      this.opts.idleTimeout);
  },

  checkIdleCb: function() {
    if (!this.started) {
      return;
    }
    addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB);
    clearTimeout(this.setIdleTo);
    this.setIdleTo = setTimeout(this.cbInactiveB,
      this.opts.idleTimeout); // tab becomes idle in 30 secs without moving mouse or typing
  },

  cbActive: function() {
    if (!this.started) {
      return;
    }
    clearTimeout(this.setIdleTo);
    if (this.is_idle) {
      this.is_idle = false;
      clearTimeout(this.sendCbTO);
      this.sendCbTO = setTimeout(function () {
        this.emit('unidle');
        if (this.opts.onUnIdleCb) {
          this.opts.onUnIdleCb();
        }
      }.bind(this), 100);
    }
    removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB);
    clearTimeout(this.checkIdleCbTo);
    this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this),
      this.opts.idleTimeout);
  },

  cbInactive: function() {
    if (!this.started) {
      return;
    }
    if (!this.is_idle) {
      this.is_idle = true;
      clearTimeout(this.sendCbTO);
      this.sendCbTO = setTimeout(function () {
        this.emit('idle');
        if (this.opts.onIdleCb) {
          this.opts.onIdleCb();
        }
      }.bind(this), 100);
    }
    clearTimeout(this.checkIdleCbTo);
    removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB);
    addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB);
    this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout);
  }

});

Notifier = {
  debug: false,
  init: function (options) {
    if(window.curNotifier && curNotifier.connection_id) {
      return;
    }
    Notifier.notificationsGc();
    curNotifier = extend({
      q_events: [],
      q_shown: [],
      q_closed: [],
      negotiations: {},
      currentIm: {},
      q_max: 3,
      uiNotifications: [],
      q_idle_max: 5,
      browser_shown: {},
      done_events: {},
      addQueues: curNotifier.addQueues || {},
      recvClbks: curNotifier.recvClbks || {},
      recvData: curNotifier.recvData || {},
      error_timeout: 1,
      sound: new Sound('mp3/bb1'),
      sound_im: new Sound('mp3/bb2'),
      onConnectionId: []
    }, options);

    if (!this.initFrameTransport()) {
      return false;
    }
    this.initIdleMan();
    this.initCommunityQueues();
    if (!(curNotifier.cont = ge('notifiers_wrap'))) {
      bodyNode.insertBefore(curNotifier.cont = ce('div', {id: 'notifiers_wrap', className: 'fixed'}), ge('page_wrap'));
    }
  },

  initCommunityQueues: function(fails) {

    var key = ls.get('im_m_comms_key');

    var check = key && key.split ? key.split(';') : [];
    if (check[0] === 'empty' && check[1] && Date.now() - check[1] < 60 * 1 * 1000) {
      key = 'empty';
    } else if (check[0] === 'empty') {
      key = false;
    }

    if (key) {
      return Notifier.proccessCommunityQueues(key, fails || 0);
    }

    ajax.post('al_im.php', { act: 'a_get_comms_key' }, {
      onDone: function(queue) {
        if (queue === 'empty') {
          queue += ";" + Date.now();
        } else {
          Notifier.proccessCommunityQueues(queue, fails || 0);
        }
        ls.set('im_m_comms_key', queue);
      },
      onFail: function() {
        return true;
      }
    })
  },

  notificationsGc: function() {
    curNotifier.uiGcTo = setTimeout(function() {
      var notes = curNotifier.uiNotifications;
      var newNotes = [];
      for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (vkNow() - note[1] > 10000) {
          note[0].close();
        } else {
          newNotes.push(note);
        }
      }

      curNotifier.uiNotifications = newNotes;
      Notifier.notificationsGc();
    }, 5000);
  },

  resetCommConnection: function(fails) {
    var key = ls.get('im_m_comms_key');
    delete curNotifier.addQueues[key.queue];
    ls.set('im_m_comms_key', false);
    Notifier.initCommunityQueues(fails || 0);
  },

  proccessCommunityQueues: function(queue, fails) {
    if (queue === 'empty' || !queue) {
      return false;
    }
    Notifier.addKey(queue, function(key, ev) {
      if (ev.failed) {
        fails++;
        if (fails < 50) {
          setTimeout(Notifier.resetCommConnection.pbind(fails), 100);
        }
        return;
      }

      var key = ls.get('im_m_comms_key');
      if (key) {
        key.ts = ev.ts;
        ls.set('im_m_comms_key', key);
      }


      var evs = ev.events;
      if (!evs) {
        return;
      }
      evs.map(function(ev) {
        return ev.split('<!>');
      }).forEach(function(ev) {
        if (ev[1] === 'update_cnt') {
          var gid = ev[5];
          var ct = ev[4];
          handlePageCount('mgid' + gid, ct);
        }
      })
    });
  },

  destroy: function () {
    Notifier.hideAllEvents();
    curNotifier.idle_manager.stop();
    if (curNotifier.uiGcTo) {
      clearTimeout(curNotifier.uiGcTo);
    }
    curNotifier = {};
    re('notifiers_wrap');
    re('queue_transport_wrap');
  },
  reinit: function () {
    ajax.post('notifier.php?act=a_get_params', {}, {
      onDone: function (options) {
        if (options) {
          curNotifier.error_timeout = 1;
          this.init(options);
        } else {
          curNotifier.error_timeout = curNotifier.error_timeout || 1;
          setTimeout(this.reinit.bind(this), curNotifier.error_timeout * 1000);
          if (curNotifier.error_timeout < 256) {
            curNotifier.error_timeout *= 2;
          }
        }
      }.bind(this),
      onFail: function () {
        curNotifier.error_timeout = curNotifier.error_timeout || 1;
        setTimeout(this.reinit.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 256) {
          curNotifier.error_timeout *= 2;
        }
        return true;
      }.bind(this)
    });
  },
  standby: function (nextTO) {
    this.destroy();
    curNotifier.error_timeout = nextTO || 1;
    setTimeout(this.reinit.bind(this), curNotifier.error_timeout * 1000);
  },
  freezeEvents: function () {
    curNotifier.frozen = true;
    each (curNotifier.q_shown, function () {
      clearTimeout(this.fadeTO);
      if (getStyle(this.baloonEl, 'opacity') < 1) {
        animate(this.baloonEl, {opacity: 1}, 100);
      }
    });
  },
  unfreezeEvents: function () {
    curNotifier.frozen = false;
    each (curNotifier.q_shown, function () {
      this.fadeTO = setTimeout(this.startFading, 5000);
    });
  },
  getTransportWrap: function () {
    return ge('queue_transport_wrap') || utilsNode.appendChild(ce('div', {id: 'queue_transport_wrap'}));
  },
  setFocus: function (val) {
    var instance = (val ? '1' : '0') + curNotifier.instance_id;
    if (curNotifier.transport == 'flash' && curNotifier.flash_transport) {
      curNotifier.flash_transport.setInstanceFocused(instance);
    } else if (curNotifier.transport == 'frame') {
      Notifier.lcSend('focus', {instance_id: instance});
      this.onInstanceFocus(instance);
    }
  },
  initIdleMan: function () {
    if (curNotifier.idle_manager && curNotifier.idle_manager.started) return;

    curNotifier.idle_manager = new IdleManager({
      onIdleCb: function () { // on IDLE
        Notifier.freezeEvents();
        Notifier.setFocus(0);
        cur.onIdle && each(cur.onIdle, function (k, cb) {cb();});
      },
      onUnIdleCb: function () { // on ACTIVE
        Notifier.unfreezeEvents();
        Notifier.setFocus(1);
        cur.onUnidle && each(cur.onUnidle, function (k, cb) {cb()});
        FastChat && FastChat.onUnidle();
        vk.spentLastSendTS = vkNow();
      },
      id: 'window',
      element: document,
      focusElement: window
    });
    curNotifier.idle_manager.start();
  },
  initFrameTransport: function () {
    if (!ls.checkVersion() || browser.msie8 || !('onmessage' in window || 'postMessage' in window)) return false;

    curNotifier.connection_id = 'queue_connection_' + curNotifier.queue_id;
    curNotifier.lc_prev_value = '';
    curNotifier.is_server = false;
    curNotifier.lp_connected = false;
    curNotifier.error_timeout = 1;
    var versions = browser.version.split('.'),
        majorVersion = intval(versions[0]),
        minorVersion = intval(versions[1]);
    curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && majorVersion >= 31 || browser.safari && (majorVersion > 7 || majorVersion == 7 && minorVersion >= 1));
    curNotifier.transport = 'frame';

    this.lcInit();

    for (var i in curNotifier.onConnectionId) {
      curNotifier.onConnectionId[i]();
    }
    curNotifier.onConnectionId = [];

    return true;
  },
  onActivated: function() {
    if (curNotifier.idle_manager && !curNotifier.idle_manager.is_activated) {
      curNotifier.idle_manager.activate();
    } else {
      if (!curNotifier.idle_manager || !curNotifier.idle_manager.is_idle) {
        Notifier.setFocus(1);
      }
    }
    removeEvent(document, 'mousemove keydown touchstart', Notifier.onActivated);
  },
  onConnectionInit: function() {
    addEvent(document, 'mousemove keydown touchstart', Notifier.onActivated);
  },
  onConnectionFailed: function () { },
  onRelogin: function () {
    setTimeout(function () {
      Notifier.standby();
    }, 0);
  },
  onMessage: function (msg) {
    if (curNotifier.focus_instance && curNotifier.focus_instance != curNotifier.instance_id) { // Process only events, when no active tab or current window is focused
      return;
    }
    try {
      var events = eval('(' + msg + ')'), pushed = false;
      Notifier.pushEvents(events);
    } catch (e) {debugLog(e.message);}
  },
  onInstanceFocus: function (instance) {
    var focused = instance.charAt(0);
    instance = instance.substr(1);
    if (focused == '1') {
      curNotifier.focus_instance = instance;
    } else {
      if (curNotifier.focus_instance == instance) {
        curNotifier.focus_instance = '';
      }
      return;
    }
    if (instance != curNotifier.instance_id) {
      if (!curNotifier.idle_manager.is_idle) {
        curNotifier.idle_manager.idle();
      }
      Notifier.hideAllEvents();
    }
  },
  onInstanceServer: function (isServer) {
    curNotifier.is_server = !!intval(isServer);
  },
  pushEvents: function (evs, cnt) {
    var pushed = 0;
    each (evs, function (k, v) {
      pushed |= Notifier.pushEvent(v, cnt);
    });
    if (pushed && !ls.get('sound_notify_off') && curNotifier.is_server) {
      if (pushed & 2) {
        curNotifier.sound_im.play();
      } else {
        curNotifier.sound.play();
      }
    }
  },
  pushEvent: function (msg, cnt) {
    if (msg == 'nop') {
      return;
    }
    msg = msg.split('<!>');
    if (msg[0] != curNotifier.version) {
      debugLog('Notifier old version');
      return false;
    }
    if (msg[1] == 'update_cnt') { // msg[2] - section
      handlePageCount(msg[3], msg[4], msg[5], msg[6]);
      return 0;
    }
    var ev = {
      type: msg[1],
      title: msg[2],
      author_photo: psr(msg[3] || ''),
      author_link: msg[4] || '',
      text: psr(msg[5]),
      add_photo: psr(msg[6]) || '',
      link: msg[7],
      onclick: msg[8],
      add: msg[9],
      id: msg[10],
      author_id: msg[11]
    }, push = !cnt ? 1 : 0;

    if (msg[13]) {
      ev.custom = eval('('+msg[13]+')');
    }

    if (curNotifier.done_events[ev.id]) return;
    curNotifier.done_events[ev.id] = 1;
    // debugLog(ev.type, ev.add, !!cnt);
    switch (ev.type) {
      case 'video_process_ready':
        if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) {
          return;
        }

        break;
      case 'mail':
        handlePageCount('msg', ev.add);
        if (window.Call && Call.params.call_id && intval(ev['author_id']) == intval(Call.params['far_uid'])) {
          Call.showChat();
        }
        if (cur.module != 'im') {
          FastChat.prepareTabIcon(intval(ev['author_id']), {fixedLoad: 1});
        }
        break;

      case 'post_reply':
      case 'reply_reply':
      case 'post_mention':
      case 'reply_mention':
      case 'wall_post':
      case 'comment_photo':
      case 'comment_photo_reply':
      case 'comment_photo_mention':
      case 'comment_video':
      case 'comment_video_reply':
      case 'comment_video_mention':
      case 'comment_market_reply':
      case 'comment_market_mention':
      case 'board_mention':
        handlePageCount('nws', ev.add, 'feed' + (ge('l_nwsf') ? '?section=notifications' : ''), ge('l_nwsf') ? '' : 'section=notifications');
        break;

      case 'mail_failed':
        var peer = intval(ev.author_id);
        if (nav.objLoc[0] == 'im' && cur.tabs[peer]) {
          var msg = ge('mess'+ev.add);
          if (msg && hasClass(msg, 'im_new_msg')) {
            removeClass(msg, 'im_new_msg');
            addClass(msg, 'im_failed');
            var n = geByClass1('im_log_author_chat_name', msg);
            if (n) {
              n.innerHTML += ' &nbsp;<span>'+cur.lang['mail_send_failed']+'</span>';
            }
            push = 2; // only sound
          }
        }
        break;

      case 'friend_request':
        handlePageCount('fr', ev.add);
        break;

      case 'mail_cnt':
        handlePageCount('msg', ev.add);
        push = 0;
        break;

      case 'clear_notify':
        Notifier.hideAllEvents();
        push = 0;
        break;

      case 'support_reply':
        handlePageCount ('spr', ev.add, 'support', (ev.author_id ? 'act=show&id=' + ev.author_id : 'act=show'));
        toggle('l_spr', ev.add > 0);
        break;

      case 'support_cnt':
        handlePageCount ('spr', ev.add, 'support', (ev.author_id ? 'act=show&id=' + ev.author_id : 'act=show'));
        toggle('l_spr', ev.add > 0);
        push = 0;
        break;

      case 'balance_changed':
        updateMoney(ev.add);
        if (ev.custom && ev.custom[0] == 'app' && cur.app) {
          if (cur.app.params.api_id == ev.custom[1]) {
            cur.app.balanceUpdated(ev.custom[2]);
          }
        }
        break;

      case 'gift_sent':
        re('left_block10_0');
        var left_block = ev.add;
        if (left_block) {
          var leftBlocksElem = ge('left_blocks'),
              left_unpaid_gifts = se(left_block);
          if (leftBlocksElem) {
            if (leftBlocksElem.firstChild) {
              leftBlocksElem.insertBefore(left_unpaid_gifts, leftBlocksElem.firstChild);
            } else {
              leftBlocksElem.appendChild(left_unpaid_gifts);
            }
          }
        }
        break;

      case 'call_start':
        if (window.Call) {
          Call.incomingReceive(ev);
        } else {
          stManager.add(['call.js', 'call.css', 'notifier.css'], function() {
            Call.incomingReceive(ev);
          });
        }
        push = 0;
        break;

      case 'call':
        if (window.Call) {
          Call.processNotify(ev);
        } else {
          debugLog('wnd Call event without call obj');
        }
        push = 0;
        break;
      case 'call_app':
        var callId = ev.custom.call_id;

        var onScriptCame = function(script) {
          clearTimeout(curNotifier.appCallTimeout);
          script = (script && script[0] == callId) ? script[1] : false;
          if (script && script != -1) {
            stManager.add(['call.js', 'call.css', 'apps.js', 'apps.css'], function() {
              eval(script);
            });
          }
        }

        curNotifier.appCallTimeout = setTimeout(function() {
          var script = curNotifier.recvData['apps_call_receive'];
          script = (script && script[0] == callId) ? script[1] : false;
          if (!script) {
            ajax.post('/al_apps.php', {act: 'call_receive'}, {
              onDone: function(script) {
                debugLog('script came');
                script = [callId, script];
                Notifier.lcSend('apps_call_receive', script)
                onScriptCame(script);
              },
              stat: ['call.js', 'call.css', 'apps.js', 'apps.css']
            });
            Notifier.lcSend('apps_call_receive', [callId, -1])
          }
        }, 0);
        Notifier.setRecvClbk('apps_call_receive', onScriptCame);

        push = 0;
        break;
      case 'call_app_reject':
        if (cur.module == 'app' && cur.aid == ev.custom.aid) {
          cur.app.runCallback('onCallReject', ev.custom.key);
        }
        push = 0;
        break;
      case 'call_app_accept':
        if (cur.module == 'app' && cur.aid == ev.custom.aid) {
          cur.app.runCallback('onCallAccept', ev.custom.key);
        }
        push = 0;
        break;
      case 'notify_tt':
        push = 0;
        break;
    }

    if(ev.type === 'mail') {
      push = this.sendMailNotification(ev);
    }

    if (push & 1) {
      curNotifier.q_events.push(ev);
      if (curNotifier.q_events.length > 30) {
        curNotifier.q_events.splice(0, curNotifier.q_events.length - 30);
      }
      this.checkEvents();
    }
    return push;
  },

  isActive: function() {
    return window.curNotifier
    && curNotifier.idle_manager
    && !curNotifier.idle_manager.is_idle;
  },

  sendImProxy: function(data) {
    data.text = winToUtf(data.text);
    if(!curNotifier.browser_shown[data.id]) {
      curNotifier.browser_shown[data.id] = true;
      Notifier.trySendBrowserNotification(data, true);
      setTimeout(function() {
        curNotifier.browser_shown[data.id] = undefined;
      }, 2000);
    }
  },

  shouldShowNotification: function(ev) {
    return cur.module !== 'im' && !FastChat.isChatOpen(ev.author_id);
  },

  sendSimpleNotification: function(ev) {
    Notifier.playSound(ev);
    if (!Notifier.shouldShowNotification(ev)) {
      return 0;
    }
    return 1 | 2;
  },

  sendBrowserNotification: function(ev) {
    if(cur.module !== 'im') {
      Notifier.negotiate({
        message: 'send_im_notification',
        onSuccess: function(data) {
          Notifier.lcSend('negotiate_back', {
            token: data.msg,
            ev: ev
          });
        },
        onFail: function() {
          Notifier.showBrowserNotification(ev);
        }
      });
    } else {
      ev.onclick = 'IM.activateTab(' + ev.author_id + ');';
      Notifier.showBrowserNotification(ev);
    }
  },

  shouldPlaySound: function(ev) {
    return !ls.get('sound_notify_off')
      && cur.focused != ev.author_id
      && !inArray(ev.author_id, cur.mutedPeers);
  },

  playSound: function(ev) {
    if (curNotifier.sound_im && curNotifier.sound_im.play && Notifier.shouldPlaySound(ev)) {
      curNotifier.sound_im.play();
    }
  },

  trySendBrowserNotification: function(ev, onlyBrowser) {
    Notifier.negotiate({
      message: 'who_is_active',
      msg: ev.author_id,
      onFail: function() {
        if(Notifier.canNotifyUi() && cur.peer != ev.author_id) {
          Notifier.sendBrowserNotification(ev);
        } else if (!onlyBrowser) {
          Notifier.lcSend('show_notification', ev);
          if (Notifier.shouldShowNotification(ev)) {
            Notifier.showEvent(ev, true);
          }
          Notifier.playSound(ev);
        } else {
          Notifier.playSound(ev);
        }
      }
    });
  },

  showBrowserNotification: function(ev) {
    Notifier.showEventUi(ev);
    Notifier.playSound(ev);
  },

  proxyIm: function(ev) {
    if(this.isActive()) {
      this.playSound(ev);
      if (Notifier.canNotifyUi()
        && cur.peer != ev.author_id
        && Notifier.shouldPlaySound(ev)) {
          Notifier.showEventUi(ev);
          return;
      }
    }
    if(curNotifier.is_server) {
      ev.onclick = 'IM.activateTab(' + ev.author_id + ');';
      this.sendImProxy(ev);
    } else if(!curNotifier.is_server) {
      this.lcSend('message_from_im', ev);
    }
  },

  sendMailNotification: function(ev) {
    ev.onclick = 'FastChat.selectPeer(\'' + ev.author_id + '\');';
    if (this.isActive() && Notifier.canNotifyUi()) {
      this.playSound(ev);
      if (this.shouldPlaySound(ev) && cur.peer != ev.author_id) {
        this.showEventUi(ev);
      }
    } else if (this.isActive()) {
      return this.sendSimpleNotification(ev);
    } else if (curNotifier.is_server) {
      this.trySendBrowserNotification(ev);
    }
    return 0; // No notification if not active and not server
  },

  checkEvents: function () {
    if (!curNotifier.q_events.length ||
        curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max) ||
        !curNotifier.idle_manager.is_idle && curNotifier.frozen
    ) {
      return;
    }
    var ev = curNotifier.q_events.shift();
    this.showEvent(ev);
  },

  showEvent: function (ev, force) {
    curNotifier.q_shown.push(ev);
    var imgClass = '';
    if (ev.type == 'gift') {
      imgClass = ' notifier_image_gift';
    }
    var thumbEl = '';
    if (ev.type == 'video_process_ready') {
      thumbEl = '<div class="notifier_video_thumb" style="background-image: url(' + Notifier.fixPhoto(ev.author_photo) +')"></div>';
    } else {
      thumbEl = '<img src="' + Notifier.fixPhoto(ev.author_photo) + '" class="notifier_image" />';
    }
    ev.baloonWrapEl = ce('div', {
      className: 'notifier_baloon_wrap',
      innerHTML: '<div class="notifier_baloon clear_fix"><div class="notifier_baloon_head clear_fix"><div class="notifier_baloon_title fl_l">' + ev.title + '</div><div class="notifier_close_wrap fl_r"><a class="notifier_close" title="' + getLang('global_close') + '" href=""></a></div></div><div class="notifier_baloon_body"><table cellpadding="0" cellspacing="0" width="100%"><tr>' + (ev.author_photo && ('<td class="notifier_image_wrap"><div class="notifier_image_wrap">' + (ev.author_link && ('<a href="' + ev.author_link + '" onclick="return nav.go(this, event);">')) + thumbEl + (ev.author_link && '</a>') + '</div></td>')) + '<td class="notifier_baloon_msg"><div class="notifier_baloon_msg wrapped" style="width: ' + (300 - 60 * ((ev.author_photo && ev.add_photo) ? 2 : ((ev.add_photo || ev.author_photo) ? 1 : 0))) + 'px;">' + ev.text + '</div></td>' + (ev.add_photo && ('<td class="notifier_add_image_wrap"><div class="notifier_image_wrap'+imgClass+'"><img src="' + ev.add_photo + '" class="notifier_image" /></div></td>')) + '</tr></table></div></div>'
    });
    ev.baloonEl = ev.baloonWrapEl.firstChild;
    ev.closeEl = geByClass1('notifier_close_wrap', ev.baloonEl);
    addEvent(ev.closeEl, 'mouseover mouseout', function (e) {
      e = (e.originalEvent || e) || window.event;
      if ((e.target || e.srcElement) != ev.closeEl) {
        return;
      }
      if (e.type == 'mouseover') {
        addClass(ev.closeEl, 'notifier_close_over');
      } else {
        removeClass(ev.closeEl, 'notifier_close_over');
      }
    });

    addEvent(ev.baloonEl, 'mouseover mouseout', function (e) {
      ev.over = (e.type == 'mouseover');
      if (ev.over) {
        Notifier.freezeEvents();
        addClass(ev.baloonEl, 'notifier_baloon_over');
      } else {
        Notifier.unfreezeEvents();
        removeClass(ev.baloonEl, 'notifier_baloon_over');
      }
    });
    addEvent(ev.baloonEl, 'mousedown', function (e) {
      e = (e.originalEvent || e) || window.event;
      var btn = e.which, nohide = false;
      if (browser.msie) {
        btn = e.button == 1 ? 1 : (e.button == 2 ? 3 : 2)
      }
      if (btn == 1 && (e.ctrlKey || browser.mac && e.metaKey)) {
        btn = 2;
        if (browser.mac) nohide = true;
      }
      if ((e.target || e.srcElement).tagName == 'A') {
        switch (btn) {
          case 1: // left button
            // setTimeout(function () {Notifier.hideEvent(ev);}, 100);
            break;

          case 3: // right
            break;
        }
        return;
      }
      switch (btn) {
        case 1: //left button
          eval(ev.onclick);
          Notifier.hideEvent(ev);
          break;
        case 2: // middle
          var wnd = window.open(ev.link, '_blank');
          try {wnd.blur(); window.focus();} catch (e) {}
          if (!nohide) Notifier.hideEvent(ev); // else it will be  hidden by context menu
          break;
        case 3: // right
          if (browser.mozilla) {
            return;
          }
      }
      return cancelEvent(e);
    });
    addEvent(ev.baloonEl, 'contextmenu', function (e) {
      setTimeout(function () {
        Notifier.hideEvent(ev, false, false, true);
      }, 10);
      return cancelEvent(e);
    });
    addEvent(ev.closeEl, 'mousedown', function (e) {
      Notifier.hideEvent(ev, false, false, true);
      return cancelEvent(e);
    });
    ev.startFading = function () {
      ev.fading = animate(ev.baloonEl, {opacity: 0}, 1000, Notifier.hideEvent.bind(Notifier).pbind(ev, false));
      if (ev.over) {
        ev.fading.stop();
      }
    }
    curNotifier.cont.insertBefore(ev.baloonWrapEl, curNotifier.cont.firstChild);
    var h = ev.baloonWrapEl.offsetHeight;
    re(ev.baloonWrapEl);
    curNotifier.cont.appendChild(ev.baloonWrapEl);
    setStyle(curNotifier.cont, {bottom: -h});
    setStyle(ev.baloonWrapEl, {visibility: 'visible'});
    animate(curNotifier.cont, {bottom: 0}, 200);
    if (!curNotifier.idle_manager.is_idle || force) {
      ev.fadeTO = setTimeout(ev.startFading, 7000);
    }
  },

  canNotifyUi: function () {
    return !ls.get('im_ui_notify_off')
      && DesktopNotifications.supported()
      && DesktopNotifications.checkPermission() <= 0;
  },

  showEventUi: function (ev) {
    if (!this.canNotifyUi()) return false;
    var title, text;
    if(ev.type === 'mail') {
      var div = ce('div');
      div.innerHTML = ev.text;
      title = div.firstChild.textContent.trim();
      text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n"))
        .replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, '$1')
        .replace(/<img.*?alt="(.*?)".*?>/ig, '$1'))
        .replace(/&laquo;|&raquo;/gi, '"').trim();
    } else {
      title = ev.title;
      text = ev.text;
    }

    var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
    curNotifier.uiNotifications.push([notification, vkNow()]);
    notification.onclick = function (e) {
      window.focus();
      eval(ev.onclick);
      Notifier.hideEvent(ev);
    };
    notification.onclose = function () {
      Notifier.hideEvent(ev, true);
    };
    notification.show();
    ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5000);
    return true;
  },

  hideEvent: function (ev, already, broadcasted, forced) {
    clearTimeout(ev.closeTO);
    clearTimeout(ev.fadeTO);
    ev.fading && ev.fading.stop();
    var pos = indexOf(curNotifier.q_shown, ev), closedLen;
    if (pos != -1) {
      curNotifier.q_shown.splice(pos, 1);
    }
    Notifier.unfreezeEvents();
    if (!already) {
      if (ev.baloonWrapEl) {
        cleanElems(ev.closeEl, ev.baloonEl);
        re(ev.baloonWrapEl);
      } else if (ev.uiNotification) {
        ev.uiNotification.cancel();
      }
    }
    if (forced === true && isArray(curNotifier.q_closed)) {
      curNotifier.q_closed.unshift(vkNow());
      if ((closedLen = curNotifier.q_closed.length) > 3) {
        curNotifier.q_closed.splice(3, closedLen - 3);
        closedLen = 3;
      }
      if (closedLen == 3 && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700) {
        Notifier.hideAllEvents();
      }
    }
    if (forced != -1) {
      this.checkEvents();
    }
    if (curNotifier.transport == 'frame' && !broadcasted) {
      this.lcSend('hide', {event_id: ev.id});
    }
    if ((forced === true || !curNotifier.idle_manager.is_idle) && !curNotifier.q_events.length && !curNotifier.q_shown.length) {
      ajax.post('notifier.php', {act: 'a_clear_notifier'});
    }
  },
  hideAllEvents: function () {
    curNotifier.q_events = [];
    each (clone(curNotifier.q_shown), function () {
      Notifier.hideEvent(this, false, true, -1);
    });
    curNotifier.q_shown = [];
    curNotifier.q_closed = [];
  },
  onEventHide: function (event_id) {
    if (!event_id) return;
    each(curNotifier.q_shown, function () {
      if (this.id == event_id) {
        Notifier.hideEvent(this, false, true);
        return false;
      }
    });
    each(curNotifier.q_events, function (k) {
      if (this.id == event_id) {
        curNotifier.q_events.splice(k, 1);
        return false;
      }
    });
  },

  /* Fake localConnection methods (based on localStorage and onstorage events) */
  lcInit: function () {
    if (!curNotifier.post_message) {
      if (browser.msie && (intval(browser.version) < 9)) {
        // document.onstorage = this.lcOnStorage.bind(this);
        addEvent(document, 'storage', this.lcOnStorage.bind(this));
      } else {
        addEvent(window, 'storage', this.lcOnStorage.bind(this));
      }
      this.lcStart();
    } else { // localStorage through extra-iframe, because of vk document.domain problems
      addEvent(window, 'message', this.lcOnMessage.bind(this));
      var el = curNotifier.storage_el = ce('iframe', {
        id: 'queue_storage_frame',
        name: 'queue_storage_frame',
        src: '/notifier.php?act=storage_frame&from=' + location.host + (Notifier.debug ? '&debug=' + vkNow() : '&4') + '#' + curNotifier.connection_id
      });
      Notifier.getTransportWrap().appendChild(el);
      curNotifier.storage_frame = el.contentWindow;
      curNotifier.storage_frame_origin = location.protocol + '//' + locHost;
    }
  },
  lcStart: function () {
    if (Notifier.lcCheckServer()) {
      this.lcServer();
    } else {
      this.lcSend('check');
      clearTimeout(curNotifier.becomeServerTO);
      curNotifier.becomeServerTO = setTimeout(this.lcServer.bind(this).pbind(true), 500);
    }

    curNotifier.checkServerInt = setInterval(function () {
      if (curNotifier.is_server) return;
      if (vkNow() - curNotifier.last_succ > 8000 && Notifier.lcCheckServer()) {
        debugLog('timeout');
        this.lcServer(true);
      }
    }.bind(this), 1000 + intval(rand(-100, 100)));
    curNotifier.isServerBroadcastInt = setInterval(function () {
      if (!curNotifier.is_server) return;
      if (Notifier.lcCheckServer()) {
        this.lcSend('check_ok');
      } else {
        debugLog('no server from server broadcast');
        this.lcNoServer();
      }
    }.bind(this), 5000 + intval(rand(-100, 100)));
    curNotifier.playlistTimeInt = setInterval(function () {
      if (!curNotifier.is_server) return;
      var plData = ls.get('pad_pldata');
      // if (!plData)  {
      //   var aid = ls.get('audio_id');
      //   if (aid) ls.remove('audio_id');
      //   return;
      // }
      if (plData && plData.instance == curNotifier.instance_id) {
        ls.set('pad_pltime', vkNow());
      } else {
        this.lcSend('check_playlist');
      }
      var plTime = ls.get('pad_pltime') || 0;
      if (vkNow() - plTime > 3000 && !(window._pads && _pads.shown == 'mus')) {
        ls.remove('pad_pltime');
        ls.remove('pad_pldata');
        ls.remove('pad_playlist');
        ls.remove('pad_lastsong');
        ls.remove('audio_id');
      }
    }.bind(this), 1000 + intval(rand(-100, 100)));
    if (curNotifier.fc !== undefined) {
      stManager.add(['emoji.js'], function() {
        FastChat.init(curNotifier.fc);
      });
    }
  },
  lcStop: function () {
    clearInterval(curNotifier.isServerBroadcastInt);
    clearInterval(curNotifier.checkServerInt);
    clearTimeout(curNotifier.becomeServerTO);
  },
  lcSend: function (act, data) {
    if (!curNotifier.connection_id) {
      curNotifier.onConnectionId.push(Notifier.lcSend.pbind(act, data));
      return false;
    }
    Notifier.debug && debugLog(curNotifier.instance_id + ': sending', act, data || '');

    var sendObj = extend({__client: curNotifier.instance_id, __act: act, __rnd: Math.random()}, data || {});
    if (!curNotifier.post_message) {
      ls.set(curNotifier.connection_id, sendObj);
    } else {
      try {
        curNotifier.storage_frame.postMessage(curNotifier.connection_id + ':' + JSON.stringify(sendObj), curNotifier.storage_frame_origin);
      } catch (e) {debugLog(e, e.message, e.stack);}
    }
  },

  lcRecv: function (data) {
    if (isEmpty(data) || data.__client == curNotifier.instance_id) return;
    var act = data.__act;
    delete data.__client;
    delete data.__act;
    delete data.__rnd;

    Notifier.debug && debugLog(curNotifier.instance_id + ': recv', act, data);
    switch (act) {
      case 'new_server':
        curNotifier.last_succ = vkNow() + 1000; // extra 1 sec for iframe init
        break;

      case 'feed':
        curNotifier.timestamp = data.ts;
        curNotifier.key = data.key;
        Notifier.pushEvents(data.events, !data.full);
        break;

      case 'addfeed':
        Notifier.addFeed(data[0], data[1]);
        break;

      case 'new_key':
        debugLog('new key', data);
        curNotifier.timestamp = data.ts;
        curNotifier.key = data.key;
        break;

      case 'new_addkey':
        // debugLog('add key', data);
        var queue = data.queue || data.key, addq = curNotifier.addQueues[queue], to_reset = !addq && curNotifier.is_server;
        if (addq) {
          addq[0] = vkNow();
        } else {
          curNotifier.addQueues[queue] = [vkNow(), data.ts, data.key];
        }
        if (to_reset) {
          Notifier.lpReset();
        }
        break;

      case 'clear_addkeys':
        curNotifier.addQueues = {};
        break;

      case 'check_ok':
        curNotifier.last_succ = vkNow();
        if (curNotifier.becomeServerTO) {
          clearTimeout(curNotifier.becomeServerTO);
          curNotifier.becomeServerTO = false;
        }
        if (!curNotifier.lp_connected) {
          curNotifier.lp_connected = true;
          Notifier.onConnectionInit();
        }
        break;

      case 'focus':
        // debugLog('focus from lc');
        Notifier.onInstanceFocus(data.instance_id);
        break;

      case 'hide':
        // debugLog('hide from lc');
        Notifier.onEventHide(data.event_id);
        break;

      case 'check_playlist':
        var pl = ls.get('pad_playlist');
        if (pl && pl.instance == curNotifier.instance_id) {
          ls.set('pad_pltime', vkNow());
        }
        break;
      case 'who_is_active':
        if(Notifier.isActive()
          && ((intval(data.msg) > 2000000000 && cur.module === 'im')
          || intval(data.msg) < 2000000000)) {
            this.lcSend('negotiate_back', data);
        }
        break;

      case 'show_notification':
        if (Notifier.shouldShowNotification(data)) {
          Notifier.showEvent(data, true);
        }
        break;

      case 'send_im_notification':
        if (cur.module === 'im') {
          var slot = Notifier.createNegotiationSlot({
            onSuccess: function(data) {
              data.ev.onclick = 'IM.activateTab(' + data.ev.author_id + ');';
              Notifier.showBrowserNotification(data.ev);
            }
          });

          Notifier.lcSend('negotiate_back', {
            msg: slot.token,
            token: data.token
          });
        }
        break;

      case 'negotiate_back':
        Notifier.endNegotiation(data)
        break;

      default:
        if (curNotifier.recvClbks && curNotifier.recvClbks[act]) {
          for (var i in curNotifier.recvClbks[act]) curNotifier.recvClbks[act][i](data);
        } else {
          curNotifier.recvData[act] = data;
        }
        break;
    }
    if (!curNotifier.is_server) return;

    // acts, processed only while instance is server
    switch (act) {
      case 'new_server':
      case 'new_key':
      case 'check_ok':
        debugLog('no server from lcRecv', act);
        Notifier.lcNoServer();
        break;

      case 'check':
        this.lcSend('check_ok');
        break;

      case 'message_from_im':
        Notifier.sendImProxy(data);
        break;
    }
  },

  negotiate: function(opts) {
    opts = this.createNegotiationSlot(opts);
    this.lcSend(opts.message, {token: opts.token, msg: opts.msg});
  },

  createNegotiationSlot: function(opts) {
    var token = "negotiations_" + Date.now() + Math.round(rand(0, 10000));
    opts = extend({
      timeout: 600,
      token: token,
      msg: ''
    }, opts);
    curNotifier.negotiations[opts.token] = {};
    curNotifier.negotiations[opts.token].timer = setTimeout(function() {
      opts.onFail && opts.onFail();
      if (curNotifier.negotiations[opts.token]) {
        curNotifier.negotiations[opts.token] = undefined;
      }
    }, opts.timeout);
    curNotifier.negotiations[opts.token].success = opts.onSuccess;
    return opts;
  },

  endNegotiation: function(data) {
    var token = data.token;
    var negotiation = curNotifier.negotiations[token];
    if(negotiation) {
      clearTimeout(negotiation.timer);
      if(curNotifier.negotiations[token].success) {
        curNotifier.negotiations[token].success(data);
      }
      curNotifier.negotiations[token] = undefined;
    }
  },

  lcOnStorage: function (e) { // receiving messages from native onstorage event
    e = e || window.event;
    Notifier.debug && debugLog('onstorage', e.key, e.newValue, e);
    var key = e.key, val = e.newValue;
    if (!val) {
      return;
    }
    if (!key) {
      key = curNotifier.connection_id;
      val = localStorage.getItem(key);
      if (val == curNotifier.lc_prev_value) return;
      curNotifier.lc_prev_value = val;
    } else {
      if (e.key != curNotifier.connection_id) return;
    }
    this.lcRecv(JSON.parse(val) || {});
  },
  lcOnMessage: function (e) { // receiving messages from storage iframe via postMessage
    e = e || window.event;
    Notifier.debug && debugLog('onmessage', e.data, e.origin, e);
    if (e.origin && e.origin != curNotifier.storage_frame_origin) {
      // vk.id == 13033 && debugLog('wrong origin', e.origin);
      return;
    }
    if (typeof e.data != 'string' || e.data.indexOf('q_st')) return;
    var msg = e.data.substr(4), pos, key;
    if (msg == 'ready') {
      curNotifier.storage_frame = e.source;
      this.lcStart();
    } else {
      if ((pos = msg.indexOf(':')) == -1 || (key = msg.substr(0, pos)) != curNotifier.connection_id || !msg.substr(pos + 1)) return;
      this.lcRecv(JSON.parse(msg.substr(pos + 1)));
    }
  },
  lcServer: function (changed) {
    debugLog('becoming server');
    this.lpInit();
    this.lcSend('new_server');
    Notifier.lcCheckServer(true);
    curNotifier.is_server = true;
    Notifier.onInstanceServer(1);
    if (!curNotifier.lp_connected) {
      curNotifier.lp_connected = true;
      Notifier.onConnectionInit();
    }
    if (window.curFastChat && curFastChat.inited) {
      FastChat.becameServer();
    }
    this.lpStop();
    if (!changed) {
      this.lpStart();
    } else {
      this.lpReset(this.lpStart.bind(this));
    }
  },
  lcNoServer: function () {
    this.lpStop();
    if (!curNotifier.is_server) {
      return;
    }
    debugLog('not server now');
    this.onInstanceServer(0);
    curNotifier.is_server = false;
  },
  lcCheckServer: function (nocheck) {
    var key = 'server_' + curNotifier.connection_id,
        prev, ts = vkNow();

    if (!nocheck && isArray(prev = ls.get(key)) && prev[0] != curNotifier.instance_id && ts - prev[1] < 8000) {
      return false;
    }
    ls.set(key, [curNotifier.instance_id, ts]);
    return true;
  },

  /* Long-poll methods */
  lpInit: function () {
    if (curNotifier.lpMakeRequest) return;
    delete curNotifier.lpMakeRequest;
    re('queue_transport_frame');
    Notifier.getTransportWrap().appendChild(
      ce('iframe', {
        id: 'queue_transport_frame',
        name: 'queue_transport_frame',
        src: curNotifier.frame_path
      })
    );
  },
  lpStart: function () {
    curNotifier.lp_started = true;
    Notifier.lpCheck();
  },
  lpStop: function () {
    curNotifier.lp_started = false;
    clearTimeout(curNotifier.lp_check_to);
    clearTimeout(curNotifier.lp_error_to);
    clearTimeout(curNotifier.lp_req_check_to);
  },
  lpCheck: function () {
    if (!curNotifier.lp_started || curNotifier.lpActive || curNotifier.lpInvalid) return;
    if (!curNotifier.lpMakeRequest) {
      clearTimeout(curNotifier.lp_check_to);
      curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1000);
      return;
    }
    if (!Notifier.lcCheckServer()) {
      debugLog('no server from check');
      this.lcNoServer();
      return;
    }

    var now = vkNow(),
        add_queues = [],
        completed = false,
        params = {
      act: 'a_check',
      ts: curNotifier.timestamp,
      key: curNotifier.key,
      id: curNotifier.uid,
      wait: 25
    };

    each (curNotifier.addQueues, function (queue, data) {
      if (now - data[0] > 30000 && !queue.match(/nccts/)) {
        // old queue
        debugLog('drop key', queue, now - data[0]);
        delete curNotifier.addQueues[queue];
        return;
      }
      add_queues.push(queue);
      params.ts += '_' + data[1];
      params.key += data[2];
    });

    var onFail = function (msg) {
      if (completed) return;
      completed = true;
      curNotifier.lpActive = false;
      clearTimeout(curNotifier.lp_req_check_to);
      // topError('Notify error: ' + msg);

      curNotifier.error_timeout = curNotifier.error_timeout || 1;
      clearTimeout(curNotifier.lp_error_to);
      curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000 + irand(1000, 10000));
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
    }.bind(this);

    // debugLog('query', params.ts, params.key);
    curNotifier.lpActive = true;
    clearTimeout(curNotifier.lp_req_check_to);
    curNotifier.lp_req_check_to = setTimeout(onFail, (params.wait + 5) * 1000);
    curNotifier.lpMakeRequest(curNotifier.frame_url, params, function (text) {
      if (completed) return;
      completed = true;
      curNotifier.lpActive = false;
      if (!curNotifier.lp_started) return;
      this.lcSend('check_ok');
      try {
        var response = eval('(' + text + ')'), main_response = response, add_response, add_queue, busy = 0;
        // debugLog('response', clone(response), clone(add_queues));
        if (isArray(response)) {
          main_response = response.shift();
          while (add_response = response.shift()) {
            add_queue = add_queues.shift();
            if (!add_queue) break;
            if (add_response.failed == 2 && add_response.err == 4) {
              debugLog('!!notifier key busy!! ' + curNotifier.instance_id);
              busy |= 1;
              continue;
            }
            this.lcSend('addfeed', [add_queue, add_response]);
            this.addFeed(add_queue, add_response);
            if (add_response.failed) {
              delete curNotifier.addQueues[add_queue];
            }
          }
        } else if (response.failed) {
          while (add_queue = add_queues.shift()) {
            this.lcSend('addfeed', [add_queue, response]);
            this.addFeed(add_queue, response);
            delete curNotifier.addQueues[add_queue];
          }
          this.lcSend('clear_addkeys');
        }
        switch (this.lpChecked(main_response)) {
          case 0: break; // ok

          case 1:
            // topError('Notifier key real error', {dt: -1, type: 5, answer: text + '\n\nbusy:' + busy + '\nserver:' + curNotifier.is_server + '\ninstance:' + curNotifier.instance_id, url: curNotifier.frame_url, query: params && ajx2q(params)});
            return;

          case 2:
            busy |= 2; break;

          default: return;
        }
        if (!busy) {
          this.lpCheck();
          curNotifier.error_timeout = Math.max(1, (curNotifier.error_timeout || 1) / 1.5);
        } else {
          // topError('Notifier key busy', {dt: -1, type: 5, answer: text + '\n\nbusy:' + busy + '\nserver:' + curNotifier.is_server + '\ninstance:' + curNotifier.instance_id, url: curNotifier.frame_url, query: params && ajx2q(params)});
          this.lcNoServer();
        }
      } catch (e) {
        if (text && text.indexOf('Ad Muncher') == -1) {
          topError('Notifier error: ' + e.message, {dt: -1, type: 5, stack: e.stack, answer: text + '\n\nbusy:' + busy + '\nserver:' + curNotifier.is_server + '\ninstance:' + curNotifier.instance_id, url: curNotifier.frame_url, query: params && ajx2q(params)});
          debugLog(e.message, e.stack, e);
        }

        curNotifier.error_timeout = curNotifier.error_timeout || 1;
        clearTimeout(curNotifier.lp_error_to);
        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
      }
    }.bind(this), onFail);
  },
  lpChecked: function(response) {
    // debugLog('response', response);
    var failed = response.failed;
    if (failed == 2) {
      if (response.err == 4) {
        return 2;
      }
      curNotifier.lpInvalid = true;
      clearTimeout(curNotifier.lp_error_to);
      curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
      return (response.err == 1) ? 1 : 3;
    } else if (failed) {
      throw getLang('global_unknown_error');
    }
    this.lcSend('feed', extend({full: curNotifier.idle_manager && curNotifier.idle_manager.is_idle && !this.canNotifyUi(), key: curNotifier.key}, response));

    curNotifier.timestamp = response.ts;
    Notifier.pushEvents(response.events);
    return 0;
  },
  lpOnReset: function () {
    curNotifier.lpOnReset && curNotifier.lpOnReset();
  },
  lpReset: function (cb) {
    if (cb) {
      curNotifier.lpOnReset = cb;
    }
    clearTimeout(curNotifier.resetTO);
    curNotifier.resetTO = setTimeout(function () {
      if (curNotifier.is_server && !curNotifier.lp_started) {
        Notifier.lpStart();
        return
      }
      if (curNotifier.lpMakeRequest && !curNotifier.lpInvalid) {
        var key = curNotifier.key, ts = curNotifier.timestamp;
        each (curNotifier.addQueues, function (queue, data) {
          key += data[2];
          ts += '_' + data[1];
        });
        curNotifier.lpMakeRequest(curNotifier.frame_url, {
          act: 'a_release',
          key: key,
          ts: ts,
          id: curNotifier.uid,
          wait: 25
        }, Notifier.lpOnReset, Notifier.lpOnReset);
      } else {
        ajax.post('notifier.php?act=a_reset', false, {
          onDone: Notifier.lpOnReset,
          onFail: function () {Notifier.lpOnReset(); return true;}
        });
      }
    }, 100);
  },
  lpGetKey: function () {
    var stNow = vkNow();
    ajax.post('notifier.php?act=a_get_key', {id: curNotifier.uid}, {
      onDone: function (key, ts) {
        curNotifier.timestamp = ts;
        curNotifier.key = key;
        curNotifier.lpInvalid = false;
        this.lcSend('new_key', {ts: ts, key: key});
        this.lpCheck();
      }.bind(this),
      onFail: function (code) {
        switch (code) {
          case 1: // non auth
          case 3: // disabled
            Notifier.standby();
            return;
            break

          case 4: // dynamic IP address
            Notifier.standby(300);
            return;
            break;

          case 2: // wrong auth
            Notifier.onRelogin();
            return;
            break
        }
        curNotifier.error_timeout = 64;
        clearTimeout(this.lp_error_to);
        this.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
        // if (curNotifier.error_timeout < 64) {
        //   curNotifier.error_timeout *= 2;
        // }
        return true;
      }.bind(this)
    });
  },

  addKey: function (data, cb, local) {
    if (curNotifier.flash_transport || !data) {
      return false;
    }
    var queue = (data && data.queue) ? data.queue : data.key;
    var addq = curNotifier.addQueues[queue];
    var to_reset = !addq && curNotifier.is_server;
    if (addq) {
      addq[0] = vkNow();
      addq[3] = cb;
      addq[4] = local;
    } else {
      curNotifier.addQueues[queue] = [vkNow(), data.ts, data.key, cb, local];
    }
    if (!local) {
      Notifier.lcSend('new_addkey', data);
    }
    if (to_reset) {
      Notifier.lpReset();
    }
    return true;
  },
  addFeed: function (queue, data) {
    var addq = curNotifier.addQueues[queue];
    if (!isArray(addq) || !addq.length) return;

    addq[1] = data.ts;
    if (isFunction(addq[3])) {
      addq[3](queue, data);
    }
  },
  addRecvClbk: function(act, type, clbk, force) {
    if (!curNotifier.recvClbks) curNotifier.recvClbks = {};
    if (!curNotifier.recvClbks[act]) curNotifier.recvClbks[act] = {};
    if (!curNotifier.recvClbks[act][type] || force) {
      curNotifier.recvClbks[act][type] = clbk;
    }
  },
  setRecvClbk: function(act, clbk) {
    if (!curNotifier.recvClbks) curNotifier.recvClbks = {};
    curNotifier.recvClbks[act] = [clbk];
  },

  fixPhoto: function (src, smaller) {
    src = clean(src);
    if (src.indexOf('question_c.gif') == -1) {
      return src;
    }
    return smaller ? '/images/question_inv_xc.png' : '/images/question_inv_c.png';
  }
}

function Sound(filename, opts) {
  var audioObjSupport = false, audioTagSupport = false, self = this, ext;
  if (!filename) throw 'Undefined filename';
  opts = opts || {};

  try {
    var audioObj = ce('audio');
    audioObjSupport = !!(audioObj.canPlayType);

    if (('no' != audioObj.canPlayType('audio/mpeg')) && ('' != audioObj.canPlayType('audio/mpeg')))
      ext = '.mp3?1';
    else if (('no' != audioObj.canPlayType('audio/ogg; codecs="vorbis"')) && ('' != audioObj.canPlayType('audio/ogg; codecs="vorbis"')) && !opts.forceMp3)
      ext = '.ogg?1';
    else
      audioObjSupport = false;
  } catch (e) {}
  // audioObjSupport = false;

  var src = opts.forcePath || '/' + filename + ext;
  if (audioObjSupport) {
    audioObj.src = src;
    var ended = false;
    audioObj.addEventListener('ended', function(){ended = true;}, true);
    audioObj.load();
    this.playSound = function() {
      if (ended) {
        audioObj.load();
      }
      audioObj.play();
      ended = false;
    };
    this.pauseSound = function() {
      audioObj.pause();
    };
  } else {
    cur.__sound_guid = cur.__sound_guid || 0;
    var wrap = ge('flash_sounds_wrap') || utilsNode.appendChild(ce('span', {id: 'flash_sounds_wrap'})),
        guid = 'flash_sound_' + (cur.__sound_guid++);

    var opts = {
      url: '/swf/audio_lite.swf?4',
      id: guid
    }
    var params = {
      swliveconnect: 'true',
      allowscriptaccess: 'always',
      wmode: 'opaque'
    }
    if (renderFlash(wrap, opts, params, {})) {
      var swfObj = browser.msie ? window[guid] : document[guid],
          inited = false,
          checkLoadInt = setInterval(function () {
        if (swfObj && swfObj.paused) {
          try {
            swfObj.setVolume(1);
            swfObj.loadAudio(src);
            swfObj.pauseAudio();
          } catch (e) {debugLog(e);}
        }
        inited = true;
        clearInterval(checkLoadInt);
      }, 300);
      self.playSound = function() {
        if (!inited) return;
        swfObj.playAudio(0);
      };
      self.pauseSound = function() {
        if (!inited) return;
        swfObj.pauseAudio();
      };
    }
  }
}
Sound.prototype = {
  play: function() {
    try {this.playSound();} catch(e){}
  },
  pause: function() {
    try {this.pauseSound();} catch(e){}
  }
};


function getWndInner() {
  var w = lastWindowWidth, h = lastWindowHeight, sb = sbWidth();
  if (lastWndScroll[0] !== false ? lastWndScroll[0] :
      (browser.msie6 ? pageNode.scrollHeight > pageNode.clientHeight : !browser.msie6 && htmlNode.scrollHeight > htmlNode.clientHeight)) {
    w -= sb + (sb ? 1 : 0);
  }
  return [h, w];
}

window.lastWndScroll = [false, false];
function updateWndVScroll() {
  var w = window, wndInner = getWndInner(), vScroll = false;
  if (w.boxLayerWrap && isVisible(boxLayerWrap)) {
    vScroll = (boxLayerWrap.scrollHeight > boxLayerWrap.clientHeight) ? 1 : 0;
  } else if (w.layerWrap && isVisible(layerWrap)) {
    vScroll = (layerWrap.scrollHeight > layerWrap.clientHeight) ? 1 : 0;
  } else if (w.mvLayerWrap && isVisible(mvLayerWrap)) {
    vScroll = (mvLayerWrap.scrollHeight > mvLayerWrap.clientHeight) ? 1 : 0;
  } else {
    vScroll = false;
  }
  each (curRBox.tabs, function (id) {
    if (this.options.marginFixedToLayer) {
      setStyle(this.wrap, {marginRight: hasClass(document.body, 'layers_shown') ? sbWidth() + 1 : 0})
    }
  });
  if (vScroll === lastWndScroll[0]) {
    return;
  }
  lastWndScroll[0] = vScroll;

  each (curRBox.tabs, function (id) {
    if (this.toRight && !this.options.marginFixedToLayer) {
      setStyle(this.wrap, {marginRight: vScroll ? sbWidth() + 1 : 0});
    }
  });
}

function defBox(options, callback) {
  var boxC = '<div class="'+(options.subClass || '')+'"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>';

  if (options.content) {
    var cont = '<div class="fc_content_wrap"><div class="fc_content">'+options.content+'</div></div>';
  } else {
    var cont = options.innerHTML;
  }
  var wrap = se(rs(boxC, {
    title: options.title,
    content: cont
  }));
  var cont = geByClass1('fc_content', wrap, 'div');
  var opts = {
    movable: geByClass1('fc_tab_head', wrap),
    hider: geByClass1('fc_tab_close_wrap', wrap, 'a'),
    startLeft: options.x,
    startTop: options.y,
    startHeight: options.height,
    startWidth: options.width,
    resizeableH: cont,
    resize: false,
    minH: options.minH,
    onBeforeHide: options.onBeforeHide || function() {},
    onHide: options.onHide || function () {},
    onDragEnd: function (y, x) {},
    onResize: function (h, w) {}
  },
  box = new RBox(wrap, extend(opts, options));

  if (options.content) {
    var scroll = new Scrollbar(cont, {
      prefix: 'fc_',
      more: debugLog,
      nomargin: true,
      global: true,
      nokeys: true,
      right: vk.rtl ? 'auto' : 1,
      left: !vk.rtl ? 'auto' : 1,
      onHold: options.onHold
    });
  }

  callback({
    id: box.id,
    cont: cont,
    update: function() {
      scroll && scroll.update();
    }
  });
  return box;
}

if (!window.curRBox) {
  curRBox = {
    guid: 0,
    active: false,
    focused: [],
    tabs: {}
  };
}
function RBox(content, options) {
  var t = this, defaultOptions = {
    minH: 50,
    minW: 50
  };
  t.options = options = extend(defaultOptions, options);
  t.content = content;
  var id = t.id = 'rb_box_' + (options.id || curRBox.guid++);

  t.wrap = ce('div', {id: id, className: 'rb_box_wrap fixed'+(options.fixed ? ' fc_fixed' : '')});
  var pos = {};
  t.toBottom = t.toRight = false;
  if (options.fixed) {
    pos.bottom = 0;
    pos.right = 68;
  } else {
    if (options.startTop !== undefined) {
      pos.top = options.startTop;
    } else if (options.startBottom !== undefined) {
      pos.bottom = options.startBottom;
    }
    if (options.startLeft !== undefined) {
      pos.left = options.startLeft;
    } else if (options.startRight !== undefined) {
      pos.right = options.startRight;
    }
  }
  setStyle(t.wrap, pos);

  if (options.movable) {
    addEvent(options.movable, 'mousedown', t._head_mdown.bind(t));
  }
  t.resizeableH = options.resizeableH || content;
  if (options.startHeight) {
    setStyle(t.resizeableH, 'height', options.startHeight);
  }
  t.resizeableW = options.resizeableW || content;
  if (options.startWidth) {
    setStyle(t.resizeableW, 'width', options.startWidth);
  }
  addEvent(content, 'mousedown', t._cont_mdown.bind(t));
  if (options.closer) {
    addEvent(options.closer, 'mousedown', t._close_mdown.bind(t));
    addEvent(options.closer, 'click', t._close_click.bind(t));
  }
  if (options.hider) {
    addEvent(options.hider, 'mousedown', t._close_mdown.bind(t));
    addEvent(options.hider, 'click', t._hide_click.bind(t));
  }
  if (options.minimizer && options.minimizer !== true) {
    addEvent(options.minimizer, 'mousedown', t._close_mdown.bind(t));
    addEvent(options.minimizer, 'click', t._min_toggle.bind(t));
  }

  t.wrap.appendChild(content);

  if (options.resize !== false) {
    t.resizeWrap = ce('div', {className: 'rb_resize_wrap', innerHTML: '<div class="chats_sp rb_resize"></div>'});
    t.wrap.appendChild(t.resizeWrap);
    addEvent(t.resizeWrap, 'mousedown', t._resize_mdown.bind(t));
  }
  if (options.minimized) {
    addClass(t.wrap, 'rb_minimized');
    t.minimized = true;
  }
  bodyNode.insertBefore(t.wrap, ge('page_wrap'));

  var st = getStyle(t.wrap, 'top'),
      sb = getStyle(t.wrap, 'bottom'),
      sl = getStyle(t.wrap, 'left'),
      sr = getStyle(t.wrap, 'right');
  this.toBottom = (st === 'auto' || st === '' || browser.msie && st === 0) && sb != 'auto' && sb !== '' && !(browser.msie && sb === 0);
  this.toRight = (sl === 'auto' || sl === '' || browser.msie && sl === 0) && sr != 'auto' && sr !== '' && !(browser.msie && sr === 0);

  if (this.toRight) {
    setStyle(t.wrap, {marginRight: lastWndScroll[0] ? sbWidth() + 1 : 0});
  }
  if (options.nofocus || options.noshow) {
    addClass(t.wrap, 'rb_inactive');
  }
  if (this.toBottom) {
    setStyle(t.wrap, {marginRight: lastWndScroll[0] ? sbWidth() + 1 : 0});
    addClass(t.wrap, 'fc_tobottom');
  }
  if (this.options.marginFixedToLayer) {
    setStyle(t.wrap, {marginRight: hasClass(document.body, 'layers_shown') ? sbWidth() + 1 : 0});
  }

  // console.log(['s', st,st === '0',st === 0, sb, sl,sl==='0',sl===0, sr, this.toBottom, this.toRight]);
  curRBox.tabs[id] = t;
  t.pos = false;
  if (!options.noshow) {
    t.show(false, options.nofocus);
  } else {
    setStyle(t.wrap, {visibility: 'hidden', display: 'block'});
    t._update_pos();
    setStyle(t.wrap, {visibility: '', display: ''});
  }
};
extend(RBox.prototype, {
  show: function (ts, nofocus) {
    var t = this;
    if (ts === undefined) ts = 0;
    if (ts) {
      setStyle(t.wrap, {opacity: 0, display: 'block'});
      t.visible = true;
      !nofocus && t.focus();
      animate(t.wrap, {opacity: 1}, ts, function () {
        setStyle(t.wrap, browser.msie ? {filter: 'none'} : {opacity: ''});
        t._update_pos();
      });
    } else {
      show(t.wrap);
      t.visible = true;
      !nofocus && t.focus();
      t._update_pos();
    }
    if (t.options.onShow) {
      t.options.onShow();
    }
  },
  hide: function (ts, nofire, hideOpts) {
    var t = this;
    if (!nofire && t.options.onBeforeHide && t.options.onBeforeHide()) {
      return true;
    }
    if (ts === undefined) ts = 0;
    if (ts) {
      setStyle(t.wrap, {opacity: 1, display: 'block'});
      animate(t.wrap, {opacity: 0}, ts, function () {
        hide(t.wrap);
        setStyle(t.wrap, browser.msie ? {filter: 'none'} : {opacity: ''});
      });
    } else {
      hide(t.wrap);
    }
    t.visible = false;
    if (!nofire && t.options.onHide) t.options.onHide(hideOpts || {});
  },
  _head_mdown: function (e) {
    if (checkEvent(e)) return;
    (e.originalEvent || e).cancelBubble = true;

    var t = this, handler = e.target,
        wndInner = getWndInner(),
        focused = curRBox.active == t.id,
        startY = e.pageY,
        startX = e.pageX,
        wrapH = t.wrap.offsetHeight,
        wrapW = t.wrap.offsetWidth,
        startTop, startLeft, lastTop = 0, lastLeft = 0,
        maxTop = wndInner[0] - wrapH,
        maxLeft = wndInner[1] - wrapW,
        selectEvent = browser.msie ? 'selectstart' : 'mousedown';

    if (t.options.fixed) {
      FastChat.pinTab(t.options.peer, e, true);
    }
    if (!focused) {
      t.focus(e);
    }

    if (t.toBottom) {
      t.toBottom = false;
      startTop = wndInner[0] - intval(getStyle(t.wrap, 'bottom')) - wrapH;
      setStyle(t.wrap, {top: startTop, bottom: 'auto'});
      removeClass(t.wrap, 'fc_tobottom');
    } else startTop = intval(getStyle(t.wrap, 'top'));
    if (t.toRight) {
      t.toRight = false;
      // console.log(['to r',startLeft, getStyle(t.wrap, 'right'), intval(getStyle(t.wrap, 'right')), wrapW]);
      startLeft = wndInner[1] - intval(getStyle(t.wrap, 'right')) - wrapW;
      setStyle(t.wrap, {left: startLeft, right: 'auto'});
    } else startLeft = intval(getStyle(t.wrap, 'left'));

    lastTop = startTop;
    lastLeft = startLeft;

    cur._fcdrag = 1;
    var _temp = function (e) {
      lastTop = Math.max(0, Math.min(maxTop, startTop + e.pageY - startY));
      if (maxTop - lastTop < 10) lastTop = maxTop;
      else if (lastTop < 10) lastTop = 0;
      t.wrap.style.top = lastTop + 'px';

      lastLeft = Math.max(0, Math.min(maxLeft, startLeft + e.pageX - startX));
      if (maxLeft - lastLeft < 10) lastLeft = maxLeft;
      else if (lastLeft < 10) lastLeft = 0;
      t.wrap.style.left = lastLeft + 'px';
      return cancelEvent(e);
    }, _temp2 = function (e) {
      cur._fcdrag = 0;
      removeEvent(document, 'mousemove', _temp);
      removeEvent(document, 'mouseup', _temp2);
      removeEvent(document, selectEvent, cancelEvent);
      setStyle(bodyNode, 'cursor', '');
      setStyle(handler, 'cursor', '');
      if (t.toBottom = (lastTop >= maxTop - 5)) {
        setStyle(t.wrap, {top: 'auto', bottom: 0});
        addClass(t.wrap, 'fc_tobottom');
      }
      if (t.toRight = (lastLeft >= maxLeft - 5)) {
        setStyle(t.wrap, {left: 'auto', right: 0, marginRight: lastWndScroll[0] ? sbWidth() + 1 : 0});
      }
      t._update_pos();
      var dlittle = Math.abs(e.pageY - startY) < 3 && Math.abs(e.pageX - startX) < 3;
      if (cur._fcpromo > 0) {
        cur._fcpromo = dlittle ? 0 : -1;
      } else if (t.options.minimizer && dlittle) {
        if (!t.minimized && focused) {
          t.minimize(true);
        } else if (t.minimized) {
          t.unminimize(true);
        }
      } else {
        t.options.onDragEnd && t.options.onDragEnd(t.toBottom ? -1 : lastTop / wndInner[0], t.toRight ? -1 : lastLeft / wndInner[1]);
      }
    };

    addEvent(document, 'mousemove', _temp);
    addEvent(document, 'mouseup', _temp2);
    addEvent(document, selectEvent, cancelEvent);
    setStyle(bodyNode, 'cursor', 'move');
    setStyle(handler, 'cursor', 'move');
    return false;
  },
  _resize_mdown: function (e) {
    if (checkEvent(e)) return;
    this.focus(e);

    var t = this, handler = e.target,
        wndInner = getWndInner(),
        startY = e.pageY,
        startX = e.pageX,
        wrapH = t.wrap.offsetHeight,
        wrapW = t.wrap.offsetWidth,
        startTop, startLeft, lastH = 0, lastW = 0,
        startH = t.resizeableH.clientHeight - intval(getStyle(t.resizeableH, 'paddingBottom')) - intval(getStyle(t.resizeableH, 'paddingTop')),
        startW = t.resizeableW.clientWidth - intval(getStyle(t.resizeableW, 'paddingRight')) - intval(getStyle(t.resizeableW, 'paddingLeft')),
        selectEvent = browser.msie ? 'selectstart' : 'mousedown',
        onresize = !browser.msie && t.options.onResize || false;

    if (t.toBottom) {
      t.toBottom = false;
      startTop = wndInner[0] - intval(getStyle(t.wrap, 'bottom')) - wrapH;
      setStyle(t.wrap, {top: startTop, bottom: 'auto'});
      removeClass(t.wrap, 'fc_tobottom');
    } else startTop = intval(getStyle(t.wrap, 'top'));
    if (t.toRight) {
      t.toRight = false;
      startLeft = wndInner[1] - intval(getStyle(t.wrap, 'right')) - wrapW;
      setStyle(t.wrap, {left: startLeft, right: 'auto'});
    } else startLeft = intval(getStyle(t.wrap, 'left'));

    t.options.onResizeStart && t.options.onResizeStart(startH, startW);

    var maxH = startH + wndInner[0] - startTop - wrapH,
        maxW = startW + wndInner[1] - startLeft - wrapW;

    var _temp = function (e) {
      lastH = Math.max(t.options.minH, Math.min(maxH, startH + e.pageY - startY));
      if (maxH - lastH < 10) lastH = maxH;
      t.resizeableH.style.height = lastH + 'px';

      lastW = Math.max(t.options.minW, Math.min(maxW, startW + e.pageX - startX));
      if (maxW - lastW < 10) lastW = maxW;
      t.resizeableW.style.width = lastW + 'px';
      onresize && onresize(lastH, lastW)

      return cancelEvent(e);
    }, _temp2 = function (e) {
      removeEvent(document, 'mousemove', _temp);
      removeEvent(document, 'mouseup', _temp2);
      removeEvent(document, selectEvent, cancelEvent);
      setStyle(bodyNode, 'cursor', '');
      setStyle(handler, 'cursor', '');
      if (t.toBottom = (lastH == maxH)) {
        setStyle(t.wrap, {top: 'auto', bottom: 0});
        addClass(t.wrap, 'fc_tobottom');
      }
      if (t.toRight = (lastW == maxW)) {
        setStyle(t.wrap, {left: 'auto', right: 0, marginRight: lastWndScroll[0] ? sbWidth() + 1 : 0});
      }
      t._update_pos();
      t.options.onResizeEnd && t.options.onResizeEnd(lastH, lastW, wndInner[0], wndInner[1], t.toBottom, t.toRight);
    };

    addEvent(document, 'mousemove', _temp);
    addEvent(document, 'mouseup', _temp2);
    addEvent(document, selectEvent, cancelEvent);
    setStyle(bodyNode, 'cursor', 'move');
    setStyle(handler, 'cursor', 'move');
    return false;
  },
  _update_pos: function() {
    var t = this, wrap = t.wrap
    t.pos = [t.wrap.offsetTop, t.wrap.offsetLeft, t.wrap.offsetHeight, t.wrap.offsetWidth];
  },
  _wnd_resize: function (wndH, wndW, check) {
    var t = this;
    if (t.toBottom) {
      t.pos[0] = t.wrap.offsetTop;
    }
    if (t.toRight) {
      t.pos[1] = t.wrap.offsetLeft;
    }
    var s = {}, sh = false, sw = false,
        needH = t.pos[0] + t.pos[2] - wndH,
        diffT = t.pos[0],
        // diffH = t.options.resize !== false ? t.resizeableH.clientHeight - t.options.minH : 0,
        diffH = t.resizeableH.clientHeight - t.options.minH,
        needW = t.pos[1] + t.pos[3] - wndW,
        diffL = t.pos[1],
        diffW = t.options.resize !== false ? t.resizeableW.clientWidth - t.options.minW : 0;

    if (check) {
      if (diffW < 0) {
        setStyle(t.resizeableW, t.options.minW);
      }
      if (diffH < 0) {
        setStyle(t.resizeableH, t.options.minH);
      }
    }

    if ((needH <= 0 || diffT <= 0  && diffH <= 0) &&
        (needW <= 0 || diffL <= 0  && diffW <= 0)) return;

    if (needH > 0 && diffT > 0) {
      diffT = Math.min(needH, diffT);
      needH -= diffT;
      s.top = t.pos[0] - diffT;
      s.bottom = '';
    }
    if (needH > 0 && diffH > 0) {
      diffH = Math.min(needH, diffH);
      sh = t.resizeableH.clientHeight - diffH;
    }
    if (needW > 0 && diffL > 0) {
      diffL = Math.min(needW, diffL);
      needW -= diffL;
      s.left = t.pos[1] - diffL;
      s.right = '';
    }
    if (needW > 0 && diffW > 0) {
      diffW = Math.min(needW, diffW);
      sw = t.resizeableW.clientWidth - diffW;
    }
    if (sw !== false) {
      setStyle(t.resizeableW, 'width', sw);
    }
    if (sh !== false) {
      setStyle(t.resizeableH, 'height', sh);
    }
    setStyle(t.wrap, s);
    t._update_pos();
    t.options.onResize && t.options.onResize(t.resizeableH.clientHeight, t.resizeableW.clientWidth);
  },
  _cont_mdown: function (e) {
    var stop = (curRBox.active != this.id);
    if (stop) {
      this.focus(e);
      if (!hasClass(e.target, 'fc_editable')) {
        return cancelEvent(e);
      }
    }
  },

  _focus: function () {
    var t = this, pos = indexOf(curRBox.focused, t.id), prev = curRBox.active, prevBox = prev && curRBox.tabs[prev];
    if (prev == t.id) {
      return;
    }
    if (prevBox && isFunction(prevBox.options.onBlur)) {
      prevBox.options.onBlur();
    }
    if (pos != -1) {
      curRBox.focused.splice(pos, 1);
    }
    curRBox.focused.unshift(t.id);

    var zIndex = BASIC_CHAT_ZINDEX + curRBox.focused.length, first = true;
    each(curRBox.focused, function (k, id) {
      var wrap = curRBox.tabs[id].wrap;
      if (first) {
        addClass(wrap, 'rb_active');
        removeClass(wrap, 'rb_inactive');
        curRBox.active = id;
        first = false;
      } else {
        removeClass(wrap, 'rb_active');
        addClass(wrap, 'rb_inactive');
      }
      setStyle(wrap, 'zIndex', zIndex);
      zIndex--;
    });
  },
  _hide_click: function () {
    this.hide();
  },
  minimize: function (fire) {
    var t = this, wrap = t.wrap;
    if (t.options.fixed) {
      return false;
    }
    addClass(wrap, 'rb_minimized');
    t.minimized = true;
    t._update_pos();
    if (fire && t.options.onMinimize) {
      t.options.onMinimize(0);
    }
  },
  unminimize: function (fire) {
    var t = this, wrap = t.wrap, wndInner = getWndInner();
    removeClass(wrap, 'rb_minimized');
    t.minimized = false;
    t._update_pos();
    t._wnd_resize(wndInner[0], wndInner[1], true);
    curRBox.active = false;
    t.focus();
    if (fire && t.options.onMinimize) {
      t.options.onMinimize(1);
    }
  },
  _min_toggle: function (e) {
    var t = this;
    setTimeout(function () {
      if (!t.minimized) {
        t.minimize(true);
      } else {
        t.unminimize(true);
      }
    }, 50);
  },
  destroy: function () {
    var t = this,
        pos = indexOf(curRBox.focused, t.id);
    if (pos != -1) {
      curRBox.focused.splice(pos, 1);
    }
    cleanElems(t.wrap, t.resizeWrap, t.content, t.options.movable, t.options.closer, t.options.hider);
    re(t.wrap);
    delete curRBox.tabs[t.id];
    delete t;
  },
  _close_mdown: function (e) {
    (e.originalEvent || e).cancelBubble = true;
  },
  _close_click: function (e) {
    this.close();
  },
  _close: function (nofocus) {
    var t = this;
    this.destroy();
    if (curRBox.focused[0] && nofocus !== true) {
      curRBox.tabs[curRBox.focused[0]].focus();
    }
  },
  focus: function (e) {
    var t = this, cb = (curRBox.active != t.id) || true;
    t._focus();
    if (cb && isFunction(t.options.onFocus)) {
      t.options.onFocus(e);
    }
    return cb;
  },
  close: function () {
    var t = this, pos = t.pos;
    t._close();
    if (isFunction(t.options.onClose)) {
      t.options.onClose(pos);
    }
  }
});

if (!window.curFastChat) {
  curFastChat = {};
}
FastChat = {
  init: function (options) {
    extend(curFastChat, {
      tabs: {},
      needPeers: {},
      gotPeers: {},
      needMedia: {},
      gotMedia: {},
      myTypingEvents: {},
      typingEvents: {},
      inited: true,
      options: options,
      posSeq: 0,
      error_timeout: 1
    });
    delete curFastChat.standby;
    delete curFastChat.standbyTO;
    Notifier.addRecvClbk('fastchat', 0, FastChat.lcRecv, true);
    Notifier.addRecvClbk('logged_off', 0, FastChat.standby, true);
    FastChat.lcSend('needSettings', {version: options.version, lang_id: langConfig.id});
    clearTimeout(curFastChat.getSettingsTO);
    curFastChat.getSettingsTO = setTimeout(FastChat.getSettings, 300);
  },
  getSettings: function () {
    var friends = ls.get('fcFriends' + vk.id);
    ajax.post('al_im.php', {
      act: 'a_get_fast_chat',
      friends: friends && friends.version
    }, {
      onDone: function (data) {
        if (data.friends == -1) {
          data.friends_version = friends.version;
          data.friends = friends.list;
        } else {
          ls.set('fcFriends' + vk.id, {version: data.friends_version, list: data.friends});
        }
        FastChat.gotSettings(data);
        FastChat.sendSettings();
      },
      onFail: function () {
        return true;
      }
    });
  },
  gotSettings: function(data) {
    if (data['emoji_stickers']) {
      window.emojiStickers = data['emoji_stickers'];
    }
    if (window.Emoji) {
      Emoji.updateTabs();
    }
    clearTimeout(curFastChat.getSettingsTO);
    window.lang = extend(window.lang || {}, data.lang);
    extend(curFastChat, data, {lang_id: langConfig.id});
    if (curNotifier.is_server) {
      if (!data.im_queue) {
        clearTimeout(curFastChat.lp_error_to);
        curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), (curNotifier.error_timeout || 1) * 1000);
      } else if (!curFastChat.lpInited) {
        FastChat.initLp();
      }
    }
    curFastChat.friendsCnt = 0;
    for (var i in (curFastChat.friends || {})) {
      curFastChat.friendsCnt++;
    }
    setTimeout(FastChat.clistCache.pbind(false), 10);
    FastChat.initUI();
  },
  sendSettings: function () {
    clearTimeout(curFastChat.sendSettingsTO);
    var settings = {}, k = ['friends', 'friends_version', 'onlines', 'tpl', 'lang', 'me', 'version', 'im_queue', 'cl_queue'], i;
    for (i in k) {
      if (k[i] != 'cl_queue' && curFastChat[k[i]] === undefined) {
        return;
      }
      settings[k[i]] = curFastChat[k[i]];
    }
    clearTimeout(curFastChat.sendSettingsTO);
    curFastChat.sendSettingsTO = setTimeout(function () {
      FastChat.lcSend('settings', {settings: settings})
    }, curNotifier.is_server ? 0 : irand(50, 100));
  },
  becameServer: function () {
    if (curFastChat.lpInited || !curFastChat.version) {
      return;
    }
    delete curNotifier.addQueues['fastchat' + vk.id];
    delete curNotifier.addQueues['contacts' + vk.id];
    if (!curFastChat.im_queue) {
      clearTimeout(curFastChat.lp_error_to);
      curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), (curNotifier.error_timeout || 1) * 1000);
    } else if (!curFastChat.lpInited) {
      FastChat.initLp();
    }
  },
  destroy: function () {
    if (!curFastChat.inited) {
      return false;
    }
    var topLink;
    FastChat.stopLp();
    each(curFastChat.tabs || {}, function (peer, tab) {
      tab.box.destroy();
    });
    curFastChat.clistBox && curFastChat.clistBox.destroy();
    each (curFastChat.el || {}, function () {
      cleanElems(this);
    });
    clearInterval(curFastChat.updateFriendsInt);
    clearInterval(curFastChat.updateTypingsInt);
    clearTimeout(curFastChat.correspondentsTO);
    clearTimeout(curFastChat.lp_error_to);
    curFastChat = {inited: false};
    return true;
  },

  isChatOpen: function(id) {
    if (window.curFastChat && curFastChat.inited && id) {
      if (curFastChat.tabs && curFastChat.tabs[id] && curFastChat.tabs[id].box.visible ||
        curFastChat.clistBox && curFastChat.clistBox.visible) {
          return true;
      }
    }
    return false;
  },

  standby: function (version) {
    FastChat.destroy();
    curFastChat.standby = true;
    var to = 1, cb = function () {
      if (!curNotifier.is_server) {
        clearTimeout(curFastChat.standbyTO);
        curFastChat.standbyTO = setTimeout(cb, to * 1000);
        return;
      }
      ajax.post('notifier.php?act=a_get_reload', {version: version}, {
        onDone: function (navVersion, config) {
          FastChat.lcSend('gotConfig', {navVersion: navVersion, config: config});
          FastChat.gotConfig(navVersion, config);
        },
        onFail: function () {
          to *= 2;
          clearTimeout(curFastChat.standbyTO);
          curFastChat.standbyTO = setTimeout(cb, to * 1000);
          return true;
        }
      });
    };
    cb();
  },
  gotConfig: function (navVersion, config) {
    clearTimeout(curFastChat.standbyTO);
    if (!curFastChat.standby) {
      return;
    }
    setTimeout(function () {
      if (navVersion > stVersions['nav']) {
        debugLog('appending al loader');
        headNode.appendChild(ce('script', {
          type: 'text/javascript',
          src: '/js/loader_nav' + navVersion + '_' + vk.lang + '.js'
        }));
      }
      setTimeout(function() {
        if (navVersion <= stVersions['nav']) {
          stManager.add(['notifier.js', 'notifier.css', 'emoji.js'], function () {
            FastChat.init(config);
          })
          return;
        }
        setTimeout(arguments.callee, 100);
      }, 0);
    }, curNotifier.is_server ? 0 : irand(1000, 2000));
  },
  updateVersion: function (version) {
    FastChat.lcSend('standby', {version: version});
    FastChat.standby(version);
  },

  // Local connection: communication between tabs in one browser instanse
  lcSend: function (act, data) {
    Notifier.lcSend('fastchat', extend({act: act, __id: curFastChat.me && curFastChat.me.id || vk.id}, data));
  },
  lcRecv: function (data) {
    if (isEmpty(data)) return;
    var act = data.act;
    if (data.__id != (curFastChat.me && curFastChat.me.id || vk.id)) {
      return;
    }
    delete data.act;
    delete data.__id;
    FastChat.lcFeed(act, data);
  },
  lcFeed: function (act, data) {
    switch (act) {
      case 'needSettings':
        if (curFastChat.version < data.version) {
          // May be update version here
        } else if (data.lang_id == curFastChat.lang_id) {
          FastChat.sendSettings();
        }
        break;

      case 'settings':
        if (!curFastChat.version && curFastChat.options && data.settings.version == curFastChat.options.version) {
          FastChat.gotSettings(data.settings);
        }
        clearTimeout(curFastChat.sendSettingsTO);
        break;

      case 'standby':
        if (!curFastChat.version) break;
        FastChat.standby(data.version);
        break;

      case 'gotConfig':
        FastChat.gotConfig(data.navVersion, data.config);
        break;

      case 'clFeed':
        if (!curFastChat.version) break;
        FastChat.clFeed(data.events);
        break;

      case 'clistOnlines':
        if (!curFastChat.version) break;
        FastChat.clistGotOnlines(data);
        break;

      case 'imFeeds':
        if (!curFastChat.version) break;
        FastChat.imFeeds(data);
        break;

      case 'needPeer':
        if (!curFastChat.version) break;
        var peer = data.id, tab = curFastChat.tabs[peer], i, peerData = false, mem;
        if (tab !== undefined) {
          peerData = {
            name: tab.name,
            photo: tab.photo,
            fname: tab.fname,
            hash: tab.hash,
            sex: tab.sex,
            data: tab.data,
            online: tab.online
          };
          for (i in tab.msgs) {
            peerData.history = [tab.log.innerHTML, tab.msgs];
            break;
          }
        } else if (mem = curFastChat.friends[peer + '_']) {
          peerData = {name: mem[0], photo: mem[1], fname: mem[2], hash: mem[3], data: mem[4], online: curFastChat.onlines[peer]};
        }
        if (peerData === false) {
          break;
        }
        curFastChat.gotPeers[peer] = setTimeout(function () {
          var response = {};
          response[peer] = peerData;
          FastChat.lcSend('gotPeers', response);
        }, curNotifier.is_server ? 0 : irand(50, 100));

        break;

      case 'fetchingPeers':
        if (!curFastChat.version) break;
        each (data, function (peer, flags) {
          var needPeer = curFastChat.needPeers[peer];
          if (needPeer && (flags & needPeer[0]) == needPeer[0]) {
            clearTimeout(needPeer[2]);
          }
        });
        break;

      case 'gotPeers':
        if (!curFastChat.version) break;
        FastChat.gotPeers(data);
        break;

      case 'stateChange':
        if (!curFastChat.version) break;
        FastChat.onStateChanged(data);
        break;

      case 'queueSet':
        extend(curFastChat, data);
        break;

      case 'queueClean':
        if (!curNotifier.is_server) {
          delete curFastChat.im_queue;
          delete curFastChat.cl_queue;
        }
        break;

      case 'needMedia':
        var msgId = data.msgId, msgMedia = curFastChat.gotMedia[msgId];
        if (msgMedia === undefined || msgMedia === 0) {
          break;
        }
        curFastChat.gotMedia[msgId][3] = setTimeout(function () {
          FastChat.lcSend('gotMedia', {msgId: msgId, peer: msgMedia[0], text: msgMedia[1], msgOpts: msgMedia[2]});
        }, curNotifier.is_server ? 0 : irand(50, 100));
        break;

      case 'fetchingMedia':
        // if (!curFastChat.version) break;
        var msgId = data.msgId, msgNeed = curFastChat.needMedia[msgId];
        if (msgNeed === undefined || curFastChat.gotMedia[msgId] === 0) {
          break;
        }
        clearTimeout(msgNeed[1]);
        msgNeed[1] = setTimeout(FastChat.loadMsgMedia.pbind(msgNeed[0], msgId), 1000);
        break;

      case 'gotMedia':
        var msgId = data.msgId, msgMedia = curFastChat.gotMedia[msgId];
        if (isArray(msgMedia)) {
          clearTimeout(msgMedia[3]);
        }
        FastChat.gotMsgMedia(data.peer, msgId, data.text, data.msgOpts);
        break;
    }
  },

  // Long poll
  initLp: function () {
    curFastChat.lpInited = true;
    FastChat.checkLp();
    curFastChat.checkLpInt = setInterval(FastChat.checkLp, 20000);
  },
  stopLp: function () {
    curFastChat.lpInited = false;
    clearInterval(curFastChat.checkLpInt);
    delete curFastChat.im_queue;
    delete curFastChat.cl_queue;
  },
  checkLp: function () {
    if (!curNotifier.is_server || !curFastChat.im_queue/* || !curFastChat.cl_queue*/) {
      return;
    }
    Notifier.addKey({
      queue: curFastChat.im_queue.id,
      key: curFastChat.im_queue.key,
      ts: curFastChat.im_queue.ts
    }, FastChat.imChecked, true);

    if (curFastChat.cl_queue) {
      Notifier.addKey({
        queue: curFastChat.cl_queue.id,
        key: curFastChat.cl_queue.key,
        ts: curFastChat.cl_queue.ts
      }, FastChat.clChecked, true);
    }
    FastChat.lcSend('queueSet', {
      im_queue: curFastChat.im_queue,
      cl_queue: curFastChat.cl_queue
    });
  },
  updateQueueKeys: function () {
    if (curFastChat.updatingQueues) {
      return;
    }
    curFastChat.updatingQueues = 1;
    FastChat.lcSend('queueClean');
    FastChat.stopLp();
    ajax.post('al_im.php', {act: 'a_get_fc_queue'}, {
      onDone: function (data) {
        if (data.version > curFastChat.version) {
          FastChat.updateVersion(data.version);
          return;
        }
        delete curFastChat.updatingQueues;
        extend(curFastChat, data);
        FastChat.lcSend('queueSet', data);
        if (curNotifier.is_server) {
          FastChat.initLp();
          FastChat.clistUpdate();
        }
      },
      onFail: function () {
        delete curFastChat.updatingQueues;
        FastChat.destroy();
        return true;
      }
    });
  },

  // Checked function (recv long-poll response)
  clChecked: function (queue, response) {
    if (!curFastChat.inited || !curFastChat.ready || !curFastChat.cl_queue) return;
    if (response.failed) {
      clearTimeout(curFastChat.lp_error_to);
      curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), (curNotifier.error_timeout || 1) * 1000);
      return;
    }
    if (response.ts) {
      if (response.key) {
        curFastChat.cl_queue.key = response.key;
      }
      curFastChat.cl_queue.ts = response.ts;
      FastChat.lcSend('queueSet', {cl_queue: curFastChat.cl_queue});
    }
    if (!isArray(response.events) || !response.events.length) {
      return;
    }
    FastChat.clFeed(response.events);
    FastChat.lcSend('clFeed', {events: response.events});
  },
  clFeed: function (events) {
    if (!curFastChat.inited || !curFastChat.ready || !curFastChat.tabs) return;
    var clistUpdated = false, failed = false;
    each (events, function () {
      var ev = this.split('<!>'), evVer = ev[0], evType = ev[1], peer = ev[2], onltype = ev[3] ? ev[3] : 1, tab = curFastChat.tabs[peer], wasOnline = curFastChat.onlines[peer];
      if (evVer != curFastChat.version) {
        FastChat.updateVersion(evVer);
        failed = true;
        return false;
      }
      if (!curFastChat.friends[peer + '_'] && !tab) {
        return;
      }

      switch (evType) {
        case 'online':
          if (wasOnline == onltype) break;
          curFastChat.onlines[peer] = onltype;
          FastChat.tabNotify(peer, 'online', onltype);
          clistUpdated = true;
          break;

        case 'offline':
          if (!wasOnline) break;
          delete curFastChat.onlines[peer];
          if (re('fc_contact' + peer) && curFastChat.clistBox.visible) {
            FastChat.clistShowMore();
          }
          FastChat.tabNotify(peer, 'offline');
          break;
      }
    });
    if (failed) {
      return;
    }
    if (clistUpdated &&
        curFastChat.clistBox.visible &&
        curNotifier.idle_manager && !curNotifier.idle_manager.is_idle &&
        (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id)) {
      FastChat.clistRender(); // Title is also updated here
    } else {
      FastChat.clistUpdateTitle();
    }
  },
  imChecked: function (queue, response) {
    if (!curFastChat.inited || !curFastChat.ready || !curFastChat.im_queue) return;
    if (response.failed) {
      clearTimeout(curFastChat.lp_error_to);
      curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), (curNotifier.error_timeout || 1) * 1000);
      return;
    }
    if (response.ts && curFastChat.im_queue) {
      if (response.key) {
        curFastChat.im_queue.key = response.key;
      }
      curFastChat.im_queue.ts = response.ts;
      FastChat.lcSend('queueSet', {im_queue: curFastChat.im_queue});
    }
    if (!isArray(response.events) || !response.events.length) {
      return;
    }
    var feeds = {}, failed = false;
    each (response.events, function () {
      var ev = this.split('<!>'),
          evVer = ev[0],
          evType = ev[1],
          peer = ev[2],
          flags = 0,
          tab = curFastChat.tabs[peer];

      if (evVer != curFastChat.version) {
        FastChat.updateVersion(evVer);
        failed = true;
        return false;
      }

      switch (evType) {
        case 'read':
          break;

        case 'typing':
          flags = 1;
          break;

        case 'new':
          flags = (ev[4] & 2) ? 0 : 2;
          break;

        default: return;
      }

      if (!feeds[peer]) {
        feeds[peer] = [0];
      }
      feeds[peer][0] |= flags;
      feeds[peer].push(ev);
    });
    if (failed || isEmpty(feeds)) {
      return;
    }
    FastChat.lcSend('imFeeds', feeds);
    FastChat.imFeeds(feeds);
  },
  imFeeds: function (feeds) {
    if (!curFastChat.inited || !curFastChat.ready) return;
    each (feeds, function (peer, events) {
      var flags = events.shift();
      FastChat.imFeed(peer, events);
    });
  },

  blinkEl: function(el, num, cb) {
    if (num > 10) {
      cb();
      return false;
    }
    if (num % 2 == 0) {
      animate(el, {opacity: 0}, 400, function() {
        FastChat.blinkEl(el, num + 1, cb);
      });
    } else {
      animate(el, {opacity: 1}, 400, function() {
        setTimeout(function() {
          FastChat.blinkEl(el, num + 1, cb);
        }, 400);
      });
    }

  },

  blinkTyping: function(peer) {
    var el = ge('chat_tab_icon_'+peer);
    if (!el) {
      return;
    }
    var tIcon = geByClass1('chat_tab_typing_wrap', el);
    fadeIn(tIcon, 150, function() {
      FastChat.blinkEl(tIcon.firstChild, 0, function() {
        fadeOut(tIcon, 150);
      });
    });
  },

  imFeed: function (peer, events) {
    var tab = curFastChat.tabs[peer],
        ts = vkNow();

    each (events, function (k, ev) {
      switch(ev[1]) {
        case 'new':
          if ((ev[4] & 3) === 1) { // unreed
            FastChat.changePeerCounter(peer, 1);
          }
          break;
        case 'read':
          var cnt = 1;
          each(ev[3].split(','), function (k, msgId) {
            cnt += 1;
          });
          FastChat.changePeerCounter(peer, -cnt);
          break;
        case 'typing':
          if (Chat.tabs[peer]) {
            FastChat.blinkTyping(peer);
          }
          break;
      }
    });

    if (!tab) return false;
    each (events, function (k, ev) {
      switch (ev[1]) {
        case 'new':
          stManager.add(['im.js'], function() {
            each (tab.sentmsgs, function (k, msgId) {
              var row = ge('fc_msg' + msgId), parent = row && row.parentNode;
              if (re(row) && parent && !geByClass('fc_msg', parent).length) {
                re(parent.parentNode);
              }
            });
            if (!ge('fc_msg' + ev[3])) {
              FastChat.addMsg(FastChat.prepareMsgData(ev.slice(2)));
              tab.msgs[ev[3]] = [ev[4] & 2 ? 1 : 0, ev[4] & 1];
              if ((ev[4] & 3) === 1) tab.unread++;
              FastChat.scroll(peer);
            }
            FastChat.blinkTab(peer);
          });
          break;

        case 'read':
          each(ev[3].split(','), function (k, msgId) {
            var row = ge('fc_msg' + msgId), parent = row && row.parentNode;
            if (!row) return;
            if (tab.msgs[msgId] && tab.msgs[msgId][1]) {
              tab.msgs[msgId][1] = 0;
              if (!tab.msgs[msgId][0]) {
                tab.unread--;
              }
            }
            removeClass(row, 'fc_msg_unread');
            if (hasClass(parent.parentNode, 'fc_msgs_unread')) {
              each (parent.childNodes, function () {
                if (!hasClass(this, 'fc_msg_unread')) {
                  removeClass(parent.parentNode, 'fc_msgs_unread');
                  return false;
                }
              });
            }
          });
          break;

        case 'typing':
          if (peer > 2e9) {
            if (!curFastChat.typingEvents[peer]) {
              curFastChat.typingEvents[peer] = {};
            }
            curFastChat.typingEvents[peer][ev[3]] = ts;
          } else {
            curFastChat.typingEvents[peer] = ts;
          }
          FastChat.updateTyping(peer);
          break;
      }
    });
    if (tab.unread > 0) {
      tab.unread = 0;
      each (tab.msgs, function () {
        if (!this[0] && this[1]) tab.unread++;
      });
    }
    if (tab.auto && !tab.unread) {
      tab.box._close(true);
      delete curFastChat.tabs[peer];
    }
    FastChat.updateUnreadTab(peer);
  },
  tabNotify: function(peer, evType, evData) {
    var tab = curFastChat.tabs[peer];
    if (peer > 0 && peer < 2e9 && isFunction(cur.onPeerStatusChanged)) {
      cur.onPeerStatusChanged(peer, evType, evData);
    }
    if (peer <= 0 || !tab || !tab.box || tab.box.minimized) return;
    var addClassTo = geByClass1('fc_tab', tab.wrap, 'div'), mob = (evData > 0 && evData < 6), cls = mob ? 'fc_tab_mobile' : 'fc_tab_online';
    if (evType == 'online') {
      addClassTo.className = addClassTo.className.replace(mob ? 'fc_tab_online' : 'fc_tab_mobile', cls);
      if (hasClass(addClassTo, cls)) return;
    }

    clearTimeout(tab.hideNotifyTO);
    switch (evType) {
      case 'online':
        text = langSex(tab.sex, lang.mail_im_user_became_online);
        FastChat.blinkTab(peer);
        addClass(addClassTo, cls);
        break;

      case 'offline':
        text = langSex(tab.sex, lang.mail_im_user_became_offline);
        FastChat.blinkTab(peer);
        removeClass(addClassTo, 'fc_tab_online');
        removeClass(addClassTo, 'fc_tab_mobile');
        break;

      case 'unavail':
        text = langSex(tab.sex, lang.mail_im_user_unavail);
        break;
    }
    text = text.replace('{user}', tab.fname);
    val(tab.notify, '<div class="fc_tab_notify fc_tab_notify_' + evType + '">' + text + '</div>');
    var notify = tab.notify.firstChild;
    setStyle(notify, {width: tab.logWrap.clientWidth - 8/*, zIndex: 400*/});
    clearTimeout(tab.hideNotifyTO);
    tab.hideNotifyTO = setTimeout(function () {
      fadeOut(notify, 200, function () {
        val(tab.notify, '');
      });
    }, 5000);
  },

  hideChatCtrl: function() {
    removeClass(Chat.wrap, 'chat_active');
    removeEvent(document, 'mousedown', FastChat.onDocClick);
  },

  showChatCtrl: function() {
    addClass(Chat.wrap, 'chat_active');
    setTimeout(function() {
      addEvent(document, 'mousedown', FastChat.onDocClick);
    }, 0);
  },

  initUI: function () {
    var el = curFastChat.el = {},
        wndInner = getWndInner();
    re('rb_box_fc_clist');
    el.clistWrap = se(curFastChat.tpl.clist);
    el.clist = geByClass1('fc_contacts', el.clistWrap, 'div');
    el.clistTitle = geByClass1('fc_tab_title', el.clistWrap, 'div');
    el.clistOnline = geByClass1('fc_clist_online', el.clistWrap, 'div');

    var state = curFastChat.options.state || false,
        clistMin = !curFastChat.friendsCnt || (!(state && state.clist.min !== undefined) ? wndInner[1] < 1200 || curFastChat.friendsCnt < 5 : state.clist.min);
    curFastChat.clistW = 252;
    //curFastChat.clistH = Math.max(290, Math.min(2000, wndInner[0] * 0.5));
    curFastChat.clistH = 316;
    var opts = {
      id: 'fc_clist',
      movable: geByClass1('fc_tab_head', el.clistWrap),
      hider: geByClass1('fc_tab_close_wrap', el.clistWrap, 'a'),
      startHeight: curFastChat.clistH,
      startWidth: curFastChat.clistW,
      resizeableH: el.clist,
      resize: false,
      minH: 150,
      fixed: clistMin,
      onHide: function (hideOpts) {
        val('fc_clist_filter', curFastChat.q = '');
        //FastChat.clistRender();
        addClass(curFastChat.clistBox.wrap, 'fc_fixed');
        curFastChat.clistBox.fixed = true;
        FastChat.stateChange({op: 'clist_toggled', val: 0});
        setStyle(curFastChat.clistBox.wrap, {top: 'auto', bottom: 0, right: 68, left: 'auto'});
        show(el.topLink);
        FastChat.hideChatCtrl();
      },
      onShow: function() {
        FastChat.showChatCtrl();
      },
      onDragEnd: function (y, x) {
        FastChat.stateChange({op: 'clist_moved', y: y, x: x});
      },
      onResize: function (h, w) {
        curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(false, true);
      }
    };
    if (state && !clistMin) {
      if (state.clist.x !== false) {
        if (state.clist.x == -1) {
          opts.startRight = 0;
        } else {
          opts.startLeft = wndInner[1] * state.clist.x;
        }
      }
      if (state.clist.y !== false) {
        if (state.clist.y == -1) {
          opts.startBottom = 0;
        } else {
          opts.startTop = wndInner[0] * state.clist.y;
        }
      }
    }
    if (clistMin) {
      opts.noshow = true;
    }
    if (opts.startTop === undefined && opts.startBottom === undefined) {
      opts.startTop = wndInner[0] < 800 ? 0 : wndInner[0] * 0.10;
    }
    if (opts.startLeft === undefined && opts.startRight === undefined) {
      opts.startRight = 0;
    }
    curFastChat.clistBox = new RBox(el.clistWrap, opts);
    if (!opts.noshow && (opts.startLeft !== undefined || opts.startTop !== undefined)) {
      curFastChat.clistBox._wnd_resize(wndInner[0], wndInner[1], true);
    }

    // Friends list
    curFastChat.clistBoxScroll = new Scrollbar(el.clist, {
      prefix: 'fc_',
      more: FastChat.clistShowMore,
      nomargin: true,
      global: true,
      nokeys: true,
      right: vk.rtl ? 'auto' : 1,
      left: !vk.rtl ? 'auto' : 1
    });
    curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 3 * 60000);
    curFastChat.updateTypingsInt = setInterval(FastChat.updateTypings, 5000);

    var filter = ge('fc_clist_filter');
    placeholderSetup(filter, {global: true, back: 1});
    curFastChat.q = '';
    addEvent(filter, 'keyup ' + (browser.opera ? 'keypress' : 'keydown'), function (e) {
      if (e.keyCode == KEY.ESC) {
        FastChat.clistHide();
        return cancelEvent(e);
      }
      var control = FastChat.clistFilterKey(e);
      if (control !== undefined) {
        return control;
      }
      curFastChat.q = trim(val(this));
      FastChat.clistRender();
    });

    if (el.clistOnline) {
      var lShift, probe;
      bodyNode.appendChild(probe = ce('nobr', {className: 'fl_l', innerHTML: getLang('mail_im_clist_onlines')}, {visibility: 'hidden', position: 'absolute'}));
      lShift = (probe.offsetWidth || 179) - 7;
      re(probe);
      addEvent(el.clistOnline, 'mouseover', function (e) {
        showTooltip(this, {text: getLang('mail_im_clist_onlines'), forcetoup: 1, shift: [12, 4, 3], className: 'tt_fc_onlines', init: function () {
          if (browser.msie) el.clistOnline.tt.isFixed = false;
        }, black: 1});
      });
      addEvent(el.clistOnline, 'click', function (e) {
        (e.originalEvent || e).cancelBubble = true;
        FastChat.clistToggleOnlines();
        FastChat.clistRender();
      });
      if (state && state.clist && state.clist.onlines) {
        FastChat.clistToggleOnlines(true);
      }
    }

    if (!clistMin) {
      FastChat.clistRender();
    } else {
      FastChat.clistUpdateTitle();
    }
    curFastChat.ready = true;

    // Add tabs
    if (state && state.tabs) {
      each (state.tabs, function (peer, peerOpts) {
        peer = intval(peer);
        var opts = {nofocus: 1};
        if (this.min) {
          opts.minimized = true;
        }
        if (this.h) {
          opts.startHeight = this.h * wndInner[0];
        }
        if (this.w) {
          opts.startWidth = this.w * wndInner[1];
        }
        if (this.x !== undefined && this.x <= 1) {
          if (this.x < 0) {
            opts.startRight = 0;
          } else {
            opts.startLeft = wndInner[1] * this.x;
          }
        }
        if (this.y !== undefined && this.y <= 1) {
          if (this.y < 0) {
            opts.startBottom = 0;
          } else {
            opts.startTop = wndInner[0] * this.y;
          }
        }
        if (peerOpts.fx) {
          opts.fixedLoad = true;
          FastChat.prepareTabIcon(peer, opts, true);
        } else {
          opts.noAnim = true;
          FastChat.addPeer(peer, false, false, opts);
        }
      });
    }

    addEvent(Chat.itemsCont, 'mousemove mouseover', FastChat.itemsTT)
    addEvent(Chat.itemsCont, 'mouseout', FastChat.itemsOut)
  },

  itemsOffset: 12,

  itemsTT: function(ev) {
    var el = ev.target;
    var item = false;
    while(el && el != Chat.itemsCont) {
      if (hasClass(el, 'chat_tab_wrap')) {
        item = el;
        break;
      }
      el = el.parentNode;
    }
    if (!item) {
      clearTimeout(Chat.ttOutTimeout);
      Chat.ttOutTimeout = false;
      return false;
    }
    var peer = item.id.split('_')[3];
    var tab = Chat.tabs[peer];
    if (!tab) {
      return false;
    }
    if (curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == peer) {
      FastChat.itemsOut();
      return false;
    }

    clearTimeout(Chat.ttOutTimeout);
    Chat.ttOutTimeout = false;

    var newTop = getXY(el)[1] - getXY(Chat.itemsCont)[1];
    var tt = Chat.userNameTT;
    if (!tt) {
      Chat.userNameTT = ce('div', {className: 'chat_tab_info_wrap', innerHTML: '<div class="chat_tab_info_tt"><div class="chat_tab_info_p"></div><div id="chat_tab_info_text"></div></div>'}, {top: newTop - Chat.scrollNode.scrollTop + FastChat.itemsOffset, right: 70, opacity: 0});
      Chat.wrap.insertBefore(Chat.userNameTT, Chat.wrap.firstChild);
    }
    if (!Chat.ttPeer) {
      show(Chat.userNameTT);
      animate(Chat.userNameTT, {opacity: 1, right: 60}, 100);
    }
    val('chat_tab_info_text', tab.name);
    if (Chat.ttPeer != peer || Chat.ttTop != newTop) {
      Chat.ttPeer = peer;
      Chat.ttTop = newTop;
      setStyle(Chat.userNameTT, {top: newTop - Chat.scrollNode.scrollTop + FastChat.itemsOffset});
    }
  },

  itemsOut: function() {
    if (Chat.ttOutTimeout) {
      return false;
    }
    Chat.ttOutTimeout = setTimeout(function() {
      Chat.ttOutTimeout = false;
      if (!Chat.ttPeer) {
        return false;
      }
      animate(Chat.userNameTT, {opacity: 0, right: 70}, 100, function() {
        hide(Chat.userNameTT);
      });
      Chat.ttPeer = false;
    }, 0);
  },

  stateChange: function(data) {
    ajax.post('al_im.php', extend({act: 'a_state_fc', hash: curFastChat.options.state_hash || ''}, data), {
      onFail: function () {return true;}
    });
    FastChat.lcSend('stateChange', data);
  },
  onStateChanged: function (data) {
    var tab = data.peer ? curFastChat.tabs[data.peer] : false,
        box = data.peer ? (tab && tab.box) : curFastChat.clistBox,
        wndInner = getWndInner();
    switch (data.op) {
      case 'added':
        if (tab) {
          delete tab.auto
          break;
        }
        if (data.fixed) {
          FastChat.prepareTabIcon(data.peer, {fixedLoad: true})
        } else {
          FastChat.addPeer(data.peer);
        }
        break;
      case 'unfixed':
        var unfixOpts = {
           startHeight: intval(wndInner[0] * data.h),
           startWidth: intval(wndInner[1] * data.w),
        }
        if (data.y == -1) {
          unfixOpts.startBottom = 0;
        } else {
          unfixOpts.startTop = intval(wndInner[0] * data.y);
        }
        if (data.x == -1) {
          unfixOpts.startRight = 0;
        } else {
          unfixOpts.startLeft = intval(wndInner[1] * data.x);
        }
        FastChat.addPeer(data.peer, false, false, unfixOpts);
        break;

      case 'closed':
        if (Chat.tabs[data.peer]) {
          FastChat.closeTabIcon(data.peer);
        }
        if (!tab || !box) break;
        box.close();
        break;

      case 'hidden':
        if (!tab || !box) break;
        box.close();
        break;

      case 'minimized':
        if (!tab || !box) break;
        if (data.val) {
          box.unminimize();
        } else {
          box.minimize();
        }
        break;

      case 'moved':
        setStyle(box.wrap, {
          bottom: data.y == -1 ? 0 : 'auto',
          top: data.y != -1 ? intval(wndInner[0]  * data.y) : 'auto',
          right: data.x == -1 ? 0 : 'auto',
          left: data.x != -1 ? intval(wndInner[1] * data.x) : 'auto'
        });
        box.toBottom = data.y == -1;
        box.toRight = data.x == -1;
        break;

      case 'resized':
        setStyle(box.wrap, {
          bottom: data.y == -1 ? 0 : 'auto',
          top: data.y != -1 ? intval(wndInner[0]  * data.y) : 'auto',
          right: data.x == -1 ? 0 : 'auto',
          left: data.x != -1 ? intval(wndInner[1] * data.x) : 'auto'
        });
        box.toBottom = data.y == -1;
        box.toRight = data.x == -1;

        var w = intval(wndInner[1]  * data.w);
        setStyle(box.resizeableH, 'height', intval(wndInner[0]  * data.h));
        setStyle(box.resizeableW, 'width', w);
        FastChat.fixResized(tab, w);
        break;

      case 'clist_toggled':
        if (data.val) {
          box.show(0, true);
        } else {
          box.hide(0, true);
        }
        toggle(curFastChat.el.topLink, !data.val);
        break;

      case 'clist_moved':
        setStyle(box.wrap, {
          bottom: data.y == -1 ? 0 : 'auto',
          top: data.y != -1 ? intval(wndInner[0]  * data.y) : 'auto',
          right: data.x == -1 ? 0 : 'auto',
          left: data.x != -1 ? intval(wndInner[1] * data.x) : 'auto'
        });
        box.toBottom = data.y == -1;
        box.toRight = data.x == -1;
        break;

      case 'onlines_toggled':
        FastChat.clistToggleOnlines(data.val);
        FastChat.clistRender();
    }
  },

  onUnidle: function () {
    if (!curNotifier.version || !curFastChat.clistBox) {
      return;
    }
    if (curFastChat.clistBox.visible &&
        (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id)) {
      FastChat.clistRender(); // Title is also updated here
    } else {
      FastChat.clistUpdateTitle();
    }
    each (curFastChat.tabs, function (peer) {
      FastChat.restoreDraft(peer);
    });
  },
  clistUpdate: function () {
    var ts = vkNow();
    if (!curNotifier.is_server || (curFastChat.clistUpdatedTs && ts - curFastChat.clistUpdatedTs < 60000)) {
      return;
    }
    curFastChat.clistUpdatedTs = ts;
    var tabs = [], mid;
    for (mid in curFastChat.tabs) {
      tabs.push(mid);
    }
    for (mid in Chat.tabs) {
      tabs.push(mid);
    }
    ajax.post('al_im.php', {act: 'a_onlines', peer: tabs.join(',')}, {
      onDone: function (onlines) {
        FastChat.clistGotOnlines(onlines);
        FastChat.lcSend('clistOnlines', onlines);
      }
    });
  },
  clistGotOnlines: function (onlines) {
    var prev = curFastChat.onlines, offlines = [];
    curFastChat.onlines = onlines;
    if (curNotifier.idle_manager && curNotifier.idle_manager.is_idle || (!curFastChat.tabs && Chat.tabs)) {
      return;
    }
    each (curFastChat.tabs, function (peer) {
      if (curFastChat.onlines[peer] != prev[peer]) {
        FastChat.tabNotify(peer, onlines[peer] ? 'online' : 'offline', onlines[peer]);
        if (!onlines[peer]) offlines[peer] = 1;
      }
    });
    each(Chat.tabs, function(peer) {
      if (curFastChat.onlines[peer] != prev[peer]) {
        if (onlines[peer]) {
          addClass(ge('chat_tab_icon_'+peer), 'chat_tab_online');
        } else {
          removeClass(ge('chat_tab_icon_'+peer), 'chat_tab_online');
        }
      }
    })
    offlines = arrayKeyDiff(prev, onlines, offlines);
    each(offlines, function (peer) {
      FastChat.tabNotify(peer, 'offline');
    });
    FastChat.clistRender();
  },

  clistShow: function () {
    var animatePointer = hasClass(Chat.wrap, 'chat_active');
    FastChat.clistRender();
    if (!curFastChat.clistBox.visible) {
      if (curFastChat.activeBox && curFastChat.activeBox != curFastChat.clistBox) {
        curFastChat.activeBox.hide();
      }
      curFastChat.clistBox.show();
      FastChat.setActive(curFastChat.clistBox);
      curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(false, true);
      curFastChat.el.topLink && hide(curFastChat.el.topLink);
    } else {
      curFastChat.clistBox.focus();
    }
    elfocus('fc_clist_filter');
    //FastChat.stateChange({op: 'clist_toggled', val: 1});
    FastChat.movePointer(false, animatePointer);
  },
  clistHide: function () {
    curFastChat.clistBox.hide();
    if (curFastChat.activeBox == curFastChat.clistBox) {
      FastChat.setActive(false);
    }
  },

  clistRender: function (more) {
    var html = [], offsetReached = !more,
        limit = 1 + (more ? 40 : 20),
        q = curFastChat.q,
        queries,
        filterList = false,
        lastMid = false,
        re = false,
        offline = false;

    if (q) {
      re = [];
      each(FastChat.clistCache(q), function () {
        re.push(escapeRE(this));
      });
      re = new RegExp("([ \-]|^|\s|&nbsp;|\b)(" + re.join('|') + ")", "gi"); // no lookbhind in JS
      filterList = curFastChat.clistCache[q] || {};
    } else if (curFastChat.clOnlines) {
      filterList = curFastChat.onlines;
    }
    curFastChat.clHasMore = false;
    each (curFastChat.friends, function (k) {
      var mid = intval(k), matches = !filterList || filterList[mid],
          unread = curFastChat.tabs[mid] ? curFastChat.tabs[mid].unread : 0;

      if (!offsetReached) {
        if (mid == curFastChat.clOffset) {
          offsetReached = true;
        }
        return;
      }
      if (!matches) {
        return;
      }
      if (!(--limit)) {
        curFastChat.clHasMore = true;
        return false
      }
      html.push(FastChat.clistWrapPeer(mid, this, re));
      lastMid = mid;
    });
    if (lastMid === false && !more && !q) { // Nobody is online
      html.push('<div class="fc_clist_empty">' + getLang(q ? 'mail_im_clist_notfound' : 'mail_im_clist_empty') + '</div>');
    } else if (q && !curFastChat.clHasMore) {
      html.push(FastChat.getCorrespondents(q, re, lastMid === false));
    }
    curFastChat.clOffset = lastMid;
    if (more) {
      var div = ce('div', {innerHTML: html.join('')}), frag = document.createDocumentFragment();
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      curFastChat.el.clist.appendChild(frag);
      if (!curFastChat.clHasMore) {
        FastChat.clistUpdateTitle(true);
      }
    } else {
      val(curFastChat.el.clist, html.join(''));
      FastChat.clistUpdateTitle(true);
      if (browser.chrome || browser.safari) { // Webkit bug fix
        setTimeout(function () {
          setStyle(curFastChat.el.clist.firstChild, {width: curFastChat.el.clist.firstChild.clientWidth});
          setTimeout(function () {
            setStyle(curFastChat.el.clist.firstChild, {width: ''});
          }, 0);
        }, 0);
      }
    }
    if (curFastChat.clSel) {
      var el = ge('fc_contact' + curFastChat.clSel);
      if (el) {
        FastChat.clistPeerOver(el, 1);
      } else {
        curFastChat.clSel = false;
      }
    } else {
      var el = geByClass1('fc_contact', curFastChat.el.clist)
      FastChat.clistPeerOver(el, 1);
    }
    if (curFastChat.clistBoxScroll) {
      curFastChat.clistBoxScroll.update();
    }
  },
  clistWrapPeer: function (id, data, re) {
    var unread = curFastChat.tabs[id] ? curFastChat.tabs[id].unread : 0,
        online = curFastChat.onlines[id],
        href, photoEvents, cls = online ? (online > 0 && online < 6 ? ' fc_contact_mobile' : ' fc_contact_online') : '';
    var name = (data[0] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    if (re) {
      name = name.replace(re, '$1<em class="fc_clist_hl">$2</em>');
    }
    if (id > 0 && id < 2e9) {
      href = '/id' + id;
      photoEvents = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);" onclick="event.cancelBubble = true; return nav.go(this.parentNode, event);"';
    } else {
      href = '/im?sel=' + id;
      photoEvents = '';
    }
    if (id > 2e9 && data[3]) {
      var photoStr = data[3]
    } else {
      var photoStr = '<img src="' + Notifier.fixPhoto(data[1]) + '" class="fc_contact_photo"/>';
    }
    return '<a href="' + href + '" class="fc_contact clear_fix' + cls + '" id="fc_contact' + id + '" onclick="return FastChat.selectPeer(' + id + ', event);" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo fl_l" ' + photoEvents + '>'+photoStr+'</span><span class="fc_contact_name fl_l">' + name + '<span id="fc_contact_unread' + id + '" class="fc_contact_unread">' + (unread ?' <b>+' + unread + '</b>' : '') + '</span></span><span class="fc_contact_status fl_l"></span></a>';
  },
  clistPeerOver: function (el, state, e) {
    if (!el || !checkOver(e, el)) return;
    var id = el.id.substr(10);
    if (curFastChat.clSel && state && curFastChat.clSel != id) {
      FastChat.clistPeerOver(ge('fc_contact' + curFastChat.clSel), 0);
    }
    toggleClass(el, 'fc_contact_over', state);
    toggleClass(el, 'fc_contact_profile', state == 2 && id < 2e9 && id > 0);
    if (state) {
      curFastChat.clSel = id;
    } else if (curFastChat.clSel == id) {
      curFastChat.clSel = false;
    }
  },

  authorOver: function(obj, ev) {
    var text = obj.getAttribute('data-title');
    var container = gpeByClass('fc_tab_log', obj);
    var forcetodown = false;
    var offsetAuthor = obj.getBoundingClientRect().top;
    var offsetContainer = container.getBoundingClientRect().top;
    if(offsetAuthor - offsetContainer < 10) {
      forcetodown = true;
    }
    if (text) {
      showTooltip(obj, {
        text: text,
        black: 1,
        center: 1,
        forcetodown: forcetodown,
        shift: [1, 8, 0]
      });
    }
  },

  getCorrespondents: function(q, re, empty) {
    clearTimeout(curFastChat.correspondentsTO);
    if (curFastChat.correspondents && curFastChat.correspondents[q] !== undefined) {
      return FastChat.wrapCorrespondents(curFastChat.correspondents[q]) || (empty && '<div class="fc_clist_empty">' + getLang('mail_im_clist_notfound') + '</div>') || '';
    }
    curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(q, re), 100);
    return '<div id="fc_correspondents"></div>';
  },
  loadCorrespondents: function (q, re) {
    if (q != curFastChat.q) {return;}
    ajax.post('hints.php', {act: 'a_json_friends', str: q, from: 'fc', allow_multi: 1}, {
      onDone: function (peers) {
        if (!curFastChat.correspondents) curFastChat.correspondents = {};
        var correspondents = {}, k;
        each (peers, function () {
          k = this[3] + '_';
          if (curFastChat.friends[k]) return;
          correspondents[k] = [this[1], this[2], this[3], this[4] || ''];
        });
        curFastChat.correspondents[q] = correspondents;
        if (q != curFastChat.q) {return;}

        var el = ge('fc_correspondents');
        if (!el) {return;}
        var wrap = el.parentNode,
            div = ce('div', {innerHTML: FastChat.wrapCorrespondents(correspondents, re)}),
            frag = document.createDocumentFragment();
        if (div.firstChild) {
          while (div.firstChild) {
            frag.appendChild(div.firstChild);
          }
        } else if (wrap.firstChild == el) {
          frag.appendChild(ce('div', {className: 'fc_clist_empty', innerHTML: getLang('mail_im_clist_notfound')}));
        }
        wrap.replaceChild(frag, el);
        FastChat.clistUpdateTitle(true);
        if (curFastChat.clistBoxScroll) {
          curFastChat.clistBoxScroll.update();
        }
      }
    })
  },
  wrapCorrespondents: function (correspondents, re) {
    var html = [], mid;
    each(correspondents, function (id) {
      html.push(FastChat.clistWrapPeer(intval(id), this, re));
    });
    return html.join('');
  },

  updateFriends: function(onlineCount) {
    if (!window.Chat || !Chat.inited) return;
    var el = Chat.onl;
    if (!el) return;
    if (onlineCount > 0) {
      val(el, onlineCount);
      show(Chat.wrap);
    } else {
      hide(Chat.wrap);
    }
  },

  onDocClick: function(e) {
    if (!curFastChat.activeBox) {
      return;
    }
    var el = e.target;
    if (curBox()) {
      return true;
    }
    while(el) {
      if (el.className == 'fc_tab_wrap' || el.id == 'chat_onl_wrap' || el.id == 'custom_menu_cont' || el.id == 'layer_wrap' || el.id == 'box_layer_wrap' || el.id == 'wk_layer_wrap') {
        return true;
      }
      el = el.parentNode;
    }
    var tab = curFastChat.tabs[curFastChat.activeBox.options.peer];
    if (tab) {
      if (trim(Emoji.editableVal(tab.txt)) || (tab.imMedia && tab.imMedia.getMedias().length)) {
        return true;
      }
    }
    curFastChat.activeBox.hide();
  },

  clistCache: function(q) {
    if (q) {
      var queries = [q], query, t, i, j, cached, name, re, fr, cache;
      if (t = parseLatin(q)) {
        queries.push(t);
      }
      if (t = parseLatKeys(q)) {
        queries.push(t);
      }
      if (t = parseCyr(q)) {
        queries.push(t);
      }
      if (curFastChat.clistCache[q] !== undefined) {
        return queries;
      }
      cache = curFastChat.clistCache[q] = {};
      for (i in queries) {
        query = queries[i];
        if (cached = curFastChat.clistCache[' ' + query.charAt(0).toLowerCase()]) {
          re = new RegExp('(^|\\s|\\()' + escapeRE(query), 'gi');
          for (j in cached) {
            fr = curFastChat.friends[j + '_'];
            if (!isArray(fr)) {
              continue;
            }
            if (fr[0].match(re) !== null) {
              cache[j] = 1;
            }
          }
        }
      }
      j = 0;
      for (i in cache) {
        j++;
      }
      cache._num = j;
      return queries;
    }

    var name, cursor, letter;
    curFastChat.clistCache = {};
    for (i in curFastChat.friends) {
      name = curFastChat.friends[i][0];
      i = intval(i);
      cursor = 0;
      while (1) {
        letter = ' ' + name.charAt(cursor).toLowerCase();
        if (!curFastChat.clistCache[letter]) {
          curFastChat.clistCache[letter] = {};
        }
        curFastChat.clistCache[letter][i] = 1;
        cursor = name.indexOf(' ', cursor + 1);
        if (cursor == -1) break;
        ++cursor;
      }
    }
  },

  clistShowMore: function () {
    if (!curFastChat.clHasMore) {
      return;
    }
    var clist = curFastChat.el.clist,
        st = clist.scrollTop,
        h = clist.clientHeight,
        sh = clist.scrollHeight;

    if (st + h * 3 > sh) {
      FastChat.clistRender(true);
    }
  },

  clistUpdateTitle: function (rendered) {
    var cnt = 0, cnt1 = 0, i;
    for (i in curFastChat.friends) {
      if (curFastChat.onlines[intval(i)]) {
        cnt1++;
        cnt++
      } else if (!curFastChat.clOnlines) {
        cnt++;
      }
    }
    newVal = (cnt1 ? getLang('mail_im_X_onlines_title', cnt1) : getLang('mail_im_onlines_title')).toString();

    FastChat.updateFriends(cnt1);

    val(curFastChat.el.clistTitle, newVal);
    val(curFastChat.el.topLink, newVal.toLowerCase());

    if (curFastChat.clistBoxScroll) {
      if (!curFastChat.clHasMore && rendered) {
        cnt = curFastChat.el.clist.childNodes.length;
      } else if (curFastChat.q) {
        cnt = intval((curFastChat.clistCache[curFastChat.q] || {})._num);
      }
      curFastChat.clistBoxScroll.options.contHeight = cnt * 46 + (cnt > 0 ? 8 : 0);
    }
  },

  clistToggleOnlines: function (online) {
    if (online === undefined) {
      online = !curFastChat.clOnlines;
      FastChat.stateChange({op: 'onlines_toggled', val: online ? 1 : 0});
    }
    toggleClass(curFastChat.el.clistOnline, 'fc_clist_online_active', online);
    curFastChat.clOnlines = online;
  },

  clistFilterKey: function (e) {
    var el;
    switch (e.keyCode) {
      case KEY.DOWN:
      case KEY.UP:
        if (e.type != 'keyup') {
          if (el = curFastChat.clSel && ge('fc_contact' + curFastChat.clSel)) {
            var nextKey = e.keyCode == KEY.DOWN ? 'nextSibling' : 'previousSibling', nextEl = el;
            do {
              nextEl = nextEl[nextKey];
            } while (nextEl && (nextEl.nodeType != 1 || !hasClass(nextEl, 'fc_contact')));
          } else if (!curFastChat.clSel && e.keyCode == KEY.DOWN) {
            nextEl = geByClass1('fc_contact', curFastChat.el.clist, 'a');
          }
          if (nextEl && nextEl != el) {
            FastChat.clistPeerOver(nextEl, 1);
            var lCont = curFastChat.el.clist;
            if (nextEl.offsetTop + 16 > lCont.clientHeight + lCont.scrollTop) {
              lCont.scrollTop = nextEl.offsetTop + 16 - lCont.clientHeight;
              curFastChat.clistBoxScroll.update()
            } else if (nextEl.offsetTop - 36 < lCont.scrollTop) {
              lCont.scrollTop = nextEl.offsetTop - 36;
              curFastChat.clistBoxScroll.update()
            }
          }
        }
        break;

      case KEY.LEFT:
      case KEY.RIGHT:
        return true;

      case KEY.ENTER:
        if (e.type != 'keyup' && (el = curFastChat.clSel && ge('fc_contact' + curFastChat.clSel))) {
          if (e.ctrlKey || e.metaKey && browser.mac) {
            nav.go(el.href.match(/\b(vkontakte\.ru|vk\.com)(\/[^\/]+?)$/)[2]);
          } else {
            FastChat.selectPeer(curFastChat.clSel);
          }
          // fall through
        } else {
          break;
        }

      case KEY.ESC:
        if (e.type != 'keyup') {
          var filter = ge('fc_clist_filter'), prevVal = val(filter) || curFastChat.clSel;
          filter.blur();
          val(filter, curFastChat.q = '');
          curFastChat.clSel = false;
          if (prevVal) {
            FastChat.clistRender();
          }
        }
        break;

      default: return;
    }
    return cancelEvent(e);
  },

  changePeerCounter: function(peer, add, setVal) {
    if (!Chat.tabs[peer]) {
      return false;
    }
    var iconObj = ge('chat_tab_icon_'+peer);
    var counter = geByClass1('chat_tab_counter', iconObj)
    if (!counter) {
      counter = ce('dev', {className: 'chat_tab_counter'});
      iconObj.insertBefore(counter, iconObj.firstChild);
    }
    if (setVal === undefined) {
      Chat.counters[peer] = positive((Chat.counters[peer] || 0) + add);
    } else {
      Chat.counters[peer] = setVal;
    }
    if (Chat.counters[peer]) {
      counter.innerHTML = Chat.counters[peer];
    } else {
      re(counter);
    }
  },

  prepareTabIcon: function(peer, opts, noAnim) {
    var mem = curFastChat.friends && curFastChat.friends[peer+'_'];
    if (!mem) {
      var need = 3;
      curFastChat.needPeers[peer] = [need, false, setTimeout(FastChat.getPeers, irand(150, 200)), opts];
      FastChat.lcSend('needPeer', {id: peer, mask: need});
    } else {
      var data = {name: mem[0], photo: mem[1], online: curFastChat.onlines[peer]};
      FastChat.addTabIcon(peer, data, noAnim);
    }
  },

  addTabIcon: function(peer, data, noAnim) {
    if (Chat.tabs[peer]) {
      return;
    }
    if (peer > 2e9) {
      var imgRow = data.data.members_grid_fc || '';
    } else {
      var imgRow = '<img class="chat_tab_img" src="'+data.photo+'" width="38" height="38"/>';
    }
    if (peer > 2e9) {
      var peerHref = 'im?sel=c'+(peer - 2e9);
    } else {
      var peerHref = data.alink || '/id'+peer;
    }
    var t = se('<a class="chat_tab_wrap'+(noAnim ? '' : ' chat_tab_beforeanim')+(data.online ? ' chat_tab_online' : '')+'" id="chat_tab_icon_'+peer+'" href="'+peerHref+'" onclick="FastChat.itemsOut();return FastChat.togglePeer('+peer+', event);"><div class="chat_tab_imgcont"><div class="chats_sp chat_tab_online_icon"></div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div><div class="chat_tab_close" onclick="return FastChat.closeTabIcon('+peer+', event)"></div>'+imgRow+'</div></a>');
    Chat.itemsCont.insertBefore(t, Chat.itemsCont.firstChild);
    Chat.tabs[peer] = {el: t, name: data['name']};
    addClass(Chat.wrap, 'chat_expand');
    if (!noAnim) {
      animate(t, {height: 50, opacity: 1}, {duration: 100});
    }
    FastChat.checkChatHeight();
    Chat.scrollNode.scrollTop = 0;
  },

  checkChatHeight: function() {
    var height = getSize(Chat.itemsCont)[1];
    Chat.lastHeight = height;

    if (height > Chat.maxHeight) {
      if (!Chat.fixH) {
        Chat.fixH = true;
        addClass(Chat.scrollNode, 'chat_fix_height');
        setStyle(Chat.scrollNode, {height: Chat.maxHeight});
        addEvent(Chat.scrollNode, 'mousewheel', FastChat.scrollWrap);
        addEvent(Chat.scrollNode, 'DOMMouseScroll', FastChat.scrollWrap);
        FastChat.checkShadow();
      }
      Chat.scrollNode.scrollTop = height - Chat.maxHeight;
    } else if (Chat.fixH) {
      Chat.fixH = false;
      removeClass(Chat.scrollNode, 'chat_fix_height');
      setStyle(Chat.scrollNode, {height: 'auto'});
      removeEvent(Chat.scrollNode, 'mousewheel', FastChat.scrollWrap);
      removeEvent(Chat.scrollNode, 'DOMMouseScroll', FastChat.scrollWrap);
      FastChat.checkShadow();
    }

  },

  checkShadow: function() {
    var sc = intval(Chat.scrollNode.scrollTop);
    if (sc && Chat.fixH) {
      if (!Chat.shadowTop) {
        addClass(Chat.wrap, 'chat_scroll_top');
        fadeIn(geByClass1('chat_cont_sh_top', Chat.wrap), 200);
        Chat.shadowTop = true;
      }
    } else {
      if (Chat.shadowTop) {
        fadeOut(geByClass1('chat_cont_sh_top', Chat.wrap), 200);
        Chat.shadowTop = false;
      }
    }

    if ((Chat.lastHeight - sc > Chat.maxHeight - 48) && Chat.fixH) {
      if (!Chat.shadowBottom) {
        fadeIn(geByClass1('chat_cont_sh_bottom', Chat.wrap), 200);
        Chat.shadowBottom = true;
      }
    } else {
      if (Chat.shadowBottom) {
        fadeOut(geByClass1('chat_cont_sh_bottom', Chat.wrap), 200);
        Chat.shadowBottom = false;
      }
    }
  },

  scrollWrap: function(event) {
    if (!event) event = window.event;
    var delta = 0;
    if (event.wheelDeltaY || event.wheelDelta) {
      delta = (event.wheelDeltaY || event.wheelDelta) / 2;
    } else if (event.detail) {
      delta = -event.detail * 10
    }
    Chat.scrollNode.scrollTop -= delta;

    if (curFastChat.activeBox == curFastChat.clistBox) {
      curFastChat.pointerMargin = 0;
      FastChat.setPointer(false, curFastChat.pointerMargin, curFastChat.prevPointer);
    } else {
      curFastChat.pointerMargin = -Chat.scrollNode.scrollTop;
      FastChat.setPointer(true, curFastChat.pointerMargin, curFastChat.prevPointer);
    }

    FastChat.checkShadow();

    if (Chat.ttPeer) {
      setStyle(Chat.userNameTT, {top: Chat.ttTop - Chat.scrollNode.scrollTop + FastChat.itemsOffset});
    }

    return cancelEvent(event)
  },

  togglePeer: function(peer, event) {
    if (curFastChat.activeBox && curFastChat.activeBox.options.peer == peer) {
      curFastChat.activeBox.hide();
      FastChat.setActive(false);
      return false;
    } else {
      return FastChat.selectPeer(peer, event);
    }
  },

  selectPeer: function(peer, event, opts) {
    if (checkEvent(event)) {
      return true;
    }
    var animatePointer = hasClass(Chat.wrap, 'chat_active');
    var mem = curFastChat.friends && curFastChat.friends[peer+'_'], need = 0;
    if (curFastChat.tabs && curFastChat.tabs[peer]) {
      var box = curFastChat.tabs[peer].box;
      if (box.minimized) {
        box.unminimize(true);
      }
      FastChat.activateTab(peer);
      FastChat.movePointer(peer, animatePointer);
    } else {
      if (!opts) {
        opts = {};
      }
      opts.fixed = true;
      opts.onPeerAdded = function() {
        FastChat.movePointer(peer, animatePointer);
      }
      opts.onHistoryLoaded = FastChat.readLastMsgs.pbind(peer);
      FastChat.addPeer(peer, false, true, opts);
    }
    if(curFastChat.tabs[peer] && curFastChat.tabs[peer].iman) {
      curFastChat.tabs[peer].iman.unidle();
    }

    return false;
  },

  closeTabIcon: function(peer, ev, nohide) {
    if (curFastChat.activeBox && curFastChat.activeBox.options.peer == peer && !nohide) {
      curFastChat.activeBox.hide();
      FastChat.setActive(false);
    }
    var tabEl = ge('chat_tab_icon_'+peer);
    addClass(tabEl, 'chat_tab_hiding');
    delete Chat.tabs[peer];
    if (curFastChat.tabs[peer] && curFastChat.tabs[peer].box.options.fixed) {
      curFastChat.tabs[peer].iman.stop();
      delete curFastChat.tabs[peer];
    }
    var onAmin = function() {
      re(tabEl);
      if (tabEl) {
        tabEl = false;
        if (curFastChat.activeBox) {
          FastChat.movePointer(curFastChat.activeBox.options.peer, true);
        }
      }
      FastChat.checkChatHeight();
    };
    animate(tabEl, {height: 0, opacity: 0}, {duration: 100, onComplete: onAmin});
    if (!nohide) {
      FastChat.stateChange({op: 'closed', peer: peer});
    }
    var cnt = 0;
    for(var i in Chat.tabs) {
      cnt += 1;
    }
    if (!cnt) {
      removeClass(Chat.wrap, 'chat_expand');
    }
    FastChat.itemsOut();
    return cancelEvent(ev);
  },

  getPointerShift: function(isPeer, pm, tabDiff) {
    var bottomPointer = tabDiff - pm;

    var mh = Chat.maxHeight + 32;
    if (isPeer && bottomPointer < 56) {
      return bottomPointer - 56;
    } else if (isPeer && bottomPointer > mh) {
      return bottomPointer - mh;
    }
    return 0;
  },

  setPointer: function(isPeer, pm, tabDiff) {
    if (!curFastChat.activeBox) {
      return false;
    }

    var shift = FastChat.getPointerShift(isPeer, pm, tabDiff);
    var pointer = geByClass1('fc_tab_pointer', curFastChat.activeBox.wrap);
    setStyle(pointer, {marginTop: pm + shift});
    return shift;
  },

  movePointer: function(peer, aminate) {
    if (!curFastChat.activeBox) {
      return false;
    }
    var pOffset = geByClass1('fc_pointer_offset', curFastChat.activeBox.wrap);
    if (peer) {
      var selTab = ge('chat_tab_icon_'+peer);
      if (!selTab) {
        return false;
      }
      if (!Chat.fixH && selTab.nextSibling) {
        var topDiff = getXY(selTab.nextSibling)[1] - 50;
      } else if (selTab.nextSibling || Chat.fixH) {
        var topDiff = getXY(selTab)[1];
      } else {
        var topDiff = getXY(ge('chat_tab_wrap'))[1] - 50;
      }
      var tabDiff = 23 + getXY(Chat.cont)[1] - topDiff;
      var pm = -Chat.scrollNode.scrollTop;
    } else {
      var tabDiff = 28;
      var pm = 0;
    }
    var shift = FastChat.setPointer(peer, pm, tabDiff);

    if (aminate) {
      if (curFastChat.prevPointer) {
        var shiftPos = curFastChat.prevPointer - pm + shift;
        var tdiff = FastChat.getPointerShift(true, pm + shift, curFastChat.prevPointer);
        setStyle(pOffset, {bottom: curFastChat.prevPointer - tdiff + shift});
      }
      animate(pOffset, {bottom: tabDiff}, {duration: 100});
    } else {
      setStyle(pOffset, {bottom: tabDiff});
    }
    curFastChat.prevPointer = tabDiff;
  },

  setActive: function(box) {
    curFastChat.activeBox = box;
    if (box) {
      FastChat.moveBoxesLeft(box.pos[1]);
    }
  },

  moveBoxesLeft: function(x, rec) {
    var x  = x - 8;

    var mostRight = false;
    var mostRightX = 0;
    for (var i in curFastChat.tabs) {
      t = curFastChat.tabs[i];
      if (!rec) {
        t.box.movedLeft = false;
      }
      if (!t || t.box.options.fixed || !t.box.toBottom || t.box.movedLeft || t.box.noMove) {
        continue;
      }
      var pos = t.box.pos;
      if (pos[1] + pos[3] >= x) {
        if (pos[1] > mostRightX) {
          mostRight = t;
          mostRightX = pos[1];
        }
      }
    }
    if (mostRight) {
      var newX = x - mostRight.box.pos[3];
      var newY = mostRight.box.pos[0];
      if (newX < 0) {
        newX = 0;
      }
      mostRight.box.movedLeft = true;
      animate(mostRight.box.wrap, {left: newX}, 200);
      mostRight.box.pos = [newY, newX, mostRight.box.pos[2], mostRight.box.pos[3]];
      var wndInner = getWndInner();
      FastChat.stateChange({op: 'moved', peer: mostRight.box.options.peer, y: newY / wndInner[0], x: newX / wndInner[1]});
      if (newX) {
        FastChat.moveBoxesLeft(newX, true);
      }
    } else {
      FastChat.moveLeftY = 0;
    }
  },

  moveBoxAway: function(box, minLeft) {
    var x = minLeft - box.pos[3] - 20;
    var w = box.pos[3];
    var y = box.pos[0];
    var h = box.pos[2];
    var pass = false;
    while(x > 0 && !pass) {
      pass = true;
      for (var i in curFastChat.tabs) {
        var p = curFastChat.tabs[i].box.pos;
        if ((p[0]+(p[2] / 2) > y) && (p[1]+p[3] > x && p[1] < x + w)) {
          x -= p[3]
          pass = false;
        }
      }
    }
    if (x < 0) {
      x = positive(Math.random() * minLeft);
    }
    animate(box.wrap, {left: x}, 300);
    var wndInner = getWndInner();
    FastChat.stateChange({op: 'moved', peer: box.options.peer, y: y / wndInner[0], x: x / wndInner[1]});
  },

  pinTab: function(peer, ev, fast) {
    if (peer == -1) {
      var t = curFastChat.clistBox;
    } else {
      var t = curFastChat.tabs[peer].box;
    }
    t.options.fixed = false;
    removeClass(t.wrap, 'fc_fixed');
    //FastChat.closeTabIcon(peer, ev, true);
    FastChat.hideChatCtrl();
    FastChat.setActive(false);

    var newT = t.wrap.offsetTop;// - 8;
    var newL = t.wrap.offsetLeft - 10;
      setStyle(t.wrap, {left: t.wrap.offsetLeft, top: t.wrap.offsetTop, right: 'auto', bottom: 'auto'});
    if (!fast) {
      animate(t.wrap, {left: newL, top: newT}, 300);
    }
    t.pos = [newT, newL, t.pos[2], t.pos[3]];

    t.toRight = false;
    t.toBottom = true;
    addClass(t.wrap, 'fc_tobottom');

    var startW = t.resizeableW.clientWidth - intval(getStyle(t.resizeableW, 'paddingRight')) - intval(getStyle(t.resizeableW, 'paddingLeft'));
    var startH = t.resizeableH.clientHeight - intval(getStyle(t.resizeableH, 'paddingBottom')) - intval(getStyle(t.resizeableH, 'paddingTop'));

    var wndInner = getWndInner();
    if (peer == -1) {
      FastChat.stateChange({op: 'clist_toggled', val: 1, y: t.toBottom ? -1 : t.pos[0] / wndInner[0], x: t.toRight ? -1 : t.pos[1] / wndInner[1]});
    } else {
      FastChat.stateChange({op: 'unfixed', peer: peer, y: t.toBottom ? -1 : t.pos[0] / wndInner[0], x: t.toRight ? -1 : t.pos[1] / wndInner[1], h: startH / wndInner[0], w: startW / wndInner[1]});
    }
    t.noMove = true;
    FastChat.moveBoxesLeft(newL);
    t.noMove = false;
  },

  addPeer: function (peer, events, force, opts) {
    if (!opts) {
      opts = {};
    }
    var mem = curFastChat.friends && curFastChat.friends[peer+'_'], need = 0;
    if (force) {
      FastChat.stateChange({op: 'added', peer: peer, fixed: opts.fixed});
    } else if (curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && events) {
      force = true;
    }
    if (mem) {
      var data = {name: mem[0], photo: mem[1], fname: mem[2], hash: mem[3], online: curFastChat.onlines[peer], sex: mem[4]};
      //if (opts.fixed) {
      FastChat.addTabIcon(peer, data, opts.noAnim)
      //}
      FastChat.addBox(peer, data, opts);
      if (events) {
        curFastChat.tabs[peer].auto = 1;
        FastChat.imFeed(peer, events);
      } else {
        if (!opts || !opts.nofocus) {
          FastChat.activateTab(peer);
        }
        if (!curFastChat.onlines[peer]) {
          FastChat.tabNotify(peer, 'unavail');
        }
        need |= 2;
      }
    } else {
      need = 3;
    }
    if (need) {
      if (force) {
        curFastChat.needPeers[peer] = [need, events, false, opts];
        FastChat.getPeers();
      } else {
        curFastChat.needPeers[peer] = [need, events, setTimeout(FastChat.getPeers, irand(150, 200)), opts];
        FastChat.lcSend('needPeer', {id: peer, mask: need});
      }
    }
  },
  getPeers: function () {
    var q = [], peers = {};
    each (curFastChat.needPeers, function (peer) {
      q.push(peer);
      q.push(this[0]);
      clearTimeout(this[2]);
      peers[peer] = this[0];
    });
    if (!q.length) {
      return;
    }
    FastChat.lcSend('fetchingPeers', peers);
    ajax.post('al_im.php', {act: 'a_get_fc_peers', peers: q.join(',')}, {
      onDone: function (data) {
        FastChat.gotPeers(data);
        FastChat.lcSend('gotPeers', data);
      }
    });
  },
  gotPeers: function (data) {
    each (curFastChat.needPeers, function (peer) {
      if (data[peer]) {
        if (data[peer] < 2e9) {
          curFastChat.friends[peer + '_'] = [
            data[peer].name,
            data[peer].photo,
            data[peer].fname,
            data[peer].hash,
            intval(data[peer].sex)
          ];
        }
        var events = this[1], opts = this[3];
        if (!(this[0] & 2) || data[peer].history !== undefined) {
          clearTimeout(this[2]);
          delete curFastChat.needPeers[peer];
        }

        if (!curFastChat.tabs[peer]) {
          if (opts.fixedLoad) {
            FastChat.addTabIcon(peer, data[peer]);
          } else {
            FastChat.addTabIcon(peer, data[peer]);
            FastChat.addBox(peer, data[peer], opts);
            if (events) {
              curFastChat.tabs[peer].auto = 1;
              FastChat.imFeed(peer, events);
            } else {
              if (this[0] & 2) {
                FastChat.gotHistory(peer, data[peer].history);
              }
              if (!opts || !opts.nofocus) {
                FastChat.activateTab(peer);
              }
            }
          }
          //}
        } else {
          FastChat.gotHistory(peer, data[peer].history);
        }

        if (opts.onHistoryLoaded) {
          opts.onHistoryLoaded();
        }
      }
    });
  },
  gotHistory: function (peer, hist) {
    if (!isArray(hist) || !hist.length || !hist[0]) {
      return;
    }
    var tab = curFastChat.tabs[peer], log = hist[0], msgs = hist[1];
    tab.offset = hist[2];
    extend(tab.msgs, msgs);
    each(msgs, function (k, v) {
      if (!v[0] && v[1]) {
        tab.unread++;
      }
    });
    val(tab.log, log);
    tab.logWrap.scrollTop = tab.logWrap.scrollHeight;
    setTimeout(function () {
      tab.logWrap.scrollTop = tab.logWrap.scrollHeight;
      tab.scroll && tab.scroll.update(false, true);
    }, 10);
  },
  decHashCb: function(hash) {
    (function(_){curFastChat.decodedHashes[_]=(function(__){var ___=ge?'':'___';for(____=0;____<__.length;++____)___+=__.charAt(__.length-____-1);return geByClass?___:'___';})(_.substr(_.length-5)+_.substr(4,_.length-12));})(hash);
  },
  decodehash: function(hash) {
    if (!curFastChat.decodedHashes)
      curFastChat.decodedHashes = {};
    if (!curFastChat.decodedHashes[hash]) {
      FastChat.decHashCb(hash);
    }
    return curFastChat.decodedHashes[hash];
  },
  onMyTyping: function (peer) {
    peer = intval(peer);
    var tab = curFastChat.tabs[peer];
    if (peer <= -2e9 || !tab) return;
    var ts = vkNow();
    if (curFastChat.myTypingEvents[peer] && ts - curFastChat.myTypingEvents[peer] < 5000) {
      return;
    }
    curFastChat.myTypingEvents[peer] = ts;
    ajax.post('al_im.php', {act: 'a_typing', peer: peer, hash: tab.sendhash, from: 'fc'});
  },
  updateTypings: function () {
    each(curFastChat.tabs || {}, function (peer, v) {
      FastChat.updateTyping(peer);
    });
  },
  updateTyping: function (peer, force) {
    var tab = curFastChat.tabs[peer],
        typings = [],
        lastEv = curFastChat.typingEvents[peer],
        sex,
        ts = vkNow(),
        el = ge('fc_tab_typing' + peer);

    if (peer < 2e9) {
      if (lastEv && ts - lastEv < 6000) {
        typings.push(tab.fname || tab.name || '');
        sex = tab.sex;
      }
    } else {
      var mems = tab.data.members;
      each (lastEv || {}, function (k, v) {
        if (v && ts - v < 6000 && mems[k] && mems[k].first_name) {
          typings.push(mems[k].first_name || '');
          sex = mems[k].sex;
        }
      });
    }
    if (!typings.length) {
      return force ? setStyle(el, 'opacity', 0) : fadeTo(el, 1000, 0);
    }
    if (typings.length == 1) {
      val(el, langSex(sex, lang.mail_im_typing).replace('{user}', typings[0]));
    } else {
      var lastUser = typings.pop();
      val(el, getLang('mail_im_multi_typing').replace('{users}', typings.join(', ')).replace('{last_user}', lastUser));
    }
    return force ? setStyle(el, 'opacity', 1) : fadeTo(el, 200, 1);
  },
  readLastMsgs: function (peer) {
    var t = this, tab = curFastChat.tabs[peer];
    if (!peer || !tab) return;

    if (!tab.markingRead && tab.unread) {
      var unread = [];
      for (var i in tab.msgs) {
        if (!tab.msgs[i][0] && tab.msgs[i][1]) {
          unread.push(i);
        }
      }
      FastChat.markRead(peer, unread);
    }
    FastChat.changePeerCounter(peer, 0, 0);
  },
  markRead: function(peer, unread) {
    if (!unread.length) return;
    var t = this, tab = curFastChat.tabs[peer];
    tab.markingRead = true;

    ajax.post('al_im.php', {act: 'a_mark_read', peer: peer, ids: unread, hash: tab.sendhash}, {
      onDone: function (res, newmsg) {
        tab.markingRead = false;

        for (var i in unread) {
          var msgId = unread[i], row = ge('fc_msg' + msgId), parent = row && row.parentNode;
          if (!row) continue;
          if (tab.msgs[msgId] && tab.msgs[msgId][1]) {
            tab.msgs[msgId][1] = 0;
            if (!tab.msgs[msgId][0]) {
              tab.unread--;
            }
          }
          removeClass(row, 'fc_msg_unread');
          if (hasClass(parent.parentNode, 'fc_msgs_unread')) {
            each (parent.childNodes, function () {
              if (!hasClass(this, 'fc_msg_unread')) {
                removeClass(parent.parentNode, 'fc_msgs_unread');
                return false;
              }
            });
          }
        }
        if (tab.unread > 0) {
          tab.unread = 0;
          each (tab.msgs, function () {
            if (!this[0] && this[1]) tab.unread++;
          });
        }
        FastChat.updateUnreadTab(peer);
      },
      onFail: function () {
        tab.markingRead = false;
      }
    });
  },
  mkMsg: function (msg) {
    var message = clean(msg).replace(/\n/g, '<br>'),
        susp = false;

    message = message.replace(/([a-zA-Z\-_\.0-9]+@[a-zA-Z\-_0-9]+\.[a-zA-Z\-_\.0-9]+[a-zA-Z\-_0-9]+)/g, function(url) {
      return '<a href="/write?email='+url+'" target="_blank">'+url+'</a>'
    });

    message = message.replace(/(^|[^A-Za-z0-9À-ßà-ÿ¸¨\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9À-ßà-ÿ¸¨](?:[A-Za-z\$0-9\-\_À-ßà-ÿ¸¨]*[A-Za-z\$0-9À-ßà-ÿ¸¨])?\.){1,5}[A-Za-z\$ðôóêîíëàéíñòÐÔÓÊÎÍËÀÉÍÑÒ\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.~=;:]+|\[[A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.~=;:]*[A-Za-z0-9À-ßà-ÿ¸¨\_#%?+\/\$~=]|\[[A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9À-ßà-ÿ¸¨\-\_#%?+\/\$.,~=;:]*\)))?)?)/ig, function () { // copied to notifier.js:3401
      var matches = Array.prototype.slice.apply(arguments),
          prefix = matches[1] || '',
          protocol = matches[2] || 'http://',
          domain = matches[3] || '',
          url = domain + (matches[4] || ''),
          full = (matches[2] || '') + matches[3] + matches[4];

      if (domain.indexOf('.') == -1 || domain.indexOf('..') != -1) return matches[0];
      var topDomain = domain.split('.').pop();
      if (topDomain.length > 7 || indexOf('info,name,academy,aero,arpa,coop,media,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,ðô,óêð,ñàéò,îíëàéí,ñðá,cat,pro,local'.split(','), topDomain) == -1) return matches[0];

      if (matches[0].indexOf('@') != -1) {
        return matches[0];
      }
      try {
        full = decodeURIComponent(full);
      } catch (e){}

      if (full.length > 55) {
        full = full.substr(0, 53) + '..';
      }
      full = clean(full).replace(/&amp;/g, '&');

      if (!susp && domain.match(/^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/)) {
        url = replaceEntities(url).replace(/([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, encodeURIComponent);
        var tryUrl = url, hashPos = url.indexOf('#/'), mtch, oncl = '';
        if (hashPos >= 0) {
          tryUrl = url.substr(hashPos + 1);
        } else {
          hashPos = url.indexOf('#!');
          if (hashPos >= 0) {
            tryUrl = '/' + url.substr(hashPos + 2).replace(/^\//, '');
          }
        }
        mtch = tryUrl.match(/^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/);
        if (mtch) {
          if (mtch[1].length < 32) {
            oncl = ' mention_id="' + mtch[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"';
          }
        }
        return prefix + '<a href="'+ (protocol + url).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" target="_blank"' + oncl + '>' + full + '</a>';
      }
      return prefix + '<a href="away.php?utf=1&to=' + encodeURIComponent(protocol + replaceEntities(url)) + '" target="_blank" onclick="return goAway(\''+ clean(protocol + url) + '\', {}, event);">' + full + '</a>';
    });

    message = Emoji.emojiToHTML(message, 1);

    return message;
  },
  getEditCont: function(emojiId) {
    //return '<textarea class="fc_tab_txt text"></textarea>';
    stManager.add(['emoji.js']);
    return '<div class="emoji_cont">'+Emoji.tplSmile(emojiId, getLang('mail_emoji_hint'), ' fc_emoji')+'<div class="fc_editable" tabindex="0" contenteditable="true"></div></div>';
  },
  getVal: function(obj) {
    //return obj.value;
    return Emoji ? Emoji.editableVal(obj) : '';
  },

  onTxtResize: function(peer) {
    var tab = curFastChat.tabs[peer];
    var txt = geByClass1('fc_tab_txt', tab.wrap);
    var h = getSize(txt)[1];
    if (h > 40) {
      var hDiff = positive(h - 40);
      var resH = intval(getSize(tab.box.resizeableH)[1]);
      if (resH + tab.hDiff - hDiff < 40) {
        hDiff = resH + tab.hDiff - 40;
      }
      setStyle(tab.box.resizeableH, {height: resH + (tab.hDiff || 0) - hDiff});
      tab.hDiff = hDiff;
      FastChat.fixResized(tab, tab.wrap.clientWidth, true);
    } else if (tab.hDiff) {
      var resH = intval(getSize(tab.box.resizeableH)[1]);
      setStyle(tab.box.resizeableH, {height: resH + tab.hDiff});
      tab.hDiff = 0;
      FastChat.fixResized(tab, tab.wrap.clientWidth, true);
    }
  },

  initTab: function (peer, data, wrap) {
    var txt = geByClass1('fc_editable', wrap);
    var tab = curFastChat.tabs[peer] = {
      name: data.name,
      fname: data.fname,
      photo: data.photo,
      link: data.alink || '/id' + peer,
      hash: data.hash,
      sendhash: FastChat.decodehash(data.hash),
      sex: data.sex || 0,
      data: data.data || {},
      online: data.online,
      msgs: {},
      msgscount: 0,
      unread: 0,
      sent: 0,
      sentmsgs: [],
      box: false,
      wrap: wrap,
      //txt: geByClass1('fc_tab_txt', wrap, 'textarea'),
      editable: 1,
      txt: txt,
      txtWrap: txt.parentNode.parentNode,
      logWrap: geByClass1('fc_tab_log', wrap),
      log: geByClass1('fc_tab_log_msgs', wrap),
      notify: geByClass1('fc_tab_notify_wrap', wrap),
      title: geByClass1('fc_tab_title', wrap),
      btn: geByClass1('fc_tab_button', wrap)
    }

    var lastTxtH = 30;
    tab.addMediaBtn = geByClass1('fc_tab_attach', wrap);
    if (tab.editable) {
      cur.t = tab;

      tab.emojiId = Emoji.init(tab.txt, {
        controlsCont: geByClass1('fc_tab_txt_wrap', wrap),
        ttDiff: -46,
        topShift: 281,
        ttShift: 0,
        rPointer: true,
        noRce: true,
        peer: peer,
        isChat: true,
        noCtrlSend: true,
        onSend: FastChat.send.pbind(peer),
        checkEditable: FastChat.checkEditable,
        onResize: function() {
          FastChat.onTxtResize(peer);
        },
        addMediaBtn: tab.addMediaBtn,
        onShow: function() {
          cssAnim(tab.scroll.scrollbar, {opacity: 0}, {duration: 400});
          enterWorks = false;
        },
        onHide: function() {
          cssAnim(tab.scroll.scrollbar, {opacity: 1}, {duration: 400});
          setTimeout(function() {
            enterWorks = true;
          }, 0);
        },
        onEsc: function(e) {
          tab.box.hide();
          return cancelEvent(e);
        },
        onStickerSend: function(stNum) {
          var msgId = --tab.sent;
          FastChat.send(peer, stNum);
        }
      });
    } else {
      var minH = 15;
      autosizeSetup(tab.txt, {minHeight: minH, maxHeight: 42});
      tab.txt.autosize.options.onResize = function (h) {
        if (tab.box.minimized) {
          return;
        }
        var txtH = h == 42 ? 42 : minH;
        if (txtH != h) {
          setStyle(tab.txt, 'height', txtH);
        }
        if (txtH != lastTxtH) {
          setStyle(tab.logWrap, 'height', tab.logWrap.clientHeight - txtH + lastTxtH); // bottom padding
          lastTxtH = txtH;
          tab.scroll && tab.scroll.update(false, true);
        }
      };
    }

    tab.imPeerMedias = {};
    tab.imSortedMedias = {};
    tab.previewEl = geByClass1('fc_tab_preview', wrap);
    stManager.add(['page.js', 'page.css'], function() {
      tab.imMedia = initAddMedia(tab.addMediaBtn, tab.previewEl, [['photo', getLang('profile_wall_photo')], ['video', getLang('profile_wall_video')], ['audio', getLang('profile_wall_audio')], ['doc', getLang('profile_wall_doc')], ['map', getLang('profile_wall_map')]], {
        mail: 1,
        tooltip: 1,
        topOffset: 0,
        forceUp: 1,
        global: 1,
        toId: vk.id
      });
      //val(tab.previewEl, '');
      tab.imMedia.onChange = setTimeout.pbind(function() {
        if (curFastChat.sendOnUpload) {
          FastChat.send(curFastChat.sendOnUpload);
          curFastChat.sendOnUpload = undefined;
        }
        FastChat.onTxtResize(peer);
      }, 0);
    });
    return tab;
  },
  addBox: function (peer, data, options) {
    if (curFastChat.tabs[peer] !== undefined) {
      return;
    }
    var editCont = FastChat.getEditCont(Emoji.last);
    options = options || {};
    curFastChat.tabs[peer] = {};

    var wrap = se(rs(FastChat.tplBox, {id: peer, name: data.name, myphoto: Notifier.fixPhoto(curFastChat.me.photo, true), classname: data.online ? (data.online > 0 && data.online < 6 ? ' fc_tab_mobile' : ' fc_tab_online') : '', cont: editCont}));

    if (options.fixed && curFastChat.activeBox) {
      curFastChat.activeBox.hide(0, false, {noState: true});
    }
    var tab = FastChat.initTab(peer, data, wrap);
    wndInner = getWndInner(),
    opts = {
      id: 'fc_peer' + peer,
      marginFixedToLayer: true,
      peer: peer,
      movable: geByClass1('fc_tab_head', wrap),
      closer: geByClass1('fc_tab_close_wrap', wrap, 'a'),
      //minimizer: true, //geByClass1('fc_tab_min_wrap', wrap),
      resizeableH: tab.logWrap,
      startHeight: 250,
      startWidth: 252,
      fixed: options.fixed,
      minH: 150,
      minW: 252,
      nofocus: true,
      onFocus: function (e) {
        if (tab.auto) {
          FastChat.stateChange({op: 'added', peer: peer});
          delete tab.auto;
        }

        FastChat.restoreDraft(peer);
        if (tab.editable) {
          Emoji.editableFocus(tab.txt, false, true);
        } else {
          elfocus(tab.txt);
        }
        if (tab.wrap.clientWidth) setStyle(tab.title, {maxWidth: tab.wrap.clientWidth - 71});
        if (!tab.editable) {
          setStyle(tab.txt.autosize.helper, {width: getStyle(tab.txt, 'width', false)});
        }
        tab.scroll && tab.scroll.update(false, true);
        setTimeout(elfocus.pbind(tab.txt), 10);
      },
      onHide: function() {
        if (options.fixed) {
          FastChat.hideChatCtrl();
        }

        if (curFastChat.activeBox) {
          if (peer == curFastChat.activeBox.options.peer) {
            FastChat.setActive(false);
          }
        }
      },
      onClose: function (pos) {
        this.onHide();
        if (options && options.beforeClose) {
          options.beforeClose();
        }
        var tabs = curFastChat.tabs, posSeq = tabs[peer].posSeq;
        delete tabs[peer];
        if (!curNotifier.isIdle) {
          FastChat.stateChange({op: 'hidden', peer: peer});
        }
        if (!posSeq) return;

        var i, seqsTabs = {}, seqs = [], seq, box, prevPos, anim;
        each (tabs, function () {
          if (this.posSeq > posSeq) {
            seqsTabs[this.posSeq] = this;
            seqs.push(this.posSeq);
          }
        });
        seqs.unshift(posSeq);
        seqs.sort();
        anim = (!browser.msie && seqs.length < 10);
        for (i = 1; i < seqs.length; i++) {
          seq = seqs[i];
          box = seqsTabs[seq].box;
          prevPos = i > 1 ? seqsTabs[seqs[i - 1]].box.pos : pos;
          if (anim) {
            animate(box.wrap, {left: prevPos[1]}, 100, function (box) {
              box._update_pos();
            }.pbind(box));
          } else {
            setStyle(box.wrap, {left: prevPos[1]});
          }
        }
        if (!anim) {
          for (i = 1; i < seqs.length; i++) {
            box = seqsTabs[seqs[i]].box;
            box._update_pos();
          }
        }
      },
      onMinimize: function (val) {
        FastChat.stateChange({op: 'minimized', peer: peer, val: val});
        FastChat.fixResized(tab, tab.wrap.clientWidth, true);
        if (!val) {
          tab.txt.blur();
          FastChat.restoreDraft(peer);
        }
      },
      onResizeEnd: function (h, w) {
        var wndInner = getWndInner(), pos = tab.box.pos;
        tab.scroll && tab.scroll.show();
        FastChat.fixResized(tab, w, true);
        FastChat.stateChange({op: 'resized', peer: peer, h: h / wndInner[0], w: w / wndInner[1], y: tab.box.toBottom ? -1 : pos[0] / wndInner[0], x: tab.box.toRight ? -1 : pos[1] / wndInner[1]});

      },
      onResize: function (h, w) {
        FastChat.fixResized(tab, w);
        var el = geByClass1('fc_tab_title', tab.box.content);
        setStyle(el, {width: w - 78});
      },
      onResizeStart: function () {
        delete tab.posSeq;
        tab.scroll && tab.scroll.hide();
        val(tab.notify, '');
        clearTimeout(tab.hideNotifyTO);
      },
      onDragEnd: function (y, x) {
        delete tab.posSeq;
        FastChat.stateChange({op: 'moved', peer: peer, y: y, x: x});
      }
    };

    if (options) {
      extend(opts, options);
    }

    if (opts.startLeft === undefined && opts.startRight === undefined) {
      var xs = [], minTop = wndInner[0] - 350, pos = curFastChat.clistBox.pos;
      var snapRight = false;
      if (window.Call && (Call.box || Call.invitation)) {
        var size = Call.calcBoxPos();
        xs.push([size.x, size.x + size.w]);
        snapRight = true;
      }
      if (pos[0] + pos[2] > minTop && (curFastChat.clistBox.visible || !snapRight)) {
        xs.push([pos[1], pos[1] + pos[3]]);
      }
      each (curFastChat.tabs, function (k) {
        if (!(pos = this.box && this.box.pos) || k == peer) {
          return;
        }
        if (pos[0] + pos[2] > minTop) {
          xs.push([pos[1], pos[1] + pos[3]]);
        }
      });
      // var startX = 15, endX = wndInner[1] - 260 - sbWidth(),
      // var w = ge('page_layout').offsetWidth, startX = (lastWindowWidth + w) / 2 - 240, endX = 0,
      var startX = lastWindowWidth - 262 - sbWidth(), endX = 0,
          minLayersX = false, minLayersCnt = false, curX, curCnt, j, sign = endX > startX ? 1 : -1;

      for (curX = startX; sign * curX < sign * endX; curX += sign * 135) {
        curCnt = 0;
        for (j = 0; j < xs.length; j++) {
          if (curX > xs[j][0] - 260 && curX < xs[j][1]) {
            curCnt++;
          }
          if (curX > xs[j][0] - 10 && curX < xs[j][0] + 10) {
            curCnt += 1.1;
          }
        }
        if (minLayersX === false || curCnt < minLayersCnt) {
          minLayersX = curX;
          minLayersCnt = curCnt;
        }
      }

      if (snapRight && minLayersCnt) {
        minLayersX = startX;
      }

      extend(opts, {
        startBottom: 0,
        startLeft: minLayersX
      });
    }
    var emp = true, i;
    for (i in (options || {})) {
      if (i != 'nofocus') {
        emp = false;
        break;
      }
    }
    if (emp) {
      tab.posSeq = ++curFastChat.posSeq;
    }
    /*if (!opts.minimized && !opts.fixed && options !== undefined && nav.objLoc[0] == 'im' &&
        nav.objLoc.sel == FastChat.nicePeer(peer)
      ) {
      opts.minimized = true;
      cur.hiddenChats[peer] = 1;
    }*/

    // fixed
    if (opts.fixed) {
      //var clistSize = getSize(curFastChat.clistBox.content);
      opts.startHeight = curFastChat.clistH - 1;
      opts.startWidth = curFastChat.clistW;
      opts.onShow =  FastChat.showChatCtrl;
    }
    tab.box = new RBox(wrap, opts);
    tab.iman = new IdleManager({
      id: 'tab' + peer,
      element: tab.box.content,
      onUnIdleCb: function() {
        FastChat.readLastMsgs(peer);
      },
      parentManager: curNotifier.idle_manager,
      idleTimeout: 10000
    });
    curFastChat.tabs[peer].iman.start();

    if (opts.fixed) {
      FastChat.setActive(tab.box);
    }

    tab.scroll = new Scrollbar(tab.logWrap, {
      prefix: 'fc_',
      nomargin: true,
      nokeys: true,
      global: true,
      right: vk.rtl ? 'auto' : 1,
      left: !vk.rtl ? 'auto' : 1,
      onScroll: FastChat.onScroll.pbind(tab)
    });

    if (!opts.minimized && options &&
        (options.startLeft !== undefined ||
        options.startTop !== undefined ||
        options.startWidth !== undefined ||
        options.startHeight !== undefined)) {
      tab.box._wnd_resize(wndInner[0], wndInner[1], true);
    }
    var enterWorks = true;

    if (tab.wrap.clientWidth) setStyle(tab.title, {maxWidth: tab.wrap.clientWidth - 71});
    addEvent(tab.txt, 'keydown focus mousedown keyup', function (e) {
      if (e.type == 'mousedown') {
        if (curRBox.active == tab.box.id) {
          (e.originalEvent || e).cancelBubble = true;
        }
        return;
      }

      if (e.type == 'keydown' && e.ctrlKey && e.keyCode == KEY.RETURN) {
        var val = this.value;
        if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
          var start = this.selectionStart;
          this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
          this.selectionStart = this.selectionEnd = start + 1;
        } else if (document.selection && document.selection.createRange) {
          this.focus(e);
          var range = document.selection.createRange();
          range.text = "\r\n";
          range.collapse(false);
          if (browser.opera) {
            range.moveEnd('character', 0);
            range.moveStart('character', 0);
          }
          range.select();
        }
        if (tab.editable) {
          FastChat.checkEditable(tab.emojiId, tab.txt);
        } else {
          tab.txt.autosize.update();
          setTimeout(function () {
            tab.txt.autosize.update();
          }, 0);
        }
        return false;
      }
      if (e.type == 'focus') {
        curFastChat.peer = peer;
      } else if (e.type == 'keyup') {
        var lastVal = tab.lastVal || '',
            curVal = FastChat.getVal(this);
        if (curVal.length != lastVal.length ||
            curVal != lastVal) {
          if (curVal) {
            FastChat.onMyTyping(peer);
          }
          tab.lastVal = curVal;
        }
        clearTimeout(tab.saveDraftTO);
        tab.saveDraftTO = setTimeout(FastChat.saveDraft.pbind(peer), curVal.length ? 300 : 0);
        FastChat.checkEditable(tab.emojiId, tab.txt);
      }
    });
    FastChat.restoreDraft(peer);
    if (opts.onPeerAdded) {
      opts.onPeerAdded();
    }
  },

  onScroll: function(tab) {
    var sc = tab.scroll.obj.scrollTop
    var moreCont = geByClass1('fc_msgs_more', tab.logWrap);
    if (sc < 200 && isVisible(moreCont)) {
      moreCont.click();
    }
  },

  loadMore: function(peer, obj) {
    var tab = curFastChat.tabs[peer];
    offset = tab.offset;
    if (tab.moreLoading) {
      return false;
    }
    var back = obj.innerHTML;
    tab.moreLoading = true;
    ajax.post('al_im.php', {act: 'a_history', peer: peer, offset: offset, from: 'fc'}, {
      onDone: function(hist) {
        if (!hist[3]) {
          hide(obj);
        }
        var cont = obj.parentNode;
        var prevHeight = cont.clientHeight;
        cont.insertBefore(cf(hist[0]), obj.nextSibling)
        var heightDiff = cont.clientHeight - prevHeight;
        if (heightDiff) {
          tab.logWrap.scrollTop += heightDiff;
        }
        tab.scroll.update();
        tab.offset = hist[2];
        tab.moreLoading = false;
        FastChat.onScroll(tab);
      },
      onFail: function() {
        tab.moreLoading = false;
      },
      showProgress: function() {
        obj.innerHTML = '<div class="progress_inline"></div>';
        addClass(obj, 'fc_more_loading');
      },
      hideProgress: function() {
        obj.innerHTML = back;
        removeClass(obj, 'fc_more_loading');
      }
    });
  },

  sendOnResponse: function(response, msgId, tab) {
    if (response.version && intval(response.version) > curFastChat.version) {
       FastChat.updateVersion(response.version);
       return;
    }

    var row = ge('fc_msg' + msgId), realMsgId = response.msg_id, pos = indexOf(msgId, tab.newmsgs);
    if (!row) return;

    if (response.media) {
      var msgOpts = {sticker: intval(response.sticker)};
      FastChat.lcSend('gotMedia', {msgId: msgId, peer: tab.box.options.peer, text: response.media, msgOpts: msgOpts});
      FastChat.gotMsgMedia(tab.box.options.peer, msgId, response.media, msgOpts);
    }
    ++tab.msgscount;
    if (pos != -1) {
      tab.newmsgs.splice(pos, 1);
    }
    row.id = 'fc_msg' + realMsgId;

    tab.msgs[realMsgId] = [1, 1];
  },

  checkEditable: function(optId, obj) {
    Emoji.checkEditable(optId, obj, {height: 34});
  },

  fixResized: function (tab, w, stopped) {
    if (!tab) return;
    tab.logWrap.scrollTop = tab.logWrap.scrollHeight;
    if (w > 0) {
      setStyle(tab.title, {maxWidth: w - 71});
    }
    if (stopped) {
      if (!tab.editable) {
        setStyle(tab.txt.autosize.helper, {width: getStyle(tab.txt, 'width', false)});
      }
      tab.scroll && tab.scroll.update(false, true);
    }
  },

  activateTab: function (peer) {
    var box = curFastChat.tabs[peer].box;
    if (curFastChat.activeBox && curFastChat.activeBox != box) {
      curFastChat.activeBox.hide(0, false, {noState: true});
    }
    box.show();
    if (box.options.fixed) {
      FastChat.setActive(box);
    }
  },

  updateUnreadTab: function (peer) {
    var tab = curFastChat.tabs[peer];
    if (!tab) return;
    val(tab.title, tab.name + (tab.unread ? ' <span class="fc_tab_count">(' + tab.unread + ')</span>' : ''));
    val('fc_contact_unread' + peer, tab.unread ? ' <b>+' + tab.unread + '</b>' : '');
    FastChat.changePeerCounter(peer, false, tab.unread);
  },
  blinkTab: function (peer) {
    var tab = curFastChat.tabs[peer];
    if (tab.blinking || curFastChat.peer == peer) return;
    tab.blinking = true;
    clearTimeout(tab.blinkingTO);
    var wrap = tab.box.wrap, className = wrap.className, zIndex = Math.min(BASIC_CHAT_ZINDEX, intval(getStyle(wrap, 'zIndex')));
    setStyle(wrap, {zIndex: BASIC_CHAT_ZINDEX});
    removeClass(wrap, 'rb_inactive');
    tab.blinkingTO = setTimeout(function () {
      delete tab.blinking;
      delete tab.blinkingTO;

      if (getStyle(wrap, 'zIndex') != BASIC_CHAT_ZINDEX) {
        return;
      }
      setStyle(wrap, {zIndex: zIndex});
      wrap.className = className;
    }, 2000);
  },

  createProgress: function(row, id, after, cls) {
    var el = ce('span', {className: 'fc_msg_progress progress ' + cls, id: 'fc_msg_progress' + id});
    row.insertBefore(el, after);
    return el;
  },

  removeProgress: function(id) {
    re('fc_msg_progress' + id);
  },

  send: function (peer, stickerId) {
    var t = this, tab = curFastChat.tabs[peer], msg = trim(tab.editable ? Emoji.editableVal(tab.txt) : val(tab.txt));
    if (stickerId) {
      var media = [['sticker', stickerId]];
      msg = '';
    } else {
      var media = tab.imMedia ? tab.imMedia.getMedias() : []
    }
    var typer = ge('fc_tab_typing' + peer);
    var progressBars = geByClass1('page_progress_preview', tab.wrap);
    if (progressBars && progressBars.childNodes.length > 0) {
      curFastChat.sendOnUpload = peer;
      var row = geByClass('fc_tab_log', tab.wrap)[0];
      FastChat.createProgress(row, peer, row.lastChild, 'fc_msg_progress_transparent_right');
      typer.style.visibility = 'hidden';
      return;
    } else {
      curFastChat.sendOnUpload = false;
      FastChat.removeProgress(peer);
      typer.style.visibility = 'visible';
    }
    if ((!msg && !media.length)/* || tab.sending*/) {
      if (tab.editable) {
        Emoji.editableFocus(tab.txt, false, true);
      } else {
        elfocus(tab.txt);
      }
      return;
    }
    var msgId = --tab.sent;
    var params = {
      act: 'a_send',
      to: peer,
      hash: tab.sendhash,
      msg: msg,
      from: 'fc',
      media: [],
    };
    for (var i = 0, l = media.length, v; i < l; ++i) {
      if (v = media[i]) {
        params.media.push(v[0] + ':' + v[1]);
      }
    }
    params.media = params.media.join(',');
    tab.sending = true;
    Emoji.ttHide(tab.emojiId);
    ajax.post('al_im.php', params, {
      onDone: function(response) {
        clearTimeout(tab.saveDraftTO);
        FastChat.saveDraft(peer);
        FastChat.sendOnResponse(response, msgId, tab);
      },
      onFail: function(error) {
        FastChat.error(peer, error || getLang('global_unknown_error'));

        elfocus(tab.txt);
        val(tab.txt, msg);
        if (tab.editable) {
          FastChat.checkEditable(tab.emojiId, tab.txt);
        } else {
          tab.txt.autosize.update();
        }

        var row = ge('fc_msg' + msgId);
        if (!row) return;
        row.appendChild(ce('span', {className: 'fc_msg_error', innerHTML: getLang('global_error')}));
        FastChat.scroll(peer);
        return true;
      },
      showProgress: function () {
        tab.sending = true;
        tab.sendProgressTO = setTimeout(function () {
          var row = ge('fc_msg' + msgId);
          if (!row) return;
          FastChat.createProgress(row, msgId, row.firstChild);
        }, 2000);
      },
      hideProgress: function () {
        tab.sending = false;
        clearTimeout(tab.sendProgressTO);
        FastChat.removeProgress(msgId);
      }
    });
    re('fc_error' + peer);
    tab.sentmsgs.push(msgId);

    if (!stickerId) {
      val(tab.txt, '');
      if (tab.imMedia) {
        tab.imMedia.unchooseMedia();
      }
    }

    var mediaBit = params.media ? 1 : 0;
    if (stickerId) {
      mediaBit += 8;
    }
    FastChat.addMsg(FastChat.prepareMsgData([peer, msgId, 1 | 2, FastChat.mkMsg(msg), mediaBit]));
    delete curFastChat.myTypingEvents[peer];
    if (tab.editable) {
      FastChat.checkEditable(tab.emojiId, tab.txt);
    } else {
      tab.txt.autosize.update(false, true);
    }
    elfocus(tab.txt);
    FastChat.scroll(peer);
  },
  saveDraft: function (peer) {
    var tab = curFastChat.tabs[peer],
        txt = (tab || {}).txt;
    if (!txt || !tab) return;
    var message = Emoji.editableVal(txt);
    var data = {
      txt: trim(message) || '',
      medias: []
    };
    if (!data.txt.length) {
      data = false;
    }
    if (data) {
      ls.set('im_draft' + vk.id + '_' + peer, data);
    } else {
      ls.remove('im_draft' + vk.id + '_' + peer);
    }
  },
  restoreDraft: function (peer) {
    var tab = curFastChat.tabs[peer],
        txt = tab.txt,
        draft = ls.get('im_draft' + vk.id + '_' + peer);

    if (!txt || !tab || !draft ||
        val(txt).length > draft.txt.length) {
      return false;
    }
    draft.txt = clean(draft.txt);
    if (tab.editable) {
      txt.innerHTML = Emoji.emojiToHTML(draft.txt, 1);
    } else {
      val(txt, draft.txt || '');
    }
    FastChat.checkEditable(tab.emojiId, txt);
    setTimeout(function() {
      txt.scrollTop = txt.scrollHeight;
    }, 10);
    return true;
  },
  error: function (peer, msg) {
    peer = peer || curFastChat.peer;
    var tab = curFastChat.tabs[peer];
    re('fc_error' + peer);
    tab.log.appendChild(ce('div', {id: 'fc_error' + peer, className: 'fc_msgs_error', innerHTML: msg || getLang('global_error')}));
    FastChat.scroll(peer);
  },
  scroll: function(peer) {
    peer = peer || curFastChat.peer;
    var tab = curFastChat.tabs[peer];
    if (!tab) return;
    tab.logWrap.scrollTop = tab.logWrap.scrollHeight;
    tab.scroll && tab.scroll.update(false, true);
  },
  mkdate: function(raw) {
    var result = new Date(raw * 1000),
        now_time = new Date(),
        pad = function(num) {return ((num + '').length < 2) ? ('0' + num) : num;};

    if (result.getDay() == now_time.getDay()) {
      //return pad(result.getHours()) + ':' + pad(result.getMinutes()) + ':' + pad(result.getSeconds());
      return pad(result.getHours()) + ':' + pad(result.getMinutes());
    }
    var date_str = pad(result.getDate()) + '.' + pad(result.getMonth()+1);
    if (result.getFullYear() != now_time.getFullYear()) {
      date_str += '.' + (result.getFullYear() + '').substr(2);
    }
    return date_str;
  },
  prepareMsgData: function (arr) {
    var peer = arr[0], flags = intval(arr[2]), from_id = flags & 2 ? curFastChat.me.id : (peer > 2e9 ? arr[5] : peer), date = intval(vkNow() / 1000), data = {
      id: arr[1],
      peer: peer,
      from_id: from_id,
      text: arr[3],
      out: flags & 2 ? true : false,
      unread: flags & 1 ? true : false,
      date: date,
      date_str: FastChat.mkdate(date)
    }, author, attFlags = arr[4], attText = '';

    if (attFlags) { // Media
      if (attFlags & 1) {
        attText += '<div class="fc_msg_attachments_loading"></div>';
        if (arr[1] > 0) {
          setTimeout(FastChat.needMsgMedia.pbind(peer, arr[1]), 5);
        }
      }
      if (attFlags & 6) {
        attText += rs(curFastChat.tpl.msg_fwd, {msg_id: arr[1], peer_nice: FastChat.nicePeer(peer), label: getLang(attFlags & 2 ? 'mail_im_fwd_msg' : 'mail_im_fwd_msgs')});
      }
      if (attFlags & 8) {
        data.sticker = true;
      }
      if (attText) {
        data.text += '<div class="fc_msg_attachments" id="fc_msg_attachments' + data.id + '">' + attText + '</div>';
      }
    }
    if (flags & 2) {
      author = curFastChat.me;
    } else if (peer > 2e9) {
      author = curFastChat.tabs[peer].data.members[from_id];
    } else {
      author = curFastChat.tabs[peer];
    }
    extend(data, {
      from_id: from_id,
      link: author.link,
      photo: author.photo,
      name: author.name,
      fname: peer > 2e9 ? author.fname || author.first_name : ''
    });
    if (arr[5]) {
      var att = arr[5].split(',');
    }
    return data;
  },
  needMsgMedia: function (peer, msgId) {
    if (msgId <= 0) return;

    FastChat.lcSend('needMedia', {msgId: msgId});
    curFastChat.needMedia[msgId] = [peer, setTimeout(FastChat.loadMsgMedia.pbind(peer, msgId), curNotifier.is_server ? 0 : irand(150, 250))];
  },
  loadMsgMedia: function (peer, msgId) {
    if (msgId <= 0 || curFastChat.gotMedia[msgId] !== undefined && curFastChat.gotMedia[msgId] !== 0) {
      return;
    }
    FastChat.lcSend('fetchingMedia', {msgId: msgId});
    curFastChat.gotMedia[msgId] = 0;

    ajax.post('al_im.php', {act: 'a_get_media', id: msgId, from: 'fc'}, {
      onDone: function (text, msgInfo, msgOpts) {
        FastChat.lcSend('gotMedia', {msgId: msgId, peer: peer, text: text, msgOpts: msgOpts});
        FastChat.gotMsgMedia(peer, msgId, text, msgOpts);
      }
    })
  },
  gotMsgMedia: function(peer, msgId, text, msgOpts) {
    val('fc_msg_attachments' + msgId, text);
    if (msgOpts && msgOpts.sticker) {
      var msg = ge('fc_msg'+msgId);
      var msgCont = msg.parentNode;

      addClass(msgCont, 'fc_sticker_cont');
      addClass(msgCont.parentNode, 'fc_msg_sticker');
    }

    FastChat.scroll(peer);
    curFastChat.gotMedia[msgId] = [peer, text, msgOpts];

    if (msgOpts.stickers && window.Emoji) {
      Emoji.updateTabs(msgOpts.stickers);
    }

    if (curFastChat.needMedia[msgId] === undefined) return;
    clearTimeout(curFastChat.needMedia[msgId][1]);
    delete curFastChat.needMedia[msgId];
  },
  addMsg: function (data) {
    var t = this, peer = data.peer, tab = curFastChat.tabs[peer], log = tab.log, last = log.lastChild;
    if (last && last.className == 'fc_msgs_error') {
      last = last.previousSibling;
    }

    if(tab
      && !data.out
      && tab.box.visible
      && !tab.iman.is_idle
      && !curNotifier.idle_manager.is_idle) {
        data.unread = false;
        FastChat.markRead(data.peer, [data.id]);
    }

    if (!last
      || !hasClass(last, 'fc_msgs_wrap')
      || (!hasClass(last, 'fc_msgs_unread') && data.unread === true)
      || last.getAttribute('data-from') != data.from_id
      || data.date - intval(last.getAttribute('data-date')) >= 300
      || data.sticker
      || hasClass(last, 'fc_msg_sticker')) {
        re('fc_log_empty' + peer);
        var classname = (data.out ? 'fc_msgs_out ' : '') + (data.unread ? 'fc_msgs_unread' : '');
        if (data.sticker) {
          classname += ' fc_msg_sticker';
        }
        var tpl = data.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
        last = se(rs(tpl, {
          from_id: data.from_id,
          link: data.link,
          photo: Notifier.fixPhoto(data.photo),
          name: data.from_id == curFastChat.me.id ? getLang('mail_im_thats_u') : stripHTML(data.name),
          classname: classname,
          date: data.date,
          date_str: data.date_str,
          msgs: ''
        }))
        log.appendChild(last);
    } else if (!data.unread) {
      removeClass(last, 'fc_msgs_unread');
    }
    var msgs = geByClass1('fc_msgs', last, 'div');
    var msgDate = geByClass1('fc_msgs_date', msgs);
    var msgLast = geByClass1('fc_msg_last', msgs);
    if (msgLast) {
      removeClass(msgLast, 'fc_msg_last');
      removeClass(msgLast, 'fl_l');
    }
    var msgRow = se(rs(curFastChat.tpl.msg, {
      msg_id: data.id,
      classname: (data.unread ? 'fc_msg_unread' : '') + ' fc_msg_last fl_l',
      text: data.text
    }));
    if (msgs.firstChild.tagName == 'BR') {
      re(msgs.firstChild);
    }
    if (msgDate) {
      msgs.insertBefore(msgRow, msgDate);
    } else {
      msgs.appendChild(msgRow);
    }
    if (vk.id != data.from_id) {
      delete curFastChat.typingEvents[peer];
      FastChat.updateTyping(peer, 1);
    }
    tab.scroll && tab.scroll.update();
  },
  showMsgFwd: function (msgId) {
    return !showBox('al_im.php', {act: 'a_show_forward_box', id: vk.id + '_' + msgId, from: 'mail'}, {stat: ['im.css'], dark: 1});
  },
  closeTab: function (peer) {
    var box = curFastChat.tabs[peer].box;
    box.close();
  },

  openSnapsterLayer: function(e) {
    if (checkEvent(e)) {
      return;
    }
    showBox('/snapster.php', {act: 'show'}, {containerClass: 'chronicle_layer', dark: 1});
    return cancelEvent(e);
  },

  nicePeer: function(peer) {
    if (peer > 2e9) {
      return 'c' + intval(peer - 2e9);
    } else if (peer < -2e9) {
      return 'e' + intval(-peer - 2e9);
    }
    return peer;
  },

  // mobile online
  tip: function(el, p) {
    if (hasClass(el.parentNode.parentNode, 'fc_tab_mobile') && (!cur._fcpromo || cur._fcpromo < 0) && !cur._fcdrag) {
      mobileOnlineTip(el, p);
    }
  },
  promo: function(el, ev) {
    if (hasClass(el.parentNode.parentNode, 'fc_tab_mobile') && cur._fcpromo >= 0) {
      mobilePromo();
      return cancelEvent(ev || window.event);
    }
  },
  promost: function(el) {
    cur._fcpromo = 1;
    if (el.tt && el.tt.hide) {
      el.tt.hide();
    }
  },

  tplBox: '<div class="fc_tab_wrap"><div class="fc_tab_head clear_fix"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><a class="fc_tab_max_wrap fl_r" href="/im?sel=%id%" onmousedown="event.cancelBubble = true;" onclick="return nav.go(this, event);"><div class="chats_sp fc_tab_max"></div></a><a class="fc_tab_pin_wrap fl_r" onmousedown="event.cancelBubble = true;" onclick="return FastChat.pinTab(%id%, event);"><div class="chats_sp fc_tab_pin"></div></a><div class="fc_tab_title noselect fl_l">%name%</div><div class="fl_l fc_tab_online_icon" onmouseover="FastChat.tip(this, {mid: %id%})" onmousedown="FastChat.promost(this)" onclick="return FastChat.promo(this, event)"></div></div><div class="fc_tab %classname%"><div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"></div></div></div><div class="fc_tab_txt_wrap"><a class="fc_tab_attach"><div class="chats_sp fc_tab_attach_icon"></div></a><div class="fc_tab_txt">%cont%<div class="fc_tab_preview"></div></div></div></div><div class="fc_pointer_offset"><div class="chats_sp fc_tab_pointer fc_tab_pointer_peer"></div></div></div>',

  tplTab: '<div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"></div></div></div><div class="fc_tab_txt_wrap"><div class="fc_tab_txt">%cont%</div></div>'

}

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

      options.onInit && options.onInit();
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
  } else if (event.detail && event.axis === (this.isHorizontal ? 1 : 2)) {
    delta = -event.detail * 10
  } else {
    return;
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

var DesktopNotifications = {
  supported: function() {
    return !!(window.webkitNotifications || window.Notification);
  },
  checkPermission: function() {
    if (window.webkitNotifications) {
      return webkitNotifications.checkPermission();
    } else {
      return (Notification.permission == "granted") ? 0 : 1;
    }
  },
  requestPermission: function(f) {
    (window.webkitNotifications || window.Notification).requestPermission(f);
  },
  createNotification: function(photo, title, text) {
    var notification;
    if (window.webkitNotifications) {
      notification = webkitNotifications.createNotification(photo, title, text);
    } else {
      notification = new Notification(title, {
        icon: photo,
        body: text
      });
      notification.cancel = function() {
        this.close();
      };
      notification.show = function() {};
    }
    if(vk.id % 100 < 10) {
      statlogsValueEvent('browser_notification', 0);
    }
    return notification;
  }
};

try{stManager.done('notifier.js');}catch(e){}
