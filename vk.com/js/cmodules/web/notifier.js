! function(e) {
    function t(a) {
        if (i[a]) return i[a].exports;
        var o = i[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}({
    0: function(e, t, i) {
        e.exports = i(116)
    },
    1: function(e, t, i) {
        "use strict";

        function a() {
            return !curFastChat.version || !curFastChat.tabs
        }
        var o = i(51),
            r = i(53),
            s = i(127),
            n = 1e4;
        window.curFastChat || (window.curFastChat = {}), window.FastChat = {
            init: function(e) {
                extend(curFastChat, {
                    tabs: {},
                    needPeers: {},
                    gotPeers: {},
                    needMedia: {},
                    gotMedia: {},
                    ldb: (0, o.mount)(vk.id),
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
                        var i, o = t.id,
                            r = curFastChat.tabs[o],
                            s = !1;
                        if (void 0 !== r) {
                            s = {
                                name: r.name,
                                photo: r.photo,
                                fname: r.fname,
                                hash: r.hash,
                                sex: r.sex,
                                data: r.data,
                                online: r.online
                            };
                            for (var n in r.msgs) {
                                s.history = [r.log.innerHTML, r.msgs];
                                break
                            }
                        } else(i = curFastChat.friends[o + "_"]) && (s = {
                            name: i[0],
                            photo: i[1],
                            fname: i[2],
                            hash: i[3],
                            data: i[4],
                            online: curFastChat.onlines[o]
                        });
                        if (s === !1) break;
                        curFastChat.gotPeers[o] = setTimeout(function() {
                            var e = {};
                            e[o] = s, FastChat.lcSend("gotPeers", e)
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
                            l = curFastChat.gotMedia[c];
                        if (void 0 === l || 0 === l) break;
                        curFastChat.gotMedia[c][3] = setTimeout(function() {
                            FastChat.lcSend("gotMedia", {
                                msgId: c,
                                peer: l[0],
                                text: l[1],
                                msgOpts: l[2]
                            })
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingMedia":
                        var c = t.msgId,
                            u = curFastChat.needMedia[c];
                        if (void 0 === u || 0 === curFastChat.gotMedia[c]) break;
                        clearTimeout(u[1]), u[1] = setTimeout(FastChat.loadMsgMedia.pbind(u[0], c), 1e3);
                        break;
                    case "gotMedia":
                        var c = t.msgId,
                            l = curFastChat.gotMedia[c];
                        isArray(l) && clearTimeout(l[3]), FastChat.gotMsgMedia(t.peer, c, t.text, t.msgOpts)
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
                            o = e[1],
                            r = e[2],
                            s = e[3] ? e[3] : 1,
                            n = curFastChat.tabs[r],
                            c = curFastChat.onlines[r];
                        if (a != curFastChat.version) return FastChat.updateVersion(a), i = !0, !1;
                        if (curFastChat.friends[r + "_"] || n) switch (o) {
                            case "online":
                                if (c == s) break;
                                curFastChat.onlines[r] = s, FastChat.tabNotify(r, "online", s), t = !0;
                                break;
                            case "offline":
                                if (!c) break;
                                delete curFastChat.onlines[r], re("fc_contact" + r) && curFastChat.clistBox.visible && FastChat.clistShowMore(), FastChat.tabNotify(r, "offline")
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
                                o = e[1],
                                r = e[2],
                                s = 0;
                            if (t != curFastChat.version) return FastChat.updateVersion(t), a = !0, !1;
                            switch (o) {
                                case "read":
                                case "edit":
                                case "delete":
                                    break;
                                case "typing":
                                    s = 1;
                                    break;
                                case "new":
                                    s = 2 & e[4] ? 0 : 2;
                                    break;
                                default:
                                    return
                            }
                            i[r] || (i[r] = [0]), i[r][0] |= s, i[r].push(e)
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
                            Chat.tabs[e] && FastChat.blinkTyping(e)
                    }
                }), i ? (each(t, function(t, o) {
                    switch (o[1]) {
                        case "new":
                            stManager.add(["imn.js"], function() {
                                intval(o[8]) && (0, s.confirmDelivery)(o[3]), each(i.sentmsgs, function(e, t) {
                                    var i = ge("fc_msg" + t),
                                        a = i && i.parentNode;
                                    re(i) && a && !geByClass("fc_msg", a).length && re(domClosest("fc_msgs_wrap", a))
                                });
                                var t = ge("fc_msg" + o[3]);
                                t || (FastChat.addMsg(FastChat.prepareMsgData(o.slice(2))), i.msgs[o[3]] = [2 & o[4] ? 1 : 0, 1 & o[4]], 1 === (3 & o[4]) && i.unread++, FastChat.scroll(e)), FastChat.blinkTab(e)
                            });
                            break;
                        case "read":
                            var r = [],
                                n = intval(o[3]);
                            each(i.msgs, function(e) {
                                intval(e) <= n && i.msgs[e][1] && r.push(intval(e))
                            }), each(r, function(e, t) {
                                var a, o = ge("fc_msg" + t);
                                o && (a = i.msgs[t] && i.msgs[t][0] ? o.parentNode.parentNode : o.parentNode, i.msgs[t] && i.msgs[t][1] && (i.msgs[t][1] = 0, i.msgs[t][0] || i.unread--), removeClass(o, "fc_msg_unread"), hasClass(a.parentNode, "fc_msgs_unread") && each(a.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(a.parentNode, "fc_msgs_unread"), !1)
                                }))
                            });
                            break;
                        case "typing":
                            e > 2e9 ? (curFastChat.typingEvents[e] || (curFastChat.typingEvents[e] = {}), curFastChat.typingEvents[e][o[3]] = a) : curFastChat.typingEvents[e] = a, FastChat.updateTyping(e);
                            break;
                        case "edit":
                            var c = i.msgs[o[3]];
                            c && (delete curFastChat.gotMedia[o[3]], o[4] = (c[0] ? 2 : 0) + (c[1] ? 1 : 0), FastChat.editMsg(FastChat.prepareMsgData(o.slice(2))));
                            break;
                        case "delete":
                            FastChat.deleteMsg(FastChat.prepareMsgData(o.slice(2)))
                    }
                }), i.unread > 0 && (i.unread = 0, each(i.msgs, function() {
                    !this[0] && this[1] && i.unread++
                })), i.auto && !i.unread && (i.box._close(!0), delete curFastChat.tabs[e]), void FastChat.updateUnreadTab(e)) : !1
            },
            tabNotify: function(e, t, i) {
                var a = curFastChat.tabs[e],
                    o = void 0;
                if (e > 0 && 2e9 > e && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, i), !(0 >= e) && a && a.box && !a.box.minimized) {
                    switch (clearTimeout(a.hideNotifyTO), t) {
                        case "online":
                            o = getLang("mail_im_user_became_online", 3 - a.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            o = getLang("mail_im_user_became_offline", 3 - a.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            o = getLang("mail_im_not_online", 3 - a.sex).replace(/\.$/, "")
                    }
                    o = o.replace("{user}", a.fname), val(a.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + o + "</div>");
                    var r = a.notify.firstChild;
                    clearTimeout(a.hideNotifyTO), a.hideNotifyTO = setTimeout(function() {
                        fadeOut(r, 200, function() {
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
                    var o = {
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
                    i && !a && (i.clist.x !== !1 && (-1 == i.clist.x ? o.startRight = 0 : o.startLeft = t[1] * i.clist.x), i.clist.y !== !1 && (-1 == i.clist.y ? o.startBottom = 0 : o.startTop = t[0] * i.clist.y)), a && (o.noshow = !0), void 0 === o.startTop && void 0 === o.startBottom && (o.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === o.startLeft && void 0 === o.startRight && (o.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, o), o.noshow || void 0 === o.startLeft && void 0 === o.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                        prefix: "fc_",
                        scrollChange: FastChat.clistShowMore,
                        nomargin: !0,
                        global: !0,
                        nokeys: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto"
                    }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4), curFastChat.updateTypingsInt = setInterval(FastChat.updateTypings, 5e3);
                    var r = ge("fc_clist_filter");
                    if (placeholderInit(r, {
                            global: !0
                        }), curFastChat.q = "", addEvent(r, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                            if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                            var t = FastChat.clistFilterKey(e);
                            return void 0 !== t ? t : (curFastChat.q = trim(val(this)), void FastChat.clistRender())
                        }), e.clistOnline) {
                        var s;
                        bodyNode.appendChild(s = ce("nobr", {
                            className: "fl_l",
                            innerHTML: getLang("mail_im_clist_onlines")
                        }, {
                            visibility: "hidden",
                            position: "absolute"
                        })), re(s), addEvent(e.clistOnline, "mouseover", function(t) {
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
                    o = Chat.tabs[a];
                return o ? curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == a ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(i, {
                    text: o.name,
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
                        var o = {
                            startHeight: intval(a[0] * e.h),
                            startWidth: intval(a[1] * e.w)
                        }; - 1 == e.y ? o.startBottom = 0 : o.startTop = intval(a[0] * e.y), -1 == e.x ? o.startRight = 0 : o.startLeft = intval(a[1] * e.x), FastChat.addPeer(e.peer, !1, !1, o);
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
                        var r = intval(a[1] * e.w);
                        setStyle(i.resizeableH, "height", intval(a[0] * e.h)), setStyle(i.resizeableW, "width", r), FastChat.fixResized(t, r);
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
                    o = curFastChat.q,
                    r = !1,
                    s = !1,
                    n = !1;
                if (o ? (n = [], each(FastChat.clistCache(o), function() {
                        n.push(escapeRE(this))
                    }), n = new RegExp("([ -]|^|s|&nbsp;|\b)(" + n.join("|") + ")", "gi"), r = curFastChat.clistCache[o] || {}) : curFastChat.clOnlines && (r = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var o = intval(e),
                            c = !r || r[o];
                        if (!i) return void(o == curFastChat.clOffset && (i = !0));
                        if (c) {
                            if (!--a) return curFastChat.clHasMore = !0, !1;
                            t.push(FastChat.clistWrapPeer(o, this, n)), s = o
                        }
                    }), s !== !1 || e || o ? o && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(o, n, s === !1)) : t.push('<div class="fc_clist_empty">' + getLang(o ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = s, e) {
                    for (var c = ce("div", {
                            innerHTML: t.join("")
                        }), l = document.createDocumentFragment(); c.firstChild;) l.appendChild(c.firstChild);
                    curFastChat.el.clist.appendChild(l), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
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
                    var u = ge("fc_contact" + curFastChat.clSel);
                    u ? FastChat.clistPeerOver(u, 1) : curFastChat.clSel = !1
                } else {
                    var u = geByClass1("fc_contact", curFastChat.el.clist);
                    FastChat.clistPeerOver(u, 1)
                }
                curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
            },
            clistWrapPeer: function(e, t, i) {
                var a, o, r = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    s = curFastChat.onlines[e],
                    n = onlinePlatformClass(s),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (i && (c = c.replace(i, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && 2e9 > e ? (a = "/id" + e, o = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (a = "/im?sel=" + e, o = ""), e > 2e9 && t[3]) var l = t[3];
                else var l = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + a + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event);" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + n + '" ' + o + ">" + l + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (r ? " <b>+" + r + "</b>" : "") + "</span></span></a>"
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
                    o = !1,
                    r = e.getBoundingClientRect().top,
                    s = a.getBoundingClientRect().top;
                if (10 > r - s && (o = !0), i) {
                    var n = e.getAttribute("data-date");
                    n && (i += "<br>" + n), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + i + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: o,
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
                        var a, o = {};
                        if (each(i, function() {
                                a = this[3] + "_", curFastChat.friends[a] || (o[a] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = o, e == curFastChat.q) {
                            var r = ge("fc_correspondents");
                            if (r) {
                                var s = r.parentNode,
                                    n = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(o, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (n.firstChild)
                                    for (; n.firstChild;) c.appendChild(n.firstChild);
                                else s.firstChild == r && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                s.replaceChild(c, r), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
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
                    var t, i, a, o, r, s, n, c, l, u = [e];
                    if ((i = parseLatin(e)) && u.push(i), (i = parseLatKeys(e)) && u.push(i), (i = parseCyr(e)) && u.push(i), void 0 !== curFastChat.clistCache[e]) return u;
                    l = curFastChat.clistCache[e] = {};
                    for (a in u)
                        if (t = u[a], r = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()]) {
                            n = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi");
                            for (o in r) c = curFastChat.friends[o + "_"], isArray(c) && null !== c[0].match(n) && (l[o] = 1)
                        }
                    o = 0;
                    for (a in l) o++;
                    return l._num = o, u
                }
                var s, d, h;
                curFastChat.clistCache = {};
                for (a in curFastChat.friends)
                    for (s = curFastChat.friends[a][0], a = intval(a), d = 0; h = " " + s.charAt(d).toLowerCase(), curFastChat.clistCache[h] || (curFastChat.clistCache[h] = {}), curFastChat.clistCache[h][a] = 1, d = s.indexOf(" ", d + 1), -1 != d;) ++d
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
                var o = window.newVal = (a ? getLang("mail_im_X_onlines_title", a) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(a), val(curFastChat.el.clistTitle, o), val(curFastChat.el.topLink, o.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? i = curFastChat.el.clist.childNodes.length : curFastChat.q && (i = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * i)
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
                                var o = curFastChat.el.clist;
                                a.offsetTop + 16 > o.clientHeight + o.scrollTop ? (o.scrollTop = a.offsetTop + 16 - o.clientHeight, curFastChat.clistBoxScroll.update()) : a.offsetTop - 36 < o.scrollTop && (o.scrollTop = a.offsetTop - 36, curFastChat.clistBoxScroll.update())
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
                            var r = ge("fc_clist_filter"),
                                s = val(r) || curFastChat.clSel;
                            r.blur(), val(r, curFastChat.q = ""), curFastChat.clSel = !1, s && FastChat.clistRender()
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
                    o = geByClass1("chat_tab_counter", a);
                o || (o = ce("div", {
                    className: "chat_tab_counter"
                }), a.appendChild(o)), void 0 === i ? Chat.counters[e] = positive((Chat.counters[e] || 0) + t) : Chat.counters[e] = i, Chat.counters[e] ? o.innerHTML = Chat.counters[e] : re(o)
            },
            prepareTabIcon: function(e, t, i) {
                var a = curFastChat.friends && curFastChat.friends[e + "_"];
                if (a) {
                    var o = {
                        name: a[0],
                        photo: a[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, o, i)
                } else {
                    var r = 3;
                    curFastChat.needPeers[e] = [r, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t], FastChat.lcSend("needPeer", {
                        id: e,
                        mask: r
                    })
                }
            },
            addTabIcon: function(e, t, i) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var a = t.data.members_grid_fc || "";
                    else var a = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var o = "im?sel=c" + (e - 2e9);
                    else var o = t.alink || "/id" + e;
                    var r = onlinePlatformClass(t.online),
                        s = se('<a class="chat_tab_wrap' + (i ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + o + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + r + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + a + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div></a>');
                    Chat.itemsCont.insertBefore(s, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: s,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), i || removeClass(s, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
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
                }), addEvent(Chat.scrollNode, "mouseenter", e), addEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow()), Chat.scrollNode.scrollTop = i - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"),
                    setStyle(Chat.scrollNode, {
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
                return curFastChat.activeBox && curFastChat.activeBox.options.peer == e ? (curFastChat.activeBox.hide(), FastChat.setActive(!1), !1) : FastChat.selectPeer(e, t)
            },
            selectPeer: function(e, t, i) {
                if (checkEvent(t)) return !0;
                var a = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var o = curFastChat.tabs[e].box;
                    o.minimized && o.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, a)
                } else i || (i = {}), i.fixed = !0, i.onPeerAdded = function() {
                    FastChat.movePointer(e, a)
                }, i.onHistoryLoaded = FastChat.readLastMsgs.pbind(e), FastChat.addPeer(e, !1, !0, i);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && curFastChat.tabs[e].iman.unidle(), !1
            },
            closeTabIcon: function(e, t, i) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !i && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var a = ge("chat_tab_icon_" + e);
                addClass(a, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                var o = function() {
                    re(a), a && (a = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                    var e = Chat.scrollNode.scrollTop;
                    FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                };
                animate(a, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: o
                }), i || FastChat.stateChange({
                    op: "closed",
                    peer: e
                });
                var r = Object.keys(Chat.tabs).length;
                return r || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, i) {
                var a = i - t,
                    o = Chat.maxHeight + 32;
                return e && 62 > a ? a - 62 : e && a > o ? a - o : 0
            },
            setPointer: function(e, t, i) {
                if (!curFastChat.activeBox) return !1;
                var a = FastChat.getPointerShift(e, t, i),
                    o = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(o, {
                    marginTop: t + a
                }), a
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var i = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var a = ge("chat_tab_icon_" + e);
                    if (!a) return !1;
                    if (!Chat.fixH && a.nextSibling) var o = getXY(a.nextSibling)[1] - 50;
                    else if (a.nextSibling || Chat.fixH) var o = getXY(a)[1] + Chat.scrollNode.scrollTop;
                    else var o = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var r = 23 + getXY(Chat.cont)[1] - o,
                        s = -Chat.scrollNode.scrollTop
                } else var r = 28,
                    s = 0;
                var n = FastChat.setPointer(e, s, r);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, s + n, curFastChat.prevPointer);
                        setStyle(i, {
                            bottom: curFastChat.prevPointer - c + n
                        })
                    }
                    animate(i, {
                        bottom: r
                    }, {
                        duration: 100
                    })
                } else setStyle(i, {
                    bottom: r
                });
                curFastChat.prevPointer = r
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                var e = e - 8,
                    i = !1,
                    a = 0;
                for (var o in curFastChat.tabs) {
                    var r = curFastChat.tabs[o];
                    if (t || (r.box.movedLeft = !1), r && !r.box.options.fixed && r.box.toBottom && !r.box.movedLeft && !r.box.noMove) {
                        var s = r.box.pos;
                        s[1] + s[3] >= e && s[1] > a && (i = r, a = s[1])
                    }
                }
                if (i) {
                    var n = e - i.box.pos[3],
                        c = i.box.pos[0];
                    0 > n && (n = 0), i.box.movedLeft = !0, animate(i.box.wrap, {
                        left: n
                    }, 200), i.box.pos = [c, n, i.box.pos[2], i.box.pos[3]];
                    var l = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: i.box.options.peer,
                        y: c / l[0],
                        x: n / l[1]
                    }), n && FastChat.moveBoxesLeft(n, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var i = t - e.pos[3] - 20, a = e.pos[3], o = e.pos[0], r = !1; i > 0 && !r;) {
                    r = !0;
                    for (var s in curFastChat.tabs) {
                        var n = curFastChat.tabs[s].box.pos;
                        n[0] + n[2] / 2 > o && n[1] + n[3] > i && n[1] < i + a && (i -= n[3], r = !1)
                    }
                }
                0 > i && (i = positive(Math.random() * t)), animate(e.wrap, {
                    left: i
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: o / c[0],
                    x: i / c[1]
                })
            },
            pinTab: function(e, t, i) {
                if (-1 == e) var a = curFastChat.clistBox;
                else var a = curFastChat.tabs[e].box;
                a.options.fixed = !1, removeClass(a.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var o = a.wrap.offsetTop,
                    r = a.wrap.offsetLeft - 10;
                setStyle(a.wrap, {
                    left: a.wrap.offsetLeft,
                    top: a.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), i || animate(a.wrap, {
                    left: r,
                    top: o
                }, 300), a.pos = [o, r, a.pos[2], a.pos[3]], a.toRight = !1, a.toBottom = !0, addClass(a.wrap, "fc_tobottom");
                var s = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                    n = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
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
                    h: n / c[0],
                    w: s / c[1]
                }), a.noMove = !0, FastChat.moveBoxesLeft(r), a.noMove = !1
            },
            addPeer: function(e, t, i, a) {
                a || (a = {});
                var o = curFastChat.friends && curFastChat.friends[e + "_"],
                    r = 0;
                if (i ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: a.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (i = !0), o) {
                    var s = {
                        name: o[0],
                        photo: o[1],
                        fname: o[2],
                        hash: o[3],
                        online: curFastChat.onlines[e],
                        sex: o[4]
                    };
                    FastChat.addTabIcon(e, s, a.noAnim), FastChat.addBox(e, s, a), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (a && a.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), r |= 2)
                } else r = 3;
                r && (i ? (curFastChat.needPeers[e] = [r, t, !1, a], FastChat.getPeers()) : (curFastChat.needPeers[e] = [r, t, setTimeout(FastChat.getPeers, irand(150, 200)), a], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: r
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
                        o = t[1];
                    i.offset = t[2], extend(i.msgs, o), each(o, function(e, t) {
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
                    o = [],
                    r = curFastChat.typingEvents[e],
                    s = vkNow(),
                    n = ge("fc_tab_typing" + e),
                    c = geByClass1("_fc_tab_typing_progress", n),
                    l = geByClass1("_fc_tab_typing_name", n);
                if (2e9 > e) r && 6e3 > s - r && (o.push(a.fname || a.name || ""), i = a.sex);
                else {
                    var u = a.data.members;
                    each(r || {}, function(e, t) {
                        t && 6e3 > s - t && u[e] && u[e].first_name && (o.push(u[e].first_name || ""), i = u[e].sex)
                    })
                }
                if (!o.length) return hide(c), t ? setStyle(n, "opacity", 0) : fadeTo(n, 1e3, 0);
                if (1 == o.length) val(l, langSex(i, lang.mail_im_typing).replace("{user}", o[0]));
                else {
                    var d = o.pop();
                    val(l, getLang("mail_im_multi_typing").replace("{users}", o.join(", ")).replace("{last_user}", d))
                }
                return show(c), t ? setStyle(n, "opacity", 1) : fadeTo(n, 200, 1)
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
                            for (var o in t) {
                                var r = t[o],
                                    s = ge("fc_msg" + r),
                                    n = s && s.parentNode;
                                s && (i.msgs[r] && i.msgs[r][1] && (i.msgs[r][1] = 0, i.msgs[r][0] || i.unread--), removeClass(s, "fc_msg_unread"), hasClass(n.parentNode, "fc_msgs_unread") && each(n.childNodes, function() {
                                    return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(n.parentNode, "fc_msgs_unread"), !1)
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
            mkMsg: function(e) {
                var t = clean(e).replace(/\n/g, "<br>"),
                    i = !1;
                return t = (0, s.replaceHyperLinks)(t || "", s.linksReplacer.bind(null, i)), t = (0, s.replaceMentions)(t), t = (0, s.replaceEmailLinks)(t), t = Emoji.emojiToHTML(t, 1)
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
                    var o = positive(a - 40),
                        r = intval(getSize(t.box.resizeableH)[1]);
                    r + t.hDiff - o < 40 && (o = r + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: r + (t.hDiff || 0) - o
                    }), t.hDiff = o, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var r = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: r + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, i) {
                var a = geByClass1("fc_editable", i),
                    o = curFastChat.tabs[e] = {
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
                    s = 30;
                if (o.addMediaBtn = geByClass1("fc_tab_attach", i), o.editable) cur.t = o, o.emojiId = Emoji.init(o.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", i),
                    ttDiff: -46,
                    ttShift: 0,
                    rPointer: !0,
                    global: !0,
                    noRce: !0,
                    peer: e,
                    isChat: !0,
                    noCtrlSend: !0,
                    onSend: FastChat.send.pbind(e),
                    checkEditable: FastChat.checkEditable,
                    onResize: function() {
                        FastChat.onTxtResize(e)
                    },
                    addMediaBtn: o.addMediaBtn,
                    onShow: function() {
                        cssAnim(o.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(o.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return o.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, i) {
                        --o.sent, FastChat.send(e, t, i)
                    }
                });
                else {
                    var n = 15;
                    autosizeSetup(o.txt, {
                        minHeight: n,
                        maxHeight: 42
                    }), o.txt.autosize.options.onResize = function(e) {
                        if (!o.box.minimized) {
                            var t = 42 == e ? 42 : n;
                            t != e && setStyle(o.txt, "height", t), t != s && (setStyle(o.logWrap, "height", o.logWrap.clientHeight - t + s), s = t, o.scroll && o.scroll.update(!1, !0))
                        }
                    }
                }
                return o.imPeerMedias = {}, o.imSortedMedias = {}, o.previewEl = geByClass1("fc_tab_preview", i), stManager.add(["page.js", "page.css", "ui_media_selector.js", "ui_media_selector.css"], function() {
                    o.imMedia = new MediaSelector(o.addMediaBtn, o.previewEl, [
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
                    }), o.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = (0, r.loadDraftForPeer)(curFastChat.ldb, e);
                            t.removeAllAttaches(), o.imMedia.getMedias().forEach(function(e) {
                                return t.addAttach(e[0], e[1])
                            }), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), o
            },
            addBox: function(e, t, i) {
                if (void 0 === curFastChat.tabs[e]) {
                    var a = FastChat.getEditCont(Emoji.last);
                    i = i || {}, curFastChat.tabs[e] = {};
                    var o = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: a
                    }));
                    i.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var r = FastChat.initTab(e, t, o),
                        s = getWndInner(),
                        n = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", o),
                            closer: geByClass1("fc_tab_close_wrap", o, "a"),
                            resizeableH: r.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: i.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                r.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete r.auto), FastChat.restoreDraft(e), r.editable ? Emoji.editableFocus(r.txt, !1, !0) : elfocus(r.txt), r.wrap.clientWidth && setStyle(r.title, {
                                    maxWidth: r.wrap.clientWidth - 71
                                }), r.editable || setStyle(r.txt.autosize.helper, {
                                    width: getStyle(r.txt, "width", !1)
                                }), r.scroll && r.scroll.update(!1, !0), setTimeout(elfocus.pbind(r.txt), 10)
                            },
                            onHide: function() {
                                i.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), i && i.beforeClose && i.beforeClose();
                                var a = curFastChat.tabs,
                                    o = a[e].posSeq;
                                if (delete a[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), o) {
                                    var r, s, n, c, l, u = {},
                                        d = [];
                                    for (each(a, function() {
                                            this.posSeq > o && (u[this.posSeq] = this, d.push(this.posSeq))
                                        }), d.unshift(o), d.sort(), l = !browser.msie && d.length < 10, r = 1; r < d.length; r++) s = d[r], n = u[s].box, c = r > 1 ? u[d[r - 1]].box.pos : t, l ? animate(n.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(n)) : setStyle(n.wrap, {
                                        left: c[1]
                                    });
                                    if (!l)
                                        for (r = 1; r < d.length; r++) n = u[d[r]].box, n._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(r, r.wrap.clientWidth, !0), t || (r.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, i) {
                                var a = getWndInner(),
                                    o = r.box.pos;
                                r.scroll && r.scroll.show(), FastChat.fixResized(r, i, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / a[0],
                                    w: i / a[1],
                                    y: r.box.toBottom ? -1 : o[0] / a[0],
                                    x: r.box.toRight ? -1 : o[1] / a[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(r, t);
                                var i = geByClass1("fc_tab_title", r.box.content);
                                setStyle(i, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete r.posSeq, r.scroll && r.scroll.hide(), val(r.notify, ""), clearTimeout(r.hideNotifyTO)
                            },
                            onDragEnd: function(t, i) {
                                delete r.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: i
                                })
                            }
                        };
                    if (i && extend(n, i), void 0 === n.startLeft && void 0 === n.startRight) {
                        var c = [],
                            l = s[0] - 350,
                            u = curFastChat.clistBox.pos,
                            d = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var h = Call.calcBoxPos();
                            c.push([h.x, h.x + h.w]), d = !0
                        }
                        u[0] + u[2] > l && (curFastChat.clistBox.visible || !d) && c.push([u[1], u[1] + u[3]]), each(curFastChat.tabs, function(t) {
                            (u = this.box && this.box.pos) && t != e && u[0] + u[2] > l && c.push([u[1], u[1] + u[3]])
                        });
                        var f, p, m, _ = lastWindowWidth - 262 - sbWidth(),
                            v = 0,
                            g = !1,
                            b = !1,
                            C = v > _ ? 1 : -1;
                        for (f = _; C * v > C * f; f += 135 * C) {
                            for (p = 0, m = 0; m < c.length; m++) f > c[m][0] - 260 && f < c[m][1] && p++, f > c[m][0] - 10 && f < c[m][0] + 10 && (p += 1.1);
                            (g === !1 || b > p) && (g = f, b = p)
                        }
                        d && b && (g = _), extend(n, {
                            startBottom: 0,
                            startLeft: g
                        })
                    }
                    var y, w = !0;
                    for (y in i || {})
                        if ("nofocus" != y) {
                            w = !1;
                            break
                        }
                    w && (r.posSeq = ++curFastChat.posSeq), n.fixed && (n.startHeight = curFastChat.clistH, n.startWidth = curFastChat.clistW, n.onShow = FastChat.showChatCtrl), r.box = new RBox(o, n), r.iman = new IdleManager({
                        id: "tab" + e,
                        element: r.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMsgs(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), n.fixed && FastChat.setActive(r.box), r.scroll = new Scrollbar(r.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(r)
                    }), n.minimized || !i || void 0 === i.startLeft && void 0 === i.startTop && void 0 === i.startWidth && void 0 === i.startHeight || r.box._wnd_resize(s[0], s[1], !0), r.wrap.clientWidth && setStyle(r.title, {
                        maxWidth: r.wrap.clientWidth - 71
                    }), addEvent(r.txt, "keydown focus mousedown keyup", function(t) {
                        if ("mousedown" == t.type) return void(curRBox.active == r.box.id && ((t.originalEvent || t).cancelBubble = !0));
                        if ("keydown" == t.type && t.ctrlKey && t.keyCode == KEY.RETURN) {
                            var i = this.value;
                            if ("number" == typeof this.selectionStart && "number" == typeof this.selectionEnd) {
                                var a = this.selectionStart;
                                this.value = i.slice(0, a) + "\n" + i.slice(this.selectionEnd), this.selectionStart = this.selectionEnd = a + 1
                            } else if (document.selection && document.selection.createRange) {
                                this.focus(t);
                                var o = document.selection.createRange();
                                o.text = "\r\n", o.collapse(!1), browser.opera && (o.moveEnd("character", 0), o.moveStart("character", 0)), o.select()
                            }
                            return r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : (r.txt.autosize.update(), setTimeout(function() {
                                r.txt.autosize.update()
                            }, 0)), !1
                        }
                        if ("focus" == t.type) curFastChat.peer = e;
                        else if ("keyup" == t.type) {
                            var s = r.lastVal || "",
                                n = FastChat.getVal(this);
                            (n.length != s.length || n != s) && (n && FastChat.onMyTyping(e), r.lastVal = n), clearTimeout(r.saveDraftTO), r.saveDraftTO = setTimeout(FastChat.saveDraft.pbind(e), n.length ? 300 : 0), FastChat.checkEditable(r.emojiId, r.txt)
                        }
                    }), FastChat.restoreDraft(e), n.onPeerAdded && n.onPeerAdded()
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
                            o = a.clientHeight;
                        a.insertBefore(cf(e[0]), t.nextSibling);
                        var r = a.clientHeight - o;
                        r && (i.logWrap.scrollTop += r), i.scroll.update(), i.offset = e[2], i.moreLoading = !1, FastChat.onScroll(i)
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
                    o = e.msg_id,
                    r = indexOf(t, i.newmsgs);
                if (a) {
                    if (e.media) {
                        var s = {
                            sticker: intval(e.sticker)
                        };
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: i.box.options.peer,
                            text: e.media,
                            msgOpts: s
                        }), FastChat.gotMsgMedia(i.box.options.peer, t, e.media, s)
                    }++i.msgscount, -1 != r && i.newmsgs.splice(r, 1), a.id = "fc_msg" + o, i.msgs[o] = [1, 1]
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
                        o = Math.min(n, intval(getStyle(i, "zIndex")));
                    setStyle(i, {
                        zIndex: n
                    }), removeClass(i, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, getStyle(i, "zIndex") == n && (setStyle(i, {
                            zIndex: o
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
                    o = trim(a.editable ? Emoji.editableVal(a.txt) : val(a.txt));
                if (t) {
                    var r = [
                        ["sticker", t]
                    ];
                    o = ""
                } else var r = a.imMedia ? a.imMedia.getMedias() : [];
                var s = ge("fc_tab_typing" + e),
                    n = geByClass1("page_progress_preview", a.wrap);
                if (n && n.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var c = geByClass("fc_tab_log", a.wrap)[0];
                    return FastChat.createProgress(c, e, c.lastChild), void(s.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), s.style.visibility = "visible", !o && !r.length) return void(a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt));
                var l = --a.sent,
                    u = {
                        act: "a_send",
                        to: e,
                        hash: a.sendhash,
                        msg: o,
                        from: "fc",
                        media: []
                    };
                i && (u.sticker_referrer = i);
                for (var d, h = 0, f = r.length; f > h; ++h)(d = r[h]) && u.media.push(d[0] + ":" + d[1]);
                u.media = u.media.join(","), a.sending = !0, Emoji.ttHide(a.emojiId), ajax.post("al_im.php", u, {
                    onDone: function(t) {
                        clearTimeout(a.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, l, a)
                    },
                    onFail: function(t) {
                        FastChat.error(e, t || getLang("global_unknown_error")), elfocus(a.txt), val(a.txt, o), a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update();
                        var i = ge("fc_msg" + l);
                        return i ? (i.appendChild(ce("span", {
                            className: "fc_msg_error",
                            innerHTML: getLang("global_error")
                        })), FastChat.scroll(e), !0) : void 0
                    },
                    showProgress: function() {
                        a.sending = !0, a.sendProgressTO = setTimeout(function() {
                            var e = ge("fc_msg" + l);
                            e && FastChat.createProgress(e, l, e.firstChild)
                        }, 2e3)
                    },
                    hideProgress: function() {
                        a.sending = !1, clearTimeout(a.sendProgressTO), FastChat.removeProgress(l)
                    }
                }), re("fc_error" + e), a.sentmsgs.push(l), t || (val(a.txt, ""), a.imMedia && a.imMedia.unchooseMedia());
                var p = u.media ? 1 : 0;
                t && (p += 8), FastChat.addMsg(FastChat.prepareMsgData([e, l, 3, FastChat.mkMsg(o), p])), delete curFastChat.myTypingEvents[e], a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update(!1, !0), elfocus(a.txt), FastChat.scroll(e)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = (t || {}).txt;
                if (i && t) {
                    var a = Emoji.editableVal(i),
                        o = (0, r.loadDraftForPeer)(curFastChat.ldb, e);
                    o.setText(trim(a) || ""), o.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = t.txt,
                    a = (0, r.loadDraftForPeer)(curFastChat.ldb, e);
                return !i || !t || val(i).length > a.dData.txt.length && !a.hasAttaches() ? !1 : (t.editable ? i.innerHTML = Emoji.emojiToHTML(a.dData.txt, 1) : val(i, a.dData.txt), setTimeout(function() {
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
                var o = a(t.getDate()) + "." + a(t.getMonth() + 1);
                return t.getFullYear() != i.getFullYear() && (o += "." + (t.getFullYear() + "").substr(2)), o
            },
            prepareMsgData: function(e) {
                var t, i = e[0],
                    a = intval(e[2]),
                    o = 2 & a ? curFastChat.me.id : i > 2e9 ? e[5] : i,
                    r = intval(vkNow() / 1e3),
                    s = e[4],
                    n = "",
                    c = {
                        id: e[1],
                        peer: i,
                        from_id: o,
                        text: e[3],
                        out: 2 & a ? !0 : !1,
                        unread: 1 & a ? !0 : !1,
                        date: r,
                        date_str: FastChat.mkdate(r)
                    };
                return s && (1 & s && (n += rs(vk.pr_tpl, {
                    id: "",
                    cls: ""
                }), e[1] > 0 && setTimeout(FastChat.needMsgMedia.pbind(i, e[1]), 5)), 6 & s && (n += rs(curFastChat.tpl.msg_fwd, {
                    msg_id: e[1],
                    peer_nice: FastChat.nicePeer(i),
                    label: getLang(2 & s ? "mail_im_fwd_msg" : "mail_im_fwd_msgs")
                })), 8 & s && (c.sticker = !0), n && (c.text += '<div class="fc_msg_attachments" id="fc_msg_attachments' + c.id + '">' + n + "</div>")), t = 2 & a ? curFastChat.me : i > 2e9 ? curFastChat.tabs[i].data.members[o] : curFastChat.tabs[i], extend(c, {
                    from_id: o,
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
                    onDone: function(i, a, o) {
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: i,
                            msgOpts: o
                        }), FastChat.gotMsgMedia(e, t, i, o)
                    }
                }))
            },
            gotMsgMedia: function(e, t, i, a) {
                if (val("fc_msg_attachments" + t, i), a && a.sticker) {
                    var o = ge("fc_msg" + t),
                        r = o && o.parentNode;
                    o && addClass(r.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
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
                    o = a.lastChild;
                if (o && "fc_msgs_error" == o.className && (o = o.previousSibling), !i || e.out || !i.box.visible || i.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), !o || !hasClass(o, "fc_msgs_wrap") || !hasClass(o, "fc_msgs_unread") && e.unread === !0 || o.getAttribute("data-from") != e.from_id || e.date - intval(o.getAttribute("data-date")) >= 300 || e.sticker || hasClass(o, "fc_msg_sticker")) {
                    re("fc_log_empty" + t);
                    var r = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (r += " fc_msg_sticker");
                    var s = e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    o = se(rs(s, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: r,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: ""
                    })), a.appendChild(o)
                } else e.unread || removeClass(o, "fc_msgs_unread");
                var n = geByClass1("fc_msgs", o, "div"),
                    c = geByClass1("fc_msgs_date", n),
                    l = geByClass1("fc_msg_last", n);
                l && removeClass(l, "fc_msg_last");
                var u = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(n) && "BR" == domFC(n).tagName && re(domFC(n)), c ? n.insertBefore(u, c) : n.appendChild(u), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), i.scroll && i.scroll.update()
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
                        o = domClosest("fc_tab_log_msgs", i);
                    for (re(a ? domClosest("fc_msgs_wrap", i) : i); hasClass(domLC(o), "fc_msgs_date");) re(domLC(o))
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
    2: function(e, t) {
        "use strict";

        function i(e, t, i) {
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
        var a, o = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
            r = "(https?:\\/\\/)?",
            s = "((?:[" + o + "\\—\\-\\_]+\\.){1,5})",
            n = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
            c = "(?:\\:(\\d{2,5}))",
            l = "(" + s + n + c + "?)",
            u = "([\\/?#])",
            d = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
            h = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
            f = "　-〿＀-￯",
            p = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
            m = "[" + d + p + h + f + "]",
            _ = "(?:\\(|\\[)[" + o + "\\d&#%;,]+(?:\\)|\\])",
            v = "(" + u + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + m + "+|" + _ + "){0,200})?",
            g = r + l + v,
            b = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
            C = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
            y = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
            w = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
                t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
            F = t.ARROW_DOWN = 40,
            N = t.PAGE_UP = 33,
            k = t.PAGE_DOWN = 34,
            x = t.END_KEY = 35,
            T = t.HOME = 36,
            S = t.ENTER = 13,
            E = t.ESC = 27,
            B = (t.UNPRINTABLE_KEYS = [w, F, N, k, S, E, x, T], t.UP_DOWN_CONTROLS = [N, k, F, w, T, x], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
            M = t.FOLDER_ALL = "all",
            I = t.FOLDER_UNRESPOND = "unrespond",
            R = t.FOLDER_IMPORTANT = "important",
            P = (t.FOLDERS = [M, B, I, R], t.FOLDER_MASKS = (a = {}, i(a, I, 2), i(a, R, 1), a), t.TOP_DOMAINS = [].concat(b.split(","), C.split(","), y.split(",").map(function(e) {
                return "xn--" + e
            })));
        t.MAX_DOMAIN_LENGTH = P.reduce(function(e, t) {
            return Math.max(e, t.length)
        }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + n + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(g, "ig")
    },
    49: function(e, t) {
        "use strict";

        function i(e, t) {
            var i = !1,
                a = this,
                o = void 0,
                r = void 0;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                r = ce("audio"), i = !!r.canPlayType, "no" != r.canPlayType("audio/mpeg") && "" != r.canPlayType("audio/mpeg") ? o = ".mp3?1" : "no" == r.canPlayType('audio/ogg; codecs="vorbis"') || "" == r.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? i = !1 : o = ".ogg?1"
            } catch (s) {}
            var n = t.forcePath || "/" + e + o;
            if (i) {
                r.src = n;
                var c = !1;
                r.addEventListener("ended", function() {
                    c = !0
                }, !0), r.load(), this.playSound = function() {
                    c && r.load(), r.play(), c = !1
                }, this.pauseSound = function() {
                    r.pause()
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var l = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    u = "flash_sound_" + cur.__sound_guid++,
                    d = {
                        url: "/swf/audio_lite.swf?4",
                        id: u
                    },
                    h = {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    };
                if (renderFlash(l, d, h, {})) {
                    var f = browser.msie ? window[u] : document[u],
                        p = !1,
                        m = setInterval(function() {
                            if (f && f.paused) try {
                                f.setVolume(1), f.loadAudio(n), f.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            p = !0, clearInterval(m)
                        }, 300);
                    a.playSound = function() {
                        p && f.playAudio(0)
                    }, a.pauseSound = function() {
                        p && f.pauseAudio()
                    }
                }
            }
        }
        i.prototype = {
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
        }, window.Sound = i
    },
    51: function(e, t) {
        "use strict";

        function i(e) {
            return "im_store_" + e
        }

        function a(e) {
            return ls.get(i(e)) || {}
        }

        function o(e, t, a) {
            if (ls.checkVersion()) {
                var o = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", o.length), a(i(e), o)
            }
        }

        function r(e, t, i) {
            return t === d ? e[t] || [] : t === h ? e[t] && e[t][i] : e[t] ? extend(!0, {}, e[t][i]) : null
        }

        function s(e, t, i) {
            switch (e[t] || (e[t] = {}), t) {
                case d:
                    var a = i;
                    a && a.length > 0 ? e[t] = a : delete e[t];
                    break;
                case h:
                    var o = u(i, 2),
                        r = o[0],
                        s = o[1];
                    s ? e[t][r] = +s : delete e[t][r]
            }
            return e
        }

        function n(e, t) {
            for (var i = ["fwd", "draft", "bind_attach"], r = a(e), s = !1, n = i.length; n--;) i[n] in r && (delete r[i[n]], s = !0);
            s && o(e, r, t)
        }

        function c(e, t, a) {
            a.key === i(e) && (t.db = JSON.parse(a.newValue), t.checkTime = Date.now())
        }

        function l(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && n(e, t);
            var i = {
                    db: a(e),
                    checkTime: Date.now()
                },
                l = c.bind(null, e, i);
            return window.addEventListener("storage", l, !1), {
                select: function(t, o) {
                    return Date.now() - i.checkTime > 1e3 && (i.db = a(e)), r(i.db, t, o)
                },
                selectByKey: function(t) {
                    return Date.now() - i.checkTime > 1e3 && (i.db = a(e)), i.db[t]
                },
                update: function(a, r) {
                    var n = s(i.db, a, r);
                    return i.db = n, i.checkTime = Date.now(), o(e, n, t)
                },
                updateByKey: function(a, r) {
                    return i.db[a] = r, i.checkTime = Date.now(), o(e, i.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", l, !1)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    o = !0, r = c
                } finally {
                    try {
                        !a && n["return"] && n["return"]()
                    } finally {
                        if (o) throw r
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
        t.deleteOldStoredFormat = n, t.mount = l;
        var d = t.RECENT_SEARCH_OP = "recent_search",
            h = t.PIN_HIDDEN_ID_OP = "pin_hide"
    },
    53: function(e, t, i) {
        "use strict";

        function a() {
            return {
                txt: "",
                attaches: [],
                urlBinds: []
            }
        }

        function o(e, t) {
            this._db = e, this._key = t, this.dData = a(), this.load()
        }

        function r(e) {
            switch (e.type) {
                case "mail":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function s(e) {
            return {
                txt: e.txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0
            }
        }

        function n(e) {
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
                    fwd_count: (0, h.parseFwd)(e.fwd).length
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

        function l(e, t) {
            return new o(e, "draft_" + t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    o = !0, r = c
                } finally {
                    try {
                        !a && n["return"] && n["return"]()
                    } finally {
                        if (o) throw r
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
        t.ImDraft = o, t.convertKludgesToAttaches = c, t.loadDraftForPeer = l;
        var d = i(79),
            h = i(127);
        o.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, s(this.dData))
        }, o.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = n(e))
            }
        }, o.prototype.clear = function() {
            this.dData = a(), this.dump()
        }, o.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, o.prototype.addAttach = function(e, t, i) {
            ("share" === e || "mail" === e) && this.removeAttachByType(e);
            var a = this.dData.attaches.find(function(i) {
                return i.type === e && i.id === t
            });
            !a && e && t && (this.dData.attaches.push({
                type: e,
                id: t,
                object: i
            }), this.dump())
        }, o.prototype.syncWithSelector = function(e) {
            var t = this,
                i = this.getFwdRaw();
            this.dData.attaches = (i ? [i] : []).concat(e.getMedias().map(function(e) {
                var i = u(e, 2),
                    a = i[0],
                    o = i[1],
                    r = t.dData.attaches.find(function(e) {
                        return e.type == a && e.id == o
                    });
                return r || {
                    type: a,
                    id: o
                }
            })), this.dump()
        }, o.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, o.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dump()
        }, o.prototype.addBindUrl = function(e, t, i) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: i
            }), this.dump())
        }, o.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t ? this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null : null
        }, o.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            return e && e.object ? e.object.url : void 0
        }, o.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, o.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, o.prototype.prepareObjects = function(e, t) {
            var i = this,
                a = this.dData.attaches.find(r);
            return a ? (0, d.post)(d.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = u(e, 1),
                    a = t[0];
                i.dData.attaches = a.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, o.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type
            })
        }, o.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    67: function(e, t) {
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
    68: function(e, t) {
        "use strict";

        function i(e) {
            this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }
        extend(i.prototype, EventEmitter.prototype), extend(i.prototype, {
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
        }), window.IdleManager = i
    },
    70: function(e, t) {
        "use strict";

        function i(e, t) {
            var i = this,
                a = {
                    minH: 50,
                    minW: 50
                };
            i.options = t = extend(a, t), i.content = e;
            var o = i.id = "rb_box_" + (t.id || curRBox.guid++);
            i.wrap = ce("div", {
                id: o,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var r = {};
            i.toBottom = i.toRight = !1, t.fixed ? (r.bottom = 0, r.right = 72) : (void 0 !== t.startTop ? r.top = t.startTop : void 0 !== t.startBottom && (r.bottom = t.startBottom), void 0 !== t.startLeft ? r.left = t.startLeft : void 0 !== t.startRight && (r.right = t.startRight)), setStyle(i.wrap, r), t.movable && addEvent(t.movable, "mousedown", i._head_mdown.bind(i)), i.resizeableH = t.resizeableH || e, t.startHeight && setStyle(i.resizeableH, "height", t.startHeight), i.resizeableW = t.resizeableW || e, t.startWidth && setStyle(i.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", i._cont_mdown.bind(i)), t.closer && (addEvent(t.closer, "mousedown", i._close_mdown.bind(i)), addEvent(t.closer, "click", i._close_click.bind(i))), t.hider && (addEvent(t.hider, "mousedown", i._close_mdown.bind(i)), addEvent(t.hider, "click", i._hide_click.bind(i))), t.minimizer && t.minimizer !== !0 && (addEvent(t.minimizer, "mousedown", i._close_mdown.bind(i)), addEvent(t.minimizer, "click", i._min_toggle.bind(i))), i.wrap.appendChild(e), t.resize !== !1 && (i.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), i.wrap.appendChild(i.resizeWrap), addEvent(i.resizeWrap, "mousedown", i._resize_mdown.bind(i))), t.minimized && (addClass(i.wrap, "rb_minimized"), i.minimized = !0), bodyNode.insertBefore(i.wrap, ge("page_wrap"));
            var s = getStyle(i.wrap, "top"),
                n = getStyle(i.wrap, "bottom"),
                c = getStyle(i.wrap, "left"),
                l = getStyle(i.wrap, "right");
            this.toBottom = ("auto" === s || "" === s || browser.msie && 0 === s) && "auto" != n && "" !== n && !(browser.msie && 0 === n), this.toRight = ("auto" === c || "" === c || browser.msie && 0 === c) && "auto" != l && "" !== l && !(browser.msie && 0 === l), this.toRight && setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(i.wrap, "rb_inactive"), this.toBottom && (setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(i.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(i.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[o] = i, i.pos = !1, t.noshow ? (setStyle(i.wrap, {
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
        var a = 1e4;
        extend(i.prototype, {
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
                        o = e.target,
                        r = getWndInner(),
                        s = curRBox.active == a.id,
                        n = e.pageY,
                        c = e.pageX,
                        l = a.wrap.offsetHeight,
                        u = a.wrap.offsetWidth,
                        d = 0,
                        h = 0,
                        f = r[0] - l,
                        p = r[1] - u,
                        m = browser.msie ? "selectstart" : "mousedown";
                    a.options.fixed && FastChat.pinTab(a.options.peer || -1, e, !0), s || a.focus(e), a.toBottom ? (a.toBottom = !1, t = r[0] - intval(getStyle(a.wrap, "bottom")) - l, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = r[1] - intval(getStyle(a.wrap, "right")) - u, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), d = t, h = i, cur._fcdrag = 1;
                    var _ = function(e) {
                            return d = Math.max(0, Math.min(f, t + e.pageY - n)), 10 > f - d ? d = f : 10 > d && (d = 0), a.wrap.style.top = d + "px", h = Math.max(0, Math.min(p, i + e.pageX - c)), 10 > p - h ? h = p : 10 > h && (h = 0), a.wrap.style.left = h + "px", cancelEvent(e)
                        },
                        v = function g(e) {
                            cur._fcdrag = 0, removeEvent(document, "mousemove", _), removeEvent(document, "mouseup", g), removeEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(o, "cursor", ""), (a.toBottom = d >= f - 5) && (setStyle(a.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(a.wrap, "fc_tobottom")), (a.toRight = h >= p - 5) && setStyle(a.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), a._update_pos();
                            var t = Math.abs(e.pageY - n) < 3 && Math.abs(e.pageX - c) < 3;
                            cur._fcpromo > 0 ? cur._fcpromo = t ? 0 : -1 : a.options.minimizer && t ? !a.minimized && s ? a.minimize(!0) : a.minimized && a.unminimize(!0) : a.options.onDragEnd && a.options.onDragEnd(a.toBottom ? -1 : d / r[0], a.toRight ? -1 : h / r[1])
                        };
                    return addEvent(document, "mousemove", _), addEvent(document, "mouseup", v), addEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(o, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, i, a = this,
                        o = e.target,
                        r = getWndInner(),
                        s = e.pageY,
                        n = e.pageX,
                        c = a.wrap.offsetHeight,
                        l = a.wrap.offsetWidth,
                        u = 0,
                        d = 0,
                        h = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                        f = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                        p = browser.msie ? "selectstart" : "mousedown",
                        m = !browser.msie && a.options.onResize || !1;
                    a.toBottom ? (a.toBottom = !1, t = r[0] - intval(getStyle(a.wrap, "bottom")) - c, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = r[1] - intval(getStyle(a.wrap, "right")) - l, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), a.options.onResizeStart && a.options.onResizeStart(h, f);
                    var _ = h + r[0] - t - c,
                        v = f + r[1] - i - l,
                        g = function(e) {
                            return u = Math.max(a.options.minH, Math.min(_, h + e.pageY - s)), 10 > _ - u && (u = _), a.resizeableH.style.height = u + "px", d = Math.max(a.options.minW, Math.min(v, f + e.pageX - n)), 10 > v - d && (d = v), a.resizeableW.style.width = d + "px", m && m(u, d), cancelEvent(e)
                        },
                        b = function C(e) {
                            removeEvent(document, "mousemove", g), removeEvent(document, "mouseup", C), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(o, "cursor", ""), (a.toBottom = u == _) && (setStyle(a.wrap, {
                                top: "auto",
                                bottom: 0
                            }), addClass(a.wrap, "fc_tobottom")), (a.toRight = d == v) && setStyle(a.wrap, {
                                left: "auto",
                                right: 0,
                                marginRight: lastWndScroll[0] ? sbWidth() : 0
                            }), a._update_pos(), a.options.onResizeEnd && a.options.onResizeEnd(u, d, r[0], r[1], a.toBottom, a.toRight)
                        };
                    return addEvent(document, "mousemove", g), addEvent(document, "mouseup", b), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(o, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, i) {
                var a = this;
                a.toBottom && (a.pos[0] = a.wrap.offsetTop), a.toRight && (a.pos[1] = a.wrap.offsetLeft);
                var o = {},
                    r = !1,
                    s = !1,
                    n = a.pos[0] + a.pos[2] - e,
                    c = a.pos[0],
                    l = a.resizeableH.clientHeight - a.options.minH,
                    u = a.pos[1] + a.pos[3] - t,
                    d = a.pos[1],
                    h = a.options.resize !== !1 ? a.resizeableW.clientWidth - a.options.minW : 0;
                i && (0 > h && setStyle(a.resizeableW, a.options.minW), 0 > l && setStyle(a.resizeableH, a.options.minH)), (0 >= n || 0 >= c && 0 >= l) && (0 >= u || 0 >= d && 0 >= h) || (n > 0 && c > 0 && (c = Math.min(n, c), n -= c, o.top = a.pos[0] - c, o.bottom = ""), n > 0 && l > 0 && (l = Math.min(n, l), r = a.resizeableH.clientHeight - l), u > 0 && d > 0 && (d = Math.min(u, d), u -= d, o.left = a.pos[1] - d, o.right = ""), u > 0 && h > 0 && (h = Math.min(u, h), s = a.resizeableW.clientWidth - h), s !== !1 && setStyle(a.resizeableW, "width", s), r !== !1 && setStyle(a.resizeableH, "height", r), setStyle(a.wrap, o), a._update_pos(), a.options.onResize && a.options.onResize(a.resizeableH.clientHeight, a.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                var t = curRBox.active != this.id;
                return t && (this.focus(e), !hasClass(e.target, "fc_editable")) ? cancelEvent(e) : void 0
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    i = curRBox.active,
                    o = i && curRBox.tabs[i];
                if (i != e.id) {
                    o && isFunction(o.options.onBlur) && o.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var r = a + curRBox.focused.length,
                        s = !0;
                    each(curRBox.focused, function(e, t) {
                        var i = curRBox.tabs[t].wrap;
                        s ? (addClass(i, "rb_active"), removeClass(i, "rb_inactive"), curRBox.active = t, s = !1) : (removeClass(i, "rb_active"), addClass(i, "rb_inactive")), setStyle(i, "zIndex", r), r--
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
        }), window.RBox = i
    },
    79: function(e, t) {
        "use strict";

        function i(e, t, i) {
            return t && (t.im_v = r), new Promise(function(a, o) {
                ajax.post(e, t, {
                    timeout: i,
                    onDone: function() {
                        a.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return o.apply(null, arguments), !0
                    }
                })
            })
        }

        function a(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                a = o(e, t, i),
                r = a.request;
            return r
        }

        function o(e, t) {
            function i() {
                o.abort()
            }
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = void 0;
            o = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
            var r = new Promise(function(i, r) {
                var s = void 0,
                    n = Date.now(),
                    c = a.timeout || 60,
                    l = ajx2q(t);
                if (window.XDomainRequest) o.open("get", e + "?" + l), o.ontimeout = function() {
                    r(["", {}])
                }, o.onerror = function() {
                    r(["", {}])
                }, o.onload = function() {
                    i([o.responseText, {}])
                }, setTimeout(function() {
                    o.send()
                }, 0);
                else {
                    o.onreadystatechange = function() {
                        4 == o.readyState && (clearInterval(s), o.status >= 200 && o.status < 300 ? i([o.responseText, o]) : r([o.responseText, o]))
                    };
                    try {
                        o.open("GET", e + "?" + l, !0)
                    } catch (u) {
                        return r([u, o])
                    }
                    o.send()
                }
                s = setInterval(function() {
                    Date.now() - n > 1e3 * c && (r(["", {}]), clearInterval(s))
                }, 1e3)
            });
            return {
                request: r,
                cancel: i
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.post = i, t.plainget = a, t.plaingetCancelable = o;
        var r = (t.CONTROLLER = "al_im.php", 2)
    },
    89: function(module, exports, __webpack_require__) {
        "use strict";
        var _im_shared_helpers = __webpack_require__(127),
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
                    this.initIdleMan(), this.initCommunityQueues(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
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
                curNotifier.is_server = !!intval(e)
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
                                Notifier.hideAllEvents(), push = 0;
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
                var o, r = indexOf(curNotifier.q_shown, e); - 1 != r && curNotifier.q_shown.splice(r, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), a === !0 && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (o = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, o - 3), o = 3), 3 == o && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != a && this.checkEvents(), "frame" != curNotifier.transport || i || this.lcSend("hide", {
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
                                o = !a && curNotifier.is_server;
                            a ? a[0] = vkNow() : curNotifier.addQueues[i] = [vkNow(), e.ts, e.key], o && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
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
                            var r = ls.get("pad_playlist");
                            r && r.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                            break;
                        case "who_is_active":
                            Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                            break;
                        case "show_notification":
                            Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                            break;
                        case "send_im_notification":
                            if ("im" === cur.module) {
                                var s = Notifier.createNegotiationSlot({
                                    onSuccess: function(e) {
                                        e.ev.onclick = "IMBRIDGE.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                    }
                                });
                                Notifier.lcSend("negotiate_back", {
                                    msg: s.token,
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
                        default:
                            if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                                for (var n in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][n](e);
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
                Notifier.debug && debugLog("becoming server"), this.lpInit(), this.lcSend("new_server"), Notifier.lcCheckServer(!0), curNotifier.is_server = !0, Notifier.onInstanceServer(1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit()), window.curFastChat && curFastChat.inited && FastChat.becameServer(), this.lpStop(), e ? this.lpReset(this.lpStart.bind(this)) : this.lpStart()
            },
            lcNoServer: function() {
                this.lpStop(), curNotifier.is_server && (Notifier.debug && debugLog("not server now"), this.onInstanceServer(0), curNotifier.is_server = !1)
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
                    o = curNotifier.addQueues[a],
                    r = !o && curNotifier.is_server;
                return o ? (o[0] = vkNow(), o[3] = t, o[4] = i) : curNotifier.addQueues[a] = [vkNow(), e.ts, e.key, t, i], i || Notifier.lcSend("new_addkey", e), r && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
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
    116: function(e, t, i) {
        "use strict";

        function a() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                i = sbWidth();
            return (lastWndScroll[0] !== !1 ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= i + (i ? 1 : 0)), [t, e]
        }

        function o() {
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

        function r(e, t) {
            var i = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
                a = void 0;
            a = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var o = se(rs(i, {
                title: e.title,
                content: a
            }));
            a = geByClass1("fc_content", o, "div");
            var r = {
                    movable: geByClass1("fc_tab_head", o),
                    hider: geByClass1("fc_tab_close_wrap", o, "a"),
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
                s = new RBox(o, extend(r, e)),
                n = void 0;
            return e.content && (n = new Scrollbar(a, {
                prefix: "fc_",
                more: debugLog,
                nomargin: !0,
                global: !0,
                nokeys: !0,
                right: vk.rtl ? "auto" : 0,
                left: vk.rtl ? 0 : "auto",
                onHold: e.onHold
            })), t({
                id: s.id,
                cont: a,
                update: function() {
                    n && n.update()
                }
            }), s
        }
        i(68), i(49), i(70), i(89), i(1), i(67), i(134), window.getWndInner = a, window.lastWndScroll = [!1, !1], window.updateWndVScroll = o, window.defBox = r;
        try {
            stManager.done("notifier.js")
        } catch (s) {}
    },
    127: function(e, t, i) {
        "use strict";

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                i = e.split("_"),
                a = p(i, 2),
                o = a[0],
                r = a[1];
            return [o, r, t]
        }

        function o(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (r > 50) return [
                [], e.length
            ];
            for (var s = [], n = ""; i < e.length;) {
                var c = e[i];
                if ("id" === c) n = t[i];
                else if ("," === c && n) s.push(a(n)), n = "";
                else if ("(" === c) {
                    var l = o(e, t, i + 1, r + 1),
                        u = p(l, 2),
                        d = u[0],
                        h = u[1];
                    i = h, s.push(a(n, d)), n = ""
                } else if (")" === c) return "" !== n && s.push(a(n)), [s, i];
                i++
            }
            return n && s.push(a(n)), [s, i]
        }

        function r(e) {
            if (C[e]) return C[e];
            for (var t = e ? e.length : 0, i = [], a = [], r = "", s = 0; t > s; s++) {
                var n = e[s],
                    c = n.charCodeAt(0);
                c >= 48 && 57 >= c || "_" === n || "-" === n ? r += n : ("(" === n || ")" === n || ":" === n || "," === n) && ("" !== r && (a.push(r), i.push("id"), r = ""), a.push(n), i.push(n))
            }
            r.length > 0 && (a.push(r), i.push("id"));
            var l = o(i, a),
                u = p(l, 1),
                d = u[0];
            return Object.keys(C).length > 300 && (C = {}), C[e] = d, d
        }

        function s(e, t) {
            for (var i = void 0, a = 0, o = e; null !== (i = m.MESSAGE_REGEXP.exec(e));) {
                i = l(i);
                var r = i[0].length,
                    s = i.index + r,
                    n = e[i.index - 1],
                    c = e[s - 1],
                    d = void 0 !== n && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(n),
                    h = void 0 !== c && /([:;$])/i.test(c);
                if (!d && !h) {
                    var f = u(i),
                        p = f.domain;
                    if (p.length <= m.MAX_DOMAIN_LENGTH && -1 !== m.TOP_DOMAINS.indexOf(p)) {
                        var _ = t(f);
                        o = o.slice(0, i.index + a) + _ + o.slice(s + a), a += _.length - r
                    }
                }
            }
            return o
        }

        function n(e, t) {
            return e.replace(m.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function c(e, t) {
            return e.replace(m.MENTION, t || function(e, t, i, a, o) {
                return '<a href="/' + (t + i) + '" class="mem_link" mention="' + v(a || "") + '" mention_id="' + v(t + i) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + o + "</a>"
            })
        }

        function l(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                i = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][i] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, i)), e
        }

        function u(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function d(e) {
            b("ttl_message_confirm_delivery", e)
        }

        function h(e, t) {
            var i = t.protocol,
                a = t.url,
                o = t.query,
                r = t.domain,
                s = t.full;
            try {
                s = decodeURIComponent(s)
            } catch (n) {}
            if (s.length > 55 && (s = s.substr(0, 53) + ".."), s = v(s).replace(/&amp;/g, "&"), !e && r.match(m.OUR_DOMAINS)) {
                a = g(a).replace(m.ENTITIES, encodeURIComponent);
                var c = a,
                    l = a.indexOf("#/"),
                    u = "",
                    d = void 0;
                return l >= 0 ? c = a.substr(l + 1) : (l = a.indexOf("#!"), l >= 0 && (c = "/" + a.substr(l + 2).replace(/^\//, ""))), d = c.match(m.VK_DOMAIN), d && d[1].length < 32 && (u = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + f(i + a + o) + '" target="_blank"' + u + ">" + s + "</a>"
            }
            var h = "away.php?utf=1&to=" + encodeURIComponent(i + g(a + o)),
                p = v((i + a + o).replace(/'/g, "\\'")),
                _ = "return goAway('" + p + "', {}, event);";
            return '<a href="' + h + '" target="_blank" onclick="' + _ + '">' + s + "</a>"
        }

        function f(e) {
            return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var p = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    o = !0, r = c
                } finally {
                    try {
                        !a && n["return"] && n["return"]()
                    } finally {
                        if (o) throw r
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
        t.parseFwd = r, t.replaceHyperLinks = s, t.replaceEmailLinks = n, t.replaceMentions = c, t.confirmDelivery = d, t.linksReplacer = h;
        var m = i(2),
            _ = window,
            v = _.clean,
            g = _.replaceEntities,
            b = _.statlogsValueEvent,
            C = {}
    },
    134: function(module, exports) {
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
                    o = t && t.offsetHeight || i && i.offsetHeight;
                if (a) {
                    TopNotifierCur.header = se(e);
                    var r = ce("div", {
                        className: "top_notify_header_label"
                    });
                    TopNotifierCur.header.appendChild(r)
                } else var r = geByClass1("top_notify_header_label", TopNotifierCur.header);
                if (o) {
                    if (a || !geByClass1("top_notify_header_sup_label", r)) {
                        var s = ce("div", {
                                className: "top_notify_header_sup_label",
                                innerHTML: getLang("global_unread_notifications")
                            }),
                            n = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                        val(r, ""), r.appendChild(s), r.appendChild(n)
                    }
                } else(a || geByClass1("top_notify_header_sup_label", r)) && val(r, getLang("global_notifitications"));
                a && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (o ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
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
                                for (var a = null, o = TopNotifier.getContentNode(), r = cf(t); a = r.firstChild;) o.insertBefore(a, e);
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
                    var o = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new o(i, {
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
                        o = {};
                    if (a) {
                        if ("shownow" == a.tt && removeAttr(a, "tt"), e) o.text = function() {
                            return e
                        }, t && (o.onHide = i.pbind(t));
                        else {
                            a.tt && a.tt.destroy && a.tt.destroy();
                            var r = ls.get("ntfseen") || {},
                                s = [];
                            each(r, function(e, t) {
                                s.push(e + ":" + t)
                            }), o = extend(o, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: s.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: i
                            })
                        }
                        var n = function c(e) {
                            setTimeout(function() {
                                return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void c(e) : (e && e.hide(), void Notifier.lcSend("hide_notify_tt"))
                            }, 6e3)
                        };
                        showTooltip(a, extend(o, {
                            typeClass: "top_notify_tt",
                            dir: "up",
                            width: 250,
                            shift: [0, 0],
                            nohideover: 1,
                            nohide: 1,
                            onShowStart: function(e) {
                                TopNotifier.shown() && (e.opts.onHide = !1, e.hide()), addEvent(e.container, "mousedown", function(e) {
                                    return e && inArray(e.target.tagName, ["A", "IMG"]) ? void 0 : (TopNotifier.show(e), cancelEvent(e))
                                }), n(e), Notifier.setRecvClbk("hide_notify_tt", e.hide)
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
                    var o = gpeByClass("top_notify_wrap", e);
                    a = geByClass("_feed_row", o), a = a[a.length - 1]
                }
                ajax.post("/al_feed.php", {
                    act: "a_hide_notify",
                    item: t,
                    hash: i
                });
                var r = gpeByClass("_ui_menu_wrap", e);
                r && TopNotifier.hideActionsMenu(r), slideUp(a, 200, function() {
                    re(a);
                    var e = TopNotifier.getContentNode();
                    geByClass("feed_row", e).length ? TopNotifier.refreshHeader() : val(e, '<div class="top_notify_empty no_rows">' + getLang("news_no_new_notifications") + "</div>"), TopNotifier.refresh()
                })
            },
            deleteRow: function(e, t, i, a, o, r) {
                var s = ge("top_feedback_row" + e),
                    n = geByClass1("post_actions", s);
                TopNotifier.hideActionsMenu(geByClass1("_ui_menu_wrap", s)), ajax.post("al_feed.php", {
                    act: "a_feedback_delete",
                    item: t,
                    hash: a,
                    types: i,
                    candel: r,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", s),
                            i = geByClass1("_feedback_deleted", s);
                        i ? (i.innerHTML = '<span class="dld_inner">' + e + "</span>", show(i)) : s.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(s, "feedback_row_clickable") && addClass(s, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(n, "post_actions_progress"),
                    hideProgress: removeClass.pbind(n, "post_actions_progress")
                })
            },
            unifiedDeleteRow: function(e, t, i) {
                var a = gpeByClass("feedback_row_wrap", i),
                    o = domPN(a),
                    r = geByClass1("post_actions", o);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: e,
                    hash: t,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", a),
                            i = geByClass1("_feedback_deleted", a);
                        i ? (i.innerHTML = '<span class="dld_inner">' + e + "</span>", show(i)) : o.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(o, "feedback_row_clickable") && addClass(o, "feedback_row_touched"), TopNotifier.refresh()
                    },
                    showProgress: addClass.pbind(r, "post_actions_progress"),
                    hideProgress: removeClass.pbind(r, "post_actions_progress")
                })
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var i = t.target || t.srcElement,
                    a = 8,
                    o = !1,
                    r = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do
                    if (!i || i == e || i.onclick || i.onmousedown || inArray(i.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (o = i.className.match(r))) break; while (a-- && (i = i.parentNode));
                if (!o) return !1;
                if (i && i.className) {
                    for (var s = i.className.split(" "), n = "unknown", c = -1, l = geByClass("feedback_row"), a = 0; a < s.length; ++a) {
                        var u = s[a].match("feedback_(.+)_row");
                        if (s[a] && u && u[1]) {
                            n = u[1];
                            break
                        }
                    }
                    for (var a = 0; a < l.length; ++a)
                        if (l[a] == i) {
                            c = a;
                            break
                        }
                    statlogsValueEvent("feed_top_notify", 0, "click", n, c)
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
                    var o;
                    o = a ? {
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
                    }, statlogsValueEvent("feed_top_notify", 0, "friends", o.act), ajax.post("/al_friends.php", o, {
                        onDone: function(t) {
                            var o = domPN(i);
                            val(o, t), addClass(o, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, a))
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
                    var o = -2 == a ? "spam" : a ? "enter" : "leave",
                        r = -1 == a ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: o,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: r
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
    }
});