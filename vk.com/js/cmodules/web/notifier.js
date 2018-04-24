! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 82)
}({
    0: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(158),
            _longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(204),
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
                    this.initIdleMan(), this.initCommunityQueues(), Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_onTabInitialLoaded)(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                        id: "notifiers_wrap",
                        className: "fixed"
                    }), ge("page_wrap"))
                }
            },
            initCommunityQueues: function(e) {
                var t = ls.get("im_m_comms_key"),
                    n = t && t.split ? t.split(";") : [];
                return "empty" === n[0] && n[1] && Date.now() - n[1] < 6e4 ? t = "empty" : "empty" === n[0] && (t = !1), t ? Notifier.proccessCommunityQueues(t, e || 0) : void ajax.post("al_im.php", {
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
                    for (var e = curNotifier.uiNotifications, t = [], n = 0; n < e.length; n++) {
                        var r = e[n];
                        vkNow() - r[1] > 1e4 ? r[0].close() : t.push(r)
                    }
                    curNotifier.uiNotifications = t, Notifier.notificationsGc()
                }, 5e3)
            },
            resetCommConnection: function(e) {
                var t = ls.get("im_m_comms_key");
                t && delete curNotifier.addQueues[t.queue], ls.set("im_m_comms_key", !1), Notifier.initCommunityQueues(e || 0)
            },
            proccessCommunityQueues: function(e, t) {
                return "empty" !== e && e ? void Notifier.addKey(e, function(e, n) {
                    if (n.failed) return t++, void(50 > t && setTimeout(Notifier.resetCommConnection.pbind(t), 100));
                    var e = ls.get("im_m_comms_key");
                    e && (e.ts = n.ts, ls.set("im_m_comms_key", e));
                    var r = n.events;
                    r && r.map(function(e) {
                        return e.split("<!>")
                    }).forEach(function(e) {
                        if ("update_cnt" === e[1]) {
                            var t = e[5],
                                n = e[4];
                            handlePageCount("mgid" + t, n)
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
                    n = intval(e[1]);
                curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && n >= 1)), curNotifier.transport = "frame", this.lcInit();
                for (var r in curNotifier.onConnectionId) curNotifier.onConnectionId[r]();
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
                curNotifier.is_server = !!e, Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_syncWithNotifier)()
            },
            getLpInstance: function() {
                return Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_getInstance)()
            },
            pushEvents: function(e, t) {
                var n = 0;
                each(e, function(e, r) {
                    n |= Notifier.pushEvent(r, t)
                }), n && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & n ? curNotifier.sound_im.play() : curNotifier.sound.play())
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
                if (e.custom.is_call) return 0;
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
                ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.confirmDelivery)(ev.custom.id), curNotifier.q_shown.push(ev);
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
                if (ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.confirmDelivery)(ev.custom.id), "mail" === ev.type) {
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
            hideEvent: function(e, t, n, r) {
                clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
                var i, a = indexOf(curNotifier.q_shown, e); - 1 != a && curNotifier.q_shown.splice(a, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), r === !0 && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (i = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, i - 3), i = 3), 3 == i && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != r && this.checkEvents(), "frame" != curNotifier.transport || n || this.lcSend("hide", {
                    event_id: e.id
                }), r !== !0 && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
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
                var n = extend({
                    __client: curNotifier.instance_id,
                    __act: e,
                    __rnd: Math.random()
                }, t || {});
                if (curNotifier.post_message) try {
                    curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(n), curNotifier.storage_frame_origin)
                } catch (r) {
                    debugLog(r, r.message, r.stack)
                } else ls.set(curNotifier.connection_id, n)
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
                            var n = e.queue || e.key,
                                r = curNotifier.addQueues[n],
                                i = !r && curNotifier.is_server;
                            r ? r[0] = vkNow() : curNotifier.addQueues[n] = [vkNow(), e.ts, e.key], i && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
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
                            var a = ls.get("pad_playlist");
                            a && a.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
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
                            Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_onNotifierRecv)(e);
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
                    n = curNotifier.negotiations[t];
                n && (clearTimeout(n.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
            },
            lcOnStorage: function(e) {
                e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
                var t = e.key,
                    n = e.newValue;
                if (n) {
                    if (t) {
                        if (e.key != curNotifier.connection_id) return
                    } else {
                        if (t = curNotifier.connection_id, n = localStorage.getItem(t), n == curNotifier.lc_prev_value) return;
                        curNotifier.lc_prev_value = n
                    }
                    this.lcRecv(JSON.parse(n) || {})
                }
            },
            lcOnMessage: function(e) {
                if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                    var t, n = e.data.substr(4);
                    if ("ready" == n) curNotifier.storage_frame = e.source, this.lcStart();
                    else {
                        if (-1 == (t = n.indexOf(":")) || n.substr(0, t) != curNotifier.connection_id || !n.substr(t + 1)) return;
                        this.lcRecv(JSON.parse(n.substr(t + 1)))
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
                var t, n = "server_" + curNotifier.connection_id,
                    r = vkNow();
                return !e && isArray(t = ls.get(n)) && t[0] != curNotifier.instance_id && r - t[1] < 8e3 ? !1 : (ls.set(n, [curNotifier.instance_id, r]), !0)
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
                        each(curNotifier.addQueues, function(n, r) {
                            e += r[2], t += "_" + r[1]
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
            addKey: function(e, t, n) {
                if (curNotifier.flash_transport || !e) return !1;
                var r = e.queue || e.key,
                    i = curNotifier.addQueues[r],
                    a = !i && curNotifier.is_server;
                return i ? (i[0] = vkNow(), i[3] = t, i[4] = n) : curNotifier.addQueues[r] = [vkNow(), e.ts, e.key, t, n], n || Notifier.lcSend("new_addkey", e), a && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
            },
            addFeed: function(e, t) {
                var n = curNotifier.addQueues[e];
                isArray(n) && n.length && (n[1] = t.ts, isFunction(n[3]) && n[3](e, t))
            },
            addRecvClbk: function(e, t, n, r) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), (!curNotifier.recvClbks[e][t] || r) && (curNotifier.recvClbks[e][t] = n)
            },
            setRecvClbk: function(e, t) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] = [t]
            },
            fixPhoto: function(e, t) {
                return e = clean(e), -1 == e.indexOf("question_c.gif") ? e : t ? "/images/question_inv_xc.png" : "/images/question_inv_c.png"
            }
        }
    },
    1: function(e, t, n) {
        "use strict";
        n.r(t), window.DesktopNotifications = {
            supported: function() {
                return !(!window.webkitNotifications && !window.Notification)
            },
            checkPermission: function() {
                return window.webkitNotifications ? webkitNotifications.checkPermission() : "granted" == Notification.permission ? 0 : 1
            },
            requestPermission: function(e) {
                (window.webkitNotifications || window.Notification).requestPermission(e)
            },
            createNotification: function(e, t, n) {
                var r = void 0;
                return window.webkitNotifications ? r = webkitNotifications.createNotification(e, t, n) : (r = new Notification(t, {
                    icon: e,
                    body: n
                }), r.cancel = function() {
                    this.close()
                }, r.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), r
            }
        }
    },
    103: function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (Object(g.unpackStore)(e).searchShown) return !1;
            var n = Object(g.getTab)(e, t),
                r = n && Object(g.parserMessage)(n.pinned);
            return r ? n.pinHideId != r.chat_local_id : !1
        }

        function i(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                i = Object(g.getTab)(e, t),
                a = i && Object(g.parserMessage)(i.pinned);
            i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [i.peerId, i.pinHideId]), c(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function a(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                i = Object(g.getTab)(e, t);
            i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [i.peerId, void 0]), c(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function o(e, t, n) {
            var r = c.bind(null, n, t),
                i = Object(_.showUnpinDialog)(function() {
                    i.hideProgress(), i.hide(), e.set(h.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                        return e.set(h.unpinMessage.bind(null, t))
                    }).then(r)
                })
        }

        function s(e, t, n) {
            var r = e.get(),
                a = r.peer,
                o = Object(g.parserMessage)(Object(g.getTab)(e, a).pinned);
            if (n.target.classList.contains(C)) o && i(e, a, t);
            else if ("A" !== n.target.tagName) {
                var s = o && o.messageId;
                if (s && !Object(_.isAlreadyDeleted)(e, a, s)) {
                    var c = e.get(),
                        u = Object(g.getMessage)(e, a, s);
                    u ? (e.setState({
                        msgid: s
                    }), Object(v.updateLocation)({
                        msgid: s
                    }), t().focusOnMessage()) : c.longpoll.push([Object(p.changePeer)(a, s)])
                } else Object(_.showPinnedBox)(e, t, a, m.mount, n);
                statlogsValueEvent("im_pinned_messages", "open")
            }
        }

        function c(e, t, n) {
            return e().updateChatTopic(t, n), Object(h.setActions)(n.get()), e().updateActions(n), n
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

        function d(e) {
            return {
                unmount: function() {
                    Object(f.destroyModule)(e)
                }
            }
        }

        function l(e, t, n) {
            var r = Object(f.createMutations)(d),
                i = r.bindMutations,
                a = s.bind(null, t, n),
                o = u.bind(null),
                c = Object(f.createModule)({
                    handlers: function(t, n) {
                        n(e, "click", y, a), n(e, "mouseover", C, o)
                    }
                });
            return i(c)
        }
        n.r(t), n.d(t, "isPinnedMessageVisibleInTab", function() {
            return r
        }), n.d(t, "pinnedMessageHide", function() {
            return i
        }), n.d(t, "pinnedMessageUnHide", function() {
            return a
        }), n.d(t, "pinnedMessageUnpin", function() {
            return o
        }), n.d(t, "mount", function() {
            return l
        });
        var f = n(46),
            h = n(85),
            p = n(59),
            m = n(9),
            _ = n(156),
            g = n(119),
            v = n(140),
            b = n(127),
            C = "_im_pin_hide",
            y = "_im_pinned_message"
    },
    113: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function i(e, t) {
            return setTimeout(r(e), t)
        }

        function a(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function o(e, t) {
            return Math.floor(a(e, t))
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

        function d(e) {
            return "string" == typeof e
        }

        function l(e) {
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
            if (l(e) || "undefined" == typeof e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
            } else
                for (var r = 0, i = e.length; i > r; r++) {
                    var a = e[r];
                    if (t.call(a, r, a) === !1) break
                }
            return e
        }

        function O(e, t, n) {
            for (var r = n || 0, i = (e || []).length; i > r; r++)
                if (e[r] == t) return r;
            return -1
        }

        function E(e, t) {
            return -1 != O(t, e)
        }

        function S(e, t) {
            var n = l(e) || "undefined" == typeof e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === D(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = S(e[r]) : n[r] = e[r]);
            return n
        }

        function x(e) {
            var t, n, r = {},
                i = 1,
                a = arguments.length,
                o = arguments;
            for (t in e) {
                for (n = !1, i = 1; a > i; i++) o[i][t] && o[i][t] == e[t] && (n = !0);
                n || (r[t] = e[t])
            }
            return r
        }

        function I() {
            var e, t = arguments,
                n = t[0] || {},
                r = 1,
                i = t.length,
                a = !1;
            for ("boolean" == typeof n && (a = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : D(n)) || c(n) || (n = {}); i > r; ++r)
                if (null != (e = t[r]))
                    for (var o in e) {
                        var s = n[o],
                            u = e[o];
                        n !== u && (a && u && "object" === ("undefined" == typeof u ? "undefined" : D(u)) && !u.nodeType ? n[o] = I(a, s || (null != u.length ? [] : {}), u) : void 0 !== u && (n[o] = u))
                    }
            return n
        }

        function j(e) {
            window.templates = window.templates || {}, I(window.templates, e)
        }

        function L(e, t) {
            var n = window.templates = window.templates || {},
                r = n[e];
            return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
        }

        function M(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : D(e))) return !1;
            var t = {},
                n = function(t) {
                    return geByTag(t, e)
                },
                r = function(n, r) {
                    if (r.name)
                        if ("text" != r.type && r.type)
                            if (r.getAttribute("bool")) {
                                var i = val(r);
                                if (!i || "0" === i) return;
                                t[r.name] = 1
                            } else t[r.name] = browser.msie && !r.value && e[r.name] ? e[r.name].value : r.value;
                    else t[r.name] = val(r)
                };
            return F(n("input"), function(e, t) {
                return "radio" != t.type && "checkbox" != t.type || t.checked ? r(e, t) : void 0
            }), F(n("select"), r), F(n("textarea"), r), t
        }

        function R(e, t) {
            for (var n, r = t ? H : B, i = []; e && (n = e.match(r));) {
                e = e.substr(n.index + n[0].length);
                var a = 0;
                n[4] || (a = 7), i.push({
                    url: n[2 + a],
                    query: n[5 + a] || "",
                    domain: n[4 + a]
                })
            }
            return i
        }

        function A() {
            return window.devicePixelRatio >= 2
        }

        function P(e) {
            var t = 0,
                n = 0,
                r = e.ownerDocument || e.document,
                i = r.defaultView || r.parentWindow,
                a = i.getSelection();
            if (a.rangeCount > 0) {
                var o = i.getSelection().getRangeAt(0),
                    s = o.cloneRange();
                s.selectNodeContents(e), s.setEnd(o.startContainer, o.startOffset), t = s.toString().length, s.setEnd(o.endContainer, o.endOffset), n = s.toString().length
            }
            return [t, n]
        }
        n.r(t), n.d(t, "vkLocal", function() {
            return r
        }), n.d(t, "lTimeout", function() {
            return i
        }), n.d(t, "rand", function() {
            return a
        }), n.d(t, "irand", function() {
            return o
        }), n.d(t, "isUndefined", function() {
            return s
        }), n.d(t, "isFunction", function() {
            return c
        }), n.d(t, "isArray", function() {
            return u
        }), n.d(t, "isString", function() {
            return d
        }), n.d(t, "isObject", function() {
            return l
        }), n.d(t, "isEmpty", function() {
            return f
        }), n.d(t, "vkNow", function() {
            return h
        }), n.d(t, "vkImage", function() {
            return p
        }), n.d(t, "trim", function() {
            return m
        }), n.d(t, "stripHTML", function() {
            return _
        }), n.d(t, "escapeRE", function() {
            return g
        }), n.d(t, "intval", function() {
            return v
        }), n.d(t, "floatval", function() {
            return b
        }), n.d(t, "positive", function() {
            return C
        }), n.d(t, "isNumeric", function() {
            return y
        }), n.d(t, "winToUtf", function() {
            return w
        }), n.d(t, "replaceEntities", function() {
            return k
        }), n.d(t, "clean", function() {
            return N
        }), n.d(t, "unclean", function() {
            return T
        }), n.d(t, "each", function() {
            return F
        }), n.d(t, "indexOf", function() {
            return O
        }), n.d(t, "inArray", function() {
            return E
        }), n.d(t, "clone", function() {
            return S
        }), n.d(t, "arrayKeyDiff", function() {
            return x
        }), n.d(t, "extend", function() {
            return I
        }), n.d(t, "addTemplates", function() {
            return j
        }), n.d(t, "getTemplate", function() {
            return L
        }), n.d(t, "serializeForm", function() {
            return M
        }), n.d(t, "extractUrls", function() {
            return R
        }), n.d(t, "isRetina", function() {
            return A
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return P
        });
        var D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        window.PageID = window.PageID || 1;
        var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
        window.isRetina = A, window.extractUrls = R, window.serializeForm = M, window.addTemplates = j, window.getTemplate = L, window.rand = a, window.irand = o, window.isUndefined = s, window.isFunction = c, window.isArray = u, window.isString = d, window.isObject = l, window.isEmpty = f, window.vkNow = h, window.vkImage = p, window.trim = m, window.stripHTML = _, window.escapeRE = g, window.intval = v, window.floatval = b, window.positive = C, window.isNumeric = y, window.winToUtf = w, window.replaceEntities = k, window.clean = N, window.unclean = T, window.each = F, window.indexOf = O, window.inArray = E, window.clone = S, window.arrayKeyDiff = x, window.extend = I, window.vkLocal = r, window.lTimeout = i, window.getCaretCharacterOffsetWithin = P
    },
    119: function(e, t, n) {
        "use strict";

        function r(e) {
            return e.get ? e.get() : e
        }

        function i(e, t) {
            var n = r(e),
                i = n.tabs[n.peer];
            return Object.keys(i.msgs).filter(function(n) {
                var r = v(e, t, n);
                return !Object(W.isOut)(r) && intval(n) > i.in_up_to
            })[0]
        }

        function a(e) {
            var t = r(e);
            return t.searchShown
        }

        function o(e) {
            var t = r(e);
            return t.peer
        }

        function s(e, t) {
            var n = r(e);
            return n.tabs[t]
        }

        function c(e) {
            var t = r(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function u(e) {
            var t = r(e);
            return t.selectedMessages
        }

        function d(e, t, n) {
            var r = s(e, t),
                i = u(e)[0];
            if ("undefined" == typeof i) return [n];
            var a = Math.min(n, i),
                o = Math.max(n, i);
            return Object.keys(r.msgs).filter(function(e) {
                return e >= a && o >= e
            }).filter(function(t) {
                var n = v(e, e.get().peer, t);
                return !Object(W.isServiceMsg)(n) && !Object(W.isCallMessage)(n)
            }).map(intval)
        }

        function l(e, t) {
            var n = r(t),
                i = s(n, e),
                a = 0;
            for (var o in i.msgs)
                if (i.msgs.hasOwnProperty(o)) {
                    var c = v(t, e, o);
                    Object(W.isOut)(c) || (a += Object(W.isUnread)(i, c) ? 1 : 0)
                }
            return a
        }

        function f(e, t, n) {
            var r = s(e, t);
            return Object.keys(r.msgs).filter(function(r) {
                return intval(v(e, t, r).randomId) === n
            }).length > 0
        }

        function h(e, t, n) {
            var r = f(e, t, n);
            return !!r
        }

        function p(e, t) {
            var n = r(e),
                i = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return "undefined" != typeof i ? 2e9 + i : t
        }

        function m(e, t, n) {
            var r = s(e, t),
                i = v(e, t, n),
                a = Object.keys(r.msgs).filter(function(n) {
                    var r = v(e, t, n),
                        a = r.local && r.type !== U.EDIT_MESSAGE;
                    return !i.local && a ? !1 : i.local && !a ? !0 : p(e, i.messageId) > p(e, r.messageId)
                }),
                o = a.pop();
            return o ? v(e, t, o) : null
        }

        function _(e) {
            return e && e.length > 0 ? U.addMessageEvent([0].concat(e)) : e
        }

        function g(e, t, n) {
            var i = s(e, t),
                a = v(e, t, n),
                o = r(e);
            return Object(W.isOut)(a) ? Object(V.oCacheGet)(e, o.id).name : a.userId !== a.peerId ? Object(V.oCacheExists)(e, a.userId) ? Object(V.oCacheGet)(e, a.userId).name : !1 : i.tab
        }

        function v(e, t, n) {
            var r = s(e, t),
                i = r && r.msgs && r.msgs[n];
            return i ? _(i) : null
        }

        function b(e, t, n) {
            var r = s(e, t),
                i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!i) return null;
            var a = i && i.indexOf("" + n),
                o = a > -1 ? i[a - 1] : null;
            return r.msgs[o]
        }

        function C(e) {
            var t = r(e);
            return t.gid || t.isClassic
        }

        function y(e) {
            return r(e).gid
        }

        function w(e) {
            return r(e).gid
        }

        function k(e) {
            return r(e).gid
        }

        function N(e, t) {
            var n = r(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function T(e) {
            var t = r(e);
            return k(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === G.FOLDER_UNRESPOND || t.active_tab === G.FOLDER_UNREAD ? !0 : !1 : !1
        }

        function F(e, t) {
            e = r(e);
            var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
            return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
        }

        function O(e, t) {
            var n = s(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function E(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[0] : !1
        }

        function S(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function x(e) {
            var t = r(e);
            return !t.lockedSending
        }

        function I(e) {
            return e > -2e9 && 0 > e
        }

        function j(e, t) {
            return I(t) ? !!s(e, t).blocked_community : !1
        }

        function L(e) {
            var t = r(e);
            return t.voice_message_available
        }

        function M(e) {
            var t = r(e);
            return !(!R(t) && !t.recentSearch)
        }

        function R(e) {
            var t = r(e);
            return t.searchText
        }

        function A(e, t) {
            var n = r(e);
            return t && t !== R(e) || n.recentSearch ? !0 : !1
        }

        function P(e) {
            var t = r(e);
            return t.recentSearch
        }

        function D(e) {
            var t = c(e);
            return t && t.pinned && _(t.pinned)
        }

        function B(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function H(e) {
            return 1 == r(e).isEditing
        }

        function q(e) {
            return r(e).gid
        }

        function z(e) {
            return e.draft || (e.draft = Object(K.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }
        n.r(t), n.d(t, "unpackStore", function() {
            return r
        }), n.d(t, "getFirstUnread", function() {
            return i
        }), n.d(t, "isSearchShown", function() {
            return a
        }), n.d(t, "getPeer", function() {
            return o
        }), n.d(t, "getTab", function() {
            return s
        }), n.d(t, "getCurrentTab", function() {
            return c
        }), n.d(t, "getSelectedMessages", function() {
            return u
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return d
        }), n.d(t, "countUnread", function() {
            return l
        }), n.d(t, "getMessageByRid", function() {
            return f
        }), n.d(t, "isRidExist", function() {
            return h
        }), n.d(t, "getLocalId", function() {
            return p
        }), n.d(t, "getLastMessage", function() {
            return m
        }), n.d(t, "parserMessage", function() {
            return _
        }), n.d(t, "getAuthorFullName", function() {
            return g
        }), n.d(t, "getMessage", function() {
            return v
        }), n.d(t, "getPreviousMessage", function() {
            return b
        }), n.d(t, "isClassicInterface", function() {
            return C
        }), n.d(t, "isLocksAvailable", function() {
            return y
        }), n.d(t, "isFoldersAvailable", function() {
            return w
        }), n.d(t, "isCommunityInterface", function() {
            return k
        }), n.d(t, "getBareTab", function() {
            return N
        }), n.d(t, "isReversedDialogs", function() {
            return T
        }), n.d(t, "isFullyLoadedTab", function() {
            return F
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return O
        }), n.d(t, "isGoToEndVisible", function() {
            return E
        }), n.d(t, "getUnreadScrollBottom", function() {
            return S
        }), n.d(t, "isSendingAvailable", function() {
            return x
        }), n.d(t, "isCommunityPeer", function() {
            return I
        }), n.d(t, "isCommunityBlocked", function() {
            return j
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return L
        }), n.d(t, "isSearching", function() {
            return M
        }), n.d(t, "getSearchText", function() {
            return R
        }), n.d(t, "isSearchingValue", function() {
            return A
        }), n.d(t, "isRecentSearchesActive", function() {
            return P
        }), n.d(t, "getPinnedMessage", function() {
            return D
        }), n.d(t, "doPopularSuggExist", function() {
            return B
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return H
        }), n.d(t, "getGroupId", function() {
            return q
        }), n.d(t, "getTabDraft", function() {
            return z
        });
        var W = n(138),
            U = n(59),
            G = n(170),
            V = n(199),
            K = n(79)
    },
    122: function(e, t, n) {
        "use strict";

        function r(e) {
            this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }
        n.r(t), extend(r.prototype, EventEmitter.prototype), extend(r.prototype, {
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
        }), window.IdleManager = r
    },
    127: function(e, t, n) {
        "use strict";

        function r(e) {
            return "im_store_" + e
        }

        function i(e) {
            return ls.get(r(e)) || {}
        }

        function a(e, t, n) {
            if (ls.checkVersion()) {
                var i = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", i.length), n(r(e), i)
            }
        }

        function o(e, t, n) {
            return t === f ? e[t] || [] : t === h ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
        }

        function s(e, t, n) {
            switch (e[t] || (e[t] = {}), t) {
                case f:
                    var r = n;
                    r && r.length > 0 ? e[t] = r : delete e[t];
                    break;
                case h:
                    var i = l(n, 2),
                        a = i[0],
                        o = i[1];
                    o ? e[t][a] = +o : delete e[t][a]
            }
            return e
        }

        function c(e, t) {
            for (var n = ["fwd", "draft", "bind_attach"], r = i(e), o = !1, s = n.length; s--;) n[s] in r && (delete r[n[s]], o = !0);
            o && a(e, r, t)
        }

        function u(e, t, n) {
            n.key === r(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
        }

        function d(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && c(e, t);
            var n = {
                    db: i(e),
                    checkTime: Date.now()
                },
                r = u.bind(null, e, n);
            return window.addEventListener("storage", r, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = i(e)), o(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = i(e)), n.db[t]
                },
                update: function(r, i) {
                    var o = s(n.db, r, i);
                    return n.db = o, n.checkTime = Date.now(), a(e, o, t)
                },
                updateByKey: function(r, i) {
                    return n.db[r] = i, n.checkTime = Date.now(), a(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", r, !1)
                }
            }
        }
        n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
            return f
        }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
            return h
        }), n.d(t, "deleteOldStoredFormat", function() {
            return c
        }), n.d(t, "mount", function() {
            return d
        });
        var l = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            f = "recent_search",
            h = "pin_hide"
    },
    131: function(e, t, n) {
        "use strict";

        function r(e, t, n, r, i) {
            if ("Script error." !== e) {
                var a = i ? i.stack || i.message : null;
                o("unhandled_error", a ? {
                    err: e,
                    stack: a
                } : {
                    err: e
                })
            }
            f && f.apply(this, arguments)
        }

        function i(e) {
            e.preventDefault()
        }

        function a() {
            return !!window.imwl
        }

        function o(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
            a() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(l.retryFn)(d.post, 3, function() {
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
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return o(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function c() {
            f = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", i)
        }

        function u() {
            window.onerror = f, f = void 0, window.removeEventListener("unhandledrejection", i)
        }
        n.r(t), n.d(t, "isWeirdLogging", function() {
            return a
        }), n.d(t, "imWeirdLog", function() {
            return o
        }), n.d(t, "imWeirdCatch", function() {
            return s
        }), n.d(t, "startLoggingAllUnhandled", function() {
            return c
        }), n.d(t, "stopLoggingAllUnhandled", function() {
            return u
        });
        var d = n(141),
            l = n(95),
            f = void 0,
            h = 1
    },
    138: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return "number" != typeof t.messageId ? !0 : o(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
        }

        function i(e) {
            return e.kludges && "undefined" != typeof e.kludges.source_act
        }

        function a(e) {
            return "call" == e.kludges.attach1_type
        }

        function o(e) {
            return e.flags & C.FLAG_OUTBOUND
        }

        function s(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function c(e) {
            return s(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function u(e) {
            return s(e, "doc") && "audiomsg" === e.attaches[0].kind
        }

        function d(e) {
            return s(e, "sticker")
        }

        function l(e) {
            return s(e, "gift")
        }

        function f(e) {
            return s(e, "money_transfer", "money_request")
        }

        function h(e) {
            return s(e, "money_request")
        }

        function p(e) {
            return s(e, "link") && m(e.kludges.attach1_url)
        }

        function m(e) {
            var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
                n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
            return t.test(e) || n.test(e)
        }

        function _(e) {
            return e.flags & C.FLAG_IMPORTANT
        }

        function g(e) {
            return o(e) ? vk.id : e.userId
        }

        function v(e) {
            return e.update_time > 0
        }

        function b(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
        n.r(t), n.d(t, "isUnread", function() {
            return r
        }), n.d(t, "isServiceMsg", function() {
            return i
        }), n.d(t, "isCallMessage", function() {
            return a
        }), n.d(t, "isOut", function() {
            return o
        }), n.d(t, "isGraffiti", function() {
            return c
        }), n.d(t, "isAudioMsg", function() {
            return u
        }), n.d(t, "isSticker", function() {
            return d
        }), n.d(t, "isGift", function() {
            return l
        }), n.d(t, "isMoney", function() {
            return f
        }), n.d(t, "isMoneyRequest", function() {
            return h
        }), n.d(t, "isMessageWithInviteLink", function() {
            return p
        }), n.d(t, "isImportant", function() {
            return _
        }), n.d(t, "getUserId", function() {
            return g
        }), n.d(t, "wasEdited", function() {
            return v
        }), n.d(t, "isMessageSelected", function() {
            return b
        });
        var C = n(59)
    },
    140: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = s({}, o.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var n = o.toStr(t);
            o.setLoc(n)
        }

        function i() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = s(e, t)
                },
                commitNav: function() {
                    r(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = s(e, t), setTimeout(function() {
                        r(e), e = {}
                    }, n)
                }
            }
        }
        n.r(t), n.d(t, "updateLocation", function() {
            return r
        }), n.d(t, "updateLazyLocation", function() {
            return i
        });
        var a = window,
            o = a.nav,
            s = a.extend
    },
    141: function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t && (t.im_v = s), new Promise(function(r, i) {
                ajax.post(e, t, {
                    timeout: n,
                    onDone: function() {
                        r.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return i.apply(null, arguments), !0
                    }
                })
            })
        }

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = a(e, t, n),
                i = r.request;
            return i
        }

        function a(e, t) {
            function n() {
                i.abort()
            }
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = void 0;
            i = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
            var a = new Promise(function(n, a) {
                var o = void 0,
                    s = Date.now(),
                    c = r.timeout || 60,
                    u = ajx2q(t);
                if (window.XDomainRequest) i.open("get", e + "?" + u), i.ontimeout = function() {
                    a(["", {}])
                }, i.onerror = function() {
                    a(["", {}])
                }, i.onload = function() {
                    n([i.responseText, {}])
                }, setTimeout(function() {
                    i.send()
                }, 0);
                else {
                    i.onreadystatechange = function() {
                        4 == i.readyState && (clearInterval(o), i.status >= 200 && i.status < 300 ? n([i.responseText, i]) : a([i.responseText, i]))
                    };
                    try {
                        i.open("GET", e + "?" + u, !0)
                    } catch (d) {
                        return a([d, i])
                    }
                    i.send()
                }
                o = setInterval(function() {
                    Date.now() - s > 1e3 * c && (a(["", {}]), clearInterval(o))
                }, 1e3)
            });
            return {
                request: a,
                cancel: n
            }
        }
        n.r(t), n.d(t, "CONTROLLER", function() {
            return o
        }), n.d(t, "post", function() {
            return r
        }), n.d(t, "plainget", function() {
            return i
        }), n.d(t, "plaingetCancelable", function() {
            return a
        });
        var o = "al_im.php",
            s = 2
    },
    151: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = !1,
                r = this,
                i = void 0,
                a = void 0;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                a = ce("audio"), n = !!a.canPlayType, "no" != a.canPlayType("audio/mpeg") && "" != a.canPlayType("audio/mpeg") ? i = ".mp3?1" : "no" == a.canPlayType('audio/ogg; codecs="vorbis"') || "" == a.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? n = !1 : i = ".ogg?1"
            } catch (o) {}
            var s = t.forcePath || "/" + e + i;
            if (n) {
                a.src = s;
                var c = !1;
                a.addEventListener("ended", function() {
                    c = !0
                }, !0), a.load(), this.playSound = function() {
                    c && a.load(), a.play(), c = !1
                }, this.pauseSound = function() {
                    a.pause()
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var u = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    d = "flash_sound_" + cur.__sound_guid++,
                    l = {
                        url: "/swf/audio_lite.swf?4",
                        id: d
                    },
                    f = {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    };
                if (renderFlash(u, l, f, {})) {
                    var h = browser.msie ? window[d] : document[d],
                        p = !1,
                        m = setInterval(function() {
                            if (h && h.paused) try {
                                h.setVolume(1), h.loadAudio(s), h.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            p = !0, clearInterval(m)
                        }, 300);
                    r.playSound = function() {
                        p && h.playAudio(0)
                    }, r.pauseSound = function() {
                        p && h.pauseAudio()
                    }
                }
            }
        }
        n.r(t), r.prototype = {
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
        }, window.Sound = r
    },
    156: function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function i() {
            var e = dn.get(sr);
            return e || 0
        }

        function a(e) {
            e >= window.clientHeight() - 30 && (e = 0), dn.set(sr, e)
        }

        function o(e, t) {
            var n = Fn(e, t),
                r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
            r && Ln(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function s(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function c(e, t, n, r) {
            var i = t && !n ? 1 : !t && n ? -1 : 0;
            i && !Object(Tt.isClassicInterface)(e) && r().compensateHistoryHeightChange(i)
        }

        function u(e, t, n, r) {
            var i = window.devicePixelRatio >= 2 ? "256" : "128",
                a = "animation" === n,
                o = "im_gift";
            a && (o += " sticker_img");
            var s = "/images/stickers/" + _n(e) + "/" + i + ".png",
                c = '<img height="128" class="' + o + '" src="' + s + '"/>';
            if (a) {
                var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                    d = "animatedSticker" + r;
                c = '<div id="' + d + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + _n(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + c + "</div>";
                var l = !1;
                browser.msie ? (0 ^ r) === r && (l = !0) : l = Number.isInteger(r), l && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(d, 10)
            }
            return t && (c = '<a onmouseover="return Emoji.stickerOver(' + _n(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + _n(t) + ', this, event);">' + c + "</a>"), c = '<div class="im_sticker_row">' + c + "</div>"
        }

        function d(e, t, n) {
            var r = e.get ? e.get() : e;
            if (A(r, t)) {
                var i = r.tabs[t].deleted || [];
                return mn(n, i)
            }
            return !1
        }

        function l(e, t, n) {
            var r = n.randomId,
                i = Fn("_im_mess_rid" + r, t);
            return i && (t = ae([i], t), t = N(e, n, t, !0, !1)), t
        }

        function f(e) {
            var t = Object(Tt.checkVoiceMessageAvailable)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : "undefined" != typeof t ? Promise.resolve(t) : h().then(function(e) {
                return e.length > 0
            })["catch"](function(e) {
                return !1
            })
        }

        function h() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function p(e) {
            return Rn("im_preloader", {
                preloader: hn(un.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function m(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function _(e) {
            var t = Fn("_im_invisible_bar", e);
            t && (Sn(t, "_im_invisible_bar"), Sn(t, "im-page--history-new-bar_hide"))
        }

        function g(e, t, n) {
            var r = Nn(n, "msgid"),
                i = Fn("_im_mess_" + r, t),
                a = n.cloneNode(!0);
            return i && (i.parentNode.replaceChild(a, i), y(t)), t
        }

        function v(e, t, n) {
            var r = b(e, t),
                i = Fn("_im_mess_" + t.messageId, n);
            return i && (i.parentNode.replaceChild(ln(r), i), y(n)), n
        }

        function b(e, t) {
            var n = ["_im_mess"],
                r = Object(Ft.isUnread)(e.tabs[t.peerId], t);
            Object(Ft.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(Ft.isOut)(t) && n.push("im-mess_out"), Object(Ft.wasEdited)(t) && n.push("im-mess_was_edited"), Object(jt.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(Ft.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push("" + Dt), t.local && Object(Ft.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Bt), Object(Ft.isGift)(t) && n.push("im-mess_gift");
            var a = C(t),
                o = q(e, t.text, t.kludges);
            "" != o && Object(Ft.wasEdited)(t) && (o += Rn("sImLblWasEdited", {
                update_time: t.update_time
            })), t.subject && "..." !== t.subject.trim() && !j(t.peerId) && (o = Rn("im_topic", {
                topic: t.subject
            }) + o);
            var s = Rn("im_message_media", {
                messageId: t.messageId,
                attaches: a.join(""),
                text: Object(Ft.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
            });
            return Object(Ft.isGift)(t) || (s = o + s), "" == o && Object(Ft.wasEdited)(t) && (s += Rn("sImLblWasEdited", {
                update_time: t.update_time
            })), Rn("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                text: s,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + An("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + An("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            })
        }

        function C(e) {
            return e.attaches.map(function(t) {
                return "sticker" === t.type ? e.messageId ? u(t.id, t.productId, t.kind, e.messageId) : u(t.id, t.productId) : p(t.type)
            })
        }

        function y(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) In(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", Rn("sImHistoryRowActions")), Sn(t[n], "_im_mess_noa")
        }

        function w(e) {
            var t = Math.floor(e / 3600),
                n = Math.floor(e / 60) - 60 * t,
                r = e - 3600 * t - 60 * n,
                i = [t, n, r],
                a = !1,
                o = !1;
            return i.reduce(function(e, t) {
                if (0 === t && !o) return o = !0, e;
                a && (t = 10 > t ? "0" + t : t);
                var n = "" + e + ("" !== e ? ":" : "") + t;
                return a = !0, o = !0, n
            }, "")
        }

        function k(e, t, n) {
            var r = un.id,
                i = e.attaches[0],
                a = i.initiatorId,
                o = i.state,
                s = i.receiverId,
                c = void 0;
            switch (o) {
                case "reached":
                    c = An(r === a ? "mail_call_outgoing" : "mail_call_incoming");
                    var u = t ? "" : w(i.duration);
                    c = c.replace("{duration}", u);
                    break;
                case "canceled_by_initiator":
                    c = An(r === a ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (r === a) {
                        if (t) return An("mail_call_declined");
                        var d = Object(xt.oCacheGet)(n, s);
                        return d ? Pn(d.sex, An("mail_call_declined_by", "raw")).replace("{user_name}", d.first_name) : An("mail_call_declined")
                    }
                    return An("mail_call_canceled");
                default:
                    c = An("mail_added_call")
            }
            return Rn("im_calls_link", {
                text: c
            })
        }

        function N(e, t, n) {
            var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
                a = Date.now() - 1e3 * t.date > 1e3,
                o = e.tabs[t.peerId];
            if (!n || Fn("_im_mess", n) || Fn("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
            var s = [];
            t.local || (s = e.imQueue(t.peerId, r)), s.length > 0 && ae(s.map(function(e) {
                return Fn("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var c = b(e, t),
                u = yn(n);
            In(u, "_im_mess_stack") || (u = kn(u, "._im_mess_stack", -1));
            for (var d = Object(Tt.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && d && !Fn("_im_mess_" + d.messageId);) d = Object(Tt.getLastMessage)(e, t.peerId, d.messageId);
            var l = Fn("_im_unread_bar_row", n),
                f = Object(Ft.getUserId)(t),
                h = d ? D(d.date, e) : 0;
            if (!d || B(o, d, t, e, i)) {
                var p = "",
                    m = !1;
                if (l && Object(Ft.isOut)(t) && Ke(e, n, t.peerId), 1 === o.unread && !Object(Ft.isOut)(t) && i && (p += Rn("im_mess_bar", {}), m = !0, Ke(e, n, t.peerId)), !Un(new Date(h))) {
                    var _ = new Date,
                        g = m ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    p += Rn("im_day_bar", {
                        day: zn(t.date, e.timeshift, !0, An("months_of", "raw"), !0),
                        date: t.date,
                        day_class: _.getDate() + _.getMonth() + _.getFullYear() + " " + g
                    })
                }
                if (Object(Ft.isServiceMsg)(t)) p += Rn("im_service_row", {
                    text: he(e, t, o),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(Ft.isCallMessage)(t)) p += Rn("im_service_row", {
                    text: fe("", k(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var v = e.gid && Object(Ft.isOut)(t) ? _n(t.kludges.from_admin) || 0 : 0,
                        C = Object(xt.oCacheGet)(e, v ? -e.gid : f) || o,
                        w = j(t.peerId) ? C.name : C.first_name,
                        N = C.link || o.href,
                        F = Rn("im_mess_stack_name", {
                            name: w,
                            link: N,
                            "class": Object(Ft.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(Ft.isGift)(t)) {
                        var O = An("mail_gift_message_sent", "raw");
                        F += ' <span class="im-mess-stack--gift">' + Pn(C.sex || 0, O) + "</span>"
                    }
                    if (Object(Ft.isMoney)(t)) {
                        var E = Object(Ft.isMoneyRequest)(t) ? An("mail_money_request_message_sent", "raw") : An("mail_money_tranfer_message_sent", "raw");
                        F += ' <span class="im-mess-stack--money-transfer">' + Pn(C.sex || 0, E) + "</span>"
                    }
                    var S = e.gid ? "/gim" + e.gid : "/im",
                        x = void 0;
                    if (x = t.local ? H(t.date, e.timeshift) : Rn("im_stack_date", {
                            date: H(t.date, e.timeshift),
                            link: S + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), v && e.admins[v]) {
                        var I = e.admins[v],
                            L = v === un.id ? An("mail_by_you") : I[0];
                        x = x + " " + Rn("im_admin_link", {
                            name: L,
                            href: I[1]
                        })
                    }
                    p += Rn("im_mess_stack", {
                        photo: C.photo,
                        href: N,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: vn(F),
                        stack_name: F,
                        peerId: f,
                        date: x,
                        messages: c,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(St.toArray)(pn(p)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else l && e.peer === t.peerId && !o.inplaceSearch && Object(Ft.isOut)(t) && Ke(e, n, t.peerId), Fn("_im_stack_messages", u).appendChild(ln(c));
            return Object(Ft.isOut)(t) && !a && setTimeout(function() {
                var e = Fn("_im_mess_" + t.messageId, n);
                In(e, Dt) && En(e, "im-mess_sending")
            }, 500), s = s.filter(function(e) {
                return e.rid !== t.randomId
            }), y(n), T(s, e, n)
        }

        function T(e, t, n) {
            var r = void 0;
            return r = "object" === ("undefined" == typeof e ? "undefined" : Pt(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(Tt.getMessage)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return N(t, e, n, !1)
            }), n
        }

        function F(e) {
            var t = Fn("_im_mess_blind_unread_marker", e);
            t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
        }

        function O(e, t, n) {
            var r = e.tabs[t];
            return Object(St.toArray)(Tn("_im_mess_unread", n)).forEach(function(e) {
                var t = _n(Nn(e, "msgid"));
                t > 0 && r.out_up_to >= t && (Sn(e, "_im_mess_unread"), Sn(e, "im-mess_unread"), F(e))
            }), n
        }

        function E(e, t, n) {
            var r = Fn("_im_msg_media" + t.messageId, e);
            return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
        }

        function S(e, t) {
            if (!Object(Tt.isFullyLoadedTab)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function x(e) {
            return 0 == e ? !0 : !1
        }

        function I(e) {
            return e > 0 && 2e9 > e
        }

        function j(e) {
            return e > 2e9
        }

        function L(e) {
            return -2e9 > e
        }

        function M(e, t) {
            return e === t.peer
        }

        function R(e, t) {
            return Object(Rt.doesChatTabHaveFlag)(Object(Tt.getTab)(e, t), 1024)
        }

        function A(e, t) {
            return e.tabs[t] ? !0 : !1
        }

        function P(e, t) {
            return A(e, t) ? null !== e.tabs[t].lastmsg : !1
        }

        function D(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function B(e, t, n, r, i) {
            if (Object(Ft.getUserId)(t) !== Object(Ft.getUserId)(n)) return !0;
            var a = D(t.date, r),
                o = D(n.date, r);
            return Wn(a, o) ? Object(Tt.isCommunityInterface)(r) && _n(t.kludges.from_admin) !== _n(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : Object(Ft.isServiceMsg)(t) || Object(Ft.isServiceMsg)(n) ? !0 : Object(Ft.isCallMessage)(n) || Object(Ft.isCallMessage)(t) ? !0 : Object(Ft.isGift)(t) || Object(Ft.isGift)(n) ? !0 : Object(Ft.isGraffiti)(t) || Object(Ft.isGraffiti)(n) ? !0 : Object(Ft.isUnread)(e, t) === Object(Ft.isUnread)(e, n) || !i || Object(Ft.isOut)(n) || _e(n.peerId, r.gid) ? !1 : !0 : !0
        }

        function H(e, t) {
            return Dn(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function q(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                i = Math.round(1e9 * Math.random()).toString(16),
                a = {},
                o = 0;
            return t = Object(Ot.replaceHyperLinks)(t || "", Ot.linksReplacer.bind(null, r)), t = t.replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + o + "_" + i + "!";
                return a[t] = e, o++, t
            }), t = Object(Ot.replaceMentions)(t), t = Object(Ot.replaceEmailLinks)(t), t = Object(Ot.replaceHashtags)(t, function(t) {
                var n = Object(Tt.getGroupId)(e),
                    r = n ? "gim" + n : "im";
                return '<a href="/' + r + "?sel=" + Object(Tt.getPeer)(e) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(a).forEach(function(e) {
                t = t.replace(e, function() {
                    return a[e]
                })
            }), n.emoji && (t = Zn.emojiToHTML(t, !0)), t
        }

        function z(e) {
            return j(e) ? "c" + (e - 2e9) : L(e) ? "e" + Math.abs(e + 2e9) : e
        }

        function W(e) {
            var t = e.substr(0, 1);
            switch (t) {
                case "e":
                    return -2e9 - _n(e.substr(1));
                case "c":
                    return 2e9 + _n(e.substr(1));
                default:
                    return _n(e)
            }
        }

        function U(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function G(e, t) {
            return {
                search: {
                    name: An("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: An("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: An("mail_allow_comm_messages")
                },
                clear: {
                    name: An(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: An("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: An("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: An("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: An(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: An("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: An("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: An("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: An(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: An(t ? "mail_leave_vkcomgroup" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: An("mail_change_topic")
                },
                "return": {
                    icon: "return",
                    name: An(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: An("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: An("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: An("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: An(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function V(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = Rn("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function K(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = Rn("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Q(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return V(e, t[n])
                    }).join("");
                case 3:
                    return V(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return K(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return K(e, t[n])
                    }).join("")
            }
        }

        function Y(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (j(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return Q(t.photo);
            var r = t.data.active.slice(0, 4).map(xt.oCacheGet.bind(null, e)),
                i = r.map(function(e) {
                    return e.photo
                }),
                a = n ? [] : r.map(function(e) {
                    return e.link
                });
            return Q(i, a)
        }

        function $(e) {
            var t = An(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + on + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function X() {
            return '<li class="im-search-results-head">' + An("mail_search_messages") + "</li>"
        }

        function J() {
            return '<li class="im-search-results-head">' + An("mail_search_conversations_sep") + "</li>"
        }

        function Z() {
            return '<li class="im-search-results-head">' + An("mail_search_dialogs_sep") + "</li>"
        }

        function ee() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + An("mail_recent_searches") + '\n    <button type="button" class="' + an + ' im-page--clear-recent">' + An("mail_clear_recent") + "</button>\n  </li>"
        }

        function te(e) {
            var t = e.get().popular_sugg,
                n = Object(Tt.isClassicInterface)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(xt.oCacheGet)(e, n) || t,
                    i = e.get().tabs[n] || t,
                    a = (e.get().mutedPeers || []).indexOf(n) >= 0,
                    o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                        return !!e
                    }).join(" ");
                return '<div class="' + o + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Xn(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + U(i.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function ne(e, t, n) {
            var r = Fn("_im_mess_" + t.messageId, n);
            if (r) {
                jn(r, "aria-hidden", "false"), En(r, "im-mess_failed " + Bt);
                var i = Fn("_im_mess_marker", r);
                jn(i, "aria-label", An("mail_send_message_error")), jn(i, "role", "link")
            }
            return n
        }

        function re(e, t, n) {
            var r = Fn("_im_mess_" + t, n);
            if (r) {
                Sn(r, "im-mess_failed"), jn(r, "aria-hidden", "true"), Sn(r, Bt);
                var i = Fn("_im_mess_marker", r);
                jn(i, "aria-label", ""), jn(i, "role", "")
            }
            return n
        }

        function ie(e, t) {
            var n = e.map(function(e) {
                return Fn("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            });
            return ae(n, t)
        }

        function ae(e, t) {
            var n = e.filter(function(e) {
                return !In(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                return e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === wn(e).length
            }).map(function(e) {
                return On("_im_mess_stack", e)
            }).forEach(function(e) {
                In(Cn(e), "_im_bar_date") && fn(Cn(e)), In(Cn(e), "_im_unread_bar_row") && fn(Cn(e)), fn(e)
            }), t
        }

        function oe(e, t, n, r) {
            return e.map(function(e) {
                return Fn("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                Mn(e, de(t, e, n)), En(e, "im-mess_light")
            }), r
        }

        function se(e, t, n) {
            var r = Fn("_im_mess_" + e, n);
            if (r) {
                var i = Fn(Ht, r);
                Mn(r, i.innerHTML), Sn(r, "im-mess_light")
            }
            return n
        }

        function ce(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
                a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
            if (a) return ue(e, t, n, r, !0, i);
            var o = (Object(Tt.isClassicInterface)(r), 60),
                s = ue(e, t, n, r, !1, i);
            return s.length > o ? ue(e, t, n, r, !0, i) : s
        }

        function ue(e, t, n, i, a, o) {
            var s = [],
                c = (e && e.userIds || []).filter(function(e) {
                    var t = Object(xt.oCacheExists)(i, e);
                    return t || s.push(e), t && e != i.id
                });
            if (s.length && Object(Lt.loadChatMember)(r({}, t, s), i), 0 === c.length) return "";
            var u = I(t) || Object(Tt.isCommunityPeer)(t) ? "first_name" : a ? "short_name" : "name";
            if (1 == c.length) {
                var d = n ? "" : Object(xt.oCacheGet)(i, c[0])[u];
                return d + " " + An("mail_typing")
            }
            var l = An("mail_typing_several", c.length),
                f = c.slice(0, Math.min(c.length - 1, o)),
                h = f.map(function(e) {
                    return Object(xt.oCacheGet)(i, e)[u]
                }).join(", ");
            if (c.length > o + 1) h += " " + An("mail_and_peer").replace("{count}", e.totalCount - o).replace("{typing}", l);
            else {
                var p = Object(xt.oCacheGet)(i, c[f.length])[u];
                h += " " + An("mail_and_peer_one") + " " + p + " " + l
            }
            return h
        }

        function de(e, t, n) {
            var r = t.innerHTML,
                i = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
            return '<div class="im-mess--text">\n    ' + An(i) + ' <button type="button" data-peer="' + e + '" class="' + qt + ' im-mess--btn">' + An("mail_restore") + '</button>\n    <div class="' + Ht + ' im-mess--original">' + r + "</div>\n  </div>"
        }

        function le() {
            return '<div class="im-page--chat-search-empty">\n    ' + An("mail_im_search_empty") + "\n  </div>"
        }

        function fe(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function he(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
                i = t.kludges,
                a = i.source_act,
                o = _n(i.source_mid),
                s = t.userId,
                c = Object(xt.oCacheGet)(e, s),
                u = "",
                d = s === o;
            switch (a) {
                case Wt:
                    u = "mail_im_chat_created";
                    break;
                case Ut:
                    u = "mail_im_title_updated_dot";
                    break;
                case Gt:
                    u = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case Vt:
                    u = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case Kt:
                    u = "mail_im_photo_set";
                    break;
                case Qt:
                    u = "mail_im_photo_removed";
                    break;
                case Yt:
                    u = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case $t:
                    u = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case Xt:
                    u = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (u = Pn(c.sex, An(u, "raw")), u = u.replace("{from}", fe(c.link, c.name, r)), o && o !== s) {
                var l = i.source_email;
                if (l) u = u.replace("{user}", fe("/im?email=" + encodeURIComponent(l), "email", r));
                else {
                    var f = Object(xt.oCacheGet)(e, o),
                        h = a === Vt ? f.inv_name : f.kick_name;
                    u = u.replace("{user}", fe(f.link, h, r))
                }
            }
            if (i.source_text) {
                var p = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
                u = u.replace("{title}", p + ('«<b class="im_srv_lnk">' + i.source_text + "</b>»"))
            }
            if (i.source_act === Yt || i.source_act === $t)
                if (i.source_message) {
                    var m = me(Zn.emojiToHTML(vn(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                        _ = fe("", m, !1, "im_srv_mess_link");
                    u = u.replace("{msg}", _)
                } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return fe("", t, !1, "im_srv_mess_link")
                });
            return u
        }

        function pe(e, t, n, r) {
            if (t === Kt) {
                var i = Fn("_im_mess_" + e.messageId, r);
                if (i) {
                    var a = n.tabs[e.peerId];
                    i.parentNode.innerHTML = Rn("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: he(n, e, a) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function me(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(kt.MENTION_RAW, "$1$4")
        }

        function _e(e, t) {
            return t ? !1 : e === un.id
        }

        function ge(e, t) {
            return Yn(e, {
                url: Object(Tt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

        function ve(e) {
            return function(t) {
                function n() {
                    o = !0, Sn(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
                }
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    a = ln(Rn("im_preloader", {
                        preloader: hn(un.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === r ? "im-preloader_bottom" : "im-preloader_top", i].join(" ")
                    })),
                    o = !1;
                setTimeout(function() {
                    o || ("bottom" === r ? e.appendChild(a) : e.insertBefore(a, bn(e)), En(a, "im-preloader_visible"))
                }, 0), t.then(n)["catch"](function(e) {
                    Object(Mt.imWeirdCatch)("wrapLoading", e), n()
                })
            }
        }

        function be(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, wt.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function Ce(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = ar,
                i = !1,
                a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || In(n, "_im_no_select") || In(n, "im_msg_media_link") || "IMG" == n.tagName && !In(n, "_im_graffiti") && !In(n, "emoji") && !In(n, "emoji_css") && !In(n, "im_gift") || "TEXTAREA" == n.tagName || In(n, "play_new") || In(n, "videoplayer") || (i = a.test(n.className))) break; while (r-- && (n = n.parentNode));
            return i ? !!gn(ye()) : !0
        }

        function ye() {
            var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
            return (e || "").toString()
        }

        function we(e, t) {
            return '<div class="im-mess--text">\n      <span>' + An("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + z(e) + "&msgid=" + t + '">' + An("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function ke(e, t) {
            var n = An(j(e) ? "mail_chat_sure_to_delete_all" : Object(Tt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
            return Kn(An("mail_deleteall1"), n, An("mail_delete"), t, An("global_cancel"))
        }

        function Ne(e) {
            return Kn(An("mail_unpin_title"), An("mail_unpin_text"), An("mail_unpin"), e, An("global_cancel"))
        }

        function Te(e, t, n, r) {
            var i = An("mail_dialog_msg_delete_N", t),
                a = Kn(An("mail_dialog_msg_delete_title"), i, An("mail_delete"), function() {
                    return r(isChecked(Fn("_check_forall")))
                }, An("global_cancel")),
                o = "",
                s = !1;
            return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + An("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), s && checkbox(Fn("_check_forall")), a
        }

        function Fe(e, t, n, r, i) {
            t.showProgress(), e.set(r.bind(null, i)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
            })
        }

        function Oe(e, t, n, r, i) {
            var a = e.get().peer;
            nr(r), Vn("al_im.php", {
                act: "a_show_members_box",
                chat: a - 2e9
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1
                },
                onDone: function(r, i) {
                    var a = Object(Nt.createModule)({
                        handlers: function(i, o) {
                            o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                                r.hide(), Ee(e, e.get().peer, t, n), Object(Nt.destroyModule)(a)
                            }), o(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                                var n = Fn("_im_chat_members_w", r.bodyNode.parentNode),
                                    i = 160,
                                    a = On("_im_member_item", t),
                                    o = a.offsetTop - n.scrollTop + i,
                                    s = o > 370;
                                mobileOnlineTip(t, {
                                    was: _n(Nn(t, "was")),
                                    mid: _n(Nn(t, "peer")),
                                    vk_mobile: _n(Nn(t, "vk_mobile")),
                                    forcetoup: s
                                })
                            })
                        }
                    })
                }
            }, r)
        }

        function Ee(e, t, n, r) {
            var i = e.get().tabs[t],
                a = i.memberIds;
            e.set(r.bind(null, "add_member", a)).then(n().showCreation)
        }

        function Se(e, t, n) {
            if (e.get().active_tab === kt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === kt.FOLDER_ALL ? kt.FOLDER_UNREAD : kt.FOLDER_ALL;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function xe(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var i = Object(Tt.isReversedDialogs)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, i !== Object(Tt.isReversedDialogs)(e)), e
            })
        }

        function Ie(e, t) {
            "undefined" == typeof t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return kt.FOLDER_MASKS[kt.FOLDER_IMPORTANT] & n.folders
        }

        function je(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
            if ("undefined" == typeof t && (t = e.get().peer), !Object(Tt.isFoldersAvailable)(e)) return !1;
            var r = n || e.get().tabs[t];
            return kt.FOLDER_MASKS[kt.FOLDER_UNRESPOND] & r.folders
        }

        function Le(e, t) {
            return (t.get().block_states[e] || {}).free === !1
        }

        function Me(e) {
            return null != e.get().pendingForward
        }

        function Re(e, t) {
            return (t.get().block_states[e] || {}).who === un.id
        }

        function Ae(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(r) {
                n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([wt.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
            })
        }

        function Pe(e, t, n) {
            var r = void 0;
            return !Qn("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(n, i) {
                    i && (r = t(n, e, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Jn.loaded && Jn.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function De(e, t) {
            return Be(e.get(), t, Object(Tt.getTab)(e, t).last_seen)
        }

        function Be(e, t, n, r) {
            if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + An("mail_header_online_status") + He(t, !1, !0, !0, r) + "</span>" : "online" + ($n[n[0]] ? He(t, !1, !1, !0, r) : "");
            if (!n[1]) return "";
            var i = Hn(n[1], e.timeshift),
                a = Pn(Object(xt.oCacheGet)(e, t).sex, An("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
            return 2 === n[2] ? a += He(t, !1, !0, !1, r) : n[2] && (a += He(t, !1, !1, !1, r)), a
        }

        function He(e, t, n, r, i) {
            var a = {
                mid: e
            };
            r && (a.was = 1), t ? a.forcetoup = !0 : a.forcetodown = !0, n && (a.vk_mobile = 1), a = Object.assign(a, i);
            var o = Object.keys(a).map(function(e) {
                    return e + ": " + a[e]
                }).join(", "),
                s = n ? "" : 'onclick="mobilePromo();"',
                c = n ? " vk_mobile" : "";
            return Rn("im_wrap_mobile", {
                "class": "im_status_mob_onl" + c,
                params: o,
                attrs: s
            })
        }

        function qe(e, t) {
            var n = t.get().tabs[e];
            return Vn("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function ze(e, t) {
            return Vn("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function We(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function Ue(e, t, n, r) {
            var i = void 0,
                a = Qn("al_im.php", {
                    act: "a_important",
                    offset: "0"
                }, {
                    onDone: function(r, a) {
                        a && (i = n(r, e, t, a))
                    },
                    params: {
                        width: 638,
                        onHide: function() {
                            Jn.loaded && Jn.detachPlayer(!0)
                        },
                        onDestroy: function() {
                            i && i.unmount()
                        }
                    }
                }, r);
            st(a, e)
        }

        function Ge() {
            var e = document.activeElement;
            return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
        }

        function Ve(e, t, n) {
            var r = Fn("_im_mess_" + e, n);
            return r && xn(r, "im-mess_fav", t), n
        }

        function Ke(e, t, n) {
            var r = Fn("_im_unread_bar_row", t);
            if (!r) return t;
            var i = kn(r, "._im_mess_stack", -1),
                a = kn(r, "._im_mess_stack"),
                o = i ? Tn("_im_mess", i).pop() : null,
                s = a ? Fn("_im_mess", a) : null;
            if (fn(r), _(t), !s || !o) return t;
            var c = Nn(s, "msgid"),
                u = Object(Tt.getPreviousMessage)(e, n, c),
                d = Object(Tt.getMessage)(e, n, c);
            if (!u || B(e.tabs[n], u, d, e)) return t;
            var l = Fn("_im_stack_messages", i),
                f = Fn("_im_stack_messages", a).children;
            return Object(St.toArray)(f).forEach(function(e) {
                fn(e), l.appendChild(e)
            }), fn(a), t
        }

        function Qe(e, t, n) {
            var r = Object(Tt.getFirstUnread)(e, e.get().peer);
            if (!r) return [!1, 0];
            var i = Fn("_im_mess_" + r, t);
            if (!i) {
                var a = Object(Tt.getLastMessage)(e, e.get().peer, r);
                if (!a) return [!0, 0];
                i = Fn("_im_mess_" + a.messageId, t)
            }
            var o = In(i, "_im_mess_srv") ? i : On("_im_mess_stack", i);
            if (!o) return [!0, 0];
            var s = i ? i.offsetTop : 0,
                c = o.offsetTop + s,
                u = n.contHeight();
            return c <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - c)]
        }

        function Ye(e, t, n) {
            nr(t);
            var r = On("_im_top_notice", n);
            tr(r, 200, fn.pbind(r));
            var i = On("_im_page_dialogs", r);
            i && In(i, "im-page--dialogs-notice") && Sn(i, "im-page--dialogs-notice"), Gn.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function $e(e, t, n) {
            nr(t);
            var r = On("_im_aside_notice", n);
            er(r, 200, fn.pbind(r)), Gn.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Xe(e, t) {
            nr(e);
            var n = On("_im_aside_promo_block", t);
            er(n, 200, fn.pbind(n)), Gn.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Je(e, t) {
            var n = On("_im_aside_promo_block", t);
            n.classList.add("--action-called"), Gn.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: Nn(t, "hash"),
                platform: Nn(t, "platform")
            })
        }

        function Ze(e, t, n, r, i) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(Ot.replaceMentions)(n, function(e, t, n, r, i) {
                return i
            }), r && (n = Zn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !j(e) && (n = Rn("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && i.length > 0 && (n = Rn("im_dialog_media", {
                name: et(i[0], i)
            })), n
        }

        function et(e, t) {
            var n = {
                photo: An("mail_added_photos", "raw"),
                video: An("mail_added_videos", "raw"),
                audio: An("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                    return Bn(e.object.fwd_count, An("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var r = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return Bn(r, n[e.type], !0);
                case "audio_playlist":
                    return An("mail_added_audio_playlist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return An("mail_added_graffiti");
                        case "audiomsg":
                            return An("mail_added_audiomsg");
                        default:
                            return An("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return An("mail_added_geo");
                case "wall":
                    return An("mail_added_wall");
                case "wall_reply":
                    return An("mail_added_wall_reply");
                case "gift":
                    return An("mail_added_gift");
                case "link":
                case "share":
                    return An("mail_added_link");
                case "sticker":
                    return An("mail_added_sticker");
                case "market":
                    return An("mail_added_market_item");
                case "money_transfer":
                    return An("mail_added_money_transfer");
                case "money_request":
                    return An("mail_added_money_request");
                case "story":
                    return An("mail_added_story");
                case "mask":
                    return An("mail_added_mask");
                case "article":
                    return An("mail_added_article");
                case "call":
                    return An("mail_added_call");
                default:
                    return An("mail_added_" + e.type)
            }
            return ""
        }

        function tt(e) {
            En(e, "im-send-btn_loading")
        }

        function nt(e) {
            Sn(e, "im-send-btn_loading")
        }

        function rt(e) {
            var t = e.get(),
                n = Object(Tt.getPinnedMessage)(e);
            if (!n || !Object(It.isPinnedMessageVisibleInTab)(e, Object(Tt.getPeer)(e))) return "";
            var r = Object(xt.oCacheGet)(e, n.userId);
            if (!r) return "";
            var i = it(e, n);
            i || (i = n.text, i = !i && n.attaches.length ? Rn("im_pinned_message_media", {
                text: et(n.attaches[0], n.attaches)
            }) : q(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " ");
            var a = Rn("im_pinned_message", {
                date: qn(n.date, t.timeshift),
                content: i,
                link: r.link,
                name: r.name
            });
            return a
        }

        function it(e, t) {
            var n = "";
            if (t && Object(Ft.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var r = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (r = An("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var i = Bn(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        a = Bn(t.kludges.attach1_total_amount / 1e3, r, !0);
                    n = An("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
                } else {
                    var o = Bn(t.kludges.attach1_tr_amount / 1e3, r, !0);
                    n = An("mail_money_request_collected_amount").replace("{amount}", o)
                }
                if (_n(t.kludges.attach1_held_amount)) {
                    var s = Bn(t.kludges.attach1_held_amount / 1e3, r, !0);
                    n += " " + An("mail_money_request_held_amount").replace("{amount}", s)
                }
                t.text && (n += '<span class="divider"></span>' + q(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += Rn("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return n
        }

        function at(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Yn(n, {
                text: An("mail_message_edited") + " " + qn(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function ot() {
            var e = getSize(Fn(sn))[1];
            return e || (e = or), e
        }

        function st(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                In(e.target, "_im_edit_time") && at(t, e, e.target)
            })
        }

        function ct(e, t, n, r, i) {
            var a = e.get(),
                o = void 0,
                s = Qn("al_im.php", {
                    act: "a_get_pinned_message_box",
                    chat: n,
                    hash: a.tabs[n].hash
                }, {
                    onDone: function(n, i) {
                        i && (o = r(n, e, t, i))
                    },
                    params: {
                        width: 638,
                        onHide: function() {
                            Jn.loaded && Jn.detachPlayer(!0)
                        },
                        onDestroy: function() {
                            o && o.unmount()
                        }
                    }
                }, i);
            st(s, e)
        }

        function ut(e, t) {
            return j(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
        }

        function dt(e) {
            return !j(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function lt(e, t) {
            var n = Object(xt.oCacheGet)(e, t.peerId),
                r = Object(Tt.getTab)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, j(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function ft(e, t) {
            for (var n in t) t.hasOwnProperty(n) && lt(e, t[n])
        }

        function ht(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                i = r ? r[1].split(";") : [];
            for (i.length > ir && (r[1] = i.slice(0, ir).join(";")); e.length > rr;) {
                var a = e.substr(0, rr).lastIndexOf(" "); - 1 == a && (a = rr), n.push({
                    msgText: gn(e.substr(0, a))
                }), e = gn(e.substr(a))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), i = i.slice(ir); i.length; i = i.slice(ir)) n.push({
                attaches: [
                    ["mail", i.slice(0, ir).join(";")]
                ]
            });
            return n
        }

        function pt(e) {
            return e.length > rr
        }

        function mt(e, t, n) {
            var r = !1;
            Vn("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide: function() {
                        e.set(n), r && r.unmount()
                    }
                },
                onFail: function(e) {
                    return setTimeout(function() {
                        return Kn(An("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = Object(Et.mount)(t.bodyNode, e)
                }
            }, {})
        }

        function _t() {
            Kn(An("global_error"), An("mail_message_wait_until_uploaded"))
        }

        function gt(e, t) {
            var n = Object(Tt.getTab)(e, t.peerId) || {};
            if (!t || !Object(Ft.isOut)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (d(e, t.peerId, t.messageId)) return !1;
            if (j(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function vt(e, t) {
            var n = Object(Tt.getTab)(e, t),
                r = -1 !== n.memberIds.indexOf(n.ownerId),
                i = 5,
                a = r ? [n.ownerId] : [];
            return a = a.concat(n.memberIds.filter(function(t) {
                return t !== n.ownerId && Object(xt.oCacheExists)(e, t)
            }).slice(0, r ? i - 1 : i)), a.map(function(t) {
                return Object(xt.oCacheGet)(e, t)
            })
        }

        function bt(e, t) {
            return t.map(function(t) {
                return Object(xt.oCacheGet)(e, t)
            })
        }

        function Ct(e, t) {
            var n = Object(Tt.getTab)(e, t);
            return n.memberIds.reduce(function(t, n) {
                var r = Object(xt.oCacheGet)(e, n);
                return t[r.id] = r, t
            }, {})
        }

        function yt(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n = 1,
                r = 60,
                i = 3600,
                a = 86400,
                o = 604800,
                s = 2592e3,
                c = 31536e3,
                u = [
                    [c, t ? An("global_years_accusative", "raw") : An("global_age_years", "raw")],
                    [s, t ? An("global_months_accusative", "raw") : An("global_age_months", "raw")],
                    [o, t ? An("global_weeks_accusative", "raw") : An("global_age_weeks", "raw")],
                    [a, t ? An("global_days_accusative", "raw") : An("global_age_days", "raw")],
                    [i, t ? An("global_hours_accusative", "raw") : An("global_hours", "raw")],
                    [r, t ? An("global_minutes_accusative", "raw") : An("global_minutes", "raw")],
                    [n, t ? An("global_seconds_accusative", "raw") : An("global_age_seconds", "raw")]
                ],
                d = e,
                l = [],
                f = void 0;
            if (u.forEach(function(e) {
                    var t = At(e, 2),
                        n = t[0],
                        r = t[1],
                        i = Math.floor(d / n);
                    d %= n, i >= 1 && l.push(Bn(i, r))
                }), f = l.length, 1 === f) return l.pop();
            var h = l.slice(0, f - 1).join(", "),
                p = l.pop();
            return An("global_and").replace(/{before}/gi, h).replace(/{after}/gi, p)
        }
        n.r(t), n.d(t, "SENDING_CLASS", function() {
            return Dt
        }), n.d(t, "FAILED_CLASS", function() {
            return Bt
        }), n.d(t, "ORIGINAL_CLASS", function() {
            return Ht
        }), n.d(t, "RESTORE_CLASS", function() {
            return qt
        }), n.d(t, "TYPING_CLASS", function() {
            return zt
        }), n.d(t, "CREATE_CHAT_ACTION", function() {
            return Wt
        }), n.d(t, "CHAT_TITLE_ACTION", function() {
            return Ut
        }), n.d(t, "CHAT_INVITE_USER", function() {
            return Gt
        }), n.d(t, "CHAT_KICK_USER", function() {
            return Vt
        }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
            return Kt
        }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
            return Qt
        }), n.d(t, "CHAT_PIN_MESSAGE", function() {
            return Yt
        }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
            return $t
        }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
            return Xt
        }), n.d(t, "DESELECT_ALL_CLASS", function() {
            return Jt
        }), n.d(t, "SHOW_CHAT_MEMBERS_CLASS", function() {
            return Zt
        }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
            return en
        }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
            return tn
        }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
            return nn
        }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
            return rn
        }), n.d(t, "CLEAR_RECENT_CLASS", function() {
            return an
        }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
            return on
        }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
            return sn
        }), n.d(t, "getClassicChatHeight", function() {
            return i
        }), n.d(t, "setClassicChatHeight", function() {
            return a
        }), n.d(t, "fixTableCellChildHeight", function() {
            return o
        }), n.d(t, "applyInnerHtml", function() {
            return s
        }), n.d(t, "compensateHistoryHeightChange", function() {
            return c
        }), n.d(t, "renderSticker", function() {
            return u
        }), n.d(t, "isAlreadyDeleted", function() {
            return d
        }), n.d(t, "replaceMessageAttrs", function() {
            return l
        }), n.d(t, "isVoiceMessageAvailable", function() {
            return f
        }), n.d(t, "getAvailableMicrophones", function() {
            return h
        }), n.d(t, "renderAttach", function() {
            return p
        }), n.d(t, "dayFromVal", function() {
            return m
        }), n.d(t, "showInvisibleBar", function() {
            return _
        }), n.d(t, "updateMessageInCache", function() {
            return g
        }), n.d(t, "editAndReplaceMessage", function() {
            return v
        }), n.d(t, "renderMessage", function() {
            return b
        }), n.d(t, "renderMessageMedia", function() {
            return C
        }), n.d(t, "ensureDomHasActions", function() {
            return y
        }), n.d(t, "renderCallMessage", function() {
            return k
        }), n.d(t, "appendToHistory", function() {
            return N
        }), n.d(t, "restoreQueue", function() {
            return T
        }), n.d(t, "markMessagesAsRead", function() {
            return O
        }), n.d(t, "replaceAttaches", function() {
            return E
        }), n.d(t, "isDuplicate", function() {
            return S
        }), n.d(t, "isReservedPeer", function() {
            return x
        }), n.d(t, "isUserPeer", function() {
            return I
        }), n.d(t, "isChatPeer", function() {
            return j
        }), n.d(t, "isPeerActive", function() {
            return M
        }), n.d(t, "isFvkcomgroup", function() {
            return R
        }), n.d(t, "isTabLoaded", function() {
            return A
        }), n.d(t, "isTabLoadedWithMessage", function() {
            return P
        }), n.d(t, "parseMessage", function() {
            return q
        }), n.d(t, "convertPeerToUrl", function() {
            return z
        }), n.d(t, "unUrlPeer", function() {
            return W
        }), n.d(t, "simplifyCounter", function() {
            return U
        }), n.d(t, "chatActions", function() {
            return G
        }), n.d(t, "renderPhotos", function() {
            return Q
        }), n.d(t, "renderPhotosFromTab", function() {
            return Y
        }), n.d(t, "renderBtnSearchOnlyMessages", function() {
            return $
        }), n.d(t, "renderMessagesSep", function() {
            return X
        }), n.d(t, "renderConversationsSep", function() {
            return J
        }), n.d(t, "renderPopularSuggSep", function() {
            return Z
        }), n.d(t, "renderClearRecent", function() {
            return ee
        }), n.d(t, "renderPopularSuggestions", function() {
            return te
        }), n.d(t, "setMessageError", function() {
            return ne
        }), n.d(t, "startResendMessage", function() {
            return re
        }), n.d(t, "removeMessages", function() {
            return ie
        }), n.d(t, "removeMessagesWithRestore", function() {
            return oe
        }), n.d(t, "restoreMessage", function() {
            return se
        }), n.d(t, "formatTyper", function() {
            return ce
        }), n.d(t, "renderEmptySearch", function() {
            return le
        }), n.d(t, "serviceLink", function() {
            return fe
        }), n.d(t, "renderServiceMsg", function() {
            return he
        }), n.d(t, "addChatPhotoToUpdate", function() {
            return pe
        }), n.d(t, "replaceSpecialSymbols", function() {
            return me
        }), n.d(t, "isSelfMessage", function() {
            return _e
        }), n.d(t, "showVerifiedTooltip", function() {
            return ge
        }), n.d(t, "wrapLoading", function() {
            return ve
        }), n.d(t, "tabFromIds", function() {
            return be
        }), n.d(t, "checkSelectClick", function() {
            return Ce
        }), n.d(t, "renderGoTo", function() {
            return we
        }), n.d(t, "showFlushDialog", function() {
            return ke
        }), n.d(t, "showUnpinDialog", function() {
            return Ne
        }), n.d(t, "showMsgDeleteDialog", function() {
            return Te
        }), n.d(t, "cleanHistory", function() {
            return Fe
        }), n.d(t, "showChatMembers", function() {
            return Oe
        }), n.d(t, "inviteUser", function() {
            return Ee
        }), n.d(t, "showUnreadOnly", function() {
            return Se
        }), n.d(t, "changeTab", function() {
            return xe
        }), n.d(t, "isImportant", function() {
            return Ie
        }), n.d(t, "isUnrespond", function() {
            return je
        }), n.d(t, "isPeerBlocked", function() {
            return Le
        }), n.d(t, "isPendingForward", function() {
            return Me
        }), n.d(t, "isPeerBlockedByMe", function() {
            return Re
        }), n.d(t, "blockLatencyCompensation", function() {
            return Ae
        }), n.d(t, "showSpamLayer", function() {
            return Pe
        }), n.d(t, "getLastSeenTextInHeader", function() {
            return De
        }), n.d(t, "getLastSeenText", function() {
            return Be
        }), n.d(t, "showBlacklistBoxUser", function() {
            return qe
        }), n.d(t, "showBlacklistBox", function() {
            return ze
        }), n.d(t, "getBaseLink", function() {
            return We
        }), n.d(t, "showFavvedBox", function() {
            return Ue
        }), n.d(t, "isEditableFocused", function() {
            return Ge
        }), n.d(t, "updateStar", function() {
            return Ve
        }), n.d(t, "removewNewUnreadBarAndMerge", function() {
            return Ke
        }), n.d(t, "isMessagesVisible", function() {
            return Qe
        }), n.d(t, "hideTopNotice", function() {
            return Ye
        }), n.d(t, "hideAsideNotice", function() {
            return $e
        }), n.d(t, "hideAsidePromoBlock", function() {
            return Xe
        }), n.d(t, "installVKAdminApp", function() {
            return Je
        }), n.d(t, "renderShortText", function() {
            return Ze
        }), n.d(t, "attachToText", function() {
            return et
        }), n.d(t, "lockButton", function() {
            return tt
        }), n.d(t, "unlockButton", function() {
            return nt
        }), n.d(t, "renderPinnedMessage", function() {
            return rt
        }), n.d(t, "renderPinnedMedia", function() {
            return it
        }), n.d(t, "showEditTimeTooltip", function() {
            return at
        }), n.d(t, "getPinnedMessageHeight", function() {
            return ot
        }), n.d(t, "boxHandleEditTimeTooltips", function() {
            return st
        }), n.d(t, "showPinnedBox", function() {
            return ct
        }), n.d(t, "isUserAliveInChat", function() {
            return ut
        }), n.d(t, "getAliveMembersCount", function() {
            return dt
        }), n.d(t, "normalizeTab", function() {
            return lt
        }), n.d(t, "normalizeTabsGotFromServer", function() {
            return ft
        }), n.d(t, "splitMessageToParts", function() {
            return ht
        }), n.d(t, "isMessageTooLong", function() {
            return pt
        }), n.d(t, "showInvitationBox", function() {
            return mt
        }), n.d(t, "showWaitUntilUploadedBox", function() {
            return _t
        }), n.d(t, "canMessageBeDeletedForAll", function() {
            return gt
        }), n.d(t, "getTopChatMembers", function() {
            return vt
        }), n.d(t, "getChatMembersByIds", function() {
            return bt
        }), n.d(t, "getChatMembers", function() {
            return Ct
        }), n.d(t, "formatTimespan", function() {
            return yt
        });
        var wt = n(59),
            kt = n(170),
            Nt = n(46),
            Tt = n(119);
        n.d(t, "unpackStore", function() {
            return Tt.unpackStore
        }), n.d(t, "getFirstUnread", function() {
            return Tt.getFirstUnread
        }), n.d(t, "isSearchShown", function() {
            return Tt.isSearchShown
        }), n.d(t, "getPeer", function() {
            return Tt.getPeer
        }), n.d(t, "getTab", function() {
            return Tt.getTab
        }), n.d(t, "getCurrentTab", function() {
            return Tt.getCurrentTab
        }), n.d(t, "getSelectedMessages", function() {
            return Tt.getSelectedMessages
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return Tt.getMessageRangeFromSelection
        }), n.d(t, "countUnread", function() {
            return Tt.countUnread
        }), n.d(t, "getMessageByRid", function() {
            return Tt.getMessageByRid
        }), n.d(t, "isRidExist", function() {
            return Tt.isRidExist
        }), n.d(t, "getLocalId", function() {
            return Tt.getLocalId
        }), n.d(t, "getLastMessage", function() {
            return Tt.getLastMessage
        }), n.d(t, "parserMessage", function() {
            return Tt.parserMessage
        }), n.d(t, "getAuthorFullName", function() {
            return Tt.getAuthorFullName
        }), n.d(t, "getMessage", function() {
            return Tt.getMessage
        }), n.d(t, "getPreviousMessage", function() {
            return Tt.getPreviousMessage
        }), n.d(t, "isClassicInterface", function() {
            return Tt.isClassicInterface
        }), n.d(t, "isLocksAvailable", function() {
            return Tt.isLocksAvailable
        }), n.d(t, "isFoldersAvailable", function() {
            return Tt.isFoldersAvailable
        }), n.d(t, "isCommunityInterface", function() {
            return Tt.isCommunityInterface
        }), n.d(t, "getBareTab", function() {
            return Tt.getBareTab
        }), n.d(t, "isReversedDialogs", function() {
            return Tt.isReversedDialogs
        }), n.d(t, "isFullyLoadedTab", function() {
            return Tt.isFullyLoadedTab
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return Tt.makeTabNotFullyLoaded
        }), n.d(t, "isGoToEndVisible", function() {
            return Tt.isGoToEndVisible
        }), n.d(t, "getUnreadScrollBottom", function() {
            return Tt.getUnreadScrollBottom
        }), n.d(t, "isSendingAvailable", function() {
            return Tt.isSendingAvailable
        }), n.d(t, "isCommunityPeer", function() {
            return Tt.isCommunityPeer
        }), n.d(t, "isCommunityBlocked", function() {
            return Tt.isCommunityBlocked
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return Tt.checkVoiceMessageAvailable
        }), n.d(t, "isSearching", function() {
            return Tt.isSearching
        }), n.d(t, "getSearchText", function() {
            return Tt.getSearchText
        }), n.d(t, "isSearchingValue", function() {
            return Tt.isSearchingValue
        }), n.d(t, "isRecentSearchesActive", function() {
            return Tt.isRecentSearchesActive
        }), n.d(t, "getPinnedMessage", function() {
            return Tt.getPinnedMessage
        }), n.d(t, "doPopularSuggExist", function() {
            return Tt.doPopularSuggExist
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return Tt.isAnyMessageBeingEdited
        }), n.d(t, "getGroupId", function() {
            return Tt.getGroupId
        }), n.d(t, "getTabDraft", function() {
            return Tt.getTabDraft
        });
        var Ft = n(138),
            Ot = n(158),
            Et = n(189),
            St = n(89),
            xt = n(199),
            It = n(103),
            jt = n(48),
            Lt = n(85),
            Mt = n(131),
            Rt = n(69),
            At = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Pt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            Dt = "_im_mess_sending",
            Bt = "_im_mess_failed",
            Ht = "_im_mess_original",
            qt = "_im_mess_restore",
            zt = "_im_typing",
            Wt = "chat_create",
            Ut = "chat_title_update",
            Gt = "chat_invite_user",
            Vt = "chat_kick_user",
            Kt = "chat_photo_update",
            Qt = "chat_photo_remove",
            Yt = "chat_pin_message",
            $t = "chat_unpin_message",
            Xt = "chat_invite_user_by_link",
            Jt = "_im_deselect_all",
            Zt = "_im_show_chat_mems",
            en = "_im_top_notice_hide",
            tn = "_im_aside_notice_hide",
            nn = "_im_aside_promo_block_hide",
            rn = "_im_vkadmin_promo_link",
            an = "_im_clear_recent",
            on = "_im_mess_search",
            sn = "_im_pinned",
            cn = window,
            un = cn.vk,
            dn = cn.ls,
            ln = cn.se,
            fn = cn.re,
            hn = cn.rs,
            pn = cn.sech,
            mn = cn.inArray,
            _n = cn.intval,
            gn = cn.trim,
            vn = cn.stripHTML,
            bn = cn.domFC,
            Cn = cn.domPS,
            yn = cn.domLC,
            wn = cn.domChildren,
            kn = cn.domClosestSibling,
            Nn = cn.domData,
            Tn = cn.geByClass,
            Fn = cn.geByClass1,
            On = cn.gpeByClass,
            En = cn.addClass,
            Sn = cn.removeClass,
            xn = cn.toggleClass,
            In = cn.hasClass,
            jn = cn.attr,
            Ln = cn.setStyle,
            Mn = cn.val,
            Rn = cn.getTemplate,
            An = cn.getLang,
            Pn = cn.langSex,
            Dn = cn.langDate,
            Bn = cn.langNumeric,
            Hn = cn.getDateText,
            qn = cn.getSmDate,
            zn = cn.getShortDate,
            Wn = cn.isSameDate,
            Un = cn.isToday,
            Gn = cn.ajax,
            Vn = cn.showBox,
            Kn = cn.showFastBox,
            Qn = cn.showTabbedBox,
            Yn = cn.showTooltip,
            $n = cn.mobPlatforms,
            Xn = cn.onlinePlatformClass,
            Jn = cn.AudioMessagePlayer,
            Zn = cn.Emoji,
            er = cn.slideUp,
            tr = cn.fadeOut,
            nr = cn.cancelEvent,
            rr = 4096,
            ir = 100,
            ar = 8,
            or = 52,
            sr = "chatPosition"
    },
    158: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = e.split("_"),
                r = g(n, 2),
                i = r[0],
                a = r[1];
            return [i, a, t]
        }

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (a > 50) return [
                [], e.length
            ];
            for (var o = [], s = ""; n < e.length;) {
                var c = e[n];
                if ("id" === c) s = t[n];
                else if ("," === c && s) o.push(r(s)), s = "";
                else if ("(" === c) {
                    var u = i(e, t, n + 1, a + 1),
                        d = g(u, 2),
                        l = d[0],
                        f = d[1];
                    n = f, o.push(r(s, l)), s = ""
                } else if (")" === c) return "" !== s && o.push(r(s)), [o, n];
                n++
            }
            return s && o.push(r(s)), [o, n]
        }

        function a(e) {
            if (k[e]) return k[e];
            for (var t = e ? e.length : 0, n = [], r = [], a = "", o = 0; t > o; o++) {
                var s = e[o],
                    c = s.charCodeAt(0);
                c >= 48 && 57 >= c || "_" === s || "-" === s ? a += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== a && (r.push(a), n.push("id"), a = ""), r.push(s), n.push(s))
            }
            a.length > 0 && (r.push(a), n.push("id"));
            var u = i(n, r),
                d = g(u, 1),
                l = d[0];
            return Object.keys(k).length > 300 && (k = {}), k[e] = l, l
        }

        function o(e, t) {
            for (var n = void 0, r = 0, i = e; null !== (n = _.MESSAGE_REGEXP.exec(e));) {
                n = u(n);
                var a = n[0].length,
                    o = n.index + a,
                    s = e[n.index - 1],
                    c = e[o - 1],
                    l = void 0 !== s && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(s),
                    f = void 0 !== c && /([:;$])/i.test(c);
                if (!l && !f) {
                    var h = d(n),
                        p = h.domain;
                    if (p.length <= _.MAX_DOMAIN_LENGTH && -1 !== _.TOP_DOMAINS.indexOf(p)) {
                        var m = t(h);
                        i = i.slice(0, n.index + r) + m + i.slice(o + r), r += m.length - a
                    }
                }
            }
            return i
        }

        function s(e, t) {
            return e.replace(_.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function c(e, t) {
            return e.replace(_.MENTION, t || function(e, t, n, r, i) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + C(r || "") + '" mention_id="' + C(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
            })
        }

        function u(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function d(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function l() {
            return v || (v = new RegExp(_.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
        }

        function f(e, t) {
            return e.replace(l(), function(e, n, r, i, a, o) {
                return (n || "") + t(r + (a || ""))
            })
        }

        function h(e) {
            w("ttl_message_confirm_delivery", e)
        }

        function p(e, t) {
            var n = t.protocol,
                r = t.url,
                i = t.query,
                a = t.domain,
                o = t.full;
            try {
                o = decodeURIComponent(o)
            } catch (s) {}
            if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = C(o).replace(/&amp;/g, "&"), !e && a.match(_.OUR_DOMAINS)) {
                r = y(r).replace(_.ENTITIES, encodeURIComponent);
                var c = r,
                    u = r.indexOf("#/"),
                    d = "",
                    l = void 0;
                return u >= 0 ? c = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (c = "/" + r.substr(u + 2).replace(/^\//, ""))), l = c.match(_.VK_DOMAIN), l && l[1].length < 32 && (d = ' mention_id="' + l[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + m(n + r + i) + '" target="_blank"' + d + ">" + o + "</a>"
            }
            var f = "away.php?utf=1&to=" + encodeURIComponent(n + y(r + i)),
                h = C((n + r + i).replace(/'/g, "\\'")),
                p = "return goAway('" + h + "', {}, event);";
            return '<a href="' + f + '" target="_blank" onclick="' + p + '">' + o + "</a>"
        }

        function m(e) {
            return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        n.r(t), n.d(t, "parseFwd", function() {
            return a
        }), n.d(t, "replaceHyperLinks", function() {
            return o
        }), n.d(t, "replaceEmailLinks", function() {
            return s
        }), n.d(t, "replaceMentions", function() {
            return c
        }), n.d(t, "replaceHashtags", function() {
            return f
        }), n.d(t, "confirmDelivery", function() {
            return h
        }), n.d(t, "linksReplacer", function() {
            return p
        });
        var _ = n(170),
            g = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            v = void 0,
            b = window,
            C = b.clean,
            y = b.replaceEntities,
            w = b.statlogsValueEvent,
            k = {}
    },
    170: function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        n.r(t), n.d(t, "OUR_DOMAINS", function() {
            return k
        }), n.d(t, "ENTITIES", function() {
            return N
        }), n.d(t, "VK_DOMAIN", function() {
            return T
        }), n.d(t, "MENTION", function() {
            return F
        }), n.d(t, "MENTION_RAW", function() {
            return O
        }), n.d(t, "ARROW_UP", function() {
            return E
        }), n.d(t, "ARROW_DOWN", function() {
            return S
        }), n.d(t, "PAGE_UP", function() {
            return x
        }), n.d(t, "PAGE_DOWN", function() {
            return I
        }), n.d(t, "END_KEY", function() {
            return j
        }), n.d(t, "HOME", function() {
            return L
        }), n.d(t, "ENTER", function() {
            return M
        }), n.d(t, "ESC", function() {
            return R
        }), n.d(t, "UNPRINTABLE_KEYS", function() {
            return A
        }), n.d(t, "UP_DOWN_CONTROLS", function() {
            return P
        }), n.d(t, "PRINTABLE", function() {
            return D
        }), n.d(t, "FOLDER_UNREAD", function() {
            return B
        }), n.d(t, "FOLDER_ALL", function() {
            return H
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return q
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return z
        }), n.d(t, "FOLDERS", function() {
            return W
        }), n.d(t, "FOLDER_MASKS", function() {
            return U
        }), n.d(t, "TOP_DOMAINS", function() {
            return G
        }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
            return V
        }), n.d(t, "EMAIL", function() {
            return K
        }), n.d(t, "MESSAGE_REGEXP", function() {
            return Q
        }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return ne
        });
        var i, a = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
            o = "(https?:\\/\\/)?",
            s = "((?:[" + a + "\\—\\-\\_]+\\.){1,5})",
            c = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
            u = "(?:\\:(\\d{2,5}))",
            d = "(" + s + c + u + "?)",
            l = "([\\/?#])",
            f = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
            h = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
            p = "　-〿＀-￯",
            m = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
            _ = "[" + f + m + h + p + "]",
            g = "(?:\\(|\\[)[" + a + "\\d&#%;,]+(?:\\)|\\])",
            v = "(" + l + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + _ + "+|" + g + "){0,200})?",
            b = o + d + v,
            C = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
            y = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
            w = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
            k = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            N = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            T = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            F = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            O = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            E = 38,
            S = 40,
            x = 33,
            I = 34,
            j = 35,
            L = 36,
            M = 13,
            R = 27,
            A = [E, S, x, I, M, R, j, L],
            P = [x, I, S, E, L, j],
            D = "printable",
            B = "unread",
            H = "all",
            q = "unrespond",
            z = "important",
            W = [H, B, q, z],
            U = (i = {}, r(i, q, 2), r(i, z, 1), i),
            G = [].concat(C.split(","), y.split(","), w.split(",").map(function(e) {
                return "xn--" + e
            })),
            V = G.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            K = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + c + "))", "ig"),
            Q = new RegExp(b, "ig"),
            Y = "#",
            $ = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
            X = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
            J = "(?:[" + $ + "]|" + X + ")",
            Z = "(?:[" + $ + "_\\d]|" + X + ")",
            ee = "(" + Y + Z + "{0,100}" + J + Z + "{0,100})",
            te = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)",
            ne = "(^|[s.,:'\";>)(]?)(" + ee + ")(@" + te + ")?(?=$|[s.,:'\"&;?<)(]?)"
    },
    172: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = this,
                r = {
                    minH: 50,
                    minW: 50
                };
            n.options = t = extend(r, t), n.content = e;
            var i = n.id = "rb_box_" + (t.id || curRBox.guid++);
            n.wrap = ce("div", {
                id: i,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var a = {};
            n.toBottom = n.toRight = !1, t.fixed ? (a.bottom = 0, a.right = 72) : (void 0 !== t.startTop ? a.top = t.startTop : void 0 !== t.startBottom && (a.bottom = t.startBottom), void 0 !== t.startLeft ? a.left = t.startLeft : void 0 !== t.startRight && (a.right = t.startRight)), setStyle(n.wrap, a), t.movable && addEvent(t.movable, "mousedown", n._head_mdown.bind(n)), n.resizeableH = t.resizeableH || e, t.startHeight && setStyle(n.resizeableH, "height", t.startHeight), n.resizeableW = t.resizeableW || e, t.startWidth && setStyle(n.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", n._cont_mdown.bind(n)), t.closer && (addEvent(t.closer, "mousedown", n._close_mdown.bind(n)), addEvent(t.closer, "click", n._close_click.bind(n))), t.hider && (addEvent(t.hider, "mousedown", n._close_mdown.bind(n)), addEvent(t.hider, "click", n._hide_click.bind(n))), t.minimizer && t.minimizer !== !0 && (addEvent(t.minimizer, "mousedown", n._close_mdown.bind(n)), addEvent(t.minimizer, "click", n._min_toggle.bind(n))), n.wrap.appendChild(e), t.resize !== !1 && (n.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), n.wrap.appendChild(n.resizeWrap), addEvent(n.resizeWrap, "mousedown", n._resize_mdown.bind(n))), t.minimized && (addClass(n.wrap, "rb_minimized"), n.minimized = !0), bodyNode.insertBefore(n.wrap, ge("page_wrap"));
            var o = getStyle(n.wrap, "top"),
                s = getStyle(n.wrap, "bottom"),
                c = getStyle(n.wrap, "left"),
                u = getStyle(n.wrap, "right");
            this.toBottom = ("auto" === o || "" === o || browser.msie && 0 === o) && "auto" != s && "" !== s && !(browser.msie && 0 === s), this.toRight = ("auto" === c || "" === c || browser.msie && 0 === c) && "auto" != u && "" !== u && !(browser.msie && 0 === u), this.toRight && setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(n.wrap, "rb_inactive"), this.toBottom && (setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(n.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(n.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[i] = n, n.pos = !1, t.noshow ? (setStyle(n.wrap, {
                visibility: "hidden",
                display: "block"
            }), n._update_pos(), setStyle(n.wrap, {
                visibility: "",
                display: ""
            })) : n.show(!1, t.nofocus)
        }
        n.r(t), window.curRBox || (window.curRBox = {
            guid: 0,
            active: !1,
            focused: [],
            tabs: {}
        });
        var i = 1e4;
        extend(r.prototype, {
            show: function(e) {
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                var n = this;
                void 0 === e && (e = 0), e ? (setStyle(n.wrap, {
                    opacity: 0,
                    display: "block"
                }), n.visible = !0, !t && n.focus(), animate(n.wrap, {
                    opacity: 1
                }, e, function() {
                    setStyle(n.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    }), n._update_pos()
                })) : (show(n.wrap), n.visible = !0, !t && n.focus(), n._update_pos()), n.options.onShow && n.options.onShow()
            }),
            hide: function(e) {
                function t(t, n, r) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t, n) {
                var r = this;
                return !t && r.options.onBeforeHide && r.options.onBeforeHide() ? !0 : (void 0 === e && (e = 0), e ? (setStyle(r.wrap, {
                    opacity: 1,
                    display: "block"
                }), animate(r.wrap, {
                    opacity: 0
                }, e, function() {
                    hide(r.wrap), setStyle(r.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    })
                })) : hide(r.wrap), r.visible = !1, void(!t && r.options.onHide && r.options.onHide(n || {})))
            }),
            _head_mdown: function(e) {
                if (!checkEvent(e)) {
                    (e.originalEvent || e).cancelBubble = !0;
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = curRBox.active == r.id,
                        s = e.pageY,
                        c = e.pageX,
                        u = r.wrap.offsetHeight,
                        d = r.wrap.offsetWidth,
                        l = 0,
                        f = 0,
                        h = a[0] - u,
                        p = a[1] - d,
                        m = browser.msie ? "selectstart" : "mousedown";
                    r.options.fixed && FastChat.pinTab(r.options.peer || -1, e, !0), o || r.focus(e), r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - u, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - d, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), l = t, f = n, cur._fcdrag = 1;
                    var _ = function(e) {
                            return l = Math.max(0, Math.min(h, t + e.pageY - s)), 10 > h - l ? l = h : 10 > l && (l = 0), r.wrap.style.top = l + "px", f = Math.max(0, Math.min(p, n + e.pageX - c)), 10 > p - f ? f = p : 10 > f && (f = 0), r.wrap.style.left = f + "px", cancelEvent(e)
                        },
                        g = function v(e) {
                            cur._fcdrag = 0, removeEvent(document, "mousemove", _), removeEvent(document, "mouseup", v), removeEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = l >= h - 5) && (setStyle(r.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(r.wrap, "fc_tobottom")), (r.toRight = f >= p - 5) && setStyle(r.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), r._update_pos();
                            var t = Math.abs(e.pageY - s) < 3 && Math.abs(e.pageX - c) < 3;
                            cur._fcpromo > 0 ? cur._fcpromo = t ? 0 : -1 : r.options.minimizer && t ? !r.minimized && o ? r.minimize(!0) : r.minimized && r.unminimize(!0) : r.options.onDragEnd && r.options.onDragEnd(r.toBottom ? -1 : l / a[0], r.toRight ? -1 : f / a[1])
                        };
                    return addEvent(document, "mousemove", _), addEvent(document, "mouseup", g), addEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = e.pageY,
                        s = e.pageX,
                        c = r.wrap.offsetHeight,
                        u = r.wrap.offsetWidth,
                        d = 0,
                        l = 0,
                        f = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                        h = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                        p = browser.msie ? "selectstart" : "mousedown",
                        m = !browser.msie && r.options.onResize || !1;
                    r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - c, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - u, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), r.options.onResizeStart && r.options.onResizeStart(f, h);
                    var _ = f + a[0] - t - c,
                        g = h + a[1] - n - u,
                        v = function(e) {
                            return d = Math.max(r.options.minH, Math.min(_, f + e.pageY - o)), 10 > _ - d && (d = _), r.resizeableH.style.height = d + "px", l = Math.max(r.options.minW, Math.min(g, h + e.pageX - s)), 10 > g - l && (l = g), r.resizeableW.style.width = l + "px", m && m(d, l), cancelEvent(e)
                        },
                        b = function C(e) {
                            removeEvent(document, "mousemove", v), removeEvent(document, "mouseup", C), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = d == _) && (setStyle(r.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(r.wrap, "fc_tobottom")), (r.toRight = l == g) && setStyle(r.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), r._update_pos(), r.options.onResizeEnd && r.options.onResizeEnd(d, l, a[0], a[1], r.toBottom, r.toRight)
                        };
                    return addEvent(document, "mousemove", v), addEvent(document, "mouseup", b), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, n) {
                var r = this;
                r.toBottom && (r.pos[0] = r.wrap.offsetTop), r.toRight && (r.pos[1] = r.wrap.offsetLeft);
                var i = {},
                    a = !1,
                    o = !1,
                    s = r.pos[0] + r.pos[2] - e,
                    c = r.pos[0],
                    u = r.resizeableH.clientHeight - r.options.minH,
                    d = r.pos[1] + r.pos[3] - t,
                    l = r.pos[1],
                    f = r.options.resize !== !1 ? r.resizeableW.clientWidth - r.options.minW : 0;
                n && (0 > f && setStyle(r.resizeableW, r.options.minW), 0 > u && setStyle(r.resizeableH, r.options.minH)), (0 >= s || 0 >= c && 0 >= u) && (0 >= d || 0 >= l && 0 >= f) || (s > 0 && c > 0 && (c = Math.min(s, c), s -= c, i.top = r.pos[0] - c, i.bottom = ""), s > 0 && u > 0 && (u = Math.min(s, u), a = r.resizeableH.clientHeight - u), d > 0 && l > 0 && (l = Math.min(d, l), d -= l, i.left = r.pos[1] - l, i.right = ""), d > 0 && f > 0 && (f = Math.min(d, f), o = r.resizeableW.clientWidth - f), o !== !1 && setStyle(r.resizeableW, "width", o), a !== !1 && setStyle(r.resizeableH, "height", a), setStyle(r.wrap, i), r._update_pos(), r.options.onResize && r.options.onResize(r.resizeableH.clientHeight, r.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                var t = curRBox.active != this.id;
                return t && (this.focus(e), !hasClass(e.target, "fc_editable")) ? cancelEvent(e) : void 0
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    n = curRBox.active,
                    r = n && curRBox.tabs[n];
                if (n != e.id) {
                    r && isFunction(r.options.onBlur) && r.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var a = i + curRBox.focused.length,
                        o = !0;
                    each(curRBox.focused, function(e, t) {
                        var n = curRBox.tabs[t].wrap;
                        o ? (addClass(n, "rb_active"), removeClass(n, "rb_inactive"), curRBox.active = t, o = !1) : (removeClass(n, "rb_active"), addClass(n, "rb_inactive")), setStyle(n, "zIndex", a), a--
                    })
                }
            },
            _hide_click: function() {
                this.hide()
            },
            minimize: function(e) {
                var t = this,
                    n = t.wrap;
                return t.options.fixed ? !1 : (addClass(n, "rb_minimized"), t.minimized = !0, t._update_pos(), void(e && t.options.onMinimize && t.options.onMinimize(0)))
            },
            unminimize: function(e) {
                var t = this,
                    n = t.wrap,
                    r = getWndInner();
                removeClass(n, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(r[0], r[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
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
                    n = curRBox.active != t.id || !0;
                return t._focus(), n && isFunction(t.options.onFocus) && t.options.onFocus(e), n
            },
            close: function() {
                var e = this,
                    t = e.pos;
                e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
            }
        }), window.RBox = r
    },
    175: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), window.TopNotifierCur || (window.TopNotifierCur = {
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
                    n = geByClass1("_notify_unread"),
                    r = e && !geByClass1("_top_notify_header"),
                    i = t && t.offsetHeight || n && n.offsetHeight;
                if (r) {
                    TopNotifierCur.header = se(e);
                    var a = ce("div", {
                        className: "top_notify_header_label"
                    });
                    TopNotifierCur.header.appendChild(a)
                } else var a = geByClass1("top_notify_header_label", TopNotifierCur.header);
                if (i) {
                    if (r || !geByClass1("top_notify_header_sup_label", a)) {
                        var o = ce("div", {
                                className: "top_notify_header_sup_label",
                                innerHTML: getLang("global_unread_notifications")
                            }),
                            s = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                        val(a, ""), a.appendChild(o), a.appendChild(s)
                    }
                } else(r || geByClass1("top_notify_header_sup_label", a)) && val(a, getLang("global_notifitications"));
                r && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (i ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
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
                    onDone: function(e, t, n, r) {
                        TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && TopNotifier.onLoad(e, t, n, r)
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
                    onDone: function(t, n) {
                        if (TopNotifierCur.scrollbar) {
                            if (t) {
                                for (var r = null, i = TopNotifier.getContentNode(), a = cf(t); r = a.firstChild;) i.insertBefore(r, e);
                                TopNotifier.refreshHeader()
                            }
                            return n ? void(TopNotifierCur.offset = n) : void re(e)
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
                        n = ge("top_notify_cont");
                    cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), n || (TopNotifierCur.wrapper = ce("div", {
                        innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                        id: "top_notify_wrap",
                        className: "scroll_fix_wrap top_notify_wrap"
                    }), t.appendChild(TopNotifierCur.wrapper), n = ge("top_notify_cont"));
                    var r = window.innerHeight || document.documentElement.clientHeight;
                    setStyle(n, {
                        maxHeight: Math.min(Math.max(r - 200, 300), 600)
                    });
                    var i = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new i(n, {
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
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                function n(e) {
                    if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                        var t = e.split(":"),
                            n = ls.get("ntfseen") || {};
                        2 == t.length && (n[0] = parseInt((new Date).getTime() / 1e3), n[t[0]] = t[1], ls.set("ntfseen", n))
                    }
                }
                if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                    var r = ge(TopNotifierCur.link),
                        i = {};
                    if (r) {
                        if ("shownow" == r.tt && removeAttr(r, "tt"), e) i.text = function() {
                            return e
                        }, t && (i.onHide = n.pbind(t));
                        else {
                            r.tt && r.tt.destroy && r.tt.destroy();
                            var a = ls.get("ntfseen") || {},
                                o = [];
                            each(a, function(e, t) {
                                o.push(e + ":" + t)
                            }), i = extend(i, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: o.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: n
                            })
                        }
                        var s = function c(e) {
                            setTimeout(function() {
                                return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void c(e) : (e && e.hide(), void Notifier.lcSend("hide_notify_tt"))
                            }, 6e3)
                        };
                        showTooltip(r, extend(i, {
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
            postTooltip: function(e, t, n) {
                return !1
            },
            hideRow: function(e, t, n) {
                var r = gpeByClass("_feed_row", e);
                if (!r) {
                    var i = gpeByClass("top_notify_wrap", e);
                    r = geByClass("_feed_row", i), r = r[r.length - 1]
                }
                ajax.post("/al_feed.php", {
                    act: "a_hide_notify",
                    item: t,
                    hash: n
                });
                var a = gpeByClass("_ui_menu_wrap", e);
                a && TopNotifier.hideActionsMenu(a), slideUp(r, 200, function() {
                    re(r);
                    var e = TopNotifier.getContentNode();
                    geByClass("feed_row", e).length ? TopNotifier.refreshHeader() : val(e, '<div class="top_notify_empty no_rows">' + getLang("news_no_new_notifications") + "</div>"), TopNotifier.refresh()
                })
            },
            deleteRow: function(e, t, n, r, i, a) {
                var o = ge("top_feedback_row" + e),
                    s = geByClass1("post_actions", o);
                TopNotifier.hideActionsMenu(geByClass1("_ui_menu_wrap", o)), ajax.post("al_feed.php", {
                    act: "a_feedback_delete",
                    item: t,
                    hash: r,
                    types: n,
                    candel: a,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", o),
                            n = geByClass1("_feedback_deleted", o);
                        n ? (n.innerHTML = '<span class="dld_inner">' + e + "</span>", show(n)) : o.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(o, "feedback_row_clickable") && addClass(o, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(s, "post_actions_progress"),
                    hideProgress: removeClass.pbind(s, "post_actions_progress")
                })
            },
            unifiedDeleteRow: function(e, t, n) {
                var r = gpeByClass("feedback_row_wrap", n),
                    i = domPN(r),
                    a = geByClass1("post_actions", i);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: e,
                    hash: t,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", r),
                            n = geByClass1("_feedback_deleted", r);
                        n ? (n.innerHTML = '<span class="dld_inner">' + e + "</span>", show(n)) : i.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(i, "feedback_row_clickable") && addClass(i, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(a, "post_actions_progress"),
                    hideProgress: removeClass.pbind(a, "post_actions_progress")
                })
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var n = t.target || t.srcElement,
                    r = 8,
                    i = !1,
                    a = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do
                    if (!n || n == e || n.onclick || n.onmousedown || inArray(n.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (i = n.className.match(a))) break; while (r-- && (n = n.parentNode));
                if (!i) return !1;
                if (n && n.className) {
                    for (var o = n.className.split(" "), s = "unknown", c = -1, u = geByClass("feedback_row"), r = 0; r < o.length; ++r) {
                        var d = o[r].match("feedback_(.+)_row");
                        if (o[r] && d && d[1]) {
                            s = d[1];
                            break
                        }
                    }
                    for (var r = 0; r < u.length; ++r)
                        if (u[r] == n) {
                            c = r;
                            break
                        }
                    statlogsValueEvent("feed_top_notify", 0, "click", s, c)
                }
                return n || !0
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
                var n = ge("top_feedback_row" + e);
                if (t = t || window.event, n && !hasClass(n, "feedback_row_expanded") && !checkEvent(t) && TopNotifier.checkClick(n, t)) {
                    var r = domNS(domPN(n));
                    show(r), re(domPN(n)), t.stopPropagation(), t.preventDefault()
                }
            },
            showActionsMenu: function(e) {
                var t = !1,
                    n = domClosest("_feed_row", e),
                    r = domPN(n);
                r.lastChild != n || hasClass(r, "feedback_sticky_rows") && domPN(r).lastChild != r || (t = {
                    appendParentCls: "top_notify_wrap",
                    processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
                }), uiActionsMenu.show(e, !1, t)
            },
            hideActionsMenu: function(e) {
                uiActionsMenu.hide(e)
            },
            frProcess: function(e, t, n, r) {
                if (!isButtonLocked(n)) {
                    var i;
                    i = r ? {
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
                    }, statlogsValueEvent("feed_top_notify", 0, "friends", i.act), ajax.post("/al_friends.php", i, {
                        onDone: function(t) {
                            var i = domPN(n);
                            val(i, t), addClass(i, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, r))
                        },
                        onFail: function(e) {
                            return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                        },
                        showProgress: lockButton.pbind(n),
                        hideProgress: unlockButton.pbind(n)
                    })
                }
            },
            grProcess: function(e, t, n, r) {
                if (!(hasClass(n, "flat_button") && isButtonLocked(n) || domFC(n) && "progress_inline" == domFC(n))) {
                    var i = -2 == r ? "spam" : r ? "enter" : "leave",
                        a = -1 == r ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: i,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: a
                    }, {
                        onDone: function(e) {
                            var t = domPN(n);
                            val(t, e), addClass(t, "feedback_buttons_response")
                        },
                        onFail: function(e) {
                            return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                        },
                        showProgress: function() {
                            if (-2 == r) {
                                n.oldhtml = n.innerHTML;
                                var e = getSize(n)[0];
                                n.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(n), {
                                    width: e
                                })
                            } else lockButton(n)
                        },
                        hideProgress: function() {
                            -2 == r ? n.innerHTML = n.oldhtml : unlockButton(n)
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
    177: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n;
            if (window.vk.lpConfig.debug) {
                for (var r = "background: " + e + "; color: white", i = new Date, a = function(e) {
                        return 10 > e ? "0" + e : e
                    }, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; o > c; c++) s[c - 2] = arguments[c];
                (n = console).log.apply(n, ["%c " + i.getHours() + ":" + a(i.getMinutes()) + ":" + a(i.getSeconds()) + ":" + i.getMilliseconds() + " " + t + " ", r].concat(s))
            }
        }

        function i() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function a() {
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
            window.lpWeird.length && (Object(h.imWeirdLog)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function c() {
            var e = Date.now() - 3e4;
            window.lpBufferFc = i().filter(function(t) {
                return t.time > e
            }), window.lpBufferIm = a().filter(function(t) {
                return t.time > e
            })
        }

        function u() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            u() && (a().forEach(function(e) {
                var t = i().find(function(t) {
                    return e.ev === t.ev
                });
                !t && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, r("red", "im not fc", e.ev), Object(h.isWeirdLogging)() && o("im not fc", e.ev))
            }), i().forEach(function(e) {
                var t = a().find(function(t) {
                    return t.ev === e.ev
                });
                t && t.warned && !e.warned && (e.warned = !0, r("red", "now fc like im", e.ev), Object(h.isWeirdLogging)() && o("now fc like im", e.ev))
            })), c()
        }

        function l(e) {
            if (u()) {
                var t;
                (t = i()).push.apply(t, e.map(function(e) {
                    return {
                        time: Date.now(),
                        ev: JSON.stringify(e),
                        warned: !1
                    }
                })), setTimeout(d, 0)
            }
            r.apply(void 0, ["green", "fc"].concat(e))
        }

        function f(e) {
            if (u()) {
                var t;
                (t = a()).push.apply(t, e.map(function(e) {
                    return {
                        time: Date.now(),
                        ev: JSON.stringify(e),
                        warned: !1
                    }
                })), setTimeout(d, 1100)
            }
            r.apply(void 0, ["blue", "im"].concat(e))
        }
        n.r(t), n.d(t, "lpLogFc", function() {
            return r
        }), n.d(t, "longpollTesting_onFcEvents", function() {
            return l
        }), n.d(t, "longpollTesting_onImEvents", function() {
            return f
        });
        var h = n(131);
        window.longpollTesting_onImEvents = f
    },
    181: function(e, t, n) {
        "use strict";

        function r(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        }

        function i(e, t) {
            return t = r(t) || document, t.getElementsByTagName(e)
        }

        function a(e, t) {
            return t = r(t) || document, t.querySelector && t.querySelector(e) || i(e, t)[0]
        }

        function o(e, t, n) {
            t = r(t) || document, n = n || "*";
            var a = [];
            if (t.querySelectorAll && "*" != n) return t.querySelectorAll(n + "." + e);
            if (t.getElementsByClassName) {
                var o = t.getElementsByClassName(e);
                if ("*" != n) {
                    n = n.toUpperCase();
                    for (var s = 0, c = o.length; c > s; ++s) o[s].tagName.toUpperCase() == n && a.push(o[s])
                } else a = Array.prototype.slice.call(o);
                return a
            }
            for (var u = i(n, t), d = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, c = u.length; c > s; ++s) d.test(u[s].className) && a.push(u[s]);
            return a
        }

        function s(e, t, n) {
            return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || o(e, t, n)[0]
        }

        function c(e, t, n) {
            if (t = r(t), !t) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ee(t, e)) return t;
            return null
        }

        function u(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function d(e, t) {
            return (t || document).querySelector(e)
        }

        function l(e, t) {
            return ee(t, e) ? t : c(e, t)
        }

        function f(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : h(e, t)
        }

        function h(e, t) {
            if (t = r(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function p(e, t, n) {
            var r = document.createElement(e);
            return t && extend(r, t), n && ue(r, n), r
        }

        function m(e) {
            return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function _(e) {
            return N(p("div", {
                innerHTML: e
            }))
        }

        function g(e) {
            return O(p("div", {
                innerHTML: e
            }))
        }

        function v(e, t) {
            return each(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof n ? "" : n).toString().replace(/\$/g, "&#036;"))
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

        function O(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function E(e, t) {
            var n = F(t);
            return n && n.insertBefore(e, t)
        }

        function S(e, t) {
            var n = F(t);
            return n && n.insertBefore(e, w(t))
        }

        function x(e, t) {
            return e ? s(t, e) : e
        }

        function I(e, t, n) {
            return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function j(e) {
            for (var t = 0; null != (e = k(e));) t++;
            return t
        }

        function L(e, t) {
            do e = F(e); while (e && !R(e, t));
            return e
        }

        function M(e, t, n) {
            for (var r = null; null === r && e;) e = -1 === n ? k(e) : w(e), e && R(e, t) && (r = e);
            return r
        }

        function R(e, t) {
            if (e = r(e), !e || e == document) return !1;
            var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
                for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t[n] !== this;);
                return n > -1
            };
            return n.call(e, t)
        }

        function A(e) {
            return R(e, ":hover")
        }

        function P(e, t) {
            var n = r(e);
            if (t = r(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n == t) return !0;
            return !1
        }

        function D() {
            var e = browser.msie6 ? r("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function B(e, t) {
            t = t || {};
            for (var n = t.fromEl || F(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
                var i = ce(n, "position");
                if (inArray(i, r) && (!t.noOverflow || "hidden" != ce(n, "overflow"))) break;
                n = F(n)
            }
            return n
        }

        function H(e, t) {
            e = r(e);
            for (var n, i, a, o, s = e; s && s.tagName && s !== bodyNode && (n = ce(s, "position"), i = ce(s, "overflow"), a = ce(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === i || ("static" === n ? o && "relative" !== o : "fixed" === o));) "none" !== a ? o = void 0 : "static" !== n && "fixed" !== o && (o = n), s = F(s);
            return s
        }

        function q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; t > n; n++) q(arguments[n]);
            else if (e = r(e), e && e.style) {
                var i = e.olddisplay,
                    a = "block",
                    o = e.tagName.toLowerCase();
                e.style.display = i || "", "none" === ce(e, "display") && (a = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
            }
        }

        function z(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; t > n; n++) z(arguments[n]);
            else if (e = r(e), e && e.style) {
                var i = ce(e, "display");
                e.olddisplay = "none" != i ? i : "", e.style.display = "none"
            }
        }

        function W(e) {
            return e = r(e), e && e.style ? "none" != ce(e, "display") : !1
        }

        function U() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function G(e, t, n) {
            e = r(e), n = n || 0;
            var i = Y(e)[1],
                a = X(e)[1],
                o = window,
                s = document.documentElement,
                c = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
                u = r("page_header_cont"),
                d = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                l = vk.staticheader ? Math.max(0, X(u)[1] - d) : X(u)[1];
            if (t) {
                if (d + l + n > i + a) return i + a - d - l - n;
                if (i > d + c - n) return i - d - c + n
            } else {
                if (d + l + n > i) return i - d - l - n;
                if (i + a > d + c - n) return i + a - d - c + n
            }
            return 0
        }

        function V(e, t) {
            return void 0 === t && (t = !W(e)), t ? q(e) : z(e), t
        }

        function K(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function Q(e, t) {
            var n;
            if (t && "inline" == ce(e, "display")) {
                var r = e.getClientRects();
                n = r && r[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function Y(e, t) {
            if (e = r(e), !e) return [0, 0];
            var n, i, a = {
                    top: 0,
                    left: 0
                },
                o = e.ownerDocument;
            return o ? (n = o.documentElement, K(e) && (a = Q(e, !0)), i = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [a.left + (t ? 0 : i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), a.top + (t ? 0 : i.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
        }

        function $(e) {
            return null != e && e === e.window
        }

        function X(e, t, n) {
            e = r(e);
            var i, a = [0, 0],
                o = document.documentElement;
            if (t && "border-box" === ce(e, "boxSizing") && (t = !1), e == document) a = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var s = function() {
                    a = K(e) && (i = Q(e, n)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t && each(a, function(t, n) {
                        var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(r, function() {
                            a[t] -= parseFloat(ce(e, "padding" + this)) || 0, a[t] -= parseFloat(ce(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (W(e)) s();
                else {
                    var c = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        u = {},
                        d = !1;
                    e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), each(c, function(t, n) {
                        u[t] = e.style[t], e.style[t] = n
                    }), s(), each(c, function(t, n) {
                        e.style[t] = u[t]
                    }), d && (e.style.cssText = d)
                }
            }
            return a
        }

        function J(e) {
            return X(e)[0]
        }

        function Z(e) {
            return X(e)[1]
        }

        function ee(e, t) {
            return e = r(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
        }

        function te(e, t) {
            (e = r(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
        }

        function ne(e, t) {
            return setTimeout(te.pbind(e, t), 0)
        }

        function re(e, t) {
            (e = r(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }

        function ie(e, t) {
            return setTimeout(re.pbind(e, t), 0)
        }

        function ae(e, t, n) {
            return void 0 === n && (n = !ee(e, t)), (n ? te : re)(e, t), n
        }

        function oe(e, t, n) {
            return void 0 === n && (n = !ee(e, t)), (n ? ne : ie)(e, t), n
        }

        function se(e, t, n) {
            re(e, t), te(e, n)
        }

        function ce(e, t, n) {
            if (e = r(e), isArray(t)) {
                var i = {};
                return each(t, function(t, n) {
                    i[n] = ce(e, n)
                }), i
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
                var a = e.style.filter;
                return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var o, s = document.defaultView || window;
            if (s.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var c = s.getComputedStyle(e, null);
                c && (o = c.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" == t && browser.msie) {
                    var a = e.currentStyle.filter;
                    return a && a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var u = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                o = e.currentStyle[t] || e.currentStyle[u], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            i = r.left,
                            a = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, o[t] = r.pixelLeft + "px", r.left = i, e.runtimeStyle.left = a
                    }
                }), o = o.join(" ")
            }
            if (n && ("width" == t || "height" == t)) {
                var d = X(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                o = (intval(o) ? Math.max(floatval(o), d) : d) + "px"
            }
            return o
        }

        function ue(e, t, n) {
            if (e = r(e)) {
                if ("object" == ("undefined" == typeof t ? "undefined" : Te(t))) return each(t, function(t, n) {
                    ue(e, t, n)
                });
                if ("opacity" == t) browser.msie && ((n + "").length ? 1 !== n ? e.style.filter = "alpha(opacity=" + 100 * n + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
                else try {
                    var i = "number" == typeof n;
                    i && /height|width/i.test(t) && (n = Math.abs(n)), n = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
                } catch (a) {
                    debugLog("setStyle error: ", [t, n], a)
                }
            }
        }

        function de(e, t, n) {
            setTimeout(ue.pbind(e, t, n), 0)
        }

        function le(e, t, n) {
            var i = fe(e, "pseudo-id");
            i || (fe(e, "pseudo-id", i = irand(1e8, 999999999)), te(e, "_pseudo_" + i));
            var a = t + "-style-" + i,
                o = r(a),
                s = "._pseudo_" + i + ":" + t + "{";
            o || (o = headNode.appendChild(p("style", {
                id: a,
                type: "text/css"
            }))), each(n, function(e, t) {
                s += e + ": " + t + " !important;"
            }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
        }

        function fe(e, t, n) {
            if (!e) return !1;
            var r, i = e[vkExpand];
            return i || (i = e[vkExpand] = ++vkUUID), n !== r && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = n), t ? vkCache[i] && vkCache[i][t] : i;
        }

        function he(e, t, n) {
            return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function pe(e) {
            for (var t = 0, n = arguments.length; n > t; ++t) {
                var r = arguments[t];
                if (void 0 !== e[r]) try {
                    delete e[r]
                } catch (i) {
                    try {
                        e.removeAttribute(r)
                    } catch (i) {}
                }
            }
        }

        function me(e, t) {
            var n = e ? e[vkExpand] : !1;
            if (n)
                if (t) {
                    if (vkCache[n]) {
                        delete vkCache[n][t], t = "";
                        var r = 0;
                        for (t in vkCache[n])
                            if ("__elem" !== t) {
                                r++;
                                break
                            }
                        r || me(e)
                    }
                } else removeEvent(e), pe(e, vkExpand), delete vkCache[n]
        }

        function _e() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = r(e[t]);
                n && (me(n), pe(n, "btnevents"))
            }
        }

        function ge(e, t, n) {
            if (e = r(e), e && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var i = a("b", e);
                    i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function ve() {
            var e = r("zoom_test_1") || document.body.appendChild(p("div", {
                    id: "zoom_test_1"
                }, {
                    left: "10%",
                    position: "absolute",
                    visibility: "hidden"
                })),
                t = r("zoom_test_2") || document.body.appendChild(p("div", {
                    id: "zoom_test_2"
                }, {
                    left: e.offsetLeft + "px",
                    position: "absolute",
                    visibility: "hidden"
                }));
            return t.offsetLeft / e.offsetLeft
        }

        function be(e, t, n) {
            return (e = r(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
        }

        function Ce(e, t, n) {
            e = r(e);
            try {
                if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                    var i = e.createTextRange();
                    i.collapse(!0), i.moveEnd("character", n), i.moveStart("character", t), i.select()
                } else e.setSelectionRange && e.setSelectionRange(t, n)
            } catch (a) {}
        }

        function ye(e, t, n) {
            for (e = r(e), n = n || 999; e && !t(e);) {
                if (n--, 0 == n) return !1;
                try {
                    if (e = F(e), e == document) break
                } catch (i) {
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
        n.r(t), n.d(t, "ge", function() {
            return r
        }), n.d(t, "geByTag", function() {
            return i
        }), n.d(t, "geByTag1", function() {
            return a
        }), n.d(t, "geByClass", function() {
            return o
        }), n.d(t, "geByClass1", function() {
            return s
        }), n.d(t, "gpeByClass", function() {
            return c
        }), n.d(t, "domQuery", function() {
            return u
        }), n.d(t, "domQuery1", function() {
            return d
        }), n.d(t, "domClosest", function() {
            return l
        }), n.d(t, "domClosestByTag", function() {
            return f
        }), n.d(t, "gpeByTag", function() {
            return h
        }), n.d(t, "ce", function() {
            return p
        }), n.d(t, "re", function() {
            return m
        }), n.d(t, "se", function() {
            return _
        }), n.d(t, "sech", function() {
            return g
        }), n.d(t, "rs", function() {
            return v
        }), n.d(t, "psr", function() {
            return b
        }), n.d(t, "domReplaceEl", function() {
            return C
        }), n.d(t, "domEL", function() {
            return y
        }), n.d(t, "domNS", function() {
            return w
        }), n.d(t, "domPS", function() {
            return k
        }), n.d(t, "domFC", function() {
            return N
        }), n.d(t, "domLC", function() {
            return T
        }), n.d(t, "domPN", function() {
            return F
        }), n.d(t, "domChildren", function() {
            return O
        }), n.d(t, "domInsertBefore", function() {
            return E
        }), n.d(t, "domInsertAfter", function() {
            return S
        }), n.d(t, "domByClass", function() {
            return x
        }), n.d(t, "domData", function() {
            return I
        }), n.d(t, "domChildIndex", function() {
            return j
        }), n.d(t, "domCA", function() {
            return L
        }), n.d(t, "domClosestSibling", function() {
            return M
        }), n.d(t, "matchesSelector", function() {
            return R
        }), n.d(t, "isHover", function() {
            return A
        }), n.d(t, "isAncestor", function() {
            return P
        }), n.d(t, "getScroll", function() {
            return D
        }), n.d(t, "domClosestPositioned", function() {
            return B
        }), n.d(t, "domClosestOverflowHidden", function() {
            return H
        }), n.d(t, "show", function() {
            return q
        }), n.d(t, "hide", function() {
            return z
        }), n.d(t, "isVisible", function() {
            return W
        }), n.d(t, "clientHeight", function() {
            return U
        }), n.d(t, "getClientRectOffsetY", function() {
            return G
        }), n.d(t, "toggle", function() {
            return V
        }), n.d(t, "boundingRectEnabled", function() {
            return K
        }), n.d(t, "getXYRect", function() {
            return Q
        }), n.d(t, "getXY", function() {
            return Y
        }), n.d(t, "isWindow", function() {
            return $
        }), n.d(t, "getSize", function() {
            return X
        }), n.d(t, "getW", function() {
            return J
        }), n.d(t, "getH", function() {
            return Z
        }), n.d(t, "hasClass", function() {
            return ee
        }), n.d(t, "addClass", function() {
            return te
        }), n.d(t, "addClassDelayed", function() {
            return ne
        }), n.d(t, "removeClass", function() {
            return re
        }), n.d(t, "removeClassDelayed", function() {
            return ie
        }), n.d(t, "toggleClass", function() {
            return ae
        }), n.d(t, "toggleClassDelayed", function() {
            return oe
        }), n.d(t, "replaceClass", function() {
            return se
        }), n.d(t, "getStyle", function() {
            return ce
        }), n.d(t, "setStyle", function() {
            return ue
        }), n.d(t, "setStyleDelayed", function() {
            return de
        }), n.d(t, "setPseudoStyle", function() {
            return le
        }), n.d(t, "data", function() {
            return fe
        }), n.d(t, "attr", function() {
            return he
        }), n.d(t, "removeAttr", function() {
            return pe
        }), n.d(t, "removeData", function() {
            return me
        }), n.d(t, "cleanElems", function() {
            return _e
        }), n.d(t, "setTitle", function() {
            return ge
        }), n.d(t, "getZoom", function() {
            return ve
        }), n.d(t, "val", function() {
            return be
        }), n.d(t, "elfocus", function() {
            return Ce
        }), n.d(t, "traverseParent", function() {
            return ye
        }), n.d(t, "setDocumentTitle", function() {
            return we
        }), n.d(t, "lockDocumentTitle", function() {
            return ke
        });
        var Ne = n(113),
            Te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
        window.cf = function(e) {
            var t = e.createDocumentFragment(),
                n = e.createElement("div"),
                r = e.createRange && e.createRange();
            return t.appendChild(n), r && r.selectNodeContents(n), r && r.createContextualFragment ? function(t) {
                return t ? r.createContextualFragment(t) : e.createDocumentFragment()
            } : function(t) {
                if (!t) return e.createDocumentFragment();
                n.innerHTML = t;
                for (var r = e.createDocumentFragment(); n.firstChild;) r.appendChild(n.firstChild);
                return r
            }
        }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var n in t)
                    if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + Object(Ne.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Fe = !1;
        window.ge = r, window.geByTag = i, window.geByTag1 = a, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = c, window.domQuery = u, window.domQuery1 = d, window.domClosest = l, window.ce = p, window.re = m, window.se = _, window.sech = g, window.rs = v, window.psr = b, window.domReplaceEl = C, window.domEL = y, window.domNS = w, window.domPS = k, window.domFC = N, window.domLC = T, window.domPN = F, window.domChildren = O, window.domInsertBefore = E, window.domInsertAfter = S, window.domByClass = x, window.domData = I, window.domChildIndex = j, window.domCA = L, window.domClosestSibling = M, window.matchesSelector = R, window.isHover = A, window.isAncestor = P, window.getScroll = D, window.domClosestPositioned = B, window.domClosestOverflowHidden = H, window.show = q, window.hide = z, window.isVisible = W, window.clientHeight = U, window.getClientRectOffsetY = G, window.toggle = V, window.boundingRectEnabled = K, window.getXYRect = Q, window.getXY = Y, window.isWindow = $, window.getSize = X, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = ie, window.toggleClass = ae, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = ce, window.setStyle = ue, window.setStyleDelayed = de, window.setPseudoStyle = le, window.data = fe, window.attr = he, window.removeAttr = pe, window.removeData = me, window.cleanElems = _e, window.setTitle = ge, window.getZoom = ve, window.val = be, window.elfocus = Ce, window.traverseParent = ye, window.getH = Z, window.getW = J, window.domClosestByTag = f, window.setDocumentTitle = we, window.lockDocumentTitle = ke
    },
    189: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = domData(t, "chat-id"),
                r = domData(t, "hash");
            return lockButton(t), Object(a.joinChat)(n, r, e.get()).then(function(n) {
                var r = c(n, 1),
                    i = r[0];
                unlockButton(t), e.get().longpoll.push([Object(s.changePeer)(i)])
            })["catch"](function(e) {
                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
            })
        }

        function i(e, t) {
            var n = Object(o.createModule)({
                handlers: function(n, i) {
                    i(e, "click", u, function(e) {
                        return r(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(o.destroyModule)(n)
                }
            }
        }
        n.r(t), n.d(t, "mount", function() {
            return i
        });
        var a = n(85),
            o = n(46),
            s = n(59),
            c = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = "_im_join_chat"
    },
    199: function(e, t, n) {
        "use strict";

        function r(e) {
            if (!e.first_name) {
                var t = e.name.split(" ", 2);
                e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
            }
            e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
        }

        function i(e, t) {
            var n = Object(s.unpackStore)(e);
            return t in n.oCache
        }

        function a(e, t) {
            var n = Object(s.unpackStore)(e).oCache[t];
            return n && !n._n && (r(n), n._n = 1), n
        }

        function o(e, t) {
            var n = Object(s.unpackStore)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
        n.r(t), n.d(t, "oCacheExists", function() {
            return i
        }), n.d(t, "oCacheGet", function() {
            return a
        }), n.d(t, "oCacheAdd", function() {
            return o
        });
        var s = n(119)
    },
    200: function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (t && t.status && e.lpstat) {
                var n = Math.floor(t.status / 100);
                t.status >= 500 && t.status < 600 && v("fc_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), k[n] = n in k ? k[n] + 1 : 1, Date.now() - N >= w && (Object.keys(k).forEach(function(e) {
                    v("fc_longpoll", k[e], e + "0x", t.getResponseHeader("x-frontend"))
                }), k = {}, N = Date.now())
            }
        }

        function i(e) {
            return Object(h.post)(h.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function a(e, t) {
            e.waitAbortFns.push(t)
        }

        function o(e, t) {
            var n = t.failed ? Object(f.abortablePause)(y, null) : {},
                r = n.abort,
                o = n.pause;
            switch (t.failed) {
                case 1:
                    return Object(m.lpLogFc)("red", "LP failed: old timestamp; resync, next ts", t.ts), e.onResult({
                        ts: t.ts,
                        updates: [
                            [-1]
                        ]
                    }), a(e, r), o().then(function() {
                        return c(e)
                    });
                case 2:
                    return Object(m.lpLogFc)("red", "LP failed: key is incorrect; refresh key"), a(e, r), i(e).then(function(t) {
                        var n = _(t, 4),
                            r = n[0],
                            i = n[1],
                            a = n[2],
                            o = n[3];
                        return e.onResult({
                            ts: +o,
                            updates: [
                                [-2, r, i + "/" + a],
                                [-1]
                            ]
                        })
                    }).then(o).then(function() {
                        return c(e)
                    });
                case 3:
                    throw window.nav.reload({
                        force: !0
                    }), new Error("ts is very wrong");
                default:
                    return t
            }
        }

        function s(e) {
            return e.map(function(e) {
                switch (e[0]) {
                    case 0:
                        return p.deleteEvent(e);
                    case 1:
                        return p.replaceFlagsEvent(e);
                    case 2:
                        return p.setFlagsEvent(e);
                    case 3:
                        return p.resetFlagsEvent(e);
                    case 4:
                        return p.addMessageEvent(e);
                    case 5:
                        return p.editMessageEvent(e);
                    case 6:
                        return p.readInboundEvent(e);
                    case 7:
                        return p.readOutboundEvent(e);
                    case 8:
                        return p.gotOnlineEvent(e);
                    case 9:
                        return p.gotOfflineEvent(e);
                    case 10:
                        return p.resetDirectoriesEvent(e);
                    case 11:
                        return p.replaceDirectoriesEvent(e);
                    case 12:
                        return p.setDirectoriesEvent(e);
                    case 13:
                        return p.deleteDialogEvent(e);
                    case 51:
                        return p.chatChangedEvent(e);
                    case 52:
                        return p.chatUpdatedEvent(e);
                    case 63:
                        return p.typingEvent(e);
                    case 70:
                        return p.videoCallEvent(e);
                    case 80:
                        return p.unreadCountEvent(e);
                    case 114:
                        return p.notifySettingsChangedEvent(e);
                    case 116:
                        return p.refreshMessageEvent(e);
                    case -1:
                        return p.resyncEvent();
                    case -2:
                        return p.refreshLpKeyEvent(e);
                    default:
                        return p.emptyEvent(e)
                }
            })
        }

        function c(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(h.plaingetCancelable)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                n = t.request,
                i = t.cancel;
            return e.stopFn = i, n.then(function(t) {
                var n = _(t, 2),
                    i = n[0],
                    a = n[1];
                return r(e, a), e.waitTimeout = 2, JSON.parse(i)
            })["catch"](function(t) {
                var n = _(t, 2),
                    i = n[0],
                    a = n[1];
                throw r(e, a), i
            }).then(function(t) {
                return o(e, t)
            })
        }

        function u(e) {
            e.isStoppedFn() || c(e).then(e.onResult)["catch"](function(t) {
                return d(e, t)
            }).then(function() {
                return u(e)
            })
        }

        function d(e, t) {
            if (!e.isStoppedFn()) {
                window.topError(t), Object(m.lpLogFc)("red", "LP error", t.message || "no message (probably browser reset)"), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
                var n = Object(f.abortablePause)(e.waitTimeout, null),
                    r = n.abort,
                    i = n.pause;
                return a(e, r), i()
            }
        }

        function l(e, t) {
            function n(e, n, r) {
                i.ts = n;
                for (var a = 0; a < r.length; ++a) r[a].type === p.REFRESH_LP_KEY && (i.key = r[a].key, i.url = r[a].url);
                t(e, n, r)
            }
            var r = !!e.stopped,
                i = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: C,
                    mode: b,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: function() {
                        return r
                    },
                    onResult: function(e) {
                        e.ts && n(i.ts, e.ts, s(e.updates))
                    }
                },
                a = {
                    options: i,
                    isStopped: function() {
                        return r
                    },
                    stopConnection: function() {
                        r = !0, i.stopFn && i.stopFn(), i.stopFn = void 0, this.abortWaiting()
                    },
                    reinitConnection: function() {
                        this.stopConnection(), r = !1, u(i)
                    },
                    abortWaiting: function() {
                        i.waitAbortFns.forEach(function(e) {
                            return e()
                        }), i.waitAbortFns = [], i.waitTimeout = 2
                    },
                    onLp: n
                };
            return u(i), a
        }
        n.r(t), n.d(t, "createLongPoll", function() {
            return l
        });
        var f = n(95),
            h = n(141),
            p = n(59),
            m = n(177),
            _ = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            g = window,
            v = g.statlogsValueEvent,
            b = 202,
            C = 5,
            y = 4,
            w = 3e4,
            k = {},
            N = Date.now()
    },
    204: function(e, t, n) {
        "use strict";

        function r() {
            return b.lpConfig && b.lpConfig.enabled
        }

        function i() {
            return window.curNotifier && window.curNotifier.lp_connected
        }

        function a() {
            return window.curNotifier && window.curNotifier.is_server || window.browser.safari
        }

        function o(e, t, n) {
            window.Notifier.lcSend("lp_data", {
                tsOld: e,
                tsNow: t,
                evs: n
            }), Object(_.lpLogFc)("silver", "broadcast to others", e, t, n)
        }

        function s(e, t, n) {
            y.onLp(e, t, n), i() && a() && (e != t || n.length) && o(e, t, n)
        }

        function c() {
            b.lpConfig.id = b.id, window.lpConnect = C = Object(p.createLongPoll)(b.lpConfig, s)
        }

        function u() {
            var e = Object(m.createLongpollEventsQueue)(b.lpConfig.ts, function(e) {
                    Object(_.longpollTesting_onFcEvents)(e), t.trigger("data", e)
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
                onLp: function(t, n, r) {
                    e.onLp(t, n, r)
                }
            }
        }

        function d() {
            return r() ? (y || (c(), u()), y) : null
        }

        function l() {
            r() && (Object(_.lpLogFc)("orange", "init longpoll connection on load"), d(), window.curNotifier.idle_manager.on("unidle", function() {
                C.abortWaiting()
            }), f())
        }

        function f() {
            return r() ? i() ? void(C.isStopped() && a() ? (Object(_.lpLogFc)("orange", "now master, init connection"), Object(g.imWeirdLog)("fc_longpoll_master", {}, !1), C.reinitConnection()) : C.isStopped() || a() || (Object(_.lpLogFc)("orange", "now slave, stop connection"), Object(g.imWeirdLog)("fc_longpoll_slave", {}, !1), C.stopConnection())) : void setTimeout(f, 500) : void 0
        }

        function h(e) {
            i() && !a() && r() && (Object(_.lpLogFc)("silver", "recv from master", e.tsOld, e.tsNow, e.evs), C.onLp(e.tsOld, e.tsNow, e.evs))
        }
        n.r(t), n.d(t, "lpSingleton_getInstance", function() {
            return d
        }), n.d(t, "lpSingleton_onTabInitialLoaded", function() {
            return l
        }), n.d(t, "lpSingleton_syncWithNotifier", function() {
            return f
        }), n.d(t, "lpSingleton_onNotifierRecv", function() {
            return h
        });
        var p = n(200),
            m = n(64),
            _ = n(177),
            g = n(131),
            v = window,
            b = v.vk,
            C = window.lpConnect,
            y = window.lpInstance
    },
    206: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = s.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var r = void 0, i = 0; i < n.length; i++) {
                        var a = o(n[i], 2),
                            c = a[0],
                            u = a[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = u(e, e.target) : (r = gpeByClass(c, e.target, e.currentTarget)) && (d = u(e, r)), d === !1) break
                    }
            }
        }

        function i(e, t, n, i) {
            var a = s.get(e);
            a || (s.set(e, {}), a = s.get(e));
            for (var o = t.split(" "), c = 0; c < o.length; c++) {
                var u = o[c];
                a[u] || (a[u] = [], addEvent(e, u, r)), a[u].push([n, i])
            }
        }

        function a(e, t, n, i) {
            var a = s.get(e);
            if (a) {
                t.split(" ").forEach(function(t) {
                    a[t] && (a[t] = a[t].filter(function(e) {
                        return e[0] !== n || e[1] !== i
                    }), 0 === a[t].length && removeEvent(e, t, r))
                });
                var o = Object.keys(a).map(function(e) {
                    return a[e].length
                }).reduce(function(e, t) {
                    return e + t
                });
                0 === o && s["delete"](e)
            }
        }
        n.r(t), n.d(t, "addDelegateEvent", function() {
            return i
        }), n.d(t, "removeDelegateEvent", function() {
            return a
        });
        var o = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = new window.Map
    },
    24: function(e, t, n) {
        "use strict";

        function r() {
            return !curFastChat.version || !curFastChat.tabs
        }
        n.r(t);
        var i = n(127),
            a = n(79),
            o = n(158),
            s = 1e4;
        window.curFastChat || (window.curFastChat = {}), window.FastChat = {
            init: function(e) {
                extend(curFastChat, {
                    tabs: {},
                    needPeers: {},
                    gotPeers: {},
                    needMedia: {},
                    gotMedia: {},
                    ldb: Object(i.mount)(vk.id),
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
                    n = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version", "im_queue", "cl_queue"];
                for (e in n) {
                    if ("cl_queue" != n[e] && void 0 === curFastChat[n[e]]) return;
                    t[n[e]] = curFastChat[n[e]]
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
                    n = function r() {
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
                                return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(r, 1e3 * t), !0
                            }
                        }) : (clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(r, 1e3 * t)))
                    };
                n()
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
                        if (r()) break;
                        FastChat.standby(t.version);
                        break;
                    case "gotConfig":
                        FastChat.gotConfig(t.navVersion, t.config);
                        break;
                    case "clFeed":
                        if (r()) break;
                        FastChat.clFeed(t.events);
                        break;
                    case "clistOnlines":
                        if (r()) break;
                        FastChat.clistGotOnlines(t);
                        break;
                    case "imFeeds":
                        if (r()) break;
                        FastChat.imFeeds(t);
                        break;
                    case "needPeer":
                        if (r()) break;
                        var n, i = t.id,
                            a = curFastChat.tabs[i],
                            o = !1;
                        if (void 0 !== a) {
                            o = {
                                name: a.name,
                                photo: a.photo,
                                fname: a.fname,
                                hash: a.hash,
                                sex: a.sex,
                                data: a.data,
                                online: a.online
                            };
                            for (var s in a.msgs) {
                                o.history = [a.log.innerHTML, a.msgs];
                                break
                            }
                        } else(n = curFastChat.friends[i + "_"]) && (o = {
                            name: n[0],
                            photo: n[1],
                            fname: n[2],
                            hash: n[3],
                            data: n[4],
                            online: curFastChat.onlines[i]
                        });
                        if (o === !1) break;
                        curFastChat.gotPeers[i] = setTimeout(function() {
                            var e = {};
                            e[i] = o, FastChat.lcSend("gotPeers", e)
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingPeers":
                        if (r()) break;
                        each(t, function(e, t) {
                            var n = curFastChat.needPeers[e];
                            n && (t & n[0]) == n[0] && clearTimeout(n[2])
                        });
                        break;
                    case "gotPeers":
                        if (r()) break;
                        FastChat.gotPeers(t);
                        break;
                    case "stateChange":
                        if (r()) break;
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
                            d = curFastChat.needMedia[c];
                        if (void 0 === d || 0 === curFastChat.gotMedia[c]) break;
                        clearTimeout(d[1]), d[1] = setTimeout(FastChat.loadMsgMedia.pbind(d[0], c), 1e3);
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
                        n = !1;
                    each(e, function() {
                        var e = this.split("<!>"),
                            r = e[0],
                            i = e[1],
                            a = e[2],
                            o = e[3] ? e[3] : 1,
                            s = curFastChat.tabs[a],
                            c = curFastChat.onlines[a];
                        if (r != curFastChat.version) return FastChat.updateVersion(r), n = !0, !1;
                        if (curFastChat.friends[a + "_"] || s) switch (i) {
                            case "online":
                                if (c == o) break;
                                curFastChat.onlines[a] = o, FastChat.tabNotify(a, "online", o), t = !0;
                                break;
                            case "offline":
                                if (!c) break;
                                delete curFastChat.onlines[a], re("fc_contact" + a) && curFastChat.clistBox.visible && FastChat.clistShowMore(), FastChat.tabNotify(a, "offline")
                        }
                    }), n || (t && curFastChat.clistBox.visible && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle())
                }
            },
            imChecked: function(e, t) {
                if (curFastChat.inited && curFastChat.ready && curFastChat.im_queue) {
                    if (t.failed) return clearTimeout(curFastChat.lp_error_to), void(curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)));
                    if (t.ts && curFastChat.im_queue && (t.key && (curFastChat.im_queue.key = t.key), curFastChat.im_queue.ts = t.ts, FastChat.lcSend("queueSet", {
                            im_queue: curFastChat.im_queue
                        })), isArray(t.events) && t.events.length) {
                        var n = {},
                            r = !1;
                        each(t.events, function() {
                            var e = this.split("<!>"),
                                t = e[0],
                                i = e[1],
                                a = e[2],
                                o = 0;
                            if (t != curFastChat.version) return FastChat.updateVersion(t), r = !0, !1;
                            switch (i) {
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
                            n[a] || (n[a] = [0]), n[a][0] |= o, n[a].push(e)
                        }), r || isEmpty(n) || (FastChat.lcSend("imFeeds", n), FastChat.imFeeds(n))
                    }
                }
            },
            imFeeds: function(e) {
                curFastChat.inited && curFastChat.ready && each(e, function(e, t) {
                    t.shift(), FastChat.imFeed(e, t)
                })
            },
            blinkEl: function(e, t, n) {
                return t > 10 ? (n(), !1) : void(t % 2 == 0 ? animate(e, {
                    opacity: 0
                }, 400, function() {
                    FastChat.blinkEl(e, t + 1, n)
                }) : animate(e, {
                    opacity: 1
                }, 400, function() {
                    setTimeout(function() {
                        FastChat.blinkEl(e, t + 1, n)
                    }, 400)
                }))
            },
            blinkTyping: function(e) {
                var t = ge("chat_tab_icon_" + e);
                if (t) {
                    var n = geByClass1("chat_tab_typing_wrap", t);
                    fadeIn(n, 150, function() {
                        FastChat.blinkEl(n.firstChild, 0, function() {
                            fadeOut(n, 150)
                        })
                    })
                }
            },
            imFeed: function(e, t) {
                var n = curFastChat.tabs[e],
                    r = vkNow();
                return each(t, function(t, n) {
                    switch (n[1]) {
                        case "new":
                            1 === (3 & n[4]) && FastChat.changePeerCounter(e, 1);
                            break;
                        case "read":
                            var r = 1;
                            each(n[3].split(","), function(e, t) {
                                r += 1
                            }), FastChat.changePeerCounter(e, -r);
                            break;
                        case "typing":
                            Chat.tabs[e] && FastChat.blinkTyping(e)
                    }
                }), n ? (each(t, function(t, i) {
                    switch (i[1]) {
                        case "new":
                            stManager.add(["imn.js"], function() {
                                intval(i[8]) && Object(o.confirmDelivery)(i[3]), each(n.sentmsgs, function(e, t) {
                                    var n = ge("fc_msg" + t),
                                        r = n && n.parentNode;
                                    re(n) && r && !geByClass("fc_msg", r).length && re(domClosest("fc_msgs_wrap", r))
                                });
                                var t = ge("fc_msg" + i[3]);
                                t || (FastChat.addMsg(FastChat.prepareMsgData(i.slice(2))), n.msgs[i[3]] = [2 & i[4] ? 1 : 0, 1 & i[4]], 1 === (3 & i[4]) && n.unread++, FastChat.scroll(e)), FastChat.blinkTab(e)
                            });
                            break;
                        case "read":
                            var a = [],
                                s = intval(i[3]);
                            each(n.msgs, function(e) {
                                intval(e) <= s && n.msgs[e][1] && a.push(intval(e))
                            }), each(a, function(e, t) {
                                var r, i = ge("fc_msg" + t);
                                i && (r = n.msgs[t] && n.msgs[t][0] ? i.parentNode.parentNode : i.parentNode, n.msgs[t] && n.msgs[t][1] && (n.msgs[t][1] = 0, n.msgs[t][0] || n.unread--), removeClass(i, "fc_msg_unread"), hasClass(r.parentNode, "fc_msgs_unread") && each(r.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(r.parentNode, "fc_msgs_unread"), !1)
                                }))
                            });
                            break;
                        case "typing":
                            e > 2e9 ? (curFastChat.typingEvents[e] || (curFastChat.typingEvents[e] = {}), curFastChat.typingEvents[e][i[3]] = r) : curFastChat.typingEvents[e] = r, FastChat.updateTyping(e);
                            break;
                        case "edit":
                            var c = n.msgs[i[3]];
                            c && (delete curFastChat.gotMedia[i[3]], i[4] = (c[0] ? 2 : 0) + (c[1] ? 1 : 0), FastChat.editMsg(FastChat.prepareMsgData(i.slice(2))));
                            break;
                        case "delete":
                            FastChat.deleteMsg(FastChat.prepareMsgData(i.slice(2)))
                    }
                }), n.unread > 0 && (n.unread = 0, each(n.msgs, function() {
                    !this[0] && this[1] && n.unread++
                })), n.auto && !n.unread && (n.box._close(!0), delete curFastChat.tabs[e]), void FastChat.updateUnreadTab(e)) : !1
            },
            tabNotify: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = void 0;
                if (e > 0 && 2e9 > e && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, n), !(0 >= e) && r && r.box && !r.box.minimized) {
                    switch (clearTimeout(r.hideNotifyTO), t) {
                        case "online":
                            i = getLang("mail_im_user_became_online", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            i = getLang("mail_im_user_became_offline", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            i = getLang("mail_im_not_online", 3 - r.sex).replace(/\.$/, "")
                    }
                    i = i.replace("{user}", r.fname), val(r.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + i + "</div>");
                    var a = r.notify.firstChild;
                    clearTimeout(r.hideNotifyTO), r.hideNotifyTO = setTimeout(function() {
                        fadeOut(a, 200, function() {
                            val(r.notify, "")
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
                    var n = curFastChat.options.state || !1,
                        r = !curFastChat.friendsCnt || (n && void 0 !== n.clist.min ? n.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                    curFastChat.clistW = 270, curFastChat.clistH = 299;
                    var i = {
                        id: "fc_clist",
                        movable: geByClass1("fc_tab_head", e.clistWrap),
                        hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                        startHeight: curFastChat.clistH,
                        startWidth: curFastChat.clistW,
                        resizeableH: e.clist,
                        resize: !1,
                        minH: 150,
                        fixed: r,
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
                    n && !r && (n.clist.x !== !1 && (-1 == n.clist.x ? i.startRight = 0 : i.startLeft = t[1] * n.clist.x), n.clist.y !== !1 && (-1 == n.clist.y ? i.startBottom = 0 : i.startTop = t[0] * n.clist.y)), r && (i.noshow = !0), void 0 === i.startTop && void 0 === i.startBottom && (i.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === i.startLeft && void 0 === i.startRight && (i.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, i),
                        i.noshow || void 0 === i.startLeft && void 0 === i.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                            prefix: "fc_",
                            scrollChange: FastChat.clistShowMore,
                            nomargin: !0,
                            global: !0,
                            nokeys: !0,
                            right: vk.rtl ? "auto" : 1,
                            left: vk.rtl ? 1 : "auto"
                        }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4), curFastChat.updateTypingsInt = setInterval(FastChat.updateTypings, 5e3);
                    var a = ge("fc_clist_filter");
                    if (placeholderInit(a, {
                            global: !0
                        }), curFastChat.q = "", addEvent(a, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
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
                        }), n && n.clist && n.clist.onlines && FastChat.clistToggleOnlines(!0)
                    }
                    r ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, n && n.tabs && each(n.tabs, function(e, n) {
                        e = intval(e);
                        var r = {
                            nofocus: 1
                        };
                        this.min && (r.minimized = !0), this.h && (r.startHeight = this.h * t[0]), this.w && (r.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? r.startRight = 0 : r.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? r.startBottom = 0 : r.startTop = t[0] * this.y), n.fx ? (r.fixedLoad = !0, FastChat.prepareTabIcon(e, r, !0)) : (r.noAnim = !0, FastChat.addPeer(e, !1, !1, r))
                    }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
                }
            },
            itemsOffset: 12,
            itemsTT: function(e) {
                for (var t = e.target, n = !1; t && t != Chat.itemsCont;) {
                    if (hasClass(t, "chat_tab_wrap")) {
                        n = t;
                        break
                    }
                    t = t.parentNode
                }
                if (!n) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
                var r = n.id.split("_")[3],
                    i = Chat.tabs[r];
                return i ? curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == r ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(n, {
                    text: i.name,
                    slideX: 15,
                    black: 1,
                    asrtl: 1,
                    appendEl: Chat.ttNode,
                    className: "tt_black_side",
                    shift: [-58, -37, 0]
                }), void(Chat.ttPeer = n)) : !1
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
                    n = e.peer ? t && t.box : curFastChat.clistBox,
                    r = getWndInner();
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
                        var i = {
                            startHeight: intval(r[0] * e.h),
                            startWidth: intval(r[1] * e.w)
                        }; - 1 == e.y ? i.startBottom = 0 : i.startTop = intval(r[0] * e.y), -1 == e.x ? i.startRight = 0 : i.startLeft = intval(r[1] * e.x), FastChat.addPeer(e.peer, !1, !1, i);
                        break;
                    case "closed":
                        if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !n) break;
                        n.close();
                        break;
                    case "hidden":
                        if (!t || !n) break;
                        n.close();
                        break;
                    case "minimized":
                        if (!t || !n) break;
                        e.val ? n.unminimize() : n.minimize();
                        break;
                    case "moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        break;
                    case "resized":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        var a = intval(r[1] * e.w);
                        setStyle(n.resizeableH, "height", intval(r[0] * e.h)), setStyle(n.resizeableW, "width", a), FastChat.fixResized(t, a);
                        break;
                    case "clist_toggled":
                        e.val ? n.show(0, !0) : n.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                        break;
                    case "clist_moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
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
                    var t, n = [];
                    for (t in curFastChat.tabs) n.push(t);
                    for (t in Chat.tabs) n.push(t);
                    ajax.post("al_im.php", {
                        act: "a_onlines",
                        peer: n.join(",")
                    }, {
                        onDone: function(e) {
                            FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                        }
                    })
                }
            },
            clistGotOnlines: function(e) {
                var t = curFastChat.onlines,
                    n = [];
                curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(r) {
                    curFastChat.onlines[r] != t[r] && (FastChat.tabNotify(r, e[r] ? "online" : "offline", e[r]), e[r] || (n[r] = 1))
                }), each(Chat.tabs, function(n) {
                    if (curFastChat.onlines[n] != t[n]) {
                        var r = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + n));
                        toggleClass(r, "online", e[n]), toggleClass(r, "mobile", e[n] && mobPlatforms[e[n]])
                    }
                }), n = arrayKeyDiff(t, e, n), each(n, function(e) {
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
                    n = !e,
                    r = 1 + (e ? 40 : 20),
                    i = curFastChat.q,
                    a = !1,
                    o = !1,
                    s = !1;
                if (i ? (s = [], each(FastChat.clistCache(i), function() {
                        s.push(escapeRE(this))
                    }), s = new RegExp("([ -]|^|s|&nbsp;|\b)(" + s.join("|") + ")", "gi"), a = curFastChat.clistCache[i] || {}) : curFastChat.clOnlines && (a = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var i = intval(e),
                            c = !a || a[i];
                        if (!n) return void(i == curFastChat.clOffset && (n = !0));
                        if (c) {
                            if (!--r) return curFastChat.clHasMore = !0, !1;
                            t.push(FastChat.clistWrapPeer(i, this, s)), o = i
                        }
                    }), o !== !1 || e || i ? i && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(i, s, o === !1)) : t.push('<div class="fc_clist_empty">' + getLang(i ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = o, e) {
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
                    var d = ge("fc_contact" + curFastChat.clSel);
                    d ? FastChat.clistPeerOver(d, 1) : curFastChat.clSel = !1
                } else {
                    var d = geByClass1("fc_contact", curFastChat.el.clist);
                    FastChat.clistPeerOver(d, 1)
                }
                curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
            },
            clistWrapPeer: function(e, t, n) {
                var r, i, a = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    o = curFastChat.onlines[e],
                    s = onlinePlatformClass(o),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (n && (c = c.replace(n, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && 2e9 > e ? (r = "/id" + e, i = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (r = "/im?sel=" + e, i = ""), e > 2e9 && t[3]) var u = t[3];
                else var u = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + r + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event, { entrypoint: \'fastchat_search\' });" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + s + '" ' + i + ">" + u + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (a ? " <b>+" + a + "</b>" : "") + "</span></span></a>"
            },
            clistPeerOver: function(e, t, n) {
                if (e && checkOver(n, e)) {
                    var r = e.id.substr(10);
                    curFastChat.clSel && t && curFastChat.clSel != r && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = r : curFastChat.clSel == r && (curFastChat.clSel = !1)
                }
            },
            authorOver: function(e, t) {
                var n = e.getAttribute("data-title"),
                    r = gpeByClass("fc_tab_log", e),
                    i = !1,
                    a = e.getBoundingClientRect().top,
                    o = r.getBoundingClientRect().top;
                if (10 > a - o && (i = !0), n) {
                    var s = e.getAttribute("data-date");
                    s && (n += "<br>" + s), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + n + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: i,
                        shift: [1, 8, 0]
                    })
                }
            },
            getCorrespondents: function(e, t, n) {
                return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || n && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
            },
            loadCorrespondents: function(e, t) {
                e == curFastChat.q && ajax.post("hints.php", {
                    act: "a_json_friends",
                    str: e,
                    from: "fc",
                    allow_multi: 1
                }, {
                    onDone: function(n) {
                        curFastChat.correspondents || (curFastChat.correspondents = {});
                        var r, i = {};
                        if (each(n, function() {
                                r = this[3] + "_", curFastChat.friends[r] || (i[r] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = i, e == curFastChat.q) {
                            var a = ge("fc_correspondents");
                            if (a) {
                                var o = a.parentNode,
                                    s = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(i, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (s.firstChild)
                                    for (; s.firstChild;) c.appendChild(s.firstChild);
                                else o.firstChild == a && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                o.replaceChild(c, a), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                            }
                        }
                    }
                })
            },
            wrapCorrespondents: function(e, t) {
                var n = [];
                return each(e, function(e) {
                    n.push(FastChat.clistWrapPeer(intval(e), this, t))
                }), n.join("")
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
                    var n = curFastChat.tabs[curFastChat.activeBox.options.peer];
                    return n && (trim(Emoji.editableVal(n.txt)) || n.imMedia && n.imMedia.getMedias().length) ? !0 : void curFastChat.activeBox.hide()
                }
            },
            clistCache: function(e) {
                if (e) {
                    var t, n, r, i, a, o, s, c, u, d = [e];
                    if ((n = parseLatin(e)) && d.push(n), (n = parseLatKeys(e)) && d.push(n), (n = parseCyr(e)) && d.push(n), void 0 !== curFastChat.clistCache[e]) return d;
                    u = curFastChat.clistCache[e] = {};
                    for (r in d)
                        if (t = d[r], a = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()]) {
                            s = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi");
                            for (i in a) c = curFastChat.friends[i + "_"], isArray(c) && null !== c[0].match(s) && (u[i] = 1)
                        }
                    i = 0;
                    for (r in u) i++;
                    return u._num = i, d
                }
                var o, l, f;
                curFastChat.clistCache = {};
                for (r in curFastChat.friends)
                    for (o = curFastChat.friends[r][0], r = intval(r), l = 0; f = " " + o.charAt(l).toLowerCase(), curFastChat.clistCache[f] || (curFastChat.clistCache[f] = {}), curFastChat.clistCache[f][r] = 1, l = o.indexOf(" ", l + 1), -1 != l;) ++l
            },
            clistShowMore: function() {
                if (curFastChat.clHasMore) {
                    var e = curFastChat.el.clist,
                        t = e.scrollTop,
                        n = e.clientHeight,
                        r = e.scrollHeight;
                    t + 3 * n > r && FastChat.clistRender(!0)
                }
            },
            clistUpdateTitle: function(e) {
                var t, n = 0,
                    r = 0;
                for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (r++, n++) : curFastChat.clOnlines || n++;
                var i = window.newVal = (r ? getLang("mail_im_X_onlines_title", r) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(r), val(curFastChat.el.clistTitle, i), val(curFastChat.el.topLink, i.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? n = curFastChat.el.clist.childNodes.length : curFastChat.q && (n = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * n)
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
                                var n = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                    r = t;
                                do r = r[n]; while (r && (1 != r.nodeType || !hasClass(r, "fc_contact")))
                            } else curFastChat.clSel || e.keyCode != KEY.DOWN || (r = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                            if (r && r != t) {
                                FastChat.clistPeerOver(r, 1);
                                var i = curFastChat.el.clist;
                                r.offsetTop + 16 > i.clientHeight + i.scrollTop ? (i.scrollTop = r.offsetTop + 16 - i.clientHeight, curFastChat.clistBoxScroll.update()) : r.offsetTop - 36 < i.scrollTop && (i.scrollTop = r.offsetTop - 36, curFastChat.clistBoxScroll.update())
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
                            var a = ge("fc_clist_filter"),
                                o = val(a) || curFastChat.clSel;
                            a.blur(), val(a, curFastChat.q = ""), curFastChat.clSel = !1, o && FastChat.clistRender()
                        }
                        break;
                    default:
                        return
                }
                return cancelEvent(e)
            },
            changePeerCounter: function(e, t, n) {
                if (!Chat.tabs[e]) return !1;
                var r = ge("chat_tab_icon_" + e),
                    i = geByClass1("chat_tab_counter", r);
                i || (i = ce("div", {
                    className: "chat_tab_counter"
                }), r.appendChild(i)), void 0 === n ? Chat.counters[e] = positive((Chat.counters[e] || 0) + t) : Chat.counters[e] = n, Chat.counters[e] ? i.innerHTML = Chat.counters[e] : re(i)
            },
            prepareTabIcon: function(e, t, n) {
                var r = curFastChat.friends && curFastChat.friends[e + "_"];
                if (r) {
                    var i = {
                        name: r[0],
                        photo: r[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, i, n)
                } else {
                    var a = 3;
                    curFastChat.needPeers[e] = [a, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t], FastChat.lcSend("needPeer", {
                        id: e,
                        mask: a
                    })
                }
            },
            addTabIcon: function(e, t, n) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var r = t.data.members_grid_fc || "";
                    else var r = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var i = "im?sel=c" + (e - 2e9);
                    else var i = t.alink || "/id" + e;
                    var a = onlinePlatformClass(t.online),
                        o = se('<a class="chat_tab_wrap' + (n ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + i + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + a + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + r + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div></a>');
                    Chat.itemsCont.insertBefore(o, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: o,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), n || removeClass(o, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
                }
            },
            checkChatHeight: function() {
                function e() {
                    addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }

                function t() {
                    removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }
                var n = getSize(Chat.itemsCont)[1];
                Chat.lastHeight = n, n > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: Chat.maxHeight
                }), addEvent(Chat.scrollNode, "mouseenter", e), addEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow()), Chat.scrollNode.scrollTop = n - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
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
            selectPeer: function(e, t, n) {
                if (checkEvent(t)) return !0;
                var r = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var i = curFastChat.tabs[e].box;
                    i.minimized && i.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, r)
                } else n || (n = {}), n.fixed = !0, n.onPeerAdded = function() {
                    FastChat.movePointer(e, r)
                }, n.onHistoryLoaded = FastChat.readLastMsgs.pbind(e), FastChat.addPeer(e, !1, !0, n);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && (curFastChat.tabs[e].entrypoint = n && n.entrypoint, curFastChat.tabs[e].iman.unidle()), !1
            },
            closeTabIcon: function(e, t, n) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !n && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var r = ge("chat_tab_icon_" + e);
                addClass(r, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                var i = function() {
                    re(r), r && (r = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                    var e = Chat.scrollNode.scrollTop;
                    FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                };
                animate(r, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: i
                }), n || FastChat.stateChange({
                    op: "closed",
                    peer: e
                });
                var a = Object.keys(Chat.tabs).length;
                return a || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, n) {
                var r = n - t,
                    i = Chat.maxHeight + 32;
                return e && 62 > r ? r - 62 : e && r > i ? r - i : 0
            },
            setPointer: function(e, t, n) {
                if (!curFastChat.activeBox) return !1;
                var r = FastChat.getPointerShift(e, t, n),
                    i = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(i, {
                    marginTop: t + r
                }), r
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var n = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var r = ge("chat_tab_icon_" + e);
                    if (!r) return !1;
                    if (!Chat.fixH && r.nextSibling) var i = getXY(r.nextSibling)[1] - 50;
                    else if (r.nextSibling || Chat.fixH) var i = getXY(r)[1] + Chat.scrollNode.scrollTop;
                    else var i = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var a = 23 + getXY(Chat.cont)[1] - i,
                        o = -Chat.scrollNode.scrollTop
                } else var a = 28,
                    o = 0;
                var s = FastChat.setPointer(e, o, a);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, o + s, curFastChat.prevPointer);
                        setStyle(n, {
                            bottom: curFastChat.prevPointer - c + s
                        })
                    }
                    animate(n, {
                        bottom: a
                    }, {
                        duration: 100
                    })
                } else setStyle(n, {
                    bottom: a
                });
                curFastChat.prevPointer = a
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                var e = e - 8,
                    n = !1,
                    r = 0;
                for (var i in curFastChat.tabs) {
                    var a = curFastChat.tabs[i];
                    if (t || (a.box.movedLeft = !1), a && !a.box.options.fixed && a.box.toBottom && !a.box.movedLeft && !a.box.noMove) {
                        var o = a.box.pos;
                        o[1] + o[3] >= e && o[1] > r && (n = a, r = o[1])
                    }
                }
                if (n) {
                    var s = e - n.box.pos[3],
                        c = n.box.pos[0];
                    0 > s && (s = 0), n.box.movedLeft = !0, animate(n.box.wrap, {
                        left: s
                    }, 200), n.box.pos = [c, s, n.box.pos[2], n.box.pos[3]];
                    var u = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: n.box.options.peer,
                        y: c / u[0],
                        x: s / u[1]
                    }), s && FastChat.moveBoxesLeft(s, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var n = t - e.pos[3] - 20, r = e.pos[3], i = e.pos[0], a = !1; n > 0 && !a;) {
                    a = !0;
                    for (var o in curFastChat.tabs) {
                        var s = curFastChat.tabs[o].box.pos;
                        s[0] + s[2] / 2 > i && s[1] + s[3] > n && s[1] < n + r && (n -= s[3], a = !1)
                    }
                }
                0 > n && (n = positive(Math.random() * t)), animate(e.wrap, {
                    left: n
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: i / c[0],
                    x: n / c[1]
                })
            },
            pinTab: function(e, t, n) {
                if (-1 == e) var r = curFastChat.clistBox;
                else var r = curFastChat.tabs[e].box;
                r.options.fixed = !1, removeClass(r.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var i = r.wrap.offsetTop,
                    a = r.wrap.offsetLeft - 10;
                setStyle(r.wrap, {
                    left: r.wrap.offsetLeft,
                    top: r.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), n || animate(r.wrap, {
                    left: a,
                    top: i
                }, 300), r.pos = [i, a, r.pos[2], r.pos[3]], r.toRight = !1, r.toBottom = !0, addClass(r.wrap, "fc_tobottom");
                var o = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                    s = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                    c = getWndInner(); - 1 == e ? FastChat.stateChange({
                    op: "clist_toggled",
                    val: 1,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1]
                }) : FastChat.stateChange({
                    op: "unfixed",
                    peer: e,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1],
                    h: s / c[0],
                    w: o / c[1]
                }), r.noMove = !0, FastChat.moveBoxesLeft(a), r.noMove = !1
            },
            addPeer: function(e, t, n, r) {
                r || (r = {});
                var i = curFastChat.friends && curFastChat.friends[e + "_"],
                    a = 0;
                if (n ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: r.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (n = !0), i) {
                    var o = {
                        name: i[0],
                        photo: i[1],
                        fname: i[2],
                        hash: i[3],
                        online: curFastChat.onlines[e],
                        sex: i[4]
                    };
                    FastChat.addTabIcon(e, o, r.noAnim), FastChat.addBox(e, o, r), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (r && r.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), a |= 2)
                } else a = 3;
                a && (n ? (curFastChat.needPeers[e] = [a, t, !1, r], FastChat.getPeers()) : (curFastChat.needPeers[e] = [a, t, setTimeout(FastChat.getPeers, irand(150, 200)), r], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: a
                })))
            },
            getPeers: function() {
                var e = [],
                    t = {};
                each(curFastChat.needPeers, function(n) {
                    e.push(n), e.push(this[0]), clearTimeout(this[2]), t[n] = this[0]
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
                r() || each(curFastChat.needPeers, function(t) {
                    if (e[t]) {
                        e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                        var n = this[1],
                            r = this[3];
                        2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : r.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], r), n ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, n)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), r && r.nofocus || FastChat.activateTab(t))), r.onHistoryLoaded && r.onHistoryLoaded()
                    }
                })
            },
            gotHistory: function(e, t) {
                if (isArray(t) && t.length && t[0]) {
                    var n = curFastChat.tabs[e],
                        r = t[0],
                        i = t[1];
                    n.offset = t[2], extend(n.msgs, i), each(i, function(e, t) {
                        !t[0] && t[1] && n.unread++
                    }), val(n.log, r), n.logWrap.scrollTop = n.logWrap.scrollHeight, setTimeout(function() {
                        n.logWrap.scrollTop = n.logWrap.scrollHeight, n.scroll && n.scroll.update(!1, !0)
                    }, 10)
                }
            },
            decHashCb: function(e) {
                ! function(e) {
                    curFastChat.decodedHashes[e] = function(e) {
                        for (var t = ge ? "" : "___", n = 0; n < e.length; ++n) t += e.charAt(e.length - n - 1);
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
                    var n = vkNow();
                    curFastChat.myTypingEvents[e] && n - curFastChat.myTypingEvents[e] < 5e3 || (curFastChat.myTypingEvents[e] = n, ajax.post("al_im.php", {
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
                var n, r = curFastChat.tabs[e],
                    i = [],
                    a = curFastChat.typingEvents[e],
                    o = vkNow(),
                    s = ge("fc_tab_typing" + e),
                    c = geByClass1("_fc_tab_typing_progress", s),
                    u = geByClass1("_fc_tab_typing_name", s);
                if (2e9 > e) a && 6e3 > o - a && (i.push(r.fname || r.name || ""), n = r.sex);
                else {
                    var d = r.data.members;
                    each(a || {}, function(e, t) {
                        t && 6e3 > o - t && d[e] && d[e].first_name && (i.push(d[e].first_name || ""), n = d[e].sex)
                    })
                }
                if (!i.length) return hide(c), t ? setStyle(s, "opacity", 0) : fadeTo(s, 1e3, 0);
                if (1 == i.length) val(u, langSex(n, lang.mail_im_typing).replace("{user}", i[0]));
                else {
                    var l = i.pop();
                    val(u, getLang("mail_im_multi_typing").replace("{users}", i.join(", ")).replace("{last_user}", l))
                }
                return show(c), t ? setStyle(s, "opacity", 1) : fadeTo(s, 200, 1)
            },
            readLastMsgs: function(e) {
                var t = curFastChat.tabs[e];
                if (e && t) {
                    if (!t.markingRead && t.unread) {
                        var n = [];
                        for (var r in t.msgs) !t.msgs[r][0] && t.msgs[r][1] && n.push(r);
                        FastChat.markRead(e, n)
                    }
                    FastChat.changePeerCounter(e, 0, 0)
                }
            },
            markRead: function(e, t) {
                if (t.length) {
                    var n = curFastChat.tabs[e];
                    n.markingRead = !0, ajax.post("al_im.php", {
                        act: "a_mark_read",
                        peer: e,
                        ids: t,
                        hash: n.sendhash,
                        from: "fc"
                    }, {
                        onDone: function(r) {
                            n.markingRead = !1;
                            for (var i in t) {
                                var a = t[i],
                                    o = ge("fc_msg" + a),
                                    s = o && o.parentNode;
                                o && (n.msgs[a] && n.msgs[a][1] && (n.msgs[a][1] = 0, n.msgs[a][0] || n.unread--), removeClass(o, "fc_msg_unread"), hasClass(s.parentNode, "fc_msgs_unread") && each(s.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(s.parentNode, "fc_msgs_unread"), !1)
                                }))
                            }
                            n.unread > 0 && (n.unread = 0, each(n.msgs, function() {
                                !this[0] && this[1] && n.unread++
                            })), FastChat.updateUnreadTab(e)
                        },
                        onFail: function() {
                            n.markingRead = !1
                        }
                    })
                }
            },
            mkMsg: function(e, t) {
                var n = clean(e).replace(/\n/g, "<br>"),
                    r = !1;
                return n = Object(o.replaceHyperLinks)(n || "", o.linksReplacer.bind(null, r)), n = Object(o.replaceMentions)(n), n = Object(o.replaceEmailLinks)(n), n = Object(o.replaceHashtags)(n, function(e) {
                    return '<a href="/im?sel=' + t + "&st=" + encodeURIComponent(e) + '">' + e + "</a>"
                }), n = Emoji.emojiToHTML(n, 1)
            },
            getEditCont: function(e) {
                return stManager.add(["emoji.js"]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
            },
            getVal: function(e) {
                return Emoji ? Emoji.editableVal(e) : ""
            },
            onTxtResize: function(e) {
                var t = curFastChat.tabs[e],
                    n = geByClass1("fc_tab_txt", t.wrap),
                    r = getSize(n)[1];
                if (r > 40) {
                    var i = positive(r - 40),
                        a = intval(getSize(t.box.resizeableH)[1]);
                    a + t.hDiff - i < 40 && (i = a + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: a + (t.hDiff || 0) - i
                    }), t.hDiff = i, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var a = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: a + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, n) {
                var r = geByClass1("fc_editable", n),
                    i = curFastChat.tabs[e] = {
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
                        wrap: n,
                        editable: 1,
                        txt: r,
                        txtWrap: r.parentNode.parentNode,
                        logWrap: geByClass1("fc_tab_log", n),
                        log: geByClass1("fc_tab_log_msgs", n),
                        notify: geByClass1("fc_tab_notify_wrap", n),
                        title: geByClass1("fc_tab_title", n)
                    },
                    o = 30;
                if (i.addMediaBtn = geByClass1("fc_tab_attach", n), i.editable) cur.t = i, i.emojiId = Emoji.init(i.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", n),
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
                    addMediaBtn: i.addMediaBtn,
                    onShow: function() {
                        cssAnim(i.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(i.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return i.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, n) {
                        --i.sent, FastChat.send(e, t, n)
                    }
                });
                else {
                    var s = 15;
                    autosizeSetup(i.txt, {
                        minHeight: s,
                        maxHeight: 42
                    }), i.txt.autosize.options.onResize = function(e) {
                        if (!i.box.minimized) {
                            var t = 42 == e ? 42 : s;
                            t != e && setStyle(i.txt, "height", t), t != o && (setStyle(i.logWrap, "height", i.logWrap.clientHeight - t + o), o = t, i.scroll && i.scroll.update(!1, !0))
                        }
                    }
                }
                return i.imPeerMedias = {}, i.imSortedMedias = {}, i.previewEl = geByClass1("fc_tab_preview", n), stManager.add(["page.js", "page.css", "ui_media_selector.js", "ui_media_selector.css"], function() {
                    i.imMedia = new MediaSelector(i.addMediaBtn, i.previewEl, [
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
                    }), i.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = Object(a.loadDraftForPeer)(curFastChat.ldb, e);
                            t.removeAllAttaches(), i.imMedia.getMedias().forEach(function(e) {
                                return t.addAttach(e[0], e[1])
                            }), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), i
            },
            addBox: function(e, t, n) {
                if (void 0 === curFastChat.tabs[e]) {
                    var r = FastChat.getEditCont(Emoji.last);
                    n = n || {}, curFastChat.tabs[e] = {};
                    var i = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: r
                    }));
                    n.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var a = FastChat.initTab(e, t, i),
                        o = getWndInner(),
                        s = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", i),
                            closer: geByClass1("fc_tab_close_wrap", i, "a"),
                            resizeableH: a.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: n.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                a.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete a.auto), FastChat.restoreDraft(e), a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt), a.wrap.clientWidth && setStyle(a.title, {
                                    maxWidth: a.wrap.clientWidth - 71
                                }), a.editable || setStyle(a.txt.autosize.helper, {
                                    width: getStyle(a.txt, "width", !1)
                                }), a.scroll && a.scroll.update(!1, !0), setTimeout(elfocus.pbind(a.txt), 10)
                            },
                            onHide: function() {
                                n.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), n && n.beforeClose && n.beforeClose();
                                var r = curFastChat.tabs,
                                    i = r[e].posSeq;
                                if (delete r[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), i) {
                                    var a, o, s, c, u, d = {},
                                        l = [];
                                    for (each(r, function() {
                                            this.posSeq > i && (d[this.posSeq] = this, l.push(this.posSeq))
                                        }), l.unshift(i), l.sort(), u = !browser.msie && l.length < 10, a = 1; a < l.length; a++) o = l[a], s = d[o].box, c = a > 1 ? d[l[a - 1]].box.pos : t, u ? animate(s.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(s)) : setStyle(s.wrap, {
                                        left: c[1]
                                    });
                                    if (!u)
                                        for (a = 1; a < l.length; a++) s = d[l[a]].box, s._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(a, a.wrap.clientWidth, !0), t || (a.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, n) {
                                var r = getWndInner(),
                                    i = a.box.pos;
                                a.scroll && a.scroll.show(), FastChat.fixResized(a, n, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / r[0],
                                    w: n / r[1],
                                    y: a.box.toBottom ? -1 : i[0] / r[0],
                                    x: a.box.toRight ? -1 : i[1] / r[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(a, t);
                                var n = geByClass1("fc_tab_title", a.box.content);
                                setStyle(n, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete a.posSeq, a.scroll && a.scroll.hide(), val(a.notify, ""), clearTimeout(a.hideNotifyTO)
                            },
                            onDragEnd: function(t, n) {
                                delete a.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: n
                                })
                            }
                        };
                    if (n && extend(s, n), void 0 === s.startLeft && void 0 === s.startRight) {
                        var c = [],
                            u = o[0] - 350,
                            d = curFastChat.clistBox.pos,
                            l = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var f = Call.calcBoxPos();
                            c.push([f.x, f.x + f.w]), l = !0
                        }
                        d[0] + d[2] > u && (curFastChat.clistBox.visible || !l) && c.push([d[1], d[1] + d[3]]), each(curFastChat.tabs, function(t) {
                            (d = this.box && this.box.pos) && t != e && d[0] + d[2] > u && c.push([d[1], d[1] + d[3]])
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
                        l && b && (v = _), extend(s, {
                            startBottom: 0,
                            startLeft: v
                        })
                    }
                    var y, w = !0;
                    for (y in n || {})
                        if ("nofocus" != y) {
                            w = !1;
                            break
                        }
                    w && (a.posSeq = ++curFastChat.posSeq), s.fixed && (s.startHeight = curFastChat.clistH, s.startWidth = curFastChat.clistW, s.onShow = FastChat.showChatCtrl), a.box = new RBox(i, s), a.iman = new IdleManager({
                        id: "tab" + e,
                        element: a.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMsgs(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), s.fixed && FastChat.setActive(a.box), a.scroll = new Scrollbar(a.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(a)
                    }), s.minimized || !n || void 0 === n.startLeft && void 0 === n.startTop && void 0 === n.startWidth && void 0 === n.startHeight || a.box._wnd_resize(o[0], o[1], !0), a.wrap.clientWidth && setStyle(a.title, {
                        maxWidth: a.wrap.clientWidth - 71
                    }), addEvent(a.txt, "keydown focus mousedown keyup", function(t) {
                        if ("mousedown" == t.type) return void(curRBox.active == a.box.id && ((t.originalEvent || t).cancelBubble = !0));
                        if ("keydown" == t.type && t.ctrlKey && t.keyCode == KEY.RETURN) {
                            var n = this.value;
                            if ("number" == typeof this.selectionStart && "number" == typeof this.selectionEnd) {
                                var r = this.selectionStart;
                                this.value = n.slice(0, r) + "\n" + n.slice(this.selectionEnd), this.selectionStart = this.selectionEnd = r + 1
                            } else if (document.selection && document.selection.createRange) {
                                this.focus(t);
                                var i = document.selection.createRange();
                                i.text = "\r\n", i.collapse(!1), browser.opera && (i.moveEnd("character", 0), i.moveStart("character", 0)), i.select()
                            }
                            return a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : (a.txt.autosize.update(), setTimeout(function() {
                                a.txt.autosize.update()
                            }, 0)), !1
                        }
                        if ("focus" == t.type) curFastChat.peer = e;
                        else if ("keyup" == t.type) {
                            var o = a.lastVal || "",
                                s = FastChat.getVal(this);
                            (s.length != o.length || s != o) && (s && FastChat.onMyTyping(e), a.lastVal = s), clearTimeout(a.saveDraftTO), a.saveDraftTO = setTimeout(FastChat.saveDraft.pbind(e), s.length ? 300 : 0), FastChat.checkEditable(a.emojiId, a.txt)
                        }
                    }), FastChat.restoreDraft(e), s.onPeerAdded && s.onPeerAdded()
                }
            },
            onScroll: function(e) {
                var t = e.scroll.obj.scrollTop,
                    n = geByClass1("_fc_msgs_more", e.logWrap);
                200 > t && isVisible(n) && n.click()
            },
            loadMore: function(e, t) {
                var n = curFastChat.tabs[e],
                    r = n.offset;
                return n.moreLoading ? !1 : (n.moreLoading = !0, void ajax.post("al_im.php", {
                    act: "a_history",
                    peer: e,
                    offset: r,
                    from: "fc"
                }, {
                    onDone: function(e) {
                        e[3] || hide(t);
                        var r = t.parentNode,
                            i = r.clientHeight;
                        r.insertBefore(cf(e[0]), t.nextSibling);
                        var a = r.clientHeight - i;
                        a && (n.logWrap.scrollTop += a), n.scroll.update(), n.offset = e[2], n.moreLoading = !1, FastChat.onScroll(n)
                    },
                    onFail: function() {
                        n.moreLoading = !1
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                }))
            },
            sendOnResponse: function(e, t, n) {
                if (e.version && intval(e.version) > curFastChat.version) return void FastChat.updateVersion(e.version);
                var r = ge("fc_msg" + t),
                    i = e.msg_id,
                    a = indexOf(t, n.newmsgs);
                if (r) {
                    if (e.media) {
                        var o = {
                            sticker: intval(e.sticker)
                        };
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: n.box.options.peer,
                            text: e.media,
                            msgOpts: o
                        }), FastChat.gotMsgMedia(n.box.options.peer, t, e.media, o)
                    }++n.msgscount, -1 != a && n.newmsgs.splice(a, 1), r.id = "fc_msg" + i, n.msgs[i] = [1, 1]
                }
            },
            checkEditable: function(e, t) {
                Emoji.checkEditable(e, t, {
                    height: 52
                })
            },
            fixResized: function(e, t, n) {
                e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                    maxWidth: t - 71
                }), n && (e.editable || setStyle(e.txt.autosize.helper, {
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
                    var n = t.box.wrap,
                        r = n.className,
                        i = Math.min(s, intval(getStyle(n, "zIndex")));
                    setStyle(n, {
                        zIndex: s
                    }), removeClass(n, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, getStyle(n, "zIndex") == s && (setStyle(n, {
                            zIndex: i
                        }), n.className = r)
                    }, 2e3)
                }
            },
            createProgress: function(e, t, n) {
                var r = ce("span", {
                    innerHTML: rs(vk.pr_tpl, {
                        id: "",
                        cls: ""
                    }),
                    className: "fc_msg_progress",
                    id: "fc_msg_progress" + t
                });
                return e.insertBefore(r, n), r
            },
            removeProgress: function(e) {
                re("fc_msg_progress" + e)
            },
            send: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = trim(r.editable ? Emoji.editableVal(r.txt) : val(r.txt));
                if (t) {
                    var a = [
                        ["sticker", t]
                    ];
                    i = ""
                } else var a = r.imMedia ? r.imMedia.getMedias() : [];
                var o = ge("fc_tab_typing" + e),
                    s = geByClass1("page_progress_preview", r.wrap);
                if (s && s.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var c = geByClass("fc_tab_log", r.wrap)[0];
                    return FastChat.createProgress(c, e, c.lastChild), void(o.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), o.style.visibility = "visible", !i && !a.length) return void(r.editable ? Emoji.editableFocus(r.txt, !1, !0) : elfocus(r.txt));
                var u = --r.sent,
                    d = {
                        act: "a_send",
                        to: e,
                        hash: r.sendhash,
                        msg: i,
                        from: "fc",
                        entrypoint: curFastChat.tabs[e].entrypoint,
                        media: []
                    };
                n && (d.sticker_referrer = n);
                for (var l, f = 0, h = a.length; h > f; ++f)(l = a[f]) && d.media.push(l[0] + ":" + l[1]);
                d.media = d.media.join(","), r.sending = !0, Emoji.ttHide(r.emojiId), curFastChat.tabs[e].entrypoint = !1, ajax.post("al_im.php", d, {
                    onDone: function(t) {
                        clearTimeout(r.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, u, r)
                    },
                    onFail: function(t) {
                        FastChat.error(e, t || getLang("global_unknown_error")), elfocus(r.txt), val(r.txt, i), r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update();
                        var n = ge("fc_msg" + u);
                        return n ? (n.appendChild(ce("span", {
                            className: "fc_msg_error",
                            innerHTML: getLang("global_error")
                        })), FastChat.scroll(e), !0) : void 0
                    },
                    showProgress: function() {
                        r.sending = !0, r.sendProgressTO = setTimeout(function() {
                            var e = ge("fc_msg" + u);
                            e && FastChat.createProgress(e, u, e.firstChild)
                        }, 2e3)
                    },
                    hideProgress: function() {
                        r.sending = !1, clearTimeout(r.sendProgressTO), FastChat.removeProgress(u)
                    }
                }), re("fc_error" + e), r.sentmsgs.push(u), t || (val(r.txt, ""), r.imMedia && r.imMedia.unchooseMedia());
                var p = d.media ? 1 : 0;
                t && (p += 8), FastChat.addMsg(FastChat.prepareMsgData([e, u, 3, FastChat.mkMsg(i, e), p])), delete curFastChat.myTypingEvents[e], r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update(!1, !0), elfocus(r.txt), FastChat.scroll(e)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = (t || {}).txt;
                if (n && t) {
                    var r = Emoji.editableVal(n),
                        i = Object(a.loadDraftForPeer)(curFastChat.ldb, e);
                    i.setText(trim(r) || ""), i.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = t.txt,
                    r = Object(a.loadDraftForPeer)(curFastChat.ldb, e);
                return !n || !t || val(n).length > r.dData.txt.length && !r.hasAttaches() ? !1 : (t.editable ? n.innerHTML = Emoji.emojiToHTML(clean(r.dData.txt), 1) : val(n, clean(r.dData.txt)), setTimeout(function() {
                    for (var e = r.dData.attaches, n = 0; n < e.length; n++) t.imMedia && t.imMedia.chooseMedia(e[n].type, e[n].id, e[n].object || {});
                    r.destroy()
                }, 40), FastChat.checkEditable(t.emojiId, n), setTimeout(function() {
                    n.scrollTop = n.scrollHeight
                }, 10), !0)
            },
            error: function(e, t) {
                e = e || curFastChat.peer;
                var n = curFastChat.tabs[e];
                re("fc_error" + e), n.log.appendChild(ce("div", {
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
                    n = new Date,
                    r = function(e) {
                        return (e + "").length < 2 ? "0" + e : e
                    };
                if (t.getDay() == n.getDay()) return r(t.getHours()) + ":" + r(t.getMinutes());
                var i = r(t.getDate()) + "." + r(t.getMonth() + 1);
                return t.getFullYear() != n.getFullYear() && (i += "." + (t.getFullYear() + "").substr(2)), i
            },
            prepareMsgData: function(e) {
                var t, n = e[0],
                    r = intval(e[2]),
                    i = 2 & r ? curFastChat.me.id : n > 2e9 ? e[5] : n,
                    a = intval(vkNow() / 1e3),
                    o = e[4],
                    s = "",
                    c = {
                        id: e[1],
                        peer: n,
                        from_id: i,
                        text: e[3],
                        out: 2 & r ? !0 : !1,
                        unread: 1 & r ? !0 : !1,
                        date: a,
                        date_str: FastChat.mkdate(a)
                    },
                    u = c.text.match(/fc_srv_msg/);
                return o && !u && (1 & o && (s += rs(vk.pr_tpl, {
                    id: "",
                    cls: ""
                }), e[1] > 0 && setTimeout(FastChat.needMsgMedia.pbind(n, e[1]), 5)), 6 & o && (s += rs(curFastChat.tpl.msg_fwd, {
                    msg_id: e[1],
                    peer_nice: FastChat.nicePeer(n),
                    label: getLang(2 & o ? "mail_im_fwd_msg" : "mail_im_fwd_msgs")
                })), 8 & o && (c.sticker = !0), s && (c.text += '<div class="fc_msg_attachments" id="fc_msg_attachments' + c.id + '">' + s + "</div>")), t = 2 & r ? curFastChat.me : n > 2e9 ? curFastChat.tabs[n].data.members[i] : curFastChat.tabs[n], extend(c, {
                    from_id: i,
                    link: t.link,
                    photo: t.photo,
                    name: t.name,
                    fname: n > 2e9 ? t.fname || t.first_name : ""
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
                    onDone: function(n, r, i) {
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: n,
                            msgOpts: i
                        }), FastChat.gotMsgMedia(e, t, n, i)
                    }
                }))
            },
            gotMsgMedia: function(e, t, n, r) {
                if (val("fc_msg_attachments" + t, n), r && r.sticker) {
                    var i = ge("fc_msg" + t),
                        a = i && i.parentNode;
                    i && addClass(a.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
                }
                FastChat.scroll(e), curFastChat.gotMedia[t] = [e, n, r], r.stickers && window.Emoji && Emoji.updateTabs(r.stickers, r.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
            },
            replaceSpecialSymbols: function(e) {
                return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
            },
            addMsg: function(e) {
                var t = e.peer,
                    n = curFastChat.tabs[t],
                    r = n.log,
                    i = r.lastChild;
                if (i && "fc_msgs_error" == i.className && (i = i.previousSibling), !n || e.out || !n.box.visible || n.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), !i || !hasClass(i, "fc_msgs_wrap") || !hasClass(i, "fc_msgs_unread") && e.unread === !0 || i.getAttribute("data-from") != e.from_id || e.date - intval(i.getAttribute("data-date")) >= 300 || e.sticker || hasClass(i, "fc_msg_sticker")) {
                    re("fc_log_empty" + t);
                    var a = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (a += " fc_msg_sticker");
                    var o = e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    i = se(rs(o, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: a,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: ""
                    })), r.appendChild(i)
                } else e.unread || removeClass(i, "fc_msgs_unread");
                var s = geByClass1("fc_msgs", i, "div"),
                    c = geByClass1("fc_msgs_date", s),
                    u = geByClass1("fc_msg_last", s);
                u && removeClass(u, "fc_msg_last");
                var d = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(s) && "BR" == domFC(s).tagName && re(domFC(s)), c ? s.insertBefore(d, c) : s.appendChild(d), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), n.scroll && n.scroll.update()
            },
            editMsg: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = se(rs(curFastChat.tpl.msg, {
                        msg_id: t,
                        classname: n.getAttribute("class"),
                        text: FastChat.replaceSpecialSymbols(e.text)
                    }));
                    n.parentNode.replaceChild(r, n)
                }
            },
            deleteMsg: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = !domNS(n) && !domPS(n),
                        i = domClosest("fc_tab_log_msgs", n);
                    for (re(r ? domClosest("fc_msgs_wrap", n) : n); hasClass(domLC(i), "fc_msgs_date");) re(domLC(i))
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
    46: function(e, t, n) {
        "use strict";

        function r(e) {
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

        function i(e, t, n, r) {
            d(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
        }

        function a(e, t, n, r, i) {
            Object(c.addDelegateEvent)(t, n, r, i), e._registeredHandlers.push(["delegate", t, n, r, i])
        }

        function o(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(i.bind(null, t), a.bind(null, t)), t
        }

        function s(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? c.removeDelegateEvent.apply(void 0, t) : l.apply(void 0, t)
            }), e._registeredHandlers = []
        }
        n.r(t), n.d(t, "createMutations", function() {
            return r
        }), n.d(t, "createModule", function() {
            return o
        }), n.d(t, "destroyModule", function() {
            return s
        });
        var c = n(206),
            u = window,
            d = u.addEvent,
            l = u.removeEvent
    },
    48: function(e, t, n) {
        "use strict";

        function r(e, t) {
            t = Object(c.parserMessage)(t);
            var n = vk.id == t.peerId && !Object(c.unpackStore)(e).gid;
            return 333 == t.peerId ? !1 : n || Object(u.isOut)(t) ? Object(u.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : Object(u.isGift)(t) || Object(u.isSticker)(t) || Object(u.isAudioMsg)(t) || Object(u.isGraffiti)(t) || Object(u.isMoney)(t) || Object(u.isMessageWithInviteLink)(t) ? !1 : Object(c.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : Object(d.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
        }

        function i(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
        }

        function a(e, t) {
            var n = t && t.msgs ? Object.keys(t.msgs) : [],
                i = n.filter(function(e) {
                    return e > 0
                }).sort(function(e, t) {
                    return t - e
                }).find(function(n) {
                    return r(e, t.msgs[n])
                });
            return +i || null
        }

        function o(e, t, n) {
            var r = Object(l.convertKludgesToAttaches)(t.kludges, t.messageId),
                a = n.dData.attaches;
            if (i(t.text) !== n.dData.txt || r.length !== a.length) return !0;
            for (var o = r.length; o--;)
                if (r[o].id != a[o].id || r[o].type != a[o].type) return !0;
            return !1
        }

        function s(e, t, n, r, i) {
            t.origText = n, t.text = Object(d.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
        n.r(t), n.d(t, "canMessageBeEdited", function() {
            return r
        }), n.d(t, "convertEmojiHtmlToRegularText", function() {
            return i
        }), n.d(t, "findLastMessageToEdit", function() {
            return a
        }), n.d(t, "wasMessageReallyModified", function() {
            return o
        }), n.d(t, "replaceMsgAfterEdit", function() {
            return s
        });
        var c = n(119),
            u = n(138),
            d = n(156),
            l = n(79)
    },
    50: function(e, t, n) {
        "use strict";

        function r() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                n = sbWidth();
            return (lastWndScroll[0] !== !1 ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= n + (n ? 1 : 0)), [t, e]
        }

        function i() {
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

        function a(e, t) {
            var n = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
                r = void 0;
            r = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var i = se(rs(n, {
                title: e.title,
                content: r
            }));
            r = geByClass1("fc_content", i, "div");
            var a = {
                    movable: geByClass1("fc_tab_head", i),
                    hider: geByClass1("fc_tab_close_wrap", i, "a"),
                    startLeft: e.x,
                    startTop: e.y,
                    startHeight: e.height,
                    startWidth: e.width,
                    resizeableH: r,
                    resize: !1,
                    minH: e.minH,
                    onBeforeHide: e.onBeforeHide || function() {},
                    onHide: e.onHide || function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                },
                o = new RBox(i, extend(a, e)),
                s = void 0;
            return e.content && (s = new Scrollbar(r, {
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
                cont: r,
                update: function() {
                    s && s.update()
                }
            }), o
        }
        n.r(t), n(122), n(151), n(172), n(0), n(24), n(1), n(175), window.getWndInner = r, window.lastWndScroll = [!1, !1], window.updateWndVScroll = i, window.defBox = a;
        try {
            stManager.done("notifier.js")
        } catch (o) {}
    },
    59: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = D(e, 2),
                n = t[1];
            return {
                type: B,
                localId: n
            }
        }

        function i(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: q,
                messageId: n,
                mask: r,
                peerId: i
            }
        }

        function a(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: H,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function o(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: z,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function s(e) {
            var t = D(e, 11),
                n = t[1],
                r = t[2],
                i = t[3],
                a = t[4],
                o = t[5],
                s = t[6],
                c = t[7],
                u = t[8],
                d = t[9],
                l = t[10],
                f = extend(s, c || void 0);
            return s || (Object(P.imWeirdLog)("empty_other_kludges", [n, r, i, a, o, s, c, u, d, l]), s = {}), {
                type: W,
                messageId: intval(n),
                flags: intval(r),
                peerId: intval(i),
                date: intval(a),
                attaches: Object(A.convertKludgesToAttaches)(f, n),
                subject: s.title || "",
                text: o,
                kludges: f,
                randomId: intval(u),
                userId: Object(R.isChatPeer)(i) ? intval(f.from) : intval(i),
                update_time: l,
                chat_local_id: d
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

        function d(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: U,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function l(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: G,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function f(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: V,
                userId: -n,
                platform: r,
                lastSeenTs: i
            }
        }

        function h(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: K,
                userId: -n,
                reason: r,
                lastSeenTs: i
            }
        }

        function p(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3],
                a = void 0 === i ? !1 : i;
            return {
                type: te,
                peerId: n,
                mask: r,
                local: a
            }
        }

        function m(e) {
            var t = D(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: ne,
                peerId: n,
                mask: r
            }
        }

        function _(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3],
                a = void 0 === i ? !1 : i;
            return {
                type: re,
                peerId: n,
                mask: r,
                local: a
            }
        }

        function g(e) {
            var t = D(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: he,
                peerId: n,
                localId: r
            }
        }

        function v(e) {
            var t = D(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: Q,
                chatId: n,
                self: r
            }
        }

        function b(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: Y,
                peerId: r,
                updateType: n,
                updateArg: i
            }
        }

        function C(e) {
            var t = D(e, 5),
                n = t[1],
                r = t[2],
                i = t[3],
                a = t[4];
            return {
                type: $,
                peerId: n,
                userIds: r,
                totalCount: i,
                ts: a
            }
        }

        function y(e) {
            var t = D(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: X,
                userId: n,
                callId: r
            }
        }

        function w(e) {
            var t = D(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: J,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: i
            }
        }

        function k(e) {
            var t = D(e, 2),
                n = t[1],
                r = void 0 === n ? {} : n;
            return {
                type: Z,
                peerId: r.peer_id,
                sound: r.sound,
                disabledUntil: r.disabled_until
            }
        }

        function N(e) {
            var t = D(e, 2),
                n = t[1],
                r = void 0 === n ? {} : n,
                i = s([!1, r.id, r.flags, r.peer_id, r.date, r.message, extend(r.kludges, {
                    title: r.title || ""
                }), {}, r.random_id, r.chat_local_id, r.update_time]);
            return i.type = pe, i
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

        function O() {
            return {
                type: ie
            }
        }

        function E(e) {
            var t = D(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: ae,
                key: n,
                url: r
            }
        }

        function S() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
            return {
                type: se,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function x(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: ue,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: i
            }
        }

        function I(e) {
            return {
                type: de,
                tab: e
            }
        }

        function j(e, t, n) {
            return {
                type: le,
                message: t,
                peer: e,
                error: n
            }
        }

        function L(e) {
            var t = D(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                i = t[3],
                a = t[4],
                o = t[5];
            return {
                type: ce,
                free: !!intval(n) || intval(a) === vk.id,
                resource: r,
                peerId: intval(i),
                who: intval(a),
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
        n.r(t), n.d(t, "DELETE", function() {
            return B
        }), n.d(t, "SET_FLAGS", function() {
            return H
        }), n.d(t, "REPLACE_FLAGS", function() {
            return q
        }), n.d(t, "RESET_FLAGS", function() {
            return z
        }), n.d(t, "ADD_MESSAGE", function() {
            return W
        }), n.d(t, "READ_INBOUND", function() {
            return U
        }), n.d(t, "READ_OUTBOUND", function() {
            return G
        }), n.d(t, "GOT_ONLINE", function() {
            return V
        }), n.d(t, "GOT_OFFLINE", function() {
            return K
        }), n.d(t, "CHAT_CHANGED", function() {
            return Q
        }), n.d(t, "CONVERSATION_UPDATED", function() {
            return Y
        }), n.d(t, "TYPING", function() {
            return $
        }), n.d(t, "VIDEO_CALL", function() {
            return X
        }), n.d(t, "UNREAD_COUNT", function() {
            return J
        }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
            return Z
        }), n.d(t, "EMPTY", function() {
            return ee
        }), n.d(t, "RESET_DIRECTORIES", function() {
            return te
        }), n.d(t, "REPLACE_DIRECTORIES", function() {
            return ne
        }), n.d(t, "SET_DIRECTORIES", function() {
            return re
        }), n.d(t, "RESYNC", function() {
            return ie
        }), n.d(t, "REFRESH_LP_KEY", function() {
            return ae
        }), n.d(t, "TRANSITION", function() {
            return oe
        }), n.d(t, "RESET_PEER", function() {
            return se
        }), n.d(t, "MUTEX", function() {
            return ce
        }), n.d(t, "CHANGE_PEER", function() {
            return ue
        }), n.d(t, "CHANGE_TAB", function() {
            return de
        }), n.d(t, "FAILED_MESSAGE", function() {
            return le
        }), n.d(t, "RESEND", function() {
            return fe
        }), n.d(t, "DELETE_DIALOG", function() {
            return he
        }), n.d(t, "EDIT_MESSAGE", function() {
            return pe
        }), n.d(t, "FLAG_UNREAD", function() {
            return me
        }), n.d(t, "FLAG_OUTBOUND", function() {
            return _e
        }), n.d(t, "FLAG_IMPORTANT", function() {
            return ge
        }), n.d(t, "FLAG_CHAT", function() {
            return ve
        }), n.d(t, "FLAG_FRIENDS", function() {
            return be
        }), n.d(t, "FLAG_SPAM", function() {
            return Ce
        }), n.d(t, "FLAG_DELETED", function() {
            return ye
        }), n.d(t, "FLAG_MEDIA", function() {
            return we
        }), n.d(t, "FLAG_STEALTH", function() {
            return ke
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return Ne
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return Te
        }), n.d(t, "FOLDER_HAS_BANNER", function() {
            return Fe
        }), n.d(t, "deleteEvent", function() {
            return r
        }), n.d(t, "replaceFlagsEvent", function() {
            return i
        }), n.d(t, "setFlagsEvent", function() {
            return a
        }), n.d(t, "resetFlagsEvent", function() {
            return o
        }), n.d(t, "addMessageEvent", function() {
            return s
        }), n.d(t, "editMessageEvent", function() {
            return c
        }), n.d(t, "editMessageLocallyEvent", function() {
            return u
        }), n.d(t, "readInboundEvent", function() {
            return d
        }), n.d(t, "readOutboundEvent", function() {
            return l
        }), n.d(t, "gotOnlineEvent", function() {
            return f
        }), n.d(t, "gotOfflineEvent", function() {
            return h
        }), n.d(t, "resetDirectoriesEvent", function() {
            return p
        }), n.d(t, "replaceDirectoriesEvent", function() {
            return m
        }), n.d(t, "setDirectoriesEvent", function() {
            return _
        }), n.d(t, "deleteDialogEvent", function() {
            return g
        }), n.d(t, "chatChangedEvent", function() {
            return v
        }), n.d(t, "chatUpdatedEvent", function() {
            return b
        }), n.d(t, "typingEvent", function() {
            return C
        }), n.d(t, "videoCallEvent", function() {
            return y
        }), n.d(t, "unreadCountEvent", function() {
            return w
        }), n.d(t, "notifySettingsChangedEvent", function() {
            return k
        }), n.d(t, "refreshMessageEvent", function() {
            return N
        }), n.d(t, "emptyEvent", function() {
            return T
        }), n.d(t, "transitionEvent", function() {
            return F
        }), n.d(t, "resyncEvent", function() {
            return O
        }), n.d(t, "refreshLpKeyEvent", function() {
            return E
        }), n.d(t, "resetPeer", function() {
            return S
        }), n.d(t, "changePeer", function() {
            return x
        }), n.d(t, "changeTab", function() {
            return I
        }), n.d(t, "failedMessage", function() {
            return j
        }), n.d(t, "mutexEvent", function() {
            return L
        }), n.d(t, "resendEvent", function() {
            return M
        });
        var R = n(156),
            A = n(79),
            P = n(131),
            D = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            B = "event_delete",
            H = "event_set_flags",
            q = "event_replace_flags",
            z = "event_reset_flags",
            W = "event_add_message",
            U = "event_read_inbound",
            G = "event_read_outbound",
            V = "event_got_online",
            K = "event_got_offline",
            Q = "event_chat_changed",
            Y = "event_chat_updated",
            $ = "event_typing",
            X = "event_video_call",
            J = "event_unread_count",
            Z = "event_notify_settings_changed",
            ee = "event_empty",
            te = "event_reset_directories",
            ne = "event_replace_directories",
            re = "event_set_directories",
            ie = "event_resync",
            ae = "event_refresh_lp_key",
            oe = "transition_event",
            se = "reset_peer",
            ce = "mutex",
            ue = "change_peer",
            de = "event_change_tab",
            le = "event_failed_message",
            fe = "event_resend",
            he = "event_delete_dialog",
            pe = "event_edit_message",
            me = 1,
            _e = 2,
            ge = 8,
            ve = 16,
            be = 32,
            Ce = 64,
            ye = 128,
            we = 512,
            ke = 65536,
            Ne = 1,
            Te = 2,
            Fe = 8
    },
    64: function(e, t, n) {
        "use strict";

        function r(e, t) {
            function n() {
                return s > 0
            }

            function r() {
                !u.length || n() || d || (t(u), u = [])
            }

            function o() {
                var e = window.extend({}, window.lpConnect.options, {
                    ts: c
                });
                Object(a.lpLogFc)("orange", "createLongPoll to load from", c), d = !0;
                var t = Object(i.createLongPoll)(e, function(e, n, i) {
                    var o;
                    Object(a.lpLogFc)("orange", "Loaded [" + e + "," + n + ")"), t.stopConnection(), c = n, d = !1, (o = u).push.apply(o, i), r()
                })
            }
            var s = 0,
                c = e,
                u = [],
                d = !1;
            return {
                pause: function() {
                    s++
                },
                resume: function() {
                    s > 0 && (s--, r())
                },
                onLp: function(e, t, n) {
                    if (!d)
                        if (c >= e) {
                            var i;
                            c = t, (i = u).push.apply(i, n), r()
                        } else o()
                }
            }
        }
        n.r(t), n.d(t, "createLongpollEventsQueue", function() {
            return r
        });
        var i = n(200),
            a = n(177)
    },
    69: function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function i(e, t, n) {
            return f(e, F, t, n)
        }

        function a(e, t, n) {
            return f(e, O, t, n)
        }

        function o(e, t, n, r) {
            var i = Object(v.unpackStore)(e),
                a = Object(v.getTab)(i, n || i.peer);
            return m(a, t) ? !1 : f(e, j, n, r)
        }

        function s(e, t, n) {
            return f(e, E, t, n)
        }

        function c(e, t, n, r) {
            var i = Object(v.unpackStore)(e),
                a = Object(v.getTab)(i, n || i.peer),
                o = f(e, S, n, r),
                s = h(a, y);
            return r = "undefined" == typeof r ? window.vk.id : r, m(a, t) ? !1 : s || m(a, r) || p(a, r) ? o : o && !p(a, t) && _(a, t)
        }

        function u(e, t, n) {
            return f(e, x, t, n)
        }

        function d(e, t, n) {
            return f(e, I, t, n)
        }

        function l(e, t, n) {
            return d(e, t, n) && !Object(b.isFvkcomgroup)(e, t)
        }

        function f(e, t, n, r) {
            var i = Object(v.unpackStore)(e);
            r = "undefined" == typeof r ? window.vk.id : r, n = "undefined" == typeof n ? i.peer : n;
            var a = Object(v.getTab)(i, n),
                o = !a.data.kicked && !a.data.closed,
                s = L[t],
                c = Object(b.isFvkcomgroup)(e, n);
            if (c) switch (t) {
                case j:
                case E:
                case S:
                    return !1;
                case F:
                    return o;
                default:
                    return i.gid > 0
            }
            switch (t) {
                case F:
                case O:
                case j:
                    return h(a, s) ? p(a, r) && o : m(a, r);
                case E:
                case S:
                case x:
                case I:
                    return h(a, s) ? p(a, r) && o : o
            }
            return !1
        }

        function h(e, t) {
            var n = e && e.data && e.data.flags || 0;
            return (n & t) > 0
        }

        function p(e, t) {
            var n = e && e.adminIds || [];
            return n.indexOf(+t) > -1
        }

        function m(e, t) {
            return e.ownerId === t
        }

        function _(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
        n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
            return C
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK", function() {
            return y
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
            return w
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
            return k
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
            return N
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
            return T
        }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
            return F
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
            return O
        }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
            return E
        }), n.d(t, "MAIL_CHATS_ACTION_KICK_USER", function() {
            return S
        }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
            return x
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
            return I
        }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
            return j
        }), n.d(t, "canSeeInviteLink", function() {
            return i
        }), n.d(t, "canChangeInviteLink", function() {
            return a
        }), n.d(t, "canAddAdmin", function() {
            return o
        }), n.d(t, "canInviteUser", function() {
            return s
        }), n.d(t, "canKickUser", function() {
            return c
        }), n.d(t, "canPinOrUnpin", function() {
            return u
        }), n.d(t, "canChangeTitle", function() {
            return d
        }), n.d(t, "canChangeAvatar", function() {
            return l
        }), n.d(t, "checkChatRights", function() {
            return f
        }), n.d(t, "doesChatTabHaveFlag", function() {
            return h
        }), n.d(t, "isUserAdminInChat", function() {
            return p
        }), n.d(t, "isUserOwnerInChat", function() {
            return m
        }), n.d(t, "isUserInvitedByMe", function() {
            return _
        });
        var g, v = n(119),
            b = n(156),
            C = 1,
            y = 2,
            w = 4,
            k = 8,
            N = 16,
            T = 32,
            F = "see_invite_link",
            O = "change_invite_link",
            E = "invite_user",
            S = "kick_user",
            x = "pin_unpin",
            I = "change_title",
            j = "add_admin",
            L = (g = {}, r(g, F, T), r(g, O, T), r(g, j, N), r(g, E, C), r(g, S, y), r(g, x, w), r(g, I, k), g)
    },
    79: function(e, t, n) {
        "use strict";

        function r() {
            return {
                txt: "",
                attaches: [],
                urlBinds: []
            }
        }

        function i(e, t) {
            this._db = e, this._key = t, this.dData = r(), this.load()
        }

        function a(e) {
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
            var n = [];
            e.fwd_count ? n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: e.fwd_count
                }
            }) : e.fwd && n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: Object(l.parseFwd)(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: intval(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: intval(e["attach" + r + "_call_duration"]),
                receiverId: intval(e["attach" + r + "_call_receiver_id"])
            }) : n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                kind: e["attach" + r + "_kind"],
                productId: e["attach" + r + "_product_id"]
            });
            return e.geo && n.push({
                type: "geo",
                id: e.geo
            }), n
        }

        function u(e, t) {
            return new i(e, "draft_" + t)
        }
        n.r(t), n.d(t, "ImDraft", function() {
            return i
        }), n.d(t, "convertKludgesToAttaches", function() {
            return c
        }), n.d(t, "loadDraftForPeer", function() {
            return u
        });
        var d = n(141),
            l = n(158),
            f = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        i.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, o(this.dData))
        }, i.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = s(e))
            }
        }, i.prototype.clear = function() {
            this.dData = r(), this.dump()
        }, i.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, i.prototype.addAttach = function(e, t, n) {
            if (("share" === e || "mail" === e) && this.removeAttachByType(e), !e || !t) return !1;
            var r = this.dData.attaches.findIndex(function(n) {
                return n.type === e && n.id === t
            }); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" === e && (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, i.prototype.syncWithSelector = function(e) {
            var t = this,
                n = this.getFwdRaw();
            this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
                var n = f(e, 2),
                    r = n[0],
                    i = n[1],
                    a = t.dData.attaches.find(function(e) {
                        return e.type == r && e.id == i
                    });
                return a || {
                    type: r,
                    id: i
                }
            })), this.dump()
        }, i.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, i.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dump()
        }, i.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, i.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t ? this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null : null
        }, i.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            return e && e.object ? e.object.url : void 0
        }, i.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, i.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, i.prototype.prepareObjects = function(e, t) {
            var n = this,
                r = this.dData.attaches.find(a);
            return r ? Object(d.post)(d.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = f(e, 1),
                    r = t[0];
                n.dData.attaches = r.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, i.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type
            })
        }, i.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    82: function(e, t, n) {
        e.exports = n(50)
    },
    85: function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function i(e) {
            return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
        }

        function a(e) {
            if (!e.renew_hashes) {
                var t = e.last_hashes_update || 0;
                if (Date.now() - t < 1e4) return Promise.resolve();
                var n = Object.keys(e.tabs).filter(function(t) {
                    return Object(Dt.isFullyLoadedTab)(e, t)
                });
                e.renew_hashes = Object(jt.post)(jt.CONTROLLER, {
                    act: "a_renew_hash",
                    peers: n.join(","),
                    gid: e.gid
                }).then(function(t) {
                    var r = Kt(t, 2),
                        i = r[0],
                        a = r[1];
                    return n.forEach(function(t) {
                        e.tabs[t].hash = i[t]
                    }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                })
            }
            return e.renew_hashes
        }

        function o(e, t, n) {
            return i(e).then(function(r) {
                return r ? t.apply(void 0, n) : a(e).then(function(e) {
                    return t.apply(void 0, n)
                })
            })
        }

        function s(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, t)["catch"](function(r) {
                    if (r && r.match && r.match(/1001;/)) return o(n, e, t);
                    throw r
                })
            }
        }

        function c(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function u(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function d(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function l(e, t, n, r, i) {
            return i.tabHistoryNotChanged = !1, Object(Rt.retryFn)(jt.post, 3, function(e) {
                return e - 1
            })(jt.CONTROLLER, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: i.prevPeer,
                gid: i.gid,
                block: r
            }).then(function(t) {
                var r = Kt(t, 5),
                    a = r[0],
                    o = r[1],
                    s = r[2],
                    c = r[3],
                    u = r[4];
                if (o.forEach(function(e) {
                        return Object(zt.oCacheAdd)(i, e)
                    }), i.tabs || (i.tabs = {}), i.dialog_tab_cts = u, i.tabs[e] || (i.tabs[e] = Object(Dt.normalizeTab)(i, a)), d(c, i), n) {
                    if (i.tabs[e]) {
                        var l = i.tabs[e].lastmsg,
                            h = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], a), i.tabs[e].lastmsg = l, i.tabs[e].lastmsg_meta = h
                    }
                } else extend(i.tabs[e], a);
                return i.admins = extend(i.admins, s), i.imQueue(e, !1), xt(), f(e, i)
            })["catch"](function(e) {
                return Object(Wt.imWeirdCatch)("loadPeer", e)
            })
        }

        function f(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                i = n.filter(function(n) {
                    return !Object(Ht.isRidExist)(t, e, n.rid)
                });
            return r.msgs = i.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(Dt.restoreQueue)(i, t, c(t.tabs[e].history)), Promise.resolve(t)
        }

        function h(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(Dt.removeMessages)([t], c(n.tabs[e].history)), Promise.resolve(n)
        }

        function p(e, t) {
            return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : Object(jt.post)(jt.CONTROLLER, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                var n = Kt(e, 1),
                    r = n[0];
                return d(r, t)
            })
        }

        function m(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(Dt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && p(n, t), Promise.resolve(t).then(C)) : (Object(Dt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), l(n, e, !1, !0, t))
            }).then(C).then(_.bind(null, n))
        }

        function _(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
            return Object(Dt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(Dt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function g(e, t, n) {
            var r = n.msgid,
                i = n.peer;
            return !e && Object(Dt.isFullyLoadedTab)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && p(i, n), Promise.resolve(n).then(C).then(_.bind(null, i))) : l(i, !0, r, !0, n).then(C).then(function() {
                var e = Object(Ht.getTab)(n, i);
                return e.msgid = r, n
            }).then(_.bind(null, i))
        }

        function v(e, t, n, r) {
            if (We(r)) throw Object(Dt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
            var i = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, Jt({
                    sel: e ? Object(Dt.convertPeerToUrl)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: i
                }), 0 != r.prevPeer && _(r.prevPeer, r, !0), 0 !== e) {
                var a = [];
                Object(Dt.isTabLoaded)(r, e) && _(e, r, !0), a = r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), ot(a, !1, r)
            } else ot(r.tabbedPeers, !1, r);
            return Zt(), le(r.prevPeer, r)
        }

        function b(e) {
            if (cur.wallMentions = [], Object(Dt.isChatPeer)(e.peer) && Object(Dt.isFullyLoadedTab)(e, e.peer)) {
                var t = e.tabs[e.peer],
                    n = [];
                Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                    var r = Object(Ht.parserMessage)(t.msgs[e]),
                        i = r && r.userId;
                    i && i != vk.id && -1 === n.indexOf(i) && Object(Dt.isUserAliveInChat)(t, i) && n.push(i)
                }), (t.memberIds || []).forEach(function(e) {
                    -1 === n.indexOf(e) && n.push(e)
                }), n.forEach(function(t) {
                    if (Object(zt.oCacheExists)(e, t)) {
                        var n = Object(zt.oCacheGet)(e, t),
                            r = n.link.substring(1);
                        cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                    }
                })
            }
        }

        function C(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                i = Object(Dt.isChatPeer)(t) && (n.data.closed || n.data.kicked),
                a = Object(Dt.isFvkcomgroup)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && !a && r.push("clear"), Object(Dt.isCommunityInterface)(e) && !a && r.push("block"), Object(Dt.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !Object(Dt.isChatPeer)(t) && !Object(Dt.isUserPeer)(t) || Object(Dt.isCommunityInterface)(e) || Object(Dt.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), Object(Dt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), !e.chatSettingsAllowed && Object(Dt.isChatPeer)(t) && !i && n.data.link && r.push("invite_link"), Object(Dt.isChatPeer)(t) && !i && (e.chatSettingsAllowed || (Object(Gt.canChangeTitle)(e) && r.push("topic"), Object(Gt.canChangeAvatar)(e) && r.push("avatar")), Object(Gt.canInviteUser)(e) && r.push("invite"), e.gid || r.push("leave")), Object(Dt.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(Dt.isChatPeer)(t) && e.chatSettingsAllowed && !n.data.closed && !n.data.kicked && r.push("settings"), Object(Dt.isChatPeer)(t) && n.pinned && (r.push(Object(Ut.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(Gt.canPinOrUnpin)(e) && r.push("unpin"));
            var o = Object(Dt.chatActions)(e, a);
            return e.curActions = r.sort(function(e, t) {
                return tn[e] - tn[t]
            }).reduce(function(e, t) {
                return e[t] = o[t], e
            }, {}), Promise.resolve(e)
        }

        function y(e, t, n) {
            var r = n.tabs[n.peer];
            return Object(jt.post)(jt.CONTROLLER, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: r.offset + (r.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = Kt(e, 4),
                    i = t[0],
                    a = t[1],
                    o = t[2],
                    s = t[3];
                return r.allShown = o, n.admins = extend(n.admins, s), r.history = i + u(r.history), r.historyToAppend = i, r.offset += Object.keys(a).length, r.msgs = extend(r.msgs, a), n
            })
        }

        function w(e) {
            var t = e.tabs[e.peer];
            return Object(jt.post)(jt.CONTROLLER, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = Kt(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2];
                r[3], r[4], t.allShown = t.allShown || o, t.history = u(t.history) + i, t.historyToAppend = i;
                var s = Object.keys(a).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, a), e
            })
        }

        function k(e, t, n, r) {
            var i = e.tabs[t];
            return r === Mt.FLAG_OUTBOUND && i.out_up_to > n ? e : (r === Mt.FLAG_OUTBOUND ? i.out_up_to = n : i.in_up_to = n, e)
        }

        function N(e) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = Kt(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2];
                return extend({}, e, {
                    imKey: r,
                    imUrl: i,
                    imPart: a
                })
            })
        }

        function T(e) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = Kt(t, 1),
                    r = n[0];
                return extend({}, e, {
                    imTs: r
                })
            })
        }

        function F(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(Dt.setMessageError)(e, t, c(r.history))), Promise.resolve(n)
        }

        function O(e, t, n, r) {
            var i = r.tabs[e];
            return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(Dt.startResendMessage)(e, t, c(i.history))), Promise.resolve(r)
        }

        function E(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
                return !n && !Ye(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(At.arrayUnique)(r(e[a], a))), e
            }, e.dialog_tabs))
        }

        function S(e, t) {
            return 0 === e.length ? Promise.resolve(t) : Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(function(e) {
                var n = Kt(e, 1),
                    r = n[0];
                return t.admins = extend(t.admins, r), t
            })
        }

        function x(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                ot(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function I(e, t, n) {
            return Object(Dt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
        }

        function j(e, t) {
            var n = e.get().peer,
                r = Object(Ht.getTab)(e, n);
            if (Object(Dt.isFullyLoadedTab)(e, n)) {
                var i = c(r.history);
                r.history = Object(Dt.updateMessageInCache)(e, i, t)
            }
        }

        function L(e, t) {
            var n = Object(Ht.getTab)(t, e.peerId);
            if (Object(Dt.isFullyLoadedTab)(t, e.peerId)) {
                var r = c(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(Dt.editAndReplaceMessage)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var i = n && n.pinned && Object(Ht.parserMessage)(n.pinned);
            return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function M(e, t) {
            var n = e.flags & Mt.FLAG_OUTBOUND,
                i = e.peerId;
            if (Object(Dt.isTabLoaded)(t, i)) {
                var a = t.tabs[i];
                if (a.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = r({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? a.unread = 0 : (a.lastmsg == e.messageId && a.unread ? R(t, 1, e.peerId) : (!a.unread && R(t, 1, e.peerId), a.unread++), x(e.peerId, t)), Object(Dt.isFullyLoadedTab)(t, i)) {
                    var o = c(a.history);
                    a.skipped > 0 && a.skipped++, a.offset++, a.msgs[e.messageId] = extend(!0, {}, e), a.history = Object(Dt.appendToHistory)(t, e, o, !0, !0, !0), Object(qt.isOut)(e) && (a.blocked_community = 0, C(t))
                }
                if (a.typing) {
                    var s = a.typing.userIds.indexOf(e.userId);
                    s >= 0 && a.typing.userIds.splice(s, 1)
                }
                return a.lastmsg = e.messageId, a.lastmsg_meta = e, _(e.peerId, t), E(t, a, !1, I.bind(null, i), Ze.bind(null, t)), Promise.resolve(t)
            }
            return l(i, 0, 0, 0, t).then(function(t) {
                var r = t.tabs[i];
                return E(t, r, !1, I.bind(null, i), Ze.bind(null, t)), _(e.peerId, t), n || x(e.peerId, t), t
            })
        }

        function R(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function A(e, t) {
            if (Object(Dt.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = k(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(Ht.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && R(t, -1, e.peerId), !n.skipped) {
                    var i = c(n.history);
                    n.history = Object(Dt.removewNewUnreadBarAndMerge)(t, i, e.peerId)
                }
            } else Object(Dt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && R(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(Dt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Bt.FOLDER_UNREAD] = t.dialog_tabs[Bt.FOLDER_UNREAD].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== Bt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : $e(Bt.FOLDER_ALL, t)
        }

        function P(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(Dt.isTabLoaded)(t, e.peerId) && k(t, e.peerId, e.upToId, Mt.FLAG_OUTBOUND), Object(Dt.isFullyLoadedTab)(t, e.peerId)) {
                var r = c(n.history);
                n.history = Object(Dt.markMessagesAsRead)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function D(e, t, n, r, i) {
            return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
        }

        function B(e, t, n) {
            function i(e, t) {
                return {
                    id: e.messageId,
                    text: e.text,
                    date: e.date,
                    kludges: e.kludges,
                    authorName: t
                }
            }
            if (1 === e.length) {
                var a = e[0],
                    o = Object(Ht.getMessage)(n, t, a),
                    s = Object(Ht.getAuthorFullName)(n, t, a);
                return s === !1 ? n.set(Te.bind(null, r({}, t, [o.userId]))).then(function(n) {
                    var r = Object(Ht.getAuthorFullName)(n, t, a);
                    return {
                        msgIds: e,
                        object: i(o, r)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: i(o, s)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function H(e, t) {
            Object(Dt.normalizeTabsGotFromServer)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var i = t.tabs[r] ? t.tabs[r].msgs : {},
                    a = extend({}, i || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function q(e, t, n, r) {
            var i = Object(Ht.getTab)(r, e);
            if (i) {
                var a = t !== !1 ? t == $t ? 2 : mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
                i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
            }
            return Promise.resolve(r)
        }

        function z(e, t) {
            var n = Object(Ht.getTab)(t, e.peerId);
            return n && (e.ts = Date.now() / 1e3, n.typing = e), Promise.resolve(t)
        }

        function W(e, t) {
            return Object(Rt.pause)(Qt + 2).then(function() {
                if (Object(Dt.isTabLoaded)(t, e)) {
                    var n = t.tabs[e];
                    if (n.typing) {
                        var r = Date.now() - 1e3 * n.typing.ts;
                        r >= 1e3 * Qt && (n.typing = void 0)
                    }
                }
                return t
            })
        }

        function U(e) {
            return e.map(function(e) {
                return e[0] + ":" + e[1]
            }).join(",")
        }

        function G(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(At.arrayUnique)(n).sort(function(e, t) {
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

        function Q(e, t) {
            if (Object(Dt.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
                var i = n.msgs["rid" + e.randomId];
                i && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(Dt.replaceMessageAttrs)(t, c(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Y(e, t) {
            return Promise.resolve()
        }

        function $(e, t) {
            var n = {
                act: "a_get_media",
                id: e.messageId,
                gid: t.gid
            };
            return Object(Rt.retryFn)(jt.post, 3, function(e) {
                return e * e
            })(jt.CONTROLLER, n).then(function(n) {
                return X(e, n, t)
            })["catch"](function() {
                return X(e, null, t)
            })
        }

        function X(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], J(e, n)
        }

        function J(e, t) {
            var n = t.tabs[e.peerId];
            return n.history = Object(Dt.replaceAttaches)(c(n.history), e, t), Promise.resolve(t)
        }

        function Z(e, t, n) {
            var r = Object(Dt.dayFromVal)(t),
                i = n.tabs[e];
            return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
        }

        function ee(e, t, n) {
            var r = n.tabs[t];
            return r.searchText = e, he(t, n), n
        }

        function te(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function ne(e, t, n, r) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_hints",
                str: e,
                gid: r.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = Kt(e, 3),
                    n = t[0],
                    i = t[1],
                    a = t[2];
                return d(a, r), i.forEach(function(e) {
                    return Object(zt.oCacheAdd)(r, e)
                }), H(n, r), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function re(e, t, n, r) {
            return ne(e, t, n, r).then(function(e) {
                return e.map(function(e) {
                    return {
                        peerId: e.peerId,
                        name: e.tab,
                        photo: e.photo,
                        online: e.online,
                        is_friend: "friends" === n ? !0 : !1
                    }
                })
            })
        }

        function ie(e) {
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

        function ae(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = t ? e.search(t) : e.list,
                        i = r.map(ie);
                    return n.mapped_index || (n.mapped_index = {}), i.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), i
                })
            }
        }

        function oe(e, t) {
            var n = void 0,
                r = void 0;
            t.topConvTree = new Promise(function(e) {
                n = e
            }), t.hintsTree = new Promise(function(e) {
                r = e
            });
            var i = e.select(Pt.RECENT_SEARCH_OP);
            return Object(Rt.retryFn)(jt.post, 1, function() {
                return 4
            })(jt.CONTROLLER, {
                act: "a_dialogs_preload",
                rs: i.join(","),
                gid: t.gid
            })["catch"](function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var i = Kt(e, 3),
                    a = i[0],
                    o = i[1],
                    s = i[2];
                return t.popular_sugg = s, new vkIndexer(a, function(e) {
                    return e[1]
                }, n), new vkIndexer(o, function(e) {
                    return e[1]
                }, r), t
            })
        }

        function ce(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = Kt(n, 4),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3];
                return o.forEach(function(t) {
                    return Object(zt.oCacheAdd)(e, t)
                }), d(s, e), H(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
            })
        }

        function ue(e, t) {
            var n = t.tabs[e];
            return n.searchAllLoaded
        }

        function de(e, t) {
            if (t.peer === e && Object(Dt.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                return n.inplaceSearch
            }
            return !1
        }

        function le(e, t) {
            if (Object(Dt.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, Jt({
                    st: ""
                }), Zt()
            }
            return Promise.resolve(t)
        }

        function fe(e, t) {
            if (Object(Dt.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function he(e, t) {
            var n = t.tabs[e];
            return n.inplaceSearch = !0, Promise.resolve(t)
        }

        function pe(e) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function me(e, t) {
            var n = Object(Ht.getTab)(e, t);
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var i = Kt(r, 2),
                    a = i[0],
                    o = i[1];
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
                var s = Kt(o, 3);
                n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[Bt.FOLDER_UNREAD] = e.get().dialog_tabs[Bt.FOLDER_UNREAD].filter(function(e) {
                    return e != t
                })), E(e.get(), n, !1, I.bind(null, t), Ze.bind(null, e.get()))
            })
        }

        function _e(e, t, n) {
            if (Object(Dt.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function ge(e, t, n) {
            if (Object(Dt.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(Dt.removeMessages)(e, c(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }

        function ve(e, t, n, r) {
            if (Object(Dt.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(Dt.removeMessagesWithRestore)(e, t, n, c(i.history)), i.offset -= e.filter(function(e) {
                    return i.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function be(e, t, n) {
            if (Object(Dt.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(Dt.restoreMessage)(e, t, c(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function Ce(e, t, n, r) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: r
            })
        }

        function ye(e, t, n) {
            return t && (n.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
        }

        function we(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function ke(e, t, n) {
            if (Object(Dt.isTabLoaded)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, E(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && R(n, -1, e);
                var r = n.tabs[e];
                r.deletedDialog = !0;
                var i = n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                });
                return ot(i, !0, n), t.then(function(t) {
                    var i = Kt(t, 2);
                    return i[0], i[1], delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }

        function Ne(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }), Promise.resolve(n)
        }

        function Te(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                var n = Kt(e, 1),
                    r = n[0];
                return r.forEach(function(e) {
                    return Object(zt.oCacheAdd)(t, e)
                }), t
            })
        }

        function Fe(e, t, n) {
            function r(e, t) {
                Object(Dt.isChatPeer)(e) && t && !Object(zt.oCacheExists)(a, t) && (i[e] ? -1 === i[e].indexOf(t) && i[e].push(t) : i[e] = [t])
            }
            var i = {},
                a = n.get(),
                o = t.filter(function(e) {
                    return !Object(Dt.isTabLoaded)(a, e.peerId)
                }).map(function(e) {
                    return e.peerId
                });
            t.forEach(function(e) {
                Object(Dt.isTabLoaded)(a, e.peerId) && r(e.peerId, e.userId)
            }), e.forEach(function(e) {
                r(e.peerId, +e.kludges.source_mid)
            });
            var s = t.filter(function(e) {
                return e.flags & Mt.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !a.admins[e]
            });
            if (0 === Object.keys(i).length && 0 === s.length && 0 === o.length) return Promise.resolve(a);
            var c = Object.keys(i).length > 0 || s.length > 0 || o.length > 0;
            return {
                shouldLoad: c,
                needMembers: i,
                needAdminIds: s,
                needPeers: o
            }
        }

        function Oe(e, t, n) {
            var r = e.needMembers,
                i = e.needAdminIds,
                a = e.needPeers;
            return t.pause(), Promise.all([Te(r, n), S(i, n), Promise.all(a.map(function(e) {
                return l(e, 0, 0, 0, n)
            }))])["catch"](function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }

        function Ee(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(Dt.isTabLoaded)(r, n) && r.peer == n && (r = C(r)), Promise.resolve(r))
        }

        function Se(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, C(n)
        }

        function xe(e, t) {
            return t.stack = e, Promise.resolve(t)
        }

        function Ie(e, t, n, r) {
            if (Object(Dt.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                e.filter(function(e) {
                    return i.msgs[e]
                }).forEach(function(e) {
                    var a = Object(Ht.getMessage)(r, t, e),
                        o = n ? a.flags | Mt.FLAG_IMPORTANT : a.flags & ~Mt.FLAG_IMPORTANT;
                    a.flags = o, i.msgs[e] = a, i.history = Object(Dt.updateStar)(e, n, c(i.history))
                })
            }
            return Promise.resolve(r)
        }

        function je(e, t, n) {
            n.importants || (n.importants = {});
            var r = n.importants[t] || 0;
            return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function Le(e, t) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Me(e, t) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Re(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Ae(e, t) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Pe(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function De(e, t, n) {
            return Object(jt.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(function(e) {
                return n
            })
        }

        function Be(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                i = e.active_tab;
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: i,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var a = Kt(n, 5),
                    o = a[0],
                    s = a[1],
                    u = a[2],
                    d = a[3],
                    l = a[4];
                s.forEach(function(t) {
                    return Object(zt.oCacheAdd)(e, t)
                }), Object(Dt.normalizeTabsGotFromServer)(e, o), u.user_unread && handlePageCount("msg", u.user_unread), Object(At.lplog)("Resync success", "success");
                var f = e.peer,
                    h = void 0;
                if (Object(Dt.isReservedPeer)(f)) h = Promise.resolve(!1);
                else {
                    var p = {
                        tabs: r({}, f, e.tabs[f]),
                        oCache: {}
                    };
                    h = H(r({}, f, o[f]), p)
                }
                return h.then(function(n) {
                    e.tabs = o, e.admins = extend(e.admins, d), n && (e.tabs[f] = n.tabs[f], e.tabs[f].history = Object(Dt.restoreQueue)(f, e, c(e.tabs[f].history))), e.loadingDialogs = !1, e.mutedPeers = u.mutedPeers, e.lastDialogsOptions = {
                        has_more: u.has_more
                    }, e.dialog_tab_cts = u.folder_cts, e.dialog_tabs[i] = l.map(intval);
                    var r = e.dialog_tabs[i].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != i
                    }).forEach(function(t) {
                        i == Bt.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(Ye(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ue(intval(u.unread), e)
                })
            })["catch"](function(t) {
                return Object(At.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(Rt.pause)(2).then(Be.bind(null, e))
            })
        }

        function He(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function qe(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function ze() {
            return window.Upload && Upload.options && Upload.isSomethingUploading ? Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0 : !1
        }

        function We(e) {
            var t = e.textMediaSelector;
            return !!t.urlAttachmentLoading || ze()
        }

        function Ue(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[Bt.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function Ge(e, t) {
            return t.ctrl_submit = !!e, Object(jt.post)(jt.CONTROLLER, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Ve(e, t, n) {
            return function() {
                n.update_old_title = e;
                var r = Object.keys(n.cur_unread_cnt).length;
                if (0 === r) return Object(Vt.setDocumentTitle)(e ? e : document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                if (e) Object(Vt.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
                else {
                    e = document.title;
                    var i = r > 9 ? 10 : r;
                    setFavIcon("/images/icons/favicons/fav_im" + i + t + ".ico"), Object(Vt.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r)))
                }
            }
        }

        function Ke(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                i = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var a = Ve(r, i, n);
                n.update_title_to = setInterval(a, 1e3), a()
            } else !t && n.update_old_title && (Object(Vt.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function Qe(e, t, n, r, i) {
            return Object(Dt.isFullyLoadedTab)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
        }

        function Ye(e) {
            return e === Bt.FOLDER_ALL ? function() {
                return !0
            } : e === Bt.FOLDER_UNREAD ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & Bt.FOLDER_MASKS[e]
            }
        }

        function $e(e, t) {
            t.active_tab = e, Object(Lt.updateLocation)({
                tab: e === Bt.FOLDER_ALL ? null : e
            });
            var n = [];
            if (e !== Bt.FOLDER_ALL && !Object(Dt.isReversedDialogs)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[Bt.FOLDER_ALL].map(function(e) {
                    return t.tabs[e]
                }).filter(Ye(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Xe(e, t, n) {
            return e === Mt.SET_DIRECTORIES && n.folders & t ? !1 : e !== Mt.RESET_DIRECTORIES || n.folders & t ? !0 : !1
        }

        function Je(e, t, n) {
            return t !== Mt.RESET_DIRECTORIES || e.folders & Bt.FOLDER_MASKS[n] ? t === Mt.REPLACE_DIRECTORIES ? e.folders & Bt.FOLDER_MASKS[n] ? -1 : 1 : t === Mt.SET_DIRECTORIES ? 1 : -1 : 0
        }

        function Ze(e, t, n, r) {
            var i = e.dialog_tabs_all;
            if (i[Bt.FOLDER_ALL] || i[t]) return !0;
            if (n.filter(function(e) {
                    return e === r.peerId
                }).length > 0) return !0;
            if ("r" === r.lastmsg[0]) return !0;
            var a = n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(Dt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            });
            return a.length > 0 ? !0 : !1
        }

        function et(e, t, n, r, i) {
            if (Object(Dt.isTabLoaded)(i, e)) {
                var a = i.tabs[e];
                return n === Mt.REPLACE_DIRECTORIES && (t ^= a.folders), Xe(n, t, a) && Object.keys(Bt.FOLDER_MASKS).filter(function(e) {
                    return Bt.FOLDER_MASKS[e] & t
                }).forEach(function(e) {
                    i.dialog_tab_cts[e] += Je(a, n, e)
                }), n === Mt.SET_DIRECTORIES ? i.tabs[e].folders |= t : n === Mt.RESET_DIRECTORIES ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= a.folders, E(i, i.tabs[e], !0, function(t, n) {
                    return t.concat([e]).map(function(e) {
                        return i.tabs[e]
                    }).filter(Ye(n)).map(function(e) {
                        return e.peerId
                    })
                }, Ze.bind(null, i)), Promise.resolve(i)
            }
            return l(e, 0, 0, 0, i).then(et.bind(null, e, t, n, i))
        }

        function tt(e) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function nt(e, t) {
            return d(r({}, e, {
                free: !0
            }), t), Object(jt.post)(jt.CONTROLLER, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function rt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }

        function it(e, t, n, r) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_restore_dialog",
                hash: t,
                gid: r.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return r.tabs[e].deletedDialog = !1, E(r, r.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), r.tabs[e].unread = t, r
            })
        }

        function at(e, t, n) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function ot(e, t, n) {
            return n.tabbedPeers = e, Object(Dt.isClassicInterface)(n) && (Jt({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(Dt.getBareTab)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(Dt.convertPeerToUrl).join("_")
            }), t && Zt()), Promise.resolve(n)
        }

        function st(e) {
            return e.peer ? de(e.peer, e) ? ue(e.peer, e) : Object(Dt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
        }

        function ct(e, t) {
            var n = t.tabs[e];
            return Object(Dt.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function ut(e, t) {
            var n = t.tabs[e];
            return Object(Dt.isFullyLoadedTab)(t, e) && (n.history = u(n.history)), Promise.resolve(t)
        }

        function dt(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function lt(e, t, n) {
            if (!Object(Dt.isCommunityPeer)(t)) return Promise.resolve(n);
            var r = Object(Ht.getTab)(n, t);
            return r.blocked_community = !e, Object(jt.post)(jt.CONTROLLER, {
                act: "a_toggle_community",
                peer_id: t,
                hash: r.hash,
                state: e ? 1 : 0
            }).then(function() {
                return C(n)
            })
        }

        function ft(e, t) {
            if (0 !== t.peer && Object(Dt.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(Ht.getTab)(t, t.peer);
                n.history = c(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function ht(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function pt(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function mt(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function _t(e) {
            Jt({
                act: e ? "create" : null
            }), Zt()
        }

        function gt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            Jt({
                q: e
            }), Zt()
        }

        function vt(e) {
            return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(Dt.getClassicChatHeight)() > window.clientHeight() && Object(Dt.setClassicChatHeight)(0)), Promise.resolve(e)
        }

        function bt(e, t) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }

        function Ct(e) {
            return en({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function yt(e, t) {
            var n = Object(At.arrayUnique)([e].concat(t.select(Pt.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(Pt.RECENT_SEARCH_OP, n)
        }

        function wt(e) {
            e.update(Pt.RECENT_SEARCH_OP, [])
        }

        function kt(e, t) {
            var n = t.select(Pt.RECENT_SEARCH_OP).filter(function(t) {
                return t !== e
            });
            return t.update(Pt.RECENT_SEARCH_OP, n), n
        }

        function Nt(e, t, n) {
            var r = n.tabs[t],
                i = Object(Ht.getMessage)(n, t, e);
            return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
        }

        function Tt(e, t) {
            var n = t.tabs[e];
            return n.pinned = null, Promise.resolve(t)
        }

        function Ft(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(n)
        }

        function Ot(e, t, n, r) {
            var i = r.tabs[e];
            return n ? i.adminIds = [].concat(i.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : i.adminIds = i.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }

        function Et(e, t, n, i) {
            var a = Object(Ht.getMessage)(e, n, t),
                o = a.userId;
            return Object(zt.oCacheGet)(i, o) ? Promise.resolve(i) : Te(r({}, n, [o]), i)
        }

        function St() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function xt() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }

        function It(e, t) {
            return Object(jt.post)(jt.CONTROLLER, {
                act: "a_load_banner",
                peer_id: e
            }).then(function(n) {
                var r = Kt(n, 1),
                    i = r[0];
                return t.tabs[e].top_banner = i, t
            })
        }
        n.r(t), n.d(t, "TYPING_PERIOD", function() {
            return Qt
        }), n.d(t, "ACTION_PRIORITIES", function() {
            return tn
        }), n.d(t, "strHistory", function() {
            return u
        }), n.d(t, "updateBlockStates", function() {
            return d
        }), n.d(t, "loadPeer", function() {
            return l
        }), n.d(t, "restoreHistoryQueue", function() {
            return f
        }), n.d(t, "removeFailed", function() {
            return h
        }), n.d(t, "selectPeer", function() {
            return m
        }), n.d(t, "selectPeerOnMessage", function() {
            return g
        }), n.d(t, "changePeer", function() {
            return v
        }), n.d(t, "updateMentions", function() {
            return b
        }), n.d(t, "setActions", function() {
            return C
        }), n.d(t, "loadMoreHistory", function() {
            return y
        }), n.d(t, "loadLessHistory", function() {
            return w
        }), n.d(t, "readLastMessages", function() {
            return nn
        }), n.d(t, "loadLongPollKey", function() {
            return N
        }), n.d(t, "loadLongPollTs", function() {
            return T
        }), n.d(t, "setMessageErrored", function() {
            return F
        }), n.d(t, "resendMessage", function() {
            return O
        }), n.d(t, "loadAdmins", function() {
            return S
        }), n.d(t, "updateVideoThumb", function() {
            return j
        }), n.d(t, "editMessage", function() {
            return L
        }), n.d(t, "addMessage", function() {
            return M
        }), n.d(t, "markInboundMessagesAsRead", function() {
            return A
        }), n.d(t, "markOutboundMessagesAsRead", function() {
            return P
        }), n.d(t, "initTextStore", function() {
            return D
        }), n.d(t, "processFwd", function() {
            return B
        }), n.d(t, "mergeTabs", function() {
            return H
        }), n.d(t, "updateOnline", function() {
            return q
        }), n.d(t, "setTyping", function() {
            return z
        }), n.d(t, "waitTyping", function() {
            return W
        }), n.d(t, "deliverMessage", function() {
            return rn
        }), n.d(t, "deliverEditedMessage", function() {
            return an
        }), n.d(t, "addSelection", function() {
            return G
        }), n.d(t, "cleanSelected", function() {
            return V
        }), n.d(t, "dropSelection", function() {
            return K
        }), n.d(t, "replaceMessage", function() {
            return Q
        }), n.d(t, "saveMedia", function() {
            return Y
        }), n.d(t, "loadMedia", function() {
            return $
        }), n.d(t, "addAttachmentsToStoreData", function() {
            return X
        }), n.d(t, "replaceMediaAttachesStore", function() {
            return J
        }), n.d(t, "setCurrentSearchDate", function() {
            return Z
        }), n.d(t, "setInplaceSearch", function() {
            return ee
        }), n.d(t, "setCurrentSearch", function() {
            return te
        }), n.d(t, "searchHints", function() {
            return ne
        }), n.d(t, "searchHintsIndex", function() {
            return re
        }), n.d(t, "localIndexToDialog", function() {
            return ie
        }), n.d(t, "searchTopConv", function() {
            return on
        }), n.d(t, "searchLocalHints", function() {
            return sn
        }), n.d(t, "preloadSearchIndex", function() {
            return oe
        }), n.d(t, "loadDialogs", function() {
            return ce
        }), n.d(t, "searchMessages", function() {
            return cn
        }), n.d(t, "isSearchAllLoaded", function() {
            return ue
        }), n.d(t, "isSearchingInplace", function() {
            return de
        }), n.d(t, "cancelSearch", function() {
            return le
        }), n.d(t, "clearDate", function() {
            return fe
        }), n.d(t, "searchInplaceStart", function() {
            return he
        }), n.d(t, "searchMessagesInplace", function() {
            return un
        }), n.d(t, "loadImportant", function() {
            return pe
        }), n.d(t, "loadActualLastMessage", function() {
            return me
        }), n.d(t, "removeMessagesMarkDeleted", function() {
            return _e
        }), n.d(t, "removeMessages", function() {
            return ge
        }), n.d(t, "removeMessageSend", function() {
            return dn
        }), n.d(t, "removeMessagesWithRestore", function() {
            return ve
        }), n.d(t, "restoreMessage", function() {
            return be
        }), n.d(t, "restoreMessageSend", function() {
            return Ce
        }), n.d(t, "sendTyping", function() {
            return ln
        }), n.d(t, "forwardMessages", function() {
            return ye
        }), n.d(t, "prepareForward", function() {
            return we
        }), n.d(t, "deletedDialog", function() {
            return ke
        }), n.d(t, "flushHistory", function() {
            return fn
        }), n.d(t, "updateChatTopic", function() {
            return hn
        }), n.d(t, "loadChatInfo", function() {
            return pn
        }), n.d(t, "addNewMemberOptimisticly", function() {
            return Ne
        }), n.d(t, "addNewMember", function() {
            return mn
        }), n.d(t, "loadChatMember", function() {
            return Te
        }), n.d(t, "checkNewPeople", function() {
            return Fe
        }), n.d(t, "loadNewPeople", function() {
            return Oe
        }), n.d(t, "updateChatPhoto", function() {
            return _n
        }), n.d(t, "updateActions", function() {
            return Ee
        }), n.d(t, "leaveChat", function() {
            return gn
        }), n.d(t, "returnToChat", function() {
            return vn
        }), n.d(t, "toggleMutePeer", function() {
            return bn
        }), n.d(t, "setMutedPeer", function() {
            return Se
        }), n.d(t, "setExecStack", function() {
            return xe
        }), n.d(t, "favMessage", function() {
            return Cn
        }), n.d(t, "updateFavMessage", function() {
            return Ie
        }), n.d(t, "updateImportant", function() {
            return je
        }), n.d(t, "loadSpam", function() {
            return Le
        }), n.d(t, "flushSpam", function() {
            return Me
        }), n.d(t, "setCreationType", function() {
            return Re
        }), n.d(t, "getOwnerPhoto", function() {
            return Ae
        }), n.d(t, "presetAvatar", function() {
            return Pe
        }), n.d(t, "setChatPhoto", function() {
            return De
        }), n.d(t, "createChat", function() {
            return yn
        }), n.d(t, "resync", function() {
            return Be
        }), n.d(t, "toggleSendingAbility", function() {
            return He
        }), n.d(t, "setDelayedMessage", function() {
            return qe
        }), n.d(t, "isAnythingLoading", function() {
            return We
        }), n.d(t, "updateUnreadCount", function() {
            return Ue
        }), n.d(t, "changeSubmitSettings", function() {
            return Ge
        }), n.d(t, "updateFavAndTitle", function() {
            return Ke
        }), n.d(t, "saveHistoryScroll", function() {
            return Qe
        }), n.d(t, "filterFromTab", function() {
            return Ye
        }), n.d(t, "changeDialogsTab", function() {
            return $e
        }), n.d(t, "updateFolderState", function() {
            return et
        }), n.d(t, "toggleDialogImportant", function() {
            return wn
        }), n.d(t, "markDialogAnswered", function() {
            return kn
        }), n.d(t, "getMutexQueue", function() {
            return tt
        }), n.d(t, "releaseBlock", function() {
            return nt
        }), n.d(t, "toggleCommunityMute", function() {
            return rt
        }), n.d(t, "deleteDialog", function() {
            return Nn
        }), n.d(t, "restoreDialog", function() {
            return it
        }), n.d(t, "spamDialog", function() {
            return at
        }), n.d(t, "updateTabbedPeers", function() {
            return ot
        }), n.d(t, "isEverythingLoaded", function() {
            return st
        }), n.d(t, "cleanTab", function() {
            return ct
        }), n.d(t, "stringifyTab", function() {
            return ut
        }), n.d(t, "updateGoToEndVisibility", function() {
            return dt
        }), n.d(t, "toggleCommunityMessages", function() {
            return lt
        }), n.d(t, "updateHistory", function() {
            return ft
        }), n.d(t, "startRecording", function() {
            return ht
        }), n.d(t, "cancelRecording", function() {
            return pt
        }), n.d(t, "setVoiceMessageAvail", function() {
            return mt
        }), n.d(t, "toggleConversation", function() {
            return _t
        }), n.d(t, "updateSearchQuery", function() {
            return gt
        }), n.d(t, "initializeChatResize", function() {
            return vt
        }), n.d(t, "joinChat", function() {
            return Tn
        }), n.d(t, "getInviteLink", function() {
            return bt
        }), n.d(t, "resetInviteLink", function() {
            return Fn
        }), n.d(t, "leaveInvitation", function() {
            return Ct
        }), n.d(t, "saveRecentSearchPeer", function() {
            return yt
        }), n.d(t, "resetRecentSearch", function() {
            return wt
        }), n.d(t, "removeFromRecentSearch", function() {
            return kt
        }), n.d(t, "pinMessageOptimistic", function() {
            return Nt
        }), n.d(t, "unpinMessageOptimistic", function() {
            return Tt
        }), n.d(t, "pinMessage", function() {
            return On
        }), n.d(t, "unpinMessage", function() {
            return En
        }), n.d(t, "getPinnedMessage", function() {
            return Sn
        }), n.d(t, "getMessageLocalId", function() {
            return xn
        }), n.d(t, "getChatDetails", function() {
            return In
        }), n.d(t, "updateFlags", function() {
            return jn
        }), n.d(t, "removeChatPhoto", function() {
            return Ln
        }), n.d(t, "kickUserOptimisticly", function() {
            return Ft
        }), n.d(t, "kickUser", function() {
            return Mn
        }), n.d(t, "toggleAdminOptimisticly", function() {
            return Ot
        }), n.d(t, "toggleAdmin", function() {
            return Rn
        }), n.d(t, "checkChatMember", function() {
            return Et
        }), n.d(t, "hidePromoTooltip", function() {
            return St
        }), n.d(t, "videoAutoPlayHandler", function() {
            return xt
        }), n.d(t, "hideTopBannerAction", function() {
            return An
        }), n.d(t, "callbackTopBannerAction", function() {
            return Pn
        }), n.d(t, "loadBanner", function() {
            return It
        });
        var jt = n(141),
            Lt = n(140),
            Mt = n(59),
            Rt = n(95),
            At = n(89),
            Pt = n(127),
            Dt = n(156),
            Bt = n(170),
            Ht = n(119),
            qt = n(138),
            zt = n(199),
            Wt = n(131),
            Ut = n(103),
            Gt = n(69),
            Vt = n(181),
            Kt = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        i = !0, a = c
                    } finally {
                        try {
                            !r && s["return"] && s["return"]()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Qt = 5,
            Yt = 2e4,
            $t = 8,
            Xt = Object(Lt.updateLazyLocation)(),
            Jt = Xt.scheduleNav,
            Zt = Xt.commitNav,
            en = Xt.scheduleNavWithTimeOut,
            tn = {
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
            },
            nn = s(function(e, t) {
                var n = t.tabs[e],
                    r = Object.keys(n.msgs).map(function(n) {
                        return Object(Ht.getMessage)(t, e, n)
                    }).filter(function(e) {
                        return !Object(qt.isOut)(e)
                    }).map(function(e) {
                        return e.messageId
                    }).sort(function(e, t) {
                        return t - e
                    });
                return n.skipped > 0 && (r = r.filter(function(e) {
                    return intval(e) <= n.lastmsg - n.skipped
                })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Mt.readInboundEvent([6, e, r])]), Object(jt.post)(jt.CONTROLLER, {
                    peer: e,
                    ids: [r],
                    hash: n.hash,
                    act: "a_mark_read",
                    gid: t.gid
                }).then(function() {
                    return k(t, e, r, Mt.FLAG_OUTBOUND)
                }))
            }),
            rn = s(function(e, t, n) {
                var r = Date.now() + rand(0, 100).toFixed(0),
                    i = n.tabs[e];
                return Object(Rt.retryFn)(jt.post, 1)(jt.CONTROLLER, {
                    act: "a_send",
                    to: e,
                    hash: i.hash,
                    msg: t.message,
                    media: U(t.attaches),
                    guid: r,
                    share_url: t.share_url,
                    random_id: t.rid,
                    gid: n.gid,
                    entrypoint: n.currentEntryPoint || "",
                    sticker_referrer: t.sticker_referrer
                }, Yt).then(function(e) {
                    var t = Kt(e, 1),
                        r = t[0];
                    return n.version !== r.version && nav.reload({
                        force: !0
                    }), n.currentEntryPoint = "", n
                })
            }),
            an = s(function(e, t, n) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: U(t.attaches),
                    share_url: t.share_url
                }, Yt).then(function(e) {
                    var t = Kt(e, 1);
                    return t[0], n
                })
            }),
            on = ae(function(e) {
                return e.topConvTree
            }),
            sn = ae(function(e) {
                return e.hintsTree
            }),
            cn = s(function(e, t) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_search",
                    q: e,
                    from: "all",
                    gid: t.gid,
                    hash: t.writeHash,
                    offset: t.searchOffset || 0
                }).then(function(n) {
                    var r = Kt(n, 5),
                        i = r[0],
                        a = r[1],
                        o = r[2],
                        s = r[3],
                        c = r[4];
                    return a.forEach(function(e) {
                        return Object(zt.oCacheAdd)(t, e)
                    }), Object(Dt.normalizeTabsGotFromServer)(t, i), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                        return !t.tabs[e]
                    }).forEach(function(e) {
                        t.tabs[e] = i[e]
                    }), [i, o]
                })
            }),
            un = s(function(e, t) {
                var n = t.tabs[e],
                    r = "";
                if (he(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
                var i = "in:" + e + " " + r + " " + (n.searchText || "");
                return Jt({
                    st: n.searchText
                }), Zt(), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_search",
                    q: i,
                    from: "in",
                    gid: t.gid,
                    hash: t.writeHash,
                    offset: n.searchOffset || 0
                }).then(function(e) {
                    var t = Kt(e, 3),
                        r = t[0],
                        i = t[1],
                        a = t[2];
                    return n.searchOffset = i, n.searchAllLoaded = a, r
                })
            }),
            dn = s(function(e, t, n, r, i) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_mark",
                    peer: t,
                    hash: n || i.tabs[t].hash,
                    gid: i.gid,
                    msgs_ids: e.join(","),
                    mark: r
                })
            }),
            ln = s(function(e, t) {
                return t.tabs[e].lastTyping = Date.now(), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_typing",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                }, function() {
                    return t
                })
            }),
            fn = s(function(e, t) {
                return ke(e, Object(jt.post)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            hn = s(function(e, t, n) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            pn = s(function(e, t) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = Kt(n, 1),
                        i = r[0];
                    return t.tabs[e] = extend(t.tabs[e], i), t
                })
            }),
            mn = s(function(e, t, n) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_add_chat_members",
                    peer: e,
                    new_peer: t.join(","),
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            _n = s(function(e, t) {
                return e.kludges.source_act === Dt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(jt.post)(jt.CONTROLLER, {
                    act: "a_get_chat_photo",
                    msg_id: e.messageId
                }).then(function(n) {
                    var r = Kt(n, 2),
                        i = r[0],
                        a = r[1];
                    t.chat_photo_msg = a;
                    var o = t.tabs[e.peerId];
                    if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(Dt.isFullyLoadedTab)(t, e.peerId)) {
                        var s = e.kludges.source_act;
                        o.history = Object(Dt.addChatPhotoToUpdate)(e, s, t, c(o.history))
                    }
                    return t
                })
            }),
            gn = s(function(e, t) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(Ee.bind(null, Dt.CHAT_KICK_USER, vk.id, e, t))
            }),
            vn = s(function(e, t) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(Ee.bind(null, Dt.CHAT_INVITE_USER, vk.id, e, t))
            }),
            bn = s(function(e, t, n) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(function() {
                    var r = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: r,
                        peer: e
                    }), n
                }).then(Se.bind(null, e, t))
            }),
            Cn = s(function(e, t, n, r) {
                return Ie(e, n, t, r), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_mark_important",
                    ids: e,
                    val: t ? 1 : 0,
                    from: "im",
                    gid: r.gid,
                    peer: n,
                    hash: r.tabs[n].hash
                }).then(function(e) {
                    return r
                })
            }),
            yn = s(function(e, t, n, r) {
                return r.creating = !0, r.longpoll.pause(), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_multi_start",
                    hash: r.writeHash,
                    peers: t.join(","),
                    title: n
                }).then(function(e) {
                    var t = Kt(e, 1),
                        n = t[0];
                    return r.next_peer = n.peerId, r.tabs[n.peerId] = n, E(r, n, !1, function(e) {
                        return [n.peerId].concat(e)
                    }), r.longpoll.resume(), r
                }).then(function(t) {
                    return e ? De(t.next_peer, e, t) : t
                }).then(function(e) {
                    return e.creating = !1, e
                })["catch"](function(e) {
                    throw r.creating = !1, r.longpoll.resume(), e
                })
            }),
            wn = s(function(e, t) {
                var n = Bt.FOLDER_MASKS[Bt.FOLDER_IMPORTANT],
                    r = t.tabs[e].folders & n,
                    i = r ? Mt.resetDirectoriesEvent : Mt.setDirectoriesEvent;
                return t.longpoll.push([i([0, e, n, !0])]), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_dialog_star",
                    val: r ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            kn = s(function(e, t, n) {
                var r = Bt.FOLDER_MASKS[Bt.FOLDER_UNRESPOND];
                return n.longpoll.push([Mt.resetDirectoriesEvent([0, e, r, !0]), Mt.readInboundEvent([6, e, t])]), Object(jt.post)(jt.CONTROLLER, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(function() {
                    return n
                })
            }),
            Nn = s(function(e, t) {
                return E(t, t.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), t.tabs[e].deletedDialog = !0, Object(jt.post)(jt.CONTROLLER, {
                    act: "a_delete_dialog",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    return n[0] ? (ot(t.tabbedPeers.filter(function(t) {
                        return t.peer !== e
                    }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, E(t, t.tabs[e], !1, I.bind(null, e), Ze.bind(null, t))), n
                })
            }),
            Tn = s(function(e, t, n) {
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_join_chat",
                    chat_id: e,
                    hash: t,
                    write_hash: n.writeHash
                }).then(function(e) {
                    var t = Kt(e, 4),
                        r = t[0],
                        i = t[1],
                        a = t[2],
                        o = t[3];
                    return a.forEach(function(e) {
                        return Object(zt.oCacheAdd)(n, e)
                    }), n.tabs[r] = i, E(n, i, !1, I.bind(null, r), Ze.bind(null, n)), n.admins = extend(n.admins, o), [r]
                })
            }),
            Fn = s(function(e, t) {
                var n = t.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_reset_link",
                    chat_id: e - 2e9,
                    write_hash: t.writeHash
                }).then(function(e) {
                    return n.inviteLink = e[0], e
                })
            }),
            On = s(function(e, t, n) {
                var r = n.tabs[t];
                return r.data.kicked || r.data.closed ? Promise.resolve(n) : Object(jt.post)(jt.CONTROLLER, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var i = Kt(e, 1),
                        a = i[0];
                    return n.tabs[t] = Object.assign({}, r, a), n
                })
            }),
            En = s(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(jt.post)(jt.CONTROLLER, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var i = Kt(r, 1),
                        a = i[0];
                    return t.tabs[e] = Object.assign({}, n, a), t
                })
            }),
            Sn = s(function(e, t) {
                var n = t.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = Kt(e, 1),
                        i = r[0];
                    return n.pinned = i || null, t
                })
            }),
            xn = s(function(e, t, n) {
                var r = n.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: r.hash
                })
            }),
            In = s(function(e, t) {
                var n = t.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_get_chat_details",
                    chat: e,
                    hash: n.hash
                }).then(function(e) {
                    var r = Kt(e, 1),
                        i = r[0];
                    return n.photoGrid = i.grid, n.photoLarge = i.photo, n.membersLastSeen = i.lastSeen || null, n.inviters = i.inviters, n.invitedByMe = i.invitedByMe || [], n.inviteLink = i.link || null, n.serverSettings = i.serverSettings || null, t
                })
            }),
            jn = s(function(e, t, n) {
                var r = n.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_update_flags",
                    chat: e,
                    hash: r.hash,
                    flags: t
                })
            }),
            Ln = s(function(e, t) {
                var n = t.tabs[e];
                return Object(jt.post)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            }),
            Mn = s(function(e, t, n) {
                var r = n.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_kick_user",
                    chat: e,
                    hash: r.hash,
                    mid: t
                }).then(function() {
                    return r.adminIds = r.adminIds.filter(function(e) {
                        return e !== t
                    }), n
                })
            }),
            Rn = s(function(e, t, n, r) {
                var i = r.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_toggle_admin",
                    chat: e,
                    hash: i.hash,
                    mid: t,
                    is_admin: +n
                }).then(function() {
                    return Ot(e, t, n, r)
                })
            }),
            An = s(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(jt.post)(jt.CONTROLLER, {
                    act: "a_hide_banner",
                    peer_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Pn = s(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var r = n.tabs[e];
                return Object(jt.post)(jt.CONTROLLER, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: r.hash
                }).then(function() {
                    return n
                })
            })
    },
    89: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = [],
                r = 0;
            return function(i) {
                n.push(i), r || (r = setTimeout(function() {
                    r = !1, e(n), n = []
                }, t))
            }
        }

        function i(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function a(e, t) {
            var n = void 0,
                r = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        n = "color: red", r = "background: red; color: white";
                        break;
                    case "success":
                        n = "color: green", r = "background: green; color: white";
                        break;
                    default:
                        n = "color: blue;", r = "background: #000; color: #fff;"
                }
                try {
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, r, n)
                } catch (a) {}
            }
        }

        function o(e) {
            var t = [];
            if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var n = 0; n < e.length; n++) t.push(e[n]);
            return t
        }

        function s(e) {
            for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
            return n
        }

        function c(e) {
            for (var t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), i = new Uint8Array(r.length), a = 0; a < r.length; ++a) i[a] = r.charCodeAt(a);
            return i
        }
        n.r(t), n.d(t, "throttleAccumulate", function() {
            return r
        }), n.d(t, "executionStackPop", function() {
            return i
        }), n.d(t, "lplog", function() {
            return a
        }), n.d(t, "toArray", function() {
            return o
        }), n.d(t, "arrayUnique", function() {
            return s
        }), n.d(t, "urlBase64ToUint8Array", function() {
            return c
        })
    },
    9: function(e, t, n) {
        "use strict";

        function r(e) {
            return {
                unmount: function() {
                    Object(a.destroyModule)(e)
                }
            }
        }

        function i(e, t, n) {
            var i = Object(a.createMutations)(r),
                o = i.bindMutations,
                s = Object(a.createModule)({
                    handlers: function(e, t) {}
                });
            return o(s)
        }
        n.r(t), n.d(t, "mount", function() {
            return i
        });
        var a = n(46)
    },
    95: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return new Promise(function(n) {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = 0;
            return function a() {
                for (var o = arguments.length, s = Array(o), c = 0; o > c; c++) s[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, s)
                })["catch"](function(e) {
                    if (i++, t >= i) {
                        var o = "function" == typeof n ? n(i) : 0;
                        return 0 === o ? a.apply(void 0, s) : r(o).then(function() {
                            return a.apply(void 0, s)
                        })
                    }
                    throw e
                })
            }
        }

        function a(e, t, n) {
            var r = void 0,
                i = void 0;
            return function() {
                for (var a = arguments.length, o = Array(a), s = 0; a > s; s++) o[s] = arguments[s];
                return new Promise(function(e, a) {
                    var s = function() {
                            r = null, i = null, n || e(o)
                        },
                        c = n && !r;
                    clearTimeout(r), i && i.reject("debounce"), r = setTimeout(s, t), c ? e(o) : n && a("debounce"), i = {
                        resolve: e,
                        reject: a
                    }
                }).then(function(t) {
                    return e.apply(void 0, t)
                })
            }
        }

        function o(e, t) {
            var n = void 0,
                r = new Promise(function(r) {
                    n = r, setTimeout(r.bind(null, t), 1e3 * e)
                });
            return {
                pause: function() {
                    return r
                },
                abort: function() {
                    n(t)
                }
            }
        }
        n.r(t), n.d(t, "pause", function() {
            return r
        }), n.d(t, "retryFn", function() {
            return i
        }), n.d(t, "debouncedPromise", function() {
            return a
        }), n.d(t, "abortablePause", function() {
            return o
        })
    }
});