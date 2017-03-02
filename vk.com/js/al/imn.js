! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(77)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function i(e) {
        if (!e.renew_hashes) {
            var t = function() {
                var t = e.last_hashes_update || 0;
                if (Date.now() - t < 1e4) return {
                    v: Promise.resolve()
                };
                var n = Object.keys(e.tabs).filter(function(t) {
                    return (0, zt.isFullyLoadedTab)(e, t)
                });
                e.renew_hashes = (0, Ft.post)(Vt, {
                    act: "a_renew_hash",
                    peers: n.join(","),
                    gid: e.gid
                }).then(function(t) {
                    var r = Bt(t, 1),
                        a = r[0];
                    return n.forEach(function(t) {
                        e.tabs[t].hash = a[t]
                    }), delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                })
            }();
            if ("object" === ("undefined" == typeof t ? "undefined" : Rt(t))) return t.v
        }
        return e.renew_hashes
    }

    function o(e, t, n) {
        return a(e).then(function(r) {
            return r ? t.apply(void 0, n) : i(e).then(function(e) {
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

    function l(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function u(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function c(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function d(e, t, n, r, a) {
        return a.tabHistoryNotChanged = !1, (0, Ft.post)(Vt, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: a.prevPeer,
            gid: a.gid,
            block: r
        }).then(function(t) {
            var r = Bt(t, 4),
                i = r[0],
                o = r[1],
                s = r[2],
                l = r[3];
            if (a.tabs || (a.tabs = {}), a.dialog_tab_cts = l, a.tabs[e] || (a.tabs[e] = {}), c(s, a), n) {
                if (a.tabs[e]) {
                    var u = a.tabs[e].lastmsg,
                        d = a.tabs[e].lastmsg_meta;
                    extend(a.tabs[e], i), a.tabs[e].lastmsg = u, a.tabs[e].lastmsg_meta = d
                }
            } else extend(a.tabs[e], i);
            return a.admins = extend(a.admins, o), a.imQueue(e, !1), g(e, a)
        })
    }

    function g(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            a = n.filter(function(n) {
                return !(0, Kt.isRidExist)(t, e, n.rid)
            });
        return r.msgs = a.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, a), t.tabs[e].history = (0, zt.restoreQueue)(a, t, l(t.tabs[e].history)), Promise.resolve(t)
    }

    function f(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = (0, zt.removeMessages)([t], l(n.tabs[e].history)), Promise.resolve(n)
    }

    function m(e, t) {
        var n = t.gid ? -t.gid : vk.id;
        return "peerFwd_" + n + "_" + e
    }

    function p(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Ft.post)(Vt, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Bt(e, 1),
                r = n[0];
            return c(r, t)
        })
    }

    function _(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, zt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && p(n, t), Promise.resolve(t).then(C)) : ((0, zt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), d(n, e, !1, !0, t))
        }).then(C).then(h.bind(null, n))
    }

    function h(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];
        return (0, zt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, zt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function v(e, t, n) {
        var r = n.msgid,
            a = n.peer;
        return !e && (0, zt.isFullyLoadedTab)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && p(a, n), Promise.resolve(n).then(C).then(h.bind(null, a))) : d(a, !0, r, !0, n).then(C).then(function() {
            var e = (0, Kt.getTab)(n, a);
            return e.msgid = r, n
        }).then(h.bind(null, a))
    }

    function b(e, t, n) {
        if (Je(n)) throw showFastBox({
            title: getLang("global_error"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_message_wait_until_uploaded")), new Error("Cant change peer while loading somethind");
        var r = n.gid ? "gim" + n.gid : "im";
        if (n.prevPeer = n.peer, n.peer = e, n.msgid = t || "", cur.peer = e, Zt({
                sel: e ? (0, zt.convertPeerToUrl)(e) : null,
                msgid: n.msgid,
                email: "",
                0: r
            }), 0 != n.prevPeer && h(n.prevPeer, n, !0), 0 !== e) {
            var a = [];
            (0, zt.isTabLoaded)(n, e) && h(e, n, !0), a = n.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(n.tabbedPeers) : n.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), bt(a, !1, n)
        } else bt(n.tabbedPeers, !1, n);
        return $t(), ve(n.prevPeer, n)
    }

    function y(e) {
        var t = e.tabs[e.peer],
            n = t && t.data && t.data.members,
            r = t && t.msgs,
            a = {};
        cur.wallMentions = [], r && Object.keys(r).reverse().forEach(function(e) {
            var t = r[e],
                i = (0, Kt.parserMessage)(t),
                o = i && i.userId,
                s = n && o && n[o];
            if (s) {
                var l = s.link.substring(1);
                s.kicked || s.closed || s.link.match(/\?email=/) || a[o] || o == vk.id || (cur.wallMentions.push([o, s.name, "@" + l, s.photo, void 0, void 0, void 0, l, s.first_name]), a[o] = 1)
            }
        }), n && Object.keys(n).forEach(function(e) {
            var t = n[e],
                r = t.link.substring(1);
            t.kicked || t.closed || t.link.match(/\?email=/) || a[e] || (cur.wallMentions.push([e, t.name, "@" + r, t.photo, void 0, void 0, void 0, r, t.first_name]), a[e] = 1)
        })
    }

    function C(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = n.data,
            a = [],
            i = e.mutedPeers;
        n.offset && a.push("photos"), n.offset && a.push("search"), (-2e9 > t || n.offset) && a.push("clear"), (0, zt.isCommunityInterface)(e) && a.push("block"), (0, zt.isCommunityPeer)(t) && (n.blocked_community ? a.push("allow_community") : a.push("block_community")), ((0, zt.isChatPeer)(t) || (0, zt.isUserPeer)(t)) && ((0, zt.isCommunityInterface)(e) || (0, zt.isChatPeer)(t) && (r.kicked || r.closed) || (inArray(t, i) ? a.push("unmute") : a.push("mute"))), (0, zt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && a.push("invite");
        var o = extend({}, r ? r.actions : {}),
            s = (0, zt.chatActions)(e, o);
        return (0, zt.isChatPeer)(t) && n.data.closed && (delete s.invite, o = extend({}, o), delete o.invite), e.curActions = a.concat(Object.keys(o)).sort(function(e, t) {
            return Jt[e] - Jt[t]
        }).reduce(function(e, t) {
            return e[t] = s[t], e
        }, {}), Promise.resolve(e)
    }

    function T(e, t, n) {
        var r = n.tabs[n.peer];
        return (0, Ft.post)(Vt, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Bt(e, 4),
                a = t[0],
                i = t[1],
                o = t[2],
                s = t[3];
            return r.allShown = o, n.admins = extend(n.admins, s), r.history = a + u(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
        })
    }

    function S(e) {
        var t = e.tabs[e.peer];
        return (0, Ft.post)(Vt, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Bt(n, 5),
                a = r[0],
                i = r[1],
                o = r[2];
            r[3], r[4], t.allShown = o, t.history = u(t.history) + a, t.historyToAppend = a;
            var s = Object.keys(i).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, i), e
        })
    }

    function E(e, t, n, r) {
        var a = e.tabs[t];
        for (var i in a.msgs)
            if (a.msgs.hasOwnProperty(i)) {
                var o = (0, Kt.getMessage)(e, t, i),
                    s = (0, Wt.isOut)(o) ? jt.eventTypes.FLAG_OUTBOUND : 0;
                n >= i && s === r && (o.flags &= ~jt.eventTypes.FLAG_UNREAD), a.msgs[i] = o
            }
        return e
    }

    function w(e, t, n) {
        var r = e.tabs[t];
        return r.unread = (0, Kt.countUnread)(t, e) + (r.unread > 0 ? n : 0), e
    }

    function I(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_email_start",
            email: e,
            hash: t.writeHash
        }).then(function(e) {
            var n = Bt(e, 2),
                r = n[0],
                a = n[1];
            return W(r, t), a
        })
    }

    function k(e) {
        return (0, Ft.post)(Vt, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Bt(t, 3),
                r = n[0],
                a = n[1],
                i = n[2];
            return extend({}, e, {
                imKey: r,
                imUrl: a,
                imPart: i
            })
        })
    }

    function P(e) {
        return (0, Ft.post)(Vt, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Bt(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function M(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = (0, zt.setMessageError)(e, t, l(r.history))), Promise.resolve(n)
    }

    function L(e, t, n, r) {
        var a = r.tabs[e];
        return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = (0, zt.startResendMessage)(e, t, l(a.history))), Promise.resolve(r)
    }

    function A(e, t, n, r) {
        var a = arguments.length <= 4 || void 0 === arguments[4] ? !1 : arguments[4];
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
            return !n && !lt(i)(t) || a && !a(i, e[i], t) || (e[i] = (0, Ut.arrayUnique)(r(e[i], i))), e
        }, e.dialog_tabs))
    }

    function O(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Ft.post)(Vt, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Bt(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function D(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            bt(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function x(e, t) {
        return (0, zt.isFullyLoadedTab)(t, e) && (t.tabs[e].data.kicked = 0), Promise.resolve(t)
    }

    function R(e, t, n) {
        return (0, zt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function B(e, t) {
        var n = e.flags & jt.eventTypes.FLAG_OUTBOUND,
            a = e.peerId;
        if ((0, zt.isTabLoaded)(t, a)) {
            var i = t.tabs[a];
            if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = r({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? F(t, 1, e.peerId) : (!i.unread && F(t, 1, e.peerId), i.unread++), D(e.peerId, t)), (0, zt.isFullyLoadedTab)(t, a)) {
                var o = l(i.history);
                i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, zt.appendToHistory)(t, e, o, !0, !0, !0), (0, Wt.isOut)(e) && (i.blocked_community = 0, C(t))
            }
            return i.typing && i.typing[e.userId] && delete i.typing[e.userId], i.lastmsg = e.messageId, i.lastmsg_meta = e, h(e.peerId, t), A(t, i, !1, R.bind(null, a), gt.bind(null, t)), Promise.resolve(t)
        }
        return d(a, 0, 0, 0, t).then(function(t) {
            var r = t.tabs[a];
            return A(t, r, !1, R.bind(null, a), gt.bind(null, t)), h(e.peerId, t), n || D(e.peerId, t), t
        })
    }

    function F(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function N(e, t) {
        if ((0, zt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = E(t, e.peerId, e.upToId, 0), t = w(t, e.peerId, intval(n.skipped)), r > 0 && !n.unread && F(t, -1, e.peerId), n.in_up_to = e.upToId, n.out_up_to < e.upToId && (n.out_up_to = e.upToId), n.lastmsg_meta.messageId <= e.upToId && !(n.lastmsg_meta.flags & jt.eventTypes.FLAG_OUTBOUND) && (n.lastmsg_meta.flags ^= jt.eventTypes.FLAG_UNREAD), !n.skipped) {
                var a = l(n.history);
                n.history = (0, zt.removewNewUnreadBarAndMerge)(t, a, e.peerId)
            }
        } else(0, zt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && F(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, zt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[qt.FOLDER_UNREAD] = t.dialog_tabs[qt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== qt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : ut(qt.FOLDER_ALL, t)
    }

    function j(e, t) {
        var n = void 0;
        if ((0, zt.isTabLoaded)(t, e.peerId) && (n = t.tabs[e.peerId], n.out_up_to = e.upToId, n.lastmsg_meta.messageId <= e.upToId && n.lastmsg_meta.flags & jt.eventTypes.FLAG_OUTBOUND && (n.lastmsg_meta.flags ^= jt.eventTypes.FLAG_UNREAD)), (0, zt.isFullyLoadedTab)(t, e.peerId)) {
            n = t.tabs[e.peerId];
            var r = l(n.history);
            n.history = (0, zt.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function H(e, t, n, r, a) {
        return a.text = {
            attachedFiles: 0
        }, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
    }

    function U(e, t, n) {
        var r = Bt(e, 3),
            a = r[0],
            i = r[1],
            o = r[2];
        n.text.attachedFiles++, n._attach_cache || (n._attach_cache = {}), o ? n._attach_cache[a + i] = o : o = n._attach_cache[a + i];
        var s = n.peer;
        if ((0, zt.isFullyLoadedTab)(n, s)) {
            var l = n.tabs[s];
            l.attaches || (l.attaches = []);
            var u = t.select(Gt.DRAFT_STORE_OP, s) || {};
            if (a !== !1) {
                l.attaches.push([a, i, o, l.attaches.length]);
                var c = extend({
                    txt: ""
                }, u, {
                    medias: l.attaches
                });
                t.update(Gt.DRAFT_STORE_OP, [s, c])
            } else if (a === !1 && "undefined" != typeof i) {
                var d = extend({
                    txt: ""
                }, u, {
                    medias: l.attaches
                });
                l.attaches = l.attaches.filter(function(e) {
                    return e[3] !== i
                }), t.update(Gt.DRAFT_STORE_OP, [s, d])
            }
        }
        return Promise.resolve(n)
    }

    function G(e, t, n) {
        if ((0, zt.isFullyLoadedTab)(n, e)) {
            var r = n.tabs[e];
            r.attaches = [];
            var a = t.select(Gt.DRAFT_STORE_OP, e) || {},
                i = extend({
                    txt: ""
                }, a, {
                    medias: []
                });
            t.update(Gt.DRAFT_STORE_OP, [e, i])
        }
        return Promise.resolve(n)
    }

    function z(e, t, n) {
        return e = e.map(function(e) {
            return e.slice(0, 2).join(",")
        }).join("*"), (0, Ft.post)(Vt, {
            act: "draft_medias",
            media: e
        }).then(function(e) {
            var r = Bt(e, 1),
                a = r[0];
            return n.tabs[t].attaches = a, n
        })
    }

    function q(e, t, n) {
        if ((0, zt.isFullyLoadedTab)(n, e)) {
            var r = n.tabs[e];
            if (!r.attaches || !r.attaches.length) {
                var a = t.select(Gt.DRAFT_STORE_OP, e) || {},
                    i = (a.medias || []).filter(function(e) {
                        return !e[2]
                    });
                if (i.length > 0) return z(a.medias, e, n);
                r.attaches = a.medias || []
            }
        }
        return Promise.resolve(n)
    }

    function K(e, t) {
        return e.set(q.bind(null, t, cur.imDb)).then(function(e) {
            return (0, zt.isFullyLoadedTab)(e.get(), t) ? e.get().tabs[t].attaches : []
        })
    }

    function W(e, t) {
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var a = t.tabs[r] ? t.tabs[r].msgs : {},
                i = extend({}, a || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), t.tabs[t.peer] = n, Promise.resolve(t)
    }

    function V(e, t, n) {
        return (0, zt.isTabLoaded)(n, e) && (n.tabs[e].online = t), Promise.resolve(n)
    }

    function Q(e, t, n) {
        return (0, zt.isTabLoaded)(n, e) && (n.tabs[e].typing = extend(n.tabs[e].typing, r({}, t, Date.now()))), Promise.resolve(n)
    }

    function Y(e, t, n) {
        return (0, Ht.pause)(Qt + 2).then(function() {
            if ((0, zt.isTabLoaded)(n, e)) {
                var r = n.tabs[e];
                if (r.typing) {
                    var a = Date.now() - (r.typing[t] || 0);
                    a >= 1e3 * Qt && delete r.typing[t]
                }
            }
            return n
        })
    }

    function X(e, t, n, r) {
        if ((0, zt.isFullyLoadedTab)(r, e)) {
            r.tabs[e].imdraft = clean(t);
            var a = n.select(Gt.DRAFT_STORE_OP, e) || {};
            n.update(Gt.DRAFT_STORE_OP, [e, extend(a, {
                txt: t
            })])
        }
        return Promise.resolve(r)
    }

    function Z(e, t, n) {
        if ((0, zt.isFullyLoadedTab)(n, e)) {
            var r = n.tabs[e];
            if (!r.imdraft) {
                var a = t.select(Gt.DRAFT_STORE_OP, e);
                a && a.txt && (r.imdraft = a.txt)
            }
            return Promise.resolve(r.imdraft || "")
        }
        return Promise.resolve("")
    }

    function $(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = (0, Ut.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function J(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function ee(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function te(e, t) {
        if ((0, zt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var a = n.msgs["rid" + e.randomId];
            a && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = (0, zt.replaceMessageAttrs)(t, l(n.history), e)
        }
        return Promise.resolve(t)
    }

    function ne(e, t) {
        return Promise.resolve()
    }

    function re(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        }).then(function(n) {
            var r = Bt(n, 3),
                a = r[0],
                i = r[1],
                o = r[2],
                s = t.tabs[e.peerId];
            return s.mediacontent || (s.mediacontent = {}), s.mediacontent[e.messageId] = [a, i, o], ae(e, t)
        })
    }

    function ae(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = (0, zt.replaceAttaches)(l(n.history), e, t), Promise.resolve(t)
    }

    function ie(e, t, n) {
        var r = (0, zt.dayFromVal)(t),
            a = n.tabs[e];
        return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
    }

    function oe(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function le(e, t, n, r) {
        return (0, Ft.post)(Vt, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Bt(e, 2),
                n = t[0],
                a = t[1];
            return c(a, r), W(n, r), Object.keys(n).sort(function(e, t) {
                return n[e].order - n[t].order
            }).map(function(e) {
                return n[e]
            })
        })
    }

    function ue(e, t, n, r) {
        return le(e, t, n, r).then(function(e) {
            return e.map(function(e) {
                return {
                    peerId: e.peerId,
                    name: e.tab,
                    photo: e.photo,
                    lastmsg: e.lastmsg,
                    online: e.online,
                    is_friend: "friends" === n ? !0 : !1
                }
            })
        })
    }

    function ce(e) {
        return {
            peerId: e[0],
            name: e[1],
            tab: e[1],
            photo: e[2],
            lastmsg: e[3],
            href: e[4],
            online: e[5],
            is_friend: e[6],
            rating: e[7],
            local_index: !0
        }
    }

    function de(e, t) {
        return function(n, r) {
            return e(r).then(function(e) {
                var a = void 0;
                a = n === !1 ? e.list : e.search(n);
                var i = a.sort(t).map(ce);
                return r.mapped_index || (r.mapped_index = {}), i.forEach(function(e) {
                    r.mapped_index[e.peerId] = e
                }), i
            })
        }
    }

    function ge(e, t) {
        var n = void 0;
        t.friendsTree = new Promise(function(e) {
            n = e
        });
        var r = e.select(Gt.RECENT_SEARCH_OP);
        return (0, Ht.retryFn)(Ft.post, 1, function() {
            return 4
        })(Vt, {
            act: "a_dialogs_preload",
            rs: r.join(","),
            gid: t.gid
        }).then(function(e) {
            var r = Bt(e, 1),
                a = r[0],
                i = Object.keys(a).map(function(e) {
                    return a[e]
                });
            return new vkIndexer(i, function(e) {
                return e[1]
            }, n), t
        })["catch"](function(e) {
            return new vkIndexer([], function(e) {
                return e[1]
            }, n), t
        })
    }

    function fe(e) {
        var t = void 0;
        e.hintsTree = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.hints_preloaded).map(function(t) {
            return e.hints_preloaded[t]
        });
        return new vkIndexer(n, function(e) {
            return e[1]
        }, t), Promise.resolve(e)
    }

    function me(e) {
        var t = e.active_tab;
        return (0, Ft.post)(Vt, {
            act: "a_get_dialogs",
            offset: e.offset,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Bt(n, 3),
                a = r[0],
                i = r[1],
                o = r[2];
            return c(o, e), W(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.offset = a.offset, e.dialog_tabs_all[t] = !a.has_more, Promise.resolve(e)
        })
    }

    function pe(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(n) {
            var r = Bt(n, 4),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3];
            return e === t.searchText && (t.searchOffset = o, t.searchAllLoaded = s), [a, i]
        })
    }

    function _e(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function he(e, t) {
        if (t.peer === e && (0, zt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function ve(e, t) {
        if ((0, zt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay
        }
        return Promise.resolve(t)
    }

    function be(e, t) {
        if ((0, zt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function ye(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function Ce(e, t) {
        var n = t.tabs[e],
            r = "";
        if (ye(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
        var a = "in:" + e + " " + r + " " + (n.searchText || "");
        return (0, Ft.post)(Vt, {
            act: "a_search",
            q: a,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: n.searchOffset || 0
        }).then(function(e) {
            var t = Bt(e, 3),
                r = t[0],
                a = t[1],
                i = t[2];
            return n.searchOffset = a, n.searchAllLoaded = i, r
        })
    }

    function Te(e) {
        return (0, Ft.post)(Vt, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function Se(e, t, n) {
        return (0, zt.isFullyLoadedTab)(n, t) && ! function() {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = (0, zt.removeMessages)(e, l(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            })
        }(), Promise.resolve(n)
    }

    function Ee(e, t, n, r, a) {
        return (0, Ft.post)(Vt, {
            act: "a_mark",
            peer: t,
            hash: n,
            gid: a,
            msgs_ids: e.join(","),
            mark: r
        })
    }

    function we(e, t, n, r) {
        return (0, zt.isFullyLoadedTab)(r, t) && ! function() {
            var a = r.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = (0, zt.removeMessagesWithRestore)(e, t, n, l(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length
        }(), Promise.resolve(r)
    }

    function Ie(e, t, n) {
        if ((0, zt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = (0, zt.restoreMessage)(e, t, l(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function ke(e, t, n, r) {
        return (0, Ft.post)(Vt, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function Pe(e, t) {
        return t.msgid = e, Promise.resolve(t)
    }

    function Me(e, t, n, r) {
        if ((0, zt.isFullyLoadedTab)(r, t)) {
            r.pendingForward = [];
            var a = r.tabs[t];
            a.fwdMessages = e, n.update(Gt.FWD_STORE_OP, [t, e])
        }
        return Promise.resolve(r)
    }

    function Le(e, t, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
        if ((0, zt.isFullyLoadedTab)(n, e)) {
            var a = n.tabs[e];
            return a.fwdMessages || (a.fwdMessages = t.select(Gt.FWD_STORE_OP, e) || []), 1 !== a.fwdMessages.length || a.fwdMessages[0].length ? r ? Promise.resolve(a.fwdMessages) : Promise.resolve(a.fwdMessages.map(function(e) {
                return e[0] || e
            })) : (0, Ft.post)(Vt, {
                act: "a_get_fwd_object",
                msg_id: a.fwdMessages[0],
                gid: n.gid
            }).then(function(t) {
                var r = Bt(t, 2),
                    a = r[0],
                    i = r[1],
                    o = (0, Kt.parserMessage)(a),
                    s = [
                        [o.messageId, o.text, o.date, i, o.attaches]
                    ];
                return ls.set(m(e, n), s), s
            })
        }
        return Promise.resolve([])
    }

    function Ae(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function Oe(e, t, n) {
        return n.tabs[e].tab = t, n.tabs[e].data.title = t, Promise.resolve(n)
    }

    function De(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Ft.post)(Vt, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Bt(e, 1),
                r = n[0];
            return Object.keys(r).forEach(function(e) {
                var n = r[e];
                Object.keys(n).forEach(function(r) {
                    n[r] && t.tabs[e] && (t.tabs[e].data.members[r] = n[r])
                })
            }), t
        })
    }

    function xe(e, t, n, r) {
        if (0 === t.length) return Promise.resolve(r);
        var a = t.filter(function(e) {
                return !(0, zt.isTabLoaded)(r, e.peerId)
            }).map(function(e) {
                return d(e.peerId, 0, 0, 0, r)
            }),
            i = e.filter(function(e) {
                return e.kludges.source_act === zt.CHAT_INVITE_USER
            }).filter(function(e) {
                return r.tabs[e.peerId] && !r.tabs[e.peerId].data.members[e.kludges.source_mid]
            }).reduce(function(e, t) {
                var n = t.kludges.source_mid;
                return e[t.peerId] || (e[t.peerId] = []), inArray(n, e[t.peerId]) || e[t.peerId].push(n), e
            }, {}),
            o = t.filter(function(e) {
                return e.flags & jt.eventTypes.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !r.admins[e]
            });
        return 0 === Object.keys(i).length && 0 === o.length && 0 === a.length ? Promise.resolve(r) : (n.pause(), Promise.all([De(i, r), O(o, r), Promise.all(a)])["catch"](function() {
            return r
        }).then(function() {
            return n.resume()
        }).then(function() {
            return r
        }))
    }

    function Re(e, t, n, r) {
        var a = r.tabs[n];
        return t !== vk.id ? Promise.resolve(r) : ((0, zt.isTabLoaded)(r, n) && (e === zt.CHAT_KICK_USER ? (a.data.closed = !0, delete a.data.actions.leave, delete a.data.actions.avatar, delete a.data.actions.topic, t === vk.id && (a.data.actions["return"] = getLang("mail_return_to_chat"))) : e === zt.CHAT_INVITE_USER && (a.data.closed = !1, delete a.data.actions["return"], a.data.actions.leave = getLang("mail_leave_chat"), a.data.actions.avatar = getLang("mail_update_photo"), a.data.actions.topic = getLang("mail_change_topic")), r = r.peer === n ? C(r) : Promise.resolve(r)), Promise.resolve(r))
    }

    function Be(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, C(n)
    }

    function Fe(e, t, n) {
        return (0, zt.isTabLoaded)(n, e) && delete n.tabs[e].data.members[t], Promise.resolve(n)
    }

    function Ne(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function je(e, t, n, r) {
        return (0, zt.isFullyLoadedTab)(r, t) && ! function() {
            var a = r.tabs[t];
            e.filter(function(e) {
                return a.msgs[e]
            }).forEach(function(e) {
                var i = (0, Kt.getMessage)(r, t, e),
                    o = n ? i.flags | jt.eventTypes.FLAG_IMPORTANT : i.flags & ~jt.eventTypes.FLAG_IMPORTANT;
                i.flags = o, a.msgs[e] = i, a.history = (0, zt.updateStar)(e, n, l(a.history))
            })
        }(), Promise.resolve(r)
    }

    function He(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function Ue(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function Ge(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function ze(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function qe(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function Ke(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function We(e, t, n) {
        return (0, Ft.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function Ve(e, t, n, r) {
        return r.creating = !0, r.longpoll.pause(), (0, Ft.post)(Vt, {
            act: "a_multi_start",
            hash: r.writeHash,
            peers: t.join(","),
            title: n
        }).then(function(e) {
            var t = Bt(e, 1),
                n = t[0];
            return r.next_peer = n.peerId, r.tabs[n.peerId] = n, A(r, n, !1, function(e) {
                return [n.peerId].concat(e)
            }), r.longpoll.resume(), r
        }).then(function(t) {
            return e ? We(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw r.creating = !1, r.longpoll.resume(), e
        })
    }

    function Qe(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            a = e.active_tab;
        return (0, Ft.post)(Vt, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: a,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var i = Bt(n, 4),
                o = i[0],
                s = i[1],
                u = i[2],
                c = i[3];
            s.user_unread && handlePageCount("msg", s.user_unread), (0, Ut.lplog)("Resync success", "success");
            var d = e.peer,
                g = void 0;
            return g = (0, zt.isReservedPeer)(d) ? Promise.resolve(!1) : W(r({}, d, o[d]), {
                tabs: r({}, d, e.tabs[d])
            }), g.then(function(n) {
                e.tabs = o, e.admins = extend(e.admins, u), n && (e.tabs[d] = n.tabs[d], e.tabs[d].history = (0, zt.restoreQueue)(d, e, l(e.tabs[d].history))), e.loadingDialogs = !1, e.offset = Object.keys(o).length, e.mutedPeers = s.mutedPeers, e.lastDialogsOptions = {
                    has_more: s.has_more
                }, e.dialog_tab_cts = s.folder_cts, e.dialog_tabs[a] = c.map(intval);
                var r = e.dialog_tabs[a].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != a
                }).forEach(function(t) {
                    a == qt.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(lt(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), et(intval(s.unread), e)
            })
        })["catch"](function(t) {
            return (0, Ut.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, Ht.pause)(2).then(Qe.bind(null, e))
        })
    }

    function Ye(e, t, n, r) {
        if ((0, zt.isTabLoaded)(r, e)) {
            var a = r.tabs[e].data.members[n];
            t == n ? a.closed = 1 : a.kicked = 1, n === vk.id && t != n && (r.tabs[e].data.kicked = 1)
        }
        return Promise.resolve(r)
    }

    function Xe(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function Ze(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function $e() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Je(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || $e()
    }

    function et(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[qt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function tt(e, t) {
        return t.ctrl_submit = !!e, (0, Ft.post)(Vt, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function nt(e, t, n) {
        var r = n.tabs[e];
        return r.bind_url_to_attach || (r.bind_url_to_attach = t.select(Gt.ATTACH_STORE_OP, e) || {}), Promise.resolve(r.bind_url_to_attach)
    }

    function rt(e, t, n, r, a, i) {
        return nt(e, cur.imDb, i).then(function(o) {
            return o[r] = [t, n], a.update(Gt.ATTACH_STORE_OP, [e, o]), Promise.resolve(i)
        })
    }

    function at(e, t, n) {
        var r = n.tabs[e];
        return r.bind_url_to_attach = {}, t.update(Gt.ATTACH_STORE_OP, [e, {}]), Promise.resolve(n)
    }

    function it(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return document.title = e ? e : document.title, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e) document.title = e, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var a = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + a + t + ".ico"), document.title = winToUtf(getLang("mail_im_new_messages", r))
            }
        }
    }

    function ot(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var i = it(r, a, n);
            n.update_title_to = setInterval(i, 1e3), i()
        } else !t && n.update_old_title && (document.title = n.update_old_title, n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function st(e, t, n, r) {
        return (0, zt.isFullyLoadedTab)(r, e) && (r.tabs[e].scrollTop = intval(t), r.tabs[e].scrollBottom = intval(n)), Promise.resolve(r)
    }

    function lt(e) {
        return e === qt.FOLDER_ALL ? function() {
            return !0
        } : e === qt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : e === qt.FOLDER_UNRESPOND ? function(t) {
            return !(t.folders & qt.FOLDER_MASKS[e])
        } : function(t) {
            return t.folders & qt.FOLDER_MASKS[e]
        }
    }

    function ut(e, t) {
        t.active_tab = e, (0, Nt.updateLocation)({
            tab: e === qt.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== qt.FOLDER_ALL && !(0, zt.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[qt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(lt(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return t.offset = t.dialog_tabs[e].length, Promise.resolve(t)
    }

    function ct(e, t, n) {
        return e === jt.eventTypes.SET_DIRECTORIES && n.folders & t ? !1 : e !== jt.eventTypes.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function dt(e, t, n) {
        var r = void 0;
        return r = t === jt.eventTypes.REPLACE_DIRECTORIES ? e.folders & qt.FOLDER_MASKS[n] ? -1 : 1 : t === jt.eventTypes.SET_DIRECTORIES ? 1 : -1, n === qt.FOLDER_UNRESPOND && (r = -r), r
    }

    function gt(e, t, n, r) {
        var a = e.dialog_tabs_all;
        if (a[qt.FOLDER_ALL] || a[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var i = n.map(function(t) {
            return e.tabs[t]
        }).filter(function(t) {
            return (0, zt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return i.length > 0 ? !0 : !1
    }

    function ft(e, t, n, r, a) {
        if (!(0, zt.isTabLoaded)(a, e)) return d(e, 0, 0, 0, a).then(ft.bind(null, e, t, n, a));
        var i = function() {
            var r = a.tabs[e];
            return n === jt.eventTypes.REPLACE_DIRECTORIES && (t ^= r.folders), ct(n, t, r) && Object.keys(qt.FOLDER_MASKS).filter(function(e) {
                return qt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                a.dialog_tab_cts[e] += dt(r, n, e)
            }), n === jt.eventTypes.SET_DIRECTORIES ? a.tabs[e].folders |= t : n === jt.eventTypes.RESET_DIRECTORIES ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= r.folders, A(a, a.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return a.tabs[e]
                }).filter(lt(n)).map(function(e) {
                    return e.peerId
                })
            }, gt.bind(null, a)), {
                v: Promise.resolve(a)
            }
        }();
        return "object" === ("undefined" == typeof i ? "undefined" : Rt(i)) ? i.v : void 0
    }

    function mt(e) {
        return (0, Ft.post)(Vt, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function pt(e, t) {
        return c(r({}, e, {
            free: !0
        }), t), (0, Ft.post)(Vt, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function _t(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function ht(e, t, n, r) {
        return (0, Ft.post)(Vt, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, A(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function vt(e, t, n) {
        return (0, Ft.post)(Vt, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function bt(e, t, n) {
        return n.tabbedPeers = e, (0, zt.isClassicInterface)(n) && (Zt({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return (0, zt.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(zt.convertPeerToUrl).join("_")
        }), t && $t()), Promise.resolve(n)
    }

    function yt(e) {
        return e.peer ? he(e.peer, e) ? _e(e.peer, e) : (0, zt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function Ct(e, t) {
        var n = t.tabs[e];
        return (0, zt.isFullyLoadedTab)(t, e) && (n.last_act_mobile = null, n.last_act = null, n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function Tt(e, t) {
        var n = t.tabs[e];
        return (0, zt.isFullyLoadedTab)(t, e) && (n.history = u(n.history)), Promise.resolve(t)
    }

    function St(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function Et(e, t, n) {
        if (!(0, zt.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = (0, Kt.getTab)(n, t);
        return r.blocked_community = !e, (0, Ft.post)(Vt, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return C(n)
        })
    }

    function wt(e, t) {
        if (0 !== t.peer && (0, zt.isFullyLoadedTab)(t, t.peer)) {
            var n = (0, Kt.getTab)(t, t.peer);
            n.history = l(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function It(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function kt(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function Pt(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function Mt(e) {
        Zt({
            act: e ? "create" : null
        }), $t()
    }

    function Lt() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? null : arguments[0];
        Zt({
            q: e
        }), $t()
    }

    function At(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, zt.getClassicChatHeight)() > window.clientHeight() && (0,
            zt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function Ot(e, t) {
        var n = (0, Ut.arrayUnique)([e].concat(t.select(Gt.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Gt.RECENT_SEARCH_OP, n)
    }

    function Dt(e) {
        e.update(Gt.RECENT_SEARCH_OP, [])
    }

    function xt(e, t) {
        var n = t.select(Gt.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Gt.RECENT_SEARCH_OP, n), n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchFriends = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var Rt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        Bt = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
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
    t.strHistory = u, t.updateBlockStates = c, t.loadPeer = d, t.restoreHistoryQueue = g, t.removeFailed = f, t.selectPeer = _, t.selectPeerOnMessage = v, t.changePeer = b, t.updateMentions = y, t.setActions = C, t.loadMoreHistory = T, t.loadLessHistory = S, t.createEmailChat = I, t.loadLongPollKey = k, t.loadLongPollTs = P, t.setMessageErrored = M, t.resendMessage = L, t.loadAdmins = O, t.returnedToChat = x, t.addMessage = B, t.markInboundMessagesAsRead = N, t.markOutboundMessagesAsRead = j, t.initTextStore = H, t.addMediaStore = U, t.cleanMediaStore = G, t.restoreAttaches = q, t.getAttaches = K, t.mergeTabs = W, t.updateOnline = V, t.setTyping = Q, t.waitTyping = Y, t.saveTextDraft = X, t.getTextDraft = Z, t.addSelection = $, t.cleanSelected = J, t.dropSelection = ee, t.replaceMessage = te, t.saveMedia = ne, t.loadMedia = re, t.replaceMediaAttachesStore = ae, t.setCurrentSearchDate = ie, t.setCurrentSearch = oe, t.searchHints = le, t.searchHintsIndex = ue, t.localIndexToDialog = ce, t.fetchFriends = ge, t.fetchLocalHints = fe, t.loadDialogs = me, t.searchMessages = pe, t.isSearchAllLoaded = _e, t.isSearchingInplace = he, t.cancelSearch = ve, t.clearDate = be, t.searchInplaceStart = ye, t.searchMessagesInplace = Ce, t.loadImportant = Te, t.removeMessages = Se, t.removeMessageSend = Ee, t.removeMessagesWithRestore = we, t.restoreMessage = Ie, t.restoreMessageSend = ke, t.changeMessage = Pe, t.forwardMessages = Me, t.getForwardedMessages = Le, t.prepareForward = Ae, t.setChatTitle = Oe, t.loadChatMember = De, t.checkNewPeople = xe, t.updateActions = Re, t.setMutedPeer = Be, t.removeMember = Fe, t.setExecStack = Ne, t.updateFavMessage = je, t.updateImportant = He, t.loadSpam = Ue, t.flushSpam = Ge, t.setCreationType = ze, t.getOwnerPhoto = qe, t.presetAvatar = Ke, t.setChatPhoto = We, t.createChat = Ve, t.resync = Qe, t.chatKickUser = Ye, t.toggleSendingAbility = Xe, t.setDelayedMessage = Ze, t.isAnythingLoading = Je, t.updateUnreadCount = et, t.changeSubmitSettings = tt, t.getBindAttachToUrl = nt, t.bindAttachToUrl = rt, t.clearAttachToUrl = at, t.updateFavAndTitle = ot, t.saveHistoryScroll = st, t.filterFromTab = lt, t.changeDialogsTab = ut, t.updateFolderState = ft, t.getMutexQueue = mt, t.releaseBlock = pt, t.toggleCommunityMute = _t, t.restoreDialog = ht, t.spamDialog = vt, t.updateTabbedPeers = bt, t.isEverythingLoaded = yt, t.cleanTab = Ct, t.stringifyTab = Tt, t.updateGoToEndVisibility = St, t.toggleCommunityMessages = Et, t.updateHistory = wt, t.startRecording = It, t.cancelRecording = kt, t.setVoiceMessageAvail = Pt, t.toggleConversation = Mt, t.updateSearchQuery = Lt, t.initializeChatResize = At, t.saveRecentSearchPeer = Ot, t.resetRecentSearch = Dt, t.removeFromRecentSearch = xt;
    var Ft = n(43),
        Nt = n(42),
        jt = n(11),
        Ht = n(20),
        Ut = n(10),
        Gt = n(28),
        zt = n(3),
        qt = n(9),
        Kt = n(5),
        Wt = n(16),
        Vt = "al_im.php",
        Qt = t.TYPING_PERIOD = 5,
        Yt = 2e4,
        Xt = (0, Nt.updateLazyLocation)(),
        Zt = Xt.scheduleNav,
        $t = Xt.commitNav,
        Jt = t.ACTION_PRIORITIES = {
            block: 1,
            fav: 1,
            chat: 2,
            invite: 2,
            topic: 3,
            avatar: 4,
            photos: 5,
            search: 6,
            mute: 7,
            unmute: 7,
            clear: 8,
            leave: 9,
            "return": 9,
            block_community: 9,
            allow_community: 9
        };
    t.readLastMessages = s(function(e, t) {
        var n = t.tabs[e],
            r = Object.keys(n.msgs).map(function(n) {
                return (0, Kt.getMessage)(t, e, n)
            }).filter(function(e) {
                return !(0, Wt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return n.skipped > 0 && (r = r.filter(function(e) {
            return intval(e) <= n.lastmsg - n.skipped
        })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([jt.eventTypes.readInboundEvent([6, e, r])]), (0, Ft.post)(Vt, {
            peer: e,
            ids: [r],
            hash: n.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return E(t, e, r, jt.eventTypes.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = s(function(e, t, n) {
        var r = Date.now() + rand(0, 100).toFixed(0),
            a = n.tabs[e],
            i = t.attaches.map(function(e) {
                return "fwd" === e[0] ? ["mail", e[1].join(";")] : e
            }).map(function(e) {
                return e[0] + ":" + e[1]
            }).join(","),
            o = t.attaches.filter(function(e) {
                return "share" === e[0]
            }).pop(),
            s = void 0;
        return o && (s = o[2].url), (0, Ft.post)(Vt, {
            act: "a_send",
            to: e,
            hash: a.hash,
            msg: t.message,
            media: i,
            guid: r,
            share_url: s,
            random_id: t.rid,
            gid: n.gid,
            sticker_referrer: t.sticker_referrer
        }, Yt).then(function(e) {
            var t = Bt(e, 1),
                r = t[0];
            return n.version !== r.version && nav.reload({
                force: !0
            }), n
        })
    }), t.searchFriends = de(function(e) {
        return e.friendsTree
    }, function(e, t) {
        return t[3] - e[3]
    }), t.searchLocalHints = de(function(e) {
        return e.hintsTree
    }, function(e, t) {
        return e[3] - t[3]
    }), t.sendTyping = s(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Ft.post)(Vt, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(e) {
            return t
        })
    }), t.flushHistory = s(function(e, t) {
        if ((0, zt.isTabLoaded)(t, e)) {
            t.blockedFlagUpdates || (t.blockedFlagUpdates = {}), t.blockedFlagUpdates[e] = !0, A(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].unread > 0 && F(t, -1, e), 0 === t.unread_cnt && t.unread_only && toggleUnreadOnly(t);
            var n = t.tabs[e];
            n.deletedDialog = !0;
            var r = t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return bt(r, !0, t), (0, Ft.post)("al_im.php", {
                act: "a_flush_history",
                id: e,
                from: "im",
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(r) {
                var a = Bt(r, 2);
                return a[0], a[1], delete t.blockedFlagUpdates[e], n.msgs = null, n.history = null, n.unread = 0, n.lastmsg = !1, n.lastmsg_meta = null, t
            })
        }
    }), t.updateChatTopic = s(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ft.post)(Vt, {
            act: "a_get_chat",
            cur_peers: Object.keys(r.data.members).join(","),
            cur_title: r.data.title,
            chat: e - 2e9,
            new_title: t,
            hash: r.hash
        }).then(function(t) {
            var a = Bt(t, 2),
                i = (a[0], a[1]);
            return n.tabs[e] = extend(r, i), n
        })
    }), t.addNewMember = s(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ft.post)(Vt, {
            act: "a_get_chat",
            cur_peers: Object.keys(r.data.members).join(","),
            cur_title: r.data.title,
            chat: e - 2e9,
            new_peer: t.join(","),
            hash: r.hash
        }).then(function(t) {
            var a = Bt(t, 2),
                i = a[0],
                o = a[1];
            return i.forEach(function(e) {
                if (e.error) throw new Error(e.message)
            }), n.tabs[e] = extend(r, o), n
        })
    }), t.updateChatPhoto = s(function(e, t) {
        return e.kludges.source_act === zt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, Promise.resolve(t)) : (0, Ft.post)(Vt, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(n) {
            var r = Bt(n, 2),
                a = r[0],
                i = r[1];
            t.chat_photo_msg = i;
            var o = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = a, (0, zt.isFullyLoadedTab)(t, e.peerId)) {
                var s = e.kludges.source_act;
                o.history = (0, zt.addChatPhotoToUpdate)(e, s, t, l(o.history))
            }
            return t
        })
    }), t.leaveChat = s(function(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Re.bind(null, zt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = s(function(e, t) {
        return (0, Ft.post)(Vt, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Re.bind(null, zt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = s(function(e, t, n) {
        return (0, Ft.post)(Vt, {
            act: "a_mute",
            peer: e,
            hash: n.tabs[e].hash,
            gid: n.gid,
            value: t
        }).then(function() {
            var r = t ? "mute" : "unmute";
            return window.Notifier && Notifier.lcSend("im", {
                act: r,
                peer: e
            }), n
        }).then(Be.bind(null, e, t))
    }), t.favMessage = s(function(e, t, n, r) {
        return je(e, n, t, r), (0, Ft.post)(Vt, {
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
    }), t.toggleDialogImportant = s(function(e, t) {
        var n = qt.FOLDER_MASKS[qt.FOLDER_IMPORTANT],
            r = t.tabs[e].folders & n,
            a = r ? jt.eventTypes.resetDirectoriesEvent : jt.eventTypes.setDirectoriesEvent;
        return t.longpoll.push([a([0, e, n, !0])]), (0, Ft.post)(Vt, {
            act: "a_dialog_star",
            val: r ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = s(function(e, t, n) {
        var r = qt.FOLDER_MASKS[qt.FOLDER_UNRESPOND];
        return n.longpoll.push([jt.eventTypes.setDirectoriesEvent([0, e, r, !0]), jt.eventTypes.readInboundEvent([6, e, t])]), (0, Ft.post)(Vt, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: n.tabs[e].hash,
            gid: n.gid
        }).then(function() {
            return n
        })
    }), t.deleteDialog = s(function(e, t) {
        return A(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), bt(t.tabbedPeers.filter(function(t) {
            return t.peer !== e
        }), !0, t), t.tabs[e].deletedDialog = !0, (0, Ft.post)(Vt, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            return n[0] && (t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null), n
        })
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            callMutations: function() {
                if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                return e
            },
            bindMutations: function() {
                return e = e.apply(void 0, arguments)
            }
        }
    }

    function a(e, t, n, r) {
        addEvent(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function i(e, t, n, r, a) {
        (0, l.addDelegateEvent)(t, n, r, a), e._registeredHandlers.push(["delegate", t, n, r, a])
    }

    function o(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(a.bind(null, t), i.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? l.removeDelegateEvent.apply(void 0, t) : removeEvent.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = o, t.destroyModule = s;
    var l = n(79)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i() {
        var e = ls.get(st);
        return e || 0
    }

    function o(e) {
        e >= window.clientHeight() - 30 && (e = 0), ls.set(st, e)
    }

    function s(e, t) {
        var n = geByClass1(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && setStyle(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function l(e, t) {
        var n = window.devicePixelRatio >= 2 ? "256" : "128";
        return t ? '<div class="im_sticker_row">\n      <a onmouseover="return Emoji.stickerOver(' + intval(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + intval(t) + ', this, event);">\n          <img height="128"\n            class="im_gift"\n            src="/images/stickers/' + intval(e) + "/" + n + '.png"/>\n      </a>\n    </div>' : '<div class="im_sticker_row">\n      <img height="128"\n        class="im_gift"\n        src="/images/stickers/' + intval(e) + "/" + n + '.png"/>\n    </div>'
    }

    function u(e, t, n) {
        if (I(e.get(), t)) {
            var r = e.get().tabs[t].deleted || [];
            return inArray(n, r)
        }
        return !1
    }

    function c(e, t, n) {
        var r = n.randomId,
            a = geByClass1("_im_mess_rid" + r, t);
        return a && (t = q([a], t), t = _(e, n, t, !0, !1)), t
    }

    function d(e) {
        var t = (0, Ge.checkVoiceMessageAvailable)(e);
        return "undefined" != typeof t ? Promise.resolve(t) : g().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function g() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function f(e) {
        return getTemplate("im_preloader", {
            preloader: rs(vk.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function m(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function p(e) {
        var t = geByClass1("_im_invisible_bar", e);
        t && (removeClass(t, "_im_invisible_bar"), removeClass(t, "im-page--history-new-bar_hide"))
    }

    function _(e, t, n) {
        var r = (arguments.length <= 3 || void 0 === arguments[3] ? !0 : arguments[3], arguments.length <= 4 || void 0 === arguments[4] ? !0 : arguments[4]),
            a = arguments.length <= 5 || void 0 === arguments[5] ? !0 : arguments[5],
            i = e.tabs[t.peerId];
        if (geByClass1("_im_mess", n) || geByClass1("_im_bar_date", n) || (n.innerHTML = ""), i.skipped > 0) return n;
        var o = "",
            s = "",
            u = ["_im_mess"],
            c = [];
        t.local || (c = e.imQueue(t.peerId, r)), c.length > 0 && q(c.map(function(e) {
            return geByClass1("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        })), t.flags & ze.eventTypes.FLAG_OUTBOUND && t.flags & ze.eventTypes.FLAG_UNREAD && u.push("im-mess_unread _im_mess_unread");
        var d = Date.now() - 1e3 * t.date > 1e3;
        t.local && d && u.push("im-mess_sending"), t.local && u.push("" + Ye), t.failed && u.push("im-mess_failed " + Xe);
        var g = t.attaches[0] && "gift" === t.attaches[0].type,
            m = t.attaches[0] && "chronicle_invite" === t.attaches[0].type;
        g && u.push("im-mess_gift");
        var p = t.attaches.map(function(e) {
                return "sticker" === e.type ? l(e.id, e.productId) : f(e.type)
            }),
            _ = A(t.text, t.kludges);
        t.subject && "..." !== t.subject.trim() && !S(t.peerId) && (_ = getTemplate("im_topic", {
            topic: t.subject
        }) + _);
        var v = getTemplate("im_message_media", {
            messageId: t.messageId,
            attaches: p.join(""),
            text: '<div class="im_msg_text">' + (g ? _ : "") + "</div>"
        });
        g || (v = _ + v);
        var b = getTemplate("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                text: v,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + getLang("mail_send_message_error") + '" role="link"' : "",
                cls: u.join(" ")
            }),
            y = domLC(n);
        hasClass(y, "_im_mess_stack") || (y = domClosestSibling(y, "._im_mess_stack", -1));
        var C = (0, Ge.getLastMessage)(e, t.peerId, t.messageId),
            T = geByClass1("_im_unread_bar_row", n),
            E = (0, We.getUserId)(t),
            w = C ? P(C.date, e) : 0;
        if (!C || M(C, t, e, a)) {
            var I = "",
                k = !1;
            if (T && (0, We.isOut)(t) && Le(e, n, t.peerId), 1 === i.unread && !(0, We.isOut)(t) && a && (I += getTemplate("im_mess_bar", {}), k = !0, Le(e, n, t.peerId)), !isToday(new Date(w))) {
                var O = new Date,
                    D = k ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                I += getTemplate("im_day_bar", {
                    day: getShortDate(t.date, e.timeshift, !0, getLang("months_of", "raw"), !0),
                    date: t.date,
                    day_class: O.getDate() + O.getMonth() + O.getFullYear() + " " + D
                })
            }
            if (X(t)) I += getTemplate("im_service_row", {
                text: $(t, i),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                o = S(t.peerId) ? i.data.members[E].name : (0, We.isOut)(t) ? e.name : i.name;
                var x = 1;
                x = S(t.peerId) ? intval(i.data.members[E].sex) : (0, We.isOut)(t) ? e.im_sex : intval(i.sex), s = S(t.peerId) ? i.data.members[E].photo : (0, We.isOut)(t) ? e.photo : i.photo;
                var R;
                R = (0, We.isOut)(t) ? e.author_link : S(t.peerId) ? i.data.members[E].link : i.href;
                var B = getTemplate("im_mess_stack_name", {
                    name: o,
                    link: R
                });
                if (g) {
                    var F = getLang("mail_gift_message_sent", "raw");
                    B += ' <span class="im-mess-stack--gift">' + langSex(x, F) + "</span>"
                }
                m && (B += " " + getLang("mail_chronicle_invite_inf"));
                var N = intval(t.kludges.from_admin),
                    j = e.gid ? "/gim" + e.gid : "/im";
                if (t.local) var H = L(t.date, e.timeshift);
                else var H = getTemplate("im_stack_date", {
                    date: L(t.date, e.timeshift),
                    link: j + "?sel=" + t.peerId + "&msgid=" + t.messageId
                });
                if (e.gid && (0, We.isOut)(t) && e.admins[N]) {
                    var U = e.admins[N],
                        o = N === vk.id ? getLang("mail_by_you") : U[0];
                    H = H + " " + getTemplate("im_admin_link", {
                        name: o,
                        href: U[1]
                    })
                }
                I += getTemplate("im_mess_stack", {
                    photo: s,
                    href: R,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: stripHTML(B),
                    stack_name: B,
                    peerId: E,
                    date: H,
                    messages: b,
                    admin: t.kludges.from_admin || 0
                })
            }(0, Qe.toArray)(sech(I)).forEach(function(e) {
                return n.appendChild(e)
            })
        } else T && e.peer === t.peerId && !i.inplaceSearch && (0, We.isOut)(t) && Le(e, n, t.peerId), geByClass1("_im_stack_messages", y).appendChild(se(b));
        return (0, We.isOut)(t) && !d && setTimeout(function() {
            var e = geByClass1("_im_mess_" + t.messageId, n);
            hasClass(e, Ye) && addClass(e, "im-mess_sending")
        }, 500), c = c.filter(function(e) {
            return e.rid !== t.randomId
        }), h(c, e, n)
    }

    function h(e, t, n) {
        var r;
        return r = "object" === ("undefined" == typeof e ? "undefined" : Ue(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, Ge.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return _(t, e, n, !1)
        }), n
    }

    function v(e, t, n) {
        var r = e.tabs[t];
        return (0, Qe.toArray)(geByClass("_im_mess_unread", n)).forEach(function(e) {
            var t = intval(domData(e, "msgid"));
            t > 0 && r.out_up_to >= t && (removeClass(e, "_im_mess_unread"), removeClass(e, "im-mess_unread"))
        }), n
    }

    function b(e, t, n) {
        var r = geByClass1("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function y(e, t) {
        if (!(0, Ge.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function C(e) {
        return e >= -5 && 0 >= e ? !0 : !1
    }

    function T(e) {
        return e > 0 && 2e9 > e
    }

    function S(e) {
        return e > 2e9
    }

    function E(e) {
        return -2e9 > e
    }

    function w(e, t) {
        return e === t.peer
    }

    function I(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function k(e, t) {
        return I(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function P(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function M(e, t, n, r) {
        if ((0, We.getUserId)(e) !== (0, We.getUserId)(t)) return !0;
        var a = P(e.date, n),
            i = P(t.date, n);
        return isSameDate(a, i) ? (0, Ge.isCommunityInterface)(n) && intval(e.kludges.from_admin) !== intval(t.kludges.from_admin) ? !0 : t.date - e.date > 300 ? !0 : X(e) || X(t) ? !0 : (0, We.isGift)(e) || (0, We.isGift)(t) ? !0 : (0, We.isGraffiti)(e) || (0, We.isGraffiti)(t) ? !0 : (0, We.isUnread)(e) !== (0, We.isUnread)(t) && r && !(0, We.isOut)(t) ? !0 : !1 : !0
    }

    function L(e, t) {
        return new Date(1e3 * e), langDate(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function A(e, t, n) {
        var r = Ke.MESSAGE_REGEXP;
        return e = (e || "").replace(r, function() {
            var e = Array.prototype.slice.apply(arguments),
                t = e[1] || "",
                r = e[2] || "http://",
                a = e[3] || "",
                i = a + (e[4] || ""),
                o = (e[2] || "") + e[3] + e[4];
            if (-1 == a.indexOf(".") || -1 != a.indexOf("..")) return e[0];
            var s = a.split(".").pop();
            if ((s.length > 7 || -1 == indexOf(Ke.TOP_DOMAINS.split(","), s)) && (!/^[a-zA-Z]+$/.test(s) || !e[2])) return e[0];
            if (-1 != e[0].indexOf("@")) return e[0];
            try {
                o = decodeURIComponent(o)
            } catch (l) {}
            if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = clean(o).replace(/&amp;/g, "&"), !n && a.match(Ke.OUR_DOMAINS)) {
                i = replaceEntities(i).replace(Ke.ENTITIES, encodeURIComponent);
                var u, c = i,
                    d = i.indexOf("#/"),
                    g = "";
                return d >= 0 ? c = i.substr(d + 1) : (d = i.indexOf("#!"), d >= 0 && (c = "/" + i.substr(d + 2).replace(/^\//, ""))), u = c.match(Ke.VK_DOMAIN), u && u[1].length < 32 && (g = ' mention_id="' + u[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), t + '<a href="' + (r + i).replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '" target="_blank"' + g + ">" + o + "</a>"
            }
            return t + '<a href="away.php?utf=1&to=' + encodeURIComponent(r + replaceEntities(i)) + '" target="_blank" onclick="return goAway(\'' + clean(r + i) + "', {}, event);\">" + o + "</a>"
        }), e = e.replace(Ke.MENTION, function(e, t, n, r, a) {
            return '<a href="/' + t + n + '" class="mem_link" mention="' + clean(r || "") + '" mention_id="' + clean(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + a + "</a>"
        }), e = e.replace(Ke.EMAIL, function(e) {
            return '<a href="/write?email=' + e + '" target="_blank">' + e + "</a>"
        }), t.emoji && (e = Emoji.emojiToHTML(e, !0)), e
    }

    function O(e) {
        return S(e) ? "c" + (e - 2e9) : E(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function D(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - intval(e.substr(1));
            case "c":
                return 2e9 + intval(e.substr(1));
            default:
                return intval(e)
        }
    }

    function x(e, t) {
        return {
            search: {
                name: getLang("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: getLang("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: getLang("mail_allow_comm_messages")
            },
            clear: {
                name: e.peer < -2e9 ? getLang("mail_im_delete_email_contact") : getLang("mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: getLang("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: getLang("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: getLang("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: e.gid ? getLang("mail_im_show_media_history_group") : getLang("mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: t.avatar
            },
            block: {
                icon: "block",
                name: getLang("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: getLang("mail_im_create_chat_with")
            },
            leave: {
                icon: "leave",
                name: t.leave
            },
            topic: {
                icon: "topic",
                name: t.topic
            },
            "return": {
                icon: "return",
                name: t["return"]
            }
        }
    }

    function R(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = getTemplate("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function B(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = getTemplate("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function F(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return R(e, t[n])
                }).join("");
            case 3:
                return R(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return B(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return B(e, t[n])
                }).join("")
        }
    }

    function N(e, t) {
        if (e.photo) return '<div class="im_grid">\n      <img src="' + e.photo + '" alt="" />\n    </div>';
        var n = [];
        n = e.data.active ? (0, Qe.toArray)(e.data.active).slice(0, 4).map(function(t) {
            return e.data.members[t]
        }) : Object.keys(e.data.members).filter(function(e) {
            return intval(e) != vk.id
        }).slice(0, 4).map(function(t) {
            return e.data.members[t]
        });
        var r = n.reduce(function(e, t) {
                return e.photos.push(t.photo), e.links.push(t.link), e
            }, {
                photos: [],
                links: []
            }),
            a = r.photos,
            i = r.links;
        return i = t ? [] : i, F(a, i)
    }

    function j() {
        return '<li class="im-page--messages-search">' + getLang("mail_search_messages") + "</li>"
    }

    function H() {
        return '<li class="im-page--messages-search _im_recent_bar">\n    ' + getLang("mail_recent_searches") + '\n    <button type="button" class="' + ot + ' im-page--clear-recent">' + getLang("mail_clear_recent") + "</button>\n  </li>"
    }

    function U(e, t, n) {
        var r = geByClass1("_im_mess_" + t.messageId, n);
        if (r) {
            attr(r, "aria-hidden", "false"), addClass(r, "im-mess_failed " + Xe);
            var a = geByClass1("_im_mess_marker", r);
            attr(a, "aria-label", getLang("mail_send_message_error")), attr(a, "role", "link")
        }
        return n
    }

    function G(e, t, n) {
        var r = geByClass1("_im_mess_" + t, n);
        if (r) {
            removeClass(r, "im-mess_failed"), attr(r, "aria-hidden", "true"), removeClass(r, Xe);
            var a = geByClass1("_im_mess_marker", r);
            attr(a, "aria-label", ""), attr(a, "role", "")
        }
        return n
    }

    function z(e, t) {
        var n = e.map(function(e) {
            return geByClass1("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return q(n, t)
    }

    function q(e, t) {
        var n = e.filter(function(e) {
            return !hasClass(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === domChildren(e).length
        }).map(function(e) {
            return gpeByClass("_im_mess_stack", e)
        }).forEach(function(e) {
            var t = domPS(e);
            hasClass(t, "_im_bar_date") && re(t), re(e)
        }), t
    }

    function K(e, t, n, r) {
        return e.map(function(e) {
            return geByClass1("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            val(e, Q(t, e, n)), addClass(e, "im-mess_light")
        }), r
    }

    function W(e, t, n) {
        var r = geByClass1("_im_mess_" + e, n);
        if (r) {
            var a = geByClass1(Ze, r);
            val(r, a.innerHTML), removeClass(r, "im-mess_light")
        }
        return n
    }

    function V(e, t, n, r) {
        var a = arguments.length <= 4 || void 0 === arguments[4] ? 2 : arguments[4],
            i = r.tabs[t];
        if (!e) return "";
        var o = Object.keys(e).sort(function(t, n) {
            return e[n] - e[t]
        });
        if (0 === o.length) return "";
        if (T(t) || (0, Ge.isCommunityPeer)(t)) {
            var s = n ? "" : i.name;
            return s + " " + getLang("mail_typing")
        }
        var l = getLang("mail_typing_several", o.length),
            u = o.slice(0, o.length > a ? a : a - 1).map(function(e) {
                return i.data.members[e].short_name
            }).join(", ");
        if (o.length > a) {
            var c = o.length - a;
            u += " " + getLang("mail_and_peer").replace("{count}", c).replace("{typing}", l)
        } else {
            var d = !!u;
            if (d && o[a - 1] && (u += " " + getLang("mail_and_peer_one") + " "), d && o.length !== a || !o[a - 1]) var s = "";
            else var s = i.data.members[o[a - 1]].short_name;
            u += s + " " + l
        }
        return u
    }

    function Q(e, t, n) {
        var r = t.innerHTML,
            a = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + getLang(a) + ' <button type="button" data-peer="' + e + '" class="' + $e + ' im-mess--btn">' + getLang("mail_restore") + '</button>\n    <div class="' + Ze + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function Y() {
        return '<div class="im-page--chat-search-empty">\n    ' + getLang("mail_im_search_empty") + "\n  </div>"
    }

    function X(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function Z(e, t, n) {
        return n ? '<a class="im_srv_lnk" target="_blank" href="' + e + '">' + t + "</a>" : "<span>" + t + "</span>"
    }

    function $(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2],
            r = e.kludges,
            a = r.source_act,
            i = intval(r.source_mid),
            o = e.userId,
            s = t.data.members[o],
            l = "",
            u = o === i;
        switch (a) {
            case Je:
                l = "mail_im_chat_created";
                break;
            case et:
                l = "mail_im_title_updated";
                break;
            case tt:
                l = u ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case nt:
                l = u ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case rt:
                l = "mail_im_photo_set";
                break;
            case at:
                l = "mail_im_photo_removed";
                break;
            default:
                return ""
        }
        if (l = langSex(s.sex, getLang(l, "raw")), l = l.replace("{from}", Z(s.link, s.name, n)), i && i !== o) {
            var c = r.source_email;
            if (c) l = l.replace("{user}", Z("/im?email=${encodeURIComponent(email)", "email", n));
            else {
                var d = t.data.members[i],
                    g = a === nt ? d.name_kick_case : d.name_inv_case;
                l = l.replace("{user}", Z(d.link, g, n))
            }
        }
        return r.source_text && (l = l.replace("{title}", '&laquo;<b class="im_srv_lnk">' + r.source_text + "</b>&raquo;")), l
    }

    function J(e, t, n, r) {
        if (t === rt) {
            var a = geByClass1("_im_mess_" + e.messageId, r);
            if (a) {
                var i = n.tabs[e.peerId];
                a.parentNode.innerHTML = getTemplate("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: $(e, i) + n.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return r
    }

    function ee(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(Ke.MENTION_RAW, "$1$4")
    }

    function te(e, t) {
        return t ? !1 : e === vk.id
    }

    function ne(e, t) {
        return e.tt = !1, showTooltip(e, {
            url: (0, Ge.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

    function ae(e) {
        return function(t) {
            var n = arguments.length <= 1 || void 0 === arguments[1] ? "bottom" : arguments[1],
                r = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2],
                a = se(getTemplate("im_preloader", {
                    preloader: rs(vk.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                })),
                i = !1;
            setTimeout(function() {
                i || ("bottom" === n ? e.appendChild(a) : e.insertBefore(a, domFC(e)), addClass(a, "im-preloader_visible"))
            }, 0), t.then(function() {
                i = !0, removeClass(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
            })
        }
    }

    function ie(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, ze.eventTypes.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function oe(e, t) {
        var n = e;
        if (!t && !n) return !1;
        var r = n.target || n.srcElement,
            a = 4,
            i = !1,
            o = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w/;
        do
            if (!r || r.onclick || r.onmousedown || "A" == r.tagName || hasClass(r, "im_msg_media_link") || "IMG" == r.tagName && !hasClass(r, "_im_graffiti") && !hasClass(r, "emoji") && !hasClass(r, "emoji_css") && !hasClass(r, "im_gift") || "TEXTAREA" == r.tagName || hasClass(r, "play_new") || (i = o.test(r.className))) break; while (a-- && (r = r.parentNode));
        if (!i) return !0;
        var s = trim((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || document.selection && document.selection.createRange().text || "").toString());
        return s ? !0 : !1
    }

    function le(e, t) {
        return '<div class="im-mess--text">\n      <span>' + getLang("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + O(e) + "&msgid=" + t + '">' + getLang("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function ue(e, t) {
        return showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, e > 2e9 ? getLang("mail_chat_sure_to_delete_all") : getLang("mail_sure_to_delete_all"), getLang("mail_delete"), t, getLang("global_cancel"))
    }

    function ce(e, t, n, r, a) {
        t.showProgress(), e.set(r.bind(null, a)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
        })
    }

    function de(e, t, n, r, a) {
        var i = e.get().peer;
        cancelEvent(r), showBox("al_im.php", {
            act: "a_show_members_box",
            chat: i - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, a) {
                var i = (0, Ve.createModule)({
                    handlers: function(a, o) {
                        o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), ge(e, e.get().peer, t, n), (0, Ve.destroyModule)(i)
                        })
                    }
                })
            }
        }, r)
    }

    function ge(e, t, n, r) {
        var a = e.get().tabs[t].data.members,
            i = Object.keys(a).filter(function(e) {
                return !a[e].kicked && !a[e].closed
            }).map(function(e) {
                return intval(e)
            });
        e.set(r.bind(null, "add_member", i)).then(n().showCreation)
    }

    function fe(e, t, n) {
        if (e.get().active_tab === Ke.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === Ke.FOLDER_ALL ? Ke.FOLDER_UNREAD : Ke.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function me(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var a = (0, Ge.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, a !== (0, Ge.isReversedDialogs)(e)), e
        })
    }

    function pe(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return Ke.FOLDER_MASKS[Ke.FOLDER_IMPORTANT] & n.folders
    }

    function _e(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];
        if ("undefined" == typeof t && (t = e.get().peer), !(0, Ge.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return !(Ke.FOLDER_MASKS[Ke.FOLDER_UNRESPOND] & r.folders)
    }

    function he(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function ve(e) {
        return e.get().pendingForward && e.get().pendingForward.length > 0
    }

    function be(e, t) {
        return (t.get().block_states[e] || {}).who === vk.id
    }

    function ye(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([ze.eventTypes.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function Ce(e, t, n) {
        var r;
        return !showTabbedBox("al_im.php", {
            act: "a_spam",
            offset: "0",
            gid: e.get().gid
        }, {
            onDone: function(n, a) {
                a && (r = t(n, e, a))
            },
            params: {
                width: 638,
                onHide: function() {
                    AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function Te(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            r = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
            a = e.get().tabs[t];
        if (!a.last_act || !a.last_act[0]) return {
            str: "",
            time: ""
        };
        var i = getDateText(a.last_act[0], e.get().timeshift),
            o = langSex(a.sex, getLang("mail_last_activity_tip", "raw")).replace("{user}", n ? a.name : "").replace("{time}", i);
        return a.last_act_mobile && (o += Se(t, r)), {
            str: getTemplate("im_last_act", {
                lastact: o
            }),
            time: i
        }
    }

    function Se(e, t) {
        var n;
        return getTemplate("im_wrap_mobile", (n = {}, a(n, "class", "im_status_mob_onl"), a(n, "params", "mid: " + e + ", was: 1," + (t ? "forcetoup: true" : "forcetodown: true")), a(n, "attrs", ""), n))
    }

    function Ee(e, t) {
        var n = t.get().tabs[e];
        return showBox("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function we(e, t) {
        return showBox("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function Ie(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function ke(e, t, n, r) {
        var a;
        return !showTabbedBox("al_im.php", {
            act: "a_important",
            offset: "0"
        }, {
            onDone: function(r, i) {
                i && (a = n(r, e, t, i))
            },
            params: {
                width: 638,
                onHide: function() {
                    AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0)
                },
                onDestroy: function() {
                    a && a.unmount()
                }
            }
        }, r)
    }

    function Pe() {
        return "INPUT" === document.activeElement.tagName || "TEXTAREA" === document.activeElement.tagName || document.activeElement.getAttribute("contenteditable")
    }

    function Me(e, t, n) {
        var r = geByClass1("_im_mess_" + e, n);
        return r && toggleClass(r, "im-mess_fav", t), n
    }

    function Le(e, t, n) {
        var r = geByClass1("_im_unread_bar_row", t);
        if (!r) return t;
        var a = domClosestSibling(r, "._im_mess_stack", -1),
            i = domClosestSibling(r, "._im_mess_stack"),
            o = a ? geByClass("_im_mess", a).pop() : null,
            s = i ? geByClass1("_im_mess", i) : null;
        if (re(r), p(t), !s || !o) return t;
        var l = domData(o, "msgid"),
            u = domData(s, "msgid"),
            c = (0, Ge.getMessage)(e, n, l),
            d = (0,
                Ge.getMessage)(e, n, u);
        if (M(c, d, e)) return t;
        var g = geByClass1("_im_stack_messages", a),
            f = geByClass1("_im_stack_messages", i).children;
        return (0, Qe.toArray)(f).forEach(function(e) {
            re(e), g.appendChild(e)
        }), re(i), t
    }

    function Ae(e, t, n) {
        var r = (0, Ge.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var a = geByClass1("_im_mess_" + r, t);
        if (!a) {
            var i = (0, Ge.getLastMessage)(e, e.get().peer, r);
            if (!i) return [!0, 0];
            a = geByClass1("_im_mess_" + i.messageId, t)
        }
        var o = hasClass(a, "_im_mess_srv") ? a : gpeByClass("_im_mess_stack", a);
        if (!o) return [!0, 0];
        var s = a ? a.offsetTop : 0,
            l = o.offsetTop + s,
            u = n.contHeight();
        return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - l)]
    }

    function Oe(e, t, n) {
        cancelEvent(t);
        var r = gpeByClass("_im_top_notice", n);
        fadeOut(r, 200, re.pbind(r));
        var a = gpeByClass("_im_page_dialogs", r);
        a && hasClass(a, "im-page--dialogs-notice") && removeClass(a, "im-page--dialogs-notice"), ajax.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function De(e, t, n, r, a) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = n.replace(Ke.MENTION, function(e, t, n, r, a) {
            return a
        }), r && (n = Emoji.emojiToHTML(n, !0)), t && "..." !== t.trim() && !S(e) && (n = getTemplate("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && a.length > 0 && (n = getTemplate("im_dialog_media", {
            name: Fe(a[0])
        })), n
    }

    function xe(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
        return [e, t]
    }

    function Re(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
            r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
        if (r > 50) return [
            [], e.length
        ];
        for (var a = [], i = !1; n < e.length;) {
            var o = e[n];
            if ("id" === o) i = t[n];
            else if ("," === o && i) a.push(xe(i)), i = !1;
            else if ("(" === o) {
                var s = Re(e, t, n + 1, r + 1),
                    l = He(s, 2),
                    u = l[0],
                    c = l[1];
                n = c, a.push(xe(i, u)), i = !1
            } else if (")" === o) return i !== !1 && a.push(xe(i)), [a, n];
            n++
        }
        return i && a.push(xe(i)), [a, n]
    }

    function Be(e) {
        if (lt[e]) return lt[e];
        for (var t = e.length, n = [], r = [], a = "", i = 0; t > i; i++) {
            var o = e[i],
                s = o.charCodeAt(0);
            s >= 48 && 57 >= s || "_" === o || "-" === o ? a += o : ("(" === o || ")" === o || ":" === o || "," === o) && ("" !== a && (r.push(a), n.push("id"), a = ""), r.push(o), n.push(o))
        }
        a.length > 0 && (r.push(a), n.push("id"));
        var l = Re(n, r),
            u = He(l, 1),
            c = u[0];
        return Object.keys(lt).length > 300 && (lt = {}), lt[e] = c, c
    }

    function Fe(e) {
        switch (e.type) {
            case "fwd":
                var t = Be(e.raw).length;
                return langNumeric(t, getLang("mail_fwd_msgs", "raw"), !0);
            case "photo":
                return getLang("mail_added_photo");
            case "video":
                return getLang("mail_added_video");
            case "audio":
                return getLang("mail_added_audio");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return getLang("mail_added_graffiti");
                    case "audiomsg":
                        return getLang("mail_added_audiomsg");
                    default:
                        return getLang("mail_added_docs")
                }
            case "geo":
            case "map":
                return getLang("mail_added_geo");
            case "wall":
                return getLang("mail_added_wall");
            case "wall_reply":
                return getLang("mail_added_wall_reply");
            case "gift":
                return getLang("mail_added_gift");
            case "link":
            case "share":
                return getLang("mail_added_link");
            case "sticker":
                return getLang("mail_added_sticker");
            case "chronicle":
                return getLang("mail_added_chronicle");
            case "chronicle_invite":
                return getLang("mail_invite_chronice");
            case "market":
                return getLang("mail_added_market_item");
            case "money_transfer":
                return getLang("mail_added_money_transfer");
            case "story":
                return getLang("mail_added_story")
        }
        return ""
    }

    function Ne(e) {
        addClass(e, "im-send-btn_loading")
    }

    function je(e) {
        removeClass(e, "im-send-btn_loading")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.selectionRemove = t.CLEAR_RECENT_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.LAST_ACT_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var He = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
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
        Ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        Ge = n(5);
    Object.keys(Ge).forEach(function(e) {
        "default" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return Ge[e]
            }
        })
    }), t.getClassicChatHeight = i, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.renderSticker = l, t.isAlreadyDeleted = u, t.replaceMessageAttrs = c, t.isVoiceMessageAvailable = d, t.getAvailableMicrophones = g, t.renderAttach = f, t.dayFromVal = m, t.showInvisibleBar = p, t.appendToHistory = _, t.restoreQueue = h, t.markMessagesAsRead = v, t.replaceAttaches = b, t.isDuplicate = y, t.isReservedPeer = C, t.isUserPeer = T, t.isChatPeer = S, t.isPeerActive = w, t.isTabLoaded = I, t.isTabLoadedWithMessage = k, t.parseMessage = A, t.convertPeerToUrl = O, t.unUrlPeer = D, t.chatActions = x, t.renderPhotos = F, t.renderPhotosFromTab = N, t.renderMessagesSearch = j, t.renderClearRecent = H, t.setMessageError = U, t.startResendMessage = G, t.removeMessages = z, t.removeMessagesWithRestore = K, t.restoreMessage = W, t.formatTyper = V, t.renderEmptySearch = Y, t.isServiceMsg = X, t.renderServiceMsg = $, t.addChatPhotoToUpdate = J, t.replaceSpecialSymbols = ee, t.isSelfMessage = te, t.showVerifiedTooltip = ne, t.wrapLoading = ae, t.tabFromIds = ie, t.checkSelectClick = oe, t.renderGoTo = le, t.showFlushDialog = ue, t.cleanHistory = ce, t.showChatMembers = de, t.inviteUser = ge, t.showUnreadOnly = fe, t.changeTab = me, t.isImportant = pe, t.isUnrespond = _e, t.isPeerBlocked = he, t.isPendingForward = ve, t.isPeerBlockedByMe = be, t.blockLatencyCompensation = ye, t.showSpamLayer = Ce, t.getLastTime = Te, t.getMobileIcon = Se, t.showBlacklistBoxUser = Ee, t.showBlacklistBox = we, t.getBaseLink = Ie, t.showFavvedBox = ke, t.isEditableFocused = Pe, t.updateStar = Me, t.removewNewUnreadBarAndMerge = Le, t.isMessagesVisible = Ae, t.hideTopNotice = Oe, t.renderShortText = De, t.attachToText = Fe, t.lockButton = Ne, t.unlockButton = je;
    var ze = n(11),
        qe = n(9),
        Ke = r(qe),
        We = n(16),
        Ve = n(2),
        Qe = n(10),
        Ye = t.SENDING_CLASS = "_im_mess_sending",
        Xe = t.FAILED_CLASS = "_im_mess_faild",
        Ze = t.ORIGINAL_CLASS = "_im_mess_original",
        $e = t.RESTORE_CLASS = "_im_mess_restore",
        Je = (t.LAST_ACT_CLASS = "_im_last_act", t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        et = t.CHAT_TITLE_ACTION = "chat_title_update",
        tt = t.CHAT_INVITE_USER = "chat_invite_user",
        nt = t.CHAT_KICK_USER = "chat_kick_user",
        rt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        at = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        it = t.DESELECT_ALL_CLASS = "_im_deselect_all",
        ot = (t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        st = (t.selectionRemove = function() {
            return '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + it + '"></button>'
        }, "chatPosition"),
        lt = {}
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = M(e, 2),
            n = t[1];
        return {
            type: L,
            localId: n
        }
    }

    function r(e) {
        var t = M(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: O,
            messageId: n,
            mask: r,
            peerId: a
        }
    }

    function a(e) {
        var t = M(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: A,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function i(e) {
        var t = M(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: D,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function o(e) {
        for (var t = M(e, 9), n = t[1], r = t[2], a = t[3], i = t[4], o = t[5], s = t[6], l = t[7], u = t[8], c = [], d = 1; l["attach" + d + "_type"];) c.push({
            type: l["attach" + d + "_type"],
            id: l["attach" + d],
            productId: l["attach" + d + "_product_id"],
            build: l["attach" + d + "_build"],
            kind: l["attach" + d + "_kind"]
        }), d++;
        if (l.fwd) {
            var g = l.fwd.split(",").map(function(e) {
                return {
                    text: l["fwd" + e],
                    id: e
                }
            });
            c.push({
                type: "fwd",
                raw: l.fwd,
                messages: g
            })
        }
        return l.geo && c.push({
            type: "geo",
            id: l.geo,
            productId: null,
            build: null
        }), {
            type: x,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(a),
            date: intval(i),
            attaches: c,
            subject: o,
            text: s,
            kludges: l,
            randomId: intval(u),
            userId: intval(a) > 2e9 ? intval(l.from) : intval(a)
        }
    }

    function s(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: R,
            peerId: n,
            upToId: r
        }
    }

    function l(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: B,
            peerId: n,
            upToId: r
        }
    }

    function u(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: F,
            userId: -n,
            platform: r
        }
    }

    function c(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: N,
            userId: -n,
            reason: r
        }
    }

    function d(e) {
        var t = M(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: K,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function g(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: W,
            peerId: n,
            mask: r
        }
    }

    function f(e) {
        var t = M(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: V,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function m(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: j,
            chatId: n,
            self: r
        }
    }

    function p(e) {
        var t = M(e, 2),
            n = t[1];
        return {
            type: H,
            userId: n,
            peerId: n
        }
    }

    function _(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: H,
            userId: n,
            peerId: r + 2e9
        }
    }

    function h(e) {
        var t = M(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: U,
            userId: n,
            callId: r
        }
    }

    function v(e) {
        var t = M(e, 2),
            n = t[1];
        return {
            type: G,
            count: n
        }
    }

    function b(e) {
        var t = M(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: z,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function y(e) {
        return {
            type: q,
            params: e
        }
    }

    function C(e) {
        return {
            type: Y,
            state: e
        }
    }

    function T() {
        return {
            type: Q
        }
    }

    function S() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
        return {
            type: X,
            cancelSearch: e
        }
    }

    function E(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
            n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            r = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
        return {
            type: $,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r
        }
    }

    function w(e) {
        return {
            type: J,
            tab: e
        }
    }

    function I(e, t, n) {
        return {
            type: ee,
            message: t,
            peer: e,
            error: n
        }
    }

    function k(e) {
        var t = M(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5];
        return {
            type: Z,
            free: !!intval(n) || intval(i) === vk.id,
            resource: r,
            peerId: intval(a),
            who: intval(i),
            name: o
        }
    }

    function P(e, t) {
        return {
            type: te,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var M = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.deleteEvent = n, t.replaceFlagsEvent = r, t.setFlagsEvent = a, t.resetFlagsEvent = i, t.addMessageEvent = o, t.readInboundEvent = s, t.readOutboundEvent = l, t.gotOnlineEvent = u, t.gotOfflineEvent = c, t.resetDirectoriesEvent = d, t.replaceDirectoriesEvent = g, t.setDirectoriesEvent = f, t.chatChangedEvent = m, t.typingUserEvent = p, t.typingChatEvent = _, t.videoCallEvent = h, t.unreadCountEvent = v, t.notifySettingsChangedEvent = b, t.emptyEvent = y, t.transitionEvent = C, t.resyncEvent = T, t.resetPeer = S, t.changePeer = E, t.changeTab = w, t.failedMessage = I, t.mutexEvent = k, t.resendEvent = P;
    var L = t.DELETE = "event_delete",
        A = t.SET_FLAGS = "event_set_flags",
        O = t.REPLACE_FLAGS = "event_replace_flags",
        D = t.RESET_FLAGS = "event_reset_flags",
        x = t.ADD_MESSAGE = "event_add_message",
        R = t.READ_INBOUND = "event_read_inbound",
        B = t.READ_OUTBOUND = "event_read_outbound",
        F = t.GOT_ONLINE = "event_got_online",
        N = t.GOT_OFFLINE = "event_got_offline",
        j = t.CHAT_CHANGED = "event_chat_changed",
        H = t.TYPING = "event_typing",
        U = t.VIDEO_CALL = "event_video_call",
        G = t.UNREAD_COUNT = "event_unread_count",
        z = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        q = t.EMPTY = "event_empty",
        K = t.RESET_DIRECTORIES = "event_reset_directories",
        W = t.REPLACE_DIRECTORIES = "event_replace_directories",
        V = t.SET_DIRECTORIES = "event_set_directories",
        Q = t.RESYNC = "event_resync",
        Y = t.TRANSITION = "transition_event",
        X = t.RESET_PEER = "reset_peer",
        Z = t.MUTEX = "mutex",
        $ = t.CHANGE_PEER = "change_peer",
        J = t.CHANGE_TAB = "event_change_tab",
        ee = t.FAILED_MESSAGE = "event_failed_message",
        te = t.RESEND = "event_resend";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.get ? e.get() : e
    }

    function a(e, t) {
        var n = r(e),
            a = n.tabs[n.peer];
        return Object.keys(a.msgs).filter(function(n) {
            var r = _(e, t, n);
            return !(0, x.isOut)(r) && intval(n) > a.in_up_to
        })[0]
    }

    function i(e) {
        var t = r(e);
        return t.peer
    }

    function o(e, t) {
        var n = r(e);
        return n.tabs[t]
    }

    function s(e) {
        var t = r(e);
        return t.selectedMessages
    }

    function l(e, t, n) {
        var r = o(e, t),
            a = s(e)[0];
        if ("undefined" == typeof a) return [n];
        var i = Math.min(n, a),
            l = Math.max(n, a);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= i && l >= e
        }).map(intval)
    }

    function u(e, t) {
        var n = r(t),
            a = o(n, e),
            i = 0;
        for (var s in a.msgs) {
            var l = _(t, e, s);
            !(0, x.isOut)(l) && intval(s) > a.in_up_to && (i += (0, x.isUnread)(l) ? 1 : 0)
        }
        return i
    }

    function c(e, t, n) {
        var r = o(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(_(e, t, r).randomId) === n
        }).length > 0
    }

    function d(e, t, n) {
        var r = c(e, t, n);
        return !!r
    }

    function g(e, t) {
        var n = r(e),
            a = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof a ? 2e9 + a : t
    }

    function f(e, t, n) {
        var r = o(e, t),
            a = _(e, t, n),
            i = Object.keys(r.msgs).filter(function(n) {
                var r = _(e, t, n);
                return !a.local && r.local ? !1 : a.local && !r.local ? !0 : g(e, a.messageId) > g(e, r.messageId)
            }),
            s = i.pop();
        return s ? _(e, t, s) : null
    }

    function m(e) {
        return e.length > 0 ? R.eventTypes.addMessageEvent([0].concat(e)) : e
    }

    function p(e, t, n) {
        var a = o(e, t),
            i = _(e, t, n),
            s = r(e);
        return (0, x.isOut)(i) ? s.full_name : i.userId !== i.peerId ? a.data.members[i.userId] ? a.data.members[i.userId].name : !1 : a.tab
    }

    function _(e, t, n) {
        var r = o(e, t),
            a = r.msgs[n];
        return a ? m(a) : null
    }

    function h(e) {
        var t = r(e);
        return t.gid || t.isClassic
    }

    function v(e) {
        return r(e).gid
    }

    function b(e) {
        return r(e).gid
    }

    function y(e) {
        return r(e).gid
    }

    function C(e, t) {
        var n = r(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function T(e) {
        var t = r(e);
        return y(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === B.FOLDER_UNRESPOND || t.active_tab === B.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function S(e, t) {
        return e = r(e), e.tabs[t] && e.tabs[t].msgs && e.tabs[t].history ? !0 : !1
    }

    function E(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function w(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function I(e) {
        var t = r(e);
        return !t.lockedSending
    }

    function k(e) {
        return e > -2e9 && 0 > e
    }

    function P(e, t) {
        return k(t) ? !!o(e, t).blocked_community : !1
    }

    function M(e) {
        var t = r(e);
        return t.voice_message_available
    }

    function L(e) {
        var t = r(e);
        return !!A(t) || t.recentSearch
    }

    function A(e) {
        var t = r(e);
        return t.searchText
    }

    function O(e, t) {
        var n = r(e);
        return t && t !== A(e) || n.recentSearch ? !0 : !1
    }

    function D(e) {
        var t = r(e);
        return t.recentSearch
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getFirstUnread = a, t.getPeer = i, t.getTab = o, t.getSelectedMessages = s, t.getMessageRangeFromSelection = l, t.countUnread = u, t.getMessageByRid = c, t.isRidExist = d, t.getLocalId = g, t.getLastMessage = f, t.parserMessage = m, t.getAuthorFullName = p, t.getMessage = _, t.isClassicInterface = h, t.isLocksAvailable = v, t.isFoldersAvailable = b, t.isCommunityInterface = y, t.getBareTab = C, t.isReversedDialogs = T, t.isFullyLoadedTab = S, t.isGoToEndVisible = E, t.getUnreadScrollBottom = w, t.isSendingAvailable = I, t.isCommunityPeer = k, t.isCommunityBlocked = P, t.checkVoiceMessageAvailable = M, t.isSearching = L, t.getSearchText = A, t.isSearchingValue = O, t.isRecentSearchesActive = D;
    var x = n(16),
        R = n(11),
        B = n(9)
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return t ? void ls.set(e, t) : ls.get(e)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            r = extend({}, e),
            a = [];
        return t.store && (r = n(t.key) || r), {
            get: function() {
                return r
            },
            set: function(e) {
                var a = this;
                return new Promise(function(t, n) {
                    e(r).then(t)["catch"](n)
                }).then(function(e) {
                    return r = e, t.store && n(t.key, e), a
                })
            },
            setState: function(e) {
                return this.set(function(t) {
                    return t = extend(t, e), Promise.resolve(t)
                })
            },
            stash: function() {
                a.push(r), r = extend({}, e)
            },
            reset: function() {
                r = extend({}, e)
            },
            unmount: function() {
                r = {}, e = !1
            },
            pop: function() {
                a.length > 0 && (r = a.pop())
            }
        }
    }
}, function(e, t, n) {
    var r = n(57)("wks"),
        a = n(27),
        i = n(8).Symbol,
        o = "function" == typeof i;
    e.exports = function(e) {
        return r[e] || (r[e] = o && i[e] || (o ? i : a)("Symbol." + e))
    }
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, a = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.EMAIL = /([a-zA-Z\-_\.0-9]+@[a-zA-Z\-_0-9]+\.[a-zA-Z\-_\.0-9]+[a-zA-Z\-_0-9]+)/g, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|(.+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.TOP_DOMAINS = "place,camera,info,name,academy,aero,arpa,coop,media,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,рф,укр,сайт,онлайн,срб,дети,cat,pro,local", t.MESSAGE_REGEXP = /(^|[^A-Za-z0-9А-Яа-яёЁ\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9А-Яа-яёЁ](?:[A-Za-z\$0-9\-\_А-Яа-яёЁ]*[A-Za-z\$0-9А-Яа-яёЁ])?\.){1,5}[A-Za-z\$рфуконлайнстдеиРФУКОНЛАЙНСТДЕИ\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.~=;:]+|\[[A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.~=;:]*[A-Za-z0-9А-Яа-яёЁ\_#%?+\/\$~=]|\[[A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#%?+\/\$.,~=;:]*\)))?)?)/gi, t.ARROW_UP = 38),
        i = t.ARROW_DOWN = 40,
        o = t.PAGE_UP = 33,
        s = t.PAGE_DOWN = 34,
        l = t.END_KEY = 35,
        u = t.HOME = 36,
        c = t.ENTER = 13,
        d = t.ESC = 27,
        g = (t.UNPRINTABLE_KEYS = [a, i, o, s, c, d, l, u], t.UP_DOWN_CONTROLS = [o, s, i, a, u, l], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        f = t.FOLDER_ALL = "all",
        m = t.FOLDER_UNRESPOND = "unrespond",
        p = t.FOLDER_IMPORTANT = "important";
    t.FOLDERS = [f, g, m, p], t.FOLDER_MASKS = (r = {}, n(r, m, 2), n(r, p, 1), r)
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = [],
            r = 0;
        return function(a) {
            n.push(a), r || (r = setTimeout(function() {
                r = !1, e(n), n = []
            }, t))
        }
    }

    function r(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function a(e, t) {
        var n, r;
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
                var a = new Date;
                console.debug("%cLP:[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n)
            } catch (i) {}
        }
    }

    function i(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function o(e) {
        for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = n, t.executionStackPop = r, t.lplog = a, t.toArray = i, t.arrayUnique = o
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e) {
        var t = e.updates;
        return t.map(function(e) {
            switch (e[0]) {
                case 0:
                    return C.deleteEvent(e);
                case 1:
                    return C.replaceFlagsEvent(e);
                case 2:
                    return C.setFlagsEvent(e);
                case 3:
                    return C.resetFlagsEvent(e);
                case 4:
                    return C.addMessageEvent(e);
                case 6:
                    return C.readInboundEvent(e);
                case 7:
                    return C.readOutboundEvent(e);
                case 8:
                    return C.gotOnlineEvent(e);
                case 9:
                    return C.gotOfflineEvent(e);
                case 10:
                    return C.resetDirectoriesEvent(e);
                case 11:
                    return C.replaceDirectoriesEvent(e);
                case 12:
                    return C.setDirectoriesEvent(e);
                case 51:
                    return C.chatChangedEvent(e);
                case 61:
                    return C.typingUserEvent(e);
                case 62:
                    return C.typingChatEvent(e);
                case 70:
                    return C.videoCallEvent(e);
                case 80:
                    return C.unreadCountEvent(e);
                case 114:
                    return C.notifySettingsChangedEvent(e);
                case -1:
                    return C.resyncEvent();
                default:
                    return C.emptyEvent(e)
            }
        })
    }

    function o(e, t) {
        return Promise.resolve(extend({}, t, {
            timeout: 64 > e ? 2 * e : e
        }))
    }

    function s(e, t) {
        return Promise.resolve(extend({}, t, {
            imTs: e
        }))
    }

    function l(e) {
        e.set(function(e) {
            return Promise.resolve(extend({}, e, {
                stopped: !0
            }))
        }).then(function() {
            e.get().cancelToken()
        })
    }

    function u(e, t) {
        return t.cancelToken = e, Promise.resolve(t)
    }

    function c(e, t) {
        return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
    }

    function d(e) {
        return e.pauses || (e.pauses = []), (0, E.lplog)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
            return e()
        }), e.pauses = [], Promise.resolve(e)
    }

    function g(e, t, n, r) {
        if (r.failed) var a = (0, T.abortablePause)(I, e),
            i = a.abort,
            o = a.pause;
        switch (r.failed) {
            case 1:
                return (0, E.lplog)("Old timestamp, init resync", "error"), e.set(c.bind(null, i)), n([C.resyncEvent()]), e.set(_.loadLongPollTs).then(o).then(f.bind(null, e, t, n));
            case 2:
                return (0, E.lplog)("Key is incorrect", "error"), e.set(c.bind(null, i)), e.set(_.loadLongPollKey).then(o).then(f.bind(null, e, t, n));
            case 3:
                throw nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return e.set(s.bind(null, r.ts)).then(function() {
                    return r
                })
        }
    }

    function f(e, t, n) {
        if (e.get().stopped) return Promise.resolve({
            updates: []
        });
        if (t()) return Promise.reject(new Error("pause"));
        var r = e.get(),
            a = r.imUrl + "/" + r.imPart,
            i = (0, b.plaingetCancelable)(a, {
                act: "a_check",
                key: r.imKey,
                version: 1,
                ts: r.imTs,
                wait: 25,
                mode: r.mode
            }),
            s = i.request,
            l = i.cancel;
        return e.set(u.bind(null, l)).then(function() {
            return s
        }).then(function(t) {
            return e.set(o.bind(null, 1)), JSON.parse(t)
        }).then(g.bind(null, e, t, n))
    }

    function m(e, t, n) {
        e.get().stopped || ((0, E.lplog)("New request"), f(e, n, t).then(i).then(function(e) {
            return (0, E.lplog)("Request success", "success"), e
        }).then(t)["catch"](function(t) {
            return e.get().stopped ? void(0, E.lplog)("Stopped longpoll") : ("pause" !== t.message && topError(t), (0, E.lplog)("Error, waiting: " + (t.message || "no message (probably browser reset)"), "error"), e.set(o.bind(null, n() ? I / 2 : e.get().timeout)).then(function() {
                var t = (0, T.abortablePause)(e.get().timeout, e),
                    n = t.abort,
                    r = t.pause;
                return e.set(c.bind(null, n)).then(r)
            }))
        }).then(m.bind(null, e, t, n)))
    }

    function p(e) {
        var t = e.id,
            n = e.gid,
            r = e.key,
            a = e.ts,
            i = e.url,
            o = e.lhost,
            s = "main",
            u = new EventEmitter,
            c = (0, S.initQueue)(function(e, t) {
                return u.trigger("data", t), Promise.resolve({})
            }),
            g = c.pause,
            f = c.resume,
            p = c.pushMessage,
            _ = c.isPaused,
            h = c.reset,
            b = (0, v["default"])({
                id: t,
                gid: n,
                mode: w,
                timeout: 1,
                imKey: r,
                imTs: a,
                imPart: i,
                imUrl: o,
                pause: !1
            });
        return m(b, p.bind(null, s), _.bind(null, s)), {
            on: u.on.bind(u),
            off: u.off.bind(u),
            abortPauses: function() {
                return b.set(d)
            },
            stop: l.bind(null, b),
            pause: g.bind(null, s),
            resume: f.bind(null, s),
            reset: h.bind(null, s),
            push: function(e) {
                return u.trigger("data", e)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.eventTypes = void 0, t.startLongPoll = p;
    var _ = n(1),
        h = n(6),
        v = a(h),
        b = n(43),
        y = n(4),
        C = r(y),
        T = n(20),
        S = n(41),
        E = n(10),
        w = (t.eventTypes = C, 202),
        I = 4
}, function(e, t, n) {
    e.exports = !n(25)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    var r = n(18),
        a = n(32);
    e.exports = n(12) ? function(e, t, n) {
        return r.f(e, t, a(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return !!(e.flags & u.eventTypes.FLAG_UNREAD)
    }

    function a(e) {
        return e.flags & u.eventTypes.FLAG_OUTBOUND
    }

    function i(e) {
        var t = e.attaches[0];
        return t && "doc" === t.type && "graffiti" === t.kind
    }

    function o(e) {
        var t = e.attaches[0];
        return t && "gift" === t.type
    }

    function s(e) {
        return e.flags & u.eventTypes.FLAG_IMPORTANT
    }

    function l(e) {
        return a(e) ? vk.id : e.userId
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = r, t.isOut = a, t.isGraffiti = i, t.isGift = o, t.isImportant = s, t.getUserId = l;
    var u = n(11)
}, function(e, t, n) {
    var r = n(15);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    var r = n(17),
        a = n(52),
        i = n(59),
        o = Object.defineProperty;
    t.f = n(12) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), a) try {
            return o(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t, n) {
    var r = n(8),
        a = n(14),
        i = n(13),
        o = n(27)("src"),
        s = "toString",
        l = Function[s],
        u = ("" + l).split(s);
    n(22).inspectSource = function(e) {
        return l.call(e)
    }, (e.exports = function(e, t, n, s) {
        var l = "function" == typeof n;
        l && (i(n, "name") || a(n, "name", t)), e[t] !== n && (l && (i(n, o) || a(n, o, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : a(e, t, n) : (delete e[t], a(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || l.call(this)
    })
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function r(e, t) {
        var r = arguments.length <= 2 || void 0 === arguments[2] ? null : arguments[2],
            a = 0;
        return function i() {
            for (var o = arguments.length, s = Array(o), l = 0; o > l; l++) s[l] = arguments[l];
            return Promise.resolve().then(function() {
                return e.apply(void 0, s)
            })["catch"](function(e) {
                if (a++, t >= a) {
                    var o = "function" == typeof r ? r(a) : 0;
                    return 0 === o ? i.apply(void 0, s) : n(o).then(function() {
                        return i.apply(void 0, s)
                    })
                }
                throw e
            })
        }
    }

    function a(e, t, n) {
        var r = void 0,
            a = void 0;
        return function() {
            for (var i = arguments.length, o = Array(i), s = 0; i > s; s++) o[s] = arguments[s];
            return new Promise(function(e, i) {
                var s = function() {
                        r = null, a = null, n || e(o)
                    },
                    l = n && !r;
                clearTimeout(r), a && a.reject("debounce"), r = setTimeout(s, t), l ? e(o) : n && i("debounce"), a = {
                    resolve: e,
                    reject: i
                }
            }).then(function(t) {
                return e.apply(void 0, t)
            })
        }
    }

    function i(e, t) {
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
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.pause = n, t.retryFn = r, t.debouncedPromise = a, t.abortablePause = i
}, function(e, t) {
    e.exports = {}
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    var r = n(85);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, a) {
                    return e.call(t, n, r, a)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, n) {
    var r = n(92),
        a = n(24);
    e.exports = function(e) {
        return r(a(e))
    }
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        return "im_store_" + e
    }

    function r(e) {
        return ls.get(n(e)) || {}
    }

    function a(e, t, r) {
        if (ls.checkVersion()) {
            var a = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), r(n(e), a)
        }
    }

    function i(e, t, n) {
        if (t === m) return e[t] || [];
        if (e[t]) {
            var r = extend(!0, {}, e[t][n]);
            if (t == g) return r.txt = clean(r.txt), r
        }
        return null
    }

    function o(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case d:
                var r = c(n, 2),
                    a = r[0],
                    i = r[1];
                i && i.length ? e[t][a] = i : e[t][a] && delete e[t][a];
                break;
            case g:
                var o = c(n, 2),
                    s = o[0],
                    l = o[1];
                l && (l.txt || l.medias && l.medias.length) ? e[t][s] = l : e[t][s] && delete e[t][s];
                break;
            case m:
                var u = n;
                u && u.length > 0 ? e[t] = u : delete e[t];
                break;
            case f:
                var p = c(n, 2),
                    _ = p[0],
                    h = p[1];
                h && !isEmpty(h) ? e[t][_] = h : e[t][_] && delete e[t][_]
        }
        return e
    }

    function s(e, t) {
        var n = ["peerFwd_", "im_draft", "bind_to_url_store_"],
            i = n.length;
        if (ls.checkVersion()) {
            var s = r(e);
            Object.keys(localStorage).reduce(function(e, t) {
                for (var r = 0; i > r; r++)
                    if (t.substr(0, n[r].length) === n[r]) return e.concat([
                        [n[r]].concat(t.substr(n[r].length).split("_"))
                    ]);
                return e
            }, []).forEach(function(t) {
                var n = c(t, 3),
                    r = n[0],
                    a = n[1],
                    i = n[2];
                switch (r) {
                    case "peerFwd_":
                        if (intval(a) === e) {
                            var l = "peerFwd_" + e + "_" + i,
                                u = ls.get(l);
                            s = o(s, d, [i, u]), ls.remove(l)
                        }
                        break;
                    case "im_draft":
                        if (intval(a) === e) {
                            var m = "im_draft" + e + "_" + i,
                                p = ls.get(m);
                            s = o(s, g, [i, p]), ls.remove(m)
                        }
                        break;
                    case "bind_to_url_store_":
                        var _ = "bind_to_url_store_" + a,
                            h = ls.get(_);
                        s = o(s, f, [a, h]), ls.remove(_)
                }
            }), a(e, s, t)
        }
    }

    function l(e, t, r) {
        r.key === n(e) && (t.db = JSON.parse(r.newValue), t.checkTime = Date.now())
    }

    function u(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        s(e, t);
        var n = {
                db: r(e),
                checkTime: Date.now()
            },
            u = l.bind(null, e, n);
        return window.addEventListener("storage", u, !1), {
            select: function(t, a) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), i(n.db, t, a)
            },
            update: function(r, i) {
                var s = o(n.db, r, i);
                return n.db = s, n.checkTime = Date.now(), a(e, s, t)
            },
            unmount: function() {
                window.removeEventListener("storage", u, !1)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.migrateLocalstorage = s, t.mount = u;
    var d = t.FWD_STORE_OP = "fwd",
        g = t.DRAFT_STORE_OP = "draft",
        f = t.ATTACH_STORE_OP = "bind_attach",
        m = t.RECENT_SEARCH_OP = "recent_search"
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t) {
        return (0, M.toArray)(e).find(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function i(e, t) {
        return (0, M.toArray)(e).findIndex(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function o(e, t, n, r) {
        n && ! function() {
            s(e, t, r);
            var i = domData(n, "list-id"),
                o = i && a(t.children, i);
            o && r.forEach(function(e) {
                return addClass(o, e)
            }), e.setState({
                hoveredListItemId: i
            })
        }()
    }

    function s(e, t, n) {
        var r = domQuery("." + n.join("."), t);
        r && (0, M.toArray)(r).forEach(function(e) {
            n.forEach(function(t) {
                return removeClass(e, t)
            })
        }), e.setState({
            hoveredListItemId: null
        })
    }

    function l(e, t) {
        var n = t && domQuery("." + t.join("."), e)[0];
        return n ? domData(n, "list-id") : null
    }

    function u(e, t, n) {
        return e.map(t).reduce(function(e, t) {
            return e[t] = !0, e
        }, n)
    }

    function c(e, t, n) {
        var r = e.filter(function(e) {
            return !n.ids[t(e)]
        });
        return {
            _sortedEls: !1,
            els: r,
            ids: u(r, t, n.ids),
            elements: n.elements.concat(r)
        }
    }

    function d(e, t, n) {
        return {
            ids: u(n.get().elements, e, {}),
            scrolls: t,
            activated: !0
        }
    }

    function g(e, t, n) {
        return n.elements = n.elements.filter(function(n) {
            return t(n) !== e
        }), delete n.ids[e], Promise.resolve(n)
    }

    function f(e, t, n) {
        var r = [];
        n.elements = n.elements.map(function(n) {
            var a = t(n),
                i = e.filter(function(e) {
                    return t(e) === a
                })[0];
            return r.push(a), i || n
        });
        var a = e.filter(function(e) {
            return !inArray(t(e), r)
        });
        return n.elements = n.elements.concat(a), Promise.resolve(n)
    }

    function m(e, t) {
        var n = t.get();
        return !n._sortedEls && e && t.setState({
            elements: n.elements.sort(e),
            _sortedEls: !0
        }), t.get().elements
    }

    function p(e) {
        var t = {};
        return e.forEach(function(e) {
            "r" === e[0] && t["a," + e[1]] ? delete t["a," + e[1]] : t[e[0] + "," + e[1]] = e
        }), Object.keys(t).map(function(e) {
            return t[e]
        })
    }

    function _(e, t) {
        for (var n = [], r = Math.max(e.length, t.length), a = 0; r > a; a++) {
            var i = e[a],
                o = t[a];
            !i && o ? n.push(["a", o, a]) : i && !o ? n.push(["r", i, a]) : i !== o && (n.push(["r", i, a]), n.push(["a", o, a]))
        }
        var s = p(n),
            l = p(n.reverse());
        return s.length > l.length ? l : s
    }

    function h(e, t, n, r, a, i) {
        for (var o = 0; r > o; o++) e = domNS(e);
        var s = se(a(t));
        return domData(s, "list-id", n), e ? i.insertBefore(s, e) : i.appendChild(s), e
    }

    function v(e, t, n, r) {
        if (0 !== t.length) {
            t = t.sort(function(e, t) {
                return e[2] - t[2]
            });
            var a = t.filter(function(e) {
                    return "a" === e[0]
                }),
                i = t.filter(function(e) {
                    return "r" === e[0]
                });
            if (i.map(function(t) {
                    return e.children[t[2]];
                }).forEach(function(e) {
                    return re(e)
                }), 0 !== a.length)
                for (var o = a.shift(), s = o[2], l = h(e.children[s], n[o[2]], o[1], 0, r, e), u = 0; u < a.length; u++) o = a[u], l = h(e.children[s], n[o[2]], o[1], o[2] - s, r, e), s = o[2]
        }
    }

    function b(e, t) {
        e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
    }

    function y(e, t, n, r, a) {
        var i = r.get(),
            o = i.limit,
            s = i.offset,
            l = n().sortFn,
            u = m(l, r).slice(0, s + o),
            c = (0, M.toArray)(e.children).map(function(e) {
                return domData(e, "list-id")
            }).filter(function(e) {
                return !!e
            }),
            d = u.map(function(e) {
                return n().idFn(e).toString()
            }),
            g = _(c, d);
        return v(e, g, u, n().renderFn), b(r, t), a ? g.filter(function(e) {
            return "a" == e[0]
        }).map(function(e) {
            return parseInt(e[1])
        }) : void 0
    }

    function C(e, t, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
            a = arguments.length <= 4 || void 0 === arguments[4] ? 0 : arguments[4],
            o = arguments.length <= 5 || void 0 === arguments[5] ? 0 : arguments[5],
            s = e.get(),
            l = t.getContainer().children,
            u = i(l, n || s.hoveredListItemId);
        if (!(0 > u)) {
            var c;
            c = s.limit + s.offset < u ? e.setState({
                offset: u - s.limit + 1
            }).then(y.bind(null, t.getContainer(), t, parentMutations)) : Promise.resolve(), c.then(function() {
                var e = l[u],
                    n = t.scrollTop(),
                    i = t.getScrollHeight(),
                    s = e.offsetHeight;
                a = "center" === a ? -.5 * t.getScrollHeight() : a, o = "center" === o ? i / 2 : o;
                var c = r ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    d = n + a > e.offsetTop,
                    g = s + e.offsetTop > n + i - o;
                d ? c(e.offsetTop - a) : g && c(e.offsetTop - i + s + o)
            })
        }
    }

    function T(e, t) {
        if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
        Math.random(), e.get().loading = !0;
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2; n > a; a++) r[a - 2] = arguments[a];
        return t.apply(void 0, r).then(function(t) {
            e.get().loading = !1
        })
    }

    function S(e, t, n) {
        return n.scrolls || (n.scrolls = {}), (!n.scrolls[e] || t) && (n.scrolls[e] = {
            scrolled: n.scrolled || 0,
            scrollItem: n.scrollItem
        }), Promise.resolve(n)
    }

    function E(e, t, n, r) {
        var a = e.get(),
            i = a.elements,
            o = r.getContainer(),
            s = e.setState({
                offset: a.offset + a.limit
            }).then(function(n) {
                var s, l = a.offset,
                    u = a.limit;
                return u + l > i.length ? s = t().more(l, u).then(function(t) {
                    return t === !1 ? [] : (0 === t.length && e.setState({
                        stop: !0
                    }), t)
                }).then(I.bind(null, e, o, r, t, a.pipeId)) : (s = Promise.resolve(), y(o, r, t, e)), s
            });
        return n || (0, P.wrapLoading)(o)(s, "bottom", "im-preloader_fixed-bottom"), s
    }

    function w(e, t) {
        var n = e.get().pipeId;
        return !("undefined" != typeof n && "undefined" != typeof t && n !== t)
    }

    function I(e, t, n, r, a, i) {
        return w(e, a) ? e.setState(c(i, r().idFn, e.get())).then(y.bind(null, t, n, r)) : !1
    }

    function k(e, t, n) {
        var c = T.bind(null, t, E.bind(null, t, n)),
            m = function(e, r) {
                (t.get().activated || e) && ("undefined" != typeof r && t.get().elements.length > 0 && t.setState({
                    scrolled: r
                }), n().onScroll && n().onScroll())
            },
            p = (0, L.createScroll)(e, {
                noScroll: t.get().noScroll,
                nativeScroll: t.get().nativeScroll,
                scrollChange: m.bind(null, !1),
                more: n().more ? c.bind(null, !1) : !1
            }),
            _ = (0, A.createModule)({
                handlers: function(r, a) {
                    a(e, "click", t.get().elCls, n().onClick)
                }
            });
        return t.setState(d(n().idFn, {}, t)), {
            pipe: function(e, r) {
                return t.setState({
                    pipeId: r
                }), e.then(I.bind(null, t, p.getContainer(), p, n, r))
            },
            replacePreserveOrder: function(e) {
                return t.set(f.bind(null, e, n().idFn)).then(y.bind(null, p.getContainer(), p, n))
            },
            pipeReplace: function(e, r) {
                var a = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];
                return t.setState({
                    pipeId: r,
                    stop: !1
                }), e.then(function(e) {
                    return w(t, r) ? t.setState({
                        elements: e,
                        _sortedEls: !1,
                        ids: u(e, n().idFn, {})
                    }).then(y.bind(null, p.getContainer(), p, n, t, a)) : void 0
                })
            },
            wipe: function() {
                p.getContainer().innerHTML = ""
            },
            deactivate: function() {
                t.setState({
                    activated: !1
                })
            },
            activate: function() {
                t.setState({
                    activated: !0
                })
            },
            saveScroll: function(e, n) {
                return t.set(S.bind(null, e, n))
            },
            updateScroll: function() {
                p.update(!1, !0)
            },
            toTop: function(e) {
                p.scrollTop(0), e && m(e, 0)
            },
            scrollTop: function(e) {
                return p.scrollTop(e)
            },
            restoreScroll: function(e) {
                var n = t.get().scrolls,
                    a = n[e];
                return a && (t.setState({
                    scrolls: extend({}, n, r({}, e, null))
                }), p.scrollTop(a.scrolled)), !!a
            },
            unsetScroll: function(e) {
                t.setState({
                    scrolls: extend({}, t.get().scrolls, r({}, e, null))
                })
            },
            scrollPage: function(e, t) {
                var n = p.scroll.scroller,
                    r = p.scrollTop(),
                    a = "up" === e ? -1 : 1,
                    i = r + a * n.clientHeight;
                t ? p.smoothScroll(i - r) : p.scrollTop(i)
            },
            scrollToElement: function(e, n, r, a) {
                C(t, p, e, n, r, a)
            },
            checkMore: function(e) {
                return t.get().elements.length < t.get().limit ? c(e, p) : Promise.resolve([])
            },
            add: function(e, r) {
                return I(t, p.getContainer(), p, n, r, e)
            },
            hoverNextElement: function(e, r) {
                var a = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                    s = p.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    g = (0, M.toArray)(u).slice(d + 1).find(n().hoverableFn);
                o(t, s, g, e), C(t, p, null, !1, a.top, a.bottom)
            },
            hoverPrevElement: function(e, r) {
                var a = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                    s = p.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    g = d >= 0 && (0, M.toArray)(u).slice(0, d).reverse().find(n().hoverableFn);
                o(t, s, g, e), C(t, p, null, !1, a.top, a.bottom)
            },
            hoverFirstElement: function(e, r) {
                var a = p.getContainer(),
                    i = a.children,
                    s = (0, M.toArray)(i).findIndex(n().hoverableFn),
                    l = i[s];
                !t.get().hoveredListItemId && l && (o(t, a, l, e), C(t, p, s, !1, r.top, r.bottom))
            },
            hoverElement: function(e, n, r) {
                var a = p.getContainer(),
                    s = a.children,
                    l = i(s, e),
                    u = s[l];
                u && (o(t, a, u, n), C(t, p, l, !1, r.top, r.bottom))
            },
            unhoverElements: function(e) {
                s(t, p.getContainer(), e)
            },
            reset: function() {
                var e = t.get().scrolls;
                t.reset(), t.setState(d(n().idFn, e, t))
            },
            getHoveredElement: function() {
                return a(p.getContainer().children, t.get().hoveredListItemId)
            },
            getCurrentElements: function() {
                return t.get().elements
            },
            isLoading: function() {
                return t.get().loading
            },
            isEmpty: function() {
                return 0 === t.get().elements.length
            },
            remove: function(e) {
                t.set(g.bind(null, e, n().idFn)).then(y.bind(null, p.getContainer(), p, n))
            },
            unmount: function() {
                (0, A.destroyModule)(_), p.destroy()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createIdMap = u, t.addElements = c, t.collapseOps = p, t.distance = _, t.mount = k;
    var P = n(3),
        M = n(10),
        L = n(30),
        A = n(2)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        return bodyNode[e] || document.documentElement[e]
    }

    function i(e, t, n) {
        "scrollTop" === e && window.scrollTo(0, t)
    }

    function o(e, t) {
        return t.noScroll ? new c(e) : t.nativeScroll ? new l(e, t) : new u(e, t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getNativeOption = a, t.setNativeOption = i, t.createScroll = o;
    var s = n(2),
        l = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.el = t, this.opts = n, this.module = (0, s.createModule)({
                    handlers: function(e, t) {
                        e(window, "scroll", a.onScroll.bind(a)), e(window, "resize", a.resize.bind(a))
                    }
                }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
            }
            return e.prototype.update = function() {}, e.prototype.resize = function() {
                this.innerHeight = window.innerHeight
            }, e.prototype.scrollTop = function(e) {
                return "undefined" == typeof e ? a("scrollTop", this.el) : void i("scrollTop", e, this.el)
            }, e.prototype.contHeight = function() {
                return a("scrollHeight")
            }, e.prototype.smoothScroll = function(e) {
                scrollToY(e + this.scrollTop(), 300)
            }, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollBottom = function(e) {
                if ("undefined" == typeof e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }, e.prototype.onScroll = function(e) {
                var t = this.scrollTop(),
                    n = t - this.prevScroll,
                    r = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }, e.prototype.getScrollHeight = function() {
                return this.innerHeight
            }, e.prototype.destroy = function() {
                (0, s.destroyModule)(this.module)
            }, e
        }(),
        u = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.prevTop = 0, this.scroll = new uiScroll(t, {
                    hidden: !0,
                    shadows: n.shadows,
                    stopScrollPropagation: !1,
                    theme: n.scrollTheme,
                    onmore: function() {
                        return n.more && n.more(a)
                    },
                    onscroll: function(e) {
                        var t = a.scrollTop(),
                            r = a.prevTop - t;
                        a.prevTop = t, n.scrollChange && n.scrollChange(t), n.onScroll && n.onScroll(r, a)
                    }
                })
            }
            return e.prototype.update = function() {
                this.scroll.update("sync")
            }, e.prototype.scrollTop = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
            }, e.prototype.getContainer = function() {
                return this.scroll.content
            }, e.prototype.contHeight = function() {
                return this.scroll.data.scrollHeight
            }, e.prototype.smoothScroll = function(e) {
                this.scroll.scrollTop(this.scrollTop() + e, 300)
            }, e.prototype.scrollBottom = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
            }, e.prototype.getScrollHeight = function() {
                return this.scroll.data.viewportHeight
            }, e.prototype.destroy = function() {
                this.scroll.destroy()
            }, e
        }(),
        c = function() {
            function e(t, n) {
                r(this, e), this.el = t
            }
            return e.prototype.update = function() {}, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollTop = function(e) {
                return 0
            }, e.prototype.contHeight = function() {
                return 0
            }, e.prototype.smoothScroll = function(e) {}, e.prototype.scrollBottom = function(e) {
                return 0
            }, e.prototype.getScrollHeight = function() {
                return 0
            }, e.prototype.destroy = function() {}, e
        }()
}, function(e, t, n) {
    "use strict";
    var r = n(97),
        a = n(50),
        i = n(19),
        o = n(14),
        s = n(13),
        l = n(21),
        u = n(95),
        c = n(33),
        d = n(100),
        g = n(7)("iterator"),
        f = !([].keys && "next" in [].keys()),
        m = "@@iterator",
        p = "keys",
        _ = "values",
        h = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, C) {
        u(n, t, v);
        var T, S, E, w = function(e) {
                if (!f && e in M) return M[e];
                switch (e) {
                    case p:
                        return function() {
                            return new n(this, e)
                        };
                    case _:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            I = t + " Iterator",
            k = b == _,
            P = !1,
            M = e.prototype,
            L = M[g] || M[m] || b && M[b],
            A = L || w(b),
            O = b ? k ? w("entries") : A : void 0,
            D = "Array" == t ? M.entries || L : L;
        if (D && (E = d(D.call(new e)), E !== Object.prototype && (c(E, I, !0), r || s(E, g) || o(E, g, h))), k && L && L.name !== _ && (P = !0, A = function() {
                return L.call(this)
            }), r && !C || !f && !P && M[g] || o(M, g, A), l[t] = A, l[I] = h, b)
            if (T = {
                    values: k ? A : w(_),
                    keys: y ? A : w(p),
                    entries: O
                }, C)
                for (S in T) S in M || i(M, S, T[S]);
            else a(a.P + a.F * (f || P), t, T);
        return T
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, n) {
    var r = n(18).f,
        a = n(13),
        i = n(7)("toStringTag");
    e.exports = function(e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    var r = n(57)("keys"),
        a = n(27);
    e.exports = function(e) {
        return r[e] || (r[e] = a(e))
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, d.wrapLoading)(i)((0, l.loadImportant)(e.offset).then(function(t) {
                    var n = s(t, 4),
                        a = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(l.mergeTabs.bind(null, (0, d.tabFromIds)(o.msgs, o.hash)));
                    var u = ce("div");
                    u.innerHTML = a, i.appendChild(u)
                }), "bottom")
            }
        }
    }

    function i(e, t, n) {
        for (var r = arguments.length, a = Array(r > 3 ? r - 3 : 0), i = 3; r > i; i++) a[i - 3] = arguments[i];
        a.filter(function(e) {
            return inArray(e.type, [p.SET_FLAGS, p.RESET_FLAGS, p.CHANGE_PEER])
        }).forEach(function(r) {
            if (r.type === p.CHANGE_PEER) return void n.hide();
            if (r.flags === p.FLAG_IMPORTANT) {
                var a = r.type === p.SET_FLAGS;
                e.set(l.updateFavMessage.bind(null, [r.messageId], 0, a)).then(function(n) {
                    t.markImportant(r.messageId, a, e)
                })
            }
        })
    }

    function o(e, t, n, r) {
        var o = ge("box_layer_wrap"),
            s = t.get().longpoll,
            l = (0, f["default"])({
                peer: 0,
                longpoll: s,
                tabs: (0, d.tabFromIds)(r.msgs, r.hash)
            }),
            g = (0, c.mount)(e.bodyNode, l, function() {
                return {}
            }),
            p = (0, u.mount)(e.bodyNode, t),
            _ = i.bind(null, t, g, e);
        s.on("data", _);
        var h = a.bind(null, {
                all: !1,
                loading: r.all,
                offset: r.offset
            }, e, o, l),
            v = (0, m.createModule)({
                handlers: function(e, t) {
                    e(o, "scroll", h)
                }
            });
        return {
            unmount: function() {
                (0, m.destroyModule)(v), p.unmount(), g.unmount(), s.off("data", _)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.mount = o;
    var l = n(1),
        u = n(37),
        c = n(40),
        d = n(3),
        g = n(6),
        f = r(g),
        m = n(2),
        p = n(4)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = intval(domData(n, "msgid"));
        if (!getSelectionText() && !(0, u.checkSelectClick)(t)) {
            var a = intval(domData(n, "peer"));
            return e.get().longpoll.push([(0, c.changePeer)(a, r)]), !1
        }
    }

    function a(e) {
        return (0, l.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : (0, l.searchMessagesInplace)(e.get().peer, e.get())
    }

    function i(e, t) {
        return {
            isAll: function(e) {
                return (0, l.isSearchAllLoaded)(e.get().peer, e.get())
            },
            loadMore: function(e) {
                return a(e)
            },
            unmount: function() {
                (0, s.destroyModule)(t)
            }
        }
    }

    function o(e, t) {
        var n = r.bind(null, t),
            a = (0, s.createModule)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            });
        return i(e, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = o;
    var s = n(2),
        l = n(1),
        u = n(3),
        c = n(4)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        stopEvent(e)
    }

    function a() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function i(e, t, n, r, i) {
        if (!(0, c.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(i, u.FAILED_CLASS) || hasClass(i, u.SENDING_CLASS) || hasClass(i, "_im_mess_srv") || (0, u.checkSelectClick)(r, i) || "A" === r.target.tagName)) {
            var o = intval(domData(i, "msgid")),
                s = e.get().peer,
                l = e.get().tabs[s].deleted || [];
            if (!inArray(o, l)) {
                var g = void 0;
                g = r.shiftKey ? (0, d.getMessageRangeFromSelection)(e, e.get().peer, o) : [o], e.set(c.addSelection.bind(null, g)).then(function() {
                    var r = (0, d.getSelectedMessages)(e),
                        i = !1;
                    g.forEach(function(e) {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var a = inArray(e, r);
                            i |= a, toggleClass(t, "im-mess_selected", a);
                            var o = void 0;
                            o = a ? getLang("mail_deselect_message") : getLang("mail_select_message");
                            var s = geByClass1("_im_mess_blind_label_select", t);
                            attr(s, "aria-label", o)
                        }
                    }), i && a(), t().changedMessageSelection(e)
                })
            }
        }
    }

    function o(e, t) {
        return {
            cleanSelection: function(t) {
                t.map(function(t) {
                    return geByClass1("_im_mess_" + t, e)
                }).filter(function(e) {
                    return e
                }).forEach(function(e) {
                    return removeClass(e, "im-mess_selected")
                })
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function s(e, t, n) {
        var a = i.bind(null, t, n, e),
            s = (0, l.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_mess", a), n(e, "click", "_im_mess_stack", r)
                }
            });
        return o(e, s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = s;
    var l = n(2),
        u = n(3),
        c = n(1),
        d = n(5)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, _.wrapLoading)(i)((0, p.loadSpam)(e.offset, r.get().gid).then(function(t) {
                    var n = m(t, 4),
                        a = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(p.mergeTabs.bind(null, (0, _.tabFromIds)(o.msgs, o.hash)));
                    var s = ce("div");
                    s.innerHTML = a, i.appendChild(s)
                }), "bottom")
            }
        }
    }

    function i(e, t) {
        var n = t.get().selectedMessages,
            r = geByClass1("_im_spam_box", e.bodyNode),
            a = geByClass1("ui_tab_sel", e.bodyNode);
        if (n.length > 0) {
            var i = getLang("mail_selected", n.length);
            i = i.replace("{count}", n.length), val(a, i + (0, _.selectionRemove)())
        } else val(a, getLang("mail_spam"));
        0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(T), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(S), getLang("mail_im_mark_delspam", n.length)))
    }

    function o(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(p.cleanSelected).then(n.cleanSelection.bind(null, r)).then(function(n) {
            return i(t, e)
        })
    }

    function s(e, t, n, r) {
        var a = gpeByClass("_im_mess", r, t);
        if (a) {
            var i = intval(domData(a, "msgid"));
            a && ((0, p.removeMessageSend)([i], 0, e.get().tabs[0].hash, "undel", e.get().gid), (0, _.restoreMessage)(i, 0, t))
        }
    }

    function l(e, t, n) {
        var r = e.get().selectedMessages;
        (0, p.removeMessageSend)(r, 0, e.get().tabs[0].hash, "delete", e.get().gid), (0, _.removeMessagesWithRestore)(r, 0, "delete", t), o(e, t, n)
    }

    function u(e, t, n) {
        var r = e.get().selectedMessages;
        (0, p.removeMessageSend)(r, 0, e.get().tabs[0].hash, "nospam", e.get().gid), r.map(function(e) {
            return geByClass1("_im_mess_" + e)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            var t = intval(domData(e, "peer")),
                n = intval(domData(e, "msgid"));
            val(e, (0, _.renderGoTo)(t, n)), addClass(e, "im-mess_light")
        }), o(e, t, n)
    }

    function c(e, t, n, r, a) {
        var i = gpeByClass("_im_mess", a, t.bodyNode),
            o = intval(domData(i, "peer")),
            s = intval(domData(i, "msgid"));
        return t.hide(), n().unmount(), e.get().longpoll.push([(0, C.changePeer)(o, s)]), stopEvent(r), cancelEvent(r), !1
    }

    function d(e, t, n, r) {
        var a = showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function(i) {
            (0, p.flushSpam)(e, r).then(function(e) {
                var t = m(e, 2),
                    n = (t[0], t[1]);
                showDoneBox(n)
            }), a.hide(), t.hide(), n().unmount()
        }, getLang("mail_close"), function(e) {
            a.hide()
        })
    }

    function g(e, t) {
        return {
            unmount: function() {
                t.unmount(), (0, h.destroyModule)(e)
            }
        }
    }

    function f(e, t, n) {
        var r = ge("box_layer_wrap"),
            f = (0, h.createMutations)(g),
            m = f.callMutations,
            p = f.bindMutations,
            b = (0, y["default"])({
                peer: 0,
                tabs: (0, _.tabFromIds)(n.msgs, n.hash),
                gid: t.get().gid
            }),
            C = a.bind(null, {
                all: n.all,
                loading: !1,
                offset: n.offset
            }, e, r, b),
            E = s.bind(null, b, e.bodyNode),
            w = c.bind(null, t, e, m),
            I = d.bind(null, n.hash, e, m, t.get().gid),
            k = (0, v.mount)(e.bodyNode, b, function(t) {
                return {
                    changedMessageSelection: i.bind(null, e)
                }
            }),
            P = l.bind(null, b, e.bodyNode, k),
            M = u.bind(null, b, e.bodyNode, k),
            L = o.bind(null, b, e, k),
            A = (0, h.createModule)({
                handlers: function(t, n) {
                    t(r, "scroll", C), t(geByClass1(S, e.bodyNode), "click", P), t(geByClass1(T, e.bodyNode), "click", M), t(geByClass1("_im_spam_flush", e.bodyNode), "click", I), n(e.bodyNode, "click", "_im_mess_restore", E), n(e.bodyNode, "click", "_im_go_to", w), n(e.bodyNode, "click", _.DESELECT_ALL_CLASS, L)
                }
            });
        return p(A, k)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var m = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.mount = f;
    var p = n(1),
        _ = n(3),
        h = n(2),
        v = n(38),
        b = n(6),
        y = r(b),
        C = n(4),
        T = "_im_spam_not_spam",
        S = "_im_spam_spam"
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = gpeByClass("_im_mess", n),
            i = intval(domData(r, "msgid")),
            o = e.get().peer,
            l = (0, c.getMessage)(e, o, i),
            d = !(0, u.isImportant)(l);
        return e.get().longpoll.push([{
            peerId: o,
            messageId: i,
            type: d ? g.SET_FLAGS : g.RESET_FLAGS,
            flags: g.FLAG_IMPORTANT
        }]), e.set(s.favMessage.bind(null, [i], d, o)), a(e, -10, t, n), !1
    }

    function a(e, t, n, r) {
        var a = getLang("mail_im_toggle_important").length > 10;
        return showTooltip(r, {
            shift: [a ? 75 : 40, 10],
            black: 1,
            className: "_im_history_tooltip " + (a ? "im-star-tt_long" : "im-star-tt"),
            appendParentCls: "_im_mess_stack",
            text: function() {
                var t = gpeByClass("_im_mess", r),
                    n = intval(domData(t, "msgid")),
                    a = e.get().peer,
                    i = (0, c.getMessage)(e, a, n);
                return (0, u.isImportant)(i) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important")
            }
        })
    }

    function i(e, t) {
        return {
            markImportant: function(t, n, r) {
                (0, l.updateStar)(t, n, e)
            },
            unmount: function() {
                (0, d.destroyModule)(t)
            }
        }
    }

    function o(e, t, n) {
        var o = a.bind(null, t, 0),
            s = r.bind(null, t),
            l = (0, d.createModule)({
                handlers: function(t, n) {
                    n(e, "click", f, s), n(e, "mouseover", f, o)
                }
            });
        return i(e, l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = o;
    var s = n(1),
        l = n(3),
        u = n(16),
        c = n(5),
        d = n(2),
        g = n(4),
        f = "_im_mess_fav"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.queues[e].currEv = !1, Promise.resolve(t)
    }

    function i(e, t) {
        var n = t.queues[e].currEv;
        return n ? (t.queues[e].errored.push(n), a(e, t)) : Promise.resolve(t)
    }

    function o(e) {
        for (var t = {}, n = Object.keys(e.queues), r = n.length, a = 0; r > a; a++) {
            var i = n[a],
                o = e.queues[i];
            (o.currEv || o.evs.length || o.errored.length) && (t[i] = o)
        }
        return Promise.resolve({
            queues: t,
            opts: e.opts
        })
    }

    function s(e, t, n) {
        return n.queues[e] ? (t ? n.queues[e].errored = [] : n.queues[e].errored = n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], a(e, n)) : Promise.resolve(n)
    }

    function l(e, t) {
        var n = g(e, t.get()).errored;
        return n.length > 0 ? n[n.length - 1] : !1
    }

    function u(e, t, n, r) {
        var o = r.get().queues[e];
        if (o && !o.currEv && o.evs.length > 0 && !o.pause) {
            var s = u.bind(null, e, t, n, r),
                c = o.evs.shift();
            o.currEv = c, t(e, c).then(function() {
                r.get().opts.waitCommit || r.set(a.bind(null, e))
            }).then(s)["catch"](function(t) {
                if ("" === t) try {
                    console.log(t), console.trace()
                } catch (a) {}
                return r.set(i.bind(null, e)).then(function() {
                    n(e, l(e, r), t)
                }).then(s)
            })
        }
    }

    function c(e, t, n) {
        var r = n.queues[e];
        return r.errored.filter(function(e) {
            return e.mess.messageId === t
        }).forEach(function(e) {
            e.failed = !1, r.evs.push(e)
        }), r.errored = r.errored.filter(function(e) {
            return e.mess.messageId !== t
        }), Promise.resolve(n)
    }

    function d() {
        return {
            evs: [],
            pause: !1,
            errored: [],
            currEv: !1
        }
    }

    function g(e, t) {
        return t.queues[e] || (t.queues[e] = d()), t.queues[e]
    }

    function f(e, t, n) {
        var r = g(e, n);
        return r.pause = t, Promise.resolve(n)
    }

    function m(e, t, n) {
        t.ts = Date.now();
        var r = g(e, n);
        return r.evs.push(t), Promise.resolve(n)
    }

    function p(e) {
        var t = Object.keys(e.get().queues);
        t.forEach(function(t) {
            e.set(i.bind(null, t)), e.set(s.bind(null, t, !1))
        })
    }

    function _(e, t, n) {
        var r = (0, v["default"])({
            queues: {},
            debug: n && n.debug,
            opts: extend({}, n)
        }, n);
        return n && n.store ? (r.set(o), p(r)) : p(r), {
            pushMessage: function(n, a) {
                return r.set(m.bind(null, n, a)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            resend: function(n, a) {
                return r.set(c.bind(null, n, a)).then(function(i) {
                    var o = r.get().queues[n].evs.filter(function(e) {
                        return e.mess.messageId === a
                    })[0];
                    return u(n, e, t, r), o
                })
            },
            reset: function(n) {
                return r.set(s.bind(null, n, !0)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            setErrored: function(e, t) {
                return r.set(function(n) {
                    var r = g(e, n);
                    return r.errored = t, Promise.resolve(n)
                })
            },
            pause: function(e) {
                r.set(f.bind(null, e, !0))
            },
            isPaused: function(e) {
                return !!g(e, r.get()).pause
            },
            complete: function(n, i) {
                var o = r.get();
                o.queues[n].currEv && o.queues[n].currEv.rid === i && r.set(a.bind(null, n)).then(function() {
                    u(n, e, t, r)
                })
            },
            resume: function(n) {
                r.set(f.bind(null, n, !1)).then((0, b.pause)(.1)).then(function() {
                    u(n, e, t, r)
                })
            },
            inspectQueue: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
                if (!r.get().queues[e]) return [];
                var n = r.get().queues[e],
                    a = t && n.currEv ? [n.currEv] : [];
                return a.concat(n.evs.slice()).concat(n.errored.slice().map(function(e) {
                    return extend({}, e, {
                        failed: !0
                    })
                })).sort(function(e, t) {
                    return e.ts - t.ts
                })
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initQueue = _;
    var h = n(6),
        v = r(h),
        b = n(20)
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = extend({}, nav.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = nav.toStr(t);
        nav.setLoc(n)
    }

    function r() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = extend(e, t)
            },
            commitNav: function() {
                n(e), e = {}
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = n, t.updateLazyLocation = r
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return new Promise(function(r, a) {
            ajax.post(e, t, {
                timeout: n,
                onDone: function() {
                    r.apply(null, [
                        [].concat(Array.prototype.slice.call(arguments))
                    ])
                },
                onFail: function() {
                    return a.apply(null, arguments), !0
                }
            })
        })
    }

    function r(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
            r = a(e, t, n),
            i = r.request;
        return r.cancel, i
    }

    function a(e, t) {
        function n() {
            a.abort()
        }
        var r = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
            a = void 0;
        a = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var i = new Promise(function(n, i) {
            var o, s = Date.now(),
                l = r.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) a.open("get", e + "?" + u), a.ontimeout = function() {
                i("", {})
            }, a.onerror = function() {
                i("", {})
            }, a.onload = function() {
                n(a.responseText)
            }, setTimeout(function() {
                a.send()
            }, 0);
            else {
                a.onreadystatechange = function() {
                    4 == a.readyState && (clearInterval(o), a.status >= 200 && a.status < 300 ? n(a.responseText, a) : i(a.responseText, a))
                };
                try {
                    a.open("GET", e + "?" + u, !0)
                } catch (c) {
                    return i(c)
                }
                a.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * l && (i("", {}), clearInterval(o))
            }, 1e3)
        });
        return {
            request: i,
            cancel: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = n, t.plainget = r, t.plaingetCancelable = a
}, function(e, t, n) {
    n(112), n(113), n(114), n(111), e.exports = n(22).Map
}, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t, n) {
    var r = n(47),
        a = n(7)("toStringTag"),
        i = "Arguments" == r(function() {
            return arguments
        }()),
        o = function(e, t) {
            try {
                return e[t]
            } catch (n) {}
        };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = o(t = Object(e), a)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(15),
        a = n(8).document,
        i = r(a) && r(a.createElement);
    e.exports = function(e) {
        return i ? a.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    var r = n(8),
        a = n(22),
        i = n(14),
        o = n(19),
        s = n(23),
        l = "prototype",
        u = function(e, t, n) {
            var c, d, g, f, m = e & u.F,
                p = e & u.G,
                _ = e & u.S,
                h = e & u.P,
                v = e & u.B,
                b = p ? r : _ ? r[t] || (r[t] = {}) : (r[t] || {})[l],
                y = p ? a : a[t] || (a[t] = {}),
                C = y[l] || (y[l] = {});
            p && (n = t);
            for (c in n) d = !m && b && void 0 !== b[c], g = (d ? b : n)[c], f = v && d ? s(g, r) : h && "function" == typeof g ? s(Function.call, g) : g, b && o(b, c, g, e & u.U), y[c] != g && i(y, c, f), h && C[c] != g && (C[c] = g)
        };
    r.core = a, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, n) {
    var r = n(23),
        a = n(94),
        i = n(93),
        o = n(17),
        s = n(58),
        l = n(109);
    e.exports = function(e, t, n, u, c) {
        var d, g, f, m = c ? function() {
                return e
            } : l(e),
            p = r(n, u, t ? 2 : 1),
            _ = 0;
        if ("function" != typeof m) throw TypeError(e + " is not iterable!");
        if (i(m))
            for (d = s(e.length); d > _; _++) t ? p(o(g = e[_])[0], g[1]) : p(e[_]);
        else
            for (f = m.call(e); !(g = f.next()).done;) a(f, p, g.value, t)
    }
}, function(e, t, n) {
    e.exports = !n(12) && !n(25)(function() {
        return 7 != Object.defineProperty(n(48)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    var r = n(27)("meta"),
        a = n(15),
        i = n(13),
        o = n(18).f,
        s = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !n(25)(function() {
            return l(Object.preventExtensions({}))
        }),
        c = function(e) {
            o(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!a(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
                if (!l(e)) return "F";
                if (!t) return "E";
                c(e)
            }
            return e[r].i
        },
        g = function(e, t) {
            if (!i(e, r)) {
                if (!l(e)) return !0;
                if (!t) return !1;
                c(e)
            }
            return e[r].w
        },
        f = function(e) {
            return u && m.NEED && l(e) && !i(e, r) && c(e), e
        },
        m = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: g,
            onFreeze: f
        }
}, function(e, t, n) {
    var r = n(17),
        a = n(98),
        i = n(49),
        o = n(34)("IE_PROTO"),
        s = function() {},
        l = "prototype",
        u = function() {
            var e, t = n(48)("iframe"),
                r = i.length,
                a = ">";
            for (t.style.display = "none", n(90).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + a), e.close(), u = e.F; r--;) delete u[l][i[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[l] = r(e), n = new s, s[l] = null, n[o] = e) : n = u(), void 0 === t ? n : a(n, t)
    }
}, function(e, t, n) {
    var r = n(19);
    e.exports = function(e, t, n) {
        for (var a in t) r(e, a, t[a], n);
        return e
    }
}, function(e, t, n) {
    var r = n(8),
        a = "__core-js_shared__",
        i = r[a] || (r[a] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, n) {
    var r = n(35),
        a = Math.min;
    e.exports = function(e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    var r = n(15);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t, n) {
        return !e.map(function(e) {
            var r = (0, w.getMessage)(t, n, e);
            return (0, I.isImportant)(r)
        }).reduce(function(e, t) {
            return e && t
        })
    }

    function i(e, t) {
        if ((0, S.isClassicInterface)(e)) return "";
        var n = e.get().tabs[t];
        return n.online ? "online" + (mobPlatforms[n.online] ? (0, S.getMobileIcon)(t) : "") : (0, S.getLastTime)(e, t).str
    }

    function o(e, t) {
        var n = e.get().peer,
            r = geByClass1(S.LAST_ACT_CLASS, t);
        if (r && e.get().peer) {
            var a = (0, S.getLastTime)(e, n),
                i = a.time,
                o = a.str;
            (domData(r, "time") !== i || intval(domData(r, "peer")) !== n) && (val(r, o), attr(r, "data-time", i), attr(r, "data-peer", n))
        }
    }

    function s(e, t, n) {
        geByClass("_im_header_icon", e).forEach(function(e) {
            if (n.length > 0) hide(e);
            else if ("star" === domData(e, "type") && (0, S.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", (0, S.isImportant)(t)), setStyle(e, {
                    display: "inline-block"
                })), "answer" === domData(e, "type") && (0, S.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", (0, S.isUnrespond)(t)), (0, S.isUnrespond)(t) ? setStyle(e, {
                    display: "inline-block"
                }) : hide(e)), "search" === domData(e, "type") && !(0, S.isCommunityInterface)(t)) {
                var r = (0, S.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                setStyle(e, {
                    display: "inline-block"
                }), toggleClass(e, "im-page-header-icon_search-shown", r)
            }
        })
    }

    function l(e, t, n) {
        var r = getLang("mail_selected_shorted", t.length);
        c({
            actions: !0
        }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
            label: r.replace("{count}", t.length),
            tip: getLang("mail_deselect_all")
        }));
        var i = geByClass1(O, e),
            o = a(t, n, n.get().peer);
        toggleClass(i, "im-page--mess-actions_all-sel", !o);
        var s = o ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
        attr(geByClass1("_im_page_action_star", e), "aria-label", s)
    }

    function u(e, t) {
        var n = (geByClass1("_im_dialog_actions"), t.get().peer),
            r = t.get().tabs[n],
            a = clean(stripHTML(unclean(r.tab))),
            o = (0, S.renderPhotosFromTab)(r, !0),
            l = getTemplate("im_simple_link", {
                href: r.href,
                content: getTemplate("im_peer_photo", {
                    online_class: onlinePlatformClass(r.online),
                    owner_photo: o,
                    modifier_class: "nim-peer_smaller"
                })
            });
        val(geByClass1("im-page--aside-photo", e), l);
        var u = (0, S.isChatPeer)(n),
            d = {
                muted: inArray(n, t.get().mutedPeers),
                verified: !!r.verified,
                chat: u,
                actions: !1,
                derelict: !1
            },
            g = getTemplate("im_simple_name", {
                name: r.tab,
                href: r.href,
                name_attr: a,
                ads_union: r.ad_union_ids_attr
            });
        val(geByClass1("im-page--title-wrapper", e), g);
        var f = geByClass1(P, e);
        removeClass(f, S.DESELECT_ALL_CLASS);
        var m = geByClass1(M, e);
        if (show(geByClass1(A, e)), removeClass(geByClass1(O, e), "im-page--mess-actions_visible"), removeClass(geByClass1(O, e), "im-page--mess-actions_all-sel"), s(e, t, []), u) {
            var p = Object.keys(r.data.members).filter(function(e) {
                    return !r.data.members[e].closed && !r.data.members[e].kicked
                }).length,
                _ = !r.data.closed && !r.data.kicked,
                h = _ ? getTemplate("im_chat_members", {
                    name: getLang("mail_im_n_chat_members", p)
                }) : "";
            _ || (d.derelict = !0), val(m, h)
        } else {
            if ((0, S.isClassicInterface)(t)) {
                var v = geByClass1("_im_page_back", e);
                attr(v, "href", (0, S.getBaseLink)(t) + "?tab=" + t.get().active_tab)
            }
            removeClass(m, "im-page--peer-online_mute"), val(m, i(t, n))
        }
        c(d, "im-page--chat-header")
    }

    function c(e, t) {
        var n = geByClass1(t);
        Object.keys(e).forEach(function(r) {
            toggleClass(n, t + "_" + r, !!e[r])
        })
    }

    function d(e, t, n) {
        return 1 === e.length && (e = e.map(function(e) {
            var a = (0, w.getMessage)(n, t, e),
                i = (0, w.getAuthorFullName)(n, t, e);
            return i === !1 ? n.set(T.loadChatMember.bind(null, r({}, t, [a.userId]))).then(function(n) {
                var r = (0, w.getAuthorFullName)(n, t, e);
                return [e, a.text, a.date, r, a.attaches]
            }) : [e, a.text, a.date, i, a.attaches]
        })), e
    }

    function g(e, t, n, r, i) {
        var o = e.get().selectedMessages,
            s = domData(i, "action"),
            l = e.get().peer;
        switch (s) {
            case "delete":
            case "spam":
                e.set(T.removeMessagesWithRestore.bind(null, o, l, s)).then(t().removeMessagesRestore.bind(null, o, l, s));
                var u = e.get().tabs[l];
                (0, T.removeMessageSend)(o, l, u.hash, s, e.get().gid);
                break;
            case "forward":
                Promise.all(d(o, e.get().peer, e)).then(function(t) {
                    return e.set(T.prepareForward.bind(null, t))
                }).then(function() {
                    (0, S.isClassicInterface)(e) ? (cancelStackPush("forward", function(t) {
                        e.set(T.prepareForward.bind(null, [])).then(function() {
                            e.get().longpoll.push([(0, E.changePeer)(t)])
                        })
                    }.bind(null, e.get().peer)), e.get().longpoll.push([(0, E.resetPeer)(!0)])) : t().startForward(e)
                });
                break;
            case "star":
                var u = e.get().tabs[l],
                    c = a(o, e, l);
                e.set(T.favMessage.bind(null, o, c, l)), e.get().longpoll.push(o.map(function(e) {
                    return {
                        type: c ? E.SET_FLAGS : E.RESET_FLAGS,
                        messageId: e,
                        peerId: l,
                        flags: E.FLAG_IMPORTANT
                    }
                }));
                break;
            case "respond":
                Promise.all(d(o, e.get().peer, e)).then(function(t) {
                    return e.set(T.forwardMessages.bind(null, t, l, cur.imDb))
                }).then(function() {
                    t().respond(e, l)
                })
        }
        _(e, t, n)
    }

    function f(e, t, n, r, a, i) {
        if ("keydown" !== i.type || 13 === i.which) {
            var o = trim(val(a));
            return o ? (o !== n && e.set(T.updateChatTopic.bind(null, t, o)).then(r().updateChatTopic.bind(null, t)), !0) : (notaBene(a), !1)
        }
    }

    function m(e, t, n) {
        if ((0, S.isChatPeer)(t)) {
            var r = e.get().tabs[t].data.title,
                a = f.bind(null, e, t, r, n),
                i = showFastBox({
                    title: getLang("mail_chat_topic_change_title"),
                    dark: 1
                }, getTemplate("im_chat_change_topic", {
                    value: r
                }), getLang("global_save"), function(e, t) {
                    var n = a(o, t);
                    n && i.hide()
                }, getLang("global_cancel"), function() {
                    i.hide()
                }),
                o = geByClass1(x, i.bodyNode);
            elfocus(o), addEvent(o, "keydown", function(e) {
                var t = a(o, e);
                t && i.hide()
            })
        }
    }

    function p(e, t, n, r, a, i) {
        var o = domData(i, "action"),
            s = geByClass1(L, r).parentNode,
            l = e.get().peer;
        switch (o) {
            case "clear":
                var u = (0, S.showFlushDialog)(l, function(n) {
                    (0, S.cleanHistory)(e, u, t, T.flushHistory, e.get().peer)
                });
                break;
            case "photos":
            case "media":
                showWiki({
                    w: "history" + (0, S.convertPeerToUrl)(l) + "_photo"
                });
                break;
            case "topic":
                m(e, l, t);
                break;
            case "avatar":
                cur.recieveCropResult = void 0, Page.ownerPhoto(l);
                break;
            case "search":
                t().showSearch(e);
                break;
            case "block_community":
                e.set(T.toggleCommunityMessages.bind(null, !1, l)).then(function() {
                    e.get().longpoll.push([(0, E.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                });
                break;
            case "allow_community":
                e.set(T.toggleCommunityMessages.bind(null, !0, l)).then(function() {
                    n().changeActions(e)
                });
                break;
            case "block":
                var u = (0, S.showBlacklistBox)(l, e);
                u.once("success", function(t) {
                    t.delta && (showDoneBox(t.msg), e.get().longpoll.push([(0, E.resetPeer)()]))
                });
                break;
            case "leave":
                var u = showFastBox({
                    title: getLang("mail_chat_leave_title"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang("mail_chat_leave_confirm"), getLang("mail_leave_chat"), function() {
                    e.set(T.leaveChat.bind(null, l)), u.hide(), e.get().longpoll.push([(0, E.resetPeer)()])
                }, getLang("global_cancel"), function() {
                    u.hide()
                });
                break;
            case "return":
                e.set(T.returnToChat.bind(null, l));
                break;
            case "unmute":
            case "mute":
                var c = "mute" === o ? 1 : 0;
                e.set(T.toggleMutePeer.bind(null, l, c)).then(t().updateState.bind(null, l));
                break;
            case "chat":
            case "invite":
                if ((0, S.isChatPeer)(l))(0, S.inviteUser)(e, l, t, T.setCreationType);
                else if ((0, S.isUserPeer)(l)) {
                    var d = e.get().tabs[l],
                        g = [
                            [l, d.tab]
                        ];
                    e.set(T.setCreationType.bind(null, "chat", [])).then(function(n) {
                        return t().showCreation(e, g)
                    })
                }
        }
        uiActionsMenu.toggle(s, !1)
    }

    function _(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(T.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
    }

    function h(e, t, n, r) {
        var a = (0, S.isClassicInterface)(e),
            i = void 0,
            o = void 0;
        switch (domData(r, "type")) {
            case "star":
                o = [4, 6], i = function() {
                    return (0, S.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                };
                break;
            case "answer":
                o = [4, 6], i = getLang("mail_end_conversation");
                break;
            case "search":
                o = a ? [5, 6] : [4, -9], i = getLang("mail_search_in_peer")
        }
        showTooltip(r, {
            text: i || "",
            black: 1,
            shift: o,
            forcetoup: !0,
            appendParentCls: a ? "_im_dialog_actions" : "_im_mess_actions"
        })
    }

    function v(e, t, n, r, a) {
        var i = domData(a, "type");
        switch (i) {
            case "star":
                e.set(T.toggleDialogImportant.bind(null, e.get().peer)), setTimeout(function() {
                    return h(e, t, r, a)
                }, 40);
                break;
            case "search":
            case "search":
                n().showSearch(e), window.tooltips && tooltips.hide(a, {
                    fasthide: !0
                });
                break;
            case "answer":
                e.set(T.markDialogAnswered.bind(null, e.get().peer, 0)), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), e.get().longpoll.push([(0, E.resetPeer)()])
        }
    }

    function b(e, t, n, r) {
        return {
            changeActions: function(t) {
                var n = geByClass1(L, e),
                    r = geByClass1(A, e),
                    a = t.get().curActions,
                    i = Object.keys(a).map(function(e, t) {
                        var n = "";
                        return 7 === T.ACTION_PRIORITIES[e] && 0 !== t && (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(j, {
                            name: a[e].name,
                            icon: a[e].icon,
                            action: e
                        })
                    }).join("");
                0 === Object.keys(a).length ? setStyle(r, {
                    opacity: 0
                }) : (setStyle(r, {
                    opacity: 1
                }), val(n, i))
            },
            renderPeer: function(t) {
                u(e, t)
            },
            changedMessageSelection: function(t) {
                if (0 !== t.get().peer) {
                    var n = t.get().selectedMessages || [];
                    n.length > 0, n.length > 0 ? l(e, n, t) : u(e, t)
                }
            },
            unmount: function() {
                (0, C.destroyModule)(r), clearInterval(t), cancelStackFilter("fowrward")
            }
        }
    }

    function y(e, t, n) {
        var r = (0, C.createMutations)(b),
            a = r.callMutations,
            i = r.bindMutations,
            s = g.bind(null, t, n, a),
            l = p.bind(null, t, n, a, e),
            u = _.bind(null, t, n, a),
            c = function(e, n) {
                return (0, S.showVerifiedTooltip)(n, t.get().peer)
            },
            d = h.bind(null, t, e),
            f = v.bind(null, t, e, n),
            m = function(r) {
                gpeByClass(B, r.target, e) && !checkEvent(r) && ((0, S.showChatMembers)(t, n, T.setCreationType), cancelEvent(r))
            },
            y = (0, C.createModule)({
                handlers: function(r, a) {
                    a(e, "click", D, s), a(e, "click", k, l), a(e, "click", S.DESELECT_ALL_CLASS, u), a(e, "mouseover", R, c), a(e, "mouseover", "_im_header_icon", d), a(e, "click", "_im_header_icon", f), a(e, "click", "_im_header_link", m), a(e, "click", F, m), a(e, "click", N, function(e) {
                        return (0, S.showChatMembers)(t, n, T.setCreationType)
                    }), a(e, "click", "_im_page_back", function(e) {
                        checkEvent(e) || (t.get().longpoll.push([(0, E.resetPeer)()]), cancelEvent(e))
                    })
                }
            }),
            w = setInterval(o.bind(null, t, e), 3e4);
        return (0, S.isReservedPeer)(t.get().peer) || setTimeout(function() {
            t.set(T.setActions).then(a().changeActions)
        }), i(e, w, n, y)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = y;
    var C = n(2),
        T = n(1),
        S = n(3),
        E = n(4),
        w = n(5),
        I = n(16),
        k = "_im_action",
        P = "_im_page_peer_name",
        M = "_im_page_peer_online",
        L = "_ui_menu",
        A = "_im_dialog_action_wrapper",
        O = "_im_mess_actions",
        D = "_im_page_action",
        x = "_im_chat_topic_change_input",
        R = "_im_chat_verified",
        B = "im-page--chat-header_chat",
        F = "_im_page_peer_name",
        N = "_im_chat_members",
        j = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + k + ' im-action im-action_%icon%" data-action="%action%">%name%</a>'
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
            visibility: "visible"
        }))
    }

    function o(e, t, n, r) {
        var a = e instanceof Array ? e : geByClass("_im_bar_date", e),
            i = t.contHeight(),
            o = a.reduce(function(e, t) {
                return e[domData(t, "date")] = [t.offsetTop + I, i, t], e
            }, {}),
            s = !n && r.barMap ? r.barMap : {};
        return r.barMap = extend(s, o), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
    }

    function s(e, t) {
        return t.barMapKeys.forEach(function(n) {
            t.barMap[n][0] -= e
        }), Promise.resolve(t)
    }

    function l(e, t, n, r, a) {
        var i = e.get().barMap[t],
            o = (0, h.isClassicInterface)(a) ? w : E;
        return n - (i[0] + n - i[1]) + r - o
    }

    function u(e, t) {
        var n = e.get().barMap[t][2];
        return {
            text: n.textContent,
            date: domData(n, "date")
        }
    }

    function c(e, t, n, r) {
        return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : 0 > n && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
    }

    function d(e, t) {
        return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
    }

    function g(e, t, n, r, a) {
        var i = e.get(),
            o = void 0,
            s = void 0,
            c = n - t;
        i.barMapKeys.forEach(function(t) {
            var i = l(e, t, n, r, a);
            if (i >= c) {
                var u = o ? l(e, o, n, r, a) : n;
                o = u > i ? t : o
            } else if (c > i) {
                var d = s ? l(e, s, n, r, a) : 0;
                s = i > d ? t : s
            }
        });
        var d = {};
        return [
            [s, "prev"],
            [o, "cur"]
        ].forEach(function(t) {
            var i = _(t, 2),
                o = i[0],
                s = i[1];
            o && (d[s + "Bar"] = u(e, o), d[s + "Left"] = l(e, o, n, r, a) - c)
        }), d
    }

    function f(e) {
        var t = geByClass1("_im_mess", e),
            n = domData(t, "ts");
        return t && n ? {
            text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
            date: n
        } : null
    }

    function m(e, t, n, r, o) {
        var s = (0, v.isEverythingLoaded)(e.get()),
            l = t.get(),
            u = o.scrollTop(),
            m = l.lastTop ? l.lastTop - u : 0;
        l.lastTop = u;
        var p = ((0, h.isClassicInterface)(e) ? C : 0) - T / 2,
            _ = o.contHeight(),
            b = g(t, u, _, p, e),
            y = b.prevBar,
            S = b.curBar,
            E = b.prevLeft,
            w = (b.curLeft, !1),
            I = !1,
            k = !1,
            P = !1;
        S || s || (S = f(r)), S ? (I = S, w = "translateY(0px)") : (k = !0, w = "translateY(0px)"), y && S && E > -T && 0 > E && (P = !0, k = !1, I = S, w = "translateY(" + (-T - E) + "px)"), I && i(n, I), P ? t.set(c.bind(null, n, y.date, m)) : t.set(d.bind(null, n)), w && setStyle(n, a({}, cssTransformProp, w)), toggleClass(n, "im-page--top-date-bar_no-b", k)
    }

    function p(e, t) {
        var n = geByClass1("_im_top_date_bar"),
            r = (0, y["default"])({
                lastTop: !1,
                barMap: {},
                barMapKeys: []
            }),
            a = null,
            i = null,
            l = null,
            u = debounce(function(e) {
                r.set(o.bind(null, t, e, !1))
            }, 500);
        return {
            reset: function(a) {
                r.set(o.bind(null, t, a, !0)).then(function() {
                    m(e, r, n, t, a)
                })
            },
            disable: function() {
                r.reset()
            },
            heightIncreased: function(e, t) {
                return u(t), r.set(s.bind(null, e))
            },
            parseMore: function(a, i) {
                r.set(o.bind(null, a, i, !1)).then(function() {
                    m(e, r, n, t, i)
                })
            },
            toggle: function(e) {
                e ? show(n) : hide(n)
            },
            show: function() {
                i = Date.now(), l || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), l = setInterval(function() {
                    Date.now() - i > k && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(l), l = null)
                }, P))
            },
            update: function(i) {
                a && (clearTimeout(a), a = null), a = setTimeout(function() {
                    m(e, r, n, t, i)
                }, S), m(e, r, n, t, i)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var _ = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.setCurrentDateBar = i, t.mount = p;
    var h = n(3),
        v = n(1),
        b = n(6),
        y = r(b),
        C = 68,
        T = 32,
        S = 300,
        E = 20,
        w = 68,
        I = 10,
        k = 2e3,
        P = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r, a, i) {
        (0, I.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(o.bind(null, t, !1), 100);
        var s = g(i);
        s.map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            removeClass(e, "olist_item_wrap_on")
        }), n().createCanceled(e, r), a.resetSelection(), "add_member" === e.get().creationType && e.set(I.setCreationType.bind(null, "chat", [])), e.set(I.presetAvatar.bind(null, !1));
        var u = geByClass1(K, t);
        l(e, i, t), uiSearch.reset(geByClass1(j, t)), uiSearch.reset(geByClass1(H, t)), u && u.parentNode.removeChild(u), l(e, i, t), cancelStackFilter("im_search");
        var c = 0 === e.get().peer ? "search" : "default";
        e.get().longpoll.push([(0, x.transitionEvent)(c)]), attr(t, "aria-hidden", "true")
    }

    function i(e, t, n) {
        return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(function(e) {
            e.then(function(e) {
                e = e.filter(function(e) {
                    return !n.current_create_peer_ids[e.peerId]
                }), n.current_create_peer_ids = e.reduce(function(e, t) {
                    return e[t.peerId] = !0, e
                }, n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
            })
        }), Promise.resolve(n)
    }

    function o(e, t) {
        toggleClass(e, "im-create_material", t)
    }

    function s(e, t, n, r, i, o) {
        a(e, t, n, !1, i, o), e.get().longpoll.push([(0, x.changePeer)(r)])
    }

    function l(e, t, n) {
        var r = geByClass1(z, n),
            a = t.get().selection.length,
            i = "add_member" === e.get().creationType,
            o = a > 0,
            s = a > 1;
        i ? val(r, 1 === a ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with")) : (val(r, s ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog")), toggleClass(n, "im-create_chat-details", s)), toggleClass(n, "im-create_tools", o), toggleClass(r, "button_disabled", !o)
    }

    function u(e, t, n, r, a, i, o) {
        if (o) {
            var s = intval(domData(o, "list-id")),
                u = g(i),
                c = trim(o.textContent),
                d = geByClass1(H, t),
                f = getSize(d)[1],
                m = void 0;
            inArray(s, u) ? (m = r.removeSelection(s, c), removeClass(o, "olist_item_wrap_on")) : (m = r.addSelection(s, c), addClass(o, "olist_item_wrap_on")), m.then(function() {
                var e = f - getSize(d)[1],
                    t = a.scrollTop();
                a.scrollTop(t - e)
            }), l(e, i, t);
            var p = geByClass1(H, t);
            uiSearch.reset(p)
        }
    }

    function c(e, t) {
        var n = g(e),
            r = [],
            a = [];
        return t.online && a.push("online"), mobPlatforms[t.online] && a.push("mobile"), r.push("_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"), inArray(t.peerId, n) && r.push("olist_item_wrap_on"), getTemplate("im_owner_item", {
            owner_id: t.peerId,
            cls: " " + r.join(" "),
            photo: t.photo,
            name: t.name,
            link: t.href,
            img_cls: a.join(" ")
        })
    }

    function d(e) {
        return (0, k.getSearchText)(e) || !1
    }

    function g(e) {
        return e.get().selection.map(function(e) {
            return e.id
        })
    }

    function f(e, t, n, r) {
        toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
        var a = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
            i = geByClass1("_im_create_title", e);
        val(i, a), val(geByClass1(z, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat"));
        var o = n.get().selection.map(function(e) {
            return e.id
        });
        p(e, r, t, !1, o), (0, M.fixTableCellChildHeight)("_im_create_wrap_safe", e)
    }

    function m(e, t, n) {
        return e.then(function(e) {
            return e.filter(function(e) {
                return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
            })
        })
    }

    function p(e, t, n, r, a) {
        var o = geByClass1(H, e),
            s = void 0,
            l = void 0,
            u = (0, I.searchLocalHints)(r, t.get()),
            c = n.hoverFirstElement.bind(n, W, S(t));
        t.get().creation_shown_all = !1, n.reset(), n.pipe(m(u, r, t), r), n.toTop(), r ? (l = (0, I.searchFriends)(r, t.get()), s = (0, I.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(m(s, r, t), r).then(c), n.pipe(m(l, r, t), r).then(c)) : (s = Promise.resolve([]), l = Promise.resolve([])), t.set(i.bind(null, [u, l, s], !0)), uiSearch.showProgress(o), Promise.all([u, s, l]).then(function() {
            return uiSearch.hideProgress(o)
        })
    }

    function _(e, t, n, r, a, i, o, s) {
        uiTabs.switchTab(s.firstElementChild);
        var l = domData(s, "type");
        switch (l) {
            case "chat":
                i.restore()
        }
        e.set(I.setCreationType.bind(null, l, [])).then(f.bind(null, t, r, a))
    }

    function h(e, t, n, r) {
        var a = r.get(),
            i = d(a),
            o = a.selection.map(function(e) {
                return e.id
            });
        n.unhoverElements(W), e.get().creationQuery = i, p(t, e, n, i, o)
    }

    function v(e, t, n, r) {
        var a = 2e9 + Math.round(rand(1e6, 2e6));
        cur.recieveCropResult = function(n) {
            cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(I.presetAvatar.bind(null, n)), (0, I.getOwnerPhoto)(n, a).then(function(e) {
                geByClass1(U, t).appendChild(ce("img", {
                    className: "im-chat-placeholder--img " + K,
                    src: e
                }))
            }), addClass(t, "im-create_photo-attached")
        }, Page.ownerPhoto(a)
    }

    function b(e, t) {
        geByClass1(U, t).innerHTML = "", e.set(I.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
    }

    function y(e, t, n, r, i, o) {
        g(t).map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            return removeClass(e, "olist_item_wrap_on")
        }), t.reset(), p(n, e, r, !1, g(t)), i.resetSelection(), a(e, n, o, !1, i, t)
    }

    function C(e, t, n, r, i, o, l) {
        function u(a) {
            y(e, t, n, r, i, o), s(e, n, o, a, i, t), unlockButton(f), o().restoreDialogs(e)
        }
        var c = g(t),
            d = e.get(),
            f = geByClass1(z, n),
            m = uiSearch.getFieldEl(geByClass1(j, n)).value;
        return c.length < 0 ? void 0 : "add_member" === e.get().creationType ? (e.set(I.addNewMember.bind(null, d.peer, c))["catch"](function(e) {
            return showFastBox(getLang("global_error"), e.message)
        }), a(e, n, o, "", i, t)) : (lockButton(f), 1 === c.length ? u(c[0]) : void e.set(I.createChat.bind(null, d.next_chat_avatar, c, m)).then(function() {
            return u(d.next_peer)
        })["catch"](function(e) {
            unlockButton(f), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
        }))
    }

    function T(e, t) {
        return showTooltip(e, {
            text: getLang("mail_cancel"),
            black: 1,
            zIndex: 1e3,
            shift: [3, -2],
            appendCls: "js-im-page"
        })
    }

    function S(e, t) {
        var n = 70,
            r = t && t.get().selection.length;
        return {
            top: -1,
            bottom: (0, M.isClassicInterface)(e) ? r > 0 ? n - 1 : 0 : -1
        }
    }

    function E(e, t, n, r, i, s, l, c) {
        return {
            show: function(t) {
                var a = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
                t.setState({
                    shown: !0
                }), o(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown"), a && a.forEach(function(e) {
                    return i.addSelection(e[0], e[1])
                }), f(e, n, r, t), setTimeout(function() {
                    t.get().longpoll.push([(0, x.transitionEvent)("create")]), attr(e, "aria-hidden", "false"), i.focus()
                }, 1)
            },
            focusSearch: function(e) {
                i.focus()
            },
            confirmCreate: function(e) {
                c()
            },
            hide: function(n) {
                n.get().shown = !1, a(n, e, t, !1, i, r)
            },
            scroll: function(e) {
                n.scrollPage(e, !0)
            },
            updateScroll: function() {
                (0, M.fixTableCellChildHeight)("_im_create_wrap_safe", e), n.updateScroll()
            },
            selectElement: function(a) {
                u(a, e, t, i, n, r, n.getHoveredElement())
            },
            hoverPrevElement: function(e) {
                n.hoverPrevElement(W, null, S(e, r))
            },
            hoverNextElement: function(e) {
                n.hoverNextElement(W, null, S(e, r))
            },
            unmount: function() {
                (0, A.destroyModule)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
            }
        }
    }

    function w(e, t, n) {
        var r = (0, D["default"])({
                selection: []
            }),
            o = geByClass1(B, e),
            s = (0, P.mount)(o, (0, D["default"])({
                offset: 0,
                limit: V,
                elements: [],
                elCls: F
            }), function(a) {
                return {
                    idFn: function(e) {
                        return intval(e.peerId)
                    },
                    hoverableFn: function(e) {
                        return hasClass(e, "_im_dialog")
                    },
                    renderFn: c.bind(null, r),
                    more: function(e, n) {
                        var a = void 0;
                        return t.get().shown ? (t.get().creation_shown_all || d(r) !== !1 ? a = Promise.resolve([]) : (t.get().creation_shown_all = !0, a = (0, I.searchFriends)(d(r), t.get())), t.set(i.bind(null, [a], !1)), m(a, d(r), t)) : Promise.resolve(!1)
                    },
                    onClick: function(a, i) {
                        checkEvent(a) || (u(t, e, n, p, s, r, i), cancelEvent(a))
                    }
                }
            });
        t.get().creationQuery = !1, t.get().creationType = "chat", f(e, s, r, t);
        var g = geByClass1(H, e),
            p = (0, L.mount)(g, r, function(n) {
                return {
                    selectionDeleted: function(n, r) {
                        l(t, n, e), removeClass(geByClass1("_im_dialog" + r), "olist_item_wrap_on")
                    },
                    onChange: h.bind(null, t, e, s)
                }
            }),
            S = a.bind(null, t, e, n, "cross", p, r),
            w = _.bind(null, t, e, n, s, r, p),
            k = v.bind(null, t, e),
            M = b.bind(null, t, e),
            O = y.bind(null, t, r, e, s, p, n),
            x = C.bind(null, t, r, e, s, p, n),
            j = geByClass1(R, e),
            K = (0, A.createModule)({
                handlers: function(t, n) {
                    t(j, "click", S), t(j, "mouseover", T.bind(null, j)), t(geByClass1(U, e), "click", k), t(geByClass1(G, e), "click", M), t(geByClass1(q, e), "click", O), t(geByClass1(z, e), "click", x), t(e, "mouseover", throttle(s.unhoverElements.bind(s, W), 100)), n(e, "click", N, w)
                }
            });
        return E(e, n, s, r, p, K, S, x)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = w;
    var I = n(1),
        k = n(5),
        P = n(29),
        M = n(3),
        L = n(76),
        A = n(2),
        O = n(6),
        D = r(O),
        x = n(4),
        R = "_im_create_cancel",
        B = "_im_create_list",
        F = "_im_dialog",
        N = "_im_create_tab",
        j = "_im_dialogs_creation_name",
        H = "_im_create_select",
        U = "_im_create_avatar",
        G = "_im_create_remove_avatar",
        z = "_im_confirm_creation",
        q = "_im_cancel_creation",
        K = "_im_avatar_img",
        W = ["im-creation--item_hovered"],
        V = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        removeClass(t.parentNode, "im-page--dialogs_with-mess");
        var r = n.getCurrentElements().filter(function(e) {
            return e.message
        });
        n.toTop(), n.reset(), r.length > 0 ? (r = [{
            type: "sep",
            peerId: "000"
        }].concat(r), e.setState({
            searchOnlyMessages: !0
        })) : r = [A()], n.pipeReplace(Promise.resolve(r))
    }

    function i(e) {
        return hasClass(e, "_im_search")
    }

    function o(e, t, n, r) {
        if ((0, X.isSearching)(e) && e.get().searchAllLoaded || (0, X.isRecentSearchesActive)(e)) return Promise.resolve([]);
        if (e.get().dialog_search_going || (0, Y.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
        if ((0, X.isSearching)(e)) return (0, Q.searchMessages)((0, X.getSearchText)(e), e.get()).then(function(e) {
            var t = V(e, 2),
                n = t[0],
                r = t[1];
            return M(r, n)
        });
        var a = e.get().active_tab,
            i = e.get().dialog_tabs_all;
        return i[Z.FOLDER_ALL] && !(0, Y.isReversedDialogs)(e) || i[a] ? 0 === q(e).length ? Promise.resolve([{
            type: "empty_dialogs",
            peerId: "000"
        }]) : Promise.resolve([]) : e.set(Q.loadDialogs).then(function(t) {
            var n = q(e);
            return 0 === n.length ? [{
                type: "empty_dialogs",
                peerId: "000"
            }] : n
        })
    }

    function s(e, t, n, r, a) {
        if (!gpeByClass("_im_peer_target", r.target)) {
            var o = t.get(),
                s = i(a),
                l = parseInt(domData(a, "peer"), 10),
                u = parseInt(domData(a, "msgid"), 10),
                c = (0, X.getTab)(t, l);
            if (hasClass(a, "_im_create_email")) {
                var d = trim(geByClass1("_im_dialog_name", a).textContent);
                c = {
                    name: d,
                    type: "email_create"
                }
            }
            if (checkEvent(r)) return window.open(_(t, c, u, s));
            if (c && "email_create" === c.type) return (0, Q.createEmailChat)(c.name, o).then(function(e) {
                return o.longpoll.push([ae.eventTypes.changePeer(e, !1, !0, !0)])
            })["catch"](function(e) {
                showFastBox(getLang("global_error"), e), document.activeElement && document.activeElement.blur()
            });
            if (n.saveScroll("list"), s && o.msgid !== u) o.longpoll.push([ae.eventTypes.changePeer(l, u)]);
            else if (l !== o.peer) {
                o.longpoll.push([ae.eventTypes.changePeer(l, !1, !0, !0)]);
                var g = (0, X.isSearching)(t);
                g && (0, Q.saveRecentSearchPeer)(l, cur.imDb), g && !(0, Y.isClassicInterface)(t) && setTimeout(function() {
                    var e = c.message ? c.message.messageId : c.peerId;
                    n.scrollToElement(e.toString(), !0, 0, "center")
                }, 100)
            } else l === o.peer && o.longpoll.push([ae.eventTypes.changePeer(l, !1, !0, !s)]);
            cancelEvent(r)
        }
    }

    function l(e, t, n) {
        var r = void 0;
        (0, Y.isChatPeer)(e) && !t.photo ? r = (0, Y.renderPhotosFromTab)(t, !n) : (r = '<img src="' + t.photo + '" alt="">', n && (r = getTemplate("im_dialogs_link_img", {
            href: t.href,
            photo: r
        })));
        var a = '<span class="_im_dialog_link">' + t.tab + "</span>";
        return {
            photo: r,
            userLink: a
        }
    }

    function u(e) {
        return !(0, Y.isPendingForward)(e)
    }

    function c(e, t, n) {
        return n ? getTemplate("im_img_prebody", {
            photo: t
        }) : e + ":"
    }

    function d(e, t, n, r, a, i, o, s, l, u) {
        var d = "",
            g = "";
        if (e & ae.eventTypes.FLAG_OUTBOUND) d = c(getLang("mail_by_you"), u, l);
        else if ((0, Y.isChatPeer)(n) && 0 !== r) {
            var f = t.data.members[r].photo;
            d = c(t.data.members[r].first_name, f, l)
        }
        return o = (0, Y.renderShortText)(n, s, o, a, i), g = d ? getTemplate("im_drow_prebody", {
            prebody: d,
            body: o
        }) : o
    }

    function g(e, t, n, r) {
        var a = arguments.length <= 4 || void 0 === arguments[4] ? {} : arguments[4],
            i = [];
        return (0, Y.isClassicInterface)(r) && i.push("nim-dialog_classic"), (0, X.isRecentSearchesActive)(r) && i.push("nim-dialog_recent"), i.push("nim-dialog_empty"), a.search && i.push("_im_search"), getTemplate("im_drow", {
            peer: e.peerId,
            msg_id: "",
            photo: t,
            user_link: n,
            date: "",
            body: "",
            unread: "",
            more: i.join(" "),
            is_star: "",
            unread_message_string: "",
            is_online: onlinePlatformClass(e.online),
            is_unread: "",
            is_unread_out: "",
            is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
        })
    }

    function f(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e ? e.toString() : ""
    }

    function m(e, t, n) {
        return n & ae.eventTypes.FLAG_UNREAD && n & ae.eventTypes.FLAG_OUTBOUND ? (0, Y.isSelfMessage)(t.peerId, e.get().gid) ? !1 : (0, Y.isChatPeer)(t.peerId) && t.data && t.data.closed ? !1 : t.unread ? !1 : t.lastmsg <= t.out_up_to ? !1 : !0 : !1
    }

    function p(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
            a = l(t.peerId, t, (0, Y.isClassicInterface)(e)),
            i = a.photo,
            o = a.userLink,
            s = n || b(t);
        if (!s) return g(t, i, o, e, r);
        var u = s.flags,
            c = t.unread > 0 ? t.unread : "",
            d = f(c),
            p = v(t, e, n),
            h = [];
        r.search && h.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && h.push("nim-dialog_muted"), t.verified && h.push("nim-dialog_verified"), (0, X.isRecentSearchesActive)(e) && h.push("nim-dialog_recent"), -1 === s.messageId && h.push("nim-dialog_empty"), (0, Y.isClassicInterface)(e) && h.push("nim-dialog_classic"), t.folders & ae.eventTypes.FOLDER_IMPORTANT && h.push("nim-dialog_starred"), !r.search && (0, Y.isUnrespond)(e, t.peerId, t) && h.push("nim-dialog_unrespond");
        var y = e.get().timeshift,
            C = m(e, t, u) ? "nim-dialog_unread-out" : "",
            T = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
        return getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: s.messageId,
            photo: i,
            user_link: o,
            date: s.date ? getShortDateOrTime(s.date, y, !0, getLang("months_sm_of", "raw")) : "",
            body: p,
            unread_message_string: T,
            tab_name: stripHTML(t.tab),
            href: _(e, t),
            unread: d,
            more: h.join(" "),
            is_online: onlinePlatformClass(t.online),
            is_unread: c > 0 && u & ae.eventTypes.FLAG_UNREAD ? "nim-dialog_unread" : "",
            is_unread_out: C,
            is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
        })
    }

    function _(e, t, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
            a = (0, Y.getBaseLink)(e),
            i = function() {
                return a + "?sel=" + (0, Y.convertPeerToUrl)(t.peerId) + (r && n ? "&msgid=" + n : "")
            };
        return "email_create" === t.type ? a + "?email=" + t.name : r ? i() : (0, Y.isUserPeer)(t.peerId) || (0, Y.isCommunityPeer)(t.peerId) ? (0, Y.isClassicInterface)(e) ? i() : t.href : i()
    }

    function h(e, t, n, r, a) {
        if (!t.deletedDialog) {
            var i = b(t),
                o = i.flags,
                s = v(t, n),
                u = l(t.peerId, t, (0, Y.isClassicInterface)(n)),
                c = u.photo,
                d = n.get().timeshift,
                g = i.date ? getShortDateOrTime(i.date, d, !0, getLang("months_sm_of", "raw")) : "",
                p = geByClass1("_im_dialog_unread_ct", e);
            N(e, t), val(geByClass1("_dialog_body", e), s), val(geByClass1("_im_dialog_date", e), g), val(p, f(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
            var _ = geByClass1("_im_dialog_photo", e);
            _.innerHTML !== c && val(_, c), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & ae.eventTypes.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", (0, Y.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", (0, Y.isClassicInterface)(n)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), t.unread > 0 && o & ae.eventTypes.FLAG_UNREAD && addClass(e, "nim-dialog_unread"), toggleClass(e, "nim-dialog_recent", (0, X.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === i.messageId), m(n, t, o) && addClass(e, "nim-dialog_unread-out"), a && setTimeout(function() {
                addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
            }, 100)
        }
    }

    function v(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            r = n || b(e);
        if ((0, Y.isPeerBlocked)(e.peerId, t)) {
            var a = t.get().block_states[e.peerId].name,
                i = getLang("mail_community_answering").replace("{username}", a);
            return getTemplate("im_drow_prebody", {
                prebody: i,
                body: ""
            })
        }
        return (0, Y.isServiceMsg)(r) ? (0, Y.renderServiceMsg)(r, e, !1) : d(r.flags, e, e.peerId, r.userId, !0, r.attaches, r.text, r.subject, (0, Y.isClassicInterface)(t), t.get().author_photo)
    }

    function b(e) {
        var t = e.lastmsg_meta;
        if (isArray(t) && (t = (0, te.addMessageEvent)([4].concat(t))), !t) {
            var n = "";
            if ((0, Y.isChatPeer)(e.peer)) {
                var r = Object.keys(e.data.members).length;
                n = getLang("mail_im_n_chat_members", r)
            } else n = e.online ? getLang("global_online_sm") : getLang("mail_offline");
            return (0, te.addMessageEvent)([4, -1, 0, e.peer, "", "", n, {}, -1])
        }
        return t
    }

    function y(e, t, n, r, a) {
        var i = geByClass1("_dialog_body", t);
        addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
            text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
            peer: e,
            spam_id: r
        }))
    }

    function C(e, t, n) {
        var r = (0, Y.showFlushDialog)(t, function(a) {
            n().updateMenu(e), (0, Y.cleanHistory)(e, r, n, Q.flushHistory, t)
        })
    }

    function T(e, t, n, r, a) {
        var i = gpeByClass("_im_dialog", a, n);
        if (i) {
            var o = function() {
                var n = intval(domData(i, "peer"));
                if (t.get().recentSearch) {
                    var a = (0, Q.removeFromRecentSearch)(n, cur.imDb);
                    return re(i), cancelEvent(r), 0 === a.length && e().cancelSearch(t), {
                        v: !1
                    }
                }
                var o = (0, Y.isCommunityPeer)(n) || (0, Y.isUserPeer)(n);
                (0, Y.isClassicInterface)(t) && o ? (0, Q.deleteDialog)(n, t.get()).then(function(r) {
                    var a = V(r, 2),
                        o = a[0],
                        s = a[1];
                    o ? (y(n, i, o, s, t), e().updateMenu(t)) : C(t, n, e)
                }) : C(t, n, e)
            }();
            if ("object" === ("undefined" == typeof o ? "undefined" : W(o))) return o.v
        }
        return cancelEvent(r), !1
    }

    function S(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2],
            r = arguments.length <= 3 || void 0 === arguments[3] ? "" : arguments[3],
            a = u(e),
            i = [];
        return r && i.push(r), (0, Y.isClassicInterface)(e) && i.push("nim-dialog_classic"), (0, X.isRecentSearchesActive)(e) && i.push("nim-dialog_recent"), i.push("nim-dialog_empty"), "" === n && i.push("nim-dialog_prep-injected"), getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: t.lastmsg || "",
            photo: (0, Y.renderPhotos)(t.photo),
            user_link: "<span>" + t.name + "</span>",
            date: "",
            body: n,
            href: _(e, t),
            unread: "",
            tab_name: stripHTML(t.name),
            is_star: "",
            is_unread: "",
            is_unread_out: "",
            more: i.join(" "),
            unread_message_string: "",
            is_online: onlinePlatformClass(t.online),
            is_selected: t.peerId == e.get().peer && a ? "nim-dialog_selected _im_dialog_selected" : ""
        })
    }

    function E(e) {
        var t = e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages",
            n = getLang(t);
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + oe + '">\n      ' + n + "\n    </div>\n  </li>"
    }

    function w(e) {
        return getTemplate("im_dialogs_none", {
            msg: e || getLang("mail_im_search_empty")
        })
    }

    function I(e, t) {
        return !e.get().unread_only || t.unread > 0
    }

    function k(e, t) {
        if ("sep" === t.type) return (0, Y.renderMessagesSearch)();
        if ("email_create" === t.type) return S(e, {
            peerId: t.peerId,
            lastmsg: -1,
            photo: "/images/contact_2x.png",
            online: "",
            type: t.type,
            name: t.query
        }, getLang("mail_enter_email_address"), "_im_create_email");
        if ("clear_recent" === t.type) return (0, Y.renderClearRecent)();
        if ("empty_dialogs" === t.type) return getTemplate("im_dialogs_none", {
            msg: getLang("mail_dialogs_list_empty")
        });
        if ("empty" === t.type) return w(t.lang);
        if ("only_mes" === t.type) return E(e);
        var n = e.get().tabs_cache || {};
        return t.local_index && !n[t.peerId] ? S(e, t) : (t.local_index && (t = n[t.peerId]), t.message ? p(e, t, t.message, {
            noselect: !0,
            search: !0
        }) : p(e, t))
    }

    function P(e, t, n, r, a, i) {
        var o = intval(domData(i, "peer")),
            s = domData(i, "action"),
            l = domData(i, "sid"),
            u = geByClass1("_im_dialog_" + o, t),
            c = intval(domData(i, "spam"));
        switch (s) {
            case "restore":
                u && e.set(Q.restoreDialog.bind(null, o, l, c)).then(function() {
                    addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), h(u, e.get().tabs[o], e, t, !1), r().updateMenu(e)
                });
                break;
            case "spam":
                var d = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + l + '" data-peer="' + o + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                if (u) {
                    var g = geByClass1("_dialog_body", u);
                    val(g, d), (0, Q.spamDialog)(o, l, e.get())
                }
                break;
            case "block":
                var f = void 0;
                f = (0, Y.isCommunityInterface)(e) ? (0, Y.showBlacklistBox)(o, e) : (0, Y.showBlacklistBoxUser)(o, e), f.once("success", function() {
                    e.set(Q.flushHistory.bind(null, o)).then(function() {
                        n().restoreDialogs(e)
                    })
                })
        }
        cancelEvent(a)
    }

    function M(e, t) {
        return e.map(function(e) {
            return (0, te.addMessageEvent)([4].concat(e))
        }).map(function(e) {
            return extend({}, t[e.peerId], {
                message: e
            })
        })
    }

    function L() {
        return {
            type: "only_mes",
            peerId: "00001"
        }
    }

    function A(e) {
        return {
            type: "empty",
            peerId: "empty",
            lang: e
        }
    }

    function O(e) {
        return 0 === e.length ? e : [L()].concat(e)
    }

    function D(e, t, n) {
        return t().toggleSettingsLoader(n, !0), e.checkMore(!(0, Y.isClassicInterface)(n)).then(t().toggleSettingsLoader.bind(null, n, !1))
    }

    function x(e, t) {
        var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
        return "undefined" != typeof n ? 2e9 + n : t.lastmsg
    }

    function R(e, t, n, r) {
        var a = gpeByClass("_im_dialog", r, t),
            i = intval(domData(a, "peer"));
        return e.set(Q.toggleDialogImportant.bind(null, i)), setTimeout(function() {
            F(e, t, n, r)
        }, 100), cancelEvent(n), !1
    }

    function B(e, t, n) {
        var r = void 0;
        return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = (0, Y.isReversedDialogs)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = x(e, n) - x(e, t), r = (0, Y.isReversedDialogs)(e) ? -r : r), r
    }

    function F(e, t, n, r) {
        var a = r.getBoundingClientRect().top;
        showTooltip(r, {
            text: function() {
                var n = gpeByClass("_im_dialog", r, t),
                    a = domData(n, "peer");
                return e.get().tabs[a].folders & ae.eventTypes.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
            },
            black: 1,
            zIndex: 1,
            shift: [14, 8],
            toup: a > 150
        })
    }

    function N(e, t) {
        var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
            r = geByClass1("_im_unread_blind_label", e);
        val(r, n)
    }

    function j(e, t, n, r, a) {
        var i = gpeByClass("_im_dialog", a, t),
            o = intval(domData(i, "peer")),
            s = e.get().tabs[o].lastmsg;
        return e.set(Q.markDialogAnswered.bind(null, o, s)).then(function() {
            h(i, e.get().tabs[o], e, t), (0, X.isRecentSearchesActive)(e) || n().restoreDialogs(e)
        }), showDoneBox(getLang("mail_marked_as_answered"), {
            out: 1e3
        }), cancelEvent(r), !1
    }

    function H(e) {
        var t = 42,
            n = 60,
            r = 45,
            a = 37,
            i = (0, X.isSearching)(e),
            o = e.get().searchOnlyMessages;
        return (0, Y.isClassicInterface)(e) ? {
            top: i && !o ? n + a - 1 : n,
            bottom: (0, Y.isCommunityInterface)(e) ? t : t + r
        } : {
            top: i && !o ? a - 1 : 0,
            bottom: 0
        }
    }

    function U(e, t) {
        e.hoverFirstElement(ce, H(t))
    }

    function G(e) {
        e.unhoverElements(ce)
    }

    function z(e, t, n, r, a) {
        return {
            selectPeer: function(t, n) {
                for (var r = geByClass("_im_dialog", e), a = n.get().peer, o = 0; o < r.length; o++) {
                    var s = r[o],
                        l = intval(domData(s, "peer")),
                        u = intval(domData(s, "msgid"));
                    l === a && (!i(s) || t === u && i(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                }
            },
            appendFastDialogs: function(t, r, a) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), a ? (n.reset(), (0, Y.isPendingForward)(t) || (0, X.isRecentSearchesActive)(t) ? (0, X.isRecentSearchesActive)(t) && (r = [{
                    type: "clear_recent",
                    peerId: "000001"
                }].concat(r)) : r = O(r), t.setState({
                    searchOnlyMessages: !1
                }), n.pipeReplace(Promise.resolve(r)).then(function() {
                    return U(n, t)
                })) : n.pipe(Promise.resolve(r)), n.toTop()
            },
            deactivate: function() {
                n.deactivate()
            },
            activate: function() {
                n.activate()
            },
            hoverFirstDialog: function(e) {
                U(n, e)
            },
            hoverNextDialog: function(e) {
                n.hoverNextElement(ce, ue, H(e))
            },
            hoverPrevDialog: function(e) {
                n.hoverPrevElement(ce, ue, H(e))
            },
            unhoverDialogs: G.bind(n),
            selectHoveredDialog: function(t) {
                var a = geByClass1("_im_dialog_hovered", e);
                a || (a = geByClass1("_im_dialog", e)), a && s(r, t, n, {}, a)
            },
            appendSearch: function(t, r, a) {
                var i = M(a, r);
                a.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                    type: "sep",
                    peerId: "000"
                }].concat(i))).then(function() {
                    return U(n, t)
                })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([A()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
            },
            updateDialog: function(t, n) {
                var r = geByClass1("_im_dialog_" + t);
                r && !i(r) && h(r, n.get().tabs[t], n, e)
            },
            focusOnSelected: function(e) {
                var t = e.get().peer;
                if (t) {
                    var r = geByClass1("_im_dialog_" + t);
                    r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                }
            },
            restoreScroll: function(e) {
                var t = n.restoreScroll("list");
                t || n.toTop()
            },
            restoreDialogs: function(t, a, i) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                    searchOnlyMessages: !1
                }), 0 !== q(t).length || n.isLoading() || (a = !0), a && n.reset(), i && n.wipe(), n.pipeReplace(Promise.resolve(q(t))).then(function(e) {
                    if (a && (!(0, Y.isClassicInterface)(t) || !t.get().peer)) {
                        var i = D(n, r, t);
                        return n.toTop(), i
                    }
                }).then(function() {
                    return G(n)
                })
            },
            appendDialogs: function(t, r) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                    var r = geByClass1("_im_dialog_" + n.peerId, e);
                    r && h(r, n, t, e, !0)
                }), (0, Y.isPendingForward)(t) || (0, X.isRecentSearchesActive)(t) || (r = O(r)), t.setState({
                    searchOnlyMessages: !1
                }), n.isEmpty() && 0 === r.length && (0, Y.isPendingForward)(t) && (r = [A(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
            },
            updateCounter: function(t, n) {
                var r = geByClass1("_im_dialog_" + n.peerId, e);
                if (r && !i(r)) {
                    var a = t.get().tabs[n.peerId],
                        o = f(a.unread > 0 ? a.unread : "");
                    N(r, a), val(geByClass1("_im_dialog_unread_ct", r), o), o ? addClass(r, "nim-dialog_unread") : removeClass(r, "nim-dialog_unread"), toggleClass(r, "nim-dialog_unread-out", m(t, a, a.lastmsg_meta.flags))
                }
            },
            removeDialog: function(e, t) {
                n.remove(t)
            },
            updateOnline: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r) {
                    var a = n.get().tabs[t],
                        i = geByClass1("_im_peer_online", r);
                    toggleOnline(i, a.online)
                }
            },
            setDialogFailed: function(t, n, r) {
                var a = geByClass1("_im_dialog_" + t, e);
                if (a) {
                    var i = r.get().tabs[t];
                    i.lastmsg === n && (addClass(a, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", a), "!"))
                }
            },
            scrollUp: function(e) {
                n.toTop(e), n.saveScroll("list", !0)
            },
            saveScroll: function(e) {
                n.saveScroll("list", !0)
            },
            promoteDialog: function(r, a) {
                var o = geByClass1("_im_dialog_" + a.peerId, e);
                if ((!o || i(o)) && (0, X.isSearching)(r)) return void n.unsetScroll("list");
                var s = r.get().tabs[a.peerId];
                I(r, s) && (n.pipeReplace(Promise.resolve(q(r)), void 0, !0).then(function(t) {
                    !inArray(a.peerId, t) && o && h(o, r.get().tabs[a.peerId], r, e)
                }), t().updateTyping(a, r))
            },
            removeSelection: function(t) {
                var r = t.get().peer.toString(),
                    a = "._im_dialog_" + r + "." + ue.join("."),
                    i = domQuery(a, e)[0];
                ue.forEach(function(e) {
                    return removeClass(i, e)
                }), (0, Y.isClassicInterface)(t) || n.hoverElement(r, ce, H(t))
            },
            updateScroll: function() {
                n.updateScroll()
            },
            updateTyping: function(t, n) {
                var r = geByClass1("_im_dialog_" + t.peerId, e);
                if (r && !i(r) && !n.get().tabs[t.peerId].deletedDialog) {
                    var a = geByClass1("_im_dialog_typing", r),
                        o = (0, Y.formatTyper)(n.get().tabs[t.peerId].typing, t.peerId, !0, n.get(), 1);
                    val(a, o), toggleClass(r, "nim-dialog_typing", o)
                }
            },
            unmount: function() {
                n.unmount(), (0, ne.destroyModule)(a)
            }
        }
    }

    function q(e) {
        var t = e.get().active_tab,
            n = e.get().dialog_tabs[t],
            r = e.get().tabs;
        return n.map(function(e) {
            return r[e]
        }).sort(B.bind(null, e))
    }

    function K(e, t, n) {
        var r = (0, ne.createMutations)(z),
            i = r.callMutations,
            l = r.bindMutations,
            u = T.bind(null, n, t, e),
            c = function(n, r) {
                var a = geByClass1(oe, e),
                    i = r.getBoundingClientRect().top;
                a && (i -= a.offsetHeight), showTooltip(r, {
                    text: function() {
                        return (0, X.isRecentSearchesActive)(t) && (0, Y.isClassicInterface)(t) ? getLang("mail_delete_recent") : getLang("mail_delete")
                    },
                    black: 1,
                    center: !0,
                    shift: [1, 10],
                    toup: i > 150,
                    zIndex: 1
                })
            },
            d = function(e, t) {
                var n = t.getBoundingClientRect().top;
                showTooltip(t, {
                    text: getLang("mail_end_conversation"),
                    black: 1,
                    center: !0,
                    zIndex: 1,
                    shift: [1, 4],
                    toup: n > 150
                })
            },
            g = F.bind(null, t, e),
            f = R.bind(null, t, e),
            m = j.bind(null, t, e, i),
            p = geByClass1("_im_dialogs_search"),
            _ = {
                idFn: function(e) {
                    return e.message ? e.message.messageId : e.peerId
                },
                hoverableFn: function(e) {
                    return hasClass(e, "_im_dialog")
                },
                renderFn: k.bind(null, t),
                more: o.bind(null, t, i),
                onScroll: (0, Y.isClassicInterface)(t) ? function() {
                    var e = bodyNode.scrollTop || document.documentElement.scrollTop;
                    0 >= e && !layers.visible && browser.safari ? addClass(p, "im-page--header_static") : removeClass(p, "im-page--header_static")
                } : !1
            },
            h = (0, ee.mount)(e, (0, J["default"])({
                limit: 40,
                offset: 0,
                nativeScroll: !!(0, Y.isClassicInterface)(t),
                height: ie,
                elements: q(t)
            }), function() {
                return _
            }),
            v = s.bind(null, n, t, h),
            b = a.bind(null, t, e, h),
            y = P.bind(null, t, e, i, n),
            C = Y.hideTopNotice.bind(null, t),
            S = (0, ne.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_dialog_close", u), n(e, "click", "_im_dialog_markre", m), n(e, "click", se, f), n(e, "click", "_im_dialog", v), n(e, "click", oe, b), n(e, "mouseover", "_im_dialog_close", c), n(e, "mouseover", "_im_dialog_markre", d), n(e, "click", Y.CLEAR_RECENT_CLASS, function() {
                        (0, Q.resetRecentSearch)(cur.imDb), cancelStackPop()
                    }), n(e, "mouseover", se, g), n(e, "click", le, y), n(domPN(e), "click", Y.HIDE_TOP_NOTICE_CLASS, C), t(e, "mouseover", throttle(h.unhoverElements.bind(h, ce), 100))
                }
            });
        return l(e, i, h, n, S)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        V = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
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
    t.mount = K;
    var Q = n(1),
        Y = n(3),
        X = n(5),
        Z = n(9),
        $ = n(6),
        J = r($),
        ee = n(29),
        te = n(4),
        ne = n(2),
        ae = n(11),
        ie = 64,
        oe = "_im_mess_search",
        se = "_im_dialog_star",
        le = "_im_dialog_daction",
        ue = ["_im_dialog_selected", "nim-dialog_selected"],
        ce = ["_im_dialog_hovered", "nim-dialog_hovered"]
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.get().tabs,
            n = e.get().peer,
            r = Object.keys(t).filter(function(t) {
                return (0, i.isFullyLoadedTab)(e, t) && intval(t) !== n
            }).map(function(e) {
                return t[e]
            });
        r.filter(function(e) {
            return Date.now() - e.last_visited > l
        }).forEach(function(t) {
            return e.set(o.cleanTab.bind(null, t.peerId))
        }), r.filter(function(t) {
            return (0, i.isFullyLoadedTab)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > u
        }).forEach(function(t) {
            return e.set(o.stringifyTab.bind(null, t.peerId))
        })
    }

    function a(e) {
        var t = setInterval(r.bind(null, e), s);
        return {
            unmount: function() {
                clearInterval(t)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(3),
        o = n(1),
        s = 5e3,
        l = 54e6,
        u = 72e5
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_chat_input_w", t),
            a = r.offsetHeight - r.clientHeight;
        return Math.min(window.clientHeight() - a, Math.max(Math.max(0, e), de + n.offsetHeight + t.offsetTop))
    }

    function a(e, t, n) {
        var a, i, o = geByClass1(e, t);
        (0, ie.initDraggable)(o, {
            onStartDrag: function(e, t) {
                addClass(bodyNode, "cursor_ns_resize"), a = t, i = t
            },
            onDrop: function() {
                removeClass(bodyNode, "cursor_ns_resize")
            },
            onDrag: function(e, o) {
                var s = r(i - a + o, t);
                (0, q.setClassicChatHeight)(s), n().fixHeight()
            }
        })
    }

    function i(e, t) {
        (0, ie.removeDraggable)(geByClass1(e, t))
    }

    function o(e) {
        hide(e.target)
    }

    function s(e, t, n, r, a, i, o, s, l) {
        removeClass(e, "im-page--history_empty"), f(e, t, n, r, a, i, o, s, l)
    }

    function l(e, t, n, r, a) {
        if (checkEvent(r)) return !0;
        var i = q2ajx(a.getAttribute("href")),
            o = intval(i.msgid);
        o && e.set(z.changePeer.bind(null, e.get().peer, o)).then(function() {
            y(n, t, o, e)
        }), cancelEvent(r)
    }

    function u(e, t, n) {
        var r = (0, K.getTab)(t, n),
            a = (0, z.strHistory)(r.history);
        toggleClass(e, "im-page--history_empty-hist", !a)
    }

    function c(e, t, n, r) {
        if (hasClass(n.target, "_im_mess_marker")) {
            var a = n.target;
            window.tooltips && (0, Q.toArray)(geByClass(q.FAILED_CLASS, t)).map(function(e) {
                return geByClass1("_im_mess_marker", e)
            }).filter(function(e) {
                return e !== a
            }).forEach(function(e) {
                return tooltips.hide(e, {
                    fasthide: !0
                })
            });
            var i = domData(r, "msgid");
            showTooltip(a, {
                content: getTemplate("im_failed_menu", {
                    id: i
                }),
                className: "im-page--failed-tt",
                appendParentCls: "_chat_body_wrap",
                dir: "down",
                noZIndex: !0,
                shift: [12, 8],
                hasover: !0
            })
        }
    }

    function d(e) {
        return geByClass1("_im_peer_history", e)
    }

    function g(e) {
        addClass(e, "im-page--history_empty"), d(e).innerHTML = ""
    }

    function f(e, t, n, r, a, i, o) {
        var s = arguments.length <= 7 || void 0 === arguments[7] ? !0 : arguments[7],
            l = arguments.length <= 8 || void 0 === arguments[8] ? !1 : arguments[8],
            c = (t.get().tabs || {})[n];
        a().hideError(), i.renderPeer(t);
        var d = geByClass1("_im_peer_history", e);
        if (!t.get().tabHistoryNotChanged) {
            val(geByClass1("_im_page_peer_name", e), c.tab);
            var g = (0, z.strHistory)(c.history);
            u(e, t, n), g || (g = getLang("mail_im_here_history")), val(d, g), getAudioPlayer().updateCurrentPlaying(), (0, q.isClassicInterface)(t) || (0, q.fixTableCellChildHeight)("_chat_body_wrap", e), D(t, r, e)
        }(0, z.isSearchingInplace)(n, t.get()) ? a().showSearch(t): a().cancelSearch(t, !1), o.changePeer(n, t), t.get().msgid ? y(r, e, t.get().msgid, t) : c.scrollBottom && s ? ! function() {
            r.scrollTop(c.scrollTop);
            var n = (0, q.isMessagesVisible)(t, e, r),
                a = G(n, 1),
                i = a[0];
            c.skipped || setTimeout(function() {
                c.unread && !i && w(t, e, !0), _(t, r, e)
            }, 100)
        }() : b(r, e, a, t, l) || r.scrollBottom(se)
    }

    function m(e, t) {
        var n = t.scrollTop(),
            r = t.scrollBottom(),
            a = e.get().peer;
        e.set(z.saveHistoryScroll.bind(null, a, n, r))
    }

    function p() {
        return V.screenfull.isFullscreen
    }

    function _(e, t, n) {
        var r = (0, K.isGoToEndVisible)(e),
            a = 4 * t.getScrollHeight();
        t.scrollBottom() > a && !r && w(e, n, !0, 2 * t.getScrollHeight())
    }

    function h(e, t, n, r, a, i, o, s) {
        if ((e.get().history_init || (e.get().history_init = !0, !(s.scrollTop() >= 0))) && !p() && (a.update(s), a.show(), 0 !== e.get().peer && (0, q.isFullyLoadedTab)(e.get(), e.get().peer) && !(layers.visible || e.get().showed && (0, q.isClassicInterface)(e)))) {
            var l = (0, K.isGoToEndVisible)(e),
                u = (0, K.getTab)(e, e.get().peer);
            u && !u.skipped && 0 > o ? _(e, s, i) : o > 0 && !u.skipped && !u.unread && F(e, i), E(e, s) && (l && u && !u.skipped && F(e, i), u.unread > 0 && v(e));
            var c = (0, q.wrapLoading)(n);
            if ((0, z.isSearchingInplace)(e.get().peer, e.get()) || r(s), !Te && (0 > o || 0 === s.scrollBottom()) && s.scrollBottom() < oe) {
                if ((0, z.isSearchingInplace)(e.get().peer, e.get())) return;
                if (u.skipped > 0) {
                    var i = gpeByClass("_im_page_history", i),
                        d = e.get();
                    Te = !0;
                    var g = e.set(z.loadLessHistory).then(t().loadHistory.bind(null, d.peer, {
                        reversed: !0
                    })).then(function() {
                        v(e), Te = !1, w(e, i), u.skipped || e.set(z.changePeer.bind(null, e.get().peer, !1))
                    });
                    return A(i, !0), void g.then(A.bind(null, i, !1))
                }
            }
            if (!Te && s.scrollTop() < oe) {
                if ((0, z.isSearchingInplace)(e.get().peer, e.get())) {
                    Te = !0;
                    var f = t().getSearchResulstModule();
                    return f.isAll(e) ? void(Te = !1) : void c(f.loadMore(e).then(function(n) {
                        Te = !1, n && (t().loadHistory(e.get().peer, {}, e, n), r(s))
                    }), "up")
                }
                var d = e.get();
                u.allShown || (Te = !0, c(e.set(z.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, d.peer, {})).then(function() {
                    Te = !1, r(s)
                }), "up"))
            }
        }
    }

    function v(e) {
        return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void 0 : e.set(z.readLastMessages.bind(null, e.get().peer))
    }

    function b(e, t, n, r, a) {
        var i = geByClass1("_im_unread_bar_row", t);
        if (i) {
            var o = i.getBoundingClientRect(),
                s = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
            return (0, q.isClassicInterface)(r) && (s += 47), e.scrollTop(e.scrollTop() - s + o.top), setTimeout(function() {
                h(r, n, d(t), function() {}, a, t, 0, e)
            }, 80), v(r), !0
        }
        return !1
    }

    function y(e, t, n, r) {
        var a = geByClass1("_im_mess_" + n, t);
        if (a) {
            var i = (0, q.isClassicInterface)(r) ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                o = a.offsetTop + domPN(a).offsetTop + domPN(domPN(a)).offsetTop + domPN(domPN(domPN(a))).offsetTop;
            e.scrollTop(o - e.getScrollHeight() / 2 + i / 2), addClass(a, "im-mess_light"), setTimeout(function() {
                removeClass(a, "im-mess_light")
            }, ue)
        }
    }

    function C(e) {
        var t = geByClass1(be, e);
        val(t, "")
    }

    function T(e, t) {
        if ((0, q.isClassicInterface)(e)) {
            var n = e.get().peer;
            if (0 !== n && !(0, q.isChatPeer)(n) && (0, q.isFullyLoadedTab)(e, n)) {
                var r = e.get().tabs[n];
                if (!r.online && !(0, z.isSearchingInplace)(n, e.get())) {
                    var a = r.typing && Object.keys(r.typing).length > 0;
                    if (!a) {
                        var i = geByClass1(be, t),
                            o = geByClass1(ye, i),
                            s = (0, q.getLastTime)(e, n, !0, !0),
                            l = s.str,
                            u = s.time;
                        if (o) {
                            var c = domData(o, "rdate"),
                                d = domData(o, "peer");
                            (c !== u || n !== intval(d)) && (val(o, l), domData(o, "rdate", u), domData(o, "peer", n))
                        } else l = '<div class="' + ye + ' im-page--lastact" data-rdate="' + u + '">' + l + "</div>", val(i, l)
                    }
                }
            }
        }
    }

    function S(e, t, n, r, a) {
        var i = domData(a, "action"),
            o = domData(a, "msgid"),
            s = geByClass1("_im_mess_marker", geByClass1("_im_mess_" + o));
        switch (i) {
            case "resend":
                t(r, a);
                break;
            case "delete":
                e.set(z.removeFailed.bind(null, e.get().peer, o)).then(function() {
                    (0, q.removeMessages)([o], d(n))
                })
        }
        tooltips.hide(s, {
            fasthide: !0
        })
    }

    function E(e, t) {
        return (0, K.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
    }

    function w(e, t, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3],
            a = e.get().peer;
        if (!(0, q.isReservedPeer)(a)) {
            var i = e.get().tabs[a],
                o = geByClass1(pe, t),
                s = geByClass1("_im_to_end_label", o);
            n && i.unread > 0 ? val(s, getLang("mail_im_new_messages", i.unread)) : val(s, getLang("mail_im_to_end_new"));
            var l = !1;
            (n || i.skipped > 0) && !(0, z.isSearchingInplace)(e.get().peer, e.get()) ? (l = !0, addClass(o, "im-to-end_shown")) : B(o, !0), e.set(z.updateGoToEndVisibility.bind(null, [l, intval(r)]))
        }
    }

    function I(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        if (0 === e.scrollTop() && 0 === e.scrollBottom()) return !1;
        var n = e.scrollBottom();
        return (t ? le + t : le) > n
    }

    function k(e, t, n, r) {
        var a = domData(r, "msgid"),
            i = e.get().peer;
        e.get().imQueueResend(i, a).then(function(t) {
            e.get().longpoll.push([(0, ae.resendEvent)(i, t.mess)])
        })
    }

    function P(e, t, n, r, a) {
        var i = intval(domData(a, "peer")),
            o = intval(domData(gpeByClass("_im_mess", a), "msgid")),
            s = e.get().tabs[i].hash;
        return (0, z.restoreMessageSend)(o, i, s, e.get().gid), e.set(z.restoreMessage.bind(null, o, i)).then(q.restoreMessage.bind(null, o, i, d(t))).then(function() {
            return D(e, n, t)
        }), !1
    }

    function M(e, t) {
        e().showCreation(t)
    }

    function L(e, t, n) {
        cancelStackFilter("forward"), e.set(z.prepareForward.bind(null, [])).then(function() {
            t().changePeer(!1, e), removeClass(n, "im-page--history_fwd"), e.get().longpoll.push([(0, ae.transitionEvent)("default")])
        })
    }

    function A(e, t) {
        var n = geByClass1(pe, e);
        toggleClass(n, "im-to-end_loading", t)
    }

    function O(e, t, n, r) {
        var a = t.get().tabs[t.get().peer];
        return a.skipped ? (A(n, !0), void t.set(z.changePeer.bind(null, t.get().peer, !1)).then(function(e) {
            return t.set(z.loadPeer.bind(null, t.get().peer, !0, -1, !1))
        }).then(function(r) {
            A(n, !1), e().changePeer(t, !1, !1), v(t)
        })) : (r.scrollBottom(se), w(t, n), void v(t))
    }

    function D(e, t, n) {
        var a = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
        if ((0, q.isClassicInterface)(e)) {
            var i = t.contHeight(),
                o = geByClass1("_im_chat_input_w", n),
                s = o.offsetHeight - o.clientHeight,
                l = geByClass1("_im_chat_resize", n),
                u = geByClass1("_im_chat_input_parent", n);
            if (a = a !== !1 ? a : (0, q.getClassicChatHeight)(), a !== !1 && a > 0) {
                var c = r(a, n),
                    d = c - u.offsetHeight;
                l.style.height = window.clientHeight() - c - s + "px", setStyle(o, {
                    top: d + "px",
                    bottom: "auto"
                })
            } else l.style.height = "0px", setStyle(o, {
                top: "auto",
                bottom: "0px"
            });
            var g = geByClass1("_im_peer_history_w", n);
            return setStyle(g, {
                borderBottomWidth: o.offsetHeight - fe - 1
            }), t.contHeight() - i
        }(0, q.fixTableCellChildHeight)("_chat_body_wrap", n);
        var i = t.getScrollHeight();
        t.update(!1, !0);
        var f = t.getScrollHeight();
        return i - f
    }

    function x(e, t, n, r) {
        var a = t.offsetHeight;
        r(), e.heightIncreased(t.offsetHeight - a, n)
    }

    function R(e, t) {
        var n = t.getBoundingClientRect().top;
        showTooltip(t, {
            className: "im-page--admin-tt",
            text: getLang("mail_only_admin_see"),
            appendParentCls: "_chat_body_wrap",
            shift: [20, 5],
            dir: "auto",
            showdt: 400,
            noZIndex: !0,
            toup: n > 200
        })
    }

    function B(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
        t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast"))
    }

    function F(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            r = geByClass1(pe, t);
        e.set(z.updateGoToEndVisibility.bind(null, [!1, 0])), B(r, n)
    }

    function N(e, t, n) {
        V.screenfull.isFullscreen || 0 === t.get().peer || (0, q.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
    }

    function j(e, t, n, r, a, o, l, u, c, p, _, h, v, b, S) {
        var k, P = throttle(function() {
            n.smoothScroll.apply(n, arguments)
        }, 300);
        return {
            changePeer: function(e) {
                var i = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1],
                    l = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
                if (0 === e.get().peer && S.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return g(t, e);
                if ((0, q.isFullyLoadedTab)(e.get(), e.get().peer)) {
                    removeClass(t, "im-page--history_search"), e.set(z.dropSelection), r.changeActions(e);
                    var c = e.get().peer,
                        d = e.get().prevPeer;
                    return removeClass(t, "im-page--history_loading"), i && a.restoreDraft(e), o().updateTyping({
                        peerId: c
                    }, e), w(e, t), (0, q.isClassicInterface)(e) && (C(t), T(e, t)), 0 !== d || (0, q.isReservedPeer)(c) ? (0, q.isReservedPeer)(d) || (0, q.isReservedPeer)(c) ? void 0 : (f(t, e, c, n, o, r, u, l, S), void S.reset(n)) : (s(t, e, c, n, o, r, u, l, S), void S.reset(n))
                }
            },
            saveScroll: function(e) {
                return m(e, n)
            },
            loadingPeer: function(e) {
                (0, z.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
            },
            deselectDialog: function(e) {
                l().removeSelection(e)
            },
            replaceMessageAttrs: function(e, n) {
                (0, q.replaceMessageAttrs)(n.get(), d(t), e)
            },
            cleanSelection: function(e) {
                p.cleanSelection(e)
            },
            updateDialogFilters: function(e) {
                l().updateDialogFilters(e)
            },
            getSearchResulstModule: function() {
                return k
            },
            insertSearch: function(e, r) {
                k || (k = (0, J.mount)(t, r, o)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), d(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), d(t).innerHTML = (0, q.renderEmptySearch)()), D(r, n, t), n.scrollBottom(0), w(r, t), S.reset(n)
            },
            updateChatTopic: function(e, t) {
                l().updateDialog(e, t), e === t.get().peer && r.renderPeer(t)
            },
            updateActions: function(e) {
                r.changeActions(e)
            },
            updateChatPhoto: function(e, a, i) {
                if ((0, q.isPeerActive)(e.peerId, i.get())) {
                    i.get().tabs[e.peerId], r.renderPeer(i);
                    var o = I(n);
                    (0, q.addChatPhotoToUpdate)(e, a, i.get(), d(t)), o && n.scrollBottom(se)
                }
            },
            markImportant: function(e, n, a) {
                var i = geByClass1("_im_mess_" + e, t);
                i && (r.changedMessageSelection(a), c.markImportant(e, n, a))
            },
            isNewMessagesVisible: function(e) {
                return E(e, n)
            },
            loadHistory: function(e, r, a) {
                var i = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
                    o = a.get();
                if ((0, q.isPeerActive)(e, o)) {
                    var s, l, u, c, d, g, f = function() {
                        if (s = i || o.tabs[e].historyToAppend, !s) return {
                            v: void 0
                        };
                        l = geByClass1("_im_peer_history", t), u = domFC(l), c = n.scrollBottom(), d = geByClass1(q.TYPING_CLASS, l), g = r.reversed ? function(e) {
                            return l.appendChild(e)
                        } : function(e) {
                            return l.insertBefore(e, u)
                        };
                        var a = 0;
                        r.reversed && (a = l.offsetHeight);
                        var f = sech(s),
                            m = document.createDocumentFragment();
                        f.forEach(function(e) {
                            return m.appendChild(e)
                        }), g(m), r.reversed && S.heightIncreased(l.offsetHeight - a, n), r.reversed || n.scrollBottom(c), n.update(!1, !0);
                        var p = f.filter(function(e) {
                            return hasClass(e, "_im_bar_date")
                        });
                        S.parseMore(p, n)
                    }();
                    if ("object" === ("undefined" == typeof f ? "undefined" : U(f))) return f.v
                }
            },
            sendMessage: function(e) {
                0 !== e.get().peer && a.sendMessage()
            },
            addMessage: function(e, r) {
                if (!(0, z.isSearchingInplace)(r.peerId, e.get())) {
                    if ((0, q.isPeerActive)(r.peerId, e.get())) {
                        var a, i = function() {
                            if (geByClass1("_im_mess_" + r.messageId, t)) return {
                                v: void 0
                            };
                            var i = d(t);
                            if (x(S, i, n, function() {
                                    var a = I(n),
                                        s = geByClass1("_im_unread_bar_row", t),
                                        l = (0, q.isMessagesVisible)(e, t, n),
                                        u = G(l, 2),
                                        c = u[0],
                                        d = u[1];
                                    (0, q.appendToHistory)(e.get(), r, i, !0, !0, !c && !s), removeClass(t, "im-page--history_empty-hist");
                                    var g = (0, K.getTab)(e, e.get().peer);
                                    g.skipped || c || !(0, W.isUnread)(r) || (0, W.isOut)(r) || w(e, t, !0, d), (r.local || a || (0, q.isServiceMsg)(r) && r.userId === vk.id) && n.scrollBottom(0), o().updateTyping(r, e), (0, Q.toArray)(geByClass("_im_history_tooltip", t)).forEach(hide)
                                }), a = domPS(domLC(i)), hasClass(a, "_im_bar_date")) {
                                var s = ce("div");
                                s.innerHTML = a.outterHTML, S.parseMore(s, n)
                            }
                            o().hideError(), S.update(n)
                        }();
                        if ("object" === ("undefined" == typeof i ? "undefined" : U(i))) return i.v
                    }(0, z.updateMentions)(e.get())
                }
            },
            setMessageErrored: function(e, n, r, a) {
                r && o().showError(r), (0, q.setMessageError)(e, n, t)
            },
            markMessagesAsRead: function(e, n) {
                e.get().peer === n.peerId && (0, q.markMessagesAsRead)(e.get(), n.peerId, t)
            },
            hideFwd: function(e) {
                removeClass(t, "im-page--history_fwd")
            },
            updateTyping: function(e, n) {
                if (!(0, z.isSearchingInplace)(e.peerId, n.get())) {
                    var r = n.get();
                    if (n.get().peer === e.peerId && (0, q.isFullyLoadedTab)(r, e.peerId)) {
                        var a = (0, q.formatTyper)(n.get().tabs[e.peerId].typing, e.peerId, !1, n.get()),
                            i = geByClass1(q.TYPING_CLASS, t);
                        if (i || a) {
                            if (!i) {
                                var s = geByClass1(be, t);
                                val(s, getTemplate("im_typing", {
                                    cls: (0, q.isClassicInterface)(n) ? "im-typing_classic" : ""
                                })), i = geByClass1(q.TYPING_CLASS, t)
                            }
                            val(geByClass1("_im_typing_name", i), a), a ? (addClass(i, "im-page--typing_vis"), o().hideError()) : removeClass(i, "im-page--typing_vis")
                        }
                    }
                }
            },
            scrollFix: function(e, t, r) {
                S.heightIncreased(r, n), S.update(n), (0, q.isPeerActive)(t, e.get()) && I(n, r) && n.scrollBottom(se)
            },
            updateGoToEnd: function(e, r) {
                var a = (0, K.getTab)(e, e.get().peer);
                a && a.skipped ? w(e, t) : F(e, t, r), _(0, n)
            },
            newMessage: function(e) {
                l().newMessage(e), F(e, t, !0)
            },
            scroll: function(e, t) {
                var r = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
                    a = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
                if (0 !== e.get().peer) {
                    var i = r ? n.getScrollHeight() : 40;
                    a === !0 && (i = n.contHeight()), i = "up" === t ? -i : i, r || a ? P(i, function() {
                        _(i, n)
                    }) : (n.scrollTop(n.scrollTop() + i), _(i, n))
                }
            },
            showCreation: function(e, t) {
                l().showCreation(e, t)
            },
            updateScroll: function() {
                return D(h, n, t)
            },
            toggleBarDate: function(e) {
                S.toggle(e)
            },
            changedMessageSelection: function(e) {
                r.changedMessageSelection(e)
            },
            updateOnline: function(e, n) {
                if ((0, q.isTabLoaded)(n.get(), e)) {
                    var a = n.get().tabs[e].online;
                    if (e === n.get().peer) {
                        var i = geByClass1("_im_peer", t);
                        toggleOnline(i, a), r.renderPeer(n), a ? C(t) : T(n, t)
                    }
                }
            },
            isEmpty: function(e) {
                return a.isEmpty(e)
            },
            replaceAttachmentPlaceholders: function(e, r) {
                (0, q.isPeerActive)(r.peerId, e.get()) && (x(S, d(t), n, function() {
                    var a = I(n);
                    (0, q.replaceAttaches)(t, r, e.get()), a && n.scrollBottom(0)
                }), S.update(n))
            },
            removeMessages: function(e, r, a) {
                a.get().peer === r && ((0, q.removeMessages)(e, d(t)), D(a, n, t))
            },
            hideGoToEnd: function(e) {
                F(h, t, e)
            },
            removeMessagesRestore: function(e, n, r, a) {
                a.get().peer === n && (0, q.removeMessagesWithRestore)(e, n, r, d(t))
            },
            updateState: function(e, t) {
                l().updateState(e, t)
            },
            updateChat: function(e, t) {
                e.get().peer === t && (e.get().tabs[t], r.changeActions(e), r.renderPeer(e), a.updateState(e), (0, z.updateMentions)(e.get()))
            },
            focustTxt: function(e) {
                a.focusOn(e)
            },
            showSearch: function(e) {
                addClass(t, "im-page--hisory_search-open"), u.focus(e)
            },
            cancelSearch: function(e) {
                var a = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                if (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), r.changedMessageSelection(e), k && (k.unmount(), k = !1), a && !(0, q.isReservedPeer)(e.get().peer)) {
                    var i = e.get().tabs[e.get().peer];
                    d(t).innerHTML = (0, z.strHistory)(i.history), D(e, n, t), n.scrollBottom(0), e.get().msgid && (y(n, t, e.get().msgid, e), w(e, t)), v(n), S.reset(n)
                }
            },
            updateHistory: function(e) {
                0 !== h.get().peer && e(t)
            },
            unmount: function() {
                (0, Y.destroyModule)(e), n.destroy(), clearInterval(b), a.unmount(), r.unmount(), c.unmount(), p.unmount(), u.unmount(), cancelStackFilter("forward"), i("_im_chat_resize_track", t)
            },
            removePeer: function(e, t) {
                l().removePeer(e, t)
            },
            restoreScroll: function(e, t) {
                var r = e.get().tabs[t];
                r.scrollBottom ? n.scrollTop(r.scrollTop) : n.scrollBottom(se)
            },
            resendMessage: function(e, n) {
                e === h.get().peer && (0, q.startResendMessage)(e, n, t)
            },
            respond: function(e, t) {
                a.attachMessages(e, t), a.focusOn(e), n.scrollBottom(se), v(n)
            },
            startForward: function(e) {
                addClass(t, "im-page--history_fwd"), geByClass1("_im_explain_fwd", t).textContent = getLang("mail_explain_fwd", e.get().pendingForward.length), l().cancelSearch(e), l().removeSelection(e), cancelStackPush("forward", function() {
                    return L(e, l, t)
                })
            },
            cancelRecording: function() {
                a.cancelRecording()
            },
            hideError: function() {
                hide(geByClass1(Ce, t))
            },
            showError: function(e) {
                geByClass1(Ce, t).innerHTML = e, show(geByClass1(Ce, t)), n.scrollBottom(se)
            }
        }
    }

    function H(e, t, n) {
        var r = geByClass1("_im_peer_history_w", e);
        show(r);
        var i = (0, Y.createMutations)(j),
            s = i.callMutations,
            g = i.bindMutations,
            f = function(e) {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return function(e) {
                    t(e), n(e)
                }
            }(m.bind(null, t)),
            p = (0, re.mount)(t, e),
            _ = h.bind(null, t, s, r, f, p, e),
            v = (0, ne.createScroll)(geByClass1("_im_chat_body_abs", e), {
                onScroll: _,
                nativeScroll: (0, q.isClassicInterface)(t),
                shadows: !1
            });
        setTimeout(function() {
            t.get().peer && (t.get().msgid ? y(v, e, t.get().msgid, t) : b(v, e, s, t, p) || v.scrollBottom(se), t.get().history_init = !1, p.reset(v), w(t, e), h(t, s, r, f, p, e, 0, v))
        }, 15);
        var C = (0, X.mount)(geByClass1("_im_dialog_actions", e), t, s),
            E = (0, Z.mount)(geByClass1("_im_text_input", e), t, s),
            I = (0, $.mount)(geByClass1("_im_dialog_actions", e), t, s),
            A = (0, ee.mount)(e, t, s),
            D = (0, te.mount)(e, t, function() {
                return {
                    changedMessageSelection: C.changedMessageSelection
                }
            });
        (0, q.isReservedPeer)(t.get().peer) || t.set(z.restoreHistoryQueue.bind(null, t.get().peer)).then(function(n) {
            (0, q.restoreQueue)(t.get().peer, t.get(), d(e)), u(e, t, t.get().peer)
        }), a("_im_chat_resize_track", e, n);
        var x = k.bind(null, t, e),
            B = P.bind(null, t, e, v),
            F = L.bind(null, t, n, e),
            H = M.bind(null, n, t),
            U = O.bind(null, s, t, e, v),
            G = c.bind(null, t, e),
            K = S.bind(null, t, x, e),
            W = q.showChatMembers.bind(null, t, s, z.setCreationType),
            Q = l.bind(null, t, e, v),
            J = N.bind(null, s, t, v),
            ae = q.hideTopNotice.bind(null, t),
            ie = (0, Y.createModule)({
                handlers: function(t, n) {
                    n(e, "click", q.RESTORE_CLASS, B), n(e, "mouseover click", q.FAILED_CLASS, G), n(e, "click", me, F), n(e, "click", _e, K), n(e, "click", q.SHOW_CHAT_MEMBERS_CLASS, W), n(e, "click", he, Q), n(e, "click", q.HIDE_TOP_NOTICE_CLASS, ae), n(e, "mouseover", ve, R), n(e, "click", Ce, o), t(geByClass1("_im_peer_history_w", e), "mousemove", p.show), t(geByClass1("_im_start_new", e), "click", H), t(geByClass1(pe, e), "click", U), V.screenfull.raw && t(document, V.screenfull.raw.fullscreenchange, J)
                }
            }),
            oe = setInterval(T.bind(null, t, e), 1e3);
        return g(ie, e, v, C, E, s, n, I, A, D, _, t, f, oe, p)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        G = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
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
    t.mount = H;
    var z = n(1),
        q = n(3),
        K = n(5),
        W = n(16),
        V = n(84),
        Q = n(10),
        Y = n(2),
        X = n(60),
        Z = n(73),
        $ = n(66),
        J = n(37),
        ee = n(40),
        te = n(38),
        ne = n(30),
        re = n(61),
        ae = n(4),
        ie = n(78),
        oe = 1e3,
        se = -30,
        le = 30,
        ue = 2e3,
        de = 700,
        fe = 15,
        me = "_im_cancel_fwd",
        pe = "_im_to_end",
        _e = "_im_failed_action",
        he = "_im_mess_link",
        ve = "_im_admin_name",
        be = "_im_typer_c",
        ye = "_im_last_hist_act",
        Ce = "_im_error",
        Te = !1
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        var a = '<td class="im_cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
        return new Promise(function(e) {
            stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                var t = new Datepicker(n, {
                    width: 140,
                    resfmt: "plain",
                    addRows: '<tr id="im_day_clear">' + a + "</tr>",
                    addRowsM: '<tr id="im_month_clear">' + a + "</tr>",
                    onUpdate: r
                });
                e(t)
            })
        })
    }

    function a(e, t, n, r, a) {
        return {
            focus: function(e) {
                uiSearch.focus(t), l(e, t, n, r)
            },
            changePeer: function(e, n) {
                uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
            },
            unmount: function() {
                (0, m.destroyModule)(a), cancelStackFilter(p), r.then(function(e) {
                    return e.destroy()
                })
            }
        }
    }

    function i(e, t, n, r) {
        e.set(f.setCurrentSearchDate.bind(null, e.get().peer, r.d + "." + r.m + "." + r.y)).then(s.bind(null, e, t, n))
    }

    function o(e, t) {
        e.then(function(e) {
            triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
        })
    }

    function s(e, t, n) {
        e.get().peer, uiSearch.showProgress(n), (0, f.searchMessagesInplace)(e.get().peer, e.get()).then(function(r) {
            uiSearch.hideProgress(n), t().insertSearch(r, e)
        })["catch"](function(e) {
            uiSearch.focus(n), uiSearch.hideProgress(n)
        })
    }

    function l(e, t, n, r) {
        cancelStackPush(p, c.bind(null, e, t, n, r))
    }

    function u(e, t, n, r, a, i) {
        if ("keyup" !== i.type || 13 == i.which) {
            var o = clean(uiSearch.getFieldEl(t).value);
            e.set(f.setCurrentSearch.bind(null, o, e.get().peer)).then(a.bind(null, e, r, t))
        }
    }

    function c(e, t, n, r) {
        cancelStackFilter(p), r.then(function(e) {
            e.hide()
        }), e.set(f.cancelSearch.bind(null, e.get().peer)).then(function() {
            uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
        })
    }

    function d(e, t, n, r) {
        n.then(function(e) {
            e.hide()
        }), e.set(f.clearDate.bind(null, e.get().peer)).then(s.bind(null, e, t, r))
    }

    function g(e, t, n) {
        var l = geByClass1(h, e),
            g = geByClass1(v, e),
            f = i.bind(null, t, n, g),
            p = r(t, e, l, f),
            T = o.bind(null, p, e),
            S = u.bind(null, t, g, l, n, debounce(s, 300)),
            E = c.bind(null, t, g, n, p),
            w = d.bind(null, t, n, p, g),
            I = (0, m.createModule)({
                handlers: function(t, n) {
                    t(geByClass1(_, e), "click", T), t(uiSearch.getFieldEl(g), "keyup", S), t(geByClass1(b, e), "click", S), t(geByClass1(y, e), "click", E), n(e, "click", C, w)
                }
            });
        return a(e, g, n, p, I)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var f = n(1),
        m = n(2),
        p = "im_hist_search",
        _ = "_im_search_date",
        h = "_im_search_date_input",
        v = "_im_search_history_input",
        b = "_im_start_inplace_search",
        y = "_im_cancel_inplace_search",
        C = "_im_clear_date"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.which || e.keyCode
    }

    function i(e, t) {
        var t = e.get().tabbedPeers[t];
        t && e.get().longpoll.push([(0, f.changePeer)(t.peer, !1, !0, !0)])
    }

    function o(e, t, n) {
        !n || inArray(a(n), c.UNPRINTABLE_KEYS) || (0, d.isSearchingInplace)(e.get().peer, e.get()) || (0, g.isEditableFocused)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
    }

    function s(e, t, n) {
        a(n) === c.ENTER && e.signal(a(n), n)
    }

    function l(e, t, n, r) {
        var o = a(r);
        if (!layers.visible) {
            if (o >= 49 && 57 >= o && (r.ctrlKey || r.metaKey && browser.mac) && (0, g.isClassicInterface)(t)) return i(t, o - 49), cancelEvent(r);
            inArray(o, c.UP_DOWN_CONTROLS) && e.signal(o, r)
        }
    }

    function u(e, t) {
        var n = browser.mozilla ? "keydown" : "keypress",
            r = (0, p["default"])({
                signalTimer: !1
            }),
            a = o.bind(null, e, t),
            i = l.bind(null, t, e, r),
            u = s.bind(null, t, r),
            c = (0, _.createModule)({
                handlers: function(e, t) {
                    e(document, "keydown", i), e(document, "keyup", u), e(document, n, a)
                }
            });
        return {
            unmount: function() {
                (0, _.destroyModule)(c)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = u;
    var c = n(9),
        d = n(1),
        g = n(3),
        f = n(4),
        m = n(6),
        p = r(m),
        _ = n(2)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t, n) {
        var r = n.reduce(function(e, t) {
            return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
        }, {});
        Object.keys(r).forEach(function(n) {
            var a = r[n];
            e.set(ne.removeMessages.bind(null, a, n)).then(function() {
                t.removeMessages(a, intval(n), e)
            })
        })
    }

    function o(e, t, n, r) {
        t.set(ne.updateChatPhoto.bind(null, e)).then(function() {
            var a = e.kludges.source_act;
            n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
        })
    }

    function s(e, t, n, r, i, o, s) {
        e.set(ne.updateActions.bind(null, t, r, n)).then(function() {
            return t === re.CHAT_INVITE_USER ? (r === vk.id && e.set(ne.returnedToChat.bind(null, n)), e.set(ne.loadChatMember.bind(null, a({}, n, [r])))) : e.set(ne.chatKickUser.bind(null, n, i, r))
        }).then(function() {
            e.get().peer === n && (s.updateChat(e, n), o.updateDialog(n, e))
        })
    }

    function l(e, t) {
        "spam" === t ? (0, re.showSpamLayer)(e, X.mount, {}) : "fav" === t && (0, re.showFavvedBox)(e, {}, ae.mount, {})
    }

    function u(e, t) {
        if (e.get().gid) {
            var n = t.parentNode,
                r = geByClass("_im_right_menu_counter", n),
                a = e.get().dialog_tab_cts;
            r.forEach(function(e) {
                var t = domData(e, "tab");
                val(e, a[t] || "")
            })
        }
    }

    function c(e, t, n, r) {
        e.set(ne.cancelRecording).then(function(e) {
            n.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(r, "im-page_history-show");
        var a = e.get().peer;
        e.set(ne.changePeer.bind(null, 0, !1)).then(function() {
            (0, re.isClassicInterface)(e) && t.activate(), n.changePeer(e), (0, re.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(function() {
                e.get().longpoll.push([Q.eventTypes.transitionEvent("search")])
            }, 13), (0, re.isLocksAvailable)(e) && (0, re.isPeerBlockedByMe)(a, e) && e.set(ne.releaseBlock.bind(null, a))
        })
    }

    function d(e, t, n, r, a) {
        e.forEach(function(e) {
            var i = e.kludges.source_act,
                l = intval(e.kludges.source_mid);
            switch (i) {
                case re.CHAT_PHOTO_REMOVE:
                case re.CHAT_PHOTO_UPDATE:
                    o(e, t, n, r);
                    break;
                case re.CHAT_KICK_USER:
                case re.CHAT_INVITE_USER:
                    s(t, i, e.peerId, l, e.userId, n, r);
                    break;
                case re.CHAT_TITLE_ACTION:
                    var u = e.kludges.source_text;
                    t.set(ne.setChatTitle.bind(null, e.peerId, u)).then(function() {
                        r.updateChatTopic(e.peerId, t), (0, re.isClassicInterface)(t) && a.updateName(e.peerId, t)
                    })
            }
        })
    }

    function g(e, t) {
        return 2e9 > t && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
    }

    function f(e, t) {
        var n = t.flags & Q.eventTypes.FLAG_OUTBOUND,
            r = inArray(t.peerId, e.get().mutedPeers),
            a = t.flags & Q.eventTypes.FLAG_DELETED,
            i = e.get().gid;
        if (!n && !r && !a) {
            var o, s, l = g(t.subject, t.peerId) || "",
                u = (l ? l + " " : "") + t.text || "",
                c = t.userId,
                d = t.peerId,
                f = e.get().tabs[d];
            if ((!e.get().notify_msg && !(0, re.isChatPeer)(d) || i && !e.get().mute) && window.Notifier && Notifier.playSound({
                    author_id: d
                }), !(0, re.isChatPeer)(d)) return;
            u = trim(replaceEntities(stripHTML(u.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), u = u.replace(K.MENTION, function(e, t, n, r, a) {
                return a
            }), (0, re.isChatPeer)(d) ? (o = f.data.members[c].name, f.tab && (o += " » " + f.tab), s = f.data.members[c].photo) : (o = f.tab, s = f.photo);
            var m = t.attaches[0];
            if (m && "fwd" === m.type) u += "\n[" + getLang("mail_added_msgs") + "]";
            else if (m) {
                var p = "doc" === m.type && "graffiti" === m.kind ? "graffiti" : m.type;
                u += "\n[" + getLang("mail_added_" + p) + "]"
            }
            o = trim(replaceEntities(stripHTML((o || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                id: t.messageId,
                text: u,
                author_id: d,
                title: o,
                author_photo: s
            })
        }
    }

    function m(e) {
        var t = e.get().longpoll.push.bind(null, [Q.eventTypes.resetPeer()]);
        cancelStackPush("im_peer", t)
    }

    function p(e, t) {
        var n = e.get().tabs[t.peerId],
            r = e.get().active_tab;
        return r === q.FOLDER_ALL ? !0 : (0, ne.filterFromTab)(r)(n)
    }

    function _(e) {
        var t = e.attaches.filter(function(e) {
            return "sticker" !== e.type
        });
        return (0, re.isServiceMsg)(e) || 0 === t.length
    }

    function h(e, t, n) {
        addClass(n, "im-page_history-show"), t.loadingPeer(e)
    }

    function v(e, t) {
        (0, re.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(ne.forwardMessages.bind(null, e.get().pendingForward, t, cur.imDb)))
    }

    function b(e, t) {
        var n = (0, re.isCommunityInterface)(e) ? fe : me;
        return n += pe, Math.floor((t.offsetHeight - n) / ue)
    }

    function y(e, t) {
        var n = b(e, t);
        if (e.get().tabbedPeers.length > n) {
            var r = function() {
                var t = e.get().tabbedPeers.filter(function(t) {
                        var n = t.peer;
                        return intval(n) !== e.get().peer
                    }),
                    r = t.map(function(t) {
                        var n = t.peer;
                        return e.get().tabs[n]
                    }),
                    a = r.sort(function(e, t) {
                        return t.last_touched - e.last_touched
                    }),
                    i = [];
                0 !== e.get().peer && i.push(e.get().tabs[e.get().peer]);
                var o = i.concat(a).slice(n).map(function(e) {
                        return e.peerId
                    }),
                    s = e.get().tabbedPeers.filter(function(e) {
                        return !inArray(e.peer, o)
                    });
                return {
                    v: e.set(ne.updateTabbedPeers.bind(null, s, !0))
                }
            }();
            if ("object" === ("undefined" == typeof r ? "undefined" : B(r))) return r.v
        }
        return Promise.resolve(e)
    }

    function C(e, t, n, r, a, i, o, s, l) {
        e.set(ne.cancelRecording).then(function() {
            r.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.forward && r.hideFwd(e), (0, te.isSearching)(e) && t.cancelSearch && (a.clearSearch(e), n.restoreDialogs(e)), T(e, s, l), h(e, r, i);
        var u = e.get().peer;
        (0, ne.updateMentions)(e.get());
        var c = e.set(ne.changePeer.bind(null, t.peerId, t.msgid)).then(function() {
            n.selectPeer(t.msgid, e), (0, re.isClassicInterface)(e) && (n.deactivate(), y(e, i).then(function() {
                return o.updateMenu(e)
            }))
        });
        return c = t.msgid ? c.then(function() {
            return e.set(ne.selectPeerOnMessage.bind(null, t.peerId === u, u))
        }) : c.then(function() {
            return e.set(ne.selectPeer.bind(null, !0))
        }), c.then(function() {
            if (t.forward) {
                var n = e.get().tabs[e.get().peer];
                v(e, e.get().peer), !n.scrollBottom && n.unread && e.set(ne.readLastMessages.bind(null, e.get().peer))
            }(0, re.isClassicInterface)(e) && o.updateMenu(e), r.changePeer(e), r.updateTyping(t, e), (0, ne.updateMentions)(e.get()), m(e)
        })
    }

    function T(e, t, n) {
        t && e.get().shown && (t.hide(e), n().createCanceled(e))
    }

    function S(e, t, n) {
        (0, te.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
    }

    function E(e, t, n, r, a, i, o) {
        (0, re.isClassicInterface)(e) && (a.saveScroll(e), i.saveScroll(e)), r.rotateCross(e), addClass(o, "im-page_creating"), e.setState({
            isCreating: !0
        }), n && n.show(e, t), (0, re.isClassicInterface)(e) && (setStyle(o, {
            height: P(o, e).page
        }), setTimeout(function() {
            addClass(o, "im-page_cropped")
        }, 200)), (0, ne.toggleConversation)(!0)
    }

    function w(e, t, n, r) {
        n && n.hide(e, t)
    }

    function I(e, t, n, r, i, o, s, g, v, b, I, k, P, M, L, A, O, x, R, B) {
        return {
            changePeer: function(e, n) {
                t.selectPeer(e, n)
            },
            cancelSearch: function(e) {
                S(e, r, t)
            },
            loadingPeer: function(e) {
                h(e, n, i)
            },
            restoreDialogs: function(e, n, r) {
                t.restoreDialogs(e, n, r)
            },
            focusSearch: function(e) {
                r.focusInput(e)
            },
            appendSearch: function(e, n, r, a) {
                t.appendSearch(e, n, r, a)
            },
            appendDialogs: function(e, n) {
                t.appendDialogs(e, n)
            },
            showCreation: function(e, a) {
                E(e, a, b, r, t, n, i)
            },
            updateState: function(e, r) {
                t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
            },
            appendFastDialogs: function(e, n) {
                t.appendFastDialogs(e, n, !0)
            },
            createCanceled: function(e, a) {
                r.createCanceled(e, a), (0, re.isClassicInterface)(e) ? (setStyle(i, {
                    height: "auto"
                }), removeClass(i, "im-page_cropped"), setTimeout(function() {
                    return r.focusInput(e)
                }, 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(function() {
                    0 === e.get().peer ? r.focusInput(e) : n.focustTxt(e)
                }, 0), removeClass(i, "im-page_creating"), e.setState({
                    isCreating: !1
                })
            },
            updateMenu: function(e) {
                A && A.updateMenu(e)
            },
            hideFwd: function(e) {
                n.hideFwd(e)
            },
            selectPeer: function(e) {
                n.changePeer(e), m(e)
            },
            updateDialog: function(e, n) {
                t.updateDialog(e, n)
            },
            focusTxt: function(e) {
                n.focustTxt(e)
            },
            resync: function(e) {
                (0, te.isSearching)(e) && r.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), b && b.hide(e), (0, re.isCommunityInterface)(e) && u(e, i), (0, re.isClassicInterface)(e) && e.get().tabbedPeers.forEach(function(t) {
                    var n = t.peer;
                    A.updateCounter(e, n), A.updateName(n, e)
                }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), n.changePeer(e, !1);
                var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                handlePageCount(a, e.get().unread_cnt)
            },
            toggleSettingsLoader: function(e, t) {
                I.toggleLoader(e, t)
            },
            onUserActions: function(e, t) {
                if (!(0, ne.isSearchingInplace)(e.get().peer, e.get())) {
                    var r = e.get(),
                        a = r.peer;
                    if ((0, re.isFullyLoadedTab)(r, a) && !o.is_idle) {
                        var i = (0, te.countUnread)(e.get().peer, e.get());
                        if (i > 0) {
                            var s = r.tabs[a];
                            !s.skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(ne.readLastMessages.bind(null, a)))
                        }
                    }
                }
            },
            removeSelection: function(e) {
                t.removeSelection(e), r.focusInput(e)
            },
            route: function(e, a, o, s) {
                if ("undefined" != typeof e[0]) return !0;
                geByClass1("_im_right_menu", i.parentNode), e.box && (e = {
                    box: e.box
                });
                var u = !1;
                return Object.keys(e).sort().forEach(function(e) {
                    switch (e) {
                        case "sel":
                            u = !0;
                            var a = o.sel ? (0, re.unUrlPeer)(o.sel) : 0;
                            0 === a ? k.get().longpoll.push([Q.eventTypes.resetPeer()]) : k.get().longpoll.push([Q.eventTypes.changePeer(a)]);
                            break;
                        case "tab":
                            T(k, b, v), u = !0;
                            var s = o.tab || q.FOLDER_ALL;
                            k.get().longpoll.push([Q.eventTypes.changeTab(s)]);
                            break;
                        case "act":
                            o.act && "create" === o.act ? E(k, [], b, r, t, n, i) : w(k, [], b, i);
                            break;
                        case "q":
                            o.q ? r.setSearch(k, o.q) : r.clearSearch(k);
                            break;
                        case "box":
                            l(k, o.box)
                    }
                }), (0, re.isClassicInterface)(k) && "undefined" == typeof e.sel && A.updateMenu(k), u && S(k, r, t), !1
            },
            updateDialogFilters: function(e) {
                (0, te.isSearching)(e) || t.restoreDialogs(e), I.updateFilter(e)
            },
            removePeer: function(e, n) {
                t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([Q.eventTypes.resetPeer()]), (0, re.isClassicInterface)(e) && A.updateMenu(e)
            },
            newMessage: function(e) {
                (0, re.isClassicInterface)(e) || t.scrollUp(!0)
            },
            onEvents: function(e, o) {
                var l = (e.get().gid, o),
                    m = o.filter(re.isServiceMsg),
                    h = o.filter(function(e) {
                        return e.type === Q.eventTypes.ADD_MESSAGE
                    });
                d(m, e, t, n, A), e.set(ne.checkNewPeople.bind(null, m, h, s)).then(function() {
                    l.forEach(function(o) {
                        switch (o.type) {
                            case Q.eventTypes.ADD_MESSAGE:
                                var s = e.get().tabs[e.get().peer],
                                    l = !s || !s.msgs || 0 == s.msgs.length,
                                    d = (0, re.isDuplicate)(o, e.get()),
                                    m = (0, te.isCommunityBlocked)(e, o.peerId);
                                if (0 === d) {
                                    o.flags & Q.eventTypes.FLAG_OUTBOUND || e.set(ne.updateFavAndTitle.bind(null, o.peerId, !0)), e.set(ne.addMessage.bind(null, o)), y(e, i), p(e, o) && (f(e, o), t.updateTyping(o, e), (0, te.isSearching)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o));
                                    var h = (0, te.isCommunityBlocked)(e, o.peerId);
                                    h === !1 && m === !0 && n.updateActions(e), (0, re.isClassicInterface)(e) && (A.updateCounter(e, o.peerId), A.updateMenu(e)), n.updateTyping(o, e), n.addMessage(e, o), (0, re.isClassicInterface)(e) || I.updateFilter(e), _(o) || !(0, re.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(ne.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    })
                                } else 2 === d && (_(o) || e.set(ne.loadMedia.bind(null, o)).then(function(e) {
                                    n.replaceAttachmentPlaceholders(e, o)
                                }), e.set(ne.replaceMessage.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e));
                                s && l && B();
                                break;
                            case Q.eventTypes.READ_INBOUND:
                                e.set(ne.markInboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o), n.updateGoToEnd(e, !0), (0, re.isClassicInterface)(e) && A.updateCounter(e, o.peerId), (0, te.isSearching)(e) || t.restoreDialogs(e), I.updateFilter(e)
                                });
                                break;
                            case Q.eventTypes.READ_OUTBOUND:
                                e.set(ne.markOutboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o), n.markMessagesAsRead(e, o)
                                });
                                break;
                            case Q.eventTypes.UNREAD_COUNT:
                                e.set(ne.updateUnreadCount.bind(null, o.count)).then(function() {
                                    var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                    handlePageCount(t, o.count), I.updateFilter(e), (0, re.isClassicInterface)(e) && u(e, i)
                                });
                                break;
                            case Q.eventTypes.GOT_ONLINE:
                            case Q.eventTypes.GOT_OFFLINE:
                                var T = o.type === Q.eventTypes.GOT_ONLINE;
                                e.set(ne.updateOnline.bind(null, o.userId, T)).then(function(e) {
                                    (0, re.isTabLoaded)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                });
                                break;
                            case Q.eventTypes.SET_FLAGS:
                            case Q.eventTypes.RESET_FLAGS:
                                if (o.flags !== Q.eventTypes.FLAG_DELETED || o.type !== Q.eventTypes.SET_FLAGS || (0, re.isAlreadyDeleted)(e, o.peerId, o.messageId) || e.get().blockedFlagUpdates[o.peerId] || g(o), o.flags === Q.eventTypes.FLAG_IMPORTANT) {
                                    var E = o.type === Q.eventTypes.SET_FLAGS;
                                    e.set(ne.updateImportant.bind(null, E ? 1 : -1, o.messageId)).then(function() {
                                        (0, re.isClassicInterface)(e) || r.updateImportantCnt(e)
                                    }), e.set(ne.updateFavMessage.bind(null, [o.messageId], o.peerId, E)).then(function(t) {
                                        n.markImportant(o.messageId, E, e)
                                    })
                                }
                                break;
                            case Q.eventTypes.TYPING:
                                (0, re.isSelfMessage)(o.peerId, e.get().gid) || (e.set(ne.setTyping.bind(null, o.peerId, o.userId)).then(function(e) {
                                    (0, re.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o, e), t.updateTyping(o, e))
                                }), e.set(ne.waitTyping.bind(null, o.peerId, o.userId)).then(function(e) {
                                    (0, re.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o, e), t.updateTyping(o, e))
                                }));
                                break;
                            case Q.eventTypes.NOTIFY_SETTINGS_CHANGED:
                                D(e, v, o.peerId, 0 !== o.disabledUntil);
                                break;
                            case Q.eventTypes.RESYNC:
                                e.get().longpoll.pause(), e.set(ne.resync).then(v().resync).then(function(t) {
                                    return e.get().longpoll.resume()
                                });
                                break;
                            case Q.eventTypes.TRANSITION:
                                P.transition(o.state);
                                break;
                            case Q.eventTypes.RESET_PEER:
                                c(e, t, n, i), o.cancelSearch && S(e, r, t), (0, re.isClassicInterface)(e) && A.updateMenu(e), r.focusInput(e);
                                break;
                            case Q.eventTypes.CHANGE_TAB:
                                (0, re.changeTab)(o.tab, e, v, ne.changeDialogsTab).then(function(e) {
                                    I.updateFilter(e)
                                });
                                break;
                            case Q.eventTypes.RESET_DIRECTORIES:
                            case Q.eventTypes.SET_DIRECTORIES:
                            case Q.eventTypes.REPLACE_DIRECTORIES:
                                e.set(ne.updateFolderState.bind(null, o.peerId, o.mask, o.type, o.local)).then(function(e) {
                                    (0, te.isSearching)(e) || o.type === Q.eventTypes.RESET_DIRECTORIES && o.mask === Q.eventTypes.FOLDER_IMPORTANT || o.type === Q.eventTypes.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(o.peerId, e), u(e, i), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                });
                                break;
                            case Q.eventTypes.CHANGE_PEER:
                                C(e, o, t, n, r, i, A, b, v);
                                break;
                            case Q.eventTypes.MUTEX:
                                var w = a({}, o.peerId, o),
                                    k = (0, re.isPeerBlocked)(o.peerId, e);
                                e.set(ne.updateBlockStates.bind(null, w)).then(function() {
                                    t.updateDialog(o.peerId, e);
                                    var r = (0, re.isPeerBlocked)(o.peerId, e);
                                    (0, re.isFullyLoadedTab)(e.get(), o.peerId) && k !== r && n.updateChat(e, o.peerId)
                                });
                                break;
                            case Q.eventTypes.FAILED_MESSAGE:
                                e.set(ne.setMessageErrored.bind(null, o.peer, o.message)).then(function() {
                                    n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                });
                                break;
                            case Q.eventTypes.RESEND:
                                var M = o.message.messageId;
                                e.set(ne.resendMessage.bind(null, o.peerId, M, o.message)).then(function() {
                                    n.resendMessage(o.peerId, M), t.promoteDialog(e, o.message)
                                })
                        }
                    })
                })
            },
            updateHistory: function(e) {
                return n.updateHistory(e)
            },
            cancelRecording: function() {
                return k.set(ne.cancelRecording).then(function() {
                    return n.cancelRecording()
                })
            },
            fixHeight: function() {
                B()
            },
            unmount: function() {
                (0, W.destroyModule)(e), clearInterval(k.get().update_title_to), o.stop(), s.stop(), t.unmount();
                var a = window.devicePixelRatio >= 2 ? "_2x" : "";
                setFavIcon("/images/icons/favicons/fav_logo" + a + ".ico"), n.unmount(), r.unmount(), cancelStackFilter("im_peer"), I.unmount(), b && b.unmount(), A && A.unmount(), O && O(), M && M(), (0, re.isLocksAvailable)(k) && k.get().peer && k.set(ne.releaseBlock.bind(null, k.get().peer)), x.unmount(), A && A.unmount(), R.unmount(), clearInterval(L), cur.imDb.unmount(), cur.imDb = !1
            }
        }
    }

    function k(e, t, n, r) {
        (0, re.isReservedPeer)(t.get().peer) || e().onUserActions(t, r), t.set(ne.updateFavAndTitle.bind(null, !1, !1))
    }

    function P(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_page_history", e),
            a = window.clientHeight() - n.offsetHeight - oe - 2,
            i = (0, re.isClassicInterface)(t) ? le : se,
            o = {
                page: Math.max(a, i)
            };
        if ((0, re.isClassicInterface)(t)) {
            var s = (0, re.getClassicChatHeight)();
            s = s > 0 ? Math.min(s - n.offsetHeight - oe - 2, a) : a;
            var l = hasClass(r, "im-page--history_empty-hist") ? s : a;
            o.history = Math.max(s, i), o.chat = Math.max(l, i)
        }
        return o
    }

    function M(e, t, n, r, a) {
        var i = arguments.length <= 5 || void 0 === arguments[5] ? !0 : arguments[5],
            o = arguments.length <= 6 || void 0 === arguments[6] ? !1 : arguments[6];
        if (!isFullScreen()) {
            var s = P(e, t);
            if (setStyle(e, {
                    minHeight: s.page
                }), (0, re.isClassicInterface)(t) && ("undefined" == typeof t.get().chatResizeInitialized && t.set(ne.initializeChatResize), setStyle(e, {
                    height: t.get().isCreating ? s.page : "auto"
                }), setStyle(geByClass1("_im_page_dialogs", e), {
                    minHeight: s.page,
                    position: "static",
                    top: 0
                }), setStyle(geByClass1("_im_page_history", e), {
                    minHeight: s.history,
                    position: "relative",
                    top: 0
                }), setStyle(geByClass1("_im_chat_body_abs", e), {
                    minHeight: s.chat,
                    height: s.chat,
                    position: "relative",
                    top: 0
                })), browser.safari && o && "function" == typeof o && o(), r && r.updateScroll(), a && a.updateScroll(), n) {
                var l = n.updateScroll();
                n.scrollFix(t, t.get().peer, l)
            }
            i && setTimeout(function() {
                return M(e, t, n, r, a, !1)
            }, 100)
        }
    }

    function L(e) {
        var t = "safari-repaint";
        e.forEach(function(e) {
            hasClass(e, t) && removeClass(e, t), addClass(e, t)
        }), setTimeout(function() {
            e.forEach(function(e) {
                removeClass(e, t)
            })
        }, 100)
    }

    function A() {
        var e = [geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")];
        L(e)
    }

    function O(e, t, n, r) {
        function i() {
            var t = (0, z.getNativeOption)("scrollLeft"),
                n = hasClass(e, "im-page--header_static"),
                r = [];
            c !== t ? r = u.slice().concat([e]) : n !== d && (r = [e]), c = t, d = n, r.length > 0 && r.forEach(function(r) {
                var i = e === r && n ? 0 : -t;
                setStyle(r, a({}, cssTransformProp, 0 === i ? "unset" : "translateX(" + i + "px)"))
            })
        }
        if (browser.mobile) return !1;
        var o = ge("side_bar"),
            s = geByClass1("_im_chat_input_w", r),
            l = geByClass1("_im_dialog_actions", r),
            u = [t, n, o, s, l],
            c = null,
            d = hasClass(e, "im-page--header_static");
        return addEvent(window, "scroll", i), i(),
            function() {
                removeEvent(window, "scroll", i), setStyle(o, {
                    transform: ""
                })
            }
    }

    function D(e, t, n, r) {
        e.set(ne.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
    }

    function x(e, t) {
        var n, r = t.get(),
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), M(e, t, !1, !1, !1, !0), show(e), t.set(ne.fetchLocalHints);
        var o = (0, W.createMutations)(I),
            s = o.callMutations,
            u = o.bindMutations,
            c = (0, Q.startLongPoll)(r);
        c.on("data", function() {
            for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
            return s().onEvents(t, n)
        });
        var d = geByClass1("_im_dialogs_search", e),
            g = geByClass1("_im_dialogs_settings", e),
            f = (0, F.mount)(geByClass1("_im_page_dcontent", e), t, s),
            p = (0, N.mount)(geByClass1("_im_page_history", e), t, s),
            _ = (0, j.mount)(d, t, s),
            h = (0, H.mount)(g, t, s),
            v = (0, $.mount)(t);
        if (cur.imDb = (0, J.mount)(t.get().gid ? -t.get().gid : vk.id), (0, re.isClassicInterface)(t) && h.updateSettings(t), (0, re.isClassicInterface)(t)) var b = geByClass1("_im_ui_peers_list", e.parentNode),
            y = (0, Z.mount)(b, t, s),
            C = O(d, g, geByClass1("_im_right_menu", e.parentNode), e);
        (0, re.isClassicInterface)(t) && r.peer && f.deactivate(), r.gid || (n = (0, U.mount)(geByClass1("_im_dialogs_creation", e), t, s));
        var T = r.isCreating,
            S = T ? "create" : 0 === r.peer ? "search" : "default";
        T && n.show(t, []);
        var E = (0, V.create)(t, S, f, p, _, n),
            w = (0, ie.mount)(t, E);
        p.updateScroll();
        var P = k.bind(null, s, t, E);
        (0, re.isReservedPeer)(r.peer) || setTimeout(function() {
            return m(t)
        }, 10);
        var L = new IdleManager({
                id: "im",
                element: document,
                focusElement: window,
                triggerEvents: "mouseover mousedown keypress"
            }),
            D = debounce(A, 300),
            x = M.bind(null, e, t, p, f, n, !1, D);
        if (t.setState({
                longpoll: c
            }), t.set(ne.setExecStack.bind(null, [])), L.on("unidle", function() {
                c.abortPauses(), P()
            }), L.start(), nav.objLoc.box && (l(t, nav.objLoc.box), (0, G.updateLocation)({
                box: null
            })), (0, re.isLocksAvailable)(t)) var B = (0, Y.createWorker)(r.mutex_key, function(e) {
                r.longpoll.push([Q.eventTypes.mutexEvent(e)])
            }, function(e, t) {
                return (0, ne.getMutexQueue)(r.gid).then(function(e) {
                    var t = R(e, 1),
                        n = t[0];
                    return n
                })
            }),
            z = B.stop;
        if (t.set(ne.fetchFriends.bind(null, cur.imDb)), (0, re.isLocksAvailable)(t)) var q = setInterval(re.blockLatencyCompensation.bind(null, t, r.longpoll), 2e3);
        var K = (0, ee.throttleAccumulate)(i.bind(null, t, p), 200),
            X = (0, W.createModule)({
                handlers: function(e, t) {
                    e(document, "mousemove mousedown keypress", P), e(window, "resize", x), browser.safari && e(document, "visibilitychange", A)
                }
            });
        return u(X, f, p, _, e, L, c, K, s, n, h, t, E, z, q, y, C, v, w, x)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var R = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
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
        B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        };
    t.mount = x;
    var F = n(63),
        N = n(65),
        j = n(71),
        H = n(72),
        U = n(62),
        G = n(42),
        z = n(30),
        q = n(9),
        K = r(q),
        W = n(2),
        V = n(81),
        Q = n(11),
        Y = (n(4), n(82)),
        X = n(39),
        Z = n(70),
        $ = n(64),
        J = n(28),
        ee = n(10),
        te = n(5),
        ne = n(1),
        re = n(3),
        ae = n(36),
        ie = n(67),
        oe = 30,
        se = 400,
        le = 250,
        ue = 32,
        ce = 12,
        de = 52,
        fe = 5 * ue + 2 * ce + de,
        me = 3 * ue + 2 * ce,
        pe = 10
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = parseInt(e / 60),
            n = e % 60;
        return t + ":" + (10 > n ? "0" : "") + n
    }

    function a(e) {
        var t = e.match(/.*\/(\w*).*/);
        switch (t[1]) {
            case "mpeg":
                return "mp3";
            case "ogg":
            case "webm":
            case "wav":
                return t[1]
        }
        return ""
    }

    function i(e) {
        return new Promise(function(t, n) {
            for (var r = new FormData, i = [], o = 0; o < e.wave.length; o++) i.push(parseInt(31 * e.wave[o]));
            r.append("waveform", JSON.stringify(i)), r.append("file", e.buffer, "voice_message." + a(e.mimeType));
            var s = new V;
            s.onload = s.onerror = function(e) {
                var r = e.currentTarget.response;
                200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
            }, s.open("POST", U.upload_url, !0), s.send(r)
        })
    }

    function o(e) {
        (0, K.lockButton)(D);
        var t = {
            peer: F.get().peer,
            from_place: cur.docsChooseFrom,
            imhash: cur.docsChooseImHash,
            blockPersonal: cur.docsChooseBlockPersonal,
            mail_add: cur.docsChooseMailAdd
        };
        i(e).then(function(e) {
            return e.file ? new Promise(function(n, r) {
                ajax.post("/docs.php", extend({
                    act: "a_save_doc",
                    from: "choose",
                    from_place: t.from_place,
                    imhash: t.imhash,
                    blockPersonal: t.blockPersonal,
                    mail_add: t.mail_add
                }, e), {
                    onDone: function(e, r) {
                        f(), H([
                            ["doc", e + "_" + r, "audiomsg"]
                        ], {}, t.peer), C(), (0, K.unlockButton)(D), n()
                    },
                    onFail: function(e) {
                        r(e)
                    },
                    progress: null
                })
            }) : ((0, K.unlockButton)(D), Promise.reject())
        })["catch"](function() {
            (0, K.unlockButton)(D), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
        })
    }

    function s(e) {
        var t = URL.createObjectURL(Q.buffer);
        domData(N, "duration", Q.duration), domData(N, "ogg", t), domData(N, "mp3", t), geByClass1("audio-msg-track--duration", N).innerHTML = r(Q.duration), geByClass1("audio-msg-track--wave-wrapper", N).innerHTML = AudioMessagePlayer.getWave(Q.wave, Y)
    }

    function l() {
        M.innerHTML = r(Q.duration), Q.duration >= W && v()
    }

    function u(e) {
        e.set(z.cancelRecording).then(_)
    }

    function c() {
        stManager.add(["voice_message_player.js", "speech.js"], function() {
            Q || (Q = Speech.newRecorder(), addEvent(Q, "progress", l)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Q.record().then(function() {
                g(F), b(), y(), j = Speech.createVisualization("wave", Q.source, L), j.start();
                var e = L.getBoundingClientRect();
                Y = (e.right - e.left) / 3
            })["catch"](function(e) {
                AudioMessagePlayer.resumeGlobalMedia();
                var t = e.name;
                switch (e.name) {
                    case "DevicesNotFoundError":
                    case "NotFoundError":
                        t = "mail_audio_message_device_error";
                        break;
                    case "PermissionDeniedError":
                    case "PermissionDismissedError":
                        t = "mail_audio_message_permission_error";
                        break;
                    case "Unsupported":
                        t = "mail_audio_message_unsupported_error"
                }
                showFastBox(getLang("global_error"), getLang(t)), console.error(e)
            })
        })
    }

    function d() {
        Q && Q.stop(), j && (j.destroy(), j = null)
    }

    function g(e) {
        U.isRecording = !0, cancelStackPush("audio_message_cancel", u.bind(null, e))
    }

    function f() {
        U.isRecording = !1, cancelStackFilter("audio_message_cancel")
    }

    function m() {
        p(), o(Q)
    }

    function p() {
        AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Q, "finish", p), removeEvent(Q, "finish", m), s(), removeClass(P, "im-audio-message_recording"), addClass(P, "im-audio-message_recorded")
    }

    function _() {
        f(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Q, "finish", p), removeEvent(Q, "finish", m), d(), C()
    }

    function h() {
        Q.isRecording ? (addEvent(Q, "finish", m), removeEvent(Q, "finish", p), d()) : o(Q)
    }

    function v() {
        addEvent(Q, "finish", p), removeEvent(Q, "finish", m), d()
    }

    function b() {
        hideProgress(geByClass1("im-audio-message-send-wrapper", P)), show(D), M.innerHTML = "0:00", addClass(P, "im-audio-message_recording"), removeClass(P, "im-audio-message_recorded")
    }

    function y() {
        show(P), hide(geByClass1("_im_chat_input_parent"))
    }

    function C() {
        hide(P), show(geByClass1("_im_chat_input_parent"))
    }

    function T() {
        R = ge("audiomsg_record"), N = ge("audiomsg_player"), P = geByClass1("im-audio-message-input"), M = geByClass1("audio-msg-track--duration", P), L = geByClass1("audio-msg-track--wave", P), O = geByClass1("im-audio-message--cancel-btn", P), D = geByClass1("_im_audio_send", P), x = geByClass1("audio-msg-track--btn", P), B = geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
        var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
        addClass(e, "_voice_field_wrap"), E()
    }

    function S() {
        w(), R = N = P = M = L = A = O = D = x = null
    }

    function E() {
        addEvent(A, "click", c), addEvent(O, "click", _), addEvent(D, "click", h), addEvent(x, "click", v)
    }

    function w() {
        Q && removeEvent(Q, "progress", l), removeEvent(A, "click", c), removeEvent(O, "click", _), removeEvent(D, "click", h), removeEvent(x, "click", v)
    }

    function I(e, t, n) {
        return {
            cancelRecording: _,
            start: function() {
                c()
            },
            unmount: function() {
                _(), S()
            }
        }
    }

    function k(e, t, n, r) {
        F = t, U = t.get().audio_msg, H = n, (0, q.initFailBack)(), (0, K.getAvailableMicrophones)().then(function(e) {
            var n = e.length > 0;
            n ? (T(), r()) : setCookie("remixvoice", "0", 7), t.set(z.setVoiceMessageAvail.bind(null, n))
        })["catch"](function(e) {
            throw setCookie("remixvoice", "0", 7), e
        });
        var a = (0, G.createMutations)(I),
            i = (a.callMutations, a.bindMutations);
        return i(e, t, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = k;
    var P, M, L, A, O, D, x, R, B, F, N, j, H, U, G = n(2),
        z = n(1),
        q = n(75),
        K = n(3),
        W = 300,
        V = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
        Q = !1,
        Y = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = e.get().tabbedPeers.map(function(t) {
            return e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]
        }).filter(function(e) {
            return e
        }).filter(function(e) {
            return !e.deletedDialog
        }).map(function(e) {
            var t = e.peerId;
            return {
                type: "peer",
                peer: t
            }
        });
        return t.length > 0 && (t = [{
            type: "sep"
        }].concat(t)), t
    }

    function i(e, t) {
        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
        var n = (0, m.getBaseLink)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
            r = (0, m.getBareTab)(t.peer, e),
            a = r.tab;
        return a = getTemplate("im_right_menu_ct", {
            name: a,
            count: r.unread > 0 ? r.unread : ""
        }), getTemplate("im_right_menu_tpl", {
            href: n,
            label: a,
            peer: t.peer,
            attrs: 'title="' + stripHTML(r.tab) + '"',
            cls: r.unread > 0 ? "im-right-menu--unread" : ""
        })
    }

    function o(e, t, n, r) {
        var a = gpeByClass("_im_peer_tab", r),
            i = intval(domData(a, "list-id")),
            o = e.get().tabbedPeers.filter(function(e) {
                var t = e.peer;
                return t !== i
            });
        return e.set(p.updateTabbedPeers.bind(null, o, !0)).then(function() {
            if (s(t, e), i === e.get().peer) e.get().longpoll.push([(0, _.resetPeer)()]);
            else if (0 !== e.get().peer) {
                var n = gpeByClass("_im_right_menu", r);
                uiRightMenu.hideSliding(n)
            }
        }), cancelEvent(n), !1
    }

    function s(e, t) {
        return e.pipeReplace(Promise.resolve(a(t)))
    }

    function l(e, t) {
        geByClass("_im_peer_tab", e).forEach(function(e) {
            var n = q2ajx(attr(e, "href").split("?")[1]);
            n.tab !== t.get().active_tab && attr(e, "href", (0, m.getBaseLink)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
        })
    }

    function u(e, t, n, r) {
        return {
            updateMenu: function(t) {
                l(e, t);
                var r = gpeByClass("_im_right_menu", e);
                s(n, t).then(function() {
                    var e;
                    e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab), e && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                })
            },
            updateName: function(e, t) {
                var n = ge("ui_rmenu_peer_" + e);
                if (n) {
                    var r = geByClass1("_im_r_tx", n),
                        a = t.get().tabs[e].tab;
                    val(r, a)
                }
            },
            updateCounter: function(e, t) {
                var n = ge("ui_rmenu_peer_" + t);
                if (n) {
                    var r = geByClass1("_im_r_ct", n),
                        a = e.get().tabs[t].unread;
                    val(r, a > 0 ? a : ""), toggleClass(n, "im-right-menu--unread", a > 0)
                }
            },
            unmount: function() {
                (0, h.destroyModule)(r), n.unmount()
            }
        }
    }

    function c(e, t, n) {
        var r = (0, d.mount)(e, (0, f["default"])({
                limit: 50,
                offset: 0,
                noScroll: !0,
                elements: a(t)
            }), function(e) {
                return {
                    idFn: function(e) {
                        return e.peer || "000"
                    },
                    renderFn: i.bind(null, t)
                }
            }),
            s = o.bind(null, t, r),
            l = (0, h.createModule)({
                handlers: function(n, r) {
                    r(e, "click", "_im_r_cl", s), r(e, "click", "_im_peer_tab", function(e, n) {
                        if (!checkEvent(e)) {
                            var r = intval(domData(n, "list-id"));
                            t.get().longpoll.push([(0, _.changePeer)(r, !1, !0, !0)]), cancelEvent(e)
                        }
                    })
                }
            });
        return u(e, t, r, l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = c;
    var d = n(29),
        g = n(6),
        f = r(g),
        m = n(3),
        p = n(1),
        _ = (n(10), n(4)),
        h = n(2)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return ge("im_dialogs_search", e)
    }

    function i(e, t, n, r, a, i) {
        var o = trim(i);
        if ((0, S.isSearchingValue)(e, o)) {
            var s = g.bind(null, e, n, a, t);
            o ? (e.setState({
                recentSearch: !1
            }), a.stop()) : a.replaceOrAdd(s), cancelStackPush("im_search", s), o && e.set(T.setCurrentSearch.bind(null, o, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
        } else o || (a.stop(), e.set(T.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
    }

    function o(e, t, n) {
        return function() {
            var r = (0, S.getSearchText)(t);
            r === e && n.apply(void 0, arguments)
        }
    }

    function s(e, t, n) {
        var r = t().appendFastDialogs.bind(null, n),
            a = o(e, n, r);
        return (0, T.searchFriends)(e, n.get()).then(function(t) {
            var r = t;
            if (e.indexOf("@") >= 0 && !(0, E.isCommunityInterface)(n)) {
                var i = {
                    type: "email_create",
                    query: clean(e),
                    peerId: Math.random()
                };
                r = [i].concat(t)
            }
            return a(r), t
        })
    }

    function l(e, t, n) {
        var r = (0, S.getSearchText)(n);
        return (0, T.updateSearchQuery)(r), n.setState({
            recentSearch: !1
        }), r ? (n.get().dialog_search_going = !0, s(r, e, n).then(function(a) {
            var i = a.map(function(e) {
                return e.peerId
            });
            return t(r, e, i, n)
        }).then(function(e) {
            n.get().dialog_search_going = !1
        })["catch"](function() {})) : (e().restoreDialogs(n, !1, !0), Promise.resolve(!1))
    }

    function u(e, t, n, r) {
        var a = r.get(),
            i = o(e, r, t().appendDialogs.bind(null, r)),
            s = o(e, r, t().appendSearch);
        return (0, E.isPendingForward)(r) ? (0, T.searchHints)(e, n, "all", a).then(i) : Promise.all([(0, T.searchHints)(e, n, "all", a).then(i), (0, T.searchMessages)(e, a)]).then(function(e) {
            var t = C(e, 2),
                n = C(t[1], 2),
                a = n[0],
                i = n[1];
            s(r, a, i, !0)
        })
    }

    function c(e, t, n) {
        n().showCreation(e)
    }

    function d(e, t, n, r) {
        var o = a(t);
        o.value = q, i(e, r, t, o, n, o.value)
    }

    function g(e, t, n, r) {
        cancelStackFilter("im_search");
        var o = a(t);
        uiSearch.reset(o), e.setState({
            recentSearch: !1
        }), i(e, r, t, o, n, o.value)
    }

    function f(e, t, n, r, a, i) {
        (0, S.isSearching)(e) ? (g(e, t, a, n), setTimeout(function() {
            return p(e, i)
        }, 10)) : (window.tooltips && tooltips.hide(i, {
            showsp: 0
        }), c(e, i, r))
    }

    function m(e, t, n, r, a) {
        return (0, E.showFavvedBox)(e, n, L.mount, r)
    }

    function p(e, t) {
        return showTooltip(t, {
            appendEl: bodyNode,
            text: function() {
                return (0, S.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
            },
            black: 1,
            shift: [3, -1],
            appendCls: "js-im-page"
        })
    }

    function _(e, t, n) {
        var r = n.target;
        e.set(T.toggleCommunityMute.bind(null, t)).then(function() {
            toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && v(e, {
                target: r
            })
        })
    }

    function h(e, t, n, r, a) {
        if (!(0, S.isSearching)(e)) {
            var o = cur.imDb.select(A.RECENT_SEARCH_OP);
            if (0 !== o.length) {
                e.setState({
                    recentSearch: !0
                }), i(e, function() {
                    return (0, S.isSearching)(e) ? void 0 : (r.stop(), void a().restoreDialogs(e, !1, !0))
                }, t, n, r, "");
                var s = o.filter(function(t) {
                        return !(0, E.isTabLoadedWithMessage)(e.get(), t)
                    }),
                    l = o.filter(function(t) {
                        return (0, E.isTabLoadedWithMessage)(e.get(), t)
                    }).reduce(function(t, n) {
                        return t[n] = (0, S.getTab)(e, n), t
                    }, {});
                e.get().friendsTree.then(function(t) {
                    var n = t.list.filter(function(e) {
                            return inArray(e[0], s)
                        }).reduce(function(e, t) {
                            return e[t[0]] = (0, T.localIndexToDialog)(t), e
                        }, {}),
                        r = extend({}, n, l);
                    return a().appendFastDialogs(e, o.map(function(e) {
                        return r[e]
                    })), (0, T.searchHints)(!1, Object.keys(n), !1, e.get())
                }).then(function(t) {
                    a().appendDialogs(e, t)
                })
            }
        }
    }

    function v(e, t) {
        var n = t.target;
        return showTooltip(n, {
            text: function() {
                return e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
            },
            black: 1,
            shift: [13, 9],
            appendCls: "js-im-page"
        })
    }

    function b(e, t, n, r, i) {
        return {
            focusInput: function(t) {
                uiSearch.focus(a(e).parentNode)
            },
            createCanceled: function(e, n) {
                removeClass(t, "im-dialog-select_rotated")
            },
            rotateCross: function(e) {
                addClass(t, "im-dialog-select_rotated")
            },
            setSearch: function(t, n) {
                d(t, e, r, function() {})
            },
            clearSearch: function(t) {
                g(t, e, r, function() {})
            },
            updateImportantCnt: function(t) {
                var n = t.get().important_cnt,
                    r = geByClass1(O, e);
                toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
            },
            unmount: function() {
                r.stop(), (0, k.destroyModule)(i), uiSearch.destroy(n), cancelStackFilter("im_search")
            }
        }
    }

    function y(e, t, n) {
        var r = geByClass1("_im_search_croll", e),
            o = a(e),
            s = (0,
                I["default"])("im_search", ["_im_search_croll", "_im_recent_bar", "_im_d_search", "_im_dialog"]),
            c = (0, P.debouncedPromise)(u, 300),
            d = l.bind(null, n, c),
            g = i.bind(null, t, d, e, o, s),
            y = f.bind(null, t, e, d, n, s, r),
            C = m.bind(null, t, e, n),
            T = geByClass1("_im_dialogs_search_input", e);
        uiSearch.init(T, {
            onChange: g
        });
        var S = p.bind(null, t, r),
            w = geByClass1(D, e);
        o.value && g(o.value);
        var L = (0, k.createModule)({
            handlers: function(a, i) {
                if (a(geByClass1("_im_av_time", e), "mouseover", function(e) {
                        showTooltip(e.target, {
                            text: getLang("mail_admin_av_time"),
                            dir: "up",
                            shift: [0, 8]
                        })
                    }), a(r, "click", y), a(r, "mouseover", S), a(geByClass1(O, e), "click", C), (0, E.isClassicInterface)(t)) {
                    var l = _.bind(null, t, !0),
                        u = v.bind(null, t);
                    a(w, "click", l), a(w, "mouseover", u)
                }
                a(o, "focus", function() {
                    t.get().longpoll.push([(0, M.transitionEvent)("search")])
                }), a(o, "click", function() {
                    h(t, e, o, s, n)
                }), a(o, "blur", function() {
                    var e = void 0;
                    e = 0 === t.get().peer ? "search" : (0, E.isPendingForward)(t) ? "search" : "default", t.get().longpoll.push([(0, M.transitionEvent)(e)])
                })
            }
        });
        return (0, E.isClassicInterface)(t) && _(t, !1, {
            target: w
        }), b(e, r, T, s, L)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var C = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.mount = y;
    var T = n(1),
        S = n(5),
        E = n(3),
        w = n(80),
        I = r(w),
        k = n(2),
        P = n(20),
        M = n(4),
        L = n(36),
        A = n(28),
        O = "_im_important_counter",
        D = "_im_gim_mute"
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "im_settings" : arguments[0];
        return getTemplate(e, {
            sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
            browser: i() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off")
        })
    }

    function a(e, t) {
        showTooltip(t.target, {
            content: r("im_settings_pop"),
            dir: "down",
            shift: [220, 9],
            hasover: !0,
            showdt: 300
        })
    }

    function i() {
        return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
    }

    function o(e, t, n, a, o) {
        var s = domData(o, "action"),
            l = gpeByClass("_im_settings_menu", o),
            u = hasClass(l, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
        switch (s) {
            case "spam":
                (0, g.showSpamLayer)(e, c.mount, a);
                break;
            case "sound":
                ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), l.outerHTML = r(u);
                break;
            case "browser":
                var d = i();
                d ? (ls.set("im_ui_notify_off", 1), l.outerHTML = r(u)) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                    l.parentNode && (l.outerHTML = r(u))
                }) : (ls.set("im_ui_notify_off", 0), l.outerHTML = r(u))
        }
    }

    function s(e, t) {
        return {
            updateFilter: function(t) {
                var n, r = t.get().active_tab === f.FOLDER_UNREAD;
                n = t.get().unread_cnt > 0 ? getTemplate("im_filter", {
                    filter: r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread"),
                    cls: ""
                }) : getTemplate("im_filter", {
                    filter: getLang("mail_all_dialogs"),
                    cls: "im-page--dialogs-filter_disabled"
                }), val(geByClass1(_, e), n)
            },
            toggleLoader: function(t, n) {
                var r = geByClass1(m, e);
                toggleClass(r, "im-page--dialogs-settings_loading", n)
            },
            updateSettings: function(t) {
                var n = geByClass1("_im_settings_menu", e);
                n.outerHTML = r()
            },
            unmount: function() {
                (0, u.destroyModule)(t)
            }
        }
    }

    function l(e, t, n) {
        var r = a.bind(null, t),
            i = o.bind(null, t, n, e),
            l = function(e, r) {
                if ((0, g.showUnreadOnly)(t, n, d.changeDialogsTab)) {
                    var a = t.get().active_tab === f.FOLDER_UNREAD;
                    val(r, getTemplate("im_filter", {
                        filter: a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                    }))
                }
            },
            c = (0, u.createModule)({
                handlers: function(t, n) {
                    n(e, "mouseover", m, r), n(e, "click", p, i), n(e, "click", _, l)
                }
            });
        return s(e, c)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = l;
    var u = n(2),
        c = n(39),
        d = n(1),
        g = n(3),
        f = n(9),
        m = "_im_dialogs_cog_settings",
        p = "_im_settings_action",
        _ = "_im_to_unread"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (0 === e.length) return [""];
        for (var n = []; e.length > Y;) {
            var r = e.substr(0, Y).lastIndexOf(" "); - 1 == r && (r = Y), n.push(e.substr(0, r)), e = e.substr(r)
        }
        return e.length > 0 && n.push(e), n
    }

    function a(e, t) {
        return e ? void(window.tooltips && tooltips.hide(e, t)) : !1
    }

    function i(e) {
        var t = geByClass1("_im_rcemoji", e);
        if (t) {
            var n = "",
                r = Emoji.getRecentEmojiSorted().slice(0, 7);
            for (var a in r) {
                var i = r[a];
                n += getTemplate("im_emoji_line", {
                    code: i,
                    emoji: Emoji.getEmojiHTML(i, !1, !0)
                })
            }
            val(t, n)
        }
    }

    function o(e) {
        var t = e.filter(function(e) {
            return "fwd" === e[0]
        });
        return e.filter(function(e) {
            return "fwd" !== e[0]
        }).map(function(e) {
            return {
                id: e[1],
                type: e[0],
                kind: e[2]
            }
        }).concat(t.map(function(e) {
            return {
                type: e[0],
                messages: e[1]
            }
        }))
    }

    function s(e, t, n, r, a, i) {
        var s = arguments.length <= 6 || void 0 === arguments[6] ? !0 : arguments[6];
        return r.get().tabs[t], I(t, r) ? Promise.resolve(!1) : (0, H.getBindAttachToUrl)(t, cur.imDb, r.get()).then(function(l) {
            var u = Object.keys(l).filter(function(e) {
                return e === n.message
            }).map(function(e) {
                return l[e]
            }).map(function(e) {
                return n.attaches.filter(function(t) {
                    return t.id === e.id && t.type === e.type
                }).length
            }).reduce(function(e, t) {
                return e || t
            }, !1);
            u && (n.message = "");
            var c = (0, q.random)(),
                d = {
                    peerId: t,
                    messageId: "rid" + c,
                    flags: N.eventTypes.FLAG_OUTBOUND | N.eventTypes.FLAG_UNREAD,
                    date: intval(Date.now() / 1e3) - r.get().timeshift,
                    subject: "",
                    text: (0, U.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                    local: !0,
                    kludges: {
                        emoji: !0,
                        from_admin: r.get().gid ? vk.id : null
                    },
                    type: N.eventTypes.ADD_MESSAGE,
                    attaches: o(n.attaches)
                };
            n.rid = c, n.mess = d, e(t, n), r.get().longpoll.push([d]), s && i().clearText(t, r), a().newMessage(r)
        })
    }

    function l(e, t, n, r, a, i, o) {
        var l = arguments.length <= 7 || void 0 === arguments[7] ? !1 : arguments[7];
        l || (l = e.get().peer);
        var c = {
            message: "",
            attaches: i
        };
        o && extend(c, o), u(e, t, !1).then(function(a) {
            return s(n, l, c, e, t, r, !1)
        })["catch"](function(t) {
            debugLog(t), g(e, a)
        })
    }

    function u(e, t, n) {
        var r = e.get().tabs[e.get().peer];
        return r.skipped > 0 ? (t().loadingPeer(e), e.set(H.changePeer.bind(null, e.get().peer, !1)).then(function(t) {
            return e.set(H.loadPeer.bind(null, e.get().peer, !0, -1, !1))
        }).then(function(n) {
            return t().changePeer(e, !1)
        }).then(function(e) {
            return n
        })) : Promise.resolve(n)
    }

    function c(e, t, n) {
        var r = !!intval(domData(n, "val"));
        r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(H.changeSubmitSettings.bind(null, r)))
    }

    function d(e, t, n) {
        return e.get().delayed_ts ? !1 : setTimeout(function() {
            f.apply(null, n)
        }, t)
    }

    function g(e, t) {
        document.activeElement && document.activeElement.blur(), showFastBox({
            title: getLang("global_error")
        }, getLang("mail_send_error"), getLang("mail_ok"), function() {
            nav.reload({
                force: !0
            })
        });
        var n = geByClass1("_im_send", t);
        return e.set(H.toggleSendingAbility.bind(null, !0)).then(function() {
            (0, U.lockButton)(n)
        })
    }

    function f(e, t, n, a, o, l) {
        var c = arguments,
            f = arguments.length <= 6 || void 0 === arguments[6] ? [] : arguments[6];
        return Promise.resolve().then(function() {
            var l = geByClass1("_im_send", a);
            if (!(0, G.isSendingAvailable)(e)) return !1;
            if ((0, H.isAnythingLoading)(e.get())) {
                var g = d(e, Q, (0, K.toArray)(c));
                return e.set(H.setDelayedMessage.bind(null, !0, g)).then(function() {
                    (0, U.lockButton)(l)
                })
            }
            clearTimeout(e.get().delayed_ts);
            var m = e.set(H.setDelayedMessage.bind(null, !1, !1)).then(function() {
                    (0, U.unlockButton)(l)
                }),
                p = e.get(),
                _ = p.peer,
                h = geByClass1("_im_text", a);
            return Promise.all([(0, H.getAttaches)(e, _), (0, H.getForwardedMessages)(_, cur.imDb, e.get()), m]).then(u.bind(null, e, t)).then(function(l) {
                var u = F(l, 2),
                    c = u[0],
                    d = u[1];
                c = c.concat(f);
                var g = Emoji.editableVal(h) || "";
                if (trim(g) || 0 !== c.length || 0 !== d.length) {
                    d.length > 0 && c.push(["fwd", d]);
                    var m = r(g);
                    i(a);
                    var p = m.slice(0, m.length - 1).map(function(r) {
                            return s(n, _, {
                                message: trim(r),
                                attaches: []
                            }, e, t, o)
                        }),
                        g = m.slice(-1)[0];
                    return p.push(s(n, _, {
                        message: trim(g),
                        attaches: c
                    }, e, t, o)), Promise.all(p)
                }
            })
        })["catch"](function(t) {
            debugLog(t), g(e, a)
        })
    }

    function m(e, t, n) {
        return e.set(H.deliverMessage.bind(null, t, n))
    }

    function p(e, t, n, r) {
        e.get().longpoll.push([N.eventTypes.failedMessage(t, n.mess, r)])
    }

    function _(e, t, n, r, a, o) {
        var s = geByClass1("_im_text", e);
        Wall.initComposer(s, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            toup: !0,
            getValue: function() {
                return t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(s) : ""
            },
            onShow: function() {
                addClass(e, "im_mention_shown");
                var t = data(s, "composer");
                if (t && t.wdd && t.wdd.shown) {
                    var n = 0,
                        r = !1,
                        a = function() {
                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                        };
                    each(t.wdd.shown, function() {
                        this[0] && (n++, "@" + t.curTerm == this[2] && (r = !0))
                    }), !n || r && 1 == n ? a() : cancelStackPush("im_mention", a)
                }
            },
            onHide: function() {
                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
            },
            searchKeys: [1, 7],
            wddOpts: {}
        });
        var l = Emoji.init(s, {
            ttDiff: 93,
            rPointer: !0,
            onSend: r.bind(null, []),
            controlsCont: e,
            forceTxt: !t.get().editable,
            checkEditable: n,
            onStickerSend: function(e, t) {
                a([
                    ["sticker", e]
                ], {
                    sticker_referrer: t
                })
            },
            uploadActions: o,
            onRecentEmojiUpdate: function() {
                i(e)
            }
        });
        return Emoji.emojiLoadMore(l), l
    }

    function h(e, t, n, r, a, i, o, s, l) {
        if ("album" === a) return !1;
        if (show(ee), !t.get().rebuilding_draft) {
            if ("page" === a) return !1;
            if (!("share" !== a || o.title && s)) return !1;
            t.set(H.cleanMediaStore.bind(null, t.get().peer, cur.imDb));
            var u = l.getMedias().slice().map(function(e) {
                    return e.slice(0, 2)
                }),
                c = [];
            "undefined" != typeof i && a ? (s && t.set(H.bindAttachToUrl.bind(null, t.get().peer, a, i, s, cur.imDb)), c = [
                [a, i, o]
            ]) : a || "undefined" == typeof i || u.splice(i, 1), u = u.concat(c), u.filter(function(e) {
                return e
            }).forEach(function(e) {
                t.set(H.addMediaStore.bind(null, e, cur.imDb))
            });
            var d = e().updateScroll();
            return e().scrollFix(t, t.get().peer, d), toggleClass(r, "im-chat-input--textarea_has-attaches", u.length > 0), t.get().delayed_message && !(0, H.isAnythingLoading)(t.get()) ? (n([]), !1) : void x(t, r)
        }
    }

    function v(e, t, n) {
        D(e, t).then(function(t) {
            var r = intval(domData(n.target, "tttype"));
            if ((2 === r && t !== !0 || 1 === r && t === !0) && window.tooltips && tooltips.destroy(n.target, {
                    fasthide: !0
                }), t !== !0) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                text: getLang("mail_added_audiomsg"),
                black: !0,
                force: 1 !== r,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            domData(n.target, "tttype", 2);
            var a = e.get().ctrl_submit ? 1 : 0;
            return showTooltip(n.target, {
                text: getTemplate("ctrl_submit_hint", {
                    enter_on: a ? "" : "on",
                    ctrl_on: a ? "on" : ""
                }),
                dir: "down",
                shift: [-28, -5],
                needLeft: !0,
                className: "im-chat-input--tt",
                hasover: !0,
                force: 2 !== r,
                showdt: 700,
                zIndex: 200,
                hidedt: 700,
                appendParentCls: "_im_chat_input_parent",
                onCreate: function() {
                    radioBtns.im_submit = {
                        els: (0, K.toArray)(geByClass(J)),
                        val: a
                    }
                }
            })
        })
    }

    function b(e, t) {
        Emoji.val(e, t), Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
    }

    function y(e, t, n) {
        var r = geByClass1(Z, t);
        if (1 === e.length) {
            var a = F(e[0], 5),
                i = (a[0], a[1]),
                o = a[2],
                s = a[3],
                l = a[4],
                u = (0, U.renderShortText)(0, "", i, !0, l);
            r.innerHTML = getTemplate("im_attach_mess", {
                messages: u,
                text: s,
                date: getSmDate(o, n.get().timeshift),
                modifier: "im-fwd_msg"
            })
        } else r.innerHTML = getTemplate("im_attach_mess", {
            messages: getLang("mail_title_X_msgs", e.length),
            text: getLang("mail_im_fwd_msgs_title"),
            date: "",
            modifier: ""
        })
    }

    function C(e, t, n) {
        e.set(H.forwardMessages.bind(null, [], e.get().peer, cur.imDb)).then(function() {
            var r = geByClass1(Z, t);
            if (r && r.children.length) {
                r.innerHTML = "";
                var a = n().updateScroll();
                n().scrollFix(e, e.get().peer, a)
            }
            x(e, t)
        })
    }

    function T(e, t, n, r, a, i, o, s, l, u) {
        return {
            restoreDraft: function(r) {
                r.get().rebuilding_draft = !0, e.unchooseMedia(), e.chosenMedias = [], r.get().rebuilding_draft = !1;
                var i = r.get().peer,
                    o = geByClass1("ms_item_gift", n),
                    s = geByClass1("ms_item_money", n);
                (0, U.isUserPeer)(i) && i != vk.id && !r.get().gid ? show(o) : hide(o), (0, U.isUserPeer)(i) && i != vk.id && !r.get().gid || (0, U.isCommunityPeer)(i) && r.get().moneyTransferCommAvail && !r.get().gid ? show(s) : hide(s), (0, U.isReservedPeer)(i) || Promise.all([(0, H.getAttaches)(r, i), (0, H.getTextDraft)(i, cur.imDb, r.get()), (0, H.getForwardedMessages)(i, cur.imDb, r.get(), !0)]).then(function(e) {
                    return r.set(H.cleanMediaStore.bind(null, i, cur.imDb)).then(function(t) {
                        return e
                    })
                }).then(function(o) {
                    var s = F(o, 3),
                        l = s[0],
                        u = s[1],
                        c = s[2],
                        d = O(r, i, t);
                    if (!d) {
                        l.length > 0 && show(ge(ee));
                        for (var g = 0; g < l.length; g++) e.chooseMedia.apply(e, l[g]);
                        c.length > 0 ? y(c, n, r) : geByClass1(Z, n).innerHTML = "", b(t, u);
                        var f = a().updateScroll();
                        a().scrollFix(r, i, f), x(r, n, u)
                    }
                })
            },
            sendMessage: function() {
                r()
            },
            choose: function(t, n, r) {
                e.chooseMedia(t, n, r)
            },
            isEmpty: function(e) {
                return !trim(Emoji.val(t))
            },
            unchoose: function(t) {
                e.unchooseMedia(t)
            },
            attachCount: function() {
                return e.attachCount()
            },
            progress: function(t, n, r) {
                show(ee), e.showMediaProgress(t, n, r)
            },
            updateState: function(e) {
                O(e, e.get().peer, t)
            },
            focusOn: function(e) {
                Emoji.editableFocus(t, !1, !0)
            },
            clearText: function(r, i) {
                e.unchooseMedia(), e.chosenMedias = [], Emoji.val(t, ""), i.set(H.saveTextDraft.bind(null, r, "", cur.imDb)), i.set(H.cleanMediaStore.bind(null, r, cur.imDb)), i.set(H.forwardMessages.bind(null, [], r, cur.imDb)), i.set(H.clearAttachToUrl.bind(null, r, cur.imDb)), C(i, n, a);
                var o = a().updateScroll();
                a().scrollFix(i, i.get().peer, o)
            },
            attachMessages: function(e, t) {
                e.get().peer === t && (0, H.getForwardedMessages)(t, cur.imDb, e.get(), !0).then(function(r) {
                    if (r.length > 0) {
                        y(r, n, e);
                        var i = a().updateScroll();
                        a().scrollFix(e, t, i), x(e, n)
                    }
                })
            },
            cancelRecording: function() {
                u.cancelRecording()
            },
            unmount: function() {
                (0, W.destroyModule)(l), e.destroy(), o.unmount(), Emoji.destroy(s), u.unmount()
            }
        }
    }

    function S(e, t) {
        return (0, U.isChatPeer)(e) ? t.get().tabs[e].data.kicked : !1
    }

    function E(e, t) {
        if (!(0, U.isUserPeer)(e) && !(0, U.isCommunityPeer)(e)) return !1;
        var n = t.get().tabs[e];
        return n.blacklisted
    }

    function w(e, t) {
        return (0, U.isCommunityPeer)(e) && t.get().tabs[e].blocked
    }

    function I(e, t) {
        return S(e, t) || E(e, t) || (0, U.isLocksAvailable)(t) && (0, U.isPeerBlocked)(e, t) || !L(e, t) || w(e, t)
    }

    function k(e, t, n, r) {
        var a = e.get().peer,
            i = Emoji.val(r);
        (0, U.isReservedPeer)(a) || e.get().tabs[a].imdraft == i || I(a, e) || (t.checkMessageURLs(i, !0, Q), e.set(H.saveTextDraft.bind(null, a, i, cur.imDb)))
    }

    function P(e, t, n, r, a, i) {
        Emoji.editableFocus(n, !1, !0);
        var o = domData(i, "emoji");
        Emoji.addEmoji(e, o), k(t, r, e, n)
    }

    function M(e) {
        var t = e.get().peer;
        if ((0, U.isFullyLoadedTab)(e.get(), t)) {
            var n = e.get().tabs[t];
            Date.now() - (n.lastTyping || 0) > 1e3 * H.TYPING_PERIOD && e.set(H.sendTyping.bind(null, t))
        }
    }

    function L(e, t) {
        return !(0, U.isCommunityPeer)(e) || t.get().gid ? !0 : t.get().tabs[e].can_message
    }

    function A(e) {
        var t = e.get().peer;
        (0, H.getForwardedMessages)(t, cur.imDb, e.get()).then(function(t) {
            showBox("al_im.php", {
                act: "a_show_forward_box",
                will_fwd: t.join(";"),
                gid: e.get().gid
            }, {
                dark: 1
            })
        })
    }

    function O(e, t, n) {
        var r = gpeByClass("_im_chat_input_parent", n),
            a = geByClass1("_im_chat_input_error", r);
        if (I(t, e)) {
            n.disabled = !0;
            var i;
            if (E(t, e)) i = getLang("mail_send_privacy_error");
            else if (S(t, e)) i = getLang("mail_chat_youre_kicked");
            else if (L(t, e))
                if (w(t, e)) i = getLang("mail_community_is_blocked");
                else {
                    var o = e.get().block_states[t].name;
                    i = getLang("mail_community_answering").replace("{username}", o)
                }
            else i = getLang("mail_cant_send_messages_to_community");
            return addClass(n, "im-chat-input--text_disabled"), addClass(r, "im-chat-input_error"), n.contentEditable = "false", val(a, i), !0
        }
        return n.disabled && (n.disabled = !1, removeClass(r, "im-chat-input_error"), n.contentEditable = "true", removeClass(n, "im-chat-input--text_disabled"), val(a, "")), !1
    }

    function D(e, t, n) {
        return (0, U.isVoiceMessageAvailable)(e).then(function(r) {
            if (!r) return !0;
            if (trim(n)) return !0;
            var a = geByClass1("_im_text", t),
                i = Emoji.val(a);
            return trim(i) ? !0 : Promise.all([(0, H.getAttaches)(e, e.get().peer), (0, H.getForwardedMessages)(e.get().peer, cur.imDb, e.get())]).then(function(e) {
                var t = F(e, 2),
                    n = t[0],
                    r = t[1];
                return n.length > 0 || r.length > 0
            })
        })
    }

    function x(e, t, n) {
        var r = geByClass1("_im_send", t.parentNode);
        a(r, {
            fasthide: !0
        }), D(e, t, n).then(function(e) {
            toggleClass(r, "im-send-btn_audio", !e), toggleClass(r, "im-send-btn_send", e), e && removeClass(r, "im-send-btn_saudio");
            var t = e ? getLang("mail_send2") : getLang("mail_added_audiomsg");
            attr(r, "aria-label", t)
        })
    }

    function R(e) {
        var t = ge(ee),
            n = t.offsetHeight;
        toggleClass(e, "im-chat-input--overflowed", n > 400)
    }

    function B(e, t, n) {
        cur.share_timehash = t.get().share_timehash;
        var r = (0, W.createMutations)(T),
            i = r.callMutations,
            o = r.bindMutations,
            s = (0, V.mount)(e, t, i),
            u = m.bind(null, t);
        ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
        var d = (0, z.initQueue)(u, p.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }),
            g = d.pushMessage,
            b = d.inspectQueue,
            y = d.resend,
            S = d.setErrored,
            E = d.complete,
            w = l.bind(null, t, n, g, i, e),
            L = A.bind(null, t);
        hide(geByClass1("ms_items_more_helper", e));
        var O = [
            ["video", getLang("profile_wall_video")],
            ["audio", getLang("profile_wall_audio")],
            ["doc", getLang("profile_wall_doc")],
            ["map", getLang("profile_wall_map")],
            ["gift", getLang("profile_wall_gift")]
        ];
        t.get().moneyTransferAvail && O.push(["money", getLang("profile_wall_money")]), O.unshift(["photo", getLang("mail_added_photo")]);
        var B, F = new MediaSelector(geByClass1(X, e), ee, O, {
                maxShown: 0,
                vectorIcon: !0,
                onAddMediaChange: function(r, a, i, o) {
                    return h(n, t, G, e, r, a, i, o, F)
                },
                editable: 1,
                onChangedSize: function() {
                    var r = n().updateScroll();
                    n().scrollFix(t, t.get().peer, r), R(e)
                },
                sortable: 1,
                teWidth: 150,
                mail: 1,
                teHeight: 100,
                forceToUp: !0,
                toId: t.get().gid ? -t.get().gid : void 0,
                blockPersonal: t.get().gid ? 1 : 0,
                docParams: t.get().gid ? {
                    imhash: t.get().im_doc_hash,
                    from: "from_gim"
                } : {}
            }),
            G = f.bind(null, t, n, g, e, i, F),
            q = debounce(k.bind(null, t, F), 500),
            K = l.bind(null, t, n, g, i, e),
            Q = (0, j.mount)(e, t, K, function() {
                addClass(ne, "im-send-btn_audio"), removeClass(ne, "im-send-btn_static")
            }),
            Y = _(e, t, function(r, a) {
                var i = t.get().peer,
                    o = Emoji.val(a);
                (0, U.isReservedPeer)(i) || I(i, t) || t.get().tabs[i].imdraft == o || !o || M(t), x(t, e, o), q(r, a);
                var s = e.offsetHeight;
                if (B && B !== s) {
                    var l = n().updateScroll();
                    n().scrollFix(t, t.get().peer, l)
                }
                B = s
            }, G, w, s),
            Z = G.bind(null, []),
            te = v.bind(null, t, e),
            ne = geByClass1("_im_send", e);
        t.get().textMediaSelector = F, t.set(H.initTextStore.bind(null, b, y, S, E));
        var re = (ge(ee), geByClass1("_im_text", e));
        setTimeout(function() {
            i().restoreDraft(t)
        }, 0);
        var ae = P.bind(null, Y, t, re, F),
            ie = C.bind(null, t, e, n),
            oe = c.bind(null, t),
            se = (0, W.createModule)({
                handlers: function(n, r) {
                    n(ne, "click", function() {
                        D(t, e).then(function(e) {
                            e ? G([]) : (a(ne, {
                                fasthide: !0
                            }), Q.start(), setTimeout(function() {
                                return removeClass(ne, "im-send-btn_saudio")
                            }, 300))
                        })
                    }), n(ne, "mouseover", te), n(re, "focus", function() {
                        t.get().longpoll.push([N.eventTypes.transitionEvent("message")]), cur.focused = t.get().peer
                    }), n(re, "blur", function() {
                        var e = 0 === t.get().peer ? "search" : "default";
                        t.get().longpoll.push([N.eventTypes.transitionEvent(e)]), cur.focused = !1
                    }), r(e, "click", "_im_rc_emoji", ae), r(e, "click", $, ie), r(e, "click", "_im_will_fwd", L), r(bodyNode, "click", J, oe)
                }
            });
        return o(F, re, e, Z, n, b, s, Y, se, Q)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var F = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.mount = B;
    var N = n(11),
        j = n(69),
        H = n(1),
        U = n(3),
        G = n(5),
        z = n(41),
        q = n(83),
        K = n(10),
        W = n(2),
        V = n(74),
        Q = 4e3,
        Y = 3980,
        X = "_im_media_selector",
        Z = "_im_media_fwd",
        $ = "_im_fwd_close",
        J = "_im_submit_btn",
        ee = "_im_media_preview"
}, function(module, exports, __webpack_require__) {
    "use strict";

    function uploadFailed(e, t, n) {
        var r = void 0 !== t.ind ? t.ind : t;
        if ((t.fileName ? t.fileName : t).replace(/[&<>"']/g, ""), "fileApi" == Upload.types[r] && !Upload.options[r].wiki_editor) {
            var a = t.fileName ? r + "_" + t.fileName : t;
            re("upload" + a + "_progress_wrap"), e().unchoose(a)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    }

    function onPhotoUploaded(e, t, n) {
        var r = void 0 !== e.ind ? e.ind : e,
            a = (e.fileName ? e.fileName : e).replace(/[&<>"']/g, ""),
            i = e.fileName ? r + "_" + e.fileName : e,
            o = ge("upload" + i + "_progress_wrap");
        o && hide(geByClass1("progress_x", o)), ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, t), {
            onDone: function(e, t) {
                n().choose("photo", e, extend(t, {
                    upload_ind: r + "_" + a
                }))
            },
            onFail: uploadFailed.bind(null, n, e)
        })
    }

    function uploadHide(e) {
        hide(geByClass1(DROPBOX_CLASS, e)), hide(geByClass1(UPLOAD_WRAP_CLASS, e))
    }

    function uploadShow(e) {
        hide(geByClass1(DROPBOX_CLASS, e)), hide(geByClass1(UPLOAD_WRAP_CLASS, e))
    }

    function initUploader(text, store, parentMutations) {
        var txtInput = geByClass1("_im_text_wrap", text),
            data = store.get().upload_options,
            uploadHolder = geByClass1(UPLOAD_CLASS, text),
            dropbox = geByClass1(DROPBOX_CLASS, text),
            docsOpening = !1;
        return Upload.init(uploadHolder, data.url, data.params, {
            file_name: "photo",
            file_size_limit: 26214400,
            file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
            file_types: "*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.jpeg;*.JPEG",
            file_input: null,
            accept: "image/jpeg,image/png,image/gif",
            file_match: data.opts.ext_re,
            lang: data.opts.lang,
            wiki_editor: 0,
            onUploadStart: function(e, t) {
                removeClass(txtInput, "im-chat-input--textarea_drag");
                var n = void 0 !== e.ind ? e.ind : e,
                    r = Upload.options[n];
                "form" == Upload.types[n] && (geByClass1("file", ge("choose_photo_upload")).disabled = !0), "fileApi" == Upload.types[n] && (cur.notStarted && (boxQueue.hideLast(), delete cur.notStarted), r.multi_progress && this.onUploadProgress(e, 0, 0))
            },
            onUploadComplete: function onUploadComplete(info, res) {
                var params, i = void 0 !== info.ind ? info.ind : info,
                    fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, "");
                try {
                    params = eval("(" + res + ")")
                } catch (e) {
                    params = q2ajx(res)
                }
                return params.photos ? (statlogsValueEvent("upload_photo_fails", 1, data.opts.server, "success"), void onPhotoUploaded(info, params, parentMutations)) : void Upload.onUploadError(info)
            },
            onUploadProgress: function(e, t, n) {
                var r = void 0 !== e.ind ? e.ind : e;
                if ("fileApi" == Upload.types[r]) {
                    var a = {
                        loaded: t,
                        total: n
                    };
                    e.fileName && (a.fileName = e.fileName.replace(/[&<>"']/g, "")), parentMutations().progress("photo", r, a)
                }
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, data.opts.server, t), uploadFailed(parentMutations, e, t)
            },
            onCheckServerFailed: function() {
                uploadHide(text)
            },
            onUploadCompleteAll: function(e) {
                "form" == Upload.types[e] && Upload.embed(e)
            },
            onDragEnter: function(e) {
                if (browser.chrome && e.dataTransfer && e.dataTransfer.items && !docsOpening) {
                    var t = e.dataTransfer.items[0].type.split("/");
                    if (!t[1] || t[1].match(/^(jpg|jpeg|png)$/i) || ge("docs_choose_upload_area_wrap")) addClass(txtInput, "im-chat-input--textarea_drag");
                    else {
                        var n = store.get().gid ? {
                            imhash: store.get().im_doc_hash,
                            from: "from_gim"
                        } : {};
                        cur.dropDoc = !0, docsOpening = !0, cur.chooseMedia = parentMutations().choose;
                        var r = 0;
                        cur.showMediaProgress = function() {
                            0 === r && boxQueue.hideLast(), r++, parentMutations().progress.apply(null, arguments)
                        }, cur.attachCount = parentMutations().attachCount, showBox("docs.php", extend({
                            act: "a_choose_doc_box",
                            toId: cur.gid ? -cur.gid : void 0,
                            scrollbar_width: sbWidth(),
                            blockPersonal: cur.gid ? 1 : 0,
                            mail_add: 1
                        }, n), {
                            stat: ["docs.css"],
                            params: {
                                onBeforeHide: function() {
                                    docsOpening = !1
                                }
                            },
                            onFail: function() {
                                docsOpening = !1
                            }
                        }), setTimeout(uploadHide.bind(null, text))
                    }
                }
            },
            onDragOut: function() {
                removeClass(txtInput, "im-chat-input--textarea_drag")
            },
            onDrop: function() {
                removeClass(txtInput, "im-chat-input--textarea_drag")
            },
            noFlash: 1,
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "photo",
            max_attempts: 3,
            server: data.opts.server,
            error: data.opts.default_error,
            error_hash: data.opts.error_hash,
            dropbox: dropbox,
            label: data.opts.label,
            dragEl: bodyNode
        })
    }

    function mount(e, t, n) {
        removeEvent(bodyNode, "dragover dragenter");
        var r = initUploader(e, t, n);
        uploadShow(e);
        var a = (0, _modules.createModule)({
            handlers: function(e) {
                var t = ge("im_full_upload");
                e(t, "change", function n(i) {
                    Upload.onFileApiSend(r, i.target.files), (0, _modules.destroyModule)(a);
                    var o = t.cloneNode();
                    t.parentNode.replaceChild(o, t), t = o, e(t, "change", n)
                })
            }
        });
        return {
            paste: function(e) {
                Upload.onFileApiSend(r, e)
            },
            unmount: function() {
                (0, _modules.destroyModule)(a), Upload.deinit(r)
            }
        }
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.mount = mount;
    var _modules = __webpack_require__(2),
        UPLOAD_CLASS = "_im_upload",
        DROPBOX_CLASS = "_im_upload_dropbox",
        UPLOAD_WRAP_CLASS = "_im_upload_wrap"
}, function(e, t) {
    "use strict";

    function n() {
        var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia,
            t = function(t) {
                return new Promise(function(n, r) {
                    e ? e.call(navigator, t, n, r) : r(new Error("NotSupported"))
                })
            },
            n = function() {
                return new Promise(function(e, t) {
                    if (MediaStreamTrack && MediaStreamTrack.getSources) {
                        var n = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return MediaStreamTrack.getSources(function(t) {
                            e(t.map(function(e) {
                                return {
                                    label: e.label,
                                    kind: n[e.kind],
                                    deviceId: e.id,
                                    groupId: ""
                                }
                            }))
                        })
                    }
                    t(new Error("NotSupported"))
                })
            };
        e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = t), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = n)), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initFailBack = n
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
    }

    function a(e) {
        return e.selection = [], Promise.resolve(e)
    }

    function i(e, t) {
        return t.selection = t.selection.filter(function(t) {
            return t.id !== e
        }), Promise.resolve(t)
    }

    function o(e, t, n, r, a, o, s) {
        var l = intval(domData(s, "peer"));
        tooltips.hide(s), t.set(i.bind(null, l)).then(function(i) {
            c(e, r, t, a), n().selectionDeleted(t, l)
        })
    }

    function s(e) {
        var t = 0;
        return function() {
            var n = e.offsetWidth;
            setStyle(e, {
                width: 1
            });
            var r = e.offsetLeft;
            if (t === r) return void setStyle(e, {
                width: n
            });
            t = r;
            var n = e.parentNode.offsetWidth;
            setStyle(e, {
                width: Math.max(30, n - r - 20)
            })
        }
    }

    function l(e, t, n, r) {
        e.set(f.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
    }

    function u(e, t, n, r) {
        e.set(a).then(c.bind(null, t, n, e, r))
    }

    function c(e, t, n, r) {
        var a = n.get().selection,
            i = uiSearch.getFieldEl(e);
        uiSearch.focus(e), a.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = a.map(function(e) {
            return '<div class="token">\n      <div class="token_title">' + e.name + '</div>\n      <div data-peer="' + e.id + '" class="token_del ' + p + '"></div>\n    </div>'
        }).join(""), toggleClass(e, "ui_multiselect_has_selection", a.length > 0), domFC(e).scrollTop += 50, r()
    }

    function d(e, t) {
        return showTooltip(t, {
            text: getLang("mail_create_chat_remove_user"),
            black: 1,
            shift: [15, 8],
            appendParentCls: "_wrap"
        })
    }

    function g(e, t, n) {
        uiSearch.init(e, {
            onChange: l.bind(null, t, n)
        });
        var g = uiSearch.getFieldEl(e),
            f = ce("div", {
                className: "_ui_multiselection ui_multiselect_cnt"
            });
        g && g.parentNode.insertBefore(f, g);
        var _ = s(g);
        t.set(a);
        var h = o.bind(null, e, t, n, f, _),
            v = function() {
                return uiSearch.focus(e)
            },
            b = (0, m.createModule)({
                handlers: function(t, n) {
                    n(e, "click", p, h), n(e, "mouseover", p, d), t(e, "click", v)
                }
            });
        return {
            addSelection: function(n, a) {
                return t.set(r.bind(null, {
                    id: n,
                    name: a
                })).then(c.bind(null, e, f, t, _))
            },
            removeSelection: function(n) {
                return t.set(i.bind(null, n)).then(c.bind(null, e, f, t, _))
            },
            resetSelection: function() {
                u(t, e, f, _)
            },
            focus: function() {
                uiSearch.focus(e)
            },
            save: function() {
                t.stash(), c(e, f, t, _)
            },
            restore: function() {
                t.pop(), c(e, f, t, _)
            },
            unmount: function() {
                uiSearch.destroy(e), (0, m.destroyModule)(b)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var f = n(1),
        m = n(2),
        p = "_ui_multiselect_cancel"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var a = n(68),
        i = n(6),
        o = r(i),
        s = n(115),
        l = n(4),
        u = n(1);
    window.IM = {
        init: function(e) {
            window.Promise || (window.Promise = s.Promise), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                blacklist_hash: e.thash
            }, (0, u.updateMentions)(e);
            var t = 60 * (new Date).getTimezoneOffset(),
                n = -10800,
                r = n - t,
                i = e.timeshift;
            e.timeshift = i - r, e.unread_dialogs = Object.keys(e.tabs).filter(function(t) {
                return e.tabs[t].unread > 0
            }).map(intval);
            var c = (0, o["default"])(e),
                d = (0, a.mount)(geByClass1("js-im-page", ge("page_body")), c);
            IM.chatPhotoSaved = function(e) {
                curBox() && curBox().hide();
                var t = (e || {})[1];
                return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || c.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
            }, IM.updateHistory = function(e) {
                c.set(u.updateHistory.bind(null, e)).then(function() {
                    d.updateHistory(e)
                })
            }, IM.activateTab = function(e) {
                c.get().longpoll.push([(0, l.changePeer)(intval(e), !1, !1, !0)])
            };
            var g = !1;
            cur.nav.push(function() {
                if (g) return !0;
                c.get().audio_msg && c.get().audio_msg.isRecording && d.cancelRecording(), AudioMessagePlayer.detachPlayer();
                var t = d.route.apply(null, arguments);
                return t !== !1 && (d.unmount(), IM.activateTab = void 0, IM.chatPhotoSaved = void 0, IM.updateHistory = void 0, c.unmount(), g = !0, e = !1, c = !1, d = !1), t
            })
        }
    };
    try {
        stManager.done("imn.js")
    } catch (c) {}
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n, r, a = function(a) {
                n = "undefined" != typeof a.clientX ? a.clientX : a.touches[0].clientX, r = "undefined" != typeof a.clientY ? a.clientY : a.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, r)
            },
            i = function s(i) {
                t.onDrop && t.onDrop.call(e, n, r), removeEvent(document, "mouseup touchend mouseleave", s), removeEvent(document, "mousemove touchmove", a)
            },
            o = function(o) {
                (1 === o.which || o.touches && o.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", i), addEvent(document, "mousemove touchmove", a), n = "undefined" != typeof o.clientX ? o.clientX : o.touches[0].clientX, r = "undefined" != typeof o.clientY ? o.clientY : o.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, r), t.onDrag && t.onDrag.call(e, n, r), cancelEvent(o))
            };
        e.beginDragHandler = o, addEvent(e, "mousedown touchstart", o)
    }

    function r(e) {
        removeEvent(e, "mousedown touchstart", e.beginDragHandler)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initDraggable = n, t.removeDraggable = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = c.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r, a = 0; a < n.length; a++) {
                    var i, o = s(n[a], 2),
                        l = o[0],
                        u = o[1];
                    if (hasClass(e.target, l) ? i = u(e, e.target) : (r = gpeByClass(l, e.target, e.currentTarget)) && (i = u(e, r)), i === !1) break
                }
        }
    }

    function i(e, t, n, r) {
        var i = c.get(e);
        i || (c.set(e, {}), i = c.get(e));
        for (var o = t.split(" "), s = 0; s < o.length; s++) {
            var l = o[s];
            i[l] || (i[l] = [], addEvent(e, l, a)), i[l].push([n, r])
        }
    }

    function o(e, t, n, r) {
        var i = c.get(e);
        if (i) {
            var o = (t.split(" ").forEach(function(t) {
                i[t] && (i[t] = i[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === i[t].length && removeEvent(e, t, a))
            }), Object.keys(i).map(function(e) {
                return i[e].length
            }).reduce(function(e, t) {
                return e + t
            }));
            0 === o && c["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t.addDelegateEvent = i, t.removeDelegateEvent = o;
    var l = n(44),
        u = r(l),
        c = new u["default"]
}, function(e, t) {
    "use strict";

    function n(e) {
        l = l.reduce(function(t, n) {
            var r = s(n, 2),
                a = r[0],
                i = r[1],
                o = i(e);
            return o ? t : t.concat([
                [a, i]
            ])
        }, [])
    }

    function r(e, t) {
        c === !1 && (c = !0, document.body.addEventListener("click", n, !0)), l = l.concat([
            [e, t]
        ])
    }

    function a(e) {
        l = l.filter(function(t) {
            var n = s(t, 1),
                r = n[0];
            return r !== e
        }), 0 === u && (document.body.removeEventListener("click", n, !0), c = !1)
    }

    function i(e, t) {
        l = l.map(function(n) {
            var r = s(n, 2),
                a = r[0],
                i = r[1];
            return a === e ? [e, t] : [a, i]
        })
    }

    function o(e, t) {
        return 0 === t.length ? function(t) {
            return e(t), !0
        } : function(n) {
            var r = t.reduce(function(e, t) {
                return e && !domClosest(t, n.target)
            }, !0);
            return r && e(n), r
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
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
    t["default"] = function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
        return u++, {
            stop: function() {
                u--, a(e)
            },
            replaceOrAdd: function(n) {
                var a = l.filter(function(t) {
                        var n = s(t, 1),
                            r = n[0];
                        return e === r
                    }),
                    u = o(n, t);
                a.length > 0 ? i(e, u) : r(e, u)
            }
        }
    };
    var l = [],
        u = 0,
        c = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return data.state = e, Promise.resolve(data)
    }

    function i(e, t, n, r, a) {
        switch (t) {
            case f.ARROW_UP:
                r.scroll(a, "up"), cancelEvent(n);
                break;
            case f.ARROW_DOWN:
                r.scroll(a, "down"), cancelEvent(n);
                break;
            case f.PAGE_UP:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "up", !0), cancelEvent(n));
                break;
            case f.PAGE_DOWN:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "down", !0), cancelEvent(n));
                break;
            case f.HOME:
                (0, g.isEditableFocused)() || (r.scroll(a, "up", !1, !0), cancelEvent(n));
                break;
            case f.END_KEY:
                (0, g.isEditableFocused)() || (r.scroll(a, "down", !1, !0), cancelEvent(n));
                break;
            case f.PRINTABLE:
                r.focustTxt(e)
        }
    }

    function o(e, t, n, r, a, i) {
        switch (t) {
            case f.ARROW_DOWN:
                r.hoverNextDialog(i), cancelEvent(n);
                break;
            case f.ARROW_UP:
                r.hoverPrevDialog(i), cancelEvent(n);
                break;
            case f.ENTER:
                (!(0, g.isEditableFocused)() || gpeByClass("_im_dialogs_search_input", document.activeElement)) && r.selectHoveredDialog(i);
                break;
            case f.PRINTABLE:
                a.focusInput(i)
        }
    }

    function s(e, t, n, r, a) {
        switch (t) {
            case f.HOME:
            case f.END_KEY:
                r.isEmpty(a) && i(e, t, n, r, a);
                break;
            case f.PAGE_UP:
            case f.PAGE_DOWN:
                i(e, t, n, r, a)
        }
    }

    function l(e, t, n, r, a) {
        switch (t) {
            case f.PAGE_UP:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("up"), cancelEvent(n));
                break;
            case f.PAGE_DOWN:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("down"), cancelEvent(n));
                break;
            case f.ARROW_DOWN:
                r.hoverNextElement(a);
                break;
            case f.ARROW_UP:
                r.hoverPrevElement(a);
                break;
            case f.ENTER:
                gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(a) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(a);
                break;
            case f.PRINTABLE:
                r.focusSearch(a)
        }
    }

    function u(e, t, n, r, u, c) {
        var g = (0, d["default"])({
            state: t || "default"
        });
        return {
            signal: function(t, a) {
                switch (g.get().state) {
                    case "default":
                        return i(g, t, a, r, e);
                    case "fwd":
                    case "search":
                        return o(g, t, a, n, u, e);
                    case "create":
                        return l(g, t, a, c, e);
                    case "message":
                        return s(g, t, a, r, e);
                    default:
                        throw new Error("Unknown state: " + g.get().state)
                }
            },
            transition: function(e) {
                return g.set(a.bind(null, e))
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.create = u;
    var c = n(6),
        d = r(c),
        g = n(3),
        f = n(9)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.queue || e.key
    }

    function i(e) {
        return window.curNotifier ? !curNotifier.addQueues[a(e)] : !1
    }

    function o(e) {
        return window.curNotifier ? void!curNotifier.addQueues[a(e)] : !1
    }

    function s() {
        _.forEach(function(e, t) {
            var n = e.onData,
                r = e.onUpdateKey,
                a = e.ts;
            i(t) && Notifier.addKey(extend(t, {
                ts: a
            }), d.bind(null, n, r, t))
        })
    }

    function l() {
        h || (h = setInterval(s, 3e3))
    }

    function u(e) {
        o(e), _["delete"](e), 0 === _.size && (clearInterval(h), h = !1)
    }

    function c(e, t, n, r) {
        var a;
        switch (e) {
            case 1:
            case 2:
            case 3:
            case 5:
                a = r(t, e);
                break;
            case 4:
                a = (0, p.pause)(1).then(function() {
                    return t
                });
                break;
            default:
                throw new Error("Unkonwn error from queue: " + e)
        }(0, p.pause)(3).then(function() {
            return a
        }).then(function(e) {
            _.set(e, {
                onUpdateKey: r,
                onData: n,
                ts: e.ts
            }), s(), l()
        })
    }

    function d(e, t, n, r, a) {
        return a.failed ? (u(n), void c(a.err, n, e, t)) : (_.set(n, {
            onData: e,
            onUpdateKey: t,
            ts: intval(a.ts)
        }), void a.events.map(function(e) {
            return e.split("<!>")
        }).forEach(e))
    }

    function g(e, t, n) {
        return Notifier.addKey(e, d.bind(null, t, n, e)), _.set(e, {
            onData: t,
            onUpdateKey: n,
            ts: e.ts
        }), l(), {
            stop: u.bind(null, e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createWorker = g;
    var f = n(44),
        m = r(f),
        p = n(20),
        _ = new m["default"],
        h = !1
}, function(e, t) {
    "use strict";

    function n() {
        try {
            if (window.crypto) {
                var e = new Int32Array(1);
                return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                    return e + t
                }))
            }
        } catch (t) {}
        return intval(rand(0, r).toFixed(0))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.random = n;
    var r = (t.MAX_SAFE_INTEGER = 9007199254740991, t.MAX_INTERGER = 2147483647)
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.screenfull = function() {
        var e = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            t = function() {
                for (var e, t, n = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], r = 0, a = n.length, i = {}; a > r; r++)
                    if (e = n[r], e && e[1] in document) {
                        for (r = 0, t = e.length; t > r; r++) i[n[0][r]] = e[r];
                        return i
                    }
                return !1
            }(),
            n = {
                request: function r(n) {
                    var r = t.requestFullscreen;
                    n = n || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? n[r]() : n[r](e && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[t.exitFullscreen]()
                },
                toggle: function(e) {
                    this.isFullscreen ? this.exit() : this.request(e)
                },
                raw: t
            };
        return t ? (Object.defineProperties(n, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[t.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[t.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[t.fullscreenEnabled])
                }
            }
        }), n) : !1
    }()
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(7)("unscopables"),
        a = Array.prototype;
    void 0 == a[r] && n(14)(a, r, {}), e.exports = function(e) {
        a[r][e] = !0
    }
}, function(e, t, n) {
    var r = n(26),
        a = n(58),
        i = n(107);
    e.exports = function(e) {
        return function(t, n, o) {
            var s, l = r(t),
                u = a(l.length),
                c = i(o, u);
            if (e && n != n) {
                for (; u > c;)
                    if (s = l[c++], s != s) return !0
            } else
                for (; u > c; c++)
                    if ((e || c in l) && l[c] === n) return e || c;
            return !e && -1
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(18).f,
        a = n(55),
        i = (n(14), n(56)),
        o = n(23),
        s = n(45),
        l = n(24),
        u = n(51),
        c = n(31),
        d = n(53),
        g = n(105),
        f = n(12),
        m = n(54).fastKey,
        p = f ? "_s" : "size",
        _ = function(e, t) {
            var n, r = m(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, c) {
            var d = e(function(e, r) {
                s(e, d, t, "_i"), e._i = a(null), e._f = void 0, e._l = void 0, e[p] = 0, void 0 != r && u(r, n, e[c], e)
            });
            return i(d.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[p] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = _(t, e);
                    if (n) {
                        var r = n.n,
                            a = n.p;
                        delete t._i[n.i], n.r = !0, a && (a.n = r), r && (r.p = a), t._f == n && (t._f = r), t._l == n && (t._l = a), t[p]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    s(this, d, "forEach");
                    for (var t, n = o(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!_(this, e)
                }
            }), f && r(d.prototype, "size", {
                get: function() {
                    return l(this[p])
                }
            }), d
        },
        def: function(e, t, n) {
            var r, a, i = _(e, t);
            return i ? i.v = n : (e._l = i = {
                i: a = m(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = i), r && (r.n = i), e[p]++, "F" !== a && (e._i[a] = i)), e
        },
        getEntry: _,
        setStrong: function(e, t, n) {
            c(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [n.k, n.v]) : (e._t = void 0, d(1))
            }, n ? "entries" : "values", !n, !0), g(t)
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(8),
        a = n(50),
        i = n(19),
        o = n(56),
        s = n(54),
        l = n(51),
        u = n(45),
        c = n(15),
        d = n(25),
        g = n(96),
        f = n(33),
        m = n(91);
    e.exports = function(e, t, n, p, _, h) {
        var v = r[e],
            b = v,
            y = _ ? "set" : "add",
            C = b && b.prototype,
            T = {},
            S = function(e) {
                var t = C[e];
                i(C, e, "delete" == e ? function(e) {
                    return h && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return h && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return h && !c(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (h || C.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var E = new b,
                w = E[y](h ? {} : -0, 1) != E,
                I = d(function() {
                    E.has(1)
                }),
                k = g(function(e) {
                    new b(e)
                }),
                P = !h && d(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            k || (b = t(function(t, n) {
                u(t, b, e);
                var r = m(new v, t, b);
                return void 0 != n && l(n, _, r[y], r), r
            }), b.prototype = C, C.constructor = b), (I || P) && (S("delete"), S("has"), _ && S("get")), (P || w) && S(y), h && C.clear && delete C.clear
        } else b = p.getConstructor(t, e, _, y), o(b.prototype, n), s.NEED = !0;
        return f(b, e), T[e] = b, a(a.G + a.W + a.F * (b != v), T), h || p.setStrong(b, e, _), b
    }
}, function(e, t, n) {
    e.exports = n(8).document && document.documentElement
}, function(e, t, n) {
    var r = n(15),
        a = n(104).set;
    e.exports = function(e, t, n) {
        var i, o = t.constructor;
        return o !== n && "function" == typeof o && (i = o.prototype) !== n.prototype && r(i) && a && a(e, i), e
    }
}, function(e, t, n) {
    var r = n(47);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t, n) {
    var r = n(21),
        a = n(7)("iterator"),
        i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[a] === e)
    }
}, function(e, t, n) {
    var r = n(17);
    e.exports = function(e, t, n, a) {
        try {
            return a ? t(r(n)[0], n[1]) : t(n)
        } catch (i) {
            var o = e["return"];
            throw void 0 !== o && r(o.call(e)), i
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(55),
        a = n(32),
        i = n(33),
        o = {};
    n(14)(o, n(7)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
            next: a(1, n)
        }), i(e, t + " Iterator")
    }
}, function(e, t, n) {
    var r = n(7)("iterator"),
        a = !1;
    try {
        var i = [7][r]();
        i["return"] = function() {
            a = !0
        }, Array.from(i, function() {
            throw 2
        })
    } catch (o) {}
    e.exports = function(e, t) {
        if (!t && !a) return !1;
        var n = !1;
        try {
            var i = [7],
                o = i[r]();
            o.next = function() {
                n = !0
            }, i[r] = function() {
                return o
            }, e(i)
        } catch (s) {}
        return n
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    var r = n(18),
        a = n(17),
        i = n(102);
    e.exports = n(12) ? Object.defineProperties : function(e, t) {
        a(e);
        for (var n, o = i(t), s = o.length, l = 0; s > l;) r.f(e, n = o[l++], t[n]);
        return e
    }
}, function(e, t, n) {
    var r = n(103),
        a = n(32),
        i = n(26),
        o = n(59),
        s = n(13),
        l = n(52),
        u = Object.getOwnPropertyDescriptor;
    t.f = n(12) ? u : function(e, t) {
        if (e = i(e), t = o(t, !0), l) try {
            return u(e, t)
        } catch (n) {}
        return s(e, t) ? a(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    var r = n(13),
        a = n(108),
        i = n(34)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = a(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
}, function(e, t, n) {
    var r = n(13),
        a = n(26),
        i = n(87)(!1),
        o = n(34)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = a(e),
            l = 0,
            u = [];
        for (n in s) n != o && r(s, n) && u.push(n);
        for (; t.length > l;) r(s, n = t[l++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t, n) {
    var r = n(101),
        a = n(49);
    e.exports = Object.keys || function(e) {
        return r(e, a)
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    var r = n(15),
        a = n(17),
        i = function(e, t) {
            if (a(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(23)(Function.call, n(99).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (a) {
                t = !0
            }
            return function(e, n) {
                return i(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: i
    }
}, function(e, t, n) {
    "use strict";
    var r = n(8),
        a = n(18),
        i = n(12),
        o = n(7)("species");
    e.exports = function(e) {
        var t = r[e];
        i && t && !t[o] && a.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, n) {
    var r = n(35),
        a = n(24);
    e.exports = function(e) {
        return function(t, n) {
            var i, o, s = String(a(t)),
                l = r(n),
                u = s.length;
            return 0 > l || l >= u ? e ? "" : void 0 : (i = s.charCodeAt(l), 55296 > i || i > 56319 || l + 1 === u || (o = s.charCodeAt(l + 1)) < 56320 || o > 57343 ? e ? s.charAt(l) : i : e ? s.slice(l, l + 2) : (i - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, function(e, t, n) {
    var r = n(35),
        a = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? a(e + t, 0) : i(e, t)
    }
}, function(e, t, n) {
    var r = n(24);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(46),
        a = n(7)("iterator"),
        i = n(21);
    e.exports = n(22).getIteratorMethod = function(e) {
        return void 0 != e ? e[a] || e["@@iterator"] || i[r(e)] : void 0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(86),
        a = n(53),
        i = n(21),
        o = n(26);
    e.exports = n(31)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, a(1)) : "keys" == t ? a(0, n) : "values" == t ? a(0, e[n]) : a(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    "use strict";
    var r = n(88);
    e.exports = n(89)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = r.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return r.def(this, 0 === e ? 0 : e, t)
        }
    }, r, !0)
}, function(e, t, n) {
    "use strict";
    var r = n(46),
        a = {};
    a[n(7)("toStringTag")] = "z", a + "" != "[object z]" && n(19)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, function(e, t, n) {
    "use strict";
    var r = n(106)(!0);
    n(31)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    for (var r = n(110), a = n(19), i = n(8), o = n(14), s = n(21), l = n(7), u = l("iterator"), c = l("toStringTag"), d = s.Array, g = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], f = 0; 5 > f; f++) {
        var m, p = g[f],
            _ = i[p],
            h = _ && _.prototype;
        if (h) {
            h[u] || o(h, u, d), h[c] || o(h, c, p), s[p] = d;
            for (m in r) h[m] || a(h, m, r[m], !0)
        }
    }
}, function(e, t, n) {
    var r;
    (function(e, a, i) {
        (function() {
            "use strict";

            function o(e) {
                return "function" == typeof e || "object" == typeof e && null !== e
            }

            function s(e) {
                return "function" == typeof e
            }

            function l(e) {
                V = e
            }

            function u(e) {
                Z = e
            }

            function c() {
                return function() {
                    e.nextTick(p)
                }
            }

            function d() {
                return function() {
                    W(p)
                }
            }

            function g() {
                var e = 0,
                    t = new ee(p),
                    n = document.createTextNode("");
                return t.observe(n, {
                        characterData: !0
                    }),
                    function() {
                        n.data = e = ++e % 2
                    }
            }

            function f() {
                var e = new MessageChannel;
                return e.port1.onmessage = p,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function m() {
                return function() {
                    setTimeout(p, 1)
                }
            }

            function p() {
                for (var e = 0; X > e; e += 2) {
                    var t = re[e],
                        n = re[e + 1];
                    t(n), re[e] = void 0, re[e + 1] = void 0
                }
                X = 0
            }

            function _() {
                try {
                    var e = n(119);
                    return W = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return m()
                }
            }

            function h(e, t) {
                var n = this,
                    r = n._state;
                if (r === se && !e || r === le && !t) return this;
                var a = new this.constructor(b),
                    i = n._result;
                if (r) {
                    var o = arguments[r - 1];
                    Z(function() {
                        R(r, a, o, i)
                    })
                } else A(n, a, e, t);
                return a
            }

            function v(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(b);
                return k(n, e), n
            }

            function b() {}

            function y() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function C() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function T(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function S(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (a) {
                    return a
                }
            }

            function E(e, t, n) {
                Z(function(e) {
                    var r = !1,
                        a = S(n, t, function(n) {
                            r || (r = !0, t !== n ? k(e, n) : M(e, n))
                        }, function(t) {
                            r || (r = !0, L(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && a && (r = !0, L(e, a))
                }, e)
            }

            function w(e, t) {
                t._state === se ? M(e, t._result) : t._state === le ? L(e, t._result) : A(t, void 0, function(t) {
                    k(e, t)
                }, function(t) {
                    L(e, t)
                })
            }

            function I(e, t, n) {
                t.constructor === e.constructor && n === ae && constructor.resolve === ie ? w(e, t) : n === ue ? L(e, ue.error) : void 0 === n ? M(e, t) : s(n) ? E(e, t, n) : M(e, t)
            }

            function k(e, t) {
                e === t ? L(e, y()) : o(t) ? I(e, t, T(t)) : M(e, t)
            }

            function P(e) {
                e._onerror && e._onerror(e._result), O(e)
            }

            function M(e, t) {
                e._state === oe && (e._result = t, e._state = se, 0 !== e._subscribers.length && Z(O, e))
            }

            function L(e, t) {
                e._state === oe && (e._state = le, e._result = t, Z(P, e))
            }

            function A(e, t, n, r) {
                var a = e._subscribers,
                    i = a.length;
                e._onerror = null, a[i] = t, a[i + se] = n, a[i + le] = r, 0 === i && e._state && Z(O, e)
            }

            function O(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, a, i = e._result, o = 0; o < t.length; o += 3) r = t[o], a = t[o + n], r ? R(n, r, a, i) : a(i);
                    e._subscribers.length = 0
                }
            }

            function D() {
                this.error = null
            }

            function x(e, t) {
                try {
                    return e(t)
                } catch (n) {
                    return ce.error = n, ce
                }
            }

            function R(e, t, n, r) {
                var a, i, o, l, u = s(n);
                if (u) {
                    if (a = x(n, r), a === ce ? (l = !0, i = a.error, a = null) : o = !0, t === a) return void L(t, C())
                } else a = r, o = !0;
                t._state !== oe || (u && o ? k(t, a) : l ? L(t, i) : e === se ? M(t, a) : e === le && L(t, a))
            }

            function B(e, t) {
                try {
                    t(function(t) {
                        k(e, t)
                    }, function(t) {
                        L(e, t)
                    })
                } catch (n) {
                    L(e, n)
                }
            }

            function F(e) {
                return new _e(this, e).promise
            }

            function N(e) {
                function t(e) {
                    k(a, e)
                }

                function n(e) {
                    L(a, e)
                }
                var r = this,
                    a = new r(b);
                if (!Y(e)) return L(a, new TypeError("You must pass an array to race.")), a;
                for (var i = e.length, o = 0; a._state === oe && i > o; o++) A(r.resolve(e[o]), void 0, t, n);
                return a
            }

            function j(e) {
                var t = this,
                    n = new t(b);
                return L(n, e), n
            }

            function H() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function U() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function G(e) {
                this._id = me++, this._state = void 0, this._result = void 0, this._subscribers = [], b !== e && ("function" != typeof e && H(), this instanceof G ? B(this, e) : U())
            }

            function z(e, t) {
                this._instanceConstructor = e, this.promise = new e(b), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? M(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && M(this.promise, this._result))) : L(this.promise, this._validationError())
            }

            function q() {
                var e;
                if ("undefined" != typeof a) e = a;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var n = e.Promise;
                (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = pe)
            }
            var K;
            K = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var W, V, Q, Y = K,
                X = 0,
                Z = function(e, t) {
                    re[X] = e, re[X + 1] = t, X += 2, 2 === X && (V ? V(p) : Q())
                },
                $ = "undefined" != typeof window ? window : void 0,
                J = $ || {},
                ee = J.MutationObserver || J.WebKitMutationObserver,
                te = "undefined" != typeof e && "[object process]" === {}.toString.call(e),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            Q = te ? c() : ee ? g() : ne ? f() : void 0 === $ ? _() : m();
            var ae = h,
                ie = v,
                oe = void 0,
                se = 1,
                le = 2,
                ue = new D,
                ce = new D,
                de = F,
                ge = N,
                fe = j,
                me = 0,
                pe = G;
            G.all = de, G.race = ge, G.resolve = ie, G.reject = fe, G._setScheduler = l, G._setAsap = u, G._asap = Z, G.prototype = {
                constructor: G,
                then: ae,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var _e = z;
            z.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, z.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === oe && e > n; n++) this._eachEntry(t[n], n)
            }, z.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ie) {
                    var a = T(e);
                    if (a === ae && e._state !== oe) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof a) this._remaining--, this._result[t] = e;
                    else if (n === pe) {
                        var i = new n(b);
                        I(i, e, a), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, z.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === oe && (this._remaining--, e === le ? L(r, n) : this._result[t] = n), 0 === this._remaining && M(r, this._result)
            }, z.prototype._willSettleAt = function(e, t) {
                var n = this;
                A(e, void 0, function(e) {
                    n._settledAt(se, t, e)
                }, function(e) {
                    n._settledAt(le, t, e)
                })
            };
            var he = q,
                ve = {
                    Promise: pe,
                    polyfill: he
                };
            n(116).amd ? (r = function() {
                return ve
            }.call(t, n, t, i), !(void 0 !== r && (i.exports = r))) : "undefined" != typeof i && i.exports ? i.exports = ve : "undefined" != typeof this && (this.ES6Promise = ve), he()
        }).call(this)
    }).call(t, n(118), function() {
        return this
    }(), n(117)(e))
}, function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
    }
}, function(e, t) {
    function n() {
        u = !1, o.length ? l = o.concat(l) : c = -1, l.length && r()
    }

    function r() {
        if (!u) {
            var e = setTimeout(n);
            u = !0;
            for (var t = l.length; t;) {
                for (o = l, l = []; ++c < t;) o && o[c].run();
                c = -1, t = l.length
            }
            o = null, u = !1, clearTimeout(e)
        }
    }

    function a(e, t) {
        this.fun = e, this.array = t
    }

    function i() {}
    var o, s = e.exports = {},
        l = [],
        u = !1,
        c = -1;
    s.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new a(e, t)), 1 !== l.length || u || setTimeout(r, 0)
    }, a.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = i, s.addListener = i, s.once = i, s.off = i, s.removeListener = i, s.removeAllListeners = i, s.emit = i, s.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, s.cwd = function() {
        return "/"
    }, s.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, s.umask = function() {
        return 0
    }
}, function(e, t) {}]);