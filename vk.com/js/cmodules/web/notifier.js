! function(e) {
    function t(a) {
        if (i[a]) return i[a].exports;
        var r = i[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.d = function(e, i, a) {
        t.o(e, i) || Object.defineProperty(e, i, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var i = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(i, "a", i), i
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 149)
}({
    109: function(e, t, i) {
        "use strict";
        window.DesktopNotifications = {
            supported: function() {
                return !(!window.webkitNotifications && !window.Notification)
            },
            checkPermission: function() {
                return window.webkitNotifications ? webkitNotifications.checkPermission() : "granted" == Notification.permission ? 0 : 1
            },
            requestPermission: function(e) {
                (window.webkitNotifications || window.Notification).requestPermission(e)
            },
            createNotification: function(e, t, i) {
                var a = void 0;
                return window.webkitNotifications ? a = webkitNotifications.createNotification(e, t, i) : (a = new Notification(t, {
                    icon: e,
                    body: i
                }), a.cancel = function() {
                    this.close()
                }, a.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), a
            }
        }
    },
    121: function(module, exports, __webpack_require__) {
        "use strict";
        var _im_shared_helpers = __webpack_require__(174),
            _longpoll_singleton = __webpack_require__(37),
            ACTIVE_TAB_SWITCH_SERVER_TIMEOUT = browser.safari ? 3e3 : 1e4,
            LC_SERVER_SWITCH_TO_ACTIVE_FLAG = "lc_server_switch_to_active_flag";
        window.curNotifier || (window.curNotifier = {
            addQueues: {},
            recvClbks: {},
            recvData: {},
            onConnectionId: []
        }), window.Notifier = {
            debug: !1,
            init: function(e) {
                if (!window.curNotifier || !curNotifier.connection_id) {
                    if (Notifier.notificationsGc(), curNotifier = extend({
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
                            request_timeout: 1e3,
                            sound: new Sound("mp3/bb1"),
                            sound_im: new Sound("mp3/bb2"),
                            sound_im_current: new Sound("mp3/bb3"),
                            onConnectionId: []
                        }, e), !this.initFrameTransport()) return !1;
                    this.initIdleMan(), this.initCommunityQueues(), (0, _longpoll_singleton.lpSingleton_onTabInitialLoaded)(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                        id: "notifiers_wrap",
                        className: "fixed"
                    }), ge("page_wrap"))
                }
            },
            initCommunityQueues: function(e) {
                var t = ls.get("im_m_comms_key"),
                    i = t && t.split ? t.split(";") : [];
                return "empty" === i[0] && i[1] && Date.now() - i[1] < 6e4 ? t = "empty" : "empty" === i[0] && (t = !1), t ? Notifier.proccessCommunityQueues(t, e || 0) : void ajax.post("al_im.php", {
                    act: "a_get_comms_key"
                }, {
                    onDone: function(t) {
                        "empty" === t ? t += ";" + Date.now() : Notifier.proccessCommunityQueues(t, e || 0), ls.set("im_m_comms_key", t)
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            notificationsGc: function() {
                curNotifier.uiGcTo = setTimeout(function() {
                    for (var e = curNotifier.uiNotifications, t = [], i = 0; i < e.length; i++) {
                        var a = e[i];
                        vkNow() - a[1] > 1e4 ? a[0].close() : t.push(a)
                    }
                    curNotifier.uiNotifications = t, Notifier.notificationsGc()
                }, 5e3)
            },
            resetCommConnection: function(e) {
                var t = ls.get("im_m_comms_key");
                t && delete curNotifier.addQueues[t.queue], ls.set("im_m_comms_key", !1), Notifier.initCommunityQueues(e || 0)
            },
            proccessCommunityQueues: function(e, t) {
                return "empty" !== e && e ? void Notifier.addKey(e, function(e, i) {
                    if (i.failed) return t++, void(50 > t && setTimeout(Notifier.resetCommConnection.pbind(t), 100));
                    var e = ls.get("im_m_comms_key");
                    e && (e.ts = i.ts, ls.set("im_m_comms_key", e));
                    var a = i.events;
                    a && a.map(function(e) {
                        return e.split("<!>")
                    }).forEach(function(e) {
                        if ("update_cnt" === e[1]) {
                            var t = e[5],
                                i = e[4];
                            handlePageCount("mgid" + t, i)
                        }
                    })
                }) : !1
            },
            destroy: function() {
                Notifier.hideAllEvents(), curNotifier.idle_manager.stop(), curNotifier.uiGcTo && clearTimeout(curNotifier.uiGcTo), curNotifier = {}, re("notifiers_wrap"), re("queue_transport_wrap")
            },
            reinit: function() {
                ajax.post("notifier.php?act=a_get_params", {}, {
                    onDone: function(e) {
                        e ? (curNotifier.error_timeout = 1, this.init(e)) : (curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2))
                    }.bind(this),
                    onFail: function() {
                        return curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2), !0
                    }.bind(this)
                })
            },
            standby: function(e) {
                this.destroy(), curNotifier.error_timeout = e || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout)
            },
            freezeEvents: function() {
                curNotifier.frozen = !0, each(curNotifier.q_shown, function() {
                    clearTimeout(this.fadeTO), getStyle(this.baloonEl, "opacity") < 1 && animate(this.baloonEl, {
                        opacity: 1
                    }, 100)
                })
            },
            unfreezeEvents: function() {
                curNotifier.frozen = !1, each(curNotifier.q_shown, function() {
                    this.fadeTO = setTimeout(this.startFading, hasAccessibilityMode() ? 3e4 : 5e3)
                })
            },
            getTransportWrap: function() {
                return ge("queue_transport_wrap") || utilsNode.appendChild(ce("div", {
                    id: "queue_transport_wrap"
                }))
            },
            setFocus: function(e) {
                var t = (e ? "1" : "0") + curNotifier.instance_id;
                "flash" == curNotifier.transport && curNotifier.flash_transport ? curNotifier.flash_transport.setInstanceFocused(t) : "frame" == curNotifier.transport && (Notifier.lcSend("focus", {
                    instance_id: t
                }), this.onInstanceFocus(t))
            },
            initIdleMan: function() {
                curNotifier.idle_manager && curNotifier.idle_manager.started || (curNotifier.idle_manager = new IdleManager({
                    onIdleCb: function() {
                        Notifier.freezeEvents(), Notifier.setFocus(0), cur.onIdle && each(cur.onIdle, function(e, t) {
                            t()
                        })
                    },
                    onUnIdleCb: function() {
                        Notifier.unfreezeEvents(), Notifier.setFocus(1), cur.onUnidle && each(cur.onUnidle, function(e, t) {
                            t()
                        }), FastChat && FastChat.onUnidle(), vk.spentLastSendTS = vkNow()
                    },
                    id: "window",
                    element: document,
                    focusElement: window
                }), curNotifier.idle_manager.start())
            },
            initFrameTransport: function() {
                if (!ls.checkVersion() || browser.msie8 || !("onmessage" in window || "postMessage" in window)) return !1;
                curNotifier.connection_id = "queue_connection_" + curNotifier.queue_id, curNotifier.lc_prev_value = "", curNotifier.is_server = !1, curNotifier.lp_connected = !1, curNotifier.error_timeout = 1;
                var e = browser.version.split("."),
                    t = intval(e[0]),
                    i = intval(e[1]);
                curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && i >= 1)), curNotifier.transport = "frame", this.lcInit();
                for (var a in curNotifier.onConnectionId) curNotifier.onConnectionId[a]();
                return curNotifier.onConnectionId = [], !0
            },
            onActivated: function() {
                curNotifier.idle_manager && !curNotifier.idle_manager.is_activated ? curNotifier.idle_manager.activate() : curNotifier.idle_manager && curNotifier.idle_manager.is_idle || Notifier.setFocus(1), removeEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionInit: function() {
                addEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionFailed: function() {},
            onRelogin: function() {
                setTimeout(function() {
                    Notifier.standby()
                }, 0)
            },
            onMessage: function onMessage(msg) {
                if (!curNotifier.focus_instance || curNotifier.focus_instance == curNotifier.instance_id) try {
                    var events = eval("(" + msg + ")");
                    Notifier.pushEvents(events)
                } catch (e) {
                    debugLog(e.message)
                }
            },
            onInstanceFocus: function(e) {
                var t = e.charAt(0);
                return e = e.substr(1), "1" != t ? void(curNotifier.focus_instance == e && (curNotifier.focus_instance = "")) : (curNotifier.focus_instance = e, void(e != curNotifier.instance_id && (curNotifier.idle_manager.is_idle || curNotifier.idle_manager.idle(), Notifier.hideAllEvents())))
            },
            onInstanceServer: function(e) {
                curNotifier.is_server = !!e, (0, _longpoll_singleton.lpSingleton_syncWithNotifier)()
            },
            getLpInstance: function() {
                return (0, _longpoll_singleton.lpSingleton_getInstance)()
            },
            pushEvents: function(e, t) {
                var i = 0;
                each(e, function(e, a) {
                    i |= Notifier.pushEvent(a, t)
                }), i && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & i ? curNotifier.sound_im.play() : curNotifier.sound.play())
            },
            pushEvent: function pushEvent(msg, cnt) {
                if ("nop" != msg) {
                    if (msg = msg.split("<!>"), msg[0] != curNotifier.version) return debugLog("Notifier old version"), !1;
                    if ("update_cnt" == msg[1]) return "nws" === msg[3] ? (handlePageCount("ntf", msg[9]), 0) : (handlePageCount(msg[3], msg[4], msg[5], msg[6]), 0);
                    var ev = {
                            type: msg[1],
                            title: msg[2],
                            author_photo: psr(msg[3] || ""),
                            author_link: msg[4] || "",
                            text: psr(msg[5]),
                            add_photo: psr(msg[6]) || "",
                            link: msg[7],
                            onclick: msg[8],
                            add: msg[9],
                            id: msg[10],
                            author_id: msg[11],
                            top_count: msg[12]
                        },
                        push = cnt ? 0 : 1;
                    if (msg[13] && (ev.custom = eval("(" + msg[13] + ")")), !curNotifier.done_events[ev.id]) {
                        switch (curNotifier.done_events[ev.id] = 1, void 0 !== ev.top_count && -1 != ev.top_count && handlePageCount("ntf", ev.top_count), ev.type) {
                            case "video_process_ready":
                                if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) return;
                                break;
                            case "mail":
                                handlePageCount("msg", ev.add), window.Call && Call.params.call_id && intval(ev.author_id) == intval(Call.params.far_uid) && Call.showChat(), "im" != cur.module && FastChat.prepareTabIcon(intval(ev.author_id), {
                                    fixedLoad: 1
                                });
                                break;
                            case "mail_failed":
                                var peer = intval(ev.author_id);
                                if ("im" == nav.objLoc[0] && cur.tabs[peer]) {
                                    var msg = ge("mess" + ev.add);
                                    if (msg && hasClass(msg, "im_new_msg")) {
                                        removeClass(msg, "im_new_msg"), addClass(msg, "im_failed");
                                        var n = geByClass1("im_log_author_chat_name", msg);
                                        n && (n.innerHTML += " &nbsp;<span>" + cur.lang.mail_send_failed + "</span>"), push = 2
                                    }
                                }
                                break;
                            case "friend_request":
                                handlePageCount("fr", ev.add);
                                break;
                            case "ach_achieved":
                                handlePageCount("ach", ev.add), ev.author_photo = ev.custom[0];
                                break;
                            case "ach_achieved_upd":
                                handlePageCount("ach", ev.add), push = 0;
                                break;
                            case "bt_upd":
                            case "bt_upd_upd":
                                handlePageCount("bt", ev.add, ev.custom[0], ev.custom[1]), "bt_upd_upd" == ev.type && (push = 0);
                                var bt = ge("bt_tab_updates");
                                bt && val(geByClass1("ui_tab_count", bt), ev.add > 0 ? ev.add : "");
                                break;
                            case "push_settings":
                                push = 0;
                                var muted = JSON.parse(ev.add);
                                curNotifier.mutedPeers = curNotifier.mutedPeers.filter(function(e) {
                                    return e !== muted.peer_id
                                }), 0 !== muted.disabled_until && curNotifier.mutedPeers.push(muted.peer_id);
                                break;
                            case "mail_cnt":
                                handlePageCount("msg", ev.add), push = 0;
                                break;
                            case "clear_notify":
                                TopNotifier && TopNotifier.invalidate(), Notifier.hideAllEvents(), push = 0;
                                break;
                            case "support_reply":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0);
                                break;
                            case "support_cnt":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0), push = 0;
                                break;
                            case "balance_changed":
                                updateMoney(ev.add), ev.custom && "app" == ev.custom[0] && cur.app && cur.app.params.api_id == ev.custom[1] && cur.app.balanceUpdated(ev.custom[2]);
                                break;
                            case "gift_sent":
                                re("left_block10_0");
                                var left_block = ev.add;
                                if (left_block) {
                                    var leftBlocksElem = ge("left_blocks"),
                                        left_unpaid_gifts = se(left_block);
                                    leftBlocksElem && (leftBlocksElem.firstChild ? leftBlocksElem.insertBefore(left_unpaid_gifts, leftBlocksElem.firstChild) : leftBlocksElem.appendChild(left_unpaid_gifts))
                                }
                                break;
                            case "call_start":
                                window.Call ? Call.incomingReceive(ev) : stManager.add(["call.js", "call.css", "notifier.css"], function() {
                                    Call.incomingReceive(ev)
                                }), push = 0;
                                break;
                            case "call":
                                window.Call ? Call.processNotify(ev) : debugLog("wnd Call event without call obj"), push = 0;
                                break;
                            case "call_app":
                                var callId = ev.custom.call_id,
                                    onScriptCame = function onScriptCame(script) {
                                        clearTimeout(curNotifier.appCallTimeout), script = script && script[0] == callId ? script[1] : !1, script && -1 != script && stManager.add(["call.js", "call.css", "apps.js", "apps.css"], function() {
                                            eval(script)
                                        })
                                    };
                                curNotifier.appCallTimeout = setTimeout(function() {
                                    var e = curNotifier.recvData.apps_call_receive;
                                    e = e && e[0] == callId ? e[1] : !1, e || (ajax.post("/al_apps.php", {
                                        act: "call_receive"
                                    }, {
                                        onDone: function(e) {
                                            debugLog("script came"), e = [callId, e], Notifier.lcSend("apps_call_receive", e), onScriptCame(e)
                                        },
                                        stat: ["call.js", "call.css", "apps.js", "apps.css"]
                                    }), Notifier.lcSend("apps_call_receive", [callId, -1]))
                                }, 0), Notifier.setRecvClbk("apps_call_receive", onScriptCame), push = 0;
                                break;
                            case "call_app_reject":
                                "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallReject", ev.custom.key), push = 0;
                                break;
                            case "call_app_accept":
                                "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallAccept", ev.custom.key), push = 0;
                                break;
                            case "notify_tt":
                            case "login_attempt":
                                ev.add && (ev.add = eval("(" + ev.add + ")"), TopNotifier.showTooltip(ev.add.text, ev.add.key)), push = 0;
                                break;
                            case "reload_stickers":
                                window.Emoji && window.Emoji.stickers && (Emoji.stickers = !1), push = 0
                        }
                        return "mail" === ev.type && (push = this.sendMailNotification(ev)), 1 & push && (curNotifier.q_events.push(ev), curNotifier.q_events.length > 30 && curNotifier.q_events.splice(0, curNotifier.q_events.length - 30), this.checkEvents()), push
                    }
                }
            },
            isActive: function() {
                return window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle
            },
            sendImProxy: function(e) {
                e.text = winToUtf(e.text), curNotifier.browser_shown[e.id] || (curNotifier.browser_shown[e.id] = !0, Notifier.trySendBrowserNotification(e, !0), setTimeout(function() {
                    curNotifier.browser_shown[e.id] = void 0
                }, 2e3))
            },
            shouldShowNotification: function(e) {
                return "im" !== cur.module && !FastChat.isChatOpen(e.author_id)
            },
            sendSimpleNotification: function(e) {
                return Notifier.playSound(e), Notifier.shouldShowNotification(e) ? 3 : 0
            },
            sendBrowserNotification: function(e) {
                "im" !== cur.module ? Notifier.negotiate({
                    message: "send_im_notification",
                    onSuccess: function(t) {
                        Notifier.lcSend("negotiate_back", {
                            token: t.msg,
                            ev: e
                        })
                    },
                    onFail: function() {
                        Notifier.showBrowserNotification(e)
                    }
                }) : (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showBrowserNotification(e))
            },
            shouldPlaySound: function(e) {
                return !ls.get("sound_notify_off") && Notifier.shouldDisturb(e)
            },
            shouldDisturb: function(e) {
                return cur.noDisturbMode ? !1 : cur.focused != e.author_id && !inArray(e.author_id, cur.mutedPeers) && !inArray(e.author_id, curNotifier.mutedPeers)
            },
            shouldPlayCurrentSound: function(e) {
                return !ls.get("sound_notify_off") && cur.focused == e.author_id && hasAccessibilityMode() && !inArray(e.author_id, cur.mutedPeers)
            },
            playSound: function(e) {
                curNotifier.sound_im && curNotifier.sound_im.play && Notifier.shouldPlaySound(e) ? e.author_id == cur.peer && hasAccessibilityMode() ? curNotifier.sound_im_current.play() : curNotifier.sound_im.play() : Notifier.shouldPlayCurrentSound(e) && curNotifier.sound_im_current && curNotifier.sound_im_current.play()
            },
            trySendBrowserNotification: function(e, t) {
                Notifier.negotiate({
                    message: "who_is_active",
                    msg: e.author_id,
                    onFail: function() {
                        !Notifier.canNotifyUi() || cur.peer == e.author_id && Notifier.isActive() ? t ? Notifier.playSound(e) : (Notifier.lcSend("show_notification", e), Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0), Notifier.playSound(e)) : Notifier.sendBrowserNotification(e)
                    }
                })
            },
            showBrowserNotification: function(e) {
                Notifier.showEventUi(e), Notifier.playSound(e)
            },
            proxyIm: function(e) {
                return this.isActive() ? (this.playSound(e), void(Notifier.canNotifyUi() && cur.peer != e.author_id && Notifier.shouldDisturb(e) && (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showEventUi(e)))) : void(curNotifier.is_server ? (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", this.sendImProxy(e)) : curNotifier.is_server || this.lcSend("message_from_im", e))
            },
            sendMailNotification: function(e) {
                if ("im" == cur.module ? e.onclick = "IMBRIDGE.activateTab('" + e.author_id + "');" : e.onclick = "FastChat.selectPeer('" + e.author_id + "');", this.isActive() && Notifier.canNotifyUi()) this.playSound(e), this.shouldDisturb(e) && cur.peer != e.author_id && this.showEventUi(e);
                else {
                    if (this.isActive() && this.shouldDisturb(e)) return this.sendSimpleNotification(e);
                    curNotifier.is_server && this.shouldDisturb(e) && this.trySendBrowserNotification(e)
                }
                return 0
            },
            checkEvents: function() {
                if (!(!curNotifier.q_events.length || curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max) || !curNotifier.idle_manager.is_idle && curNotifier.frozen || cur.noDisturbMode)) {
                    var e = curNotifier.q_events.shift();
                    this.showEvent(e)
                }
            },
            showEvent: function showEvent(ev, force) {
                ev.custom && ev.custom.ttl && (0, _im_shared_helpers.confirmDelivery)(ev.custom.id), curNotifier.q_shown.push(ev);
                var thumbEl = "";
                thumbEl = "video_process_ready" == ev.type ? '<div class="notifier_video_thumb" style="background-image: url(' + Notifier.fixPhoto(ev.author_photo) + ')"></div>' : '<img src="' + Notifier.fixPhoto(ev.author_photo) + '" class="notifier_image" />';
                var typeClassName = "notifier_type_" + ev.type;
                ev.baloonWrapEl = ce("div", {
                    className: "notifier_baloon_wrap",
                    innerHTML: '<div class="notifier_baloon ' + typeClassName + '"><div class="notifier_baloon_head clear_fix"><a class="notifier_close_wrap" role="link" title="' + getLang("global_close") + '" aria-label="' + getLang("global_close") + '"></a><h4 class="notifier_baloon_title">' + ev.title + '</h4></div><div class="notifier_baloon_body clear_fix">' + (ev.author_photo && '<div class="notifier_image_wrap">' + (ev.author_link && '<a href="' + ev.author_link + '">') + thumbEl + (ev.author_link && "</a>") + "</div>") + (ev.add_photo && '<div class="notifier_add_image_wrap"><img src="' + ev.add_photo + '" class="notifier_add_image" /></div>') + '<div class="notifier_baloon_msg wrapped">' + ev.text + "</div></div></div>"
                }), ev.baloonEl = ev.baloonWrapEl.firstChild, ev.closeEl = geByClass1("notifier_close_wrap", ev.baloonEl), addEvent(ev.baloonEl, "mouseover mouseout", function(e) {
                    ev.over = "mouseover" == e.type, ev.over ? Notifier.freezeEvents() : Notifier.unfreezeEvents()
                }), addEvent(ev.baloonEl, "mousedown click", function(e) {
                    e = e.originalEvent || e || window.event;
                    var btn = e.which,
                        nohide = !1;
                    if (1 == btn && (e.ctrlKey || browser.mac && e.metaKey) && (btn = 2, browser.mac && (nohide = !0)), "A" != (e.target || e.srcElement).tagName) {
                        switch (btn) {
                            case 1:
                                eval(ev.onclick), Notifier.hideEvent(ev);
                                break;
                            case 2:
                                var wnd = window.open(ev.link, "_blank");
                                try {
                                    wnd.blur(), window.focus()
                                } catch (e) {}
                                nohide || Notifier.hideEvent(ev);
                                break;
                            case 3:
                                if (browser.mozilla) return
                        }
                        return cancelEvent(e)
                    }
                    switch (btn) {
                        case 1:
                            break;
                        case 3:
                    }
                }), addEvent(ev.baloonEl, "contextmenu", function(e) {
                    return setTimeout(function() {
                        Notifier.hideEvent(ev, !1, !1, !0)
                    }, 10), cancelEvent(e)
                }), addEvent(ev.closeEl, "mousedown click", function(e) {
                    return Notifier.hideEvent(ev, !1, !1, !0), cancelEvent(e)
                }), ev.startFading = function() {
                    ev.fading = animate(ev.baloonEl, {
                        opacity: 0
                    }, 1e3, Notifier.hideEvent.bind(Notifier).pbind(ev, !1)), ev.over && ev.fading.stop()
                }, curNotifier.cont.insertBefore(ev.baloonWrapEl, curNotifier.cont.firstChild);
                var h = ev.baloonWrapEl.offsetHeight;
                re(ev.baloonWrapEl), curNotifier.cont.appendChild(ev.baloonWrapEl), setStyle(curNotifier.cont, {
                    bottom: -h
                }), setStyle(ev.baloonWrapEl, {
                    visibility: "visible"
                }), animate(curNotifier.cont, {
                    bottom: 0
                }, 200), (!curNotifier.idle_manager.is_idle || force) && (ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? 35e3 : 7e3))
            },
            canNotifyUi: function() {
                return !ls.get("im_ui_notify_off") && DesktopNotifications.supported() && DesktopNotifications.checkPermission() <= 0 && !cur.noDisturbMode
            },
            showEventUi: function showEventUi(ev) {
                if (!this.canNotifyUi()) return !1;
                var title, text;
                if (ev.custom && ev.custom.ttl && (0, _im_shared_helpers.confirmDelivery)(ev.custom.id), "mail" === ev.type) {
                    var div = ce("div");
                    div.innerHTML = ev.text, title = div.firstChild.textContent.trim(), text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n")).replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, "$1").replace(/<img.*?alt="(.*?)".*?>/gi, "$1")).replace(/&laquo;|&raquo;/gi, '"').trim()
                } else title = ev.title, text = ev.text;
                var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
                return curNotifier.uiNotifications.push([notification, vkNow()]), notification.onclick = function(e) {
                    window.focus(), ev.onclick || ("im" === cur.module ? ev.onclick = "IMBRIDGE.activateTab(" + ev.author_id + ");" : ev.onclick = "FastChat.selectPeer('" + ev.author_id + "');"), "IM" === ev.onclick.substr(0, 2) && "im" !== cur.module ? FastChat.selectPeer(intval(ev.author_id)) : eval(ev.onclick), Notifier.hideEvent(ev)
                }, notification.onclose = function() {
                    Notifier.hideEvent(ev, !0)
                }, notification.show(), ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5e3), !0
            },
            hideEvent: function(e, t, i, a) {
                clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
                var r, n = indexOf(curNotifier.q_shown, e); - 1 != n && curNotifier.q_shown.splice(n, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), a === !0 && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (r = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, r - 3), r = 3), 3 == r && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != a && this.checkEvents(), "frame" != curNotifier.transport || i || this.lcSend("hide", {
                    event_id: e.id
                }), a !== !0 && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
                    act: "a_clear_notifier"
                })
            },
            hideAllEvents: function() {
                curNotifier.q_events = [], each(clone(curNotifier.q_shown), function() {
                    Notifier.hideEvent(this, !1, !0, -1)
                }), curNotifier.q_shown = [], curNotifier.q_closed = []
            },
            onEventHide: function(e) {
                e && (each(curNotifier.q_shown, function() {
                    return this.id == e ? (Notifier.hideEvent(this, !1, !0), !1) : void 0
                }), each(curNotifier.q_events, function(t) {
                    return this.id == e ? (curNotifier.q_events.splice(t, 1), !1) : void 0
                }))
            },
            lcInit: function() {
                if (curNotifier.post_message) {
                    addEvent(window, "message", this.lcOnMessage.bind(this));
                    var e = curNotifier.storage_el = ce("iframe", {
                        id: "queue_storage_frame",
                        name: "queue_storage_frame",
                        src: "/notifier.php?act=storage_frame&from=" + location.host + (Notifier.debug ? "&debug=" + vkNow() : "&4") + "#" + curNotifier.connection_id
                    });
                    Notifier.getTransportWrap().appendChild(e), curNotifier.storage_frame = e.contentWindow, curNotifier.storage_frame_origin = location.protocol + "//" + locHost
                } else browser.msie && intval(browser.version) < 9 ? addEvent(document, "storage", this.lcOnStorage.bind(this)) : addEvent(window, "storage", this.lcOnStorage.bind(this)), this.lcStart()
            },
            lcStart: function() {
                Notifier.lcCheckServer() ? this.lcServer() : (this.lcSend("check"), clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = setTimeout(this.lcServer.bind(this).pbind(!0), 500)), curNotifier.checkServerInt = setInterval(function() {
                    curNotifier.is_server || (!curNotifier.idle_manager.is_idle && curNotifier.idle_manager.getActiveTime() > ACTIVE_TAB_SWITCH_SERVER_TIMEOUT && (Notifier.debug && debugLog("this tab wants to become server"), ls.set(LC_SERVER_SWITCH_TO_ACTIVE_FLAG, !0), this.lcServer(!0)), vkNow() - curNotifier.last_succ > 8e3 && Notifier.lcCheckServer() && (Notifier.debug && debugLog("timeout"), this.lcServer(!0)))
                }.bind(this), 1e3 + intval(rand(-100, 100))), curNotifier.isServerBroadcastInt = setInterval(function() {
                    curNotifier.is_server && (Notifier.lcCheckServer() ? this.lcSend("check_ok") : (Notifier.debug && debugLog("no server from server broadcast"), this.lcNoServer()))
                }.bind(this), 5e3 + intval(rand(-100, 100))), void 0 !== curNotifier.fc && stManager.add(["emoji.js"], function() {
                    FastChat.init(curNotifier.fc)
                })
            },
            lcStop: function() {
                clearInterval(curNotifier.isServerBroadcastInt), clearInterval(curNotifier.checkServerInt), clearTimeout(curNotifier.becomeServerTO)
            },
            lcSend: function(e, t) {
                if (!curNotifier.connection_id) return curNotifier.onConnectionId.push(Notifier.lcSend.pbind(e, t)), !1;
                Notifier.debug && debugLog(curNotifier.instance_id + ": sending", e, t || "");
                var i = extend({
                    __client: curNotifier.instance_id,
                    __act: e,
                    __rnd: Math.random()
                }, t || {});
                if (curNotifier.post_message) try {
                    curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(i), curNotifier.storage_frame_origin)
                } catch (a) {
                    debugLog(a, a.message, a.stack)
                } else ls.set(curNotifier.connection_id, i)
            },
            lcRecv: function(e) {
                if (!isEmpty(e) && e.__client != curNotifier.instance_id) {
                    var t = e.__act;
                    switch (delete e.__client, delete e.__act, delete e.__rnd, Notifier.debug && debugLog(curNotifier.instance_id + ": recv", t, e), t) {
                        case "new_server":
                            curNotifier.last_succ = vkNow() + 1e3;
                            break;
                        case "feed":
                            curNotifier.timestamp = e.ts, curNotifier.key = e.key, Notifier.pushEvents(e.events, !e.full);
                            break;
                        case "addfeed":
                            Notifier.addFeed(e[0], e[1]);
                            break;
                        case "new_key":
                            debugLog("new key", e), curNotifier.timestamp = e.ts, curNotifier.key = e.key;
                            break;
                        case "new_addkey":
                            var i = e.queue || e.key,
                                a = curNotifier.addQueues[i],
                                r = !a && curNotifier.is_server;
                            a ? a[0] = vkNow() : curNotifier.addQueues[i] = [vkNow(), e.ts, e.key], r && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
                            break;
                        case "clear_addkeys":
                            curNotifier.addQueues = {};
                            break;
                        case "check_ok":
                            curNotifier.last_succ = vkNow(), curNotifier.becomeServerTO && (clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = !1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit());
                            break;
                        case "focus":
                            Notifier.onInstanceFocus(e.instance_id);
                            break;
                        case "hide":
                            Notifier.onEventHide(e.event_id);
                            break;
                        case "check_playlist":
                            var n = ls.get("pad_playlist");
                            n && n.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                            break;
                        case "who_is_active":
                            Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                            break;
                        case "show_notification":
                            Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                            break;
                        case "send_im_notification":
                            if ("im" === cur.module) {
                                var o = Notifier.createNegotiationSlot({
                                    onSuccess: function(e) {
                                        e.ev.onclick = "IMBRIDGE.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                    }
                                });
                                Notifier.lcSend("negotiate_back", {
                                    msg: o.token,
                                    token: e.token
                                })
                            }
                            break;
                        case "negotiate_back":
                            Notifier.endNegotiation(e);
                            break;
                        case "recent_emoji_set":
                            window.Emoji && Emoji.setRecentEmojiList(e);
                            break;
                        case "lp_data":
                            (0, _longpoll_singleton.lpSingleton_onNotifierRecv)(e);
                            break;
                        default:
                            if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                                for (var s in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][s](e);
                            else curNotifier.recvData[t] = e
                    }
                    if (curNotifier.is_server) switch (t) {
                        case "new_server":
                        case "new_key":
                        case "check_ok":
                            Notifier.debug && debugLog("no server from lcRecv", t), Notifier.lcNoServer();
                            break;
                        case "check":
                            this.lcSend("check_ok");
                            break;
                        case "message_from_im":
                            Notifier.sendImProxy(e)
                    }
                }
            },
            negotiate: function(e) {
                e = this.createNegotiationSlot(e), this.lcSend(e.message, {
                    token: e.token,
                    msg: e.msg
                })
            },
            createNegotiationSlot: function(e) {
                var t = "negotiations_" + Date.now() + Math.round(rand(0, 1e4));
                return e = extend({
                    timeout: 3e3,
                    token: t,
                    msg: ""
                }, e), curNotifier.negotiations[e.token] = {}, curNotifier.negotiations[e.token].timer = setTimeout(function() {
                    e.onFail && e.onFail(), curNotifier.negotiations[e.token] && (curNotifier.negotiations[e.token] = void 0)
                }, e.timeout), curNotifier.negotiations[e.token].success = e.onSuccess, e
            },
            endNegotiation: function(e) {
                var t = e.token,
                    i = curNotifier.negotiations[t];
                i && (clearTimeout(i.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
            },
            lcOnStorage: function(e) {
                e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
                var t = e.key,
                    i = e.newValue;
                if (i) {
                    if (t) {
                        if (e.key != curNotifier.connection_id) return
                    } else {
                        if (t = curNotifier.connection_id, i = localStorage.getItem(t), i == curNotifier.lc_prev_value) return;
                        curNotifier.lc_prev_value = i
                    }
                    this.lcRecv(JSON.parse(i) || {})
                }
            },
            lcOnMessage: function(e) {
                if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                    var t, i = e.data.substr(4);
                    if ("ready" == i) curNotifier.storage_frame = e.source, this.lcStart();
                    else {
                        if (-1 == (t = i.indexOf(":")) || i.substr(0, t) != curNotifier.connection_id || !i.substr(t + 1)) return;
                        this.lcRecv(JSON.parse(i.substr(t + 1)))
                    }
                }
            },
            lcServer: function(e) {
                Notifier.debug && debugLog("becoming server"), this.lpInit(), this.lcSend("new_server"), Notifier.lcCheckServer(!0), Notifier.onInstanceServer(1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit()), window.curFastChat && curFastChat.inited && FastChat.becameServer(), this.lpStop(), e ? this.lpReset(this.lpStart.bind(this)) : this.lpStart()
            },
            lcNoServer: function() {
                this.lpStop(), curNotifier.is_server && (Notifier.debug && debugLog("not server now"), this.onInstanceServer(0))
            },
            lcCheckServer: function(e) {
                var t, i = "server_" + curNotifier.connection_id,
                    a = vkNow();
                return !e && isArray(t = ls.get(i)) && t[0] != curNotifier.instance_id && a - t[1] < 8e3 ? !1 : (ls.set(i, [curNotifier.instance_id, a]), !0)
            },
            lpInit: function() {
                curNotifier.lpMakeRequest || (delete curNotifier.lpMakeRequest, re("queue_transport_frame"), Notifier.getTransportWrap().appendChild(ce("iframe", {
                    id: "queue_transport_frame",
                    name: "queue_transport_frame",
                    src: curNotifier.frame_path
                })))
            },
            lpStart: function() {
                curNotifier.lp_started = !0, curNotifier.lpInvalid ? Notifier.lpGetKey() : Notifier.lpCheck()
            },
            lpStop: function() {
                curNotifier.lp_started = !1, clearTimeout(curNotifier.lp_check_to), clearTimeout(curNotifier.lp_error_to), clearTimeout(curNotifier.lp_req_check_to)
            },
            lpCheck: function lpCheck() {
                if (curNotifier.lp_started && !curNotifier.lpActive && !curNotifier.lpInvalid) {
                    if (!curNotifier.lpMakeRequest) return clearTimeout(curNotifier.lp_check_to), void(curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3));
                    if (!Notifier.lcCheckServer()) return Notifier.debug && debugLog("no server from check"), void this.lcNoServer();
                    var now = vkNow(),
                        add_queues = [],
                        completed = !1,
                        params = {
                            act: "a_check",
                            ts: curNotifier.timestamp,
                            key: curNotifier.key,
                            id: curNotifier.uid,
                            wait: 25
                        };
                    each(curNotifier.addQueues, function(e, t) {
                        return now - t[0] > 3e4 && !e.match(/nccts/) ? (debugLog("drop key", e, now - t[0]), void delete curNotifier.addQueues[e]) : (add_queues.push(e), params.ts += "_" + t[1], void(params.key += t[2]))
                    });
                    var onFail = function(e) {
                        completed || (completed = !0, curNotifier.lpActive = !1, clearTimeout(curNotifier.lp_req_check_to), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout + irand(1e3, 1e4)), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2))
                    }.bind(this);
                    curNotifier.lpActive = !0, clearTimeout(curNotifier.lp_req_check_to), curNotifier.lp_req_check_to = setTimeout(onFail, 1e3 * (params.wait + 5)), curNotifier.lpMakeRequest(curNotifier.frame_url, params, function(text) {
                        if (!completed && (completed = !0, curNotifier.lpActive = !1, curNotifier.lp_started)) {
                            this.lcSend("check_ok");
                            try {
                                var response = eval("(" + text + ")"),
                                    main_response = response,
                                    add_response, add_queue, busy = 0;
                                if (isArray(response))
                                    for (main_response = response.shift();
                                        (add_response = response.shift()) && (add_queue = add_queues.shift());) 2 != add_response.failed || 4 != add_response.err ? (this.lcSend("addfeed", [add_queue, add_response]), this.addFeed(add_queue, add_response), add_response.failed && delete curNotifier.addQueues[add_queue]) : (Notifier.debug && debugLog("!!notifier key busy!! " + curNotifier.instance_id), busy |= 1);
                                else if (response.failed) {
                                    for (; add_queue = add_queues.shift();) this.lcSend("addfeed", [add_queue, response]), this.addFeed(add_queue, response), delete curNotifier.addQueues[add_queue];
                                    this.lcSend("clear_addkeys")
                                }
                                switch (this.lpChecked(main_response)) {
                                    case 0:
                                        break;
                                    case 1:
                                        return;
                                    case 2:
                                        busy |= 2;
                                        break;
                                    default:
                                        return
                                }
                                busy ? ls.get(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) ? ls.remove(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) : this.lcNoServer() : (clearTimeout(curNotifier.lpCheckTO), curNotifier.lpCheckTO = setTimeout(this.lpCheck.bind(this), curNotifier.request_timeout || 1e3), curNotifier.error_timeout = Math.max(1, (curNotifier.error_timeout || 1) / 1.5))
                            } catch (e) {
                                text && -1 == text.indexOf("Ad Muncher") && (topError("Notifier error: " + e.message, {
                                    dt: -1,
                                    type: 5,
                                    stack: e.stack,
                                    answer: text + "\n\nbusy:" + busy + "\nserver:" + curNotifier.is_server + "\ninstance:" + curNotifier.instance_id,
                                    url: curNotifier.frame_url,
                                    query: params && ajx2q(params)
                                }), debugLog(e.message, e.stack, e)), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                            }
                        }
                    }.bind(this), onFail)
                }
            },
            lpChecked: function(e) {
                var t = e.failed;
                if (2 == t) return 4 == e.err ? 2 : (curNotifier.lpInvalid = !0, debugLog("notifier lpCheck error", e), clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), 1 == e.err ? 1 : 3);
                if (t) throw getLang("global_unknown_error");
                return this.lcSend("feed", extend({
                    full: curNotifier.idle_manager && curNotifier.idle_manager.is_idle && !this.canNotifyUi(),
                    key: curNotifier.key
                }, e)), curNotifier.timestamp = e.ts, Notifier.pushEvents(e.events), 0
            },
            lpOnReset: function() {
                curNotifier.lpOnReset && curNotifier.lpOnReset()
            },
            lpReset: function(e) {
                curNotifier.lpOnReset = e, clearTimeout(curNotifier.resetTO), curNotifier.resetTO = setTimeout(function() {
                    if (curNotifier.is_server && !curNotifier.lp_started) return void Notifier.lpStart();
                    if (curNotifier.lpMakeRequest && !curNotifier.lpInvalid) {
                        var e = curNotifier.key,
                            t = curNotifier.timestamp;
                        each(curNotifier.addQueues, function(i, a) {
                            e += a[2], t += "_" + a[1]
                        }), curNotifier.lpMakeRequest(curNotifier.frame_url, {
                            act: "a_release",
                            key: e,
                            ts: t,
                            id: curNotifier.uid,
                            wait: 25
                        }, Notifier.lpOnReset, Notifier.lpOnReset)
                    } else ajax.post("notifier.php?act=a_reset", !1, {
                        onDone: Notifier.lpOnReset,
                        onFail: function() {
                            return Notifier.lpOnReset(), !0
                        }
                    })
                }, 100)
            },
            lpGetKey: function() {
                ajax.post("notifier.php?act=a_get_key", {
                    id: curNotifier.uid
                }, {
                    onDone: function(e, t) {
                        curNotifier.timestamp = t, curNotifier.key = e, curNotifier.lpInvalid = !1, debugLog("notifier lpGetKey done"), this.lcSend("new_key", {
                            ts: t,
                            key: e
                        }), this.lpCheck()
                    }.bind(this),
                    onFail: function(e) {
                        switch (debugLog("notifier lpGetKey fail", e), e) {
                            case 1:
                            case 3:
                                return void Notifier.standby();
                            case 4:
                                return void Notifier.standby(300);
                            case 2:
                                return void Notifier.onRelogin()
                        }
                        return curNotifier.error_timeout = 64, clearTimeout(this.lp_error_to), this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), !0
                    }.bind(this)
                })
            },
            addKey: function(e, t, i) {
                if (curNotifier.flash_transport || !e) return !1;
                var a = e.queue || e.key,
                    r = curNotifier.addQueues[a],
                    n = !r && curNotifier.is_server;
                return r ? (r[0] = vkNow(), r[3] = t, r[4] = i) : curNotifier.addQueues[a] = [vkNow(), e.ts, e.key, t, i], i || Notifier.lcSend("new_addkey", e), n && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
            },
            addFeed: function(e, t) {
                var i = curNotifier.addQueues[e];
                isArray(i) && i.length && (i[1] = t.ts, isFunction(i[3]) && i[3](e, t))
            },
            addRecvClbk: function(e, t, i, a) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), (!curNotifier.recvClbks[e][t] || a) && (curNotifier.recvClbks[e][t] = i)
            },
            setRecvClbk: function(e, t) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] = [t]
            },
            fixPhoto: function(e, t) {
                return e = clean(e), -1 == e.indexOf("question_c.gif") ? e : t ? "/images/question_inv_xc.png" : "/images/question_inv_c.png"
            }
        }
    },
    124: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = R(e, 2),
                i = t[1];
            return {
                type: H,
                localId: i
            }
        }

        function r(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: q,
                messageId: i,
                mask: a,
                peerId: r
            }
        }

        function n(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: j,
                messageId: i,
                flags: a,
                peerId: r
            }
        }

        function o(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: z,
                messageId: i,
                flags: a,
                peerId: r
            }
        }

        function s(e) {
            var t = R(e, 11),
                i = t[1],
                a = t[2],
                r = t[3],
                n = t[4],
                o = t[5],
                s = t[6],
                c = t[7],
                u = t[8],
                l = t[9],
                d = t[10],
                f = extend(s, c || void 0);
            return s || ((0, B.imWeirdLog)("empty_other_kludges", [i, a, r, n, o, s, c, u, l, d]), s = {}), {
                type: U,
                messageId: intval(i),
                flags: intval(a),
                peerId: intval(r),
                date: intval(n),
                attaches: (0, D.convertKludgesToAttaches)(f, i),
                subject: s.title || "",
                text: o,
                kludges: f,
                randomId: intval(u),
                userId: (0, P.isChatPeer)(r) ? intval(f.from) : intval(r),
                update_time: d,
                chat_local_id: l
            }
        }

        function c(e) {
            var t = s(e);
            return t.type = pe, t
        }

        function u(e) {
            return extend({}, e, {
                type: pe
            })
        }

        function l(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: W,
                peerId: i,
                upToId: a,
                unread: r
            }
        }

        function d(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: G,
                peerId: i,
                upToId: a,
                unread: r
            }
        }

        function f(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: V,
                userId: -i,
                platform: a,
                lastSeenTs: r
            }
        }

        function h(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: K,
                userId: -i,
                reason: a,
                lastSeenTs: r
            }
        }

        function p(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3],
                n = void 0 === r ? !1 : r;
            return {
                type: te,
                peerId: i,
                mask: a,
                local: n
            }
        }

        function m(e) {
            var t = R(e, 3),
                i = t[1],
                a = t[2];
            return {
                type: ie,
                peerId: i,
                mask: a
            }
        }

        function _(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3],
                n = void 0 === r ? !1 : r;
            return {
                type: ae,
                peerId: i,
                mask: a,
                local: n
            }
        }

        function g(e) {
            var t = R(e, 3),
                i = t[1],
                a = t[2];
            return {
                type: he,
                peerId: i,
                localId: a
            }
        }

        function v(e) {
            var t = R(e, 3),
                i = t[1],
                a = t[2];
            return {
                type: Y,
                chatId: i,
                self: a
            }
        }

        function b(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: Q,
                peerId: a,
                updateType: i,
                updateArg: r
            }
        }

        function C(e) {
            var t = R(e, 5),
                i = t[1],
                a = t[2],
                r = t[3],
                n = t[4];
            return {
                type: $,
                peerId: i,
                userIds: a,
                totalCount: r,
                ts: n
            }
        }

        function y(e) {
            var t = R(e, 3),
                i = t[1],
                a = t[2];
            return {
                type: X,
                userId: i,
                callId: a
            }
        }

        function w(e) {
            var t = R(e, 4),
                i = t[1],
                a = t[2],
                r = t[3];
            return {
                type: J,
                count: i,
                countNotMuted: a,
                showOnlyNotMuted: r
            }
        }

        function k(e) {
            var t = R(e, 2),
                i = t[1],
                a = void 0 === i ? {} : i;
            return {
                type: Z,
                peerId: a.peer_id,
                sound: a.sound,
                disabledUntil: a.disabled_until
            }
        }

        function N(e) {
            var t = R(e, 2),
                i = t[1],
                a = void 0 === i ? {} : i,
                r = s([!1, a.id, a.flags, a.peer_id, a.date, a.message, extend(a.kludges, {
                    title: a.title || ""
                }), {}, a.random_id, a.chat_local_id, a.update_time]);
            return r.type = pe, r
        }

        function T(e) {
            return {
                type: ee,
                params: e
            }
        }

        function F(e) {
            return {
                type: oe,
                state: e
            }
        }

        function E() {
            return {
                type: re
            }
        }

        function S(e) {
            var t = R(e, 3),
                i = t[1],
                a = t[2];
            return {
                type: ne,
                key: i,
                url: a
            }
        }

        function x() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
            return {
                type: se,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function I(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: ue,
                peerId: e,
                msgid: t,
                forward: i,
                cancelSearch: a,
                entryPoint: r
            }
        }

        function L(e) {
            return {
                type: le,
                tab: e
            }
        }

        function A(e, t, i) {
            return {
                type: de,
                message: t,
                peer: e,
                error: i
            }
        }

        function O(e) {
            var t = R(e, 6),
                i = (t[0], t[1]),
                a = t[2],
                r = t[3],
                n = t[4],
                o = t[5];
            return {
                type: ce,
                free: !!intval(i) || intval(n) === vk.id,
                resource: a,
                peerId: intval(r),
                who: intval(n),
                name: o
            }
        }

        function M(e, t) {
            return {
                type: fe,
                message: t,
                peerId: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.FOLDER_HAS_BANNER = t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.REFRESH_LP_KEY = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CONVERSATION_UPDATED = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
        var R = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.deleteEvent = a, t.replaceFlagsEvent = r, t.setFlagsEvent = n, t.resetFlagsEvent = o, t.addMessageEvent = s, t.editMessageEvent = c, t.editMessageLocallyEvent = u, t.readInboundEvent = l, t.readOutboundEvent = d, t.gotOnlineEvent = f, t.gotOfflineEvent = h, t.resetDirectoriesEvent = p, t.replaceDirectoriesEvent = m, t.setDirectoriesEvent = _, t.deleteDialogEvent = g, t.chatChangedEvent = v, t.chatUpdatedEvent = b, t.typingEvent = C, t.videoCallEvent = y, t.unreadCountEvent = w, t.notifySettingsChangedEvent = k, t.refreshMessageEvent = N, t.emptyEvent = T, t.transitionEvent = F, t.resyncEvent = E, t.refreshLpKeyEvent = S, t.resetPeer = x, t.changePeer = I, t.changeTab = L, t.failedMessage = A, t.mutexEvent = O, t.resendEvent = M;
        var P = i(198),
            D = i(88),
            B = i(128),
            H = t.DELETE = "event_delete",
            j = t.SET_FLAGS = "event_set_flags",
            q = t.REPLACE_FLAGS = "event_replace_flags",
            z = t.RESET_FLAGS = "event_reset_flags",
            U = t.ADD_MESSAGE = "event_add_message",
            W = t.READ_INBOUND = "event_read_inbound",
            G = t.READ_OUTBOUND = "event_read_outbound",
            V = t.GOT_ONLINE = "event_got_online",
            K = t.GOT_OFFLINE = "event_got_offline",
            Y = t.CHAT_CHANGED = "event_chat_changed",
            Q = t.CONVERSATION_UPDATED = "event_chat_updated",
            $ = t.TYPING = "event_typing",
            X = t.VIDEO_CALL = "event_video_call",
            J = t.UNREAD_COUNT = "event_unread_count",
            Z = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
            ee = t.EMPTY = "event_empty",
            te = t.RESET_DIRECTORIES = "event_reset_directories",
            ie = t.REPLACE_DIRECTORIES = "event_replace_directories",
            ae = t.SET_DIRECTORIES = "event_set_directories",
            re = t.RESYNC = "event_resync",
            ne = t.REFRESH_LP_KEY = "event_refresh_lp_key",
            oe = t.TRANSITION = "transition_event",
            se = t.RESET_PEER = "reset_peer",
            ce = t.MUTEX = "mutex",
            ue = t.CHANGE_PEER = "change_peer",
            le = t.CHANGE_TAB = "event_change_tab",
            de = t.FAILED_MESSAGE = "event_failed_message",
            fe = t.RESEND = "event_resend",
            he = t.DELETE_DIALOG = "event_delete_dialog",
            pe = t.EDIT_MESSAGE = "event_edit_message";
        t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2, t.FOLDER_HAS_BANNER = 8
    },
    126: function(e, t, i) {
        "use strict";

        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t["default"] = e, t
        }

        function r(e, t) {
            return "number" != typeof t.messageId ? !0 : n(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
        }

        function n(e) {
            return e.flags & C.FLAG_OUTBOUND
        }

        function o(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                a = e.attaches[0];
            return a && (a.type === t || a.type === i)
        }

        function s(e) {
            return o(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function c(e) {
            return o(e, "doc") && "audiomsg" === e.attaches[0].kind
        }

        function u(e) {
            return o(e, "sticker")
        }

        function l(e) {
            return o(e, "gift")
        }

        function d(e) {
            return o(e, "money_transfer", "money_request")
        }

        function f(e) {
            return o(e, "money_request")
        }

        function h(e) {
            return o(e, "link") && p(e.kludges.attach1_url)
        }

        function p(e) {
            var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
                i = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
            return t.test(e) || i.test(e)
        }

        function m(e) {
            return e.flags & C.FLAG_IMPORTANT
        }

        function _(e) {
            return n(e) ? vk.id : e.userId
        }

        function g(e) {
            return e.update_time > 0
        }

        function v(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.isUnread = r, t.isOut = n, t.isGraffiti = s, t.isAudioMsg = c, t.isSticker = u, t.isGift = l, t.isMoney = d, t.isMoneyRequest = f, t.isMessageWithInviteLink = h, t.isImportant = m, t.getUserId = _, t.wasEdited = g, t.isMessageSelected = v;
        var b = i(124),
            C = a(b)
    },
    127: function(e, t, i) {
        "use strict";

        function a(e, t) {
            t = (0, c.parserMessage)(t);
            var i = vk.id == t.peerId && !(0, c.unpackStore)(e).gid;
            return 333 == t.peerId ? !1 : i || (0, u.isOut)(t) ? (0, l.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, u.isGift)(t) || (0, u.isSticker)(t) || (0, u.isAudioMsg)(t) || (0, u.isGraffiti)(t) || (0, u.isMoney)(t) || (0, u.isMessageWithInviteLink)(t) ? !1 : (0, c.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, l.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
        }

        function r(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
        }

        function n(e, t) {
            var i = t && t.msgs ? Object.keys(t.msgs) : [],
                r = i.filter(function(e) {
                    return e > 0
                }).sort(function(e, t) {
                    return t - e
                }).find(function(i) {
                    return a(e, t.msgs[i])
                });
            return +r || null
        }

        function o(e, t, i) {
            var a = (0, d.convertKludgesToAttaches)(t.kludges, t.messageId),
                n = i.dData.attaches;
            if (r(t.text) !== i.dData.txt || a.length !== n.length) return !0;
            for (var o = a.length; o--;)
                if (a[o].id != n[o].id || a[o].type != n[o].type) return !0;
            return !1
        }

        function s(e, t, i, a, r) {
            t.origText = i, t.text = (0, l.replaceSpecialSymbols)(clean(i)).replace(/\n/gi, "<br>"), t.attaches = a, t.kludges.emoji = 1, t.local = 1, t.share_url = r, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.canMessageBeEdited = a, t.convertEmojiHtmlToRegularText = r, t.findLastMessageToEdit = n, t.wasMessageReallyModified = o, t.replaceMsgAfterEdit = s;
        var c = i(190),
            u = i(126),
            l = i(198),
            d = i(88)
    },
    128: function(e, t, i) {
        "use strict";

        function a(e, t, i, a, r) {
            if ("Script error." !== e) {
                var n = r ? r.stack || r.message : null;
                o("unhandled_error", n ? {
                    err: e,
                    stack: n
                } : {
                    err: e
                })
            }
            f && f.apply(this, arguments)
        }

        function r(e) {
            e.preventDefault()
        }

        function n() {
            return !!window.imwl
        }

        function o(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
            n() && (i && window.console && (console.error(e, t), console.trace && console.trace()), (0, d.retryFn)(l.post, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: h++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function s(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return o(e, extend({
                err: t && t.message || t
            }, i)), Promise.reject(t)
        }

        function c() {
            f = window.onerror, window.onerror = a, window.addEventListener("unhandledrejection", r)
        }

        function u() {
            window.onerror = f, f = void 0, window.removeEventListener("unhandledrejection", r)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.isWeirdLogging = n, t.imWeirdLog = o, t.imWeirdCatch = s, t.startLoggingAllUnhandled = c, t.stopLoggingAllUnhandled = u;
        var l = i(98),
            d = i(34),
            f = void 0,
            h = 1
    },
    13: function(module, exports, __webpack_require__) {
        "use strict";
        window.TopNotifierCur || (window.TopNotifierCur = {
            link: "top_notify_btn",
            count: "top_notify_count",
            _qParams: {
                section: "notifications",
                _tb: 1
            },
            loaded: !1,
            offset: 0
        }), window.TopNotifier = {
            onLoad: function onLoad(rows, js, offset, header) {
                offset && TopNotifierCur.offset == offset || ((void 0 === rows || "undefined" === rows) && ajax.plainpost("/errors.php", {
                    msg: ajax.lastResp || "TopNotifier load undefinded response",
                    module: "top_notify",
                    id: vk.id,
                    host: locHost,
                    lang: vk.lang,
                    loc: (window.nav || {}).strLoc,
                    realloc: location.toString()
                }), eval("(function(){" + js + ";})()"), val(TopNotifier.getContentNode(), rows), TopNotifier.refreshHeader(header), TopNotifierCur.offset = offset, TopNotifier.cleanCount(), TopNotifier.refresh())
            },
            refreshHeader: function(e) {
                var t = geByClass1("_notify_sticky"),
                    i = geByClass1("_notify_unread"),
                    a = e && !geByClass1("_top_notify_header"),
                    r = t && t.offsetHeight || i && i.offsetHeight;
                if (a) {
                    TopNotifierCur.header = se(e);
                    var n = ce("div", {
                        className: "top_notify_header_label"
                    });
                    TopNotifierCur.header.appendChild(n)
                } else var n = geByClass1("top_notify_header_label", TopNotifierCur.header);
                if (r) {
                    if (a || !geByClass1("top_notify_header_sup_label", n)) {
                        var o = ce("div", {
                                className: "top_notify_header_sup_label",
                                innerHTML: getLang("global_unread_notifications")
                            }),
                            s = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                        val(n, ""), n.appendChild(o), n.appendChild(s)
                    }
                } else(a || geByClass1("top_notify_header_sup_label", n)) && val(n, getLang("global_notifitications"));
                a && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (r ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
                    if (TopNotifierCur.header_unread) {
                        var t = TopNotifierCur.header_unread.offsetTop + TopNotifierCur.header_unread_height < e.data.scrollTop;
                        t != TopNotifierCur.swaped && (toggleClass(TopNotifierCur.header, "top_notify_header_swap_labels", t), TopNotifierCur.swaped = t)
                    }
                }, TopNotifierCur.scrollbar.emitter.addListener("update", TopNotifierCur.header_unread_handler))) : (TopNotifierCur.header_unread_hidden || slideUp(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !0, TopNotifierCur.header_unread_handler && (TopNotifierCur.scrollbar.emitter.removeListener("update", TopNotifierCur.header_unread_handler), TopNotifierCur.header_unread_handler = null)))
            },
            preload: function() {
                TopNotifier.shown() || vk.isBanned || TopNotifierCur.loaded || ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    _preload: 1
                }), {
                    cache: 1,
                    onDone: function(e, t, i, a) {
                        TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && TopNotifier.onLoad(e, t, i, a)
                    },
                    stat: ["feed.css", "page.css", "post.css"]
                })
            },
            loadMore: function() {
                var e = ge("ui_top_notify_load_more");
                e && !isButtonLocked(e) && (TopNotifierCur.ajax = ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    offset: TopNotifierCur.offset,
                    more: 1,
                    need_header: intval(!(geByClass1("_notify_header") || !geByClass1("_notify_sticky") && !geByClass1("_notify_unread")))
                }), {
                    onDone: function(t, i) {
                        if (TopNotifierCur.scrollbar) {
                            if (t) {
                                for (var a = null, r = TopNotifier.getContentNode(), n = cf(t); a = n.firstChild;) r.insertBefore(a, e);
                                TopNotifier.refreshHeader()
                            }
                            return i ? void(TopNotifierCur.offset = i) : void re(e)
                        }
                    },
                    showProgress: function() {
                        show(e), lockButton(e)
                    },
                    hideProgress: function() {
                        hide(e), unlockButton(e)
                    }
                }))
            },
            show: function(e) {
                if (checkEvent(e) !== !0 && !vk.isBanned) {
                    if (TopNotifier.shown() && e !== !0) return gpeByClass("top_notify_wrap", e.target, ge("top_nav")) || TopNotifier.hide(), cancelEvent(e);
                    vk.counts.ntf = 0, TopNotifier.setCount(0, !0);
                    var t = ge(TopNotifierCur.link),
                        i = ge("top_notify_cont");
                    cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), i || (TopNotifierCur.wrapper = ce("div", {
                        innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                        id: "top_notify_wrap",
                        className: "scroll_fix_wrap top_notify_wrap"
                    }), t.appendChild(TopNotifierCur.wrapper), i = ge("top_notify_cont"));
                    var a = window.innerHeight || document.documentElement.clientHeight;
                    setStyle(i, {
                        maxHeight: Math.min(Math.max(a - 200, 300), 600)
                    });
                    var r = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new r(i, {
                        global: !0,
                        stopScrollPropagationAlways: !0,
                        onmore: TopNotifier.loadMore
                    })), TopNotifierCur.loaded || (re(geByClass1("_notify_header")), re(geByClass1("_top_notify_header")), TopNotifierCur.offset = 0, ajax.post("/al_feed.php", TopNotifierCur._qParams, {
                        cache: 1,
                        onDone: TopNotifier.onLoad,
                        showProgress: TopNotifier.showProgress,
                        stat: ["feed.css"]
                    }), TopNotifierCur.loaded = !0), addClass(TopNotifierCur.link, "active"), TopNotifier.refresh(), e !== !0 && cancelStackPush("top_notifier", TopNotifier.hide.bind(TopNotifier), !0), e ? cancelEvent(e) : !1
                }
            },
            hide: function() {
                TopNotifier.shown() && (removeClass(TopNotifierCur.link, "active"), cancelStackFilter("top_notifier", !0))
            },
            shown: function() {
                return hasClass(TopNotifierCur.link, "active")
            },
            getContentNode: function() {
                return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.content && TopNotifierCur.scrollbar.container.__uiScroll__ ? TopNotifierCur.scrollbar.content : ge("top_notify_cont")
            },
            showProgress: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                var e = TopNotifier.getContentNode();
                geByClass1("pr", e) || (val(e, ""), showProgress(e), TopNotifier.refresh())
            }),
            showTooltip: function(e) {
                function t(t, i) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                function i(e) {
                    if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                        var t = e.split(":"),
                            i = ls.get("ntfseen") || {};
                        2 == t.length && (i[0] = parseInt((new Date).getTime() / 1e3), i[t[0]] = t[1], ls.set("ntfseen", i))
                    }
                }
                if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                    var a = ge(TopNotifierCur.link),
                        r = {};
                    if (a) {
                        if ("shownow" == a.tt && removeAttr(a, "tt"), e) r.text = function() {
                            return e
                        }, t && (r.onHide = i.pbind(t));
                        else {
                            a.tt && a.tt.destroy && a.tt.destroy();
                            var n = ls.get("ntfseen") || {},
                                o = [];
                            each(n, function(e, t) {
                                o.push(e + ":" + t)
                            }), r = extend(r, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: o.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: i
                            })
                        }
                        var s = function c(e) {
                            setTimeout(function() {
                                return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void c(e) : (e && e.hide(), void Notifier.lcSend("hide_notify_tt"))
                            }, 6e3)
                        };
                        showTooltip(a, extend(r, {
                            typeClass: "top_notify_tt",
                            dir: "up",
                            width: 250,
                            shift: [0, 0],
                            nohideover: 1,
                            nohide: 1,
                            onShowStart: function(e) {
                                TopNotifier.shown() && (e.opts.onHide = !1, e.hide()), addEvent(e.container, "mousedown", function(e) {
                                    return e && inArray(e.target.tagName, ["A", "IMG"]) ? void 0 : (TopNotifier.show(e), cancelEvent(e))
                                }), s(e), Notifier.setRecvClbk("hide_notify_tt", e.hide)
                            }
                        }))
                    }
                }
            }),
            invalidate: function() {
                TopNotifierCur.loaded = !1, ajax.invalidate("/al_feed.php", TopNotifierCur._qParams), TopNotifierCur.ajax && TopNotifierCur.ajax.abort()
            },
            setCount: function(e, t) {
                isString(e) && (e = trim(e)), parseInt(e) >= 100 && (e = "+99"), hasClass(TopNotifierCur.link, "has_notify") && e ? animateCount(TopNotifierCur.count, e, {
                    str: "auto"
                }) : val(TopNotifierCur.count, e), toggleClass(TopNotifierCur.link, "has_notify", !!e), t || TopNotifier.invalidate()
            },
            cleanCount: function() {
                cur.topNotifyHash && ajax.post("/al_feed.php", {
                    act: "a_clean_notify",
                    hash: cur.topNotifyHash
                })
            },
            refresh: function() {},
            postTooltip: function(e, t, i) {
                return !1
            },
            hideRow: function(e, t, i) {
                var a = gpeByClass("_feed_row", e);
                if (!a) {
                    var r = gpeByClass("top_notify_wrap", e);
                    a = geByClass("_feed_row", r), a = a[a.length - 1]
                }
                ajax.post("/al_feed.php", {
                    act: "a_hide_notify",
                    item: t,
                    hash: i
                });
                var n = gpeByClass("_ui_menu_wrap", e);
                n && TopNotifier.hideActionsMenu(n), slideUp(a, 200, function() {
                    re(a);
                    var e = TopNotifier.getContentNode();
                    geByClass("feed_row", e).length ? TopNotifier.refreshHeader() : val(e, '<div class="top_notify_empty no_rows">' + getLang("news_no_new_notifications") + "</div>"), TopNotifier.refresh()
                })
            },
            deleteRow: function(e, t, i, a, r, n) {
                var o = ge("top_feedback_row" + e),
                    s = geByClass1("post_actions", o);
                TopNotifier.hideActionsMenu(geByClass1("_ui_menu_wrap", o)), ajax.post("al_feed.php", {
                    act: "a_feedback_delete",
                    item: t,
                    hash: a,
                    types: i,
                    candel: n,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", o),
                            i = geByClass1("_feedback_deleted", o);
                        i ? (i.innerHTML = '<span class="dld_inner">' + e + "</span>", show(i)) : o.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(o, "feedback_row_clickable") && addClass(o, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(s, "post_actions_progress"),
                    hideProgress: removeClass.pbind(s, "post_actions_progress")
                })
            },
            unifiedDeleteRow: function(e, t, i) {
                var a = gpeByClass("feedback_row_wrap", i),
                    r = domPN(a),
                    n = geByClass1("post_actions", r);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: e,
                    hash: t,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", a),
                            i = geByClass1("_feedback_deleted", a);
                        i ? (i.innerHTML = '<span class="dld_inner">' + e + "</span>", show(i)) : r.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(r, "feedback_row_clickable") && addClass(r, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(n, "post_actions_progress"),
                    hideProgress: removeClass.pbind(n, "post_actions_progress")
                })
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var i = t.target || t.srcElement,
                    a = 8,
                    r = !1,
                    n = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do
                    if (!i || i == e || i.onclick || i.onmousedown || inArray(i.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (r = i.className.match(n))) break; while (a-- && (i = i.parentNode));
                if (!r) return !1;
                if (i && i.className) {
                    for (var o = i.className.split(" "), s = "unknown", c = -1, u = geByClass("feedback_row"), a = 0; a < o.length; ++a) {
                        var l = o[a].match("feedback_(.+)_row");
                        if (o[a] && l && l[1]) {
                            s = l[1];
                            break
                        }
                    }
                    for (var a = 0; a < u.length; ++a)
                        if (u[a] == i) {
                            c = a;
                            break
                        }
                    statlogsValueEvent("feed_top_notify", 0, "click", s, c)
                }
                return i || !0
            },
            ungroup: function ungroup(item, event) {
                var el = ge("top_feedback_row" + item);
                if (event = event || window.event, el && !hasClass(el, "feedback_row_expanded") && !checkEvent(event) && TopNotifier.checkClick(el, event)) {
                    var hid = domNS(domPN(el)),
                        names = geByClass1("_header", el),
                        text = domData(names, "text");
                    show(hid), removeClass(el, "feedback_row_grouped"), addClass(el, "feedback_row_expanded"), val(names, text), el.onclick = eval("(function(){ if (!TopNotifier.checkClick(this, event)) return; " + unclean(domData(names, "click")) + ";})")
                }
            },
            ungroupUnified: function(e, t) {
                var i = ge("top_feedback_row" + e);
                if (t = t || window.event, i && !hasClass(i, "feedback_row_expanded") && !checkEvent(t) && TopNotifier.checkClick(i, t)) {
                    var a = domNS(domPN(i));
                    show(a), re(domPN(i)), t.stopPropagation(), t.preventDefault()
                }
            },
            showActionsMenu: function(e) {
                var t = !1,
                    i = domClosest("_feed_row", e),
                    a = domPN(i);
                a.lastChild != i || hasClass(a, "feedback_sticky_rows") && domPN(a).lastChild != a || (t = {
                    appendParentCls: "top_notify_wrap",
                    processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
                }), uiActionsMenu.show(e, !1, t)
            },
            hideActionsMenu: function(e) {
                uiActionsMenu.hide(e)
            },
            frProcess: function(e, t, i, a) {
                if (!isButtonLocked(i)) {
                    var r;
                    r = a ? {
                        act: "add",
                        mid: e,
                        hash: t,
                        request: 1,
                        from: "top_notifier"
                    } : {
                        act: "remove",
                        mid: e,
                        hash: t,
                        report_spam: 1,
                        from: "top_notifier"
                    }, statlogsValueEvent("feed_top_notify", 0, "friends", r.act), ajax.post("/al_friends.php", r, {
                        onDone: function(t) {
                            var r = domPN(i);
                            val(r, t), addClass(r, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, a))
                        },
                        onFail: function(e) {
                            return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                        },
                        showProgress: lockButton.pbind(i),
                        hideProgress: unlockButton.pbind(i)
                    })
                }
            },
            grProcess: function(e, t, i, a) {
                if (!(hasClass(i, "flat_button") && isButtonLocked(i) || domFC(i) && "progress_inline" == domFC(i))) {
                    var r = -2 == a ? "spam" : a ? "enter" : "leave",
                        n = -1 == a ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: r,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: n
                    }, {
                        onDone: function(e) {
                            var t = domPN(i);
                            val(t, e), addClass(t, "feedback_buttons_response")
                        },
                        onFail: function(e) {
                            return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                        },
                        showProgress: function() {
                            if (-2 == a) {
                                i.oldhtml = i.innerHTML;
                                var e = getSize(i)[0];
                                i.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(i), {
                                    width: e
                                })
                            } else lockButton(i)
                        },
                        hideProgress: function() {
                            -2 == a ? i.innerHTML = i.oldhtml : unlockButton(i)
                        }
                    })
                }
            },
            showGiftBox: function(e, t) {
                return !showBox("al_gifts.php", {
                    act: "get_gift_box",
                    fids: e,
                    fr: 1
                }, {
                    stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                    cache: 1,
                    dark: 1
                }, t)
            }
        }
    },
    134: function(e, t, i) {
        "use strict";

        function a(e, t) {
            function i() {
                return s > 0
            }

            function a() {
                !u.length || i() || l || (t(u), u = [])
            }

            function o() {
                var e = window.extend({}, window.lpConnect.options, {
                    ts: c
                });
                (0, n.lpLogFc)("orange", "createLongPoll to load from", c), l = !0;
                var t = (0, r.createLongPoll)(e, function(e, i, r) {
                    var o;
                    (0, n.lpLogFc)("orange", "Loaded [" + e + "," + i + ")"), t.stopConnection(), c = i, l = !1, (o = u).push.apply(o, r), a()
                })
            }
            var s = 0,
                c = e,
                u = [],
                l = !1;
            return {
                pause: function() {
                    s++
                },
                resume: function() {
                    s > 0 && (s--, a())
                },
                onLp: function(e, t, i) {
                    if (!l)
                        if (c >= e) {
                            var r;
                            c = t, (r = u).push.apply(r, i), a()
                        } else o()
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createLongpollEventsQueue = a;
        var r = i(96),
            n = i(138)
    },
    138: function(e, t, i) {
        "use strict";

        function a(e, t) {
            var i;
            if (window.vk.lpConfig.debug) {
                for (var a = "background: " + e + "; color: white", r = new Date, n = function(e) {
                        return 10 > e ? "0" + e : e
                    }, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; o > c; c++) s[c - 2] = arguments[c];
                (i = console).log.apply(i, ["%c " + r.getHours() + ":" + n(r.getMinutes()) + ":" + n(r.getSeconds()) + ":" + r.getMilliseconds() + " " + t + " ", a].concat(s))
            }
        }

        function r() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function n() {
            return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
        }

        function o(e, t) {
            window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
                msg: e,
                ev: t,
                is_master: window.curNotifier.is_server
            }), setTimeout(s, 1e4)
        }

        function s() {
            window.lpWeird.length && ((0, h.imWeirdLog)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function c() {
            var e = Date.now() - 3e4;
            window.lpBufferFc = r().filter(function(t) {
                return t.time > e
            }), window.lpBufferIm = n().filter(function(t) {
                return t.time > e
            })
        }

        function u() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function l() {
            u() && (n().forEach(function(e) {
                var t = r().find(function(t) {
                    return e.ev === t.ev
                });
                !t && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, a("red", "im not fc", e.ev), (0, h.isWeirdLogging)() && o("im not fc", e.ev))
            }), r().forEach(function(e) {
                var t = n().find(function(t) {
                    return t.ev === e.ev
                });
                t && t.warned && !e.warned && (e.warned = !0, a("red", "now fc like im", e.ev), (0, h.isWeirdLogging)() && o("now fc like im", e.ev))
            })), c()
        }

        function d(e) {
            if (u()) {
                var t;
                (t = r()).push.apply(t, e.map(function(e) {
                    return {
                        time: Date.now(),
                        ev: JSON.stringify(e),
                        warned: !1
                    }
                })), setTimeout(l, 0)
            }
            a.apply(void 0, ["green", "fc"].concat(e))
        }

        function f(e) {
            if (u()) {
                var t;
                (t = n()).push.apply(t, e.map(function(e) {
                    return {
                        time: Date.now(),
                        ev: JSON.stringify(e),
                        warned: !1
                    }
                })), setTimeout(l, 1100)
            }
            a.apply(void 0, ["blue", "im"].concat(e))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.lpLogFc = a, t.longpollTesting_onFcEvents = d, t.longpollTesting_onImEvents = f;
        var h = i(128);
        window.longpollTesting_onImEvents = f
    },
    141: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function r(e, t) {
            return setTimeout(a(e), t)
        }

        function n(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function o(e, t) {
            return Math.floor(n(e, t))
        }

        function s(e) {
            return "undefined" == typeof e
        }

        function c(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        }

        function u(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            return "string" == typeof e
        }

        function d(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function f(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function h() {
            return +new Date
        }

        function p() {
            return window.Image ? new Image : ce("img")
        }

        function m(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function _(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function g(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function v(e) {
            return e === !0 ? 1 : parseInt(e) || 0
        }

        function b(e) {
            return e === !0 ? 1 : parseFloat(e) || 0
        }

        function C(e) {
            return e = v(e), 0 > e ? 0 : e
        }

        function y(e) {
            return !isNaN(e)
        }

        function w(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return t = v(t), t >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function k(e) {
            return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function N(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function T(e) {
            return k(e.replace(/\t/g, "\n"))
        }

        function F(e, t) {
            if (d(e) || "undefined" == typeof e.length) {
                for (var i in e)
                    if (Object.prototype.hasOwnProperty.call(e, i) && t.call(e[i], i, e[i]) === !1) break
            } else
                for (var a = 0, r = e.length; r > a; a++) {
                    var n = e[a];
                    if (t.call(n, a, n) === !1) break
                }
            return e
        }

        function E(e, t, i) {
            for (var a = i || 0, r = (e || []).length; r > a; a++)
                if (e[a] == t) return a;
            return -1
        }

        function S(e, t) {
            return -1 != E(t, e)
        }

        function x(e, t) {
            var i = d(e) || "undefined" == typeof e.length ? {} : [];
            for (var a in e)(!/webkit/i.test(_ua) || "layerX" != a && "layerY" != a && "webkitMovementX" != a && "webkitMovementY" != a) && (t && "object" === D(e[a]) && "prototype" !== a && null !== e[a] ? i[a] = x(e[a]) : i[a] = e[a]);
            return i
        }

        function I(e) {
            var t, i, a = {},
                r = 1,
                n = arguments.length,
                o = arguments;
            for (t in e) {
                for (i = !1, r = 1; n > r; r++) o[r][t] && o[r][t] == e[t] && (i = !0);
                i || (a[t] = e[t])
            }
            return a
        }

        function L() {
            var e, t = arguments,
                i = t[0] || {},
                a = 1,
                r = t.length,
                n = !1;
            for ("boolean" == typeof i && (n = i, i = t[1] || {}, a = 2), "object" === ("undefined" == typeof i ? "undefined" : D(i)) || c(i) || (i = {}); r > a; ++a)
                if (null != (e = t[a]))
                    for (var o in e) {
                        var s = i[o],
                            u = e[o];
                        i !== u && (n && u && "object" === ("undefined" == typeof u ? "undefined" : D(u)) && !u.nodeType ? i[o] = L(n, s || (null != u.length ? [] : {}), u) : void 0 !== u && (i[o] = u))
                    }
            return i
        }

        function A(e) {
            window.templates = window.templates || {}, L(window.templates, e)
        }

        function O(e, t) {
            var i = window.templates = window.templates || {},
                a = i[e];
            return "function" == typeof a && (a = a()), a && t ? rs(a, t) : a || ""
        }

        function M(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : D(e))) return !1;
            var t = {},
                i = function(t) {
                    return geByTag(t, e)
                },
                a = function(i, a) {
                    if (a.name)
                        if ("text" != a.type && a.type)
                            if (a.getAttribute("bool")) {
                                var r = val(a);
                                if (!r || "0" === r) return;
                                t[a.name] = 1
                            } else t[a.name] = browser.msie && !a.value && e[a.name] ? e[a.name].value : a.value;
                    else t[a.name] = val(a)
                };
            return F(i("input"), function(e, t) {
                return "radio" != t.type && "checkbox" != t.type || t.checked ? a(e, t) : void 0
            }), F(i("select"), a), F(i("textarea"), a), t
        }

        function R(e, t) {
            for (var i, a = t ? H : B, r = []; e && (i = e.match(a));) {
                e = e.substr(i.index + i[0].length);
                var n = 0;
                i[4] || (n = 7), r.push({
                    url: i[2 + n],
                    query: i[5 + n] || "",
                    domain: i[4 + n]
                })
            }
            return r
        }

        function P() {
            return window.devicePixelRatio >= 2
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.vkLocal = a, t.lTimeout = r, t.rand = n, t.irand = o, t.isUndefined = s, t.isFunction = c, t.isArray = u, t.isString = l, t.isObject = d, t.isEmpty = f, t.vkNow = h, t.vkImage = p, t.trim = m, t.stripHTML = _, t.escapeRE = g, t.intval = v, t.floatval = b, t.positive = C, t.isNumeric = y, t.winToUtf = w, t.replaceEntities = k, t.clean = N, t.unclean = T, t.each = F, t.indexOf = E, t.inArray = S, t.clone = x, t.arrayKeyDiff = I, t.extend = L, t.addTemplates = A, t.getTemplate = O, t.serializeForm = M, t.extractUrls = R, t.isRetina = P, window.PageID = window.PageID || 1;
        var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
        window.isRetina = P, window.extractUrls = R, window.serializeForm = M, window.addTemplates = A, window.getTemplate = O, window.rand = n, window.irand = o, window.isUndefined = s, window.isFunction = c, window.isArray = u, window.isString = l, window.isObject = d, window.isEmpty = f, window.vkNow = h, window.vkImage = p, window.trim = m, window.stripHTML = _, window.escapeRE = g, window.intval = v, window.floatval = b, window.positive = C, window.isNumeric = y, window.winToUtf = w, window.replaceEntities = k, window.clean = N, window.unclean = T, window.each = F, window.indexOf = E, window.inArray = S, window.clone = x, window.arrayKeyDiff = I, window.extend = L, window.vkLocal = a, window.lTimeout = r
    },
    149: function(e, t, i) {
        e.exports = i(29)
    },
    174: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                i = e.split("_"),
                a = _(i, 2),
                r = a[0],
                n = a[1];
            return [r, n, t]
        }

        function r(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (n > 50) return [
                [], e.length
            ];
            for (var o = [], s = ""; i < e.length;) {
                var c = e[i];
                if ("id" === c) s = t[i];
                else if ("," === c && s) o.push(a(s)), s = "";
                else if ("(" === c) {
                    var u = r(e, t, i + 1, n + 1),
                        l = _(u, 2),
                        d = l[0],
                        f = l[1];
                    i = f, o.push(a(s, d)), s = ""
                } else if (")" === c) return "" !== s && o.push(a(s)), [o, i];
                i++
            }
            return s && o.push(a(s)), [o, i]
        }

        function n(e) {
            if (k[e]) return k[e];
            for (var t = e ? e.length : 0, i = [], a = [], n = "", o = 0; t > o; o++) {
                var s = e[o],
                    c = s.charCodeAt(0);
                c >= 48 && 57 >= c || "_" === s || "-" === s ? n += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== n && (a.push(n), i.push("id"), n = ""), a.push(s), i.push(s))
            }
            n.length > 0 && (a.push(n), i.push("id"));
            var u = r(i, a),
                l = _(u, 1),
                d = l[0];
            return Object.keys(k).length > 300 && (k = {}), k[e] = d, d
        }

        function o(e, t) {
            for (var i = void 0, a = 0, r = e; null !== (i = g.MESSAGE_REGEXP.exec(e));) {
                i = u(i);
                var n = i[0].length,
                    o = i.index + n,
                    s = e[i.index - 1],
                    c = e[o - 1],
                    d = void 0 !== s && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(s),
                    f = void 0 !== c && /([:;$])/i.test(c);
                if (!d && !f) {
                    var h = l(i),
                        p = h.domain;
                    if (p.length <= g.MAX_DOMAIN_LENGTH && -1 !== g.TOP_DOMAINS.indexOf(p)) {
                        var m = t(h);
                        r = r.slice(0, i.index + a) + m + r.slice(o + a), a += m.length - n
                    }
                }
            }
            return r
        }

        function s(e, t) {
            return e.replace(g.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function c(e, t) {
            return e.replace(g.MENTION, t || function(e, t, i, a, r) {
                return '<a href="/' + (t + i) + '" class="mem_link" mention="' + C(a || "") + '" mention_id="' + C(t + i) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + r + "</a>"
            })
        }

        function u(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                i = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][i] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, i)), e
        }

        function l(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function d() {
            return v || (v = new RegExp(g.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
        }

        function f(e, t) {
            return e.replace(d(), function(e, i, a, r, n, o) {
                return (i || "") + t(a + (n || ""))
            })
        }

        function h(e) {
            w("ttl_message_confirm_delivery", e)
        }

        function p(e, t) {
            var i = t.protocol,
                a = t.url,
                r = t.query,
                n = t.domain,
                o = t.full;
            try {
                o = decodeURIComponent(o)
            } catch (s) {}
            if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = C(o).replace(/&amp;/g, "&"), !e && n.match(g.OUR_DOMAINS)) {
                a = y(a).replace(g.ENTITIES, encodeURIComponent);
                var c = a,
                    u = a.indexOf("#/"),
                    l = "",
                    d = void 0;
                return u >= 0 ? c = a.substr(u + 1) : (u = a.indexOf("#!"), u >= 0 && (c = "/" + a.substr(u + 2).replace(/^\//, ""))), d = c.match(g.VK_DOMAIN), d && d[1].length < 32 && (l = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + m(i + a + r) + '" target="_blank"' + l + ">" + o + "</a>"
            }
            var f = "away.php?utf=1&to=" + encodeURIComponent(i + y(a + r)),
                h = C((i + a + r).replace(/'/g, "\\'")),
                p = "return goAway('" + h + "', {}, event);";
            return '<a href="' + f + '" target="_blank" onclick="' + p + '">' + o + "</a>"
        }

        function m(e) {
            return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var _ = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.parseFwd = n, t.replaceHyperLinks = o, t.replaceEmailLinks = s, t.replaceMentions = c, t.replaceHashtags = f, t.confirmDelivery = h, t.linksReplacer = p;
        var g = i(81),
            v = void 0,
            b = window,
            C = b.clean,
            y = b.replaceEntities,
            w = b.statlogsValueEvent,
            k = {}
    },
    175: function(e, t, i) {
        "use strict";

        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t["default"] = e, t
        }

        function r(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function n(e) {
            return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
        }

        function o(e) {
            if (!e.renew_hashes) {
                var t = e.last_hashes_update || 0;
                if (Date.now() - t < 1e4) return Promise.resolve();
                var i = Object.keys(e.tabs).filter(function(t) {
                    return (0, Ut.isFullyLoadedTab)(e, t)
                });
                e.renew_hashes = (0, Pt.post)(Pt.CONTROLLER, {
                    act: "a_renew_hash",
                    peers: i.join(","),
                    gid: e.gid
                }).then(function(t) {
                    var a = Rt(t, 2),
                        r = a[0],
                        n = a[1];
                    return i.forEach(function(t) {
                        e.tabs[t].hash = r[t]
                    }), e.writeHash = n, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                })
            }
            return e.renew_hashes
        }

        function s(e, t, i) {
            return n(e).then(function(a) {
                return a ? t.apply(void 0, i) : o(e).then(function(e) {
                    return t.apply(void 0, i)
                })
            })
        }

        function c(e) {
            return function() {
                var t = arguments,
                    i = t[t.length - 1];
                return e.apply(void 0, t)["catch"](function(a) {
                    if (a && a.match && a.match(/1001;/)) return s(i, e, t);
                    throw a
                })
            }
        }

        function u(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function l(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function d(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function f(e, t, i, a, r) {
            return r.tabHistoryNotChanged = !1, (0, jt.retryFn)(Pt.post, 3, function(e) {
                return e - 1
            })(Pt.CONTROLLER, {
                act: "a_start",
                peer: e,
                msgid: i,
                history: t,
                prevpeer: r.prevPeer,
                gid: r.gid,
                block: a
            }).then(function(t) {
                var a = Rt(t, 5),
                    n = a[0],
                    o = a[1],
                    s = a[2],
                    c = a[3],
                    u = a[4];
                if (o.forEach(function(e) {
                        return (0, Kt.oCacheAdd)(r, e)
                    }), r.tabs || (r.tabs = {}), r.dialog_tab_cts = u, r.tabs[e] || (r.tabs[e] = (0, Ut.normalizeTab)(r, n)), d(c, r), i) {
                    if (r.tabs[e]) {
                        var l = r.tabs[e].lastmsg,
                            f = r.tabs[e].lastmsg_meta;
                        extend(r.tabs[e], n), r.tabs[e].lastmsg = l, r.tabs[e].lastmsg_meta = f
                    }
                } else extend(r.tabs[e], n);
                return r.admins = extend(r.admins, s), r.imQueue(e, !1), Lt(), h(e, r)
            })["catch"](function(e) {
                return (0, Yt.imWeirdCatch)("loadPeer", e)
            })
        }

        function h(e, t) {
            var i = t.imQueue(e, !1),
                a = t.tabs[e],
                r = i.filter(function(i) {
                    return !(0, Gt.isRidExist)(t, e, i.rid)
                });
            return a.msgs = r.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, a.msgs), t.imQueueSet(e, r), t.tabs[e].history = (0, Ut.restoreQueue)(r, t, u(t.tabs[e].history)), Promise.resolve(t)
        }

        function p(e, t, i) {
            var a = i.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return i.imQueueSet(e, a), i.tabs[e].history = (0, Ut.removeMessages)([t], u(i.tabs[e].history)), Promise.resolve(i)
        }

        function m(e, t) {
            return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                var i = Rt(e, 1),
                    a = i[0];
                return d(a, t)
            })
        }

        function _(e, t) {
            var i = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, (0, Ut.isFullyLoadedTab)(t, i) && !t.tabs[i].msgid ? (t.gid && m(i, t), Promise.resolve(t).then(y)) : ((0, Ut.isFullyLoadedTab)(t, i) && (t.tabs[i].msgid = !1), f(i, e, !1, !0, t))
            }).then(y).then(g.bind(null, i))
        }

        function g(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
            return (0, Ut.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, Ut.isTabLoaded)(t, e) && i && (t.tabs[e].last_visited = Date.now()), t
        }

        function v(e, t, i) {
            var a = i.msgid,
                r = i.peer;
            return !e && (0, Ut.isFullyLoadedTab)(i, r) && i.tabs[r].msgs[a] ? (t === i.peer ? i.tabHistoryNotChanged = !0 : i.tabHistoryNotChanged = !1, i.gid && m(r, i), Promise.resolve(i).then(y).then(g.bind(null, r))) : f(r, !0, a, !0, i).then(y).then(function() {
                var e = (0, Gt.getTab)(i, r);
                return e.msgid = a, i
            }).then(g.bind(null, r))
        }

        function b(e, t, i, a) {
            if (We(a)) throw (0, Ut.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
            var r = a.gid ? "gim" + a.gid : "im";
            if (a.prevPeer = a.peer, a.peer = e, a.msgid = t || "", a.currentEntryPoint = i, cur.peer = e, ii({
                    sel: e ? (0, Ut.convertPeerToUrl)(e) : null,
                    msgid: a.msgid,
                    email: "",
                    0: r
                }), 0 != a.prevPeer && g(a.prevPeer, a, !0), 0 !== e) {
                var n = [];
                (0, Ut.isTabLoaded)(a, e) && g(e, a, !0), n = a.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(a.tabbedPeers) : a.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), st(n, !1, a)
            } else st(a.tabbedPeers, !1, a);
            return ai(), de(a.prevPeer, a)
        }

        function C(e) {
            if (cur.wallMentions = [], (0, Ut.isChatPeer)(e.peer) && (0, Ut.isFullyLoadedTab)(e, e.peer)) {
                var t = e.tabs[e.peer],
                    i = [];
                Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                    var a = (0, Gt.parserMessage)(t.msgs[e]),
                        r = a && a.userId;
                    r && r != vk.id && -1 === i.indexOf(r) && (0, Ut.isUserAliveInChat)(t, r) && i.push(r)
                }), (t.memberIds || []).forEach(function(e) {
                    -1 === i.indexOf(e) && i.push(e)
                }), i.forEach(function(t) {
                    if ((0, Kt.oCacheExists)(e, t)) {
                        var i = (0, Kt.oCacheGet)(e, t),
                            a = i.link.substring(1);
                        cur.wallMentions.push([i.id, i.name, "@" + a, i.photo, void 0, void 0, void 0, a, i.first_name])
                    }
                })
            }
        }

        function y(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var i = e.tabs[t],
                a = [],
                r = (0, Ut.isChatPeer)(t) && (i.data.closed || i.data.kicked);
            i.offset && a.push("photos"), i.offset && a.push("search"), (-2e9 > t || i.offset) && a.push("clear"), (0, Ut.isCommunityInterface)(e) && a.push("block"), (0, Ut.isCommunityPeer)(t) && (i.blocked_community ? a.push("allow_community") : a.push("block_community")), !(0, Ut.isChatPeer)(t) && !(0, Ut.isUserPeer)(t) || (0, Ut.isCommunityInterface)(e) || (0, Ut.isChatPeer)(t) && (i.data.kicked || i.data.closed) || (inArray(t, e.mutedPeers) ? a.push("unmute") : a.push("mute")), (0, Ut.isUserPeer)(t) && !e.gid && !i.blacklisted && i.is_friend && a.push("invite"), !e.chatSettingsAllowed && (0, Ut.isChatPeer)(t) && !r && i.data.link && a.push("invite_link"), (0, Ut.isChatPeer)(t) && !r && (e.chatSettingsAllowed || (0, $t.canChangeTitle)(e) && a.push("topic", "avatar"), (0, $t.canInviteUser)(e) && a.push("invite"), a.push("leave")), (0, Ut.isChatPeer)(t) && i.data.closed && !i.data.kicked && a.push("return"), (0, Ut.isChatPeer)(t) && e.chatSettingsAllowed && !i.data.closed && !i.data.kicked && a.push("settings"), (0, Ut.isChatPeer)(t) && i.pinned && (a.push((0, Qt.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), (0, $t.canPinOrUnpin)(e) && a.push("unpin"));
            var n = (0, Ut.chatActions)(e);
            return e.curActions = a.sort(function(e, t) {
                return ni[e] - ni[t]
            }).reduce(function(e, t) {
                return e[t] = n[t], e
            }, {}), Promise.resolve(e)
        }

        function w(e, t, i) {
            var a = i.tabs[i.peer];
            return (0, Pt.post)(Pt.CONTROLLER, {
                peer: i.peer,
                whole: e,
                act: "a_history",
                offset: a.offset + (a.skipped || 0),
                toend: t,
                gid: i.gid
            }).then(function(e) {
                var t = Rt(e, 4),
                    r = t[0],
                    n = t[1],
                    o = t[2],
                    s = t[3];
                return a.allShown = o, i.admins = extend(i.admins, s), a.history = r + l(a.history), a.historyToAppend = r, a.offset += Object.keys(n).length, a.msgs = extend(a.msgs, n), i
            })
        }

        function k(e) {
            var t = e.tabs[e.peer];
            return (0, Pt.post)(Pt.CONTROLLER, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(i) {
                var a = Rt(i, 5),
                    r = a[0],
                    n = a[1],
                    o = a[2];
                a[3], a[4], t.allShown = t.allShown || o, t.history = l(t.history) + r, t.historyToAppend = r;
                var s = Object.keys(n).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, n), e
            })
        }

        function N(e, t, i, a) {
            var r = e.tabs[t];
            return a === Ht.FLAG_OUTBOUND && r.out_up_to > i ? e : (a === Ht.FLAG_OUTBOUND ? r.out_up_to = i : r.in_up_to = i, e)
        }

        function T(e) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var i = Rt(t, 3),
                    a = i[0],
                    r = i[1],
                    n = i[2];
                return extend({}, e, {
                    imKey: a,
                    imUrl: r,
                    imPart: n
                })
            })
        }

        function F(e) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var i = Rt(t, 1),
                    a = i[0];
                return extend({}, e, {
                    imTs: a
                })
            })
        }

        function E(e, t, i) {
            var a = i.tabs[e];
            return a.msgs[t.messageId] && (a.msgs[t.messageId].errored = 1, a.history = (0, Ut.setMessageError)(e, t, u(a.history))), Promise.resolve(i)
        }

        function S(e, t, i, a) {
            var r = a.tabs[e];
            return r.msgs[t] && (r.msgs[t].errored = 0, r.lastmsg_meta = i, r.lastmsg = t, r.history = (0, Ut.startResendMessage)(e, t, u(r.history))), Promise.resolve(a)
        }

        function x(e, t, i, a) {
            var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, n) {
                return !i && !$e(n)(t) || r && !r(n, e[n], t) || (e[n] = (0, qt.arrayUnique)(a(e[n], n))), e
            }, e.dialog_tabs))
        }

        function I(e, t) {
            return 0 === e.length ? Promise.resolve(t) : (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(function(e) {
                var i = Rt(e, 1),
                    a = i[0];
                return t.admins = extend(t.admins, a), t
            })
        }

        function L(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var i = {
                    peer: e,
                    type: "temp"
                };
                st(t.tabbedPeers.concat([i]), !1, t)
            }
        }

        function A(e, t, i) {
            return (0, Ut.isReversedDialogs)(i) ? t.concat([e]) : [e].concat(t)
        }

        function O(e, t) {
            var i = (0, Gt.getTab)(t, e.peerId);
            if ((0, Ut.isFullyLoadedTab)(t, e.peerId)) {
                var a = u(i.history);
                i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, Ut.editAndReplaceMessage)(t, e, a)
            }
            i && i.lastmsg == e.messageId && (i.lastmsg_meta = e);
            var r = i && i.pinned && (0, Gt.parserMessage)(i.pinned);
            return r && r.messageId == e.messageId && (i.pinned = e), Promise.resolve(t)
        }

        function M(e, t) {
            var i = e.flags & Ht.FLAG_OUTBOUND,
                a = e.peerId;
            if ((0, Ut.isTabLoaded)(t, a)) {
                var n = t.tabs[a];
                if (n.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = r({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), i ? n.unread = 0 : (n.lastmsg == e.messageId && n.unread ? R(t, 1, e.peerId) : (!n.unread && R(t, 1, e.peerId), n.unread++), L(e.peerId, t)), (0, Ut.isFullyLoadedTab)(t, a)) {
                    var o = u(n.history);
                    n.skipped > 0 && n.skipped++, n.offset++, n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, Ut.appendToHistory)(t, e, o, !0, !0, !0), (0, Vt.isOut)(e) && (n.blocked_community = 0, y(t))
                }
                if (n.typing) {
                    var s = n.typing.userIds.indexOf(e.userId);
                    s >= 0 && n.typing.userIds.splice(s, 1)
                }
                return n.lastmsg = e.messageId, n.lastmsg_meta = e, g(e.peerId, t), x(t, n, !1, A.bind(null, a), et.bind(null, t)), Promise.resolve(t)
            }
            return f(a, 0, 0, 0, t).then(function(t) {
                var r = t.tabs[a];
                return x(t, r, !1, A.bind(null, a), et.bind(null, t)), g(e.peerId, t), i || L(e.peerId, t), t
            })
        }

        function R(e, t, i) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[i], e.unread_cnt += t
        }

        function P(e, t) {
            if ((0, Ut.isFullyLoadedTab)(t, e.peerId)) {
                var i = t.tabs[e.peerId],
                    a = i.unread;
                if (t = N(t, e.peerId, e.upToId, 0), null != e.unread ? i.unread = e.unread : i.unread = e.upToId >= i.lastmsg ? 0 : (0, Gt.countUnread)(e.peerId, t) + (i.unread > 0 ? +i.skipped : 0), a > 0 && !i.unread && R(t, -1, e.peerId), !i.skipped) {
                    var r = u(i.history);
                    i.history = (0, Ut.removewNewUnreadBarAndMerge)(t, r, e.peerId)
                }
            } else(0, Ut.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && R(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return (0, Ut.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Wt.FOLDER_UNREAD] = t.dialog_tabs[Wt.FOLDER_UNREAD].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== Wt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Xe(Wt.FOLDER_ALL, t)
        }

        function D(e, t) {
            var i = t.tabs[e.peerId];
            if ((0, Ut.isTabLoaded)(t, e.peerId) && N(t, e.peerId, e.upToId, Ht.FLAG_OUTBOUND), (0, Ut.isFullyLoadedTab)(t, e.peerId)) {
                var a = u(i.history);
                i.history = (0, Ut.markMessagesAsRead)(t, e.peerId, a)
            }
            return Promise.resolve(t)
        }

        function B(e, t, i, a, r) {
            return r.text = {}, r.imQueue = e, r.imQueueResend = t, r.imQueueSet = i, r.imQueueComplete = a, Promise.resolve(r)
        }

        function H(e, t, i) {
            function a(e, t) {
                return {
                    id: e.messageId,
                    text: e.text,
                    date: e.date,
                    kludges: e.kludges,
                    authorName: t
                }
            }
            if (1 === e.length) {
                var n = e[0],
                    o = (0, Gt.getMessage)(i, t, n),
                    s = (0, Gt.getAuthorFullName)(i, t, n);
                return s === !1 ? i.set(Fe.bind(null, r({}, t, [o.userId]))).then(function(i) {
                    var r = (0, Gt.getAuthorFullName)(i, t, n);
                    return {
                        msgIds: e,
                        object: a(o, r)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: a(o, s)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function j(e, t) {
            (0, Ut.normalizeTabsGotFromServer)(t, e);
            var i = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(i, a) {
                var r = t.tabs[a] ? t.tabs[a].msgs : {},
                    n = extend({}, r || {}, e[a].msgs || {});
                return i[a] = extend(t.tabs[a] || {}, e[a]), n && (i[a].msgs = n), e[a].lastmsg || (i[a].lastmsg = !1), i
            }, t.tabs), i && (t.tabs[t.peer] = i), Promise.resolve(t)
        }

        function q(e, t, i, a) {
            var r = (0, Gt.getTab)(a, e);
            if (r) {
                var n = t !== !1 ? t == ei ? 2 : mobPlatforms[t] ? 1 : 0 : r.last_seen[2];
                r.online = t, r.last_seen = [t, i || r.last_seen[1], n]
            }
            return Promise.resolve(a)
        }

        function z(e, t) {
            var i = (0, Gt.getTab)(t, e.peerId);
            return i && (e.ts = Date.now() / 1e3, i.typing = e), Promise.resolve(t)
        }

        function U(e, t) {
            return (0, jt.pause)(Jt + 2).then(function() {
                if ((0, Ut.isTabLoaded)(t, e)) {
                    var i = t.tabs[e];
                    if (i.typing) {
                        var a = Date.now() - 1e3 * i.typing.ts;
                        a >= 1e3 * Jt && (i.typing = void 0)
                    }
                }
                return t
            })
        }

        function W(e) {
            return e.map(function(e) {
                return e[0] + ":" + e[1]
            }).join(",")
        }

        function G(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var i = t.selectedMessages.concat(e);
                t.selectedMessages = (0, qt.arrayUnique)(i).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function V(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function K(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Y(e, t) {
            if ((0, Ut.isFullyLoadedTab)(t, e.peerId)) {
                var i = t.tabs[e.peerId],
                    a = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, a), t.imQueueComplete(e.peerId, e.randomId), i.lastmsg_meta = e, i.lastmsg = e.messageId;
                var r = i.msgs["rid" + e.randomId];
                r && (i.msgs[e.messageId] = e, delete i.msgs["rid" + e.randomId]), i.history = (0, Ut.replaceMessageAttrs)(t, u(i.history), e)
            }
            return Promise.resolve(t)
        }

        function Q(e, t) {
            return Promise.resolve()
        }

        function $(e, t) {
            var i = {
                act: "a_get_media",
                id: e.messageId,
                gid: t.gid
            };
            return (0, jt.retryFn)(Pt.post, 3, function(e) {
                return e * e
            })(Pt.CONTROLLER, i).then(function(i) {
                return X(e, i, t)
            })["catch"](function() {
                return X(e, null, t)
            })
        }

        function X(e, t, i) {
            var a = i.tabs[e.peerId];
            return a.mediacontent || (a.mediacontent = {}), a.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], J(e, i)
        }

        function J(e, t) {
            var i = t.tabs[e.peerId];
            return i.history = (0, Ut.replaceAttaches)(u(i.history), e, t), Promise.resolve(t)
        }

        function Z(e, t, i) {
            var a = (0, Ut.dayFromVal)(t),
                r = i.tabs[e];
            return r.searchDay = a, r.searchOffset = 0, r.searchAllLoaded = !1, Promise.resolve(i)
        }

        function ee(e, t, i) {
            var a = i.tabs[t];
            return a.searchText = e, he(t, i), i
        }

        function te(e, t, i) {
            if (t) {
                var a = i.tabs[t];
                a.searchText = e, a.searchOffset = 0, a.searchAllLoaded = !1
            } else i.searchText = e, i.searchOffset = 0, i.searchAllLoaded = !1;
            return Promise.resolve(i)
        }

        function ie(e, t, i, a) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_hints",
                str: e,
                gid: a.gid,
                query: i,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = Rt(e, 3),
                    i = t[0],
                    r = t[1],
                    n = t[2];
                return d(n, a), r.forEach(function(e) {
                    return (0, Kt.oCacheAdd)(a, e)
                }), j(i, a), Object.keys(i).sort(function(e, t) {
                    return i[e].order - i[t].order
                }).map(function(e) {
                    return i[e]
                })
            })
        }

        function ae(e, t, i, a) {
            return ie(e, t, i, a).then(function(e) {
                return e.map(function(e) {
                    return {
                        peerId: e.peerId,
                        name: e.tab,
                        photo: e.photo,
                        online: e.online,
                        is_friend: "friends" === i ? !0 : !1
                    }
                })
            })
        }

        function re(e) {
            return {
                peerId: e[0],
                name: e[1],
                tab: e[1],
                photo: e[2],
                href: e[3],
                online: e[4],
                is_friend: e[5],
                local_index: !0
            }
        }

        function ne(e) {
            return function(t, i) {
                return e(i).then(function(e) {
                    var a = t ? e.search(t) : e.list,
                        r = a.map(re);
                    return i.mapped_index || (i.mapped_index = {}), r.forEach(function(e) {
                        i.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }

        function oe(e, t) {
            var i = void 0,
                a = void 0;
            t.topConvTree = new Promise(function(e) {
                i = e
            }), t.hintsTree = new Promise(function(e) {
                a = e
            });
            var r = e.select(zt.RECENT_SEARCH_OP);
            return (0, jt.retryFn)(Pt.post, 1, function() {
                return 4
            })(Pt.CONTROLLER, {
                act: "a_dialogs_preload",
                rs: r.join(","),
                gid: t.gid
            })["catch"](function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var r = Rt(e, 3),
                    n = r[0],
                    o = r[1],
                    s = r[2];
                return t.popular_sugg = s, new vkIndexer(n, function(e) {
                    return e[1]
                }, i), new vkIndexer(o, function(e) {
                    return e[1]
                }, a), t
            })
        }

        function ce(e) {
            var t = e.active_tab,
                i = void 0;
            return i = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_dialogs",
                start_message_id: i,
                tab: t,
                gid: e.gid
            }).then(function(i) {
                var a = Rt(i, 4),
                    r = a[0],
                    n = a[1],
                    o = a[2],
                    s = a[3];
                return o.forEach(function(t) {
                    return (0, Kt.oCacheAdd)(e, t)
                }), d(s, e), j(n, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(n).map(intval)), e.dialog_tabs_all[t] = !r.has_more, Promise.resolve(e)
            })
        }

        function ue(e, t) {
            var i = t.tabs[e];
            return i.searchAllLoaded
        }

        function le(e, t) {
            if (t.peer === e && (0, Ut.isFullyLoadedTab)(t, e)) {
                var i = t.tabs[e];
                return i.inplaceSearch
            }
            return !1
        }

        function de(e, t) {
            if ((0, Ut.isFullyLoadedTab)(t, e)) {
                var i = t.tabs[e];
                delete i.inplaceSearch, delete i.searchOffset, delete i.searchAllLoaded, delete i.searchText, delete i.searchDay, ii({
                    st: ""
                }), ai()
            }
            return Promise.resolve(t)
        }

        function fe(e, t) {
            if ((0, Ut.isFullyLoadedTab)(t, e)) {
                var i = t.tabs[e];
                delete i.searchDay, i.searchOffset = 0, i.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function he(e, t) {
            var i = t.tabs[e];
            return i.inplaceSearch = !0, Promise.resolve(t)
        }

        function pe(e) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function me(e, t) {
            var i = (0, Gt.getTab)(e, t);
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(a) {
                var r = Rt(a, 2),
                    n = r[0],
                    o = r[1];
                i.lastmsg = n[0] || !1, i.lastmsg_meta = n;
                var s = Rt(o, 3);
                i.unread = s[0], i.in_up_to = s[1], i.out_up_to = s[2], i.unread || (e.get().dialog_tabs[Wt.FOLDER_UNREAD] = e.get().dialog_tabs[Wt.FOLDER_UNREAD].filter(function(e) {
                    return e != t
                })), x(e.get(), i, !1, A.bind(null, t), et.bind(null, e.get()))
            })
        }

        function _e(e, t, i) {
            if ((0, Ut.isFullyLoadedTab)(i, t)) {
                var a = i.tabs[t];
                a.deleted = a.deleted ? a.deleted.concat(e) : e
            }
            return Promise.resolve(i)
        }

        function ge(e, t, i) {
            if ((0, Ut.isFullyLoadedTab)(i, t)) {
                var a = i.tabs[t];
                a.history = (0, Ut.removeMessages)(e, u(a.history)), a.offset -= e.filter(function(e) {
                    return a.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete a.msgs[e]
                }), e.forEach(function(e) {
                    var t = (i.selectedMessages || []).indexOf(e); - 1 != t && i.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(i)
        }

        function ve(e, t, i, a, r) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_mark",
                peer: t,
                hash: i,
                gid: r,
                msgs_ids: e.join(","),
                mark: a
            })
        }

        function be(e, t, i, a) {
            if ((0, Ut.isFullyLoadedTab)(a, t)) {
                var r = a.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = (0, Ut.removeMessagesWithRestore)(e, t, i, u(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length
            }
            return Promise.resolve(a)
        }

        function Ce(e, t, i) {
            if ((0, Ut.isFullyLoadedTab)(i, t)) {
                var a = i.tabs[t];
                a.deleted && (a.deleted = a.deleted.filter(function(t) {
                    return t !== e
                })), a.history = (0, Ut.restoreMessage)(e, t, u(a.history)), a.offset++
            }
            return Promise.resolve(i)
        }

        function ye(e, t, i, a) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: i,
                gid: a
            })
        }

        function we(e, t, i) {
            return t && (i.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(i)
        }

        function ke(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function Ne(e, t, i) {
            if ((0, Ut.isTabLoaded)(i, e)) {
                i.blockedFlagUpdates || (i.blockedFlagUpdates = {}), i.blockedFlagUpdates[e] = !0, x(i, i.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), i.tabs[e].unread > 0 && R(i, -1, e);
                var a = i.tabs[e];
                a.deletedDialog = !0;
                var r = i.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                });
                return st(r, !0, i), t.then(function(t) {
                    var r = Rt(t, 2);
                    return r[0], r[1], delete i.blockedFlagUpdates[e], a.msgs = null, a.history = null, a.unread = 0, a.lastmsg = !1, a.lastmsg_meta = null, i
                })
            }
        }

        function Te(e, t, i) {
            var a = i.tabs[e];
            return a.memberIds = [].concat(a.memberIds, t).filter(function(e, t, i) {
                return i.indexOf(e) === t
            }), Promise.resolve(i)
        }

        function Fe(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var i = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_load_member",
                need: i
            }).then(function(e) {
                var i = Rt(e, 1),
                    a = i[0];
                return a.forEach(function(e) {
                    return (0, Kt.oCacheAdd)(t, e)
                }), t
            })
        }

        function Ee(e, t, i) {
            function a(e, t) {
                (0, Ut.isChatPeer)(e) && t && !(0, Kt.oCacheExists)(n, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var r = {},
                n = i.get(),
                o = t.filter(function(e) {
                    return !(0, Ut.isTabLoaded)(n, e.peerId)
                }).map(function(e) {
                    return e.peerId
                });
            t.forEach(function(e) {
                (0, Ut.isTabLoaded)(n, e.peerId) && a(e.peerId, e.userId)
            }), e.forEach(function(e) {
                a(e.peerId, +e.kludges.source_mid)
            });
            var s = t.filter(function(e) {
                return e.flags & Ht.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !n.admins[e]
            });
            if (0 === Object.keys(r).length && 0 === s.length && 0 === o.length) return Promise.resolve(n);
            var c = Object.keys(r).length > 0 || s.length > 0 || o.length > 0;
            return {
                shouldLoad: c,
                needMembers: r,
                needAdminIds: s,
                needPeers: o
            }
        }

        function Se(e, t, i) {
            var a = e.needMembers,
                r = e.needAdminIds,
                n = e.needPeers;
            return t.pause(), Promise.all([Fe(a, i), I(r, i), Promise.all(n.map(function(e) {
                return f(e, 0, 0, 0, i)
            }))])["catch"](function() {
                return i
            }).then(function() {
                return t.resume()
            }).then(function() {
                return i
            })
        }

        function xe(e, t, i, a) {
            return t !== vk.id ? Promise.resolve(a) : ((0, Ut.isTabLoaded)(a, i) && a.peer == i && (a = y(a)), Promise.resolve(a))
        }

        function Ie(e, t, i) {
            var a = i.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && a.push(e), i.mutedPeers = a, cur.mutedPeers = i.mutedPeers, y(i)
        }

        function Le(e, t) {
            return t.stack = e, Promise.resolve(t)
        }

        function Ae(e, t, i, a) {
            if ((0, Ut.isFullyLoadedTab)(a, t)) {
                var r = a.tabs[t];
                e.filter(function(e) {
                    return r.msgs[e]
                }).forEach(function(e) {
                    var n = (0, Gt.getMessage)(a, t, e),
                        o = i ? n.flags | Ht.FLAG_IMPORTANT : n.flags & ~Ht.FLAG_IMPORTANT;
                    n.flags = o, r.msgs[e] = n, r.history = (0, Ut.updateStar)(e, i, u(r.history))
                })
            }
            return Promise.resolve(a)
        }

        function Oe(e, t, i) {
            i.importants || (i.importants = {});
            var a = i.importants[t] || 0;
            return a !== e && (i.important_cnt += e, i.importants[t] = e), Promise.resolve(i)
        }

        function Me(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Re(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Pe(e, t, i) {
            return i.creationType = e, i.creationFilter = t, Promise.resolve(i)
        }

        function De(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Be(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function He(e, t, i) {
            return (0, Pt.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(function(e) {
                return i
            })
        }

        function je(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var i = Object.keys(e.tabs).length,
                a = e.active_tab;
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: i,
                tab: a,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(i) {
                var n = Rt(i, 5),
                    o = n[0],
                    s = n[1],
                    c = n[2],
                    l = n[3],
                    d = n[4];
                s.forEach(function(t) {
                    return (0, Kt.oCacheAdd)(e, t)
                }), (0, Ut.normalizeTabsGotFromServer)(e, o), c.user_unread && handlePageCount("msg", c.user_unread), (0, qt.lplog)("Resync success", "success");
                var f = e.peer,
                    h = void 0;
                if ((0, Ut.isReservedPeer)(f)) h = Promise.resolve(!1);
                else {
                    var p = {
                        tabs: r({}, f, e.tabs[f]),
                        oCache: {}
                    };
                    h = j(r({}, f, o[f]), p)
                }
                return h.then(function(i) {
                    e.tabs = o, e.admins = extend(e.admins, l), i && (e.tabs[f] = i.tabs[f], e.tabs[f].history = (0, Ut.restoreQueue)(f, e, u(e.tabs[f].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[a] = d.map(intval);
                    var r = e.dialog_tabs[a].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != a
                    }).forEach(function(t) {
                        a == Wt.FOLDER_ALL ? e.dialog_tabs[t] = r.filter($e(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ge(intval(c.unread), e)
                })
            })["catch"](function(t) {
                return (0, qt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, jt.pause)(2).then(je.bind(null, e))
            })
        }

        function qe(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function ze(e, t, i) {
            return e && !i.delayed_message ? (i.delayed_message = e, i.delayed_ts = t) : e || (i.delayed_message = e, i.delayed_ts = t), Promise.resolve(i)
        }

        function Ue() {
            return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
                return Upload.options[e]
            }).filter(function(e) {
                return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
            }).length > 0 : !1
        }

        function We(e) {
            var t = e.textMediaSelector;
            return !!t.urlAttachmentLoading || Ue()
        }

        function Ge(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[Wt.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function Ve(e, t) {
            return t.ctrl_submit = !!e, (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Ke(e, t, i) {
            return function() {
                i.update_old_title = e;
                var a = Object.keys(i.cur_unread_cnt).length;
                if (0 === a) return (0, Xt.setDocumentTitle)(e ? e : document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(i.update_title_to), void(i.update_title_to = !1);
                if (e)(0, Xt.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
                else {
                    e = document.title;
                    var r = a > 9 ? 10 : a;
                    setFavIcon("/images/icons/favicons/fav_im" + r + t + ".ico"), (0, Xt.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", a)))
                }
            }
        }

        function Ye(e, t, i) {
            i.cur_unread_cnt || (i.cur_unread_cnt = {}), t && !inArray(e, i.mutedPeers) && (i.cur_unread_cnt[e] = !0);
            var a = document.title,
                r = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !i.update_title_to) {
                var n = Ke(a, r, i);
                i.update_title_to = setInterval(n, 1e3), n()
            } else !t && i.update_old_title && ((0, Xt.setDocumentTitle)(i.update_old_title), i.cur_unread_cnt = {}, a = !1, i.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + r + ".ico"), clearInterval(i.update_title_to), i.update_title_to = !1);
            return Promise.resolve(i)
        }

        function Qe(e, t, i, a, r) {
            return (0, Ut.isFullyLoadedTab)(r, e) && (r.tabs[e].scrollTop = intval(t), r.tabs[e].scrollBottom = intval(i), r.tabs[e].contHeight = intval(a)), Promise.resolve(r)
        }

        function $e(e) {
            return e === Wt.FOLDER_ALL ? function() {
                return !0
            } : e === Wt.FOLDER_UNREAD ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & Wt.FOLDER_MASKS[e]
            }
        }

        function Xe(e, t) {
            t.active_tab = e, (0, Dt.updateLocation)({
                tab: e === Wt.FOLDER_ALL ? null : e
            });
            var i = [];
            if (e !== Wt.FOLDER_ALL && !(0, Ut.isReversedDialogs)(t)) {
                var a = t.dialog_tabs[e];
                i = t.dialog_tabs[Wt.FOLDER_ALL].map(function(e) {
                    return t.tabs[e]
                }).filter($e(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = a.length >= i.length ? a : i
            }
            return Promise.resolve(t)
        }

        function Je(e, t, i) {
            return e === Ht.SET_DIRECTORIES && i.folders & t ? !1 : e !== Ht.RESET_DIRECTORIES || i.folders & t ? !0 : !1
        }

        function Ze(e, t, i) {
            return t !== Ht.RESET_DIRECTORIES || e.folders & Wt.FOLDER_MASKS[i] ? t === Ht.REPLACE_DIRECTORIES ? e.folders & Wt.FOLDER_MASKS[i] ? -1 : 1 : t === Ht.SET_DIRECTORIES ? 1 : -1 : 0
        }

        function et(e, t, i, a) {
            var r = e.dialog_tabs_all;
            if (r[Wt.FOLDER_ALL] || r[t]) return !0;
            if (i.filter(function(e) {
                    return e === a.peerId;
                }).length > 0) return !0;
            if ("r" === a.lastmsg[0]) return !0;
            var n = i.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return (0, Ut.isReversedDialogs)(e) ? t.lastmsg > a.lastmsg : t.lastmsg < a.lastmsg
            });
            return n.length > 0 ? !0 : !1
        }

        function tt(e, t, i, a, r) {
            if ((0, Ut.isTabLoaded)(r, e)) {
                var n = r.tabs[e];
                return i === Ht.REPLACE_DIRECTORIES && (t ^= n.folders), Je(i, t, n) && Object.keys(Wt.FOLDER_MASKS).filter(function(e) {
                    return Wt.FOLDER_MASKS[e] & t
                }).forEach(function(e) {
                    r.dialog_tab_cts[e] += Ze(n, i, e)
                }), i === Ht.SET_DIRECTORIES ? r.tabs[e].folders |= t : i === Ht.RESET_DIRECTORIES ? r.tabs[e].folders &= ~t : r.tabs[e].folders = t ^= n.folders, x(r, r.tabs[e], !0, function(t, i) {
                    return t.concat([e]).map(function(e) {
                        return r.tabs[e]
                    }).filter($e(i)).map(function(e) {
                        return e.peerId
                    })
                }, et.bind(null, r)), Promise.resolve(r)
            }
            return f(e, 0, 0, 0, r).then(tt.bind(null, e, t, i, r))
        }

        function it(e) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function at(e, t) {
            return d(r({}, e, {
                free: !0
            }), t), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function rt(e, t) {
            var i = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (i = 1 ^ i), ls.set("comm_mute_" + t.gid, i), t.mute = i, Promise.resolve(t)
        }

        function nt(e, t, i, a) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_restore_dialog",
                hash: t,
                gid: a.gid,
                spam: i ? 1 : 0,
                peer: e
            }).then(function(t) {
                return a.tabs[e].deletedDialog = !1, x(a, a.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), a.tabs[e].unread = t, a
            })
        }

        function ot(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_spam_dialog",
                peer: e,
                gid: i.gid,
                hash: t
            })
        }

        function st(e, t, i) {
            return i.tabbedPeers = e, (0, Ut.isClassicInterface)(i) && (ii({
                peers: i.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        a = e.type;
                    return t !== i.peer && "perm" === a
                }).map(function(e) {
                    return (0, Ut.getBareTab)(e.peer, i)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(Ut.convertPeerToUrl).join("_")
            }), t && ai()), Promise.resolve(i)
        }

        function ct(e) {
            return e.peer ? le(e.peer, e) ? ue(e.peer, e) : (0, Ut.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
        }

        function ut(e, t) {
            var i = t.tabs[e];
            return (0, Ut.isFullyLoadedTab)(t, e) && (i.skipped = null, i.msgs = null, i.offset = null, i.allShown = null, i.history = null), Promise.resolve(t)
        }

        function lt(e, t) {
            var i = t.tabs[e];
            return (0, Ut.isFullyLoadedTab)(t, e) && (i.history = l(i.history)), Promise.resolve(t)
        }

        function dt(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function ft(e, t, i) {
            if (!(0, Ut.isCommunityPeer)(t)) return Promise.resolve(i);
            var a = (0, Gt.getTab)(i, t);
            return a.blocked_community = !e, (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_toggle_community",
                peer_id: t,
                hash: a.hash,
                state: e ? 1 : 0
            }).then(function() {
                return y(i)
            })
        }

        function ht(e, t) {
            if (0 !== t.peer && (0, Ut.isFullyLoadedTab)(t, t.peer)) {
                var i = (0, Gt.getTab)(t, t.peer);
                i.history = u(i.history), e(i.history)
            }
            return Promise.resolve(t)
        }

        function pt(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function mt(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function _t(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function gt(e) {
            ii({
                act: e ? "create" : null
            }), ai()
        }

        function vt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            ii({
                q: e
            }), ai()
        }

        function bt(e) {
            return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, Ut.getClassicChatHeight)() > window.clientHeight() && (0, Ut.setClassicChatHeight)(0)), Promise.resolve(e)
        }

        function Ct(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_link",
                chat_id: e
            })
        }

        function yt(e) {
            return ri({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function wt(e, t) {
            var i = (0, qt.arrayUnique)([e].concat(t.select(zt.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(zt.RECENT_SEARCH_OP, i)
        }

        function kt(e) {
            e.update(zt.RECENT_SEARCH_OP, [])
        }

        function Nt(e, t) {
            var i = t.select(zt.RECENT_SEARCH_OP).filter(function(t) {
                return t !== e
            });
            return t.update(zt.RECENT_SEARCH_OP, i), i
        }

        function Tt(e, t, i) {
            var a = i.tabs[t],
                r = (0, Gt.getMessage)(i, t, e);
            return a.data.kicked || a.data.closed || r.kludges.source_act || (a.pinned = r), Promise.resolve(i)
        }

        function Ft(e, t) {
            var i = t.tabs[e];
            return i.pinned = null, Promise.resolve(t)
        }

        function Et(e, t, i) {
            var a = i.tabs[e];
            return a.memberIds = a.memberIds.filter(function(e) {
                return e !== t
            }), a.adminIds = a.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(i)
        }

        function St(e, t, i, a) {
            var r = a.tabs[e];
            return i ? r.adminIds = [].concat(r.adminIds, t).filter(function(e, t, i) {
                return i.indexOf(e) === t
            }) : r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(a)
        }

        function xt(e, t, i, a) {
            var n = (0, Gt.getMessage)(e, i, t),
                o = n.userId;
            return (0, Kt.oCacheGet)(a, o) ? Promise.resolve(a) : Fe(r({}, i, [o]), a)
        }

        function It() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Lt() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }

        function At(e, t) {
            return t.tabs[e].top_banner = void 0, (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_hide_banner",
                peer_id: e
            }).then(function() {
                return t
            })
        }

        function Ot(e, t, i) {
            i.tabs[e].top_banner = void 0;
            var a = i.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_callback_banner",
                peer_id: e,
                callback_data: t,
                hash: a.hash
            }).then(function() {
                return i
            })
        }

        function Mt(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_load_banner",
                peer_id: e
            }).then(function(i) {
                var a = Rt(i, 1),
                    r = a[0];
                return t.tabs[e].top_banner = r, t
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.toggleAdmin = t.kickUser = t.removeChatPhoto = t.updateFlags = t.getChatDetails = t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.resetInviteLink = t.joinChat = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.createChat = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.loadChatInfo = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchMessagesInplace = t.searchMessages = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
        var Rt = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.strHistory = l, t.updateBlockStates = d, t.loadPeer = f, t.restoreHistoryQueue = h, t.removeFailed = p, t.selectPeer = _, t.selectPeerOnMessage = v, t.changePeer = b, t.updateMentions = C, t.setActions = y, t.loadMoreHistory = w, t.loadLessHistory = k, t.loadLongPollKey = T, t.loadLongPollTs = F, t.setMessageErrored = E, t.resendMessage = S, t.loadAdmins = I, t.editMessage = O, t.addMessage = M, t.markInboundMessagesAsRead = P, t.markOutboundMessagesAsRead = D, t.initTextStore = B, t.processFwd = H, t.mergeTabs = j, t.updateOnline = q, t.setTyping = z, t.waitTyping = U, t.addSelection = G, t.cleanSelected = V, t.dropSelection = K, t.replaceMessage = Y, t.saveMedia = Q, t.loadMedia = $, t.addAttachmentsToStoreData = X, t.replaceMediaAttachesStore = J, t.setCurrentSearchDate = Z, t.setInplaceSearch = ee, t.setCurrentSearch = te, t.searchHints = ie, t.searchHintsIndex = ae, t.localIndexToDialog = re, t.preloadSearchIndex = oe, t.loadDialogs = ce, t.isSearchAllLoaded = ue, t.isSearchingInplace = le, t.cancelSearch = de, t.clearDate = fe, t.searchInplaceStart = he, t.loadImportant = pe, t.loadActualLastMessage = me, t.removeMessagesMarkDeleted = _e, t.removeMessages = ge, t.removeMessageSend = ve, t.removeMessagesWithRestore = be, t.restoreMessage = Ce, t.restoreMessageSend = ye, t.forwardMessages = we, t.prepareForward = ke, t.deletedDialog = Ne, t.addNewMemberOptimisticly = Te, t.loadChatMember = Fe, t.checkNewPeople = Ee, t.loadNewPeople = Se, t.updateActions = xe, t.setMutedPeer = Ie, t.setExecStack = Le, t.updateFavMessage = Ae, t.updateImportant = Oe, t.loadSpam = Me, t.flushSpam = Re, t.setCreationType = Pe, t.getOwnerPhoto = De, t.presetAvatar = Be, t.setChatPhoto = He, t.resync = je, t.toggleSendingAbility = qe, t.setDelayedMessage = ze, t.isAnythingLoading = We, t.updateUnreadCount = Ge, t.changeSubmitSettings = Ve, t.updateFavAndTitle = Ye, t.saveHistoryScroll = Qe, t.filterFromTab = $e, t.changeDialogsTab = Xe, t.updateFolderState = tt, t.getMutexQueue = it, t.releaseBlock = at, t.toggleCommunityMute = rt, t.restoreDialog = nt, t.spamDialog = ot, t.updateTabbedPeers = st, t.isEverythingLoaded = ct, t.cleanTab = ut, t.stringifyTab = lt, t.updateGoToEndVisibility = dt, t.toggleCommunityMessages = ft, t.updateHistory = ht, t.startRecording = pt, t.cancelRecording = mt, t.setVoiceMessageAvail = _t, t.toggleConversation = gt, t.updateSearchQuery = vt, t.initializeChatResize = bt, t.getInviteLink = Ct, t.leaveInvitation = yt, t.saveRecentSearchPeer = wt, t.resetRecentSearch = kt, t.removeFromRecentSearch = Nt, t.pinMessageOptimistic = Tt, t.unpinMessageOptimistic = Ft, t.kickUserOptimisticly = Et, t.toggleAdminOptimisticly = St, t.checkChatMember = xt, t.hidePromoTooltip = It, t.videoAutoPlayHandler = Lt, t.hideTopBannerAction = At, t.callbackTopBannerAction = Ot, t.loadBanner = Mt;
        var Pt = i(98),
            Dt = i(30),
            Bt = i(124),
            Ht = a(Bt),
            jt = i(34),
            qt = i(65),
            zt = i(184),
            Ut = i(198),
            Wt = i(81),
            Gt = i(190),
            Vt = i(126),
            Kt = i(86),
            Yt = i(128),
            Qt = i(195),
            $t = i(53),
            Xt = i(20),
            Jt = t.TYPING_PERIOD = 5,
            Zt = 2e4,
            ei = 8,
            ti = (0, Dt.updateLazyLocation)(),
            ii = ti.scheduleNav,
            ai = ti.commitNav,
            ri = ti.scheduleNavWithTimeOut,
            ni = t.ACTION_PRIORITIES = {
                settings: 0,
                block: 1,
                fav: 1,
                chat: 2,
                invite: 2,
                invite_link: 3,
                topic: 3,
                avatar: 4,
                photos: 5,
                search: 6,
                pin_hide: 7,
                pin_unhide: 7,
                unpin: 8,
                mute: 10,
                unmute: 10,
                clear: 11,
                leave: 12,
                "return": 12,
                block_community: 12,
                allow_community: 12
            };
        t.readLastMessages = c(function(e, t) {
            var i = t.tabs[e],
                a = Object.keys(i.msgs).map(function(i) {
                    return (0, Gt.getMessage)(t, e, i)
                }).filter(function(e) {
                    return !(0, Vt.isOut)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return i.skipped > 0 && (a = a.filter(function(e) {
                return intval(e) <= i.lastmsg - i.skipped
            })), a = intval(a.shift()), a <= i.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Ht.readInboundEvent([6, e, a])]), (0, Pt.post)(Pt.CONTROLLER, {
                peer: e,
                ids: [a],
                hash: i.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return N(t, e, a, Ht.FLAG_OUTBOUND)
            }))
        }), t.deliverMessage = c(function(e, t, i) {
            var a = Date.now() + rand(0, 100).toFixed(0),
                r = i.tabs[e];
            return (0, jt.retryFn)(Pt.post, 1)(Pt.CONTROLLER, {
                act: "a_send",
                to: e,
                hash: r.hash,
                msg: t.message,
                media: W(t.attaches),
                guid: a,
                share_url: t.share_url,
                random_id: t.rid,
                gid: i.gid,
                entrypoint: i.currentEntryPoint || "",
                sticker_referrer: t.sticker_referrer
            }, Zt).then(function(e) {
                var t = Rt(e, 1),
                    a = t[0];
                return i.version !== a.version && nav.reload({
                    force: !0
                }), i.currentEntryPoint = "", i
            })
        }), t.deliverEditedMessage = c(function(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_edit_message",
                hash: e.hash,
                id: t.messageId,
                peerId: e.peerId,
                gid: i.gid,
                msg: t.origText,
                media: W(t.attaches),
                share_url: t.share_url
            }, Zt).then(function(e) {
                var t = Rt(e, 1);
                return t[0], i
            })
        }), t.searchTopConv = ne(function(e) {
            return e.topConvTree
        }), t.searchLocalHints = ne(function(e) {
            return e.hintsTree
        }), t.searchMessages = c(function(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(i) {
                var a = Rt(i, 5),
                    r = a[0],
                    n = a[1],
                    o = a[2],
                    s = a[3],
                    c = a[4];
                return n.forEach(function(e) {
                    return (0, Kt.oCacheAdd)(t, e)
                }), (0, Ut.normalizeTabsGotFromServer)(t, r), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(r).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = r[e]
                }), [r, o]
            })
        }), t.searchMessagesInplace = c(function(e, t) {
            var i = t.tabs[e],
                a = "";
            if (he(e, t), i.searchDay && (a = "day:" + i.searchDay), !a && !i.searchText) return Promise.reject();
            var r = "in:" + e + " " + a + " " + (i.searchText || "");
            return ii({
                st: i.searchText
            }), ai(), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_search",
                q: r,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: i.searchOffset || 0
            }).then(function(e) {
                var t = Rt(e, 3),
                    a = t[0],
                    r = t[1],
                    n = t[2];
                return i.searchOffset = r, i.searchAllLoaded = n, a
            })
        }), t.sendTyping = c(function(e, t) {
            return t.tabs[e].lastTyping = Date.now(), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_typing",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function() {
                return t
            }, function() {
                return t
            })
        }), t.flushHistory = c(function(e, t) {
            return Ne(e, (0, Pt.post)("al_im.php", {
                act: "a_flush_history",
                id: e,
                from: "im",
                gid: t.gid,
                hash: t.tabs[e].hash
            }), t)
        }), t.updateChatTopic = c(function(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_set_chat_title",
                peer: e,
                new_title: t,
                hash: i.tabs[e].hash
            }).then(function() {
                return i
            })
        }), t.loadChatInfo = c(function(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_load_chat_info",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(i) {
                var a = Rt(i, 1),
                    r = a[0];
                return t.tabs[e] = extend(t.tabs[e], r), t
            })
        }), t.addNewMember = c(function(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                hash: i.tabs[e].hash
            }).then(function() {
                return i
            })
        }), t.updateChatPhoto = c(function(e, t) {
            return e.kludges.source_act === Ut.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(i) {
                var a = Rt(i, 2),
                    r = a[0],
                    n = a[1];
                t.chat_photo_msg = n;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = r[0], t.tabs[e.peerId].photoLarge = r[1], (0, Ut.isFullyLoadedTab)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    o.history = (0, Ut.addChatPhotoToUpdate)(e, s, t, u(o.history))
                }
                return t
            })
        }), t.leaveChat = c(function(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_leave_chat",
                chat: e - 2e9,
                hash: t.tabs[e].hash
            }).then(xe.bind(null, Ut.CHAT_KICK_USER, vk.id, e, t))
        }), t.returnToChat = c(function(e, t) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_return_to_chat",
                chat: e - 2e9,
                hash: t.tabs[e].hash
            }).then(xe.bind(null, Ut.CHAT_INVITE_USER, vk.id, e, t))
        }), t.toggleMutePeer = c(function(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_mute",
                peer: e,
                hash: i.tabs[e].hash,
                gid: i.gid,
                value: t
            }).then(function() {
                var a = t ? "mute" : "unmute";
                return window.Notifier && Notifier.lcSend("im", {
                    act: a,
                    peer: e
                }), i
            }).then(Ie.bind(null, e, t))
        }), t.favMessage = c(function(e, t, i, a) {
            return Ae(e, i, t, a), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: a.gid,
                peer: i,
                hash: a.tabs[i].hash
            }).then(function(e) {
                return a
            })
        }), t.createChat = c(function(e, t, i, a) {
            return a.creating = !0, a.longpoll.pause(), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_multi_start",
                hash: a.writeHash,
                peers: t.join(","),
                title: i
            }).then(function(e) {
                var t = Rt(e, 1),
                    i = t[0];
                return a.next_peer = i.peerId, a.tabs[i.peerId] = i, x(a, i, !1, function(e) {
                    return [i.peerId].concat(e)
                }), a.longpoll.resume(), a
            }).then(function(t) {
                return e ? He(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            })["catch"](function(e) {
                throw a.creating = !1, a.longpoll.resume(), e
            })
        }), t.toggleDialogImportant = c(function(e, t) {
            var i = Wt.FOLDER_MASKS[Wt.FOLDER_IMPORTANT],
                a = t.tabs[e].folders & i,
                r = a ? Ht.resetDirectoriesEvent : Ht.setDirectoriesEvent;
            return t.longpoll.push([r([0, e, i, !0])]), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_dialog_star",
                val: a ? 0 : 1,
                peer: e,
                hash: t.tabs[e].hash,
                gid: t.gid
            }).then(function() {
                return t
            })
        }), t.markDialogAnswered = c(function(e, t, i) {
            var a = Wt.FOLDER_MASKS[Wt.FOLDER_UNRESPOND];
            return i.longpoll.push([Ht.resetDirectoriesEvent([0, e, a, !0]), Ht.readInboundEvent([6, e, t])]), (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_mark_answered",
                peer: e,
                lastmsg: t,
                hash: i.tabs[e].hash,
                gid: i.gid
            }).then(function() {
                return i
            })
        }), t.deleteDialog = c(function(e, t) {
            return x(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(i) {
                return i[0] ? (st(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, x(t, t.tabs[e], !1, A.bind(null, e), et.bind(null, t))), i
            })
        }), t.joinChat = c(function(e, t, i) {
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: i.writeHash
            }).then(function(e) {
                var t = Rt(e, 4),
                    a = t[0],
                    r = t[1],
                    n = t[2],
                    o = t[3];
                return n.forEach(function(e) {
                    return (0, Kt.oCacheAdd)(i, e)
                }), i.tabs[a] = r, x(i, r, !1, A.bind(null, a), et.bind(null, i)), i.admins = extend(i.admins, o), [a]
            })
        }), t.resetInviteLink = c(function(e, t) {
            var i = t.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return i.inviteLink = e[0], e
            })
        }), t.pinMessage = c(function(e, t, i) {
            var a = i.tabs[t];
            return a.data.kicked || a.data.closed ? Promise.resolve(i) : (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_pin_message",
                msgid: e,
                chat: t,
                hash: i.tabs[t].hash
            }).then(function(e) {
                var r = Rt(e, 1),
                    n = r[0];
                return i.tabs[t] = Object.assign({}, a, n), i
            })
        }), t.unpinMessage = c(function(e, t) {
            var i = t.tabs[e];
            return i.data.kicked || i.data.closed ? Promise.resolve(t) : (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_unpin_message",
                chat: e,
                hash: t.tabs[e].hash
            }).then(function(a) {
                var r = Rt(a, 1),
                    n = r[0];
                return t.tabs[e] = Object.assign({}, i, n), t
            })
        }), t.getPinnedMessage = c(function(e, t) {
            var i = t.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_pinned_message",
                chat: e,
                hash: t.tabs[e].hash
            }).then(function(e) {
                var a = Rt(e, 1),
                    r = a[0];
                return i.pinned = r || null, t
            })
        }), t.getMessageLocalId = c(function(e, t, i) {
            var a = i.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_message_local_id",
                chat: e,
                chat_local_id: t,
                hash: a.hash
            })
        }), t.getChatDetails = c(function(e, t) {
            var i = t.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_get_chat_details",
                chat: e,
                hash: i.hash
            }).then(function(e) {
                var a = Rt(e, 1),
                    r = a[0];
                return i.photoGrid = r.grid, i.photoLarge = r.photo, i.membersLastSeen = r.lastSeen || null, i.invitedByMe = r.invitedByMe || [], i.inviteLink = r.link || null, i.serverSettings = r.serverSettings || null, t
            })
        }), t.updateFlags = c(function(e, t, i) {
            var a = i.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_update_flags",
                chat: e,
                hash: a.hash,
                flags: t
            })
        }), t.removeChatPhoto = c(function(e, t) {
            var i = t.tabs[e];
            return (0, Pt.post)("al_page.php", {
                act: "owner_photo_remove",
                oid: e,
                hash: i.photoHash
            }).then(function() {
                return i.photo = null, i.photoLarge = null, t
            })
        }), t.kickUser = c(function(e, t, i) {
            var a = i.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_kick_user",
                chat: e,
                hash: a.hash,
                mid: t
            }).then(function() {
                return a.adminIds = a.adminIds.filter(function(e) {
                    return e !== t
                }), i
            })
        }), t.toggleAdmin = c(function(e, t, i, a) {
            var r = a.tabs[e];
            return (0, Pt.post)(Pt.CONTROLLER, {
                act: "a_toggle_admin",
                chat: e,
                hash: r.hash,
                mid: t,
                is_admin: +i
            }).then(function() {
                return St(e, t, i, a)
            })
        })
    },
    182: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = s.get(e.currentTarget);
            if (t) {
                var i = t[e.type];
                if (i)
                    for (var a = void 0, r = 0; r < i.length; r++) {
                        var n = o(i[r], 2),
                            c = n[0],
                            u = n[1],
                            l = void 0;
                        if (hasClass(e.target, c) ? l = u(e, e.target) : (a = gpeByClass(c, e.target, e.currentTarget)) && (l = u(e, a)), l === !1) break
                    }
            }
        }

        function r(e, t, i, r) {
            var n = s.get(e);
            n || (s.set(e, {}), n = s.get(e));
            for (var o = t.split(" "), c = 0; c < o.length; c++) {
                var u = o[c];
                n[u] || (n[u] = [], addEvent(e, u, a)), n[u].push([i, r])
            }
        }

        function n(e, t, i, r) {
            var n = s.get(e);
            if (n) {
                t.split(" ").forEach(function(t) {
                    n[t] && (n[t] = n[t].filter(function(e) {
                        return e[0] !== i || e[1] !== r
                    }), 0 === n[t].length && removeEvent(e, t, a))
                });
                var o = Object.keys(n).map(function(e) {
                    return n[e].length
                }).reduce(function(e, t) {
                    return e + t
                });
                0 === o && s["delete"](e)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.addDelegateEvent = r, t.removeDelegateEvent = n;
        var s = new window.Map
    },
    184: function(e, t, i) {
        "use strict";

        function a(e) {
            return "im_store_" + e
        }

        function r(e) {
            return ls.get(a(e)) || {}
        }

        function n(e, t, i) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), i(a(e), r)
            }
        }

        function o(e, t, i) {
            return t === f ? e[t] || [] : t === h ? e[t] && e[t][i] : e[t] ? extend(!0, {}, e[t][i]) : null
        }

        function s(e, t, i) {
            switch (e[t] || (e[t] = {}), t) {
                case f:
                    var a = i;
                    a && a.length > 0 ? e[t] = a : delete e[t];
                    break;
                case h:
                    var r = d(i, 2),
                        n = r[0],
                        o = r[1];
                    o ? e[t][n] = +o : delete e[t][n]
            }
            return e
        }

        function c(e, t) {
            for (var i = ["fwd", "draft", "bind_attach"], a = r(e), o = !1, s = i.length; s--;) i[s] in a && (delete a[i[s]], o = !0);
            o && n(e, a, t)
        }

        function u(e, t, i) {
            i.key === a(e) && (t.db = JSON.parse(i.newValue), t.checkTime = Date.now())
        }

        function l(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && c(e, t);
            var i = {
                    db: r(e),
                    checkTime: Date.now()
                },
                a = u.bind(null, e, i);
            return window.addEventListener("storage", a, !1), {
                select: function(t, a) {
                    return Date.now() - i.checkTime > 1e3 && (i.db = r(e)), o(i.db, t, a)
                },
                selectByKey: function(t) {
                    return Date.now() - i.checkTime > 1e3 && (i.db = r(e)), i.db[t]
                },
                update: function(a, r) {
                    var o = s(i.db, a, r);
                    return i.db = o, i.checkTime = Date.now(), n(e, o, t)
                },
                updateByKey: function(a, r) {
                    return i.db[a] = r, i.checkTime = Date.now(), n(e, i.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", a, !1)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.deleteOldStoredFormat = c, t.mount = l;
        var f = t.RECENT_SEARCH_OP = "recent_search",
            h = t.PIN_HIDDEN_ID_OP = "pin_hide"
    },
    186: function(e, t, i) {
        "use strict";

        function a() {
            return !curFastChat.version || !curFastChat.tabs
        }
        var r = i(184),
            n = i(88),
            o = i(174),
            s = 1e4;
        window.curFastChat || (window.curFastChat = {}), window.FastChat = {
            init: function(e) {
                extend(curFastChat, {
                    tabs: {},
                    needPeers: {},
                    gotPeers: {},
                    needMedia: {},
                    gotMedia: {},
                    ldb: (0, r.mount)(vk.id),
                    myTypingEvents: {},
                    typingEvents: {},
                    inited: !0,
                    options: e,
                    posSeq: 0,
                    error_timeout: 1
                }), delete curFastChat.standby, delete curFastChat.standbyTO, Notifier.addRecvClbk("fastchat", 0, FastChat.lcRecv, !0), Notifier.addRecvClbk("logged_off", 0, FastChat.standby, !0), FastChat.lcSend("needSettings", {
                    version: e.version,
                    lang_id: langConfig.id
                }), clearTimeout(curFastChat.getSettingsTO), curFastChat.getSettingsTO = setTimeout(FastChat.getSettings, 300)
            },
            getSettings: function() {
                var e = ls.get("fcFriends" + vk.id);
                ajax.post("al_im.php", {
                    act: "a_get_fast_chat",
                    friends: e && e.version,
                    cache_time: FastChat.cachedStickersKeywordsTime()
                }, {
                    onDone: function(t) {
                        -1 == t.friends ? (t.friends_version = e.version, t.friends = e.list) : ls.set("fcFriends" + vk.id, {
                            version: t.friends_version,
                            list: t.friends
                        }), FastChat.gotSettings(t), FastChat.sendSettings()
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            cachedStickersKeywordsTime: function() {
                var e = ls.get("stickers_keywords");
                return e && e.time ? Math.floor(e.time / 1e3) : 0
            },
            gotSettings: function(e) {
                e.emoji_stickers && (window.emojiStickers = e.emoji_stickers), window.Emoji && Emoji.updateTabs(), e.autoplay_animations && window.StickersSettings.setAutoplay(e.autoplay_animations), clearTimeout(curFastChat.getSettingsTO), window.lang = extend(window.lang || {}, e.lang), extend(curFastChat, e, {
                    lang_id: langConfig.id
                }), curNotifier.is_server && (e.im_queue ? curFastChat.lpInited || FastChat.initLp() : (clearTimeout(curFastChat.lp_error_to), curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)))), curFastChat.friendsCnt = Object.keys(curFastChat.friends), setTimeout(FastChat.clistCache.pbind(!1), 10), FastChat.initUI()
            },
            sendSettings: function() {
                clearTimeout(curFastChat.sendSettingsTO);
                var e, t = {},
                    i = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version", "im_queue", "cl_queue"];
                for (e in i) {
                    if ("cl_queue" != i[e] && void 0 === curFastChat[i[e]]) return;
                    t[i[e]] = curFastChat[i[e]]
                }
                clearTimeout(curFastChat.sendSettingsTO), curFastChat.sendSettingsTO = setTimeout(function() {
                    FastChat.lcSend("settings", {
                        settings: t
                    })
                }, curNotifier.is_server ? 0 : irand(50, 100))
            },
            becameServer: function() {
                !curFastChat.lpInited && curFastChat.version && (delete curNotifier.addQueues["fastchat" + vk.id], delete curNotifier.addQueues["contacts" + vk.id], curFastChat.im_queue ? curFastChat.lpInited || FastChat.initLp() : (clearTimeout(curFastChat.lp_error_to), curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1))))
            },
            destroy: function() {
                return curFastChat.inited ? (curFastChat.ldb.unmount(), FastChat.stopLp(), each(curFastChat.tabs || {}, function(e, t) {
                    t.box.destroy()
                }), curFastChat.clistBox && curFastChat.clistBox.destroy(), each(curFastChat.el || {}, function() {
                    cleanElems(this)
                }), clearInterval(curFastChat.updateFriendsInt), clearInterval(curFastChat.updateTypingsInt), clearTimeout(curFastChat.correspondentsTO), clearTimeout(curFastChat.lp_error_to), curFastChat = {
                    inited: !1
                }, !0) : !1
            },
            isChatOpen: function(e) {
                return window.curFastChat && curFastChat.inited && e && (curFastChat.tabs && curFastChat.tabs[e] && curFastChat.tabs[e].box.visible || curFastChat.clistBox && curFastChat.clistBox.visible) ? !0 : !1
            },
            standby: function(e) {
                FastChat.destroy(), curFastChat.standby = !0;
                var t = 1,
                    i = function a() {
                        return curNotifier.is_server ? void ajax.post("notifier.php?act=a_get_reload", {
                            version: e
                        }, {
                            onDone: function(e, t) {
                                FastChat.lcSend("gotConfig", {
                                    navVersion: e,
                                    config: t
                                }), FastChat.gotConfig(e, t)
                            },
                            onFail: function() {
                                return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(a, 1e3 * t), !0
                            }
                        }) : (clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(a, 1e3 * t)))
                    };
                i()
            },
            gotConfig: function(e, t) {
                clearTimeout(curFastChat.standbyTO), curFastChat.standby && setTimeout(function() {
                    e > stVersions.nav && (debugLog("appending al loader"), headNode.appendChild(ce("script", {
                        type: "text/javascript",
                        src: "/js/loader_nav" + e + "_" + vk.lang + ".js"
                    }))), setTimeout(function() {
                        return e <= stVersions.nav ? void stManager.add(["notifier.js", "notifier.css", "emoji.js"], function() {
                            FastChat.init(t)
                        }) : void setTimeout(arguments.callee, 100)
                    }, 0)
                }, curNotifier.is_server ? 0 : irand(1e3, 2e3))
            },
            updateVersion: function(e) {
                FastChat.lcSend("standby", {
                    version: e
                }), FastChat.standby(e)
            },
            lcSend: function(e, t) {
                Notifier.lcSend("fastchat", extend({
                    act: e,
                    __id: curFastChat.me && curFastChat.me.id || vk.id
                }, t))
            },
            lcRecv: function(e) {
                if (!isEmpty(e)) {
                    var t = e.act;
                    e.__id == (curFastChat.me && curFastChat.me.id || vk.id) && (delete e.act, delete e.__id, FastChat.lcFeed(t, e))
                }
            },
            lcFeed: function(e, t) {
                switch (e) {
                    case "needSettings":
                        curFastChat.version < t.version || t.lang_id == curFastChat.lang_id && FastChat.sendSettings();
                        break;
                    case "settings":
                        !curFastChat.version && curFastChat.options && t.settings.version == curFastChat.options.version && FastChat.gotSettings(t.settings), clearTimeout(curFastChat.sendSettingsTO);
                        break;
                    case "standby":
                        if (a()) break;
                        FastChat.standby(t.version);
                        break;
                    case "gotConfig":
                        FastChat.gotConfig(t.navVersion, t.config);
                        break;
                    case "clFeed":
                        if (a()) break;
                        FastChat.clFeed(t.events);
                        break;
                    case "clistOnlines":
                        if (a()) break;
                        FastChat.clistGotOnlines(t);
                        break;
                    case "imFeeds":
                        if (a()) break;
                        FastChat.imFeeds(t);
                        break;
                    case "needPeer":
                        if (a()) break;
                        var i, r = t.id,
                            n = curFastChat.tabs[r],
                            o = !1;
                        if (void 0 !== n) {
                            o = {
                                name: n.name,
                                photo: n.photo,
                                fname: n.fname,
                                hash: n.hash,
                                sex: n.sex,
                                data: n.data,
                                online: n.online
                            };
                            for (var s in n.msgs) {
                                o.history = [n.log.innerHTML, n.msgs];
                                break
                            }
                        } else(i = curFastChat.friends[r + "_"]) && (o = {
                            name: i[0],
                            photo: i[1],
                            fname: i[2],
                            hash: i[3],
                            data: i[4],
                            online: curFastChat.onlines[r]
                        });
                        if (o === !1) break;
                        curFastChat.gotPeers[r] = setTimeout(function() {
                            var e = {};
                            e[r] = o, FastChat.lcSend("gotPeers", e)
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingPeers":
                        if (a()) break;
                        each(t, function(e, t) {
                            var i = curFastChat.needPeers[e];
                            i && (t & i[0]) == i[0] && clearTimeout(i[2])
                        });
                        break;
                    case "gotPeers":
                        if (a()) break;
                        FastChat.gotPeers(t);
                        break;
                    case "stateChange":
                        if (a()) break;
                        FastChat.onStateChanged(t);
                        break;
                    case "queueSet":
                        extend(curFastChat, t);
                        break;
                    case "queueClean":
                        curNotifier.is_server || (delete curFastChat.im_queue, delete curFastChat.cl_queue);
                        break;
                    case "needMedia":
                        var c = t.msgId,
                            u = curFastChat.gotMedia[c];
                        if (void 0 === u || 0 === u) break;
                        curFastChat.gotMedia[c][3] = setTimeout(function() {
                            FastChat.lcSend("gotMedia", {
                                msgId: c,
                                peer: u[0],
                                text: u[1],
                                msgOpts: u[2]
                            })
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingMedia":
                        var c = t.msgId,
                            l = curFastChat.needMedia[c];
                        if (void 0 === l || 0 === curFastChat.gotMedia[c]) break;
                        clearTimeout(l[1]), l[1] = setTimeout(FastChat.loadMsgMedia.pbind(l[0], c), 1e3);
                        break;
                    case "gotMedia":
                        var c = t.msgId,
                            u = curFastChat.gotMedia[c];
                        isArray(u) && clearTimeout(u[3]), FastChat.gotMsgMedia(t.peer, c, t.text, t.msgOpts)
                }
            },
            initLp: function() {
                curFastChat.lpInited = !0, FastChat.checkLp(), curFastChat.checkLpInt = setInterval(FastChat.checkLp, 2e4)
            },
            stopLp: function() {
                curFastChat.lpInited = !1, clearInterval(curFastChat.checkLpInt), delete curFastChat.im_queue, delete curFastChat.cl_queue
            },
            checkLp: function() {
                curNotifier.is_server && curFastChat.im_queue && (Notifier.addKey({
                    queue: curFastChat.im_queue.id,
                    key: curFastChat.im_queue.key,
                    ts: curFastChat.im_queue.ts
                }, FastChat.imChecked, !0), curFastChat.cl_queue && Notifier.addKey({
                    queue: curFastChat.cl_queue.id,
                    key: curFastChat.cl_queue.key,
                    ts: curFastChat.cl_queue.ts
                }, FastChat.clChecked, !0), FastChat.lcSend("queueSet", {
                    im_queue: curFastChat.im_queue,
                    cl_queue: curFastChat.cl_queue
                }))
            },
            updateQueueKeys: function() {
                curFastChat.updatingQueues || (curFastChat.updatingQueues = 1, FastChat.lcSend("queueClean"), FastChat.stopLp(), ajax.post("al_im.php", {
                    act: "a_get_fc_queue"
                }, {
                    onDone: function(e) {
                        return e.version > curFastChat.version ? void FastChat.updateVersion(e.version) : (delete curFastChat.updatingQueues, extend(curFastChat, e), FastChat.lcSend("queueSet", e), void(curNotifier.is_server && (FastChat.initLp(), FastChat.clistUpdate())))
                    },
                    onFail: function() {
                        return delete curFastChat.updatingQueues, FastChat.destroy(), !0
                    }
                }))
            },
            clChecked: function(e, t) {
                if (curFastChat.inited && curFastChat.ready && curFastChat.cl_queue) {
                    if (t.failed) return clearTimeout(curFastChat.lp_error_to), void(curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)));
                    t.ts && (t.key && (curFastChat.cl_queue.key = t.key), curFastChat.cl_queue.ts = t.ts, FastChat.lcSend("queueSet", {
                        cl_queue: curFastChat.cl_queue
                    })), isArray(t.events) && t.events.length && (FastChat.clFeed(t.events), FastChat.lcSend("clFeed", {
                        events: t.events
                    }))
                }
            },
            clFeed: function(e) {
                if (curFastChat.inited && curFastChat.ready && curFastChat.tabs) {
                    var t = !1,
                        i = !1;
                    each(e, function() {
                        var e = this.split("<!>"),
                            a = e[0],
                            r = e[1],
                            n = e[2],
                            o = e[3] ? e[3] : 1,
                            s = curFastChat.tabs[n],
                            c = curFastChat.onlines[n];
                        if (a != curFastChat.version) return FastChat.updateVersion(a), i = !0, !1;
                        if (curFastChat.friends[n + "_"] || s) switch (r) {
                            case "online":
                                if (c == o) break;
                                curFastChat.onlines[n] = o, FastChat.tabNotify(n, "online", o), t = !0;
                                break;
                            case "offline":
                                if (!c) break;
                                delete curFastChat.onlines[n], re("fc_contact" + n) && curFastChat.clistBox.visible && FastChat.clistShowMore(), FastChat.tabNotify(n, "offline")
                        }
                    }), i || (t && curFastChat.clistBox.visible && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle())
                }
            },
            imChecked: function(e, t) {
                if (curFastChat.inited && curFastChat.ready && curFastChat.im_queue) {
                    if (t.failed) return clearTimeout(curFastChat.lp_error_to), void(curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)));
                    if (t.ts && curFastChat.im_queue && (t.key && (curFastChat.im_queue.key = t.key), curFastChat.im_queue.ts = t.ts, FastChat.lcSend("queueSet", {
                            im_queue: curFastChat.im_queue
                        })), isArray(t.events) && t.events.length) {
                        var i = {},
                            a = !1;
                        each(t.events, function() {
                            var e = this.split("<!>"),
                                t = e[0],
                                r = e[1],
                                n = e[2],
                                o = 0;
                            if (t != curFastChat.version) return FastChat.updateVersion(t), a = !0, !1;
                            switch (r) {
                                case "read":
                                case "edit":
                                case "delete":
                                    break;
                                case "typing":
                                    o = 1;
                                    break;
                                case "new":
                                    o = 2 & e[4] ? 0 : 2;
                                    break;
                                default:
                                    return
                            }
                            i[n] || (i[n] = [0]), i[n][0] |= o, i[n].push(e)
                        }), a || isEmpty(i) || (FastChat.lcSend("imFeeds", i), FastChat.imFeeds(i))
                    }
                }
            },
            imFeeds: function(e) {
                curFastChat.inited && curFastChat.ready && each(e, function(e, t) {
                    t.shift(), FastChat.imFeed(e, t)
                })
            },
            blinkEl: function(e, t, i) {
                return t > 10 ? (i(), !1) : void(t % 2 == 0 ? animate(e, {
                    opacity: 0
                }, 400, function() {
                    FastChat.blinkEl(e, t + 1, i)
                }) : animate(e, {
                    opacity: 1
                }, 400, function() {
                    setTimeout(function() {
                        FastChat.blinkEl(e, t + 1, i)
                    }, 400)
                }))
            },
            blinkTyping: function(e) {
                var t = ge("chat_tab_icon_" + e);
                if (t) {
                    var i = geByClass1("chat_tab_typing_wrap", t);
                    fadeIn(i, 150, function() {
                        FastChat.blinkEl(i.firstChild, 0, function() {
                            fadeOut(i, 150)
                        })
                    })
                }
            },
            imFeed: function(e, t) {
                var i = curFastChat.tabs[e],
                    a = vkNow();
                return each(t, function(t, i) {
                    switch (i[1]) {
                        case "new":
                            1 === (3 & i[4]) && FastChat.changePeerCounter(e, 1);
                            break;
                        case "read":
                            var a = 1;
                            each(i[3].split(","), function(e, t) {
                                a += 1
                            }), FastChat.changePeerCounter(e, -a);
                            break;
                        case "typing":
                            Chat.tabs[e] && FastChat.blinkTyping(e);
                    }
                }), i ? (each(t, function(t, r) {
                    switch (r[1]) {
                        case "new":
                            stManager.add(["imn.js"], function() {
                                intval(r[8]) && (0, o.confirmDelivery)(r[3]), each(i.sentmsgs, function(e, t) {
                                    var i = ge("fc_msg" + t),
                                        a = i && i.parentNode;
                                    re(i) && a && !geByClass("fc_msg", a).length && re(domClosest("fc_msgs_wrap", a))
                                });
                                var t = ge("fc_msg" + r[3]);
                                t || (FastChat.addMsg(FastChat.prepareMsgData(r.slice(2))), i.msgs[r[3]] = [2 & r[4] ? 1 : 0, 1 & r[4]], 1 === (3 & r[4]) && i.unread++, FastChat.scroll(e)), FastChat.blinkTab(e)
                            });
                            break;
                        case "read":
                            var n = [],
                                s = intval(r[3]);
                            each(i.msgs, function(e) {
                                intval(e) <= s && i.msgs[e][1] && n.push(intval(e))
                            }), each(n, function(e, t) {
                                var a, r = ge("fc_msg" + t);
                                r && (a = i.msgs[t] && i.msgs[t][0] ? r.parentNode.parentNode : r.parentNode, i.msgs[t] && i.msgs[t][1] && (i.msgs[t][1] = 0, i.msgs[t][0] || i.unread--), removeClass(r, "fc_msg_unread"), hasClass(a.parentNode, "fc_msgs_unread") && each(a.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(a.parentNode, "fc_msgs_unread"), !1)
                                }))
                            });
                            break;
                        case "typing":
                            e > 2e9 ? (curFastChat.typingEvents[e] || (curFastChat.typingEvents[e] = {}), curFastChat.typingEvents[e][r[3]] = a) : curFastChat.typingEvents[e] = a, FastChat.updateTyping(e);
                            break;
                        case "edit":
                            var c = i.msgs[r[3]];
                            c && (delete curFastChat.gotMedia[r[3]], r[4] = (c[0] ? 2 : 0) + (c[1] ? 1 : 0), FastChat.editMsg(FastChat.prepareMsgData(r.slice(2))));
                            break;
                        case "delete":
                            FastChat.deleteMsg(FastChat.prepareMsgData(r.slice(2)))
                    }
                }), i.unread > 0 && (i.unread = 0, each(i.msgs, function() {
                    !this[0] && this[1] && i.unread++
                })), i.auto && !i.unread && (i.box._close(!0), delete curFastChat.tabs[e]), void FastChat.updateUnreadTab(e)) : !1
            },
            tabNotify: function(e, t, i) {
                var a = curFastChat.tabs[e],
                    r = void 0;
                if (e > 0 && 2e9 > e && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, i), !(0 >= e) && a && a.box && !a.box.minimized) {
                    switch (clearTimeout(a.hideNotifyTO), t) {
                        case "online":
                            r = getLang("mail_im_user_became_online", 3 - a.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            r = getLang("mail_im_user_became_offline", 3 - a.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            r = getLang("mail_im_not_online", 3 - a.sex).replace(/\.$/, "")
                    }
                    r = r.replace("{user}", a.fname), val(a.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + r + "</div>");
                    var n = a.notify.firstChild;
                    clearTimeout(a.hideNotifyTO), a.hideNotifyTO = setTimeout(function() {
                        fadeOut(n, 200, function() {
                            val(a.notify, "")
                        })
                    }, 5e3)
                }
            },
            hideChatCtrl: function() {
                removeClass(Chat.wrap, "chat_active"), removeEvent(document, "mousedown", FastChat.onDocClick)
            },
            showChatCtrl: function() {
                addClass(Chat.wrap, "chat_active"), setTimeout(function() {
                    addEvent(document, "mousedown", FastChat.onDocClick)
                }, 0)
            },
            hideUI: function() {
                addClass(bodyNode, "chat_onl_hidden")
            },
            showUI: function() {
                removeClass(bodyNode, "chat_onl_hidden")
            },
            initUI: function() {
                if (curFastChat.options) {
                    var e = curFastChat.el = {},
                        t = getWndInner();
                    re("rb_box_fc_clist"), e.clistWrap = se(curFastChat.tpl.clist), e.clist = geByClass1("fc_contacts", e.clistWrap, "div"), e.clistTitle = geByClass1("fc_tab_title", e.clistWrap, "div"), e.clistOnline = geByClass1("fc_clist_online", e.clistWrap, "div");
                    var i = curFastChat.options.state || !1,
                        a = !curFastChat.friendsCnt || (i && void 0 !== i.clist.min ? i.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                    curFastChat.clistW = 270, curFastChat.clistH = 299;
                    var r = {
                        id: "fc_clist",
                        movable: geByClass1("fc_tab_head", e.clistWrap),
                        hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                        startHeight: curFastChat.clistH,
                        startWidth: curFastChat.clistW,
                        resizeableH: e.clist,
                        resize: !1,
                        minH: 150,
                        fixed: a,
                        onHide: function(t) {
                            val("fc_clist_filter", curFastChat.q = ""), addClass(curFastChat.clistBox.wrap, "fc_fixed"), curFastChat.clistBox.fixed = !0, FastChat.stateChange({
                                op: "clist_toggled",
                                val: 0
                            }), setStyle(curFastChat.clistBox.wrap, {
                                top: "auto",
                                bottom: 0,
                                right: 72,
                                left: "auto"
                            }), show(e.topLink), FastChat.hideChatCtrl()
                        },
                        onShow: function() {
                            FastChat.showChatCtrl()
                        },
                        onDragEnd: function(e, t) {
                            FastChat.stateChange({
                                op: "clist_moved",
                                y: e,
                                x: t
                            })
                        },
                        onResize: function(e, t) {
                            curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0)
                        }
                    };
                    i && !a && (i.clist.x !== !1 && (-1 == i.clist.x ? r.startRight = 0 : r.startLeft = t[1] * i.clist.x), i.clist.y !== !1 && (-1 == i.clist.y ? r.startBottom = 0 : r.startTop = t[0] * i.clist.y)), a && (r.noshow = !0), void 0 === r.startTop && void 0 === r.startBottom && (r.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === r.startLeft && void 0 === r.startRight && (r.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, r), r.noshow || void 0 === r.startLeft && void 0 === r.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                        prefix: "fc_",
                        scrollChange: FastChat.clistShowMore,
                        nomargin: !0,
                        global: !0,
                        nokeys: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto"
                    }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4), curFastChat.updateTypingsInt = setInterval(FastChat.updateTypings, 5e3);
                    var n = ge("fc_clist_filter");
                    if (placeholderInit(n, {
                            global: !0
                        }), curFastChat.q = "", addEvent(n, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                            if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                            var t = FastChat.clistFilterKey(e);
                            return void 0 !== t ? t : (curFastChat.q = trim(val(this)), void FastChat.clistRender())
                        }), e.clistOnline) {
                        var o;
                        bodyNode.appendChild(o = ce("nobr", {
                            className: "fl_l",
                            innerHTML: getLang("mail_im_clist_onlines")
                        }, {
                            visibility: "hidden",
                            position: "absolute"
                        })), re(o), addEvent(e.clistOnline, "mouseover", function(t) {
                            showTooltip(this, {
                                text: getLang("mail_im_clist_onlines"),
                                forcetoup: 1,
                                shift: [12, 4, 3],
                                className: "tt_fc_onlines",
                                init: function() {
                                    browser.msie && (e.clistOnline.tt.isFixed = !1)
                                },
                                black: 1
                            })
                        }), addEvent(e.clistOnline, "click", function(e) {
                            (e.originalEvent || e).cancelBubble = !0, FastChat.clistToggleOnlines(), FastChat.clistRender()
                        }), i && i.clist && i.clist.onlines && FastChat.clistToggleOnlines(!0)
                    }
                    a ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, i && i.tabs && each(i.tabs, function(e, i) {
                        e = intval(e);
                        var a = {
                            nofocus: 1
                        };
                        this.min && (a.minimized = !0), this.h && (a.startHeight = this.h * t[0]), this.w && (a.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? a.startRight = 0 : a.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? a.startBottom = 0 : a.startTop = t[0] * this.y), i.fx ? (a.fixedLoad = !0, FastChat.prepareTabIcon(e, a, !0)) : (a.noAnim = !0, FastChat.addPeer(e, !1, !1, a))
                    }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
                }
            },
            itemsOffset: 12,
            itemsTT: function(e) {
                for (var t = e.target, i = !1; t && t != Chat.itemsCont;) {
                    if (hasClass(t, "chat_tab_wrap")) {
                        i = t;
                        break
                    }
                    t = t.parentNode
                }
                if (!i) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
                var a = i.id.split("_")[3],
                    r = Chat.tabs[a];
                return r ? curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == a ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(i, {
                    text: r.name,
                    slideX: 15,
                    black: 1,
                    asrtl: 1,
                    appendEl: Chat.ttNode,
                    className: "tt_black_side",
                    shift: [-58, -37, 0]
                }), void(Chat.ttPeer = i)) : !1
            },
            itemsOut: function() {
                return Chat.ttOutTimeout ? !1 : void(Chat.ttOutTimeout = setTimeout(function() {
                    return Chat.ttOutTimeout = !1, Chat.ttPeer ? (triggerEvent(Chat.ttPeer, "mouseout"), void(Chat.ttPeer = !1)) : !1
                }, 0))
            },
            stateChange: function(e) {
                ajax.post("al_im.php", extend({
                    act: "a_state_fc",
                    hash: curFastChat.options.state_hash || ""
                }, e), {
                    onFail: function() {
                        return !0
                    }
                }), FastChat.lcSend("stateChange", e)
            },
            onStateChanged: function(e) {
                var t = e.peer ? curFastChat.tabs[e.peer] : !1,
                    i = e.peer ? t && t.box : curFastChat.clistBox,
                    a = getWndInner();
                switch (e.op) {
                    case "added":
                        if (t) {
                            delete t.auto;
                            break
                        }
                        e.fixed ? FastChat.prepareTabIcon(e.peer, {
                            fixedLoad: !0
                        }) : FastChat.addPeer(e.peer);
                        break;
                    case "unfixed":
                        var r = {
                            startHeight: intval(a[0] * e.h),
                            startWidth: intval(a[1] * e.w)
                        }; - 1 == e.y ? r.startBottom = 0 : r.startTop = intval(a[0] * e.y), -1 == e.x ? r.startRight = 0 : r.startLeft = intval(a[1] * e.x), FastChat.addPeer(e.peer, !1, !1, r);
                        break;
                    case "closed":
                        if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !i) break;
                        i.close();
                        break;
                    case "hidden":
                        if (!t || !i) break;
                        i.close();
                        break;
                    case "minimized":
                        if (!t || !i) break;
                        e.val ? i.unminimize() : i.minimize();
                        break;
                    case "moved":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                        break;
                    case "resized":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                        var n = intval(a[1] * e.w);
                        setStyle(i.resizeableH, "height", intval(a[0] * e.h)), setStyle(i.resizeableW, "width", n), FastChat.fixResized(t, n);
                        break;
                    case "clist_toggled":
                        e.val ? i.show(0, !0) : i.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                        break;
                    case "clist_moved":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                        break;
                    case "onlines_toggled":
                        FastChat.clistToggleOnlines(e.val), FastChat.clistRender()
                }
            },
            onUnidle: function() {
                curNotifier.version && curFastChat.clistBox && (curFastChat.clistBox.visible && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle(), each(curFastChat.tabs, function(e) {
                    FastChat.restoreDraft(e)
                }))
            },
            clistUpdate: function() {
                var e = vkNow();
                if (curNotifier.is_server && !(curFastChat.clistUpdatedTs && e - curFastChat.clistUpdatedTs < 6e4)) {
                    curFastChat.clistUpdatedTs = e;
                    var t, i = [];
                    for (t in curFastChat.tabs) i.push(t);
                    for (t in Chat.tabs) i.push(t);
                    ajax.post("al_im.php", {
                        act: "a_onlines",
                        peer: i.join(",")
                    }, {
                        onDone: function(e) {
                            FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                        }
                    })
                }
            },
            clistGotOnlines: function(e) {
                var t = curFastChat.onlines,
                    i = [];
                curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(a) {
                    curFastChat.onlines[a] != t[a] && (FastChat.tabNotify(a, e[a] ? "online" : "offline", e[a]), e[a] || (i[a] = 1))
                }), each(Chat.tabs, function(i) {
                    if (curFastChat.onlines[i] != t[i]) {
                        var a = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + i));
                        toggleClass(a, "online", e[i]), toggleClass(a, "mobile", e[i] && mobPlatforms[e[i]])
                    }
                }), i = arrayKeyDiff(t, e, i), each(i, function(e) {
                    FastChat.tabNotify(e, "offline")
                }), FastChat.clistRender())
            },
            clistShow: function() {
                var e = hasClass(Chat.wrap, "chat_active");
                FastChat.clistRender(), curFastChat.clistBox.visible ? curFastChat.clistBox.focus() : (curFastChat.activeBox && curFastChat.activeBox != curFastChat.clistBox && curFastChat.activeBox.hide(), curFastChat.clistBox.show(), FastChat.setActive(curFastChat.clistBox), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0), curFastChat.el.topLink && hide(curFastChat.el.topLink)), elfocus("fc_clist_filter"), FastChat.movePointer(!1, e)
            },
            clistHide: function() {
                curFastChat.clistBox.hide(), curFastChat.activeBox == curFastChat.clistBox && FastChat.setActive(!1)
            },
            clistRender: function(e) {
                var t = [],
                    i = !e,
                    a = 1 + (e ? 40 : 20),
                    r = curFastChat.q,
                    n = !1,
                    o = !1,
                    s = !1;
                if (r ? (s = [], each(FastChat.clistCache(r), function() {
                        s.push(escapeRE(this))
                    }), s = new RegExp("([ -]|^|s|&nbsp;|\b)(" + s.join("|") + ")", "gi"), n = curFastChat.clistCache[r] || {}) : curFastChat.clOnlines && (n = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var r = intval(e),
                            c = !n || n[r];
                        if (!i) return void(r == curFastChat.clOffset && (i = !0));
                        if (c) {
                            if (!--a) return curFastChat.clHasMore = !0, !1;
                            t.push(FastChat.clistWrapPeer(r, this, s)), o = r
                        }
                    }), o !== !1 || e || r ? r && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(r, s, o === !1)) : t.push('<div class="fc_clist_empty">' + getLang(r ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = o, e) {
                    for (var c = ce("div", {
                            innerHTML: t.join("")
                        }), u = document.createDocumentFragment(); c.firstChild;) u.appendChild(c.firstChild);
                    curFastChat.el.clist.appendChild(u), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
                } else val(curFastChat.el.clist, t.join("")), FastChat.clistUpdateTitle(!0), (browser.chrome || browser.safari) && setTimeout(function() {
                    setStyle(curFastChat.el.clist.firstChild, {
                        width: curFastChat.el.clist.firstChild.clientWidth
                    }), setTimeout(function() {
                        setStyle(curFastChat.el.clist.firstChild, {
                            width: ""
                        })
                    }, 0)
                }, 0);
                if (curFastChat.clSel) {
                    var l = ge("fc_contact" + curFastChat.clSel);
                    l ? FastChat.clistPeerOver(l, 1) : curFastChat.clSel = !1
                } else {
                    var l = geByClass1("fc_contact", curFastChat.el.clist);
                    FastChat.clistPeerOver(l, 1)
                }
                curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
            },
            clistWrapPeer: function(e, t, i) {
                var a, r, n = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    o = curFastChat.onlines[e],
                    s = onlinePlatformClass(o),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (i && (c = c.replace(i, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && 2e9 > e ? (a = "/id" + e, r = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (a = "/im?sel=" + e, r = ""), e > 2e9 && t[3]) var u = t[3];
                else var u = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + a + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event, { entrypoint: \'fastchat_search\' });" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + s + '" ' + r + ">" + u + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (n ? " <b>+" + n + "</b>" : "") + "</span></span></a>"
            },
            clistPeerOver: function(e, t, i) {
                if (e && checkOver(i, e)) {
                    var a = e.id.substr(10);
                    curFastChat.clSel && t && curFastChat.clSel != a && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = a : curFastChat.clSel == a && (curFastChat.clSel = !1)
                }
            },
            authorOver: function(e, t) {
                var i = e.getAttribute("data-title"),
                    a = gpeByClass("fc_tab_log", e),
                    r = !1,
                    n = e.getBoundingClientRect().top,
                    o = a.getBoundingClientRect().top;
                if (10 > n - o && (r = !0), i) {
                    var s = e.getAttribute("data-date");
                    s && (i += "<br>" + s), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + i + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: r,
                        shift: [1, 8, 0]
                    })
                }
            },
            getCorrespondents: function(e, t, i) {
                return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || i && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
            },
            loadCorrespondents: function(e, t) {
                e == curFastChat.q && ajax.post("hints.php", {
                    act: "a_json_friends",
                    str: e,
                    from: "fc",
                    allow_multi: 1
                }, {
                    onDone: function(i) {
                        curFastChat.correspondents || (curFastChat.correspondents = {});
                        var a, r = {};
                        if (each(i, function() {
                                a = this[3] + "_", curFastChat.friends[a] || (r[a] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = r, e == curFastChat.q) {
                            var n = ge("fc_correspondents");
                            if (n) {
                                var o = n.parentNode,
                                    s = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(r, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (s.firstChild)
                                    for (; s.firstChild;) c.appendChild(s.firstChild);
                                else o.firstChild == n && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                o.replaceChild(c, n), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                            }
                        }
                    }
                })
            },
            wrapCorrespondents: function(e, t) {
                var i = [];
                return each(e, function(e) {
                    i.push(FastChat.clistWrapPeer(intval(e), this, t))
                }), i.join("")
            },
            updateFriends: function(e) {
                if (window.Chat && Chat.inited) {
                    var t = Chat.onl;
                    t && (e > 0 ? (val(t, e), show(Chat.wrap)) : hide(Chat.wrap))
                }
            },
            onDocClick: function(e) {
                if (curFastChat.activeBox) {
                    var t = e.target;
                    if (curBox()) return !0;
                    for (; t;) {
                        if ("fc_tab_wrap" == t.className || "chat_onl_wrap" == t.id || "custom_menu_cont" == t.id || "layer_wrap" == t.id || "box_layer_wrap" == t.id || "wk_layer_wrap" == t.id) return !0;
                        t = t.parentNode
                    }
                    var i = curFastChat.tabs[curFastChat.activeBox.options.peer];
                    return i && (trim(Emoji.editableVal(i.txt)) || i.imMedia && i.imMedia.getMedias().length) ? !0 : void curFastChat.activeBox.hide()
                }
            },
            clistCache: function(e) {
                if (e) {
                    var t, i, a, r, n, o, s, c, u, l = [e];
                    if ((i = parseLatin(e)) && l.push(i), (i = parseLatKeys(e)) && l.push(i), (i = parseCyr(e)) && l.push(i), void 0 !== curFastChat.clistCache[e]) return l;
                    u = curFastChat.clistCache[e] = {};
                    for (a in l)
                        if (t = l[a], n = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()]) {
                            s = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi");
                            for (r in n) c = curFastChat.friends[r + "_"], isArray(c) && null !== c[0].match(s) && (u[r] = 1)
                        }
                    r = 0;
                    for (a in u) r++;
                    return u._num = r, l
                }
                var o, d, f;
                curFastChat.clistCache = {};
                for (a in curFastChat.friends)
                    for (o = curFastChat.friends[a][0], a = intval(a), d = 0; f = " " + o.charAt(d).toLowerCase(), curFastChat.clistCache[f] || (curFastChat.clistCache[f] = {}), curFastChat.clistCache[f][a] = 1, d = o.indexOf(" ", d + 1), -1 != d;) ++d
            },
            clistShowMore: function() {
                if (curFastChat.clHasMore) {
                    var e = curFastChat.el.clist,
                        t = e.scrollTop,
                        i = e.clientHeight,
                        a = e.scrollHeight;
                    t + 3 * i > a && FastChat.clistRender(!0)
                }
            },
            clistUpdateTitle: function(e) {
                var t, i = 0,
                    a = 0;
                for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (a++, i++) : curFastChat.clOnlines || i++;
                var r = window.newVal = (a ? getLang("mail_im_X_onlines_title", a) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(a), val(curFastChat.el.clistTitle, r), val(curFastChat.el.topLink, r.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? i = curFastChat.el.clist.childNodes.length : curFastChat.q && (i = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * i)
            },
            clistToggleOnlines: function(e) {
                void 0 === e && (e = !curFastChat.clOnlines, FastChat.stateChange({
                    op: "onlines_toggled",
                    val: e ? 1 : 0
                })), toggleClass(curFastChat.el.clistOnline, "fc_clist_online_active", e), curFastChat.clOnlines = e
            },
            clistFilterKey: function(e) {
                var t;
                switch (e.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        if ("keyup" != e.type) {
                            if (t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel)) {
                                var i = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                    a = t;
                                do a = a[i]; while (a && (1 != a.nodeType || !hasClass(a, "fc_contact")))
                            } else curFastChat.clSel || e.keyCode != KEY.DOWN || (a = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                            if (a && a != t) {
                                FastChat.clistPeerOver(a, 1);
                                var r = curFastChat.el.clist;
                                a.offsetTop + 16 > r.clientHeight + r.scrollTop ? (r.scrollTop = a.offsetTop + 16 - r.clientHeight, curFastChat.clistBoxScroll.update()) : a.offsetTop - 36 < r.scrollTop && (r.scrollTop = a.offsetTop - 36, curFastChat.clistBoxScroll.update())
                            }
                        }
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        return !0;
                    case KEY.ENTER:
                        if ("keyup" == e.type || !(t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel))) break;
                        e.ctrlKey || e.metaKey && browser.mac ? nav.go(t.href.match(/\b(vkontakte\.ru|vk\.com)(\/[^\/]+?)$/)[2]) : FastChat.selectPeer(curFastChat.clSel);
                    case KEY.ESC:
                        if ("keyup" != e.type) {
                            var n = ge("fc_clist_filter"),
                                o = val(n) || curFastChat.clSel;
                            n.blur(), val(n, curFastChat.q = ""), curFastChat.clSel = !1, o && FastChat.clistRender()
                        }
                        break;
                    default:
                        return
                }
                return cancelEvent(e)
            },
            changePeerCounter: function(e, t, i) {
                if (!Chat.tabs[e]) return !1;
                var a = ge("chat_tab_icon_" + e),
                    r = geByClass1("chat_tab_counter", a);
                r || (r = ce("div", {
                    className: "chat_tab_counter"
                }), a.appendChild(r)), void 0 === i ? Chat.counters[e] = positive((Chat.counters[e] || 0) + t) : Chat.counters[e] = i, Chat.counters[e] ? r.innerHTML = Chat.counters[e] : re(r)
            },
            prepareTabIcon: function(e, t, i) {
                var a = curFastChat.friends && curFastChat.friends[e + "_"];
                if (a) {
                    var r = {
                        name: a[0],
                        photo: a[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, r, i)
                } else {
                    var n = 3;
                    curFastChat.needPeers[e] = [n, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t], FastChat.lcSend("needPeer", {
                        id: e,
                        mask: n
                    })
                }
            },
            addTabIcon: function(e, t, i) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var a = t.data.members_grid_fc || "";
                    else var a = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var r = "im?sel=c" + (e - 2e9);
                    else var r = t.alink || "/id" + e;
                    var n = onlinePlatformClass(t.online),
                        o = se('<a class="chat_tab_wrap' + (i ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + r + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + n + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + a + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div></a>');
                    Chat.itemsCont.insertBefore(o, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: o,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), i || removeClass(o, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
                }
            },
            checkChatHeight: function() {
                function e() {
                    addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }

                function t() {
                    removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }
                var i = getSize(Chat.itemsCont)[1];
                Chat.lastHeight = i, i > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: Chat.maxHeight
                }), addEvent(Chat.scrollNode, "mouseenter", e), addEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow()), Chat.scrollNode.scrollTop = i - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: "auto"
                }), removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap), removeEvent(Chat.scrollNode, "mouseenter", e), removeEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow())
            },
            checkShadow: function() {
                var e = intval(Chat.scrollNode.scrollTop);
                e && Chat.fixH ? Chat.shadowTop || (addClass(Chat.wrap, "chat_scroll_top"), fadeIn(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !0) : Chat.shadowTop && (fadeOut(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !1), Chat.lastHeight - e > Chat.maxHeight && Chat.fixH ? Chat.shadowBottom || (fadeIn(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !0) : Chat.shadowBottom && (fadeOut(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !1)
            },
            scrollWrap: function(e) {
                e || (e = window.event);
                var t = 0;
                return e.wheelDeltaY || e.wheelDelta ? t = (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && (t = 10 * -e.detail), Chat.scrollNode.scrollTop -= t, curFastChat.activeBox == curFastChat.clistBox ? (curFastChat.pointerMargin = 0, FastChat.setPointer(!1, curFastChat.pointerMargin, curFastChat.prevPointer)) : (curFastChat.pointerMargin = -Chat.scrollNode.scrollTop, FastChat.setPointer(!0, curFastChat.pointerMargin, curFastChat.prevPointer)), FastChat.checkShadow(), setStyle(Chat.ttNode, {
                    top: -Chat.scrollNode.scrollTop
                }), cancelEvent(e)
            },
            togglePeer: function(e, t) {
                return curFastChat.activeBox && curFastChat.activeBox.options.peer == e ? (curFastChat.activeBox.hide(), FastChat.setActive(!1), !1) : FastChat.selectPeer(e, t, {
                    entrypoint: "fastchat_icon"
                })
            },
            selectPeer: function(e, t, i) {
                if (checkEvent(t)) return !0;
                var a = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var r = curFastChat.tabs[e].box;
                    r.minimized && r.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, a)
                } else i || (i = {}), i.fixed = !0, i.onPeerAdded = function() {
                    FastChat.movePointer(e, a)
                }, i.onHistoryLoaded = FastChat.readLastMsgs.pbind(e), FastChat.addPeer(e, !1, !0, i);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && (curFastChat.tabs[e].entrypoint = i && i.entrypoint, curFastChat.tabs[e].iman.unidle()), !1
            },
            closeTabIcon: function(e, t, i) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !i && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var a = ge("chat_tab_icon_" + e);
                addClass(a, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                var r = function() {
                    re(a), a && (a = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                    var e = Chat.scrollNode.scrollTop;
                    FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                };
                animate(a, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: r
                }), i || FastChat.stateChange({
                    op: "closed",
                    peer: e
                });
                var n = Object.keys(Chat.tabs).length;
                return n || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, i) {
                var a = i - t,
                    r = Chat.maxHeight + 32;
                return e && 62 > a ? a - 62 : e && a > r ? a - r : 0
            },
            setPointer: function(e, t, i) {
                if (!curFastChat.activeBox) return !1;
                var a = FastChat.getPointerShift(e, t, i),
                    r = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(r, {
                    marginTop: t + a
                }), a
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var i = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var a = ge("chat_tab_icon_" + e);
                    if (!a) return !1;
                    if (!Chat.fixH && a.nextSibling) var r = getXY(a.nextSibling)[1] - 50;
                    else if (a.nextSibling || Chat.fixH) var r = getXY(a)[1] + Chat.scrollNode.scrollTop;
                    else var r = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var n = 23 + getXY(Chat.cont)[1] - r,
                        o = -Chat.scrollNode.scrollTop
                } else var n = 28,
                    o = 0;
                var s = FastChat.setPointer(e, o, n);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, o + s, curFastChat.prevPointer);
                        setStyle(i, {
                            bottom: curFastChat.prevPointer - c + s
                        })
                    }
                    animate(i, {
                        bottom: n
                    }, {
                        duration: 100
                    })
                } else setStyle(i, {
                    bottom: n
                });
                curFastChat.prevPointer = n
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                var e = e - 8,
                    i = !1,
                    a = 0;
                for (var r in curFastChat.tabs) {
                    var n = curFastChat.tabs[r];
                    if (t || (n.box.movedLeft = !1), n && !n.box.options.fixed && n.box.toBottom && !n.box.movedLeft && !n.box.noMove) {
                        var o = n.box.pos;
                        o[1] + o[3] >= e && o[1] > a && (i = n, a = o[1])
                    }
                }
                if (i) {
                    var s = e - i.box.pos[3],
                        c = i.box.pos[0];
                    0 > s && (s = 0), i.box.movedLeft = !0, animate(i.box.wrap, {
                        left: s
                    }, 200), i.box.pos = [c, s, i.box.pos[2], i.box.pos[3]];
                    var u = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: i.box.options.peer,
                        y: c / u[0],
                        x: s / u[1]
                    }), s && FastChat.moveBoxesLeft(s, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var i = t - e.pos[3] - 20, a = e.pos[3], r = e.pos[0], n = !1; i > 0 && !n;) {
                    n = !0;
                    for (var o in curFastChat.tabs) {
                        var s = curFastChat.tabs[o].box.pos;
                        s[0] + s[2] / 2 > r && s[1] + s[3] > i && s[1] < i + a && (i -= s[3], n = !1)
                    }
                }
                0 > i && (i = positive(Math.random() * t)), animate(e.wrap, {
                    left: i
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: r / c[0],
                    x: i / c[1]
                })
            },
            pinTab: function(e, t, i) {
                if (-1 == e) var a = curFastChat.clistBox;
                else var a = curFastChat.tabs[e].box;
                a.options.fixed = !1, removeClass(a.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var r = a.wrap.offsetTop,
                    n = a.wrap.offsetLeft - 10;
                setStyle(a.wrap, {
                    left: a.wrap.offsetLeft,
                    top: a.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), i || animate(a.wrap, {
                    left: n,
                    top: r
                }, 300), a.pos = [r, n, a.pos[2], a.pos[3]], a.toRight = !1, a.toBottom = !0, addClass(a.wrap, "fc_tobottom");
                var o = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                    s = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                    c = getWndInner(); - 1 == e ? FastChat.stateChange({
                    op: "clist_toggled",
                    val: 1,
                    y: a.toBottom ? -1 : a.pos[0] / c[0],
                    x: a.toRight ? -1 : a.pos[1] / c[1]
                }) : FastChat.stateChange({
                    op: "unfixed",
                    peer: e,
                    y: a.toBottom ? -1 : a.pos[0] / c[0],
                    x: a.toRight ? -1 : a.pos[1] / c[1],
                    h: s / c[0],
                    w: o / c[1]
                }), a.noMove = !0, FastChat.moveBoxesLeft(n), a.noMove = !1
            },
            addPeer: function(e, t, i, a) {
                a || (a = {});
                var r = curFastChat.friends && curFastChat.friends[e + "_"],
                    n = 0;
                if (i ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: a.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (i = !0), r) {
                    var o = {
                        name: r[0],
                        photo: r[1],
                        fname: r[2],
                        hash: r[3],
                        online: curFastChat.onlines[e],
                        sex: r[4]
                    };
                    FastChat.addTabIcon(e, o, a.noAnim), FastChat.addBox(e, o, a), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (a && a.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), n |= 2)
                } else n = 3;
                n && (i ? (curFastChat.needPeers[e] = [n, t, !1, a], FastChat.getPeers()) : (curFastChat.needPeers[e] = [n, t, setTimeout(FastChat.getPeers, irand(150, 200)), a], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: n
                })))
            },
            getPeers: function() {
                var e = [],
                    t = {};
                each(curFastChat.needPeers, function(i) {
                    e.push(i), e.push(this[0]), clearTimeout(this[2]), t[i] = this[0]
                }), e.length && (FastChat.lcSend("fetchingPeers", t), ajax.post("al_im.php", {
                    act: "a_get_fc_peers",
                    peers: e.join(",")
                }, {
                    onDone: function(e) {
                        FastChat.gotPeers(e), FastChat.lcSend("gotPeers", e)
                    }
                }))
            },
            gotPeers: function(e) {
                a() || each(curFastChat.needPeers, function(t) {
                    if (e[t]) {
                        e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                        var i = this[1],
                            a = this[3];
                        2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : a.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], a), i ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, i)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), a && a.nofocus || FastChat.activateTab(t))), a.onHistoryLoaded && a.onHistoryLoaded()
                    }
                })
            },
            gotHistory: function(e, t) {
                if (isArray(t) && t.length && t[0]) {
                    var i = curFastChat.tabs[e],
                        a = t[0],
                        r = t[1];
                    i.offset = t[2], extend(i.msgs, r), each(r, function(e, t) {
                        !t[0] && t[1] && i.unread++
                    }), val(i.log, a), i.logWrap.scrollTop = i.logWrap.scrollHeight, setTimeout(function() {
                        i.logWrap.scrollTop = i.logWrap.scrollHeight, i.scroll && i.scroll.update(!1, !0)
                    }, 10)
                }
            },
            decHashCb: function(e) {
                ! function(e) {
                    curFastChat.decodedHashes[e] = function(e) {
                        for (var t = ge ? "" : "___", i = 0; i < e.length; ++i) t += e.charAt(e.length - i - 1);
                        return geByClass ? t : "___"
                    }(e.substr(e.length - 5) + e.substr(4, e.length - 12))
                }(e)
            },
            decodehash: function(e) {
                return curFastChat.decodedHashes || (curFastChat.decodedHashes = {}), curFastChat.decodedHashes[e] || FastChat.decHashCb(e), curFastChat.decodedHashes[e]
            },
            onMyTyping: function(e) {
                e = intval(e);
                var t = curFastChat.tabs[e];
                if (!(-2e9 >= e) && t) {
                    var i = vkNow();
                    curFastChat.myTypingEvents[e] && i - curFastChat.myTypingEvents[e] < 5e3 || (curFastChat.myTypingEvents[e] = i, ajax.post("al_im.php", {
                        act: "a_typing",
                        peer: e,
                        hash: t.sendhash,
                        from: "fc"
                    }))
                }
            },
            updateTypings: function() {
                each(curFastChat.tabs || {}, function(e, t) {
                    FastChat.updateTyping(e)
                })
            },
            updateTyping: function(e, t) {
                var i, a = curFastChat.tabs[e],
                    r = [],
                    n = curFastChat.typingEvents[e],
                    o = vkNow(),
                    s = ge("fc_tab_typing" + e),
                    c = geByClass1("_fc_tab_typing_progress", s),
                    u = geByClass1("_fc_tab_typing_name", s);
                if (2e9 > e) n && 6e3 > o - n && (r.push(a.fname || a.name || ""), i = a.sex);
                else {
                    var l = a.data.members;
                    each(n || {}, function(e, t) {
                        t && 6e3 > o - t && l[e] && l[e].first_name && (r.push(l[e].first_name || ""), i = l[e].sex)
                    })
                }
                if (!r.length) return hide(c), t ? setStyle(s, "opacity", 0) : fadeTo(s, 1e3, 0);
                if (1 == r.length) val(u, langSex(i, lang.mail_im_typing).replace("{user}", r[0]));
                else {
                    var d = r.pop();
                    val(u, getLang("mail_im_multi_typing").replace("{users}", r.join(", ")).replace("{last_user}", d))
                }
                return show(c), t ? setStyle(s, "opacity", 1) : fadeTo(s, 200, 1)
            },
            readLastMsgs: function(e) {
                var t = curFastChat.tabs[e];
                if (e && t) {
                    if (!t.markingRead && t.unread) {
                        var i = [];
                        for (var a in t.msgs) !t.msgs[a][0] && t.msgs[a][1] && i.push(a);
                        FastChat.markRead(e, i)
                    }
                    FastChat.changePeerCounter(e, 0, 0)
                }
            },
            markRead: function(e, t) {
                if (t.length) {
                    var i = curFastChat.tabs[e];
                    i.markingRead = !0, ajax.post("al_im.php", {
                        act: "a_mark_read",
                        peer: e,
                        ids: t,
                        hash: i.sendhash,
                        from: "fc"
                    }, {
                        onDone: function(a) {
                            i.markingRead = !1;
                            for (var r in t) {
                                var n = t[r],
                                    o = ge("fc_msg" + n),
                                    s = o && o.parentNode;
                                o && (i.msgs[n] && i.msgs[n][1] && (i.msgs[n][1] = 0, i.msgs[n][0] || i.unread--), removeClass(o, "fc_msg_unread"), hasClass(s.parentNode, "fc_msgs_unread") && each(s.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(s.parentNode, "fc_msgs_unread"), !1)
                                }))
                            }
                            i.unread > 0 && (i.unread = 0, each(i.msgs, function() {
                                !this[0] && this[1] && i.unread++
                            })), FastChat.updateUnreadTab(e)
                        },
                        onFail: function() {
                            i.markingRead = !1
                        }
                    })
                }
            },
            mkMsg: function(e, t) {
                var i = clean(e).replace(/\n/g, "<br>"),
                    a = !1;
                return i = (0, o.replaceHyperLinks)(i || "", o.linksReplacer.bind(null, a)), i = (0, o.replaceMentions)(i), i = (0, o.replaceEmailLinks)(i), i = (0, o.replaceHashtags)(i, function(e) {
                    return '<a href="/im?sel=' + t + "&st=" + encodeURIComponent(e) + '">' + e + "</a>"
                }), i = Emoji.emojiToHTML(i, 1)
            },
            getEditCont: function(e) {
                return stManager.add(["emoji.js"]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
            },
            getVal: function(e) {
                return Emoji ? Emoji.editableVal(e) : ""
            },
            onTxtResize: function(e) {
                var t = curFastChat.tabs[e],
                    i = geByClass1("fc_tab_txt", t.wrap),
                    a = getSize(i)[1];
                if (a > 40) {
                    var r = positive(a - 40),
                        n = intval(getSize(t.box.resizeableH)[1]);
                    n + t.hDiff - r < 40 && (r = n + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: n + (t.hDiff || 0) - r
                    }), t.hDiff = r, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var n = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: n + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, i) {
                var a = geByClass1("fc_editable", i),
                    r = curFastChat.tabs[e] = {
                        name: t.name,
                        fname: t.fname,
                        photo: t.photo,
                        link: t.alink || "/id" + e,
                        hash: t.hash,
                        sendhash: FastChat.decodehash(t.hash),
                        sex: t.sex || 0,
                        data: t.data || {},
                        online: t.online,
                        msgs: {},
                        msgscount: 0,
                        unread: 0,
                        sent: 0,
                        sentmsgs: [],
                        box: !1,
                        wrap: i,
                        editable: 1,
                        txt: a,
                        txtWrap: a.parentNode.parentNode,
                        logWrap: geByClass1("fc_tab_log", i),
                        log: geByClass1("fc_tab_log_msgs", i),
                        notify: geByClass1("fc_tab_notify_wrap", i),
                        title: geByClass1("fc_tab_title", i)
                    },
                    o = 30;
                if (r.addMediaBtn = geByClass1("fc_tab_attach", i), r.editable) cur.t = r, r.emojiId = Emoji.init(r.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", i),
                    ttDiff: -46,
                    ttShift: 0,
                    rPointer: !0,
                    global: !0,
                    noRce: !0,
                    peer: e,
                    isChat: !0,
                    noCtrlSend: !0,
                    ref: "fast_chat",
                    onSend: FastChat.send.pbind(e),
                    checkEditable: FastChat.checkEditable,
                    onResize: function() {
                        FastChat.onTxtResize(e)
                    },
                    addMediaBtn: r.addMediaBtn,
                    onShow: function() {
                        cssAnim(r.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(r.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return r.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, i) {
                        --r.sent, FastChat.send(e, t, i)
                    }
                });
                else {
                    var s = 15;
                    autosizeSetup(r.txt, {
                        minHeight: s,
                        maxHeight: 42
                    }), r.txt.autosize.options.onResize = function(e) {
                        if (!r.box.minimized) {
                            var t = 42 == e ? 42 : s;
                            t != e && setStyle(r.txt, "height", t), t != o && (setStyle(r.logWrap, "height", r.logWrap.clientHeight - t + o), o = t, r.scroll && r.scroll.update(!1, !0))
                        }
                    }
                }
                return r.imPeerMedias = {}, r.imSortedMedias = {}, r.previewEl = geByClass1("fc_tab_preview", i), stManager.add(["page.js", "page.css", "ui_media_selector.js", "ui_media_selector.css"], function() {
                    r.imMedia = new MediaSelector(r.addMediaBtn, r.previewEl, [
                        ["photo", getLang("profile_wall_photo")],
                        ["video", getLang("profile_wall_video")],
                        ["audio", getLang("profile_wall_audio")],
                        ["doc", getLang("profile_wall_doc")],
                        ["map", getLang("profile_wall_map")]
                    ], {
                        limit: 10,
                        hideAfterCount: 0,
                        maxShown: 0,
                        mail: 1,
                        tooltip: 1,
                        topOffset: 0,
                        forceUp: 1,
                        global: 1,
                        toId: vk.id
                    }), r.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
                            t.removeAllAttaches(), r.imMedia.getMedias().forEach(function(e) {
                                return t.addAttach(e[0], e[1])
                            }), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), r
            },
            addBox: function(e, t, i) {
                if (void 0 === curFastChat.tabs[e]) {
                    var a = FastChat.getEditCont(Emoji.last);
                    i = i || {}, curFastChat.tabs[e] = {};
                    var r = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: a
                    }));
                    i.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var n = FastChat.initTab(e, t, r),
                        o = getWndInner(),
                        s = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", r),
                            closer: geByClass1("fc_tab_close_wrap", r, "a"),
                            resizeableH: n.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: i.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                n.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete n.auto), FastChat.restoreDraft(e), n.editable ? Emoji.editableFocus(n.txt, !1, !0) : elfocus(n.txt), n.wrap.clientWidth && setStyle(n.title, {
                                    maxWidth: n.wrap.clientWidth - 71
                                }), n.editable || setStyle(n.txt.autosize.helper, {
                                    width: getStyle(n.txt, "width", !1)
                                }), n.scroll && n.scroll.update(!1, !0), setTimeout(elfocus.pbind(n.txt), 10)
                            },
                            onHide: function() {
                                i.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), i && i.beforeClose && i.beforeClose();
                                var a = curFastChat.tabs,
                                    r = a[e].posSeq;
                                if (delete a[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), r) {
                                    var n, o, s, c, u, l = {},
                                        d = [];
                                    for (each(a, function() {
                                            this.posSeq > r && (l[this.posSeq] = this, d.push(this.posSeq))
                                        }), d.unshift(r), d.sort(), u = !browser.msie && d.length < 10, n = 1; n < d.length; n++) o = d[n], s = l[o].box, c = n > 1 ? l[d[n - 1]].box.pos : t, u ? animate(s.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(s)) : setStyle(s.wrap, {
                                        left: c[1]
                                    });
                                    if (!u)
                                        for (n = 1; n < d.length; n++) s = l[d[n]].box, s._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(n, n.wrap.clientWidth, !0), t || (n.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, i) {
                                var a = getWndInner(),
                                    r = n.box.pos;
                                n.scroll && n.scroll.show(), FastChat.fixResized(n, i, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / a[0],
                                    w: i / a[1],
                                    y: n.box.toBottom ? -1 : r[0] / a[0],
                                    x: n.box.toRight ? -1 : r[1] / a[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(n, t);
                                var i = geByClass1("fc_tab_title", n.box.content);
                                setStyle(i, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete n.posSeq, n.scroll && n.scroll.hide(), val(n.notify, ""), clearTimeout(n.hideNotifyTO)
                            },
                            onDragEnd: function(t, i) {
                                delete n.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: i
                                })
                            }
                        };
                    if (i && extend(s, i), void 0 === s.startLeft && void 0 === s.startRight) {
                        var c = [],
                            u = o[0] - 350,
                            l = curFastChat.clistBox.pos,
                            d = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var f = Call.calcBoxPos();
                            c.push([f.x, f.x + f.w]), d = !0
                        }
                        l[0] + l[2] > u && (curFastChat.clistBox.visible || !d) && c.push([l[1], l[1] + l[3]]), each(curFastChat.tabs, function(t) {
                            (l = this.box && this.box.pos) && t != e && l[0] + l[2] > u && c.push([l[1], l[1] + l[3]])
                        });
                        var h, p, m, _ = lastWindowWidth - 262 - sbWidth(),
                            g = 0,
                            v = !1,
                            b = !1,
                            C = g > _ ? 1 : -1;
                        for (h = _; C * g > C * h; h += 135 * C) {
                            for (p = 0, m = 0; m < c.length; m++) h > c[m][0] - 260 && h < c[m][1] && p++, h > c[m][0] - 10 && h < c[m][0] + 10 && (p += 1.1);
                            (v === !1 || b > p) && (v = h, b = p)
                        }
                        d && b && (v = _), extend(s, {
                            startBottom: 0,
                            startLeft: v
                        })
                    }
                    var y, w = !0;
                    for (y in i || {})
                        if ("nofocus" != y) {
                            w = !1;
                            break
                        }
                    w && (n.posSeq = ++curFastChat.posSeq), s.fixed && (s.startHeight = curFastChat.clistH, s.startWidth = curFastChat.clistW, s.onShow = FastChat.showChatCtrl), n.box = new RBox(r, s), n.iman = new IdleManager({
                        id: "tab" + e,
                        element: n.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMsgs(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), s.fixed && FastChat.setActive(n.box), n.scroll = new Scrollbar(n.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(n)
                    }), s.minimized || !i || void 0 === i.startLeft && void 0 === i.startTop && void 0 === i.startWidth && void 0 === i.startHeight || n.box._wnd_resize(o[0], o[1], !0), n.wrap.clientWidth && setStyle(n.title, {
                        maxWidth: n.wrap.clientWidth - 71
                    }), addEvent(n.txt, "keydown focus mousedown keyup", function(t) {
                        if ("mousedown" == t.type) return void(curRBox.active == n.box.id && ((t.originalEvent || t).cancelBubble = !0));
                        if ("keydown" == t.type && t.ctrlKey && t.keyCode == KEY.RETURN) {
                            var i = this.value;
                            if ("number" == typeof this.selectionStart && "number" == typeof this.selectionEnd) {
                                var a = this.selectionStart;
                                this.value = i.slice(0, a) + "\n" + i.slice(this.selectionEnd), this.selectionStart = this.selectionEnd = a + 1
                            } else if (document.selection && document.selection.createRange) {
                                this.focus(t);
                                var r = document.selection.createRange();
                                r.text = "\r\n", r.collapse(!1), browser.opera && (r.moveEnd("character", 0), r.moveStart("character", 0)), r.select()
                            }
                            return n.editable ? FastChat.checkEditable(n.emojiId, n.txt) : (n.txt.autosize.update(), setTimeout(function() {
                                n.txt.autosize.update()
                            }, 0)), !1
                        }
                        if ("focus" == t.type) curFastChat.peer = e;
                        else if ("keyup" == t.type) {
                            var o = n.lastVal || "",
                                s = FastChat.getVal(this);
                            (s.length != o.length || s != o) && (s && FastChat.onMyTyping(e), n.lastVal = s), clearTimeout(n.saveDraftTO), n.saveDraftTO = setTimeout(FastChat.saveDraft.pbind(e), s.length ? 300 : 0), FastChat.checkEditable(n.emojiId, n.txt)
                        }
                    }), FastChat.restoreDraft(e), s.onPeerAdded && s.onPeerAdded()
                }
            },
            onScroll: function(e) {
                var t = e.scroll.obj.scrollTop,
                    i = geByClass1("_fc_msgs_more", e.logWrap);
                200 > t && isVisible(i) && i.click()
            },
            loadMore: function(e, t) {
                var i = curFastChat.tabs[e],
                    a = i.offset;
                return i.moreLoading ? !1 : (i.moreLoading = !0, void ajax.post("al_im.php", {
                    act: "a_history",
                    peer: e,
                    offset: a,
                    from: "fc"
                }, {
                    onDone: function(e) {
                        e[3] || hide(t);
                        var a = t.parentNode,
                            r = a.clientHeight;
                        a.insertBefore(cf(e[0]), t.nextSibling);
                        var n = a.clientHeight - r;
                        n && (i.logWrap.scrollTop += n), i.scroll.update(), i.offset = e[2], i.moreLoading = !1, FastChat.onScroll(i)
                    },
                    onFail: function() {
                        i.moreLoading = !1
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                }))
            },
            sendOnResponse: function(e, t, i) {
                if (e.version && intval(e.version) > curFastChat.version) return void FastChat.updateVersion(e.version);
                var a = ge("fc_msg" + t),
                    r = e.msg_id,
                    n = indexOf(t, i.newmsgs);
                if (a) {
                    if (e.media) {
                        var o = {
                            sticker: intval(e.sticker)
                        };
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: i.box.options.peer,
                            text: e.media,
                            msgOpts: o
                        }), FastChat.gotMsgMedia(i.box.options.peer, t, e.media, o)
                    }++i.msgscount, -1 != n && i.newmsgs.splice(n, 1), a.id = "fc_msg" + r, i.msgs[r] = [1, 1]
                }
            },
            checkEditable: function(e, t) {
                Emoji.checkEditable(e, t, {
                    height: 52
                })
            },
            fixResized: function(e, t, i) {
                e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                    maxWidth: t - 71
                }), i && (e.editable || setStyle(e.txt.autosize.helper, {
                    width: getStyle(e.txt, "width", !1)
                }), e.scroll && e.scroll.update(!1, !0)))
            },
            activateTab: function(e) {
                var t = curFastChat.tabs[e].box;
                curFastChat.activeBox && curFastChat.activeBox != t && curFastChat.activeBox.hide(0, !1, {
                    noState: !0
                }), t.show(), t.options.fixed && FastChat.setActive(t)
            },
            updateUnreadTab: function(e) {
                var t = curFastChat.tabs[e];
                t && (val(t.title, t.name + (t.unread ? ' <span class="fc_tab_count">(' + t.unread + ")</span>" : "")), val("fc_contact_unread" + e, t.unread ? " <b>+" + t.unread + "</b>" : ""), FastChat.changePeerCounter(e, !1, t.unread))
            },
            blinkTab: function(e) {
                var t = curFastChat.tabs[e];
                if (!t.blinking && curFastChat.peer != e) {
                    t.blinking = !0, clearTimeout(t.blinkingTO);
                    var i = t.box.wrap,
                        a = i.className,
                        r = Math.min(s, intval(getStyle(i, "zIndex")));
                    setStyle(i, {
                        zIndex: s
                    }), removeClass(i, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, getStyle(i, "zIndex") == s && (setStyle(i, {
                            zIndex: r
                        }), i.className = a)
                    }, 2e3)
                }
            },
            createProgress: function(e, t, i) {
                var a = ce("span", {
                    innerHTML: rs(vk.pr_tpl, {
                        id: "",
                        cls: ""
                    }),
                    className: "fc_msg_progress",
                    id: "fc_msg_progress" + t
                });
                return e.insertBefore(a, i), a
            },
            removeProgress: function(e) {
                re("fc_msg_progress" + e)
            },
            send: function(e, t, i) {
                var a = curFastChat.tabs[e],
                    r = trim(a.editable ? Emoji.editableVal(a.txt) : val(a.txt));
                if (t) {
                    var n = [
                        ["sticker", t]
                    ];
                    r = ""
                } else var n = a.imMedia ? a.imMedia.getMedias() : [];
                var o = ge("fc_tab_typing" + e),
                    s = geByClass1("page_progress_preview", a.wrap);
                if (s && s.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var c = geByClass("fc_tab_log", a.wrap)[0];
                    return FastChat.createProgress(c, e, c.lastChild), void(o.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), o.style.visibility = "visible", !r && !n.length) return void(a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt));
                var u = --a.sent,
                    l = {
                        act: "a_send",
                        to: e,
                        hash: a.sendhash,
                        msg: r,
                        from: "fc",
                        entrypoint: curFastChat.tabs[e].entrypoint,
                        media: []
                    };
                i && (l.sticker_referrer = i);
                for (var d, f = 0, h = n.length; h > f; ++f)(d = n[f]) && l.media.push(d[0] + ":" + d[1]);
                l.media = l.media.join(","), a.sending = !0, Emoji.ttHide(a.emojiId), curFastChat.tabs[e].entrypoint = !1, ajax.post("al_im.php", l, {
                    onDone: function(t) {
                        clearTimeout(a.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, u, a)
                    },
                    onFail: function(t) {
                        FastChat.error(e, t || getLang("global_unknown_error")), elfocus(a.txt), val(a.txt, r), a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update();
                        var i = ge("fc_msg" + u);
                        return i ? (i.appendChild(ce("span", {
                            className: "fc_msg_error",
                            innerHTML: getLang("global_error")
                        })), FastChat.scroll(e), !0) : void 0
                    },
                    showProgress: function() {
                        a.sending = !0, a.sendProgressTO = setTimeout(function() {
                            var e = ge("fc_msg" + u);
                            e && FastChat.createProgress(e, u, e.firstChild)
                        }, 2e3)
                    },
                    hideProgress: function() {
                        a.sending = !1, clearTimeout(a.sendProgressTO), FastChat.removeProgress(u)
                    }
                }), re("fc_error" + e), a.sentmsgs.push(u), t || (val(a.txt, ""), a.imMedia && a.imMedia.unchooseMedia());
                var p = l.media ? 1 : 0;
                t && (p += 8), FastChat.addMsg(FastChat.prepareMsgData([e, u, 3, FastChat.mkMsg(r, e), p])), delete curFastChat.myTypingEvents[e], a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update(!1, !0), elfocus(a.txt), FastChat.scroll(e)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = (t || {}).txt;
                if (i && t) {
                    var a = Emoji.editableVal(i),
                        r = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
                    r.setText(trim(a) || ""), r.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = t.txt,
                    a = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
                return !i || !t || val(i).length > a.dData.txt.length && !a.hasAttaches() ? !1 : (t.editable ? i.innerHTML = Emoji.emojiToHTML(clean(a.dData.txt), 1) : val(i, clean(a.dData.txt)), setTimeout(function() {
                    for (var e = a.dData.attaches, i = 0; i < e.length; i++) t.imMedia && t.imMedia.chooseMedia(e[i].type, e[i].id, e[i].object || {});
                    a.destroy()
                }, 40), FastChat.checkEditable(t.emojiId, i), setTimeout(function() {
                    i.scrollTop = i.scrollHeight
                }, 10), !0)
            },
            error: function(e, t) {
                e = e || curFastChat.peer;
                var i = curFastChat.tabs[e];
                re("fc_error" + e), i.log.appendChild(ce("div", {
                    id: "fc_error" + e,
                    className: "fc_msgs_error",
                    innerHTML: t || getLang("global_error")
                })), FastChat.scroll(e)
            },
            scroll: function(e) {
                e = e || curFastChat.peer;
                var t = curFastChat.tabs[e];
                t && (t.logWrap.scrollTop = t.logWrap.scrollHeight, t.scroll && t.scroll.update(!1, !0))
            },
            mkdate: function(e) {
                var t = new Date(1e3 * e),
                    i = new Date,
                    a = function(e) {
                        return (e + "").length < 2 ? "0" + e : e
                    };
                if (t.getDay() == i.getDay()) return a(t.getHours()) + ":" + a(t.getMinutes());
                var r = a(t.getDate()) + "." + a(t.getMonth() + 1);
                return t.getFullYear() != i.getFullYear() && (r += "." + (t.getFullYear() + "").substr(2)), r
            },
            prepareMsgData: function(e) {
                var t, i = e[0],
                    a = intval(e[2]),
                    r = 2 & a ? curFastChat.me.id : i > 2e9 ? e[5] : i,
                    n = intval(vkNow() / 1e3),
                    o = e[4],
                    s = "",
                    c = {
                        id: e[1],
                        peer: i,
                        from_id: r,
                        text: e[3],
                        out: 2 & a ? !0 : !1,
                        unread: 1 & a ? !0 : !1,
                        date: n,
                        date_str: FastChat.mkdate(n)
                    };
                return o && (1 & o && (s += rs(vk.pr_tpl, {
                    id: "",
                    cls: ""
                }), e[1] > 0 && setTimeout(FastChat.needMsgMedia.pbind(i, e[1]), 5)), 6 & o && (s += rs(curFastChat.tpl.msg_fwd, {
                    msg_id: e[1],
                    peer_nice: FastChat.nicePeer(i),
                    label: getLang(2 & o ? "mail_im_fwd_msg" : "mail_im_fwd_msgs")
                })), 8 & o && (c.sticker = !0), s && (c.text += '<div class="fc_msg_attachments" id="fc_msg_attachments' + c.id + '">' + s + "</div>")), t = 2 & a ? curFastChat.me : i > 2e9 ? curFastChat.tabs[i].data.members[r] : curFastChat.tabs[i], extend(c, {
                    from_id: r,
                    link: t.link,
                    photo: t.photo,
                    name: t.name,
                    fname: i > 2e9 ? t.fname || t.first_name : ""
                }), c
            },
            needMsgMedia: function(e, t) {
                0 >= t || (FastChat.lcSend("needMedia", {
                    msgId: t
                }), curFastChat.needMedia[t] = [e, setTimeout(FastChat.loadMsgMedia.pbind(e, t), curNotifier.is_server ? 0 : irand(150, 250))])
            },
            loadMsgMedia: function(e, t) {
                0 >= t || void 0 !== curFastChat.gotMedia[t] && 0 !== curFastChat.gotMedia[t] || (FastChat.lcSend("fetchingMedia", {
                    msgId: t
                }), curFastChat.gotMedia[t] = 0, ajax.post("al_im.php", {
                    act: "a_get_media",
                    id: t,
                    from: "fc"
                }, {
                    onDone: function(i, a, r) {
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: i,
                            msgOpts: r
                        }), FastChat.gotMsgMedia(e, t, i, r)
                    }
                }))
            },
            gotMsgMedia: function(e, t, i, a) {
                if (val("fc_msg_attachments" + t, i), a && a.sticker) {
                    var r = ge("fc_msg" + t),
                        n = r && r.parentNode;
                    r && addClass(n.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
                }
                FastChat.scroll(e), curFastChat.gotMedia[t] = [e, i, a], a.stickers && window.Emoji && Emoji.updateTabs(a.stickers, a.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
            },
            replaceSpecialSymbols: function(e) {
                return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
            },
            addMsg: function(e) {
                var t = e.peer,
                    i = curFastChat.tabs[t],
                    a = i.log,
                    r = a.lastChild;
                if (r && "fc_msgs_error" == r.className && (r = r.previousSibling), !i || e.out || !i.box.visible || i.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), !r || !hasClass(r, "fc_msgs_wrap") || !hasClass(r, "fc_msgs_unread") && e.unread === !0 || r.getAttribute("data-from") != e.from_id || e.date - intval(r.getAttribute("data-date")) >= 300 || e.sticker || hasClass(r, "fc_msg_sticker")) {
                    re("fc_log_empty" + t);
                    var n = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (n += " fc_msg_sticker");
                    var o = e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    r = se(rs(o, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: n,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: ""
                    })), a.appendChild(r)
                } else e.unread || removeClass(r, "fc_msgs_unread");
                var s = geByClass1("fc_msgs", r, "div"),
                    c = geByClass1("fc_msgs_date", s),
                    u = geByClass1("fc_msg_last", s);
                u && removeClass(u, "fc_msg_last");
                var l = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(s) && "BR" == domFC(s).tagName && re(domFC(s)), c ? s.insertBefore(l, c) : s.appendChild(l), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), i.scroll && i.scroll.update()
            },
            editMsg: function(e) {
                var t = e.id,
                    i = ge("fc_msg" + t);
                if (i) {
                    var a = se(rs(curFastChat.tpl.msg, {
                        msg_id: t,
                        classname: i.getAttribute("class"),
                        text: FastChat.replaceSpecialSymbols(e.text)
                    }));
                    i.parentNode.replaceChild(a, i)
                }
            },
            deleteMsg: function(e) {
                var t = e.id,
                    i = ge("fc_msg" + t);
                if (i) {
                    var a = !domNS(i) && !domPS(i),
                        r = domClosest("fc_tab_log_msgs", i);
                    for (re(a ? domClosest("fc_msgs_wrap", i) : i); hasClass(domLC(r), "fc_msgs_date");) re(domLC(r))
                }
            },
            showMsgFwd: function(e) {
                return !showBox("al_im.php", {
                    act: "a_show_forward_box",
                    id: vk.id + "_" + e,
                    from: "mail"
                }, {
                    stat: ["im.css"],
                    dark: 1,
                    params: {
                        onHide: function() {
                            AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0)
                        }
                    }
                })
            },
            closeTab: function(e) {
                var t = curFastChat.tabs[e].box;
                t.close()
            },
            nicePeer: function(e) {
                return e > 2e9 ? "c" + intval(e - 2e9) : -2e9 > e ? "e" + intval(-e - 2e9) : e
            },
            tplBox: '<div class="fc_tab_wrap"><div class="fc_tab_head clear_fix"><a class="fc_tab_close_wrap"><div class="chats_sp fc_tab_close"></div></a><a class="fc_tab_max_wrap" href="/im?sel=%id%" onmousedown="event.cancelBubble = true;" onclick="return nav.go(this, event);"><div class="chats_sp fc_tab_max"></div></a><a class="fc_tab_pin_wrap" onmousedown="event.cancelBubble = true;" onclick="return FastChat.pinTab(%id%, event);"><div class="chats_sp fc_tab_pin"></div></a><div class="fc_tab_title noselect">%name%</div></div><div class="fc_tab"><div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><a class="fc_tab_attach"></a><div class="fc_tab_txt">%cont%<div class="fc_tab_preview"></div></div></div></div><div class="fc_pointer_offset"><div class="fc_tab_pointer fc_tab_pointer_peer"></div></div></div>',
            tplTab: '<div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><div class="fc_tab_txt">%cont%</div></div>'
        }
    },
    190: function(e, t, i) {
        "use strict";

        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t["default"] = e, t
        }

        function r(e) {
            return e.get ? e.get() : e
        }

        function n(e, t) {
            var i = r(e),
                a = i.tabs[i.peer];
            return Object.keys(a.msgs).filter(function(i) {
                var r = b(e, t, i);
                return !(0, W.isOut)(r) && intval(i) > a.in_up_to
            })[0]
        }

        function o(e) {
            var t = r(e);
            return t.searchShown
        }

        function s(e) {
            var t = r(e);
            return t.peer
        }

        function c(e, t) {
            var i = r(e);
            return i.tabs[t]
        }

        function u(e) {
            var t = r(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function l(e) {
            var t = r(e);
            return t.selectedMessages
        }

        function d(e, t, i) {
            var a = c(e, t),
                r = l(e)[0];
            if ("undefined" == typeof r) return [i];
            var n = Math.min(i, r),
                o = Math.max(i, r);
            return Object.keys(a.msgs).filter(function(e) {
                return e >= n && o >= e
            }).filter(function(t) {
                return !(0, Y.isServiceMsg)(b(e, e.get().peer, t))
            }).map(intval)
        }

        function f(e, t) {
            var i = r(t),
                a = c(i, e),
                n = 0;
            for (var o in a.msgs)
                if (a.msgs.hasOwnProperty(o)) {
                    var s = b(t, e, o);
                    (0, W.isOut)(s) || (n += (0, W.isUnread)(a, s) ? 1 : 0)
                }
            return n
        }

        function h(e, t, i) {
            var a = c(e, t);
            return Object.keys(a.msgs).filter(function(a) {
                return intval(b(e, t, a).randomId) === i
            }).length > 0
        }

        function p(e, t, i) {
            var a = h(e, t, i);
            return !!a
        }

        function m(e, t) {
            var i = r(e),
                a = i.msg_local_ids_sort && i.msg_local_ids_sort[t];
            return "undefined" != typeof a ? 2e9 + a : t
        }

        function _(e, t, i) {
            var a = c(e, t),
                r = b(e, t, i),
                n = Object.keys(a.msgs).filter(function(i) {
                    var a = b(e, t, i),
                        n = a.local && a.type !== G.EDIT_MESSAGE;
                    return !r.local && n ? !1 : r.local && !n ? !0 : m(e, r.messageId) > m(e, a.messageId)
                }),
                o = n.pop();
            return o ? b(e, t, o) : null
        }

        function g(e) {
            return e && e.length > 0 ? V.addMessageEvent([0].concat(e)) : e
        }

        function v(e, t, i) {
            var a = c(e, t),
                n = b(e, t, i),
                o = r(e);
            return (0, W.isOut)(n) ? (0, Q.oCacheGet)(e, o.id).name : n.userId !== n.peerId ? (0, Q.oCacheExists)(e, n.userId) ? (0, Q.oCacheGet)(e, n.userId).name : !1 : a.tab
        }

        function b(e, t, i) {
            var a = c(e, t),
                r = a && a.msgs && a.msgs[i];
            return r ? g(r) : null
        }

        function C(e, t, i) {
            var a = c(e, t),
                r = a && a.msgs && Object.keys(a.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!r) return null;
            var n = r && r.indexOf("" + i),
                o = n > -1 ? r[n - 1] : null;
            return a.msgs[o]
        }

        function y(e) {
            var t = r(e);
            return t.gid || t.isClassic
        }

        function w(e) {
            return r(e).gid
        }

        function k(e) {
            return r(e).gid
        }

        function N(e) {
            return r(e).gid
        }

        function T(e, t) {
            var i = r(t);
            return i.tabs[e] || i.mapped_index[e]
        }

        function F(e) {
            var t = r(e);
            return N(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === K.FOLDER_UNRESPOND || t.active_tab === K.FOLDER_UNREAD ? !0 : !1 : !1
        }

        function E(e, t) {
            e = r(e);
            var i = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
            return e.tabs[t] && e.tabs[t].msgs && i ? !0 : !1
        }

        function S(e, t) {
            var i = c(e, t);
            i && (i.msgs = void 0, i.msgid = void 0, i.scrollTop = void 0, i.scrollBottom = void 0, i.contHeight = void 0, i.offset = void 0, i.skipped = void 0)
        }

        function x(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[0] : !1
        }

        function I(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function L(e) {
            var t = r(e);
            return !t.lockedSending
        }

        function A(e) {
            return e > -2e9 && 0 > e
        }

        function O(e, t) {
            return A(t) ? !!c(e, t).blocked_community : !1
        }

        function M(e) {
            var t = r(e);
            return t.voice_message_available
        }

        function R(e) {
            var t = r(e);
            return !(!P(t) && !t.recentSearch)
        }

        function P(e) {
            var t = r(e);
            return t.searchText
        }

        function D(e, t) {
            var i = r(e);
            return t && t !== P(e) || i.recentSearch ? !0 : !1
        }

        function B(e) {
            var t = r(e);
            return t.recentSearch
        }

        function H(e) {
            var t = u(e);
            return t && t.pinned && g(t.pinned)
        }

        function j(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function q(e) {
            return 1 == r(e).isEditing
        }

        function z(e) {
            return r(e).gid
        }

        function U(e) {
            return e.draft || (e.draft = (0, $.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.unpackStore = r, t.getFirstUnread = n, t.isSearchShown = o, t.getPeer = s, t.getTab = c, t.getCurrentTab = u, t.getSelectedMessages = l, t.getMessageRangeFromSelection = d, t.countUnread = f, t.getMessageByRid = h, t.isRidExist = p, t.getLocalId = m, t.getLastMessage = _, t.parserMessage = g, t.getAuthorFullName = v, t.getMessage = b, t.getPreviousMessage = C, t.isClassicInterface = y, t.isLocksAvailable = w, t.isFoldersAvailable = k, t.isCommunityInterface = N, t.getBareTab = T, t.isReversedDialogs = F, t.isFullyLoadedTab = E, t.makeTabNotFullyLoaded = S, t.isGoToEndVisible = x, t.getUnreadScrollBottom = I, t.isSendingAvailable = L, t.isCommunityPeer = A, t.isCommunityBlocked = O, t.checkVoiceMessageAvailable = M, t.isSearching = R, t.getSearchText = P, t.isSearchingValue = D, t.isRecentSearchesActive = B, t.getPinnedMessage = H, t.doPopularSuggExist = j, t.isAnyMessageBeingEdited = q, t.getGroupId = z, t.getTabDraft = U;
        var W = i(126),
            G = i(124),
            V = a(G),
            K = i(81),
            Y = i(198),
            Q = i(86),
            $ = i(88)
    },
    195: function(e, t, i) {
        "use strict";

        function a(e, t) {
            if ((0, g.unpackStore)(e).searchShown) return !1;
            var i = (0, g.getTab)(e, t),
                a = i && (0, g.parserMessage)(i.pinned);
            return a ? i.pinHideId != a.chat_local_id : !1
        }

        function r(e, t, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                r = (0, g.getTab)(e, t),
                n = r && (0, g.parserMessage)(r.pinned);
            r && n && (r.pinHideId = n.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [r.peerId, r.pinHideId]), c(i, t, e), re(geByClass1("_im_pinned_tt")), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function n(e, t, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                r = (0, g.getTab)(e, t);
            r && r.pinHideId && (delete r.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [r.peerId, void 0]), c(i, t, e), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function o(e, t, i) {
            var a = c.bind(null, i, t),
                r = (0, _.showUnpinDialog)(function() {
                    r.hideProgress(), r.hide(), e.set(h.unpinMessageOptimistic.bind(null, t)).then(a).then(function(e) {
                        return e.set(h.unpinMessage.bind(null, t))
                    }).then(a)
                })
        }

        function s(e, t, i) {
            var a = e.get(),
                n = a.peer,
                o = (0, g.parserMessage)((0, g.getTab)(e, n).pinned);
            if (i.target.classList.contains(C)) o && r(e, n, t);
            else if ("A" !== i.target.tagName) {
                var s = o && o.messageId;
                if (s && !(0, _.isAlreadyDeleted)(e, n, s)) {
                    var c = e.get(),
                        u = (0, g.getMessage)(e, n, s);
                    u ? (e.setState({
                        msgid: s
                    }), (0, v.updateLocation)({
                        msgid: s
                    }), t().focusOnMessage()) : c.longpoll.push([(0, p.changePeer)(n, s)])
                } else(0, _.showPinnedBox)(e, t, n, m.mount, i);
                statlogsValueEvent("im_pinned_messages", "open")
            }
        }

        function c(e, t, i) {
            return e().updateChatTopic(t, i), (0, h.setActions)(i.get()), e().updateActions(i), i
        }

        function u(e) {
            showTooltip(e.target, {
                text: getLang("mail_hide_unpin_hover"),
                black: 1,
                needLeft: 1,
                shift: [8, 4],
                forcetoup: !0,
                className: "_im_pinned_tt",
                appendEl: bodyNode
            })
        }

        function l(e) {
            return {
                unmount: function() {
                    (0, f.destroyModule)(e)
                }
            }
        }

        function d(e, t, i) {
            var a = (0, f.createMutations)(l),
                r = a.bindMutations,
                n = s.bind(null, t, i),
                o = u.bind(null),
                c = (0, f.createModule)({
                    handlers: function(t, i) {
                        i(e, "click", y, n), i(e, "mouseover", C, o)
                    }
                });
            return r(c)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.isPinnedMessageVisibleInTab = a, t.pinnedMessageHide = r, t.pinnedMessageUnHide = n, t.pinnedMessageUnpin = o, t.mount = d;
        var f = i(42),
            h = i(175),
            p = i(124),
            m = i(57),
            _ = i(198),
            g = i(190),
            v = i(30),
            b = i(184),
            C = "_im_pin_hide",
            y = "_im_pinned_message"
    },
    198: function(e, t, i) {
        "use strict";

        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t["default"] = e, t
        }

        function r(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function n() {
            var e = ti.get(Zi);
            return e || 0
        }

        function o(e) {
            e >= window.clientHeight() - 30 && (e = 0), ti.set(Zi, e)
        }

        function s(e, t) {
            var i = gi(e, t),
                a = i.firstElementChild.offsetHeight !== i.parentNode.offsetHeight;
            a && Ni(i.firstElementChild, {
                height: i.parentNode.offsetHeight
            })
        }

        function c(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function u(e, t, i, a) {
            var r = t && !i ? 1 : !t && i ? -1 : 0;
            r && !(0, wt.isClassicInterface)(e) && a().compensateHistoryHeightChange(r)
        }

        function l(e, t, i, a) {
            var r = window.devicePixelRatio >= 2 ? "256" : "128",
                n = "animation" === i,
                o = "im_gift";
            n && (o += " sticker_img");
            var s = "/images/stickers/" + si(e) + "/" + r + ".png",
                c = '<img height="128" class="' + o + '" src="' + s + '"/>';
            if (n) {
                var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                    l = "animatedSticker" + a;
                c = '<div id="' + l + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + a + '" data-sticker-id="' + si(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + c + "</div>";
                var d = !1;
                browser.msie ? (0 ^ a) === a && (d = !0) : d = Number.isInteger(a), d && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(l, 10)
            }
            return t && (c = '<a onmouseover="return Emoji.stickerOver(' + si(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + si(t) + ', this, event);">' + c + "</a>"), c = '<div class="im_sticker_row">' + c + "</div>"
        }

        function d(e, t, i) {
            var a = e.get ? e.get() : e;
            if (O(a, t)) {
                var r = a.tabs[t].deleted || [];
                return oi(i, r)
            }
            return !1
        }

        function f(e, t, i) {
            var a = i.randomId,
                r = gi("_im_mess_rid" + a, t);
            return r && (t = ie([r], t), t = w(e, i, t, !0, !1)), t
        }

        function h(e) {
            var t = (0, wt.checkVoiceMessageAvailable)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : "undefined" != typeof t ? Promise.resolve(t) : p().then(function(e) {
                return e.length > 0
            })["catch"](function(e) {
                return !1
            })
        }

        function p() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], i = 0; i < e.length; i++) "audioinput" == e[i].kind && t.push(e[i]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function m(e) {
            return Fi("im_preloader", {
                preloader: ri(ei.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function _(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function g(e) {
            var t = gi("_im_invisible_bar", e);
            t && (Ci(t, "_im_invisible_bar"), Ci(t, "im-page--history-new-bar_hide"))
        }

        function v(e, t, i) {
            var a = b(e, t),
                r = gi("_im_mess_" + t.messageId, i);
            return r && (r.parentNode.replaceChild(ii(a), r), y(i)), i
        }

        function b(e, t) {
            var i = ["_im_mess"],
                a = (0, St.isUnread)(e.tabs[t.peerId], t);
            (0, St.isOut)(t) && a && i.push("im-mess_unread _im_mess_unread"), (0, St.isOut)(t) && i.push("im-mess_out"), (0, St.wasEdited)(t) && i.push("im-mess_was_edited"), (0, Mt.canMessageBeEdited)(e, t) && i.push("im-mess_editable"), (0, St.isImportant)(t) && i.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && i.push("im-mess_selected");
            var r = Date.now() - 1e3 * t.date > 1e3;
            t.local && r && i.push("im-mess_sending"), t.local && i.push("" + Dt), t.local && (0, St.wasEdited)(t) && !a && i.push("im-mess_unread im-mess_nobg"), t.failed && i.push("im-mess_failed " + Bt), (0, St.isGift)(t) && i.push("im-mess_gift");
            var n = C(t),
                o = B(e, t.text, t.kludges);
            "" != o && (0, St.wasEdited)(t) && (o += Fi("sImLblWasEdited", {
                update_time: t.update_time
            })), t.subject && "..." !== t.subject.trim() && !I(t.peerId) && (o = Fi("im_topic", {
                topic: t.subject
            }) + o);
            var s = Fi("im_message_media", {
                messageId: t.messageId,
                attaches: n.join(""),
                text: (0, St.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
            });
            return (0, St.isGift)(t) || (s = o + s), "" == o && (0, St.wasEdited)(t) && (s += Fi("sImLblWasEdited", {
                update_time: t.update_time
            })), Fi("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                text: s,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + Ei("mail_send_message_error") + '" role="link"' : "",
                unread_params: a ? 'aria-label="' + Ei("mail_unread_message") + '"' : "",
                cls: i.join(" ")
            })
        }

        function C(e) {
            return e.attaches.map(function(t) {
                return "sticker" === t.type ? e.messageId ? l(t.id, t.productId, t.kind, e.messageId) : l(t.id, t.productId) : m(t.type)
            })
        }

        function y(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), i = t.length; i--;) wi(t[i], "im-mess_fwd") || t[i].insertAdjacentHTML("afterbegin", Fi("sImHistoryRowActions")), Ci(t[i], "_im_mess_noa")
        }

        function w(e, t, i) {
            var a = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
                r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
                n = Date.now() - 1e3 * t.date > 1e3,
                o = e.tabs[t.peerId];
            if (!i || gi("_im_mess", i) || gi("_im_bar_date", i) || (i.innerHTML = ""), o.skipped > 0) return i;
            var s = [];
            t.local || (s = e.imQueue(t.peerId, a)), s.length > 0 && ie(s.map(function(e) {
                return gi("_im_mess_rid" + e.rid, i)
            }, i).filter(function(e) {
                return e
            }));
            var c = b(e, t),
                u = fi(i);
            wi(u, "_im_mess_stack") || (u = pi(u, "._im_mess_stack", -1));
            for (var l = (0, wt.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && l && !gi("_im_mess_" + l.messageId);) l = (0, wt.getLastMessage)(e, t.peerId, l.messageId);
            var d = gi("_im_unread_bar_row", i),
                f = (0, St.getUserId)(t),
                h = l ? R(l.date, e) : 0;
            if (!l || P(o, l, t, e, r)) {
                var p = "",
                    m = !1;
                if (d && (0, St.isOut)(t) && Ge(e, i, t.peerId), 1 === o.unread && !(0, St.isOut)(t) && r && (p += Fi("im_mess_bar", {}), m = !0, Ge(e, i, t.peerId)), !Ri(new Date(h))) {
                    var _ = new Date,
                        g = m ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    p += Fi("im_day_bar", {
                        day: Oi(t.date, e.timeshift, !0, Ei("months_of", "raw"), !0),
                        date: t.date,
                        day_class: _.getDate() + _.getMonth() + _.getFullYear() + " " + g
                    })
                }
                if (ue(t)) p += Fi("im_service_row", {
                    text: de(e, t, o),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var v = e.gid && (0, St.isOut)(t) ? si(t.kludges.from_admin) || 0 : 0,
                        C = (0, At.oCacheGet)(e, v ? -e.gid : f) || o,
                        w = I(t.peerId) ? C.name : C.first_name,
                        N = C.link || o.href,
                        T = Fi("im_mess_stack_name", {
                            name: w,
                            link: N,
                            "class": (0,
                                St.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if ((0, St.isGift)(t)) {
                        var F = Ei("mail_gift_message_sent", "raw");
                        T += ' <span class="im-mess-stack--gift">' + Si(C.sex || 0, F) + "</span>"
                    }
                    if ((0, St.isMoney)(t)) {
                        var E = (0, St.isMoneyRequest)(t) ? Ei("mail_money_request_message_sent", "raw") : Ei("mail_money_tranfer_message_sent", "raw");
                        T += ' <span class="im-mess-stack--money-transfer">' + Si(C.sex || 0, E) + "</span>"
                    }
                    var S = e.gid ? "/gim" + e.gid : "/im",
                        x = void 0;
                    if (x = t.local ? D(t.date, e.timeshift) : Fi("im_stack_date", {
                            date: D(t.date, e.timeshift),
                            link: S + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), v && e.admins[v]) {
                        var L = e.admins[v],
                            A = v === ei.id ? Ei("mail_by_you") : L[0];
                        x = x + " " + Fi("im_admin_link", {
                            name: A,
                            href: L[1]
                        })
                    }
                    p += Fi("im_mess_stack", {
                        photo: C.photo,
                        href: N,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: ui(T),
                        stack_name: T,
                        peerId: f,
                        date: x,
                        messages: c,
                        admin: t.kludges.from_admin || 0
                    })
                }(0, Lt.toArray)(ni(p)).forEach(function(e) {
                    return i && i.appendChild(e)
                })
            } else d && e.peer === t.peerId && !o.inplaceSearch && (0, St.isOut)(t) && Ge(e, i, t.peerId), gi("_im_stack_messages", u).appendChild(ii(c));
            return (0, St.isOut)(t) && !n && setTimeout(function() {
                var e = gi("_im_mess_" + t.messageId, i);
                wi(e, Dt) && bi(e, "im-mess_sending")
            }, 500), s = s.filter(function(e) {
                return e.rid !== t.randomId
            }), y(i), k(s, e, i)
        }

        function k(e, t, i) {
            var a = void 0;
            return a = "object" === ("undefined" == typeof e ? "undefined" : yt(e)) ? e : t.imQueue(e, !1), a.length > 0 && a.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return (0, wt.getMessage)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return w(t, e, i, !1)
            }), i
        }

        function N(e) {
            var t = gi("_im_mess_blind_unread_marker", e);
            t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
        }

        function T(e, t, i) {
            var a = e.tabs[t];
            return (0, Lt.toArray)(_i("_im_mess_unread", i)).forEach(function(e) {
                var t = si(mi(e, "msgid"));
                t > 0 && a.out_up_to >= t && (Ci(e, "_im_mess_unread"), Ci(e, "im-mess_unread"), N(e))
            }), i
        }

        function F(e, t, i) {
            var a = gi("_im_msg_media" + t.messageId, e);
            return a && (a.innerHTML = i.tabs[t.peerId].mediacontent[t.messageId][0]), e
        }

        function E(e, t) {
            if (!(0, wt.isFullyLoadedTab)(t, e.peerId)) return 0;
            var i = t.tabs[e.peerId];
            return i.msgs[e.messageId] ? 1 : i.msgs["rid" + e.randomId] ? 2 : 0
        }

        function S(e) {
            return 0 == e ? !0 : !1
        }

        function x(e) {
            return e > 0 && 2e9 > e
        }

        function I(e) {
            return e > 2e9
        }

        function L(e) {
            return -2e9 > e
        }

        function A(e, t) {
            return e === t.peer
        }

        function O(e, t) {
            return e.tabs[t] ? !0 : !1
        }

        function M(e, t) {
            return O(e, t) ? null !== e.tabs[t].lastmsg : !1
        }

        function R(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function P(e, t, i, a, r) {
            if ((0, St.getUserId)(t) !== (0, St.getUserId)(i)) return !0;
            var n = R(t.date, a),
                o = R(i.date, a);
            return Mi(n, o) ? (0, wt.isCommunityInterface)(a) && si(t.kludges.from_admin) !== si(i.kludges.from_admin) ? !0 : i.date - t.date > 300 ? !0 : ue(t) || ue(i) ? !0 : (0, St.isGift)(t) || (0, St.isGift)(i) ? !0 : (0, St.isGraffiti)(t) || (0, St.isGraffiti)(i) ? !0 : (0, St.isUnread)(e, t) === (0, St.isUnread)(e, i) || !r || (0, St.isOut)(i) || pe(i.peerId, a.gid) ? !1 : !0 : !0
        }

        function D(e, t) {
            return xi(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function B(e, t, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                r = Math.round(1e9 * Math.random()).toString(16),
                n = {},
                o = 0;
            return t = (0, xt.replaceHyperLinks)(t || "", xt.linksReplacer.bind(null, a)), t = t.replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + o + "_" + r + "!";
                return n[t] = e, o++, t
            }), t = (0, xt.replaceMentions)(t), t = (0, xt.replaceEmailLinks)(t), t = (0, xt.replaceHashtags)(t, function(t) {
                var i = (0, wt.getGroupId)(e),
                    a = i ? "gim" + i : "im";
                return '<a href="/' + a + "?sel=" + (0, wt.getPeer)(e) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(n).forEach(function(e) {
                t = t.replace(e, function() {
                    return n[e]
                })
            }), i.emoji && (t = Wi.emojiToHTML(t, !0)), Yi && (t = Yi(t)), t
        }

        function H(e) {
            return I(e) ? "c" + (e - 2e9) : L(e) ? "e" + Math.abs(e + 2e9) : e
        }

        function j(e) {
            var t = e.substr(0, 1);
            switch (t) {
                case "e":
                    return -2e9 - si(e.substr(1));
                case "c":
                    return 2e9 + si(e.substr(1));
                default:
                    return si(e)
            }
        }

        function q(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function z(e) {
            return {
                search: {
                    name: Ei("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: Ei("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: Ei("mail_allow_comm_messages")
                },
                clear: {
                    name: Ei(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: Ei("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: Ei("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: Ei("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: Ei(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: Ei("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: Ei("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: Ei("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: Ei("mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: Ei("mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: Ei("mail_change_topic")
                },
                "return": {
                    icon: "return",
                    name: Ei("mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: Ei("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: Ei("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: Ei("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: Ei("mail_settings")
                }
            }
        }

        function U(e, t) {
            var i = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (i = Fi("im_dialogs_link", {
                href: t,
                photo: i
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + i + "\n    </div>\n  </div>"
        }

        function W(e, t) {
            var i = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (i = Fi("im_dialogs_link", {
                href: t,
                photo: i
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + i + "\n    </div>\n  </div>"
        }

        function G(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, i) {
                        return U(e, t[i])
                    }).join("");
                case 3:
                    return U(e[0], t[0]) + e.slice(1).map(function(e, i) {
                        return W(e, t[i + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, i) {
                        return W(e, t[i])
                    }).join("")
            }
        }

        function V(e, t, i) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (I(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return G(t.photo);
            var a = t.data.active.slice(0, 4).map(At.oCacheGet.bind(null, e)),
                r = a.map(function(e) {
                    return e.photo
                }),
                n = i ? [] : a.map(function(e) {
                    return e.link
                });
            return G(r, n)
        }

        function K(e) {
            var t = Ei(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + Xt + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Y() {
            return '<li class="im-search-results-head">' + Ei("mail_search_messages") + "</li>"
        }

        function Q() {
            return '<li class="im-search-results-head">' + Ei("mail_search_conversations_sep") + "</li>"
        }

        function $() {
            return '<li class="im-search-results-head">' + Ei("mail_search_dialogs_sep") + "</li>"
        }

        function X() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + Ei("mail_recent_searches") + '\n    <button type="button" class="' + $t + ' im-page--clear-recent">' + Ei("mail_clear_recent") + "</button>\n  </li>"
        }

        function J(e) {
            var t = e.get().popular_sugg,
                i = (0, wt.isClassicInterface)(e) ? 8 : 5;
            return t.length > i && (t = t.slice(0, i)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var i = t.peerId,
                    a = (0, At.oCacheGet)(e, i) || t,
                    r = e.get().tabs[i] || t,
                    n = (e.get().mutedPeers || []).indexOf(i) >= 0,
                    o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + i, r.unread > 0 && "sugg-is_unread", n && "sugg-is_muted"].filter(function(e) {
                        return !!e
                    }).join(" ");
                return '<div class="' + o + '" data-peer="' + i + '">\n    <a class="im-popular--avatar-w ' + zi(r.online) + '" href="' + a.link + '"><img class="im-popular--avatar" src="' + a.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + a.link + '">' + (a.first_name || a.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + q(r.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Z(e, t, i) {
            var a = gi("_im_mess_" + t.messageId, i);
            if (a) {
                ki(a, "aria-hidden", "false"), bi(a, "im-mess_failed " + Bt);
                var r = gi("_im_mess_marker", a);
                ki(r, "aria-label", Ei("mail_send_message_error")), ki(r, "role", "link")
            }
            return i
        }

        function ee(e, t, i) {
            var a = gi("_im_mess_" + t, i);
            if (a) {
                Ci(a, "im-mess_failed"), ki(a, "aria-hidden", "true"), Ci(a, Bt);
                var r = gi("_im_mess_marker", a);
                ki(r, "aria-label", ""), ki(r, "role", "")
            }
            return i
        }

        function te(e, t) {
            var i = e.map(function(e) {
                return gi("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            });
            return ie(i, t)
        }

        function ie(e, t) {
            var i = e.filter(function(e) {
                return !wi(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                return e.parentNode.removeChild(e)
            }), i.filter(function(e) {
                return 0 === hi(e).length
            }).map(function(e) {
                return vi("_im_mess_stack", e)
            }).forEach(function(e) {
                wi(di(e), "_im_bar_date") && ai(di(e)), wi(di(e), "_im_unread_bar_row") && ai(di(e)), ai(e)
            }), t
        }

        function ae(e, t, i, a) {
            return e.map(function(e) {
                return gi("_im_mess_" + e, a)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                Ti(e, se(t, e, i)), bi(e, "im-mess_light")
            }), a
        }

        function re(e, t, i) {
            var a = gi("_im_mess_" + e, i);
            if (a) {
                var r = gi(Ht, a);
                Ti(a, r.innerHTML), Ci(a, "im-mess_light")
            }
            return i
        }

        function ne(e, t, i, a) {
            var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
                n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
            if (n) return oe(e, t, i, a, !0, r);
            var o = ((0, wt.isClassicInterface)(a), 60),
                s = oe(e, t, i, a, !1, r);
            return s.length > o ? oe(e, t, i, a, !0, r) : s
        }

        function oe(e, t, i, a, n, o) {
            var s = [],
                c = (e && e.userIds || []).filter(function(e) {
                    var t = (0, At.oCacheExists)(a, e);
                    return t || s.push(e), t && e != a.id
                });
            if (s.length && (0, Rt.loadChatMember)(r({}, t, s), a), 0 === c.length) return "";
            var u = x(t) || (0, wt.isCommunityPeer)(t) ? "first_name" : n ? "short_name" : "name";
            if (1 == c.length) {
                var l = i ? "" : (0, At.oCacheGet)(a, c[0])[u];
                return l + " " + Ei("mail_typing")
            }
            var d = Ei("mail_typing_several", c.length),
                f = c.slice(0, Math.min(c.length - 1, o)),
                h = f.map(function(e) {
                    return (0, At.oCacheGet)(a, e)[u]
                }).join(", ");
            if (c.length > o + 1) h += " " + Ei("mail_and_peer").replace("{count}", e.totalCount - o).replace("{typing}", d);
            else {
                var p = (0, At.oCacheGet)(a, c[f.length])[u];
                h += " " + Ei("mail_and_peer_one") + " " + p + " " + d
            }
            return h
        }

        function se(e, t, i) {
            var a = t.innerHTML,
                r = "delete" === i ? "mail_deleted_stop" : "mail_marked_as_spam";
            return '<div class="im-mess--text">\n    ' + Ei(r) + ' <button type="button" data-peer="' + e + '" class="' + jt + ' im-mess--btn">' + Ei("mail_restore") + '</button>\n    <div class="' + Ht + ' im-mess--original">' + a + "</div>\n  </div>"
        }

        function ce() {
            return '<div class="im-page--chat-search-empty">\n    ' + Ei("mail_im_search_empty") + "\n  </div>"
        }

        function ue(e) {
            return e.kludges && "undefined" != typeof e.kludges.source_act
        }

        function le(e, t, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return i ? '<a class="im_srv_lnk ' + a + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + a + '">' + t + "</span>"
        }

        function de(e, t, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                r = t.kludges,
                n = r.source_act,
                o = si(r.source_mid),
                s = t.userId,
                c = (0, At.oCacheGet)(e, s),
                u = "",
                l = s === o;
            switch (n) {
                case qt:
                    u = "mail_im_chat_created";
                    break;
                case zt:
                    u = "mail_im_title_updated_dot";
                    break;
                case Ut:
                    u = l ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case Wt:
                    u = l ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case Gt:
                    u = "mail_im_photo_set";
                    break;
                case Vt:
                    u = "mail_im_photo_removed";
                    break;
                case Kt:
                    u = r.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case Yt:
                    u = r.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case Qt:
                    u = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (u = Si(c.sex, Ei(u, "raw")), u = u.replace("{from}", le(c.link, c.name, a)), o && o !== s) {
                var d = r.source_email;
                if (d) u = u.replace("{user}", le("/im?email=" + encodeURIComponent(d), "email", a));
                else {
                    var f = (0, At.oCacheGet)(e, o),
                        h = n === Wt ? f.inv_name : f.kick_name;
                    u = u.replace("{user}", le(f.link, h, a))
                }
            }
            if (r.source_text) {
                var p = r.source_old_text ? '«<b class="im_srv_lnk">' + r.source_old_text + "</b>» &rarr; " : "";
                u = u.replace("{title}", p + ('«<b class="im_srv_lnk">' + r.source_text + "</b>»"))
            }
            if (r.source_act === Kt || r.source_act === Yt)
                if (r.source_message) {
                    var m = he(Wi.emojiToHTML(ui(r.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                        _ = le("", m, !1, "im_srv_mess_link");
                    u = u.replace("{msg}", _)
                } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return le("", t, !1, "im_srv_mess_link")
                });
            return u
        }

        function fe(e, t, i, a) {
            if (t === Gt) {
                var r = gi("_im_mess_" + e.messageId, a);
                if (r) {
                    var n = i.tabs[e.peerId];
                    r.parentNode.innerHTML = Fi("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: de(i, e, n) + i.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return a
        }

        function he(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(Ft.MENTION_RAW, "$1$4")
        }

        function pe(e, t) {
            return t ? !1 : e === ei.id
        }

        function me(e, t) {
            return ji(e, {
                url: (0, wt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
                params: {
                    act: "verified_tt",
                    mid: t,
                    gid: t
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                dir: "auto",
                shift: [94, 7, 7],
                className: "verified_tt"
            })
        }

        function _e(e) {
            return function(t) {
                function i() {
                    o = !0, Ci(n, "im-preloader_visible"), n.parentNode && n.parentNode.removeChild(n)
                }
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    n = ii(Fi("im_preloader", {
                        preloader: ri(ei.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === a ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    o = !1;
                setTimeout(function() {
                    o || ("bottom" === a ? e.appendChild(n) : e.insertBefore(n, li(e)), bi(n, "im-preloader_visible"))
                }, 0), t.then(i)["catch"](function(e) {
                    (0, Pt.imWeirdCatch)("wrapLoading", e), i()
                })
            }
        }

        function ge(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, Nt.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function ve(e, t) {
            if (!t && !e) return !1;
            var i = e.target || e.srcElement,
                a = Xi,
                r = !1,
                n = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do
                if (!i || i.onclick || i.onmousedown || "A" == i.tagName || wi(i, "_im_no_select") || wi(i, "im_msg_media_link") || "IMG" == i.tagName && !wi(i, "_im_graffiti") && !wi(i, "emoji") && !wi(i, "emoji_css") && !wi(i, "im_gift") || "TEXTAREA" == i.tagName || wi(i, "play_new") || wi(i, "videoplayer") || (r = n.test(i.className))) break; while (a-- && (i = i.parentNode));
            return r ? !!ci(be()) : !0
        }

        function be() {
            var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
            return (e || "").toString()
        }

        function Ce(e, t) {
            return '<div class="im-mess--text">\n      <span>' + Ei("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + H(e) + "&msgid=" + t + '">' + Ei("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function ye(e, t) {
            var i = Ei(I(e) ? "mail_chat_sure_to_delete_all" : (0, wt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
            return Bi(Ei("mail_deleteall1"), i, Ei("mail_delete"), t, Ei("global_cancel"))
        }

        function we(e) {
            return Bi(Ei("mail_unpin_title"), Ei("mail_unpin_text"), Ei("mail_unpin"), e, Ei("global_cancel"))
        }

        function ke(e, t, i, a) {
            var r = Ei("mail_dialog_msg_delete_N", t),
                n = Bi(Ei("mail_dialog_msg_delete_title"), r, Ei("mail_delete"), function() {
                    return a(isChecked(gi("_check_forall")))
                }, Ei("global_cancel")),
                o = "",
                s = !1;
            return i && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Ei("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), n.setControlsText(o), s && checkbox(gi("_check_forall")), n
        }

        function Ne(e, t, i, a, r) {
            t.showProgress(), e.set(a.bind(null, r)).then(function() {
                t.hideProgress(), t.hide(), i().removePeer(e, r), i().updateDialogFilters(e)
            })
        }

        function Te(e, t, i, a, r) {
            var n = e.get().peer;
            Ki(a), Di("al_im.php", {
                act: "a_show_members_box",
                chat: n - 2e9
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1
                },
                onDone: function(a, r) {
                    var n = (0, Et.createModule)({
                        handlers: function(r, o) {
                            o(a.bodyNode.parentNode, "click", "_im_invite_box", function() {
                                a.hide(), Fe(e, e.get().peer, t, i), (0, Et.destroyModule)(n)
                            }), o(a.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                                var i = gi("_im_chat_members_w", a.bodyNode.parentNode),
                                    r = 160,
                                    n = vi("_im_member_item", t),
                                    o = n.offsetTop - i.scrollTop + r,
                                    s = o > 370;
                                mobileOnlineTip(t, {
                                    was: si(mi(t, "was")),
                                    mid: si(mi(t, "peer")),
                                    vk_mobile: si(mi(t, "vk_mobile")),
                                    forcetoup: s
                                })
                            })
                        }
                    })
                }
            }, a)
        }

        function Fe(e, t, i, a) {
            var r = e.get().tabs[t],
                n = r.memberIds;
            e.set(a.bind(null, "add_member", n)).then(i().showCreation)
        }

        function Ee(e, t, i) {
            if (e.get().active_tab === Ft.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var a = e.get().active_tab === Ft.FOLDER_ALL ? Ft.FOLDER_UNREAD : Ft.FOLDER_ALL;
            return e.set(i.bind(null, a)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function Se(e, t, i, a) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var r = (0, wt.isReversedDialogs)(t);
            return t.set(a.bind(null, e)).then(function(e) {
                return i().restoreDialogs(e, !0, r !== (0, wt.isReversedDialogs)(e)), e
            })
        }

        function xe(e, t) {
            "undefined" == typeof t && (t = e.get().peer);
            var i = e.get().tabs[t];
            return Ft.FOLDER_MASKS[Ft.FOLDER_IMPORTANT] & i.folders
        }

        function Ie(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
            if ("undefined" == typeof t && (t = e.get().peer), !(0, wt.isFoldersAvailable)(e)) return !1;
            var a = i || e.get().tabs[t];
            return Ft.FOLDER_MASKS[Ft.FOLDER_UNRESPOND] & a.folders
        }

        function Le(e, t) {
            return (t.get().block_states[e] || {}).free === !1
        }

        function Ae(e) {
            return null != e.get().pendingForward
        }

        function Oe(e, t) {
            return (t.get().block_states[e] || {}).who === ei.id
        }

        function Me(e, t) {
            var i = e.get().block_states;
            Object.keys(i).forEach(function(a) {
                i[a].time ? i[a].free === !1 && Date.now() - i[a].time >= 5e4 && t.push([Nt.mutexEvent([, 1, "gim" + e.get().gid, a, 0, ""])]) : i[a].time = Date.now()
            })
        }

        function Re(e, t, i) {
            var a = void 0;
            return !Hi("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(i, r) {
                    r && (a = t(i, e, r))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ui.loaded && Ui.detachPlayer(!0), a.unmount()
                    }
                }
            }, i)
        }

        function Pe(e, t) {
            return De(e.get(), t, (0, wt.getTab)(e, t).last_seen)
        }

        function De(e, t, i, a) {
            if (i[0]) return 2 === i[2] ? '<span class="is_vk_mobile is_online">' + Ei("mail_header_online_status") + Be(t, !1, !0, !0, a) + "</span>" : "online" + (qi[i[0]] ? Be(t, !1, !1, !0, a) : "");
            if (!i[1]) return "";
            var r = Li(i[1], e.timeshift),
                n = Si((0, At.oCacheGet)(e, t).sex, Ei("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
            return 2 === i[2] ? n += Be(t, !1, !0, !1, a) : i[2] && (n += Be(t, !1, !1, !1, a)), n
        }

        function Be(e, t, i, a, r) {
            var n = {
                mid: e
            };
            a && (n.was = 1), t ? n.forcetoup = !0 : n.forcetodown = !0, i && (n.vk_mobile = 1), n = Object.assign(n, r);
            var o = Object.keys(n).map(function(e) {
                    return e + ": " + n[e]
                }).join(", "),
                s = i ? "" : 'onclick="mobilePromo();"',
                c = i ? " vk_mobile" : "";
            return Fi("im_wrap_mobile", {
                "class": "im_status_mob_onl" + c,
                params: o,
                attrs: s
            })
        }

        function He(e, t) {
            var i = t.get().tabs[e];
            return Di("al_settings.php", {
                act: "blacklist_box",
                q: i.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function je(e, t) {
            return Di("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function qe(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function ze(e, t, i, a) {
            var r = void 0,
                n = Hi("al_im.php", {
                    act: "a_important",
                    offset: "0"
                }, {
                    onDone: function(a, n) {
                        n && (r = i(a, e, t, n))
                    },
                    params: {
                        width: 638,
                        onHide: function() {
                            Ui.loaded && Ui.detachPlayer(!0)
                        },
                        onDestroy: function() {
                            r && r.unmount()
                        }
                    }
                }, a);
            nt(n, e)
        }

        function Ue() {
            var e = document.activeElement;
            return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
        }

        function We(e, t, i) {
            var a = gi("_im_mess_" + e, i);
            return a && yi(a, "im-mess_fav", t), i
        }

        function Ge(e, t, i) {
            var a = gi("_im_unread_bar_row", t);
            if (!a) return t;
            var r = pi(a, "._im_mess_stack", -1),
                n = pi(a, "._im_mess_stack"),
                o = r ? _i("_im_mess", r).pop() : null,
                s = n ? gi("_im_mess", n) : null;
            if (ai(a), g(t), !s || !o) return t;
            var c = mi(s, "msgid"),
                u = (0, wt.getPreviousMessage)(e, i, c),
                l = (0, wt.getMessage)(e, i, c);
            if (!u || P(e.tabs[i], u, l, e)) return t;
            var d = gi("_im_stack_messages", r),
                f = gi("_im_stack_messages", n).children;
            return (0, Lt.toArray)(f).forEach(function(e) {
                ai(e), d.appendChild(e)
            }), ai(n), t
        }

        function Ve(e, t, i) {
            var a = (0, wt.getFirstUnread)(e, e.get().peer);
            if (!a) return [!1, 0];
            var r = gi("_im_mess_" + a, t);
            if (!r) {
                var n = (0, wt.getLastMessage)(e, e.get().peer, a);
                if (!n) return [!0, 0];
                r = gi("_im_mess_" + n.messageId, t)
            }
            var o = wi(r, "_im_mess_srv") ? r : vi("_im_mess_stack", r);
            if (!o) return [!0, 0];
            var s = r ? r.offsetTop : 0,
                c = o.offsetTop + s,
                u = i.contHeight();
            return c <= i.scrollTop() + i.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - c)]
        }

        function Ke(e, t, i) {
            Ki(t);
            var a = vi("_im_top_notice", i);
            Vi(a, 200, ai.pbind(a));
            var r = vi("_im_page_dialogs", a);
            r && wi(r, "im-page--dialogs-notice") && Ci(r, "im-page--dialogs-notice"), Pi.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function Ye(e, t, i) {
            Ki(t);
            var a = vi("_im_aside_notice", i);
            Gi(a, 200, ai.pbind(a)), Pi.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function Qe(e, t) {
            Ki(e);
            var i = vi("_im_aside_promo_block", t);
            Gi(i, 200, ai.pbind(i)), Pi.post("al_im.php", {
                act: "a_hide_promo_block",
                type: i.getAttribute("data-type"),
                hash: i.getAttribute("data-hash")
            })
        }

        function $e(e, t) {
            var i = vi("_im_aside_promo_block", t);
            i.classList.add("--action-called"), Pi.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: mi(t, "hash"),
                platform: mi(t, "platform")
            })
        }

        function Xe(e, t, i, a, r) {
            return i = i.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), i = (0, xt.replaceMentions)(i, function(e, t, i, a, r) {
                return r
            }), a && (i = Wi.emojiToHTML(i, !0)), t && "..." !== t.trim() && !I(e) && (i = Fi("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + i), !i && r.length > 0 && (i = Fi("im_dialog_media", {
                name: Je(r[0], r)
            })), i
        }

        function Je(e, t) {
            var i = {
                photo: Ei("mail_added_photos", "raw"),
                video: Ei("mail_added_videos", "raw"),
                audio: Ei("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                    return Ii(e.object.fwd_count, Ei("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var a = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return Ii(a, i[e.type], !0);
                case "audio_playlist":
                    return Ei("mail_added_audio_playlist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return Ei("mail_added_graffiti");
                        case "audiomsg":
                            return Ei("mail_added_audiomsg");
                        default:
                            return Ei("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return Ei("mail_added_geo");
                case "wall":
                    return Ei("mail_added_wall");
                case "wall_reply":
                    return Ei("mail_added_wall_reply");
                case "gift":
                    return Ei("mail_added_gift");
                case "link":
                case "share":
                    return Ei("mail_added_link");
                case "sticker":
                    return Ei("mail_added_sticker");
                case "market":
                    return Ei("mail_added_market_item");
                case "money_transfer":
                    return Ei("mail_added_money_transfer");
                case "money_request":
                    return Ei("mail_added_money_request");
                case "story":
                    return Ei("mail_added_story");
                case "mask":
                    return Ei("mail_added_mask");
                case "article":
                    return Ei("mail_added_article");
                default:
                    return Ei("mail_added_" + e.type)
            }
            return ""
        }

        function Ze(e) {
            bi(e, "im-send-btn_loading")
        }

        function et(e) {
            Ci(e, "im-send-btn_loading")
        }

        function tt(e) {
            var t = e.get(),
                i = (0, wt.getPinnedMessage)(e);
            if (!i || !(0, Ot.isPinnedMessageVisibleInTab)(e, (0, wt.getPeer)(e))) return "";
            var a = (0, At.oCacheGet)(e, i.userId);
            if (!a) return "";
            var r = it(e, i);
            r || (r = i.text, r = !r && i.attaches.length ? Fi("im_pinned_message_media", {
                text: Je(i.attaches[0], i.attaches)
            }) : B(e, r, i && i.kludges || {}) || ""), r = r.replace(/<br\s?\/?>/gi, " ");
            var n = Fi("im_pinned_message", {
                date: Ai(i.date, t.timeshift),
                content: r,
                link: a.link,
                name: a.name
            });
            return n
        }

        function it(e, t) {
            var i = "";
            if (t && (0, St.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var a = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (a = Ei("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var r = Ii(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        n = Ii(t.kludges.attach1_total_amount / 1e3, a, !0);
                    i = Ei("mail_money_request_collected_amount_from").replace("{amount}", r).replace("{total_amount}", n)
                } else {
                    var o = Ii(t.kludges.attach1_tr_amount / 1e3, a, !0);
                    i = Ei("mail_money_request_collected_amount").replace("{amount}", o)
                }
                if (si(t.kludges.attach1_held_amount)) {
                    var s = Ii(t.kludges.attach1_held_amount / 1e3, a, !0);
                    i += " " + Ei("mail_money_request_held_amount").replace("{amount}", s)
                }
                t.text && (i += '<span class="divider"></span>' + B(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (i += Fi("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return i
        }

        function at(e, t, i) {
            var a = +i.getAttribute("data-time");
            a && ji(i, {
                text: Ei("mail_message_edited") + " " + Ai(a, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function rt() {
            var e = getSize(gi(Jt))[1];
            return e || (e = Ji), e
        }

        function nt(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                wi(e.target, "_im_edit_time") && at(t, e, e.target)
            })
        }

        function ot(e, t, i, a, r) {
            var n = e.get(),
                o = void 0,
                s = Hi("al_im.php", {
                    act: "a_get_pinned_message_box",
                    chat: i,
                    hash: n.tabs[i].hash
                }, {
                    onDone: function(i, r) {
                        r && (o = a(i, e, t, r))
                    },
                    params: {
                        width: 638,
                        onHide: function() {
                            Ui.loaded && Ui.detachPlayer(!0)
                        },
                        onDestroy: function() {
                            o && o.unmount()
                        }
                    }
                }, r);
            nt(s, e)
        }

        function st(e, t) {
            return I(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
        }

        function ct(e) {
            return !I(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function ut(e, t) {
            var i = (0, At.oCacheGet)(e, t.peerId),
                a = (0, wt.getTab)(e, t.peerId) || {};
            return i && (t.photo = t.photo || i.photo, t.name = t.name || i.name, t.href = t.link || i.link, t.sex = t.sex || i.sex), t.last_touched = a.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, I(t.peerId) && (t.memberIds = t.memberIds || a.memberIds || null), t
        }

        function lt(e, t) {
            for (var i in t) t.hasOwnProperty(i) && ut(e, t[i])
        }

        function dt(e, t) {
            var i = [],
                a = t.find(function(e) {
                    return "mail" === e[0]
                }),
                r = a ? a[1].split(";") : [];
            for (r.length > $i && (a[1] = r.slice(0, $i).join(";")); e.length > Qi;) {
                var n = e.substr(0, Qi).lastIndexOf(" "); - 1 == n && (n = Qi), i.push({
                    msgText: ci(e.substr(0, n))
                }), e = ci(e.substr(n))
            }
            for (e.length && i.push({
                    msgText: e,
                    attaches: t
                }), i.length || i.push({
                    attaches: t
                }), r = r.slice($i); r.length; r = r.slice($i)) i.push({
                attaches: [
                    ["mail", r.slice(0, $i).join(";")]
                ]
            });
            return i
        }

        function ft(e) {
            return e.length > Qi
        }

        function ht(e, t, i) {
            var a = !1;
            Di("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide: function() {
                        e.set(i), a && a.unmount()
                    }
                },
                onFail: function(e) {
                    return setTimeout(function() {
                        return Bi(Ei("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, i) {
                    a = (0, It.mount)(t.bodyNode, e)
                }
            }, {})
        }

        function pt() {
            Bi(Ei("global_error"), Ei("mail_message_wait_until_uploaded"))
        }

        function mt(e, t) {
            var i = (0, wt.getTab)(e, t.peerId) || {};
            if (!t || !(0, St.isOut)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (d(e, t.peerId, t.messageId)) return !1;
            if (I(t.peerId)) {
                if (i.data.kicked || i.data.closed) return !1
            } else if (i.block_error > 0) return !1;
            return !0
        }

        function _t(e, t) {
            var i = (0, wt.getTab)(e, t),
                a = -1 !== i.memberIds.indexOf(i.ownerId),
                r = 5,
                n = a ? [i.ownerId] : [];
            return n = n.concat(i.memberIds.filter(function(t) {
                return t !== i.ownerId && (0, At.oCacheExists)(e, t)
            }).slice(0, a ? r - 1 : r)), n.map(function(t) {
                return (0, At.oCacheGet)(e, t)
            })
        }

        function gt(e, t) {
            return t.map(function(t) {
                return (0, At.oCacheGet)(e, t)
            })
        }

        function vt(e, t) {
            var i = (0, wt.getTab)(e, t);
            return i.memberIds.reduce(function(t, i) {
                var a = (0, At.oCacheGet)(e, i);
                return t[a.id] = a, t
            }, {})
        }

        function bt(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var i = 1,
                a = 60,
                r = 3600,
                n = 86400,
                o = 604800,
                s = 2592e3,
                c = 31536e3,
                u = [
                    [c, t ? Ei("global_years_accusative", "raw") : Ei("global_age_years", "raw")],
                    [s, t ? Ei("global_months_accusative", "raw") : Ei("global_age_months", "raw")],
                    [o, t ? Ei("global_weeks_accusative", "raw") : Ei("global_age_weeks", "raw")],
                    [n, t ? Ei("global_days_accusative", "raw") : Ei("global_age_days", "raw")],
                    [r, t ? Ei("global_hours_accusative", "raw") : Ei("global_hours", "raw")],
                    [a, t ? Ei("global_minutes_accusative", "raw") : Ei("global_minutes", "raw")],
                    [i, t ? Ei("global_seconds_accusative", "raw") : Ei("global_age_seconds", "raw")]
                ],
                l = e,
                d = [],
                f = void 0;
            if (u.forEach(function(e) {
                    var t = Ct(e, 2),
                        i = t[0],
                        a = t[1],
                        r = Math.floor(l / i);
                    l %= i, r >= 1 && d.push(Ii(r, a))
                }), f = d.length, 1 === f) return d.pop();
            var h = d.slice(0, f - 1).join(", "),
                p = d.pop();
            return Ei("global_and").replace(/{before}/gi, h).replace(/{after}/gi, p)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PINNED_CONTAINER_CLASS = t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.INSTALL_VKADMIN_LINK = t.HIDE_ASIDE_PROMO_BLOCK_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
        var Ct = function() {
                function e(e, t) {
                    var i = [],
                        a = !0,
                        r = !1,
                        n = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                    } catch (c) {
                        r = !0, n = c
                    } finally {
                        try {
                            !a && s["return"] && s["return"]()
                        } finally {
                            if (r) throw n
                        }
                    }
                    return i
                }
                return function(t, i) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            wt = i(190);
        Object.keys(wt).forEach(function(e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return wt[e]
                }
            })
        }), t.getClassicChatHeight = n, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.applyInnerHtml = c, t.compensateHistoryHeightChange = u, t.renderSticker = l, t.isAlreadyDeleted = d, t.replaceMessageAttrs = f, t.isVoiceMessageAvailable = h, t.getAvailableMicrophones = p, t.renderAttach = m, t.dayFromVal = _, t.showInvisibleBar = g, t.editAndReplaceMessage = v, t.renderMessage = b, t.renderMessageMedia = C, t.ensureDomHasActions = y, t.appendToHistory = w, t.restoreQueue = k, t.markMessagesAsRead = T, t.replaceAttaches = F, t.isDuplicate = E, t.isReservedPeer = S, t.isUserPeer = x, t.isChatPeer = I, t.isPeerActive = A, t.isTabLoaded = O, t.isTabLoadedWithMessage = M, t.parseMessage = B, t.convertPeerToUrl = H, t.unUrlPeer = j, t.simplifyCounter = q, t.chatActions = z, t.renderPhotos = G, t.renderPhotosFromTab = V, t.renderBtnSearchOnlyMessages = K, t.renderMessagesSep = Y, t.renderConversationsSep = Q, t.renderPopularSuggSep = $, t.renderClearRecent = X, t.renderPopularSuggestions = J, t.setMessageError = Z, t.startResendMessage = ee, t.removeMessages = te, t.removeMessagesWithRestore = ae, t.restoreMessage = re, t.formatTyper = ne, t.renderEmptySearch = ce, t.isServiceMsg = ue, t.serviceLink = le, t.renderServiceMsg = de, t.addChatPhotoToUpdate = fe, t.replaceSpecialSymbols = he, t.isSelfMessage = pe, t.showVerifiedTooltip = me, t.wrapLoading = _e, t.tabFromIds = ge, t.checkSelectClick = ve, t.renderGoTo = Ce, t.showFlushDialog = ye, t.showUnpinDialog = we, t.showMsgDeleteDialog = ke, t.cleanHistory = Ne, t.showChatMembers = Te, t.inviteUser = Fe, t.showUnreadOnly = Ee, t.changeTab = Se, t.isImportant = xe, t.isUnrespond = Ie, t.isPeerBlocked = Le, t.isPendingForward = Ae, t.isPeerBlockedByMe = Oe, t.blockLatencyCompensation = Me, t.showSpamLayer = Re, t.getLastSeenTextInHeader = Pe, t.getLastSeenText = De, t.showBlacklistBoxUser = He, t.showBlacklistBox = je, t.getBaseLink = qe, t.showFavvedBox = ze, t.isEditableFocused = Ue, t.updateStar = We, t.removewNewUnreadBarAndMerge = Ge, t.isMessagesVisible = Ve, t.hideTopNotice = Ke, t.hideAsideNotice = Ye, t.hideAsidePromoBlock = Qe, t.installVKAdminApp = $e, t.renderShortText = Xe, t.attachToText = Je, t.lockButton = Ze, t.unlockButton = et, t.renderPinnedMessage = tt, t.renderPinnedMedia = it, t.showEditTimeTooltip = at, t.getPinnedMessageHeight = rt, t.boxHandleEditTimeTooltips = nt, t.showPinnedBox = ot, t.isUserAliveInChat = st, t.getAliveMembersCount = ct, t.normalizeTab = ut, t.normalizeTabsGotFromServer = lt, t.splitMessageToParts = dt, t.isMessageTooLong = ft, t.showInvitationBox = ht, t.showWaitUntilUploadedBox = pt, t.canMessageBeDeletedForAll = mt, t.getTopChatMembers = _t, t.getChatMembersByIds = gt, t.getChatMembers = vt, t.formatTimespan = bt;
        var kt = i(124),
            Nt = a(kt),
            Tt = i(81),
            Ft = a(Tt),
            Et = i(42),
            St = i(126),
            xt = i(174),
            It = i(25),
            Lt = i(65),
            At = i(86),
            Ot = i(195),
            Mt = i(127),
            Rt = i(175),
            Pt = i(128),
            Dt = t.SENDING_CLASS = "_im_mess_sending",
            Bt = t.FAILED_CLASS = "_im_mess_failed",
            Ht = t.ORIGINAL_CLASS = "_im_mess_original",
            jt = t.RESTORE_CLASS = "_im_mess_restore",
            qt = (t.TYPING_CLASS = "_im_typing",
                t.CREATE_CHAT_ACTION = "chat_create"),
            zt = t.CHAT_TITLE_ACTION = "chat_title_update",
            Ut = t.CHAT_INVITE_USER = "chat_invite_user",
            Wt = t.CHAT_KICK_USER = "chat_kick_user",
            Gt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
            Vt = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
            Kt = t.CHAT_PIN_MESSAGE = "chat_pin_message",
            Yt = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
            Qt = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
            $t = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.HIDE_ASIDE_PROMO_BLOCK_CLASS = "_im_aside_promo_block_hide", t.INSTALL_VKADMIN_LINK = "_im_vkadmin_promo_link", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
            Xt = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
            Jt = t.PINNED_CONTAINER_CLASS = "_im_pinned",
            Zt = window,
            ei = Zt.vk,
            ti = Zt.ls,
            ii = Zt.se,
            ai = Zt.re,
            ri = Zt.rs,
            ni = Zt.sech,
            oi = Zt.inArray,
            si = Zt.intval,
            ci = Zt.trim,
            ui = Zt.stripHTML,
            li = Zt.domFC,
            di = Zt.domPS,
            fi = Zt.domLC,
            hi = Zt.domChildren,
            pi = Zt.domClosestSibling,
            mi = Zt.domData,
            _i = Zt.geByClass,
            gi = Zt.geByClass1,
            vi = Zt.gpeByClass,
            bi = Zt.addClass,
            Ci = Zt.removeClass,
            yi = Zt.toggleClass,
            wi = Zt.hasClass,
            ki = Zt.attr,
            Ni = Zt.setStyle,
            Ti = Zt.val,
            Fi = Zt.getTemplate,
            Ei = Zt.getLang,
            Si = Zt.langSex,
            xi = Zt.langDate,
            Ii = Zt.langNumeric,
            Li = Zt.getDateText,
            Ai = Zt.getSmDate,
            Oi = Zt.getShortDate,
            Mi = Zt.isSameDate,
            Ri = Zt.isToday,
            Pi = Zt.ajax,
            Di = Zt.showBox,
            Bi = Zt.showFastBox,
            Hi = Zt.showTabbedBox,
            ji = Zt.showTooltip,
            qi = Zt.mobPlatforms,
            zi = Zt.onlinePlatformClass,
            Ui = Zt.AudioMessagePlayer,
            Wi = Zt.Emoji,
            Gi = Zt.slideUp,
            Vi = Zt.fadeOut,
            Ki = Zt.cancelEvent,
            Yi = Zt.ny2018ReplaceText,
            Qi = 4096,
            $i = 100,
            Xi = 8,
            Ji = 52,
            Zi = "chatPosition"
    },
    20: function(e, t, i) {
        "use strict";

        function a(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        }

        function r(e, t) {
            return t = a(t) || document, t.getElementsByTagName(e)
        }

        function n(e, t) {
            return t = a(t) || document, t.querySelector && t.querySelector(e) || r(e, t)[0]
        }

        function o(e, t, i) {
            t = a(t) || document, i = i || "*";
            var n = [];
            if (t.querySelectorAll && "*" != i) return t.querySelectorAll(i + "." + e);
            if (t.getElementsByClassName) {
                var o = t.getElementsByClassName(e);
                if ("*" != i) {
                    i = i.toUpperCase();
                    for (var s = 0, c = o.length; c > s; ++s) o[s].tagName.toUpperCase() == i && n.push(o[s])
                } else n = Array.prototype.slice.call(o);
                return n
            }
            for (var u = r(i, t), l = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, c = u.length; c > s; ++s) l.test(u[s].className) && n.push(u[s]);
            return n
        }

        function s(e, t, i) {
            return t = a(t) || document, i = i || "*", t.querySelector && t.querySelector(i + "." + e) || o(e, t, i)[0]
        }

        function c(e, t, i) {
            if (t = a(t), !t) return null;
            for (; i !== t && (t = t.parentNode);)
                if (ee(t, e)) return t;
            return null
        }

        function u(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function l(e, t) {
            return (t || document).querySelector(e)
        }

        function d(e, t) {
            return ee(t, e) ? t : c(e, t)
        }

        function f(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : h(e, t)
        }

        function h(e, t) {
            if (t = a(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function p(e, t, i) {
            var a = document.createElement(e);
            return t && extend(a, t), i && ue(a, i), a
        }

        function m(e) {
            return e = a(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function _(e) {
            return N(p("div", {
                innerHTML: e
            }))
        }

        function g(e) {
            return E(p("div", {
                innerHTML: e
            }))
        }

        function v(e, t) {
            return each(t, function(t, i) {
                e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof i ? "" : i).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function b(e) {
            return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
        }

        function C(e, t) {
            return isString(t) && (t = _(t)), F(e).replaceChild(t, e), t
        }

        function y(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }

        function w(e) {
            return y((e || {}).nextSibling)
        }

        function k(e) {
            return y((e || {}).previousSibling, 1)
        }

        function N(e) {
            return y((e || {}).firstChild)
        }

        function T(e) {
            return y((e || {}).lastChild, 1)
        }

        function F(e) {
            return (e || {}).parentNode
        }

        function E(e) {
            for (var t = [], i = e.childNodes, a = 0; a < i.length; a++) i[a].tagName && t.push(i[a]);
            return t
        }

        function S(e, t) {
            var i = F(t);
            return i && i.insertBefore(e, t)
        }

        function x(e, t) {
            var i = F(t);
            return i && i.insertBefore(e, w(t))
        }

        function I(e, t) {
            return e ? s(t, e) : e
        }

        function L(e, t, i) {
            return e ? "undefined" != typeof i ? (null === i ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, i), i) : e.getAttribute("data-" + t) : null
        }

        function A(e) {
            for (var t = 0; null != (e = k(e));) t++;
            return t
        }

        function O(e, t) {
            do e = F(e); while (e && !R(e, t));
            return e
        }

        function M(e, t, i) {
            for (var a = null; null === a && e;) e = -1 === i ? k(e) : w(e), e && R(e, t) && (a = e);
            return a
        }

        function R(e, t) {
            if (e = a(e), !e || e == document) return !1;
            var i = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
                for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), i = t.length; --i >= 0 && t[i] !== this;);
                return i > -1
            };
            return i.call(e, t)
        }

        function P(e) {
            return R(e, ":hover")
        }

        function D(e, t) {
            var i = a(e);
            if (t = a(t), !e || !t) return !1;
            for (; i = i.parentNode;)
                if (i == t) return !0;
            return !1
        }

        function B() {
            var e = browser.msie6 ? a("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function H(e, t) {
            t = t || {};
            for (var i = t.fromEl || F(e), a = t.positions || ["relative", "absolute", "fixed"]; i && i != bodyNode;) {
                var r = ce(i, "position");
                if (inArray(r, a) && (!t.noOverflow || "hidden" != ce(i, "overflow"))) break;
                i = F(i)
            }
            return i
        }

        function j(e, t) {
            e = a(e);
            for (var i, r, n, o, s = e; s && s.tagName && s !== bodyNode && (i = ce(s, "position"), r = ce(s, "overflow"), n = ce(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === r || ("static" === i ? o && "relative" !== o : "fixed" === o));) "none" !== n ? o = void 0 : "static" !== i && "fixed" !== o && (o = i), s = F(s);
            return s
        }

        function q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var i = 0; t > i; i++) q(arguments[i]);
            else if (e = a(e), e && e.style) {
                var r = e.olddisplay,
                    n = "block",
                    o = e.tagName.toLowerCase();
                e.style.display = r || "", "none" === ce(e, "display") && (n = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = n)
            }
        }

        function z(e) {
            var t = arguments.length;
            if (t > 1)
                for (var i = 0; t > i; i++) z(arguments[i]);
            else if (e = a(e), e && e.style) {
                var r = ce(e, "display");
                e.olddisplay = "none" != r ? r : "", e.style.display = "none"
            }
        }

        function U(e) {
            return e = a(e), e && e.style ? "none" != ce(e, "display") : !1
        }

        function W() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function G(e, t, i) {
            e = a(e), i = i || 0;
            var r = Q(e)[1],
                n = X(e)[1],
                o = window,
                s = document.documentElement,
                c = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
                u = a("page_header_cont"),
                l = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, X(u)[1] - l) : X(u)[1];
            if (t) {
                if (l + d + i > r + n) return r + n - l - d - i;
                if (r > l + c - i) return r - l - c + i
            } else {
                if (l + d + i > r) return r - l - d - i;
                if (r + n > l + c - i) return r + n - l - c + i
            }
            return 0
        }

        function V(e, t) {
            return void 0 === t && (t = !U(e)), t ? q(e) : z(e), t
        }

        function K(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function Y(e, t) {
            var i;
            if (t && "inline" == ce(e, "display")) {
                var a = e.getClientRects();
                i = a && a[0] || e.getBoundingClientRect()
            } else i = e.getBoundingClientRect();
            return i
        }

        function Q(e, t) {
            if (e = a(e), !e) return [0, 0];
            var i, r, n = {
                    top: 0,
                    left: 0
                },
                o = e.ownerDocument;
            return o ? (i = o.documentElement, K(e) && (n = Y(e, !0)), r = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [n.left + (t ? 0 : r.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : r.pageYOffset || i.scrollTop) - (i.clientTop || 0)]) : [0, 0]
        }

        function $(e) {
            return null != e && e === e.window
        }

        function X(e, t, i) {
            e = a(e);
            var r, n = [0, 0],
                o = document.documentElement;
            if (t && "border-box" === ce(e, "boxSizing") && (t = !1), e == document) n = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var s = function() {
                    n = K(e) && (r = Y(e, i)) && void 0 !== r.width ? [r.width, r.height] : [e.offsetWidth, e.offsetHeight], t && each(n, function(t, i) {
                        var a = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(a, function() {
                            n[t] -= parseFloat(ce(e, "padding" + this)) || 0, n[t] -= parseFloat(ce(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (U(e)) s();
                else {
                    var c = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        u = {},
                        l = !1;
                    e.style.cssText.indexOf("!important") > -1 && (l = e.style.cssText), each(c, function(t, i) {
                        u[t] = e.style[t], e.style[t] = i
                    }), s(), each(c, function(t, i) {
                        e.style[t] = u[t]
                    }), l && (e.style.cssText = l)
                }
            }
            return n
        }

        function J(e) {
            return X(e)[0]
        }

        function Z(e) {
            return X(e)[1]
        }

        function ee(e, t) {
            return e = a(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
        }

        function te(e, t) {
            (e = a(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
        }

        function ie(e, t) {
            return setTimeout(te.pbind(e, t), 0)
        }

        function ae(e, t) {
            (e = a(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }

        function re(e, t) {
            return setTimeout(ae.pbind(e, t), 0)
        }

        function ne(e, t, i) {
            return void 0 === i && (i = !ee(e, t)), (i ? te : ae)(e, t), i
        }

        function oe(e, t, i) {
            return void 0 === i && (i = !ee(e, t)), (i ? ie : re)(e, t), i
        }

        function se(e, t, i) {
            ae(e, t), te(e, i)
        }

        function ce(e, t, i) {
            if (e = a(e), isArray(t)) {
                var r = {};
                return each(t, function(t, i) {
                    r[i] = ce(e, i)
                }), r
            }
            if (!e) return "";
            if (void 0 === i && (i = !0), !i && "opacity" == t && browser.msie) {
                var n = e.style.filter;
                return n ? n.indexOf("opacity=") >= 0 ? parseFloat(n.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!i && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var o, s = document.defaultView || window;
            if (s.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var c = s.getComputedStyle(e, null);
                c && (o = c.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" == t && browser.msie) {
                    var n = e.currentStyle.filter;
                    return n && n.indexOf("opacity=") >= 0 ? parseFloat(n.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var u = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                o = e.currentStyle[t] || e.currentStyle[u], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, i) {
                    if (!/^\d+(px)?$/i.test(i) && /^\d/.test(i)) {
                        var a = e.style,
                            r = a.left,
                            n = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, a.left = i || 0, o[t] = a.pixelLeft + "px", a.left = r, e.runtimeStyle.left = n
                    }
                }), o = o.join(" ")
            }
            if (i && ("width" == t || "height" == t)) {
                var l = X(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                o = (intval(o) ? Math.max(floatval(o), l) : l) + "px"
            }
            return o
        }

        function ue(e, t, i) {
            if (e = a(e)) {
                if ("object" == ("undefined" == typeof t ? "undefined" : Ne(t))) return each(t, function(t, i) {
                    ue(e, t, i)
                });
                if ("opacity" == t) browser.msie && ((i + "").length ? 1 !== i ? e.style.filter = "alpha(opacity=" + 100 * i + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== i && (e.style.opacity = i);
                else try {
                    var r = "number" == typeof i;
                    r && /height|width/i.test(t) && (i = Math.abs(i)), i = r && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? i + "px" : i, e.style[t] !== i && (e.style[t] = i)
                } catch (n) {
                    debugLog("setStyle error: ", [t, i], n)
                }
            }
        }

        function le(e, t, i) {
            setTimeout(ue.pbind(e, t, i), 0)
        }

        function de(e, t, i) {
            var r = fe(e, "pseudo-id");
            r || (fe(e, "pseudo-id", r = irand(1e8, 999999999)), te(e, "_pseudo_" + r));
            var n = t + "-style-" + r,
                o = a(n),
                s = "._pseudo_" + r + ":" + t + "{";
            o || (o = headNode.appendChild(p("style", {
                id: n,
                type: "text/css"
            }))), each(i, function(e, t) {
                s += e + ": " + t + " !important;"
            }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
        }

        function fe(e, t, i) {
            if (!e) return !1;
            var a, r = e[vkExpand];
            return r || (r = e[vkExpand] = ++vkUUID), i !== a && (vkCache[r] || (vkCache[r] = {}, __debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = i), t ? vkCache[r] && vkCache[r][t] : r
        }

        function he(e, t, i) {
            return e = a(e), "undefined" == typeof i ? e.getAttribute(t) : (e.setAttribute(t, i), i)
        }

        function pe(e) {
            for (var t = 0, i = arguments.length; i > t; ++t) {
                var a = arguments[t];
                if (void 0 !== e[a]) try {
                    delete e[a]
                } catch (r) {
                    try {
                        e.removeAttribute(a)
                    } catch (r) {}
                }
            }
        }

        function me(e, t) {
            var i = e ? e[vkExpand] : !1;
            if (i)
                if (t) {
                    if (vkCache[i]) {
                        delete vkCache[i][t], t = "";
                        var a = 0;
                        for (t in vkCache[i])
                            if ("__elem" !== t) {
                                a++;
                                break
                            }
                        a || me(e)
                    }
                } else removeEvent(e), pe(e, vkExpand), delete vkCache[i]
        }

        function _e() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var i = a(e[t]);
                i && (me(i), pe(i, "btnevents"))
            }
        }

        function ge(e, t, i) {
            if (e = a(e), e && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", i || e.innerText || e.textContent);
                else {
                    var r = n("b", e);
                    r && r.scrollWidth > r.clientWidth ? e.setAttribute("title", i || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function ve() {
            var e = a("zoom_test_1") || document.body.appendChild(p("div", {
                    id: "zoom_test_1"
                }, {
                    left: "10%",
                    position: "absolute",
                    visibility: "hidden"
                })),
                t = a("zoom_test_2") || document.body.appendChild(p("div", {
                    id: "zoom_test_2"
                }, {
                    left: e.offsetLeft + "px",
                    position: "absolute",
                    visibility: "hidden"
                }));
            return t.offsetLeft / e.offsetLeft
        }

        function be(e, t, i) {
            return (e = a(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !i && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !i && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
        }

        function Ce(e, t, i) {
            e = a(e);
            try {
                if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === i || i === !1) && (i = t), e.createTextRange) {
                    var r = e.createTextRange();
                    r.collapse(!0), r.moveEnd("character", i), r.moveStart("character", t), r.select()
                } else e.setSelectionRange && e.setSelectionRange(t, i)
            } catch (n) {}
        }

        function ye(e, t, i) {
            for (e = a(e), i = i || 999; e && !t(e);) {
                if (i--, 0 == i) return !1;
                try {
                    if (e = F(e), e == document) break
                } catch (r) {
                    e = !1
                }
            }
            return e
        }

        function we(e) {
            return Fe ? void 0 : window.document.title = replaceEntities(e)
        }

        function ke(e) {
            Fe = e, e && window.cur && window.cur.destroy.push(function() {
                ke(!1)
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var Ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.ge = a, t.geByTag = r, t.geByTag1 = n, t.geByClass = o, t.geByClass1 = s, t.gpeByClass = c, t.domQuery = u, t.domQuery1 = l, t.domClosest = d, t.domClosestByTag = f, t.gpeByTag = h, t.ce = p, t.re = m, t.se = _, t.sech = g, t.rs = v, t.psr = b, t.domReplaceEl = C, t.domEL = y, t.domNS = w, t.domPS = k, t.domFC = N, t.domLC = T, t.domPN = F, t.domChildren = E, t.domInsertBefore = S, t.domInsertAfter = x, t.domByClass = I, t.domData = L, t.domChildIndex = A, t.domCA = O, t.domClosestSibling = M, t.matchesSelector = R, t.isHover = P, t.isAncestor = D, t.getScroll = B, t.domClosestPositioned = H, t.domClosestOverflowHidden = j, t.show = q, t.hide = z, t.isVisible = U, t.clientHeight = W, t.getClientRectOffsetY = G, t.toggle = V, t.boundingRectEnabled = K, t.getXYRect = Y, t.getXY = Q, t.isWindow = $, t.getSize = X, t.getW = J, t.getH = Z, t.hasClass = ee, t.addClass = te, t.addClassDelayed = ie, t.removeClass = ae, t.removeClassDelayed = re, t.toggleClass = ne, t.toggleClassDelayed = oe, t.replaceClass = se, t.getStyle = ce, t.setStyle = ue, t.setStyleDelayed = le, t.setPseudoStyle = de, t.data = fe, t.attr = he, t.removeAttr = pe, t.removeData = me, t.cleanElems = _e, t.setTitle = ge, t.getZoom = ve, t.val = be, t.elfocus = Ce, t.traverseParent = ye, t.setDocumentTitle = we, t.lockDocumentTitle = ke;
        var Te = i(141);
        window.cf = function(e) {
            var t = e.createDocumentFragment(),
                i = e.createElement("div"),
                a = e.createRange && e.createRange();
            return t.appendChild(i), a && a.selectNodeContents(i), a && a.createContextualFragment ? function(t) {
                return t ? a.createContextualFragment(t) : e.createDocumentFragment()
            } : function(t) {
                if (!t) return e.createDocumentFragment();
                i.innerHTML = t;
                for (var a = e.createDocumentFragment(); i.firstChild;) a.appendChild(i.firstChild);
                return a
            }
        }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var i in t)
                    if (void 0 !== e.style[t[i] + "Transform"]) return t[i] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + (0, Te.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Fe = !1;
        window.ge = a, window.geByTag = r, window.geByTag1 = n, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = c, window.domQuery = u, window.domQuery1 = l, window.domClosest = d, window.ce = p, window.re = m, window.se = _, window.sech = g, window.rs = v, window.psr = b, window.domReplaceEl = C, window.domEL = y, window.domNS = w, window.domPS = k, window.domFC = N, window.domLC = T, window.domPN = F, window.domChildren = E, window.domInsertBefore = S, window.domInsertAfter = x, window.domByClass = I, window.domData = L, window.domChildIndex = A, window.domCA = O, window.domClosestSibling = M, window.matchesSelector = R, window.isHover = P, window.isAncestor = D, window.getScroll = B, window.domClosestPositioned = H, window.domClosestOverflowHidden = j, window.show = q, window.hide = z, window.isVisible = U, window.clientHeight = W, window.getClientRectOffsetY = G, window.toggle = V, window.boundingRectEnabled = K, window.getXYRect = Y, window.getXY = Q, window.isWindow = $, window.getSize = X, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ie, window.removeClass = ae, window.removeClassDelayed = re, window.toggleClass = ne, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = ce, window.setStyle = ue, window.setStyleDelayed = le, window.setPseudoStyle = de, window.data = fe, window.attr = he, window.removeAttr = pe, window.removeData = me, window.cleanElems = _e, window.setTitle = ge, window.getZoom = ve, window.val = be, window.elfocus = Ce, window.traverseParent = ye, window.getH = Z, window.getW = J, window.domClosestByTag = f, window.setDocumentTitle = we, window.lockDocumentTitle = ke
    },
    24: function(e, t, i) {
        "use strict";

        function a(e) {
            this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }
        extend(a.prototype, EventEmitter.prototype), extend(a.prototype, {
            stop: function() {
                this.started = !1, removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), removeEvent(this.opts.focusElement, "focus", this.cbActiveB), removeEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            activate: function() {
                this.is_idle = !1, this.is_activated = !0
            },
            start: function() {
                this.started = !0, browser.mobile || (this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), addEvent(this.opts.focusElement, "focus", this.cbActiveB), addEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime: function() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            }
        }), window.IdleManager = a
    },
    25: function(e, t, i) {
        "use strict";

        function a(e, t) {
            var i = domData(t, "chat-id"),
                a = domData(t, "hash");
            return lockButton(t), (0, o.joinChat)(i, a, e.get()).then(function(i) {
                var a = n(i, 1),
                    r = a[0];
                unlockButton(t), e.get().longpoll.push([(0, c.changePeer)(r)])
            })["catch"](function(e) {
                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
            })
        }

        function r(e, t) {
            var i = (0, s.createModule)({
                handlers: function(i, r) {
                    r(e, "click", u, function(e) {
                        return a(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    (0, s.destroyModule)(i)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.mount = r;
        var o = i(175),
            s = i(42),
            c = i(124),
            u = "_im_join_chat"
    },
    29: function(e, t, i) {
        "use strict";

        function a() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                i = sbWidth();
            return (lastWndScroll[0] !== !1 ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= i + (i ? 1 : 0)), [t, e]
        }

        function r() {
            var e = window,
                t = !1;
            t = e.boxLayerWrap && isVisible(boxLayerWrap) ? boxLayerWrap.scrollHeight > boxLayerWrap.clientHeight ? 1 : 0 : e.layerWrap && isVisible(layerWrap) ? layerWrap.scrollHeight > layerWrap.clientHeight ? 1 : 0 : e.mvLayerWrap && isVisible(mvLayerWrap) ? mvLayerWrap.scrollHeight > mvLayerWrap.clientHeight ? 1 : 0 : !1, each(curRBox.tabs, function(e) {
                this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
                })
            }), t !== lastWndScroll[0] && (lastWndScroll[0] = t, each(curRBox.tabs, function(e) {
                this.toRight && !this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: t ? sbWidth() : 0
                })
            }))
        }

        function n(e, t) {
            var i = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
                a = void 0;
            a = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var r = se(rs(i, {
                title: e.title,
                content: a
            }));
            a = geByClass1("fc_content", r, "div");
            var n = {
                    movable: geByClass1("fc_tab_head", r),
                    hider: geByClass1("fc_tab_close_wrap", r, "a"),
                    startLeft: e.x,
                    startTop: e.y,
                    startHeight: e.height,
                    startWidth: e.width,
                    resizeableH: a,
                    resize: !1,
                    minH: e.minH,
                    onBeforeHide: e.onBeforeHide || function() {},
                    onHide: e.onHide || function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                },
                o = new RBox(r, extend(n, e)),
                s = void 0;
            return e.content && (s = new Scrollbar(a, {
                prefix: "fc_",
                more: debugLog,
                nomargin: !0,
                global: !0,
                nokeys: !0,
                right: vk.rtl ? "auto" : 0,
                left: vk.rtl ? 0 : "auto",
                onHold: e.onHold
            })), t({
                id: o.id,
                cont: a,
                update: function() {
                    s && s.update()
                }
            }), o
        }
        i(24), i(9), i(32), i(121), i(186), i(109), i(13), window.getWndInner = a, window.lastWndScroll = [!1, !1], window.updateWndVScroll = r, window.defBox = n;
        try {
            stManager.done("notifier.js")
        } catch (o) {}
    },
    30: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = s({}, o.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var i = o.toStr(t);
            o.setLoc(i)
        }

        function r() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = s(e, t)
                },
                commitNav: function() {
                    a(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = s(e, t), setTimeout(function() {
                        a(e), e = {}
                    }, i)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.updateLocation = a, t.updateLazyLocation = r;
        var n = window,
            o = n.nav,
            s = n.extend
    },
    32: function(e, t, i) {
        "use strict";

        function a(e, t) {
            var i = this,
                a = {
                    minH: 50,
                    minW: 50
                };
            i.options = t = extend(a, t), i.content = e;
            var r = i.id = "rb_box_" + (t.id || curRBox.guid++);
            i.wrap = ce("div", {
                id: r,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var n = {};
            i.toBottom = i.toRight = !1, t.fixed ? (n.bottom = 0, n.right = 72) : (void 0 !== t.startTop ? n.top = t.startTop : void 0 !== t.startBottom && (n.bottom = t.startBottom), void 0 !== t.startLeft ? n.left = t.startLeft : void 0 !== t.startRight && (n.right = t.startRight)), setStyle(i.wrap, n), t.movable && addEvent(t.movable, "mousedown", i._head_mdown.bind(i)), i.resizeableH = t.resizeableH || e, t.startHeight && setStyle(i.resizeableH, "height", t.startHeight), i.resizeableW = t.resizeableW || e, t.startWidth && setStyle(i.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", i._cont_mdown.bind(i)), t.closer && (addEvent(t.closer, "mousedown", i._close_mdown.bind(i)), addEvent(t.closer, "click", i._close_click.bind(i))), t.hider && (addEvent(t.hider, "mousedown", i._close_mdown.bind(i)), addEvent(t.hider, "click", i._hide_click.bind(i))), t.minimizer && t.minimizer !== !0 && (addEvent(t.minimizer, "mousedown", i._close_mdown.bind(i)), addEvent(t.minimizer, "click", i._min_toggle.bind(i))), i.wrap.appendChild(e), t.resize !== !1 && (i.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), i.wrap.appendChild(i.resizeWrap), addEvent(i.resizeWrap, "mousedown", i._resize_mdown.bind(i))), t.minimized && (addClass(i.wrap, "rb_minimized"), i.minimized = !0), bodyNode.insertBefore(i.wrap, ge("page_wrap"));
            var o = getStyle(i.wrap, "top"),
                s = getStyle(i.wrap, "bottom"),
                c = getStyle(i.wrap, "left"),
                u = getStyle(i.wrap, "right");
            this.toBottom = ("auto" === o || "" === o || browser.msie && 0 === o) && "auto" != s && "" !== s && !(browser.msie && 0 === s), this.toRight = ("auto" === c || "" === c || browser.msie && 0 === c) && "auto" != u && "" !== u && !(browser.msie && 0 === u), this.toRight && setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(i.wrap, "rb_inactive"), this.toBottom && (setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(i.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(i.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[r] = i, i.pos = !1, t.noshow ? (setStyle(i.wrap, {
                visibility: "hidden",
                display: "block"
            }), i._update_pos(), setStyle(i.wrap, {
                visibility: "",
                display: ""
            })) : i.show(!1, t.nofocus)
        }
        window.curRBox || (window.curRBox = {
            guid: 0,
            active: !1,
            focused: [],
            tabs: {}
        });
        var r = 1e4;
        extend(a.prototype, {
            show: function(e) {
                function t(t, i) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                var i = this;
                void 0 === e && (e = 0), e ? (setStyle(i.wrap, {
                    opacity: 0,
                    display: "block"
                }), i.visible = !0, !t && i.focus(), animate(i.wrap, {
                    opacity: 1
                }, e, function() {
                    setStyle(i.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    }), i._update_pos()
                })) : (show(i.wrap), i.visible = !0, !t && i.focus(), i._update_pos()), i.options.onShow && i.options.onShow()
            }),
            hide: function(e) {
                function t(t, i, a) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t, i) {
                var a = this;
                return !t && a.options.onBeforeHide && a.options.onBeforeHide() ? !0 : (void 0 === e && (e = 0), e ? (setStyle(a.wrap, {
                    opacity: 1,
                    display: "block"
                }), animate(a.wrap, {
                    opacity: 0
                }, e, function() {
                    hide(a.wrap), setStyle(a.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    })
                })) : hide(a.wrap), a.visible = !1, void(!t && a.options.onHide && a.options.onHide(i || {})))
            }),
            _head_mdown: function(e) {
                if (!checkEvent(e)) {
                    (e.originalEvent || e).cancelBubble = !0;
                    var t, i, a = this,
                        r = e.target,
                        n = getWndInner(),
                        o = curRBox.active == a.id,
                        s = e.pageY,
                        c = e.pageX,
                        u = a.wrap.offsetHeight,
                        l = a.wrap.offsetWidth,
                        d = 0,
                        f = 0,
                        h = n[0] - u,
                        p = n[1] - l,
                        m = browser.msie ? "selectstart" : "mousedown";
                    a.options.fixed && FastChat.pinTab(a.options.peer || -1, e, !0), o || a.focus(e), a.toBottom ? (a.toBottom = !1, t = n[0] - intval(getStyle(a.wrap, "bottom")) - u, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = n[1] - intval(getStyle(a.wrap, "right")) - l, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), d = t, f = i, cur._fcdrag = 1;
                    var _ = function(e) {
                            return d = Math.max(0, Math.min(h, t + e.pageY - s)), 10 > h - d ? d = h : 10 > d && (d = 0), a.wrap.style.top = d + "px", f = Math.max(0, Math.min(p, i + e.pageX - c)), 10 > p - f ? f = p : 10 > f && (f = 0), a.wrap.style.left = f + "px", cancelEvent(e)
                        },
                        g = function v(e) {
                            cur._fcdrag = 0, removeEvent(document, "mousemove", _), removeEvent(document, "mouseup", v), removeEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(r, "cursor", ""), (a.toBottom = d >= h - 5) && (setStyle(a.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(a.wrap, "fc_tobottom")), (a.toRight = f >= p - 5) && setStyle(a.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), a._update_pos();
                            var t = Math.abs(e.pageY - s) < 3 && Math.abs(e.pageX - c) < 3;
                            cur._fcpromo > 0 ? cur._fcpromo = t ? 0 : -1 : a.options.minimizer && t ? !a.minimized && o ? a.minimize(!0) : a.minimized && a.unminimize(!0) : a.options.onDragEnd && a.options.onDragEnd(a.toBottom ? -1 : d / n[0], a.toRight ? -1 : f / n[1])
                        };
                    return addEvent(document, "mousemove", _), addEvent(document, "mouseup", g), addEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(r, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, i, a = this,
                        r = e.target,
                        n = getWndInner(),
                        o = e.pageY,
                        s = e.pageX,
                        c = a.wrap.offsetHeight,
                        u = a.wrap.offsetWidth,
                        l = 0,
                        d = 0,
                        f = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                        h = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                        p = browser.msie ? "selectstart" : "mousedown",
                        m = !browser.msie && a.options.onResize || !1;
                    a.toBottom ? (a.toBottom = !1, t = n[0] - intval(getStyle(a.wrap, "bottom")) - c, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = n[1] - intval(getStyle(a.wrap, "right")) - u, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), a.options.onResizeStart && a.options.onResizeStart(f, h);
                    var _ = f + n[0] - t - c,
                        g = h + n[1] - i - u,
                        v = function(e) {
                            return l = Math.max(a.options.minH, Math.min(_, f + e.pageY - o)), 10 > _ - l && (l = _), a.resizeableH.style.height = l + "px", d = Math.max(a.options.minW, Math.min(g, h + e.pageX - s)), 10 > g - d && (d = g), a.resizeableW.style.width = d + "px", m && m(l, d), cancelEvent(e)
                        },
                        b = function C(e) {
                            removeEvent(document, "mousemove", v), removeEvent(document, "mouseup", C), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(r, "cursor", ""), (a.toBottom = l == _) && (setStyle(a.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(a.wrap, "fc_tobottom")), (a.toRight = d == g) && setStyle(a.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), a._update_pos(), a.options.onResizeEnd && a.options.onResizeEnd(l, d, n[0], n[1], a.toBottom, a.toRight)
                        };
                    return addEvent(document, "mousemove", v), addEvent(document, "mouseup", b), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(r, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, i) {
                var a = this;
                a.toBottom && (a.pos[0] = a.wrap.offsetTop), a.toRight && (a.pos[1] = a.wrap.offsetLeft);
                var r = {},
                    n = !1,
                    o = !1,
                    s = a.pos[0] + a.pos[2] - e,
                    c = a.pos[0],
                    u = a.resizeableH.clientHeight - a.options.minH,
                    l = a.pos[1] + a.pos[3] - t,
                    d = a.pos[1],
                    f = a.options.resize !== !1 ? a.resizeableW.clientWidth - a.options.minW : 0;
                i && (0 > f && setStyle(a.resizeableW, a.options.minW), 0 > u && setStyle(a.resizeableH, a.options.minH)), (0 >= s || 0 >= c && 0 >= u) && (0 >= l || 0 >= d && 0 >= f) || (s > 0 && c > 0 && (c = Math.min(s, c), s -= c, r.top = a.pos[0] - c, r.bottom = ""), s > 0 && u > 0 && (u = Math.min(s, u), n = a.resizeableH.clientHeight - u), l > 0 && d > 0 && (d = Math.min(l, d), l -= d, r.left = a.pos[1] - d, r.right = ""), l > 0 && f > 0 && (f = Math.min(l, f), o = a.resizeableW.clientWidth - f), o !== !1 && setStyle(a.resizeableW, "width", o), n !== !1 && setStyle(a.resizeableH, "height", n), setStyle(a.wrap, r), a._update_pos(), a.options.onResize && a.options.onResize(a.resizeableH.clientHeight, a.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                var t = curRBox.active != this.id;
                return t && (this.focus(e), !hasClass(e.target, "fc_editable")) ? cancelEvent(e) : void 0
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    i = curRBox.active,
                    a = i && curRBox.tabs[i];
                if (i != e.id) {
                    a && isFunction(a.options.onBlur) && a.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var n = r + curRBox.focused.length,
                        o = !0;
                    each(curRBox.focused, function(e, t) {
                        var i = curRBox.tabs[t].wrap;
                        o ? (addClass(i, "rb_active"), removeClass(i, "rb_inactive"), curRBox.active = t, o = !1) : (removeClass(i, "rb_active"), addClass(i, "rb_inactive")), setStyle(i, "zIndex", n), n--
                    })
                }
            },
            _hide_click: function() {
                this.hide()
            },
            minimize: function(e) {
                var t = this,
                    i = t.wrap;
                return t.options.fixed ? !1 : (addClass(i, "rb_minimized"), t.minimized = !0, t._update_pos(), void(e && t.options.onMinimize && t.options.onMinimize(0)))
            },
            unminimize: function(e) {
                var t = this,
                    i = t.wrap,
                    a = getWndInner();
                removeClass(i, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(a[0], a[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
            },
            _min_toggle: function(e) {
                var t = this;
                setTimeout(function() {
                    t.minimized ? t.unminimize(!0) : t.minimize(!0)
                }, 50)
            },
            destroy: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id); - 1 != t && curRBox.focused.splice(t, 1), cleanElems(e.wrap, e.resizeWrap, e.content, e.options.movable, e.options.closer, e.options.hider), re(e.wrap), delete curRBox.tabs[e.id]
            },
            _close_mdown: function(e) {
                (e.originalEvent || e).cancelBubble = !0
            },
            _close_click: function(e) {
                this.close()
            },
            _close: function(e) {
                this.destroy(), curRBox.focused[0] && e !== !0 && curRBox.tabs[curRBox.focused[0]].focus()
            },
            focus: function(e) {
                var t = this,
                    i = curRBox.active != t.id || !0;
                return t._focus(), i && isFunction(t.options.onFocus) && t.options.onFocus(e), i
            },
            close: function() {
                var e = this,
                    t = e.pos;
                e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
            }
        }), window.RBox = a
    },
    34: function(e, t, i) {
        "use strict";

        function a(e, t) {
            return new Promise(function(i) {
                setTimeout(i.bind(null, t), 1e3 * e)
            })
        }

        function r(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = 0;
            return function n() {
                for (var o = arguments.length, s = Array(o), c = 0; o > c; c++) s[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, s)
                })["catch"](function(e) {
                    if (r++, t >= r) {
                        var o = "function" == typeof i ? i(r) : 0;
                        return 0 === o ? n.apply(void 0, s) : a(o).then(function() {
                            return n.apply(void 0, s)
                        })
                    }
                    throw e
                })
            }
        }

        function n(e, t, i) {
            var a = void 0,
                r = void 0;
            return function() {
                for (var n = arguments.length, o = Array(n), s = 0; n > s; s++) o[s] = arguments[s];
                return new Promise(function(e, n) {
                    var s = function() {
                            a = null, r = null, i || e(o)
                        },
                        c = i && !a;
                    clearTimeout(a), r && r.reject("debounce"), a = setTimeout(s, t), c ? e(o) : i && n("debounce"), r = {
                        resolve: e,
                        reject: n
                    }
                }).then(function(t) {
                    return e.apply(void 0, t)
                })
            }
        }

        function o(e, t) {
            var i = void 0,
                a = new Promise(function(a) {
                    i = a, setTimeout(a.bind(null, t), 1e3 * e)
                });
            return {
                pause: function() {
                    return a
                },
                abort: function() {
                    i(t)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.pause = a, t.retryFn = r, t.debouncedPromise = n, t.abortablePause = o
    },
    37: function(e, t, i) {
        "use strict";

        function a() {
            return b.lpConfig && b.lpConfig.enabled
        }

        function r() {
            return window.curNotifier && window.curNotifier.lp_connected
        }

        function n() {
            return window.curNotifier && window.curNotifier.is_server
        }

        function o(e, t, i) {
            window.Notifier.lcSend("lp_data", {
                tsOld: e,
                tsNow: t,
                evs: i
            }), (0, _.lpLogFc)("silver", "broadcast to others", e, t, i)
        }

        function s(e, t, i) {
            y.onLp(e, t, i), r() && n() && (e != t || i.length) && o(e, t, i)
        }

        function c() {
            b.lpConfig.id = b.id, window.lpConnect = C = (0, p.createLongPoll)(b.lpConfig, s)
        }

        function u() {
            var e = (0, m.createLongpollEventsQueue)(b.lpConfig.ts, function(e) {
                    (0, _.longpollTesting_onFcEvents)(e), t.trigger("data", e)
                }),
                t = new window.EventEmitter;
            window.lpInstance = y = {
                onData: function(e) {
                    t.on("data", e)
                },
                offData: function(e) {
                    t.off("data", e)
                },
                pause: function() {
                    e.pause()
                },
                resume: function() {
                    e.resume()
                },
                push: function(e) {
                    t.trigger("data", e)
                },
                abortWaiting: function() {
                    C.abortWaiting()
                },
                onLp: function(t, i, a) {
                    e.onLp(t, i, a)
                }
            }
        }

        function l() {
            return a() ? (y || (c(), u()), y) : null
        }

        function d() {
            a() && ((0, _.lpLogFc)("orange", "init longpoll connection on load"), l(), window.curNotifier.idle_manager.on("unidle", function() {
                C.abortWaiting()
            }), f())
        }

        function f() {
            return a() ? r() ? void(C.isStopped() && n() ? ((0, _.lpLogFc)("orange", "now master, init connection"), (0, g.imWeirdLog)("fc_longpoll_master", {}, !1), C.reinitConnection()) : C.isStopped() || n() || ((0, _.lpLogFc)("orange", "now slave, stop connection"), (0, g.imWeirdLog)("fc_longpoll_slave", {}, !1), C.stopConnection())) : void setTimeout(f, 500) : void 0
        }

        function h(e) {
            r() && !n() && a() && ((0, _.lpLogFc)("silver", "recv from master", e.tsOld, e.tsNow, e.evs), C.onLp(e.tsOld, e.tsNow, e.evs))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.lpSingleton_getInstance = l, t.lpSingleton_onTabInitialLoaded = d, t.lpSingleton_syncWithNotifier = f, t.lpSingleton_onNotifierRecv = h;
        var p = i(96),
            m = i(134),
            _ = i(138),
            g = i(128),
            v = window,
            b = v.vk,
            C = window.lpConnect,
            y = window.lpInstance
    },
    42: function(e, t, i) {
        "use strict";

        function a(e) {
            return {
                callMutations: function() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations: function() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e.apply(void 0, arguments)
                }
            }
        }

        function r(e, t, i, a) {
            l(t, i, a), e._registeredHandlers.push(["bind", t, i, a])
        }

        function n(e, t, i, a, r) {
            (0, c.addDelegateEvent)(t, i, a, r), e._registeredHandlers.push(["delegate", t, i, a, r])
        }

        function o(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(r.bind(null, t), n.bind(null, t)), t
        }

        function s(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? c.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
            }), e._registeredHandlers = []
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createMutations = a, t.createModule = o, t.destroyModule = s;
        var c = i(182),
            u = window,
            l = u.addEvent,
            d = u.removeEvent
    },
    53: function(e, t, i) {
        "use strict";

        function a(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function r(e, t, i) {
            return d(e, N, t, i)
        }

        function n(e, t, i) {
            return d(e, T, t, i)
        }

        function o(e, t, i, a) {
            var r = (0, g.unpackStore)(e),
                n = (0, g.getTab)(r, i || r.peer);
            return p(n, t) ? !1 : d(e, I, i, a)
        }

        function s(e, t, i) {
            return d(e, F, t, i)
        }

        function c(e, t, i, a) {
            var r = (0, g.unpackStore)(e),
                n = (0, g.getTab)(r, i || r.peer),
                o = d(e, E, i, a),
                s = f(n, b);
            return a = "undefined" == typeof a ? window.vk.id : a, p(n, t) ? !1 : s || p(n, a) || h(n, a) ? o : o && !h(n, t) && m(n, t)
        }

        function u(e, t, i) {
            return d(e, S, t, i)
        }

        function l(e, t, i) {
            return d(e, x, t, i)
        }

        function d(e, t, i, a) {
            var r = (0, g.unpackStore)(e);
            a = "undefined" == typeof a ? window.vk.id : a, i = "undefined" == typeof i ? r.peer : i;
            var n = (0, g.getTab)(r, i),
                o = !n.data.kicked && !n.data.closed,
                s = L[t];
            switch (t) {
                case N:
                case T:
                case I:
                    return f(n, s) ? h(n, a) && o : p(n, a);
                case F:
                case E:
                case S:
                case x:
                    return f(n, s) ? h(n, a) && o : o
            }
            return !1
        }

        function f(e, t) {
            var i = e && e.data && e.data.flags || 0;
            return (i & t) > 0
        }

        function h(e, t) {
            var i = e && e.adminIds || [];
            return i.indexOf(+t) > -1
        }

        function p(e, t) {
            return e.ownerId === t
        }

        function m(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.MAIL_CHATS_ACTION_ADD_ADMIN = t.MAIL_CHATS_ACTION_CHANGE_TITLE = t.MAIL_CHATS_ACTION_PIN_OR_UNPIN = t.MAIL_CHATS_ACTION_KICK_USER = t.MAIL_CHATS_ACTION_INVITE_USER = t.MAIL_CHATS_ACTION_CHANGE_INVITE_LINK = t.MAIL_CHATS_ACTION_SEE_INVITE_LINK = t.MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK = t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = void 0;
        var _;
        t.canSeeInviteLink = r, t.canChangeInviteLink = n, t.canAddAdmin = o, t.canInviteUser = s, t.canKickUser = c, t.canPinOrUnpin = u, t.canChangeTitle = l, t.checkChatRights = d, t.doesChatTabHaveFlag = f, t.isUserAdminInChat = h, t.isUserOwnerInChat = p, t.isUserInvitedByMe = m;
        var g = i(190),
            v = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = 1,
            b = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = 2,
            C = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = 4,
            y = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = 8,
            w = t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = 16,
            k = t.MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK = 32,
            N = t.MAIL_CHATS_ACTION_SEE_INVITE_LINK = "see_invite_link",
            T = t.MAIL_CHATS_ACTION_CHANGE_INVITE_LINK = "change_invite_link",
            F = t.MAIL_CHATS_ACTION_INVITE_USER = "invite_user",
            E = t.MAIL_CHATS_ACTION_KICK_USER = "kick_user",
            S = t.MAIL_CHATS_ACTION_PIN_OR_UNPIN = "pin_unpin",
            x = t.MAIL_CHATS_ACTION_CHANGE_TITLE = "change_title",
            I = t.MAIL_CHATS_ACTION_ADD_ADMIN = "add_admin",
            L = (_ = {}, a(_, N, k), a(_, T, k), a(_, I, w), a(_, F, v), a(_, E, b), a(_, S, C), a(_, x, y), _)
    },
    57: function(e, t, i) {
        "use strict";

        function a(e) {
            return {
                unmount: function() {
                    (0, n.destroyModule)(e)
                }
            }
        }

        function r(e, t, i) {
            var r = (0, n.createMutations)(a),
                o = r.bindMutations,
                s = (0, n.createModule)({
                    handlers: function(e, t) {}
                });
            return o(s)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.mount = r;
        var n = i(42)
    },
    65: function(e, t, i) {
        "use strict";

        function a(e, t) {
            var i = [],
                a = 0;
            return function(r) {
                i.push(r), a || (a = setTimeout(function() {
                    a = !1, e(i), i = []
                }, t))
            }
        }

        function r(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function n(e, t) {
            var i = void 0,
                a = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        i = "color: red", a = "background: red; color: white";
                        break;
                    case "success":
                        i = "color: green", a = "background: green; color: white";
                        break;
                    default:
                        i = "color: blue;", a = "background: #000; color: #fff;"
                }
                try {
                    var r = new Date;
                    console.debug("%cLP:[" + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds() + ":" + r.getMilliseconds() + "]%c " + e, a, i)
                } catch (n) {}
            }
        }

        function o(e) {
            var t = [];
            if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var i = 0; i < e.length; i++) t.push(e[i]);
            return t
        }

        function s(e) {
            for (var t = {}, i = [], a = 0; a < e.length; a++) t[e[a]] || (i.push(e[a]), t[i[a]] = 1);
            return i
        }

        function c(e) {
            for (var t = "=".repeat((4 - e.length % 4) % 4), i = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), a = window.atob(i), r = new Uint8Array(a.length), n = 0; n < a.length; ++n) r[n] = a.charCodeAt(n);
            return r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.throttleAccumulate = a, t.executionStackPop = r, t.lplog = n, t.toArray = o, t.arrayUnique = s, t.urlBase64ToUint8Array = c
    },
    81: function(e, t, i) {
        "use strict";

        function a(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r, n = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
            o = "(https?:\\/\\/)?",
            s = "((?:[" + n + "\\—\\-\\_]+\\.){1,5})",
            c = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
            u = "(?:\\:(\\d{2,5}))",
            l = "(" + s + c + u + "?)",
            d = "([\\/?#])",
            f = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
            h = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
            p = "　-〿＀-￯",
            m = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
            _ = "[" + f + m + h + p + "]",
            g = "(?:\\(|\\[)[" + n + "\\d&#%;,]+(?:\\)|\\])",
            v = "(" + d + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + _ + "+|" + g + "){0,200})?",
            b = o + l + v,
            C = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
            y = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
            w = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
            k = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
            N = t.ARROW_DOWN = 40,
            T = t.PAGE_UP = 33,
            F = t.PAGE_DOWN = 34,
            E = t.END_KEY = 35,
            S = t.HOME = 36,
            x = t.ENTER = 13,
            I = t.ESC = 27,
            L = (t.UNPRINTABLE_KEYS = [k, N, T, F, x, I, E, S], t.UP_DOWN_CONTROLS = [T, F, N, k, S, E], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
            A = t.FOLDER_ALL = "all",
            O = t.FOLDER_UNRESPOND = "unrespond",
            M = t.FOLDER_IMPORTANT = "important",
            R = (t.FOLDERS = [A, L, O, M], t.FOLDER_MASKS = (r = {}, a(r, O, 2), a(r, M, 1), r), t.TOP_DOMAINS = [].concat(C.split(","), y.split(","), w.split(",").map(function(e) {
                return "xn--" + e
            }))),
            P = (t.MAX_DOMAIN_LENGTH = R.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + c + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(b, "ig"), "#"),
            D = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
            B = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
            H = "(?:[" + D + "]|" + B + ")",
            j = "(?:[" + D + "_\\d]|" + B + ")",
            q = "(" + P + j + "{0,100}" + H + j + "{0,100})",
            z = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)";
        t.RE_HASHTAG_EXTRACTION_PATTERN = "(^|[s.,:'\";>)(]?)(" + q + ")(@" + z + ")?(?=$|[s.,:'\"&;?<)(]?)"
    },
    86: function(e, t, i) {
        "use strict";

        function a(e) {
            if (!e.first_name) {
                var t = e.name.split(" ", 2);
                e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
            }
            e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
        }

        function r(e, t) {
            var i = (0, s.unpackStore)(e);
            return t in i.oCache
        }

        function n(e, t) {
            var i = (0, s.unpackStore)(e).oCache[t];
            return i && !i._n && (a(i), i._n = 1), i
        }

        function o(e, t) {
            var i = (0, s.unpackStore)(e);
            i.oCache || (i.oCache = {}), t.id && (i.oCache[t.id] = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.oCacheExists = r, t.oCacheGet = n, t.oCacheAdd = o;
        var s = i(190)
    },
    88: function(e, t, i) {
        "use strict";

        function a() {
            return {
                txt: "",
                attaches: [],
                urlBinds: []
            }
        }

        function r(e, t) {
            this._db = e, this._key = t, this.dData = a(), this.load()
        }

        function n(e) {
            switch (e.type) {
                case "mail":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function o(e) {
            return {
                txt: e.txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0
            }
        }

        function s(e) {
            return {
                txt: e.txt,
                attaches: e.attaches || [],
                urlBinds: e.urlBinds || []
            }
        }

        function c(e, t) {
            var i = [];
            e.fwd_count ? i.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: e.fwd_count
                }
            }) : e.fwd && i.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: (0, f.parseFwd)(e.fwd).length
                }
            });
            for (var a = 1; e["attach" + a + "_type"]; ++a) i.push({
                type: e["attach" + a + "_type"],
                id: e["attach" + a],
                kind: e["attach" + a + "_kind"],
                productId: e["attach" + a + "_product_id"]
            });
            return e.geo && i.push({
                type: "geo",
                id: e.geo
            }), i
        }

        function u(e, t) {
            return new r(e, "draft_" + t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.ImDraft = r, t.convertKludgesToAttaches = c, t.loadDraftForPeer = u;
        var d = i(98),
            f = i(174);
        r.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, o(this.dData))
        }, r.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = s(e))
            }
        }, r.prototype.clear = function() {
            this.dData = a(), this.dump()
        }, r.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, r.prototype.addAttach = function(e, t, i) {
            ("share" === e || "mail" === e) && this.removeAttachByType(e);
            var a = this.dData.attaches.find(function(i) {
                return i.type === e && i.id === t
            });
            !a && e && t && (this.dData.attaches.push({
                type: e,
                id: t,
                object: i
            }), this.dump())
        }, r.prototype.syncWithSelector = function(e) {
            var t = this,
                i = this.getFwdRaw();
            this.dData.attaches = (i ? [i] : []).concat(e.getMedias().map(function(e) {
                var i = l(e, 2),
                    a = i[0],
                    r = i[1],
                    n = t.dData.attaches.find(function(e) {
                        return e.type == a && e.id == r
                    });
                return n || {
                    type: a,
                    id: r
                }
            })), this.dump()
        }, r.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, r.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dump()
        }, r.prototype.addBindUrl = function(e, t, i) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: i
            }), this.dump())
        }, r.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t ? this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null : null
        }, r.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            return e && e.object ? e.object.url : void 0
        }, r.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, r.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, r.prototype.prepareObjects = function(e, t) {
            var i = this,
                a = this.dData.attaches.find(n);
            return a ? (0, d.post)(d.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = l(e, 1),
                    a = t[0];
                i.dData.attaches = a.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, r.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type
            })
        }, r.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    9: function(e, t, i) {
        "use strict";

        function a(e, t) {
            var i = !1,
                a = this,
                r = void 0,
                n = void 0;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                n = ce("audio"), i = !!n.canPlayType, "no" != n.canPlayType("audio/mpeg") && "" != n.canPlayType("audio/mpeg") ? r = ".mp3?1" : "no" == n.canPlayType('audio/ogg; codecs="vorbis"') || "" == n.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? i = !1 : r = ".ogg?1"
            } catch (o) {}
            var s = t.forcePath || "/" + e + r;
            if (i) {
                n.src = s;
                var c = !1;
                n.addEventListener("ended", function() {
                    c = !0
                }, !0), n.load(), this.playSound = function() {
                    c && n.load(), n.play(), c = !1
                }, this.pauseSound = function() {
                    n.pause()
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var u = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    l = "flash_sound_" + cur.__sound_guid++,
                    d = {
                        url: "/swf/audio_lite.swf?4",
                        id: l
                    },
                    f = {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    };
                if (renderFlash(u, d, f, {})) {
                    var h = browser.msie ? window[l] : document[l],
                        p = !1,
                        m = setInterval(function() {
                            if (h && h.paused) try {
                                h.setVolume(1), h.loadAudio(s), h.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            p = !0, clearInterval(m)
                        }, 300);
                    a.playSound = function() {
                        p && h.playAudio(0)
                    }, a.pauseSound = function() {
                        p && h.pauseAudio()
                    }
                }
            }
        }
        a.prototype = {
            play: function() {
                try {
                    this.playSound()
                } catch (e) {}
            },
            pause: function() {
                try {
                    this.pauseSound()
                } catch (e) {}
            }
        }, window.Sound = a
    },
    96: function(e, t, i) {
        "use strict";

        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t["default"] = e, t
        }

        function r(e, t) {
            if (t && t.status && e.lpstat) {
                var i = Math.floor(t.status / 100);
                t.status >= 500 && t.status < 600 && C("fc_longpoll", 1, i + "0x", t.getResponseHeader("x-frontend")), T[i] = i in T ? T[i] + 1 : 1, Date.now() - F >= N && (Object.keys(T).forEach(function(e) {
                    C("fc_longpoll", T[e], e + "0x", t.getResponseHeader("x-frontend"))
                }), T = {}, F = Date.now())
            }
        }

        function n(e) {
            return (0, m.post)(m.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function o(e, t) {
            e.waitAbortFns.push(t)
        }

        function s(e, t) {
            var i = t.failed ? (0, p.abortablePause)(k, null) : {},
                a = i.abort,
                r = i.pause;
            switch (t.failed) {
                case 1:
                    return (0, v.lpLogFc)("red", "LP failed: old timestamp; resync, next ts", t.ts), e.onResult({
                        ts: t.ts,
                        updates: [
                            [-1]
                        ]
                    }), o(e, a), r().then(function() {
                        return u(e)
                    });
                case 2:
                    return (0, v.lpLogFc)("red", "LP failed: key is incorrect; refresh key"), o(e, a), n(e).then(function(t) {
                        var i = h(t, 4),
                            a = i[0],
                            r = i[1],
                            n = i[2],
                            o = i[3];
                        return e.onResult({
                            ts: +o,
                            updates: [
                                [-2, a, r + "/" + n],
                                [-1]
                            ]
                        })
                    }).then(r).then(function() {
                        return u(e)
                    });
                case 3:
                    throw window.nav.reload({
                        force: !0
                    }), new Error("ts is very wrong");
                default:
                    return t
            }
        }

        function c(e) {
            return e.map(function(e) {
                switch (e[0]) {
                    case 0:
                        return g.deleteEvent(e);
                    case 1:
                        return g.replaceFlagsEvent(e);
                    case 2:
                        return g.setFlagsEvent(e);
                    case 3:
                        return g.resetFlagsEvent(e);
                    case 4:
                        return g.addMessageEvent(e);
                    case 5:
                        return g.editMessageEvent(e);
                    case 6:
                        return g.readInboundEvent(e);
                    case 7:
                        return g.readOutboundEvent(e);
                    case 8:
                        return g.gotOnlineEvent(e);
                    case 9:
                        return g.gotOfflineEvent(e);
                    case 10:
                        return g.resetDirectoriesEvent(e);
                    case 11:
                        return g.replaceDirectoriesEvent(e);
                    case 12:
                        return g.setDirectoriesEvent(e);
                    case 13:
                        return g.deleteDialogEvent(e);
                    case 51:
                        return g.chatChangedEvent(e);
                    case 52:
                        return g.chatUpdatedEvent(e);
                    case 63:
                        return g.typingEvent(e);
                    case 70:
                        return g.videoCallEvent(e);
                    case 80:
                        return g.unreadCountEvent(e);
                    case 114:
                        return g.notifySettingsChangedEvent(e);
                    case 116:
                        return g.refreshMessageEvent(e);
                    case -1:
                        return g.resyncEvent();
                    case -2:
                        return g.refreshLpKeyEvent(e);
                    default:
                        return g.emptyEvent(e)
                }
            })
        }

        function u(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = (0, m.plaingetCancelable)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                i = t.request,
                a = t.cancel;
            return e.stopFn = a, i.then(function(t) {
                var i = h(t, 2),
                    a = i[0],
                    n = i[1];
                return r(e, n), e.waitTimeout = 2, JSON.parse(a)
            })["catch"](function(t) {
                var i = h(t, 2),
                    a = i[0],
                    n = i[1];
                throw r(e, n), a
            }).then(function(t) {
                return s(e, t)
            })
        }

        function l(e) {
            e.isStoppedFn() || u(e).then(e.onResult)["catch"](function(t) {
                return d(e, t)
            }).then(function() {
                return l(e)
            })
        }

        function d(e, t) {
            if (!e.isStoppedFn()) {
                window.topError(t), (0, v.lpLogFc)("red", "LP error", t.message || "no message (probably browser reset)"), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
                var i = (0, p.abortablePause)(e.waitTimeout, null),
                    a = i.abort,
                    r = i.pause;
                return o(e, a), r()
            }
        }

        function f(e, t) {
            function i(e, i, a) {
                r.ts = i;
                for (var n = 0; n < a.length; ++n) a[n].type === _.REFRESH_LP_KEY && (r.key = a[n].key, r.url = a[n].url);
                t(e, i, a)
            }
            var a = !!e.stopped,
                r = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: w,
                    mode: y,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: function() {
                        return a
                    },
                    onResult: function(e) {
                        e.ts && i(r.ts, e.ts, c(e.updates))
                    }
                },
                n = {
                    options: r,
                    isStopped: function() {
                        return a
                    },
                    stopConnection: function() {
                        a = !0, r.stopFn && r.stopFn(), r.stopFn = void 0, this.abortWaiting()
                    },
                    reinitConnection: function() {
                        this.stopConnection(), a = !1, l(r)
                    },
                    abortWaiting: function() {
                        r.waitAbortFns.forEach(function(e) {
                            return e()
                        }), r.waitAbortFns = [], r.waitTimeout = 2
                    },
                    onLp: i
                };
            return l(r), n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var h = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.createLongPoll = f;
        var p = i(34),
            m = i(98),
            _ = i(124),
            g = a(_),
            v = i(138),
            b = window,
            C = b.statlogsValueEvent,
            y = 202,
            w = 5,
            k = 4,
            N = 3e4,
            T = {},
            F = Date.now()
    },
    98: function(e, t, i) {
        "use strict";

        function a(e, t, i) {
            return t && (t.im_v = o), new Promise(function(a, r) {
                ajax.post(e, t, {
                    timeout: i,
                    onDone: function() {
                        a.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return r.apply(null, arguments), !0
                    }
                })
            })
        }

        function r(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                a = n(e, t, i),
                r = a.request;
            return r
        }

        function n(e, t) {
            function i() {
                r.abort()
            }
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = void 0;
            r = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
            var n = new Promise(function(i, n) {
                var o = void 0,
                    s = Date.now(),
                    c = a.timeout || 60,
                    u = ajx2q(t);
                if (window.XDomainRequest) r.open("get", e + "?" + u), r.ontimeout = function() {
                    n(["", {}])
                }, r.onerror = function() {
                    n(["", {}])
                }, r.onload = function() {
                    i([r.responseText, {}])
                }, setTimeout(function() {
                    r.send()
                }, 0);
                else {
                    r.onreadystatechange = function() {
                        4 == r.readyState && (clearInterval(o), r.status >= 200 && r.status < 300 ? i([r.responseText, r]) : n([r.responseText, r]))
                    };
                    try {
                        r.open("GET", e + "?" + u, !0)
                    } catch (l) {
                        return n([l, r])
                    }
                    r.send()
                }
                o = setInterval(function() {
                    Date.now() - s > 1e3 * c && (n(["", {}]), clearInterval(o))
                }, 1e3)
            });
            return {
                request: n,
                cancel: i
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.post = a, t.plainget = r, t.plaingetCancelable = n;
        var o = (t.CONTROLLER = "al_im.php", 2)
    }
});