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
    e.exports = n(226)
}, function(e, t, n) {
    var r = n(230)("wks"),
        a = n(179),
        i = n(163).Symbol,
        o = "function" == typeof i;
    e.exports = function(e) {
        return r[e] || (r[e] = o && i[e] || (o ? i : a)("Symbol." + e))
    }
}, , function(e, t, n) {
    var r = n(61),
        a = n(150),
        i = n(82);
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
}, , , , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_chat_input_w", t),
            a = r.offsetHeight - r.clientHeight;
        return Math.min(window.clientHeight() - a, Math.max(Math.max(0, e), Pe + n.offsetHeight + t.offsetTop))
    }

    function i(e, t) {
        var n = intval(domData(t.target, "msgid")),
            r = gpeByClass("_im_mess_" + n, t.target),
            a = geByClass1("_im_log_body", r),
            i = geByClass1("_im_mess_susp_cont", r);
        a.innerHTML = i.innerHTML
    }

    function o(e, t) {
        return geByClass1("_im_mess_" + t, e)
    }

    function s(e, t, n) {
        var r = geByClass1(e, t),
            i = void 0,
            o = void 0;
        (0, ye.initDraggable)(r, {
            onStartDrag: function(e, t) {
                addClass(bodyNode, "cursor_ns_resize"), i = t, o = t
            },
            onDrop: function() {
                removeClass(bodyNode, "cursor_ns_resize")
            },
            onDrag: function(e, r) {
                var s = a(o - i + r, t);
                (0, ne.setClassicChatHeight)(s), n().fixHeight()
            }
        })
    }

    function l(e, t) {
        (0, ye.removeDraggable)(geByClass1(e, t))
    }

    function u(e) {
        hide(e.target)
    }

    function c(e, t, n, r, a, i, o, s, l) {
        removeClass(e, "im-page--history_empty"), h(e, t, n, r, a, i, o, s, l)
    }

    function d(e, t, n, r, a) {
        if (checkEvent(r)) return !0;
        var i = q2ajx(a.getAttribute("href")),
            o = intval(i.msgid);
        o && e.set(te.changePeer.bind(null, e.get().peer, o)).then(function() {
            k(n, t, o, e)
        }), cancelEvent(r)
    }

    function g(e, t, n) {
        var r = (0, re.getTab)(t, n),
            a = (0, te.strHistory)(r.history);
        toggleClass(e, "im-page--history_empty-hist", !a)
    }

    function m(e, t, n, r) {
        if (hasClass(n.target, "_im_mess_marker")) {
            var a = n.target;
            window.tooltips && (0, oe.toArray)(geByClass(ne.FAILED_CLASS, t)).map(function(e) {
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
                className: "im-page--failed-tt" + (i > 0 ? " no_delete" : ""),
                appendParentCls: "_chat_body_wrap",
                dir: "down",
                noZIndex: !0,
                shift: [12, 8],
                hasover: !0
            })
        }
    }

    function f(e) {
        return geByClass1("_im_peer_history", e)
    }

    function p(e) {
        addClass(e, "im-page--history_empty"), f(e).innerHTML = ""
    }

    function _(e, t) {
        var n = t.contHeight(),
            r = e.scrollTop + (n - e.contHeight);
        t.scrollTop(r)
    }

    function h(e, t, n, r, a, i, o) {
        var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !0,
            l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !1,
            u = (t.get().tabs || {})[n];
        a().hideError(), i.renderPeer(t);
        var c = geByClass1("_im_peer_history", e);
        if (!t.get().tabHistoryNotChanged) {
            val(geByClass1("_im_page_peer_name", e), u.tab);
            var d = (0, te.strHistory)(u.history);
            g(e, t, n), d || (d = getLang("mail_im_here_history")), val(c, d), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), (0, ne.isClassicInterface)(t) || (0, ne.fixTableCellChildHeight)("_chat_body_wrap", e), N(t, r, e)
        }
        if ((0, te.isSearchingInplace)(n, t.get()) ? a().showSearch(t) : a().cancelSearch(t, !1), o.changePeer(n, t), t.get().msgid) k(r, e, t.get().msgid, t);
        else if (u.scrollBottom && s) {
            _(u, r);
            var m = (0, ne.isMessagesVisible)(t, e, r),
                f = ee(m, 1),
                p = f[0];
            u.skipped || setTimeout(function() {
                u.unread && !p && A(t, e, !0), y(t, r, e)
            }, 100)
        } else E(r, e, a, t, l) || r.scrollBottom(Ae);
        window.LazyLoad && window.LazyLoad.scan(r.scroll ? r.scroll.scroller : !1)
    }

    function v(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || t.scrollTop(),
            a = t.scrollBottom(),
            i = t.contHeight(),
            o = e.get().peer;
        e.set(te.saveHistoryScroll.bind(null, o, r, a, i))
    }

    function b() {
        return ie.screenfull.isFullscreen
    }

    function y(e, t, n) {
        var r = (0, re.isGoToEndVisible)(e),
            a = 4 * t.getScrollHeight();
        t.scrollBottom() > a && !r && A(e, n, !0, 2 * t.getScrollHeight())
    }

    function w(e, t, n, r, a, i, o, s) {
        var l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0;
        if ((e.get().history_init || (e.get().history_init = !0, !(s.scrollTop() >= 0))) && !b()) {
            a.update(s), a.show();
            var u = e.get().peer;
            if (0 !== u && (0, ne.isFullyLoadedTab)(e.get(), u) && (Ce["default"].onHistoryScroll(s.scrollTop()), !layers.visible)) {
                var c = (0, re.isGoToEndVisible)(e),
                    d = (0, re.getTab)(e, u);
                d && !d.skipped && 0 > o ? y(e, s, i) : o > 0 && !d.skipped && !d.unread && j(e, i), I(e, s) && (c && d && !d.skipped && j(e, i), d.unread > 0 && C(e));
                var g = (0, ne.wrapLoading)(n);
                if (!(0, te.isSearchingInplace)(u, e.get()) && l && r(s), !Qe && (0 > o || 0 === s.scrollBottom()) && s.scrollBottom() < Ie) {
                    if ((0, te.isSearchingInplace)(u, e.get())) return;
                    if (d.skipped > 0 && !e.get().no_moving_down) {
                        var m = gpeByClass("_im_page_history", m),
                            f = e.get();
                        Qe = !0;
                        var p = e.set(te.loadLessHistory).then(t().loadHistory.bind(null, f.peer, {
                            reversed: !0
                        })).then(function() {
                            C(e), Qe = !1, A(e, m), d.skipped || e.set(te.changePeer.bind(null, e.get().peer, !1))
                        });
                        return x(m, !0), void p.then(x.bind(null, m, !1))
                    }
                }
                if (!Qe && s.scrollTop() < Ie) {
                    if ((0, te.isSearchingInplace)(u, e.get())) {
                        Qe = !0;
                        var _ = t().getSearchResulstModule();
                        return _.isAll(e) ? void(Qe = !1) : void g(_.loadMore(e).then(function(n) {
                            Qe = !1, n && (t().loadHistory(e.get().peer, {}, e, n), r(s))
                        }), "up")
                    }
                    var h = e.get();
                    d.allShown || (Qe = !0, g(e.set(te.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, h.peer, {})).then(function() {
                        Qe = !1, r(s)
                    }), "up"))
                }
                0 > o && $(e, u, s.scrollBottom(), i, t), (0, te.videoAutoPlayHandler)()
            }
        }
    }

    function C(e) {
        return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void 0 : e.set(te.readLastMessages.bind(null, e.get().peer))
    }

    function E(e, t, n, r, a) {
        var i = geByClass1("_im_unread_bar_row", t);
        if (i) {
            var o = r.get(),
                s = o.peer,
                l = i.getBoundingClientRect(),
                u = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
            if ((0, ne.isClassicInterface)(r)) {
                var c = (0, ne.isChatPeer)(s) && (0, _e.isPinnedMessageVisibleInTab)(o, s);
                u += De + (c ? (0, ne.getPinnedMessageHeight)() : 0)
            }
            var d = e.scrollTop() - u + l.top;
            return e.scrollTop(d), v(r, e, d), setTimeout(function() {
                s === r.get().peer && w(r, n, f(t), function() {}, a, t, 0, e)
            }, 80), C(r), !0
        }
        return !1
    }

    function k(e, t, n, r) {
        var a = o(t, n);
        if (a) {
            var i = (0, ne.isClassicInterface)(r),
                s = r.get().peer,
                l = i ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                u = a.offsetTop + domPN(a).offsetTop + domPN(domPN(a)).offsetTop + domPN(domPN(domPN(a))).offsetTop;
            i && (0, ne.isChatPeer)(s) && (0, _e.isPinnedMessageVisibleInTab)(r, s) && (u -= (0, ne.getPinnedMessageHeight)()), e.scrollTop(u - e.getScrollHeight() / 2 + l / 2), addClass(a, "im-mess_light"), setTimeout(function() {
                removeClass(a, "im-mess_light")
            }, Le)
        }
    }

    function T(e, t, n) {
        n.updateLastSeen(e)
    }

    function S(e, t, n, r, a) {
        var i = domData(a, "action"),
            s = domData(a, "msgid"),
            l = geByClass1("_im_mess_marker", o(n, s));
        switch (i) {
            case "resend":
                t(r, a);
                break;
            case "delete":
                e.set(te.removeFailed.bind(null, e.get().peer, s)).then(function() {
                    (0, ne.removeMessages)([s], f(n))
                })
        }
        tooltips.hide(l, {
            fasthide: !0
        })
    }

    function I(e, t) {
        return (0, re.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
    }

    function A(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            a = e.get().peer;
        if (!(0, ne.isReservedPeer)(a)) {
            var i = e.get().tabs[a],
                o = geByClass1(Re, t),
                s = geByClass1("_im_to_end_label", o);
            n && i.unread > 0 ? val(s, getLang("mail_im_new_messages", i.unread)) : val(s, getLang("mail_im_to_end_new"));
            var l = !1;
            (n || i.skipped > 0) && !(0, te.isSearchingInplace)(e.get().peer, e.get()) ? (l = !0, addClass(o, "im-to-end_shown")) : H(o, !0), e.set(te.updateGoToEndVisibility.bind(null, [l, intval(r)]))
        }
    }

    function M(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 === e.scrollTop() && 0 === e.scrollBottom()) return !1;
        var n = e.scrollBottom();
        return (t ? Me + t : Me) > n
    }

    function L(e, t, n, r, a) {
        var i = domData(a, "msgid"),
            o = e.get().peer,
            s = (0, re.getMessage)(e, o, i);
        s.type === be.EDIT_MESSAGE ? (n().sendEditMessage(e, s), n().resendMessage(o, i)) : e.get().imQueueResend(o, i).then(function(t) {
            e.get().longpoll.push([(0, be.resendEvent)(o, t.mess)])
        })
    }

    function P(e, t, n, r, a) {
        var i = intval(domData(a, "peer")),
            o = intval(domData(gpeByClass("_im_mess", a), "msgid")),
            s = e.get().tabs[i].hash;
        return (0, te.restoreMessageSend)(o, i, s, e.get().gid), e.set(te.restoreMessage.bind(null, o, i)).then(ne.restoreMessage.bind(null, o, i, f(t))).then(function() {
            return N(e, n, t)
        }), !1
    }

    function O(e, t) {
        e().showCreation(t)
    }

    function D(e, t, n) {
        cancelStackFilter("forward"), e.set(te.prepareForward.bind(null, null)).then(function() {
            t().changePeer(!1, e), removeClass(n, "im-page--history_fwd"), e.get().longpoll.push([(0, be.transitionEvent)("default")])
        })
    }

    function x(e, t) {
        var n = geByClass1(Re, e);
        toggleClass(n, "im-to-end_loading", t)
    }

    function R(e, t, n, r) {
        var a = t.get().tabs[t.get().peer];
        return a.skipped ? (x(n, !0), void t.set(te.changePeer.bind(null, t.get().peer, !1)).then(function() {
            return t.set(te.loadPeer.bind(null, t.get().peer, !0, -1, !1))
        }).then(function() {
            x(n, !1), e().changePeer(t, !1, !1), C(t)
        })) : (r.scrollBottom(Ae), A(t, n), C(t), void $(t, t.get().peer, 0, n, e))
    }

    function N(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        if ((0, ne.isClassicInterface)(e)) {
            var i = t.contHeight(),
                o = geByClass1("_im_chat_input_w", n),
                s = o.offsetHeight - o.clientHeight,
                l = geByClass1("_im_chat_resize", n),
                u = geByClass1("_im_chat_input_parent", n),
                c = geByClass1("_im_chat_audio_input_parent", n);
            if (r = r !== !1 ? r : (0, ne.getClassicChatHeight)(), r !== !1 && r > 0) {
                var d = a(r, n),
                    g = hasClass(c, ze) || hasClass(c, qe),
                    m = g ? c : u,
                    f = d - m.offsetHeight;
                l.style.height = window.clientHeight() - d - s + "px", setStyle(o, {
                    top: f + "px",
                    bottom: "auto"
                })
            } else l.style.height = "0px", setStyle(o, {
                top: "auto",
                bottom: "0px"
            });
            var p = geByClass1("_im_peer_history_w", n);
            return setStyle(p, {
                borderBottomWidth: o.offsetHeight - Oe - 1
            }), t.contHeight() - i
        }(0, ne.fixTableCellChildHeight)("_chat_body_wrap", n);
        var _ = t.getScrollHeight();
        t.update(!1, !0);
        var h = t.getScrollHeight();
        return _ - h
    }

    function B(e, t, n, r) {
        var a = t.offsetHeight;
        r(), e.heightIncreased(t.offsetHeight - a, n)
    }

    function F(e, t) {
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

    function H(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
    }

    function j(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = geByClass1(Re, t);
        e.set(te.updateGoToEndVisibility.bind(null, [!1, 0])), H(r, n)
    }

    function U(e, t, n) {
        ie.screenfull.isFullscreen || 0 === t.get().peer || (0, ne.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
    }

    function G(e, t) {
        var n = e.get(),
            r = n.peer,
            a = domClosest(Ve, t.target),
            i = intval(domData(a, "msgid")),
            o = (0, re.getMessage)(e, r, i),
            s = o && (0, ne.isServiceMsg)(o) && o.kludges.source_act;
        if (s === ne.CHAT_PIN_MESSAGE || s === ne.CHAT_UNPIN_MESSAGE) {
            var l = a.querySelector("." + We);
            if (l && "A" !== l.tagName) {
                var u = o.kludges.source_chat_local_id;
                if (!u || Xe[u]) return;
                Xe[u] = (0, te.getMessageLocalId)(r, u, n).then(function(e) {
                    var t = ee(e, 1),
                        n = t[0];
                    if (n) {
                        var a = "/im?sel=" + (0, ne.convertPeerToUrl)(r) + "&msgid=" + n,
                            i = l.innerHTML;
                        domReplaceEl(l, (0, ne.serviceLink)(a, i, !0, We)), delete Xe[u]
                    }
                })
            }
        }
    }

    function q(e, t, n) {
        var r = e.get(),
            a = r.peer,
            i = n.target.href && n.target.href.match(/msgid=([\d]+)/),
            o = i && i[1];
        if ("A" === n.target.tagName && o && !(0, ne.isAlreadyDeleted)(e, a, o) && !checkEvent(n)) {
            var s = (0, re.getMessage)(e, a, o);
            s ? (e.setState({
                msgid: o
            }), (0, Ee.updateLocation)({
                msgid: o
            }), t().focusOnMessage()) : r.longpoll.push([(0, be.changePeer)(a, o)])
        }
        cancelEvent(n)
    }

    function z(e) {
        var t = (0, re.getCurrentTab)(e);
        (0, ne.isChatPeer)(t.peerId) && (t.pinHideId = cur.imDb.select(ke.PIN_HIDDEN_ID_OP, t.peerId))
    }

    function V(e, t, n, r, a) {
        e.setState({
            isEditing: !0
        }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", function() {
            return W(e, t, n, r, a)
        });
        var i = new Se.ImDraft;
        i.dData.txt = (0, Te.convertEmojiHtmlToRegularText)(a.text), i.dData.attaches = (0, Se.convertKludgesToAttaches)(a.kludges, a.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(function() {
            return n.focusOn(e)
        }, 0)
    }

    function W(e, t, n, r, a) {
        e.setState({
            isEditing: !1
        }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, (0, re.getPeer)(e) ? (0, re.getTabDraft)((0, re.getCurrentTab)(e)) : null), n.toggleStickers(e, !0), Y(t)
    }

    function K(e) {
        var t = geByClass1("im-mess_is_editing");
        if (!t) return null;
        var n = e.get().tabs[e.get().peer],
            r = (0, re.parserMessage)(n.msgs[domData(t, "msgid")]);
        return r && r.peerId == e.get().peer ? r : null
    }

    function Y(e) {
        (0, oe.toArray)(geByClass("_im_history_tooltip", e)).forEach(hide)
    }

    function Q(e, t, n) {
        var r = e.get(),
            a = domClosest(Ye, n.target),
            i = domData(a, "msgid"),
            o = (0, re.getMessage)(r, r.peer, i),
            s = function(e) {
                return t().replaceAttachmentPlaceholders(e, o)
            };
        o && (e.set(te.addAttachmentsToStoreData.bind(null, o, [(0, ne.renderMessageMedia)(o)])).then(s), e.set(te.loadMedia.bind(null, o)).then(s))
    }

    function X(e, t) {
        (0, ne.boxHandleEditTimeTooltips)(showBox("al_im.php", t, {
            dark: 1
        }), e)
    }

    function $(e, t, n, r, a) {
        var i = 50,
            o = (0, re.getTab)(e, t),
            s = o && o.msgs && o.history && !Qe && o.offset > 60 && 0 == o.skipped && 50 > n && n >= 0 && 0 === (e.get().selectedMessages || []).length && e.get().cutHistAllowed;
        if (s) {
            var l = Object.keys(o.msgs).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return e - t
            }).slice(0, -i);
            e.set(te.removeMessages.bind(null, l, t)).then(function() {
                return a().removeMessages(l, t, e)
            })
        }
    }

    function Z(e, t, n, r, a, i, s, u, d, g, m, b, y, w, C) {
        var E = void 0,
            S = throttle(function() {
                n.smoothScroll.apply(n, arguments)
            }, 300);
        return {
            changePeer: function(e) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0,
                    s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
                if (0 === e.get().peer && C.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return a.setDraft(e, null), p(t, e);
                if ((0, ne.isFullyLoadedTab)(e.get(), e.get().peer)) {
                    removeClass(t, "im-page--history_search"), e.set(te.dropSelection), r.changeActions(e);
                    var l = e.get().peer,
                        d = e.get().prevPeer;
                    removeClass(t, "im-page--history_loading"), o ? a.setDraft(e, (0, re.getTabDraft)((0, re.getCurrentTab)(e))) : a.updateState(e), A(e, t), i().updateTyping(l, e), C.toggle(!0), T(e, t, r), (0, ne.isReservedPeer)(d) && !(0, ne.isReservedPeer)(l) ? (c(t, e, l, n, i, r, u, s, C), C.reset(n)) : (0, ne.isReservedPeer)(d) || (0, ne.isReservedPeer)(l) || (h(t, e, l, n, i, r, u, s, C), C.reset(n)), (0, ne.ensureDomHasActions)(t)
                }
            },
            preparePeer: function(e) {
                var n = (0, re.getPeer)(e);
                z(e), a.setDraft(e, (0, re.getTabDraft)((0, re.getTab)(e, n))), i().updateTyping(n, e), i().hideError(), r.renderPeer(e), r.hideActions(e), u.changePeer(n, e), T(e, t, r), C.toggle(!1), j(e, t, !0)
            },
            saveScroll: function(e) {
                return v(e, n)
            },
            loadingPeer: function(e) {
                (0, te.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
            },
            stopLoading: function(e) {
                removeClass(t, "im-page--history_loading")
            },
            deselectDialog: function(e) {
                s().removeSelection(e)
            },
            replaceMessageAttrs: function(e, n) {
                (0, ne.replaceMessageAttrs)(n.get(), f(t), e)
            },
            cleanSelection: function(e) {
                g.cleanSelection(e)
            },
            updateDialogFilters: function(e) {
                s().updateDialogFilters(e)
            },
            getSearchResulstModule: function() {
                return E
            },
            insertSearch: function(e, a) {
                E || (r.deselectAll(a), E = (0, me.mount)(t, a, i)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), f(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), f(t).innerHTML = (0, ne.renderEmptySearch)()), N(a, n, t), n.scrollBottom(0), A(a, t), C.reset(n)
            },
            updateChatTopic: function(e, t) {
                s().updateDialog(e, t), e === t.get().peer && (r.renderPeer(t), r.renderActions(t))
            },
            updateActions: function(e) {
                r.changeActions(e)
            },
            updateChatPhoto: function(e, a, i) {
                if ((0, ne.isPeerActive)(e.peerId, i.get())) {
                    r.renderPeer(i);
                    var o = M(n);
                    (0, ne.addChatPhotoToUpdate)(e, a, i.get(), f(t)), o && n.scrollBottom(Ae)
                }
            },
            markImportant: function(e, n, a) {
                var i = o(t, e);
                i && (r.changedMessageSelection(a), d.markImportant(e, n, a))
            },
            isNewMessagesVisible: function(e) {
                return I(e, n)
            },
            loadHistory: function(e, r, a) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                    o = a.get();
                if ((0, ne.isPeerActive)(e, o)) {
                    var s = i || o.tabs[e].historyToAppend;
                    if (!s) return;
                    var l = geByClass1("_im_peer_history", t),
                        u = domFC(l),
                        c = n.scrollBottom(),
                        d = r.reversed ? function(e) {
                            return l.appendChild(e)
                        } : function(e) {
                            return l.insertBefore(e, u)
                        },
                        g = 0;
                    r.reversed && (g = l.offsetHeight);
                    var m = sech(s),
                        f = document.createDocumentFragment();
                    m.forEach(function(e) {
                        return f.appendChild(e)
                    }), d(f), r.reversed && C.heightIncreased(l.offsetHeight - g, n), r.reversed || n.scrollBottomFixSave(c), n.update(!1, !0);
                    var p = m.filter(function(e) {
                        return hasClass(e, "_im_bar_date")
                    });
                    C.parseMore(p, n), (0, ne.ensureDomHasActions)(t)
                }
            },
            sendMessage: function(e) {
                0 !== e.get().peer && a.sendMessage()
            },
            editMessage: function(e, a) {
                if ((0, ne.isFullyLoadedTab)(e, a.peerId) && (0, ne.isPeerActive)(a.peerId, e.get())) {
                    var i = o(t, a.messageId);
                    if (!i) return;
                    (0, ne.editAndReplaceMessage)(e.get(), a, t), r.reRenderPinned(e), C.reset(n)
                }
            },
            addMessage: function(e, r) {
                if (!(0, te.isSearchingInplace)(r.peerId, e.get()) && (0, ne.isFullyLoadedTab)(e, r.peerId) && (0, ne.isPeerActive)(r.peerId, e.get())) {
                    if (o(t, r.messageId)) return;
                    var a = f(t);
                    B(C, a, n, function() {
                        var o = M(n),
                            s = geByClass1("_im_unread_bar_row", t),
                            l = (0, ne.isMessagesVisible)(e, t, n),
                            u = ee(l, 2),
                            c = u[0],
                            d = u[1];
                        (0, ne.appendToHistory)(e.get(), r, a, !0, !0, !c && !s), removeClass(t, "im-page--history_empty-hist");
                        var g = (0, re.getTab)(e, e.get().peer),
                            m = (0, ne.isServiceMsg)(r) && r.userId === vk.id,
                            f = r.kludges && r.kludges.source_act,
                            p = m && f !== ne.CHAT_PIN_MESSAGE && f !== ne.CHAT_UNPIN_MESSAGE;
                        g.skipped || c || !(0, ae.isUnread)(g, r) || (0, ae.isOut)(r) || A(e, t, !0, d), (r.local || o || p) && n.scrollBottom(0), i().updateTyping(r.peerId, e), Y(t)
                    });
                    var s = domPS(domLC(a));
                    if (hasClass(s, "_im_bar_date")) {
                        var l = ce("div");
                        l.innerHTML = s.outterHTML, C.parseMore(l, n)
                    }
                    i().hideError(), C.update(n), (0, te.updateMentions)(e.get()), $(e, r.peerId, n.scrollBottom(), t, i)
                }
            },
            setMessageErrored: function(e, n, r, a) {
                r && i().showError(r), (0, ne.setMessageError)(e, n, t)
            },
            markMessagesAsRead: function(e, n) {
                e.get().peer === n.peerId && (0, ne.markMessagesAsRead)(e.get(), n.peerId, t)
            },
            compensateHistoryHeightChange: function(e) {
                n.scrollTop(n.scrollTop() + e * (0, ne.getPinnedMessageHeight)())
            },
            hideFwd: function(e) {
                removeClass(t, "im-page--history_fwd")
            },
            updateTyping: function(e, n) {
                if (!(0, te.isSearchingInplace)(e, n.get())) {
                    var r = n.get();
                    if (n.get().peer === e && (0, ne.isFullyLoadedTab)(r, e)) {
                        var a = (0, ne.formatTyper)(n.get().tabs[e].typing, e, !1, n.get()),
                            o = geByClass1(ne.TYPING_CLASS, t);
                        if (o || a) {
                            if (!o) {
                                var s = geByClass1(He, t);
                                val(s, getTemplate("im_typing", {
                                    cls: (0, ne.isClassicInterface)(n) ? "im-typing_classic" : ""
                                })), o = geByClass1(ne.TYPING_CLASS, t)
                            }
                            val(geByClass1("_im_typing_name", o), a), a ? (addClass(o, "im-page--typing_vis"), i().hideError()) : removeClass(o, "im-page--typing_vis")
                        }
                    }
                }
            },
            scrollFix: function(e, t, r) {
                C.heightIncreased(r, n), C.update(n), (0, ne.isPeerActive)(t, e.get()) && M(n, r) && n.scrollBottom(Ae)
            },
            updateGoToEnd: function(e, r) {
                var a = (0, re.getTab)(e, e.get().peer);
                a && a.skipped ? A(e, t) : j(e, t, r), m(0, n, !1);
                var i = e.get().peer;
                setTimeout(function() {
                    e.get().peer === i && v(e, n)
                })
            },
            newMessage: function(e) {
                s().newMessage(e), j(e, t, !0)
            },
            scroll: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
                if (0 !== e.get().peer) {
                    var i = r ? n.getScrollHeight() : 40;
                    a === !0 && (i = n.contHeight()), i = "up" === t ? -i : i, r || a ? S(i, function() {
                        m(i, n)
                    }) : (n.scrollTop(n.scrollTop() + i), m(i, n))
                }
            },
            showCreation: function(e, t) {
                s().showCreation(e, t)
            },
            updateScroll: function() {
                return N(b, n, t)
            },
            toggleBarDate: function(e) {
                C.toggle(e)
            },
            changedMessageSelection: function(e) {
                r.changedMessageSelection(e)
            },
            updateOnline: function(e, t) {
                (0, ne.isTabLoaded)(t.get(), e) && e === t.get().peer && r.renderPeer(t)
            },
            isEmpty: function(e) {
                return a.isEmpty(e)
            },
            replaceAttachmentPlaceholders: function(e, a) {
                (0, ne.isPeerActive)(a.peerId, e.get()) && (B(C, f(t), n, function() {
                    var i = M(n);
                    (0, ne.replaceAttaches)(t, a, e.get());
                    var o = (0, re.getTab)(e, a.peerId);
                    if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                        var s = (0, re.parserMessage)(o.pinned);
                        s && s.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned, r.reRenderPinned(e))
                    }
                    i && n.scrollBottom(0)
                }), C.update(n))
            },
            removeMessages: function(e, a, i) {
                i.get().peer === a && ((0, ne.removeMessages)(e, f(t)), N(i, n, t), r.changedMessageSelection(i))
            },
            hideGoToEnd: function(e) {
                j(b, t, e)
            },
            removeMessagesRestore: function(e, n, r, a) {
                a.get().peer === n && (0, ne.removeMessagesWithRestore)(e, n, r, f(t))
            },
            updateState: function(e, t) {
                s().updateState(e, t)
            },
            updateChat: function(e, t) {
                e.get().peer === t && (r.changeActions(e), r.renderPeer(e), r.renderActions(e), a.updateState(e), (0, te.updateMentions)(e.get()))
            },
            focustTxt: function(e) {
                a.focusOn(e)
            },
            startSearch: function(e) {
                i().showSearch(e), u.changePeer(e.get().peer, e), u.search()
            },
            showSearch: function(e) {
                addClass(t, "im-page--hisory_search-open"), e.setState({
                    searchShown: !0
                }), (0, re.getPinnedMessage)(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(function() {
                    return u.focus(e)
                }, 10)
            },
            cancelSearch: function(e) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                        searchShown: !1
                    }), (0, re.getPinnedMessage)(e) && this.updateChatTopic(e.get().peer, e), r.changedMessageSelection(e)), a && !(0, ne.isReservedPeer)(e.get().peer) && E) {
                    var i = e.get().tabs[e.get().peer];
                    f(t).innerHTML = (0, te.strHistory)(i.history), N(e, n, t), n.scrollBottom(0), e.get().msgid && (k(n, t, e.get().msgid, e), A(e, t)), y(n), C.reset(n)
                }
                E && (E.unmount(), E = !1, (0, ne.ensureDomHasActions)(t))
            },
            updateHistory: function(e) {
                0 !== b.get().peer && e(t)
            },
            focusOnMessage: function() {
                k(n, t, b.get().msgid, b)
            },
            sendEditMessage: function(e, t) {
                e.set(te.deliverEditedMessage.bind(null, (0, re.getTab)(e, t.peerId), t))["catch"](function(n) {
                    return e.get().longpoll.push([(0, be.failedMessage)(t.peerId, t, n)])
                })
            },
            unmount: function() {
                (0, se.destroyModule)(e), n.destroy(), clearInterval(w), a.unmount(), r.unmount(), d.unmount(), g.unmount(), u.unmount(), cancelStackFilter("forward"), l("_im_chat_resize_track", t)
            },
            removePeer: function(e, t) {
                s().removePeer(e, t)
            },
            restoreScroll: function(e, t) {
                var r = e.get().tabs[t];
                r.scrollBottom ? _(r, n) : n.scrollBottom(Ae)
            },
            resendMessage: function(e, n) {
                e === b.get().peer && (0, ne.startResendMessage)(e, n, t)
            },
            respond: function(e, t) {
                a.attachMessages(e, t), a.focusOn(e);
                var r = (0, re.getTab)(e, t);
                r && !r.skipped && (n.scrollBottom(Ae), y(n))
            },
            startForward: function(e) {
                addClass(t, "im-page--history_fwd"), geByClass1("_im_explain_fwd", t).textContent = getLang("mail_explain_fwd", e.get().pendingForward.msgIds.length), s().cancelSearch(e), s().removeSelection(e), cancelStackPush("forward", function() {
                    return D(e, s, t)
                })
            },
            cancelRecording: function() {
                a.cancelRecording()
            },
            hideError: function() {
                hide(geByClass1(je, t))
            },
            showError: function(e) {
                geByClass1(je, t).innerHTML = e, show(geByClass1(je, t)), n.scrollBottom(Ae)
            },
            startEditing: function(e) {
                if ((0, te.isAnythingLoading)(b.get())) return void(0, ne.showWaitUntilUploadedBox)();
                e = (0, re.parserMessage)(e);
                var n = K(b);
                if (!(a.isBlocked() || n && n.messageId == e.messageId)) {
                    n && this.cancelEditing(), Y(t), b.get().searchShown && this.cancelSearch(b);
                    var i = o(t, e.messageId);
                    i && (this.cancelRecording(), V(b, t, a, i, e), r.deselectAll(b))
                }
            },
            cancelEditing: function() {
                var e = K(b);
                e && W(b, t, a, o(t, e.messageId), e)
            },
            getEditingMessage: function() {
                return K(b)
            },
            focusEditingMessage: function() {
                var e = K(b);
                e && k(n, t, e.messageId, b), a.focusOn(b)
            }
        }
    }

    function J(e, t, n) {
        var r = geByClass1("_im_peer_history_w", e);
        show(r), hasAccessibilityMode() && addClass(r, "history_a11y");
        var a = (0, se.createMutations)(Z),
            o = a.callMutations,
            l = a.bindMutations,
            c = function(e) {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return function(e) {
                    t(e), n(e)
                }
            }(v.bind(null, t)),
            p = (0, ve.mount)(t, e),
            _ = w.bind(null, t, o, r, c, p, e),
            h = (0, he.createScroll)(geByClass1("_im_chat_body_abs", e), {
                onScroll: _,
                nativeScroll: (0, ne.isClassicInterface)(t),
                shadows: !1
            });
        setTimeout(function() {
            t.get().peer && (z(t), (0, re.getCurrentTab)(t).pinned && (o().updateChatTopic(t.get().peer, t), t.set(te.setActions), b.changeActions(t)), t.get().msgid ? k(h, e, t.get().msgid, t) : E(h, e, o, t, p) || h.scrollBottom(Ae), t.get().history_init = !1, p.reset(h), A(t, e), w(t, o, r, c, p, e, 0, h), (0, ne.ensureDomHasActions)(e), nav.objLoc.st && (t.mutate(te.setInplaceSearch.bind(null, nav.objLoc.st, t.get().peer)), o().startSearch(t)))
        }, 15);
        var b = (0, le.mount)(geByClass1("_im_dialog_actions", e), t, o),
            y = (0, ue.mount)(geByClass1("_im_text_input", e), t, o),
            C = (0, de.mount)(geByClass1("_im_dialog_actions", e), t, o),
            I = (0, fe.mount)(e, t, o),
            M = (0, pe.mount)(e, t, function() {
                return {
                    changedMessageSelection: b.changedMessageSelection
                }
            });
        (0, _e.mount)(e, t, o), (0, ne.isReservedPeer)(t.get().peer) || t.set(te.restoreHistoryQueue.bind(null, t.get().peer)).then(function() {
            (0, ne.restoreQueue)(t.get().peer, t.get(), f(e)), g(e, t, t.get().peer)
        }), s("_im_chat_resize_track", e, n);
        var x = L.bind(null, t, e, o),
            N = P.bind(null, t, e, h),
            B = D.bind(null, t, n, e),
            H = O.bind(null, n, t),
            j = R.bind(null, o, t, e, h),
            V = m.bind(null, t, e),
            W = ne.showEditTimeTooltip.bind(null, t),
            K = S.bind(null, t, x, e),
            Y = ne.showChatMembers.bind(null, t, o, te.setCreationType),
            $ = d.bind(null, t, e, h),
            J = U.bind(null, o, t, h),
            ee = G.bind(null, t),
            ae = q.bind(null, t, o),
            oe = (0, se.createModule)({
                handlers: function(n, r) {
                    r(e, "click", ne.RESTORE_CLASS, N), r(e, "mouseover click", ne.FAILED_CLASS, V), r(e, "mouseover", "_im_edit_time", W), r(e, "click", "_im_mess_susp", i.bind(null, e)), r(e, "click", xe, B), r(e, "click", Ne, K), r(e, "click", ne.SHOW_CHAT_MEMBERS_CLASS, Y), r(e, "click", Be, $), r(e, "mouseover", Fe, F), r(e, "mouseover", Ve, ee), r(e, "click", We, ae), r(e, "click", je, u), r(e, "click", Ke, function(e, n) {
                        if (checkEvent(e)) return !0;
                        if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                        var r = geByClass1("flat_button", n),
                            a = {
                                invite_chat_id: domData(r, "inv-id"),
                                invite_hash: domData(r, "hash")
                            };
                        (0, ne.showInvitationBox)(t, a, te.leaveInvitation), cancelEvent(e)
                    }), r(e, "click", Ue, function() {
                        return t.get().longpoll.push([(0, be.resetPeer)()])
                    }), r(e, "click", Ge, function(e) {
                        return Q(t, o, e)
                    }), n(geByClass1("_im_peer_history_w", e), "mousemove", p.show), n(geByClass1("_im_start_new", e), "click", H), n(geByClass1(Re, e), "click", j), n(geByClass1("_im_cancel_edit", e), "click", function() {
                        return o().cancelEditing(), !1
                    }), n(geByClass1("_im_edit_focus_cur", e), "click", function() {
                        return o().focusEditingMessage(), !1
                    }), ie.screenfull.raw && n(document, ie.screenfull.raw.fullscreenchange, J)
                }
            });
        curNotifier.recvClbks.pin_hide = [function(e) {
            e.hide ? (0, _e.pinnedMessageHide)(t, e.peer, o, !1) : (0, _e.pinnedMessageUnHide)(t, e.peer, o, !1)
        }], window.showForwardBox = function(e) {
            return X(t, e)
        };
        var ce = setInterval(T.bind(null, t, e, b), 1e4);
        return l(oe, e, h, b, y, o, n, C, I, M, _, t, c, ce, p)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var ee = function() {
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
    t.mount = J;
    var te = n(122),
        ne = n(160),
        re = n(144),
        ae = n(214),
        ie = n(213),
        oe = n(244),
        se = n(121),
        le = n(205),
        ue = n(14),
        de = n(193),
        me = n(209),
        fe = n(69),
        pe = n(117),
        _e = n(207),
        he = n(167),
        ve = n(91),
        be = n(55),
        ye = n(146),
        we = n(169),
        Ce = r(we),
        Ee = n(202),
        ke = n(32),
        Te = n(48),
        Se = n(227),
        Ie = 1e3,
        Ae = -30,
        Me = 30,
        Le = 2e3,
        Pe = 700,
        Oe = 15,
        De = 47,
        xe = "_im_cancel_fwd",
        Re = "_im_to_end",
        Ne = "_im_failed_action",
        Be = "_im_mess_link",
        Fe = "_im_admin_name",
        He = "_im_typer_c",
        je = "_im_error",
        Ue = "_im_join_cancel",
        Ge = "_im_retry_media",
        qe = "im-audio-message_recorded",
        ze = "im-audio-message_recording",
        Ve = "_im_mess_srv",
        We = "im_srv_mess_link",
        Ke = "_chat_invitation",
        Ye = "_im_mess",
        Qe = !1,
        Xe = {}
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
        var n = e ? e.indexOf(t) : 0; - 1 === n && e.push(t)
    }

    function i(e, t) {
        var n = e ? e.indexOf(t) : -1; - 1 !== n && e.splice(n, 1)
    }

    function o(e, t, n) {
        if ((0, f.isTabLoaded)(n.get(), e)) {
            var i = (0, p.getTab)(n, e);
            a(i.memberIds, t), i.membersCount++, t === vk.id && (i.data.kicked = 0, i.data.closed = 0)
        }
        return n.set(_.loadChatMember.bind(null, r({}, e, [t]))).then(function(r) {
            return t === vk.id && n.get().peer === e ? n.set(_.getPinnedMessage.bind(null, e)) : void 0
        })
    }

    function s(e, t, n, r, a) {
        if ((0, f.isTabLoaded)(r.get(), e)) {
            var o = (0, p.getTab)(r, e);
            i(o.memberIds, t), o.membersCount--, t === vk.id && (n ? o.data.kicked = 1 : o.data.closed = 1)
        }
        return t === vk.id && r.get().peer === e ? (a.cancelEditing(), r.set(_.unpinMessageOptimistic.bind(null, e))) : Promise.resolve()
    }

    function l(e, t) {
        var n = e && e.data && e.data.flags || 0;
        return (n & t) > 0
    }

    function u(e, t) {
        var n = e && e.adminIds || [];
        return n.indexOf(+t) > -1
    }

    function c(e, t, n, r, l, u) {
        var c = (0, p.getTab)(e, t);
        switch (n) {
            case v:
                var f = m(r, 2),
                    _ = f[0],
                    E = f[1];
                return E ? a(c.adminIds, _) : i(c.adminIds, _), d(e, t, l), !0;
            case b:
                var k = m(r, 1),
                    T = k[0];
                return c.data.flags = T, d(e, t, l), !0;
            case y:
                return delete c.pinHideId, cur.imDb.update(h.PIN_HIDDEN_ID_OP, [c.peerId, void 0]), !1;
            case w:
                return o(t, r[0], e).then(function() {
                    return g(e, t, l, u)
                }), !0;
            case C:
                return s(t, r[0], r[1], e, l).then(function() {
                    return g(e, t, l, u)
                }), !0;
            default:
                return !1
        }
    }

    function d(e, t, n) {
        e.get().peer === t && ((0, _.setActions)(e.get()), n.updateActions(e))
    }

    function g(e, t, n, r) {
        e.get().peer === t && ((0, _.setActions)(e.get()), n.updateChat(e, t), r.updateDialog(t, e))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = void 0;
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
    t.chatUserHasJoined = o, t.chatUserHasLeft = s, t.doesChatTabHaveFlag = l, t.isUserAdminInChat = u, t.handleEventChatUpdated = c;
    var f = n(160),
        p = n(144),
        _ = n(122),
        h = n(32),
        v = (t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = 1, t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = 2, t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = 4, t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = 8, t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = 16, 3),
        b = 4,
        y = 5,
        w = 6,
        C = 7
}, , , , , , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return e ? void(window.tooltips && tooltips.hide(e, t)) : !1
    }

    function i(e) {
        return e.map(function(e) {
            return {
                id: e[1],
                type: e[0],
                kind: e[2] || null
            }
        })
    }

    function o(e, t, n, r, a, o) {
        var s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !0;
        if (S(t, r)) return Promise.resolve(!1);
        g(r).getBoundAttach(n.message) && (n.message = ""), n.share_url = g(r).getShareUrl();
        var l = (0, z.random)(),
            u = {
                peerId: t,
                messageId: "rid" + l,
                flags: F.FLAG_OUTBOUND,
                date: intval(Date.now() / 1e3) - r.get().timeshift,
                subject: "",
                text: (0, U.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                local: !0,
                kludges: {
                    emoji: !0,
                    from_admin: r.get().gid ? vk.id : null
                },
                type: F.ADD_MESSAGE,
                attaches: i(n.attaches)
            };
        return n.rid = l, n.mess = u, e(t, n), r.get().longpoll.push([u]), s && o().clearText(t, r), a().newMessage(r), Promise.resolve(!0)
    }

    function s(e, t, n, r, a, i, s) {
        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !1;
        u || (u = e.get().peer);
        var c = {
            message: "",
            attaches: i
        };
        s && extend(c, s), l(e, t, !1).then(function(a) {
            return o(n, u, c, e, t, r, !1)
        })["catch"](function(t) {
            debugLog(t), d(e, a)
        })
    }

    function l(e, t, n) {
        var r = e.get().tabs[e.get().peer];
        return r.skipped > 0 ? (t().loadingPeer(e), e.setState({
            no_moving_down: !0
        }), e.set(j.changePeer.bind(null, e.get().peer, !1)).then(function() {
            return e.set(j.loadPeer.bind(null, e.get().peer, !0, -1, !1))
        }).then(function() {
            return t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n
        })) : Promise.resolve(n)
    }

    function u(e, t, n) {
        var r = !!intval(domData(n, "val"));
        r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(j.changeSubmitSettings.bind(null, r)))
    }

    function c(e, t, n) {
        return e.get().delayed_ts ? !1 : setTimeout(function() {
            e.set(j.setDelayedMessage.bind(null, !1, !1)).then(function() {
                m.apply(void 0, n)
            })
        }, t)
    }

    function d(e, t) {
        document.activeElement && document.activeElement.blur(), showFastBox({
            title: getLang("global_error")
        }, getLang("mail_send_error"), getLang("mail_ok"), function() {
            nav.reload({
                force: !0
            })
        });
        var n = geByClass1("_im_send", t);
        return e.set(j.toggleSendingAbility.bind(null, !0)).then(function() {
            (0, U.lockButton)(n)
        })
    }

    function g(e) {
        var t = e.get().tfdraft;
        return t || new Q.ImDraft
    }

    function m(e, t, n, r, a, i) {
        var s = arguments,
            u = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
        return Promise.resolve().then(function() {
            var i = geByClass1("_im_send", r);
            if (!(0, G.isSendingAvailable)(e)) return !1;
            if ((0, j.isAnythingLoading)(e.get()) || !(0, U.isFullyLoadedTab)(e, e.get().peer)) {
                var d = c(e, ce, (0, V.toArray)(s));
                return e.set(j.setDelayedMessage.bind(null, !0, d)).then(function() {
                    (0, U.lockButton)(i)
                })
            }
            clearTimeout(e.get().delayed_ts), a().saveText(e);
            var m = e.set(j.setDelayedMessage.bind(null, !1, !1)).then(function() {
                    (0, U.unlockButton)(i)
                }),
                f = (0, G.getPeer)(e);
            return m.then(l.bind(null, e, t)).then(function() {
                var r = g(e),
                    i = r.dData.attaches.map(function(e) {
                        return [e.type, e.id]
                    }).concat(u),
                    s = r.dData.txt;
                if (s || i.length) {
                    var l = t().getEditingMessage();
                    if (l) return (0, U.isMessageTooLong)(s) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void((0, Y.wasMessageReallyModified)(e, l, r) && ((0, Y.replaceMsgAfterEdit)(e, l, s, i, r.getShareUrl()), t().sendEditMessage(e, l), e.get().longpoll.push([(0, B.editMessageLocallyEvent)(l)]))));
                    var c = (0, U.splitMessageToParts)(s, i),
                        d = c.map(function(r) {
                            return o(n, f, {
                                message: r.msgText || "",
                                attaches: r.attaches || []
                            }, e, t, a)
                        });
                    return Promise.all(d)
                }
            })
        })["catch"](function(t) {
            debugLog(t), d(e, r)
        })
    }

    function f(e, t, n) {
        return e.set(j.deliverMessage.bind(null, t, n))
    }

    function p(e, t, n, r) {
        e.get().longpoll.push([F.failedMessage(t, n.mess, r)])
    }

    function _(e, t, n, r, a, i, o) {
        function s(n, r) {
            var a = e.get().peer,
                i = Emoji.val(r);
            (0, U.isReservedPeer)(a) || S(a, e) || g(e).dData.txt == i || !i || A(e), D(e, t, i), u(r);
            var s = t.offsetHeight;
            if (l && l !== s) {
                var c = o().updateScroll();
                o().scrollFix(e, e.get().peer, c)
            }
            l = s
        }
        var l = void 0,
            u = debounce(I.bind(null, e, n), 500),
            c = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                onSend: function() {
                    return r([])
                },
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: s,
                onStickerSend: function(e, t, n) {
                    return a([
                        ["sticker", e, n]
                    ], {
                        sticker_referrer: t
                    })
                },
                uploadActions: i
            });
        return Emoji.emojiLoadMore(c), e.setState({
            emojiOptId: c
        }), c
    }

    function h(e, t) {
        var n = geByClass1("_im_text", e);
        Wall.initComposer(n, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            toup: !0,
            getValue: function() {
                return t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(n) : ""
            },
            onShow: function() {
                addClass(e, "im_mention_shown");
                var t = data(n, "composer");
                if (t && t.wdd && t.wdd.shown) {
                    var r = 0,
                        a = !1,
                        i = function() {
                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                        };
                    each(t.wdd.shown, function() {
                        this[0] && (r++, "@" + t.curTerm == this[2] && (a = !0))
                    }), !r || a && 1 == r ? i() : cancelStackPush("im_mention", i)
                }
            },
            onHide: function() {
                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
            },
            searchKeys: [1, 7],
            wddOpts: {}
        })
    }

    function v(e, t, n, r, a, i, o, s, l) {
        if (!t.get().removingMedias) {
            if ("album" === a || "page" === a || "mail" === a) return !1;
            if ("share" === a && !o.title) return !1;
            show(_e), i && "string" == typeof a ? (s && g(t).addBindUrl(s, a, i), g(t).addAttach(a, i, o)) : g(t).syncWithSelector(l);
            var u = e().updateScroll();
            return e().scrollFix(t, t.get().peer, u), t.get().delayed_message && !(0, j.isAnythingLoading)(t.get()) ? (n([]), !1) : void D(t, r)
        }
    }

    function b(e, t, n) {
        (0, G.isAnyMessageBeingEdited)(e) || O(e, t).then(function(t) {
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
                        els: (0, V.toArray)(geByClass(pe)),
                        val: a
                    }
                }
            })
        })
    }

    function y(e) {
        Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
    }

    function w(e, t) {
        Emoji.val(e, clean(t)), y(e)
    }

    function C(e, t, n) {
        var r = e.getFwdRaw(),
            a = geByClass1(me, t);
        if (r)
            if (r.object && r.object.authorName) {
                var i = r.object,
                    o = (0, U.renderShortText)(0, "", i.text, !0, (0, Q.convertKludgesToAttaches)(i.kludges, 0));
                a.innerHTML = getTemplate("im_attach_mess", {
                    messages: o,
                    text: i.authorName,
                    date: getSmDate(i.date, n.get().timeshift),
                    modifier: "im-fwd_msg"
                })
            } else a.innerHTML = getTemplate("im_attach_mess", {
                messages: getLang("mail_title_X_msgs", e.getFwdCount()),
                text: getLang("mail_im_fwd_msgs_title"),
                date: "",
                modifier: ""
            });
        else a.innerHTML = ""
    }

    function E(e, t, n) {
        e.set(j.forwardMessages.bind(null, null, g(e))).then(function() {
            var r = geByClass1(me, t);
            if (r && r.children.length) {
                r.innerHTML = "";
                var a = n().updateScroll();
                n().scrollFix(e, e.get().peer, a)
            }
            D(e, t)
        })
    }

    function k(e, t, n, r, a, i, o, s, l, u) {
        return {
            restoreDraft: function(e, a) {
                t.chosenMedias.length > 0 && (e.setState({
                    removingMedias: !0
                }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                    removingMedias: !1
                }));
                var o = e.get().peer,
                    s = (0, U.isUserPeer)(o) && o != vk.id && !e.get().gid,
                    l = (0, U.isUserPeer)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) || (0, U.isCommunityPeer)(o) && e.get().moneyTransferCommAvail && !e.get().gid || e.get().moneyRequestAvail && e.get().gid || (0, U.isChatPeer)(o) && (0, G.getCurrentTab)(e).moneyRequestAvail;
                if (toggle(geByClass1("ms_item_gift", r), s && !(0, G.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_money", r), l && !(0, G.isAnyMessageBeingEdited)(e)), (0, U.isReservedPeer)(o)) return Promise.resolve();
                var u = g(e);
                return Emoji.val(n) !== u.dData.txt ? w(n, u.dData.txt) : y(n), u.prepareObjects(e.get().gid, a && a.messageId).then(function() {
                    var a = P(e, o, n);
                    if (!a && o == e.get().peer) {
                        for (var s = u.dData.attaches, l = 0; l < s.length; l++) t.chooseMedia(s[l].type, s[l].id, s[l].object || {});
                        C(u, r, e);
                        var c = i().updateScroll();
                        i().scrollFix(e, o, c), D(e, r, u.dData.txt)
                    }
                })
            },
            sendMessage: function() {
                a([])
            },
            choose: function(e, n, r) {
                t.chooseMedia(e, n, r)
            },
            canAddMedia: function() {
                return !t.hasRestrictingAttach()
            },
            isEmpty: function(e) {
                return !trim(Emoji.val(n)) && !g(e).hasAttaches()
            },
            unchoose: function(e) {
                t.unchooseMedia(e)
            },
            attachCount: function() {
                return t.attachCount()
            },
            progress: function(e, n, r) {
                show(_e), t.showMediaProgress(e, n, r)
            },
            updateState: function(e) {
                P(e, e.get().peer, n)
            },
            focusOn: function(e) {
                Emoji.editableFocus(n, !1, !0)
            },
            setDraft: function(e, t) {
                e.setState({
                    tfdraft: t
                }), t && this.restoreDraft(e, i().getEditingMessage())
            },
            clearText: function(e, a) {
                g(a).clear(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), E(a, r, i);
                var o = i().updateScroll();
                i().scrollFix(a, a.get().peer, o)
            },
            attachMessages: function(e, t) {
                if (e.get().peer === t) {
                    C(g(e), r, e);
                    var n = i().updateScroll();
                    i().scrollFix(e, t, n), D(e, r)
                }
            },
            cancelRecording: function() {
                u.cancelRecording()
            },
            reHeight: function(e) {
                var t = i().updateScroll();
                i().scrollFix(e, e.get().peer, t)
            },
            isBlocked: function() {
                return S(e.get().peer, e)
            },
            toggleStickers: function(e, t) {
                Emoji.toggleStickers(e.get().emojiOptId, !t)
            },
            saveText: function(e) {
                g(e).setText(Emoji.val(geByClass1("_im_text", r)))
            },
            unmount: function() {
                (0, W.destroyModule)(l), t.destroy(), s.unmount(), Emoji.destroy(e.get().emojiOptId), u.unmount()
            }
        }
    }

    function T(e, t) {
        return (0, U.isChatPeer)(e) ? t.get().tabs[e].data.kicked : !1
    }

    function S(e, t) {
        return T(e, t) || (0, G.getTab)(t, e) && (0, G.getTab)(t, e).block_error > 0 || (0, U.isLocksAvailable)(t) && (0, U.isPeerBlocked)(e, t)
    }

    function I(e, t, n) {
        var r = e.get().peer,
            a = Emoji.val(n);
        (0, U.isReservedPeer)(r) || g(e).dData.txt == a || S(r, e) || (t.checkMessageURLs(a, !0, ce), g(e).setText(a))
    }

    function A(e) {
        var t = e.get().peer;
        (0, U.isFullyLoadedTab)(e, t) && !(0, G.isAnyMessageBeingEdited)(e) && Date.now() - ((0, G.getTab)(e, t).lastTyping || 0) > 1e3 * j.TYPING_PERIOD && e.set(j.sendTyping.bind(null, t))
    }

    function M(e) {
        var t = g(e).getFwdRaw();
        t && window.showForwardBox({
            act: "a_show_forward_box",
            will_fwd: t.id,
            gid: e.get().gid
        })
    }

    function L(e, t, n) {
        switch (n.block_error) {
            case ee:
            case Z:
                return getLang("mail_peer_deleted");
            case ie:
                return getLang("mail_community_deleted");
            case ne:
                return getLang("mail_group_banned_messages");
            case $:
            case J:
            case te:
            case se:
            case le:
            case ae:
                return (0, U.isCommunityPeer)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
            case ue:
                var r = (0, X.oCacheGet)(e, t);
                return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
            case re:
                return getLang("mail_cant_send_messages_to_community");
            case oe:
                return getLang("mail_chat_youre_kicked");
            case 0:
                if (T(t, e)) return getLang("mail_chat_youre_kicked");
                var a = e.get().block_states[t].name;
                return getLang("mail_community_answering").replace("{username}", a);
            default:
                return getLang("mail_send_privacy_error")
        }
    }

    function P(e, t, n) {
        var r = gpeByClass("_im_chat_input_parent", n),
            a = geByClass1("_im_chat_input_error", r);
        if (S(t, e)) {
            n.disabled = !0;
            var i = L(e, t, (0, G.getTab)(e, t));
            return addClass(n, "im-chat-input--text_disabled"), addClass(r, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked"), n.contentEditable = "false", val(a, i), !0
        }
        return n.disabled && (n.disabled = !1, removeClass(r, "im-chat-input_error"), n.contentEditable = "true", removeClass(n, "im-chat-input--text_disabled"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked"), val(a, "")), !1
    }

    function O(e, t, n) {
        return (0, U.isVoiceMessageAvailable)(e).then(function(r) {
            if (!r && !(0, G.isAnyMessageBeingEdited)(e)) return !0;
            var a = null != n ? n : Emoji.val(geByClass1("_im_text", t));
            return trim(a) ? (0, G.isAnyMessageBeingEdited)(e) ? !(0, U.isMessageTooLong)(a) : !0 : g(e).hasAttaches()
        })
    }

    function D(e, t, n) {
        var r = geByClass1("_im_send", t.parentNode);
        a(r, {
            fasthide: !0
        }), O(e, t, n).then(function(t) {
            if ((0, G.isAnyMessageBeingEdited)(e)) toggleClass(r, "is_input_empty", !t), attr(r, "aria-label", getLang("mail_im_edit"));
            else {
                toggleClass(r, "im-send-btn_audio", !t), toggleClass(r, "im-send-btn_send", t), t && removeClass(r, "im-send-btn_saudio");
                var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                attr(r, "aria-label", n)
            }
        })
    }

    function x(e) {
        var t = ge(_e),
            n = t.offsetHeight;
        toggleClass(e, "im-chat-input--overflowed", n > 400)
    }

    function R(e, t, n, r) {
        if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !(0, j.isAnythingLoading)(e.get())) {
            var a = (0, Y.findLastMessageToEdit)(e, (0, G.getCurrentTab)(e));
            a && t().startEditing((0, G.getMessage)(e, e.get().peer, a))
        }
    }

    function N(e, t, n) {
        cur.share_timehash = t.get().share_timehash;
        var r = (0, W.createMutations)(k),
            i = r.callMutations,
            o = r.bindMutations,
            l = (0, K.mount)(e, t, i),
            c = f.bind(null, t);
        ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
        var d = (0, q.initQueue)(c, p.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }),
            g = d.pushMessage,
            y = d.inspectQueue,
            w = d.resend,
            C = d.setErrored,
            T = d.complete,
            S = s.bind(null, t, n, g, i, e),
            I = M.bind(null, t);
        hide(geByClass1("ms_items_more_helper", e));
        var A = [
            ["video", getLang("profile_wall_video")],
            ["audio", getLang("profile_wall_audio")],
            ["doc", getLang("profile_wall_doc")],
            ["map", getLang("profile_wall_map")],
            ["gift", getLang("profile_wall_gift")]
        ];
        (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && A.push(["money", getLang("profile_wall_money")]), A.unshift(["photo", getLang("mail_added_photo")]);
        var L = new MediaSelector(geByClass1(de, e), _e, A, {
                maxShown: 0,
                vectorIcon: !0,
                ignoreMobile: !0,
                onAddMediaChange: function(r, a, i, o) {
                    return v(n, t, P, e, r, a, i, o, L)
                },
                editable: 1,
                onChangedSize: function() {
                    var r = n().updateScroll();
                    n().scrollFix(t, t.get().peer, r), x(e)
                },
                sortable: 1,
                teWidth: 150,
                mail: 1,
                teHeight: 100,
                forceToUp: !0,
                toId: t.get().gid ? -t.get().gid : void 0,
                blockPersonal: t.get().gid ? 1 : 0,
                docParams: t.get().gid ? {
                    imhash: t.get().upload_doc_opts.opts.imhash,
                    from: "from_gim"
                } : {}
            }),
            P = m.bind(null, t, n, g, e, i, L),
            D = b.bind(null, t, e),
            N = geByClass1("_im_send", e),
            B = s.bind(null, t, n, g, i, e),
            U = (0, H.mount)(e, t, B, function() {
                addClass(N, "im-send-btn_audio"), removeClass(N, "im-send-btn_static")
            });
        h(e, t), t.get().textMediaSelector = L, t.set(j.initTextStore.bind(null, y, w, C, T));
        var z = geByClass1("_im_text", e);
        setTimeout(function() {
            (0, G.getPeer)(t) && i().setDraft(t, (0, G.getTabDraft)((0, G.getCurrentTab)(t))), _(t, e, L, P, S, l, n)
        }, 0);
        var V = E.bind(null, t, e, n),
            Y = u.bind(null, t),
            Q = (0, W.createModule)({
                handlers: function(r, o) {
                    r(N, "click", function() {
                        O(t, e).then(function(e) {
                            e || (0, G.isAnyMessageBeingEdited)(t) ? P([]) : (a(N, {
                                fasthide: !0
                            }), U.start(), setTimeout(function() {
                                return removeClass(N, "im-send-btn_saudio")
                            }, 300))
                        })
                    }), r(N, "mouseover", D), r(z, "focus", function() {
                        t.get().longpoll.push([F.transitionEvent("message")]), cur.focused = t.get().peer
                    }), r(z, "blur", function() {
                        var e = 0 === t.get().peer ? "search" : "default";
                        t.get().longpoll.push([F.transitionEvent(e)]), cur.focused = !1
                    }), o(e, "click", fe, V), o(e, "click", "_im_will_fwd", I), o(e, "keydown", "_im_text", function(e) {
                        return R(t, n, i, e)
                    }), o(bodyNode, "click", pe, Y)
                }
            });
        return o(t, L, z, e, P, n, y, l, Q, U)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = N;
    var B = n(55),
        F = r(B),
        H = n(128),
        j = n(122),
        U = n(160),
        G = n(144),
        q = n(192),
        z = n(67),
        V = n(244),
        W = n(121),
        K = n(28),
        Y = n(48),
        Q = n(227),
        X = n(175),
        $ = 4,
        Z = 5,
        J = 6,
        ee = 7,
        te = 9,
        ne = 11,
        re = 12,
        ae = 13,
        ie = 14,
        oe = 16,
        se = 19,
        le = 20,
        ue = 23,
        ce = 2e3,
        de = "_im_media_selector",
        me = "_im_media_fwd",
        fe = "_im_fwd_close",
        pe = "_im_submit_btn",
        _e = "_im_media_preview"
}, , function(e, t) {
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
}, function(e, t, n) {
    "use strict";
    var r = n(37),
        a = {};
    a[n(1)("toStringTag")] = "z", a + "" != "[object z]" && n(194)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, , function(e, t) {
    e.exports = {}
}, function(e, t, n) {
    var r = n(115);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
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
        var n = e.get().tabbedPeers[t];
        n && e.get().longpoll.push([(0, m.changePeer)(n.peer, !1, !0, !0)])
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
    var c = n(188),
        d = n(122),
        g = n(160),
        m = n(55),
        f = n(198),
        p = r(f),
        _ = n(121)
}, , , function(e, t, n) {
    var r = n(183),
        a = n(75),
        i = n(66),
        o = Object.defineProperty;
    t.f = n(237) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), a) try {
            return o(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, , , , function(module, exports, __webpack_require__) {
    "use strict";

    function uploadFailed(e, t, n) {
        var r = void 0 !== t.ind ? t.ind : t,
            a = t.fileName ? r + "_" + t.fileName : t;
        re("upload" + a + "_progress_wrap"), e().unchoose(a);
        var i = geByClass1("popup_box_container");
        if (!i) {
            var o = "photo" == Upload.options[r].file_name ? getLang("mail_add_photo_error") : getLang("mail_add_doc_error");
            setTimeout(showFastBox({
                title: getLang("global_error")
            }, o).hide, 2e3)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    }

    function onAnyUploaded(e) {
        var t = void 0 !== e.ind ? e.ind : e,
            n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
            r = n ? t + "_" + n : e,
            a = ge("upload" + r + "_progress_wrap");
        return a && hide(geByClass1("progress_x", a)), r
    }

    function onPhotoUploaded(e, t, n, r) {
        var a = onAnyUploaded(e);
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, t), {
            onDone: function(e, t) {
                r().choose("photo", e, extend(t, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function onDocUploaded(e, t, n, r) {
        var a = onAnyUploaded(e),
            i = {
                act: "a_save_doc",
                from: "choose",
                mail_add: 1
            };
        n.opts.imhash && (i = extend(i, {
            from_place: "from_gim",
            imhash: n.opts.imhash
        })), ajax.post("docs.php", extend(i, t), {
            onDone: function(e, t, n) {
                r().choose("doc", e + "_" + t, extend(n, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function detectDropboxMode(e, t) {
        if (!e().canAddMedia()) return "none";
        if (!t.items) return "photo";
        var n = [].slice.call(t.items).every(function(e) {
            var t = e.type.split("/");
            return /^(jpg|jpeg|png|heic|heif)$/i.test(t[1])
        });
        return n ? "photo" : "doc"
    }

    function showDropbox(e) {
        var t = geByClass1(DROPBOX_CLASS),
            n = geByClass1("im-page--chat-header").getBoundingClientRect(),
            r = geByClass1("im-chat-input").getBoundingClientRect();
        (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
    }

    function hideDropbox() {
        var e = geByClass1(DROPBOX_CLASS);
        hide(e)
    }

    function parseOnCompleteResponse(res) {
        try {
            return eval("(" + res + ")")
        } catch (e) {
            return q2ajx(res)
        }
    }

    function parseOnUploadProgress(e, t, n) {
        return {
            loaded: t,
            total: n,
            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
        }
    }

    function handleUploadCompleteError(e, t, n, r) {
        var a = "string" == typeof t && t.indexOf("TERMINATED") > -1;
        a || Upload.onUploadError(e), r().reHeight(n)
    }

    function initPhotoUploader(e, t, n, r) {
        var a = t.get().upload_opts,
            i = geByClass1("_im_upload_photo"),
            o = geByClass1("_im_drop_photo");
        return Upload.init(i, a.url, a.params, {
            file_name: "photo",
            file_size_limit: 26214400,
            file_types: "*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.jpeg;*.JPEG;*.heic;*.HEIC;*.heif;*.HEIF",
            accept: "image/jpeg,image/png,image/gif,image/heic,image/heif",
            file_match: a.opts.ext_re,
            lang: a.opts.lang,
            onNoFilteredCallback: function(e) {
                Upload.onFileApiSend(r, e)
            },
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, r) {
                var i = parseOnCompleteResponse(r);
                i.photos ? (statlogsValueEvent("upload_photo_fails", 1, a.opts.server, "success"), onPhotoUploaded(e, i, a, n)) : handleUploadCompleteError(e, r, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("photo", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, a.opts.server, t), uploadFailed(n, e, t)
            },
            onDragEnter: function(e) {
                var t = geByClass1("im-audio-message_recording");
                e.dataTransfer && !t && showDropbox(detectDropboxMode(n, e.dataTransfer))
            },
            onDragOut: function() {
                hideDropbox()
            },
            onDrop: function() {
                hideDropbox()
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "photo",
            max_attempts: 3,
            server: a.opts.server,
            error: a.opts.default_error,
            error_hash: a.opts.error_hash,
            dropbox: o,
            dragEl: bodyNode
        })
    }

    function initDocUploader(e, t, n) {
        var r = t.get().upload_doc_opts,
            a = geByClass1("_im_upload_doc"),
            i = geByClass1("_im_drop_doc");
        return Upload.init(a, r.url, r.params, {
            file_name: "file",
            file_size_limit: 209715200,
            file_types: "*.*;",
            lang: r.opts.lang,
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, a) {
                var i = parseOnCompleteResponse(a);
                i.file ? (statlogsValueEvent("upload_photo_fails", 1, r.opts.server, "success"), onDocUploaded(e, i, r, n)) : handleUploadCompleteError(e, a, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("doc", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, r.opts.server, t), uploadFailed(n, e, t)
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "doc",
            max_attempts: 3,
            server: r.opts.server,
            error: r.opts.default_error,
            error_hash: r.opts.error_hash,
            dropbox: i,
            dragEl: bodyNode
        })
    }

    function mount(e, t, n) {
        removeEvent(bodyNode, "dragover dragenter");
        var r = initDocUploader(e, t, n),
            a = initPhotoUploader(e, t, n, r);
        cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
        var i = (0, _modules.createModule)({
            handlers: function(e) {
                var t = ge("im_full_upload");
                e(t, "change", function r(o) {
                    n().canAddMedia() ? Upload.onFileApiSend(a, o.target.files) : showFastBox(getLang("global_error"), getLang("global_error")), (0, _modules.destroyModule)(i);
                    var s = t.cloneNode();
                    t.parentNode.replaceChild(s, t), t = s, e(t, "change", r)
                })
            }
        });
        return {
            paste: function(e) {
                Upload.onFileApiSend(a, e)
            },
            unmount: function() {
                (0, _modules.destroyModule)(i), Upload.deinit(a), Upload.deinit(r)
            }
        }
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.mount = mount;
    var _modules = __webpack_require__(121),
        DROPBOX_CLASS = "_im_upload_dropbox"
}, function(e, t, n) {
    var r = n(24),
        a = n(183),
        i = n(218);
    e.exports = n(237) ? Object.defineProperties : function(e, t) {
        a(e);
        for (var n, o = i(t), s = o.length, l = 0; s > l;) r.f(e, n = o[l++], t[n]);
        return e
    }
}, , function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
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
        return t === d ? e[t] || [] : t === g ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
    }

    function o(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case d:
                var r = n;
                r && r.length > 0 ? e[t] = r : delete e[t];
                break;
            case g:
                var a = c(n, 2),
                    i = a[0],
                    o = a[1];
                o ? e[t][i] = +o : delete e[t][i]
        }
        return e
    }

    function s(e, t) {
        for (var n = ["fwd", "draft", "bind_attach"], i = r(e), o = !1, s = n.length; s--;) n[s] in i && (delete i[n[s]], o = !0);
        o && a(e, i, t)
    }

    function l(e, t, r) {
        r.key === n(e) && (t.db = JSON.parse(r.newValue), t.checkTime = Date.now())
    }

    function u(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && s(e, t);
        var n = {
                db: r(e),
                checkTime: Date.now()
            },
            u = l.bind(null, e, n);
        return window.addEventListener("storage", u, !1), {
            select: function(t, a) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), i(n.db, t, a)
            },
            selectByKey: function(t) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), n.db[t]
            },
            update: function(r, i) {
                var s = o(n.db, r, i);
                return n.db = s, n.checkTime = Date.now(), a(e, s, t)
            },
            updateByKey: function(r, i) {
                return n.db[r] = i, n.checkTime = Date.now(), a(e, n.db, t)
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
    t.deleteOldStoredFormat = s, t.mount = u;
    var d = t.RECENT_SEARCH_OP = "recent_search",
        g = t.PIN_HIDDEN_ID_OP = "pin_hide"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function a(e, t) {
        return t = r(t) || document, t.getElementsByTagName(e)
    }

    function i(e, t) {
        return t = r(t) || document, t.querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function o(e, t, n) {
        t = r(t) || document, n = n || "*";
        var i = [];
        if (t.querySelectorAll && "*" != n) return t.querySelectorAll(n + "." + e);
        if (t.getElementsByClassName) {
            var o = t.getElementsByClassName(e);
            if ("*" != n) {
                n = n.toUpperCase();
                for (var s = 0, l = o.length; l > s; ++s) o[s].tagName.toUpperCase() == n && i.push(o[s])
            } else i = Array.prototype.slice.call(o);
            return i
        }
        for (var u = a(n, t), c = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = u.length; l > s; ++s) c.test(u[s].className) && i.push(u[s]);
        return i
    }

    function s(e, t, n) {
        return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || o(e, t, n)[0]
    }

    function l(e, t, n) {
        if (t = r(t), !t) return null;
        for (; n !== t && (t = t.parentNode);)
            if (ee(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function c(e, t) {
        return (t || document).querySelector(e)
    }

    function d(e, t) {
        return ee(t, e) ? t : l(e, t)
    }

    function g(e, t) {
        return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : m(e, t)
    }

    function m(e, t) {
        if (t = r(t), !t) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() == e) return t;
        return null
    }

    function f(e, t, n) {
        var r = document.createElement(e);
        return t && extend(r, t), n && ue(r, n), r
    }

    function p(e) {
        return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function _(e) {
        return k(f("div", {
            innerHTML: e
        }))
    }

    function h(e) {
        return I(f("div", {
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

    function y(e, t) {
        return isString(t) && (t = _(t)), S(e).replaceChild(t, e), t
    }

    function w(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function C(e) {
        return w((e || {}).nextSibling)
    }

    function E(e) {
        return w((e || {}).previousSibling, 1)
    }

    function k(e) {
        return w((e || {}).firstChild)
    }

    function T(e) {
        return w((e || {}).lastChild, 1)
    }

    function S(e) {
        return (e || {}).parentNode
    }

    function I(e) {
        for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
        return t
    }

    function A(e, t) {
        var n = S(t);
        return n && n.insertBefore(e, t)
    }

    function M(e, t) {
        var n = S(t);
        return n && n.insertBefore(e, C(t))
    }

    function L(e, t) {
        return e ? s(t, e) : e
    }

    function P(e, t, n) {
        return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function O(e) {
        for (var t = 0; null != (e = E(e));) t++;
        return t
    }

    function D(e, t) {
        do e = S(e); while (e && !R(e, t));
        return e
    }

    function x(e, t, n) {
        for (var r = null; null === r && e;) e = -1 === n ? E(e) : C(e), e && R(e, t) && (r = e);
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

    function N(e) {
        return R(e, ":hover")
    }

    function B(e, t) {
        var n = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; n = n.parentNode;)
            if (n == t) return !0;
        return !1
    }

    function F() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function H(e, t) {
        t = t || {};
        for (var n = t.fromEl || S(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
            var a = le(n, "position");
            if (inArray(a, r) && (!t.noOverflow || "hidden" != le(n, "overflow"))) break;
            n = S(n)
        }
        return n
    }

    function j(e, t) {
        e = r(e);
        for (var n, a, i, o, s = e; s && s.tagName && s !== bodyNode && (n = le(s, "position"), a = le(s, "overflow"), i = le(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === a || ("static" === n ? o && "relative" !== o : "fixed" === o));) "none" !== i ? o = void 0 : "static" !== n && "fixed" !== o && (o = n), s = S(s);
        return s
    }

    function U(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) U(arguments[n]);
        else if (e = r(e), e && e.style) {
            var a = e.olddisplay,
                i = "block",
                o = e.tagName.toLowerCase();
            e.style.display = a || "", "none" === le(e, "display") && (i = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
        }
    }

    function G(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) G(arguments[n]);
        else if (e = r(e), e && e.style) {
            var a = le(e, "display");
            e.olddisplay = "none" != a ? a : "", e.style.display = "none"
        }
    }

    function q(e) {
        return e = r(e), e && e.style ? "none" != le(e, "display") : !1
    }

    function z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function V(e, t, n) {
        e = r(e), n = n || 0;
        var a = Q(e)[1],
            i = $(e)[1],
            o = window,
            s = document.documentElement,
            l = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
            u = r("page_header_cont"),
            c = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            d = vk.staticheader ? Math.max(0, $(u)[1] - c) : $(u)[1];
        if (t) {
            if (c + d + n > a + i) return a + i - c - d - n;
            if (a > c + l - n) return a - c - l + n
        } else {
            if (c + d + n > a) return a - c - d - n;
            if (a + i > c + l - n) return a + i - c - l + n
        }
        return 0
    }

    function W(e, t) {
        return void 0 === t && (t = !q(e)), t ? U(e) : G(e), t
    }

    function K(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function Y(e, t) {
        var n;
        if (t && "inline" == le(e, "display")) {
            var r = e.getClientRects();
            n = r && r[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function Q(e, t) {
        if (e = r(e), !e) return [0, 0];
        var n, a, i = {
                top: 0,
                left: 0
            },
            o = e.ownerDocument;
        return o ? (n = o.documentElement, K(e) && (i = Y(e, !0)), a = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [i.left + (t ? 0 : a.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), i.top + (t ? 0 : a.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
    }

    function X(e) {
        return null != e && e === e.window
    }

    function $(e, t, n) {
        e = r(e);
        var a, i = [0, 0],
            o = document.documentElement;
        if (t && "border-box" === le(e, "boxSizing") && (t = !1), e == document) i = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var s = function() {
                if (i = K(e) && (a = Y(e, n)) && void 0 !== a.width ? [a.width, a.height] : [e.offsetWidth, e.offsetHeight], t) {
                    each(i, function(t, n) {
                        var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(r, function() {
                            i[t] -= parseFloat(le(e, "padding" + this)) || 0, i[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                        })
                    })
                }
            };
            if (q(e)) s();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    u = {},
                    c = !1;
                e.style.cssText.indexOf("!important") > -1 && (c = e.style.cssText), each(l, function(t, n) {
                    u[t] = e.style[t], e.style[t] = n
                }), s(), each(l, function(t, n) {
                    e.style[t] = u[t]
                }), c && (e.style.cssText = c)
            }
        }
        return i
    }

    function Z(e) {
        return $(e)[0]
    }

    function J(e) {
        return $(e)[1]
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

    function ae(e, t) {
        return setTimeout(re.pbind(e, t), 0)
    }

    function ie(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? te : re)(e, t), n
    }

    function oe(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? ne : ae)(e, t), n
    }

    function se(e, t, n) {
        re(e, t), te(e, n)
    }

    function le(e, t, n) {
        if (e = r(e), isArray(t)) {
            var a = {};
            return each(t, function(t, n) {
                a[n] = le(e, n)
            }), a
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
            var i = e.style.filter;
            return i ? i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var o, s = document.defaultView || window;
        if (s.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = s.getComputedStyle(e, null);
            l && (o = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" == t && browser.msie) {
                var i = e.currentStyle.filter;
                return i && i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            o = e.currentStyle[t] || e.currentStyle[u], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var r = e.style,
                        a = r.left,
                        i = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, o[t] = r.pixelLeft + "px", r.left = a, e.runtimeStyle.left = i
                }
            }), o = o.join(" ")
        }
        if (n && ("width" == t || "height" == t)) {
            var c = $(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            o = (intval(o) ? Math.max(floatval(o), c) : c) + "px"
        }
        return o
    }

    function ue(e, t, n) {
        if (e = r(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : ke(t))) return each(t, function(t, n) {
                ue(e, t, n)
            });
            if ("opacity" == t) browser.msie && ((n + "").length ? 1 !== n ? e.style.filter = "alpha(opacity=" + 100 * n + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var a = "number" == typeof n;
                a && /height|width/i.test(t) && (n = Math.abs(n)), n = a && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (i) {
                debugLog("setStyle error: ", [t, n], i)
            }
        }
    }

    function ce(e, t, n) {
        setTimeout(ue.pbind(e, t, n), 0)
    }

    function de(e, t, n) {
        var a = ge(e, "pseudo-id");
        a || (ge(e, "pseudo-id", a = irand(1e8, 999999999)), te(e, "_pseudo_" + a));
        var i = t + "-style-" + a,
            o = r(i),
            s = "._pseudo_" + a + ":" + t + "{";
        o || (o = headNode.appendChild(f("style", {
            id: i,
            type: "text/css"
        }))), each(n, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
    }

    function ge(e, t, n) {
        if (!e) return !1;
        var r, a = e[vkExpand];
        return a || (a = e[vkExpand] = ++vkUUID), n !== r && (vkCache[a] || (vkCache[a] = {}, __debugMode && (vkCache[a].__elem = e)), vkCache[a][t] = n), t ? vkCache[a] && vkCache[a][t] : a
    }

    function me(e, t, n) {
        return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function fe(e) {
        for (var t = 0, n = arguments.length; n > t; ++t) {
            var r = arguments[t];
            if (void 0 !== e[r]) try {
                delete e[r]
            } catch (a) {
                try {
                    e.removeAttribute(r)
                } catch (a) {}
            }
        }
    }

    function pe(e, t) {
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
                    r || pe(e)
                }
            } else removeEvent(e), fe(e, vkExpand), delete vkCache[n]
    }

    function _e() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = r(e[t]);
            n && (pe(n), fe(n, "btnevents"))
        }
    }

    function he(e, t, n) {
        if (e = r(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var a = i("b", e);
                a && a.scrollWidth > a.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function ve() {
        var e = r("zoom_test_1") || document.body.appendChild(f("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = r("zoom_test_2") || document.body.appendChild(f("div", {
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

    function ye(e, t, n) {
        e = r(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                var a = e.createTextRange();
                a.collapse(!0), a.moveEnd("character", n), a.moveStart("character", t), a.select()
            } else e.setSelectionRange && e.setSelectionRange(t, n)
        } catch (i) {}
    }

    function we(e, t, n) {
        for (e = r(e), n = n || 999; e && !t(e);) {
            if (n--, 0 == n) return !1;
            try {
                if (e = S(e), e == document) break
            } catch (a) {
                e = !1
            }
        }
        return e
    }

    function Ce(e) {
        return Se ? void 0 : window.document.title = e
    }

    function Ee(e) {
        Se = e, e && window.cur && window.cur.destroy.push(function() {
            Ee(!1)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var ke = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.ge = r, t.geByTag = a, t.geByTag1 = i, t.geByClass = o, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = u, t.domQuery1 = c, t.domClosest = d, t.domClosestByTag = g, t.gpeByTag = m, t.ce = f, t.re = p, t.se = _, t.sech = h, t.rs = v, t.psr = b, t.domReplaceEl = y, t.domEL = w, t.domNS = C, t.domPS = E, t.domFC = k, t.domLC = T, t.domPN = S, t.domChildren = I, t.domInsertBefore = A, t.domInsertAfter = M, t.domByClass = L, t.domData = P, t.domChildIndex = O, t.domCA = D, t.domClosestSibling = x, t.matchesSelector = R, t.isHover = N, t.isAncestor = B, t.getScroll = F, t.domClosestPositioned = H, t.domClosestOverflowHidden = j, t.show = U, t.hide = G, t.isVisible = q, t.clientHeight = z, t.getClientRectOffsetY = V, t.toggle = W, t.boundingRectEnabled = K, t.getXYRect = Y, t.getXY = Q, t.isWindow = X, t.getSize = $, t.getW = Z, t.getH = J, t.hasClass = ee, t.addClass = te, t.addClassDelayed = ne, t.removeClass = re, t.removeClassDelayed = ae, t.toggleClass = ie, t.toggleClassDelayed = oe, t.replaceClass = se, t.getStyle = le, t.setStyle = ue, t.setStyleDelayed = ce, t.setPseudoStyle = de, t.data = ge, t.attr = me, t.removeAttr = fe, t.removeData = pe, t.cleanElems = _e, t.setTitle = he, t.getZoom = ve, t.val = be, t.elfocus = ye, t.traverseParent = we, t.setDocumentTitle = Ce, t.lockDocumentTitle = Ee;
    var Te = n(172);
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
    }(), window.vkExpand = window.vkExpand || "VK" + (0, Te.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Se = !1;
    window.ge = r, window.geByTag = a, window.geByTag1 = i, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = c, window.domClosest = d, window.ce = f, window.re = p, window.se = _, window.sech = h, window.rs = v, window.psr = b, window.domReplaceEl = y, window.domEL = w, window.domNS = C, window.domPS = E, window.domFC = k, window.domLC = T, window.domPN = S, window.domChildren = I, window.domInsertBefore = A, window.domInsertAfter = M, window.domByClass = L, window.domData = P, window.domChildIndex = O, window.domCA = D, window.domClosestSibling = x, window.matchesSelector = R, window.isHover = N, window.isAncestor = B, window.getScroll = F, window.domClosestPositioned = H, window.domClosestOverflowHidden = j, window.show = U, window.hide = G, window.isVisible = q, window.clientHeight = z, window.getClientRectOffsetY = V, window.toggle = W, window.boundingRectEnabled = K, window.getXYRect = Y, window.getXY = Q, window.isWindow = X, window.getSize = $, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = ae, window.toggleClass = ie, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = le, window.setStyle = ue, window.setStyleDelayed = ce, window.setPseudoStyle = de, window.data = ge, window.attr = me, window.removeAttr = fe, window.removeData = pe, window.cleanElems = _e, window.setTitle = he, window.getZoom = ve, window.val = be, window.elfocus = ye, window.traverseParent = we, window.getH = J, window.getW = Z, window.domClosestByTag = g, window.setDocumentTitle = Ce, window.lockDocumentTitle = Ee
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
}, , function(e, t, n) {
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
        if (n) {
            s(e, t, r);
            var i = domData(n, "list-id"),
                o = i && a(t.children, i);
            o && r.forEach(function(e) {
                return addClass(o, e)
            }), e.setState({
                hoveredListItemId: i
            })
        }
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

    function m(e, t, n) {
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

    function f(e, t) {
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
                    return e.children[t[2]]
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
            u = f(l, r).slice(0, s + o),
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

    function w(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1,
            o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            l = e.get(),
            u = t.getContainer().children,
            c = i(u, r || l.hoveredListItemId);
        if (!(0 > c)) {
            var d = void 0;
            d = l.limit + l.offset < c ? e.setState({
                offset: c - l.limit + 1
            }).then(y.bind(null, t.getContainer(), t, n)) : Promise.resolve(), d.then(function() {
                var e = u[c],
                    n = t.scrollTop(),
                    r = t.getScrollHeight(),
                    i = e.offsetHeight;
                o = "center" === o ? -.5 * t.getScrollHeight() : o, s = "center" === s ? r / 2 : s;
                var l = a ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    d = n + o > e.offsetTop,
                    g = i + e.offsetTop > n + r - s;
                d ? l(e.offsetTop - o) : g && l(e.offsetTop - r + i + s)
            })
        }
    }

    function C(e, t) {
        if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
        e.get().loading = !0;
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2; n > a; a++) r[a - 2] = arguments[a];
        return t.apply(void 0, r).then(function(t) {
            e.get().loading = !1
        })
    }

    function E(e, t, n) {
        return n.scrolls || (n.scrolls = {}), (!n.scrolls[e] || t) && (n.scrolls[e] = {
            scrolled: n.scrolled || 0,
            scrollItem: n.scrollItem
        }), Promise.resolve(n)
    }

    function k(e, t, n, r) {
        var a = e.get(),
            i = a.elements,
            o = r.getContainer(),
            s = e.setState({
                offset: a.offset + a.limit
            }).then(function(n) {
                var s = a.offset,
                    l = a.limit,
                    u = void 0;
                return l + s > i.length ? u = t().more(s, l).then(function(t) {
                    return t === !1 ? [] : (0 === t.length && e.setState({
                        stop: !0
                    }), t)
                }).then(S.bind(null, e, o, r, t, a.pipeId)) : (u = Promise.resolve(), y(o, r, t, e)), u
            });
        if (!n) {
            var l = i.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
            (0, A.wrapLoading)(o)(s, "bottom", l)
        }
        return s
    }

    function T(e, t) {
        var n = e.get().pipeId;
        return !("undefined" != typeof n && "undefined" != typeof t && n !== t)
    }

    function S(e, t, n, r, a, i) {
        return T(e, a) ? e.setState(c(i, r().idFn, e.get())).then(y.bind(null, t, n, r)) : !1
    }

    function I(e, t, n) {
        var c = C.bind(null, t, k.bind(null, t, n)),
            f = function(e, r) {
                (t.get().activated || e) && ("undefined" != typeof r && t.get().elements.length > 0 && t.setState({
                    scrolled: r
                }), n().onScroll && n().onScroll())
            },
            p = (0, L.createScroll)(e, {
                noScroll: t.get().noScroll,
                nativeScroll: t.get().nativeScroll,
                scrollChange: f.bind(null, !1),
                more: n().more ? c.bind(null, !1) : !1
            }),
            _ = (0, P.createModule)({
                handlers: function(r, a) {
                    a(e, "click", t.get().elCls, n().onClick)
                }
            });
        return t.setState(d(n().idFn, {}, t)), {
            pipe: function(e, r) {
                return t.setState({
                    pipeId: r
                }), e.then(S.bind(null, t, p.getContainer(), p, n, r))
            },
            replacePreserveOrder: function(e) {
                return t.set(m.bind(null, e, n().idFn)).then(y.bind(null, p.getContainer(), p, n))
            },
            pipeReplace: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
                return t.setState({
                    pipeId: r,
                    stop: !1
                }), e.then(function(e) {
                    return T(t, r) ? t.setState({
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
                return t.set(E.bind(null, e, n))
            },
            updateScroll: function() {
                p.update(!1, !0)
            },
            toTop: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                t ? p.smoothScroll(-p.scrollTop()) : p.scrollTop(0), e && f(e, 0)
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
            scrollToElement: function(e, r, a, i) {
                w(t, p, n, e, r, a, i)
            },
            checkMore: function(e) {
                return t.get().elements.length < t.get().limit ? c(e, p) : Promise.resolve([])
            },
            add: function(e, r) {
                return S(t, p.getContainer(), p, n, r, e)
            },
            hoverNextElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = p.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    g = (0, M.toArray)(u).slice(d + 1).find(n().hoverableFn);
                o(t, s, g, e), w(t, p, n, null, !1, a.top, a.bottom)
            },
            hoverPrevElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = p.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    g = d >= 0 && (0, M.toArray)(u).slice(0, d).reverse().find(n().hoverableFn);
                o(t, s, g, e), w(t, p, n, null, !1, a.top, a.bottom)
            },
            hoverFirstElement: function(e, r) {
                var a = p.getContainer(),
                    i = a.children,
                    s = (0, M.toArray)(i).findIndex(n().hoverableFn),
                    l = i[s];
                !t.get().hoveredListItemId && l && (o(t, a, l, e), w(t, p, n, s, !1, r.top, r.bottom))
            },
            hoverElement: function(e, r, a) {
                var s = p.getContainer(),
                    l = s.children,
                    u = i(l, e),
                    c = l[u];
                c && (o(t, s, c, r), w(t, p, n, u, !1, a.top, a.bottom))
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
                (0, P.destroyModule)(_), p.destroy()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createIdMap = u, t.addElements = c, t.collapseOps = p, t.distance = _, t.mount = I;
    var A = n(160),
        M = n(244),
        L = n(167),
        P = n(121)
}, function(e, t, n) {
    var r = n(115),
        a = n(1)("toStringTag"),
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
}, , , , , , , function(e, t, n) {
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
        var a = void 0;
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
    var m = n(109),
        f = r(m),
        p = n(246),
        _ = new f["default"],
        h = !1
}, function(e, t) {}, , , function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = (0, l.parserMessage)(t);
        var n = vk.id == t.peerId && !(0, l.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : n || (0, u.isOut)(t) ? (0, c.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, u.isGift)(t) || (0, u.isSticker)(t) || (0, u.isAudioMsg)(t) || (0, u.isGraffiti)(t) || (0, u.isMoney)(t) || (0, u.isMessageWithInviteLink)(t) ? !1 : (0, l.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, c.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
    }

    function a(e) {
        var t = document.createElement("div");
        return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
    }

    function i(e, t) {
        var n = t && t.msgs ? Object.keys(t.msgs) : [],
            a = n.filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return r(e, t.msgs[n])
            });
        return +a || null
    }

    function o(e, t, n) {
        var r = (0, d.convertKludgesToAttaches)(t.kludges, t.messageId),
            i = n.dData.attaches;
        if (a(t.text) !== n.dData.txt || r.length !== i.length) return !0;
        for (var o = r.length; o--;)
            if (r[o].id != i[o].id || r[o].type != i[o].type) return !0;
        return !1
    }

    function s(e, t, n, r, a) {
        t.origText = n, t.text = (0, c.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.canMessageBeEdited = r, t.convertEmojiHtmlToRegularText = a, t.findLastMessageToEdit = i, t.wasMessageReallyModified = o, t.replaceMsgAfterEdit = s;
    var l = n(144),
        u = n(214),
        c = n(160),
        d = n(227)
}, , , , , function(e, t) {
    t.f = {}.propertyIsEnumerable
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return Array.isArray(e) ? e : Array.from(e)
    }

    function a(e) {
        var t = N(e, 2),
            n = t[1];
        return {
            type: j,
            localId: n
        }
    }

    function i(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: G,
            messageId: n,
            mask: r,
            peerId: a
        }
    }

    function o(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: U,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function s(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: q,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function l(e) {
        var t = N(e, 11),
            n = t[1],
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5],
            s = t[6],
            l = t[7],
            u = t[8],
            c = t[9],
            d = t[10],
            g = extend(s, l || void 0);
        return s || ((0, H.imWeirdLog)("empty_other_kludges", [n, r, a, i, o, s, l, u, c, d]), s = {}), {
            type: z,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(a),
            date: intval(i),
            attaches: (0, F.convertKludgesToAttaches)(g, n),
            subject: s.title || "",
            text: o,
            kludges: g,
            randomId: intval(u),
            userId: (0, B.isChatPeer)(a) ? intval(g.from) : intval(a),
            update_time: d,
            chat_local_id: c
        }
    }

    function u(e) {
        var t = l(e);
        return t.type = fe, t
    }

    function c(e) {
        return extend({}, e, {
            type: fe
        })
    }

    function d(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: V,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function g(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: W,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function m(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: K,
            userId: -n,
            platform: r,
            lastSeenTs: a
        }
    }

    function f(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: Y,
            userId: -n,
            reason: r,
            lastSeenTs: a
        }
    }

    function p(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: ne,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function _(e) {
        var t = N(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: re,
            peerId: n,
            mask: r
        }
    }

    function h(e) {
        var t = N(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: ae,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function v(e) {
        var t = N(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: me,
            peerId: n,
            localId: r
        }
    }

    function b(e) {
        var t = N(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: Q,
            chatId: n,
            self: r
        }
    }

    function y(e) {
        var t = r(e),
            n = t[1],
            a = t[2],
            i = t.slice(3);
        return {
            type: X,
            peerId: 2e9 > n ? n + 2e9 : n,
            updateType: a,
            intVector: i
        }
    }

    function w(e) {
        var t = N(e, 2),
            n = t[1];
        return {
            type: $,
            userId: n,
            peerId: n
        }
    }

    function C(e) {
        var t = N(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: $,
            userId: n,
            peerId: r + 2e9
        }
    }

    function E(e) {
        var t = N(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: Z,
            userId: n,
            callId: r
        }
    }

    function k(e) {
        var t = N(e, 2),
            n = t[1];
        return {
            type: J,
            count: n
        }
    }

    function T(e) {
        var t = N(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: ee,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function S(e) {
        var t = N(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n,
            a = l([!1, r.id, r.flags, r.peer_id, r.date, r.message, extend(r.kludges, {
                title: r.title || ""
            }), {}, r.random_id, r.chat_local_id, r.update_time]);
        return a.type = fe, a
    }

    function I(e) {
        return {
            type: te,
            params: e
        }
    }

    function A(e) {
        return {
            type: oe,
            state: e
        }
    }

    function M() {
        return {
            type: ie
        }
    }

    function L() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: se,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function P(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        return {
            type: ue,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r
        }
    }

    function O(e) {
        return {
            type: ce,
            tab: e
        }
    }

    function D(e, t, n) {
        return {
            type: de,
            message: t,
            peer: e,
            error: n
        }
    }

    function x(e) {
        var t = N(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5];
        return {
            type: le,
            free: !!intval(n) || intval(i) === vk.id,
            resource: r,
            peerId: intval(a),
            who: intval(i),
            name: o
        }
    }

    function R(e, t) {
        return {
            type: ge,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CONVERSATION_UPDATED = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
    var N = function() {
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
    t.deleteEvent = a, t.replaceFlagsEvent = i, t.setFlagsEvent = o, t.resetFlagsEvent = s, t.addMessageEvent = l, t.editMessageEvent = u, t.editMessageLocallyEvent = c, t.readInboundEvent = d, t.readOutboundEvent = g, t.gotOnlineEvent = m, t.gotOfflineEvent = f, t.resetDirectoriesEvent = p, t.replaceDirectoriesEvent = _, t.setDirectoriesEvent = h, t.deleteDialogEvent = v, t.chatChangedEvent = b, t.chatUpdatedEvent = y, t.typingUserEvent = w, t.typingChatEvent = C, t.videoCallEvent = E, t.unreadCountEvent = k, t.notifySettingsChangedEvent = T, t.refreshMessageEvent = S, t.emptyEvent = I, t.transitionEvent = A, t.resyncEvent = M, t.resetPeer = L, t.changePeer = P, t.changeTab = O, t.failedMessage = D, t.mutexEvent = x, t.resendEvent = R;
    var B = n(160),
        F = n(227),
        H = n(130),
        j = t.DELETE = "event_delete",
        U = t.SET_FLAGS = "event_set_flags",
        G = t.REPLACE_FLAGS = "event_replace_flags",
        q = t.RESET_FLAGS = "event_reset_flags",
        z = t.ADD_MESSAGE = "event_add_message",
        V = t.READ_INBOUND = "event_read_inbound",
        W = t.READ_OUTBOUND = "event_read_outbound",
        K = t.GOT_ONLINE = "event_got_online",
        Y = t.GOT_OFFLINE = "event_got_offline",
        Q = t.CHAT_CHANGED = "event_chat_changed",
        X = t.CONVERSATION_UPDATED = "event_chat_updated",
        $ = t.TYPING = "event_typing",
        Z = t.VIDEO_CALL = "event_video_call",
        J = t.UNREAD_COUNT = "event_unread_count",
        ee = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        te = t.EMPTY = "event_empty",
        ne = t.RESET_DIRECTORIES = "event_reset_directories",
        re = t.REPLACE_DIRECTORIES = "event_replace_directories",
        ae = t.SET_DIRECTORIES = "event_set_directories",
        ie = t.RESYNC = "event_resync",
        oe = t.TRANSITION = "transition_event",
        se = t.RESET_PEER = "reset_peer",
        le = t.MUTEX = "mutex",
        ue = t.CHANGE_PEER = "change_peer",
        ce = t.CHANGE_TAB = "event_change_tab",
        de = t.FAILED_MESSAGE = "event_failed_message",
        ge = t.RESEND = "event_resend",
        me = t.DELETE_DIALOG = "event_delete_dialog",
        fe = t.EDIT_MESSAGE = "event_edit_message";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2
}, , , , , , function(e, t, n) {
    var r = n(20),
        a = n(210);
    e.exports = function(e) {
        return r(a(e))
    }
}, , function(e, t, n) {
    var r = n(71),
        a = n(118),
        i = n(196),
        o = n(183),
        s = n(150),
        l = n(212);
    e.exports = function(e, t, n, u, c) {
        var d, g, m, f = c ? function() {
                return e
            } : l(e),
            p = r(n, u, t ? 2 : 1),
            _ = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (i(f))
            for (d = s(e.length); d > _; _++) t ? p(o(g = e[_])[0], g[1]) : p(e[_]);
        else
            for (m = f.call(e); !(g = m.next()).done;) a(m, p, g.value, t)
    }
}, function(e, t, n) {
    var r = n(253),
        a = n(210);
    e.exports = function(e) {
        return function(t, n) {
            var i, o, s = String(a(t)),
                l = r(n),
                u = s.length;
            return 0 > l || l >= u ? e ? "" : void 0 : (i = s.charCodeAt(l), 55296 > i || i > 56319 || l + 1 === u || (o = s.charCodeAt(l + 1)) < 56320 || o > 57343 ? e ? s.charAt(l) : i : e ? s.slice(l, l + 2) : (i - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    var r = n(102);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
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
}, , function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        var i = 105 + ((0, v.isPinnedMessageVisibleInTab)(e, (0, p.getPeer)(e)) ? (0, m.getPinnedMessageHeight)() : 0);
        showTooltip(t, {
            shift: [n, 10],
            black: 1,
            className: "_im_history_tooltip " + r,
            appendParentCls: "_im_mess_stack",
            toup: t.getBoundingClientRect().top > i + 37,
            text: a
        })
    }

    function a(e, t, n) {
        var r = gpeByClass("_im_mess", n),
            a = intval(domData(r, "msgid")),
            o = e.get().peer,
            s = (0, p.getMessage)(e, o, a),
            l = !(0, f.isImportant)(s);
        return e.get().longpoll.push([{
            peerId: o,
            messageId: a,
            type: l ? h.SET_FLAGS : h.RESET_FLAGS,
            flags: h.FLAG_IMPORTANT
        }]), e.set(g.favMessage.bind(null, [a], l, o)), i(e, -10, t, n), !1
    }

    function i(e, t, n, a) {
        var i = getLang("mail_im_toggle_important").length > 14;
        r(e, a, i ? 84 : 34, i ? "im-star-tt_long" : "im-star-tt", function() {
            var t = domData(gpeByClass("_im_mess", a), "msgid"),
                n = (0, p.getMessage)(e, e.get().peer, t);
            return n ? (0, f.isImportant)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
        })
    }

    function o(e, t, n) {
        var r = e.get().peer,
            a = +domData(domClosest("im-mess", n.target), "msgid");
        return (0, g.processFwd)([a], r, e).then(function(t) {
            return e.set(g.forwardMessages.bind(null, t, e.get().tfdraft))
        }).then(function() {
            return t().respond(e, r)
        }), !1
    }

    function s(e, t, n, a) {
        r(e, a, 18, "im-reply-tt", getLang("mail_im_reply"))
    }

    function l(e, t, n, r) {
        var a = intval(domData(gpeByClass("_im_mess", r), "msgid")),
            i = (0, p.getMessage)(e, e.get().peer, a);
        return i && t().startEditing(i), !1
    }

    function u(e, t, n) {
        r(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
    }

    function c(e, t) {
        return {
            markImportant: function(t, n, r) {
                (0, m.updateStar)(t, n, e)
            },
            unmount: function() {
                (0, _.destroyModule)(t)
            }
        }
    }

    function d(e, t, n) {
        var r = i.bind(null, t, 0),
            d = a.bind(null, t),
            g = s.bind(null, t, 0),
            m = o.bind(null, t, n),
            f = u.bind(null, t),
            p = l.bind(null, t, n),
            h = (0, _.createModule)({
                handlers: function(t, n) {
                    n(e, "click", b, d), n(e, "mouseover", b, r), n(e, "click", y, m), n(e, "mouseover", y, g), n(e, "click", w, p), n(e, "mouseover", w, f)
                }
            });
        return c(e, h)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var g = n(122),
        m = n(160),
        f = n(214),
        p = n(144),
        _ = n(121),
        h = n(55),
        v = n(207),
        b = "_im_mess_fav",
        y = "_im_mess_reply",
        w = "_im_mess_edit"
}, function(e, t, n) {
    "use strict";
    var r = n(163),
        a = n(95),
        i = n(194),
        o = n(143),
        s = n(254),
        l = n(63),
        u = n(141),
        c = n(102),
        d = n(176),
        g = n(220),
        m = n(258),
        f = n(164);
    e.exports = function(e, t, n, p, _, h) {
        var v = r[e],
            b = v,
            y = _ ? "set" : "add",
            w = b && b.prototype,
            C = {},
            E = function(e) {
                var t = w[e];
                i(w, e, "delete" == e ? function(e) {
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
        if ("function" == typeof b && (h || w.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var k = new b,
                T = k[y](h ? {} : -0, 1) != k,
                S = d(function() {
                    k.has(1)
                }),
                I = g(function(e) {
                    new b(e)
                }),
                A = !h && d(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            I || (b = t(function(t, n) {
                u(t, b, e);
                var r = f(new v, t, b);
                return void 0 != n && l(n, _, r[y], r), r
            }), b.prototype = w, w.constructor = b), (S || A) && (E("delete"), E("has"), _ && E("get")), (A || T) && E(y), h && w.clear && delete w.clear
        } else b = p.getConstructor(t, e, _, y), o(b.prototype, n), s.NEED = !0;
        return m(b, e), C[e] = b, a(a.G + a.W + a.F * (b != v), C), h || p.setStrong(b, e, _), b
    }
}, function(e, t, n) {
    var r = n(80);
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
}, , , , function(e, t, n) {
    e.exports = !n(237) && !n(176)(function() {
        return 7 != Object.defineProperty(n(241)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , function(e, t, n) {
    e.exports = n(163).document && document.documentElement;
}, function(e, t, n) {
    "use strict";
    var r = n(238);
    e.exports = n(70)("Map", function(e) {
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
}, , function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, , function(e, t, n) {
    var r = n(253),
        a = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? a(e + t, 0) : i(e, t)
    }
}, , , , , , function(e, t, n) {
    var r = n(183),
        a = n(29),
        i = n(65),
        o = n(201)("IE_PROTO"),
        s = function() {},
        l = "prototype",
        u = function() {
            var e, t = n(241)("iframe"),
                r = i.length,
                a = ">";
            for (t.style.display = "none", n(77).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + a), e.close(), u = e.F; r--;) delete u[l][i[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[l] = r(e), n = new s, s[l] = null, n[o] = e) : n = u(), void 0 === t ? n : a(n, t)
    }
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, , function(e, t, n) {
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
            i = t.contHeight();
        y["default"].onNewMessagesChunk();
        var o = a.reduce(function(e, t) {
                return e[domData(t, "date")] = [t.offsetTop + M, i, t], e
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
            o = (0, h.isClassicInterface)(a) ? A : I;
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

    function m(e) {
        var t = geByClass1("_im_mess", e),
            n = domData(t, "ts");
        return t && n ? {
            text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
            date: n
        } : null
    }

    function f(e, t, n, r, o) {
        var s = e.get(),
            l = (0, v.isEverythingLoaded)(s),
            u = t.get(),
            f = o.scrollTop(),
            p = u.lastTop ? u.lastTop - f : 0;
        u.lastTop = f;
        var _ = (0, E.isPinnedMessageVisibleInTab)(s, s.peer) ? (0, h.getPinnedMessageHeight)() : 0,
            b = ((0, h.isClassicInterface)(e) ? k + _ : 0) - T / 2,
            y = o.contHeight(),
            w = g(t, f, y, b, e),
            C = w.prevBar,
            S = w.curBar,
            I = w.prevLeft,
            A = "translateY(0px)",
            M = !1,
            L = !1,
            P = !1;
        S || l || (S = m(r)), S ? M = S : L = !0, C && S && I > -T && 0 > I && (P = !0, L = !1, M = S, A = "translateY(" + (-T - I) + "px)"), M && i(n, M), P ? t.set(c.bind(null, n, C.date, p)) : t.set(d.bind(null, n)), A && setStyle(n, a({}, cssTransformProp, A)), toggleClass(n, "im-page--top-date-bar_no-b", L)
    }

    function p(e, t) {
        var n = geByClass1("_im_top_date_bar"),
            r = (0, C["default"])({
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
                    f(e, r, n, t, a)
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
                    f(e, r, n, t, i)
                })
            },
            toggle: function(e) {
                e ? setStyle(n, {
                    display: ""
                }) : hide(n)
            },
            show: function() {
                i = Date.now(), l || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), l = setInterval(function() {
                    Date.now() - i > L && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(l), l = null)
                }, P))
            },
            update: function(i) {
                a && (clearTimeout(a), a = null), a = setTimeout(function() {
                    f(e, r, n, t, i)
                }, S), f(e, r, n, t, i)
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
    var h = n(160),
        v = n(122),
        b = n(169),
        y = r(b),
        w = n(198),
        C = r(w),
        E = n(207),
        k = 68,
        T = 32,
        S = 300,
        I = 20,
        A = 68,
        M = 10,
        L = 2e3,
        P = 100
}, function(e, t, n) {
    for (var r = n(149), a = n(194), i = n(163), o = n(189), s = n(19), l = n(1), u = l("iterator"), c = l("toStringTag"), d = s.Array, g = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], m = 0; 5 > m; m++) {
        var f, p = g[m],
            _ = i[p],
            h = _ && _.prototype;
        if (h) {
            h[u] || o(h, u, d), h[c] || o(h, c, p), s[p] = d;
            for (f in r) h[f] || a(h, f, r[f], !0)
        }
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(64)(!0);
    n(159)(String, "String", function(e) {
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
    var r = n(163),
        a = n(89),
        i = n(189),
        o = n(194),
        s = n(71),
        l = "prototype",
        u = function(e, t, n) {
            var c, d, g, m, f = e & u.F,
                p = e & u.G,
                _ = e & u.S,
                h = e & u.P,
                v = e & u.B,
                b = p ? r : _ ? r[t] || (r[t] = {}) : (r[t] || {})[l],
                y = p ? a : a[t] || (a[t] = {}),
                w = y[l] || (y[l] = {});
            p && (n = t);
            for (c in n) d = !f && b && void 0 !== b[c], g = (d ? b : n)[c], m = v && d ? s(g, r) : h && "function" == typeof g ? s(Function.call, g) : g, b && o(b, c, g, e & u.U), y[c] != g && i(y, c, m), h && w[c] != g && (w[c] = g)
        };
    r.core = a, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, n) {
    var r = n(102),
        a = n(183),
        i = function(e, t) {
            if (a(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(71)(Function.call, n(111).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (a) {
                t = !0
            }
            return function(e, n) {
                return i(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: i
    }
}, , , function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, , function(e, t, n) {
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
        if ((0, E.isSearchingValue)(e, o)) {
            var s = g.bind(null, e, n, a, t);
            o ? (e.setState({
                recentSearch: !1
            }), a.stop()) : a.replaceOrAdd(s), cancelStackPush("im_search", s), o && e.set(C.setCurrentSearch.bind(null, o, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
        } else o || (a.stop(), e.set(C.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
    }

    function o(e, t, n) {
        return function() {
            var r = (0, E.getSearchText)(t);
            r === e && n.apply(void 0, arguments)
        }
    }

    function s(e, t, n) {
        var r = t().appendFastDialogs.bind(null, n),
            a = o(e, n, r);
        return (0, C.searchTopConv)(e, n.get()).then(function(e) {
            var t = e;
            return a(t), e
        })
    }

    function l(e, t, n) {
        var r = (0, E.getSearchText)(n);
        return x(.01, "im_search_stat", 1, "search_start"), (0, C.updateSearchQuery)(r), n.setState({
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
        return (0, k.isPendingForward)(r) ? (0, C.searchHints)(e, n, "all", a).then(i) : Promise.all([(0, C.searchHints)(e, n, "all", a).then(i), (0, C.searchMessages)(e, a)]).then(function(e) {
            var t = w(e, 2),
                n = w(t[1], 2),
                a = n[0],
                i = n[1];
            s(r, a, i, !0)
        })
    }

    function c(e, t, n) {
        n().showCreation(e)
    }

    function d(e, t, n, r, o) {
        var s = a(t);
        s.value = o, i(e, r, t, s, n, s.value)
    }

    function g(e, t, n, r) {
        cancelStackFilter("im_search");
        var o = a(t);
        uiSearch.reset(o), e.setState({
            recentSearch: !1
        }), i(e, r, t, o, n, o.value)
    }

    function m(e, t, n, r, a, i) {
        (0, E.isSearching)(e) ? (g(e, t, a, n), setTimeout(function() {
            return p(e, i)
        }, 10)) : (window.tooltips && tooltips.hide(i, {
            showsp: 0
        }), c(e, i, r))
    }

    function f(e, t, n, r, a) {
        return (0, k.showFavvedBox)(e, n, P.mount, r)
    }

    function p(e, t) {
        return showTooltip(t, {
            appendEl: bodyNode,
            text: function() {
                return (0, E.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
            },
            black: 1,
            shift: [3, -1],
            appendCls: "js-im-page"
        })
    }

    function _(e, t, n) {
        var r = n.target;
        e.set(C.toggleCommunityMute.bind(null, t)).then(function() {
            toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && v(e, {
                target: r
            })
        })
    }

    function h(e, t, n, r, a) {
        if (!(0, E.isSearching)(e)) {
            var o = cur.imDb.select(O.RECENT_SEARCH_OP);
            if (0 !== o.length || (0, D.doPopularSuggExist)(e)) {
                e.setState({
                    recentSearch: !0
                }), i(e, function() {
                    (0, E.isSearching)(e) || (r.stop(), a().restoreDialogs(e, !1, !0))
                }, t, n, r, "");
                var s = o.filter(function(t) {
                        return !(0, k.isTabLoadedWithMessage)(e.get(), t)
                    }),
                    l = o.filter(function(t) {
                        return (0, k.isTabLoadedWithMessage)(e.get(), t)
                    }).reduce(function(t, n) {
                        return t[n] = (0, E.getTab)(e, n), t
                    }, {});
                e.get().topConvTree.then(function(t) {
                    var n = t.list.filter(function(e) {
                            return inArray(e[0], s)
                        }).reduce(function(e, t) {
                            return e[t[0]] = (0, C.localIndexToDialog)(t), e
                        }, {}),
                        r = extend({}, n, l);
                    return a().appendFastDialogs(e, o.map(function(e) {
                        return r[e]
                    })), (0, C.searchHints)(!1, Object.keys(n), !1, e.get())
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

    function b(e, t, n, r, i, o) {
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
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    i = a ? o : function() {};
                d(t, e, r, i, n)
            },
            clearSearch: function(t) {
                g(t, e, r, function() {})
            },
            updateImportantCnt: function(t) {
                var n = t.get().important_cnt,
                    r = geByClass1(R, e);
                toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
            },
            unmount: function() {
                r.stop(), (0, I.destroyModule)(i), uiSearch.destroy(n), cancelStackFilter("im_search")
            }
        }
    }

    function y(e, t, n) {
        var r = geByClass1("_im_search_croll", e),
            o = a(e),
            s = (0, S["default"])("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
            c = (0, M.debouncedPromise)(u, 300),
            d = l.bind(null, n, c),
            g = i.bind(null, t, d, e, o, s),
            y = m.bind(null, t, e, d, n, s, r),
            w = f.bind(null, t, e, n),
            C = geByClass1("_im_dialogs_search_input", e);
        uiSearch.init(C, {
            onChange: g
        });
        var E = p.bind(null, t, r),
            T = geByClass1(N, e);
        o.value && g(o.value);
        var A = (0, I.createModule)({
            handlers: function(a, i) {
                if (a(geByClass1("_im_av_time", e), "mouseover", function(e) {
                        showTooltip(e.target, {
                            text: getLang("mail_admin_av_time"),
                            dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                            shift: [0, 8]
                        })
                    }), a(r, "click", y), a(r, "mouseover", E), a(geByClass1(R, e), "click", w), (0, k.isClassicInterface)(t)) {
                    var l = _.bind(null, t, !0),
                        u = v.bind(null, t);
                    a(T, "click", l), a(T, "mouseover", u)
                }
                a(o, "focus", function() {
                    t.get().longpoll.push([(0, L.transitionEvent)("search")])
                }), a(o, "click", function() {
                    h(t, e, o, s, n)
                }), a(o, "blur", function() {
                    var e = void 0;
                    e = 0 === t.get().peer ? "search" : (0, k.isPendingForward)(t) ? "search" : "default", t.get().longpoll.push([(0, L.transitionEvent)(e)])
                })
            }
        });
        return (0, k.isClassicInterface)(t) && _(t, !1, {
            target: T
        }), b(e, r, C, s, A, d)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var w = function() {
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
    var C = n(122),
        E = n(144),
        k = n(160),
        T = n(242),
        S = r(T),
        I = n(121),
        A = n(235),
        M = n(246),
        L = n(55),
        P = n(155),
        O = n(32),
        D = n(144),
        x = debounce(A.statlogsProbValueEvent, 1e3),
        R = "_im_important_counter",
        N = "_im_gim_mute"
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = e.split("_"),
            r = _(n, 2),
            a = r[0],
            i = r[1];
        return [a, i, t]
    }

    function a(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (i > 50) return [
            [], e.length
        ];
        for (var o = [], s = ""; n < e.length;) {
            var l = e[n];
            if ("id" === l) s = t[n];
            else if ("," === l && s) o.push(r(s)), s = "";
            else if ("(" === l) {
                var u = a(e, t, n + 1, i + 1),
                    c = _(u, 2),
                    d = c[0],
                    g = c[1];
                n = g, o.push(r(s, d)), s = ""
            } else if (")" === l) return "" !== s && o.push(r(s)), [o, n];
            n++
        }
        return s && o.push(r(s)), [o, n]
    }

    function i(e) {
        if (E[e]) return E[e];
        for (var t = e ? e.length : 0, n = [], r = [], i = "", o = 0; t > o; o++) {
            var s = e[o],
                l = s.charCodeAt(0);
            l >= 48 && 57 >= l || "_" === s || "-" === s ? i += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== i && (r.push(i), n.push("id"), i = ""), r.push(s), n.push(s))
        }
        i.length > 0 && (r.push(i), n.push("id"));
        var u = a(n, r),
            c = _(u, 1),
            d = c[0];
        return Object.keys(E).length > 300 && (E = {}), E[e] = d, d
    }

    function o(e, t) {
        for (var n = void 0, r = 0, a = e; null !== (n = h.MESSAGE_REGEXP.exec(e));) {
            n = u(n);
            var i = n[0].length,
                o = n.index + i,
                s = e[n.index - 1],
                l = e[o - 1],
                d = void 0 !== s && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(s),
                g = void 0 !== l && /([:;$])/i.test(l);
            if (!d && !g) {
                var m = c(n),
                    f = m.domain;
                if (f.length <= h.MAX_DOMAIN_LENGTH && -1 !== h.TOP_DOMAINS.indexOf(f)) {
                    var p = t(m);
                    a = a.slice(0, n.index + r) + p + a.slice(o + r), r += p.length - i
                }
            }
        }
        return a
    }

    function s(e, t) {
        return e.replace(h.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function l(e, t) {
        return e.replace(h.MENTION, t || function(e, t, n, r, a) {
            return '<a href="/' + (t + n) + '" class="mem_link" mention="' + y(r || "") + '" mention_id="' + y(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + a + "</a>"
        })
    }

    function u(e) {
        if (!e[0] || !e[6]) return e;
        var t = e[0].length - 1,
            n = e[6].length - 1;
        return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
    }

    function c(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function d() {
        return v || (v = new RegExp(h.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
    }

    function g(e, t) {
        return e.replace(d(), function(e, n, r, a, i, o) {
            return (n || "") + t(r + (i || ""))
        })
    }

    function m(e) {
        C("ttl_message_confirm_delivery", e)
    }

    function f(e, t) {
        var n = t.protocol,
            r = t.url,
            a = t.query,
            i = t.domain,
            o = t.full;
        try {
            o = decodeURIComponent(o)
        } catch (s) {}
        if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = y(o).replace(/&amp;/g, "&"), !e && i.match(h.OUR_DOMAINS)) {
            r = w(r).replace(h.ENTITIES, encodeURIComponent);
            var l = r,
                u = r.indexOf("#/"),
                c = "",
                d = void 0;
            return u >= 0 ? l = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (l = "/" + r.substr(u + 2).replace(/^\//, ""))), d = l.match(h.VK_DOMAIN), d && d[1].length < 32 && (c = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + p(n + r + a) + '" target="_blank"' + c + ">" + o + "</a>"
        }
        var g = "away.php?utf=1&to=" + encodeURIComponent(n + w(r + a)),
            m = y((n + r + a).replace(/'/g, "\\'")),
            f = "return goAway('" + m + "', {}, event);";
        return '<a href="' + g + '" target="_blank" onclick="' + f + '">' + o + "</a>"
    }

    function p(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
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
    t.parseFwd = i, t.replaceHyperLinks = o, t.replaceEmailLinks = s, t.replaceMentions = l, t.replaceHashtags = g, t.confirmDelivery = m, t.linksReplacer = f;
    var h = n(188),
        v = void 0,
        b = window,
        y = b.clean,
        w = b.replaceEntities,
        C = b.statlogsValueEvent,
        E = {}
}, , , , , function(e, t, n) {
    n(17), n(94), n(92), n(78), e.exports = n(89).Map
}, , function(e, t, n) {
    var r = n(53),
        a = n(195),
        i = n(61),
        o = n(66),
        s = n(31),
        l = n(75),
        u = Object.getOwnPropertyDescriptor;
    t.f = n(237) ? u : function(e, t) {
        if (e = i(e), t = o(t, !0), l) try {
            return u(e, t)
        } catch (n) {}
        return s(e, t) ? a(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r, a, i) {
        (0, S.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(o.bind(null, t, !1), 100);
        var s = g(i);
        s.map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            removeClass(e, "olist_item_wrap_on")
        }), n().createCanceled(e, r), a.resetSelection(), "add_member" === e.get().creationType && e.set(S.setCreationType.bind(null, "chat", [])), e.set(S.presetAvatar.bind(null, !1));
        var u = geByClass1(V, t);
        l(e, i, t), uiSearch.reset(geByClass1(H, t)), uiSearch.reset(geByClass1(j, t)), u && u.parentNode.removeChild(u), l(e, i, t), cancelStackFilter("im_search");
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
        var r = geByClass1(q, n),
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
                d = geByClass1(j, t),
                m = getSize(d)[1],
                f = void 0;
            inArray(s, u) ? (f = r.removeSelection(s, c), removeClass(o, "olist_item_wrap_on")) : (f = r.addSelection(s, c), addClass(o, "olist_item_wrap_on")), f.then(function() {
                var e = m - getSize(d)[1],
                    t = a.scrollTop();
                a.scrollTop(t - e)
            }), l(e, i, t);
            var p = geByClass1(j, t);
            uiSearch.reset(p)
        }
    }

    function c(e, t) {
        var n = g(e),
            r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
            a = [];
        return t.online && a.push("online"), mobPlatforms[t.online] && a.push("mobile"), inArray(t.peerId, n) && r.push("olist_item_wrap_on"), getTemplate("im_owner_item", {
            owner_id: t.peerId,
            cls: " " + r.join(" "),
            photo: t.photo,
            name: t.name,
            link: t.href,
            img_cls: a.join(" ")
        })
    }

    function d(e) {
        return (0, I.getSearchText)(e) || !1
    }

    function g(e) {
        return e.get().selection.map(function(e) {
            return e.id
        })
    }

    function m(e, t, n, r) {
        toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
        var a = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
            i = geByClass1("_im_create_title", e);
        val(i, a), val(geByClass1(q, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat"));
        var o = n.get().selection.map(function(e) {
            return e.id
        });
        p(e, r, t, !1, o), (0, M.fixTableCellChildHeight)("_im_create_wrap_safe", e)
    }

    function f(e, t, n) {
        return e.then(function(e) {
            return e.filter(function(e) {
                return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
            })
        })
    }

    function p(e, t, n, r, a) {
        var o = geByClass1(j, e),
            s = void 0,
            l = void 0,
            u = (0, S.searchLocalHints)(r, t.get()),
            c = n.hoverFirstElement.bind(n, W, E(t));
        t.get().creation_shown_all = !1, n.reset(), n.pipe(f(u, r, t), r), n.toTop(), r ? (l = (0, S.searchTopConv)(r, t.get()), s = (0, S.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(f(s, r, t), r).then(c), n.pipe(f(l, r, t), r).then(c)) : (s = Promise.resolve([]), l = Promise.resolve([])), t.set(i.bind(null, [u, l, s], !0)), uiSearch.showProgress(o), Promise.all([u, s, l]).then(function() {
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
        e.set(S.setCreationType.bind(null, l, [])).then(m.bind(null, t, r, a))
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
            cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(S.presetAvatar.bind(null, n)), (0, S.getOwnerPhoto)(n, a).then(function(e) {
                geByClass1(U, t).appendChild(ce("img", {
                    className: "im-chat-placeholder--img " + V,
                    src: e
                }))
            }), addClass(t, "im-create_photo-attached")
        }, Page.ownerPhoto(a)
    }

    function b(e, t) {
        geByClass1(U, t).innerHTML = "", e.set(S.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
    }

    function y(e, t, n, r, i, o) {
        g(t).map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            return removeClass(e, "olist_item_wrap_on")
        }), t.reset(), p(n, e, r, !1, g(t)), i.resetSelection(), a(e, n, o, !1, i, t)
    }

    function w(e, t, n, r, i, o, l) {
        function u(a) {
            y(e, t, n, r, i, o), s(e, n, o, a, i, t), unlockButton(m), (0, I.isSearching)(e) ? o().cancelSearch(e) : o().restoreDialogs(e)
        }
        var c = g(t),
            d = e.get(),
            m = geByClass1(q, n),
            f = uiSearch.getFieldEl(geByClass1(H, n)).value;
        return c.length < 0 ? void 0 : "add_member" === e.get().creationType ? (e.set(S.addNewMember.bind(null, d.peer, c))["catch"](function(e) {
            return showFastBox(getLang("global_error"), e)
        }), a(e, n, o, "", i, t)) : (lockButton(m), 1 === c.length ? u(c[0]) : void e.set(S.createChat.bind(null, d.next_chat_avatar, c, f)).then(function() {
            return u(d.next_peer)
        })["catch"](function(e) {
            unlockButton(m), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
        }))
    }

    function C(e, t) {
        return showTooltip(e, {
            text: getLang("mail_cancel"),
            black: 1,
            zIndex: 1e3,
            shift: [3, -2],
            appendCls: "js-im-page"
        })
    }

    function E(e, t) {
        var n = 70,
            r = t && t.get().selection.length;
        return {
            top: -1,
            bottom: (0, M.isClassicInterface)(e) ? r > 0 ? n - 1 : 0 : -1
        }
    }

    function k(e, t, n, r, i, s, l, c) {
        return {
            show: function(t) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                t.setState({
                    shown: !0
                }), o(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown"), a && a.forEach(function(e) {
                    return i.addSelection(e[0], e[1])
                }), m(e, n, r, t), setTimeout(function() {
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
                n.hoverPrevElement(W, null, E(e, r))
            },
            hoverNextElement: function(e) {
                n.hoverNextElement(W, null, E(e, r))
            },
            unmount: function() {
                (0, P.destroyModule)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
            }
        }
    }

    function T(e, t, n) {
        var r = (0, D["default"])({
                selection: []
            }),
            o = geByClass1(N, e),
            s = (0, A.mount)(o, (0, D["default"])({
                offset: 0,
                limit: K,
                elements: [],
                elCls: B
            }), function() {
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
                        return t.get().shown ? (t.get().creation_shown_all || d(r) !== !1 ? a = Promise.resolve([]) : (t.get().creation_shown_all = !0, a = (0, S.searchTopConv)(d(r), t.get())), t.set(i.bind(null, [a], !1)), f(a, d(r), t)) : Promise.resolve(!1)
                    },
                    onClick: function(a, i) {
                        checkEvent(a) || (u(t, e, n, m, s, r, i), cancelEvent(a))
                    }
                }
            });
        t.get().creationQuery = !1, t.get().creationType = "chat";
        var g = geByClass1(j, e),
            m = (0, L.mount)(g, r, function() {
                return {
                    selectionDeleted: function(n, r) {
                        l(t, n, e), removeClass(geByClass1("_im_dialog" + r), "olist_item_wrap_on")
                    },
                    onChange: h.bind(null, t, e, s)
                }
            }),
            p = a.bind(null, t, e, n, "cross", m, r),
            E = _.bind(null, t, e, n, s, r, m),
            T = v.bind(null, t, e),
            I = b.bind(null, t, e),
            M = y.bind(null, t, r, e, s, m, n),
            O = w.bind(null, t, r, e, s, m, n),
            x = geByClass1(R, e),
            H = (0, P.createModule)({
                handlers: function(t, n) {
                    t(x, "click", p), t(x, "mouseover", C.bind(null, x)), t(geByClass1(U, e), "click", T), t(geByClass1(G, e), "click", I), t(geByClass1(z, e), "click", M), t(geByClass1(q, e), "click", O), t(e, "mouseover", throttle(s.unhoverElements.bind(s, W), 100)), n(e, "click", F, E)
                }
            });
        return k(e, n, s, r, m, H, p, O)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = T;
    var S = n(122),
        I = n(144),
        A = n(36),
        M = n(160),
        L = n(249),
        P = n(121),
        O = n(198),
        D = r(O),
        x = n(55),
        R = "_im_create_cancel",
        N = "_im_create_list",
        B = "_im_dialog",
        F = "_im_create_tab",
        H = "_im_dialogs_creation_name",
        j = "_im_create_select",
        U = "_im_create_avatar",
        G = "_im_create_remove_avatar",
        q = "_im_confirm_creation",
        z = "_im_cancel_creation",
        V = "_im_avatar_img",
        W = ["im-creation--item_hovered"],
        K = 100
}, , function(e, t, n) {
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
                e.loading = !0, (0, h.wrapLoading)(i)((0, _.loadSpam)(e.offset, r.get().gid).then(function(t) {
                    var n = p(t, 4),
                        a = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(_.mergeTabs.bind(null, (0, h.tabFromIds)(o.msgs, o.hash)));
                    var s = ce("div");
                    s.innerHTML = a, i.appendChild(s), (0, h.ensureDomHasActions)(i)
                }), "bottom")
            }
        }
    }

    function i() {
        return '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + h.DESELECT_ALL_CLASS + '"></button>'
    }

    function o(e, t) {
        var n = t.get().selectedMessages,
            r = geByClass1("_im_spam_box", e.bodyNode),
            a = geByClass1("ui_tab_sel", e.bodyNode);
        if (n.length > 0) {
            var o = getLang("mail_selected", n.length);
            o = o.replace("{count}", n.length), val(a, o + i())
        } else val(a, getLang("mail_spam"));
        0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(E), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(k), getLang("mail_im_mark_delspam", n.length)))
    }

    function s(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(_.cleanSelected).then(n.cleanSelection.bind(null, r)).then(function(n) {
            return o(t, e)
        })
    }

    function l(e, t, n, r) {
        var a = gpeByClass("_im_mess", r, t);
        if (a) {
            var i = intval(domData(a, "msgid"));
            a && ((0, _.removeMessageSend)([i], 0, e.get().tabs[0].hash, "undel", e.get().gid), (0, h.restoreMessage)(i, 0, t))
        }
    }

    function u(e, t, n) {
        var r = e.get().selectedMessages;
        (0, _.removeMessageSend)(r, 0, e.get().tabs[0].hash, "delete", e.get().gid), (0, h.removeMessagesWithRestore)(r, 0, "delete", t), s(e, t, n)
    }

    function c(e, t, n) {
        var r = e.get().selectedMessages;
        (0, _.removeMessageSend)(r, 0, e.get().tabs[0].hash, "nospam", e.get().gid), r.map(function(e) {
            return geByClass1("_im_mess_" + e)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            var t = intval(domData(e, "peer")),
                n = intval(domData(e, "msgid"));
            val(e, (0, h.renderGoTo)(t, n)), addClass(e, "im-mess_light")
        }), s(e, t, n)
    }

    function d(e, t, n, r, a) {
        var i = gpeByClass("_im_mess", a, t.bodyNode),
            o = intval(domData(i, "peer")),
            s = intval(domData(i, "msgid"));
        return t.hide(), n().unmount(), e.get().longpoll.push([(0, C.changePeer)(o, s)]), stopEvent(r), cancelEvent(r), !1
    }

    function g(e, t, n, r) {
        var a = showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function() {
            (0, _.flushSpam)(e, r).then(function(e) {
                var t = p(e, 2),
                    n = (t[0], t[1]);
                showDoneBox(n)
            }), a.hide(), t.hide(), n().unmount()
        }, getLang("mail_close"), function() {
            return a.hide()
        })
    }

    function m(e, t) {
        return {
            unmount: function() {
                t.unmount(), (0, v.destroyModule)(e)
            }
        }
    }

    function f(e, t, n) {
        var r = ge("box_layer_wrap"),
            i = (0, v.createMutations)(m),
            f = i.callMutations,
            p = i.bindMutations,
            _ = (0, w["default"])({
                peer: 0,
                oCache: {},
                tabs: (0, h.tabFromIds)(n.msgs, n.hash),
                gid: t.get().gid
            }),
            y = a.bind(null, {
                all: n.all,
                loading: !1,
                offset: n.offset
            }, e, r, _),
            C = l.bind(null, _, e.bodyNode),
            T = d.bind(null, t, e, f),
            S = g.bind(null, n.hash, e, f, t.get().gid),
            I = (0, b.mount)(e.bodyNode, _, function(t) {
                return {
                    changedMessageSelection: o.bind(null, e)
                }
            }),
            A = u.bind(null, _, e.bodyNode, I),
            M = c.bind(null, _, e.bodyNode, I),
            L = s.bind(null, _, e, I);
        (0, h.ensureDomHasActions)(e.bodyNode);
        var P = (0, v.createModule)({
            handlers: function(t, n) {
                t(r, "scroll", y), t(geByClass1(k, e.bodyNode), "click", A), t(geByClass1(E, e.bodyNode), "click", M), t(geByClass1("_im_spam_flush", e.bodyNode), "click", S), n(e.bodyNode, "click", "_im_mess_restore", C), n(e.bodyNode, "click", "_im_go_to", T), n(e.bodyNode, "click", h.DESELECT_ALL_CLASS, L)
            }
        });
        return p(P, I)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = function() {
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
    var _ = n(122),
        h = n(160),
        v = n(121),
        b = n(117),
        y = n(198),
        w = r(y),
        C = n(55),
        E = "_im_spam_not_spam",
        k = "_im_spam_spam"
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, , function(e, t, n) {
    "use strict";

    function r() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function a(e, t, n, a, o) {
        if (!(0, c.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(o, u.FAILED_CLASS) || hasClass(o, u.SENDING_CLASS) || hasClass(o, "_im_mess_srv") || (0, u.checkSelectClick)(a, o) || (0, d.isAnyMessageBeingEdited)(e) || "A" === a.target.tagName || a.target.classList.contains(g))) {
            var s = intval(domData(o, "msgid")),
                l = e.get().peer;
            if (!(0, u.isAlreadyDeleted)(e, l, s)) {
                var m = void 0,
                    f = void 0;
                m = a.shiftKey ? (0, d.getMessageRangeFromSelection)(e, l, s) : [s], e.set(c.addSelection.bind(null, m)).then(function() {
                    var a = (0, d.getSelectedMessages)(e),
                        i = !1;
                    m.forEach(function(e) {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var r = inArray(e, a);
                            i |= r, toggleClass(t, "im-mess_selected", r);
                            var o = r ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                s = geByClass1("_im_mess_blind_label_select", t);
                            attr(s, "aria-label", o)
                        }
                    }), i && r(), t().changedMessageSelection(e)
                }).then(function() {
                    1 !== e.get().selectedMessages.length || f ? f && f.hide() : f = i(e)
                })
            }
        }
    }

    function i(e) {
        var t = e.get();
        if (t.pinnedMessagesPromo && (0, u.isChatPeer)(t.peer)) {
            var n = geByClass1("_mess-action-promo"),
                r = new ElementTooltip(n, {
                    autoShow: !1,
                    appendTo: n,
                    content: getTemplate("im_pinned_messages_promo", {
                        content: getLang("mail_pinned_messages_promo_tooltip")
                    }),
                    forceSide: "bottom",
                    cls: "feature_intro_tt",
                    width: 260,
                    onHide: function() {
                        e.setState({
                            pinnedMessagesPromo: !1
                        }), (0, c.hidePromoTooltip)()
                    }
                });
            return r.show(), r
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
        var r = a.bind(null, t, n, e),
            i = (0, l.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_mess", r)
                }
            });
        return o(e, i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = s;
    var l = n(121),
        u = n(160),
        c = n(122),
        d = n(144),
        g = "_im_retry_media"
}, function(e, t, n) {
    var r = n(183);
    e.exports = function(e, t, n, a) {
        try {
            return a ? t(r(n)[0], n[1]) : t(n)
        } catch (i) {
            var o = e["return"];
            throw void 0 !== o && r(o.call(e)), i
        }
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e,
            t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e, t) {
        var n = Math.floor(t.status / 100);
        t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), P[n] = P[n] ? P[n] + 1 : 1, Date.now() - O >= L && (Object.keys(P).forEach(function(e) {
            statlogsValueEvent("im_longpoll", P[e], e + "0x", t.getResponseHeader("x-frontend"))
        }), P = {}, O = Date.now()))
    }

    function o(e) {
        var t = e.updates;
        return t.map(function(e) {
            switch (e[0]) {
                case 0:
                    return E.deleteEvent(e);
                case 1:
                    return E.replaceFlagsEvent(e);
                case 2:
                    return E.setFlagsEvent(e);
                case 3:
                    return E.resetFlagsEvent(e);
                case 4:
                    return E.addMessageEvent(e);
                case 5:
                    return E.editMessageEvent(e);
                case 6:
                    return E.readInboundEvent(e);
                case 7:
                    return E.readOutboundEvent(e);
                case 8:
                    return E.gotOnlineEvent(e);
                case 9:
                    return E.gotOfflineEvent(e);
                case 10:
                    return E.resetDirectoriesEvent(e);
                case 11:
                    return E.replaceDirectoriesEvent(e);
                case 12:
                    return E.setDirectoriesEvent(e);
                case 13:
                    return E.deleteDialogEvent(e);
                case 51:
                    return E.chatChangedEvent(e);
                case 52:
                    return E.chatUpdatedEvent(e);
                case 61:
                    return E.typingUserEvent(e);
                case 62:
                    return E.typingChatEvent(e);
                case 70:
                    return E.videoCallEvent(e);
                case 80:
                    return E.unreadCountEvent(e);
                case 114:
                    return E.notifySettingsChangedEvent(e);
                case 116:
                    return E.refreshMessageEvent(e);
                case -1:
                    return E.resyncEvent();
                default:
                    return E.emptyEvent(e)
            }
        })
    }

    function s(e, t) {
        return Promise.resolve(extend({}, t, {
            timeout: 64 > e ? 2 * e : e
        }))
    }

    function l(e, t) {
        return Promise.resolve(extend({}, t, {
            imTs: e
        }))
    }

    function u(e) {
        e.set(function(e) {
            return Promise.resolve(extend({}, e, {
                stopped: !0
            }))
        }).then(function() {
            e.get().cancelToken()
        })
    }

    function c(e, t) {
        return t.cancelToken = e, Promise.resolve(t)
    }

    function d(e, t) {
        return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
    }

    function g(e) {
        return e.pauses || (e.pauses = []), (0, S.lplog)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
            return e()
        }), e.pauses = [], Promise.resolve(e)
    }

    function m(e, t, n, r) {
        var a = r.failed ? (0, k.abortablePause)(A, e) : {},
            i = a.abort,
            o = a.pause;
        switch (r.failed) {
            case 1:
                return (0, S.lplog)("Old timestamp, init resync", "error"), e.set(d.bind(null, i)), n([E.resyncEvent()]), e.set(v.loadLongPollTs).then(o).then(f.bind(null, e, t, n));
            case 2:
                return (0, S.lplog)("Key is incorrect", "error"), e.set(d.bind(null, i)), e.set(v.loadLongPollKey).then(o).then(f.bind(null, e, t, n));
            case 3:
                throw nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return e.set(l.bind(null, r.ts)).then(function() {
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
            o = (0, w.plaingetCancelable)(a, {
                act: "a_check",
                key: r.imKey,
                version: M,
                ts: r.imTs,
                wait: 25,
                mode: r.mode
            }),
            l = o.request,
            u = o.cancel;
        return e.set(c.bind(null, u)).then(function() {
            return l
        }).then(function(t) {
            var n = h(t, 2),
                a = n[0],
                o = n[1];
            return o && i(r, o), e.set(s.bind(null, 1)), JSON.parse(a)
        })["catch"](function(e) {
            var t = h(e, 2),
                n = t[0],
                a = t[1];
            throw a && i(r, a), n
        }).then(m.bind(null, e, t, n))
    }

    function p(e, t, n) {
        e.get().stopped || ((0, S.lplog)("New request"), f(e, n, t).then(o).then(function(e) {
            return (0, S.lplog)("Request success", "success"), e
        }).then(t)["catch"](function(t) {
            return e.get().stopped ? void(0, S.lplog)("Stopped longpoll") : ("pause" !== t.message && topError(t), (0, S.lplog)("Error, waiting: " + (t.message || "no message (probably browser reset)"), "error"), e.set(s.bind(null, n() ? A / 2 : e.get().timeout)).then(function() {
                var t = (0, k.abortablePause)(e.get().timeout, e),
                    n = t.abort,
                    r = t.pause;
                return e.set(d.bind(null, n)).then(r)
            }))
        }).then(p.bind(null, e, t, n)))
    }

    function _(e) {
        var t = e.id,
            n = e.gid,
            r = e.key,
            a = e.ts,
            i = e.url,
            o = e.lhost,
            s = e.lpstat,
            l = "main",
            c = new EventEmitter,
            d = (0, T.initQueue)(function(e, t) {
                return c.trigger("data", t), Promise.resolve({})
            }),
            m = d.pause,
            f = d.resume,
            _ = d.pushMessage,
            h = d.isPaused,
            v = d.reset,
            b = (0, y["default"])({
                id: t,
                gid: n,
                mode: I,
                timeout: 1,
                imKey: r,
                imTs: a,
                imPart: i,
                imUrl: o,
                pause: !1,
                stat: s
            });
        return p(b, _.bind(null, l), h.bind(null, l)), {
            on: c.on.bind(c),
            off: c.off.bind(c),
            abortPauses: function() {
                return b.set(g)
            },
            stop: u.bind(null, b),
            pause: m.bind(null, l),
            resume: f.bind(null, l),
            reset: v.bind(null, l),
            push: function(e) {
                return c.trigger("data", e)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.eventTypes = void 0;
    var h = function() {
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
    t.startLongPoll = _;
    var v = n(122),
        b = n(198),
        y = a(b),
        w = n(136),
        C = n(55),
        E = r(C),
        k = n(246),
        T = n(192),
        S = n(244),
        I = (t.eventTypes = E, 202),
        A = 4,
        M = 4,
        L = 3e4,
        P = {},
        O = Date.now()
}, function(e, t, n) {
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

    function a(e, t, n, r) {
        c(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
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
            "delegate" === e[0] ? l.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = o, t.destroyModule = s;
    var l = n(234),
        u = window,
        c = u.addEvent,
        d = u.removeEvent
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

    function i(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function o(e) {
        if (!e.renew_hashes) {
            var t = e.last_hashes_update || 0;
            if (Date.now() - t < 1e4) return Promise.resolve();
            var n = Object.keys(e.tabs).filter(function(t) {
                return (0, jt.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = (0, Dt.post)(Dt.CONTROLLER, {
                act: "a_renew_hash",
                peers: n.join(","),
                gid: e.gid
            }).then(function(t) {
                var r = Ot(t, 1),
                    a = r[0];
                return n.forEach(function(t) {
                    e.tabs[t].hash = a[t]
                }), delete e.renew_hashes, e.last_hashes_update = Date.now(), e
            })
        }
        return e.renew_hashes
    }

    function s(e, t, n) {
        return i(e).then(function(r) {
            return r ? t.apply(void 0, n) : o(e).then(function(e) {
                return t.apply(void 0, n)
            })
        })
    }

    function l(e) {
        return function() {
            var t = arguments,
                n = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(r) {
                if (r && r.match && r.match(/1001;/)) return s(n, e, t);
                throw r
            })
        }
    }

    function u(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function c(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function d(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function g(e, t, n, r, a) {
        return a.tabHistoryNotChanged = !1, (0, Bt.retryFn)(Dt.post, 3, function(e) {
            return e - 1
        })(Dt.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: a.prevPeer,
            gid: a.gid,
            block: r
        }).then(function(t) {
            var r = Ot(t, 5),
                i = r[0],
                o = r[1],
                s = r[2],
                l = r[3],
                u = r[4];
            if (o.forEach(function(e) {
                    return (0, zt.oCacheAdd)(a, e)
                }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = u, a.tabs[e] || (a.tabs[e] = (0, jt.normalizeTab)(a, i)), d(l, a), n) {
                if (a.tabs[e]) {
                    var c = a.tabs[e].lastmsg,
                        g = a.tabs[e].lastmsg_meta;
                    extend(a.tabs[e], i), a.tabs[e].lastmsg = c, a.tabs[e].lastmsg_meta = g
                }
            } else extend(a.tabs[e], i);
            return a.admins = extend(a.admins, s), a.imQueue(e, !1), Pt(), m(e, a)
        })["catch"](function(e) {
            return (0, Vt.imWeirdCatch)("loadPeer", e)
        })
    }

    function m(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            a = n.filter(function(n) {
                return !(0, Gt.isRidExist)(t, e, n.rid)
            });
        return r.msgs = a.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, a), t.tabs[e].history = (0, jt.restoreQueue)(a, t, u(t.tabs[e].history)), Promise.resolve(t)
    }

    function f(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = (0, jt.removeMessages)([t], u(n.tabs[e].history)), Promise.resolve(n)
    }

    function p(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Ot(e, 1),
                r = n[0];
            return d(r, t)
        })
    }

    function _(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, jt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && p(n, t), Promise.resolve(t).then(w)) : ((0, jt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), g(n, e, !1, !0, t))
        }).then(w).then(h.bind(null, n))
    }

    function h(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return (0, jt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, jt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function v(e, t, n) {
        var r = n.msgid,
            a = n.peer;
        return !e && (0, jt.isFullyLoadedTab)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && p(a, n), Promise.resolve(n).then(w).then(h.bind(null, a))) : g(a, !0, r, !0, n).then(w).then(function() {
            var e = (0, Gt.getTab)(n, a);
            return e.msgid = r, n
        }).then(h.bind(null, a))
    }

    function b(e, t, n) {
        if (Ve(n)) throw (0, jt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var r = n.gid ? "gim" + n.gid : "im";
        if (n.prevPeer = n.peer, n.peer = e, n.msgid = t || "", cur.peer = e, Jt({
                sel: e ? (0, jt.convertPeerToUrl)(e) : null,
                msgid: n.msgid,
                email: "",
                0: r
            }), 0 != n.prevPeer && h(n.prevPeer, n, !0), 0 !== e) {
            var a = [];
            (0, jt.isTabLoaded)(n, e) && h(e, n, !0), a = n.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(n.tabbedPeers) : n.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), lt(a, !1, n)
        } else lt(n.tabbedPeers, !1, n);
        return en(), ge(n.prevPeer, n)
    }

    function y(e) {
        if (cur.wallMentions = [], (0, jt.isChatPeer)(e.peer) && (0, jt.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                n = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var r = (0, Gt.parserMessage)(t.msgs[e]),
                    a = r && r.userId;
                a && a != vk.id && -1 === n.indexOf(a) && (0, jt.isUserAliveInChat)(t, a) && n.push(a)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === n.indexOf(e) && n.push(e)
            }), n.forEach(function(t) {
                if ((0, zt.oCacheExists)(e, t)) {
                    var n = (0, zt.oCacheGet)(e, t),
                        r = n.link.substring(1);
                    cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                }
            })
        }
    }

    function w(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = [],
            a = (0, jt.isChatPeer)(t) && (n.data.closed || n.data.kicked),
            i = (0, jt.isChatPeer)(t) && !a && (0, Kt.isUserAdminInChat)(n, e.id);
        n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && r.push("clear"), (0, jt.isCommunityInterface)(e) && r.push("block"), (0, jt.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !(0, jt.isChatPeer)(t) && !(0, jt.isUserPeer)(t) || (0, jt.isCommunityInterface)(e) || (0, jt.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), (0, jt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), (0, jt.isChatPeer)(t) && !a && n.data.link && r.push("invite_link"), (0, jt.isChatPeer)(t) && !a && ((i || !(0, Kt.doesChatTabHaveFlag)(n, Kt.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE)) && r.push("topic", "avatar"), (i || !(0, Kt.doesChatTabHaveFlag)(n, Kt.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE)) && r.push("invite"), r.push("leave")), (0, jt.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), (0, jt.isChatPeer)(t) && n.pinned && (r.push((0, Wt.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), a || !i && (0, Kt.doesChatTabHaveFlag)(n, Kt.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN) || r.push("unpin"));
        var o = (0, jt.chatActions)(e);
        return e.curActions = r.sort(function(e, t) {
            return nn[e] - nn[t]
        }).reduce(function(e, t) {
            return e[t] = o[t], e
        }, {}), Promise.resolve(e)
    }

    function C(e, t, n) {
        var r = n.tabs[n.peer];
        return (0, Dt.post)(Dt.CONTROLLER, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Ot(e, 4),
                a = t[0],
                i = t[1],
                o = t[2],
                s = t[3];
            return r.allShown = o, n.admins = extend(n.admins, s), r.history = a + c(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
        })
    }

    function E(e) {
        var t = e.tabs[e.peer];
        return (0, Dt.post)(Dt.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Ot(n, 5),
                a = r[0],
                i = r[1],
                o = r[2];
            r[3], r[4];
            t.allShown = t.allShown || o, t.history = c(t.history) + a, t.historyToAppend = a;
            var s = Object.keys(i).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, i), e
        })
    }

    function k(e, t, n, r) {
        var a = e.tabs[t];
        return r === Nt.FLAG_OUTBOUND && a.out_up_to > n ? e : (r === Nt.FLAG_OUTBOUND ? a.out_up_to = n : a.in_up_to = n, e)
    }

    function T(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Ot(t, 3),
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

    function S(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Ot(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function I(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = (0, jt.setMessageError)(e, t, u(r.history))), Promise.resolve(n)
    }

    function A(e, t, n, r) {
        var a = r.tabs[e];
        return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = (0, jt.startResendMessage)(e, t, u(a.history))), Promise.resolve(r)
    }

    function M(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
            return !n && !$e(i)(t) || a && !a(i, e[i], t) || (e[i] = (0, Ft.arrayUnique)(r(e[i], i))), e
        }, e.dialog_tabs))
    }

    function L(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Ot(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function P(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            lt(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function O(e, t, n) {
        return (0, jt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function D(e, t) {
        var n = (0, Gt.getTab)(t, e.peerId);
        if ((0, jt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, jt.editAndReplaceMessage)(t, e, r)
        }
        n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
        var a = n && n.pinned && (0, Gt.parserMessage)(n.pinned);
        return a && a.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
    }

    function x(e, t) {
        var n = e.flags & Nt.FLAG_OUTBOUND,
            r = e.peerId;
        if ((0, jt.isTabLoaded)(t, r)) {
            var i = t.tabs[r];
            if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = a({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? R(t, 1, e.peerId) : (!i.unread && R(t, 1, e.peerId), i.unread++), P(e.peerId, t)), (0, jt.isFullyLoadedTab)(t, r)) {
                var o = u(i.history);
                i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, jt.appendToHistory)(t, e, o, !0, !0, !0), (0, qt.isOut)(e) && (i.blocked_community = 0, w(t))
            }
            return i.typing && i.typing[e.userId] && delete i.typing[e.userId], i.lastmsg = e.messageId, i.lastmsg_meta = e, h(e.peerId, t), M(t, i, !1, O.bind(null, r), tt.bind(null, t)), Promise.resolve(t)
        }
        return g(r, 0, 0, 0, t).then(function(t) {
            var a = t.tabs[r];
            return M(t, a, !1, O.bind(null, r), tt.bind(null, t)), h(e.peerId, t), n || P(e.peerId, t), t
        })
    }

    function R(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function N(e, t) {
        if ((0, jt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = k(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : (0, Gt.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && R(t, -1, e.peerId), !n.skipped) {
                var a = u(n.history);
                n.history = (0, jt.removewNewUnreadBarAndMerge)(t, a, e.peerId)
            }
        } else(0, jt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && R(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, jt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Ut.FOLDER_UNREAD] = t.dialog_tabs[Ut.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== Ut.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Ze(Ut.FOLDER_ALL, t)
    }

    function B(e, t) {
        var n = t.tabs[e.peerId];
        if ((0, jt.isTabLoaded)(t, e.peerId) && k(t, e.peerId, e.upToId, Nt.FLAG_OUTBOUND), (0, jt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.history = (0, jt.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function F(e, t, n, r, a) {
        return a.text = {}, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
    }

    function H(e, t, n) {
        function r(e, t) {
            return {
                id: e.messageId,
                text: e.text,
                date: e.date,
                kludges: e.kludges,
                authorName: t
            }
        }
        if (1 === e.length) {
            var i = e[0],
                o = (0, Gt.getMessage)(n, t, i),
                s = (0, Gt.getAuthorFullName)(n, t, i);
            return s === !1 ? n.set(Ie.bind(null, a({}, t, [o.userId]))).then(function(n) {
                var a = (0, Gt.getAuthorFullName)(n, t, i);
                return {
                    msgIds: e,
                    object: r(o, a)
                }
            }) : Promise.resolve({
                msgIds: e,
                object: r(o, s)
            })
        }
        return Promise.resolve({
            msgIds: e
        })
    }

    function j(e, t) {
        (0, jt.normalizeTabsGotFromServer)(t, e);
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var a = t.tabs[r] ? t.tabs[r].msgs : {},
                i = extend({}, a || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
    }

    function U(e, t, n, r) {
        var a = (0, Gt.getTab)(r, e);
        if (a) {
            var i = t !== !1 ? t == $t ? 2 : mobPlatforms[t] ? 1 : 0 : a.last_seen[2];
            a.online = t, a.last_seen = [t, n || a.last_seen[1], i]
        }
        return Promise.resolve(r)
    }

    function G(e, t, n) {
        var r = (0, Gt.getTab)(n, e);
        return r && (r.typing || (r.typing = {}), r.typing[t] = Date.now()), Promise.resolve(n)
    }

    function q(e, t, n) {
        return (0, Bt.pause)(Qt + 2).then(function() {
            if ((0, jt.isTabLoaded)(n, e)) {
                var r = n.tabs[e];
                if (r.typing) {
                    var a = Date.now() - (r.typing[t] || 0);
                    a >= 1e3 * Qt && delete r.typing[t]
                }
            }
            return n
        })
    }

    function z(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function V(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = (0, Ft.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function W(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function K(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function Y(e, t) {
        if ((0, jt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var a = n.msgs["rid" + e.randomId];
            a && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = (0, jt.replaceMessageAttrs)(t, u(n.history), e)
        }
        return Promise.resolve(t)
    }

    function Q(e, t) {
        return Promise.resolve()
    }

    function X(e, t) {
        var n = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return (0, Bt.retryFn)(Dt.post, 3, function(e) {
            return e * e
        })(Dt.CONTROLLER, n).then(function(n) {
            return $(e, n, t)
        })["catch"](function() {
            return $(e, null, t)
        })
    }

    function $(e, t, n) {
        var r = n.tabs[e.peerId];
        return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], Z(e, n)
    }

    function Z(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = (0, jt.replaceAttaches)(u(n.history), e, t), Promise.resolve(t)
    }

    function J(e, t, n) {
        var r = (0, jt.dayFromVal)(t),
            a = n.tabs[e];
        return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
    }

    function ee(e, t, n) {
        var r = n.tabs[t];
        return r.searchText = e, fe(t, n), n
    }

    function te(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function ne(e, t, n, r) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Ot(e, 3),
                n = t[0],
                a = t[1],
                i = t[2];
            return d(i, r), a.forEach(function(e) {
                return (0, zt.oCacheAdd)(r, e)
            }), j(n, r), Object.keys(n).sort(function(e, t) {
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

    function ae(e) {
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

    function ie(e) {
        return function(t, n) {
            return e(n).then(function(e) {
                var r = t ? e.search(t) : e.list,
                    a = r.map(ae);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(function(e) {
                    n.mapped_index[e.peerId] = e
                }), a
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
        var a = e.select(Ht.RECENT_SEARCH_OP);
        return (0, Bt.retryFn)(Dt.post, 1, function() {
            return 4
        })(Dt.CONTROLLER, {
            act: "a_dialogs_preload",
            rs: a.join(","),
            gid: t.gid
        })["catch"](function(e) {
            return [
                [],
                [],
                []
            ]
        }).then(function(e) {
            var a = Ot(e, 3),
                i = a[0],
                o = a[1],
                s = a[2];
            return t.popular_sugg = s, new vkIndexer(i, function(e) {
                return e[1]
            }, n), new vkIndexer(o, function(e) {
                return e[1]
            }, r), t
        })
    }

    function le(e) {
        var t = e.active_tab,
            n = void 0;
        return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
            return e.tabs[t].lastmsg
        })) : 0, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_dialogs",
            start_message_id: n,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Ot(n, 4),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3];
            return o.forEach(function(t) {
                return (0, zt.oCacheAdd)(e, t)
            }), d(s, e), j(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[t] = !a.has_more, Promise.resolve(e)
        })
    }

    function ue(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(n) {
            var r = Ot(n, 5),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3],
                l = r[4];
            return i.forEach(function(e) {
                return (0, zt.oCacheAdd)(t, e)
            }), (0, jt.normalizeTabsGotFromServer)(t, a), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = l), Object.keys(a).filter(function(e) {
                return !t.tabs[e]
            }).forEach(function(e) {
                t.tabs[e] = a[e]
            }), [a, o]
        })
    }

    function ce(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function de(e, t) {
        if (t.peer === e && (0, jt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function ge(e, t) {
        if ((0, jt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, Jt({
                st: ""
            }), en()
        }
        return Promise.resolve(t)
    }

    function me(e, t) {
        if ((0, jt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function fe(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function pe(e, t) {
        var n = t.tabs[e],
            r = "";
        if (fe(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
        var a = "in:" + e + " " + r + " " + (n.searchText || "");
        return Jt({
            st: n.searchText
        }), en(), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_search",
            q: a,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: n.searchOffset || 0
        }).then(function(e) {
            var t = Ot(e, 3),
                r = t[0],
                a = t[1],
                i = t[2];
            return n.searchOffset = a, n.searchAllLoaded = i, r
        })
    }

    function _e(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function he(e, t) {
        var n = (0, Gt.getTab)(e, t);
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(r) {
            var a = Ot(r, 2),
                i = a[0],
                o = a[1];
            n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
            var s = Ot(o, 3);
            n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[Ut.FOLDER_UNREAD] = e.get().dialog_tabs[Ut.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), M(e.get(), n, !1, O.bind(null, t), tt.bind(null, e.get()))
        })
    }

    function ve(e, t, n) {
        if ((0, jt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e
        }
        return Promise.resolve(n)
    }

    function be(e, t, n) {
        if ((0, jt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.history = (0, jt.removeMessages)(e, u(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            }), e.forEach(function(e) {
                var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(n)
    }

    function ye(e, t, n, r, a) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mark",
            peer: t,
            hash: n,
            gid: a,
            msgs_ids: e.join(","),
            mark: r
        })
    }

    function we(e, t, n, r) {
        if ((0, jt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = (0, jt.removeMessagesWithRestore)(e, t, n, u(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length
        }
        return Promise.resolve(r)
    }

    function Ce(e, t, n) {
        if ((0, jt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = (0, jt.restoreMessage)(e, t, u(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function Ee(e, t, n, r) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function ke(e, t, n) {
        return t && (n.pendingForward = null, e || (e = {
            msgIds: []
        }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
    }

    function Te(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function Se(e, t, n) {
        if ((0, jt.isTabLoaded)(n, e)) {
            n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, M(n, n.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), n.tabs[e].unread > 0 && R(n, -1, e);
            var r = n.tabs[e];
            r.deletedDialog = !0;
            var a = n.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return lt(a, !0, n), t.then(function(t) {
                var a = Ot(t, 2);
                a[0], a[1];
                return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
            })
        }
    }

    function Ie(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Ot(e, 1),
                r = n[0];
            return r.forEach(function(e) {
                return (0, zt.oCacheAdd)(t, e)
            }), t
        })
    }

    function Ae(e, t, n, r) {
        function a(e, t) {
            (0, jt.isChatPeer)(e) && t && !(0, zt.oCacheExists)(r, t) && (i[e] ? -1 === i[e].indexOf(t) && i[e].push(t) : i[e] = [t])
        }
        var i = {},
            o = t.filter(function(e) {
                return !(0, jt.isTabLoaded)(r, e.peerId)
            }).map(function(e) {
                return g(e.peerId, 0, 0, 0, r)
            });
        t.forEach(function(e) {
            (0, jt.isTabLoaded)(r, e.peerId) && a(e.peerId, e.userId)
        }), e.forEach(function(e) {
            a(e.peerId, +e.kludges.source_mid)
        });
        var s = t.filter(function(e) {
            return e.flags & Nt.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !r.admins[e]
        });
        return 0 === Object.keys(i).length && 0 === s.length && 0 === o.length ? Promise.resolve(r) : (n.pause(), Promise.all([Ie(i, r), L(s, r), Promise.all(o)])["catch"](function() {
            return r
        }).then(function() {
            return n.resume()
        }).then(function() {
            return r
        }))
    }

    function Me(e, t, n, r) {
        return t !== vk.id ? Promise.resolve(r) : ((0, jt.isTabLoaded)(r, n) && r.peer == n && (r = w(r)), Promise.resolve(r))
    }

    function Le(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, w(n)
    }

    function Pe(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function Oe(e, t, n, r) {
        if ((0, jt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            e.filter(function(e) {
                return a.msgs[e]
            }).forEach(function(e) {
                var i = (0, Gt.getMessage)(r, t, e),
                    o = n ? i.flags | Nt.FLAG_IMPORTANT : i.flags & ~Nt.FLAG_IMPORTANT;
                i.flags = o, a.msgs[e] = i, a.history = (0, jt.updateStar)(e, n, u(a.history))
            })
        }
        return Promise.resolve(r)
    }

    function De(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function xe(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function Re(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function Ne(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function Be(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function Fe(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function He(e, t, n) {
        return (0, Dt.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function je(e, t, n, r) {
        return r.creating = !0, r.longpoll.pause(), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_multi_start",
            hash: r.writeHash,
            peers: t.join(","),
            title: n
        }).then(function(e) {
            var t = Ot(e, 1),
                n = t[0];
            return r.next_peer = n.peerId, r.tabs[n.peerId] = n, M(r, n, !1, function(e) {
                return [n.peerId].concat(e)
            }), r.longpoll.resume(), r
        }).then(function(t) {
            return e ? He(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw r.creating = !1, r.longpoll.resume(), e
        })
    }

    function Ue(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            r = e.active_tab;
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: r,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var i = Ot(n, 5),
                o = i[0],
                s = i[1],
                l = i[2],
                c = i[3],
                d = i[4];
            s.forEach(function(t) {
                return (0, zt.oCacheAdd)(e, t)
            }), (0, jt.normalizeTabsGotFromServer)(e, o), l.user_unread && handlePageCount("msg", l.user_unread), (0, Ft.lplog)("Resync success", "success");
            var g = e.peer,
                m = void 0;
            if ((0, jt.isReservedPeer)(g)) m = Promise.resolve(!1);
            else {
                var f = {
                    tabs: a({}, g, e.tabs[g]),
                    oCache: {}
                };
                m = j(a({}, g, o[g]), f)
            }
            return m.then(function(n) {
                e.tabs = o, e.admins = extend(e.admins, c), n && (e.tabs[g] = n.tabs[g], e.tabs[g].history = (0, jt.restoreQueue)(g, e, u(e.tabs[g].history))), e.loadingDialogs = !1, e.mutedPeers = l.mutedPeers, e.lastDialogsOptions = {
                    has_more: l.has_more
                }, e.dialog_tab_cts = l.folder_cts, e.dialog_tabs[r] = d.map(intval);
                var a = e.dialog_tabs[r].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != r
                }).forEach(function(t) {
                    r == Ut.FOLDER_ALL ? e.dialog_tabs[t] = a.filter($e(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), We(intval(l.unread), e)
            })
        })["catch"](function(t) {
            return (0, Ft.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, Bt.pause)(2).then(Ue.bind(null, e))
        })
    }

    function Ge(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function qe(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function ze() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Ve(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || ze()
    }

    function We(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[Ut.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function Ke(e, t) {
        return t.ctrl_submit = !!e, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function Ye(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return (0, Yt.setDocumentTitle)(e ? e : document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e)(0, Yt.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var a = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + a + t + ".ico"), (0, Yt.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r)))
            }
        }
    }

    function Qe(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var i = Ye(r, a, n);
            n.update_title_to = setInterval(i, 1e3), i()
        } else !t && n.update_old_title && ((0, Yt.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function Xe(e, t, n, r, a) {
        return (0, jt.isFullyLoadedTab)(a, e) && (a.tabs[e].scrollTop = intval(t), a.tabs[e].scrollBottom = intval(n), a.tabs[e].contHeight = intval(r)), Promise.resolve(a)
    }

    function $e(e) {
        return e === Ut.FOLDER_ALL ? function() {
            return !0
        } : e === Ut.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & Ut.FOLDER_MASKS[e]
        }
    }

    function Ze(e, t) {
        t.active_tab = e, (0, xt.updateLocation)({
            tab: e === Ut.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== Ut.FOLDER_ALL && !(0, jt.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[Ut.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter($e(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return Promise.resolve(t)
    }

    function Je(e, t, n) {
        return e === Nt.SET_DIRECTORIES && n.folders & t ? !1 : e !== Nt.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function et(e, t, n) {
        return t !== Nt.RESET_DIRECTORIES || e.folders & Ut.FOLDER_MASKS[n] ? t === Nt.REPLACE_DIRECTORIES ? e.folders & Ut.FOLDER_MASKS[n] ? -1 : 1 : t === Nt.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function tt(e, t, n, r) {
        var a = e.dialog_tabs_all;
        if (a[Ut.FOLDER_ALL] || a[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var i = n.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return (0, jt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return i.length > 0 ? !0 : !1
    }

    function nt(e, t, n, r, a) {
        if ((0, jt.isTabLoaded)(a, e)) {
            var i = a.tabs[e];
            return n === Nt.REPLACE_DIRECTORIES && (t ^= i.folders), Je(n, t, i) && Object.keys(Ut.FOLDER_MASKS).filter(function(e) {
                return Ut.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                a.dialog_tab_cts[e] += et(i, n, e)
            }), n === Nt.SET_DIRECTORIES ? a.tabs[e].folders |= t : n === Nt.RESET_DIRECTORIES ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= i.folders, M(a, a.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return a.tabs[e]
                }).filter($e(n)).map(function(e) {
                    return e.peerId
                })
            }, tt.bind(null, a)), Promise.resolve(a)
        }
        return g(e, 0, 0, 0, a).then(nt.bind(null, e, t, n, a))
    }

    function rt(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function at(e, t) {
        return d(a({}, e, {
            free: !0
        }), t), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function it(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function ot(e, t, n, r) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, M(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function st(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function lt(e, t, n) {
        return n.tabbedPeers = e, (0, jt.isClassicInterface)(n) && (Jt({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return (0, jt.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(jt.convertPeerToUrl).join("_")
        }), t && en()), Promise.resolve(n)
    }

    function ut(e) {
        return e.peer ? de(e.peer, e) ? ce(e.peer, e) : (0, jt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function ct(e, t) {
        var n = t.tabs[e];
        return (0, jt.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function dt(e, t) {
        var n = t.tabs[e];
        return (0, jt.isFullyLoadedTab)(t, e) && (n.history = c(n.history)), Promise.resolve(t)
    }

    function gt(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function mt(e, t, n) {
        if (!(0, jt.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = (0, Gt.getTab)(n, t);
        return r.blocked_community = !e, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return w(n)
        })
    }

    function ft(e, t) {
        if (0 !== t.peer && (0, jt.isFullyLoadedTab)(t, t.peer)) {
            var n = (0, Gt.getTab)(t, t.peer);
            n.history = u(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function pt(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function _t(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function ht(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function vt(e) {
        Jt({
            act: e ? "create" : null
        }), en()
    }

    function bt() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        Jt({
            q: e
        }), en()
    }

    function yt(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, jt.getClassicChatHeight)() > window.clientHeight() && (0, jt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function wt(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_join_chat",
            chat_id: e,
            hash: t,
            write_hash: n.writeHash
        }).then(function(e) {
            var t = Ot(e, 4),
                r = t[0],
                a = t[1],
                i = t[2],
                o = t[3];
            return i.forEach(function(e) {
                return (0, zt.oCacheAdd)(n, e)
            }), n.tabs[r] = a, M(n, a, !1, O.bind(null, r), tt.bind(null, n)), n.admins = extend(n.admins, o), [r]
        })
    }

    function Ct(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_reset_link",
            chat_id: e,
            write_hash: t.writeHash
        })
    }

    function Et(e) {
        return tn({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function kt(e, t) {
        var n = (0, Ft.arrayUnique)([e].concat(t.select(Ht.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Ht.RECENT_SEARCH_OP, n)
    }

    function Tt(e) {
        e.update(Ht.RECENT_SEARCH_OP, [])
    }

    function St(e, t) {
        var n = t.select(Ht.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Ht.RECENT_SEARCH_OP, n), n
    }

    function It(e, t, n) {
        var r = n.tabs[t],
            a = (0, Gt.getMessage)(n, t, e);
        return r.data.kicked || r.data.closed || a.kludges.source_act || (r.pinned = a), Promise.resolve(n)
    }

    function At(e, t) {
        var n = t.tabs[e];
        return n.pinned = null, Promise.resolve(t)
    }

    function Mt(e, t, n, r) {
        var i = (0, Gt.getMessage)(e, n, t),
            o = i.userId;
        return (0, zt.oCacheGet)(r, o) ? Promise.resolve(r) : Ie(a({}, n, [o]), r)
    }

    function Lt() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }

    function Pt() {
        cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.loadChatInfo = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var Ot = function() {
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
    t.strHistory = c, t.updateBlockStates = d, t.loadPeer = g, t.restoreHistoryQueue = m, t.removeFailed = f, t.selectPeer = _, t.selectPeerOnMessage = v, t.changePeer = b, t.updateMentions = y, t.setActions = w, t.loadMoreHistory = C, t.loadLessHistory = E, t.loadLongPollKey = T, t.loadLongPollTs = S, t.setMessageErrored = I, t.resendMessage = A, t.loadAdmins = L, t.editMessage = D, t.addMessage = x, t.markInboundMessagesAsRead = N, t.markOutboundMessagesAsRead = B, t.initTextStore = F, t.processFwd = H, t.mergeTabs = j, t.updateOnline = U, t.setTyping = G, t.waitTyping = q, t.addSelection = V, t.cleanSelected = W, t.dropSelection = K, t.replaceMessage = Y, t.saveMedia = Q, t.loadMedia = X, t.addAttachmentsToStoreData = $, t.replaceMediaAttachesStore = Z, t.setCurrentSearchDate = J, t.setInplaceSearch = ee, t.setCurrentSearch = te, t.searchHints = ne, t.searchHintsIndex = re, t.localIndexToDialog = ae, t.preloadSearchIndex = oe, t.loadDialogs = le, t.searchMessages = ue, t.isSearchAllLoaded = ce, t.isSearchingInplace = de, t.cancelSearch = ge, t.clearDate = me, t.searchInplaceStart = fe, t.searchMessagesInplace = pe, t.loadImportant = _e, t.loadActualLastMessage = he, t.removeMessagesMarkDeleted = ve, t.removeMessages = be, t.removeMessageSend = ye, t.removeMessagesWithRestore = we, t.restoreMessage = Ce, t.restoreMessageSend = Ee, t.forwardMessages = ke, t.prepareForward = Te, t.deletedDialog = Se, t.loadChatMember = Ie, t.checkNewPeople = Ae, t.updateActions = Me, t.setMutedPeer = Le, t.setExecStack = Pe, t.updateFavMessage = Oe, t.updateImportant = De, t.loadSpam = xe, t.flushSpam = Re, t.setCreationType = Ne, t.getOwnerPhoto = Be, t.presetAvatar = Fe, t.setChatPhoto = He, t.createChat = je, t.resync = Ue, t.toggleSendingAbility = Ge, t.setDelayedMessage = qe, t.isAnythingLoading = Ve, t.updateUnreadCount = We, t.changeSubmitSettings = Ke, t.updateFavAndTitle = Qe, t.saveHistoryScroll = Xe, t.filterFromTab = $e, t.changeDialogsTab = Ze, t.updateFolderState = nt, t.getMutexQueue = rt, t.releaseBlock = at, t.toggleCommunityMute = it, t.restoreDialog = ot, t.spamDialog = st, t.updateTabbedPeers = lt, t.isEverythingLoaded = ut, t.cleanTab = ct, t.stringifyTab = dt, t.updateGoToEndVisibility = gt, t.toggleCommunityMessages = mt, t.updateHistory = ft, t.startRecording = pt, t.cancelRecording = _t, t.setVoiceMessageAvail = ht, t.toggleConversation = vt, t.updateSearchQuery = bt, t.initializeChatResize = yt, t.joinChat = wt, t.resetInviteLink = Ct, t.leaveInvitation = Et, t.saveRecentSearchPeer = kt, t.resetRecentSearch = Tt, t.removeFromRecentSearch = St, t.pinMessageOptimistic = It, t.unpinMessageOptimistic = At, t.checkChatMember = Mt, t.hidePromoTooltip = Lt, t.videoAutoPlayHandler = Pt;
    var Dt = n(136),
        xt = n(202),
        Rt = n(55),
        Nt = r(Rt),
        Bt = n(246),
        Ft = n(244),
        Ht = n(32),
        jt = n(160),
        Ut = n(188),
        Gt = n(144),
        qt = n(214),
        zt = n(175),
        Vt = n(130),
        Wt = n(207),
        Kt = n(8),
        Yt = n(33),
        Qt = t.TYPING_PERIOD = 5,
        Xt = 2e4,
        $t = 8,
        Zt = (0, xt.updateLazyLocation)(),
        Jt = Zt.scheduleNav,
        en = Zt.commitNav,
        tn = Zt.scheduleNavWithTimeOut,
        nn = t.ACTION_PRIORITIES = {
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
    t.readLastMessages = l(function(e, t) {
        var n = t.tabs[e],
            r = Object.keys(n.msgs).map(function(n) {
                return (0, Gt.getMessage)(t, e, n)
            }).filter(function(e) {
                return !(0, qt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return n.skipped > 0 && (r = r.filter(function(e) {
            return intval(e) <= n.lastmsg - n.skipped
        })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Nt.readInboundEvent([6, e, r])]), (0, Dt.post)(Dt.CONTROLLER, {
            peer: e,
            ids: [r],
            hash: n.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return k(t, e, r, Nt.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = l(function(e, t, n) {
        var r = Date.now() + rand(0, 100).toFixed(0),
            a = n.tabs[e];
        return (0, Bt.retryFn)(Dt.post, 1)(Dt.CONTROLLER, {
            act: "a_send",
            to: e,
            hash: a.hash,
            msg: t.message,
            media: z(t.attaches),
            guid: r,
            share_url: t.share_url,
            random_id: t.rid,
            gid: n.gid,
            sticker_referrer: t.sticker_referrer
        }, Xt).then(function(e) {
            var t = Ot(e, 1),
                r = t[0];
            return n.version !== r.version && nav.reload({
                force: !0
            }), n
        })
    }), t.deliverEditedMessage = l(function(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_edit_message",
            hash: e.hash,
            id: t.messageId,
            peerId: e.peerId,
            gid: n.gid,
            msg: t.origText,
            media: z(t.attaches),
            share_url: t.share_url
        }, Xt).then(function(e) {
            var t = Ot(e, 1);
            t[0];
            return n
        })
    }), t.searchTopConv = ie(function(e) {
        return e.topConvTree
    }), t.searchLocalHints = ie(function(e) {
        return e.hintsTree
    }), t.sendTyping = l(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(e) {
            return t
        }, function(e) {
            return t
        })
    }), t.flushHistory = l(function(e, t) {
        return Se(e, (0, Dt.post)("al_im.php", {
            act: "a_flush_history",
            id: e,
            from: "im",
            gid: t.gid,
            hash: t.tabs[e].hash
        }), t)
    }), t.updateChatTopic = l(function(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_set_chat_title",
            peer: e,
            new_title: t,
            hash: n.tabs[e].hash
        }).then(function() {
            return n
        })
    }), t.loadChatInfo = l(function(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_load_chat_info",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            var r = Ot(n, 1),
                a = r[0];
            return t.tabs[e] = extend(t.tabs[e], a), t
        })
    }), t.addNewMember = l(function(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_add_chat_members",
            peer: e,
            new_peer: t.join(","),
            hash: n.tabs[e].hash
        }).then(function() {
            return n
        })
    }), t.updateChatPhoto = l(function(e, t) {
        return e.kludges.source_act === jt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, Promise.resolve(t)) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(n) {
            var r = Ot(n, 2),
                a = r[0],
                i = r[1];
            t.chat_photo_msg = i;
            var o = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = a, (0, jt.isFullyLoadedTab)(t, e.peerId)) {
                var s = e.kludges.source_act;
                o.history = (0, jt.addChatPhotoToUpdate)(e, s, t, u(o.history))
            }
            return t
        })
    }), t.leaveChat = l(function(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Me.bind(null, jt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = l(function(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Me.bind(null, jt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = l(function(e, t, n) {
        return (0, Dt.post)(Dt.CONTROLLER, {
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
        }).then(Le.bind(null, e, t))
    }), t.favMessage = l(function(e, t, n, r) {
        return Oe(e, n, t, r), (0, Dt.post)(Dt.CONTROLLER, {
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
    }), t.toggleDialogImportant = l(function(e, t) {
        var n = Ut.FOLDER_MASKS[Ut.FOLDER_IMPORTANT],
            r = t.tabs[e].folders & n,
            a = r ? Nt.resetDirectoriesEvent : Nt.setDirectoriesEvent;
        return t.longpoll.push([a([0, e, n, !0])]), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_dialog_star",
            val: r ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = l(function(e, t, n) {
        var r = Ut.FOLDER_MASKS[Ut.FOLDER_UNRESPOND];
        return n.longpoll.push([Nt.resetDirectoriesEvent([0, e, r, !0]), Nt.readInboundEvent([6, e, t])]), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: n.tabs[e].hash,
            gid: n.gid
        }).then(function() {
            return n
        })
    }), t.deleteDialog = l(function(e, t) {
        return M(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), t.tabs[e].deletedDialog = !0, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            return n[0] ? (lt(t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, M(t, t.tabs[e], !1, O.bind(null, e), tt.bind(null, t))), n
        })
    }), t.pinMessage = l(function(e, t, n) {
        var r = n.tabs[t];
        return r.data.kicked || r.data.closed ? Promise.resolve(n) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_pin_message",
            msgid: e,
            chat: t,
            hash: n.tabs[t].hash
        }).then(function(e) {
            var a = Ot(e, 1),
                i = a[0];
            return n.tabs[t] = Object.assign({}, r, i), n
        })
    }), t.unpinMessage = l(function(e, t) {
        var n = t.tabs[e];
        return n.data.kicked || n.data.closed ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_unpin_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(r) {
            var a = Ot(r, 1),
                i = a[0];
            return t.tabs[e] = Object.assign({}, n, i), t
        })
    }), t.getPinnedMessage = l(function(e, t) {
        var n = t.tabs[e];
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_pinned_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(e) {
            var r = Ot(e, 1),
                a = r[0];
            return n.pinned = a || null, t
        })
    }), t.getMessageLocalId = l(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_message_local_id",
            chat: e,
            chat_local_id: t,
            hash: r.hash
        })
    })
}, , , , function(e, t, n) {
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

    function i(e, t, n, r, a) {
        var i = a.reduce(function(e, t) {
            return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
        }, {});
        Object.keys(i).forEach(function(a) {
            var o = i[a];
            e.set(oe.removeMessages.bind(null, o, a)).then(function() {
                return e.set(oe.removeMessagesMarkDeleted.bind(null, o, a))
            }).then(function() {
                return t.removeMessages(o, +a, e)
            }).then(function() {
                var i = (0, ie.getTab)(e, a),
                    s = i && o.some(function(e) {
                        return e >= i.lastmsg
                    });
                s && (0, oe.loadActualLastMessage)(e, a).then(function() {
                    n.promoteDialog(e, a), r.updateCounter(e, a), t.updateGoToEnd(e, !0)
                })
            })
        })
    }

    function o(e, t, n, r) {
        t.set(oe.updateChatPhoto.bind(null, e)).then(function() {
            var a = e.kludges.source_act;
            n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
        })
    }

    function s(e, t) {
        "spam" === t ? (0, se.showSpamLayer)(e, ee.mount, {}) : "fav" === t && (0, se.showFavvedBox)(e, {}, ue.mount, {})
    }

    function l(e, t) {
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

    function u(e, t, n, r) {
        e.set(oe.cancelRecording).then(function(e) {
            n.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(r, "im-page_history-show"), n.stopLoading(), (0, ie.isAnyMessageBeingEdited)(e) && n.cancelEditing();
        var a = e.get().peer;
        e.set(oe.changePeer.bind(null, 0, !1)).then(function() {
            window.tooltips && window.tooltips.hideAll(), w(), (0, se.isClassicInterface)(e) && t.activate(), n.changePeer(e), (0, se.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(function() {
                e.get().longpoll.push([Z.transitionEvent("search")])
            }, 13), (0, se.isLocksAvailable)(e) && (0, se.isPeerBlockedByMe)(a, e) && e.set(oe.releaseBlock.bind(null, a))
        })
    }

    function c(e, t, n, r, a) {
        e.forEach(function(e) {
            var a = e.kludges.source_act;
            switch (a) {
                case se.CHAT_PHOTO_REMOVE:
                case se.CHAT_PHOTO_UPDATE:
                    o(e, t, n, r)
            }
        })
    }

    function d(e, t) {
        return 2e9 > t && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
    }

    function g(e, t) {
        var n = t.flags & Z.FLAG_OUTBOUND,
            r = inArray(t.peerId, e.get().mutedPeers),
            a = t.flags & Z.FLAG_DELETED,
            i = e.get().gid;
        if (!n && !r && !a) {
            var o = d(t.subject, t.peerId) || "",
                s = (o ? o + " " : "") + t.text || "",
                l = t.userId,
                u = t.peerId,
                c = void 0,
                g = void 0,
                m = e.get().tabs[u];
            if (t.kludges && t.kludges.source_act && (s = stripHTML((0, se.renderServiceMsg)(e, t, m, !1))), (!e.get().notify_msg && !(0, se.isChatPeer)(u) || i && !e.get().mute) && window.Notifier && Notifier.playSound({
                    author_id: u
                }), !(0, se.isChatPeer)(u)) return;
            s = trim(replaceEntities(stripHTML(s.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), s = (0, K.replaceMentions)(s, function(e, t, n, r, a) {
                return a
            }), (0, se.isChatPeer)(u) ? (c = (0, de.oCacheGet)(e, l).name, m.tab && (c += " » " + m.tab), g = (0, de.oCacheGet)(e, l).photo) : (c = m.tab, g = m.photo);
            var f = t.attaches[0];
            if (f && "mail" === f.type) s += "\n[" + getLang("mail_added_msgs") + "]";
            else if (f) {
                var p = "doc" === f.type && "graffiti" === f.kind ? "graffiti" : f.type;
                s += "\n[" + getLang("mail_added_" + p) + "]"
            }
            c = trim(replaceEntities(stripHTML((c || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                id: t.messageId,
                text: s,
                author_id: u,
                title: c,
                author_photo: g
            })
        }
    }

    function m(e, t) {
        var n = e.get().longpoll.push.bind(null, [Z.resetPeer()]),
            r = function a() {
                var r = e.get().selectedMessages;
                r && r.length ? (e.setState({
                    selectedMessages: []
                }).then(function() {
                    t.changedMessageSelection(e), t.cleanSelection(r)
                }), setTimeout(function() {
                    return cancelStackPush("im_peer", a)
                }, 0)) : n()
            };
        cancelStackPush("im_peer", r)
    }

    function f(e) {
        e.set(oe.leaveInvitation)
    }

    function p(e, t) {
        var n = e.get().tabs[t.peerId],
            r = e.get().active_tab;
        return r === le.FOLDER_ALL ? !0 : (0, oe.filterFromTab)(r)(n)
    }

    function _(e) {
        var t = e.attaches.filter(function(e) {
            return "sticker" !== e.type
        });
        return (0, se.isServiceMsg)(e) || 0 === t.length
    }

    function h(e, t, n) {
        addClass(n, "im-page_history-show"), t.loadingPeer(e)
    }

    function v(e, t) {
        (0, se.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(oe.forwardMessages.bind(null, e.get().pendingForward, (0, ie.getTabDraft)((0, ie.getTab)(e, t)))))
    }

    function b(e, t) {
        var n = document.querySelector(ke),
            r = (0, se.isCommunityInterface)(e) ? we : Ce,
            a = n ? n.offsetHeight : 0;
        return r += Ee, r += a, Math.floor((t.offsetHeight - r) / ve)
    }

    function y(e, t) {
        var n = b(e, t);
        if (e.get().tabbedPeers.length > n) {
            var r = e.get().tabbedPeers.filter(function(t) {
                    var n = t.peer;
                    return intval(n) !== e.get().peer
                }),
                a = r.map(function(t) {
                    var n = t.peer;
                    return e.get().tabs[n]
                }),
                i = a.sort(function(e, t) {
                    return t.last_touched - e.last_touched
                }),
                o = [];
            0 !== e.get().peer && o.push(e.get().tabs[e.get().peer]);
            var s = o.concat(i).slice(n).map(function(e) {
                    return e.peerId
                }),
                l = e.get().tabbedPeers.filter(function(e) {
                    return !inArray(e.peer, s)
                });
            return e.set(oe.updateTabbedPeers.bind(null, l, !0))
        }
        return Promise.resolve(e)
    }

    function w() {
        for (var e = curBox(); e;) e.hide(), e = curBox()
    }

    function C(e, t, n, r, a, i, o, s, l) {
        e.get().audio_msg.isRecording && e.set(oe.cancelRecording).then(function() {
            r.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.forward && r.hideFwd(e), (0, ie.isAnyMessageBeingEdited)(e) && r.cancelEditing(), (0, ie.isSearching)(e) && t.cancelSearch && (a.clearSearch(e), n.restoreDialogs(e)), E(e, s, l), h(e, r, i);
        var u = e.get().peer;
        (0, oe.updateMentions)(e.get()), (0, oe.videoAutoPlayHandler)(), (0, se.isFullyLoadedTab)(e, t.peerId) && (t.msgid && !(0, ie.getMessage)(e, t.peerId, t.msgid) || !t.msgid && !(0, ie.getMessage)(e, t.peerId, (0, ie.getTab)(e, t.peerId).lastmsg) || (0, ie.getTab)(e, t.peerId).skipped) && e.mutate(function(e) {
            return (0, ie.makeTabNotFullyLoaded)(e, t.peerId)
        });
        var c = e.set(oe.changePeer.bind(null, t.peerId, t.msgid)).then(function(e) {
            var n = e.get(),
                r = oe.loadPeer.bind(null, t.peerId, !1, t.msgid, !1, n);
            return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
        }).then(function() {
            n.selectPeer(t.msgid, e), v(e, e.get().peer), window.tooltips && tooltips.hideAll(), w(), r.preparePeer(e), m(e, r), (0, se.isClassicInterface)(e) && (n.deactivate(), y(e, i).then(function() {
                return o.updateMenu(e)
            }))
        });
        return c = t.msgid ? c.then(function() {
            return e.set(oe.selectPeerOnMessage.bind(null, t.peerId === u, u))
        }) : c.then(function() {
            return e.set(oe.selectPeer.bind(null, !0))
        }), c.then(function() {
            if (e.get().peer === t.peerId) {
                if (t.forward) {
                    var n = e.get().tabs[e.get().peer];
                    !n.scrollBottom && n.unread && e.set(oe.readLastMessages.bind(null, e.get().peer))
                }(0, se.isClassicInterface)(e) && o.updateMenu(e), r.changePeer(e, !1), r.updateTyping(t.peerId, e), (0, oe.updateMentions)(e.get())
            }
        })["catch"](function(e) {
            return (0, me.imWeirdCatch)("applyNewPeer", e)
        })
    }

    function E(e, t, n) {
        t && e.get().shown && (t.hide(e), n().createCanceled(e))
    }

    function k(e, t, n) {
        (0, ie.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
    }

    function T(e, t, n, r, a, i, o) {
        (0, se.isClassicInterface)(e) && (a.saveScroll(e), i.saveScroll(e)), r.rotateCross(e), addClass(o, "im-page_creating"), e.setState({
            isCreating: !0
        }), n && n.show(e, t), (0, se.isClassicInterface)(e) && (setStyle(o, {
            height: P(o, e).page
        }), setTimeout(function() {
            addClass(o, "im-page_cropped")
        }, 200)), (0, oe.toggleConversation)(!0)
    }

    function S(e, t, n, r) {
        n && n.hide(e, t)
    }

    function I(e) {
        for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== Z.UNREAD_COUNT || t ? e[n].type === Z.UNREAD_COUNT && e.splice(n, 1) : t = !0;
        return e
    }

    function A(e, t, n, r, a) {
        r.updateChatTopic(t, e), (0, se.isClassicInterface)(e) && a.updateName(t, e), e.get().peer == t && ((0, oe.setActions)(e.get()), r.updateActions(e))
    }

    function M(e, t, n, r, i, o, d, m, v, b, w, M, L, P, O, D, x, R, N, F) {
        return {
            changePeer: function(e, n) {
                t.selectPeer(e, n)
            },
            cancelSearch: function(e) {
                k(e, r, t)
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
                T(e, a, b, r, t, n, i)
            },
            updateState: function(e, r) {
                t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
            },
            appendFastDialogs: function(e, n) {
                t.appendFastDialogs(e, n, !0)
            },
            createCanceled: function(e, a) {
                r.createCanceled(e, a), (0, se.isClassicInterface)(e) ? (setStyle(i, {
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
                D && D.updateMenu(e)
            },
            hideFwd: function(e) {
                n.hideFwd(e)
            },
            updateDialog: function(e, n) {
                t.updateDialog(e, n)
            },
            focusTxt: function(e) {
                n.focustTxt(e)
            },
            resync: function(e) {
                (0, ie.isSearching)(e) && r.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), b && b.hide(e), (0, se.isCommunityInterface)(e) && l(e, i), (0, se.isClassicInterface)(e) && e.get().tabbedPeers.forEach(function(t) {
                    var n = t.peer;
                    D.updateCounter(e, n), D.updateName(n, e)
                }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), (0, se.isReservedPeer)(e.get().peer) || n.changePeer(e, !1);
                var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                handlePageCount(a, e.get().unread_cnt)
            },
            toggleSettingsLoader: function(e, t) {
                w.toggleLoader(e, t)
            },
            onUserActions: function(e, t) {
                if (!(0, oe.isSearchingInplace)(e.get().peer, e.get())) {
                    var r = e.get(),
                        a = r.peer;
                    if ((0, se.isFullyLoadedTab)(r, a) && !o.is_idle) {
                        var i = (0, ie.countUnread)(e.get().peer, e.get());
                        if (i > 0) {
                            var s = r.tabs[a];
                            !s.skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(oe.readLastMessages.bind(null, a)))
                        }
                    }
                }
            },
            removeSelection: function(e) {
                t.removeSelection(e), r.focusInput(e)
            },
            route: function(e, a, o, l) {
                if ("undefined" != typeof e[0]) return !0;
                e.box && (e = {
                    box: e.box
                });
                var u = !1;
                return e.invite_chat_id && o.invite_hash ? !0 : (l && l.params && "left_nav" === l.params._ref && "undefined" == typeof e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(function(e) {
                    switch (e) {
                        case "sel":
                            o.q || (u = !0);
                            var c = o.sel ? (0, se.unUrlPeer)(o.sel) : 0,
                                d = l.back;
                            0 === c ? M.get().longpoll.push([Z.resetPeer(!1, d)]) : c !== M.get().peer && M.get().longpoll.push([Z.changePeer(c, o.msgid || !1)]);
                            break;
                        case "invite_chat_id":
                        case "invite_hash":
                            f(M);
                            break;
                        case "tab":
                            E(M, b, v), u = !0;
                            var g = o.tab || le.FOLDER_ALL;
                            M.get().longpoll.push([Z.changeTab(g)]);
                            break;
                        case "act":
                            o.act && "create" === o.act ? T(M, [], b, r, t, n, i) : S(M, [], b, i);
                            break;
                        case "st":
                            o.st && o.sel ? (curBox() && curBox().hide(), M.mutate(oe.setInplaceSearch.bind(null, unescape(o.st), o.sel)), n.startSearch(M)) : (M.mutate(oe.cancelSearch.bind(null, a.sel)), n.cancelSearch(M, !0));
                            break;
                        case "q":
                            o.q ? (curBox() && curBox().hide(), r.setSearch(M, o.q, !0)) : r.clearSearch(M);
                            break;
                        case "box":
                            s(M, o.box)
                    }
                }), (0, se.isClassicInterface)(M) && "undefined" == typeof e.sel && D.updateMenu(M), u && k(M, r, t), !1)
            },
            updateDialogFilters: function(e) {
                (0, ie.isSearching)(e) || t.restoreDialogs(e), w.updateFilter(e)
            },
            removePeer: function(e, n) {
                t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([Z.resetPeer()]), (0, se.isClassicInterface)(e) && D.updateMenu(e)
            },
            newMessage: function(e) {
                (0, se.isClassicInterface)(e) || t.scrollUp(!0)
            },
            onEvents: function(e, o) {
                var s = I(o.filter(function(e) {
                        return e.type !== Z.ADD_MESSAGE || !(e.flags & Z.FLAG_STEALTH)
                    })),
                    f = o.filter(se.isServiceMsg),
                    h = o.filter(function(e) {
                        return e.type === Z.ADD_MESSAGE
                    });
                c(f, e, t, n, D), e.set(oe.checkNewPeople.bind(null, f, h, d)).then(function() {
                    s.forEach(function(o) {
                        switch (o.type) {
                            case Z.ADD_MESSAGE:
                                var s = e.get().tabs[e.get().peer],
                                    c = !s || !s.msgs || 0 == s.msgs.length,
                                    d = (0, se.isDuplicate)(o, e.get()),
                                    f = (0, ie.isCommunityBlocked)(e, o.peerId);
                                if (0 === d) {
                                    o.flags & Z.FLAG_OUTBOUND || e.set(oe.updateFavAndTitle.bind(null, o.peerId, !0)), e.set(oe.addMessage.bind(null, o)), y(e, i), p(e, o) && (g(e, o), t.updateTyping(o.peerId, e), (0, ie.isSearching)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId));
                                    var h = (0, ie.isCommunityBlocked)(e, o.peerId);
                                    h === !1 && f === !0 && n.updateActions(e), (0, se.isClassicInterface)(e) && (D.updateCounter(e, o.peerId), D.updateMenu(e)), n.updateTyping(o.peerId, e), n.addMessage(e, o), (0, se.isClassicInterface)(e) || w.updateFilter(e), _(o) || !(0, se.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o), (0, oe.videoAutoPlayHandler)()
                                    })
                                } else 2 === d ? (_(o) || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                    n.replaceAttachmentPlaceholders(e, o)
                                }), e.set(oe.replaceMessage.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e)) : (0, ie.isSearching)(e) || t.promoteDialog(e, o.peerId);
                                s && c && F();
                                break;
                            case Z.EDIT_MESSAGE:
                                e.set(oe.editMessage.bind(null, o)).then(function(e) {
                                    t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), _(o) || !(0, se.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    })
                                });
                                break;
                            case Z.READ_INBOUND:
                                e.set(oe.markInboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), (0, se.isClassicInterface)(e) && D.updateCounter(e, o.peerId), (0, ie.isSearching)(e) || t.restoreDialogs(e), w.updateFilter(e)
                                });
                                break;
                            case Z.READ_OUTBOUND:
                                e.set(oe.markOutboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                });
                                break;
                            case Z.UNREAD_COUNT:
                                e.set(oe.updateUnreadCount.bind(null, o.count)).then(function() {
                                    var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                    handlePageCount(t, o.count), w.updateFilter(e), (0, se.isClassicInterface)(e) && l(e, i)
                                });
                                break;
                            case Z.GOT_ONLINE:
                            case Z.GOT_OFFLINE:
                                var E = o.type === Z.GOT_ONLINE;
                                e.set(oe.updateOnline.bind(null, o.userId, E ? o.platform : !1, o.lastSeenTs)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                });
                                break;
                            case Z.SET_FLAGS:
                            case Z.RESET_FLAGS:
                                if (o.flags & Z.FLAG_DELETED && o.type === Z.SET_FLAGS && !(0, se.isAlreadyDeleted)(e, o.peerId, o.messageId) && !e.get().blockedFlagUpdates[o.peerId] && m(o), o.flags === Z.FLAG_IMPORTANT) {
                                    var T = o.type === Z.SET_FLAGS;
                                    e.set(oe.updateImportant.bind(null, T ? 1 : -1, o.messageId)).then(function() {
                                        (0, se.isClassicInterface)(e) || r.updateImportantCnt(e)
                                    }), e.set(oe.updateFavMessage.bind(null, [o.messageId], o.peerId, T)).then(function(t) {
                                        n.markImportant(o.messageId, T, e)
                                    })
                                }
                                break;
                            case Z.TYPING:
                                (0, se.isSelfMessage)(o.peerId, e.get().gid) || (e.set(oe.setTyping.bind(null, o.peerId, o.userId)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }), e.set(oe.waitTyping.bind(null, o.peerId, o.userId)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }));
                                break;
                            case Z.NOTIFY_SETTINGS_CHANGED:
                                B(e, v, o.peerId, 0 !== o.disabledUntil);
                                break;
                            case Z.RESYNC:
                                e.get().longpoll.pause(), e.set(oe.resync).then(v().resync).then(function() {
                                    return e.get().longpoll.resume()
                                });
                                break;
                            case Z.TRANSITION:
                                L.transition(o.state);
                                break;
                            case Z.RESET_PEER:
                                if (o.removeActivePeer) {
                                    var S = e.get().tabbedPeers.filter(function(t) {
                                        var n = t.peer,
                                            r = t.type;
                                        return n !== e.get().peer && "perm" === r
                                    });
                                    e.setState({
                                        tabbedPeers: S
                                    })
                                }
                                u(e, t, n, i), o.cancelSearch && k(e, r, t), (0, se.isClassicInterface)(e) && D.updateMenu(e), r.focusInput(e);
                                break;
                            case Z.CHANGE_TAB:
                                (0, se.changeTab)(o.tab, e, v, oe.changeDialogsTab).then(function(e) {
                                    w.updateFilter(e)
                                });
                                break;
                            case Z.RESET_DIRECTORIES:
                            case Z.SET_DIRECTORIES:
                            case Z.REPLACE_DIRECTORIES:
                                e.set(oe.updateFolderState.bind(null, o.peerId, o.mask, o.type, o.local)).then(function(e) {
                                    (0, ie.isSearching)(e) || o.type === Z.RESET_DIRECTORIES && o.mask === Z.FOLDER_IMPORTANT || o.type === Z.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(o.peerId, e), l(e, i), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                });
                                break;
                            case Z.DELETE_DIALOG:
                                e.set(oe.deletedDialog.bind(null, o.peerId, Promise.resolve([]))).then(function() {
                                    v().removePeer(e, o.peerId), v().updateDialogFilters(e)
                                });
                                break;
                            case Z.CHANGE_PEER:
                                C(e, o, t, n, r, i, D, b, v);
                                break;
                            case Z.MUTEX:
                                var I = a({}, o.peerId, o),
                                    A = (0, se.isPeerBlocked)(o.peerId, e);
                                e.set(oe.updateBlockStates.bind(null, I)).then(function() {
                                    t.updateDialog(o.peerId, e);
                                    var r = (0, se.isPeerBlocked)(o.peerId, e);
                                    (0, se.isFullyLoadedTab)(e.get(), o.peerId) && A !== r && n.updateChat(e, o.peerId)
                                });
                                break;
                            case Z.FAILED_MESSAGE:
                                e.set(oe.setMessageErrored.bind(null, o.peer, o.message)).then(function() {
                                    n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                });
                                break;
                            case Z.RESEND:
                                var M = o.message.messageId;
                                e.set(oe.resendMessage.bind(null, o.peerId, M, o.message)).then(function() {
                                    n.resendMessage(o.peerId, M), t.promoteDialog(e, o.peerId)
                                });
                                break;
                            case Z.CONVERSATION_UPDATED:
                                if ((0, se.isTabLoaded)(e.get(), o.peerId)) {
                                    var P = (0, fe.handleEventChatUpdated)(e, o.peerId, o.updateType, o.intVector, n, t);
                                    P || v().reloadChatInfo(o.peerId)
                                }
                        }
                    })
                })
            },
            updateHistory: function(e) {
                return n.updateHistory(e)
            },
            reloadChatInfo: function(e) {
                (0, se.isTabLoaded)(M.get(), e) && M.set(oe.loadChatInfo.bind(null, e)).then(function() {
                    return A(M, e, t, n, D)
                })
            },
            cancelRecording: function() {
                return M.set(oe.cancelRecording).then(function() {
                    return n.cancelRecording()
                })
            },
            fixHeight: function() {
                F()
            },
            unmount: function() {
                (0, Y.destroyModule)(e), clearInterval(M.get().update_title_to), o.stop(), d.stop(), t.unmount();
                var a = window.devicePixelRatio >= 2 ? "_2x" : "";
                setFavIcon("/images/icons/favicons/fav_logo" + a + ".ico"), n.unmount(), r.unmount(), cancelStackFilter("im_peer"), w.unmount(), b && b.unmount(), D && D.unmount(), x && x(), P && P(), (0, se.isLocksAvailable)(M) && M.get().peer && M.set(oe.releaseBlock.bind(null, M.get().peer)), R.unmount(), D && D.unmount(), N.unmount(), clearInterval(O), cur.imDb.unmount(), cur.imDb = !1
            }
        }
    }

    function L(e, t, n, r) {
        (0, se.isReservedPeer)(t.get().peer) || e().onUserActions(t, r), t.set(oe.updateFavAndTitle.bind(null, !1, !1))
    }

    function P(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_page_history", e),
            a = window.clientHeight() - n.offsetHeight - pe - 2,
            i = (0, se.isClassicInterface)(t) ? he : _e,
            o = {
                page: Math.max(a, i)
            };
        if ((0, se.isClassicInterface)(t)) {
            var s = (0, se.getClassicChatHeight)();
            s = s > 0 ? Math.min(s - n.offsetHeight - pe - 2, a) : a;
            var l = hasClass(r, "im-page--history_empty-hist") ? s : a;
            o.history = Math.max(s, i), o.chat = Math.max(l, i)
        }
        return o
    }

    function O(e, t, n, r, a) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !1;
        if (!isFullScreen()) {
            var s = P(e, t);
            if (setStyle(e, {
                    minHeight: s.page
                }), (0, se.isClassicInterface)(t) && ("undefined" == typeof t.get().chatResizeInitialized && t.set(oe.initializeChatResize), setStyle(e, {
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
                return O(e, t, n, r, a, !1)
            }, 100)
        }
    }

    function D(e) {
        var t = "safari-repaint";
        e.forEach(function(e) {
            hasClass(e, t) && removeClass(e, t), addClass(e, t)
        }), setTimeout(function() {
            e.forEach(function(e) {
                removeClass(e, t)
            })
        }, 100)
    }

    function x() {
        var e = [geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")];
        D(e)
    }

    function R(e, t, n, r) {
        function i() {
            var t = (0, W.getNativeOption)("scrollLeft"),
                n = hasClass(e, "im-page--header_static"),
                r = [];
            u !== t ? r = l.slice().concat([e]) : n !== c && (r = [e]), u = t, c = n, r.length > 0 && r.forEach(function(r) {
                var i = e === r && n ? 0 : -t;
                setStyle(r, a({}, cssTransformProp, 0 === i ? "unset" : "translateX(" + i + "px)"))
            })
        }
        if (browser.mobile) return !1;
        var o = geByClass1("_im_chat_input_w", r),
            s = geByClass1("_im_dialog_actions", r),
            l = [t, n, o, s],
            u = null,
            c = hasClass(e, "im-page--header_static"),
            d = ge("im-group-online-disabled-notice");
        return d && l.push(d), l = l.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", i), i(),
            function() {
                removeEvent(window, "scroll", i)
            }
    }

    function N(e) {
        var t = e.get();
        if (!(0, se.isLocksAvailable)(e)) return null;
        var n = (0, J.createWorker)(t.mutex_key, function(e) {
                t.longpoll.push([Z.mutexEvent(e)])
            }, function(e, n) {
                return (0, oe.getMutexQueue)(t.gid).then(function(e) {
                    var t = H(e, 1),
                        n = t[0];
                    return n
                })
            }),
            r = n.stop;
        return r
    }

    function B(e, t, n, r) {
        e.set(oe.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
    }

    function F(e, t) {
        var n = t.get(),
            r = void 0,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), O(e, t, !1, !1, !1, !0), show(e);
        var o = (0, Y.createMutations)(M),
            l = o.callMutations,
            u = o.bindMutations,
            c = (0, X.startLongPoll)(n);
        c.on("data", function() {
            for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
            return l().onEvents(t, n)
        });
        var d = geByClass1("_im_dialogs_search", e),
            g = geByClass1("_im_dialogs_settings", e),
            f = (0, j.mount)(geByClass1("_im_page_dcontent", e), t, l),
            p = (0, U.mount)(geByClass1("_im_page_history", e), t, l),
            _ = (0, G.mount)(d, t, l),
            h = (0, q.mount)(g, t, l),
            v = (0, ne.mount)(t);
        cur.imDb = (0, re.mount)(t.get().gid ? -t.get().gid : vk.id), t.set(oe.preloadSearchIndex.bind(null, cur.imDb)), (0, se.isClassicInterface)(t) && h.updateSettings(t);
        var b = void 0,
            y = void 0;
        if ((0, se.isClassicInterface)(t)) {
            var w = geByClass1("_im_ui_peers_list", e.parentNode);
            b = (0, te.mount)(w, t, l), y = R(d, g, geByClass1("_im_right_menu", e.parentNode), e)
        }(0, se.isClassicInterface)(t) && n.peer && f.deactivate(), n.gid || (r = (0, z.mount)(geByClass1("_im_dialogs_creation", e), t, l));
        var C = n.isCreating,
            E = C ? "create" : 0 === n.peer ? "search" : "default";
        C && r.show(t, []);
        var k = (0, Q.create)(t, E, f, p, _, r),
            T = (0, ce.mount)(t, k);
        p.updateScroll();
        var S = L.bind(null, l, t, k);
        (0, se.isReservedPeer)(n.peer) || setTimeout(function() {
            return m(t, p)
        }, 10);
        var I = new IdleManager({
                id: "im",
                element: document,
                focusElement: window,
                triggerEvents: "mouseover mousedown keypress"
            }),
            A = debounce(x, 300),
            P = O.bind(null, e, t, p, f, r, !1, A);
        t.setState({
            longpoll: c
        }), t.set(oe.setExecStack.bind(null, [])), I.on("unidle", function() {
            c.abortPauses(), S()
        }), I.start(), nav.objLoc.box && (s(t, nav.objLoc.box), (0, V.updateLocation)({
            box: null
        }));
        var D = N(t),
            B = void 0;
        (0, se.isLocksAvailable)(t) && (B = setInterval(se.blockLatencyCompensation.bind(null, t, n.longpoll), 2e3)), t.get().invitation && (0, se.showInvitationBox)(t, t.get().invitation, oe.leaveInvitation);
        var F = (0, ae.throttleAccumulate)(i.bind(null, t, p, f, b), 200),
            H = se.hideTopNotice.bind(null, t),
            W = se.hideAsideNotice.bind(null, t),
            K = (0, Y.createModule)({
                handlers: function(t, n) {
                    t(document, "mousemove mousedown keypress", S), t(window, "resize", P), n(e, "click", se.HIDE_TOP_NOTICE_CLASS, H), n(gpeByClass("_im-page-wrap", e), "click", se.HIDE_ASIDE_NOTICE_CLASS, W), n(gpeByClass("_im-page-wrap", e), "click", se.HIDE_ASIDE_PROMO_BLOCK_CLASS, se.hideAsidePromoBlock), n(gpeByClass("_im-page-wrap", e), "click", se.INSTALL_VKADMIN_LINK, se.installVKAdminApp), browser.safari && t(document, "visibilitychange", x)
                }
            });
        return u(K, f, p, _, e, I, c, F, l, r, h, t, k, D, B, b, y, v, T, P)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var H = function() {
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
    t.mount = F;
    var j = n(139),
        U = n(7),
        G = n(101),
        q = n(153),
        z = n(112),
        V = n(202),
        W = n(167),
        K = n(104),
        Y = n(121),
        Q = n(256),
        X = n(120),
        $ = n(55),
        Z = r($),
        J = n(44),
        ee = n(114),
        te = n(243),
        ne = n(200),
        re = n(32),
        ae = n(244),
        ie = n(144),
        oe = n(122),
        se = n(160),
        le = n(188),
        ue = n(155),
        ce = n(21),
        de = n(175),
        me = n(130),
        fe = n(8),
        pe = 30,
        _e = 400,
        he = 250,
        ve = 32,
        be = 12,
        ye = 52,
        we = 5 * ve + 2 * be + ye,
        Ce = 3 * ve + 2 * be,
        Ee = 10,
        ke = "._im_aside_notice"
}, , function(e, t, n) {
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
            var s = new D;
            s.onload = s.onerror = function(e) {
                var r = e.currentTarget.response;
                200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
            }, s.open("POST", K.upload_url, !0), s.send(r)
        })
    }

    function o(e) {
        if (!Q) {
            Q = !0, (0, P.lockButton)(H);
            var t = {
                peer: q.get().peer,
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
                            m(), W([
                                ["doc", e + "_" + r, "audiomsg"]
                            ], {}, t.peer), w(), n()
                        },
                        onFail: function(e) {
                            r(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()
            }).then(function() {
                (0, P.unlockButton)(H), Q = !1
            })["catch"](function() {
                Q = !1, (0, P.unlockButton)(H), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
            })
        }
    }

    function s(e) {
        var t = URL.createObjectURL(Y.buffer);
        domData(z, "duration", Y.duration), domData(z, "ogg", t), domData(z, "mp3", t), geByClass1("audio-msg-track--duration", z).innerHTML = r(Y.duration), geByClass1("audio-msg-track--wave-wrapper", z).innerHTML = AudioMessagePlayer.getWave(Y.wave, X)
    }

    function l() {
        R.innerHTML = r(Y.duration), Y.duration >= O && v()
    }

    function u(e) {
        e.set(M.cancelRecording).then(_)
    }

    function c() {
        stManager.add(["voice_message_player.js", "speech.js"], function() {
            Y || (Y = Speech.newRecorder(), addEvent(Y, "progress", l)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Y.record().then(function() {
                g(q), b(), y(), V = Speech.createVisualization("wave", Y.source, N), V.start();
                var e = N.getBoundingClientRect();
                X = (e.right - e.left) / 3
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
        Y && Y.stop(), V && (V.destroy(), V = null)
    }

    function g(e) {
        K.isRecording = !0, cancelStackPush("audio_message_cancel", u.bind(null, e))
    }

    function m() {
        K.isRecording = !1, cancelStackFilter("audio_message_cancel")
    }

    function f() {
        p(), o(Y)
    }

    function p() {
        AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Y, "finish", p), removeEvent(Y, "finish", f), s(), removeClass(x, "im-audio-message_recording"), addClass(x, "im-audio-message_recorded")
    }

    function _() {
        m(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Y, "finish", p), removeEvent(Y, "finish", f), d(), w()
    }

    function h() {
        Y.isRecording ? (addEvent(Y, "finish", f), removeEvent(Y, "finish", p), d()) : o(Y)
    }

    function v() {
        addEvent(Y, "finish", p), removeEvent(Y, "finish", f), d()
    }

    function b() {
        hideProgress(geByClass1("im-audio-message-send-wrapper", x)), show(H), R.innerHTML = "0:00", addClass(x, "im-audio-message_recording"), removeClass(x, "im-audio-message_recorded")
    }

    function y() {
        show(x), hide(geByClass1("_im_chat_input_parent"))
    }

    function w() {
        removeClass(x, "im-audio-message_recorded"), removeClass(x, "im-audio-message_recording"), hide(x), show(geByClass1("_im_chat_input_parent"))
    }

    function C() {
        U = ge("audiomsg_record"), z = ge("audiomsg_player"), x = geByClass1("im-audio-message-input"), R = geByClass1("audio-msg-track--duration", x), N = geByClass1("audio-msg-track--wave", x), F = geByClass1("im-audio-message--cancel-btn", x), H = geByClass1("_im_audio_send", x), j = geByClass1("audio-msg-track--btn", x), G = geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
        var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
        addClass(e, "_voice_field_wrap"), k()
    }

    function E() {
        T(), U = z = x = R = N = B = F = H = j = null
    }

    function k() {
        addEvent(B, "click", c), addEvent(F, "click", _), addEvent(H, "click", h), addEvent(j, "click", v)
    }

    function T() {
        Y && removeEvent(Y, "progress", l), removeEvent(B, "click", c), removeEvent(F, "click", _), removeEvent(H, "click", h), removeEvent(j, "click", v)
    }

    function S(e, t, n) {
        return {
            cancelRecording: _,
            start: function() {
                c()
            },
            unmount: function() {
                _(), E()
            }
        }
    }

    function I(e, t, n, r) {
        q = t, K = t.get().audio_msg, W = n, (0, L.initFailBack)(), (0, P.getAvailableMicrophones)().then(function(e) {
            var n = e.length > 0;
            n ? (C(), r()) : setCookie("remixvoice", "0", 7), t.set(M.setVoiceMessageAvail.bind(null, n))
        })["catch"](function(e) {
            throw setCookie("remixvoice", "0", 7), e
        });
        var a = (0, A.createMutations)(S),
            i = a.bindMutations;
        return i(e, t, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = I;
    var A = n(121),
        M = n(122),
        L = n(34),
        P = n(160),
        O = 600,
        D = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
        x = void 0,
        R = void 0,
        N = void 0,
        B = void 0,
        F = void 0,
        H = void 0,
        j = void 0,
        U = void 0,
        G = void 0,
        q = void 0,
        z = void 0,
        V = void 0,
        W = void 0,
        K = void 0,
        Y = !1,
        Q = !1,
        X = 100
}, , function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        if ("Script error." !== e) {
            var i = a ? a.stack || a.message : null;
            o("unhandled_error", i ? {
                err: e,
                stack: i
            } : {
                err: e
            })
        }
        g && g.apply(this, arguments)
    }

    function a(e) {
        e.preventDefault()
    }

    function i() {
        return !!window.imwl
    }

    function o(e, t) {
        i() && (console.error(e, t), console.trace(), (0, d.retryFn)(c.post, 3, function() {
            return 2
        })("al_im.php", {
            act: "a_weird_log",
            kind: e,
            data: JSON.stringify(extend({
                errIdx: m++,
                ua: navigator.userAgent,
                noSh: 1
            }, t))
        }))
    }

    function s(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return o(e, extend({
            err: t && t.message || t
        }, n)), Promise.reject(t)
    }

    function l() {
        g = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", a)
    }

    function u() {
        window.onerror = g, g = void 0, window.removeEventListener("unhandledrejection", a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isWeirdLogging = i, t.imWeirdLog = o, t.imWeirdCatch = s, t.startLoggingAllUnhandled = l, t.stopLoggingAllUnhandled = u;
    var c = n(136),
        d = n(246),
        g = void 0,
        m = 1
}, , , , , function(e, t, n) {
    var r = n(1)("unscopables"),
        a = Array.prototype;
    void 0 == a[r] && n(189)(a, r, {}), e.exports = function(e) {
        a[r][e] = !0
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t && (t.im_v = i), new Promise(function(r, a) {
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
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = a(e, t, n),
            i = r.request;
        return i
    }

    function a(e, t) {
        function n() {
            a.abort()
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = void 0;
        a = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var i = new Promise(function(n, i) {
            var o = void 0,
                s = Date.now(),
                l = r.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) a.open("get", e + "?" + u), a.ontimeout = function() {
                i(["", {}])
            }, a.onerror = function() {
                i(["", {}])
            }, a.onload = function() {
                n([a.responseText, {}])
            }, setTimeout(function() {
                a.send()
            }, 0);
            else {
                a.onreadystatechange = function() {
                    4 == a.readyState && (clearInterval(o), a.status >= 200 && a.status < 300 ? n([a.responseText, a]) : i([a.responseText, a]))
                };
                try {
                    a.open("GET", e + "?" + u, !0)
                } catch (c) {
                    return i([c, a])
                }
                a.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * l && (i(["", {}]), clearInterval(o))
            }, 1e3)
        });
        return {
            request: i,
            cancel: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = n, t.plainget = r, t.plaingetCancelable = a;
    var i = (t.CONTROLLER = "al_im.php", 2)
}, , function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
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

    function i(e, t, n) {
        removeClass(t.parentNode, "im-page--dialogs_with-mess");
        var r = n.getCurrentElements().filter(function(e) {
            return e.message
        });
        n.toTop(), n.reset(), (0, ae.statlogsProbValueEvent)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
            type: "sep_messages"
        }].concat(r), e.setState({
            searchOnlyMessages: !0
        })) : r = [M()], n.pipeReplace(Promise.resolve(r))
    }

    function o(e) {
        return hasClass(e, "_im_search")
    }

    function s(e, t, n, r) {
        if ((0, Y.isSearching)(e) && e.get().searchAllLoaded || (0, Y.isRecentSearchesActive)(e)) return Promise.resolve([]);
        if (e.get().dialog_search_going || (0, K.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
        if ((0, Y.isSearching)(e)) return (0, W.searchMessages)((0, Y.getSearchText)(e), e.get()).then(function(e) {
            var t = V(e, 2),
                n = t[0],
                r = t[1];
            return A(r, n)
        });
        var a = e.get().active_tab,
            i = e.get().dialog_tabs_all;
        return i[X.FOLDER_ALL] && !(0, K.isReversedDialogs)(e) || i[a] ? 0 === G(e).length ? Promise.resolve([{
            type: "empty_dialogs"
        }]) : Promise.resolve([]) : e.set(W.loadDialogs).then(function(t) {
            var n = G(e);
            return 0 === n.length ? [{
                type: "empty_dialogs"
            }] : n
        })
    }

    function l(e, t, n, r, a) {
        if (!gpeByClass("_im_peer_target", r.target)) {
            var i = t.get(),
                s = o(a),
                l = parseInt(domData(a, "peer"), 10),
                u = parseInt(domData(a, "msgid"), 10),
                c = (0, Y.getTab)(t, l);
            if (checkEvent(r)) return window.open(h(t, c, u, s));
            if (n.saveScroll("list"), s && i.msgid !== u) i.longpoll.push([te.changePeer(l, u)]);
            else if (l !== i.peer) {
                i.longpoll.push([te.changePeer(l, !1, !0, !0)]);
                var d = (0, Y.isSearching)(t);
                d && !hasClass(a, "_dont_add_recent") && (0, W.saveRecentSearchPeer)(l, cur.imDb), d && c && !(0, K.isClassicInterface)(t) && setTimeout(function() {
                    var e = c.message ? c.message.messageId : c.peerId;
                    n.scrollToElement(e.toString(), !0, 0, "center")
                }, 100)
            } else l === i.peer && i.longpoll.push([te.changePeer(l, !1, !0, !s)]);
            cancelEvent(r)
        }
    }

    function u(e, t, n, r) {
        var a = void 0;
        !(0, K.isChatPeer)(t) || "string" == typeof n.photo && "" !== n.photo ? (a = '<img src="' + n.photo + '" alt="">', r && (a = getTemplate("im_dialogs_link_img", {
            href: n.href,
            photo: a
        }))) : a = (0, K.renderPhotosFromTab)(e, n, !r);
        var i = '<span class="_im_dialog_link">' + n.tab + "</span>";
        return {
            photo: a,
            userLink: i
        }
    }

    function c(e) {
        return !(0, K.isPendingForward)(e)
    }

    function d(e, t, n) {
        return n ? getTemplate("im_img_prebody", {
            photo: t
        }) : e + ":"
    }

    function g(e, t, n, r, a, i, o, s, l, u) {
        var c = "",
            g = "";
        return t & te.FLAG_OUTBOUND ? c = d(getLang("mail_by_you"), u, l) : (0, K.isChatPeer)(n) && 0 !== r && (c = d((0, ie.oCacheGet)(e, r).first_name, (0, ie.oCacheGet)(e, r).photo, l)), o = (0, K.renderShortText)(n, s, o, a, i), g = c ? getTemplate("im_drow_prebody", {
            prebody: c,
            body: o
        }) : o
    }

    function m(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            i = [];
        return (0, K.isClassicInterface)(r) && i.push("nim-dialog_classic"), (0, Y.isRecentSearchesActive)(r) && i.push("nim-dialog_recent"), i.push("nim-dialog_empty"), a.search && i.push("_im_search"), getTemplate("im_drow", {
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

    function f(e, t, n) {
        return n & te.FLAG_OUTBOUND ? (0, K.isSelfMessage)(t.peerId, e.get().gid) ? !1 : (0, K.isChatPeer)(t.peerId) && t.data && t.data.closed ? !1 : t.unread ? !1 : t.lastmsg <= t.out_up_to ? !1 : !0 : !1
    }

    function p(e) {
        var t = w(e),
            n = e.unread > 0 ? e.unread : "";
        return n > 0 && t
    }

    function _(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = u(e, t.peerId, t, (0, K.isClassicInterface)(e)),
            i = a.photo,
            o = a.userLink,
            s = n || w(t);
        if (!s) return m(t, i, o, e, r);
        var l = s.flags,
            c = y(t, e, n),
            d = [];
        r.search && d.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && d.push("nim-dialog_muted"), t.verified && d.push("nim-dialog_verified"), (0, Y.isRecentSearchesActive)(e) && d.push("nim-dialog_recent"), -1 === s.messageId && d.push("nim-dialog_empty"), (0, K.isClassicInterface)(e) && d.push("nim-dialog_classic"), t.folders & te.FOLDER_IMPORTANT && d.push("nim-dialog_starred"), !r.search && (0, K.isUnrespond)(e, t.peerId, t) && d.push("nim-dialog_unrespond");
        var g = e.get().timeshift,
            _ = f(e, t, l) ? "nim-dialog_unread-out" : "",
            h = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
        return getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: s.messageId,
            photo: i,
            user_link: o,
            date: s.date ? getShortDateOrTime(s.date, g, !0, getLang("months_sm_of", "raw")) : "",
            body: c,
            unread_message_string: h,
            tab_name: stripHTML(t.tab),
            unread: (0, K.simplifyCounter)(t.unread),
            more: d.join(" "),
            is_online: onlinePlatformClass(t.online),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_unread_out: _,
            is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
        })
    }

    function h(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = (0, K.getBaseLink)(e),
            i = function() {
                return a + "?sel=" + (0, K.convertPeerToUrl)(t.peerId) + (r && n ? "&msgid=" + n : "")
            };
        return r ? i() : (0, K.isUserPeer)(t.peerId) || (0, K.isCommunityPeer)(t.peerId) ? (0, K.isClassicInterface)(e) ? i() : t.href : i()
    }

    function v(e, t, n, r, a) {
        if (!t.deletedDialog) {
            if (hasClass(e, "nim-conversation-search-row")) return void b(e, t, n);
            var i = w(t),
                o = i.flags,
                s = y(t, n),
                l = u(n, t.peerId, t, (0, K.isClassicInterface)(n)),
                c = l.photo,
                d = n.get().timeshift,
                g = i.date ? getShortDateOrTime(i.date, d, !0, getLang("months_sm_of", "raw")) : "";
            R(e, t), val(geByClass1("_dialog_body", e), s), val(geByClass1("_im_dialog_date", e), g), val(geByClass1("_im_dialog_unread_ct", e), (0, K.simplifyCounter)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
            var m = geByClass1("_im_dialog_photo", e);
            m.innerHTML !== c && val(m, c), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & te.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", (0, K.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", (0, K.isClassicInterface)(n)), toggleClass(e, "nim-dialog_unread", p(t)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === i.messageId), f(n, t, o) && addClass(e, "nim-dialog_unread-out"), a && setTimeout(function() {
                addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
            }, 100)
        }
    }

    function b(e, t, n) {
        R(e, t), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), val(geByClass1("_im_dialog_unread_ct", e), (0, K.simplifyCounter)(t.unread));
        var r = u(n, t.peerId, t, (0, K.isClassicInterface)(n)),
            a = r.photo,
            i = geByClass1("_im_dialog_photo", e);
        i.innerHTML !== a && val(i, a), toggleOnline(geByClass1("_im_peer_online", e), t.online), p(t) && addClass(e, "nim-dialog_unread")
    }

    function y(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || w(e);
        if ((0, K.isPeerBlocked)(e.peerId, t)) {
            var a = t.get().block_states[e.peerId].name,
                i = getLang("mail_community_answering").replace("{username}", a);
            return getTemplate("im_drow_prebody", {
                prebody: i,
                body: ""
            })
        }
        return (0, K.isServiceMsg)(r) ? (0, K.renderServiceMsg)(t, r, e, !1) : g(t, r.flags, e.peerId, r.userId, !0, r.attaches, r.text, r.subject, (0, K.isClassicInterface)(t), (0, ie.oCacheGet)(t, t.get().id).photo)
    }

    function w(e) {
        var t = e.lastmsg_meta;
        return isArray(t) && (t = (0, ee.addMessageEvent)([4].concat(t))), t ? t : (0, ee.addMessageEvent)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
    }

    function C(e, t, n, r, a) {
        var i = geByClass1("_dialog_body", t);
        addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
            text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
            peer: e,
            spam_id: r
        }))
    }

    function E(e, t, n) {
        var r = (0, K.showFlushDialog)(t, function(a) {
            n().updateMenu(e), (0, K.cleanHistory)(e, r, n, W.flushHistory, t)
        })
    }

    function k(e, t, n, r, a, i) {
        var o = gpeByClass("_im_dialog", i, n);
        if (o) {
            var s = intval(domData(o, "peer"));
            if (t.get().recentSearch) {
                var l = (0, W.removeFromRecentSearch)(s, cur.imDb);
                return re(o), cancelEvent(a), 0 === l.length && j(t, r, e), !1
            }
            var u = (0, K.isCommunityPeer)(s) || (0, K.isUserPeer)(s);
            (0, K.isClassicInterface)(t) && u ? (0, W.deleteDialog)(s, t.get()).then(function(n) {
                var r = V(n, 2),
                    a = r[0],
                    i = r[1];
                a ? (C(s, o, a, i, t), e().updateMenu(t)) : E(t, s, e)
            }) : E(t, s, e)
        }
        return cancelEvent(a), !1
    }

    function T(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            r = u(e, t.peerId, t, (0, K.isClassicInterface)(e)),
            a = r.photo,
            i = r.userLink,
            o = c(e),
            s = "" === n ? [] : [n];
        return (0, Y.isRecentSearchesActive)(e) && s.push("nim-dialog_recent"), (0, K.isClassicInterface)(e) && s.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && s.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
            peer: t.peerId,
            msg_id: t.lastmsg || "",
            photo: a,
            user_link: i,
            unread: (0, K.simplifyCounter)(t.unread),
            tab_name: stripHTML(t.tab),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_online: onlinePlatformClass(t.online),
            is_selected: t.peerId == e.get().peer && o ? "nim-dialog_selected _im_dialog_selected" : "",
            more: s.join(" ")
        })
    }

    function S(e, t) {
        switch (t.type) {
            case "sep_btn_search_msg":
                return (0, K.renderBtnSearchOnlyMessages)(e);
            case "sep_messages":
                return (0, K.renderMessagesSep)();
            case "sep_conversations":
                return (0, K.renderConversationsSep)();
            case "sep_popular":
                return (0, K.renderPopularSuggSep)();
            case "popular_sugg":
                return (0, K.renderPopularSuggestions)(e);
            case "clear_recent":
                return (0, K.renderClearRecent)();
            case "empty_dialogs":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_dialogs_list_empty")
                });
            case "empty":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_im_search_empty")
                });
            default:
                return t.message ? _(e, t, t.message, {
                    noselect: !0,
                    search: !0
                }) : t.local_index || (0, Y.isSearching)(e) ? T(e, t) : _(e, t)
        }
    }

    function I(e, t, n, r, a, i) {
        var o = intval(domData(i, "peer")),
            s = domData(i, "action"),
            l = domData(i, "sid"),
            u = geByClass1("_im_dialog_" + o, t),
            c = intval(domData(i, "spam"));
        switch (s) {
            case "restore":
                u && e.set(W.restoreDialog.bind(null, o, l, c)).then(function() {
                    addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), v(u, e.get().tabs[o], e, t, !1), r().updateMenu(e)
                });
                break;
            case "spam":
                var d = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + l + '" data-peer="' + o + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                if (u) {
                    var g = geByClass1("_dialog_body", u);
                    val(g, d), (0, W.spamDialog)(o, l, e.get())
                }
                break;
            case "block":
                var m = void 0;
                m = (0, K.isCommunityInterface)(e) ? (0, K.showBlacklistBox)(o, e) : (0, K.showBlacklistBoxUser)(o, e), m.once("success", function() {
                    e.set(W.flushHistory.bind(null, o)).then(function() {
                        n().restoreDialogs(e)
                    })
                })
        }
        cancelEvent(a)
    }

    function A(e, t) {
        return e.map(function(e) {
            return (0, ee.addMessageEvent)([4].concat(e))
        }).map(function(e) {
            return extend({}, t[e.peerId], {
                message: e
            })
        })
    }

    function M(e) {
        return {
            type: "empty",
            lang: e
        }
    }

    function L(e, t, n) {
        return (0, K.isClassicInterface)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!(0, K.isClassicInterface)(n)).then(function() {
            (0, K.isClassicInterface)(n) || t().toggleSettingsLoader(n, !1)
        })
    }

    function P(e, t) {
        var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
        return "undefined" != typeof n ? 2e9 + n : t.lastmsg
    }

    function O(e, t, n, r) {
        var a = gpeByClass("_im_dialog", r, t),
            i = intval(domData(a, "peer"));
        return e.set(W.toggleDialogImportant.bind(null, i)), setTimeout(function() {
            x(e, t, n, r)
        }, 100), cancelEvent(n), !1
    }

    function D(e, t, n) {
        var r = void 0;
        return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = (0, K.isReversedDialogs)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = P(e, n) - P(e, t), r = (0, K.isReversedDialogs)(e) ? -r : r), r
    }

    function x(e, t, n, r) {
        var a = r.getBoundingClientRect().top;
        showTooltip(r, {
            text: function() {
                var n = gpeByClass("_im_dialog", r, t),
                    a = domData(n, "peer");
                return e.get().tabs[a].folders & te.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
            },
            black: 1,
            zIndex: 1,
            shift: [14, 8],
            toup: (0, Y.isSearching)(e) ? a > 190 : a > 150
        })
    }

    function R(e, t) {
        var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
            r = geByClass1("_im_unread_blind_label", e);
        val(r, n)
    }

    function N(e, t, n, r, a) {
        var i = gpeByClass("_im_dialog", a, t),
            o = intval(domData(i, "peer")),
            s = e.get().tabs[o].lastmsg;
        return e.set(W.markDialogAnswered.bind(null, o, s)).then(function() {
            v(i, e.get().tabs[o], e, t), (0, Y.isRecentSearchesActive)(e) || n().restoreDialogs(e)
        }), showDoneBox(getLang("mail_marked_as_answered"), {
            out: 1e3
        }), cancelEvent(r), !1
    }

    function B(e) {
        var t = 42,
            n = 60,
            r = 45,
            a = 37,
            i = (0, Y.isSearching)(e),
            o = e.get().searchOnlyMessages;
        return (0, K.isClassicInterface)(e) ? {
            top: i && !o ? n + a - 1 : n,
            bottom: (0, K.isCommunityInterface)(e) ? t : t + r
        } : {
            top: i && !o ? a - 1 : 0,
            bottom: 0
        }
    }

    function F(e, t) {
        e.hoverFirstElement(ce, B(t))
    }

    function H(e) {
        e.unhoverElements(ce)
    }

    function j(e, t, n) {
        if ((0, Y.doPopularSuggExist)(e)) {
            var r = [{
                type: "sep_popular"
            }, {
                type: "popular_sugg"
            }];
            t.pipeReplace(Promise.resolve(r)), t.toTop()
        } else n().cancelSearch(e), cancelStackFilter("im_search")
    }

    function U(e, t, n, r, a) {
        return {
            selectPeer: function(t, n) {
                for (var r = geByClass("_im_dialog", e), a = n.get().peer, i = 0; i < r.length; i++) {
                    var s = r[i],
                        l = intval(domData(s, "peer")),
                        u = intval(domData(s, "msgid"));
                    l === a && (!o(s) || t === u && o(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                }
            },
            appendFastDialogs: function(t, r, a) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), a ? (n.reset(), (0, K.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) ? (0, Y.isRecentSearchesActive)(t) && ((0, Q.doesSearchResultContainConversations)(r) && (r = [{
                    type: "clear_recent"
                }].concat(r)), (0, Y.doPopularSuggExist)(t) && (r = [{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }].concat(r))) : r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r), t.setState({
                    searchOnlyMessages: !1
                }), n.pipeReplace(Promise.resolve(r)).then(function() {
                    return F(n, t)
                })) : n.pipe(Promise.resolve(r)), (!(0, K.isClassicInterface)(t) || (0, K.isReservedPeer)(t.get().peer)) && n.toTop()
            },
            deactivate: function() {
                n.deactivate()
            },
            activate: function() {
                n.activate()
            },
            hoverFirstDialog: function(e) {
                F(n, e)
            },
            hoverNextDialog: function(e) {
                n.hoverNextElement(ce, ue, B(e))
            },
            hoverPrevDialog: function(e) {
                n.hoverPrevElement(ce, ue, B(e))
            },
            unhoverDialogs: H.bind(n),
            selectHoveredDialog: function(t) {
                var a = geByClass1("_im_dialog_hovered", e);
                a || (a = geByClass1("_im_dialog", e)), a && l(r, t, n, {}, a)
            },
            appendSearch: function(t, r, a) {
                var i = A(a, r);
                a.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                    type: "sep_messages"
                }].concat(i))).then(function() {
                    return F(n, t)
                })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([M()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
            },
            updateDialog: function(t, n) {
                var r = geByClass1("_im_dialog_" + t);
                r && !o(r) && v(r, n.get().tabs[t], n, e)
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
                }), 0 !== G(t).length || n.isLoading() || (a = !0), a && n.reset(), i && n.wipe(), n.pipeReplace(Promise.resolve(G(t))).then(function(e) {
                    if (a && (!(0, K.isClassicInterface)(t) || !t.get().peer)) {
                        var i = L(n, r, t);
                        return n.toTop(), i
                    }
                }).then(function() {
                    return H(n)
                })
            },
            appendDialogs: function(t, r) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                    var r = geByClass1("_im_dialog_" + n.peerId, e);
                    r && b(r, n, t)
                }), (0, K.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) || (r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r)), t.setState({
                    searchOnlyMessages: !1
                }), n.isEmpty() && 0 === r.length && (0, K.isPendingForward)(t) && (r = [M(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
            },
            updateCounter: function(t, n) {
                var r = geByClass1("_im_dialog_" + n, e),
                    a = (0, Y.getTab)(t, n);
                if (r && !o(r) && (R(r, a), val(geByClass1("_im_dialog_unread_ct", r), (0, K.simplifyCounter)(a.unread)), toggleClass(r, "nim-dialog_unread", a.unread > 0), toggleClass(r, "nim-dialog_unread-out", f(t, a, w(a).flags))), (0, Y.isRecentSearchesActive)(t)) {
                    var i = geByClass1("_im_sugg_" + n);
                    i && (val(geByClass1("_sugg_unread_ct", i), (0, K.simplifyCounter)(a.unread)), toggleClass(i, "sugg-is_unread", a.unread > 0))
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
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                n.toTop(e, t), n.saveScroll("list", !0)
            },
            saveScroll: function(e) {
                n.saveScroll("list", !0)
            },
            promoteDialog: function(r, a) {
                var i = geByClass1("_im_dialog_" + a, e);
                return i && !o(i) || !(0, Y.isSearching)(r) ? (n.pipeReplace(Promise.resolve(G(r)), void 0, !0).then(function(t) {
                    !inArray(a, t) && i && v(i, (0, Y.getTab)(r, a), r, e)
                }), void t().updateTyping(a, r)) : void n.unsetScroll("list")
            },
            removeSelection: function(t) {
                var r = t.get().peer.toString(),
                    a = "._im_dialog_" + r + "." + ue.join("."),
                    i = domQuery(a, e)[0];
                ue.forEach(function(e) {
                    return removeClass(i, e)
                }), (0, K.isClassicInterface)(t) || n.hoverElement(r, ce, B(t))
            },
            updateScroll: function() {
                n.updateScroll()
            },
            updateTyping: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r && !o(r) && !n.get().tabs[t].deletedDialog) {
                    var a = geByClass1("_im_dialog_typing", r),
                        i = !(0, K.isClassicInterface)(n),
                        s = (0, K.formatTyper)(n.get().tabs[t].typing, t, !(0, K.isChatPeer)(t), n.get(), 1, i);
                    val(a, s), toggleClass(r, "nim-dialog_typing", s)
                }
            },
            unmount: function() {
                n.unmount(), (0, ne.destroyModule)(a)
            }
        }
    }

    function G(e) {
        var t = e.get().active_tab,
            n = e.get().dialog_tabs[t],
            r = e.get().tabs;
        return n.map(function(e) {
            return r["" + e]
        }).sort(D.bind(null, e))
    }

    function q(e, t) {
        return t.message ? t.message.messageId : (0, Y.isSearching)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
    }

    function z(e, t, n) {
        var r = (0, ne.createMutations)(U),
            a = r.callMutations,
            o = r.bindMutations,
            u = function(e, n) {
                var r = n.getBoundingClientRect().top;
                showTooltip(n, {
                    text: function() {
                        return (0, Y.isRecentSearchesActive)(t) ? getLang("mail_hide_from_recent") : getLang("mail_delete")
                    },
                    black: 1,
                    center: !0,
                    shift: (0, K.isClassicInterface)(t) ? [-4, 10] : [2, 10],
                    toup: r > 150 || (0, Y.isSearching)(t),
                    zIndex: 1
                })
            },
            c = function(e, t) {
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
            d = x.bind(null, t, e),
            g = O.bind(null, t, e),
            m = N.bind(null, t, e, a),
            f = geByClass1("_im_dialogs_search"),
            p = {
                idFn: function(e) {
                    return q(t, e)
                },
                hoverableFn: function(e) {
                    return hasClass(e, "_im_dialog")
                },
                renderFn: S.bind(null, t),
                more: s.bind(null, t, a),
                onScroll: (0, K.isClassicInterface)(t) ? function() {
                    var e = bodyNode.scrollTop || document.documentElement.scrollTop;
                    0 >= e && !layers.visible && browser.safari ? addClass(f, "im-page--header_static") : removeClass(f, "im-page--header_static")
                } : !1
            },
            _ = (0, J.mount)(e, (0, Z["default"])({
                limit: 40,
                offset: 0,
                nativeScroll: !!(0, K.isClassicInterface)(t),
                height: oe,
                elements: G(t)
            }), function() {
                return p
            }),
            h = l.bind(null, n, t, _),
            v = i.bind(null, t, e, _),
            b = I.bind(null, t, e, a, n),
            y = k.bind(null, n, t, e, _),
            w = (0, ne.createModule)({
                handlers: function(r, a) {
                    a(e, "click", "_im_dialog_close", y), a(e, "click", "_im_dialog_markre", m), a(e, "click", se, g), a(e, "click", "_im_dialog", h), a(e, "click", K.MESSAGE_SEARCH_CLASS, v), a(e, "mouseover", "_im_dialog_close", u), a(e, "mouseover", "_im_dialog_markre", c), a(e, "click", K.CLEAR_RECENT_CLASS, function() {
                        (0, W.resetRecentSearch)(cur.imDb), j(t, _, n)
                    }), a(e, "mouseover", se, d), a(e, "click", le, b), r(e, "mouseover", throttle(_.unhoverElements.bind(_, ce), 100))
                }
            });
        return o(e, a, _, n, w)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var V = function() {
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
    t.mount = z;
    var W = n(122),
        K = n(160),
        Y = n(144),
        Q = n(209),
        X = n(188),
        $ = n(198),
        Z = a($),
        J = n(36),
        ee = n(55),
        te = r(ee),
        ne = n(121),
        ae = n(235),
        ie = n(175),
        oe = 64,
        se = "_im_dialog_star",
        le = "_im_dialog_daction",
        ue = ["_im_dialog_selected", "nim-dialog_selected"],
        ce = ["_im_dialog_hovered", "nim-dialog_hovered"]
}, , function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
    }
}, function(e, t, n) {
    var r = n(194);
    e.exports = function(e, t, n) {
        for (var a in t) r(e, a, t[a], n);
        return e
    }
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
        return e.get ? e.get() : e
    }

    function i(e, t) {
        var n = a(e),
            r = n.tabs[n.peer];
        return Object.keys(r.msgs).filter(function(n) {
            var a = v(e, t, n);
            return !(0, G.isOut)(a) && intval(n) > r.in_up_to
        })[0]
    }

    function o(e) {
        var t = a(e);
        return t.peer
    }

    function s(e, t) {
        var n = a(e);
        return n.tabs[t]
    }

    function l(e) {
        var t = a(e);
        return t.peer ? t.tabs[t.peer] : null
    }

    function u(e) {
        var t = a(e);
        return t.selectedMessages
    }

    function c(e, t, n) {
        var r = s(e, t),
            a = u(e)[0];
        if ("undefined" == typeof a) return [n];
        var i = Math.min(n, a),
            o = Math.max(n, a);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= i && o >= e
        }).filter(function(t) {
            return !(0, W.isServiceMsg)(v(e, e.get().peer, t))
        }).map(intval)
    }

    function d(e, t) {
        var n = a(t),
            r = s(n, e),
            i = 0;
        for (var o in r.msgs)
            if (r.msgs.hasOwnProperty(o)) {
                var l = v(t, e, o);
                (0, G.isOut)(l) || (i += (0, G.isUnread)(r, l) ? 1 : 0)
            }
        return i
    }

    function g(e, t, n) {
        var r = s(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(v(e, t, r).randomId) === n
        }).length > 0
    }

    function m(e, t, n) {
        var r = g(e, t, n);
        return !!r
    }

    function f(e, t) {
        var n = a(e),
            r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof r ? 2e9 + r : t
    }

    function p(e, t, n) {
        var r = s(e, t),
            a = v(e, t, n),
            i = Object.keys(r.msgs).filter(function(n) {
                var r = v(e, t, n),
                    i = r.local && r.type !== q.EDIT_MESSAGE;
                return !a.local && i ? !1 : a.local && !i ? !0 : f(e, a.messageId) > f(e, r.messageId)
            }),
            o = i.pop();
        return o ? v(e, t, o) : null
    }

    function _(e) {
        return e && e.length > 0 ? z.addMessageEvent([0].concat(e)) : e
    }

    function h(e, t, n) {
        var r = s(e, t),
            i = v(e, t, n),
            o = a(e);
        return (0, G.isOut)(i) ? (0, K.oCacheGet)(e, o.id).name : i.userId !== i.peerId ? (0, K.oCacheExists)(e, i.userId) ? (0, K.oCacheGet)(e, i.userId).name : !1 : r.tab
    }

    function v(e, t, n) {
        var r = s(e, t),
            a = r && r.msgs && r.msgs[n];
        return a ? _(a) : null
    }

    function b(e) {
        var t = a(e);
        return t.gid || t.isClassic
    }

    function y(e) {
        return a(e).gid
    }

    function w(e) {
        return a(e).gid
    }

    function C(e) {
        return a(e).gid
    }

    function E(e, t) {
        var n = a(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function k(e) {
        var t = a(e);
        return C(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === V.FOLDER_UNRESPOND || t.active_tab === V.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function T(e, t) {
        e = a(e);
        var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
    }

    function S(e, t) {
        var n = s(e, t);
        n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
    }

    function I(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function A(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function M(e) {
        var t = a(e);
        return !t.lockedSending
    }

    function L(e) {
        return e > -2e9 && 0 > e
    }

    function P(e, t) {
        return L(t) ? !!s(e, t).blocked_community : !1
    }

    function O(e) {
        var t = a(e);
        return t.voice_message_available
    }

    function D(e) {
        var t = a(e);
        return !(!x(t) && !t.recentSearch)
    }

    function x(e) {
        var t = a(e);
        return t.searchText
    }

    function R(e, t) {
        var n = a(e);
        return t && t !== x(e) || n.recentSearch ? !0 : !1
    }

    function N(e) {
        var t = a(e);
        return t.recentSearch
    }

    function B(e) {
        var t = l(e);
        return t && t.pinned && _(t.pinned)
    }

    function F(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function H(e) {
        return 1 == a(e).isEditing
    }

    function j(e) {
        return a(e).gid
    }

    function U(e) {
        return e.draft || (e.draft = (0, Y.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.unpackStore = a, t.getFirstUnread = i, t.getPeer = o, t.getTab = s, t.getCurrentTab = l, t.getSelectedMessages = u, t.getMessageRangeFromSelection = c, t.countUnread = d, t.getMessageByRid = g, t.isRidExist = m, t.getLocalId = f, t.getLastMessage = p, t.parserMessage = _, t.getAuthorFullName = h, t.getMessage = v, t.isClassicInterface = b, t.isLocksAvailable = y, t.isFoldersAvailable = w, t.isCommunityInterface = C, t.getBareTab = E, t.isReversedDialogs = k, t.isFullyLoadedTab = T, t.makeTabNotFullyLoaded = S, t.isGoToEndVisible = I, t.getUnreadScrollBottom = A, t.isSendingAvailable = M, t.isCommunityPeer = L, t.isCommunityBlocked = P, t.checkVoiceMessageAvailable = O, t.isSearching = D, t.getSearchText = x, t.isSearchingValue = R, t.isRecentSearchesActive = N, t.getPinnedMessage = B, t.doPopularSuggExist = F, t.isAnyMessageBeingEdited = H, t.getGroupId = j, t.getTabDraft = U;
    var G = n(214),
        q = n(55),
        z = r(q),
        V = n(188),
        W = n(160),
        K = n(175),
        Y = n(227)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            unmount: function() {
                (0, i.destroyModule)(e)
            }
        }
    }

    function a(e, t, n) {
        var a = (0, i.createMutations)(r),
            o = a.bindMutations,
            s = (0, i.createModule)({
                handlers: function(e, t) {}
            });
        return o(s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(121)
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = void 0,
            r = void 0,
            a = function(a) {
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
}, , , function(e, t, n) {
    "use strict";
    var r = n(135),
        a = n(99),
        i = n(19),
        o = n(61);
    e.exports = n(159)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, a(1)) : "keys" == t ? a(0, n) : "values" == t ? a(0, e[n]) : a(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    var r = n(253),
        a = Math.min;
    e.exports = function(e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0
    }
}, , , function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings";
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
                i() ? (ls.set("im_ui_notify_off", 1), l.outerHTML = r(u)) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                    l.parentNode && (l.outerHTML = r(u))
                }) : (ls.set("im_ui_notify_off", 0), l.outerHTML = r(u))
        }
    }

    function s(e, t) {
        return {
            updateFilter: function(t) {
                var n = void 0,
                    r = t.get().active_tab === m.FOLDER_UNREAD;
                n = t.get().unread_cnt > 0 ? getTemplate("im_filter", {
                    filter: r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread"),
                    cls: ""
                }) : getTemplate("im_filter", {
                    filter: getLang("mail_all_dialogs"),
                    cls: "im-page--dialogs-filter_disabled"
                }), val(geByClass1(_, e), n)
            },
            toggleLoader: function(t, n) {
                var r = geByClass1(f, e);
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
                    var a = t.get().active_tab === m.FOLDER_UNREAD;
                    val(r, getTemplate("im_filter", {
                        filter: a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                    }))
                }
            },
            c = (0, u.createModule)({
                handlers: function(t, n) {
                    n(e, "mouseover", f, r), n(e, "click", p, i), n(e, "click", _, l)
                }
            });
        return s(e, c)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = l;
    var u = n(121),
        c = n(114),
        d = n(122),
        g = n(160),
        m = n(188),
        f = "_im_dialogs_cog_settings",
        p = "_im_settings_action",
        _ = "_im_to_unread"
}, , function(e, t, n) {
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
                    u.innerHTML = a, i.appendChild(u), (0, d.ensureDomHasActions)(i)
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
            l = (0, m["default"])({
                peer: 0,
                longpoll: s,
                oCache: {},
                tabs: (0, d.tabFromIds)(r.msgs, r.hash)
            }),
            g = (0, c.mount)(e.bodyNode, l, function() {
                return {}
            }),
            p = (0, u.mount)(e.bodyNode, t);
        (0, d.ensureDomHasActions)(e.bodyNode);
        var _ = i.bind(null, t, g, e);
        s.on("data", _);
        var h = a.bind(null, {
                all: !1,
                loading: r.all,
                offset: r.offset
            }, e, o, l),
            v = (0, f.createModule)({
                handlers: function(e, t) {
                    e(o, "scroll", h)
                }
            });
        return {
            unmount: function() {
                (0, f.destroyModule)(v), p.unmount(), g.unmount(), s.off("data", _)
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
    var l = n(122),
        u = n(209),
        c = n(69),
        d = n(160),
        g = n(198),
        m = r(g),
        f = n(121),
        p = n(55)
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = domData(t, "chat-id"),
            r = domData(t, "hash");
        return lockButton(t), (0, o.joinChat)(n, r, e.get()).then(function(n) {
            var r = i(n, 1),
                a = r[0];
            unlockButton(t), e.get().longpoll.push([(0, l.changePeer)(a)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function a(e, t) {
        var n = (0, s.createModule)({
            handlers: function(n, a) {
                a(e, "click", u, function(e) {
                    return r(t, e.target)
                })
            }
        });
        return {
            unmount: function() {
                (0, s.destroyModule)(n)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
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
    t.mount = a;
    var o = n(122),
        s = n(121),
        l = n(55),
        u = "_im_join_chat"
}, , function(e, t, n) {
    "use strict";
    var r = n(222),
        a = n(95),
        i = n(194),
        o = n(189),
        s = n(31),
        l = n(19),
        u = n(181),
        c = n(258),
        d = n(204),
        g = n(1)("iterator"),
        m = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        p = "keys",
        _ = "values",
        h = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, w) {
        u(n, t, v);
        var C, E, k, T = function(e) {
                if (!m && e in M) return M[e];
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
            S = t + " Iterator",
            I = b == _,
            A = !1,
            M = e.prototype,
            L = M[g] || M[f] || b && M[b],
            P = L || T(b),
            O = b ? I ? T("entries") : P : void 0,
            D = "Array" == t ? M.entries || L : L;
        if (D && (k = d(D.call(new e)), k !== Object.prototype && (c(k, S, !0), r || s(k, g) || o(k, g, h))), I && L && L.name !== _ && (A = !0, P = function() {
                return L.call(this)
            }), r && !w || !m && !A && M[g] || o(M, g, P), l[t] = P, l[S] = h, b)
            if (C = {
                    values: I ? P : T(_),
                    keys: y ? P : T(p),
                    entries: O
                }, w)
                for (E in C) E in M || i(M, E, C[E]);
            else a(a.P + a.F * (m || A), t, C);
        return C
    }
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
        var e = Kt.get(Kn);
        return e || 0
    }

    function o(e) {
        e >= window.clientHeight() - 30 && (e = 0), Kt.set(Kn, e)
    }

    function s(e, t) {
        var n = cn(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && hn(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function l(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function u(e, t, n, r) {
        var a = window.devicePixelRatio >= 2 ? "256" : "128",
            i = "animation" === n,
            o = "im_gift";
        i && (o += " sticker_img");
        var s = "/images/stickers/" + Jt(e) + "/" + a + ".png",
            l = '<img height="128" class="' + o + '" src="' + s + '"/>';
        if (i) {
            var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                c = "animatedSticker" + r;
            l = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + Jt(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + l + "</div>";
            var d = !1;
            browser.msie ? (0 ^ r) === r && (d = !0) : d = Number.isInteger(r), d && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
        }
        return t && (l = '<a onmouseover="return Emoji.stickerOver(' + Jt(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Jt(t) + ', this, event);">' + l + "</a>"), l = '<div class="im_sticker_row">' + l + "</div>"
    }

    function c(e, t, n) {
        var r = e.get ? e.get() : e;
        if (O(r, t)) {
            var a = r.tabs[t].deleted || [];
            return Zt(n, a)
        }
        return !1
    }

    function d(e, t, n) {
        var r = n.randomId,
            a = cn("_im_mess_rid" + r, t);
        return a && (t = te([a], t), t = w(e, n, t, !0, !1)), t
    }

    function g(e) {
        var t = (0, pt.checkVoiceMessageAvailable)(e);
        return browser.mobile && browser.safari ? Promise.resolve(!1) : "undefined" != typeof t ? Promise.resolve(t) : m().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function m() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function f(e) {
        return bn("im_preloader", {
            preloader: Xt(Wt.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function p(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function _(e) {
        var t = cn("_im_invisible_bar", e);
        t && (mn(t, "_im_invisible_bar"), mn(t, "im-page--history-new-bar_hide"))
    }

    function h(e, t, n) {
        var r = v(e, t),
            a = cn("_im_mess_" + t.messageId, n);
        return a && (a.parentNode.replaceChild(Yt(r), a), y(n)), n
    }

    function v(e, t) {
        var n = ["_im_mess"],
            r = (0, yt.isUnread)(e.tabs[t.peerId], t);
        (0, yt.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), (0, yt.isOut)(t) && n.push("im-mess_out"), (0, yt.wasEdited)(t) && n.push("im-mess_was_edited"), (0, It.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), (0, yt.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
        var a = Date.now() - 1e3 * t.date > 1e3;
        t.local && a && n.push("im-mess_sending"), t.local && n.push("" + Mt), t.local && (0, yt.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Lt), (0, yt.isGift)(t) && n.push("im-mess_gift");
        var i = b(t),
            o = B(e, t.text, t.kludges);
        "" != o && (0, yt.wasEdited)(t) && (o += bn("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !M(t.peerId) && (o = bn("im_topic", {
            topic: t.subject
        }) + o);
        var s = bn("im_message_media", {
            messageId: t.messageId,
            attaches: i.join(""),
            text: (0, yt.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
        });
        return (0, yt.isGift)(t) || (s = o + s), "" == o && (0, yt.wasEdited)(t) && (s += bn("sImLblWasEdited", {
            update_time: t.update_time
        })), bn("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: s,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + yn("mail_send_message_error") + '" role="link"' : "",
            unread_params: r ? 'aria-label="' + yn("mail_unread_message") + '"' : "",
            cls: n.join(" ")
        })
    }

    function b(e) {
        return e.attaches.map(function(t) {
            return "sticker" === t.type ? e.messageId ? u(t.id, t.productId, t.kind, e.messageId) : u(t.id, t.productId) : f(t.type)
        })
    }

    function y(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) pn(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", bn("sImHistoryRowActions")), mn(t[n], "_im_mess_noa")
    }

    function w(e, t, n) {
        var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            i = Date.now() - 1e3 * t.date > 1e3,
            o = e.tabs[t.peerId];
        if (!n || cn("_im_mess", n) || cn("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
        var s = [];
        t.local || (s = e.imQueue(t.peerId, r)), s.length > 0 && te(s.map(function(e) {
            return cn("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        }));
        var l = v(e, t),
            u = an(n);
        pn(u, "_im_mess_stack") || (u = sn(u, "._im_mess_stack", -1));
        var c = (0, pt.getLastMessage)(e, t.peerId, t.messageId),
            d = cn("_im_unread_bar_row", n),
            g = (0, yt.getUserId)(t),
            m = c ? x(c.date, e) : 0;
        if (!c || R(o, c, t, e, a)) {
            var f = "",
                p = !1;
            if (d && (0, yt.isOut)(t) && qe(e, n, t.peerId), 1 === o.unread && !(0, yt.isOut)(t) && a && (f += bn("im_mess_bar", {}), p = !0, qe(e, n, t.peerId)), !An(new Date(m))) {
                var _ = new Date,
                    h = p ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                f += bn("im_day_bar", {
                    day: Sn(t.date, e.timeshift, !0, yn("months_of", "raw"), !0),
                    date: t.date,
                    day_class: _.getDate() + _.getMonth() + _.getFullYear() + " " + h
                })
            }
            if (le(t)) f += bn("im_service_row", {
                text: ce(e, t, o),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var b = e.gid && (0, yt.isOut)(t) ? Jt(t.kludges.from_admin) || 0 : 0,
                    w = (0, Tt.oCacheGet)(e, b ? -e.gid : g) || o,
                    E = M(t.peerId) ? w.name : w.first_name,
                    k = w.link || o.href,
                    T = bn("im_mess_stack_name", {
                        name: E,
                        link: k,
                        "class": (0, yt.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if ((0, yt.isGift)(t)) {
                    var S = yn("mail_gift_message_sent", "raw");
                    T += ' <span class="im-mess-stack--gift">' + wn(w.sex || 0, S) + "</span>"
                }
                if ((0, yt.isMoney)(t)) {
                    var I = (0, yt.isMoneyRequest)(t) ? yn("mail_money_request_message_sent", "raw") : yn("mail_money_tranfer_message_sent", "raw");
                    T += ' <span class="im-mess-stack--money-transfer">' + wn(w.sex || 0, I) + "</span>"
                }
                var A = e.gid ? "/gim" + e.gid : "/im",
                    L = void 0;
                if (L = t.local ? N(t.date, e.timeshift) : bn("im_stack_date", {
                        date: N(t.date, e.timeshift),
                        link: A + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), b && e.admins[b]) {
                    var P = e.admins[b],
                        O = b === Wt.id ? yn("mail_by_you") : P[0];
                    L = L + " " + bn("im_admin_link", {
                        name: O,
                        href: P[1]
                    })
                }
                f += bn("im_mess_stack", {
                    photo: w.photo,
                    href: k,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: tn(T),
                    stack_name: T,
                    peerId: g,
                    date: L,
                    messages: l,
                    admin: t.kludges.from_admin || 0
                })
            }(0, kt.toArray)($t(f)).forEach(function(e) {
                return n && n.appendChild(e)
            })
        } else d && e.peer === t.peerId && !o.inplaceSearch && (0, yt.isOut)(t) && qe(e, n, t.peerId), cn("_im_stack_messages", u).appendChild(Yt(l));
        return (0, yt.isOut)(t) && !i && setTimeout(function() {
            var e = cn("_im_mess_" + t.messageId, n);
            pn(e, Mt) && gn(e, "im-mess_sending")
        }, 500), s = s.filter(function(e) {
            return e.rid !== t.randomId
        }), y(n), C(s, e, n)
    }

    function C(e, t, n) {
        var r = void 0;
        return r = "object" === ("undefined" == typeof e ? "undefined" : ft(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, pt.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return w(t, e, n, !1)
        }), n
    }

    function E(e) {
        var t = cn("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function k(e, t, n) {
        var r = e.tabs[t];
        return (0, kt.toArray)(un("_im_mess_unread", n)).forEach(function(e) {
            var t = Jt(ln(e, "msgid"));
            t > 0 && r.out_up_to >= t && (mn(e, "_im_mess_unread"), mn(e, "im-mess_unread"), E(e))
        }), n
    }

    function T(e, t, n) {
        var r = cn("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function S(e, t) {
        if (!(0, pt.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function I(e) {
        return 0 == e ? !0 : !1
    }

    function A(e) {
        return e > 0 && 2e9 > e
    }

    function M(e) {
        return e > 2e9
    }

    function L(e) {
        return -2e9 > e
    }

    function P(e, t) {
        return e === t.peer
    }

    function O(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function D(e, t) {
        return O(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function x(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function R(e, t, n, r, a) {
        if ((0, yt.getUserId)(t) !== (0, yt.getUserId)(n)) return !0;
        var i = x(t.date, r),
            o = x(n.date, r);
        return In(i, o) ? (0, pt.isCommunityInterface)(r) && Jt(t.kludges.from_admin) !== Jt(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : le(t) || le(n) ? !0 : (0, yt.isGift)(t) || (0, yt.isGift)(n) ? !0 : (0, yt.isGraffiti)(t) || (0, yt.isGraffiti)(n) ? !0 : (0, yt.isUnread)(e, t) === (0, yt.isUnread)(e, n) || !a || (0, yt.isOut)(n) || me(n.peerId, r.gid) ? !1 : !0 : !0
    }

    function N(e, t) {
        return Cn(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function B(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = Math.round(1e9 * Math.random()).toString(16),
            i = {},
            o = 0;
        return t = (0, wt.replaceHyperLinks)(t || "", wt.linksReplacer.bind(null, r)), t = t.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + o + "_" + a + "!";
            return i[t] = e, o++, t
        }), t = (0, wt.replaceMentions)(t), t = (0, wt.replaceEmailLinks)(t), t = (0, wt.replaceHashtags)(t, function(t) {
            var n = (0, pt.getGroupId)(e),
                r = n ? "gim" + n : "im";
            return '<a href="/' + r + "?sel=" + (0, pt.getPeer)(e) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
        }), Object.keys(i).forEach(function(e) {
            t = t.replace(e, function() {
                return i[e]
            })
        }), n.emoji && (t = Fn.emojiToHTML(t, !0)), Gn && (t = Gn(t)), t
    }

    function F(e) {
        return M(e) ? "c" + (e - 2e9) : L(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function H(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - Jt(e.substr(1));
            case "c":
                return 2e9 + Jt(e.substr(1));
            default:
                return Jt(e)
        }
    }

    function j(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
    }

    function U(e) {
        return {
            search: {
                name: yn("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: yn("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: yn("mail_allow_comm_messages")
            },
            clear: {
                name: yn(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: yn("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: yn("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: yn("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: yn(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: yn("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: yn("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: yn("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: yn("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: yn("mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: yn("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: yn("mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: yn("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: yn("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: yn("mail_menu_unpin")
            }
        }
    }

    function G(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = bn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function q(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = bn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return G(e, t[n])
                }).join("");
            case 3:
                return G(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return q(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return q(e, t[n])
                }).join("")
        }
    }

    function V(e, t, n) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (M(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return z(t.photo);
        var r = t.data.active.slice(0, 4).map(Tt.oCacheGet.bind(null, e)),
            a = r.map(function(e) {
                return e.photo
            }),
            i = n ? [] : r.map(function(e) {
                return e.link
            });
        return z(a, i)
    }

    function W(e) {
        var t = yn(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + qt + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function K() {
        return '<li class="im-search-results-head">' + yn("mail_search_messages") + "</li>"
    }

    function Y() {
        return '<li class="im-search-results-head">' + yn("mail_search_conversations_sep") + "</li>"
    }

    function Q() {
        return '<li class="im-search-results-head">' + yn("mail_search_dialogs_sep") + "</li>"
    }

    function X() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + yn("mail_recent_searches") + '\n    <button type="button" class="' + Gt + ' im-page--clear-recent">' + yn("mail_clear_recent") + "</button>\n  </li>"
    }

    function $(e) {
        var t = e.get().popular_sugg,
            n = (0, pt.isClassicInterface)(e) ? 8 : 5;
        return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var n = t.peerId,
                r = (0, Tt.oCacheGet)(e, n) || t,
                a = e.get().tabs[n] || t,
                i = (e.get().mutedPeers || []).indexOf(n) >= 0,
                o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, a.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + o + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Nn(a.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + j(a.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function Z(e, t, n) {
        var r = cn("_im_mess_" + t.messageId, n);
        if (r) {
            _n(r, "aria-hidden", "false"), gn(r, "im-mess_failed " + Lt);
            var a = cn("_im_mess_marker", r);
            _n(a, "aria-label", yn("mail_send_message_error")), _n(a, "role", "link")
        }
        return n
    }

    function J(e, t, n) {
        var r = cn("_im_mess_" + t, n);
        if (r) {
            mn(r, "im-mess_failed"), _n(r, "aria-hidden", "true"), mn(r, Lt);
            var a = cn("_im_mess_marker", r);
            _n(a, "aria-label", ""), _n(a, "role", "")
        }
        return n
    }

    function ee(e, t) {
        var n = e.map(function(e) {
            return cn("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return te(n, t)
    }

    function te(e, t) {
        var n = e.filter(function(e) {
            return !pn(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === on(e).length
        }).map(function(e) {
            return dn("_im_mess_stack", e)
        }).forEach(function(e) {
            pn(rn(e), "_im_bar_date") && Qt(rn(e)), pn(rn(e), "_im_unread_bar_row") && Qt(rn(e)), Qt(e)
        }), t
    }

    function ne(e, t, n, r) {
        return e.map(function(e) {
            return cn("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            vn(e, oe(t, e, n)), gn(e, "im-mess_light")
        }), r
    }

    function re(e, t, n) {
        var r = cn("_im_mess_" + e, n);
        if (r) {
            var a = cn(Pt, r);
            vn(r, a.innerHTML), mn(r, "im-mess_light")
        }
        return n
    }

    function ae(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (i) return ie(e, t, n, r, !0, a);
        var o = ((0, pt.isClassicInterface)(r), 60),
            s = ie(e, t, n, r, !1, a);
        return s.length > o ? ie(e, t, n, r, !0, a) : s
    }

    function ie(e, t, n, r, i, o) {
        var s = [],
            l = Object.keys(e || {}).sort(function(t, n) {
                return e[n] - e[t]
            }).filter(function(e) {
                var t = (0, Tt.oCacheExists)(r, e);
                return t || s.push(e), t
            });
        if (s.length && (0, At.loadChatMember)(a({}, t, s), r), 0 === l.length) return "";
        var u = A(t) || (0, pt.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name";
        if (1 == l.length) {
            var c = n ? "" : (0, Tt.oCacheGet)(r, l[0])[u];
            return c + " " + yn("mail_typing")
        }
        var d = yn("mail_typing_several", l.length),
            g = l.slice(0, Math.min(l.length - 1, o)),
            m = g.map(function(e) {
                return (0, Tt.oCacheGet)(r, e)[u]
            }).join(", ");
        if (l.length > o + 1) m += " " + yn("mail_and_peer").replace("{count}", l.length - o).replace("{typing}", d);
        else {
            var f = (0, Tt.oCacheGet)(r, l[g.length])[u];
            m += " " + yn("mail_and_peer_one") + " " + f + " " + d
        }
        return m
    }

    function oe(e, t, n) {
        var r = t.innerHTML,
            a = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + yn(a) + ' <button type="button" data-peer="' + e + '" class="' + Ot + ' im-mess--btn">' + yn("mail_restore") + '</button>\n    <div class="' + Pt + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function se() {
        return '<div class="im-page--chat-search-empty">\n    ' + yn("mail_im_search_empty") + "\n  </div>"
    }

    function le(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function ue(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
    }

    function ce(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = t.kludges,
            i = a.source_act,
            o = Jt(a.source_mid),
            s = t.userId,
            l = (0, Tt.oCacheGet)(e, s),
            u = "",
            c = s === o;
        switch (i) {
            case Dt:
                u = "mail_im_chat_created";
                break;
            case xt:
                u = "mail_im_title_updated_dot";
                break;
            case Rt:
                u = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case Nt:
                u = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case Bt:
                u = "mail_im_photo_set";
                break;
            case Ft:
                u = "mail_im_photo_removed";
                break;
            case Ht:
                u = a.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case jt:
                u = a.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case Ut:
                u = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (u = wn(l.sex, yn(u, "raw")), u = u.replace("{from}", ue(l.link, l.name, r)), o && o !== s) {
            var d = a.source_email;
            if (d) u = u.replace("{user}", ue("/im?email=" + encodeURIComponent(d), "email", r));
            else {
                var g = (0, Tt.oCacheGet)(e, o),
                    m = i === Nt ? g.inv_name : g.kick_name;
                u = u.replace("{user}", ue(g.link, m, r))
            }
        }
        if (a.source_text) {
            var f = a.source_old_text ? '«<b class="im_srv_lnk">' + a.source_old_text + "</b>» &rarr; " : "";
            u = u.replace("{title}", f + ('«<b class="im_srv_lnk">' + a.source_text + "</b>»"))
        }
        if (a.source_act === Ht || a.source_act === jt)
            if (a.source_message) {
                var p = ge(Fn.emojiToHTML(tn(a.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    _ = ue("", p, !1, "im_srv_mess_link");
                u = u.replace("{msg}", _)
            } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                return ue("", t, !1, "im_srv_mess_link")
            });
        return u
    }

    function de(e, t, n, r) {
        if (t === Bt) {
            var a = cn("_im_mess_" + e.messageId, r);
            if (a) {
                var i = n.tabs[e.peerId];
                a.parentNode.innerHTML = bn("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: ce(n, e, i) + n.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return r
    }

    function ge(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(bt.MENTION_RAW, "$1$4")
    }

    function me(e, t) {
        return t ? !1 : e === Wt.id
    }

    function fe(e, t) {
        return Dn(e, {
            url: (0, pt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

    function pe(e) {
        return function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = Yt(bn("im_preloader", {
                    preloader: Xt(Wt.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                })),
                i = !1;
            setTimeout(function() {
                i || ("bottom" === n ? e.appendChild(a) : e.insertBefore(a, nn(e)), gn(a, "im-preloader_visible"))
            }, 0), t.then(function() {
                i = !0, mn(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
            })
        }
    }

    function _e(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, ht.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function he(e, t) {
        if (!t && !e) return !1;
        var n = e.target || e.srcElement,
            r = Vn,
            a = !1,
            i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!n || n.onclick || n.onmousedown || "A" == n.tagName || pn(n, "_im_no_select") || pn(n, "im_msg_media_link") || "IMG" == n.tagName && !pn(n, "_im_graffiti") && !pn(n, "emoji") && !pn(n, "emoji_css") && !pn(n, "im_gift") || "TEXTAREA" == n.tagName || pn(n, "play_new") || pn(n, "videoplayer") || (a = i.test(n.className))) break; while (r-- && (n = n.parentNode));
        return a ? !!en(ve()) : !0
    }

    function ve() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function be(e, t) {
        return '<div class="im-mess--text">\n      <span>' + yn("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + F(e) + "&msgid=" + t + '">' + yn("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function ye(e, t) {
        var n = yn(M(e) ? "mail_chat_sure_to_delete_all" : (0, pt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Pn(yn("mail_deleteall1"), n, yn("mail_delete"), t, yn("global_cancel"))
    }

    function we(e) {
        return Pn(yn("mail_unpin_title"), yn("mail_unpin_text"), yn("mail_unpin"), e, yn("global_cancel"))
    }

    function Ce(e, t, n) {
        var r = yn("mail_dialog_msg_delete_N", t),
            a = Pn(yn("mail_dialog_msg_delete_title"), r, yn("mail_delete"), function() {
                return n(isChecked(cn("_check_forall")))
            }, yn("global_cancel")),
            i = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + yn("mail_delete_for_all") + "</div>",
            o = cur.imDb.selectByKey("del_forall_checked");
        return a.setControlsText(i), o && checkbox(cn("_check_forall")), a
    }

    function Ee(e, t, n, r, a) {
        t.showProgress(), e.set(r.bind(null, a)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
        })
    }

    function ke(e, t, n, r, a) {
        var i = e.get().peer;
        Un(r), Ln("al_im.php", {
            act: "a_show_members_box",
            chat: i - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, a) {
                var i = (0, Et.createModule)({
                    handlers: function(a, o) {
                        o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), Te(e, e.get().peer, t, n), (0, Et.destroyModule)(i)
                        }), o(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var n = cn("_im_chat_members_w", r.bodyNode.parentNode),
                                a = 160,
                                i = dn("_im_member_item", t),
                                o = i.offsetTop - n.scrollTop + a,
                                s = o > 370;
                            xn(t, {
                                was: Jt(ln(t, "was")),
                                mid: Jt(ln(t, "peer")),
                                vk_mobile: Jt(ln(t, "vk_mobile")),
                                forcetoup: s
                            })
                        })
                    }
                })
            }
        }, r)
    }

    function Te(e, t, n, r) {
        var a = e.get().tabs[t],
            i = a.memberIds;
        e.set(r.bind(null, "add_member", i)).then(n().showCreation)
    }

    function Se(e, t, n) {
        if (e.get().active_tab === bt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === bt.FOLDER_ALL ? bt.FOLDER_UNREAD : bt.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function Ie(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var a = (0, pt.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, a !== (0, pt.isReversedDialogs)(e)), e
        })
    }

    function Ae(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_IMPORTANT] & n.folders
    }

    function Me(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !(0, pt.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_UNRESPOND] & r.folders
    }

    function Le(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Pe(e) {
        return null != e.get().pendingForward
    }

    function Oe(e, t) {
        return (t.get().block_states[e] || {}).who === Wt.id
    }

    function De(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([ht.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function xe(e, t, n) {
        var r = void 0;
        return !On("al_im.php", {
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
                    Bn.loaded && Bn.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function Re(e, t) {
        var n = (0, pt.getTab)(e, t).last_seen;
        if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + yn("mail_header_online_status") + Ne(t, !1, !0, !0) + "</span>" : "online" + (Rn[n[0]] ? Ne(t, !1, !1, !0) : "");
        if (!n[1]) return "";
        var r = kn(n[1], e.get().timeshift),
            a = wn((0, Tt.oCacheGet)(e, t).sex, yn("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
        return 2 === n[2] ? a += Ne(t, !1, !0) : n[2] && (a += Ne(t, !1)), a
    }

    function Ne(e, t, n, r) {
        var a = n ? "" : 'onclick="mobilePromo();"',
            i = n ? ", vk_mobile: 1" : "",
            o = n ? " vk_mobile" : "";
        return bn("im_wrap_mobile", {
            "class": "im_status_mob_onl" + o,
            params: "mid: " + e + ", " + (r ? "" : "was: 1,") + (t ? "forcetoup: true" : "forcetodown: true") + i,
            attrs: a
        })
    }

    function Be(e, t) {
        var n = t.get().tabs[e];
        return Ln("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function Fe(e, t) {
        return Ln("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function He(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function je(e, t, n, r) {
        var a = void 0,
            i = On("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (a = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Bn.loaded && Bn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, r);
        rt(i, e)
    }

    function Ue() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function Ge(e, t, n) {
        var r = cn("_im_mess_" + e, n);
        return r && fn(r, "im-mess_fav", t), n
    }

    function qe(e, t, n) {
        var r = cn("_im_unread_bar_row", t);
        if (!r) return t;
        var a = sn(r, "._im_mess_stack", -1),
            i = sn(r, "._im_mess_stack"),
            o = a ? un("_im_mess", a).pop() : null,
            s = i ? cn("_im_mess", i) : null;
        if (Qt(r), _(t), !s || !o) return t;
        var l = ln(o, "msgid"),
            u = ln(s, "msgid"),
            c = (0, pt.getMessage)(e, n, l),
            d = (0, pt.getMessage)(e, n, u);
        if (R(e.tabs[n], c, d, e)) return t;
        var g = cn("_im_stack_messages", a),
            m = cn("_im_stack_messages", i).children;
        return (0, kt.toArray)(m).forEach(function(e) {
            Qt(e), g.appendChild(e)
        }), Qt(i), t
    }

    function ze(e, t, n) {
        var r = (0, pt.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var a = cn("_im_mess_" + r, t);
        if (!a) {
            var i = (0, pt.getLastMessage)(e, e.get().peer, r);
            if (!i) return [!0, 0];
            a = cn("_im_mess_" + i.messageId, t)
        }
        var o = pn(a, "_im_mess_srv") ? a : dn("_im_mess_stack", a);
        if (!o) return [!0, 0];
        var s = a ? a.offsetTop : 0,
            l = o.offsetTop + s,
            u = n.contHeight();
        return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - l)]
    }

    function Ve(e, t, n) {
        Un(t);
        var r = dn("_im_top_notice", n);
        jn(r, 200, Qt.pbind(r));
        var a = dn("_im_page_dialogs", r);
        a && pn(a, "im-page--dialogs-notice") && mn(a, "im-page--dialogs-notice"), Mn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function We(e, t, n) {
        Un(t);
        var r = dn("_im_aside_notice", n);
        Hn(r, 200, Qt.pbind(r)), Mn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Ke(e, t) {
        Un(e);
        var n = dn("_im_aside_promo_block", t);
        Hn(n, 200, Qt.pbind(n)), Mn.post("al_im.php", {
            act: "a_hide_promo_block",
            type: n.getAttribute("data-type"),
            hash: n.getAttribute("data-hash")
        })
    }

    function Ye(e, t) {
        var n = dn("_im_aside_promo_block", t);
        n.classList.add("--action-called"), Mn.post("al_im.php", {
            act: "a_vkadmin_app_install",
            hash: ln(t, "hash"),
            platform: ln(t, "platform")
        })
    }

    function Qe(e, t, n, r, a) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = (0, wt.replaceMentions)(n, function(e, t, n, r, a) {
            return a
        }), r && (n = Fn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !M(e) && (n = bn("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && a.length > 0 && (n = bn("im_dialog_media", {
            name: Xe(a[0], a)
        })), n
    }

    function Xe(e, t) {
        var n = {
            photo: yn("mail_added_photos", "raw"),
            video: yn("mail_added_videos", "raw"),
            audio: yn("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return En(e.object.fwd_count, yn("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var r = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return En(r, n[e.type], !0);
            case "audio_playlist":
                return yn("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return yn("mail_added_graffiti");
                    case "audiomsg":
                        return yn("mail_added_audiomsg");
                    default:
                        return yn("mail_added_docs")
                }
            case "geo":
            case "map":
                return yn("mail_added_geo");
            case "wall":
                return yn("mail_added_wall");
            case "wall_reply":
                return yn("mail_added_wall_reply");
            case "gift":
                return yn("mail_added_gift");
            case "link":
            case "share":
                return yn("mail_added_link");
            case "sticker":
                return yn("mail_added_sticker");
            case "market":
                return yn("mail_added_market_item");
            case "money_transfer":
                return yn("mail_added_money_transfer");
            case "money_request":
                return yn("mail_added_money_request");
            case "story":
                return yn("mail_added_story");
            case "mask":
                return yn("mail_added_mask");
            case "article":
                return yn("mail_added_article")
        }
        return ""
    }

    function $e(e) {
        gn(e, "im-send-btn_loading")
    }

    function Ze(e) {
        mn(e, "im-send-btn_loading")
    }

    function Je(e) {
        var t = e.get(),
            n = (0, pt.getPinnedMessage)(e);
        if (!n || !(0, St.isPinnedMessageVisibleInTab)(e, (0, pt.getPeer)(e))) return "";
        var r = (0, Tt.oCacheGet)(e, n.userId);
        if (!r) return "";
        var a = et(e, n);
        a || (a = n.text, a = !a && n.attaches.length ? bn("im_pinned_message_media", {
            text: Xe(n.attaches[0], n.attaches)
        }) : B(e, a, n && n.kludges || {}) || ""), a = a.replace(/<br\s?\/?>/gi, " ");
        var i = bn("im_pinned_message", {
            date: Tn(n.date, t.timeshift),
            content: a,
            link: r.link,
            name: r.name
        });
        return i
    }

    function et(e, t) {
        var n = "";
        if (t && (0, yt.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
            var r = "%s " + t.kludges.attach1_currency;
            if ("RUB" === t.kludges.attach1_currency && (r = yn("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                var a = En(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                    i = En(t.kludges.attach1_total_amount / 1e3, r, !0);
                n = yn("mail_money_request_collected_amount_from").replace("{amount}", a).replace("{total_amount}", i)
            } else {
                var o = En(t.kludges.attach1_tr_amount / 1e3, r, !0);
                n = yn("mail_money_request_collected_amount").replace("{amount}", o)
            }
            if (t.kludges.attach1_held_amount) {
                var s = En(t.kludges.attach1_held_amount / 1e3, r, !0);
                n += " " + yn("mail_money_request_held_amount").replace("{amount}", s)
            }
            t.text && (n += '<span class="divider"></span>' + B(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += bn("im_pinned_message_media_bar", {
                percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
            }))
        }
        return n
    }

    function tt(e, t, n) {
        var r = +n.getAttribute("data-time");
        r && Dn(n, {
            text: yn("mail_message_edited") + " " + Tn(r, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function nt() {
        var e = getSize(cn(zt))[1];
        return e || (e = Wn), e
    }

    function rt(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            pn(e.target, "_im_edit_time") && tt(t, e, e.target)
        })
    }

    function at(e, t, n, r, a) {
        var i = e.get(),
            o = void 0,
            s = On("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                hash: i.tabs[n].hash
            }, {
                onDone: function(n, a) {
                    a && (o = r(n, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Bn.loaded && Bn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, a);
        rt(s, e)
    }

    function it(e, t) {
        return M(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function ot(e) {
        return !M(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function st(e, t) {
        var n = (0, Tt.oCacheGet)(e, t.peerId),
            r = (0, pt.getTab)(e, t.peerId) || {};
        return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, M(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
    }

    function lt(e, t) {
        for (var n in t) t.hasOwnProperty(n) && st(e, t[n])
    }

    function ut(e, t) {
        var n = [],
            r = t.find(function(e) {
                return "mail" === e[0]
            }),
            a = r ? r[1].split(";") : [];
        for (a.length > zn && (r[1] = a.slice(0, zn).join(";")); e.length > qn;) {
            var i = e.substr(0, qn).lastIndexOf(" "); - 1 == i && (i = qn), n.push({
                msgText: en(e.substr(0, i))
            }), e = en(e.substr(i))
        }
        for (e.length && n.push({
                msgText: e,
                attaches: t
            }), n.length || n.push({
                attaches: t
            }), a = a.slice(zn); a.length; a = a.slice(zn)) n.push({
            attaches: [
                ["mail", a.slice(0, zn).join(";")]
            ]
        });
        return n
    }

    function ct(e) {
        return e.length > qn
    }

    function dt(e, t, n) {
        var r = !1;
        Ln("al_im.php", {
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
                    return Pn(yn("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, n) {
                r = (0, Ct.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function gt() {
        Pn(yn("global_error"), yn("mail_message_wait_until_uploaded"))
    }

    function mt(e, t) {
        var n = (0, pt.getTab)(e, t.peerId) || {};
        if (!t || !(0, yt.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (c(e, t.peerId, t.messageId)) return !1;
        if (M(t.peerId)) {
            if (n.data.kicked || n.data.closed) return !1
        } else if (n.block_error > 0) return !1;
        return !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PINNED_CONTAINER_CLASS = t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.INSTALL_VKADMIN_LINK = t.HIDE_ASIDE_PROMO_BLOCK_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var ft = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        pt = n(144);
    Object.keys(pt).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return pt[e]
            }
        })
    }), t.getClassicChatHeight = i, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.applyInnerHtml = l, t.renderSticker = u, t.isAlreadyDeleted = c, t.replaceMessageAttrs = d, t.isVoiceMessageAvailable = g, t.getAvailableMicrophones = m, t.renderAttach = f, t.dayFromVal = p, t.showInvisibleBar = _, t.editAndReplaceMessage = h, t.renderMessage = v, t.renderMessageMedia = b, t.ensureDomHasActions = y, t.appendToHistory = w, t.restoreQueue = C, t.markMessagesAsRead = k, t.replaceAttaches = T, t.isDuplicate = S, t.isReservedPeer = I, t.isUserPeer = A, t.isChatPeer = M, t.isPeerActive = P, t.isTabLoaded = O, t.isTabLoadedWithMessage = D, t.parseMessage = B, t.convertPeerToUrl = F, t.unUrlPeer = H, t.simplifyCounter = j, t.chatActions = U, t.renderPhotos = z, t.renderPhotosFromTab = V, t.renderBtnSearchOnlyMessages = W, t.renderMessagesSep = K, t.renderConversationsSep = Y, t.renderPopularSuggSep = Q, t.renderClearRecent = X, t.renderPopularSuggestions = $, t.setMessageError = Z, t.startResendMessage = J, t.removeMessages = ee, t.removeMessagesWithRestore = ne, t.restoreMessage = re, t.formatTyper = ae, t.formatTyperHelper = ie, t.renderEmptySearch = se, t.isServiceMsg = le, t.serviceLink = ue, t.renderServiceMsg = ce, t.addChatPhotoToUpdate = de, t.replaceSpecialSymbols = ge, t.isSelfMessage = me, t.showVerifiedTooltip = fe, t.wrapLoading = pe, t.tabFromIds = _e, t.checkSelectClick = he, t.renderGoTo = be, t.showFlushDialog = ye, t.showUnpinDialog = we, t.showMsgDeleteDialog = Ce, t.cleanHistory = Ee, t.showChatMembers = ke, t.inviteUser = Te, t.showUnreadOnly = Se, t.changeTab = Ie, t.isImportant = Ae, t.isUnrespond = Me, t.isPeerBlocked = Le, t.isPendingForward = Pe, t.isPeerBlockedByMe = Oe, t.blockLatencyCompensation = De, t.showSpamLayer = xe, t.getLastSeenTextInHeader = Re, t.showBlacklistBoxUser = Be, t.showBlacklistBox = Fe, t.getBaseLink = He, t.showFavvedBox = je, t.isEditableFocused = Ue, t.updateStar = Ge, t.removewNewUnreadBarAndMerge = qe, t.isMessagesVisible = ze, t.hideTopNotice = Ve, t.hideAsideNotice = We, t.hideAsidePromoBlock = Ke, t.installVKAdminApp = Ye, t.renderShortText = Qe, t.attachToText = Xe, t.lockButton = $e, t.unlockButton = Ze, t.renderPinnedMessage = Je, t.renderPinnedMedia = et, t.showEditTimeTooltip = tt, t.getPinnedMessageHeight = nt, t.boxHandleEditTimeTooltips = rt, t.showPinnedBox = at, t.isUserAliveInChat = it, t.getAliveMembersCount = ot, t.normalizeTab = st, t.normalizeTabsGotFromServer = lt, t.splitMessageToParts = ut, t.isMessageTooLong = ct, t.showInvitationBox = dt, t.showWaitUntilUploadedBox = gt, t.canMessageBeDeletedForAll = mt;
    var _t = n(55),
        ht = r(_t),
        vt = n(188),
        bt = r(vt),
        yt = n(214),
        wt = n(104),
        Ct = n(157),
        Et = n(121),
        kt = n(244),
        Tt = n(175),
        St = n(207),
        It = n(48),
        At = n(122),
        Mt = t.SENDING_CLASS = "_im_mess_sending",
        Lt = t.FAILED_CLASS = "_im_mess_failed",
        Pt = t.ORIGINAL_CLASS = "_im_mess_original",
        Ot = t.RESTORE_CLASS = "_im_mess_restore",
        Dt = (t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        xt = t.CHAT_TITLE_ACTION = "chat_title_update",
        Rt = t.CHAT_INVITE_USER = "chat_invite_user",
        Nt = t.CHAT_KICK_USER = "chat_kick_user",
        Bt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        Ft = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        Ht = t.CHAT_PIN_MESSAGE = "chat_pin_message",
        jt = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
        Ut = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
        Gt = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.HIDE_ASIDE_PROMO_BLOCK_CLASS = "_im_aside_promo_block_hide", t.INSTALL_VKADMIN_LINK = "_im_vkadmin_promo_link", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        qt = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
        zt = t.PINNED_CONTAINER_CLASS = "_im_pinned",
        Vt = window,
        Wt = Vt.vk,
        Kt = Vt.ls,
        Yt = Vt.se,
        Qt = Vt.re,
        Xt = Vt.rs,
        $t = Vt.sech,
        Zt = Vt.inArray,
        Jt = Vt.intval,
        en = Vt.trim,
        tn = Vt.stripHTML,
        nn = Vt.domFC,
        rn = Vt.domPS,
        an = Vt.domLC,
        on = Vt.domChildren,
        sn = Vt.domClosestSibling,
        ln = Vt.domData,
        un = Vt.geByClass,
        cn = Vt.geByClass1,
        dn = Vt.gpeByClass,
        gn = Vt.addClass,
        mn = Vt.removeClass,
        fn = Vt.toggleClass,
        pn = Vt.hasClass,
        _n = Vt.attr,
        hn = Vt.setStyle,
        vn = Vt.val,
        bn = Vt.getTemplate,
        yn = Vt.getLang,
        wn = Vt.langSex,
        Cn = Vt.langDate,
        En = Vt.langNumeric,
        kn = Vt.getDateText,
        Tn = Vt.getSmDate,
        Sn = Vt.getShortDate,
        In = Vt.isSameDate,
        An = Vt.isToday,
        Mn = Vt.ajax,
        Ln = Vt.showBox,
        Pn = Vt.showFastBox,
        On = Vt.showTabbedBox,
        Dn = Vt.showTooltip,
        xn = Vt.mobileOnlineTip,
        Rn = Vt.mobPlatforms,
        Nn = Vt.onlinePlatformClass,
        Bn = Vt.AudioMessagePlayer,
        Fn = Vt.Emoji,
        Hn = Vt.slideUp,
        jn = Vt.fadeOut,
        Un = Vt.cancelEvent,
        Gn = Vt.ny2018ReplaceText,
        qn = 4096,
        zn = 100,
        Vn = 8,
        Wn = 52,
        Kn = "chatPosition"
}, , , function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t, n) {
    var r = n(102),
        a = n(96).set;
    e.exports = function(e, t, n) {
        var i, o = t.constructor;
        return o !== n && "function" == typeof o && (i = o.prototype) !== n.prototype && r(i) && a && a(e, i), e
    }
}, , , function(e, t, n) {
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
    var s = n(121),
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
            }, e.prototype.scrollBottomFixSave = function(e) {
                this.scrollBottom(e)
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
            }, e.prototype.scrollBottomFixSave = function(e) {
                var t = this,
                    n = function() {
                        Date.now() - r < 500 && t.scroll && t.scrollBottom(e)
                    },
                    r = Date.now();
                this.scroll.emitter.addOnceListener("resize", n), this.scrollBottom(e)
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
            }, e.prototype.scrollBottomFixSave = function(e) {}, e.prototype.getScrollHeight = function() {
                return 0
            }, e.prototype.destroy = function() {}, e
        }()
}, function(e, t, n) {
    var r = n(210);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = geByClass("post");
        LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(function(e) {
            return LongView.register(e, "im")
        })
    }

    function r(e) {
        LongView.onScroll(e, window.innerHeight)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = {
        onNewMessagesChunk: n,
        onHistoryScroll: r
    }
}, , function(e, t, n) {
    var r = n(31),
        a = n(61),
        i = n(3)(!1),
        o = n(201)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = a(e),
            l = 0,
            u = [];
        for (n in s) n != o && r(s, n) && u.push(n);
        for (; t.length > l;) r(s, n = t[l++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function r(e, t) {
        return setTimeout(n(e), t)
    }

    function a(e, t) {
        return Math.random() * (t - e + 1) + e
    }

    function i(e, t) {
        return Math.floor(a(e, t))
    }

    function o(e) {
        return "undefined" == typeof e
    }

    function s(e) {
        return e && "[object Function]" === Object.prototype.toString.call(e)
    }

    function l(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function u(e) {
        return "string" == typeof e
    }

    function c(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function d(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function g() {
        return +new Date
    }

    function m() {
        return window.Image ? new Image : ce("img")
    }

    function f(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function p(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function _(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function h(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function v(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function b(e) {
        return e = h(e), 0 > e ? 0 : e
    }

    function y(e) {
        return !isNaN(e)
    }

    function w(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return t = h(t), t >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function C(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function E(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function k(e) {
        return C(e.replace(/\t/g, "\n"))
    }

    function T(e, t) {
        if (c(e) || "undefined" == typeof e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
        } else
            for (var r = 0, a = e.length; a > r; r++) {
                var i = e[r];
                if (t.call(i, r, i) === !1) break
            }
        return e
    }

    function S(e, t, n) {
        for (var r = n || 0, a = (e || []).length; a > r; r++)
            if (e[r] == t) return r;
        return -1
    }

    function I(e, t) {
        return -1 != S(t, e)
    }

    function A(e, t) {
        var n = c(e) || "undefined" == typeof e.length ? {} : [];
        for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === N(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = A(e[r]) : n[r] = e[r]);
        return n
    }

    function M(e) {
        var t, n, r = {},
            a = 1,
            i = arguments.length,
            o = arguments;
        for (t in e) {
            for (n = !1, a = 1; i > a; a++) o[a][t] && o[a][t] == e[t] && (n = !0);
            n || (r[t] = e[t])
        }
        return r
    }

    function L() {
        var e, t = arguments,
            n = t[0] || {},
            r = 1,
            a = t.length,
            i = !1;
        for ("boolean" == typeof n && (i = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : N(n)) || s(n) || (n = {}); a > r; ++r)
            if (null != (e = t[r]))
                for (var o in e) {
                    var l = n[o],
                        u = e[o];
                    n !== u && (i && u && "object" === ("undefined" == typeof u ? "undefined" : N(u)) && !u.nodeType ? n[o] = L(i, l || (null != u.length ? [] : {}), u) : void 0 !== u && (n[o] = u))
                }
        return n
    }

    function P(e) {
        window.templates = window.templates || {}, L(window.templates, e)
    }

    function O(e, t) {
        var n = window.templates = window.templates || {},
            r = n[e];
        return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
    }

    function D(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : N(e))) return !1;
        var t = {},
            n = function(t) {
                return geByTag(t, e)
            },
            r = function(n, r) {
                if (r.name)
                    if ("text" != r.type && r.type)
                        if (r.getAttribute("bool")) {
                            var a = val(r);
                            if (!a || "0" === a) return;
                            t[r.name] = 1
                        } else t[r.name] = browser.msie && !r.value && e[r.name] ? e[r.name].value : r.value;
                else t[r.name] = val(r)
            };
        return T(n("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? r(e, t) : void 0
        }), T(n("select"), r), T(n("textarea"), r), t
    }

    function x(e, t) {
        for (var n, r = t ? F : B, a = []; e && (n = e.match(r));) {
            e = e.substr(n.index + n[0].length);
            var i = 0;
            n[4] || (i = 7), a.push({
                url: n[2 + i],
                query: n[5 + i] || "",
                domain: n[4 + i]
            })
        }
        return a
    }

    function R() {
        return window.devicePixelRatio >= 2
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.vkLocal = n, t.lTimeout = r, t.rand = a, t.irand = i, t.isUndefined = o, t.isFunction = s, t.isArray = l, t.isString = u, t.isObject = c, t.isEmpty = d, t.vkNow = g, t.vkImage = m, t.trim = f, t.stripHTML = p, t.escapeRE = _, t.intval = h, t.floatval = v, t.positive = b, t.isNumeric = y, t.winToUtf = w, t.replaceEntities = C, t.clean = E, t.unclean = k, t.each = T, t.indexOf = S, t.inArray = I, t.clone = A, t.arrayKeyDiff = M, t.extend = L, t.addTemplates = P, t.getTemplate = O, t.serializeForm = D, t.extractUrls = x, t.isRetina = R, window.PageID = window.PageID || 1;
    var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        F = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = R, window.extractUrls = x, window.serializeForm = D, window.addTemplates = P, window.getTemplate = O, window.rand = a, window.irand = i, window.isUndefined = o, window.isFunction = s, window.isArray = l, window.isString = u, window.isObject = c, window.isEmpty = d, window.vkNow = g, window.vkImage = m, window.trim = f, window.stripHTML = p, window.escapeRE = _, window.intval = h, window.floatval = v, window.positive = b, window.isNumeric = y, window.winToUtf = w, window.replaceEntities = C, window.clean = E, window.unclean = k, window.each = T, window.indexOf = S, window.inArray = I, window.clone = A, window.arrayKeyDiff = M, window.extend = L, window.vkLocal = n, window.lTimeout = r
}, , , function(e, t, n) {
    "use strict";

    function r(e) {
        if (!e.first_name) {
            var t = e.name.split(" ", 2);
            e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
        }
        e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
    }

    function a(e, t) {
        var n = (0, s.unpackStore)(e);
        return t in n.oCache
    }

    function i(e, t) {
        var n = (0, s.unpackStore)(e).oCache[t];
        return n && !n._n && (r(n), n._n = 1), n
    }

    function o(e, t) {
        var n = (0, s.unpackStore)(e);
        n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.oCacheExists = a, t.oCacheGet = i, t.oCacheAdd = o;
    var s = n(144)
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, , , function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(88),
        a = n(195),
        i = n(258),
        o = {};
    n(189)(o, n(1)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
            next: a(1, n)
        }), i(e, t + " Iterator")
    }
}, , function(e, t, n) {
    var r = n(102);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t) {
    "use strict";
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return n;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return this[n]
        }
    })
}, , , , function(e, t) {
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
    var r, a = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        i = "(https?:\\/\\/)?",
        o = "((?:[" + a + "\\—\\-\\_]+\\.){1,5})",
        s = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        l = "(?:\\:(\\d{2,5}))",
        u = "(" + o + s + l + "?)",
        c = "([\\/?#])",
        d = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        g = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        m = "　-〿＀-￯",
        f = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        p = "[" + d + f + g + m + "]",
        _ = "(?:\\(|\\[)[" + a + "\\d&#%;,]+(?:\\)|\\])",
        h = "(" + c + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + p + "+|" + _ + "){0,200})?",
        v = i + u + h,
        b = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
        y = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        w = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        C = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
        E = t.ARROW_DOWN = 40,
        k = t.PAGE_UP = 33,
        T = t.PAGE_DOWN = 34,
        S = t.END_KEY = 35,
        I = t.HOME = 36,
        A = t.ENTER = 13,
        M = t.ESC = 27,
        L = (t.UNPRINTABLE_KEYS = [C, E, k, T, A, M, S, I], t.UP_DOWN_CONTROLS = [k, T, E, C, I, S], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        P = t.FOLDER_ALL = "all",
        O = t.FOLDER_UNRESPOND = "unrespond",
        D = t.FOLDER_IMPORTANT = "important",
        x = (t.FOLDERS = [P, L, O, D], t.FOLDER_MASKS = (r = {}, n(r, O, 2), n(r, D, 1), r), t.TOP_DOMAINS = [].concat(b.split(","), y.split(","), w.split(",").map(function(e) {
            return "xn--" + e
        }))),
        R = (t.MAX_DOMAIN_LENGTH = x.reduce(function(e, t) {
            return Math.max(e, t.length)
        }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + o + s + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(v, "ig"), "#"),
        N = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
        B = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
        F = "(?:[" + N + "]|" + B + ")",
        H = "(?:[" + N + "_\\d]|" + B + ")",
        j = "(" + R + H + "{0,100}" + F + H + "{0,100})",
        U = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)";
    t.RE_HASHTAG_EXTRACTION_PATTERN = "(^|[s.,:'\";>)(]?)(" + j + ")(@" + U + ")?(?=$|[s.,:'\"&;?<)(]?)"
}, function(e, t, n) {
    var r = n(24),
        a = n(195);
    e.exports = n(237) ? function(e, t, n) {
        return r.f(e, t, a(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, , , function(e, t, n) {
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
        return {
            queues: t,
            opts: e.opts
        }
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

    function m(e, t, n) {
        var r = g(e, n);
        return r.pause = t, Promise.resolve(n)
    }

    function f(e, t, n) {
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
        return n && n.store ? (r.setState(o(r.get())), p(r)) : p(r), {
            pushMessage: function(n, a) {
                return r.set(f.bind(null, n, a)).then(function(r) {
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
                r.set(m.bind(null, e, !0))
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
                r.set(m.bind(null, n, !1)).then((0, b.pause)(.1)).then(function() {
                    u(n, e, t, r)
                })
            },
            inspectQueue: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
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
    var h = n(198),
        v = r(h),
        b = n(246)
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

    function a(e, t, n, r, a, i) {
        return {
            focus: function(e) {
                uiSearch.focus(t), l(e, t, n, r)
            },
            changePeer: function(e, n) {
                uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
            },
            search: function() {
                i({})
            },
            unmount: function() {
                (0, f.destroyModule)(a), cancelStackFilter(p), r.then(function(e) {
                    return e.destroy()
                })
            }
        }
    }

    function i(e, t, n, r) {
        e.set(m.setCurrentSearchDate.bind(null, e.get().peer, r.d + "." + r.m + "." + r.y)).then(s.bind(null, e, t, n))
    }

    function o(e, t) {
        e.then(function(e) {
            triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
        })
    }

    function s(e, t, n) {
        var r = e.get().peer;
        uiSearch.showProgress(n), (0, m.searchMessagesInplace)(r, e.get()).then(function(r) {
            uiSearch.hideProgress(n), t().insertSearch(r, e)
        })["catch"](function() {
            uiSearch.focus(n), uiSearch.hideProgress(n)
        })
    }

    function l(e, t, n, r) {
        cancelStackPush(p, c.bind(null, e, t, n, r))
    }

    function u(e, t, n, r, a, i) {
        if ("keyup" !== i.type || 13 == i.which) {
            var o = clean(uiSearch.getFieldEl(t).value);
            e.set(m.setCurrentSearch.bind(null, o, e.get().peer)).then(a.bind(null, e, r, t))
        }
    }

    function c(e, t, n, r) {
        cancelStackFilter(p), r.then(function(e) {
            e.hide()
        }), e.set(m.cancelSearch.bind(null, e.get().peer)).then(function() {
            uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
        })
    }

    function d(e, t, n, r) {
        n.then(function(e) {
            e.hide()
        }), e.set(m.clearDate.bind(null, e.get().peer)).then(s.bind(null, e, t, r))
    }

    function g(e, t, n) {
        var l = geByClass1(h, e),
            g = geByClass1(v, e),
            m = i.bind(null, t, n, g),
            p = r(t, e, l, m),
            C = o.bind(null, p, e),
            E = u.bind(null, t, g, l, n, debounce(s, 300)),
            k = c.bind(null, t, g, n, p),
            T = d.bind(null, t, n, p, g),
            S = (0, f.createModule)({
                handlers: function(t, n) {
                    t(geByClass1(_, e), "click", C), t(uiSearch.getFieldEl(g), "keyup", E), t(geByClass1(b, e), "click", E), t(geByClass1(y, e), "click", k), n(e, "click", w, T)
                }
            });
        return a(e, g, n, p, S, E)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var m = n(122),
        f = n(121),
        p = "im_hist_search",
        _ = "_im_search_date",
        h = "_im_search_date_input",
        v = "_im_search_history_input",
        b = "_im_start_inplace_search",
        y = "_im_cancel_inplace_search",
        w = "_im_clear_date"
}, function(e, t, n) {
    var r = n(163),
        a = n(189),
        i = n(31),
        o = n(179)("src"),
        s = "toString",
        l = Function[s],
        u = ("" + l).split(s);
    n(89).inspectSource = function(e) {
        return l.call(e)
    }, (e.exports = function(e, t, n, s) {
        var l = "function" == typeof n;
        l && (i(n, "name") || a(n, "name", t)), e[t] !== n && (l && (i(n, o) || a(n, o, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : a(e, t, n) : (delete e[t], a(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || l.call(this)
    })
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
    var r = n(19),
        a = n(1)("iterator"),
        i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[a] === e)
    }
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t ? void ls.set(e, t) : ls.get(e)
    }

    function a(e) {
        try {
            var t = {};
            return Error.captureStackTrace(t, e), t.stack
        } catch (n) {
            return ""
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = debounce(r, 300),
            o = extend({}, e),
            s = [];
        return t.store && (o = ls.get(t.key) || o), {
            get: function() {
                return o
            },
            set: function(e) {
                var r = this,
                    s = (0, i.isWeirdLogging)() ? a(this.set) : null;
                return e(o).then(function(e) {
                    return o = e, t.store && n(t.key, e), r
                })["catch"](function(e) {
                    return (0, i.imWeirdCatch)("store_set_catch", e, {
                        stack: s
                    })
                })
            },
            setState: function(e) {
                return this.set(function(t) {
                    return Promise.resolve(extend(t, e))
                })
            },
            stash: function() {
                s.push(o), o = extend({}, e)
            },
            reset: function() {
                o = extend({}, e)
            },
            unmount: function() {
                o = {}, e = !1
            },
            pop: function() {
                s.length > 0 && (o = s.pop())
            },
            mutate: function(e) {
                e(o), t.store && n(t.key, o)
            }
        }
    };
    var i = n(130)
}, , function(e, t, n) {
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
    var i = n(160),
        o = n(122),
        s = 5e3,
        l = 54e6,
        u = 72e5
}, function(e, t, n) {
    var r = n(230)("keys"),
        a = n(179);
    e.exports = function(e) {
        return r[e] || (r[e] = a(e))
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = o({}, i.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = i.toStr(t);
        i.setLoc(n)
    }

    function r() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = o(e, t)
            },
            commitNav: function() {
                n(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = o(e, t), setTimeout(function() {
                    n(e), e = {}
                }, r)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = n, t.updateLazyLocation = r;
    var a = window,
        i = a.nav,
        o = a.extend
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
                K = e
            }

            function u(e) {
                $ = e
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

            function m() {
                var e = new MessageChannel;
                return e.port1.onmessage = p,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function f() {
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
                    var e = n(45);
                    return W = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return f()
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
                    $(function() {
                        R(r, a, o, i)
                    })
                } else P(n, a, e, t);
                return a
            }

            function v(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(b);
                return I(n, e), n
            }

            function b() {}

            function y() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function w() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function C(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function E(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (a) {
                    return a
                }
            }

            function k(e, t, n) {
                $(function(e) {
                    var r = !1,
                        a = E(n, t, function(n) {
                            r || (r = !0, t !== n ? I(e, n) : M(e, n))
                        }, function(t) {
                            r || (r = !0, L(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && a && (r = !0, L(e, a))
                }, e)
            }

            function T(e, t) {
                t._state === se ? M(e, t._result) : t._state === le ? L(e, t._result) : P(t, void 0, function(t) {
                    I(e, t)
                }, function(t) {
                    L(e, t)
                })
            }

            function S(e, t, n) {
                t.constructor === e.constructor && n === ae && constructor.resolve === ie ? T(e, t) : n === ue ? L(e, ue.error) : void 0 === n ? M(e, t) : s(n) ? k(e, t, n) : M(e, t)
            }

            function I(e, t) {
                e === t ? L(e, y()) : o(t) ? S(e, t, C(t)) : M(e, t)
            }

            function A(e) {
                e._onerror && e._onerror(e._result), O(e)
            }

            function M(e, t) {
                e._state === oe && (e._result = t, e._state = se, 0 !== e._subscribers.length && $(O, e))
            }

            function L(e, t) {
                e._state === oe && (e._state = le, e._result = t, $(A, e))
            }

            function P(e, t, n, r) {
                var a = e._subscribers,
                    i = a.length;
                e._onerror = null, a[i] = t, a[i + se] = n, a[i + le] = r, 0 === i && e._state && $(O, e)
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
                    if (a = x(n, r), a === ce ? (l = !0, i = a.error, a = null) : o = !0, t === a) return void L(t, w())
                } else a = r, o = !0;
                t._state !== oe || (u && o ? I(t, a) : l ? L(t, i) : e === se ? M(t, a) : e === le && L(t, a))
            }

            function N(e, t) {
                try {
                    t(function(t) {
                        I(e, t)
                    }, function(t) {
                        L(e, t)
                    })
                } catch (n) {
                    L(e, n)
                }
            }

            function B(e) {
                return new _e(this, e).promise
            }

            function F(e) {
                function t(e) {
                    I(a, e)
                }

                function n(e) {
                    L(a, e)
                }
                var r = this,
                    a = new r(b);
                if (!Q(e)) return L(a, new TypeError("You must pass an array to race.")), a;
                for (var i = e.length, o = 0; a._state === oe && i > o; o++) P(r.resolve(e[o]), void 0, t, n);
                return a
            }

            function H(e) {
                var t = this,
                    n = new t(b);
                return L(n, e), n
            }

            function j() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function U() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function G(e) {
                this._id = fe++, this._state = void 0, this._result = void 0, this._subscribers = [], b !== e && ("function" != typeof e && j(), this instanceof G ? N(this, e) : U())
            }

            function q(e, t) {
                this._instanceConstructor = e, this.promise = new e(b), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? M(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && M(this.promise, this._result))) : L(this.promise, this._validationError())
            }

            function z() {
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
            var V;
            V = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var W, K, Y, Q = V,
                X = 0,
                $ = function(e, t) {
                    re[X] = e, re[X + 1] = t, X += 2, 2 === X && (K ? K(p) : Y())
                },
                Z = "undefined" != typeof window ? window : void 0,
                J = Z || {},
                ee = J.MutationObserver || J.WebKitMutationObserver,
                te = "undefined" != typeof e && "[object process]" === {}.toString.call(e),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            Y = te ? c() : ee ? g() : ne ? m() : void 0 === Z ? _() : f();
            var ae = h,
                ie = v,
                oe = void 0,
                se = 1,
                le = 2,
                ue = new D,
                ce = new D,
                de = B,
                ge = F,
                me = H,
                fe = 0,
                pe = G;
            G.all = de, G.race = ge, G.resolve = ie, G.reject = me, G._setScheduler = l, G._setAsap = u, G._asap = $, G.prototype = {
                constructor: G,
                then: ae,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var _e = q;
            q.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, q.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === oe && e > n; n++) this._eachEntry(t[n], n)
            }, q.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ie) {
                    var a = C(e);
                    if (a === ae && e._state !== oe) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof a) this._remaining--, this._result[t] = e;
                    else if (n === pe) {
                        var i = new n(b);
                        S(i, e, a), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, q.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === oe && (this._remaining--, e === le ? L(r, n) : this._result[t] = n), 0 === this._remaining && M(r, this._result)
            }, q.prototype._willSettleAt = function(e, t) {
                var n = this;
                P(e, void 0, function(e) {
                    n._settledAt(se, t, e)
                }, function(e) {
                    n._settledAt(le, t, e)
                })
            };
            var he = z,
                ve = {
                    Promise: pe,
                    polyfill: he
                };
            n(138).amd ? (r = function() {
                return ve
            }.call(t, n, t, i), !(void 0 !== r && (i.exports = r))) : "undefined" != typeof i && i.exports ? i.exports = ve : "undefined" != typeof this && (this.ES6Promise = ve), he()
        }).call(this)
    }).call(t, n(16), function() {
        return this
    }(), n(142)(e))
}, function(e, t, n) {
    var r = n(31),
        a = n(168),
        i = n(201)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = a(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
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
            var r = (0, D.getMessage)(t, n, e);
            return (0, x.isImportant)(r)
        }).reduce(function(e, t) {
            return e && t
        }, !1)
    }

    function i(e, t) {
        var n = t.get(),
            r = n.peer,
            a = n.tabs[r].pinned;
        return 1 === e.length && a && e[0] === (0, D.parserMessage)(a).messageId
    }

    function o(e, t) {
        var n = e.get().peer,
            r = geByClass1("_im_page_peer_online", t);
        r && (0, P.isUserPeer)(n) && (0, D.getTab)(e, n) && (0, P.applyInnerHtml)(r, (0, P.getLastSeenTextInHeader)(e, n))
    }

    function s(e, t, n) {
        geByClass("_im_header_icon", e).forEach(function(e) {
            if (n.length > 0) hide(e);
            else if ("star" === domData(e, "type") && (0, P.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", (0, P.isImportant)(t)), setStyle(e, {
                    display: "inline-block"
                })), "answer" === domData(e, "type") && (0, P.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", (0, P.isUnrespond)(t)), (0, P.isUnrespond)(t) ? setStyle(e, {
                    display: "inline-block"
                }) : hide(e)), "search" === domData(e, "type") && !(0, P.isCommunityInterface)(t)) {
                var r = (0, P.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                setStyle(e, {
                    display: "inline-block"
                }), toggleClass(e, "im-page-header-icon_search-shown", r)
            }
        })
    }

    function l(e, t, n) {
        var r = getLang("mail_selected_shorted", t.length);
        m({
            actions: !0
        }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
            label: r.replace("{count}", t.length),
            tip: getLang("mail_deselect_all")
        }));
        var o = (0, D.getTab)(n, n.get().peer),
            s = geByClass1(G, e),
            l = a(t, n, n.get().peer),
            u = i(t, n),
            c = (0, P.isChatPeer)(o.peerId) && (!(0, B.doesChatTabHaveFlag)(o, B.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN) || (0, B.isUserAdminInChat)(o, n.get().id));
        toggleClass(s, "im-page--mess-actions_important", !l), toggleClass(s, "im-page--mess-actions_pinned", u), toggleClass(s, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(s, "im-page--mess-actions_no-pin-btn", !c);
        var d = l ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
            g = u ? getLang("mail_unpin") : getLang("mail_pin");
        attr(geByClass1("im-page-action_star", e), "aria-label", d), attr(geByClass1("im-page-action_pin", e), "aria-label", g)
    }

    function u(e, t, n) {
        var a = t.get(),
            i = a.peer,
            o = a.tabs[i],
            l = clean(stripHTML(unclean(o.tab))),
            f = geByClass1(V, e),
            p = geByClass1(P.PINNED_CONTAINER_CLASS);
        f.tt = !1;
        var _ = (0, P.renderPhotosFromTab)(t, o, !0),
            h = getTemplate("im_simple_link", {
                href: o.href,
                content: getTemplate("im_peer_photo", {
                    online_class: "",
                    owner_photo: _,
                    modifier_class: "nim-peer_smaller"
                })
            });
        val(geByClass1("im-page--aside-photo", e), h);
        var v = (0, P.isChatPeer)(i),
            b = v ? !o.data.closed && !o.data.kicked : 0,
            y = {
                muted: inArray(i, a.mutedPeers),
                verified: !!o.verified,
                chat: v,
                actions: !1,
                derelict: v && !b,
                pinned: !1
            };
        if (v) {
            var w = (0, D.getPinnedMessage)(t),
                C = d(t);
            w && (0, N.isPinnedMessageVisibleInTab)(t, i) && (C ? t.set(L.loadChatMember.bind(null, r({}, i, [C]))).then(u.bind(null, e, t, n)) : y.pinned = !0)
        }
        var E = "";
        v ? E = b ? getTemplate("im_chat_members", {
            name: getLang("mail_im_n_chat_members", (0, P.getAliveMembersCount)(o))
        }) : "" : (0, P.isUserPeer)(i) && (E = (0, P.getLastSeenTextInHeader)(t, i));
        var k = getTemplate("im_simple_name", {
            name: o.tab,
            href: o.href,
            name_attr: l,
            ads_union: o.ad_union_ids_attr,
            online: E,
            more_cls: "" === E ? "im-page--title--1line" : ""
        });
        val(geByClass1("im-page--title-wrapper", e), k);
        var T = val(p),
            S = c(t),
            I = geByClass1(H, e);
        if (removeClass(I, P.DESELECT_ALL_CLASS), show(geByClass1(U, e)), removeClass(geByClass1(G, e), "im-page--mess-actions_visible"), removeClass(geByClass1(G, e), "im-page--mess-actions_all-sel"), s(e, t, []), (0, P.isClassicInterface)(t)) {
            var A = geByClass1("_im_page_back", e);
            attr(A, "href", (0, P.getBaseLink)(t) + "?tab=" + a.active_tab)
        }
        m(y, "im-page--chat-header"), g(t, S, T, n)
    }

    function c(e) {
        var t = (0, D.getPinnedMessage)(e),
            n = geByClass1(P.PINNED_CONTAINER_CLASS);
        if (removeClass(n, "im-page--pinned_with-bar"), t && (0, x.isMoneyRequest)(t)) {
            if (void 0 === t.kludges.attach1_tr_amount) return;
            t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
        }
        var r = (0, P.renderPinnedMessage)(e);
        return val(n, r), !!r
    }

    function d(e) {
        var t = (0, D.getPinnedMessage)(e);
        return !t || (0, R.oCacheGet)(e, t.userId) ? !1 : t.userId
    }

    function g(e, t, n, r) {
        var a = t && !n ? 1 : !t && n ? -1 : 0;
        a && !(0, P.isClassicInterface)(e) && r().compensateHistoryHeightChange(a)
    }

    function m(e, t) {
        var n = geByClass1(t);
        Object.keys(e).forEach(function(r) {
            toggleClass(n, t + "_" + r, !!e[r])
        })
    }

    function f(e, t, n, r, a) {
        e.set(L.removeMessagesWithRestore.bind(null, n, a, r)).then(t().removeMessagesRestore.bind(null, n, a, r)),
            (0, L.removeMessageSend)(n, a, (0, D.getTab)(e, a).hash, r, e.get().gid)
    }

    function p(e, t, n, r, o) {
        var s = e.get().selectedMessages,
            l = domData(o, "action"),
            u = e.get().peer,
            c = !0;
        switch (l) {
            case "delete":
                var d = vk.id == u && !e.get().gid,
                    g = !d && e.get().delAllAllowed && s.every(function(t) {
                        return (0, P.canMessageBeDeletedForAll)(e, (0, D.getMessage)(e, u, t))
                    });
                if (g) {
                    c = !1;
                    var m = (0, P.showMsgDeleteDialog)(u, s.length, function(r) {
                        y(e, t, n), m.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? (0, L.removeMessageSend)(s, u, (0, D.getTab)(e, u).hash, "deleteforall", e.get().gid) : f(e, t, s, l, u)
                    })
                } else f(e, t, s, l, u);
                break;
            case "spam":
                f(e, t, s, l, u);
                break;
            case "forward":
                (0, L.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(L.prepareForward.bind(null, t))
                }).then(function() {
                    (0, P.isClassicInterface)(e) ? (cancelStackPush("forward", function(t) {
                        e.set(L.prepareForward.bind(null, null)).then(function() {
                            e.get().longpoll.push([(0, O.changePeer)(t)])
                        })
                    }.bind(null, e.get().peer)), e.get().longpoll.push([(0, O.resetPeer)(!0)])) : t().startForward(e)
                });
                break;
            case "star":
                var p = a(s, e, u);
                e.set(L.favMessage.bind(null, s, p, u)), e.get().longpoll.push(s.map(function(e) {
                    return {
                        type: p ? O.SET_FLAGS : O.RESET_FLAGS,
                        messageId: e,
                        peerId: u,
                        flags: O.FLAG_IMPORTANT
                    }
                }));
                break;
            case "respond":
                (0, L.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(L.forwardMessages.bind(null, t, e.get().tfdraft))
                }).then(function() {
                    t().respond(e, u)
                });
                break;
            case "pin":
                var _ = (0, D.getLocalId)(e, s[0]),
                    h = i(s, e),
                    v = h ? L.unpinMessageOptimistic.bind(null, u) : L.pinMessageOptimistic.bind(null, _, u),
                    b = h ? L.unpinMessage.bind(null, u) : L.pinMessage.bind(null, _, u),
                    w = T.bind(null, t, u);
                e.set(L.checkChatMember.bind(null, e, _, u)).then(function(e) {
                    return e.set(v)
                }).then(w).then(function(e) {
                    return e.set(b)
                }).then(w)
        }
        c && y(e, t, n)
    }

    function _(e, t, n, r, a, i) {
        if ("keydown" !== i.type || 13 === i.which) {
            var o = trim(val(a));
            return o ? (o !== n && e.set(L.updateChatTopic.bind(null, t, o)), !0) : (notaBene(a), !1)
        }
    }

    function h(e, t, n) {
        var r = showFastBox({
            title: getLang("mail_chat_invite_link"),
            dark: 1
        }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(a) {
            var i = gpeByClass("_im_invite_box", n.target),
                o = geByClass1(Q, i),
                s = geByClass1("_im_invite_new", i);
            lockButton(r.btns.ok[0]), (0, L.resetInviteLink)(t - 2e9, e.get()).then(function(e) {
                var t = A(e, 1),
                    n = t[0];
                unlockButton(r.btns.ok[0]), o.value = n, unlockButton(s), addClass(i, "im-invite-box_reseted"), elfocus(o, 0, n.length), r.hide()
            })
        }, getLang("global_cancel"), function() {
            r.hide()
        })
    }

    function v(e, t, n) {
        if ((0, P.isChatPeer)(t)) {
            var r = e.get().tabs[t].name,
                a = _.bind(null, e, t, r, n),
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
                o = geByClass1(z, i.bodyNode);
            elfocus(o), addEvent(o, "keydown", function(e) {
                var t = a(o, e);
                t && i.hide()
            })
        }
    }

    function b(e, t, n, r, a, i) {
        var o = domData(i, "action"),
            s = geByClass1(j, r).parentNode,
            l = e.get().peer;
        switch (o) {
            case "clear":
                var u = (0, P.showFlushDialog)(l, function() {
                    (0, P.cleanHistory)(e, u, t, L.flushHistory, e.get().peer)
                });
                break;
            case "photos":
            case "media":
                showWiki({
                    w: "history" + (0, P.convertPeerToUrl)(l) + "_photo"
                }, null, {});
                break;
            case "topic":
                v(e, l, t);
                break;
            case "avatar":
                cur.recieveCropResult = void 0, Page.ownerPhoto(l);
                break;
            case "search":
                t().showSearch(e);
                break;
            case "block_community":
                e.set(L.toggleCommunityMessages.bind(null, !1, l)).then(function() {
                    e.get().longpoll.push([(0, O.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                });
                break;
            case "allow_community":
                e.set(L.toggleCommunityMessages.bind(null, !0, l)).then(function() {
                    n().changeActions(e)
                });
                break;
            case "block":
                var c = (0, P.showBlacklistBox)(l, e);
                c.once("success", function(t) {
                    t.delta && (showDoneBox(t.msg), e.get().longpoll.push([(0, O.resetPeer)()]))
                });
                break;
            case "leave":
                var d = showFastBox({
                    title: getLang("mail_chat_leave_title"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang("mail_chat_leave_confirm"), getLang("mail_leave_chat"), function() {
                    e.set(L.leaveChat.bind(null, l)), e.set(L.unpinMessageOptimistic.bind(null, l)), d.hide(), e.get().longpoll.push([(0, O.resetPeer)()])
                }, getLang("global_cancel"), function() {
                    d.hide()
                });
                break;
            case "invite_link":
                var g = h.bind(null, e, l),
                    m = !1,
                    f = !1,
                    p = !1,
                    _ = function() {
                        elfocus(m, 0, m.value.length), document.execCommand("copy"), setStyle(f, {
                            opacity: 1
                        }), p && (p = clearTimeout(p)), p = setTimeout(function() {
                            return setStyle(f, {
                                opacity: 0
                            })
                        }, 2e3)
                    },
                    b = !1,
                    y = !1;
                showBox("al_im.php", {
                    act: "a_get_invite_link",
                    chat_id: l - 2e9
                }, {
                    onDone: function(e) {
                        m = geByClass1(Q, e.bodyNode), b = geByClass1("_im_reset_link", e.bodyNode), y = geByClass1("_im_invite_copy", e.bodyNode), f = geByClass1("_im_invite_copied", e.bodyNode), elfocus(m, 0, m.value.length), addEvent(b, "click", g), addEvent(y, "click", _)
                    },
                    params: {
                        hideButtons: !0,
                        onHide: function() {
                            removeEvent(b, "click", g), removeEvent(y, "click", _)
                        },
                        onShow: function() {
                            addEvent(b, "click", g), addEvent(y, "click", _)
                        }
                    }
                }, {});
                break;
            case "return":
                e.set(L.returnToChat.bind(null, l)).then(function(e) {
                    return e.set(L.getPinnedMessage.bind(null, l))
                }).then(t().updateChatTopic.bind(null, l))["catch"](function(e) {
                    showFastBox(getLang("global_error"), e)
                });
                break;
            case "unmute":
            case "mute":
                var w = "mute" === o ? 1 : 0;
                e.set(L.toggleMutePeer.bind(null, l, w)).then(t().updateState.bind(null, l));
                break;
            case "chat":
            case "invite":
                if ((0, P.isChatPeer)(l))(0, P.inviteUser)(e, l, t, L.setCreationType);
                else if ((0, P.isUserPeer)(l)) {
                    var C = e.get().tabs[l],
                        E = [
                            [l, C.tab]
                        ];
                    e.set(L.setCreationType.bind(null, "chat", [])).then(function() {
                        return t().showCreation(e, E)
                    })
                }
                break;
            case "pin_hide":
                (0, N.pinnedMessageHide)(e, (0, D.getPeer)(e), t);
                break;
            case "pin_unhide":
                (0, N.pinnedMessageUnHide)(e, (0, D.getPeer)(e), t);
                break;
            case "unpin":
                (0, N.pinnedMessageUnpin)(e, (0, D.getPeer)(e), t)
        }
        uiActionsMenu.toggle(s, !1), t().cancelEditing()
    }

    function y(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(L.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
    }

    function w(e, t, n, r) {
        var a = (0, P.isClassicInterface)(e),
            i = void 0,
            o = void 0;
        switch (domData(r, "type")) {
            case "star":
                o = [4, 6], i = function() {
                    return (0, P.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
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

    function C(e, t, n) {
        var r = (0, P.isClassicInterface)(e),
            a = domData(n.target, "action");
        "respond" !== a && "forward" !== a && showTooltip(n.target, {
            text: E.bind(null, e, a) || "",
            black: 1,
            shift: [2, r ? -4 : 11],
            forcetodown: !0,
            appendParentCls: "_im_dialog_actions"
        })
    }

    function E(e, t) {
        var n = e.get(),
            r = n.selectedMessages,
            o = n.peer;
        switch (t) {
            case "pin":
                return i(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
            case "star":
                return a(r, e, o) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
            case "delete":
                return getLang("mail_delete");
            case "spam":
                return getLang("mail_im_mark_spam")
        }
    }

    function k(e, t, n, r, a) {
        var i = domData(a, "type");
        switch (i) {
            case "star":
                e.set(L.toggleDialogImportant.bind(null, e.get().peer)).then(function() {
                    setTimeout(function() {
                        return w(e, t, r, a)
                    }, 40)
                });
                break;
            case "search":
                n().showSearch(e), window.tooltips && tooltips.hide(a, {
                    fasthide: !0
                });
                break;
            case "answer":
                var o = (0, D.getTab)(e, e.get().peer);
                o && (e.set(L.markDialogAnswered.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), e.get().longpoll.push([(0, O.resetPeer)()]))
        }
    }

    function T(e, t, n) {
        return e().updateChatTopic(t, n), n
    }

    function S(e, t, n, r) {
        return {
            changeActions: function(t) {
                var n = geByClass1(j, e),
                    r = geByClass1(U, e),
                    a = t.get().curActions,
                    i = Object.keys(a).map(function(e, t) {
                        var n = "";
                        return 7 !== L.ACTION_PRIORITIES[e] && 10 !== L.ACTION_PRIORITIES[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(X, {
                            name: a[e].name,
                            icon: a[e].icon,
                            action: e
                        })
                    }).join("");
                0 === Object.keys(a).length ? addClass(r, "im-page--header-more_loading") : (val(n, i), removeClass(r, "im-page--header-more_loading"))
            },
            renderPeer: function(n) {
                u(e, n, t)
            },
            reRenderPinned: function(e) {
                var t = (0, D.getCurrentTab)(e);
                t && t.pinned && c(e)
            },
            renderActions: function(t) {
                var n = t.get().selectedMessages || [];
                n.length > 0 && l(e, n, t)
            },
            hideActions: function(t) {
                if (!(0, P.isFullyLoadedTab)(t, t.get().peer)) {
                    var n = geByClass1(U, e);
                    addClass(n, "im-page--header-more_loading")
                }
            },
            changedMessageSelection: function(n) {
                if (0 !== n.get().peer) {
                    var r = n.get().selectedMessages || [];
                    r.length > 0 ? l(e, r, n) : u(e, n, t)
                }
            },
            updateLastSeen: function(t) {
                o(t, e)
            },
            deselectAll: function(e) {
                y(e, t, r)
            },
            unmount: function() {
                (0, M.destroyModule)(n), cancelStackFilter("fowrward")
            }
        }
    }

    function I(e, t, n) {
        var r = (0, M.createMutations)(S),
            a = r.callMutations,
            i = r.bindMutations,
            o = p.bind(null, t, n, a),
            s = b.bind(null, t, n, a, e),
            l = y.bind(null, t, n, a),
            u = function(e, n) {
                return (0, P.showVerifiedTooltip)(n, t.get().peer)
            },
            c = w.bind(null, t, e),
            d = C.bind(null, t, e),
            g = k.bind(null, t, e, n),
            m = function(r) {
                gpeByClass(W, r.target, e) && !checkEvent(r) && ((0, P.showChatMembers)(t, n, L.setCreationType), cancelEvent(r))
            },
            f = (0, M.createModule)({
                handlers: function(r, a) {
                    a(e, "click", q, o), a(e, "click", F, s), a(e, "click", P.DESELECT_ALL_CLASS, l), a(e, "mouseover", V, u), a(e, "mouseover", "_im_header_icon", c), a(e, "mouseover", q, d), a(e, "click", "_im_header_icon", g), a(e, "click", "_im_header_link", m), a(e, "click", K, m), a(e, "click", Y, function(e) {
                        return (0, P.showChatMembers)(t, n, L.setCreationType)
                    }), a(e, "click", "_im_page_back", function(e) {
                        checkEvent(e) || (t.get().longpoll.push([(0, O.resetPeer)()]), cancelEvent(e))
                    })
                }
            });
        return (0, P.isReservedPeer)(t.get().peer) || setTimeout(function() {
            t.set(L.setActions).then(a().changeActions)
        }), i(e, n, f, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var A = function() {
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
    t.mount = I;
    var M = n(121),
        L = n(122),
        P = n(160),
        O = n(55),
        D = n(144),
        x = n(214),
        R = n(175),
        N = n(207),
        B = n(8),
        F = "_im_action",
        H = "_im_page_peer_name",
        j = "_ui_menu",
        U = "_im_dialog_action_wrapper",
        G = "_im_mess_actions",
        q = "_im_page_action",
        z = "_im_chat_topic_change_input",
        V = "_im_chat_verified",
        W = "im-page--chat-header_chat",
        K = "_im_page_peer_name",
        Y = "_im_chat_members",
        Q = "_im_chat_invite_link",
        X = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + F + ' im-action im-action_%icon%" data-action="%action%">%name%</a>'
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ((0, h.unpackStore)(e).searchShown) return !1;
        var n = (0, h.getTab)(e, t),
            r = n && (0, h.parserMessage)(n.pinned);
        return r ? n.pinHideId != r.chat_local_id : !1
    }

    function a(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t),
            i = a && (0, h.parserMessage)(a.pinned);
        a && i && (a.pinHideId = i.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, a.pinHideId]), l(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t);
        a && a.pinHideId && (delete a.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, void 0]), l(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function o(e, t, n) {
        var r = l.bind(null, n, t),
            a = (0, _.showUnpinDialog)(function() {
                a.hideProgress(), a.hide(), e.set(m.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                    return e.set(m.unpinMessage.bind(null, t))
                }).then(r)
            })
    }

    function s(e, t, n) {
        var r = e.get(),
            i = r.peer,
            o = (0, h.parserMessage)((0, h.getTab)(e, i).pinned);
        if (n.target.classList.contains(y)) o && a(e, i, t);
        else if ("A" !== n.target.tagName) {
            var s = o && o.messageId;
            if (s && !(0, _.isAlreadyDeleted)(e, i, s)) {
                var l = e.get(),
                    u = (0, h.getMessage)(e, i, s);
                u ? (e.setState({
                    msgid: s
                }), (0, v.updateLocation)({
                    msgid: s
                }), t().focusOnMessage()) : l.longpoll.push([(0, f.changePeer)(i, s)])
            } else(0, _.showPinnedBox)(e, t, i, p.mount, n);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function l(e, t, n) {
        return e().updateChatTopic(t, n), (0, m.setActions)(n.get()), e().updateActions(n), n
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

    function c(e) {
        return {
            unmount: function() {
                (0, g.destroyModule)(e)
            }
        }
    }

    function d(e, t, n) {
        var r = (0, g.createMutations)(c),
            a = r.bindMutations,
            i = s.bind(null, t, n),
            o = u.bind(null),
            l = (0, g.createModule)({
                handlers: function(t, n) {
                    n(e, "click", w, i), n(e, "mouseover", y, o)
                }
            });
        return a(l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isPinnedMessageVisibleInTab = r, t.pinnedMessageHide = a, t.pinnedMessageUnHide = i, t.pinnedMessageUnpin = o, t.mount = d;
    var g = n(121),
        m = n(122),
        f = n(55),
        p = n(145),
        _ = n(160),
        h = n(144),
        v = n(202),
        b = n(32),
        y = "_im_pin_hide",
        w = "_im_pinned_message"
}, function(e, t, n) {
    "use strict";
    var r = n(163),
        a = n(24),
        i = n(237),
        o = n(1)("species");
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
    "use strict";

    function r(e, t, n) {
        var r = intval(domData(n, "msgid"));
        if (!getSelectionText() && !(0, c.checkSelectClick)(t)) {
            var a = intval(domData(n, "peer"));
            return e.set(u.cancelSearch.bind(null, a)), e.get().longpoll.push([(0, d.changePeer)(a, r)]), !1
        }
    }

    function a(e) {
        return (0, u.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : (0, u.searchMessagesInplace)(e.get().peer, e.get())
    }

    function i(e, t) {
        return {
            isAll: function(e) {
                return (0, u.isSearchAllLoaded)(e.get().peer, e.get())
            },
            loadMore: function(e) {
                return a(e)
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function o(e) {
        return e.findIndex(function(e) {
            return "number" == typeof e.peerId && e.href
        }) > -1
    }

    function s(e, t) {
        var n = r.bind(null, t),
            a = (0, l.createModule)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            });
        return i(e, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.doesSearchResultContainConversations = o, t.mount = s;
    var l = n(121),
        u = n(122),
        c = n(160),
        d = n(55)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, , function(e, t, n) {
    var r = n(37),
        a = n(1)("iterator"),
        i = n(19);
    e.exports = n(89).getIteratorMethod = function(e) {
        return void 0 != e ? e[a] || e["@@iterator"] || i[r(e)] : void 0
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.screenfull = function() {
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
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return "number" != typeof t.messageId ? !0 : i(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
    }

    function i(e) {
        return e.flags & y.FLAG_OUTBOUND
    }

    function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = e.attaches[0];
        return r && (r.type === t || r.type === n)
    }

    function s(e) {
        return o(e, "doc") && "graffiti" === e.attaches[0].kind
    }

    function l(e) {
        return o(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function u(e) {
        return o(e, "sticker")
    }

    function c(e) {
        return o(e, "gift")
    }

    function d(e) {
        return o(e, "money_transfer", "money_request")
    }

    function g(e) {
        return o(e, "money_request")
    }

    function m(e) {
        return o(e, "link") && f(e.kludges.attach1_url)
    }

    function f(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || n.test(e)
    }

    function p(e) {
        return e.flags & y.FLAG_IMPORTANT
    }

    function _(e) {
        return i(e) ? vk.id : e.userId
    }

    function h(e) {
        return e.update_time > 0
    }

    function v(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = a, t.isOut = i, t.isGraffiti = s, t.isAudioMsg = l, t.isSticker = u, t.isGift = c, t.isMoney = d, t.isMoneyRequest = g, t.isMessageWithInviteLink = m, t.isImportant = p, t.getUserId = _, t.wasEdited = h, t.isMessageSelected = v;
    var b = n(55),
        y = r(b)
}, , , , function(e, t, n) {
    var r = n(171),
        a = n(65);
    e.exports = Object.keys || function(e) {
        return r(e, a)
    }
}, , function(e, t, n) {
    var r = n(1)("iterator"),
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
}, , function(e, t) {
    e.exports = !1
}, , , , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    n(184);
    var a = n(126),
        i = n(198),
        o = r(i),
        s = n(203),
        l = n(55),
        u = n(122),
        c = n(175),
        d = n(160),
        g = n(130),
        m = n(245);
    window.IM = {
        init: function(e) {
            window.imwl = e.imwl, (0, g.startLoggingAllUnhandled)(), addTemplates(m), window.Promise || (window.Promise = s.Promise), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.tabbedPeers = (e.tabbedPeers || []).map(function(e) {
                return {
                    peer: e,
                    type: "perm"
                }
            }), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                blacklist_hash: e.thash
            };
            var t = 60 * (new Date).getTimezoneOffset(),
                n = -10800,
                r = n - t,
                i = e.timeshift;
            e.timeshift = i - r, e.oCache = {};
            var f = (0, o["default"])(e);
            e.owners.forEach(function(e) {
                return (0, c.oCacheAdd)(f, e)
            }), e.owners = void 0, (0, d.normalizeTabsGotFromServer)(f, f.get().tabs), window.store = f, cur.imClassicInterface = (0, d.isClassicInterface)(f);
            var p = (0, a.mount)(geByClass1("js-im-page", ge("page_body")), f);
            (0, u.updateMentions)(f.get()), window.IMBRIDGE = {
                chatPhotoSaved: function(e) {
                    curBox() && curBox().hide();
                    var t = (e || {})[1];
                    return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || f.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                },
                updateHistory: function(e) {
                    f.set(u.updateHistory.bind(null, e)).then(function() {
                        p.updateHistory(e)
                    })
                },
                activateTab: function(e) {
                    f.get().longpoll.push([(0, l.changePeer)(intval(e), !1, !1, !0)])
                }
            };
            var _ = !1;
            cur.nav.push(function() {
                if (_) return !0;
                f.get().audio_msg && f.get().audio_msg.isRecording && p.cancelRecording(), AudioMessagePlayer.detachPlayer();
                var t = p.route.apply(null, arguments);
                return t !== !1 && (p.unmount(), window.IMBRIDGE = void 0, f.unmount(), window.store = void 0, _ = !0, e = !1, f = !1, p = !1, (0, g.stopLoggingAllUnhandled)()), t
            })
        }
    };
    try {
        stManager.done("imn.js")
    } catch (f) {}
}, function(e, t, n) {
    "use strict";

    function r() {
        return {
            txt: "",
            attaches: [],
            urlBinds: []
        }
    }

    function a(e, t) {
        this._db = e, this._key = t, this.dData = r(), this.load()
    }

    function i(e) {
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

    function l(e, t) {
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
                fwd_count: (0, g.parseFwd)(e.fwd).length
            }
        });
        for (var r = 1; e["attach" + r + "_type"]; ++r) n.push({
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
        return new a(e, "draft_" + t)
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
    t.ImDraft = a, t.convertKludgesToAttaches = l, t.loadDraftForPeer = u;
    var d = n(136),
        g = n(104);
    a.prototype.dump = function() {
        this._key && this._db.updateByKey(this._key, o(this.dData))
    }, a.prototype.load = function() {
        if (this._key) {
            var e = this._db.selectByKey(this._key);
            e && (this.dData = s(e))
        }
    }, a.prototype.clear = function() {
        this.dData = r(), this.dump()
    }, a.prototype.setText = function(e) {
        this.dData.txt = trim(e), this.dump()
    }, a.prototype.addAttach = function(e, t, n) {
        ("share" === e || "mail" === e) && this.removeAttachByType(e);
        var r = this.dData.attaches.find(function(n) {
            return n.type === e && n.id === t
        });
        !r && e && t && (this.dData.attaches.push({
            type: e,
            id: t,
            object: n
        }), this.dump())
    }, a.prototype.syncWithSelector = function(e) {
        var t = this,
            n = this.getFwdRaw();
        this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
            var n = c(e, 2),
                r = n[0],
                a = n[1],
                i = t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == a
                });
            return i || {
                type: r,
                id: a
            }
        })), this.dump()
    }, a.prototype.removeAttachByType = function(e) {
        for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
        this.dump()
    }, a.prototype.removeAllAttaches = function() {
        this.dData.attaches = [], this.dump()
    }, a.prototype.addBindUrl = function(e, t, n) {
        this.getBoundAttach(e) || (this.dData.urlBinds.push({
            url: e,
            type: t,
            id: n
        }), this.dump())
    }, a.prototype.getBoundAttach = function(e) {
        var t = this.dData.urlBinds.find(function(t) {
            return t.url === e
        });
        return t ? this.dData.attaches.find(function(e) {
            return e.type === t.type && e.id === t.id
        }) || null : null
    }, a.prototype.getShareUrl = function() {
        var e = this.dData.attaches.find(function(e) {
            return "share" === e.type
        });
        return e && e.object ? e.object.url : void 0
    }, a.prototype.hasAttaches = function() {
        return this.dData.attaches.length > 0
    }, a.prototype.destroy = function() {
        this.dData = {}, this._key = this._db = null
    }, a.prototype.prepareObjects = function(e, t) {
        var n = this,
            r = this.dData.attaches.find(i);
        return r ? (0, d.post)(d.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = c(e, 1),
                r = t[0];
            n.dData.attaches = r.map(function(e) {
                return {
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }
            })
        }) : Promise.resolve()
    }, a.prototype.getFwdRaw = function() {
        return this.dData.attaches.find(function(e) {
            return "mail" === e.type
        })
    }, a.prototype.getFwdCount = function() {
        var e = this.getFwdRaw();
        return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
    }
}, , , function(e, t, n) {
    var r = n(163),
        a = "__core-js_shared__",
        i = r[a] || (r[a] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, , , , function(e, t) {
    "use strict";

    function n(e) {
        var t = o.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r = void 0, a = 0; a < n.length; a++) {
                    var s = i(n[a], 2),
                        l = s[0],
                        u = s[1],
                        c = void 0;
                    if (hasClass(e.target, l) ? c = u(e, e.target) : (r = gpeByClass(l, e.target, e.currentTarget)) && (c = u(e, r)), c === !1) break
                }
        }
    }

    function r(e, t, r, a) {
        var i = o.get(e);
        i || (o.set(e, {}), i = o.get(e));
        for (var s = t.split(" "), l = 0; l < s.length; l++) {
            var u = s[l];
            i[u] || (i[u] = [], addEvent(e, u, n)), i[u].push([r, a])
        }
    }

    function a(e, t, r, a) {
        var i = o.get(e);
        if (i) {
            t.split(" ").forEach(function(t) {
                i[t] && (i[t] = i[t].filter(function(e) {
                    return e[0] !== r || e[1] !== a
                }), 0 === i[t].length && removeEvent(e, t, n))
            });
            var s = Object.keys(i).map(function(e) {
                return i[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === s && o["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
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
    t.addDelegateEvent = r, t.removeDelegateEvent = a;
    var o = new window.Map
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, a) {
        return window.statlogsValueEvent(e, t, n, r, a)
    }

    function r(e) {
        return Math.random() < e
    }

    function a(e, t, a, i, o, s) {
        r(e) && n(a, i, o, s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.statlogsValueEvent = n, t.randEnabled = r, t.statlogsProbValueEvent = a
}, , function(e, t, n) {
    e.exports = !n(176)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    "use strict";
    var r = n(24).f,
        a = n(88),
        i = (n(189), n(143)),
        o = n(71),
        s = n(141),
        l = n(210),
        u = n(63),
        c = n(159),
        d = n(99),
        g = n(208),
        m = n(237),
        f = n(254).fastKey,
        p = m ? "_s" : "size",
        _ = function(e, t) {
            var n, r = f(t);
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
            }), m && r(d.prototype, "size", {
                get: function() {
                    return l(this[p])
                }
            }), d
        },
        def: function(e, t, n) {
            var r, a, i = _(e, t);
            return i ? i.v = n : (e._l = i = {
                i: a = f(t, !0),
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
}, , , function(e, t, n) {
    var r = n(102),
        a = n(163).document,
        i = r(a) && r(a.createElement);
    e.exports = function(e) {
        return i ? a.createElement(e) : {}
    }
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
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
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
        var n = (0, p.getBaseLink)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
            r = (0, p.getBareTab)(t.peer, e),
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
        return e.set(_.updateTabbedPeers.bind(null, o, !0)).then(function() {
            if (s(t, e), i === e.get().peer) e.get().longpoll.push([(0, h.resetPeer)()]);
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
            n.tab !== t.get().active_tab && attr(e, "href", (0, p.getBaseLink)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
        })
    }

    function u(e, t, n, r) {
        return {
            updateMenu: function(t) {
                l(e, t);
                var r = gpeByClass("_im_right_menu", e);
                s(n, t).then(function() {
                    var e = void 0;
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
                (0, v.destroyModule)(r), n.unmount()
            }
        }
    }

    function c(e, t, n) {
        1 === n.which && (e.get().peer && e.get().longpoll.push([(0, h.resetPeer)()]), e.get().longpoll.push([(0, h.changeTab)(t)]), cancelEvent(n))
    }

    function d(e, t, n) {
        var r = (0, g.mount)(e, (0, f["default"])({
                limit: 50,
                offset: 0,
                noScroll: !0,
                elements: a(t)
            }), function() {
                return {
                    idFn: function(e) {
                        return e.peer || "000"
                    },
                    renderFn: i.bind(null, t)
                }
            }),
            s = o.bind(null, t, r),
            l = (0, v.createModule)({
                handlers: function(n, r) {
                    r(e, "click", "_im_r_cl", s), r(e, "click", "_im_peer_tab", function(e, n) {
                        if (!checkEvent(e)) {
                            var r = intval(domData(n, "list-id"));
                            t.get().longpoll.push([(0, h.changePeer)(r, !1, !0, !0)]), cancelEvent(e)
                        }
                    }), b.FOLDERS.forEach(function(r) {
                        n(geByClass1("_ui_item_" + r, e.parentNode), "mousedown", c.bind(null, t, r))
                    })
                }
            });
        return u(e, t, r, l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var g = n(36),
        m = n(198),
        f = r(m),
        p = n(160),
        _ = n(122),
        h = n(55),
        v = n(121),
        b = n(188)
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

    function s(e) {
        for (var t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), a = new Uint8Array(r.length), i = 0; i < r.length; ++i) a[i] = r.charCodeAt(i);
        return a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = n, t.executionStackPop = r, t.lplog = a, t.toArray = i, t.arrayUnique = o, t.urlBase64ToUint8Array = s
}, function(e, t) {
    e.exports = {
        im_img_prebody: '<div class="im-prebody"> <img alt="" src="%photo%" /> </div>',
        im_admin_link: ' (<a href="%href%" class="_im_admin_name" target="_blank">%name%</a>)',
        im_right_menu_tpl: '<a id="ui_rmenu_peer_%peer%" href="%href%" class="_im_peer_tab ui_rmenu_item %cls%"%attrs%>\n  <span>%label%</span>\n</a>',
        im_right_menu_sep: '<div class="ui_rmenu_sep"></div>',
        im_right_menu_ct: '<span class="ui_rmenu_count im-right-menu--count _im_r_ct">%count%</span> <button type="button" class="im-right-menu--close _im_r_cl"></button><span class="im-right-menu--text _im_r_tx">%name%</span>',
        im_dialogs_link_img: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank"><div class="im_grid">%photo%</div></a>',
        im_dialogs_link: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank">%photo%</a>',
        im_peer_photo: '<div class="nim-peer %online_class% %modifier_class%"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> %owner_photo% </div> </div> </div>',
        im_owner_item: '<a href="%link%" class="olist_item_wrap%cls%" id="olist_item_wrap%owner_id%" >\n  <div class="olist_item clear_fix">\n    <div class="olist_item_photo_wrap %img_cls%">\n      <img class="olist_item_photo" src="%photo%"/>\n    </div>\n    <div class="olist_item_name">%name%</div>\n    <div class="olist_checkbox"></div>\n  </div>\n</a>',
        im_simple_name: '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> </div>',
        im_simple_link: '<a href="%href%" class="_im_header_link" target="_blank">%content%</a>',
        im_selected_messages: '<span class="im-page--selected-messages-count">%label%</span> <button aria-label="%tip%" type="button" class="im-page--selected-messages-remove"></button>',
        im_topic: "<div class='im-topic %cls%'>%topic%</div>",
        im_stack_date: ' <a href="%link%" class="_im_mess_link" >%date%</a>',
        im_dialogs_none: '<li data-list-id="002300" class="im-page--dialogs-empty"> %msg%</li>',
        im_filter: '<a class="im-page--dialogs-filter %cls%">%filter%</a>',
        im_drow_prebody: '<span class="nim-dialog--who">%prebody%</span> <span class="nim-dialog--inner-text">%body%</span>',
        im_attach_mess: ' <div class="im-fwd %modifier%"> <span class="im-fwd--title"> <span class="im-fwd--title-name">%text%</span> <span class="im-fwd--date">%date%</span></span> <span class="im-fwd--close _im_fwd_close"></span> <div rel="button" tab-index="0" type="button" class="im-fwd--messages _im_will_fwd">%messages%</div> </div>',
        im_preloader: '<div class="im-preloader %cls%"> %preloader%</div>',
        im_service_row: '<ul class="ui_clean_list"> <li class="im-mess im-mess_srv _im_mess _im_mess_srv _im_mess_%message_id%" data-msgid="%message_id%" data-from="%from_id%" data-ts="%date%"> <div class="im-mess--text">%text%</div> </li> </ul>',
        im_chat_members: '<button type="button" class="_im_chat_members im-page--members">%name%</button>',
        im_mess_stack: '<div class="im-mess-stack _im_mess_stack %cls%" data-peer="%peerId%" data-admin="%admin%"> <div class="im-mess-stack--photo"> <div class="nim-peer nim-peer_small fl_l"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> <a target="_blank" class="im_grid" href="%href%"><img alt="%name%" src="%photo%" /></a> </div> </div> </div> </div> <div class="im-mess-stack--content"> <div class="im-mess-stack--info"> <div class="im-mess-stack--pname"> %stack_name% <span class="im-mess-stack--tools">%date%</span> </div> </div> <ul class="ui_clean_list im-mess-stack--mess _im_stack_messages"> %messages% </ul> </div> </div>',
        im_mess_stack_name: '<a href="%link%" class="im-mess-stack--lnk%class%" title="" target="_blank">%name%</a>',
        im_message_media: '<div class="_im_msg_media%messageId%" class="wall_module">%attaches%</div>%text%',
        im_dialog_media: '<span class="nim-dialog--preview nim-dialog--preview-attach">%name%</span>',
        im_typing: '<div class="im-page--typing _im_typing"> <div class="im-typing %cls%"><div class="pr im-typing--icon" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><span class="_im_typing_name">&nbsp;</span></div> </div>',
        ctrl_submit_hint: function() {
            return '<div class="reply_submit_hint_wrap" >\n  <div class="reply_submit_hint_title">' + getLang("wall_reply_submit_settings") + '</div>\n  <div class="reply_submit_hint_opts" id="">\n    <div class="radiobtn %enter_on% _im_submit_btn" data-val="0" onclick="radiobtn(this, 0, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_1") + '</div></div>\n    <div class="radiobtn %ctrl_on% _im_submit_btn" data-val="1" onclick="radiobtn(this, 1, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_2") + "</div></div>\n  </div>\n</div>"
        },
        im_day_bar: '<h5 class="im-page--history-new-bar im-page--history-new-bar_days _im_bar_date %day_class%" data-date="%date%"><span>%day%</span></h5>',
        im_mess_bar: function() {
            return '<h4 class="im-page--history-new-bar _im_unread_bar_row"><span>' + getLang("mail_new_unread_msgs") + "</span></h4>"
        },
        im_drow: function() {
            return '<li data-list-id="%peer%" class="nim-dialog _im_dialog _im_dialog_%peer% %is_unread% %is_unread_out% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <div class="nim-dialog--date _im_dialog_date">%date%</div> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <button type="button" class="nim-dialog--markre _im_dialog_markre"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> <span class="nim-dialog--verfifed _im_dialog_verified"></span> <span class="nim-dialog--mute"></span> <button type="button" class="nim-dialog--star _im_dialog_star"></button> </div> <div class="nim-dialog--text-preview"> <span class="nim-dialog--preview _dialog_body" tabindex="0">%body%</span> <span class="nim-dialog--typing _im_dialog_typing"></span><span class="nim-dialog--typer-el"></span> </div> <label class="blind_label _im_unread_blind_label">%unread_message_string%</label> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_conversation_search_row: function() {
            return '<li data-list-id="%peer%" class="nim-dialog nim-conversation-search-row _im_dialog _im_dialog_%peer% %is_unread% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer nim-peer_search %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> </div> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_delete_actions: function() {
            return '<span class="nim-dialog--who">%text%</span> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="restore" type="button">' + getLang("mail_restore") + '</button> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="spam" type="button">' + getLang("mail_im_mark_spam") + '</button> <button class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="block" type="button">' + getLang("mail_user_black_list") + "</button>"
        },
        im_chat_change_topic: function() {
            return '<div class="im_change_topic_wrap clear_fix"> <div class="im_change_topic_label fl_l ta_r">' + getLang("mail_chat_topic_change_label") + '</div> <div class="im_change_topic_labeled fl_l"> <input class="text _im_chat_topic_change_input" value="%value%"/> </div> </div>'
        },
        im_msg_row: function() {
            return '<li class="im-mess %cls% _im_mess_noa _im_mess_%msg_id%" aria-hidden="%aria_hidden%" data-ts="%ts%" data-msgid="%msg_id%" data-peer="%from_id%"> <div class="im-mess--text wall_module _im_log_body">%text%</div> <span tabindex="0" role="link" aria-label="' + getLang("mail_select_message") + '" class="blind_label im-mess--blind-select _im_mess_blind_label_select"></span> <span class="blind_label im-mess--blind-read _im_mess_blind_unread_marker" %unread_params%></span> <span class="im-mess--marker _im_mess_marker" %marker_params%></span> </li>'
        },
        sImHistoryRowActions: function() {
            return '<div class="im-mess--actions"> <span role="link" aria-label="' + getLang("mail_im_reply") + '" class="im-mess--reply _im_mess_reply"></span><span role="link" aria-label="' + getLang("mail_im_edit") + '" class="im-mess--edit _im_mess_edit"></span><span role="link" aria-label="' + getLang("mail_important_message") + '" class="im-mess--fav _im_mess_fav"></span> </div> <div class="im-mess--check fl_l"></div>'
        },
        im_wrap_mobile: '<b class="mob_onl %class%" %attrs% onmouseover="mobileOnlineTip(this, {%params%})"></b>',
        im_pinned_message: '<div class="im-page-pinned _im_pinned_message"> <button class="im-page-pinned--hide _im_pin_hide"></button> <div class="im-page-pinned--meta"> <a href="%link%" target="_blank" class="im-page-pinned--name">%name%</a> <span class="im-page-pinned--date">%date%</span> </div> <div class="im-page-pinned--content">%content%</div> </div>',
        im_pinned_message_media: '<span class="im-page-pinned--media">%text%</span>',
        im_pinned_message_media_bar: '<div class="im-page-pinned--media-bar">\n  <div class="im-page-pinned--media-bar_progress" style="width: %percent%%;"></div>\n</div>',
        im_pinned_messages_promo: '<div class="im-page--mess-actions-promo-content">%content%</div>',
        im_retry_link: function() {
            return '<button class="im-page--retry _im_retry_media">' + getLang("mail_retry") + "</button>"
        },
        sImLblWasEdited: function() {
            return " <span class='im-mess--lbl-was-edited _im_edit_time' data-time='%update_time%'>" + getLang("mail_was_edited_short") + "</span>"
        }
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function r(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
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
}, , , function(e, t, n) {
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
            return t === r ? void setStyle(e, {
                width: n
            }) : (t = r, n = e.parentNode.offsetWidth, void setStyle(e, {
                width: Math.max(30, n - r - 20)
            }))
        }
    }

    function l(e, t, n, r) {
        e.set(m.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
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
            m = ce("div", {
                className: "_ui_multiselection ui_multiselect_cnt"
            });
        g && g.parentNode.insertBefore(m, g);
        var _ = s(g);
        t.set(a);
        var h = o.bind(null, e, t, n, m, _),
            v = function(t) {
                document.activeElement !== g && uiSearch.focus(e)
            },
            b = (0, f.createModule)({
                handlers: function(t, n) {
                    n(e, "click", p, h), n(e, "mouseover", p, d), t(e, "click", v)
                }
            });
        return {
            addSelection: function(n, a) {
                return t.set(r.bind(null, {
                    id: n,
                    name: a
                })).then(c.bind(null, e, m, t, _))
            },
            removeSelection: function(n) {
                return t.set(i.bind(null, n)).then(c.bind(null, e, m, t, _))
            },
            resetSelection: function() {
                u(t, e, m, _)
            },
            focus: function() {
                uiSearch.focus(e)
            },
            save: function() {
                t.stash(), c(e, m, t, _)
            },
            restore: function() {
                t.pop(), c(e, m, t, _)
            },
            unmount: function() {
                uiSearch.destroy(e), (0, f.destroyModule)(b)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var m = n(122),
        f = n(121),
        p = "_ui_multiselect_cancel"
}, , , , function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    var r = n(179)("meta"),
        a = n(102),
        i = n(31),
        o = n(24).f,
        s = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !n(176)(function() {
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
        m = function(e) {
            return u && f.NEED && l(e) && !i(e, r) && c(e), e
        },
        f = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: g,
            onFreeze: m
        }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.state = e, Promise.resolve(t)
    }

    function i(e, t, n, r, a) {
        switch (t) {
            case m.ARROW_UP:
                (0, g.isEditableFocused)() || (r.scroll(a, "up"), cancelEvent(n));
                break;
            case m.ARROW_DOWN:
                (0, g.isEditableFocused)() || (r.scroll(a, "down"), cancelEvent(n));
                break;
            case m.PAGE_UP:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "up", !0), cancelEvent(n));
                break;
            case m.PAGE_DOWN:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "down", !0), cancelEvent(n));
                break;
            case m.HOME:
                (0, g.isEditableFocused)() || (r.scroll(a, "up", !1, !0), cancelEvent(n));
                break;
            case m.END_KEY:
                (0, g.isEditableFocused)() || (r.scroll(a, "down", !1, !0), cancelEvent(n));
                break;
            case m.PRINTABLE:
                r.focustTxt(e)
        }
    }

    function o(e, t, n, r, a, i) {
        switch (t) {
            case m.ARROW_DOWN:
                r.hoverNextDialog(i), cancelEvent(n);
                break;
            case m.ARROW_UP:
                r.hoverPrevDialog(i), cancelEvent(n);
                break;
            case m.ENTER:
                (!(0, g.isEditableFocused)() || gpeByClass("_im_dialogs_search_input", document.activeElement)) && r.selectHoveredDialog(i);
                break;
            case m.PRINTABLE:
                a.focusInput(i)
        }
    }

    function s(e, t, n, r, a) {
        switch (t) {
            case m.HOME:
            case m.END_KEY:
                r.isEmpty(a) && i(e, t, n, r, a);
                break;
            case m.PAGE_UP:
            case m.PAGE_DOWN:
                i(e, t, n, r, a)
        }
    }

    function l(e, t, n, r, a) {
        switch (t) {
            case m.PAGE_UP:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("up"), cancelEvent(n));
                break;
            case m.PAGE_DOWN:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("down"), cancelEvent(n));
                break;
            case m.ARROW_DOWN:
                r.hoverNextElement(a);
                break;
            case m.ARROW_UP:
                r.hoverPrevElement(a);
                break;
            case m.ENTER:
                gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(a) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(a);
                break;
            case m.PRINTABLE:
                r.focusSearch(a)
        }
    }

    function u(e, t, n, r, u, c) {
        var g = (0, d["default"])({
            state: t || "default"
        });
        return {
            signal: function(t, a) {
                if (!(cur.storyLayer || cur.articleEditorLayer || cur.articleLayer)) switch (g.get().state) {
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
    var c = n(198),
        d = r(c),
        g = n(160),
        m = n(188)
}, , function(e, t, n) {
    var r = n(24).f,
        a = n(31),
        i = n(1)("toStringTag");
    e.exports = function(e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}]);